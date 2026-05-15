/**
 * Google Sheets PYQ importer.
 *
 * Reads a publicly published Google Sheet (CSV export) and merges its
 * questions into deploy/public/sheets-pyq.json.
 *
 * The sheet must be published to the web as CSV (File > Share > Publish to web,
 * choose "Comma-separated values") and have these columns in order:
 *
 *   subject | topic | question | option_a | option_b | option_c | option_d |
 *   correct_answer | explanation | mnemonic | year
 *
 * correct_answer must be 0–3 (index into the four options).
 *
 * Required env var:
 *   GOOGLE_SHEET_ID   the ID portion of the sheet URL
 *                     e.g. "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
 *
 * Optional:
 *   GOOGLE_SHEET_GID  sheet tab gid (default: 0, i.e. first tab)
 *
 * Usage:
 *   GOOGLE_SHEET_ID=xxx node import-pyq-sheets.mjs
 */

import { randomUUID } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir  = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dir, "..", "deploy", "public", "sheets-pyq.json");

// ─── CSV parser ───────────────────────────────────────────────────────────────
// Handles double-quoted fields (including fields containing commas and newlines).

function parseCSV(text) {
  const rows   = [];
  let   row    = [];
  let   field  = "";
  let   inQuote = false;

  for (let i = 0; i < text.length; i++) {
    const ch   = text[i];
    const next = text[i + 1];

    if (inQuote) {
      if (ch === '"' && next === '"') {
        // Escaped double-quote inside a quoted field
        field += '"';
        i++;
      } else if (ch === '"') {
        // End of quoted field
        inQuote = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuote = true;
      } else if (ch === ',') {
        row.push(field);
        field = "";
      } else if (ch === '\r' && next === '\n') {
        row.push(field);
        rows.push(row);
        row   = [];
        field = "";
        i++; // skip \n
      } else if (ch === '\n' || ch === '\r') {
        row.push(field);
        rows.push(row);
        row   = [];
        field = "";
      } else {
        field += ch;
      }
    }
  }

  // Final field/row
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

// ─── Column indices (0-based, matching the documented sheet layout) ───────────
const COL = {
  subject:        0,
  topic:          1,
  question:       2,
  option_a:       3,
  option_b:       4,
  option_c:       5,
  option_d:       6,
  correct_answer: 7,
  explanation:    8,
  mnemonic:       9,
  year:           10,
};

const VALID_DIFFICULTIES = ["easy", "medium", "hard"];
const KNOWN_SUBJECTS = new Set([
  "Medicine", "Surgery", "Pathology", "Pharmacology", "OBG", "Paediatrics",
  "PSM/Community Medicine", "Microbiology", "Forensic Medicine", "Anatomy",
  "Physiology", "Biochemistry", "ENT/Ophthalmology",
]);

// ─── Row → question object ────────────────────────────────────────────────────

function rowToQuestion(cols) {
  const subject        = (cols[COL.subject]        ?? "").trim();
  const topic          = (cols[COL.topic]          ?? "").trim();
  const question       = (cols[COL.question]       ?? "").trim();
  const option_a       = (cols[COL.option_a]       ?? "").trim();
  const option_b       = (cols[COL.option_b]       ?? "").trim();
  const option_c       = (cols[COL.option_c]       ?? "").trim();
  const option_d       = (cols[COL.option_d]       ?? "").trim();
  const correctRaw     = (cols[COL.correct_answer] ?? "").trim();
  const explanation    = (cols[COL.explanation]    ?? "").trim();
  const mnemonic       = (cols[COL.mnemonic]       ?? "").trim();
  const year           = (cols[COL.year]           ?? "").trim();

  // Skip rows that are clearly incomplete
  if (!question || !option_a || !option_b || !option_c || !option_d) return null;
  if (!subject) return null;

  const correctIndex = parseInt(correctRaw, 10);
  if (isNaN(correctIndex) || correctIndex < 0 || correctIndex > 3) return null;

  return {
    id:             randomUUID(),
    subject:        subject,
    topic:          topic || subject,
    question:       question,
    options:        [option_a, option_b, option_c, option_d],
    correct_answer: correctIndex,
    explanation:    explanation || null,
    mnemonic:       mnemonic   || null,
    key_concept:    null,
    difficulty:     "medium",   // sheets import doesn't carry difficulty; default to medium
    exam_hint:      year ? `PYQ ${year}` : null,
    is_image_based: false,
    image_type:     null,
    source:         "google_sheets",
    year:           year || null,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const gid     = process.env.GOOGLE_SHEET_GID ?? "0";

  if (!sheetId) {
    console.error("Error: GOOGLE_SHEET_ID environment variable is required.");
    console.error("Set it to the ID from your Google Sheets URL.");
    process.exit(1);
  }

  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  console.log(`\nGoogle Sheets PYQ Importer`);
  console.log(`Fetching: ${csvUrl}\n`);

  let csvText;
  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    csvText = await response.text();
  } catch (err) {
    console.error(`Failed to fetch sheet: ${err.message}`);
    console.error("Make sure the sheet is published to the web as CSV.");
    process.exit(1);
  }

  // ── Parse CSV ─────────────────────────────────────────────────────────────
  const allRows = parseCSV(csvText);
  if (allRows.length < 2) {
    console.error("Sheet appears empty or could not be parsed.");
    process.exit(1);
  }

  // First row is the header — skip it
  const dataRows = allRows.slice(1);
  console.log(`  Rows in sheet (excl. header): ${dataRows.length}`);

  // ── Convert rows to question objects ──────────────────────────────────────
  const importedNow = [];
  let skipped = 0;

  for (const row of dataRows) {
    // Skip entirely blank rows
    if (row.every(cell => cell.trim() === "")) continue;

    const q = rowToQuestion(row);
    if (q) {
      importedNow.push(q);
    } else {
      skipped++;
    }
  }

  console.log(`  Imported: ${importedNow.length}  |  Skipped (invalid): ${skipped}`);

  // Warn about unrecognised subjects so the user can fix typos in the sheet
  const unknownSubjects = [...new Set(
    importedNow
      .map(q => q.subject)
      .filter(s => !KNOWN_SUBJECTS.has(s))
  )];
  if (unknownSubjects.length > 0) {
    console.warn(`\n  Warning: unrecognised subjects (check spelling in sheet):`);
    unknownSubjects.forEach(s => console.warn(`    - "${s}"`));
  }

  // ── Merge with existing data (dedup by question text) ────────────────────
  let existing = [];
  if (existsSync(OUTPUT)) {
    try {
      const file = JSON.parse(readFileSync(OUTPUT, "utf8"));
      existing   = file.questions ?? [];
    } catch { /* ignore corrupt file */ }
  }

  // Build a set of already-imported question texts to avoid duplicates
  const existingTexts = new Set(existing.map(q => q.question.trim().toLowerCase()));
  const dedupedNew    = importedNow.filter(q =>
    !existingTexts.has(q.question.trim().toLowerCase())
  );

  const deduped = dedupedNew.length !== importedNow.length;
  if (deduped) {
    console.log(`  De-duplicated: ${importedNow.length - dedupedNew.length} already exist — skipped`);
  }

  const merged = [...dedupedNew, ...existing];

  // ── Write output ──────────────────────────────────────────────────────────
  const importedAt = new Date().toISOString();
  const output = {
    lastImported:  importedAt,
    totalCount:    merged.length,
    importedCount: dedupedNew.length,
    questions:     merged,
  };

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`\nWrote ${merged.length} PYQs to deploy/public/sheets-pyq.json`);
  console.log(`  (${dedupedNew.length} new this run)\n`);

  if (importedNow.length === 0) {
    console.error("No questions were imported. Check your sheet format.");
    process.exit(1);
  }
}

main().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
