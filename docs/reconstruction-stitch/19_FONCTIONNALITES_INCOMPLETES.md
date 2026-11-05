# 19 — Fonctionnalités incomplètes, incohérentes ou inaccessibles

> Ce document est essentiel pour éviter qu'un outil de reconstruction « complète » ce qui n'existe pas. Chaque point est prouvé par le code ou l'extraction.

## 1. Routes fantômes ou retirées

| Élément | Constat | Preuve |
|---|---|---|
| `/api/activate` | répond **410 Gone** : activation par clé supprimée au profit des comptes | `server/routes/auth.js` |
| `/api/verify-fingerprint` | renvoie toujours `{valid:true}` : la vérification d'empreinte n'est plus effective | `server/routes/auth.js` |
| `/api/fedapay/checkout` | appelée par `_auth/account.html`, **inexistante** côté serveur | comparaison `_auth/` vs `public/account.html` |
| `/api/qcm/*` | existe côté serveur mais **aucune page statique ne l'appelle** | recherche d'appels |
| `/api/courses` | utilisé par la page compte, pas par le portail (catalogue en dur) | `public/js/account.js` |

## 2. Deux versions de la page compte

| Fichier | Servi ? | Prix | Paiement |
|---|---|---|---|
| `_auth/account.html` | **non** (le serveur lit `public/`) | 1 000 F/mois | `/api/fedapay/checkout` (absente) |
| `public/account.html` | **oui** | 5 000 F/mois et 45 000 F/an | widget `checkout.js`, `/api/fedapay/attempt` + `/callback` |

C'est la divergence la plus dangereuse pour une reconstruction : partir de `_auth/account.html` produirait un écran au mauvais tarif et un paiement cassé.

## 3. Incohérences de comptage

| Emplacement | Affichage |
|---|---|
| Page de connexion (cartes de niveau) | B1 24 cours, B2 48, B3 71 |
| Portail (onglets) | 23, 24, 23, total 70 |
| Registre `COURSES` | 71 entrées, dont 1 archivée |
| `b1-vb-excel` | présent dans l'API, absent du portail |

Les nombres de la connexion sont cumulatifs (B2 = B1+B2), ceux du portail sont par niveau. Aucun des deux n'est faux, mais ils ne racontent pas la même chose.

## 4. Cours cassé

`b1-vb-excel` (archivé) :

- une seule page `b1-vb-excel/index.html` ;
- aucune carte au portail ;
- présent dans `GET /api/courses` → apparaît dans le sélecteur de la page compte ;
- liens internes vers sommaire/chapitres inexistants → 404.

## 5. Exercices suspendus

- **354 blocs** portent `data-grading-suspended="1"` sur **122 pages** de **21 cours**.
- La validation est désactivée, un avis l'explique ; l'énoncé, l'exemple et le code de départ restent.
- Ce n'est pas un bug d'affichage : c'est une suspension volontaire de la notation en attente de certification des tests.
- Un outil de reconstruction doit rendre l'état « suspendu » et non un bouton actif.

## 6. Emoji résiduels

La règle produit interdit les emoji. 110 pages en contiennent encore, dont **3 servies** :

| Page | Nombre |
|---|---|
| `sql/simulateur-examen.html` | 8 |
| `uml/chapitres/cartes.html` | 1 |
| `uml/chapitres/chapitre3.html` | 2 |

Les 107 autres sont dans des dossiers non servis (`b1/`, `roadmap/`, archives).

## 7. Build et déploiement

| Constat | Conséquence |
|---|---|
| `epreuves/` absent de `COURSE_DIRS` du build | la page des annales **n'existe pas** dans `dist/` (Vercel), elle n'est servie qu'en local/Render |
| `roadmap/` présent dans le build mais hors registre | dossier servi sans carte, accessible par URL |
| Dossiers legacy `b1/`, `droitb2/`, `cours windows/`, `administration machine virtuel/` | non servis comme cours, mais présents sur disque |
| `_auth/` | non servi ; les pages réelles sont dans `public/` |

## 8. Duplication des pages d'authentification

`_auth/*` et `public/*` contiennent des copies divergentes. Seules les secondes sont servies. Toute reconstruction doit ignorer `_auth/` comme source visuelle, sauf pour comprendre l'historique.

## 9. Fonctionnalités esquissées mais non branchées

| Élément | État |
|---|---|
| Examen sécurisé côté serveur (`/api/qcm`) | API complète, UI statique non branchée |
| Vérification d'empreinte | neutralisée (`true`) |
| Activation par clé | retirée (410) |
| Paiement dans `_auth/account.html` | route absente |
| Formules annuelles | présentes dans la page servie, absentes de l'ancienne |
| Compteurs de la connexion | cumulatifs, non alignés sur le portail |

## 10. Absences produit (ne pas inventer)

- Pas de page « profil » modifiable.
- Pas de page « mentions légales », « CGU », « confidentialité ».
- Pas de FAQ, blog, contact (hors WhatsApp du chat).
- Pas de notifications.
- Pas de gestion multi-utilisateurs d'un même compte.
- Pas de export de progression.
- Pas de certificat téléchargeable.
- Pas de forum ni de commentaires.
- Pas de recherche globale hors portail.
- Pas d'application mobile ni de PWA (pas de manifeste détecté).

## 11. Dette technique visible dans l'interface

| Symptôme | Cause |
|---|---|
| Certains boutons sans effet | pages legacy non servies |
| Numérotation de chapitres parfois décalée | cours sans lab, générateur qui préserve la numérotation |
| Styles hétérogènes entre cours | cours générés vs cours écrits à la main |
| Liens `preparation-cheatsheet.html` etc. | pages annexes à vérifier (présentes à la racine) |
| Textes sans accents dans Preparation Web | contenus saisis sans accents (« bloquee », « apparait ») |

## 12. Ce qu'un reconstruireur doit faire

1. Utiliser `public/` et non `_auth/` pour l'authentification.
2. Reproduire l'état « suspendu » des labs.
3. Ne pas créer de page pour les routes 410/absentes.
4. Afficher les compteurs du portail (23/24/23/70), pas ceux de la connexion.
5. Ne pas inclure `b1-vb-excel` au portail.
6. Signaler les 3 pages à emoji comme exception à corriger.
