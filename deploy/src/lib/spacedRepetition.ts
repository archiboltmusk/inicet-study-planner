/**
 * Smart Study Scheduling: Spaced Repetition & Retention Curves
 * Leitner system + Ebbinghaus forgetting curve + adaptive scheduling
 */

export interface Card {
  id: string;
  topic: string;
  question: string;
  difficulty: number; // 1-5
  box: number; // 0-4 in Leitner system (0 = new)
  interval: number; // days until next review
  easeFactor: number; // SM-2 algorithm: affects difficulty progression
  repetitions: number; // total times reviewed
  lastReview: number | null; // timestamp
  nextReview: number; // timestamp when card is due
  correctStreak: number; // consecutive correct answers
  failureCount: number; // times failed (wrong answer)
  createdAt: number;
}

export interface SchedulingRecommendation {
  cardId: string;
  daysUntilDue: number;
  priority: "critical" | "high" | "medium" | "low";
  retentionProbability: number; // 0-1: probability user remembers this
  estimatedReviewTime: number; // minutes
}

export interface DailySchedule {
  date: string; // YYYY-MM-DD
  newCards: Card[];
  reviewCards: Card[];
  optionalCards: Card[];
  totalEstimatedTime: number; // minutes
  recommendedBreaks: number; // how many 5-min breaks needed
  focusAreas: string[]; // topics to prioritize
}

export interface RetentionCurve {
  topic: string;
  daysAgo: number;
  retentionProbability: number; // 0-1
  reviewCount: number;
  averageEaseFactor: number;
}

// Ebbinghaus forgetting curve: R(t) = e^(-t/S)
// Where R = retention probability, t = time elapsed, S = strength factor
function calculateRetentionProbability(
  lastReviewTime: number,
  easeFactor: number,
  interval: number,
  difficulty: number
): number {
  const daysSinceReview = (Date.now() - lastReviewTime) / (86400000);
  const strengthFactor = easeFactor * interval * (6 - difficulty) / 5; // adjust for difficulty

  // Exponential decay with minimum floor
  const retention = Math.max(0.1, Math.exp(-daysSinceReview / strengthFactor));
  return Math.min(1, retention);
}

/**
 * SM-2 Algorithm for spaced repetition
 * Adjusts ease factor and interval based on response quality
 * @param quality 0-5: 0=complete blackout, 5=perfect response
 */
function updateCardSM2(card: Card, quality: number): Card {
  if (quality < 3) {
    // Failed: reset and increase difficulty
    return {
      ...card,
      box: 0,
      interval: 1,
      repetitions: card.repetitions + 1,
      correctStreak: 0,
      failureCount: card.failureCount + 1,
      easeFactor: Math.max(1.3, card.easeFactor - 0.2),
      nextReview: Date.now() + 86400000, // 1 day
    };
  }

  // Passed: advance spaced repetition
  let newInterval = card.interval;
  if (card.repetitions === 0) {
    newInterval = 1; // First review: 1 day
  } else if (card.repetitions === 1) {
    newInterval = 3; // Second review: 3 days
  } else {
    newInterval = Math.round(card.interval * card.easeFactor);
  }

  // Update ease factor (SM-2)
  const newEaseFactor = card.easeFactor + 0.1 - (5 - quality) * 0.08;

  return {
    ...card,
    box: Math.min(4, card.box + 1), // advance box (max 4)
    interval: newInterval,
    repetitions: card.repetitions + 1,
    correctStreak: card.correctStreak + 1,
    easeFactor: Math.max(1.3, newEaseFactor),
    lastReview: Date.now(),
    nextReview: Date.now() + newInterval * 86400000,
  };
}

/**
 * Review card and update scheduling
 * @param card Card to review
 * @param quality 0-5 (0=blackout, 3=passing, 5=perfect)
 */
export function reviewCard(card: Card, quality: number): Card {
  if (quality < 0 || quality > 5 || !Number.isInteger(quality)) {
    throw new Error("Quality must be integer 0-5");
  }

  return updateCardSM2(card, quality);
}

/**
 * Calculate recommendations for review priority
 */
export function prioritizeReviews(
  cards: Card[],
  availableTimeMinutes: number = 120
): SchedulingRecommendation[] {
  const now = Date.now();

  const recommendations = cards
    .filter(card => card.nextReview <= now)
    .map(card => {
      const daysOverdue = (now - card.nextReview) / 86400000;
      const retention = calculateRetentionProbability(
        card.lastReview ?? card.createdAt,
        card.easeFactor,
        card.interval,
        card.difficulty
      );

      // Priority: overdue + low retention + high difficulty
      const priorityScore = daysOverdue * 10 + (1 - retention) * 20 + (5 - card.difficulty) * 5;

      let priority: "critical" | "high" | "medium" | "low";
      if (priorityScore > 30) {
        priority = "critical";
      } else if (priorityScore > 15) {
        priority = "high";
      } else if (priorityScore > 5) {
        priority = "medium";
      } else {
        priority = "low";
      }

      const estimatedReviewTime = card.difficulty <= 2 ? 1 : card.difficulty <= 4 ? 2 : 3;

      return {
        cardId: card.id,
        daysUntilDue: Math.ceil(daysOverdue),
        priority,
        retentionProbability: Math.min(1, Math.max(0, retention)),
        estimatedReviewTime,
      };
    })
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  // Select cards that fit in available time
  let timeUsed = 0;
  return recommendations.filter(rec => {
    if (timeUsed + rec.estimatedReviewTime <= availableTimeMinutes) {
      timeUsed += rec.estimatedReviewTime;
      return true;
    }
    return false;
  });
}

/**
 * Generate daily study schedule
 */
export function generateDailySchedule(
  cards: Card[],
  availableTimeMinutes: number = 240, // 4 hours
  date: string = new Date().toISOString().split("T")[0]
): DailySchedule {
  const now = Date.now();
  const dayStart = new Date(date).getTime();
  const dayEnd = dayStart + 86400000;

  // Categorize cards
  const newCards = cards.filter(c => c.box === 0);
  const reviewCards = cards.filter(c => c.nextReview <= now && c.box > 0);
  const upcomingCards = cards.filter(
    c => c.nextReview > now && c.nextReview < dayEnd && c.box > 0
  );

  // Limit new cards: max 20 per day
  const maxNewCards = Math.min(20, Math.floor(availableTimeMinutes / 3));
  const selectedNewCards = newCards.slice(0, maxNewCards);

  // Get review priorities
  const allDueCards = [...reviewCards, ...upcomingCards];
  const recommendations = prioritizeReviews(allDueCards, availableTimeMinutes);
  const selectedReviewCards = recommendations
    .slice(0, Math.floor(availableTimeMinutes / 2))
    .map(rec => cards.find(c => c.id === rec.cardId)!)
    .filter(Boolean);

  // Optional cards for extra review
  const reviewedCardIds = new Set(selectedReviewCards.map(c => c.id));
  const optionalCards = upcomingCards.filter(c => !reviewedCardIds.has(c.id)).slice(0, 5);

  // Calculate metrics
  const totalEstimatedTime =
    selectedNewCards.length * 3 + selectedReviewCards.length * 2 + optionalCards.length * 1;
  const recommendedBreaks = Math.ceil(totalEstimatedTime / 25); // Pomodoro: 25 min blocks

  // Identify focus areas (weak topics with low retention)
  const topicRetention: Record<string, number[]> = {};
  [...selectedNewCards, ...selectedReviewCards].forEach(card => {
    if (!topicRetention[card.topic]) {
      topicRetention[card.topic] = [];
    }
    const retention =
      card.lastReview !== null
        ? calculateRetentionProbability(
            card.lastReview,
            card.easeFactor,
            card.interval,
            card.difficulty
          )
        : 0.5;
    topicRetention[card.topic].push(retention);
  });

  const focusAreas = Object.entries(topicRetention)
    .map(([topic, retentions]) => ({
      topic,
      avgRetention: retentions.reduce((a, b) => a + b, 0) / retentions.length,
    }))
    .filter(t => t.avgRetention < 0.7)
    .sort((a, b) => a.avgRetention - b.avgRetention)
    .slice(0, 3)
    .map(t => t.topic);

  return {
    date,
    newCards: selectedNewCards,
    reviewCards: selectedReviewCards,
    optionalCards,
    totalEstimatedTime,
    recommendedBreaks,
    focusAreas,
  };
}

/**
 * Calculate retention curve for a topic over time
 */
export function calculateRetentionCurve(
  cards: Card[],
  topic: string,
  daysBack: number = 30
): RetentionCurve {
  const topicCards = cards.filter(c => c.topic === topic);
  if (topicCards.length === 0) {
    return {
      topic,
      daysAgo: daysBack,
      retentionProbability: 0.5,
      reviewCount: 0,
      averageEaseFactor: 2.5,
    };
  }

  const now = Date.now();
  const reviewCount = topicCards.reduce((sum, c) => sum + c.repetitions, 0);
  const avgEaseFactor =
    topicCards.reduce((sum, c) => sum + c.easeFactor, 0) / topicCards.length;

  // Average retention for cards reviewed in the last N days
  const recentCards = topicCards.filter(
    c =>
      c.lastReview !== null &&
      (now - c.lastReview) < daysBack * 86400000
  );

  let avgRetention = 0.5;
  if (recentCards.length > 0) {
    const retentions = recentCards.map(c =>
      calculateRetentionProbability(
        c.lastReview!,
        c.easeFactor,
        c.interval,
        c.difficulty
      )
    );
    avgRetention = retentions.reduce((a, b) => a + b, 0) / retentions.length;
  }

  return {
    topic,
    daysAgo: daysBack,
    retentionProbability: Math.min(1, Math.max(0, avgRetention)),
    reviewCount,
    averageEaseFactor: Math.round(avgEaseFactor * 100) / 100,
  };
}

/**
 * Get optimal review time based on circadian rhythm and spaced repetition
 */
export function getOptimalReviewTimes(
  morningPeak: boolean = true,
  afternoonPeak: boolean = true,
  eveningPeak: boolean = false
): number[] {
  const times: number[] = [];

  // Peak learning times: 9-11am, 2-4pm, 7-9pm
  if (morningPeak) {
    times.push(9, 10, 11); // 9-11am
  }
  if (afternoonPeak) {
    times.push(14, 15, 16); // 2-4pm
  }
  if (eveningPeak) {
    times.push(19, 20, 21); // 7-9pm
  }

  return times.length > 0 ? times : [14]; // default to 2pm
}

/**
 * Initialize a new card
 */
export function createCard(
  id: string,
  topic: string,
  question: string,
  difficulty: number = 3
): Card {
  return {
    id,
    topic,
    question,
    difficulty: Math.max(1, Math.min(5, difficulty)),
    box: 0,
    interval: 0,
    easeFactor: 2.5,
    repetitions: 0,
    lastReview: null,
    nextReview: Date.now(),
    correctStreak: 0,
    failureCount: 0,
    createdAt: Date.now(),
  };
}

/**
 * Bulk import cards from question bank
 */
export function initializeCardDeck(
  questions: Array<{
    id: string;
    topic: string;
    question: string;
    difficulty?: number;
  }>
): Card[] {
  return questions.map(q =>
    createCard(q.id, q.topic, q.question, q.difficulty ?? 3)
  );
}
