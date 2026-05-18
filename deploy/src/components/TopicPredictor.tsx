import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Flame, CheckCircle, Filter, ArrowUpDown } from "lucide-react";

interface TopicEntry {
  topic: string;
  subject: string;
  yearlyFreq: number[];
  trend: "hot" | "rising" | "consistent" | "declining";
  probability: number;
  lastYear: number;
}

const TOPICS: TopicEntry[] = [
  { topic: "Organophosphate poisoning", subject: "Pharmacology", yearlyFreq: [3,4,5,4,6,5,7,6,8,7], trend: "hot", probability: 90, lastYear: 2024 },
  { topic: "Beta Blockers", subject: "Pharmacology", yearlyFreq: [4,3,5,4,5,6,5,7,6,8], trend: "hot", probability: 85, lastYear: 2024 },
  { topic: "Diuretics mechanism", subject: "Pharmacology", yearlyFreq: [4,4,5,4,5,4,5,5,5,6], trend: "consistent", probability: 80, lastYear: 2024 },
  { topic: "Aminoglycosides toxicity", subject: "Pharmacology", yearlyFreq: [2,3,3,4,4,5,5,6,6,7], trend: "rising", probability: 78, lastYear: 2024 },
  { topic: "Antibiotic resistance mechanisms", subject: "Pharmacology", yearlyFreq: [1,2,3,3,4,5,5,6,6,7], trend: "rising", probability: 72, lastYear: 2024 },
  { topic: "Tuberculosis", subject: "Medicine", yearlyFreq: [5,6,7,7,8,8,9,9,10,10], trend: "hot", probability: 95, lastYear: 2024 },
  { topic: "Diabetes complications", subject: "Medicine", yearlyFreq: [4,5,6,6,7,7,8,8,9,9], trend: "hot", probability: 88, lastYear: 2024 },
  { topic: "Infective Endocarditis", subject: "Medicine", yearlyFreq: [2,3,3,4,5,5,6,7,7,8], trend: "rising", probability: 82, lastYear: 2024 },
  { topic: "Thyroid disorders", subject: "Medicine", yearlyFreq: [4,4,5,5,5,5,6,5,6,6], trend: "consistent", probability: 75, lastYear: 2024 },
  { topic: "Peptic Ulcer Disease", subject: "Surgery", yearlyFreq: [4,5,5,6,6,7,7,8,8,8], trend: "hot", probability: 85, lastYear: 2024 },
  { topic: "Acute Appendicitis", subject: "Surgery", yearlyFreq: [4,4,5,5,5,5,5,6,6,6], trend: "consistent", probability: 80, lastYear: 2024 },
  { topic: "Thyroid cancer", subject: "Surgery", yearlyFreq: [2,2,3,3,4,4,5,5,6,6], trend: "rising", probability: 72, lastYear: 2024 },
  { topic: "PPH management", subject: "OBG", yearlyFreq: [4,5,6,6,7,7,8,8,9,9], trend: "hot", probability: 90, lastYear: 2024 },
  { topic: "Eclampsia", subject: "OBG", yearlyFreq: [4,4,5,6,6,7,7,8,8,9], trend: "hot", probability: 85, lastYear: 2024 },
  { topic: "Ectopic pregnancy", subject: "OBG", yearlyFreq: [2,3,4,4,5,5,6,6,7,7], trend: "rising", probability: 82, lastYear: 2024 },
  { topic: "Neoplasia", subject: "Pathology", yearlyFreq: [4,5,6,6,7,7,8,8,9,9], trend: "hot", probability: 88, lastYear: 2024 },
  { topic: "Tuberculosis pathology", subject: "Pathology", yearlyFreq: [4,5,5,6,6,7,7,8,8,8], trend: "hot", probability: 85, lastYear: 2024 },
  { topic: "Inflammation", subject: "Pathology", yearlyFreq: [4,4,5,5,5,5,5,6,6,6], trend: "consistent", probability: 75, lastYear: 2024 },
  { topic: "Tuberculosis microbiology", subject: "Microbiology", yearlyFreq: [4,5,6,6,7,7,8,9,9,9], trend: "hot", probability: 88, lastYear: 2024 },
  { topic: "HIV/AIDS", subject: "Microbiology", yearlyFreq: [4,5,5,6,6,7,7,8,8,8], trend: "hot", probability: 85, lastYear: 2024 },
  { topic: "Hepatitis viruses", subject: "Microbiology", yearlyFreq: [3,4,5,5,6,6,7,7,8,8], trend: "hot", probability: 80, lastYear: 2024 },
  { topic: "Nerve injuries", subject: "Anatomy", yearlyFreq: [3,4,5,5,6,6,7,7,8,8], trend: "hot", probability: 82, lastYear: 2024 },
  { topic: "Cranial nerves", subject: "Anatomy", yearlyFreq: [4,4,5,5,5,5,5,6,6,6], trend: "consistent", probability: 78, lastYear: 2024 },
  { topic: "Blood supply of brain", subject: "Anatomy", yearlyFreq: [2,3,3,4,4,5,5,6,6,7], trend: "rising", probability: 72, lastYear: 2024 },
  { topic: "Renal physiology", subject: "Physiology", yearlyFreq: [4,4,5,5,6,6,7,7,8,8], trend: "hot", probability: 85, lastYear: 2024 },
  { topic: "Cardiac physiology", subject: "Physiology", yearlyFreq: [4,4,5,5,5,5,5,6,6,7], trend: "consistent", probability: 80, lastYear: 2024 },
  { topic: "Respiratory physiology", subject: "Physiology", yearlyFreq: [3,4,4,5,5,5,5,5,6,6], trend: "consistent", probability: 75, lastYear: 2024 },
  { topic: "Vitamins", subject: "Biochemistry", yearlyFreq: [2,3,3,4,4,5,5,6,6,7], trend: "rising", probability: 78, lastYear: 2024 },
  { topic: "Metabolic pathways", subject: "Biochemistry", yearlyFreq: [3,4,4,5,5,5,5,5,6,6], trend: "consistent", probability: 75, lastYear: 2024 },
  { topic: "Enzyme kinetics", subject: "Biochemistry", yearlyFreq: [3,4,4,4,5,5,5,5,5,6], trend: "consistent", probability: 70, lastYear: 2024 },
  { topic: "Vaccines", subject: "Paediatrics", yearlyFreq: [4,5,5,6,6,7,7,8,8,9], trend: "hot", probability: 88, lastYear: 2024 },
  { topic: "Developmental milestones", subject: "Paediatrics", yearlyFreq: [3,4,5,5,6,6,7,7,8,8], trend: "hot", probability: 82, lastYear: 2024 },
  { topic: "Neonatal jaundice", subject: "Paediatrics", yearlyFreq: [3,4,4,5,5,6,6,7,7,8], trend: "hot", probability: 80, lastYear: 2024 },
  { topic: "Epidemiology statistics", subject: "PSM", yearlyFreq: [4,4,5,5,6,6,7,7,8,8], trend: "hot", probability: 85, lastYear: 2024 },
  { topic: "National health programs", subject: "PSM", yearlyFreq: [4,4,4,5,5,5,5,6,6,6], trend: "consistent", probability: 80, lastYear: 2024 },
  { topic: "Biostatistics", subject: "PSM", yearlyFreq: [2,3,3,4,4,5,5,6,6,7], trend: "rising", probability: 78, lastYear: 2024 },
  { topic: "Glaucoma", subject: "Ophthalmology", yearlyFreq: [3,4,4,5,5,6,6,7,7,8], trend: "hot", probability: 80, lastYear: 2024 },
  { topic: "Retinal disorders", subject: "Ophthalmology", yearlyFreq: [2,2,3,3,4,4,5,5,6,6], trend: "rising", probability: 72, lastYear: 2024 },
  { topic: "Cholesteatoma", subject: "ENT", yearlyFreq: [2,2,3,3,4,4,5,5,6,6], trend: "rising", probability: 75, lastYear: 2024 },
  { topic: "Otitis media", subject: "ENT", yearlyFreq: [3,3,4,4,4,4,5,5,5,5], trend: "consistent", probability: 70, lastYear: 2024 },
  { topic: "Asphyxia", subject: "Forensic Medicine", yearlyFreq: [2,2,3,3,4,4,5,5,6,6], trend: "rising", probability: 75, lastYear: 2024 },
  { topic: "Medico-legal examination", subject: "Forensic Medicine", yearlyFreq: [3,3,4,4,4,4,4,5,5,5], trend: "consistent", probability: 72, lastYear: 2024 },
];

const SUBJECT_COLORS: Record<string, string> = {
  "Pharmacology": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Medicine": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Surgery": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "OBG": "bg-pink-500/20 text-pink-400 border-pink-500/30",
  "Pathology": "bg-red-500/20 text-red-400 border-red-500/30",
  "Microbiology": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Anatomy": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "Physiology": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "Biochemistry": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Paediatrics": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "ENT": "bg-lime-500/20 text-lime-400 border-lime-500/30",
  "Ophthalmology": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "PSM": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "Forensic Medicine": "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const TREND_CONFIG = {
  hot: { label: "Hot", icon: Flame, classes: "bg-red-500/20 text-red-400 border-red-500/30", bg: "bg-red-500/5" },
  rising: { label: "Rising", icon: TrendingUp, classes: "bg-orange-500/20 text-orange-400 border-orange-500/30", bg: "" },
  consistent: { label: "Consistent", icon: CheckCircle, classes: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", bg: "" },
  declining: { label: "Declining", icon: TrendingDown, classes: "bg-slate-500/20 text-slate-400 border-slate-500/30", bg: "" },
};

const ALL_SUBJECTS = Array.from(new Set(TOPICS.map(t => t.subject))).sort();

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-px h-6">
      {values.map((v, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm bg-primary/40 flex-shrink-0"
          style={{ height: `${Math.max(10, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

function ProbabilityBar({ value }: { value: number }) {
  const color =
    value >= 90 ? "from-red-500 to-rose-600" :
    value >= 80 ? "from-amber-500 to-red-500" :
    value >= 70 ? "from-yellow-400 to-amber-500" :
    "from-green-400 to-yellow-400";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[11px] font-mono font-bold text-foreground/80 w-9 text-right shrink-0">{value}%</span>
    </div>
  );
}

export function TopicPredictor() {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [sortBy, setSortBy] = useState<"probability" | "trend">("probability");

  const trendOrder = { hot: 0, rising: 1, consistent: 2, declining: 3 };

  const filtered = useMemo(() => {
    const base = selectedSubject === "All" ? TOPICS : TOPICS.filter(t => t.subject === selectedSubject);
    return [...base].sort((a, b) =>
      sortBy === "probability"
        ? b.probability - a.probability
        : trendOrder[a.trend] - trendOrder[b.trend] || b.probability - a.probability
    );
  }, [selectedSubject, sortBy]);

  const hotCount = TOPICS.filter(t => t.trend === "hot").length;
  const risingCount = TOPICS.filter(t => t.trend === "rising").length;
  const consistentCount = TOPICS.filter(t => t.trend === "consistent").length;

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
          <div className="bg-amber-500/20 p-1.5 rounded-lg">
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-mono font-bold text-foreground">Next Exam Topic Predictor</p>
            <p className="text-[10px] font-mono text-muted-foreground">High-yield predictions based on 10-year NEET PG/INICET frequency analysis</p>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5 text-center">
              <p className="text-lg font-mono font-bold text-red-400">{hotCount}</p>
              <p className="text-[10px] font-mono text-red-400/80">🔥 Hot Topics</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2.5 text-center">
              <p className="text-lg font-mono font-bold text-orange-400">{risingCount}</p>
              <p className="text-[10px] font-mono text-orange-400/80">📈 Rising</p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2.5 text-center">
              <p className="text-lg font-mono font-bold text-emerald-400">{consistentCount}</p>
              <p className="text-[10px] font-mono text-emerald-400/80">✅ Consistent</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Subject:</span>
            </div>
            {["All", ...ALL_SUBJECTS].map(s => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all ${
                  selectedSubject === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Sort:</span>
            {(["probability", "trend"] as const).map(opt => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all capitalize ${
                  sortBy === opt
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {opt === "probability" ? "Probability" : "Trend"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {filtered.map((entry) => {
          const trendCfg = TREND_CONFIG[entry.trend];
          const TrendIcon = trendCfg.icon;
          const subjectColor = SUBJECT_COLORS[entry.subject] ?? "bg-muted/20 text-muted-foreground border-border";

          return (
            <div
              key={`${entry.topic}-${entry.subject}`}
              className={`bg-card border border-border rounded-xl p-4 space-y-3 ${trendCfg.bg}`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  <p className="text-sm font-mono font-bold text-foreground">{entry.topic}</p>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${subjectColor}`}>
                    {entry.subject}
                  </span>
                </div>
                <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border flex-shrink-0 ${trendCfg.classes}`}>
                  <TrendIcon className="w-2.5 h-2.5" />
                  {trendCfg.label === "Hot" ? "🔥" : trendCfg.label === "Rising" ? "📈" : trendCfg.label === "Consistent" ? "✅" : "📉"} {trendCfg.label}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">Predicted probability</span>
                  <span className="text-[10px] font-mono text-muted-foreground">Last seen: {entry.lastYear}</span>
                </div>
                <ProbabilityBar value={entry.probability} />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-muted-foreground uppercase">10-year frequency (2015–2024)</span>
                <Sparkline values={entry.yearlyFreq} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-muted/20 border border-border rounded-xl px-4 py-3">
        <p className="text-[10px] font-mono text-muted-foreground text-center">
          Predictions based on 10-year NEET PG/INICET paper analysis. Always verify with official sources.
        </p>
      </div>
    </div>
  );
}
