# Lot 2 — tranche cryptographie

Date de vérification : **30 octobre 2026**. Travail limité à la copie isolée `crypto` ; `corrections/suivi.csv` et `.taskstate` ne sont pas modifiés. Les références ci-dessous ont été consultées à cette date ; les dates de publication sont indiquées séparément.

## F53 — services d'ESP

- **Correction.** Le cours, la fiche, le glossaire et l'explication du QCM distinguent confidentialité seule, intégrité seule avec authentification de l'origine, et combinaison des deux, selon l'association de sécurité. La RFC exige au moins l'un de ces services.
- **Source officielle.** [RFC 4303, IP Encapsulating Security Payload](https://www.rfc-editor.org/rfc/rfc4303.html), décembre 2005, sections 1 et 3.3.2. Le service de confidentialité seule peut ne pas être proposé par une implémentation ; l'anti-rejeu dépend de l'intégrité.
- **Test.** `F53 : les propriétés ESP dépendent de l’association de sécurité` vérifie le contenu source, la carte, le QCM et les pages générées `cartes.html` et `chapitre6.html`.
- **Limite.** Aucun tunnel ni association de sécurité IPsec réel n'est configuré ou testé. La présence d'ESP ne suffit pas à conclure que ces services sont tous activés.

## F184 — identité TLS et validation de certificat

- **Correction.** Pour un nom DNS de service, le modèle utilise les `dNSName` du SAN et ignore le CN. Un SAN absent est représenté par `san=-` ; un CN correspondant ne le remplace pas. Une correspondance et des dates valables ne donnent que `STATUS=PARTIAL`. Le contrôle séparé de chaîne et de liste fictive donne également un résultat partiel ; ses diagnostics, même négatifs, ne certifient pas le statut d'un vrai certificat.
- **Sources officielles.** [RFC 9525, Service Identity in TLS](https://www.rfc-editor.org/rfc/rfc9525.html), novembre 2023, sections 3 et 6 ; [RFC 5280, X.509 PKI](https://www.rfc-editor.org/rfc/rfc5280.html), mai 2008, section 6. La première exclut le CN comme identifiant du service et encadre le wildcard ; la seconde décrit notamment la validation du chemin et l'ancre de confiance.
- **Tests.** Les deux tests `F184` vérifient les sept cas du contrôle DNS/dates, dont SAN absent, SAN différent et wildcards, ainsi que les cinq cas de chaîne fictive. Ils vérifient le rejet d'une réponse qui se dirait pleinement valide, la casse DNS et les limites du wildcard.
- **Limite.** Les exercices ne vérifient ni signatures, ni ancre cryptographique, ni contraintes et usages complets, ni fraîcheur et authenticité d'une CRL ou réponse OCSP. Ils ne traitent pas les identifiants IP, SRV ou URI, ni l'ensemble des règles IDN. La racine auto-émise et les diagnostics négatifs sont des conventions du modèle, pas des critères suffisants pour une PKI réelle.

## F186 — masque jetable et confidentialité parfaite

- **Correction.** Les supports présentent comme hypothèses une clé secrète, uniformément aléatoire, indépendante du message, assez longue et non réutilisée. L'exercice ne compare que des longueurs et un indicateur de réemploi **déclarés** : il ne contrôle ni une clé réelle ni son historique, et son résultat positif ne dit pas que la confidentialité parfaite est établie.
- **Sources.** [RFC 4086, Randomness Requirements for Security](https://www.rfc-editor.org/rfc/rfc4086.html), juin 2005, pour l'aléa et le volume de clé ; [NIST IR 8459](https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8459.pdf), septembre 2024, page 9, pour l'analogie entre réutilisation d'un masque et réutilisation en mode CTR. Pour la propriété mathématique elle-même : C. Shannon, [Communication Theory of Secrecy Systems](https://www.cs.virginia.edu/~evans/greatworks/shannon1949.pdf), octobre 1949, section sur le secret parfait. Le rapport NIST ne constitue pas à lui seul une démonstration de toutes les hypothèses du masque jetable.
- **Test.** `F186 : longueur et usage unique ne prouvent pas le secret parfait` compare les quatre cas à un oracle, refuse le verdict « secret parfait atteint » et constate qu'un masque de zéros laisse le texte inchangé sous XOR.
- **Limite.** Le contre-exemple illustre une insuffisance ; il ne mesure ni l'entropie, ni l'indépendance, ni le secret d'une clé réelle, et ne démontre pas la sécurité d'une implémentation.

## F187 — données anticipées et dérivation TLS

- **Correction.** Les données 0-RTT n'ont pas de confidentialité persistante garantie par le protocole et peuvent être rejouées. Les données 1-RTT et le mode PSK seul sont distingués d'un échange éphémère. Le hachage de données publiques est nommé `demo_id`, sans être présenté comme une clé, un secret ni le calendrier de clés TLS ; le titre décrit une analyse illustrative.
- **Source officielle.** [RFC 9846, TLS 1.3](https://www.rfc-editor.org/rfc/rfc9846.html), juillet 2026, sections 2.3, 4.3.9, 7.1 et 8.1 : traitement de 0-RTT, modes PSK, dérivation HKDF et possibilité de protections supplémentaires par gestion et effacement des PSK côté serveur.
- **Test.** `F187 : les données 0-RTT et la dérivation TLS sont distinguées du calcul jouet` contrôle sept cas, notamment 0-RTT, PSK seul, PSK avec échange éphémère, RSA statique en TLS 1.2 et groupe non pris en charge. Les empreintes de démonstration sont recalculées et plusieurs réponses excessives sont rejetées par le correcteur local.
- **Limite.** Aucun handshake réel, échange de clés, secret TLS, effacement de secrets, authentification des pairs ni protection anti-rejeu n'est testé. Le résultat `pfs=NO` pour PSK seul décrit l'échange dans ce modèle ; il ne conclut pas sur d'éventuelles mesures supplémentaires de gestion et de suppression des PSK.

## F188 — suite TLS et paramètres négociés

- **Correction.** La suite TLS 1.3 ne détermine ni mode d'échange, ni groupe, ni phase. Le modèle demande ces informations ; une réponse reste `UNKNOWN` si elles manquent, et les cas d'échange éphémère donnent une PFS conditionnelle plutôt qu'une certification de sécurité. Les cas TLS 1.2 supposent explicitement cette version : un nom de suite ne suffit pas à la prouver.
- **Source officielle.** [RFC 9846](https://www.rfc-editor.org/rfc/rfc9846.html), juillet 2026, sections 4.2.1, 4.3.9 et 7.1 : suite, groupe et authentification sont négociés séparément, avec des modes PSK distincts.
- **Test.** `F188 : une suite TLS 1.3 ne détermine ni le mode ni la PFS` contrôle sept cas, dont suite seule, PSK seul, PSK avec échange éphémère en 0-RTT et en 1-RTT, et handshake initial sans PSK. Un cas partiellement renseigné reste inconnu et les réponses affirmant une PFS inconditionnelle sont rejetées.
- **Limite.** `dhe` est un raccourci pédagogique pour l'échange sans PSK, pas une valeur de `psk_key_exchange_modes`. Le modèle ne valide pas une négociation réelle ni les propriétés de tous les groupes et algorithmes. `PARAMETERS_ONLY` n'est pas un audit de sécurité.

## F193 — signature RSA jouet

- **Correction.** La signature RSA brute avec petit module est explicitement pédagogique. L'égalité des valeurs réduites n'établit ni authenticité ni absence d'altération ; le cours oriente la pratique vers une bibliothèque fiable et un schéma standard tel que RSA-PSS.
- **Sources officielles.** [RFC 8017, PKCS #1 v2.2](https://www.rfc-editor.org/rfc/rfc8017.html), novembre 2016, section 8.1 ; [NIST FIPS 186-5](https://csrc.nist.gov/pubs/fips/186-5/final), 3 février 2023, section 5.4, qui précise également des contraintes de mise en œuvre de RSASSA-PSS.
- **Test.** `F193 : le RSA jouet ne prouve pas authenticité et intégrité` calcule deux empreintes SHA-256 distinctes ayant la même réduction modulo le petit module ; la même signature jouet vérifie les deux messages. Il contrôle aussi la borne de la signature et rejette un verdict d'authenticité.
- **Limite.** Cette collision est un contre-exemple du modèle jouet, pas une attaque contre RSA-PSS ou SHA-256. Aucun test ne certifie la sécurité d'une bibliothèque, de ses paramètres, de ses clés ou de son implémentation.

## F195 — référence TLS 1.3 actuelle

- **Correction.** La RFC 8446 reste indiquée comme référence historique d'août 2018 ; la RFC 9846 de juillet 2026 est indiquée comme le document qui la rend obsolète, sans prétendre que toutes les explications historiques sont devenues fausses.
- **Sources officielles.** [RFC 8446](https://www.rfc-editor.org/rfc/rfc8446.html), août 2018 ; [RFC 9846](https://www.rfc-editor.org/rfc/rfc9846.html), juillet 2026, en-tête et résumé.
- **Test.** `F195 : RFC 9846 actuelle et RFC 8446 historique sont datées` vérifie les références et dates dans les sources, le chapitre généré et l'examen.
- **Limite.** Cette vérification porte sur les références et les passages ciblés ; elle ne constitue pas un audit exhaustif de toutes les exigences de la RFC 9846.

## Vérifications exécutées

- À la reprise de la copie partielle : 9 tests ciblés sur 9 réussis, mais `node scripts/generate-courses.js b3-cryptographie --check` signalait trois pages désynchronisées (`chapitre5`, `chapitre6`, `cartes`).
- Les régressions ajoutées ont d'abord mis en évidence les lacunes SAN absent, diagnostic de chaîne, handshake initial et grille servie périmée. Des tests complémentaires ont aussi mis en évidence la généralisation initiale de la PFS en TLS 1.2 et l'absence de précision sur les valeurs OTP déclarées.
- Après correction : `node --test --test-reporter=spec tests/cryptographie-lot2.test.js` réussit **11 tests sur 11**. Les 18 corrigés du cours passent leurs 73 cas déclarés ; les catalogues regroupé et par chapitre concordent, et les pages et projections contrôlées ne livrent ni corrigés ni attendus des exemples d'analyse.
- `node scripts/generate-courses.js b3-cryptographie --check` confirme **13 pages à jour pour un seul cours**. Les seules pages réécrites pendant cette intervention sont `chapitre1.html`, `chapitre5.html`, `chapitre6.html` et `cartes.html`.
- Pas d'installation, de build, de déploiement, de serveur PostgreSQL, de fournisseur externe d'exécution, de navigateur ou de protocole cryptographique réel. Les vérifications d'exercices utilisent le moteur d'analyse local et l'inspection HTML.

## Fichiers modifiés pendant cette intervention

Liste exacte par comparaison des empreintes avec l'état trouvé à l'arrivée dans la copie :

- `b3-cryptographie/chapitres/cartes.html`
- `b3-cryptographie/chapitres/chapitre1.html`
- `b3-cryptographie/chapitres/chapitre5.html`
- `b3-cryptographie/chapitres/chapitre6.html`
- `corrections/rapport-cryptographie-lot2.md`
- `server/exercises/b3-cryptographie.js`
- `server/exercises/b3-cryptographie/chapitre1.js`
- `server/exercises/b3-cryptographie/chapitre5.js`
- `server/exercises/b3-cryptographie/chapitre6.js`
- `tests/cryptographie-lot2.test.js`

## État partiel déjà présent à la reprise

La copie contenait déjà des corrections pertinentes dans `server/content/b3-cryptographie.js`, `server/content/b3-cryptographie/chapitre1.js`, `chapitre5.js`, `chapitre6.js` et `server/content/b3-cryptographie/pages/{accueil,cartes-formules,examens-exercices}.js`. Le journal préexistant `corrections/resultats/cryptographie-lot2-generation-apres.txt` mentionne également une génération antérieure de 11 pages, dont `chapitre2.html`, `chapitre3.html`, `chapitre4.html`, `index.html`, `sommaire.html`, `formules.html` et `examens.html`, non réécrites pendant cette intervention.

Ces éléments sont à considérer pour une éventuelle reprise de la tranche. Aucun état de référence antérieur à l'agent précédent n'est disponible ici : la liste complète des modifications qu'il avait déjà faites ne peut donc pas être certifiée par les empreintes prises à mon arrivée.
