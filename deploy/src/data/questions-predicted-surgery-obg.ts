import type { Question } from "./questions";
export const PREDICTED_SURGERY_OBG_QUESTIONS: Question[] = [
  // ─── SURGERY (IDs 7301–7340) ────────────────────────────────────────────────

  {
    id: 7301,
    subject: "Surgery",
    stem: "The gold standard surgical procedure for rectal cancer that ensures adequate circumferential resection margins and reduces local recurrence is:",
    options: [
      "Wide local excision",
      "Total mesorectal excision (TME)",
      "Hartmann's procedure",
      "Abdominoperineal resection without mesorectal excision",
    ],
    answer: 1,
    explanation:
      "Total mesorectal excision (TME) is the gold standard for rectal cancer surgery. It involves sharp dissection in the embryological plane surrounding the mesorectum, ensuring an intact mesorectal envelope, and has reduced local recurrence rates from 25–40% to less than 10%. The circumferential resection margin (CRM) is a key prognostic factor.",
  },
  {
    id: 7302,
    subject: "Surgery",
    stem: "A patient with locally advanced rectal cancer (T3N1) is planned for surgery. Which neoadjuvant treatment approach is preferred before TME?",
    options: [
      "Adjuvant FOLFOX chemotherapy after surgery only",
      "Long-course neoadjuvant chemoradiation (LCRT) followed by TME",
      "Surgery first, then short-course radiotherapy",
      "Immunotherapy with checkpoint inhibitors alone",
    ],
    answer: 1,
    explanation:
      "Long-course neoadjuvant chemoradiation (LCRT) with concurrent 5-fluorouracil followed by TME is the preferred approach for locally advanced rectal cancer (T3-T4 or N+). It achieves tumour downstaging, improves sphincter preservation rates, and reduces local recurrence. Short-course radiotherapy is an alternative but LCRT allows response assessment.",
  },
  {
    id: 7303,
    subject: "Surgery",
    stem: "MSI-H (microsatellite instability high) or dMMR status in colorectal cancer is most important because it predicts response to:",
    options: [
      "VEGF inhibitor bevacizumab",
      "EGFR inhibitor cetuximab",
      "PD-1 inhibitor pembrolizumab",
      "BRAF inhibitor vemurafenib",
    ],
    answer: 2,
    explanation:
      "MSI-H/dMMR colorectal cancers have a high tumour mutational burden and respond dramatically to PD-1 checkpoint inhibitors such as pembrolizumab. FDA approved pembrolizumab for MSI-H metastatic colorectal cancer. This is tested by immunohistochemistry for MLH1, MSH2, MSH6, PMS2 loss, or PCR for microsatellite markers. MSI testing is now mandatory for all colorectal cancers.",
  },
  {
    id: 7304,
    subject: "Surgery",
    stem: "During sentinel lymph node biopsy (SLNB) for breast cancer, the two agents commonly used together for optimal identification are:",
    options: [
      "Indocyanine green + patent blue dye",
      "Technetium-99m radiocolloid + isosulfan blue/patent blue dye",
      "Methylene blue + gadolinium",
      "Fluorescein + indigo carmine",
    ],
    answer: 1,
    explanation:
      "SLNB uses a combination of technetium-99m-labelled radiocolloid (detected by gamma probe) and blue dye (isosulfan blue or patent blue V) for optimal sentinel node identification. The combination achieves detection rates >95%. Indocyanine green with near-infrared fluorescence is an emerging alternative. The sentinel node is the first draining lymph node from the tumour.",
  },
  {
    id: 7305,
    subject: "Surgery",
    stem: "The ACOSOG Z0011 trial established that in breast-conserving surgery with whole breast radiotherapy, axillary lymph node dissection (ALND) can be safely omitted if:",
    options: [
      "All sentinel lymph nodes are negative",
      "1–2 sentinel lymph nodes are positive on final pathology",
      "3 or more sentinel lymph nodes are positive",
      "Isolated tumour cells only are found in sentinel nodes",
    ],
    answer: 1,
    explanation:
      "The ACOSOG Z0011 trial showed that in patients undergoing breast-conserving surgery with whole breast radiotherapy (WBRT), omitting ALND in those with 1–2 positive sentinel lymph nodes did not compromise overall survival or locoregional recurrence. This practice changed axillary management significantly. ALND is still required for ≥3 positive SLNs, patients undergoing mastectomy without irradiation, or those receiving neoadjuvant chemotherapy.",
  },
  {
    id: 7306,
    subject: "Surgery",
    stem: "A patient with MEN-2A syndrome is found to have a RET proto-oncogene mutation (codon 634). The recommended prophylactic intervention is:",
    options: [
      "Annual calcitonin measurement and watchful waiting",
      "Prophylactic total thyroidectomy (ideally before age 5 years)",
      "Prophylactic hemithyroidectomy at puberty",
      "131-Iodine ablation therapy",
    ],
    answer: 1,
    explanation:
      "RET codon 634 mutations in MEN-2A carry high risk of medullary thyroid cancer (MTC). Prophylactic total thyroidectomy is recommended, ideally before age 5 years (codon 634 is 'high risk' category). For the highest risk mutation (codon 918, MEN-2B), thyroidectomy within the first 6 months of life is advised. Calcitonin monitoring alone is insufficient. Hemithyroidectomy is inadequate as MTC is bilateral/multifocal.",
  },
  {
    id: 7307,
    subject: "Surgery",
    stem: "A patient develops hoarseness immediately after total thyroidectomy. The most likely structure injured and its consequence is:",
    options: [
      "External branch of superior laryngeal nerve — loss of high-pitched voice",
      "Recurrent laryngeal nerve — hoarseness/dysphonia",
      "Internal branch of superior laryngeal nerve — loss of sensation above glottis",
      "Hypoglossal nerve — tongue deviation",
    ],
    answer: 1,
    explanation:
      "Recurrent laryngeal nerve (RLN) injury is the most feared complication of thyroid surgery. Unilateral RLN injury causes hoarseness/dysphonia (paralysis of ipsilateral vocal cord in paramedian position). Bilateral RLN injury causes stridor, respiratory distress, and requires emergency tracheostomy. The RLN is most vulnerable as it enters the larynx and at the ligament of Berry. The external branch of the SLN injury causes inability to raise pitch (cricothyroid muscle).",
  },
  {
    id: 7308,
    subject: "Surgery",
    stem: "Post-thyroidectomy, a patient develops perioral tingling, positive Chvostek sign, and carpopedal spasm. Trousseau sign is elicited on inflating a BP cuff. The most appropriate immediate management is:",
    options: [
      "IV magnesium sulphate",
      "IV calcium gluconate followed by oral calcium + calcitriol",
      "Oral cholecalciferol (vitamin D3)",
      "IV potassium chloride",
    ],
    answer: 1,
    explanation:
      "Post-thyroidectomy hypocalcaemia due to hypoparathyroidism presents with perioral tingling, Chvostek sign (facial nerve tapping causes facial muscle twitch) and Trousseau sign (carpopedal spasm on BP cuff inflation). Acute symptomatic hypocalcaemia requires IV calcium gluconate (10 mL of 10% solution). Long-term management requires oral calcium carbonate + calcitriol (active vitamin D, as PTH is absent for 1,25-(OH)2D3 conversion). Ergocalciferol alone is insufficient without calcitriol.",
  },
  {
    id: 7309,
    subject: "Surgery",
    stem: "In early gastric cancer confined to mucosa without lymph node involvement, the preferred curative treatment is:",
    options: [
      "D2 radical gastrectomy with Billroth II reconstruction",
      "Endoscopic submucosal dissection (ESD)",
      "D1 gastrectomy with adjuvant chemotherapy",
      "Subtotal gastrectomy with FLOT chemotherapy",
    ],
    answer: 1,
    explanation:
      "Early gastric cancer (confined to mucosa or submucosa) without lymph node involvement is amenable to endoscopic submucosal dissection (ESD), which achieves en bloc resection with curative intent. ESD is preferred over endoscopic mucosal resection (EMR) for larger lesions. Criteria include well/moderately differentiated, <2 cm, no ulceration. Advanced gastric cancer requires D2 gastrectomy. FLOT is neoadjuvant/adjuvant perioperative chemotherapy for advanced disease.",
  },
  {
    id: 7310,
    subject: "Surgery",
    stem: "Linitis plastica (leather bottle stomach) is associated with which histological subtype in Lauren classification of gastric cancer and has the worst prognosis?",
    options: [
      "Intestinal type — associated with H. pylori, better prognosis",
      "Diffuse type with signet ring cells — linitis plastica pattern, worst prognosis",
      "Mixed type — intermediate prognosis",
      "Mucinous type — associated with microsatellite instability",
    ],
    answer: 1,
    explanation:
      "Lauren classification divides gastric cancer into intestinal type (associated with H. pylori, chronic gastritis, intestinal metaplasia, better prognosis, more common in males and older patients) and diffuse type (signet ring cells, no cohesion, diffuse infiltration of stomach wall causing linitis plastica/leather bottle stomach, worse prognosis, not H. pylori-dependent, E-cadherin mutation CDH1). Linitis plastica has rigid, thickened stomach wall with poor distensibility on endoscopy.",
  },
  {
    id: 7311,
    subject: "Surgery",
    stem: "The Whipple procedure (pancreaticoduodenectomy) is performed for cancer of the head of pancreas. Which tumour marker is most useful for monitoring pancreatic cancer?",
    options: [
      "AFP (alpha-fetoprotein)",
      "CA 19-9",
      "CEA (carcinoembryonic antigen)",
      "CA 125",
    ],
    answer: 1,
    explanation:
      "CA 19-9 (carbohydrate antigen 19-9, sialyl Lewis antigen) is the most widely used tumour marker for pancreatic ductal adenocarcinoma. It is elevated in >80% of cases but is not diagnostic alone (also elevated in biliary obstruction, pancreatitis, cholangiocarcinoma). CA 19-9 is most useful for monitoring treatment response and detecting recurrence. The double duct sign (simultaneous dilation of CBD and pancreatic duct) on MRCP/CT is a key radiological sign of pancreatic head cancer.",
  },
  {
    id: 7312,
    subject: "Surgery",
    stem: "According to the Barcelona Clinic Liver Cancer (BCLC) staging, which stage of hepatocellular carcinoma (HCC) is best treated with sorafenib?",
    options: [
      "BCLC Stage 0 (very early) — single <2 cm",
      "BCLC Stage A (early) — single or up to 3 nodules ≤3 cm",
      "BCLC Stage B (intermediate) — multinodular",
      "BCLC Stage C (advanced) — portal vein invasion or extrahepatic spread",
    ],
    answer: 3,
    explanation:
      "Sorafenib (multi-kinase inhibitor targeting RAF, VEGFR, PDGFR) is the first-line systemic therapy for BCLC Stage C (advanced HCC) with portal vein invasion, extrahepatic spread, or PS 1–2. BCLC Stage 0/A is treated with curative intent (resection, ablation, transplant if Milan criteria met). BCLC Stage B receives TACE (transarterial chemoembolisation). AFP is the marker for HCC. Milan criteria for transplant: single ≤5 cm or up to 3 nodules each ≤3 cm.",
  },
  {
    id: 7313,
    subject: "Surgery",
    stem: "The Critical View of Safety (CVS) during laparoscopic cholecystectomy requires which of the following before clipping structures?",
    options: [
      "Visualisation of the cystic duct and cystic artery with the common bile duct clearly seen",
      "Two structures only entering the gallbladder, with the hepatocystic triangle cleared of fat and fibrous tissue",
      "Identification of the right hepatic artery behind the cystic duct",
      "Complete dissection of Calot's triangle with cholangiogram performed",
    ],
    answer: 1,
    explanation:
      "The Critical View of Safety (CVS) mandates: (1) the hepatocystic triangle is cleared of fat and fibrous tissue, (2) the lower one-third of the gallbladder is separated from the liver bed, and (3) only two structures (cystic duct and cystic artery) are seen entering the gallbladder. CVS must be established before clipping to avoid bile duct injury. Bile duct injuries are the most dangerous complication of laparoscopic cholecystectomy (Strasberg classification). Major injuries require hepaticojejunostomy (Roux-en-Y).",
  },
  {
    id: 7314,
    subject: "Surgery",
    stem: "Key advantages of robotic surgery (da Vinci system) over conventional laparoscopic surgery include all EXCEPT:",
    options: [
      "Tremor filtration and motion scaling",
      "3D high-definition visualisation",
      "Articulating EndoWrist instruments with 7 degrees of freedom",
      "Shorter learning curve compared to laparoscopic surgery",
    ],
    answer: 3,
    explanation:
      "Robotic surgery advantages include: tremor filtration, motion scaling, 3D HD vision, articulating EndoWrist instruments (7 degrees of freedom vs 4 in laparoscopy), and improved ergonomics for the surgeon. However, the learning curve for robotic surgery is longer than conventional laparoscopy, setup time is greater, haptic feedback is absent, and costs are significantly higher. Common robotic procedures: RALP (robot-assisted radical prostatectomy), robotic hysterectomy, rectal surgery.",
  },
  {
    id: 7315,
    subject: "Surgery",
    stem: "ERAS (Enhanced Recovery After Surgery) protocol includes which of the following preoperative components?",
    options: [
      "Prolonged fasting from midnight, bowel preparation, preoperative opioid analgesia",
      "Carbohydrate loading up to 2 hours before surgery, avoidance of mechanical bowel preparation for colon surgery",
      "Routine nasogastric tube insertion, lengthy fasting from 8 PM",
      "Preoperative intravenous fluid loading with crystalloids",
    ],
    answer: 1,
    explanation:
      "ERAS protocol preoperative components include: carbohydrate loading (clear carbohydrate drink up to 2 hours before surgery to reduce insulin resistance), no prolonged fasting (clear fluids until 2h, solids until 6h before), no routine mechanical bowel preparation for colonic surgery, patient education and counselling. Intraoperative: goal-directed fluid therapy, short-acting anaesthetics, epidural/regional analgesia, normothermia, avoiding NG tubes and drains. Postoperative: early oral feeding, early mobilisation, multimodal analgesia (avoid opioids), VTE prophylaxis.",
  },
  {
    id: 7316,
    subject: "Surgery",
    stem: "Stanford classification of aortic dissection: which type requires emergency surgical intervention?",
    options: [
      "Stanford Type B — involves only descending aorta",
      "Stanford Type A — involves ascending aorta with or without descending",
      "DeBakey Type III — only descending aorta beyond left subclavian",
      "Type B with stable hypertension managed medically",
    ],
    answer: 1,
    explanation:
      "Stanford Type A dissection involves the ascending aorta (regardless of whether it extends to the descending) and is a surgical emergency with mortality of 1–2% per hour untreated. Surgery involves resection of the intimal tear, replacement with Dacron graft, and aortic valve repair/replacement if needed. Stanford Type B (descending only) is managed medically with IV labetalol (target HR <60, SBP <120 mmHg). TEVAR (thoracic endovascular aortic repair) is used for complicated Type B (malperfusion, rupture, uncontrolled hypertension). Hypertension is the most common cause of aortic dissection.",
  },
  {
    id: 7317,
    subject: "Surgery",
    stem: "A patient with atrial fibrillation presents with sudden severe abdominal pain disproportionate to physical examination findings. CT angiography shows occlusion of the superior mesenteric artery. The most likely diagnosis and immediate management is:",
    options: [
      "Acute pancreatitis — manage with IV fluids and analgesia",
      "Acute mesenteric ischaemia due to SMA embolism — heparin anticoagulation + surgical embolectomy or endovascular intervention",
      "Mesenteric venous thrombosis — thrombolysis alone",
      "Ischaemic colitis — conservative management with antibiotics",
    ],
    answer: 1,
    explanation:
      "Acute mesenteric ischaemia (AMI): SMA embolism is the most common cause (50%), usually from cardiac source (AF, MI, valvular disease). Hallmark: severe abdominal pain disproportionate to physical findings. Elevated lactate is a poor prognostic sign. CT angiography is diagnostic. Treatment: immediate heparin, then SMA embolectomy (surgical) or endovascular thrombolysis/thrombectomy, followed by bowel viability assessment. Mortality is high (60–80%) if bowel infarction occurs. 'Pain out of proportion' is the classic description.",
  },
  {
    id: 7318,
    subject: "Surgery",
    stem: "Virchow's node (Troisier's sign) is a palpable left supraclavicular lymph node that is pathognomonic of which condition?",
    options: [
      "Lymphoma of the mediastinum",
      "Intra-abdominal malignancy, classically gastric cancer",
      "Lung cancer with mediastinal spread",
      "Breast cancer with ipsilateral axillary metastasis",
    ],
    answer: 1,
    explanation:
      "Virchow's node is enlarged left supraclavicular lymph node due to metastasis from intra-abdominal malignancy, classically gastric cancer (via thoracic duct). Troisier's sign: palpable hard left supraclavicular node. Irish's node: left axillary node in gastric cancer. Sister Mary Joseph nodule: periumbilical nodule from intra-abdominal/pelvic malignancy (gastric, ovarian, pancreatic). Blumer's shelf: hard mass on rectal examination from peritoneal deposits in the pouch of Douglas from gastric cancer.",
  },
  {
    id: 7319,
    subject: "Surgery",
    stem: "REBOA (Resuscitative Endovascular Balloon Occlusion of the Aorta) is used in ATLS for which indication?",
    options: [
      "Cardiac tamponade requiring pericardiocentesis",
      "Non-compressible torso haemorrhage as a bridge to definitive haemorrhage control",
      "Tension pneumothorax requiring needle decompression",
      "Spinal cord injury requiring immobilisation",
    ],
    answer: 1,
    explanation:
      "REBOA is a minimally invasive device inserted via the femoral artery and inflated in the aorta to provide temporary haemorrhage control for non-compressible torso haemorrhage (junctional injuries, pelvic fractures, intra-abdominal haemorrhage). It is an ATLS 10th edition addition. Balanced resuscitation (1:1:1 ratio of packed RBCs:FFP:platelets) and massive transfusion protocol are key. Permissive hypotension (target SBP 80–90 mmHg) is used until haemorrhage control, except in TBI where cerebral perfusion pressure must be maintained.",
  },
  {
    id: 7320,
    subject: "Surgery",
    stem: "Abdominal compartment syndrome is defined as intra-abdominal pressure (IAP) of:",
    options: [
      "IAP ≥12 mmHg with no organ dysfunction",
      "IAP ≥20 mmHg with new organ dysfunction",
      "IAP ≥15 mmHg with abdominal distension only",
      "IAP ≥10 mmHg in any setting",
    ],
    answer: 1,
    explanation:
      "Intra-abdominal hypertension (IAH) = IAP ≥12 mmHg (measured via bladder with 25 mL saline instilled, at end-expiration, in supine position). Abdominal compartment syndrome (ACS) = IAP ≥20 mmHg + new onset organ dysfunction (renal, respiratory, cardiac, or neurological). Normal IAP <12 mmHg. Treatment of ACS: decompressive laparotomy with open abdomen management. Causes include major abdominal surgery, massive resuscitation, burns, ascites.",
  },
  {
    id: 7321,
    subject: "Surgery",
    stem: "Damage control surgery (DCS) is indicated when the 'lethal triad' is present. The lethal triad consists of:",
    options: [
      "Hyperglycaemia, alkalosis, and thrombocytosis",
      "Hypothermia (<35°C), acidosis (pH <7.2), and coagulopathy (INR >1.5)",
      "Hypertension, bradycardia, and hypernatraemia",
      "Hyperthermia, respiratory alkalosis, and leucocytosis",
    ],
    answer: 1,
    explanation:
      "Damage control surgery (DCS) is a staged approach for severely injured unstable patients: Stage 1 (abbreviated surgery to control haemorrhage and contamination, temporary closure), Stage 2 (ICU resuscitation to correct the lethal triad), Stage 3 (definitive repair at 24–72 hours). The lethal triad = hypothermia (<35°C) + acidosis (pH <7.2) + coagulopathy (INR >1.5, PT/APTT prolonged). This combination is mutually self-reinforcing. Damage control resuscitation = balanced 1:1:1 product replacement.",
  },
  {
    id: 7322,
    subject: "Surgery",
    stem: "Nipple-sparing mastectomy (NSM) is contraindicated in which situation?",
    options: [
      "BRCA1/2 mutation carrier undergoing prophylactic mastectomy",
      "Tumour involving or within 2 cm of the nipple-areola complex",
      "Patient desiring immediate implant-based reconstruction",
      "Multifocal breast cancer not involving central breast",
    ],
    answer: 1,
    explanation:
      "Nipple-sparing mastectomy preserves the nipple-areola complex (NAC) for superior cosmetic results. Contraindications include: tumour involving or within 2 cm of the NAC, Paget's disease of the nipple, inflammatory breast cancer, positive nipple margin on frozen section. NSM is suitable for BRCA mutation carriers having prophylactic mastectomy, and for therapeutic mastectomy when the tumour is peripheral. Skin-sparing mastectomy preserves skin envelope but removes NAC and is suitable when NAC cannot be preserved.",
  },
  {
    id: 7323,
    subject: "Surgery",
    stem: "HER2-positive breast cancer is specifically targeted by which monoclonal antibody as first-line adjuvant therapy?",
    options: [
      "Bevacizumab (anti-VEGF)",
      "Trastuzumab (Herceptin, anti-HER2)",
      "Cetuximab (anti-EGFR)",
      "Rituximab (anti-CD20)",
    ],
    answer: 1,
    explanation:
      "HER2 (Human Epidermal Growth Factor Receptor 2) overexpression/amplification occurs in ~20% of breast cancers and confers worse prognosis without targeted therapy. Trastuzumab (Herceptin) is a humanised monoclonal antibody against HER2 extracellular domain IV, used for 1 year adjuvantly with chemotherapy. It reduces recurrence and mortality significantly. Pertuzumab (anti-HER2 domain II, prevents dimerisation) is added for high-risk HER2+. T-DM1 (trastuzumab emtansine) and T-DXd (trastuzumab deruxtecan) are antibody-drug conjugates.",
  },
  {
    id: 7324,
    subject: "Surgery",
    stem: "Which of the following correctly describes the Strasberg classification of bile duct injuries during laparoscopic cholecystectomy?",
    options: [
      "Class A: transection of the CBD; Class E: cystic duct leak",
      "Class A: bile leak from cystic duct stump or small ducts; Class E: major bile duct strictures (E1–E5 based on level)",
      "Class A: complete CBD transection requiring hepaticojejunostomy",
      "Class D: occlusion of major bile duct by clip",
    ],
    answer: 1,
    explanation:
      "Strasberg classification: Type A — bile leak from cystic duct stump or small hepatic ducts (minor, treatable with ERCP stenting). Type B — occlusion of part of biliary tree (aberrant right hepatic duct). Type C — bile leak from aberrant duct not in continuity with CBD. Type D — lateral injury to a major bile duct. Type E (E1–E5, based on Bismuth classification) — stricture/transection of major bile ducts. Type E injuries require hepaticojejunostomy (Roux-en-Y bilioenteric anastomosis) for definitive repair, ideally by an experienced hepatobiliary surgeon.",
  },
  {
    id: 7325,
    subject: "Surgery",
    stem: "In aortic dissection, the preferred first-line antihypertensive agent for Type B dissection management is:",
    options: [
      "IV sodium nitroprusside alone",
      "IV labetalol (beta-blocker) to achieve HR <60 and SBP <120 mmHg",
      "Oral amlodipine",
      "IV hydralazine",
    ],
    answer: 1,
    explanation:
      "Medical management of Stanford Type B aortic dissection requires aggressive blood pressure and heart rate control. IV labetalol (combined alpha and beta blocker) is preferred — targets HR <60 bpm and SBP <120 mmHg. Esmolol (short-acting beta-blocker) is alternative. Vasodilators alone (e.g., nitroprusside) can cause reflex tachycardia, increasing aortic wall shear stress; thus a beta-blocker should always be given first. TEVAR is indicated for complicated Type B (malperfusion, rupture, uncontrolled pain/hypertension).",
  },
  {
    id: 7326,
    subject: "Surgery",
    stem: "H. pylori eradication has been shown to reduce the risk of which gastric malignancy?",
    options: [
      "Gastric MALT lymphoma and intestinal-type gastric adenocarcinoma",
      "Diffuse-type gastric cancer (signet ring cell) only",
      "Gastric carcinoid tumours",
      "Gastrointestinal stromal tumours (GISTs)",
    ],
    answer: 0,
    explanation:
      "H. pylori eradication reduces the risk of gastric MALT lymphoma (mucosa-associated lymphoid tissue lymphoma — eradication alone achieves complete remission in >80% of early-stage H. pylori-positive MALT lymphoma) and intestinal-type gastric adenocarcinoma. H. pylori causes chronic gastritis → atrophic gastritis → intestinal metaplasia → dysplasia → cancer (Correa cascade). Diffuse-type (signet ring) gastric cancer is less strongly associated with H. pylori and more with CDH1 mutation. H. pylori is WHO Class I carcinogen.",
  },
  {
    id: 7327,
    subject: "Surgery",
    stem: "The liquid biopsy technique using circulating tumour DNA (ctDNA) in colorectal cancer surveillance is most useful for:",
    options: [
      "Primary diagnosis of colorectal cancer replacing colonoscopy",
      "Minimal residual disease detection, predicting recurrence after curative resection, and monitoring treatment response",
      "Determining tumour grade and histological subtype",
      "Replacing CT colonography for polyp detection",
    ],
    answer: 1,
    explanation:
      "Liquid biopsy (ctDNA from plasma) is a non-invasive method to detect tumour-derived DNA. In colorectal cancer, ctDNA positivity after curative resection indicates minimal residual disease (MRD) and predicts high recurrence risk — informing decisions about adjuvant chemotherapy. It is used for monitoring treatment response and detecting emerging resistance mutations. ctDNA is not a replacement for colonoscopy or tissue biopsy for primary diagnosis. CEA remains the standard surveillance marker but ctDNA is more sensitive for early recurrence detection.",
  },
  {
    id: 7328,
    subject: "Surgery",
    stem: "In laparoscopic colorectal surgery, which outcome has been consistently shown to be equivalent or superior to open surgery?",
    options: [
      "Blood loss and intraoperative complication rate are lower in laparoscopic",
      "Long-term oncological outcomes (overall survival and disease-free survival) are equivalent with shorter hospital stay laparoscopically",
      "Laparoscopic approach has superior margins in rectal cancer T4 disease",
      "Laparoscopic surgery has lower port-site recurrence than open wound recurrence",
    ],
    answer: 1,
    explanation:
      "Multiple RCTs (COST, COLOR, CLASICC trials) have demonstrated that laparoscopic colectomy achieves equivalent long-term oncological outcomes (5-year overall survival, disease-free survival, recurrence rates) compared to open surgery for colon cancer. Laparoscopic surgery offers short-term benefits: shorter hospital stay, faster recovery, less pain, and lower wound complications. For rectal cancer (COLORII, ALaCaRT, ACOSOG Z6051 trials), laparoscopic TME is non-inferior for most cases. Conversion rate and operating time are higher laparoscopically.",
  },
  {
    id: 7329,
    subject: "Surgery",
    stem: "Sister Mary Joseph nodule is a periumbilical metastatic nodule that most commonly originates from which primary tumour?",
    options: [
      "Breast cancer",
      "Gastric cancer, followed by colorectal, ovarian, and pancreatic cancers",
      "Lymphoma",
      "Lung cancer",
    ],
    answer: 1,
    explanation:
      "Sister Mary Joseph nodule is a periumbilical subcutaneous nodule resulting from metastatic malignancy spreading via embryological remnants (round ligament, urachus), lymphatics, or direct peritoneal spread to the umbilicus. Most common primary tumours: gastric cancer (most common), colorectal cancer, ovarian cancer, pancreatic cancer. Named after Sister Mary Joseph Dempsey (a scrub nurse who noted the association). It indicates advanced intra-abdominal or pelvic malignancy with peritoneal dissemination and poor prognosis.",
  },
  {
    id: 7330,
    subject: "Surgery",
    stem: "Permissive hypotension in trauma management targets which systolic blood pressure, and in which group of patients should this strategy NOT be used?",
    options: [
      "Target SBP >100 mmHg; avoid in elderly patients",
      "Target SBP 80–90 mmHg; avoid in traumatic brain injury (TBI)",
      "Target SBP 70–80 mmHg; avoid in penetrating chest trauma",
      "Target SBP <70 mmHg; avoid in blunt abdominal trauma",
    ],
    answer: 1,
    explanation:
      "Permissive hypotension (hypotensive resuscitation) targets SBP 80–90 mmHg in haemorrhagic shock to avoid dilutional coagulopathy, hypothermia, and worsening of haemorrhage from high-pressure resuscitation before haemorrhage control. This strategy is CONTRAINDICATED in traumatic brain injury (TBI) because cerebral perfusion pressure (CPP = MAP − ICP) must be maintained — hypotension worsens secondary brain injury. In TBI, target MAP ≥80 mmHg (SBP ≥90 mmHg). Permissive hypotension is also relatively contraindicated in spinal cord injury.",
  },
  {
    id: 7331,
    subject: "Surgery",
    stem: "In D2 gastrectomy for advanced gastric cancer, which lymph node stations are removed in addition to perigastric nodes (D1)?",
    options: [
      "Only coeliac axis nodes (Station 9)",
      "Nodes along hepatic artery (Station 8), left gastric artery (Station 7), coeliac axis (Station 9), and splenic artery/hilum (Stations 10–11)",
      "Only para-aortic nodes (Station 16)",
      "Mediastinal nodes and hepatoduodenal ligament nodes only",
    ],
    answer: 1,
    explanation:
      "D1 gastrectomy removes perigastric lymph nodes (Stations 1–6). D2 gastrectomy additionally removes second-tier nodes along the hepatic artery (Station 8a), left gastric artery (Station 7), coeliac trunk (Station 9), and splenic vessels/hilum (Stations 10–11), requiring splenectomy or careful dissection. D2 is the standard of care for resectable advanced gastric cancer (JCOG trials). D3 (para-aortic nodes) is not routinely recommended. D2 + splenectomy has higher morbidity; spleen-preserving D2 is preferred.",
  },
  {
    id: 7332,
    subject: "Surgery",
    stem: "Milan criteria for liver transplantation in hepatocellular carcinoma (HCC) are:",
    options: [
      "Single nodule ≤3 cm OR up to 5 nodules each ≤2 cm",
      "Single nodule ≤5 cm OR up to 3 nodules each ≤3 cm, no vascular invasion, no extrahepatic spread",
      "Single nodule ≤7 cm with AFP <1000 ng/mL",
      "Total tumour diameter ≤8 cm by UCSF criteria",
    ],
    answer: 1,
    explanation:
      "Milan criteria (Mazzaferro 1996): single HCC nodule ≤5 cm, or up to 3 nodules each ≤3 cm, no macrovascular invasion, no extrahepatic spread. Patients meeting Milan criteria have 5-year survival >70% post-transplant, similar to non-tumour transplants. Extended criteria (UCSF criteria): single ≤6.5 cm or ≤3 nodules with largest ≤4.5 cm and total diameter ≤8 cm. Bridge therapy (TACE, ablation) is used to prevent tumour progression while awaiting transplant. AFP is a supplementary criterion in some expanded systems.",
  },
  {
    id: 7333,
    subject: "Surgery",
    stem: "A patient with oncoplastic breast-conserving surgery needs volume displacement due to a 3 cm tumour in the upper outer quadrant. Which technique is most appropriate?",
    options: [
      "Skin-sparing mastectomy with implant reconstruction",
      "Therapeutic mammoplasty / reduction mammoplasty technique with tumour excision and immediate reshaping",
      "Wide local excision alone without reshaping",
      "Latissimus dorsi flap reconstruction",
    ],
    answer: 1,
    explanation:
      "Oncoplastic breast-conserving surgery (BCS) combines adequate oncological excision with immediate breast reshaping. Volume displacement techniques (using remaining breast tissue for reshaping) include: reduction mammoplasty pattern, batwing/hemi-batwing excision, round-block technique. These are suitable for tumours up to 3–4 cm in large-breasted patients. Volume replacement (LD mini-flap, LICAP flap) is used when remaining tissue is insufficient. Oncoplastic techniques allow wider excision while maintaining cosmesis and avoiding mastectomy.",
  },
  {
    id: 7334,
    subject: "Surgery",
    stem: "The double duct sign on ERCP or MRCP, showing simultaneous dilation of the common bile duct and main pancreatic duct, is most characteristic of:",
    options: [
      "Primary sclerosing cholangitis",
      "Carcinoma of the head of pancreas",
      "Chronic calcific pancreatitis",
      "Choledocholithiasis",
    ],
    answer: 1,
    explanation:
      "The double duct sign refers to simultaneous dilation of both the common bile duct (CBD) and the main pancreatic duct (Wirsung duct) due to obstruction at the ampulla/head of pancreas. It is pathognomonic of carcinoma of the head of pancreas (or ampullary/periampullary cancer). In chronic pancreatitis, only the pancreatic duct may be dilated with irregular 'chain of lakes' appearance. Choledocholithiasis causes CBD dilation but not pancreatic duct dilation typically. PSC causes multifocal strictures (beaded appearance) of intrahepatic and extrahepatic bile ducts.",
  },
  {
    id: 7335,
    subject: "Surgery",
    stem: "Balanced blood product resuscitation in massive haemorrhage follows which ratio?",
    options: [
      "Packed RBCs:FFP:Platelets = 4:1:1",
      "Packed RBCs:FFP:Platelets = 1:1:1",
      "Packed RBCs only until haemoglobin >10 g/dL",
      "FFP:Platelets = 2:1, no RBCs until crossmatch",
    ],
    answer: 1,
    explanation:
      "Balanced (haemostatic) resuscitation uses a 1:1:1 ratio of packed red blood cells (pRBCs):fresh frozen plasma (FFP):platelets to reconstitute 'whole blood' and prevent dilutional coagulopathy. This is supported by PROPPR trial evidence. Massive transfusion protocol (MTP) should be activated early in major haemorrhage. Tranexamic acid (TXA) given within 3 hours of injury reduces mortality (CRASH-2 trial). Cryoprecipitate (fibrinogen) is given when fibrinogen <1.5 g/L. Avoid large-volume crystalloid resuscitation.",
  },
  {
    id: 7336,
    subject: "Surgery",
    stem: "Which statement correctly describes the ERAS postoperative protocol elements?",
    options: [
      "Prolonged bed rest for 3 days, nasogastric tube until first flatus, opioid-based analgesia",
      "Early oral feeding (within hours), early mobilisation, multimodal opioid-sparing analgesia, VTE prophylaxis",
      "Clear liquids only for 72 hours, routine drain insertion, paracetamol only",
      "Delayed feeding until bowel sounds return, routine urinary catheter for 7 days",
    ],
    answer: 1,
    explanation:
      "ERAS postoperative protocol: early oral feeding (within hours of surgery, not waiting for flatus/bowel sounds), early ambulation (day 0 or day 1), multimodal opioid-sparing analgesia (paracetamol + NSAIDs + local/regional anaesthesia + opioids only as rescue), VTE prophylaxis (LMWH + compression stockings), early removal of urinary catheter and drains, tight glycaemic control, avoidance of routine NG tubes. These measures collectively reduce length of stay, complications, and costs while improving patient outcomes.",
  },
  {
    id: 7337,
    subject: "Surgery",
    stem: "AFP (alpha-fetoprotein) as a tumour marker is elevated in which malignancy?",
    options: [
      "Pancreatic adenocarcinoma",
      "Hepatocellular carcinoma (HCC) and non-seminomatous germ cell tumours (NSGCT)",
      "Colorectal cancer",
      "Gastric cancer intestinal type",
    ],
    answer: 1,
    explanation:
      "AFP is a useful tumour marker for: (1) Hepatocellular carcinoma (HCC) — elevated in ~70% of cases; AFP >400 ng/mL is diagnostic in cirrhotic patients with appropriate lesion on imaging; (2) Non-seminomatous germ cell tumours (NSGCT) of testis — AFP is elevated in yolk sac tumours. Pure seminoma does NOT produce AFP (AFP elevation in a suspected seminoma indicates NSGCT component). AFP is used with beta-hCG and LDH for testicular cancer staging. AFP levels guide treatment and monitor response.",
  },
  {
    id: 7338,
    subject: "Surgery",
    stem: "In immediate breast reconstruction after mastectomy, which technique is preferred for patients who have or require post-mastectomy radiotherapy (PMRT)?",
    options: [
      "Immediate tissue expander placement followed by exchange to permanent implant",
      "Autologous tissue flap reconstruction (TRAM/DIEP/LD flap) as preferred option when PMRT is planned",
      "Immediate fixed-volume implant without tissue expander",
      "Delayed reconstruction is absolutely contraindicated after PMRT",
    ],
    answer: 1,
    explanation:
      "When post-mastectomy radiotherapy (PMRT) is planned or required, autologous tissue flap reconstruction (DIEP — deep inferior epigastric perforator flap, TRAM flap, LD flap) is preferred over implant-based reconstruction. Radiotherapy causes capsular contracture, implant failure, and poor cosmesis with implants. Autologous reconstruction is more resilient to radiation damage. Delayed reconstruction (after completion of PMRT) is an alternative. Immediate implant-based reconstruction followed by PMRT has higher complication rates (capsular contracture, implant loss ~40%).",
  },
  {
    id: 7339,
    subject: "Surgery",
    stem: "The BCLC staging system for HCC: intermediate stage (Stage B) patients are best treated with:",
    options: [
      "Surgical resection",
      "Transarterial chemoembolisation (TACE)",
      "Sorafenib systemic therapy",
      "Best supportive care",
    ],
    answer: 1,
    explanation:
      "BCLC staging treatment allocation: Stage 0 (very early, single <2 cm) → resection or ablation; Stage A (early, single or up to 3 × ≤3 cm, PS 0) → resection, ablation, or transplant (if Milan criteria); Stage B (intermediate, multinodular, no vascular invasion, PS 0–2) → TACE; Stage C (advanced, portal vein invasion/extrahepatic spread, PS 1–2) → sorafenib or atezolizumab+bevacizumab; Stage D (terminal, PS 3–4) → best supportive care. TACE for Stage B achieves survival benefit compared to conservative treatment.",
  },
  {
    id: 7340,
    subject: "Surgery",
    stem: "A patient undergoing D2 gastrectomy for advanced gastric cancer is at risk for 'Rovsing-like' dumping syndrome. Early dumping syndrome (within 30 minutes of eating) is caused by:",
    options: [
      "Hypoglycaemia due to insulin overshoot after rapid gastric emptying",
      "Rapid transit of hyperosmolar food into small bowel causing fluid shift and GI/vasomotor symptoms",
      "Bile reflux into the oesophagus causing heartburn",
      "Bacterial overgrowth in the afferent limb causing bloating",
    ],
    answer: 1,
    explanation:
      "Early dumping syndrome occurs within 15–30 minutes of eating after gastrectomy/pyloroplasty. Mechanism: rapid transit of hyperosmolar food into small intestine → fluid shift from intravascular space into gut lumen → intestinal distension and release of gut hormones (serotonin, motilin) → GI symptoms (nausea, vomiting, diarrhoea, cramping) + vasomotor symptoms (flushing, palpitations, dizziness). Late dumping (1–3 hours after eating) is due to reactive hypoglycaemia from insulin overshoot. Treatment: small frequent meals, avoid fluids with meals, high-protein/complex carbohydrate diet, octreotide if severe.",
  },

  // ─── OBG (IDs 7341–7360) ────────────────────────────────────────────────────

  {
    id: 7341,
    subject: "OBG",
    stem: "According to FIGO 2023 staging, cervical cancer with tumour confined to the cervix measuring 3 cm in greatest dimension is classified as:",
    options: ["Stage Ia1", "Stage Ib1", "Stage Ib2", "Stage IIa1"],
    answer: 2,
    explanation:
      "FIGO 2023 cervical cancer staging: Stage Ia — microscopic invasive cancer only (Ia1: ≤3 mm depth, Ia2: 3–5 mm depth). Stage Ib — clinically visible or microscopic >5 mm: Ib1 = <2 cm confined to cervix; Ib2 = 2–4 cm; Ib3 = ≥4 cm confined to cervix. Stage IIa1 = upper vagina <4 cm. Stage IIb = parametrial involvement. A 3 cm tumour confined to cervix = Ib2. Key FIGO 2023 update: IIIc substages (IIIc1 = pelvic LN, IIIc2 = para-aortic LN) added based on imaging/pathology findings.",
  },
  {
    id: 7342,
    subject: "OBG",
    stem: "In FIGO 2023 cervical cancer staging, Stage IIIc1 and IIIc2 refer to which findings that were NOT part of older FIGO staging?",
    options: [
      "Bladder and rectal involvement respectively",
      "Pelvic lymph node involvement (IIIc1) and para-aortic lymph node involvement (IIIc2)",
      "Lower vaginal and pelvic wall extension respectively",
      "Hydronephrosis (IIIc1) and distant metastasis (IIIc2)",
    ],
    answer: 1,
    explanation:
      "A major update in FIGO 2023 cervical cancer staging is the inclusion of lymph node status: Stage IIIc1 = pelvic lymph node metastasis (regardless of tumour size); Stage IIIc2 = para-aortic lymph node metastasis. Previously, staging was purely clinical and did not incorporate LN imaging/pathology. This allows imaging (CT, MRI, PET-CT) and surgical pathological findings to upstage patients. 'r' or 'p' suffix denotes radiological or pathological determination (e.g., IIIc1r = pelvic LN on imaging, IIIc1p = histological confirmation).",
  },
  {
    id: 7343,
    subject: "OBG",
    stem: "In FIGO staging of endometrial carcinoma, Stage II is defined as:",
    options: [
      "Tumour confined to the endometrium only",
      "Invasion of the cervical stroma (without extension beyond uterus)",
      "Invasion beyond the uterus to pelvic structures",
      "Distant metastasis including inguinal nodes",
    ],
    answer: 1,
    explanation:
      "FIGO endometrial cancer staging: Stage I = confined to uterus (Ia = confined to endometrium or inner half myometrium; Ib = outer half myometrium); Stage II = tumour invades cervical stroma (without extension beyond uterus); Stage IIIA = serosa/adnexa; Stage IIIB = vagina/parametrium; Stage IIIC1 = pelvic LN; Stage IIIC2 = para-aortic LN; Stage IVA = bladder/bowel mucosa; Stage IVB = distant metastasis. Surgical staging is the standard (total hysterectomy + bilateral salpingo-oophorectomy + pelvic LN assessment).",
  },
  {
    id: 7344,
    subject: "OBG",
    stem: "The most common direct cause of maternal mortality worldwide is:",
    options: [
      "Sepsis",
      "Postpartum haemorrhage (PPH)",
      "Hypertensive disorders of pregnancy",
      "Pulmonary embolism",
    ],
    answer: 1,
    explanation:
      "Postpartum haemorrhage (PPH) is the single most common direct cause of maternal mortality worldwide, accounting for approximately 25–35% of maternal deaths globally. Defined as blood loss ≥500 mL after vaginal delivery or ≥1000 mL after caesarean section. The 4 T's of PPH: Tone (uterine atony — most common, 70–80%), Trauma, Tissue (retained placenta), Thrombin (coagulopathy). Management: uterotonics (oxytocin first-line, ergometrine, carboprost, misoprostol), Bakri balloon, B-Lynch suture, uterine artery ligation, hysterectomy. WHO recommends oxytocin as prophylaxis for all deliveries.",
  },
  {
    id: 7345,
    subject: "OBG",
    stem: "In developed countries, the most common indirect cause of maternal mortality is:",
    options: [
      "Anaemia",
      "Cardiac disease",
      "Diabetes mellitus",
      "Epilepsy",
    ],
    answer: 1,
    explanation:
      "Cardiac disease (including pre-existing and new onset) is the most common indirect cause of maternal mortality in developed countries, including the UK (MBRRACE-UK confidential enquiry). Conditions include cardiomyopathy (peripartum cardiomyopathy, dilated cardiomyopathy), ischaemic heart disease, aortic dissection (Marfan syndrome), pulmonary hypertension. In India, anaemia remains the most common indirect cause. The MBRRACE-UK confidential enquiry into maternal deaths provides regular updates on causes and lessons learnt from preventable maternal deaths.",
  },
  {
    id: 7346,
    subject: "OBG",
    stem: "Universal screening for gestational diabetes mellitus (GDM) uses a 75g OGTT at 24–28 weeks. According to WHO criteria, GDM is diagnosed when ANY of the following values are met or exceeded:",
    options: [
      "Fasting ≥126 mg/dL, 1h ≥200 mg/dL, 2h ≥200 mg/dL",
      "Fasting ≥92 mg/dL, 1h ≥180 mg/dL, 2h ≥153 mg/dL",
      "Fasting ≥100 mg/dL, 2h ≥140 mg/dL (ADA 2023)",
      "Fasting ≥95 mg/dL, 1h ≥180 mg/dL (O'Sullivan criteria)",
    ],
    answer: 1,
    explanation:
      "WHO 2013/IADPSG diagnostic criteria for GDM using 75g OGTT: Fasting plasma glucose ≥92 mg/dL (5.1 mmol/L), OR 1-hour value ≥180 mg/dL (10.0 mmol/L), OR 2-hour value ≥153 mg/dL (8.5 mmol/L) — ANY single value positive diagnoses GDM. These same criteria are used in India (ADA also adopted these). Overt diabetes in pregnancy: fasting ≥126 mg/dL or 2h ≥200 mg/dL. Management: diet and exercise first, insulin if targets not met (fasting <95, 1h postprandial <140, 2h <120 mg/dL). Metformin is acceptable as second-line.",
  },
  {
    id: 7347,
    subject: "OBG",
    stem: "A patient with GDM does not achieve glucose targets with diet and exercise modification. The first-line pharmacological treatment is:",
    options: [
      "Glibenclamide (glyburide) as preferred oral agent",
      "Insulin therapy (basal-bolus regimen)",
      "Metformin as first-line pharmacotherapy",
      "Acarbose to reduce postprandial glucose",
    ],
    answer: 1,
    explanation:
      "Insulin is the first-line pharmacological treatment for GDM not controlled by diet and exercise. Insulin does not cross the placenta. Regimen: basal insulin (NPH or glargine) for fasting hyperglycaemia, short-acting insulin (regular or aspart) for postprandial. Metformin is acceptable as a second-line or alternative agent in some guidelines (NICE, WHO) when insulin is unavailable or refused, but crosses the placenta. Glibenclamide (glyburide) is not recommended due to neonatal hypoglycaemia risk. Postpartum: retest with 75g OGTT at 6–12 weeks to screen for persistent diabetes.",
  },
  {
    id: 7348,
    subject: "OBG",
    stem: "A 25-year-old woman presents with sudden onset severe right iliac fossa pain, nausea, and vomiting. Ultrasound shows an enlarged (8 cm) right ovary with absent Doppler flow. The most likely diagnosis and management is:",
    options: [
      "Ruptured ovarian cyst — laparoscopy + cystectomy",
      "Ovarian torsion — laparoscopic detorsion ± cystectomy (oophorectomy only if frankly necrotic)",
      "Appendicitis — appendicectomy",
      "Ectopic pregnancy — salpingectomy",
      ],
    answer: 1,
    explanation:
      "Ovarian torsion is a gynaecological emergency. Classic presentation: sudden severe unilateral pelvic pain, nausea/vomiting, enlarged oedematous ovary on ultrasound ± absent Doppler flow (Doppler flow may be present even with torsion). Most common in reproductive age; right side more common (sigmoid colon anatomically protects left side). Dermoid cyst (mature cystic teratoma) is the most common cyst associated with torsion. Treatment: prompt laparoscopic detorsion + cystectomy. Oophorectomy only if ovary appears frankly necrotic and non-viable. Most torsed ovaries recover after detorsion even if appearing dusky.",
  },
  {
    id: 7349,
    subject: "OBG",
    stem: "The definition of infertility is failure to conceive despite regular unprotected intercourse for how long, and when is earlier investigation recommended?",
    options: [
      "6 months; earlier if age >30 years",
      "12 months; 6 months if female age >35 years, or known risk factors (e.g., irregular cycles, previous pelvic infection, male factor)",
      "18 months; earlier only if primary infertility",
      "24 months; earlier only in secondary infertility",
    ],
    answer: 1,
    explanation:
      "Infertility is defined as failure to achieve a clinical pregnancy after 12 months of regular unprotected intercourse. Earlier investigation (after 6 months) is recommended if: female age ≥35 years, known/suspected tubal disease (previous PID, endometriosis, pelvic surgery), irregular/absent menstruation, previous cancer treatment, known male factor. Female fertility declines significantly after 35. Basic investigations: semen analysis, day 21 progesterone (ovulation), day 3 FSH/LH/oestradiol, AMH (ovarian reserve), antral follicle count (AFC), and tubal patency (HSG or laparoscopy + dye test).",
  },
  {
    id: 7350,
    subject: "OBG",
    stem: "Anti-Müllerian hormone (AMH) is used to assess ovarian reserve. Which statement about AMH is correct?",
    options: [
      "AMH levels vary significantly throughout the menstrual cycle and must be measured on day 3",
      "AMH is produced by antral and preantral follicles; levels can be measured at any point in the cycle and correlate with the ovarian reserve",
      "AMH levels increase progressively with female age until menopause",
      "High AMH levels predict poor response to ovarian stimulation",
    ],
    answer: 1,
    explanation:
      "AMH (anti-Müllerian hormone) is secreted by granulosa cells of small antral and preantral follicles (2–10 mm). Key features: (1) relatively cycle-independent (can be measured any day), (2) best single predictor of ovarian reserve and ovarian response to stimulation, (3) declines with age (reaches undetectable levels at menopause), (4) elevated in PCOS, (5) low/undetectable AMH = poor ovarian reserve → low response to IVF stimulation. High AMH = good reserve but also risk of OHSS (ovarian hyperstimulation syndrome). FSH day 3 rises with declining reserve. AFC (antral follicle count) on transvaginal ultrasound is complementary.",
  },
  {
    id: 7351,
    subject: "OBG",
    stem: "Ovarian hyperstimulation syndrome (OHSS) is a complication of controlled ovarian stimulation in IVF. The most reliable preventive strategy for patients at high risk (high AMH, PCOS) is:",
    options: [
      "Use of clomiphene citrate instead of gonadotropins",
      "GnRH antagonist protocol with GnRH agonist trigger instead of hCG trigger, combined with elective embryo freezing (freeze-all strategy)",
      "Reducing FSH dose alone without changing trigger",
      "Aspirin administration from start of stimulation",
    ],
    answer: 1,
    explanation:
      "OHSS prevention in high-risk patients: using a GnRH antagonist protocol (rather than long agonist protocol) allows use of a GnRH agonist as the ovulation trigger (instead of hCG). GnRH agonist trigger causes a shorter endogenous LH surge, significantly reducing OHSS risk. Combined with elective embryo freezing (freeze-all strategy), which avoids the additional OHSS risk of fresh embryo transfer and the luteal phase hCG. Cabergoline (dopamine agonist) reduces OHSS by inhibiting VEGF-induced vascular permeability. Coasting (withholding FSH when excessive response) is another strategy.",
  },
  {
    id: 7352,
    subject: "OBG",
    stem: "Which statement about cervical cancer FIGO Stage IVa correctly describes the sites involved?",
    options: [
      "Para-aortic lymph node metastasis",
      "Invasion of bladder or rectal mucosa (confirmed histologically/cystoscopically)",
      "Extension to lower one-third of vagina",
      "Involvement of pelvic side wall",
    ],
    answer: 1,
    explanation:
      "FIGO 2023 cervical cancer Stage IVa = invasion of adjacent organs (bladder mucosa or rectal mucosa), confirmed by cystoscopy/proctoscopy and biopsy. Bullous oedema alone on cystoscopy is insufficient. Stage IVb = distant metastasis (lung, liver, bone, inguinal nodes outside the pelvis). Treatment of Stage IVa/b: palliative platinum-based chemotherapy ± bevacizumab (GOG 240 trial showed bevacizumab + chemotherapy improved OS in Stage IVb). Stage IIIB = pelvic side wall extension or hydronephrosis. Stage IIIa = lower vagina. Stage IIIc = nodal involvement.",
  },
  {
    id: 7353,
    subject: "OBG",
    stem: "Facility-Based Maternal Death Review (FBMDR) in India is conducted to:",
    options: [
      "Punish healthcare providers responsible for maternal deaths",
      "Identify avoidable factors and systemic gaps to prevent future maternal deaths through a non-punitive confidential review",
      "Generate medico-legal evidence for criminal prosecution of negligence",
      "Audit only maternal deaths that occur in private hospitals",
    ],
    answer: 1,
    explanation:
      "Facility-Based Maternal Death Review (FBMDR) is a systematic qualitative process to review each maternal death occurring in a health facility to identify avoidable factors (three delays: delay in deciding to seek care, delay in reaching facility, delay in receiving care). It is non-punitive and confidential, aimed at learning and systemic improvement rather than blame. Every maternal death in a government health facility must be reviewed. Community-Based Maternal Death Review (CBMDR) captures deaths outside facilities. India's Maternal Death Surveillance and Response (MDSR) system combines both.",
  },
  {
    id: 7354,
    subject: "OBG",
    stem: "A hysterosalpingogram (HSG) shows bilateral proximal tubal block. The next appropriate investigation to confirm and potentially treat is:",
    options: [
      "Repeat HSG with oil-based contrast",
      "Laparoscopy with chromopertubation (dye test) and hysteroscopy",
      "MRI pelvis to assess tube morphology",
      "Diagnostic laparotomy",
    ],
    answer: 1,
    explanation:
      "HSG is the first-line investigation for tubal patency (sensitivity ~65%, specificity ~83%). Bilateral proximal tubal block on HSG may be a false positive (tubal spasm, mucus plugging). The gold standard for tubal patency assessment is laparoscopy with chromopertubation (methylene blue or indigo carmine dye injected through cervix — spillage from fimbriated end confirms patency). Hysteroscopy is performed simultaneously for uterine cavity assessment. Laparoscopy also allows diagnosis and treatment of endometriosis, adhesions, and peritubal disease. Selective salpingography can treat proximal obstruction.",
  },
  {
    id: 7355,
    subject: "OBG",
    stem: "Postpartum haemorrhage (PPH) management: if oxytocin fails, which second-line uterotonic is preferred, and what is its contraindication?",
    options: [
      "Ergometrine — contraindicated in hypertension/pre-eclampsia",
      "Carboprost (15-methyl PGF2α) — contraindicated in asthma",
      "Misoprostol — contraindicated in renal failure",
      "Methylergonovine — contraindicated in uterine atony",
    ],
    answer: 1,
    explanation:
      "If oxytocin fails for uterine atony (PPH), second-line uterotonics include: ergometrine (contraindicated in hypertension, cardiac disease, Raynaud's phenomenon), carboprost/15-methyl PGF2α (contraindicated in asthma as it causes bronchoconstriction, and relative contraindication in hepatic/renal disease), misoprostol (prostaglandin E1 analogue — febrile side effect; useful in resource-limited settings; contraindicated in PGE1 hypersensitivity). Tranexamic acid (TXA) within 3 hours. Surgical options: uterine balloon tamponade (Bakri), B-Lynch suture, uterine artery ligation, internal iliac artery ligation, or hysterectomy.",
  },
  {
    id: 7356,
    subject: "OBG",
    stem: "Day 21 serum progesterone is measured to confirm ovulation. A result of ≥30 nmol/L (≥9.5 ng/mL) is generally considered confirmatory of ovulation. This test is timed to 7 days before the expected next period, so in a 35-day cycle, it should be taken on:",
    options: [
      "Day 14",
      "Day 21",
      "Day 28",
      "Day 7",
    ],
    answer: 2,
    explanation:
      "Day 21 progesterone is named for a standard 28-day cycle (testing 7 days before expected period = day 21). For cycles of different length, the test should be 7 days before the expected next period: in a 35-day cycle → Day 28; in a 21-day cycle → Day 14. A result ≥30 nmol/L (≥9.5 ng/mL) suggests ovulation has occurred. Values between 16–30 nmol/L suggest ovulation but with luteal phase deficiency. <16 nmol/L suggests anovulation. The test should be repeated if result is borderline, accounting for cycle length variation.",
  },
  {
    id: 7357,
    subject: "OBG",
    stem: "In cervical cancer management, concurrent chemoradiation is preferred over radiotherapy alone for locally advanced disease (Stage IIB–IVA). The chemotherapy agent used concurrently is:",
    options: [
      "Paclitaxel weekly",
      "Cisplatin weekly",
      "Carboplatin 3-weekly",
      "5-Fluorouracil alone",
    ],
    answer: 1,
    explanation:
      "Concurrent chemoradiation (CCRT) with weekly cisplatin is the standard treatment for locally advanced cervical cancer (Stages IIb–IVa). Cisplatin acts as a radiosensitiser. Multiple meta-analyses show CCRT improves OS and PFS compared to radiotherapy alone. Cisplatin 40 mg/m² weekly is given concurrently with external beam radiotherapy (EBRT) and brachytherapy boost. For patients who cannot tolerate cisplatin (renal impairment), carboplatin is an alternative. Bevacizumab is added to chemotherapy for recurrent/metastatic disease (GOG 240 trial).",
  },
  {
    id: 7358,
    subject: "OBG",
    stem: "The three-delay model for maternal mortality refers to delays in which sequence?",
    options: [
      "Delay in diagnosis → delay in referral → delay in surgery",
      "Delay in deciding to seek care → delay in reaching a health facility → delay in receiving adequate care at the facility",
      "Delay in antenatal care → delay in labour admission → delay in postnatal care",
      "Delay in blood bank → delay in operating theatre → delay in ICU admission",
    ],
    answer: 1,
    explanation:
      "The Three Delays Model (Thaddeus and Maine, 1994) identifies three critical delays contributing to maternal mortality: (1) Delay in deciding to seek care — due to lack of recognition of danger signs, cultural factors, financial barriers, male decision-making; (2) Delay in reaching a health facility — poor roads, transport unavailability, distance; (3) Delay in receiving adequate care at the facility — lack of skilled providers, blood supply, equipment, drugs. Maternal death review identifies which delay(s) occurred and implements targeted interventions. It forms the conceptual basis for FBMDR in India.",
  },
  {
    id: 7359,
    subject: "OBG",
    stem: "A 30-year-old with PCOS is undergoing IVF. She produces 22 oocytes after stimulation, with serum oestradiol >15,000 pmol/L. Three days after egg collection she develops abdominal distension, nausea, and oliguria. Which is the most appropriate management?",
    options: [
      "Immediate embryo transfer and intravenous albumin",
      "Cancel embryo transfer (freeze-all strategy), IV albumin, close monitoring with fluid balance, consider paracentesis if severe",
      "Oral cabergoline and continue with fresh embryo transfer",
      "Laparotomy for suspected ovarian rupture",
    ],
    answer: 1,
    explanation:
      "This is moderate-to-severe ovarian hyperstimulation syndrome (OHSS), a complication of ovarian stimulation. OHSS is driven by VEGF-mediated vascular hyperpermeability. Management of moderate/severe OHSS: (1) Cancel fresh embryo transfer (freeze-all eliminates additional hCG from pregnancy which worsens OHSS); (2) IV albumin (25% solution) to maintain intravascular oncotic pressure; (3) Thromboprophylaxis (LMWH — OHSS causes hypercoagulable state); (4) Strict fluid balance, daily weight, abdominal girth; (5) Paracentesis for tense ascites causing discomfort/respiratory compromise; (6) Cabergoline as prophylaxis reduces OHSS severity.",
  },
  {
    id: 7360,
    subject: "OBG",
    stem: "On abdominal examination of an infertile patient, you find a smooth, firm midline abdominal mass at the level of the umbilicus in a 30-year-old woman. The uterus appears uniformly enlarged. The most likely diagnosis is:",
    options: [
      "Ovarian cyst",
      "Uterine leiomyoma (fibroid) — most common benign tumour of uterus",
      "Endometrial polyp",
      "Adenomyosis (diffuse)",
    ],
    answer: 1,
    explanation:
      "A smooth, firm midline abdominal mass that is continuous with the uterus in a woman of reproductive age most likely represents a uterine leiomyoma (fibroid). Leiomyomas are the most common benign tumours of the uterus. Large intramural or subserosal fibroids can cause uniform uterine enlargement mimicking pregnancy. They are oestrogen-dependent, multiple, and more common in women of African descent. Submucosal fibroids most affect fertility (distort uterine cavity). Treatment options: myomectomy (preserves fertility), hysterectomy (definitive), uterine artery embolisation, GnRH agonists, ulipristal acetate.",
  },

  // ─── PAEDIATRICS (IDs 7361–7380) ────────────────────────────────────────────

  {
    id: 7361,
    subject: "Paediatrics",
    stem: "The HPV vaccine (Gardasil 9) has been added to India's national immunisation programme. The recommended schedule for girls aged 9–14 years is:",
    options: [
      "3 doses at 0, 1, and 6 months",
      "2 doses 6 months apart (0 and 6 months)",
      "Single dose only",
      "2 doses at 0 and 2 months",
    ],
    answer: 1,
    explanation:
      "IAP immunisation schedule 2023: HPV vaccine (Gardasil 9, nonavalent) is given as 2 doses 6 months apart (at 0 and 6 months) for girls aged 9–14 years. Girls aged ≥15 years (or immunocompromised/HIV) receive 3 doses (0, 1–2, and 6 months). Gardasil 9 covers HPV types 6, 11, 16, 18, 31, 33, 45, 52, 58 (9 types). It prevents cervical cancer, genital warts, and other HPV-related malignancies. For maximum efficacy, vaccination should be given before sexual debut. Boys are vaccinated in some countries (not yet routine in India's national programme).",
  },
  {
    id: 7362,
    subject: "Paediatrics",
    stem: "Rotavirus vaccine in India's national immunisation programme: which vaccine is used and at what schedule?",
    options: [
      "Rotarix (RV1): 2 doses at 6 and 14 weeks",
      "Rotavac or Rotasiil: oral vaccine, 3 doses at 6, 10, and 14 weeks",
      "RotaTeq (RV5): 3 doses at 2, 4, and 6 months",
      "Single oral dose at birth",
    ],
    answer: 1,
    explanation:
      "India's Universal Immunisation Programme (UIP) uses indigenous rotavirus vaccines: Rotavac (116E strain, Bharat Biotech) or Rotasiil (BRV-PV, Serum Institute). Both are oral vaccines administered in 3 doses at 6, 10, and 14 weeks (along with DPT and polio vaccines). Rotavirus is the most common cause of severe dehydrating gastroenteritis in children <5 years globally. The vaccine prevents severe rotavirus disease, hospitalisation, and rotavirus-associated diarrhoeal mortality. Maximum age for first dose is 15 weeks; last dose by 32 weeks.",
  },
  {
    id: 7363,
    subject: "Paediatrics",
    stem: "During neonatal resuscitation (NRP 2021), after stimulation and assessment, a newborn has a heart rate of 70 bpm with poor respiratory effort. What is the immediate next step?",
    options: [
      "Chest compressions immediately",
      "Positive pressure ventilation (PPV) with 21% oxygen via face mask",
      "IV adrenaline via umbilical vein",
      "Intubation and surfactant administration",
    ],
    answer: 1,
    explanation:
      "NRP 2021 algorithm: (1) Stimulate and dry; assess tone, breathing, HR. (2) If HR <100 bpm or inadequate breathing → start positive pressure ventilation (PPV). Initial FiO2 for term infants = 21% (room air); for preterm <35 weeks = 21–30%. (3) After 30 seconds of PPV, if HR <60 bpm → begin chest compressions (3:1 ratio with PPV, 120 events/minute = 90 compressions + 30 breaths). (4) If HR still <60 after CPR → IV/IO adrenaline (epinephrine) 0.01–0.03 mg/kg via umbilical venous catheter. Target SpO2 per Dawson chart. Delayed cord clamping 1–3 minutes if not compromised.",
  },
  {
    id: 7364,
    subject: "Paediatrics",
    stem: "In neonatal resuscitation, if chest compressions have been initiated and heart rate remains <60 bpm after 30 seconds of CPR (3:1 compressions:ventilations), the next step is:",
    options: [
      "Increase ventilation rate to 1:1 with compressions",
      "Administer IV/IO adrenaline (epinephrine) 0.01–0.03 mg/kg via umbilical venous catheter",
      "Administer IV sodium bicarbonate immediately",
      "Apply cardiac defibrillation",
    ],
    answer: 1,
    explanation:
      "After 30 seconds of coordinated chest compressions (3:1 ratio with PPV = 90 compressions + 30 breaths per minute) and reassessment showing HR still <60 bpm: administer adrenaline (epinephrine) 0.01 mg/kg (0.1 mL/kg of 1:10,000 solution) via umbilical venous catheter (UVC) — preferred route. If UVC not yet available, 0.05–0.1 mg/kg via endotracheal tube (ETT) — less reliable. Volume (10 mL/kg 0.9% saline) if hypovolaemia suspected (pallor, weak pulse despite adequate ventilation). Sodium bicarbonate is not recommended routinely; only after confirming adequate ventilation.",
  },
  {
    id: 7365,
    subject: "Paediatrics",
    stem: "The most common childhood malignancy is acute lymphoblastic leukaemia (ALL). The translocation t(12;21) TEL-AML1 (ETV6-RUNX1) in B-cell ALL carries which prognosis?",
    options: [
      "Poor prognosis — seen in Philadelphia chromosome-positive ALL",
      "Good prognosis — most common favourable genetic abnormality in childhood ALL",
      "Intermediate prognosis — no specific treatment modification needed",
      "Very poor prognosis — indicates immediate stem cell transplant",
    ],
    answer: 1,
    explanation:
      "t(12;21) TEL-AML1/ETV6-RUNX1 is the most common chromosomal translocation in childhood B-ALL (~25% of cases) and confers excellent prognosis (5-year survival >90% with standard therapy). Key ALL cytogenetics: t(9;22) Philadelphia chromosome (BCR-ABL) = poor prognosis (requires TKI + chemotherapy, transplant consideration); t(12;21) TEL-AML1 = good prognosis; hyperdiploidy (>50 chromosomes) = good prognosis; hypodiploidy (<44) = poor prognosis; t(1;19) E2A-PBX1 = intermediate. MLL rearrangements in infant ALL = very poor. B-ALL is more common than T-ALL; T-ALL has mediastinal mass.",
  },
  {
    id: 7366,
    subject: "Paediatrics",
    stem: "Standard induction chemotherapy regimen for childhood ALL typically includes which combination?",
    options: [
      "Cyclophosphamide + doxorubicin + vincristine (CVD)",
      "Vincristine + prednisolone + L-asparaginase ± daunorubicin (Berlin-Frankfurt-Münster protocol)",
      "Methotrexate + 6-mercaptopurine + cytarabine",
      "Imatinib monotherapy for all ALL subtypes",
    ],
    answer: 1,
    explanation:
      "Standard 4-drug induction for childhood ALL (Berlin-Frankfurt-Münster [BFM] protocol and similar): Vincristine (weekly × 4) + Prednisolone/Dexamethasone (daily × 28 days) + L-asparaginase (multiple doses) ± Daunorubicin (for higher-risk patients). This achieves complete remission in >95% of children. CNS prophylaxis: intrathecal methotrexate (replaces cranial radiotherapy in most protocols). Consolidation phase: high-dose MTX, 6-MP. Maintenance: daily 6-MP + weekly MTX for 2–3 years. Ph+ ALL (t9;22): add imatinib or dasatinib to chemotherapy.",
  },
  {
    id: 7367,
    subject: "Paediatrics",
    stem: "Wilms tumour (nephroblastoma) characteristically presents with which clinical features, and which gene is associated?",
    options: [
      "Bilateral flank masses crossing the midline, AFP elevated, p53 mutation",
      "Unilateral abdominal mass NOT crossing the midline, in a child aged 2–5 years, associated with WT1 gene mutation",
      "Midline abdominal mass in neonates, N-MYC amplification",
      "Painless haematuria with VMA/HVA elevated in urine",
    ],
    answer: 1,
    explanation:
      "Wilms tumour (nephroblastoma) is the most common renal tumour of childhood. Classic presentation: large, firm, smooth unilateral abdominal mass in a 2–5-year-old child, does NOT cross the midline (differentiating from neuroblastoma which crosses midline). Associated genes: WT1 (Wilms Tumour 1 gene, chromosome 11p13). Associated syndromes: WAGR (Wilms, Aniridia, Genitourinary anomalies, intellectual disability/Retardation), Beckwith-Wiedemann, Denys-Drash. Treatment: nephrectomy + chemotherapy (± radiotherapy for Stage III/IV). 5-year survival >90%. VMA/HVA elevation is characteristic of neuroblastoma.",
  },
  {
    id: 7368,
    subject: "Paediatrics",
    stem: "Neuroblastoma arises from neural crest cells. Which statement about neuroblastoma prognosis is correct?",
    options: [
      "N-MYC amplification confers excellent prognosis in stage 4S disease",
      "N-MYC amplification is associated with rapid progression and poor prognosis regardless of stage",
      "Elevated urine VMA/HVA levels indicate good prognosis",
      "Neuroblastoma predominantly presents in adolescents and young adults",
    ],
    answer: 1,
    explanation:
      "Neuroblastoma is the most common extracranial solid tumour of infancy (median age 18 months). Arises from adrenal medulla (most common) or sympathetic chain. Urinary VMA (vanillylmandelic acid) and HVA (homovanillic acid) elevated (catecholamine metabolites) — useful for diagnosis and monitoring. N-MYC (MYCN) gene amplification (chromosome 2p24) = poor prognosis, aggressive disease. Stage 4S (special): age <18 months, small primary + liver/skin/bone marrow mets without cortical bone mets — paradoxically good prognosis, may regress spontaneously. Pepper syndrome = massive liver mets. Hutchinson syndrome = bone mets with orbital/skull involvement (proptosis, periorbital bruising).",
  },
  {
    id: 7369,
    subject: "Paediatrics",
    stem: "Early developmental red flags for Autism Spectrum Disorder (ASD) include which of the following milestones NOT achieved by the stated age?",
    options: [
      "No head control by 6 months",
      "No babbling by 12 months, no single words by 16 months, no two-word phrases by 24 months, or any regression at any age",
      "No pincer grasp by 18 months",
      "No sitting without support by 12 months",
    ],
    answer: 1,
    explanation:
      "ASD red flag language/social milestones (absolute indicators requiring urgent evaluation): no babbling by 12 months, no gesturing (pointing, waving) by 12 months, no single words by 16 months, no two-word spontaneous phrases by 24 months, any loss of language or social skills at any age (regression is always a red flag). Other ASD red flags: lack of eye contact, not responding to name by 12 months, lack of social smile by 6 months, not showing objects to share interest (joint attention). M-CHAT-R/F is the validated screening tool at 16–30 months. DSM-5 diagnostic criteria require persistent deficits in social communication and restricted/repetitive behaviours.",
  },
  {
    id: 7370,
    subject: "Paediatrics",
    stem: "The M-CHAT-R/F (Modified Checklist for Autism in Toddlers, Revised with Follow-up) is used as an ASD screening tool at what age?",
    options: [
      "9–12 months",
      "16–30 months",
      "3–5 years",
      "6–10 years",
    ],
    answer: 1,
    explanation:
      "M-CHAT-R/F is a validated parent-report screening questionnaire for ASD, used at 16–30 months of age (recommended at 18 and 24-month well-child visits). It has 20 yes/no questions covering: pointing, showing, eye contact, social interest, imitation, responding to name. Scoring: 0–2 = low risk; 3–7 = medium risk (follow-up interview); 8–20 = high risk (immediate referral). A positive screen requires diagnostic assessment (not diagnosis). ASD diagnosis uses DSM-5 criteria and multidisciplinary assessment. Early intervention (ABA therapy, speech therapy, occupational therapy) before age 5 significantly improves outcomes.",
  },
  {
    id: 7371,
    subject: "Paediatrics",
    stem: "ADHD is characterised by inattention and/or hyperactivity-impulsivity. According to DSM-5, onset of symptoms must be before:",
    options: [
      "6 years of age",
      "12 years of age",
      "7 years of age (DSM-IV criterion)",
      "18 years of age",
    ],
    answer: 1,
    explanation:
      "DSM-5 ADHD criteria (updated from DSM-IV): several symptoms present BEFORE age 12 years (DSM-IV required before age 7). Symptoms must be present in 2+ settings (e.g., home and school), cause significant functional impairment, and not be better explained by another disorder. Types: predominantly inattentive (≥6 inattentive symptoms), predominantly hyperactive-impulsive (≥6 hyperactive symptoms), combined (both). For adolescents ≥17 years and adults, 5 symptoms required (not 6). First-line pharmacotherapy: methylphenidate (stimulant, dopamine + noradrenaline reuptake inhibitor). Second-line: atomoxetine (non-stimulant, selective noradrenaline reuptake inhibitor).",
  },
  {
    id: 7372,
    subject: "Paediatrics",
    stem: "In the NTEP/RNTCP 2022 guidelines for paediatric TB, Xpert MTB/RIF (GeneXpert) can be performed on which specimens from children?",
    options: [
      "Only sputum; not applicable for children who cannot produce sputum",
      "Induced sputum, gastric aspirate, stool, and lymph node aspirate",
      "Urine and cerebrospinal fluid only",
      "Blood culture only",
    ],
    answer: 1,
    explanation:
      "Children with TB often cannot produce spontaneous sputum. NTEP 2022 recommends Xpert MTB/RIF (GeneXpert) on: induced sputum (after nebulisation with 3% hypertonic saline), gastric aspirate (early morning, 3 consecutive days), stool (non-invasive, emerging evidence), lymph node aspirate/biopsy (for peripheral lymph node TB). Nasopharyngeal aspirate is another option. Xpert MTB/RIF simultaneously detects M. tuberculosis and rifampicin resistance. Microbiological confirmation is difficult in childhood TB (~30–50% confirmed); clinical diagnosis with scoring systems (Keith Edwards/Stegen-Toledo score) is often used.",
  },
  {
    id: 7373,
    subject: "Paediatrics",
    stem: "Isoniazid preventive therapy (IPT) under NTEP is recommended for which groups of children?",
    options: [
      "All children under 15 years in high TB burden areas",
      "Household contacts of TB patients aged <5 years (regardless of TST/IGRA), and all HIV-positive children regardless of age, after ruling out active TB",
      "Only children with positive TST >10 mm",
      "Children aged 5–15 years with known TB contact only",
    ],
    answer: 1,
    explanation:
      "NTEP IPT indications for children: (1) All household contacts aged <5 years of a bacteriologically confirmed pulmonary TB patient — IPT given regardless of TST/IGRA result (young children have high risk of progression and primary complex), (2) All people living with HIV (PLHIV) including children, after excluding active TB. IPT regimen: Isoniazid (H) 10 mg/kg/day (max 300 mg/day) for 6 months. PLHIV: 6 months (India) or 36 months (WHO recommendation). Rule out active TB before starting IPT (symptom screen: cough, fever, weight loss, night sweats — if any, investigate fully).",
  },
  {
    id: 7374,
    subject: "Paediatrics",
    stem: "The limitation of TST (tuberculin skin test) compared to IGRA (interferon-gamma release assay) in diagnosing TB infection in children is:",
    options: [
      "TST cannot be used in children under 5 years",
      "TST gives false-positive results in BCG-vaccinated children and false-negative results in malnutrition, immunocompromise, and disseminated TB",
      "TST requires a blood sample and is therefore less convenient",
      "IGRA has lower sensitivity than TST in children under 5 years",
    ],
    answer: 1,
    explanation:
      "TST (Mantoux test) limitations: (1) False positives in BCG-vaccinated children (BCG contains M. bovis antigens cross-reacting with PPD), making interpretation difficult in India where BCG is universal; (2) False negatives in malnutrition, immunocompromise (HIV, steroids), severe TB (miliary/disseminated), very early infection. Cut-off: ≥10 mm (no BCG or immunocompromised ≥5 mm) = positive. IGRA (QuantiFERON-TB Gold, T-SPOT.TB) advantages: not affected by BCG vaccination, single visit (blood test). IGRA limitations: expensive, not widely available in India, less validated in young children <5 years, cannot distinguish latent from active TB.",
  },
  {
    id: 7375,
    subject: "Paediatrics",
    stem: "Hepatitis A vaccine in the IAP 2023 immunisation schedule is given as:",
    options: [
      "Single dose at 12 months",
      "2 doses: first at 12 months, second at 18 months (6 months apart)",
      "3 doses at 0, 1, and 6 months starting at 12 months",
      "2 doses at 6 months and 12 months",
    ],
    answer: 1,
    explanation:
      "Hepatitis A vaccine in IAP 2023 schedule: 2 doses — first dose at 12 months, second dose at 18 months (6 months after first dose). Both doses are required for long-term immunity (>20 years protection). Inactivated Hepatitis A vaccines available in India: Havrix, Avaxim, Twinrix (combination HepA+HepB). Hepatitis A is transmitted faeco-orally and is endemic in India. In endemic areas, most children acquire natural immunity through exposure; vaccination is important in peri-urban/semi-urban populations with improving sanitation where natural exposure is decreasing.",
  },
  {
    id: 7376,
    subject: "Paediatrics",
    stem: "Delayed cord clamping (DCC) in neonatal resuscitation (NRP 2021) is recommended for how long and for which neonates?",
    options: [
      "Immediate clamping in all neonates to prevent polycythaemia",
      "1–3 minutes for term and preterm non-compromised neonates (not requiring immediate resuscitation)",
      "5 minutes or until cord stops pulsating for all neonates including those needing resuscitation",
      "Only for preterm neonates <34 weeks gestation",
    ],
    answer: 1,
    explanation:
      "NRP 2021 recommends delayed cord clamping (DCC) for 1–3 minutes (or until cord stops pulsating) in term and preterm neonates who do NOT require immediate resuscitation. Benefits: increased blood volume, improved iron stores, reduced IVH and necrotising enterocolitis (preterm), reduced anaemia. For neonates requiring resuscitation (not breathing, poor tone, HR <100), cord clamping should not delay initiation of resuscitation — umbilical cord milking is an alternative but still debated. Active management of third stage (oxytocin) is given after clamping. DCC reduces iron deficiency anaemia in term neonates.",
  },
  {
    id: 7377,
    subject: "Paediatrics",
    stem: "The Dawson chart for target SpO2 during neonatal resuscitation specifies the acceptable SpO2 range at 5 minutes after birth as:",
    options: [
      "60–65%",
      "80–85%",
      "90–95%",
      "95–100%",
    ],
    answer: 1,
    explanation:
      "Dawson chart target pre-ductal SpO2 (right hand/wrist) values during neonatal resuscitation: 1 min = 60–65%, 2 min = 65–70%, 3 min = 70–75%, 4 min = 75–80%, 5 min = 80–85%, 10 min = 85–95%. These reflect normal transitional physiology; healthy neonates take up to 10 minutes to reach >90% SpO2. Targeting SpO2 too high early (using excess oxygen) is harmful — causes oxidative stress and increases mortality especially in preterm. Initial resuscitation with room air (21%) for term; 21–30% for preterm. Increase FiO2 only if not meeting target SpO2.",
  },
  {
    id: 7378,
    subject: "Paediatrics",
    stem: "Pneumococcal conjugate vaccine (PCV13) in India's Universal Immunisation Programme is given at which schedule?",
    options: [
      "2 doses at 6 weeks and 14 weeks (2-dose primary series, no booster)",
      "3 doses: 6 weeks, 10 weeks, 14 weeks primary series + booster at 9–12 months (3+1 schedule) or 2+1 schedule",
      "Single dose at birth only in high-risk groups",
      "Annual vaccination similar to influenza vaccine",
    ],
    answer: 1,
    explanation:
      "PCV13 (Pneumococcal conjugate vaccine, Prevenar 13) covers 13 serotypes of Streptococcus pneumoniae. India's UIP has introduced PCV13 phased across states. IAP recommends: primary series at 6, 10, 14 weeks (3-dose series) + booster at 9–12 months (3+1 schedule); OR 2-dose primary (6 and 14 weeks) + booster at 9–12 months (2+1 schedule). PCV prevents pneumococcal pneumonia, meningitis, and otitis media. PCV23 (polysaccharide vaccine) is used for adults and immunocompromised patients >2 years. Pneumococcus is the most common cause of bacterial meningitis in children >1 month (after neonatal period).",
  },
  {
    id: 7379,
    subject: "Paediatrics",
    stem: "ABA therapy (Applied Behaviour Analysis) is the most evidence-based treatment for which paediatric developmental condition?",
    options: [
      "ADHD — reduces hyperactivity through behavioural reinforcement",
      "Autism Spectrum Disorder (ASD) — improves communication, social skills, and adaptive behaviour",
      "Intellectual disability — primarily used for IQ improvement",
      "Specific learning disability — main intervention for dyslexia",
    ],
    answer: 1,
    explanation:
      "Applied Behaviour Analysis (ABA) is the most evidence-based and widely recommended behavioural therapy for Autism Spectrum Disorder (ASD). ABA uses positive reinforcement to teach communication, social, self-care, and adaptive behaviours while reducing maladaptive behaviours. Intensive early ABA (25–40 hours/week starting before age 3) produces the best outcomes. Other ASD therapies: speech-language therapy (communication), occupational therapy (sensory integration, daily living skills), PECS (picture exchange communication system). SSRIs (fluoxetine) may be used for OCD-like repetitive behaviours; antipsychotics (risperidone, aripiprazole) for severe aggression/self-injurious behaviour. ADHD first-line: methylphenidate (stimulant).",
  },
  {
    id: 7380,
    subject: "Paediatrics",
    stem: "Weight-based dosing for paediatric TB treatment under NTEP 2022 uses which combination for the intensive phase (first 2 months)?",
    options: [
      "Isoniazid + Rifampicin (HR) only for 2 months",
      "Isoniazid + Rifampicin + Pyrazinamide + Ethambutol (HRZE) for 2 months intensive phase",
      "Streptomycin + Isoniazid + Rifampicin for 2 months",
      "Isoniazid + Rifampicin + Ethambutol (HRE) for 4 months",
    ],
    answer: 1,
    explanation:
      "NTEP 2022 paediatric TB treatment (weight-based dosing using fixed-dose combinations): Intensive phase (2 months): HRZE — Isoniazid (H) 10 mg/kg, Rifampicin (R) 15 mg/kg, Pyrazinamide (Z) 35 mg/kg, Ethambutol (E) 20 mg/kg. Continuation phase (4 months): HR — Isoniazid + Rifampicin. Total 6 months (2HRZE + 4HR). Paediatric FDC tablets are available in weight bands (4–7 kg, 8–11 kg, 12–15 kg, 16–24 kg). TB meningitis/CNS TB continuation phase is 10 months (2HRZE + 10HR). Pyridoxine supplementation given with isoniazid in malnourished children and PLHIV.",
  },
];
