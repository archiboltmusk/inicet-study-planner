import { describe, it, expect } from "vitest";
import {
  analyzeMastery,
  recommendDifficulty,
  predictRanking,
  generatePersonalizedSequence,
  calculateLearningVelocity,
  getAdaptiveRecommendations,
  QuestionAttempt,
} from "@/lib/adaptiveLearning";

describe("analyzeMastery", () => {
  it("calculates mastery score from attempts", () => {
    const attempts: QuestionAttempt[] = [
      {
        questionId: "q1",
        subject: "Medicine",
        topic: "Cardiology",
        difficulty: 3,
        answered: true,
        correct: true,
        timeSpent: 120000,
        timestamp: Date.now() - 86400000,
      },
      {
        questionId: "q2",
        subject: "Medicine",
        topic: "Cardiology",
        difficulty: 3,
        answered: true,
        correct: true,
        timeSpent: 110000,
        timestamp: Date.now(),
      },
    ];

    const mastery = analyzeMastery(attempts);
    expect(mastery).toHaveLength(1);
    expect(mastery[0].topic).toBe("Cardiology");
    expect(mastery[0].attempts).toBe(2);
    expect(mastery[0].correct).toBe(2);
    expect(mastery[0].accuracy).toBe(100);
    expect(mastery[0].masteryScore).toBeGreaterThanOrEqual(75);
  });

  it("handles mixed correct/incorrect answers", () => {
    const attempts: QuestionAttempt[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Surgery",
      topic: "Orthopedics",
      difficulty: 3,
      answered: true,
      correct: i < 6, // 60% correct
      timeSpent: 120000,
      timestamp: Date.now() - (9 - i) * 86400000,
    }));

    const mastery = analyzeMastery(attempts);
    expect(mastery[0].accuracy).toBe(60);
    expect(mastery[0].masteryScore).toBeLessThan(78); // Below mastery
  });

  it("calculates time to mastery", () => {
    const attempts: QuestionAttempt[] = Array.from({ length: 5 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Pathology",
      topic: "General",
      difficulty: 3,
      answered: true,
      correct: i < 3, // 60% accuracy
      timeSpent: 120000,
      timestamp: Date.now() - (4 - i) * 86400000,
    }));

    const mastery = analyzeMastery(attempts);
    expect(mastery[0].timeToMastery).toBeGreaterThan(0);
  });

  it("treats already-mastered topics as 0 days to mastery", () => {
    const attempts: QuestionAttempt[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Pharmacology",
      topic: "Antibiotics",
      difficulty: 3,
      answered: true,
      correct: true,
      timeSpent: 120000,
      timestamp: Date.now() - (9 - i) * 86400000,
    }));

    const mastery = analyzeMastery(attempts);
    expect(mastery[0].masteryScore).toBeGreaterThan(78);
    expect(mastery[0].timeToMastery).toBe(0);
  });
});

describe("recommendDifficulty", () => {
  it("increases difficulty on high accuracy", () => {
    const attempts: QuestionAttempt[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Medicine",
      topic: "Test",
      difficulty: 2,
      answered: true,
      correct: i < 9, // 90% accuracy
      timeSpent: 120000,
      timestamp: Date.now(),
    }));

    const rec = recommendDifficulty(attempts, 2);
    expect(rec.adjustment).toBeGreaterThan(0);
    expect(rec.recommendedDifficulty).toBeGreaterThan(2);
  });

  it("decreases difficulty on low accuracy", () => {
    const attempts: QuestionAttempt[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Medicine",
      topic: "Test",
      difficulty: 4,
      answered: true,
      correct: i < 2, // 20% accuracy
      timeSpent: 120000,
      timestamp: Date.now(),
    }));

    const rec = recommendDifficulty(attempts, 4);
    expect(rec.adjustment).toBeLessThan(0);
    expect(rec.recommendedDifficulty).toBeLessThan(4);
  });

  it("maintains difficulty on moderate accuracy", () => {
    const attempts: QuestionAttempt[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Medicine",
      topic: "Test",
      difficulty: 3,
      answered: true,
      correct: i < 7, // 70% accuracy
      timeSpent: 120000,
      timestamp: Date.now(),
    }));

    const rec = recommendDifficulty(attempts, 3);
    expect(rec.adjustment).toBe(0);
    expect(rec.recommendedDifficulty).toBe(3);
  });

  it("clamps difficulty to 1-5 range", () => {
    const attempts: QuestionAttempt[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Medicine",
      topic: "Test",
      difficulty: 5,
      answered: true,
      correct: true,
      timeSpent: 120000,
      timestamp: Date.now(),
    }));

    const rec = recommendDifficulty(attempts, 5);
    expect(rec.recommendedDifficulty).toBeLessThanOrEqual(5);
    expect(rec.recommendedDifficulty).toBeGreaterThanOrEqual(1);
  });
});

describe("predictRanking", () => {
  it("estimates rank from accuracy", () => {
    const attempts: QuestionAttempt[] = Array.from({ length: 50 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Medicine",
      topic: "Topic" + Math.floor(i / 5),
      difficulty: 3,
      answered: true,
      correct: i < 40, // 80% accuracy
      timeSpent: 120000,
      timestamp: Date.now() - (49 - i) * 86400000,
    }));

    const pred = predictRanking(attempts, 200, 50);
    expect(pred.estimatedScore).toBeGreaterThan(100);
    expect(pred.estimatedRank).toBeGreaterThan(0);
    expect(pred.confidence).toBeGreaterThan(0);
  });

  it("identifies risk areas with low accuracy", () => {
    const attempts: QuestionAttempt[] = [
      ...Array.from({ length: 20 }, (_, i) => ({
        questionId: `q1-${i}`,
        subject: "Medicine",
        topic: "Cardiology",
        difficulty: 3,
        answered: true,
        correct: true, // 100% correct
        timeSpent: 120000,
        timestamp: Date.now() - (19 - i) * 86400000,
      })),
      ...Array.from({ length: 20 }, (_, i) => ({
        questionId: `q2-${i}`,
        subject: "Medicine",
        topic: "Neurology",
        difficulty: 3,
        answered: true,
        correct: i < 5, // 25% correct
        timeSpent: 120000,
        timestamp: Date.now() - (19 - i) * 86400000,
      })),
    ];

    const pred = predictRanking(attempts);
    expect(pred.riskAreas).toContain("Neurology");
  });

  it("provides higher confidence with more attempts", () => {
    const smallSet: QuestionAttempt[] = Array.from({ length: 10 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Medicine",
      topic: "Test",
      difficulty: 3,
      answered: true,
      correct: i < 7,
      timeSpent: 120000,
      timestamp: Date.now(),
    }));

    const largeSet: QuestionAttempt[] = Array.from({ length: 100 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Medicine",
      topic: "Test",
      difficulty: 3,
      answered: true,
      correct: i < 70,
      timeSpent: 120000,
      timestamp: Date.now() - (99 - i) * 86400000,
    }));

    const smallPred = predictRanking(smallSet);
    const largePred = predictRanking(largeSet);
    expect(largePred.confidence).toBeGreaterThan(smallPred.confidence);
  });
});

describe("generatePersonalizedSequence", () => {
  it("prioritizes weaker topics", () => {
    const questions = [
      { id: "q1", subject: "Med", topic: "Cardiology", difficulty: 3 },
      { id: "q2", subject: "Med", topic: "Neurology", difficulty: 3 },
    ];

    const mastery = [
      {
        topic: "Cardiology",
        attempts: 10,
        correct: 9,
        accuracy: 90,
        masteryScore: 85,
        confidenceInterval: [80, 90] as [number, number],
        timeToMastery: 0,
        lastAttempt: Date.now(),
      },
      {
        topic: "Neurology",
        attempts: 10,
        correct: 5,
        accuracy: 50,
        masteryScore: 45,
        confidenceInterval: [35, 55] as [number, number],
        timeToMastery: 5,
        lastAttempt: Date.now(),
      },
    ];

    const seq = generatePersonalizedSequence(questions, mastery, 3, 2);
    expect(seq.questionIds).toContain("q2"); // Neurology (weaker)
  });

  it("matches difficulty preference", () => {
    const questions = [
      { id: "q1", subject: "Med", topic: "Test1", difficulty: 2 },
      { id: "q2", subject: "Med", topic: "Test2", difficulty: 4 },
    ];

    const mastery = [];
    const seq = generatePersonalizedSequence(questions, mastery, 2, 2);
    expect(seq.questionIds.length).toBeGreaterThan(0);
  });

  it("estimates completion time", () => {
    const questions = Array.from({ length: 20 }, (_, i) => ({
      id: `q${i}`,
      subject: "Med",
      topic: `Topic${i}`,
      difficulty: 3,
    }));

    const seq = generatePersonalizedSequence(questions, [], 3, 20);
    expect(seq.estimatedCompletion).toBeGreaterThan(0);
  });
});

describe("calculateLearningVelocity", () => {
  it("shows improvement trend", () => {
    const attempts: QuestionAttempt[] = [
      ...Array.from({ length: 5 }, (_, i) => ({
        questionId: `q${i}`,
        subject: "Med",
        topic: "Test",
        difficulty: 3,
        answered: true,
        correct: i < 2, // 40% in first half
        timeSpent: 120000,
        timestamp: Date.now() - (9 - i) * 86400000,
      })),
      ...Array.from({ length: 5 }, (_, i) => ({
        questionId: `q${i + 5}`,
        subject: "Med",
        topic: "Test",
        difficulty: 3,
        answered: true,
        correct: i < 4, // 80% in second half
        timeSpent: 120000,
        timestamp: Date.now() - (4 - i) * 86400000,
      })),
    ];

    const vel = calculateLearningVelocity(attempts);
    expect(vel.trend).toBe("improving");
  });

  it("detects acceleration", () => {
    const attempts: QuestionAttempt[] = [
      ...Array.from({ length: 10 }, (_, i) => ({
        questionId: `q${i}`,
        subject: "Med",
        topic: "Test",
        difficulty: 3,
        answered: true,
        correct: i < 5, // 50% baseline
        timeSpent: 120000,
        timestamp: Date.now() - (19 - i) * 86400000,
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        questionId: `q${i + 10}`,
        subject: "Med",
        topic: "Test",
        difficulty: 3,
        answered: true,
        correct: i < 9, // 90% recent
        timeSpent: 120000,
        timestamp: Date.now() - (9 - i) * 86400000,
      })),
    ];

    const vel = calculateLearningVelocity(attempts);
    expect(vel.isAccelerating).toBe(true);
  });
});

describe("getAdaptiveRecommendations", () => {
  it("recommends weaker topics as next focus", () => {
    const attempts: QuestionAttempt[] = [
      ...Array.from({ length: 10 }, (_, i) => ({
        questionId: `q1-${i}`,
        subject: "Med",
        topic: "Cardiology",
        difficulty: 3,
        answered: true,
        correct: true,
        timeSpent: 180000,
        timestamp: Date.now() - (9 - i) * 86400000,
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        questionId: `q2-${i}`,
        subject: "Med",
        topic: "Neurology",
        difficulty: 3,
        answered: true,
        correct: i < 5, // 50% accuracy
        timeSpent: 180000,
        timestamp: Date.now() - (9 - i) * 86400000,
      })),
    ];

    const rec = getAdaptiveRecommendations(attempts);
    expect(rec.nextFocus.length).toBeGreaterThan(0);
    expect(rec.estimatedTimePerDay).toBeGreaterThan(0);
  });

  it("provides motivation score", () => {
    const attempts: QuestionAttempt[] = Array.from({ length: 20 }, (_, i) => ({
      questionId: `q${i}`,
      subject: "Med",
      topic: "Test",
      difficulty: 3,
      answered: true,
      correct: i < 14, // 70% accuracy
      timeSpent: 180000,
      timestamp: Date.now() - (19 - i) * 86400000,
    }));

    const rec = getAdaptiveRecommendations(attempts);
    expect(rec.motivationScore).toBeGreaterThanOrEqual(0);
    expect(rec.motivationScore).toBeLessThanOrEqual(100);
  });

  it("handles empty attempt list", () => {
    const rec = getAdaptiveRecommendations([]);
    expect(rec.nextFocus).toContain("Start with fundamentals");
    expect(rec.motivationScore).toBeGreaterThan(0);
  });
});
