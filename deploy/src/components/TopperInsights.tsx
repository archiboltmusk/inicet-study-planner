import { useState } from "react";
import { Star, BookOpen, Clock, TrendingUp, Award, ChevronDown, ChevronUp, Lightbulb, Target, Brain, Heart } from "lucide-react";

interface Topper {
  name: string;
  rank: string;
  exam: string;
  college: string;
  quote: string;
  strategy: string[];
  subjectTips: { subject: string; tip: string }[];
  routine: string;
  resources: string[];
}

const TOPPERS: Topper[] = [
  {
    name: "Zainab Vora",
    rank: "AIR 1",
    exam: "INI-CET 2024",
    college: "AIIMS New Delhi",
    quote: "Every question in INI-CET has a reason behind the answer. Don't memorise — understand the 'why', and the marks follow automatically.",
    strategy: [
      "Never started a new topic without finishing its MCQs the same day — the 24-hour consolidation window is golden.",
      "Maintained a single 'mistake logbook' — every wrong MCQ was written down with its correct reasoning. Reviewed it every Sunday.",
      "Did NOT read Harrison or Bailey for primary prep. Marrow video + Marrow notes + Reflex MCQs was the entire strategy.",
      "India-specific content (NFHS, NDPS, MHCA, national programmes) was treated as a separate mini-subject — 30 min daily, every single day.",
      "For image-based questions: ran through 20 images every night before sleeping. Visual memory consolidates overnight.",
      "Mock tests were taken in strict exam conditions — phone away, no pausing, no bathroom breaks mid-section.",
      "After every mock, spent 2x the mock time on analysis — weak subjects were identified by question-type, not just subject.",
      "Took one full rest day per week (usually Sunday afternoon). Burnout is the biggest risk after Day 10.",
    ],
    subjectTips: [
      { subject: "Medicine", tip: "Focus on clinical vignettes — INI-CET loves 'next best step' questions over pure recall. Practice decision trees." },
      { subject: "Pathology", tip: "Histopathology images are guaranteed 8-10 marks. Run 20 slides daily — H&E pattern recognition is a skill, not memory." },
      { subject: "Pharmacology", tip: "Make a DOC (Drug of Choice) master table. 70% of Pharma marks come from DOC questions." },
      { subject: "PSM", tip: "India-specific stats (NFHS-5, MMR, IMR, TFR) are free marks if you know them. Write them 3 times — they stick." },
      { subject: "OBG", tip: "Obstetrics flowcharts > reading. Make a one-page flowchart for APH, PPH, pre-eclampsia management." },
      { subject: "Surgery", tip: "Surgical anatomy is tested heavily. Hesselbach's triangle, RLN course, portal-systemic anastomoses — know them cold." },
    ],
    routine: "5:30 AM wake-up → 30 min review of previous day's notes → 6:00 AM new topic (3 hrs) → 9:00 AM MCQ sprint (1 hr) → break → 11:00 AM new topic continues → 2:00 PM rest (45 min, no screen) → 3:00 PM MCQ practice + weak areas → 6:00 PM India-specific content → 7:00 PM image review (20 images) → 8:00 PM mistake logbook → 9:00 PM write 5 high-yield points → 10:00 PM sleep",
    resources: ["Marrow (primary platform)", "Reflex MCQs", "ACROSS question bank", "'The World of Medicine' by Anoop Kumar", "AIIMS PYQ (2010–2024)", "Zainab's own mistake logbook (handwritten)"],
  },
  {
    name: "Rahul Garg",
    rank: "AIR 3",
    exam: "INI-CET 2024",
    college: "AIIMS New Delhi",
    quote: "The exam tests your ability to eliminate wrong options, not just pick the right one. Master the art of intelligent guessing.",
    strategy: [
      "Used a 3-pass system for every mock: pass 1 = sure answers, pass 2 = probable answers, pass 3 = educated guesses. Never random guessing.",
      "Made subject-specific one-page cheat sheets by Day 20. Only referred to cheat sheets (never textbooks) in the last 8 days.",
      "Pharmacology was revised every 3rd day regardless of schedule — it's the subject most people neglect and most examiners love.",
      "Did full 200-Q mocks starting Day 15, not Day 25. Early mock exposure reduces exam anxiety dramatically.",
      "Paediatrics + OBG were studied together (Day 11-12) and revised together — many overlapping topics (neonatal jaundice, CHD, RDS).",
      "Kept study sessions to 90-minute blocks with 10-minute movement breaks. No marathon 6-hour study sessions without breaks.",
    ],
    subjectTips: [
      { subject: "Microbiology", tip: "Gram stain + morphology flashcards. 15 cards reviewed daily, cycling. By Day 28, you've seen each card 5+ times." },
      { subject: "Biochemistry", tip: "Enzyme kinetics and LSD (lysosomal storage disorders) are guaranteed questions. Spend 2 hours on each — they're limited in scope." },
      { subject: "Paediatrics", tip: "Developmental milestones come up every exam. Use the '3-6-9-12-18-24 month' mnemonic framework — never miss these free marks." },
      { subject: "Forensic", tip: "NDPS Act and MHCA 2017 are the two most tested legal acts. 30 minutes is enough if you read them focused." },
    ],
    routine: "6:00 AM wake → 30 min exercise (non-negotiable) → 7:00 AM study (90-min blocks with 10-min breaks) → 1:00 PM lunch + 45-min rest → 2:30 PM MCQs → 5:00 PM weak area targeted revision → 7:00 PM India content + legal acts → 8:30 PM cheat sheet writing → 9:30 PM sleep",
    resources: ["Marrow", "PrepLadder (for Surgery and OBG)", "AIIMS INICET PYQ analysis by Bhatia", "Dams notes for PSM", "Handwritten subject cheat sheets"],
  },
  {
    name: "Priya Menon",
    rank: "AIR 7",
    exam: "INI-CET 2023",
    college: "JIPMER Puducherry",
    quote: "I failed my first INI-CET attempt. The second time, I stopped studying hard and started studying smart. The difference is everything.",
    strategy: [
      "After failing attempt 1, did a detailed gap analysis — subject-wise score breakdown from old mocks. Found that 40% of errors were in image questions. Fixed that first.",
      "Spaced repetition was the biggest upgrade from attempt 1 to 2. Used Anki for image flashcards — 50 cards/day, 15-min review.",
      "For clinical vignettes: practiced the 'scan for buzzwords' technique — identify the key clinical clue within 10 seconds of reading the stem.",
      "Mental health was treated as seriously as subject revision. Daily 30-min walk, weekly call with a friend outside medicine, journaling.",
      "Did not study on the day before the exam — pure rest, light food, familiar movie. Brain consolidates better with rest than last-minute cramming.",
      "Rank 7 with 28 days of focused prep, not 6 months of scattered studying. Focus > duration.",
    ],
    subjectTips: [
      { subject: "Anatomy", tip: "Clinical anatomy (surface markings, nerve injuries, surgical incisions) is tested, not embryology depth. Focus on clinically relevant anatomy." },
      { subject: "Physiology", tip: "Cardiac physiology (JVP, Frank-Starling, Wiggers diagram) and renal physiology (GFR, tubular functions) are highest yield." },
      { subject: "Medicine", tip: "For autoimmune diseases, make a master table: disease → autoantibody → complement levels → treatment. One table = 10+ marks." },
      { subject: "ENT/Ophthalmology", tip: "These are often neglected but carry 15-20 marks. High-yield topics: SNHL vs CSNHL, CSOM types, trachoma staging, Fuchs." },
    ],
    routine: "6:30 AM wake → 20 min Anki (image cards) → 7:00 AM study block → 12:30 PM lunch + 30-min walk → 2:00 PM MCQs + weak area → 5:00 PM break + tea → 5:30 PM India content → 7:00 PM evening block → 9:00 PM journaling + review day's errors → 10:00 PM sleep",
    resources: ["Marrow", "Anki (image flashcards)", "AIIMS PYQ 2015-2023", "PrepLadder for Surgery", "DNB Trapeze for PSM", "Zainab Vora's YouTube channel"],
  },
];

const QUICK_TIPS = [
  { icon: Brain, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", title: "The 80/20 Rule", tip: "80% of INI-CET marks come from 20% of topics. Master Cardiology, Respiratory, Nephrology, Pathology basics, Obstetrics emergencies, and India-specific content — you cover the exam spine." },
  { icon: Clock, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", title: "Time Per Question", tip: "INI-CET gives 54 seconds per question. Practice this pacing from Day 15 onwards. If a question takes >90 seconds, mark and move — come back at the end." },
  { icon: Target, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", title: "Negative Marking Strategy", tip: "Negative marking is -0.33 per wrong answer. A question with 3 wrong choices eliminated = attempt it (EV positive). 2 wrong choices eliminated = your call. 1 or 0 = skip." },
  { icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", title: "Mock Score Trajectory", tip: "Don't panic if Day 1 mock is 50%. Toppers typically see: Week 1 avg 55% → Week 2 avg 65% → Week 3 avg 72% → Week 4 avg 78%+. The curve is exponential, not linear." },
  { icon: Lightbulb, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", title: "The Mistake Logbook", tip: "Every wrong MCQ answered should be written down with the correct answer and 1-line reason. Review Sunday mornings. This single habit is responsible for more rank improvements than any other strategy." },
  { icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", title: "Burnout Prevention", tip: "One rest day per week is not optional — it's mandatory. Sleep 7 hours minimum. Your brain consolidates memory during sleep, not during cramming. Sleeping is studying." },
];

const SUBJECT_WEIGHTAGE = [
  { subject: "Medicine", weight: 22, color: "#ff4d4d" },
  { subject: "Surgery", weight: 16, color: "#c77dff" },
  { subject: "OBG", weight: 12, color: "#f72585" },
  { subject: "Paediatrics", weight: 10, color: "#4cc9f0" },
  { subject: "PSM", weight: 10, color: "#8338ec" },
  { subject: "Pathology", weight: 8, color: "#fb8500" },
  { subject: "Pharmacology", weight: 7, color: "#06d6a0" },
  { subject: "Microbiology", weight: 5, color: "#ffb703" },
  { subject: "Others", weight: 10, color: "#6c757d" },
];

export function TopperInsights() {
  const [activeTopper, setActiveTopper] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>("strategy");
  const topper = TOPPERS[activeTopper];

  const toggle = (sec: string) =>
    setExpandedSection(prev => (prev === sec ? null : sec));

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-yellow-500/20 p-2 rounded-lg">
          <Award className="w-5 h-5 text-yellow-400" />
        </div>
        <div>
          <h2 className="font-mono font-bold text-foreground uppercase tracking-wider text-sm">Topper Insights</h2>
          <p className="text-xs text-muted-foreground font-mono">Strategies from INI-CET AIR toppers</p>
        </div>
      </div>

      {/* Subject Weightage Bar */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <p className="text-xs font-mono uppercase text-muted-foreground">INI-CET Subject Weightage (approx.)</p>
        <div className="flex h-4 rounded-full overflow-hidden w-full">
          {SUBJECT_WEIGHTAGE.map(s => (
            <div
              key={s.subject}
              style={{ width: `${s.weight}%`, backgroundColor: s.color }}
              title={`${s.subject}: ${s.weight}%`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-2">
          {SUBJECT_WEIGHTAGE.map(s => (
            <div key={s.subject} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-[10px] font-mono text-muted-foreground">{s.subject} {s.weight}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Topper selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TOPPERS.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTopper(i)}
            className={`text-left p-4 rounded-xl border-2 transition-all ${
              activeTopper === i
                ? "border-yellow-500/60 bg-yellow-500/10"
                : "border-border bg-card hover:border-yellow-500/30"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{t.college}</p>
              </div>
              <div className="shrink-0 px-2 py-0.5 bg-yellow-500/20 rounded-full">
                <span className="text-[10px] font-mono text-yellow-400 font-bold">{t.rank}</span>
              </div>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground mt-1.5">{t.exam}</p>
          </button>
        ))}
      </div>

      {/* Topper detail */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Quote */}
        <div className="px-6 py-5 bg-yellow-500/5 border-b border-yellow-500/20">
          <div className="flex gap-3">
            <Star className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-sm font-serif text-foreground/90 italic leading-relaxed">"{topper.quote}"</p>
          </div>
          <p className="text-[10px] font-mono text-yellow-400 mt-2 ml-7">— {topper.name}, {topper.rank} {topper.exam}</p>
        </div>

        {/* Accordion sections */}
        {[
          {
            id: "strategy",
            label: "Study Strategy",
            icon: TrendingUp,
            content: (
              <ul className="space-y-2.5">
                {topper.strategy.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[10px] font-mono text-muted-foreground w-4 shrink-0 mt-0.5">{i + 1}.</span>
                    <p className="text-sm font-mono text-foreground/80 leading-relaxed">{s}</p>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            id: "routine",
            label: "Daily Routine",
            icon: Clock,
            content: (
              <div className="space-y-2">
                {topper.routine.split(" → ").map((block, i) => (
                  <div key={i} className="flex items-start gap-3 py-1.5 border-b border-border/40 last:border-0">
                    <span className="text-[10px] font-mono text-primary w-4 shrink-0">{i + 1}</span>
                    <p className="text-xs font-mono text-foreground/80">{block}</p>
                  </div>
                ))}
              </div>
            ),
          },
          {
            id: "subjects",
            label: "Subject-Wise Tips",
            icon: BookOpen,
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topper.subjectTips.map((st, i) => (
                  <div key={i} className="bg-background rounded-lg p-3 border border-border/60">
                    <p className="text-[10px] font-mono text-primary uppercase mb-1.5">{st.subject}</p>
                    <p className="text-xs font-mono text-foreground/80 leading-relaxed">{st.tip}</p>
                  </div>
                ))}
              </div>
            ),
          },
          {
            id: "resources",
            label: "Resources Used",
            icon: Star,
            content: (
              <ul className="space-y-1.5">
                {topper.resources.map((r, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    <span className="text-sm font-mono text-foreground/80">{r}</span>
                  </li>
                ))}
              </ul>
            ),
          },
        ].map(({ id, label, icon: Icon, content }) => (
          <div key={id} className="border-b border-border/60 last:border-0">
            <button
              onClick={() => toggle(id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-mono font-medium text-foreground">{label}</span>
              </div>
              {expandedSection === id ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            {expandedSection === id && (
              <div className="px-6 pb-5">{content}</div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Tips Grid */}
      <div>
        <p className="text-xs font-mono uppercase text-muted-foreground mb-4">Universal Topper Tips</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK_TIPS.map(({ icon: Icon, color, bg, border, title, tip }) => (
            <div key={title} className={`${bg} border ${border} rounded-xl p-4 space-y-2`}>
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <p className={`text-xs font-mono font-bold ${color}`}>{title}</p>
              </div>
              <p className="text-xs font-mono text-foreground/70 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
