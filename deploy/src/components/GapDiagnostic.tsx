import { useMemo } from "react";
import { safeLoad } from "@/lib/storage";
import { QUESTIONS } from "@/data/questions";
import { SPECIFIC_PYQS } from "@/data/pyqSpecific";
import { Activity, AlertTriangle, TrendingUp, TrendingDown, Minus, CheckCircle, Zap, BookOpen, RotateCcw } from "lucide-react";

// ── Data types ─────────────────────────────────────────────────────────────────

interface PyqAttempt { selected: number; correct: boolean; }
interface PyqAttempts { [uid: string]: PyqAttempt; }

interface MistakeEntry {
  id: string; date: string; subject: string; topic: string;
  question: string; correctAnswer: string; myAnswer: string;
  whyWrong: string; reviewed: boolean; source?: string;
}

interface MockResult {
  date: string;
  subjectBreakdown: Record<string, { total: number; correct: number; wrong: number }>;
}

interface ScheduledTopic {
  id: string; subject: string; topicName: string; easeFactor: number; reviewCount: number; interval: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

// ── Gap scoring ────────────────────────────────────────────────────────────────

interface SubjectGap {
  subject: string;
  gapScore: number;       // 0–100, higher = bigger gap
  pyqAccuracy: number;    // 0–1
  pyqAttempted: number;
  mistakeCount: number;
  lowEFTopics: string[];  // topics from scheduler with EF < 2.0
  recentMistakes: number; // mistakes in last 14 days
  mockAccuracy: number | null;
  trend: "improving" | "declining" | "stable" | "insufficient";
  topMistakeTopics: string[];
  fixActions: string[];
}

function generateFix(s: SubjectGap): string[] {
  const actions: string[] = [];
  const pct = Math.round(s.pyqAccuracy * 100);

  if (s.pyqAttempted < 5) {
    actions.push("Start by attempting 20+ PYQs to get a baseline accuracy");
  } else if (s.pyqAccuracy < 0.5) {
    actions.push("Accuracy below 50% — do one full chapter revision before attempting more MCQs");
  } else if (s.pyqAccuracy < 0.7) {
    actions.push(`At ${pct}% — target 70%. Do 15 focused PYQs, review explanations for every wrong`);
  }

  if (s.lowEFTopics.length > 0) {
    actions.push(`Revision scheduler: "${s.lowEFTopics[0]}" has a low ease factor — rated Again/Hard repeatedly. Revisit from scratch.`);
  }

  if (s.topMistakeTopics.length > 0) {
    const t = s.topMistakeTopics.slice(0, 2).join(" and ");
    actions.push(`Mistake logbook clusters here: ${t}. Write a one-page summary of these concepts.`);
  }

  if (s.recentMistakes >= 4) {
    actions.push(`${s.recentMistakes} mistakes in the last 14 days — add this subject to today's revision block`);
  }

  if (actions.length === 0 && s.pyqAccuracy >= 0.7) {
    actions.push(`Good standing at ${pct}%. Maintain with weekly 10-Q drill to prevent decay.`);
  }

  return actions.slice(0, 3);
}

// ── Main component ─────────────────────────────────────────────────────────────

export function GapDiagnostic() {
  const pyqAttempts = useMemo(() => safeLoad<PyqAttempts>("neetpg_pyq_attempts", {}), []);
  const mistakes    = useMemo(() => safeLoad<MistakeEntry[]>("neetpg_mistake_logbook", []), []);
  const mockHistory = useMemo(() => safeLoad<MockResult[]>("neetpg_custom_mock_history", []), []);
  const scheduler   = useMemo(() => safeLoad<ScheduledTopic[]>("neetpg_revision_schedule", []), []);

  // ── Build subject data ──────────────────────────────────────────────────────

  const subjectGaps = useMemo<SubjectGap[]>(() => {
    // 1. PYQ accuracy per subject (base questions + specific PYQs)
    const pyq: Record<string, { total: number; correct: number }> = {};
    for (const q of QUESTIONS) {
      const a = pyqAttempts[String(q.id)];
      if (!a) continue;
      if (!pyq[q.subject]) pyq[q.subject] = { total: 0, correct: 0 };
      pyq[q.subject].total++;
      if (a.correct) pyq[q.subject].correct++;
    }
    for (const q of SPECIFIC_PYQS) {
      const a = pyqAttempts[q.id];
      if (!a) continue;
      if (!pyq[q.subject]) pyq[q.subject] = { total: 0, correct: 0 };
      pyq[q.subject].total++;
      if (a.correct) pyq[q.subject].correct++;
    }

    // 2. Mistake counts per subject + topic clusters
    const mistakeSubj: Record<string, { total: number; recent: number; topics: Record<string, number> }> = {};
    for (const m of mistakes) {
      if (!mistakeSubj[m.subject]) mistakeSubj[m.subject] = { total: 0, recent: 0, topics: {} };
      mistakeSubj[m.subject].total++;
      if (daysSince(m.date) <= 14) mistakeSubj[m.subject].recent++;
      const topicKey = m.topic && m.topic !== m.subject ? m.topic : m.question.slice(0, 40);
      mistakeSubj[m.subject].topics[topicKey] = (mistakeSubj[m.subject].topics[topicKey] ?? 0) + 1;
    }

    // 3. Mock accuracy per subject (average last 3 mocks)
    const mockAccMap: Record<string, number[]> = {};
    for (const mock of mockHistory.slice(0, 3)) {
      for (const [subj, v] of Object.entries(mock.subjectBreakdown ?? {})) {
        if (!mockAccMap[subj]) mockAccMap[subj] = [];
        if (v.total > 0) mockAccMap[subj].push(v.correct / v.total);
      }
    }

    // 4. Low ease-factor topics per subject from scheduler
    const lowEFBySubject: Record<string, string[]> = {};
    for (const t of scheduler) {
      if ((t.easeFactor ?? 2.5) < 2.0) {
        if (!lowEFBySubject[t.subject]) lowEFBySubject[t.subject] = [];
        lowEFBySubject[t.subject].push(t.topicName);
      }
    }

    // 5. Trend: compare last 7 days vs 7–14 days
    const trendMap: Record<string, { recent: number; older: number }> = {};
    for (const m of mistakes) {
      const age = daysSince(m.date);
      if (!trendMap[m.subject]) trendMap[m.subject] = { recent: 0, older: 0 };
      if (age <= 7) trendMap[m.subject].recent++;
      else if (age <= 14) trendMap[m.subject].older++;
    }

    // Collect all subjects from any data source
    const allSubjects = new Set<string>([
      ...Object.keys(pyq),
      ...Object.keys(mistakeSubj),
      ...Object.keys(lowEFBySubject),
    ]);

    const gaps: SubjectGap[] = [];
    for (const subject of allSubjects) {
      const p = pyq[subject];
      const pyqAcc = p && p.total > 0 ? p.correct / p.total : 0;
      const pyqAttempted = p?.total ?? 0;
      const mData = mistakeSubj[subject];
      const mistakeCount = mData?.total ?? 0;
      const recentMistakes = mData?.recent ?? 0;
      const mockAccs = mockAccMap[subject] ?? [];
      const mockAccuracy = mockAccs.length > 0 ? mockAccs.reduce((a, b) => a + b, 0) / mockAccs.length : null;
      const lowEFTopics = lowEFBySubject[subject] ?? [];

      // Top mistake topics (most frequent)
      const topicFreq = mData?.topics ?? {};
      const topMistakeTopics = Object.entries(topicFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([t]) => t);

      // Gap score formula (0–100)
      let gapScore = 0;
      if (pyqAttempted >= 3) {
        gapScore += (1 - pyqAcc) * 40;
      } else {
        gapScore += 20; // unknown = moderate gap
      }
      const maxMistakes = Math.max(...Object.values(mistakeSubj).map(v => v.total), 1);
      gapScore += clamp((mistakeCount / maxMistakes) * 30, 0, 30);
      gapScore += clamp(lowEFTopics.length * 5, 0, 20);
      if (mockAccuracy !== null) gapScore += (1 - mockAccuracy) * 10;
      gapScore = clamp(Math.round(gapScore), 0, 100);

      // Trend
      const tData = trendMap[subject];
      let trend: SubjectGap["trend"] = "insufficient";
      if (tData && (tData.recent + tData.older) >= 4) {
        if (tData.recent < tData.older * 0.7) trend = "improving";
        else if (tData.recent > tData.older * 1.3) trend = "declining";
        else trend = "stable";
      }

      const draft: SubjectGap = {
        subject, gapScore, pyqAccuracy: pyqAcc, pyqAttempted,
        mistakeCount, lowEFTopics, recentMistakes,
        mockAccuracy, trend, topMistakeTopics, fixActions: [],
      };
      draft.fixActions = generateFix(draft);
      gaps.push(draft);
    }

    return gaps.sort((a, b) => b.gapScore - a.gapScore);
  }, [pyqAttempts, mistakes, mockHistory, scheduler]);

  // ── Summary metrics ─────────────────────────────────────────────────────────

  const critical  = subjectGaps.filter(g => g.gapScore >= 60);
  const moderate  = subjectGaps.filter(g => g.gapScore >= 35 && g.gapScore < 60);
  const solid     = subjectGaps.filter(g => g.gapScore < 35);
  const totalMistakes = mistakes.length;
  const recentMistakes = mistakes.filter(m => daysSince(m.date) <= 7).length;
  const lastWeekMistakes = mistakes.filter(m => { const d = daysSince(m.date); return d > 7 && d <= 14; }).length;
  const overallTrend = recentMistakes < lastWeekMistakes * 0.8 ? "improving"
    : recentMistakes > lastWeekMistakes * 1.2 ? "declining" : "stable";

  // Top 3 most repeated mistake topics across all subjects
  const globalTopicFreq: Record<string, number> = {};
  for (const m of mistakes) {
    const key = m.topic && m.topic !== m.subject ? m.topic : null;
    if (key) globalTopicFreq[key] = (globalTopicFreq[key] ?? 0) + 1;
  }
  const topGlobalTopics = Object.entries(globalTopicFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const noData = subjectGaps.length === 0;

  if (noData) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <Activity className="w-12 h-12 text-muted-foreground" />
        <h2 className="text-lg font-bold text-foreground">No diagnostic data yet</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Attempt some PYQ questions, complete a quiz, or run a mock test.
          The diagnostic will synthesise your performance into a precision gap report.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Activity className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Knowledge Diagnostic</h2>
          <p className="text-sm text-muted-foreground font-mono">Cross-source gap analysis · {subjectGaps.length} subjects mapped</p>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold font-mono text-rose-400">{critical.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Critical gaps</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold font-mono text-amber-400">{moderate.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Needs work</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold font-mono text-green-400">{solid.length}</div>
          <div className="text-xs text-muted-foreground mt-1">Solid</div>
        </div>
        <div className={`rounded-xl p-3 text-center border ${
          overallTrend === "improving" ? "bg-green-500/10 border-green-500/30"
          : overallTrend === "declining" ? "bg-rose-500/10 border-rose-500/30"
          : "bg-card border-border"
        }`}>
          <div className={`text-2xl font-bold font-mono ${
            overallTrend === "improving" ? "text-green-400"
            : overallTrend === "declining" ? "text-rose-400"
            : "text-muted-foreground"
          }`}>
            {overallTrend === "improving" ? "↑" : overallTrend === "declining" ? "↓" : "→"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">This week</div>
        </div>
      </div>

      {/* Mistake trend note */}
      {totalMistakes > 0 && (
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border ${
          overallTrend === "improving"
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : overallTrend === "declining"
            ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
            : "bg-card border-border text-muted-foreground"
        }`}>
          {overallTrend === "improving" ? <TrendingDown className="w-4 h-4 shrink-0" /> : overallTrend === "declining" ? <TrendingUp className="w-4 h-4 shrink-0" /> : <Minus className="w-4 h-4 shrink-0" />}
          <span className="font-mono text-xs">
            {recentMistakes} mistakes this week vs {lastWeekMistakes} last week —&nbsp;
            {overallTrend === "improving" ? "error rate falling. Keep going."
              : overallTrend === "declining" ? "error rate rising. Review the fix protocol below."
              : "holding steady. Focus on the critical subjects."}
          </span>
        </div>
      )}

      {/* Recurring topic clusters */}
      {topGlobalTopics.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Recurring Mistake Clusters</div>
          <div className="flex flex-col gap-2">
            {topGlobalTopics.map(([topic, count]) => (
              <div key={topic} className="flex items-center gap-3">
                <div className="flex-1 text-sm text-foreground truncate">{topic}</div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="w-16 bg-background rounded-full h-1.5 overflow-hidden">
                    <div className="h-1.5 bg-rose-500 rounded-full" style={{ width: `${clamp(count / (topGlobalTopics[0][1] || 1) * 100, 10, 100)}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 w-12 text-right">{count}× wrong</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono text-muted-foreground mt-3">These concepts appear repeatedly in your mistake logbook. One focused revision session each would close them.</p>
        </div>
      )}

      {/* Critical gaps */}
      {critical.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-semibold text-rose-400">Critical Gaps — Act First</span>
          </div>
          {critical.slice(0, 5).map(g => <GapCard key={g.subject} gap={g} />)}
        </div>
      )}

      {/* Moderate gaps */}
      {moderate.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-amber-400">Needs Consolidation</div>
          {moderate.slice(0, 5).map(g => <GapCard key={g.subject} gap={g} />)}
        </div>
      )}

      {/* Solid subjects */}
      {solid.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">Well Consolidated</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {solid.map(g => (
              <div key={g.subject} className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-xs font-mono text-green-400">
                {g.subject} · {Math.round(g.pyqAccuracy * 100)}%
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's fix protocol */}
      {critical.slice(0, 3).some(g => g.fixActions.length > 0) && (
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Today's Fix Protocol</span>
          </div>
          <ol className="flex flex-col gap-3">
            {critical.slice(0, 3).flatMap(g =>
              g.fixActions.slice(0, 1).map((action, i) => (
                <li key={g.subject + i} className="flex gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {critical.slice(0, 3).indexOf(g) + 1}
                  </span>
                  <div>
                    <span className="font-medium text-foreground">{g.subject}: </span>
                    <span className="text-muted-foreground">{action}</span>
                  </div>
                </li>
              ))
            )}
          </ol>
        </div>
      )}

      {/* Methodology note */}
      <div className="text-[10px] font-mono text-muted-foreground border-t border-border pt-3">
        Gap score = weighted composite of PYQ accuracy (40%), mistake frequency (30%), SM-2 ease factor (20%), mock performance (10%).
        Updates automatically as you practice.
      </div>
    </div>
  );
}

// ── Gap Card ───────────────────────────────────────────────────────────────────

function GapCard({ gap }: { gap: SubjectGap }) {
  const pct = Math.round(gap.pyqAccuracy * 100);
  const severity = gap.gapScore >= 60 ? "rose" : "amber";

  const TrendIcon = gap.trend === "improving" ? TrendingDown
    : gap.trend === "declining" ? TrendingUp : Minus;
  const trendColor = gap.trend === "improving" ? "text-green-400"
    : gap.trend === "declining" ? "text-rose-400" : "text-muted-foreground";

  return (
    <div className={`bg-card border rounded-xl p-4 flex flex-col gap-3 border-${severity}-500/30`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{gap.subject}</span>
            {gap.trend !== "insufficient" && (
              <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} />
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-muted-foreground">
            {gap.pyqAttempted > 0 && <span>PYQ: {pct}% ({gap.pyqAttempted} Qs)</span>}
            {gap.mistakeCount > 0 && <span>{gap.mistakeCount} mistakes logged</span>}
            {gap.mockAccuracy !== null && <span>Mock: {Math.round(gap.mockAccuracy * 100)}%</span>}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className={`text-lg font-bold font-mono ${severity === "rose" ? "text-rose-400" : "text-amber-400"}`}>
            {gap.gapScore}
          </div>
          <div className="text-[9px] font-mono text-muted-foreground">gap score</div>
        </div>
      </div>

      {/* Gap bar */}
      <div className="w-full bg-background rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${severity === "rose" ? "bg-rose-500" : "bg-amber-500"}`}
          style={{ width: `${gap.gapScore}%` }}
        />
      </div>

      {/* Low EF topics from scheduler */}
      {gap.lowEFTopics.length > 0 && (
        <div className="flex items-start gap-2 text-xs text-amber-400">
          <RotateCcw className="w-3 h-3 mt-0.5 shrink-0" />
          <span>Struggling in scheduler: {gap.lowEFTopics.slice(0, 2).join(", ")}</span>
        </div>
      )}

      {/* Fix actions */}
      {gap.fixActions.length > 0 && (
        <div className="flex flex-col gap-1.5 border-t border-border pt-3">
          {gap.fixActions.map((action, i) => (
            <div key={i} className="flex gap-2 text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3 mt-0.5 shrink-0 text-primary" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
