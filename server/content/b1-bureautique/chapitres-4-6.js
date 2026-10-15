/**
 * Chapitres 4 à 6 du cours de Bureautique B1.
 *
 * Chapitre 4 : Excel — formules et fonctions statistiques (opérateurs, SOMME,
 *               MOYENNE, MAX, MIN, NB, NBVAL, fonctions de texte).
 * Chapitre 5 : Excel — conditionnelles (SI, SI imbriqué, NB.SI, SOMME.SI,
 *               MOYENNE.SI, RANG) et fonctions de texte (Gauche, Droite, STXT).
 * Chapitre 6 : PowerPoint — la présentation (modes d'affichage, construction
 *               du diaporama, minutage).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code
 * (trois exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-bureautique.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Excel : formules et fonctions statistiques',
    short: 'Excel — formules',
    toc: 'La formule commence par = ; les quatre familles d\'opérateurs ; SOMME, MOYENNE, MAX, MIN, NB, NBVAL ; concaténation et fonctions de texte.',
    time: '≈ 2 h de travail',

    situation:
      'Une formule de calcul dans Excel <strong>commence toujours par le signe =</strong>. On combine ' +
      'ensuite adresses de cellules (A1, B3, C4…) et nombres avec les opérateurs — puis on délègue aux ' +
      'fonctions : SOMME, MOYENNE, MAX, MIN, NB, NBVAL. Le chapitre les fait calculer réellement en Bash.',

    objectives: [
      'écrire une formule : signe =, adresses, opérateurs arithmétiques ;',
      'reconnaître les quatre familles d\'opérateurs (arithmétiques, comparaison, texte, référence) ;',
      'calculer SOMME, MOYENNE, MAX et MIN sur une plage ;',
      'distinguer NB (numériques) et NBVAL (non vides) ;',
      'extraire du texte avec Gauche, Droite et STXT.'
    ],

    sections: [
      {
        title: 'La formule et ses opérateurs',
        html: [
          '<p>Toute formule commence par <strong>=</strong>. Les <strong>opérateurs arithmétiques</strong> : ' +
          '+ (addition), - (soustraction), * (multiplication), / (division), % (pourcentage), ^ (exposant, ' +
          '3^2 = 9). Les <strong>opérateurs de comparaison</strong> : =, &gt;, &lt;, &gt;=, &lt;=, ' +
          '&lt;&gt; (différent de). L\'opérateur de <strong>concaténation</strong> joint des textes : ' +
          '"Nord" &amp; "Sud" donne NordSud. Les <strong>opérateurs de référence</strong> : les deux-points ' +
          '(:) désignent une plage (B5:B15), le point-virgule (;) une union de plages, l\'espace une ' +
          'intersection.</p>',
          '<p>La <strong>barre de formule</strong> montre la formule de la cellule active ; la saisie se ' +
          'valide par Entrer. Les adresses — colonne puis ligne — s\'écrivent A1, B3 ; une plage se lit ' +
          '« de A2 à A10 ».</p>',
          box('mnemo', 'Mnémotechnique — « = d\'abord, puis les adresses »', 'pin',
            '    <p>Une formule sans = reste du texte : elle s\'aligne à gauche dans la cellule — le défaut ' +
            'voulu du tableur le signale immédiatement.</p>')
        ].join('\n')
      },
      {
        title: 'Les fonctions statistiques et les textes',
        html: [
          '<p><strong>SOMME</strong> additionne une plage ; <strong>MOYENNE</strong> en fait la moyenne ; ' +
          '<strong>MAX</strong> et <strong>MIN</strong> extraient les extrêmes ; <strong>NB</strong> compte ' +
          'les cellules <em>numériques</em> d\'une plage ; <strong>NBVAL</strong> compte les cellules ' +
          '<em>non vides</em>. Syntaxe commune : =SOMME(A2:A10), =MOYENNE(A2:A10)…</p>',
          '<p>Les <strong>fonctions de texte</strong> : <strong>Gauche(Ad;n)</strong> extrait les n premiers ' +
          'caractères (Gauche(B1;3) sur « INFORMATIQUE » donne INF) ; <strong>Droite(Ad;n)</strong> les n ' +
          'derniers (Droite(B1;5) donne tique) ; <strong>STXT(Ad;n1;n2)</strong> extrait n2 caractères à ' +
          'partir de la position n1 (STXT(B1;2;3) donne nfo). La <strong>concaténation</strong> les combine : ' +
          '=Gauche(B1;4)&amp;Droite(B2;9) sur « informatique » et « toto@yahoo.fr » donne info@yahoo.fr.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>NB compte les NOMBRES ; NBVAL compte tout ce qui n\'est pas vide — texte compris.</li>\n' +
            '      <li>STXT compte les positions à partir de 1 : la position 2 est la deuxième lettre.</li>\n' +
            '      <li>^ est l\'exposant : 3^2 = 9, pas 6.</li>\n' +
            '      <li>Sans le signe =, la « formule » est du texte aligné à gauche.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Une formule de calcul commence toujours par…', opts: ['un signe +', 'le signe =', 'une apostrophe'], correct: 1, exp: 'Sans =, le contenu reste du texte aligné à gauche.' },
      { q: 'L\'opérateur ^ est…', opts: ['la multiplication', 'l\'exposant', 'la concaténation'], correct: 1, exp: '3^2 = 9 ; * multiplie ; & concatène.' },
      { q: 'B5:B15 est un opérateur de…', opts: ['plage', 'union', 'intersection'], correct: 0, exp: 'Deux-points : toutes les cellules comprises, bornes incluses.' },
      { q: 'NB compte…', opts: ['toutes les cellules', 'les cellules non vides', 'les cellules numériques'], correct: 2, exp: 'NBVAL, elle, compte les non vides, texte compris.' },
      { q: 'Gauche(B1;3) sur INFORMATIQUE donne…', opts: ['QUE', 'INF', 'ION'], correct: 1, exp: 'Les 3 premiers caractères : INF.' },
      { q: 'STXT(B1;2;3) sur INFORMATIQUE donne…', opts: ['INF', 'NFO', 'TIQ'], correct: 1, exp: '3 caractères à partir de la position 2 : NFO.' },
      { q: 'La moyenne de 10, 20, 30, 40 vaut…', opts: ['25', '100', '30'], correct: 0, exp: 'SOMME 100 / NB 4 = 25.' },
      { q: '"Nord" & "Sud" produit…', opts: ['Nord Sud', 'NordSud', 'une erreur'], correct: 1, exp: 'Concaténation : un seul élément de texte continu.' }
    ],

    pitfalls: [
      'Écrire SOMME(A2:A10) sans le = initial : texte, pas formule.',
      'Confondre NB (nombres) et NBVAL (non vides).',
      'Compter les positions de STXT à partir de 0.',
      'Oublier les deux-points dans une plage : A2 A10 n\'est pas une plage.'
    ],

    methodTitle: 'Méthode — construire une formule en trois gestes',
    method: [
      'Commencer par = puis écrire les adresses exactes (A2:A10).',
      'Choisir la fonction : SOMME, MOYENNE, MAX, MIN, NB, NBVAL.',
      'Valider par Entrer et relire la barre de formule.'
    ],

    summary: [
      '= d\'abord ; adresses et opérateurs ensuite.',
      'Arithmétiques (+ - * / % ^), comparaison, concaténation &, références (: ; espace).',
      'SOMME, MOYENNE, MAX, MIN : le socle statistique.',
      'NB : numériques ; NBVAL : non vides ; Gauche, Droite, STXT : le texte.'
    ],

    checklist: [
      'Je sais écrire une formule avec plage et fonction.',
      'Je sais classer les opérateurs en quatre familles.',
      'Je sais prédire le résultat de Gauche, Droite, STXT.',
      'Je sais distinguer NB et NBVAL sur un mélange.'
    ],

    notions: [
      '<strong>Formule</strong> : expression commençant par =, dans la barre de formule.',
      '<strong>Opérateur ^</strong> : exposant (3^2 = 9).',
      '<strong>Concaténation</strong> : &amp; joint des textes ("Nord"&amp;"Sud" = NordSud).',
      '<strong>Plage B5:B15</strong> : toutes les cellules entre deux références.',
      '<strong>SOMME / MOYENNE</strong> : total et moyenne d\'une plage.',
      '<strong>MAX / MIN</strong> : plus grande et plus petite valeur.',
      '<strong>NB / NBVAL</strong> : numériques / non vides.',
      '<strong>STXT(Ad;n1;n2)</strong> : n2 caractères à partir de la position n1.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les opérateurs et les six fonctions statistiques.' },
      { cls: 'mid', text: '50–69 % — refais les exemples Gauche/Droite/STXT du support.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible NB contre NBVAL.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Le début de toute formule ?', a: 'Le signe = — sinon le contenu reste du texte aligné à gauche.' },
      { q: 'Les six fonctions statistiques ?', a: 'SOMME, MOYENNE, MAX, MIN, NB (numériques), NBVAL (non vides).' },
      { q: 'Gauche, Droite, STXT ?', a: 'Gauche(Ad;n) : n premiers caractères ; Droite(Ad;n) : n derniers ; STXT(Ad;n1;n2) : n2 caractères dès la position n1.' },
      { q: 'Les quatre familles d\'opérateurs ?', a: 'Arithmétiques (+ - * / % ^), comparaison (= > < >= <= <>), concaténation (&), référence (: ; espace).' },
      { q: '=Gauche(B1;4)&Droite(B2;9) ?', a: '« info » + « @yahoo.fr » = info@yahoo.fr — la concaténation assemble les extractions.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Excel : conditionnelles et compteurs conditionnels',
    short: 'Excel — conditionnelles',
    toc: 'La fonction SI et le SI imbriqué (commission, mentions) ; NB.SI, SOMME.SI, MOYENNE.SI ; la fonction RANG.',
    time: '≈ 2 h de travail',

    situation:
      'Le responsable commercial du support calcule une commission à paliers : 10 % si CA &lt; 10000, 15 % ' +
      'si 10000 &lt;= CA &lt; 50000, 20 % si CA &gt;= 50000. C\'est le cas d\'école de la fonction ' +
      '<strong>SI</strong> imbriquée — transposé ici en if/elif Bash, puis complété par les compteurs ' +
      'conditionnels NB.SI, SOMME.SI et MOYENNE.SI.',

    objectives: [
      'écrire SI(Test; Valeur_si_vrai; Valeur_si_faux) ;',
      'imbriquer des SI pour traiter plusieurs paliers, du plus strict au plus large ;',
      'compter, sommer et moyenner sous condition : NB.SI, SOMME.SI, MOYENNE.SI ;',
      'classer une valeur avec RANG.',
      'tester une condition en Bash avec if/elif/else.'
    ],

    sections: [
      {
        title: 'SI et SI imbriqué',
        html: [
          '<p><strong>SI(Test; Valeur_si_Test_vrai; Valeur_si_Test_faux)</strong> renvoie un résultat selon ' +
          'qu\'une expression logique est vraie ou fausse : c\'est la formule conditionnelle la plus ' +
          'utilisée. L\'<strong>imbrication</strong> place un SI dans un SI : ' +
          '=SI(Test1;valeur1;SI(Test2;valeur2;valeur_fausse)).</p>',
          '<p>La commission du support illustre le schéma : un SI principal teste le premier palier, le ' +
          'sinon en teste un second, et la dernière branche recueille le reste — <strong>du palier le plus ' +
          'strict au plus large</strong>. En Bash, le même raisonnement s\'écrit if / elif / else : ' +
          'le programme teste 50000, puis 10000, sinon applique le taux de base.</p>',
          box('mnemo', 'Mnémotechnique — « SI imbriqué : tester du plus grand au plus petit »', 'pin',
            '    <p>Si on teste d\'abord CA &gt;= 50000, les branches suivantes n\'ont plus besoin de ' +
            'vérifier la borne haute : l\'ordre fait le travail.</p>')
        ].join('\n')
      },
      {
        title: 'NB.SI, SOMME.SI, MOYENNE.SI et RANG',
        html: [
          '<p><strong>NB.SI(plage;critère)</strong> détermine le nombre de cellules non vides répondant à ' +
          'la condition ; <strong>SOMME.SI(plage;critère;plage_somme)</strong> additionne les cellules ' +
          'spécifiées selon le critère ; <strong>MOYENNE.SI(plage;critère;plage_moyenne)</strong> en fait la ' +
          'moyenne. Le <strong>critère</strong> peut être une valeur ou une comparaison.</p>',
          '<p><strong>RANG(nombre;référence;ordre)</strong> renvoie le rang d\'un nombre dans une liste : ' +
          'sa taille relative aux autres valeurs — l\'ordre (croissant ou décroissant) décide si la plus ' +
          'grande valeur prend le rang 1.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Un SI imbriqué se lit de l\'extérieur vers l\'intérieur : le premier test gagne.</li>\n' +
            '      <li>NB.SI compte ; SOMME.SI additionne ; MOYENNE.SI moyenne — trois usages d\'un même critère.</li>\n' +
            '      <li>RANG a besoin d\'un ordre : sans lui, la convention par défaut s\'applique.</li>\n' +
            '      <li>Les bornes du palier : 10000 tombe dans le palier 15 %, pas 10 % (CA &gt;= 10000).</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'SI(Test; V; F) renvoie…', opts: ['toujours V', 'V si le test est vrai, F sinon', 'le test'], correct: 1, exp: 'Formule conditionnelle : résultat selon la vérité du test.' },
      { q: 'Pour une commission à trois paliers, on écrit…', opts: ['trois SI séparés', 'un SI imbriqué du plus strict au plus large', 'un SI unique'], correct: 1, exp: 'SI dans SI : le premier test élimine les cas hauts.' },
      { q: 'NB.SI(plage;critère) renvoie…', opts: ['la somme sous condition', 'le nombre de cellules remplissant le critère', 'la moyenne'], correct: 1, exp: 'SOMME.SI additionne ; MOYENNE.SI moyenne.' },
      { q: 'SOMME.SI(plage;critère;plage_somme) additionne…', opts: ['toute la plage', 'la plage_somme des cellules remplissant le critère', 'les critères'], correct: 1, exp: 'La plage de somme est distincte de la plage de test.' },
      { q: 'RANG(nombre;référence;ordre) renvoie…', opts: ['le plus grand nombre', 'la position relative dans la liste', 'le nombre de valeurs'], correct: 1, exp: 'La taille relative aux autres valeurs de la liste.' },
      { q: 'CA = 10000, commission du support :', opts: ['10 %', '15 %', '20 %'], correct: 1, exp: '10000 &lt;= CA &lt; 50000 : palier 15 %.' },
      { q: 'Dans un SI imbriqué, l\'ordre des tests…', opts: ['n\'importe pas', 'va du plus strict au plus large', 'est alphabétique'], correct: 1, exp: 'Tester >= 50000 avant >= 10000 sinon le palier bas capture tout.' },
      { q: 'Le test d\'un SI est…', opts: ['une expression logique', 'un nombre', 'une plage'], correct: 0, exp: 'Vrai ou faux : c\'est lui qui décide de la branche.' }
    ],

    pitfalls: [
      'Tester le palier bas d\'abord : tout tombe dans 10 %.',
      'Oublier la troisième partie de SOMME.SI : la plage à sommer.',
      'Confondre NB.SI (compter) et SOMME.SI (additionner).',
      'Donner à RANG une référence sans ordre voulu.'
    ],

    methodTitle: 'Méthode — poser une condition en trois gestes',
    method: [
      'Écrire le test le plus restrictif en premier.',
      'Emboîter les SI (ou elif) jusqu\'au cas par défaut.',
      'Vérifier les bornes : 10000 et 50000 changent de palier.'
    ],

    summary: [
      'SI(Test;V;F) : la formule conditionnelle de base.',
      'SI imbriqué : paliers du plus strict au plus large.',
      'NB.SI compte, SOMME.SI additionne, MOYENNE.SI moyenne — sous critère.',
      'RANG : la position relative d\'une valeur dans une liste.'
    ],

    checklist: [
      'Je sais écrire un SI simple et lire un SI imbriqué.',
      'Je sais calculer la commission du support aux bornes.',
      'Je sais choisir entre NB.SI, SOMME.SI et MOYENNE.SI.',
      'Je sais interpréter un RANG.'
    ],

    notions: [
      '<strong>SI</strong> : formule conditionnelle — test, valeur vraie, valeur fausse.',
      '<strong>SI imbriqué</strong> : un SI dans un SI, paliers successifs.',
      '<strong>NB.SI</strong> : compter les cellules répondant au critère.',
      '<strong>SOMME.SI</strong> : additionner la plage_somme selon le critère.',
      '<strong>MOYENNE.SI</strong> : moyenne de la plage_moyenne selon le critère.',
      '<strong>RANG</strong> : position relative d\'un nombre dans une liste.',
      '<strong>Critère</strong> : valeur ou comparaison testée.',
      '<strong>Commission</strong> : 10 / 15 / 20 % selon le CA (cas du support).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis la syntaxe SI et la commission du support.' },
      { cls: 'mid', text: '50–69 % — refais les paliers de commission en Bash.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les trois compteurs conditionnels.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'La syntaxe de SI ?', a: 'SI(Test; Valeur_si_Test_vrai; Valeur_si_Test_faux) — le test est une expression logique.' },
      { q: 'Ordre des tests imbriqués ?', a: 'Du plus strict au plus large : >= 50000, puis >= 10000, sinon le taux de base.' },
      { q: 'NB.SI, SOMME.SI, MOYENNE.SI ?', a: 'Trois usages d\'un même critère : compter, additionner la plage_somme, moyenner la plage_moyenne.' },
      { q: 'La commission du support ?', a: '10 % si CA < 10000 ; 15 % si 10000 <= CA < 50000 ; 20 % si CA >= 50000.' },
      { q: 'Que renvoie RANG ?', a: 'Le rang d\'un nombre dans une liste : sa taille relative aux autres valeurs, selon l\'ordre.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'PowerPoint : la présentation',
    short: 'PowerPoint',
    toc: 'Les quatre modes d\'affichage ; créer une présentation (vierge ou modèle) ; thèmes et couleurs ; construire et chronométrer le diaporama.',
    time: '≈ 2 h de travail',

    situation:
      'PowerPoint est un programme de <strong>présentation assistée par ordinateur</strong> : des ' +
      'diapositives qui affichent texte, images, tableaux, graphiques, son ou vidéo — projetées en ' +
      'diaporama, à passage automatique (après un délai) ou manuel. Le support en détaille l\'écran, les ' +
      'modes et la construction.',

    objectives: [
      'décrire l\'écran : bouton Office, barre d\'accès rapide, volet Plan/Diapositives, commentaires ;',
      'retrouver les quatre modes d\'affichage et leur vocation ;',
      'créer une présentation vierge ou à partir d\'un modèle ;',
      'appliquer un thème et adapter les couleurs ;',
      'construire un diaporama cohérent : titre, contenus, conclusion — et le chronométrer.'
    ],

    sections: [
      {
        title: 'L\'écran et les modes d\'affichage',
        html: [
          '<p>L\'écran de PowerPoint : le <strong>bouton Office</strong> remplace le menu Fichier des ' +
          'versions antérieures ; la barre d\'accès rapide affiche les commandes ; la barre de titre donne ' +
          'application et document ; les onglets regroupent les commandes ; le <strong>ruban</strong> porte ' +
          'les outils de conception ; le volet <strong>Plan/Diapositives</strong> (à gauche) facilite la ' +
          'navigation ; le volet <strong>Commentaires</strong> enregistre des remarques diapositive par ' +
          'diapositive ; la fenêtre Diapositives (centre) est l\'espace de travail ; les modes d\'affichage ' +
          'et le zoom ferment l\'écran en bas.</p>',
          '<p>Quatre modes : <strong>Normal</strong> (une diapositive à la fois, édition du contenu), ' +
          '<strong>Trieuse de diapositives</strong> (miniatures de toutes les diapositives : vue globale, ' +
          'réorganisation, masquage, transitions, minutage du diaporama automatique), <strong>Diaporama</strong> ' +
          '(la présentation visualisée sur l\'écran ou projetée ; passage automatique après un délai ou ' +
          'manuel ; animations, effets sonores et transitions possibles) et <strong>Page de ' +
          'commentaire</strong> (diapositive en haut, commentaires en dessous — imprimé, ce document sert de ' +
          'guide au présentateur ou de support distribué à l\'assistance).</p>',
          box('mnemo', 'Mnémotechnique — « Normal édite, la Trieuse organise, le Diaporama projette, la Page commente »', 'pin',
            '    <p>Un verbe par mode : écrire, réorganiser, présenter, annoter.</p>')
        ].join('\n')
      },
      {
        title: 'Créer, thématiser, diffuser',
        html: [
          '<p>Une série de diapositives constitue une <strong>présentation</strong> — imprimable, affichable ' +
          'en diaporama ou diffusable sur Intranet/Internet. Création : bouton Office, Nouveau, document ' +
          'vierge ; ou un <strong>modèle</strong> (document prédéfini avec styles, à télécharger depuis ' +
          'Office Online — connexion requise) : il installe des diapositives d\'exemple à remplacer. Le ' +
          'bouton <strong>Ouvrir et réparer</strong> secourt un document corrompu (déconnexion USB, panne ' +
          'de courant).</p>',
          '<p>Les <strong>thèmes</strong> se choisissent à l\'onglet Création ; leur survol affiche un aperçu ' +
          'avant clic. Les <strong>couleurs</strong> s\'adaptent par le menu déroulant Couleurs du groupe ' +
          'Thèmes — le support recommande de ne pas s\'arrêter aux couleurs du modèle : elles se changent. ' +
          'L\'enregistrement suit les mêmes règles que Word : Enregistrer sous pour la première fois, disquette ' +
          'ensuite.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>La Trieuse affiche des miniatures ; le mode Normal, une seule diapositive.</li>\n' +
            '      <li>Le passage automatique se règle par un délai, le manuel par un clic.</li>\n' +
            '      <li>La page de commentaire sert au présentateur ou à l\'assistance, pas au public sur écran.</li>\n' +
            '      <li>Le bouton Office remplace le menu Fichier — l\'option réparer est dans Ouvrir.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le mode qui affiche une diapositive à la fois :', opts: ['Trieuse', 'Normal', 'Diaporama'], correct: 1, exp: 'Normal : édition, volet Plan/Diapositives à gauche.' },
      { q: 'Le mode Trieuse sert à…', opts: ['éditer le texte', 'réorganiser les diapositives et régler transitions et minutage', 'imprimer'], correct: 1, exp: 'Vue globale en miniatures ; masquage possible.' },
      { q: 'Le passage à la diapositive suivante peut être…', opts: ['uniquement manuel', 'automatique (délai) ou manuel', 'uniquement automatique'], correct: 1, exp: 'Les deux existent, réglés dans le diaporama.' },
      { q: 'La page de commentaire associe…', opts: ['des notes à chaque diapositive', 'des images', 'des transitions'], correct: 0, exp: 'Diapositive en haut, commentaires dessous — guide ou support distribué.' },
      { q: 'Le bouton Office remplace…', opts: ['le ruban', 'le menu Fichier', 'la barre d\'état'], correct: 1, exp: 'Nouveau, Ouvrir, Enregistrer, Enregistrer sous, Quitter.' },
      { q: 'Un modèle est…', opts: ['un document vierge', 'un document prédéfini avec styles et diapositives d\'exemple', 'une animation'], correct: 1, exp: 'À télécharger (connexion requise), puis à personnaliser.' },
      { q: 'Adapter les couleurs d\'un thème :', opts: ['onglet Création, menu Couleurs', 'onglet Accueil, Police', 'bouton Office'], correct: 0, exp: 'Groupe Thèmes ; le survol donne l\'aperçu.' },
      { q: '« Ouvrir et réparer » sert en cas de…', opts: ['modèle manquant', 'document corrompu', 'thème moche'], correct: 1, exp: 'Panne, déconnexion USB, extinction brutale : la flèche à droite d\'Ouvrir.' }
    ],

    pitfalls: [
      'Réorganiser les diapositives en mode Normal : la Trieuse est faite pour ça.',
      'Oublier de régler le minutage pour un diaporama automatique.',
      'Prendre la page de commentaire pour un affichage public.',
      'Garder les couleurs d\'un modèle sans les adapter : le support invite à les changer.'
    ],

    methodTitle: 'Méthode — monter une présentation en trois gestes',
    method: [
      'Partir d\'un vierge ou d\'un modèle ; remplacer les diapositives d\'exemple.',
      'Thème et couleurs : onglet Création, aperçu au survol, adaptation des couleurs.',
      'Répéter en Trieuse (ordre, transitions, minutage) avant le mode Diaporama.'
    ],

    summary: [
      'PowerPoint : présentation assistée par ordinateur — diapositives multimédias.',
      'Quatre modes : Normal, Trieuse, Diaporama, Page de commentaire.',
      'Modèles et thèmes : styles prédéfinis, couleurs adaptables.',
      'Diaporama : passage automatique (délai) ou manuel.'
    ],

    checklist: [
      'Je sais nommer les zones de l\'écran de PowerPoint.',
      'Je sais choisir le bon mode d\'affichage par tâche.',
      'Je sais créer une présentation depuis un modèle.',
      'Je sais régler ordre, transitions et minutage.'
    ],

    notions: [
      '<strong>Diapositive</strong> : page de la présentation (texte, images, son, vidéo).',
      '<strong>Mode Normal</strong> : édition, une diapositive à la fois.',
      '<strong>Mode Trieuse</strong> : miniatures, réorganisation, transitions, minutage.',
      '<strong>Mode Diaporama</strong> : projection, passage automatique ou manuel.',
      '<strong>Page de commentaire</strong> : notes par diapositive, pour le présentateur.',
      '<strong>Modèle</strong> : document prédéfini avec styles, à personnaliser.',
      '<strong>Thème</strong> : habillage global, couleurs adaptables (onglet Création).',
      '<strong>Ouvrir et réparer</strong> : secours des documents corrompus.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les quatre modes d\'affichage.' },
      { cls: 'mid', text: '50–69 % — refais la carte écran/modes du support.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible modèles, thèmes et minutage.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les quatre modes d\'affichage ?', a: 'Normal (éditer), Trieuse (organiser), Diaporama (projeter), Page de commentaire (annoter).' },
      { q: 'Le mode Trieuse ?', a: 'Miniatures de toutes les diapositives : réorganisation, masquage, transitions, minutage automatique.' },
      { q: 'Passage des diapositives ?', a: 'Automatique après un délai, ou manuel ; animations et effets sonores possibles.' },
      { q: 'Qu\'est-ce qu\'un modèle ?', a: 'Un document prédéfini avec styles et diapositives d\'exemple, à personnaliser (téléchargement : connexion requise).' },
      { q: 'La page de commentaire ?', a: 'Diapositive + notes dessous : guide du présentateur ou document distribué à l\'assistance.' }
    ]
  }
];
