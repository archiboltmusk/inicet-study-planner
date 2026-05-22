import { useState, useMemo } from "react";
import { CalendarDays, Clock, Trophy, ChevronDown, ChevronUp, CheckCircle2, Circle, Zap, BookOpen, RotateCcw } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type EntryType = "grandtest" | "study" | "revision";
type Phase = "milestone" | "phase1" | "phase2" | "phase3" | "phase4" | "final";

interface ScheduleEntry {
  id: number;
  phase: Phase;
  phaseLabel: string;
  startDate: Date;
  endDate: Date;
  subjects: string;
  testDate?: Date;
  testLabel?: string;
  type: EntryType;
  gtNumber?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseDate(y: number, m: number, d: number) {
  return new Date(y, m - 1, d);
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function formatDateFull(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function isInRange(date: Date, start: Date, end: Date) {
  return date >= start && date <= end;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function countdownLabel(target: Date, today: Date): string {
  const diff = daysBetween(today, target);
  if (diff < 0) return "Past";
  if (diff === 0) return "Today!";
  if (diff === 1) return "Tomorrow";
  return `${diff}d away`;
}

// ─── Schedule Data ────────────────────────────────────────────────────────────

const TODAY = new Date(2026, 4, 22); // 2026-05-22

const SCHEDULE: ScheduleEntry[] = [
  // MILESTONE
  {
    id: 1,
    phase: "milestone",
    phaseLabel: "Milestone",
    startDate: parseDate(2026, 5, 23),
    endDate:   parseDate(2026, 5, 26),
    subjects:  "Baseline Grand Test",
    type:      "grandtest",
    gtNumber:  "GT-4",
  },
  // PHASE 1
  {
    id: 2,
    phase: "phase1",
    phaseLabel: "Phase 1",
    startDate: parseDate(2026, 5, 27),
    endDate:   parseDate(2026, 5, 30),
    subjects:  "Surgery",
    testDate:  parseDate(2026, 5, 30),
    type:      "study",
  },
  {
    id: 3,
    phase: "phase1",
    phaseLabel: "Phase 1",
    startDate: parseDate(2026, 5, 31),
    endDate:   parseDate(2026, 6, 1),
    subjects:  "Orthopaedics",
    testDate:  parseDate(2026, 6, 4),
    type:      "study",
  },
  {
    id: 4,
    phase: "phase1",
    phaseLabel: "Phase 1",
    startDate: parseDate(2026, 6, 2),
    endDate:   parseDate(2026, 6, 3),
    subjects:  "Radiology",
    testDate:  parseDate(2026, 6, 4),
    type:      "study",
  },
  {
    id: 5,
    phase: "phase1",
    phaseLabel: "Phase 1",
    startDate: parseDate(2026, 6, 5),
    endDate:   parseDate(2026, 6, 7),
    subjects:  "Microbiology",
    testDate:  parseDate(2026, 6, 7),
    type:      "study",
  },
  {
    id: 6,
    phase: "phase1",
    phaseLabel: "Phase 1",
    startDate: parseDate(2026, 6, 8),
    endDate:   parseDate(2026, 6, 10),
    subjects:  "Anatomy",
    testDate:  parseDate(2026, 6, 11),
    type:      "study",
  },
  {
    id: 7,
    phase: "phase1",
    phaseLabel: "Phase 1",
    startDate: parseDate(2026, 6, 9),
    endDate:   parseDate(2026, 6, 12),
    subjects:  "Core BTR GT-5",
    type:      "grandtest",
    gtNumber:  "GT-5",
  },
  // PHASE 2
  {
    id: 8,
    phase: "phase2",
    phaseLabel: "Phase 2",
    startDate: parseDate(2026, 6, 13),
    endDate:   parseDate(2026, 6, 16),
    subjects:  "CVS + Renal + Haematology + GI",
    testDate:  parseDate(2026, 6, 16),
    testLabel: "Integrated Systems-1 Test",
    type:      "study",
  },
  {
    id: 9,
    phase: "phase2",
    phaseLabel: "Phase 2",
    startDate: parseDate(2026, 6, 17),
    endDate:   parseDate(2026, 6, 20),
    subjects:  "Neuro + Endocrine + Rheumatology + Respiratory",
    type:      "study",
  },
  {
    id: 10,
    phase: "phase2",
    phaseLabel: "Phase 2",
    startDate: parseDate(2026, 6, 21),
    endDate:   parseDate(2026, 6, 22),
    subjects:  "General Pathology + Pharmacology + Physiology + Immunology",
    testDate:  parseDate(2026, 6, 23),
    testLabel: "Integrated Systems-2 Test",
    type:      "study",
  },
  {
    id: 11,
    phase: "phase2",
    phaseLabel: "Phase 2",
    startDate: parseDate(2026, 6, 21),
    endDate:   parseDate(2026, 6, 24),
    subjects:  "Core BTR GT-6",
    type:      "grandtest",
    gtNumber:  "GT-6",
  },
  // PHASE 3
  {
    id: 12,
    phase: "phase3",
    phaseLabel: "Phase 3",
    startDate: parseDate(2026, 6, 25),
    endDate:   parseDate(2026, 6, 28),
    subjects:  "OBG",
    testDate:  parseDate(2026, 6, 28),
    type:      "study",
  },
  {
    id: 13,
    phase: "phase3",
    phaseLabel: "Phase 3",
    startDate: parseDate(2026, 6, 29),
    endDate:   parseDate(2026, 6, 30),
    subjects:  "Paediatrics",
    testDate:  parseDate(2026, 7, 1),
    type:      "study",
  },
  {
    id: 14,
    phase: "phase3",
    phaseLabel: "Phase 3",
    startDate: parseDate(2026, 7, 2),
    endDate:   parseDate(2026, 7, 5),
    subjects:  "PSM / Community Medicine",
    testDate:  parseDate(2026, 7, 5),
    type:      "study",
  },
  {
    id: 15,
    phase: "phase3",
    phaseLabel: "Phase 3",
    startDate: parseDate(2026, 7, 6),
    endDate:   parseDate(2026, 7, 7),
    subjects:  "Dermatology",
    testDate:  parseDate(2026, 7, 10),
    type:      "study",
  },
  {
    id: 16,
    phase: "phase3",
    phaseLabel: "Phase 3",
    startDate: parseDate(2026, 7, 8),
    endDate:   parseDate(2026, 7, 9),
    subjects:  "Anaesthesia",
    testDate:  parseDate(2026, 7, 10),
    type:      "study",
  },
  {
    id: 17,
    phase: "phase3",
    phaseLabel: "Phase 3",
    startDate: parseDate(2026, 7, 8),
    endDate:   parseDate(2026, 7, 11),
    subjects:  "Core BTR GT-7",
    type:      "grandtest",
    gtNumber:  "GT-7",
  },
  // PHASE 4
  {
    id: 18,
    phase: "phase4",
    phaseLabel: "Phase 4",
    startDate: parseDate(2026, 7, 12),
    endDate:   parseDate(2026, 7, 14),
    subjects:  "Biochemistry",
    testDate:  parseDate(2026, 7, 15),
    type:      "study",
  },
  {
    id: 19,
    phase: "phase4",
    phaseLabel: "Phase 4",
    startDate: parseDate(2026, 7, 16),
    endDate:   parseDate(2026, 7, 17),
    subjects:  "Forensic Medicine & Toxicology",
    testDate:  parseDate(2026, 7, 19),
    type:      "study",
  },
  {
    id: 20,
    phase: "phase4",
    phaseLabel: "Phase 4",
    startDate: parseDate(2026, 7, 18),
    endDate:   parseDate(2026, 7, 19),
    subjects:  "Psychiatry",
    testDate:  parseDate(2026, 7, 19),
    type:      "study",
  },
  {
    id: 21,
    phase: "phase4",
    phaseLabel: "Phase 4",
    startDate: parseDate(2026, 7, 20),
    endDate:   parseDate(2026, 7, 21),
    subjects:  "ENT",
    testDate:  parseDate(2026, 7, 25),
    type:      "study",
  },
  {
    id: 22,
    phase: "phase4",
    phaseLabel: "Phase 4",
    startDate: parseDate(2026, 7, 22),
    endDate:   parseDate(2026, 7, 24),
    subjects:  "Ophthalmology",
    testDate:  parseDate(2026, 7, 25),
    type:      "study",
  },
  {
    id: 23,
    phase: "phase4",
    phaseLabel: "Phase 4",
    startDate: parseDate(2026, 7, 23),
    endDate:   parseDate(2026, 7, 26),
    subjects:  "Core BTR GT-8",
    type:      "grandtest",
    gtNumber:  "GT-8",
  },
  // FINAL
  {
    id: 24,
    phase: "final",
    phaseLabel: "Final",
    startDate: parseDate(2026, 7, 27),
    endDate:   parseDate(2026, 8, 22),
    subjects:  "Revision Cycle #2",
    type:      "revision",
  },
  {
    id: 25,
    phase: "final",
    phaseLabel: "Final",
    startDate: parseDate(2026, 8, 23),
    endDate:   parseDate(2026, 8, 30),
    subjects:  "Revision Cycle #3 — Mega-NEET BTR",
    type:      "revision",
  },
];

// ─── Styling Config ───────────────────────────────────────────────────────────

const PHASE_BORDER: Record<Phase, string> = {
  milestone: "border-blue-500",
  phase1:    "border-amber-500",
  phase2:    "border-violet-500",
  phase3:    "border-emerald-500",
  phase4:    "border-sky-500",
  final:     "border-green-500",
};

const PHASE_LABEL_COLOR: Record<Phase, string> = {
  milestone: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  phase1:    "bg-amber-500/20 text-amber-400 border-amber-500/30",
  phase2:    "bg-violet-500/20 text-violet-400 border-violet-500/30",
  phase3:    "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  phase4:    "bg-sky-500/20 text-sky-400 border-sky-500/30",
  final:     "bg-green-500/20 text-green-400 border-green-500/30",
};

const PHASE_FILTER_OPTIONS: { value: Phase | "all"; label: string }[] = [
  { value: "all",       label: "All Phases" },
  { value: "milestone", label: "Baseline GT" },
  { value: "phase1",    label: "Phase 1 — May/Jun" },
  { value: "phase2",    label: "Phase 2 — Jun" },
  { value: "phase3",    label: "Phase 3 — Jun/Jul" },
  { value: "phase4",    label: "Phase 4 — Jul" },
  { value: "final",     label: "Final Revision" },
];

// ─── Progress ─────────────────────────────────────────────────────────────────

function getStatus(entry: ScheduleEntry, today: Date): "done" | "active" | "upcoming" {
  if (today > entry.endDate) return "done";
  if (isInRange(today, entry.startDate, entry.endDate)) return "active";
  return "upcoming";
}

// ─── Next Upcoming Test ───────────────────────────────────────────────────────

function getNextTest(today: Date): { label: string; date: Date; countdown: string } | null {
  const upcoming = SCHEDULE
    .filter(e => e.testDate && e.testDate >= today)
    .sort((a, b) => a.testDate!.getTime() - b.testDate!.getTime());
  if (!upcoming.length) return null;
  const next = upcoming[0];
  return {
    label:     next.testLabel ?? `${next.subjects} Test`,
    date:      next.testDate!,
    countdown: countdownLabel(next.testDate!, today),
  };
}

// ─── Type Icon ────────────────────────────────────────────────────────────────

function TypeIcon({ type }: { type: EntryType }) {
  if (type === "grandtest") return <Trophy className="w-4 h-4 shrink-0" />;
  if (type === "revision")  return <RotateCcw className="w-4 h-4 shrink-0" />;
  return <BookOpen className="w-4 h-4 shrink-0" />;
}

// ─── Grand Test Row ───────────────────────────────────────────────────────────

function GrandTestRow({ entry, today }: { entry: ScheduleEntry; today: Date }) {
  const status = getStatus(entry, today);
  const isActive = status === "active";
  const isDone   = status === "done";

  return (
    <div className={`
      rounded-xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3
      ${isDone ? "bg-blue-900/30 border border-blue-700/40" : "bg-blue-600 border border-blue-500"}
      ${isActive ? "ring-2 ring-yellow-400 ring-offset-1 ring-offset-background" : ""}
      relative overflow-hidden
    `}>
      {isDone && (
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(255,255,255,0.03)_6px,rgba(255,255,255,0.03)_12px)]" />
      )}
      <div className={`flex items-center gap-2 ${isDone ? "text-blue-400" : "text-white"}`}>
        <Trophy className="w-5 h-5 shrink-0" />
        <span className="text-xs font-mono font-bold uppercase tracking-wider">{entry.gtNumber}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className={`font-semibold text-sm ${isDone ? "text-blue-300" : "text-white"}`}>
          {entry.subjects}
        </div>
        <div className={`text-xs font-mono mt-0.5 ${isDone ? "text-blue-400/70" : "text-blue-100"}`}>
          {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {isActive && (
          <span className="px-2 py-0.5 bg-yellow-400 text-yellow-900 text-[10px] font-mono font-bold rounded-full animate-pulse">
            ACTIVE NOW
          </span>
        )}
        {isDone && (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-800/60 text-blue-300 text-[10px] font-mono rounded-full">
            <CheckCircle2 className="w-3 h-3" /> Done
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Study/Revision Row ───────────────────────────────────────────────────────

function StudyRow({ entry, today }: { entry: ScheduleEntry; today: Date }) {
  const status = getStatus(entry, today);
  const isActive = status === "active";
  const isDone   = status === "done";
  const isToday  = isInRange(today, entry.startDate, entry.endDate);

  const borderClass   = entry.type === "revision" ? "border-green-500/50" : PHASE_BORDER[entry.phase];
  const bgClass       = entry.type === "revision" ? "bg-green-900/20" : "bg-card";
  const opacityClass  = isDone ? "opacity-60" : "";

  return (
    <div className={`
      rounded-xl border-l-4 ${borderClass} ${bgClass} ${opacityClass}
      border border-border px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3
      ${isActive ? "ring-2 ring-yellow-400 ring-offset-1 ring-offset-background" : ""}
      transition-all
    `}>
      {/* Status indicator */}
      <div className="shrink-0 mt-0.5">
        {isDone   ? <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                  : isActive
                  ? <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                  : <Circle className="w-4 h-4 text-muted-foreground/40" />}
      </div>

      {/* Date range */}
      <div className="shrink-0 w-28 text-xs font-mono text-muted-foreground">
        {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
      </div>

      {/* Subject + icon */}
      <div className="flex-1 min-w-0 flex items-start gap-2">
        <TypeIcon type={entry.type} />
        <div>
          <div className="font-medium text-sm text-foreground leading-tight">{entry.subjects}</div>
          {isToday && (
            <div className="text-[10px] font-mono text-yellow-400 mt-0.5 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" /> Today is in this range
            </div>
          )}
        </div>
      </div>

      {/* Test date badge */}
      {entry.testDate && (
        <div className="shrink-0 flex flex-col items-end gap-1">
          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-mono rounded-full whitespace-nowrap">
            Test: {formatDate(entry.testDate)}
          </span>
          {entry.testLabel && (
            <span className="text-[9px] font-mono text-muted-foreground text-right max-w-[140px] leading-tight">
              {entry.testLabel}
            </span>
          )}
          {!isDone && (
            <span className="text-[10px] font-mono text-muted-foreground/60">
              {countdownLabel(entry.testDate, today)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Phase Header ─────────────────────────────────────────────────────────────

function PhaseHeader({
  phase,
  label,
  count,
  doneCount,
  collapsed,
  onToggle,
}: {
  phase: Phase;
  label: string;
  count: number;
  doneCount: number;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pct = count > 0 ? Math.round((doneCount / count) * 100) : 0;
  const colorClass = PHASE_LABEL_COLOR[phase];

  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 py-2 px-1 group"
    >
      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${colorClass}`}>
        {label}
      </span>
      <div className="flex-1 h-px bg-border group-hover:bg-border/60 transition-colors" />
      <span className="text-[10px] font-mono text-muted-foreground shrink-0">
        {doneCount}/{count} done · {pct}%
      </span>
      {collapsed
        ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        : <ChevronUp   className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CoreBTRSchedule() {
  const [phaseFilter, setPhaseFilter] = useState<Phase | "all">("all");
  const [collapsed, setCollapsed]     = useState<Record<string, boolean>>({});

  const today = TODAY;

  const filteredEntries = useMemo(() =>
    phaseFilter === "all"
      ? SCHEDULE
      : SCHEDULE.filter(e => e.phase === phaseFilter),
    [phaseFilter]
  );

  // Group by phase for headers
  const phases = useMemo(() => {
    const map: Record<string, ScheduleEntry[]> = {};
    for (const e of filteredEntries) {
      if (!map[e.phase]) map[e.phase] = [];
      map[e.phase].push(e);
    }
    return map;
  }, [filteredEntries]);

  const phaseOrder: Phase[] = ["milestone", "phase1", "phase2", "phase3", "phase4", "final"];
  const phaseLabels: Record<Phase, string> = {
    milestone: "Milestone — Baseline GT",
    phase1:    "Phase 1 — May / June",
    phase2:    "Phase 2 — June (Integrated Systems)",
    phase3:    "Phase 3 — June / July",
    phase4:    "Phase 4 — July",
    final:     "Final Revision Cycles",
  };

  // Progress stats
  const totalEntries = SCHEDULE.length;
  const doneEntries  = SCHEDULE.filter(e => getStatus(e, today) === "done").length;
  const activeEntry  = SCHEDULE.find(e => getStatus(e, today) === "active");
  const nextTest     = getNextTest(today);

  const toggleCollapse = (phase: string) =>
    setCollapsed(c => ({ ...c, [phase]: !c[phase] }));

  const overallPct = totalEntries > 0 ? Math.round((doneEntries / totalEntries) * 100) : 0;

  return (
    <div className="flex flex-col gap-5">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Core BTR Schedule
          </h2>
          <p className="text-sm text-muted-foreground font-mono mt-0.5">
            NEET PG 2026 — by Zainab Vora maam
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {nextTest && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-muted-foreground">Next Test</span>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  {formatDate(nextTest.date)} · {nextTest.countdown}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Overall Progress ────────────────────────────────────────────────── */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Overall Progress</span>
          <span className="text-xs font-mono text-muted-foreground">{doneEntries} / {totalEntries} phases done</span>
        </div>
        <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span>{overallPct}% complete</span>
          {activeEntry && (
            <span className="flex items-center gap-1 text-yellow-400">
              <Zap className="w-3 h-3" />
              Active: {activeEntry.subjects}
            </span>
          )}
        </div>
      </div>

      {/* ── Phase Filter ────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5">
        {PHASE_FILTER_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => setPhaseFilter(opt.value)}
            className={`
              px-3 py-1 rounded-full text-xs font-mono border transition-colors
              ${phaseFilter === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground"}
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Today Banner ────────────────────────────────────────────────────── */}
      {(() => {
        const todayEntry = SCHEDULE.find(e => isInRange(today, e.startDate, e.endDate));
        if (!todayEntry) return null;
        return (
          <div className="flex items-center gap-3 px-4 py-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <Zap className="w-4 h-4 text-yellow-400 shrink-0 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-yellow-400/70 uppercase tracking-wider">Currently Active</span>
              <span className="text-sm font-semibold text-yellow-300">{todayEntry.subjects}</span>
            </div>
            <span className="ml-auto text-xs font-mono text-muted-foreground">{formatDateFull(today)}</span>
          </div>
        );
      })()}

      {/* ── Schedule Entries ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        {phaseOrder.map(phase => {
          const entries = phases[phase];
          if (!entries || entries.length === 0) return null;

          const phaseDone = entries.filter(e => getStatus(e, today) === "done").length;
          const isCollapsed = collapsed[phase];

          return (
            <div key={phase} className="flex flex-col gap-2">
              <PhaseHeader
                phase={phase}
                label={phaseLabels[phase]}
                count={entries.length}
                doneCount={phaseDone}
                collapsed={isCollapsed ?? false}
                onToggle={() => toggleCollapse(phase)}
              />
              {!isCollapsed && (
                <div className="flex flex-col gap-2 pl-1">
                  {entries.map(entry =>
                    entry.type === "grandtest" ? (
                      <GrandTestRow key={entry.id} entry={entry} today={today} />
                    ) : (
                      <StudyRow key={entry.id} entry={entry} today={today} />
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Legend ──────────────────────────────────────────────────────────── */}
      <div className="border border-border rounded-xl p-3 bg-card">
        <p className="text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-wider">Legend</p>
        <div className="flex flex-wrap gap-3">
          {[
            { icon: <Trophy className="w-3.5 h-3.5 text-blue-400" />,   label: "Grand Test" },
            { icon: <BookOpen className="w-3.5 h-3.5 text-foreground" />, label: "Study Block" },
            { icon: <RotateCcw className="w-3.5 h-3.5 text-green-400" />, label: "Revision Cycle" },
            { icon: <Zap className="w-3.5 h-3.5 text-yellow-400" />,     label: "Active Today" },
            { icon: <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />, label: "Completed" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              {icon}
              <span className="text-[11px] font-mono text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
