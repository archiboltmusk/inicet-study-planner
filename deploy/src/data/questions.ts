import { z } from "zod";

export const QUESTION_SUBJECTS = [
  "Pharmacology",
  "Physiology",
  "Biochemistry",
  "Pathology",
  "Anatomy",
  "Microbiology",
  "Medicine",
  "Surgery",
  "OBG",
  "Paediatrics",
  "ENT/Ophthalmology",
  "PSM/Community Medicine",
  "Forensic Medicine",
] as const;

export type QuestionSubject = (typeof QUESTION_SUBJECTS)[number];

const QuestionSchema = z.object({
  id:          z.number().int().positive(),
  subject:     z.enum(QUESTION_SUBJECTS),
  stem:        z.string().min(5),
  options:     z.tuple([z.string(), z.string(), z.string(), z.string()]),
  answer:      z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  explanation: z.string().min(5),
});

export type Question = z.infer<typeof QuestionSchema>;

const RAW_QUESTIONS = [
  // ─── PHARMACOLOGY (18) ───────────────────────────────────────────────────
  {
    id: 1,
    subject: "Pharmacology",
    stem: "Drug of choice for absence seizures is:",
    options: ["Phenytoin", "Ethosuximide", "Carbamazepine", "Valproate"],
    answer: 1,
    explanation:
      "Ethosuximide is DOC for pure absence seizures; blocks T-type Ca²⁺ channels in thalamus. Valproate is used when absence coexists with other seizure types.",
  },
  {
    id: 2,
    subject: "Pharmacology",
    stem: "Which antiarrhythmic drug belongs to Vaughan Williams class IC?",
    options: ["Lidocaine", "Flecainide", "Amiodarone", "Sotalol"],
    answer: 1,
    explanation:
      "Class IC drugs (Flecainide, Propafenone) markedly slow conduction with minimal effect on repolarisation. Lidocaine is IB; Amiodarone is III; Sotalol is III (also beta-blocker).",
  },
  {
    id: 3,
    subject: "Pharmacology",
    stem: "Mechanism of action of metformin is:",
    options: [
      "Stimulation of pancreatic beta cells",
      "Activation of AMPK via inhibition of complex I of mitochondria",
      "Inhibition of alpha-glucosidase",
      "Blockade of SGLT-2 in proximal tubule",
    ],
    answer: 1,
    explanation:
      "Metformin inhibits mitochondrial complex I → reduces ATP/AMP ratio → activates AMPK → decreases hepatic gluconeogenesis. It does not stimulate insulin secretion.",
  },
  {
    id: 4,
    subject: "Pharmacology",
    stem: "Drug of choice for Pneumocystis jirovecii pneumonia (PCP) prophylaxis in HIV is:",
    options: [
      "Pentamidine",
      "Trimethoprim-sulfamethoxazole",
      "Atovaquone",
      "Dapsone",
    ],
    answer: 1,
    explanation:
      "TMP-SMX (co-trimoxazole) is DOC for both treatment and prophylaxis of PCP; started when CD4 count falls below 200 cells/µL.",
  },
  {
    id: 5,
    subject: "Pharmacology",
    stem: "Which aminoglycoside is used in the treatment of multidrug-resistant tuberculosis?",
    options: ["Gentamicin", "Tobramycin", "Amikacin", "Netilmicin"],
    answer: 2,
    explanation:
      "Amikacin (and streptomycin) are aminoglycosides used in MDR-TB regimens; amikacin resists more aminoglycoside-modifying enzymes than other members of the class.",
  },
  {
    id: 6,
    subject: "Pharmacology",
    stem: "The antidote for organophosphate poisoning that reactivates acetylcholinesterase is:",
    options: ["Atropine", "Pralidoxime (2-PAM)", "Physostigmine", "Neostigmine"],
    answer: 1,
    explanation:
      "Pralidoxime reactivates phosphorylated AChE if given before aging occurs. Atropine blocks muscarinic effects but does not reactivate the enzyme.",
  },
  {
    id: 7,
    subject: "Pharmacology",
    stem: "Which beta-blocker has intrinsic sympathomimetic activity (ISA)?",
    options: ["Metoprolol", "Atenolol", "Pindolol", "Propranolol"],
    answer: 2,
    explanation:
      "Pindolol (and acebutolol, oxprenolol) possess ISA, acting as partial agonists at beta receptors. This property reduces bradycardia and lipid effects at rest.",
  },
  {
    id: 8,
    subject: "Pharmacology",
    stem: "Drug of choice for Helicobacter pylori eradication in combination with a PPI is:",
    options: [
      "Amoxicillin + Metronidazole",
      "Clarithromycin + Amoxicillin",
      "Tetracycline + Ciprofloxacin",
      "Azithromycin + Tinidazole",
    ],
    answer: 1,
    explanation:
      "Standard triple therapy: PPI + Clarithromycin + Amoxicillin for 14 days. Clarithromycin-based regimens achieve >90% eradication in susceptible strains.",
  },
  {
    id: 9,
    subject: "Pharmacology",
    stem: "Mechanism of action of statins is:",
    options: [
      "Inhibition of lipoprotein lipase",
      "Activation of LDL receptors directly",
      "Inhibition of HMG-CoA reductase",
      "Inhibition of PCSK9",
    ],
    answer: 2,
    explanation:
      "Statins competitively inhibit HMG-CoA reductase (rate-limiting step in cholesterol synthesis), upregulating hepatic LDL receptors and reducing plasma LDL.",
  },
  {
    id: 10,
    subject: "Pharmacology",
    stem: "Which drug is the DOC for status epilepticus in adults?",
    options: [
      "Phenytoin IV",
      "Diazepam IV followed by phenytoin",
      "Lorazepam IV",
      "Phenobarbitone IV",
    ],
    answer: 2,
    explanation:
      "Lorazepam IV is the first-line agent for status epilepticus due to its longer duration of CNS action compared to diazepam. Phenytoin is used as second-line.",
  },
  {
    id: 11,
    subject: "Pharmacology",
    stem: "Which drug acts by inhibiting the Na⁺/K⁺/2Cl⁻ cotransporter (NKCC2) in the thick ascending limb of Henle?",
    options: ["Hydrochlorothiazide", "Furosemide", "Spironolactone", "Acetazolamide"],
    answer: 1,
    explanation:
      "Loop diuretics (furosemide, ethacrynic acid) block NKCC2 in the thick ascending limb, producing profound natriuresis. Thiazides block NCC in the distal tubule.",
  },
  {
    id: 12,
    subject: "Pharmacology",
    stem: "Reverse transcriptase inhibitor used in HIV that does NOT require phosphorylation to be active is:",
    options: ["Zidovudine", "Tenofovir", "Nevirapine", "Lamivudine"],
    answer: 2,
    explanation:
      "Non-nucleoside RTIs (NNRTIs) like Nevirapine bind directly to reverse transcriptase without intracellular phosphorylation, unlike NRTIs which are prodrugs requiring activation.",
  },
  {
    id: 13,
    subject: "Pharmacology",
    stem: "The DOC for prophylaxis of migraine is:",
    options: ["Sumatriptan", "Ergotamine", "Propranolol", "Paracetamol"],
    answer: 2,
    explanation:
      "Propranolol (beta-blocker) and topiramate are first-line prophylactic agents for migraine. Sumatriptan and ergotamine are abortive, not preventive, treatments.",
  },
  {
    id: 14,
    subject: "Pharmacology",
    stem: "Which drug is a selective serotonin-norepinephrine reuptake inhibitor (SNRI) used in diabetic neuropathy?",
    options: ["Amitriptyline", "Duloxetine", "Fluoxetine", "Mirtazapine"],
    answer: 1,
    explanation:
      "Duloxetine is an SNRI approved for diabetic peripheral neuropathic pain; it inhibits both serotonin and norepinephrine reuptake, modulating pain pathways.",
  },
  {
    id: 15,
    subject: "Pharmacology",
    stem: "Warfarin acts by inhibiting:",
    options: [
      "Thrombin directly",
      "Vitamin K epoxide reductase (VKORC1)",
      "Factor Xa directly",
      "Platelet glycoprotein IIb/IIIa",
    ],
    answer: 1,
    explanation:
      "Warfarin inhibits VKORC1, preventing recycling of vitamin K, thereby blocking gamma-carboxylation of factors II, VII, IX, X and proteins C and S.",
  },
  {
    id: 16,
    subject: "Pharmacology",
    stem: "Drug of choice for Clostridium difficile colitis (mild-moderate) is:",
    options: ["Metronidazole oral", "Vancomycin IV", "Fidaxomicin oral", "Vancomycin oral"],
    answer: 3,
    explanation:
      "Current guidelines recommend oral vancomycin (or fidaxomicin) as first-line for C. difficile infection; oral vancomycin is not absorbed and acts locally in the colon.",
  },
  {
    id: 17,
    subject: "Pharmacology",
    stem: "Which immunosuppressant inhibits calcineurin, thereby blocking IL-2 transcription?",
    options: ["Azathioprine", "Mycophenolate mofetil", "Cyclosporine", "Sirolimus"],
    answer: 2,
    explanation:
      "Cyclosporine (and tacrolimus) bind to cyclophilin (FK-binding protein for tacrolimus), inhibiting calcineurin → block NFAT dephosphorylation → reduce IL-2 production.",
  },
  {
    id: 18,
    subject: "Pharmacology",
    stem: "The 'cheese reaction' with MAO inhibitors is caused by excess:",
    options: ["Dopamine", "Tyramine", "Histamine", "Serotonin"],
    answer: 1,
    explanation:
      "MAO normally metabolises dietary tyramine in the gut. With MAO inhibition, tyramine accumulates, causing massive catecholamine release and hypertensive crisis.",
  },

  // ─── PHYSIOLOGY (12) ─────────────────────────────────────────────────────
  {
    id: 19,
    subject: "Physiology",
    stem: "The normal resting membrane potential of a cardiac ventricular myocyte is approximately:",
    options: ["-55 mV", "-70 mV", "-90 mV", "-110 mV"],
    answer: 2,
    explanation:
      "Ventricular myocytes have a resting membrane potential of approximately -90 mV, maintained mainly by the inward-rectifier K⁺ current (IK1).",
  },
  {
    id: 20,
    subject: "Physiology",
    stem: "Erythropoietin is primarily produced by which cells?",
    options: [
      "Hepatocytes",
      "Peritubular interstitial cells of the renal cortex",
      "Juxtaglomerular cells",
      "Bone marrow stromal cells",
    ],
    answer: 1,
    explanation:
      "~90% of EPO is produced by peritubular interstitial fibroblasts in the renal cortex in response to hypoxia via HIF-2α. The liver produces the remaining 10%.",
  },
  {
    id: 21,
    subject: "Physiology",
    stem: "The Hering-Breuer reflex is mediated by:",
    options: [
      "Central chemoreceptors in the medulla",
      "Slowly-adapting pulmonary stretch receptors via the vagus nerve",
      "Peripheral chemoreceptors in the carotid body",
      "J-receptors (juxtacapillary receptors)",
    ],
    answer: 1,
    explanation:
      "Slowly-adapting pulmonary stretch receptors (SARs) signal via the vagus nerve to terminate inspiration when the lung is sufficiently inflated — the Hering-Breuer reflex.",
  },
  {
    id: 22,
    subject: "Physiology",
    stem: "Which segment of the nephron is impermeable to water even in the presence of ADH?",
    options: [
      "Proximal convoluted tubule",
      "Descending limb of loop of Henle",
      "Thick ascending limb of loop of Henle",
      "Collecting duct",
    ],
    answer: 2,
    explanation:
      "The thick ascending limb (diluting segment) lacks aquaporins and is always water-impermeable, actively reabsorbing NaCl to create medullary hypertonicity.",
  },
  {
    id: 23,
    subject: "Physiology",
    stem: "Oxygen-haemoglobin dissociation curve is shifted to the RIGHT by:",
    options: [
      "Decreased temperature",
      "Decreased PCO₂",
      "Increased 2,3-DPG",
      "Increased pH",
    ],
    answer: 2,
    explanation:
      "Increased 2,3-DPG (also increased CO₂, decreased pH, increased temperature) shifts the curve right, decreasing Hb-O₂ affinity and promoting O₂ release to tissues.",
  },
  {
    id: 24,
    subject: "Physiology",
    stem: "The Frank-Starling mechanism states that:",
    options: [
      "Heart rate increases linearly with venous return",
      "Stroke volume increases with increased end-diastolic volume",
      "Contractility decreases with increased afterload",
      "Cardiac output is independent of preload",
    ],
    answer: 1,
    explanation:
      "Frank-Starling law: increased end-diastolic volume (preload) stretches sarcomeres to optimal overlap, increasing cross-bridge formation and thus stroke volume.",
  },
  {
    id: 25,
    subject: "Physiology",
    stem: "Which hormone triggers translocation of GLUT-4 vesicles to the plasma membrane in muscle and adipose tissue?",
    options: ["Glucagon", "Cortisol", "Insulin", "GLP-1"],
    answer: 2,
    explanation:
      "In the absorptive phase, insulin triggers translocation of GLUT-4 vesicles to the plasma membrane in muscle and adipose tissue, enabling glucose uptake independent of glucose concentration.",
  },
  {
    id: 26,
    subject: "Physiology",
    stem: "Dead space ventilation is best measured by:",
    options: [
      "Spirometry",
      "Bohr's equation using CO₂",
      "Peak flow meter",
      "Body plethysmography",
    ],
    answer: 1,
    explanation:
      "Bohr's equation (VD/VT = [PaCO₂ - PECO₂]/PaCO₂) calculates physiological dead space from arterial and mixed expired CO₂ tensions.",
  },
  {
    id: 27,
    subject: "Physiology",
    stem: "Aldosterone acts primarily on which segment of the nephron?",
    options: [
      "Proximal convoluted tubule",
      "Thick ascending limb",
      "Distal convoluted tubule and collecting duct",
      "Thin descending limb",
    ],
    answer: 2,
    explanation:
      "Aldosterone binds the mineralocorticoid receptor in the principal cells of the DT and collecting duct, upregulating ENaC and Na⁺/K⁺-ATPase to retain Na⁺ and excrete K⁺.",
  },
  {
    id: 28,
    subject: "Physiology",
    stem: "During the absolute refractory period of a nerve action potential, a second stimulus:",
    options: [
      "Produces a normal action potential",
      "Produces a subthreshold action potential",
      "Cannot generate an action potential regardless of stimulus strength",
      "Produces a larger-than-normal action potential",
    ],
    answer: 2,
    explanation:
      "During the absolute refractory period, all fast Na⁺ channels are inactivated; no stimulus, however strong, can generate a second action potential.",
  },
  {
    id: 29,
    subject: "Physiology",
    stem: "The P50 of normal adult haemoglobin (HbA) is approximately:",
    options: ["16 mmHg", "26 mmHg", "36 mmHg", "46 mmHg"],
    answer: 1,
    explanation:
      "P50 (PO₂ at 50% Hb saturation) for HbA is ~26 mmHg at pH 7.4, 37 °C. Fetal HbF has a lower P50 (~20 mmHg), favouring O₂ transfer from mother to fetus.",
  },
  {
    id: 30,
    subject: "Physiology",
    stem: "The Cushing reflex (response to raised intracranial pressure) consists of:",
    options: [
      "Tachycardia, hypotension, and irregular breathing",
      "Hypertension, bradycardia, and irregular breathing",
      "Tachycardia, hypertension, and deep breathing",
      "Hypotension, bradycardia, and apnoea",
    ],
    answer: 1,
    explanation:
      "Cushing's triad: hypertension (to maintain cerebral perfusion), reflex bradycardia (baroreceptor response), and irregular (Cheyne-Stokes) respirations — a sign of impending herniation.",
  },

  // ─── BIOCHEMISTRY (10) ────────────────────────────────────────────────────
  {
    id: 31,
    subject: "Biochemistry",
    stem: "Deficiency of glucose-6-phosphate dehydrogenase (G6PD) leads to haemolysis because:",
    options: [
      "The glycolytic pathway is blocked",
      "NADPH production is reduced, impairing glutathione reduction",
      "Heme synthesis is impaired",
      "ATP production in red cells falls below critical levels",
    ],
    answer: 1,
    explanation:
      "G6PD generates NADPH via the pentose phosphate pathway. NADPH is essential for regenerating reduced glutathione (GSH) that protects RBCs from oxidative damage.",
  },
  {
    id: 32,
    subject: "Biochemistry",
    stem: "Which enzyme is deficient in Gaucher's disease?",
    options: [
      "Sphingomyelinase",
      "Hexosaminidase A",
      "Glucocerebrosidase (acid beta-glucosidase)",
      "Alpha-L-iduronidase",
    ],
    answer: 2,
    explanation:
      "Gaucher's disease: deficiency of glucocerebrosidase → accumulation of glucocerebroside in macrophages. Classic 'crinkled tissue paper' cytoplasm on histology.",
  },
  {
    id: 33,
    subject: "Biochemistry",
    stem: "Homocystinuria due to cystathionine beta-synthase deficiency is treated with:",
    options: [
      "Vitamin B12 supplementation",
      "High-dose pyridoxine (Vitamin B6)",
      "Biotin supplementation",
      "Thiamine supplementation",
    ],
    answer: 1,
    explanation:
      "About 50% of CBS-deficient patients respond to high-dose pyridoxine (B6), which is a cofactor for cystathionine beta-synthase, reducing plasma homocysteine levels.",
  },
  {
    id: 34,
    subject: "Biochemistry",
    stem: "Rate-limiting enzyme of cholesterol synthesis is:",
    options: [
      "Squalene synthase",
      "HMG-CoA reductase",
      "Mevalonate kinase",
      "Lanosterol synthase",
    ],
    answer: 1,
    explanation:
      "HMG-CoA reductase (3-hydroxy-3-methylglutaryl-CoA reductase) is the rate-limiting, regulated step converting HMG-CoA to mevalonate; target of statins.",
  },
  {
    id: 35,
    subject: "Biochemistry",
    stem: "Lesch-Nyhan syndrome is caused by deficiency of:",
    options: [
      "Adenosine deaminase",
      "Hypoxanthine-guanine phosphoribosyltransferase (HGPRT)",
      "Xanthine oxidase",
      "Purine nucleoside phosphorylase",
    ],
    answer: 1,
    explanation:
      "HGPRT deficiency (X-linked) causes purine salvage pathway failure → uric acid overproduction → gout, self-mutilation, choreoathetosis, and intellectual disability.",
  },
  {
    id: 36,
    subject: "Biochemistry",
    stem: "Which vitamin is a cofactor for pyruvate dehydrogenase complex?",
    options: [
      "Vitamin B12",
      "Vitamin B1 (Thiamine/TPP)",
      "Vitamin B3 (Niacin)",
      "Vitamin B7 (Biotin)",
    ],
    answer: 1,
    explanation:
      "Pyruvate dehydrogenase requires TPP (B1), lipoic acid, CoA (B5), FAD (B2), and NAD⁺ (B3). Thiamine is the classic deficiency causing PDH dysfunction in alcoholics.",
  },
  {
    id: 37,
    subject: "Biochemistry",
    stem: "The enzyme deficient in phenylketonuria (PKU) is:",
    options: [
      "Tyrosinase",
      "Phenylalanine hydroxylase",
      "Homogentisate oxidase",
      "Fumarylacetoacetate hydrolase",
    ],
    answer: 1,
    explanation:
      "PKU: deficiency of phenylalanine hydroxylase (or its cofactor BH4) → phenylalanine accumulates → intellectual disability, seizures, musty odour, fair skin.",
  },
  {
    id: 38,
    subject: "Biochemistry",
    stem: "Biotin is a cofactor for which of the following enzymes?",
    options: [
      "Pyruvate dehydrogenase",
      "Pyruvate carboxylase",
      "Alpha-ketoglutarate dehydrogenase",
      "Transketolase",
    ],
    answer: 1,
    explanation:
      "Biotin is the cofactor for carboxylase enzymes: pyruvate carboxylase, acetyl-CoA carboxylase, propionyl-CoA carboxylase, and methylcrotonyl-CoA carboxylase.",
  },
  {
    id: 39,
    subject: "Biochemistry",
    stem: "Which lipoprotein has the highest triglyceride content?",
    options: ["LDL", "HDL", "Chylomicrons", "IDL"],
    answer: 2,
    explanation:
      "Chylomicrons (synthesised in intestinal enterocytes) transport dietary triglycerides from the gut to peripheral tissues and are >85% triglyceride by weight.",
  },
  {
    id: 40,
    subject: "Biochemistry",
    stem: "In McArdle's disease (glycogen storage disease type V), the deficient enzyme is:",
    options: [
      "Glucose-6-phosphatase",
      "Lysosomal alpha-1,4-glucosidase (acid maltase)",
      "Muscle glycogen phosphorylase",
      "Debranching enzyme",
    ],
    answer: 2,
    explanation:
      "McArdle's: muscle glycogen phosphorylase deficiency → inability to mobilise glycogen in muscle → exercise-induced cramps, myoglobinuria, no rise in venous lactate with exercise.",
  },

  // ─── PATHOLOGY (12) ──────────────────────────────────────────────────────
  {
    id: 41,
    subject: "Pathology",
    stem: "Reed-Sternberg cells are characteristic of:",
    options: [
      "Non-Hodgkin lymphoma",
      "Hodgkin's lymphoma",
      "Multiple myeloma",
      "Burkitt's lymphoma",
    ],
    answer: 1,
    explanation:
      "Reed-Sternberg cells — large binucleate/multinucleate cells with 'owl-eye' nucleoli — are pathognomonic of Hodgkin lymphoma, expressing CD15 and CD30.",
  },
  {
    id: 42,
    subject: "Pathology",
    stem: "The most common type of Hodgkin's lymphoma is:",
    options: [
      "Nodular sclerosis",
      "Mixed cellularity",
      "Lymphocyte predominant",
      "Lymphocyte depleted",
    ],
    answer: 0,
    explanation:
      "Nodular sclerosis HL (~70% of cases) is the most common subtype, characterised by collagen bands and lacunar RS cell variants; predominates in young women.",
  },
  {
    id: 43,
    subject: "Pathology",
    stem: "Virchow's triad for thrombosis includes all EXCEPT:",
    options: [
      "Endothelial injury",
      "Stasis of blood flow",
      "Hypercoagulability",
      "Increased fibrinolysis",
    ],
    answer: 3,
    explanation:
      "Virchow's triad: endothelial injury, abnormal blood flow (stasis/turbulence), and hypercoagulability. Increased fibrinolysis is actually protective against thrombosis.",
  },
  {
    id: 44,
    subject: "Pathology",
    stem: "Which type of necrosis is characteristic of tuberculosis?",
    options: [
      "Liquefactive necrosis",
      "Coagulative necrosis",
      "Caseous necrosis",
      "Fat necrosis",
    ],
    answer: 2,
    explanation:
      "Caseous necrosis (cheese-like, amorphous, eosinophilic debris) is the hallmark of TB granulomas; it represents a combination of coagulative and liquefactive necrosis.",
  },
  {
    id: 45,
    subject: "Pathology",
    stem: "The most common tumor marker elevated in hepatocellular carcinoma is:",
    options: [
      "CEA",
      "CA-125",
      "Alpha-fetoprotein (AFP)",
      "CA 19-9",
    ],
    answer: 2,
    explanation:
      "AFP is the primary tumour marker for HCC; levels >400 ng/mL in a patient with cirrhosis are diagnostic. AFP is also elevated in yolk sac (endodermal sinus) tumours.",
  },
  {
    id: 46,
    subject: "Pathology",
    stem: "Lewy bodies (alpha-synuclein inclusions) are seen in:",
    options: [
      "Alzheimer's disease",
      "Parkinson's disease",
      "Huntington's disease",
      "Multiple sclerosis",
    ],
    answer: 1,
    explanation:
      "Lewy bodies are intracytoplasmic eosinophilic inclusions composed of aggregated alpha-synuclein; found in dopaminergic neurons of the substantia nigra in Parkinson's disease.",
  },
  {
    id: 47,
    subject: "Pathology",
    stem: "Which mutation is the most common in colorectal carcinoma?",
    options: ["BRCA1", "APC gene mutation", "RET proto-oncogene", "VHL gene"],
    answer: 1,
    explanation:
      "APC (adenomatous polyposis coli) mutation is the earliest and most common event in sporadic colorectal carcinoma (~80%), initiating the adenoma-to-carcinoma sequence.",
  },
  {
    id: 48,
    subject: "Pathology",
    stem: "Amyloid in Alzheimer's disease is composed of:",
    options: [
      "Tau protein",
      "Beta-2 microglobulin",
      "Amyloid beta (Aβ) peptide",
      "Transthyretin",
    ],
    answer: 2,
    explanation:
      "Senile plaques in AD consist of extracellular Aβ peptide (from APP cleavage by beta- and gamma-secretases). Neurofibrillary tangles contain hyperphosphorylated tau.",
  },
  {
    id: 49,
    subject: "Pathology",
    stem: "The tumor marker CA-125 is most useful for monitoring:",
    options: [
      "Breast carcinoma",
      "Hepatocellular carcinoma",
      "Ovarian serous carcinoma",
      "Prostate carcinoma",
    ],
    answer: 2,
    explanation:
      "CA-125 is elevated in ~80% of advanced ovarian serous carcinomas; it is used primarily for monitoring treatment response and detecting recurrence, not as a screening test.",
  },
  {
    id: 50,
    subject: "Pathology",
    stem: "Mallory-Denk bodies (Mallory's hyaline) are found in:",
    options: [
      "Viral hepatitis",
      "Alcoholic hepatitis",
      "Primary biliary cholangitis",
      "Autoimmune hepatitis",
    ],
    answer: 1,
    explanation:
      "Mallory-Denk bodies — eosinophilic cytoplasmic inclusions of aggregated cytokeratin 8/18 — are characteristic of (but not exclusive to) alcoholic hepatitis.",
  },
  {
    id: 51,
    subject: "Pathology",
    stem: "Philadelphia chromosome t(9;22) results in the fusion gene:",
    options: ["PML-RARA", "BCR-ABL1", "EWS-FLI1", "SYT-SSX"],
    answer: 1,
    explanation:
      "t(9;22) creates the BCR-ABL1 fusion gene encoding a constitutively active tyrosine kinase; found in >95% of CML and ~25% of adult ALL. Targeted by imatinib.",
  },
  {
    id: 52,
    subject: "Pathology",
    stem: "Psammoma bodies are seen in all of the following EXCEPT:",
    options: [
      "Papillary thyroid carcinoma",
      "Serous ovarian carcinoma",
      "Meningioma",
      "Follicular thyroid carcinoma",
    ],
    answer: 3,
    explanation:
      "Psammoma bodies (concentric calcified laminations) are NOT a feature of follicular thyroid carcinoma. They are characteristic of papillary thyroid carcinoma, meningioma, and serous ovarian carcinoma.",
  },

  // ─── ANATOMY (10) ────────────────────────────────────────────────────────
  {
    id: 53,
    subject: "Anatomy",
    stem: "Injury to the radial nerve in the spiral groove of the humerus causes:",
    options: [
      "Wrist drop and loss of finger extension",
      "Claw hand",
      "Ape thumb deformity",
      "Erb's palsy pattern",
    ],
    answer: 0,
    explanation:
      "Radial nerve palsy at the spiral groove causes wrist drop (loss of wrist extensors), finger drop (loss of extensor digitorum), but spares elbow extension and brachioradialis.",
  },
  {
    id: 54,
    subject: "Anatomy",
    stem: "The artery of Adamkiewicz (arteria radicularis magna) most commonly arises from:",
    options: [
      "T1-T4 segmental arteries",
      "T9-L2 segmental arteries (usually left side)",
      "Lumbar arteries L3-L5",
      "Internal iliac artery",
    ],
    answer: 1,
    explanation:
      "The artery of Adamkiewicz is the dominant anterior radicular artery supplying the thoracolumbar spinal cord; arises from a left intercostal/lumbar artery at T9-L2.",
  },
  {
    id: 55,
    subject: "Anatomy",
    stem: "The boundaries of the femoral triangle are:",
    options: [
      "Inguinal ligament (superior), sartorius (medial), adductor longus (lateral)",
      "Inguinal ligament (superior), sartorius (lateral), adductor longus (medial)",
      "Poupart's ligament (inferior), rectus femoris (medial), iliopsoas (lateral)",
      "Inguinal ligament (superior), rectus femoris (lateral), adductor magnus (medial)",
    ],
    answer: 1,
    explanation:
      "Femoral triangle: inguinal ligament (superior), medial border of sartorius (lateral), medial border of adductor longus (medial). Contents (lateral to medial): femoral Nerve, Artery, Vein, Inguinal canal (NAVI).",
  },
  {
    id: 56,
    subject: "Anatomy",
    stem: "The facial nerve (CN VII) exits the skull through:",
    options: [
      "Foramen ovale",
      "Jugular foramen",
      "Stylomastoid foramen",
      "Foramen spinosum",
    ],
    answer: 2,
    explanation:
      "CN VII exits the skull through the stylomastoid foramen. It then passes through the parotid gland before dividing into temporal, zygomatic, buccal, marginal mandibular, and cervical branches.",
  },
  {
    id: 57,
    subject: "Anatomy",
    stem: "The nerve most commonly injured in anterior dislocation of the shoulder is:",
    options: [
      "Radial nerve",
      "Median nerve",
      "Axillary nerve",
      "Musculocutaneous nerve",
    ],
    answer: 2,
    explanation:
      "The axillary nerve (C5,C6) winds around the surgical neck of the humerus and is the most commonly injured nerve in shoulder dislocation and proximal humerus fractures.",
  },
  {
    id: 58,
    subject: "Anatomy",
    stem: "The 'unhappy triad' (O'Donoghue's triad) of the knee involves injury to:",
    options: [
      "ACL, PCL, and medial meniscus",
      "ACL, MCL, and medial meniscus",
      "ACL, LCL, and lateral meniscus",
      "PCL, MCL, and lateral meniscus",
    ],
    answer: 1,
    explanation:
      "The unhappy triad (valgus stress with knee in flexion, common in football): ACL + MCL + medial meniscus tears. The MCL and medial meniscus are interconnected.",
  },
  {
    id: 59,
    subject: "Anatomy",
    stem: "Horner's syndrome consists of all of the following EXCEPT:",
    options: [
      "Ptosis",
      "Miosis",
      "Anhidrosis of ipsilateral face",
      "Exophthalmos",
    ],
    answer: 3,
    explanation:
      "Horner's syndrome (sympathetic chain lesion): ptosis (superior tarsal/Müller's muscle paralysis), miosis, anhidrosis, and enophthalmos — NOT exophthalmos (which is a Graves' sign).",
  },
  {
    id: 60,
    subject: "Anatomy",
    stem: "McBurney's point is located at:",
    options: [
      "Midpoint of inguinal ligament",
      "Junction of medial 2/3 and lateral 1/3 of a line from umbilicus to ASIS",
      "Junction of medial 1/3 and lateral 2/3 of a line from umbilicus to ASIS",
      "2 cm below the umbilicus in the midline",
    ],
    answer: 1,
    explanation:
      "McBurney's point is at the junction of the medial 2/3 and lateral 1/3 of the line from umbilicus to ASIS — i.e., 1/3 of the distance from the right ASIS towards the umbilicus. Maximum tenderness here is the classic sign of acute appendicitis.",
  },
  {
    id: 61,
    subject: "Anatomy",
    stem: "The phrenic nerve arises from:",
    options: ["C2, C3, C4", "C3, C4, C5", "C4, C5, C6", "C5, C6, C7"],
    answer: 1,
    explanation:
      "Phrenic nerve originates from C3, C4, C5 (C3,4,5 keep the diaphragm alive). It is the sole motor supply to the diaphragm and provides sensory supply to its central tendon.",
  },
  {
    id: 62,
    subject: "Anatomy",
    stem: "The ductus arteriosus connects:",
    options: [
      "Aorta to the pulmonary veins",
      "Pulmonary artery to the descending aorta",
      "Right atrium to the left atrium",
      "Pulmonary artery to the ascending aorta",
    ],
    answer: 1,
    explanation:
      "The ductus arteriosus connects the main pulmonary artery (or left pulmonary artery) to the descending aorta, bypassing the lungs in fetal circulation. Closes at birth with prostaglandin fall.",
  },

  // ─── MICROBIOLOGY (10) ───────────────────────────────────────────────────
  {
    id: 63,
    subject: "Microbiology",
    stem: "The Weil-Felix reaction uses Proteus antigens to diagnose:",
    options: ["Typhoid fever", "Rickettsial infections", "Brucellosis", "Leptospirosis"],
    answer: 1,
    explanation:
      "Weil-Felix test: rickettsiae share cross-reactive antigens with Proteus OX-19, OX-2, and OX-K. It is a non-specific but historically useful agglutination test for rickettsioses.",
  },
  {
    id: 64,
    subject: "Microbiology",
    stem: "The causative organism of gas gangrene is:",
    options: [
      "Clostridium tetani",
      "Clostridium perfringens",
      "Bacteroides fragilis",
      "Clostridium botulinum",
    ],
    answer: 1,
    explanation:
      "C. perfringens (type A) causes gas gangrene (clostridial myonecrosis) via alpha-toxin (lecithinase/phospholipase C), producing gas in tissues and systemic toxicity.",
  },
  {
    id: 65,
    subject: "Microbiology",
    stem: "Hepatitis B virus can replicate to titres as high as 10⁹-10¹¹ copies/mL. Its surface antigen (HBsAg) persists for more than 6 months in which state?",
    options: [
      "Acute resolved infection",
      "Chronic HBV infection (carrier state)",
      "Occult HBV infection",
      "Window period",
    ],
    answer: 1,
    explanation:
      "Persistence of HBsAg for >6 months defines chronic HBV infection (carrier state). Occult HBV has detectable HBV DNA but negative HBsAg. HBsAg clears within 6 months in acute resolved infection.",
  },
  {
    id: 66,
    subject: "Microbiology",
    stem: "The definitive host of Taenia solium is:",
    options: ["Pig", "Cattle", "Human", "Dog"],
    answer: 2,
    explanation:
      "Humans are the definitive (final) host for adult Taenia solium (pork tapeworm). Pigs serve as intermediate hosts harbouring cysticerci. Humans can also be accidental intermediate hosts (cysticercosis).",
  },
  {
    id: 67,
    subject: "Microbiology",
    stem: "The test used to differentiate Staphylococcus aureus from coagulase-negative staphylococci is:",
    options: ["Catalase test", "Oxidase test", "Coagulase test", "Novobiocin sensitivity"],
    answer: 2,
    explanation:
      "Coagulase test (clot formation in rabbit plasma) is the key test: S. aureus is coagulase-positive; S. epidermidis and S. saprophyticus are coagulase-negative.",
  },
  {
    id: 68,
    subject: "Microbiology",
    stem: "VDRL test is a non-specific screening test for syphilis that detects antibodies to:",
    options: [
      "Treponema pallidum outer membrane proteins",
      "Cardiolipin-lecithin-cholesterol antigen",
      "Treponema pallidum haemagglutination antigen",
      "FTA-ABS antigen",
    ],
    answer: 1,
    explanation:
      "VDRL/RPR detect reagin antibodies against cardiolipin (a mitochondrial membrane phospholipid released during tissue destruction); non-treponemal, used for screening and monitoring treatment.",
  },
  {
    id: 69,
    subject: "Microbiology",
    stem: "Negri bodies (eosinophilic intracytoplasmic inclusions) are found in neurons in:",
    options: ["Poliomyelitis", "Herpes encephalitis", "Rabies", "Japanese encephalitis"],
    answer: 2,
    explanation:
      "Negri bodies are pathognomonic of rabies; they are aggregates of viral nucleocapsid protein found in Purkinje cells of the cerebellum and pyramidal cells of the hippocampus.",
  },
  {
    id: 70,
    subject: "Microbiology",
    stem: "MacConkey agar differentiates bacteria based on their ability to:",
    options: [
      "Produce hydrogen sulfide",
      "Ferment lactose",
      "Produce urease",
      "Produce coagulase",
    ],
    answer: 1,
    explanation:
      "MacConkey agar contains lactose and neutral red indicator; lactose fermenters produce acid, turning colonies pink-red. E. coli: pink (lactose +); Salmonella/Shigella: colourless (lactose -).",
  },
  {
    id: 71,
    subject: "Microbiology",
    stem: "Which hepatitis virus is transmitted by the faeco-oral route and causes fulminant hepatitis in pregnancy?",
    options: ["Hepatitis A", "Hepatitis B", "Hepatitis C", "Hepatitis E"],
    answer: 3,
    explanation:
      "Hepatitis E (HEV) is faeco-orally transmitted and causes fulminant hepatic failure with mortality up to 20-25% in pregnant women, especially in the third trimester.",
  },
  {
    id: 72,
    subject: "Microbiology",
    stem: "The vaccine-preventable disease caused by Haemophilus influenzae type b (Hib) is most commonly:",
    options: [
      "Otitis media",
      "Epiglottitis and meningitis in children",
      "Pneumonia in adults",
      "Septic arthritis in elderly",
    ],
    answer: 1,
    explanation:
      "Before Hib vaccination, H. influenzae type b was the leading cause of bacterial meningitis and epiglottitis in children under 5. The Hib vaccine has dramatically reduced incidence.",
  },

  // ─── MEDICINE (15) ───────────────────────────────────────────────────────
  {
    id: 73,
    subject: "Medicine",
    stem: "The classic triad of Wernicke's encephalopathy is:",
    options: [
      "Confusion, peripheral neuropathy, and ataxia",
      "Ophthalmoplegia, ataxia, and confusion",
      "Seizures, ophthalmoplegia, and amnesia",
      "Memory loss, confabulation, and personality change",
    ],
    answer: 1,
    explanation:
      "Wernicke's encephalopathy (thiamine deficiency): triad of ophthalmoplegia (typically lateral gaze palsy/nystagmus), truncal ataxia, and global confusion. Korsakoff psychosis follows if untreated.",
  },
  {
    id: 74,
    subject: "Medicine",
    stem: "The most sensitive indicator of early diabetic nephropathy is:",
    options: [
      "Elevated serum creatinine",
      "Microalbuminuria (30-300 mg/day)",
      "Proteinuria >3.5 g/day",
      "Reduced GFR",
    ],
    answer: 1,
    explanation:
      "Microalbuminuria (albuminuria 30-300 mg/24h or ACR 30-300 mg/g) is the earliest detectable marker of diabetic nephropathy; reversal is possible at this stage with ACE inhibitors.",
  },
  {
    id: 75,
    subject: "Medicine",
    stem: "The Wells score is used to assess the pre-test probability of:",
    options: [
      "Acute MI",
      "Deep vein thrombosis",
      "Pulmonary embolism",
      "Both DVT and PE",
    ],
    answer: 3,
    explanation:
      "The Wells scoring system has validated versions for both DVT and PE probability. It stratifies patients into low, moderate, and high pre-test probability to guide D-dimer testing and imaging.",
  },
  {
    id: 76,
    subject: "Medicine",
    stem: "The best initial test to diagnose Addison's disease (primary adrenal insufficiency) is:",
    options: [
      "Random serum cortisol",
      "ACTH (Synacthen) stimulation test",
      "24-hour urinary free cortisol",
      "Dexamethasone suppression test",
    ],
    answer: 1,
    explanation:
      "The short ACTH (Synacthen) stimulation test is the gold standard for diagnosing primary adrenal insufficiency; serum cortisol <550 nmol/L at 30 min post-stimulation is diagnostic.",
  },
  {
    id: 77,
    subject: "Medicine",
    stem: "Target INR for a patient with a mechanical mitral valve replacement is:",
    options: ["1.5-2.0", "2.0-3.0", "2.5-3.5", "3.0-4.0"],
    answer: 2,
    explanation:
      "Mechanical mitral valves require INR 2.5-3.5 due to higher thromboembolism risk compared to aortic valves. Mechanical aortic valves in low-risk patients may target INR 2.0-3.0.",
  },
  {
    id: 78,
    subject: "Medicine",
    stem: "The most common cause of community-acquired pneumonia in adults is:",
    options: [
      "Haemophilus influenzae",
      "Streptococcus pneumoniae",
      "Mycoplasma pneumoniae",
      "Klebsiella pneumoniae",
    ],
    answer: 1,
    explanation:
      "Streptococcus pneumoniae is the most common cause of CAP across all age groups. Mycoplasma predominates in young adults; Klebsiella is associated with alcoholics.",
  },
  {
    id: 79,
    subject: "Medicine",
    stem: "In hypertensive emergency, the blood pressure should be reduced by no more than what percentage in the first hour?",
    options: ["10%", "25%", "40%", "50%"],
    answer: 1,
    explanation:
      "In hypertensive emergency, MAP should be reduced by no more than 25% in the first hour to avoid precipitating ischaemia. Over 24-48 hours, gradual normalisation is targeted.",
  },
  {
    id: 80,
    subject: "Medicine",
    stem: "Anti-dsDNA antibodies are most specific for:",
    options: [
      "Rheumatoid arthritis",
      "Systemic lupus erythematosus",
      "Sjögren's syndrome",
      "Systemic sclerosis",
    ],
    answer: 1,
    explanation:
      "Anti-double-stranded DNA (anti-dsDNA) antibodies are highly specific (~99%) for SLE and correlate with disease activity, especially lupus nephritis. ANA is sensitive but not specific.",
  },
  {
    id: 81,
    subject: "Medicine",
    stem: "The CURB-65 score is used to assess severity of:",
    options: [
      "COPD exacerbations",
      "Community-acquired pneumonia",
      "Acute pancreatitis",
      "Heart failure",
    ],
    answer: 1,
    explanation:
      "CURB-65 (Confusion, Urea>7, RR≥30, BP<90/60, age≥65) scores 0-5 for CAP severity: score 0-1 → home treatment; score ≥3 → ICU consideration.",
  },
  {
    id: 82,
    subject: "Medicine",
    stem: "The most common cause of nephrotic syndrome in non-diabetic adults is:",
    options: [
      "Minimal change disease",
      "IgA nephropathy",
      "Membranous nephropathy",
      "Focal segmental glomerulosclerosis",
    ],
    answer: 2,
    explanation:
      "Membranous nephropathy is the most common cause of nephrotic syndrome in non-diabetic adults; associated with PLA2R antibodies in the idiopathic form (~70%).",
  },
  {
    id: 83,
    subject: "Medicine",
    stem: "Charcot's triad of ascending cholangitis consists of:",
    options: [
      "Fever, RUQ pain, and jaundice",
      "Fever, jaundice, and altered consciousness",
      "RUQ pain, jaundice, and nausea",
      "Fever, RUQ pain, and hypotension",
    ],
    answer: 0,
    explanation:
      "Charcot's triad: RUQ pain + fever/rigors + jaundice (due to biliary obstruction and infection). Reynolds' pentad adds hypotension and altered consciousness, indicating septic shock.",
  },
  {
    id: 84,
    subject: "Medicine",
    stem: "In type 2 Diabetes Mellitus, which drug is associated with the highest risk of hypoglycaemia?",
    options: ["Metformin", "Sitagliptin", "Glibenclamide", "Empagliflozin"],
    answer: 2,
    explanation:
      "Sulphonylureas (e.g., glibenclamide/glyburide) stimulate insulin secretion regardless of glucose levels, causing hypoglycaemia — particularly with missed meals or renal impairment.",
  },
  {
    id: 85,
    subject: "Medicine",
    stem: "Gottron's papules (violaceous plaques over knuckles) are pathognomonic of:",
    options: [
      "Systemic lupus erythematosus",
      "Dermatomyositis",
      "Psoriatic arthritis",
      "Mixed connective tissue disease",
    ],
    answer: 1,
    explanation:
      "Gottron's papules (over MCP/PIP joints) and Gottron's sign (erythema over elbows/knees) are pathognomonic of dermatomyositis. Heliotrope rash and mechanic's hands are also characteristic.",
  },
  {
    id: 86,
    subject: "Medicine",
    stem: "The initial treatment of choice for acute attack of gout is:",
    options: [
      "Allopurinol",
      "Colchicine or NSAIDs",
      "Probenecid",
      "Febuxostat",
    ],
    answer: 1,
    explanation:
      "Acute gout is treated with anti-inflammatory agents: NSAIDs (indomethacin), colchicine, or corticosteroids. Urate-lowering therapy (allopurinol) is NOT started during an acute attack.",
  },
  {
    id: 87,
    subject: "Medicine",
    stem: "The Glasgow Coma Scale score in a patient who opens eyes to pain, gives incomprehensible sounds, and withdraws to pain is:",
    options: ["7", "8", "9", "10"],
    answer: 1,
    explanation:
      "GCS: Eye opening to pain = 2; Verbal incomprehensible sounds = 2; Motor withdrawal from pain = 4. Total = 2 + 2 + 4 = 8 (intubation threshold).",
  },

  // ─── SURGERY (10) ────────────────────────────────────────────────────────
  {
    id: 88,
    subject: "Surgery",
    stem: "The most common site of peptic ulcer perforation is:",
    options: [
      "Posterior wall of the duodenum",
      "Anterior wall of the first part of duodenum",
      "Lesser curvature of the stomach",
      "Greater curvature of the stomach",
    ],
    answer: 1,
    explanation:
      "Duodenal ulcer perforation typically occurs on the anterior wall of D1, spilling acid into the peritoneal cavity (peritonitis). Posterior wall ulcers more commonly erode into the gastroduodenal artery (haemorrhage).",
  },
  {
    id: 89,
    subject: "Surgery",
    stem: "Cullen's sign (periumbilical bruising) is seen in:",
    options: [
      "Acute appendicitis",
      "Ruptured aortic aneurysm",
      "Acute pancreatitis with retroperitoneal haemorrhage",
      "Ruptured ectopic pregnancy",
    ],
    answer: 2,
    explanation:
      "Cullen's sign (periumbilical bruising) and Grey Turner's sign (flank bruising) indicate retroperitoneal haemorrhage, classically seen in severe acute haemorrhagic pancreatitis.",
  },
  {
    id: 90,
    subject: "Surgery",
    stem: "The most common type of abdominal aortic aneurysm is:",
    options: [
      "Suprarenal",
      "Juxtarenal",
      "Infrarenal",
      "Thoracoabdominal",
    ],
    answer: 2,
    explanation:
      "~95% of AAAs are infrarenal (below the renal arteries), developing at an area of relative haemodynamic stress and reduced vasa vasorum. Elective repair is considered when diameter >5.5 cm.",
  },
  {
    id: 91,
    subject: "Surgery",
    stem: "The gold standard investigation for diagnosis of acute appendicitis in adults is:",
    options: [
      "Plain X-ray of abdomen",
      "Ultrasound abdomen",
      "CT scan of abdomen and pelvis with contrast",
      "MRI abdomen",
    ],
    answer: 2,
    explanation:
      "CT abdomen/pelvis (with IV contrast) has sensitivity ~94% and specificity ~95% for acute appendicitis and is the gold standard in adults. Ultrasound is preferred in children and pregnant women.",
  },
  {
    id: 92,
    subject: "Surgery",
    stem: "Courvoisier's law states that a palpable, non-tender gallbladder with jaundice is most likely due to:",
    options: [
      "Acute cholecystitis",
      "Gallstone obstruction of common bile duct",
      "Carcinoma of the head of the pancreas",
      "Primary sclerosing cholangitis",
    ],
    answer: 2,
    explanation:
      "Courvoisier's sign: painless obstructive jaundice + palpable gallbladder suggests malignant (not stone) obstruction, most commonly carcinoma of the pancreatic head, as a chronically inflamed gallbladder cannot distend.",
  },
  {
    id: 93,
    subject: "Surgery",
    stem: "In Fournier's gangrene, the tissue affected is:",
    options: [
      "Fascia of the anterior abdominal wall",
      "Perineal and scrotal fasciae",
      "Retroperitoneal fascia",
      "Fasciae of the lower limb",
    ],
    answer: 1,
    explanation:
      "Fournier's gangrene is a necrotising fasciitis of the perineum and genitalia (scrotum/vulva), caused by synergistic polymicrobial infection. It is a surgical emergency requiring urgent debridement.",
  },
  {
    id: 94,
    subject: "Surgery",
    stem: "The modified Duke criteria are used to diagnose:",
    options: [
      "Acute pancreatitis severity",
      "Infective endocarditis",
      "Septic shock",
      "Acute limb ischaemia",
    ],
    answer: 1,
    explanation:
      "Modified Duke criteria classify IE as definite, possible, or rejected based on major (positive blood cultures, echocardiographic findings) and minor criteria.",
  },
  {
    id: 95,
    subject: "Surgery",
    stem: "Hartmann's procedure involves:",
    options: [
      "Resection of the sigmoid colon with primary anastomosis",
      "Resection of the sigmoid colon with end colostomy and closure of the rectal stump",
      "Abdominoperineal resection with permanent colostomy",
      "Right hemicolectomy with ileotransverse anastomosis",
    ],
    answer: 1,
    explanation:
      "Hartmann's procedure: sigmoid/upper rectal resection + end sigmoid colostomy + closure of the rectal stump (no anastomosis). Used for emergencies (perforated diverticulitis, obstructing cancer) when primary anastomosis is unsafe.",
  },
  {
    id: 96,
    subject: "Surgery",
    stem: "Ranson's criteria are used to assess severity of:",
    options: [
      "Acute cholecystitis",
      "Acute pancreatitis",
      "Peptic ulcer disease",
      "Mesenteric ischaemia",
    ],
    answer: 1,
    explanation:
      "Ranson's criteria (5 on admission + 6 at 48 h) predict acute pancreatitis severity and mortality. Score ≥3 indicates severe pancreatitis; each additional criterion increases mortality significantly.",
  },
  {
    id: 97,
    subject: "Surgery",
    stem: "Mirizzi syndrome is caused by:",
    options: [
      "Gallstone impacted in the cystic duct compressing the common hepatic duct",
      "Choledocholithiasis causing common bile duct obstruction",
      "Stricture of the common bile duct following cholecystectomy",
      "Carcinoma of the cystic duct",
    ],
    answer: 0,
    explanation:
      "Mirizzi syndrome: a large stone impacted in the cystic duct or Hartmann's pouch externally compresses the common hepatic duct, causing obstructive jaundice without a stone in the CBD.",
  },

  // ─── OBG (10) ────────────────────────────────────────────────────────────
  {
    id: 98,
    subject: "OBG",
    stem: "The most common cause of postpartum haemorrhage is:",
    options: [
      "Retained placenta",
      "Uterine atony",
      "Cervical lacerations",
      "Coagulation disorders",
    ],
    answer: 1,
    explanation:
      "Uterine atony accounts for ~80% of PPH cases. The '4 Ts' mnemonic: Tone (atony), Tissue (retained), Trauma (lacerations), Thrombin (coagulopathy). Oxytocin is first-line management.",
  },
  {
    id: 99,
    subject: "OBG",
    stem: "The BISHOP score is used for:",
    options: [
      "Assessing fetal wellbeing",
      "Predicting successful induction of labour",
      "Diagnosing placenta praevia",
      "Grading perineal tears",
    ],
    answer: 1,
    explanation:
      "Bishop score assesses cervical favourability (dilation, effacement, consistency, position, fetal station) to predict success of induction of labour. Score ≥8 is favourable.",
  },
  {
    id: 100,
    subject: "OBG",
    stem: "The antihypertensive drug of choice for acute severe hypertension during pregnancy is:",
    options: [
      "Amlodipine",
      "ACE inhibitor",
      "Hydralazine or Labetalol IV",
      "Sodium nitroprusside",
    ],
    answer: 2,
    explanation:
      "Hydralazine IV and labetalol IV are first-line for acute severe hypertension in pregnancy. ACE inhibitors and ARBs are contraindicated (teratogenic). Sodium nitroprusside can cause fetal cyanide toxicity.",
  },
  {
    id: 101,
    subject: "OBG",
    stem: "The gold standard for diagnosis of endometriosis is:",
    options: [
      "Transvaginal ultrasound",
      "MRI pelvis",
      "Serum CA-125",
      "Laparoscopy with biopsy",
    ],
    answer: 3,
    explanation:
      "Laparoscopy with direct visualisation and histological biopsy is the gold standard for diagnosing endometriosis, allowing simultaneous treatment (ablation/excision of lesions).",
  },
  {
    id: 102,
    subject: "OBG",
    stem: "The most common site of ectopic pregnancy is:",
    options: [
      "Interstitial (cornual) part of fallopian tube",
      "Isthmus of fallopian tube",
      "Ampulla of fallopian tube",
      "Ovary",
    ],
    answer: 2,
    explanation:
      "~70% of ectopic pregnancies implant in the ampullary portion of the fallopian tube. Cornual (interstitial) ectopics are rarer but more dangerous due to higher vascularity and later rupture.",
  },
  {
    id: 103,
    subject: "OBG",
    stem: "HELLP syndrome stands for:",
    options: [
      "Haemolysis, Elevated Liver enzymes, Low Platelets",
      "Hypertension, Elevated Liver enzymes, Low Protein",
      "Haemolysis, Elevated LDH, Low Potassium",
      "Hypertension, Elevated Liver function, Low Progesterone",
    ],
    answer: 0,
    explanation:
      "HELLP (Haemolysis, Elevated Liver enzymes, Low Platelets) is a severe form of pre-eclampsia; presents with RUQ pain, nausea, and thrombocytopenia. Delivery is definitive treatment.",
  },
  {
    id: 104,
    subject: "OBG",
    stem: "Sheehan's syndrome results from:",
    options: [
      "Autoimmune destruction of the pituitary",
      "Pituitary infarction following postpartum haemorrhage",
      "Granulomatous infiltration of the hypothalamus",
      "Pituitary adenoma during pregnancy",
    ],
    answer: 1,
    explanation:
      "Sheehan's syndrome: pituitary ischaemia/infarction following severe postpartum haemorrhage and hypotension → hypopituitarism. Failure to lactate and amenorrhoea are early features.",
  },
  {
    id: 105,
    subject: "OBG",
    stem: "The DOC for medical management of unruptured ectopic pregnancy is:",
    options: ["Mifepristone", "Misoprostol", "Methotrexate", "Actinomycin D"],
    answer: 2,
    explanation:
      "Methotrexate (folate antagonist) is the DOC for unruptured ectopic pregnancy when criteria are met (haemodynamically stable, β-hCG <5000 mIU/mL, no fetal cardiac activity, tube <3.5 cm).",
  },
  {
    id: 106,
    subject: "OBG",
    stem: "Which investigation is most useful to differentiate complete from incomplete abortion?",
    options: [
      "Serum beta-hCG titres",
      "Transvaginal ultrasound",
      "Urine pregnancy test",
      "Serum progesterone",
    ],
    answer: 1,
    explanation:
      "Transvaginal ultrasound identifies retained products of conception (RPOC) — endometrial thickness >15 mm with heterogeneous contents — distinguishing incomplete from complete abortion.",
  },
  {
    id: 107,
    subject: "OBG",
    stem: "Cardinal movements of labour in the correct sequence are:",
    options: [
      "Engagement → Descent → Flexion → Internal rotation → Extension → External rotation → Expulsion",
      "Engagement → Flexion → Descent → Internal rotation → Extension → External rotation → Expulsion",
      "Descent → Engagement → Flexion → Internal rotation → Extension → External rotation → Expulsion",
      "Engagement → Descent → Internal rotation → Flexion → Extension → External rotation → Expulsion",
    ],
    answer: 0,
    explanation:
      "The 7 cardinal movements: Engagement, Descent, Flexion, Internal rotation (to OA position), Extension (delivery of head), External rotation (restitution), Expulsion (delivery of shoulders and body).",
  },

  // ─── PAEDIATRICS (8) ─────────────────────────────────────────────────────
  {
    id: 108,
    subject: "Paediatrics",
    stem: "The most common cause of neonatal jaundice in the first 24 hours of life is:",
    options: [
      "Physiological jaundice",
      "Breast milk jaundice",
      "Haemolytic disease of the newborn (Rh incompatibility)",
      "Biliary atresia",
    ],
    answer: 2,
    explanation:
      "Jaundice within 24 hours of birth is always pathological; the most common cause is haemolytic disease of the newborn (Rh or ABO incompatibility). Physiological jaundice appears on day 2-3.",
  },
  {
    id: 109,
    subject: "Paediatrics",
    stem: "The Apgar score is recorded at:",
    options: [
      "1 and 3 minutes",
      "1 and 5 minutes",
      "2 and 5 minutes",
      "5 and 10 minutes",
    ],
    answer: 1,
    explanation:
      "Apgar score (Appearance, Pulse, Grimace, Activity, Respiration) is assessed at 1 minute and 5 minutes of life. If the 5-minute score is <7, it is repeated every 5 minutes up to 20 minutes.",
  },
  {
    id: 110,
    subject: "Paediatrics",
    stem: "The most common cause of acute diarrhoea in children under 5 years worldwide is:",
    options: [
      "Enterotoxigenic E. coli",
      "Shigella",
      "Rotavirus",
      "Campylobacter jejuni",
    ],
    answer: 2,
    explanation:
      "Rotavirus is the leading cause of acute severe diarrhoea in children <5 years globally, causing ~200,000 deaths annually before widespread vaccination.",
  },
  {
    id: 111,
    subject: "Paediatrics",
    stem: "A 2-year-old presents with stridor, barking cough, and hoarseness worsening at night. AP neck X-ray shows a 'steeple sign'. The most likely diagnosis is:",
    options: [
      "Acute epiglottitis",
      "Croup (laryngotracheobronchitis)",
      "Foreign body aspiration",
      "Bacterial tracheitis",
    ],
    answer: 1,
    explanation:
      "Croup (viral LTB, usually parainfluenza virus) causes the steeple/pencil sign on AP neck X-ray due to subglottic narrowing. Treatment: nebulised adrenaline + dexamethasone.",
  },
  {
    id: 112,
    subject: "Paediatrics",
    stem: "The DOC for Kawasaki disease to prevent coronary artery aneurysms is:",
    options: [
      "Aspirin alone",
      "IVIG + high-dose aspirin",
      "Corticosteroids + aspirin",
      "Infliximab + aspirin",
    ],
    answer: 1,
    explanation:
      "Kawasaki disease: intravenous immunoglobulin (2 g/kg single dose) + high-dose aspirin during the acute febrile phase reduces the risk of coronary artery aneurysms from ~25% to <5%.",
  },
  {
    id: 113,
    subject: "Paediatrics",
    stem: "Intussusception in infants classically presents with:",
    options: [
      "Watery diarrhoea and fever",
      "Bilious vomiting, bloody 'redcurrant jelly' stools, and colicky abdominal pain",
      "Constipation from birth and distended abdomen",
      "Explosive watery stools and periumbilical pain",
    ],
    answer: 1,
    explanation:
      "Intussusception (peak 6-18 months) classic triad: colicky abdominal pain, bilious vomiting, and redcurrant jelly stools (blood + mucus). Sausage-shaped RUQ mass may be palpable.",
  },
  {
    id: 114,
    subject: "Paediatrics",
    stem: "Which congenital heart defect is NOT associated with cyanosis (acyanotic)?",
    options: [
      "Tetralogy of Fallot",
      "Transposition of great arteries",
      "Ventricular septal defect",
      "Tricuspid atresia",
    ],
    answer: 2,
    explanation:
      "VSD causes a left-to-right shunt (acyanotic); it only causes cyanosis if pulmonary hypertension reverses the shunt (Eisenmenger syndrome). ToF, TGA, and tricuspid atresia are cyanotic defects.",
  },
  {
    id: 115,
    subject: "Paediatrics",
    stem: "The primary doses of OPV in India's Universal Immunisation Programme are given at:",
    options: [
      "2, 4, and 6 months",
      "6 weeks, 10 weeks, and 14 weeks",
      "Birth, 6 weeks, and 6 months",
      "2, 4, and 12 months",
    ],
    answer: 1,
    explanation:
      "India's UIP schedule for OPV: primary doses at 6, 10, and 14 weeks (along with DPT) plus a zero dose at birth. Pulse polio campaigns supplement routine immunisation.",
  },

  // ─── ENT/OPHTHALMOLOGY (5) ───────────────────────────────────────────────
  {
    id: 116,
    subject: "ENT/Ophthalmology",
    stem: "The most common cause of conductive hearing loss in children is:",
    options: [
      "Otosclerosis",
      "Chronic suppurative otitis media",
      "Otitis media with effusion (glue ear)",
      "Wax impaction",
    ],
    answer: 2,
    explanation:
      "Otitis media with effusion (glue ear) is the most common cause of conductive hearing loss in children; persistent middle ear fluid dampens ossicular chain vibration.",
  },
  {
    id: 117,
    subject: "ENT/Ophthalmology",
    stem: "Rinne's test result in sensorineural hearing loss is:",
    options: [
      "Rinne negative (BC > AC)",
      "Rinne positive (AC > BC)",
      "Equal air and bone conduction",
      "Rinne negative only for high frequencies",
    ],
    answer: 1,
    explanation:
      "Rinne positive (AC > BC): seen in both normal hearing AND sensorineural hearing loss (cochlear/neural damage reduces both but AC remains better). Rinne negative (BC > AC) indicates conductive hearing loss.",
  },
  {
    id: 118,
    subject: "ENT/Ophthalmology",
    stem: "Hutchinson's pupil (dilated, fixed, unreactive) on one side following head injury indicates:",
    options: [
      "Pontine haemorrhage",
      "Uncal herniation compressing ipsilateral CN III",
      "Traumatic mydriasis of the opposite eye",
      "Direct optic nerve injury",
    ],
    answer: 1,
    explanation:
      "Uncal (temporal lobe) herniation compresses CN III against the posterior communicating artery or tentorium → loss of parasympathetic constriction → ipsilateral fixed dilated pupil (Hutchinson's pupil).",
  },
  {
    id: 119,
    subject: "ENT/Ophthalmology",
    stem: "The most common cause of sudden painless loss of vision in an elderly patient with atrial fibrillation is:",
    options: [
      "Acute angle-closure glaucoma",
      "Retinal detachment",
      "Central retinal artery occlusion",
      "Vitreous haemorrhage",
    ],
    answer: 2,
    explanation:
      "CRAO in a patient with AF suggests cardioembolic cause (atrial thrombus). Fundoscopy shows cherry-red spot at fovea with pale retina. Emergency: lower IOP, ocular massage, paracentesis.",
  },
  {
    id: 120,
    subject: "ENT/Ophthalmology",
    stem: "The triad of hereditary haemorrhagic telangiectasia (Osler-Weber-Rendu disease) includes:",
    options: [
      "Epistaxis, telangiectasias, and visceral AVMs",
      "Epistaxis, deafness, and retinal hamartomas",
      "Anaemia, splenomegaly, and epistaxis",
      "Haemoptysis, haematuria, and epistaxis",
    ],
    answer: 0,
    explanation:
      "HHT (Osler-Weber-Rendu): autosomal dominant disorder with recurrent epistaxis, mucocutaneous telangiectasias, and visceral AVMs (pulmonary, hepatic, cerebral). ENG/ALK1 gene mutations.",
  },

  // ─── PSM / COMMUNITY MEDICINE (5) ───────────────────────────────────────
  {
    id: 121,
    subject: "PSM/Community Medicine",
    stem: "The 'epidemiological triad' consists of:",
    options: [
      "Host, Agent, and Vector",
      "Host, Agent, and Environment",
      "Incidence, Prevalence, and Mortality",
      "Primary, Secondary, and Tertiary prevention",
    ],
    answer: 1,
    explanation:
      "The epidemiological triad (Gordian knot of disease causation): Host (susceptibility), Agent (biological/chemical/physical), and Environment (physical/biological/social). Disease occurs when they intersect unfavourably.",
  },
  {
    id: 122,
    subject: "PSM/Community Medicine",
    stem: "The herd immunity threshold for measles (R₀ ~15) requires approximately what proportion of the population to be immune?",
    options: ["50%", "75%", "93%", "99%"],
    answer: 2,
    explanation:
      "Herd immunity threshold = 1 – (1/R₀). For measles R₀ = 12-18, the threshold is ~92-95%. This is why >93% coverage is required to prevent measles outbreaks.",
  },
  {
    id: 123,
    subject: "PSM/Community Medicine",
    stem: "The Expanded Programme on Immunisation (EPI) was launched by WHO in:",
    options: ["1964", "1974", "1984", "1994"],
    answer: 1,
    explanation:
      "WHO launched EPI in 1974, building on the success of the smallpox eradication programme. India launched its EPI in 1978, later expanded to the Universal Immunisation Programme (UIP) in 1985.",
  },
  {
    id: 124,
    subject: "PSM/Community Medicine",
    stem: "Sensitivity of a diagnostic test is defined as:",
    options: [
      "True negatives / (True negatives + False positives)",
      "True positives / (True positives + False negatives)",
      "True positives / (True positives + False positives)",
      "True negatives / (True negatives + False negatives)",
    ],
    answer: 1,
    explanation:
      "Sensitivity = TP / (TP + FN) — ability to correctly identify those WITH the disease (true positive rate). Specificity = TN / (TN + FP) — ability to correctly identify those WITHOUT disease.",
  },
  {
    id: 125,
    subject: "PSM/Community Medicine",
    stem: "The Global Burden of Disease measure that combines years of life lost (YLL) and years lived with disability (YLD) is:",
    options: ["QALY", "DALY", "NNT", "PAR%"],
    answer: 1,
    explanation:
      "DALY (Disability-Adjusted Life Year) = YLL + YLD. One DALY = one year of healthy life lost. It is the standard metric used by WHO/World Bank for global disease burden comparisons.",
  },

  // ─── PHARMACOLOGY EXTENDED (127–140) ─────────────────────────────────────
  {
    id: 127,
    subject: "Pharmacology",
    stem: "Drug of choice for status epilepticus (first-line) in the emergency setting is:",
    options: ["Phenytoin IV", "Lorazepam IV", "Valproate IV", "Phenobarbitone IV"],
    answer: 1,
    explanation:
      "Lorazepam IV (0.1 mg/kg) is first-line for status epilepticus — longer duration of CNS action than diazepam. If IV access is unavailable, midazolam IM or diazepam PR. Phenytoin IV is second-line.",
  },
  {
    id: 128,
    subject: "Pharmacology",
    stem: "Which drug is the drug of choice for organophosphate poisoning?",
    options: ["Pralidoxime alone", "Atropine alone", "Atropine + Pralidoxime", "Physostigmine"],
    answer: 2,
    explanation:
      "Atropine blocks muscarinic effects (SLUDGE); pralidoxime (PAM) reactivates acetylcholinesterase if given within 24 hours (before 'ageing'). Both are required. Atropine is titrated to dry secretions.",
  },
  {
    id: 129,
    subject: "Pharmacology",
    stem: "Absolute contraindication to metformin use is:",
    options: ["Obesity", "eGFR < 30 mL/min/1.73m²", "Age > 65 years", "Hepatic steatosis"],
    answer: 1,
    explanation:
      "Metformin is contraindicated when eGFR < 30 (risk of lactic acidosis). It can be used cautiously if eGFR 30–45 with dose reduction. Contraindicated also in IV contrast procedures and surgery.",
  },
  {
    id: 130,
    subject: "Pharmacology",
    stem: "The mechanism of action of heparin is:",
    options: [
      "Direct thrombin inhibitor",
      "Inhibits vitamin K-dependent clotting factors",
      "Potentiates antithrombin III to inhibit thrombin and factor Xa",
      "Inhibits platelet aggregation",
    ],
    answer: 2,
    explanation:
      "Heparin binds antithrombin III (AT-III) → conformational change → accelerates AT-III inhibition of thrombin (factor IIa) and factor Xa by ~1000-fold. Low molecular weight heparins primarily inhibit Xa.",
  },
  {
    id: 131,
    subject: "Pharmacology",
    stem: "Which antifungal works by inhibiting beta-1,3-glucan synthase?",
    options: ["Fluconazole", "Amphotericin B", "Caspofungin", "Terbinafine"],
    answer: 2,
    explanation:
      "Echinocandins (caspofungin, micafungin, anidulafungin) inhibit beta-1,3-glucan synthase → disrupts fungal cell wall synthesis. Active against Candida and Aspergillus. Not active against Cryptococcus.",
  },
  {
    id: 132,
    subject: "Pharmacology",
    stem: "Serotonin syndrome is caused by which combination?",
    options: [
      "SSRI + MAO-A inhibitor",
      "Dopamine agonist + antipsychotic",
      "Beta blocker + calcium channel blocker",
      "ACE inhibitor + ARB",
    ],
    answer: 0,
    explanation:
      "Serotonin syndrome = excess serotonergic activity. Classic triad: hyperthermia + neuromuscular abnormality + autonomic instability. Caused by SSRI+MAOI, SSRI+tramadol, SSRI+linezolid, SSRI+fentanyl, etc.",
  },
  {
    id: 133,
    subject: "Pharmacology",
    stem: "The drug of choice for Pseudomonas aeruginosa infections is:",
    options: ["Amoxicillin-clavulanate", "Piperacillin-tazobactam", "Amoxicillin", "Cefazolin"],
    answer: 1,
    explanation:
      "Piperacillin-tazobactam (pip-tazo) has excellent anti-pseudomonal activity. Alternatives include cefepime, meropenem, imipenem, ciprofloxacin, or aztreonam. Pseudomonas is intrinsically resistant to many penicillins.",
  },
  {
    id: 134,
    subject: "Pharmacology",
    stem: "Neuroleptic malignant syndrome (NMS) is most commonly caused by:",
    options: ["Benzodiazepines", "Antipsychotics (D2 antagonists)", "SSRIs", "Opioids"],
    answer: 1,
    explanation:
      "NMS: hyperthermia + lead-pipe rigidity + altered consciousness + autonomic instability + elevated CK. Caused by D2 receptor blockade (typical > atypical antipsychotics, also metoclopramide). Treat with dantrolene + bromocriptine.",
  },
  {
    id: 135,
    subject: "Pharmacology",
    stem: "Which drug is an irreversible COX inhibitor?",
    options: ["Ibuprofen", "Diclofenac", "Aspirin", "Celecoxib"],
    answer: 2,
    explanation:
      "Aspirin irreversibly acetylates COX-1 and COX-2. This permanently inhibits platelet thromboxane A2 synthesis for the platelet's lifetime (~10 days). All other NSAIDs are reversible, competitive inhibitors.",
  },
  {
    id: 136,
    subject: "Pharmacology",
    stem: "Drug of choice for Helicobacter pylori eradication (first-line triple therapy) in India is:",
    options: [
      "Amoxicillin + clarithromycin + omeprazole",
      "Tetracycline + metronidazole + bismuth",
      "Metronidazole + tinidazole + rabeprazole",
      "Cefixime + azithromycin + pantoprazole",
    ],
    answer: 0,
    explanation:
      "Standard triple therapy: PPI + amoxicillin + clarithromycin × 14 days. Quadruple therapy (PPI + bismuth + metronidazole + tetracycline) is used where clarithromycin resistance >15%. India uses clarithromycin-based first.",
  },
  {
    id: 137,
    subject: "Pharmacology",
    stem: "Which diuretic is the drug of choice for acute pulmonary edema?",
    options: ["Hydrochlorothiazide", "Spironolactone", "Furosemide", "Acetazolamide"],
    answer: 2,
    explanation:
      "Furosemide IV in acute pulmonary oedema: immediate venodilation (within minutes, before diuresis begins), then diuresis. Loop diuretics also reduce preload acutely. Dose: 40–80 mg IV stat.",
  },
  {
    id: 138,
    subject: "Pharmacology",
    stem: "The antidote for paracetamol (acetaminophen) overdose is:",
    options: ["Flumazenil", "Naloxone", "N-acetylcysteine", "Fomepizole"],
    answer: 2,
    explanation:
      "N-acetylcysteine (NAC) replenishes glutathione stores → prevents NAPQI accumulation → prevents hepatotoxicity. Most effective within 8–10 hours of ingestion. IV protocol: 3-bag regimen over 21 hours.",
  },
  {
    id: 139,
    subject: "Pharmacology",
    stem: "Which drug prolongs QT interval and is associated with Torsades de Pointes?",
    options: ["Lidocaine", "Metoprolol", "Amiodarone", "Verapamil"],
    answer: 2,
    explanation:
      "Amiodarone (class III) blocks K⁺ channels → prolongs QT. Despite this, Torsades is paradoxically rare with amiodarone (< other class III drugs like sotalol, dofetilide) because it also blocks ICa and INa.",
  },
  {
    id: 140,
    subject: "Pharmacology",
    stem: "Trastuzumab (Herceptin) targets which receptor?",
    options: ["EGFR (HER1)", "HER2/neu (ErbB2)", "VEGFR", "BCR-ABL"],
    answer: 1,
    explanation:
      "Trastuzumab is a monoclonal antibody against HER2/neu (ErbB2). Used in HER2-positive breast and gastric cancers. Cardiotoxicity (cardiomyopathy) is a key side effect — differs from anthracycline toxicity (irreversible vs reversible).",
  },

  // ─── MEDICINE EXTENDED (141–155) ─────────────────────────────────────────
  {
    id: 141,
    subject: "Medicine",
    stem: "The most common cause of community-acquired pneumonia (CAP) in adults is:",
    options: ["Haemophilus influenzae", "Streptococcus pneumoniae", "Mycoplasma pneumoniae", "Klebsiella pneumoniae"],
    answer: 1,
    explanation:
      "Streptococcus pneumoniae is the commonest cause of CAP in all age groups. Mycoplasma ('atypical') is commonest in young adults. Klebsiella is associated with alcoholics and diabetics ('currant-jelly sputum').",
  },
  {
    id: 142,
    subject: "Medicine",
    stem: "CURB-65 score of ≥3 in community-acquired pneumonia indicates:",
    options: ["Home treatment", "Outpatient antibiotics only", "Hospital admission", "ICU admission mandatory"],
    answer: 2,
    explanation:
      "CURB-65: Confusion, Urea >7mmol/L, RR ≥30, BP systolic <90 or diastolic ≤60, Age ≥65. Score 0–1: home, 2: hospitalise, ≥3: hospital (consider ICU if 4–5). CURB-65 ≥3 = severe CAP.",
  },
  {
    id: 143,
    subject: "Medicine",
    stem: "Which autoantibody is most specific for Systemic Lupus Erythematosus (SLE)?",
    options: ["Anti-dsDNA", "ANA", "Anti-Ro (SSA)", "Anti-CCP"],
    answer: 0,
    explanation:
      "Anti-dsDNA and anti-Sm are most specific for SLE. ANA is sensitive (~99%) but not specific. Anti-Ro/La seen in Sjögren's and neonatal lupus. Anti-CCP is specific for rheumatoid arthritis.",
  },
  {
    id: 144,
    subject: "Medicine",
    stem: "The classical triad of Wernicke's encephalopathy is:",
    options: [
      "Confusion + ataxia + ophthalmoplegia",
      "Fever + neck stiffness + photophobia",
      "Tremor + rigidity + bradykinesia",
      "Diplopia + dysphagia + dysarthria",
    ],
    answer: 0,
    explanation:
      "Wernicke's encephalopathy (thiamine deficiency): confusion + ataxia + ophthalmoplegia (lateral gaze palsy/nystagmus). Treat with IV thiamine BEFORE glucose. Korsakoff's psychosis (confabulation) follows if untreated.",
  },
  {
    id: 145,
    subject: "Medicine",
    stem: "Gold standard investigation for diagnosis of pulmonary embolism is:",
    options: ["D-dimer", "CT pulmonary angiography (CTPA)", "V/Q scan", "Pulmonary angiography"],
    answer: 1,
    explanation:
      "CTPA is the current gold standard — high sensitivity/specificity, widely available. Classic pulmonary angiography (invasive) was the old gold standard. V/Q scan used if CTPA contraindicated (CKD, contrast allergy, pregnancy).",
  },
  {
    id: 146,
    subject: "Medicine",
    stem: "Child-Pugh class C cirrhosis indicates a 1-year survival of approximately:",
    options: ["90%", "80%", "45%", "25%"],
    answer: 2,
    explanation:
      "Child-Pugh scoring: Class A (5–6) = 100% 1-yr survival, Class B (7–9) = 80%, Class C (10–15) = 45%. MELD score (creatinine, bilirubin, INR) is now preferred for transplant listing (more objective).",
  },
  {
    id: 147,
    subject: "Medicine",
    stem: "First-line treatment for giant cell arteritis (temporal arteritis) to prevent blindness is:",
    options: ["NSAIDs", "Methotrexate", "High-dose prednisolone", "Hydroxychloroquine"],
    answer: 2,
    explanation:
      "High-dose corticosteroids (prednisolone 40–60 mg/day) must be started immediately on clinical suspicion — BEFORE biopsy results — to prevent irreversible blindness. Temporal artery biopsy confirms diagnosis.",
  },
  {
    id: 148,
    subject: "Medicine",
    stem: "The hallmark ECG finding of hyperkalaemia is:",
    options: ["Prolonged PR interval", "Peaked T waves", "Delta waves", "Osborn (J) waves"],
    answer: 1,
    explanation:
      "Progressive ECG changes in hyperkalaemia: peaked T waves (earliest) → PR prolongation → wide QRS → sine wave pattern → VF. Osborn waves = hypothermia. Delta waves = WPW. Treat K⁺ >6.5 or any ECG change urgently.",
  },
  {
    id: 149,
    subject: "Medicine",
    stem: "Diabetes insipidus (central) is treated with:",
    options: ["Furosemide", "Desmopressin (DDAVP)", "Vasopressin IV only", "Hydrochlorothiazide"],
    answer: 1,
    explanation:
      "Central DI (ADH deficiency) → desmopressin (synthetic ADH analogue, intranasal or oral). Nephrogenic DI (ADH resistance) → low-sodium diet + hydrochlorothiazide + NSAIDs. Lithium-induced = nephrogenic DI.",
  },
  {
    id: 150,
    subject: "Medicine",
    stem: "Anti-GBM (anti-glomerular basement membrane) disease (Goodpasture syndrome) characteristically presents with:",
    options: [
      "Proteinuria + haematuria alone",
      "Pulmonary haemorrhage + rapidly progressive glomerulonephritis",
      "Nephrotic syndrome + oedema",
      "Haematuria + deafness",
    ],
    answer: 1,
    explanation:
      "Goodpasture syndrome: anti-GBM antibodies → pulmonary haemorrhage + RPGN. IF shows linear IgG deposits along GBM (pathognomonic). Anti-GBM + ANCA double-positive has worse prognosis. Treat with plasma exchange + immunosuppression.",
  },
  {
    id: 151,
    subject: "Medicine",
    stem: "The most common type of renal calculus in India is:",
    options: ["Uric acid stones", "Calcium oxalate stones", "Struvite (triple phosphate) stones", "Cystine stones"],
    answer: 1,
    explanation:
      "Calcium oxalate stones are the most common (80%) worldwide and in India. Risk factors: hypercalciuria, hyperoxaluria, hypocitraturia. Uric acid stones: radiolucent on X-ray, seen in gout/hyperuricosuria. Struvite: 'staghorn', associated with urease-producing bacteria.",
  },
  {
    id: 152,
    subject: "Medicine",
    stem: "Which clinical feature best distinguishes Type 1 DM from Type 2 DM at presentation?",
    options: [
      "Age > 40 years",
      "Obesity",
      "Diabetic ketoacidosis at onset",
      "Family history of diabetes",
    ],
    answer: 2,
    explanation:
      "DKA at presentation is the hallmark of Type 1 DM (absolute insulin deficiency → lipolysis → ketogenesis). Type 2 DM presents with HHS (hyperosmolar hyperglycaemic state) or is found incidentally. C-peptide and antibodies (anti-GAD, anti-IA2) confirm Type 1.",
  },
  {
    id: 153,
    subject: "Medicine",
    stem: "Erythema nodosum is most commonly associated with which condition in India?",
    options: ["Crohn's disease", "Sarcoidosis", "Tuberculosis", "Streptococcal infection"],
    answer: 2,
    explanation:
      "In India, the most common cause of erythema nodosum is tuberculosis (due to high TB prevalence). Globally, streptococcal infection and sarcoidosis are common. EN = tender, erythematous nodules on shins (panniculitis).",
  },
  {
    id: 154,
    subject: "Medicine",
    stem: "Trousseau's sign (migrating thrombophlebitis) is classically associated with:",
    options: ["SLE", "Pancreatic adenocarcinoma", "Liver cirrhosis", "Renal cell carcinoma"],
    answer: 1,
    explanation:
      "Trousseau's sign of malignancy = migratory thrombophlebitis — classically associated with pancreatic cancer (Trousseau himself died of it). Also seen in other GI adenocarcinomas. Hypercoagulability via mucin-mediated platelet activation.",
  },
  {
    id: 155,
    subject: "Medicine",
    stem: "Chvostek's sign (facial muscle twitch on tapping facial nerve) indicates:",
    options: ["Hyperkalaemia", "Hypomagnesaemia", "Hypocalcaemia", "Hypernatraemia"],
    answer: 2,
    explanation:
      "Chvostek's sign = tap facial nerve anterior to ear → facial muscle twitch → indicates hypocalcaemia (neuromuscular irritability). Trousseau's sign (carpal spasm with BP cuff) is more specific for hypocalcaemia. Treat with IV calcium gluconate if symptomatic.",
  },

  // ─── SURGERY EXTENDED (156–168) ──────────────────────────────────────────
  {
    id: 156,
    subject: "Surgery",
    stem: "Most common type of thyroid carcinoma is:",
    options: ["Follicular", "Papillary", "Medullary", "Anaplastic"],
    answer: 1,
    explanation:
      "Papillary thyroid carcinoma (PTC) is the most common (80%). Best prognosis. RET/PTC rearrangement. Psammoma bodies on histology. Medullary = calcitonin-secreting, associated with MEN2. Anaplastic = worst prognosis, rapidly fatal.",
  },
  {
    id: 157,
    subject: "Surgery",
    stem: "The Alvarado score is used to assess the likelihood of:",
    options: ["Appendicitis", "Cholelithiasis", "Diverticulitis", "Pancreatitis"],
    answer: 0,
    explanation:
      "Alvarado score (MANTRELS): Migration of pain to RIF, Anorexia, Nausea, Tenderness in RIF, Rebound tenderness, Elevated temperature, Leucocytosis, Shift to left. Score ≥7 = high likelihood appendicitis → surgery.",
  },
  {
    id: 158,
    subject: "Surgery",
    stem: "The most common cause of small bowel obstruction in adults in developed countries is:",
    options: ["Hernia", "Adhesions", "Tumours", "Volvulus"],
    answer: 1,
    explanation:
      "Adhesions (post-surgical) are the most common cause of SBO in adults (~60%). In developing countries (and in virgin abdomen), hernia is the commonest cause. Management: conservative (NGT, IV fluids) vs surgery based on signs of strangulation.",
  },
  {
    id: 159,
    subject: "Surgery",
    stem: "Courvoisier's law states that in obstructive jaundice:",
    options: [
      "Palpable gallbladder = stone in CBD",
      "Palpable gallbladder with jaundice is unlikely due to stone",
      "Jaundice without palpable gallbladder = malignancy",
      "Gallbladder carcinoma causes jaundice always",
    ],
    answer: 1,
    explanation:
      "Courvoisier's law: jaundice + palpable (non-tender) gallbladder is unlikely to be due to stone (chronic stone disease causes fibrosis/shrinkage). More likely = periampullary carcinoma, pancreatic head cancer, cholangiocarcinoma.",
  },
  {
    id: 160,
    subject: "Surgery",
    stem: "Duke's B colorectal carcinoma means:",
    options: [
      "Tumour confined to mucosa",
      "Tumour through muscularis propria, no lymph node involvement",
      "Lymph node involvement",
      "Distant metastases",
    ],
    answer: 1,
    explanation:
      "Duke's staging: A = confined to bowel wall; B = through bowel wall, nodes negative; C = lymph node positive; D = distant metastases (added later). Now replaced by TNM staging in practice but Duke's remains an exam favourite.",
  },
  {
    id: 161,
    subject: "Surgery",
    stem: "Sentinel lymph node biopsy (SLNB) is a technique used in which cancer to avoid unnecessary axillary dissection?",
    options: ["Thyroid cancer", "Breast cancer", "Colon cancer", "Prostate cancer"],
    answer: 1,
    explanation:
      "SLNB in breast cancer: inject blue dye/radiotracer near tumour → identify first draining (sentinel) lymph node → biopsy. If SLN negative, full axillary clearance avoided → less morbidity (lymphoedema, shoulder dysfunction).",
  },
  {
    id: 162,
    subject: "Surgery",
    stem: "The Parkland formula for fluid resuscitation in burns uses:",
    options: [
      "2 mL × weight (kg) × TBSA% (normal saline)",
      "4 mL × weight (kg) × TBSA% (Ringer's lactate)",
      "4 mL × weight (kg) × TBSA% (colloid)",
      "1 mL × weight (kg) × TBSA% (albumin)",
    ],
    answer: 1,
    explanation:
      "Parkland formula: 4 mL × kg × TBSA% burned using Ringer's lactate. Half given in first 8 hours from time of burn; remaining half over next 16 hours. Applies to burns >15% TBSA. Fluid starts from TIME OF BURN, not arrival.",
  },
  {
    id: 163,
    subject: "Surgery",
    stem: "Trendelenburg test is used to assess:",
    options: ["Femoral artery competence", "Saphenofemoral junction incompetence (varicose veins)", "Hip joint stability", "Inguinal hernia"],
    answer: 1,
    explanation:
      "Trendelenburg test for varicose veins: elevate leg → apply tourniquet → stand up. If veins fill immediately after releasing tourniquet = saphenofemoral junction incompetence. Modified test also assesses perforator incompetence.",
  },
  {
    id: 164,
    subject: "Surgery",
    stem: "Most common site of carcinoid tumour in the GI tract is:",
    options: ["Stomach", "Duodenum", "Appendix", "Sigmoid colon"],
    answer: 2,
    explanation:
      "Appendix is the most common site of GI carcinoid (incidental finding on appendicectomy). However, ileal carcinoids are most likely to cause carcinoid syndrome (5-HT, bradykinin). Carcinoid syndrome = flushing + diarrhoea + bronchospasm + right heart lesions.",
  },
  {
    id: 165,
    subject: "Surgery",
    stem: "Meckel's diverticulum follows the rule of 2s. Which of the following is part of the rule?",
    options: [
      "2 cm long, 2 feet from ileocaecal valve, affects 2% of population",
      "2 inches long, 20 cm from ileocaecal valve, affects 20% of population",
      "2 cm, 2 m from ileocaecal valve, 2% of population",
      "2 types of ectopic mucosa, 2% incidence, presents at 20 years",
    ],
    answer: 0,
    explanation:
      "Meckel's rule of 2s: 2% of population, 2 inches (5 cm) long, 2 feet (60 cm) from ileocaecal valve, 2 types of ectopic mucosa (gastric most common → peptic ulcer/bleed, pancreatic), presents in first 2 years of life.",
  },
  {
    id: 166,
    subject: "Surgery",
    stem: "The Glasgow Coma Scale (GCS) score for a patient who opens eyes to pain, makes incomprehensible sounds, and localises pain is:",
    options: ["7", "9", "11", "13"],
    answer: 1,
    explanation:
      "GCS: Eyes (E): 1 none, 2 to pain, 3 to voice, 4 spontaneous. Verbal (V): 1 none, 2 sounds, 3 words, 4 confused, 5 oriented. Motor (M): 1 none, 2 extension, 3 flexion, 4 withdrawal, 5 localises, 6 obeys. E2+V2+M5 = 9.",
  },
  {
    id: 167,
    subject: "Surgery",
    stem: "Port site metastasis in laparoscopic surgery for colorectal cancer is associated with:",
    options: ["Large port size", "High CO₂ pressure pneumoperitoneum", "Inadequate specimen bagging", "All of the above"],
    answer: 3,
    explanation:
      "Port site metastasis risk reduced by: specimen retrieval in bags, wound irrigation, avoiding high pneumoperitoneum pressures that aerosolise tumour cells, and using appropriate port sizes. Incidence is ~1% in experienced hands.",
  },
  {
    id: 168,
    subject: "Surgery",
    stem: "First-line treatment for spontaneous bacterial peritonitis (SBP) is:",
    options: ["Ampicillin + gentamicin", "Cefotaxime IV", "Metronidazole", "Oral ciprofloxacin only"],
    answer: 1,
    explanation:
      "SBP (infection of ascitic fluid, usually E.coli/Klebsiella/Streptococcus) → cefotaxime IV (or ceftriaxone) is first-line. Albumin infusion given concurrently (1.5 g/kg day 1, 1 g/kg day 3) reduces hepatorenal syndrome risk. Prophylaxis: norfloxacin.",
  },

  // ─── PATHOLOGY EXTENDED (169–180) ────────────────────────────────────────
  {
    id: 169,
    subject: "Pathology",
    stem: "Which tumour marker is elevated in hepatocellular carcinoma (HCC)?",
    options: ["CEA", "CA 19-9", "Alpha-fetoprotein (AFP)", "CA 125"],
    answer: 2,
    explanation:
      "AFP is the primary marker for HCC (sensitivity ~60%, specificity ~90% for AFP > 400 ng/mL). Also elevated in yolk sac tumours, hepatoblastoma, and physiologically in pregnancy. CEA = colon cancer; CA 19-9 = pancreatic/biliary; CA 125 = ovarian.",
  },
  {
    id: 170,
    subject: "Pathology",
    stem: "Reed-Sternberg cells are the hallmark of:",
    options: ["Non-Hodgkin lymphoma", "Hodgkin lymphoma", "Burkitt lymphoma", "Mycosis fungoides"],
    answer: 1,
    explanation:
      "Reed-Sternberg cells (owl-eye nucleoli, binucleated/multinucleated large cells) are the diagnostic hallmark of Hodgkin lymphoma. RS cells are CD15+, CD30+ (most subtypes). In nodular lymphocyte-predominant HL (NLPHL), 'popcorn cells' are seen instead.",
  },
  {
    id: 171,
    subject: "Pathology",
    stem: "The histological type of carcinoma breast most commonly associated with Paget's disease of the nipple is:",
    options: ["Lobular carcinoma in situ", "Invasive lobular carcinoma", "Ductal carcinoma in situ (DCIS)", "Mucinous carcinoma"],
    answer: 2,
    explanation:
      "Paget's disease of the nipple = DCIS (ductal carcinoma in situ) or invasive ductal carcinoma with intraepidermal spread of malignant cells to the nipple-areola. Looks like eczema of nipple. Paget cells are large with pale cytoplasm, HER2+.",
  },
  {
    id: 172,
    subject: "Pathology",
    stem: "The oncogene mutated in Burkitt lymphoma is:",
    options: ["BCL-2", "c-MYC", "BCR-ABL", "RET"],
    answer: 1,
    explanation:
      "Burkitt lymphoma: c-MYC translocation t(8;14) — most common; less common: t(2;8) or t(8;22). Starry sky pattern on H&E. EBV-associated (endemic form). BCL-2 = follicular lymphoma t(14;18). BCR-ABL = CML t(9;22).",
  },
  {
    id: 173,
    subject: "Pathology",
    stem: "Coagulative necrosis is seen in all of the following EXCEPT:",
    options: ["Myocardial infarction", "Renal infarction", "Brain infarction", "Splenic infarction"],
    answer: 2,
    explanation:
      "Brain infarction causes liquefactive necrosis (due to high lipid content and activated proteases). All other solid organ infarcts (heart, kidney, spleen) cause coagulative necrosis — cell outlines preserved, eosinophilic, ghost cells.",
  },
  {
    id: 174,
    subject: "Pathology",
    stem: "Gaucher's disease is caused by a deficiency of:",
    options: ["Sphingomyelinase", "Glucocerebrosidase (beta-glucosidase)", "Hexosaminidase A", "Alpha-galactosidase A"],
    answer: 1,
    explanation:
      "Gaucher's disease: glucocerebrosidase deficiency → glucocerebroside accumulation in macrophages. 'Crinkled paper' or 'wrinkled tissue paper' macrophages in bone marrow. Type 1 (non-neuropathic) most common. Treat with enzyme replacement (imiglucerase).",
  },
  {
    id: 175,
    subject: "Pathology",
    stem: "Dystrophic calcification occurs in:",
    options: [
      "Normal tissue with elevated serum calcium",
      "Dead or dying tissue with normal serum calcium",
      "Normal tissue with elevated serum phosphate",
      "Viable tissue with hypercalcaemia",
    ],
    answer: 1,
    explanation:
      "Dystrophic calcification: calcium deposits in dead/necrotic/abnormal tissue (serum calcium NORMAL). Examples: atherosclerotic plaques, TB caseous necrosis, tumour calcification. Metastatic calcification = calcification in normal tissue due to hypercalcaemia.",
  },
  {
    id: 176,
    subject: "Pathology",
    stem: "The Philadelphia chromosome (t9;22) results in which fusion gene?",
    options: ["PML-RARA", "BCL2-IGH", "BCR-ABL1", "EWS-FLI1"],
    answer: 2,
    explanation:
      "t(9;22) Philadelphia chromosome → BCR-ABL1 fusion → constitutively active tyrosine kinase → uncontrolled proliferation. Present in >95% CML, 25-30% adult ALL. Imatinib (Gleevec) specifically inhibits BCR-ABL → revolutionary targeted therapy.",
  },
  {
    id: 177,
    subject: "Pathology",
    stem: "Psammoma bodies are characteristically seen in all EXCEPT:",
    options: ["Papillary thyroid carcinoma", "Serous papillary ovarian carcinoma", "Meningioma", "Follicular thyroid carcinoma"],
    answer: 3,
    explanation:
      "Psammoma bodies (laminated calcified concentric rings) are seen in: papillary thyroid carcinoma, serous papillary ovarian carcinoma, meningioma, papillary RCC. NOT seen in follicular thyroid carcinoma (psammoma bodies suggest papillary pattern).",
  },
  {
    id: 178,
    subject: "Pathology",
    stem: "Hyperplasia differs from hypertrophy in that hyperplasia involves:",
    options: ["Increase in cell size", "Increase in cell number", "Decrease in cell size", "Cell death"],
    answer: 1,
    explanation:
      "Hypertrophy = increase in cell SIZE (same cell number). Hyperplasia = increase in cell NUMBER (requires capacity for cell division). Cardiac muscle hypertrophy (post-MI), skeletal muscle hypertrophy (exercise). Endometrial hyperplasia (oestrogen excess). Both can coexist.",
  },
  {
    id: 179,
    subject: "Pathology",
    stem: "The pattern of necrosis seen in tuberculosis is:",
    options: ["Coagulative", "Liquefactive", "Caseous", "Fat necrosis"],
    answer: 2,
    explanation:
      "Caseous necrosis is the hallmark of tuberculosis — cheese-like, structureless, amorphous material on H&E. Differs from coagulative (structure preserved) and liquefactive (liquid pus). Also seen in some fungi (Histoplasma) and syphilitic gummas.",
  },
  {
    id: 180,
    subject: "Pathology",
    stem: "Li-Fraumeni syndrome is associated with germline mutations in:",
    options: ["BRCA1", "APC", "p53 (TP53)", "VHL"],
    answer: 2,
    explanation:
      "Li-Fraumeni syndrome: germline p53 (TP53) mutation → multiple cancers at young age (sarcomas, breast cancer, brain tumours, leukaemias, adrenal cortical carcinoma). Autosomal dominant. Risk of cancer by age 30: ~50%, by age 70: >90%.",
  },

  // ─── OBG EXTENDED (181–192) ──────────────────────────────────────────────
  {
    id: 181,
    subject: "OBG",
    stem: "The most common cause of postpartum haemorrhage (PPH) is:",
    options: ["Retained placenta", "Uterine atony", "Genital tract trauma", "Coagulopathy"],
    answer: 1,
    explanation:
      "Uterine atony accounts for 80% of PPH. The '4 Ts': Tone (atony 80%), Tissue (retained placenta), Trauma (lacerations), Thrombin (coagulopathy). First-line management: uterine massage + oxytocin 10 IU IM/IV.",
  },
  {
    id: 182,
    subject: "OBG",
    stem: "Pre-eclampsia is defined as hypertension (≥140/90) developing after __ weeks with proteinuria:",
    options: ["16 weeks", "20 weeks", "24 weeks", "28 weeks"],
    answer: 1,
    explanation:
      "Pre-eclampsia: new-onset hypertension (≥140/90 mmHg on 2 occasions ≥4 hours apart) after 20 weeks gestation with proteinuria (≥300 mg/24h or PCR ≥0.3) or end-organ involvement. Before 20 weeks = chronic hypertension.",
  },
  {
    id: 183,
    subject: "OBG",
    stem: "The drug of choice for prevention of eclamptic seizures is:",
    options: ["Phenytoin", "Diazepam", "Magnesium sulfate", "Phenobarbitone"],
    answer: 2,
    explanation:
      "Magnesium sulfate (MgSO₄) is the DOC for both treatment and prevention of eclamptic fits. Loading dose: 4g IV over 20 min; maintenance: 1g/hr. Monitor toxicity: loss of knee jerk reflex (first sign), respiratory depression (9-12 mEq/L), cardiac arrest (>12 mEq/L). Antidote: calcium gluconate.",
  },
  {
    id: 184,
    subject: "OBG",
    stem: "Cardinal movements of labour in the correct sequence are:",
    options: [
      "Engagement → flexion → descent → internal rotation → extension → external rotation → expulsion",
      "Descent → engagement → flexion → internal rotation → extension → expulsion",
      "Flexion → engagement → descent → external rotation → extension → expulsion",
      "Engagement → descent → flexion → external rotation → extension → expulsion",
    ],
    answer: 0,
    explanation:
      "Cardinal movements: Engagement → Descent → Flexion → Internal rotation → Extension → External rotation (restitution) → Expulsion. Mnemonic: 'Every Dog Finds It Extremely Easy' or 'EDFIEE'.",
  },
  {
    id: 185,
    subject: "OBG",
    stem: "FIGO staging of cervical carcinoma: tumour invading the parametrium but not reaching the pelvic wall is stage:",
    options: ["IB1", "IIA", "IIB", "IIIB"],
    answer: 2,
    explanation:
      "FIGO 2018 cervical cancer: Stage I = confined to cervix; IIA = upper 2/3 vagina; IIB = parametrial invasion (NOT pelvic wall); IIIA = lower 1/3 vagina; IIIB = pelvic wall or hydronephrosis; IVA = bladder/rectal mucosa; IVB = distant mets.",
  },
  {
    id: 186,
    subject: "OBG",
    stem: "The most common ectopic pregnancy site is:",
    options: ["Ovary", "Cornua", "Ampulla of fallopian tube", "Isthmus of fallopian tube"],
    answer: 2,
    explanation:
      "Ampulla of fallopian tube = 70% of ectopic pregnancies. Cornua/interstitial = most dangerous (ruptures at 8-16 weeks, massive haemorrhage). Ovarian and abdominal are rare. Risk factors: PID, previous tubal surgery, IUD failure.",
  },
  {
    id: 187,
    subject: "OBG",
    stem: "Duncan mechanism of placental separation differs from Schultz mechanism in that:",
    options: [
      "Central separation first in Duncan",
      "Maternal surface presents first in Duncan",
      "Fetal surface presents first in Duncan",
      "No bleeding in Duncan mechanism",
    ],
    answer: 1,
    explanation:
      "Schultz = central separation → fetal (shiny) surface presents first, bleeding is concealed then gushes. Duncan = peripheral/marginal separation → maternal (raw, rough) surface presents first, bleeding trickles throughout. Schultz more common (~80%).",
  },
  {
    id: 188,
    subject: "OBG",
    stem: "Asherman syndrome (intrauterine adhesions) is a complication of:",
    options: ["PCOD", "Endometriosis", "Aggressive curettage of uterus", "Uterine fibroid"],
    answer: 2,
    explanation:
      "Asherman syndrome: endometrial adhesions from aggressive curettage (post-abortion, post-partum) → amenorrhoea, infertility. Diagnosis: hysteroscopy (gold standard). Treatment: hysteroscopic adhesiolysis + oestrogen for endometrial regeneration.",
  },
  {
    id: 189,
    subject: "OBG",
    stem: "The most sensitive indicator of ovulation is:",
    options: [
      "Basal body temperature rise",
      "Serum progesterone on day 21",
      "LH surge detection",
      "Endometrial biopsy showing secretory phase",
    ],
    answer: 2,
    explanation:
      "LH surge precedes ovulation by 34–36 hours and is the earliest, most sensitive predictor. Basal body temperature rises AFTER ovulation (due to progesterone). Serum progesterone > 5 ng/mL on day 21 confirms ovulation retrospectively.",
  },
  {
    id: 190,
    subject: "OBG",
    stem: "Clue cells on vaginal wet mount are characteristic of:",
    options: ["Trichomonas vaginalis", "Candida albicans", "Bacterial vaginosis", "Gonorrhoea"],
    answer: 2,
    explanation:
      "Bacterial vaginosis (BV): clue cells (vaginal epithelial cells studded with bacteria, 'salt and pepper'), fishy amine odour, pH > 4.5, positive whiff test. Caused by Gardnerella vaginalis (not exclusively STI). Treat with metronidazole.",
  },
  {
    id: 191,
    subject: "OBG",
    stem: "Which investigation is most useful for assessing tubal patency in infertility?",
    options: ["Hysteroscopy", "Laparoscopy with chromopertubation", "Hysterosalpingography (HSG)", "Saline infusion sonography"],
    answer: 1,
    explanation:
      "Laparoscopy with chromopertubation (methylene blue through cervix while viewing tubes) is the gold standard for tubal assessment. HSG is a good first-line investigation (non-invasive, outpatient), but laparoscopy confirms and can simultaneously treat (adhesiolysis).",
  },
  {
    id: 192,
    subject: "OBG",
    stem: "The most common cause of female infertility worldwide is:",
    options: ["Tubal factor", "Ovulatory dysfunction", "Unexplained infertility", "Uterine factor"],
    answer: 0,
    explanation:
      "Tubal factor (PID-related damage, endometriosis, previous surgery) is the most common cause of female infertility globally (~40%). Ovulatory dysfunction (PCOD, hypothalamic amenorrhoea) is second. In developed nations, unexplained infertility is increasingly common.",
  },

  // ─── PAEDIATRICS EXTENDED (193–202) ──────────────────────────────────────
  {
    id: 193,
    subject: "Paediatrics",
    stem: "The drug of choice for childhood absence epilepsy (petit mal) is:",
    options: ["Carbamazepine", "Ethosuximide", "Phenobarbitone", "Vigabatrin"],
    answer: 1,
    explanation:
      "Ethosuximide is DOC for pure absence seizures in children. Valproate is used when absence coexists with other seizure types. Carbamazepine is contraindicated in absence epilepsy (can worsen). Vigabatrin → infantile spasms.",
  },
  {
    id: 194,
    subject: "Paediatrics",
    stem: "Normal birth weight is defined as:",
    options: ["> 2000 g", "1500–2000 g", "≥ 2500 g", "> 3000 g"],
    answer: 2,
    explanation:
      "Normal birth weight: ≥2500 g. Low birth weight (LBW): <2500 g. Very low birth weight (VLBW): <1500 g. Extremely low birth weight (ELBW): <1000 g. LBW includes preterm + SGA (small for gestational age).",
  },
  {
    id: 195,
    subject: "Paediatrics",
    stem: "Koplik's spots are pathognomonic of:",
    options: ["Rubella", "Varicella", "Measles", "Scarlet fever"],
    answer: 2,
    explanation:
      "Koplik's spots (white/grey papules on buccal mucosa opposite lower molars) appear 1–2 days before measles rash — pathognomonic. Measles rash: maculopapular, starts at hairline/behind ears, spreads downward (cephalocaudal). Complications: pneumonia, encephalitis, SSPE.",
  },
  {
    id: 196,
    subject: "Paediatrics",
    stem: "The commonest congenital heart disease in children is:",
    options: ["Atrial septal defect (ASD)", "Ventricular septal defect (VSD)", "Patent ductus arteriosus (PDA)", "Tetralogy of Fallot (ToF)"],
    answer: 1,
    explanation:
      "VSD is the most common CHD (30–35%). Most small VSDs close spontaneously. Large VSDs → Eisenmenger syndrome if untreated. ASD = second most common; PDA = third. Tetralogy of Fallot = most common cyanotic CHD.",
  },
  {
    id: 197,
    subject: "Paediatrics",
    stem: "The Apgar score is assessed at which time points after birth?",
    options: ["Immediately and at 5 minutes", "1 minute and 5 minutes", "2 minutes and 10 minutes", "At birth and at 10 minutes"],
    answer: 1,
    explanation:
      "APGAR score at 1 minute and 5 minutes. Parameters: Appearance (colour), Pulse (HR), Grimace (reflex irritability), Activity (muscle tone), Respiration. Score 7–10 = normal; 4–6 = moderate depression; 0–3 = severe depression → resuscitation.",
  },
  {
    id: 198,
    subject: "Paediatrics",
    stem: "Which vaccine is contraindicated in a child with HIV infection?",
    options: ["Inactivated polio vaccine (IPV)", "Hepatitis B vaccine", "BCG (in symptomatic HIV)", "Influenza vaccine (inactivated)"],
    answer: 2,
    explanation:
      "BCG is a live attenuated vaccine — contraindicated in symptomatic HIV (CD4 count low) due to risk of disseminated BCG disease. In asymptomatic HIV, BCG may be given in high-TB-burden countries (India gives BCG at birth before HIV diagnosis). IPV is safe in all HIV.",
  },
  {
    id: 199,
    subject: "Paediatrics",
    stem: "Kawasaki disease diagnostic criterion includes fever for at least how many days?",
    options: ["3 days", "5 days", "7 days", "10 days"],
    answer: 1,
    explanation:
      "Kawasaki disease (mucocutaneous lymph node syndrome): fever ≥5 days + 4 of 5: conjunctival injection, oral changes (strawberry tongue), rash, extremity changes (erythema/desquamation), cervical lymphadenopathy. Treat with IVIG + aspirin (rare exception where aspirin used in children).",
  },
  {
    id: 200,
    subject: "Paediatrics",
    stem: "Which investigation is the gold standard for diagnosis of cystic fibrosis?",
    options: ["Chest X-ray", "Sweat chloride test (>60 mmol/L)", "Sputum culture", "Serum IRT (immunoreactive trypsinogen)"],
    answer: 1,
    explanation:
      "Sweat chloride test (pilocarpine iontophoresis): >60 mmol/L diagnostic, 30–59 = borderline (repeat + CFTR mutation testing). CFTR mutation analysis also diagnostic. IRT used for newborn screening. CXR shows hyperinflation, bronchiectasis (not diagnostic).",
  },
  {
    id: 201,
    subject: "Paediatrics",
    stem: "The triple vaccine (DPT) is contraindicated in a child who had which reaction after previous dose?",
    options: ["Fever 38°C", "Redness at injection site", "Encephalopathy within 7 days", "Inconsolable crying for 3 hours"],
    answer: 2,
    explanation:
      "Encephalopathy within 7 days of DPT is an absolute contraindication to further doses. Relative contraindications: progressive neurological disorder, fever >40.5°C within 48h, inconsolable crying >3h, hypotonic-hyporesponsive episode. Fever <40.5°C, local reactions = not contraindications.",
  },
  {
    id: 202,
    subject: "Paediatrics",
    stem: "Physiological jaundice in a term newborn appears after how many hours of life?",
    options: ["<24 hours", "24–72 hours", "72–96 hours", ">7 days"],
    answer: 1,
    explanation:
      "Physiological neonatal jaundice appears after 24 hours (NEVER in first 24 hours — that's always pathological). Peaks at 3–5 days, resolves by 10–14 days in term infants (longer in preterm). Bilirubin <12 mg/dL (term) and <15 mg/dL (preterm) usually physiological.",
  },

  // ─── MICROBIOLOGY EXTENDED (203–212) ─────────────────────────────────────
  {
    id: 203,
    subject: "Microbiology",
    stem: "The Weil-Felix test is used for diagnosis of which disease?",
    options: ["Typhoid", "Rickettsial infections", "Leptospirosis", "Brucellosis"],
    answer: 1,
    explanation:
      "Weil-Felix test: agglutination of Proteus vulgaris OX-2, OX-19, OX-K strains by patient serum — tests for rickettsial infections. OX-19 + OX-2 positive = epidemic typhus, Rocky Mountain spotted fever. OX-K positive = scrub typhus (Orientia tsutsugamushi).",
  },
  {
    id: 204,
    subject: "Microbiology",
    stem: "Which hepatitis virus is transmitted by the faeco-oral route and does NOT cause chronic infection?",
    options: ["Hepatitis B", "Hepatitis C", "Hepatitis D", "Hepatitis E"],
    answer: 3,
    explanation:
      "Hepatitis E = faeco-oral, does NOT cause chronic hepatitis (like Hep A). However, HEV is DANGEROUS in pregnancy — mortality 20–30% in third trimester. Hepatitis B, C, D = parenteral/sexual; B, C, D can cause chronic hepatitis.",
  },
  {
    id: 205,
    subject: "Microbiology",
    stem: "The capsule of Cryptococcus neoformans is demonstrated by:",
    options: ["Gram stain", "ZN stain", "India ink preparation", "Giemsa stain"],
    answer: 2,
    explanation:
      "India ink preparation: negative staining shows C. neoformans with prominent polysaccharide capsule (clear halo around yeast cell) in CSF. India ink positive in ~70% HIV-associated cryptococcal meningitis. Latex agglutination (cryptococcal antigen) is more sensitive.",
  },
  {
    id: 206,
    subject: "Microbiology",
    stem: "The vector for Kala-azar (visceral leishmaniasis) in India is:",
    options: ["Anopheles mosquito", "Culex mosquito", "Phlebotomus sandfly", "Ixodes tick"],
    answer: 2,
    explanation:
      "Phlebotomus argentipes (female sandfly) is the vector for Kala-azar (Leishmania donovani) in India. Endemic in Bihar, Jharkhand, West Bengal, UP. Aldehyde (formol-gel) test: positive in Kala-azar (globulin elevation). Treat with liposomal amphotericin B (first-line in India).",
  },
  {
    id: 207,
    subject: "Microbiology",
    stem: "The 'school of fish' pattern on Gram stain is characteristic of:",
    options: ["Clostridium perfringens", "Haemophilus ducreyi", "Bacteroides fragilis", "Listeria monocytogenes"],
    answer: 1,
    explanation:
      "Haemophilus ducreyi (chancroid): small gram-negative coccobacilli in 'school of fish' or 'railroad track' parallel streams pattern. Causes painful genital ulcer (unlike painless primary syphilis). Treat with azithromycin single dose or ceftriaxone.",
  },
  {
    id: 208,
    subject: "Microbiology",
    stem: "The M protein of Group A Streptococcus (Streptococcus pyogenes) is responsible for:",
    options: ["Beta-haemolysis", "Antiphagocytic virulence", "Exotoxin production", "Resistance to penicillin"],
    answer: 1,
    explanation:
      "M protein of S. pyogenes is the primary virulence factor — antiphagocytic (inhibits complement activation and opsonisation). >80 serotypes based on M protein. Anti-M antibodies are type-specific and protective. Cross-reactive with cardiac myosin → rheumatic fever.",
  },
  {
    id: 209,
    subject: "Microbiology",
    stem: "Cold agglutinin test is positive in:",
    options: ["Mycoplasma pneumoniae infection", "Legionella pneumophila infection", "Chlamydia psittaci infection", "Pneumococcal pneumonia"],
    answer: 0,
    explanation:
      "Cold agglutinins (IgM anti-I RBC antibodies at 4°C) are positive in Mycoplasma pneumoniae pneumonia (~50% of cases). Also seen in EBV, CMV, and haemolytic anaemias. Mycoplasma: 'walking pneumonia', young adults, X-ray worse than clinical signs, no cell wall (penicillin ineffective).",
  },
  {
    id: 210,
    subject: "Microbiology",
    stem: "The Mantoux test uses:",
    options: ["Whole killed M. tuberculosis", "5 TU of PPD (purified protein derivative)", "BCG vaccine antigen", "10 TU of old tuberculin"],
    answer: 1,
    explanation:
      "Mantoux test: 5 TU (tuberculin units) of PPD (RT-23) injected intradermally on volar forearm. Read at 48–72 hours. Induration (not redness) ≥10 mm = positive in general population; ≥5 mm = positive in HIV, immunocompromised, recent TB contact.",
  },
  {
    id: 211,
    subject: "Microbiology",
    stem: "Negri bodies are pathognomonic of:",
    options: ["Herpes encephalitis", "Rabies", "Japanese encephalitis", "CMV encephalitis"],
    answer: 1,
    explanation:
      "Negri bodies (eosinophilic intracytoplasmic inclusions in Purkinje cells of cerebellum and hippocampal neurons) are pathognomonic of rabies. Seen on H&E stain of brain tissue (post-mortem diagnosis). Ante-mortem: RT-PCR of saliva, skin biopsy.",
  },
  {
    id: 212,
    subject: "Microbiology",
    stem: "The laboratory diagnosis of enteric fever (typhoid) in the first week of illness is best made by:",
    options: ["Stool culture", "Urine culture", "Blood culture", "Widal test"],
    answer: 2,
    explanation:
      "Blood culture is positive in 90% of cases in WEEK 1 (bacteraemia phase). Stool/urine culture positive weeks 2–3. Widal test: O agglutinins rise week 1, H agglutinins rise week 2. Widal titre ≥1:80 for O is significant; ≥1:160 for H. Blood culture = gold standard.",
  },

  // ─── ENT/OPHTHALMOLOGY EXTENDED (213–222) ───────────────────────────────
  {
    id: 213,
    subject: "ENT/Ophthalmology",
    stem: "The most common cause of conductive hearing loss in children is:",
    options: ["Otosclerosis", "Otitis media with effusion (glue ear)", "Acoustic neuroma", "Presbycusis"],
    answer: 1,
    explanation:
      "Otitis media with effusion (OME/'glue ear') is the most common cause of acquired conductive hearing loss in children (peak age 2–5 years). Accumulation of non-purulent fluid in middle ear. Treatment: observation 3 months → grommets (ventilation tubes).",
  },
  {
    id: 214,
    subject: "ENT/Ophthalmology",
    stem: "The treatment of choice for cholesteatoma is:",
    options: ["Antibiotics", "Topical ear drops", "Surgical excision (mastoidectomy)", "Hearing aid"],
    answer: 2,
    explanation:
      "Cholesteatoma (keratinising squamous epithelium in middle ear/mastoid) = surgical emergency — erodes bone, can cause intracranial complications. Treatment: mastoidectomy (cortical or modified radical). Cannot be treated conservatively (will expand and erode).",
  },
  {
    id: 215,
    subject: "ENT/Ophthalmology",
    stem: "The most common organism causing acute bacterial rhinosinusitis is:",
    options: ["Moraxella catarrhalis", "Haemophilus influenzae", "Streptococcus pneumoniae", "Staphylococcus aureus"],
    answer: 2,
    explanation:
      "Streptococcus pneumoniae is the most common cause of acute bacterial rhinosinusitis (30–35%), followed by H. influenzae (20–30%) and M. catarrhalis (<10%). Most viral sinusitis (>90%) resolves spontaneously without antibiotics.",
  },
  {
    id: 216,
    subject: "ENT/Ophthalmology",
    stem: "Rinne's test with BC > AC (Rinne negative) in the right ear suggests:",
    options: [
      "Right sensorineural hearing loss",
      "Right conductive hearing loss",
      "Left sensorineural hearing loss",
      "Normal hearing",
    ],
    answer: 1,
    explanation:
      "Normally AC > BC (Rinne positive). If BC > AC (Rinne negative) = conductive hearing loss in that ear. Weber test: sound lateralises to the AFFECTED ear in conductive loss; to the NORMAL ear in sensorineural loss.",
  },
  {
    id: 217,
    subject: "ENT/Ophthalmology",
    stem: "The most common benign tumour of the parotid gland is:",
    options: ["Mucoepidermoid carcinoma", "Pleomorphic adenoma", "Warthin's tumour", "Acinic cell carcinoma"],
    answer: 1,
    explanation:
      "Pleomorphic adenoma (benign mixed tumour) = most common salivary gland tumour (70–80%), most common in parotid. Contains epithelial + myoepithelial + mesenchymal elements. Risk of malignant transformation if untreated. Treat with superficial parotidectomy.",
  },
  {
    id: 218,
    subject: "ENT/Ophthalmology",
    stem: "Trachoma (blinding eye disease) is caused by:",
    options: ["Neisseria gonorrhoeae", "Chlamydia trachomatis (serotypes A–C)", "Herpes simplex virus", "Adenovirus"],
    answer: 1,
    explanation:
      "Trachoma: Chlamydia trachomatis serotypes A, B, Ba, C → leading infectious cause of blindness globally. WHO SAFE strategy: Surgery (trichiasis), Antibiotics (azithromycin), Facial cleanliness, Environmental improvement. India: highly endemic in Rajasthan, UP.",
  },
  {
    id: 219,
    subject: "ENT/Ophthalmology",
    stem: "Bitot's spots are a sign of deficiency of which vitamin?",
    options: ["Vitamin B12", "Vitamin C", "Vitamin A", "Vitamin D"],
    answer: 2,
    explanation:
      "Bitot's spots (foamy, cheesy triangular spots on bulbar conjunctiva) = early sign of vitamin A deficiency (xerophthalmia). Progression: night blindness → xerosis conjunctivae → Bitot's spots → corneal xerosis → keratomalacia → blindness.",
  },
  {
    id: 220,
    subject: "ENT/Ophthalmology",
    stem: "The most common cause of sudden painless loss of vision in an elderly patient with diabetes and hypertension is:",
    options: ["Acute angle closure glaucoma", "Central retinal artery occlusion (CRAO)", "Vitreous haemorrhage", "Retinal detachment"],
    answer: 1,
    explanation:
      "CRAO: sudden, painless, profound visual loss, 'cherry red spot' at macula (choroidal circulation visible through avascular fovea), pale retina. Emergency (irreversible after 90 min). Risk factors: emboli (carotid, cardiac), vasculitis, hypertension, DM. Urgent ophthalmology referral.",
  },
  {
    id: 221,
    subject: "ENT/Ophthalmology",
    stem: "The most common type of glaucoma in India is:",
    options: ["Acute angle-closure glaucoma", "Primary open-angle glaucoma", "Secondary glaucoma", "Congenital glaucoma"],
    answer: 1,
    explanation:
      "Primary open-angle glaucoma (POAG) is the most common glaucoma in India (and globally). Chronic, painless, progressive peripheral vision loss. IOP usually elevated (>21 mmHg). Cupping of optic disc (CDR >0.6). Treat with beta-blockers (timolol) or prostaglandin analogues (latanoprost).",
  },
  {
    id: 222,
    subject: "ENT/Ophthalmology",
    stem: "Corneal graft (penetrating keratoplasty) rejection is primarily mediated by:",
    options: ["Antibody-mediated rejection", "T-cell mediated (cellular) rejection", "Complement activation", "NK cell-mediated rejection"],
    answer: 1,
    explanation:
      "Corneal graft rejection is primarily T-cell mediated (cellular). Cornea is 'immune-privileged' (avascular, no lymphatics, low MHC expression) — hence the best graft survival of any tissue (~90% at 5 years). Rejection signs: oedema, keratic precipitates, Khodadoust line.",
  },

  // ─── PSM EXTENDED (223–232) ───────────────────────────────────────────────
  {
    id: 223,
    subject: "PSM/Community Medicine",
    stem: "The number of ASHA workers in India (approximately) is:",
    options: ["500,000", "1 million", "2 million", "5 million"],
    answer: 1,
    explanation:
      "There are approximately 1 million (10 lakh) ASHAs in India. Norm: 1 ASHA per 1000 population in general areas; 1 per habitation in tribal/hilly areas. ASHA is a community health volunteer, not a health worker (receives incentives, not salary).",
  },
  {
    id: 224,
    subject: "PSM/Community Medicine",
    stem: "Which is the correct infant mortality rate (IMR) of India as per SRS 2020-21?",
    options: ["27 per 1000 live births", "35 per 1000 live births", "42 per 1000 live births", "50 per 1000 live births"],
    answer: 1,
    explanation:
      "IMR India (SRS 2020-21): 35 per 1000 live births. Best state: Kerala (6/1000). Worst: MP (41/1000). U5MR (NFHS-5): 41.9. NMR: 28.2. MMR (SRS 2018-20): 97 per 100,000 live births. These figures are heavily tested in NEET PG.",
  },
  {
    id: 225,
    subject: "PSM/Community Medicine",
    stem: "Integrated Child Development Services (ICDS) is administered by the Ministry of:",
    options: ["Health and Family Welfare", "Women and Child Development", "Social Justice and Empowerment", "Rural Development"],
    answer: 1,
    explanation:
      "ICDS is administered by the Ministry of Women and Child Development (not MoHFW). Anganwadi centres provide 6 services: supplementary nutrition, non-formal pre-school education, nutrition and health education, immunisation, health check-up, referral services.",
  },
  {
    id: 226,
    subject: "PSM/Community Medicine",
    stem: "The attack rate in an outbreak is calculated as:",
    options: [
      "Number of new cases / Total population at risk × 100",
      "Number of cases / Population exposed × 100",
      "Cumulative incidence during the outbreak",
      "Both B and C",
    ],
    answer: 3,
    explanation:
      "Attack rate = number who develop disease / total exposed (at risk) × 100. It is essentially cumulative incidence used during an outbreak (typically a short, defined period). Secondary attack rate (SAR) = new cases in contacts / susceptible contacts × 100.",
  },
  {
    id: 227,
    subject: "PSM/Community Medicine",
    stem: "The National Nutrition Mission (POSHAN Abhiyaan) targets reduction in stunting to:",
    options: ["<20% by 2022", "25% by 2022", "<40% by 2022", "<15% by 2025"],
    answer: 1,
    explanation:
      "POSHAN Abhiyaan (2018): reduce stunting from 38.4% (NFHS-4) to 25% by 2022. Target 3% annual reduction. NFHS-5 shows stunting at 35.5% — still far from target. Also targets: anaemia, LBW, wasting, undernutrition, overweight.",
  },
  {
    id: 228,
    subject: "PSM/Community Medicine",
    stem: "Correlation coefficient (r) of +1 indicates:",
    options: ["No correlation", "Perfect negative correlation", "Perfect positive correlation", "Moderate positive correlation"],
    answer: 2,
    explanation:
      "Pearson's r: +1 = perfect positive correlation, -1 = perfect negative correlation, 0 = no correlation. 0.1–0.3 = weak, 0.3–0.7 = moderate, >0.7 = strong. r² (coefficient of determination) = % of variance in Y explained by X.",
  },
  {
    id: 229,
    subject: "PSM/Community Medicine",
    stem: "The Pradhan Mantri Jan Arogya Yojana (PM-JAY/Ayushman Bharat) provides health cover of:",
    options: ["₹1 lakh per family per year", "₹3 lakh per family per year", "₹5 lakh per family per year", "₹10 lakh per family per year"],
    answer: 2,
    explanation:
      "PM-JAY/Ayushman Bharat: ₹5 lakh per family per year for secondary and tertiary hospitalisation. Covers ~107 million vulnerable families (bottom 40% of population). Cashless, paperless at empanelled hospitals. Launched 2018. Previously called RSBY (₹30,000 cover).",
  },
  {
    id: 230,
    subject: "PSM/Community Medicine",
    stem: "Type I error (alpha error) in hypothesis testing refers to:",
    options: [
      "Accepting H₀ when it is false",
      "Rejecting H₀ when it is true",
      "Not detecting a true difference",
      "Incorrect sample size calculation",
    ],
    answer: 1,
    explanation:
      "Type I error (alpha): rejecting H₀ when it is actually true (false positive). Usually set at 0.05 (5%). Type II error (beta): accepting H₀ when it is false (false negative). Power = 1 - beta. POWER increases with larger sample size.",
  },
  {
    id: 231,
    subject: "PSM/Community Medicine",
    stem: "The first Indian state to achieve polio-free status was:",
    options: ["Bihar", "Uttar Pradesh", "Kerala", "Tamil Nadu"],
    answer: 2,
    explanation:
      "Kerala was the first state to achieve polio-free status. India was declared polio-free by WHO in 2014 (3 years after last case in UP in 2011). India used OPV (Oral Polio Vaccine - Sabin) in national pulse immunisation. IPV added to routine UIP in 2015.",
  },
  {
    id: 232,
    subject: "PSM/Community Medicine",
    stem: "Which of the following is a notifiable disease in India under the Integrated Disease Surveillance Programme (IDSP)?",
    options: ["Common cold", "Hypertension", "Cholera", "Hyperlipidaemia"],
    answer: 2,
    explanation:
      "Cholera is a notifiable disease under IDSP. All epidemic-prone diseases must be notified: cholera, plague, yellow fever (International Health Regulations notifiable), plus dengue, malaria, viral hepatitis, AES, AFP, influenza A H1N1, COVID-19 etc. under IDSP.",
  },

  // ─── FORENSIC MEDICINE (233–242) ─────────────────────────────────────────
  {
    id: 233,
    subject: "Forensic Medicine",
    stem: "Rigor mortis typically starts after death at:",
    options: ["Immediately", "30 minutes", "3–6 hours", "12–18 hours"],
    answer: 2,
    explanation:
      "Rigor mortis: onset 3–6 hours after death (earlier in hot climate/exercise before death), maximum stiffness at 12 hours, starts disappearing at 24–36 hours, completely gone by 48–72 hours. Caused by ATP depletion → actin-myosin cross-links unable to release.",
  },
  {
    id: 234,
    subject: "Forensic Medicine",
    stem: "The MHCA (Mental Healthcare Act) 2017 replaces which previous Act?",
    options: ["Indian Lunacy Act 1912", "Mental Health Act 1987", "Persons with Disabilities Act 1995", "NDPS Act 1985"],
    answer: 1,
    explanation:
      "MHCA 2017 replaced the Mental Health Act 1987. Key features: rights-based approach, advance directives, nominated representative, mental illness definition (Section 3), decriminalises suicide attempt (Section 115), free treatment at government facilities.",
  },
  {
    id: 235,
    subject: "Forensic Medicine",
    stem: "Section 375 IPC (now BNS 2023) defines:",
    options: ["Culpable homicide", "Rape", "Kidnapping", "Cheating"],
    answer: 1,
    explanation:
      "IPC Section 375 = Rape (7 circumstances including penetration, without consent, with minors). Punishment: Section 376 = minimum 7 years, maximum life imprisonment. 2013 Criminal Law Amendment (Nirbhaya Act) expanded definition. Note: BNS 2023 now applies (Sections 63–64 of BNS).",
  },
  {
    id: 236,
    subject: "Forensic Medicine",
    stem: "The minimum age of consent for sexual activity in India as per POCSO Act 2012 is:",
    options: ["16 years", "18 years", "14 years", "21 years"],
    answer: 1,
    explanation:
      "POCSO Act 2012: any sexual activity with a person below 18 years = 'child sexual abuse' regardless of consent. Mandatory reporting requirement for all persons/institutions. Punishment up to life imprisonment for aggravated sexual assault.",
  },
  {
    id: 237,
    subject: "Forensic Medicine",
    stem: "The MTP (Medical Termination of Pregnancy) Act 2021 allows termination up to 24 weeks for:",
    options: [
      "Any woman on request",
      "Rape survivors, disabled women, and minors (special categories)",
      "All married women",
      "Women with more than 3 children",
    ],
    answer: 1,
    explanation:
      "MTP Amendment 2021: up to 20 weeks with 1 registered medical practitioner opinion; up to 24 weeks for special categories (rape survivors, minors, disabled, mentally ill, multi-gestation); beyond 24 weeks only for substantial foetal abnormalities (Medical Board). No upper limit changed for foetal anomalies.",
  },
  {
    id: 238,
    subject: "Forensic Medicine",
    stem: "Putrefaction is accelerated by:",
    options: ["Cold temperature", "Dry environment", "Hot, moist conditions", "Burial underground"],
    answer: 2,
    explanation:
      "Putrefaction (decomposition by bacteria): accelerated by heat + moisture. Summer/tropical conditions accelerate decomposition significantly. Retarded by: cold (embalming), dry conditions (mummification), waterlogging (adipocere formation), burial depth (slower in deep burial).",
  },
  {
    id: 239,
    subject: "Forensic Medicine",
    stem: "A professional secret in medical ethics may be disclosed without the patient's consent in which situation?",
    options: [
      "Request by a relative",
      "Notifiable communicable disease",
      "Insurance company request",
      "Patient's employer request",
    ],
    answer: 1,
    explanation:
      "Compulsory disclosure of medical secrets: notifiable diseases (cholera, plague, etc.), court order/subpoena, when patient is a danger to self/others, medico-legal cases, MTP notification. Disclosure to insurance/employer without consent = breach of confidentiality.",
  },
  {
    id: 240,
    subject: "Forensic Medicine",
    stem: "McEwen's sign in drowning refers to:",
    options: ["Cherry-red mucosa", "Washerwoman's hands + cutis anserina", "Froth at nostrils and mouth", "Ruptured tympanic membrane"],
    answer: 1,
    explanation:
      "Signs of drowning: Washerwoman's hands (cutis anserina = goose skin), frothy fluid in airways (Tardieu's spots internally), diatoms in blood/bone marrow (proof of vital reaction). 'Cafe coronaire' = food bolus obstruction (not drowning). Diatom test = only reliable post-mortem test.",
  },
  {
    id: 241,
    subject: "Forensic Medicine",
    stem: "Section 304A IPC (BNS equivalent Section 106) deals with:",
    options: ["Murder", "Death by negligence (rash/negligent act)", "Culpable homicide not amounting to murder", "Abetment of suicide"],
    answer: 1,
    explanation:
      "IPC 304A = causing death by negligence (not amounting to culpable homicide) — 2 years imprisonment, fine, or both. Key in medical negligence. Jacob Mathew vs State of Punjab (2005) SC ruling: doctors negligent under civil law but criminal prosecution needs grossly negligent act.",
  },
  {
    id: 242,
    subject: "Forensic Medicine",
    stem: "Adipocere formation (saponification) in a dead body occurs in conditions of:",
    options: ["Hot and dry environment", "Cold and moist environment", "Waterlogged/buried in wet soil", "Both B and C"],
    answer: 3,
    explanation:
      "Adipocere (soap-like substance): hydrolysis + hydrogenation of body fat into fatty acids (palmitic, stearic acids). Occurs in cold, moist, anaerobic conditions — waterlogged bodies, buried in wet soil. Can preserve body outline for years. Grey-white, greasy, waxy substance.",
  },

  // ─── ANATOMY EXTENDED (253–264) ──────────────────────────────────────────
  {
    id: 253,
    subject: "Anatomy",
    stem: "Injury to the common peroneal nerve at the neck of the fibula causes which deformity?",
    options: ["Foot drop with loss of eversion", "Equinovarus foot", "Claw toes", "Loss of ankle jerk"],
    answer: 0,
    explanation:
      "Common peroneal nerve wraps around the neck of the fibula — most vulnerable point. Injury → foot drop (loss of dorsiflexion and eversion — deep and superficial peroneal nerve components). Ankle jerk is mediated by the tibial nerve (L5/S1) and is spared.",
  },
  {
    id: 254,
    subject: "Anatomy",
    stem: "The contents of the inguinal canal in males include all EXCEPT:",
    options: ["Vas deferens", "Ilioinguinal nerve", "Genitofemoral nerve (genital branch)", "Inferior epigastric vessels"],
    answer: 3,
    explanation:
      "Inguinal canal contents (male): spermatic cord (vas deferens, testicular artery, pampiniform plexus, lymphatics, genital branch of genitofemoral nerve, cremasteric artery) + ilioinguinal nerve. Inferior epigastric vessels lie medial to the deep inguinal ring, not in the canal.",
  },
  {
    id: 255,
    subject: "Anatomy",
    stem: "The portal-systemic anastomosis at the gastro-oesophageal junction involves which veins?",
    options: [
      "Left gastric veins and azygos/hemiazygos veins",
      "Short gastric veins and splenic vein",
      "Inferior mesenteric vein and inferior rectal vein",
      "Superior rectal vein and middle rectal vein",
    ],
    answer: 0,
    explanation:
      "At the oesophageal end: left gastric (portal) ↔ oesophageal (azygos/systemic). In portal hypertension, these enlarge to form oesophageal varices — the most dangerous site (risk of fatal haemorrhage). Other sites: rectum, umbilicus (caput medusae), retroperitoneum.",
  },
  {
    id: 256,
    subject: "Anatomy",
    stem: "Erb's palsy involves injury to which nerve roots?",
    options: ["C5, C6", "C7, C8", "C8, T1", "C5, C6, C7"],
    answer: 0,
    explanation:
      "Erb's palsy: upper brachial plexus injury (C5, C6) — waiter's tip position (arm adducted, internally rotated, forearm pronated, wrist flexed). Loss: shoulder abduction, lateral rotation, elbow flexion, forearm supination. Caused by traction at birth or shoulder depression injury.",
  },
  {
    id: 257,
    subject: "Anatomy",
    stem: "The surgical triangle of the neck where the carotid artery is accessed for carotid endarterectomy is bounded by:",
    options: [
      "SCM, omohyoid, posterior belly of digastric",
      "SCM, anterior belly of digastric, hyoid bone",
      "Trapezius, SCM, clavicle",
      "SCM, stylohyoid, posterior belly of digastric",
    ],
    answer: 0,
    explanation:
      "Carotid triangle (anterior cervical triangle): SCM (posterior), omohyoid (inferior), posterior belly of digastric and stylohyoid (superior). Contains carotid artery bifurcation, internal jugular vein, CN IX, X, XI, XII. Site of carotid endarterectomy and lymph node dissection.",
  },
  {
    id: 258,
    subject: "Anatomy",
    stem: "The lymphatic drainage of the testis follows the:",
    options: ["Inguinal lymph nodes", "Iliac lymph nodes", "Para-aortic (lumbar) lymph nodes", "Sacral lymph nodes"],
    answer: 2,
    explanation:
      "Testes develop retroperitoneally and drain to para-aortic (lumbar) lymph nodes around L1-L2 — following the gonadal vessels. This is why testicular cancer spreads to para-aortic nodes, not inguinal nodes (unlike scrotal skin, which drains to inguinal nodes).",
  },
  {
    id: 259,
    subject: "Anatomy",
    stem: "The recurrent laryngeal nerve (a branch of vagus) is at risk during which surgery?",
    options: ["Parotidectomy", "Thyroidectomy", "Submandibular gland excision", "Mastoidectomy"],
    answer: 1,
    explanation:
      "The recurrent laryngeal nerve (RLN) loops under the aortic arch (left) and right subclavian artery, ascending in the tracheo-oesophageal groove. It enters the larynx at the cricothyroid joint. At highest risk during thyroidectomy. Injury → hoarseness (unilateral) or aphonia and breathing difficulty (bilateral).",
  },
  {
    id: 260,
    subject: "Anatomy",
    stem: "The femoral nerve is formed from posterior divisions of:",
    options: ["L2, L3, L4", "L1, L2, L3", "L3, L4, L5", "L2, L3, L4, L5"],
    answer: 0,
    explanation:
      "Femoral nerve (L2, L3, L4 posterior divisions) is the largest branch of the lumbar plexus. Lies lateral to femoral artery in femoral triangle. Supplies: quadriceps femoris, sartorius, iliacus. Skin of anteromedial thigh and medial leg (saphenous nerve). Damaged in psoas abscess or hip surgery.",
  },
  {
    id: 261,
    subject: "Anatomy",
    stem: "The contents of the posterior compartment of the thigh are supplied by which nerve?",
    options: ["Femoral nerve", "Sciatic nerve", "Obturator nerve", "Common peroneal nerve only"],
    answer: 1,
    explanation:
      "The sciatic nerve (L4, L5, S1, S2, S3) supplies the posterior compartment of the thigh (hamstrings: biceps femoris, semimembranosus, semitendinosus, and ischial head of adductor magnus). The tibial division supplies most hamstrings; common peroneal supplies short head of biceps femoris.",
  },
  {
    id: 262,
    subject: "Anatomy",
    stem: "The lateral boundary of the femoral ring (allowing femoral hernia passage) is:",
    options: ["Lacunar ligament", "Femoral vein", "Inguinal ligament", "Pectineal ligament"],
    answer: 1,
    explanation:
      "Femoral ring boundaries: anterior = inguinal ligament, posterior = pectineal ligament, medial = lacunar ligament, lateral = femoral vein. Femoral hernia passes through the femoral canal (medial to the femoral vein). More common in females. Strangulation risk is HIGH due to rigid boundaries.",
  },
  {
    id: 263,
    subject: "Anatomy",
    stem: "Wrist drop following a mid-shaft fracture of the humerus is due to injury of:",
    options: ["Median nerve", "Ulnar nerve", "Radial nerve in the spiral groove", "Anterior interosseous nerve"],
    answer: 2,
    explanation:
      "The radial nerve runs in the spiral groove of the humerus (closely applied to bone). Mid-shaft fractures damage it here → wrist drop (loss of ECRL, ECRB, ECU, finger extensors) + sensory loss on dorsum of hand. Elbow extension (triceps, supplied higher) is SPARED.",
  },
  {
    id: 264,
    subject: "Anatomy",
    stem: "The diaphragm is pierced by the inferior vena cava at the level of:",
    options: ["T8", "T10", "T12", "L1"],
    answer: 0,
    explanation:
      "Diaphragm openings: T8 = IVC + right phrenic nerve; T10 = oesophagus + vagal trunks + left gastric vessels; T12 = aorta + thoracic duct + azygos vein. Mnemonic: 'I 8 (ate) 10 eggs AT 12' = IVC at T8, Esophagus at T10, Aorta at T12.",
  },

  // ─── PHYSIOLOGY EXTENDED (265–276) ───────────────────────────────────────
  {
    id: 265,
    subject: "Physiology",
    stem: "The JVP waveform component 'a wave' corresponds to:",
    options: ["Right ventricular contraction", "Right atrial contraction (systole)", "Tricuspid valve closure", "Right ventricular filling"],
    answer: 1,
    explanation:
      "JVP waveforms: 'a' = atrial contraction (pre-systolic); 'c' = tricuspid valve closure/bulging; 'x' descent = atrial relaxation; 'v' = venous filling with tricuspid closed; 'y' descent = tricuspid opens. 'a' wave absent in AF; giant 'a' wave in tricuspid stenosis, complete heart block.",
  },
  {
    id: 266,
    subject: "Physiology",
    stem: "The Fick principle for measurement of cardiac output states that cardiac output equals:",
    options: [
      "Heart rate × stroke volume",
      "O₂ consumption / (arteriovenous O₂ difference)",
      "Mean arterial pressure / systemic vascular resistance",
      "Stroke volume / end-diastolic volume",
    ],
    answer: 1,
    explanation:
      "Fick principle: CO = O₂ consumption (mL/min) ÷ (arterial O₂ content - venous O₂ content). Normal CO = 5 L/min. Cardiac index (CI) = CO/BSA (normal 2.5-4.0 L/min/m²). Used in right heart catheterisation to measure CO directly.",
  },
  {
    id: 267,
    subject: "Physiology",
    stem: "The normal GFR in an adult is approximately:",
    options: ["80 mL/min", "125 mL/min", "180 mL/min", "250 mL/min"],
    answer: 1,
    explanation:
      "Normal GFR: ~125 mL/min (180 L/day). The kidneys filter 180 L/day but excrete only ~1.5 L urine (99% reabsorption). GFR is measured by inulin clearance (gold standard) or estimated by creatinine clearance. CKD stages based on GFR (KDIGO): G1 ≥90, G2 60-89, G3a 45-59, G3b 30-44, G4 15-29, G5 <15.",
  },
  {
    id: 268,
    subject: "Physiology",
    stem: "In the Wiggers diagram, the period of isovolumetric relaxation ends when:",
    options: ["Mitral valve opens", "Aortic valve closes", "Tricuspid valve opens", "Pulmonic valve opens"],
    answer: 0,
    explanation:
      "Isovolumetric relaxation: begins at aortic valve closure (second heart sound S2) and ends when ventricular pressure falls below atrial pressure → mitral (and tricuspid) valves open → ventricular filling begins. During this phase, LV pressure drops rapidly with no change in volume.",
  },
  {
    id: 269,
    subject: "Physiology",
    stem: "The normal pulmonary capillary wedge pressure (PCWP) is:",
    options: ["2-5 mmHg", "6-12 mmHg", "15-20 mmHg", "20-25 mmHg"],
    answer: 1,
    explanation:
      "Normal PCWP (wedge pressure) = 6-12 mmHg. PCWP reflects left atrial pressure. Elevated PCWP (>18 mmHg) = cardiogenic pulmonary oedema. Low PCWP + high cardiac output = distributive shock. Used in Swan-Ganz catheter-guided management of critically ill patients.",
  },
  {
    id: 270,
    subject: "Physiology",
    stem: "Which of the following shifts the oxygen-haemoglobin dissociation curve to the RIGHT?",
    options: ["Decreased temperature", "Alkalosis (increased pH)", "Foetal haemoglobin (HbF)", "Increased 2,3-DPG"],
    answer: 3,
    explanation:
      "Right shift (decreased O₂ affinity, promotes O₂ delivery to tissues): increased temperature, acidosis (Bohr effect), increased PCO₂, increased 2,3-DPG. Left shift (increased affinity, useful in placenta): HbF, decreased 2,3-DPG, alkalosis, hypothermia, CO poisoning.",
  },
  {
    id: 271,
    subject: "Physiology",
    stem: "The primary buffer system of extracellular fluid is:",
    options: ["Phosphate buffer", "Protein buffer", "Bicarbonate-carbonic acid buffer", "Haemoglobin buffer"],
    answer: 2,
    explanation:
      "The bicarbonate-carbonic acid system (pKa 6.1, [HCO₃⁻]/[H₂CO₃] = 20:1 at pH 7.4) is the most important ECF buffer because its components are regulated independently (lungs control CO₂; kidneys control HCO₃⁻), maintaining pH despite large acid/base loads.",
  },
  {
    id: 272,
    subject: "Physiology",
    stem: "Renin is secreted by the juxtaglomerular cells in response to:",
    options: [
      "Increased renal perfusion pressure",
      "Increased NaCl at macula densa",
      "Decreased renal perfusion pressure and sympathetic stimulation",
      "Increased angiotensin II",
    ],
    answer: 2,
    explanation:
      "Renin release stimuli: decreased renal perfusion pressure (baroreceptor mechanism), decreased NaCl delivery to macula densa, sympathetic stimulation (beta-1 adrenoceptors on JG cells). Renin cleaves angiotensinogen → Ang I → ACE → Ang II → aldosterone + vasoconstriction.",
  },
  {
    id: 273,
    subject: "Physiology",
    stem: "The 'windkessel effect' refers to the function of:",
    options: ["Cardiac muscle stretch receptors", "Arterial compliance in converting pulsatile to continuous flow", "Venous pooling in capacitance vessels", "Baroreceptor reflex arc"],
    answer: 1,
    explanation:
      "Windkessel effect: large arteries (aorta, major branches) store energy during systole (elastic recoil) and release it during diastole, converting pulsatile ventricular output into more continuous peripheral flow. Decreased in atherosclerosis → widened pulse pressure in elderly.",
  },
  {
    id: 274,
    subject: "Physiology",
    stem: "The most potent stimulus for ADH (vasopressin) secretion is:",
    options: ["Decreased blood volume (hypovolaemia)", "Increased plasma osmolality", "Pain", "Nausea"],
    answer: 1,
    explanation:
      "Plasma osmolality is the most sensitive stimulus for ADH (threshold: 285 mOsm/kg; only 1-2% change triggers ADH). Hypovolaemia is a potent stimulus but only after 10-15% blood volume loss. ADH = arginine vasopressin; acts on V2 receptors in collecting duct → inserts aquaporin-2.",
  },
  {
    id: 275,
    subject: "Physiology",
    stem: "The 'P wave' on ECG represents:",
    options: ["SA node depolarisation", "Atrial depolarisation", "AV node conduction", "Atrial repolarisation"],
    answer: 1,
    explanation:
      "P wave = atrial depolarisation (SA node → atria). PR interval = AV node + His-Purkinje conduction (0.12-0.20 sec). QRS = ventricular depolarisation. ST segment = plateau phase. T wave = ventricular repolarisation. Atrial repolarisation is buried in QRS complex.",
  },
  {
    id: 276,
    subject: "Physiology",
    stem: "Carbon dioxide is primarily transported in the blood as:",
    options: ["Dissolved CO₂ in plasma", "Carbaminohaemoglobin", "Bicarbonate ions (HCO₃⁻)", "Carbonic acid"],
    answer: 2,
    explanation:
      "CO₂ transport: ~70% as HCO₃⁻ (formed by carbonic anhydrase in RBCs → CO₂ + H₂O ↔ H₂CO₃ ↔ H⁺ + HCO₃⁻); ~23% as carbaminohaemoglobin; ~7% dissolved. Chloride shift: HCO₃⁻ exits RBC in exchange for Cl⁻ (Hamburger phenomenon).",
  },

  // ─── MEDICINE EXTENDED (277–292) ─────────────────────────────────────────
  {
    id: 277,
    subject: "Medicine",
    stem: "A 65-year-old man with COPD and FEV1 40% predicted, 2 or more exacerbations per year, with dyspnoea on mild exertion belongs to GOLD group:",
    options: ["A", "B", "C", "D"],
    answer: 3,
    explanation:
      "GOLD 2023 classification: Group D = high-risk patients (FEV1 <50% OR ≥2 exacerbations/year) with high symptom burden (mMRC ≥2 or CAT ≥10). Group D needs triple inhaled therapy (LABA + LAMA + ICS). FEV1 40% = GOLD 3 (severe).",
  },
  {
    id: 278,
    subject: "Medicine",
    stem: "Which of the following is a class I indication (benefit >> risk, recommended) for primary PCI in STEMI?",
    options: [
      "STEMI presenting >12 hours after symptom onset",
      "STEMI presenting within 12 hours of symptom onset at a PCI-capable centre",
      "STEMI in a patient with prior CABG",
      "STEMI with cardiogenic shock beyond 36 hours",
    ],
    answer: 1,
    explanation:
      "Primary PCI is the preferred reperfusion strategy for STEMI if it can be performed within 90 minutes of first medical contact (door-to-balloon time). Class I: symptoms <12 hours, PCI-capable centre within 120 min. Thrombolytics if PCI cannot be achieved within 120 min of FMC.",
  },
  {
    id: 279,
    subject: "Medicine",
    stem: "The NYHA Class III heart failure is defined as:",
    options: [
      "No limitation of physical activity",
      "Slight limitation — comfortable at rest but ordinary activity causes symptoms",
      "Marked limitation — comfortable at rest but less than ordinary activity causes symptoms",
      "Symptoms at rest",
    ],
    answer: 2,
    explanation:
      "NYHA classification: I = no limitation; II = slight limitation (ordinary activity); III = marked limitation (less than ordinary activity causes symptoms, comfortable at rest); IV = symptoms at rest. Class III-IV = indication for cardiac transplant evaluation.",
  },
  {
    id: 280,
    subject: "Medicine",
    stem: "The drug that reduces mortality in heart failure with reduced ejection fraction (HFrEF) by blocking both AT1 receptor and neprilysin is:",
    options: ["Losartan", "Spironolactone", "Sacubitril/valsartan (ARNI)", "Ivabradine"],
    answer: 2,
    explanation:
      "Sacubitril/valsartan (LCZ696, Entresto) = ARNI (angiotensin receptor-neprilysin inhibitor). PARADIGM-HF trial: ARNI reduced CV mortality and HF hospitalisation by 20% vs enalapril. Replaces ACE inhibitor/ARB in HFrEF patients (EF ≤40%) who are stable. Avoid in combination with ACE inhibitor (angioedema risk).",
  },
  {
    id: 281,
    subject: "Medicine",
    stem: "In Diabetic Ketoacidosis (DKA), the initial IV fluid of choice is:",
    options: ["5% Dextrose", "0.9% Normal saline (NaCl)", "Ringer's lactate", "Half-normal saline (0.45%)"],
    answer: 1,
    explanation:
      "Initial management of DKA: 0.9% NaCl (normal saline) 1 L over first hour to correct hypovolaemia. Switch to 0.45% NaCl once serum Na corrects. Start dextrose when blood glucose <250 mg/dL. Insulin: 0.1 U/kg/hr regular insulin IV. Potassium replacement mandatory (insulin drives K into cells).",
  },
  {
    id: 282,
    subject: "Medicine",
    stem: "According to ADA 2024, the HbA1c target for most non-pregnant adults with Type 2 Diabetes is:",
    options: ["<6.5%", "<7.0%", "<7.5%", "<8.0%"],
    answer: 1,
    explanation:
      "ADA 2024: HbA1c <7.0% for most non-pregnant adults with T2DM. More stringent (<6.5%) for short duration, long life expectancy, no CVD. Less stringent (<8.0%) for elderly, multiple comorbidities, hypoglycaemia-prone, limited life expectancy. SGLT2i and GLP-1 RA are preferred add-ons due to CV/renal benefits.",
  },
  {
    id: 283,
    subject: "Medicine",
    stem: "The tPA (alteplase) window for acute ischaemic stroke is:",
    options: ["Within 1.5 hours", "Within 3 hours (extended to 4.5 hours in eligible patients)", "Within 6 hours", "Within 12 hours"],
    answer: 1,
    explanation:
      "IV alteplase is approved within 3 hours of stroke onset for eligible patients (no haemorrhage on CT, no anticoagulation, BP <185/110 after treatment, no major surgery <14 days). Extended to 4.5 hours in carefully selected patients (ECASS III trial). Mechanical thrombectomy for large vessel occlusion up to 24 hours.",
  },
  {
    id: 284,
    subject: "Medicine",
    stem: "Resistant hypertension is defined as blood pressure remaining above goal despite the concurrent use of how many antihypertensive medications?",
    options: ["2 drugs at maximum dose", "3 drugs including a diuretic", "4 drugs", "5 drugs"],
    answer: 1,
    explanation:
      "Resistant hypertension: BP above goal (usually <130/80 mmHg) despite ≥3 antihypertensive drugs from different classes including a diuretic at maximally tolerated doses. Always exclude secondary causes (primary aldosteronism, renal artery stenosis, obstructive sleep apnoea, CKD, phaeochromocytoma).",
  },
  {
    id: 285,
    subject: "Medicine",
    stem: "The SLICC criteria for SLE require at least how many criteria (or biopsy-proven lupus nephritis)?",
    options: ["4 of 11", "4 of 17", "4 of 19", "6 of 17"],
    answer: 1,
    explanation:
      "SLICC 2012 criteria: ≥4 of 17 criteria (11 clinical + 6 immunological) OR biopsy-proven lupus nephritis with either ANA or anti-dsDNA. Clinical domains: malar rash, discoid rash, photosensitivity, alopecia, oral ulcers, synovitis, serositis, renal, neurological, haemolytic anaemia, leucopenia/lymphopenia/thrombocytopenia.",
  },
  {
    id: 286,
    subject: "Medicine",
    stem: "The KDIGO staging for CKD stage G3a is defined by GFR:",
    options: ["60-89 mL/min/1.73m²", "45-59 mL/min/1.73m²", "30-44 mL/min/1.73m²", "15-29 mL/min/1.73m²"],
    answer: 1,
    explanation:
      "KDIGO CKD stages by GFR: G1 ≥90, G2 60-89, G3a 45-59, G3b 30-44, G4 15-29, G5 <15 (or dialysis). CKD = GFR <60 OR kidney damage markers present for >3 months. ESRD criteria: GFR <15 or on dialysis. Albuminuria stages: A1 <30, A2 30-300, A3 >300 mg/g.",
  },
  {
    id: 287,
    subject: "Medicine",
    stem: "Which finding on echocardiography is diagnostic of cardiac tamponade?",
    options: ["Tricuspid regurgitation", "Right ventricular diastolic collapse", "Paradoxical septal motion", "Left atrial enlargement"],
    answer: 1,
    explanation:
      "Cardiac tamponade echo features: pericardial effusion + right atrial systolic collapse (earliest), right ventricular diastolic collapse (most specific), exaggerated respiratory variation in mitral/tricuspid flow (>25% variation). Kussmaul sign is paradoxically NOT present in tamponade (it is in constrictive pericarditis).",
  },
  {
    id: 288,
    subject: "Medicine",
    stem: "First-line treatment for Crohn's disease involving the terminal ileum causing moderate symptoms is:",
    options: ["Sulfasalazine", "Budesonide", "Methotrexate", "Infliximab"],
    answer: 1,
    explanation:
      "Moderate ileal Crohn's disease: oral budesonide (9 mg/day × 8-16 weeks) for ileocaecal Crohn's — high first-pass metabolism → fewer systemic steroid effects. For severe disease or failure: systemic steroids, then immunomodulators (azathioprine) or biologics (infliximab/adalimumab).",
  },
  {
    id: 289,
    subject: "Medicine",
    stem: "Rapid shallow breathing index (RSBI) is used to predict weaning from mechanical ventilation. RSBI < __ favours successful weaning:",
    options: ["60", "80", "100", "105"],
    answer: 3,
    explanation:
      "RSBI (Yang-Tobin index) = f/VT (respiratory frequency/tidal volume in litres). RSBI <105 breaths/min/L predicts successful weaning from mechanical ventilation (sensitivity 97%, specificity 64%). RSBI >105 = likely to fail weaning. Measured during spontaneous breathing trial (SBT).",
  },
  {
    id: 290,
    subject: "Medicine",
    stem: "Which SGLT2 inhibitor has shown specific benefit in both heart failure with reduced AND preserved ejection fraction (HFrEF and HFpEF)?",
    options: ["Empagliflozin only (HFrEF)", "Dapagliflozin only (HFrEF)", "Empagliflozin (both HFrEF and HFpEF)", "Canagliflozin"],
    answer: 2,
    explanation:
      "EMPEROR-Reduced trial (empagliflozin in HFrEF) and EMPEROR-Preserved trial (empagliflozin in HFpEF) both showed reduced HF hospitalisations. DAPA-HF (dapagliflozin) and DELIVER (dapagliflozin in HFpEF) also positive. SGLT2i now recommended in all HF phenotypes regardless of diabetes status.",
  },
  {
    id: 291,
    subject: "Medicine",
    stem: "The classic histological finding in IgA nephropathy (Berger's disease) on immunofluorescence is:",
    options: ["Linear IgG deposits", "Subepithelial 'humps'", "Mesangial IgA deposits", "Granular IgG and C3 along GBM"],
    answer: 2,
    explanation:
      "IgA nephropathy (Berger's disease): mesangial IgA deposits on immunofluorescence (most common GN worldwide; most common cause of haematuria in young adults). Episodic macroscopic haematuria coinciding with URTIs (synpharyngitic haematuria). Treatment: RAS blockade; fish oil; steroids for severe proteinuria.",
  },
  {
    id: 292,
    subject: "Medicine",
    stem: "The most common valvular complication of rheumatic fever is:",
    options: ["Aortic stenosis", "Mitral stenosis", "Tricuspid regurgitation", "Pulmonary stenosis"],
    answer: 1,
    explanation:
      "Rheumatic fever most commonly affects the mitral valve → mitral stenosis (most common valvular complication of rheumatic heart disease). 'MVT' = mitral > aortic > tricuspid (involvement decreasing). MS: opening snap, mid-diastolic rumble at apex, left parasternal lift (right ventricular heave).",
  },

  // ─── SURGERY EXTENDED (293–304) ──────────────────────────────────────────
  {
    id: 293,
    subject: "Surgery",
    stem: "In ATLS (Advanced Trauma Life Support), Class III haemorrhagic shock is characterised by blood loss of:",
    options: ["Up to 750 mL (up to 15%)", "750–1500 mL (15-30%)", "1500–2000 mL (30-40%)", ">2000 mL (>40%)"],
    answer: 2,
    explanation:
      "ATLS shock classification: Class I <15% (750 mL); Class II 15-30% (750-1500 mL); Class III 30-40% (1500-2000 mL) — confused, tachycardic, tachypnoiec, hypotensive; Class IV >40% (>2000 mL) — lethal without immediate intervention. Class III needs crystalloid + blood products.",
  },
  {
    id: 294,
    subject: "Surgery",
    stem: "The 'Rule of Nines' for estimating burns in adults assigns what percentage to the head and neck?",
    options: ["4.5%", "9%", "18%", "1%"],
    answer: 1,
    explanation:
      "Rule of Nines (Pulaski-Tennison): head+neck = 9%, each arm = 9%, anterior trunk = 18%, posterior trunk = 18%, each leg = 18%, perineum = 1%. Total = 100%. In children, Lund-Browder chart is more accurate (head proportionally larger — 18% at birth). Burns >10% in children, >20% in adults need IV resuscitation.",
  },
  {
    id: 295,
    subject: "Surgery",
    stem: "Lichtenstein repair of inguinal hernia is a:",
    options: ["Pure tissue repair (no mesh)", "Tension-free mesh repair of the posterior wall of inguinal canal", "Laparoscopic repair (TEP/TAPP)", "Bassini repair with modification"],
    answer: 1,
    explanation:
      "Lichtenstein tension-free hernioplasty: flat polypropylene mesh placed over the posterior wall of the inguinal canal, sutured to the inguinal ligament (inferior), conjoint tendon (medial), and internal oblique (superior). Current gold standard for open inguinal hernia repair. Lower recurrence than Bassini (tissue repair).",
  },
  {
    id: 296,
    subject: "Surgery",
    stem: "Sentinel lymph node biopsy is the standard of care for clinically node-negative breast cancer. The sentinel node is identified by:",
    options: ["CT scan", "Blue dye and/or radiotracer (technetium-99m sulphur colloid)", "PET scan", "FNAC of axilla"],
    answer: 1,
    explanation:
      "SLNB: patent blue dye and/or radiotracer (Tc-99m sulphur colloid) injected periareolar/peritumoral. Gamma probe + visual identification of blue node identifies sentinel node. If SLN histologically negative → axillary node clearance avoided → less morbidity. ICG fluorescence also used.",
  },
  {
    id: 297,
    subject: "Surgery",
    stem: "The Klatskin tumour is a cholangiocarcinoma located at:",
    options: ["Ampulla of Vater", "Distal common bile duct", "Confluence of right and left hepatic ducts (hilar)", "Cystic duct"],
    answer: 2,
    explanation:
      "Klatskin tumour = hilar cholangiocarcinoma at the confluence of right and left hepatic ducts. Bismuth-Corlette classification stages extent of hepatic duct involvement. Presents with painless obstructive jaundice + weight loss. Often not resectable at presentation. Treated with radical resection (hepatectomy + Roux-en-Y hepaticojejunostomy) if possible.",
  },
  {
    id: 298,
    subject: "Surgery",
    stem: "Which BRCA mutation is most commonly associated with breast AND ovarian cancer?",
    options: ["BRCA1", "BRCA2", "BRCA1 and BRCA2 equally", "TP53 (Li-Fraumeni)"],
    answer: 0,
    explanation:
      "BRCA1 (chromosome 17q): lifetime breast cancer risk ~72%, ovarian cancer risk ~44%. BRCA2 (chromosome 13q): breast cancer risk ~69%, ovarian cancer risk ~17%, also associated with male breast cancer and pancreatic cancer. BRCA1 more associated with triple-negative breast cancer. Prophylactic mastectomy/salpingo-oophorectomy discussed.",
  },
  {
    id: 299,
    subject: "Surgery",
    stem: "The most common site of carcinoma in the large bowel is:",
    options: ["Caecum", "Transverse colon", "Rectosigmoid junction and rectum", "Descending colon"],
    answer: 2,
    explanation:
      "~60-70% of colorectal cancers occur in the rectum and sigmoid colon (left side, within reach of sigmoidoscopy). Right-sided (caecal) cancers present late with iron deficiency anaemia. Left-sided present with obstruction, rectal bleeding, altered bowel habits. CEA is used for monitoring, not diagnosis.",
  },
  {
    id: 300,
    subject: "Surgery",
    stem: "The gold standard investigation for diagnosing ischaemic heart disease prior to major non-cardiac surgery is:",
    options: ["Resting ECG", "Exercise stress test", "Dobutamine stress echocardiography", "CT coronary angiography"],
    answer: 2,
    explanation:
      "Dobutamine stress echo (DSE) is preferred for preoperative cardiac evaluation in patients unable to exercise (limited by orthopaedic/vascular disease). Reveals wall motion abnormalities with pharmacological stress. Nuclear perfusion scan is alternative. Echocardiography at rest assesses EF and valvular disease.",
  },
  {
    id: 301,
    subject: "Surgery",
    stem: "Charcot's neurological triad (in Charcot's joint/neuropathic arthropathy) involves all EXCEPT:",
    options: ["Ataxia", "Arthropathy", "Areflexia", "Amyotrophy"],
    answer: 0,
    explanation:
      "Charcot's neurological joint triad: arthropathy (neuropathic joint), amyotrophy, areflexia — caused by loss of pain/proprioception. Common causes: diabetes mellitus (foot), tabes dorsalis (knee), syringomyelia (shoulder). Ataxia is NOT part of Charcot's joint triad (though it may accompany the underlying neurological condition).",
  },
  {
    id: 302,
    subject: "Surgery",
    stem: "The anti-nausea drug used perioperatively that has a high risk of prolonging the QT interval is:",
    options: ["Ondansetron", "Metoclopramide", "Droperidol", "Dexamethasone"],
    answer: 2,
    explanation:
      "Droperidol (butyrophenone) has a black box warning for QT prolongation and risk of Torsades de Pointes. Still used in low doses for PONV. Ondansetron (5-HT3 antagonist) also prolongs QT slightly but is safer. Dexamethasone is the safest antiemetic for PONV prophylaxis.",
  },
  {
    id: 303,
    subject: "Surgery",
    stem: "The APACHE II (Acute Physiology and Chronic Health Evaluation) score is used to assess severity and predict mortality in:",
    options: ["Major trauma patients", "Burns patients", "ICU patients with acute illness", "Surgical site infections"],
    answer: 2,
    explanation:
      "APACHE II uses 12 physiological variables + age + chronic health score. Predicts ICU mortality probability. Score >20 = high mortality. Used in pancreatitis (APACHE II ≥8 = severe), sepsis, and general ICU population for resource allocation and outcome prediction.",
  },
  {
    id: 304,
    subject: "Surgery",
    stem: "Virchow's node (Troisier's sign) is an enlarged left supraclavicular lymph node signifying metastasis from:",
    options: ["Lung cancer (ipsilateral)", "Intra-abdominal malignancy (especially stomach)", "Head and neck cancer", "Breast cancer"],
    answer: 1,
    explanation:
      "Virchow's node (left supraclavicular) receives lymphatic drainage from the thoracic duct, which drains the entire abdominal cavity. Troisier's sign = palpable Virchow's node = distant metastasis from GI cancer (stomach most classic, also pancreas, colon). It is the left side because the thoracic duct enters at the left subclavian vein.",
  },

  // ─── OBG EXTENDED (305–316) ──────────────────────────────────────────────
  {
    id: 305,
    subject: "OBG",
    stem: "The Rotterdam criteria for PCOD diagnosis require at least 2 of 3 features. These features are:",
    options: [
      "Oligomenorrhoea + hyperandrogenism + polycystic ovaries on USG",
      "Obesity + insulin resistance + hyperandrogenism",
      "Hirsutism + infertility + elevated LH",
      "Anovulation + elevated LH/FSH ratio + obesity",
    ],
    answer: 0,
    explanation:
      "Rotterdam 2003 criteria (2 of 3): (1) oligo-/anovulation, (2) clinical/biochemical hyperandrogenism, (3) polycystic ovaries on USG (≥12 follicles 2-9mm or ovarian volume >10 mL per ovary). LH/FSH ratio >2:1 is suggestive but not a diagnostic criterion. Exclude other androgen disorders.",
  },
  {
    id: 306,
    subject: "OBG",
    stem: "Which grade of placenta praevia (old Grades I-IV) is called 'Type IV' (complete, central placenta praevia)?",
    options: [
      "Placenta partially covers the internal os",
      "Placenta completely covers the internal os",
      "Lower edge of placenta within 2 cm of internal os",
      "Placenta at the lower uterine segment but not reaching internal os",
    ],
    answer: 1,
    explanation:
      "Old Grades: Type I = low-lying (lower segment, not reaching os); Type II = marginal (reaching but not covering os); Type III = partial/incomplete praevia (partially covers os); Type IV = complete/central praevia (completely covers internal os). Current classification: just 'placenta praevia' vs 'low-lying'. Type IV → elective CS at 36-37 weeks.",
  },
  {
    id: 307,
    subject: "OBG",
    stem: "The magnesium toxicity monitoring parameter that is lost FIRST with rising serum Mg levels is:",
    options: ["Respiratory depression", "Cardiac arrest", "Knee jerk (patellar reflex)", "Urinary output reduction"],
    answer: 2,
    explanation:
      "Mg toxicity monitoring: patellar reflex disappears at 7-10 mEq/L (FIRST sign — monitor every 30 min with MgSO4 infusion), respiratory depression at 10-13 mEq/L, cardiac arrest at >15 mEq/L. Antidote: calcium gluconate 1g IV. Maintain urine output >30 mL/hr (ensure renal excretion of Mg).",
  },
  {
    id: 308,
    subject: "OBG",
    stem: "Hydatidiform mole (complete vs partial) — complete mole characteristically has which chromosomal pattern?",
    options: ["46,XY (biparental)", "46,XX (entirely paternal origin — androgenetic)", "69,XXX (triploidy)", "47,XXY"],
    answer: 1,
    explanation:
      "Complete mole: 46,XX (or rarely 46,XY), ENTIRELY paternal (androgenetic) — empty egg fertilised by one sperm (23X) that doubles or two sperm. No fetal tissue. Partial mole: 69,XXX or 69,XXY (triploidy), biparental, fetal tissue present. Complete moles have higher risk of gestational trophoblastic neoplasia (15-20%).",
  },
  {
    id: 309,
    subject: "OBG",
    stem: "The WHO definition of postpartum haemorrhage (primary PPH) is blood loss exceeding:",
    options: ["300 mL within 24 hours", "500 mL after vaginal delivery or 1000 mL after caesarean section", "1000 mL after any delivery", "Any blood loss requiring transfusion"],
    answer: 1,
    explanation:
      "WHO definition PPH: >500 mL after vaginal delivery or >1000 mL after caesarean section within 24 hours of delivery. Severe PPH: >1000 mL with signs of haemodynamic instability. Clinical blood loss is often underestimated. Treatment: uterotonic drugs (oxytocin first), then misoprostol, ergometrine, carboprost (PGF2α), tranexamic acid.",
  },
  {
    id: 310,
    subject: "OBG",
    stem: "The FIGO 2018 staging of cervical carcinoma now includes imaging findings. Stage IVA means:",
    options: ["Tumour invades pelvic wall", "Tumour invades mucosa of bladder or rectum", "Distant metastases", "Parametrial invasion"],
    answer: 1,
    explanation:
      "FIGO 2018 cervical cancer: IVA = tumour invades mucosa of bladder or rectum (proven by biopsy — bullous oedema alone insufficient). IVB = distant metastasis (including peritoneal spread, inguinal lymph node metastasis, lungs, liver). IIIC1 = pelvic LN metastasis; IIIC2 = para-aortic LN metastasis (new in 2018).",
  },
  {
    id: 311,
    subject: "OBG",
    stem: "Abruptio placentae (placental abruption) differs from placenta praevia in that:",
    options: [
      "Painless bleeding is characteristic of abruption",
      "Tender, hard (woody) uterus is characteristic of abruption",
      "Fetal presentation is normal in praevia",
      "Placenta praevia causes concealed haemorrhage more often",
    ],
    answer: 1,
    explanation:
      "Abruption: painful, tender, hard (woody) uterus; bleeding may be concealed or revealed; fetal distress common; associated with hypertension. Placenta praevia: PAINLESS bright red bleeding; soft uterus; abnormal fetal lie (praevia occupies lower uterine segment blocking normal lie).",
  },
  {
    id: 312,
    subject: "OBG",
    stem: "The investigation of choice for diagnosis of polycystic ovarian syndrome (PCOS) is:",
    options: ["Serum LH level", "Serum testosterone", "Pelvic ultrasound (transvaginal)", "Laparoscopy"],
    answer: 2,
    explanation:
      "Pelvic USG (preferably transvaginal): ≥12 follicles 2-9mm per ovary or ovarian volume >10 mL = polycystic morphology (Rotterdam criterion). Combined with clinical (oligomenorrhoea, hirsutism, acne) and biochemical (hyperandrogenaemia). USG alone is NOT diagnostic; all 3 criteria considered.",
  },
  {
    id: 313,
    subject: "OBG",
    stem: "The normal duration of the first stage of labour in a primigravida is:",
    options: ["<4 hours", "<8 hours", "Up to 12 hours", "Up to 24 hours"],
    answer: 2,
    explanation:
      "Active labour (first stage) in primigravida: up to 12 hours is normal (WHO partograph action line). Latent phase (0-3 cm dilation): up to 8-20 hours. Active phase cervical dilatation: ≥0.5 cm/hour (active phase arrest if no progress for 4+ hours with adequate contractions). Second stage: up to 2 hours (primigravida).",
  },
  {
    id: 314,
    subject: "OBG",
    stem: "Which drug is the first choice for medical induction of cervical ripening/labour?",
    options: ["Oxytocin", "Dinoprostone (PGE2)", "Misoprostol (PGE1)", "Mifepristone"],
    answer: 1,
    explanation:
      "Dinoprostone (PGE2) gel/insert is the standard pharmacological cervical ripening agent when Bishop score <6 (unfavourable cervix). Misoprostol (cheaper, more potent, oral/vaginal/sublingual) is increasingly used but not FDA-approved for induction in USA. Oxytocin: only after cervix is favourable (Bishop ≥6).",
  },
  {
    id: 315,
    subject: "OBG",
    stem: "The most common cause of primary amenorrhoea with normal secondary sexual characteristics is:",
    options: ["Turner syndrome", "Hypothyroidism", "Müllerian agenesis (MRKH syndrome)", "Androgen insensitivity syndrome"],
    answer: 2,
    explanation:
      "MRKH (Mayer-Rokitansky-Küster-Hauser) syndrome: congenital absence of uterus and upper vagina, normal 46,XX karyotype, normal ovaries (normal oestrogen → normal secondary sexual characteristics), primary amenorrhoea. Second most common cause after gonadal dysgenesis. Treatment: vaginal dilators or surgical neovaginoplasty.",
  },
  {
    id: 316,
    subject: "OBG",
    stem: "Obstetric cholestasis (intrahepatic cholestasis of pregnancy) is characterised by:",
    options: [
      "Elevated transaminases + jaundice + pruritis in first trimester",
      "Intense pruritis (especially palms/soles) + elevated bile acids in third trimester",
      "Nausea + fatty liver + elevated ammonia",
      "Jaundice + haemolysis + low platelets in second trimester",
    ],
    answer: 1,
    explanation:
      "Obstetric cholestasis: intense pruritus (worse at night, palms/soles) + elevated serum bile acids (>10 μmol/L; severe >40 μmol/L) in late pregnancy (3rd trimester). Associated with increased risk of stillbirth and preterm delivery. Treat with ursodeoxycholic acid. Delivery by 37-38 weeks recommended.",
  },

  // ─── PAEDIATRICS EXTENDED (317–328) ──────────────────────────────────────
  {
    id: 317,
    subject: "Paediatrics",
    stem: "The MUAC (mid-upper arm circumference) cutoff for severe acute malnutrition (SAM) in children aged 6-59 months is:",
    options: ["<13.5 cm", "<12.5 cm", "<11.5 cm", "<10.5 cm"],
    answer: 1,
    explanation:
      "WHO SAM criteria: MUAC <11.5 cm (severe) — requires therapeutic feeding (F-75 then F-100 or RUTF). MUAC 11.5-12.5 = moderate acute malnutrition (MAM) — supplementary feeding. MUAC >12.5 = normal. MUAC is independent of age (6-59 months), easy to use in field settings. WHZ <-3 also defines SAM.",
  },
  {
    id: 318,
    subject: "Paediatrics",
    stem: "The radiological sign of Tetralogy of Fallot on chest X-ray is:",
    options: ["Snowman (figure of 8) appearance", "Boot-shaped heart (coeur en sabot)", "Egg-on-side appearance", "Cardiomegaly with pulmonary plethora"],
    answer: 1,
    explanation:
      "Tetralogy of Fallot (VSD + pulmonary stenosis + overriding aorta + RVH): boot-shaped heart on CXR due to RVH + concave main pulmonary artery segment, with decreased pulmonary vascularity. 'Snowman' sign = TAPVR. 'Egg on side' = TGA. Tet spells: hypercyanotic episodes — knee-chest position + morphine + O2.",
  },
  {
    id: 319,
    subject: "Paediatrics",
    stem: "The developmental milestone 'walking independently without support' is typically achieved at:",
    options: ["9 months", "12 months", "15 months", "18 months"],
    answer: 1,
    explanation:
      "Gross motor milestones: rolls over at 4-5 months, sits unsupported at 6 months, crawls at 8-9 months, pulls to stand at 9-10 months, walks with support at 11-12 months, walks independently at 12-15 months (average 12-13 months). Concern if not walking by 18 months.",
  },
  {
    id: 320,
    subject: "Paediatrics",
    stem: "RDS (Respiratory Distress Syndrome) in preterm neonates is due to deficiency of:",
    options: ["Oxygen delivery", "Pulmonary vasodilation", "Surfactant (dipalmitoylphosphatidylcholine, DPPC)", "Alveolar macrophages"],
    answer: 2,
    explanation:
      "Neonatal RDS: surfactant deficiency → high surface tension → alveolar collapse at end-expiration. Type II pneumocytes produce surfactant (DPPC main component) — matures after 36 weeks. Prevention: antenatal corticosteroids (betamethasone 12mg IM ×2 doses, 24h apart); Treatment: exogenous surfactant (poractant alfa/beractant) via intratracheal administration.",
  },
  {
    id: 321,
    subject: "Paediatrics",
    stem: "The earliest feature of vitamin D deficiency (rickets) on X-ray is:",
    options: ["Genu valgum", "Cupping and fraying of the metaphysis", "Looser's zones", "Subperiosteal new bone formation"],
    answer: 1,
    explanation:
      "Nutritional rickets X-ray changes: cupping + fraying + splaying of metaphysis (widened, ragged metaphyseal zone — especially distal radius and ulna). Later: genu valgum/varum, codfish vertebrae, Looser's zones (pseudofractures). Clinical: craniotabes, rachitic rosary, Harrison's sulcus, frontal bossing.",
  },
  {
    id: 322,
    subject: "Paediatrics",
    stem: "Hirschsprung's disease (congenital megacolon) is caused by absence of:",
    options: [
      "Goblet cells in the colon",
      "Ganglion cells (Auerbach's and Meissner's plexuses) in the distal colon",
      "Muscularis propria in the sigmoid",
      "Circular smooth muscle in the rectum",
    ],
    answer: 1,
    explanation:
      "Hirschsprung's disease: absence of ganglion cells (neural crest migration failure) in Meissner's (submucosal) and Auerbach's (myenteric) plexuses → aganglionic segment cannot relax → functional obstruction. Presentation: delayed passage of meconium (>48h), abdominal distension. Diagnosis: rectal biopsy (absence of ganglion cells). Treat: Swenson/Soave pull-through operation.",
  },
  {
    id: 323,
    subject: "Paediatrics",
    stem: "The vaccine given at birth in India under UIP includes:",
    options: ["BCG + OPV + DPT", "BCG + OPV + Hepatitis B", "BCG + IPV + Hepatitis B", "OPV + Hepatitis B only"],
    answer: 1,
    explanation:
      "UIP schedule at birth: BCG (0.05 mL ID, right deltoid region), OPV (zero dose, 2 drops oral), Hepatitis B (0.5 mL IM, within 24 hours of birth). DPT starts at 6 weeks. IPV (inactivated polio) was added to UIP from 2015 but OPV continues. Hepatitis B birth dose prevents perinatal transmission.",
  },
  {
    id: 324,
    subject: "Paediatrics",
    stem: "The specific gravity of neonatal CSF is lower than adult CSF. Normal CSF protein in neonates is:",
    options: ["10-45 mg/dL (same as adults)", "20-170 mg/dL", "200-300 mg/dL", "<5 mg/dL"],
    answer: 1,
    explanation:
      "Neonatal CSF: protein 20-170 mg/dL (higher than adults due to immature blood-brain barrier); glucose 34-119 mg/dL; WBC ≤30 cells/μL (more acceptable than adult <5). Preterm neonates have even higher protein. Neonatal bacterial meningitis: often presents non-specifically — temperature instability, poor feeding, bulging fontanelle, seizures.",
  },
  {
    id: 325,
    subject: "Paediatrics",
    stem: "The most common cause of stridor in a neonate is:",
    options: ["Subglottic stenosis", "Laryngeal web", "Laryngomalacia", "Tracheomalacia"],
    answer: 2,
    explanation:
      "Laryngomalacia (floppy larynx): most common cause of stridor in neonates and infants (~60% of cases). Characteristic: inspiratory stridor, worse in supine position, relieved by prone position, exacerbated by crying. Arytenoid cartilage/epiglottis collapses during inspiration. Usually resolves by 18-24 months. Rarely needs supraglottoplasty.",
  },
  {
    id: 326,
    subject: "Paediatrics",
    stem: "The DOC for whooping cough (pertussis) is:",
    options: ["Ampicillin", "Erythromycin/Azithromycin", "Cotrimoxazole", "Cefuroxime"],
    answer: 1,
    explanation:
      "Whooping cough (Bordetella pertussis): azithromycin (5 days) or erythromycin (14 days) is the DOC — reduces infectivity and severity if given early (catarrhal phase). If given in paroxysmal phase, reduces transmission but may not shorten illness. DTaP vaccination is the key preventive strategy.",
  },
  {
    id: 327,
    subject: "Paediatrics",
    stem: "The characteristic ECG finding in hypertrophic cardiomyopathy (HCM) is:",
    options: ["Prolonged QT interval", "Deep Q waves in lateral leads and LVH", "Wolff-Parkinson-White pattern (delta wave)", "Complete right bundle branch block"],
    answer: 1,
    explanation:
      "HCM ECG: LVH + deep narrow Q waves in inferior and lateral leads (pseudoinfarct pattern due to septal depolarisation), ST/T wave changes. ECG is abnormal in ~90%. HCM = most common cause of sudden cardiac death in young athletes. Obstructive HCM treated with beta-blockers; alcohol septal ablation; surgical myomectomy.",
  },
  {
    id: 328,
    subject: "Paediatrics",
    stem: "The APGAR score of a neonate showing: blue body (acrocyanotic), HR 80/min, grimace to stimulation, some flexion, weak cry — is:",
    options: ["4", "5", "6", "7"],
    answer: 1,
    explanation:
      "APGAR scoring: Appearance (body blue, peripheral blue = acrocyanosis) = 1; Pulse (HR 80, i.e., <100/min) = 1; Grimace (grimace only, not vigorous cough/sneeze) = 1; Activity (some flexion, not active flexion) = 1; Respiration (weak cry, not vigorous) = 1. Total = 1+1+1+1+1 = 5. Score 4-6 = moderate depression — requires stimulation and supplemental oxygen.",
  },

  // ─── PSM/COMMUNITY MEDICINE EXTENDED (329–340) ───────────────────────────
  {
    id: 329,
    subject: "PSM/Community Medicine",
    stem: "The MMR (Maternal Mortality Ratio) of India as per SRS 2018-20 is:",
    options: ["57 per 100,000 live births", "97 per 100,000 live births", "113 per 100,000 live births", "167 per 100,000 live births"],
    answer: 1,
    explanation:
      "SRS (Sample Registration System) 2018-20: India MMR = 97 per 100,000 live births (SDG target <70 by 2030). Lowest: Kerala (19), Maharashtra (33). Highest: Assam (195), Madhya Pradesh (175). UN SDG Goal 3.1: reduce global MMR to <70 by 2030. India's MMR has been declining (254 in 2004-06 → 97 in 2018-20).",
  },
  {
    id: 330,
    subject: "PSM/Community Medicine",
    stem: "The Wilson-Jungner criteria for evaluating a disease for population screening include all EXCEPT:",
    options: [
      "The disease should be an important health problem",
      "There should be a recognisable early or latent stage",
      "The screening test should be 100% specific",
      "Treatment in the early stage should be more effective than at late stage",
    ],
    answer: 2,
    explanation:
      "Wilson-Jungner (1968) criteria for screening: important health problem; recognisable latent stage; accepted treatment exists; facilities for diagnosis and treatment available; suitable test exists (acceptable, reliable); natural history understood; agreed policy on who to treat; cost-benefit acceptable; continuous case-finding. No criterion requires 100% specificity.",
  },
  {
    id: 331,
    subject: "PSM/Community Medicine",
    stem: "Number Needed to Treat (NNT) is calculated as:",
    options: ["1 / Absolute Risk Increase", "1 / Absolute Risk Reduction (ARR)", "Relative Risk - 1", "1 / Relative Risk Reduction"],
    answer: 1,
    explanation:
      "NNT = 1/ARR (absolute risk reduction). ARR = Control event rate - Treatment event rate. Small NNT = more effective treatment. Example: ARR 5% → NNT = 20 (treat 20 patients to prevent 1 event). NNT is dependent on baseline risk (unlike RRR). NNH (Number Needed to Harm) = 1/ARI.",
  },
  {
    id: 332,
    subject: "PSM/Community Medicine",
    stem: "The PHC (Primary Health Centre) in India serves a population of approximately:",
    options: ["5,000 (hilly/tribal) and 10,000 (plains)", "20,000 (hilly) and 30,000 (plains)", "30,000 (hilly) and 50,000 (plains)", "100,000 (uniform)"],
    answer: 1,
    explanation:
      "PHC norms (IPHS 2022): serves 20,000 population in hilly/tribal areas and 30,000 in plains. Has 1 medical officer (MBBS). Sub-centre serves 3,000 (hilly) or 5,000 (plains) with 1 ANM. CHC (Community Health Centre) serves 80,000-120,000 population with 4 specialists (surgeon, physician, obstetrician, paediatrician).",
  },
  {
    id: 333,
    subject: "PSM/Community Medicine",
    stem: "The relative risk (RR) is the appropriate measure of association in which study design?",
    options: ["Case-control study", "Cross-sectional study", "Cohort study", "Randomised controlled trial"],
    answer: 2,
    explanation:
      "Relative Risk (RR) = risk in exposed / risk in unexposed. Used in cohort studies and RCTs where incidence can be measured directly. Odds Ratio (OR) is used in case-control studies (cannot calculate incidence). OR approximates RR when outcome is rare (<10%). In cross-sectional: prevalence ratio or OR.",
  },
  {
    id: 334,
    subject: "PSM/Community Medicine",
    stem: "The Total Fertility Rate (TFR) of India as per NFHS-5 (2019-21) is:",
    options: ["1.8", "2.0", "2.2", "2.8"],
    answer: 1,
    explanation:
      "NFHS-5 (2019-21) TFR: India = 2.0 (replacement level is 2.1). First time India has reached near replacement TFR nationally. TFR <2 in: Kerala (1.8), Tamil Nadu (1.8), Telangana (1.7), Sikkim (1.1). TFR still >2 in: Bihar (2.98), Meghalaya (2.9), UP (2.35). India's TFR declining from 3.4 (NFHS-1, 1992-93).",
  },
  {
    id: 335,
    subject: "PSM/Community Medicine",
    stem: "The positive predictive value (PPV) of a diagnostic test depends primarily on:",
    options: ["Sensitivity of the test alone", "Specificity of the test alone", "Both sensitivity and specificity, and prevalence of the disease", "Sample size of the study"],
    answer: 2,
    explanation:
      "PPV = TP/(TP+FP). PPV depends on: test sensitivity + specificity + PREVALENCE. In low-prevalence disease (rare disease), even a highly specific test has low PPV (many false positives). Sensitivity = doesn't miss disease; Specificity = doesn't falsely label healthy. PPV rises with increasing prevalence.",
  },
  {
    id: 336,
    subject: "PSM/Community Medicine",
    stem: "The index case (or 'case zero') in epidemiology refers to:",
    options: [
      "The most severe case in an outbreak",
      "The first identified/index case that brings the outbreak to attention",
      "The source case from whom all others were infected",
      "The case with the highest secondary attack rate",
    ],
    answer: 1,
    explanation:
      "Index case = the first identified case in a defined setting (brings the outbreak to the attention of public health authorities). Primary case = person who introduces disease into a defined population. Secondary cases = cases arising from exposure to the primary case. Not synonymous terms.",
  },
  {
    id: 337,
    subject: "PSM/Community Medicine",
    stem: "Which elimination target has India achieved for malaria in terms of Annual Parasite Incidence (API)?",
    options: [
      "API <5 per 1000 population (elimination threshold)",
      "API <1 per 1000 population",
      "Zero indigenous cases",
      "API <10 per 1000 population",
    ],
    answer: 1,
    explanation:
      "India achieved API <1 per 1000 population (WHO pre-elimination threshold) in 2020-21. National Framework for Malaria Elimination (NFME) 2016-30: eliminate malaria from 27 states/UTs by 2022, malaria-free India by 2030. P. falciparum proportion increasing (>50%) as P. vivax declines.",
  },
  {
    id: 338,
    subject: "PSM/Community Medicine",
    stem: "The Integrated Management of Neonatal and Childhood Illness (IMNCI) strategy classifies a child as having 'very severe disease' if which feature is present?",
    options: [
      "Fast breathing alone",
      "Chest indrawing alone",
      "General danger signs (not able to drink, convulsions, lethargy)",
      "Fever for 2 days",
    ],
    answer: 2,
    explanation:
      "IMNCI general danger signs (any = 'very severe'): not able to drink or breastfeed; vomits everything; convulsions now or during illness; lethargic or unconscious. IMNCI also classifies pneumonia, diarrhoea, malaria, ear problems, nutritional status. Trained health workers assess these in children 2 months-5 years.",
  },
  {
    id: 339,
    subject: "PSM/Community Medicine",
    stem: "Case fatality rate (CFR) is defined as:",
    options: [
      "Number of deaths / total population at risk × 100",
      "Number of deaths from disease / total number of cases of that disease × 100",
      "Number of deaths / total deaths from all causes × 100",
      "Number of deaths in a year / mid-year population × 1000",
    ],
    answer: 1,
    explanation:
      "CFR (%) = number of deaths from a specific disease / number of confirmed cases × 100. Measures disease severity (lethality). E.g., COVID-19 CFR ~1-3%. Differs from mortality rate (which uses total population denominator). High CFR = highly lethal disease (even if rare); low CFR but high incidence = still high mortality.",
  },
  {
    id: 340,
    subject: "PSM/Community Medicine",
    stem: "The Standardised Mortality Ratio (SMR) is used to:",
    options: [
      "Compare crude death rates between populations",
      "Compare observed deaths in a study population to expected deaths (if same age-specific rates as standard population)",
      "Measure mortality in clinical trials",
      "Calculate age-specific mortality rates",
    ],
    answer: 1,
    explanation:
      "SMR = (observed deaths / expected deaths) × 100. SMR >100 = higher mortality than reference population; <100 = lower. Used in occupational health (e.g., SMR for lung cancer in asbestos workers vs general population) and cohort studies with indirect standardisation. Accounts for age differences between populations.",
  },

  // ─── FORENSIC MEDICINE EXTENDED (341–350) ────────────────────────────────
  {
    id: 341,
    subject: "Forensic Medicine",
    stem: "The NDPS (Narcotic Drugs and Psychotropic Substances) Act 1985 classifies drug offences. What is the maximum imprisonment for 'commercial quantity' of heroin?",
    options: ["7 years", "10 years", "Life imprisonment with fine", "Death penalty"],
    answer: 2,
    explanation:
      "NDPS Act 1985: commercial quantity offences = rigorous imprisonment of 10-20 years (or life imprisonment for repeat offenders) + fine ≥₹1-2 lakh. Heroin commercial quantity = >250g; small quantity ≤5g. Death penalty only for repeat offenders convicted of commercial quantity offences. 2021 Amendment: bail for small quantity possession after 6 months if no charge sheet.",
  },
  {
    id: 342,
    subject: "Forensic Medicine",
    stem: "Thanatology is the scientific study of:",
    options: ["Wounds and injuries", "Death and dying", "Poisons and toxicology", "Sexual offences"],
    answer: 1,
    explanation:
      "Thanatology (from Greek Thanatos = death) is the scientific study of death and dying — its causes, mechanisms, and processes. Encompasses forensic pathology, palliative care perspectives, and medico-legal aspects. Includes signs of death (early: cooling, lividity, rigor; late: decomposition, adipocere, mummification).",
  },
  {
    id: 343,
    subject: "Forensic Medicine",
    stem: "Post-mortem lividity (livor mortis) becomes fixed (non-blanching) after approximately:",
    options: ["2-4 hours", "6-8 hours", "12-16 hours", "24 hours"],
    answer: 2,
    explanation:
      "Livor mortis (hypostasis): blood pools in dependent parts. Appears 2-4 hours; fully developed 6-12 hours; FIXED (cannot be shifted by position change) 12-16 hours. Fixed lividity is crucial in forensic practice — if lividity pattern does not match final body position, body was moved after 12-16 hours post-mortem.",
  },
  {
    id: 344,
    subject: "Forensic Medicine",
    stem: "The IPC section dealing with causing grievous hurt by act endangering life or personal safety is:",
    options: ["IPC 319", "IPC 320", "IPC 322", "IPC 325"],
    answer: 3,
    explanation:
      "IPC 319 = simple hurt definition; IPC 320 = grievous hurt (8 types: emasculation, permanent loss of eye/ear/joint/limb, permanent disability, life-endangering hurt, severe pain >20 days, fracture, burn/disfigurement); IPC 322 = voluntarily causing grievous hurt; IPC 325 = punishment for voluntarily causing grievous hurt (7 years + fine).",
  },
  {
    id: 345,
    subject: "Forensic Medicine",
    stem: "The consent required before performing a non-therapeutic medical procedure on a mentally competent adult patient should be:",
    options: ["Expressed or implied", "Only implied", "Only expressed and informed", "Compulsory in writing for all procedures"],
    answer: 2,
    explanation:
      "For non-therapeutic procedures (and all significant medical/surgical procedures), informed expressed consent is required — patient must understand the procedure, risks, alternatives, and benefits. Implied consent applies to emergency/unconscious patients. Written consent is best practice but not legally mandatory for ALL procedures — verbal expressed consent is valid.",
  },
  {
    id: 346,
    subject: "Forensic Medicine",
    stem: "The cause of death in hanging is primarily due to:",
    options: ["Asphyxia from tracheal obstruction alone", "Fracture-dislocation of cervical spine (in judicial hanging) or venous obstruction + carotid compression", "Anoxia from carotid artery occlusion alone", "Cardiac arrest from vagal stimulation"],
    answer: 1,
    explanation:
      "Mechanism of death in hanging: (1) Judicial/long-drop hanging: fracture-dislocation C2-C3 → transection of spinal cord → instantaneous death; (2) Suicidal/accidental (short drop): combination of venous obstruction (jugular veins), carotid compression, airway obstruction, vagal inhibition. Petechial haemorrhages in eyes/face = sign of asphyxia.",
  },
  {
    id: 347,
    subject: "Forensic Medicine",
    stem: "The Supreme Court landmark judgment in Aruna Shanbaug case (2011) addressed:",
    options: ["Medical negligence standards", "Passive euthanasia and withdrawal of life support", "Consent in emergency surgery", "Organ transplantation ethics"],
    answer: 1,
    explanation:
      "SC 2011 (Aruna Shanbaug vs Union of India): permitted passive euthanasia (withdrawal of life support) with conditions — close relatives/guardian petition to High Court, two medical boards examine, HC bench of 2 judges must approve. Active euthanasia remains illegal. SC 2018 (Common Cause vs UOI): advance directives (living wills) upheld with guidelines.",
  },
  {
    id: 348,
    subject: "Forensic Medicine",
    stem: "In firearm injuries, the presence of blackening, tattooing, and singeing around the wound indicates:",
    options: ["Exit wound", "Entry wound with distant range", "Entry wound at close/contact range", "Ricochet wound"],
    answer: 2,
    explanation:
      "Entry wound features: smaller, inverted edges, abrasion collar (ring of abrasion around entry). Close range/contact: blackening (soot), tattooing/stippling (unburnt powder), singeing, stellate laceration (from gas expansion). Distance >1 metre: only abrasion collar, no soot/tattooing. Exit wound: larger, everted edges, no abrasion collar (usually).",
  },
  {
    id: 349,
    subject: "Forensic Medicine",
    stem: "Tardieu's spots are subpleural petechial haemorrhages seen in:",
    options: ["Traumatic asphyxia", "All forms of mechanical asphyxia", "Carbon monoxide poisoning", "Strangulation specifically"],
    answer: 1,
    explanation:
      "Tardieu's spots: minute subpleural/subpericardial/subconjunctival petechiae from capillary rupture due to increased venous pressure during asphyxia. Seen in all forms of mechanical asphyxia (hanging, strangulation, smothering, drowning, throttling). Size varies from pin-point to 2-3mm. NOT specific to one type of asphyxia.",
  },
  {
    id: 350,
    subject: "Forensic Medicine",
    stem: "The Consumer Protection Act 2019 applies to medical services. A complaint can be filed within how many years of the cause of action?",
    options: ["1 year", "2 years", "3 years", "5 years"],
    answer: 1,
    explanation:
      "Consumer Protection Act 2019 (replaces 1986 Act): medical services are included (Supreme Court 1995: Indian Medical Association vs V.P. Shanta). Limitation: complaint must be filed within 2 years of cause of action (with power to condone delay if sufficient cause shown). District commission: up to ₹50 lakh; State: ₹50 lakh-₹2 crore; National: >₹2 crore.",
  },

  // ─── MICROBIOLOGY EXTENDED (351–362) ─────────────────────────────────────
  {
    id: 351,
    subject: "Microbiology",
    stem: "MRSA (methicillin-resistant Staphylococcus aureus) is treated with:",
    options: ["Cloxacillin", "Amoxicillin-clavulanate", "Vancomycin or Linezolid", "Ceftriaxone"],
    answer: 2,
    explanation:
      "MRSA: resistance via mecA gene encoding PBP2a (low affinity for all beta-lactams). Treatment: vancomycin (IV, drug of choice for serious infections), linezolid, daptomycin, or teicoplanin. Community-acquired MRSA (CA-MRSA): often susceptible to cotrimoxazole, clindamycin. Tigecycline for complicated skin/soft tissue infections.",
  },
  {
    id: 352,
    subject: "Microbiology",
    stem: "HBsAg persists >6 months, HBeAg positive, high HBV DNA, elevated ALT — this represents which phase of chronic HBV infection?",
    options: ["Immune tolerant phase", "Immune clearance (HBeAg-positive hepatitis) phase", "Inactive carrier state", "HBeAg-negative hepatitis phase"],
    answer: 1,
    explanation:
      "Immune clearance phase (HBeAg-positive hepatitis): HBsAg+, HBeAg+, high HBV DNA (>2×10⁴ IU/mL), elevated ALT, active necroinflammation — liver is being damaged. Immune tolerant: high DNA but NORMAL ALT (no liver damage). Inactive carrier: low/undetectable HBV DNA, normal ALT, anti-HBe positive. Treatment indicated in immune clearance phase.",
  },
  {
    id: 353,
    subject: "Microbiology",
    stem: "The HIV WHO clinical staging that corresponds to CDC Stage C (AIDS) is:",
    options: ["WHO Stage 1", "WHO Stage 2", "WHO Stage 3", "WHO Stage 4"],
    answer: 3,
    explanation:
      "WHO HIV Stage 4 = AIDS-defining conditions (= CDC Stage C): Pneumocystis pneumonia, cerebral toxoplasmosis, cryptococcal meningitis, cytomegalovirus retinitis, disseminated MAC, HIV wasting syndrome, HIV encephalopathy, CD4 <200 cells/μL typically. ART is initiated at any CD4 count (treat all) per 2016 WHO guidelines.",
  },
  {
    id: 354,
    subject: "Microbiology",
    stem: "Which Plasmodium species causes 'malignant tertian malaria' with the highest mortality?",
    options: ["P. vivax", "P. malariae", "P. ovale", "P. falciparum"],
    answer: 3,
    explanation:
      "P. falciparum = malignant tertian malaria (fever every 48h, but irregular). Most lethal due to: cytoadherence (infected RBCs stick to cerebral vessels → cerebral malaria), rosetting, all RBC stages infected (unlike P. vivax which only infects reticulocytes). Treatment: artemisinin combination therapy (ACT) e.g., artesunate + amodiaquine/mefloquine. IV artesunate for severe malaria.",
  },
  {
    id: 355,
    subject: "Microbiology",
    stem: "The CLO (Campylobacter-Like Organism) test detects H. pylori by detecting:",
    options: ["Lipase activity", "Catalase activity", "Urease activity", "Oxidase activity"],
    answer: 2,
    explanation:
      "CLO test (rapid urease test): biopsy placed in urea-containing gel. H. pylori urease converts urea to NH₃ (ammonia) → pH rises → colour change to pink/red = positive. Sensitivity 90-95%, specificity >95%. Result in 1-24 hours. False negative: recent PPI/antibiotic use. Urea breath test (UBT) and stool antigen are non-invasive alternatives.",
  },
  {
    id: 356,
    subject: "Microbiology",
    stem: "The ELISA test for HIV detects:",
    options: ["HIV DNA", "HIV p24 antigen only (4th gen)", "HIV antibodies (3rd gen) or both antigen and antibodies (4th gen)", "HIV RNA viral load"],
    answer: 2,
    explanation:
      "3rd generation HIV ELISA: detects HIV IgG antibodies (window period ~4 weeks). 4th generation (combination antigen/antibody): detects p24 antigen + antibodies (window period reduced to ~2-3 weeks). 5th generation: differentiates HIV-1 vs HIV-2. Confirmatory test: Western blot or HIV RNA PCR. NACO guidelines in India: 3 ELISA tests with different antigens for confirmation.",
  },
  {
    id: 357,
    subject: "Microbiology",
    stem: "Koplik's spots, Forchheimer spots, Nagayama spots are associated with measles, rubella, and exanthem subitum (HHV-6) respectively. The causative virus of exanthem subitum is:",
    options: ["Paramyxovirus", "Togavirus (Rubivirus)", "Human herpesvirus 6 (HHV-6)", "Parvovirus B19"],
    answer: 2,
    explanation:
      "Exanthem subitum (roseola infantum): HHV-6 (Human Herpesvirus 6), rarely HHV-7. Peak age 6-18 months. High fever for 3-5 days → sudden defervescence → rose-pink maculopapular rash on trunk. Nagayama spots (small erythematous papules on soft palate/uvula). Rubella: togavirus, Forchheimer spots (petechiae on soft palate). Parvovirus B19: slapped-cheek disease (erythema infectiosum).",
  },
  {
    id: 358,
    subject: "Microbiology",
    stem: "Gram stain of CSF in bacterial meningitis shows gram-negative diplococci. The most likely causative organism is:",
    options: ["Haemophilus influenzae", "Neisseria meningitidis", "Streptococcus pneumoniae", "Listeria monocytogenes"],
    answer: 1,
    explanation:
      "Gram-negative diplococci (coffee-bean shaped) in CSF = Neisseria meningitidis (meningococcus). Gram-positive diplococci (lancet-shaped) = S. pneumoniae. Gram-negative coccobacilli = H. influenzae. Gram-positive rods = Listeria monocytogenes (elderly, immunocompromised, pregnant). N. meningitidis: petechiae/purpura, Waterhouse-Friderichsen syndrome. Treatment: ceftriaxone; chemoprophylaxis: rifampicin/ciprofloxacin.",
  },
  {
    id: 359,
    subject: "Microbiology",
    stem: "The organism associated with 'rice-water stools' and comma-shaped gram-negative rods is:",
    options: ["Shigella dysenteriae", "Vibrio cholerae", "Campylobacter jejuni", "Enterotoxigenic E. coli"],
    answer: 1,
    explanation:
      "Vibrio cholerae: comma-shaped (vibrio) gram-negative rods, oxidase positive. Produces cholera toxin (ADP-ribosylates Gs → permanent activation → massive cAMP → Cl⁻ secretion → rice-water stools). O1 and O139 serogroups cause epidemic cholera. Treatment: ORS + tetracycline/doxycycline. Dark-field microscopy: 'shooting stars' motility.",
  },
  {
    id: 360,
    subject: "Microbiology",
    stem: "The most common opportunistic infection in HIV patients in India is:",
    options: ["PCP (Pneumocystis pneumonia)", "Tuberculosis (Mycobacterium tuberculosis)", "Cryptococcal meningitis", "CMV retinitis"],
    answer: 1,
    explanation:
      "In India (and other high-TB-burden countries), tuberculosis is the most common opportunistic infection in HIV patients — ~40% of HIV patients develop TB. Globally (in developed nations), PCP is more common. HIV-TB co-infection: start ART within 2-4 weeks of TB treatment (if CD4 <50 cells/μL within 2 weeks). ART + ATT → immune reconstitution inflammatory syndrome (IRIS) risk.",
  },
  {
    id: 361,
    subject: "Microbiology",
    stem: "The heterophile antibody test (Monospot/Paul-Bunnell test) is used to diagnose:",
    options: ["CMV mononucleosis", "EBV infectious mononucleosis", "Toxoplasmosis", "HIV acute seroconversion"],
    answer: 1,
    explanation:
      "Paul-Bunnell/Monospot test: detects IgM heterophile antibodies (agglutinate sheep/horse red cells) in EBV infectious mononucleosis. Sensitivity 85-90%, specificity 95% after 1st week. False negative in young children (<4 years) and early illness. EBV = Epstein-Barr virus: tonsillopharyngitis, splenomegaly, atypical lymphocytes (Downey cells), lymphadenopathy. Ampicillin → rash in IM.",
  },
  {
    id: 362,
    subject: "Microbiology",
    stem: "AFB (acid-fast bacilli) staining by Ziehl-Neelsen technique uses which counterstain?",
    options: ["Crystal violet", "Safranin", "Methylene blue", "Malachite green"],
    answer: 2,
    explanation:
      "ZN staining: (1) Carbol fuchsin (primary stain, heated = hot ZN) — mycobacteria retain red colour due to mycolic acid in cell wall; (2) 20% H₂SO₄ (acid decolouriser) — removes stain from non-acid-fast bacteria; (3) Methylene blue (counterstain) — non-acid-fast bacteria appear blue. AFB = red rods against blue background.",
  },

  // ─── BIOCHEMISTRY EXTENDED (243–252) ─────────────────────────────────────
  {
    id: 363,
    subject: "Biochemistry",
    stem: "In McArdle disease (GSD type V), the biochemical finding during forearm exercise test is:",
    options: [
      "Normal rise in lactate with no rise in ammonia",
      "No rise in lactate but normal rise in ammonia",
      "No rise in lactate and no rise in ammonia",
      "Normal rise in both lactate and ammonia",
    ],
    answer: 1,
    explanation:
      "Forearm exercise test in McArdle's (muscle phosphorylase deficiency): NO rise in venous lactate (cannot breakdown glycogen to glucose-1-phosphate → pyruvate → lactate), but normal rise in ammonia (AMP deaminase still active). Debranching enzyme deficiency: similar pattern. Myophosphorylase stain negative on muscle biopsy.",
  },
  {
    id: 364,
    subject: "Biochemistry",
    stem: "Which vitamin is required for the post-translational carboxylation of glutamate residues in clotting factors II, VII, IX, X?",
    options: ["Vitamin A", "Vitamin C", "Vitamin K", "Vitamin E"],
    answer: 2,
    explanation:
      "Vitamin K (phylloquinone/menaquinone) is required for gamma-carboxylation of glutamate → gla (gamma-carboxyglutamate) residues in factors II, VII, IX, X, and anticoagulant proteins C and S. This carboxylation enables Ca²⁺-mediated binding to phospholipid surfaces. Warfarin inhibits VKORC1 → blocks vitamin K recycling.",
  },
  {
    id: 365,
    subject: "Biochemistry",
    stem: "The key enzyme that is deficient in Pompe disease (GSD type II) is:",
    options: ["Muscle glycogen phosphorylase", "Glucose-6-phosphatase", "Acid alpha-glucosidase (acid maltase)", "Debranching enzyme"],
    answer: 2,
    explanation:
      "Pompe disease (GSD IIa): deficiency of lysosomal acid alpha-1,4-glucosidase (acid maltase/GAA) → glycogen accumulates in lysosomes of cardiac and skeletal muscle. Infantile form: cardiomegaly, hypotonia, respiratory failure, death by 2 years if untreated. Treatment: enzyme replacement therapy (alglucosidase alfa). GAA gene mutation on chromosome 17q25.",
  },
  {
    id: 366,
    subject: "Biochemistry",
    stem: "The enzyme that catalyses the rate-limiting step of de novo purine synthesis is:",
    options: ["HGPRT", "Adenylosuccinate lyase", "PRPP amidotransferase (glutamine phosphoribosylpyrophosphate amidotransferase)", "Xanthine oxidase"],
    answer: 2,
    explanation:
      "PRPP amidotransferase catalyses: PRPP + glutamine → PRA (5-phosphoribosylamine) — rate-limiting step of de novo purine synthesis. Inhibited by end-products AMP and GMP (feedback inhibition). Allopurinol → inhibits xanthine oxidase (last step: hypoxanthine → xanthine → uric acid). Febuxostat: non-purine XO inhibitor.",
  },
  {
    id: 367,
    subject: "Biochemistry",
    stem: "Niemann-Pick disease Type A is caused by deficiency of:",
    options: ["Glucocerebrosidase", "Sphingomyelinase", "Hexosaminidase A", "Alpha-galactosidase A"],
    answer: 1,
    explanation:
      "Niemann-Pick types A and B: sphingomyelinase deficiency → sphingomyelin accumulates in macrophages (foam cells). Type A: severe, neuropathic, cherry-red spot at macula (like Tay-Sachs), hepatosplenomegaly, death by age 3. Type B: less severe, no neurological involvement. Sphingomyelin also elevated in Niemann-Pick Type C (NPC1/2 cholesterol transport defect — different mechanism).",
  },
  {
    id: 368,
    subject: "Biochemistry",
    stem: "Tay-Sachs disease (GM2 gangliosidosis) is characterised by deficiency of:",
    options: ["Glucocerebrosidase", "Sphingomyelinase", "Hexosaminidase A (alpha subunit)", "Galactocerebrosidase"],
    answer: 2,
    explanation:
      "Tay-Sachs: hexosaminidase A (alpha subunit) deficiency → GM2 ganglioside accumulation → neurodegeneration. Features: progressive motor and mental deterioration, cherry-red spot at macula (50% of cases), exaggerated startle response, macrocephaly. Autosomal recessive; highest prevalence in Ashkenazi Jews. No hepatosplenomegaly (unlike Niemann-Pick or Gaucher's).",
  },
  {
    id: 369,
    subject: "Biochemistry",
    stem: "Insulin stimulates de novo fatty acid synthesis by activating which enzyme?",
    options: ["Hormone-sensitive lipase", "Carnitine palmitoyltransferase I (CPT-I)", "Acetyl-CoA carboxylase (ACC)", "Malonyl-CoA decarboxylase"],
    answer: 2,
    explanation:
      "Acetyl-CoA carboxylase (ACC): rate-limiting enzyme of fatty acid synthesis. Acetyl-CoA + CO₂ + ATP → malonyl-CoA. ACC activated by insulin (via dephosphorylation) and citrate; inhibited by glucagon/adrenaline (via phosphorylation, AMPK), malonyl-CoA product. Malonyl-CoA also inhibits CPT-I → prevents fatty acid oxidation (cannot synthesise and oxidise simultaneously).",
  },
  {
    id: 370,
    subject: "Biochemistry",
    stem: "AIP (Acute Intermittent Porphyria) presents with the classic triad of:",
    options: [
      "Photosensitivity + skin blistering + hypertrichosis",
      "Abdominal pain + neuropsychiatric features + dark urine (port-wine)",
      "Haemolytic anaemia + jaundice + splenomegaly",
      "Hepatocellular carcinoma + cirrhosis + elevated iron",
    ],
    answer: 1,
    explanation:
      "AIP (porphobilinogen deaminase deficiency): autosomal dominant, presents after puberty. Classic triad: abdominal pain (colicky, severe), neuropsychiatric features (psychosis, seizures, motor neuropathy), dark/port-wine urine (ALA + PBG in urine). No photosensitivity (unlike PCT). Precipitated by: drugs (barbiturates, sulphonamides, rifampicin, OCPs), alcohol, fasting, stress.",
  },
  {
    id: 371,
    subject: "Biochemistry",
    stem: "The Km of an enzyme is defined as the substrate concentration at which the reaction rate equals:",
    options: ["Maximum velocity (Vmax)", "Half of Vmax", "Zero", "Twice Vmax"],
    answer: 1,
    explanation:
      "Michaelis-Menten equation: V = Vmax[S] / (Km + [S]). Km = substrate concentration when V = Vmax/2. Low Km = high affinity for substrate (enzyme half-saturated at low [S]). High Km = low affinity. Km is constant regardless of enzyme concentration (unlike Vmax). Competitive inhibitor: increases apparent Km, Vmax unchanged.",
  },
  {
    id: 372,
    subject: "Biochemistry",
    stem: "The most abundant protein in human plasma is:",
    options: ["Immunoglobulin G", "Fibrinogen", "Albumin", "Alpha-2 macroglobulin"],
    answer: 2,
    explanation:
      "Albumin: most abundant plasma protein (~35-50 g/L, ~60% of total plasma protein). Functions: maintains oncotic pressure, transport (fatty acids, bilirubin, hormones, drugs), antioxidant (thiol groups). Synthesised in liver (halflife ~20 days). Hypoalbuminaemia: liver disease, nephrotic syndrome, malnutrition, acute phase response (negative acute-phase protein).",
  },

  // ─── PATHOLOGY EXTENDED (381–392) ────────────────────────────────────────
  {
    id: 381,
    subject: "Pathology",
    stem: "Congo red staining of amyloid shows which appearance under polarised light?",
    options: ["Green fluorescence", "Apple-green birefringence", "Yellow birefringence", "Red fluorescence"],
    answer: 1,
    explanation:
      "Amyloid: Congo red stain → salmon-pink colour under light microscopy → apple-green birefringence under POLARISED light (pathognomonic). Thioflavin T/S: fluorescent yellow-green (more sensitive). AL amyloid (primary): immunoglobulin light chains — plasma cell disorders; AA amyloid (secondary/reactive): serum amyloid A protein — chronic inflammatory diseases.",
  },
  {
    id: 382,
    subject: "Pathology",
    stem: "The histological timeline of acute MI: at 24 hours, the characteristic finding is:",
    options: ["No change visible", "Coagulative necrosis with neutrophil infiltration", "Macrophage infiltration with early granulation tissue", "Dense fibrous scar"],
    answer: 1,
    explanation:
      "MI histological timeline: 0-4h: no light microscopy change (early: wavy fibres, contraction bands); 4-12h: early coagulative necrosis, oedema; 12-24h: coagulative necrosis + neutrophil infiltration; 1-3 days: dead myocytes + PMNs; 3-7 days: macrophages begin; 1-2 weeks: granulation tissue + new capillaries; 2+ months: dense fibrous scar.",
  },
  {
    id: 383,
    subject: "Pathology",
    stem: "Membranous nephropathy is characterised on electron microscopy by:",
    options: ["Subendothelial deposits", "Mesangial deposits", "Subepithelial deposits and GBM spikes", "Linear IgG deposits"],
    answer: 2,
    explanation:
      "Membranous nephropathy: subepithelial immune complex deposits → GBM thickening with 'spikes' (seen on Jones silver stain). IF: granular IgG + C3 along GBM ('beaded' pattern). EM: subepithelial electron-dense deposits. Most common cause of nephrotic syndrome in non-diabetic adults. Primary: anti-PLA2R antibodies. Secondary: SLE, hepatitis B, malignancy, drugs.",
  },
  {
    id: 384,
    subject: "Pathology",
    stem: "Rapidly progressive glomerulonephritis (RPGN) is histologically characterised by:",
    options: ["Mesangial hypercellularity", "Membranous thickening", "Crescents in Bowman's space (>50% glomeruli)", "Focal segmental sclerosis"],
    answer: 2,
    explanation:
      "RPGN: crescents in Bowman's space (proliferation of parietal epithelial cells + macrophages) in >50% of glomeruli. Three types: Type I = anti-GBM (Goodpasture), Type II = immune complex (SLE, IgA, post-streptococcal), Type III = pauci-immune (ANCA-associated vasculitis — MPA, GPA). Treatment: plasmapheresis (Type I), immunosuppression (Type II/III).",
  },
  {
    id: 385,
    subject: "Pathology",
    stem: "The tumour suppressor gene mutated in >50% of all human cancers is:",
    options: ["Rb gene", "BRCA1", "p53 (TP53)", "APC"],
    answer: 2,
    explanation:
      "p53 (TP53) on chromosome 17p is mutated in >50% of all human cancers — the 'guardian of the genome.' p53 senses DNA damage → induces cell cycle arrest (p21/CIP1) or apoptosis (Bax). Loss → cells continue dividing with damaged DNA → malignant transformation. Li-Fraumeni syndrome = germline TP53 mutation.",
  },
  {
    id: 386,
    subject: "Pathology",
    stem: "Onion-skin periosteal reaction on X-ray is characteristic of:",
    options: ["Osteosarcoma", "Chondrosarcoma", "Ewing's sarcoma", "Giant cell tumour"],
    answer: 2,
    explanation:
      "Ewing's sarcoma: onion-skin (lamellated) periosteal reaction on X-ray + soft tissue mass + diaphysis of long bones. Most common in 5-20 years. t(11;22) — EWS-FLI1 fusion. CD99+ (membranous). Periosteal reaction in osteosarcoma = Codman's triangle (sunburst pattern in some). GCT: soap-bubble lesion, epiphysis.",
  },
  {
    id: 387,
    subject: "Pathology",
    stem: "Dystrophic calcification is seen in which condition?",
    options: ["Hyperparathyroidism", "Metastatic deposits with normal serum calcium", "Atherosclerotic plaques (with normal serum calcium)", "Hypervitaminosis D"],
    answer: 2,
    explanation:
      "Dystrophic calcification: calcium deposition in dead/dying/abnormal tissue (serum calcium NORMAL). Examples: atherosclerotic plaques, caseous TB necrosis, liquefactive necrosis, calcifying tumours (psammoma bodies). Metastatic calcification: calcium deposits in normal tissue due to hypercalcaemia (hyperparathyroidism, hypervitaminosis D, sarcoidosis).",
  },
  {
    id: 388,
    subject: "Pathology",
    stem: "The hallmark immunohistochemical marker distinguishing Hodgkin lymphoma (nodular sclerosis type) from other lymphomas is:",
    options: ["CD20+, CD15-, CD30-", "CD15+, CD30+, CD45-", "CD3+, CD8+", "CD19+, CD20+, CD10+"],
    answer: 1,
    explanation:
      "Classic Hodgkin lymphoma RS cells: CD15+, CD30+, CD45- (LCA negative). CD20 variable. CD45 negativity helps distinguish from NHL. Nodular lymphocyte-predominant HL (NLPHL): CD20+, CD45+, CD15-, CD30- (popcorn cells, different biology). BCL-2 positive in follicular lymphoma; TdT in lymphoblastic lymphoma.",
  },
  {
    id: 389,
    subject: "Pathology",
    stem: "Which type of hypersensitivity reaction is responsible for contact dermatitis (e.g., nickel allergy)?",
    options: ["Type I (IgE-mediated)", "Type II (Cytotoxic)", "Type III (Immune complex)", "Type IV (Delayed/cell-mediated)"],
    answer: 3,
    explanation:
      "Contact dermatitis (e.g., nickel, poison ivy, latex): Type IV (delayed-type hypersensitivity, DTH) — T-cell mediated, no antibodies involved. Antigen-presenting cells process allergen → sensitised T cells release cytokines → 48-72h after exposure. Type I: anaphylaxis, urticaria. Type II: Goodpasture, haemolytic transfusion reactions. Type III: serum sickness, SLE.",
  },
  {
    id: 390,
    subject: "Pathology",
    stem: "Warthin-Finkeldey giant cells (polykaryocytes) are pathognomonic of:",
    options: ["Herpes zoster", "Measles", "Mumps", "CMV infection"],
    answer: 1,
    explanation:
      "Warthin-Finkeldey giant cells: multinucleated syncytial giant cells with numerous nuclei in a 'grape cluster' pattern — pathognomonic of measles (rubeola). Found in lymphoid tissue (tonsils, appendix, lymph nodes) during prodromal phase. Multinucleated cells are also seen in herpes (Tzanck smear), but those have cowdry A inclusions.",
  },
  {
    id: 391,
    subject: "Pathology",
    stem: "The translocation associated with follicular lymphoma is:",
    options: ["t(14;18) — BCL2/IgH", "t(8;14) — c-MYC/IgH", "t(9;22) — BCR/ABL", "t(11;14) — BCL1/IgH"],
    answer: 0,
    explanation:
      "Follicular lymphoma: t(14;18)(q32;q21) — BCL2 gene moves next to IgH enhancer → BCL2 overexpression → anti-apoptotic → cells accumulate. Most common adult NHL in Western countries. CD10+, BCL2+, BCL6+. Indolent but incurable. Transformation to DLBCL (Richter transformation in CLL; in follicular lymphoma = histological transformation).",
  },
  {
    id: 392,
    subject: "Pathology",
    stem: "Foam cells (lipid-laden macrophages) are the hallmark of:",
    options: ["Fibrous plaque in atherosclerosis", "Fatty streak (earliest atherosclerotic lesion)", "Complex plaque with calcification", "Fibromuscular dysplasia"],
    answer: 1,
    explanation:
      "Fatty streak = earliest grossly visible atherosclerotic lesion: lipid-laden macrophages (foam cells) accumulated in the intima. Foam cells form when oxidised LDL is taken up by macrophages via scavenger receptors. Progress to fibrous plaque (smooth muscle + collagen + lipid core + foam cells + fibrous cap). Unstable plaques (thin cap) → rupture → ACS.",
  },

  // ─── ENT/OPHTHALMOLOGY EXTENDED (393–402) ────────────────────────────────
  {
    id: 393,
    subject: "ENT/Ophthalmology",
    stem: "The WHO trachoma grading classifies active trachoma based on follicular involvement. TF (trachomatous follicular inflammation) is defined as:",
    options: [
      "Intense inflammatory thickening obscuring deep vessels",
      "Five or more follicles ≥0.5mm on upper tarsal conjunctiva",
      "Trichiasis (inturned eyelashes)",
      "Corneal opacity directly affecting visual axis",
    ],
    answer: 1,
    explanation:
      "WHO FISTO trachoma grading: TF = ≥5 follicles on upper tarsal conjunctiva; TI = intense inflammation (>50% of deep vessels obscured); TS = tarsal conjunctival scarring; TT = trichiasis; CO = corneal opacity over pupil. TF + TI = active trachoma. SAFE strategy for control. Azithromycin single dose (1g adults, 20mg/kg children) or tetracycline eye ointment.",
  },
  {
    id: 394,
    subject: "ENT/Ophthalmology",
    stem: "The Ridley-Jopling classification of leprosy divides it into 5 types. The 'borderline tuberculoid' (BT) type is characterised by:",
    options: [
      "No bacilli (AFB index 0), high cell-mediated immunity",
      "Few (1-5) well-defined asymmetric lesions, few if any AFB",
      "Many lesions, widespread nerve involvement, moderate AFB",
      "Innumerable lesions, glove-and-stocking anaesthesia, AFB 5+",
    ],
    answer: 1,
    explanation:
      "Ridley-Jopling classification: TT (tuberculoid) → BT → BB (borderline) → BL → LL (lepromatous). BT: few well-defined hypopigmented/erythematous plaques (1-5), asymmetric, impaired sensation, few or no AFB (BI 0-1+), moderate CMI. WHO simplified: paucibacillary (≤5 patches) = TT/BT; multibacillary (>5) = BB/BL/LL. Lepromin test positive in TT/BT.",
  },
  {
    id: 395,
    subject: "ENT/Ophthalmology",
    stem: "Open angle glaucoma differs from acute angle-closure glaucoma in that open-angle glaucoma typically presents with:",
    options: [
      "Severe eye pain and redness",
      "Nausea, vomiting, halos around lights",
      "Insidious, asymptomatic peripheral visual field loss",
      "Corneal oedema with blurred vision",
    ],
    answer: 2,
    explanation:
      "Primary open-angle glaucoma (POAG): insidious, painless, progressive peripheral visual field loss (tunnel vision) — often detected late. Trabecular meshwork blocked but iridocorneal angle open. IOP typically >21 mmHg. Optic disc cupping (CDR >0.6). Acute angle-closure: dramatic presentation — severe pain, redness, mid-dilated fixed pupil, corneal oedema, halos. Emergency: pilocarpine + acetazolamide + mannitol.",
  },
  {
    id: 396,
    subject: "ENT/Ophthalmology",
    stem: "The gold standard investigation for diagnosing Ménière's disease is:",
    options: ["Audiometry alone", "MRI brain with gadolinium", "Electrocochleography (ECoG)", "Vestibular evoked myogenic potentials (VEMP)"],
    answer: 2,
    explanation:
      "Ménière's disease (endolymphatic hydrops): triad of episodic vertigo (lasting 20 min-12 hours) + fluctuating sensorineural hearing loss + tinnitus ± aural fullness. Electrocochleography (ECoG): summating potential/action potential (SP/AP) ratio >0.4 indicates endolymphatic hydrops. MRI (intratympanic gadolinium): visualises endolymph directly. Medical treatment: low-salt diet, diuretics, betahistine.",
  },
  {
    id: 397,
    subject: "ENT/Ophthalmology",
    stem: "Pseudomonas aeruginosa causes which type of otitis externa that is rapidly progressive and involves cartilage and bone?",
    options: ["Acute otitis externa", "Malignant (necrotising) otitis externa", "Otomycosis", "Bullous myringitis"],
    answer: 1,
    explanation:
      "Malignant (necrotising) otitis externa: P. aeruginosa infection in elderly diabetics or immunocompromised → aggressive infection spreading from EAC to skull base, mastoid, and cranial nerves (CN VII most common). Osteomyelitis of temporal bone. Granulation tissue at bony-cartilaginous junction. Treatment: prolonged anti-pseudomonal antibiotics (ciprofloxacin IV/oral) + surgical debridement.",
  },
  {
    id: 398,
    subject: "ENT/Ophthalmology",
    stem: "The most common cause of unilateral sensorineural hearing loss in young adults is:",
    options: ["Presbycusis", "Acoustic neuroma (vestibular schwannoma)", "CSOM with cholesteatoma", "Sudden SNHL"],
    answer: 1,
    explanation:
      "Acoustic neuroma (vestibular schwannoma): benign tumour of Schwann cells of CN VIII (usually superior vestibular nerve). Presents with unilateral progressive SNHL, tinnitus, +/- vertigo, absent caloric response, elevated acoustic reflex threshold. MRI with gadolinium: gold standard (ice-cream cone appearance in IAM). Treatment: microsurgery/radiosurgery. Bilateral = NF2.",
  },
  {
    id: 399,
    subject: "ENT/Ophthalmology",
    stem: "The most common nasal polyp is:",
    options: ["Antrochoanal polyp (Killian's polyp)", "Ethmoidal polyp (sinonasal polyp)", "Juvenile nasopharyngeal angiofibroma", "Inverted papilloma"],
    answer: 1,
    explanation:
      "Ethmoidal polyps (sinonasal polyps): most common, bilateral, multiple, arising from ethmoid sinuses, associated with allergic rhinitis, asthma, aspirin sensitivity (Samter's triad), chronic sinusitis, CF. Pale grey, insensate, smooth, sessile. Antrochoanal polyp (Killian's): unilateral, single, arising from maxillary antrum, common in young people/children. Treatment: endoscopic sinus surgery (FESS).",
  },
  {
    id: 400,
    subject: "ENT/Ophthalmology",
    stem: "Congenital cataract, if present, should ideally be operated by which age to prevent amblyopia?",
    options: ["At 1 year", "At 3 months (dense central cataract by 6-8 weeks)", "At 5 years", "Before school age (5-6 years)"],
    answer: 1,
    explanation:
      "Congenital dense unilateral cataract: must be operated within 6-8 weeks of birth (maximum by 3 months) to prevent deprivation amblyopia (irreversible visual cortex changes during critical period of visual development). Followed by aggressive optical correction (contact lens/spectacles) and occlusion therapy (patching fellow eye). Bilateral dense cataract: also urgent, within 6-10 weeks.",
  },
  {
    id: 401,
    subject: "ENT/Ophthalmology",
    stem: "The Schirmer's test is used to assess:",
    options: ["Corneal sensitivity", "Intraocular pressure", "Lacrimal (tear) secretion", "Visual field defects"],
    answer: 2,
    explanation:
      "Schirmer's test: strip of filter paper (5mm wide × 35mm long) folded at the notch (5mm) and placed in lower conjunctival fornix at junction of outer 1/3 and inner 2/3. Wetting after 5 minutes: >15mm (Schirmer I, no anaesthesia) = normal. <5mm = abnormal (dry eye/keratoconjunctivitis sicca). Sjögren's syndrome = primary dry eye + dry mouth.",
  },
  {
    id: 402,
    subject: "ENT/Ophthalmology",
    stem: "Ludwig's angina is a life-threatening condition originating from infection of which teeth?",
    options: ["Upper incisors", "Upper molars", "Lower second/third molars", "Lower premolars"],
    answer: 2,
    explanation:
      "Ludwig's angina: bilateral submandibular space infection (sublingual + submylohyoid + submaxillary spaces), most commonly from lower 2nd/3rd molar periapical abscess (roots below mylohyoid line). Rapidly spreading bilateral neck cellulitis → floor of mouth elevation, glottic oedema, airway compromise → death if untreated. Emergency: airway management (awake fibreoptic intubation/tracheostomy) + IV antibiotics + surgical drainage.",
  },

  // ─── BIOCHEMISTRY EXTENDED (243–252) ─────────────────────────────────────
  {
    id: 243,
    subject: "Biochemistry",
    stem: "The rate-limiting enzyme of the urea cycle is:",
    options: ["Arginase", "Carbamoyl phosphate synthetase I (CPS-I)", "Argininosuccinate synthetase", "Ornithine transcarbamylase"],
    answer: 1,
    explanation:
      "CPS-I (in mitochondria) is the rate-limiting enzyme of the urea cycle. It catalyses: NH₃ + CO₂ + 2ATP → carbamoyl phosphate. Activated by N-acetylglutamate (NAG). Deficiency → hyperammonemia (most severe in neonates).",
  },
  {
    id: 244,
    subject: "Biochemistry",
    stem: "Phenylketonuria (PKU) is caused by deficiency of:",
    options: ["Tyrosine hydroxylase", "Phenylalanine hydroxylase", "Homogentisate oxidase", "Fumarylacetoacetase"],
    answer: 1,
    explanation:
      "PKU: phenylalanine hydroxylase deficiency → phenylalanine accumulates → intellectual disability, fair skin/hair (reduced melanin), musty odour (phenylacetate), eczema. Treat with phenylalanine-restricted diet + sapropterin (BH4) in BH4-responsive forms.",
  },
  {
    id: 245,
    subject: "Biochemistry",
    stem: "The enzyme deficient in gout (Lesch-Nyhan syndrome) is:",
    options: ["Xanthine oxidase", "Adenosine deaminase", "Hypoxanthine-guanine phosphoribosyltransferase (HGPRT)", "Purine nucleoside phosphorylase"],
    answer: 2,
    explanation:
      "Lesch-Nyhan syndrome: HGPRT deficiency → purine salvage pathway blocked → excess uric acid production → gout + neurological features (self-mutilation, choreoathetosis, intellectual disability). X-linked recessive. Allopurinol treats gout but not neurological features.",
  },
  {
    id: 246,
    subject: "Biochemistry",
    stem: "Competitive inhibition of an enzyme is characterised by:",
    options: [
      "Decreased Vmax, unchanged Km",
      "Unchanged Vmax, increased Km",
      "Decreased Vmax, increased Km",
      "Unchanged Vmax, unchanged Km",
    ],
    answer: 1,
    explanation:
      "Competitive inhibition: inhibitor competes with substrate for active site → Km increases (apparent reduced affinity), Vmax UNCHANGED (can be overcome by increasing substrate). Non-competitive: Vmax decreases, Km unchanged. Uncompetitive: both Km and Vmax decrease.",
  },
  {
    id: 247,
    subject: "Biochemistry",
    stem: "The vitamin deficiency that causes pellagra is:",
    options: ["Vitamin B1 (thiamine)", "Vitamin B2 (riboflavin)", "Vitamin B3 (niacin)", "Vitamin B6 (pyridoxine)"],
    answer: 2,
    explanation:
      "Pellagra: niacin (vitamin B3/nicotinic acid) deficiency. 3 Ds: Dermatitis (photosensitive, Casal's necklace), Diarrhoea, Dementia. A 4th D = Death if untreated. Can also occur in carcinoid syndrome and isoniazid treatment (pyridoxine also deficient). Treat with nicotinamide.",
  },
  {
    id: 248,
    subject: "Biochemistry",
    stem: "Which coenzyme is involved in transamination reactions?",
    options: ["NAD⁺", "FAD", "Pyridoxal phosphate (PLP)", "Thiamine pyrophosphate (TPP)"],
    answer: 2,
    explanation:
      "Pyridoxal phosphate (PLP) — active form of vitamin B6 — is the coenzyme for transamination (and all amino acid metabolism). ALT (alanine aminotransferase) and AST (aspartate aminotransferase) use PLP. Deficiency causes convulsions in infants (glutamate decarboxylase requires PLP).",
  },
  {
    id: 249,
    subject: "Biochemistry",
    stem: "Scurvy (vitamin C deficiency) causes impaired synthesis of:",
    options: ["Elastin", "Collagen (hydroxylation of proline and lysine)", "Keratin", "Fibronectin"],
    answer: 1,
    explanation:
      "Vitamin C (ascorbic acid) is required for hydroxylation of proline and lysine by prolyl and lysyl hydroxylases in collagen synthesis. Deficiency → defective collagen → bleeding gums, perifollicular haemorrhage, poor wound healing, corkscrew hairs, scorbutic rosary.",
  },
  {
    id: 250,
    subject: "Biochemistry",
    stem: "The transport protein for iron in the blood is:",
    options: ["Ferritin", "Haemosiderin", "Transferrin", "Lactoferrin"],
    answer: 2,
    explanation:
      "Transferrin (apotransferrin bound to iron) is the plasma transport protein for iron. Transferrin saturation = serum iron / TIBC × 100. In iron deficiency: low serum iron, high TIBC, low transferrin saturation (<20%). Ferritin = storage form (intracellular).",
  },
  {
    id: 251,
    subject: "Biochemistry",
    stem: "Homocystinuria is caused by deficiency of:",
    options: ["Methionine adenosyltransferase", "Cystathionine beta-synthase", "Cystathionase", "MTHFR (methylenetetrahydrofolate reductase)"],
    answer: 1,
    explanation:
      "Cystathionine beta-synthase deficiency → homocysteine accumulates → homocystinuria. Features: Marfan-like habitus, ectopia lentis (downward, vs Marfan's upward), intellectual disability, thromboembolism, osteoporosis. Treat with high B6 diet (if B6-responsive) or low methionine diet.",
  },
  {
    id: 252,
    subject: "Biochemistry",
    stem: "The first urine test used to diagnose phenylketonuria (PKU) at birth is:",
    options: ["DNPH test", "Guthrie test (bacterial inhibition assay)", "Ferric chloride test", "Urinary amino acid chromatography"],
    answer: 1,
    explanation:
      "Guthrie test (bacterial inhibition assay using Bacillus subtilis) was the original neonatal screening test for PKU on dried blood spot. Now replaced by tandem mass spectrometry (MS/MS) for newborn screening. Ferric chloride test on urine turns green in PKU.",
  },
  {
    id: 403,
    subject: "Medicine",
    stem: "A 45-year-old male presents with haemoptysis, haematuria, and rapidly progressive glomerulonephritis. Chest X-ray shows bilateral pulmonary infiltrates. Anti-GBM antibody is positive. What is the diagnosis?",
    options: ["Wegener's granulomatosis", "Goodpasture syndrome", "SLE nephritis", "Microscopic polyangiitis"],
    answer: 1,
    explanation:
      "Goodpasture syndrome = anti-GBM (anti-glomerular basement membrane) antibodies → pulmonary haemorrhage + rapidly progressive GN (linear IgG deposits on immunofluorescence). Treatment: plasmapheresis + cyclophosphamide + steroids. c-ANCA = Wegener's; p-ANCA = microscopic polyangiitis.",
  },
  {
    id: 404,
    subject: "Medicine",
    stem: "The most common cause of community-acquired pneumonia (CAP) in adults requiring hospitalisation is:",
    options: ["Klebsiella pneumoniae", "Mycoplasma pneumoniae", "Streptococcus pneumoniae", "Legionella pneumophila"],
    answer: 2,
    explanation:
      "Streptococcus pneumoniae is the most common cause of CAP in all age groups and severity categories. Presents with lobar consolidation, rusty sputum, pleuritic chest pain. Klebsiella causes CAP in alcoholics (upper lobe, currant jelly sputum). Mycoplasma = atypical pneumonia (younger, walking pneumonia).",
  },
  {
    id: 405,
    subject: "Medicine",
    stem: "Which ECG finding is characteristic of hyperkalaemia?",
    options: ["Prolonged QT interval", "ST depression with U waves", "Peaked (tall, tented) T waves", "Delta waves"],
    answer: 2,
    explanation:
      "Hyperkalaemia ECG progression: peaked T waves → widened QRS → loss of P wave → sine wave pattern → VF. Hypokalaemia: ST depression + prominent U waves + prolonged QU. Delta waves = Wolff-Parkinson-White (WPW) syndrome. Prolonged QT = hypocalcaemia/drugs.",
  },
  {
    id: 406,
    subject: "Medicine",
    stem: "A patient with diabetes presents with BP 155/90 mmHg and proteinuria. The drug of choice to prevent nephropathy progression is:",
    options: ["Amlodipine", "Metoprolol", "ACE inhibitor (e.g., ramipril)", "Thiazide diuretic"],
    answer: 2,
    explanation:
      "ACE inhibitors (or ARBs) are first-line for diabetic nephropathy — they reduce intraglomerular pressure by dilating the efferent arteriole, independently of their antihypertensive effect. They slow progression of proteinuria and CKD in both type 1 and type 2 diabetes. Avoid combining ACE inhibitor + ARB (dual blockade harmful).",
  },
  {
    id: 407,
    subject: "Medicine",
    stem: "The classic triad of Wernicke's encephalopathy is:",
    options: ["Confusion + ataxia + ophthalmoplegia", "Tremor + rigidity + bradykinesia", "Headache + vomiting + papilloedema", "Fever + neck stiffness + photophobia"],
    answer: 0,
    explanation:
      "Wernicke's encephalopathy (thiamine/B1 deficiency) = confusion + ataxia + ophthalmoplegia (nystagmus, lateral rectus palsy). Seen in alcoholics, hyperemesis gravidarum. Treat immediately with IV thiamine (before glucose). Korsakoff psychosis = anterograde amnesia + confabulation (irreversible if untreated).",
  },
  {
    id: 408,
    subject: "Medicine",
    stem: "In a patient with suspected pulmonary embolism, the single most useful initial investigation is:",
    options: ["D-dimer", "CT pulmonary angiography (CTPA)", "V/Q scan", "Echocardiography"],
    answer: 1,
    explanation:
      "CTPA is the investigation of choice for suspected PE — it directly visualises thrombus in pulmonary arteries and is widely available. D-dimer is useful only to rule OUT PE (when pre-test probability is low). V/Q scan is used when contrast is contraindicated. Echo shows right heart strain but is not diagnostic.",
  },
  {
    id: 409,
    subject: "Medicine",
    stem: "Which finding best distinguishes rheumatoid arthritis from osteoarthritis on hand examination?",
    options: ["Heberden's nodes at DIP joints", "Bouchard's nodes at PIP joints", "Swan-neck and boutonniere deformities", "Squaring of the first CMC joint"],
    answer: 2,
    explanation:
      "Swan-neck (PIP hyperextension + DIP flexion) and boutonniere (PIP flexion + DIP hyperextension) deformities are characteristic of rheumatoid arthritis. Heberden's nodes (DIP) = OA. Bouchard's nodes (PIP) can occur in OA. Squaring of first CMC = OA of thumb base.",
  },
  {
    id: 410,
    subject: "Medicine",
    stem: "A 30-year-old female presents with episodes of palpitations, sweating, headache, and hypertension. 24-hour urine shows elevated catecholamines and metanephrines. Diagnosis:",
    options: ["Primary hyperaldosteronism", "Phaeochromocytoma", "Carcinoid syndrome", "Hyperthyroidism"],
    answer: 1,
    explanation:
      "Phaeochromocytoma = catecholamine-secreting tumour (90% adrenal medulla, 10% extra-adrenal paraganglioma). Classic triad: paroxysmal hypertension + headache + sweating. Screen with 24-hr urine metanephrines/catecholamines or plasma metanephrines. Locate with MIBG scan or MRI. Rule of 10s: 10% bilateral, 10% malignant, 10% extra-adrenal.",
  },
  {
    id: 411,
    subject: "Medicine",
    stem: "What is the most common cause of secondary hypertension in young females?",
    options: ["Renal artery stenosis (fibromuscular dysplasia)", "Primary hyperaldosteronism", "Phaeochromocytoma", "Coarctation of aorta"],
    answer: 0,
    explanation:
      "Fibromuscular dysplasia causing renal artery stenosis is the most common cause of secondary hypertension in young women. It causes renovascular hypertension via renin-angiotensin activation. Diagnosed by CT/MR angiography. Treated with percutaneous renal angioplasty. Atherosclerotic renal artery stenosis is more common in older males.",
  },
  {
    id: 412,
    subject: "Medicine",
    stem: "In systemic lupus erythematosus (SLE), the most specific antibody is:",
    options: ["ANA (antinuclear antibody)", "Anti-dsDNA", "Anti-Ro (SSA)", "Anti-Smith (anti-Sm)"],
    answer: 3,
    explanation:
      "Anti-Smith (anti-Sm) is the most specific antibody for SLE (~99% specific), but less sensitive (~25-30%). Anti-dsDNA is also specific (95%) and correlates with disease activity and nephritis. ANA is most sensitive (~98%) but least specific. Anti-Ro is associated with neonatal lupus and Sjogren's.",
  },
  {
    id: 413,
    subject: "Medicine",
    stem: "A patient with chronic liver disease develops confusion, asterixis, and elevated ammonia. The single most important acute treatment is:",
    options: ["IV glucose", "Lactulose", "Rifaximin", "Neomycin enema"],
    answer: 1,
    explanation:
      "Lactulose is the first-line treatment for hepatic encephalopathy. It acidifies the colon (trapping ammonia as NH4+), promotes stool evacuation, and reduces ammonia production. Titrate dose to 2-3 soft stools/day. Rifaximin is used as adjunct or for prevention of recurrence. Avoid protein restriction (now outdated advice).",
  },
  {
    id: 414,
    subject: "Surgery",
    stem: "The most common site for a peptic ulcer that causes haemorrhage is:",
    options: ["Lesser curve of stomach", "Greater curve of stomach", "Posterior wall of duodenal cap", "Pyloric antrum"],
    answer: 2,
    explanation:
      "Posterior duodenal ulcers erode the gastroduodenal artery (GDA), causing massive haemorrhage. Anterior duodenal ulcers are more likely to perforate. The GDA runs posterior to the first part of the duodenum. In haemorrhage, endoscopic haemostasis is first-line; surgery if fails.",
  },
  {
    id: 415,
    subject: "Surgery",
    stem: "Which type of inguinal hernia passes through Hasselbach's triangle and is considered a direct hernia?",
    options: ["Passes through deep inguinal ring medial to inferior epigastric vessels", "Passes through deep inguinal ring lateral to inferior epigastric vessels", "Passes directly through Hasselbach's triangle medial to inferior epigastric vessels", "Passes through femoral canal"],
    answer: 2,
    explanation:
      "Direct inguinal hernia = protrudes through Hesselbach's triangle (bounded by: inferior epigastric vessels laterally, inguinal ligament inferiorly, rectus sheath medially). Does NOT pass through deep ring. Indirect hernia passes through deep inguinal ring lateral to inferior epigastric vessels. Direct hernias are more common in older men.",
  },
  {
    id: 416,
    subject: "Surgery",
    stem: "The investigation of choice for acute appendicitis when diagnosis is uncertain is:",
    options: ["Plain abdominal X-ray", "Barium enema", "CT scan of abdomen/pelvis", "MRI abdomen"],
    answer: 2,
    explanation:
      "CT abdomen/pelvis with contrast is the investigation of choice for suspected acute appendicitis when diagnosis is clinically uncertain (sensitivity ~94%, specificity ~95%). Ultrasound is preferred in children and pregnant women (no radiation). The Alvarado score helps risk-stratify patients clinically.",
  },
  {
    id: 417,
    subject: "Surgery",
    stem: "Charcot's triad of ascending cholangitis consists of:",
    options: ["Jaundice + fever + right upper quadrant pain", "Fever + rigors + confusion", "Jaundice + abdominal pain + pale stools", "RUQ pain + Murphy's sign + fever"],
    answer: 0,
    explanation:
      "Charcot's triad = fever + jaundice + RUQ pain (ascending cholangitis). Reynolds' pentad = Charcot's triad + hypotension + mental confusion (severe septic cholangitis). Treatment: IV antibiotics + urgent ERCP for biliary decompression. Most common cause = choledocholithiasis.",
  },
  {
    id: 418,
    subject: "Surgery",
    stem: "The most common congenital anomaly of the biliary system is:",
    options: ["Caroli disease", "Choledochal cyst", "Biliary atresia", "Alagille syndrome"],
    answer: 1,
    explanation:
      "Choledochal cyst is the most common congenital biliary anomaly. Todani classification: Type I (most common) = fusiform dilatation of CBD. Classic triad: jaundice + pain + abdominal mass. Risk of cholangiocarcinoma if untreated. Treatment: surgical excision + Roux-en-Y hepaticojejunostomy.",
  },
  {
    id: 419,
    subject: "Pharmacology",
    stem: "The mechanism of action of metformin is:",
    options: ["Stimulates insulin secretion from beta cells", "Activates AMPK → inhibits hepatic gluconeogenesis", "Inhibits alpha-glucosidase in gut", "Increases insulin sensitivity via PPAR-gamma"],
    answer: 1,
    explanation:
      "Metformin activates AMP-activated protein kinase (AMPK) → primarily inhibits hepatic gluconeogenesis. Also improves peripheral insulin sensitivity. Does NOT cause hypoglycaemia or weight gain. Contraindicated in eGFR <30 mL/min (lactic acidosis risk). Drug of first choice in T2DM, especially in obese patients.",
  },
  {
    id: 420,
    subject: "Pharmacology",
    stem: "Which drug is the antidote for paracetamol (acetaminophen) poisoning?",
    options: ["Flumazenil", "Naloxone", "N-acetylcysteine (NAC)", "Pralidoxime"],
    answer: 2,
    explanation:
      "N-acetylcysteine (NAC) is the antidote for paracetamol toxicity. It replenishes glutathione stores, detoxifying NAPQI (toxic metabolite from CYP2E1). Most effective within 8-10 hours of ingestion. Rumack-Matthew nomogram guides treatment. Flumazenil = benzodiazepine antidote; naloxone = opioid antidote; pralidoxime = organophosphate antidote.",
  },
  {
    id: 421,
    subject: "Pharmacology",
    stem: "The drug of choice for status epilepticus (first-line acute treatment) is:",
    options: ["Phenytoin IV", "Diazepam IV (or lorazepam)", "Phenobarbitone IV", "Sodium valproate IV"],
    answer: 1,
    explanation:
      "IV lorazepam (or IV diazepam if lorazepam unavailable) is first-line for status epilepticus. Benzodiazepines enhance GABA-A receptor activity. If seizures persist after 2 doses, second-line = IV phenytoin/fosphenytoin or IV valproate. Refractory status epilepticus → general anaesthesia (propofol/thiopentone).",
  },
  {
    id: 422,
    subject: "Pharmacology",
    stem: "Which antiepileptic drug is the drug of choice for absence seizures?",
    options: ["Carbamazepine", "Phenytoin", "Ethosuximide", "Lamotrigine"],
    answer: 2,
    explanation:
      "Ethosuximide is DOC for absence (petit mal) seizures in children without generalised tonic-clonic seizures. It blocks T-type calcium channels in thalamic neurons. Sodium valproate is DOC when absence occurs with GTCS. Carbamazepine can worsen absence seizures.",
  },
  {
    id: 423,
    subject: "Pharmacology",
    stem: "A patient on warfarin develops a supratherapeutic INR of 8.5 with active major bleeding. What is the immediate management?",
    options: ["Withhold warfarin + vitamin K oral", "IV vitamin K + fresh frozen plasma (FFP) or 4-factor PCC", "Withhold warfarin + observe", "IV protamine sulphate"],
    answer: 1,
    explanation:
      "Major bleeding with supratherapeutic INR: IV vitamin K (5-10 mg) + 4-factor PCC (prothrombin complex concentrate) for immediate reversal. FFP if PCC unavailable. PCC works faster than FFP. Protamine sulphate reverses heparin (not warfarin). For minor bleeding/no bleeding: withhold warfarin ± oral vitamin K.",
  },
  {
    id: 424,
    subject: "Pharmacology",
    stem: "Which class of antibiotics inhibits bacterial cell wall synthesis by binding to PBPs (penicillin-binding proteins)?",
    options: ["Aminoglycosides", "Fluoroquinolones", "Beta-lactams (penicillins, cephalosporins)", "Macrolides"],
    answer: 2,
    explanation:
      "Beta-lactam antibiotics (penicillins, cephalosporins, carbapenems, monobactams) inhibit bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs = transpeptidases), blocking cross-linking of peptidoglycan. Aminoglycosides inhibit 30S ribosome. Fluoroquinolones inhibit DNA gyrase/topoisomerase IV. Macrolides inhibit 50S ribosome.",
  },
  {
    id: 425,
    subject: "Pharmacology",
    stem: "The drug of choice for Helicobacter pylori eradication in peptic ulcer disease (standard triple therapy) is:",
    options: ["Amoxicillin + metronidazole + ranitidine", "PPI + amoxicillin + clarithromycin", "PPI + tetracycline + bismuth", "PPI + metronidazole alone"],
    answer: 1,
    explanation:
      "Standard triple therapy for H. pylori eradication: PPI + amoxicillin + clarithromycin for 14 days. Eradication confirmed by urea breath test (4 weeks after completing antibiotics). Bismuth quadruple therapy used in clarithromycin resistance areas. Test and treat strategy for peptic ulcer disease.",
  },
  {
    id: 426,
    subject: "Pharmacology",
    stem: "Heparin-induced thrombocytopaenia (HIT) type II is treated with:",
    options: ["Increase heparin dose", "Switch to low molecular weight heparin (LMWH)", "Stop heparin + use argatroban or fondaparinux", "Platelet transfusion"],
    answer: 2,
    explanation:
      "HIT type II: immune-mediated (IgG antibodies against PF4-heparin complex) → paradoxical thrombosis + thrombocytopaenia. Management: STOP all heparin immediately (including LMWH) + start non-heparin anticoagulant (argatroban or bivalirudin — direct thrombin inhibitors; or fondaparinux). Platelet transfusion contraindicated (worsens thrombosis).",
  },
  {
    id: 427,
    subject: "Pathology",
    stem: "The hallmark microscopic finding in Hodgkin's lymphoma is:",
    options: ["Starry sky pattern", "Reed-Sternberg cells", "Dutcher bodies", "Pautrier microabscesses"],
    answer: 1,
    explanation:
      "Reed-Sternberg cells (large binucleated cells with prominent 'owl-eye' nucleoli) are the hallmark of Hodgkin's lymphoma. Background inflammatory cells (lymphocytes, eosinophils, plasma cells). Starry sky = Burkitt's lymphoma. Dutcher bodies = intranuclear Ig inclusions in lymphoplasmacytic lymphoma. Pautrier microabscesses = mycosis fungoides (cutaneous T-cell lymphoma).",
  },
  {
    id: 428,
    subject: "Pathology",
    stem: "Which oncogene is most commonly amplified in breast cancer?",
    options: ["BCR-ABL", "HER2/neu (ERBB2)", "RAS", "MYC"],
    answer: 1,
    explanation:
      "HER2/neu (ERBB2) is amplified in ~20-25% of breast cancers and confers poor prognosis. Testing by IHC (3+) confirmed by FISH. Targeted therapy: trastuzumab (Herceptin) + pertuzumab. BCR-ABL = CML (t[9;22]). RAS mutations common in colorectal/pancreatic cancer. MYC amplification in Burkitt's lymphoma.",
  },
  {
    id: 429,
    subject: "Pathology",
    stem: "Virchow's triad for thrombus formation includes all EXCEPT:",
    options: ["Endothelial injury", "Stasis of blood flow", "Hypercoagulability", "Increased fibrinolysis"],
    answer: 3,
    explanation:
      "Virchow's triad: (1) Endothelial injury, (2) Abnormal blood flow (stasis or turbulence), (3) Hypercoagulability. Increased fibrinolysis opposes thrombosis — it is not part of the triad. Thrombosis risk factors map to these three components (e.g., immobility → stasis; smoking → endothelial damage; Factor V Leiden → hypercoagulability).",
  },
  {
    id: 430,
    subject: "Pathology",
    stem: "Which type of necrosis is characterised by ghost cell outlines with preservation of tissue architecture, seen in myocardial infarction?",
    options: ["Liquefactive necrosis", "Coagulative necrosis", "Caseous necrosis", "Fat necrosis"],
    answer: 1,
    explanation:
      "Coagulative necrosis: preserved cell outlines/tissue architecture (ghost cells), protein denaturation maintains structure. Seen in: myocardial infarction, renal infarction (except brain). Liquefactive necrosis = brain infarcts, abscess (enzymatic digestion). Caseous necrosis = TB (cheese-like, structureless). Fat necrosis = pancreatitis (saponification).",
  },
  {
    id: 431,
    subject: "Pathology",
    stem: "The p53 tumour suppressor gene mutation is most commonly associated with which syndrome?",
    options: ["BRCA1 mutation syndrome", "Li-Fraumeni syndrome", "FAP (familial adenomatous polyposis)", "MEN type 1"],
    answer: 1,
    explanation:
      "Li-Fraumeni syndrome = germline TP53 mutation → multiple malignancies at young age: sarcomas, breast cancer, brain tumours, leukaemia, adrenocortical carcinoma. TP53 is the most commonly mutated gene in human cancers overall ('guardian of the genome'). Loss allows DNA-damaged cells to bypass apoptosis and proliferate.",
  },
  {
    id: 432,
    subject: "OBG",
    stem: "A 28-year-old primigravida at 36 weeks presents with BP 160/105, headache, and 3+ proteinuria. She has a seizure. Diagnosis and immediate management:",
    options: ["Gestational hypertension — IV labetalol", "Eclampsia — IV magnesium sulphate + antihypertensives", "Severe pre-eclampsia — oral nifedipine only", "HELLP syndrome — platelet transfusion"],
    answer: 1,
    explanation:
      "Eclampsia = seizure in setting of pre-eclampsia. Management: (1) IV magnesium sulphate (loading dose 4g over 20 min, maintenance 1g/hr) — prevents further seizures; (2) Antihypertensives (IV labetalol or hydralazine) if BP ≥160/110; (3) Definitive treatment = delivery. MgSO4 mechanism: NMDA receptor antagonism, vasodilation.",
  },
  {
    id: 433,
    subject: "OBG",
    stem: "The most common cause of postpartum haemorrhage (PPH) is:",
    options: ["Retained placenta", "Uterine atony", "Genital tract lacerations", "Coagulopathy"],
    answer: 1,
    explanation:
      "Uterine atony (failure of uterus to contract) accounts for ~80% of PPH cases (4 Ts: Tone, Trauma, Tissue, Thrombin). Management: uterine massage + oxytocin IV + ergometrine + carboprost. PPH = blood loss >500 mL after vaginal delivery or >1000 mL after caesarean. Early recognition and the HAEMOSTASIS protocol guide management.",
  },
  {
    id: 434,
    subject: "OBG",
    stem: "A 32-week pregnant woman presents with painless, bright red vaginal bleeding. The fetus is well. What is the most likely diagnosis?",
    options: ["Placental abruption", "Placenta praevia", "Vasa praevia", "Show (bloody mucus plug)"],
    answer: 1,
    explanation:
      "Placenta praevia: painless, bright red, recurrent antepartum haemorrhage. Placental abruption: painful, dark blood, tender uterus, maternal shock. Vasa praevia: haemorrhage when membranes rupture (fetal blood). Confirm placenta praevia with transabdominal/transvaginal ultrasound. DO NOT perform digital vaginal examination.",
  },
  {
    id: 435,
    subject: "OBG",
    stem: "The drug of choice for medical management of ectopic pregnancy (unruptured, haemodynamically stable) is:",
    options: ["Mifepristone", "Methotrexate", "Misoprostol", "Danazol"],
    answer: 1,
    explanation:
      "Methotrexate (MTX) IM is the drug of choice for medical management of unruptured ectopic pregnancy (criteria: haemodynamically stable, no fetal cardiac activity, serum hCG <5000 IU/L, mass <3.5 cm). It inhibits dihydrofolate reductase → prevents trophoblast cell division. Monitor hCG until negative.",
  },
  {
    id: 436,
    subject: "OBG",
    stem: "Which investigation is the gold standard for diagnosing polycystic ovary syndrome (PCOS)?",
    options: ["Serum LH:FSH ratio >2:1", "Ultrasound showing ≥12 follicles per ovary or ovarian volume >10 mL", "Elevated serum testosterone", "Elevated serum AMH"],
    answer: 1,
    explanation:
      "Rotterdam criteria (2003) for PCOS diagnosis (2 of 3): (1) oligo/anovulation, (2) clinical/biochemical hyperandrogenism, (3) polycystic ovaries on ultrasound (≥12 follicles 2-9mm per ovary OR volume >10 mL). LH:FSH ratio is classic but not diagnostic criteria. AMH is elevated but not a diagnostic criterion.",
  },
  {
    id: 437,
    subject: "Paediatrics",
    stem: "A 3-year-old presents with sudden onset stridor, drooling, and tripod position (leaning forward). Which organism is most likely responsible?",
    options: ["Parainfluenza virus type 1", "Haemophilus influenzae type b", "Respiratory syncytial virus", "Staphylococcus aureus"],
    answer: 1,
    explanation:
      "Epiglottitis (now rare due to Hib vaccine) = H. influenzae type b → sudden high fever, stridor, drooling, dysphagia, tripod position. DO NOT examine throat (may precipitate complete obstruction). Secure airway in controlled setting (theatre). Thumb sign on lateral neck X-ray. Croup (parainfluenza): barking cough, steeple sign on X-ray.",
  },
  {
    id: 438,
    subject: "Paediatrics",
    stem: "The most common cause of nephrotic syndrome in children aged 2-8 years is:",
    options: ["Focal segmental glomerulosclerosis (FSGS)", "Membranous nephropathy", "Minimal change disease (MCD)", "IgA nephropathy"],
    answer: 2,
    explanation:
      "Minimal change disease (MCD) = most common cause of nephrotic syndrome in children (80-90% of cases aged 2-8). Electron microscopy: foot process effacement (no deposits by LM or IF). Responds to prednisolone in >90% (steroid-sensitive). Also called lipoid nephrosis. FSGS is most common in adults/adolescents with steroid-resistant NS.",
  },
  {
    id: 439,
    subject: "Paediatrics",
    stem: "Which vaccine is given at birth in India's National Immunisation Schedule?",
    options: ["BCG + OPV0 + Hepatitis B", "BCG + DPT + OPV", "OPV + MMR + Hepatitis B", "BCG + IPV + Hepatitis B"],
    answer: 0,
    explanation:
      "At birth (India NIS): BCG (intradermal, right deltoid) + OPV-0 (oral) + Hepatitis B (birth dose, IM). BCG protects against miliary TB and TB meningitis. Hepatitis B birth dose within 24 hours prevents perinatal transmission. DPT starts at 6 weeks. IPV replaces OPV from 14 weeks in some states.",
  },
  {
    id: 440,
    subject: "Paediatrics",
    stem: "The normal birth weight of a full-term Indian newborn and the cut-off for low birth weight (LBW) is:",
    options: ["3500 g; LBW <2500 g", "3200 g; LBW <2000 g", "2900 g; LBW <2500 g", "3000 g; LBW <1500 g"],
    answer: 2,
    explanation:
      "Average birth weight of a full-term Indian newborn = ~2.9 kg (2900 g). WHO definition of LBW = birth weight <2500 g. VLBW = <1500 g; ELBW = <1000 g. LBW is a major cause of neonatal mortality in India. Causes: prematurity, IUGR, or both. India has high LBW rates (~28%).",
  },
  {
    id: 441,
    subject: "PSM",
    stem: "The reproductive number (R0) of measles is approximately:",
    options: ["1-2", "2-5", "12-18", "6-8"],
    answer: 2,
    explanation:
      "Measles has an R0 of 12-18 (among the highest of any infectious disease), meaning one case infects 12-18 susceptibles in a fully susceptible population. This requires herd immunity threshold of ~94% to prevent outbreaks. Compare: COVID-19 original strain R0 ~2-3; influenza ~1.5; smallpox ~5-7.",
  },
  {
    id: 442,
    subject: "PSM",
    stem: "The most sensitive indicator of recent safe water supply improvement in a community is:",
    options: ["Infant mortality rate", "Under-5 mortality rate", "Diarrhoeal disease incidence", "Maternal mortality ratio"],
    answer: 2,
    explanation:
      "Diarrhoeal disease incidence is the most sensitive and immediate indicator of water supply and sanitation improvements. Infant mortality rate (IMR) is the best overall indicator of community health/socioeconomic development. MMR reflects maternal health care. U5MR reflects child health broadly.",
  },
  {
    id: 443,
    subject: "PSM",
    stem: "In a clinical trial, the process of allocating participants such that neither the participant nor investigator knows group assignment is called:",
    options: ["Randomisation", "Blinding", "Double-blinding", "Stratification"],
    answer: 2,
    explanation:
      "Double-blinding: neither participant NOR investigator knows treatment allocation — minimises both performance bias and detection/assessment bias. Single-blind: only participant blinded. Open-label: no blinding. Randomisation prevents selection bias. Triple-blind: blinded data analyst too.",
  },
  {
    id: 444,
    subject: "PSM",
    stem: "Positive predictive value (PPV) of a test is MOST affected by:",
    options: ["Sensitivity of the test", "Specificity of the test", "Prevalence of the disease in the population", "Sample size"],
    answer: 2,
    explanation:
      "PPV = TP/(TP+FP). PPV is most influenced by disease prevalence: when prevalence is low, even a highly specific test yields many false positives (low PPV). High prevalence → high PPV. This is why screening tests should be applied to high-prevalence populations. NPV is similarly affected by prevalence (inversely).",
  },
  {
    id: 445,
    subject: "Microbiology",
    stem: "The organism causing gas gangrene (clostridial myonecrosis) produces which major toxin?",
    options: ["Tetanospasmin", "Alpha toxin (lecithinase/phospholipase C)", "Botulinum toxin", "Exfoliative toxin"],
    answer: 1,
    explanation:
      "Clostridium perfringens (type A) causes gas gangrene. Alpha toxin = lecithinase/phospholipase C — destroys cell membranes, causes haemolysis and tissue necrosis. Tetanospasmin = C. tetani (blocks GABA/glycine release → spastic paralysis). Botulinum toxin = C. botulinum (blocks ACh release → flaccid paralysis). Exfoliative toxin = S. aureus (scalded skin syndrome).",
  },
  {
    id: 446,
    subject: "Microbiology",
    stem: "The Weil-Felix test uses Proteus antigens to diagnose which group of infections?",
    options: ["Brucellosis", "Leptospirosis", "Rickettsial infections", "Typhoid fever"],
    answer: 2,
    explanation:
      "Weil-Felix test: agglutination of Proteus vulgaris (OX-2, OX-19, OX-K strains) due to cross-reacting antigens with Rickettsia species. OX-19 + OX-2 positive = epidemic typhus (R. prowazekii), scrub typhus (OX-K). Replaced by more specific IFA. Widal test = typhoid (Salmonella typhi O and H antigens).",
  },
  {
    id: 447,
    subject: "Microbiology",
    stem: "Which medium is used for culture of Mycobacterium tuberculosis?",
    options: ["Thayer-Martin medium", "Lowenstein-Jensen (LJ) medium", "MacConkey agar", "Tellurite agar"],
    answer: 1,
    explanation:
      "Lowenstein-Jensen (LJ) medium (egg-based, contains malachite green to inhibit contaminants) is the classical medium for M. tuberculosis culture. Growth takes 6-8 weeks. MGIT (Mycobacteria Growth Indicator Tube) is faster (1-2 weeks). Thayer-Martin = N. gonorrhoeae. MacConkey = Gram-negative lactose fermenters. Tellurite agar = C. diphtheriae.",
  },
  {
    id: 448,
    subject: "Forensic Medicine",
    stem: "The classic triad of non-accidental injury (shaken baby syndrome) is:",
    options: ["Subdural haematoma + retinal haemorrhage + absence of external injury", "Epidural haematoma + skull fracture + bruising", "Subdural haematoma + skull fracture + periorbital bruising", "Subarachnoid haemorrhage + retinal haemorrhage + fractures"],
    answer: 0,
    explanation:
      "Shaken baby syndrome (abusive head trauma) classic triad: subdural haematoma + retinal haemorrhages + absence of external injuries (no visible bruising, which is why it may be missed). Caused by violent shaking with acceleration-deceleration forces. Seen in infants <2 years. Now called abusive head trauma (AHT).",
  },
  {
    id: 449,
    subject: "Forensic Medicine",
    stem: "Rigor mortis begins within how many hours after death and is complete by:",
    options: ["1-2 hours; complete in 4-6 hours", "2-6 hours; complete in 12 hours", "30 min; complete in 2 hours", "8-12 hours; complete in 24 hours"],
    answer: 1,
    explanation:
      "Rigor mortis: starts 2-6 hours after death (face/jaw first), complete by ~12 hours, persists for 24-48 hours, then passes off (secondary relaxation). Caused by ATP depletion → actin-myosin cross-bridge cannot release. Depends on temperature (faster in heat, slower in cold) and muscular activity before death.",
  },
  {
    id: 450,
    subject: "Anatomy",
    stem: "The nerve injured in fracture of the surgical neck of humerus is:",
    options: ["Radial nerve", "Axillary nerve", "Musculocutaneous nerve", "Median nerve"],
    answer: 1,
    explanation:
      "Axillary nerve (C5, C6) winds around surgical neck of humerus and supplies deltoid (abduction 15-90°) and teres minor. Injury → loss of shoulder abduction + loss of sensation over 'regimental badge' area (lateral arm). Radial nerve is injured in fracture of midshaft of humerus (in radial groove).",
  },
  {
    id: 451,
    subject: "Anatomy",
    stem: "The rotator cuff of the shoulder is formed by all of the following EXCEPT:",
    options: ["Supraspinatus", "Infraspinatus", "Teres major", "Subscapularis"],
    answer: 2,
    explanation:
      "Rotator cuff = SITS muscles: Supraspinatus (abduction 0-15°), Infraspinatus (lateral rotation), Teres minor (lateral rotation), Subscapularis (medial rotation). Teres MAJOR is NOT part of the rotator cuff — it attaches to the medial lip of the bicipital groove and is supplied by lower subscapular nerve. Most common rotator cuff tear = supraspinatus.",
  },
  {
    id: 452,
    subject: "Physiology",
    stem: "The Frank-Starling law of the heart states that:",
    options: ["Heart rate increases with increased venous return", "Stroke volume increases with increased end-diastolic volume (preload)", "Contractility decreases with increased afterload", "Cardiac output is independent of preload"],
    answer: 1,
    explanation:
      "Frank-Starling law: increased preload (EDV/venous return) → increased sarcomere stretch → more optimal actin-myosin overlap → increased stroke volume (up to a point). This allows the heart to pump out whatever blood it receives. Failure of this mechanism = heart failure (flat Starling curve). Afterload = resistance the heart pumps against (arterial pressure).",
  },
  {
    id: 453,
    subject: "Medicine",
    stem: "A 60-year-old male smoker presents with weight loss, haemoptysis, and hypercalcaemia. Chest X-ray shows a hilar mass. The most likely lung cancer subtype is:",
    options: ["Small cell lung cancer", "Adenocarcinoma", "Squamous cell carcinoma", "Large cell carcinoma"],
    answer: 2,
    explanation:
      "Squamous cell carcinoma (SCC) of lung: central/hilar location, associated with smoking, produces PTHrP → hypercalcaemia. Cavitates commonly. Small cell: very central, ACTH (Cushing's), ADH (SIADH), Lambert-Eaton syndrome. Adenocarcinoma: peripheral, most common overall, EGFR mutations, associated with non-smokers. Pancoast tumour = SCC/adenocarcinoma at apex → Horner's syndrome.",
  },
  {
    id: 454,
    subject: "Medicine",
    stem: "The investigation of choice for diagnosis of aortic dissection is:",
    options: ["Chest X-ray (widened mediastinum)", "ECG", "CT angiography of aorta", "Transthoracic echocardiogram"],
    answer: 2,
    explanation:
      "CT angiography (CTA) of the aorta is the investigation of choice for aortic dissection — high sensitivity/specificity, widely available, rapid. Shows intimal flap and true/false lumen. Widened mediastinum on CXR is a clue but not diagnostic. TOE is highly sensitive but invasive. Stanford Type A (ascending) = surgical emergency; Type B (descending) = medical management.",
  },
  {
    id: 455,
    subject: "Medicine",
    stem: "In chronic obstructive pulmonary disease (COPD), the single most important intervention to slow disease progression is:",
    options: ["Long-acting bronchodilators (LABA)", "Inhaled corticosteroids", "Smoking cessation", "Pulmonary rehabilitation"],
    answer: 2,
    explanation:
      "Smoking cessation is the only intervention proven to slow the decline in FEV1 and reduce COPD progression. It reduces the annual rate of FEV1 decline from ~60 mL/yr in continuing smokers to ~30 mL/yr (similar to non-smokers). Long-term oxygen therapy (LTOT) improves survival in severe hypoxaemia (PaO2 <55 mmHg or <60 mmHg with cor pulmonale).",
  },
  {
    id: 456,
    subject: "Medicine",
    stem: "The triad of hereditary haemochromatosis includes:",
    options: ["Anaemia + splenomegaly + jaundice", "Cirrhosis + diabetes mellitus + skin bronzing ('bronze diabetes')", "Hepatitis + arthropathy + cardiomyopathy", "Ascites + encephalopathy + varices"],
    answer: 1,
    explanation:
      "Hereditary haemochromatosis (HFE gene mutation, C282Y): iron overload causing cirrhosis + diabetes (iron deposits in pancreas) + skin bronzing = 'bronze diabetes'. Also: cardiomyopathy, hypogonadism, arthropathy (2nd-3rd MCP joints). Serum ferritin and transferrin saturation (>45%) are screening tests. Treatment: regular venesection.",
  },
  {
    id: 457,
    subject: "Medicine",
    stem: "The most common neurological complication of diabetes mellitus is:",
    options: ["Mononeuropathy multiplex", "Symmetric distal sensorimotor polyneuropathy", "Autonomic neuropathy", "Cranial nerve palsy"],
    answer: 1,
    explanation:
      "Symmetric distal sensorimotor polyneuropathy is the most common diabetic neuropathy, presenting with 'glove and stocking' loss of sensation (pain/temperature first, then vibration/proprioception), burning, paraesthesias. Risk of Charcot's arthropathy, neuropathic ulcers. Treatment: tight glycaemic control; symptomatic: pregabalin, amitriptyline, duloxetine.",
  },
  {
    id: 458,
    subject: "Surgery",
    stem: "The most sensitive test for acute pancreatitis is:",
    options: ["Serum amylase", "Serum lipase", "Urinary amylase", "C-reactive protein (CRP)"],
    answer: 1,
    explanation:
      "Serum lipase is more sensitive AND specific than serum amylase for acute pancreatitis. Lipase remains elevated longer (7-10 days vs 3-5 days for amylase). Amylase can be elevated in other conditions (salivary gland disease, bowel obstruction). CRP >150 mg/L at 48 hours indicates severe pancreatitis. CT (Balthazar score) assesses severity.",
  },
  {
    id: 459,
    subject: "Surgery",
    stem: "The most common type of thyroid cancer (best prognosis, spreads via lymphatics) is:",
    options: ["Follicular carcinoma", "Medullary carcinoma", "Papillary carcinoma", "Anaplastic carcinoma"],
    answer: 2,
    explanation:
      "Papillary carcinoma = most common thyroid cancer (80%). Spreads via lymphatics (lymph node metastasis). Excellent prognosis (10-year survival >90%). Histology: Orphan Annie eye nuclei, psammoma bodies, nuclear grooves. Associated with RET/PTC rearrangements and BRAF mutation. Follicular = haematogenous spread (lung/bone). Medullary = calcitonin, MEN 2A/2B. Anaplastic = worst prognosis.",
  },
  {
    id: 460,
    subject: "Surgery",
    stem: "Burns involving >15% BSA in adults require IV fluid resuscitation. The Parkland formula uses:",
    options: ["Normal saline: 4 mL × kg × %BSA burnt", "Hartmann's/Ringer's lactate: 4 mL × kg × %BSA burnt", "Colloid: 2 mL × kg × %BSA burnt", "5% dextrose: 3 mL × kg × %BSA burnt"],
    answer: 1,
    explanation:
      "Parkland formula: 4 mL × weight (kg) × %BSA burned of Ringer's lactate/Hartmann's in first 24 hours. Give half in first 8 hours (from time of burn, not admission), remainder over next 16 hours. 'Rule of Nines' for BSA estimation. Colloid not given in first 24 hours. Target urine output 0.5-1 mL/kg/hr.",
  },
  {
    id: 461,
    subject: "Pharmacology",
    stem: "The drug of choice for treatment of Plasmodium vivax malaria in India is:",
    options: ["Artesunate + amodiaquine", "Chloroquine + primaquine", "Quinine + doxycycline", "Mefloquine"],
    answer: 1,
    explanation:
      "P. vivax: chloroquine (blood schizonticide, 3 days) + primaquine (radical cure, destroys liver hypnozoites, 14 days). Check G6PD status before primaquine (causes haemolysis in G6PD deficiency). P. falciparum: ACT (artemisinin combination therapy). P. vivax chloroquine resistance emerging in some regions → switch to ACT.",
  },
  {
    id: 462,
    subject: "Pharmacology",
    stem: "Which immunosuppressant inhibits calcineurin, thereby blocking IL-2 production and T-cell activation?",
    options: ["Azathioprine", "Mycophenolate mofetil", "Ciclosporin (cyclosporine)", "Sirolimus (rapamycin)"],
    answer: 2,
    explanation:
      "Cyclosporine and tacrolimus inhibit calcineurin → prevent dephosphorylation of NFAT → block IL-2 gene transcription → impair T-cell activation. Used in transplant immunosuppression, autoimmune disease. Nephrotoxicity is the major side effect (cyclosporine also causes hirsutism, gingival hyperplasia; tacrolimus → tremor, alopecia). Sirolimus inhibits mTOR.",
  },
  {
    id: 463,
    subject: "Pharmacology",
    stem: "The antidote for organophosphate poisoning is:",
    options: ["N-acetylcysteine", "Atropine + pralidoxime (2-PAM)", "Naloxone", "Flumazenil"],
    answer: 1,
    explanation:
      "Organophosphate poisoning (excess ACh due to AChE inhibition): SLUDGE (salivation, lacrimation, urination, defaecation, GI symptoms, emesis) + miosis + bronchospasm + bradycardia. Treatment: Atropine (blocks muscarinic effects — large doses needed) + Pralidoxime (regenerates AChE if given early, before 'ageing'). Diazepam for seizures.",
  },
  {
    id: 464,
    subject: "Pharmacology",
    stem: "Which drug is the treatment of choice for cryptococcal meningitis in HIV patients?",
    options: ["Fluconazole alone", "Amphotericin B + flucytosine (induction), then fluconazole (consolidation/maintenance)", "Itraconazole", "Voriconazole"],
    answer: 1,
    explanation:
      "Cryptococcal meningitis in HIV (CD4 <100): Induction (2 weeks): IV amphotericin B + flucytosine → Consolidation (8 weeks): fluconazole 400 mg/day → Maintenance: fluconazole 200 mg/day (until immune reconstitution). Therapeutic lumbar punctures to manage raised ICP. Fluconazole alone is inferior to combination for induction.",
  },
  {
    id: 465,
    subject: "Pathology",
    stem: "The Philadelphia chromosome [t(9;22)] is the characteristic translocation in:",
    options: ["Acute lymphoblastic leukaemia (ALL)", "Chronic myeloid leukaemia (CML)", "Burkitt's lymphoma", "Follicular lymphoma"],
    answer: 1,
    explanation:
      "CML: t(9;22) → BCR-ABL fusion gene → constitutively active tyrosine kinase → uncontrolled proliferation. Target of imatinib (Gleevec). Ph chromosome also found in 20-30% adult ALL (poor prognosis). Burkitt's: t(8;14) (MYC-IgH). Follicular lymphoma: t(14;18) (BCL-2 overexpression). CML: massive splenomegaly, basophilia, left shift.",
  },
  {
    id: 466,
    subject: "Pathology",
    stem: "Amyloid in Alzheimer's disease is composed of:",
    options: ["AA amyloid (serum amyloid A)", "AL amyloid (immunoglobulin light chains)", "Aβ amyloid (amyloid beta-peptide)", "ATTR (transthyretin amyloid)"],
    answer: 2,
    explanation:
      "Alzheimer's disease: Aβ (amyloid beta) peptide derived from amyloid precursor protein (APP) cleavage by β- and γ-secretases → neuritic (senile) plaques + neurofibrillary tangles (hyperphosphorylated tau). AL = myeloma/primary amyloidosis. AA = reactive/secondary amyloidosis (TB, RA, etc). ATTR = familial or senile cardiac amyloidosis.",
  },
  {
    id: 467,
    subject: "Pathology",
    stem: "The most common primary bone tumour in patients >40 years is:",
    options: ["Osteosarcoma", "Ewing's sarcoma", "Metastatic carcinoma", "Multiple myeloma"],
    answer: 3,
    explanation:
      "Multiple myeloma is the most common primary malignant bone tumour in adults >40 years. Presents with lytic bone lesions (punched-out, no sclerotic rim), hypercalcaemia, anaemia, renal failure, infections. Serum protein electrophoresis shows M-band. Bence Jones proteins in urine. Metastatic carcinoma is the most common malignant bone tumour overall (breast, prostate, lung, kidney, thyroid).",
  },
  {
    id: 468,
    subject: "OBG",
    stem: "The most common site of endometriosis is:",
    options: ["Rectovaginal septum", "Ovary", "Fallopian tube", "Bladder"],
    answer: 1,
    explanation:
      "Ovary is the most common site of endometriosis (forms endometrioma/'chocolate cyst' — dark brown fluid). Classic triad: dysmenorrhoea + dyspareunia + infertility. Diagnosis: laparoscopy (gold standard). Medical treatment: combined OCP, GnRH agonists, danazol, progestogens. Surgical: conservative (excision/ablation) or radical (hysterectomy + BSO).",
  },
  {
    id: 469,
    subject: "OBG",
    stem: "In obstetrics, the Bishop score is used to assess:",
    options: ["Fetal well-being in post-term pregnancy", "Cervical favourability for induction of labour", "Risk of pre-eclampsia", "Estimated fetal weight"],
    answer: 1,
    explanation:
      "Bishop score assesses cervical favourability for induction of labour. Parameters (scored 0-3 each): dilation + effacement + station + consistency + position of cervix. Total score ≤5 = unfavourable cervix (ripening needed with prostaglandins/balloon catheter). Score ≥8 = favourable, induction likely to succeed. Used to guide IOL decision.",
  },
  {
    id: 470,
    subject: "OBG",
    stem: "The drug of choice for gestational diabetes mellitus (GDM) that fails dietary management during pregnancy is:",
    options: ["Metformin", "Glibenclamide", "Insulin", "Acarbose"],
    answer: 2,
    explanation:
      "Insulin is the drug of choice for GDM not controlled by diet. It does not cross the placenta in significant amounts. Metformin is increasingly used (crosses placenta — long-term fetal safety data still accumulating) but insulin remains gold standard per most guidelines. Strict glycaemic targets: fasting <95, 1-hr postprandial <140, 2-hr <120 mg/dL.",
  },
  {
    id: 471,
    subject: "Paediatrics",
    stem: "Intussusception in children classically presents with:",
    options: ["Painless rectal bleeding", "Colicky abdominal pain + vomiting + 'red currant jelly' stools + sausage-shaped mass", "Projectile vomiting immediately after feeding", "Abdominal distension + absent bowel sounds"],
    answer: 1,
    explanation:
      "Intussusception: telescoping of bowel (usually ileocaecal) causing obstruction + mucosal ischaemia. Classic: colicky pain + 'red currant jelly' stools (blood + mucus) + vomiting + palpable sausage-shaped RUQ mass. Peak age 3 months-3 years. Ultrasound: 'target sign'. Treatment: pneumatic reduction (air enema); surgery if failed or perforation.",
  },
  {
    id: 472,
    subject: "Paediatrics",
    stem: "The most common cause of acute meningitis in neonates (0-3 months) is:",
    options: ["Neisseria meningitidis", "Streptococcus pneumoniae", "Group B Streptococcus (GBS) and E. coli", "Listeria monocytogenes"],
    answer: 2,
    explanation:
      "Neonatal meningitis: Group B Streptococcus (S. agalactiae) + E. coli (K1) + Listeria = the three major organisms. GBS = most common overall in neonates. In older infants/children: S. pneumoniae, N. meningitidis. In adolescents/young adults: N. meningitidis. Empirical treatment for neonates: ampicillin + gentamicin (or cefotaxime).",
  },
  {
    id: 473,
    subject: "PSM",
    stem: "The sample size of a study increases when:",
    options: ["Desired precision decreases (wider CI accepted)", "Effect size increases", "Significance level (α) increases", "Power (1-β) increases"],
    answer: 3,
    explanation:
      "Sample size increases with: greater power (1-β ↑), smaller significance level (α ↓, more stringent), smaller effect size (harder to detect), greater variability in outcome. Higher power requires more subjects to detect the same effect. Common conventions: α = 0.05, power = 80% (β = 0.20). Effect size and variance are outcome characteristics.",
  },
  {
    id: 474,
    subject: "PSM",
    stem: "The maternal mortality ratio (MMR) is defined as:",
    options: ["Maternal deaths per 1000 live births", "Maternal deaths per 100,000 live births", "Maternal deaths per 1000 women of reproductive age", "Maternal deaths per 100,000 total population"],
    answer: 1,
    explanation:
      "MMR = (Maternal deaths / Live births) × 100,000. A maternal death = death of woman during pregnancy or within 42 days of termination (from causes related to or aggravated by pregnancy, not accidental). India MMR ~97/100,000 live births (SRS 2018-20). SDG target: MMR <70/100,000 live births by 2030.",
  },
  {
    id: 475,
    subject: "Microbiology",
    stem: "Which bacteria produces a toxin that inhibits protein synthesis by ADP-ribosylation of EF-2 (elongation factor 2)?",
    options: ["Clostridium perfringens", "Staphylococcus aureus", "Corynebacterium diphtheriae", "Bordetella pertussis"],
    answer: 2,
    explanation:
      "Diphtheria toxin (Corynebacterium diphtheriae) = AB toxin: B subunit binds to cell surface, A subunit ADP-ribosylates EF-2 (EF-Tu equivalent) → inhibits protein synthesis → cell death. Pseudomonas aeruginosa exotoxin A has the same mechanism. Pertussis toxin: ADP-ribosylates Gi protein. Cholera toxin: ADP-ribosylates Gs protein (activates adenylyl cyclase).",
  },
  {
    id: 476,
    subject: "Forensic Medicine",
    stem: "The most reliable indicator of age in a living person for medicolegal purposes is:",
    options: ["Height and weight", "Dental examination", "Skeletal X-ray (bone age/ossification centres)", "Secondary sexual characteristics"],
    answer: 2,
    explanation:
      "Skeletal radiography (bone age) is the most reliable method for age estimation — epiphyseal fusion and ossification centre appearance/fusion have predictable timelines. For adults: clavicle medial end fuses last (22-25 years) — key for determining >18 years of age in medicolegal cases. Dental age also useful. Combination approach gives best accuracy.",
  },
  {
    id: 477,
    subject: "Anatomy",
    stem: "Which nerve is at risk during McBurney's incision (gridiron incision) for appendicectomy?",
    options: ["Femoral nerve", "Ilioinguinal nerve", "Iliohypogastric nerve", "Lateral cutaneous nerve of thigh"],
    answer: 2,
    explanation:
      "Iliohypogastric nerve (L1) runs between internal oblique and transversus abdominis, crossing the iliac crest — it can be damaged during McBurney's (gridiron) incision for appendicectomy. Damage causes loss of sensation over hypogastrium and weakness of lower abdominal wall. Ilioinguinal nerve can also be at risk during lower abdominal incisions.",
  },
  {
    id: 478,
    subject: "Anatomy",
    stem: "The portal triad (portal tract) in the liver contains:",
    options: ["Central vein + hepatic artery + bile ductule", "Portal vein branch + hepatic artery branch + bile ductule", "Portal vein + central vein + lymphatic", "Sinusoid + Kupffer cells + hepatocytes"],
    answer: 1,
    explanation:
      "Portal triad = branch of portal vein + branch of hepatic artery + bile ductule (+ lymphatics). Located at the corners of hepatic lobules. Blood flows from portal tracts → sinusoids → central vein → hepatic veins → IVC. Bile flows in opposite direction: hepatocytes → bile canaliculi → bile ductules → portal tract.",
  },
  {
    id: 479,
    subject: "Physiology",
    stem: "The bicarbonate buffer system maintains blood pH. The Henderson-Hasselbalch equation for blood is: pH = 6.1 + log([HCO3⁻]/[0.03 × PaCO2]). Normal pH is maintained when the ratio of [HCO3⁻] to dissolved CO2 is approximately:",
    options: ["10:1", "15:1", "20:1", "25:1"],
    answer: 2,
    explanation:
      "Normal blood: HCO3⁻ = 24 mEq/L, PaCO2 = 40 mmHg. Dissolved CO2 = 0.03 × 40 = 1.2 mEq/L. Ratio = 24/1.2 = 20:1. pH = 6.1 + log(20) = 6.1 + 1.3 = 7.4. Kidneys regulate HCO3⁻ (metabolic); lungs regulate PaCO2 (respiratory). Any process changing the 20:1 ratio shifts pH.",
  },
  {
    id: 480,
    subject: "Physiology",
    stem: "The diving reflex (triggered by cold water on the face) causes:",
    options: ["Tachycardia + vasodilation", "Bradycardia + peripheral vasoconstriction + blood redistribution to vital organs", "Tachycardia + vasoconstriction", "Apnoea + vasodilation"],
    answer: 1,
    explanation:
      "Diving reflex: cold water on face (especially around nose/forehead) → trigeminal nerve → bradycardia (vagal) + peripheral vasoconstriction + redistribution of blood to heart and brain. Allows mammals to survive prolonged underwater submersion. Stronger in trained athletes. Clinical use: terminating SVT (cold water facial immersion).",
  },
  {
    id: 481,
    subject: "Medicine",
    stem: "In iron deficiency anaemia, the sequence of laboratory changes from earliest to latest is:",
    options: ["Low serum ferritin → low serum iron → high TIBC → microcytic anaemia", "Microcytic anaemia → low serum iron → low ferritin → high TIBC", "High TIBC → microcytic anaemia → low serum iron → low ferritin", "Low serum iron → low ferritin → high TIBC → microcytic anaemia"],
    answer: 0,
    explanation:
      "Sequence of iron deficiency: (1) Iron stores depleted → low serum ferritin (earliest marker); (2) Transport iron decreases → low serum iron, high TIBC (transferrin rises as iron stores fall); (3) Haemoglobin synthesis impaired → microcytic hypochromic anaemia (latest). Serum ferritin is the single best test for iron stores.",
  },
  {
    id: 482,
    subject: "Medicine",
    stem: "The most common organism causing infective endocarditis on native valves in the community is:",
    options: ["Streptococcus viridans (alpha-haemolytic)", "Staphylococcus aureus", "Enterococcus faecalis", "HACEK organisms"],
    answer: 0,
    explanation:
      "Streptococcus viridans is the most common cause of native valve endocarditis in the community (subacute, after dental procedures). S. aureus is most common in IV drug users and prosthetic valve endocarditis (acute, rapid destruction). HACEK organisms are fastidious Gram-negatives. Enterococcus often from GU tract. Modified Duke criteria for diagnosis.",
  },
  {
    id: 483,
    subject: "Medicine",
    stem: "Conn's syndrome (primary hyperaldosteronism) presents with which triad?",
    options: ["Hypertension + hypokalaemia + metabolic alkalosis", "Hypertension + hyperkalaemia + metabolic acidosis", "Hypotension + hypokalaemia + metabolic acidosis", "Hypertension + hyponatraemia + metabolic alkalosis"],
    answer: 0,
    explanation:
      "Conn's syndrome = autonomous aldosterone secretion (usually adrenal adenoma). Aldosterone → renal Na retention (hypertension) + K excretion (hypokalaemia) + H+ excretion (metabolic alkalosis). Screen with aldosterone/renin ratio (elevated). Confirm with CT adrenal + adrenal vein sampling. Treatment: adrenalectomy (adenoma) or spironolactone (bilateral hyperplasia).",
  },
  {
    id: 484,
    subject: "Medicine",
    stem: "The classic presentation of myasthenia gravis (MG) is:",
    options: ["Proximal muscle weakness that worsens with rest", "Fatigable weakness that worsens with activity + ptosis + diplopia", "Ascending paralysis with absent reflexes", "Fasciculations + wasting + UMN signs"],
    answer: 1,
    explanation:
      "Myasthenia gravis = anti-AChR antibodies (85%) or anti-MuSK antibodies → impaired NMJ transmission. Classic: fatigable weakness (worsens with repetitive use, improves with rest) + ptosis + diplopia (usually presenting features). Diagnosis: anti-AChR antibody + repetitive nerve stimulation (decremental response) + edrophonium/ice pack test. Treatment: pyridostigmine, thymectomy, immunosuppression.",
  },
  {
    id: 485,
    subject: "Surgery",
    stem: "What is the most common cause of small bowel obstruction in adults in developed countries?",
    options: ["Hernia", "Adhesions (post-surgical)", "Neoplasm", "Crohn's disease"],
    answer: 1,
    explanation:
      "Adhesions from previous abdominal surgery = most common cause of small bowel obstruction (SBO) in adults in developed countries (~75%). In developing countries/children: hernia is more common. Features: colicky pain + vomiting + abdominal distension + constipation. Management: NGT decompression ± surgery. CT confirms diagnosis and detects closed loop obstruction.",
  },
  {
    id: 486,
    subject: "Surgery",
    stem: "The most common complication of thyroidectomy is:",
    options: ["Hypothyroidism", "Recurrent laryngeal nerve palsy", "Hypocalcaemia (hypoparathyroidism)", "Haemorrhage"],
    answer: 2,
    explanation:
      "Hypocalcaemia (due to inadvertent parathyroid removal or devascularisation) is the most common complication of total thyroidectomy. Presents with perioral tingling, Chvostek's sign, Trousseau's sign, tetany. Transient hypocalcaemia common; permanent in ~1-2%. Recurrent laryngeal nerve (RLN) palsy causes hoarseness — occurs in ~1-3%. Check vocal cords before/after thyroidectomy.",
  },
  {
    id: 487,
    subject: "Pharmacology",
    stem: "The mechanism of action of statins is:",
    options: ["Inhibit cholesterol absorption in small intestine", "Activate lipoprotein lipase", "Inhibit HMG-CoA reductase (rate-limiting step of cholesterol synthesis)", "Bind bile acids to reduce reabsorption"],
    answer: 2,
    explanation:
      "Statins inhibit HMG-CoA reductase → reduce hepatic cholesterol synthesis → upregulate LDL receptors → increase LDL clearance from plasma. Primarily lower LDL-C (20-55%). Also modest TG reduction, HDL increase. Side effects: myopathy/rhabdomyolysis (check CK), hepatotoxicity (rare), new-onset diabetes. Ezetimibe inhibits cholesterol absorption (NPC1L1). Bile acid sequestrants bind bile acids.",
  },
  {
    id: 488,
    subject: "Pharmacology",
    stem: "Which drug is the DOC for prevention of mother-to-child transmission (PMTCT) of HIV?",
    options: ["Zidovudine (AZT) alone", "Combination ART (cART) from 14 weeks", "Nevirapine single dose at delivery only", "Lopinavir/ritonavir"],
    answer: 1,
    explanation:
      "Current WHO recommendation: all HIV-positive pregnant women should receive combination ART (Option B+) — regardless of CD4 count, continued lifelong. Preferred regimen: tenofovir + lamivudine + efavirenz. Neonates receive zidovudine or nevirapine prophylaxis for 6 weeks. Goal: reduce vertical transmission rate from ~25-40% to <1-2%.",
  },
  {
    id: 489,
    subject: "Pathology",
    stem: "The tumour marker most useful for monitoring testicular germ cell tumours (non-seminomatous) is:",
    options: ["PSA (prostate-specific antigen)", "AFP (alpha-fetoprotein) + beta-hCG", "CEA (carcinoembryonic antigen)", "CA-125"],
    answer: 1,
    explanation:
      "Non-seminomatous GCTs (NSGCT): AFP + β-hCG are the key markers — AFP elevated in yolk sac tumours and embryonal carcinoma; β-hCG elevated in choriocarcinoma. Seminomas: β-hCG only (never AFP; AFP rise = non-seminomatous component). Markers used for staging, response to treatment, and surveillance. PSA = prostate cancer; CEA = colorectal/gastric; CA-125 = ovarian.",
  },
  {
    id: 490,
    subject: "OBG",
    stem: "The most common cause of secondary amenorrhoea (excluding pregnancy) is:",
    options: ["Premature ovarian failure", "Hypothyroidism", "Prolactinoma", "PCOS (polycystic ovary syndrome)"],
    answer: 3,
    explanation:
      "PCOS is the most common cause of secondary amenorrhoea/oligomenorrhoea in reproductive-age women, accounting for ~70-80% of anovulatory infertility. Prolactinoma is the most common pituitary cause (galactorrhoea + amenorrhoea = Chiari-Frommel if postpartum). After exclusion of pregnancy, the workup includes prolactin, TSH, FSH/LH, androgens, ultrasound.",
  },
  {
    id: 491,
    subject: "OBG",
    stem: "In shoulder dystocia during labour, the first manoeuvre to perform is:",
    options: ["Fundal pressure", "McRoberts manoeuvre + suprapubic pressure", "Zavanelli manoeuvre", "Emergency caesarean section"],
    answer: 1,
    explanation:
      "Shoulder dystocia management (HELPERR mnemonic): (H) Call for Help, (E) Evaluate for Episiotomy, (L) Legs — McRoberts manoeuvre (thigh hyperflexion onto abdomen) + suprapubic pressure FIRST. McRoberts + suprapubic pressure resolves ~90% of cases. Never apply fundal pressure (worsens impaction). Zavanelli = last resort (cephalic replacement → caesarean).",
  },
  {
    id: 492,
    subject: "Paediatrics",
    stem: "The most common presenting feature of Wilms' tumour (nephroblastoma) in children is:",
    options: ["Haematuria", "Hypertension", "Painless abdominal mass", "Weight loss"],
    answer: 2,
    explanation:
      "Wilms' tumour: most common malignant renal tumour in children (peak 3-4 years). Most common presentation = painless abdominal mass discovered by parent/doctor. Other features: haematuria (25%), hypertension, fever. Do NOT palpate excessively (risk of capsule rupture). Ultrasound/CT abdomen. Treatment: nephrectomy + adjuvant chemotherapy (vincristine + actinomycin D ± doxorubicin). 90% cure rate.",
  },
  {
    id: 493,
    subject: "PSM",
    stem: "National Health Mission (NHM) in India was launched in which year and covers which population groups?",
    options: ["2005; rural population only (NRHM)", "2013; rural and urban populations (NRHM + NUHM)", "2000; tribal populations only", "2010; BPL families only"],
    answer: 1,
    explanation:
      "NHM launched in 2013, subsuming NRHM (2005) and adding NUHM (National Urban Health Mission). Covers rural, tribal, and urban underserved populations. Key components: ASHA programme, Janani Suraksha Yojana (JSY), free drugs/diagnostics, health and wellness centres. ASHA = Accredited Social Health Activist (10th standard, community-selected female health worker).",
  },
  {
    id: 494,
    subject: "Microbiology",
    stem: "The causative organism of plague and the vector responsible for its transmission to humans is:",
    options: ["Yersinia pestis; Anopheles mosquito", "Yersinia pestis; rat flea (Xenopsylla cheopis)", "Francisella tularensis; tick", "Rickettsia prowazekii; body louse"],
    answer: 1,
    explanation:
      "Plague = Yersinia pestis, transmitted by rat flea (Xenopsylla cheopis — blocked flea regurgitates blood into bite wound). Forms: bubonic (inguinal bubo), septicaemic, pneumonic. Bubonic plague: 'herald' bubo. Pneumonic plague: person-to-person transmission. Diagnosis: Gram stain ('safety pin' bipolar staining), culture, PCR. Treatment: streptomycin or gentamicin.",
  },
  {
    id: 495,
    subject: "Anatomy",
    stem: "The femoral triangle boundaries are:",
    options: ["Inguinal ligament + adductor longus + sartorius", "Inguinal ligament + adductor magnus + iliopsoas", "Poupart's ligament + gracilis + rectus femoris", "Inguinal ligament + pectineus + semitendinosus"],
    answer: 0,
    explanation:
      "Femoral triangle: Superior = inguinal ligament; Medial = adductor longus; Lateral = sartorius. Floor = iliopsoas (lateral) + pectineus (medial). Contents (lateral to medial): Femoral Nerve, Artery, Vein (NAVY: Nerve Artery Vein) + deep inguinal lymph nodes + femoral canal. Femoral hernia enters femoral canal (medial to femoral vein).",
  },
  {
    id: 496,
    subject: "Physiology",
    stem: "The oxygen-haemoglobin dissociation curve shifts to the RIGHT (reduced O2 affinity) with:",
    options: ["Decreased temperature", "Decreased 2,3-DPG", "Increased PaCO2 (Bohr effect)", "Increased pH (alkalosis)", ],
    answer: 2,
    explanation:
      "Right shift of O2-Hb curve (reduced affinity, easier O2 unloading to tissues): increased PaCO2 (Bohr effect), increased H+ (decreased pH), increased temperature, increased 2,3-DPG, increased CO. Left shift (increased affinity, harder O2 release): decreased temp, decreased CO2, alkalosis, fetal Hb (HbF), carboxyhaemoglobin, methaemoglobin. Mnemonic: CADET face right (CO2, Acid, 2,3-DPG, Exercise, Temperature).",
  },
  {
    id: 497,
    subject: "Medicine",
    stem: "A 50-year-old presents with fatigue, weight gain, constipation, dry skin, and bradycardia. TSH is 45 mIU/L; free T4 is low. Management:",
    options: ["Levothyroxine (T4) replacement", "Liothyronine (T3) replacement", "Radioiodine therapy", "Anti-thyroid drugs (carbimazole)"],
    answer: 0,
    explanation:
      "Primary hypothyroidism: high TSH + low free T4. Treatment: levothyroxine (synthetic T4) — T3 is produced by peripheral deiodination. Start low dose (25-50 mcg/day) in elderly/cardiac patients, titrate. Monitor TSH 6-8 weeks after dose change. Target TSH = 0.5-2.5 mIU/L. Myxoedema coma (severe): IV T4 + T3 + hydrocortisone + supportive.",
  },
  {
    id: 498,
    subject: "Medicine",
    stem: "The most common cause of haemoptysis worldwide is:",
    options: ["Lung cancer", "Tuberculosis", "Pulmonary embolism", "Bronchiectasis"],
    answer: 1,
    explanation:
      "Tuberculosis is the most common cause of haemoptysis worldwide (and in India). Mechanisms: Rasmussen's aneurysm (erosion of pulmonary artery in cavity), bronchiectasis, Aspergilloma (fungus ball in old TB cavity — risk of massive haemoptysis). In developed countries: bronchiectasis, lung cancer, and bronchitis are more common causes.",
  },
  {
    id: 499,
    subject: "Medicine",
    stem: "A patient with end-stage renal disease has Hb 8 g/dL. The most likely cause of anaemia is:",
    options: ["Iron deficiency", "Vitamin B12 deficiency", "Reduced erythropoietin production", "Haemolysis"],
    answer: 2,
    explanation:
      "Anaemia of CKD: primarily due to reduced erythropoietin (EPO) production by peritubular cells. Also: reduced RBC survival, iron deficiency (dialysis blood loss), uraemic inhibition of erythropoiesis. Treatment: erythropoiesis-stimulating agents (darbepoetin, EPO) + IV iron. Target Hb 10-12 g/dL (not normalise — increases thrombotic risk).",
  },
  {
    id: 500,
    subject: "Surgery",
    stem: "The most common type of renal stone in India and worldwide is:",
    options: ["Uric acid stones", "Struvite (magnesium ammonium phosphate) stones", "Calcium oxalate stones", "Cystine stones"],
    answer: 2,
    explanation:
      "Calcium oxalate stones are the most common renal stones (80-85% of all renal calculi). Seen in hypercalciuria, hyperoxaluria, hypocitraturia. Radiopaque on plain X-ray. Risk factors: dehydration, high-oxalate diet (spinach, nuts), Crohn's disease. Uric acid stones: radiolucent, gout. Struvite: infection stones (Proteus — urease producer), staghorn calculus.",
  },
  {
    id: 501,
    subject: "ENT",
    stem: "The most common site for epistaxis (nosebleed) is:",
    options: ["Posterior nasal cavity (sphenopalatine artery)", "Little's area (Kiesselbach's plexus) on nasal septum", "Inferior turbinate", "Roof of nasal cavity"],
    answer: 1,
    explanation:
      "Little's area (Kiesselbach's plexus) on the anteroinferior nasal septum is the most common site of epistaxis (90%). It is an anastomosis of 4 arteries: anterior ethmoidal, sphenopalatine, greater palatine, and superior labial. Anterior epistaxis: direct pressure/silver nitrate cautery. Posterior epistaxis (sphenopalatine area): packing or embolisation.",
  },
  {
    id: 502,
    subject: "ENT",
    stem: "A child presents with recurrent otitis media with effusion ('glue ear'). The most appropriate management after 3 months of watchful waiting is:",
    options: ["Oral antibiotics", "Adenoidectomy + grommet insertion (ventilation tubes)", "Myringotomy alone", "High-dose IV steroids"],
    answer: 1,
    explanation:
      "Otitis media with effusion (OME/'glue ear'): fluid in middle ear without signs of acute infection. Management: watchful waiting 3 months → if persists (especially with bilateral hearing loss >25 dB): grommet insertion (ventilation tubes) ± adenoidectomy. Hearing aids are an alternative. Antibiotics and antihistamines not routinely recommended.",
  },
  {
    id: 503,
    subject: "Ophthalmology",
    stem: "A patient presents with painful red eye, photophobia, and a dendritic ulcer on fluorescein staining. Diagnosis and treatment:",
    options: ["Bacterial keratitis — topical fluoroquinolones", "Herpetic keratitis (HSV) — topical acyclovir", "Acanthamoeba keratitis — topical chlorhexidine", "Fungal keratitis — topical natamycin"],
    answer: 1,
    explanation:
      "Dendritic (branching) corneal ulcer with terminal bulbs on fluorescein staining is pathognomonic of HSV keratitis. Treatment: topical acyclovir 3% eye ointment 5×/day for 10 days. DO NOT give topical corticosteroids (worsen viral keratitis). Acanthamoeba: contact lens users, ring infiltrate, very painful. Bacterial: hypopyon. Fungal: feathery infiltrate, post-corneal trauma.",
  },
  {
    id: 504,
    subject: "Ophthalmology",
    stem: "The optic disc appearance in papilloedema (increased intracranial pressure) is:",
    options: ["Pale optic disc with cupping", "Swollen disc + blurred margins + absent venous pulsations", "Cherry red spot at macula", "Disc with increased cup:disc ratio"],
    answer: 1,
    explanation:
      "Papilloedema: bilateral optic disc swelling due to raised ICP. Features: disc swelling, blurred margins, absent venous pulsations, peripapillary haemorrhages. Visual acuity initially preserved. Enlarged blind spot on perimetry. Differentiate from papillitis (painful, unilateral, early VA loss) and pseudopapilloedema (drusen). Investigate with CT/MRI brain urgently.",
  },
  {
    id: 505,
    subject: "Psychiatry",
    stem: "The drug of first choice for bipolar disorder maintenance and acute mania is:",
    options: ["Haloperidol", "Lithium carbonate", "Diazepam", "Fluoxetine"],
    answer: 1,
    explanation:
      "Lithium is the gold standard mood stabiliser for bipolar disorder (prophylaxis + acute mania). Narrow therapeutic index (0.6-1.0 mEq/L maintenance; 0.8-1.2 for acute mania). Monitor: renal function (nephrogenic DI), thyroid function (hypothyroidism), ECG. Toxicity: coarse tremor, vomiting, diarrhoea, ataxia, seizures. Avoid NSAIDs/thiazides (increase lithium levels).",
  },
  {
    id: 506,
    subject: "Psychiatry",
    stem: "A patient experiences a fixed false belief that his neighbours are spying on him, which is not amenable to reason. This is called:",
    options: ["Illusion", "Hallucination", "Delusion", "Obsession"],
    answer: 2,
    explanation:
      "Delusion = fixed false belief, firmly held despite evidence to the contrary, inconsistent with cultural background. Persecutory delusions (paranoid) are the most common type in schizophrenia. Hallucination = perception without stimulus (e.g., hearing voices). Illusion = misinterpretation of a real stimulus. Obsession = intrusive, recurrent, ego-dystonic thought (patient recognises it as their own but can't control it).",
  },
  {
    id: 507,
    subject: "Psychiatry",
    stem: "The first-line treatment for obsessive-compulsive disorder (OCD) is:",
    options: ["Benzodiazepines", "SSRI (e.g., fluvoxamine) + cognitive behavioural therapy with ERP", "Lithium", "Haloperidol"],
    answer: 1,
    explanation:
      "OCD: First-line = SSRIs (fluvoxamine, fluoxetine, sertraline, paroxetine) + Cognitive Behavioural Therapy with Exposure and Response Prevention (ERP). Higher doses needed than for depression. 10-12 weeks trial before assessing response. Clomipramine (TCA) is also effective. Refractory: augment with antipsychotics. Benzodiazepines do not treat core OCD symptoms.",
  },
  {
    id: 508,
    subject: "Orthopaedics",
    stem: "Colles' fracture is a fracture of:",
    options: ["Distal radius with dorsal angulation/displacement", "Distal radius with volar (palmar) angulation", "Scaphoid bone", "Distal ulna"],
    answer: 0,
    explanation:
      "Colles' fracture: distal radius fracture within 2.5 cm of wrist joint, with dorsal angulation (dinner fork deformity), dorsal displacement, radial shortening, and supination. Mechanism: FOOSH (fall on outstretched hand) in elderly women (osteoporosis). Smith's fracture (reverse Colles'): volar angulation. Garden spade deformity. Scaphoid fracture: anatomical snuffbox tenderness.",
  },
  {
    id: 509,
    subject: "Orthopaedics",
    stem: "The most common complication of hip replacement surgery (total hip arthroplasty) requiring prophylaxis is:",
    options: ["Infection", "Dislocation", "Deep vein thrombosis (DVT)/pulmonary embolism", "Periprosthetic fracture"],
    answer: 2,
    explanation:
      "DVT/PE is the most common serious complication after hip/knee replacement. All patients require VTE prophylaxis: mechanical (compression stockings, pneumatic compression) + pharmacological (LMWH or rivaroxaban for 28-35 days post-hip replacement, 10-14 days post-knee). Dislocation most common in posterior approach; infection is least common but most devastating.",
  },
  {
    id: 510,
    subject: "Orthopaedics",
    stem: "A child aged 5 years presents with a painless limp and limited internal rotation of the hip. X-ray shows flattening and fragmentation of the femoral head. Diagnosis:",
    options: ["Developmental dysplasia of the hip (DDH)", "Septic arthritis", "Perthes' disease (Legg-Calvé-Perthes)", "Slipped capital femoral epiphysis (SCFE)"],
    answer: 2,
    explanation:
      "Perthes' disease = avascular necrosis of the femoral head epiphysis in children (peak 4-8 years, M:F = 4:1). Painless limp, limited abduction/internal rotation. X-ray: femoral head flattening, fragmentation, 'crescent sign'. MRI is most sensitive early. Treatment: activity restriction, bracing, or surgery depending on age and severity. SCFE occurs in obese adolescents (posterior slip).",
  },
  {
    id: 511,
    subject: "Radiology",
    stem: "The investigation of choice for diagnosing acute subarachnoid haemorrhage (SAH) within 6 hours of onset is:",
    options: ["MRI brain", "CT brain without contrast", "Lumbar puncture", "Cerebral angiography"],
    answer: 1,
    explanation:
      "CT brain without contrast is the investigation of choice for acute SAH — sensitivity ~98% within first 6 hours (hyperdense blood in subarachnoid space). After 6-12 hours, sensitivity drops; LP showing xanthochromia (12 hours–2 weeks) is then required. CT angiography identifies the aneurysm. Worst headache of life ('thunderclap') = SAH until proven otherwise.",
  },
  {
    id: 512,
    subject: "Radiology",
    stem: "The 'snowstorm appearance' on ultrasound is seen in:",
    options: ["Placenta praevia", "Hydatidiform mole (complete)", "Ectopic pregnancy", "Fetal hydrops"],
    answer: 1,
    explanation:
      "Complete hydatidiform mole (CHM): ultrasound shows 'snowstorm appearance' — multiple small echogenic foci filling the uterus, no fetal parts. β-hCG markedly elevated. 15-20% risk of gestational trophoblastic neoplasia (GTN). Treatment: suction evacuation + weekly β-hCG monitoring. Contraception for ≥12 months. Partial mole: fetal parts present, triploid karyotype.",
  },
  {
    id: 513,
    subject: "Medicine",
    stem: "The most common autoimmune cause of hyperthyroidism in young women is:",
    options: ["Toxic multinodular goitre", "Toxic adenoma", "Graves' disease", "Hashimoto's thyroiditis"],
    answer: 2,
    explanation:
      "Graves' disease (diffuse toxic goitre) = most common cause of hyperthyroidism (Hashimoto's = most common hypothyroidism). TSI (thyroid-stimulating immunoglobulin) against TSH receptor → autonomous thyroid stimulation. Unique features: ophthalmopathy (exophthalmos), pretibial myxoedema, thyroid acropachy. Treatment: antithyroid drugs (carbimazole/PTU), radioiodine, or surgery.",
  },
  {
    id: 514,
    subject: "Medicine",
    stem: "The 'step-ladder' fever pattern with relative bradycardia (Faget sign) and rose spots is characteristic of:",
    options: ["Malaria", "Typhoid fever", "Dengue fever", "Brucellosis"],
    answer: 1,
    explanation:
      "Typhoid fever (Salmonella typhi): step-ladder fever (increases each day for 4 days, then plateau) + relative bradycardia (pulse-temperature dissociation) + rose spots (faint salmon-coloured macules, trunk) + abdominal pain + constipation initially then diarrhoea. Widal test (O+H agglutinins). Blood culture positive first week. Chloramphenicol was DOC; now ciprofloxacin or ceftriaxone.",
  },
  {
    id: 515,
    subject: "Medicine",
    stem: "In a patient with ascites, a serum-ascites albumin gradient (SAAG) >1.1 g/dL indicates:",
    options: ["Malignant ascites", "Tuberculous ascites", "Portal hypertension", "Nephrotic syndrome"],
    answer: 2,
    explanation:
      "SAAG = serum albumin - ascites albumin. SAAG >1.1 g/dL = portal hypertension (high protein in serum due to congestion). Causes: cirrhosis, cardiac failure (Budd-Chiari), portal vein thrombosis. SAAG <1.1 g/dL = non-portal hypertension: malignancy, TB peritonitis, pancreatitis, nephrotic syndrome. SAAG has replaced exudate/transudate classification for ascites.",
  },
  {
    id: 516,
    subject: "Surgery",
    stem: "The most reliable clinical test for diagnosing acute appendicitis is:",
    options: ["Rovsing's sign", "McBurney's point tenderness", "Psoas sign", "Rebound tenderness at McBurney's point"],
    answer: 1,
    explanation:
      "McBurney's point tenderness (2/3 of the way from umbilicus to right ASIS) is the most reliable clinical sign of acute appendicitis. Rovsing's sign: RIF pain on LIF palpation. Psoas sign: pain on right hip extension (retrocaecal appendix). Alvarado score ≥7 = high probability. Perforation risk increases with delay. Laparoscopic appendicectomy is now standard.",
  },
  {
    id: 517,
    subject: "Pharmacology",
    stem: "Which beta-blocker is cardioselective (beta-1 selective) and therefore preferred in patients with asthma/COPD?",
    options: ["Propranolol", "Carvedilol", "Metoprolol", "Sotalol"],
    answer: 2,
    explanation:
      "Metoprolol and atenolol are cardioselective beta-1 blockers — they preferentially block cardiac beta-1 receptors with less effect on bronchial/vascular beta-2 receptors. Even so, cardioselectivity is relative and dose-dependent; use with caution in severe asthma/COPD. Propranolol = non-selective (blocks beta-1 + beta-2 → bronchospasm). Carvedilol = non-selective beta + alpha-1 blocker.",
  },
  {
    id: 518,
    subject: "Pharmacology",
    stem: "The drug of choice for treatment of acute gout attack is:",
    options: ["Allopurinol", "Colchicine or NSAIDs (e.g., indomethacin)", "Probenecid", "Febuxostat"],
    answer: 1,
    explanation:
      "Acute gout: colchicine (within 12-36 hours of attack onset) or NSAIDs (indomethacin) are first-line. Oral prednisolone if NSAIDs/colchicine contraindicated. Do NOT start allopurinol during acute attack (may prolong/worsen). Allopurinol (xanthine oxidase inhibitor) = urate-lowering therapy for PREVENTION — started 2-4 weeks after acute attack subsides. Febuxostat = alternative to allopurinol.",
  },
  {
    id: 519,
    subject: "Pharmacology",
    stem: "The mechanism by which aspirin produces its antiplatelet effect is:",
    options: ["Reversible inhibition of COX-1", "Irreversible inhibition of COX-1 → reduced thromboxane A2", "Inhibition of ADP receptor (P2Y12)", "Phosphodiesterase inhibition"],
    answer: 1,
    explanation:
      "Aspirin irreversibly acetylates COX-1 in platelets → blocks thromboxane A2 (TXA2) synthesis → impairs platelet aggregation for the lifetime of the platelet (7-10 days). Low-dose aspirin (75-150 mg) for antiplatelet effect. Clopidogrel/ticagrelor = P2Y12 (ADP receptor) antagonists. Dipyridamole = phosphodiesterase inhibitor. Aspirin also inhibits prostacyclin (PGI2) in endothelium but TXA2 suppression predominates at low doses.",
  },
  {
    id: 520,
    subject: "Pathology",
    stem: "The tumour associated with a translocation t(8;14) and characteristic 'starry sky' pattern on histology is:",
    options: ["Follicular lymphoma", "Hodgkin's lymphoma", "Burkitt's lymphoma", "Mantle cell lymphoma"],
    answer: 2,
    explanation:
      "Burkitt's lymphoma: t(8;14) → MYC proto-oncogene juxtaposed to IgH enhancer → constitutive MYC expression → rapid proliferation (Ki-67 ~100%). 'Starry sky' = macrophages (stars) ingesting apoptotic tumour cells (sky). EBV-associated (especially endemic African form). Jaw mass in African children. Highly chemosensitive (CODOX-M/IVAC). Most rapidly dividing human tumour.",
  },
  {
    id: 521,
    subject: "Pathology",
    stem: "Mallory-Denk bodies (Mallory's hyaline) in hepatocytes are characteristically seen in:",
    options: ["Viral hepatitis A", "Primary biliary cholangitis", "Alcoholic liver disease / NASH", "Wilson's disease"],
    answer: 2,
    explanation:
      "Mallory-Denk bodies = eosinophilic intracytoplasmic inclusions in hepatocytes (aggregated intermediate filaments, especially cytokeratins 8/18). Classic in alcoholic hepatitis and NASH (non-alcoholic steatohepatitis). Also seen (less characteristically) in PBC, Wilson's disease, PSC. Alcoholic hepatitis: Mallory bodies + ballooning degeneration + neutrophil infiltration + fat.",
  },
  {
    id: 522,
    subject: "OBG",
    stem: "The most common site of ectopic pregnancy is:",
    options: ["Ovary", "Cervix", "Fallopian tube (ampullary portion)", "Abdominal cavity"],
    answer: 2,
    explanation:
      "95-97% of ectopic pregnancies occur in the fallopian tube; ampulla is the most common site (55-70%). Risk factors: PID, previous ectopic, tubal surgery, IVF, IUD (risk of ectopic if pregnancy occurs with IUD in situ). Classic presentation: amenorrhoea + lower abdominal pain + vaginal bleeding. Ruptured ectopic = haemoperitoneum + haemodynamic instability → emergency surgery.",
  },
  {
    id: 523,
    subject: "OBG",
    stem: "The investigation of choice for assessing fetal well-being in a post-term pregnancy (>42 weeks) is:",
    options: ["Doppler velocimetry of umbilical artery", "Non-stress test (NST) + amniotic fluid index (AFI)", "Serum HPL (human placental lactogen)", "Biophysical profile (BPP)"],
    answer: 3,
    explanation:
      "Biophysical profile (BPP) = NST + 4 ultrasound parameters (fetal breathing movements, fetal movement, fetal tone, amniotic fluid volume). Score 8-10 = normal; ≤4 = deliver. Most comprehensive assessment. Modified BPP = NST + AFI (more practical). Post-term pregnancy: increased risk of meconium aspiration, oligohydramnios, placental insufficiency. Offer IOL at 41+0 weeks.",
  },
  {
    id: 524,
    subject: "Paediatrics",
    stem: "The most common cause of pneumonia in neonates is:",
    options: ["Streptococcus pneumoniae", "Group B Streptococcus (GBS)", "RSV (respiratory syncytial virus)", "Staphylococcus aureus"],
    answer: 1,
    explanation:
      "Group B Streptococcus (Streptococcus agalactiae) is the most common cause of neonatal pneumonia (early-onset: <7 days, vertical transmission during delivery). Also causes meningitis and septicaemia. Late-onset (>7 days): E. coli, Listeria, S. aureus. RSV is the most common cause of bronchiolitis in infants >2 months. Congenital pneumonia: TORCH organisms.",
  },
  {
    id: 525,
    subject: "Paediatrics",
    stem: "Physiological jaundice in neonates appears on day 2-3 of life and resolves by:",
    options: ["Day 5 in term babies", "Day 7-10 in term; day 14 in preterm", "Day 3", "Day 21 in all neonates"],
    answer: 1,
    explanation:
      "Physiological jaundice: appears day 2-3 (never day 1 — if day 1, always pathological), peaks day 3-5, resolves by day 7-10 in term neonates; may persist up to 14 days in preterm. Mechanism: high RBC breakdown, immature hepatic bilirubin conjugation, increased enterohepatic circulation. Serum bilirubin <12 mg/dL in term. Treatment: phototherapy if above threshold. Exchange transfusion if severe.",
  },
  {
    id: 526,
    subject: "PSM",
    stem: "Attributable risk (AR) or risk difference is defined as:",
    options: ["Risk in exposed / Risk in unexposed", "Risk in exposed − Risk in unexposed", "(Risk in exposed − Risk in unexposed) / Risk in unexposed × 100", "1 − (Risk in unexposed / Risk in exposed)"],
    answer: 1,
    explanation:
      "Attributable risk = Risk (incidence) in exposed − Risk (incidence) in unexposed. It measures the excess risk attributable to the exposure. Relative risk (RR) = Risk in exposed / Risk in unexposed. Population attributable risk = AR × prevalence of exposure in population. Odds ratio (OR) ≈ RR when disease is rare.",
  },
  {
    id: 527,
    subject: "PSM",
    stem: "The gold standard study design for evaluating efficacy of a new treatment is:",
    options: ["Cohort study", "Case-control study", "Randomised controlled trial (RCT)", "Cross-sectional survey"],
    answer: 2,
    explanation:
      "Randomised controlled trial (RCT) is the gold standard for evaluating therapeutic interventions. Random allocation minimises confounding, allowing causal inference. Systematic reviews + meta-analyses of RCTs provide highest level of evidence. Cohort studies best for incidence and aetiology. Case-control for rare diseases (retrospective). Cross-sectional for prevalence. Ecological studies: population-level data.",
  },
  {
    id: 528,
    subject: "Microbiology",
    stem: "The test used to detect latent tuberculosis infection (LTBI) that is not affected by BCG vaccination is:",
    options: ["Mantoux (tuberculin skin test)", "IGRA (interferon-gamma release assay)", "Sputum AFB smear", "Serum adenosine deaminase"],
    answer: 1,
    explanation:
      "IGRAs (e.g., QuantiFERON-TB Gold, T-SPOT.TB) detect IFN-γ release from T-cells stimulated by M. tuberculosis-specific antigens (ESAT-6, CFP-10) — NOT present in BCG or most NTM → not affected by BCG vaccination. Mantoux test (TST): false positive with BCG and NTM. IGRA is preferred for BCG-vaccinated individuals or those with prior Mantoux. Blood test, single visit.",
  },
  {
    id: 529,
    subject: "Microbiology",
    stem: "The causative organism of chancroid (soft sore/ulcus molle) is:",
    options: ["Treponema pallidum", "Haemophilus ducreyi", "Klebsiella granulomatis", "Chlamydia trachomatis (L1-L3)"],
    answer: 1,
    explanation:
      "Chancroid = Haemophilus ducreyi. Characteristics: painful, soft, ragged ulcer with undermined edges + painful inguinal lymphadenopathy (bubo). Gram stain: 'school of fish' pattern. Diagnosis: clinical; culture on special media. Treatment: azithromycin or ceftriaxone. Contrast with syphilis (Treponema pallidum — painless hard ulcer + painless lymphadenopathy). LGV = Chlamydia L1-L3.",
  },
  {
    id: 530,
    subject: "Anatomy",
    stem: "The circle of Willis is an arterial anastomosis at the base of the brain. Its components include all of the following EXCEPT:",
    options: ["Anterior communicating artery", "Posterior communicating artery", "Basilar artery", "Middle cerebral artery"],
    answer: 3,
    explanation:
      "Circle of Willis components: anterior communicating artery + both ACAs + both ICAs + both PComs + both PCAs. The middle cerebral artery (MCA) is NOT part of the circle — it branches from the ICA but runs laterally into the Sylvian fissure. Basilar artery is the precursor (gives both PCAs) but is technically part of the posterior circulation feeding the circle, not within it.",
  },
  {
    id: 531,
    subject: "Anatomy",
    stem: "The thoracic duct drains lymph from all of the following EXCEPT:",
    options: ["Left side of the head and neck", "Both lower limbs", "Right lung", "Gut (intestinal lacteals)"],
    answer: 2,
    explanation:
      "Thoracic duct drains: both lower limbs, abdomen, left thorax, left arm, left head/neck → into left subclavian/brachiocephalic vein. Right lymphatic duct drains: right head/neck, right arm, right thorax (including RIGHT LUNG) → right subclavian vein. So the right lung is NOT drained by the thoracic duct. Chyle in thoracic duct after meals due to intestinal lacteals.",
  },
  {
    id: 532,
    subject: "Physiology",
    stem: "Aldosterone is secreted from the zona glomerulosa of the adrenal cortex in response to:",
    options: ["High serum sodium", "Angiotensin II + hyperkalaemia + ACTH", "Low serum potassium", "ANP (atrial natriuretic peptide)"],
    answer: 1,
    explanation:
      "Aldosterone secretion is primarily stimulated by: (1) Angiotensin II (via RAAS activation in low BP/volume), (2) Hyperkalaemia (direct effect on zona glomerulosa), (3) ACTH (minor role). ANP and high Na suppress aldosterone. Aldosterone → Na retention + K excretion at collecting duct. Mineralocorticoid receptor also binds cortisol (blocked by 11β-HSD2 in kidney).",
  },
  {
    id: 533,
    subject: "Physiology",
    stem: "In the cardiac action potential of a ventricular myocyte, the plateau phase (phase 2) is maintained by:",
    options: ["Rapid Na+ influx", "K+ efflux only", "Balanced Ca2+ influx (L-type) and K+ efflux", "Cl− influx"],
    answer: 2,
    explanation:
      "Ventricular AP phases: Phase 0 = rapid Na+ influx (upstroke); Phase 1 = transient K+ efflux; Phase 2 = PLATEAU — slow Ca2+ influx (L-type channels, triggers excitation-contraction coupling) balanced by K+ efflux; Phase 3 = repolarisation (K+ efflux dominant); Phase 4 = resting potential (−90 mV, IK1 maintains). L-type Ca2+ channels blocked by verapamil/diltiazem.",
  },
  {
    id: 534,
    subject: "Medicine",
    stem: "In an immunocompromised patient (HIV, CD4 <50), the most common cause of CNS space-occupying lesion (SOL) in India is:",
    options: ["Primary CNS lymphoma", "Cryptococcal abscess", "Cerebral toxoplasmosis", "Progressive multifocal leucoencephalopathy (PML)"],
    answer: 2,
    explanation:
      "Cerebral toxoplasmosis (Toxoplasma gondii reactivation) is the most common cause of CNS SOL in HIV patients globally. CT/MRI: multiple ring-enhancing lesions in basal ganglia. Treatment trial: pyrimethamine + sulfadiazine + folinic acid (if serology positive and clinical picture fits). Primary CNS lymphoma: usually single ring-enhancing lesion, EBV-associated.",
  },
  {
    id: 535,
    subject: "Medicine",
    stem: "The most common cause of mitral stenosis in adults worldwide is:",
    options: ["Congenital", "Rheumatic fever", "Degenerative calcification", "Infective endocarditis"],
    answer: 1,
    explanation:
      "Rheumatic fever (Group A Streptococcal pharyngitis → cross-reactive antibodies) is the most common cause of mitral stenosis worldwide (and in India). Mitral valve is most commonly affected. Features: low-pitched mid-diastolic rumble at apex + opening snap (OS) + loud S1. Mitral valve area <1 cm² = severe. Treatment: balloon mitral valvotomy (BMV) for suitable morphology.",
  },
  {
    id: 536,
    subject: "Surgery",
    stem: "The most important prognostic factor in carcinoma of the breast is:",
    options: ["Tumour size", "Histological grade", "Axillary lymph node status", "Oestrogen receptor status"],
    answer: 2,
    explanation:
      "Axillary lymph node status is the single most important prognostic factor in breast cancer — presence and number of involved nodes determines staging and treatment. Other important prognostic factors: tumour size (T stage), histological grade, lymphovascular invasion, HER2 status, hormone receptor status. Sentinel lymph node biopsy has replaced axillary clearance for clinically node-negative patients.",
  },
  {
    id: 537,
    subject: "Surgery",
    stem: "The best investigation for staging carcinoma of the rectum is:",
    options: ["CT thorax/abdomen/pelvis", "MRI pelvis", "Transrectal ultrasound (TRUS)", "PET scan"],
    answer: 1,
    explanation:
      "MRI pelvis is the gold standard for local staging of rectal cancer (T and N staging) — it accurately defines the mesorectal fascia, relationship to CRM (circumferential resection margin), and sphincter involvement, guiding decision on neoadjuvant chemoradiotherapy. CT chest/abdomen/pelvis is used for distant metastasis staging. TRUS is useful for early rectal tumours (T1/T2).",
  },
  {
    id: 538,
    subject: "Pharmacology",
    stem: "The reversal agent for dabigatran (direct thrombin inhibitor) is:",
    options: ["Protamine sulphate", "Vitamin K", "Idarucizumab (Praxbind)", "Andexanet alfa"],
    answer: 2,
    explanation:
      "Idarucizumab (Praxbind) is the specific reversal agent for dabigatran (direct thrombin inhibitor). Andexanet alfa reverses Factor Xa inhibitors (rivaroxaban, apixaban). Protamine sulphate reverses heparin (UFH; partial reversal of LMWH). Vitamin K reverses warfarin. Knowing reversal agents is high-yield for NEET PG.",
  },
  {
    id: 539,
    subject: "Pathology",
    stem: "The hallmark of Type I hypersensitivity (anaphylaxis/atopy) is:",
    options: ["IgM + complement activation", "IgG + complement + cytotoxicity", "IgE bound to mast cells + basophils → crosslinking by antigen → mediator release", "T-cell mediated (delayed hypersensitivity)"],
    answer: 2,
    explanation:
      "Type I (immediate/anaphylactic): IgE bound to FcεRI on mast cells/basophils → antigen crosslinks IgE → degranulation → histamine, tryptase, leukotrienes, prostaglandins. Examples: anaphylaxis, urticaria, asthma, allergic rhinitis. Type II: IgG/IgM + complement (haemolytic anaemia, Goodpasture). Type III: immune complex (SLE, serum sickness). Type IV: T-cell (contact dermatitis, TB).",
  },
  {
    id: 540,
    subject: "OBG",
    stem: "A 55-year-old postmenopausal woman presents with postmenopausal bleeding. The most important investigation to exclude endometrial carcinoma is:",
    options: ["Pelvic ultrasound only", "Hysteroscopy + endometrial biopsy", "Cervical smear (Pap smear)", "Serum CA-125"],
    answer: 1,
    explanation:
      "Hysteroscopy + endometrial biopsy (or D&C) is the definitive investigation for postmenopausal bleeding — allows direct visualisation of the endometrium and histological diagnosis. Transvaginal ultrasound (TVS) is the first-line investigation: endometrial thickness >4-5 mm in a postmenopausal woman requires histological assessment. Pap smear detects cervical (not endometrial) cancer. CA-125 is for ovarian cancer monitoring.",
  },
  {
    id: 541,
    subject: "Paediatrics",
    stem: "The most common site of osteomyelitis in children is:",
    options: ["Epiphysis", "Metaphysis", "Diaphysis", "Periosteum"],
    answer: 1,
    explanation:
      "Metaphysis is the most common site of haematogenous osteomyelitis in children due to sluggish blood flow and lack of phagocytic cells in the venous sinusoids. Most common organism: Staphylococcus aureus (all ages). Neonates: GBS + S. aureus + Gram-negatives. Sickle cell disease: Salmonella spp. X-ray changes appear 10-14 days after onset; MRI is most sensitive early.",
  },
  {
    id: 542,
    subject: "PSM",
    stem: "The infant mortality rate (IMR) in India as per SRS 2020 is approximately:",
    options: ["15 per 1000 live births", "28 per 1000 live births", "42 per 1000 live births", "55 per 1000 live births"],
    answer: 1,
    explanation:
      "India's IMR as per SRS 2020 = 28 per 1000 live births (urban 18, rural 31). Major causes: neonatal conditions (birth asphyxia, sepsis, prematurity) account for ~50% of under-5 deaths. SDG target: IMR <12 by 2030. States with lowest IMR: Kerala (~6), Goa (~9). States with highest IMR: UP (~38), MP (~41).",
  },
  {
    id: 543,
    subject: "Microbiology",
    stem: "Which hepatitis virus is transmitted by the faeco-oral route and does NOT cause chronic infection?",
    options: ["Hepatitis B", "Hepatitis C", "Hepatitis E", "Hepatitis D"],
    answer: 2,
    explanation:
      "Hepatitis E: faeco-oral transmission (contaminated water), RNA virus (Hepevirus). Does NOT cause chronic infection (except in immunocompromised). However, causes high mortality (up to 25%) in pregnant women (especially 3rd trimester). No specific antiviral treatment. Hepatitis A also faeco-oral, no chronic infection. HBV, HCV, HDV = bloodborne, can cause chronic hepatitis.",
  },
  {
    id: 544,
    subject: "Anatomy",
    stem: "The vertebral level of the aortic hiatus (where the descending aorta passes through the diaphragm) is:",
    options: ["T8", "T10", "T12", "L1"],
    answer: 2,
    explanation:
      "Diaphragmatic openings: T8 = IVC (and right phrenic nerve); T10 = oesophagus + left and right vagus nerves; T12 = aorta + thoracic duct + azygos vein. Mnemonic: 'I 8 (ate) 10 eggs at 12' = IVC at T8, oEsophagus at T10, Aorta at T12. The aortic hiatus is technically behind the median arcuate ligament, not through the diaphragm muscle itself.",
  },
  {
    id: 545,
    subject: "Physiology",
    stem: "The normal anion gap (AG) in arterial blood gas analysis is:",
    options: ["4-8 mEq/L", "8-12 mEq/L", "14-18 mEq/L", "20-24 mEq/L"],
    answer: 1,
    explanation:
      "Anion gap = Na − (Cl + HCO3) = normally 8-12 mEq/L (unmeasured anions: albumin, phosphate, sulphate). Elevated AG metabolic acidosis (MUDPILES): Methanol, Uraemia, DKA, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates. Normal AG metabolic acidosis (HARDASS): Hyperalimentation, Addison's, RTA, Diarrhoea, Acetazolamide, Spironolactone, Saline infusion.",
  },
  {
    id: 546,
    subject: "Medicine",
    stem: "A patient with AIDS presents with progressive outer retinal necrosis and painless vision loss. The most likely causative organism is:",
    options: ["HSV-1", "Toxoplasma gondii", "Cytomegalovirus (CMV)", "Pneumocystis jirovecii"],
    answer: 2,
    explanation:
      "CMV retinitis: most common ocular opportunistic infection in AIDS (CD4 <50 cells/μL). Painless, progressive vision loss + 'pizza pie' appearance (haemorrhages + exudates along vessels). Treatment: IV/oral ganciclovir or valganciclovir; intravitreal ganciclovir implant. Toxoplasma: CNS SOL. HSV/VZV: acute retinal necrosis (ARN — painful, peripheral necrosis, normal CD4 possible).",
  },
  {
    id: 547,
    subject: "Surgery",
    stem: "The most common cause of lower GI bleeding (fresh blood per rectum) in adults in India is:",
    options: ["Colorectal carcinoma", "Haemorrhoids", "Diverticular disease", "Angiodysplasia"],
    answer: 1,
    explanation:
      "Haemorrhoids (piles) are the most common cause of fresh rectal bleeding in adults in India. Internal haemorrhoids (above dentate line): painless bright red bleeding (not mixed with stool — coats paper). External haemorrhoids (below dentate line): painful. In Western countries, diverticular disease is the most common cause of significant lower GI bleeding. Colorectal cancer: blood mixed with stool.",
  },
  {
    id: 548,
    subject: "Pharmacology",
    stem: "The most common side effect of ACE inhibitors that often necessitates discontinuation is:",
    options: ["Hyperkalaemia", "First-dose hypotension", "Dry persistent cough", "Angioedema"],
    answer: 2,
    explanation:
      "Dry, persistent, non-productive cough occurs in ~10-20% of patients on ACE inhibitors (due to accumulation of bradykinin and substance P in the respiratory tract). It is the most common side effect causing discontinuation. Switch to an ARB (sartans — do not cause cough). Hyperkalaemia and first-dose hypotension also occur. Angioedema is rare but life-threatening (also bradykinin-mediated).",
  },
  {
    id: 549,
    subject: "Pathology",
    stem: "The most common type of renal cell carcinoma (RCC) and its characteristic cytoplasm appearance is:",
    options: ["Chromophobe RCC — pale cytoplasm", "Clear cell RCC — clear cytoplasm due to glycogen and lipid", "Papillary RCC — papillary architecture", "Collecting duct carcinoma — tubular pattern"],
    answer: 1,
    explanation:
      "Clear cell RCC (ccRCC) = most common RCC (70-75%). Arises from proximal tubular cells. Clear cytoplasm due to abundant glycogen and lipid (dissolved in processing). VHL gene mutation (chromosome 3p). Classic triad (now rare at presentation): haematuria + flank pain + palpable mass. Paraneoplastic: polycythaemia (EPO), hypercalcaemia (PTHrP). Best prognosis: chromophobe. Worst: collecting duct.",
  },
  {
    id: 550,
    subject: "OBG",
    stem: "The drug of choice for treatment of Trichomonas vaginalis infection is:",
    options: ["Clindamycin", "Fluconazole", "Metronidazole", "Doxycycline"],
    answer: 2,
    explanation:
      "Trichomonas vaginalis (protozoan STI): frothy, yellow-green, offensive discharge + vaginal pruritus + 'strawberry cervix' (punctate haemorrhages). pH >4.5. Wet mount: motile trichomonads with flagella. Treatment: metronidazole 2g stat (or 400 mg BD × 5-7 days) — MUST treat partner simultaneously. Fluconazole = candidiasis. Clindamycin = bacterial vaginosis (alternative). Doxycycline = chlamydia.",
  },
  {
    id: 551,
    subject: "ENT",
    stem: "The most common benign tumour of the parotid gland is:",
    options: ["Warthin's tumour (adenolymphoma)", "Mucoepidermoid carcinoma", "Pleomorphic adenoma (benign mixed tumour)", "Oncocytoma"],
    answer: 2,
    explanation:
      "Pleomorphic adenoma = most common parotid tumour (70-80% of all salivary gland tumours). Benign, slow-growing, mobile. Risk of malignant transformation (carcinoma ex pleomorphic adenoma) if untreated long-term. Treatment: superficial parotidectomy (preserve facial nerve). Warthin's tumour: bilateral in 10%, smokers, middle-aged men. Mucoepidermoid carcinoma: most common malignant salivary gland tumour.",
  },
  {
    id: 552,
    subject: "Surgery",
    stem: "Which radiological sign is seen in tension pneumothorax on chest X-ray?",
    options: ["Opacification of hemithorax", "Tracheal deviation towards the affected side + mediastinal shift", "Tracheal deviation away from affected side + mediastinal shift + absent lung markings", "Pleural effusion shadow"],
    answer: 2,
    explanation:
      "Tension pneumothorax: air enters pleural space but cannot escape (one-way valve) → progressive pressure build-up → trachea and mediastinum deviate AWAY from affected side + absent lung markings on that side + hypotension + distended neck veins. This is a clinical diagnosis — do NOT wait for X-ray if haemodynamically compromised. Immediate needle decompression (2nd ICS, MCL), then chest drain.",
  },

  // ─── PHARMACOLOGY BATCH 3 (553–567) ──────────────────────────────────────
  {
    id: 553,
    subject: "Pharmacology",
    stem: "Which of the following is a selective COX-2 inhibitor used in India?",
    options: ["Ibuprofen", "Celecoxib", "Aspirin", "Naproxen"],
    answer: 1,
    explanation: "Celecoxib selectively inhibits COX-2, providing anti-inflammatory and analgesic effects with reduced GI side effects. COX-1 inhibitors like Aspirin, Ibuprofen, and Naproxen cause more GI ulceration. COX-2 inhibitors increase cardiovascular risk (prothrombotic).",
  },
  {
    id: 554,
    subject: "Pharmacology",
    stem: "Drug of choice for organophosphate poisoning is:",
    options: ["Neostigmine", "Pralidoxime + Atropine", "Physostigmine", "Diazepam"],
    answer: 1,
    explanation: "Organophosphate poisoning causes cholinergic crisis. Atropine reverses muscarinic effects (DUMBELS). Pralidoxime (2-PAM) reactivates acetylcholinesterase if given within 24–48 hours before 'ageing' occurs. Atropine must be given first and in large doses.",
  },
  {
    id: 555,
    subject: "Pharmacology",
    stem: "Which diuretic causes hypokalemia, hyponatremia, and metabolic alkalosis?",
    options: ["Spironolactone", "Amiloride", "Furosemide", "Acetazolamide"],
    answer: 2,
    explanation: "Furosemide (loop diuretic) blocks Na-K-2Cl cotransporter in thick ascending loop of Henle. Causes loss of Na⁺, K⁺, H⁺, Cl⁻ → hypokalemia, hyponatremia, metabolic alkalosis, hypomagnesemia. Spironolactone and Amiloride are K⁺-sparing diuretics.",
  },
  {
    id: 556,
    subject: "Pharmacology",
    stem: "Mechanism of action of fluoroquinolones is:",
    options: ["Inhibit cell wall synthesis", "Inhibit DNA gyrase and topoisomerase IV", "Inhibit protein synthesis at 30S ribosome", "Inhibit RNA polymerase"],
    answer: 1,
    explanation: "Fluoroquinolones (ciprofloxacin, levofloxacin) inhibit bacterial DNA gyrase (topoisomerase II) and topoisomerase IV, preventing DNA supercoiling and replication. They are bactericidal. Remember: Gyrase inhibition is primary in Gram-negatives; topoisomerase IV in Gram-positives.",
  },
  {
    id: 557,
    subject: "Pharmacology",
    stem: "Which antihypertensive is contraindicated in bilateral renal artery stenosis?",
    options: ["Amlodipine", "Atenolol", "Enalapril", "Hydrochlorothiazide"],
    answer: 2,
    explanation: "ACE inhibitors (Enalapril) dilate the efferent arteriole, reducing glomerular filtration pressure. In bilateral RAS, this causes acute renal failure. Angiotensin II is needed to maintain GFR via efferent vasoconstriction when renal perfusion is reduced. ARBs are similarly contraindicated.",
  },
  {
    id: 558,
    subject: "Pharmacology",
    stem: "Drug of choice for meningococcal meningitis is:",
    options: ["Ampicillin", "Crystalline penicillin G", "Cefotaxime", "Doxycycline"],
    answer: 1,
    explanation: "Neisseria meningitidis is sensitive to penicillin. Crystalline penicillin G IV is the drug of choice. Ceftriaxone/Cefotaxime is used if penicillin allergy or unknown organism. Chloramphenicol is an alternative in resource-limited settings.",
  },
  {
    id: 559,
    subject: "Pharmacology",
    stem: "Which of the following beta-blockers has intrinsic sympathomimetic activity (ISA)?",
    options: ["Propranolol", "Atenolol", "Pindolol", "Metoprolol"],
    answer: 2,
    explanation: "Pindolol has intrinsic sympathomimetic activity (partial agonist at beta receptors). It causes less bradycardia at rest. Others listed are pure antagonists. ISA-containing beta-blockers are less preferred in post-MI patients.",
  },
  {
    id: 560,
    subject: "Pharmacology",
    stem: "Drug of choice for Pneumocystis jirovecii pneumonia (PCP) prophylaxis and treatment is:",
    options: ["Pentamidine", "Co-trimoxazole (TMP-SMX)", "Clindamycin", "Atovaquone"],
    answer: 1,
    explanation: "Co-trimoxazole (Trimethoprim + Sulfamethoxazole) is DOC for both treatment and prophylaxis of PCP. It inhibits folate synthesis at two steps. Given when CD4 < 200 cells/μL. IV Pentamidine is an alternative for treatment in severe cases.",
  },
  {
    id: 561,
    subject: "Pharmacology",
    stem: "Which drug is used for reversal of neuromuscular blockade caused by non-depolarizing agents?",
    options: ["Succinylcholine", "Neostigmine + Glycopyrrolate", "Atropine alone", "Pancuronium"],
    answer: 1,
    explanation: "Neostigmine (anticholinesterase) reverses non-depolarizing neuromuscular blockade by increasing ACh at the NMJ. Glycopyrrolate (anticholinergic) is co-administered to prevent muscarinic side effects of Neostigmine (bradycardia, bronchospasm, increased secretions).",
  },
  {
    id: 562,
    subject: "Pharmacology",
    stem: "Warfarin acts by inhibiting which enzyme?",
    options: ["Thrombin", "Vitamin K epoxide reductase (VKOR)", "Factor Xa directly", "Plasminogen activator"],
    answer: 1,
    explanation: "Warfarin inhibits Vitamin K epoxide reductase (VKOR), preventing regeneration of active Vitamin K. This reduces synthesis of factors II, VII, IX, X and proteins C and S. Factor VII has the shortest half-life (6h) so PT/INR increases first.",
  },
  {
    id: 563,
    subject: "Pharmacology",
    stem: "Which antifungal works by inhibiting ergosterol synthesis via lanosterol demethylase (CYP51)?",
    options: ["Amphotericin B", "Griseofulvin", "Fluconazole", "Caspofungin"],
    answer: 2,
    explanation: "Azole antifungals (Fluconazole, Itraconazole, Voriconazole) inhibit fungal CYP51 (lanosterol 14α-demethylase), depleting ergosterol. Amphotericin B binds ergosterol directly; Caspofungin inhibits β-1,3-glucan synthase (echinocandin); Griseofulvin disrupts microtubules.",
  },
  {
    id: 564,
    subject: "Pharmacology",
    stem: "Adverse effect NOT associated with aminoglycosides is:",
    options: ["Nephrotoxicity", "Ototoxicity", "Neuromuscular blockade", "Hepatotoxicity"],
    answer: 3,
    explanation: "Aminoglycosides (Gentamicin, Amikacin) cause nephrotoxicity (proximal tubule), ototoxicity (cochlear and vestibular), and neuromuscular blockade (avoid in myasthenia gravis). Hepatotoxicity is NOT a known adverse effect — that's characteristic of drugs like INH, rifampicin.",
  },
  {
    id: 565,
    subject: "Pharmacology",
    stem: "Which drug is used for treatment of acute alcohol withdrawal seizures?",
    options: ["Phenytoin", "Carbamazepine", "Lorazepam", "Gabapentin"],
    answer: 2,
    explanation: "Benzodiazepines (Lorazepam, Diazepam, Chlordiazepoxide) are the drugs of choice for alcohol withdrawal syndrome including seizures. They enhance GABA-A receptor activity. Phenytoin is ineffective for withdrawal seizures. Long-acting benzodiazepines (Chlordiazepoxide) preferred for scheduled detox.",
  },
  {
    id: 566,
    subject: "Pharmacology",
    stem: "Sildenafil acts by inhibiting:",
    options: ["Phosphodiesterase-3 (PDE-3)", "Phosphodiesterase-5 (PDE-5)", "Adenylyl cyclase", "Angiotensin-converting enzyme"],
    answer: 1,
    explanation: "Sildenafil inhibits PDE-5, which normally breaks down cGMP in penile smooth muscle. Increased cGMP → smooth muscle relaxation → increased blood flow → erection. Also used in pulmonary arterial hypertension. Contraindicated with nitrates (risk of severe hypotension).",
  },
  {
    id: 567,
    subject: "Pharmacology",
    stem: "Which of the following is a direct thrombin inhibitor used for anticoagulation?",
    options: ["Rivaroxaban", "Apixaban", "Dabigatran", "Fondaparinux"],
    answer: 2,
    explanation: "Dabigatran is a direct thrombin (factor IIa) inhibitor. Rivaroxaban and Apixaban are direct factor Xa inhibitors. Fondaparinux is an indirect factor Xa inhibitor (via antithrombin). Dabigatran's antidote is Idarucizumab; Andexanet alfa reverses Xa inhibitors.",
  },

  // ─── MEDICINE BATCH 3 (568–587) ──────────────────────────────────────────
  {
    id: 568,
    subject: "Medicine",
    stem: "Which of the following is the most common cause of secondary hypertension in young adults?",
    options: ["Conn's syndrome", "Pheochromocytoma", "Renal parenchymal disease", "Cushing's syndrome"],
    answer: 2,
    explanation: "Renal parenchymal disease (chronic glomerulonephritis, diabetic nephropathy, PCKD) is the most common cause of secondary hypertension overall. In young women, renovascular hypertension (fibromuscular dysplasia) is important. Conn's syndrome (primary hyperaldosteronism) is the most common endocrine cause.",
  },
  {
    id: 569,
    subject: "Medicine",
    stem: "Which HbA1c level is diagnostic of diabetes mellitus?",
    options: ["≥ 5.7%", "≥ 6.0%", "≥ 6.5%", "≥ 7.0%"],
    answer: 2,
    explanation: "ADA diagnostic criteria: HbA1c ≥ 6.5% on two occasions. 5.7–6.4% = prediabetes (impaired glycaemia). Fasting glucose ≥ 126 mg/dL or 2-hour OGTT ≥ 200 mg/dL or random glucose ≥ 200 mg/dL with symptoms also diagnose DM. HbA1c ≥ 6.5% is a single test requiring repeat confirmation.",
  },
  {
    id: 570,
    subject: "Medicine",
    stem: "ECG finding characteristic of hyperkalaemia is:",
    options: ["Prolonged QT interval", "U waves", "Peaked (tall) T waves followed by widened QRS", "Delta waves"],
    answer: 2,
    explanation: "Hyperkalaemia ECG progression: peaked T waves → PR prolongation → widened QRS → sine wave pattern → ventricular fibrillation. U waves are seen in hypokalaemia. Delta waves in WPW syndrome. Prolonged QT in hypocalcaemia.",
  },
  {
    id: 571,
    subject: "Medicine",
    stem: "Most common cause of community-acquired pneumonia in adults is:",
    options: ["Staphylococcus aureus", "Klebsiella pneumoniae", "Streptococcus pneumoniae", "Mycoplasma pneumoniae"],
    answer: 2,
    explanation: "Streptococcus pneumoniae is the most common cause of CAP in all age groups. Mycoplasma is most common in young adults and students (atypical pneumonia). Klebsiella causes lobar pneumonia in alcoholics (currant-jelly sputum). Staphylococcus causes post-influenza pneumonia.",
  },
  {
    id: 572,
    subject: "Medicine",
    stem: "Which antibody is most specific for primary biliary cholangitis (PBC)?",
    options: ["ANA", "Anti-smooth muscle antibody", "Anti-mitochondrial antibody (AMA-M2)", "ANCA"],
    answer: 2,
    explanation: "Anti-mitochondrial antibody (AMA), specifically anti-M2 (directed against pyruvate dehydrogenase complex), is >95% sensitive and specific for PBC. ANA and ASMA are associated with autoimmune hepatitis. ANCA with PSC and IBD.",
  },
  {
    id: 573,
    subject: "Medicine",
    stem: "Trousseau's sign in hypocalcaemia is:",
    options: ["Facial twitching on tapping the facial nerve", "Carpal spasm on inflating BP cuff above systolic pressure for 3 minutes", "Contraction of hand muscles on wrist flexion", "Lid retraction on looking up"],
    answer: 1,
    explanation: "Trousseau's sign: carpal spasm (main d'accoucheur) when BP cuff is inflated above systolic pressure for 3 minutes in hypocalcaemia. Chvostek's sign is facial twitching on tapping the facial nerve. Both reflect neuromuscular excitability due to hypocalcaemia.",
  },
  {
    id: 574,
    subject: "Medicine",
    stem: "Which of the following is NOT a feature of nephrotic syndrome?",
    options: ["Massive proteinuria (>3.5 g/day)", "Hypoalbuminaemia", "Oedema", "Haematuria as a major feature"],
    answer: 3,
    explanation: "Nephrotic syndrome: massive proteinuria >3.5 g/day, hypoalbuminaemia, oedema, hyperlipidaemia, lipiduria. Haematuria is a feature of nephritic syndrome (RPGN, IgA nephropathy). Both can co-exist in membranoproliferative GN.",
  },
  {
    id: 575,
    subject: "Medicine",
    stem: "Which tumour marker is elevated in hepatocellular carcinoma (HCC)?",
    options: ["CA-125", "CEA", "Alpha-fetoprotein (AFP)", "PSA"],
    answer: 2,
    explanation: "AFP (alpha-fetoprotein) is the tumour marker for HCC. AFP > 400 ng/mL in a cirrhotic patient with a liver mass is diagnostic of HCC without biopsy. CA-125 for ovarian cancer; CEA for colorectal cancer; PSA for prostate cancer.",
  },
  {
    id: 576,
    subject: "Medicine",
    stem: "Reed-Sternberg cells are pathognomonic of:",
    options: ["Non-Hodgkin lymphoma", "Hodgkin lymphoma", "Burkitt's lymphoma", "Multiple myeloma"],
    answer: 1,
    explanation: "Reed-Sternberg cells (large, bilobed, 'owl-eye' nuclei) are pathognomonic of Hodgkin lymphoma (HL). They are CD15+, CD30+, EBV-associated in many cases. Non-Hodgkin lymphoma lacks RS cells. Burkitt's lymphoma has 'starry sky' pattern on histology.",
  },
  {
    id: 577,
    subject: "Medicine",
    stem: "Which finding is most characteristic of infective endocarditis?",
    options: ["Roth spots in retina", "Osler nodes (tender)", "Janeway lesions (non-tender)", "All are features of IE"],
    answer: 3,
    explanation: "All are features of IE: Roth spots (oval retinal haemorrhages with pale centres), Osler nodes (tender nodules on finger pads — immune complex), Janeway lesions (non-tender erythematous macules on palms/soles — septic emboli). Osler nodes are tender; Janeway lesions are non-tender.",
  },
  {
    id: 578,
    subject: "Medicine",
    stem: "Opening snap in mitral stenosis is due to:",
    options: ["Turbulent flow across stenotic valve", "Sudden tensing of mitral valve leaflets at the start of diastole", "Closure of mitral valve", "Ventricular filling in diastole"],
    answer: 1,
    explanation: "Opening snap (OS) in mitral stenosis results from the sudden tensing of the thickened but pliable mitral leaflets when they reach their maximum opening position. Shorter A2-OS interval = more severe stenosis (higher LA pressure opens valve earlier). OS disappears with heavily calcified immobile leaflets.",
  },
  {
    id: 579,
    subject: "Medicine",
    stem: "Which investigation is the gold standard for diagnosis of pulmonary embolism?",
    options: ["D-dimer", "CT pulmonary angiography (CTPA)", "V/Q scan", "Echocardiography"],
    answer: 1,
    explanation: "CTPA is the gold standard for PE diagnosis. D-dimer has high sensitivity but low specificity — used to rule out PE when pre-test probability is low. V/Q scan is used when CTPA is contraindicated (renal failure, contrast allergy, pregnancy). Echo shows RV strain in massive PE.",
  },
  {
    id: 580,
    subject: "Medicine",
    stem: "Kayser-Fleischer rings are seen in:",
    options: ["Haemochromatosis", "Wilson's disease", "Primary biliary cholangitis", "Chronic viral hepatitis"],
    answer: 1,
    explanation: "Kayser-Fleischer rings (golden-brown rings at corneal periphery, best seen on slit-lamp) are due to copper deposition in Descemet's membrane in Wilson's disease. They can also occur in cholestatic liver disease but are most characteristic of Wilson's. Diagnosis: serum ceruloplasmin ↓, 24h urine copper ↑, liver biopsy.",
  },
  {
    id: 581,
    subject: "Medicine",
    stem: "Which condition causes 'bull's eye' macular lesion on fundoscopy?",
    options: ["Central retinal artery occlusion", "Chloroquine toxicity", "Diabetic retinopathy", "Hypertensive retinopathy"],
    answer: 1,
    explanation: "Chloroquine/Hydroxychloroquine toxicity causes 'bull's eye maculopathy' — a ring of pigment loss surrounding the fovea, seen on fundoscopy and OCT. Baseline and annual screening with visual fields and OCT is recommended for patients on long-term hydroxychloroquine.",
  },
  {
    id: 582,
    subject: "Medicine",
    stem: "Which is the earliest change in diabetic nephropathy?",
    options: ["Proteinuria >300 mg/day", "Microalbuminuria (30–300 mg/day)", "Glomerular hyperfiltration (increased GFR)", "Hypertension"],
    answer: 2,
    explanation: "Sequence: Glomerular hyperfiltration (GFR↑) → Kidney hypertrophy → Microalbuminuria (30–300 mg/day = earliest detectable change) → Overt proteinuria → Progressive loss of GFR → ESRD. Microalbuminuria is the earliest CLINICAL marker; hyperfiltration occurs first but isn't routinely measured.",
  },
  {
    id: 583,
    subject: "Medicine",
    stem: "Which type of diabetes insipidus responds to desmopressin (DDAVP)?",
    options: ["Nephrogenic DI", "Central (cranial) DI", "Psychogenic polydipsia", "Both nephrogenic and central"],
    answer: 1,
    explanation: "Central DI (ADH deficiency) responds to DDAVP because the kidneys can still respond to ADH. Nephrogenic DI has ADH resistance — DDAVP is ineffective. Nephrogenic DI is treated with thiazides + salt restriction + NSAIDs. Water deprivation test + DDAVP challenge differentiates the two.",
  },
  {
    id: 584,
    subject: "Medicine",
    stem: "Anti-GBM (glomerular basement membrane) antibody disease causing pulmonary haemorrhage and glomerulonephritis is:",
    options: ["Wegener's granulomatosis (GPA)", "Goodpasture's syndrome", "SLE nephritis", "IgA nephropathy"],
    answer: 1,
    explanation: "Goodpasture's syndrome: anti-GBM antibodies target α3 chain of type IV collagen in GBM and alveolar basement membrane → rapidly progressive GN + pulmonary haemorrhage. Treatment: plasmapheresis + immunosuppression. C-ANCA (PR3) is for GPA; P-ANCA (MPO) for microscopic polyangiitis.",
  },
  {
    id: 585,
    subject: "Medicine",
    stem: "Which sign is seen in superior vena cava (SVC) obstruction?",
    options: ["Kussmaul's sign", "Pemberton's sign", "Corrigan's sign", "De Musset's sign"],
    answer: 1,
    explanation: "Pemberton's sign: arm elevation causes facial flushing, cyanosis, and respiratory distress due to worsening SVC compression (seen in thoracic inlet obstruction/superior mediastinal syndrome). Kussmaul's sign (JVP rising with inspiration) is for constrictive pericarditis. Corrigan's and de Musset's are signs of aortic regurgitation.",
  },
  {
    id: 586,
    subject: "Medicine",
    stem: "Most sensitive test for detecting iron-deficiency anaemia (earliest stage) is:",
    options: ["Serum ferritin", "Serum iron", "TIBC", "Peripheral smear"],
    answer: 0,
    explanation: "Serum ferritin is the most sensitive and specific test for iron deficiency — it reflects storage iron. It falls first, before serum iron drops or anaemia develops. However, ferritin is an acute-phase reactant and can be normal/elevated in concurrent infection/inflammation even with iron deficiency.",
  },
  {
    id: 587,
    subject: "Medicine",
    stem: "Which of the following is a criterion for diagnosis of antiphospholipid syndrome (APS)?",
    options: ["Anti-dsDNA antibody", "Lupus anticoagulant or anti-cardiolipin antibody on 2 occasions 12 weeks apart", "Low complement C3/C4", "Anti-Sm antibody"],
    answer: 1,
    explanation: "APS (Sapporo/Sydney criteria): Clinical — thrombosis or pregnancy morbidity. Lab — Lupus anticoagulant, Anti-cardiolipin IgG/IgM, or Anti-β2-glycoprotein-I IgG/IgM on two occasions at least 12 weeks apart. Anti-dsDNA and low complement are criteria for SLE, not APS.",
  },

  // ─── SURGERY BATCH 3 (588–602) ────────────────────────────────────────────
  {
    id: 588,
    subject: "Surgery",
    stem: "Most common site of peptic ulcer perforation is:",
    options: ["Lesser curve of stomach", "Posterior wall of duodenum", "Anterior wall of first part of duodenum", "Pyloric antrum"],
    answer: 2,
    explanation: "Anterior wall of first part of duodenum is the most common site of peptic ulcer perforation (free perforation into peritoneal cavity). Posterior duodenal ulcers bleed (eroding gastroduodenal artery) rather than perforate. Perforation presents with sudden severe epigastric pain, board-like rigidity, and free air under diaphragm on X-ray.",
  },
  {
    id: 589,
    subject: "Surgery",
    stem: "Child-Pugh score is used to assess:",
    options: ["Severity of acute pancreatitis", "Liver function and prognosis in cirrhosis", "Risk of post-operative pulmonary complications", "Degree of portal hypertension"],
    answer: 1,
    explanation: "Child-Pugh score assesses liver function: Bilirubin, Albumin, PT/INR, Ascites, Hepatic encephalopathy — each scored 1–3. Total: A (5–6) = good, B (7–9) = moderate, C (10–15) = poor prognosis. MELD score (Creatinine, Bilirubin, INR) is now preferred for organ allocation.",
  },
  {
    id: 590,
    subject: "Surgery",
    stem: "Courvoisier's law states that in painless obstructive jaundice with a palpable gallbladder, the cause is:",
    options: ["Gallstones", "Carcinoma of the head of pancreas or periampullary carcinoma", "Acute cholecystitis", "Primary sclerosing cholangitis"],
    answer: 1,
    explanation: "Courvoisier's law: a palpable, non-tender gallbladder in a patient with obstructive jaundice is unlikely to be due to gallstones (chronically scarred/fibrotic GB can't dilate). Most likely cause is malignant obstruction — pancreatic head carcinoma, ampullary carcinoma, or cholangiocarcinoma.",
  },
  {
    id: 591,
    subject: "Surgery",
    stem: "Ranson's criteria at admission for acute pancreatitis includes which of the following?",
    options: ["Serum calcium <8 mg/dL", "Age >55 years", "Haematocrit fall >10%", "Blood glucose <200 mg/dL"],
    answer: 1,
    explanation: "Ranson's criteria AT ADMISSION: Age >55, WBC >16,000, Blood glucose >200, LDH >350, AST >250. Within 48h: Haematocrit fall >10%, BUN rise >5, Calcium <8, PaO2 <60, Base deficit >4, Fluid sequestration >6L. Score ≥3 = severe pancreatitis.",
  },
  {
    id: 592,
    subject: "Surgery",
    stem: "Which hernia is most common in females?",
    options: ["Direct inguinal hernia", "Indirect inguinal hernia", "Femoral hernia", "Umbilical hernia"],
    answer: 1,
    explanation: "In females, indirect inguinal hernia is still the most common hernia (along with femoral). Femoral hernia is more common in females than males due to wider pelvis, but indirect inguinal is the overall most common. Femoral hernia: high risk of strangulation due to narrow, rigid femoral ring.",
  },
  {
    id: 593,
    subject: "Surgery",
    stem: "McBurney's point is located at:",
    options: [
      "1/3 of the distance from umbilicus to right ASIS (medial third)",
      "1/3 of the distance from right ASIS to umbilicus (lateral third)",
      "Centre of right iliac fossa",
      "Right costovertebral angle",
    ],
    answer: 1,
    explanation: "McBurney's point is 1/3 of the way from the right ASIS along the line to the umbilicus — the lateral third of that line. It overlies the base of the appendix in most people. Maximal tenderness here is the classic sign of acute appendicitis. Rovsing's sign, psoas sign, and obturator sign are other positive findings.",
  },
  {
    id: 594,
    subject: "Surgery",
    stem: "Which investigation is the gold standard for diagnosis of carcinoma rectum?",
    options: ["CT scan abdomen", "Colonoscopy with biopsy", "Digital rectal examination", "Barium enema"],
    answer: 1,
    explanation: "Colonoscopy with biopsy is the gold standard for diagnosis of colorectal carcinoma (histopathological confirmation). DRE can detect low rectal tumours. CT/MRI is used for staging. Barium enema shows 'apple-core' lesion but is not definitive. CEA is used for monitoring recurrence.",
  },
  {
    id: 595,
    subject: "Surgery",
    stem: "Which thyroid cancer has the best prognosis?",
    options: ["Medullary carcinoma", "Anaplastic carcinoma", "Papillary carcinoma", "Follicular carcinoma"],
    answer: 2,
    explanation: "Papillary carcinoma: best prognosis (10-year survival >95%), most common (80%), lymph node spread common but doesn't worsen prognosis significantly, RET/PTC rearrangement, 'Orphan Annie eye' nuclei. Anaplastic: worst prognosis (<6 months median survival). Medullary: Calcitonin marker, associated with MEN2.",
  },
  {
    id: 596,
    subject: "Surgery",
    stem: "Which of the following is a feature of strangulated hernia?",
    options: ["Reducible on lying down", "No cough impulse, tender, no pulsation, irreducible", "Soft and compressible on palpation", "Positive transillumination"],
    answer: 1,
    explanation: "Strangulation = compromised blood supply. Features: irreducible, tense, tender, no cough impulse, overlying skin red/oedematous. Absent bowel sounds in severe cases. Medical emergency requiring urgent surgery. Femoral hernias have highest strangulation risk due to narrow neck.",
  },
  {
    id: 597,
    subject: "Surgery",
    stem: "Richter's hernia involves:",
    options: ["Entire circumference of bowel", "Only the antimesenteric wall of the bowel (partial enterocele)", "Meckel's diverticulum", "Two loops of bowel with connecting segment"],
    answer: 1,
    explanation: "Richter's hernia: only the antimesenteric border of the bowel herniates — only PART of the bowel wall. This can strangulate without causing intestinal obstruction (bowel lumen not compromised). Most common in femoral hernia. Littre's hernia involves Meckel's diverticulum; Maydl's involves two loops.",
  },
  {
    id: 598,
    subject: "Surgery",
    stem: "Most common complication of massive blood transfusion is:",
    options: ["Hyperkalaemia", "Hypothermia", "Citrate toxicity (hypocalcaemia)", "Coagulopathy"],
    answer: 1,
    explanation: "Massive transfusion (>10 units in 24h) complications: Hypothermia (cold blood), Citrate toxicity → hypocalcaemia, Hyperkalaemia (lysed RBCs release K⁺), Coagulopathy (dilutional), TACO, TRALI, Hyperglycaemia. Hypothermia is most common; hypocalcaemia causes cardiac arrhythmias.",
  },
  {
    id: 599,
    subject: "Surgery",
    stem: "Which of the following is the earliest symptom of carcinoma oesophagus?",
    options: ["Odynophagia (pain on swallowing)", "Progressive dysphagia (solids → liquids)", "Regurgitation of undigested food", "Weight loss"],
    answer: 1,
    explanation: "Progressive dysphagia (initially solids, then semi-solids, then liquids) is the earliest and most common symptom of oesophageal carcinoma. Weight loss follows. Squamous cell carcinoma is most common worldwide (mid-oesophagus); adenocarcinoma at gastro-oesophageal junction (Barrett's related).",
  },
  {
    id: 600,
    subject: "Surgery",
    stem: "Charcot's triad for acute cholangitis consists of:",
    options: ["Pain, fever, jaundice", "Fever, rigors, jaundice", "Epigastric pain, fever, jaundice", "Pain, fever with rigors, and obstructive jaundice"],
    answer: 3,
    explanation: "Charcot's triad: RUQ pain + Fever with rigors (shaking chills) + Jaundice (obstructive). Caused by bacterial infection of obstructed biliary tree (calculus most common). Reynolds' pentad adds hypotension and confusion (septic shock). Treatment: IV antibiotics + urgent biliary decompression (ERCP).",
  },
  {
    id: 601,
    subject: "Surgery",
    stem: "Which of the following is the gold standard for staging of rectal cancer?",
    options: ["CT scan of abdomen and pelvis", "MRI pelvis", "Endorectal ultrasound", "PET-CT scan"],
    answer: 1,
    explanation: "MRI pelvis is the gold standard for local staging of rectal cancer — assesses T stage (depth of invasion), N stage (lymph nodes), circumferential resection margin (CRM). Endorectal ultrasound is excellent for early T1/T2 staging. CT is used for distant metastasis (M staging).",
  },
  {
    id: 602,
    subject: "Surgery",
    stem: "Battle's sign (bruising over mastoid process) indicates fracture of:",
    options: ["Frontal bone", "Temporal bone (base of skull)", "Parietal bone", "Occipital bone"],
    answer: 1,
    explanation: "Battle's sign (post-auricular ecchymosis) indicates temporal bone fracture at the base of skull. Raccoon eyes (periorbital ecchymosis) indicate anterior skull base fracture. Both are delayed signs (appearing 12–24 h after injury). May be associated with CSF otorrhoea/rhinorrhoea, haemotympanum.",
  },

  // ─── OBG BATCH 3 (603–617) ────────────────────────────────────────────────
  {
    id: 603,
    subject: "OBG",
    stem: "Normal duration of active phase of labour in a primigravida is:",
    options: ["Cervical dilatation at 0.5 cm/hour", "Cervical dilatation at ≥1.2 cm/hour", "Cervical dilatation at 2 cm/hour", "Cervical dilatation at 0.3 cm/hour"],
    answer: 1,
    explanation: "Friedman's curve: Active phase of labour in a primigravida should progress at ≥1.2 cm/hour cervical dilatation (multiparae ≥1.5 cm/hour). Latent phase: up to 20h primigravidis, 14h multiparae. Active phase arrest = no progress for ≥2 hours with adequate contractions.",
  },
  {
    id: 604,
    subject: "OBG",
    stem: "Most common cause of postpartum haemorrhage (PPH) is:",
    options: ["Retained placenta", "Uterine atony", "Genital tract lacerations", "Coagulation disorders"],
    answer: 1,
    explanation: "Uterine atony is the most common cause of PPH (80%). The 4 T's: Tone (atony-80%), Trauma (lacerations-10-15%), Tissue (retained placenta), Thrombin (coagulopathy). Management of atony: massage + oxytocin → ergometrine → carboprost → misoprostol → B-Lynch suture → hysterectomy.",
  },
  {
    id: 605,
    subject: "OBG",
    stem: "Bishop's score assesses all of the following EXCEPT:",
    options: ["Cervical dilatation", "Cervical effacement", "Station of presenting part", "Colour of liquor amnii"],
    answer: 3,
    explanation: "Bishop's score (0–13): Dilatation (0–3), Effacement (0–3), Station (-3 to +2 = 0–3), Consistency (0–2), Position (0–2). Score ≥8 = favourable cervix, induction likely to succeed. Colour of liquor is NOT part of Bishop's score. Score <6 = cervical ripening required before induction.",
  },
  {
    id: 606,
    subject: "OBG",
    stem: "Which of the following is a contraindication to vacuum delivery?",
    options: ["Face presentation", "Cervix not fully dilated", "Gestational age <34 weeks", "All of the above"],
    answer: 3,
    explanation: "Contraindications to vacuum (Ventouse) delivery: Face/brow presentation, Gestational age <34 weeks (increased risk of subgaleal haemorrhage, intracranial haemorrhage), Cervix not fully dilated, Cephalopelvic disproportion, Bleeding disorders in baby (haemophilia). Episiotomy is NOT mandatory for vacuum delivery.",
  },
  {
    id: 607,
    subject: "OBG",
    stem: "Hydatidiform mole most commonly presents with:",
    options: ["Absence of fetal heart sounds + uterus large for dates + exaggerated pregnancy symptoms", "Painful vaginal bleeding", "Pre-eclampsia before 20 weeks", "Snowstorm appearance on ultrasound"],
    answer: 3,
    explanation: "Classic presentation of hydatidiform mole: painless vaginal bleeding + uterus large for dates (50%) + exaggerated pregnancy symptoms (hyperemesis) + passage of grape-like vesicles. 'Snowstorm' appearance on ultrasound is PATHOGNOMONIC of complete mole. β-hCG is markedly elevated. Pre-eclampsia <20 weeks is a classic but less common feature.",
  },
  {
    id: 608,
    subject: "OBG",
    stem: "Which investigation is the gold standard for diagnosis of ectopic pregnancy?",
    options: ["Serum β-hCG", "Transvaginal ultrasound (TVS)", "Laparoscopy", "Culdocentesis"],
    answer: 2,
    explanation: "Laparoscopy is the gold standard for definitive diagnosis of ectopic pregnancy. TVS (transvaginal ultrasound) is the first-line investigation — can visualise extrauterine gestational sac, cardiac activity. Serum β-hCG: if TVS non-diagnostic, a discriminatory zone of β-hCG >2000 IU/L with empty uterus strongly suggests ectopic.",
  },
  {
    id: 609,
    subject: "OBG",
    stem: "Most common site of ectopic pregnancy is:",
    options: ["Ovary", "Cervix", "Ampulla of fallopian tube", "Isthmus of fallopian tube"],
    answer: 2,
    explanation: "Ampulla of the fallopian tube is the most common site of ectopic pregnancy (55–70%). Isthmus is the 2nd most common (12%) but ruptures earliest (thin wall, poor distensibility). Fimbrial pregnancies can auto-abort (tubal abortion). Ovarian and cervical ectopics are rare.",
  },
  {
    id: 610,
    subject: "OBG",
    stem: "HELLP syndrome consists of:",
    options: ["Haemolysis, Elevated LFTs, Low Platelets", "Hypertension, Elevated LFTs, Low Platelets", "Haemolysis, Elevated LFTs, Low Protein", "Haemolysis, Encephalopathy, Liver dysfunction, Platelets low"],
    answer: 0,
    explanation: "HELLP syndrome: Haemolysis (microangiopathic), Elevated Liver enzymes (ALT/AST), Low Platelets (<100,000). A severe variant of pre-eclampsia. Management: stabilise, MgSO4, antihypertensives, expedite delivery. Platelets <50,000 → risk of spontaneous haemorrhage.",
  },
  {
    id: 611,
    subject: "OBG",
    stem: "Which drug is used for medical management of ectopic pregnancy?",
    options: ["Mifepristone", "Misoprostol", "Methotrexate", "Oxytocin"],
    answer: 2,
    explanation: "Methotrexate (folic acid antagonist) is used for medical management of unruptured ectopic pregnancy. Criteria: haemodynamically stable, unruptured, no fetal cardiac activity, β-hCG <5000–10,000 IU/L, ectopic <3.5 cm. Single-dose IM methotrexate is most common protocol. β-hCG monitored until negative.",
  },
  {
    id: 612,
    subject: "OBG",
    stem: "Placenta praevia is defined as placenta which is:",
    options: ["Covering the internal os partially or completely", "Located in the lower uterine segment", "Covering the external cervical os", "Located at the fundus but >20 cm from internal os"],
    answer: 1,
    explanation: "Placenta praevia: placenta is implanted wholly or partially in the lower uterine segment. Classification: Type I (lateral-low-lying), Type II (marginal), Type III (partial), Type IV (central/complete — covers internal os). Presents with painless bright red vaginal bleeding in 3rd trimester. DO NOT do vaginal examination.",
  },
  {
    id: 613,
    subject: "OBG",
    stem: "Ideal contraceptive for lactating mother in immediate postpartum period is:",
    options: ["Combined oral contraceptive pill", "Copper IUD", "Progesterone-only pill (POP)", "Condom"],
    answer: 2,
    explanation: "Progesterone-only pill (POP) / Mini-pill is safe for breastfeeding mothers — does not affect milk quantity or quality. Combined OCP contains oestrogen which reduces milk supply and is not recommended <6 weeks postpartum in breastfeeding women. Copper IUD is also effective but insertion timing varies.",
  },
  {
    id: 614,
    subject: "OBG",
    stem: "Which investigation is used for assessment of fetal lung maturity?",
    options: ["Non-stress test (NST)", "Biophysical profile (BPP)", "Lecithin:Sphingomyelin (L:S) ratio", "Kick count chart"],
    answer: 2,
    explanation: "Lecithin:Sphingomyelin (L:S) ratio in amniotic fluid: L:S ≥2:1 indicates fetal lung maturity (surfactant sufficient). L:S <1.5 = immature. Phosphatidylglycerol (PG) presence also indicates maturity. Obtained by amniocentesis. NST and BPP assess fetal well-being, not lung maturity.",
  },
  {
    id: 615,
    subject: "OBG",
    stem: "Most common ovarian tumour in pregnancy is:",
    options: ["Serous cystadenoma", "Dermoid cyst (mature cystic teratoma)", "Mucinous cystadenoma", "Corpus luteum cyst"],
    answer: 1,
    explanation: "Dermoid cyst (benign cystic teratoma) is the most common ovarian tumour in pregnancy. Contains ectodermal derivatives (hair, teeth, sebum). Commonest benign ovarian tumour overall. May twist (torsion) during pregnancy. Shows 'tip of iceberg' sign on ultrasound.",
  },
  {
    id: 616,
    subject: "OBG",
    stem: "Cardinal movements of labour in vertex presentation include all EXCEPT:",
    options: ["Engagement", "Descent and flexion", "Internal rotation", "Extension of the head at delivery of shoulders"],
    answer: 3,
    explanation: "Cardinal movements of labour: Engagement → Descent → Flexion → Internal rotation → Extension (at introitus — head delivers by extension) → External rotation (restitution + shoulder rotation) → Expulsion. Extension occurs when the occiput escapes under the pubic symphysis, not at delivery of shoulders.",
  },
  {
    id: 617,
    subject: "OBG",
    stem: "Aschheim-Zondek test is a biological test for:",
    options: ["Ovarian function", "Pregnancy (hCG detection in urine)", "Pituitary function", "Adrenal function"],
    answer: 1,
    explanation: "Aschheim-Zondek (A-Z) test: urine injected into immature female mice → if pregnant (hCG present) → follicle formation, corpora lutea, uterine changes. Obsolete test, replaced by immunological methods. Froghnan (Hogben) test uses Xenopus frogs. Modern tests: ELISA, immunochromatography (pregnancy test strips).",
  },

  // ─── PATHOLOGY BATCH 3 (618–632) ──────────────────────────────────────────
  {
    id: 618,
    subject: "Pathology",
    stem: "Which type of necrosis is seen in tuberculosis?",
    options: ["Liquefactive necrosis", "Coagulative necrosis", "Caseous necrosis", "Fat necrosis"],
    answer: 2,
    explanation: "Caseous necrosis: cheese-like, soft, white necrosis — characteristically seen in tuberculosis (and fungal infections like histoplasmosis). Microscopically: amorphous, eosinophilic, granular debris within granuloma. Coagulative = infarcts; Liquefactive = brain/abscess; Fat = pancreatitis; Fibrinoid = autoimmune vasculitis.",
  },
  {
    id: 619,
    subject: "Pathology",
    stem: "Philadelphia chromosome (t(9;22)) is associated with:",
    options: ["ALL in adults", "CML (and some ALL)", "CLL", "AML with inv(16)"],
    answer: 1,
    explanation: "Philadelphia chromosome (BCR-ABL1 fusion gene) is found in >95% of CML. Also present in 20–30% of adult ALL (poor prognosis). BCR-ABL is a constitutively active tyrosine kinase → unregulated proliferation. Imatinib (Gleevec) targets BCR-ABL. CLL: del(13q14) most common. AML-M4Eo: inv(16).",
  },
  {
    id: 620,
    subject: "Pathology",
    stem: "Which cell type predominates in granuloma of tuberculosis?",
    options: ["Neutrophils", "Plasma cells", "Activated macrophages (epithelioid cells)", "NK cells"],
    answer: 2,
    explanation: "Tuberculous granuloma: central caseous necrosis + Langhan's giant cells (peripheral horseshoe nuclei) + epithelioid macrophages + lymphocytes (CD4+ Th1). Epithelioid cells = activated macrophages with abundant pale cytoplasm. Th1-mediated DTH response (cell-mediated). Low Th2 → low antibody.",
  },
  {
    id: 621,
    subject: "Pathology",
    stem: "Which tumour shows 'onion skin' periosteal reaction on X-ray?",
    options: ["Osteosarcoma", "Ewing's sarcoma", "Chondroblastoma", "Giant cell tumour"],
    answer: 1,
    explanation: "Ewing's sarcoma: arises in diaphysis of long bones (or flat bones) in children/adolescents. X-ray: 'onion skin' (lamellated) periosteal reaction + 'moth-eaten' bone destruction. Histology: small round blue cells. Sunburst pattern on X-ray = osteosarcoma. Giant cell tumour = epiphysis, 'soap bubble' lytic lesion.",
  },
  {
    id: 622,
    subject: "Pathology",
    stem: "Virchow's triad for venous thrombosis includes:",
    options: ["Hypercoagulability + Platelet dysfunction + Endothelial injury", "Endothelial injury + Turbulent flow + Hypercoagulability", "Stasis + Endothelial injury + Hypercoagulability", "Stasis + Hyperviscosity + Hypercoagulability"],
    answer: 2,
    explanation: "Virchow's triad: Endothelial injury (most important for arterial thrombus) + Stasis or turbulent flow + Hypercoagulability. DVT predominantly caused by stasis + hypercoagulability. Arterial thrombus: platelet-rich (white thrombus) from endothelial injury. Venous thrombus: fibrin-rich (red thrombus) from stasis.",
  },
  {
    id: 623,
    subject: "Pathology",
    stem: "Which tumour marker is used for monitoring multiple myeloma?",
    options: ["CEA", "AFP", "Serum/urine M-protein (paraprotein) + Bence Jones protein", "CA 19-9"],
    answer: 2,
    explanation: "Multiple myeloma monitoring: Serum M-protein (SPEP), Urine M-protein, Free light chains (kappa/lambda). Bence Jones proteins (free immunoglobulin light chains) are excreted in urine and cause tubular damage (cast nephropathy). Criteria for response: ≥50% reduction in M-protein = partial response.",
  },
  {
    id: 624,
    subject: "Pathology",
    stem: "Which of the following is an example of type IV (delayed-type) hypersensitivity?",
    options: ["Anaphylaxis", "Goodpasture's syndrome", "Tuberculin skin test (Mantoux test)", "SLE nephritis"],
    answer: 2,
    explanation: "Type IV (delayed-type hypersensitivity/DTH): T-cell mediated, no antibodies. Peak: 24–72 hours. Examples: Tuberculin test, contact dermatitis, graft rejection, coeliac disease. Type I = IgE (anaphylaxis); Type II = cytotoxic IgG/IgM (Goodpasture's, haemolytic anaemia); Type III = immune complex (SLE, serum sickness).",
  },
  {
    id: 625,
    subject: "Pathology",
    stem: "Alpha-1 antitrypsin deficiency causes emphysema because:",
    options: ["Increased production of elastase leading to alveolar wall destruction", "Inhibition of neutrophil elastase is lost, causing destruction of alveolar walls", "Reduced surfactant production", "Chronic inflammation of small airways"],
    answer: 1,
    explanation: "Alpha-1 antitrypsin (A1AT) inhibits neutrophil elastase. Deficiency → uninhibited elastase → destruction of alveolar walls → panacinar emphysema (affects lower lobes). Smoking causes upper lobe centriacinar emphysema. A1AT deficiency also causes liver cirrhosis (PAS+ globules in hepatocytes). Phenotype PiZZ = severe deficiency.",
  },
  {
    id: 626,
    subject: "Pathology",
    stem: "Psammoma bodies are seen in all of the following EXCEPT:",
    options: ["Papillary thyroid carcinoma", "Serous ovarian cystadenocarcinoma", "Meningioma", "Small cell lung cancer"],
    answer: 3,
    explanation: "Psammoma bodies (concentric calcified deposits): Papillary thyroid carcinoma, Serous ovarian cancer (papillary), Meningioma, Papillary renal cell carcinoma, Mesothelioma. NOT in small cell lung cancer (associated with paraneoplastic syndromes — SIADH, Eaton-Lambert, ectopic ACTH).",
  },
  {
    id: 627,
    subject: "Pathology",
    stem: "Which stain is used to identify amyloid in tissue sections?",
    options: ["PAS stain", "Congo Red stain (apple-green birefringence under polarised light)", "ZN stain", "Masson's trichrome"],
    answer: 1,
    explanation: "Congo Red stain: amyloid appears salmon-pink/orange with Congo Red and shows apple-green birefringence under polarised light due to beta-pleated sheet structure. Thioflavin T (fluorescence) is more sensitive. Types: AL amyloid (plasma cell dyscrasias), AA (chronic inflammation), ATTR (transthyretin — familial/senile cardiac).",
  },
  {
    id: 628,
    subject: "Pathology",
    stem: "Lewy bodies are seen in:",
    options: ["Alzheimer's disease", "Parkinson's disease", "Huntington's disease", "Creutzfeldt-Jakob disease"],
    answer: 1,
    explanation: "Lewy bodies (eosinophilic intracytoplasmic inclusions, composed of α-synuclein) are found in substantia nigra neurons in Parkinson's disease. Alzheimer's: neurofibrillary tangles (tau) + amyloid plaques. Huntington's: striatal neuron loss + huntingtin inclusions. CJD: prion disease with 'spongiform' changes.",
  },
  {
    id: 629,
    subject: "Pathology",
    stem: "Which BRCA mutation has higher risk of ovarian cancer?",
    options: ["BRCA1 mutation", "BRCA2 mutation", "Both carry equal risk", "Neither BRCA1 nor BRCA2"],
    answer: 0,
    explanation: "BRCA1 mutations confer ~40–46% lifetime risk of ovarian cancer (vs 10–27% with BRCA2). Both carry high breast cancer risk (BRCA1: 55–65%, BRCA2: 45–55%). BRCA1 on chromosome 17q; BRCA2 on 13q. Function: DNA double-strand break repair (homologous recombination). PARP inhibitors (olaparib) are synthetic lethal in BRCA-deficient cancers.",
  },
  {
    id: 630,
    subject: "Pathology",
    stem: "Most common cause of death in burns patients after the first 48 hours is:",
    options: ["Hypovolaemic shock", "Sepsis (Pseudomonas and Staphylococcus are common)", "Renal failure", "Airway oedema"],
    answer: 1,
    explanation: "In the first 48h: hypovolaemia/shock is the main cause of death. After 48–72h: sepsis becomes the leading cause of mortality (wound infection by Pseudomonas, Staphylococcus, Candida). Inhalation injury is the most important predictor of mortality in the first 24h. Curling's ulcers (stress ulcers) are a GI complication.",
  },
  {
    id: 631,
    subject: "Pathology",
    stem: "Gaucher's disease is caused by deficiency of which enzyme?",
    options: ["Hexosaminidase A", "Glucocerebrosidase (beta-glucosidase)", "Alpha-galactosidase A", "Sphingomyelinase"],
    answer: 1,
    explanation: "Gaucher's disease: deficiency of glucocerebrosidase → accumulation of glucocerebroside in macrophages (liver, spleen, bone marrow). 'Crinkled paper' or 'wrinkled tissue paper' cytoplasm of Gaucher cells. Most common lysosomal storage disease. Type 1 (non-neuronopathic): hepatosplenomegaly, Erlenmeyer flask deformity. Treatment: enzyme replacement (imiglucerase).",
  },
  {
    id: 632,
    subject: "Pathology",
    stem: "Which of the following is an absolute contraindication to thrombolytic therapy in ischaemic stroke?",
    options: ["Age >80 years", "Prior stroke within 3 months", "Mild neurological deficit", "Blood pressure <185/110 mmHg"],
    answer: 1,
    explanation: "Absolute contraindications to tPA in ischaemic stroke: Prior stroke or head trauma within 3 months, Prior intracranial haemorrhage, Active internal bleeding, Intracranial/spinal surgery within 3 months, Uncontrolled hypertension (BP >185/110), Current anticoagulant use with INR >1.7. Age >80 is a relative contraindication.",
  },

  // ─── MICROBIOLOGY BATCH 3 (633–644) ──────────────────────────────────────
  {
    id: 633,
    subject: "Microbiology",
    stem: "Which organism causes 'rice-water' stools?",
    options: ["Salmonella typhi", "Shigella dysenteriae", "Vibrio cholerae", "Clostridium difficile"],
    answer: 2,
    explanation: "Vibrio cholerae produces cholera toxin (CT) — activates adenylyl cyclase → cAMP↑ → massive secretion of Cl⁻ and Na⁺ → isotonic watery diarrhoea ('rice-water stools'). Loss of up to 20 L/day. Transmitted via contaminated water. Treatment: oral rehydration salts (ORS), Doxycycline. Not a true enteroinvasive organism.",
  },
  {
    id: 634,
    subject: "Microbiology",
    stem: "Negri bodies are intracytoplasmic inclusions seen in:",
    options: ["Measles", "Rabies", "Herpes encephalitis", "Yellow fever"],
    answer: 1,
    explanation: "Negri bodies: eosinophilic intracytoplasmic inclusions in Purkinje cells (cerebellum) and hippocampal neurons (Ammon's horn) in rabies. Composed of viral nucleocapsid. Pathognomonic of rabies. Koplik's spots = measles prodrome. Cowdry type A = HSV/CMV. Torres bodies = yellow fever.",
  },
  {
    id: 635,
    subject: "Microbiology",
    stem: "Which fungus causes sporotrichosis and follows a lymphocutaneous pattern?",
    options: ["Candida albicans", "Sporothrix schenckii", "Cryptococcus neoformans", "Histoplasma capsulatum"],
    answer: 1,
    explanation: "Sporothrix schenckii: dimorphic fungus, introduced via thorn prick (rose gardeners' disease). Causes ascending lymphocutaneous sporotrichosis — painless nodular lesions along lymphatic channels. Thermal dimorphism: mould at 25°C, yeast at 37°C. Treatment: itraconazole (local); IV amphotericin B (disseminated).",
  },
  {
    id: 636,
    subject: "Microbiology",
    stem: "Which of the following is a DNA virus?",
    options: ["Measles virus", "Influenza virus", "Hepatitis B virus", "Rabies virus"],
    answer: 2,
    explanation: "Hepatitis B virus (HBV) is a DNA virus (partially double-stranded circular DNA, Hepadnavirus). Remember the DNA viruses: Herpes, Adeno, Pox, Hepadna, HPV, Parvovirus, Polyoma (HAP HHH — Herpes, Adeno, Pox, HBV, HPV, Parvo, Polyoma). All others (Measles, Influenza, Rabies, HCV, HIV) are RNA viruses.",
  },
  {
    id: 637,
    subject: "Microbiology",
    stem: "VDRL test is used for diagnosis of:",
    options: ["Gonorrhoea", "Syphilis (screening)", "Lymphogranuloma venereum", "Chancroid"],
    answer: 1,
    explanation: "VDRL (Venereal Disease Research Laboratory) is a non-treponemal screening test for syphilis — detects antibodies against cardiolipin-lecithin-cholesterol antigen. TPHA/FTA-ABS are treponemal confirmation tests. VDRL can be falsely positive in SLE, malaria, TB, pregnancy. VDRL titre monitors response to treatment.",
  },
  {
    id: 638,
    subject: "Microbiology",
    stem: "Which hepatitis virus is transmitted by the faeco-oral route and is most common in pregnant women?",
    options: ["Hepatitis B", "Hepatitis C", "Hepatitis D", "Hepatitis E"],
    answer: 3,
    explanation: "Hepatitis E virus (HEV): RNA virus, faeco-oral transmission, waterborne outbreaks in developing countries. Mortality is very high in pregnant women (15–25%) especially in 3rd trimester (fulminant hepatic failure). Hepatitis A is also faeco-oral but mild in pregnancy. HBV, HCV, HDV: blood-borne.",
  },
  {
    id: 639,
    subject: "Microbiology",
    stem: "Which organism causes primary atypical pneumonia and is treated with macrolides?",
    options: ["Streptococcus pneumoniae", "Mycoplasma pneumoniae", "Klebsiella pneumoniae", "Haemophilus influenzae"],
    answer: 1,
    explanation: "Mycoplasma pneumoniae: smallest self-replicating organism, no cell wall (intrinsically resistant to beta-lactams). Causes 'walking pneumonia' — mild, gradual onset, bilateral patchy infiltrates disproportionate to clinical signs. Cold agglutinins (IgM anti-I) positive. Treatment: macrolides (azithromycin), tetracyclines, fluoroquinolones.",
  },
  {
    id: 640,
    subject: "Microbiology",
    stem: "Ghon's complex in primary tuberculosis includes:",
    options: ["Cavitating apical lesion + pleural effusion", "Subpleural parenchymal focus + hilar lymphadenopathy (draining lymph nodes)", "Miliary pattern of small lesions throughout both lungs", "Apical scar + calcified lymph node"],
    answer: 1,
    explanation: "Ghon's complex = Ghon focus (subpleural parenchymal lesion, usually lower lobe) + calcified hilar/paratracheal lymph nodes (Lymph node component). This is the hallmark of primary TB and forms the Ranke complex when calcified. Ghon focus alone = Ghon focus. Reactivation TB affects apices.",
  },
  {
    id: 641,
    subject: "Microbiology",
    stem: "Tzanck smear showing multinucleated giant cells with intranuclear inclusions is characteristic of:",
    options: ["Molluscum contagiosum", "Herpes simplex/zoster infection", "Condyloma acuminatum", "Syphilitic chancre"],
    answer: 1,
    explanation: "Tzanck smear (scraping from the base of a vesicle): Herpes simplex (HSV-1, HSV-2) and Varicella-zoster virus (VZV) show multinucleated giant cells with nuclear moulding and Cowdry type A eosinophilic intranuclear inclusions. Used for rapid bedside diagnosis of herpetic lesions. Cannot distinguish HSV from VZV.",
  },
  {
    id: 642,
    subject: "Microbiology",
    stem: "India ink preparation is used to visualise which organism?",
    options: ["Candida albicans", "Cryptococcus neoformans", "Aspergillus fumigatus", "Mucor species"],
    answer: 1,
    explanation: "India ink preparation demonstrates the large polysaccharide capsule of Cryptococcus neoformans in CSF — capsule appears as clear halo against dark background. C. neoformans: encapsulated yeast, pigeon droppings, meningitis in immunocompromised (AIDS, CD4 <100). Treatment: Amphotericin B + Flucytosine (induction) → Fluconazole (maintenance).",
  },
  {
    id: 643,
    subject: "Microbiology",
    stem: "Which of the following organisms causes a positive urease test (Christensen's urease test)?",
    options: ["E. coli", "Salmonella typhi", "Helicobacter pylori", "Shigella"],
    answer: 2,
    explanation: "Helicobacter pylori is strongly urease-positive (urease hydrolyses urea to ammonia + CO₂ → raises pH). Used in CLO test (biopsy urease test), urea breath test (UBT), and serology. H. pylori causes peptic ulcer disease, gastric carcinoma, MALT lymphoma. Salmonella is urease-negative, Shigella is urease-negative.",
  },
  {
    id: 644,
    subject: "Microbiology",
    stem: "Which antigen is measured to screen for HIV infection?",
    options: ["HIV p17 antigen", "HIV p24 antigen", "HIV gp120 antibody", "HIV reverse transcriptase"],
    answer: 1,
    explanation: "4th generation HIV tests detect both HIV-1/2 antibodies AND p24 antigen (core capsid protein). p24 antigen appears within 2 weeks of infection (before antibodies develop — closing the 'window period'). RNA PCR detects HIV within 7–10 days. Western blot is confirmatory. CD4 count monitors disease progression.",
  },

  // ─── ANATOMY BATCH 3 (645–656) ────────────────────────────────────────────
  {
    id: 645,
    subject: "Anatomy",
    stem: "Which nerve is at risk during fracture of neck of fibula?",
    options: ["Tibial nerve", "Sural nerve", "Common peroneal (fibular) nerve", "Deep peroneal nerve"],
    answer: 2,
    explanation: "Common peroneal (fibular) nerve winds around the neck of fibula and is vulnerable to fracture or compression here. Injury → foot drop (inability to dorsiflex and evert foot), loss of sensation over dorsum of foot and lateral leg. Deep peroneal provides dorsiflexion; superficial peroneal provides eversion.",
  },
  {
    id: 646,
    subject: "Anatomy",
    stem: "Which muscle is the chief flexor of the forearm at the elbow joint?",
    options: ["Biceps brachii", "Brachialis", "Brachioradialis", "Pronator teres"],
    answer: 1,
    explanation: "Brachialis is the chief flexor of the forearm at the elbow in all positions (unlike biceps which supinates optimally). Brachialis originates from distal half of anterior humerus and inserts into coronoid process/ulnar tuberosity. It is a true workhorse — acts regardless of forearm rotation. Biceps is the powerful supinator + secondary flexor.",
  },
  {
    id: 647,
    subject: "Anatomy",
    stem: "Surface marking of McBurney's point lies on which muscle?",
    options: ["External oblique aponeurosis", "Right iliacus", "Right psoas", "Right ilioinguinal nerve territory"],
    answer: 0,
    explanation: "McBurney's point (junction lateral 1/3 and medial 2/3 of line from RASIS to umbilicus) overlies the external oblique aponeurosis / inguinal region. The gridiron (McBurney's) incision for appendicectomy splits external oblique, internal oblique, and transversus abdominis in the direction of their fibers at this point.",
  },
  {
    id: 648,
    subject: "Anatomy",
    stem: "Contents of the carpal tunnel include all EXCEPT:",
    options: ["Median nerve", "Flexor pollicis longus tendon", "Flexor carpi radialis tendon", "Flexor digitorum superficialis tendons"],
    answer: 2,
    explanation: "Carpal tunnel contents: Median nerve + 4 Flexor digitorum superficialis tendons + 4 Flexor digitorum profundus tendons + Flexor pollicis longus tendon = 9 structures + 1 nerve (10 total). Flexor carpi radialis (FCR) runs in its own separate fibro-osseous tunnel OUTSIDE the carpal tunnel. Ulnar nerve is NOT in the carpal tunnel (it passes through Guyon's canal).",
  },
  {
    id: 649,
    subject: "Anatomy",
    stem: "The ductus arteriosus connects which two vessels in fetal circulation?",
    options: ["Right ventricle to pulmonary veins", "Pulmonary trunk to descending aorta", "Superior vena cava to left atrium", "Ascending aorta to pulmonary artery"],
    answer: 1,
    explanation: "Ductus arteriosus: connects pulmonary trunk to descending aorta (distal to left subclavian artery), allowing blood to bypass non-breathing lungs. Normally closes within 24–72 hours after birth (functional closure = O₂↑ → prostaglandins ↓ → vasoconstriction). Indomethacin closes PDA; Prostaglandin E1 keeps PDA open (ductal-dependent lesions).",
  },
  {
    id: 650,
    subject: "Anatomy",
    stem: "Which layer of the scalp contains the emissary veins connecting scalp veins to intracranial sinuses?",
    options: ["Skin", "Aponeurosis (epicranial)", "Loose areolar tissue (DANGER layer)", "Pericranium"],
    answer: 2,
    explanation: "SCALP layers: Skin, Connective tissue (dense), Aponeurosis, Loose areolar tissue (DANGER layer), Pericranium. The loose areolar (4th) layer is the 'danger zone' — emissary veins here connect scalp veins to intracranial venous sinuses, allowing infection to spread intracranially. Haemorrhage in this layer spreads widely beneath the aponeurosis.",
  },
  {
    id: 651,
    subject: "Anatomy",
    stem: "Which structure forms the posterior wall of the rectus sheath below the arcuate line?",
    options: ["Transversus abdominis aponeurosis only", "All three aponeuroses pass anterior to rectus abdominis", "Posterior layer of internal oblique aponeurosis", "Transversalis fascia only (no aponeurosis)"],
    answer: 3,
    explanation: "Below the arcuate line (semicircular line of Douglas): all three aponeuroses (external oblique, internal oblique, transversus abdominis) pass ANTERIOR to rectus muscle. Posterior wall = only transversalis fascia + peritoneum. Above arcuate line: posterior wall formed by posterior layer of internal oblique + transversus abdominis aponeurosis.",
  },
  {
    id: 652,
    subject: "Anatomy",
    stem: "Which foramen does the inferior alveolar nerve pass through to reach the mandibular teeth?",
    options: ["Mental foramen", "Mandibular foramen", "Infraorbital foramen", "Incisive foramen"],
    answer: 1,
    explanation: "Inferior alveolar nerve (branch of V3/mandibular division of trigeminal) enters the mandible through the mandibular foramen on the medial aspect of mandibular ramus, runs through the mandibular canal, and exits as mental nerve through the mental foramen to supply skin of chin and lower lip. Anaesthetised for lower teeth (inferior alveolar block).",
  },
  {
    id: 653,
    subject: "Anatomy",
    stem: "Unhappy triad of O'Donoghue (sports injury) involves:",
    options: ["ACL + PCL + lateral meniscus", "MCL + ACL + medial meniscus", "LCL + ACL + lateral meniscus", "MCL + PCL + medial meniscus"],
    answer: 1,
    explanation: "Unhappy triad of O'Donoghue: MCL (medial collateral ligament) + ACL (anterior cruciate ligament) + medial meniscus — all torn together in valgus force injuries (external force on lateral knee pushing it medially). Common in football/soccer tackles. In new literature, lateral meniscus may be more commonly injured than medial with ACL tears.",
  },
  {
    id: 654,
    subject: "Anatomy",
    stem: "Which nerve supplies the skin over the medial aspect of the thigh?",
    options: ["Obturator nerve", "Femoral nerve", "Lateral femoral cutaneous nerve", "Ilioinguinal nerve"],
    answer: 0,
    explanation: "Obturator nerve (L2-L4) supplies adductors of the thigh (adductor longus, brevis, magnus, gracilis, pectineus) and skin over medial aspect of thigh (via cutaneous branch). Femoral nerve: anterior thigh and medial leg (via saphenous nerve). Lateral femoral cutaneous: lateral thigh. Ilioinguinal: inguinal region and medial thigh.",
  },
  {
    id: 655,
    subject: "Anatomy",
    stem: "Circle of Willis does NOT include:",
    options: ["Anterior communicating artery", "Posterior communicating artery", "Middle cerebral artery", "Basilar artery"],
    answer: 2,
    explanation: "Circle of Willis: Anterior cerebral (×2) + Anterior communicating artery + Internal carotid (×2) + Posterior communicating (×2) + Posterior cerebral (×2). Middle cerebral arteries are NOT part of the circle — they branch from the ICA but don't contribute to the circle's anastomosis. Basilar artery divides into two PCAs which are part of the circle.",
  },
  {
    id: 656,
    subject: "Anatomy",
    stem: "Muscle responsible for maintaining the longitudinal arch of the foot is:",
    options: ["Tibialis anterior", "Tibialis posterior", "Flexor hallucis longus", "Peroneus longus"],
    answer: 1,
    explanation: "Tibialis posterior is the primary dynamic support for the medial longitudinal arch — it inserts into the navicular tuberosity and multiple tarsal bones, pulling them up. Tibialis posterior insufficiency → flat foot (pes planus) with 'too many toes' sign on medial view. Plantar fascia and spring ligament are static supports.",
  },

  // ─── PHYSIOLOGY BATCH 3 (657–668) ─────────────────────────────────────────
  {
    id: 657,
    subject: "Physiology",
    stem: "Normal glomerular filtration rate (GFR) in a healthy adult is approximately:",
    options: ["60 mL/min", "90 mL/min", "125 mL/min", "180 mL/min"],
    answer: 2,
    explanation: "Normal GFR ≈ 125 mL/min (180 L/day filtration; only 1.5 L/day urine — 99% reabsorbed). Measured by inulin clearance (gold standard), estimated by creatinine clearance or CKD-EPI equation. CKD defined as GFR < 60 mL/min/1.73m² for ≥ 3 months. Autoregulation maintains GFR between MAP 80–180 mmHg.",
  },
  {
    id: 658,
    subject: "Physiology",
    stem: "Which part of the nephron is impermeable to water even in the presence of ADH?",
    options: ["Proximal convoluted tubule", "Descending limb of loop of Henle", "Thin ascending limb of loop of Henle", "Collecting duct"],
    answer: 2,
    explanation: "The ascending limb (both thin and thick) of the loop of Henle is ALWAYS impermeable to water — regardless of ADH. Thick ascending limb actively reabsorbs Na-K-2Cl (NKCC2), creating the medullary concentration gradient. This dilutes the tubular fluid ('diluting segment'). ADH acts on collecting duct to insert aquaporin-2 channels.",
  },
  {
    id: 659,
    subject: "Physiology",
    stem: "What is the normal P-R interval on ECG?",
    options: ["0.04–0.08 seconds", "0.10–0.12 seconds", "0.12–0.20 seconds", "0.20–0.40 seconds"],
    answer: 2,
    explanation: "Normal PR interval: 0.12–0.20 seconds (3–5 small squares). Represents atrial depolarisation (P wave) + AV nodal conduction delay. PR > 0.20 sec = 1st degree AV block. PR < 0.12 sec = pre-excitation (WPW syndrome — delta wave). QRS duration: 0.06–0.10 sec. QTc: <440 ms (males), <460 ms (females).",
  },
  {
    id: 660,
    subject: "Physiology",
    stem: "Bohr's effect on the oxygen-haemoglobin dissociation curve means:",
    options: ["Increased O₂ affinity of Hb in alkaline conditions", "Rightward shift of the curve with increased CO₂ and decreased pH", "Leftward shift of curve in response to 2,3-BPG", "Shift caused by temperature decrease"],
    answer: 1,
    explanation: "Bohr effect: increased CO₂ + decreased pH (acidosis) → RIGHT shift of O2-Hb dissociation curve → decreased O2 affinity → more O2 delivered to tissues. P50 increases (O2 released more readily). Remember R-CADET for right shift: Raised temp, CO₂, Acid (decreased pH), 2,3-DPG, Exercise, Sickle cell. Left shift: opposite conditions, fetal Hb.",
  },
  {
    id: 661,
    subject: "Physiology",
    stem: "Which hormone directly stimulates osteoclast activity?",
    options: ["Calcitonin", "PTH (indirectly via RANKL on osteoblasts)", "1,25-dihydroxyvitamin D", "Oestrogen"],
    answer: 1,
    explanation: "PTH acts on osteoblasts → induces expression of RANKL → RANKL binds RANK on pre-osteoclasts → osteoclast differentiation and activation → bone resorption → Ca²⁺↑. PTH does NOT have receptors on osteoclasts. Calcitonin inhibits osteoclasts directly. Oestrogen inhibits bone resorption (deficiency in menopause → osteoporosis).",
  },
  {
    id: 662,
    subject: "Physiology",
    stem: "Dead space in the lung includes all EXCEPT:",
    options: ["Trachea", "Bronchi and bronchioles", "Alveoli that are ventilated but not perfused", "Alveoli that are both ventilated and perfused"],
    answer: 3,
    explanation: "Dead space = areas ventilated but NOT participating in gas exchange. Anatomic dead space (~150 mL): conducting airways (trachea → terminal bronchioles). Alveolar dead space: ventilated alveoli with no perfusion (V/Q = ∞). Physiologic dead space = anatomic + alveolar. Alveoli that are both ventilated AND perfused are participating in gas exchange — NOT dead space.",
  },
  {
    id: 663,
    subject: "Physiology",
    stem: "Insulin resistance is defined as decreased response of target tissues to insulin. Which is the primary target tissue for this resistance?",
    options: ["Pancreatic beta cells", "Skeletal muscle, liver, and adipose tissue", "Brain", "Kidneys"],
    answer: 1,
    explanation: "Insulin resistance primarily affects skeletal muscle (75% of glucose disposal), liver (inhibits glycogenolysis/gluconeogenesis), and adipose tissue (inhibits lipolysis). Causes: obesity (excess FFA), inflammation (TNF-α, IL-6), decreased GLUT-4 translocation. Compensated by ↑ insulin secretion until beta cells fail → T2DM.",
  },
  {
    id: 664,
    subject: "Physiology",
    stem: "Which of the following is the functional unit of the kidney?",
    options: ["Renal corpuscle", "Loop of Henle", "Nephron (glomerulus + tubule + collecting duct)", "Juxtaglomerular apparatus"],
    answer: 2,
    explanation: "Nephron is the functional unit of the kidney (~1–1.3 million per kidney). Components: Glomerulus (filtration) + Bowman's capsule + Proximal convoluted tubule (bulk reabsorption) + Loop of Henle (concentration mechanism) + Distal convoluted tubule + Collecting duct (fine regulation by ADH and aldosterone).",
  },
  {
    id: 665,
    subject: "Physiology",
    stem: "Luteinizing hormone (LH) surge causes:",
    options: ["Follicular maturation", "Ovulation + luteinisation of granulosa cells (corpus luteum formation)", "Endometrial proliferation", "Suppression of FSH"],
    answer: 1,
    explanation: "Mid-cycle LH surge triggers ovulation (release of secondary oocyte) and luteinisation of granulosa cells → corpus luteum formation → progesterone production (dominant hormone of luteal phase). LH surge occurs ~36 hours before ovulation. FSH also spikes (smaller). Ovulation kits detect urinary LH surge.",
  },
  {
    id: 666,
    subject: "Physiology",
    stem: "Cardiac output is calculated as:",
    options: ["Heart rate × stroke volume", "Blood pressure / heart rate", "Total blood volume / circulation time", "Heart rate × end-diastolic volume"],
    answer: 0,
    explanation: "Cardiac output (CO) = Heart rate (HR) × Stroke volume (SV). Normal CO at rest ≈ 5 L/min (HR 70/min × SV 70 mL). Cardiac index = CO/BSA (~3.2 L/min/m²). Factors affecting SV: preload (Frank-Starling), afterload, contractility. Measured by Fick's principle, thermodilution, echocardiography.",
  },
  {
    id: 667,
    subject: "Physiology",
    stem: "Which receptor mediates the vasodilatory action of adrenaline at low doses?",
    options: ["Alpha-1 adrenoceptor", "Alpha-2 adrenoceptor", "Beta-2 adrenoceptor", "Beta-1 adrenoceptor"],
    answer: 2,
    explanation: "Beta-2 adrenoceptors in blood vessels of skeletal muscle and coronary arteries mediate vasodilation (Gs → cAMP → relaxation). At low adrenaline doses, beta-2 effect predominates → vasodilation → decreased diastolic BP + overall decreased total peripheral resistance. At high doses, alpha-1 vasoconstriction dominates.",
  },
  {
    id: 668,
    subject: "Physiology",
    stem: "What is the mechanism of action of aldosterone in the kidney?",
    options: ["Blocks Na-K-2Cl cotransporter in loop of Henle", "Increases Na⁺ reabsorption and K⁺ secretion in collecting duct via ENaC upregulation", "Inhibits carbonic anhydrase in proximal tubule", "Increases aquaporin-2 insertion in collecting duct"],
    answer: 1,
    explanation: "Aldosterone (mineralocorticoid) acts on principal cells of collecting duct: binds cytoplasmic receptors → gene transcription → increased ENaC (epithelial Na channels) + Na-K-ATPase → Na⁺ reabsorption ↑ + K⁺ secretion ↑ + H⁺ secretion ↑. Net: expand extracellular volume, raise BP, cause hypokalaemia and metabolic alkalosis. ADH increases aquaporin-2.",
  },

  // ─── BIOCHEMISTRY BATCH 3 (669–678) ──────────────────────────────────────
  {
    id: 669,
    subject: "Biochemistry",
    stem: "Which vitamin is required for gamma-carboxylation of clotting factors II, VII, IX, and X?",
    options: ["Vitamin C", "Vitamin D", "Vitamin K", "Vitamin E"],
    answer: 2,
    explanation: "Vitamin K (phytomenadione K1; menaquinone K2) is essential for gamma-carboxylation of glutamate residues in clotting factors II, VII, IX, X, and anticoagulants Protein C and S. Carboxylation allows Ca²⁺ binding and membrane anchoring. Warfarin blocks Vitamin K epoxide reductase, inhibiting this process.",
  },
  {
    id: 670,
    subject: "Biochemistry",
    stem: "Which enzyme is deficient in phenylketonuria (PKU)?",
    options: ["Phenylalanine transaminase", "Phenylalanine hydroxylase", "Tyrosine aminotransferase", "Homogentisate oxidase"],
    answer: 1,
    explanation: "PKU: deficiency of phenylalanine hydroxylase (PAH), which converts phenylalanine → tyrosine (requires BH4 as cofactor). Phenylalanine accumulates → toxic metabolites (phenylacetate, phenyllactate, phenylpyruvate in urine → 'mousy/musty' odour). Features: intellectual disability, hypopigmentation, eczema. Treated with Phe-restricted diet + BH4 supplementation (sapropterin).",
  },
  {
    id: 671,
    subject: "Biochemistry",
    stem: "LDL cholesterol is calculated using which formula (Friedewald's equation)?",
    options: ["LDL = Total cholesterol − HDL − (VLDL × 5)", "LDL = Total cholesterol − HDL − (Triglycerides/5)", "LDL = HDL + (Triglycerides/2.2)", "LDL = Total cholesterol × 0.45"],
    answer: 1,
    explanation: "Friedewald's equation: LDL = Total cholesterol − HDL − (Triglycerides ÷ 5). VLDL is estimated as Triglycerides/5 (in mg/dL) or TG/2.2 (in mmol/L). Valid only when TG < 400 mg/dL. At higher TG, direct LDL measurement or non-HDL cholesterol (Total chol − HDL) is used. Normal LDL < 100 mg/dL (optional <70 in very high-risk patients).",
  },
  {
    id: 672,
    subject: "Biochemistry",
    stem: "Which compound is the rate-limiting step in cholesterol biosynthesis?",
    options: ["Conversion of squalene to lanosterol", "HMG-CoA → Mevalonate (catalysed by HMG-CoA reductase)", "Acetyl-CoA → Acetoacetyl-CoA", "Farnesyl pyrophosphate → Squalene"],
    answer: 1,
    explanation: "HMG-CoA reductase (HMGCR) catalyses the rate-limiting step: HMG-CoA → Mevalonate. This is the target of statins (e.g., atorvastatin, rosuvastatin) which competitively inhibit HMGCR → reduced cholesterol synthesis → upregulation of LDL receptors → decreased plasma LDL. Regulated by cholesterol (negative feedback), insulin (↑), glucagon (↓).",
  },
  {
    id: 673,
    subject: "Biochemistry",
    stem: "Biotin (Vitamin B7) acts as a coenzyme for which of the following reactions?",
    options: ["Transamination", "Carboxylation reactions (CO₂ fixation)", "Oxidative decarboxylation", "Dehydration reactions"],
    answer: 1,
    explanation: "Biotin is the coenzyme for carboxylase enzymes (CO₂ fixation): Pyruvate carboxylase (pyruvate → OAA), Acetyl-CoA carboxylase (Acetyl-CoA → Malonyl-CoA, rate-limiting in FA synthesis), Propionyl-CoA carboxylase, and 3-Methylcrotonyl-CoA carboxylase. Avidin in raw egg white binds biotin → biotin deficiency (dermatitis, alopecia).",
  },
  {
    id: 674,
    subject: "Biochemistry",
    stem: "Alkaptonuria is caused by deficiency of which enzyme?",
    options: ["Fumarylacetoacetase", "Homogentisate oxidase (homogentisate 1,2-dioxygenase)", "Phenylalanine hydroxylase", "4-hydroxyphenylpyruvate dioxygenase"],
    answer: 1,
    explanation: "Alkaptonuria: deficiency of homogentisate oxidase → accumulation of homogentisic acid. Features: dark urine (turns black on standing/alkaline — homogentisic acid oxidised to alkapton), ochronosis (dark pigment in connective tissue — cartilage, tendons, sclerae), arthritis. Autosomal recessive. Nitisinone (NTBC) reduces homogentisic acid levels.",
  },
  {
    id: 675,
    subject: "Biochemistry",
    stem: "Which base is found in RNA but NOT in DNA?",
    options: ["Adenine", "Guanine", "Uracil", "Cytosine"],
    answer: 2,
    explanation: "RNA contains Uracil instead of Thymine. Uracil lacks the methyl group at C5 position that Thymine has. DNA contains Thymine (5-methyluracil). Both DNA and RNA contain Adenine, Guanine, and Cytosine. Purine bases: Adenine and Guanine. Pyrimidine bases: Cytosine, Thymine (DNA), Uracil (RNA).",
  },
  {
    id: 676,
    subject: "Biochemistry",
    stem: "Glucose-6-phosphate dehydrogenase (G6PD) deficiency leads to haemolysis because:",
    options: ["Reduced glycolysis leads to ATP depletion", "Reduced NADPH production → reduced glutathione → oxidative damage to RBC membrane", "Excessive lactate production", "Increased methemoglobin formation"],
    answer: 1,
    explanation: "G6PD catalyses the first step of the pentose phosphate pathway → generates NADPH → reduces glutathione (via glutathione reductase) → protects RBC from oxidative stress. G6PD deficiency → inadequate NADPH → oxidised glutathione → Heinz bodies (denatured Hb) → haemolysis triggered by oxidants (primaquine, dapsone, fava beans, infections).",
  },
  {
    id: 677,
    subject: "Biochemistry",
    stem: "Which amino acid is the precursor of serotonin (5-HT)?",
    options: ["Phenylalanine", "Histidine", "Tryptophan", "Tyrosine"],
    answer: 2,
    explanation: "Serotonin (5-hydroxytryptamine) is synthesised from Tryptophan: Tryptophan → 5-Hydroxytryptophan (by tryptophan hydroxylase, B6 cofactor) → Serotonin. Tryptophan is also the precursor for Melatonin and NAD⁺ (Niacin). Tyrosine is precursor for dopamine/noradrenaline/adrenaline and thyroid hormones. Histidine → histamine.",
  },
  {
    id: 678,
    subject: "Biochemistry",
    stem: "During fasting, which process provides glucose to the brain?",
    options: ["Glycogenolysis (immediate), then Gluconeogenesis (prolonged fasting)", "Glycolysis", "Fatty acid oxidation directly", "Ketolysis"],
    answer: 0,
    explanation: "Fasting glucose maintenance: 0–4h: Glycogenolysis (liver glycogen depleted in ~24h). 4–16h: Gluconeogenesis from alanine, lactate, glycerol, glutamine. >24h: Hepatic ketogenesis from FFA → ketone bodies used by brain (adapts to use ketones after 3–4 days). The brain exclusively uses glucose and ketones — cannot use fatty acids directly.",
  },

  // ─── PAEDIATRICS BATCH 3 (679–688) ────────────────────────────────────────
  {
    id: 679,
    subject: "Paediatrics",
    stem: "Birth weight doubles at what age in a healthy term infant?",
    options: ["3 months", "5 months", "6 months", "9 months"],
    answer: 1,
    explanation: "Growth milestones: Birth weight doubles by 5 months (~6 months in many references; 5 months is the standard for NEET). Triples by 1 year. Quadruples by 2 years. Length: +25 cm in 1st year. Head circumference: grows 2 cm/month in first 3 months. Weight gain: ~25–30 g/day in first 3 months.",
  },
  {
    id: 680,
    subject: "Paediatrics",
    stem: "Normal anterior fontanelle closes at what age?",
    options: ["6–8 months", "9–12 months", "18 months (range 12–18 months)", "24 months"],
    answer: 2,
    explanation: "Anterior fontanelle (diamond-shaped, largest): closes by 18 months (range 9–24 months). Posterior fontanelle (triangular): closes by 2–3 months. Late closure of AF: rickets, hypothyroidism, hydrocephalus, Down syndrome. Early closure: craniosynostosis. Bulging AF: raised ICP (meningitis, hydrocephalus). Sunken AF: dehydration.",
  },
  {
    id: 681,
    subject: "Paediatrics",
    stem: "Koplik's spots (pathognomonic of measles) appear on which mucosal surface?",
    options: ["Palate", "Buccal mucosa opposite lower molars", "Posterior pharyngeal wall", "Tongue"],
    answer: 1,
    explanation: "Koplik's spots: bluish-white spots on bright red buccal mucosa opposite lower molars — appear 1–2 days BEFORE the measles rash (prodrome: fever, cough, coryza, conjunctivitis = 3 C's). Pathognomonic of measles. Caused by Paramyxovirus (Morbillivirus). Rash: maculopapular, begins behind ears → spreads downward.",
  },
  {
    id: 682,
    subject: "Paediatrics",
    stem: "Which vaccine is given at birth in India under the National Immunisation Schedule?",
    options: ["BCG + OPV-0 + Hepatitis B birth dose", "BCG + OPV-0 + DPT", "BCG + OPV-0 + IPV", "BCG + Hepatitis B + IPV"],
    answer: 0,
    explanation: "India National Immunisation Programme at birth: BCG (Bacillus Calmette-Guérin for TB), OPV-0 (oral polio vaccine zero dose), and Hepatitis B birth dose (HBV). Given within 24 hours of birth. The rationale for OPV-0 is to prime the gut with Sabin strain before other vaccines. India achieved polio-free status in 2014.",
  },
  {
    id: 683,
    subject: "Paediatrics",
    stem: "Which organism most commonly causes neonatal sepsis in India?",
    options: ["Streptococcus agalactiae (Group B Strep)", "Klebsiella pneumoniae", "E. coli", "Listeria monocytogenes"],
    answer: 1,
    explanation: "In India and developing countries, Gram-negative organisms (Klebsiella, E. coli, Pseudomonas) are the most common cause of neonatal sepsis, unlike in Western countries where Group B Streptococcus (GBS) dominates. Klebsiella is the most common single organism in India. Early-onset sepsis (<72h): vertical transmission; late-onset (>72h): nosocomial.",
  },
  {
    id: 684,
    subject: "Paediatrics",
    stem: "Minimal change disease (nephrotic syndrome) in children is treated with:",
    options: ["Cyclophosphamide", "Cyclosporine", "Prednisolone (oral steroids)", "Rituximab"],
    answer: 2,
    explanation: "Minimal change disease (MCD) is the most common cause of nephrotic syndrome in children. First-line treatment: oral prednisolone (2 mg/kg/day × 4 weeks, then 1.5 mg/kg alternate day × 4 weeks). >90% respond. Steroid-resistant or frequently relapsing: cyclophosphamide, cyclosporine, mycophenolate, rituximab. MCD is podocytopathy — no deposit on EM.",
  },
  {
    id: 685,
    subject: "Paediatrics",
    stem: "Which chromosomal disorder causes Down syndrome?",
    options: ["Trisomy 18", "Monosomy X (Turner syndrome)", "Trisomy 21", "Trisomy 13"],
    answer: 2,
    explanation: "Down syndrome: Trisomy 21 (95% non-disjunction, 4% Robertsonian translocation, 1% mosaic). Features: flat facies, Brushfield spots, epicanthic folds, simian crease, hypotonia, congenital heart disease (AVSD most common), Hirschsprung's, intellectual disability. Risk increases with maternal age. Trisomy 18 = Edwards; Trisomy 13 = Patau.",
  },
  {
    id: 686,
    subject: "Paediatrics",
    stem: "Epiglottitis (most commonly caused by H. influenzae type b) presents with the following EXCEPT:",
    options: ["'Thumbprint' sign on lateral neck X-ray", "Drooling, dysphagia, and tripod positioning", "Barking cough", "High fever and toxic appearance"],
    answer: 2,
    explanation: "Acute epiglottitis (supraglottitis): H. influenzae type b (Hib). Features: sudden high fever, 4 D's (Drooling, Dysphagia, Dysphonia, Distress), tripod position, 'thumbprint' sign on lateral X-ray. Barking (seal-like) cough is characteristic of CROUP (laryngotracheobronchitis — parainfluenza virus), NOT epiglottitis. Do NOT examine throat (risk of laryngospasm).",
  },
  {
    id: 687,
    subject: "Paediatrics",
    stem: "Tetralogy of Fallot consists of all EXCEPT:",
    options: ["Pulmonary stenosis", "Ventricular septal defect (VSD)", "Overriding aorta", "Atrial septal defect (ASD)"],
    answer: 3,
    explanation: "Tetralogy of Fallot: 4 components — Pulmonary stenosis (infundibular/valvular), VSD (large, non-restrictive), Overriding aorta (over the VSD), Right ventricular hypertrophy (secondary to obstruction). ASD is NOT part of Tetralogy of Fallot (if present, it's 'Pentalogy of Fallot'). Most common cyanotic congenital heart disease after the neonatal period.",
  },
  {
    id: 688,
    subject: "Paediatrics",
    stem: "Which of the following is the first-line treatment for febrile seizures in children?",
    options: ["Intravenous phenytoin", "Oral phenobarbitone", "Intravenous/rectal diazepam", "Oral carbamazepine"],
    answer: 2,
    explanation: "Febrile seizures: most common seizures in children 6 months–5 years. Treatment of acute seizure: IV/rectal diazepam (benzodiazepine) or IV lorazepam. Paracetamol/antipyretics to reduce fever. Prophylactic anticonvulsants are generally NOT recommended for simple febrile seizures. Rectal diazepam at home for prolonged/recurrent episodes.",
  },

  // ─── ENT/OPHTHALMOLOGY BATCH 3 (689–696) ──────────────────────────────────
  {
    id: 689,
    subject: "ENT/Ophthalmology",
    stem: "Most common cause of unilateral sensorineural hearing loss in adults is:",
    options: ["Meniere's disease", "Acoustic neuroma (vestibular schwannoma)", "Presbycusis", "Noise-induced hearing loss"],
    answer: 1,
    explanation: "Acoustic neuroma (vestibular schwannoma) is the most common cause of unilateral sensorineural hearing loss in adults (at the CP angle). Arises from Schwann cells of vestibular division of CN VIII. Features: progressive unilateral SNHL + tinnitus + vertigo. Diagnosis: MRI with contrast (gadolinium). Treatment: surgical (translabyrinthine, middle fossa, retrosigmoid) or stereotactic radiosurgery.",
  },
  {
    id: 690,
    subject: "ENT/Ophthalmology",
    stem: "Cholesteatoma of the ear involves accumulation of:",
    options: ["Cholesterol crystals", "Keratinising squamous epithelium", "Granulation tissue", "Mucus-secreting epithelium"],
    answer: 1,
    explanation: "Cholesteatoma: accumulation of desquamating keratinising stratified squamous epithelium (not cholesterol, despite the name). Types: Congenital (behind intact TM) and Acquired (attic/posterior pars flaccida perforation with retraction pocket). Features: painless ear discharge + conductive hearing loss + destruction of ossicles + complications (facial palsy, meningitis, lateral sinus thrombosis).",
  },
  {
    id: 691,
    subject: "ENT/Ophthalmology",
    stem: "Rinne test: which finding suggests conductive hearing loss?",
    options: ["AC > BC (Rinne positive)", "BC > AC (Rinne negative)", "Both AC and BC equally reduced", "AC > BC with Weber lateralising to better ear"],
    answer: 1,
    explanation: "Rinne test: compares AC (air conduction, tuning fork in front of ear) vs BC (bone conduction, tuning fork on mastoid). Normally AC > BC = Rinne POSITIVE (normal). In conductive hearing loss: BC > AC = Rinne NEGATIVE (middle ear pathology). In SNHL: AC > BC (Rinne positive) but both are reduced. Weber lateralises to affected ear in conductive loss, to better ear in SNHL.",
  },
  {
    id: 692,
    subject: "ENT/Ophthalmology",
    stem: "Glaucoma is most commonly associated with:",
    options: ["Decreased aqueous production", "Reduced trabecular outflow → raised intraocular pressure", "Increased blood flow to optic disc", "Anterior chamber shallowing only"],
    answer: 1,
    explanation: "Open-angle glaucoma (POAG, most common): reduced outflow through the trabecular meshwork → raised IOP → progressive optic nerve damage → visual field loss (arcuate scotoma, nasal step, tunnel vision). Normal IOP: 10–21 mmHg. Treatment: prostaglandin analogues (latanoprost) as first-line → beta-blockers (timolol) → alpha-agonists → carbonic anhydrase inhibitors.",
  },
  {
    id: 693,
    subject: "ENT/Ophthalmology",
    stem: "Tonsillar grade III hypertrophy means the tonsil extends:",
    options: ["Behind the anterior pillar only", "Between the anterior pillar and midline", "To the midline but not beyond", "Beyond the midline, meeting the contralateral tonsil"],
    answer: 2,
    explanation: "Tonsillar grading: Grade I = within tonsillar pillars. Grade II = behind anterior pillar (25–50% of oropharyngeal width). Grade III = extending to midline (75%). Grade IV = 'kissing tonsils' meeting or overlapping beyond the midline (100%). Grade III–IV may cause OSA, dysphagia — indication for tonsillectomy.",
  },
  {
    id: 694,
    subject: "ENT/Ophthalmology",
    stem: "Which drug is used as a miotic in the treatment of acute angle-closure glaucoma?",
    options: ["Atropine", "Pilocarpine", "Phenylephrine", "Tropicamide"],
    answer: 1,
    explanation: "Pilocarpine (cholinergic muscarinic agonist) causes miosis (pupillary constriction) by contracting the sphincter pupillae → pulls peripheral iris away from trabecular meshwork → opens drainage angle → reduces IOP in acute angle-closure glaucoma. Atropine and tropicamide are mydriatics (dilate pupil → worsen ACG). Initial treatment: IV Acetazolamide + topical beta-blocker + pilocarpine.",
  },
  {
    id: 695,
    subject: "ENT/Ophthalmology",
    stem: "Ramsay Hunt syndrome involves infection of which ganglion?",
    options: ["Trigeminal ganglion (Gasserian)", "Geniculate ganglion of facial nerve (VZV reactivation)", "Otic ganglion", "Pterygopalatine ganglion"],
    answer: 1,
    explanation: "Ramsay Hunt syndrome (Herpes Zoster Oticus): VZV reactivation in the geniculate ganglion of CN VII. Features: painful vesicles in ear (external auditory canal, auricle, soft palate) + ipsilateral LMN facial palsy + sensorineural hearing loss + vertigo (CN VIII involvement). Treatment: Acyclovir + Prednisolone. Worse prognosis than Bell's palsy.",
  },
  {
    id: 696,
    subject: "ENT/Ophthalmology",
    stem: "Which eye condition causes a 'cherry-red spot' at the macula on fundoscopy?",
    options: ["Central retinal vein occlusion", "Central retinal artery occlusion", "Diabetic retinopathy", "Retinal detachment"],
    answer: 1,
    explanation: "Central retinal artery occlusion (CRAO): sudden painless loss of vision. Fundoscopy: pale, oedematous retina with 'cherry-red spot' (not strawberry-red) at the macula — because the foveal choroidal circulation (short posterior ciliary arteries) remains intact. Ophthalmological emergency. Treatment: immediate (IOP-lowering, globe massage, O₂ therapy) within 90 minutes.",
  },

  // ─── PSM / COMMUNITY MEDICINE BATCH 3 (697–704) ──────────────────────────
  {
    id: 697,
    subject: "PSM/Community Medicine",
    stem: "Sensitivity of a screening test is defined as:",
    options: ["True negatives / (True negatives + False positives)", "True positives / (True positives + False negatives)", "True positives / (True positives + False positives)", "True negatives / (True negatives + False negatives)"],
    answer: 1,
    explanation: "Sensitivity = TP/(TP + FN) = ability to correctly identify those WITH disease (true positive rate). High sensitivity = few false negatives → good for ruling OUT disease (SnNOUT). Specificity = TN/(TN + FP) = ability to correctly identify those WITHOUT disease. High specificity = few false positives → good for ruling IN disease (SpPIN).",
  },
  {
    id: 698,
    subject: "PSM/Community Medicine",
    stem: "Attributable risk (risk difference) measures:",
    options: ["Relative excess risk in exposed vs unexposed", "Absolute difference in incidence between exposed and unexposed groups", "Proportion of disease in population attributable to exposure", "Odds ratio in matched case-control studies"],
    answer: 1,
    explanation: "Attributable risk (AR) / Risk difference = Incidence rate in exposed − Incidence rate in unexposed. It measures the excess risk due to the exposure in absolute terms. Relative risk (RR) = Incidence exposed / Incidence unexposed. Population attributable risk (PAR) = AR × prevalence of exposure in population. AR helps assess public health impact of removing an exposure.",
  },
  {
    id: 699,
    subject: "PSM/Community Medicine",
    stem: "Herd immunity threshold for measles (with R0 of 12–18) is approximately:",
    options: ["50–60%", "70–80%", "92–95%", ">99%"],
    answer: 2,
    explanation: "Herd immunity threshold (HIT) = 1 − (1/R0). For measles, R0 = 12–18 → HIT = 1 − 1/15 ≈ 93%. Therefore, >92–95% vaccination coverage needed to prevent measles outbreaks. This is why measles remains a challenge — coverage must be extremely high. Polio: R0 ~6–7, HIT ~83–86%. COVID-19 (Delta): R0 ~6, HIT ~83%.",
  },
  {
    id: 700,
    subject: "PSM/Community Medicine",
    stem: "Which of the following is a 'P' component of the 5-A model for smoking cessation?",
    options: ["Pharmacotherapy alone", "Ask + Advise + Assess + Assist + Arrange (5 A's)", "Patch therapy", "Passive smoking education"],
    answer: 1,
    explanation: "5 A's model for smoking cessation: Ask (about tobacco use), Advise (strongly to quit), Assess (readiness to quit), Assist (with quitting — counselling, NRT, medications), Arrange (follow-up). NRT (nicotine replacement): patches, gum, lozenges. Pharmacotherapy: Varenicline (partial nicotinic agonist, most effective), Bupropion.",
  },
  {
    id: 701,
    subject: "PSM/Community Medicine",
    stem: "Which water-borne disease was historically controlled by John Snow's epidemiological investigation?",
    options: ["Typhoid fever", "Cholera (Broad Street pump investigation, 1854)", "Hepatitis A", "Dysentery"],
    answer: 1,
    explanation: "John Snow's 1854 investigation of the Broad Street cholera outbreak in London (removing the pump handle) is the founding study of epidemiology. He identified contaminated water as the source before the germ theory was established. This is the seminal example of descriptive epidemiology and an observational (quasi-experimental) study.",
  },
  {
    id: 702,
    subject: "PSM/Community Medicine",
    stem: "Nutritional blindness (xerophthalmia) is caused by deficiency of:",
    options: ["Vitamin C", "Vitamin D", "Vitamin A", "Vitamin B12"],
    answer: 2,
    explanation: "Vitamin A deficiency → xerophthalmia (dryness of conjunctiva/cornea) → Bitot's spots → corneal xerosis → corneal ulceration → keratomalacia → blindness. Also causes night blindness (nyctalopia — earliest symptom), follicular hyperkeratosis, increased susceptibility to infections. Leading cause of preventable blindness in children globally. Treatment: Vitamin A supplementation (WHO protocol).",
  },
  {
    id: 703,
    subject: "PSM/Community Medicine",
    stem: "Which study design provides the strongest level of evidence for causation?",
    options: ["Case-control study", "Randomised controlled trial (RCT)", "Cohort study", "Cross-sectional survey"],
    answer: 1,
    explanation: "Evidence hierarchy: SR/Meta-analysis of RCTs > RCT > Cohort study > Case-control > Cross-sectional > Case series > Expert opinion. RCT is the gold standard for establishing causation due to randomisation (eliminates selection bias, balances confounders). Cohort studies establish temporality. Case-control is efficient for rare diseases. Cross-sectional shows prevalence.",
  },
  {
    id: 704,
    subject: "PSM/Community Medicine",
    stem: "WHO definition of health is:",
    options: ["Absence of disease and infirmity", "Physical well-being only", "A state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity", "Ability to perform daily activities without limitations"],
    answer: 2,
    explanation: "WHO definition of health (1948 Constitution, Preamble): 'Health is a state of complete physical, mental and social well-being and not merely the absence of disease or infirmity.' Spiritual well-being was added later (1984 WHO definition: 'complete physical, mental, social and spiritual well-being'). Health as a fundamental human right was emphasised.",
  },

  // ─── FORENSIC MEDICINE BATCH 3 (705–712) ─────────────────────────────────
  {
    id: 705,
    subject: "Forensic Medicine",
    stem: "Rigor mortis begins after death in which order?",
    options: ["Legs first, then arms, then face", "Face and jaw → neck → upper limbs → trunk → lower limbs (Nysten's law)", "Upper limbs first, then lower limbs", "Appears simultaneously throughout the body"],
    answer: 1,
    explanation: "Rigor mortis (Nysten's law): begins in small muscles of face and jaw first → neck → upper limbs → trunk → lower limbs. Disappears in the same order. Onset: 2–6 hours after death. Maximum stiffness: 12 hours. Starts to resolve: 24–48 hours. Complete disappearance: 36–72 hours. Caused by depletion of ATP → actin-myosin cross-bridges cannot disengage.",
  },
  {
    id: 706,
    subject: "Forensic Medicine",
    stem: "Cadaveric spasm (instantaneous rigor) is seen in deaths from:",
    options: ["Drowning and severe convulsive conditions (excitement, panic)", "Poisoning with muscle relaxants", "Cold exposure deaths", "Natural cardiac deaths"],
    answer: 0,
    explanation: "Cadaveric spasm (instantaneous rigor mortis): occurs at moment of death in cases of extreme excitement, panic, or exhaustion — drowning (clutching vegetation), gunshot wounds (hand clasping weapon). NO intervening relaxation phase. Used as evidence of antemortem posture. Distinguished from stiffness by rigor alone — cadaveric spasm preserves last voluntary movement.",
  },
  {
    id: 707,
    subject: "Forensic Medicine",
    stem: "Spalding's sign on X-ray of a deceased fetus indicates:",
    options: ["Normal intrauterine positioning", "At least 5 days of intrauterine fetal death (IUFD)", "Fetal macrosomia", "Polyhydramnios"],
    answer: 1,
    explanation: "Spalding's sign: overlapping of fetal skull bones on X-ray due to softening and collapse of intracranial contents after intrauterine fetal death. A radiological sign of IUFD. Appears approximately 4–7 days after fetal death. Other signs of IUFD on X-ray: Angulation of spine (hyperflexion), Gas in cardiovascular system (Robert's sign), Exaggerated curvature of spine.",
  },
  {
    id: 708,
    subject: "Forensic Medicine",
    stem: "Hanging leaves which ligature mark on neck?",
    options: ["Horizontal, complete (encircling), at the level of thyroid cartilage", "Oblique, incomplete (not encircling), highest at the point of suspension, at or above thyroid cartilage", "Deep vertical abrasions", "Horizontal bruising at hyoid level"],
    answer: 1,
    explanation: "Judicial hanging / suicidal hanging: Ligature mark is OBLIQUE (inverted V-shape), INCOMPLETE (does not encircle — leaves a gap at point of suspension), situated ABOVE the thyroid cartilage at the level of the chin or below it. In homicidal strangulation by ligature: mark is HORIZONTAL, COMPLETE, below the thyroid cartilage.",
  },
  {
    id: 709,
    subject: "Forensic Medicine",
    stem: "Benzidine test (Kastle-Meyer test) is used to detect:",
    options: ["Semen", "Blood (haemoglobin)", "Saliva", "Arsenic"],
    answer: 1,
    explanation: "Kastle-Meyer test (also Benzidine test): preliminary test for the presence of blood. Phenolphthalein + H₂O₂ → pink colour in presence of haemoglobin (peroxidase activity). High sensitivity but low specificity (some plant materials give false positive). Confirmatory: Luminol (chemiluminescence — glows blue), Teichmann test (haematin crystals), DNA analysis.",
  },
  {
    id: 710,
    subject: "Forensic Medicine",
    stem: "Putrefaction is primarily caused by which group of organisms?",
    options: ["Aerobic bacteria only", "Anaerobic bacteria (Clostridium, Bacteroides) predominantly in the large intestine", "Fungi", "Protozoa"],
    answer: 1,
    explanation: "Putrefaction: decomposition of soft tissues by bacteria. Starts in the large intestine (where anaerobes are most abundant — Clostridium, Bacteroides, E. coli). First external sign: greenish discolouration of right iliac fossa (over caecum/appendix). Marbling = gas tracking along blood vessels. Rate affected by: temperature (fastest in tropical heat), humidity, obesity, cause of death.",
  },
  {
    id: 711,
    subject: "Forensic Medicine",
    stem: "Widmark's formula is used to calculate:",
    options: ["Blood alcohol concentration from amount consumed", "Time of death from body temperature", "Dose of poison from symptoms", "Age estimation from bone density"],
    answer: 0,
    explanation: "Widmark's formula: C = A / (r × W) where C = BAC (g/dL), A = total alcohol absorbed (g), r = Widmark factor (0.7 for males, 0.6 for females — body water proportion), W = body weight (kg). Used to estimate blood alcohol concentration from known alcohol intake. Also used retrospectively to calculate how much was drunk given a known BAC.",
  },
  {
    id: 712,
    subject: "Forensic Medicine",
    stem: "Section 304A of the Indian Penal Code (IPC) deals with:",
    options: ["Grievous hurt", "Causing death by negligence", "Abetment of suicide", "Murder"],
    answer: 1,
    explanation: "IPC Section 304A: Causing death by negligence — applicable in cases of medical negligence leading to patient death. Punishment: imprisonment up to 2 years + fine. The act must be negligent or rash, not intentional. IPC 304 = Culpable homicide. IPC 302 = Murder. IPC 306 = Abetment of suicide. Medical practitioners commonly charged under 304A.",
  },

  // ─── INI-CET MAY 2026 RECALLED QUESTIONS ──────────────────────────────────

  // ── SURGERY ────────────────────────────────────────────────────────────────
  {
    id: 713,
    subject: "Surgery",
    stem: "FNAC of a thyroid nodule reveals follicular cells. What is the most appropriate next step in management?",
    options: ["Total thyroidectomy", "Hemithyroidectomy", "Radioiodine ablation", "Repeat FNAC after 6 months"],
    answer: 1,
    explanation: "Follicular cells on cytology (Bethesda IV) represent follicular neoplasm and cannot distinguish adenoma from carcinoma. Hemithyroidectomy (thyroid lobectomy) is the standard surgical approach — it provides both diagnosis and treatment. Total thyroidectomy is reserved if malignancy is confirmed on final histology.",
  },
  {
    id: 714,
    subject: "Surgery",
    stem: "According to the AAST organ injury scale for colon trauma, Grade III injury is defined as:",
    options: ["Mucosal laceration only", "Full-thickness laceration ≤25% of circumference", "Full-thickness laceration >50% of circumference", "Complete transection of the colon"],
    answer: 2,
    explanation: "AAST Colon Injury Scale: Grade I = contusion/haematoma; Grade II = laceration <50% circumference; Grade III = laceration ≥50% circumference without transection; Grade IV = complete transection; Grade V = transection with tissue loss. Grade III signifies >50% laceration without complete separation.",
  },
  {
    id: 715,
    subject: "Surgery",
    stem: "A clinically significant rectocele is defined as a bulge of:",
    options: [">1 cm beyond the vaginal introitus", ">2 cm beyond the vaginal introitus", ">3 cm beyond the vaginal introitus", ">4 cm beyond the vaginal introitus"],
    answer: 1,
    explanation: "A rectocele is a posterior vaginal wall prolapse caused by weakening of the rectovaginal septum. Clinically significant rectocele is defined as a bulge >2 cm beyond the vaginal introitus on straining. Symptomatic rectoceles (digitation to defaecate, incomplete emptying) may require surgical repair.",
  },
  {
    id: 716,
    subject: "Surgery",
    stem: "During laparoscopic inguinal hernia repair (TEP/TAPP), the minimum distance of dissection required to adequately expose the entire myopectineal orifice is:",
    options: ["1 cm medial and lateral to the defect", "2 cm beyond all edges of the myopectineal orifice", "3 cm beyond Cooper's ligament", "5 cm from the midline"],
    answer: 1,
    explanation: "Adequate laparoscopic hernia repair requires dissection at least 2 cm beyond all edges of the myopectineal orifice (Fruchaud's orifice). This ensures complete mesh coverage of all potential hernia sites (direct, indirect, femoral) and reduces recurrence risk.",
  },
  {
    id: 717,
    subject: "Surgery",
    stem: "A biopsy from the lower oesophagus shows replacement of normal squamous epithelium by columnar epithelium with goblet cells. This finding is characteristic of:",
    options: ["Reflux oesophagitis", "Barrett's oesophagus", "Achalasia cardia", "Eosinophilic oesophagitis"],
    answer: 1,
    explanation: "Barrett's oesophagus is defined by intestinal metaplasia of the distal oesophagus — normal squamous epithelium is replaced by specialised intestinal-type columnar epithelium containing goblet cells (acid mucin-containing, stain with Alcian blue at pH 2.5). It is a premalignant condition predisposing to oesophageal adenocarcinoma.",
  },
  {
    id: 718,
    subject: "Surgery",
    stem: "Which clinical feature best distinguishes mechanical bowel obstruction from paralytic ileus?",
    options: ["Abdominal distension", "Failure to pass flatus", "Colicky abdominal pain with high-pitched (tinkling) bowel sounds", "Vomiting"],
    answer: 2,
    explanation: "Mechanical obstruction: colicky pain, high-pitched/tinkling bowel sounds, no flatus/faeces after obstruction level. Paralytic ileus: silent abdomen (absent bowel sounds), diffuse distension, air throughout including rectum on plain X-ray. The presence of colicky pain + increased bowel sounds strongly favours mechanical obstruction.",
  },
  {
    id: 719,
    subject: "Surgery",
    stem: "A trauma patient opens eyes spontaneously, makes incomprehensible sounds, and localises to painful stimuli. What is the Glasgow Coma Scale (GCS) score?",
    options: ["9", "10", "11", "12"],
    answer: 2,
    explanation: "GCS = Eye (E) + Verbal (V) + Motor (M). Spontaneous eye opening = E4; Incomprehensible sounds = V2; Localises pain = M5. Total = 4+2+5 = 11. GCS ≤8 defines coma and is an indication for airway protection (intubation).",
  },
  {
    id: 720,
    subject: "Surgery",
    stem: "Courvoisier's law states that a palpable, non-tender gallbladder with obstructive jaundice is most likely due to:",
    options: ["Choledocholithiasis", "Periampullary carcinoma or carcinoma head of pancreas", "Primary sclerosing cholangitis", "Carcinoma of the gallbladder"],
    answer: 1,
    explanation: "Courvoisier's law: in obstructive jaundice, a palpable non-tender gallbladder is unlikely to be due to gallstones (chronic inflammation causes a fibrotic, non-distensible gallbladder). It most likely indicates malignant obstruction — periampullary carcinoma, cholangiocarcinoma, or carcinoma of the head of the pancreas.",
  },
  {
    id: 721,
    subject: "Surgery",
    stem: "Total mesorectal excision (TME) for rectal cancer involves:",
    options: ["Blunt finger dissection of the mesorectum", "Sharp dissection en bloc within the mesorectal fascial envelope", "Diathermy transection of the mesorectum", "Stapled low anterior resection without mesorectal dissection"],
    answer: 1,
    explanation: "TME (Heald technique) involves sharp dissection under direct vision within the areolar tissue plane between the visceral mesorectal fascia and the parietal pelvic fascia, removing the rectum and its mesorectum as an intact package. This reduces local recurrence rates from ~30% to <10% by ensuring complete lymphovascular clearance.",
  },
  {
    id: 722,
    subject: "Surgery",
    stem: "In a mass casualty or field trauma setting, the updated ATLS approach prioritises management in the following order:",
    options: ["A-B-C-D-E (airway first)", "C-A-B-C-D-E (catastrophic haemorrhage first)", "B-C-A-D-E (breathing first)", "D-C-A-B-E (disability first)"],
    answer: 1,
    explanation: "The current military/TCCC and ATLS approach uses C-ABCDE: Catastrophic haemorrhage control (tourniquet/haemostatic dressings) precedes Airway, Breathing, Circulation, Disability, Exposure. Exsanguination from a compressible wound is the most immediately reversible cause of preventable trauma death.",
  },
  {
    id: 723,
    subject: "Surgery",
    stem: "Timing of prophylactic antibiotic administration for elective GI surgery to achieve optimal tissue levels at incision:",
    options: ["Immediately on induction of anaesthesia", "30–60 minutes before skin incision", "2 hours before surgery", "At the time of wound closure"],
    answer: 1,
    explanation: "Surgical antibiotic prophylaxis (typically Cefazolin 1–2 g IV) should be given 30–60 minutes before skin incision to ensure adequate tissue concentrations at the time of bacterial contamination. Doses are re-administered every 3–4 hours for prolonged surgeries. Administering too early or too late increases SSI risk.",
  },
  {
    id: 724,
    subject: "Surgery",
    stem: "A 55-year-old patient with atrial fibrillation presents with severe abdominal pain out of proportion to examination findings and raised serum lactate. The investigation of choice to confirm acute mesenteric ischaemia is:",
    options: ["Plain X-ray abdomen", "MRI abdomen", "CT angiography of mesenteric vessels", "Colonoscopy"],
    answer: 2,
    explanation: "CT angiography (CTA) is the gold standard investigation for acute mesenteric ischaemia — it can demonstrate the site of arterial/venous occlusion, bowel wall thickening, pneumatosis intestinalis, and portal venous gas. Classic triad: pain out of proportion, raised lactate, predisposing condition (AF, atherosclerosis, low-flow state).",
  },
  {
    id: 725,
    subject: "Surgery",
    stem: "Prostate cancer with a Gleason score of 4+4=8 belongs to which Grade Group?",
    options: ["Grade Group 2", "Grade Group 3", "Grade Group 4", "Grade Group 5"],
    answer: 2,
    explanation: "ISUP Grade Groups: GG1 = Gleason ≤6; GG2 = Gleason 3+4=7; GG3 = Gleason 4+3=7; GG4 = Gleason 4+4 or 3+5 or 5+3 (score 8); GG5 = Gleason 9–10. Gleason 4+4=8 is Grade Group 4 — high-risk disease. Grade Group correlates with biochemical recurrence risk post-treatment.",
  },
  {
    id: 726,
    subject: "Surgery",
    stem: "The most important predisposing factor for caecal volvulus is:",
    options: ["High-fibre diet", "Chronic constipation", "Previous pelvic surgery", "Inflammatory bowel disease"],
    answer: 2,
    explanation: "Caecal volvulus requires an abnormally mobile caecum with a long mesentery — this is most commonly caused by previous pelvic or abdominal surgery resulting in adhesions that act as a fulcrum. Other risk factors include pregnancy, distal colonic obstruction, and congenital malrotation. It accounts for 10% of colonic volvulus.",
  },
  {
    id: 727,
    subject: "Surgery",
    stem: "LIFT (Ligation of Intersphincteric Fistula Tract) procedure is performed for anal fistula because it:",
    options: ["Completely divides the internal sphincter", "Is a sphincter-preserving technique with good continence outcomes", "Requires a permanent seton", "Is only indicated for simple superficial fistulas"],
    answer: 1,
    explanation: "LIFT (Parks 2007 modification) identifies the intersphincteric plane, ligates the fistula tract, and removes the tract segment in the intersphincteric space — all without cutting any sphincter muscle. It preserves continence, is suitable for transsphincteric fistulas, and has ~70–80% success rates. Alternatives: fistulotomy (simple fistulas), VAAFT, fibrin glue.",
  },

  // ── PAEDIATRICS ────────────────────────────────────────────────────────────
  {
    id: 728,
    subject: "Paediatrics",
    stem: "A 7-month-old girl has normal development up to 5 months followed by regression of milestones. She now shows repetitive hand-wringing movements and loss of purposeful hand use. The most likely diagnosis is:",
    options: ["Autism spectrum disorder", "Rett syndrome", "Childhood disintegrative disorder", "Angelman syndrome"],
    answer: 1,
    explanation: "Rett syndrome (MECP2 mutation, X-linked, almost exclusively in females): normal development to 6–18 months → regression phase with loss of purposeful hand use and acquisition of stereotyped hand-wringing/washing movements → pseudo-stationary phase → late motor deterioration. Key features: hand stereotypies, breath-holding spells, seizures, scoliosis.",
  },
  {
    id: 729,
    subject: "Paediatrics",
    stem: "A 3-month-old infant presents with prolonged neonatal jaundice and is also noted to have an umbilical hernia, large fontanelle, and constipation. The most likely underlying diagnosis is:",
    options: ["Biliary atresia", "Neonatal hepatitis", "Congenital hypothyroidism", "G6PD deficiency"],
    answer: 2,
    explanation: "Congenital hypothyroidism classically presents with prolonged jaundice (decreased bilirubin conjugation), umbilical hernia, large anterior fontanelle, macroglossia, constipation, hypotonia, and coarse features. It is detected by neonatal screening (TSH/T4). Early thyroxine replacement prevents intellectual disability.",
  },
  {
    id: 730,
    subject: "Paediatrics",
    stem: "Which of the following is NOT a feature of Kawasaki disease?",
    options: ["Bilateral non-purulent conjunctival injection", "Purulent conjunctivitis", "Strawberry tongue with lip cracking", "Desquamation of fingers and toes"],
    answer: 1,
    explanation: "Kawasaki disease criteria (CRASH mnemonic): Conjunctivitis (bilateral, non-purulent/non-exudative) — purulent discharge is NOT seen; Rash (polymorphic); Adenopathy (cervical >1.5 cm); Strawberry tongue, cracked lips; Hands/feet swelling then desquamation. Fever >5 days is required. Purulent conjunctivitis suggests bacterial infection.",
  },
  {
    id: 731,
    subject: "Paediatrics",
    stem: "A full-term neonate is asymptomatic at 2 hours of age with a blood glucose of 32 mg/dL (>20 but <40 mg/dL). The most appropriate initial management is:",
    options: ["IV dextrose bolus", "Breastfeed (or oral dextrose gel) and recheck", "IM glucagon injection", "Commence 10% dextrose infusion"],
    answer: 1,
    explanation: "Asymptomatic neonatal hypoglycaemia (glucose 20–40 mg/dL) in a well neonate is managed initially with a feed (breastfeed or formula), followed by repeat glucose check 30 minutes later. IV dextrose is reserved for symptomatic hypoglycaemia (jitteriness, seizures, lethargy) or glucose <20 mg/dL, or failure to respond to oral feeding.",
  },
  {
    id: 732,
    subject: "Paediatrics",
    stem: "Which condition causes differential cyanosis (cyanosis in the lower body with normal upper body colour)?",
    options: ["Tetralogy of Fallot", "Transposition of great arteries", "Large PDA with reversal (Eisenmenger physiology)", "Coarctation of the aorta"],
    answer: 2,
    explanation: "Differential cyanosis (lower limbs cyanosed, upper limbs pink): occurs in large PDA with pulmonary hypertension causing reversal (Eisenmenger). Deoxygenated blood from RV shunts through PDA into descending aorta → lower body cyanosis. Upper body (pre-ductal) receives oxygenated blood from LV. Reverse differential cyanosis (upper cyanosed) occurs in TGA + PDA.",
  },
  {
    id: 733,
    subject: "Paediatrics",
    stem: "A 20-month-old child speaks only 1 meaningful word and does not follow simple commands. The most appropriate first step in evaluation is:",
    options: ["MRI brain", "Chromosomal karyotype", "Detailed hearing evaluation (audiometry/BERA)", "Electroencephalogram (EEG)"],
    answer: 2,
    explanation: "Language delay evaluation begins with hearing assessment — conductive/sensorineural hearing loss is the most common treatable cause of speech delay. Normal milestones: 12 months = 1 word; 18 months = 10–20 words; 24 months = 2-word phrases. At 20 months with 1 word and no command following, hearing loss must be excluded before further workup.",
  },
  {
    id: 734,
    subject: "Paediatrics",
    stem: "In a family pedigree showing autosomal dominant inheritance, some individuals carry the disease allele but show no clinical features. This phenomenon is called:",
    options: ["Variable expressivity", "Incomplete penetrance", "Genetic anticipation", "Codominance"],
    answer: 1,
    explanation: "Penetrance is the proportion of individuals with a genotype who show the associated phenotype. Incomplete penetrance means some carriers never manifest disease (appear as 'skipped generations'). Variable expressivity means all affected individuals show the disease but with different severities. Examples of incomplete penetrance: BRCA1/2, retinoblastoma, HNPCC.",
  },

  // ── OBG ───────────────────────────────────────────────────────────────────
  {
    id: 735,
    subject: "OBG",
    stem: "Which complication is NOT seen in monochorionic diamniotic (MCDA) twin pregnancies?",
    options: ["Twin-to-twin transfusion syndrome", "Selective intrauterine growth restriction", "Cord entanglement", "Twin anaemia-polycythaemia sequence"],
    answer: 2,
    explanation: "Cord entanglement occurs in monoamniotic (MCMA) twins — both twins share a single amniotic sac and their cords can intertwine, causing fetal death. MCDA twins share a placenta but have separate amniotic sacs, so cord entanglement cannot occur. TTTS, TAPS, and sIUGR all occur in MCDA due to inter-twin vascular anastomoses.",
  },
  {
    id: 736,
    subject: "OBG",
    stem: "A 17-year-old presents with primary amenorrhoea, absent uterus on ultrasound, normal female breast development, and sparse pubic hair. Testosterone levels are in the male range. The most likely diagnosis is:",
    options: ["Turner syndrome (45,XO)", "Androgen insensitivity syndrome (46,XY)", "Mullerian agenesis (MRKH syndrome)", "Premature ovarian insufficiency"],
    answer: 1,
    explanation: "Complete Androgen Insensitivity Syndrome (CAIS): 46,XY karyotype, mutated androgen receptor → testosterone cannot act. Result: female external phenotype, normal breasts (from oestrogen), absent/sparse pubic hair, absent uterus (Müllerian regression by AMH still occurs), blind vaginal pouch. Gonads are testes (intra-abdominal — risk of malignancy, prophylactic gonadectomy recommended post-puberty).",
  },
  {
    id: 737,
    subject: "OBG",
    stem: "In 17-hydroxylase deficiency (a form of congenital adrenal hyperplasia), the expected hormone profile is:",
    options: ["High cortisol, low aldosterone, high testosterone", "Low cortisol, high aldosterone, low sex steroids (testosterone/oestrogen)", "Low cortisol, low aldosterone, high androgens", "High cortisol, high aldosterone, high testosterone"],
    answer: 1,
    explanation: "17α-hydroxylase converts pregnenolone/progesterone to 17-OH compounds needed for cortisol and sex steroid synthesis. Deficiency → shunting to mineralocorticoid pathway → high aldosterone (hypertension, hypokalaemia), low cortisol (high ACTH), low sex steroids (primary amenorrhoea in 46,XX; undervirilisation in 46,XY). Presents with hypertension + delayed puberty.",
  },
  {
    id: 738,
    subject: "OBG",
    stem: "A primigravida at 38 weeks develops shoulder dystocia after delivery of the fetal head. The first manoeuvre to be performed is:",
    options: ["Zavanelli manoeuvre (cephalic replacement)", "McRoberts manoeuvre with suprapubic pressure", "Delivery of posterior arm", "Fundal pressure (Kristeller)"],
    answer: 1,
    explanation: "HELPERR mnemonic for shoulder dystocia: Help, Episiotomy, Legs (McRoberts), Pressure (suprapubic), Enter (Rubin II/Woods screw), Remove posterior arm, Roll (all-fours). McRoberts (hyperflexion of maternal thighs) + suprapubic pressure is always the FIRST manoeuvre — it flattens lumbar lordosis, rotates symphysis pubis superiorly, and dislodges the anterior shoulder. Fundal pressure is absolutely contraindicated.",
  },
  {
    id: 739,
    subject: "OBG",
    stem: "A pregnant woman at 28 weeks complains of dyspnoea and hyperventilation. Arterial blood gas shows PaCO₂ of 28 mmHg. The main cause of physiological hyperventilation in normal pregnancy is:",
    options: ["Increased oestrogen stimulating respiratory drive", "Progesterone acting on central respiratory centres to increase ventilation", "Mechanical diaphragm elevation by the gravid uterus", "Increased 2,3-DPG causing rightward oxygen dissociation curve shift"],
    answer: 1,
    explanation: "Progesterone is the primary driver of physiological hyperventilation in pregnancy — it acts on the medullary respiratory centre, increasing sensitivity to CO₂ and directly stimulating breathing. This results in increased tidal volume (not rate), reduced PaCO₂ (~30 mmHg), compensated respiratory alkalosis, and chronic metabolic compensation (reduced HCO₃⁻).",
  },
  {
    id: 740,
    subject: "OBG",
    stem: "A high-risk patient (prior preeclampsia, antiphospholipid syndrome) is 11 weeks pregnant. The most evidence-based intervention to prevent preeclampsia in this patient is:",
    options: ["Low molecular weight heparin throughout pregnancy", "Calcium supplementation 2 g/day", "Low-dose aspirin (75–150 mg) started at 12–16 weeks gestation", "Vitamin C and E supplementation"],
    answer: 2,
    explanation: "Low-dose aspirin (75–150 mg/day) started at 11–16 weeks reduces preeclampsia risk by ~60–70% in high-risk women (ASPRE trial). Mechanism: inhibits thromboxane A₂ > prostacyclin, improving placentation. NICE/ACOG recommend aspirin for women with ≥1 high-risk factor (prior preeclampsia, CKD, autoimmune disease, diabetes, multifetal pregnancy) or ≥2 moderate-risk factors.",
  },
  {
    id: 741,
    subject: "OBG",
    stem: "A patient presents with vaginal itching, frothy greenish discharge, a positive whiff test, and motile trophozoites seen on wet preparation. The diagnosis is:",
    options: ["Bacterial vaginosis", "Vulvovaginal candidiasis", "Trichomonas vaginalis infection", "Chlamydial cervicitis"],
    answer: 2,
    explanation: "Trichomonas vaginalis: STI caused by flagellated protozoan. Features: frothy, foul-smelling, yellow-green discharge; vulvovaginal itching; strawberry cervix (colpitis macularis); positive whiff test (amines released with KOH — also seen in BV); pH >4.5; wet prep shows motile pear-shaped trophozoites with flagella. Treatment: Metronidazole 2 g single dose (both partners).",
  },
  {
    id: 742,
    subject: "OBG",
    stem: "The Pearl Index is used to express:",
    options: ["Probability of pregnancy in a single unprotected intercourse", "Number of pregnancies per 100 woman-years of contraceptive use", "Failure rate of contraception per 1000 cycles", "Cumulative pregnancy rate over 5 years"],
    answer: 1,
    explanation: "Pearl Index = (Number of accidental pregnancies / Total months of exposure) × 1200. It expresses contraceptive failure as pregnancies per 100 woman-years of use. Lower Pearl Index = more effective contraception. Vasectomy ~0.1; Combined OCP ~0.3 (perfect use); Condom ~2 (perfect use); Natural family planning ~2–25.",
  },
  {
    id: 743,
    subject: "OBG",
    stem: "Which of the following is a PROBABLE sign of pregnancy?",
    options: ["Amenorrhoea", "Morning sickness", "Hegar's sign", "Breast tingling"],
    answer: 2,
    explanation: "Signs of pregnancy — Presumptive (subjective): amenorrhoea, nausea, breast changes, urinary frequency, Chadwick's sign (bluish discolouration). Probable (objective, examiner can detect): Hegar's sign (softening of isthmus), Goodell's sign, ballottement, uterine enlargement, positive pregnancy test. Positive (certain): fetal heart tones, fetal movements felt by examiner, ultrasound evidence.",
  },

  // ── PSM / COMMUNITY MEDICINE ──────────────────────────────────────────────
  {
    id: 744,
    subject: "PSM/Community Medicine",
    stem: "An epidemiological study examines the relationship between national fat consumption per capita and national heart disease mortality rates across 30 countries. This is an example of:",
    options: ["Cohort study", "Cross-sectional study", "Ecological (correlational) study", "Case-control study"],
    answer: 2,
    explanation: "An ecological study uses populations or groups (countries, regions, time periods) as the unit of analysis, not individuals. Exposure and outcome data are aggregate. Advantage: cheap, uses existing data. Major limitation: ecological fallacy (group-level associations may not reflect individual-level relationships). Examples: Seven Countries Study (Keys, fat intake vs CHD).",
  },
  {
    id: 745,
    subject: "PSM/Community Medicine",
    stem: "In a hypertension-stroke study, the Population Attributable Risk (PAR%) represents:",
    options: ["The excess risk of stroke in hypertensives compared to normotensives", "The proportion of stroke incidence in the total population attributable to hypertension", "The relative risk of stroke for hypertensives versus normotensives", "The number of strokes prevented per 1000 treated hypertensives"],
    answer: 1,
    explanation: "Population Attributable Risk % = (Incidence in total population − Incidence in unexposed) / Incidence in total population × 100. It measures how much of the disease burden in the entire population is due to the risk factor. Used for public health planning — high PAR means eliminating the exposure would substantially reduce disease in the population.",
  },
  {
    id: 746,
    subject: "PSM/Community Medicine",
    stem: "A screening test for a disease detects 90 true positives and 50 false positives. The Positive Predictive Value (PPV) of the test is approximately:",
    options: ["55%", "60%", "64%", "75%"],
    answer: 2,
    explanation: "PPV = True Positives / (True Positives + False Positives) = 90 / (90+50) = 90/140 = 0.6428 ≈ 64.3%. PPV depends on disease prevalence — in a population with low prevalence, even a highly specific test will have a low PPV. NPV = TN/(TN+FN). Sensitivity = TP/(TP+FN). Specificity = TN/(TN+FP).",
  },
  {
    id: 747,
    subject: "PSM/Community Medicine",
    stem: "Which epidemic curve pattern characterises a propagated (progressive source) epidemic?",
    options: ["A single sharp peak followed by rapid decline", "Multiple successive waves with each peak larger than the last", "A plateau shape lasting for the incubation period", "A J-shaped curve with rapid exponential rise"],
    answer: 1,
    explanation: "Propagated epidemic: person-to-person transmission produces a series of successive peaks, each approximately one incubation period apart, and each larger than the previous (as more susceptible hosts are infected). Classic example: measles. Point source epidemic (e.g., food poisoning): single sharp peak, all cases within one incubation period.",
  },
  {
    id: 748,
    subject: "PSM/Community Medicine",
    stem: "In a case-control study, the odds ratio calculated from a 2×2 table is 6. This means:",
    options: ["Cases had a 6 times higher incidence of disease", "The odds of exposure in cases were 6 times higher than in controls", "Cases were 6 times more likely to survive", "The relative risk is exactly 6"],
    answer: 1,
    explanation: "Odds Ratio (OR) = (a×d) / (b×c) from a 2×2 table (a=exposed cases, b=unexposed cases, c=exposed controls, d=unexposed controls). OR=6 means the odds of being exposed are 6 times higher in cases than in controls. OR approximates RR when disease prevalence is low (rare disease assumption).",
  },
  {
    id: 749,
    subject: "PSM/Community Medicine",
    stem: "The term used for heterogeneity in a meta-analysis arising from combining studies with fundamentally different designs, populations, or interventions is:",
    options: ["Channelling bias", "Apples and oranges problem", "Hawthorne effect", "Simpson's paradox"],
    answer: 1,
    explanation: "'Apples and oranges' phenomenon in meta-analysis refers to clinical heterogeneity — combining studies that are fundamentally different in design, populations, interventions, or outcomes makes the pooled estimate meaningless. It is assessed using the I² statistic and Q test (statistical heterogeneity). Clinical judgement about combinability is essential before pooling.",
  },
  {
    id: 750,
    subject: "PSM/Community Medicine",
    stem: "A nested case-control study is conducted within a defined cohort. Its main advantage over a traditional case-control study is:",
    options: ["Eliminates recall bias completely", "Controls for confounding by time and provides more precise odds ratio estimates", "Can calculate incidence rates directly", "Requires no exclusion criteria"],
    answer: 1,
    explanation: "Nested case-control study: cases and controls are selected from within a prospective cohort. Advantages: exposure data collected before disease onset (reduces recall bias), controls are selected from the same risk set as cases (temporality established), stored biological samples can be used, more precise OR estimates than traditional case-control. Widely used in cancer epidemiology.",
  },

  // ── MEDICINE (INTEGRATED) ─────────────────────────────────────────────────
  {
    id: 751,
    subject: "Medicine",
    stem: "A patient's ECG shows ST elevation and Q waves in leads II, III, and aVF. The most likely occluded vessel is:",
    options: ["Left anterior descending artery", "Left circumflex artery", "Right coronary artery", "Obtuse marginal artery"],
    answer: 2,
    explanation: "Leads II, III, aVF = inferior territory. In ~70% of people (right dominant circulation), the right coronary artery (RCA) supplies the inferior wall via the posterior descending artery (PDA). Inferior STEMI: look for reciprocal changes in I, aVL. Always check V3R–V4R for right ventricular infarction (co-exists in ~30% of inferior MI). LCx inferior MI occurs in left-dominant systems.",
  },
  {
    id: 752,
    subject: "Medicine",
    stem: "Which of the following drugs has been recently approved specifically for metabolic dysfunction-associated steatohepatitis (MASH/NASH)?",
    options: ["Ursodeoxycholic acid", "Resmetirom (thyroid hormone receptor-β agonist)", "Obeticholic acid", "Pioglitazone"],
    answer: 1,
    explanation: "Resmetirom (Rezdiffra, 2024) — selective THR-β agonist — is the first FDA-approved drug specifically for MASH with significant fibrosis (F2–F3). It reduces hepatic fat and improves fibrosis. Semaglutide (GLP-1 RA) also showed phase III efficacy. Obeticholic acid failed to gain approval due to side effects. Pioglitazone and Vitamin E are used off-label.",
  },
  {
    id: 753,
    subject: "Medicine",
    stem: "The lethal triad of trauma, which must be aggressively corrected during damage control resuscitation, consists of:",
    options: ["Hypoxia, hyperglycaemia, hypotension", "Hypothermia, coagulopathy, metabolic acidosis", "Hyponatraemia, thrombocytopenia, fever", "Tachycardia, hypertension, hyperthermia"],
    answer: 1,
    explanation: "Lethal triad (bloody vicious cycle): Hypothermia + Acidosis + Coagulopathy — each worsens the others, creating a vicious cycle. Massive haemorrhage triggers all three. Damage control resuscitation: 1:1:1 ratio of RBCs:FFP:platelets (haemostatic resuscitation), permissive hypotension, early haemostasis, warming, correct acidosis with bicarbonate/tris-buffer.",
  },
  {
    id: 754,
    subject: "Pharmacology",
    stem: "Which P2Y12 receptor inhibitor is reversible and does not require hepatic conversion to an active metabolite?",
    options: ["Clopidogrel", "Prasugrel", "Ticagrelor", "Thienopyridine"],
    answer: 2,
    explanation: "Ticagrelor (cyclopentyl-triazolo-pyrimidine): directly-acting, reversible P2Y12 inhibitor — no prodrug conversion required, faster onset than clopidogrel. Clopidogrel and prasugrel are thienopyridines requiring CYP2C19 hepatic activation and cause irreversible P2Y12 blockade. Ticagrelor also inhibits adenosine reuptake (causes dyspnoea as side effect). Faster offset allows earlier surgery post-cessation.",
  },
  {
    id: 755,
    subject: "Pharmacology",
    stem: "Lamotrigine is used as first-line therapy for focal seizures. A dose-dependent adverse effect that may require dose reduction is:",
    options: ["Gingival hyperplasia", "Hirsutism", "Dizziness and ataxia (vestibular toxicity)", "Hepatotoxicity"],
    answer: 2,
    explanation: "Lamotrigine adverse effects: Dose-dependent — dizziness, diplopia, ataxia, headache, nausea. Idiosyncratic — Stevens-Johnson syndrome (risk increased with rapid titration and co-administration of valproate). Gingival hyperplasia = phenytoin. Hirsutism = phenytoin. Hepatotoxicity = valproate. Lamotrigine does not cause hyponatraemia (unlike carbamazepine/oxcarbazepine).",
  },
  {
    id: 756,
    subject: "Medicine",
    stem: "India ink (Nigrosin) staining of CSF from an immunocompromised patient reveals encapsulated yeast cells with a wide clear capsule halo. The causative organism is:",
    options: ["Aspergillus fumigatus", "Cryptococcus neoformans", "Candida albicans", "Histoplasma capsulatum"],
    answer: 1,
    explanation: "India ink/Nigrosin stain highlights the polysaccharide capsule of Cryptococcus neoformans as a clear halo around the yeast cell (capsule excludes the ink). Cryptococcal meningitis: most common fungal CNS infection in HIV/AIDS (CD4 <100). Diagnosis: India ink + cryptococcal antigen (CrAg) in CSF/serum. Treatment: Amphotericin B + flucytosine (induction) → fluconazole (maintenance).",
  },
  {
    id: 757,
    subject: "Pharmacology",
    stem: "The Therapeutic Index (TI) of a drug is calculated as:",
    options: ["LD50 / ED50", "TD50 / ED50", "ED50 / LD50", "ED95 / TD5"],
    answer: 1,
    explanation: "Therapeutic Index = TD50 (dose toxic in 50% of subjects) / ED50 (dose effective in 50% of subjects). A high TI = wide safety margin (e.g., penicillin, TI >1000). A low TI = narrow therapeutic window (e.g., digoxin, lithium, warfarin, phenytoin, TI ~2). In clinical practice, 'therapeutic index' often refers to the therapeutic window (minimum effective concentration to minimum toxic concentration).",
  },
  {
    id: 758,
    subject: "Pharmacology",
    stem: "Cilnidipine is distinct from conventional dihydropyridine calcium channel blockers (e.g., amlodipine) because it:",
    options: ["Blocks only L-type calcium channels", "Blocks both N-type (neuronal) and L-type calcium channels, thereby suppressing reflex tachycardia", "Activates potassium channels", "Inhibits ACE in addition to calcium channels"],
    answer: 1,
    explanation: "Cilnidipine blocks both vascular L-type Ca²⁺ channels (vasodilation, BP reduction) and neuronal N-type Ca²⁺ channels (inhibits sympathetic noradrenaline release at nerve terminals). Blocking N-type channels suppresses reflex sympathetic activation → less reflex tachycardia compared to pure L-type blockers like amlodipine. Also reduces proteinuria by dilating efferent arterioles.",
  },
  {
    id: 759,
    subject: "Medicine",
    stem: "A neonate is found to have complete heart block. The maternal antibody most likely responsible is:",
    options: ["Anti-dsDNA", "Anti-Ro (SSA) antibody", "Anti-Sm", "Anti-histone"],
    answer: 1,
    explanation: "Neonatal lupus is caused by transplacental transfer of maternal anti-Ro (SSA) antibodies (and anti-La/SSB). Anti-Ro antibodies attack the developing cardiac conduction system → congenital complete heart block (irreversible, requires pacemaker in most cases). Occurs even in asymptomatic anti-Ro-positive mothers. Skin, liver, and haematological manifestations are transient; heart block is permanent.",
  },
  {
    id: 760,
    subject: "Medicine",
    stem: "In a malnourished patient starting nasogastric feeding after prolonged starvation, the most dangerous electrolyte disturbance of refeeding syndrome is:",
    options: ["Hyponatraemia", "Hypokalaemia", "Hypophosphataemia", "Hypomagnesaemia"],
    answer: 2,
    explanation: "Refeeding syndrome: carbohydrate load → insulin surge → cellular uptake of phosphate (for ATP/2,3-DPG synthesis) → severe hypophosphataemia. Hypophosphataemia causes: respiratory muscle weakness (ventilator dependence), cardiac arrhythmias, haemolytic anaemia, neurological dysfunction, rhabdomyolysis. Prevention: check phosphate, potassium, magnesium before refeeding; supplement; introduce feeds slowly.",
  },
  {
    id: 761,
    subject: "Medicine",
    stem: "The drug of choice for infections caused by ESBL (Extended Spectrum Beta-Lactamase)-producing Gram-negative bacteria is:",
    options: ["Piperacillin-tazobactam", "Carbapenems (meropenem/imipenem)", "3rd generation cephalosporins", "Fluoroquinolones"],
    answer: 1,
    explanation: "ESBL-producing organisms (E. coli, Klebsiella) hydrolyse extended-spectrum cephalosporins and penicillins via plasmid-encoded beta-lactamases. Carbapenems are stable against all ESBLs and remain the drugs of choice for serious ESBL infections. Piperacillin-tazobactam may have in vitro activity but clinical failures occur (inoculum effect). Cephalosporins and fluoroquinolones are unreliable.",
  },
  {
    id: 762,
    subject: "Medicine",
    stem: "Sites of adult neurogenesis in the human brain are located in the:",
    options: ["Cerebral cortex and cerebellum", "Subventricular zone (SVZ) and dentate gyrus of the hippocampus", "Thalamus and hypothalamus", "Substantia nigra and striatum"],
    answer: 1,
    explanation: "Adult neurogenesis occurs at two neurogenic niches: (1) Subventricular zone (SVZ) of the lateral ventricles — new neurons migrate via the rostral migratory stream to the olfactory bulb; (2) Subgranular zone of the dentate gyrus (hippocampus) — new granule cells integrate into hippocampal circuits, relevant to memory and mood. Reduced hippocampal neurogenesis is implicated in depression.",
  },
  {
    id: 763,
    subject: "Pathology",
    stem: "Hirano bodies are eosinophilic intraneuronal inclusions predominantly found in the CA1 region of the hippocampus. They are most characteristic of:",
    options: ["Parkinson's disease", "Huntington's disease", "Alzheimer's disease", "Prion disease"],
    answer: 2,
    explanation: "Alzheimer's disease neuropathology: (1) Senile (neuritic) plaques — extracellular amyloid-β (Aβ) cores; (2) Neurofibrillary tangles — intracellular hyperphosphorylated tau; (3) Hirano bodies — eosinophilic, rod-shaped intraneuronal inclusions in CA1 hippocampus (actin-containing). Lewy bodies (α-synuclein) = Parkinson's/DLB. Huntingtin aggregates = Huntington's. Prion disease = prion protein plaques.",
  },
  {
    id: 764,
    subject: "Medicine",
    stem: "Biochemical confirmation of Cushing's syndrome has been made (failed dexamethasone suppression). The immediate next step to determine the cause is:",
    options: ["MRI pituitary", "24-hour urinary free cortisol", "Plasma ACTH level", "CT adrenal glands"],
    answer: 2,
    explanation: "Cushing's syndrome investigation algorithm: Step 1 — Confirm hypercortisolism (24h UFC, late-night salivary cortisol, LDDS test). Step 2 — Plasma ACTH level: If ACTH low/suppressed → ACTH-independent (adrenal adenoma/carcinoma) → CT adrenal. If ACTH elevated/normal → ACTH-dependent (pituitary Cushing's disease vs ectopic) → high-dose dexamethasone suppression test → MRI pituitary → IPSS if equivocal.",
  },
  {
    id: 765,
    subject: "Pathology",
    stem: "The supravital stain used to identify and count reticulocytes in a peripheral blood smear is:",
    options: ["Giemsa stain", "Leishman's stain", "New Methylene Blue (NMB)", "Perl's Prussian Blue"],
    answer: 2,
    explanation: "Reticulocytes are immature RBCs containing residual RNA. New Methylene Blue (NMB) — a supravital stain (stains living cells) — precipitates residual RNA as blue-staining filamentous material (reticulum). Normal reticulocyte count: 0.5–2.5% (indicates effective erythropoiesis). Brillient Cresyl Blue is an alternative. Giemsa/Leishman = blood films for morphology. Perl's = iron (haemosiderin).",
  },
  {
    id: 766,
    subject: "Medicine",
    stem: "Which of the following basal ganglia disorders is treatable and potentially reversible with chelation therapy?",
    options: ["Huntington's disease", "Parkinson's disease (idiopathic)", "Wilson's disease", "Hallervorden-Spatz disease (PKAN)"],
    answer: 2,
    explanation: "Wilson's disease (hepatolenticular degeneration): autosomal recessive ATP7B mutation → copper accumulation in liver, brain (basal ganglia), cornea (Kayser-Fleischer rings). Treatment: D-penicillamine or trientine (chelation); zinc (blocks absorption); liver transplant for fulminant failure. Early treatment reverses neurological and hepatic damage — the only treatable cause of progressive basal ganglia disease.",
  },
  {
    id: 767,
    subject: "Medicine",
    stem: "Mitral facies (malar telangiectasia — red-purple discolouration over the cheeks) is classically associated with:",
    options: ["Infective endocarditis", "Aortic stenosis", "Mitral stenosis", "Tricuspid regurgitation"],
    answer: 2,
    explanation: "Mitral facies (malar flush): bilateral red-purple discolouration over malar prominences caused by pulmonary hypertension + low cardiac output in severe mitral stenosis → peripheral vasoconstriction + facial vasodilation/telangiectasia. Other MS signs: tapping apex (palpable S1), loud S1, opening snap, mid-diastolic rumble with pre-systolic accentuation, Graham-Steell murmur (PR from pulmonary hypertension).",
  },
  {
    id: 768,
    subject: "Pathology",
    stem: "Thalassaemia major causes severe anaemia through which primary pathophysiological mechanism?",
    options: ["Increased haemoglobin catabolism only", "Defective erythropoiesis with ineffective erythropoiesis, suppressed hepcidin, and secondary iron overload", "Increased peripheral haemolysis without bone marrow involvement", "Decreased EPO production"],
    answer: 1,
    explanation: "β-Thalassaemia major: absent/reduced β-globin chains → excess free α-chains precipitate → ineffective erythropoiesis (intramedullary destruction) + peripheral haemolysis. Massively expanded erythropoiesis suppresses hepcidin (via GDF15, ERFE) → uninhibited duodenal iron absorption despite iron overload → iron deposits in heart, liver, endocrine glands. Treatment: regular transfusion + chelation.",
  },
  {
    id: 769,
    subject: "Medicine",
    stem: "Initial management of severe symptomatic hypercalcaemia (Ca²⁺ >3.5 mmol/L with confusion and polyuria) should begin with:",
    options: ["IV bisphosphonates (zoledronic acid)", "Calcitonin SC", "Aggressive IV 0.9% normal saline rehydration", "Loop diuretics (furosemide)"],
    answer: 2,
    explanation: "Hypercalcaemia management (sequential): Step 1 — Aggressive IV saline rehydration (3–4 L/day) — corrects dehydration, increases urinary calcium excretion. Step 2 — Bisphosphonates (zoledronic acid, pamidronate) — inhibit osteoclast-mediated bone resorption; onset 2–4 days; definitive control. Step 3 — Calcitonin if rapid effect needed. Loop diuretics only after adequate rehydration; thiazides are contraindicated (increase Ca²⁺ reabsorption).",
  },
  {
    id: 770,
    subject: "Physiology",
    stem: "Oral Rehydration Solution (ORS) is effective in secretory diarrhoea because sodium absorption is coupled to glucose via which transporter?",
    options: ["Na-K ATPase pump", "SGLT1 (sodium-glucose co-transporter 1)", "GLUT2 (facilitated diffusion)", "Aquaporin-3"],
    answer: 1,
    explanation: "SGLT1 (sodium-glucose linked transporter 1) on enterocyte brush border cotransports 2 Na⁺ ions with 1 glucose molecule — active transport powered by Na⁺ gradient. This transporter remains functional even in cholera/secretory diarrhoea (unlike Na-coupled Cl⁻ absorption which is impaired). ORS exploits SGLT1 to drive Na⁺ and water absorption. GLUT2 handles glucose efflux on basolateral side.",
  },
  {
    id: 771,
    subject: "Physiology",
    stem: "The primary stimulus for renin release from juxtaglomerular (JG) cells is:",
    options: ["Increased renal perfusion pressure", "Decreased renal perfusion pressure / reduced stretch of afferent arteriole", "Hyperkalaemia", "High sodium delivery to the macula densa"],
    answer: 1,
    explanation: "Renin is released by three mechanisms: (1) Intrarenal baroreceptor — decreased stretch of afferent arteriole (low BP/volume); (2) Macula densa — low NaCl delivery to distal tubule; (3) Sympathetic activation — β₁-receptors on JG cells. Renin cleaves angiotensinogen → angiotensin I → II (ACE) → aldosterone, vasoconstriction, Na⁺ retention. Hyperkalaemia stimulates aldosterone directly, independently of renin.",
  },
  {
    id: 772,
    subject: "Medicine",
    stem: "In the assessment of frailty in elderly patients, the primary physical indicator of sarcopenia (the biological substrate of frailty) is:",
    options: ["Low BMI", "Cognitive impairment", "Reduced muscle mass and strength (sarcopenia)", "Reduced bone mineral density"],
    answer: 2,
    explanation: "Sarcopenia (age-related progressive loss of muscle mass, strength, and function) is the core physical component of the frailty phenotype (Fried criteria: weakness, slowness, low activity, exhaustion, weight loss). It is assessed by grip strength, gait speed, and muscle mass (DEXA/BIA). Frailty predicts adverse outcomes post-surgery, hospitalisation, and falls. Treatment: resistance exercise + protein supplementation.",
  },

  // ── ANATOMY ───────────────────────────────────────────────────────────────
  {
    id: 773,
    subject: "Anatomy",
    stem: "The cerebral lobe primarily responsible for hand-eye coordination and integration of visual and somatosensory information is the:",
    options: ["Frontal lobe", "Temporal lobe", "Parietal lobe", "Occipital lobe"],
    answer: 2,
    explanation: "The parietal lobe integrates somatosensory input (primary somatosensory cortex, areas 3-1-2), visuospatial processing, and coordinate transformation for movement. The posterior parietal cortex (area 5, 7) is critical for hand-eye coordination — it transforms retinal coordinates to body-centred coordinates for reaching/grasping. Lesions cause optic ataxia, neglect, and constructional apraxia.",
  },
  {
    id: 774,
    subject: "Anatomy",
    stem: "Intercalated discs of cardiac muscle contain all of the following cell junctions EXCEPT:",
    options: ["Gap junctions (connexin-43)", "Fascia adherens (mechanical coupling)", "Desmosomes", "Zonula occludens (tight junctions)"],
    answer: 3,
    explanation: "Intercalated discs connect adjacent cardiomyocytes and contain: (1) Fascia adherens — anchors actin filaments (mechanical coupling, prevent tearing); (2) Desmosomes — anchorage of intermediate filaments (structural integrity); (3) Gap junctions (nexus, connexin-43) — electrical coupling for synchronous contraction. Zonula occludens (tight junctions) are NOT present in intercalated discs; they are found in epithelial cells forming paracellular barriers.",
  },
  {
    id: 775,
    subject: "Anatomy",
    stem: "Inhaled foreign bodies preferentially lodge in the right main bronchus because it is:",
    options: ["Narrower and more horizontal than the left", "Wider, shorter, and more vertical (less angulated) than the left", "Longer and has more mucous glands", "More compliant due to fewer cartilaginous rings"],
    answer: 1,
    explanation: "The right main bronchus is wider (2.5 cm vs 2 cm), shorter (~2.5 cm vs ~5 cm), and more vertical/less angulated (~25° from tracheal axis vs ~45° for left bronchus). These features explain why foreign bodies, aspirated gastric contents, and NG tubes in the airway tend to pass into the right bronchus and why right-sided pneumonia is more common from aspiration.",
  },
  {
    id: 776,
    subject: "Anatomy",
    stem: "A tailgut cyst (retrorectal cystic hamartoma) develops from remnants of the:",
    options: ["Notochord", "Primitive gut (tailgut)", "Neural tube", "Allantois"],
    answer: 1,
    explanation: "The tailgut is the caudal remnant of the hindgut that normally regresses completely during development. Incomplete regression leaves tailgut cysts (retrorectal cystic hamartomas) — benign multicystic lesions posterior to the rectum, lined by cuboidal or columnar epithelium. They may become infected or undergo malignant transformation. Treatment is surgical excision via posterior approach.",
  },
  {
    id: 777,
    subject: "Anatomy",
    stem: "Peyer's patches, which allow distinction of the ileum from other segments of small intestine, are located in which wall?",
    options: ["Mesenteric border of the duodenum", "Antimesenteric border of the ileum", "Mucosa of the jejunum", "Serosa of the caecum"],
    answer: 1,
    explanation: "Peyer's patches are aggregated lymphoid follicles located in the submucosa and mucosa of the antimesenteric border of the ileum (largest and most numerous in the distal ileum). They are important immunological sampling sites — M cells overlie follicles and transport luminal antigens to dendritic cells. Absent in duodenum/jejunum. Site of typhoid ulceration (transverse ulcers in ileum) and intussusception in children.",
  },
  {
    id: 778,
    subject: "Anatomy",
    stem: "The adrenal medulla is embryologically derived from:",
    options: ["Intermediate mesoderm", "Neural crest cells (ectoderm)", "Splanchnic mesoderm", "Endoderm of the urogenital sinus"],
    answer: 1,
    explanation: "Adrenal gland has dual embryological origin: Cortex — intermediate mesoderm (celomic epithelium near gonadal ridge). Medulla — neural crest cells that migrate from the sympathetic ganglia; chromaffin cells are modified postganglionic sympathetic neurons (retain neural crest lineage). This explains why phaeochromocytomas (medullary tumours) can arise along sympathetic chain (paragangliomas) and respond to sympathetic stimulation.",
  },

  // ── BIOCHEMISTRY ─────────────────────────────────────────────────────────
  {
    id: 779,
    subject: "Biochemistry",
    stem: "Abetalipoproteinaemia is caused by absence of MTP (microsomal triglyceride transfer protein). Which lipoprotein class is characteristically ABSENT?",
    options: ["HDL only", "LDL only", "Chylomicrons, VLDL, and LDL (all apoB-containing lipoproteins)", "IDL only"],
    answer: 2,
    explanation: "Abetalipoproteinaemia: autosomal recessive MTP mutation → cannot assemble apoB-containing lipoproteins → chylomicrons (intestinal), VLDL and LDL (hepatic) absent. Clinical features: fat malabsorption, acanthocytosis (spiky RBCs due to lipid composition change), ataxia, retinitis pigmentosa, vitamin E deficiency (fat-soluble vitamin malabsorption). Treatment: very low-fat diet + high-dose fat-soluble vitamins.",
  },
  {
    id: 780,
    subject: "Biochemistry",
    stem: "Xeroderma pigmentosum (XP) results from a defect in which DNA repair mechanism?",
    options: ["Mismatch repair (MMR)", "Base excision repair (BER)", "Nucleotide excision repair (NER)", "Non-homologous end-joining (NHEJ)"],
    answer: 2,
    explanation: "UV radiation creates cyclobutane pyrimidine dimers (CPDs) and 6-4 photoproducts — repaired exclusively by nucleotide excision repair (NER). XP results from mutations in NER genes (XPA–XPG, XPV). Features: extreme photosensitivity, freckling, skin cancers at young age, ocular involvement. Cockayne syndrome and trichothiodystrophy also involve NER defects. HNPCC/Lynch syndrome = MMR defect.",
  },
  {
    id: 781,
    subject: "Biochemistry",
    stem: "Uncoupling agents (e.g., 2,4-dinitrophenol, thermogenin/UCP1) dissipate the proton gradient across the inner mitochondrial membrane. The net effect is:",
    options: ["Increased ATP synthesis and decreased O₂ consumption", "Decreased ATP synthesis with increased O₂ consumption and heat production", "Increased both ATP synthesis and heat", "No change in ATP; decreased heat production"],
    answer: 1,
    explanation: "Uncouplers dissipate the proton (H⁺) electrochemical gradient by making the inner mitochondrial membrane proton-permeable, bypassing ATP synthase. Result: electron transport continues (O₂ consumption increases), but proton gradient is released as heat rather than driving ATP synthesis. ATP production falls drastically. DNP was used as a weight-loss agent (increases metabolic heat) but is toxic. Brown fat UCP1 is physiological uncoupling for thermogenesis in neonates.",
  },
  {
    id: 782,
    subject: "Biochemistry",
    stem: "GLUT4 (insulin-sensitive glucose transporter) is predominantly expressed in:",
    options: ["Brain and red blood cells", "Liver and kidneys", "Skeletal muscle and adipose tissue", "Small intestinal epithelium"],
    answer: 2,
    explanation: "GLUT4 is the insulin-regulated glucose transporter stored in intracellular vesicles that translocate to the plasma membrane in response to insulin signalling (PI3K–Akt–AS160 pathway). It is expressed in skeletal muscle, cardiac muscle, and adipose tissue. This accounts for most postprandial glucose disposal. Type 2 diabetes involves GLUT4 translocation defects. GLUT1 = brain/RBCs; GLUT2 = liver/pancreatic β-cells; GLUT3 = neurons.",
  },
  {
    id: 783,
    subject: "Biochemistry",
    stem: "Deficiency of peroxisomal biogenesis (Zellweger syndrome) leads to accumulation of:",
    options: ["Medium-chain fatty acids", "Phytanic acid and long-chain fatty acids", "Very long-chain fatty acids (VLCFAs >C22)", "Short-chain acylcarnitines"],
    answer: 2,
    explanation: "Very long-chain fatty acids (VLCFAs, >C22) are exclusively β-oxidised in peroxisomes. Peroxisomal biogenesis disorders (Zellweger spectrum: Zellweger syndrome, neonatal ALD, infantile Refsum disease) result in VLCFA accumulation. Clinical features: dysmorphic facies, severe hypotonia, absent peroxisomes on liver biopsy, elevated plasma VLCFAs (diagnostic). Refsum disease specifically accumulates phytanic acid.",
  },
  {
    id: 784,
    subject: "Biochemistry",
    stem: "Pyridoxal phosphate (PLP), the active form of vitamin B₆, is an essential coenzyme for:",
    options: ["Carboxylation reactions (CO₂ fixation)", "Transamination and decarboxylation of amino acids", "Oxidative decarboxylation in Krebs cycle", "Methylation reactions"],
    answer: 1,
    explanation: "PLP (from pyridoxine/B6) is the coenzyme for: Transamination (amino acid ↔ keto acid, e.g., AST, ALT); Decarboxylation (DOPA→dopamine, 5-HTP→serotonin, glutamate→GABA, histidine→histamine); Glycogen phosphorylase; ALA synthase (haem synthesis); Cystathionine β-synthase. Deficiency causes: sideroblastic anaemia, peripheral neuropathy, pellagra-like dermatitis, convulsions (reduced GABA). INH depletes PLP.",
  },
  {
    id: 785,
    subject: "Biochemistry",
    stem: "Which of the following disaccharides is a non-reducing sugar?",
    options: ["Maltose", "Lactose", "Sucrose", "Cellobiose"],
    answer: 2,
    explanation: "A reducing sugar has a free anomeric carbon (hemiacetal group) that can act as a reducing agent. Sucrose (glucose 1-2 fructose) has both anomeric carbons involved in the glycosidic bond — no free anomeric OH → non-reducing. Trehalose (glucose 1-1 glucose) is also non-reducing. Maltose (α-1,4 glucose-glucose), lactose, and cellobiose all have free anomeric carbons and are reducing sugars.",
  },
  {
    id: 786,
    subject: "Biochemistry",
    stem: "The enzyme that synthesises short RNA primers during DNA replication is:",
    options: ["DNA polymerase I", "DNA polymerase III", "Primase (DNA-directed RNA polymerase)", "Topoisomerase II"],
    answer: 2,
    explanation: "Primase (a component of the primosome) synthesises short RNA primers (~10 nucleotides) that provide the 3'-OH needed for DNA polymerase III to extend (all DNA polymerases require a pre-existing 3'-OH). On the leading strand, one primer suffices; on the lagging strand, a new primer is needed for each Okazaki fragment. Primers are later removed by DNA polymerase I (5'→3' exonuclease) and replaced with DNA.",
  },
  {
    id: 787,
    subject: "Biochemistry",
    stem: "The recommended method to detect specific proteins in formalin-fixed paraffin-embedded (FFPE) tissue sections is:",
    options: ["Western blot", "ELISA", "Immunohistochemistry (IHC)", "Flow cytometry"],
    answer: 2,
    explanation: "IHC allows protein detection in tissue context — primary antibody binds target protein, visualised by enzyme-linked secondary antibody (HRP+DAB = brown). It preserves tissue morphology and spatial information, critical for tumour typing (HER2, ER/PR, Ki-67, PD-L1). Western blot requires protein extraction (destroys morphology). Flow cytometry requires single cell suspension (fresh tissue). ELISA = solution-phase protein quantification.",
  },

  // ── MICROBIOLOGY ─────────────────────────────────────────────────────────
  {
    id: 788,
    subject: "Microbiology",
    stem: "The primary mechanism of action of isoniazid (INH) in treating tuberculosis is:",
    options: ["Inhibition of DNA gyrase", "Inhibition of mycolic acid synthesis in the mycobacterial cell wall", "Inhibition of RNA polymerase", "Inhibition of the 30S ribosomal subunit"],
    answer: 1,
    explanation: "INH (prodrug) → activated by KatG (catalase-peroxidase) → active form inhibits InhA (enoyl-ACP reductase) → blocks mycolic acid synthesis. Mycolic acid is a unique long-chain fatty acid essential for the mycobacterial cell wall. Resistance: KatG mutations (most common), InhA promoter mutations. INH also inhibits pyridoxal phosphate synthesis (peripheral neuropathy — prevent with pyridoxine co-supplementation).",
  },
  {
    id: 789,
    subject: "Microbiology",
    stem: "Which organism is characterised by having two circular chromosomes — a large chromosome encoding core metabolic functions and a smaller chromosome with virulence and environmental adaptation genes?",
    options: ["Escherichia coli", "Vibrio cholerae", "Helicobacter pylori", "Burkholderia cepacia"],
    answer: 1,
    explanation: "Vibrio cholerae uniquely has two circular chromosomes: chromosome 1 (~2.96 Mb) — essential housekeeping genes; chromosome 2 (~1.07 Mb) — accessory genes including virulence factors. The cholera toxin (CT) is encoded on a filamentous bacteriophage (CTXφ) and the TCP colonisation island. Vibrio is a curved Gram-negative rod, oxidase-positive, halophilic, associated with shellfish and contaminated water.",
  },
  {
    id: 790,
    subject: "Microbiology",
    stem: "Which antifungal agent is contraindicated (or ineffective) in mucormycosis, despite being commonly used for other invasive fungal infections?",
    options: ["Amphotericin B", "Posaconazole", "Isavuconazole", "Voriconazole"],
    answer: 3,
    explanation: "Mucormycosis (Rhizopus, Mucor, Rhizomucor): inherently resistant to voriconazole because Mucorales lack the ergosterol target pathway that voriconazole inhibits (CYP51A gene absent/different). Ironically, voriconazole prophylaxis may increase mucormycosis risk in immunocompromised patients. Treatment: Liposomal amphotericin B + surgical debridement (first-line); posaconazole or isavuconazole (salvage/step-down).",
  },
  {
    id: 791,
    subject: "Microbiology",
    stem: "The diphtheria toxin causes cellular death by:",
    options: ["Activating adenylate cyclase, increasing cAMP", "ADP-ribosylation of Elongation Factor-2 (EF-2), halting protein synthesis", "Cleaving SNARE proteins", "Blocking acetylcholine release at neuromuscular junctions"],
    answer: 1,
    explanation: "Diphtheria toxin (from Corynebacterium diphtheriae lysogenised by β-phage carrying tox gene): Fragment B — cell entry; Fragment A — ADP-ribosylates EF-2 (elongation factor 2) using NAD⁺ → EF-2 inactivated → protein synthesis halts → cell death. Affects highly active protein-synthesising cells (myocardium → myocarditis; peripheral nerves → neuropathy). Pertussis toxin = ADP-ribosylates Gi protein. Cholera toxin = ADP-ribosylates Gs protein.",
  },
  {
    id: 792,
    subject: "Microbiology",
    stem: "A patient undergoes splenectomy following trauma. They are at highest risk for overwhelming post-splenectomy infection (OPSI) caused by:",
    options: ["Intracellular organisms (Listeria, Mycobacteria)", "Encapsulated bacteria (Streptococcus pneumoniae, Haemophilus influenzae, Neisseria meningitidis)", "Anaerobes", "Gram-negative enteric rods"],
    answer: 1,
    explanation: "The spleen clears encapsulated bacteria via opsonin-mediated phagocytosis using IgM and complement (alternative pathway). Post-splenectomy: impaired clearance of encapsulated organisms → S. pneumoniae (most common), H. influenzae type b, N. meningitidis. Prevention: vaccinate against all three before/after splenectomy + lifelong penicillin prophylaxis in children. OPSI mortality 50–70% if sepsis occurs.",
  },
  {
    id: 793,
    subject: "Microbiology",
    stem: "A patient has Staphylococcus aureus bacteraemia. Susceptibility testing shows the isolate is sensitive to oxacillin (methicillin-susceptible, MSSA). The drug of choice is:",
    options: ["Vancomycin", "Cloxacillin or flucloxacillin", "Linezolid", "Daptomycin"],
    answer: 1,
    explanation: "For MSSA (oxacillin-sensitive Staphylococcus aureus), anti-staphylococcal penicillins — cloxacillin (IV) or flucloxacillin — are superior to vancomycin (lower bacteraemia clearance rates, inferior outcomes). Vancomycin is reserved for MRSA or penicillin allergy. Never use ampicillin or amoxicillin (destroyed by staphylococcal penicillinase). Cefazolin is an alternative for MSSA.",
  },
  {
    id: 794,
    subject: "Microbiology",
    stem: "Superantigens (e.g., staphylococcal TSST-1, streptococcal pyrogenic exotoxins) cause massive T-cell activation by:",
    options: ["Acting as conventional antigens presented in MHC groove", "Cross-linking MHC class II molecules and TCR Vβ chains outside the antigen-binding groove", "Activating B cells via CD40 ligand", "Inhibiting regulatory T cells"],
    answer: 1,
    explanation: "Superantigens bypass normal antigen processing — they bind simultaneously to MHC class II (outside peptide groove, on α chain) and TCR (Vβ region). This non-specific cross-linking activates 5–25% of T cells (vs <0.01% for conventional antigens) → massive cytokine storm (TNF-α, IL-1, IL-6, IFN-γ) → toxic shock syndrome. The specificity is for particular TCR Vβ families, not a specific antigen.",
  },
  {
    id: 795,
    subject: "Microbiology",
    stem: "Petroff's method is used for concentration of sputum samples before AFB culture. The reagents used are:",
    options: ["4% H₂SO₄ and distilled water", "4% NaOH and N-acetyl-L-cysteine (NALC)", "10% bleach (sodium hypochlorite)", "Cetylpyridinium chloride (CPC)"],
    answer: 1,
    explanation: "Petroff's method (modified NALC-NaOH decontamination): NALC (mucolytic) + 4% NaOH (decontaminant kills normal flora) → neutralise with phosphate buffer → centrifuge → resuspend pellet for smear/culture. NALC reduces NaOH concentration needed, preserving mycobacterial viability. CPC is used for transport of sputum (preserves viability). Used before Löwenstein-Jensen or liquid MGIT culture.",
  },

  // ── ENT / OPHTHALMOLOGY ───────────────────────────────────────────────────
  {
    id: 796,
    subject: "ENT/Ophthalmology",
    stem: "The muscle responsible for opening the Eustachian tube during swallowing, preventing barotrauma, is:",
    options: ["Tensor tympani", "Tensor veli palatini", "Stapedius", "Levator veli palatini"],
    answer: 1,
    explanation: "Tensor veli palatini (CN V3 — mandibular nerve via medial pterygoid nerve) opens the pharyngeal end of the Eustachian tube during swallowing/yawning by pulling the lateral wall laterally. Failure (cleft palate, adenoid hypertrophy, nasopharyngeal tumour) → chronic secretory otitis media (glue ear). Levator veli palatini (CN X) elevates the soft palate. Tensor tympani (CN V3) tenses the tympanic membrane.",
  },
  {
    id: 797,
    subject: "ENT/Ophthalmology",
    stem: "The only intrinsic laryngeal muscle that abducts the vocal cords (opens the glottis) is:",
    options: ["Cricothyroid", "Thyroarytenoid (vocalis)", "Posterior cricoarytenoid (PCA)", "Lateral cricoarytenoid"],
    answer: 2,
    explanation: "Posterior cricoarytenoid (PCA) is the ONLY abductor of the vocal cords — it rotates the arytenoid laterally, opening the rima glottidis. Bilateral PCA paralysis (e.g., bilateral RLN palsy post-thyroidectomy) → bilateral adduction → respiratory distress, stridor, requires tracheostomy. All other intrinsic laryngeal muscles are adductors/tensors. Cricothyroid (external branch of SLN) = tensor. All others supplied by RLN.",
  },
  {
    id: 798,
    subject: "ENT/Ophthalmology",
    stem: "Which feature best differentiates central nystagmus from peripheral (vestibular) nystagmus?",
    options: ["Horizontal direction with rotatory component", "Direction-changing, non-fatigable, without latency, not suppressed by fixation", "Associated with severe vertigo and tinnitus", "Fatigable with repeated Dix-Hallpike testing"],
    answer: 1,
    explanation: "Central nystagmus (brainstem/cerebellum lesion): direction-changing (changes with gaze direction), non-fatigable, minimal latency, NOT suppressed by visual fixation, may be vertical or purely torsional, mild vertigo, neurological signs. Peripheral nystagmus (vestibular apparatus/CN VIII): unidirectional, fast phase away from lesion, fatigable, suppressed by fixation, severe vertigo + nausea + tinnitus. Any pure vertical nystagmus = central until proven otherwise.",
  },
  {
    id: 799,
    subject: "ENT/Ophthalmology",
    stem: "The first-line treatment for idiopathic sudden sensorineural hearing loss (ISSHL) is:",
    options: ["Intratympanic gentamicin", "Systemic corticosteroids (oral prednisolone or intratympanic dexamethasone)", "Cochlear implantation", "Emergent surgical exploration"],
    answer: 1,
    explanation: "ISSHL: ≥30 dB SNHL over ≥3 frequencies within 72 hours. Treatment: High-dose systemic corticosteroids (prednisolone 1 mg/kg/day × 10 days taper) ± intratympanic dexamethasone as salvage/adjunct. Must start within 2 weeks (ideally 72 hours). Mechanism likely: autoimmune/inflammatory labyrinthitis, vascular ischaemia, or viral cochleitis. Recovery ~50–65% with steroids. MRI to exclude acoustic neuroma.",
  },
  {
    id: 800,
    subject: "ENT/Ophthalmology",
    stem: "A patient presents with painful ophthalmoplegia and an ipsilateral relative afferent pupillary defect (RAPD). The most likely diagnosis is:",
    options: ["Cavernous sinus thrombosis", "Optic neuritis with concurrent oculomotor nerve palsy", "Tolosa-Hunt syndrome", "Miller Fisher syndrome"],
    answer: 1,
    explanation: "RAPD (Marcus Gunn pupil) indicates optic nerve or severe retinal pathology on the affected side. Painful ophthalmoplegia + RAPD = optic neuritis (demyelination of optic nerve — painful on eye movement) with associated extraocular muscle involvement or orbital apex syndrome. Optic neuritis: unilateral visual loss, pain on movement, RAPD, dyschromatopsia. Treatment: IV methylprednisolone speeds recovery (ONTT trial). Associated with MS.",
  },

  // ── SURGERY / ORTHOPAEDICS / RADIOLOGY ───────────────────────────────────
  {
    id: 801,
    subject: "Surgery",
    stem: "The cardiovascular effect of halothane that distinguishes it from other volatile anaesthetic agents is:",
    options: ["Increases cardiac output and heart rate", "Decreases cardiac output by direct myocardial depression (without reflex tachycardia)", "Causes coronary vasodilation and increased coronary flow", "Increases systemic vascular resistance"],
    answer: 1,
    explanation: "Halothane: dose-dependent direct myocardial depressant → reduced cardiac output. Unlike isoflurane/sevoflurane (which reduce SVR and may cause reflex tachycardia), halothane causes bradycardia (sensitises SA node to vagal tone) + decreased contractility → reduced CO. Also sensitises myocardium to catecholamines → arrhythmias (avoid adrenaline infiltration). Halothane hepatitis (rare but severe) limits its use.",
  },
  {
    id: 802,
    subject: "Surgery",
    stem: "The triggers of malignant hyperthermia (MH) in susceptible individuals are:",
    options: ["Propofol and opioids", "Succinylcholine and volatile halogenated anaesthetic agents", "Ketamine and benzodiazepines", "Neostigmine and atropine"],
    answer: 1,
    explanation: "Malignant hyperthermia: autosomal dominant RYR1 (ryanodine receptor) or CACNA1S mutation → uncontrolled Ca²⁺ release from SR. Triggers: succinylcholine and all volatile halogenated agents (halothane, isoflurane, sevoflurane, desflurane). Features: hyperthermia (late sign), muscle rigidity, masseter spasm, tachycardia, hypercarbia, rhabdomyolysis, metabolic acidosis. Treatment: dantrolene (RyR1 blocker), cooling, 100% O₂.",
  },
  {
    id: 803,
    subject: "Surgery",
    stem: "Neuropraxia (Seddon Grade I / Sunderland Grade I) nerve injury is best defined as:",
    options: ["Complete nerve transection with loss of structural continuity", "Axonal disruption with intact endoneurium", "Focal conduction block without axonal damage or structural disruption", "Rupture of perineurium with fascicular damage"],
    answer: 2,
    explanation: "Seddon classification: Neuropraxia = focal conduction block (demyelination) with intact axon and connective tissue sheaths — complete recovery expected (weeks to months). Axonotmesis = axon disrupted, endoneurium intact — Wallerian degeneration but guided regeneration possible. Neurotmesis = complete nerve disruption — requires surgical repair. Sunderland 1–5 subdivides further based on layer disrupted.",
  },
  {
    id: 804,
    subject: "Surgery",
    stem: "The Thompson (Simmonds) test is used to diagnose:",
    options: ["Anterior cruciate ligament rupture", "Achilles tendon rupture", "Plantar fasciitis", "Peroneal tendon subluxation"],
    answer: 1,
    explanation: "Thompson test: patient prone, knee flexed 90°. Examiner squeezes the calf. Normal: plantar flexion occurs (intact Achilles). Positive (abnormal): NO plantar flexion = Achilles tendon rupture. Management: conservative (cast equinus) vs surgical repair — surgical preferred in young active patients. The tendon is vulnerable 2–6 cm above insertion (watershed zone of poor blood supply).",
  },
  {
    id: 805,
    subject: "Surgery",
    stem: "Fasciotomy for acute compartment syndrome is indicated when intracompartmental pressure exceeds:",
    options: [">10 mmHg", ">20 mmHg", ">30 mmHg (or within 30 mmHg of diastolic BP)", ">50 mmHg"],
    answer: 2,
    explanation: "Compartment syndrome: intracompartmental pressure ≥30 mmHg (absolute) OR within 30 mmHg of diastolic BP (delta P <30 mmHg) is the threshold for emergent four-compartment fasciotomy (leg). Clinical diagnosis (pain out of proportion, pain on passive stretch, tense compartment) is primary — pressure measurement confirms. Delay risks Volkmann's ischaemic contracture, rhabdomyolysis, renal failure.",
  },
  {
    id: 806,
    subject: "Surgery",
    stem: "Multiple ring-enhancing lesions on brain MRI in a patient with HIV infection (CD4 <100) are most likely caused by:",
    options: ["Primary CNS lymphoma", "Toxoplasma gondii (cerebral toxoplasmosis)", "Cryptococcal meningitis", "Progressive multifocal leukoencephalopathy (PML)"],
    answer: 1,
    explanation: "In AIDS, multiple ring-enhancing lesions in basal ganglia/cortex = cerebral toxoplasmosis (Toxoplasma gondii) until proven otherwise. Empirical anti-Toxoplasma therapy (pyrimethamine + sulfadiazine + leucovorin) is given; failure to respond within 2 weeks suggests CNS lymphoma (single lesion, EBV-positive CSF, SPECT thallium-avid). PML = non-enhancing white matter lesions (JC virus). Cryptococcoma = ring-enhancing but soap-bubble pattern.",
  },
  {
    id: 807,
    subject: "Surgery",
    stem: "A patient presents with acute right iliac fossa pain and tenderness. Ultrasound clearly demonstrates acute appendicitis. The next step in management should be:",
    options: ["CT abdomen for confirmation before surgery", "Immediate laparoscopic appendicectomy", "MRI abdomen", "Diagnostic laparoscopy only"],
    answer: 1,
    explanation: "When ultrasound clearly demonstrates appendicitis (dilated non-compressible appendix >6 mm, periappendicular fat stranding, no shadow from lumen), further imaging adds delay without benefit. Proceed directly to surgery (laparoscopic appendicectomy is gold standard). CT is used when ultrasound is inconclusive (obese patients, retrocaecal appendix, atypical presentations, or to exclude other diagnoses). Avoid radiation in young/pregnant patients.",
  },

  // ── DERMATOLOGY ───────────────────────────────────────────────────────────
  {
    id: 808,
    subject: "Medicine",
    stem: "The Premalatha sign (cerebriform/fissured tongue surface resembling gyri and sulci) is pathognomonic of:",
    options: ["Pemphigus vulgaris", "Pemphigus vegetans", "Pemphigoid gestationis", "Epidermolysis bullosa"],
    answer: 1,
    explanation: "Pemphigus vegetans (variant of pemphigus vulgaris): intertriginous bullae that heal with vegetating plaques. The cerebriform/fissured tongue (Premalatha sign) is pathognomonic — deep furrows on the tongue surface resembling brain gyri. Both are caused by IgG anti-desmoglein antibodies (Dsg3 >> Dsg1). The vegetans variant additionally shows acanthosis, papillomatosis, and hyperkeratosis in flexural areas.",
  },
  {
    id: 809,
    subject: "Medicine",
    stem: "A patient presents with a 1.5 cm darkly pigmented lesion on the sole of the foot (heel) with irregular borders. The most appropriate next step is:",
    options: ["Wide local excision with 1 cm margins immediately", "Excisional biopsy to obtain histological diagnosis", "Shave biopsy", "Observe for 3 months"],
    answer: 1,
    explanation: "Any suspicious pigmented lesion (ABCDE: Asymmetry, Border irregularity, Colour variation, Diameter >6 mm, Evolution) on the sole/nail should be sampled by excisional biopsy — removes the entire lesion with a 1–2 mm margin for complete histological assessment (Breslow thickness, Clark level, mitotic rate, ulceration — determines prognosis and re-excision margins). Never use shave/punch biopsy of suspected melanoma (disrupts depth measurement).",
  },
  {
    id: 810,
    subject: "Medicine",
    stem: "Tinea capitis (scalp ringworm) requires systemic antifungal treatment because:",
    options: ["Topical agents cannot penetrate the hair shaft and follicle", "The causative organism is resistant to all topical antifungals", "Tinea capitis is caused by a bacterium", "Topical treatment causes severe photosensitivity"],
    answer: 0,
    explanation: "Tinea capitis is a dermatophyte infection of the scalp hair shafts and follicles. Topical antifungals cannot penetrate the hair shaft or follicle adequately. Oral antifungals are required: griseofulvin (traditional, 8–12 weeks), terbinafine (4–6 weeks, preferred), itraconazole, or fluconazole. Selenium sulfide/ketoconazole shampoo is adjunctive (reduces shedding/transmission) but insufficient alone.",
  },
  {
    id: 811,
    subject: "Medicine",
    stem: "Non-treponemal tests (VDRL, RPR) for syphilis are primarily used for:",
    options: ["Diagnosing primary syphilis with high sensitivity", "Confirming the diagnosis of neurosyphilis", "Monitoring response to treatment (titre falls post-treatment)", "Diagnosing latent syphilis definitively"],
    answer: 2,
    explanation: "VDRL/RPR are non-treponemal tests (detect antibody to cardiolipin-lecithin-cholesterol) — high sensitivity, lower specificity (false positives: SLE, leprosy, malaria, TB, pregnancy). Used for: screening, monitoring treatment response (4-fold titre fall = adequate response), assessing reactivation/re-infection. Treponemal tests (TPHA, FTA-ABS, TPPA) are confirmatory and remain positive lifelong. VDRL-CSF is used for neurosyphilis diagnosis.",
  },

  // ── PSYCHIATRY ────────────────────────────────────────────────────────────
  {
    id: 812,
    subject: "Medicine",
    stem: "In Korsakoff's syndrome (following chronic alcoholism), the distinguishing feature from Wernicke's encephalopathy is:",
    options: ["Ophthalmoplegia and nystagmus", "Ataxic gait", "Confabulation with anterograde amnesia (inability to form new memories)", "Altered level of consciousness"],
    answer: 2,
    explanation: "Wernicke's encephalopathy (acute, thiamine deficiency): Ophthalmoplegia + Ataxia + Confusion (classic triad). Korsakoff's syndrome (chronic): selective memory impairment — severe anterograde amnesia (cannot form new memories) + retrograde amnesia + confabulation (unconscious fabrication to fill memory gaps) — insight intact but profound amnesia. Executive function and immediate memory preserved. Wernicke-Korsakoff continuum; treat Wernicke urgently with IV thiamine to prevent Korsakoff.",
  },
  {
    id: 813,
    subject: "Medicine",
    stem: "A patient with major depressive disorder presents with severe suicidal ideation with a specific plan and intent, refusing medications. The most appropriate immediate management is:",
    options: ["Start SSRI and review in 2 weeks", "Refer to outpatient psychiatry clinic", "Immediate psychiatric hospitalisation (inpatient admission)", "Cognitive behavioural therapy alone"],
    answer: 2,
    explanation: "High suicidal risk (plan + intent + means + hopelessness = Beck's cognitive triad: negative view of self, world, future) is a psychiatric emergency requiring immediate inpatient admission for close monitoring, initiation of treatment, and ECT if required. Outpatient management is appropriate for low/moderate risk only. Safety plan, lethal means restriction, and crisis support are initiated on admission.",
  },

  // ── FORENSIC MEDICINE ─────────────────────────────────────────────────────
  {
    id: 814,
    subject: "Forensic Medicine",
    stem: "A distant (>60–90 cm range) entry gunshot wound is characterised by:",
    options: ["Blackening and burning of skin at wound margins", "Tattooing (stippling) from unburnt powder grains", "No tattooing, blackening, or burning — only wound of entry", "Muzzle contusion ring"],
    answer: 2,
    explanation: "Gunshot wound range classification: Contact — burning, blackening, searing, muzzle contusion/stellate wound. Intermediate (30–60 cm) — blackening (smoke) without burning. Distant (<1 metre) — tattooing (stippling) from unburnt powder; no blackening. Distant (>90 cm) — no secondary marks; only mechanical wound of entry with abrasion collar. At very long range: only abrasion ring (contusion ring) from bullet's edge.",
  },
  {
    id: 815,
    subject: "Forensic Medicine",
    stem: "Body packing is the term used for:",
    options: ["Smuggling drugs by injecting under the skin (skin popping)", "Ingesting drug-filled packages (condoms, bags) to smuggle drugs internally", "Transporting drugs in body cavities without swallowing", "Concealing drugs in prostheses"],
    answer: 1,
    explanation: "Body packing (internal concealment): swallowing drug-filled condoms, latex packets, or bags to smuggle drugs. Risk: packet rupture → massive drug toxicity (cocaine: seizures, cardiac arrest; heroin: respiratory depression). Management: whole bowel irrigation with polyethylene glycol, surgical removal if packet ruptures. Contrast CT abdomen/pelvis to locate packets. Body stuffing = hastily swallowed drugs with poor packaging (higher rupture risk).",
  },
  {
    id: 816,
    subject: "Forensic Medicine",
    stem: "In organophosphate poisoning, atropine and oximes (pralidoxime) have distinct roles. Atropine specifically counteracts:",
    options: ["Nicotinic effects (muscle weakness, fasciculations)", "Both muscarinic and nicotinic effects equally", "Muscarinic effects (SLUDGE: salivation, lacrimation, urination, defaecation, GI upset, emesis)", "CNS toxicity only"],
    answer: 2,
    explanation: "Organophosphate (OP) toxicity: irreversible AChE inhibition → accumulation of ACh at all cholinergic synapses. Atropine (competitive muscarinic antagonist) reverses SLUDGE + bradycardia + bronchoconstriction/secretions — DOES NOT reverse nicotinic effects (weakness, fasciculations). Oximes (pralidoxime, obidoxime): reactivate AChE if given before 'ageing' occurs (within 24–48h) — reverse both muscarinic and nicotinic effects.",
  },
  {
    id: 817,
    subject: "Forensic Medicine",
    stem: "Strychnine is classified as a spinal poison. Unlike most CNS poisons, it does NOT cause primary central respiratory depression because:",
    options: ["It only affects peripheral nerves", "It blocks glycine (inhibitory neurotransmitter) receptors in the spinal cord, causing hyperexcitability without brainstem depression", "It stimulates GABA receptors in the medulla", "It acts only at the neuromuscular junction"],
    answer: 1,
    explanation: "Strychnine blocks glycine (inhibitory neurotransmitter) receptors in the spinal cord and medulla → unopposed motor neuron discharge → violent generalised tetanic convulsions (risus sardonicus, opisthotonus) triggered by any stimulus. Death is from exhaustion and/or asphyxia during seizures — but the respiratory centre itself is not primarily depressed. Contrast with opioids (respiratory centre depression). Treatment: diazepam, muscle relaxants, ventilation.",
  },
  {
    id: 818,
    subject: "Forensic Medicine",
    stem: "The characteristic odour of hydrogen cyanide (HCN) poisoning is described as:",
    options: ["Garlic", "Bitter almonds", "Rotten eggs (H₂S)", "Acetone"],
    answer: 1,
    explanation: "Cyanide (HCN): bitter almonds odour (not detectable by ~40% of the population due to genetic anosmia). Organophosphates: garlic odour. H₂S: rotten eggs. Arsenic: garlic. Phosphorus: garlic/matches. Chloroform: sweetish. Cyanide mechanism: inhibits cytochrome c oxidase (Complex IV) → histotoxic hypoxia. Treatment: hydroxocobalamin (first-line), sodium thiosulphate + dicobalt edetate.",
  },
];


// Validate every question at module load. In development a Zod error pinpoints
// the exact question that has a bad field; in production the parse is a no-op
// on valid data (every field already matches the schema).
const parsed = z.array(QuestionSchema).safeParse(RAW_QUESTIONS);
if (!parsed.success) {
  // Log a human-readable summary rather than crashing the app
  console.error(
    "[questions] Data validation failed. Fix the following before shipping:\n" +
    parsed.error.issues
      .map(i => `  Q#${RAW_QUESTIONS[i.path[0] as number]?.id ?? "?"} [${i.path.join(".")}]: ${i.message}`)
      .join("\n")
  );
}

export const QUESTIONS: Question[] = parsed.success ? parsed.data : (RAW_QUESTIONS as Question[]);

// Pre-built subject index for O(1) lookups — use this instead of QUESTIONS.filter()
export const QUESTIONS_BY_SUBJECT: ReadonlyMap<QuestionSubject, Question[]> = new Map(
  QUESTION_SUBJECTS.map(subj => [
    subj,
    QUESTIONS.filter(q => q.subject === subj),
  ])
);

