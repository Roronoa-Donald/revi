/**
 * Chapitre 3 du cours « Cryptographie & PKI B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Fonctions de Hachage, Intégrité et Authentification de Message (MAC)',
  short: 'Hachage, Intégrité &amp; MAC',
  toc: 'Fonctions de hachage à sens unique (One-Way Hash Functions), construction itérative de Merkle-Damgård, propriétés de sécurité (résistance à la préimage, seconde préimage, résistance aux collisions), effet d\'avalanche, analyse comparative de MD5, SHA-1, SHA-2 (SHA-256, SHA-512) et SHA-3 (Keccak / construction éponge), codes d\'authentification de message HMAC (RFC 2104), attaques par extension de longueur, et modélisation probabiliste du paradoxe des anniversaires.',
  time: '≈ 2 h 45 de travail',
  free: false,
  situation: 'Dans les architectures modernes de distribution logicielle (packages npm, conteneurs Docker, binaires OS) et de transactions financières en ligne, le chiffrement seul ne garantit absolument pas qu\'un message n\'a pas été altéré ou falsifié en cours de route. Un attaquant actif peut modifier des octets chiffrés ou réinjecter d\'anciens messages sans en connaître la clé. De plus, continuer d\'utiliser des fonctions dépréciées comme MD5 ou SHA-1 pour des signatures de certificats ou des condensés d\'intégrité expose les infrastructures à des attaques par collision générant des faux certificats valides. En tant qu\'ingénieur cybersécurité B3, vous devez maîtriser les mécanismes formels d\'intégrité, implémenter des contrôles d\'empreinte conformes aux directives du NIST, concevoir des HMAC pour l\'authentification partagée et dimensionner les tailles de condensé face au paradoxe des anniversaires.',
  objectives: [
    'comprendre les propriétés fondamentales des fonctions de hachage : sens unique, résistance aux préimages et aux collisions ;',
    'analyser la construction de Merkle-Damgård et la construction éponge (Sponge Construction) de SHA-3 Keccak ;',
    'identifier les vulnérabilités cryptanalytiques de MD5 et SHA-1 (attaques Wang et SHAttered) et appliquer les recommandations NIST ;',
    'différencier intégrité simple (hachage) et authenticité d\'origine (code HMAC selon la RFC 2104) ;',
    'calculer la probabilité de collision selon le paradoxe des anniversaires et dimensionner la taille de sortie face aux attaques ;',
    'analyser et résoudre méthodologiquement des vérificateurs d\'empreintes, des moteurs HMAC-SHA256 et des simulateurs de détection de collision.'
  ],
  sections: [
    {
      title: 'Propriétés Fondamentales des Fonctions de Hachage Cryptographiques',
      html: [
        '<p>Une fonction de hachage cryptographique $H$ transforme un message $M$ de taille arbitraire en un condensé binaire (ou empreinte, <em>digest</em>) de taille fixe $n$ bits : $h = H(M)$. Pour être qualifiée de cryptographique, la fonction doit satisfaire trois exigences mathématiques strictes :</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>1. Résistance à la Préimage</h4>',
        '    <p>Étant donné un condensé $y$, il doit être calculatoirement impossible de trouver un message $M$ tel que $H(M) = y$.</p>',
        '    <p><strong>Complexité requise :</strong> $2^n$ opérations (sens unique strict).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Seconde Préimage</h4>',
        '    <p>Étant donné un message $M_1$, il doit être impossible de trouver un second message distinct $M_2 ≠ M_1$ tel que $H(M_1) = H(M_2)$.</p>',
        '    <p><strong>Complexité requise :</strong> $2^n$ opérations (protection contre la falsification ciblée).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>3. Résistance aux Collisions</h4>',
        '    <p>Il doit être impossible de trouver deux messages quelconques $M_1 ≠ M_2$ tels que $H(M_1) = H(M_2)$.</p>',
        '    <p><strong>Complexité requise :</strong> $2^{n/2}$ opérations (dictée par le paradoxe des anniversaires).</p>',
        '  </div>',
        '</div>',
        box('standard', 'L\'Effet d\'Avalanche (Avalanche Effect)', [
          '<p>Une propriété indispensable d\'un bon algorithme de hachage est l\'<strong>effet d\'avalanche</strong> : la modification d\'un seul bit dans le message d\'entrée doit provoquer la modification d\'environ 50% des bits du condensé de sortie, de manière totalement imprévisible et non corrélée.</p>',
          '<pre><code>sha256("Securite Informatique B3")  = 7e93a...c841 (256 bits)\nsha256("securite Informatique B3")  = 3a28f...09e2 (plus de 130 bits différents !)</code></pre>'
        ])
      ].join('\n')
    },
    {
      title: 'Architectures de Hachage : Merkle-Damgård vs Construction Éponge (SHA-3)',
      html: [
        '<p>La conception interne des fonctions de hachage s\'appuie sur deux paradigmes majeurs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Construction de Merkle-Damgård (MD5, SHA-1, SHA-2)</h4>',
        '    <ul>',
        '      <li>Le message est complété par un bourrage (padding) incluant sa longueur originale, puis découpé en blocs de taille fixe (512 ou 1024 bits).</li>',
        '      <li>Une fonction de compression $f$ applique une transformation itérative avec un vecteur d\'initialisation $IV$ : $h_i = f(h_{i-1}, M_i)$.</li>',
        '      <li><strong>Faiblesse structurelle :</strong> vulnérable aux <em>attaques par extension de longueur</em> (Length Extension Attack), rendant dangereuse la construction naïve $H(K \\parallel M)$ pour un MAC.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Construction Éponge (SHA-3 / Keccak)</h4>',
        '    <ul>',
        '      <li>Normalisée par le NIST en 2015 (FIPS 202), SHA-3 repose sur une permutation pseudo-aléatoire continue sur un état interne large (1600 bits pour Keccak-f[1600]).</li>',
        '      <li><strong>Phase d\'absorption (Absorbing) :</strong> les blocs du message sont injectés par XOR dans la partie débit (<em>rate</em> $r$) de l\'état.</li>',
        '      <li><strong>Phase d\'essorage (Squeezing) :</strong> les bits du condensé sont extraits successivement.</li>',
        '      <li><strong>Immunité totale :</strong> totalement invulnérable aux attaques par extension de longueur.</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('warning', 'État de l\'Art et Statuts de Sécurité NIST', [
          '<p>Le NIST et l\'ANSSI classifient rigoureusement les algorithmes de hachage :</p>',
          '<ul>',
          '  <li><strong>MD5 (128 bits) :</strong> <span style="color:#b91c1c;font-weight:700;">TOTALEMENT OBSOLÈTE</span>. Collisions pratiques réalisables en quelques millisecondes sur un ordinateur portable depuis 2004 (équipe de Xiaoyun Wang). À proscrire impérativement.</li>',
          '  <li><strong>SHA-1 (160 bits) :</strong> <span style="color:#b91c1c;font-weight:700;">DÉPRÉCIÉ ET BANI</span>. Première collision réelle démontrée par Google et le CWI en 2017 (attaque <em>SHAttered</em> sur des fichiers PDF). Banni de TLS et des certificats Web PKI.</li>',
          '  <li><strong>SHA-2 (SHA-256, SHA-384, SHA-512) :</strong> <span style="color:#15803d;font-weight:700;">RECOMMANDÉ ET ROBUSTE</span>. Standard industriel mondial pour la blockchain, TLS et les signatures numériques.</li>',
          '  <li><strong>SHA-3 (SHA3-256, SHA3-512) :</strong> <span style="color:#15803d;font-weight:700;">STANDARD MODERNE RECOMMANDÉ</span>. Alternative d\'architecture cryptographique diversifiée.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Codes d\'Authentification de Message HMAC (RFC 2104)',
      html: [
        '<p>Un condensé de hachage simple $H(M)$ prouve l\'intégrité face aux erreurs de transmission aléatoires, mais n\'assure aucune <strong>authenticité</strong> : un attaquant modifiant $M$ en $M\'$ peut simplement recalculer $H(M\')$. Pour authentifier la source, l\'émetteur et le récepteur partagent une clé secrète $K$ :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Pourquoi pas simplement H(K || M) ?</h4>',
        '    <p>Sur les algorithmes basés sur Merkle-Damgård (SHA-1, SHA-256), la construction naïve $H(K \\parallel M)$ permet à un attaquant connaissant la longueur de $K$ d\'ajouter des données $M_{ext}$ à la fin du message et de calculer le hachage valide $H(K \\parallel M \\parallel \\text{pad} \\parallel M_{ext})$ <em>sans connaître la clé secrète $K$</em> (Length Extension Attack).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Mécanisme HMAC (RFC 2104)</h4>',
        '    <p>HMAC résout définitivement ce problème par une construction imbriquée à double passage :</p>',
        '    <pre><code>HMAC(K, M) = H((K\' ^ opad) || H((K\' ^ ipad) || M))</code></pre>',
        '    <ul>',
        '      <li>$K\'$ : clé normalisée à la taille d\'un bloc (64 octets pour SHA-256). Si $|K| > 64$, $K\' = H(K)$ complétée de zéros ; si $|K| < 64$, $K\' = K$ complétée de zéros.</li>',
        '      <li>$ipad$ : constante de bourrage interne (0x36 répété 64 fois).</li>',
        '      <li>$opad$ : constante de bourrage externe (0x5c répété 64 fois).</li>',
        '    </ul>',
        '  </div>',
        '</div>',
        box('tip', 'Garantie de Sécurité de HMAC', [
          '<p>HMAC est prouvé résistant aux attaques par extension de longueur et reste sécurisé même si la fonction de hachage sous-jacente subit des faiblesses sur les collisions (HMAC-MD5 a résisté longtemps après la chute de MD5). Toutefois, les normes actuelles imposent <strong>HMAC-SHA256</strong> ou <strong>HMAC-SHA512</strong>.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Paradoxe des Anniversaires & Dimensionnement des Condensés',
      html: [
        '<p>Le paradoxe des anniversaires est un résultat contre-intuitif fondamental de la théorie des probabilités : dans une classe de seulement 23 personnes, il y a plus de 50% de chances que deux d\'entre elles partagent le même jour d\'anniversaire (sur 365 jours possibles).</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Formulation Mathématique</h4>',
        '    <p>Pour un espace d\'empreintes de taille $N = 2^b$ (où $b$ est le nombre de bits du hachage) et $k$ tirages indépendants :</p>',
        '    <pre><code>P(collision) ≈ 1 - exp( - (k * (k - 1)) / (2 * N) )</code></pre>',
        '    <p>Le nombre d\'essais $k_{50\\%}$ nécessaire pour avoir une probabilité d\'au moins 50% de trouver une collision est :</p>',
        '    <pre><code>k_{50%} ≈ sqrt(2 * ln(2) * N) ≈ 1.1774 * sqrt(N) = 1.1774 * 2^(b / 2)</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Impact Pratique sur le Dimensionnement</h4>',
        '    <ul>',
        '      <li><strong>MD5 (128 bits) :</strong> espace de $2^{128}$, collision théorique en $2^{64}$ opérations. En pratique, des faiblesses structurelles permettent des collisions en $2^{16}$ opérations.</li>',
        '      <li><strong>SHA-1 (160 bits) :</strong> collision théorique en $2^{80}$ opérations, réduite à $2^{63}$ par l\'attaque SHAttered.</li>',
        '      <li><strong>SHA-256 (256 bits) :</strong> résistance aux collisions de $2^{128}$ opérations, ce qui est hors de portée de toute la puissance de calcul planétaire cumulée.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  method: [
    'Caractérisation du besoin de sécurité : déterminer si l\'exigence relève du contrôle d\'intégrité simple (SHA-256 pour des fichiers statiques) ou de l\'authentification de message avec clé secrète partagée (HMAC-SHA256 pour des API ou des sessions).',
    'Sélection rigoureuse des primitives autorisées : exclure sans compromis MD5 et SHA-1 des configurations système, et imposer SHA-256, SHA-512 ou SHA3-256 selon les standards NIST et ANSSI.',
    'Implémentation conforme du protocole HMAC RFC 2104 : appliquer la normalisation de la clé à la taille du bloc (64 octets), effectuer les opérations XOR avec les masques ipad et opad, et calculer les deux passes de hachage.',
    'Dimensionnement probabiliste face aux collisions : calculer le seuil du paradoxe des anniversaires $k \\approx 1.1774 \\cdot 2^{b/2}$ pour garantir une marge de sécurité de plus de 128 bits effectifs.'
  ],
  summary: [
    'Une fonction de hachage cryptographique doit garantir la résistance à la préimage ($2^n$), à la seconde préimage ($2^n$) et aux collisions ($2^{n/2}$).',
    'L\'effet d\'avalanche assure qu\'une modification d\'un bit d\'entrée bouleverse environ la moitié des bits de l\'empreinte finale.',
    'MD5 et SHA-1 sont formellement obsolètes et dépréciés suite à des attaques par collision pratiques ; SHA-256 et SHA-3 sont les standards actuels.',
    'La construction naïve H(K || M) est vulnérable aux attaques par extension de longueur sur Merkle-Damgård ; HMAC (RFC 2104) immunise le système par une construction à double passe.',
    'Le paradoxe des anniversaires réduit la complexité de recherche d\'une collision à $2^{b/2}$, imposant des condensés d\'au moins 256 bits pour un niveau de sécurité de 128 bits.'
  ],
  checklist: [
    'Savez-vous définir et différencier les 3 propriétés de résistance : préimage, seconde préimage et collision ?',
    'Pouvez-vous expliquer pourquoi la construction H(K || M) est dangereuse et comment HMAC résout cette vulnérabilité ?',
    'Savez-vous citer les constantes et les étapes du calcul d\'un HMAC selon la RFC 2104 (ipad 0x36, opad 0x5c, bloc 64 octets) ?',
    'Comprenez-vous la formule du paradoxe des anniversaires et pourquoi un hachage de 128 bits n\'offre que 64 bits de sécurité contre les collisions ?',
    'Pouvez-vous justifier le rejet catégorique de MD5 et SHA-1 dans une revue de sécurité applicative ?'
  ],
  notions: [
    { term: 'Fonction de Hachage à Sens Unique', def: 'Algorithme déterministe condensant un message arbitraire en une empreinte de taille fixe, irréversible et sensible au moindre bit.' },
    { term: 'Résistance aux Collisions', def: 'Propriété garantissant qu\'il est calculatoirement impossible de trouver deux entrées distinctes produisant le même condensé de sortie.' },
    { term: 'Construction de Merkle-Damgård', def: 'Méthode de hachage itérative découpant le message en blocs successifs traités par une fonction de compression avec vecteur d\'initialisation.' },
    { term: 'HMAC (Hash-based Message Authentication Code)', def: 'Mécanisme d\'authentification cryptographique combinant une clé secrète partagée et une fonction de hachage selon la RFC 2104.' },
    { term: 'Paradoxe des Anniversaires', def: 'Théorème probabiliste démontrant qu\'une collision survient avec une probabilité de 50% après environ sqrt(N) tirages dans un espace de taille N.' }
  ],
  pitfalls: [
    'Utiliser MD5 pour vérifier l\'intégrité de binaires sensibles ou signer des jetons d\'authentification en supposant que l\'absence de collision fortuite suffit.',
    'Concaténer naïvement clé et message sous la forme H(cle + message) : les fonctions basées sur Merkle-Damgård permettent des attaques par extension de longueur.',
    'Confondre contrôle d\'intégrité simple (hachage) et authenticité d\'origine (HMAC ou signature) : un attaquant Man-in-the-Middle peut réécrire un hachage sans clé.',
    'Négliger le paradoxe des anniversaires en utilisant un hachage tronqué à 32 ou 48 bits, rendant les collisions facilement atteignables par force brute.'
  ],
  questions: [
    {
      stem: 'Quelle est la complexité théorique pour trouver une collision sur une fonction de hachage idéale produisant un condensé de n bits ?',
      opts: ['2^n opérations', '2^(n/2) opérations', 'n^2 opérations', '2^(2n) opérations'],
      correct: 1,
      exp: 'En vertu du paradoxe des anniversaires, la recherche d\'une collision quelconque nécessite environ sqrt(2^n) = 2^(n/2) opérations, contre 2^n pour inverser une préimage.'
    },
    {
      stem: 'Pourquoi la construction naïve H(K || M) est-elle vulnérable sur des fonctions comme SHA-256 ?',
      opts: ['Elle permet de retrouver la clé K par simple division modulaire', 'La structure de Merkle-Damgård permet d\'ajouter des données sans connaître K (Length Extension Attack)', 'Le hachage produit toujours une chaîne vide', 'Elle déclenche une boucle infinie dans l\'interpréteur'],
      correct: 1,
      exp: 'L\'état interne de Merkle-Damgård après le traitement du message correspond directement au condensé de sortie. Un attaquant peut injecter des blocs supplémentaires en reprenant cet état sans connaître la clé secrète K.'
    },
    {
      stem: 'Quelle est la taille de bloc standard et quelles sont les valeurs des masques ipad et opad dans la RFC 2104 pour SHA-256 ?',
      opts: ['Bloc 32 octets, ipad=0x00, opad=0xFF', 'Bloc 64 octets, ipad=0x36, opad=0x5c', 'Bloc 128 octets, ipad=0xAA, opad=0x55', 'Bloc 16 octets, ipad=0x12, opad=0x34'],
      correct: 1,
      exp: 'Pour les fonctions avec blocs de 512 bits (comme SHA-256), la taille de bloc est de 64 octets, ipad vaut l\'octet 0x36 répété 64 fois et opad vaut 0x5c répété 64 fois.'
    },
    {
      stem: 'Quelle attaque a formellement démontré en 2017 la vulnérabilité pratique aux collisions de SHA-1 avec deux documents PDF ayant la même empreinte ?',
      opts: ['L\'attaque Heartbleed', 'L\'attaque POODLE', 'L\'attaque SHAttered', 'L\'attaque WannaCry'],
      correct: 2,
      exp: 'L\'équipe de chercheurs de Google et du CWI a publié en février 2017 l\'attaque SHAttered, produisant deux fichiers PDF différents ayant exactement la même empreinte SHA-1.'
    },
    {
      stem: 'Quelle est la principale différence architecturale entre SHA-2 et SHA-3 (Keccak) ?',
      opts: ['SHA-3 utilise un chiffrement par bloc DES interne', 'SHA-3 repose sur une construction éponge (Sponge Construction) et non sur Merkle-Damgård', 'SHA-3 nécessite obligatoirement une carte graphique GPU', 'SHA-3 est limité à des sorties de 64 bits'],
      correct: 1,
      exp: 'SHA-3 abandonne l\'architecture itérative de Merkle-Damgård au profit d\'une construction éponge (Sponge Construction) à absorption et essorage, immunisée contre les attaques par extension de longueur.'
    }
  ],
  flashcards: [
    {
      q: 'Quelles sont les 3 propriétés de sécurité fondamentales d\'une fonction de hachage cryptographique ?',
      a: '1. Résistance à la préimage (sens unique, 2^n) ; 2. Résistance à la seconde préimage (2^n) ; 3. Résistance aux collisions (2^(n/2)).'
    },
    {
      q: 'Qu\'est-ce que l\'effet d\'avalanche dans une fonction de hachage ?',
      a: 'La propriété selon laquelle la modification d\'un seul bit d\'entrée entraîne la modification d\'environ la moitié des bits de sortie de façon imprévisible.'
    },
    {
      q: 'Pourquoi l\'algorithme MD5 est-il formellement interdit en cryptographie ?',
      a: 'MD5 est brisé face aux collisions depuis 2004 : des collisions pratiques peuvent être générées en quelques millisecondes.'
    },
    {
      q: 'Quelle est la vulnérabilité de la construction naïve H(cle || message) ?',
      a: 'La vulnérabilité aux attaques par extension de longueur (Length Extension Attack) inhérente à l\'architecture Merkle-Damgård.'
    },
    {
      q: 'Comment fonctionne la construction HMAC selon la RFC 2104 ?',
      a: 'HMAC(K, M) = H((K\' ^ opad) || H((K\' ^ ipad) || M)), avec des masques d\'octets ipad (0x36) et opad (0x5c) répétés sur la taille du bloc.'
    },
    {
      q: 'Quelle est l\'implication du paradoxe des anniversaires sur la sécurité d\'un condensé de n bits ?',
      a: 'Une collision peut être découverte en environ 2^(n/2) opérations, ce qui divise par deux la sécurité nominale face aux collisions.'
    }
  ],
  mastery: [
    {
      title: 'Audit et détection d\'algorithmes de hachage dépréciés',
      desc: 'Identifier et éliminer toute utilisation de MD5 ou SHA-1 dans le code source, les certificats et les pipelines de déploiement.'
    },
    {
      title: 'Vérification d\'intégrité automatisée de manière méthodique',
      desc: 'Développer des outils d\'empreinte cryptographique capables de certifier l\'intégrité de jeux de données et de binaires.'
    },
    {
      title: 'Implémentation conforme du protocole HMAC RFC 2104',
      desc: 'Concevoir et valider des mécanismes d\'authentification de messages et de tokens API sécurisés avec clés partagées.'
    },
    {
      title: 'Simulation et analyse de résistance aux collisions',
      desc: 'Modéliser le paradoxe des anniversaires pour dimensionner rigoureusement les longueurs d\'empreintes selon les exigences de sécurité.'
    },
    {
      title: 'Transition vers SHA-3 et les constructions éponges',
      desc: 'Intégrer les nouvelles primitives cryptographiques FIPS 202 dans les architectures logicielles de nouvelle génération.'
    }
  ]
};
