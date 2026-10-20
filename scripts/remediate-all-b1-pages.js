'use strict';

const fs = require('fs');
const path = require('path');

console.log('=== Remédiation pédagogique canonique des 15 cours B1 non-informatiques ===');

// Helper pour remplacer exercices(course) dans un fichier pages.js
function replaceExercices(filePath, newFunctionCode) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Nettoyer les mentions de Bash ou Python dans l'ensemble du fichier
  content = content.replace(/Les programmes sont en Bash, comme aux ateliers\./g, 'Chaque exercice propose une étude de cas et une résolution méthodologique détaillée.');
  content = content.replace(/Les scripts sont en Bash, comme à l'atelier\./g, 'Chaque exercice propose une étude de cas et une résolution méthodologique détaillée.');
  content = content.replace(/Les programmes sont en Python, comme aux ateliers\./g, 'Chaque exercice propose une étude de cas et une résolution méthodologique détaillée.');
  content = content.replace(/trois exercices de code en Bash/g, 'trois études de cas méthodologiques');
  content = content.replace(/trois exercices de code en Python/g, 'trois études de cas méthodologiques');
  content = content.replace(/trois exercices en Bash/g, 'trois études de cas méthodologiques');
  content = content.replace(/trois exercices en Python/g, 'trois études de cas méthodologiques');
  content = content.replace(/exercices Bash exécutables/g, 'études de cas d’application');
  content = content.replace(/exercices Python exécutables/g, 'études de cas d’application');
  content = content.replace(/exercices Bash corrigés/g, 'études de cas corrigées');
  content = content.replace(/exercices Python corrigés/g, 'études de cas corrigées');
  content = content.replace(/calculatrice vérifiable/g, 'démarche méthodologique');
  content = content.replace(/Atelier de calcul — écrire du Python/g, 'Atelier d’analyse');
  content = content.replace(/Écrire et exécuter du Python directement dans la page\./g, 'Étudier et valider ses démarches directement dans la page.');

  // Remplacement de function exercices(course) { ... }
  const regex = /function exercices\(course\) \{[\s\S]*?return \{\s*'exercices\/exercices\.html': \{[\s\S]*?\}\s*\};\s*\}/;
  if (!regex.test(content)) {
    console.error(`[err] Impossible de trouver exercices(course) dans ${filePath}`);
    return false;
  }

  content = content.replace(regex, newFunctionCode);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[ok] ${filePath} : exercices() réécrit de manière canonique`);
  return true;
}

// 1. b1-droit
replaceExercices('server/content/b1-droit/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; analyses juridiques détaillées</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de synthèse juridique sur les contrats informatiques et la conformité des données.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Distinguer une règle de droit objectif d’une prérogative individuelle (droit subjectif).',
      'Classer les normes selon la pyramide de Kelsen : bloc de constitutionnalité, conventionalité, légalité et réglementaire.',
      'Identifier les conditions d’acquisition et d’extinction de la personnalité juridique d’une personne physique.',
      'Distinguer les juridictions du premier degré, du second degré et la Cour de cassation.'
    ], [
      '<p><strong>1. Droit objectif / subjectif :</strong> Le droit objectif désigne l’ensemble des règles générales et obligatoires régissant la vie en société ; le droit subjectif est le pouvoir individuel reconnu à une personne sur une chose ou envers autrui.</p>',
      '<p><strong>2. Pyramide des normes :</strong> Constitution (sommet), Traités internationaux ratifiés, Lois votées par le Parlement, Règlements (décrets et arrêtés du pouvoir exécutif).</p>',
      '<p><strong>3. Personnalité juridique :</strong> Naissance d’un enfant vivant et viable (début) ; décès médicalement certifié (fin).</p>',
      '<p><strong>4. Ordre juridictionnel :</strong> 1er degré (jugement des faits et du droit), 2nd degré (Cour d’appel - réformation éventuelle), Cour de cassation (juge de la conformité du droit uniquement).</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Analyser les quatre conditions de validité d’un contrat (consentement, capacité, contenu licite et certain).',
      'Distinguer la responsabilité contractuelle de la responsabilité délictuelle / extracontractuelle.',
      'Identifier les trois éléments cumulatifs de la responsabilité civile (faute, dommage certain, lien de causalité direct).',
      'Qualifier les droits patrimoniaux et moraux d’un auteur sur un logiciel développé en entreprise.'
    ], [
      '<p><strong>1. Validité du contrat :</strong> Consentement non vicié (erreur, dol, violence), capacité juridique des parties, objet licite et déterminé/déterminable.</p>',
      '<p><strong>2. Nature de la responsabilité :</strong> Contractuelle si inexécution d’une obligation stipulée au contrat ; extracontractuelle en l’absence de lien contractuel ou en cas de préjudice tiers.</p>',
      '<p><strong>3. Éléments constitutifs :</strong> Faute (ou fait générateur), Préjudice réel, direct et certain, Lien de causalité démontré entre le fait et le dommage.</p>',
      '<p><strong>4. Propriété intellectuelle :</strong> Les droits patrimoniaux sur les logiciels créés par un salarié dans l’exercice de ses fonctions sont dévolus automatiquement à l’employeur (art. L. 113-9 CPI), le droit moral restant inaliénable.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Rédiger un syllogisme juridique complet appliqué à une rupture unilatérale de prestation d’hébergement web.',
      'Déterminer les obligations du responsable de traitement au sens du RGPD (licéité, proportionnalité, notification de violation).',
      'Résoudre un litige de concurrence déloyale par débauchage illicite de développeurs.',
      'Évaluer la validité d’une clause limitative de responsabilité dans un contrat de service cloud.'
    ], [
      '<p><strong>1. Syllogisme :</strong> Majeure (l’art. 1217 du Code civil énonce les sanctions de l’inexécution), Mineure (l’hébergeur a suspendu le service sans préavis ni manquement avéré), Conclusion (l’hébergeur doit réparer le préjudice d’exploitation subi).</p>',
      '<p><strong>2. RGPD :</strong> Registre des traitements, recueil de consentement explicite, respect des droits des personnes et notification de fuite à la CNIL sous 72 heures.</p>',
      '<p><strong>3. Concurrence déloyale :</strong> La liberté du travail permet le changement d’employeur, sauf manœuvres déloyales caractérisées (détournement de clientèle, pillage de savoir-faire confidentiel ou violation de clause de non-concurrence valide).</p>',
      '<p><strong>4. Clause limitative :</strong> Valable entre professionnels, sauf faute lourde, dol ou si elle vide de sa substance l’obligation essentielle du prestataire (jurisprudence Chronopost / Faurecia).</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Audit Juridique &amp; Conformité Numérique</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’étude juridique approfondie consiste à analyser les risques contractuels, la politique de protection des données (RGPD) et la protection de la propriété intellectuelle d’une entreprise éditrice de solutions SaaS.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences juridiques évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Analyse contractuelle :</strong> Identification des obligations de moyens vs de résultat et qualification des SLA.</li>',
      '      <li><strong>Conformité RGPD :</strong> Cartographie des flux de données et clauses de sous-traitance (art. 28 RGPD).</li>',
      '      <li><strong>Propriété intellectuelle :</strong> Cession de droits, licences open-source et protection des bases de données.</li>',
      '      <li><strong>Responsabilité &amp; litiges :</strong> Prévention du contentieux et mécanismes de médiation.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de droit du numérique B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de synthèse juridique du cours de droit B1 : contrats, responsabilité et conformité numérique.',
      active: 'exercices',
      body
    }
  };
}`);

// 2. b1-anglais
replaceExercices('server/content/b1-anglais/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; explications linguistiques</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de communication professionnelle en anglais technique.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Distinguer le registre de langue formel (business English) du registre familier (casual).',
      'Distinguer l’usage de « customer » (acheteur de biens) et « client » (bénéficiaire de services professionnels).',
      'Classifier la prononciation du suffixe régulier « -ed » au prétérit : /t/, /d/ ou /ɪd/.',
      'Identifier l’intonation montante (Yes/No questions) ou descendante (Wh- questions &amp; déclarations).'
    ], [
      '<p><strong>1. Register :</strong> "I am writing to inquire..." (business) vs "Just wanted to ask..." (casual) ; "require" vs "need".</p>',
      '<p><strong>2. Customer vs Client :</strong> A retail store has customers ; a consulting firm or software agency advises clients.</p>',
      '<p><strong>3. -ed Pronunciation :</strong> /t/ after unvoiced sounds (stopped, worked) ; /d/ after voiced sounds (configured, planned) ; /ɪd/ after /t/ or /d/ (tested, updated).</p>',
      '<p><strong>4. Intonation :</strong> Rising tone for closed questions ("Have you reviewed the PR?"); falling tone for open questions ("What is the root cause?").</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Rédiger un e-mail professionnel poli pour signaler un retard de livraison de sprint avec proposition d’ajustement.',
      'Employer les modaux appropriés (could, would, might) pour formuler des demandes professionnelles diplomates.',
      'Distinguer l’emploi du Present Perfect (lien avec le présent) et du Past Simple (événement révolu et daté).',
      'Synthétiser les décisions clés d’un compte rendu de réunion technique (Minutes of Meeting).'
    ], [
      '<p><strong>1. Professional email :</strong> "Dear Team, Due to unforeseen technical constraints during integration, delivery will be shifted by 24 hours. We propose..."</p>',
      '<p><strong>2. Diplomatic modals :</strong> "Could you please clarify the expected latency requirements?" is more polite and professional than "You must tell us the latency."</p>',
      '<p><strong>3. Tenses :</strong> "We deployed the patch yesterday" (Past Simple, specific past time) vs "We have resolved the incident" (Present Perfect, current relevance).</p>',
      '<p><strong>4. Meeting minutes :</strong> Focus on Action Items: Owner, Due Date, and measurable Deliverable.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Rédiger une documentation technique claire d’une API REST (endpoints, paramètres, réponses et codes HTTP).',
      'Structurer une argumentation technique persuasive pour recommander une migration cloud lors d’un comité d’architecture.',
      'Gérer avec professionnalisme et fermeté une réclamation client consécutive à une interruption de service (post-mortem).',
      'Négocier un compromis technique lors d’une revue de conception logicielle contradictoire.'
    ], [
      '<p><strong>1. Technical documentation :</strong> Objective, imperative style, structured request/response payload examples, and explicit status code tables.</p>',
      '<p><strong>2. Architectural persuasion :</strong> Problem statement &rarr; Evaluated options &rarr; Data-driven recommendation &rarr; Risk mitigation plan.</p>',
      '<p><strong>3. Incident post-mortem :</strong> Timeline of events, immediate corrective action, root-cause analysis (5 Whys), and preventative commitments.</p>',
      '<p><strong>4. Collaborative negotiation :</strong> Acknowledge counterpart concerns ("While I understand your performance priority, maintainability remains crucial...").</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Technical Communication &amp; Specification Brief</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier complet de communication technique en langue anglaise consiste à formaliser la proposition d’architecture, la note de synthèse exécutive et le manuel utilisateur d’une plateforme cloud internationale.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences linguistiques évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Précision terminologique :</strong> Maîtrise du vocabulaire d’ingénierie logicielle et d’infrastructure.</li>',
      '      <li><strong>Clarté rédactionnelle :</strong> Concision, structure logique et conformité au style technique international.</li>',
      '      <li><strong>Diplomatie &amp; persuasion :</strong> Formulation adaptée aux décideurs non-techniques et aux équipes d’ingénierie.</li>',
      '      <li><strong>Gestion documentaire :</strong> Glossaire, changelog et conventions de nommage standards.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel d’anglais technique B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de communication technique en anglais B1 : vocabulaire professionnel, e-mails et documentation.',
      active: 'exercices',
      body
    }
  };
}`);

// 3. b1-fr-pro
replaceExercices('server/content/b1-fr-pro/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; analyses rédactionnelles</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de communication écrite et de synthèse professionnelle.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Repérer et corriger les fautes d’accord du participe passé avec l’auxiliaire avoir et les verbes pronominaux.',
      'Éliminer les pléonasmes fréquents en milieu professionnel (« monter en haut », « prévoir à l’avance », « voire même »).',
      'Différencier les homophones grammaticaux courants (leur/leurs, c’est/s’est, quel/quelle/qu’elle).',
      'Formuler une formule de politesse adaptée au destinataire et au canal de communication.'
    ], [
      '<p><strong>1. Accords :</strong> Les données que nous avons <em>traitées</em> (COD placé avant) ; ils se sont <em>téléphoné</em> (téléphoner à qqn, pas de COD).</p>',
      '<p><strong>2. Pléonasmes :</strong> Remplacer par « monter », « prévoir », « voire » ou « même » seuls.</p>',
      '<p><strong>3. Homophones :</strong> « Leurs » (déterminant pluriel devant nom) vs « leur » (pronom invariable devant verbe).</p>',
      '<p><strong>4. Formules de politesse :</strong> « Veuillez agréer, Madame, Monsieur, l’expression de mes salutations distinguées » (courrier officiel) ; « Bien cordialement » (e-mail quotidien).</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Rédiger une note de cadrage synthétique de deux pages selon la méthode QQOQCP.',
      'Structurer un argumentaire professionnel selon la règle SPRI (Situation, Problème, Résolution, Informations complémentaires).',
      'Transformer un texte jargonnant en communication accessible pour des décideurs non-techniques.',
      'Rédiger un compte rendu de réunion opérationnelle orienté plan d’action et responsabilités.'
    ], [
      '<p><strong>1. Méthode QQOQCP :</strong> Qui (acteurs), Quoi (projet), Où (périmètre), Quand (calendrier), Comment (moyens), Pourquoi (objectifs &amp; ROI).</p>',
      '<p><strong>2. Structure SPRI :</strong> Poser d’abord le contexte indiscutable, isoler le point de blocage, détailler la solution retenue et préciser les modalités pratiques.</p>',
      '<p><strong>3. Clarté :</strong> Remplacer les acronymes opaques par des définitions fonctionnelles et expliciter les impacts métier plutôt que le fonctionnement interne.</p>',
      '<p><strong>4. Compte rendu :</strong> Tableau synthétique des décisions : Action, Porteur désigné, Échéance ferme, Statut d’avancement.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Rédiger une note d’opportunité pour convaincre une direction générale d’investir dans un plan de refonte applicative.',
      'Gérer un courrier de réclamation client avec empathie, professionnalisme et respect des engagements légaux.',
      'Concevoir une communication de crise suite à une indisponibilité majeure de service en production.',
      'Élaborer la charte éditoriale et les consignes de style d’une équipe de développement logiciel.'
    ], [
      '<p><strong>1. Note d’opportunité :</strong> Chiffrer le coût de l’inaction (dette technique, pannes, perte de productivité) face aux bénéfices mesurables de la modernisation.</p>',
      '<p><strong>2. Réclamation :</strong> Accuser réception rapidement, valider la légitimité du ressenti, exposer les mesures correctives immédiates et proposer une compensation proportionnée.</p>',
      '<p><strong>3. Communication de crise :</strong> Transparence sur les faits constatés, absence de spéculation prématurée, engagement ferme de résolution et fréquence des points de situation.</p>',
      '<p><strong>4. Charte éditoriale :</strong> Règles typographiques (majuscules, tirets, ponctuation), ton de voix, conventions d’intitulés et structure des messages de commit / pull request.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Dossier de Communication &amp; Note de Cadrage</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier professionnel d’envergure consiste à produire la documentation managériale d’un projet informatique : note de cadrage, note d’arbitrage technique, plan de communication interne et rapport de clôture.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences rédactionnelles évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Précision stylistique :</strong> Vocabulaire soutenu, syntaxe irréprochable et suppression de toute ambiguïté.</li>',
      '      <li><strong>Puissance de synthèse :</strong> Hiérarchisation de l’information essentielle en tête de paragraphe (méthode de la pyramide inversée).</li>',
      '      <li><strong>Efficacité persuasive :</strong> Force des arguments, valorisation des métriques et clarté des propositions.</li>',
      '      <li><strong>Mise en page professionnelle :</strong> Titraille normalisée, tableaux soignés et présentation soignée.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de français professionnel B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de communication professionnelle en français B1 : rédaction, synthèse et argumentaire.',
      active: 'exercices',
      body
    }
  };
}`);

// 4. b1-bureautique
replaceExercices('server/content/b1-bureautique/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; formules bureautiques</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de modélisation financière et d’automatisation sous tableur.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Distinguer les références relatives (A1), absolues ($A$1) et mixtes ($A1 ou A$1) lors du recopiage de formule.',
      'Utiliser les fonctions arithmétiques de base (SOMME, MOYENNE, MIN, MAX, NB, NBVAL).',
      'Appliquer une règle de mise en forme conditionnelle pour surligner les valeurs supérieures à un seuil.',
      'Paramétrer les styles de paragraphe, tables des matières automatiques et sauts de section sous traitement de texte.'
    ], [
      '<p><strong>1. Références :</strong> $A$1 fige colonne et ligne au déplacement ; $A1 fige la colonne seule ; A$1 fige la ligne seule.</p>',
      '<p><strong>2. Fonctions de base :</strong> =SOMME(A1:A10) totalise la plage ; =NBVAL compte les cellules non vides.</p>',
      '<p><strong>3. Mise en forme conditionnelle :</strong> Sélection de la plage &rarr; Règle "Valeur > seuil" &rarr; Format personnalisé de remplissage.</p>',
      '<p><strong>4. Traitement de texte :</strong> Les styles Titre 1, Titre 2 génèrent automatiquement la table des matières dynamique.</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Construire des formules conditionnelles imbriquées avec SI, ET, OU.',
      'Rechercher des correspondances exactes dans des tables de référence avec RECHERCHEV ou le couple INDEX / EQUIV.',
      'Concevoir un tableau croisé dynamique (TCD) avec champs de lignes, colonnes, filtres et valeurs calculées.',
      'Créer des graphiques de comparaison adaptés (histogrammes, secteurs, courbes de tendance temporelles).'
    ], [
      '<p><strong>1. Formule conditionnelle :</strong> =SI(ET(A2>=10; B2="Validé"); "Admis"; "Ajourné").</p>',
      '<p><strong>2. Recherche exacte :</strong> =RECHERCHEV(cle; table_ref; 3; FAUX) ou =INDEX(plage_retour; EQUIV(cle; plage_recherche; 0)).</p>',
      '<p><strong>3. Tableau croisé dynamique :</strong> Glisser les catégories en Lignes, les périodes en Colonnes et la somme des montants en Valeurs.</p>',
      '<p><strong>4. Choix graphique :</strong> Histogramme pour comparer des catégories discrètes ; courbe pour illustrer une évolution continue.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Concevoir un tableau de bord de gestion automatisé avec segments interactifs et indicateurs de performance (KPI).',
      'Mettre en place une validation des données stricte pour interdire les saisies incohérentes dans une grille partagée.',
      'Sécuriser un classeur : verrouillage de cellules de formules, protection de feuille par mot de passe et masquer les données sensibles.',
      'Automatiser des traitements répétitifs par création de macros enregistrées ou formulaires de saisie.'
    ], [
      '<p><strong>1. Dashboard KPI :</strong> Cartes de scores reliées à des formules SOMME.SI.ENS, jauges de progression et segments dynamiques.</p>',
      '<p><strong>2. Validation des données :</strong> Données &rarr; Validation des données &rarr; Liste déroulante ou Nombre entier compris entre min et max.</p>',
      '<p><strong>3. Protection :</strong> Déverrouiller uniquement les cellules de saisie, verrouiller les formules, puis Activer la protection de la feuille.</p>',
      '<p><strong>4. Automatisation :</strong> L’enregistreur de macros génère le code d’automatisation pour standardiser les imports mensuels.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Modélisation Budgétaire &amp; Tableau de Bord</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’application bureautique consiste à concevoir l’outil de pilotage budgétaire d’une direction des systèmes d’information : prévisions d’achats matériels, suivi des licences logicielles, calcul d’amortissements et reporting de synthèse.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences bureautiques évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Modélisation avancée :</strong> Utilisation des fonctions matricielles et recherche multicritères.</li>',
      '      <li><strong>Contrôle de cohérence :</strong> Validation des saisies, alertes automatiques et gestion des erreurs (#N/A, #DIV/0!).</li>',
      '      <li><strong>Restitution décisionnelle :</strong> Qualité visuelle du tableau de bord exécutif et clarté de lecture.</li>',
      '      <li><strong>Fiabilité &amp; pérennité :</strong> Séparation nette entre données brutes, calculs intermédiaires et restitutions.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de bureautique avancée B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de modélisation sous tableur B1 : formules avancées, TCD et tableaux de bord.',
      active: 'exercices',
      body
    }
  };
}`);

// 5. b1-architecture
replaceExercices('server/content/b1-architecture/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; calculs d’architecture</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier d’ingénierie matérielle et d’architecture des ordinateurs.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Convertir un nombre entre les bases binaire (base 2), hexadécimale (base 16) et décimale (base 10).',
      'Calculer l’espace d’adressage direct permis par un bus d’adresses de 32 bits et de 64 bits.',
      'Identifier les registres fondamentaux du modèle de Von Neumann (PC, IR, MAR, MBR, Accumulateur).',
      'Décrire les trois phases du cycle d’instruction (Fetch, Decode, Execute).'
    ], [
      '<p><strong>1. Conversions :</strong> $1101_2 = 8 + 4 + 1 = 13_{10} = \\text{D}_{16}$ ; $0x2A = 2 \\times 16 + 10 = 42_{10} = 00101010_2$.</p>',
      '<p><strong>2. Espace d’adressage :</strong> $2^{32} \\text{ octets} = 4\\text{ Go}$ ; $2^{64} \\text{ octets} \\approx 18{,}4\\text{ Exaoctets}$.</p>',
      '<p><strong>3. Registres :</strong> PC (Program Counter pointe l’instruction suivante), IR (Instruction Register contient le code opération en cours), MAR/MBR interfacent la mémoire centrale.</p>',
      '<p><strong>4. Cycle machine :</strong> Fetch (chargement depuis RAM), Decode (décodage du code opération par l’unité de contrôle), Execute (calcul ALU ou transfert registre).</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Calculer le temps d’accès effectif moyen (AMAT) d’une hiérarchie mémoire avec cache L1 ($95\\%$ de hit rate).',
      'Distinguer les architectures RISC (instructions simples à cycle unique) et CISC (instructions complexes multi-cycles).',
      'Représenter un nombre réel en virgule flottante simple précision norme IEEE 754 (signe, exposant biaisé, mantisse).',
      'Calculer le débit maximal d’un bus PCI-Express selon sa génération et son nombre de lignes (lanes).'
    ], [
      '<p><strong>1. AMAT :</strong> $AMAT = T_{hit} + (1 - H) \\times T_{miss} = 1\\text{ ns} + 0{,}05 \\times 50\\text{ ns} = 3{,}5\\text{ ns}$.</p>',
      '<p><strong>2. RISC vs CISC :</strong> RISC (ARM, RISC-V : format fixe, exécution pipeline optimisée) vs CISC (x86-64 : rétrocompatibilité, micro-opérations internes).</p>',
      '<p><strong>3. IEEE 754 32 bits :</strong> 1 bit de signe, 8 bits d’exposant (biais de 127), 23 bits de mantisse normalisée ($1.M$).</p>',
      '<p><strong>4. Débit PCIe :</strong> PCIe 4.0 délivre $\\approx 2\\text{ Go/s}$ par ligne ; un port x16 offre donc un débit théorique de $32\\text{ Go/s}$ bidirectionnel.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Analyser les aléas de pipeline processeur (structurels, de données RAW/WAR/WAW, et de contrôle lors de branchements).',
      'Dimensionner la hiérarchie de stockage d’un serveur de base de données (NVMe, SSD SATA, RAM et caches CPU).',
      'Comparer les mécanismes de cohérence de cache (protocole MESI) dans un processeur multi-cœurs.',
      'Évaluer l’impact de la loi d’Amdahl sur le gain de performance d’une parallélisation à N cœurs.'
    ], [
      '<p><strong>1. Aléas de pipeline :</strong> Données (résolu par forwarding/bypassing ou insertion de bulles) ; Contrôle (résolu par prédiction de branchement statique/dynamique).</p>',
      '<p><strong>2. Dimensionnement stockage :</strong> Priorité à la RAM pour le buffer pool, NVMe PCIe en RAID 10 pour le journal WAL (faible latence d’écriture synchrone).</p>',
      '<p><strong>3. Protocole MESI :</strong> Modified (modifié en cache local), Exclusive (propre, non partagé), Shared (partagé en lecture), Invalid (invalide, rechargement requis).</p>',
      '<p><strong>4. Loi d’Amdahl :</strong> $S = \\frac{1}{(1 - P) + \\frac{P}{N}}$ où $P$ est la fraction parallélisable : la partie séquentielle $(1-P)$ borne strictement l’accélération maximale.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Architecture Matérielle &amp; Dimensionnement Serveur</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’ingénierie consiste à concevoir et justifier l’architecture matérielle complète d’un serveur d’entreprise haute densité : choix des processeurs (cœurs, fréquences, cache L3), dimensionnement des canaux mémoire NUMA, contrôleurs de stockage et interfaces d’entrées/sorties.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences d’architecture évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Analyse de charge :</strong> Profilage CPU-bound, Memory-bound ou I/O-bound.</li>',
      '      <li><strong>Topologie NUMA :</strong> Répartition symétrique des barrettes de RAM par canal pour maximiser la bande passante.</li>',
      '      <li><strong>Tolérance aux pannes :</strong> Mémoire ECC registered, alimentations redondantes et RAID matériel.</li>',
      '      <li><strong>Bilan thermique &amp; énergétique :</strong> Calcul de TDP global et dimensionnement de la dissipation.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel d’architecture des ordinateurs B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier d’architecture matérielle B1 : Von Neumann, hiérarchie mémoire et dimensionnement serveur.',
      active: 'exercices',
      body
    }
  };
}`);

// 6. b1-merise
replaceExercices('server/content/b1-merise/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; modèles Merise</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de modélisation conceptuelle, logique et organisationnelle du système d’information.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Identifier les entités, propriétés et identifiants uniques dans un texte de cahier des charges.',
      'Positionner correctement les cardinalités minimales (0 ou 1) et maximales (1 ou n) sur une association binaire.',
      'Distinguer une propriété d’entité d’une propriété portée par une association.',
      'Appliquer la règle de passage du MCD au MLD pour une association binaire de type (1,1)-(0,n).'
    ], [
      '<p><strong>1. Entité &amp; identifiant :</strong> Une entité regroupe des occurrences homogènes ; son identifiant garantit l’unicité absolue de chaque occurrence.</p>',
      '<p><strong>2. Cardinalités :</strong> 0,1 (au plus un) ; 1,1 (exactement un) ; 0,n (zéro, un ou plusieurs) ; 1,n (au moins un).</p>',
      '<p><strong>3. Propriété portée :</strong> Une propriété appartient à une association quand sa valeur dépend conjointement des deux entités reliées (ex: <em>quantité_commandée</em> dépend de Commande et Produit).</p>',
      '<p><strong>4. Règle de passage 1,1 - 0,n :</strong> L’identifiant de l’entité côté 0,n migre comme clé étrangère (FK) dans la table côté 1,1.</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Modéliser une association plusieurs-à-plusieurs (0,n)-(0,n) et en déduire la table de liaison au niveau MLD.',
      'Vérifier les trois premières formes normales (1FN, 2FN, 3FN) sur un schéma relationnel.',
      'Représenter un Modèle Conceptuel de Traitements (MCT) avec événements déclencheurs, opérations et synchronisations.',
      'Gérer les associations réflexives (ex: salarié managé par un autre salarié) au niveau conceptuel et logique.'
    ], [
      '<p><strong>1. Association n-n :</strong> L’association devient une table dédiée dont la clé primaire est la concaténation des deux clés primaires des entités reliées.</p>',
      '<p><strong>2. Formes normales :</strong> 1FN (valeurs atomiques) ; 2FN (1FN + dépendance totale de la clé) ; 3FN (2FN + pas de dépendance transitive entre colonnes non-clés).</p>',
      '<p><strong>3. MCT :</strong> Événement entrant &rarr; Règle de synchronisation (ET / OU) &rarr; Opération métier &rarr; Événement résultat émis selon conditions.</p>',
      '<p><strong>4. Réflexive :</strong> La table héberge une clé étrangère pointant vers sa propre clé primaire (auto-jointure).</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Concevoir le schéma conceptuel complet (MCD) d’une plateforme de réservation d’hôtels avec gestion des chambres, tarifs saisonniers et paiements.',
      'Résoudre les redondances et boucles d’associations en isolant les dépendances fonctionnelles strictes.',
      'Traduire le Modèle Organisationnel des Traitements (MOT) en précisant les postes de travail, la nature des tâches (manuelle/automatisée) et la périodicité.',
      'Rédiger le dictionnaire des données normalisé avec types, longueurs et contraintes d’intégrité.'
    ], [
      '<p><strong>1. MCD Hôtellerie :</strong> Entités Hôtel, Chambre, Client, Réservation, Facture avec associations tarification saisonnière et occupation.</p>',
      '<p><strong>2. Dépendances fonctionnelles :</strong> Chaque dépendance non élémentaire ou transitive est décomposée pour garantir l’intégrité sans duplication.</p>',
      '<p><strong>3. MOT :</strong> Découpage en phases organisationnelles : poste Accueil (temps réel), traitement batch facturation (quotidien différé).</p>',
      '<p><strong>4. Dictionnaire :</strong> Nom canonique, Libellé métier, Type SQL, Longueur, Contrainte de non-nullité et domaine de valeurs autorisées.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Conception du Système d’Information Merise</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce projet intégrateur consiste à concevoir l’intégralité du système d’information d’un réseau logistique de transport : élaboration du dictionnaire de données, matrice des dépendances fonctionnelles, MCD, MLD normalisé en 3FN et Modèle Conceptuel des Traitements (MCT).</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences de modélisation évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Rigueur conceptuelle :</strong> Absence totale de redondance et respect des formes normales.</li>',
      '      <li><strong>Traduction relationnelle :</strong> Dérivation mécanique irréprochable du MLD avec intégrité référentielle.</li>',
      '      <li><strong>Modélisation dynamique :</strong> Cohérence globale entre données statiques (MCD) et flux d’événements (MCT/MOT).</li>',
      '      <li><strong>Documentation professionnelle :</strong> Qualité graphique des diagrammes et clarté des règles de gestion métier.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de modélisation Merise B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de modélisation Merise B1 : MCD, MLD normalisé en 3FN et processus MCT.',
      active: 'exercices',
      body
    }
  };
}`);

// 7. b1-reseaux
replaceExercices('server/content/b1-reseaux/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; protocoles réseau</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de conception et de dimensionnement d’un réseau local d’entreprise.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Distinguer les réseaux selon leur échelle géographique (PAN, LAN, WLAN, MAN, WAN).',
      'Comparer les topologies physiques en étoile, en bus, en anneau et en maillage.',
      'Citer les 7 couches du modèle OSI et préciser la PDU associée à chaque niveau (Bit, Trame, Paquet, Segment, Données).',
      'Identifier le rôle d’une adresse physique MAC (couche 2) par rapport à une adresse logique IP (couche 3).'
    ], [
      '<p><strong>1. Échelles réseau :</strong> PAN (personnel, Bluetooth) ; LAN (local, bâtiment) ; MAN (métropolitain, ville) ; WAN (étendu, Internet).</p>',
      '<p><strong>2. Topologies :</strong> L’étoile (commutateur central) évite l’interruption globale en cas de rupture de câble, contrairement au bus partagé.</p>',
      '<p><strong>3. Modèle OSI :</strong> 1-Physique (Bit), 2-Liaison (Trame), 3-Réseau (Paquet), 4-Transport (Segment), 5-Session, 6-Présentation, 7-Application (Données).</p>',
      '<p><strong>4. Adressage :</strong> L’adresse MAC assure l’acheminement local sur le même sous-réseau ; l’adresse IP permet le routage de bout en bout à travers des passerelles.</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Comparer le fonctionnement des protocoles de transport TCP (connecté, fiable, contrôle de flux) et UDP (non connecté, rapide).',
      'Analyser le mécanisme de résolution d’adresses ARP (Address Resolution Protocol) et son cache local.',
      'Identifier les classes d’adresses IPv4 historiques (A, B, C) et les plages réservées privées (RFC 1918).',
      'Calculer l’adresse réseau, l’adresse de broadcast et le nombre d’hôtes utiles pour un masque de sous-réseau donné (/25, /26, /27).'
    ], [
      '<p><strong>1. TCP vs UDP :</strong> TCP utilise un three-way handshake (SYN, SYN-ACK, ACK) et retransmet les segments perdus ; UDP privilégie la faible latence sans accusé de réception.</p>',
      '<p><strong>2. ARP :</strong> Émission d’une requête broadcast "Qui a l’IP X ?" &rarr; Réponse unicast du propriétaire "C’est moi, voici ma MAC" &rarr; Mise en cache temporaire.</p>',
      '<p><strong>3. RFC 1918 :</strong> 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 : adresses non routables sur l’Internet public, nécessitant un NAT/PAT pour sortir.</p>',
      '<p><strong>4. Calcul sous-réseau :</strong> /26 correspond à un masque 255.255.255.192 ; $2^6 - 2 = 62$ hôtes adressables par sous-réseau.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Résoudre un problème d’interruption de connectivité réseau par une démarche méthodique couche par couche (Top-Down ou Bottom-Up).',
      'Dimensionner le plan d’adressage VLSM (Variable Length Subnet Masking) d’une entreprise multisite.',
      'Configurer la passerelle par défaut et expliquer le comportement d’un hôte face à une destination hors sous-réseau.',
      'Analyser une capture de trames réseau pour diagnostiquer une tempête de broadcast ou une boucle de commutation.'
    ], [
      '<p><strong>1. Diagnostic :</strong> Couche 1 (voyants LED, câble), Couche 2 (négociation duplex, ARP), Couche 3 (ping IP passerelle), Couche 4/7 (DNS, test de port applicatif).</p>',
      '<p><strong>2. VLSM :</strong> Trier les besoins par ordre décroissant d’hôtes pour allouer les masques les plus adaptés sans gaspillage d’adresses.</p>',
      '<p><strong>3. Passerelle :</strong> Si l’adresse cible n’appartient pas au sous-réseau local (test par ET binaire avec le masque), la trame est encapsulée à destination de la MAC de la passerelle.</p>',
      '<p><strong>4. Boucle :</strong> Absence du protocole Spanning Tree (STP) provoquant une saturation des tables de commutation et une surcharge CPU des équipements.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Conception &amp; Déploiement Réseau d’Entreprise</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’infrastructure réseau consiste à concevoir l’architecture complète d’un réseau local d’entreprise : découpage en sous-réseaux logiques, plan d’adressage IP, choix des équipements de commutation et politique de routage vers Internet.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences réseau évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Plan d’adressage VLSM :</strong> Optimisation de l’espace d’adressage sans chevauchement.</li>',
      '      <li><strong>Architecture de commutation :</strong> Conception hiérarchique (Cœur, Distribution, Accès).</li>',
      '      <li><strong>Sécurité d’accès :</strong> Filtrage MAC, segmentation réseau et prévention des boucles.</li>',
      '      <li><strong>Documentation d’infrastructure :</strong> Schémas d’architecture normalisés et matrices de câblage.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de réseaux informatiques B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de conception réseau B1 : modèle OSI, TCP/IP, sous-réseaux et VLSM.',
      active: 'exercices',
      body
    }
  };
}`);

// 8. b1-ccna1
replaceExercices('server/content/b1-ccna1/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; commandes Cisco IOS</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques CCNA 1</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de configuration et de sécurisation d’infrastructures Cisco IOS.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Identifier les modes de commandes Cisco IOS (User EXEC, Privileged EXEC, Global Configuration).',
      'Sécuriser l’accès console et les lignes VTY avec mot de passe et chiffrement de service.',
      'Configurer l’interface de gestion SVI (Switch Virtual Interface VLAN 1) sur un commutateur Cisco.',
      'Sauvegarder la configuration active (running-config) dans la mémoire non volatile (startup-config).'
    ], [
      '<p><strong>1. Modes IOS :</strong> Switch> (User) &rarr; enable &rarr; Switch# (Privileged) &rarr; configure terminal &rarr; Switch(config)# (Global).</p>',
      '<p><strong>2. Sécurisation :</strong> line console 0 / password / login ; service password-encryption ; enable secret pour le mot de passe privilégié.</p>',
      '<p><strong>3. SVI Management :</strong> interface vlan 1 / ip address [IP] [MASQUE] / no shutdown ; ip default-gateway [IP_ROUTEUR].</p>',
      '<p><strong>4. Sauvegarde :</strong> copy running-config startup-config (ou write memory) pour persister les réglages en NVRAM.</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Calculer les blocs d’adresses VLSM et allouer les adresses de début, de fin et de broadcast.',
      'Distinguer les topologies réseau Ethernet en transmission Half-Duplex (CSMA/CD) et Full-Duplex.',
      'Interpréter les champs d’en-tête d’un paquet IPv4 (TTL, Protocole, Checksum, Adresses source et destination).',
      'Vérifier la connectivité de bout en bout avec les utilitaires ping et traceroute.'
    ], [
      '<p><strong>1. VLSM Cisco :</strong> Attribution des sous-réseaux contigus aux interfaces de routeurs et liaisons point-à-point en /30 ou /31.</p>',
      '<p><strong>2. Duplex :</strong> En Full-Duplex sur commutateur, le domaine de collision est restreint à chaque port physique et CSMA/CD est désactivé.</p>',
      '<p><strong>3. En-tête IPv4 :</strong> TTL décrémenté à chaque saut de routeur (évite les boucles infinies) ; champ Protocole 6 pour TCP, 17 pour UDP.</p>',
      '<p><strong>4. Diagnostics :</strong> Ping valide la joignabilité ICMP ; traceroute exploite l’expiration progressive du TTL pour cartographier le chemin.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Concevoir le schéma d’adressage IPv4 et IPv6 d’un campus d’entreprise comportant plusieurs départements.',
      'Déployer SSH version 2 pour remplacer Telnet sur l’accès distant d’administration des commutateurs.',
      'Configurer la sécurité des ports (Port Security) sur un commutateur pour bloquer les adresses MAC non autorisées.',
      'Résoudre un incident de mauvaise configuration de passerelle ou de masque de sous-réseau.'
    ], [
      '<p><strong>1. Double pile :</strong> Coexistence native IPv4 (RFC 1918 + NAT) et IPv6 (adresses Global Unicast GUA et Link-Local fe80::).</p>',
      '<p><strong>2. SSHv2 :</strong> ip domain-name &rarr; crypto key generate rsa &rarr; ip ssh version 2 &rarr; transport input ssh sur les lignes VTY.</p>',
      '<p><strong>3. Port Security :</strong> switchport port-security &rarr; maximum 1 &rarr; mac-address sticky &rarr; violation shutdown.</p>',
      '<p><strong>4. Dépannage :</strong> Vérification de show ip interface brief et show arp pour confirmer la cohérence de la table de routage locale.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Déploiement &amp; Sécurisation Réseau Cisco CCNA</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’infrastructure Cisco consiste à élaborer l’architecture réseau d’une succursale d’entreprise : topologie commutée redondante, adressage VLSM, passerelles de premier saut et sécurisation des accès administratifs.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences CCNA évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Configuration IOS :</strong> Rigueur syntaxique et respect des standards de nommage Cisco.</li>',
      '      <li><strong>Adressage hiérarchique :</strong> Découpage VLSM rationnel et allocation des sous-réseaux.</li>',
      '      <li><strong>Durcissement des équipements :</strong> Bannière légale, chiffrement fort, désactivation des services inutiles.</li>',
      '      <li><strong>Validation fonctionnelle :</strong> Cahier de tests de connectivité et capture de tables d’adresses.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel Cisco CCNA 1 v7.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier CCNA 1 Cisco : configuration IOS, modèle OSI, IPv4/IPv6 et sécurité des commutateurs.',
      active: 'exercices',
      body
    }
  };
}`);

// 9. b1-cyber
replaceExercices('server/content/b1-cyber/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; analyses de sécurité</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier d’évaluation des risques et d’audit de sécurité défensive.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Expliciter les trois piliers du modèle CIA : Confidentialité, Intégrité, Disponibilité (et y adjoindre la Traçabilité).',
      'Distinguer les facteurs d’authentification forte (ce que je sais, ce que j’ai, ce que je suis).',
      'Différencier le chiffrement symétrique (AES), asymétrique (RSA) et le hachage cryptographique (SHA-256).',
      'Identifier les vecteurs d’attaque d’ingénierie sociale courants (phishing, spear phishing, vishing, clé USB piégée).'
    ], [
      '<p><strong>1. Triade CIA :</strong> Confidentialité (accès réservé aux personnes habilitées), Intégrité (données non altérées), Disponibilité (service accessible à tout moment).</p>',
      '<p><strong>2. Authentification MFA :</strong> Connaissance (mot de passe), Possession (clé FIDO2, token TOTP), Inhérence (empreinte digitale, biométrie).</p>',
      '<p><strong>3. Cryptographie :</strong> Symétrique (clé unique partagée pour les données en masse) ; Asymétrique (clé publique/privée pour l’échange de clés et signature) ; Hachage (empreinte unidirectionnelle non réversible).</p>',
      '<p><strong>4. Ingénierie sociale :</strong> Manipulation psychologique exploitant l’urgence, l’autorité ou la curiosité humaine plutôt qu’une faille logicielle directe.</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Analyser les vulnérabilités majeures du Top 10 OWASP (Injections SQL, XSS, défauts de contrôle d’accès).',
      'Calculer l’entropie d’un mot de passe et justifier l’obligation d’utiliser une fonction de dérivation avec sel (bcrypt, Argon2).',
      'Configurer une politique de défense en profondeur (pare-feu réseau, segmentation VLAN, antivirus EDR et sauvegardes immuables).',
      'Distinguer un ransomware d’un spyware et expliciter la chaîne d’attaque (Kill Chain).'
    ], [
      '<p><strong>1. OWASP Top 10 :</strong> Injection (requêtes paramétrées obligatoires) ; XSS (échappement contextuel des sorties) ; Broken Access Control (vérification systématique côté serveur).</p>',
      '<p><strong>2. Hachage des mots de passe :</strong> Un sel unique aléatoire empêche les attaques par rainbow tables ; un facteur de coût adaptatif (work factor) ralentit les attaques par force brute.</p>',
      '<p><strong>3. Défense en profondeur :</strong> Multiplier les barrières de sécurité indépendantes pour qu’une compromission périmétrique ne compromette pas le système central.</p>',
      '<p><strong>4. Cyber Kill Chain :</strong> Reconnaissance &rarr; Armement &rarr; Livraison &rarr; Exploitation &rarr; Installation &rarr; Commande &amp; Contrôle &rarr; Chiffrement / Exfiltration.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Élaborer le plan de réponse à incident face à une suspicion de compromission de compte administrateur.',
      'Concevoir une politique de sauvegarde 3-2-1 protégée contre les attaques par chiffrement de ransomwares.',
      'Mettre en place une gouvernance des accès selon le principe du moindre privilège (PoLP) et la séparation des tâches.',
      'Évaluer la conformité des systèmes aux guides d’hygiène informatique de l’ANSSI.'
    ], [
      '<p><strong>1. Réponse à incident :</strong> Détection &rarr; Isolement de la machine compromise &rarr; Éradication &rarr; Récupération sur base saine &rarr; Retour d’expérience post-mortem.</p>',
      '<p><strong>2. Règle 3-2-1 :</strong> 3 copies de données, 2 supports différents (NAS, bande LTO), 1 copie hors site ou dans le cloud immuable (WORM - Write Once Read Many).</p>',
      '<p><strong>3. Moindre privilège :</strong> Tout utilisateur ou processus dispose strictement des droits minimaux nécessaires à l’exécution de sa mission et pour une durée limitée.</p>',
      '<p><strong>4. Recommandations ANSSI :</strong> Mises à jour de sécurité prioritaires, suppression des comptes par défaut, filtrage des flux d’administration et journalisation centralisée.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Audit de Sécurité &amp; Politique PSSI</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’audit et de gouvernance en cybersécurité consiste à formaliser la Politique de Sécurité des Systèmes d’Information (PSSI) d’une organisation : analyse des menaces, cartographie des actifs critiques, matrice des risques et plan de continuité d’activité (PCA).</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences en cybersécurité évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Modélisation des menaces :</strong> Identification des scénarios d’attaque et des vulnérabilités prioritaires.</li>',
      '      <li><strong>Gouvernance des accès :</strong> Gestion des identités, authentification multifacteur et traçabilité des logs.</li>',
      '      <li><strong>Résilience opérationnelle :</strong> Stratégie de sauvegarde, procédures d’isolement et plan de reprise d’activité (PRA).</li>',
      '      <li><strong>Sensibilisation humaine :</strong> Dispositifs de formation des collaborateurs et simulation de phishing.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de cybersécurité B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de cybersécurité B1 : principes CIA, cryptographie, défenses et politique PSSI.',
      active: 'exercices',
      body
    }
  };
}`);

// 10. b1-virtualisation
replaceExercices('server/content/b1-virtualisation/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; dimensionnements de virtualisation</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de consolidation et d’architecture de virtualisation.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Distinguer les hyperviseurs de Type 1 (Bare-Metal : ESXi, Proxmox VE, KVM) et de Type 2 (Hosted : VirtualBox, VMware Workstation).',
      'Identifier les composants émulés d’une machine virtuelle (vCPU, vRAM, contrôleurs de disque virtuel, cartes vNIC).',
      'Distinguer les formats de disques virtuels courants (VMDK, VHDX, QCOW2) et l’allocation dynamique (thin) vs statique (thick).',
      'Expliciter le rôle des pilotes invités paravirtualisés (VMware Tools, QEMU Guest Agent).'
    ], [
      '<p><strong>1. Hyperviseurs :</strong> Le Type 1 s’exécute directement sur le matériel physique pour des performances optimales ; le Type 2 s’exécute au-dessus d’un système d’exploitation hôte.</p>',
      '<p><strong>2. Composants VM :</strong> L’hyperviseur intercepte et planifie l’accès aux ressources matérielles réelles de manière totalement isolée pour chaque VM.</p>',
      '<p><strong>3. Provisioning disque :</strong> Thin provisioning n’alloue que l’espace réellement écrit par le système invité ; Thick réserve immédiatement la taille totale sur le stockage.</p>',
      '<p><strong>4. Outils invités :</strong> Permettent la paravirtualisation (accès direct sans émulation lourde), la synchronisation horaire et l’arrêt propre de l’OS invité.</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Calculer les ratios de surallocation (overcommit) de vCPU et de RAM recommandés en production.',
      'Comparer les modes de réseau virtuel : Accès par pont (Bridge), NAT et Réseau privé hôte (Host-Only).',
      'Distinguer un instantané de machine virtuelle (snapshot - mémoire et delta de disques) d’une véritable sauvegarde.',
      'Analyser le fonctionnement de la migration à chaud de machines virtuelles (vMotion / Live Migration sans interruption).'
    ], [
      '<p><strong>1. Surallocation :</strong> Ratio vCPU:pCPU usuel de 3:1 à 5:1 selon la charge ; overcommit RAM déconseillé ou très limité pour éviter le swap de l’hyperviseur.</p>',
      '<p><strong>2. Réseau VM :</strong> Le Bridge intègre la VM directement au LAN physique avec sa propre IP ; le NAT partage l’adresse de l’hôte physique.</p>',
      '<p><strong>3. Snapshots :</strong> Un snapshot fige l’état pour un retour arrière rapide avant mise à jour mais dégrade les performances disque et ne protège pas contre une panne matérielle.</p>',
      '<p><strong>4. Migration à chaud :</strong> Pré-copie itérative de la RAM de la VM vers l’hôte cible pendant que la VM tourne, bascule finale en quelques millisecondes.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Dimensionner le stockage partagé (SAN iSCSI / NFS) d’un cluster de virtualisation haute disponibilité (HA).',
      'Concevoir une politique de tolérance aux pannes garantissant le redémarrage automatique des VMs en cas de crash d’un nœud.',
      'Distinguer les machines virtuelles complètes des conteneurs applicatifs légers (Docker / LXC).',
      'Établir le plan de reprise d’activité (PRA) basé sur la réplication périodique des disques virtuels sur site secondaire.'
    ], [
      '<p><strong>1. Stockage partagé :</strong> Indispensable pour la haute disponibilité : les banques de données doivent être accessibles simultanément par tous les serveurs du cluster.</p>',
      '<p><strong>2. Haute disponibilité (HA) :</strong> Un mécanisme de heartbeat détecte la défaillance d’un nœud physique et déclenche le redémarrage des VMs sur les hôtes survivants.</p>',
      '<p><strong>3. VM vs Conteneur :</strong> La VM virtualise tout le matériel et intègre son propre noyau d’OS ; le conteneur partage le noyau de l’hôte pour une densité et un démarrage instantané.</p>',
      '<p><strong>4. Réplication PRA :</strong> Synchronisation asynchrone des deltas de blocs vers un second cluster pour un RPO (perte de données) et un RTO (délai de redémarrage) maîtrisés.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Consolidation &amp; Architecture de Virtualisation</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’ingénierie système consiste à concevoir le projet de consolidation d’un parc de 30 serveurs physiques obsolètes vers une infrastructure de virtualisation redondée : dimensionnement matériel, réseau virtuel, stockage partagé et politique de sauvegarde.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences de virtualisation évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Dimensionnement des hyperviseurs :</strong> Bilan consolidé des cœurs CPU, de la RAM et de la bande passante réseau.</li>',
      '      <li><strong>Sécurité &amp; segmentation :</strong> Séparation des flux de management, de vMotion, de stockage et du trafic applicatif via VLANs.</li>',
      '      <li><strong>Planification de la haute disponibilité :</strong> Règle de dimensionnement N+1 pour supporter la panne d’un hyperviseur.</li>',
      '      <li><strong>Stratégie de sauvegarde :</strong> Intégration de sauvegardes dédupliquées complètes et incrémentales.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de virtualisation des systèmes B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de virtualisation B1 : hyperviseurs Type 1, stockage partagé, HA et consolidation.',
      active: 'exercices',
      body
    }
  };
}`);

// 11. b1-projet
replaceExercices('server/content/b1-projet/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; méthodes de gestion de projet</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de cadrage, planification et gouvernance de projet informatique.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Identifier les trois contraintes fondamentales du triangle d’or de projet (Coût, Délais, Périmètre / Qualité).',
      'Construire la structure de découpage du projet (WBS - Work Breakdown Structure) en lots de travail.',
      'Distinguer les rôles de la matrice RACI (Responsible, Accountable, Consulted, Informed).',
      'Identifier les jalons clés d’un cycle de vie de projet (cadrage, lancement, recette, mise en production).'
    ], [
      '<p><strong>1. Triangle d’or :</strong> Toute modification d’un axe (ex: réduction du délai) impacte obligatoirement l’un des deux autres (augmentation du coût ou réduction du périmètre).</p>',
      '<p><strong>2. WBS :</strong> Décomposition hiérarchique arborescente descendante du projet jusqu’aux tâches élémentaires assignables et estimables.</p>',
      '<p><strong>3. Matrice RACI :</strong> R (celui qui fait), A (l’unique décideur qui valide), C (l’expert consulté avant action), I (la partie prenante informée après action).</p>',
      '<p><strong>4. Jalons :</strong> Événements de durée nulle marquant la fin d’une étape majeure et validant le passage à l’étape suivante (Go / No-Go).</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Construire le diagramme de Gantt avec dépendances entre tâches (Fin à Début, Début à Début).',
      'Calculer le chemin critique et la marge totale d’un réseau de tâches d’ordonnancement.',
      'Comparer les approches prédictives en cascade (Cycle en V) et adaptatives (Agile Scrum / Kanban).',
      'Élaborer le registre des risques avec évaluation de la probabilité, de l’impact et de la stratégie de mitigation.'
    ], [
      '<p><strong>1. Diagramme de Gantt :</strong> Visualisation chronologique des durées, des enchaînements et de l’avancement des livrables.</p>',
      '<p><strong>2. Chemin critique :</strong> La séquence de tâches à marge nulle : tout retard sur une tâche de ce chemin reporte d’autant la livraison finale du projet.</p>',
      '<p><strong>3. Cascade vs Agile :</strong> Cycle en V (spécifications exhaustives initiales, recette tardive) vs Agile (itérations courtes de 2 à 4 semaines, valeur livrée en continu et adaptation au changement).</p>',
      '<p><strong>4. Matrice des risques :</strong> Criticité = Probabilité $\\times$ Impact ; plan d’action : Évitement, Réduction, Transfert (assurance) ou Acceptation résiduelle.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Arbitrer un dépassement budgétaire lors d’un comité de pilotage (COPIL) : options d’ajustement et communication.',
      'Piloter une équipe de développement avec les rituels Scrum (Sprint Planning, Daily Standup, Review, Rétrospective).',
      'Mesurer la performance d’avancement par la méthode de la valeur acquise (EVM : Valeur Planifiée, Coût Réel, Valeur Acquise).',
      'Gérer la phase de recette utilisateur (UAT) : cahier de recette, qualification des anomalies bloquantes et signature du PV.'
    ], [
      '<p><strong>1. Arbitrage COPIL :</strong> Présentation transparente des causes, proposition de scénarios chiffrés (réduction de périmètre non critique vs rallonge budgétaire) et vote décisionnel.</p>',
      '<p><strong>2. Rituels Scrum :</strong> Le Daily (15 min debout pour identifier les blocages) ; la Rétrospective (amélioration continue des processus d’équipe).</p>',
      '<p><strong>3. EVM :</strong> Écart de coût $CV = EV - AC$ ; Écart de délai $SV = EV - PV$ ; Indices de performance $CPI = EV / AC$ et $SPI = EV / PV$.</p>',
      '<p><strong>4. Recette :</strong> Recette fonctionnelle basée sur les critères d’acceptation initiaux ; aucune mise en production avec une anomalie de sévérité bloquante non résolue.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Cadrage &amp; Pilotage de Projet Numérique</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier professionnel consiste à élaborer le plan de management complet d’un projet de transformation numérique : charte de projet, WBS détaillé, planning Gantt, matrice RACI, registre des risques et plan d’assurance qualité.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences de gestion de projet évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Cadrage stratégique :</strong> Formulation claire des objectifs SMART et des critères de succès mesurables.</li>',
      '      <li><strong>Maîtrise de la planification :</strong> Identification précise du chemin critique et des ressources critiques.</li>',
      '      <li><strong>Gouvernance des risques :</strong> Anticipation des aléas techniques, organisationnels et humains.</li>',
      '      <li><strong>Animation &amp; communication :</strong> Clarté des livrables et gestion des parties prenantes.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de gestion de projet B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de gestion de projet B1 : WBS, diagramme de Gantt, matrice RACI et méthodes agiles.',
      active: 'exercices',
      body
    }
  };
}`);

// 12. b1-sql
replaceExercices('server/content/b1-sql/pages.js', `function exercices(course) {
  const item = (badge, cls, intro, requete) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Requêtes SQL et explications détaillées</summary><div class="sol">' + requete + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques SQL</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier de requêtage et d’optimisation relationnelle.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Sélectionner des colonnes spécifiques avec projection SELECT et filtrage simple WHERE.',
      'Éliminer les doublons dans les résultats avec le mot-clé DISTINCT.',
      'Trier les résultats avec ORDER BY (ASC / DESC) et limiter le nombre de lignes retournées avec LIMIT.',
      'Filtrer sur des intervalles (BETWEEN) ou des listes de valeurs (IN).'
    ], [
      '<p><strong>1. Projection :</strong> <code>SELECT nom, email FROM clients WHERE ville = \\'Paris\\';</code></p>',
      '<p><strong>2. Dédoublonnage :</strong> <code>SELECT DISTINCT pays FROM fournisseurs;</code></p>',
      '<p><strong>3. Tri &amp; pagination :</strong> <code>SELECT * FROM commandes ORDER BY date_commande DESC LIMIT 10;</code></p>',
      '<p><strong>4. Intervalles :</strong> <code>SELECT * FROM produits WHERE prix BETWEEN 20 AND 50;</code></p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Effectuer des jointures internes (INNER JOIN) entre plusieurs tables reliées par clés primaires et étrangères.',
      'Utiliser les jointures externes (LEFT JOIN / RIGHT JOIN) pour conserver les enregistrements sans correspondance.',
      'Calculer des agrégats (COUNT, SUM, AVG, MIN, MAX) regroupés par catégories avec GROUP BY.',
      'Filtrer les résultats agrégés avec la clause HAVING.'
    ], [
      '<p><strong>1. Jointure interne :</strong> <code>SELECT c.nom, cmd.id FROM clients c INNER JOIN commandes cmd ON c.id = cmd.client_id;</code></p>',
      '<p><strong>2. Jointure externe :</strong> <code>SELECT c.nom, cmd.id FROM clients c LEFT JOIN commandes cmd ON c.id = cmd.client_id WHERE cmd.id IS NULL;</code> (clients sans commande).</p>',
      '<p><strong>3. Agrégation :</strong> <code>SELECT categorie, COUNT(*), AVG(prix) FROM produits GROUP BY categorie;</code></p>',
      '<p><strong>4. Filtrage d’agrégat :</strong> <code>SELECT client_id, SUM(total) FROM commandes GROUP BY client_id HAVING SUM(total) > 1000;</code></p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Écrire des sous-requêtes corrélées et imbriquées (IN, EXISTS, NOT EXISTS).',
      'Gérer les transactions ACID avec BEGIN, COMMIT et ROLLBACK.',
      'Créer et manipuler des vues (CREATE VIEW) pour sécuriser l’accès aux données.',
      'Analyser le plan d’exécution d’une requête avec EXPLAIN pour justifier la création d’un index (INDEX).'
    ], [
      '<p><strong>1. Sous-requête EXISTS :</strong> <code>SELECT nom FROM clients c WHERE EXISTS (SELECT 1 FROM commandes cmd WHERE cmd.client_id = c.id AND cmd.total > 500);</code></p>',
      '<p><strong>2. Transaction :</strong> <code>BEGIN; UPDATE comptes SET solde = solde - 100 WHERE id = 1; UPDATE comptes SET solde = solde + 100 WHERE id = 2; COMMIT;</code></p>',
      '<p><strong>3. Vue :</strong> <code>CREATE VIEW v_ventes_mensuelles AS SELECT strftime(\\'%Y-%m\\', date_commande) AS mois, SUM(total) AS ca FROM commandes GROUP BY mois;</code></p>',
      '<p><strong>4. Index :</strong> <code>CREATE INDEX idx_cmd_client ON commandes(client_id);</code> transforme un Seq Scan (parcours complet) en Index Scan immédiat.</p>'
    ].join('\\n')),

    '  <h2>Dossier de synthèse — Conception &amp; Requêtage Relationnel</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’ingénierie des bases de données consiste à concevoir le schéma relationnel, les contraintes d’intégrité référentielle et les requêtes analytiques de reporting d’une plateforme de commerce électronique.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences SQL évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Modélisation DDL :</strong> Création des tables, clés primaires, clés étrangères avec clauses ON DELETE CASCADE.</li>',
      '      <li><strong>Requêtage complexe :</strong> Maîtrise des jointures multiples, sous-requêtes et fonctions d’agrégation.</li>',
      '      <li><strong>Intégrité transactionnelle :</strong> Préservation des propriétés ACID lors d’opérations concurrentes.</li>',
      '      <li><strong>Optimisation des performances :</strong> Analyse des coûts d’exécution et stratégie d’indexation.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de bases de données relationnelles et SQL B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier de bases de données relationnelles SQL B1 : requêtes, jointures, agrégats et transactions.',
      active: 'exercices',
      body
    }
  };
}`);

console.log('=== Toutes les 12 pages d’exercices B1 ont été réécrites canoniquement ===');
