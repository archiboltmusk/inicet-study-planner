import { safeLoad } from "@/lib/storage";
import { QUESTIONS } from "@/data/questions";
import { SPECIFIC_PYQS } from "@/data/pyqSpecific";
import { MISTAKE_STORAGE_KEY, type StoredEntry } from "@/lib/mistakeLogger";
import { REVISION_SCHEDULER_KEY, type ScheduledTopic } from "@/components/RevisionScheduler";

const PYQ_TO_SUBJECT: Record<string, string> = {
  "Medicine": "Medicine",
  "Surgery": "Surgery",
  "Pharmacology": "Pharmacology",
  "Physiology": "Physiology",
  "Biochemistry": "Biochemistry",
  "Pathology": "Pathology",
  "Anatomy": "Anatomy",
  "Microbiology": "Microbiology",
  "OBG": "OBG",
  "Paediatrics": "Paediatrics",
  "ENT/Ophthalmology": "ENT",
  "ENT": "ENT",
  "Ophthalmology": "Ophthalmology",
  "PSM/Community Medicine": "PSM",
  "PSM": "PSM",
  "Forensic Medicine": "Forensic Medicine",
  "Forensic": "Forensic Medicine",
  "Radiology": "Radiology",
  "Orthopaedics": "Orthopaedics",
  "Dermatology": "Dermatology",
  "Psychiatry": "Psychiatry",
  "Anaesthesia": "Anaesthesia",
};

export function calcAllMastery(subjects: readonly string[]): Record<string, number | null> {
  const pyqAttempts = safeLoad<Record<string, { selected: number; correct: boolean }>>("neetpg_pyq_attempts", {});
  const mistakes = safeLoad<StoredEntry[]>(MISTAKE_STORAGE_KEY, []);
  const revTopics = safeLoad<ScheduledTopic[]>(REVISION_SCHEDULER_KEY, []);
  const recentCutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

  // PYQ accuracy per canonical subject
  const pyqMap: Record<string, { correct: number; total: number }> = {};
  for (const q of QUESTIONS) {
    const canon = PYQ_TO_SUBJECT[q.subject];
    if (!canon) continue;
    const att = pyqAttempts[String(q.id)];
    if (!att) continue;
    if (!pyqMap[canon]) pyqMap[canon] = { correct: 0, total: 0 };
    pyqMap[canon].total++;
    if (att.correct) pyqMap[canon].correct++;
  }
  for (const q of SPECIFIC_PYQS) {
    const canon = PYQ_TO_SUBJECT[q.subject] ?? q.subject;
    if (!canon) continue;
    const att = pyqAttempts[q.id];
    if (!att) continue;
    if (!pyqMap[canon]) pyqMap[canon] = { correct: 0, total: 0 };
    pyqMap[canon].total++;
    if (att.correct) pyqMap[canon].correct++;
  }

  // SM-2 ease factor averages per subject
  const efMap: Record<string, { sum: number; count: number }> = {};
  for (const t of revTopics) {
    const canon = PYQ_TO_SUBJECT[t.subject] ?? t.subject;
    if (!efMap[canon]) efMap[canon] = { sum: 0, count: 0 };
    efMap[canon].sum += t.easeFactor;
    efMap[canon].count++;
  }

  // Mistake recency per subject
  const mkMap: Record<string, { total: number; recent: number }> = {};
  for (const m of mistakes) {
    const canon = PYQ_TO_SUBJECT[m.subject] ?? m.subject;
    if (!mkMap[canon]) mkMap[canon] = { total: 0, recent: 0 };
    mkMap[canon].total++;
    if (m.date >= recentCutoff) mkMap[canon].recent++;
  }

  const result: Record<string, number | null> = {};
  for (const subject of subjects) {
    const pyq = pyqMap[subject];
    const ef  = efMap[subject];
    const mk  = mkMap[subject];

    const pyqScore     = pyq?.total  > 0 ? pyq.correct / pyq.total : null;
    const efNorm       = ef?.count   > 0 ? (ef.sum / ef.count - 1.3) / (3 - 1.3) : null;
    const mistakeScore = mk?.total   > 0 ? 1 - mk.recent / mk.total : null;

    if (pyqScore === null && efNorm === null && mistakeScore === null) {
      result[subject] = null;
      continue;
    }

    let score = 0;
    let w = 0;
    if (pyqScore     !== null) { score += pyqScore                        * 0.55; w += 0.55; }
    if (efNorm       !== null) { score += Math.min(1, Math.max(0, efNorm)) * 0.25; w += 0.25; }
    if (mistakeScore !== null) { score += mistakeScore                     * 0.20; w += 0.20; }
    result[subject] = w > 0 ? Math.round((score / w) * 100) : null;
  }
  return result;
}
