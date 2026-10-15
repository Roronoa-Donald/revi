/**
 * Chapitre 2 du cours « Algorithmique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  "n": 2,
  "title": "Structures Arborescentes &amp; Arbres Binaires de Recherche (ABR)",
  "short": "Arbres Binaires &amp; ABR",
  "toc": "Définition d’un arbre binaire, parcours préfixe, infixe et postfixe, propriété d’ABR, insertion, recherche logarithmique, suppression avec successeur in-order et notions d’équilibrage (AVL / Rouge-Noir).",
  "time": "≈ 2 h 45 de travail",
  "free": false,
  "lockLabel": "Réservé B3 et plus",
  "situation": "Les tableaux et les listes chaînées imposent un compromis insatisfaisant : un tableau trié permet une recherche dichotomique rapide en O(log n), mais l’insertion ou la suppression coûte O(n) à cause des décalages d’éléments en mémoire ; une liste chaînée permet des insertions en O(1) si le pointeur est connu, mais impose une recherche linéaire en O(n). Les arbres binaires de recherche (ABR) réconcilient ces deux exigences en proposant à la fois recherche, insertion et suppression en temps moyen O(log n). Toutefois, sans mécanisme d’auto-équilibrage, un ABR peut dégénérer en simple liste chaînée et ramener les opérations à un coût catastrophique O(n). Ce chapitre explore en profondeur les structures arborescentes hiérarchiques, les algorithmes de manipulation de pointeurs et les invariants d’équilibrage.",
  "objectives": [
    "définir rigoureusement les propriétés structurelles d’un arbre binaire (nœuds, feuilles, hauteur, profondeur) ;",
    "maîtriser les 3 parcours récursifs fondamentaux (préfixe, infixe, postfixe) et leurs applications concrètes ;",
    "implémenter l’insertion ordonnée et la recherche dichotomique instrumentée dans un ABR ;",
    "maîtriser l’algorithme de suppression d’un nœud dans ses 3 cas (feuille, un enfant, deux enfants avec successeur in-order) ;",
    "comprendre le phénomène de dégénérescence des ABR et les rotations d’équilibrage des arbres AVL ;",
    "analyser la complexité au pire des cas O(n) vs au cas moyen O(log n)."
  ],
  "sections": [
    {
      "title": "Anatomie des Arbres Binaires et Parcours Fondamentaux",
      "html": "<p>Un <strong>arbre binaire</strong> est une structure de données arborescente où chaque nœud possède au plus deux enfants, appelés traditionnellement <em>fils gauche</em> et <em>fils droit</em>.</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Parcours Préfixe (Pre-Order)</h4>\n    <p>Ordre : <strong>Racine $\\to$ Gauche $\\to$ Droite</strong>.<br>    Utilisé pour cloner la structure d’un arbre ou sérialiser une hiérarchie.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Parcours Infixe (In-Order)</h4>\n    <p>Ordre : <strong>Gauche $\\to$ Racine $\\to$ Droite</strong>.<br>    Sur un ABR, ce parcours produit toujours une suite de valeurs <em>strictement croissante</em>.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Parcours Postfixe (Post-Order)</h4>\n    <p>Ordre : <strong>Gauche $\\to$ Droite $\\to$ Racine</strong>.<br>    Indispensable pour la désallocation mémoire (suppression ascendante) et l’évaluation d’expressions (notation polonaise inverse).</p>\n  </div>\n</div>\n<h4>Hauteur vs Profondeur</h4>\n<p>La <em>profondeur</em> d’un nœud est la longueur du chemin reliant la racine à ce nœud (la racine a pour profondeur 0).<br>La <em>hauteur</em> d’un arbre est la profondeur maximale de ses feuilles. Un arbre binaire parfait de hauteur $h$ contient exactement $2^{h+1} - 1$ nœuds.</p>"
    },
    {
      "title": "Propriété Fondamentale des ABR & Recherche",
      "html": "<p>Un <strong>Arbre Binaire de Recherche (ABR)</strong> est un arbre binaire vérifiant l’invariant suivant pour chaque nœud $u$ :</p>\n<ul>\n  <li>Pour tout nœud $v$ dans le <strong>sous-arbre gauche</strong> de $u$, $\\text{clé}(v) &lt; \\text{clé}(u)$ ;</li>\n  <li>Pour tout nœud $w$ dans le <strong>sous-arbre droit</strong> de $u$, $\\text{clé}(w) &gt; \\text{clé}(u)$.</li>\n</ul>\n  <div class=\"box box--standard\">\n    <div class=\"box__title\"><svg class=\"ic\" aria-hidden=\"true\" focusable=\"false\"><use href=\"/assets/img/ui-icons.svg#i-info\"></use></svg> Recherche Logarithmique dans un ABR</div>\n<p>Pour chercher une valeur $k$ en partant de la racine :</p>\n<ol>\n  <li>Si le nœud courant est nul : échec (valeur absente).</li>\n  <li>Si $k == \\text{clé}(\\text{courant})$ : succès, l’élément est trouvé.</li>\n  <li>Si $k &lt; \\text{clé}(\\text{courant})$ : descendre dans le sous-arbre gauche.</li>\n  <li>Si $k &gt; \\text{clé}(\\text{courant})$ : descendre dans le sous-arbre droit.</li>\n</ol>\n<p>Dans un arbre équilibré, la recherche élimine la moitié des nœuds résiduels à chaque saut, garantissant un temps d’exécution en $O(h) = O(\\log n)$.</p>\n  </div>"
    },
    {
      "title": "Algorithme de Suppression dans un ABR (3 Cas)",
      "html": "<p>La suppression est l’opération la plus délicate sur un ABR car elle doit préserver strictement l’invariant d’ordre. On distingue 3 cas de figure :</p>\n<div class=\"grid grid-3\">\n  <div class=\"card\">\n    <h4>Cas 1 : Nœud Feuille</h4>\n    <p>Le nœud n’a aucun enfant.<br>    On le détache simplement de son parent en mettant le pointeur du parent à <code>None</code>.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Cas 2 : Nœud avec Un Seul Enfant</h4>\n    <p>Le nœud a un seul fils (gauche ou droit).<br>    Le fils unique est directement rattaché au grand-parent à la place du nœud supprimé.</p>\n  </div>\n  <div class=\"card\">\n    <h4>Cas 3 : Nœud avec Deux Enfants</h4>\n    <p>Le nœud a deux sous-arbres.<br>    On cherche son <strong>successeur in-order</strong> (le plus petit élément du sous-arbre droit).     On copie sa valeur dans le nœud courant, puis on supprime récursivement ce successeur (qui est dans le Cas 1 ou 2).</p>\n  </div>\n</div>"
    }
  ],
  "methodTitle": "Protocole de Manipulation des Arbres Binaires de Recherche",
  "method": [
    "Toujours vérifier le cas de base récursif (nœud courant None / NULL) avant d’accéder aux champs gauche ou droite.",
    "Valider la propriété d’ABR par encadrement global (min_val < val < max_val) et non par simple test local parent-fils.",
    "Pour trouver le minimum d’un sous-arbre, descendre continuellement à gauche jusqu’au dernier nœud.",
    "Pour trouver le successeur in-order d’un nœud à deux enfants, prendre son fils droit puis descendre au minimum à gauche.",
    "Mesurer la hauteur de l’arbre pour surveiller son ratio de balance : si h approche n, envisager un arbre AVL ou Rouge-Noir."
  ],
  "summary": [
    "Un ABR impose que tout le sous-arbre gauche contienne des clés strictement inférieures, et le sous-arbre droit des clés supérieures.",
    "Le parcours infixe d’un ABR visite les éléments dans un ordre strictement trié.",
    "La complexité des opérations (recherche, insertion, suppression) est proportionnelle à la hauteur h de l’arbre.",
    "Cas moyen pour un arbre équilibré : h = Theta(log n). Pire cas pour un arbre dégénéré (peigne) : h = Theta(n).",
    "La suppression d’un nœud à deux enfants se ramène à la suppression de son successeur in-order dans le sous-arbre droit.",
    "Les arbres auto-équilibrants (AVL, Rouge-Noir) utilisent des rotations pour garantir h <= 2 * log2(n) en toutes circonstances."
  ],
  "checklist": [
    "Je sais écrire un parcours récursif infixe, préfixe et postfixe.",
    "Je sais expliquer pourquoi le parcours infixe d’un ABR est trié.",
    "Je maîtrise l’algorithme de suppression d’un nœud ayant deux enfants.",
    "Je comprends la différence entre minimum, maximum et successeur in-order.",
    "Je sais identifier un piège où un arbre est localement valide mais globalement non ABR.",
    "Je connais la formule de la hauteur maximale d’un arbre binaire à n nœuds (n-1)."
  ],
  "notions": [
    "Arbre Binaire de Recherche (ABR / BST)",
    "Parcours infixe (In-Order) strictement croissant",
    "Parcours préfixe (Pre-Order) et postfixe (Post-Order)",
    "Recherche logarithmique O(log n)",
    "Insertion ordonnée dans un ABR",
    "Suppression de nœud (feuille, 1 enfant, 2 enfants)",
    "Successeur in-order (minimum du sous-arbre droit)",
    "Arbres auto-équilibrés (AVL et Rouge-Noir)"
  ],
  "pitfalls": [
    "Vérifier seulement si gauche < racine < droite localement : c’est insuffisant car un nœud peut violer une contrainte d’un ancêtre plus haut.",
    "Oublier de mettre à jour le pointeur du parent lors de la suppression d’un nœud.",
    "Confondre hauteur d’un nœud (distance à la feuille la plus lointaine) et profondeur (distance depuis la racine).",
    "Insérer des données déjà triées dans un ABR naïf : l’arbre dégénère en peigne linéaire O(n)."
  ],
  "questions": [
    {
      "stem": "Quel est l’ordre des nœuds visités lors d’un parcours infixe sur un ABR contenant les clés [50, 20, 70, 10, 30] ?",
      "opts": [
        "50, 20, 10, 30, 70",
        "10, 20, 30, 50, 70",
        "10, 30, 20, 70, 50",
        "70, 50, 30, 20, 10"
      ],
      "correct": 1,
      "exp": "Le parcours infixe d’un ABR visite obligatoirement les éléments par ordre croissant de clé : 10, 20, 30, 50, 70."
    },
    {
      "stem": "Lors de la suppression d’un nœud possédant deux enfants dans un ABR, par quoi remplace-t-on sa valeur ?",
      "opts": [
        "Par la racine de l’arbre",
        "Par la plus grande feuille de l’arbre entier",
        "Par son successeur in-order (plus petit nœud du sous-arbre droit)",
        "Par son fils gauche immédiat sans autre modification"
      ],
      "correct": 2,
      "exp": "Dans l’algorithme standard, on copie la clé du successeur in-order (minimum du sous-arbre droit) ou du prédécesseur in-order (maximum du sous-arbre gauche)."
    },
    {
      "stem": "Quelle est la complexité temporelle au pire des cas d’une recherche dans un ABR classique sans équilibrage ?",
      "opts": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correct": 2,
      "exp": "Si les insertions ont été faites dans l’ordre trié croissant, l’arbre dégénère en liste chaînée (peigne) de hauteur n-1, donnant une recherche au pire des cas en O(n)."
    },
    {
      "stem": "Combien d’enfants au maximum possède le successeur in-order d’un nœud dans un ABR ?",
      "opts": [
        "0 enfant",
        "Au plus 1 enfant (fils droit)",
        "2 enfants",
        "Aucune limite"
      ],
      "correct": 1,
      "exp": "Le successeur in-order étant le minimum du sous-arbre droit, il ne peut pas avoir de fils gauche (sinon ce fils serait encore plus petit). Il a donc au plus un fils droit."
    },
    {
      "stem": "Quelle est la hauteur minimale d’un arbre binaire contenant 15 nœuds ?",
      "opts": [
        "3",
        "4",
        "7",
        "15"
      ],
      "correct": 0,
      "exp": "Un arbre binaire parfait de hauteur h=3 contient 2^(3+1) - 1 = 15 nœuds. La hauteur minimale (avec la racine à profondeur 0) est donc 3."
    },
    {
      "stem": "Quel parcours arborescent doit être privilégié pour libérer la mémoire allouée à chaque nœud en langage C sans fuite ?",
      "opts": [
        "Parcours préfixe",
        "Parcours infixe",
        "Parcours postfixe",
        "Parcours en largeur"
      ],
      "correct": 2,
      "exp": "Le parcours postfixe visite d’abord les enfants gauche et droit avant le parent. On peut donc libérer les enfants en toute sécurité avant de désallouer le parent."
    },
    {
      "stem": "Dans un arbre binaire, que vaut le nombre de feuilles par rapport au nombre de nœuds ayant deux enfants ?",
      "opts": [
        "Le nombre de feuilles est égal au nombre de nœuds à 2 enfants + 1",
        "Le nombre de feuilles est le double des nœuds internes",
        "Ils sont toujours égaux",
        "Il n’y a aucun lien fixe"
      ],
      "correct": 0,
      "exp": "Dans tout arbre binaire strict ou complet, le nombre de feuilles L vérifie la formule fondamentale L = N2 + 1 où N2 est le nombre de nœuds ayant exactement deux enfants."
    },
    {
      "stem": "Quel est l’impact de l’insertion de clés dans un arbre AVL par rapport à un ABR standard ?",
      "opts": [
        "L’insertion est impossible",
        "L’arbre garantit une hauteur O(log n) grâce à des rotations locales",
        "La recherche devient linéaire",
        "L’arbre double de taille en mémoire"
      ],
      "correct": 1,
      "exp": "L’arbre AVL maintient un facteur d’équilibre (-1, 0, +1) et applique des rotations (gauche, droite) pour borner strictement la hauteur à 1.44 * log2(n)."
    }
  ],
  "flashcards": [
    {
      "q": "Qu’est-ce qui caractérise l’invariant d’un Arbre Binaire de Recherche (ABR) ?",
      "a": "Pour chaque nœud X, toutes les clés du sous-arbre gauche sont strictement inférieures à X, et toutes celles du sous-arbre droit sont strictement supérieures."
    },
    {
      "q": "Quel résultat produit le parcours infixe d’un ABR ?",
      "a": "Une suite de valeurs strictement ordonnée par ordre croissant."
    },
    {
      "q": "Comment trouve-t-on le successeur in-order d’un nœud dans un ABR ?",
      "a": "On se déplace vers le fils droit du nœud, puis on descend continuellement à gauche jusqu’au dernier nœud accessible."
    },
    {
      "q": "Quelle est la complexité d’une recherche dans un ABR équilibré vs dégénéré ?",
      "a": "O(log n) dans un ABR équilibré (hauteur logarithmique) contre O(n) dans un ABR dégénéré en peigne linéaire."
    },
    {
      "q": "Quels sont les trois cas de la suppression d’un nœud dans un ABR ?",
      "a": "1) Nœud feuille (suppression directe). 2) Nœud avec 1 enfant (remplacement par l’enfant). 3) Nœud avec 2 enfants (remplacement par le successeur in-order)."
    },
    {
      "q": "Pourquoi la simple vérification locale (gauche < parent < droite) est-elle un piège classique ?",
      "a": "Parce qu’un nœud peut être plus grand que son parent immédiat mais plus grand qu’un ancêtre lointain situé au-dessus, violant la propriété globale d’ABR."
    }
  ],
  "mastery": [
    {
      "cls": "low",
      "text": "Moins de 4/8 : Révisez la propriété d’ordre des ABR et les 3 parcours fondamentaux."
    },
    {
      "cls": "medium",
      "text": "Entre 5/8 et 7/8 : Bonnes notions, consolidez la suppression avec successeur in-order et l’équilibrage."
    },
    {
      "cls": "high",
      "text": "8/8 : Parfait ! La manipulation et l’algorithmique des ABR sont pleinement assimilées."
    }
  ]
};
