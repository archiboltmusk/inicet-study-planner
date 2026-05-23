// Marrow NEET PG 2026 Study Schedule
// INI-CET May 2026: May 16 | NEET-PG 2026: Aug 30
// Revision subjects aligned day-for-day with Core BTR schedule for maximum complementarity.

export type MarrowPhase = 1 | 2 | 3 | 4 | 5;

export interface MarrowActivity {
  subject: string;          // display name
  hours: number;
  revision?: string;        // "R2" | "R3" | "R4"
  drillSubject?: string;    // maps to QUESTION_SUBJECTS
}

export interface MarrowDay {
  day: number;
  iso: string;              // "2026-05-23"
  label: string;            // "Sat, May 23"
  phase: MarrowPhase;
  isTest: boolean;
  testName?: string;
  isBuffer: boolean;
  isOpenRevision: boolean;  // Days 61-71, 74-99
  isExamDay: boolean;
  activities: MarrowActivity[];
}

function act(subject: string, hours: number, revision?: string): MarrowActivity {
  const map: Record<string, string> = {
    "Anatomy":            "Anatomy",
    "Biochemistry":       "Biochemistry",
    "Physiology":         "Physiology",
    "Pharmacology":       "Pharmacology",
    "Microbiology":       "Microbiology",
    "Pathology":          "Pathology",
    "Community Medicine": "PSM/Community Medicine",
    "Forensic Medicine":  "Forensic Medicine",
    "Ophthalmology":      "ENT/Ophthalmology",
    "ENT":                "ENT/Ophthalmology",
    "Medicine":           "Medicine",
    "Surgery":            "Surgery",
    "Paediatrics":        "Paediatrics",
    "OBG":                "OBG",
    "Orthopaedics":       "Surgery",
    "Dermatology":        "Medicine",
    "Psychiatry":         "Medicine",
    "Radiology":          "Medicine",
    "Anaesthesia":        "Medicine",
  };
  return { subject, hours, revision, drillSubject: map[subject] };
}

// ── Alignment note ────────────────────────────────────────────────────────────
// Core BTR subject order (fixed): Medicine → Surgery → Pathology → Pharmacology
// → OBG → Paediatrics → PSM → Microbiology → Forensic → Basic sciences
// Marrow revision days follow the same order every cycle so both resources
// reinforce the same subject simultaneously.

export const MARROW_SCHEDULE: MarrowDay[] = [
  // ── PHASE 1: First Revision + Grand Tests 16 & 17 (Days 1–23) ─────────────
  // BTR Day 1 = May 23 → Medicine (Cardiology)
  {
    day: 1, iso: "2026-05-23", label: "Sat, May 23", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Medicine", 12)],
  },
  // Grand Test 16 — LOCKED
  {
    day: 2, iso: "2026-05-24", label: "Sun, May 24", phase: 1,
    isTest: true, testName: "Grand Test 16", isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  // Buffer after GT16 — rest day
  {
    day: 3, iso: "2026-05-25", label: "Mon, May 25", phase: 1,
    isTest: false, isBuffer: true, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  // BTR Day 4 → Medicine (GI + Haem + Rheum) — continue Medicine
  {
    day: 4, iso: "2026-05-26", label: "Tue, May 26", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Medicine", 12)],
  },
  // BTR Day 5 → Surgery (GI Surgery + Hernias)
  {
    day: 5, iso: "2026-05-27", label: "Wed, May 27", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Surgery", 12)],
  },
  // BTR Day 6 → Surgery (Trauma) → transition to Pathology
  {
    day: 6, iso: "2026-05-28", label: "Thu, May 28", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Surgery", 5), act("Pathology", 7)],
  },
  // BTR Day 7–8 → Pathology → transition to Pharmacology
  {
    day: 7, iso: "2026-05-29", label: "Fri, May 29", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Pathology", 6), act("Pharmacology", 6)],
  },
  // BTR Day 9–10 → Pharmacology → transition to OBG
  {
    day: 8, iso: "2026-05-30", label: "Sat, May 30", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Pharmacology", 6), act("OBG", 6)],
  },
  // BTR Day 11–12 → OBG → transition to Paediatrics
  {
    day: 9, iso: "2026-05-31", label: "Sun, May 31", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("OBG", 6), act("Paediatrics", 6)],
  },
  // BTR Day 13–14 → Paediatrics → PSM
  {
    day: 10, iso: "2026-06-01", label: "Mon, Jun 1", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Paediatrics", 4), act("Community Medicine", 8)],
  },
  // BTR Day 15–16 → PSM → Microbiology
  {
    day: 11, iso: "2026-06-02", label: "Tue, Jun 2", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Community Medicine", 6), act("Microbiology", 6)],
  },
  // BTR Day 16–18 → Microbiology → Forensic
  {
    day: 12, iso: "2026-06-03", label: "Wed, Jun 3", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Microbiology", 8), act("Forensic Medicine", 4)],
  },
  // BTR Day 18 → Forensic → basic sciences
  {
    day: 13, iso: "2026-06-04", label: "Thu, Jun 4", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Forensic Medicine", 3), act("Biochemistry", 5), act("Physiology", 4)],
  },
  // Basic sciences continued
  {
    day: 14, iso: "2026-06-05", label: "Fri, Jun 5", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Physiology", 4), act("Anatomy", 8)],
  },
  // Anatomy + ENT/Ophthalmology
  {
    day: 15, iso: "2026-06-06", label: "Sat, Jun 6", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Anatomy", 4), act("ENT", 4), act("Ophthalmology", 4)],
  },
  // Grand Test 17 — LOCKED
  {
    day: 16, iso: "2026-06-07", label: "Sun, Jun 7", phase: 1,
    isTest: true, testName: "Grand Test 17", isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  // Buffer after GT17 — rest day
  {
    day: 17, iso: "2026-06-08", label: "Mon, Jun 8", phase: 1,
    isTest: false, isBuffer: true, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  // Miscellaneous subjects (Dermatology, Radiology, Psychiatry, Orthopaedics)
  {
    day: 18, iso: "2026-06-09", label: "Tue, Jun 9", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Dermatology", 3), act("Radiology", 4), act("Psychiatry", 3), act("Orthopaedics", 2)],
  },
  // Rapid cross-revision: Medicine + Surgery (BTR revision phase Day 19)
  {
    day: 19, iso: "2026-06-10", label: "Wed, Jun 10", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Medicine", 6), act("Surgery", 6)],
  },
  // Rapid cross-revision: Pathology + Pharmacology (BTR Day 20)
  {
    day: 20, iso: "2026-06-11", label: "Thu, Jun 11", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Pathology", 6), act("Pharmacology", 6)],
  },
  // Rapid cross-revision: OBG + Paediatrics (BTR Day 21)
  {
    day: 21, iso: "2026-06-12", label: "Fri, Jun 12", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("OBG", 6), act("Paediatrics", 6)],
  },
  // Rapid cross-revision: PSM + Microbiology (BTR Day 22)
  {
    day: 22, iso: "2026-06-13", label: "Sat, Jun 13", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Community Medicine", 6), act("Microbiology", 6)],
  },
  // Rapid cross-revision: Forensic + Basic sciences (BTR Day 23)
  {
    day: 23, iso: "2026-06-14", label: "Sun, Jun 14", phase: 1,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Forensic Medicine", 4), act("Biochemistry", 4), act("Physiology", 4)],
  },

  // ── PHASE 2: Second Revision R2 (Days 24–34) ─────────────────────────────
  // Same BTR subject order — now R2. Medicine first.
  {
    day: 24, iso: "2026-06-15", label: "Mon, Jun 15", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Medicine", 12, "R2")],
  },
  {
    day: 25, iso: "2026-06-16", label: "Tue, Jun 16", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Medicine", 4, "R2"), act("Surgery", 8, "R2")],
  },
  {
    day: 26, iso: "2026-06-17", label: "Wed, Jun 17", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Surgery", 4, "R2"), act("Pathology", 5, "R2"), act("Pharmacology", 3, "R2")],
  },
  {
    day: 27, iso: "2026-06-18", label: "Thu, Jun 18", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Pharmacology", 5, "R2"), act("OBG", 7, "R2")],
  },
  {
    day: 28, iso: "2026-06-19", label: "Fri, Jun 19", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("OBG", 5, "R2"), act("Paediatrics", 7, "R2")],
  },
  {
    day: 29, iso: "2026-06-20", label: "Sat, Jun 20", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Paediatrics", 4, "R2"), act("Community Medicine", 8, "R2")],
  },
  {
    day: 30, iso: "2026-06-21", label: "Sun, Jun 21", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Community Medicine", 4, "R2"), act("Microbiology", 8, "R2")],
  },
  {
    day: 31, iso: "2026-06-22", label: "Mon, Jun 22", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Microbiology", 4, "R2"), act("Forensic Medicine", 4, "R2"), act("Biochemistry", 4, "R2")],
  },
  {
    day: 32, iso: "2026-06-23", label: "Tue, Jun 23", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Biochemistry", 3, "R2"), act("Physiology", 5, "R2"), act("Anatomy", 4, "R2")],
  },
  {
    day: 33, iso: "2026-06-24", label: "Wed, Jun 24", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Anatomy", 3, "R2"), act("ENT", 4, "R2"), act("Ophthalmology", 3, "R2"), act("Dermatology", 2, "R2")],
  },
  {
    day: 34, iso: "2026-06-25", label: "Thu, Jun 25", phase: 2,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Dermatology", 2, "R2"), act("Radiology", 3, "R2"), act("Psychiatry", 2, "R2"), act("Orthopaedics", 3, "R2"), act("Medicine", 2, "R3")],
  },

  // ── PHASE 3: Third Revision R3 + INI-CET Recall + Grand Test 18 (Days 35–48) ─
  // Active days: 35, 36, 39, 40, 41, 42, 43, 46, 47, 48
  {
    day: 35, iso: "2026-06-26", label: "Fri, Jun 26", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Medicine", 7, "R3"), act("Surgery", 5, "R3")],
  },
  {
    day: 36, iso: "2026-06-27", label: "Sat, Jun 27", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Surgery", 4, "R3"), act("Pathology", 4, "R3"), act("Pharmacology", 4, "R3")],
  },
  // INI-CET Recall — LOCKED
  {
    day: 37, iso: "2026-06-28", label: "Sun, Jun 28", phase: 3,
    isTest: true, testName: "INI-CET Recall May 2026", isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  // Buffer after INI-CET — rest day
  {
    day: 38, iso: "2026-06-29", label: "Mon, Jun 29", phase: 3,
    isTest: false, isBuffer: true, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  {
    day: 39, iso: "2026-06-30", label: "Tue, Jun 30", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Pharmacology", 4, "R3"), act("OBG", 8, "R3")],
  },
  {
    day: 40, iso: "2026-07-01", label: "Wed, Jul 1", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("OBG", 4, "R3"), act("Paediatrics", 8, "R3")],
  },
  {
    day: 41, iso: "2026-07-02", label: "Thu, Jul 2", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Paediatrics", 4, "R3"), act("Community Medicine", 8, "R3")],
  },
  {
    day: 42, iso: "2026-07-03", label: "Fri, Jul 3", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Community Medicine", 4, "R3"), act("Microbiology", 8, "R3")],
  },
  {
    day: 43, iso: "2026-07-04", label: "Sat, Jul 4", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Microbiology", 4, "R3"), act("Forensic Medicine", 4, "R3"), act("Biochemistry", 4, "R3")],
  },
  // Grand Test 18 — LOCKED
  {
    day: 44, iso: "2026-07-05", label: "Sun, Jul 5", phase: 3,
    isTest: true, testName: "Grand Test 18", isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  // Buffer after GT18 — rest day
  {
    day: 45, iso: "2026-07-06", label: "Mon, Jul 6", phase: 3,
    isTest: false, isBuffer: true, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  {
    day: 46, iso: "2026-07-07", label: "Tue, Jul 7", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Biochemistry", 4, "R3"), act("Physiology", 8, "R3")],
  },
  {
    day: 47, iso: "2026-07-08", label: "Wed, Jul 8", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Physiology", 4, "R3"), act("Anatomy", 8, "R3")],
  },
  {
    day: 48, iso: "2026-07-09", label: "Thu, Jul 9", phase: 3,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Anatomy", 4, "R3"), act("ENT", 3, "R3"), act("Ophthalmology", 3, "R3"), act("Dermatology", 2, "R4")],
  },

  // ── PHASE 4: Fourth Revision R4 + Grand Tests 19 + National Mock (Days 49–73) ─
  // Active structured days: 49–57, 60. GT19 on 58, buffer 59. Days 61-71 open.
  {
    day: 49, iso: "2026-07-10", label: "Fri, Jul 10", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Medicine", 12, "R4")],
  },
  {
    day: 50, iso: "2026-07-11", label: "Sat, Jul 11", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Medicine", 5, "R4"), act("Surgery", 7, "R4")],
  },
  {
    day: 51, iso: "2026-07-12", label: "Sun, Jul 12", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Surgery", 4, "R4"), act("Pathology", 8, "R4")],
  },
  {
    day: 52, iso: "2026-07-13", label: "Mon, Jul 13", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Pathology", 4, "R4"), act("Pharmacology", 4, "R4"), act("OBG", 4, "R4")],
  },
  {
    day: 53, iso: "2026-07-14", label: "Tue, Jul 14", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("OBG", 5, "R4"), act("Paediatrics", 7, "R4")],
  },
  {
    day: 54, iso: "2026-07-15", label: "Wed, Jul 15", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Paediatrics", 4, "R4"), act("Community Medicine", 8, "R4")],
  },
  {
    day: 55, iso: "2026-07-16", label: "Thu, Jul 16", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Community Medicine", 4, "R4"), act("Microbiology", 8, "R4")],
  },
  {
    day: 56, iso: "2026-07-17", label: "Fri, Jul 17", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Microbiology", 4, "R4"), act("Forensic Medicine", 4, "R4"), act("Biochemistry", 4, "R4")],
  },
  {
    day: 57, iso: "2026-07-18", label: "Sat, Jul 18", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Biochemistry", 4, "R4"), act("Physiology", 4, "R4"), act("Anatomy", 4, "R4")],
  },
  // Grand Test 19 — LOCKED
  {
    day: 58, iso: "2026-07-19", label: "Sun, Jul 19", phase: 4,
    isTest: true, testName: "Grand Test 19", isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  // Buffer after GT19 — rest day
  {
    day: 59, iso: "2026-07-20", label: "Mon, Jul 20", phase: 4,
    isTest: false, isBuffer: true, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  {
    day: 60, iso: "2026-07-21", label: "Tue, Jul 21", phase: 4,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [act("Anatomy", 4, "R4"), act("ENT", 3, "R4"), act("Ophthalmology", 3, "R4"), act("Dermatology", 2, "R4")],
  },

  // Days 61-71: Open revision (self-directed weak areas)
  ...(Array.from({ length: 11 }, (_, i) => {
    const labels = ["Wed, Jul 22","Thu, Jul 23","Fri, Jul 24","Sat, Jul 25","Sun, Jul 26","Mon, Jul 27","Tue, Jul 28","Wed, Jul 29","Thu, Jul 30","Fri, Jul 31","Sat, Aug 1"];
    const isos   = ["2026-07-22","2026-07-23","2026-07-24","2026-07-25","2026-07-26","2026-07-27","2026-07-28","2026-07-29","2026-07-30","2026-07-31","2026-08-01"];
    return {
      day: 61 + i, iso: isos[i], label: labels[i], phase: 4 as MarrowPhase,
      isTest: false, isBuffer: false, isOpenRevision: true, isExamDay: false,
      activities: [],
    };
  })),

  // National NEET-PG Mock — LOCKED
  {
    day: 72, iso: "2026-08-02", label: "Sun, Aug 2", phase: 4,
    isTest: true, testName: "National NEET-PG Mock 2026", isBuffer: false, isOpenRevision: false, isExamDay: false,
    activities: [],
  },
  // Buffer after National Mock
  {
    day: 73, iso: "2026-08-03", label: "Mon, Aug 3", phase: 4,
    isTest: false, isBuffer: true, isOpenRevision: false, isExamDay: false,
    activities: [],
  },

  // ── PHASE 5: Final Runway + Exam Day (Days 74–100) ────────────────────────
  ...(Array.from({ length: 26 }, (_, i) => {
    const dayNum = 74 + i;
    const dayLabels = [
      "Tue, Aug 4","Wed, Aug 5","Thu, Aug 6","Fri, Aug 7","Sat, Aug 8","Sun, Aug 9",
      "Mon, Aug 10","Tue, Aug 11","Wed, Aug 12","Thu, Aug 13","Fri, Aug 14","Sat, Aug 15",
      "Sun, Aug 16","Mon, Aug 17","Tue, Aug 18","Wed, Aug 19","Thu, Aug 20","Fri, Aug 21",
      "Sat, Aug 22","Sun, Aug 23","Mon, Aug 24","Tue, Aug 25","Wed, Aug 26","Thu, Aug 27",
      "Fri, Aug 28","Sat, Aug 29",
    ];
    const isos = [
      "2026-08-04","2026-08-05","2026-08-06","2026-08-07","2026-08-08","2026-08-09",
      "2026-08-10","2026-08-11","2026-08-12","2026-08-13","2026-08-14","2026-08-15",
      "2026-08-16","2026-08-17","2026-08-18","2026-08-19","2026-08-20","2026-08-21",
      "2026-08-22","2026-08-23","2026-08-24","2026-08-25","2026-08-26","2026-08-27",
      "2026-08-28","2026-08-29",
    ];
    return {
      day: dayNum, iso: isos[i], label: dayLabels[i], phase: 5 as MarrowPhase,
      isTest: false, isBuffer: false, isOpenRevision: true, isExamDay: false,
      activities: [],
    };
  })),

  {
    day: 100, iso: "2026-08-30", label: "Sun, Aug 30", phase: 5,
    isTest: false, isBuffer: false, isOpenRevision: false, isExamDay: true,
    activities: [],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getTodayMarrowDay(): MarrowDay | null {
  const today = new Date();
  const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return MARROW_SCHEDULE.find(d => d.iso === iso) ?? null;
}

export const MARROW_PHASE_LABELS: Record<MarrowPhase, string> = {
  1: "Phase 1 · First Revision",
  2: "Phase 2 · R2",
  3: "Phase 3 · R3 + INI-CET Recall",
  4: "Phase 4 · R4 + Final Mock",
  5: "Phase 5 · Final Runway",
};

export const NEXT_TESTS = [
  { name: "Grand Test 16",            iso: "2026-05-24" },
  { name: "Grand Test 17",            iso: "2026-06-07" },
  { name: "INI-CET Recall May 2026",  iso: "2026-06-28" },
  { name: "Grand Test 18",            iso: "2026-07-05" },
  { name: "Grand Test 19",            iso: "2026-07-19" },
  { name: "National NEET-PG Mock",    iso: "2026-08-02" },
  { name: "NEET-PG 2026",             iso: "2026-08-30" },
];
