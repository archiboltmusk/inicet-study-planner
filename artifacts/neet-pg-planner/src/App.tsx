import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  CheckCircle, Circle, ChevronLeft, ChevronRight, Clock,
  Target, Calendar, BookOpen, Flag, Crosshair, AlertTriangle,
  ShieldAlert, ListChecks, Download, Search, Trophy,
  Play, Pause, RotateCcw, Flame, Award, Zap,
  X, Star, TrendingUp, Map, Activity, StickyNote,
} from "lucide-react";

/* ============================================================ */
/*  CORE DATA                                                    */
/* ============================================================ */

const EXAM_DATE = new Date("2026-05-16T09:00:00");

const PHASES = [
  { id: "blitz",    label: "Blitz Pass",          days: [1,  18] as [number,number], color: "#C42847" },
  { id: "revision", label: "Rapid Revision",       days: [19, 24] as [number,number], color: "#E8A93D" },
  { id: "mock",     label: "Mock & Consolidate",   days: [25, 28] as [number,number], color: "#C42847" },
];

const SUBJECTS = ["All","Medicine","Surgery","Pathology","Pharmacology","OBG","Paediatrics","PSM","Microbiology","Biochemistry","Forensic","Anatomy/Physio","Revision","Full Mock"];

const SUBJECT_COLORS: Record<string,string> = {
  Medicine: "#C42847", Surgery: "#a855f7", Pathology: "#E8A93D",
  Pharmacology: "#10b981", OBG: "#ec4899", Paediatrics: "#38bdf8",
  PSM: "#8b5cf6", Microbiology: "#E8A93D", Biochemistry: "#06d6a0",
  Forensic: "#94a3b8", "Anatomy/Physio": "#64748b",
  Revision: "#E8A93D", "Full Mock": "#C42847", "Exam Eve": "#E8A93D",
};

const DAILY_BLOCKS = [
  { time:"6:00–9:00 AM",    label:"New topic study (Marrow)",         icon:"📖" },
  { time:"9:00–10:00 AM",   label:"MCQs on yesterday's topic",        icon:"❓" },
  { time:"10:00 AM–1:00 PM",label:"New topic continues",              icon:"📖" },
  { time:"1:00–2:00 PM",    label:"Break + light review",             icon:"☕" },
  { time:"2:00–5:00 PM",    label:"New topic study",                  icon:"📖" },
  { time:"5:00–6:00 PM",    label:"MCQs on today's topics",           icon:"❓" },
  { time:"6:00–8:00 PM",    label:"'World of' revision notes",        icon:"📝" },
  { time:"8:00–9:00 PM",    label:"India-specific one-liners",        icon:"🇮🇳" },
  { time:"9:00–10:00 PM",   label:"Image review (15–20 images)",      icon:"🔬" },
  { time:"10:00–11:00 PM",  label:"Write 5 key high-yield points",    icon:"✍️" },
];

const SCHEDULE = [
  { day:1,  phase:"blitz",    subject:"Medicine",     color:"#C42847", focus:"Cardiology",                        marrow:"Cardiology module — complete",              topics:["Heart failure — Framingham criteria, NYHA, management ladder (ARNI, SGLT2i)","IHD — STEMI vs NSTEMI, thrombolytics, primary PCI window","Hypertension — ISH 2020, India HTN guidelines, resistant HTN definition","Rheumatic fever — Jones criteria (major + minor), penicillin prophylaxis","Cardiomyopathies — HCM, DCM, RCM key differentiators + management"], mcq:"Reflex: Cardiology 40 Qs. Target >80% accuracy.", india:"Rheumatic heart disease — highest burden in India among young adults. NFHS-5: CVD rising. Penicillin prophylaxis schedule: monthly benzathine penicillin for 10 years or till age 25.", images:"ECG: STEMI patterns (ST elevation by territory), LBBB, AF, complete heart block. Echo: HCM asymmetric septal hypertrophy, LVEF in DCM." },
  { day:2,  phase:"blitz",    subject:"Medicine",     color:"#C42847", focus:"Respiratory + Nephrology",          marrow:"Respiratory + Nephrology modules",           topics:["COPD — GOLD 2023 staging (spirometry-based), LABA/LAMA/ICS stepwise therapy","Asthma — GINA 2023 steps, severe acute asthma management, biologics (omalizumab)","TB — NTEP 2023 regimens, DR-TB (MDR/XDR), DOTS strategy, BCG efficacy","Nephrotic vs Nephritic — causes, protein loss, haematuria, complement levels","CKD — KDIGO staging, anaemia of CKD (EPO), dialysis indications, renal replacement"], mcq:"Reflex: Respiratory 30 Qs + Nephrology 20 Qs", india:"NTEP regimens: 2HRZE/4HR (DS-TB), BDQ+LZD+PA (DR-TB). India TB incidence: 210/100,000 (WHO 2023). PMDT programme. RNTCP → NTEP transition 2020.", images:"CXR: consolidation, pleural effusion, TB (apical, miliary, cavitation). Renal biopsy: IgA nephropathy mesangial deposits, MPGN tram-track." },
  { day:3,  phase:"blitz",    subject:"Medicine",     color:"#C42847", focus:"Neurology + Endocrinology",         marrow:"Neurology + Endocrinology modules",          topics:["Stroke — TOAST classification, tPA criteria (4.5hr window), NIHSS, thrombectomy","Epilepsy — ILAE 2017 classification, DOC per seizure type, status epilepticus Mx","Diabetes — ADA 2024 HbA1c targets, insulin types, DKA vs HHS management","Thyroid — hypothyroid (levothyroxine dosing), hyperthyroid (carbimazole/PTU), thyroid storm","Cushing's — ACTH-dependent vs independent, overnight dexamethasone suppression test"], mcq:"Reflex: Neurology 25 Qs + Endocrinology 25 Qs", india:"India diabetes burden: 101 million (IDF 2023, highest globally). Iodine deficiency — National IDD programme, salt iodization mandate. Goitre belt: sub-Himalayan region.", images:"CT brain: ischaemic stroke (hypodense), haemorrhagic (hyperdense), midline shift. MRI: MS plaques, Wallerian degeneration." },
  { day:4,  phase:"blitz",    subject:"Medicine",     color:"#C42847", focus:"GI + Haematology + Rheumatology",  marrow:"GI + Haematology modules",                  topics:["Liver cirrhosis — Child-Pugh vs MELD scoring, variceal bleed (terlipressin + banding), SBP","IBD — Crohn's vs UC (key differences), biologics (infliximab, vedolizumab), complications","Anaemias — iron studies interpretation, thalassaemia (α vs β), Hb electrophoresis patterns","Leukaemias — ALL vs AML vs CML differentiators, blast percentage thresholds","SLE — SLICC 2012 criteria, anti-dsDNA, anti-Sm, complement levels, lupus nephritis class"], mcq:"Reflex: GI 20 Qs + Haematology 20 Qs + Rheumatology 10 Qs", india:"Sickle cell disease — highest in tribal India (Odisha, Chhattisgarh, Jharkhand). National Sickle Cell Anaemia Elimination Mission 2023 — target: eliminate by 2047.", images:"Peripheral smear: sickle cells, target cells, hypersegmented neutrophils, blast cells, Reed-Sternberg cells, ringed sideroblasts." },
  { day:5,  phase:"blitz",    subject:"Surgery",      color:"#c77dff", focus:"GI Surgery + Hernias",              marrow:"GI Surgery module",                         topics:["Surgical abdomen — appendicitis (Alvarado score), peritonitis, bowel obstruction management","Hernias — inguinal anatomy (Hesselbach triangle), direct vs indirect, Lichtenstein vs TEP/TAPP","Colorectal — Duke's vs TNM staging, FAP (APC gene), Lynch syndrome (MMR genes), CRC Mx","Hepatobiliary — cholelithiasis, CBD stones (Charcot triad, Reynolds pentad), cholangitis","Thyroid surgery — indications, RLN injury (hoarseness), post-op hypocalcaemia management"], mcq:"Reflex: GI Surgery 40 Qs", india:"Gallbladder carcinoma: highest incidence globally in North India (Gangetic belt — Varanasi, Patna). Salmonella typhi association. Surgical approach: radical cholecystectomy.", images:"AXR: free gas under diaphragm, fluid levels (SBO). CT abdomen: appendicitis (fat stranding), perforation, pancreatitis (CT severity index)." },
  { day:6,  phase:"blitz",    subject:"Surgery",      color:"#c77dff", focus:"Trauma + Oncosurgery + Vascular",  marrow:"Trauma + Breast + Vascular modules",        topics:["ATLS — primary survey (ABCDE), shock classification (I–IV by blood loss volume)","Breast cancer — TNM staging, SLNB indications, MRM vs BCS, hormone receptor therapy","Head and neck — thyroid Ca (papillary = best prognosis, anaplastic = worst), parotid tumours","Peripheral vascular — ABI interpretation, critical limb ischaemia, AAA (>5.5cm surgery)","Burns — Wallace rule of 9s, Parkland formula (4ml/kg/%TBSA), escharotomy indications"], mcq:"Reflex: Trauma + Oncosurgery 40 Qs", india:"Oral cancer — India has 1/3 of global burden. Tobacco/betel nut (areca) etiology. OSCC most common. Surgical margins: 1cm minimum. Neck dissection types.", images:"CT chest: tension pneumothorax (mediastinal shift), haemothorax. Mammogram: spiculated mass, microcalcifications. Burn depth assessment photos." },
  { day:7,  phase:"blitz",    subject:"Pathology",    color:"#fb8500", focus:"General Pathology + Haematopathology", marrow:"General Pathology + Haematopathology",   topics:["Cell injury — reversible changes (cloudy swelling), irreversible (karyolysis/karyorrhexis/pyknosis), apoptosis","Inflammation — acute (neutrophils), chronic (macrophages/lymphocytes), granulomas (TB: caseating; sarcoid: non-caseating)","Neoplasia — hallmarks of cancer (8 hallmarks), oncogenes vs tumour suppressors, carcinogenesis (initiation/promotion/progression)","Lymphomas — HL (Reed-Sternberg, subtypes: NSCHL most common) vs NHL (diffuse large B cell most common)","Amyloidosis — AL (primary/myeloma), AA (secondary/TB), congo red + apple-green birefringence"], mcq:"Reflex: General Pathology + Haematopathology 40 Qs", india:"Tropical splenomegaly (hyperreactive malarial splenomegaly) — India-specific. Visceral leishmaniasis (kala-azar): Bihar, Jharkhand, West Bengal. Aldehyde test (Napier).", images:"H&E: granulomas (TB vs sarcoid), Reed-Sternberg cells (owl-eye), amyloid deposits, necrosis types (coagulative vs liquefactive vs caseous)." },
  { day:8,  phase:"blitz",    subject:"Pathology",    color:"#fb8500", focus:"Systemic Pathology",                marrow:"Systemic Pathology module",                 topics:["Cardiac path — MI zones (coagulative necrosis 6hr), timeline of changes (neutrophils→macrophages→fibrosis)","Renal path — glomerulonephritides: IgA (mesangial), membranous (spike & dome), MPGN (tram-track), MCD (podocyte fusion)","Liver path — hepatitis patterns (bridging necrosis, piecemeal), cirrhosis (micronodular vs macronodular), HCC","Lung path — lobar vs bronchopneumonia, ARDS (hyaline membranes), adenocarcinoma vs SCC vs SCLC","Neuropath — Alzheimer (senile plaques + NFT), Parkinson (Lewy bodies, substantia nigra), WHO 2021 glioma grading (IDH mutation)"], mcq:"Reflex: Systemic Pathology 40 Qs", india:"Oral submucous fibrosis — India-specific precancerous lesion, areca nut etiology, juxtaepithelial fibrosis on biopsy. HBV carrier: 40 million in India.", images:"Renal biopsy EM: podocyte effacement (MCD), subepithelial deposits (membranous), mesangial (IgA). Liver: Mallory bodies, fatty change." },
  { day:9,  phase:"blitz",    subject:"Pharmacology", color:"#06d6a0", focus:"ANS + CVS + CNS Pharmacology",     marrow:"ANS + CVS + CNS Pharmacology",              topics:["Adrenergic drugs — α1/α2/β1/β2 selectivity chart, clinical uses, phaeochromocytoma Mx","Antihypertensives — mechanism per class, compelling indications (ACEi in DM nephropathy, β-blocker post-MI)","Antiarrhythmics — Vaughan Williams classification (I–IV), DOC per arrhythmia type","Antiepileptics — DOC per seizure (absence: ethosuximide/valproate, tonic-clonic: valproate), enzyme induction/inhibition","Antipsychotics — typical (D2 block, EPS) vs atypical (5HT2A+D2, metabolic SE), NMS vs serotonin syndrome"], mcq:"Reflex: ANS + CVS + CNS Pharmacology 40 Qs", india:"NDPS Act 1985 — Schedule I (cannabis, cocaine, heroin), II, III. Small quantity vs commercial quantity thresholds (cannabis: 1kg vs 20kg). Section 27: punishment for consumption.", images:"Receptor selectivity diagrams. ECG effects: quinidine (QT prolongation), digoxin (ST scooping, heart block)." },
  { day:10, phase:"blitz",    subject:"Pharmacology", color:"#06d6a0", focus:"Antimicrobials + Anticancer + Clinical", marrow:"Antimicrobial + Anticancer Pharmacology", topics:["Antibiotics — mechanism (cell wall/protein/DNA synthesis), spectrum, ESKAPE organisms + resistance","Antifungals — azoles (CYP inhibition), amphotericin B (ergosterol binding, nephrotoxic), echinocandins","Anticancer — cell cycle specificity chart, targeted therapy (imatinib/BCR-ABL, trastuzumab/HER2), checkpoint inhibitors","NSAIDs + opioids — COX-1 vs COX-2, ceiling effect concept, WHO analgesic ladder, opioid conversion","Drug interactions — warfarin (enzyme inducers/inhibitors), lithium (NSAID/thiazide interaction), digoxin toxicity"], mcq:"Reflex: Antimicrobials + Clinical Pharmacology 40 Qs", india:"NLEM 2022 (National List of Essential Medicines) — new additions: bedaquiline, delamanid (DR-TB), dolutegravir (HIV). PMJAY drug formulary.", images:"Antibiotic mechanism diagrams. Cancer pathway diagrams: BCR-ABL, HER2, PD-1/PD-L1 checkpoint." },
  { day:11, phase:"blitz",    subject:"OBG",          color:"#f72585", focus:"Obstetrics",                        marrow:"Obstetrics module",                         topics:["ANC — PMSMA schedule, investigations per trimester, double/triple/quadruple marker interpretation","APH — placenta praevia (grades I–IV, USG diagnosis) vs abruptio (Couvelaire uterus, DIC risk)","PPH — 4 Ts (Tone 80%), oxytocin/carboprost/tranexamic acid protocol, B-Lynch suture, PPH drill","Pre-eclampsia/eclampsia — criteria (BP 140/90 + proteinuria), magnesium toxicity (loss of DTR first), antihypertensives","Preterm labour — tocolytics (nifedipine first line), antenatal steroids (34 weeks), surfactant (RDS threshold)"], mcq:"Reflex: Obstetrics 40 Qs", india:"JSSK benefits: free delivery, C-section, drugs, diagnostics, blood, diet, transport. JSY incentive: ₹1400 rural/₹1000 urban. MMR India: 97/100,000 live births (SRS 2018-20).", images:"USG: placenta praevia grades, biophysical profile scoring (5 parameters), Doppler: absent/reversed end-diastolic flow." },
  { day:12, phase:"blitz",    subject:"OBG",          color:"#f72585", focus:"Gynaecology",                       marrow:"Gynaecology module",                        topics:["Cervical cancer — HPV 16/18, FIGO 2018 staging, colposcopy findings (acetowhite, punctation), LEEP vs cone biopsy","Ovarian tumours — WHO classification (epithelial/germ cell/sex cord), tumour markers (CA-125, AFP, β-HCG, LDH, inhibin)","Fibroids — FIGO PALM-COEIN classification, medical (GnRH agonist, LNG-IUS) vs surgical (myomectomy vs hysterectomy)","Infertility — WHO definition, semen analysis (WHO 2021 criteria), ovulation induction, IVF indications","PCOD — Rotterdam criteria (2/3), insulin resistance, metformin + clomiphene, OHSS risk"], mcq:"Reflex: Gynaecology 40 Qs", india:"India HPV vaccination: 9-valent vaccine, target age 9-14 girls, school-based programme 2023. Cervical cancer: 2nd most common cancer in Indian women (18.3/100,000).", images:"Colposcopy: acetowhite epithelium, punctation, mosaic. USG: polycystic ovaries (>20 follicles per ovary, 'string of pearls')." },
  { day:13, phase:"blitz",    subject:"Paediatrics",  color:"#4cc9f0", focus:"Neonatology + Growth + Infections", marrow:"Paediatrics module",                       topics:["Neonatology — APGAR (5 parameters), NRP algorithm (warmth→stimulate→PPV→chest compressions→epinephrine), RDS (surfactant threshold <34wks)","Neonatal jaundice — physiological vs pathological, phototherapy thresholds (Bhutani nomogram), exchange transfusion","Malnutrition — SAM (MUAC <11.5cm, WHZ <-3SD), MAM (MUAC 11.5-12.5cm), F-75/F-100/RUTF protocol","UIP 2024 — all vaccines + schedule + new additions (PCV10, Rota, IPV, adult JE), cold chain requirements","Paediatric infections — measles (Koplik spots, complications: pneumonia/encephalitis), dengue (NS1/IgM/IgG), typhoid (Widal titre)"], mcq:"Reflex: Paediatrics 40 Qs", india:"IMNCI classification: assess→classify→treat. RBSK (Rashtriya Bal Swasthya Karyakram): screening at birth, 6wks, 6m, 9m, 12m, 2yr, 5yr. Mission Indradhanush: target >90% full immunisation.", images:"Growth charts (WHO): WAZ, HAZ, WHZ. X-ray: RDS (ground glass + air bronchogram). Rash: measles vs chickenpox vs roseola vs rubella." },
  { day:14, phase:"blitz",    subject:"PSM",          color:"#8338ec", focus:"Epidemiology + Biostatistics",      marrow:"PSM Epidemiology + Biostatistics",           topics:["Study designs — case-control vs cohort vs RCT vs cross-sectional: strengths, limitations, when to use","Measures — RR (cohort), OR (case-control), AR, PAR, NNT, NNH — how to calculate from 2×2 table","Biostatistics — sensitivity/specificity, PPV/NPV (prevalence dependent), LR+/LR-, ROC curve (AUC >0.8 = good test)","Screening — Wilson-Jungner criteria (10 criteria), lead time bias, length bias, overdiagnosis bias","Statistical tests — t-test (parametric, 2 groups), ANOVA (3+ groups), chi-square (categorical), Mann-Whitney (non-parametric)"], mcq:"Reflex: Epidemiology + Biostatistics 40 Qs", india:"NFHS-5 (2019-21) KEY STATS: TFR 2.0, MMR 97, IMR 35.2, NMR 28.2, U5MR 41.9, institutional delivery 88.6%, full immunisation 76.4%, stunting 35.5%, wasting 19.3%.", images:"Epidemic curves: common source (single peak) vs propagated (multiple peaks). ROC curve. 2×2 table for test characteristics." },
  { day:15, phase:"blitz",    subject:"PSM",          color:"#8338ec", focus:"National Programmes + Disease Control", marrow:"PSM National Programmes + Disease Control", topics:["NHM — ASHA (roles: 85+ tasks), ANM, AWW; PHC norms (1/30,000 population, 6 beds), CHC (80 beds, specialists)","Nutrition — ICDS (Anganwadi: 6 services), PM POSHAN (midday meal), POSHAN Abhiyaan targets","Vector-borne — malaria (ACT: Artesunate+SP for P.vivax; AL for P.falciparum), dengue (NS1 first 5 days), filariasis MDA","TB programme — NTEP cascade: presumptive→diagnosed→notified→treated→cured. Private sector notification mandatory","Water quality — bacteriological standard: 0 coliform/100ml (drinking), MPN method, chlorination (0.5mg/L residual)"], mcq:"Reflex: PSM National Programmes 30 Qs + 10 environmental health Qs", india:"Kala-azar elimination: target <1 case/10,000 population at block level. NVBDCP manages all vector-borne diseases. Filariasis elimination target 2027 — MDA with DEC+Albendazole+Ivermectin.", images:"PHC/CHC organogram. Water treatment flow diagram. Malaria life cycle (definitive host = Anopheles female)." },
  { day:16, phase:"blitz",    subject:"Microbiology", color:"#ffb703", focus:"Bacteriology + Virology",           marrow:"Bacteriology + Virology modules",            topics:["Gram positive — Staph aureus (toxins: TSS-1, TSST, exfoliatin), MRSA (vancomycin), Strep pyogenes (ASO titre)","Gram negative — E.coli pathotypes (ETEC/EPEC/EHEC/EIEC), Salmonella typhi (rose spots, Widal), H.pylori (CLO test)","Mycobacteria — M.tb (Ghon focus→complex→Ranke complex), leprosy (Ridley-Jopling classification, BI, MI)","DNA viruses — HBV serology (HBsAg/anti-HBs/HBeAg/anti-HBe/anti-HBc IgM), herpes latency sites","RNA viruses — HIV (CD4 staging: <200 = AIDS, ART: TLD first line), influenza (antigenic shift = pandemic, drift = epidemic)"], mcq:"Reflex: Bacteriology + Virology 40 Qs", india:"NACO ART 2021: TLD (TDF+3TC+DTG) first line. VL monitoring: at 6m, 12m, then annually. HIV prevalence India: 0.22% (2021). NACP-V targets.", images:"Gram stains: gram+cocci clusters (Staph), gram-rods (E.coli). HBV serology interpretation chart. HIV Western blot bands." },
  { day:17, phase:"blitz",    subject:"Microbiology", color:"#ffb703", focus:"Parasitology + Mycology + Biochemistry", marrow:"Parasitology + Biochemistry Molecular",  topics:["Malaria — 4 Plasmodium species (vivax: Schüffner dots, falciparum: Maurer clefts, malariae: band forms), life cycle","GI parasites — Entamoeba histolytica (trophozoite with RBCs, flask-shaped ulcer), Giardia (pear-shaped, teardrop trophozoite), Ascaris","Fungi — Candida (germ tube test), Aspergillus (V-shaped hyphae at 45°), Cryptococcus (India ink, latex agglutination)","Biochemistry: Molecular — CRISPR-Cas9 mechanism, PCR types (RT-PCR, real-time, multiplex), DNA repair (NER, BER, MMR)","Biochemistry: LSDs — Gaucher (glucocerebrosidase), Niemann-Pick (sphingomyelinase), Tay-Sachs (hex-A), Fabry (α-galactosidase)"], mcq:"Reflex: Parasitology + Biochemistry 30 Qs", india:"Lymphatic filariasis — W.bancrofti in India (mosquito: Culex). MDA: DEC+Albendazole+Ivermectin triple drug therapy. Nocturnal periodicity. Night blood smear for microfilariae.", images:"Thick/thin smear: P.falciparum (crescent gametocytes), P.vivax (enlarged RBC). Fungal KOH mounts. Ascaris egg (mammillated coat)." },
  { day:18, phase:"blitz",    subject:"Forensic",     color:"#adb5bd", focus:"Complete Forensics + India Legal",  marrow:"Forensic Medicine module",                  topics:["Thanatology — signs of death, rigor mortis (ATP depletion, 3-6hr onset, 12hr complete, 48-72hr disappears), putrefaction","Wounds — incised (clean edges), lacerated (irregular), contused (bruise), defence wounds location, firearm (entry vs exit)","Toxicology — organophosphate (SLUDGE/DUMBELS, pralidoxime + atropine), CO poisoning (COHb, cherry-red), snakebite (polyvalent ASV)","Sexual offences — IPC 375 (rape, 7 clauses), IPC 376 (punishment: 7yr minimum), MTP Act 2021 (24 weeks for special categories)","Legal medicine — MHCA 2017 vs MHA 1987 (key differences: rights-based, advance directive, nominated representative), POCSO 2012"], mcq:"Reflex: Forensics 40 Qs", india:"NDPS Act 1985: Schedule I substances. Small quantity (cannabis 1kg, heroin 5g) vs commercial (cannabis 20kg, heroin 250g). IPC 304A: death by negligence (2yr). MHCA 2017: Section 3 — mental illness definition; Section 31 — advance directive.", images:"Wound patterns: stab (clean edges), laceration (bridging tissue), firearm (stellate entry from contact range). Ligature marks: suspension vs strangulation." },
  { day:19, phase:"revision", subject:"Revision",     color:"#E8A93D", focus:"Medicine + Surgery Weak Areas",     marrow:"Weak area targeted revision",               topics:["Re-attempt all incorrect MCQs from Days 1–6 (minimum 60 Qs)","Medicine: Cranial nerve palsies (III/IV/VI/VII/XII), UMN vs LMN signs table","Medicine: Dermatology — SLE rash, psoriasis (Auspitz sign), erythema nodosum vs multiforme","Surgery: Orthopaedics — fractures + nerve injuries (radial nerve in humeral shaft, common peroneal in neck fibula)","Surgery: Urology — BPH (IPSS score, alpha-blockers vs 5α-reductase), RCC (clear cell, VHL gene), TCC bladder"], mcq:"Reflex: Full Medicine + Surgery mock — 80 Qs in 60 min. Track time per question.", india:"Revisit: NTEP regimens, JSSK benefits, MMR/IMR/U5MR NFHS-5 figures. Write them from memory.", images:"Radiology revision sprint: 30 CXR + abdominal CT + ortho X-ray images. Identify without labels." },
  { day:20, phase:"revision", subject:"Revision",     color:"#E8A93D", focus:"Pathology + Pharmacology Deep Revision", marrow:"Targeted weak area revision",          topics:["Pathology: Tumour suppressors — p53 (Li-Fraumeni), Rb (retinoblastoma), BRCA1/2 (breast/ovarian), APC (FAP), VHL (RCC)","Pathology: Autoantibody chart — ANA (SLE), anti-dsDNA (specific for SLE), anti-Sm, anti-Ro/La, ANCA (c-ANCA=GPA, p-ANCA=MPA)","Pharmacology: High-risk interactions — warfarin + enzyme inducers (rifampicin, phenytoin), serotonin syndrome (SSRI+tramadol+linezolid)","Pharmacology: Pregnancy safety — absolute teratogens (thalidomide, isotretinoin, valproate, warfarin, methotrexate)","Pharmacology: Drug-induced conditions — SLE (hydralazine, procainamide), lupus nephritis, drug fever"], mcq:"Reflex: Pathology + Pharmacology mock — 80 Qs", india:"NLEM 2022 additions review. Teratogen counselling in pregnancy — MoHFW guidelines.", images:"IF patterns: IgA nephropathy (mesangial), lupus nephritis class IV (full house), anti-GBM (linear). Autoantibody clinical correlation chart." },
  { day:21, phase:"revision", subject:"Revision",     color:"#E8A93D", focus:"OBG + Paediatrics Consolidation",   marrow:"OBG + Paediatrics revision",               topics:["OBG: Bishop score (6 parameters, >8 = favourable cervix), modified Bishop, induction vs augmentation","OBG: Forceps types (Wrigley/outlet, Neville-Barnes/mid), ventouse indications, contraindications","Paediatrics: CHD — acyanotic (VSD: most common, pansystolic murmur; ASD: fixed split S2; PDA: machinery murmur)","Paediatrics: Cyanotic CHD — ToF (4 features, boot-shaped heart, right-to-left shunt, squatting)","Paediatrics: Developmental milestones — social smile (6wks), head control (3m), sits (6m), stands (9m), walks (12m), 2-word sentences (2yr)"], mcq:"Reflex: OBG + Paediatrics mock — 80 Qs", india:"PMSMA: 9th of every month, free ANC at government health facilities. RBSK: 4D screening (Defects at birth, Diseases, Deficiencies, Development delays).", images:"CTG interpretation: baseline, variability, accelerations, decelerations (early/late/variable). Paediatric CXR: ToF boot-shaped heart, VSD cardiomegaly." },
  { day:22, phase:"revision", subject:"Revision",     color:"#E8A93D", focus:"PSM + Microbiology + Biochemistry Sprint", marrow:"PSM + Micro + Biochem targeted",     topics:["PSM: Statistical tests decision tree — parametric vs non-parametric, paired vs unpaired, correlation vs regression","PSM: Health indicators — DALYs (YLL + YLD), QALY, HDI components, GBD 2021 India top causes","Microbiology: TORCH — Toxoplasma (IgG avidity), Rubella (vaccination history), CMV (most common congenital), HSV (neonatal)","Biochemistry: Enzyme kinetics — Michaelis-Menten (Km=substrate at Vmax/2), competitive vs non-competitive inhibition (Lineweaver-Burk)","Biochemistry: Porphyrias — AIP (Watson-Schwartz test, urine turns dark), PCT (photosensitivity, uroporphyrin)"], mcq:"50-Q India-specific sprint: programmes, statistics, acts — timed 40 minutes", india:"GBD 2021 India: top causes of DALYs — ischaemic heart disease, neonatal disorders, COPD, lower respiratory infections, diabetes. Nutrition transition: double burden.", images:"Biochemistry pathway diagrams: urea cycle, porphyrin synthesis. TORCH serology interpretation flowchart." },
  { day:23, phase:"revision", subject:"Revision",     color:"#E8A93D", focus:"India-Specific Masterclass Day",     marrow:"India-specific content — all subjects",     topics:["Legal framework: NDPS 1985, MHCA 2017 (Sections 3/18/31/89/103), POCSO 2012, IPC 302/304A/375/376, MTP Act 2021","National Programmes complete: NHM, NTEP, NVBDCP, NACP-V, NPCB, NMHP — targets + 2023 achievements","NFHS-5 state extremes: highest IMR (MP 43), lowest IMR (Kerala 6); highest TFR (Bihar 2.98), lowest (Sikkim 1.1)","MoHFW 2023-24 circulars: new drug approvals (nirsevimab for RSV), guideline updates, NLEM changes","Historical epidemics in India: plague (Surat 1994), Nipah (Kerala 2018, 2023), COVID-19 (India-specific data)"], mcq:"80-Q India-specific grand test — pure India content", india:"This entire day IS India-specific content. No other resource needed. This is your biggest rank differentiator.", images:"Health programme logos and visual mnemonics. India map: disease burden by state (TB, malaria, kala-azar endemic zones)." },
  { day:24, phase:"revision", subject:"Revision",     color:"#E8A93D", focus:"Image Bank Masterclass + Integration", marrow:"Image bank + cross-subject integration",  topics:["50 histopathology images — rapid identification without prompts (H&E staining patterns)","30 radiology images — CXR (10), CT brain (5), CT abdomen (5), ortho X-ray (5), MRI (5)","20 clinical photos — dermatology rashes (5), ophthalmology (5), peripheral smears (5), clinical signs (5)","40 cross-subject integration Qs — single question requires 2+ subject knowledge (Pathology+Medicine+Pharmacology)","Review all bookmarked/flagged difficult questions from Days 1–23 in Reflex"], mcq:"Image-based 80-Q mock — set to image-only mode in Reflex", india:"Dermatology India: leprosy (Ridley-Jopling: TT/BT/BB/BL/LL), cutaneous leishmaniasis (painless ulcer with raised edges), chromoblastomycosis (cauliflower lesion).", images:"This IS the day. Build visual logbook of every misidentified image. Don't move on without identifying it correctly." },
  { day:25, phase:"mock",     subject:"Full Mock 1",  color:"#C42847", focus:"Full 200-Q Timed Exam Simulation",  marrow:"Grand test — exam conditions",              topics:["Attempt full 200-Q mock in strict 4 × 45-minute sections — no pausing","Tag each answer: SURE (attempt) / UNSURE (attempt with caution) / GUESS (skip or 60% rule)","Post-mock: calculate raw score. Negative marking: +1 correct, -0.33 wrong, 0 unanswered","Analyse: which subjects had highest miss rate? Which question types (clinical vignette vs single-topic vs image)?","Rank your top 3 weak areas by number of incorrect answers — these get emergency attention Days 26-27"], mcq:"200 Qs in 180 minutes — full exam simulation", india:"Flag every India-specific question you got wrong — highest priority for revision", images:"Note every image question you got wrong — add to visual logbook immediately after mock" },
  { day:26, phase:"mock",     subject:"Full Mock 2",  color:"#C42847", focus:"Emergency Targeted Revision + Mock 2", marrow:"Targeted revision + grand test",          topics:["Morning (3hr): Emergency revision — only top 3 weak areas from Mock 1. No other subjects.","Use 'The World of' notes only — no first-pass reading. Revision mode only.","Build your cheat sheet: 1 A4 page per subject, maximum 10 bullet points, only things you kept getting wrong","Afternoon: Full 200-Q Mock 2 — strict exam conditions","Evening: Compare Mock 1 vs Mock 2 scores. Are weak areas improving?"], mcq:"Full Mock 2 — 200 Qs. Track improvement vs Mock 1.", india:"Update India one-pager: add any missed programme statistics from Mock 1 errors", images:"20-image rapid review: only image types missed in Mock 1" },
  { day:27, phase:"mock",     subject:"Full Mock 3",  color:"#C42847", focus:"Final Mock + Consolidation",         marrow:"Final grand test + 'World of' notes",       topics:["Morning: Full 200-Q Mock 3 — aim for highest accuracy yet","Post-mock: final analysis. If accuracy <70%, identify single highest-yield subject and revise 2 hours.","Afternoon: Rapid pass through all 'The World of' revision notes — 30 min per subject maximum","Evening: Read cheat sheets only — 1 pass, no adding new content","Night: Pack bag, prepare admit card print, valid ID. Sleep by 10 PM — non-negotiable."], mcq:"Full Mock 3 — 200 Qs. Final benchmark.", india:"Final 10-min read: NDPS schedules, MHCA 2017 key sections, NFHS-5 top stats, MMR/IMR", images:"Final 20-image sprint — only your personal logbook of previously missed images" },
  { day:28, phase:"mock",     subject:"Exam Eve",     color:"#C42847", focus:"Exam Day — You Are Ready",           marrow:"Rest",                                      topics:["Read cheat sheets ONLY — maximum 2 hours total, then stop","Revise your strongest subjects — build confidence, not anxiety","Logistics: admit card printed, valid government ID, black/blue pens, water bottle","Light meal, good hydration, short 20-min walk in fresh air","Sleep by 9:30 PM. You have covered everything. Trust the work."], mcq:"Maximum 20 Qs — only your most confident topic, only for momentum. Stop by 2 PM.", india:"One final glance: NFHS-5 key figures + NDPS + MHCA 2017. 5 minutes only.", images:"None. Rest your eyes for tomorrow." },
];

/* ============================================================ */
/*  GAMIFICATION DATA                                           */
/* ============================================================ */

const ACHIEVEMENTS = [
  { id:"first_blood",   label:"First Step",       desc:"Complete Day 1",               emoji:"🎯", xp:50  },
  { id:"on_fire",       label:"On Fire",           desc:"3-day study streak",           emoji:"🔥", xp:75  },
  { id:"week_warrior",  label:"Week Warrior",      desc:"Complete 7 days",              emoji:"⚡", xp:100 },
  { id:"halfway",       label:"Halfway Hero",      desc:"Complete 14 days",             emoji:"🏃", xp:200 },
  { id:"blitz_champ",   label:"Blitz Champion",   desc:"Complete all 18 Blitz days",   emoji:"💪", xp:300 },
  { id:"note_master",   label:"Note Master",       desc:"Write notes for 5+ days",      emoji:"✍️", xp:100 },
  { id:"war_ready",     label:"War Ready",         desc:"All 28 days complete!",        emoji:"👑", xp:1000},
];

const QUOTES = [
  "The AIIMS seat doesn't go to the smartest. It goes to the one who didn't stop.",
  "28 days of war. One seat. You started. Don't stop.",
  "Every MCQ you solve today is a question you won't miss on May 16.",
  "Consistency beats intensity. Show up every single day.",
  "Pain of preparation is temporary. Regret is permanent.",
  "You are not studying. You are building a rank.",
  "India stats memorised today decide your rank tomorrow.",
  "Topper and you — the only difference is the hours put in.",
];

/* ============================================================ */
/*  UTILITY FUNCTIONS                                           */
/* ============================================================ */

function computeStreak(days: number[]): number {
  if (!days.length) return 0;
  const s = [...days].sort((a,b) => a-b);
  let max = 1, cur = 1;
  for (let i = 1; i < s.length; i++) {
    cur = s[i] === s[i-1]+1 ? cur+1 : 1;
    max = Math.max(max, cur);
  }
  return max;
}

function computeXP(days: number[], notes: Record<number,string>): number {
  let xp = days.length * 100;
  const streak = computeStreak(days);
  if (streak >= 7) xp += 300; else if (streak >= 3) xp += 100;
  xp += Object.values(notes).filter(n => n.trim().length > 20).length * 25;
  return xp;
}

function getLevel(xp: number) {
  const tiers = [
    { min:0,    label:"Aspirant"   },
    { min:300,  label:"Student"    },
    { min:700,  label:"Intern"     },
    { min:1200, label:"Resident"   },
    { min:1800, label:"PG Ready"   },
    { min:2400, label:"Rank Holder"},
    { min:3000, label:"War Ready"  },
  ];
  let l = 0;
  for (let i = 0; i < tiers.length; i++) if (xp >= tiers[i].min) l = i;
  const cur = tiers[l].min, next = tiers[l+1]?.min ?? cur+600;
  return { level:l+1, label:tiers[l].label, progress:Math.min(((xp-cur)/(next-cur))*100, 100) };
}

function getUnlocked(days: number[], notes: Record<number,string>): string[] {
  const checks: Record<string,boolean> = {
    first_blood:  days.includes(1),
    on_fire:      computeStreak(days) >= 3,
    week_warrior: days.length >= 7,
    halfway:      days.length >= 14,
    blitz_champ:  Array.from({length:18},(_,i)=>i+1).every(d=>days.includes(d)),
    note_master:  Object.values(notes).filter(v=>v.trim().length>20).length >= 5,
    war_ready:    days.length >= 28,
  };
  return ACHIEVEMENTS.filter(a => checks[a.id]).map(a => a.id);
}

function getSubjectStats(days: number[]) {
  const m: Record<string,{t:number,d:number,c:string}> = {};
  SCHEDULE.forEach(s => {
    if (!m[s.subject]) m[s.subject] = { t:0, d:0, c: SUBJECT_COLORS[s.subject]||"#888" };
    m[s.subject].t++;
    if (days.includes(s.day)) m[s.subject].d++;
  });
  return Object.entries(m).map(([name,v]) => ({
    name: name.length > 7 ? name.slice(0,7) : name,
    full: name,
    pct:  Math.round((v.d/v.t)*100),
    done: v.d,
    total:v.t,
    color:v.c,
  }));
}

function getCountdown() {
  const d = EXAM_DATE.getTime() - Date.now();
  if (d < 0) return { days:0, hours:0, minutes:0, seconds:0 };
  return {
    days:    Math.floor(d/(1000*60*60*24)),
    hours:   Math.floor((d%(1000*60*60*24))/(1000*60*60)),
    minutes: Math.floor((d%(1000*60*60))/(1000*60)),
    seconds: Math.floor((d%(1000*60))/1000),
  };
}

/* ============================================================ */
/*  SEARCH MODAL                                               */
/* ============================================================ */

function SearchModal({ onClose, onSelectDay }: { onClose:()=>void; onSelectDay:(d:number)=>void }) {
  const [q, setQ] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  useEffect(() => {
    const h = (e:KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const lq = q.toLowerCase();
    return SCHEDULE.flatMap(day => {
      const hits: string[] = [];
      if (day.focus.toLowerCase().includes(lq)) hits.push(day.focus);
      if (day.subject.toLowerCase().includes(lq)) hits.push(`Subject: ${day.subject}`);
      day.topics.forEach(t => { if (t.toLowerCase().includes(lq)) hits.push(t.slice(0,70)+"…"); });
      if (day.india.toLowerCase().includes(lq)) hits.push("India: "+day.india.slice(0,60)+"…");
      return hits.length ? [{ day:day.day, focus:day.focus, subject:day.subject, color:day.color, hits:hits.slice(0,2) }] : [];
    }).slice(0,7);
  }, [q]);

  return (
    <motion.div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <motion.div className="relative w-full max-w-xl glass rounded-2xl shadow-2xl overflow-hidden"
        initial={{y:-16,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-16,opacity:0}}
        onClick={e=>e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input ref={ref} className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground/60"
            placeholder="Search topics, subjects, India stats…"
            value={q} onChange={e=>setQ(e.target.value)} />
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        {results.length > 0 ? (
          <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
            {results.map((r,i) => (
              <button key={i} className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors"
                onClick={()=>{ onSelectDay(r.day); onClose(); }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full" style={{background:`${r.color}22`,color:r.color}}>DAY {r.day}</span>
                  <span className="text-sm font-medium text-foreground">{r.focus}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{r.subject}</span>
                </div>
                {r.hits.map((h,j) => <p key={j} className="text-xs text-muted-foreground truncate">{h}</p>)}
              </button>
            ))}
          </div>
        ) : q ? (
          <div className="py-10 text-center text-sm text-muted-foreground">No results for "{q}"</div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs">Search across all 28 days of content</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================ */
/*  DASHBOARD VIEW                                             */
/* ============================================================ */

function DashboardView({ completedDays, notes }: { completedDays:number[]; notes:Record<number,string> }) {
  const streak     = useMemo(() => computeStreak(completedDays), [completedDays]);
  const xp         = useMemo(() => computeXP(completedDays, notes), [completedDays, notes]);
  const lvl        = useMemo(() => getLevel(xp), [xp]);
  const unlocked   = useMemo(() => getUnlocked(completedDays, notes), [completedDays, notes]);
  const subjStats  = useMemo(() => getSubjectStats(completedDays), [completedDays]);
  const quoteIdx   = useMemo(() => Math.floor(Date.now() / 86400000) % QUOTES.length, []);

  const phaseStats = PHASES.map(p => {
    const all   = SCHEDULE.filter(d => d.day >= p.days[0] && d.day <= p.days[1]);
    const done  = all.filter(d => completedDays.includes(d.day));
    return { ...p, total:all.length, done:done.length, pct:Math.round((done.length/all.length)*100) };
  });

  const cardAnim = { initial:{opacity:0,y:16}, animate:{opacity:1,y:0} };

  return (
    <div className="space-y-6">
      {/* Motivational Quote */}
      <motion.div {...cardAnim} transition={{delay:0.0}}
        className="glass rounded-2xl p-5 border-l-4 border-l-[#C42847] relative overflow-hidden">
        <div className="absolute top-2 right-4 text-6xl opacity-5 font-serif select-none">"</div>
        <p className="text-base font-medium text-foreground/90 leading-relaxed italic">{QUOTES[quoteIdx]}</p>
        <p className="text-xs text-muted-foreground mt-2 font-mono">— INI-CET WAR PLAN</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label:"Days Done",   value:`${completedDays.length}/28`, icon:<CheckCircle className="w-5 h-5"/>, color:"#C42847",  sub:`${Math.round((completedDays.length/28)*100)}% complete` },
          { label:"Best Streak", value:`${streak}`,                  icon:<Flame className="w-5 h-5"/>,       color:"#E8A93D",  sub:streak>=3 ? "On fire! 🔥" : "Build your streak" },
          { label:"Total XP",    value:xp.toLocaleString(),          icon:<Zap className="w-5 h-5"/>,         color:"#a855f7",  sub:`Level ${lvl.level} — ${lvl.label}` },
          { label:"Achievements",value:`${unlocked.length}/${ACHIEVEMENTS.length}`, icon:<Trophy className="w-5 h-5"/>, color:"#eab308", sub:"Badges unlocked" },
        ].map((s,i) => (
          <motion.div key={s.label} {...cardAnim} transition={{delay:0.05*i+0.1}}
            className="glass rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</span>
              <div className="p-1.5 rounded-lg" style={{background:`${s.color}22`,color:s.color}}>{s.icon}</div>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* XP Level Bar */}
      <motion.div {...cardAnim} transition={{delay:0.3}} className="glass rounded-2xl p-5">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-sm font-semibold text-foreground">Level {lvl.level} — {lvl.label}</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">{xp} XP</span>
        </div>
        <div className="xp-bar"><div className="xp-fill" style={{width:`${lvl.progress}%`}} /></div>
        <p className="text-xs text-muted-foreground mt-1.5">+100 XP per day · +25 XP per notes entry · Streak bonus up to +300 XP</p>
      </motion.div>

      {/* Phase Progress */}
      <motion.div {...cardAnim} transition={{delay:0.35}} className="glass rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" /> Phase Progress
        </h3>
        <div className="space-y-3">
          {phaseStats.map(p => (
            <div key={p.id}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium" style={{color:p.color}}>{p.label}</span>
                <span className="text-muted-foreground font-mono">{p.done}/{p.total} days</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{background:p.color}}
                  initial={{width:0}} animate={{width:`${p.pct}%`}} transition={{duration:0.8,delay:0.4}} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Subject Chart + Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div {...cardAnim} transition={{delay:0.4}} className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-muted-foreground" /> Subject Completion
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subjStats} margin={{top:0,right:0,left:-28,bottom:0}} barCategoryGap="30%">
              <XAxis dataKey="name" tick={{fill:"#6b7280",fontSize:9}} axisLine={false} tickLine={false} />
              <YAxis domain={[0,100]} tick={{fill:"#6b7280",fontSize:9}} axisLine={false} tickLine={false} />
              <Tooltip
                content={({active,payload}) => active && payload?.length ? (
                  <div className="glass rounded-lg px-3 py-2 text-xs">
                    <p className="font-medium text-foreground">{payload[0].payload.full}</p>
                    <p className="text-muted-foreground">{payload[0].payload.done}/{payload[0].payload.total} days · {payload[0].value}%</p>
                  </div>
                ) : null}
              />
              <Bar dataKey="pct" radius={[4,4,0,0]}>
                {subjStats.map((s,i) => <Cell key={i} fill={s.color} fillOpacity={0.85} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div {...cardAnim} transition={{delay:0.45}} className="glass rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-muted-foreground" /> Achievements
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {ACHIEVEMENTS.map(a => {
              const got = unlocked.includes(a.id);
              return (
                <div key={a.id} className={`flex flex-col items-center gap-1 ${!got ? "badge-locked" : ""}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${got ? "bg-white/10 shadow-lg" : "bg-white/4"}`}>
                    {a.emoji}
                  </div>
                  <span className="text-[9px] text-center text-muted-foreground leading-tight">{a.label}</span>
                  {got && <span className="text-[9px] text-amber-400 font-mono">+{a.xp} XP</span>}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  POMODORO TIMER VIEW                                        */
/* ============================================================ */

const WORK_SECS  = 25 * 60;
const BREAK_SECS = 5  * 60;

function TimerView() {
  const [mode,    setMode]    = useState<"idle"|"work"|"break">("idle");
  const [seconds, setSeconds] = useState(WORK_SECS);
  const [running, setRunning] = useState(false);
  const [sessions,setSessions]= useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = mode === "break" ? BREAK_SECS : WORK_SECS;
  const pct   = ((total - seconds) / total) * 100;
  const radius= 90;
  const circ  = 2 * Math.PI * radius;
  const offset= circ - (pct / 100) * circ;

  const fmt = (s:number) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const color = mode === "break" ? "#10b981" : "#C42847";

  const start = () => {
    if (mode === "idle") setMode("work");
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setMode("idle");
    setSeconds(WORK_SECS);
  };
  const switchMode = (m: "work"|"break") => {
    setRunning(false);
    setMode(m);
    setSeconds(m === "work" ? WORK_SECS : BREAK_SECS);
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            if (mode === "work") {
              setSessions(n => n+1);
              setMode("break");
              setSeconds(BREAK_SECS);
            } else {
              setMode("work");
              setSeconds(WORK_SECS);
            }
            return 0;
          }
          return s-1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode]);

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center gap-6">
      {/* Mode selector */}
      <div className="glass rounded-2xl p-1 flex gap-1 w-full max-w-xs">
        {(["work","break"] as const).map(m => (
          <button key={m} onClick={()=>switchMode(m)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${mode===m ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {m === "work" ? "Focus 25min" : "Break 5min"}
          </button>
        ))}
      </div>

      {/* Ring */}
      <div className="relative flex items-center justify-center">
        <svg width="220" height="220" className="pomodoro-ring">
          <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <circle cx="110" cy="110" r={radius} fill="none" stroke={color} strokeWidth="10"
            strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-5xl font-mono font-bold text-foreground tracking-tighter">{fmt(seconds)}</span>
          <span className="text-xs font-medium mt-1 uppercase tracking-widest" style={{color}}>
            {mode === "idle" ? "Ready" : mode === "work" ? "Focus" : "Break"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={reset} className="p-3 glass rounded-xl hover:bg-white/10 transition-colors">
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
        </button>
        <button onClick={running ? pause : start}
          className="px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all"
          style={{background:color, color:"#000"}}>
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "Pause" : "Start"}
        </button>
      </div>

      {/* Session count */}
      <div className="flex items-center gap-2">
        {Array.from({length:4}).map((_,i) => (
          <div key={i} className="w-3 h-3 rounded-full transition-all"
            style={{background: i < sessions%4 ? "#C42847" : "rgba(255,255,255,0.1)"}} />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{sessions} sessions today</span>
      </div>

      {/* Tips */}
      <div className="glass rounded-2xl p-5 w-full text-sm space-y-3">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400" /> Pomodoro Study Tips
        </h3>
        {["Use each 25-min block for ONE topic from today's schedule.",
          "During breaks — stand, hydrate, don't check your phone.",
          "After 4 sessions, take a 15-min long break.",
          "Track which Qs you missed at the END of each session, not during."].map((t,i) => (
          <div key={i} className="flex gap-2 text-muted-foreground">
            <span className="text-[10px] mt-1 font-mono text-foreground/40">{String(i+1).padStart(2,"0")}</span>
            <p className="text-xs leading-relaxed">{t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
/*  INDIA FASTFACTS VIEW                                       */
/* ============================================================ */

function IndiaView({ onSelectDay }: { onSelectDay:(d:number)=>void }) {
  const [filter, setFilter] = useState("All");
  const subjects = ["All", ...Array.from(new Set(SCHEDULE.map(d=>d.subject)))];

  const visible = filter === "All"
    ? SCHEDULE
    : SCHEDULE.filter(d => d.subject === filter);

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-4 flex items-center gap-3">
        <Map className="w-4 h-4 text-orange-400 shrink-0" />
        <p className="text-sm text-foreground font-medium">All India-specific content from all 28 days — your rank differentiator.</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {subjects.map(s => (
          <button key={s} onClick={()=>setFilter(s)}
            className={`px-3 py-1 text-xs rounded-full border transition-all ${filter===s ? "bg-orange-500/20 border-orange-500/50 text-orange-300" : "border-white/10 text-muted-foreground hover:border-white/20"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {visible.map((day, i) => (
            <motion.button key={day.day} layout
              initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
              transition={{delay:i*0.02}}
              onClick={()=>onSelectDay(day.day)}
              className="w-full text-left glass glass-hover rounded-2xl p-4 transition-all">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl flex flex-col items-center justify-center font-mono text-xs font-bold border"
                  style={{borderColor:`${day.color}40`, background:`${day.color}15`, color:day.color}}>
                  <span className="text-[9px] opacity-60">DAY</span>
                  <span>{day.day}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-foreground">{day.focus}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-muted-foreground">{day.subject}</span>
                  </div>
                  <p className="text-xs text-orange-200/80 leading-relaxed">{day.india}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  PLANNER VIEW                                               */
/* ============================================================ */

type DetailTab = "TOPICS"|"INDIA"|"IMAGES"|"MCQ"|"NOTE";

function PlannerView({
  completedDays, notes, selectedDayId, setSelectedDayId, onToggleDay, onUpdateNote,
}: {
  completedDays: number[];
  notes: Record<number,string>;
  selectedDayId: number;
  setSelectedDayId: (d:number)=>void;
  onToggleDay: (d:number)=>void;
  onUpdateNote: (d:number, t:string)=>void;
}) {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [detailTab, setDetailTab]             = useState<DetailTab>("TOPICS");

  const filtered = useMemo(() =>
    selectedSubject === "All" ? SCHEDULE : SCHEDULE.filter(d => d.subject === selectedSubject),
    [selectedSubject]
  );

  const day = SCHEDULE.find(d => d.day === selectedDayId) || SCHEDULE[0];
  const isCompleted = completedDays.includes(day.day);

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* LEFT COLUMN */}
      <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
        {/* Subject filter */}
        <div className="glass rounded-2xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <ListChecks className="w-3.5 h-3.5" /> Filter by Subject
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {SUBJECTS.map(s => (
              <button key={s} onClick={()=>setSelectedSubject(s)}
                className={`px-2.5 py-1 text-[11px] rounded-full border transition-all ${selectedSubject===s ? "bg-white/15 border-white/30 text-foreground font-medium" : "border-white/8 text-muted-foreground hover:border-white/20"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 28-day grid */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> 28-Day Grid
            </h3>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {PHASES.map(p => (
              <div key={p.id} className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <div className="w-2 h-2 rounded-full" style={{background:p.color}} />
                <span>{p.label.split(" ")[0]}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {SCHEDULE.map(d => {
              const sel    = d.day === selectedDayId;
              const done   = completedDays.includes(d.day);
              const hasNote= !!notes[d.day]?.trim();
              const vis    = filtered.some(f => f.day === d.day);
              return (
                <button key={d.day}
                  onClick={()=>setSelectedDayId(d.day)}
                  style={{
                    borderColor: sel ? d.color : done ? `${d.color}40` : "rgba(255,255,255,0.08)",
                    background:  sel ? `${d.color}20` : done ? `${d.color}08` : "transparent",
                    opacity: vis ? 1 : 0.18,
                  }}
                  className="day-card"
                >
                  <span className="text-[11px] font-mono font-bold" style={{color: sel ? d.color : done ? d.color : "rgb(107,114,128)"}}>{d.day}</span>
                  {done && <div className="absolute top-0.5 right-0.5"><CheckCircle className="w-2.5 h-2.5" style={{color:d.color}} /></div>}
                  {hasNote && <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400/70" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: Day Detail */}
      <div className="flex-1 min-w-0">
        <div className="glass rounded-2xl overflow-hidden relative">
          {/* colour bar */}
          <div className="h-1 w-full" style={{background:`linear-gradient(90deg, ${day.color}, ${day.color}88)`}} />

          {/* Header */}
          <div className="p-5 border-b border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center border shrink-0"
                style={{borderColor:`${day.color}50`, background:`${day.color}15`}}>
                <span className="text-[9px] font-mono text-muted-foreground">DAY</span>
                <span className="text-xl font-bold font-mono" style={{color:day.color}}>{day.day}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="phase-pill" style={{background:`${day.color}18`,color:day.color,border:`1px solid ${day.color}35`}}>
                    {PHASES.find(p=>p.id===day.phase)?.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{day.subject}</span>
                </div>
                <h2 className="text-xl font-bold text-foreground leading-tight">{day.focus}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={()=>setSelectedDayId(Math.max(1,selectedDayId-1))} disabled={selectedDayId===1}
                className="p-2 glass rounded-xl disabled:opacity-30 hover:bg-white/10 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={()=>setSelectedDayId(Math.min(28,selectedDayId+1))} disabled={selectedDayId===28}
                className="p-2 glass rounded-xl disabled:opacity-30 hover:bg-white/10 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={()=>onToggleDay(day.day)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${isCompleted ? "text-black" : "border border-white/15 text-foreground hover:bg-white/8"}`}
                style={isCompleted ? {background:day.color} : {}}>
                {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                {isCompleted ? "Completed" : "Mark Done"}
              </button>
            </div>
          </div>

          {/* Source bar */}
          <div className="px-5 py-2.5 bg-white/3 border-b border-white/5 flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Source: {day.marrow}</span>
          </div>

          {/* Inner tab bar */}
          <div className="flex border-b border-white/6 overflow-x-auto no-scrollbar">
            {(["TOPICS","INDIA","IMAGES","MCQ","NOTE"] as DetailTab[]).map(t => (
              <button key={t} onClick={()=>setDetailTab(t)}
                className={`relative px-5 py-3 text-xs font-semibold tracking-wider whitespace-nowrap transition-colors ${detailTab===t ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"}`}>
                {t === "INDIA"  && <Flag className="w-3 h-3 inline mr-1.5 text-orange-400" />}
                {t === "IMAGES" && <Target className="w-3 h-3 inline mr-1.5 text-blue-400" />}
                {t === "MCQ"    && <Crosshair className="w-3 h-3 inline mr-1.5 text-emerald-400" />}
                {t === "NOTE"   && <StickyNote className="w-3 h-3 inline mr-1.5 text-amber-400" />}
                {t}
                {detailTab===t && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{background:day.color}} />}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div key={detailTab} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.15}}
              className="p-5 min-h-80">

              {detailTab === "TOPICS" && (
                <div className="space-y-3">
                  {day.topics.map((topic,i) => (
                    <div key={i} className="topic-card flex gap-3 p-3.5 rounded-xl border border-white/6 hover:border-white/12 hover:bg-white/3">
                      <div className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center font-mono text-xs font-bold mt-0.5"
                        style={{borderColor:`${day.color}50`, color:day.color}}>
                        {i+1}
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed font-serif">{topic}</p>
                    </div>
                  ))}
                </div>
              )}

              {detailTab === "INDIA" && (
                <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 rounded-l" />
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-orange-500/20"><Flag className="w-4 h-4 text-orange-400" /></div>
                    <h3 className="font-bold text-orange-400 text-sm tracking-wide font-mono">INDIA-SPECIFIC — RANK DIFFERENTIATOR</h3>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed font-serif">{day.india}</p>
                  <div className="mt-4 flex gap-2 text-xs text-orange-300/60 bg-orange-500/8 rounded-lg p-3 border border-orange-500/10">
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    Memorise exact values — tested directly in INI-CET.
                  </div>
                </div>
              )}

              {detailTab === "IMAGES" && (
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l" />
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/20"><Target className="w-4 h-4 text-blue-400" /></div>
                    <h3 className="font-bold text-blue-400 text-sm tracking-wide font-mono">IMAGE REVIEW TARGETS</h3>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed font-serif">{day.images}</p>
                </div>
              )}

              {detailTab === "MCQ" && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 rounded-l" />
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-500/20"><Crosshair className="w-4 h-4 text-emerald-400" /></div>
                    <h3 className="font-bold text-emerald-400 text-sm tracking-wide font-mono">DAILY MCQ MISSION</h3>
                  </div>
                  <p className="text-base font-semibold text-foreground mb-6 text-center py-4 rounded-lg border border-emerald-500/20">{day.mcq}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[{v:"+1",l:"Correct",c:"#10b981"},{v:"−0.33",l:"Wrong",c:"#ef4444"},{v:"0",l:"Skip",c:"#6b7280"}].map(s=>(
                      <div key={s.l} className="bg-white/4 border border-white/6 rounded-xl p-3 text-center">
                        <span className="block text-xl font-bold font-mono" style={{color:s.c}}>{s.v}</span>
                        <span className="text-[10px] text-muted-foreground uppercase">{s.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detailTab === "NOTE" && (
                <div className="h-full flex flex-col gap-2">
                  <textarea
                    className="w-full min-h-64 bg-transparent border border-white/8 rounded-xl p-4 text-sm font-mono text-foreground focus:outline-none focus:border-white/20 resize-none placeholder:text-muted-foreground/30 leading-relaxed transition-colors"
                    placeholder="Write your high-yield points, memory hooks, or weak areas here…"
                    value={notes[day.day]||""}
                    onChange={e=>onUpdateNote(day.day, e.target.value)}
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{notes[day.day]?.trim().length > 0 ? "✓ Saved" : "Start typing to save"}</span>
                    <span className="font-mono">{notes[day.day]?.length||0} chars</span>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  SCHEDULE VIEW                                              */
/* ============================================================ */

function ScheduleView() {
  return (
    <div className="flex flex-col lg:flex-row gap-5 max-w-5xl mx-auto">
      <div className="flex-1 glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/6 flex items-center gap-3">
          <Clock className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-foreground">Optimal Daily Routine</h2>
          <span className="text-xs text-muted-foreground ml-auto">17 hrs · 6 AM – 11 PM</span>
        </div>
        <div className="divide-y divide-white/5">
          {DAILY_BLOCKS.map((b,i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors">
              <span className="text-lg shrink-0">{b.icon}</span>
              <span className="w-36 shrink-0 font-mono text-xs font-bold text-primary">{b.time}</span>
              <span className="text-sm text-foreground/90 font-serif">{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
        <div className="glass rounded-2xl p-5 border border-red-500/20">
          <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2 text-sm">
            <ShieldAlert className="w-4 h-4" /> Non-Negotiables
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              "No new resources after Day 18",
              "1 full mock required from Day 22",
              "Skip question if <60% confident",
              "Anatomy/Physio via MCQs only",
              "Sleep strictly at 10 PM on exam eve",
              "Creatine 5g daily for cognitive stamina",
            ].map((r,i) => (
              <li key={i} className="flex gap-2.5 text-foreground/80">
                <span className="text-red-500 font-bold mt-0.5">•</span>
                <span className="font-serif leading-snug">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="font-bold text-amber-400 mb-3 text-sm flex items-center gap-2">
            <Star className="w-4 h-4" /> Strategy Pillars
          </h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            {["Marrow first, notes second, MCQs always","India stats = guaranteed marks — never skip","Images daily from Day 1, not just revision","Mock tests under strict timed conditions only"].map((t,i)=>(
              <div key={i} className="flex gap-2">
                <span className="text-amber-500 font-mono">{i+1}.</span>
                <span className="leading-relaxed">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  NOTES VIEW                                                 */
/* ============================================================ */

function NotesView({
  notes, selectedDayId, setSelectedDayId, onUpdateNote,
}: {
  notes: Record<number,string>;
  selectedDayId: number;
  setSelectedDayId: (d:number)=>void;
  onUpdateNote: (d:number, t:string)=>void;
}) {
  const day = SCHEDULE.find(d => d.day === selectedDayId) || SCHEDULE[0];
  const noteCount = Object.values(notes).filter(n=>n.trim().length>0).length;

  const downloadNotes = () => {
    const txt = SCHEDULE.map(d => {
      const n = notes[d.day]?.trim();
      return n ? `=== DAY ${d.day}: ${d.focus} ===\n${n}\n` : null;
    }).filter(Boolean).join("\n");
    const blob = new Blob([txt||"No notes yet."], {type:"text/plain"});
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "inicet-notes.txt"; a.click();
  };

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto h-[calc(100vh-200px)] min-h-96">
      {/* Day selector */}
      <div className="glass rounded-2xl p-4 flex flex-wrap gap-1.5 shrink-0">
        {SCHEDULE.map(d => {
          const hasNote = !!notes[d.day]?.trim();
          const sel     = d.day === selectedDayId;
          return (
            <button key={d.day} onClick={()=>setSelectedDayId(d.day)}
              className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-all flex items-center gap-1.5 ${sel ? "text-black font-bold" : hasNote ? "border-amber-500/40 text-amber-400" : "border-white/8 text-muted-foreground hover:border-white/20"}`}
              style={sel ? {background:d.color,borderColor:d.color} : {}}>
              D{d.day}
              {hasNote && !sel && <div className="w-1 h-1 rounded-full bg-amber-400" />}
            </button>
          );
        })}
      </div>

      {/* Editor */}
      <div className="flex-1 glass rounded-2xl overflow-hidden relative flex flex-col">
        <div className="h-0.5" style={{background:`linear-gradient(90deg,${day.color},${day.color}55)`}} />
        <div className="px-5 py-3 border-b border-white/6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-bold font-mono" style={{color:day.color}}>DAY {day.day}</span>
            <span className="text-sm text-foreground/70 hidden sm:inline">— {day.focus}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{noteCount}/28 days with notes</span>
            <button onClick={downloadNotes}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 glass rounded-lg hover:bg-white/10 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>
        <textarea
          className="flex-1 w-full bg-transparent p-5 font-mono text-sm text-foreground focus:outline-none resize-none placeholder:text-muted-foreground/25 leading-relaxed"
          placeholder={`No notes for Day ${day.day} yet.\n\nUse this for:\n• High-yield points you keep forgetting\n• MCQ traps from today\n• Memory hooks and mnemonics\n• India-specific stats to revisit`}
          value={notes[selectedDayId]||""}
          onChange={e=>onUpdateNote(selectedDayId, e.target.value)}
        />
        <div className="px-5 py-2 border-t border-white/6 flex justify-between text-xs text-muted-foreground shrink-0">
          <span>{notes[selectedDayId]?.trim() ? "✓ Auto-saved" : "Start typing…"}</span>
          <span className="font-mono">{notes[selectedDayId]?.length||0} chars</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ */
/*  COUNTDOWN UNIT                                             */
/* ============================================================ */

function CountUnit({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold font-mono text-foreground tabular-nums">
        {String(val).padStart(2,"0")}
      </span>
      <span className="text-[9px] text-muted-foreground uppercase tracking-widest">{label}</span>
    </div>
  );
}

/* ============================================================ */
/*  MAIN APP                                                   */
/* ============================================================ */

type Tab = "dashboard"|"plan"|"schedule"|"india"|"timer"|"notes";

const NAV: { id:Tab; label:string; icon: React.ReactNode }[] = [
  { id:"dashboard", label:"Dashboard", icon:<TrendingUp className="w-4 h-4" /> },
  { id:"plan",      label:"Plan",      icon:<Calendar className="w-4 h-4" /> },
  { id:"schedule",  label:"Schedule",  icon:<Clock className="w-4 h-4" /> },
  { id:"india",     label:"🇮🇳 India",  icon:null },
  { id:"timer",     label:"Timer",     icon:<Star className="w-4 h-4" /> },
  { id:"notes",     label:"Notes",     icon:<StickyNote className="w-4 h-4" /> },
];

export default function App() {
  const [completedDays, setCompletedDays] = useState<number[]>(() =>
    JSON.parse(localStorage.getItem("inicet_completed_days")||"[]")
  );
  const [notes, setNotes] = useState<Record<number,string>>(() =>
    JSON.parse(localStorage.getItem("inicet_notes")||"{}")
  );
  const [activeTab,    setActiveTab]    = useState<Tab>("dashboard");
  const [selectedDay,  setSelectedDay]  = useState(1);
  const [countdown,    setCountdown]    = useState(getCountdown);
  const [showSearch,   setShowSearch]   = useState(false);

  useEffect(() => { localStorage.setItem("inicet_completed_days", JSON.stringify(completedDays)); }, [completedDays]);
  useEffect(() => { localStorage.setItem("inicet_notes", JSON.stringify(notes)); }, [notes]);
  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const h = (e:KeyboardEvent) => {
      if ((e.metaKey||e.ctrlKey) && e.key==="k") { e.preventDefault(); setShowSearch(s=>!s); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const toggleDay    = (d:number) => setCompletedDays(p => p.includes(d) ? p.filter(x=>x!==d) : [...p,d]);
  const updateNote   = (d:number, t:string) => setNotes(p => ({...p,[d]:t}));
  const goToDay      = (d:number) => { setSelectedDay(d); setActiveTab("plan"); };

  const progress     = Math.round((completedDays.length/28)*100);
  const streak       = useMemo(() => computeStreak(completedDays), [completedDays]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden">
      {/* Animated mesh background */}
      <div className="mesh-bg">
        <div className="mesh-blob" />
        <div className="mesh-blob" />
        <div className="mesh-blob" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 glass border-b border-white/6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center glow-red" style={{background:"#C42847"}}>
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold gradient-text leading-none">INI-CET War Plan</h1>
              <p className="text-[9px] text-muted-foreground font-mono mt-0.5">MAY 16, 2026 · COMMAND CENTER</p>
            </div>
          </div>

          {/* Countdown */}
          <div className="hidden sm:flex items-center gap-3 glass rounded-xl px-4 py-2">
            <div className="flex items-center gap-2">
              <CountUnit val={countdown.days}    label="Days" />
              <span className="text-muted-foreground/40 font-light">:</span>
              <CountUnit val={countdown.hours}   label="Hrs" />
              <span className="text-muted-foreground/40 font-light">:</span>
              <CountUnit val={countdown.minutes} label="Min" />
              <span className="text-muted-foreground/40 font-light">:</span>
              <CountUnit val={countdown.seconds} label="Sec" />
            </div>
          </div>

          {/* Right side: streak + search */}
          <div className="flex items-center gap-2 shrink-0">
            {streak >= 2 && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/25">
                <span className="flame text-sm">🔥</span>
                <span className="text-xs font-bold text-orange-400">{streak}</span>
              </div>
            )}
            <button onClick={()=>setShowSearch(true)}
              className="flex items-center gap-2 px-3 py-1.5 glass rounded-xl text-xs text-muted-foreground hover:text-foreground transition-colors">
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-white/8 font-mono">⌘K</kbd>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-white/4">
          <div className="h-full transition-all duration-700" style={{width:`${progress}%`, background:"linear-gradient(90deg,#C42847,#E8A93D)"}} />
        </div>

        {/* Nav tabs */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex overflow-x-auto no-scrollbar">
          {NAV.map(n => (
            <button key={n.id} onClick={()=>setActiveTab(n.id)}
              className={`relative flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors ${activeTab===n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"}`}>
              {n.icon}
              {n.label}
              {activeTab===n.id && <span className="nav-tab-active-bar" />}
            </button>
          ))}
          <div className="ml-auto flex items-center text-xs text-muted-foreground font-mono py-3 pr-1 shrink-0">
            {completedDays.length}/28
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 relative z-10 max-w-7xl mx-auto w-full px-4 md:px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}
            transition={{duration:0.18}}>
            {activeTab === "dashboard" && <DashboardView completedDays={completedDays} notes={notes} />}
            {activeTab === "plan"      && <PlannerView completedDays={completedDays} notes={notes} selectedDayId={selectedDay} setSelectedDayId={setSelectedDay} onToggleDay={toggleDay} onUpdateNote={updateNote} />}
            {activeTab === "schedule"  && <ScheduleView />}
            {activeTab === "india"     && <IndiaView onSelectDay={goToDay} />}
            {activeTab === "timer"     && <TimerView />}
            {activeTab === "notes"     && <NotesView notes={notes} selectedDayId={selectedDay} setSelectedDayId={setSelectedDay} onUpdateNote={updateNote} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {showSearch && <SearchModal onClose={()=>setShowSearch(false)} onSelectDay={goToDay} />}
      </AnimatePresence>
    </div>
  );
}
