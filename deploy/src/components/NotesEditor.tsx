import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { CLOUD_SYNC_EVENT } from "@/lib/cloud";
import {
  Download, Search, RotateCcw, BookOpen, Clock, FileText,
  ChevronRight, Star, AlertCircle,
} from "lucide-react";
import { safeLoad, safeSave } from "@/lib/storage";
import { sm2Update, isDue, daysUntilDue } from "@/lib/sr";
import type { SRCard } from "@/lib/sr";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubjectNote {
  text: string;
  lastEdited: string;  // ISO date
  srCard?: SRCard;
}

type NotesStore = Record<string, SubjectNote>;

// ─── Subjects ─────────────────────────────────────────────────────────────────

const SUBJECTS: { name: string; emoji: string; color: string }[] = [
  { name: "Medicine",         emoji: "🩺", color: "text-blue-400"   },
  { name: "Surgery",          emoji: "🔪", color: "text-rose-400"   },
  { name: "Pathology",        emoji: "🔬", color: "text-violet-400" },
  { name: "Pharmacology",     emoji: "💊", color: "text-green-400"  },
  { name: "OBG",              emoji: "👩", color: "text-pink-400"   },
  { name: "Paediatrics",      emoji: "👶", color: "text-yellow-400" },
  { name: "PSM",              emoji: "🌍", color: "text-teal-400"   },
  { name: "Microbiology",     emoji: "🦠", color: "text-amber-400"  },
  { name: "Forensic Medicine",emoji: "⚖️", color: "text-red-400"    },
  { name: "Anatomy",          emoji: "🦴", color: "text-orange-400" },
  { name: "Physiology",       emoji: "⚡", color: "text-cyan-400"   },
  { name: "Biochemistry",     emoji: "🧪", color: "text-lime-400"   },
  { name: "Ophthalmology",    emoji: "👁️", color: "text-sky-400"   },
  { name: "ENT",              emoji: "👂", color: "text-indigo-400" },
  { name: "Orthopaedics",     emoji: "🦿", color: "text-stone-400"  },
  { name: "Dermatology",      emoji: "🧴", color: "text-fuchsia-400"},
  { name: "Psychiatry",       emoji: "🧠", color: "text-purple-400" },
  { name: "Radiology",        emoji: "🩻", color: "text-slate-400"  },
  { name: "Anaesthesia",      emoji: "😴", color: "text-emerald-400"},
];

// ─── Storage ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = "neetpg_subject_notes";

function load(): NotesStore {
  return safeLoad<NotesStore>(STORAGE_KEY, {});
}

function save(store: NotesStore): void {
  safeSave(STORAGE_KEY, store);
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function fmtDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

// ─── Export ───────────────────────────────────────────────────────────────────

function exportAllNotes(store: NotesStore): void {
  const lines = SUBJECTS
    .filter(s => store[s.name]?.text?.trim())
    .map(s => `${"═".repeat(60)}\n${s.emoji}  ${s.name.toUpperCase()}\n${"═".repeat(60)}\n${store[s.name].text.trim()}`)
    .join("\n\n");
  if (!lines) return;
  const blob = new Blob([lines], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = `neetpg-notes-${todayIso()}.txt`;
  a.click(); URL.revokeObjectURL(url);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function NotesEditor() {
  const [store, setStore]         = useState<NotesStore>(load);
  const [active, setActive]       = useState<string>(SUBJECTS[0].name);
  const [search, setSearch]       = useState("");
  const [reviewIdx, setReviewIdx] = useState<number | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ columns: string[] }>;
      if (ev.detail.columns.includes("subject_notes")) setStore(load());
    };
    window.addEventListener(CLOUD_SYNC_EVENT, handler);
    return () => window.removeEventListener(CLOUD_SYNC_EVENT, handler);
  }, []);

  // SM-2 due queue
  const dueSubjects = useMemo(() =>
    SUBJECTS.filter(s => store[s.name]?.text?.trim() && isDue(store[s.name]?.srCard)),
    [store]
  );

  const filtered = useMemo(() =>
    SUBJECTS.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const current  = SUBJECTS.find(s => s.name === active)!;
  const note     = store[active] ?? { text: "", lastEdited: todayIso() };
  const words    = wordCount(note.text);

  // ── Text change (auto-save debounced 800ms) ───────────────────────────────
  const handleChange = useCallback((text: string) => {
    setStore(prev => {
      const next = {
        ...prev,
        [active]: { ...prev[active], text, lastEdited: todayIso() },
      };
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => save(next), 800);
      return next;
    });
  }, [active]);

  // ── SM-2 review ───────────────────────────────────────────────────────────
  const isReviewing     = reviewIdx !== null;
  const reviewSubject   = isReviewing ? dueSubjects[reviewIdx] : null;
  const reviewNote      = reviewSubject ? store[reviewSubject.name] : null;

  const startReview = () => {
    if (dueSubjects.length === 0) return;
    setReviewIdx(0);
    setActive(dueSubjects[0].name);
  };

  const rateAndAdvance = (quality: number) => {
    if (!reviewSubject) return;
    setStore(prev => {
      const existing = prev[reviewSubject.name]?.srCard;
      const updated  = sm2Update(
        existing ?? { ef: 2.5, interval: 1, repetitions: 0, dueDate: todayIso() },
        quality,
      );
      const next = { ...prev, [reviewSubject.name]: { ...prev[reviewSubject.name], srCard: updated } };
      save(next);
      return next;
    });
    const nextIdx = (reviewIdx ?? 0) + 1;
    if (nextIdx < dueSubjects.length) {
      setReviewIdx(nextIdx);
      setActive(dueSubjects[nextIdx].name);
    } else {
      setReviewIdx(null);
    }
  };

  // ── Mark for review (manually add SR card) ────────────────────────────────
  const markForReview = () => {
    setStore(prev => {
      const existing = prev[active]?.srCard;
      if (existing) return prev;
      const next = {
        ...prev,
        [active]: {
          ...prev[active],
          srCard: { ef: 2.5, interval: 1, repetitions: 0, dueDate: todayIso() },
        },
      };
      save(next);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-7xl mx-auto gap-0">

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search subjects…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs bg-card border border-border rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        {dueSubjects.length > 0 && !isReviewing && (
          <button
            onClick={startReview}
            className="flex items-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-mono rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Review {dueSubjects.length} due
          </button>
        )}

        <button
          onClick={() => exportAllNotes(store)}
          className="flex items-center gap-2 px-3 py-2 border border-border text-muted-foreground hover:text-foreground text-xs font-mono rounded-lg transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Export all
        </button>
      </div>

      {/* ── Review strip ───────────────────────────────────────────────────── */}
      {isReviewing && reviewSubject && (
        <div className="mb-3 bg-violet-500/10 border border-violet-500/30 rounded-xl p-3 flex items-center gap-3 flex-wrap">
          <RotateCcw className="w-4 h-4 text-violet-400 flex-shrink-0" />
          <span className="text-xs font-mono text-violet-300 flex-1">
            {reviewSubject.emoji} {reviewSubject.name}
            <span className="text-muted-foreground ml-2">({(reviewIdx ?? 0) + 1}/{dueSubjects.length})</span>
          </span>
          <div className="flex gap-2">
            {[["Forgot", 1, "bg-red-500/20 text-red-400 hover:bg-red-500/30"],
              ["Hard",   3, "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"],
              ["Easy",   5, "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"]
            ].map(([label, q, cls]) => (
              <button key={label as string} onClick={() => rateAndAdvance(q as number)}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${cls}`}>
                {label as string}
              </button>
            ))}
            <button onClick={() => setReviewIdx(null)}
              className="px-3 py-1 text-xs font-mono border border-border text-muted-foreground rounded-md hover:text-foreground">
              Done
            </button>
          </div>
        </div>
      )}

      {/* ── Main layout ────────────────────────────────────────────────────── */}
      <div className="flex flex-1 gap-3 min-h-0">

        {/* Sidebar */}
        <div className="w-52 shrink-0 bg-card border border-border rounded-xl overflow-y-auto">
          {filtered.map(subj => {
            const n     = store[subj.name];
            const hasN  = !!n?.text?.trim();
            const due   = hasN && isDue(n?.srCard);
            const daysU = hasN && n?.srCard && !due ? daysUntilDue(n.srCard) : null;
            const wc    = hasN ? wordCount(n.text) : 0;
            const isAct = active === subj.name;

            return (
              <button
                key={subj.name}
                onClick={() => { setActive(subj.name); setSearch(""); }}
                className={`w-full text-left px-3 py-2.5 flex items-center gap-2 border-b border-border/50 transition-colors last:border-b-0 ${
                  isAct ? "bg-primary/10 border-l-2 border-l-primary" : "hover:bg-muted/40"
                }`}
              >
                <span className="text-base leading-none">{subj.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium truncate ${isAct ? "text-primary" : "text-foreground"}`}>
                    {subj.name}
                  </div>
                  {hasN && (
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {wc}w {due ? "· 🔴 due" : daysU !== null ? `· ${daysU}d` : ""}
                    </div>
                  )}
                </div>
                {isAct && <ChevronRight className="w-3 h-3 text-primary flex-shrink-0" />}
                {due && !isAct && <AlertCircle className="w-3 h-3 text-violet-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Editor pane */}
        <div className="flex-1 bg-card border border-border rounded-xl flex flex-col overflow-hidden min-w-0">

          {/* Header */}
          <div className="px-5 py-3 border-b border-border bg-muted/20 flex items-center justify-between gap-3 flex-wrap shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xl leading-none">{current.emoji}</span>
              <div>
                <h2 className={`text-sm font-bold ${current.color}`}>{current.name}</h2>
                {note.lastEdited && note.text && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Last edited {fmtDate(note.lastEdited)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* SR status */}
              {note.srCard && !isDue(note.srCard) && (
                <span className="text-[10px] font-mono text-violet-400/70 bg-violet-500/10 px-2 py-1 rounded">
                  review in {daysUntilDue(note.srCard)}d
                </span>
              )}
              {isDue(note.srCard) && (
                <span className="text-[10px] font-mono text-violet-400 bg-violet-500/20 px-2 py-1 rounded">
                  due for review
                </span>
              )}
              {!note.srCard && note.text?.trim() && (
                <button
                  onClick={markForReview}
                  title="Add to spaced repetition queue"
                  className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-violet-400 px-2 py-1 rounded border border-border hover:border-violet-500/50 transition-colors"
                >
                  <Star className="w-3 h-3" /> Add to SR
                </button>
              )}

              {words > 0 && (
                <span className="text-[10px] font-mono text-muted-foreground">
                  {words} words
                </span>
              )}
            </div>
          </div>

          {/* Textarea */}
          <textarea
            className="flex-1 w-full bg-transparent px-6 py-5 font-mono text-sm leading-relaxed focus:outline-none resize-none placeholder:text-muted-foreground/25"
            placeholder={`High-yield notes for ${current.name}…\n\n• Key one-liners\n• Mnemonics\n• High-frequency MCQ traps\n• India-specific data\n• Missed questions from Reflex/BTR`}
            value={note.text}
            onChange={e => handleChange(e.target.value)}
            spellCheck={false}
          />

          {/* Footer hint */}
          <div className="px-5 py-2 border-t border-border/50 flex items-center gap-4 shrink-0">
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
              <Clock className="w-3 h-3" /> Auto-saves as you type
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
              <FileText className="w-3 h-3" /> Synced to cloud
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
              <BookOpen className="w-3 h-3" /> {Object.values(store).filter(n => n?.text?.trim()).length}/{SUBJECTS.length} subjects with notes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
