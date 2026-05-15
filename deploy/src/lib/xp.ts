export const XP_VALUES = {
  day_complete:         50,
  mcq_correct:           5,
  mcq_wrong:             1,
  pyq_correct:           8,
  pyq_wrong:             2,
  drill_complete:       25,
  rapid_complete:       20,
  simulation_complete: 100,
  note_added:           10,
  ai_chat:               5,
  streak_3:             50,
  streak_7:            200,
  streak_14:           500,
} as const;

export type XPEventType = keyof typeof XP_VALUES;

export interface XPEvent {
  type: XPEventType;
  amount: number;
  ts: number;
}

export interface Rank {
  min: number;
  max: number;
  title: string;
  emoji: string;
  color: string;
  bg: string;
}

export const RANKS: Rank[] = [
  { min: 0,     max: 99,       title: 'Intern',          emoji: '💊', color: 'text-slate-400',  bg: 'bg-slate-400/10' },
  { min: 100,   max: 249,      title: 'House Officer',   emoji: '🏥', color: 'text-blue-400',   bg: 'bg-blue-400/10'  },
  { min: 250,   max: 499,      title: 'Junior Resident', emoji: '📋', color: 'text-cyan-400',   bg: 'bg-cyan-400/10'  },
  { min: 500,   max: 999,      title: 'Senior Resident', emoji: '🔬', color: 'text-teal-400',   bg: 'bg-teal-400/10'  },
  { min: 1000,  max: 1999,     title: 'Registrar',       emoji: '📚', color: 'text-violet-400', bg: 'bg-violet-400/10'},
  { min: 2000,  max: 3499,     title: 'Consultant',      emoji: '⚕️',  color: 'text-indigo-400', bg: 'bg-indigo-400/10'},
  { min: 3500,  max: 5999,     title: 'Sr. Consultant',  emoji: '🏆', color: 'text-amber-400',  bg: 'bg-amber-400/10' },
  { min: 6000,  max: 9999,     title: 'Professor',       emoji: '🎓', color: 'text-orange-400', bg: 'bg-orange-400/10'},
  { min: 10000, max: 14999,    title: 'HoD',             emoji: '⭐', color: 'text-red-400',    bg: 'bg-red-400/10'   },
  { min: 15000, max: Infinity, title: 'AIIMS Topper',    emoji: '👑', color: 'text-yellow-400', bg: 'bg-yellow-400/10'},
];

export function getRank(xp: number): Rank {
  return RANKS.find(r => xp >= r.min && xp <= r.max) ?? RANKS[0];
}

export function getNextRank(xp: number): Rank | null {
  const idx = RANKS.findIndex(r => xp >= r.min && xp <= r.max);
  return idx >= 0 && idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
}

export function getRankProgress(xp: number): number {
  const rank = getRank(xp);
  const next = getNextRank(xp);
  if (!next) return 100;
  const range = next.min - rank.min;
  return Math.min(100, Math.round(((xp - rank.min) / range) * 100));
}

/** Compute base XP from persistent state (idempotent — used on startup). */
export function computeBaseXP(
  completedDays: number[],
  mcqScores: Record<number, { attempted: number; correct: number }>,
  notes: Record<number, string>,
  streak: { count: number; longest: number },
): number {
  let xp = completedDays.length * XP_VALUES.day_complete;

  for (const score of Object.values(mcqScores)) {
    xp += (score.correct ?? 0) * XP_VALUES.mcq_correct;
    xp += (Math.max(0, (score.attempted ?? 0) - (score.correct ?? 0))) * XP_VALUES.mcq_wrong;
  }

  const notesCount = Object.values(notes).filter(n => n?.trim()).length;
  xp += notesCount * XP_VALUES.note_added;

  if (streak.longest >= 14) xp += XP_VALUES.streak_14;
  else if (streak.longest >= 7) xp += XP_VALUES.streak_7;
  else if (streak.longest >= 3) xp += XP_VALUES.streak_3;

  return xp;
}
