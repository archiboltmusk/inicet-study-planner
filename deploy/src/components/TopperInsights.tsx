import { useState, useMemo } from "react";
import { Star, BookOpen, Clock, TrendingUp, Award, ChevronDown, ChevronUp, Lightbulb, Target, Brain, Heart, Zap, Filter, GitCompare, Cpu, FlaskConical, BookMarked, Stethoscope, Globe } from "lucide-react";

interface Topper {
  name: string;
  rank: string;
  exam: string;
  examType: "NEET PG" | "INI-CET" | "Educator";
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
    rank: "Core BTR Creator",
    exam: "NEET PG Educator",
    examType: "Educator",
    college: "Creator — Core BTR NEET PG Programme & Grand Test Series",
    quote: "Consistency beats intensity. One hour daily for 100 days beats 10-hour cramming every weekend. Your rank is built in the boring, invisible, daily sessions — not the dramatic all-nighters.",
    strategy: [
      "Use Marrow as your primary content source for every subject — videos, notes, high-yield points. Nothing replaces this for a structured first reading. Don't skip modules.",
      "Reflex MCQs are the gold standard MCQ platform. After each Marrow module, immediately do Reflex subject tests. Target 70%+ accuracy before moving to the next topic — never leave a topic without doing its questions the same day.",
      "Grand Tests are simulations, not tests. Treat every GT like the real exam: silent room, full 3.5 hours, no phone interruptions. Analyse every single mistake on the buffer day — this is where ranks are made.",
      "Maintain a personal mistake logbook — write every wrong MCQ with the correct answer and one-line reasoning. Review it every Sunday. This document is worth more than any textbook in the final week.",
      "Three revisions minimum before the exam. First read is understanding. Second is connection. Third is ownership. Students who do only one pass never fully consolidate.",
      "No new topics after August 1st. Your brain needs consolidation, not new overload. The last 30 days are the great equaliser — students who revise smartly in this window move 1000+ ranks.",
      "Image MCQs are 15–20 guaranteed marks. 20 images every night before sleep — visual pattern recognition consolidates overnight. Never skip the image section.",
      "Daily discipline beats motivation every time. You cannot think your way to Rank 1 — you have to act your way there, one session at a time.",
    ],
    subjectTips: [
      { subject: "High-Yield Priority", tip: "Surgery, Medicine, OBG, Paeds — master these four first. They carry 60% of marks. Don't spread effort equally across 19 subjects. Dominate the big four, then sweep the small ones." },
      { subject: "Pharmacology", tip: "DOC (Drug of Choice) master table covers the majority of Pharmacology marks. Build it on Day 1 and revise it every 3rd day. It is the highest-yield subject for effort invested." },
      { subject: "PSM & India Content", tip: "India-specific content — NFHS-5 stats, national programmes, legal acts (NDPS, MHCA) — treat this as a separate mini-subject. 30 focused minutes daily. These are nearly free marks for prepared students." },
      { subject: "Pathology & Images", tip: "Histopathology images are 8–10 guaranteed marks. 20 slides every night — H&E pattern recognition is a trainable skill, not inborn talent. Commit to it daily." },
      { subject: "MCQ Technique", tip: "Read the explanation every single time — even for correct answers. Lucky guesses are your biggest blind spot. That's how you stop guessing and start knowing." },
      { subject: "Weak Subjects", tip: "Don't avoid weak subjects — face them early, revise them more. Rank 1 is built on averages, not peak scores in your favourite subjects. A 45% in a weak subject costs more than a 90% in your favourite gains." },
    ],
    routine: "Morning → Marrow video (1 module) → Reflex MCQs on that module (same subject, same day) → Evening → Core BTR-aligned revision (this app's schedule) → Night → 20 image MCQs → Flashcards → Review mistake logbook → Write 5 high-yield points → Sleep by 10 PM → Sunday → GT in real exam conditions (full 3.5 hrs) → Monday (buffer) → Full mistake analysis",
    resources: [
      "Marrow App (primary content — video lectures + subject notes + HY points)",
      "Reflex MCQ Platform (gold standard — 10,000+ Qs with detailed explanations)",
      "Core BTR Grand Tests GT-4 through GT-8 (most realistic NEET PG simulations)",
      "Personal mistake logbook (handwritten — most valuable revision resource in final week)",
      "This app (aligns Marrow revision days with BTR subjects + predicted 2026 Qs + progress tracking)",
      "NEET PG PYQ 2010–2026 (pattern recognition for question framing)",
    ],
  },
];

const QUICK_TIPS = [
  { icon: Brain, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", title: "The 80/20 Rule", tip: "80% of marks come from 20% of topics. Master Cardiology, Respiratory, Nephrology, Pathology basics, Obstetric emergencies, and India-specific content — you cover the exam spine." },
  { icon: Clock, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", title: "Time Per Question", tip: "NEET PG: 210 min / 200 Qs = 63 sec/Q. INI-CET: 180 min / 200 Qs = 54 sec/Q — 15% less time. Train at 70-sec/Q for INI-CET to build a buffer for longer clinical vignettes." },
  { icon: Target, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", title: "Negative Marking Strategy", tip: "NEET PG: +4 correct, −1 wrong. INI-CET: +1 correct, −1/3 wrong. For INI-CET, eliminating even 1 option makes guessing EV-positive. Never leave a blank if you have any reasoning at all." },
  { icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", title: "Mock Score Trajectory", tip: "Don't panic at a 50% Day-1 score. Topper trajectory: Week 1 avg 55% → Week 2 avg 65% → Week 3 avg 72% → Week 4 avg 78%+. The learning curve is exponential." },
  { icon: Lightbulb, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", title: "The Mistake Logbook", tip: "Every wrong MCQ: write the correct answer + 1-line reason. Review Sunday mornings. This single habit accounts for more rank improvement than any other strategy." },
  { icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", title: "Burnout Prevention", tip: "One rest day per week is not optional — it is mandatory. Sleep 7 hours minimum. Brain consolidates memory during sleep, not during cramming. Sleeping IS studying." },
  { icon: Cpu, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", title: "AI-Assisted Active Recall", tip: "After reading a topic, explain it to an AI chatbot and ask: 'What gaps do you notice in my explanation?' It pinpoints blind spots faster than any mock test. 10 min/topic." },
  { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", title: "Read the Stem Backwards", tip: "For long 2025-style clinical vignettes: read the question ask (last sentence) first to know what you need to find, then scan the stem for only the relevant clue. Saves 15–20 sec/Q." },
  { icon: Filter, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", title: "2025 Guidelines Block", tip: "Dedicate 1 full week to recent updates (2022–2024): AHA HF, ESC AF, WHO malaria/TB, DSM-5-TR new diagnoses, new drug approvals. Fresh guidelines are exam-ready every cycle." },
];

const INICET_VS_NEETPG = [
  { feature: "Questions",         inicet: "200 Qs",                 neetpg: "200 Qs" },
  { feature: "Duration",          inicet: "3 hours (180 min)",      neetpg: "3.5 hours (210 min)" },
  { feature: "Negative Marking",  inicet: "−1/3 per wrong answer",  neetpg: "−1 per wrong answer" },
  { feature: "Question Style",    inicet: "Clinical reasoning, AIIMS grand-rounds style",  neetpg: "Recall + clinical, shorter stems" },
  { feature: "Image Qs",          inicet: "~25–30% of paper",       neetpg: "~15–20% of paper" },
  { feature: "Basic Science Wt.", inicet: "Higher (~25–28%)",       neetpg: "Lower (~15%)" },
  { feature: "Frequency",         inicet: "Twice yearly (Nov + May)", neetpg: "Once yearly" },
  { feature: "PYQ Importance",    inicet: "AIIMS PYQ 2005+ essential", neetpg: "NEET PG PYQ 2010+ essential" },
  { feature: "Marking Scheme",    inicet: "+1 correct, −1/3 wrong", neetpg: "+4 correct, −1 wrong" },
  { feature: "Top Source",        inicet: "Marrow + AIIMS PYQ + Bhatia series", neetpg: "Marrow + PrepLadder + DAMS" },
];

const TIPS_2026 = {
  newDrugs: [
    { name: "Resmetirom (Rezdiffra)", detail: "FDA Mar 2024. First approved drug for MASH (non-alcoholic steatohepatitis, now MASLD). Mechanism: thyroid hormone receptor-β agonist → ↓liver lipid synthesis. SYNERGY-NASH trial: fibrosis regression." },
    { name: "Suzetrigine (Journavx)", detail: "FDA Jan 2025. First selective NaV1.8 sodium channel blocker for acute moderate-severe pain. Non-opioid. MOA: peripherally selective pain pathway block." },
    { name: "Cobenfy (Xanomeline-Trospium)", detail: "FDA Sep 2024. First non-D2 receptor antipsychotic for schizophrenia. MOA: M1/M4 muscarinic agonist (central) + trospium blocks peripheral muscarinic side-effects." },
    { name: "Orforglipron", detail: "Oral non-peptide GLP-1 receptor agonist (Phase 3 2024). No refrigeration needed. ORFORTE trial showed −16% weight. Likely 2025 approval — exam-ready 2026." },
    { name: "Imetelstat (Ryzykua)", detail: "FDA Jun 2024. Telomerase inhibitor for transfusion-dependent low/int-1 MDS. First new MDS drug class in a decade." },
    { name: "Nirsevimab (Beyfortus)", detail: "RSV monoclonal antibody for neonates + infants. Not a vaccine — passive immunisation. 75% efficacy vs RSV hospitalisation. IAP India recommendations 2024." },
    { name: "Casgevy (Exa-cel)", detail: "FDA Dec 2023. First CRISPR-based gene therapy. Treats sickle cell disease + β-thalassaemia. MOA: Cas9 edits BCL11A enhancer → reactivates fetal haemoglobin (HbF)." },
    { name: "Donanemab (Kisunla)", detail: "FDA Jul 2024. Anti-amyloid antibody for early Alzheimer's. Targets N3pG-Aβ plaques. TRAILBLAZER-ALZ 2 trial: 35% slower cognitive decline vs placebo." },
  ],
  guidelines: [
    { title: "AHA/ACC 2024 AF Guidelines", key: "Updated rhythm control first approach in young/symptomatic AF. Catheter ablation now Class I (was IIa). Edoxaban added to NOACs for valvular AF (selective)." },
    { title: "ESC 2024 Heart Failure", key: "SGLT2i (dapagliflozin/empagliflozin) now Class I for HFpEF and HFmrEF — huge shift from 2021 guidelines. Know the 4 pillars of HFrEF treatment." },
    { title: "ADA 2025 Diabetes Standards", key: "GLP-1 agonists + SGLT2i as first-line for T2DM with CVD/CKD regardless of HbA1c. Tirzepatide added. Time-in-Range (TIR) > 70% as glycaemic target alongside HbA1c." },
    { title: "WHO 2024 TB Treatment", key: "BPaL regimen (bedaquiline + pretomanid + linezolid) for pre-XDR TB, 6 months. STREAMS trial. Nirmatrelvir-ritonavir interaction with bedaquiline — avoid concurrent use." },
    { title: "GINA 2024 Asthma", key: "Reliever-as-needed ICS-formoterol (anti-inflammatory reliever) replaces SABA alone in all tracks. No SABA-only prescriptions for any severity from 2024." },
    { title: "WHO MPOX PHEIC 2024", key: "Clade Ib MPOX declared WHO PHEIC August 2024. DRC + East Africa epicentre. Tecovirimat (TPOXX) for severe cases. Smallpox vaccine (ACAM2000/MVA-BN) cross-protective." },
    { title: "ICD-11 India Implementation 2026", key: "India transitioning from ICD-10 to ICD-11. Key changes: MAFLD → MASLD, new codes for Long COVID (RA02), autism reframed, gender incongruence moved from Mental Disorders to Sexual Health." },
    { title: "NMC CBME Curriculum 2.0", key: "Competency codes (PE, OG, SU, IM) and AETCOM modules now examinable. ECE (Early Clinical Exposure) concept, professionalism, medical ethics may appear as 2–3 Qs." },
  ],
  psmUpdates: [
    { topic: "One Health Framework", detail: "AMR, zoonoses, and environmental health as a unified lens. India AMR Action Plan 2017–21 (now 2025 update). Antimicrobial stewardship programmes in hospitals. H5N1 spillovers 2024–25." },
    { topic: "Climate Change & Health", detail: "PM2.5 WHO 2021 guidelines (annual 5 µg/m³, 24-hr 15 µg/m³ — stricter than India NAAQS). Heat-related illness protocol. LANCET Countdown report India data. New in PSM 2026." },
    { topic: "Digital Health India", detail: "ABDM (Ayushman Bharat Digital Mission) — ABHA ID, Health Facility Registry. e-Sanjeevani teleconsultation stats (200M+ sessions by 2025). NMC Telemedicine Guidelines 2020." },
    { topic: "NFHS-6 / SRS 2024 Data", detail: "If released: track IMR, MMR, TFR updates. NFHS-5 (2019-21) baseline: IMR 35, MMR 97, TFR 2.0. Expect updated figures — check Marrow updates block before exam." },
    { topic: "Ayushman Arogya Mandir", detail: "HWC rebranded to AAM 2023. Expanded package: OPD, diagnostics, mental health, oral health, palliative care. 1.7 lakh AAMs target by 2025. New primary health care model." },
    { topic: "India Hypertension Control Initiative", detail: "IHCI target: 75% hypertensives on treatment with BP controlled by 2025. Simple treatment protocol (amlodipine → amlodipine+losartan → triple). District-level tracking." },
  ],
  emergingTopics: [
    { topic: "AI in Medicine (Exam-Ready)", detail: "2–3 Qs expected in 2026 exams. Key concepts: diagnostic AI limitations (hallucinations, dataset bias), 'AI assists, physician decides' principle, FDA AI/ML software framework, chest X-ray AI performance." },
    { topic: "CRISPR & Gene Therapy", detail: "Casgevy (Cas9, BCL11A edit) for SCD + β-thal. Base editing vs prime editing distinction. FDA gene therapy approvals (Roctavian for Haemophilia A, Hemgenix for Haemophilia B). CAR-T expansion." },
    { topic: "GLP-1 Agonist Family", detail: "Full class: liraglutide (obesity/T2DM/CV), semaglutide SC (T2DM/obesity/CV — SELECT trial), oral semaglutide (T2DM), tirzepatide (dual GLP-1+GIP — T2DM/obesity/MASH/HFpEF), orforglipron (oral non-peptide, upcoming)." },
    { topic: "Long COVID (Post-COVID Syndrome)", detail: "WHO definition: ≥3 months after acute COVID, symptoms ≥2 months duration, not explained by another diagnosis. Common: fatigue, brain fog, POTS, breathlessness. NICE 2021/2024 rehab pathway tested." },
    { topic: "MASLD / MASH Nomenclature", detail: "Old NAFLD → MASLD (Metabolic dysfunction-Associated Steatotic Liver Disease). Old NASH → MASH. New 'lean MASLD' category. MASLD criteria: 5 cardiometabolic risk factors (any 1). Know steatotic liver disease umbrella." },
  ],
};

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

export function TopperInsights() {
  const [expandedSection, setExpandedSection] = useState<string | null>("strategy");
  const [showComparison, setShowComparison] = useState(false);
  const [active2026, setActive2026] = useState<string | null>("newDrugs");
  const topper = TOPPERS[0];
  const toggle = (sec: string) =>
    setExpandedSection(prev => (prev === sec ? null : sec));

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-amber-500/20 p-2 rounded-lg">
          <Award className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="font-mono font-bold text-foreground uppercase tracking-wider text-sm">Strategy &amp; Insights</h2>
          <p className="text-xs text-muted-foreground font-mono">Verified strategies from Zainab Vora (Core BTR) + exam data</p>
        </div>
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

      {/* Mentor card */}
      <div className="bg-amber-500/5 border border-amber-500/25 rounded-xl p-5 flex items-start gap-4">
        <div className="bg-amber-500/20 p-3 rounded-xl shrink-0">
          <Award className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <p className="font-mono font-bold text-foreground">{topper.name}</p>
          <p className="text-[11px] font-mono text-amber-400">{topper.rank}</p>
          <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{topper.college}</p>
        </div>
      </div>

      {/* Topper detail */}
      {topper && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Quote */}
          <div className="px-6 py-5 border-b bg-amber-500/5 border-amber-500/20">
            <div className="flex gap-3">
              <Star className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <p className="text-sm font-serif text-foreground/90 italic leading-relaxed">"{topper.quote}"</p>
            </div>
            <p className="text-[10px] font-mono mt-2 ml-7 text-amber-400">
              — {topper.name} · {topper.rank}
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
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${topper.examType === "INI-CET" ? "bg-cyan-400" : topper.examType === "Educator" ? "bg-amber-400" : "bg-yellow-400"}`} />
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

      {/* 2026 Special Tips */}
      <div className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border border-orange-500/30 rounded-xl overflow-hidden">
        {/* Section header */}
        <div className="px-6 py-4 border-b border-orange-500/20 flex items-center gap-3">
          <div className="bg-orange-500/20 p-1.5 rounded-lg">
            <Zap className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-mono font-bold text-orange-300 uppercase tracking-wider">2026 Exam Cycle — Special Intel</p>
            <p className="text-[10px] font-mono text-muted-foreground mt-0.5">New drugs, updated guidelines, emerging topics &amp; NMC changes</p>
          </div>
          <span className="ml-auto text-[9px] font-mono px-2 py-0.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">UPDATED 2026</span>
        </div>

        {/* Tab strip */}
        <div className="flex overflow-x-auto border-b border-orange-500/20 px-2 gap-1 py-2 shrink-0">
          {[
            { key: "newDrugs",       icon: FlaskConical,  label: "New Drugs" },
            { key: "guidelines",     icon: BookMarked,    label: "Guidelines" },
            { key: "psmUpdates",     icon: Globe,         label: "PSM 2026" },
            { key: "emergingTopics", icon: Stethoscope,   label: "Emerging Topics" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActive2026(prev => prev === key ? null : key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                active2026 === key
                  ? "bg-orange-500/20 text-orange-300 border border-orange-500/40"
                  : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              <Icon className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>

        {/* New Drugs */}
        {active2026 === "newDrugs" && (
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TIPS_2026.newDrugs.map((d, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-3 space-y-1.5">
                <p className="text-[11px] font-mono font-bold text-orange-300">{d.name}</p>
                <p className="text-[11px] font-mono text-foreground/70 leading-relaxed">{d.detail}</p>
              </div>
            ))}
          </div>
        )}

        {/* Guidelines */}
        {active2026 === "guidelines" && (
          <div className="p-5 space-y-3">
            {TIPS_2026.guidelines.map((g, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-3">
                <p className="text-[11px] font-mono font-bold text-cyan-300 mb-1">{g.title}</p>
                <p className="text-[11px] font-mono text-foreground/70 leading-relaxed">{g.key}</p>
              </div>
            ))}
          </div>
        )}

        {/* PSM Updates */}
        {active2026 === "psmUpdates" && (
          <div className="p-5 space-y-3">
            {TIPS_2026.psmUpdates.map((p, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-3">
                <p className="text-[11px] font-mono font-bold text-violet-300 mb-1">{p.topic}</p>
                <p className="text-[11px] font-mono text-foreground/70 leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        )}

        {/* Emerging Topics */}
        {active2026 === "emergingTopics" && (
          <div className="p-5 space-y-3">
            {TIPS_2026.emergingTopics.map((e, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-3">
                <p className="text-[11px] font-mono font-bold text-emerald-300 mb-1">{e.topic}</p>
                <p className="text-[11px] font-mono text-foreground/70 leading-relaxed">{e.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
