/**
 * Pages transverses du cours d'algèbre linéaire B1.
 *
 * Elles ne dépendent que du kit de gabarit : accueil, sommaire, atelier,
 * cartes, mémo, examens blancs, exercices. Les chapitres, eux, sont composés
 * par `kit.chapter` à partir des données de `chapitres-1-3.js` / `4-6.js`.
 */
'use strict';

const { ic, box, qcm, cards, bands, crumb } = require('../../../scripts/course-kit');

/** Navigation de bas de page : retour + étape suivante. */
function chnav(back, forward) {
  const links = ['  <div class="chnav">'];
  if (back) links.push('    <a class="btn" href="' + back.href + '">' + ic('arrow-left') + ' ' + back.label + '</a>');
  if (forward) links.push('    <a class="btn btn--primary" href="' + forward.href + '">' + forward.label + ' ' + ic('arrow-right') + '</a>');
  links.push('  </div>');
  return links.join('\n');
}

function disclaimer(course, extra) {
  return '  <p class="disclaimer">Objectif de maîtrise 19/20 — ta note réelle dépend aussi de ton travail.\n  ' +
    (extra || '') + 'Sources : ' + course.sources + '.</p>';
}

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const toc = chapterList.map(chapitre =>
    '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
    '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span></span></a>'
  ).join('\n');

  const body = [
    crumb(course, [{ href: '/index.html', label: 'Portail des cours' }, { label: course.brand }]),
    '  <div class="chapmeta">',
    '    <span class="tag">Licence 1 · B1</span>',
    '    <span class="tag tag--time">Mathématiques pour l’informatique</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que tu sauras faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>lire et écrire une matrice : dimensions, coefficients, matrices particulières ;</li>',
      '      <li>calculer un produit de matrices, une transposée, une trace ;</li>',
      '      <li>inverser une matrice et résoudre un système par la méthode de Gauss ;</li>',
      '      <li>reconnaître un espace vectoriel, un sous-espace, une famille libre ou génératrice ;</li>',
      '      <li>calculer un rang, un déterminant, et résoudre un système par Cramer.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s’articule', 'compass', [
      '    <p>Chaque chapitre part d’un problème concret, pose les définitions, déroule un exemple ' +
      'calculé ligne à ligne, puis se termine par <strong>trois exercices de code en Python</strong> : ' +
      'tu écris vraiment un programme qui calcule (somme de vecteurs, produit de matrices, déterminant, ' +
      'résolution de système), il est réellement exécuté puis corrigé par des tests que tu ne vois pas.</p>',
      '    <p>Le langage Python sert ici de <em>calculatrice vérifiable</em> : il n’est jamais le sujet du ' +
      'cours, il est le moyen de contrôler que la méthode est comprise. Les formules restent celles du ' +
      'support, en notation mathématique.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo des formules</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de calcul</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Algèbre linéaire — matrices, espaces et déterminants (B1) | Cours Interactif',
      description: course.description,
      active: null,
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const toc = chapterList.map(chapitre => {
    const lock = chapitre.free
      ? '<br><span class="locknote">Accès libre</span>'
      : '<br><span class="locknote">' + ic('lock') + ' B1 et plus</span>';
    return '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
      '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span>' +
      lock + '</span></a>';
  }).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire du cours</h1>',
    '  <p class="lead">' + chapterList.length + ' chapitres, du vocabulaire matriciel jusqu’aux déterminants. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou supérieur ' +
    '(et un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois exercices en Python</strong> à écrire et à exécuter ' +
    'dans la page : ton programme est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +
    'L’<a href="atelier.html">atelier de calcul</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo des formules</span><br><span class="toc__d">Définitions, formules et méthodes sur une page.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Calculs gradués et projet final combinant tous les modules.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de calcul</span><br><span class="toc__d">Écrire et exécuter du Python directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l’évaluation, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours d’algèbre linéaire B1 : ' + chapterList.length +
        ' chapitres, exercices Python exécutables, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier de calcul</h1>',
    '  <p class="lead">Un éditeur dans la page, un vrai interpréteur Python derrière. Écris un calcul, ' +
    'donne-lui ses données, exécute-le et lis ce qu’il affiche. C’est ici qu’une formule devient un réflexe.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter</strong> fait tourner votre code Python tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',
      '      <li><strong>Entrée du programme</strong> contient ce que <code>input()</code> lira, une valeur par ligne.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l’éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="python"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="1&#10;1&#10;1">',
      '  <script type="text/plain" data-lab-starter># Zone libre : calculez, cassez, recommencez.',
      '# Rien de ce que vous écrirez ici n’est noté.',
      '#',
      '# Exemple proposé : produit d’une matrice 3×3 par un vecteur.',
      '# Le script lit un vecteur de 3 entiers (une valeur par ligne)',
      '# puis affiche le produit avec la matrice [[2,1,0],[0,3,1],[1,0,4]].',
      '',
      'MATRICE = [[2, 1, 0], [0, 3, 1], [1, 0, 4]]',
      '',
      'def produit_matrice_vecteur(m, v):',
      '    return [sum(m[i][j] * v[j] for j in range(len(v))) for i in range(len(m))]',
      '',
      'vecteur = [int(input()) for _ in range(3)]',
      'resultat = produit_matrice_vecteur(MATRICE, vecteur)',
      'print(" ".join(str(x) for x in resultat))',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — produit matrice × vecteur</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Python</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prends une notion du cours ' +
      '(produit, transposée, déterminant, rang), programme-la et teste-la sur des cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé calcule le produit d’une matrice fixe par un vecteur lu sur l’entrée standard. ' +
      'Modifie la matrice, change la dimension, ou remplace tout le script par le calcul que tu veux vérifier.</p>',
      '      <p>Une erreur n’est pas un échec : c’est le message que Python te laisse pour comprendre ce qu’il attendait.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Entrée du programme</b><pre>1',
      '1',
      '1</pre></div>',
      '      <div class="lab__sample-part"><b>Sortie attendue</b><pre>3',
      '4',
      '5</pre></div>',
      '    </div>',
      '    <p class="lab__note">Trois lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>Du calcul à la machine</h2>',
    '  <p>Une matrice n’est pas un objet abstrait réservé aux mathématiciens : en informatique, c’est un ' +
    'tableau à deux dimensions, et un vecteur un tableau à une dimension. Le produit matriciel se code en ' +
    'trois lignes — deux boucles et une somme — et c’est ce que les bibliothèques scientifiques ' +
    '(NumPy, MATLAB, BLAS) font en optimisant exactement ce calcul.</p>',
    box('pitfall', 'Les trois erreurs que l’atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Dimensions incompatibles</strong> : un produit <em>A·B</em> n’existe que si le nombre de colonnes de <em>A</em> égale le nombre de lignes de <em>B</em>. L’erreur d’indice vient de là.</li>',
      '      <li><strong>Indices à partir de 0</strong> : une matrice 3×3 se parcourt de 0 à 2, jamais de 1 à 3.</li>',
      '      <li><strong>Division entière</strong> : <code>7 / 2</code> vaut 3.5 en Python 3, mais écrire <code>7 // 2</code> donne 3 — un piège classique dans un calcul de moyenne.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l’atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d’exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n’est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d’exécutions est limité par jour, pour tout le monde. L’atelier n’exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Python corrigés ' +
    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le cours est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Vecteurs et matrices' }),
    disclaimer(course, 'L’exécution repose sur un service distant : en cas d’indisponibilité, l’atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de calcul — écrire du Python | ' + course.brand,
      description: 'Atelier de calcul du cours d’algèbre linéaire B1 : éditeur dans le navigateur, exécution ' +
        'réelle du programme Python, entrée standard, console de sortie et tuteur qui explique les erreurs.',
      active: 'atelier',
      body
    }
  };
}

/* ======================== Cartes ======================== */

function cartes(course, chapterList) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision</h1>',
    '  <p class="lead">Clique une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Reviens à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo des formules' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours d’algèbre linéaire B1 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo des formules</h1>',
    '  <p class="lead">Définitions, formules et méthodes du cours sur une page. À garder ouvert pendant les ' +
    'exercices et l’atelier.</p>',

    '  <h2>Matrice et vocabulaire</h2>',
    '  <pre><code>A = (a<sub>ij</sub>)  avec i = ligne, j = colonne\n' +
    'A est de taille m × n : m lignes, n colonnes\n' +
    'matrice carrée : m = n        matrice nulle : tous les a<sub>ij</sub> = 0\n' +
    'matrice identité I<sub>n</sub> : 1 sur la diagonale, 0 ailleurs\n' +
    'diagonale : les a<sub>ii</sub>     trace : tr(A) = a<sub>11</sub> + a<sub>22</sub> + … + a<sub>nn</sub></code></pre>',

    '  <h2>Opérations</h2>',
    '  <table>\n' +
    '    <tr><th>Opération</th><th>Condition</th><th>Formule</th></tr>\n' +
    '    <tr><td>Addition A + B</td><td>mêmes dimensions</td><td>(a<sub>ij</sub> + b<sub>ij</sub>)</td></tr>\n' +
    '    <tr><td>Multiplication par k</td><td>aucune</td><td>(k · a<sub>ij</sub>)</td></tr>\n' +
    '    <tr><td>Produit A × B</td><td>colonnes(A) = lignes(B)</td><td>c<sub>ij</sub> = Σ<sub>k</sub> a<sub>ik</sub> · b<sub>kj</sub></td></tr>\n' +
    '    <tr><td>Transposée <sup>t</sup>A</td><td>aucune</td><td>(<sup>t</sup>A)<sub>ij</sub> = a<sub>ji</sub></td></tr>\n' +
    '  </table>\n' +
    '  <p><strong>Attention :</strong> le produit matriciel n’est pas commutatif — en général A·B ≠ B·A. ' +
    'Mais il est associatif : (A·B)·C = A·(B·C).</p>',

    '  <h2>Propriétés de la transposée et de la trace</h2>',
    '  <pre><code><sup>t</sup>(A + B) = <sup>t</sup>A + <sup>t</sup>B\n' +
    '<sup>t</sup>(A · B) = <sup>t</sup>B · <sup>t</sup>A        (l’ordre s’inverse)\n' +
    '<sup>t</sup>(<sup>t</sup>A) = A\n' +
    'tr(A + B) = tr(A) + tr(B)     tr(A · B) = tr(B · A)     tr(<sup>t</sup>A) = tr(A)</code></pre>\n' +
    '  <p>Une matrice est <strong>symétrique</strong> si <sup>t</sup>A = A, <strong>antisymétrique</strong> ' +
    'si <sup>t</sup>A = −A.</p>',

    '  <h2>Inverse d’une matrice</h2>',
    '  <pre><code>A inversible  ⇔  il existe B telle que A · B = B · A = I\n' +
    'A est inversible  ⇔  det(A) ≠ 0\n' +
    '\n' +
    '2 × 2 :   A = [a b ; c d]      det(A) = ad − bc\n' +
    '          A⁻¹ = 1/det(A) · [ d  −b ; −c  a ]\n' +
    '\n' +
    '(A · B)⁻¹ = B⁻¹ · A⁻¹        (<sup>t</sup>A)⁻¹ = <sup>t</sup>(A⁻¹)</code></pre>',

    '  <h2>Méthode de Gauss (pivot)</h2>',
    '  <p>Pour résoudre A·X = B ou inverser A, on écrit la <strong>matrice augmentée</strong> et on applique ' +
    'trois opérations élémentaires, sans changer l’ensemble des solutions :</p>',
    '  <pre><code>1. échanger deux lignes                        L_i ↔ L_j\n' +
    '2. multiplier une ligne par k ≠ 0              L_i ← k · L_i\n' +
    '3. ajouter à une ligne un multiple d’une autre L_i ← L_i + k · L_j\n' +
    '\n' +
    'Système   : [ A | B ]  →  forme échelonnée  →  remontée\n' +
    'Inverse   : [ A | I ]  →  [ I | A⁻¹ ]</code></pre>',

    '  <h2>Espace vectoriel et sous-espace</h2>',
    '  <pre><code>(E, +, ·) est un espace vectoriel sur ℝ si :\n' +
    '  (E, +) est un groupe commutatif\n' +
    '  1 · u = u\n' +
    '  k · (u + v) = k·u + k·v\n' +
    '  (k + k′) · u = k·u + k′·u\n' +
    '  k · (k′ · u) = (k · k′) · u\n' +
    '\n' +
    'F ⊂ E est un sous-espace vectoriel si :\n' +
    '  F ≠ ∅ ;  ∀u,v ∈ F, u + v ∈ F ;  ∀k ∈ ℝ, ∀u ∈ F, k·u ∈ F\n' +
    '  (equivalent court : ∀u,v ∈ F, ∀k ∈ ℝ, k·u + v ∈ F)</code></pre>',

    '  <h2>Familles libres, génératrices, bases, rang</h2>',
    '  <pre><code>Famille génératrice : tout vecteur de E s’écrit comme combinaison linéaire de la famille\n' +
    'Famille libre       : a₁v₁ + … + aₚvₚ = 0  ⇒  a₁ = … = aₚ = 0\n' +
    'Base                : famille libre ET génératrice (dimension = nombre de vecteurs)\n' +
    'Rang                : nombre maximal de vecteurs linéairement indépendants\n' +
    '\n' +
    'rang(A) = nombre de pivots après échelonnement = nombre de lignes non nulles\n' +
    'A carrée est inversible  ⇔  rang(A) = n  ⇔  det(A) ≠ 0</code></pre>',

    '  <h2>Déterminant</h2>',
    '  <pre><code>2 × 2 : det [a b ; c d] = ad − bc\n' +
    '3 × 3 : det A = a(ei − fh) − b(di − fg) + c(dh − eg)     (développement 1re ligne)\n' +
    '\n' +
    'det(A · B) = det(A) · det(B)      det(<sup>t</sup>A) = det(A)\n' +
    'det(k · A) = kⁿ · det(A)          (A de taille n × n)\n' +
    'Échanger deux lignes change le signe ; ajouter k·L_j à L_i ne change rien.</code></pre>',

    '  <h2>Applications linéaires et valeurs propres</h2>',
    '  <pre><code>f : E → F est linéaire  ⇔  f(u + v) = f(u) + f(v)  et  f(k·u) = k·f(u)\n' +
    '  ⇔  f(k·u + v) = k·f(u) + f(v)\n' +
    'noyau  : ker f = { u ∈ E | f(u) = 0 }        image : Im f = { f(u) | u ∈ E }\n' +
    '\n' +
    'λ est valeur propre de A  ⇔  A·X = λ·X avec X ≠ 0\n' +
    '  ⇔  det(A − λ·I) = 0        (polynôme caractéristique)\n' +
    'Le vecteur X ≠ 0 associé est un vecteur propre.</code></pre>',

    '  <h2>Erreurs fréquentes à éviter</h2>',
    '  <ul>\n' +
    '    <li>Ajouter deux matrices de dimensions différentes.</li>\n' +
    '    <li>Calculer A·B sans vérifier que colonnes(A) = lignes(B).</li>\n' +
    '    <li>Croire que A·B = B·A : c’est faux dès la dimension 2.</li>\n' +
    '    <li>Oublier de diviser par det(A) dans la formule de l’inverse 2×2.</li>\n' +
    '    <li>Conclure qu’une famille est libre parce qu’aucun vecteur n’est un multiple d’un autre.</li>\n' +
    '    <li>Confondre « det(A) = 0 » (non inversible) et « A = 0 ».</li>\n' +
    '  </ul>',

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo des formules — ' + course.brand,
      description: 'Mémo d’algèbre linéaire B1 : matrices, opérations, inverse, Gauss, espaces vectoriels, ' +
        'rang, déterminants et valeurs propres sur une page.',
      active: 'formules',
      body
    }
  };
}

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1',
      intro: 'Sujet type — calcul et méthode, d’après les évaluations B1.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/4 — Calcul matriciel',
          text: 'Soit A = [2 1 ; 3 4] et B = [1 0 ; 2 1]. Calcule A·B, B·A, tr(A) et det(A).',
          sol: 'A·B = [4 1 ; 11 4]. B·A = [2 1 ; 7 6]. tr(A) = 6. det(A) = 2·4 − 1·3 = 5.' +
            ' On vérifie au passage que A·B ≠ B·A : le produit n’est pas commutatif.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Inverse',
          text: 'A = [1 2 ; 3 4]. Montre que A est inversible et calcule A⁻¹.',
          sol: 'det(A) = 1·4 − 2·3 = −2 ≠ 0, donc A est inversible.\n' +
            'A⁻¹ = 1/(−2) · [4 −2 ; −3 1] = [−2 1 ; 1.5 −0.5].' +
            ' Vérification : A · A⁻¹ = I.'
        },
        {
          num: 'Exercice 3',
          badge: '/6 — Système de Gauss',
          text: 'Résous par la méthode de Gauss :  x + y + z = 6 ;  2x − y + z = 3 ;  x + 2y − z = 2.',
          sol: 'Matrice augmentée [1 1 1 | 6 ; 2 −1 1 | 3 ; 1 2 −1 | 2].\n' +
            'L2 ← L2 − 2L1 : [0 −3 −1 | −9]. L3 ← L3 − L1 : [0 1 −2 | −4].\n' +
            'L2 ↔ L3 : [0 1 −2 | −4] puis [0 −3 −1 | −9].  L3 ← L3 + 3L2 : [0 0 −7 | −21].\n' +
            'Donc z = 3, y − 2z = −4 ⇒ y = 2, puis x + 2 + 3 = 6 ⇒ x = 1.\n' +
            'Solution : (x, y, z) = (1, 2, 3).'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Déterminant',
          text: 'Calcule le déterminant de C = [1 2 3 ; 0 1 4 ; 5 6 0] et dis si C est inversible.',
          sol: 'Développement selon la 1re ligne : 1·(1·0 − 4·6) − 2·(0·0 − 4·5) + 3·(0·6 − 1·5)\n' +
            '= 1·(−24) − 2·(−20) + 3·(−5) = −24 + 40 − 15 = 1.\n' +
            'det(C) = 1 ≠ 0, donc C est inversible et rang(C) = 3.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté espaces vectoriels et applications linéaires.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Famille libre',
          text: 'Dans ℝ³, la famille {u = (1, 2, 3), v = (0, 1, 4), w = (1, 3, 7)} est-elle libre ?',
          sol: 'On cherche a, b, c tels que a·u + b·v + c·w = 0 :\n' +
            '  a + c = 0 ;  2a + b + 3c = 0 ;  3a + 4b + 7c = 0.\n' +
            'La 1re équation donne c = −a. En reportant : b + 3c + 2a = b + c + 2a − 2c = … ' +
            'la 3e devient 3a + 4b − 7a = 0 ⇒ b = a.\n' +
            'La 2e : 2a + a − 3a = 0, toujours vraie. Il existe donc des solutions non nulles ' +
            '(par exemple a = b = 1, c = −1) : <strong>w = u + v</strong>, la famille est liée.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Rang',
          text: 'M = [1 2 3 ; 2 4 6 ; 1 0 1]. Détermine le rang de M.',
          sol: 'L2 = 2·L1, donc L2 disparaît. Il reste [1 2 3 ; 1 0 1].\n' +
            'L2 ← L2 − L1 : [0 −2 −2], non nulle. Deux pivots ⇒ <strong>rang(M) = 2</strong>.\n' +
            'Conclusion : les lignes de M engendrent un plan dans ℝ³.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Application linéaire',
          text: 'Soit f(x, y, z) = (x + y, y + z). Montre que f est linéaire et donne sa matrice.',
          sol: 'f(u + v) = f(u) + f(v) et f(k·u) = k·f(u) se vérifient composante par composante : ' +
            'chaque coordonnée de sortie est une somme de coordonnées d’entrée, sans terme constant.\n' +
            'Matrice associée dans les bases canoniques : [1 1 0 ; 0 1 1], de taille 2 × 3.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Valeurs propres',
          text: 'Trouve les valeurs propres de A = [4 1 ; 2 3].',
          sol: 'det(A − λI) = (4 − λ)(3 − λ) − 2 = λ² − 7λ + 10 = 0.\n' +
            'Discriminant : 49 − 40 = 9, donc λ = (7 ± 3)/2 : <strong>λ₁ = 5 et λ₂ = 2</strong>.'
        }
      ]
    }
  ];

  const itemHtml = (item) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="item__num">' + item.num + '</span><span class="badge">' + item.badge + '</span></div>',
    '    <p>' + item.text + '</p>',
    '    <details><summary>Corrigé</summary><div class="sol">' + item.sol + '</div></details>',
    '  </div>'
  ].join('\n');

  const mastery = [
    { stem: 'Quand le produit A·B existe-t-il ?', opts: ['Toujours', 'Si colonnes(A) = lignes(B)', 'Si colonnes(A) = colonnes(B)'], correct: 1, exp: 'La taille du produit est (lignes de A) × (colonnes de B).' },
    { stem: 'Le produit matriciel est-il commutatif ?', opts: ['Oui, toujours', 'Non, sauf cas particuliers', 'Oui si les matrices sont carrées'], correct: 1, exp: 'A·B ≠ B·A en général, même pour des matrices carrées.' },
    { stem: 'Que vaut <sup>t</sup>(A·B) ?', opts: ['<sup>t</sup>A · <sup>t</sup>B', '<sup>t</sup>B · <sup>t</sup>A', 'A · B'], correct: 1, exp: 'La transposée d’un produit inverse l’ordre des facteurs.' },
    { stem: 'À quelle condition une matrice carrée est-elle inversible ?', opts: ['det(A) ≠ 0', 'det(A) = 0', 'tous ses coefficients sont non nuls'], correct: 0, exp: 'det(A) ≠ 0 ⇔ A inversible ⇔ rang(A) = n.' },
    { stem: 'Que fait l’opération L2 ← L2 − 2L1 sur la matrice augmentée ?', opts: ['Elle change les solutions', 'Elle conserve les solutions', 'Elle rend la matrice singulière'], correct: 1, exp: 'Les opérations élémentaires sur les lignes conservent l’ensemble des solutions.' },
    { stem: 'Une famille est libre lorsque…', opts: ['aucun vecteur n’est nul', 'une combinaison linéaire nulle impose tous les coefficients nuls', 'elle contient la base canonique'], correct: 1, exp: 'C’est la définition : l’indépendance linéaire.' },
    { stem: 'Que vaut le rang d’une matrice de déterminant non nul (n × n) ?', opts: ['0', 'n', 'n − 1'], correct: 1, exp: 'det ≠ 0 ⇒ les n lignes sont indépendantes ⇒ rang = n.' },
    { stem: 'Combien de valeurs propres possède une matrice 2 × 2 sur ℝ (comptées avec multiplicité) ?', opts: ['1', '2', '4'], correct: 1, exp: 'Le polynôme caractéristique est de degré 2.' },
    { stem: 'Que vaut det(k · A) pour A de taille n × n ?', opts: ['k · det(A)', 'kⁿ · det(A)', 'n · det(A)'], correct: 1, exp: 'Chaque ligne est multipliée par k : n lignes, donc kⁿ.' },
    { stem: 'Le noyau de f est…', opts: ['l’ensemble des u tels que f(u) = 0', 'l’image de f', 'ℝ tout entier'], correct: 0, exp: 'ker f = { u | f(u) = 0 } : c’est un sous-espace de l’espace de départ.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l’esprit de l’épreuve finale (durée 2 h, /20). ' +
    'Fais-les <strong>sans regarder</strong> les corrigés, puis corrige-toi sévèrement.</p>',
    // Le chronomètre doit envelopper le bouton et l'affichage : le script
    // cherche [data-start] et [data-clock] à l'intérieur de [data-timer].
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lance le chrono quand tu commences un sujet. Ne consulte le corrigé qu’à la fin. ' +
      '<strong>Réserve 15 min de relecture</strong> : dimensions, signes, division par le déterminant.</p>',
      '    <p><button class="btn btn--primary" data-start>' + ic('play') + ' Démarrer le chrono</button>',
      '       <span data-clock style="font-weight:800;font-size:1.1rem;margin-left:12px">120:00</span></p>',
      '  </div>'
    ].join('\n'),
    sujets.map(sujet => '  <h2>' + sujet.title + '</h2>\n\n  <p class="lead">' + sujet.intro + '</p>\n\n' +
      sujet.items.map(itemHtml).join('\n\n')).join('\n\n'),
    '  <h2>QCM final — toutes notions</h2>',
    '  ' + qcm(mastery, { mastery: true }),
    box('method', 'Barème de maîtrise', 'compass', '    ' + bands([
      { cls: 'low', text: '&lt; 50 % — reprends les chapitres concernés avant un nouveau sujet.' },
      { cls: 'mid', text: '50–69 % — refais les exercices des chapitres faibles.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les pièges et la rigueur du calcul.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’épreuve réelle.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits dans l’esprit des évaluations B1 (CC1, CC2). ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours d’algèbre linéaire B1 : sujets chronométrés proches de ' +
        'l’évaluation, avec corrigés détaillés.',
      active: 'examen',
      body
    }
  };
}

/* ======================== Exercices & projet ======================== */

function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\n'),
    '    </ol>',
    '    <details><summary>Corrections</summary><div class="sol"><pre><code>' + solutions + '</code></pre></div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet intégrateur</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un projet final qui ' +
    'combine tout ce que tu as appris. Les programmes sont en Python, comme aux ateliers.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Calcule la somme de deux vecteurs de ℝ³ lus sur l’entrée standard.',
      'Calcule le produit scalaire de deux vecteurs de même taille.',
      'Calcule la norme euclidienne d’un vecteur.',
      'Donne la transposée d’une matrice 2 × 3 lue ligne par ligne.'
    ], [
      'a = [int(input()) for _ in range(3)]',
      'b = [int(input()) for _ in range(3)]',
      'print(" ".join(str(a[i] + b[i]) for i in range(3)))',
      '',
      'a = [int(input()) for _ in range(3)]',
      'b = [int(input()) for _ in range(3)]',
      'print(sum(a[i] * b[i] for i in range(3)))',
      '',
      'import math',
      'v = [int(input()) for _ in range(3)]',
      'print(round(math.sqrt(sum(x * x for x in v)), 4))',
      '',
      '# matrice 2 × 3 lue ligne par ligne, éléments séparés par un espace',
      'm = [input().split() for _ in range(2)]',
      'for j in range(3):',
      '    print(" ".join(m[i][j] for i in range(2)))'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Calcule le produit de deux matrices 2 × 2.',
      'Calcule la trace d’une matrice carrée lue ligne par ligne.',
      'Calcule le déterminant d’une matrice 3 × 3.',
      'Teste si trois vecteurs de ℝ³ sont linéairement indépendants (par le déterminant).'
    ], [
      'a = [[int(x) for x in input().split()] for _ in range(2)]',
      'b = [[int(x) for x in input().split()] for _ in range(2)]',
      'c = [[sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)] for i in range(2)]',
      'for ligne in c:',
      '    print(" ".join(str(x) for x in ligne))',
      '',
      'n = int(input())',
      'm = [[int(x) for x in input().split()] for _ in range(n)]',
      'print(sum(m[i][i] for i in range(n)))',
      '',
      'def det3(m):',
      '    return (m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])',
      '            - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])',
      '            + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))',
      '',
      'm = [[int(x) for x in input().split()] for _ in range(3)]',
      'print(det3(m))',
      '',
      'm = [[int(x) for x in input().split()] for _ in range(3)]',
      'print("libre" if det3(m) != 0 else "liee")'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Résous un système 3 × 3 par la méthode de Gauss (remontée).',
      'Calcule l’inverse d’une matrice 2 × 2 à coefficients entiers.',
      'Détermine le rang d’une matrice par échelonnement.',
      'Calcule les valeurs propres d’une matrice 2 × 2 (discriminant).'
    ], [
      'def gauss(a, b):',
      '    n = len(a)',
      '    for col in range(n):',
      '        pivot = max(range(col, n), key=lambda r: abs(a[r][col]))',
      '        a[col], a[pivot] = a[pivot], a[col]',
      '        b[col], b[pivot] = b[pivot], b[col]',
      '        for r in range(col + 1, n):',
      '            f = a[r][col] / a[col][col]',
      '            for c in range(col, n):',
      '                a[r][c] -= f * a[col][c]',
      '            b[r] -= f * b[col]',
      '    x = [0] * n',
      '    for i in range(n - 1, -1, -1):',
      '        x[i] = (b[i] - sum(a[i][j] * x[j] for j in range(i + 1, n))) / a[i][i]',
      '    return x',
      '',
      'a = [[1, 1, 1], [2, -1, 1], [1, 2, -1]]',
      'b = [6, 3, 2]',
      'print([round(v, 4) for v in gauss(a, b)])   # [1.0, 2.0, 3.0]',
      '',
      'a, b, c, d = 1, 2, 3, 4',
      'det = a * d - b * c                    # -2',
      'print([[d / det, -b / det], [-c / det, a / det]])',
      '',
      'def rang(m):',
      '    m = [ligne[:] for ligne in m]',
      '    lignes, cols, r = len(m), len(m[0]), 0',
      '    for c in range(cols):',
      '        piv = next((i for i in range(r, lignes) if m[i][c] != 0), None)',
      '        if piv is None:',
      '            continue',
      '        m[r], m[piv] = m[piv], m[r]',
      '        for i in range(r + 1, lignes):',
      '            f = m[i][c] / m[r][c]',
      '            m[i] = [m[i][j] - f * m[r][j] for j in range(cols)]',
      '        r += 1',
      '    return r',
      '',
      'def valeurs_propres(a, b, c, d):',
      '    s, p = a + d, a * d - b * c',
      '    disc = s * s - 4 * p',
      '    if disc < 0:',
      '        return "pas de valeur propre reelle"',
      '    return sorted([(s - disc ** 0.5) / 2, (s + disc ** 0.5) / 2])'
    ].join('\n')),

    '  <h2>Projet intégrateur — « boîte à outils matricielle »</h2>',
    box('situation', 'Cahier des charges', 'play', [
      '    <p>Un professeur veut un petit programme Python qui vérifie ses énoncés d’algèbre linéaire. ' +
      'Le programme lit une matrice carrée (première ligne : sa taille n ; puis n lignes de n entiers), ' +
      'puis affiche un rapport complet : trace, déterminant, rang, et — si la matrice est inversible — ' +
      'le fait qu’elle l’est.</p>'
    ].join('\n')),
    box('objectifs', 'Fonctionnalités attendues', 'target', [
      '    <ol>',
      '      <li><strong>Lire</strong> la matrice depuis l’entrée standard (une ligne = une ligne de la matrice).</li>',
      '      <li><strong>Calculer la trace</strong> avec une fonction dédiée (matrices).</li>',
      '      <li><strong>Calculer le déterminant</strong> par développement récursif ou par échelonnement (déterminants).</li>',
      '      <li><strong>Calculer le rang</strong> par échelonnement avec pivot (familles et rang).</li>',
      '      <li><strong>Conclure</strong> : inversible ⇔ rang = n ⇔ det ≠ 0.</li>',
      '      <li><strong>Gérer</strong> les cas limites : n = 1, matrice nulle, coefficients négatifs.</li>',
      '      <li><strong>Bonus</strong> : afficher aussi la matrice transposée.</li>',
      '    </ol>',
      '    <p>Contraintes : une fonction = une responsabilité, noms explicites, aucun arrondi non demandé.</p>'
    ].join('\n')),
    box('method', 'Grille d’auto-évaluation du projet (sur 100)', 'blocks', [
      '    ' + bands([
        { cls: '', text: 'Lecture de la matrice et fonctions dédiées <strong>20</strong>' },
        { cls: '', text: 'Déterminant correct (tests 1×1, 2×2, 3×3) <strong>20</strong>' },
        { cls: '', text: 'Rang par échelonnement correct <strong>20</strong>' },
        { cls: '', text: 'Rapport, conclusion, cas limites <strong>20</strong>' },
        { cls: '', text: 'Lisibilité, noms, découpage <strong>20</strong>' }
      ]),
      '    <p style="margin-top:10px">Objectif : <strong>≥ 95/100</strong> avant de considérer le projet terminé.</p>'
    ].join('\n')),
    '  <details>',
    '    <summary>Voir une solution de référence (après avoir essayé !)</summary>',
    '    <div class="sol">',
    '      <pre><code>' + [
      'def lire_matrice():',
      '    n = int(input())',
      '    return [[int(x) for x in input().split()] for _ in range(n)]',
      '',
      'def trace(m):',
      '    return sum(m[i][i] for i in range(len(m)))',
      '',
      'def determinant(m):',
      '    n = len(m)',
      '    if n == 1:',
      '        return m[0][0]',
      '    total = 0',
      '    for j in range(n):',
      '        sous = [ligne[:j] + ligne[j + 1:] for ligne in m[1:]]',
      '        total += ((-1) ** j) * m[0][j] * determinant(sous)',
      '    return total',
      '',
      'def rang(m):',
      '    m = [ligne[:] for ligne in m]',
      '    lignes, cols, r = len(m), len(m[0]), 0',
      '    for c in range(cols):',
      '        piv = next((i for i in range(r, lignes) if m[i][c] != 0), None)',
      '        if piv is None:',
      '            continue',
      '        m[r], m[piv] = m[piv], m[r]',
      '        for i in range(r + 1, lignes):',
      '            f = m[i][c] / m[r][c]',
      '            m[i] = [m[i][j] - f * m[r][j] for j in range(cols)]',
      '        r += 1',
      '    return r',
      '',
      'matrice = lire_matrice()',
      'n = len(matrice)',
      'print("trace :", trace(matrice))',
      'print("determinant :", determinant(matrice))',
      'print("rang :", rang(matrice))',
      'print("inversible :", "oui" if determinant(matrice) != 0 else "non")'
    ].join('\n') + '</code></pre>',
    '      Cette solution combine lecture, fonctions, récursivité, échelonnement et conclusion — ' +
    'les six modules du cours en un seul programme.',
    '    </div>',
    '  </details>',
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du support B1 et des corrigés de CC1 et CC2. ')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et projet intégrateur du cours d’algèbre linéaire B1 : ' +
        'calculs gradués et boîte à outils matricielle en Python.',
      active: 'exercices',
      body
    }
  };
}

/* ======================== Assemblage ======================== */

function render(kit, course, chapterList) {
  const pages = {};
  // Le lien « next » d'un chapitre est fourni ici : le chapitre n'a pas à
  // connaître sa place dans la séquence.
  const chaptersWithNav = chapterList.map((chapitre, index) => {
    const next = chapterList[index + 1];
    return Object.assign({}, chapitre, {
      next: next
        ? { href: 'chapitre' + next.n + '.html', label: 'Chapitre ' + next.n + ' — ' + next.title }
        : { href: '../atelier.html', label: 'Atelier de calcul' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours d’algèbre linéaire B1 : ' + chapitre.toc +
        ' Théorie, exemples calculés, exercices Python exécutables, QCM corrigés.',
      active: 'ch' + chapitre.n,
      dataChapter: chapitre.n,
      body
    };
  }

  Object.assign(pages, index(course, chapterList));
  Object.assign(pages, sommaire(course, chapterList));
  Object.assign(pages, atelier(course));
  Object.assign(pages, cartes(course, chapterList));
  Object.assign(pages, formules(course));
  Object.assign(pages, examens(course));
  Object.assign(pages, exercices(course));

  return pages;
}

module.exports = { render };
