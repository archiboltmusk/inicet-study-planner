import { useEffect, useState, useCallback } from "react";
import {
  analyzeMastery,
  recommendDifficulty,
  predictRanking,
  generatePersonalizedSequence,
  getAdaptiveRecommendations,
  calculateLearningVelocity,
  QuestionAttempt,
  MasteryLevel,
  DifficultyRecommendation,
  RankingPrediction,
  PersonalizedSequence,
} from "./adaptiveLearning";

export interface AdaptiveLearningState {
  isLoading: boolean;
  masteryLevels: MasteryLevel[];
  difficultyRecommendation: DifficultyRecommendation | null;
  rankingPrediction: RankingPrediction | null;
  recommendedSequence: PersonalizedSequence | null;
  recommendations: ReturnType<typeof getAdaptiveRecommendations> | null;
  learningVelocity: ReturnType<typeof calculateLearningVelocity> | null;
  error: Error | null;
}

export interface UseAdaptiveLearningOptions {
  attempts: QuestionAttempt[];
  currentDifficulty: number;
  allQuestions?: Array<{ id: string; subject: string; topic: string; difficulty: number }>;
  totalQuestions?: number;
  daysSinceStart?: number;
  enabled?: boolean;
}

/**
 * React hook for adaptive learning state management
 */
export function useAdaptiveLearning(
  options: UseAdaptiveLearningOptions
): AdaptiveLearningState & {
  updateDifficulty: (newDifficulty: number) => void;
  regenerateSequence: (count?: number) => void;
} {
  const {
    attempts,
    currentDifficulty,
    allQuestions = [],
    totalQuestions = 200,
    daysSinceStart = 30,
    enabled = true,
  } = options;

  const [state, setState] = useState<AdaptiveLearningState>({
    isLoading: false,
    masteryLevels: [],
    difficultyRecommendation: null,
    rankingPrediction: null,
    recommendedSequence: null,
    recommendations: null,
    learningVelocity: null,
    error: null,
  });

  const computeAnalytics = useCallback(() => {
    if (!enabled || attempts.length === 0) return;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const mastery = analyzeMastery(attempts);
      const difficulty = recommendDifficulty(attempts, currentDifficulty);
      const ranking = predictRanking(attempts, totalQuestions, daysSinceStart);
      const velocity = calculateLearningVelocity(attempts);
      const recs = getAdaptiveRecommendations(attempts);

      let sequence: PersonalizedSequence | null = null;
      if (allQuestions.length > 0) {
        sequence = generatePersonalizedSequence(
          allQuestions,
          mastery,
          currentDifficulty,
          20
        );
      }

      setState({
        isLoading: false,
        masteryLevels: mastery,
        difficultyRecommendation: difficulty,
        rankingPrediction: ranking,
        recommendedSequence: sequence,
        recommendations: recs,
        learningVelocity: velocity,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      }));
    }
  }, [attempts, currentDifficulty, allQuestions, totalQuestions, daysSinceStart, enabled]);

  useEffect(() => {
    computeAnalytics();
  }, [computeAnalytics]);

  const updateDifficulty = useCallback((newDifficulty: number) => {
    const difficulty = recommendDifficulty(attempts, newDifficulty);
    setState(prev => ({
      ...prev,
      difficultyRecommendation: difficulty,
    }));
  }, [attempts]);

  const regenerateSequence = useCallback((count = 20) => {
    if (allQuestions.length === 0) return;

    const sequence = generatePersonalizedSequence(
      allQuestions,
      state.masteryLevels,
      currentDifficulty,
      count
    );
    setState(prev => ({
      ...prev,
      recommendedSequence: sequence,
    }));
  }, [allQuestions, state.masteryLevels, currentDifficulty]);

  return {
    ...state,
    updateDifficulty,
    regenerateSequence,
  };
}
