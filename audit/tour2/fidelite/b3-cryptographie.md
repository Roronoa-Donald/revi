# Fidélité aux Sources (Mission A) — `b3-cryptographie` (Cryptographie & PKI · B3)

- **Cours** : `b3-cryptographie` (Cryptographie & PKI) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (3 fichiers, 241 pages)** :
- `textes/B3/Semestre II/Cryptographie/ch_crypto.txt` (23 pages, statut `ok`)
- `textes/B3/Semestre II/Cryptographie/PolyCrypto2010.txt` (216 pages, statut `ok`)
- `textes/B3/Semestre II/Cryptographie/TP CDPCryptographie-.txt` (2 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Cours placé au Semestre 2 dans le corpus (`B3/Semestre II/Cryptographie/`) alors que `b3-pfsense` (Semestre 1, Ch. 5) exige déjà ses notions (PKI X.509, CRL, AES-GCM, IKEv2)**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/Semestre II/Cryptographie/ch_crypto.txt#PAGE 1` : *Cryptographie*
- `textes/B3/Semestre II/Cryptographie/ch_crypto.txt#PAGE 4` : *CRYPTOGRAPHIE                                                                   *
- `textes/B3/Semestre II/Cryptographie/ch_crypto.txt#PAGE 7` : *CRYPTOGRAPHIE                                                                   *
- `textes/B3/Semestre II/Cryptographie/ch_crypto.txt#PAGE 10` : *CRYPTOGRAPHIE                                                              3. LA*
- `textes/B3/Semestre II/Cryptographie/ch_crypto.txt#PAGE 13` : *CRYPTOGRAPHIE                                                                   *
- `textes/B3/Semestre II/Cryptographie/ch_crypto.txt#PAGE 16` : *CRYPTOGRAPHIE                                                                   *
- `textes/B3/Semestre II/Cryptographie/PolyCrypto2010.txt#PAGE 1` : *Cryptographie Paris 13*
- `textes/B3/Semestre II/Cryptographie/PolyCrypto2010.txt#PAGE 37` : *36                                  CHAPITRE 4. LES CODES MODERNES*
- **Progression des chapitres sur le site** :
- `b3-cryptographie/chapitres/chapitre1.html` : **Chapitre 1 — Fondements, Principes de Sécurité et Chiffrements Historiques** — 1. Objectifs de la Sécurité, Règle de Kerckhoffs & Types d'Attaques (`L82`), 2. Chiffrements Historiques : Substitution Monoalphabétique (César & Affine) (`L107`), 3. Vigenère, Masque Jetable (OTP) & Analyse Fréquentielle (Friedman) (`L127`), 4. Études de cas & applications pratiques (`L151`)
- `b3-cryptographie/chapitres/chapitre2.html` : **Chapitre 2 — Cryptographie Symétrique Moderne (Chiffrement par Bloc et par Flux)** — 1. Chiffrement par Flux (Stream Ciphers) & Registres à Décalage LFSR (`L82`), 2. Chiffrement par Bloc : Feistel (DES) vs Architecture SPN (AES Rijndael) (`L103`), 3. Modes Opératoires, Bourrage PKCS#7 & Oracle de Padding (`L127`), 4. Études de cas & applications pratiques (`L145`)
- `b3-cryptographie/chapitres/chapitre3.html` : **Chapitre 3 — Fonctions de Hachage, Intégrité et Authentification de Message (MAC)** — 1. Propriétés Fondamentales des Fonctions de Hachage Cryptographiques (`L82`), 2. Architectures de Hachage : Merkle-Damgård vs Construction Éponge (SHA-3) (`L108`), 3. Codes d'Authentification de Message HMAC (RFC 2104) (`L135`), 4. Paradoxe des Anniversaires & Dimensionnement des Condensés (`L159`)
- `b3-cryptographie/chapitres/chapitre4.html` : **Chapitre 4 — Cryptographie Asymétrique & Arithmétique Modulaire** — 1. Arithmétique Modulaire : Euclide Étendu, Bézout & Inverse Modulaire (`L82`), 2. Échange de Clés de Diffie-Hellman (DH) & Attaque de l'Homme du Milieu (`L113`), 3. Le Cryptosystème RSA (Rivest-Shamir-Adleman) (`L148`), 4. Cryptographie sur les Courbes Elliptiques (ECC) (`L178`)
- `b3-cryptographie/chapitres/chapitre5.html` : **Chapitre 5 — Signatures Numériques, PKI & Gestion des Certificats X.509** — 1. Signatures Numériques : RSA Sign & Verify, ECDSA et Ed25519 (`L82`), 2. Infrastructure à Clés Publiques (PKI / IGC) & Hiérarchie de Confiance (`L109`), 3. Format X.509 v3, Encodage ASN.1 & Extensions Critiques (`L128`), 4. Cycle de Vie, Algorithme de Validation & Révocation (CRL / OCSP) (`L159`)
- `b3-cryptographie/chapitres/chapitre6.html` : **Chapitre 6 — Protocoles Cryptographiques Sécurisés (TLS, SSH, IPsec) & Post-Quantique** — 1. Protocole TLS 1.3 (RFC 8446) & Confidentialité Persistante (PFS) (`L82`), 2. Analyse et Durcissement des Suites Cryptographiques (Cipher Suites) (`L104`), 3. Protocoles d'Infrastructure Sécurisés : SSHv2 & IPsec (`L133`), 4. La Menace Quantique & la Cryptographie Post-Quantique (NIST PQC) (`L158`)

## 2. Couverture (Lacunes & Ajouts)
- Riche corpus théorique (`ch_crypto.txt` 23 p., `PolyCrypto2010.txt` 216 p., `crypto.txt` 836 p., `TP CDPCryptographie-.txt` 2 p.). Le Ch. 4 (`b3-cryptographie/chapitres/chapitre4.html:L84`) parachute toutefois l'indicatrice d'Euler $\varphi(n)$ et Bézout sans le rappel progressif d'arithmétique modulaire présent dans `PolyCrypto2010.txt#PAGE 15-32`.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Vigenère
- **Source PDF** : `textes/B3/Semestre II/Cryptographie/ch_crypto.txt#PAGE 1` : «  partie 2. Le chiffrement de Vigenère Vidéo  partie 3. La machine Enigma et les clés secrètes Vidéo  partie 4. La cryptographie à clé publique Vidéo  partie 5. L’arithmétique pour RSA »
- **Site web** : `b3-cryptographie/chapitres/chapitre1.html:L134` : « **Vigenère** : répète une clé alphabétique de longueur »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Masque Jetable (Vernam / One-Time Pad)
- **Source PDF** : `textes/B3/Semestre II/Cryptographie/ch_crypto.txt#PAGE 8` : « eule fois. Ce système appelé "masque jetable" ou chiffrement de Vernam est parfait en théorie, mais sa mise en œuvre n’est pas pratique du tout ! Tout d’abord il faut que la clé soit aus »
- **Site web** : `b3-cryptographie/chapitres/chapitre1.html:L135` : « **Masque Jetable (Vernam / One-Time Pad)** : si la clé a exactement la longueur du message, est issue d'une source purement aléatoire et n'est »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Expliquer mon erreur
- **Source PDF** : `textes/B3/Semestre II/Cryptographie/ch_crypto.txt#PAGE 11` : « iée de ce protocole afin d’en expliquer les étapes élémentaires. Pour changer, nous allons travailler modulo 10. Lorsque l’on travaille par blocs, les additions se font bit par bit. Par exe »
- **Site web** : `b3-cryptographie/chapitres/chapitre1.html:L153` : « **Expliquer mon erreur** : sollicite le tuteur pédagogique pour vous guider dans l’application de la méthodologie sans donner directement la solution. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
