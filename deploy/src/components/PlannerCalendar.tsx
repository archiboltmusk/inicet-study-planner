import { useState, useMemo } from "react";
import {
  Lock, Flame, CalendarDays, Trophy, Star, GraduationCap,
  ChevronRight, Target, RefreshCw,
} from "lucide-react";
import { MARROW_SCHEDULE, NEXT_TESTS, type MarrowPhase, type MarrowDay } from "@/data/marrow-schedule";
import { SCHEDULE } from "@/data/schedule";
import { safeLoad } from "@/lib/storage";

// ─── Read Daily Plan completion from storage ──────────────────────────────────

const TODO_STORAGE_KEY = "unified_todos_v2";
const BTR_START_ISO    = "2026-05-23";

function getBTRDayNum(iso: string): number | null {
  const start  = new Date(BTR_START_ISO + "T00:00:00");
  const target = new Date(iso + "T00:00:00");
  const idx    = Math.round((target.getTime() - start.getTime()) / 86400000);
  if (idx < 0 || idx >= SCHEDULE.length) return null;
  return idx + 1;
}

function getTodayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysUntil(iso: string): number {
  const target = new Date(iso + "T00:00:00");
  const today  = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

// ─── Subject → short label + colour ──────────────────────────────────────────

const SUBJECT_CHIP: Record<string, { short: string; cls: string }> = {
  "Medicine":          { short: "Med",   cls: "bg-blue-500/30 text-blue-300" },
  "Surgery":           { short: "Surg",  cls: "bg-orange-500/30 text-orange-300" },
  "Pathology":         { short: "Path",  cls: "bg-rose-500/30 text-rose-300" },
  "Pharmacology":      { short: "Pharm", cls: "bg-violet-500/30 text-violet-300" },
  "OBG":               { short: "OBG",   cls: "bg-pink-500/30 text-pink-300" },
  "Paediatrics":       { short: "Paed",  cls: "bg-yellow-500/30 text-yellow-300" },
  "Community Medicine":{ short: "PSM",   cls: "bg-emerald-500/30 text-emerald-300" },
  "Microbiology":      { short: "Micro", cls: "bg-lime-500/30 text-lime-300" },
  "Forensic Medicine": { short: "For",   cls: "bg-neutral-500/30 text-neutral-300" },
  "Anatomy":           { short: "Anat",  cls: "bg-sky-500/30 text-sky-300" },
  "Biochemistry":      { short: "Bio",   cls: "bg-teal-500/30 text-teal-300" },
  "Physiology":        { short: "Phys",  cls: "bg-cyan-500/30 text-cyan-300" },
  "ENT":               { short: "ENT",   cls: "bg-purple-500/30 text-purple-300" },
  "Ophthalmology":     { short: "Opht",  cls: "bg-indigo-500/30 text-indigo-300" },
  "Dermatology":       { short: "Derm",  cls: "bg-amber-500/30 text-amber-300" },
  "Radiology":         { short: "Rad",   cls: "bg-gray-500/30 text-gray-300" },
  "Psychiatry":        { short: "Psych", cls: "bg-fuchsia-500/30 text-fuchsia-300" },
  "Orthopaedics":      { short: "Orth",  cls: "bg-stone-500/30 text-stone-300" },
  "Anaesthesia":       { short: "Anaes", cls: "bg-slate-500/30 text-slate-300" },
};

const PHASE_BORDER: Record<MarrowPhase, string> = {
  1: "border-blue-500/40",
  2: "border-violet-500/40",
  3: "border-amber-500/40",
  4: "border-emerald-500/40",
  5: "border-rose-500/40",
};

// ─── Day summary labels ───────────────────────────────────────────────────────

function daySubjects(day: MarrowDay): string[] {
  if (day.isExamDay)     return ["EXAM"];
  if (day.isTest)        return [day.testName?.replace("Grand Test ", "GT") ?? "GT"];
  if (day.isBuffer)      return ["Rest"];
  if (day.isOpenRevision) return ["Open"];
  return [...new Set(day.activities.map(a => a.subject))];
}

// ─── DayCell ──────────────────────────────────────────────────────────────────

function DayCell({
  day, isToday, isPast, checkedCount, totalCount, onSelect, isSelected,
}: {
  day: MarrowDay;
  isToday: boolean;
  isPast: boolean;
  checkedCount: number;
  totalCount: number;
  onSelect: () => void;
  isSelected: boolean;
}) {
  const subjects   = daySubjects(day);
  const chip       = subjects[0] ? SUBJECT_CHIP[subjects[0]] : null;
  const pct        = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
  const isDone     = isPast && pct === 100;
  const isPartial  = isPast && pct > 0 && pct < 100;
  const btrDayNum  = getBTRDayNum(day.iso);

  const cellBg = day.isExamDay  ? "bg-rose-500/20 border-rose-500/50" :
                 day.isTest     ? "bg-amber-500/15 border-amber-500/40" :
                 day.isBuffer   ? "bg-muted/20 border-border/30" :
                 isToday        ? "bg-primary/15 border-primary/50" :
                 isDone         ? "bg-emerald-500/10 border-emerald-500/30" :
                 isSelected     ? "bg-primary/10 border-primary/40" :
                 isPast         ? "bg-muted/10 border-border/20 opacity-70" :
                                  "bg-card border-border/40 hover:bg-muted/10";

  return (
    <button
      onClick={onSelect}
      className={`relative rounded-lg border text-left transition-all p-1.5 ${cellBg} ${isSelected ? "ring-1 ring-primary/60" : ""}`}
    >
      {/* Day number */}
      <div className="flex items-center justify-between mb-0.5">
        <span className={`text-[9px] font-mono font-bold ${isToday ? "text-primary" : isPast ? "text-muted-foreground" : "text-foreground/80"}`}>
          {day.day}
        </span>
        {day.isTest     && <Lock className="w-2.5 h-2.5 text-amber-400" />}
        {day.isExamDay  && <Trophy className="w-2.5 h-2.5 text-rose-400" />}
        {isDone         && <span className="text-[8px] text-emerald-400">✓</span>}
        {isPartial      && <span className="text-[8px] text-blue-400">{pct}%</span>}
        {isToday        && <Flame className="w-2.5 h-2.5 text-orange-400" />}
      </div>

      {/* Subject chip */}
      {chip && !day.isTest && !day.isBuffer && !day.isExamDay && !day.isOpenRevision && (
        <span className={`text-[7px] font-mono px-1 py-0.5 rounded ${chip.cls}`}>
          {chip.short}{subjects[0]?.includes("R") ? "" : ""}
          {day.activities[0]?.revision ? ` ${day.activities[0].revision}` : ""}
        </span>
      )}
      {day.isTest && (
        <span className="text-[7px] font-mono text-amber-400 block truncate">
          {subjects[0]}
        </span>
      )}
      {day.isBuffer      && <span className="text-[7px] font-mono text-muted-foreground">Rest</span>}
      {day.isOpenRevision && <span className="text-[7px] font-mono text-violet-400">Open</span>}
      {day.isExamDay     && <span className="text-[7px] font-mono text-rose-400">EXAM</span>}

      {/* BTR badge */}
      {btrDayNum && (
        <span className="absolute top-0.5 right-0.5 text-[6px] font-mono text-amber-400/50">
          B{btrDayNum}
        </span>
      )}
    </button>
  );
}

// ─── Expanded day detail ──────────────────────────────────────────────────────

function DayDetailPanel({
  day, checkedCount, totalCount, onGoToDailyPlan,
}: {
  day: MarrowDay;
  checkedCount: number;
  totalCount: number;
  onGoToDailyPlan: (iso: string) => void;
}) {
  const btrIdx = getBTRDayNum(day.iso);
  const btr    = btrIdx !== null ? SCHEDULE[btrIdx - 1] : null;
  const pct    = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className={`rounded-2xl border ${PHASE_BORDER[day.phase]} bg-card p-4 space-y-3`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono bg-muted/30 px-2 py-0.5 rounded-full text-muted-foreground">
              Marrow Day {day.day}
            </span>
            {btrIdx && (
              <span className="text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full text-amber-400">
                BTR Day {btrIdx}
              </span>
            )}
            {day.isTest && (
              <span className="text-[10px] font-mono bg-amber-500/10 border border-amber-500/40 px-2 py-0.5 rounded-full text-amber-400 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> Fixed
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-foreground mt-1">{day.label}</p>
        </div>
        {totalCount > 0 && (
          <div className="text-right shrink-0">
            <p className={`text-lg font-mono font-bold ${pct === 100 ? "text-emerald-400" : pct > 0 ? "text-blue-400" : "text-muted-foreground"}`}>
              {pct}%
            </p>
            <p className="text-[9px] font-mono text-muted-foreground">{checkedCount}/{totalCount} done</p>
          </div>
        )}
      </div>

      {/* Marrow activities */}
      {day.activities.length > 0 && (
        <div>
          <p className="text-[9px] font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">Marrow</p>
          <div className="flex flex-wrap gap-1.5">
            {day.activities.map((a, i) => {
              const ch = SUBJECT_CHIP[a.subject];
              return (
                <span key={i} className={`text-[10px] font-mono px-2 py-1 rounded-lg border ${ch?.cls ?? "bg-muted/20 text-muted-foreground border-border"}`}>
                  {a.subject}{a.revision ? ` ${a.revision}` : ""} · {Math.floor(a.hours)}h
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* BTR focus */}
      {btr && (
        <div>
          <p className="text-[9px] font-mono text-muted-foreground mb-1 uppercase tracking-wider">Core BTR Focus</p>
          <p className="text-[10px] font-mono text-amber-300">{btr.subject} · {btr.focus}</p>
        </div>
      )}

      {/* Test info */}
      {day.isTest && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-3 py-2">
          <p className="text-[10px] font-mono font-bold text-amber-400">🔒 {day.testName}</p>
          <p className="text-[9px] font-mono text-muted-foreground">Fixed date — attempt in real exam conditions</p>
        </div>
      )}
      {day.isBuffer && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-2">
          <p className="text-[10px] font-mono text-emerald-400">Recovery day — analyse GT mistakes, rest, exercise</p>
        </div>
      )}
      {day.isOpenRevision && (
        <div className="bg-violet-500/10 border border-violet-500/30 rounded-xl px-3 py-2">
          <p className="text-[10px] font-mono text-violet-400">Open revision — weakest subjects, custom mock</p>
        </div>
      )}
      {day.isExamDay && (
        <div className="bg-rose-500/15 border border-rose-500/40 rounded-xl px-3 py-2">
          <p className="text-[10px] font-mono font-bold text-rose-400">🎯 NEET-PG 2026 — Exam Day</p>
        </div>
      )}

      {/* Go to Daily Plan */}
      <button
        onClick={() => onGoToDailyPlan(day.iso)}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/20 border border-primary/30 text-primary text-[11px] font-mono hover:bg-primary/30 transition-colors"
      >
        Open Daily Plan for this day <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  onGoToDailyPlan?: (iso: string) => void;
}

export function PlannerCalendar({ onGoToDailyPlan }: Props) {
  const todayIso = getTodayIso();
  const [selectedDay, setSelectedDay] = useState<MarrowDay | null>(
    () => MARROW_SCHEDULE.find(d => d.iso === todayIso) ?? null
  );
  const [phaseFilter, setPhaseFilter] = useState<MarrowPhase | "all">("all");

  // Load Daily Plan completion counts per day
  const todoStore = useMemo(
    () => safeLoad<Record<string, string[]>>(TODO_STORAGE_KEY, {}),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Count total and checked items per day (rough estimate based on day type)
  function getDayItemCounts(day: MarrowDay): { checked: number; total: number } {
    const checked = (todoStore[day.iso] ?? []).length;
    // Estimate total based on day type (matches DailyTodoList generation)
    const total = day.isExamDay ? 8
      : day.isTest   ? 13
      : day.isBuffer ? 12
      : day.isOpenRevision ? 11
      : day.activities.length === 0 ? 0
      : 8 + day.activities.length + (day.activities.flatMap(a => a.subject).length * 2);
    return { checked, total };
  }

  // Stats
  const totalDays   = MARROW_SCHEDULE.length;
  const passedDays  = MARROW_SCHEDULE.filter(d => d.iso < todayIso).length;
  const nextTest    = NEXT_TESTS.find(t => t.iso >= todayIso);
  const completedWithTodos = MARROW_SCHEDULE.filter(d => {
    const { checked, total } = getDayItemCounts(d);
    return total > 0 && checked >= Math.ceil(total * 0.8);
  }).length;

  const phases: (MarrowPhase | "all")[] = ["all", 1, 2, 3, 4, 5];
  const phaseLabels: Record<string, string> = {
    all: "All 100", 1: "P1·R1", 2: "P2·R2", 3: "P3·R3", 4: "P4·R4", 5: "Final",
  };

  const visibleDays = phaseFilter === "all"
    ? MARROW_SCHEDULE
    : MARROW_SCHEDULE.filter(d => d.phase === phaseFilter);

  const selCounts = selectedDay ? getDayItemCounts(selectedDay) : { checked: 0, total: 0 };

  return (
    <div className="flex flex-col gap-4 pb-24">

      {/* ── Header ── */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">100-Day Journey Map</h2>
        </div>
        <p className="text-[11px] font-mono text-muted-foreground">
          Every Marrow day with BTR overlay · tap any day to see details + open its Daily Plan
        </p>
      </div>

      {/* ── Stats row ── */}
      <div className="px-4 grid grid-cols-3 gap-2">
        {[
          { label: "Days passed", value: String(passedDays), sub: `of ${totalDays}`, color: "text-blue-400" },
          { label: "Completed", value: String(completedWithTodos), sub: "≥80% done", color: "text-emerald-400" },
          { label: nextTest?.name.replace("Grand Test ", "GT") ?? "All done", value: nextTest ? `${daysUntil(nextTest.iso)}d` : "🎓", sub: "next test", color: "text-amber-400" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl px-3 py-2.5 text-center">
            <p className={`text-lg font-mono font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[9px] font-mono text-muted-foreground">{s.label}</p>
            <p className="text-[8px] font-mono text-muted-foreground/60">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-muted-foreground">Journey progress</span>
          <span className="text-[10px] font-mono text-primary font-bold">
            {Math.round((passedDays / totalDays) * 100)}% · Day {passedDays}/{totalDays}
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-700"
            style={{ width: `${Math.round((passedDays / totalDays) * 100)}%` }}
          />
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="px-4 flex flex-wrap gap-2">
        {[
          { cls: "bg-blue-500/30 text-blue-300",   label: "Med" },
          { cls: "bg-orange-500/30 text-orange-300",label: "Surg" },
          { cls: "bg-rose-500/30 text-rose-300",    label: "Path" },
          { cls: "bg-pink-500/30 text-pink-300",    label: "OBG" },
          { cls: "bg-amber-500/15 text-amber-400",  label: "GT 🔒" },
          { cls: "bg-emerald-500/10 text-emerald-400", label: "Done ✓" },
          { cls: "bg-primary/15 text-primary",      label: "Today" },
        ].map(l => (
          <span key={l.label} className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${l.cls}`}>
            {l.label}
          </span>
        ))}
      </div>

      {/* ── Phase filter ── */}
      <div className="px-4 flex gap-1.5 overflow-x-auto pb-1">
        {phases.map(p => (
          <button
            key={p}
            onClick={() => setPhaseFilter(p)}
            className={`shrink-0 text-[10px] font-mono px-3 py-1.5 rounded-full border transition-colors ${
              phaseFilter === p
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/20 text-muted-foreground border-border hover:border-primary/40"
            }`}
          >
            {phaseLabels[String(p)]}
          </button>
        ))}
      </div>

      {/* ── Day grid ── */}
      <div className="px-4">
        <div className="grid grid-cols-7 gap-1">
          {visibleDays.map(day => {
            const { checked, total } = getDayItemCounts(day);
            return (
              <DayCell
                key={day.day}
                day={day}
                isToday={day.iso === todayIso}
                isPast={day.iso < todayIso}
                checkedCount={checked}
                totalCount={total}
                isSelected={selectedDay?.day === day.day}
                onSelect={() => setSelectedDay(prev => prev?.day === day.day ? null : day)}
              />
            );
          })}
        </div>
      </div>

      {/* ── Selected day detail ── */}
      {selectedDay && (
        <div className="px-4">
          <DayDetailPanel
            day={selectedDay}
            checkedCount={selCounts.checked}
            totalCount={selCounts.total}
            onGoToDailyPlan={iso => onGoToDailyPlan?.(iso)}
          />
        </div>
      )}

      {/* ── Upcoming GTs ── */}
      <div className="px-4">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">Upcoming tests</p>
        <div className="space-y-1.5">
          {NEXT_TESTS.filter(t => t.iso >= todayIso).map(t => {
            const d = daysUntil(t.iso);
            return (
              <div key={t.name} className="flex items-center justify-between bg-card border border-border rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-2">
                  {t.name.includes("NEET") ? <Trophy className="w-3.5 h-3.5 text-rose-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                  <span className="text-[11px] font-mono text-foreground">{t.name}</span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-mono font-bold ${d === 0 ? "text-rose-400" : d <= 7 ? "text-amber-400" : "text-muted-foreground"}`}>
                    {d === 0 ? "TODAY" : `${d}d`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
