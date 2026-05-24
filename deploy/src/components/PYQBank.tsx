import { useState, useMemo, useEffect, useRef } from "react";
import {
  BookOpen, CheckCircle, XCircle, Shuffle, ChevronLeft, ChevronRight,
  RotateCcw, TrendingUp, Search, Zap, Pencil, Clock, Trophy,
} from "lucide-react";
import { QUESTIONS, QUESTION_SUBJECTS, Question } from "@/data/questions";
import { SPECIFIC_PYQS, type ExamSource } from "@/data/pyqSpecific";
import { safeLoad, safeSave } from "@/lib/storage";
import { autoLogMistakes } from "@/lib/mistakeLogger";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AttemptRecord { selected: number; correct: boolean; }
type FilterMode       = "all" | "unattempted" | "wrong";
type DifficultyFilter = "all" | "easy" | "medium" | "hard";
type SourceFilter     = "all" | ExamSource;

interface UnifiedQuestion {
  uid: string;
  subject: string;
  stem: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  source?: ExamSource;
  year?: number;
  imageUrl?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function localToUnified(q: Question): UnifiedQuestion {
  return {
    uid: `local-${q.id}`,
    subject: q.subject,
    stem: q.stem,
    options: q.options,
    answer: q.answer,
    explanation: q.explanation,
    difficulty: "medium",
    imageUrl: q.imageUrl,
  };
}

function loadAttempts(): Record<string, AttemptRecord> {
  return safeLoad("neetpg_pyq_attempts", {});
}
function saveAttempts(a: Record<string, AttemptRecord>) {
  safeSave("neetpg_pyq_attempts", a);
}
function loadNotes(): Record<string, string> {
  return safeLoad("neetpg_q_notes", {});
}

const DIFF_COLORS: Record<string, string> = {
  easy:   "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  medium: "text-yellow-400  border-yellow-500/40  bg-yellow-500/10",
  hard:   "text-destructive border-destructive/40  bg-destructive/10",
};

// ─── Adaptive pool builder ─────────────────────────────────────────────────────

function buildAdaptivePool(
  allQuestions: UnifiedQuestion[],
  attempts: Record<string, AttemptRecord>,
): UnifiedQuestion[] {
  // Accuracy per subject
  const subjAcc: Record<string, { correct: number; total: number }> = {};
  for (const [uid, att] of Object.entries(attempts)) {
    const q = allQuestions.find(q => q.uid === uid);
    if (!q) continue;
    if (!subjAcc[q.subject]) subjAcc[q.subject] = { correct: 0, total: 0 };
    subjAcc[q.subject].total++;
    if (att.correct) subjAcc[q.subject].correct++;
  }

  const weight = (subj: string): number => {
    const a = subjAcc[subj];
    if (!a || a.total === 0) return 1.0;
    const p = a.correct / a.total;
    return p < 0.5 ? 3.0 : p < 0.7 ? 1.5 : 0.5;
  };

  // Candidates: wrong or unattempted
  const candidates = allQuestions.filter(q => !attempts[q.uid]?.correct);
  if (candidates.length === 0) return [];

  // Weighted shuffle: repeat each candidate proportionally to its weight
  const bucket: UnifiedQuestion[] = [];
  for (const q of candidates) {
    const reps = Math.round(weight(q.subject) * 2);
    for (let i = 0; i < reps; i++) bucket.push(q);
  }
  bucket.sort(() => Math.random() - 0.5);

  // Deduplicate and cap at 20
  const seen = new Set<string>();
  const pool: UnifiedQuestion[] = [];
  for (const q of bucket) {
    if (seen.has(q.uid)) continue;
    seen.add(q.uid);
    pool.push(q);
    if (pool.length === 20) break;
  }
  return pool;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DiffBadge({ level }: { level: string }) {
  return (
    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${DIFF_COLORS[level] ?? DIFF_COLORS.medium}`}>
      {level}
    </span>
  );
}

// ─── Annotation textarea ──────────────────────────────────────────────────────

function QuestionNote({
  uid, notes, onSave,
}: { uid: string; notes: Record<string, string>; onSave: (uid: string, text: string) => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(notes[uid] ?? "");
  const hasNote = !!notes[uid]?.trim();

  return (
    <div className="mx-5 mb-5">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
      >
        <Pencil className={`w-3 h-3 ${hasNote ? "text-primary" : ""}`} />
        {hasNote ? "Edit note" : "Add note"}
      </button>
      {open && (
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onBlur={() => onSave(uid, text)}
          placeholder="Your personal note for this question…"
          rows={3}
          className="mt-2 w-full bg-background border border-border rounded-lg px-3 py-2 text-xs font-mono text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
        />
      )}
    </div>
  );
}

// ─── Wrong Drill Mode ─────────────────────────────────────────────────────────

interface DrillResult { uid: string; correct: boolean; prevCorrect: boolean | null; }

function DrillView({
  pool, attempts, onExit, onRecord,
}: {
  pool: UnifiedQuestion[];
  attempts: Record<string, AttemptRecord>;
  onExit: () => void;
  onRecord: (uid: string, correct: boolean) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [timer, setTimer] = useState(60);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<DrillResult[]>([]);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = pool[idx] ?? null;
  const revealed = selected !== null;
  const OPTION_LABELS = ["A", "B", "C", "D"] as const;

  useEffect(() => {
    if (done || revealed || !current) return;
    if (timer <= 0) { advance(null); return; }
    timerRef.current = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timer, done, revealed, current]);

  function advance(opt: number | null) {
    if (!current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    const correct = opt === current.answer;
    const prevCorrect = attempts[current.uid]?.correct ?? null;
    setResults(r => [...r, { uid: current.uid, correct, prevCorrect }]);
    if (opt !== null) onRecord(current.uid, correct);

    if (idx + 1 >= pool.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setTimer(60);
      setSelected(null);
    }
  }

  function pick(opt: number) {
    if (revealed) return;
    setSelected(opt);
    if (timerRef.current) clearTimeout(timerRef.current);
    const correct = opt === current!.answer;
    const prevCorrect = attempts[current!.uid]?.correct ?? null;
    setResults(r => [...r, { uid: current!.uid, correct, prevCorrect }]);
    onRecord(current!.uid, correct);
    setTimeout(() => {
      if (idx + 1 >= pool.length) setDone(true);
      else { setIdx(i => i + 1); setTimer(60); setSelected(null); }
    }, 1200);
  }

  const optClass = (i: number) => {
    if (!revealed) return "border-border text-foreground/80 hover:border-primary/50 hover:bg-primary/5";
    if (i === current!.answer) return "border-emerald-500 bg-emerald-500/10 text-emerald-300";
    if (i === selected && i !== current!.answer) return "border-destructive bg-destructive/10 text-destructive";
    return "border-border/40 text-foreground/30";
  };

  if (done) {
    const total   = results.length;
    const correct = results.filter(r => r.correct).length;
    const pct     = Math.round((correct / total) * 100);
    const improved = results.filter(r => r.correct && r.prevCorrect === false).length;
    return (
      <div className="max-w-2xl mx-auto space-y-6 py-8">
        <div className="text-center space-y-2">
          <Trophy className="w-10 h-10 text-amber-400 mx-auto" />
          <h2 className="text-xl font-bold text-foreground">Drill Complete!</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Accuracy",  value: `${pct}%`,     color: pct >= 70 ? "text-emerald-400" : pct >= 50 ? "text-amber-400" : "text-destructive" },
            { label: "Correct",   value: correct,        color: "text-emerald-400" },
            { label: "Improved",  value: improved,       color: "text-primary" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 text-center">
              <p className={`text-2xl font-mono font-bold ${color}`}>{value}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
        {improved > 0 && (
          <p className="text-center text-xs font-mono text-primary">
            You fixed {improved} previously wrong answer{improved > 1 ? "s" : ""}!
          </p>
        )}
        <button
          onClick={onExit}
          className="w-full py-3 bg-primary text-primary-foreground text-sm font-mono rounded-xl"
        >
          Back to Practice
        </button>
      </div>
    );
  }

  if (!current) return null;

  const timerColor = timer > 30 ? "text-emerald-400" : timer > 10 ? "text-amber-400" : "text-destructive";

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4 h-[calc(100vh-160px)]">
      {/* Drill header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-mono font-semibold text-foreground">Wrong Answer Drill</span>
          <span className="text-xs font-mono text-muted-foreground">{idx + 1}/{pool.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Clock className={`w-4 h-4 ${timerColor}`} />
            <span className={`text-lg font-mono font-bold tabular-nums ${timerColor}`}>{timer}</span>
          </div>
          <button onClick={onExit} className="text-xs font-mono text-muted-foreground hover:text-foreground border border-border px-2 py-1 rounded-md">
            Exit
          </button>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1 bg-border rounded-full overflow-hidden shrink-0">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${timer > 30 ? "bg-emerald-500" : timer > 10 ? "bg-amber-500" : "bg-destructive"}`}
          style={{ width: `${(timer / 60) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="flex-1 overflow-y-auto bg-card border border-border rounded-xl flex flex-col min-h-0">
        <div className="px-5 pt-4 pb-3 border-b border-border/50 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground">{current.subject}</span>
          <DiffBadge level={current.difficulty} />
        </div>
        <div className="px-5 py-5">
          <p className="font-serif text-base text-foreground leading-relaxed">{current.stem}</p>
        </div>
        <div className="px-5 pb-5 space-y-2.5">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={revealed}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-mono flex items-start gap-3 ${optClass(i)}`}
            >
              <span className="font-bold shrink-0">{OPTION_LABELS[i]}.</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
        {revealed && (
          <div className="mx-5 mb-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3">
            <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5">Explanation</p>
            <p className="text-sm font-mono text-foreground/80 leading-relaxed">{current.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Stats View ───────────────────────────────────────────────────────────────

function StatsView({
  attempts, allQuestions, onBack, onReset,
}: {
  attempts: Record<string, AttemptRecord>;
  allQuestions: UnifiedQuestion[];
  onBack: () => void;
  onReset: () => void;
}) {
  const totalAttempted = Object.keys(attempts).length;
  const totalCorrect   = Object.values(attempts).filter(a => a.correct).length;
  const overallPct     = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : null;

  const subjectStats = useMemo(() => {
    return QUESTION_SUBJECTS.map(subj => {
      const qs      = allQuestions.filter(q => q.subject === subj);
      const done    = qs.filter(q => attempts[q.uid]);
      const correct = done.filter(q => attempts[q.uid].correct);
      return { subj, total: qs.length, done: done.length, correct: correct.length };
    });
  }, [attempts, allQuestions]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-mono font-bold uppercase text-sm text-foreground">Performance Stats</h2>
        <button onClick={onBack} className="text-xs font-mono text-muted-foreground hover:text-foreground border border-border px-3 py-1.5 rounded-md">
          Back to Practice
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Overall Accuracy", value: overallPct !== null ? `${overallPct}%` : "—", color: "text-primary"     },
          { label: "Attempted",        value: totalAttempted,                                color: "text-foreground"  },
          { label: "Correct",          value: totalCorrect,                                  color: "text-emerald-400" },
          { label: "Wrong",            value: totalAttempted - totalCorrect,                 color: "text-destructive" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className={`text-2xl font-mono font-bold ${color}`}>{value}</p>
            <p className="text-[10px] font-mono text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <p className="text-xs font-mono uppercase text-muted-foreground mb-4">By Subject</p>
        {subjectStats.map(({ subj, total, done, correct }) => {
          const pct   = done > 0 ? Math.round((correct / done) * 100) : null;
          const color = pct === null ? "#555" : pct >= 80 ? "#22c55e" : pct >= 60 ? "#eab308" : "#ef4444";
          return (
            <div key={subj} className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-muted-foreground w-40 truncate shrink-0">{subj}</span>
              <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden border border-border">
                <div className="h-full rounded-full transition-all" style={{ width: `${total > 0 ? (done/total)*100 : 0}%`, backgroundColor: color }} />
              </div>
              <span className="text-[11px] font-mono text-muted-foreground w-20 text-right shrink-0">
                {done}/{total}{pct !== null ? ` (${pct}%)` : ""}
              </span>
            </div>
          );
        })}
      </div>

      <button onClick={onReset} className="flex items-center gap-2 text-xs font-mono text-destructive border border-destructive/30 px-4 py-2 rounded-md hover:bg-destructive/10 transition-colors">
        <RotateCcw className="w-3.5 h-3.5" /> Reset all attempts
      </button>
    </div>
  );
}

// ─── Main PYQBank ─────────────────────────────────────────────────────────────

interface PYQBankProps {
  onCorrect?: () => void;
  onWrong?: () => void;
}

const EXAM_SOURCES: ExamSource[] = ["NEET-PG", "AIIMS", "PGIMER", "JIPMER", "INI-CET"];

export function PYQBank({ onCorrect, onWrong }: PYQBankProps = {}) {
  const [attempts,      setAttempts]      = useState<Record<string, AttemptRecord>>(loadAttempts);
  const [qNotes,        setQNotes]        = useState<Record<string, string>>(loadNotes);
  const [subject,       setSubject]       = useState<string>("All");
  const [mode,          setMode]          = useState<FilterMode>("all");
  const [difficulty,    setDifficulty]    = useState<DifficultyFilter>("all");
  const [sourceFilter,  setSourceFilter]  = useState<SourceFilter>("all");
  const [qIndex,        setQIndex]        = useState<number>(0);
  const [selectedOpt,   setSelectedOpt]   = useState<number | null>(null);
  const [showStats,     setShowStats]     = useState<boolean>(false);
  const [search,        setSearch]        = useState<string>("");
  const [adaptiveMode,  setAdaptiveMode]  = useState<boolean>(false);
  const [adaptivePool,  setAdaptivePool]  = useState<UnifiedQuestion[] | null>(null);
  const [drillMode,     setDrillMode]     = useState<boolean>(false);
  const [qConfidence,   setQConfidence]   = useState<Record<string, 1|2|3>>(() => safeLoad("neetpg_q_confidence", {}));

  const allQuestions = useMemo<UnifiedQuestion[]>(() => {
    const base = QUESTIONS.map(localToUnified);
    const specific: UnifiedQuestion[] = SPECIFIC_PYQS.map(q => ({
      uid: q.id, subject: q.subject, stem: q.stem, options: q.options,
      answer: q.answer, explanation: q.explanation, difficulty: q.difficulty,
      source: q.source, year: q.year,
    }));
    return [...base, ...specific];
  }, []);

  const standardPool = useMemo<UnifiedQuestion[]>(() => {
    let qs = allQuestions;
    if (subject !== "All")      qs = qs.filter(q => q.subject === subject);
    if (difficulty !== "all")   qs = qs.filter(q => q.difficulty === difficulty);
    if (sourceFilter !== "all") qs = qs.filter(q => q.source === sourceFilter);
    if (mode === "unattempted") qs = qs.filter(q => !attempts[q.uid]);
    if (mode === "wrong")       qs = qs.filter(q => attempts[q.uid] && !attempts[q.uid].correct);
    if (search.trim()) {
      const s = search.toLowerCase();
      qs = qs.filter(q => q.stem.toLowerCase().includes(s) || q.subject.toLowerCase().includes(s));
    }
    return qs;
  }, [allQuestions, subject, difficulty, sourceFilter, mode, search, attempts]);

  const pool = adaptiveMode && adaptivePool ? adaptivePool : standardPool;

  const current = pool[qIndex] ?? null;
  const attempt = current ? attempts[current.uid] : null;
  const revealed = selectedOpt !== null || attempt != null;

  const goTo = (idx: number) => {
    setQIndex(Math.max(0, Math.min(idx, pool.length - 1)));
    setSelectedOpt(null);
  };

  const SUBJECT_CANON: Record<string, string> = {
    "PSM/Community Medicine": "PSM",
    "ENT/Ophthalmology": "ENT",
  };

  const select = (opt: number) => {
    if (revealed || !current) return;
    setSelectedOpt(opt);
    const correct = opt === current.answer;
    const next    = { ...attempts, [current.uid]: { selected: opt, correct } };
    setAttempts(next);
    saveAttempts(next);
    const today = new Date().toISOString().slice(0, 10);
    const canonSubj = SUBJECT_CANON[current.subject] ?? current.subject;
    const lp = safeLoad<Record<string, string>>("neetpg_subject_last_practiced", {});
    safeSave("neetpg_subject_last_practiced", { ...lp, [canonSubj]: today });
    if (correct) {
      onCorrect?.();
    } else {
      onWrong?.();
      autoLogMistakes([{ subject: current.subject, question: current.stem, correctAnswer: current.options[current.answer], myAnswer: current.options[opt as 0|1|2|3], explanation: current.explanation }]);
    }
  };

  const saveNote = (uid: string, text: string) => {
    const next = { ...qNotes, [uid]: text };
    setQNotes(next);
    safeSave("neetpg_q_notes", next);
  };

  const saveConfidence = (uid: string, rating: 1|2|3) => {
    const next = { ...qConfidence, [uid]: rating } as Record<string, 1|2|3>;
    setQConfidence(next);
    safeSave("neetpg_q_confidence", next);
  };

  const resetAll = () => {
    setAttempts({});
    saveAttempts({});
    setQIndex(0);
    setSelectedOpt(null);
  };

  const activateAdaptive = () => {
    const p = buildAdaptivePool(allQuestions, attempts);
    setAdaptivePool(p);
    setAdaptiveMode(true);
    setQIndex(0);
    setSelectedOpt(null);
  };

  const deactivateAdaptive = () => {
    setAdaptiveMode(false);
    setAdaptivePool(null);
    setQIndex(0);
    setSelectedOpt(null);
  };

  const wrongCount = useMemo(() =>
    allQuestions.filter(q => attempts[q.uid] && !attempts[q.uid].correct).length,
    [allQuestions, attempts]
  );

  const subjectCoverage = useMemo(() => {
    const map: Record<string, { done: number; total: number }> = {};
    for (const s of QUESTION_SUBJECTS) {
      const qs = allQuestions.filter(q => q.subject === s);
      map[s] = { done: qs.filter(q => attempts[q.uid]).length, total: qs.length };
    }
    return map;
  }, [allQuestions, attempts]);

  const totalAttempted = Object.keys(attempts).length;
  const totalCorrect   = Object.values(attempts).filter(a => a.correct).length;
  const overallPct     = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : null;

  const OPTION_LABELS = ["A", "B", "C", "D"] as const;

  const optClass = (i: number) => {
    if (!revealed) return "border-border text-foreground/80 hover:border-primary/50 hover:bg-primary/5";
    if (i === current!.answer) return "border-emerald-500 bg-emerald-500/10 text-emerald-300";
    const chosen = selectedOpt ?? attempt?.selected ?? -1;
    if (i === chosen && i !== current!.answer) return "border-destructive bg-destructive/10 text-destructive";
    return "border-border/40 text-foreground/30";
  };

  // ── Drill mode ───────────────────────────────────────────────────────────────
  if (drillMode) {
    const wrongPool = allQuestions.filter(q => attempts[q.uid] && !attempts[q.uid].correct);
    return (
      <DrillView
        pool={wrongPool}
        attempts={attempts}
        onExit={() => setDrillMode(false)}
        onRecord={(uid, correct) => {
          const opt = correct ? allQuestions.find(q => q.uid === uid)?.answer ?? 0 : -1;
          const next = { ...attempts, [uid]: { selected: opt as number, correct } };
          setAttempts(next);
          saveAttempts(next);
        }}
      />
    );
  }

  if (showStats) {
    return (
      <StatsView
        attempts={attempts}
        allQuestions={allQuestions}
        onBack={() => setShowStats(false)}
        onReset={() => { resetAll(); setShowStats(false); }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4 h-[calc(100vh-160px)]">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500/20 p-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="font-mono font-bold text-foreground uppercase tracking-wider text-sm">PYQ Practice</h2>
            <p className="text-xs text-muted-foreground font-mono">
              {allQuestions.length.toLocaleString()} questions · NEET-PG · AIIMS · PGIMER · JIPMER · INI-CET
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {overallPct !== null && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400">{overallPct}% accuracy</span>
            </div>
          )}
          {wrongCount > 0 && (
            <button
              onClick={() => setDrillMode(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-amber-400 border border-amber-500/30 bg-amber-500/10 rounded-full hover:bg-amber-500/20 transition-colors"
            >
              <Zap className="w-3 h-3" /> Drill Wrongs ({wrongCount})
            </button>
          )}
          <button onClick={() => setShowStats(true)} className="px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground border border-border rounded-md transition-colors">
            Stats
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setQIndex(0); setSelectedOpt(null); if (adaptiveMode) deactivateAdaptive(); }}
          placeholder="Search questions, topics, subjects…"
          className="w-full bg-card border border-border rounded-lg pl-8 pr-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 shrink-0">
        {/* Subject */}
        <div className="flex flex-wrap gap-1.5">
          {["All", ...QUESTION_SUBJECTS].map(s => {
            const cov = s !== "All" ? subjectCoverage[s] : null;
            return (
              <button
                key={s}
                onClick={() => { setSubject(s); setQIndex(0); setSelectedOpt(null); deactivateAdaptive(); }}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-full border transition-colors ${
                  subject === s && !adaptiveMode ? "bg-secondary text-secondary-foreground border-secondary" : "text-muted-foreground border-border hover:border-muted-foreground"
                }`}
              >
                {s}
                {cov && cov.done > 0 && (
                  <span className="text-[9px] opacity-60 ml-0.5">{cov.done}/{cov.total}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Exam source filter */}
        <div className="flex flex-wrap gap-1.5">
          {(["all", ...EXAM_SOURCES] as SourceFilter[]).map(s => (
            <button
              key={s}
              onClick={() => { setSourceFilter(s); setQIndex(0); setSelectedOpt(null); deactivateAdaptive(); }}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-full border transition-colors ${
                sourceFilter === s && !adaptiveMode
                  ? s === "NEET-PG" ? "bg-rose-500/20 text-rose-400 border-rose-500/40"
                    : s === "AIIMS" ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                    : s === "PGIMER" ? "bg-violet-500/20 text-violet-400 border-violet-500/40"
                    : s === "JIPMER" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : s === "INI-CET" ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                    : "bg-secondary text-secondary-foreground border-secondary"
                  : "text-muted-foreground border-border hover:border-muted-foreground"
              }`}
            >
              {s === "all" ? "All Sources" : s}
            </button>
          ))}
        </div>

        {/* Mode + Difficulty + Adaptive */}
        <div className="flex gap-1.5 flex-wrap">
          {/* Adaptive button */}
          <button
            onClick={() => adaptiveMode ? deactivateAdaptive() : activateAdaptive()}
            className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono rounded-full border transition-colors ${
              adaptiveMode
                ? "bg-primary/20 text-primary border-primary/40"
                : "text-muted-foreground border-border/50 hover:border-muted-foreground"
            }`}
          >
            <Zap className="w-2.5 h-2.5" /> Adaptive
          </button>
          <div className="w-px h-5 bg-border self-center mx-1" />
          {(["all", "unattempted", "wrong"] as FilterMode[]).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setQIndex(0); setSelectedOpt(null); if (adaptiveMode) deactivateAdaptive(); }}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-full border transition-colors ${
                mode === m && !adaptiveMode ? "bg-card text-foreground border-border" : "text-muted-foreground border-border/50 hover:border-muted-foreground"
              }`}
            >
              {m === "unattempted" ? "New" : m === "wrong" ? "Wrong" : "All"}
            </button>
          ))}
          <div className="w-px h-5 bg-border self-center mx-1" />
          {(["all", "easy", "medium", "hard"] as DifficultyFilter[]).map(d => (
            <button
              key={d}
              onClick={() => { setDifficulty(d); setQIndex(0); setSelectedOpt(null); if (adaptiveMode) deactivateAdaptive(); }}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-full border transition-colors capitalize ${
                difficulty === d && !adaptiveMode
                  ? d === "all"    ? "bg-secondary text-secondary-foreground border-secondary"
                  : d === "easy"   ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : d === "medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                  :                  "bg-destructive/20 text-destructive border-destructive/40"
                  : "text-muted-foreground border-border/50 hover:border-muted-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Adaptive mode banner */}
        {adaptiveMode && (
          <div className="flex items-center justify-between px-3 py-2 bg-primary/10 border border-primary/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-mono text-primary">Adaptive mode — {pool.length} questions weighted to your weakest subjects</span>
            </div>
            <button onClick={deactivateAdaptive} className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors">
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {pool.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-400/40 mx-auto" />
            <p className="text-sm font-mono text-muted-foreground">
              {adaptiveMode ? "No wrong/unattempted questions — well done!" :
               mode === "unattempted" ? "All questions attempted!" : "No wrong answers — great work!"}
            </p>
            <button
              onClick={() => { setMode("all"); setDifficulty("all"); setQIndex(0); deactivateAdaptive(); }}
              className="px-4 py-2 bg-primary text-primary-foreground text-xs font-mono rounded-md"
            >
              Show All
            </button>
          </div>
        </div>
      ) : current ? (
        <>
          {/* Question card */}
          <div className="flex-1 overflow-y-auto bg-card border border-border rounded-xl flex flex-col min-h-0">
            {/* Card header */}
            <div className="px-5 pt-4 pb-3 border-b border-border/50 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                  {current.subject}
                </span>
                <DiffBadge level={current.difficulty} />
                {current.source && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                    current.source === "NEET-PG" ? "bg-rose-500/10 border-rose-500/30 text-rose-400" :
                    current.source === "AIIMS" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                    current.source === "PGIMER" ? "bg-violet-500/10 border-violet-500/30 text-violet-400" :
                    current.source === "JIPMER" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                    "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  }`}>
                    {current.source} {current.year}
                  </span>
                )}
                {qNotes[current.uid]?.trim() && (
                  <Pencil className="w-3.5 h-3.5 text-primary" title="Note saved" />
                )}
                {attempt && (attempt.correct
                  ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                  : <XCircle    className="w-4 h-4 text-destructive" />
                )}
              </div>
              <span className="text-[11px] font-mono text-muted-foreground shrink-0">
                {qIndex + 1} / {pool.length}
              </span>
            </div>

            {/* Image (if present) */}
            {current.imageUrl && (
              <div className="px-5 pt-4">
                <div className="rounded-xl overflow-hidden border border-border bg-black/20">
                  <img
                    src={current.imageUrl}
                    alt="Clinical image for this question"
                    className="w-full max-h-72 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                  />
                </div>
              </div>
            )}

            {/* Stem */}
            <div className="px-5 py-5">
              <p className="font-serif text-base text-foreground leading-relaxed">{current.stem}</p>
            </div>

            {/* Options */}
            <div className="px-5 pb-5 space-y-2.5">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => select(i)}
                  disabled={revealed}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm font-mono flex items-start gap-3 ${optClass(i)}`}
                >
                  <span className="font-bold shrink-0">{OPTION_LABELS[i]}.</span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {revealed && (
              <div className="mx-5 mb-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3">
                <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5">Explanation</p>
                <p className="text-sm font-mono text-foreground/80 leading-relaxed">{current.explanation}</p>
              </div>
            )}

            {/* Confidence rating */}
            {revealed && (
              <div className="mx-5 mb-2 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-muted-foreground">Confidence:</span>
                {([1, 2, 3] as const).map(r => {
                  const labels: Record<number, string> = { 1: "Guessed", 2: "Knew it", 3: "Solid" };
                  const isActive = qConfidence[current.uid] === r;
                  return (
                    <button
                      key={r}
                      onClick={() => saveConfidence(current.uid, r)}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-colors ${
                        isActive
                          ? r === 1 ? "text-foreground border-muted-foreground bg-muted/40"
                            : r === 2 ? "text-amber-300 border-amber-500 bg-amber-500/20"
                            : "text-emerald-300 border-emerald-500 bg-emerald-500/20"
                          : "text-muted-foreground border-muted-foreground/30 hover:border-muted-foreground"
                      }`}
                    >
                      {labels[r]}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Per-question annotation */}
            {revealed && (
              <QuestionNote uid={current.uid} notes={qNotes} onSave={saveNote} />
            )}
          </div>

          {/* Navigation */}
          <div className="shrink-0 flex items-center justify-between gap-3">
            <button
              onClick={() => goTo(qIndex - 1)}
              disabled={qIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 border border-border text-xs font-mono text-muted-foreground hover:text-foreground rounded-lg transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              onClick={() => goTo(Math.floor(Math.random() * pool.length))}
              className="flex items-center gap-1.5 px-4 py-2 border border-border text-xs font-mono text-muted-foreground hover:text-foreground rounded-lg transition-colors"
            >
              <Shuffle className="w-4 h-4" /> Random
            </button>
            <button
              onClick={() => goTo(qIndex + 1)}
              disabled={qIndex >= pool.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 border border-border text-xs font-mono text-muted-foreground hover:text-foreground rounded-lg transition-colors disabled:opacity-30"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
