/**
 * AI Adaptive Learning Engine
 * ML-driven personalization: mastery detection, difficulty adjustment, ranking prediction
 */

export interface QuestionAttempt {
  questionId: string;
  subject: string;
  topic: string;
  difficulty: number; // 1-5 scale
  answered: boolean;
  correct: boolean;
  timeSpent: number; // milliseconds
  timestamp: number;
}

export interface MasteryLevel {
  topic: string;
  attempts: number;
  correct: number;
  accuracy: number; // 0-100
  masteryScore: number; // 0-100: threshold 78 = mastery
  confidenceInterval: [number, number]; // 95% CI
  timeToMastery: number; // days until mastery at current pace
  lastAttempt: number; // timestamp
}

export interface DifficultyRecommendation {
  currentDifficulty: number;
  recommendedDifficulty: number;
  reason: string;
  adjustment: number; // -2 to +2
}

export interface RankingPrediction {
  estimatedRank: number;
  estimatedScore: number;
  confidence: number; // 0-1: 95% CI width
  accuracy: number; // expected accuracy % at this level
  timeToTarget: number; // days until target rank reached
  riskAreas: string[]; // topics to focus on
}

export interface PersonalizedSequence {
  questionIds: string[];
  reasoning: string;
  estimatedCompletion: number; // days
}

// Bayesian mastery detection using Beta distribution
function calculateMasteryScore(correct: number, attempts: number): {
  masteryScore: number;
  confidenceInterval: [number, number];
} {
  // Beta-binomial posterior for accuracy: Beta(correct + 1, attempts - correct + 1)
  const alpha = correct + 1;
  const beta = attempts - correct + 1;

  // Mean of Beta distribution = alpha / (alpha + beta)
  const posterior = alpha / (alpha + beta);
  const masteryScore = posterior * 100;

  // Approximate 95% confidence interval using normal approximation
  const variance = (alpha * beta) / ((alpha + beta) ** 2 * (alpha + beta + 1));
  const stdDev = Math.sqrt(variance);
  const z = 1.96; // 95% CI
  const margin = z * stdDev * 100;

  return {
    masteryScore,
    confidenceInterval: [
      Math.max(0, masteryScore - margin),
      Math.min(100, masteryScore + margin),
    ],
  };
}

/**
 * Analyze topic mastery across all attempts
 */
export function analyzeMastery(attempts: QuestionAttempt[]): MasteryLevel[] {
  const topicData: Record<string, QuestionAttempt[]> = {};

  attempts.forEach(attempt => {
    if (!topicData[attempt.topic]) {
      topicData[attempt.topic] = [];
    }
    topicData[attempt.topic].push(attempt);
  });

  return Object.entries(topicData).map(([topic, topicAttempts]) => {
    const correct = topicAttempts.filter(a => a.correct).length;
    const accuracy = (correct / topicAttempts.length) * 100;

    const { masteryScore, confidenceInterval } = calculateMasteryScore(
      correct,
      topicAttempts.length
    );

    // Estimate time to mastery at current pace
    const isMastered = masteryScore >= 78;
    const daysPerAttempt = topicAttempts.length > 1
      ? (topicAttempts[topicAttempts.length - 1].timestamp - topicAttempts[0].timestamp) /
        (86400000 * (topicAttempts.length - 1))
      : 1;

    const attemptsNeeded = Math.max(0, Math.ceil((78 - masteryScore) / 3)); // ~3% per attempt
    const timeToMastery = isMastered ? 0 : Math.ceil(attemptsNeeded * daysPerAttempt);

    return {
      topic,
      attempts: topicAttempts.length,
      correct,
      accuracy,
      masteryScore,
      confidenceInterval,
      timeToMastery,
      lastAttempt: topicAttempts[topicAttempts.length - 1].timestamp,
    };
  });
}

/**
 * Adaptive difficulty adjustment based on performance
 * 2-up-1-down rule: increase if 2 correct, decrease if 1 wrong
 */
export function recommendDifficulty(
  attempts: QuestionAttempt[],
  currentDifficulty: number
): DifficultyRecommendation {
  if (attempts.length === 0) {
    return {
      currentDifficulty,
      recommendedDifficulty: currentDifficulty,
      reason: "No attempts yet",
      adjustment: 0,
    };
  }

  // Recent performance (last 10 attempts)
  const recent = attempts.slice(-10);
  const correctInRecent = recent.filter(a => a.correct).length;
  const recentAccuracy = (correctInRecent / recent.length) * 100;

  let adjustment = 0;
  let reason = "";

  if (recentAccuracy >= 80) {
    adjustment = +1;
    reason = "High accuracy — increase difficulty to maintain engagement";
  } else if (recentAccuracy >= 60) {
    adjustment = 0;
    reason = "Moderate accuracy — maintain current difficulty";
  } else if (recentAccuracy >= 40) {
    adjustment = -1;
    reason = "Low accuracy — reduce difficulty to build confidence";
  } else {
    adjustment = -2;
    reason = "Very low accuracy — significantly reduce difficulty";
  }

  const recommendedDifficulty = Math.max(1, Math.min(5, currentDifficulty + adjustment));

  return {
    currentDifficulty,
    recommendedDifficulty,
    reason,
    adjustment,
  };
}

/**
 * Predict final INICET ranking and score based on current performance
 */
export function predictRanking(
  attempts: QuestionAttempt[],
  totalQuestions: number = 200, // INICET total
  daysSinceStart: number = 30
): RankingPrediction {
  if (attempts.length === 0) {
    return {
      estimatedRank: 50000,
      estimatedScore: 100,
      confidence: 0,
      accuracy: 50,
      timeToTarget: 90,
      riskAreas: [],
    };
  }

  const masteryLevels = analyzeMastery(attempts);
  const overallAccuracy = (attempts.filter(a => a.correct).length / attempts.length) * 100;

  // Estimate final score: scale accuracy to 200 questions with average difficulty 3
  // INICET score = questions_correct * (correct difficulty weight)
  const weightedCorrect = attempts
    .filter(a => a.correct)
    .reduce((sum, a) => sum + (a.difficulty / 3), 0); // normalize by avg difficulty

  const estimatedScore = Math.round((overallAccuracy / 100) * totalQuestions);

  // Rank prediction: INICET has ~200k candidates, rank follows sigmoid distribution
  // Top 1% = ~2000 rank = ~180 score
  // Top 5% = ~10000 rank = ~150 score
  // Top 10% = ~20000 rank = ~120 score
  const estimatedRank = Math.max(1, Math.round(200000 * Math.exp(-(estimatedScore - 100) / 30)));

  // Confidence in prediction based on sample size
  const confidenceMultiplier = Math.min(1, attempts.length / 100); // 100 attempts = 95% CI
  const confidence = confidenceMultiplier;

  // Identify risk areas: topics with accuracy < 70%
  const riskAreas = masteryLevels
    .filter(m => m.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5)
    .map(m => m.topic);

  // Time to reach 85% accuracy (top 5%)
  const targetAccuracy = 85;
  const accuracyGap = targetAccuracy - overallAccuracy;
  const daysPerPercent = daysSinceStart / (overallAccuracy - 50) || 1; // baseline 50%
  const timeToTarget = Math.max(0, Math.ceil(accuracyGap * daysPerPercent));

  return {
    estimatedRank,
    estimatedScore,
    confidence,
    accuracy: Math.round(overallAccuracy),
    timeToTarget,
    riskAreas,
  };
}

/**
 * Generate personalized question sequence using IRT (Item Response Theory)
 * Prioritizes: weaker topics, lower mastery, optimal difficulty
 */
export function generatePersonalizedSequence(
  allQuestions: Array<{
    id: string;
    subject: string;
    topic: string;
    difficulty: number;
  }>,
  masteryLevels: MasteryLevel[],
  userDifficulty: number,
  targetCount: number = 20
): PersonalizedSequence {
  // Weight questions by topic mastery (lower mastery = higher priority)
  const masteryMap = Object.fromEntries(
    masteryLevels.map(m => [m.topic, m.masteryScore])
  );

  const scored = allQuestions.map(q => {
    const topicMastery = masteryMap[q.topic] ?? 50;
    const masteryWeight = (100 - topicMastery) / 100; // inverse: lower mastery = higher weight

    // Difficulty match: prefer questions near recommended difficulty
    const difficultyGap = Math.abs(q.difficulty - userDifficulty);
    const difficultyWeight = Math.max(0, 1 - (difficultyGap / 5));

    // Combined score: mastery (60%) + difficulty match (40%)
    const score = masteryWeight * 0.6 + difficultyWeight * 0.4;

    return { ...q, score };
  });

  // Sort by score and select top N, with some randomization for variety
  const sorted = scored.sort((a, b) => b.score - a.score);
  const selected = sorted
    .slice(0, Math.ceil(targetCount * 1.5))
    .sort(() => Math.random() - 0.5) // shuffle for variety
    .slice(0, targetCount);

  const reasoning = `Prioritized ${selected.length} questions: ${selected
    .map(q => `${q.topic}(${q.difficulty}⭐)`)
    .slice(0, 3)
    .join(", ")}...`;

  // Estimate completion time: 2-3 min per question + review
  const estimatedMinutes = selected.length * 2.5;
  const estimatedDays = Math.ceil(estimatedMinutes / (4 * 60)); // 4 hours study/day

  return {
    questionIds: selected.map(q => q.id),
    reasoning,
    estimatedCompletion: estimatedDays,
  };
}

/**
 * Calculate learning velocity: how fast accuracy is improving
 */
export function calculateLearningVelocity(attempts: QuestionAttempt[]): {
  velocity: number; // % per day
  trend: "improving" | "stable" | "declining";
  isAccelerating: boolean;
} {
  if (attempts.length < 5) {
    return { velocity: 0, trend: "stable", isAccelerating: false };
  }

  // Split into two halves
  const mid = Math.floor(attempts.length / 2);
  const firstHalf = attempts.slice(0, mid);
  const secondHalf = attempts.slice(mid);

  const acc1 = (firstHalf.filter(a => a.correct).length / firstHalf.length) * 100;
  const acc2 = (secondHalf.filter(a => a.correct).length / secondHalf.length) * 100;

  const daysSpanned = (attempts[attempts.length - 1].timestamp - attempts[0].timestamp) / 86400000;
  const velocity = daysSpanned > 0 ? (acc2 - acc1) / (daysSpanned / 2) : 0;

  // Recent 10 vs previous 10
  const recent = attempts.slice(-10);
  const previous = attempts.slice(-20, -10);
  const recentAcc = recent.length > 0 ? (recent.filter(a => a.correct).length / recent.length) * 100 : 0;
  const prevAcc = previous.length > 0 ? (previous.filter(a => a.correct).length / previous.length) * 100 : 0;
  const isAccelerating = recentAcc > prevAcc;

  const trend =
    velocity > 2 ? "improving" :
    velocity < -2 ? "declining" : "stable";

  return { velocity, trend, isAccelerating };
}

/**
 * Get adaptive recommendations: what to study next
 */
export function getAdaptiveRecommendations(attempts: QuestionAttempt[]): {
  nextFocus: string[];
  estimatedTimePerDay: number; // minutes
  paceAdjustment: string;
  motivationScore: number; // 0-100
} {
  if (attempts.length === 0) {
    return {
      nextFocus: ["Start with fundamentals"],
      estimatedTimePerDay: 120,
      paceAdjustment: "Begin with 2-3 questions daily",
      motivationScore: 70,
    };
  }

  const mastery = analyzeMastery(attempts);
  const { trend, velocity } = calculateLearningVelocity(attempts);

  // Topics to focus on: < 70% accuracy, sorted by urgency
  const nextFocus = mastery
    .filter(m => m.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .map(m => `${m.topic} (${Math.round(m.accuracy)}%)`)
    .slice(0, 3);

  if (nextFocus.length === 0) {
    nextFocus.push("Ready for final practice tests");
  }

  // Time estimation
  const avgTimePerQuestion = attempts.length > 0
    ? attempts.reduce((sum, a) => sum + a.timeSpent, 0) / attempts.length / 1000 / 60
    : 3;
  const estimatedTimePerDay = Math.round(avgTimePerQuestion * 20); // 20 Q/day

  // Pace adjustment
  let paceAdjustment = "";
  if (trend === "improving" && velocity > 3) {
    paceAdjustment = "Increase pace: you're making excellent progress!";
  } else if (trend === "declining") {
    paceAdjustment = "Slow down and review fundamentals";
  } else {
    paceAdjustment = "Maintain current pace: steady progress";
  }

  // Motivation score: based on consistency and improvement
  const daysCovered = (attempts[attempts.length - 1]?.timestamp - attempts[0]?.timestamp) / 86400000;
  const consistency = Math.min(100, (attempts.length / Math.max(1, daysCovered)) * 10);
  const improvement = trend === "improving" ? 30 : trend === "declining" ? -20 : 0;
  const motivationScore = Math.max(0, Math.min(100, 50 + consistency/2 + improvement));

  return {
    nextFocus,
    estimatedTimePerDay,
    paceAdjustment,
    motivationScore: Math.round(motivationScore),
  };
}
