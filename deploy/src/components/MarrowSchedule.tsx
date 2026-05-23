import { useState, useMemo, useCallback } from "react";
import {
  CalendarDays, Trophy, ChevronDown, ChevronUp,
  Zap, CheckCircle2, Circle, Flame, Star, TrendingUp,
  Lock, Pencil, Plus, Trash2, RotateCcw, Save, X, GraduationCap,
} from "lucide-react";
import {
  MARROW_SCHEDULE, MARROW_PHASE_LABELS, NEXT_TESTS, getTodayMarrowDay,
  type MarrowDay, type MarrowActivity, type MarrowPhase,
} from "@/data/marrow-schedule";
import { safeLoad, safeSave } from "@/lib/storage";

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "marrow_custom_schedule";

const ALL_SUBJECTS = [
  "Anatomy", "Biochemistry", "Physiology", "Pharmacology",
  "Microbiology", "Pathology", "Community Medicine", "Forensic Medicine",
  "Ophthalmology", "ENT", "Anaesthesia", "Medicine", "Surgery",
  "Paediatrics", "OBG", "Dermatology", "Radiology", "Psychiatry", "Orthopaedics",
] as const;

const REVISION_OPTIONS = ["", "R2", "R3", "R4"] as const;

const SUBJECT_MAP: Record<string, string> = {
  "Anatomy": "Anatomy", "Biochemistry": "Biochemistry", "Physiology": "Physiology",
  "Pharmacology": "Pharmacology", "Microbiology": "Microbiology", "Pathology": "Pathology",
  "Community Medicine": "PSM/Community Medicine", "Forensic Medicine": "Forensic Medicine",
  "Ophthalmology": "ENT/Ophthalmology", "ENT": "ENT/Ophthalmology",
  "Medicine": "Medicine", "Surgery": "Surgery", "Paediatrics": "Paediatrics", "OBG": "OBG",
  "Orthopaedics": "Surgery",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysUntil(iso: string): number {
  const target = new Date(iso + "T00:00:00");
  const today  = new Date(); today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

function hoursLabel(h: number): string {
  const wh = Math.floor(h);
  const wm = Math.round((h - wh) * 60);
  if (wm === 0) return `${wh}h`;
  if (wh === 0) return `${wm}m`;
  return `${wh}h ${wm}m`;
}

// ─── Custom schedule state ────────────────────────────────────────────────────

type CustomDayActivities = { subject: string; hours: number; revision: string }[];
type CustomScheduleStore = Record<number, CustomDayActivities>; // key = day number

function loadCustom(): CustomScheduleStore {
  return safeLoad<CustomScheduleStore>(STORAGE_KEY, {});
}

function saveCustom(store: CustomScheduleStore) {
  safeSave(STORAGE_KEY, store);
}

function getEffectiveActivities(day: MarrowDay, custom: CustomScheduleStore): MarrowActivity[] {
  if (custom[day.day]) {
    return custom[day.day].map(a => ({
      subject: a.subject,
      hours: a.hours,
      revision: a.revision || undefined,
      drillSubject: SUBJECT_MAP[a.subject],
    }));
  }
  return day.activities;
}

// ─── Style maps ──────────────────────────────────────────────────────────────

const PHASE_COLORS: Record<MarrowPhase, string> = {
  1: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  2: "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
  3: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
  4: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
  5: "from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-400",
};

const PHASE_BADGE: Record<MarrowPhase, string> = {
  1: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  2: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  3: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  4: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  5: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const SUBJECT_COLORS: Record<string, string> = {
  "Anatomy":           "bg-sky-500/10 text-sky-300 border-sky-500/30",
  "Biochemistry":      "bg-teal-500/10 text-teal-300 border-teal-500/30",
  "Physiology":        "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  "Pharmacology":      "bg-violet-500/10 text-violet-300 border-violet-500/30",
  "Microbiology":      "bg-lime-500/10 text-lime-300 border-lime-500/30",
  "Pathology":         "bg-rose-500/10 text-rose-300 border-rose-500/30",
  "Community Medicine":"bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  "Forensic Medicine": "bg-neutral-500/10 text-neutral-300 border-neutral-500/30",
  "Ophthalmology":     "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  "ENT":               "bg-purple-500/10 text-purple-300 border-purple-500/30",
  "Anaesthesia":       "bg-slate-500/10 text-slate-300 border-slate-500/30",
  "Medicine":          "bg-blue-500/10 text-blue-300 border-blue-500/30",
  "Surgery":           "bg-orange-500/10 text-orange-300 border-orange-500/30",
  "Paediatrics":       "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  "OBG":               "bg-pink-500/10 text-pink-300 border-pink-500/30",
  "Dermatology":       "bg-amber-500/10 text-amber-300 border-amber-500/30",
  "Radiology":         "bg-gray-500/10 text-gray-300 border-gray-500/30",
  "Psychiatry":        "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
  "Orthopaedics":      "bg-stone-500/10 text-stone-300 border-stone-500/30",
};

// ─── Day Editor Modal ─────────────────────────────────────────────────────────

interface DayEditorProps {
  day: MarrowDay;
  current: CustomDayActivities;
  onSave: (activities: CustomDayActivities) => void;
  onReset: () => void;
  onClose: () => void;
}

function DayEditor({ day, current, onSave, onReset, onClose }: DayEditorProps) {
  const [rows, setRows] = useState<CustomDayActivities>(
    current.length > 0 ? current :
    day.activities.map(a => ({ subject: a.subject, hours: a.hours, revision: a.revision ?? "" }))
  );

  const addRow = () => setRows(r => [...r, { subject: "Medicine", hours: 4, revision: "" }]);
  const removeRow = (i: number) => setRows(r => r.filter((_, idx) => idx !== i));
  const updateRow = (i: number, field: keyof CustomDayActivities[number], val: string | number) =>
    setRows(r => r.map((row, idx) => idx === i ? { ...row, [field]: val } : row));

  const totalHours = rows.reduce((s, r) => s + Number(r.hours), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm px-4 pb-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <p className="text-sm font-mono font-bold text-foreground">
              Edit Day {day.day} · {day.label}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground">
              {totalHours.toFixed(1)}h planned · Grand tests are fixed and cannot be changed
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/30 transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Subject rows */}
        <div className="px-4 py-3 space-y-2 max-h-72 overflow-y-auto">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-2">
              {/* Subject select */}
              <select
                value={row.subject}
                onChange={e => updateRow(i, "subject", e.target.value)}
                className="flex-1 min-w-0 text-xs font-mono bg-muted/20 border border-border rounded-lg px-2 py-1.5 text-foreground"
              >
                {ALL_SUBJECTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {/* Hours input */}
              <input
                type="number"
                min={0.25} max={12} step={0.25}
                value={row.hours}
                onChange={e => updateRow(i, "hours", parseFloat(e.target.value) || 0)}
                className="w-16 text-xs font-mono bg-muted/20 border border-border rounded-lg px-2 py-1.5 text-foreground text-center"
              />
              <span className="text-[9px] font-mono text-muted-foreground shrink-0">h</span>
              {/* Revision select */}
              <select
                value={row.revision}
                onChange={e => updateRow(i, "revision", e.target.value)}
                className="w-14 text-xs font-mono bg-muted/20 border border-border rounded-lg px-1 py-1.5 text-foreground"
              >
                {REVISION_OPTIONS.map(r => (
                  <option key={r} value={r}>{r || "—"}</option>
                ))}
              </select>
              {/* Remove */}
              <button onClick={() => removeRow(i)} className="shrink-0 p-1 rounded hover:bg-destructive/20 transition-colors">
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
          <button
            onClick={addRow}
            className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-border rounded-lg text-[10px] font-mono text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
          >
            <Plus className="w-3 h-3" /> Add subject
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
          <button
            onClick={() => { onReset(); onClose(); }}
            className="flex items-center gap-1.5 text-[10px] font-mono px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:border-primary/40 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset to default
          </button>
          <button
            onClick={() => { onSave(rows); onClose(); }}
            className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-mono px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Save className="w-3 h-3" /> Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Next Test Banner ─────────────────────────────────────────────────────────

function NextTestBanner() {
  const next = useMemo(() => {
    const today = todayIso();
    return NEXT_TESTS.find(t => t.iso >= today) ?? null;
  }, []);

  if (!next) return null;
  const d = daysUntil(next.iso);
  const isExam = next.name === "NEET-PG 2026";

  return (
    <div className={`rounded-xl border px-4 py-3 flex items-center justify-between gap-3 bg-gradient-to-r ${
      isExam
        ? "from-rose-500/20 to-rose-500/5 border-rose-500/40"
        : "from-amber-500/15 to-amber-500/5 border-amber-500/30"
    }`}>
      <div className="flex items-center gap-2 min-w-0">
        <Trophy className={`w-4 h-4 shrink-0 ${isExam ? "text-rose-400" : "text-amber-400"}`} />
        <div className="min-w-0">
          <p className={`text-xs font-mono font-bold ${isExam ? "text-rose-400" : "text-amber-400"}`}>
            {d === 0 ? "🔥 TODAY: " : "Next: "}{next.name}
            <span className="ml-2 text-[9px] font-normal border border-amber-500/30 px-1.5 py-0.5 rounded-full">🔒 Fixed date</span>
          </p>
          <p className="text-[10px] font-mono text-muted-foreground">{next.iso}</p>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className={`text-lg font-mono font-bold ${isExam ? "text-rose-400" : "text-amber-400"}`}>
          {d === 0 ? "TODAY" : d < 0 ? "DONE" : `${d}d`}
        </p>
        <p className="text-[9px] font-mono text-muted-foreground uppercase">{d > 0 ? "to go" : d === 0 ? "!" : "past"}</p>
      </div>
    </div>
  );
}

// ─── Today Card ───────────────────────────────────────────────────────────────

function TodayCard({
  day, custom, onDrill, onEdit, editMode,
}: {
  day: MarrowDay;
  custom: CustomScheduleStore;
  onDrill: (subject: string) => void;
  onEdit: () => void;
  editMode: boolean;
}) {
  const ph = day.phase;
  const activities = getEffectiveActivities(day, custom);
  const isEditable = !day.isTest && !day.isExamDay;
  const isCustomised = !!custom[day.day];

  return (
    <div className={`rounded-xl border bg-gradient-to-br p-4 ${PHASE_COLORS[ph]}`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border bg-background/30 text-foreground/70">
              Today · Day {day.day}
            </span>
            <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${PHASE_BADGE[ph]}`}>
              {MARROW_PHASE_LABELS[ph]}
            </span>
            {isCustomised && (
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border bg-primary/20 border-primary/30 text-primary">
                ✎ Customised
              </span>
            )}
          </div>
          <p className="text-xs font-mono text-muted-foreground mt-1">{day.label}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {day.isTest
            ? <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            : <Flame className="w-5 h-5 text-orange-400 shrink-0" />}
          {isEditable && editMode && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1 text-[9px] font-mono px-2 py-1 rounded-lg border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Pencil className="w-3 h-3" /> Edit
            </button>
          )}
        </div>
      </div>

      {day.isExamDay && (
        <div className="text-center py-4">
          <p className="text-2xl font-bold text-rose-400">🎯 NEET-PG 2026</p>
          <p className="text-sm font-mono text-rose-300 mt-1">Exam Day — You've got this!</p>
        </div>
      )}

      {day.isTest && (
        <div className="flex items-center gap-2 bg-background/30 rounded-lg px-3 py-2.5">
          <Lock className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <p className="text-xs font-mono font-bold text-amber-400">{day.testName} · Fixed</p>
            <p className="text-[10px] font-mono text-muted-foreground">Grand Test dates cannot be changed — treat it like the real exam</p>
          </div>
        </div>
      )}

      {day.isBuffer && (
        <div className="flex items-center gap-2 bg-background/30 rounded-lg px-3 py-2.5">
          <Star className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-mono font-bold text-emerald-400">Buffer Day — Deep review</p>
            <p className="text-[10px] font-mono text-muted-foreground">Analyse every wrong answer, revise weak areas</p>
          </div>
        </div>
      )}

      {day.isOpenRevision && !day.isExamDay && (
        <div className="flex items-center gap-2 bg-background/30 rounded-lg px-3 py-2.5">
          <TrendingUp className="w-4 h-4 text-violet-400 shrink-0" />
          <div>
            <p className="text-xs font-mono font-bold text-violet-400">Open Revision Day</p>
            <p className="text-[10px] font-mono text-muted-foreground">Revise weakest subjects + Core BTR revision plan</p>
          </div>
        </div>
      )}

      {activities.length > 0 && (
        <div className="space-y-2">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center justify-between bg-background/30 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`text-[9px] px-1.5 py-0.5 rounded border font-mono ${SUBJECT_COLORS[a.subject] ?? "bg-muted/30 text-muted-foreground border-border"}`}>
                  {a.revision ? `${a.subject} ${a.revision}` : a.subject}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">{hoursLabel(a.hours)}</span>
              </div>
              {a.drillSubject && (
                <button
                  onClick={() => onDrill(a.drillSubject!)}
                  className="flex items-center gap-1 text-[9px] font-mono px-2 py-1 rounded bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-colors shrink-0"
                >
                  <Zap className="w-3 h-3" /> Practice
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Day Row ──────────────────────────────────────────────────────────────────

function DayRow({
  day, isToday, isPastDay, editMode, custom, onEditDay, onDrill,
}: {
  day: MarrowDay;
  isToday: boolean;
  isPastDay: boolean;
  editMode: boolean;
  custom: CustomScheduleStore;
  onEditDay: (day: MarrowDay) => void;
  onDrill: (subject: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const ph = day.phase;
  const activities = getEffectiveActivities(day, custom);
  const isEditable = !day.isTest && !day.isExamDay;
  const isCustomised = !!custom[day.day];

  const rowBg = isToday
    ? "bg-primary/10 border-primary/30"
    : isPastDay
    ? "bg-muted/20 border-border/30 opacity-60"
    : "bg-card border-border hover:bg-muted/10";

  const summary = day.isExamDay ? "🎯 NEET-PG 2026 EXAM DAY"
    : day.isTest ? `🔒 ${day.testName} — Fixed`
    : day.isBuffer ? "📋 Buffer — Review & Analyse"
    : day.isOpenRevision ? "🔄 Open Revision"
    : activities.map(a => a.revision ? `${a.subject}(${a.revision})` : a.subject).join(" + ") || "—";

  return (
    <div className={`rounded-xl border transition-all ${rowBg}`}>
      <div className="flex items-center gap-2 px-3 py-2.5">
        {/* Day number */}
        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
          isToday ? "bg-primary text-primary-foreground" : PHASE_BADGE[ph]
        }`}>
          {day.day}
        </div>

        {/* Date + summary — clickable to expand */}
        <button
          className="min-w-0 flex-1 text-left"
          onClick={() => activities.length > 0 && setExpanded(e => !e)}
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-xs font-mono ${isToday ? "text-primary font-bold" : "text-foreground"}`}>
              {day.label}
            </span>
            {isToday && <span className="text-[9px] font-mono bg-primary/20 text-primary px-1.5 py-0.5 rounded-full border border-primary/30">TODAY</span>}
            {isCustomised && <span className="text-[9px] font-mono bg-primary/10 text-primary/70 px-1.5 py-0.5 rounded-full">✎</span>}
            {day.isTest && <span className="text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded-full">🔒</span>}
          </div>
          <p className="text-[10px] font-mono text-muted-foreground mt-0.5 truncate">{summary}</p>
        </button>

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-1">
          {isPastDay
            ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            : isToday
            ? <Flame className="w-4 h-4 text-orange-400" />
            : day.isTest
            ? <Lock className="w-3.5 h-3.5 text-amber-400/60" />
            : <Circle className="w-4 h-4 text-border" />}

          {editMode && isEditable && (
            <button
              onClick={() => onEditDay(day)}
              className="p-1 rounded hover:bg-primary/10 transition-colors"
              title="Edit this day"
            >
              <Pencil className="w-3 h-3 text-primary/60 hover:text-primary" />
            </button>
          )}

          {activities.length > 0 && (
            <button onClick={() => setExpanded(e => !e)} className="p-0.5">
              {expanded
                ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
            </button>
          )}
        </div>
      </div>

      {expanded && activities.length > 0 && (
        <div className="px-3 pb-3 pt-0 space-y-1.5 border-t border-border/40">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center justify-between text-[10px] font-mono">
              <span className={`px-1.5 py-0.5 rounded border ${SUBJECT_COLORS[a.subject] ?? "bg-muted/30 text-muted-foreground border-border"}`}>
                {a.revision ? `${a.subject} (${a.revision})` : a.subject}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{hoursLabel(a.hours)}</span>
                {a.drillSubject && (
                  <button
                    onClick={() => onDrill(a.drillSubject!)}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Zap className="w-2.5 h-2.5" /> Drill
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Core BTR Complement Box ──────────────────────────────────────────────────
// Shows the matching Core BTR subject for today so both schedules stay in sync.

const BTR_START_ISO = "2026-05-23"; // Core BTR Day 1

const BTR_SUBJECTS: string[] = [
  "Medicine","Medicine","Medicine","Medicine",
  "Surgery","Surgery",
  "Pathology","Pathology",
  "Pharmacology","Pharmacology",
  "OBG","OBG",
  "Paediatrics",
  "PSM","PSM",
  "Microbiology","Microbiology",
  "Forensic Medicine",
  "Revision","Revision","Revision","Revision","Revision","Revision",
  "Image Bank",
  "Full Mock","Full Mock","Full Mock",
  "Exam Eve",
];

const SUBJECT_FOCUS: Record<string, string[]> = {
  "Medicine":         ["Cardiology • Respiratory • Nephrology • Neuro • Endocrinology • GI • Haematology",
                       "Solve 30+ Medicine PYQs on today's topics", "Write 5 high-yield one-liners"],
  "Surgery":          ["GI Surgery • Hernias • Trauma • Oncosurgery • Vascular",
                       "Solve 30+ Surgery PYQs", "Revise surgical anatomy landmarks"],
  "Pathology":        ["General Path • Haematopathology • Systemic Pathology",
                       "Solve 30+ Pathology PYQs", "Revise tumour markers & autoantibody chart"],
  "Pharmacology":     ["ANS • CVS • CNS • Antimicrobials • Anticancer",
                       "Solve 30+ Pharmacology PYQs", "Revise drug of choice list"],
  "OBG":              ["Obstetrics: APH, PPH, pre-eclampsia • Gynaecology: cervical, ovarian, PCOS",
                       "Solve 30+ OBG PYQs", "Revise Bishop score & PPH 4Ts"],
  "Paediatrics":      ["Neonatology • Malnutrition • UIP 2024 • Paediatric infections",
                       "Solve 30+ Paediatrics PYQs", "Revise developmental milestones"],
  "PSM":              ["Epidemiology • Biostatistics • National Programmes • Vector-borne",
                       "Solve 30+ PSM PYQs", "Revise NFHS-5 key stats"],
  "Microbiology":     ["Bacteriology • Virology • Parasitology • Mycology",
                       "Solve 30+ Microbiology PYQs", "Revise staining techniques"],
  "Forensic Medicine":["Thanatology • Wounds • Toxicology • Sexual offences • Legal",
                       "Solve 30+ Forensic PYQs", "Revise NDPS & MHCA 2017 sections"],
  "Revision":         ["Re-attempt all incorrect MCQs", "80-Q timed subject mock",
                       "India-specific one-pager review"],
  "Image Bank":       ["50 histopathology images rapid ID", "30 radiology CXR/CT/X-ray",
                       "20 clinical photos & peripheral smears"],
  "Full Mock":        ["200-Q strict timed exam simulation", "Tag answers: SURE/UNSURE/GUESS",
                       "Post-mock: analyse weak areas immediately"],
  "Exam Eve":         ["Read cheat sheets only — max 2 hours", "Pack bag, valid ID, admit card",
                       "Sleep by 9:30 PM — you are ready"],
};

function getBTRSubjectForDate(isoDate: string): string | null {
  const start = new Date(BTR_START_ISO + "T00:00:00");
  const target = new Date(isoDate + "T00:00:00");
  const dayIdx = Math.round((target.getTime() - start.getTime()) / 86400000);
  if (dayIdx < 0 || dayIdx >= BTR_SUBJECTS.length) return null;
  return BTR_SUBJECTS[dayIdx];
}

function BTRComplementBox() {
  const today = getTodayMarrowDay();
  if (!today) return null;

  const btrSubject = getBTRSubjectForDate(today.iso);
  const marrowSubjects = [...new Set(today.activities.map(a => a.subject))];

  // Check alignment — same subjects on both schedules
  const isAligned = btrSubject && marrowSubjects.some(s =>
    s === btrSubject || (btrSubject === "PSM" && s === "Community Medicine")
  );

  const focusTips = btrSubject ? (SUBJECT_FOCUS[btrSubject] ?? []) : [];

  return (
    <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-violet-400" />
        <p className="text-xs font-mono font-bold text-violet-400">Core BTR · Today</p>
        <span className="text-[9px] font-mono text-violet-400/60 ml-auto border border-violet-500/30 px-1.5 py-0.5 rounded-full">
          🔒 Completely fixed plan
        </span>
      </div>

      {btrSubject && (
        <div className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-lg border ${
          isAligned
            ? "bg-emerald-500/10 border-emerald-500/30"
            : "bg-amber-500/10 border-amber-500/30"
        }`}>
          <span className="text-sm">{isAligned ? "✅" : "📌"}</span>
          <div className="min-w-0">
            <p className={`text-[10px] font-mono font-bold ${isAligned ? "text-emerald-400" : "text-amber-400"}`}>
              BTR today: <span className="font-normal">{btrSubject}</span>
              {isAligned && " · Aligned with Marrow ✓"}
            </p>
            {!isAligned && marrowSubjects.length > 0 && (
              <p className="text-[9px] font-mono text-muted-foreground">
                Marrow: {marrowSubjects.join(", ")} · You can customise Marrow to match BTR
              </p>
            )}
          </div>
        </div>
      )}

      {focusTips.length > 0 && (
        <ul className="space-y-1.5">
          {focusTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-1.5 text-[10px] font-mono text-foreground/80">
              <span className="text-violet-400 shrink-0">▸</span>{tip}
            </li>
          ))}
        </ul>
      )}

      {!btrSubject && (
        <p className="text-[10px] font-mono text-muted-foreground">Core BTR 28-day plan starts May 23, 2026.</p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  onNavigateToDrill?: (subject: string) => void;
}

export function MarrowSchedule({ onNavigateToDrill }: Props) {
  const [phaseFilter, setPhaseFilter]   = useState<MarrowPhase | "all">("all");
  const [editMode,    setEditMode]      = useState(false);
  const [editingDay,  setEditingDay]    = useState<MarrowDay | null>(null);
  const [custom,      setCustom]        = useState<CustomScheduleStore>(loadCustom);

  const today    = todayIso();
  const todayDay = useMemo(() => MARROW_SCHEDULE.find(d => d.iso === today) ?? null, [today]);

  const filtered = useMemo(() =>
    phaseFilter === "all" ? MARROW_SCHEDULE : MARROW_SCHEDULE.filter(d => d.phase === phaseFilter),
    [phaseFilter]
  );

  const passedDays = MARROW_SCHEDULE.filter(d => d.iso < today).length;
  const pct        = Math.round((passedDays / 100) * 100);
  const customCount = Object.keys(custom).length;

  const handleSave = useCallback((day: MarrowDay, activities: CustomDayActivities) => {
    const next = { ...custom, [day.day]: activities };
    setCustom(next);
    saveCustom(next);
  }, [custom]);

  const handleReset = useCallback((day: MarrowDay) => {
    const next = { ...custom };
    delete next[day.day];
    setCustom(next);
    saveCustom(next);
  }, [custom]);

  const handleResetAll = () => {
    setCustom({});
    saveCustom({});
  };

  const phases: (MarrowPhase | "all")[] = ["all", 1, 2, 3, 4, 5];
  const phaseLabels: Record<string, string> = {
    all: "All", 1: "P1", 2: "P2·R2", 3: "P3·R3", 4: "P4·R4", 5: "Final",
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-4 pb-20">

      {/* Header */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">Marrow NEET PG 2026</h2>
          </div>
          <div className="flex items-center gap-2">
            {editMode && customCount > 0 && (
              <button
                onClick={handleResetAll}
                className="text-[9px] font-mono px-2 py-1 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
              >
                <RotateCcw className="w-3 h-3 inline mr-1" />Reset all
              </button>
            )}
            <button
              onClick={() => setEditMode(e => !e)}
              className={`flex items-center gap-1.5 text-[10px] font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                editMode
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/20 text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {editMode ? <><X className="w-3 h-3" /> Done</> : <><Pencil className="w-3 h-3" /> Customise</>}
            </button>
          </div>
        </div>
        <p className="text-[11px] font-mono text-muted-foreground">
          100-day schedule · Revision days editable · Grand tests 🔒 fixed
          {customCount > 0 && ` · ${customCount} day${customCount > 1 ? "s" : ""} customised`}
        </p>
      </div>

      {/* Edit mode banner */}
      {editMode && (
        <div className="mx-4 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
          <p className="text-xs font-mono font-bold text-primary mb-1">✎ Customise Mode Active</p>
          <p className="text-[10px] font-mono text-muted-foreground">
            Tap the <Pencil className="w-3 h-3 inline" /> pencil on any revision day to edit subjects, hours, and revision cycle.
            Grand test days (<Lock className="w-3 h-3 inline text-amber-400" />) and Core BTR are fixed and cannot be changed.
          </p>
        </div>
      )}

      {/* Progress bar */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-muted-foreground">Journey progress</span>
          <span className="text-[10px] font-mono text-primary font-bold">{pct}% · Day {passedDays}/100</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Next test banner */}
      <div className="px-4"><NextTestBanner /></div>

      {/* Today card */}
      {todayDay && (
        <div className="px-4">
          <TodayCard
            day={todayDay}
            custom={custom}
            onDrill={s => onNavigateToDrill?.(s)}
            onEdit={() => setEditingDay(todayDay)}
            editMode={editMode}
          />
        </div>
      )}

      {/* BTR complement */}
      <div className="px-4"><BTRComplementBox /></div>

      {/* Quick stats */}
      <div className="px-4 grid grid-cols-3 gap-2">
        {[
          { label: "Grand Tests", value: "4", sub: "🔒 Fixed", color: "text-amber-400" },
          { label: "Custom days", value: String(customCount), sub: "editable", color: "text-primary" },
          { label: "Days left", value: String(Math.max(0, daysUntil("2026-08-30"))), sub: "to exam", color: "text-rose-400" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl px-3 py-2.5 text-center">
            <p className={`text-lg font-mono font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[9px] font-mono text-muted-foreground">{s.label}</p>
            <p className="text-[8px] font-mono text-muted-foreground/60">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Phase filter */}
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

      {/* Day list */}
      <div className="px-4 space-y-1.5">
        {filtered.map(day => (
          <DayRow
            key={day.day}
            day={day}
            isToday={day.iso === today}
            isPastDay={day.iso < today}
            editMode={editMode}
            custom={custom}
            onEditDay={setEditingDay}
            onDrill={s => onNavigateToDrill?.(s)}
          />
        ))}
      </div>

      {/* Day editor modal */}
      {editingDay && (
        <DayEditor
          day={editingDay}
          current={custom[editingDay.day] ?? []}
          onSave={rows => handleSave(editingDay, rows)}
          onReset={() => handleReset(editingDay)}
          onClose={() => setEditingDay(null)}
        />
      )}
    </div>
  );
}
