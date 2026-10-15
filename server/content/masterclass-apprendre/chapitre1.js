/**
 * Chapitre 1 du cours « Masterclass Apprendre à apprendre » B2 — Neurobiologie & Architecture des Mémoires.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Neurobiologie &amp; Architecture des Mémoires',
  short: 'Neurobiologie &amp; Mémoires',
  toc: 'Architecture mnésique d’Atkinson-Shiffrin, mémoire de travail, théorie de la charge cognitive de Sweller et consolidation synaptique.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Trop d’étudiants abordent leurs études d’ingénierie comme si le cerveau était un enregistreur passif. ' +
    'Ils passent des heures à relire des pages sans comprendre pourquoi 80 % des informations s’évaporent ' +
    'en 48 heures. Comprendre l’architecture neurobiologique de la mémoire humaine et ses limites structurales ' +
    'est la première étape indispensable pour apprendre deux fois plus vite avec deux fois moins de fatigue.',

  objectives: [
    'distinguer avec rigueur les trois registres de mémoire : sensorielle, de travail et à long terme ;',
    'comprendre le goulot d’étranglement de la mémoire de travail et la loi de Miller ($7 \\pm 2$ chunks) ;',
    'maîtriser la théorie de la charge cognitive de John Sweller (charges intrinsèque, extrinsèque et germane) ;',
    'analyser le rôle de la neuroplasticité synaptique (règle de Hebb) et de la myélinisation dans l’expertise ;',
    'optimiser les phases de sommeil lent profond et paradoxal pour la consolidation mnésique nocturne.'
  ],

  sections: [
    {
      title: 'L’architecture modulaire de la mémoire : modèle d’Atkinson &amp; Shiffrin',
      html: [
        '<p>Le cerveau humain ne stocke pas les informations dans un disque dur monolithique. Selon le modèle fondamental ' +
        'de <strong>Richard Atkinson et Richard Shiffrin</strong>, l’information traverse trois filtres successifs :</p>',
        '<ul>\n' +
        '  <li><strong>La mémoire sensorielle</strong> : capte instantanément les stimuli environnementaux (visuelle/iconique, auditive/échoïque). ' +
        'Sa durée est minuscule (200 ms à 1 seconde). Sans attention sélective immédiate, l’information disparaît à jamais.</li>\n' +
        '  <li><strong>La mémoire de travail (Working Memory)</strong> : l’espace de traitement conscient et actif. ' +
        'Modélisée par Alan Baddeley, elle comprend la boucle phonologique, le calepin visuo-spatial et l’administrateur central. ' +
        'Sa durée de rétention ne dépasse pas 20 à 30 secondes sans répétition subvocale.</li>\n' +
        '  <li><strong>La mémoire à long terme (LTM)</strong> : réservoir illimité et durable structuré en mémoire explicite ' +
        '(sémantique pour les concepts généraux, épisodique pour les souvenirs personnels) et mémoire implicite (procédurale pour les automatismes moteurs).</li>\n' +
        '</ul>',
        box('danger', 'Le goulot d’étranglement conscient', 'alert',
          '    <p>La mémoire de travail est le filtre le plus étroit de notre système cognitif. George A. Miller ' +
          'a quantifié son empan à <strong>$7 \\pm 2$ éléments d’information</strong> (souvent ramené à 4 par Nelson Cowan ' +
          'pour des concepts complexes). Tout débordement d’information non regroupée est immédiatement perdu.</p>')
      ].join('\n')
    },
    {
      title: 'La théorie de la charge cognitive de John Sweller',
      html: [
        '<p>Formulée à la fin des années 1980 par le psychologue australien <strong>John Sweller</strong>, ' +
        'la théorie de la charge cognitive (<em>Cognitive Load Theory</em>) est la clé de voûte de l’ingénierie pédagogique. ' +
        'La charge totale en mémoire de travail se décompose en trois éléments :</p>',
        '<div class="formule-box">\n' +
        '  $$\\text{Charge Totale} = \\text{Charge Intrinsèque} + \\text{Charge Extrinsèque} + \\text{Charge Germane}$$\n' +
        '</div>',
        '<ul>\n' +
        '  <li><strong>Charge Intrinsèque</strong> : inhérente à la difficulté du concept lui-même et au nombre d’interactions ' +
        'd’éléments simultanés (ex. comprendre le calcul d’un pointeur C ou un algorithme récursif). Elle ne peut être réduite ' +
        'qu’en découpant le problème en sous-schémas préalablement maîtrisés.</li>\n' +
        '  <li><strong>Charge Extrinsèque (Parasite)</strong> : causée par la mauvaise organisation du matériel d’étude, ' +
        'les bruits ambiants, les notifications de smartphone ou des explications embrouillées. Elle doit être <em>réduite à zéro</em>.</li>\n' +
        '  <li><strong>Charge Germane (Utile)</strong> : l’effort cognitif noble consacré à l’intégration, la généralisation et ' +
        'la construction de nouveaux schémas mentaux en mémoire à long terme. Elle doit être <em>maximisée</em>.</li>\n' +
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Neuroplasticité synaptique : la règle de Donald Hebb',
      html: [
        '<p>L’apprentissage physique correspond à une reconfiguration anatomique des réseaux neuronaux :</p>',
        '<blockquote>\n' +
        '  <em>« Neurons that fire together, wire together »</em> (Les neurones qui s’activent ensemble se connectent ensemble) — Donald Hebb, 1949.\n' +
        '</blockquote>',
        '<p>Lorsqu’une connexion synaptique est activée à plusieurs reprises lors d’un effort de réflexion, le phénomène de ' +
        '<strong>Potentialisation à Long Terme (LTP - Long-Term Potentiation)</strong> renforce l’efficacité de la transmission :</p>',
        '<ol>\n' +
        '  <li>Augmentation du nombre de récepteurs postsynaptiques (AMPA et NMDA).</li>\n' +
        '  <li>Sécrétion de neurotransmetteurs accrue dans la fente synaptique.</li>\n' +
        '  <li><strong>Myélinisation des axones</strong> : la gaine de myéline s’épaissit autour des axones fréquemment sollicités, ' +
        'multipliant jusqu’à 100 fois la vitesse de propagation de l’influx nerveux (passage de 2 m/s à plus de 100 m/s). ' +
        'C’est la base biologique des automatismes d’un expert.</li>\n' +
        '</ol>',
        box('astuce', 'Le rôle régénérateur du sommeil', 'lightbulb',
          '    <p>Pendant la journée, l’hippocampe sert de tampon temporaire fragile. La nuit, durant le <strong>sommeil lent profond</strong>, ' +
          'le cerveau réactive les circuits de la journée pour transférer les souvenirs vers le néocortex durable. ' +
          'Le <strong>sommeil paradoxal (REM)</strong> intègre ensuite ces nouvelles données dans le réseau sémantique préexistant. ' +
          'Bâcler son sommeil après une session de travail efface physiquement une part substantielle de l’apprentissage.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Selon le modèle d’Atkinson et Shiffrin, quel registre de mémoire possède la durée de rétention la plus courte ?', opts: ['La mémoire sensorielle (200 à 1 000 ms)', 'La mémoire de travail', 'La mémoire sémantique'], correct: 0, exp: 'La mémoire sensorielle s’efface en moins d’une seconde sans attention sélective immédiate.' },
    { stem: 'Quelle est la limite canonique de la mémoire de travail quantifiée par George Miller ?', opts: ['7 ± 2 éléments (chunks)', '150 connexions', 'Illimitée'], correct: 0, exp: 'L’empan mnésique conscient moyen de l’être humain est de 5 à 9 éléments distincts.' },
    { stem: 'Dans la théorie de John Sweller, comment qualifie-t-on la charge cognitive parasite due aux distractions et au désordre ?', opts: ['Charge extrinsèque', 'Charge intrinsèque', 'Charge germane'], correct: 0, exp: 'La charge extrinsèque est le bruit inutile généré par une mauvaise présentation ou un environnement perturbé.' },
    { stem: 'Quel mécanisme biologique formalise l’adage « les neurones qui s’activent ensemble se connectent ensemble » ?', opts: ['La potentialisation à long terme (règle de Donald Hebb)', 'La mitose cellulaire', 'L’osmose inverse'], correct: 0, exp: 'La règle de Hebb et la LTP consolident la liaison synaptique entre neurones co-activés.' },
    { stem: 'Quel constituant biologique accélère jusqu’à 100 fois la vitesse de l’influx nerveux le long des axones entraînés ?', opts: ['La gaine de myéline', 'L’hémoglobine', 'La mélatonine'], correct: 0, exp: 'La myélinisation isole les axones et permet la conduction saltatoire rapide de l’influx.' },
    { stem: 'Pendant quelle phase de sommeil le transfert mnésique de l’hippocampe vers le néocortex s’opère-t-il prioritairement ?', opts: ['Le sommeil lent profond', 'La somnolence légère d’endormissement', 'La phase d’insomnie'], correct: 0, exp: 'Le sommeil lent profond synchronise les ondes lentes pour transférer les souvenirs vers le cortex.' },
    { stem: 'Qu’est-ce qu’un « chunk » en sciences cognitives ?', opts: ['Un regroupement d’éléments élémentaires en une seule unité d’information signifiante', 'Un bogue informatique dans le noyau Linux', 'Une pause de 15 minutes'], correct: 0, exp: 'Le chunking (morcellement) réunit des données disjointes (ex. 06 12 34 au lieu de 0,6,1,2,3,4) pour économiser la mémoire de travail.' },
    { stem: 'Quelle composante de la charge cognitive l’enseignant ou l’étudiant cherche-t-il à maximiser ?', opts: ['La charge germane (utile à la construction de schémas mentaux)', 'La charge extrinsèque', 'La charge visuelle parasite'], correct: 0, exp: 'La charge germane correspond au traitement conscient noble qui crée des connexions durables.' }
  ],

  pitfalls: [
    'Croire que l’on peut mémoriser un cours complexe en multitâche avec musique, notifications ou vidéos en arrière-plan.',
    'Confondre vitesse de lecture superficielle et capacité réelle de traitement en mémoire de travail.',
    'Négliger le sommeil après avoir révisé, ce qui empêche la consolidation synaptique et le transfert vers le néocortex.',
    'Tenter d’apprendre des concepts interdépendants sans avoir au préalable automatisé les prérequis élémentaires (surcharge intrinsèque).',
    'Penser que la mémoire est figée à l’âge adulte, en ignorant le potentiel de neuroplasticité permanente du cerveau.'
  ],

  methodTitle: 'Protéger sa mémoire de travail lors d’une session d’étude',
  method: [
    '<strong>Éliminer toute charge extrinsèque</strong> : couper les notifications, éloigner le smartphone et ranger son espace de travail.',
    '<strong>Décomposer la charge intrinsèque</strong> : scinder les concepts complexes en sous-blocs unitaires avant de tenter de les assembler.',
    '<strong>Pratiquer le chunking immédiat</strong> : regrouper les données brutes en acronymes, règles logiques ou familles signifiantes.',
    '<strong>Réserver la charge germane</strong> : verbaliser l’explication avec ses propres mots pour forcer la construction de schémas mentaux.',
    '<strong>Respecter les cycles de sommeil</strong> : s’assurer d’au moins 7 à 8 heures de sommeil réparateur après chaque journée d’apprentissage intense.'
  ],

  summary: [
    'L’information transite de la mémoire sensorielle vers la mémoire de travail, puis vers la mémoire à long terme.',
    'La mémoire de travail est limitée à $7 \\pm 2$ chunks d’information pendant une trentaine de secondes.',
    'La théorie de Sweller impose de supprimer la charge extrinsèque pour libérer la charge germane structurante.',
    'La répétition synaptique et la myélinisation (loi de Hebb) transforment l’effort conscient en automatisme fluide.',
    'Le sommeil lent profond et le sommeil paradoxal sont indispensables pour ancrer les souvenirs dans le néocortex.'
  ],

  checklist: [
    'Je connais les caractéristiques et durées des trois registres mnésiques.',
    'Je sais expliquer la loi de Miller et le rôle du chunking.',
    'Je sais identifier et distinguer les trois composantes de la charge cognitive de Sweller.',
    'Je comprends le principe biologique de la potentialisation à long terme (LTP).',
    'Je préserve mes cycles de sommeil pour garantir la consolidation nocturne.'
  ],

  notions: ['Mémoire sensorielle', 'Mémoire de travail', 'Mémoire à long terme', 'Empan de Miller', 'Chunking', 'Sweller', 'Charge intrinsèque', 'Charge extrinsèque', 'Charge germane', 'Loi de Hebb', 'Myélinisation'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise l’architecture d’Atkinson-Shiffrin et la charge cognitive de Sweller.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le chunking de Miller et les phases de sommeil.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les bases neurobiologiques de l’apprentissage.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à l’illusion de compétence et au rappel actif au chapitre 2.' }
  ],

  flashcards: [
    { q: 'Quels sont les 3 étages du modèle mnésique d’Atkinson et Shiffrin ?', a: 'La mémoire sensorielle (&lt; 1 s), la mémoire de travail (20-30 s, 7 chunks) et la mémoire à long terme (illimitée).' },
    { q: 'Quelle est la formule de la charge cognitive totale selon John Sweller ?', a: 'Charge Totale = Charge Intrinsèque (difficulté du contenu) + Charge Extrinsèque (parasite) + Charge Germane (utile).' },
    { q: 'Que stipule la règle de Donald Hebb (1949) ?', a: 'Les neurones qui s’activent ensemble se connectent ensemble (renforcement synaptique LTP).' },
    { q: 'Quel est l’empan moyen de la mémoire de travail selon George Miller ?', a: '7 ± 2 éléments distincts (chunks d’information).' },
    { q: 'À quoi sert la myélinisation des axones neuronaux ?', a: 'À isoler les fibres nerveuses pour multiplier jusqu’à 100 fois la vitesse de transmission des influx nerveux.' },
    { q: 'Pourquoi le sommeil est-il capital après une journée de cours ?', a: 'Le sommeil lent profond transfère les souvenirs de l’hippocampe vers le néocortex durable.' }
  ],

  next: {
    href: 'chapitre2.html',
    label: 'Chapitre 2 : L’Illusion de Compétence &amp; Le Rappel Actif'
  }
};
