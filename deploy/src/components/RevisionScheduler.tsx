import { useState, useMemo, useEffect } from "react";
import { CLOUD_SYNC_EVENT } from "@/lib/cloud";
import { safeLoad, safeSave } from "@/lib/storage";
import { CalendarCheck, Plus, Trash2, Edit2, Check, X, Brain } from "lucide-react";

export interface ScheduledTopic {
  id: string;
  subject: string;
  topicName: string;
  studiedDate: string;
  nextReviewDate: string;
  reviewCount: number;
  easeFactor: number;   // SM-2 ease factor, starts at 2.5
  interval: number;     // current interval in days
  notes?: string;
}

export const REVISION_SCHEDULER_KEY = "neetpg_revision_schedule";

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// SM-2 algorithm: quality 0=Again, 1=Hard, 2=Good, 3=Easy
// Maps to SM-2 q: 0→1, 1→2, 2→4, 3→5
export function sm2Update(topic: ScheduledTopic, quality: 0 | 1 | 2 | 3): ScheduledTopic {
  const q = ([1, 2, 4, 5] as const)[quality];
  const today = new Date().toISOString().slice(0, 10);
  let { easeFactor, interval, reviewCount } = topic;

  // Update ease factor (SM-2 formula)
  easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

  if (q < 3) {
    // Failed — reset interval, don't advance reviewCount
    interval = 1;
    reviewCount = 0;
  } else {
    if (reviewCount === 0) interval = 1;
    else if (reviewCount === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    reviewCount += 1;
  }

  return {
    ...topic,
    reviewCount,
    easeFactor,
    interval,
    studiedDate: today,
    nextReviewDate: addDays(today, interval),
  };
}

const TODAY = new Date().toISOString().slice(0, 10);
const IN7   = addDays(TODAY, 7);

const SUBJECTS = [
  "Medicine","Surgery","Pharmacology","Physiology","Biochemistry","Pathology",
  "Anatomy","Microbiology","OBG","Paediatrics","PSM","Forensic","ENT/Ophth/Derm",
  "Revision","Full Mock",
];

const SUBJECT_COLORS: Record<string, string> = {
  Medicine:"text-blue-400",Pharmacology:"text-violet-400",Microbiology:"text-green-400",
  OBG:"text-pink-400",Paediatrics:"text-cyan-400",PSM:"text-amber-400",
  Surgery:"text-orange-400",Pathology:"text-rose-400",Forensic:"text-gray-400",
  Anatomy:"text-yellow-400",Physiology:"text-teal-400",Biochemistry:"text-indigo-400",
  "ENT/Ophth/Derm":"text-lime-400",Revision:"text-amber-400","Full Mock":"text-cyan-400",
};

const QUALITY_BUTTONS = [
  { label: "Again",  q: 0 as const, cls: "bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30",   hint: "Forgot" },
  { label: "Hard",   q: 1 as const, cls: "bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-amber-500/30", hint: "Struggled" },
  { label: "Good",   q: 2 as const, cls: "bg-green-500/20 border-green-500/40 text-green-400 hover:bg-green-500/30", hint: "Recalled" },
  { label: "Easy",   q: 3 as const, cls: "bg-blue-500/20 border-blue-500/40 text-blue-400 hover:bg-blue-500/30",     hint: "Perfect" },
] as const;

type ViewMode = "due" | "upcoming" | "all" | "calendar";

function migrateEntry(raw: Partial<ScheduledTopic>): ScheduledTopic {
  return {
    id: raw.id ?? Date.now().toString(),
    subject: raw.subject ?? "Revision",
    topicName: raw.topicName ?? "",
    studiedDate: raw.studiedDate ?? TODAY,
    nextReviewDate: raw.nextReviewDate ?? TODAY,
    reviewCount: raw.reviewCount ?? 0,
    easeFactor: raw.easeFactor ?? 2.5,
    interval: raw.interval ?? 1,
    notes: raw.notes,
  };
}

export function RevisionScheduler() {
  const [topics, setTopics] = useState<ScheduledTopic[]>(() => {
    const saved = safeLoad<Partial<ScheduledTopic>[]>(REVISION_SCHEDULER_KEY, []);
    return saved.map(migrateEntry);
  });

  const [viewMode, setViewMode]       = useState<ViewMode>("due");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [showForm, setShowForm]       = useState(false);
  const [deleteId, setDeleteId]       = useState<string | null>(null);
  const [editId, setEditId]           = useState<string | null>(null);
  const [editForm, setEditForm]       = useState({ subject: SUBJECTS[0], topicName: "", notes: "" });
  const [form, setForm]               = useState({ subject: SUBJECTS[0], topicName: "", studiedDate: TODAY, notes: "" });

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ columns: string[] }>;
      if (ev.detail.columns.includes("revision_schedule")) {
        setTopics(safeLoad<Partial<ScheduledTopic>[]>(REVISION_SCHEDULER_KEY, []).map(migrateEntry));
      }
    };
    window.addEventListener(CLOUD_SYNC_EVENT, handler);
    return () => window.removeEventListener(CLOUD_SYNC_EVENT, handler);
  }, []);

  const save = (updated: ScheduledTopic[]) => {
    setTopics(updated);
    safeSave(REVISION_SCHEDULER_KEY, updated);
  };

  const markWithQuality = (id: string, q: 0 | 1 | 2 | 3) => {
    save(topics.map(t => t.id === id ? sm2Update(t, q) : t));
  };

  const deleteTopic = (id: string) => {
    save(topics.filter(t => t.id !== id));
    setDeleteId(null);
  };

  const startEdit = (t: ScheduledTopic) => {
    setEditId(t.id);
    setEditForm({ subject: t.subject, topicName: t.topicName, notes: t.notes ?? "" });
  };

  const saveEdit = (id: string) => {
    save(topics.map(t => t.id === id ? { ...t, subject: editForm.subject, topicName: editForm.topicName, notes: editForm.notes || undefined } : t));
    setEditId(null);
  };

  const addTopic = () => {
    if (!form.topicName) return;
    const topic: ScheduledTopic = {
      id: Date.now().toString(),
      subject: form.subject,
      topicName: form.topicName,
      studiedDate: form.studiedDate,
      nextReviewDate: addDays(form.studiedDate, 1),
      reviewCount: 0,
      easeFactor: 2.5,
      interval: 1,
      notes: form.notes || undefined,
    };
    save([topic, ...topics]);
    setForm({ subject: SUBJECTS[0], topicName: "", studiedDate: TODAY, notes: "" });
    setShowForm(false);
  };

  // Derived lists
  const due = useMemo(() =>
    topics.filter(t => t.nextReviewDate <= TODAY).sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate)),
    [topics]
  );
  const upcoming = useMemo(() =>
    topics.filter(t => t.nextReviewDate > TODAY && t.nextReviewDate <= IN7).sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate)),
    [topics]
  );
  const all = useMemo(() =>
    [...topics].sort((a, b) => a.nextReviewDate.localeCompare(b.nextReviewDate)),
    [topics]
  );

  // Subject filter applied to active view
  const applyFilter = (list: ScheduledTopic[]) =>
    subjectFilter === "All" ? list : list.filter(t => t.subject === subjectFilter);

  // Per-subject stats
  const subjectStats = useMemo(() => {
    const map: Record<string, { total: number; due: number }> = {};
    for (const t of topics) {
      if (!map[t.subject]) map[t.subject] = { total: 0, due: 0 };
      map[t.subject].total++;
      if (t.nextReviewDate <= TODAY) map[t.subject].due++;
    }
    return Object.entries(map).sort((a, b) => b[1].due - a[1].due);
  }, [topics]);

  // Calendar: next 7 days
  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i <= 6; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      days.push({
        key,
        label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }),
        items: topics.filter(t => t.nextReviewDate === key),
      });
    }
    return days;
  }, [topics]);

  // ── Topic card ──────────────────────────────────────────────────────────────
  const renderTopic = (t: ScheduledTopic) => {
    const isDue = t.nextReviewDate <= TODAY;
    const isEditing = editId === t.id;

    return (
      <div key={t.id} className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={editForm.subject}
                onChange={e => setEditForm(p => ({ ...p, subject: e.target.value }))}
                className="px-2 py-1.5 bg-background border border-border rounded text-xs text-foreground focus:outline-none"
              >
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
              <input
                value={editForm.topicName}
                onChange={e => setEditForm(p => ({ ...p, topicName: e.target.value }))}
                className="px-2 py-1.5 bg-background border border-border rounded text-xs text-foreground focus:outline-none"
                placeholder="Topic name"
              />
            </div>
            <input
              value={editForm.notes}
              onChange={e => setEditForm(p => ({ ...p, notes: e.target.value }))}
              className="px-2 py-1.5 bg-background border border-border rounded text-xs text-foreground focus:outline-none"
              placeholder="Notes (optional)"
            />
            <div className="flex gap-2">
              <button onClick={() => saveEdit(t.id)} className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground rounded text-xs">
                <Check className="w-3 h-3" /> Save
              </button>
              <button onClick={() => setEditId(null)} className="flex items-center gap-1 px-3 py-1 bg-card border border-border text-muted-foreground rounded text-xs hover:text-foreground">
                <X className="w-3 h-3" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-mono font-medium ${SUBJECT_COLORS[t.subject] ?? "text-muted-foreground"}`}>{t.subject}</span>
                  <span className="text-sm font-medium text-foreground">{t.topicName}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                  <span>Next: {t.nextReviewDate}</span>
                  <span>Rep {t.reviewCount}</span>
                  <span>EF {t.easeFactor.toFixed(2)}</span>
                  <span>+{t.interval}d</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => startEdit(t)} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                {deleteId === t.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => deleteTopic(t.id)} className="px-2 py-0.5 text-[10px] bg-rose-600 text-white rounded">Yes</button>
                    <button onClick={() => setDeleteId(null)} className="px-2 py-0.5 text-[10px] bg-card border border-border text-muted-foreground rounded">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteId(t.id)} className="p-1 text-muted-foreground hover:text-rose-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {t.notes && <div className="text-xs text-muted-foreground italic border-l-2 border-border pl-2">{t.notes}</div>}

            {isDue && (
              <div className="flex flex-col gap-1.5">
                <div className="text-[10px] font-mono text-muted-foreground">How well did you remember?</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {QUALITY_BUTTONS.map(({ label, q, cls, hint }) => (
                    <button
                      key={label}
                      onClick={() => markWithQuality(t.id, q)}
                      className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${cls}`}
                    >
                      {label}
                      <span className="text-[9px] font-normal opacity-70">{hint}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Revision Scheduler</h2>
          <p className="text-sm text-muted-foreground font-mono flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5" /> SM-2 spaced repetition
          </p>
        </div>
        <button onClick={() => setShowForm(s => !s)} className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
          <Plus className="w-4 h-4" /> Add Topic
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold font-mono text-rose-400">{due.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Due Now</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold font-mono text-amber-400">{upcoming.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Next 7 Days</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 text-center">
          <div className="text-2xl font-bold font-mono text-foreground">{topics.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Topics</div>
        </div>
      </div>

      {/* Per-subject stats */}
      {subjectStats.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-wider">By Subject</div>
          <div className="flex flex-col gap-2">
            {subjectStats.map(([subj, { total, due: dueCount }]) => (
              <div key={subj} className="flex items-center gap-3">
                <span className={`text-[11px] font-mono w-36 truncate shrink-0 ${SUBJECT_COLORS[subj] ?? "text-muted-foreground"}`}>{subj}</span>
                <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden border border-border">
                  <div
                    className={`h-full rounded-full ${dueCount > 0 ? "bg-rose-500" : "bg-green-500"}`}
                    style={{ width: total > 0 ? `${((total - dueCount) / total) * 100}%` : "100%" }}
                  />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground w-16 text-right shrink-0">
                  {dueCount > 0 ? <span className="text-rose-400">{dueCount} due</span> : <span className="text-green-400">up to date</span>} / {total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
          <h3 className="font-semibold text-foreground text-sm">Add Topic</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-muted-foreground block mb-1">Subject</label>
              <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-mono text-muted-foreground block mb-1">Date Studied</label>
              <input type="date" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none" value={form.studiedDate} onChange={e => setForm(p => ({ ...p, studiedDate: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground block mb-1">Topic Name</label>
            <input className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none" placeholder="e.g. Anti-arrhythmics — Vaughan-Williams classification" value={form.topicName} onChange={e => setForm(p => ({ ...p, topicName: e.target.value }))} />
          </div>
          <div>
            <label className="text-xs font-mono text-muted-foreground block mb-1">Notes (optional)</label>
            <input className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none" placeholder="Key point to remember" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <button onClick={addTopic} disabled={!form.topicName} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm disabled:opacity-50">Add</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-card border border-border text-muted-foreground rounded-lg text-sm hover:text-foreground">Cancel</button>
          </div>
        </div>
      )}

      {/* View mode tabs */}
      <div className="flex gap-1 bg-card border border-border rounded-lg p-1 overflow-x-auto">
        {([
          ["due",      `Due (${due.length})`],
          ["upcoming", `Upcoming (${upcoming.length})`],
          ["all",      `All (${all.length})`],
          ["calendar", "Calendar"],
        ] as [ViewMode, string][]).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setViewMode(v)}
            className={`flex-shrink-0 px-3 py-1.5 rounded text-xs font-mono transition-colors ${viewMode === v ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Subject filter pills (for due/upcoming/all) */}
      {viewMode !== "calendar" && (
        <div className="flex gap-1.5 flex-wrap">
          {["All", ...SUBJECTS.filter(s => topics.some(t => t.subject === s))].map(s => (
            <button
              key={s}
              onClick={() => setSubjectFilter(s)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono border transition-colors ${subjectFilter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {viewMode === "due" && (
        <div className="flex flex-col gap-3">
          {applyFilter(due).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              {due.length === 0 ? "No topics due — you're up to date!" : "No due topics match the filter."}
            </div>
          ) : (
            <>
              <div className="text-xs font-mono text-rose-400 bg-rose-500/10 px-3 py-2 rounded-lg">
                {applyFilter(due).length} topic(s) due — rate each to update its interval
              </div>
              {applyFilter(due).map(renderTopic)}
            </>
          )}
        </div>
      )}

      {viewMode === "upcoming" && (
        <div className="flex flex-col gap-3">
          {applyFilter(upcoming).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">No upcoming reviews in the next 7 days.</div>
          ) : applyFilter(upcoming).map(renderTopic)}
        </div>
      )}

      {viewMode === "all" && (
        <div className="flex flex-col gap-3">
          {applyFilter(all).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">No topics added yet. Complete a day in the study plan or add manually.</div>
          ) : applyFilter(all).map(renderTopic)}
        </div>
      )}

      {viewMode === "calendar" && (
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-foreground">Next 7 Days</div>
          {calendarDays.map(day => (
            <div key={day.key} className={`bg-card border rounded-xl p-3 ${day.key === TODAY ? "border-primary/50" : "border-border"}`}>
              <div className="flex items-center gap-2 mb-2">
                <CalendarCheck className="w-3.5 h-3.5 text-muted-foreground" />
                <span className={`text-xs font-mono font-semibold ${day.key === TODAY ? "text-primary" : "text-muted-foreground"}`}>
                  {day.label}{day.key === TODAY ? " (Today)" : ""}
                </span>
                <span className="ml-auto text-[10px] font-mono text-muted-foreground">{day.items.length} topic(s)</span>
              </div>
              {day.items.length === 0 ? (
                <div className="text-[10px] text-muted-foreground italic">No reviews scheduled</div>
              ) : (
                <div className="flex flex-col gap-1">
                  {day.items.map(t => (
                    <div key={t.id} className="flex items-center gap-2 text-xs">
                      <span className={`text-[10px] font-mono ${SUBJECT_COLORS[t.subject] ?? "text-muted-foreground"}`}>{t.subject}</span>
                      <span className="text-muted-foreground">{t.topicName}</span>
                      <span className="ml-auto text-[10px] font-mono text-muted-foreground">Rep {t.reviewCount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
