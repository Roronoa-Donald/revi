/**
 * Pages « examens blancs » et « exercices & projet » du cours « Ingénierie du besoin » B2.
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 : Cadrage, Élicitation &amp; Formalisation des Besoins',
      intro: 'Sujet théorique et pratique : frontière problème/solution, parties prenantes, échantillonnage et canevas agile.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Problème vs Solution & Mendelow',
          text: 'Un client vous dit : « Nous voulons une application mobile Flutter connectée à une base NoSQL pour nos chauffeurs-livreurs ». Analysez cette demande. Comment séparez-vous le problème de la solution ? Comment positionnez-vous le directeur financier (fort pouvoir, faible intérêt opérationnel direct) dans la matrice de Mendelow ?',
          sol: 'L’énoncé du client exprime une <strong>solution technique prématurée</strong> (Flutter, NoSQL) sans expliciter le <strong>besoin métier</strong> sous-jacent. L’analyste applique la méthode des 5 Pourquoi pour découvrir le problème réel : par exemple, <em>« Réduire de 20 % les erreurs d’adresse et informer le client final en temps réel de l’heure d’arrivée »</em>. Dans la matrice de Mendelow, le directeur financier a un <strong>Pouvoir Fort</strong> (arbitrage budgétaire) et un <strong>Intérêt Faible</strong> pour les écrans opérationnels : la stratégie préconisée est de le <strong>garder satisfait</strong> (Keep Satisfied) via des rapports de ROI synthétiques sans le noyer dans les détails techniques.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Taxonomie FURPS+ &amp; Qualité ISO 29148',
          text: 'Soit l’énoncé d’un cahier des charges : « L’application doit être rapide, intuitive et sécurisée ». Pourquoi cette exigence est-elle inexploitable selon la norme ISO 29148 ? Reformulez-la sous forme de 3 exigences normées vérifiables en précisant leur catégorie FURPS+.',
          sol: 'Cette exigence viole les critères d’<strong>atomicité</strong> (trois concepts amalgamés), de <strong>non-ambiguïté</strong> et de <strong>testabilité</strong> (termes subjectifs sans seuil chiffré). Reformulation normée :<br>' +
            '1. <em>Performance (P)</em> : « Le temps de réponse lors de la recherche d’un patient doit être &lt; 500 ms au percentile 95 sous une charge de 200 requêtes/seconde ».<br>' +
            '2. <em>Usabilité (U)</em> : « Un utilisateur novice formé en 15 minutes doit créer un dossier médical complet en moins de 3 minutes sans assistance ».<br>' +
            '3. <em>Fonctionnelle / Sécurité (F)</em> : « L’accès aux dossiers médicaux doit imposer une authentification multifacteur (MFA) conforme au standard TOTP RFC 6238 ».'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Échantillon statistique &amp; Shadowing',
          text: 'Une entreprise compte 4 000 salariés. Vous lancez une enquête d’élicitation avec une marge d’erreur tolérée de 5 %. Calculez la taille minimale de l’échantillon selon la formule de Taro Yamane. Pourquoi devez-vous compléter ce sondage par une séance de shadowing ?',
          sol: 'Formule de Taro Yamane : <code>n = N / (1 + N * e^2)</code>.<br>' +
            'Avec N = 4 000 et e = 0,05 :<br>' +
            '<code>n = 4 000 / (1 + 4 000 * 0,0025) = 4 000 / (1 + 10) = 4 000 / 11 &asymp; 364 répondants</code>.<br>' +
            'Le sondage quantifie des opinions déclaratives mais souffre du <em>biais d’auto-sélection</em>. Le <strong>shadowing</strong> (observation en immersion) est indispensable pour confronter le travail prescrit au <em>travail réel</em> et découvrir les <strong>contournements non documentés (workarounds)</strong> que les utilisateurs n’osent pas écrire dans un formulaire.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : User Story &amp; Critères Gherkin',
          text: 'Rédigez une User Story complète selon le standard Connextra pour la réinitialisation de mot de passe d’un médecin, accompagnée d’un scénario d’acceptation en syntaxe Gherkin (Given / When / Then).',
          sol: '<strong>User Story Connextra :</strong><br>' +
            '<em>En tant que</em> médecin praticien,<br>' +
            '<em>Je veux</em> recevoir un lien temporaire sécurisé par SMS pour réinitialiser mon mot de passe oublié,<br>' +
            '<em>Afin de</em> reprendre immédiatement l’accès aux dossiers de mes patients en urgence sans attendre le support informatique.<br><br>' +
            '<strong>Scénario Gherkin :</strong><br>' +
            '<code>Étant donné que</code> le médecin possède un compte actif avec le numéro vérifié "+33612345678"<br>' +
            '<code>Quand</code> il saisit son identifiant professionnel et clique sur "Mot de passe oublié"<br>' +
            '<code>Alors</code> un code à usage unique à 6 chiffres valable 10 minutes est envoyé par SMS<br>' +
            '<code>Et</code> un événement d’audit de sécurité est consigné dans les logs du serveur.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 : Priorisation, Traçabilité RTM &amp; Gestion du Changement',
      intro: 'Sujet d’approfondissement : arbitrages budgétaires, calculs économiques, audit de traçabilité et pilotage CCB.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Arbitrage budgétaire MoSCoW',
          text: 'Un projet dispose d’un budget de 100 jours-hommes (JH). Le Product Owner a qualifié 15 exigences pour un total de 90 JH en « Must have », 20 JH en « Should have » et 10 JH en « Could have ». Pourquoi cette répartition est-elle dangereuse ? Proposez une réaffectation respectant les bonnes pratiques.',
          sol: 'La proportion de <strong>Must have</strong> atteint <code>90 / 120 = 75 %</code> de l’effort total (et 90 % du budget nominal de 100 JH). En cas du moindre imprévu, il n’existe aucune marge d’ajustement (buffer) et la date de livraison sera irrémédiablement manquée. Selon la règle 60/20/20, pour un budget de 100 JH :<br>' +
            '- <strong>Must have</strong> : plafonné à <strong>60 JH maximum</strong> (seules les fonctions vitales et légales).<br>' +
            '- <strong>Should have</strong> : environ <strong>20 JH</strong> (fonctions importantes dotées d’un contournement temporaire).<br>' +
            '- <strong>Could have</strong> : environ <strong>20 JH</strong> (variables d’ajustement sacrifiables sans impacter le cœur du produit).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Calcul de priorité WSJF',
          text: 'Deux fonctionnalités sont en arbitrage :<br>- Fonctionnalité A : User Value = 8, Time Criticality = 5, Risk Reduction = 3, Durée estimée = 2 sprints.<br>- Fonctionnalité B : User Value = 13, Time Criticality = 8, Risk Reduction = 5, Durée estimée = 5 sprints.<br>Calculez le score WSJF de chaque fonctionnalité. Laquelle doit être réalisée en premier ?',
          sol: 'Formule : <code>WSJF = Cost of Delay / Job Duration</code> avec <code>CoD = User Value + Time Criticality + Risk Reduction</code>.<br>' +
            '- Pour A : <code>CoD(A) = 8 + 5 + 3 = 16</code>. <code>WSJF(A) = 16 / 2 = 8,0</code>.<br>' +
            '- Pour B : <code>CoD(B) = 13 + 8 + 5 = 26</code>. <code>WSJF(B) = 26 / 5 = 5,2</code>.<br>' +
            'Bien que la fonctionnalité B ait une valeur absolue plus élevée (26 vs 16), la <strong>fonctionnalité A doit être développée en premier</strong> car son ratio économique WSJF est nettement supérieur (8,0 contre 5,2). Elle libère rapidement de la valeur avec un faible effort.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Matrice de traçabilité RTM &amp; Gold Plating',
          text: 'Lors de l’audit de la matrice RTM d’un projet, vous constatez : (1) Une exigence « REQ-SEC-012 » ne pointe vers aucun scénario de test ; (2) Un module de code « export_blockchain.py » ne remonte à aucune exigence dans le SRS. Analysez ces deux anomalies.',
          sol: '(1) L’exigence <code>REQ-SEC-012</code> sans cas de test illustre un défaut de <strong>traçabilité amont (Forward Traceability)</strong> : rien ne prouve que l’exigence est vérifiée, ce qui expose le système à un risque critique de non-conformité en production.<br>' +
            '(2) Le module <code>export_blockchain.py</code> sans exigence source est un cas flagrant de <strong>Gold Plating</strong> détecté par la <strong>traçabilité aval (Backward Traceability)</strong> : les développeurs ont codé une fonctionnalité superflue non validée par le client, consommant du budget et ajoutant de la dette technique sans justification contractuelle.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Grille INVEST &amp; Comité CCB',
          text: 'Une équipe Scrum reçoit en sprint la story suivante : « En tant qu’administrateur, je veux gérer l’ensemble des données utilisateurs et les statistiques du site afin d’avoir un système complet ». Évaluez cette story selon la grille INVEST. Si le client demande à mi-projet d’ajouter l’export comptable SAP, quelle procédure formelle doit s’appliquer ?',
          sol: 'Audit selon la grille <strong>INVEST</strong> :<br>' +
            '- <em>Small</em> : <strong>ÉCHEC total</strong> (Epic géante mélangeant gestion des profils et moteur statistique).<br>' +
            '- <em>Estimable</em> : <strong>ÉCHEC</strong> (périmètre flou impossible à chiffrer précisément).<br>' +
            '- <em>Testable</em> : <strong>ÉCHEC</strong> (aucun critère mesurable).<br>' +
            'Il faut découper cette Epic en plusieurs stories atomiques.<br>' +
            'Pour la demande d’export SAP à mi-projet : dépôt d’une <strong>Change Request (CR)</strong> formelle, réalisation d’une <strong>analyse d’impact</strong> (coût en JH, répercussions architecturales, calendrier), arbitrage souverain par le <strong>Change Control Board (CCB)</strong> et, en cas d’approbation, négociation d’un avenant ou dé-scoping d’exigences équivalentes (triangle de fer).'
        }
      ]
    }
  ];

  const htmlSujets = sujets.map((sujet) => [
    '  <h2>' + sujet.title + '</h2>',
    '  <p class="lead">' + sujet.intro + '</p>',
    sujet.items.map(item => [
      '  <div class="box box--it">',
      '    <div class="box__title">' + ic('clipboard') + ' ' + item.num + ' <span class="tag tag--time" style="margin-left:auto">' + item.badge + '</span></div>',
      '    <p><strong>Énoncé :</strong> ' + item.text + '</p>',
      '    <details style="margin-top:10px;cursor:pointer"><summary style="font-weight:700;color:var(--__S__-deep)">' + ic('check') + ' Voir le corrigé type</summary>',
      '      <div style="margin-top:10px;padding:12px;background:#fff;border-radius:8px;border:1px solid var(--__S__-bd)">' + item.sol + '</div>',
      '    </details>',
      '  </div>'
    ].join('\n')).join('\n')
  ].join('\n\n')).join('\n\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examens blancs</h1>',
    '  <p class="lead">Deux sujets complets notés sur 20 points, fidèles aux épreuves écrites et cas pratiques ' +
    'de Licence 2 en Ingénierie du besoin et Analyse Métier. Entraîne-toi en conditions réelles puis consulte les corrigés détaillés.</p>',
    box('method', 'Conseils méthodologiques pour l’épreuve', 'compass', [
      '    <ul>',
      '      <li><strong>Temps indicatif</strong> : 1 heure 30 par sujet sans document.</li>',
      '      <li><strong>Vocabulaire normatif</strong> : maîtrisez les sigles et termes clés (ISO 29148, FURPS+, RACI, Connextra, MoSCoW, WSJF, RTM, BDD, INVEST, CCB).</li>',
      '      <li><strong>Détail des calculs</strong> : explicitez toujours la formule littérale avant l’application numérique (Yamane, WSJF, pourcentages MoSCoW).</li>',
      '    </ul>'
    ].join('\n')),
    htmlSujets,
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../atelier.html', label: 'Atelier de code' }),
    disclaimer(course)
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Sujets d’examen blanc corrigés pour le cours Ingénierie du besoin B2 : ISO 29148, FURPS+, élicitation, Connextra, MoSCoW, WSJF, RTM et gestion du changement CCB.',
      active: 'simulateur',
      body
    }
  };
}

/* ======================== Exercices & Projet ======================== */

function exercices(course) {
  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices pratiques &amp; projet fil conducteur</h1>',
    '  <p class="lead">18 ateliers de programmation Python répartis sur les six chapitres du cours, complétés ' +
    'par le cas pratique guidé de l’ingénierie des exigences pour la plateforme de télémédecine <strong>MediConnect</strong>.</p>',

    box('objectifs', 'Le catalogue des 18 exercices Python interactifs', 'target', [
      '    <ul>',
      '      <li><strong>Chapitre 1</strong> : Classificateur de fiches problème vs solution, analyseur de positionnement Mendelow, vérificateur d’unicité Accountable RACI.</li>',
      '      <li><strong>Chapitre 2</strong> : Classificateur d’exigences FURPS+, détecteur de termes vagues et interdits, auditeur de critères SMART.</li>',
      '      <li><strong>Chapitre 3</strong> : Calculateur d’échantillon d’enquête Taro Yamane, formateur de fiche Persona, matrice de sélection des techniques d’élicitation.</li>',
      '      <li><strong>Chapitre 4</strong> : Parseur et validateur de User Story Connextra, répartiteur budgétaire MoSCoW 60/20/20, calculateur de priorité économique WSJF.</li>',
      '      <li><strong>Chapitre 5</strong> : Générateur et vérificateur d’identifiants IEEE, auditeur de matrice de traçabilité RTM amont/aval, validateur de syntaxe Gherkin BDD.</li>',
      '      <li><strong>Chapitre 6</strong> : Évaluateur de grille qualité INVEST, calculateur de score d’impact de Change Request (CR), gestionnaire de versions Baseline.</li>',
      '    </ul>',
      '    <p><a class="btn" href="../atelier.html">' + ic('terminal') + ' Ouvrir l’atelier libre</a></p>'
    ].join('\n')),

    '  <h2>Projet fil conducteur : Dossier de Spécification SRS « MediConnect »</h2>',
    '  <p class="lead">Ce projet applique concrètement l’ensemble des techniques du cours pour concevoir ' +
    'le référentiel d’exigences complet d’une plateforme médicale certifiée HDS (Hébergement de Données de Santé).</p>',

    box('it', 'Phase 1 : Cadrage des parties prenantes &amp; Matrice RACI', 'compass', [
      '    <p>Cartographier l’écosystème médical et réglementaire :</p>',
      '    <ul>',
      '      <li>Positionner les Médecins, Patients, la DSI hospitalière, l’ANSSI et la CNIL dans la matrice de Mendelow.</li>',
      '      <li>Établir la matrice RACI des livrables de cadrage en désignant un unique Accountable par tâche.</li>',
      '      <li>Distinguer les objectifs stratégiques de la direction des contraintes techniques d’hébergement sécurisé.</li>',
      '    </ul>'
    ].join('\n')),

    box('it', 'Phase 2 : Élicitation terrain &amp; Fiches Personas', 'wrench', [
      '    <p>Conduire la campagne de recueil des besoins :</p>',
      '    <ul>',
      '      <li>Modéliser deux personas contrastés : le Dr Moreau (médecin généraliste débordé) et Marc (patient âgé peu technophile).</li>',
      '      <li>Mener une séance de shadowing en cabinet pour identifier les contournements manuels actuels (carnets papier, rappels SMS personnels).</li>',
      '      <li>Dimensionner l’enquête de satisfaction auprès des 12 000 patients du réseau via la formule de Yamane.</li>',
      '    </ul>'
    ].join('\n')),

    box('it', 'Phase 3 : Backlog produit &amp; Arbitrage MoSCoW / WSJF', 'play', [
      '    <p>Structurer et ordonnancer le backlog agile :</p>',
      '    <ul>',
      '      <li>Rédiger 20 User Stories Connextra dotées de critères d’acceptation mesurables.</li>',
      '      <li>Appliquer la règle MoSCoW 60/20/20 pour sécuriser la release du MVP (Minimum Viable Product).</li>',
      '      <li>Calculer les scores WSJF pour prioriser la télétransmission sécurisée face à la prise de rendez-vous en ligne.</li>',
      '    </ul>'
    ].join('\n')),

    box('it', 'Phase 4 : Spécification SRS ISO 29148 &amp; BDD Gherkin', 'code', [
      '    <p>Rédiger le cahier des charges contractuel et les tests exécutables :</p>',
      '    <pre><code># Scénario BDD Gherkin : Prise de rendez-vous en ligne\nFonctionnalité: Réservation de créneau de consultation\n  Scénario: Réservation confirmée avec rappel SMS automatique\n    Étant donné que le Dr Moreau a un créneau libre le "15/10/2026 à 14:30"\n    Quand le patient sélectionne ce créneau et valide le motif "Consultation générale"\n    Alors le statut du créneau devient "Réservé"\n    Et un SMS de confirmation contenant le code d’accès est émis vers le mobile du patient</code></pre>'
    ].join('\n')),

    box('it', 'Phase 5 : Matrice RTM, Baseline &amp; Change Control Board', 'alert', [
      '    <p>Sécuriser la traçabilité et l’évolution du système :</p>',
      '    <ul>',
      '      <li>Construire la matrice RTM liant besoins sources, identifiants <code>MEDI-RDV-FR-XXX</code>, code et tests BDD.</li>',
      '      <li>Figer la <strong>Baseline v1.0</strong> avant le lancement des développements.</li>',
      '      <li>Mettre en place la procédure de Change Request (CR) et le comité CCB pour traiter l’ajout de la visio WebRTC.</li>',
      '    </ul>'
    ].join('\n')),

    chnav({ href: '../chapitres/formules.html', label: 'Mémo Ingénierie du besoin' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course)
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices & projet — ' + course.brand,
      description: 'Catalogue des 18 exercices Python et cahier des charges du projet SRS MediConnect pour le cours Ingénierie du besoin B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
