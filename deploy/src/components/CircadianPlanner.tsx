import { useState, useMemo } from "react";
import {
  Sunrise,
  Zap,
  Coffee,
  Brain,
  Moon,
  BookOpen,
  Star,
  Download,
  Clock,
} from "lucide-react";
import { safeLoad, safeSave } from "@/lib/storage";

interface BlockDef {
  label: string;
  offsetStartH: number;
  offsetEndH: number;
  intensity: "Low" | "High" | "Medium" | "Break";
  activity: string;
  color: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
}

const BLOCK_DEFS: BlockDef[] = [
  {
    label: "Warm-up",
    offsetStartH: 0,
    offsetEndH: 1,
    intensity: "Low",
    activity: "Easy revision, one-liners, mnemonics",
    color: "bg-slate-500/5",
    borderColor: "border-l-slate-400",
    badgeBg: "bg-slate-500/15",
    badgeText: "text-slate-400",
    icon: <Sunrise className="w-4 h-4 text-slate-400" />,
  },
  {
    label: "Peak Focus",
    offsetStartH: 1,
    offsetEndH: 4,
    intensity: "High",
    activity: "New topics, hardest subjects, MCQ drills",
    color: "bg-amber-500/5",
    borderColor: "border-l-amber-400",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-400",
    icon: <Zap className="w-4 h-4 text-amber-400" />,
  },
  {
    label: "Break",
    offsetStartH: 4,
    offsetEndH: 5,
    intensity: "Break",
    activity: "Walk, eat, rest",
    color: "bg-green-500/5",
    borderColor: "border-l-green-400",
    badgeBg: "bg-green-500/15",
    badgeText: "text-green-400",
    icon: <Coffee className="w-4 h-4 text-green-400" />,
  },
  {
    label: "Secondary Focus",
    offsetStartH: 5,
    offsetEndH: 7,
    intensity: "Medium",
    activity: "Mock tests, past papers, note-making",
    color: "bg-purple-500/5",
    borderColor: "border-l-purple-400",
    badgeBg: "bg-purple-500/15",
    badgeText: "text-purple-400",
    icon: <Brain className="w-4 h-4 text-purple-400" />,
  },
  {
    label: "Post-lunch Dip",
    offsetStartH: 7,
    offsetEndH: 8,
    intensity: "Low",
    activity: "Mnemonics, flowcharts, passive review",
    color: "bg-slate-500/5",
    borderColor: "border-l-slate-500",
    badgeBg: "bg-slate-500/15",
    badgeText: "text-slate-400",
    icon: <BookOpen className="w-4 h-4 text-slate-400" />,
  },
  {
    label: "Evening Review",
    offsetStartH: 8,
    offsetEndH: 10,
    intensity: "Medium",
    activity: "Spaced repetition, flashcards",
    color: "bg-blue-500/5",
    borderColor: "border-l-blue-400",
    badgeBg: "bg-blue-500/15",
    badgeText: "text-blue-400",
    icon: <Star className="w-4 h-4 text-blue-400" />,
  },
  {
    label: "Light Recap",
    offsetStartH: 10,
    offsetEndH: 11,
    intensity: "Low",
    activity: "5-question quiz, highlight review",
    color: "bg-indigo-500/5",
    borderColor: "border-l-indigo-400",
    badgeBg: "bg-indigo-500/15",
    badgeText: "text-indigo-400",
    icon: <Moon className="w-4 h-4 text-indigo-400" />,
  },
];

function parseTime(t: string): { h: number; m: number } {
  const [h, m] = t.split(":").map(Number);
  return { h: h ?? 0, m: m ?? 0 };
}

function addHours(base: { h: number; m: number }, hours: number): string {
  const totalMins = base.h * 60 + base.m + Math.round(hours * 60);
  const h = Math.floor(totalMins / 60) % 24;
  const m = totalMins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function fmt12(t: string): string {
  const { h, m } = parseTime(t);
  const period = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export function CircadianPlanner() {
  const [wakeTime, setWakeTime] = useState<string>(() =>
    safeLoad<string>("circadian_wake", "06:00")
  );
  const [sleepTime, setSleepTime] = useState<string>(() =>
    safeLoad<string>("circadian_sleep", "23:00")
  );
  const [studyHours, setStudyHours] = useState(8);
  const [copied, setCopied] = useState(false);

  const handleWakeChange = (v: string) => {
    setWakeTime(v);
    safeSave("circadian_wake", v);
  };

  const handleSleepChange = (v: string) => {
    setSleepTime(v);
    safeSave("circadian_sleep", v);
  };

  const wakeBase = useMemo(() => parseTime(wakeTime), [wakeTime]);

  const blocks = useMemo(
    () =>
      BLOCK_DEFS.filter((b) => b.offsetStartH < studyHours).map((b) => {
        const clampedEnd = Math.min(b.offsetEndH, studyHours);
        const start = addHours(wakeBase, b.offsetStartH);
        const end = addHours(wakeBase, clampedEnd);
        return { ...b, start, end, clampedEnd };
      }),
    [wakeBase, studyHours]
  );

  const peakBlock = blocks.find((b) => b.label === "Peak Focus");

  const downloadSchedule = async () => {
    const lines: string[] = [
      "MY CIRCADIAN STUDY SCHEDULE",
      "============================",
      `Wake: ${fmt12(wakeTime)}   Sleep: ${fmt12(sleepTime)}   Study hours: ${studyHours}h`,
      "",
    ];
    for (const b of blocks) {
      lines.push(
        `${fmt12(b.start)} – ${fmt12(b.end)}  [${b.intensity.toUpperCase()}]  ${b.label}`
      );
      lines.push(`  → ${b.activity}`);
      lines.push("");
    }
    lines.push(
      "Tip: Studies show memory consolidation peaks during the 2nd–4th hour after waking."
    );
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <Clock className="w-6 h-6 text-primary" />
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Circadian Study Planner
          </h2>
          <p className="text-sm text-muted-foreground">
            Science-based schedule tuned to your body clock
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4">
        <p className="text-xs font-mono uppercase text-muted-foreground">
          Your Schedule
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Wake time
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => handleWakeChange(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Sleep time
            </label>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => handleSleepChange(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Study hours/day
            </label>
            <input
              type="number"
              min={1}
              max={14}
              value={studyHours}
              onChange={(e) =>
                setStudyHours(
                  Math.min(14, Math.max(1, parseInt(e.target.value) || 1))
                )
              }
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      {peakBlock && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-amber-400">
              Your Peak Zone
            </p>
            <p className="text-sm text-foreground">
              {fmt12(peakBlock.start)} – {fmt12(peakBlock.end)} — tackle your
              hardest subjects now
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Studies show memory consolidation peaks during the 2nd–4th hour
              after waking
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <p className="text-xs font-mono uppercase text-muted-foreground">
          Timeline
        </p>
        {blocks.map((b) => (
          <div
            key={b.label}
            className={`${b.color} border border-border border-l-4 ${b.borderColor} rounded-xl p-4 flex items-start gap-4`}
          >
            <div className="mt-0.5 shrink-0">{b.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-foreground">
                  {b.label}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${b.badgeBg} ${b.badgeText}`}
                >
                  {b.intensity}
                </span>
                <span className="text-xs text-muted-foreground ml-auto font-mono">
                  {fmt12(b.start)} – {fmt12(b.end)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {b.activity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={downloadSchedule}
        className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
      >
        <Download className="w-4 h-4" />
        {copied ? "Copied to clipboard!" : "Download Schedule"}
      </button>
    </div>
  );
}
