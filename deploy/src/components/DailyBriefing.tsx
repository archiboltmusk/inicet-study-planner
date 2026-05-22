import { useState, useMemo } from "react";
import {
  Flame, Calendar, TrendingDown, Zap, BookOpen, Target,
  AlertTriangle, Clock, ChevronDown, ChevronUp, Star,
  CheckCircle2, BarChart2, Brain, Crosshair, Trophy,
} from "lucide-react";
import { QUESTION_SUBJECTS } from "@/data/questions";
import { safeLoad } from "@/lib/storage";

// ─── Types ────────────────────────────────────────────────────────────────────

interface McqScore { attempted: number; correct: number; }

export interface DailyBriefingProps {
  completedDays: number[];
  mcqScores: Record<number, McqScore>;
  streak: { count: number; longest: number; lastDate: string };
  examDate: Date;
  onGoToTab: (tab: string) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TODAY_ISO = new Date().toISOString().slice(0, 10);

function getDaysToExam(examDate: Date): number {
  return Math.max(0, Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
}

const SUBJECT_DAYS: Record<string, number[]> = {
  Medicine:      [1, 2, 3, 4],
  Surgery:       [5, 6],
  Pathology:     [7, 8],
  Pharmacology:  [9, 10],
  OBG:           [11, 12],
  Paediatrics:   [13],
  "PSM":         [14, 15],
  Microbiology:  [16, 17],
  "Forensic Medicine": [18],
  Physiology:    [19],
  Biochemistry:  [20],
  Anatomy:       [21],
  "ENT/Ophthalmology": [22],
};

interface SubjectAccuracy { subject: string; attempted: number; accuracy: number; }

function computeWeakSubjects(
  completedDays: number[],
  mcqScores: Record<number, McqScore>
): SubjectAccuracy[] {
  const results: SubjectAccuracy[] = [];
  for (const [subj, days] of Object.entries(SUBJECT_DAYS)) {
    let attempted = 0, correct = 0;
    days.filter(d => completedDays.includes(d)).forEach(d => {
      const s = mcqScores[d];
      if (s?.attempted) { attempted += s.attempted; correct += s.correct; }
    });
    if (attempted > 0) {
      results.push({ subject: subj, attempted, accuracy: Math.round((correct / attempted) * 100) });
    }
  }
  return results.sort((a, b) => a.accuracy - b.accuracy);
}

function getPlanDay(completedDays: number[]): number {
  for (let d = 1; d <= 28; d++) {
    if (!completedDays.includes(d)) return d;
  }
  return 28;
}

function getTodayMood(): number | null {
  const log = safeLoad<Record<string, number>>("stress_log", {});
  return log[TODAY_ISO] ?? null;
}

// Core BTR phase based on today's date
function getCoreBTRPhase(): { label: string; color: string; bg: string; subjects: string } {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  const stamp = y * 10000 + m * 100 + d;

  if (stamp >= 20260523 && stamp <= 20260526) return { label: "Baseline GT-4", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30", subjects: "Grand Test" };
  if (stamp >= 20260527 && stamp <= 20260530) return { label: "Phase 1 · Surgery", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30", subjects: "Surgery" };
  if (stamp >= 20260531 && stamp <= 20260601) return { label: "Phase 1 · Ortho", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30", subjects: "Orthopaedics" };
  if (stamp >= 20260602 && stamp <= 20260603) return { label: "Phase 1 · Radiology", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30", subjects: "Radiology" };
  if (stamp >= 20260605 && stamp <= 20260607) return { label: "Phase 1 · Microbiology", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30", subjects: "Microbiology" };
  if (stamp >= 20260608 && stamp <= 20260610) return { label: "Phase 1 · Anatomy", color: "text-amber-400", bg: "bg-amber-500/15 border-amber-500/30", subjects: "Anatomy" };
  if (stamp >= 20260609 && stamp <= 20260612) return { label: "Core BTR GT-5", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30", subjects: "Grand Test" };
  if (stamp >= 20260613 && stamp <= 20260616) return { label: "Phase 2 · CVS+Renal+Hemat+GI", color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/30", subjects: "Integrated Systems 1" };
  if (stamp >= 20260617 && stamp <= 20260620) return { label: "Phase 2 · Neuro+Endo+Rheumat+Respi", color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/30", subjects: "Integrated Systems" };
  if (stamp >= 20260621 && stamp <= 20260622) return { label: "Phase 2 · Path+Pharm+Physio+Immuno", color: "text-violet-400", bg: "bg-violet-500/15 border-violet-500/30", subjects: "Integrated Systems 2" };
  if (stamp >= 20260621 && stamp <= 20260624) return { label: "Core BTR GT-6", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30", subjects: "Grand Test" };
  if (stamp >= 20260625 && stamp <= 20260628) return { label: "Phase 3 · OBG", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30", subjects: "OBG" };
  if (stamp >= 20260629 && stamp <= 20260630) return { label: "Phase 3 · Paediatrics", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30", subjects: "Paediatrics" };
  if (stamp >= 20260702 && stamp <= 20260705) return { label: "Phase 3 · PSM", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30", subjects: "PSM" };
  if (stamp >= 20260706 && stamp <= 20260707) return { label: "Phase 3 · Dermatology", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30", subjects: "Dermatology" };
  if (stamp >= 20260708 && stamp <= 20260709) return { label: "Phase 3 · Anesthesia", color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30", subjects: "Anesthesia" };
  if (stamp >= 20260708 && stamp <= 20260711) return { label: "Core BTR GT-7", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30", subjects: "Grand Test" };
  if (stamp >= 20260712 && stamp <= 20260714) return { label: "Phase 4 · Biochemistry", color: "text-sky-400", bg: "bg-sky-500/15 border-sky-500/30", subjects: "Biochemistry" };
  if (stamp >= 20260716 && stamp <= 20260717) return { label: "Phase 4 · FMT", color: "text-sky-400", bg: "bg-sky-500/15 border-sky-500/30", subjects: "Forensic Medicine" };
  if (stamp >= 20260718 && stamp <= 20260719) return { label: "Phase 4 · Psychiatry", color: "text-sky-400", bg: "bg-sky-500/15 border-sky-500/30", subjects: "Psychiatry" };
  if (stamp >= 20260720 && stamp <= 20260721) return { label: "Phase 4 · ENT", color: "text-sky-400", bg: "bg-sky-500/15 border-sky-500/30", subjects: "ENT" };
  if (stamp >= 20260722 && stamp <= 20260724) return { label: "Phase 4 · Ophthalmology", color: "text-sky-400", bg: "bg-sky-500/15 border-sky-500/30", subjects: "Ophthalmology" };
  if (stamp >= 20260723 && stamp <= 20260726) return { label: "Core BTR GT-8", color: "text-blue-400", bg: "bg-blue-500/15 border-blue-500/30", subjects: "Grand Test" };
  if (stamp >= 20260727 && stamp <= 20260822) return { label: "Revision Cycle #2", color: "text-green-400", bg: "bg-green-500/15 border-green-500/30", subjects: "Full Revision" };
  if (stamp >= 20260823 && stamp <= 20260830) return { label: "Mega-NEET BTR · Revision #3", color: "text-rose-400", bg: "bg-rose-500/15 border-rose-500/30", subjects: "Final Revision" };
  return { label: "Pre-schedule", color: "text-muted-foreground", bg: "bg-muted/20 border-border", subjects: "Start Core BTR" };
}

const ZV_TIPS = [
  "Don't just read — recall. Active recall is the single most powerful revision tool you have.",
  "Surgery, Medicine, OBG, Paeds — master these four first. They carry 60% of marks.",
  "Grand Tests are simulations. Treat every GT like the real exam and analyse every mistake.",
  "Read the explanation even for correct answers — lucky guesses are your biggest blind spots.",
  "Your rank is decided not by what you study, but by what you remember on exam day.",
  "One bad day is data, not destiny. Log it, learn from it, show up tomorrow.",
  "Three revisions minimum. First is understanding. Second is connection. Third is ownership.",
  "Teach it to yourself out loud. If you can't explain it simply, you don't know it yet.",
  "The last 30 days are the great equaliser. Consistent revision moves 1000+ ranks.",
  "Compare yourself only to yesterday's version of yourself.",
  "No new topics after August 1st. Your brain needs consolidation, not new overload.",
  "Protect your sleep. 7 hours minimum. Sleep-deprived revision is 40% less effective.",
  "Every wrong answer in a GT deserves 5 minutes of root-cause analysis.",
  "Consistency beats intensity. One hour daily for 100 days beats 10-hour cramming.",
];

interface DayPlan {
  blocks: Array<{ mins: number; label: string; action: string; tab: string }>;
}

function buildDayPlan(weakSubjs: SubjectAccuracy[], daysLeft: number, mood: number | null, planDay: number): DayPlan {
  const moodFactor = mood === null ? 1 : mood <= 2 ? 0.4 : mood === 3 ? 0.7 : 1;
  const isMockPhase = planDay >= 25;
  const isRevPhase = planDay >= 19;
  const base = moodFactor < 0.5 ? "light" : moodFactor < 0.8 ? "normal" : "full";
  const weakest = weakSubjs[0]?.subject ?? "weakest subject";
  const second  = weakSubjs[1]?.subject ?? weakest;

  if (isMockPhase) return {
    blocks: [
      { mins: base === "light" ? 30 : 60, label: "Mock Test",     action: "Full timed simulation",         tab: "simulation"    },
      { mins: base === "light" ? 15 : 30, label: "Review wrongs", action: "Analyse mistake logbook",       tab: "mistakelogbook"},
      { mins: base === "light" ? 10 : 20, label: "One-liners",    action: "High-yield rapid revision",     tab: "oneliners"     },
    ],
  };

  if (isRevPhase || daysLeft <= 7) return {
    blocks: [
      { mins: base === "light" ? 20 : 45, label: weakest,    action: `Drill 25 ${weakest} MCQs`,   tab: "drills"    },
      { mins: base === "light" ? 15 : 30, label: "PYQ Bank", action: "20 PYQs from weak subjects", tab: "pyq"       },
      { mins: base === "light" ? 10 : 20, label: "One-liners",action: "Quick revision sweep",      tab: "oneliners" },
    ],
  };

  return {
    blocks: [
      { mins: base === "light" ? 15 : 45, label: "Today's chapter", action: `Day ${planDay} topics in Planner`,     tab: "planner"   },
      { mins: base === "light" ? 15 : 30, label: weakest,           action: `Drill 25 ${weakest} MCQs`,            tab: "drills"    },
      { mins: base === "light" ?  5 : 20, label: second,            action: `10 ${second} rapid questions`,        tab: "rapid"     },
      ...(base === "full" ? [{ mins: 15, label: "One-liners", action: "5-min one-liner sweep", tab: "oneliners" }] : []),
    ],
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DailyBriefing({ completedDays, mcqScores, streak, examDate, onGoToTab }: DailyBriefingProps) {
  const [expanded, setExpanded] = useState<boolean>(true);

  const daysLeft      = useMemo(() => getDaysToExam(examDate), [examDate]);
  const planDay       = useMemo(() => getPlanDay(completedDays), [completedDays]);
  const weakSubjs     = useMemo(() => computeWeakSubjects(completedDays, mcqScores), [completedDays, mcqScores]);
  const isBehind      = completedDays.length < planDay - 1;
  const studiedToday  = streak.lastDate === TODAY_ISO;
  const todayMood     = useMemo(() => getTodayMood(), []);
  const dayPlan       = useMemo(() => buildDayPlan(weakSubjs, daysLeft, todayMood, planDay), [weakSubjs, daysLeft, todayMood, planDay]);
  const totalPlanMins = dayPlan.blocks.reduce((s, b) => s + b.mins, 0);
  const btrPhase      = useMemo(() => getCoreBTRPhase(), []);
  const zvTip         = ZV_TIPS[Math.floor(Date.now() / 86400000) % ZV_TIPS.length];
  const streakActive  = studiedToday && streak.count > 0;
  const top3Weak      = weakSubjs.slice(0, 3);
  const completionPct = Math.round((completedDays.length / 28) * 100);

  // Urgency
  const urgencyColor = daysLeft > 30 ? "text-emerald-400" : daysLeft >= 14 ? "text-yellow-400" : "text-red-400";
  const urgencyBg    = daysLeft > 30 ? "bg-emerald-500/10 border-emerald-500/25" : daysLeft >= 14 ? "bg-yellow-500/10 border-yellow-500/25" : "bg-red-500/10 border-red-500/25";

  const greeting = isBehind
    ? "You're behind — catch up today!"
    : studiedToday
    ? `Great work! Day ${planDay} · keep the momentum`
    : `Day ${planDay} · Let's get it done!`;

  const moodLabel = todayMood === null ? null
    : todayMood <= 2 ? "😴 Low energy — light plan active"
    : todayMood === 3 ? "😐 Normal mode"
    : todayMood === 4 ? "🙂 Focused mode"
    : "🚀 Peak mode — push hard today!";

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">

      {/* ── Collapsible header ─────────────────────────────────────────────── */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full px-5 pt-4 pb-3 hover:bg-white/[0.03] transition-colors text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {isBehind
                ? <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                : studiedToday
                ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                : <Target className="w-4 h-4 text-primary shrink-0" />}
              <p className="text-sm font-bold text-foreground">{greeting}</p>
            </div>
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden max-w-[140px]">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${completionPct}%` }} />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">{completedDays.length}/28 days · {completionPct}%</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-mono ${streakActive ? "bg-orange-500/15 border-orange-500/30 text-orange-400" : "bg-muted/30 border-border text-muted-foreground"}`}>
              <Flame className="w-3 h-3" />
              {streak.count}d
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full border text-[10px] font-mono ${urgencyBg} ${urgencyColor}`}>
              <Calendar className="w-3 h-3" />
              {daysLeft}d
            </div>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border/40 px-5 pb-5 pt-4 flex flex-col gap-3.5">

          {/* Core BTR Phase */}
          <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${btrPhase.bg}`}>
            <Trophy className={`w-4 h-4 shrink-0 ${btrPhase.color}`} />
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-mono font-bold ${btrPhase.color}`}>Core BTR — {btrPhase.label}</p>
              <p className="text-[10px] font-mono text-muted-foreground">{btrPhase.subjects}</p>
            </div>
            <button
              onClick={() => onGoToTab("coreBTR")}
              className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition-colors ${btrPhase.bg} ${btrPhase.color} hover:opacity-80`}
            >
              View →
            </button>
          </div>

          {/* Mood */}
          {moodLabel && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-[11px] font-mono ${
              todayMood! <= 2 ? "bg-amber-500/8 border-amber-500/25 text-amber-400"
              : todayMood === 3 ? "bg-muted/20 border-border text-muted-foreground"
              : todayMood === 4 ? "bg-blue-500/8 border-blue-500/25 text-blue-400"
              : "bg-emerald-500/8 border-emerald-500/25 text-emerald-400"
            }`}>
              {moodLabel}
              {todayMood! <= 2 && <span className="ml-auto text-[10px] opacity-70">targets reduced</span>}
            </div>
          )}

          {/* Weak subjects */}
          <div className="bg-background/60 border border-border/60 rounded-xl px-4 py-3">
            <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider mb-2.5 flex items-center gap-1.5">
              <TrendingDown className="w-3 h-3 text-red-400" />
              {top3Weak.length > 0 ? "Weak subjects — focus here" : "Today's priority"}
            </p>
            {top3Weak.length > 0 ? (
              <div className="flex flex-col gap-2">
                {top3Weak.map(s => (
                  <div key={s.subject} className="flex items-center gap-2">
                    <span className="text-xs font-mono text-foreground w-36 truncate shrink-0">{s.subject}</span>
                    <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${s.accuracy}%`,
                          backgroundColor: s.accuracy < 60 ? "#ef4444" : s.accuracy < 75 ? "#eab308" : "#22c55e",
                        }}
                      />
                    </div>
                    <span className={`text-xs font-mono font-bold w-9 text-right shrink-0 ${s.accuracy < 60 ? "text-red-400" : s.accuracy < 75 ? "text-yellow-400" : "text-emerald-400"}`}>
                      {s.accuracy}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-mono text-muted-foreground">Complete MCQs after each subject to see your weak areas here.</p>
            )}
          </div>

          {/* Today's plan */}
          <div className="bg-background/60 border border-border/60 rounded-xl px-4 py-3">
            <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider mb-2.5 flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-primary" />
              Today's plan
              <span className="ml-auto font-bold text-primary">{totalPlanMins} min</span>
              {todayMood !== null && todayMood <= 2 && <span className="text-amber-400 text-[9px] ml-1">light mode</span>}
            </p>
            <ol className="flex flex-col gap-2">
              {dayPlan.blocks.map((block, i) => (
                <li key={i}>
                  <button
                    onClick={() => onGoToTab(block.tab)}
                    className="w-full flex items-center gap-3 text-left group"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 group-hover:bg-primary/25 transition-colors">
                      {i + 1}
                    </span>
                    <span className="flex-1 text-xs font-mono text-foreground/80 group-hover:text-foreground transition-colors">{block.action}</span>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">{block.mins}m →</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* Streak + exam countdown — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border ${streakActive ? "bg-orange-500/8 border-orange-500/25" : "bg-background/60 border-border/60"}`}>
              <Flame className={`w-5 h-5 shrink-0 ${streakActive ? "text-orange-400" : "text-muted-foreground"}`} />
              <div>
                <p className={`text-xs font-mono font-bold leading-tight ${streakActive ? "text-orange-400" : "text-foreground"}`}>
                  {streakActive ? `${streak.count}-day streak!` : streak.count > 0 ? "Restart streak" : "Start streak"}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">Best: {streak.longest}d</p>
              </div>
            </div>
            <div className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border ${urgencyBg}`}>
              <Calendar className={`w-5 h-5 shrink-0 ${urgencyColor}`} />
              <div>
                <p className={`text-xs font-mono font-bold leading-tight ${urgencyColor}`}>{daysLeft}d left</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  {daysLeft > 30 ? "Stay consistent" : daysLeft >= 14 ? "Final stretch" : "Last lap!"}
                </p>
              </div>
            </div>
          </div>

          {/* Zainab Vora daily tip */}
          <div className="bg-gradient-to-r from-violet-900/20 to-blue-900/20 border border-violet-500/20 rounded-xl px-4 py-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star className="w-3 h-3 text-yellow-400" />
              <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider">Zainab Vora — Daily Tip</span>
            </div>
            <p className="text-xs text-foreground/90 leading-relaxed italic">"{zvTip}"</p>
            <button
              onClick={() => onGoToTab("zainabvora")}
              className="mt-2 text-[10px] font-mono text-violet-400 hover:text-violet-300 transition-colors"
            >
              See all tips & strategy →
            </button>
          </div>

          {/* Quick actions */}
          <div>
            <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider mb-2">Quick actions</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onGoToTab("pyq")}
                className="flex items-center gap-2 px-3 py-2.5 bg-primary/10 border border-primary/30 text-primary text-xs font-mono rounded-xl hover:bg-primary/20 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                PYQ Practice
              </button>
              <button
                onClick={() => onGoToTab("rapid")}
                className="flex items-center gap-2 px-3 py-2.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono rounded-xl hover:bg-yellow-500/20 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 shrink-0" />
                Rapid Revision
              </button>
              <button
                onClick={() => onGoToTab("drills")}
                className="flex items-center gap-2 px-3 py-2.5 bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-mono rounded-xl hover:bg-violet-500/20 transition-colors"
              >
                <Crosshair className="w-3.5 h-3.5 shrink-0" />
                Subject Drill
              </button>
              <button
                onClick={() => onGoToTab("simulation")}
                className="flex items-center gap-2 px-3 py-2.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono rounded-xl hover:bg-rose-500/20 transition-colors"
              >
                <BarChart2 className="w-3.5 h-3.5 shrink-0" />
                Mock Test
              </button>
              <button
                onClick={() => onGoToTab("mistakelogbook")}
                className="flex items-center gap-2 px-3 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono rounded-xl hover:bg-amber-500/20 transition-colors"
              >
                <Brain className="w-3.5 h-3.5 shrink-0" />
                Mistake Log
              </button>
              <button
                onClick={() => onGoToTab("aichat")}
                className="flex items-center gap-2 px-3 py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-xl hover:bg-emerald-500/20 transition-colors"
              >
                <Target className="w-3.5 h-3.5 shrink-0" />
                AI Tutor
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
