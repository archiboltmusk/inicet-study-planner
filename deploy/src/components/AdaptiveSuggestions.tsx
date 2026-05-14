import { useMemo } from "react";
import { Lightbulb, AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";
import { QUESTIONS } from "@/data/questions";

interface AttemptRecord { selected: number; correct: boolean; }
interface McqScore { attempted: number; correct: number; }

interface Props {
  pyqAttempts: Record<number, AttemptRecord>;
  mcqScores: Record<number, McqScore>;
  completedDays: number[];
  onGoToTab: (tab: string) => void;
}

interface SubjectAnalysis {
  subject: string;
  total: number;
  attempted: number;
  correct: number;
  accuracy: number | null;
  status: "critical" | "weak" | "good" | "strong" | "untouched";
}

const STATUS_CONFIG = {
  critical: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", icon: AlertTriangle, label: "Critical" },
  weak:     { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", icon: TrendingUp, label: "Needs Work" },
  good:     { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: TrendingUp, label: "Good" },
  strong:   { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: CheckCircle, label: "Strong" },
  untouched:{ color: "text-muted-foreground", bg: "bg-muted/30", border: "border-border", icon: Lightbulb, label: "Not Started" },
};

const SUBJECT_DAY_MAP: Record<string, number[]> = {
  "Medicine": [1, 2, 3, 4],
  "Surgery": [5, 6],
  "Pathology": [7, 8],
  "Pharmacology": [9, 10],
  "OBG": [11, 12],
  "Paediatrics": [13],
  "PSM/Community Medicine": [14, 15],
  "Microbiology": [16, 17],
  "Forensic Medicine": [18],
};

export function AdaptiveSuggestions({ pyqAttempts, mcqScores, completedDays, onGoToTab }: Props) {
  const analysis = useMemo<SubjectAnalysis[]>(() => {
    const subjectGroups: Record<string, { total: number; attempted: number; correct: number }> = {};
    QUESTIONS.forEach(q => {
      if (!subjectGroups[q.subject]) subjectGroups[q.subject] = { total: 0, attempted: 0, correct: 0 };
      subjectGroups[q.subject].total++;
      const attempt = pyqAttempts[q.id];
      if (attempt) {
        subjectGroups[q.subject].attempted++;
        if (attempt.correct) subjectGroups[q.subject].correct++;
      }
    });

    return Object.entries(subjectGroups).map(([subject, data]) => {
      const accuracy = data.attempted > 0 ? (data.correct / data.attempted) * 100 : null;
      let status: SubjectAnalysis["status"] = "untouched";
      if (accuracy !== null) {
        if (accuracy < 50) status = "critical";
        else if (accuracy < 65) status = "weak";
        else if (accuracy < 80) status = "good";
        else status = "strong";
      }
      return { subject, ...data, accuracy, status };
    }).sort((a, b) => {
      const order = { critical: 0, weak: 1, untouched: 2, good: 3, strong: 4 };
      return order[a.status] - order[b.status];
    });
  }, [pyqAttempts]);

  const criticalSubjects = analysis.filter(a => a.status === "critical" || a.status === "weak");
  const strongSubjects = analysis.filter(a => a.status === "strong");
  const totalAttempted = Object.keys(pyqAttempts).length;
  const totalCorrect = Object.values(pyqAttempts).filter(a => a.correct).length;
  const overallAccuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : null;

  const suggestions = useMemo(() => {
    const tips: { priority: "high" | "medium" | "low"; text: string; action?: string; tab?: string }[] = [];

    if (criticalSubjects.length > 0) {
      tips.push({
        priority: "high",
        text: `${criticalSubjects[0].subject} accuracy is ${criticalSubjects[0].accuracy?.toFixed(0) ?? "unknown"}% — below safe threshold. Focus 2 hours today on ${criticalSubjects[0].subject} weak areas.`,
        action: `Practice ${criticalSubjects[0].subject} Questions`,
        tab: "pyq",
      });
    }

    if (totalAttempted < 50) {
      tips.push({
        priority: "high",
        text: `Only ${totalAttempted} questions attempted. You need at least 100 attempted to get meaningful accuracy data. Aim for 20 PYQs per day minimum.`,
        action: "Go to PYQ Bank",
        tab: "pyq",
      });
    }

    if (completedDays.length < 10 && new Date() > new Date("2026-04-15")) {
      tips.push({
        priority: "high",
        text: `Only ${completedDays.length}/28 days completed. Exam is close — you need to accelerate. Consider combining 2 subjects per day in revision phase.`,
        action: "Open Planner",
        tab: "planner",
      });
    }

    if (overallAccuracy !== null && overallAccuracy < 65) {
      tips.push({
        priority: "medium",
        text: `Overall accuracy ${overallAccuracy.toFixed(1)}% — below competitive threshold (target 75%+). Prioritise understanding over completion speed.`,
      });
    }

    if (strongSubjects.length > 0 && criticalSubjects.length > 2) {
      tips.push({
        priority: "medium",
        text: `You're strong in ${strongSubjects.slice(0, 2).map(s => s.subject).join(" and ")}. Don't re-study these — spend that time on your weak subjects instead.`,
      });
    }

    if (totalAttempted > 100 && overallAccuracy !== null && overallAccuracy >= 75) {
      tips.push({
        priority: "low",
        text: `Great accuracy (${overallAccuracy.toFixed(1)}%)! Now focus on timing — practice under exam conditions (54 seconds/question). Use the Schedule tab's mock tracker.`,
        action: "Open Schedule",
        tab: "schedule",
      });
    }

    if (tips.length === 0) {
      tips.push({
        priority: "low",
        text: "Start attempting PYQ questions to get personalised subject-wise suggestions and identify your weak areas.",
        action: "Start PYQ Practice",
        tab: "pyq",
      });
    }

    return tips;
  }, [criticalSubjects, totalAttempted, completedDays, overallAccuracy, strongSubjects]);

  const priorityColors = {
    high: "border-red-500/30 bg-red-500/5 text-red-400",
    medium: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
    low: "border-blue-500/30 bg-blue-500/5 text-blue-400",
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
        <div className="bg-violet-500/20 p-1.5 rounded-lg">
          <Lightbulb className="w-4 h-4 text-violet-400" />
        </div>
        <div>
          <p className="text-sm font-mono font-bold text-foreground">Adaptive Study Plan</p>
          <p className="text-[10px] font-mono text-muted-foreground">Personalised suggestions based on your PYQ performance</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase text-muted-foreground">Priority Actions</p>
            {suggestions.map((s, i) => (
              <div key={i} className={`rounded-lg border px-3 py-3 space-y-2 ${priorityColors[s.priority].split(" ").slice(0, 2).join(" ")} border-opacity-50`}
                style={{borderColor: s.priority === "high" ? "rgba(239,68,68,0.3)" : s.priority === "medium" ? "rgba(234,179,8,0.3)" : "rgba(59,130,246,0.3)"}}>
                <div className="flex items-start gap-2">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                    s.priority === "high" ? "bg-red-500/20 text-red-400" : s.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-500/20 text-blue-400"
                  }`}>{s.priority}</span>
                  <p className="text-[11px] font-mono text-foreground/80 leading-relaxed flex-1">{s.text}</p>
                </div>
                {s.action && s.tab && (
                  <button
                    onClick={() => onGoToTab(s.tab!)}
                    className="text-[10px] font-mono text-primary hover:text-primary/80 transition-colors underline underline-offset-2 ml-7"
                  >
                    {s.action} →
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Subject accuracy breakdown */}
        <div>
          <p className="text-[10px] font-mono uppercase text-muted-foreground mb-3">Subject Accuracy</p>
          <div className="space-y-2">
            {analysis.map(({ subject, total, attempted, accuracy, status }) => {
              const cfg = STATUS_CONFIG[status];
              const Icon = cfg.icon;
              return (
                <div key={subject} className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${cfg.bg} ${cfg.border}`}>
                  <Icon className={`w-3 h-3 ${cfg.color} shrink-0`} />
                  <span className="text-[11px] font-mono text-foreground/80 w-40 truncate flex-shrink-0">{subject}</span>
                  <div className="flex-1 h-1 bg-background/60 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${attempted > 0 ? (accuracy ?? 0) : 0}%`,
                        backgroundColor: status === "strong" ? "#22c55e" : status === "good" ? "#eab308" : status === "critical" ? "#ef4444" : status === "weak" ? "#f97316" : "#6b7280",
                      }}
                    />
                  </div>
                  <span className={`text-[11px] font-mono font-bold w-20 text-right shrink-0 ${cfg.color}`}>
                    {accuracy !== null ? `${accuracy.toFixed(0)}%` : `0/${total}`}
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${cfg.bg} ${cfg.color} ${cfg.border} shrink-0`}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day completion per subject */}
        {Object.keys(SUBJECT_DAY_MAP).length > 0 && (
          <div>
            <p className="text-[10px] font-mono uppercase text-muted-foreground mb-3">Study Plan Completion</p>
            <div className="space-y-1.5">
              {Object.entries(SUBJECT_DAY_MAP).map(([subject, days]) => {
                const done = days.filter(d => completedDays.includes(d)).length;
                const pct = (done / days.length) * 100;
                return (
                  <div key={subject} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground w-36 truncate shrink-0">{subject}</span>
                    <div className="flex-1 h-1 bg-background rounded-full overflow-hidden border border-border">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground w-10 text-right shrink-0">{done}/{days.length}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
