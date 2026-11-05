'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DELIV_DIR = path.resolve(ROOT_DIR, 'FINALISATION_REMEDIATION');

console.log('================================================================================');
console.log('BANC DE VERIFICATION AUTOMATISE DE LA FINALISATION ET CERTIFICATION TECHNIQUE');
console.log('Projet : revi-cours-html | Branche : remediation-pedagogique-qualite');
console.log('================================================================================\n');

let totalChecks = 0;
let passedChecks = 0;
let errors = [];

function check(title, condition, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`[SUCCES] Check ${totalChecks} : ${title}`);
    if (details) console.log(`         -> ${details}`);
  } else {
    errors.push({ id: totalChecks, title, details });
    console.error(`[ECHEC]  Check ${totalChecks} : ${title}`);
    if (details) console.error(`         -> ERREUR : ${details}`);
  }
}

// ----------------------------------------------------------------------------
// 1. VERIFICATION DE LA PRESENCE DES LIVRABLES OBLIGATOIRES
// ----------------------------------------------------------------------------
const requiredFiles = [
  '00_ETAT_DE_REPRISE.md',
  '01_REGISTRE_ANOMALIES_VERIFIEES.csv',
  '02_REGISTRE_EXERCICES_FINAL.csv',
  '03_REGISTRE_QCM_FINAL.json',
  '04_SECURITE_QCM_FINAL.md',
  '05_RUNNER_FINAL.md',
  '06_814_EXERCICES.md',
  '07_SUSPENSIONS_FINAL.md',
  '08_184_QCM_FINAL.md',
  '09_QUALITE_PEDAGOGIQUE_FINAL.md',
  '10_ACCESSIBILITE_FEEDBACK.md',
  '11_POSTGRES_FINAL.md',
  '12_TESTS_FINALS.md',
  '13_ANOMALIES_RESTANTES.md',
  '14_GUIDE_MAINTENANCE.md',
  '15_BILAN_FINAL.md'
];

for (const file of requiredFiles) {
  const filePath = path.join(DELIV_DIR, file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  check(`Livrable ${file}`, exists && size > 100, `Taille : ${size} octets`);
}

// ----------------------------------------------------------------------------
// 2. VERIFICATION DU REPERTOIRE DE PREUVES BRUTES
// ----------------------------------------------------------------------------
const preuvesDir = path.join(DELIV_DIR, 'PREUVES');
const preuvesExists = fs.existsSync(preuvesDir) && fs.statSync(preuvesDir).isDirectory();
check('Dossier PREUVES/ présent', preuvesExists, preuvesExists ? `${fs.readdirSync(preuvesDir).length} fichiers de logs trouvés` : 'Dossier manquant');

// ----------------------------------------------------------------------------
// 3. VERIFICATION DU REGISTRE DES ANOMALIES AUDITEES (01_REGISTRE_ANOMALIES_VERIFIEES.csv)
// ----------------------------------------------------------------------------
const anomCsvPath = path.join(DELIV_DIR, '01_REGISTRE_ANOMALIES_VERIFIEES.csv');
let anomLines = [];
if (fs.existsSync(anomCsvPath)) {
  const content = fs.readFileSync(anomCsvPath, 'utf8');
  anomLines = content.trim().split('\n');
}
check('Registre des anomalies auditées (01_REGISTRE_ANOMALIES_VERIFIEES.csv)', anomLines.length >= 10, `${anomLines.length - 1} anomalies auditées et documentées`);

// ----------------------------------------------------------------------------
// 4. VERIFICATION DU REGISTRE DES EXERCICES (1 250 exercices)
// ----------------------------------------------------------------------------
const exCsvPath = path.join(DELIV_DIR, '02_REGISTRE_EXERCICES_FINAL.csv');
let exRecords = [];
if (fs.existsSync(exCsvPath)) {
  const content = fs.readFileSync(exCsvPath, 'utf8');
  const lines = content.trim().split('\n');
  const header = lines[0];
  check('En-tête CSV exercices découplé', 
    header.includes('Qualite_Pedagogique') && 
    header.includes('Fiabilite_Technique') && 
    header.includes('Eligibilite_Notation') && 
    header.includes('Statut_Operationnel'),
    'Colonnes Qualite_Pedagogique, Fiabilite_Technique, Eligibilite_Notation, Statut_Operationnel conformes'
  );

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(';');
    exRecords.push({
      id: parts[0],
      cours: parts[1],
      qualite_pedagogique: parts[7],
      fiabilite_technique: parts[8],
      eligibilite_notation: parts[9],
      statut_operationnel: parts[10],
      type_suspension: parts[11]
    });
  }
}

const uniqueExIds = new Set(exRecords.map(r => r.id));
check('Volume total d exercices (1 250)', exRecords.length === 1250, `Trouvé : ${exRecords.length}`);
check('Unicité des identifiants exercices (1 250 uniques)', uniqueExIds.size === 1250, `Uniques : ${uniqueExIds.size}`);

const countSuspended = exRecords.filter(r => r.eligibilite_notation === 'NOTATION_SUSPENDUE').length;
const countActive = exRecords.filter(r => r.eligibilite_notation === 'NOTATION_AUTORISEE').length;
check('Nombre exact d exercices suspendus (354)', countSuspended === 354, `Trouvé : ${countSuspended}`);
check('Nombre exact d exercices actifs (896)', countActive === 896, `Trouvé : ${countActive}`);

const countCourseSusp = exRecords.filter(r => r.type_suspension === 'COURS_GLOBAL').length;
const countAlgoSusp = exRecords.filter(r => r.type_suspension === 'METHODE_SPECIFIQUE').length;
const countEvidenceSusp = exRecords.filter(r => r.type_suspension === 'PREUVE_MANQUANTE').length;
check('Réconciliation des 354 suspensions (126 + 1 + 227)', 
  countCourseSusp === 126 && countAlgoSusp === 1 && countEvidenceSusp === 227,
  `Cours : ${countCourseSusp} (126), Algo c9-e2 : ${countAlgoSusp} (1), Preuves : ${countEvidenceSusp} (227)`
);

// ----------------------------------------------------------------------------
// 5. VERIFICATION DU REGISTRE QCM COMPLET (3 089 items avec options)
// ----------------------------------------------------------------------------
const qcmJsonPath = path.join(DELIV_DIR, '03_REGISTRE_QCM_FINAL.json');
let qcmData = { items: [] };
if (fs.existsSync(qcmJsonPath)) {
  try {
    qcmData = JSON.parse(fs.readFileSync(qcmJsonPath, 'utf8'));
  } catch (e) {
    check('Validité JSON 03_REGISTRE_QCM_FINAL.json', false, e.message);
  }
}

const qcmItems = qcmData.items || [];
const uniqueQcmIds = new Set(qcmItems.map(i => i.id_qcm));
check('Volume total d items QCM (3 089)', qcmItems.length === 3089, `Trouvé : ${qcmItems.length}`);
check('Unicité des identifiants QCM (3 089 uniques)', uniqueQcmIds.size === 3089, `Uniques : ${uniqueQcmIds.size}`);

const chapterCount = qcmItems.filter(i => i.type_support === 'CHAPITRE').length;
const examCount = qcmItems.filter(i => i.type_support === 'EXAMEN_MASTERY').length;
check('Répartition QCM chapitres (2 829) et examens (260)', 
  chapterCount === 2829 && examCount === 260,
  `Chapitres : ${chapterCount} (2829 attendus), Examens : ${examCount} (260 attendus)`
);

let optsValidCount = 0;
let answersValidCount = 0;
let expValidCount = 0;
for (const item of qcmItems) {
  if (Array.isArray(item.options) && item.options.length >= 2) optsValidCount++;
  if (typeof item.reponse_correcte === 'number' && item.reponse_correcte >= 0 && item.reponse_correcte < (item.options ? item.options.length : 0)) {
    answersValidCount++;
  }
  if (item.explication && item.explication.length > 5) expValidCount++;
}
check('Complétude des tableaux d options QCM (100%)', optsValidCount === 3089, `${optsValidCount} / 3089 conformes`);
check('Validité des clés de réponse correcte (100%)', answersValidCount === 3089, `${answersValidCount} / 3089 conformes`);
check('Présence des explications pédagogiques (100%)', expValidCount === 3089, `${expValidCount} / 3089 conformes`);

const flaggedQcm = qcmItems.filter(i => i.audit_flag === true);
check('Volume exact d items QCM signalés (184)', flaggedQcm.length === 184, `Trouvé : ${flaggedQcm.length}`);

const countNeg = flaggedQcm.filter(i => i.flag_category_audit2 === 'FORMULATION_NEGATIVE').length;
const countAllNone = flaggedQcm.filter(i => i.flag_category_audit2 === 'OPTION_TOUTES_AUCUNE').length;
const countPoorDist = flaggedQcm.filter(i => i.flag_category_audit2 === 'DISTRACTEURS_PAUVRES').length;
const countLength = flaggedQcm.filter(i => i.flag_category_audit2 === 'ASYMETRIE_LONGUEUR').length;
check('Ventilation psychométrique des 184 QCM (78 + 46 + 32 + 28)',
  countNeg === 78 && countAllNone === 46 && countPoorDist === 32 && countLength === 28,
  `Négatif : ${countNeg} (78), Toutes/Aucune : ${countAllNone} (46), Distracteurs pauvres : ${countPoorDist} (32), Asymétrie : ${countLength} (28)`
);

// ----------------------------------------------------------------------------
// 6. REGLE ABSOLUE : ZERO EMOJI DANS FINALISATION_REMEDIATION/
// ----------------------------------------------------------------------------
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
let emojiCount = 0;
let emojiFiles = [];

function scanForEmojis(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        scanForEmojis(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.csv') || entry.name.endsWith('.json') || entry.name.endsWith('.txt'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (emojiRegex.test(content)) {
        emojiCount++;
        emojiFiles.push(path.relative(ROOT_DIR, fullPath));
      }
    }
  }
}

scanForEmojis(DELIV_DIR);
check('Règle absolue : Zéro émoji dans FINALISATION_REMEDIATION/', emojiCount === 0, emojiCount === 0 ? 'Conforme : 0 émoji détecté' : `Non conforme : ${emojiCount} fichiers avec émojis : ${emojiFiles.join(', ')}`);

// ----------------------------------------------------------------------------
// BILAN ET SORTIE
// ----------------------------------------------------------------------------
console.log('\n================================================================================');
console.log(`RESULTAT FINAL : ${passedChecks} / ${totalChecks} vérifications réussies`);
console.log('================================================================================');

if (errors.length > 0) {
  console.error(`\n${errors.length} anomalie(s) détectée(s) :`);
  for (const err of errors) {
    console.error(` - Check ${err.id} [${err.title}] : ${err.details}`);
  }
  process.exit(1);
} else {
  console.log('\nToutes les métriques et fichiers de finalisation sont strictement validés.');
  process.exit(0);
}
