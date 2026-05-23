import { useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { safeSave, safeLoad } from "@/lib/storage";
import { executeWithRetry, type SyncError } from "@/lib/sync";

type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue };

// ── Offline mutation queue ────────────────────────────────────────────────────

const QUEUE_KEY = "neetpg_pending_sync";

interface PendingWrite {
  userId: string;
  key: string;
  value: JsonValue;
  ts: number;
}

function loadQueue(): PendingWrite[] {
  return safeLoad<PendingWrite[]>(QUEUE_KEY, []);
}
function saveQueue(q: PendingWrite[]): void {
  safeSave(QUEUE_KEY, q);
}
function enqueue(userId: string, key: string, value: JsonValue): void {
  const q = loadQueue().filter(p => !(p.userId === userId && p.key === key));
  q.push({ userId, key, value, ts: Date.now() });
  saveQueue(q);
}
function dequeue(userId: string, key: string): void {
  saveQueue(loadQueue().filter(p => !(p.userId === userId && p.key === key)));
}

// ── Flush pending writes on reconnect ────────────────────────────────────────

let flushInProgress = false;

async function flushQueue(): Promise<void> {
  if (flushInProgress) return;
  flushInProgress = true;
  try {
    const pending = loadQueue();
    if (pending.length === 0) return;
    for (const write of pending) {
      const ok = await upsertCloudData(write.userId, { [write.key]: write.value } as Partial<UserData>);
      if (ok) dequeue(write.userId, write.key);
    }
  } finally {
    flushInProgress = false;
  }
}

let onlineListenerAttached = false;
function ensureOnlineListener(): void {
  if (onlineListenerAttached) return;
  onlineListenerAttached = true;
  window.addEventListener("online", () => { void flushQueue(); });
}

// ── Debounce helper ───────────────────────────────────────────────────────────

function useDebounce<A extends unknown[]>(fn: (...args: A) => void, ms: number): (...args: A) => void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: A) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => fn(...args), ms);
    },
    [fn, ms]
  );
}

// ── UserData shape (mirrors Supabase user_data columns) ───────────────────────

interface UserData {
  // Core study state
  completed_days:      number[];
  notes:               Record<number, string>;
  mcq_scores:          Record<number, { attempted: number; correct: number }>;
  flagged:             { dayId: number; topicIdx: number }[];
  sr_cards:            Record<number, { ef: number; interval: number; repetitions: number; dueDate: string }>;
  streak:              { count: number; longest: number; lastDate: string };
  exam_date:           string | null;
  // Component-level data
  todos_checked:       Record<string, string[]>;
  mistake_logbook:     JsonValue[];
  flashcards:          Record<string, JsonValue>;
  revision_schedule:   JsonValue[];
  mock_scores:         JsonValue[];
  stress_log:          JsonValue[];
  buddy_profile:       Record<string, JsonValue>;
  circadian:           Record<string, string>;
  guideline_bookmarks: string[];
  known_oneliners:     string[];
  drill_scores:        Record<string, JsonValue>;
  ai_quiz_log:         JsonValue[];
  custom_mock_history: JsonValue[];
  explanation_ratings: Record<string, JsonValue>;
  pomodoro_sessions:   JsonValue[];
  pdf_history:         JsonValue[];
  pdf_sr_cards:        Record<string, JsonValue>;
  exam_eve:            Record<string, JsonValue>;
  gamification:        Record<string, JsonValue>;
  pyq_attempts:        Record<string, JsonValue>;
}

// ── Map: localStorage key → UserData column ───────────────────────────────────
// Keys intentionally excluded from cloud sync:
//   neetpg_ai_key          — user's Anthropic API key (never in cloud)
//   neetpg_light_mode      — device-local UI preference
//   neetpg_guest_mode      — auth state flag
//   neetpg_pending_sync    — sync queue (meta)
//   neetpg_reminder_fired_ — ephemeral daily flags
//   neetpg_daily_checklist — legacy, replaced by unified_todos_v2

const BULK_SYNC_KEYS: { local: string; cloud: keyof UserData }[] = [
  { local: "unified_todos_v2",            cloud: "todos_checked"       },
  { local: "neetpg_mistake_logbook",      cloud: "mistake_logbook"     },
  { local: "neetpg_flashcards",           cloud: "flashcards"          },
  { local: "neetpg_revision_schedule",    cloud: "revision_schedule"   },
  { local: "neetpg_mock_scores",          cloud: "mock_scores"         },
  { local: "stress_log",                  cloud: "stress_log"          },
  { local: "buddy_profile",               cloud: "buddy_profile"       },
  { local: "neetpg_guideline_bookmarks",  cloud: "guideline_bookmarks" },
  { local: "neetpg_known_oneliners",      cloud: "known_oneliners"     },
  { local: "neetpg_drill_scores",         cloud: "drill_scores"        },
  { local: "neetpg_ai_quiz_log",          cloud: "ai_quiz_log"         },
  { local: "neetpg_custom_mock_history",  cloud: "custom_mock_history" },
  { local: "neetpg_explanation_ratings",  cloud: "explanation_ratings" },
  { local: "neetpg_pomodoro_sessions",    cloud: "pomodoro_sessions"   },
  { local: "neetpg_pdf_history",          cloud: "pdf_history"         },
  { local: "neetpg_pdf_sr_cards",         cloud: "pdf_sr_cards"        },
  { local: "neetpg_pyq_attempts",         cloud: "pyq_attempts"        },
];

// Circadian: two separate localStorage keys → one cloud column
function readCircadianLocal(): Record<string, string> {
  return {
    wake:  safeLoad("circadian_wake",  ""),
    sleep: safeLoad("circadian_sleep", ""),
  };
}
function writeCircadianLocal(val: Record<string, string>): void {
  if (val.wake)  safeSave("circadian_wake",  val.wake);
  if (val.sleep) safeSave("circadian_sleep", val.sleep);
}

// Exam-eve: two separate localStorage keys → one cloud column
function readExamEveLocal(): Record<string, JsonValue> {
  return {
    checklist: safeLoad("neetpg_exam_eve_checklist", {}),
    dismissed: safeLoad("neetpg_exam_eve_dismissed", false),
  };
}
function writeExamEveLocal(val: Record<string, JsonValue>): void {
  if (val.checklist !== undefined) safeSave("neetpg_exam_eve_checklist", val.checklist);
  if (val.dismissed !== undefined) safeSave("neetpg_exam_eve_dismissed", val.dismissed);
}

// ── Cloud read/write ──────────────────────────────────────────────────────────

export async function fetchCloudData(userId: string): Promise<UserData | null> {
  return executeWithRetry(
    async () => {
      const { data, error } = await supabase
        .from("user_data")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        const syncError = new Error(error.message) as SyncError;
        syncError.code = error.code;
        syncError.isNetworkError = !error.message || error.message.includes("fetch") || error.message.includes("connection");
        throw syncError;
      }
      return data ?? null;
    },
    {
      maxRetries: 3,
      onError: (error) => { console.error("[cloud] fetchCloudData error:", error.message); },
    }
  );
}

export async function upsertCloudData(userId: string, patch: Partial<UserData>): Promise<boolean> {
  try {
    await executeWithRetry(
      async () => {
        const { error } = await supabase
          .from("user_data")
          .upsert({ user_id: userId, ...patch, updated_at: new Date().toISOString() }, { onConflict: "user_id" });

        if (error) {
          const syncError = new Error(error.message) as SyncError;
          syncError.code = error.code;
          syncError.isNetworkError = !error.message || error.message.includes("fetch") || error.message.includes("connection");
          throw syncError;
        }
      },
      { maxRetries: 3 }
    );
    return true;
  } catch (error) {
    console.warn("[cloud] upsertCloudData error:", error instanceof Error ? error.message : String(error));
    return false;
  }
}

// ── Hydrate localStorage from cloud on login ──────────────────────────────────

export function mergeCloudIntoLocal(cloud: Partial<UserData>): void {
  // Core study data — cloud wins
  if (cloud.completed_days)  safeSave("neetpg_completed_days", cloud.completed_days);
  if (cloud.notes)           safeSave("neetpg_notes", cloud.notes);
  if (cloud.mcq_scores)      safeSave("neetpg_mcq_scores", cloud.mcq_scores);
  if (cloud.flagged)         safeSave("neetpg_flagged", cloud.flagged);
  if (cloud.sr_cards)        safeSave("neetpg_sr_cards", cloud.sr_cards);
  if (cloud.exam_date)       safeSave("neetpg_exam_date", cloud.exam_date);

  // Streak: take the max to avoid punishing device switches
  if (cloud.streak) {
    const local = safeLoad("neetpg_streak", { count: 0, longest: 0, lastDate: "" });
    safeSave("neetpg_streak", {
      count:    Math.max(local.count, cloud.streak.count),
      longest:  Math.max(local.longest, cloud.streak.longest),
      lastDate: local.lastDate > cloud.streak.lastDate ? local.lastDate : cloud.streak.lastDate,
    });
  }

  // Component-level data — cloud wins (overwrite local)
  for (const { local, cloud: col } of BULK_SYNC_KEYS) {
    const val = cloud[col];
    if (val !== undefined && val !== null) safeSave(local, val);
  }
  if (cloud.circadian && (cloud.circadian.wake || cloud.circadian.sleep)) {
    writeCircadianLocal(cloud.circadian);
  }
  if (cloud.exam_eve && Object.keys(cloud.exam_eve).length > 0) {
    writeExamEveLocal(cloud.exam_eve);
  }
}

// ── Snapshot all tracked localStorage keys to Supabase ───────────────────────

export async function snapshotToCloud(userId: string): Promise<boolean> {
  const patch: Partial<UserData> = {};

  for (const { local, cloud: col } of BULK_SYNC_KEYS) {
    const val = localStorage.getItem(local);
    if (val !== null) {
      try { (patch as Record<string, JsonValue>)[col] = JSON.parse(val); }
      catch { /* skip unparseable */ }
    }
  }

  patch.circadian = readCircadianLocal();
  patch.exam_eve  = readExamEveLocal();

  if (Object.keys(patch).length === 0) return true;
  const ok = await upsertCloudData(userId, patch);
  if (!ok) {
    for (const [key, value] of Object.entries(patch)) {
      enqueue(userId, key, value as JsonValue);
    }
  }
  return ok;
}

// ── Per-field sync hook (used for Zustand-managed core state) ─────────────────

export function useCloudSync<T extends JsonValue>(
  key: keyof UserData,
  value: T,
  ready: boolean
): void {
  const { user } = useAuth();

  useEffect(() => { ensureOnlineListener(); }, []);

  const syncToCloud = useCallback(
    async (v: T) => {
      if (!user) return;
      const ok = await upsertCloudData(user.id, { [key]: v } as Partial<UserData>);
      if (!ok) enqueue(user.id, key, v as JsonValue);
      else     dequeue(user.id, key);
    },
    [user, key]
  );

  const debouncedSync = useDebounce(syncToCloud, 1500);

  useEffect(() => {
    if (!ready || !user) return;
    debouncedSync(value);
  }, [value, ready, user, debouncedSync]);
}

// ── Bulk sync hook (used for component-level localStorage data) ───────────────
// Call once in App.tsx. Syncs all tracked keys to Supabase:
//   • On first mount (logged-in)
//   • Every 60 seconds
//   • When the tab regains focus (user returns from another tab/app)

export function useBulkSync(ready: boolean): void {
  const { user } = useAuth();
  const lastSyncRef = useRef<number>(0);

  useEffect(() => { ensureOnlineListener(); }, []);

  const runSync = useCallback(async () => {
    if (!user || !ready) return;
    const now = Date.now();
    if (now - lastSyncRef.current < 10_000) return; // debounce: min 10s between syncs
    lastSyncRef.current = now;
    await snapshotToCloud(user.id);
  }, [user, ready]);

  // Initial sync on login
  useEffect(() => {
    if (ready && user) void runSync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // Periodic sync every 60 seconds
  useEffect(() => {
    if (!ready || !user) return;
    const interval = setInterval(() => { void runSync(); }, 60_000);
    return () => clearInterval(interval);
  }, [ready, user, runSync]);

  // Sync when tab becomes visible again
  useEffect(() => {
    if (!ready || !user) return;
    const handler = () => { if (document.visibilityState === "visible") void runSync(); };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [ready, user, runSync]);
}
