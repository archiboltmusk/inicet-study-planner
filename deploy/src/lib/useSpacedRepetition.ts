import { useEffect, useState, useCallback } from "react";
import {
  Card,
  DailySchedule,
  SchedulingRecommendation,
  reviewCard,
  generateDailySchedule,
  prioritizeReviews,
  createCard,
  initializeCardDeck,
} from "./spacedRepetition";

export interface UseSpacedRepetitionOptions {
  cards: Card[];
  availableTimeMinutes?: number;
  date?: string;
  enabled?: boolean;
}

/**
 * React hook for spaced repetition state management
 */
export function useSpacedRepetition(
  options: UseSpacedRepetitionOptions
) {
  const {
    cards,
    availableTimeMinutes = 240,
    date = new Date().toISOString().split("T")[0],
    enabled = true,
  } = options;

  const [schedule, setSchedule] = useState<DailySchedule | null>(null);
  const [priorities, setPriorities] = useState<SchedulingRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateSchedule = useCallback(() => {
    if (!enabled || cards.length === 0) return;

    try {
      setLoading(true);
      setError(null);

      const newSchedule = generateDailySchedule(cards, availableTimeMinutes, date);
      const newPriorities = prioritizeReviews(cards, availableTimeMinutes);

      setSchedule(newSchedule);
      setPriorities(newPriorities);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [cards, availableTimeMinutes, date, enabled]);

  useEffect(() => {
    updateSchedule();
  }, [updateSchedule]);

  const reviewCardAndUpdate = useCallback(
    (cardId: string, quality: number) => {
      const cardIndex = cards.findIndex(c => c.id === cardId);
      if (cardIndex === -1) return;

      const updatedCard = reviewCard(cards[cardIndex], quality);
      const newCards = [...cards];
      newCards[cardIndex] = updatedCard;

      // Trigger re-schedule
      const newSchedule = generateDailySchedule(newCards, availableTimeMinutes, date);
      setSchedule(newSchedule);
    },
    [cards, availableTimeMinutes, date]
  );

  const addCards = useCallback(
    (newQuestions: Array<{ id: string; topic: string; question: string; difficulty?: number }>) => {
      const newCards = initializeCardDeck(newQuestions);
      return [...cards, ...newCards];
    },
    [cards]
  );

  return {
    schedule,
    priorities,
    loading,
    error,
    reviewCard: reviewCardAndUpdate,
    addCards,
    updateSchedule,
  };
}
