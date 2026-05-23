import { useState, useMemo, useCallback } from "react";
import {
  CheckCircle2, Circle, ChevronLeft, ChevronRight, Calendar,
  Flame, Lock, Star, Trophy, GraduationCap, Zap, BookOpen,
  Brain, Heart, Sun, Clock, RefreshCw, ListChecks, Moon,
  Coffee, Dumbbell, Target, AlertTriangle, RotateCcw,
} from "lucide-react";
import { MARROW_SCHEDULE, type MarrowDay } from "@/data/marrow-schedule";
import { SCHEDULE, type DayEntry } from "@/data/schedule";
import { safeLoad, safeSave } from "@/lib/storage";

// ─── Types ────────────────────────────────────────────────────────────────────

type Badge = "MARROW" | "REFLEX" | "BTR" | "HEALTH" | "ROUTINE" | "REVISION";

interface TodoItem {
  id: string;
  label: string;
  badge: Badge;
  isLocked?: boolean;   // GT items that can't be skipped
  isOptional?: boolean;
}

interface TodoBlock {
  id: string;
  time: string;
  title: string;
  emoji: string;
  blockColor: string;   // border color token
  items: TodoItem[];
}

type DayTodos = TodoBlock[];

// ─── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "unified_todos_v2";

function loadChecked(): Record<string, string[]> {
  return safeLoad<Record<string, string[]>>(STORAGE_KEY, {});
}
function saveChecked(s: Record<string, string[]>) {
  safeSave(STORAGE_KEY, s);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const BTR_START_ISO = "2026-05-23";

function isoOf(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(iso: string, n: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return isoOf(d);
}

function getBTRDay(iso: string): DayEntry | null {
  const start  = new Date(BTR_START_ISO + "T00:00:00");
  const target = new Date(iso + "T00:00:00");
  const idx    = Math.round((target.getTime() - start.getTime()) / 86400000);
  if (idx < 0 || idx >= SCHEDULE.length) return null;
  return SCHEDULE[idx];
}

function getMarrowDay(iso: string): MarrowDay | null {
  return MARROW_SCHEDULE.find(d => d.iso === iso) ?? null;
}

function hoursLabel(h: number): string {
  const wh = Math.floor(h);
  const wm = Math.round((h - wh) * 60);
  if (wm === 0) return `${wh}h`;
  if (wh === 0) return `${wm}m`;
  return `${wh}h ${wm}m`;
}

function labelFromDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

// ─── To-do generation ─────────────────────────────────────────────────────────

function item(id: string, label: string, badge: Badge, opts?: Partial<TodoItem>): TodoItem {
  return { id, label, badge, ...opts };
}

function makeStudyDayTodos(marrow: MarrowDay, btr: DayEntry | null): DayTodos {
  const subjects = marrow.activities.map(a => `${a.subject}${a.revision ? ` (${a.revision})` : ""} · ${hoursLabel(a.hours)}`);
  const primarySubject = marrow.activities[0]?.subject ?? "Revision";
  const btrFocus  = btr?.focus ?? "Revision";
  const btrTopics = btr?.topics?.slice(0, 4) ?? [];

  return [
    {
      id: "morning-ritual", time: "6:00 AM", title: "Morning Ritual", emoji: "🌅", blockColor: "border-yellow-500/40",
      items: [
        item("r1", "Wake up — no phone for first 30 min (phone in another room)", "ROUTINE"),
        item("r2", "10 min sunlight exposure + drink 500 ml water", "HEALTH"),
        item("r3", "Read your WHY out loud (3 sentences — why rank 1?)", "ROUTINE"),
        item("r4", "Review today's plan on this screen, then close phone", "ROUTINE"),
      ],
    },
    {
      id: "marrow-am", time: "6:30 AM", title: `Marrow Morning — ${primarySubject}`, emoji: "📚", blockColor: "border-blue-500/40",
      items: [
        ...marrow.activities.map((a, i) =>
          item(`m-${i}`, `Marrow video: ${a.subject}${a.revision ? ` ${a.revision}` : ""} — ${hoursLabel(a.hours)} (pause every 20 min → active recall)`, "MARROW")
        ),
        item("m-notes", `Write 5 high-yield one-liners from ${primarySubject} module`, "MARROW"),
        item("m-explain", "Revise chapter summary aloud (Feynman technique — 3 min)", "MARROW"),
      ],
    },
    {
      id: "reflex-am", time: "9:30 AM", title: "Reflex MCQ Sprint", emoji: "⚡", blockColor: "border-violet-500/40",
      items: [
        item("rx1", `Reflex: ${primarySubject} — 30 Qs (timed, no pausing)`, "REFLEX"),
        item("rx2", "Read EVERY explanation — right and wrong answers both", "REFLEX"),
        item("rx3", "Flag any question you got wrong → add concept to mistake logbook", "REFLEX"),
      ],
    },
    ...(btr ? [{
      id: "btr-session", time: "10:30 AM", title: `Core BTR Day ${btr.day} — ${btrFocus}`, emoji: "🏆", blockColor: "border-amber-500/40",
      items: [
        item("btr0", `Open Core BTR: Day ${btr.day} · ${btrFocus}`, "BTR"),
        ...btrTopics.map((t, i) =>
          item(`btr-t${i}`, t.split("—")[0].trim(), "BTR")
        ),
        item("btr-drill", `BTR MCQ drill: ${btr.subject} — 40 Qs in 30 min (strict exam mode)`, "BTR"),
        item("btr-india", `India-specific: ${btr.india?.slice(0, 80) ?? "Review India-specific stats for this subject"}`, "BTR"),
      ],
    }] : []),
    {
      id: "lunch", time: "1:00 PM", title: "Lunch + Recovery", emoji: "🥗", blockColor: "border-emerald-500/40",
      items: [
        item("l1", "Protein-rich meal (avoid heavy carbs → prevents 2 PM crash)", "HEALTH"),
        item("l2", "15 min brisk walk outdoors (BDNF boost — improves afternoon retention)", "HEALTH"),
        item("l3", "Light flashcard review: 10 cards from this morning (no phone, paper cards)", "REVISION"),
      ],
    },
    {
      id: "marrow-pm", time: "2:00 PM", title: `Marrow Afternoon — ${subjects.join(" + ")}`, emoji: "📖", blockColor: "border-blue-500/40",
      items: [
        item("mp1", `Continue Marrow: ${subjects.join(", ")} — deep revision pass`, "MARROW"),
        item("mp2", `India-specific one-liners for ${primarySubject}: national programmes, NFHS-5 stats, key acts`, "MARROW"),
        item("mp3", `Reflex: ${primarySubject} — 30 more Qs on afternoon topics`, "REFLEX"),
      ],
    },
    {
      id: "evening", time: "5:00 PM", title: "Evening Sprint", emoji: "🔥", blockColor: "border-rose-500/40",
      items: [
        item("e1", `${btr?.images ?? "Image bank: 15 clinical images for today's subject (identify without labels)"}`, "REVISION"),
        item("e2", `'World of ${primarySubject}' revision notes — 30 min rapid pass`, "REVISION"),
        item("e3", `MCQs on today's topics — 40 Qs timed (this app → Subject Drills → ${primarySubject})`, "REFLEX"),
      ],
    },
    {
      id: "night", time: "7:30 PM", title: "Night Consolidation", emoji: "🌙", blockColor: "border-indigo-500/40",
      items: [
        item("n1", "Update mistake logbook: every wrong answer from today's MCQs (root cause analysis)", "ROUTINE"),
        item("n2", "Flashcard review: 20 cards from weak topics", "REVISION"),
        item("n3", "Daily quiz: 10 Qs on today's topics (this app → Daily Quiz)", "REFLEX"),
        item("n4", "Write 5 key HY points from today — if you can't, you don't know it well enough", "REVISION"),
        item("n5", "Tomorrow's plan: check this app for Day subjects + BTR focus", "ROUTINE"),
      ],
    },
    {
      id: "presleep", time: "9:30 PM", title: "Pre-Sleep", emoji: "😴", blockColor: "border-slate-500/40",
      items: [
        item("ps1", "Phone away / Do Not Disturb ON from 9:30 PM", "HEALTH"),
        item("ps2", "Re-read today's 5 HY one-liners (last thing before sleep → memory consolidation)", "REVISION"),
        item("ps3", "Lights out by 10:00 PM — sleep is when rank is built", "HEALTH", { isLocked: true }),
      ],
    },
  ];
}

function makeTestDayTodos(marrow: MarrowDay): DayTodos {
  return [
    {
      id: "pre-test", time: "7:00 AM", title: "Pre-Test Morning", emoji: "🌅", blockColor: "border-yellow-500/40",
      items: [
        item("pt1", "Wake 7:00 AM — no new reading, no cramming", "ROUTINE", { isLocked: true }),
        item("pt2", "Light protein breakfast + water (no heavy food)", "HEALTH"),
        item("pt3", "Review your 5 HY one-liners from yesterday only — then close everything", "REVISION"),
        item("pt4", "Set up exam environment: silent room, desk clear, water bottle, no phone", "ROUTINE"),
      ],
    },
    {
      id: "gt-execution", time: "9:00 AM", title: `${marrow.testName} — Exam Conditions`, emoji: "🔒", blockColor: "border-rose-500/40",
      items: [
        item("gt1", "Attempt full test — strict 3.5 hours, zero interruptions", "BTR", { isLocked: true }),
        item("gt2", "First pass: answer confident Qs → mark uncertain → skip unknowns", "BTR"),
        item("gt3", "Second pass: attempt marked/uncertain Qs using clinical reasoning", "BTR"),
        item("gt4", "Last 15 min: review skipped only — do NOT re-check answered Qs", "BTR"),
        item("gt5", "Submit on time — no last-second changes", "BTR", { isLocked: true }),
      ],
    },
    {
      id: "post-gt", time: "1:00 PM", title: "Post-GT Analysis (2+ hours)", emoji: "🔍", blockColor: "border-amber-500/40",
      items: [
        item("pa1", "Lunch + 30 min rest before analysis — don't start while emotional", "HEALTH"),
        item("pa2", "Go through EVERY wrong answer — not just the ones you feel bad about", "REVISION"),
        item("pa3", "Per-subject score breakdown: which subjects need most work?", "REVISION"),
        item("pa4", "Add every wrong answer to mistake logbook with root cause (knowledge gap / confusion / careless)", "ROUTINE"),
        item("pa5", "Write top 3 weak areas → these get priority on buffer day tomorrow", "REVISION"),
        item("pa6", "Review questions you got right by guessing — 'lucky correct' is a blind spot", "REVISION"),
      ],
    },
    {
      id: "gt-recovery", time: "6:00 PM", title: "Recovery", emoji: "💆", blockColor: "border-emerald-500/40",
      items: [
        item("rc1", "Light walk or physical activity (process the day, don't sit still)", "HEALTH"),
        item("rc2", "Do NOT start reading new topics tonight — tomorrow is buffer day", "ROUTINE", { isLocked: true }),
        item("rc3", "Sleep by 9:30 PM — buffer day tomorrow, body needs full recovery", "HEALTH", { isLocked: true }),
      ],
    },
  ];
}

function makeBufferDayTodos(): DayTodos {
  return [
    {
      id: "buf-morning", time: "Natural wake", title: "Recovery Morning", emoji: "🌤️", blockColor: "border-emerald-500/40",
      items: [
        item("b1", "No alarm — wake naturally. If awake before 7 AM, try to sleep again", "HEALTH"),
        item("b2", "Sunlight + water + no phone for first 20 min", "HEALTH"),
        item("b3", "Light breakfast. No studying before 9 AM", "HEALTH"),
      ],
    },
    {
      id: "buf-analysis", time: "9:00 AM", title: "GT Mistake Analysis", emoji: "🔍", blockColor: "border-amber-500/40",
      items: [
        item("ba1", "Open mistake logbook from yesterday's GT", "REVISION"),
        item("ba2", "Spend 15-20 min per wrong answer: why was the right answer right? Write it.", "REVISION"),
        item("ba3", "Categorize your errors: knowledge gap / confusion / silly mistake / time pressure", "REVISION"),
        item("ba4", "Rank your weakest 3 subjects — these get extra attention in next revision cycle", "REVISION"),
      ],
    },
    {
      id: "buf-light", time: "12:00 PM", title: "Light Targeted Revision", emoji: "📖", blockColor: "border-blue-500/40",
      items: [
        item("bl1", "Reflex: weakest subject from GT — 30 Qs only (not full session)", "REFLEX"),
        item("bl2", "Revisit top 3 concepts you got wrong in GT (not whole subject — just those concepts)", "REVISION"),
        item("bl3", "Update your '100 HY one-liners' master list with today's insights", "ROUTINE", { isOptional: true }),
      ],
    },
    {
      id: "buf-health", time: "3:00 PM", title: "Health & Recovery", emoji: "🏃", blockColor: "border-green-500/40",
      items: [
        item("bh1", "Physical activity: 30+ min brisk walk / run / gym — mandatory", "HEALTH", { isLocked: true }),
        item("bh2", "Healthy dinner — no junk, no caffeine after 2 PM", "HEALTH"),
        item("bh3", "Call a friend or family member (social connection = mental reset)", "HEALTH", { isOptional: true }),
      ],
    },
    {
      id: "buf-plan", time: "6:00 PM", title: "Plan Tomorrow", emoji: "📋", blockColor: "border-indigo-500/40",
      items: [
        item("bp1", "Check tomorrow's Marrow Day + BTR Day on this app", "ROUTINE"),
        item("bp2", "Review ZV Tips for motivation: open this app → ZV Tips", "ROUTINE", { isOptional: true }),
        item("bp3", "Sleep by 10:00 PM — new cycle starts tomorrow, you need full energy", "HEALTH", { isLocked: true }),
      ],
    },
  ];
}

function makeOpenRevisionTodos(btr: DayEntry | null): DayTodos {
  return [
    {
      id: "or-morning", time: "6:00 AM", title: "Morning Ritual", emoji: "🌅", blockColor: "border-yellow-500/40",
      items: [
        item("or1", "Wake + no phone 30 min + sunlight + water + read WHY", "ROUTINE"),
        item("or2", "Open Weak Areas Heatmap (this app → Insights → Weak Areas)", "ROUTINE"),
        item("or3", "Pick top 2 weakest subjects for today — commit to these only", "ROUTINE"),
      ],
    },
    {
      id: "or-s1", time: "6:30 AM", title: "Weak Subject 1 — Deep Revision", emoji: "🎯", blockColor: "border-blue-500/40",
      items: [
        item("os1", "Marrow: Weak Subject 1 — R4/final revision (4h focused block)", "MARROW"),
        item("os2", "Reflex: Weak Subject 1 — 50 Qs (exam conditions, full speed)", "REFLEX"),
        item("os3", "Write 10 HY one-liners from today's revision of this subject", "REVISION"),
      ],
    },
    {
      id: "or-lunch", time: "12:00 PM", title: "Lunch + Recovery", emoji: "🥗", blockColor: "border-emerald-500/40",
      items: [
        item("ol1", "Protein lunch + 15 min walk", "HEALTH"),
        item("ol2", "Flashcard review: 15 cards from morning session", "REVISION"),
      ],
    },
    {
      id: "or-s2", time: "1:30 PM", title: "Weak Subject 2 — Deep Revision", emoji: "🎯", blockColor: "border-violet-500/40",
      items: [
        item("ov1", "Marrow: Weak Subject 2 — R4/final revision (4h focused block)", "MARROW"),
        item("ov2", "Reflex: Weak Subject 2 — 50 Qs (exam conditions)", "REFLEX"),
        item("ov3", "Image bank: 20 images related to today's subjects", "REVISION"),
      ],
    },
    ...(btr ? [{
      id: "or-btr", time: "5:30 PM", title: `BTR Reference — ${btr.focus}`, emoji: "🏆", blockColor: "border-amber-500/40",
      items: [
        item("ob1", `Quick BTR review: ${btr.focus} (30 min — don't re-read, just scan HY points)`, "BTR"),
        item("ob2", `India-specific: ${btr.india?.slice(0, 70) ?? "Review India one-liners for this subject"}`, "BTR", { isOptional: true }),
      ],
    }] : []),
    {
      id: "or-night", time: "7:00 PM", title: "Night Consolidation", emoji: "🌙", blockColor: "border-indigo-500/40",
      items: [
        item("on1", "Full-length 50-Q timed test: weak subjects only (this app → Custom Mock)", "REFLEX"),
        item("on2", "Update mistake logbook — root cause every wrong answer", "ROUTINE"),
        item("on3", "Plan tomorrow's weak subjects (check heatmap again)", "ROUTINE"),
        item("on4", "Sleep by 10:00 PM", "HEALTH", { isLocked: true }),
      ],
    },
  ];
}

function makeExamDayTodos(): DayTodos {
  return [
    {
      id: "exam-morning", time: "5:30 AM", title: "Exam Morning", emoji: "🎯", blockColor: "border-rose-500/40",
      items: [
        item("ex1", "Wake 5:30 AM. Read only your 100 HY one-liners list — NOTHING else", "ROUTINE", { isLocked: true }),
        item("ex2", "Light breakfast: banana, eggs, water — no heavy food, no coffee if unusual", "HEALTH"),
        item("ex3", "Pack: admit card (2 copies), valid govt ID, pens (2 blue/black), water bottle", "ROUTINE", { isLocked: true }),
        item("ex4", "Reach centre 30 min early — no last-minute rushing", "ROUTINE", { isLocked: true }),
      ],
    },
    {
      id: "exam-hall", time: "9:00 AM", title: "In the Exam Hall", emoji: "✍️", blockColor: "border-amber-500/40",
      items: [
        item("eh1", "Read instructions fully. Verify question count before starting.", "ROUTINE"),
        item("eh2", "Attempt in order: Surgery → Medicine → OBG → Paeds → Pharmacology → PSM → rest", "BTR"),
        item("eh3", "Mark uncertain Qs with flag — skip genuinely unknown ones in first pass", "BTR"),
        item("eh4", "Last 20 min: review flagged + skipped only. No re-checking answered Qs.", "BTR"),
        item("eh5", "Submit confidently. Your 100 days of work are already done.", "ROUTINE", { isLocked: true }),
      ],
    },
    {
      id: "exam-after", time: "Post-exam", title: "After the Exam", emoji: "🎉", blockColor: "border-emerald-500/40",
      items: [
        item("ea1", "Walk out without discussing answers — it only creates anxiety, not marks", "HEALTH"),
        item("ea2", "Eat a proper meal. Call family. You did the work.", "HEALTH"),
        item("ea3", "Rest today — you have earned it completely", "HEALTH", { isLocked: true }),
      ],
    },
  ];
}

function generateTodos(iso: string, marrow: MarrowDay | null, btr: DayEntry | null): DayTodos {
  if (!marrow) {
    return makeOpenRevisionTodos(btr);
  }
  if (marrow.isExamDay)     return makeExamDayTodos();
  if (marrow.isTest)        return makeTestDayTodos(marrow);
  if (marrow.isBuffer)      return makeBufferDayTodos();
  if (marrow.isOpenRevision) return makeOpenRevisionTodos(btr);
  return makeStudyDayTodos(marrow, btr);
}

// ─── Badge UI ─────────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<Badge, string> = {
  MARROW:   "bg-blue-500/20 text-blue-400 border-blue-500/30",
  REFLEX:   "bg-violet-500/20 text-violet-400 border-violet-500/30",
  BTR:      "bg-amber-500/20 text-amber-400 border-amber-500/30",
  HEALTH:   "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  ROUTINE:  "bg-slate-500/20 text-slate-400 border-slate-500/30",
  REVISION: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

// ─── Summary card data ────────────────────────────────────────────────────────

function getDayType(marrow: MarrowDay | null): { label: string; emoji: string; color: string } {
  if (!marrow)              return { label: "Open Revision", emoji: "🔄", color: "text-violet-400" };
  if (marrow.isExamDay)     return { label: "NEET-PG EXAM DAY", emoji: "🎯", color: "text-rose-400" };
  if (marrow.isTest)        return { label: marrow.testName ?? "Grand Test", emoji: "🔒", color: "text-amber-400" };
  if (marrow.isBuffer)      return { label: "Buffer Day", emoji: "💆", color: "text-emerald-400" };
  if (marrow.isOpenRevision) return { label: "Open Revision", emoji: "🔄", color: "text-violet-400" };
  const subjects = marrow.activities.map(a => a.subject);
  return { label: [...new Set(subjects)].join(" + "), emoji: "📚", color: "text-blue-400" };
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DailyTodoList() {
  const todayIso = isoOf(new Date());

  const [currentIso, setCurrentIso] = useState(todayIso);
  const [checked, setChecked]       = useState<Record<string, string[]>>(loadChecked);

  const marrow = useMemo(() => getMarrowDay(currentIso), [currentIso]);
  const btr    = useMemo(() => getBTRDay(currentIso), [currentIso]);
  const blocks = useMemo(() => generateTodos(currentIso, marrow, btr), [currentIso, marrow, btr]);

  const dayChecked = useMemo(() => new Set(checked[currentIso] ?? []), [checked, currentIso]);

  const totalItems = useMemo(
    () => blocks.reduce((s, b) => s + b.items.filter(i => !i.isOptional).length, 0),
    [blocks]
  );
  const doneItems  = useMemo(
    () => blocks.reduce((s, b) => s + b.items.filter(i => !i.isOptional && dayChecked.has(i.id)).length, 0),
    [blocks, dayChecked]
  );
  const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  const toggleItem = useCallback((itemId: string) => {
    setChecked(prev => {
      const daySet = new Set(prev[currentIso] ?? []);
      if (daySet.has(itemId)) daySet.delete(itemId);
      else daySet.add(itemId);
      const next = { ...prev, [currentIso]: [...daySet] };
      saveChecked(next);
      return next;
    });
  }, [currentIso]);

  const resetDay = useCallback(() => {
    setChecked(prev => {
      const next = { ...prev };
      delete next[currentIso];
      saveChecked(next);
      return next;
    });
  }, [currentIso]);

  const dayType  = getDayType(marrow);
  const isToday  = currentIso === todayIso;
  const isPast   = currentIso < todayIso;

  const prevIso = addDays(currentIso, -1);
  const nextIso = addDays(currentIso, 1);
  const canGoPrev = prevIso >= "2026-05-23";
  const canGoNext = nextIso <= "2026-08-30";

  // Progress color
  const progColor = pct >= 80 ? "from-emerald-500 to-emerald-400"
    : pct >= 50 ? "from-blue-500 to-blue-400"
    : "from-primary to-primary/70";

  return (
    <div className="flex flex-col gap-4 pb-24">

      {/* ── Header ── */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <ListChecks className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Daily Unified Plan</h2>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground">Marrow + BTR merged</span>
        </div>
        <p className="text-[11px] font-mono text-muted-foreground">
          Every checklist item is generated from today's Marrow schedule + Core BTR day.
        </p>
      </div>

      {/* ── Date navigator ── */}
      <div className="mx-4 flex items-center gap-2 bg-card border border-border rounded-2xl px-3 py-3">
        <button
          onClick={() => canGoPrev && setCurrentIso(prevIso)}
          disabled={!canGoPrev}
          className="p-1.5 rounded-lg hover:bg-muted/30 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="flex-1 text-center">
          <p className="text-sm font-mono font-bold text-foreground">
            {labelFromDate(currentIso)}
            {isToday && (
              <span className="ml-2 text-[9px] bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded-full font-mono">
                TODAY
              </span>
            )}
            {isPast && !isToday && (
              <span className="ml-2 text-[9px] bg-muted/30 text-muted-foreground border border-border px-1.5 py-0.5 rounded-full font-mono">
                PAST
              </span>
            )}
          </p>
          {marrow && (
            <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
              Marrow Day {marrow.day}{btr ? ` · BTR Day ${btr.day}` : ""}
            </p>
          )}
        </div>

        <button
          onClick={() => canGoNext && setCurrentIso(nextIso)}
          disabled={!canGoNext}
          className="p-1.5 rounded-lg hover:bg-muted/30 disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>

        {!isToday && (
          <button
            onClick={() => setCurrentIso(todayIso)}
            className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors ml-1"
            title="Jump to today"
          >
            <Target className="w-4 h-4 text-primary" />
          </button>
        )}
      </div>

      {/* ── Day summary banner ── */}
      <div className="mx-4 rounded-2xl border border-border bg-card px-4 py-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-lg">{dayType.emoji}</p>
            <p className={`text-sm font-mono font-bold ${dayType.color}`}>{dayType.label}</p>
            {marrow?.isTest && (
              <div className="flex items-center gap-1 mt-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span className="text-[9px] font-mono text-amber-400">Grand Test — fixed date, exam conditions</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-mono font-bold text-primary">{pct}%</p>
            <p className="text-[9px] font-mono text-muted-foreground">{doneItems}/{totalItems} done</p>
          </div>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${progColor} transition-all duration-500`}
            style={{ width: `${pct}%` }}
          />
        </div>
        {pct === 100 && (
          <p className="text-[10px] font-mono text-emerald-400 mt-2 text-center">
            🏆 Perfect day — every task complete. Sleep well, you earned it.
          </p>
        )}
      </div>

      {/* ── Subject/BTR alignment row ── */}
      {marrow && !marrow.isTest && !marrow.isBuffer && !marrow.isExamDay && (
        <div className="mx-4 grid grid-cols-2 gap-2">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <GraduationCap className="w-3 h-3 text-blue-400" />
              <span className="text-[9px] font-mono text-blue-400 uppercase">Marrow</span>
            </div>
            {marrow.activities.map((a, i) => (
              <p key={i} className="text-[10px] font-mono text-foreground/90">
                {a.subject}{a.revision ? ` ${a.revision}` : ""} · {hoursLabel(a.hours)}
              </p>
            ))}
          </div>
          {btr && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <Trophy className="w-3 h-3 text-amber-400" />
                <span className="text-[9px] font-mono text-amber-400 uppercase">BTR Day {btr.day}</span>
              </div>
              <p className="text-[10px] font-mono text-foreground/90">{btr.subject}</p>
              <p className="text-[9px] font-mono text-muted-foreground">{btr.focus}</p>
            </div>
          )}
        </div>
      )}

      {/* ── To-do blocks ── */}
      <div className="px-4 space-y-3">
        {blocks.map(block => {
          const blockDone   = block.items.filter(i => !i.isOptional && dayChecked.has(i.id)).length;
          const blockTotal  = block.items.filter(i => !i.isOptional).length;
          const blockFinished = blockDone === blockTotal;

          return (
            <div key={block.id} className={`rounded-2xl border ${block.blockColor} bg-card overflow-hidden`}>
              {/* Block header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <span className="text-base">{block.emoji}</span>
                  <div>
                    <p className={`text-xs font-mono font-bold ${blockFinished ? "text-emerald-400" : "text-foreground"}`}>
                      {block.title}
                    </p>
                    <p className="text-[9px] font-mono text-muted-foreground">{block.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {blockFinished && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  <span className="text-[9px] font-mono text-muted-foreground">
                    {blockDone}/{blockTotal}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="px-4 py-3 space-y-2">
                {block.items.map(it => {
                  const done = dayChecked.has(it.id);
                  return (
                    <button
                      key={it.id}
                      onClick={() => toggleItem(it.id)}
                      className={`w-full flex items-start gap-3 text-left rounded-xl px-3 py-2.5 transition-all ${
                        done
                          ? "bg-emerald-500/5 border border-emerald-500/20"
                          : "bg-muted/10 border border-border/40 hover:bg-muted/20"
                      } ${it.isLocked ? "cursor-pointer" : ""}`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {done
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          : it.isLocked
                          ? <Lock className="w-4 h-4 text-amber-400/60" />
                          : <Circle className="w-4 h-4 text-border" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[11px] font-mono leading-relaxed ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                          {it.label}
                        </p>
                      </div>
                      <div className="shrink-0 flex gap-1 flex-wrap justify-end">
                        <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full border ${BADGE_STYLES[it.badge]}`}>
                          {it.badge}
                        </span>
                        {it.isOptional && (
                          <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full border border-border text-muted-foreground">
                            opt
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Reset button ── */}
      {dayChecked.size > 0 && (
        <div className="mx-4">
          <button
            onClick={resetDay}
            className="w-full flex items-center justify-center gap-2 text-[10px] font-mono py-2.5 rounded-xl border border-border text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset today's checklist
          </button>
        </div>
      )}

      {/* ── Key reminder ── */}
      <div className="mx-4 rounded-xl border border-border bg-muted/10 px-4 py-3">
        <p className="text-[10px] font-mono text-muted-foreground text-center leading-relaxed">
          Every item is generated from Marrow Day {marrow?.day ?? "—"} + BTR Day {btr?.day ?? "—"}.
          Grand test dates are fixed 🔒. Revision days are flexible — edit in the Marrow tab.
        </p>
      </div>

    </div>
  );
}
