import { safeLoad, safeSave } from "@/lib/storage";

export interface AutoMistake {
  subject: string;
  question: string;
  correctAnswer: string;
  myAnswer: string;
  explanation: string;
}

const KEY = "neetpg_mistake_logbook";

interface StoredEntry {
  id: string;
  date: string;
  subject: string;
  topic: string;
  question: string;
  correctAnswer: string;
  myAnswer: string;
  whyWrong: string;
  reviewed: boolean;
  source?: "auto" | "manual";
}

export function autoLogMistakes(mistakes: AutoMistake[]): void {
  if (mistakes.length === 0) return;
  const existing = safeLoad<StoredEntry[]>(KEY, []);
  const now = new Date().toISOString();
  const newEntries: StoredEntry[] = mistakes.map((m, i) => ({
    id: `auto-${Date.now()}-${i}`,
    date: now,
    subject: m.subject,
    topic: m.subject,
    question: m.question.slice(0, 220),
    correctAnswer: m.correctAnswer,
    myAnswer: m.myAnswer,
    whyWrong: m.explanation.slice(0, 320),
    reviewed: false,
    source: "auto",
  }));
  safeSave(KEY, [...newEntries, ...existing]);
  window.dispatchEvent(new CustomEvent("mistakeLogUpdate"));
}
