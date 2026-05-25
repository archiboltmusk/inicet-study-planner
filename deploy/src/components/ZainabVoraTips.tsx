import { useState } from "react";
import {
  Sparkles, Star, BookOpen, Target, Brain, AlertTriangle,
  ChevronDown, ChevronUp, Flame, Heart, Trophy, Clock,
  Lightbulb, Shield, XCircle, Zap, Layers, Users, Phone,
  Moon, Coffee, BarChart2, CheckCircle2,
} from "lucide-react";

interface Tip { id: number; text: string; }

interface TipSection {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof BookOpen;
  color: string;
  borderColor: string;
  iconBg: string;
  tips: Tip[];
}

const QUOTES = [
  { text: "Consistency beats intensity. One hour daily for 100 days beats 10-hour cramming every weekend.", context: "On study habits" },
  { text: "Don't just read — recall. Active recall is the single most powerful revision tool you have.", context: "On revision" },
  { text: "Your rank is decided not by what you study, but by what you remember on exam day.", context: "On retention" },
  { text: "Surgery, Medicine, OBG, Paeds — these four subjects alone can give you 60% of your marks. Master them first.", context: "On priority" },
  { text: "Grand Tests are not just tests — they are simulations. Treat every GT like the real exam and analyse every mistake.", context: "On mock tests" },
  { text: "Don't avoid weak subjects — face them early, revise them more. Rank 1s are built on averages, not peak scores in favourites.", context: "On weak areas" },
  { text: "Read the explanation every single time — even for correct answers. That's how you stop guessing and start knowing.", context: "On MCQ practice" },
  { text: "Three revisions minimum before the exam. First read is understanding. Second is connection. Third is ownership.", context: "On revision cycles" },
  { text: "Your brain retains emotion. Attach a story, a mnemonic, a visual — make every fact stick personally.", context: "On memory" },
  { text: "The last 30 days are the great equaliser. Students who revise smartly in this window move 1000+ ranks.", context: "On final revision" },
  { text: "Distractions aren't the problem. The inability to return to work quickly after a distraction — that's the problem. Build the return habit.", context: "On focus" },
  { text: "Your phone is not the enemy. Your unmanaged relationship with it is. Design your environment before your willpower fails.", context: "On distractions" },
  { text: "Rank 1 is not about being the smartest person in the room. It's about being the most consistent person across 100 days.", context: "On rank 1" },
  { text: "A bad GT score is information, not an identity. What you do with the information decides your rank.", context: "On resilience" },
  { text: "You cannot think your way to rank 1. You have to act your way there, one session at a time.", context: "On action" },
];

const TIP_SECTIONS: TipSection[] = [
  {
    id: "ecosystem",
    title: "The Rank 1 Ecosystem",
    subtitle: "What each tool does — and what this app adds on top",
    icon: Layers,
    color: "text-sky-400",
    borderColor: "border-sky-500/30",
    iconBg: "bg-sky-500/20",
    tips: [
      { id: 1, text: "MARROW APP: Your primary content source. Video lectures, subject notes, high-yield points, and Marrow's own Reflex MCQ bank. Nothing replaces this. Use it for every R1 reading." },
      { id: 2, text: "REFLEX (Marrow's MCQ platform): The gold standard for MCQ practice. Do every Reflex subject test after each Marrow module. Target 70%+ accuracy before moving forward." },
      { id: 3, text: "CORE BTR (Zainab Vora): A 28-day structured blitz that converts reading into exam-ready application. Grand Tests are the most realistic NEET PG simulations available. Non-negotiable." },
      { id: 4, text: "THIS APP: Unifies all three timelines on one dashboard. Aligns Marrow revision days with BTR subjects so you reinforce the same topic simultaneously. Also adds predicted 2026 questions, image MCQs, ZV tips, and progress tracking." },
      { id: 5, text: "WHAT THIS APP CANNOT REPLACE: Marrow video lectures, Reflex's full question bank (~10,000 Qs), BTR's actual Grand Test environment, and your own handwritten notes. Use all four together." },
      { id: 6, text: "DAILY WORKFLOW: Morning → Marrow video (1 module) → Reflex MCQs on that module → Evening → BTR-aligned revision on this app → Night → Flashcards + this app's daily quiz. Repeat." },
      { id: 7, text: "GRAND TEST SUNDAYS: Skip Marrow video. Attempt GT in real exam conditions (silent room, full 3.5 hours, no phone). Spend Monday (buffer day) analysing every wrong answer in the mistake logbook." },
    ],
  },
  {
    id: "donts",
    title: "The Hard No's — What NOT to Do",
    subtitle: "These mistakes have cost thousands of students their rank",
    icon: XCircle,
    color: "text-red-400",
    borderColor: "border-red-500/30",
    iconBg: "bg-red-500/20",
    tips: [
      { id: 1,  text: "DON'T resource-hop. Marrow + Reflex + BTR is your complete stack. Adding Dams/PrepLadder/Across mid-prep creates confusion, not clarity." },
      { id: 2,  text: "DON'T read new topics after August 1. Zero new topics in August. Only revision and mock tests. Starting fresh reading in the final month is the single biggest rank killer." },
      { id: 3,  text: "DON'T pull all-nighters. Sleep is when memory consolidates. One all-nighter costs you 40% retention for the next 2 days. The maths is brutal." },
      { id: 4,  text: "DON'T skip Grand Tests even if 'not ready'. There is never a perfect time. A bad GT with full analysis is worth more than a week of reading." },
      { id: 5,  text: "DON'T study passively. Highlighting, re-reading, and watching videos without recall = zero retention. For every 30 minutes of input, spend 10 minutes on active recall (close the book, write what you remember)." },
      { id: 6,  text: "DON'T compare your daily schedule with other people's. Someone posting 16-hour study days is either lying, burning out, or studying ineffectively. Your 8 focused hours beats their 16 distracted hours." },
      { id: 7,  text: "DON'T use your phone in the study room. The mere presence of a smartphone on the desk reduces cognitive capacity by 10%, even if it's face-down and silent. Leave it in another room." },
      { id: 8,  text: "DON'T open Instagram/YouTube without a timer. Set 15 minutes, use it, then lock the app. Unregulated doom-scrolling hijacks dopamine — the same dopamine you need for sustained study motivation." },
      { id: 9,  text: "DON'T skip buffer days (post-GT rest days). They are recovery, not laziness. Overriding buffer days leads to compounding cognitive fatigue over 100 days." },
      { id: 10, text: "DON'T skip PSM and Forensic. Every year students skip these 'boring' subjects and lose 25–30 marks. These are formula-based, logical, and highly predictable — guaranteed rank boost." },
      { id: 11, text: "DON'T over-revise your comfortable subjects. Re-reading Pharmacology for the 5th time when you already score 80% = low return. Spend that time on your 45% subject." },
      { id: 12, text: "DON'T let one bad day become a bad week. Missing one day is fine. Guilt-spiralling into three days of no study is the real damage. Reset the next morning, not next week." },
      { id: 13, text: "DON'T eat junk food during high-stakes prep. Ultra-processed food causes post-meal cognitive fog (the 2 PM crash). Brain health = study performance." },
      { id: 14, text: "DON'T ignore exercise. 20 minutes of brisk walking increases BDNF (brain-derived neurotrophic factor) — literally makes your neurons grow and retain information better." },
      { id: 15, text: "DON'T change your strategy after seeing someone else's routine. The best strategy is the one you execute consistently. Switching mid-prep destroys momentum." },
      { id: 16, text: "DON'T read explanations only for wrong answers. 'Lucky correct' answers — where you guessed right — are your most dangerous blind spots. Read every explanation, every time." },
    ],
  },
  {
    id: "motivation",
    title: "Motivation & Distraction Control",
    subtitle: "How to keep the brain firing when the world pulls you away",
    icon: Zap,
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
    iconBg: "bg-amber-500/20",
    tips: [
      { id: 1,  text: "THE WHY ANCHOR: Write your reason for rank 1 in 3 sentences. Read it every morning before you open a book. When motivation dies — and it will — the 'why' keeps you going. Motivation is a feeling; discipline is a decision." },
      { id: 2,  text: "DOPAMINE BY DESIGN: Your brain seeks the easiest dopamine hit. Scrolling = instant dopamine. Studying = delayed dopamine. The fix: make studying the easiest path. Books on desk, phone in another room, before you even sit down." },
      { id: 3,  text: "THE 5-MINUTE RULE: On days you can't face studying, commit to just 5 minutes. Open the book, start reading. 90% of the time, you'll continue for an hour. Starting is the hardest part — make starting trivially easy." },
      { id: 4,  text: "STREAK PSYCHOLOGY: Track your daily study streak on this app. After 21 days, the streak itself becomes the motivation. Missing the streak feels worse than studying feels hard." },
      { id: 5,  text: "ENVIRONMENT OVER WILLPOWER: Redesign your study space. Every distraction object out of sight. A clean, dedicated desk signals your brain 'this is work mode.' Willpower is finite; environment is permanent." },
      { id: 6,  text: "THE ACCOUNTABILITY LAYER: Tell one person your daily goal every morning. Doesn't matter if they're a study partner or a parent. Social accountability adds a cost to quitting that willpower alone cannot." },
      { id: 7,  text: "DOPAMINE SCHEDULING: Study first. Social media after. Never use phone as a warm-up or mid-session break. Even 2 minutes of scrolling mid-session takes 23 minutes to fully regain deep focus." },
      { id: 8,  text: "THE PROGRESS PULL: Open your analytics page weekly. Seeing your weak heatmap turn green, your accuracy curve rise, your streak grow — this is a non-verbal argument for continuing. Progress is the best motivation." },
      { id: 9,  text: "REFRAME BAD DAYS: 'I can't study today' is rarely true. It usually means 'I don't feel like it today.' These are different things. Feelings are valid; they are not instructions. Study anyway, even if just for 2 hours." },
      { id: 10, text: "THE COMPARISON TRAP: Social media is a highlight reel. The person who posted 'just finished my 5th revision' is not telling you about the 3 days they didn't open a book. Protect your mental bandwidth — unfollow aggressively." },
      { id: 11, text: "WEEKLY MICRO-REWARDS: Every 7 days of completed targets, give yourself a pre-planned reward. Movie, food, call a friend. The reward must be pre-decided — not impulsive. Impulsive rewards become binges." },
      { id: 12, text: "THE RETURN HABIT: You will get distracted. Everyone does. The skill is not 'never get distracted' — it's 'how fast do you return?' Build the return habit: distraction → notice → close it → return to book. That's the whole loop." },
      { id: 13, text: "PROTECT SLEEP LIKE A RANK: 7 hours minimum. Sleep deprivation feels productive but is catastrophic — it reduces learning capacity by 40%, increases anxiety, and impairs the memory consolidation your revision depends on." },
      { id: 14, text: "MORNING ROUTINE AS ARMOUR: The first 30 minutes of your day sets the tone. No phone, no news, no social media. Read your WHY, drink water, open your book. This one habit protects the rest of the day." },
      { id: 15, text: "THE EXAM VISUALISATION: Every night before sleep, spend 2 minutes visualising exam day. You're seated, calm, reading question 1. You know the answer. Feel that confidence. The brain cannot distinguish vivid imagination from reality — use it." },
    ],
  },
  {
    id: "strategy",
    title: "Exam Strategy",
    subtitle: "Core BTR approach to cracking NEET PG",
    icon: Target,
    color: "text-blue-400",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    tips: [
      { id: 1, text: "Attempt Surgery, Medicine, OBG and Paeds first in the exam — highest weightage, highest confidence." },
      { id: 2, text: "Skip questions you genuinely don't know in the first pass. Come back with fresh eyes. Never guess randomly — NEET PG uses +4/−1 marking (25% penalty per wrong answer)." },
      { id: 3, text: "In the last 15 minutes, review only marked/skipped questions — don't re-examine answered ones." },
      { id: 4, text: "Aim for 160+ net correct to be in top 100. 145+ net gets you AIR < 500." },
      { id: 5, text: "Read all 4 options before marking — NEET PG loves 'most appropriate' over 'correct'. Second best can trap you." },
      { id: 6, text: "Image-based questions: read the clinical stem first, then look at the image. Never the other way." },
    ],
  },
  {
    id: "subject",
    title: "Subject-Wise Tips",
    subtitle: "Zainab maam's subject-specific approach",
    icon: BookOpen,
    color: "text-violet-400",
    borderColor: "border-violet-500/30",
    iconBg: "bg-violet-500/20",
    tips: [
      { id: 1,  text: "Surgery: Thompson's test (TA rupture), Duke's classification, Whipple indications, hernia anatomy. These repeat every year." },
      { id: 2,  text: "Medicine: TB (DOTs, DR-TB drugs), HIV (TLD regimen), Heart failure (4 pillars), Diabetes (SGLT2i indications) — non-negotiables." },
      { id: 3,  text: "OBG: Learn Bishop score numbers cold. PPH management sequence (Oxytocin → Ergometrine → Carboprost → B-Lynch). Never skip." },
      { id: 4,  text: "Paediatrics: Vaccine schedule is guaranteed marks. Development milestones with exact ages. NNF jaundice phototherapy thresholds." },
      { id: 5,  text: "PSM: Biostatistics formulae — sensitivity, specificity, PPV, NPV, NNT, AR, RR. Practise calculations, not just theory." },
      { id: 6,  text: "Microbiology: Culture media mnemonics save time. LJ medium, Thayer-Martin, CLED, Hoyle's — know what grows where." },
      { id: 7,  text: "Pharmacology: Organophosphate poisoning management, beta-blocker pharmacology, aminoglycoside toxicity — perpetual favourites." },
      { id: 8,  text: "Anatomy: Nerve injuries in fractures (axillary, radial, ulnar, peroneal) with their tests — 4-5 questions guaranteed." },
      { id: 9,  text: "Pathology: Neoplasia markers (PSA, AFP, CEA, CA-125), TB pathology stages, and amyloid staining — very high yield." },
      { id: 10, text: "ENT: Cholesteatoma (attic perforation, unsafe CSOM), Rinne and Weber test interpretation, and audiogram reading." },
      { id: 11, text: "Ophthalmology: Glaucoma (angle of anterior chamber, drugs), cataract types, retinal detachment — clinical image questions common." },
      { id: 12, text: "Radiology: Hampton's hump (PE), Rigler sign (pneumoperitoneum), Tree-in-bud (TB), Ground glass (COVID/PCP) — radiological patterns." },
    ],
  },
  {
    id: "revision",
    title: "Revision Techniques",
    subtitle: "How to retain what you study",
    icon: Brain,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    tips: [
      { id: 1, text: "First revision within 24 hours of studying — this is when forgetting is fastest. Even 15 minutes of recall halves forgetting." },
      { id: 2, text: "Use the '1-3-7-21 rule': revise on day 1, day 3, day 7, and day 21 after first study. This cements long-term memory." },
      { id: 3, text: "Write 3 one-liners from every chapter you finish. If you can't, you haven't understood it well enough." },
      { id: 4, text: "Teach it to yourself out loud. Feynman technique: if you can't explain it simply, you don't know it." },
      { id: 5, text: "Mistake logbook is your secret weapon. Every wrong answer in a GT deserves 5 minutes of root-cause analysis." },
      { id: 6, text: "During R2/R3/R4 cycles: prioritise your Grand Test mistake patterns, not fresh reading." },
      { id: 7, text: "Image recall: close your eyes and visualise the X-ray/slide. Mental imagery encodes faster than re-reading text." },
    ],
  },
  {
    id: "gt",
    title: "Grand Test (GT) Tips",
    subtitle: "Maximise every BTR GT attempt",
    icon: Trophy,
    color: "text-amber-400",
    borderColor: "border-amber-500/30",
    iconBg: "bg-amber-500/20",
    tips: [
      { id: 1, text: "Take every GT in real exam conditions — silent room, no phone, full 3.5 hours. Anything less is wasted practice." },
      { id: 2, text: "Post-GT analysis is more important than the score. Spend at least 2 hours reviewing every question you got wrong." },
      { id: 3, text: "Track your per-subject scores across GTs. If Surgery drops two GTs in a row — that's a signal, not a coincidence." },
      { id: 4, text: "Baseline GT: don't panic if the score is low. It's your starting point, not your ceiling." },
      { id: 5, text: "Target: improve net score by 5–7 marks per GT. Sustainable improvement beats one-off peaks." },
      { id: 6, text: "Integrated Systems Tests (GT16/17/18/19): treat them like subject-specific mocks. Systems thinking is exactly how NEET PG is set." },
    ],
  },
  {
    id: "time",
    title: "Time Management",
    subtitle: "Make every hour count",
    icon: Clock,
    color: "text-sky-400",
    borderColor: "border-sky-500/30",
    iconBg: "bg-sky-500/20",
    tips: [
      { id: 1, text: "6 AM–8 AM is peak recall time. Use it for hardest subjects (Surgery, Medicine) — not warm-up topics." },
      { id: 2, text: "Never study for more than 90 minutes without a 10-minute break. Cognitive capacity drops sharply beyond 90 minutes." },
      { id: 3, text: "Dedicate the last 30 minutes before sleep to flashcard review. Sleep consolidates memory — use it." },
      { id: 4, text: "Protect your weekends for full-length mocks and review. Do not use weekends for 'catching up' on reading." },
      { id: 5, text: "When a subject feels heavy, use the 2-minute rule: open the book and read for just 2 minutes. Starting beats not starting." },
    ],
  },
  {
    id: "mindset",
    title: "Mindset & Mental Health",
    subtitle: "The mental game of NEET PG",
    icon: Heart,
    color: "text-rose-400",
    borderColor: "border-rose-500/30",
    iconBg: "bg-rose-500/20",
    tips: [
      { id: 1, text: "Compare yourself only to yesterday's version of yourself. The leaderboard that matters is your own progress." },
      { id: 2, text: "One bad day is data, not destiny. Log it, learn from it, and show up tomorrow." },
      { id: 3, text: "Anxiety before GTs is normal — it means you care. Channel it into focus, not avoidance." },
      { id: 4, text: "Protect your sleep. 7 hours minimum. Sleep-deprived revision is 40% less effective — the maths doesn't work." },
      { id: 5, text: "Your family's sacrifice is visible to you every day. On the days you want to quit, remember why you started." },
      { id: 6, text: "Trust the Core BTR process. The schedule is designed by people who have seen thousands of toppers. Follow it with faith." },
      { id: 7, text: "Burnout is real. A planned rest day is not laziness — it is maintenance. A car without fuel cannot win a race." },
      { id: 8, text: "Call one friend or family member per week. Social isolation magnifies anxiety. Connection is not a distraction — it is fuel." },
    ],
  },
  {
    id: "biology",
    title: "Brain & Body Optimisation",
    subtitle: "Science-backed habits that directly improve study performance",
    icon: Moon,
    color: "text-indigo-400",
    borderColor: "border-indigo-500/30",
    iconBg: "bg-indigo-500/20",
    tips: [
      { id: 1, text: "SLEEP: Memory consolidation happens during NREM deep sleep (stages 3-4). Cutting sleep from 8h to 6h reduces memory retention by up to 40%. No revision technique compensates for sleep deficit." },
      { id: 2, text: "EXERCISE: 20 minutes of brisk walking 3x/week increases hippocampal volume — the brain region responsible for memory formation. Exercise is not taking time away from studying; it's multiplying the effect of studying." },
      { id: 3, text: "HYDRATION: Even 2% dehydration reduces working memory and attention. Keep 1L water on your desk. Drink before you feel thirsty — thirst is already a sign of deficit." },
      { id: 4, text: "FOOD TIMING: Avoid heavy carbs at lunch (2 PM crash is real — it's the post-lunch circadian dip compounded by a postprandial glucose fluctuation). Eat a protein-rich lunch. Keep study sessions at 2-3 PM lighter or use for MCQs, not new reading." },
      { id: 5, text: "SUNLIGHT: 10 minutes of morning sunlight sets your circadian clock, improves alertness, and boosts serotonin. Simple, free, and dramatically effective for mood and focus throughout the day." },
      { id: 6, text: "PHONE DISCIPLINE: iOS Screen Time / Android Digital Wellbeing — set daily limits. 'Downtime' mode from 10 PM to 6 AM. Remove social apps from home screen; friction reduces usage by 40%." },
      { id: 7, text: "CAFFEINE TIMING: Coffee 90 minutes after waking (not immediately) avoids the cortisol crash. Cut caffeine by 2 PM — caffeine half-life is 5-6 hours and will sabotage your sleep quality even if you 'fall asleep fine'." },
    ],
  },
  {
    id: "lastmonth",
    title: "Last Month Strategy",
    subtitle: "Aug 1–30: Final runway to rank 1",
    icon: Flame,
    color: "text-orange-400",
    borderColor: "border-orange-500/30",
    iconBg: "bg-orange-500/20",
    tips: [
      { id: 1, text: "No new topics after August 1st. Your brain needs consolidation, not new information overload." },
      { id: 2, text: "Full-length tests every alternate day in August. Review on off days. Never more than 2 consecutive rest days." },
      { id: 3, text: "Revise your personal mistake logbook — this document is worth more than any textbook in the final week." },
      { id: 4, text: "Keep a '100 high-yield one-liners' list ready for the final 48 hours. Just those 100 facts — nothing else." },
      { id: 5, text: "Exam eve (Aug 29): light revision only, sleep by 10 PM, exam-eve checklist in the app. Trust your preparation." },
      { id: 6, text: "Morning of exam: no new reading. Light snack, water, reach centre 30 min early. Your work is already done." },
    ],
  },
];

const DAILY_AFFIRMATIONS = [
  "Today I will complete my planned topics and not skip a single MCQ.",
  "I am building rank 1 habits one study session at a time.",
  "Every question I get wrong today is a question I will never get wrong again.",
  "I trust the Core BTR process. I show up. I follow the plan.",
  "My consistency today is my rank tomorrow.",
  "Hard days are when champions are made. I will not quit today.",
  "I revise with purpose. Every fact I recall today is a mark secured.",
  "Distractions are temporary. My rank is permanent. I choose focus.",
  "I do not need motivation. I need discipline — and I have it.",
  "Sleep, wake, study, revise. That is the entire formula. I commit to it today.",
  "I am not behind. I am exactly where today's effort places me. I start now.",
  "The exam does not know how I feel today. It only knows what I prepared. I prepared.",
  "Every hour of genuine focus I put in today is an hour no other student can take from me.",
  "I control my phone. My phone does not control me.",
];

// ─── Rank 1 Blueprint Banner ──────────────────────────────────────────────────

function Rank1Blueprint() {
  const tools = [
    { name: "Marrow App", role: "Primary content — videos, notes, HY points", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", icon: "📚" },
    { name: "Reflex",     role: "MCQ platform — 10,000+ Qs, detailed explanations", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/30", icon: "⚡" },
    { name: "Core BTR",   role: "Grand Tests + 28-day exam-ready blitz (fixed)", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", icon: "🏆" },
    { name: "This App",   role: "Unified tracker · predicted Qs · ZV tips · alignment", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", icon: "📱" },
  ];

  return (
    <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-500/10 to-sky-500/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="w-4 h-4 text-sky-400" />
        <p className="text-xs font-mono font-bold text-sky-400">The Rank 1 Stack — What Each Tool Does</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {tools.map(t => (
          <div key={t.name} className={`rounded-xl border px-3 py-2.5 ${t.bg}`}>
            <p className="text-sm mb-0.5">{t.icon}</p>
            <p className={`text-[10px] font-mono font-bold ${t.color}`}>{t.name}</p>
            <p className="text-[9px] font-mono text-muted-foreground leading-relaxed">{t.role}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-background/40 border border-border px-3 py-2.5">
        <p className="text-[10px] font-mono text-foreground/80 leading-relaxed">
          <span className="text-emerald-400 font-bold">Verdict:</span> Yes — Marrow + Reflex + BTR + this app is a complete rank-1 system. No other resource needed. The only variable is <span className="text-primary">your execution consistency</span>.
        </p>
      </div>
    </div>
  );
}

// ─── Distraction OS ───────────────────────────────────────────────────────────

function DistractionOS() {
  const steps = [
    { step: "Before sitting", action: "Phone in another room (not silent — another room). Fill water bottle. Open app to today's plan.", icon: Phone },
    { step: "First 25 min", action: "Deep work block. No switching, no checking. Timer on. This is where rank is built.", icon: Zap },
    { step: "5-min break", action: "Stand, walk, stretch. No phone. Your brain consolidates during breaks — protect them.", icon: Coffee },
    { step: "Repeat 4x", action: "4 × 25-min blocks = 2 hours of elite study. More effective than 6 hours of scattered reading.", icon: BarChart2 },
    { step: "After session", action: "Review: what did I cover? Write 3 one-liners. Now phone is earned.", icon: CheckCircle2 },
  ];

  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-amber-400" />
        <p className="text-xs font-mono font-bold text-amber-400">Daily Focus Protocol (Pomodoro for NEET PG)</p>
      </div>
      <div className="space-y-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex items-start gap-3 bg-background/30 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5 shrink-0 min-w-[80px]">
                <Icon className="w-3 h-3 text-amber-400/70" />
                <span className="text-[9px] font-mono text-amber-400/70">{s.step}</span>
              </div>
              <p className="text-[10px] font-mono text-foreground/80">{s.action}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ZainabVoraTips() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    ecosystem: true,
    donts: true,
    motivation: true,
  });
  const [quoteIndex]  = useState(() => Math.floor(Date.now() / 86400000) % QUOTES.length);
  const [affirmIndex] = useState(() => Math.floor(Date.now() / 86400000) % DAILY_AFFIRMATIONS.length);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const toggleSection = (id: string) =>
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));

  const displayedSections =
    activeFilter === "all" ? TIP_SECTIONS : TIP_SECTIONS.filter(s => s.id === activeFilter);

  const quote = QUOTES[quoteIndex];

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-pink-600/20 border border-blue-500/30 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="bg-yellow-500/20 p-2.5 rounded-xl shrink-0">
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-1">Core BTR NEET PG 2026</p>
            <h2 className="text-lg font-bold text-foreground">Zainab Vora Maam's Tips & Rank 1 Blueprint</h2>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              Strategy · What NOT to do · Motivation system · Brain optimisation
            </p>
          </div>
        </div>
      </div>

      {/* Rank 1 Blueprint */}
      <Rank1Blueprint />

      {/* Daily Quote */}
      <div className="bg-card border border-yellow-500/30 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -translate-y-16 translate-x-16 pointer-events-none" />
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider">Today's Wisdom</span>
        </div>
        <blockquote className="text-sm font-semibold text-foreground leading-relaxed mb-2">
          "{quote.text}"
        </blockquote>
        <p className="text-[10px] font-mono text-muted-foreground">— Zainab Vora · {quote.context}</p>
      </div>

      {/* Daily Affirmation */}
      <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-xl px-5 py-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Today's Affirmation</span>
        </div>
        <p className="text-sm text-foreground font-medium">{DAILY_AFFIRMATIONS[affirmIndex]}</p>
      </div>

      {/* Focus Protocol */}
      <DistractionOS />

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveFilter("all")}
          className={`text-[10px] font-mono px-3 py-1.5 rounded-full border transition-all ${
            activeFilter === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
          }`}
        >
          All
        </button>
        {TIP_SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveFilter(s.id)}
            className={`text-[10px] font-mono px-3 py-1.5 rounded-full border transition-all ${
              activeFilter === s.id
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            {s.title.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Tip Sections */}
      <div className="space-y-3">
        {displayedSections.map(section => {
          const Icon = section.icon;
          const isOpen = expandedSections[section.id] ?? false;
          return (
            <div key={section.id} className={`bg-card border rounded-xl overflow-hidden ${section.borderColor}`}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`p-2 rounded-lg shrink-0 ${section.iconBg}`}>
                    <Icon className={`w-4 h-4 ${section.color}`} />
                  </div>
                  <div className="text-left min-w-0">
                    <p className={`text-sm font-mono font-bold ${section.color}`}>{section.title}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{section.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono text-muted-foreground">{section.tips.length}</span>
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 space-y-2.5 border-t border-border/50 pt-4">
                  {section.tips.map((tip, i) => (
                    <div key={tip.id} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold mt-0.5 ${section.iconBg} ${section.color}`}>
                        {i + 1}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tip.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Wisdom Bank */}
      {activeFilter === "all" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
            <div className="bg-violet-500/20 p-1.5 rounded-lg">
              <Lightbulb className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-mono font-bold text-foreground">Wisdom Bank</p>
              <p className="text-[10px] font-mono text-muted-foreground">All quotes · one rotates daily above</p>
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {QUOTES.map((q, i) => (
              <div key={i} className={`px-5 py-4 ${i === quoteIndex ? "bg-yellow-500/5" : ""}`}>
                <p className="text-sm text-foreground leading-relaxed mb-1.5">"{q.text}"</p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  {q.context}
                  {i === quoteIndex && <span className="text-yellow-400 ml-2">← Today</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted/20 border border-border rounded-xl px-4 py-3">
        <p className="text-[10px] font-mono text-muted-foreground text-center">
          Strategies inspired by Core BTR NEET PG 2026 by Zainab Vora. The complete stack is Marrow + Reflex + BTR + this app. Execute consistently.
        </p>
      </div>
    </div>
  );
}
