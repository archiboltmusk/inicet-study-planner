import { useMemo, useState } from "react";
import { safeLoad, safeSave, StorageKey } from "@/lib/storage";
import { MISTAKE_STORAGE_KEY, type StoredEntry } from "@/lib/mistakeLogger";
import { useStore } from "zustand";
import { getAppStore, sel } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface WeeklyReviewEntry {
  weekStart: string; // ISO date, Monday
  errorsLogged: number;
  weakTopics: string[];
  streakCount: number;
  daysCompleted: number;
  notes: string;
}

function startOfWeek(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // back up to Monday
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function WeeklyReview() {
  const { user } = useAuth();
  const prefix = user ? `neetpg_u_${user.id}_` : "neetpg_";
  const store = getAppStore(prefix);
  const completedDays = useStore(store, sel.completedDays);
  const streak = useStore(store, sel.streak);

  const [notes, setNotes] = useState("");
  const [reviews, setReviews] = useState<WeeklyReviewEntry[]>(() =>
    safeLoad<WeeklyReviewEntry[]>(StorageKey.WeeklyReviews, [])
  );

  const weekStart = useMemo(() => startOfWeek(new Date()), []);
  const weekStartIso = weekStart.toISOString();

  const mistakes = safeLoad<StoredEntry[]>(MISTAKE_STORAGE_KEY, []);
  const mistakesThisWeek = mistakes.filter((e) => new Date(e.date) >= weekStart);
  const weakTopics = Array.from(
    new Set(mistakesThisWeek.map((e) => `${e.subject}: ${e.topic}`))
  );

  function saveReview() {
    const entry: WeeklyReviewEntry = {
      weekStart: weekStartIso,
      errorsLogged: mistakesThisWeek.length,
      weakTopics,
      streakCount: streak.count,
      daysCompleted: completedDays.length,
      notes,
    };
    const updated = [...reviews.filter((r) => r.weekStart !== weekStartIso), entry];
    setReviews(updated);
    safeSave(StorageKey.WeeklyReviews, updated);
    setNotes("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Review — week of {weekStart.toDateString()}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>New mistakes logged: <strong>{mistakesThisWeek.length}</strong></div>
          <div>Weak topics found: <strong>{weakTopics.length}</strong></div>
          <div>Current streak: <strong>{streak.count} days</strong></div>
          <div>Days completed overall: <strong>{completedDays.length}</strong></div>
        </div>

        {weakTopics.length > 0 && (
          <ul className="text-sm list-disc pl-5">
            {weakTopics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        <Textarea
          placeholder="One win this week, one fix for next week"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <Button onClick={saveReview}>Save weekly review</Button>

        {reviews.length > 0 && (
          <ul className="text-sm space-y-1 pt-2 border-t">
            {reviews
              .slice()
              .reverse()
              .map((r) => (
                <li key={r.weekStart}>
                  {new Date(r.weekStart).toDateString()} — {r.errorsLogged} errors,{" "}
                  {r.weakTopics.length} weak topics, {r.streakCount}-day streak
                </li>
              ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
