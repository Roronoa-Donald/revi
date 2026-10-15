/**
 * Pages « examens blancs » et « exercices & projet » du cours « Masterclass Apprendre à apprendre » B2.
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 : Neurobiologie, Illusion de Compétence &amp; Répétition Espacée',
      intro: 'Évaluation théorique et appliquée : architecture mnésique, diagnostic d’illusion cognitive, calculs SM-2 et encodage spatial.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Mémoire de Travail &amp; Chunking',
          text: 'Un étudiant en informatique tente d’apprendre par cœur une suite de 16 chiffres hexadécimaux bruts (ex. <code>4F A2 89 1B C0 7E 3D 95</code>) en 30 secondes et échoue systématiquement. Expliquez les contraintes neurobiologiques de la mémoire de travail (George Miller, Nelson Cowan) à l’origine de cet échec. Proposez une technique de chunking structurée permettant de surmonter cette limite.',
          sol: 'Selon les travaux de Nelson Cowan (2001), la mémoire de travail humaine sans répétition active ne peut manipuler que <strong>4 &plusmn; 1 items indépendants (chunks)</strong> simultanément. Une séquence de 16 octets isolés dépasse massivement cette capacité et sature le cortex préfrontal.<br>' +
            'Pour surmonter cette contrainte, la technique du <strong>chunking</strong> consiste à regrouper ces items en unités sémantiques connectées à la mémoire à long terme : par exemple, regrouper les octets par blocs de 4 sous forme d’adresses réseau IPv6 familières ou associer chaque paire d’octets à un repère visuel/narratif (ex. <code>4F</code> = code ASCII d’une lettre, <code>C0</code> = masque sous-réseau standard). Le nombre d’unités manipulées passe alors de 16 à 4 chunks, respectant la limite de la mémoire de travail.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Testing Effect &amp; Protocole Feynman',
          text: 'Deux étudiants préparent un examen sur le protocole TCP : l’étudiant A relit 4 fois son cours avec un surligneur jaune ; l’étudiant B lit le cours une seule fois, puis ferme son livre et tente d’expliquer le "Three-Way Handshake" par écrit avec des mots simples (technique Feynman). Comparez les résultats prévisibles à 7 jours d’après les travaux de Roediger &amp; Karpicke (2006). Détaillez les 4 étapes de la méthode Feynman.',
          sol: 'D’après l’étude de Roediger &amp; Karpicke (2006) sur le <em>Testing Effect</em>, l’étudiant A sera victime de l’<strong>illusion de compétence</strong> (fluidité de lecture confondue avec la maîtrise) : sa rétention à 7 jours chutera sous 30 %. L’étudiant B, en mobilisant un <strong>rappel actif</strong>, force ses circuits neuronaux à reconstruire la trace mnésique, atteignant plus de 75 % de rétention.<br>' +
            'Les 4 étapes de la Technique Feynman sont :<br>' +
            '1. <em>Définir le concept</em> : écrire son titre en haut d’une feuille blanche.<br>' +
            '2. <em>Vulgariser</em> : l’expliquer par écrit comme à un novice de 12 ans sans jargon technique.<br>' +
            '3. <em>Diagnostiquer</em> : repérer précisément les zones d’hésitation, de flou conceptuel ou d’oubli.<br>' +
            '4. <em>Clarifier et simplifier</em> : retourner aux sources documentaires pour boucher les lacunes et forger une analogie concrète (ex. l’appel téléphonique pour le handshake TCP).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Loi d’Ebbinghaus &amp; Algorithme SM-2',
          text: 'Soit une flashcard dont la force de mémoire initiale permet une rétention R(t) = e^(-t/S) avec S = 4 jours. Calculez la probabilité de rétention après 4 jours, puis après 8 jours. Un étudiant révise cette carte avec un facteur d’aisance EF initial de 2.5 et attribue une note de qualité q = 4. Calculez le nouveau facteur d’aisance EF\' selon l’algorithme SM-2 et déterminez le 3ème intervalle de révision sachant que I(2) = 6 jours.',
          sol: '1. Calculs de rétention selon la loi d’Ebbinghaus :<br>' +
            '- À t = 4 jours : <code>R(4) = e^(-4/4) = e^(-1) &asymp; 0,368</code> soit environ <strong>36,8 %</strong>.<br>' +
            '- À t = 8 jours : <code>R(8) = e^(-8/4) = e^(-2) &asymp; 0,135</code> soit environ <strong>13,5 %</strong>.<br>' +
            '2. Calcul du facteur d’aisance SM-2 :<br>' +
            'Formule : <code>EF\' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))</code>.<br>' +
            'Avec q = 4 : <code>5 - q = 1</code>. On a <code>EF\' = 2.5 + (0.1 - 1 * (0.08 + 1 * 0.02)) = 2.5 + (0.1 - 0.10) = 2.50</code>.<br>' +
            'Le facteur d’aisance reste inchangé à <strong>2.50</strong>.<br>' +
            '3. Calcul de l’intervalle I(3) :<br>' +
            '<code>I(3) = round(I(2) * EF\') = round(6 * 2.50) = 15 jours</code>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Méthode des Loci &amp; Double Codage',
          text: 'Vous devez mémoriser dans l’ordre exact les 7 couches du modèle OSI (Physique, Liaison, Réseau, Transport, Session, Présentation, Application). Construisez un palais de la mémoire complet en 7 loci au sein d’un lieu familier de votre choix. Pour chaque locus, décrivez l’image mentale multisensorielle créée en justifiant son efficacité selon la théorie du double codage de Paivio.',
          sol: 'Exemple de palais mnésique dans un appartement familier (parcours horaire) :<br>' +
            '1. <em>Palier (Physique)</em> : un câble Ethernet géant en cuivre incandescent qui bloque la serrure.<br>' +
            '2. <em>Entrée (Liaison)</em> : un camion de ponton qui dépose des "trames" de bois étiquetées avec des adresses MAC.<br>' +
            '3. <em>Couloir (Réseau)</em> : un agent de circulation en uniforme bleu qui distribue des panneaux d’adresses IP clignotantes.<br>' +
            '4. <em>Salon (Transport)</em> : un train de fret miniature en furie qui numérote des wagons et vérifie chaque accusé de réception ACK.<br>' +
            '5. <em>Table basse (Session)</em> : un arbitre qui tape dans ses mains pour ouvrir et clore solennellement un dialogue entre deux micros.<br>' +
            '6. <em>Canapé (Présentation)</em> : un traducteur polyglotte en costume qui déchiffre des hiéroglyphes chiffrés en SSL/TLS et compresse des ballons.<br>' +
            '7. <em>Fenêtre (Application)</em> : un navigateur web flottant en néon d’où s’échappent des courriels et des pages HTML fumantes.<br>' +
            '<em>Justification Paivio</em> : l’association d’un repère spatial (locus) et d’une scène visuelle/émotionnelle dynamique active simultanément le système imagé et le système verbal, créant deux voies d’accès indépendantes pour la récupération.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 : Pratique Délibérée, Calibration Métacognitive &amp; Chronobiologie',
      intro: 'Sujet d’expertise : découpage d’objectifs Ericsson, règle des 85%, calcul du score de Brier et régulation ultradienne.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Audit de Pratique Délibérée &amp; Zone des 85 %',
          text: 'Un développeur passe 4 heures par jour à coder des fonctions CRUD basiques qu’il maîtrise déjà parfaitement sans jamais consulter de tests ni demander de revue. Pourquoi cette pratique ne conduit-elle à aucune progression selon K. Anders Ericsson ? S’il décide de s’entraîner sur des problèmes de graphes complexes et n’obtient que 30 % de réussite, analysez sa situation selon la règle des 85 % (Wilson et al., 2019).',
          sol: '1. <em>Audit Ericsson</em> : la répétition mécanique d’une tâche automatisée relève du <strong>jeu naïf</strong> ou de l’exécution routinière. La pratique délibérée exige impérativement : (a) de sortir de la zone de confort pour travailler dans la zone proximale de développement, (b) un objectif micro-spécifique, (c) une boucle de rétroaction immédiate (linter, tests, relecture). Sans ces piliers, l’expertise stagne sur un plateau d’arrêt.<br>' +
            '2. <em>Analyse de la règle des 85 %</em> : avec 30 % de réussite (70 % d’échecs), le développeur est en <strong>surcharge cognitive majeure</strong>. La règle de Wilson et al. (2019) démontre que le gradient d’apprentissage optimal se situe à un taux d’erreur de <strong>15 % &plusmn; 2 %</strong> (85 % de réussite). À 30 % de succès, le cerveau ne parvient pas à discriminer les signaux correctifs du bruit, générant de la frustration et un encodage parasité. Il doit redescendre à un palier intermédiaire (ex. algorithmes de BFS/DFS simples) pour restaurer un taux d’erreur proche de 15 %.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Entrelacement (Interleaving) vs Pratique Massée',
          text: 'Pour préparer une épreuve d’algorithmique portant sur le tri rapide, les arbres binaires et la programmation dynamique, un étudiant hésite entre deux stratégies : (A) consacrer 3 jours consécutifs au tri, puis 3 jours aux arbres, puis 3 jours à la programmation dynamique ; (B) résoudre chaque jour 1 problème de tri, 1 problème d’arbre et 1 de programmation dynamique mélangés au hasard. Comparez la performance immédiate à l’entraînement et la performance lors du concours final.',
          sol: 'Stratégie A (Pratique massée / bloquée) : procure un sentiment artificiel de fluidité immédiate pendant l’entraînement car l’apprenant sait d’avance quel algorithme appliquer. Mais elle ne développe aucune compétence de <strong>sélection discriminante</strong>. Lors du concours, face à un énoncé inédit, la performance s’effondre.<br>' +
            'Stratégie B (Entrelacement / Interleaving) : introduit des <em>difficultés désirables</em> (Bjork). La performance perçue à l’entraînement semble plus laborieuse et heurtée, car chaque exercice impose de diagnostiquer d’abord la nature du problème avant de choisir l’algorithme adapté. En revanche, lors de l’examen final, l’entrelacement produit une rétention et une capacité de transfert nettement supérieures (+40 % à +80 % dans la littérature cognitive).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Score de Brier &amp; Calibration Métacognitive',
          text: 'Un étudiant s’auto-évalue sur 4 questions d’examen. Pour chacune, il formule une probabilité subjective de réussite (f) puis constate le résultat réel (o = 1 si réussi, 0 si échoué) :<br>- Q1 : f1 = 0,90, résultat o1 = 1<br>- Q2 : f2 = 0,80, résultat o2 = 0<br>- Q3 : f3 = 0,70, résultat o3 = 1<br>- Q4 : f4 = 0,60, résultat o4 = 0<br>Calculez le score de Brier de cet étudiant. Interprétez sa calibration métacognitive.',
          sol: 'Formule du score de Brier : <code>B = (1 / N) * &sum; (f_i - o_i)^2</code> avec N = 4.<br>' +
            '- Q1 : <code>(0,90 - 1)^2 = (-0,10)^2 = 0,01</code><br>' +
            '- Q2 : <code>(0,80 - 0)^2 = (0,80)^2 = 0,64</code><br>' +
            '- Q3 : <code>(0,70 - 1)^2 = (-0,30)^2 = 0,09</code><br>' +
            '- Q4 : <code>(0,60 - 0)^2 = (0,60)^2 = 0,36</code><br>' +
            'Somme des écarts au carré : <code>0,01 + 0,64 + 0,09 + 0,36 = 1,10</code>.<br>' +
            'Score de Brier : <code>B = 1,10 / 4 = 0,275</code>.<br>' +
            '<em>Interprétation</em> : un score de Brier de 0,275 est supérieur à 0,25 (qui correspond à des prédictions totalement aléatoires à 50/50). L’étudiant présente un fort <strong>biais de surconfiance (overconfidence)</strong>, notamment sur les questions Q2 et Q4 où il s’estimait très confiant (80 % et 60 %) tout en échouant. Sa métacognition doit être recalibrée d’urgence par des tests à blanc objectifs.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Chronobiologie, Pomodoro &amp; Sommeil Profond',
          text: 'Décrivez la structuration optimale d’une journée d’étude de 8 heures en intégrant les rythmes ultradiens (cycles BRAC), la technique Pomodoro et les impératifs neurophysiologiques du sommeil à ondes lentes (SWS) pour la consolidation synaptique.',
          sol: '1. <em>Structuration de la journée</em> :<br>' +
            '- Diviser les 8 heures en 4 blocs de 90 minutes de travail intensif (cycles BRAC de Kleitman), séparés par 20 à 30 minutes de repos véritable (marche sans écran, respiration, hydratation).<br>' +
            '- Au sein de chaque bloc de 90 min : appliquer 3 sessions Pomodoro de 25 min de focus profond / 5 min de pause réflexive.<br>' +
            '- Placer les matières complexes (mathématiques, algorithmique) en matinée (pic de vigilance préfrontal) et les tâches de synthèse créative ou révision légère en fin d’après-midi.<br>' +
            '2. <em>Consolidation nocturne</em> :<br>' +
            '- Le sommeil à ondes lentes (stades 3 et 4 NREM) assure la <strong>réactivation synaptique hippocampique</strong> qui transfère les informations déclaratives vers le néocortex.<br>' +
            '- Bannir les écrans bleus 90 min avant le coucher pour préserver la sécrétion de mélatonine.<br>' +
            '- Une nuit complète de 7 h 30 à 8 h permet d’enchaîner 5 cycles de 90 min, maximisant à la fois la consolidation déclarative (ondes lentes en début de nuit) et la mémoire procédurale / créative (sommeil paradoxal en fin de nuit).'
        }
      ]
    }
  ];

  const htmlSujets = sujets.map((s, idx) => {
    const itemsHtml = s.items.map(it => [
      '    <div class="exam-item">',
      '      <div class="exam-item-head">',
      '        <span class="exam-item-num">' + it.num + '</span>',
      '        <span class="badge">' + it.badge + '</span>',
      '      </div>',
      '      <p class="exam-item-text">' + it.text + '</p>',
      '      <details class="solution-toggle">',
      '        <summary>Voir le corrigé détaillé</summary>',
      '        <div class="solution-content">',
      '          <p>' + it.sol + '</p>',
      '        </div>',
      '      </details>',
      '    </div>'
    ].join('\n')).join('\n');

    return [
      '  <div class="exam-block">',
      '    <h2>' + s.title + '</h2>',
      '    <p class="lead">' + s.intro + '</p>',
      itemsHtml,
      '  </div>'
    ].join('\n');
  }).join('\n\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens blancs' }]),
    '  <h1>Examens blancs — Masterclass Apprendre à apprendre</h1>',
    '  <p class="lead">Deux épreuves complètes corrigées de niveau B2 pour tester votre maîtrise opérationnelle ' +
    'des mécanismes d’apprentissage, de mémorisation spatiale, de programmation d’intervalles et de métacognition.</p>',
    disclaimer('Ces sujets synthétisent les standards des sciences cognitives modernes (Sweller, Ericsson, Ebbinghaus, Roediger, Paivio, Flavell) appliqués à l’ingénierie et au développement logiciel.'),
    htmlSujets,
    chnav({ href: 'exercices.html', label: 'Exercices et projet' }, { href: '../sommaire.html', label: 'Sommaire' })
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs corrigés — ' + course.brand,
      description: 'Deux examens blancs complets et corrigés pour valider vos compétences en sciences cognitives, méthodes de mémorisation et métacognition.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices & Projet ======================== */

function exercices(course) {
  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices & Projet' }]),
    '  <h1>Exercices d’application &amp; Projet intégrateur</h1>',
    '  <p class="lead">Mettez en pratique vos acquis à travers des ateliers d’application ciblés et réalisez ' +
    'le grand projet intégrateur : concevoir et expérimenter votre propre <strong>Protocole d’Apprentissage Haute Performance (PAHP)</strong>.</p>',

    '  <h2>Ateliers d’application ciblés</h2>',

    box('info', 'Atelier 1 — Découpage en Chunks &amp; Réduction de Charge Cognitive', [
      '<p><strong>Énoncé :</strong> Prenez un sujet technique dense que vous devez maîtriser (par exemple, les 14 commandes fondamentales de Git avec leurs drapeaux avancés). ' +
      'Identifiez la charge extrinsèque de vos supports actuels et restructurez ce corpus en exactement 4 chunks fonctionnels sémantiquement cohérents.</p>',
      '<p><strong>Livrable attendu :</strong> Un tableau comparatif montrant l’organisation brute initiale versus la nouvelle taxonomie en 4 unités cognitives avec justifications.</p>'
    ].join('\n')),

    box('tip', 'Atelier 2 — Rédaction d’une Fiche Feynman Infaillible', [
      '<p><strong>Énoncé :</strong> Choisissez l’un des concepts informatiques suivants : l’algorithme de consensus Raft, le garbage collector en Java, ou le chiffrement asymétrique RSA. ' +
      'Rédigez une explication complète en 300 mots maximum sans employer aucun des mots suivants : "algorithme", "processus", "clé", "sécurité", "automatique".</p>',
      '<p><strong>Critère de réussite :</strong> L’explication doit être immédiatement comprise par une personne non-technique sans créer de contre-sens scientifique.</p>'
    ].join('\n')),

    box('warning', 'Atelier 3 — Implémentation d’un Planificateur SM-2 en Python', [
      '<p><strong>Énoncé :</strong> Écrivez un script Python qui prend en entrée une collection de cartes avec leur historique de révisions (intervalles, facteurs EF, notes attribuées) ' +
      'et calcule automatiquement la date exacte de la prochaine révision pour chaque carte selon l’algorithme SM-2.</p>',
      '<p><strong>Extension :</strong> Ajoutez une alerte automatique si le nombre de cartes prévues un même jour dépasse la capacité attentionnelle maximale (seuil fixé à 50 cartes/jour).</p>'
    ].join('\n')),

    '  <h2>Projet intégrateur : Protocole d’Apprentissage Haute Performance (PAHP)</h2>',
    '  <p>Ce projet grandeur nature consiste à concevoir, exécuter et documenter scientifiquement un protocole d’apprentissage intensif de 3 semaines sur une compétence informatique nouvelle de niveau B2.</p>',

    box('standard', 'Cahier des charges du Projet PAHP', [
      '<h3>1. Phase de Cadrage &amp; Diagnostic Pré-test (Semaine 1)</h3>',
      '<ul>',
      '  <li>Choix d’un sujet cible délimité (ex. programmation fonctionnelle en Rust, administration Kubernetes, ou analyse d’exploits binaires).</li>',
      '  <li>Passage d’un pré-test standardisé de 20 questions avec auto-évaluation de confiance sur chaque réponse (calcul du score de Brier initial).</li>',
      '  <li>Cartographie de la compétence selon la taxonomie de Bloom révisée (de la mémorisation à l’évaluation critique).</li>',
      '</ul>',
      '<h3>2. Phase d’Encodage &amp; Double Codage (Semaine 2)</h3>',
      '<ul>',
      '  <li>Construction d’un paquet de 40 flashcards atomiques respectant les règles de Wozniak (question univoque, réponse &lt; 1 ligne).</li>',
      '  <li>Création d’un palais de mémoire (méthode des Loci) de 10 étapes minimum pour ancrer la chaîne d’exécution principale du système.</li>',
      '  <li>Rédaction de 3 fiches Feynman vulgarisant les concepts pivots les plus abstraits.</li>',
      '</ul>',
      '<h3>3. Phase de Pratique Délibérée &amp; Régulation Métacognitive (Semaine 3)</h3>',
      '<ul>',
      '  <li>Entraînement quotidien selon la règle des 85 % avec ajustement dynamique de la difficulté des exercices de code.</li>',
      '  <li>Mise en œuvre de l’entrelacement (interleaving) entre 3 types de bugs ou problèmes distincts.</li>',
      '  <li>Journal de bord chronobiologique : corrélation entre les blocs Pomodoro, la durée du sommeil et les performances de rétention.</li>',
      '</ul>',
      '<h3>4. Phase d’Évaluation Post-test &amp; Bilan d’Efficacité</h3>',
      '<ul>',
      '  <li>Passage du post-test miroir de 20 questions avec nouveau calcul du score de Brier (gain de calibration).</li>',
      '  <li>Calcul du facteur d’accélération mnésique et rédaction d’un rapport d’analyse critique de 4 à 6 pages.</li>',
      '</ul>'
    ].join('\n')),

    box('info', 'Barème d’évaluation du Projet PAHP (Total : 20 points)', [
      '<table class="table">',
      '  <thead><tr><th>Critère d’évaluation</th><th>Barème</th><th>Description du livrable</th></tr></thead>',
      '  <tbody>',
      '    <tr><td><strong>Rigueur diagnostique &amp; Métacognition</strong></td><td>4 pts</td><td>Pré-test complet, calcul initial du score de Brier, analyse lucide des biais d’illusion de compétence.</td></tr>',
      '    <tr><td><strong>Qualité de l’Encodage &amp; Loci</strong></td><td>4 pts</td><td>Flashcards atomiques irréprochables, palais mental cohérent et fiches Feynman dépourvues de jargon.</td></tr>',
      '    <tr><td><strong>Implémentation Pratique &amp; SM-2</strong></td><td>5 pts</td><td>Application scrupuleuse des intervalles SM-2, pratique délibérée dans la zone des 85 %, sessions entrelacées.</td></tr>',
      '    <tr><td><strong>Journal Chronobiologique</strong></td><td>3 pts</td><td>Traçabilité des blocs Pomodoro, respect des rythmes ultradiens et suivi de la qualité du sommeil.</td></tr>',
      '    <tr><td><strong>Analyse Critique &amp; Post-test</strong></td><td>4 pts</td><td>Évolution chiffrée du score de Brier, analyse des échecs résiduels et plan d’amélioration continue.</td></tr>',
      '  </tbody>',
      '</table>'
    ].join('\n')),

    chnav({ href: 'formules.html', label: 'Mémo des sciences cognitives' }, { href: 'examens.html', label: 'Examens blancs corrigés' })
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Exercices d’application &amp; Projet PAHP — ' + course.brand,
      description: 'Ateliers pratiques de sciences cognitives, mise en place d’un palais mental et grand projet intégrateur PAHP noté sur 20.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
