/**
 * Chapitres 1 à 3 du cours de Bureautique B1.
 *
 * Chapitre 1 : Word — l'interface et la saisie (ruban, onglets et groupes,
 *               modes d'affichage, sélection, enregistrement).
 * Chapitre 2 : Word — mise en forme et mise en page (alignements, retraits,
 *               orientation, raccourcis essentiels).
 * Chapitre 3 : Excel — la feuille de calcul (classeur et feuilles, barres de
 *               la fenêtre, alignement par défaut, gestion des feuilles).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code
 * (trois exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-bureautique.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Word : l\'interface et la saisie',
    short: 'Word — interface',
    toc: 'Le ruban et ses onglets ; les cinq modes d\'affichage ; la barre d\'état et le comptage des mots ; sélectionner au clavier et à la souris ; enregistrer sans perdre son travail.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Le support d\'AHADJI Katé Kékéli ouvre le traitement de texte par son ruban : des onglets ' +
      '(Accueil, Insertion, Mise en page, Références, Publipostage, Révision, Affichage) subdivisés en ' +
      'groupes. Savoir où vivre chaque commande — et enregistrer avant de fermer — est la première ' +
      'compétence du secrétariat.',

    objectives: [
      'situer les groupes dans leurs onglets : Presse-papiers et Police (Accueil), Tableaux (Insertion), Zoom (Affichage) ;',
      'retrouver les cinq modes d\'affichage et leur usage ;',
      'lire la barre d\'état : numéros de page, langue, zoom, statistiques ;',
      'sélectionner au clavier (Shift, F8, Ctrl+A) et à la souris (double-clic, Ctrl+clic) ;',
      'enregistrer par les trois méthodes du support, y compris à la fermeture.'
    ],

    sections: [
      {
        title: 'Le ruban : onglets et groupes',
        html: [
          '<p>MS Word sert à <strong>saisir, modifier, mettre en forme, ouvrir et sauvegarder</strong> un ' +
          'document. Son ruban comporte des onglets subdivisés en groupes : l\'onglet <strong>Accueil</strong> ' +
          'regroupe Presse-papiers, Police, Paragraphe, Style et Modification ; <strong>Insertion</strong> ' +
          'rassemble Pages, Tableaux, Illustrations, Liens, En-tête et pied, Texte, Symbole ; ' +
          '<strong>Mise en page</strong> tient Thèmes, Mise en page, Arrière-plan de page, Paragraphe et ' +
          'Organiser ; <strong>Références</strong> porte la table des matières, les notes de bas de page, les ' +
          'citations et légendes ; <strong>Publipostage</strong> gère la fusion ; <strong>Révision</strong> ' +
          'couvre vérification, commentaires, suivi et protection ; <strong>Affichage</strong> propose les ' +
          'modes d\'affichage, le zoom, la fenêtre et les macros.</p>',
          box('mnemo', 'Mnémotechnique — « Accueil des habitudes, Insertion des objets, Affichage des vues »', 'pin',
            '    <p>La commande quotidienne vit dans Accueil, ce qu\'on ajoute au document dans Insertion, ce ' +
            'qui change la façon de voir dans Affichage.</p>')
        ].join('\n')
      },
      {
        title: 'Modes d\'affichage et barre d\'état',
        html: [
          '<p>Cinq modes d\'affichage : <strong>Page</strong> (actif par défaut, le plus utilisé, montre les ' +
          'quatre marges de 2,5 cm), <strong>Lecture plein écran</strong> (le ruban disparaît), ' +
          '<strong>Web</strong> (pour créer des pages HTML), <strong>Plan</strong> (l\'enchaînement des titres ' +
          'd\'un long document) et <strong>Brouillon</strong> (défilement rapide, images masquées).</p>',
          '<p>La <strong>barre d\'état</strong>, juste sous le document, est entièrement configurable (clic ' +
          'droit) : numéro de page, langue, zoom, et l\'option <strong>Statistiques</strong> qui compte les ' +
          'mots « approximativement » — tout caractère précédé et suivi d\'un espace compte pour un mot : ' +
          '« il répond : 8 » est compté pour 6 mots, et « Ah ! » en vaut deux.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Le mode Page est le mode par défaut ; Web sert au HTML, pas à la lecture.</li>\n' +
            '      <li>Les marges par défaut font 2,5 cm des quatre côtés.</li>\n' +
            '      <li>Le compteur de mots est approximatif : les signes isolés comptent pour des mots.</li>\n' +
            '      <li>ESC sort du mode de sélection F8 ; Ctrl+A sélectionne tout le document.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Sélectionner et enregistrer',
        html: [
          '<p>Pour modifier une portion de texte, il faut d\'abord la <strong>sélectionner</strong> : au ' +
          'clavier — Shift + flèches, F8 successifs (mot, phrase, paragraphe, section, document), Ctrl+A — ' +
          'ou à la souris — double-clic sur un mot, Ctrl+clic dans une phrase, triple-clic (ou ' +
          'double-clic dans la marge) sur un paragraphe, clic dans la marge pour une ligne.</p>',
          '<p><strong>Enregistrer est la chose la plus importante</strong>, sinon tout est perdu à la ' +
          'fermeture. Premier enregistrement : bouton Office, <em>Enregistrer sous</em>, nom, dossier, ' +
          'valider. Ensuite : <strong>Ctrl+S</strong> ou la disquette de la barre d\'accès rapide, ' +
          'régulièrement. À la fermeture sans sauvegarde, Word propose Oui (enregistre les modifications ' +
          'depuis la dernière sauvegarde), Non (elles sont perdues) ou Annuler (on reste dans Word).</p>'
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le groupe Police appartient à l\'onglet…', opts: ['Insertion', 'Accueil', 'Affichage'], correct: 1, exp: 'Accueil : Presse-papiers, Police, Paragraphe, Style, Modification.' },
      { q: 'Le groupe Tableaux appartient à l\'onglet…', opts: ['Insertion', 'Accueil', 'Références'], correct: 0, exp: 'Insertion : Pages, Tableaux, Illustrations, Liens, En-tête et pied, Texte, Symbole.' },
      { q: 'Le mode d\'affichage actif par défaut est…', opts: ['Brouillon', 'Web', 'Page'], correct: 2, exp: 'Page : le plus utilisé, montre les 4 marges de 2,5 cm.' },
      { q: 'Le mode Plan sert surtout à…', opts: ['visualiser les titres d\'un long document', 'imprimer', 'compter les mots'], correct: 0, exp: 'Plan : l\'enchaînement des titres et sous-titres.' },
      { q: 'Sélectionner une phrase à la souris :', opts: ['double-clic', 'Ctrl + clic', 'triple-clic'], correct: 1, exp: 'Ctrl + clic dans la phrase ; double-clic = mot ; triple-clic = paragraphe.' },
      { q: 'Sélectionner tout le document :', opts: ['Ctrl+A', 'Ctrl+S', 'F8 une fois'], correct: 0, exp: 'Ctrl+A ; F8 successifs vont jusqu\'à la section.' },
      { q: '« Ah ! » est compté par les Statistiques comme…', opts: ['un mot', 'deux mots', 'zéro mot'], correct: 1, exp: 'Tout caractère précédé d\'un espace, sans caractère suivant, compte pour un mot.' },
      { q: 'À la fermeture, « Annuler » signifie…', opts: ['perdre les modifications', 'rester dans Word', 'enregistrer'], correct: 1, exp: 'Oui enregistre, Non ferme sans enregistrer, Annuler reste dans le document.' }
    ],

    pitfalls: [
      'Chercher le groupe Tableaux dans Accueil : il vit dans Insertion.',
      'Confondre mode Web (HTML) et mode Page (par défaut).',
      'Oublier Ctrl+S en cours de travail : à la fermeture, Non perd tout.',
      'Croire que le compteur de mots est exact : il est approximatif.'
    ],

    methodTitle: 'Méthode — se repérer dans Word en trois gestes',
    method: [
      'Nommer la commande, deviner l\'onglet : habitudes (Accueil), objets (Insertion), vues (Affichage).',
      'Choisir le mode d\'affichage selon la tâche : Page pour la mise en page, Plan pour structurer.',
      'Enregistrer par réflexe : Ctrl+S dès qu\'un paragraphe est stable.'
    ],

    summary: [
      'Le ruban organise les commandes en onglets et groupes.',
      'Cinq modes d\'affichage : Page, Lecture plein écran, Web, Plan, Brouillon.',
      'La barre d\'état affiche page, langue, zoom et statistiques approximatives.',
      'Sélectionner avant de mettre en forme ; enregistrer avant de fermer.'
    ],

    checklist: [
      'Je sais classer dix groupes dans leurs onglets.',
      'Je sais retrouver les cinq modes d\'affichage et leur usage.',
      'Je sais sélectionner mot, phrase, paragraphe et document.',
      'Je sais dérouler les trois méthodes d\'enregistrement.'
    ],

    notions: [
      '<strong>Ruban</strong> : bandeau d\'onglets subdivisés en groupes.',
      '<strong>Onglet Accueil</strong> : Presse-papiers, Police, Paragraphe, Style, Modification.',
      '<strong>Onglet Insertion</strong> : Pages, Tableaux, Illustrations, Liens, En-tête et pied, Texte, Symbole.',
      '<strong>Mode Page</strong> : affichage par défaut, marges visibles (2,5 cm).',
      '<strong>Barre d\'état</strong> : page, langue, zoom, statistiques.',
      '<strong>F8</strong> : sélection croissante (mot, phrase, paragraphe, section, document).',
      '<strong>Ctrl+A</strong> : sélection de tout le document.',
      '<strong>Enregistrer sous</strong> : premier enregistrement — nom, disque, dossier.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis la carte des onglets et les modes d\'affichage.' },
      { cls: 'mid', text: '50–69 % — refais le classement groupes/onglets du support.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les sélections au clavier.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les sept onglets de Word ?', a: 'Accueil, Insertion, Mise en page, Références, Publipostage, Révision, Affichage.' },
      { q: 'Les cinq modes d\'affichage ?', a: 'Page (défaut), Lecture plein écran, Web (HTML), Plan (titres), Brouillon (rapide).' },
      { q: 'Sélections de la souris ?', a: 'Double-clic = mot ; Ctrl + clic = phrase ; triple-clic ou double-clic en marge = paragraphe ; Ctrl+A = tout.' },
      { q: 'Le comptage des mots ?', a: 'Approximatif : tout caractère entouré d\'espaces compte pour un mot (« il répond : 8 » = 6 mots, « Ah ! » = 2).' },
      { q: 'Les trois boutons de fermeture ?', a: 'Oui enregistre depuis la dernière sauvegarde ; Non perd ces modifications ; Annuler reste dans Word.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Word : mise en forme et mise en page',
    short: 'Word — mise en forme',
    toc: 'Groupe Police et Paragraphe ; les quatre alignements ; interligne, retraits et tabulations ; puces et numéros ; marges, orientation, numérotation ; imprimer après aperçu.',
    time: '≈ 2 h de travail',

    situation:
      'Règle d\'or du support : <strong>avant de modifier la mise en forme, sélectionner</strong> le texte. ' +
      'Vient ensuite l\'habillage complet : police, alignements, interligne, retraits, puces, puis marges, ' +
      'orientation et impression — le parcours type d\'un courrier propre.',

    objectives: [
      'utiliser le groupe Police : police, taille, gras, italique, couleur ;',
      'appliquer les quatre alignements et dire ce qu\'ils alignent ;',
      'régler interligne, espacements Avant/Après et retraits ;',
      'insérer puces, numéros et taquets de tabulation ;',
      'modifier marges, orientation et numérotation de pages avant l\'aperçu d\'impression.'
    ],

    sections: [
      {
        title: 'La mise en forme des caractères et des paragraphes',
        html: [
          '<p>Le groupe <strong>Police</strong> de l\'onglet Accueil porte police, taille, gras, italique, ' +
          'souligné et couleur ; la mini barre d\'outils qui apparaît à la sélection donne un accès rapide à ' +
          'tout. Règle absolue : <strong>sélectionner avant de mettre en forme</strong>.</p>',
          '<p>Le groupe <strong>Paragraphe</strong> propose quatre alignements : à gauche (bord gauche ' +
          'proprement aligné sur la marge), à droite (bord droit aligné), centrer (au milieu de la page) et ' +
          '<strong>justifier</strong> — les deux côtés alignés à la fois. L\'<strong>interligne</strong> ' +
          'augmente ou diminue l\'espace entre les lignes ; les espacements <strong>Avant</strong> et ' +
          '<strong>Après</strong> encadrent le paragraphe. Le <strong>retrait</strong> décale le bord gauche ' +
          'd\'une valeur de tabulation à chaque augmentation ; la première ligne seule se règle par la boîte ' +
          'de dialogue Paragraphe, liste « De 1ère ligne ».</p>',
          '<p>Les <strong>taquets de tabulation</strong> — petits traits de la règle — posent des ' +
          'alignements : clic sur la règle pour en poser un, glisser pour le déplacer, glisser hors de la ' +
          'règle pour le supprimer. Les <strong>puces et numéros</strong> s\'appliquent aux paragraphes ' +
          'sélectionnés depuis le groupe Paragraphe.</p>',
          box('mnemo', 'Mnémotechnique — « gauche accroche la marge gauche, justifie accroche les deux »', 'pin',
            '    <p>Un seul alignement touche deux bords à la fois : le justifié. C\'est le défaut des ' +
            'rapports officiels.</p>')
        ].join('\n')
      },
      {
        title: 'Mise en page et impression',
        html: [
          '<p>Sous l\'onglet <strong>Mise en page</strong> : <strong>Marges</strong> (types proposés ou ' +
          'marges personnalisées Haut/Bas/Gauche/Droite), <strong>Orientation</strong> — portrait (longueur) ' +
          'ou paysage (largeur) — et <strong>Taille</strong> du papier. La numérotation se place par ' +
          'Insertion, Numéros de page, avec choix de la position et de l\'alignement. Le <strong>saut de ' +
          'page</strong> force la pagination et évite les coupures mal placées ; le <strong>filigrane</strong> ' +
          '(Brouillon, Urgent, personnalisé) s\'affiche derrière le texte.</p>',
          '<p>Avant toute impression : vérifier l\'imprimante par défaut, puis passer par l\'<strong>aperçu ' +
          'avant impression</strong> — bouton Office, Imprimer (sans cliquer), Aperçu — pour faire les ' +
          'dernières retouches. Impression : <strong>Ctrl+P</strong>.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Justifier aligne les DEUX bords ; centrer ne touche ni la gauche ni la droite.</li>\n' +
            '      <li>Portrait = sens de la longueur ; paysage = sens de la largeur.</li>\n' +
            '      <li>Le retrait décale d\'une valeur de tabulation à chaque augmentation.</li>\n' +
            '      <li>Pas d\'impression directe : l\'aperçu avant impression d\'abord.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Avant de mettre en forme un texte, il faut…', opts: ['l\'enregistrer', 'le sélectionner', 'l\'imprimer'], correct: 1, exp: 'Règle du support : on sélectionne, ensuite seulement on met en forme.' },
      { q: 'L\'alignement qui aligne les deux côtés :', opts: ['centrer', 'justifier', 'aligner à droite'], correct: 1, exp: 'Justifier : côtés gauche ET droit proprement alignés.' },
      { q: 'L\'interligne règle…', opts: ['l\'espace entre les lignes', 'la taille de police', 'les marges'], correct: 0, exp: 'Espace entre chaque ligne du paragraphe concerné.' },
      { q: 'Chaque augmentation du retrait décale de…', opts: ['1 cm', 'une valeur de tabulation', '2,5 cm'], correct: 1, exp: 'Le bord gauche se décale d\'une tabulation.' },
      { q: 'Poser un taquet de tabulation :', opts: ['double-clic dans le texte', 'clic sur la règle horizontale', 'Ctrl+T'], correct: 1, exp: 'Clic sur la règle ; glisser pour déplacer, hors règle pour supprimer.' },
      { q: 'L\'orientation « paysage » correspond à…', opts: ['le sens de la largeur', 'le sens de la longueur', 'le format A4'], correct: 0, exp: 'Portrait = longueur ; paysage = largeur.' },
      { q: 'La numérotation des pages se règle à l\'onglet…', opts: ['Accueil', 'Insertion', 'Révision'], correct: 1, exp: 'Insertion, Numéros de page : position et alignement.' },
      { q: 'Avant d\'imprimer, le support impose…', opts: ['un enregistrement', 'l\'aperçu avant impression', 'un filigrane'], correct: 1, exp: 'Toujours l\'aperçu pour les dernières retouches ; Ctrl+P ensuite.' }
    ],

    pitfalls: [
      'Mettre en forme sans sélectionner : rien ne change.',
      'Croire que « centrer » aligne les bords : il place au milieu.',
      'Confondre interligne (entre lignes) et espacement Avant/Après (autour du paragraphe).',
      'Imprimer sans aperçu : coupures et marges mal réglées.'
    ],

    methodTitle: 'Méthode — mettre en forme un courrier en trois gestes',
    method: [
      'Sélectionner, puis appliquer Police : nom, taille, gras, couleur.',
      'Régler le Paragraphe : alignement justifié, interligne, retrait de première ligne, puces.',
      'Terminer par la page : marges, orientation, numérotation — aperçu, puis Ctrl+P.'
    ],

    summary: [
      'Police : sélection d\'abord ; mini barre d\'outils à la sélection.',
      'Quatre alignements ; seul le justifié aligne les deux bords.',
      'Interligne, espacements, retraits et taquets structurent le paragraphe.',
      'Marges, orientation, numérotation, filigrane : onglet Mise en page — aperçu avant Ctrl+P.'
    ],

    checklist: [
      'Je sais nommer l\'effet de chaque alignement.',
      'Je sais régler interligne, espacements et retraits.',
      'Je sais poser, déplacer et supprimer un taquet.',
      'Je sais dérouler marges, orientation et impression contrôlée.'
    ],

    notions: [
      '<strong>Justifier</strong> : aligner les côtés gauche et droit à la fois.',
      '<strong>Interligne</strong> : espace entre les lignes d\'un paragraphe.',
      '<strong>Retrait</strong> : décalage du bord gauche (ou de la première ligne).',
      '<strong>Taquets</strong> : repères de la règle pour aligner.',
      '<strong>Puces et numéros</strong> : liste appliquée aux paragraphes sélectionnés.',
      '<strong>Marges</strong> : 2,5 cm par défaut, personnalisables.',
      '<strong>Orientation</strong> : portrait (longueur) ou paysage (largeur).',
      '<strong>Filigrane</strong> : texte ou image derrière le texte (Brouillon, Urgent).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les quatre alignements et la mise en page.' },
      { cls: 'mid', text: '50–69 % — refais les sélections et les réglages de paragraphe.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible tabulations et numérotation.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'La règle avant mise en forme ?', a: 'Sélectionner le texte d\'abord — groupe Police (onglet Accueil) ensuite.' },
      { q: 'Les quatre alignements ?', a: 'Gauche (marge gauche), droite (marge droite), centrer (milieu), justifier (les deux bords).' },
      { q: 'Retrait de première ligne ?', a: 'Boîte de dialogue Paragraphe, liste « De 1ère ligne » : quantité d\'espace voulue.' },
      { q: 'Portrait contre paysage ?', a: 'Portrait : la page dans le sens de la longueur ; paysage : dans le sens de la largeur.' },
      { q: 'Le parcours d\'impression ?', a: 'Imprimante par défaut, aperçu avant impression (retouches), puis Ctrl+P.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Excel : la feuille de calcul',
    short: 'Excel — la feuille',
    toc: 'Classeur et feuilles ; les barres de la fenêtre et les sept onglets ; saisir des données (texte à gauche, chiffres à droite) ; gérer les feuilles ; mise en forme des cellules.',
    time: '≈ 2 h de travail',

    situation:
      'Excel est un <strong>tableur</strong> : tableaux, calculs automatisés, plannings, graphiques et bases ' +
      'de données. Avant toute formule, il faut connaître le terrain : classeur, feuilles, barres, onglets — ' +
      'et la règle d\'affichage par défaut qui sépare le texte des chiffres.',

    objectives: [
      'distinguer classeur et feuille de calcul, et gérer les feuilles ;',
      'situer les barres de la fenêtre : accès rapide, titre, formule, défilement, état ;',
      'ranger les commandes dans les sept onglets par défaut ;',
      'appliquer la règle d\'alignement par défaut : texte à gauche, chiffres à droite ;',
      'mettre en forme cellules et nombres (formats Nombre, Pourcentage, Texte, Date).'
    ],

    sections: [
      {
        title: 'Classeur, feuilles et fenêtre',
        html: [
          '<p>Le <strong>classeur</strong> se crée, s\'ouvre et s\'enregistre depuis le bouton Office — ' +
          '<em>Enregistrer</em> est « la chose la plus importante », sinon tout est perdu à la fermeture ' +
          'inattendue. La <strong>feuille</strong> se gère par clic droit sur son onglet : Renommer, ' +
          'Insérer, Déplacer ou copier (case « Créer une copie »), Supprimer.</p>',
          '<p>La fenêtre porte ses barres : <strong>accès rapide</strong> (menus déroulants de commandes), ' +
          '<strong>titre</strong> (application et document en cours), <strong>formule</strong> (voir et ' +
          'modifier le contenu des cellules), barres de <strong>défilement</strong> et <strong>état</strong> ' +
          '(options activées, en bas de l\'écran). Le ruban compte <strong>sept onglets par défaut</strong> : ' +
          'Accueil, Insertion, Mise en page, Formules, Données, Révision, Affichage — Excel en ajoute un ' +
          'temporaire quand on sélectionne un objet (graphique, tableau).</p>',
          box('mnemo', 'Mnémotechnique — « la formule voit la cellule, le titre voit le nom »', 'pin',
            '    <p>Barre de formule = contenu de la cellule ; barre de titre = application et document. ' +
            'Les deux se confondent rarement à l\'examen.</p>')
        ].join('\n')
      },
      {
        title: 'Saisir, aligner, formater',
        html: [
          '<p>À la saisie, la donnée s\'affiche <strong>à la fois dans la cellule et dans la barre de ' +
          'formule</strong> ; Entrer ou Tab valide. Règle par défaut : <strong>le texte s\'aligne à gauche ' +
          'et les chiffres à droite</strong> — c\'est le repère immédiat pour repérer une donnée mal typée. ' +
          'Double-clic (ou barre de formule) pour modifier.</p>',
          '<p>La mise en forme passe par les groupes <strong>Police</strong> (taille, gras, italique, ' +
          'souligné, couleur, orientation du texte) et <strong>Alignement</strong> (haut, centre, bas — ' +
          'gauche, centre, droite). Le groupe <strong>Nombre</strong> formate : <em>Nombre</em> (deux ' +
          'décimales), <em>Pourcentage</em>, <em>Texte</em> (interprète tout littéralement), <em>Date</em> ' +
          '(courte jj/mm/aa ou longue avec jour et mois en toutes lettres). On insère lignes et colonnes par ' +
          'clic droit — la ligne s\'insère au-dessus, la colonne à gauche — et le groupe Accueil propose ' +
          '<strong>Fusionner et centrer</strong>.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Texte à gauche, chiffres à droite : tout autre alignement est une mise en forme explicite.</li>\n' +
            '      <li>Nouvelle ligne au-dessus de la sélection ; nouvelle colonne à sa gauche.</li>\n' +
            '      <li>La barre de formule montre le contenu ; la barre d\'état, les options activées.</li>\n' +
            '      <li>Sept onglets par défaut ; l\'onglet d\'objet disparaît à la désélection.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le contenu d\'une cellule se voit et se modifie dans…', opts: ['la barre d\'état', 'la barre de formule', 'la barre de titre'], correct: 1, exp: 'Barre de formule : voir et modifier le contenu des cellules.' },
      { q: 'Par défaut, le texte s\'aligne…', opts: ['à droite', 'au centre', 'à gauche'], correct: 2, exp: 'Texte à gauche, chiffres à droite.' },
      { q: 'La nouvelle colonne s\'insère…', opts: ['à gauche de la sélection', 'à droite de la sélection', 'en dernière position'], correct: 0, exp: 'Clic droit, Insertion : ligne au-dessus, colonne à gauche.' },
      { q: 'Excel compte…', opts: ['5 onglets par défaut', '7 onglets par défaut', '9 onglets par défaut'], correct: 1, exp: 'Accueil, Insertion, Mise en page, Formules, Données, Révision, Affichage.' },
      { q: 'Copier une feuille se fait par…', opts: ['clic droit, Déplacer ou copier', 'Ctrl+C', 'Enregistrer sous'], correct: 0, exp: 'Clic droit sur l\'onglet, case « Créer une copie ».' },
      { q: 'Le format « Texte » …', opts: ['aligne à droite', 'interprète tout littéralement', 'convertit en nombre'], correct: 1, exp: 'Même une saisie numérique reste du texte.' },
      { q: 'Fusionner et centrer se trouve…', opts: ['dans le groupe Accueil', 'à l\'onglet Données', 'dans la barre d\'état'], correct: 0, exp: 'Groupe Accueil : fusionner et centrer les cellules sélectionnées.' },
      { q: 'L\'enregistrement du classeur est…', opts: ['optionnel', 'la chose la plus importante', 'automatique'], correct: 1, exp: 'Sinon tout est perdu à la fermeture inattendue.' }
    ],

    pitfalls: [
      'Confondre barre de formule (contenu) et barre d\'état (options).',
      'Oublier que la colonne s\'insère à GAUCHE de la sélection.',
      'Chercher un huitième onglet permanent : celui des objets est temporaire.',
      'Taper une date dans une cellule au format Texte : elle reste littérale.'
    ],

    methodTitle: 'Méthode — prendre en main une feuille en trois gestes',
    method: [
      'Repérer la fenêtre : formule (contenu), état (options), titre (document).',
      'Organiser les feuilles : renommer, insérer, déplacer ou copier, supprimer par clic droit.',
      'Saisir puis formater : alignement par défaut, groupe Nombre pour les formats.'
    ],

    summary: [
      'Classeur = fichier ; feuilles gérées par clic droit sur l\'onglet.',
      'Barres : accès rapide, titre, formule, défilement, état.',
      'Sept onglets par défaut ; un onglet temporaire pour les objets.',
      'Texte à gauche, chiffres à droite ; formats Nombre, Pourcentage, Texte, Date.'
    ],

    checklist: [
      'Je sais distinguer classeur et feuille.',
      'Je sais nommer le rôle de chaque barre.',
      'Je sais insérer ligne et colonne du bon côté.',
      'Je sais choisir le format de nombre adapté.'
    ],

    notions: [
      '<strong>Classeur</strong> : le fichier Excel, composé de feuilles.',
      '<strong>Feuille</strong> : grille de cellules, gérée par clic droit sur son onglet.',
      '<strong>Barre de formule</strong> : voir et modifier le contenu des cellules.',
      '<strong>Barre d\'état</strong> : options activées, en bas de l\'écran.',
      '<strong>Alignement par défaut</strong> : texte à gauche, chiffres à droite.',
      '<strong>Format Texte</strong> : tout contenu interprété littéralement.',
      '<strong>Fusionner et centrer</strong> : assembler des cellules sélectionnées.',
      '<strong>En-tête et pied de page</strong> : zones des marges, sur chaque page.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les barres de la fenêtre et la gestion des feuilles.' },
      { cls: 'mid', text: '50–69 % — refais le classement onglets/groupes d\'Excel.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les formats de nombre.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les cinq barres de la fenêtre ?', a: 'Accès rapide (commandes), titre (application + document), formule (contenu des cellules), défilement, état (options).' },
      { q: 'Alignement par défaut ?', a: 'Le texte à gauche et les chiffres à droite.' },
      { q: 'Côté d\'insertion ?', a: 'La nouvelle ligne au-dessus de la sélection ; la nouvelle colonne à sa gauche.' },
      { q: 'Les sept onglets d\'Excel ?', a: 'Accueil, Insertion, Mise en page, Formules, Données, Révision, Affichage.' },
      { q: 'Quatre formats du groupe Nombre ?', a: 'Nombre (2 décimales), Pourcentage, Texte (littéral), Date (courte ou longue).' }
    ]
  }
];
