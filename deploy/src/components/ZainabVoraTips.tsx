import { useState } from "react";
import { Sparkles, Star, BookOpen, Target, Brain, AlertTriangle, ChevronDown, ChevronUp, Flame, Heart, Trophy, Clock, Lightbulb, Shield } from "lucide-react";

interface Tip {
  id: number;
  text: string;
}

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
];

const TIP_SECTIONS: TipSection[] = [
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
      { id: 2, text: "Skip questions you genuinely don't know in the first pass. Come back with fresh eyes. Never guess randomly with -1/3 marking." },
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
      { id: 1, text: "Surgery: Focus on Thompson's test (TA rupture), Duke's classification, Whipple indications, and hernia anatomy. These repeat every year." },
      { id: 2, text: "Medicine: TB (DOTs, DR-TB drugs), HIV (TLD regimen), Heart failure (4 pillars), Diabetes (SGLT2i indications) — non-negotiables." },
      { id: 3, text: "OBG: Learn Bishop score numbers cold. PPH management sequence (Oxytocin → Ergometrine → Carboprost → B-Lynch). Never skip." },
      { id: 4, text: "Paediatrics: Vaccine schedule is guaranteed marks. Development milestones with exact ages. NNF jaundice phototherapy thresholds." },
      { id: 5, text: "PSM: Biostatistics formulae — sensitivity, specificity, PPV, NPV, NNT, AR, RR. Practise calculations, not just theory." },
      { id: 6, text: "Microbiology: Culture media mnemonics save time. LJ medium, Thayer-Martin, CLED, Hoyle's — know what grows where." },
      { id: 7, text: "Pharmacology: Organophosphate poisoning management, beta-blocker pharmacology, aminoglycoside toxicity — perpetual favourites." },
      { id: 8, text: "Anatomy: Nerve injuries in fractures (axillary, radial, ulnar, peroneal) with their tests — 4-5 questions guaranteed." },
      { id: 9, text: "Pathology: Neoplasia markers (PSA, AFP, CEA, CA-125), TB pathology stages, and amyloid staining — very high yield." },
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
      { id: 6, text: "During Revision Cycle #2 (27 July–22 Aug): prioritise your Grand Test mistake patterns, not fresh reading." },
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
      { id: 4, text: "Baseline GT (GT-4): don't panic if the score is low. It's your starting point, not your ceiling." },
      { id: 5, text: "Target: improve net score by 5-7 marks per GT. Sustainable improvement beats one-off peaks." },
      { id: 6, text: "Integrated Systems Tests (16 & 23 June): treat them like subject-specific mocks. Systems thinking is exactly how NEET PG is set." },
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
    title: "Mindset & Motivation",
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
    ],
  },
  {
    id: "mistakes",
    title: "Common Mistakes to Avoid",
    subtitle: "What trips most students",
    icon: AlertTriangle,
    color: "text-red-400",
    borderColor: "border-red-500/30",
    iconBg: "bg-red-500/20",
    tips: [
      { id: 1, text: "Passive reading without MCQ practice is the #1 mistake. Read → Attempt → Recall. Not read → read again." },
      { id: 2, text: "Skipping PSM and Forensic because they 'feel less clinical'. These are 30+ easy marks — never skip them." },
      { id: 3, text: "Doing too many question banks without revision. Quality + review beats quantity. 500 MCQs reviewed > 2000 done without review." },
      { id: 4, text: "Studying 18 hours in panic phases. Sustainable 8–10 hours beats burnout cycles. Recovery days are not wasted days." },
      { id: 5, text: "Ignoring the explanation when you get a question right. 'Lucky correct' answers are your biggest blind spots." },
      { id: 6, text: "Starting fresh reading in the last 30 days. Revision only after July 27. No new topics in August." },
    ],
  },
  {
    id: "lastmonth",
    title: "Last Month Strategy",
    subtitle: "23 Aug – 30 Aug: Mega-NEET BTR phase",
    icon: Flame,
    color: "text-orange-400",
    borderColor: "border-orange-500/30",
    iconBg: "bg-orange-500/20",
    tips: [
      { id: 1, text: "No new topics after August 1st. Your brain needs consolidation, not new information overload." },
      { id: 2, text: "Mega-NEET BTR (23–30 Aug): do full-length tests every alternate day. Review on off days." },
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
];

export function ZainabVoraTips() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    strategy: true,
  });
  const [quoteIndex] = useState(() => Math.floor(Date.now() / 86400000) % QUOTES.length);
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
            <h2 className="text-lg font-bold text-foreground">Zainab Vora Maam's Tips & Motivation</h2>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              Strategies, subject tips, mindset, and exam wisdom — curated from Core BTR
            </p>
          </div>
        </div>
      </div>

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
            {s.title}
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
                  <span className="text-[10px] font-mono text-muted-foreground">{section.tips.length} tips</span>
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

      {/* All Quotes */}
      {activeFilter === "all" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2.5">
            <div className="bg-violet-500/20 p-1.5 rounded-lg">
              <Lightbulb className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-mono font-bold text-foreground">Wisdom Bank</p>
              <p className="text-[10px] font-mono text-muted-foreground">All quotes — one per day shown above</p>
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {QUOTES.map((q, i) => (
              <div key={i} className={`px-5 py-4 ${i === quoteIndex ? "bg-yellow-500/5" : ""}`}>
                <p className="text-sm text-foreground leading-relaxed mb-1.5">"{q.text}"</p>
                <p className="text-[10px] font-mono text-muted-foreground">{q.context} {i === quoteIndex && <span className="text-yellow-400 ml-1">← Today</span>}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted/20 border border-border rounded-xl px-4 py-3">
        <p className="text-[10px] font-mono text-muted-foreground text-center">
          Strategies inspired by Core BTR NEET PG 2026 program by Zainab Vora. Follow the schedule. Trust the process.
        </p>
      </div>
    </div>
  );
}
