# Réparation K20 (régressions de langue) — rapport vérifié

Branche : `reparation-k20` (à partir de `tour4-lot-d`, `9af8abf`). Tous les chiffres ci-dessous viennent des scripts versionnés dans `audit/tour5/scripts/` et de `tests/language-integrity.test.js` ; rien n'est repris d'un rapport précédent.

## Cause racine des mots coupés (`requêvos`, `êvos`, `boîvos`…)
`scripts/course-kit.js`, fonction de conversion des paliers d'auto-évaluation : `.replace(/\btes\b/g, 'vos')`. En JavaScript, `\b` ne reconnaît que les lettres ASCII : dans « requêtes », « ê » n'est pas une lettre pour `\b`, donc « tes » y était vu comme un mot entier. Corrigé par une fonction `toVousBandText` à frontières Unicode (`(?<![\p{L}\p{N}_-])…(?![\p{L}\p{N}_])`), qui ne convertit plus « cible » (nom) ni « le ton » (nom).

## Ce qui a été réparé
| Défaut | Avant (zip `9af8abf`) | Après |
|---|---|---|
| Mots coupés en « …vos » | 30 occurrences, 19 cours | 0 |
| « Vous » + verbe à la 2e personne du singulier | 12 | 0 |
| `affichezz…` | 6 | 0 |
| « Entrez » à la place de « Entre » (préposition), « Notez obtenue », « Passez-partout », « Gardez-Fous », « Filtrez WMI », « votre de voix » | 16 | 0 |
| `es-vous`, `as-vous`, `qu'as-vous`, `arrête-vous` | 4 | 0 |
| Verbes mal accentués (`possèdez`, `énumèrez`, `gèrez`, `concatènez`) | 4 | 0 |
| Conversions fautives de verbes à la 3e personne en impératif (options de QCM, cellules de tableau, définitions de termes) | ≈ 120 | restaurées au texte d'origine (journal : `repair_k8_log.csv`) |
| « il Indiquez », « Il Analysez », « Il termine par… » (consignes) | 115 (déjà présentes sur `main`, 125 pages) | 0 |
| Mots collés « méthodiquepour / dans / et / pur » (purge K5) | 32 | 0 |
| Textes SQL parlant encore de scripts Bash, « L’page exercices » | 3 | 0 |
| « Associater » | 1 | 0 |
| `3 imes 4` (algo ch. 1), `$n le 30$` (pfSense ch. 1) | 2 | 0 |
| Formules LaTeX à double antislash (affichage cassé, déjà sur `main`) | 34 | 0 |
| Cartes de révision tautologiques (« Qu’est-ce que « X » ? » → « X ») | 1 060 dans le JSON de cartes + ≈ 1 400 insérées dans les sources par K3 | retirées (voir ci-dessous) |

## Cartes de révision générées automatiquement par K3 : retirées
Le fichier `scripts/notions-cards-extra.json` (3 669 cartes) et 1 383 cartes insérées dans `server/content/**` étaient produites par extraction de texte : réponses identiques à la question (1 060), objectifs d'apprentissage à l'infinitif, fragments de navigation (« Portail / Virtualisation B1 Sommaire Ch. 1… »), réponses coupées à 220 caractères (289). Elles satisfaisaient le test « une carte par notion » sans aider à apprendre. Elles sont **retirées** (copie conservée dans `cartes-auto-generees-RETIREES.json`). Le générateur refuse désormais d'émettre une carte tautologique. Conséquence assumée : le critère K3 « au moins une carte par notion » n'est **plus rempli** ; il faut écrire de vraies cartes, cours par cours.

## K2 (notions « à connaître »)
Contrôle `annexe_B.py` : 0 notion perdue par rapport à `main`. Le seul écart signalé est une formule corrigée (« Loi de Little »).

## K12 (prérequis placés avant la notion) — 2 cas traités sur ≈ 44
- `b1-reseaux` ch. 1 : le glossaire AD/LDAP/NAS/SAN/iSCSI ouvrait le chapitre ; il est maintenant dans la section « Poste-à-poste contre client-serveur », où ces services interviennent.
- `b1-linux` ch. 1 : l'initiation au script Bash passe après la présentation du shell et juste avant les exercices.
Les autres encadrés du Lot 3 n'ont pas été vérifiés un par un.

## Vérifications
- `npm test` : 7 382 / 7 382 (dont 14 nouveaux tests de langue : mots coupés, accords après « vous », consignes cassées, formules, cartes tautologiques).
- `courses:check` (832 pages, 64 cours) et `labs:check` (1 250 exercices, 68 cours) : OK.
- Sécurité (K1) : `check-no-local-shell.js` → `canHandle(shell)=false`, `runShell` inexistant.
- Liens internes : 22 028 analysés, 0 mort réel (2 faux positifs dans des exemples de code).
- Vocabulaire : 193 mots nouveaux par rapport à `main` ; aucun suspect (`…vos`, `ezz`).

## Ce qui n'est PAS fait (à dire clairement)
- **K13** : les exercices du chapitre 1 de `b1-sql`, `b1-linux`, `b1-reseaux` exigent encore des compétences enseignées plus tard.
- **K15** : le registre n'est pas uniforme (des impératifs au tutoiement subsistent, par exemple sur `index.html`). Le remplacement automatique n'a **pas** été relancé : voir `k8-conversions-a-relire.csv` (426 conversions à relire par un humain).
- **K3** : pas de carte pour chaque notion (voir plus haut).
- **K18/K5** : textes de sommaire et indices encore parlant de scripts dans d'autres cours « analyse » ; seul le cours SQL B1 a été remis à jour.
- Aucun contenu pédagogique nouveau n'a été écrit dans ce lot.
