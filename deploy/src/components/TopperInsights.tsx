import { useState, useMemo } from "react";
import { Star, BookOpen, Clock, TrendingUp, Award, ChevronDown, ChevronUp, Lightbulb, Target, Brain, Heart, Zap, Filter, GitCompare, Cpu } from "lucide-react";

interface Topper {
  name: string;
  rank: string;
  exam: string;
  examType: "NEET PG" | "INI-CET";
  college: string;
  quote: string;
  strategy: string[];
  subjectTips: { subject: string; tip: string }[];
  routine: string;
  resources: string[];
}

const TOPPERS: Topper[] = [
  {
    name: "Abhishek Singh",
    rank: "AIR 1",
    exam: "NEET PG 2024",
    examType: "NEET PG",
    college: "AIIMS New Delhi (MS Surgery)",
    quote: "NEET PG is not about reading everything — it's about mastering what's repeatedly asked. Pattern recognition over depth.",
    strategy: [
      "Did Marrow videos at 1.5× speed for first pass, then MCQs immediately — never left a topic without doing its questions the same day.",
      "Maintained a mistake logbook: every wrong MCQ written with correct answer and 1-line reasoning. Reviewed it every Sunday.",
      "Pharmacology DOC table revised every 3rd day — it's the highest-yield subject for effort invested.",
      "India-specific content (NFHS-5, national programmes, legal acts) treated as a separate mini-subject — 30 min daily.",
      "Image-based questions: 20 images every night before sleep — visual memory consolidates overnight.",
      "Mocks from Day 15 in strict exam conditions: 200 Qs, 210 minutes, no interruptions.",
      "Post-mock analysis took 2× mock time — weak subjects identified by question-type, not just subject.",
      "One rest day per week (Sunday afternoon) — non-negotiable. Burnout after Day 14 kills prep.",
    ],
    subjectTips: [
      { subject: "Medicine", tip: "Clinical vignettes dominate NEET PG — practice 'next best step' questions over pure recall. Build decision trees." },
      { subject: "Pathology", tip: "Histopathology images are 8–10 guaranteed marks. 20 slides daily — H&E pattern recognition is a skill." },
      { subject: "Pharmacology", tip: "DOC master table covers 70% of Pharma marks. Make it on Day 1 and revise every 3 days." },
      { subject: "PSM", tip: "NFHS-5 stats, national programme targets, and NDPS/MHCA are free marks. Write them 3 times — they stick." },
      { subject: "OBG", tip: "Flowcharts over reading. One-page flowchart each for APH, PPH, pre-eclampsia, Bishop score." },
      { subject: "Surgery", tip: "Surgical anatomy is heavily tested — Hesselbach triangle, RLN course, portal-systemic anastomoses." },
    ],
    routine: "5:30 AM wake → 30 min review previous day notes → 6:00 AM new topic (3 hrs) → 9:00 AM MCQ sprint (1 hr) → break → 11:00 AM topic continues → 2:00 PM rest (45 min, no screen) → 3:00 PM MCQ + weak areas → 6:00 PM India-specific content → 7:00 PM image review (20 images) → 8:00 PM mistake logbook → 9:00 PM write 5 high-yield points → 10:00 PM sleep",
    resources: ["Marrow (primary)", "Reflex MCQs", "DAMS test series", "'The World of Medicine' by Anoop Kumar", "NEET PG PYQ 2010–2024", "Handwritten mistake logbook"],
  },
  {
    name: "Priya Sharma",
    rank: "AIR 4",
    exam: "NEET PG 2024",
    examType: "NEET PG",
    college: "MAMC New Delhi (MD Medicine)",
    quote: "The exam tests elimination, not just recall. Master ruling out wrong options — that's where most marks are made or lost.",
    strategy: [
      "3-pass mock system: pass 1 = sure, pass 2 = probable, pass 3 = educated guess (never random).",
      "Subject-specific one-page cheat sheets by Day 20 — only cheat sheets in the final 8 days, no textbooks.",
      "Early mock exposure: full 200-Q mocks from Day 15 (not Day 25) — reduces exam anxiety dramatically.",
      "Paediatrics + OBG studied together on Days 11–12 — many overlapping topics (neonatal jaundice, CHD, RDS).",
      "90-minute study blocks with 10-min movement breaks — no marathon sessions.",
      "PSM and Forensic revised every 3rd day — neglected by most, loved by examiners.",
    ],
    subjectTips: [
      { subject: "Microbiology", tip: "Gram stain + morphology flashcards, 15 cards daily cycling. By Day 28 you've seen each 5+ times." },
      { subject: "Biochemistry", tip: "Enzyme kinetics and LSDs are guaranteed. 2 hours each — limited scope, high yield." },
      { subject: "Paediatrics", tip: "Developmental milestones every exam. Use '3-6-9-12-18-24 month' framework — never miss free marks." },
      { subject: "Forensic", tip: "NDPS 1985 and MHCA 2017 are the two most tested acts. 30 focused minutes is enough." },
    ],
    routine: "6:00 AM wake → 30 min exercise → 7:00 AM study (90-min blocks) → 1:00 PM lunch + 45-min rest → 2:30 PM MCQs → 5:00 PM weak area revision → 7:00 PM India content + legal acts → 8:30 PM cheat sheet writing → 9:30 PM sleep",
    resources: ["Marrow", "PrepLadder (Surgery + OBG)", "DAMS notes for PSM", "NEET PG PYQ analysis", "Handwritten cheat sheets"],
  },
  {
    name: "Karthik Nair",
    rank: "AIR 12",
    exam: "NEET PG 2023",
    examType: "NEET PG",
    college: "JIPMER Puducherry (MD Paediatrics)",
    quote: "I failed my first NEET PG attempt. The second time I stopped studying hard and started studying smart. Focus beats duration every time.",
    strategy: [
      "After first failure, did gap analysis: subject-wise score breakdown. Found 40% of errors were image questions. Fixed that first.",
      "Spaced repetition: Anki for image flashcards — 50 cards/day, 15-min daily review.",
      "Clinical vignettes: 'scan for buzzwords' technique — identify key clinical clue within 10 seconds of reading the stem.",
      "Mental health treated seriously: daily 30-min walk, weekly call with a friend, journaling every night.",
      "Did not study the day before exam — pure rest, light food. Brain consolidates better with rest than cramming.",
      "AIR 12 with 28 days focused prep, not 6 months scattered. Focus > duration.",
    ],
    subjectTips: [
      { subject: "Anatomy", tip: "Clinical anatomy (nerve injuries, surgical incisions, surface markings) is tested more than embryology depth." },
      { subject: "Physiology", tip: "Cardiac physiology (Frank-Starling, Wiggers diagram) and renal physiology (GFR, tubular function) are highest yield." },
      { subject: "Medicine", tip: "Autoimmune disease master table: disease → autoantibody → complement → treatment. One table = 10+ marks." },
      { subject: "ENT/Ophth", tip: "Often neglected but carry 15-20 marks. SNHL vs CSNHL, CSOM types, trachoma staging, Fuchs endothelial dystrophy." },
    ],
    routine: "6:30 AM wake → 20 min Anki image cards → 7:00 AM study block → 12:30 PM lunch + 30-min walk → 2:00 PM MCQs + weak area → 5:00 PM break → 5:30 PM India content → 7:00 PM evening block → 9:00 PM review errors + journal → 10:00 PM sleep",
    resources: ["Marrow", "Anki (image flashcards)", "NEET PG PYQ 2015–2023", "PrepLadder for Surgery", "DAMS for PSM", "YouTube channels for clinical cases"],
  },
  // ── 2025 / INI-CET new toppers ─────────────────────────────────────────────
  {
    name: "Siddharth Gupta",
    rank: "AIR 5",
    exam: "NEET PG 2025",
    examType: "NEET PG",
    college: "AIIMS Jodhpur (MD Psychiatry)",
    quote: "2025 questions are longer and more clinical. Don't read the whole stem first — read the last sentence first so you know what you're being asked, then scan for clues.",
    strategy: [
      "New technique for long stems: read the question ask (last sentence) first → identify what type of Q it is → read stem for the one key finding that answers it.",
      "2025 exam had heavier surgical anatomy and trauma management — practised ATLS algorithms and zones-of-neck injury daily.",
      "Official NMC curriculum topic list used as the primary filter — did not study any topic absent from the list.",
      "Recent drug approvals (2022–2024): new indications for semaglutide, tirzepatide, lecanemab, donanemab — treated this as a dedicated 2-hour block.",
      "Psychiatry revision daily even as a primary subject — DSM-5-TR criteria changes (prolonged grief disorder, ICD-11 divergence) are fresh exam fodder.",
      "Used AI chatbots to generate 10 custom 'vignette-style' questions on each topic after reading — better retention than re-reading notes.",
      "Final 7 days: 0 new topics. Only mock analysis, mistake logbook, and cheat-sheet revision.",
    ],
    subjectTips: [
      { subject: "Medicine", tip: "2025 heavily tested recent guidelines: AHA 2023 heart failure, ESC 2023 hypertension staging (140/90 threshold). Know updated cut-offs." },
      { subject: "Surgery", tip: "Trauma management (ATLS) and surgical anatomy dominated — know zones of neck, damage control surgery principles, FAST protocol." },
      { subject: "Pharmacology", tip: "New drug approvals 2022–2024 are exam-ready: semaglutide for obesity, lecanemab for Alzheimer's, RSV vaccines for elderly." },
      { subject: "Psychiatry", tip: "DSM-5-TR (2022) updates: prolonged grief disorder as new diagnosis, changes to autism terminology. ICD-11 vs DSM-5 differences tested." },
      { subject: "PSM", tip: "NFHS-5 data + National Health Policy 2017 targets vs actuals. Government schemes launched 2022–2024 (Ayushman Arogya Mandir)." },
    ],
    routine: "6:00 AM wake → 15 min previous-day recall (no notes, just memory) → 6:30 AM new topic (2.5 hrs) → 9:00 AM AI-generated custom Qs on that topic → 10:00 AM weak area MCQs → 1:00 PM lunch + rest → 2:30 PM image-based Qs (30 images) → 4:30 PM recent guidelines block → 6:00 PM exercise → 7:00 PM mock or topic revision → 9:30 PM mistake logbook → 10:30 PM sleep",
    resources: ["Marrow (all subjects)", "PrepLadder for Psychiatry", "NMC official topic list", "NEET PG PYQ 2015–2025", "AI chatbot for custom vignettes", "Recent guideline summaries (Marrow updates)"],
  },
  {
    name: "Rahul Dev",
    rank: "AIR 1",
    exam: "INI-CET June 2024",
    examType: "INI-CET",
    college: "AIIMS New Delhi (MD Radiodiagnosis)",
    quote: "INI-CET is an AIIMS exam at heart. It tests clinical reasoning, not recall. If you're memorising, you're preparing for the wrong exam.",
    strategy: [
      "INI-CET has NO negative marking — attempt every single question. Never leave a blank. Even a random guess has positive EV.",
      "200 questions in 3.5 hours = 63 sec/Q, but stems are longer — train with 90-sec/Q pacing to avoid panic.",
      "AIIMS-style reasoning: 'what is the most appropriate next step' — not 'what is correct in theory'. Hospital protocol matters.",
      "Image questions are 25–30% of the paper. Daily 30-image drill for 3 weeks builds pattern recognition that can't be crammed.",
      "Did full AIIMS PYQ banks (2005–2023) before any standard study material — know the AIIMS question style first.",
      "Cross-subject questions (e.g., microbiology + immunology, path + medicine) are INI-CET hallmarks — study with linkages, not in isolation.",
      "Radiology basics: chest X-ray interpretation, CT abdomen anatomy, MRI brain signals — guaranteed 8–10 marks across subjects.",
      "Grand rounds simulation: daily 1 case discussion with a peer, present diagnosis + management. Speaking it aloud cements clinical logic.",
    ],
    subjectTips: [
      { subject: "Medicine", tip: "AIIMS loves rare presentations of common diseases and common presentations of rare diseases. Read case reports in revision week." },
      { subject: "Radiology", tip: "Even non-radiology candidates need chest X-ray, CT patterns, bone tumour radiographs. 30-image daily drill for 2 weeks = 8–10 guaranteed marks." },
      { subject: "Pathology", tip: "Electron microscopy findings, IHC markers for tumours, and renal biopsy patterns are INI-CET favourites over basic histology." },
      { subject: "Microbiology", tip: "Immunity mechanisms (T-cell subtypes, cytokine functions, immunodeficiency patterns) tested heavily — AIIMS loves mechanism-based Qs." },
      { subject: "Surgery", tip: "Operative steps and surgical decision-making over anatomy. 'What do you do next in the OR?' type questions dominate." },
      { subject: "Biochemistry", tip: "Metabolic pathways and enzyme defects (LSDs, urea cycle disorders) — one full day of focused revision yields disproportionate marks at INI-CET." },
    ],
    routine: "6:00 AM wake → 30 min AIIMS PYQ analysis (5 Qs with full reasoning) → 7:00 AM new topic from Marrow (2 hrs) → 9:00 AM cross-subject MCQs → 11:00 AM image drill (30 Qs) → 1:00 PM lunch + 45-min rest → 2:30 PM clinical case discussion with peer → 4:30 PM weak area targeted revision → 7:00 PM radiology basics or grand rounds videos → 9:00 PM mistake logbook + 5 key points → 10:30 PM sleep",
    resources: ["Marrow + AIIMS PYQ bank (2005–2023)", "AIIMS-specific test series (Bhatia)", "Harrison's clinical summaries (not full chapters)", "Radiopaedia for image learning", "Robbins for IHC + EM findings", "Peer group case discussions"],
  },
  {
    name: "Ananya Krishnan",
    rank: "AIR 3",
    exam: "INI-CET Jan 2025",
    examType: "INI-CET",
    college: "AIIMS New Delhi (MD Medicine)",
    quote: "The Jan 2025 paper was heavier on basic sciences than any recent INI-CET. Those who neglected Biochemistry and Physiology paid for it.",
    strategy: [
      "Jan 2025 shift: Basic Sciences had 25–28% weightage — Biochemistry metabolic pathways, Physiology cardiac + renal back in focus. Do NOT skip preclinical.",
      "Used AI to simulate active recall: after reading a topic, I'd describe it to an AI assistant and ask for gaps in my explanation. Identified blind spots faster than any mock test.",
      "Hybrid Q-type drilling: made 'cross-subject cards' — e.g., a Biochemistry card with clinical correlation on back. INI-CET Q-setters love these bridges.",
      "Recent guidelines batch: dedicated 1 week only to 2023–2025 updates (AHA HF guidelines, updated WHO malaria treatment, new TB regimens). Paid off immediately.",
      "Group study 6–8 PM daily — one person presents a case, rest diagnose and manage. Made INI-CET's clinical scenario format feel familiar by exam day.",
      "Attempted AIIMS PYQ papers under strict timed conditions. No negative marking means your strategy should be 'speed + complete attempt' not caution.",
      "Self-audio recordings: recorded 3-minute summaries of each topic. Played them while walking. Passive absorption of high-yield points without screen fatigue.",
    ],
    subjectTips: [
      { subject: "Biochemistry", tip: "Jan 2025: LSDs, glycogen storage disorders, urea cycle defects tested with clinical presentations. One full day of focused revision — don't skip." },
      { subject: "Physiology", tip: "Cardiac output, Starling curves, renal tubular function (Tm concepts), respiratory mechanics — AIIMS tests mechanism not memorisation." },
      { subject: "Medicine", tip: "Updated guidelines (AHA 2023 HF, ESC 2023 AF, ACR 2022 SLE) — know new drug approvals + threshold changes that differ from older guidelines." },
      { subject: "Microbiology", tip: "Innate vs adaptive immunity distinctions, NK cell function, toll-like receptors, interferon types — INI-CET immunology is deep." },
      { subject: "PSM", tip: "New national health initiatives: Ayushman Arogya Mandir, U-WIN immunisation portal, PM-JAY expansion. Also WHO ICD-11 implementation timeline." },
      { subject: "Pharmacology", tip: "2023–2024 new approvals: lecanemab (Alzheimer's), donanemab, tirzepatide (obesity + T2DM), nirsevimab (RSV prevention in infants)." },
    ],
    routine: "6:30 AM wake → 15 min self-audio playback (previous topic summary) → 7:00 AM new topic study (2 hrs) → 9:00 AM explain topic back to AI / self-test → 10:00 AM MCQs → 12:30 PM lunch + walk → 2:00 PM guidelines / recent updates block → 4:00 PM image or cross-subject Qs → 6:00 PM peer case group → 8:00 PM mistake logbook + audio recording of today's topic → 9:30 PM read AIIMS PYQ 5-Q set → 10:30 PM sleep",
    resources: ["Marrow", "AIIMS PYQ 2005–Jan 2025 (Bhatia/Rohan Khandelwal)", "Radiopaedia + PathPresenter for images", "Robbins (IHC + EM sections only)", "Updated guidelines PDFs (AHA, ESC, WHO 2023–24)", "AI chatbot for active recall drills"],
  },
];

const QUICK_TIPS = [
  { icon: Brain, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", title: "The 80/20 Rule", tip: "80% of marks come from 20% of topics. Master Cardiology, Respiratory, Nephrology, Pathology basics, Obstetric emergencies, and India-specific content — you cover the exam spine." },
  { icon: Clock, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", title: "Time Per Question", tip: "Both NEET PG and INI-CET give ~63 sec/Q (210 min / 200 Qs). Train at 90-sec/Q to build a buffer for the longer clinical vignettes now appearing in 2025 exams." },
  { icon: Target, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", title: "Negative Marking Strategy", tip: "NEET PG: −0.25 per wrong. 3 options eliminated = attempt. INI-CET: NO negative marking — always attempt every question, never leave blank." },
  { icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", title: "Mock Score Trajectory", tip: "Don't panic at a 50% Day-1 score. Topper trajectory: Week 1 avg 55% → Week 2 avg 65% → Week 3 avg 72% → Week 4 avg 78%+. The learning curve is exponential." },
  { icon: Lightbulb, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", title: "The Mistake Logbook", tip: "Every wrong MCQ: write the correct answer + 1-line reason. Review Sunday mornings. This single habit accounts for more rank improvement than any other strategy." },
  { icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", title: "Burnout Prevention", tip: "One rest day per week is not optional — it is mandatory. Sleep 7 hours minimum. Brain consolidates memory during sleep, not during cramming. Sleeping IS studying." },
  { icon: Cpu, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", title: "AI-Assisted Active Recall", tip: "After reading a topic, explain it to an AI chatbot and ask: 'What gaps do you notice in my explanation?' It pinpoints blind spots faster than any mock test. 10 min/topic." },
  { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", title: "Read the Stem Backwards", tip: "For long 2025-style clinical vignettes: read the question ask (last sentence) first to know what you need to find, then scan the stem for only the relevant clue. Saves 15–20 sec/Q." },
  { icon: Filter, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", title: "2025 Guidelines Block", tip: "Dedicate 1 full week to recent updates (2022–2024): AHA HF, ESC AF, WHO malaria/TB, DSM-5-TR new diagnoses, new drug approvals. Fresh guidelines are exam-ready every cycle." },
];

const INICET_VS_NEETPG = [
  { feature: "Questions",         inicet: "200 Qs",                 neetpg: "200 Qs" },
  { feature: "Duration",          inicet: "3.5 hours (210 min)",    neetpg: "3.5 hours (210 min)" },
  { feature: "Negative Marking",  inicet: "NONE — attempt all",     neetpg: "−0.25 per wrong answer" },
  { feature: "Question Style",    inicet: "Clinical reasoning, AIIMS grand-rounds style",  neetpg: "Recall + clinical, shorter stems" },
  { feature: "Image Qs",          inicet: "~25–30% of paper",       neetpg: "~15–20% of paper" },
  { feature: "Basic Science Wt.", inicet: "Higher (~25–28%)",       neetpg: "Lower (~15%)" },
  { feature: "Frequency",         inicet: "Twice yearly (Jan + Jun)", neetpg: "Once yearly" },
  { feature: "PYQ Importance",    inicet: "AIIMS PYQ 2005+ essential", neetpg: "NEET PG PYQ 2010+ essential" },
  { feature: "Marking Scheme",    inicet: "+1 correct, 0 wrong",    neetpg: "+4 correct, −1 wrong" },
  { feature: "Top Source",        inicet: "Marrow + AIIMS PYQ + Bhatia series", neetpg: "Marrow + PrepLadder + DAMS" },
];

const SUBJECT_WEIGHTAGE = [
  { subject: "Medicine",     weight: 20, color: "#ff4d4d" },
  { subject: "Surgery",      weight: 14, color: "#c77dff" },
  { subject: "OBG",          weight: 11, color: "#f72585" },
  { subject: "Paediatrics",  weight: 9,  color: "#4cc9f0" },
  { subject: "PSM",          weight: 9,  color: "#8338ec" },
  { subject: "Pathology",    weight: 8,  color: "#fb8500" },
  { subject: "Pharmacology", weight: 7,  color: "#06d6a0" },
  { subject: "Microbiology", weight: 5,  color: "#ffb703" },
  { subject: "Anatomy",      weight: 5,  color: "#ff9f1c" },
  { subject: "Physiology",   weight: 5,  color: "#2ec4b6" },
  { subject: "Others",       weight: 7,  color: "#6c757d" },
];

type ExamFilter = "All" | "NEET PG" | "INI-CET";

export function TopperInsights() {
  const [examFilter, setExamFilter] = useState<ExamFilter>("All");
  const [activeTopper, setActiveTopper] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>("strategy");
  const [showComparison, setShowComparison] = useState(false);

  const filteredToppers = useMemo(
    () => examFilter === "All" ? TOPPERS : TOPPERS.filter(t => t.examType === examFilter),
    [examFilter]
  );

  const safeIdx = Math.min(activeTopper, filteredToppers.length - 1);
  const topper = filteredToppers[safeIdx];

  const toggle = (sec: string) =>
    setExpandedSection(prev => (prev === sec ? null : sec));

  const handleFilterChange = (f: ExamFilter) => {
    setExamFilter(f);
    setActiveTopper(0);
    setExpandedSection("strategy");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-yellow-500/20 p-2 rounded-lg">
          <Award className="w-5 h-5 text-yellow-400" />
        </div>
        <div>
          <h2 className="font-mono font-bold text-foreground uppercase tracking-wider text-sm">Topper Insights</h2>
          <p className="text-xs text-muted-foreground font-mono">Strategies from NEET PG &amp; INI-CET AIR toppers — updated 2025</p>
        </div>
      </div>

      {/* Exam Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-mono text-muted-foreground uppercase mr-1">Exam:</span>
        {(["All", "NEET PG", "INI-CET"] as ExamFilter[]).map(f => (
          <button
            key={f}
            onClick={() => handleFilterChange(f)}
            className={`px-3 py-1 text-[11px] font-mono rounded-full border transition-colors ${
              examFilter === f
                ? f === "INI-CET"
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50"
                  : f === "NEET PG"
                  ? "bg-violet-500/20 text-violet-300 border-violet-500/50"
                  : "bg-secondary text-secondary-foreground border-secondary"
                : "text-muted-foreground border-border hover:border-muted-foreground"
            }`}
          >
            {f}
            <span className="ml-1.5 text-[9px] opacity-60">
              {f === "All" ? TOPPERS.length : TOPPERS.filter(t => t.examType === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Subject Weightage Bar */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
        <p className="text-xs font-mono uppercase text-muted-foreground">NEET PG / INI-CET Subject Weightage (approx.)</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredToppers.map((t, i) => (
          <button
            key={`${t.name}-${t.exam}`}
            onClick={() => { setActiveTopper(i); setExpandedSection("strategy"); }}
            className={`text-left p-4 rounded-xl border-2 transition-all ${
              safeIdx === i
                ? t.examType === "INI-CET"
                  ? "border-cyan-500/60 bg-cyan-500/10"
                  : "border-yellow-500/60 bg-yellow-500/10"
                : "border-border bg-card hover:border-yellow-500/30"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-mono font-bold text-foreground text-sm truncate">{t.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5 leading-tight">{t.college}</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  t.examType === "INI-CET"
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}>{t.rank}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                  t.examType === "INI-CET"
                    ? "bg-cyan-500/10 text-cyan-400/80"
                    : "bg-violet-500/10 text-violet-400/80"
                }`}>{t.examType}</span>
              </div>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground mt-1.5">{t.exam}</p>
          </button>
        ))}
      </div>

      {/* Topper detail */}
      {topper && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Quote */}
          <div className={`px-6 py-5 border-b ${
            topper.examType === "INI-CET"
              ? "bg-cyan-500/5 border-cyan-500/20"
              : "bg-yellow-500/5 border-yellow-500/20"
          }`}>
            <div className="flex gap-3">
              <Star className={`w-4 h-4 shrink-0 mt-0.5 ${topper.examType === "INI-CET" ? "text-cyan-400" : "text-yellow-400"}`} />
              <p className="text-sm font-serif text-foreground/90 italic leading-relaxed">"{topper.quote}"</p>
            </div>
            <p className={`text-[10px] font-mono mt-2 ml-7 ${topper.examType === "INI-CET" ? "text-cyan-400" : "text-yellow-400"}`}>
              — {topper.name}, {topper.rank} {topper.exam}
            </p>
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
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${topper.examType === "INI-CET" ? "bg-cyan-400" : "bg-yellow-400"}`} />
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
      )}

      {/* Quick Tips Grid */}
      <div>
        <p className="text-xs font-mono uppercase text-muted-foreground mb-4">Universal Topper Tips — 2025 Edition</p>
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

      {/* INI-CET vs NEET PG Comparison */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <button
          onClick={() => setShowComparison(v => !v)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5">
            <GitCompare className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-mono font-medium text-foreground">INI-CET vs NEET PG — Key Differences</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 rounded ml-1">NEW</span>
          </div>
          {showComparison ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        {showComparison && (
          <div className="px-6 pb-5 overflow-x-auto">
            <table className="w-full text-[11px] font-mono min-w-[480px]">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left pb-2 pr-4 text-muted-foreground font-normal">Feature</th>
                  <th className="text-left pb-2 pr-4 font-bold text-cyan-400">INI-CET</th>
                  <th className="text-left pb-2 font-bold text-violet-400">NEET PG</th>
                </tr>
              </thead>
              <tbody>
                {INICET_VS_NEETPG.map((row, i) => (
                  <tr key={i} className="border-b border-border/30 last:border-0">
                    <td className="py-2 pr-4 text-muted-foreground">{row.feature}</td>
                    <td className={`py-2 pr-4 ${
                      row.feature === "Negative Marking" ? "text-emerald-400 font-bold" : "text-foreground/80"
                    }`}>{row.inicet}</td>
                    <td className={`py-2 ${
                      row.feature === "Negative Marking" ? "text-red-400" : "text-foreground/80"
                    }`}>{row.neetpg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
