import type { Question } from "./questions";

// Image-based MCQs using Wikimedia Commons images
// Each question includes a real medical image URL for visual identification
export const IMAGE_MCQS: Question[] = [

  // ─── ECG Questions ────────────────────────────────────────────────────────

  {
    id: 7101,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Atrial_fibrillation_ECG.jpg",
    stem: "A 68-year-old hypertensive woman presents with palpitations. Her ECG is shown above. What is the most likely diagnosis?",
    options: [
      "Atrial fibrillation",
      "Atrial flutter",
      "Supraventricular tachycardia",
      "Ventricular tachycardia",
    ],
    answer: 0,
    explanation: "The ECG shows irregularly irregular rhythm with absent P waves replaced by fibrillatory baseline — hallmarks of atrial fibrillation. Atrial flutter shows regular sawtooth flutter waves at ~300/min with 2:1 or 4:1 block. SVT shows regular narrow-complex tachycardia with retrograde P waves. VT shows broad complex regular tachycardia.",
  },

  {
    id: 7102,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/STEMI.jpg/640px-STEMI.jpg",
    stem: "A 55-year-old man presents with crushing chest pain radiating to the left arm for 2 hours. His ECG shows the finding above. Which coronary artery is most likely occluded?",
    options: [
      "Left anterior descending (LAD) artery",
      "Right coronary artery (RCA)",
      "Left circumflex artery (LCx)",
      "Left main coronary artery",
    ],
    answer: 0,
    explanation: "ST elevation in leads V1-V4 (anterior STEMI) indicates occlusion of the LAD artery, which supplies the anterior wall and apex of the left ventricle. RCA occlusion causes inferior STEMI (ST elevation in II, III, aVF). LCx occlusion causes lateral STEMI (I, aVL, V5-V6). Left main occlusion typically causes massive infarction and cardiogenic shock.",
  },

  {
    id: 7103,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/3rd_degree_heart_block.png/640px-3rd_degree_heart_block.png",
    stem: "A 72-year-old man presents with syncope. His ECG shows regular P waves at 80/min and regular QRS complexes at 35/min with no relationship between them. What is this rhythm?",
    options: [
      "Complete (third-degree) heart block",
      "Second-degree heart block Mobitz II",
      "Second-degree heart block Mobitz I (Wenckebach)",
      "First-degree heart block",
    ],
    answer: 0,
    explanation: "Complete (3rd degree) heart block shows complete AV dissociation — P waves and QRS complexes are independent of each other. The ventricular rate is slow (30-40/min from junctional or ventricular escape). Mobitz II shows sudden dropped beats without PR prolongation. Wenckebach shows progressive PR lengthening then dropped beat. 1st degree shows only PR prolongation (>200ms) with 1:1 conduction.",
  },

  {
    id: 7104,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Torsades_de_pointes.png/640px-Torsades_de_pointes.png",
    stem: "A patient on antipsychotic medication develops this ECG rhythm during monitoring. It self-terminates after 10 seconds. What is this arrhythmia?",
    options: [
      "Torsades de pointes",
      "Ventricular fibrillation",
      "Ventricular tachycardia",
      "Atrial flutter with variable block",
    ],
    answer: 0,
    explanation: "Torsades de pointes ('twisting of the points') is a polymorphic VT occurring in the setting of prolonged QT interval. QRS complexes twist around the isoelectric baseline. Caused by drugs that prolong QT (antipsychotics, macrolides, antifungals, quinolones, antiarrhythmics class Ia/III), electrolyte abnormalities (hypokalaemia, hypomagnesaemia). Treatment: IV magnesium sulphate, correct electrolytes, stop offending drug.",
  },

  // ─── Chest X-ray Questions ────────────────────────────────────────────────

  {
    id: 7105,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pneumothorax_on_chest_xray.jpg/640px-Pneumothorax_on_chest_xray.jpg",
    stem: "A 22-year-old tall thin male presents with sudden onset right-sided chest pain and breathlessness. CXR is shown above. What is the diagnosis?",
    options: [
      "Right-sided pneumothorax",
      "Right-sided pleural effusion",
      "Right lower lobe pneumonia",
      "Right-sided haemothorax",
    ],
    answer: 0,
    explanation: "CXR shows absence of lung markings in the right upper zone with a visible lung edge — diagnostic of pneumothorax. Tall thin young males are at risk for primary spontaneous pneumothorax due to rupture of apical blebs. Pleural effusion shows white-out with meniscus sign. Pneumonia shows consolidation with air bronchograms. Haemothorax appears as opacification like effusion.",
  },

  {
    id: 7106,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/TuberculosisX-raynodeLabels.png/640px-TuberculosisX-raynodeLabels.png",
    stem: "A 35-year-old immigrant with 3-month history of cough, fever, and weight loss has this CXR. Which finding is most characteristic of this diagnosis?",
    options: [
      "Upper lobe cavitation with fibrosis",
      "Lower lobe consolidation",
      "Bilateral hilar lymphadenopathy without parenchymal disease",
      "Miliary nodules throughout both lung fields",
    ],
    answer: 0,
    explanation: "Post-primary (reactivation) TB classically involves the upper lobes (apical and posterior segments) with cavitation. The upper lobes have higher pO2 (favouring M. tuberculosis growth) and less lymphatic drainage. Bilateral hilar lymphadenopathy without parenchymal change is typical of sarcoidosis. Miliary TB (haematogenous spread) shows uniform 1-3mm nodules throughout both lungs. Lower lobe consolidation is typical of bacterial pneumonia.",
  },

  {
    id: 7107,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pulmonary_oedema.jpg/640px-Pulmonary_oedema.jpg",
    stem: "A 65-year-old man with known ischaemic heart disease presents with acute breathlessness. His CXR shows bilateral perihilar shadowing in a bat-wing pattern. What is the diagnosis?",
    options: [
      "Acute pulmonary oedema",
      "Bilateral pneumonia",
      "Sarcoidosis",
      "Pulmonary fibrosis",
    ],
    answer: 0,
    explanation: "Bat-wing (butterfly) perihilar shadowing is characteristic of acute pulmonary oedema (cardiogenic). Other CXR features: upper lobe blood diversion (upper lobe veins larger than lower), Kerley B lines (horizontal lines at lung bases = interstitial oedema), cardiomegaly (CTR >0.5), pleural effusions. Treatment: IV furosemide, GTN, CPAP, treat underlying cause. Bilateral pneumonia causes patchy consolidation. Sarcoidosis shows bilateral hilar lymphadenopathy.",
  },

  // ─── Histology Questions ──────────────────────────────────────────────────

  {
    id: 7108,
    subject: "Pathology",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Reed-Sternberg_lymph_node_biopsy.jpg/640px-Reed-Sternberg_lymph_node_biopsy.jpg",
    stem: "A 25-year-old male presents with painless cervical lymphadenopathy and constitutional symptoms. Lymph node biopsy shows the cell type above. What is the diagnosis?",
    options: [
      "Hodgkin's lymphoma",
      "Non-Hodgkin's lymphoma",
      "Reactive lymphadenitis",
      "Infectious mononucleosis",
    ],
    answer: 0,
    explanation: "Reed-Sternberg cells — large binucleated or multinucleated cells with prominent 'owl-eye' nucleoli — are pathognomonic of Hodgkin's lymphoma. These cells are CD15+ and CD30+ (negative for CD45/LCA). Classical Hodgkin's has 4 subtypes: nodular sclerosis (most common, young women, mediastinal mass), mixed cellularity, lymphocyte-rich, and lymphocyte-depleted (worst prognosis). Bimodal age distribution: 15-35 years and >55 years. EBV association in 40-50% cases.",
  },

  {
    id: 7109,
    subject: "Pathology",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Psammoma_bodies_-_pap_stain.jpg/640px-Psammoma_bodies_-_pap_stain.jpg",
    stem: "A thyroid FNA cytology shows the microscopic finding above — laminated calcified concentric rings within tumour cells. Which tumour characteristically shows this finding?",
    options: [
      "Papillary carcinoma of thyroid",
      "Follicular carcinoma of thyroid",
      "Medullary carcinoma of thyroid",
      "Anaplastic carcinoma of thyroid",
    ],
    answer: 0,
    explanation: "Psammoma bodies (laminated calcified concentric spherical structures) are characteristic of papillary thyroid carcinoma. Also seen in: serous papillary cystadenocarcinoma of ovary, meningioma. Other features of papillary carcinoma: Orphan Annie eye nuclei (empty-appearing nuclei with central clearing), nuclear grooves, nuclear pseudoinclusions, papillary architecture, psammoma bodies. It is the most common thyroid malignancy (~80%), spreads via lymphatics, excellent prognosis.",
  },

  {
    id: 7110,
    subject: "Pathology",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Granuloma_annulare_-_high_mag.jpg/640px-Granuloma_annulare_-_high_mag.jpg",
    stem: "A 40-year-old man has persistent cough, bilateral hilar lymphadenopathy on CXR, and elevated serum ACE. Lymph node biopsy shows the above finding — tightly packed epithelioid histiocytes without central necrosis. What is the diagnosis?",
    options: [
      "Sarcoidosis",
      "Tuberculosis",
      "Crohn's disease",
      "Foreign body reaction",
    ],
    answer: 0,
    explanation: "Non-caseating (non-necrotising) granulomas composed of tightly clustered epithelioid histiocytes with Langhans' giant cells are characteristic of sarcoidosis. Key differences from TB: NO central caseation/necrosis in sarcoidosis. Schaumann bodies (calcium and protein inclusions) and asteroid bodies (star-shaped inclusions) may be seen. Sarcoidosis: bilateral hilar lymphadenopathy, elevated serum ACE and calcium, multisystem disease. TB granulomas show central caseous necrosis.",
  },

  // ─── Bone X-ray Questions ─────────────────────────────────────────────────

  {
    id: 7111,
    subject: "Surgery",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Osteosarcoma_-_Xray.jpg/640px-Osteosarcoma_-_Xray.jpg",
    stem: "A 16-year-old boy presents with pain and swelling around the knee for 2 months. X-ray of the distal femur is shown above. What is the most likely diagnosis?",
    options: [
      "Osteosarcoma",
      "Ewing's sarcoma",
      "Giant cell tumour",
      "Chondrosarcoma",
    ],
    answer: 0,
    explanation: "Osteosarcoma X-ray shows: sunburst pattern (periosteal new bone formation radiating outward) and Codman's triangle (elevation of periosteum at tumour margins creating a triangular shadow). Most common site: distal femur > proximal tibia > proximal humerus. Peak age 10-25 years. Raised alkaline phosphatase. Ewing's sarcoma: onion-peel periosteal reaction, diaphysis, t(11;22). Giant cell tumour: soap-bubble appearance, epiphysis, adults 20-40y. Chondrosarcoma: calcifications, adults >40y.",
  },

  {
    id: 7112,
    subject: "Surgery",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Colles_fracture_cast.jpg/640px-Colles_fracture_cast.jpg",
    stem: "A 65-year-old osteoporotic woman falls on an outstretched hand. X-ray of the wrist shows dorsal angulation and displacement of the distal radius with a dinner fork deformity. What is the diagnosis?",
    options: [
      "Colles' fracture",
      "Smith's fracture",
      "Barton's fracture",
      "Scaphoid fracture",
    ],
    answer: 0,
    explanation: "Colles' fracture: distal radius fracture with dorsal (posterior) displacement and dorsal angulation, radial shortening, dorsal comminution, and often avulsion of ulnar styloid — causing dinner fork deformity on lateral view. Classic: elderly osteoporotic woman, FOOSH (fall on outstretched hand). Smith's fracture: reverse Colles (volar/anterior displacement = garden spade deformity), rare, young males. Barton's fracture: intra-articular fracture-dislocation of distal radius. Scaphoid: anatomical snuffbox tenderness, occult on X-ray.",
  },

  {
    id: 7113,
    subject: "Paediatrics",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Xray_rickets_wrist.jpg/640px-Xray_rickets_wrist.jpg",
    stem: "A 2-year-old child presents with bowed legs, craniotabes, and Harrison's sulcus. Wrist X-ray is shown above — cupping, fraying, and widening of metaphyses. What is the diagnosis?",
    options: [
      "Rickets",
      "Scurvy",
      "Metaphyseal chondrodysplasia",
      "Osteogenesis imperfecta",
    ],
    answer: 0,
    explanation: "Rickets X-ray (wrist): cupping, fraying, splaying/widening of metaphyses, widened epiphyseal plate. Clinical features: craniotabes (ping-pong ball skull), frontal bossing, rachitic rosary (costochondral beading), Harrison's sulcus, bowed legs (genu varum), delayed eruption of teeth, hypotonia. Nutritional rickets (vitamin D deficiency): low Ca, low PO4, high ALP, high PTH, low 25-OH-D3. Scurvy: subperiosteal haemorrhage, Trümmerfeld zone (zone of destruction), Frankel's white line.",
  },

  // ─── Skin Conditions ─────────────────────────────────────────────────────

  {
    id: 7114,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Psoriasis2010.JPG/640px-Psoriasis2010.JPG",
    stem: "A 30-year-old man presents with well-defined erythematous plaques with silvery white scales over extensor surfaces of both knees and elbows. Nail pitting is also present. What is the diagnosis?",
    options: [
      "Psoriasis",
      "Eczema (atopic dermatitis)",
      "Seborrhoeic dermatitis",
      "Pityriasis rosea",
    ],
    answer: 0,
    explanation: "Psoriasis: well-demarcated erythematous plaques with thick silvery-white scales on extensor surfaces (elbows, knees, scalp, sacrum). Nail changes: pitting (most common), onycholysis, subungual hyperkeratosis, oil-drop sign. Auspitz sign: pin-point bleeding on scale removal (dilated capillaries). Koebner phenomenon: lesions at sites of trauma. Histology: parakeratosis, Munro microabscesses (neutrophils in stratum corneum), elongated rete ridges. HLA-Cw6 association. Eczema: flexural surfaces, oozing, lichenification.",
  },

  {
    id: 7115,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/SOA-Butterfly_rash.jpg/640px-SOA-Butterfly_rash.jpg",
    stem: "A 25-year-old woman presents with facial rash, arthralgia, and proteinuria. The characteristic facial rash is shown above. What is the diagnosis?",
    options: [
      "Systemic lupus erythematosus (SLE)",
      "Rosacea",
      "Dermatomyositis",
      "Seborrhoeic dermatitis",
    ],
    answer: 0,
    explanation: "Butterfly (malar) rash of SLE: erythematous rash over cheeks and nose bridge, sparing the nasolabial folds — characteristic of SLE. ACR criteria for SLE diagnosis (≥4 of 11): malar rash, discoid rash, photosensitivity, oral ulcers, arthritis, serositis, renal disorder, neurologic disorder, haematologic disorder, immunologic disorder (anti-dsDNA/anti-Sm/antiphospholipid antibodies), ANA. Anti-dsDNA most specific. Rosacea: involves nasolabial folds, telangiectasia, papules/pustules. Dermatomyositis: heliotrope rash (periorbital), Gottron's papules (knuckles).",
  },

  {
    id: 7116,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Herpes_zoster_chest.jpg/640px-Herpes_zoster_chest.jpg",
    stem: "A 65-year-old immunocompromised patient presents with burning pain followed by a vesicular eruption in a dermatomal distribution over the left chest wall. What is the diagnosis?",
    options: [
      "Herpes zoster (Shingles)",
      "Herpes simplex",
      "Impetigo",
      "Contact dermatitis",
    ],
    answer: 0,
    explanation: "Herpes zoster (shingles): reactivation of VZV (varicella-zoster virus) from dorsal root ganglia. Unilateral dermatomal distribution (never crosses midline). Prodrome of pain/itching → grouped vesicles on erythematous base. Complications: post-herpetic neuralgia (most common, especially elderly), ophthalmic zoster (CN V1 — eye involvement), Ramsay Hunt syndrome (geniculate ganglion — CN VII palsy + ear vesicles + vertigo). Treatment: aciclovir 800mg 5x daily for 7 days (most effective if started within 72h). Prevention: zoster vaccine.",
  },

  // ─── Ophthalmology ────────────────────────────────────────────────────────

  {
    id: 7117,
    subject: "ENT/Ophthalmology",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Hypertensive_retinopathy_lesions.jpg/640px-Hypertensive_retinopathy_lesions.jpg",
    stem: "Fundoscopy of a 58-year-old hypertensive patient shows the above finding — AV nipping, flame-shaped haemorrhages, hard exudates, and cotton-wool spots. What is the diagnosis?",
    options: [
      "Hypertensive retinopathy grade 3",
      "Diabetic retinopathy",
      "Central retinal vein occlusion",
      "Papilloedema",
    ],
    answer: 0,
    explanation: "Hypertensive retinopathy Keith-Wagener-Barker classification: Grade 1=arterial narrowing/silver wiring; Grade 2=AV nipping (arteriovenous nicking); Grade 3=flame haemorrhages, cotton-wool spots, hard exudates; Grade 4=Grade 3 + papilloedema. Cotton-wool spots = nerve fibre layer infarcts. Hard exudates = lipid deposits. Diabetic retinopathy also shows haemorrhages/exudates but with microaneurysms and neovascularisation (proliferative). CRVO: disc swelling, 'blood and thunder' fundus, tortuous veins in all 4 quadrants.",
  },

  {
    id: 7118,
    subject: "ENT/Ophthalmology",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cataract_in_human_eye.png/640px-Cataract_in_human_eye.png",
    stem: "A 70-year-old diabetic patient presents with painless progressive dimming of vision in both eyes. Slit-lamp examination shows the above finding. What is the diagnosis?",
    options: [
      "Cataract",
      "Primary open-angle glaucoma",
      "Age-related macular degeneration",
      "Corneal dystrophy",
    ],
    answer: 0,
    explanation: "Cataract: opacity of the crystalline lens causing painless progressive visual loss. Types: nuclear sclerosis (most common age-related, hard nucleus, myopic shift — patient may read again 'second sight'), cortical (spoke-like opacities), posterior subcapsular (PSC — steroids, diabetes, radiation, early visual symptoms especially in bright light/reading), anterior subcapsular. Hypermature cataract: absent red reflex. Treatment: phacoemulsification with foldable IOL. Diabetics develop early PSC cataracts (sorbitol accumulation in lens via aldose reductase).",
  },

  // ─── CT/MRI ───────────────────────────────────────────────────────────────

  {
    id: 7119,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Epidural_hematoma.jpg/640px-Epidural_hematoma.jpg",
    stem: "A 25-year-old man is brought unconscious after a head injury. He had a lucid interval of 2 hours before deteriorating. CT head shows a biconvex (lenticular) hyperdense collection. What is the diagnosis?",
    options: [
      "Extradural (epidural) haematoma",
      "Subdural haematoma",
      "Intracerebral haematoma",
      "Subarachnoid haemorrhage",
    ],
    answer: 0,
    explanation: "Extradural haematoma (EDH): biconvex (lenticular/lens-shaped) hyperdense collection on CT — blood accumulates between skull and dura. Classic presentation: lucid interval followed by rapid neurological deterioration. Cause: middle meningeal artery rupture (temporal bone fracture). Treatment: urgent surgical evacuation. Subdural haematoma: crescent-shaped collection that follows brain contour — bridging vein rupture, elderly/alcoholics. SAH: hyperdense blood in basal cisterns (star pattern), worst headache of life. Intracerebral: intraparenchymal haematoma.",
  },

  {
    id: 7120,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/SubarachnoidSAH.jpg/640px-SubarachnoidSAH.jpg",
    stem: "A 45-year-old woman presents with sudden onset of the 'worst headache of her life' while lifting. CT head is shown above — hyperdense blood filling the basal cisterns. What is the diagnosis?",
    options: [
      "Subarachnoid haemorrhage",
      "Extradural haematoma",
      "Subdural haematoma",
      "Hypertensive intracerebral haemorrhage",
    ],
    answer: 0,
    explanation: "Subarachnoid haemorrhage (SAH): 'thunderclap headache' — sudden onset, maximal severity immediately. CT head within 6h is 98% sensitive — shows hyperdense (white) blood in subarachnoid space, basal cisterns, sylvian fissures. If CT negative within 6h AND clinical suspicion high → LP at 12h for xanthochromia. Most common cause of spontaneous SAH: ruptured berry aneurysm (85%), usually at Circle of Willis bifurcations. Complications: re-bleeding, vasospasm (Day 3-14, use nimodipine), hydrocephalus, hyponatraemia (SIADH/cerebral salt wasting).",
  },

  // ─── Microbiology ─────────────────────────────────────────────────────────

  {
    id: 7121,
    subject: "Microbiology",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Gram_stain_01.jpg/640px-Gram_stain_01.jpg",
    stem: "Gram stain of pus from a wound infection shows clusters of Gram-positive cocci. The organism is coagulase-positive on culture. What is the most likely organism?",
    options: [
      "Staphylococcus aureus",
      "Streptococcus pyogenes",
      "Enterococcus faecalis",
      "Staphylococcus epidermidis",
    ],
    answer: 0,
    explanation: "Staphylococcus aureus: Gram-positive cocci in clusters ('grape-like'), coagulase-positive (distinguishes S.aureus from coagulase-negative staphylococci like S.epidermidis). Golden/yellow pigmented colonies on blood agar, beta-haemolysis, DNase positive. Virulence factors: protein A (binds IgG Fc, evades opsonisation), PVL (Panton-Valentine leucocidin — skin infections, necrotising pneumonia), TSST-1 (toxic shock syndrome toxin), exfoliatin (scalded skin syndrome), enterotoxin (food poisoning). MRSA: mecA gene encoding PBP2a — resistant to all beta-lactams; treat with vancomycin.",
  },

  {
    id: 7122,
    subject: "Microbiology",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Ziehl-Neelsen_stain%2C_tuberculosis.jpg/640px-Ziehl-Neelsen_stain%2C_tuberculosis.jpg",
    stem: "Sputum examination of a 32-year-old patient with chronic cough shows the above staining pattern — red bacilli on a blue background. What staining technique was used?",
    options: [
      "Ziehl-Neelsen (ZN) stain",
      "Gram stain",
      "PAS stain",
      "India ink stain",
    ],
    answer: 0,
    explanation: "Ziehl-Neelsen (ZN) stain detects acid-fast bacilli (AFB) — red bacilli on blue background. Mycobacteria are acid-fast due to mycolic acid in their cell wall, which retains carbol fuchsin after acid-alcohol decolourisation. Used for: Mycobacterium tuberculosis (sputum AFB smear), M. leprae (Fite-Faraco modification). Other stains: Gram stain (bacteria); India ink (Cryptococcus neoformans — capsule, not stained); PAS (fungi, glycogen); Giemsa (malaria/Leishmania); Methenamine silver (Pneumocystis jirovecii); Calcofluor white (fungi under fluorescence).",
  },

  // ─── Abdominal Radiology ──────────────────────────────────────────────────

  {
    id: 7123,
    subject: "Surgery",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Upright_abdominal_X-ray_demonstrating_small_bowel_obstruction.jpg/640px-Upright_abdominal_X-ray_demonstrating_small_bowel_obstruction.jpg",
    stem: "A 50-year-old woman with previous appendicectomy presents with colicky abdominal pain, vomiting, and absolute constipation. AXR shows multiple central air-fluid levels in dilated bowel loops with valvulae conniventes. What is the diagnosis?",
    options: [
      "Small bowel obstruction",
      "Large bowel obstruction",
      "Paralytic ileus",
      "Sigmoid volvulus",
    ],
    answer: 0,
    explanation: "Small bowel obstruction (SBO): dilated small bowel loops (>3cm), central distribution, valvulae conniventes (plicae circulares) — mucosal folds that completely traverse the bowel lumen, giving ladder pattern. Most common cause in adults with prior surgery: adhesions. Other causes: hernia (strangulation), intussusception (children). Large bowel obstruction: peripheral distribution, haustrae (incomplete folds), >6cm. Paralytic ileus: dilated bowel throughout without transition point, no peristalsis. Sigmoid volvulus: 'coffee bean' sign pointing to right upper quadrant.",
  },

  {
    id: 7124,
    subject: "Medicine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cholelithiasis_ultrasound.jpg/640px-Cholelithiasis_ultrasound.jpg",
    stem: "A 45-year-old obese woman presents with right upper quadrant pain after fatty meals. Ultrasound of the abdomen is shown above — echogenic foci within the gallbladder with posterior acoustic shadowing. What is the diagnosis?",
    options: [
      "Cholelithiasis (gallstones)",
      "Gallbladder polyp",
      "Cholecystitis",
      "Porcelain gallbladder",
    ],
    answer: 0,
    explanation: "Cholelithiasis on ultrasound: echogenic (bright) mobile foci within the gallbladder lumen with posterior acoustic shadowing — classic finding. Ultrasound is investigation of choice (sensitivity 95%). Risk factors: 5 Fs — Fat, Female, Forty, Fertile, Fair. Gallstone types: cholesterol (most common in West, solitary large stone, radiolucent on X-ray), pigment (haemolytic anaemia — sickle cell, hereditary spherocytosis, multiple small hard black stones, radio-opaque), mixed (most common overall). Gallbladder polyps: non-mobile, no shadowing. Porcelain gallbladder: calcified wall, risk of malignancy.",
  },

  {
    id: 7125,
    subject: "Surgery",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ct_abdomen_nornal.jpg/640px-Ct_abdomen_nornal.jpg",
    stem: "A 68-year-old hypertensive smoker presents with a pulsatile abdominal mass. CT abdomen shows a fusiform dilatation of the infrarenal aorta measuring 6.5 cm. What is the most appropriate management?",
    options: [
      "Elective surgical or endovascular repair (EVAR)",
      "Conservative management with blood pressure control",
      "Urgent emergency surgery",
      "Serial ultrasound surveillance every 6 months",
    ],
    answer: 0,
    explanation: "Abdominal aortic aneurysm (AAA): fusiform dilatation >3cm. Management by size: <4cm=6-monthly USS; 4-5.4cm=3-monthly USS; ≥5.5cm=elective repair (EVAR or open surgery). Indications for urgent surgery: rupture (hypotension + back/abdominal pain + pulsatile mass = triad), symptomatic AAA (rapid expansion, leak, embolism). Risk factors: male sex, smoking (most important modifiable), hypertension, atherosclerosis, age >65. Rupture mortality: >80% overall, ~50% perioperative. Screening: USS offered to all 65-year-old males in UK.",
  },

];
