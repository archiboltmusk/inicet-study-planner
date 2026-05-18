import React from "react";
import { TrendingUp, Target, Zap, AlertCircle } from "lucide-react";
import { useAdaptiveLearning } from "@/lib/useAdaptiveLearning";
import { QuestionAttempt } from "@/lib/adaptiveLearning";

interface AdaptiveDashboardProps {
  attempts: QuestionAttempt[];
  currentDifficulty: number;
  allQuestions?: Array<{ id: string; subject: string; topic: string; difficulty: number }>;
  onDifficultyChange?: (difficulty: number) => void;
}

export function AdaptiveDashboard({
  attempts,
  currentDifficulty,
  allQuestions = [],
  onDifficultyChange,
}: AdaptiveDashboardProps) {
  const adaptive = useAdaptiveLearning({
    attempts,
    currentDifficulty,
    allQuestions,
    enabled: attempts.length > 0,
  });

  if (adaptive.isLoading) {
    return <div className="p-4 text-center text-gray-500">Analyzing your performance...</div>;
  }

  if (adaptive.error) {
    return <div className="p-4 text-center text-red-500">Error: {adaptive.error.message}</div>;
  }

  return (
    <div className="space-y-4">
      {/* Ranking Prediction */}
      {adaptive.rankingPrediction && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Predicted INICET Rank</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-blue-700 mb-1">Estimated Rank</p>
              <p className="text-2xl font-bold text-blue-900">
                #{adaptive.rankingPrediction.estimatedRank.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700 mb-1">Expected Score</p>
              <p className="text-2xl font-bold text-blue-900">
                {adaptive.rankingPrediction.estimatedScore}/200
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-700 mb-1">Confidence</p>
              <p className="text-2xl font-bold text-blue-900">
                {Math.round(adaptive.rankingPrediction.confidence * 100)}%
              </p>
            </div>
          </div>
          {adaptive.rankingPrediction.riskAreas.length > 0 && (
            <div className="mt-3 p-3 bg-white bg-opacity-60 rounded text-sm">
              <p className="font-medium text-blue-900 mb-1">Focus areas:</p>
              <p className="text-blue-800">{adaptive.rankingPrediction.riskAreas.join(", ")}</p>
            </div>
          )}
        </div>
      )}

      {/* Learning Velocity */}
      {adaptive.learningVelocity && (
        <div
          className={`p-4 rounded-lg border-2 ${
            adaptive.learningVelocity.trend === "improving"
              ? "bg-green-50 border-green-200"
              : adaptive.learningVelocity.trend === "declining"
              ? "bg-red-50 border-red-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">Learning Velocity</h3>
          </div>
          <p className="text-lg font-bold">
            {adaptive.learningVelocity.velocity.toFixed(1)}% per day{" "}
            {adaptive.learningVelocity.isAccelerating && "🚀"}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Trend: <span className="capitalize font-medium">{adaptive.learningVelocity.trend}</span>
          </p>
        </div>
      )}

      {/* Difficulty Recommendation */}
      {adaptive.difficultyRecommendation && (
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Difficulty Adjustment</h3>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-purple-700 mb-1">Current</p>
              <p className="text-xl font-bold text-purple-900">
                {"⭐".repeat(adaptive.difficultyRecommendation.currentDifficulty)}
              </p>
            </div>
            <div className="text-2xl text-purple-600">→</div>
            <div>
              <p className="text-sm text-purple-700 mb-1">Recommended</p>
              <p className="text-xl font-bold text-purple-900">
                {"⭐".repeat(adaptive.difficultyRecommendation.recommendedDifficulty)}
              </p>
            </div>
          </div>
          <p className="text-sm text-purple-700 mt-3">{adaptive.difficultyRecommendation.reason}</p>
          {onDifficultyChange && (
            <button
              onClick={() =>
                onDifficultyChange(adaptive.difficultyRecommendation!.recommendedDifficulty)
              }
              className="mt-3 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
            >
              Apply Recommendation
            </button>
          )}
        </div>
      )}

      {/* Recommendations */}
      {adaptive.recommendations && (
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-indigo-900">Next Steps</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-indigo-700 mb-1">Focus Areas:</p>
              <ul className="list-disc list-inside space-y-1">
                {adaptive.recommendations.nextFocus.map((focus, i) => (
                  <li key={i} className="text-sm text-indigo-800">
                    {focus}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-indigo-700">
                <span className="font-medium">Daily study time:</span>{" "}
                {adaptive.recommendations.estimatedTimePerDay} minutes
              </p>
            </div>
            <div className="p-2 bg-white bg-opacity-60 rounded text-sm text-indigo-900">
              <p>💡 {adaptive.recommendations.paceAdjustment}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="text-xs font-medium text-indigo-700 mb-1">Motivation</div>
                <div className="w-full bg-indigo-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${adaptive.recommendations.motivationScore}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-bold text-indigo-900">
                {adaptive.recommendations.motivationScore}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mastery Levels */}
      {adaptive.masteryLevels.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Topic Mastery</h3>
          <div className="space-y-2">
            {adaptive.masteryLevels.slice(0, 5).map(level => (
              <div key={level.topic} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{level.topic}</span>
                    <span className="text-xs text-gray-600">{Math.round(level.accuracy)}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        level.masteryScore >= 78
                          ? "bg-green-500"
                          : level.masteryScore >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${level.masteryScore}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
