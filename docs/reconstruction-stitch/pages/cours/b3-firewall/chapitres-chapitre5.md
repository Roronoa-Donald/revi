# Chapitre 5 — Filtrage Applicatif L7, UTM & Pare-feux Nouvelle Génération (NGFW)

> Fiche extraite du fichier `b3-firewall/chapitres/chapitre5.html` (527 lignes, 37.7 Ko, sha256 `e33609327495`).
> Famille : **cours-b3-firewall** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-firewall/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Filtrage Applicatif L7, UTM &amp; Pare-feux Nouvelle Génération (NGFW) \| Firewall & Sécurité Réseau B3 |
| Description meta | Chapitre 5 du cours Firewall & Sécurité Réseau B3 : Limites du filtrage de port L4, identification applicative App-ID, inspection du champ SNI TLS, filtrage web catégoriel, protection anti-DoS par rate limiting et moteur DPI (Deep Packet Inspection). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Filtrage Applicatif L7, UTM & Pare-feux Nouvelle Génération (NGFW) |
| 3 | h2 | — | 1. L’Obsolescence du Filtrage de Port L4 & l’Approche App-ID / NGFW |
| 4 | h2 | — | 2. Inspection SNI (Server Name Indication) & Filtrage Web Catégoriel |
| 5 | h2 | — | 3. Deep Packet Inspection (DPI) & Protection Anti-DoS par Rate Limiting |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Filtrage Applicatif L7, UTM & Pare-feux Nouvelle Génération (NGFW)
  - **H2** — 1. L’Obsolescence du Filtrage de Port L4 & l’Approche App-ID / NGFW
      - **H4** — Les Failles du Filtrage par Port L4
      - **H4** — La Réponse NGFW : App-ID & User-ID
  - **H2** — 2. Inspection SNI (Server Name Indication) & Filtrage Web Catégoriel
      - **H4** — Mécanique du SNI dans le Handshake TLS
      - **H4** — Bases de Réputation Catégorielle
  - **H2** — 3. Deep Packet Inspection (DPI) & Protection Anti-DoS par Rate Limiting
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Filtrage de domaines DNS & inspection du Server Name Indication (SNI TLS)
    - **H3** — Exercice 2 — Limiteur de débit et protection anti-DoS par fenêtre glissante
    - **H3** — Exercice 3 — Moteur Deep Packet Inspection (DPI) et détection de signatures L7
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-firewallnav` | Portail → `/`<br>Firewall & Sécurité Réseau B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Firewall & Sécurité Réseau B3 | `../index.html` | `b3-firewall/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-firewall/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-firewall/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-firewall/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-firewall/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-firewall/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-firewall/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-firewall/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-firewall/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-firewall/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-firewall/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-firewall/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-firewall/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-firewall/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-firewall/chapitres/formules.html` | interne |
| Chapitre 6 — Déploiement Linux Netfilter (iptables / nftables), Logs & Intégration SIEM | `chapitre6.html` | `b3-firewall/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce que la quasi-totalité du trafic web et des applications modernes passe par le port 4 |  | — | `opt` | — | actif | data-correct=1 |
| Parce que les routeurs ne savent plus lire les en-têtes TCP |  | — | `opt` | — | actif | — |
| Parce que le protocole IPv4 a été totalement désactivé sur Internet |  | — | `opt` | — | actif | — |
| Parce que les câbles Ethernet bloquent les numéros de ports supérieurs à 80 |  | — | `opt` | — | actif | — |
| Dans le message Client Hello envoyé par le navigateur client au tout début du handshake |  | — | `opt` | — | actif | data-correct=1 |
| Dans le message Server Hello envoyé par le serveur à la fin |  | — | `opt` | — | actif | — |
| Uniquement après l’échange complet des clés asymétriques |  | — | `opt` | — | actif | — |
| Dans les paquets de données TCP ACK de fermeture |  | — | `opt` | — | actif | — |
| Elle ne nécessite aucun déploiement de certificat racine d’autorité sur les postes clients |  | — | `opt` | — | actif | data-correct=1 |
| Elle permet de modifier le contenu des pages web à la volée |  | — | `opt` | — | actif | — |
| Elle empêche totalement les utilisateurs d’utiliser le protocole DNS |  | — | `opt` | — | actif | — |
| Elle fonctionne même si le câble réseau est débranché |  | — | `opt` | — | actif | — |
| Une injection SQL (SQLi) |  | — | `opt` | — | actif | data-correct=1 |
| Une attaque par rebond ICMP Smurf |  | — | `opt` | — | actif | — |
| Un empoisonnement de cache DNS |  | — | `opt` | — | actif | — |
| Une attaque de force brute sur le protocole ARP |  | — | `opt` | — | actif | — |
| Le Rate Limiting par fenêtre glissante (ou algorithme du seau à jetons / Token Bucket) |  | — | `opt` | — | actif | data-correct=1 |
| L’augmentation indéfinie de la mémoire vive du serveur |  | — | `opt` | — | actif | — |
| La réinitialisation quotidienne de la passerelle par défaut |  | — | `opt` | — | actif | — |
| Le passage en mode duplex intégral sur le commutateur |  | — | `opt` | — | actif | — |
| User-ID |  | — | `opt` | — | actif | data-correct=1 |
| App-ID |  | — | `opt` | — | actif | — |
| MAC-Filtering |  | — | `opt` | — | actif | — |
| Content-ID |  | — | `opt` | — | actif | — |
| Une attaque par traversée de répertoires (Path Traversal / Directory Traversal) |  | — | `opt` | — | actif | data-correct=1 |
| Un déni de service distribué volumétrique UDP |  | — | `opt` | — | actif | — |
| Une attaque de l’homme du milieu ARP Poisoning |  | — | `opt` | — | actif | — |
| Une saturation de la bande passante par flux vidéo |  | — | `opt` | — | actif | — |
| La capacité à identifier la nature exacte de l’application logicielle (ex: Facebook, Dropb |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `fw3-c5-e1` | analyse | 300 | active | `SNI_EVENT id=1 client_ip=192.168.1.10 host=login-bank.phishing-portal.com SNI_EVENT id=2 client_ip=192.168.1.10 host=docs.python.org` | Exercice 1 — Filtrage de domaines DNS & inspection du Server Name Indication (SNI TLS) |
| `fw3-c5-e2` | analyse | 300 | active | `REQ ts=10 ip=192.168.1.5 REQ ts=11 ip=192.168.1.5 REQ ts=12 ip=192.168.1.5 REQ ts=13 ip=192.168.1.5` | Exercice 2 — Limiteur de débit et protection anti-DoS par fenêtre glissante |
| `fw3-c5-e3` | analyse | 300 | active | `PAYLOAD id=P1 payload=id=1 UNION SELECT username, password FROM users PAYLOAD id=P2 payload=q=ordinateur+portable` | Exercice 3 — Moteur Deep Packet Inspection (DPI) et détection de signatures L7 |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
- Blocs replies : 3 (`<details>`).

Etats et interactions a reconstruire :

- En-tete compact : fil d'Ariane, titre, meta (module, duree, statut gratuit).
- Encadres pedagogiques : mise en situation, objectifs, intuition, piege, methode, technique, revision.
- Tableaux de donnees et blocs pseudo-code defilables horizontalement.
- Exercices de code (`div.lab[data-lab]`) : editeur, entree standard, console a 3 onglets, tuteur IA.
- Correction suspendue si `data-grading-suspended="1"` : bouton « Validation suspendue » desactive et avis visible.
- QCM : options desactivees apres reponse, bonne reponse `is-correct`, mauvaise `is-wrong`, explication `is-shown`.
- Score QCM : `Score : n/N (p %)` + palier de maitrise (4 bandes).
- Checklist de maitrise : case `data-mark-done`, etat persiste en localStorage par chapitre.
- Navigation de bas de page : chapitre precedent / suivant.

## 8. Tableaux, code et medias

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 3 · elements `code` : 68
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3351 mots · 503 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
| `card` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `badge` | 3 |
| `lab__body` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.
