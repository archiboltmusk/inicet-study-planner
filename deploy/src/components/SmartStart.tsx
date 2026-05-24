import { useMemo, useState } from "react";
import { safeLoad, safeSave } from "@/lib/storage";
import { QUESTIONS } from "@/data/questions";
import { SPECIFIC_PYQS } from "@/data/pyqSpecific";
import { MISTAKE_STORAGE_KEY } from "@/lib/mistakeLogger";
import { calcAllMastery } from "@/lib/mastery";
import {
  Target, CheckCircle2, Circle, BookOpen, StickyNote,
  AlertTriangle, TrendingUp, ChevronRight,
} from "lucide-react";
import type { FlaggedTopic } from "@/components/RevisionList";
import type { MainTab, NavGroup } from "@/lib/nav-config";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SmartStartProps {
  flagged: FlaggedTopic[];
  onNavigate: (group: NavGroup, tab: MainTab) => void;
}

interface MistakeEntry { subject: string; [k: string]: unknown }

// ── Subjects ordered by NEET PG weightage ─────────────────────────────────────

const SUBJECTS = [
  { name: "Medicine",          weight: 20, emoji: "🩺" },
  { name: "Surgery",           weight: 14, emoji: "🔪" },
  { name: "Pathology",         weight: 11, emoji: "🔬" },
  { name: "Pharmacology",      weight: 11, emoji: "💊" },
  { name: "OBG",               weight: 9,  emoji: "👩" },
  { name: "Paediatrics",       weight: 8,  emoji: "👶" },
  { name: "PSM",               weight: 8,  emoji: "🌍" },
  { name: "Microbiology",      weight: 6,  emoji: "🦠" },
  { name: "Forensic Medicine", weight: 4,  emoji: "⚖️" },
  { name: "Anatomy",           weight: 3,  emoji: "🦴" },
  { name: "Physiology",        weight: 2,  emoji: "⚡" },
  { name: "Biochemistry",      weight: 2,  emoji: "🧪" },
  { name: "Ophthalmology",     weight: 2,  emoji: "👁️" },
  { name: "ENT",               weight: 2,  emoji: "👂" },
  { name: "Radiology",         weight: 2,  emoji: "🩻" },
  { name: "Orthopaedics",      weight: 1,  emoji: "🦿" },
  { name: "Dermatology",       weight: 1,  emoji: "🧴" },
  { name: "Psychiatry",        weight: 1,  emoji: "🧠" },
  { name: "Anaesthesia",       weight: 1,  emoji: "😴" },
];

// Maps QUESTIONS.subject values → our canonical subject names
const PYQ_TO_SUBJECT: Record<string, string> = {
  "Medicine":              "Medicine",
  "Surgery":               "Surgery",
  "Pharmacology":          "Pharmacology",
  "Physiology":            "Physiology",
  "Biochemistry":          "Biochemistry",
  "Pathology":             "Pathology",
  "Anatomy":               "Anatomy",
  "Microbiology":          "Microbiology",
  "OBG":                   "OBG",
  "Paediatrics":           "Paediatrics",
  "ENT/Ophthalmology":     "ENT",
  "ENT":                   "ENT",
  "Ophthalmology":         "Ophthalmology",
  "PSM/Community Medicine":"PSM",
  "Forensic Medicine":     "Forensic Medicine",
  "Radiology":             "Radiology",
  "Orthopaedics":          "Orthopaedics",
  "Dermatology":           "Dermatology",
  "Psychiatry":            "Psychiatry",
  "Anaesthesia":           "Anaesthesia",
};

// Maps mistake logbook subject strings → our canonical names
const MISTAKE_TO_SUBJECT: Record<string, string> = {
  "Medicine":       "Medicine",
  "Surgery":        "Surgery",
  "Pharmacology":   "Pharmacology",
  "Physiology":     "Physiology",
  "Biochemistry":   "Biochemistry",
  "Pathology":      "Pathology",
  "Anatomy":        "Anatomy",
  "Microbiology":   "Microbiology",
  "OBG":            "OBG",
  "Paediatrics":    "Paediatrics",
  "PSM":            "PSM",
  "Forensic":       "Forensic Medicine",
  "ENT/Ophth/Derm": "ENT",
};

const FIRST_READ_KEY = "neetpg_first_read";

function daysAgoNum(dateStr: string): number {
  const today = new Date().toISOString().slice(0, 10);
  return Math.max(0, Math.round((new Date(today).getTime() - new Date(dateStr).getTime()) / 86400000));
}
function daysAgoLabel(dateStr: string): string {
  const d = daysAgoNum(dateStr);
  if (d === 0) return "Today";
  if (d === 1) return "1d ago";
  return `${d}d ago`;
}

// ── Scoring helpers ────────────────────────────────────────────────────────────

interface SubjectStats {
  name: string;
  emoji: string;
  weight: number;
  attempted: number;
  accuracy: number | null;   // null = no PYQ attempts
  mistakes: number;
  urgency: number;           // 0–1, higher = more urgent
  reasons: string[];
}

function buildStats(
  pyqAttempts: Record<string, { selected: number; correct: boolean }>,
  mistakes: MistakeEntry[],
): SubjectStats[] {
  // PYQ accuracy per subject (base questions + specific PYQs)
  const pyqBySubj = new Map<string, { attempted: number; correct: number }>();
  for (const q of QUESTIONS) {
    const canon = PYQ_TO_SUBJECT[q.subject];
    if (!canon) continue;
    const attempt = pyqAttempts[String(q.id)];
    if (!attempt) continue;
    const cur = pyqBySubj.get(canon) ?? { attempted: 0, correct: 0 };
    cur.attempted++;
    if (attempt.correct) cur.correct++;
    pyqBySubj.set(canon, cur);
  }
  for (const q of SPECIFIC_PYQS) {
    const canon = PYQ_TO_SUBJECT[q.subject] ?? q.subject;
    if (!canon) continue;
    const attempt = pyqAttempts[q.id];
    if (!attempt) continue;
    const cur = pyqBySubj.get(canon) ?? { attempted: 0, correct: 0 };
    cur.attempted++;
    if (attempt.correct) cur.correct++;
    pyqBySubj.set(canon, cur);
  }

  // Mistake count per subject
  const mistakeBySubj = new Map<string, number>();
  for (const m of mistakes) {
    const canon = MISTAKE_TO_SUBJECT[m.subject] ?? m.subject;
    mistakeBySubj.set(canon, (mistakeBySubj.get(canon) ?? 0) + 1);
  }
  const totalMistakes = mistakes.length;

  return SUBJECTS.map(s => {
    const pyq      = pyqBySubj.get(s.name);
    const accuracy = pyq ? pyq.correct / pyq.attempted : null;
    const mc       = mistakeBySubj.get(s.name) ?? 0;

    const reasons: string[] = [];
    let urgency = 0;

    if (accuracy !== null) {
      const accScore = 1 - accuracy;
      urgency += accScore * 0.7;
      reasons.push(`${Math.round(accuracy * 100)}% PYQ accuracy`);
    }
    if (mc > 0) {
      urgency += (mc / Math.max(totalMistakes, 1)) * 0.3;
      reasons.push(`${mc} mistake${mc > 1 ? "s" : ""} logged`);
    }

    // Boost high-weight subjects that have no attempts yet
    if (accuracy === null && s.weight >= 8) urgency = 0.55;

    return {
      name: s.name,
      emoji: s.emoji,
      weight: s.weight,
      attempted: pyq?.attempted ?? 0,
      accuracy,
      mistakes: mc,
      urgency,
      reasons,
    };
  });
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function SmartStart({ flagged, onNavigate }: SmartStartProps) {
  const pyqAttempts = useMemo(() =>
    safeLoad<Record<string, { selected: number; correct: boolean }>>("neetpg_pyq_attempts", {}),
    []
  );
  const mistakes = useMemo(() =>
    safeLoad<MistakeEntry[]>(MISTAKE_STORAGE_KEY, []),
    []
  );

  const [firstRead, setFirstRead] = useState<Record<string, boolean>>(() =>
    safeLoad<Record<string, boolean>>(FIRST_READ_KEY, {})
  );

  const hasData = Object.keys(pyqAttempts).length > 0 || mistakes.length > 0;

  const lastPracticed = useMemo(() =>
    safeLoad<Record<string, string>>("neetpg_subject_last_practiced", {}),
    []
  );
  const mastery = useMemo(() => calcAllMastery(SUBJECTS.map(s => s.name)), [pyqAttempts, mistakes]);
  const stats = useMemo(() => buildStats(pyqAttempts, mistakes), [pyqAttempts, mistakes]);
  const sorted = useMemo(() => [...stats].sort((a, b) => b.urgency - a.urgency), [stats]);

  const top         = sorted[0];
  const secondary   = sorted.slice(1, 4);
  const notAttempted = sorted.filter(s => s.attempted === 0 && s.accuracy === null);

  const firstReadCount = SUBJECTS.filter(s => firstRead[s.name]).length;

  const toggleRead = (name: string) => {
    const next = { ...firstRead, [name]: !firstRead[name] };
    setFirstRead(next);
    safeSave(FIRST_READ_KEY, next);
  };

  // ── Mode A: no data ──────────────────────────────────────────────────────────
  if (!hasData) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Start Your First Read</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Your first read is the foundation. Work through subjects in order of NEET PG weightage.
                Tick each one as you finish — this builds your momentum.
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>First read progress</span>
              <span className="font-mono font-medium text-foreground">{firstReadCount} / {SUBJECTS.length}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(firstReadCount / SUBJECTS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {SUBJECTS.map((s, i) => {
            const done = !!firstRead[s.name];
            return (
              <button
                key={s.name}
                onClick={() => toggleRead(s.name)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors border-b border-border/50 last:border-b-0 ${
                  done ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/40"
                }`}
              >
                {done
                  ? <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  : <Circle className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />}
                <span className="text-base leading-none flex-shrink-0">{s.emoji}</span>
                <span className={`flex-1 text-sm font-medium ${done ? "text-primary line-through decoration-primary/40" : "text-foreground"}`}>
                  {s.name}
                </span>
                {mastery[s.name] !== null && mastery[s.name] !== undefined && (
                  <span className={`text-[10px] font-mono font-bold flex-shrink-0 ${
                    (mastery[s.name] ?? 0) >= 70 ? "text-emerald-400" :
                    (mastery[s.name] ?? 0) >= 50 ? "text-amber-400" : "text-red-400"
                  }`}>
                    {mastery[s.name]}
                  </span>
                )}
                {lastPracticed[s.name] && (() => {
                  const d = daysAgoNum(lastPracticed[s.name]);
                  return (
                    <span className={`text-[9px] font-mono flex-shrink-0 ${d === 0 ? "text-emerald-400" : d <= 6 ? "text-amber-400" : "text-red-400"}`}>
                      {daysAgoLabel(lastPracticed[s.name])}
                    </span>
                  );
                })()}
                <span className="text-[10px] font-mono text-muted-foreground flex-shrink-0">
                  {s.weight}%
                </span>
              </button>
            );
          })}
        </div>

        {firstReadCount > 0 && (
          <p className="text-center text-xs text-muted-foreground">
            {firstReadCount === SUBJECTS.length
              ? "First read complete — start practising PYQs to see your focus recommendations."
              : `${SUBJECTS.length - firstReadCount} subject${SUBJECTS.length - firstReadCount > 1 ? "s" : ""} left. Once you start practising PYQs, this page shows your weakest areas.`}
          </p>
        )}
      </div>
    );
  }

  // ── Mode B: data available ───────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto space-y-4">

      {/* Today's top focus */}
      {top && top.urgency > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">Today's Focus</span>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-4xl leading-none">{top.emoji}</span>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-foreground">{top.name}</h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {top.reasons.map(r => (
                  <span key={r} className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                    {r}
                  </span>
                ))}
                <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                  {top.weight}% of NEET PG
                </span>
              </div>

              {/* Accuracy bar */}
              {top.accuracy !== null && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                    <span>PYQ accuracy</span>
                    <span className={`font-mono font-semibold ${top.accuracy < 0.5 ? "text-red-400" : top.accuracy < 0.7 ? "text-amber-400" : "text-emerald-400"}`}>
                      {Math.round(top.accuracy * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${top.accuracy < 0.5 ? "bg-red-500" : top.accuracy < 0.7 ? "bg-amber-500" : "bg-emerald-500"}`}
                      style={{ width: `${top.accuracy * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {/* Mastery score */}
              {mastery[top.name] !== null && mastery[top.name] !== undefined && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground">Mastery score</span>
                  <span className={`text-sm font-mono font-bold ${
                    (mastery[top.name] ?? 0) >= 70 ? "text-emerald-400" :
                    (mastery[top.name] ?? 0) >= 50 ? "text-amber-400" : "text-red-400"
                  }`}>{mastery[top.name]}/100</span>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => onNavigate('practice', 'pyq')}
                  className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-xs font-mono rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Practice PYQs
                </button>
                <button
                  onClick={() => onNavigate('learn', 'notes')}
                  className="flex items-center gap-1.5 px-3 py-2 border border-border text-muted-foreground hover:text-foreground text-xs font-mono rounded-lg transition-colors"
                >
                  <StickyNote className="w-3.5 h-3.5" />
                  Review Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Also needs attention */}
      {secondary.filter(s => s.urgency > 0).length > 0 && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border/60 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">Also needs attention</span>
          </div>
          {secondary.filter(s => s.urgency > 0).map(s => (
            <button
              key={s.name}
              onClick={() => onNavigate('practice', 'pyq')}
              className="w-full flex items-center gap-3 px-5 py-3 border-b border-border/40 last:border-b-0 hover:bg-muted/40 transition-colors text-left"
            >
              <span className="text-lg leading-none">{s.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{s.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {s.reasons.join(" · ")}
                  {lastPracticed[s.name] ? ` · ${daysAgoLabel(lastPracticed[s.name])}` : ""}
                </div>
              </div>
              {s.accuracy !== null && (
                <div className="flex-shrink-0">
                  <div className={`text-xs font-mono font-semibold ${s.accuracy < 0.5 ? "text-red-400" : s.accuracy < 0.7 ? "text-amber-400" : "text-emerald-400"}`}>
                    {Math.round(s.accuracy * 100)}%
                  </div>
                </div>
              )}
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* Not yet attempted */}
      {notAttempted.length > 0 && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border/60 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">Not yet attempted</span>
          </div>
          <div className="px-5 py-3 flex flex-wrap gap-2">
            {notAttempted.map(s => (
              <button
                key={s.name}
                onClick={() => onNavigate('practice', 'pyq')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 hover:bg-muted/80 rounded-full text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{s.emoji}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Flagged topics count */}
      {flagged.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-3 flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-xs text-amber-300 flex-1">
            {flagged.length} flagged topic{flagged.length > 1 ? "s" : ""} pending review
          </span>
          <button
            onClick={() => onNavigate('practice', 'revision')}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            Review <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
