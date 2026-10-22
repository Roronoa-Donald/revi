/**
 * Pages « examens » et « exercices » du cours « Cryptographie & PKI B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Cryptographie &amp; PKI B3</h1>',
    '  <p class="lead">Deux épreuves académiques complètes d’ingénierie cryptographique conformes au programme Bachelor 3 et aux standards industriels de sécurité (RFC IETF, NIST FIPS, ANSSI) : principes fondamentaux, cryptographie symétrique et asymétrique, intégrité HMAC, architecture PKI X.509, protocoles TLS 1.3 et transition post-quantique.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Principes, Chiffrements Symétriques &amp; Fonctions de Hachage', [
      '<h4>Partie 1 : Fondements Cryptographiques &amp; Chiffres Historiques (6 points)</h4>',
      '<ol>',
      '  <li>Énoncez le principe de Kerckhoffs. Pourquoi l\'approche de la « sécurité par l\'obscurité » est-elle considérée comme un anti-patron critique en ingénierie de sécurité ? (3 pts)</li>',
      '  <li>Démontrez pourquoi le chiffre de César et la substitution monoalphabétique échouent face à une analyse statistique fréquentielle. Définissez l\'Indice de Coïncidence de Friedman et donnez sa valeur typique pour un texte en français vs un texte aléatoire. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Cryptographie Symétrique Moderne (AES &amp; Modes Opératoires) (7 points)</h4>',
      '<ol>',
      '  <li>Distinguez le fonctionnement d\'un chiffrement par flux (LFSR, ChaCha20) d\'un chiffrement par bloc (AES). Expliquez pourquoi le mode opératoire ECB (Electronic Codebook) est formellement interdit pour le chiffrement de données structurées ou d\'images. (4 pts)</li>',
      '  <li>En mode CBC (Cipher Block Chaining), comment le vecteur d\'initialisation (IV) est-il utilisé lors du chiffrement du premier bloc ? Décrivez la vulnérabilité d\'attaque par oracle de bourrage (Padding Oracle Attack) sur une implémentation CBC mal protégée utilisant le bourrage PKCS#7. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Fonctions de Hachage, MAC &amp; Paradoxe des Anniversaires (7 points)</h4>',
      '<ol>',
      '  <li>Comparez les algorithmes d\'empreinte MD5, SHA-1 et SHA-256. Quelles attaques ont démontré la caducité pratique de MD5 et SHA-1 ? Pourquoi le passage à SHA-256 ou SHA-3 est-il obligatoire ? (4 pts)</li>',
      '  <li>Expliquez le mécanisme du paradoxe des anniversaires. Pour une fonction de hachage produisant des condensés de n bits, combien d\'essais en moyenne sont nécessaires pour trouver une collision ? Pourquoi la construction HMAC (RFC 2104) est-elle supérieure à une simple concaténation H(K || M) ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Principe de Kerckhoffs (3 pts) :</strong> ' +
      '  Énoncé en 1883 par Auguste Kerckhoffs : « La sécurité d\'un cryptosystème ne doit pas reposer sur le secret de l\'algorithme, mais uniquement sur le secret de la clé. » ' +
      '  La sécurité par l\'obscurité est vouée à l\'échec car dès qu\'un binaire ou un équipement est rétro-conçu (reverse engineering) ou fuité, toute l\'infrastructure s\'effondre instantanément. À l\'inverse, les algorithmes publics (AES, RSA, SHA-256) sont soumis à des décennies de cryptanalyse mondiale par les chercheurs sans révéler de faille mathématique.</li>',
      '  <li><strong>Analyse Fréquentielle &amp; Indice de Coïncidence (3 pts) :</strong> ' +
      '  Dans une substitution monoalphabétique, la bijection entre chaque lettre claire et chaque lettre chiffrée préserve la distribution de probabilité de la langue source (en français, la lettre E apparaît à environ 17.5%, suivie de A, S, I, T). ' +
      '  L\'Indice de Coïncidence (IC) de William Friedman mesure la probabilité que deux lettres tirées au hasard dans un texte soient identiques : <code>IC = sum(f_i * (f_i - 1)) / (N * (N - 1))</code>. Pour le français, IC ≈ 0.0778 ; pour un texte aléatoire ou polyalphabétique aplati, IC ≈ 0.0385 (1/26).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Chiffrement par flux vs bloc &amp; faiblesse ECB (4 pts) :</strong> ' +
      '  Un chiffrement par flux génère un pseudo-aléa continu (keystream) appliqué bit à bit ou octet par octet par XOR sur le flux de données en temps réel, sans nécessiter de mémoire tampon. Un chiffrement par bloc traite des blocs de données fixes (128 bits pour AES) à l\'aide de permutations et substitutions par rondes. ' +
      '  En mode ECB (Electronic Codebook), chaque bloc est chiffré indépendamment : deux blocs clairs identiques produisent exactement le même bloc chiffré. Cette absence de diffusion révèle la structure et les motifs des données (le célèbre exemple du pingouin Tux chiffré en ECB reste parfaitement reconnaissable).</li>',
      '  <li><strong>Vecteur d\'initialisation CBC &amp; Oracle de Padding (3 pts) :</strong> ' +
      '  En mode CBC, le premier bloc clair subit un XOR avec le vecteur d\'initialisation (IV) : <code>C_0 = E_K(P_0 ^ IV)</code>, puis <code>C_i = E_K(P_i ^ C_{i-1})</code>. L\'IV garantit que deux messages identiques n\'auront pas le même ciphertext. ' +
      '  L\'attaque par oracle de bourrage (Vaudenay 2002) exploite un serveur qui renvoie un message d\'erreur distinct lorsqu\'un déchiffrement échoue sur le padding PKCS#7 par rapport à une erreur applicative. En modifiant astucieusement le bloc précédent et en observant la réponse d\'erreur du serveur, l\'attaquant déduit un par un les octets clairs sans connaître la clé secrète.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Évolution des fonctions de hachage (4 pts) :</strong> ' +
      '  MD5 (128 bits) a été cassé par Xiaoyun Wang en 2004 (collisions générées en quelques minutes, puis secondes). SHA-1 (160 bits) a été officiellement brisé par l\'attaque SHAttered en 2017 par le CWI et Google (production de deux fichiers PDF distincts ayant la même empreinte SHA-1). ' +
      '  SHA-256 (famille SHA-2) offre 256 bits d\'empreinte (résistance aux collisions de 2^{128} opérations, inatteignable par force brute classique). SHA-3 (Keccak) repose sur une architecture en éponge totalement différente, offrant une alternative mathématique sécurisée en cas de découverte théorique imprévue sur la construction Merkle-Damgård.</li>',
      '  <li><strong>Paradoxe des anniversaires &amp; HMAC (3 pts) :</strong> ' +
      '  Le paradoxe des anniversaires démontre que la probabilité de trouver une collision (deux entrées distinctes quelconques ayant la même empreinte) dépasse 50% dès que le nombre de tirages atteint environ la racine carrée de l\'espace des valeurs possibles : <code>k ≈ sqrt(2 * ln(2) * 2^n) ≈ 1.177 * 2^{n/2}</code>. Pour une fonction de 128 bits, 2^{64} essais suffisent pour une collision (contre 2^{128} pour une préimage). ' +
      '  La construction HMAC (RFC 2104) applique deux passes de hachage avec masquage de clé (ipad = 0x36, opad = 0x5C) : <code>H((K ^ opad) || H((K ^ ipad) || M))</code>. Cette structure empêche les attaques par extension de longueur (length-extension attacks) qui permettent à un attaquant d\'ajouter des données valides à un message sans connaître la clé secrète dans un schéma naif H(K || M).</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l\'Examen Terminal — Asymétrique, PKI X.509, Protocoles TLS 1.3 &amp; Post-Quantique', [
      '<h4>Partie 1 : Arithmétique Modulaire &amp; Cryptosystème RSA (6 points)</h4>',
      '<ol>',
      '  <li>Soient les nombres premiers p = 61 et q = 53. Calculez le modulus RSA n et l\'indicatrice d\'Euler phi(n). Vérifiez que l\'exposant public e = 17 est valide. Déterminez l\'exposant privé d à l\'aide de l\'algorithme d\'Euclide étendu. (4 pts)</li>',
      '  <li>Expliquez pourquoi le chiffrement RSA pur sans bourrage (RSA Textbook) est dangereux et vulnérable aux attaques par malléabilité multiplicative. Quel standard de bourrage asymétrique est obligatoire en production (ex: RSA-OAEP / RSA-PSS) ? (2 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Architecture PKI, Certificats X.509 &amp; Révocation (7 points)</h4>',
      '<ol>',
      '  <li>Décrivez les différents acteurs d\'une Infrastructure à Clés Publiques (Autorité de Certification Racine, Autorité Intermédiaire, Autorité d\'Enregistrement). Pourquoi conserve-t-on la racine (Root CA) hors ligne (Offline Root) ? (3 pts)</li>',
      '  <li>Expliquez le processus complet de validation d\'un certificat serveur X.509 par un navigateur web (champs contrôlés, chaîne de certification, Subject Alternative Name). Comparez les mécanismes de révocation CRL et OCSP, et expliquez l\'intérêt de l\'OCSP Stapling pour la confidentialité et les performances. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Protocoles Sécurisés TLS 1.3 &amp; Révolution Post-Quantique (7 points)</h4>',
      '<ol>',
      '  <li>Quelles améliorations architecturales majeures distinguent le protocole TLS 1.3 (RFC 8446) de TLS 1.2 ? Expliquez en détail comment la confidentialité persistante (Perfect Forward Secrecy - PFS) est garantie via l\'échange Diffie-Hellman éphémère (ECDHE). (4 pts)</li>',
      '  <li>L\'émergence future d\'ordinateurs quantiques à grande échelle menace la sécurité cryptographique mondiale. Expliquez les impacts respectifs de l\'algorithme de Shor sur la cryptographie asymétrique (RSA, ECC) et de l\'algorithme de Grover sur la cryptographie symétrique (AES, hachage). Quels sont les nouveaux standards post-quantiques (PQC) officialisés par le NIST en 2024 (FIPS 203 et 204) ? (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l\'Examen Terminal', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Calcul RSA complet (4 pts) :</strong> ' +
      '  - Modulus : <code>n = p * q = 61 * 53 = 3233</code>. ' +
      '  - Indicatrice d\'Euler : <code>phi(n) = (p - 1) * (q - 1) = 60 * 52 = 3120</code>. ' +
      '  - Validité de e : <code>pgcd(17, 3120) = 1</code> car 3120 = 183 * 17 + 9 ; 17 = 1 * 9 + 8 ; 9 = 1 * 8 + 1 ; 8 = 8 * 1 + 0. Donc 17 est bien premier avec phi(n). ' +
      '  - Exposant privé d : <code>d = e^{-1} mod phi(n)</code>. Euclide étendu remonte la relation : 1 = 9 - 8 = 9 - (17 - 9) = 2 * 9 - 17 = 2 * (3120 - 183 * 17) - 17 = 2 * 3120 - 367 * 17. ' +
      '  D\'où <code>-367 * 17 = 1 mod 3120</code>. Normalisé dans [0, 3119] : <code>d = 3120 - 367 = 2753</code>. Vérification : (17 * 2753) mod 3120 = 46801 mod 3120 = 1.</li>',
      '  <li><strong>RSA Textbook &amp; Bourrage OAEP (2 pts) :</strong> ' +
      '  RSA naïf est homomorphe : <code>E(m1) * E(m2) = m1^e * m2^e = (m1 * m2)^e = E(m1 * m2) mod n</code>. Un attaquant peut manipuler le chiffré sans le déchiffrer. De plus, pour des petits messages ou petits exposants, des attaques par racine ou dictionnaires sont possibles. ' +
      '  Le standard RSA-OAEP (Optimal Asymmetric Encryption Padding) pour le chiffrement et RSA-PSS pour la signature ajoutent de l\'aléa cryptographique et masquent la structure algébrique, rendant le cryptosystème IND-CCA2 (sécurisé contre les attaques par texte chiffré choisi).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Architecture PKI &amp; Offline Root (3 pts) :</strong> ' +
      '  L\'Autorité de Certification (AC) racine signe les certificats des AC intermédiaires. L\'Autorité d\'Enregistrement (AE) valide l\'identité des demandeurs (vérification juridique, validation DNS). Les AC intermédiaires émettent les certificats d\'extrémité (Leaf/End-Entity). ' +
      '  Conserver la Root CA hors ligne (non connectée au réseau, enfermée dans un coffre physique, démarrée uniquement pour signer de nouvelles AC intermédiaires) est une exigence vitale : si la clé privée racine était compromise, l\'ensemble des certificats émis par toute la chaîne serait irrévocablement compromis, nécessitant une réinstallation manuelle des magasins de confiance de tous les clients mondiaux.</li>',
      '  <li><strong>Validation X.509, CRL &amp; OCSP Stapling (4 pts) :</strong> ' +
      '  Validation par le navigateur : ' +
      '  1. Vérification de la période de validité (Not Before <= date actuelle <= Not After). ' +
      '  2. Contrôle du nom de domaine FQDN face à l\'extension Subject Alternative Name (SAN). ' +
      '  3. Vérification cryptographique de la signature numérique du certificat par la clé publique de l\'émetteur, et récursion jusqu\'à une Root CA présente dans le magasin de confiance local (Trust Store). ' +
      '  4. Contrôle de révocation : la CRL (Certificate Revocation List) est un fichier périodique volumineux lourd à télécharger ; OCSP (Online Certificate Status Protocol) interroge le répondeur de l\'AC en temps réel mais pose un problème de vie privée (l\'AC sait quel site le client visite) et de latence réseau. ' +
      '  L\'OCSP Stapling résout ces problèmes : le serveur web interroge lui-même périodiquement l\'AC et « agrafe » la preuve OCSP signée par l\'AC directement dans la poignée de mains TLS, évitant toute requête sortante du client.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Évolution TLS 1.3 &amp; Perfect Forward Secrecy (4 pts) :</strong> ' +
      '  TLS 1.3 (RFC 8446) apporte des ruptures majeures : ' +
      '  - Réduction de la latence de poignée de mains de 2-RTT à 1-RTT (et mode 0-RTT Early Data pour les reprises). ' +
      '  - Suppression totale des algorithmes faibles ou obsolètes : suppression du RSA statique, de RC4, de 3DES, de SHA-1 et des modes CBC (seuls les chiffrements authentifiés AEAD sont autorisés : AES-GCM, ChaCha20-Poly1305). ' +
      '  - Confidentialité persistante obligatoire (PFS) : l\'échange de clés utilise obligatoirement Diffie-Hellman éphémère (DHE ou ECDHE sur x25519/secp256r1). À chaque connexion, de nouvelles clés privées éphémères a et b sont générées puis détruites. Même si la clé privée long terme du certificat serveur est dérobée ultérieurement, il est impossible de déchiffrer les sessions passées enregistrées par un espion.</li>',
      '  <li><strong>Menaces Quantiques &amp; Standards NIST PQC (3 pts) :</strong> ' +
      '  - Algorithme de Shor (1994) : résout la factorisation des entiers et le logarithme discret en temps polynomial O(log^3 n). Conséquence : RSA, Diffie-Hellman, DSA, ECDH et ECDSA sont totalement détruits par un ordinateur quantique universel. ' +
      '  - Algorithme de Grover (1996) : accélère la recherche en espace non structuré en O(sqrt(N)). Conséquence : la sécurité effective des clés symétriques est divisée par 2. AES-128 ne fournit plus que 64 bits de sécurité (insuffisant), tandis qu\'AES-256 conserve 128 bits de sécurité post-quantique, ce qui reste infranchissable. ' +
      '  - Nouveaux standards NIST (août 2024) : ' +
      '    1. <strong>ML-KEM (FIPS 203)</strong>, basé sur CRYSTALS-Kyber (réseaux euclidiens / Module Learning with Errors), pour l\'encapsulation et l\'échange de clés. ' +
      '    2. <strong>ML-DSA (FIPS 204)</strong>, basé sur CRYSTALS-Dilithium, pour les signatures numériques post-quantiques. ' +
      '    3. <strong>SLH-DSA (FIPS 205)</strong>, basé sur SPHINCS+ (signatures sans état basées sur le hachage).</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento' }, { href: 'exercices.html', label: 'Voir le catalogue des 18 exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs corrigés de Cryptographie & PKI B3 : Contrôle Continu et Examen Terminal détaillés.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Répertoire des Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices de code lab' }
  ]);

  const itemsHtml = chapterList.map(ch => {
    const list = ch.exercises || [];
    const rows = list.map(ex => [
      '    <li class="exercise-item">',
      '      <div class="exercise-item__meta">',
      '        <span class="badge badge--' + ex.level + '">' + (ex.level === 'n1' ? 'N1 · Acquisition' : ex.level === 'n2' ? 'N2 · Application' : 'N3 · Raisonnement') + '</span>',
      '        <code class="exercise-item__id">' + ex.id + '</code>',
      '      </div>',
      '      <h4 class="exercise-item__title"><a href="chapitre' + ch.n + '.html#' + ex.id + '">' + ex.title + '</a></h4>',
      '      <p class="exercise-item__goal">' + ex.goal + '</p>',
      '    </li>'
    ].join('\n')).join('\n');

    return [
      '  <section class="exercise-group">',
      '    <h3>Module ' + ch.n + ' — ' + ch.title + '</h3>',
      '    <ul class="exercise-list">' + rows + '</ul>',
      '  </section>'
    ].join('\n');
  }).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Répertoire des Exercices de Programmation &amp; Code Labs — ' + course.brand + '</h1>',
    '  <p class="lead">18 études de cas pratiques et méthodologiques intégrés au cours, avec exécution directe et tests automatisés : de la cryptanalyse historique aux signatures numériques et protocoles post-quantiques.</p>',
    '',
    itemsHtml,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens blancs' }, { href: 'chapitre1.html', label: 'Commencer par le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Exercices — ' + course.brand,
      description: 'Catalogue des 18 exercices pratiques de programmation de manière méthodique du cours Cryptographie & PKI B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
