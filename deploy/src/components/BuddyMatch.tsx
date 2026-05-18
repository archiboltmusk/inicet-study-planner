import { useState, useCallback } from "react";
import { UserCheck, ChevronLeft, Clock, BookOpen, Sun, Sunset, Moon } from "lucide-react";
import { safeLoad, safeSave } from "@/lib/storage";

const SUBJECTS = [
  "Pharmacology",
  "Medicine",
  "Surgery",
  "OBG",
  "Pathology",
  "Microbiology",
  "Anatomy",
  "Physiology",
  "Biochemistry",
  "Paediatrics",
  "ENT",
  "Ophthalmology",
  "PSM",
  "Forensic Medicine",
] as const;

type Subject = (typeof SUBJECTS)[number];
type StudyTime = "Morning" | "Afternoon" | "Evening";
type StudyStyle = "Solo with check-ins" | "Group discussions" | "Mixed";

interface BuddyProfile {
  strongSubjects: Subject[];
  weakSubjects: Subject[];
  hoursPerDay: number;
  targetScore: number;
  studyTime: StudyTime;
  studyStyle: StudyStyle;
}

interface MatchProfile {
  name: string;
  initials: string;
  matchScore: number;
  strongSubjects: Subject[];
  weakSubjects: Subject[];
  hoursPerDay: number;
  targetScore: number;
  studyTime: StudyTime;
  studyStyle: StudyStyle;
}

const MATCH_NAMES: { name: string; initials: string }[] = [
  { name: "Priya S.", initials: "PS" },
  { name: "Arjun M.", initials: "AM" },
  { name: "Ananya K.", initials: "AK" },
  { name: "Rahul P.", initials: "RP" },
  { name: "Sneha V.", initials: "SV" },
];

const STUDY_TIMES: StudyTime[] = ["Morning", "Afternoon", "Evening"];
const STUDY_STYLES: StudyStyle[] = ["Solo with check-ins", "Group discussions", "Mixed"];

const AVATAR_GRADIENTS = [
  "from-violet-500 to-purple-700",
  "from-sky-500 to-blue-700",
  "from-emerald-500 to-teal-700",
  "from-amber-500 to-orange-700",
  "from-rose-500 to-pink-700",
];

const CARD_HEADER_GRADIENTS = [
  "from-violet-600/20 to-purple-800/10",
  "from-sky-600/20 to-blue-800/10",
  "from-emerald-600/20 to-teal-800/10",
  "from-amber-600/20 to-orange-800/10",
  "from-rose-600/20 to-pink-800/10",
];

function seededRng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (Math.imul(s ^ (s >>> 16), 0x45d9f3b) ^ (s >>> 4)) | 1;
    return ((s >>> 0) / 0xffffffff);
  };
}

function profileSeed(profile: BuddyProfile): number {
  const str = [
    ...profile.strongSubjects,
    ...profile.weakSubjects,
    profile.hoursPerDay,
    profile.targetScore,
    profile.studyTime,
    profile.studyStyle,
  ].join("|");
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function generateMatches(profile: BuddyProfile): MatchProfile[] {
  const seed = profileSeed(profile);
  const rng = seededRng(seed);

  return MATCH_NAMES.map(({ name, initials }, idx) => {
    const rngI = seededRng(seed + idx * 0x9e3779b9);

    const theirStrong = profile.weakSubjects.length > 0
      ? [...profile.weakSubjects].sort(() => rngI() - 0.5).slice(0, Math.max(1, Math.floor(profile.weakSubjects.length * (0.6 + rngI() * 0.4))))
      : SUBJECTS.filter((s) => !profile.strongSubjects.includes(s)).sort(() => rngI() - 0.5).slice(0, 3);

    const theirWeak = profile.strongSubjects.length > 0
      ? [...profile.strongSubjects].sort(() => rngI() - 0.5).slice(0, Math.max(1, Math.floor(profile.strongSubjects.length * (0.6 + rngI() * 0.4))))
      : SUBJECTS.filter((s) => !profile.weakSubjects.includes(s)).sort(() => rngI() - 0.5).slice(0, 3);

    const complementScore = (() => {
      const strongOverlap = theirStrong.filter((s) => profile.weakSubjects.includes(s)).length;
      const weakOverlap = theirWeak.filter((s) => profile.strongSubjects.includes(s)).length;
      const maxOverlap = Math.max(1, profile.weakSubjects.length + profile.strongSubjects.length);
      return (strongOverlap + weakOverlap) / maxOverlap;
    })();

    const matchScore = Math.round(85 + complementScore * 10 + rng() * 3);

    const timeIdx = Math.floor(rngI() * STUDY_TIMES.length);
    const styleIdx = Math.floor(rngI() * STUDY_STYLES.length);
    const hours = Math.max(1, Math.min(12, profile.hoursPerDay + Math.round((rngI() - 0.5) * 4)));
    const target = Math.max(50, Math.min(100, profile.targetScore + Math.round((rngI() - 0.5) * 20)));

    return {
      name,
      initials,
      matchScore: Math.min(98, matchScore),
      strongSubjects: theirStrong as Subject[],
      weakSubjects: theirWeak as Subject[],
      hoursPerDay: hours,
      targetScore: target,
      studyTime: STUDY_TIMES[timeIdx],
      studyStyle: STUDY_STYLES[styleIdx],
    };
  });
}

function SubjectChip({
  subject,
  selected,
  onClick,
}: {
  subject: Subject;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-sm cursor-pointer transition-colors ${
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-secondary text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
      }`}
    >
      {subject}
    </button>
  );
}

function StudyTimeIcon({ time }: { time: StudyTime }) {
  if (time === "Morning") return <Sun size={14} className="text-amber-400" />;
  if (time === "Afternoon") return <Sunset size={14} className="text-orange-400" />;
  return <Moon size={14} className="text-indigo-400" />;
}

let toastTimeout: ReturnType<typeof setTimeout> | null = null;

export function BuddyMatch() {
  const [profile, setProfile] = useState<BuddyProfile>(() =>
    safeLoad<BuddyProfile>("buddy_profile", {
      strongSubjects: [],
      weakSubjects: [],
      hoursPerDay: 6,
      targetScore: 80,
      studyTime: "Morning",
      studyStyle: "Mixed",
    })
  );
  const [view, setView] = useState<"profile" | "matches">("profile");
  const [matches, setMatches] = useState<MatchProfile[]>([]);
  const [errors, setErrors] = useState<{ strong?: string; weak?: string }>({});
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => setToast(null), 3500);
  }, []);

  const toggleSubject = useCallback(
    (field: "strongSubjects" | "weakSubjects", subject: Subject) => {
      setProfile((prev) => {
        const current = prev[field];
        const updated = current.includes(subject)
          ? current.filter((s) => s !== subject)
          : [...current, subject];
        const next = { ...prev, [field]: updated };
        safeSave("buddy_profile", next);
        return next;
      });
      setErrors((e) => ({ ...e, [field === "strongSubjects" ? "strong" : "weak"]: undefined }));
    },
    []
  );

  const handleFindMatches = useCallback(() => {
    const newErrors: { strong?: string; weak?: string } = {};
    if (profile.strongSubjects.length === 0) newErrors.strong = "Select at least one strong subject.";
    if (profile.weakSubjects.length === 0) newErrors.weak = "Select at least one weak subject.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    const generated = generateMatches(profile);
    setMatches(generated);
    setView("matches");
  }, [profile]);

  const updateProfile = useCallback(<K extends keyof BuddyProfile>(key: K, value: BuddyProfile[K]) => {
    setProfile((prev) => {
      const next = { ...prev, [key]: value };
      safeSave("buddy_profile", next);
      return next;
    });
  }, []);

  if (view === "matches") {
    return (
      <div className="max-w-2xl mx-auto p-4 space-y-5">
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-card border border-border shadow-lg text-sm text-foreground animate-in fade-in slide-in-from-bottom-2 duration-200">
            {toast}
          </div>
        )}

        <button
          onClick={() => setView("profile")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Profile
        </button>

        <div className="flex items-center gap-3">
          <UserCheck className="text-primary" size={28} />
          <h1 className="text-2xl font-bold">Your Top Matches</h1>
          <span className="ml-auto px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
            {matches.length}
          </span>
        </div>

        <div className="space-y-4">
          {matches.map((match, idx) => (
            <div
              key={match.name}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <div
                className={`bg-gradient-to-r ${CARD_HEADER_GRADIENTS[idx % CARD_HEADER_GRADIENTS.length]} p-5 flex items-center gap-4`}
              >
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                >
                  {match.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg leading-tight">{match.name}</p>
                  <p className="text-sm text-muted-foreground">NEET PG Aspirant</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-bold text-primary">{match.matchScore}%</p>
                  <p className="text-xs text-muted-foreground">match</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Strong in
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {match.strongSubjects.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full border text-sm bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Needs help with
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {match.weakSubjects.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full border text-sm bg-rose-500/10 text-rose-400 border-rose-500/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>{match.hoursPerDay}h/day</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <BookOpen size={14} />
                    <span>Target {match.targetScore}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <StudyTimeIcon time={match.studyTime} />
                    <span>{match.studyTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <UserCheck size={14} />
                    <span>{match.studyStyle}</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    showToast(
                      "Feature coming soon — share your room code to study together!"
                    )
                  }
                  className="w-full py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-3">
        <UserCheck className="text-primary" size={28} />
        <h1 className="text-2xl font-bold">Find Your Study Buddy</h1>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-2">
        <label className="block text-sm font-semibold">Your strong subjects</label>
        <p className="text-xs text-muted-foreground">Subjects you're confident in</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {SUBJECTS.map((s) => (
            <SubjectChip
              key={s}
              subject={s}
              selected={profile.strongSubjects.includes(s)}
              onClick={() => toggleSubject("strongSubjects", s)}
            />
          ))}
        </div>
        {errors.strong && (
          <p className="text-xs text-destructive pt-1">{errors.strong}</p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-2">
        <label className="block text-sm font-semibold">Your weak subjects</label>
        <p className="text-xs text-muted-foreground">Subjects where you need improvement</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {SUBJECTS.map((s) => (
            <SubjectChip
              key={s}
              subject={s}
              selected={profile.weakSubjects.includes(s)}
              onClick={() => toggleSubject("weakSubjects", s)}
            />
          ))}
        </div>
        {errors.weak && (
          <p className="text-xs text-destructive pt-1">{errors.weak}</p>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Study hours per day</label>
          <span className="font-mono text-primary font-bold">{profile.hoursPerDay}h</span>
        </div>
        <input
          type="range"
          min={1}
          max={12}
          value={profile.hoursPerDay}
          onChange={(e) => updateProfile("hoursPerDay", Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>1h</span>
          <span>12h</span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold">Target score %</label>
          <span className="font-mono text-primary font-bold">{profile.targetScore}%</span>
        </div>
        <input
          type="range"
          min={50}
          max={100}
          value={profile.targetScore}
          onChange={(e) => updateProfile("targetScore", Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <label className="block text-sm font-semibold">Preferred study time</label>
        <div className="flex gap-2 flex-wrap">
          {STUDY_TIMES.map((t) => (
            <label
              key={t}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${
                profile.studyTime === t
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
              }`}
            >
              <input
                type="radio"
                name="studyTime"
                value={t}
                checked={profile.studyTime === t}
                onChange={() => updateProfile("studyTime", t)}
                className="sr-only"
              />
              <StudyTimeIcon time={t} />
              {t}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <label className="block text-sm font-semibold">Study style</label>
        <div className="flex gap-2 flex-wrap">
          {STUDY_STYLES.map((style) => (
            <label
              key={style}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${
                profile.studyStyle === style
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-secondary text-muted-foreground hover:border-primary/40"
              }`}
            >
              <input
                type="radio"
                name="studyStyle"
                value={style}
                checked={profile.studyStyle === style}
                onChange={() => updateProfile("studyStyle", style)}
                className="sr-only"
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleFindMatches}
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-base"
      >
        Find Matches
      </button>
    </div>
  );
}
