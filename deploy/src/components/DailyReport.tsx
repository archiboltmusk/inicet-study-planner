import { useState, useEffect, useMemo } from "react";
import { safeLoad, safeSave } from "@/lib/storage";
import { X, Trophy, Flame, CheckCircle, Target, BookOpen } from "lucide-react";

const LAST_REPORT_KEY  = "neetpg_last_report_date";
const DAILY_XP_LOG_KEY = "neetpg_daily_xp_log";
const TODO_STORAGE_KEY = "unified_todos_v2";

interface DailyXPEntry { date: string; xp: number; }

interface DailyReportProps {
  totalXP: number;
  streak:  { count: number; longest: number; lastDate: string };
  onDismiss: () => void;
}

export function DailyReport({ totalXP, streak, onDismiss }: DailyReportProps) {
  const today = new Date().toISOString().slice(0, 10);

  // XP earned today = totalXP - yesterday's logged XP
  const xpLog     = safeLoad<DailyXPEntry[]>(DAILY_XP_LOG_KEY, []);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const yestEntry = xpLog.find(e => e.date === yesterday);
  const xpToday   = yestEntry ? Math.max(0, totalXP - yestEntry.xp) : 0;

  // Todo completion for today
  const todoChecked = safeLoad<Record<string, string[]>>(TODO_STORAGE_KEY, {});
  const checkedToday = (todoChecked[today] ?? []).length;

  // PYQ accuracy (all-time — no per-day timestamps available)
  const pyqAttempts = safeLoad<Record<string, { selected: number; correct: boolean }>>("neetpg_pyq_attempts", {});
  const pyqTotal    = Object.keys(pyqAttempts).length;
  const pyqCorrect  = Object.values(pyqAttempts).filter(a => a.correct).length;
  const pyqPct      = pyqTotal > 0 ? Math.round((pyqCorrect / pyqTotal) * 100) : null;

  const stats = [
    { icon: <CheckCircle className="w-4 h-4 text-emerald-400" />, label: "Checked off today", value: checkedToday > 0 ? String(checkedToday) : "—" },
    { icon: <BookOpen    className="w-4 h-4 text-blue-400"    />, label: "PYQ accuracy",       value: pyqPct !== null ? `${pyqPct}%` : "—"         },
    { icon: <Trophy      className="w-4 h-4 text-amber-400"   />, label: "XP today",           value: xpToday > 0 ? `+${xpToday}` : "—"            },
    { icon: <Flame       className="w-4 h-4 text-orange-400"  />, label: "Streak",             value: `${streak.count}d`                            },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="font-mono font-bold text-foreground text-sm">Daily Report — {today}</h2>
          </div>
          <button
            onClick={onDismiss}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 px-5 pb-5">
          {stats.map(({ icon, label, value }) => (
            <div key={label} className="bg-background border border-border rounded-xl p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
                {icon}
                <span>{label}</span>
              </div>
              <div className="text-lg font-mono font-bold text-foreground">{value}</div>
            </div>
          ))}
        </div>

        <div className="px-5 pb-5">
          <p className="text-xs font-mono text-muted-foreground text-center">
            {streak.count >= 7
              ? `${streak.count}-day streak — unstoppable!`
              : xpToday > 50
              ? "Great session. Keep stacking those gains."
              : "Every session counts. Show up tomorrow."}
          </p>
        </div>
      </div>
    </div>
  );
}

// Hook: triggers once per day (first open after midnight)
export function useDailyReport(totalXP: number): [boolean, () => void] {
  const today = new Date().toISOString().slice(0, 10);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lastDate = safeLoad<string>(LAST_REPORT_KEY, "");
    if (lastDate !== today) {
      // Log today's XP snapshot before showing report
      const xpLog = safeLoad<DailyXPEntry[]>(DAILY_XP_LOG_KEY, []);
      if (!xpLog.find(e => e.date === today)) {
        safeSave(DAILY_XP_LOG_KEY, [{ date: today, xp: totalXP }, ...xpLog].slice(0, 30));
      }
      // Only show the report if there was a previous session (not first-ever open)
      if (lastDate) setShow(true);
      safeSave(LAST_REPORT_KEY, today);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [show, () => setShow(false)];
}
