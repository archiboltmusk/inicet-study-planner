import { useState, useMemo } from "react";
import { Moon, Zap, BookOpen, Target, Activity, BatteryLow, Clock } from "lucide-react";
import { safeLoad, safeSave } from "@/lib/storage";

type MoodLevel = 1 | 2 | 3 | 4 | 5;

interface MoodOption {
  level: MoodLevel;
  emoji: string;
  label: string;
}

interface ModeConfig {
  title: string;
  subtitle: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  icon: React.ElementType;
  iconColor: string;
  suggestions: string[];
  ctaLabel?: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  { level: 1, emoji: "😴", label: "Exhausted" },
  { level: 2, emoji: "😟", label: "Stressed" },
  { level: 3, emoji: "😐", label: "Okay" },
  { level: 4, emoji: "🙂", label: "Good" },
  { level: 5, emoji: "🚀", label: "Energised" },
];

const MODE_CONFIG: Record<MoodLevel, ModeConfig> = {
  1: {
    title: "Rest Day Mode",
    subtitle: "Your body needs recovery. Take it easy today.",
    borderColor: "border-l-amber-400",
    bgColor: "bg-amber-500/5",
    textColor: "text-amber-400",
    icon: BatteryLow,
    iconColor: "text-amber-400",
    suggestions: [
      "Do just 5 easy one-liners",
      "Watch a 10-min revision video",
      "Go to bed early",
      "No new topics today",
    ],
    ctaLabel: "Go to One-liners",
  },
  2: {
    title: "Light Mode",
    subtitle: "30% of normal target. Focus on what you already know.",
    borderColor: "border-l-orange-400",
    bgColor: "bg-orange-500/5",
    textColor: "text-orange-400",
    icon: Moon,
    iconColor: "text-orange-400",
    suggestions: [
      "Revise already-done topics only",
      "Do 10 PYQs from your strongest subject",
      "Take a 20-min walk",
      "Avoid new chapters",
    ],
  },
  3: {
    title: "Normal Mode",
    subtitle: "Stick to your plan. Steady progress wins the race.",
    borderColor: "border-l-yellow-400",
    bgColor: "bg-yellow-500/5",
    textColor: "text-yellow-400",
    icon: BookOpen,
    iconColor: "text-yellow-400",
    suggestions: [
      "Follow your daily schedule",
      "Aim for 30 MCQs",
      "Complete today's chapter",
    ],
  },
  4: {
    title: "Focused Mode",
    subtitle: "You have energy to spare — push a bit harder.",
    borderColor: "border-l-blue-400",
    bgColor: "bg-blue-500/5",
    textColor: "text-blue-400",
    icon: Target,
    iconColor: "text-blue-400",
    suggestions: [
      "Try 50 MCQs",
      "Tackle a weak subject",
      "Attempt a timed mock test",
      "Study 1 extra chapter",
    ],
  },
  5: {
    title: "Peak Mode",
    subtitle: "Maximum output day. Make the most of it!",
    borderColor: "border-l-emerald-400",
    bgColor: "bg-emerald-500/5",
    textColor: "text-emerald-400",
    icon: Zap,
    iconColor: "text-emerald-400",
    suggestions: [
      "Full 100-MCQ session",
      "Start your hardest pending topic",
      "Do a full exam simulation",
      "Extra revision before sleep",
    ],
    ctaLabel: "Start Exam Simulation",
  },
};

const LEVEL_BAR_COLORS: Record<number, string> = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-400",
  4: "bg-blue-500",
  5: "bg-emerald-500",
};

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function getLast7DayKeys(): string[] {
  const keys: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    keys.push(d.toISOString().slice(0, 10));
  }
  return keys;
}

function getDayLabel(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return DAY_LABELS[d.getDay()];
}

function isToday(iso: string): boolean {
  return iso === getTodayKey();
}

export function StressAdaptive() {
  const [stressLog, setStressLog] = useState<Record<string, number>>(
    () => safeLoad<Record<string, number>>("stress_log", {})
  );
  const [toast, setToast] = useState<string | null>(null);

  const todayKey = getTodayKey();
  const todayLevel = stressLog[todayKey] as MoodLevel | undefined;

  function handleMoodSelect(level: MoodLevel) {
    const updated = { ...stressLog, [todayKey]: level };
    setStressLog(updated);
    safeSave("stress_log", updated);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  const last7 = useMemo(() => getLast7DayKeys(), []);

  const weekEntries = last7.map(k => ({
    key: k,
    label: getDayLabel(k),
    level: stressLog[k] as MoodLevel | undefined,
    today: isToday(k),
  }));

  const weekValues = weekEntries.map(e => e.level).filter((v): v is MoodLevel => v !== undefined);
  const weekAvg = weekValues.length > 0
    ? weekValues.reduce((a, b) => a + b, 0) / weekValues.length
    : null;

  const insightText =
    weekAvg === null
      ? null
      : weekAvg < 2.5
        ? "You've been under significant stress. Consider talking to a mentor or taking a day off."
        : weekAvg <= 3.5
          ? "You're maintaining a steady pace. Keep going!"
          : "You've had a great week! Keep this momentum going!";

  const insightColor =
    weekAvg === null
      ? ""
      : weekAvg < 2.5
        ? "text-red-400"
        : weekAvg <= 3.5
          ? "text-yellow-400"
          : "text-emerald-400";

  const mode = todayLevel ? MODE_CONFIG[todayLevel] : null;
  const ModeIcon = mode?.icon ?? Activity;

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-primary text-primary-foreground text-xs font-mono px-4 py-2.5 rounded-xl shadow-lg animate-in slide-in-from-top-2">
          {toast}
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
          <div className="bg-blue-500/20 p-1.5 rounded-lg">
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-mono font-bold text-foreground">Stress-Adaptive Mode</p>
            <p className="text-[10px] font-mono text-muted-foreground">Daily mood check-in that adapts your study plan</p>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {!todayLevel ? (
            <div className="space-y-4">
              <p className="text-sm font-mono font-semibold text-foreground text-center">How are you feeling today?</p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {MOOD_OPTIONS.map(opt => (
                  <button
                    key={opt.level}
                    onClick={() => handleMoodSelect(opt.level)}
                    className="flex flex-col items-center gap-1.5 text-4xl p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <span>{opt.emoji}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-mono text-muted-foreground">Today's mood</p>
                <button
                  onClick={() => {
                    const updated = { ...stressLog };
                    delete updated[todayKey];
                    setStressLog(updated);
                    safeSave("stress_log", updated);
                  }}
                  className="text-[10px] font-mono text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {MOOD_OPTIONS.map(opt => (
                  <button
                    key={opt.level}
                    onClick={() => handleMoodSelect(opt.level)}
                    className={`flex flex-col items-center gap-1.5 text-4xl p-4 rounded-xl border-2 transition-all ${
                      todayLevel === opt.level
                        ? "border-primary bg-primary/10"
                        : "border-border opacity-40 hover:opacity-70"
                    }`}
                  >
                    <span>{opt.emoji}</span>
                    <span className="text-[10px] font-mono text-muted-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>

              {mode && (
                <div className={`border-l-4 ${mode.borderColor} ${mode.bgColor} rounded-r-xl p-4 space-y-3`}>
                  <div className="flex items-center gap-2">
                    <ModeIcon className={`w-4 h-4 ${mode.iconColor}`} />
                    <div>
                      <p className={`text-sm font-mono font-bold ${mode.textColor}`}>{mode.title}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">{mode.subtitle}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {mode.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`text-[10px] font-mono font-bold ${mode.textColor} mt-px`}>→</span>
                        <span className="text-[11px] font-mono text-foreground/80">{s}</span>
                      </li>
                    ))}
                  </ul>

                  {mode.ctaLabel && (
                    <button
                      onClick={() => showToast(
                        todayLevel === 1
                          ? "Navigate to Practice > One-liners"
                          : "Navigate to Practice > Exam Simulation"
                      )}
                      className={`text-[11px] font-mono font-semibold px-4 py-2 rounded-lg border ${mode.borderColor.replace("border-l-", "border-")} ${mode.textColor} hover:opacity-80 transition-opacity`}
                    >
                      {mode.ctaLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <p className="text-[11px] font-mono font-semibold text-foreground">7-Day Mood History</p>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-end gap-2">
            {weekEntries.map(entry => {
              const barHeight = entry.level ? `${(entry.level / 5) * 100}%` : "0%";
              const barColor = entry.level ? LEVEL_BAR_COLORS[entry.level] : "";
              const emoji = entry.level ? MOOD_OPTIONS[entry.level - 1].emoji : null;

              return (
                <div key={entry.key} className="flex-1 flex flex-col items-center gap-1">
                  {emoji ? (
                    <span className="text-base">{emoji}</span>
                  ) : (
                    <span className="text-base text-muted-foreground/40">—</span>
                  )}
                  <div className="w-full h-16 bg-muted/20 rounded-md overflow-hidden flex items-end">
                    {entry.level ? (
                      <div
                        className={`w-full rounded-md transition-all ${barColor} ${entry.today ? "opacity-100" : "opacity-70"}`}
                        style={{ height: barHeight }}
                      />
                    ) : (
                      <div className="w-full h-1 bg-muted/30 rounded" />
                    )}
                  </div>
                  <span className={`text-[9px] font-mono ${entry.today ? "text-primary font-bold" : "text-muted-foreground"}`}>
                    {entry.today ? "Today" : entry.label}
                  </span>
                </div>
              );
            })}
          </div>

          {weekAvg !== null && (
            <div className="bg-muted/10 border border-border rounded-lg px-3 py-2.5 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-muted-foreground">7-day average</span>
                <span className={`text-[11px] font-mono font-bold ${insightColor}`}>
                  {weekAvg.toFixed(1)} / 5.0
                </span>
              </div>
              {insightText && (
                <p className={`text-[10px] font-mono ${insightColor}`}>{insightText}</p>
              )}
            </div>
          )}

          {weekAvg === null && (
            <p className="text-[10px] font-mono text-muted-foreground text-center">
              No entries yet. Check in daily to see your mood trends.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
