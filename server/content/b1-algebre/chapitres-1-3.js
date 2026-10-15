/**
 * Chapitres 1 à 3 du cours d'algèbre linéaire B1.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page : situation,
 * objectifs, sections (le corps théorique), QCM, pièges, méthode, révision,
 * notions et paliers de maîtrise. Aucun titre <h2> ici : la numérotation est
 * ajoutée au rendu, pour rester cohérente partout.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Vecteurs et matrices',
    short: 'Vecteurs et matrices',
    toc: 'Vecteurs de ℝⁿ, dimensions, matrices particulières, addition et multiplication par un scalaire.',
    time: '≈ 2 h 30 de travail',
    free: true,

    situation:
      'Le service scolarité te remet tes notes : trois contrôles par matière, cinq matières. Sur la feuille, ' +
      'ce ne sont que des nombres alignés. Dès qu’on veut calculer une moyenne pondérée, comparer deux ' +
      'étudiants ou transformer une image, il faut une notation qui décrive ces tableaux de nombres et les ' +
      'opérations qu’on peut leur appliquer. C’est exactement ce que font les vecteurs et les matrices.',

    objectives: [
      'reconnaître un vecteur de ℝⁿ et le lire comme une liste ordonnée de réels ;',
      'identifier les dimensions d’une matrice et nommer ses coefficients <code>a<sub>ij</sub></code> ;',
      'distinguer les matrices particulières : nulle, identité, diagonale, triangulaire ;',
      'additionner deux matrices et multiplier une matrice par un scalaire.'
    ],

    sections: [
      {
        title: 'Vecteurs de ℝⁿ',
        html: [
          '<p><strong>Définition.</strong> Soit n un entier naturel non nul. Un <strong>vecteur</strong> de ' +
          'ℝⁿ est une liste ordonnée de n nombres réels :</p>',
          '<pre><code>u = (u₁, u₂, …, uₙ)      avec u₁, …, uₙ ∈ ℝ</code></pre>',
          '<p>Les nombres <code>u₁, u₂, …</code> sont les <strong>composantes</strong> (ou coordonnées) de u. ' +
          'L’ordre compte : dans ℝ³, le vecteur <code>(1, 2, 3)</code> n’est pas le vecteur <code>(3, 2, 1)</code>.</p>',
          '<p>En informatique, un vecteur se range dans un tableau à une dimension. Le passage de la notation ' +
          'mathématique au code est direct :</p>',
          '<pre><code>u = (2, −1, 4)      # le vecteur\n' +
          'u = [2, -1, 4]      # le même en Python</code></pre>',
          box('intuition', 'Intuition', 'compass',
            '    <p>Un vecteur de ℝ² est une flèche dans le plan, un vecteur de ℝ³ une flèche dans l’espace. ' +
            'Au-delà de trois dimensions on ne dessine plus rien, mais les règles de calcul restent identiques : ' +
            'c’est tout l’intérêt de l’algèbre linéaire en informatique.</p>'),
          '<p><strong>Combinaison linéaire.</strong> Soient des vecteurs <code>v₁, …, vₚ</code> de ℝⁿ et des ' +
          'réels <code>a₁, …, aₚ</code>. Le vecteur</p>',
          '<pre><code>a₁·v₁ + a₂·v₂ + … + aₚ·vₚ</code></pre>',
          '<p>est une <strong>combinaison linéaire</strong> de <code>v₁, …, vₚ</code>. C’est la seule ' +
          'opération de base de tout le cours : additionner des vecteurs et les multiplier par des nombres.</p>'
        ].join('\n')
      },
      {
        title: 'Matrices : définition et vocabulaire',
        html: [
          '<p><strong>Définition.</strong> Une <strong>matrice</strong> à m lignes et n colonnes est un tableau ' +
          'rectangulaire de m × n nombres réels. On la note :</p>',
          '<pre><code>A = (a<sub>ij</sub>)      i = 1 … m (ligne),   j = 1 … n (colonne)\n' +
          '\n' +
          '        ⎛ a₁₁  a₁₂  …  a₁ₙ ⎞\n' +
          'A  =    ⎜ a₂₁  a₂₂  …  a₂ₙ ⎟\n' +
          '        ⎝ aₘ₁  aₘ₂  …  aₘₙ ⎠</code></pre>',
          '<p>Le nombre <code>a<sub>ij</sub></code> est le coefficient situé à la <strong>ligne i</strong> et à ' +
          'la <strong>colonne j</strong>. Le couple <code>(m, n)</code> est la <em>taille</em> ou la ' +
          '<em>dimension</em> de la matrice.</p>',
          '<p>Attention à l’ordre : on dit toujours « nombre de lignes × nombre de colonnes ». Une matrice ' +
          '<code>2 × 3</code> a 2 lignes et 3 colonnes, donc 6 coefficients — ce n’est pas la même chose qu’une ' +
          'matrice <code>3 × 2</code>.</p>',
          box('tech', 'En Python : une liste de listes', 'wrench',
            '    <p>Une matrice se représente naturellement par une liste de lignes, chaque ligne étant ' +
            'elle-même une liste.</p>\n' +
            '    <pre><code>A = [[1, 2, 3],\n' +
            '     [4, 5, 6]]     # 2 lignes, 3 colonnes\n' +
            '\n' +
            'A[0][2]   # ligne 0, colonne 2  →  3\n' +
            'len(A)      # nombre de lignes  →  2\n' +
            'len(A[0])   # nombre de colonnes →  3</code></pre>\n' +
            '    <p>Les indices commencent à 0 : <code>A[0][0]</code> est le coefficient <code>a₁₁</code>.</p>'),
          box('mnemo', 'Mnémotechnique — « Ligne Avant Colonne »', 'pin',
            '    <p>Pour retenir l’ordre d’écriture d’un coefficient : on dit et on écrit toujours ' +
            '« <strong>L</strong>igne <strong>A</strong>vant <strong>C</strong>olonne ». ' +
            '<code>a<sub>ij</sub></code> : i pour la ligne, j pour la colonne, comme dans l’alphabet.</p>')
        ].join('\n')
      },
      {
        title: 'Matrices particulières',
        html: [
          '<p>Certaines matrices reviennent sans cesse : les reconnaître fait gagner du temps.</p>',
          '<table>\n' +
          '    <tr><th>Nom</th><th>Définition</th><th>Exemple (3 × 3)</th></tr>\n' +
          '    <tr><td>Matrice nulle</td><td>tous les coefficients sont nuls</td><td>0&nbsp;0&nbsp;0 / 0&nbsp;0&nbsp;0 / 0&nbsp;0&nbsp;0</td></tr>\n' +
          '    <tr><td>Matrice identité I<sub>n</sub></td><td>1 sur la diagonale, 0 ailleurs</td><td>1&nbsp;0&nbsp;0 / 0&nbsp;1&nbsp;0 / 0&nbsp;0&nbsp;1</td></tr>\n' +
          '    <tr><td>Matrice diagonale</td><td>nulle hors de la diagonale</td><td>2&nbsp;0&nbsp;0 / 0&nbsp;−1&nbsp;0 / 0&nbsp;0&nbsp;5</td></tr>\n' +
          '    <tr><td>Matrice triangulaire</td><td>nulle au-dessus ou en dessous de la diagonale</td><td>1&nbsp;2&nbsp;3 / 0&nbsp;4&nbsp;5 / 0&nbsp;0&nbsp;6</td></tr>\n' +
          '  </table>',
          '<p>La <strong>diagonale</strong> d’une matrice carrée est la suite des coefficients ' +
          '<code>a₁₁, a₂₂, …, aₙₙ</code>. Leur somme s’appelle la <strong>trace</strong> : ' +
          '<code>tr(A) = a₁₁ + a₂₂ + … + aₙₙ</code>. La trace est calculable uniquement pour une matrice ' +
          'carrée.</p>',
          box('pitfall', 'Piège — « carrée » n’est pas « symétrique »', 'warning',
            '    <p>Une matrice est <strong>carrée</strong> quand elle a autant de lignes que de colonnes. ' +
            'Elle est <strong>symétrique</strong> quand, en plus, elle est invariante par symétrie autour de ' +
            'sa diagonale : <code>a<sub>ij</sub> = a<sub>ji</sub></code> pour tous i, j. Une matrice carrée ' +
            'n’est pas forcément symétrique — pense à <code>[[1, 2], [0, 3]]</code>.</p>')
        ].join('\n')
      },
      {
        title: 'Addition et multiplication par un scalaire',
        html: [
          '<p><strong>Addition.</strong> Deux matrices s’additionnent coefficient par coefficient, ' +
          '<em>à condition d’avoir exactement les mêmes dimensions</em> :</p>',
          '<pre><code>(A + B)<sub>ij</sub> = a<sub>ij</sub> + b<sub>ij</sub>\n' +
          '\n' +
          '[1 2]   [3 0]   [4 2]\n' +
          '[0 4] + [1 1] = [1 5]</code></pre>',
          '<p><strong>Multiplication par un scalaire.</strong> On multiplie <em>chaque</em> coefficient par ' +
          'le réel, appelé ici un scalaire :</p>',
          '<pre><code>(k · A)<sub>ij</sub> = k · a<sub>ij</sub>\n' +
          '\n' +
          '     [1 2]   [3  6]\n' +
          '3 ·  [0 4] = [0 12]</code></pre>',
          '<p>Ces deux opérations donnent à l’ensemble des matrices <code>m × n</code> une structure ' +
          'd’espace vectoriel — la notion du chapitre 4. Retiens dès maintenant leurs propriétés :</p>',
          '<ul>\n' +
          '    <li><code>A + B = B + A</code> (commutative) ;</li>\n' +
          '    <li><code>(A + B) + C = A + (B + C)</code> (associative) ;</li>\n' +
          '    <li><code>A + 0 = A</code> et <code>A + (−A) = 0</code> ;</li>\n' +
          '    <li><code>k·(A + B) = k·A + k·B</code> et <code>(k + k′)·A = k·A + k′·A</code>.</li>\n' +
          '  </ul>',
          box('tech', 'Le calcul en Python', 'terminal',
            '    <pre><code>A = [[1, 2], [0, 4]]\n' +
            'B = [[3, 0], [1, 1]]\n' +
            'k = 3\n' +
            '\n' +
            '# addition : même dimensions obligatoires\n' +
            'somme = [[A[i][j] + B[i][j] for j in range(2)] for i in range(2)]\n' +
            '# → [[4, 2], [1, 5]]\n' +
            '\n' +
            '# multiplication par un scalaire\n' +
            'triple = [[k * A[i][j] for j in range(2)] for i in range(2)]\n' +
            '# → [[3, 6], [0, 12]]</code></pre>\n' +
            '    <p>Avant toute addition, vérifie les dimensions : c’est la source d’erreur numéro un.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quelles sont les dimensions d’une matrice à 3 lignes et 4 colonnes ?', opts: ['4 × 3', '3 × 4', '12'], correct: 1, exp: 'On écrit toujours lignes × colonnes : 3 × 4.' },
      { stem: 'Dans la notation <code>a<sub>ij</sub></code>, que désigne j ?', opts: ['La ligne', 'La colonne', 'La valeur'], correct: 1, exp: 'i = ligne, j = colonne : « Ligne Avant Colonne ».' },
      { stem: 'Deux matrices peuvent être additionnées si…', opts: ['elles ont la même diagonale', 'elles ont les mêmes dimensions', 'elles sont carrées'], correct: 1, exp: 'L’addition est coefficient par coefficient : les dimensions doivent coïncider.' },
      { stem: 'Qu’est-ce que la matrice identité I<sub>n</sub> ?', opts: ['Des 1 partout', 'Des 1 sur la diagonale, des 0 ailleurs', 'Des 0 sur la diagonale'], correct: 1, exp: 'I<sub>n</sub> joue le rôle du 1 pour le produit matriciel.' },
      { stem: 'Que vaut <code>tr(A)</code> pour A = [2 1 ; 5 3] ?', opts: ['5', '7', '11'], correct: 0, exp: 'tr(A) = a₁₁ + a₂₂ = 2 + 3 = 5.' },
      { stem: 'Une matrice 2 × 5 contient combien de coefficients ?', opts: ['7', '10', '25'], correct: 1, exp: '2 × 5 = 10 coefficients.' }
    ],

    pitfalls: [
      '<strong>Dimensions inversées</strong> : écrire « 2 × 3 » pour une matrice de 3 lignes et 2 colonnes.',
      '<strong>Addition impossible</strong> : additionner une <code>2 × 3</code> et une <code>3 × 2</code> parce qu’elles « font 6 » chacune.',
      '<strong>Scalaire appliqué à une seule case</strong> : oublier des coefficients dans <code>k · A</code>.',
      '<strong>Trace sur une matrice rectangle</strong> : <code>tr(A)</code> n’existe que si A est carrée.',
      '<strong>Indice 1 en Python</strong> : écrire <code>A[1][1]</code> en croyant lire <code>a₁₁</code> — c’est en réalité <code>a₂₂</code>.'
    ],

    methodTitle: 'Lire et manipuler une matrice',
    method: [
      '<strong>Repérer la taille</strong> : compter les lignes, puis les colonnes, et l’écrire <code>m × n</code>.',
      '<strong>Nommer les coefficients</strong> : <code>a<sub>ij</sub></code> pour la ligne i, la colonne j.',
      '<strong>Vérifier les dimensions</strong> avant toute opération entre deux matrices.',
      '<strong>Calculer</strong> coefficient par coefficient, ligne par ligne, pour ne rien oublier.',
      '<strong>Contrôler</strong> un cas simple : une matrice 2 × 2 à la main avant de faire confiance au programme.'
    ],

    summary: [
      'Un vecteur de ℝⁿ est une liste ordonnée de n réels ; un vecteur de ℝ² est un point ou une flèche du plan.',
      'Une matrice <code>m × n</code> est un tableau de m lignes et n colonnes ; <code>a<sub>ij</sub></code> est à la ligne i, colonne j.',
      'Matrices particulières : nulle, identité <code>I<sub>n</sub></code>, diagonale, triangulaire.',
      'Addition et multiplication par un scalaire se font coefficient par coefficient, mêmes dimensions exigées pour l’addition.',
      'La trace est la somme des coefficients diagonaux d’une matrice carrée.'
    ],

    checklist: [
      'Je donne la taille d’une matrice sans hésiter.',
      'Je lis et j’écris un coefficient <code>a<sub>ij</sub></code> correctement.',
      'Je reconnais au premier coup d’œil I<sub>n</sub>, une matrice nulle et une matrice diagonale.',
      'J’additionne deux matrices et je multiplie par un scalaire sans erreur.'
    ],

    notions: ['vecteur de ℝⁿ', 'composante', 'matrice m × n', 'coefficient a<sub>ij</sub>', 'matrice carrée', 'matrice identité', 'trace', 'combinaison linéaire'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends les sections 2 et 3 en recopiant les exemples à la main.' },
      { cls: 'mid', text: '50–69 % — Refais les exercices de niveau 1 de l’atelier du chapitre 1.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible l’ordre des indices et les dimensions.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, le produit matriciel.' }
    ],

    flashcards: [
      { q: 'Quelles sont les dimensions d’une matrice ?', a: '<code>m × n</code> : m lignes et n colonnes, toujours dans cet ordre.' },
      { q: 'Que note <code>a<sub>ij</sub></code> ?', a: 'Le coefficient de la ligne i et de la colonne j — « Ligne Avant Colonne ».' },
      { q: 'Définis la matrice identité I<sub>n</sub>.', a: 'Des 1 sur la diagonale, des 0 partout ailleurs. Elle vérifie A · I = A.' },
      { q: 'Que vaut la trace d’une matrice diagonale ?', a: 'La somme de ses coefficients diagonaux, c’est-à-dire la somme des valeurs posées sur la diagonale.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Produit de matrices, transposée et trace',
    toc: 'Produit matriciel et condition d’existence, propriétés, transposée, symétrie et trace.',
    time: '≈ 3 h de travail',

    situation:
      'Une usine assemble trois modèles d’ordinateurs à partir de quatre composants. Le tableau « combien de ' +
      'chaque composant par modèle » est une matrice ; le tableau « combien coûte et pèse chaque composant » ' +
      'en est une autre. Le coût total par modèle n’est ni une addition ni un produit terme à terme : c’est un ' +
      'produit de matrices. Cette opération, la seule vraiment nouvelle du chapitre, est celle qui fait ' +
      '« circuler » les données d’un tableau à l’autre.',

    objectives: [
      'calculer le produit de deux matrices et vérifier sa condition d’existence ;',
      'énoncer les propriétés du produit : associatif, distributif, <em>non</em> commutatif ;',
      'calculer une transposée et appliquer ses propriétés ;',
      'calculer une trace et reconnaître une matrice symétrique.'
    ],

    sections: [
      {
        title: 'Le produit matriciel',
        html: [
          '<p><strong>Définition.</strong> Soient <code>A</code> de taille <code>m × n</code> et <code>B</code> ' +
          'de taille <code>n × p</code>. Le produit <code>A · B</code> est la matrice de taille ' +
          '<code>m × p</code> dont le coefficient ligne i, colonne j vaut :</p>',
          '<pre><code>(A · B)<sub>ij</sub> = Σ<sub>k = 1…n</sub> a<sub>ik</sub> · b<sub>kj</sub></code></pre>',
          '<p>Autrement dit : on multiplie la <strong>ligne i de A</strong> par la <strong>colonne j de B</strong>, ' +
          'terme à terme, et on additionne.</p>',
          box('intuition', 'La seule condition à retenir', 'compass',
            '    <p>Le produit <code>A · B</code> n’existe que si <strong>le nombre de colonnes de A égale le ' +
            'nombre de lignes de B</strong>. La taille du résultat est alors ' +
            '<code>(lignes de A) × (colonnes de B)</code>. Écris-le avant de calculer : ' +
            '<code>(m × n) · (n × p) = (m × p)</code> — les n se « téléscopent ».</p>'),
          '<p><strong>Exemple.</strong> Calculons le produit de deux matrices 2 × 2 :</p>',
          '<pre><code>[1 2]   [5 6]   [1·5 + 2·7   1·6 + 2·8]   [19 22]\n' +
          '[3 4] · [7 8] = [3·5 + 4·7   3·6 + 4·8] = [43 50]</code></pre>',
          '<table>\n' +
          '    <tr><th>Coefficient</th><th>Calcul</th><th>Résultat</th></tr>\n' +
          '    <tr><td>ligne 1 × colonne 1</td><td>1·5 + 2·7</td><td>19</td></tr>\n' +
          '    <tr><td>ligne 1 × colonne 2</td><td>1·6 + 2·8</td><td>22</td></tr>\n' +
          '    <tr><td>ligne 2 × colonne 1</td><td>3·5 + 4·7</td><td>43</td></tr>\n' +
          '    <tr><td>ligne 2 × colonne 2</td><td>3·6 + 4·8</td><td>50</td></tr>\n' +
          '  </table>'
        ].join('\n')
      },
      {
        title: 'Propriétés du produit',
        html: [
          '<p>Le produit matriciel ressemble à la multiplication des nombres, mais pas complètement. ' +
          'Les propriétés qui restent :</p>',
          '<ul>\n' +
          '    <li><strong>Associativité</strong> : <code>(A · B) · C = A · (B · C)</code> ;</li>\n' +
          '    <li><strong>Élément neutre</strong> : <code>A · I<sub>n</sub> = I<sub>m</sub> · A = A</code> ;</li>\n' +
          '    <li><strong>Distributivité</strong> : <code>A · (B + C) = A·B + A·C</code> et ' +
          '<code>(A + B) · C = A·C + B·C</code> ;</li>\n' +
          '    <li><strong>Linéarité</strong> : <code>k · (A · B) = (k · A) · B = A · (k · B)</code>.</li>\n' +
          '  </ul>',
          box('pitfall', 'Piège majeur — le produit n’est pas commutatif', 'warning',
            '    <p>En général <code>A · B ≠ B · A</code>. Reprenons l’exemple précédent :</p>\n' +
            '    <pre><code>[1 2]   [5 6]   [19 22]           [5 6]   [1 2]   [23 34]\n' +
            '[3 4] · [7 8] = [43 50]     mais  [7 8] · [3 4] = [31 46]</code></pre>\n' +
            '    <p>Les deux produits existent, les deux ont la même taille, et pourtant les résultats ' +
            'diffèrent. Ne « déplace » donc jamais les facteurs d’un produit.</p>'),
          box('pitfall', 'Piège — produit nul sans facteur nul', 'warning',
            '    <p>Contrairement aux nombres, <code>A · B = 0</code> n’entraîne pas <code>A = 0</code> ou ' +
            '<code>B = 0</code>. Exemple : <code>[[1, 1], [1, 1]] · [[1, −1], [−1, 1]] = [[0, 0], [0, 0]]</code>. ' +
            'C’est pour cette raison qu’on ne « simplifie » jamais un produit matriciel en divisant.</p>')
        ].join('\n')
      },
      {
        title: 'La transposée',
        html: [
          '<p><strong>Définition.</strong> La <strong>transposée</strong> de <code>A</code>, notée ' +
          '<code><sup>t</sup>A</code>, est la matrice obtenue en échangeant les lignes et les colonnes : ' +
          'la ligne 1 devient la colonne 1, etc. Une matrice <code>m × n</code> devient donc une ' +
          '<code>n × m</code>.</p>',
          '<pre><code>     [1 2 3]              ⎡ 1 4 ⎤\n' +
          'A =  [4 5 6]     <sup>t</sup>A =  ⎢ 2 5 ⎥      (2 × 3) → (3 × 2)\n' +
          '                          ⎣ 3 6 ⎦</code></pre>',
          '<p>Formellement : <code>(<sup>t</sup>A)<sub>ij</sub> = a<sub>ji</sub></code>. Il suffit d’inverser ' +
          'les deux indices.</p>',
          '<table>\n' +
          '    <tr><th>Propriété</th><th>Formule</th></tr>\n' +
          '    <tr><td>Transposée d’une somme</td><td><code><sup>t</sup>(A + B) = <sup>t</sup>A + <sup>t</sup>B</code></td></tr>\n' +
          '    <tr><td>Transposée d’un produit</td><td><code><sup>t</sup>(A · B) = <sup>t</sup>B · <sup>t</sup>A</code></td></tr>\n' +
          '    <tr><td>Double transposition</td><td><code><sup>t</sup>(<sup>t</sup>A) = A</code></td></tr>\n' +
          '    <tr><td>Transposée d’un scalaire</td><td><code><sup>t</sup>(k · A) = k · <sup>t</sup>A</code></td></tr>\n' +
          '  </table>',
          box('mnemo', 'Mnémotechnique — « la transposée du produit retourne la file »', 'pin',
            '    <p>Pour <code><sup>t</sup>(A · B)</code>, l’ordre <strong>s’inverse</strong> : ' +
            '<code><sup>t</sup>B · <sup>t</sup>A</code>. Retiens « la transposée du produit <em>retourne ' +
            'la file</em> » : le dernier devient le premier. C’est l’erreur la plus fréquente à l’examen.</p>')
        ].join('\n')
      },
      {
        title: 'Trace et matrices symétriques',
        html: [
          '<p><strong>Définition.</strong> La <strong>trace</strong> d’une matrice carrée est la somme de ses ' +
          'coefficients diagonaux : <code>tr(A) = a₁₁ + a₂₂ + … + aₙₙ</code>.</p>',
          '<p>La trace se comporte remarquablement bien :</p>',
          '<pre><code>tr(A + B) = tr(A) + tr(B)\n' +
          'tr(k · A) = k · tr(A)\n' +
          'tr(<sup>t</sup>A) = tr(A)\n' +
          'tr(A · B) = tr(B · A)        (même si A·B ≠ B·A)</code></pre>',
          '<p>La dernière propriété est aussi surprenante qu’utile : le produit n’est pas commutatif, mais sa ' +
          'trace l’est. Elle sert notamment à démontrer que deux matrices ne peuvent pas être toutes deux ' +
          '« égales à I » sous produit.</p>',
          '<p><strong>Matrice symétrique.</strong> Une matrice carrée est symétrique si elle est égale à sa ' +
          'transposée : <code><sup>t</sup>A = A</code>, c’est-à-dire <code>a<sub>ij</sub> = a<sub>ji</sub></code> ' +
          'pour tous i, j. Elle est <strong>antisymétrique</strong> si ' +
          '<code><sup>t</sup>A = −A</code>.</p>',
          box('tech', 'Le code correspondant', 'terminal',
            '    <pre><code>A = [[1, 2], [3, 4]]\n' +
            'B = [[5, 6], [7, 8]]\n' +
            '\n' +
            'def produit(X, Y):\n' +
            '    return [[sum(X[i][k] * Y[k][j] for k in range(len(Y)))\n' +
            '             for j in range(len(Y[0]))] for i in range(len(X))]\n' +
            '\n' +
            'def transposee(X):\n' +
            '    return [[X[i][j] for i in range(len(X))] for j in range(len(X[0]))]\n' +
            '\n' +
            'def trace(X):\n' +
            '    return sum(X[i][i] for i in range(len(X)))\n' +
            '\n' +
            'print(produit(A, B))     # [[19, 22], [43, 50]]\n' +
            'print(trace(produit(A, B)), trace(produit(B, A)))   # 69 69</code></pre>\n' +
            '    <p>La fonction <code>transposee</code> montre bien l’échange : la boucle externe parcourt les ' +
            'colonnes, la boucle interne les lignes.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Le produit A · B existe si…', opts: ['A et B sont carrées', 'colonnes(A) = lignes(B)', 'lignes(A) = lignes(B)'], correct: 1, exp: 'La taille du produit est (lignes de A) × (colonnes de B).' },
      { stem: 'Quelle est la taille du produit d’une 2 × 3 par une 3 × 5 ?', opts: ['3 × 3', '2 × 5', '5 × 2'], correct: 1, exp: 'On garde les lignes de la première et les colonnes de la seconde.' },
      { stem: 'Le produit matriciel est…', opts: ['commutatif', 'associatif mais non commutatif', 'ni l’un ni l’autre'], correct: 1, exp: '(A·B)·C = A·(B·C), mais A·B ≠ B·A en général.' },
      { stem: 'Que vaut <code><sup>t</sup>(A · B)</code> ?', opts: ['<sup>t</sup>A · <sup>t</sup>B', '<sup>t</sup>B · <sup>t</sup>A', 'A · B'], correct: 1, exp: 'L’ordre s’inverse : « la transposée du produit retourne la file ».' },
      { stem: 'Que vaut <code>tr(A · B)</code> comparé à <code>tr(B · A)</code> ?', opts: ['Ils sont égaux', 'Le premier est le double', 'Impossible à comparer'], correct: 0, exp: 'La trace du produit est invariante par échange des facteurs.' },
      { stem: 'Une matrice est symétrique lorsque…', opts: ['elle est carrée', '<sup>t</sup>A = A', 'tous ses coefficients sont positifs'], correct: 1, exp: 'Symétrie autour de la diagonale : a<sub>ij</sub> = a<sub>ji</sub>.' }
    ],

    pitfalls: [
      '<strong>Produit sans vérifier les dimensions</strong> : tenter <code>(2 × 3) · (2 × 3)</code>.',
      '<strong>Ordre du résultat</strong> : oublier que la taille du produit est lignes(A) × colonnes(B).',
      '<strong>Commutativité supposée</strong> : intervertir A et B dans un calcul de coûts.',
      '<strong>Transposée d’un produit</strong> : écrire <code><sup>t</sup>A · <sup>t</sup>B</code> au lieu de <code><sup>t</sup>B · <sup>t</sup>A</code>.',
      '<strong>Produit nul mal interprété</strong> : conclure que A ou B est nulle parce que A·B = 0.'
    ],

    methodTitle: 'Calculer un produit matriciel sans se tromper',
    method: [
      '<strong>Écrire les tailles</strong> côte à côte : <code>(m × n) · (n × p)</code>. Si les n ne coïncident pas, le produit n’existe pas.',
      '<strong>Annoncer la taille du résultat</strong> : <code>m × p</code>, et tracer une grille vide de cette taille.',
      '<strong>Remplir case par case</strong> : ligne i de A contre colonne j de B, produits terme à terme puis somme.',
      '<strong>Vérifier un coefficient</strong> à la main, sur un cas indépendant du calcul automatique.',
      '<strong>Contrôler avec I<sub>n</sub></strong> : le produit par l’identité doit redonner la matrice de départ.'
    ],

    summary: [
      '<code>(A · B)<sub>ij</sub></code> est le produit scalaire de la ligne i de A avec la colonne j de B.',
      'Condition d’existence : colonnes(A) = lignes(B) ; taille du résultat : lignes(A) × colonnes(B).',
      'Produit associatif, distributif, mais <strong>non commutatif</strong> ; A·B = 0 n’implique pas A = 0 ni B = 0.',
      'Transposée : on échange lignes et colonnes ; <code><sup>t</sup>(A·B) = <sup>t</sup>B · <sup>t</sup>A</code>.',
      'Trace : somme des coefficients diagonaux ; <code>tr(A·B) = tr(B·A)</code>.'
    ],

    checklist: [
      'Je vérifie la condition de dimension avant tout produit.',
      'Je calcule un produit 2 × 2 de tête, sans outil.',
      'Je ne me trompe plus sur l’ordre dans la transposée d’un produit.',
      'Je calcule une trace et je teste si une matrice est symétrique.'
    ],

    notions: ['produit matriciel', 'condition colonnes = lignes', 'associativité', 'non-commutativité', 'transposée', 'symétrique', 'trace', 'matrice identité'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends le calcul du produit pas à pas, section 1.' },
      { cls: 'mid', text: '50–69 % — Refais les exercices de niveau 2 de l’atelier du chapitre 2.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible la transposée du produit et la non-commutativité.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, l’inverse et la méthode de Gauss.' }
    ],

    flashcards: [
      { q: 'Condition d’existence du produit A · B ?', a: 'Le nombre de <strong>colonnes de A</strong> doit égaler le nombre de <strong>lignes de B</strong>.' },
      { q: 'Le produit matriciel est-il commutatif ?', a: 'Non. A·B ≠ B·A en général, même pour des matrices carrées.' },
      { q: 'Formule de <code><sup>t</sup>(A · B)</code> ?', a: '<code><sup>t</sup>B · <sup>t</sup>A</code> : l’ordre des facteurs s’inverse.' },
      { q: 'Que vaut <code>tr(A · B)</code> ?', a: 'Elle est égale à <code>tr(B · A)</code>, même si A·B ≠ B·A.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Inverse d’une matrice et méthode de Gauss',
    toc: 'Matrice inverse, condition det ≠ 0, formule 2 × 2, opérations élémentaires et Gauss-Jordan.',
    time: '≈ 3 h de travail',

    situation:
      'Un problème de production se traduit par un système de trois équations à trois inconnues. Le résoudre ' +
      '« à la main » par substitution devient vite illisible dès que les coefficients sont décimaux. La méthode ' +
      'du pivot de Gauss automatise la démarche, et la notion d’inverse permet de l’écrire en une seule ' +
      'opération : si <code>A</code> est inversible, la solution est <code>X = A⁻¹·B</code>.',

    objectives: [
      'définir l’inverse d’une matrice et sa condition d’existence ;',
      'calculer l’inverse d’une matrice 2 × 2 avec la formule de l’inverse ;',
      'appliquer les trois opérations élémentaires sur les lignes ;',
      'inverser une matrice et résoudre un système par la méthode de Gauss.'
    ],

    sections: [
      {
        title: 'Matrice inverse : définition',
        html: [
          '<p><strong>Définition.</strong> Soit <code>A</code> une matrice carrée d’ordre n. On dit que ' +
          '<code>A</code> est <strong>inversible</strong> s’il existe une matrice carrée <code>B</code> ' +
          'd’ordre n telle que :</p>',
          '<pre><code>A · B = B · A = I<sub>n</sub></code></pre>',
          '<p>Cette matrice <code>B</code>, quand elle existe, est unique : on la note <code>A⁻¹</code>. ' +
          'Attention à deux choses : la définition exige <em>les deux</em> produits égaux à I<sub>n</sub>, et ' +
          'l’inverse n’existe que pour une matrice <strong>carrée</strong>.</p>',
          '<p><strong>Théorème.</strong> Une matrice carrée A est inversible si et seulement si ' +
          '<code>det(A) ≠ 0</code>. Une matrice dont le déterminant est nul est dite ' +
          '<strong>singulière</strong> ; elle n’a pas d’inverse.</p>',
          box('intuition', 'Intuition — diviser par une matrice', 'compass',
            '    <p>Chez les nombres, résoudre <code>a·x = b</code> se fait en divisant par a, possible ' +
            'seulement si <code>a ≠ 0</code>. Chez les matrices, il n’y a pas de division : on multiplie par ' +
            'l’inverse. Et l’inverse n’existe que si <code>det(A) ≠ 0</code> — exactement le rôle du ' +
            '« a ≠ 0 » des nombres.</p>'),
          box('mnemo', 'Mnémotechnique — « det zéro, zéro inverse »', 'pin',
            '    <p>La règle se retient en cinq mots : <strong>« det zéro, zéro inverse »</strong>. ' +
            'Dès que tu calcules un déterminant nul, arrête-toi : ni inverse, ni solution unique.</p>')
        ].join('\n')
      },
      {
        title: 'Le cas 2 × 2 et le cas 3 × 3',
        html: [
          '<p>Pour une matrice 2 × 2, l’inverse se calcule de tête :</p>',
          '<pre><code>     [ a  b ]\n' +
          'A =  [ c  d ]        det(A) = a·d − b·c\n' +
          '\n' +
          '               1      [  d  −b ]\n' +
          'A⁻¹ =  ───────────── · [ −c   a ]\n' +
          '           det(A)</code></pre>',
          '<p>La recette est simple : <strong>on échange les coefficients de la diagonale</strong> ' +
          '(<code>a</code> et <code>d</code>), <strong>on change le signe des autres</strong> ' +
          '(<code>b</code> et <code>c</code>), et on divise le tout par le déterminant.</p>',
          '<p><strong>Exemple.</strong> <code>A = [[1, 2], [3, 4]]</code> : ' +
          '<code>det(A) = 1·4 − 2·3 = −2 ≠ 0</code>, donc A est inversible et</p>',
          '<pre><code>A⁻¹ = 1/(−2) · [ 4  −2 ; −3  1]  =  [−2   1  ; 1.5  −0.5]\n' +
          '\n' +
          'Vérification :  [1 2]   [−2   1  ]   [1 0]\n' +
          '                [3 4] · [1.5 −0.5] = [0 1]</code></pre>',
          '<p>Au-delà de 2 × 2, la formule devient impraticable : on utilise la méthode de Gauss, qui ' +
          'fonctionne quelle que soit la taille.</p>',
          box('pitfall', 'Piège — oublier de diviser par le déterminant', 'warning',
            '    <p>La matrice <code>[[d, −b], [−c, a]]</code> seule n’est pas l’inverse : c’est sa ' +
            '« comatrice transposée ». Sans la division par <code>det(A)</code>, la vérification ' +
            '<code>A · B = I</code> échoue. C’est l’erreur la plus fréquente en contrôle.</p>')
        ].join('\n')
      },
      {
        title: 'Les opérations élémentaires sur les lignes',
        html: [
          '<p>La méthode de Gauss repose sur une idée : transformer une matrice compliquée en une matrice ' +
          'simple sans changer l’ensemble des solutions. Trois opérations sont autorisées, et elles seules :</p>',
          '<table>\n' +
          '    <tr><th>#</th><th>Opération</th><th>Notation</th></tr>\n' +
          '    <tr><td>1</td><td>Échanger deux lignes</td><td><code>L<sub>i</sub> ↔ L<sub>j</sub></code></td></tr>\n' +
          '    <tr><td>2</td><td>Multiplier une ligne par un réel k ≠ 0</td><td><code>L<sub>i</sub> ← k · L<sub>i</sub></code></td></tr>\n' +
          '    <tr><td>3</td><td>Ajouter à une ligne un multiple d’une autre</td><td><code>L<sub>i</sub> ← L<sub>i</sub> + k · L<sub>j</sub></code></td></tr>\n' +
          '  </table>',
          '<p>Une opération interdite : <strong>remplacer une ligne par une autre</strong>. Cela détruirait ' +
          'l’information et, avec elle, les solutions.</p>',
          '<p><strong>Objectif.</strong> Faire apparaître des zéros sous la diagonale : la matrice est alors ' +
          '<strong>échelonnée</strong>, et un système échelonné se résout par une simple <em>remontée</em> ' +
          '(on part de la dernière équation).</p>',
          box('tech', 'Le pivot', 'wrench',
            '    <p>À chaque étape, on choisit un <strong>pivot</strong> : un coefficient non nul en tête de ' +
            'colonne. Si le pivot naturel est nul, l’opération 1 (échange de lignes) le remplace. On annule ' +
            'ensuite tous les coefficients situés sous le pivot.</p>')
        ].join('\n')
      },
      {
        title: 'Gauss-Jordan : inverser et résoudre',
        html: [
          '<p><strong>Inverser une matrice.</strong> On accole la matrice identité à droite, puis on applique ' +
          'les opérations élémentaires jusqu’à obtenir l’identité à gauche. Ce qui reste à droite ' +
          '<em>est</em> l’inverse :</p>',
          '<pre><code>[ A | I ]   ── opérations élémentaires ──►   [ I | A⁻¹ ]</code></pre>',
          '<p><strong>Résoudre un système.</strong> On accole le second membre, et on échelonne :</p>',
          '<pre><code>[ A | B ]   ── échelonnement ──►   forme échelonnée   ── remontée ──►   X</code></pre>',
          '<p><strong>Exemple complet.</strong> Résolvons :</p>',
          '<pre><code>  x +  y +  z = 6\n' +
          ' 2x −  y +  z = 3\n' +
          '  x + 2y −  z = 2</code></pre>',
          '<p>Matrice augmentée, puis élimination :</p>',
          '<pre><code>[ 1  1  1 | 6 ]                 [ 1  1  1 |  6 ]\n' +
          '[ 2 −1  1 | 3 ]   L2←L2−2L1     [ 0 −3 −1 | −9 ]   L2↔L3    [ 0  1 −2 | −4 ]\n' +
          '[ 1  2 −1 | 2 ]   L3←L3−L1      [ 0  1 −2 | −4 ]   L3←L3+3L2 [ 0  0 −7 | −21 ]</code></pre>',
          '<p>La remontée donne <code>z = 3</code>, puis <code>y − 2z = −4 ⇒ y = 2</code>, puis ' +
          '<code>x + 2 + 3 = 6 ⇒ x = 1</code>. Solution : <code>(x, y, z) = (1, 2, 3)</code>.</p>',
          box('tech', 'Vérifier sa solution, toujours', 'check-circle',
            '    <p>Remplacer dans la première équation d’origine est un contrôle de 10 secondes : ' +
            '<code>1 + 2 + 3 = 6</code>, le compte est bon. Un système à trois inconnues se vérifie en ' +
            'trois additions — ' +
            'ne jamais rendre une copie sans ce contrôle.</p>'),
          box('intuition', 'Les trois cas possibles', 'compass',
            '    <p>Après échelonnement, trois situations et trois seulement :</p>\n' +
            '    <ul>\n' +
            '      <li>autant de pivots que d’inconnues → <strong>solution unique</strong> ;</li>\n' +
            '      <li>une ligne <code>0 = 0</code> → <strong>une infinité de solutions</strong> ;</li>\n' +
            '      <li>une ligne <code>0 = k</code> avec k ≠ 0 → <strong>aucune solution</strong>.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Une matrice carrée est inversible si et seulement si…', opts: ['elle n’a pas de zéros', 'det(A) ≠ 0', 'elle est symétrique'], correct: 1, exp: 'det(A) ≠ 0 ⇔ A inversible ⇔ rang(A) = n.' },
      { stem: 'Que vaut <code>A⁻¹</code> pour A = [[a, b], [c, d]] ?', opts: ['[[d, −b], [−c, a]]', '1/det(A) · [[d, −b], [−c, a]]', '1/det(A) · [[a, −b], [−c, d]]'], correct: 1, exp: 'Il ne faut pas oublier la division par le déterminant.' },
      { stem: 'Parmi ces opérations, laquelle est interdite ?', opts: ['L1 ↔ L2', 'L2 ← 3·L2', 'L2 ← L1'], correct: 2, exp: 'Remplacer une ligne par une autre fait perdre de l’information.' },
      { stem: 'Dans [ A | I ], à quoi aboutit Gauss-Jordan ?', opts: ['[ I | A⁻¹ ]', '[ A⁻¹ | I ]', '[ I | A ]'], correct: 0, exp: 'Quand A devient I, ce qui reste à droite est l’inverse.' },
      { stem: 'Après échelonnement d’un système 3 × 3 on lit la ligne <code>[0 0 0 | 5]</code>. Conclusion ?', opts: ['Trois solutions', 'Aucune solution', 'Une infinité de solutions'], correct: 1, exp: '0 = 5 est impossible : le système est incompatible.' },
      { stem: 'Que vaut det(A) si A·B = I ?', opts: ['0', 'Il est non nul', '1 exactement'], correct: 1, exp: 'A est inversible, donc son déterminant ne peut pas être nul.' }
    ],

    pitfalls: [
      '<strong>Utiliser une opération interdite</strong> : remplacer une ligne par une autre au lieu de l’ajouter.',
      '<strong>Division par un déterminant nul</strong> : écrire A⁻¹ sans vérifier det(A) ≠ 0.',
      '<strong>Oublier le signe</strong> dans la formule 2 × 2 : les coefficients hors diagonale changent de signe.',
      '<strong>Erreurs d’arithmétique en cascade</strong> : une faute à la deuxième ligne contamine toute la remontée.',
      '<strong>Répondre avant de vérifier</strong> : remplacer la solution dans l’équation d’origine.'
    ],

    methodTitle: 'Résoudre un système par Gauss',
    method: [
      '<strong>Écrire la matrice augmentée</strong> <code>[A | B]</code>, une colonne par inconnue plus le second membre.',
      '<strong>Choisir un pivot</strong> non nul en haut à gauche ; si besoin, échanger deux lignes.',
      '<strong>Éliminer</strong> tous les coefficients sous le pivot, colonne par colonne.',
      '<strong>Recommencer</strong> sur la sous-matrice suivante jusqu’à la forme échelonnée.',
      '<strong>Remonter</strong> de la dernière équation vers la première, puis <strong>vérifier</strong> dans le système initial.'
    ],

    summary: [
      '<code>A·A⁻¹ = A⁻¹·A = I<sub>n</sub></code> ; l’inverse est unique et n’existe que si <code>det(A) ≠ 0</code>.',
      '2 × 2 : <code>A⁻¹ = 1/det(A) · [[d, −b], [−c, a]]</code> avec <code>det = ad − bc</code>.',
      'Trois opérations élémentaires autorisées sur les lignes ; elles ne changent pas les solutions.',
      'Gauss : échelonner puis remonter ; Gauss-Jordan : <code>[A | I] → [I | A⁻¹]</code>.',
      'Un système a une solution unique, aucune, ou une infinité — jamais deux.'
    ],

    checklist: [
      'Je teste l’inversibilité avant tout calcul d’inverse.',
      'J’inverse une matrice 2 × 2 sans hésiter, division comprise.',
      'Je cite les trois opérations élémentaires autorisées.',
      'Je résous un système 3 × 3 par Gauss et je vérifie la solution.'
    ],

    notions: ['matrice inverse', 'matrice singulière', 'det(A) ≠ 0', 'formule 2 × 2', 'opérations élémentaires', 'pivot', 'matrice échelonnée', 'remontée'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Reprends l’exemple complet de la section 4, ligne à ligne.' },
      { cls: 'mid', text: '50–69 % — Refais deux systèmes de l’atelier du chapitre 3.' },
      { cls: 'good', text: '70–89 % — Bon niveau : cible les signes de la formule 2 × 2.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, les espaces vectoriels.' }
    ],

    flashcards: [
      { q: 'Condition d’inversibilité d’une matrice carrée ?', a: '<code>det(A) ≠ 0</code>. Si det(A) = 0, A est singulière : pas d’inverse.' },
      { q: 'Formule de l’inverse d’une matrice 2 × 2 ?', a: '<code>A⁻¹ = 1/(ad − bc) · [[d, −b], [−c, a]]</code>.' },
      { q: 'Cite les trois opérations élémentaires sur les lignes.', a: 'Échanger deux lignes ; multiplier une ligne par k ≠ 0 ; ajouter à une ligne un multiple d’une autre.' },
      { q: 'Que produit Gauss-Jordan sur <code>[A | I]</code> ?', a: 'On obtient <code>[I | A⁻¹]</code> : l’inverse apparaît à droite.' }
    ]
  }
];
