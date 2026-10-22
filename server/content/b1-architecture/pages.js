/**
 * Pages transverses du cours « Circuit logique & architecture des ordinateurs » B1.
 *
 * Elles ne dépendent que du kit de gabarit : accueil, sommaire, atelier,
 * cartes, mémo, examens blancs, exercices. Les chapitres sont composés par
 * `kit.chapter` à partir des données de `chapitres-1-3.js` / `4-6.js`.
 */
'use strict';

const { ic, box, qcm, cards, bands, crumb } = require('../../../scripts/course-kit');

function chnav(back, forward) {
  const links = ['  <div class="chnav">'];
  if (back) links.push('    <a class="btn" href="' + back.href + '">' + ic('arrow-left') + ' ' + back.label + '</a>');
  if (forward) links.push('    <a class="btn btn--primary" href="' + forward.href + '">' + forward.label + ' ' + ic('arrow-right') + '</a>');
  links.push('  </div>');
  return links.join('\n');
}

function disclaimer(course, extra) {
  return '  <p class="disclaimer">Objectif de maîtrise 19/20 — votre note réelle dépend aussi de votre travail.\n  ' +
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
    '    <span class="tag tag--time">Architecture &amp; circuits</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>nommer les familles du système informatique : hardware, software, données, utilisateurs ;</li>',
      '      <li>convertir entre bases 2, 8, 10 et 16 : divisions successives, groupements, partie fractionnaire ;</li>',
      '      <li>représenter un négatif : signe + valeur absolue, compléments à 1 et à 2, arithmétique binaire ;</li>',
      '      <li>synthétiser et simplifier un circuit combinatoire : huit portes, Boole, Karnaugh ;</li>',
      '      <li>simuler les circuits séquentiels : bascules RS, D, JK, registre à décalage, compteur ;</li>',
      '      <li>qualifier un poste : von Neumann, carte mère, périphériques, critères du processeur.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Comment ce cours s\'articule', 'compass', [
      '    <p>Le support « Circuit logique &amp; architecture des ordinateurs » (Georges AYIVI-TOGBASSA, ' +
      'code B1COM0401) déroule quatre chapitres : généralités, numération, circuits logiques, architecture ' +
      'PC. Ce cours en garde l\'esprit et fait appliquer chaque mécanisme <strong>dans des études de cas</strong> : une grille d’analyse qui reproduit l\'analyse exacte du support — conversions, compléments, tables de portes, ' +
      'bascules front par front — exécuté dans la page.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois exercices de code</strong> : vous écrivez vraiment le ' +
      'script, il est réellement exécuté, puis corrigé par des tests que vous ne voyez pas. La logique écrite ' +
      'ici se rejoue telle quelle sur les exercices du support (séries de conversions, simplifications, ' +
      'qualification d\'un poste).</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo Architecture</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier de scripts</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'Circuit logique & architecture des ordinateurs B1 | Cours Interactif',
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
    '  <p class="lead">' + chapterList.length + ' chapitres, du premier octet jusqu\'au poste qualifié. ' +
    'Le chapitre 1 est en accès libre ; les suivants requièrent un compte de niveau B1 ou supérieur (et ' +
    'un abonnement actif).</p>',
    '  <p>Chaque chapitre se termine par <strong>trois études de cas méthodologiques</strong> à écrire et à exécuter ' +
    'dans la page : votre script est réellement lancé, puis corrigé par des tests que vous ne voyez pas. ' +
    'L\'<a href="atelier.html">atelier de scripts</a> permet de manipuler librement.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s\'auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo Architecture</span><br><span class="toc__d">Unités, conversions, compléments, portes, Karnaugh, bascules, compteurs, von Neumann.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Scripts gradués et projet final : la fiche de qualification d\'un poste.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier de scripts</span><br><span class="toc__d">Résoudre et valider des études de cas directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Sujets chronométrés proches de l\'épreuve, avec corrigés détaillés.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours « Circuit logique &amp; architecture des ordinateurs » B1 : ' + chapterList.length +
        ' chapitres, études de cas d’application, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { href: 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier d’analyse &amp; Bac à sable</h1>',
    '  <p class="lead">Un éditeur interactif dans la page pour résoudre les études de cas. Complétez la grille d’analyse, validez-la et observez le résultat : c\'est ici qu\'une règle de conversion devient un contrôle automatisé.</p>',
    box('objectifs', 'Comment fonctionne l\'atelier', 'target', [
      '    <ul>',
      '      <li><strong>Valider</strong> vérifie la conformité de vos réponses dans la grille d’analyse.</li>',
      '      <li><strong>Données du cas</strong> contient les paramètres soumis à l’étude.</li>',
      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n\'écrit jamais de code à votre place.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l\'éditeur.</li>',
      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="analyse"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="">',
      '  <script type="text/plain" data-lab-starter># Zone libre : appliquez la méthodologie du cours.\n# Rédigez votre analyse sous forme de grille structurée.\n\n[Cas 1 — Cas d\'application libre]\n# Données :\nA_COMPLETER\n</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — convertisseur de bases</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Grille d’analyse</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> expérimenter sans conséquence. Prenez un mécanisme du ' +
      'cours (complément à 2, portes logiques, bascules, compteur modulo), programmez-le et testez-le sur des ' +
      'cas limites.</p>',
      '    <div class="lab__brief">',
      '      <p>Le script proposé convertit chaque binaire en décimal grâce à la par décomposition en puissances de 2. Transforme-le : ' +
      'fais-le afficher l\'octal et l\'hexa, gère les mots de 8 bits, ou remplace tout le script par le mécanisme ' +
      'que vous voulez vérifier.</p>',
      '      <p>Dans un vrai assembleur, ce contrôle se fera ligne par ligne : la structure du script — ' +
      'lire, décider, rapporter — reste exactement la même.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Cas d’exemple</b><pre>3',
      '1010',
      '11111111',
      '10000000</pre></div>',
      '      <div class="lab__sample-part"><b>Résolution attendue</b><pre>1010 : decimal=10',
      '11111111 : decimal=255',
      '10000000 : decimal=128',
      'conversions : 3</pre></div>',
      '    </div>',
      '    <p class="lab__note">Trois lignes attendues : déplie « Entrée du programme » et saisis-les avant d’exécuter.</p>',
      '  </div>',
      '</div>'
    ].join('\n'),
    '  <h2>De la page au vrai processeur</h2>',
    '  <p>La simulation a une limite assumée : aucune porte n\'est câblée et aucun processeur n\'exécute ' +
    'ici — le circuit reste du texte structuré. Elle a une force : <strong>toute la logique se vérifie ' +
    'sans risque</strong> — on peut rejouer une conversion, un complément à 2 ou un compteur modulo autant ' +
    'de fois que nécessaire. Quand le script reproduit les bons réflexes — lire, décider, rapporter — le ' +
    'passage au vrai matériel est mécanique.</p>',
    box('pitfall', 'Les trois erreurs que l\'atelier révèle immédiatement', 'warning', [
      '    <ul>',
      '      <li><strong>Case incomplet</strong> : une valeur imprévue tombe dans le défaut silencieux et produit une sortie vide.</li>',
      '      <li><strong>Compteur dans la boucle</strong> : le bilan s\'affiche à chaque ligne au lieu d\'une seule fois, après.</li>',
      '      <li><strong>Ordre des lectures inversé</strong> : l’étude de cas comporte la seconde valeur avant la première, et tout décale.</li>',
      '    </ul>'
    ].join('\n')),
    box('tech', 'Ce que fait l\'atelier, côté technique', 'terminal', [
      '    <ul>',
      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d\'exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n\'est possible.</li>',
      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',
      '      <li>Le nombre d\'exécutions est limité par jour, pour tout le monde. L\'atelier n\'exécute donc que sur un clic.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Ensuite</h2>',
    '  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois études de cas corrigées ' +
    'automatiquement dans la page. Une fois l\'atelier apprivoisé, ils sont la meilleure façon de vérifier ' +
    'que le mécanisme est vraiment acquis.</p>',
    chnav({ href: 'sommaire.html', label: 'Sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Chapitre 1 — Généralités et unités' }),
    disclaimer(course, 'L\'exécution repose sur un service distant : en cas d\'indisponibilité, l\'atelier le ' +
      'signale et les exercices papier restent utilisables.')
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de scripts — simuler l\'architecture | ' + course.brand,
      description: 'Atelier de scripts du cours B1 : éditeur dans le navigateur, validation directe de la grille d’analyse, données du cas, console de sortie et tuteur qui explique les erreurs.',
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
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Revenez à J+1, J+3, J+7 pour ancrer durablement.</p>',
    cards(modules),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: 'formules.html', label: 'Mémo Architecture' })
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours B1 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Mémo ======================== */

function formules(course) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo Architecture &amp; circuits</h1>',
    '  <p class="lead">Les règles du cours sur une page, dans l\'ordre d\'une configuration. À garder ouvert ' +
    'pendant les exercices et l\'atelier.</p>',

    bloc('Le système informatique et les unités', [
      '<pre><code>systeme informatique : hardware / software / donnees / utilisateurs\n',
      'generations : lampe -> transistor -> circuit integre ->\n',
      '  microprocesseur -> reseau et cloud\n',
      '\n',
      'capacites : 1 octet = 8 bits ; 1 Ko = 1024 octets\n',
      '  1 Mo = 1024 Ko ; 1 Go = 1024 Mo ; 1 To = 1024 Go\n',
      'debits : MBps (octets/s) = 8 x Mbps (bits/s)\n',
      'mesures : frequence Hz (cycles/s) / puissance W / latence ms</code></pre>',
      '<p>Puissances de 2 pour les capacités, facteur 8 entre octets et bits.</p>'
    ].join('\n')),

    bloc('Numération : les quatre conversions', [
      '<pre><code>unites : bit (0/1) / quartet (4 bits) / octet (8 bits)\n',
      '  MSB = poids fort (gauche) / LSB = poids faible (droite)\n',
      '\n',
      'decimal -> binaire : divisions successives, restes lus de BAS EN HAUT\n',
      '  (13 -> 1101) OU soustraction des puissances de 2\n',
      'binaire -> decimal : somme des poids (1011 = 8+0+2+1 = 11)\n',
      'binaire -> octal : groupement par 3 bits depuis la DROITE\n',
      'binaire -> hexa : groupement par 4 bits depuis la DROITE\n',
      '  A=10 B=11 C=12 D=13 E=14 F=15\n',
      'fractionnaire : poids negatifs a droite (2^-1, 2^-2...)\n',
      '  -> multiplier par 2, garder les parties entieres\n',
      'codes : BCD (quartet par chiffre decimal) / ASCII (7 bits, A=65)</code></pre>',
      '<p>Trois bits font l\'octal, quatre bits font l\'hexa : les groupements partent de la droite.</p>'
    ].join('\n')),

    bloc('Nombres signés et arithmétique', [
      '<pre><code>signe + valeur absolue : MSB = signe (0 = +, 1 = -)\n',
      '  defaut : DEUX zeros (0000 et 1000)\n',
      'complement a 1 : inverser TOUS les bits (0101 -> 1010)\n',
      'complement a 2 : complement a 1 + 1 (0101 -> 1010 -> 1011)\n',
      '  methode directe : recopier jusqu\'au 1er 1 compris, inverser le reste\n',
      '  avantages : UN SEUL zero ; soustraction = addition du complement\n',
      '\n',
      'addition : 1+1 = 0 retenue 1 ; 1+1+1 = 1 retenue 1\n',
      'soustraction : additionner le complement a 2\n',
      'decalage gauche de k bits = x 2^k ; droite = division entiere\n',
      'debordement : le bit sortant du mot (carry) doit etre signale</code></pre>',
      '<p>Le complément à 2 a gagné : un seul zéro et un seul additionneur.</p>'
    ].join('\n')),

    bloc('Portes logiques et algèbre de Boole', [
      '<pre><code>NOT : inverse        AND : tout a 1        OR : au moins un a 1\n',
      'NAND = non-AND       NOR = non-OR\n',
      'XOR : 1 si ENTREES DIFFERENTES    NXOR : 1 si ENTREES EGALES\n',
      '  bulle sur le symbole = negation\n',
      '\n',
      'boole : a+0=a / a+1=1 / a+a=a / a+a\'=1\n',
      '  a.0=0 / a.1=a / a.a=a / a.a\'=0\n',
      '  a + ab = a (absorption)      (a\')\' = a\n',
      'De Morgan : (ab)\' = a\' + b\'   (a+b)\' = a\' . b\'\n',
      '\n',
      'synthese : table -> mintermes (0 = complemente) -> somme de produits\n',
      'karnaugh : groupes de 1/2/4/8, bords recolles ;\n',
      '  var toujours a 0 -> complements / a 1 -> directe / change -> eliminee</code></pre>',
      '<p>XOR aime la différence, NXOR l\'équivalence : ne pas les échanger.</p>'
    ].join('\n')),

    bloc('Blocs combinatoires et séquentiels', [
      '<pre><code>additionneur complet : S = a XOR b XOR r\n',
      '  retenue sortante = ab + r(a XOR b)\n',
      'comparateur : a>b / a=b / a<b\n',
      'decodeur 2->4 : une sortie active par adresse (Y3Y2Y1Y0)\n',
      'multiplexeur : 2^k entrees -> 1 sortie selon k bits de selection\n',
      '\n',
      'RS : S met a 1 / R met a 0 / RS=00 memoire / RS=11 INTERDIT\n',
      'D : recopie D sur Q au FRONT d\'horloge\n',
      'JK : 00 memoire / 10 set / 01 reset / 11 BASCULE (toggle)\n',
      '  set/reset asynchrones : hors horloge, immediat\n',
      'registre a decalage : n bascules D en serie, serie <-> parallele\n',
      'compteur modulo 2^n : 0 ... 2^n-1 puis 0 ; valeur = (depart + i) mod n</code></pre>',
      '<p>R=S=1 est interdit ; J=K=1 est le mode bascule qui fait les compteurs.</p>'
    ].join('\n')),

    bloc('Architecture PC et périphériques', [
      '<pre><code>von Neumann : UAL (calcule) / unite de controle (orchestre) /\n',
      '  memoire (RAM volatile + ROM/disque permanents) / E/S\n',
      '  programme stocke dans la MEME memoire que les donnees\n',
      '\n',
      'carte mere : socket (CPU) / DIMM (RAM) / SATA (disques) /\n',
      '  PCIe (cartes, GPU x16) / M.2 (SSD NVMe) / chipset /\n',
      '  BIOS-UEFI (demarrage) / pile CMOS (heure, reglages)\n',
      'alimentation : 12 V / 5 V / 3,3 V\n',
      'CPU : 4 criteres = frequence GHz / coeurs / cache / socket\n',
      '\n',
      'peripheriques : entree (clavier, souris, scanner) /\n',
      '  sortie (ecran, imprimante, HP) /\n',
      '  entree-sortie (tactile, modem, cle USB, carte reseau)\n',
      'video : HDMI / VGA / DVI / DisplayPort\n',
      'qualifier : multimedia >= 2000 MHz et 4096 Mo /\n',
      '  bureautique >= 1000 MHz et 2048 Mo / sinon basique</code></pre>',
      '<p>L\'UAL calcule, le contrôle commande, la mémoire se souvient, les E/S parlent.</p>'
    ].join('\n')),

    bloc('Erreurs fréquentes à éviter', [
      '<ul>',
      '    <li>Croire que 1 Ko = 1000 octets : c\'est 1024 (puissances de 2).</li>',
      '    <li>Confondre Mbps (bits) et Mo/s (octets) : facteur 8.</li>',
      '    <li>Lire les restes des divisions successives de haut en bas : c\'est de bas en haut.</li>',
      '    <li>Grouper les bits depuis la gauche : les groupements partent de la droite.</li>',
      '    <li>Oublier le +1 du complément à 2 après l\'inversion.</li>',
      '    <li>Confondre XOR (différence) et NXOR (équivalence).</li>',
      '    <li>Faire un groupe Karnaugh de 3 cases : puissances de 2 seulement.</li>',
      '    <li>Appliquer R=S=1 à la JK : c\'est J=K=1 qui bascule, et R=S=1 qui est interdit.</li>',
      '    <li>Placer le disque dur dans la mémoire volatile : il est permanent.</li>',
      '    <li>Choisir un CPU sans vérifier la compatibilité socket.</li>',
      '  </ul>'
    ].join('\n')),

    chnav({ href: 'cartes.html', label: 'Cartes' }, { href: 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémo Architecture — ' + course.brand,
      description: 'Mémo du cours B1 : unités, conversions de bases, compléments, portes logiques, ' +
        'Karnaugh, bascules, compteurs et architecture PC sur une page.',
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
      intro: 'Sujet type épreuve — système informatique, unités, numération, nombres signés.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Système informatique',
          text: 'Citer les quatre familles du système informatique avec un exemple chacune. Donner les cinq générations d\'ordinateurs. Quelle différence entre calculateur et ordinateur ?',
          sol: '<strong>Hardware</strong> (processeur, RAM), <strong>software</strong> (OS, Word), <strong>données</strong> (textes, nombres), <strong>utilisateurs</strong> (humains, machines). Générations : <strong>lampe, transistor, circuit intégré, microprocesseur, réseau et cloud</strong>. Le <strong>calculateur</strong> est dédié au calcul ; l\'<strong>ordinateur</strong> généralise : machine électronique programmable de traitement automatique de l\'information.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Unités',
          text: 'Convertir : 2048 Ko en Mo ; 2 Go en Mo ; un lien de 96 Mbps en Mo/s. Quels sont les quatre critères de choix d\'un processeur ?',
          sol: '2048 Ko = <strong>2 Mo</strong> (÷ 1024) ; 2 Go = <strong>2048 Mo</strong> ; 96 Mbps = <strong>12 Mo/s</strong> (÷ 8, car 1 Mo/s = 8 Mbps). CPU : <strong>fréquence (GHz), nombre de cœurs, cache, compatibilité socket</strong>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Numération',
          text: 'Convertir 45 en binaire par divisions successives, puis 11001100 en décimal, en octal et en hexadécimal. Que vaut F en décimal ?',
          sol: '45 : 45÷2=22 r1, 22÷2=11 r0, 11÷2=5 r1, 5÷2=2 r1, 2÷2=1 r0, 1÷2=0 r1 → restes lus de bas en haut : <strong>101101</strong>. 11001100 = 128+64+8+4 = <strong>204</strong> ; groupement par 3 depuis la droite : 011 001 100 = <strong>314</strong> (octal) ; par 4 : 1100 1100 = <strong>CC</strong> (hexa). F = <strong>15</strong>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Nombres signés',
          text: 'Représenter -7 sur 4 bits dans les trois conventions. Pourquoi le complément à 2 a-t-il triomphé ? Poser 0111 + 0001.',
          sol: '<strong>Signe+valeur absolue : 1111</strong> ; <strong>complément à 1 : 1000</strong> ; <strong>complément à 2 : 1001</strong>. Le C2 l\'a emporté car il a <strong>un seul zéro</strong> et transforme la soustraction en addition — le processeur n\'a qu\'un additionneur. 0111 + 0001 = <strong>1000</strong> (8), sans débordement sur 4 bits non signés.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — variante',
      intro: 'Sujet orienté circuits logiques, séquentiels et architecture PC.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Portes et Boole',
          text: 'Donner les tables de AND, OR et XOR. Simplifier S = ab + ab\' et T = (a+b)\' par De Morgan. Quelle porte donne 1 sur entrées égales ?',
          sol: '<strong>AND</strong> : 1 si tout à 1 ; <strong>OR</strong> : 1 si au moins un à 1 ; <strong>XOR</strong> : 1 si les entrées diffèrent. S = a(b + b\') = <strong>a</strong> (absorption). T = <strong>a\'·b\'</strong> (De Morgan). Entrées égales → 1 : <strong>NXOR</strong> (équivalence).'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Synthèse et Karnaugh',
          text: 'Synthétiser S = 1 pour les lignes 01 et 11 (entrées a, b). Quelles tailles de groupes autorise Karnaugh ? Que devient une variable toujours à 0 dans un groupe ?',
          sol: 'Mintermes : a\'b (01) et ab (11) → S = a\'b + ab = <strong>a\'b + ab = b(a\' + a) = b</strong>. Karnaugh autorise les groupes de <strong>1, 2, 4, 8…</strong> cases (puissances de 2), bords recollés. Variable toujours à 0 → <strong>complémentée</strong> ; toujours à 1 → directe ; qui change → éliminée.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Séquentiel',
          text: 'Comparer RS et JK : la combinaison 11 est-elle admise ? Donner les quatre modes de la JK. Dérouler une bascule D initialisée à 0 qui reçoit D = 1, 0, 1. Rôle du registre à décalage ?',
          sol: '<strong>R=S=1 est interdit</strong> (sorties identiques) ; <strong>J=K=1 est le mode bascule</strong> de la JK. Modes : <strong>00 mémoire, 10 set, 01 reset, 11 bascule</strong>. Bascule D : front 1 → Q=1, front 2 → Q=0, front 3 → Q=1 ; état final <strong>Q=1</strong>. Le registre à décalage décale les bits de bascule en bascule : conversion <strong>série/parallèle</strong>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Architecture PC',
          text: 'Décrire les quatre parties de von Neumann. Placer : socket, DIMM, SATA, PCIe. Classer clavier, écran tactile et imprimante. Un poste à 2600 MHz et 16 Go de RAM est de quel profil ?',
          sol: '<strong>UAL</strong> (calcule), <strong>unité de contrôle</strong> (orchestre), <strong>mémoire</strong> (volatile + permanente), <strong>E/S</strong>. Socket : <strong>processeur</strong> ; DIMM : <strong>RAM</strong> ; SATA : <strong>disques</strong> ; PCIe : <strong>cartes d\'extension</strong>. Clavier : <strong>entrée</strong> ; écran tactile : <strong>entrée-sortie</strong> ; imprimante : <strong>sortie</strong>. 2600 MHz ≥ 2000 et 16384 Mo ≥ 4096 → <strong>multimédia</strong>.'
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
    { stem: '1 Mo vaut…', opts: ['1000 Ko', '1024 Ko', '1024 octets'], correct: 1, exp: 'Puissances de 2 : 1 Mo = 1024 Ko.' },
    { stem: 'Un lien de 40 Mbps transfert au plus…', opts: ['5 Mo/s', '40 Mo/s', '4 Mo/s'], correct: 0, exp: '1 Mo/s = 8 Mbps : 40 ÷ 8 = 5 Mo/s.' },
    { stem: '1011 en décimal vaut…', opts: ['11', '13', '9'], correct: 0, exp: '8 + 0 + 2 + 1 = 11.' },
    { stem: 'Le complément à 2 de 0101 est…', opts: ['1010', '1011', '1001'], correct: 1, exp: 'C1 = 1010, puis +1 → 1011.' },
    { stem: 'La XOR donne 1 si les entrées…', opts: ['sont égales', 'diffèrent', 'valent 1'], correct: 1, exp: 'OU exclusif : différence. NXOR : équivalence.' },
    { stem: 'Un groupe Karnaugh valide compte…', opts: ['3 cases', '4 cases', '6 cases'], correct: 1, exp: 'Puissances de 2 : 1, 2, 4, 8…' },
    { stem: 'J=K=1 fait…', opts: ['mémoriser', 'basculer Q', 'planter'], correct: 1, exp: 'Mode toggle de la JK — cœur des compteurs.' },
    { stem: 'R=S=1 est…', opts: ['le mode set', 'le mode reset', 'interdit'], correct: 2, exp: 'Sorties identiques : combinaison interdite pour RS.' },
    { stem: 'Le slot DIMM accueille…', opts: ['la RAM', 'le processeur', 'le SSD'], correct: 0, exp: 'RAM en DIMM ; CPU au socket ; SSD NVMe en M.2.' },
    { stem: 'Un écran tactile est…', opts: ['une entrée', 'une sortie', 'une entrée-sortie'], correct: 2, exp: 'Il affiche et reçoit le toucher.' }
  ];

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d\'examen</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés, dans l\'esprit de l\'épreuve (durée 2 h, /20). ' +
    'Réalisez-les <strong>sans regarder</strong> les corrigés, puis corrigez-vous sévèrement.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d\'examen — 2 h</div>',
      '    <p>Lancez le chrono quand vous commencez un sujet. Ne consultez le corrigé qu\'à la fin. ' +
      '<strong>Réservez 15 min de relecture</strong> : unités, conversions, compléments, tables de portes, ' +
      'modes des bascules, blocs de von Neumann.</p>',
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
      { cls: 'good', text: '70–94 % — bon niveau, cible Karnaugh et les bascules.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l\'épreuve.' }
    ])),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d\'après le support « Circuit logique &amp; architecture des ordinateurs » (Georges AYIVI-TOGBASSA, Novembre 2024). ')
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours B1 : sujets chronométrés sur les unités, la numération, ' +
        'les nombres signés, les circuits logiques et séquentiels et l\'architecture PC.',
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
    '    <details><summary>Corrections &amp; calculs d’architecture</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; cas pratiques</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier d’ingénierie matérielle et d’architecture des ordinateurs.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Convertir un nombre entre les bases binaire (base 2), hexadécimale (base 16) et décimale (base 10).',
      'Calculer l’espace d’adressage direct permis par un bus d’adresses de 32 bits et de 64 bits.',
      'Identifier les registres fondamentaux du modèle de Von Neumann (PC, IR, MAR, MBR, Accumulateur).',
      'Décrire les trois phases du cycle d’instruction (Fetch, Decode, Execute).'
    ], [
      '<p><strong>1. Conversions :</strong> $1101_2 = 8 + 4 + 1 = 13_{10} = \\text{D}_{16}$ ; $0x2A = 2 \\times 16 + 10 = 42_{10} = 00101010_2$.</p>',
      '<p><strong>2. Espace d’adressage :</strong> $2^{32} \\text{ octets} = 4\\text{ Go}$ ; $2^{64} \\text{ octets} \\approx 18{,}4\\text{ Exaoctets}$.</p>',
      '<p><strong>3. Registres :</strong> PC (Program Counter pointe l’instruction suivante), IR (Instruction Register contient le code opération en cours), MAR/MBR interfacent la mémoire centrale.</p>',
      '<p><strong>4. Cycle machine :</strong> Fetch (chargement depuis RAM), Decode (décodage du code opération par l’unité de contrôle), Execute (calcul ALU ou transfert registre).</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Calculer le temps d’accès effectif moyen (AMAT) d’une hiérarchie mémoire avec cache L1 ($95\%$ de hit rate).',
      'Distinguer les architectures RISC (instructions simples à cycle unique) et CISC (instructions complexes multi-cycles).',
      'Représenter un nombre réel en virgule flottante simple précision norme IEEE 754 (signe, exposant biaisé, mantisse).',
      'Calculer le débit maximal d’un bus PCI-Express selon sa génération et son nombre de lignes (lanes).'
    ], [
      '<p><strong>1. AMAT :</strong> $AMAT = T_{hit} + (1 - H) \\times T_{miss} = 1\\text{ ns} + 0{,}05 \\times 50\\text{ ns} = 3{,}5\\text{ ns}$.</p>',
      '<p><strong>2. RISC vs CISC :</strong> RISC (ARM, RISC-V : format fixe, exécution pipeline optimisée) vs CISC (x86-64 : rétrocompatibilité, micro-opérations internes).</p>',
      '<p><strong>3. IEEE 754 32 bits :</strong> 1 bit de signe, 8 bits d’exposant (biais de 127), 23 bits de mantisse normalisée ($1.M$).</p>',
      '<p><strong>4. Débit PCIe :</strong> PCIe 4.0 délivre $\\approx 2\\text{ Go/s}$ par ligne ; un port x16 offre donc un débit théorique de $32\\text{ Go/s}$ bidirectionnel.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Analyser les aléas de pipeline processeur (structurels, de données RAW/WAR/WAW, et de contrôle lors de branchements).',
      'Dimensionner la hiérarchie de stockage d’un serveur de base de données (NVMe, SSD SATA, RAM et caches CPU).',
      'Comparer les mécanismes de cohérence de cache (protocole MESI) dans un processeur multi-cœurs.',
      'Évaluer l’impact de la loi d’Amdahl sur le gain de performance d’une parallélisation à N cœurs.'
    ], [
      '<p><strong>1. Aléas de pipeline :</strong> Données (résolu par forwarding/bypassing ou insertion de bulles) ; Contrôle (résolu par prédiction de branchement statique/dynamique).</p>',
      '<p><strong>2. Dimensionnement stockage :</strong> Priorité à la RAM pour le buffer pool, NVMe PCIe en RAID 10 pour le journal WAL (faible latence d’écriture synchrone).</p>',
      '<p><strong>3. Protocole MESI :</strong> Modified (modifié en cache local), Exclusive (propre, non partagé), Shared (partagé en lecture), Invalid (invalide, rechargement requis).</p>',
      '<p><strong>4. Loi d’Amdahl :</strong> $S = \\frac{1}{(1 - P) + \\frac{P}{N}}$ où $P$ est la fraction parallélisable : la partie séquentielle $(1-P)$ borne strictement l’accélération maximale.</p>'
    ].join('\n')),

    '  <h2>Dossier de synthèse — Architecture Matérielle &amp; Dimensionnement Serveur</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’ingénierie consiste à concevoir et justifier l’architecture matérielle complète d’un serveur d’entreprise haute densité : choix des processeurs (cœurs, fréquences, cache L3), dimensionnement des canaux mémoire NUMA, contrôleurs de stockage et interfaces d’entrées/sorties.</p>'
    ].join('\n')),
    box('objectifs', 'Compétences d’architecture évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Analyse de charge :</strong> Profilage CPU-bound, Memory-bound ou I/O-bound.</li>',
      '      <li><strong>Topologie NUMA :</strong> Répartition symétrique des barrettes de RAM par canal pour maximiser la bande passante.</li>',
      '      <li><strong>Tolérance aux pannes :</strong> Mémoire ECC registered, alimentations redondantes et RAID matériel.</li>',
      '      <li><strong>Bilan thermique &amp; énergétique :</strong> Calcul de TDP global et dimensionnement de la dissipation.</li>',
      '    </ol>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel d’architecture des ordinateurs B1.')
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier de synthèse — ' + course.brand,
      description: 'Exercices supplémentaires et dossier d’architecture matérielle B1 : Von Neumann, hiérarchie mémoire et dimensionnement serveur.',
      active: 'exercices',
      body
    }
  };
}

/* ======================== Assemblage ======================== */

function render(kit, course, chapterList) {
  const pages = {};
  const chaptersWithNav = chapterList.map((chapitre, index) => {
    const next = chapterList[index + 1];
    return Object.assign({}, chapitre, {
      next: next
        ? { href: 'chapitre' + next.n + '.html', label: 'Chapitre ' + next.n + ' — ' + next.title }
        : { href: '../atelier.html', label: 'Atelier de scripts' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours B1 : ' + chapitre.toc +
        ' Théorie, exemples détaillés, études de cas d’application, QCM corrigés.',
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
