/**
 * Chapitres 4 à 6 du cours d'algèbre linéaire B1 : espaces vectoriels, familles
 * et rang, déterminants et applications linéaires.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Espaces vectoriels et sous-espaces vectoriels',
    short: 'Espaces vectoriels',
    toc: 'Axiomes d’espace vectoriel, exemples fondamentaux, critère de sous-espace et sous-espace engendré.',
    time: '≈ 3 h de travail',

    situation:
      'Les vecteurs de ℝⁿ, les matrices <code>m × n</code>, les polynômes, les fonctions continues : quatre ' +
      'objets qui n’ont rien à voir entre eux. Et pourtant, on les additionne et on les multiplie par un réel ' +
      'de la même façon, avec les mêmes règles. L’algèbre linéaire a extrait ces règles communes pour en faire ' +
      'une seule théorie : celle des espaces vectoriels. Comprendre cette abstraction, c’est pouvoir faire des ' +
      'mathématiques une seule fois au lieu de quatre.',

    objectives: [
      'énoncer les axiomes qui définissent un espace vectoriel ;',
      'reconnaître un espace vectoriel parmi ℝⁿ, les matrices, les polynômes, les fonctions ;',
      'appliquer le critère de sous-espace vectoriel ;',
      'décrire le sous-espace engendré par une famille de vecteurs.'
    ],

    sections: [
      {
        title: 'Définition d’un espace vectoriel',
        html: [
          '<p><strong>Définition.</strong> Soit <code>E</code> un ensemble muni d’une loi interne ' +
          '« addition » et d’une loi externe « multiplication par un réel ». On dit que ' +
          '<code>(E, +, ·)</code> est un <strong>espace vectoriel sur ℝ</strong> si :</p>',
          '<ul>\n' +
          '    <li><code>(E, +)</code> est un groupe commutatif : addition associative et commutative, ' +
          'élément neutre <code>0<sub>E</sub></code>, tout élément a un opposé ;</li>\n' +
          '    <li><code>1 · u = u</code> pour tout u ;</li>\n' +
          '    <li><code>k · (u + v) = k·u + k·v</code> (distributivité à droite) ;</li>\n' +
          '    <li><code>(k + k′) · u = k·u + k′·u</code> (distributivité à gauche) ;</li>\n' +
          '    <li><code>k · (k′ · u) = (k · k′) · u</code> (associativité mixte).</li>\n' +
          '  </ul>',
          '<p>Les éléments de E s’appellent des <strong>vecteurs</strong> — même quand ce sont des matrices, ' +
          'des polynômes ou des fonctions. Les réels k s’appellent des <strong>scalaires</strong>.</p>',
          box('intuition', 'Pourquoi huit axiomes ?', 'compass',
            '    <p>Ces axiomes ne sont pas un exercice de style : ils sont exactement ce qu’il faut pour que ' +
            'les calculs habituels — développement, mise en facteur, résolution — restent valides. Une fois ' +
            'les axiomes posés, <em>tout</em> théorème démontré dans un espace vectoriel vaut pour les ' +
            'matrices, les polynômes et les fonctions en même temps.</p>'),
          box('mnemo', 'Mnémotechnique — « CANE-DAD »', 'pin',
            '    <p>Les axiomes se retiennent par groupes : <strong>C</strong>ommutatif, <strong>A</strong>ssociatif, ' +
            '<strong>N</strong>eutre, opposé (<strong>E</strong>lément symétrique) pour l’addition, puis ' +
            '<strong>D</strong>istributivité, <strong>A</strong>ssociativité mixte, <strong>D</strong>eux ' +
            'distributivités pour les scalaires.</p>')
        ].join('\n')
      },
      {
        title: 'Les exemples fondamentaux',
        html: [
          '<p>Les mêmes axiomes décrivent des objets très différents. En voici les quatre classiques :</p>',
          '<table>\n' +
          '    <tr><th>Ensemble E</th><th>Addition</th><th>Multiplication par un réel</th></tr>\n' +
          '    <tr><td>ℝⁿ (vecteurs à n composantes)</td><td>composante par composante</td><td>sur chaque composante</td></tr>\n' +
          '    <tr><td>M<sub>m,n</sub>(ℝ) (matrices)</td><td>coefficient par coefficient</td><td>sur chaque coefficient</td></tr>\n' +
          '    <tr><td>ℝ<sub>n</sub>[X] (polynômes de degré ≤ n)</td><td>somme des polynômes</td><td>on multiplie tous les coefficients</td></tr>\n' +
          '    <tr><td>F(I, ℝ) (fonctions de I dans ℝ)</td><td>(f + g)(x) = f(x) + g(x)</td><td>(k·f)(x) = k · f(x)</td></tr>\n' +
          '  </table>',
          '<p>Le <strong>vecteur nul</strong> de ℝⁿ est <code>(0, 0, …, 0)</code>, celui des matrices la ' +
          'matrice nulle, celui des polynômes le polynôme nul, celui des fonctions la fonction qui vaut 0 ' +
          'partout.</p>',
          box('tech', 'En informatique', 'wrench',
            '    <p>Un <em>vecteur d’embarquement</em> d’un modèle de machine learning, une image de 1 024 ' +
            'pixels, les paramètres d’un réseau de neurones : autant d’éléments de ℝⁿ qui se manipulent avec ' +
            'les opérations définies ici. Le <em>word embedding</em> d’un moteur de recherche range un mot ' +
            'dans ℝ³⁰⁰ — et comparer deux mots, c’est calculer une distance entre vecteurs.</p>')
        ].join('\n')
      },
      {
        title: 'Sous-espaces vectoriels',
        html: [
          '<p><strong>Définition.</strong> Soit F une partie non vide de E. On dit que F est un ' +
          '<strong>sous-espace vectoriel</strong> de E si, muni des mêmes lois, F est lui-même un espace ' +
          'vectoriel.</p>',
          '<p><strong>Critère pratique.</strong> Pour montrer que F est un sous-espace vectoriel de E, ' +
          'il suffit de vérifier trois points :</p>',
          '<pre><code>1.  F ≠ ∅              (en pratique : 0<sub>E</sub> ∈ F)\n' +
          '2.  ∀u, v ∈ F :  u + v ∈ F          (stable par addition)\n' +
          '3.  ∀k ∈ ℝ, ∀u ∈ F :  k · u ∈ F     (stable par multiplication scalaire)\n' +
          '\n' +
          'Les points 2 et 3 se résument souvent en un seul :\n' +
          '    ∀u, v ∈ F, ∀k ∈ ℝ :  k·u + v ∈ F</code></pre>',
          '<p>Il n’est <strong>jamais</strong> nécessaire de revérifier les huit axiomes : ils se transmettent ' +
          'de E à F. C’est tout l’intérêt du critère.</p>',
          '<p><strong>Exemples.</strong> Le plan <code>z = 0</code> est un sous-espace de ℝ³ : la somme de ' +
          'deux vecteurs à troisième coordonnée nulle reste à troisième coordonnée nulle. En revanche ' +
          'l’ensemble <code>{ (x, y, z) | z = 1 }</code> n’en est pas un : il ne contient pas le vecteur nul, ' +
          'et la somme de deux de ses vecteurs donne <code>z = 2</code>.</p>',
          box('pitfall', 'Piège — oublier le vecteur nul', 'warning',
            '    <p>Un sous-ensemble qui ne contient pas <code>0<sub>E</sub></code> n’est jamais un ' +
            'sous-espace vectoriel. C’est le test le plus rapide : dès qu’une condition affine du style ' +
            '<code>= 1</code>, <code>&gt; 0</code> ou <code>≠ 0</code> apparaît, ce n’est pas un ' +
            'sous-espace.</p>')
        ].join('\n')
      },
      {
        title: 'Sous-espace engendré, somme de sous-espaces',
        html: [
          '<p><strong>Définition.</strong> Soit <code>v₁, …, vₚ</code> une famille de vecteurs de E. ' +
          'L’ensemble de toutes les combinaisons linéaires de ces vecteurs,</p>',
          '<pre><code>Vect(v₁, …, vₚ) = { a₁·v₁ + … + aₚ·vₚ | a₁, …, aₚ ∈ ℝ }</code></pre>',
          '<p>est un sous-espace vectoriel de E : le <strong>sous-espace engendré</strong> par la famille. ' +
          'La famille est dite <strong>génératrice</strong> de ce sous-espace.</p>',
          '<p><strong>Somme de deux sous-espaces.</strong> Si F et G sont deux sous-espaces de E :</p>',
          '<pre><code>F + G = { u + v | u ∈ F, v ∈ G }</code></pre>',
          '<p>Cet ensemble est encore un sous-espace vectoriel de E, et c’est le plus petit qui contienne ' +
          'à la fois F et G. Quand <code>F ∩ G = {0}</code>, la somme est dite <strong>directe</strong> et ' +
          'se note <code>F ⊕ G</code> : tout vecteur de la somme s’écrit alors d’une seule manière comme ' +
          '<code>u + v</code>.</p>',
          box('tech', 'Interpréter une famille comme une matrice', 'terminal',
            '    <p>Un sous-espace engendré se calcule : ranger les vecteurs en <em>colonnes</em> d’une ' +
            'matrice, puis échelonner. Le nombre de pivots donne la dimension de l’espace engendré.</p>\n' +
            '    <pre><code>v1 = (1, 2, 3)\n' +
            'v2 = (0, 1, 4)\n' +
            'v3 = (1, 3, 7)\n' +
            '\n' +
            '# v3 = v1 + v2 : les trois vecteurs n’engendrent pas ℝ³\n' +
            '# mais un plan de dimension 2.</code></pre>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Un espace vectoriel sur ℝ doit contenir…', opts: ['au moins deux vecteurs', 'un élément neutre pour l’addition', 'une base canonique'], correct: 1, exp: 'L’axiome du groupe commutatif impose l’existence de 0<sub>E</sub>.' },
      { stem: 'Pour montrer que F est un sous-espace vectoriel de E, il suffit de vérifier…', opts: ['les huit axiomes', '0 ∈ F, stabilité par addition et par scalaire', 'que F est fini'], correct: 1, exp: 'Les axiomes se transmettent de E à F : trois points suffisent.' },
      { stem: 'L’ensemble { (x, y, z) ∈ ℝ³ | z = 1 } est-il un sous-espace vectoriel ?', opts: ['Oui', 'Non, il ne contient pas le vecteur nul', 'Oui, il est stable par addition'], correct: 1, exp: 'Il ne contient pas (0, 0, 0) : ce n’est pas un sous-espace.' },
      { stem: 'Que désigne <code>Vect(v₁, …, vₚ)</code> ?', opts: ['les vecteurs de la famille', 'toutes les combinaisons linéaires de la famille', 'les vecteurs orthogonaux'], correct: 1, exp: 'C’est l’ensemble des combinaisons linéaires : un sous-espace.' },
      { stem: 'Quand la somme <code>F + G</code> est-elle directe ?', opts: ['quand F = G', 'quand F ∩ G = {0}', 'quand F et G sont de même dimension'], correct: 1, exp: 'L’intersection réduite au vecteur nul rend la décomposition unique.' },
      { stem: 'Le vecteur nul d’un espace de polynômes est…', opts: ['le polynôme constant 1', 'le polynôme nul', 'il n’existe pas'], correct: 1, exp: 'Le neutre de l’addition des polynômes est le polynôme identiquement nul.' }
    ],

    pitfalls: [
      '<strong>Tester les huit axiomes</strong> au lieu des trois points du critère.',
      '<strong>Oublier le vecteur nul</strong> : un ensemble défini par une égalité affine n’est pas un sous-espace.',
      '<strong>Confondre famille et sous-espace</strong> : <code>{v₁, v₂}</code> n’est pas <code>Vect(v₁, v₂)</code>.',
      '<strong>Croire que F ∪ G est un sous-espace</strong> : l’union ne l’est pas en général, la somme oui.',
      '<strong>Vérifier la stabilité seulement pour la somme</strong> et oublier la multiplication par un réel (ou l’inverse).'
    ],

    methodTitle: 'Montrer qu’un ensemble est un sous-espace vectoriel',
    method: [
      '<strong>Montrer que F n’est pas vide</strong> : exhiber le vecteur nul, ou un vecteur explicite.',
      '<strong>Prendre deux vecteurs génériques</strong> u, v de F (avec des paramètres, pas des exemples).',
      '<strong>Calculer <code>k·u + v</code></strong> et vérifier que le résultat est encore dans F.',
      '<strong>Conclure</strong> par le critère : F est un sous-espace vectoriel de E.',
      '<strong>Contre-exemple</strong> : si un des points échoue, exhiber un cas concret qui le prouve.'
    ],

    summary: [
      'Un espace vectoriel est un ensemble muni de deux lois (interne et externe) satisfaisant huit axiomes.',
      'ℝⁿ, les matrices, les polynômes et les fonctions sont les quatre exemples à connaître.',
      'Critère de sous-espace : <code>0 ∈ F</code>, stable par addition et par multiplication scalaire.',
      'Le sous-espace engendré par une famille est l’ensemble de toutes ses combinaisons linéaires.',
      '<code>F + G</code> est un sous-espace ; la somme est directe quand <code>F ∩ G = {0}</code>.'
    ],

    checklist: [
      'Je cite les axiomes par groupes (CANE-DAD) sans les réciter en désordre.',
      'Je donne le vecteur nul d’un espace de matrices ou de polynômes.',
      'J’applique le critère de sous-espace en trois points.',
      'Je distingue une famille de vecteurs du sous-espace qu’elle engendre.'
    ],

    notions: ['espace vectoriel', 'scalaire', 'vecteur nul', 'sous-espace vectoriel', 'critère de sous-espace', 'combinaison linéaire', 'sous-espace engendré', 'somme directe'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends les axiomes et le critère, sections 1 et 3.' },
      { cls: 'mid', text: '50–69 % — Refais les exercices de niveau 1 de l’atelier du chapitre 4.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible le vecteur nul et les contre-exemples.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 5, familles libres et rang.' }
    ],

    flashcards: [
      { q: 'Combien d’axiomes définissent un espace vectoriel ?', a: 'Huit, regroupés en « CANE-DAD » : groupe commutatif, puis distributivités et associativité mixte.' },
      { q: 'Critère pratique de sous-espace vectoriel ?', a: '<code>F ≠ ∅</code> (en pratique <code>0 ∈ F</code>), stable par addition et par multiplication scalaire.' },
      { q: 'Que désigne <code>Vect(v₁, …, vₚ)</code> ?', a: 'L’ensemble de toutes les combinaisons linéaires de la famille : un sous-espace vectoriel.' },
      { q: 'Quand <code>F + G</code> est-elle directe ?', a: 'Quand <code>F ∩ G = {0}</code> : la décomposition u + v est alors unique.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Familles libres, génératrices, bases et rang',
    toc: 'Familles génératrices et libres, bases et dimension, rang d’une famille et d’une matrice.',
    time: '≈ 3 h de travail',

    situation:
      'Tu disposes d’un jeu de trois vecteurs dans le plan : l’un d’eux est forcément de trop. Pourquoi ? ' +
      'Parce que le plan est de dimension 2. Distinguer les vecteurs qui apportent une vraie information de ' +
      'ceux qui sont « déjà contenus » dans les autres, c’est l’objet de ce chapitre — et c’est aussi ce que ' +
      'fait un algorithme de compression quand il élimine les données redondantes.',

    objectives: [
      'reconnaître une famille génératrice d’un espace vectoriel ;',
      'démontrer qu’une famille est libre ou liée ;',
      'définir une base et calculer la dimension d’un espace ;',
      'calculer le rang d’une famille de vecteurs et d’une matrice.'
    ],

    sections: [
      {
        title: 'Familles génératrices',
        html: [
          '<p><strong>Définition.</strong> Une famille <code>(v₁, …, vₚ)</code> de vecteurs de E est ' +
          '<strong>génératrice</strong> de E si tout vecteur de E s’écrit comme combinaison linéaire de la ' +
          'famille : pour tout <code>u ∈ E</code>, il existe des réels <code>a₁, …, aₚ</code> tels que</p>',
          '<pre><code>u = a₁·v₁ + a₂·v₂ + … + aₚ·vₚ</code></pre>',
          '<p>Les coefficients <code>a₁, …, aₚ</code> sont les <strong>coordonnées</strong> de u dans la ' +
          'famille. Trouver ces coordonnées est exactement résoudre un système linéaire — la méthode de Gauss ' +
          'du chapitre 3 sert donc directement ici.</p>',
          box('tech', 'Exemple décisif', 'wrench',
            '    <p>Dans ℝ³, la famille canonique <code>e₁ = (1,0,0), e₂ = (0,1,0), e₃ = (0,0,1)</code> est ' +
            'génératrice : <code>(x, y, z) = x·e₁ + y·e₂ + z·e₃</code>. Les coordonnées sont exactement les ' +
            'composantes du vecteur.</p>\n' +
            '    <p>En revanche la famille <code>(1,0,0), (0,1,0)</code> n’engendre que le plan ' +
            '<code>z = 0</code> : elle n’est pas génératrice de ℝ³.</p>')
        ].join('\n')
      },
      {
        title: 'Familles libres et familles liées',
        html: [
          '<p><strong>Définition.</strong> Une famille <code>(v₁, …, vₚ)</code> est <strong>libre</strong> ' +
          '(ou les vecteurs sont linéairement indépendants) si la seule combinaison linéaire nulle est celle ' +
          'dont tous les coefficients sont nuls :</p>',
          '<pre><code>a₁·v₁ + … + aₚ·vₚ = 0   ⇒   a₁ = a₂ = … = aₚ = 0</code></pre>',
          '<p>Dans le cas contraire, la famille est <strong>liée</strong> : il existe des coefficients non ' +
          'tous nuls qui donnent le vecteur nul, autrement dit un vecteur de la famille est combinaison ' +
          'linéaire des autres.</p>',
          '<p><strong>Comment tester ?</strong> On écrit l’équation <code>a₁·v₁ + … + aₚ·vₚ = 0</code>, on ' +
          'obtient un système homogène, et on l’échelonne :</p>',
          '<ul>\n' +
          '    <li>une seule solution, la solution nulle → la famille est <strong>libre</strong> ;</li>\n' +
          '    <li>une infinité de solutions → la famille est <strong>liée</strong>.</li>\n' +
          '  </ul>',
          box('pitfall', 'Piège — « aucun vecteur n’est un multiple d’un autre »', 'warning',
            '    <p>Cette vérification rapide ne suffit que pour <strong>deux</strong> vecteurs. Avec trois ' +
            'vecteurs, une famille peut être liée sans qu’aucun ne soit multiple d’un autre : c’est le cas de ' +
            '<code>(1,0,0), (0,1,0), (1,1,0)</code>, où le troisième est la somme des deux premiers. ' +
            'Au-delà de deux vecteurs, il faut échelonner.</p>'),
          box('mnemo', 'Mnémotechnique — « libre = zéro seul »', 'pin',
            '    <p>Libre se retient en une phrase : <strong>« pour annuler, on est obligé de tout mettre à ' +
            'zéro »</strong>. Liée, c’est l’inverse : <strong>« on peut annuler sans tout mettre à zéro »</strong> — ' +
            'donc un vecteur est de trop.</p>')
        ].join('\n')
      },
      {
        title: 'Bases et dimension',
        html: [
          '<p><strong>Définition.</strong> Une <strong>base</strong> de E est une famille qui est à la fois ' +
          '<strong>libre</strong> et <strong>génératrice</strong> de E.</p>',
          '<p>Une base cumule les deux avantages : être génératrice garantit que <em>tout</em> vecteur s’écrit ' +
          'dans la base ; être libre garantit que cette écriture est <em>unique</em>. C’est cette unicité qui ' +
          'rend les coordonnées exploitables.</p>',
          '<p><strong>Théorème (dimension).</strong> Dans un espace vectoriel admettant une base, toutes les ' +
          'bases ont le même nombre d’éléments. Ce nombre est la <strong>dimension</strong> de E, notée ' +
          '<code>dim E</code>.</p>',
          '<pre><code>dim ℝ² = 2        dim ℝ³ = 3        dim ℝⁿ = n\n' +
          'dim M<sub>m,n</sub>(ℝ) = m × n          dim ℝ<sub>n</sub>[X] = n + 1</code></pre>',
          '<p>La <strong>base canonique</strong> de ℝⁿ est formée des vecteurs à une seule composante égale ' +
          'à 1. Pour les matrices <code>m × n</code>, la base canonique est l’ensemble des matrices ' +
          '<code>E<sub>ij</sub></code> n’ayant qu’un 1 en position (i, j).</p>',
          box('intuition', 'Un repère, c’est une base', 'compass',
            '    <p>Tu connais déjà des bases sans les nommer : donner la position d’un point par ' +
            '« 3 mètres à droite, 2 mètres en avant » revient à écrire ses coordonnées dans la base ' +
            'des deux directions du sol. Une base est un repère, et la dimension est le nombre de directions ' +
            'indépendantes nécessaires.</p>')
        ].join('\n')
      },
      {
        title: 'Rang d’une famille et d’une matrice',
        html: [
          '<p><strong>Définition.</strong> Le <strong>rang</strong> d’une famille de vecteurs est le nombre ' +
          'maximal de vecteurs linéairement indépendants qu’on peut en extraire. C’est aussi la dimension du ' +
          'sous-espace engendré.</p>',
          '<p>Pour une matrice <code>A</code>, le rang est défini de deux façons équivalentes :</p>',
          '<ul>\n' +
          '    <li>le rang des <strong>lignes</strong> (dimension de l’espace engendré par les lignes) ;</li>\n' +
          '    <li>le rang des <strong>colonnes</strong> (dimension de l’espace engendré par les colonnes).</li>\n' +
          '  </ul>',
          '<p>Un théorème fondamental affirme que ces deux nombres sont <em>toujours égaux</em> : on peut donc ' +
          'parler simplement du rang de A.</p>',
          '<p><strong>Calcul pratique.</strong> On échelonne la matrice et on compte les lignes non nulles — ' +
          'c’est-à-dire les pivots :</p>',
          '<pre><code>rang(A) = nombre de pivots après échelonnement\n' +
          '\n' +
          'Pour A carrée d’ordre n :\n' +
          '   A inversible  ⇔  rang(A) = n  ⇔  det(A) ≠ 0</code></pre>',
          box('tech', 'Exemple', 'terminal',
            '    <pre><code>M = [ 1  2  3 ]\n' +
            '    [ 2  4  6 ]      L2 = 2·L1  →  disparaît\n' +
            '    [ 1  0  1 ]\n' +
            '\n' +
            'Après élimination il reste 2 lignes indépendantes :\n' +
            'rang(M) = 2.  Les lignes de M engendrent un plan de ℝ³.</code></pre>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Une famille est génératrice de E lorsque…', opts: ['elle est libre', 'tout vecteur de E s’écrit comme combinaison linéaire de la famille', 'elle contient le vecteur nul'], correct: 1, exp: 'C’est la définition : l’espace engendré est E tout entier.' },
      { stem: 'Une famille est libre lorsque…', opts: ['aucun vecteur n’est nul', 'a₁v₁ + … + aₚvₚ = 0 impose tous les aᵢ nuls', 'elle a p ≤ n vecteurs'], correct: 1, exp: 'L’indépendance linéaire : l’équation n’a que la solution nulle.' },
      { stem: 'Une base est une famille…', opts: ['libre seulement', 'génératrice seulement', 'libre et génératrice'], correct: 2, exp: 'Les deux propriétés ensemble, ce qui rend les coordonnées uniques.' },
      { stem: 'Que vaut <code>dim M<sub>2,3</sub>(ℝ)</code> ?', opts: ['2', '5', '6'], correct: 2, exp: 'La dimension est le nombre de coefficients : 2 × 3 = 6.' },
      { stem: 'Comment calcule-t-on le rang d’une matrice ?', opts: ['en comptant ses lignes', 'en échelonnant et en comptant les pivots', 'en calculant la trace'], correct: 1, exp: 'Le rang est le nombre de pivots après échelonnement.' },
      { stem: 'Pour A carrée d’ordre n, <code>rang(A) = n</code> équivaut à…', opts: ['det(A) = 0', 'A est inversible', 'A est symétrique'], correct: 1, exp: 'rang = n ⇔ det ≠ 0 ⇔ A inversible.' }
    ],

    pitfalls: [
      '<strong>Confondre libre et génératrice</strong> : ce sont deux propriétés indépendantes.',
      '<strong>Test « pas de multiple »</strong> appliqué à plus de deux vecteurs.',
      '<strong>Conclusion sur une famille vide ou contenant 0</strong> : toute famille contenant le vecteur nul est liée.',
      '<strong>Rang calculé sur la matrice non échelonnée</strong> : il faut compter les pivots, pas les lignes.',
      '<strong>Dimension confondue avec le nombre de vecteurs</strong> d’une famille : seule une base a autant d’éléments que la dimension.'
    ],

    methodTitle: 'Étudier une famille de vecteurs',
    method: [
      '<strong>Ranger les vecteurs en colonnes</strong> dans une matrice.',
      '<strong>Échelonner</strong> par la méthode du pivot.',
      '<strong>Compter les pivots</strong> : c’est le rang, donc la dimension de l’espace engendré.',
      '<strong>Comparer</strong> au nombre de vecteurs : égalité ⇒ famille libre ; strictement inférieur ⇒ famille liée.',
      '<strong>Conclure sur la base</strong> : libre avec rang = dim E ⇒ la famille est une base de E.'
    ],

    summary: [
      'Génératrice : tout vecteur de E est combinaison linéaire de la famille ; les coefficients sont les coordonnées.',
      'Libre : la seule combinaison linéaire nulle a tous ses coefficients nuls ; sinon la famille est liée.',
      'Base = famille libre <em>et</em> génératrice ; les coordonnées y sont uniques.',
      'Toutes les bases d’un espace ont le même cardinal : la dimension.',
      'Rang = nombre de pivots après échelonnement = dimension du sous-espace engendré.'
    ],

    checklist: [
      'Je distingue clairement famille libre et famille génératrice.',
      'Je teste la liberté par échelonnement, pas par intuition.',
      'Je donne la dimension de ℝⁿ, de M<sub>m,n</sub> et de ℝ<sub>n</sub>[X].',
      'Je calcule un rang et j’en déduis l’inversibilité d’une matrice carrée.'
    ],

    notions: ['famille génératrice', 'coordonnées', 'famille libre', 'famille liée', 'base', 'dimension', 'rang d’une famille', 'rang d’une matrice'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends les définitions des sections 1 et 2 en les écrivant au mot.' },
      { cls: 'mid', text: '50–69 % — Refais les calculs de rang de l’atelier du chapitre 5.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible le lien rang / liberté / dimension.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 6, déterminants et applications linéaires.' }
    ],

    flashcards: [
      { q: 'Différence entre libre et génératrice ?', a: 'Libre : seule la combinaison nulle annule la famille. Génératrice : tout vecteur de E s’écrit dans la famille.' },
      { q: 'Qu’est-ce qu’une base ?', a: 'Une famille libre <em>et</em> génératrice : les coordonnées de tout vecteur y sont uniques.' },
      { q: 'Comment calcule-t-on un rang ?', a: 'On échelonne la matrice et on compte les pivots (lignes non nulles).' },
      { q: 'Que vaut <code>dim ℝ<sub>n</sub>[X]</code> ?', a: '<code>n + 1</code> : les polynômes de la base sont 1, X, X², …, Xⁿ.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Déterminants, applications linéaires et valeurs propres',
    toc: 'Calcul du déterminant, propriétés, noyau et image d’une application linéaire, valeurs propres.',
    time: '≈ 3 h 30 de travail',

    situation:
      'Un logiciel de vision par ordinateur fait pivoter une image : géométriquement, c’est une ' +
      'transformation du plan. Cette transformation est une application linéaire, elle se code par une ' +
      'matrice, et deux questions se posent immédiatement : garde-t-elle l’information (déterminant non nul) ' +
      'et existe-t-il des directions qu’elle ne fait que dilater (valeurs propres) ? Ce dernier chapitre ' +
      'répond à ces deux questions.',

    objectives: [
      'calculer un déterminant 2 × 2 et 3 × 3 par développement ;',
      'appliquer les propriétés du déterminant ;',
      'définir une application linéaire et déterminer noyau et image ;',
      'calculer les valeurs propres d’une matrice 2 × 2.'
    ],

    sections: [
      {
        title: 'Le déterminant : définition et calcul',
        html: [
          '<p><strong>Définition.</strong> Le <strong>déterminant</strong> est un nombre associé à toute ' +
          'matrice carrée. On le note <code>det(A)</code> ou <code>|A|</code>. Il mesure en quelque sorte le ' +
          '« volume » du parallélépipède construit sur les lignes de A — et lorsqu’il est nul, ce volume ' +
          'est plat : les lignes sont dépendantes.</p>',
          '<p><strong>Ordre 2.</strong> La formule est directe :</p>',
          '<pre><code>     [ a  b ]\n' +
          'det  [ c  d ]  =  a·d − b·c</code></pre>',
          '<p><strong>Ordre 3.</strong> On développe selon la première ligne, en alternant les signes ' +
          '<code>+ − +</code> :</p>',
          '<pre><code>     [ a  b  c ]\n' +
          'det  [ d  e  f ]  =  a(e·i − f·h) − b(d·i − f·g) + c(d·h − e·g)\n' +
          '     [ g  h  i ]</code></pre>',
          box('mnemo', 'Mnémotechnique — la règle de Sarrus (ordre 3) et les signes', 'pin',
            '    <p>Pour une matrice 3 × 3, la <strong>règle de Sarrus</strong> évite le développement : on ' +
            'recopie les deux premières colonnes à droite, puis on additionne les trois diagonales ' +
            '« descendantes » et on retranche les trois « montantes ».</p>\n' +
            '    <p>Et pour ne jamais se tromper sur les signes du développement : <strong>« + − + »</strong> ' +
            'le long de la première ligne, comme les cases d’un échiquier.</p>'),
          '<p><strong>Propriétés à connaître par cœur :</strong></p>',
          '<table>\n' +
          '    <tr><th>Propriété</th><th>Formule</th></tr>\n' +
          '    <tr><td>Déterminant d’un produit</td><td><code>det(A · B) = det(A) · det(B)</code></td></tr>\n' +
          '    <tr><td>Transposée</td><td><code>det(<sup>t</sup>A) = det(A)</code></td></tr>\n' +
          '    <tr><td>Multiplication par un scalaire</td><td><code>det(k · A) = kⁿ · det(A)</code> (A de taille n)</td></tr>\n' +
          '    <tr><td>Échange de deux lignes</td><td>le déterminant <strong>change de signe</strong></td></tr>\n' +
          '    <tr><td>Ajout de k·L<sub>j</sub> à L<sub>i</sub></td><td>le déterminant est <strong>inchangé</strong></td></tr>\n' +
          '    <tr><td>Ligne ou colonne nulle</td><td><code>det(A) = 0</code></td></tr>\n' +
          '  </table>'
        ].join('\n')
      },
      {
        title: 'Applications linéaires',
        html: [
          '<p><strong>Définition.</strong> Soient E et F deux espaces vectoriels. Une application ' +
          '<code>f : E → F</code> est <strong>linéaire</strong> si elle respecte les deux lois :</p>',
          '<pre><code>f(u + v) = f(u) + f(v)          (additivité)\n' +
          'f(k · u) = k · f(u)              (homogénéité)\n' +
          '\n' +
          'Les deux se résument en une seule condition :\n' +
          'f(k·u + v) = k·f(u) + f(v)</code></pre>',
          '<p><strong>Conséquence immédiate :</strong> une application linéaire envoie toujours le vecteur ' +
          'nul sur le vecteur nul, <code>f(0) = 0</code>. C’est le premier contrôle à faire : si ' +
          '<code>f(0) ≠ 0</code>, l’application n’est pas linéaire.</p>',
          '<p><strong>Noyau et image.</strong> Deux sous-espaces décrivent complètement une application ' +
          'linéaire :</p>',
          '<pre><code>ker f = { u ∈ E | f(u) = 0 }        sous-espace de E\n' +
          'Im f  = { f(u) | u ∈ E }            sous-espace de F\n' +
          '\n' +
          'Théorème du rang :   dim(ker f) + dim(Im f) = dim E</code></pre>',
          '<p>L’injectivité se lit sur le noyau : <code>f</code> est injective si et seulement si ' +
          '<code>ker f = {0}</code>.</p>',
          box('tech', 'La matrice associée', 'wrench',
            '    <p>Toute application linéaire de ℝⁿ dans ℝᵖ s’écrit <code>f(X) = A·X</code>, où A est la ' +
            'matrice <code>p × n</code> dont les <em>colonnes</em> sont les images des vecteurs de la base ' +
            'canonique.</p>\n' +
            '    <p>Exemple : <code>f(x, y, z) = (x + y, y + z)</code> a pour matrice ' +
            '<code>[[1, 1, 0], [0, 1, 1]]</code> — une matrice 2 × 3, conforme au passage de ℝ³ dans ℝ².</p>')
        ].join('\n')
      },
      {
        title: 'Valeurs propres et vecteurs propres',
        html: [
          '<p><strong>Définition.</strong> Soit A une matrice carrée. Un réel λ est une ' +
          '<strong>valeur propre</strong> de A s’il existe un vecteur <code>X ≠ 0</code> tel que</p>',
          '<pre><code>A · X = λ · X</code></pre>',
          '<p>Le vecteur X est alors un <strong>vecteur propre</strong> associé à λ. Géométriquement, dans la ' +
          'direction de X, la transformation <code>A</code> se réduit à une homothétie de rapport λ : ' +
          'elle ne change pas la direction, seulement la longueur (et éventuellement le sens).</p>',
          '<p><strong>Comment les trouver ?</strong> L’équation s’écrit <code>(A − λ·I)·X = 0</code>. Comme ' +
          'on cherche <code>X ≠ 0</code>, cette équation n’a de solution non nulle que si la matrice ' +
          '<code>A − λ·I</code> est <em>non inversible</em> :</p>',
          '<pre><code>det(A − λ·I) = 0        ← polynôme caractéristique</code></pre>',
          '<p>Pour une matrice 2 × 2, ce déterminant est un polynôme du second degré : on le résout avec le ' +
          'discriminant.</p>',
          '<p><strong>Exemple complet.</strong> <code>A = [[4, 1], [2, 3]]</code> :</p>',
          '<pre><code>det(A − λI) = (4 − λ)(3 − λ) − 1·2 = λ² − 7λ + 10 = 0\n' +
          'Δ = 49 − 40 = 9     ⇒     λ = (7 ± 3)/2\n' +
          '\n' +
          'Valeurs propres :  λ₁ = 5      λ₂ = 2</code></pre>',
          box('intuition', 'Pourquoi cela compte en informatique', 'compass',
            '    <p>Les valeurs propres servent à mesurer la stabilité d’un système, à comprimer des images ' +
            '(l’analyse en composantes principales ne garde que les grandes valeurs propres), à classer les ' +
            'pages du Web (l’algorithme PageRank cherche un vecteur propre) et à étudier la convergence d’un ' +
            'algorithme itératif. C’est l’outil de réduction d’une matrice.</p>'),
          box('pitfall', 'Piège — oublier que X ≠ 0', 'warning',
            '    <p>Le vecteur nul vérifie <code>A·0 = λ·0</code> pour <em>n’importe quel</em> λ : il n’est ' +
            'donc jamais un vecteur propre. Un vecteur propre est par définition non nul — sinon la notion ' +
            'n’aurait aucun sens.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que vaut <code>det [[a, b], [c, d]]</code> ?', opts: ['ad + bc', 'ad − bc', 'ab − cd'], correct: 1, exp: 'Le produit de la diagonale moins le produit de l’anti-diagonale.' },
      { stem: 'Que devient le déterminant si l’on échange deux lignes ?', opts: ['Il ne change pas', 'Il change de signe', 'Il devient nul'], correct: 1, exp: 'L’échange de deux lignes inverse le signe du déterminant.' },
      { stem: 'Que vaut <code>det(A · B)</code> ?', opts: ['det(A) + det(B)', 'det(A) · det(B)', 'det(A) / det(B)'], correct: 1, exp: 'Le déterminant est multiplicatif.' },
      { stem: 'Une application linéaire vérifie nécessairement…', opts: ['f(0) = 0', 'f(1) = 1', 'f est croissante'], correct: 0, exp: 'Test rapide : si f(0) ≠ 0, l’application n’est pas linéaire.' },
      { stem: 'Une application linéaire est injective si et seulement si…', opts: ['son noyau est {0}', 'son image est E', 'sa matrice est carrée'], correct: 0, exp: 'ker f = {0} ⇔ f injective.' },
      { stem: 'Comment trouve-t-on les valeurs propres de A ?', opts: ['en résolvant det(A − λI) = 0', 'en calculant la trace', 'en inversant A'], correct: 0, exp: 'Les valeurs propres sont les racines du polynôme caractéristique.' }
    ],

    pitfalls: [
      '<strong>Signes du développement</strong> : alterner <code>+ − +</code> sur la ligne de développement.',
      '<strong>Confondre det(A) = 0 et A = 0</strong> : une matrice non nulle peut être singulière.',
      '<strong>Oublier <code>det(k·A) = kⁿ·det(A)</code></strong> et écrire simplement <code>k·det(A)</code>.',
      '<strong>Tester la linéarité sur un exemple</strong> au lieu de la formule générale.',
      '<strong>Vecteur propre nul</strong> : accepter X = 0, qui n’est jamais un vecteur propre.'
    ],

    methodTitle: 'Étudier une application linéaire donnée par sa matrice',
    method: [
      '<strong>Vérifier la linéarité</strong> avec <code>f(k·u + v) = k·f(u) + f(v)</code>, ou contrôler <code>f(0) = 0</code>.',
      '<strong>Écrire la matrice</strong> dont les colonnes sont les images des vecteurs de la base canonique.',
      '<strong>Déterminer le noyau</strong> en résolvant <code>A·X = 0</code> par échelonnement.',
      '<strong>Calculer le rang</strong> : il donne <code>dim(Im f)</code>, et le théorème du rang donne <code>dim(ker f)</code>.',
      '<strong>Conclure</strong> : injective si le noyau est réduit à {0}, surjective si le rang égale la dimension d’arrivée.'
    ],

    summary: [
      'det 2 × 2 : <code>ad − bc</code> ; det 3 × 3 : développement <code>+ − +</code> ou règle de Sarrus.',
      '<code>det(A·B) = det(A)·det(B)</code>, <code>det(<sup>t</sup>A) = det(A)</code>, <code>det(k·A) = kⁿ·det(A)</code>.',
      'Une application linéaire respecte addition et multiplication scalaire, et vérifie <code>f(0) = 0</code>.',
      '<code>ker f = {u | f(u) = 0}</code>, <code>Im f = {f(u)}</code>, et <code>dim ker f + dim Im f = dim E</code>.',
      'Les valeurs propres annulent <code>det(A − λI) = 0</code> ; le vecteur propre associé n’est jamais nul.'
    ],

    checklist: [
      'Je calcule un déterminant 2 × 2 et 3 × 3 sans hésiter.',
      'Je connais les propriétés du déterminant, produit et scalaire compris.',
      'Je détermine le noyau et l’image d’une application linéaire simple.',
      'Je trouve les valeurs propres d’une matrice 2 × 2 par le discriminant.'
    ],

    notions: ['déterminant', 'règle de Sarrus', 'application linéaire', 'noyau', 'image', 'théorème du rang', 'valeur propre', 'vecteur propre'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends le calcul du déterminant 3 × 3, section 1.' },
      { cls: 'mid', text: '50–69 % — Refais les valeurs propres de l’atelier du chapitre 6.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible le théorème du rang.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise du cours : revois les examens blancs et le projet intégrateur.' }
    ],

    flashcards: [
      { q: 'Formule du déterminant 3 × 3 par développement ?', a: '<code>a(ei − fh) − b(di − fg) + c(dh − eg)</code>, avec les signes + − +.' },
      { q: 'Que signifie <code>det(A) = 0</code> ?', a: 'A est singulière : non inversible, rang &lt; n, lignes linéairement dépendantes.' },
      { q: 'Condition de linéarité de <code>f</code> ?', a: '<code>f(k·u + v) = k·f(u) + f(v)</code>, ce qui implique <code>f(0) = 0</code>.' },
      { q: 'Comment trouve-t-on les valeurs propres ?', a: 'On résout le polynôme caractéristique <code>det(A − λI) = 0</code>.' }
    ]
  }
];
