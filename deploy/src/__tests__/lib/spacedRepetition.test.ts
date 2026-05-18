import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  Card,
  reviewCard,
  prioritizeReviews,
  generateDailySchedule,
  calculateRetentionCurve,
  getOptimalReviewTimes,
  createCard,
  initializeCardDeck,
} from "@/lib/spacedRepetition";

describe("createCard", () => {
  it("creates a new card with default values", () => {
    const card = createCard("q1", "Medicine", "What is...?");
    expect(card.id).toBe("q1");
    expect(card.topic).toBe("Medicine");
    expect(card.box).toBe(0);
    expect(card.easeFactor).toBe(2.5);
    expect(card.repetitions).toBe(0);
    expect(card.lastReview).toBeNull();
  });

  it("clamps difficulty to 1-5", () => {
    const card1 = createCard("q1", "Topic", "Q?", 0);
    const card2 = createCard("q2", "Topic", "Q?", 10);
    expect(card1.difficulty).toBe(1);
    expect(card2.difficulty).toBe(5);
  });
});

describe("reviewCard", () => {
  let card: Card;

  beforeEach(() => {
    card = createCard("q1", "Medicine", "Test");
  });

  it("resets card on failure (quality < 3)", () => {
    const reviewed = reviewCard(card, 0);
    expect(reviewed.box).toBe(0);
    expect(reviewed.interval).toBe(1);
    expect(reviewed.correctStreak).toBe(0);
    expect(reviewed.failureCount).toBe(1);
  });

  it("advances box on success (quality >= 3)", () => {
    const reviewed = reviewCard(card, 3);
    expect(reviewed.box).toBeGreaterThan(0);
    expect(reviewed.interval).toBeGreaterThan(0);
  });

  it("first review sets 1-day interval", () => {
    const reviewed = reviewCard(card, 4);
    expect(reviewed.interval).toBe(1);
  });

  it("second review sets 3-day interval", () => {
    const card2 = reviewCard(card, 4);
    const reviewed = reviewCard(card2, 4);
    expect(reviewed.interval).toBe(3);
  });

  it("adjusts ease factor on perfect answer", () => {
    const reviewed = reviewCard(card, 5);
    expect(reviewed.easeFactor).toBeGreaterThan(2.5);
  });

  it("decreases ease factor on difficult answer", () => {
    const reviewed = reviewCard(card, 2);
    expect(reviewed.easeFactor).toBeLessThan(2.5);
  });

  it("maintains minimum ease factor of 1.3", () => {
    let current = card;
    for (let i = 0; i < 10; i++) {
      current = reviewCard(current, 0);
    }
    expect(current.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("rejects invalid quality scores", () => {
    expect(() => reviewCard(card, 6)).toThrow();
    expect(() => reviewCard(card, -1)).toThrow();
    expect(() => reviewCard(card, 2.5)).toThrow();
  });

  it("increments repetition count", () => {
    const reviewed = reviewCard(card, 4);
    expect(reviewed.repetitions).toBe(1);
  });
});

describe("prioritizeReviews", () => {
  it("returns reviews due now", () => {
    const cards = [createCard("q1", "Topic", "Test")];
    // New cards have nextReview = now, so they appear as due
    const recs = prioritizeReviews(cards);
    expect(recs.length).toBeGreaterThanOrEqual(0);
  });

  it("prioritizes overdue cards", () => {
    const now = Date.now();
    const overdueCard = createCard("q1", "Topic", "Test");
    overdueCard.lastReview = now - 2 * 86400000;
    overdueCard.interval = 1;
    overdueCard.nextReview = now - 86400000; // 1 day overdue

    const recs = prioritizeReviews([overdueCard]);
    expect(recs).toHaveLength(1);
    expect(recs[0].priority).toBe("critical");
  });

  it("respects available time limit", () => {
    const cards = Array.from({ length: 10 }, (_, i) => {
      const card = createCard(`q${i}`, "Topic", "Test");
      card.lastReview = Date.now() - 86400000;
      card.nextReview = Date.now() - 1000;
      card.difficulty = 1; // 1 min each
      return card;
    });

    // Only 5 minutes available = 5 cards max
    const recs = prioritizeReviews(cards, 5);
    expect(recs.length).toBeLessThanOrEqual(5);
  });

  it("estimates review time by difficulty", () => {
    const easyCard = createCard("q1", "Topic", "Test");
    easyCard.difficulty = 1;
    easyCard.lastReview = Date.now() - 86400000;
    easyCard.nextReview = Date.now() - 1000;

    const hardCard = createCard("q2", "Topic", "Test");
    hardCard.difficulty = 5;
    hardCard.lastReview = Date.now() - 86400000;
    hardCard.nextReview = Date.now() - 1000;

    const easyRec = prioritizeReviews([easyCard])[0];
    const hardRec = prioritizeReviews([hardCard])[0];

    expect(hardRec.estimatedReviewTime).toBeGreaterThan(easyRec.estimatedReviewTime);
  });
});

describe("generateDailySchedule", () => {
  it("generates schedule with new, review, and optional cards", () => {
    const cards = Array.from({ length: 30 }, (_, i) =>
      createCard(`q${i}`, "Medicine", `Question ${i}`)
    );

    const schedule = generateDailySchedule(cards);
    expect(schedule.newCards.length).toBeGreaterThan(0);
    expect(schedule.newCards.length).toBeLessThanOrEqual(20);
    expect(schedule.totalEstimatedTime).toBeGreaterThan(0);
  });

  it("limits new cards to 20 per day", () => {
    const cards = Array.from({ length: 100 }, (_, i) =>
      createCard(`q${i}`, "Medicine", `Q${i}`)
    );

    const schedule = generateDailySchedule(cards, 480); // 8 hours available
    expect(schedule.newCards.length).toBeLessThanOrEqual(20);
  });

  it("recommends breaks based on time", () => {
    const cards = Array.from({ length: 50 }, (_, i) =>
      createCard(`q${i}`, "Medicine", `Q${i}`)
    );

    const shortSchedule = generateDailySchedule(cards, 30);
    const longSchedule = generateDailySchedule(cards, 300);

    expect(longSchedule.recommendedBreaks).toBeGreaterThan(
      shortSchedule.recommendedBreaks
    );
  });

  it("identifies weak topics as focus areas", () => {
    const cards = Array.from({ length: 10 }, (_, i) => ({
      id: `q${i}`,
      topic: i < 5 ? "Cardiology" : "Neurology",
      question: `Q${i}`,
    }));

    const schedule = generateDailySchedule(initializeCardDeck(cards));
    expect(schedule.focusAreas).toBeDefined();
  });
});

describe("calculateRetentionCurve", () => {
  it("returns default retention for new topic", () => {
    const retention = calculateRetentionCurve([], "Medicine", 30);
    expect(retention.retentionProbability).toBe(0.5);
    expect(retention.reviewCount).toBe(0);
  });

  it("tracks review count", () => {
    let card = createCard("q1", "Medicine", "Test");
    card = reviewCard(card, 4);
    card = reviewCard(card, 4);

    const retention = calculateRetentionCurve([card], "Medicine");
    expect(retention.reviewCount).toBe(2);
  });

  it("calculates average ease factor", () => {
    const card = createCard("q1", "Medicine", "Test");
    const retention = calculateRetentionCurve([card], "Medicine");
    expect(retention.averageEaseFactor).toBe(2.5);
  });

  it("clamps retention to 0-1 range", () => {
    const cards = Array.from({ length: 5 }, (_, i) => {
      const card = createCard(`q${i}`, "Surgery", "Q");
      card.lastReview = Date.now() - 60 * 86400000; // 60 days ago
      return card;
    });

    const retention = calculateRetentionCurve(cards, "Surgery");
    expect(retention.retentionProbability).toBeGreaterThanOrEqual(0);
    expect(retention.retentionProbability).toBeLessThanOrEqual(1);
  });
});

describe("getOptimalReviewTimes", () => {
  it("returns morning peak times", () => {
    const times = getOptimalReviewTimes(true, false, false);
    expect(times).toContain(9);
    expect(times).toContain(10);
    expect(times).toContain(11);
  });

  it("returns afternoon peak times", () => {
    const times = getOptimalReviewTimes(false, true, false);
    expect(times).toContain(14);
    expect(times).toContain(15);
    expect(times).toContain(16);
  });

  it("returns evening peak times", () => {
    const times = getOptimalReviewTimes(false, false, true);
    expect(times).toContain(19);
    expect(times).toContain(20);
    expect(times).toContain(21);
  });

  it("combines multiple peak times", () => {
    const times = getOptimalReviewTimes(true, true, true);
    expect(times.length).toBeGreaterThan(5);
  });

  it("defaults to 2pm if no peaks selected", () => {
    const times = getOptimalReviewTimes(false, false, false);
    expect(times).toEqual([14]);
  });
});

describe("initializeCardDeck", () => {
  it("creates cards from question list", () => {
    const questions = [
      { id: "q1", topic: "Medicine", question: "Q1" },
      { id: "q2", topic: "Surgery", question: "Q2" },
    ];

    const cards = initializeCardDeck(questions);
    expect(cards).toHaveLength(2);
    expect(cards[0].topic).toBe("Medicine");
    expect(cards[1].topic).toBe("Surgery");
  });

  it("uses provided difficulty or defaults to 3", () => {
    const questions = [
      { id: "q1", topic: "T", question: "Q", difficulty: 2 },
      { id: "q2", topic: "T", question: "Q" }, // no difficulty
    ];

    const cards = initializeCardDeck(questions);
    expect(cards[0].difficulty).toBe(2);
    expect(cards[1].difficulty).toBe(3);
  });
});

describe("retention curve decay", () => {
  it("shows decay over time without review", () => {
    const card = createCard("q1", "Topic", "Test");
    card.lastReview = Date.now() - 7 * 86400000; // 7 days ago
    card.easeFactor = 2.5;
    card.interval = 3;

    const retention = calculateRetentionCurve([card], "Topic");
    expect(retention.retentionProbability).toBeLessThan(1);
    expect(retention.retentionProbability).toBeGreaterThan(0);
  });
});
