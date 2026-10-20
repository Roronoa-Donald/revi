/**
 * tools/clean-content-scripts.js
 *
 * Remplace tout code Bash restant dans les templates server/content/
 * des cours non-informatiques (b1-droit, b1-anglais, b1-fr-pro, b1-bureautique, droit).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. b1-droit/pages.js
const b1DroitPath = path.join(ROOT, 'server', 'content', 'b1-droit', 'pages.js');
let b1Droit = fs.readFileSync(b1DroitPath, 'utf8');

// Remplacer l'atelier libre
b1Droit = b1Droit.replace(
  /'  <script type="text\/plain" data-lab-starter>#!\/bin\/bash'[\s\S]*?'<\/script>',/,
  `'  <script type="text/plain" data-lab-starter># Zone libre : appliquez la méthodologie juridique et rédigez vos grilles d\\'analyse.',\n      '#',\n      '[Cas 1 — Contrôle de constitutionnalité]',\n      '# Données :',\n      '# constitution',\n      '# loi',\n      'Loi : conforme au bloc de constitutionnalite',\n      '</script>',`
);

// Remplacer les corrigés dans exercices
b1Droit = b1Droit.replace(
  /item\('Échauffement', 'n1', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\),/,
  `item('Échauffement', 'n1', [
      'Qualifiez les énoncés en règle de droit (objectif) ou prérogative (subjectif), puis établissez le bilan.',
      'Rattachez chaque norme juridique à son bloc constitutionnel, conventionnel, légal ou réglementaire.',
      'Analysez la personnalité juridique selon la situation (titulaire ou éteinte).',
      'Identifiez le degré de juridiction compétent (TPI, Cour d’Appel, Cour Suprême).'
    ], [
      '# Grille d\\'analyse — Cas 1 (Qualification juridique)',
      'code civil : regle',
      'droit de propriete : prerogative',
      'bilan : 1 regles / 1 prerogatives',
      '',
      '# Grille d\\'analyse — Cas 2 (Hiérarchie des normes)',
      'Constitution : bloc de constitutionnalite',
      'Traité : bloc de conventionalite',
      'Loi : bloc de legalite',
      'Décret : bloc reglementaire',
      '',
      '# Grille d\\'analyse — Cas 3 (Personnalité juridique)',
      'naissance : titulaire',
      'vivant : titulaire',
      'deces : eteinte',
      '',
      '# Grille d\\'analyse — Cas 4 (Organisation judiciaire)',
      '1er degre : TPI',
      '2e degre : Cour d Appel',
      'cassation : Cour Supreme'
    ]),`
);

b1Droit = b1Droit.replace(
  /item\('Cas pratiques', 'n2', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\),/,
  `item('Cas pratiques', 'n2', [
      'Calculez des dates de vigueur avec le jour franc (parution + 1).',
      'Registre d\\'abrogations : qualifiez en maintenue / abrogee expresse / abrogee tacite / deja abrogee.',
      'Double degré de juridiction : vérifiez la recevabilité de l\\'appel.',
      'Validité des contrats : vérifiez les 4 conditions de validité (consentement, capacité, contenu licite et certain).'
    ], [
      '# Grille d\\'analyse — Cas pratiques',
      'Loi nouvelle : vigueur au jour 2',
      'Loi seconde : parution invalide',
      'bilan : 1/2 lois valides',
      '',
      'ordonnance : abrogee expresse',
      'circulaire : maintenue',
      '',
      'appel affaire_1 : recevable',
      'appel affaire_2 : irrecevable',
      '',
      'contrat_vente : valide',
      'contrat_bail : 1 condition manquante'
    ]),`
);

b1Droit = b1Droit.replace(
  /item\('Droit approfondi', 'n3', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\)/,
  `item('Droit approfondi', 'n3', [
      'Application de la loi dans le temps (non-rétroactivité et effet immédiat).',
      'Distinction absence (5 ans sans nouvelles) et disparition (danger de mort).',
      'Litige contractuel et réparation du dommage.',
      'Audit de conformité hiérarchique de la pyramide des normes.'
    ], [
      '# Grille d\\'analyse — Cas approfondis',
      'situation_A : loi ancienne',
      'situation_B : loi nouvelle',
      'nouvelles : 1/2',
      '',
      'personne_1 : absence (5 ans)',
      'personne_2 : disparition',
      '',
      'litige_A : dispense pour force majeure',
      'litige_B : dommages et interets',
      '',
      'norme_A : conforme',
      'norme_B : viole la hierarchie'
    ])`
);

b1Droit = b1Droit.replace(
  /'read -r n_normes'[\s\S]*?'echo "\$affaire : appel irrecevable"; fi ;;'/g,
  `'# Grille d\\'analyse — Projet intégrateur',\n    'pyramide : 4 normes conformes, 0 violation',\n    'greffe : 2 dossiers traites en TPI, 1 en Cour d\\'Appel'`
);

fs.writeFileSync(b1DroitPath, b1Droit, 'utf8');
console.log('✓ b1-droit/pages.js nettoyé');

// 2. b1-anglais/pages.js
const b1AnglaisPath = path.join(ROOT, 'server', 'content', 'b1-anglais', 'pages.js');
let b1Anglais = fs.readFileSync(b1AnglaisPath, 'utf8');

b1Anglais = b1Anglais.replace(
  /'  <script type="text\/plain" data-lab-starter>#!\/bin\/bash'[\s\S]*?'<\/script>',/,
  `'  <script type="text/plain" data-lab-starter># Zone libre : rédigez vos analyses en Business English.\\n[Cas 1 — Communication]\\nformal message : professional\\n</script>',`
);

b1Anglais = b1Anglais.replace(
  /item\('Échauffement', 'n1', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\),/,
  `item('Échauffement', 'n1', [
      'Triez les termes entre registre professionnel et registre familier.',
      'Distinguez les relations clientèle (client vs customer).',
      'Identifiez la prononciation du suffixe -ed (/t/, /d/, /ɪd/).',
      'Qualifiez l\\'intonation de la phrase (montante ou descendante).'
    ], [
      'invoice : professionnel',
      'gonna : familier',
      'bilan : 1 business / 1 casual',
      '',
      'fideles : 2',
      '',
      'worked : /t/',
      'played : /d/',
      'decided : /ɪd/',
      '',
      'phrase_1 : montante',
      'phrase_2 : descendante'
    ]),`
);

b1Anglais = b1Anglais.replace(
  /item\('Cas pratiques', 'n2', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\),/,
  `item('Cas pratiques', 'n2', [
      'Structure des correspondances d\\'affaires.',
      'Gestion des réclamations clients et délais.',
      'Détection des fautes d\\'accord et tournures inappropriées.',
      'Analyse du niveau d\\'anglais et communication managériale.'
    ], [
      'salutation : valide',
      'reclamation : traitee',
      'rapport : conforme',
      'score_global : professionnel'
    ]),`
);

b1Anglais = b1Anglais.replace(
  /item\('Anglais approfondi', 'n3', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\)/,
  `item('Anglais approfondi', 'n3', [
      'Négociation contractuelle internationale.',
      'Faux-amis et vocabulaire technique de pointe.',
      'Techniques de présentation orale et pitch.',
      'Rédaction de propositions commerciales (RFP).'
    ], [
      'clause_1 : accepted',
      'clause_2 : renegotiate',
      'pitch : impactful',
      'rfp : compliant'
    ])`
);

b1Anglais = b1Anglais.replace(
  /'read -r n_emails'[\s\S]*?'read -r mot registre'/g,
  `'# Grille d\\'analyse — Projet intégrateur Business English',\n    'audit : 12 courriels conformes, 0 litige'`
);

fs.writeFileSync(b1AnglaisPath, b1Anglais, 'utf8');
console.log('✓ b1-anglais/pages.js nettoyé');

// 3. b1-fr-pro/pages.js
const b1FrProPath = path.join(ROOT, 'server', 'content', 'b1-fr-pro', 'pages.js');
let b1FrPro = fs.readFileSync(b1FrProPath, 'utf8');

b1FrPro = b1FrPro.replace(
  /'  <script type="text\/plain" data-lab-starter>#!\/bin\/bash'[\s\S]*?'<\/script>',/,
  `'  <script type="text/plain" data-lab-starter># Zone libre : pratiquez la communication écrite professionnelle.\\n[Cas 1 — Rédaction]\\ncourrier : conforme aux standards\\n</script>',`
);

b1FrPro = b1FrPro.replace(
  /item\('Échauffement', 'n1', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\),/,
  `item('Échauffement', 'n1', [
      'Identifiez le canal de communication approprié selon la situation.',
      'Distinguez le registre soutenu du registre familier.',
      'Corrigez les confusions lexicales et barbarismes courants.',
      'Qualifiez les formules de politesse adaptées.'
    ], [
      'note_service : interne',
      'mot_courant : professionnel',
      'accord : correct',
      'formule : recommandee'
    ]),`
);

b1FrPro = b1FrPro.replace(
  /item\('Cas pratiques', 'n2', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\),/,
  `item('Cas pratiques', 'n2', [
      'Analyse syntaxique et accords du participe passé.',
      'Rédaction d\\'une lettre de mise en demeure formelle.',
      'Structuration logique d\\'un compte-rendu de réunion.',
      'Synthèse managériale et argumentation persuasive.'
    ], [
      'participe : accorde',
      'mise_en_demeure : conforme',
      'compte_rendu : valide',
      'argumentation : convaincante'
    ]),`
);

b1FrPro = b1FrPro.replace(
  /item\('Français professionnel approfondi', 'n3', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\)/,
  `item('Français professionnel approfondi', 'n3', [
      'Rhétorique et communication de crise.',
      'Rédaction d\\'un rapport technique d\\'audit.',
      'Élaboration d\\'une charte éditoriale d\\'entreprise.',
      'Communication interpersonnelle et négociation écrite.'
    ], [
      'comm_crise : maitrisee',
      'rapport_audit : rigoureux',
      'charte : adoptee',
      'negociation : aboutie'
    ])`
);

b1FrPro = b1FrPro.replace(
  /'read -r n_courriers'[\s\S]*?'read -r mot type'/g,
  `'# Grille d\\'analyse — Projet intégrateur Français Professionnel',\n    'dossier : 8 courriers corriges, charte respectee'`
);

fs.writeFileSync(b1FrProPath, b1FrPro, 'utf8');
console.log('✓ b1-fr-pro/pages.js nettoyé');

// 4. b1-bureautique/pages.js
const b1BuroPath = path.join(ROOT, 'server', 'content', 'b1-bureautique', 'pages.js');
let b1Buro = fs.readFileSync(b1BuroPath, 'utf8');

b1Buro = b1Buro.replace(
  /'  <script type="text\/plain" data-lab-starter>#!\/bin\/bash'[\s\S]*?'<\/script>',/,
  `'  <script type="text/plain" data-lab-starter># Zone libre : pratiquez les fonctions bureautiques et tableurs.\\n[Cas 1 — Formule tableur]\\n=RECHERCHEV(A2, B:D, 3, FAUX)\\n</script>',`
);

b1Buro = b1Buro.replace(
  /item\('Échauffement', 'n1', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\),/,
  `item('Échauffement', 'n1', [
      'Associez chaque groupe d\\'outils à son onglet correspondant dans le ruban.',
      'Vérifiez la mise en forme des paragraphes et retraits sous traitement de texte.',
      'Identifiez les types de données dans un tableur (texte, nombre, formule).',
      'Sélectionnez le mode d\\'affichage adapté au document.'
    ], [
      'police : Accueil',
      'alignement : Mise en page',
      'valeur : Nombre',
      'mode : Page'
    ]),`
);

b1Buro = b1Buro.replace(
  /item\('Cas pratiques', 'n2', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\),/,
  `item('Cas pratiques', 'n2', [
      'Formules conditionnelles SI, ET, OU sous tableur.',
      'Calculs statistiques élémentaires (MOYENNE, SOMME, NB.SI).',
      'Mise en page d\\'un document long avec styles et table des matières.',
      'Préparation d\\'une présentation percutante avec masques de diapositives.'
    ], [
      'formule_si : conforme',
      'statistiques : exactes',
      'styles : homogenes',
      'diaporama : calibre'
    ]),`
);

b1Buro = b1Buro.replace(
  /item\('Bureautique approfondie', 'n3', \[[\s\S]*?\], \[[\s\S]*?read -r[\s\S]*?\]\)/,
  `item('Bureautique approfondie', 'n3', [
      'Tableaux croisés dynamiques et analyse multidimensionnelle.',
      'Fonctions de recherche avancées (INDEX, EQUIV, XLOOKUP).',
      'Publipostage complexe avec filtres conditionnels.',
      'Automatisation de processus bureautiques.'
    ], [
      'tcd : structure',
      'recherche : resolue',
      'publipostage : reussi',
      'automatisation : operationnelle'
    ])`
);

b1Buro = b1Buro.replace(
  /'read -r n_docs'[\s\S]*?'read -r vendeur ca'/g,
  `'# Grille d\\'analyse — Projet intégrateur Bureautique',\n    'classeur : 12 feuilles formulees, TCD operationnel'`
);

fs.writeFileSync(b1BuroPath, b1Buro, 'utf8');
console.log('✓ b1-bureautique/pages.js nettoyé');

// 5. droit/pages/examens-exercices.js
const droitExPath = path.join(ROOT, 'server', 'content', 'droit', 'pages', 'examens-exercices.js');
let droitEx = fs.readFileSync(droitExPath, 'utf8');

droitEx = droitEx
  .replace(/read -r n/g, '# Lecture du cas')
  .replace(/read -r [a-z_ ]+/g, '# Analyse des critères')
  .replace(/for \(\(k=0; k&lt;n; k\+\+\)\); do/g, '# Application de la règle juridique')
  .replace(/done/g, '# Fin de qualification')
  .replace(/echo "[^"]*"/g, '# Constat juridique formulé');

fs.writeFileSync(droitExPath, droitEx, 'utf8');
console.log('✓ droit/pages/examens-exercices.js nettoyé');
