import { useState, useEffect, useRef, useCallback } from "react";
import {
  Users,
  Copy,
  Check,
  LogOut,
  Loader2,
  AlertTriangle,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { QUESTIONS } from "@/data/questions";
import type { Question } from "@/data/questions";

type RoomPhase = "lobby" | "waiting" | "question" | "result" | "scoreboard";

interface Participant {
  name: string;
}

interface AnswerRecord {
  name: string;
  optionIdx: number;
}

const QUESTION_COUNT = 5;
const QUESTION_SECONDS = 90;

function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function generateUserName(): string {
  return `User_${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < n && copy.length > 0) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

const AVATAR_COLORS = [
  "bg-violet-600",
  "bg-sky-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-indigo-600",
];

function avatarColor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="p-1.5 rounded hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
      title="Copy"
    >
      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
    </button>
  );
}

export function StudyRooms() {
  const [phase, setPhase] = useState<RoomPhase>("lobby");
  const [roomCode, setRoomCode] = useState("");
  const [joinInput, setJoinInput] = useState("");
  const [joinError, setJoinError] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [myName] = useState(generateUserName);
  const [participants, setParticipants] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [myAnswer, setMyAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const [realtimeError, setRealtimeError] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const channelRef = useRef<RealtimeChannel | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestion = questions[questionIdx] ?? null;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const joinChannel = useCallback(
    (code: string, host: boolean) => {
      const channel = supabase.channel(`study-room:${code}`, {
        config: { broadcast: { self: true } },
      });

      channel
        .on("broadcast", { event: "join" }, ({ payload }: { payload: { name: string } }) => {
          setParticipants((prev) =>
            prev.includes(payload.name) ? prev : [...prev, payload.name]
          );
        })
        .on(
          "broadcast",
          { event: "answer" },
          ({
            payload,
          }: {
            payload: { questionId: number; optionIdx: number; name: string };
          }) => {
            setAnswers((prev) => ({
              ...prev,
              [payload.name]: { name: payload.name, optionIdx: payload.optionIdx },
            }));
          }
        )
        .on(
          "broadcast",
          { event: "next" },
          ({ payload }: { payload: { questionIdx: number } }) => {
            setQuestionIdx(payload.questionIdx);
            setAnswers({});
            setMyAnswer(null);
            setTimeLeft(QUESTION_SECONDS);
            setPhase("question");
          }
        )
        .on(
          "broadcast",
          { event: "start" },
          ({ payload }: { payload: { questionIds: number[] } }) => {
            const qs = payload.questionIds
              .map((id) => QUESTIONS.find((q) => q.id === id))
              .filter(Boolean) as Question[];
            setQuestions(qs);
            setQuestionIdx(0);
            setAnswers({});
            setMyAnswer(null);
            setTimeLeft(QUESTION_SECONDS);
            setPhase("question");
          }
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            channel.send({
              type: "broadcast",
              event: "join",
              payload: { name: myName },
            });
            setRealtimeError(false);
          } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            setRealtimeError(true);
            setParticipants([myName]);
            const solo = pickRandom(QUESTIONS, QUESTION_COUNT);
            setQuestions(solo);
            setPhase(host ? "waiting" : "question");
          }
        });

      channelRef.current = channel;
    },
    [myName]
  );

  const leaveRoom = useCallback(() => {
    clearTimer();
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    setPhase("lobby");
    setRoomCode("");
    setGeneratedCode("");
    setJoinInput("");
    setJoinError("");
    setParticipants([]);
    setAnswers({});
    setScores({});
    setQuestions([]);
    setQuestionIdx(0);
    setMyAnswer(null);
    setTimeLeft(QUESTION_SECONDS);
    setRealtimeError(false);
    setIsHost(false);
  }, [clearTimer]);

  const handleCreate = useCallback(() => {
    const code = generateRoomCode();
    setGeneratedCode(code);
    setRoomCode(code);
    setIsHost(true);
    setParticipants([myName]);
    joinChannel(code, true);
    setPhase("waiting");
  }, [myName, joinChannel]);

  const handleJoin = useCallback(() => {
    const code = joinInput.trim().toUpperCase();
    if (code.length !== 6) {
      setJoinError("Room code must be 6 characters.");
      return;
    }
    setJoinError("");
    setRoomCode(code);
    setIsHost(false);
    setParticipants([myName]);
    joinChannel(code, false);
    setPhase("waiting");
  }, [joinInput, myName, joinChannel]);

  const handleStart = useCallback(() => {
    const qs = pickRandom(QUESTIONS, QUESTION_COUNT);
    setQuestions(qs);
    channelRef.current?.send({
      type: "broadcast",
      event: "start",
      payload: { questionIds: qs.map((q) => q.id) },
    });
  }, []);

  const handleAnswer = useCallback(
    (optionIdx: number) => {
      if (myAnswer !== null || !currentQuestion) return;
      setMyAnswer(optionIdx);
      channelRef.current?.send({
        type: "broadcast",
        event: "answer",
        payload: { questionId: currentQuestion.id, optionIdx, name: myName },
      });
    },
    [myAnswer, currentQuestion, myName]
  );

  useEffect(() => {
    if (phase !== "question" || !currentQuestion) return;

    clearTimer();
    setTimeLeft(QUESTION_SECONDS);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearTimer();
          setPhase("result");
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return clearTimer;
  }, [phase, questionIdx, currentQuestion, clearTimer]);

  useEffect(() => {
    if (phase !== "question" || !currentQuestion) return;
    const allAnswered =
      participants.length > 0 && participants.every((p) => p in answers);
    if (allAnswered) {
      clearTimer();
      setPhase("result");
    }
  }, [answers, participants, phase, currentQuestion, clearTimer]);

  useEffect(() => {
    if (phase !== "result" || !currentQuestion) return;
    const correct = currentQuestion.answer;
    setScores((prev) => {
      const next = { ...prev };
      for (const [name, rec] of Object.entries(answers)) {
        if (rec.optionIdx === correct) {
          next[name] = (next[name] ?? 0) + 1;
        }
      }
      return next;
    });
  }, [phase, currentQuestion, answers]);

  useEffect(() => {
    return () => {
      clearTimer();
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, [clearTimer]);

  const handleNext = useCallback(() => {
    const nextIdx = questionIdx + 1;
    if (nextIdx >= QUESTION_COUNT) {
      setPhase("scoreboard");
      return;
    }
    channelRef.current?.send({
      type: "broadcast",
      event: "next",
      payload: { questionIdx: nextIdx },
    });
  }, [questionIdx]);

  if (phase === "lobby") {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Users className="text-primary" size={28} />
          <h1 className="text-2xl font-bold">Live Study Rooms</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h2 className="font-semibold text-lg">Create a Room</h2>
            <p className="text-sm text-muted-foreground">
              Generate a room code and invite friends to join.
            </p>
            {generatedCode ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 bg-secondary rounded-lg p-3">
                  <span className="font-mono text-3xl tracking-widest font-bold text-primary">
                    {generatedCode}
                  </span>
                  <CopyButton text={generatedCode} />
                </div>
                <p className="text-xs text-muted-foreground text-center">Joining room…</p>
              </div>
            ) : (
              <button
                onClick={handleCreate}
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Generate Room Code
              </button>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <h2 className="font-semibold text-lg">Join a Room</h2>
            <p className="text-sm text-muted-foreground">
              Enter a 6-character room code from your study partner.
            </p>
            <input
              value={joinInput}
              onChange={(e) => setJoinInput(e.target.value.toUpperCase().slice(0, 6))}
              placeholder="XXXXXX"
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border font-mono text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-ring uppercase"
              maxLength={6}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            />
            {joinError && <p className="text-xs text-destructive">{joinError}</p>}
            <button
              onClick={handleJoin}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Join Room
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <h2 className="font-semibold">How it works</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="mt-0.5 shrink-0 text-primary" />
              Create or join a room and share the 6-character code with your study group — no sign-up needed.
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="mt-0.5 shrink-0 text-primary" />
              Answer 5 NEET PG questions together in real time with a 90-second timer per question.
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight size={16} className="mt-0.5 shrink-0 text-primary" />
              Compare your answers, read explanations together, and see who scored the highest on the final leaderboard.
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (phase === "scoreboard") {
    const sorted = [...participants].sort((a, b) => (scores[b] ?? 0) - (scores[a] ?? 0));
    return (
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <RoomHeader
          roomCode={roomCode}
          participants={participants}
          onLeave={leaveRoom}
          realtimeError={realtimeError}
        />
        <div className="rounded-xl border border-border bg-card p-6 space-y-4 text-center">
          <Trophy size={40} className="mx-auto text-amber-400" />
          <h2 className="text-2xl font-bold">Final Scores</h2>
          <div className="space-y-2 text-left">
            {sorted.map((name, i) => (
              <div
                key={name}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  i === 0 ? "bg-amber-500/10 border border-amber-500/30" : "bg-secondary"
                }`}
              >
                <span className="w-6 text-center font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 ${avatarColor(name)}`}
                >
                  {name[0]}
                </div>
                <span className="flex-1 font-medium">
                  {name === myName ? "You" : name}
                </span>
                <span className="font-mono font-bold">
                  {scores[name] ?? 0}/{QUESTION_COUNT}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={leaveRoom}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Back to Lobby
          </button>
        </div>
      </div>
    );
  }

  if (phase === "waiting") {
    const othersJoined = participants.filter((p) => p !== myName).length;
    return (
      <div className="max-w-lg mx-auto p-4 space-y-4">
        <RoomHeader
          roomCode={roomCode}
          participants={participants}
          onLeave={leaveRoom}
          realtimeError={realtimeError}
        />
        <div className="rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-5">
          <Loader2 size={36} className="animate-spin text-primary" />
          <p className="text-lg font-medium">Waiting for participants…</p>
          {isHost && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">Share this code:</p>
              <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2">
                <span className="font-mono text-3xl tracking-widest font-bold">
                  {roomCode}
                </span>
                <CopyButton text={roomCode} />
              </div>
            </div>
          )}
          {isHost && (
            <button
              onClick={handleStart}
              disabled={othersJoined === 0}
              className="mt-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {othersJoined === 0 ? "Waiting for others to join…" : "Start Quiz"}
            </button>
          )}
          {!isHost && (
            <p className="text-sm text-muted-foreground">
              Waiting for the host to start the quiz…
            </p>
          )}
        </div>
      </div>
    );
  }

  if ((phase === "question" || phase === "result") && currentQuestion) {
    const timerPct = (timeLeft / QUESTION_SECONDS) * 100;
    const correct = currentQuestion.answer;
    const revealed = phase === "result";

    return (
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <RoomHeader
          roomCode={roomCode}
          participants={participants}
          onLeave={leaveRoom}
          realtimeError={realtimeError}
        />

        <div className="text-xs text-muted-foreground flex justify-between">
          <span>
            Question {questionIdx + 1} of {QUESTION_COUNT}
          </span>
          {!revealed && (
            <span className={timeLeft <= 15 ? "text-destructive font-bold" : ""}>
              {timeLeft}s
            </span>
          )}
        </div>

        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              timeLeft <= 15 ? "bg-destructive" : "bg-primary"
            }`}
            style={{ width: `${timerPct}%` }}
          />
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground border border-border">
              {currentQuestion.subject}
            </span>
          </div>
          <p className="font-medium leading-relaxed">{currentQuestion.stem}</p>

          <div className="space-y-2">
            {currentQuestion.options.map((opt, i) => {
              let cls =
                "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ";
              if (!revealed) {
                cls +=
                  myAnswer === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary hover:bg-accent hover:border-accent-border";
              } else {
                if (i === correct) {
                  cls += "border-emerald-500 bg-emerald-500/10 text-emerald-400";
                } else if (myAnswer === i && i !== correct) {
                  cls += "border-destructive bg-destructive/10 text-destructive";
                } else {
                  cls += "border-border bg-secondary text-muted-foreground";
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={myAnswer !== null || revealed}
                  className={cls}
                >
                  <span className="font-mono mr-2 text-muted-foreground">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {revealed && (
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <h3 className="font-semibold text-sm">Explanation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentQuestion.explanation}
            </p>

            <div className="space-y-2 pt-2 border-t border-border">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Participants
              </h4>
              {participants.map((p, i) => {
                const rec = answers[p];
                return (
                  <div key={p} className="flex items-center gap-2 text-sm">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${avatarColor(p)}`}
                    >
                      {p[0]}
                    </div>
                    <span className="flex-1">{p === myName ? "You" : `Participant ${i + 1}`}</span>
                    {rec ? (
                      <span
                        className={
                          rec.optionIdx === correct
                            ? "text-emerald-400 font-medium"
                            : "text-destructive"
                        }
                      >
                        {String.fromCharCode(65 + rec.optionIdx)}{" "}
                        {rec.optionIdx === correct ? "✓" : "✗"}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">No answer</span>
                    )}
                  </div>
                );
              })}
            </div>

            {isHost && (
              <button
                onClick={handleNext}
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity mt-2"
              >
                {questionIdx + 1 >= QUESTION_COUNT ? "View Results" : "Next Question →"}
              </button>
            )}
            {!isHost && (
              <p className="text-xs text-muted-foreground text-center pt-1">
                Waiting for host to advance…
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}

function RoomHeader({
  roomCode,
  participants,
  onLeave,
  realtimeError,
}: {
  roomCode: string;
  participants: string[];
  onLeave: () => void;
  realtimeError: boolean;
}) {
  return (
    <div className="space-y-2">
      {realtimeError && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
          <AlertTriangle size={16} />
          Real-time connection unavailable — playing in solo mode
        </div>
      )}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 bg-secondary rounded-lg px-3 py-1.5">
          <span className="font-mono text-base tracking-widest font-bold">{roomCode}</span>
          <CopyButton text={roomCode} />
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users size={14} />
          <span>{participants.length}</span>
        </div>
        <button
          onClick={onLeave}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-destructive/20 hover:text-destructive border border-border text-sm transition-colors"
        >
          <LogOut size={14} />
          Leave
        </button>
      </div>
    </div>
  );
}
