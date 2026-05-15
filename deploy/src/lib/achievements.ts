export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementState {
  completedDays: number[];
  streak: { count: number; longest: number };
  mcqCorrect: number;
  mcqAttempted: number;
  pyqAttempted: number;
  notesCount: number;
  drillsCompleted: number;
  simulationCompleted: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Complete your first study day',
    emoji: '🎯',
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: 'on_a_roll',
    title: 'On a Roll',
    description: 'Build a 3-day study streak',
    emoji: '🔥',
    xpReward: 75,
    rarity: 'common',
  },
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Build a 7-day study streak',
    emoji: '⚔️',
    xpReward: 200,
    rarity: 'rare',
  },
  {
    id: 'fortnight_force',
    title: 'Fortnight Force',
    description: 'Build a 14-day study streak',
    emoji: '💎',
    xpReward: 500,
    rarity: 'epic',
  },
  {
    id: 'halfway',
    title: 'Halfway There',
    description: 'Complete 14 of 28 study days',
    emoji: '🌓',
    xpReward: 150,
    rarity: 'rare',
  },
  {
    id: 'war_plan',
    title: 'War Plan Complete',
    description: 'Finish all 28 study days',
    emoji: '🏆',
    xpReward: 500,
    rarity: 'legendary',
  },
  {
    id: 'mcq_warrior',
    title: 'MCQ Warrior',
    description: 'Answer 100 MCQs correctly',
    emoji: '💡',
    xpReward: 100,
    rarity: 'rare',
  },
  {
    id: 'mcq_machine',
    title: 'MCQ Machine',
    description: 'Answer 500 MCQs correctly',
    emoji: '🤖',
    xpReward: 300,
    rarity: 'epic',
  },
  {
    id: 'pyq_hunter',
    title: 'PYQ Hunter',
    description: 'Attempt 50 previous year questions',
    emoji: '🎯',
    xpReward: 75,
    rarity: 'common',
  },
  {
    id: 'scholar',
    title: 'Scholar',
    description: 'Write notes for 10 different days',
    emoji: '📝',
    xpReward: 100,
    rarity: 'rare',
  },
  {
    id: 'mock_master',
    title: 'Mock Master',
    description: 'Complete a full exam simulation',
    emoji: '📋',
    xpReward: 150,
    rarity: 'rare',
  },
  {
    id: 'high_performer',
    title: 'High Performer',
    description: 'Maintain 90%+ overall MCQ accuracy (50+ attempts)',
    emoji: '⭐',
    xpReward: 300,
    rarity: 'epic',
  },
  {
    id: 'drill_sergeant',
    title: 'Drill Sergeant',
    description: 'Complete 5 subject drills',
    emoji: '🎖️',
    xpReward: 100,
    rarity: 'rare',
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Complete a rapid revision session',
    emoji: '⚡',
    xpReward: 75,
    rarity: 'common',
  },
  {
    id: 'aiims_aspirant',
    title: 'AIIMS Aspirant',
    description: 'Reach 1000 XP',
    emoji: '🏥',
    xpReward: 200,
    rarity: 'epic',
  },
  {
    id: 'topper_bound',
    title: 'Topper Bound',
    description: 'Reach 5000 XP',
    emoji: '👑',
    xpReward: 500,
    rarity: 'legendary',
  },
];

export function checkAchievements(
  state: AchievementState,
  xp: number,
  unlocked: string[],
): Achievement[] {
  const newly: Achievement[] = [];

  const check = (a: Achievement, cond: boolean) => {
    if (cond && !unlocked.includes(a.id)) newly.push(a);
  };

  const map: Record<string, () => boolean> = {
    first_step:      () => state.completedDays.length >= 1,
    on_a_roll:       () => state.streak.longest >= 3,
    week_warrior:    () => state.streak.longest >= 7,
    fortnight_force: () => state.streak.longest >= 14,
    halfway:         () => state.completedDays.length >= 14,
    war_plan:        () => state.completedDays.length >= 28,
    mcq_warrior:     () => state.mcqCorrect >= 100,
    mcq_machine:     () => state.mcqCorrect >= 500,
    pyq_hunter:      () => state.pyqAttempted >= 50,
    scholar:         () => state.notesCount >= 10,
    mock_master:     () => state.simulationCompleted,
    high_performer:  () => state.mcqAttempted >= 50 && state.mcqCorrect / state.mcqAttempted >= 0.9,
    drill_sergeant:  () => state.drillsCompleted >= 5,
    speed_demon:     () => state.drillsCompleted >= 1,
    aiims_aspirant:  () => xp >= 1000,
    topper_bound:    () => xp >= 5000,
  };

  for (const a of ACHIEVEMENTS) {
    const condFn = map[a.id];
    if (condFn) check(a, condFn());
  }

  return newly;
}
