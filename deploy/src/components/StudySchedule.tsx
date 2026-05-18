import React from "react";
import { Calendar, Clock, BookOpen, AlertCircle, Zap } from "lucide-react";
import { useSpacedRepetition } from "@/lib/useSpacedRepetition";
import { Card } from "@/lib/spacedRepetition";

interface StudyScheduleProps {
  cards: Card[];
  availableTimeMinutes?: number;
  onCardReview?: (cardId: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
}

export function StudySchedule({
  cards,
  availableTimeMinutes = 240,
  onCardReview,
}: StudyScheduleProps) {
  const { schedule, priorities, loading, error } = useSpacedRepetition({
    cards,
    availableTimeMinutes,
    enabled: cards.length > 0,
  });

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Generating schedule...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  if (!schedule) {
    return <div className="p-4 text-center text-gray-500">No schedule available</div>;
  }

  return (
    <div className="space-y-4">
      {/* Schedule Overview */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Today's Schedule</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className="text-xs text-blue-700 uppercase font-semibold">New Cards</p>
            <p className="text-2xl font-bold text-blue-900">{schedule.newCards.length}</p>
          </div>
          <div>
            <p className="text-xs text-blue-700 uppercase font-semibold">Reviews Due</p>
            <p className="text-2xl font-bold text-blue-900">{schedule.reviewCards.length}</p>
          </div>
          <div>
            <p className="text-xs text-blue-700 uppercase font-semibold">Estimated Time</p>
            <p className="text-2xl font-bold text-blue-900">{schedule.totalEstimatedTime}m</p>
          </div>
          <div>
            <p className="text-xs text-blue-700 uppercase font-semibold">Breaks</p>
            <p className="text-2xl font-bold text-blue-900">{schedule.recommendedBreaks}</p>
          </div>
        </div>
      </div>

      {/* Focus Areas */}
      {schedule.focusAreas.length > 0 && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-amber-900">Focus Areas Today</h3>
          </div>
          <p className="text-sm text-amber-800">
            Prioritize: <span className="font-medium">{schedule.focusAreas.join(", ")}</span>
          </p>
        </div>
      )}

      {/* New Cards Section */}
      {schedule.newCards.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">New Cards ({schedule.newCards.length})</h3>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {schedule.newCards.slice(0, 10).map(card => (
              <div
                key={card.id}
                className="p-3 bg-white rounded border border-green-200 text-sm hover:bg-green-50 transition"
              >
                <div className="font-medium text-gray-900">{card.topic}</div>
                <div className="text-gray-600 text-xs mt-1 truncate">{card.question}</div>
                <div className="text-xs text-green-700 mt-1">Est. 3 min</div>
              </div>
            ))}
            {schedule.newCards.length > 10 && (
              <p className="text-xs text-gray-500 p-2">
                +{schedule.newCards.length - 10} more cards
              </p>
            )}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {schedule.reviewCards.length > 0 && (
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-purple-900">Due for Review ({schedule.reviewCards.length})</h3>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {schedule.reviewCards.slice(0, 10).map(card => (
              <div
                key={card.id}
                className="p-3 bg-white rounded border border-purple-200 text-sm hover:bg-purple-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{card.topic}</div>
                    <div className="text-gray-600 text-xs mt-1 truncate">{card.question}</div>
                    <div className="text-xs text-purple-700 mt-1">
                      {card.interval} day interval • {card.repetitions} reviews
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-purple-900 ml-2">
                    {"⭐".repeat(card.difficulty)}
                  </div>
                </div>
                {onCardReview && (
                  <div className="flex gap-1 mt-2">
                    <button
                      onClick={() => onCardReview(card.id, 0)}
                      className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Failed
                    </button>
                    <button
                      onClick={() => onCardReview(card.id, 3)}
                      className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                    >
                      OK
                    </button>
                    <button
                      onClick={() => onCardReview(card.id, 5)}
                      className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                    >
                      Perfect
                    </button>
                  </div>
                )}
              </div>
            ))}
            {schedule.reviewCards.length > 10 && (
              <p className="text-xs text-gray-500 p-2">
                +{schedule.reviewCards.length - 10} more cards
              </p>
            )}
          </div>
        </div>
      )}

      {/* Optional Cards */}
      {schedule.optionalCards.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Optional Extra Practice</h3>
          <p className="text-sm text-gray-600 mb-3">
            {schedule.optionalCards.length} cards available if you have extra time
          </p>
          <div className="space-y-2">
            {schedule.optionalCards.map(card => (
              <div key={card.id} className="p-2 bg-white rounded border border-gray-300 text-sm">
                <div className="font-medium text-gray-800">{card.topic}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Cards Message */}
      {schedule.newCards.length === 0 &&
        schedule.reviewCards.length === 0 &&
        schedule.optionalCards.length === 0 && (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center text-yellow-800">
            <p className="font-medium">No cards scheduled for today</p>
            <p className="text-sm mt-1">You're all caught up! 🎉</p>
          </div>
        )}
    </div>
  );
}
