/**
 * Chapitre 3 du cours « Masterclass Apprendre à apprendre » B2 — La Répétition Espacée & Algorithmes de Mémorisation.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'La Répétition Espacée &amp; Algorithmes de Mémorisation',
  short: 'Répétition Espacée',
  toc: 'Courbe de l’oubli d’Ebbinghaus, système de boîtes de Leitner, algorithme SM-2 de SuperMemo/Anki et gestion des intervalles optimaux.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Le bachotage intensif la veille d’un examen permet parfois de sauver les meubles le lendemain matin, ' +
    'mais deux semaines plus tard, tout est oublié. Le cerveau élimine impitoyablement les informations ' +
    'qui ne sont pas réactivées à intervalles réguliers. La répétition espacée (Spaced Repetition) est le seul ' +
    'moyen scientifiquement prouvé de contrer la courbe de l’oubli et d’ancrer des milliers de notions dans la durée.',

  objectives: [
    'analyser la courbe exponentielle de l’oubli modélisée par Hermann Ebbinghaus ;',
    'comprendre l’effet d’espacement (Spacing Effect) par rapport au regroupement massif (Cramming) ;',
    'concevoir et animer un système de révision physique ou numérique par boîtes de Leitner ;',
    'maîtriser l’algorithme mathématique SM-2 de Piotr Wozniak régissant les moteurs comme Anki ;',
    'calibrer les intervalles de réactivation pour intervenir exactement au moment où l’oubli commence.'
  ],

  sections: [
    {
      title: 'La courbe de l’oubli d’Hermann Ebbinghaus et l’effet d’espacement',
      html: [
        '<p>Dès 1885, le psychologue allemand <strong>Hermann Ebbinghaus</strong> a conduit les premières mesures ' +
        'expérimentales rigoureuses sur la mémoire humaine. Ses résultats mettent en évidence une dégradation exponentielle :</p>',
        '<div class="formule-box">\n' +
        '  $$R = e^{-\\frac{t}{S}}$$\n' +
        '</div>',
        '<p>où $R$ est la rétention mnésique, $t$ le temps écoulé, et $S$ la stabilité de la trace dans le néocortex.</p>',
        '<ul>\n' +
        '  <li><strong>Sans réactivation</strong> : 50 % des notions sont oubliées après 24 heures, et près de 80 % après 30 jours.</li>\n' +
        '  <li><strong>Avec réactivations espacées</strong> : chaque rappel réussi aplatit la courbe de l’oubli et multiplie la stabilité $S$. ' +
        'Après 4 ou 5 révisions judicieusement calées, la probabilité d’oubli devient quasi-nulle.</li>\n' +
        '</ul>',
        box('danger', 'L’illusion du bachotage (Cramming)', 'alert',
          '    <p>Réviser 8 heures d’affilée la veille d’un partiel sature temporairement la mémoire de travail mais ' +
          'ne permet aucune consolidation synaptique nocturne. Étudier 1 heure par jour pendant 8 jours espacés ' +
          'multiplie par quatre le taux de rétention à 6 mois pour un temps d’étude strictement identique.</p>')
      ].join('\n')
    },
    {
      title: 'Le système des boîtes de Sebastian Leitner',
      html: [
        '<p>Dans les années 1970, le journaliste scientifique allemand <strong>Sebastian Leitner</strong> propose ' +
        'une méthode mécanique pour concrétiser la répétition espacée à l’aide de flashcards rangées dans 5 compartiments :</p>',
        '<ul>\n' +
        '  <li><strong>Boîte 1 (Quotidien)</strong> : toutes les nouvelles cartes démarrent ici. Révision chaque jour.</li>\n' +
        '  <li><strong>Boîte 2 (Tous les 3 jours)</strong> : cartes franchissant avec succès la boîte 1.</li>\n' +
        '  <li><strong>Boîte 3 (Hebdomadaire)</strong> : révision 1 fois par semaine.</li>\n' +
        '  <li><strong>Boîte 4 (Bimensuelle)</strong> : révision tous les 15 jours.</li>\n' +
        '  <li><strong>Boîte 5 (Mensuelle)</strong> : les notions définitivement acquises.</li>\n' +
        '</ul>',
        '<p>La règle d’or de Leitner est asymétrique :</p>',
        '<blockquote>\n' +
        '  <strong>Succès</strong> : la carte avance d’une boîte ($B_{nouv} = \\min(5, B + 1)$).<br>\n' +
        '  <strong>Échec</strong> : la carte retombe <strong>immédiatement en Boîte 1</strong>, même si elle venait de la boîte 5 !\n' +
        '</blockquote>'
      ].join('\n')
    },
    {
      title: 'L’algorithme SM-2 de Piotr Wozniak (SuperMemo &amp; Anki)',
      html: [
        '<p>Conçu dans les années 1980 par le chercheur polonais <strong>Piotr Wozniak</strong>, l’algorithme <strong>SM-2</strong> ' +
        'calcule mathématiquement le jour optimal de révision pour chaque carte individuelle selon la facilité ressentie par l’utilisateur.</p>',
        '<p>L’apprenant note chaque restitution de 0 à 5 :</p>',
        '<table class="table-styled">\n' +
        '  <thead><tr><th>Note (q)</th><th>Signification</th><th>Conséquence algorithmique</th></tr></thead>\n' +
        '  <tbody>\n' +
        '    <tr><td>5</td><td>Réponse parfaite sans aucune hésitation</td><td>Facteur d’aisance augmenté (+0.10)</td></tr>\n' +
        '    <tr><td>4</td><td>Bonne réponse avec une légère hésitation</td><td>Facteur d’aisance maintenu stable</td></tr>\n' +
        '    <tr><td>3</td><td>Réponse correcte mais rappel laborieux</td><td>Facteur d’aisance diminué (-0.14)</td></tr>\n' +
        '    <tr><td>0, 1 ou 2</td><td>Échec, réponse erronée ou trou noir</td><td>Carte réinitialisée à J+1</td></tr>\n' +
        '  </tbody>\n' +
        '</table>',
        '<p>Le facteur de facilité (Easiness Factor $EF$, initialisé à 2.50 avec un plancher strict à 1.30) est mis à jour selon :</p>',
        '<div class="formule-box">\n' +
        '  $$EF\' = \\max\\left(1{,}30, \\; EF + (0{,}1 - (5 - q) \\cdot (0{,}08 + (5 - q) \\cdot 0{,}02))\\right)$$\n' +
        '</div>',
        '<p>L’intervalle $I(n)$ en jours progresse de manière géométrique : $I(1) = 1$, $I(2) = 6$, puis $I(n) = I(n-1) \\times EF$.</p>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Qui a formalisé mathématiquement pour la première fois la courbe exponentielle de l’oubli en 1885 ?', opts: ['Hermann Ebbinghaus', 'Sigmund Freud', 'Alan Turing'], correct: 0, exp: 'Hermann Ebbinghaus a publié les premières courbes quantitatives de rétention mnésique en 1885.' },
    { stem: 'Dans le système de boîtes de Leitner, que devient une carte située en boîte 4 si le rappel échoue ?', opts: ['Elle redescend immédiatement en Boîte 1', 'Elle recule en boîte 3', 'Elle est définitivement supprimée'], correct: 0, exp: 'Le système de Leitner sanctionne tout échec par un retour en boîte 1 pour forcer une réactivation quotidienne.' },
    { stem: 'Dans l’algorithme SM-2, quelle est la valeur minimale absolue (plancher) du facteur d’aisance EF ?', opts: ['1.30', '0.00', '2.50'], correct: 0, exp: 'Le plancher de 1.30 évite que l’intervalle ne stagne indéfiniment ou ne devienne négatif.' },
    { stem: 'Quelle note minimale (q) doit-on attribuer dans l’algorithme SM-2 pour considérer le rappel comme réussi ?', opts: ['3 sur 5 (réponse correcte avec effort)', '5 sur 5 uniquement', '1 sur 5'], correct: 0, exp: 'Les notes de 3 à 5 valident le rappel ; les notes 0, 1 et 2 réinitialisent la carte à l’étape d’apprentissage.' },
    { stem: 'Quel avantage majeur la répétition espacée offre-t-elle par rapport au bachotage intensif à volume horaire égal ?', opts: ['Elle aplatit la courbe de l’oubli et démultiplie la rétention à long terme', 'Elle dispense d’apprendre les définitions', 'Elle permet de ne pas dormir'], correct: 0, exp: 'L’espacement permet les phases de consolidation synaptique et préserve la mémoire pendant des mois.' },
    { stem: 'Quel logiciel libre et populaire utilise une variante moderne de l’algorithme SM-2 pour la répétition espacée ?', opts: ['Anki', 'LibreOffice Calc', 'VLC Media Player'], correct: 0, exp: 'Anki est le gestionnaire de flashcards algorithmique de référence basé sur le modèle SM-2 de Wozniak.' },
    { stem: 'Dans la formule d’Ebbinghaus $R = e^{-t/S}$, que représente la variable $S$ ?', opts: ['La stabilité de la trace mnésique (exprimée en jours)', 'Le score d’intelligence', 'La vitesse de frappe au clavier'], correct: 0, exp: 'S mesure la robustesse du souvenir : plus S est grand, plus la décroissance de la rétention est lente.' },
    { stem: 'Quel intervalle de révision la règle de Leitner préconise-t-elle généralement pour la boîte 5 ?', opts: ['Environ 30 jours (mensuel)', 'Toutes les heures', 'Une fois par an'], correct: 0, exp: 'La boîte 5 regroupe les concepts solides qui ne nécessitent plus qu’une vérification mensuelle de maintenance.' }
  ],

  pitfalls: [
    'Créer des centaines de flashcards en un jour puis abandonner l’application après une semaine sans régularité.',
    'Rédiger des flashcards trop longues ou chargées de texte au lieu d’appliquer le principe d’atomicité (une question = une réponse unitaire).',
    'Tricher sur l’auto-évaluation dans Anki en s’attribuant un 5 (« Facile ») alors que la réponse n’a été que devinée à moitié.',
    'Réviser les cartes toujours dans le même ordre séquentiel, ce qui crée un biais de dépendance au contexte.',
    'Attendre d’avoir complètement oublié un chapitre avant de programmer la première séance de révision espacée.'
  ],

  methodTitle: 'Construire son calendrier de répétition espacée',
  method: [
    '<strong>Découper le cours en unités atomiques</strong> : formuler des questions/réponses nettes ne comportant qu’une seule notion par carte.',
    '<strong>Programmer la première réactivation à J+1</strong> : revoir systématiquement les fiches du jour le lendemain matin.',
    '<strong>Échelonner les rappels</strong> : caler les rendez-vous suivants à J+3, J+7, J+14, puis J+30.',
    '<strong>Évaluer avec honnêteté</strong> : en cas d’hésitation même minime, dégrader la note dans l’algorithme sans complaisance.',
    '<strong>Purger et refactorer</strong> : réécrire ou scinder en deux les cartes qui retombent régulièrement en échec (les « sangsues » ou leeches).'
  ],

  summary: [
    'La courbe d’Ebbinghaus montre qu’en l’absence de rappel, la majorité des apprentissages disparaît en quelques jours.',
    'Chaque réactivation espacée aplatit la courbe de l’oubli et renforce la stabilité synaptique $S$.',
    'Le système de Leitner classe mécaniquement les fiches de la boîte 1 (quotidien) à la boîte 5 (mensuel).',
    'L’algorithme SM-2 ajuste dynamiquement le facteur d’aisance (EF) de chaque carte en fonction des scores de 0 à 5.',
    'L’atomicité des fiches est la condition absolue pour une pratique de répétition espacée fluide et efficace.'
  ],

  checklist: [
    'Je sais expliquer la fonction mathématique de la courbe de l’oubli d’Ebbinghaus.',
    'Je comprends les règles de promotion et de rétrogradation du système de Leitner.',
    'Je connais le rôle du facteur d’aisance EF dans l’algorithme SM-2.',
    'Je rédige des flashcards atomiques ne posant qu’une seule question univoque.',
    'J’ai intégré un rythme de révision espacé dans mon emploi du temps hebdomadaire.'
  ],

  notions: ['Ebbinghaus', 'Courbe de l’oubli', 'Stabilité mnésique', 'Répétition espacée', 'Spacing Effect', 'Système de Leitner', 'Piotr Wozniak', 'SM-2', 'Anki', 'Facteur d’aisance EF', 'Atomicité'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la formule d’Ebbinghaus et le fonctionnement des boîtes de Leitner.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le calcul du facteur EF dans SM-2 et l’espacement des rappels.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les mécanismes algorithmiques de l’ancrage durable.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe au double codage et aux cartes mentales au chapitre 4.' }
  ],

  flashcards: [
    { q: 'Quelle est la formule d’Ebbinghaus décrivant la rétention R dans le temps ?', a: 'R = exp(-t / S), où t est le temps écoulé et S la stabilité de la trace mnésique.' },
    { q: 'Que prévoit le système de Leitner en cas d’échec sur une carte en boîte 5 ?', a: 'La carte retombe immédiatement en boîte 1 pour un cycle de réactivation quotidienne.' },
    { q: 'Quels sont les facteurs clés de l’algorithme SM-2 de Wozniak ?', a: 'La note d’effort q (de 0 à 5), le facteur de facilité EF (minimum 1.30) et l’intervalle en jours I(n).' },
    { q: 'Pourquoi le bachotage intensif la veille d’un examen échoue-t-il à long terme ?', a: 'Il n’accorde aucun délai de consolidation synaptique et la trace s’effondre dès le lendemain.' },
    { q: 'Quelle est la règle d’or de formulation d’une flashcard ?', a: 'Le principe d’atomicité : une question courte, claire et une seule idée cible par carte.' },
    { q: 'À quelle fréquence doit-on idéalement programmer les premiers rappels ?', a: 'Généralement J+1 (lendemain), J+3, J+7, J+14, puis J+30.' }
  ],

  next: {
    href: 'chapitre4.html',
    label: 'Chapitre 4 : Organisation de la Pensée, Double Codage &amp; Cartes Mentales'
  }
};
