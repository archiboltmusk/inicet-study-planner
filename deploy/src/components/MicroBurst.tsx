import { useState, useEffect, useRef } from "react";
import { QUESTIONS, QUESTION_SUBJECTS } from "@/data/questions";
import type { Question } from "@/data/questions";
import { Zap, ChevronDown } from "lucide-react";
import { safeLoad, safeSave } from "@/lib/storage";

type Phase = "select" | "question" | "done";

interface Result {
  question: Question;
  selected: number | null;
  correct: boolean;
}

const BURST_COUNT = 3;
const TIMER_SECONDS = 90;

function sampleQuestions(subject: string): Question[] {
  const pool =
    subject === "All Subjects"
      ? [...QUESTIONS]
      : QUESTIONS.filter((q) => q.subject === subject);
  return pool.sort(() => Math.random() - 0.5).slice(0, BURST_COUNT);
}

function StarRating({ score }: { score: number }) {
  return (
    <div className="text-3xl tracking-wide">
      {Array.from({ length: BURST_COUNT }).map((_, i) => (
        <span key={i} className={i < score ? "opacity-100" : "opacity-20"}>
          ⭐
        </span>
      ))}
    </div>
  );
}

export function MicroBurst() {
  const [phase, setPhase] = useState<Phase>("select");
  const [subject, setSubject] = useState("All Subjects");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [results, setResults] = useState<Result[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedRef = useRef<number | null>(null);
  const qIdxRef = useRef(0);
  const questionsRef = useRef<Question[]>([]);
  const resultsRef = useRef<Result[]>([]);

  selectedRef.current = selected;
  qIdxRef.current = qIdx;
  questionsRef.current = questions;
  resultsRef.current = results;

  const clearTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (autoAdvanceRef.current) {
      clearTimeout(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
  };

  useEffect(() => () => clearTimers(), []);

  const doAdvance = (sel: number | null) => {
    clearTimers();
    const idx = qIdxRef.current;
    const qs = questionsRef.current;
    const q = qs[idx];
    const isCorrect = sel !== null && sel === q.answer;
    const updated: Result[] = [
      ...resultsRef.current,
      { question: q, selected: sel, correct: isCorrect },
    ];
    resultsRef.current = updated;
    setResults(updated);
    const uid = `local-${q.id}`;
    const existing = safeLoad<Record<string, { selected: number; correct: boolean }>>("neetpg_pyq_attempts", {});
    safeSave("neetpg_pyq_attempts", { ...existing, [uid]: { selected: sel ?? -1, correct: isCorrect } });
    if (idx + 1 < qs.length) {
      const nextIdx = idx + 1;
      qIdxRef.current = nextIdx;
      setQIdx(nextIdx);
      setSelected(null);
      selectedRef.current = null;
      setTimeLeft(TIMER_SECONDS);
      startTimer();
    } else {
      setPhase("done");
    }
  };

  const startTimer = () => {
    clearTimers();
    let t = TIMER_SECONDS;
    timerRef.current = setInterval(() => {
      t -= 1;
      setTimeLeft(t);
      if (t <= 0) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        doAdvance(selectedRef.current);
      }
    }, 1000);
  };

  const handleSelect = (optIdx: number) => {
    if (selectedRef.current !== null || phase !== "question") return;
    clearTimers();
    setSelected(optIdx);
    selectedRef.current = optIdx;
    autoAdvanceRef.current = setTimeout(() => doAdvance(optIdx), 1500);
  };

  const startBurst = () => {
    clearTimers();
    const qs = sampleQuestions(subject);
    if (qs.length < BURST_COUNT) return;
    questionsRef.current = qs;
    resultsRef.current = [];
    qIdxRef.current = 0;
    selectedRef.current = null;
    setQuestions(qs);
    setQIdx(0);
    setSelected(null);
    setTimeLeft(TIMER_SECONDS);
    setResults([]);
    setPhase("question");
    setTimeout(startTimer, 0);
  };

  const resetToSelect = () => {
    clearTimers();
    setPhase("select");
    setSelected(null);
    setResults([]);
  };

  if (phase === "select") {
    const pool =
      subject === "All Subjects"
        ? QUESTIONS
        : QUESTIONS.filter((q) => q.subject === subject);
    const canStart = pool.length >= BURST_COUNT;
    return (
      <div className="flex flex-col gap-6 max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-xl font-bold text-foreground">Micro Burst</h2>
            <p className="text-sm text-muted-foreground">
              {BURST_COUNT} questions · {TIMER_SECONDS} seconds each
            </p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Subject
            </label>
            <div className="relative">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full appearance-none bg-background border border-border text-foreground rounded-lg px-4 py-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="All Subjects">All Subjects</option>
                {QUESTION_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <button
            onClick={startBurst}
            disabled={!canStart}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Start Burst
          </button>
          {!canStart && (
            <p className="text-xs text-red-500 text-center">
              Not enough questions for this subject.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (phase === "question") {
    const q = questions[qIdx];
    if (!q) return null;
    const timerRed = timeLeft < 15;
    return (
      <div className="flex flex-col gap-5 max-w-xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              Micro Burst
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            {qIdx + 1} / {BURST_COUNT}
          </span>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono bg-background border border-border px-2 py-0.5 rounded text-muted-foreground">
              {q.subject}
            </span>
            <div
              className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold transition-colors ${
                timerRed
                  ? "border-red-500 text-red-500"
                  : "border-primary text-foreground"
              }`}
            >
              {timeLeft}
            </div>
          </div>

          <p className="text-foreground font-medium leading-relaxed">
            {q.stem}
          </p>

          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => {
              let cls =
                "bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground";
              if (selected !== null) {
                if (i === q.answer)
                  cls =
                    "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400";
                else if (i === selected)
                  cls = "bg-red-500/20 border-red-500 text-red-500";
                else
                  cls =
                    "bg-background border border-border/40 text-muted-foreground/50";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${cls}`}
                >
                  <span className="font-mono text-xs mr-2">
                    {["A", "B", "C", "D"][i]}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="bg-background border border-border rounded-lg p-3 text-xs text-muted-foreground">
              <span className="text-foreground font-mono text-[10px] block mb-1">
                EXPLANATION
              </span>
              {q.explanation}
            </div>
          )}
        </div>
      </div>
    );
  }

  const score = results.filter((r) => r.correct).length;
  const resultMessage =
    score === BURST_COUNT
      ? "Perfect!"
      : score >= 2
      ? "Good job!"
      : "Keep practising";

  return (
    <div className="flex flex-col gap-5 max-w-xl mx-auto">
      <div className="flex items-center gap-3">
        <Zap className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Burst Complete</h2>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-3">
        <div className="text-4xl font-bold font-mono text-foreground">
          {score} / {BURST_COUNT}
        </div>
        <StarRating score={score} />
        <p className="text-sm font-medium text-muted-foreground">
          {resultMessage}
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
        <div className="text-sm font-semibold text-foreground mb-1">
          Questions
        </div>
        {results.map((r, i) => (
          <div
            key={r.question.id}
            className={`rounded-lg p-3 border text-xs ${
              r.correct
                ? "border-green-500/30 bg-green-500/5"
                : "border-red-500/30 bg-red-500/5"
            }`}
          >
            <div className="flex items-start gap-2">
              <span
                className={`mt-0.5 shrink-0 font-bold ${
                  r.correct ? "text-green-500" : "text-red-500"
                }`}
              >
                {r.correct ? "✓" : "✗"}
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-foreground">
                  {i + 1}. {r.question.stem}
                </span>
                <span className="text-green-600 dark:text-green-400">
                  Correct: {r.question.options[r.question.answer]}
                </span>
                {!r.correct && (
                  <span className="text-red-500">
                    {r.selected !== null
                      ? `Your answer: ${r.question.options[r.selected]}`
                      : "Not answered (timed out)"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={startBurst}
          className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
        >
          New Burst
        </button>
        <button
          onClick={resetToSelect}
          className="flex-1 py-3 bg-card border border-border text-muted-foreground rounded-lg text-sm hover:text-foreground transition-colors"
        >
          Change Subject
        </button>
      </div>
    </div>
  );
}
