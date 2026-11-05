# Chapitre 2 — Filtrage Dynamique avec Suivi d’État (Stateful Inspection) & Table Conntrack

> Fiche extraite du fichier `b3-firewall/chapitres/chapitre2.html` (522 lignes, 37.1 Ko, sha256 `af94c22ecb64`).
> Famille : **cours-b3-firewall** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-firewall/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Filtrage Dynamique avec Suivi d’État (Stateful Inspection) &amp; Table Conntrack \| Firewall & Sécurité Réseau B3 |
| Description meta | Chapitre 2 du cours Firewall & Sécurité Réseau B3 : Machine à états finis TCP (RFC 793), module netfilter conntrack, états NEW/ESTABLISHED/RELATED/INVALID, gestion des timeouts et détection des scans furtifs (Xmas, Null). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Filtrage Dynamique avec Suivi d’État (Stateful Inspection) & Table Conntrack |
| 3 | h2 | — | 1. La Révolution du Stateful Inspection & la Machine à États TCP |
| 4 | h2 | — | 2. Architecture & États Logiques de la Table Netfilter Conntrack |
| 5 | h2 | — | 3. Gestion de la RAM, Timeouts & Détection de Scans Furtifs |
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

- **H1** — Chapitre 2 — Filtrage Dynamique avec Suivi d’État (Stateful Inspection) & Table Conntrack
  - **H2** — 1. La Révolution du Stateful Inspection & la Machine à États TCP
      - **H4** — 1. Étape SYN (Initialisation)
      - **H4** — 2. Étape SYN-ACK (Réponse)
      - **H4** — 3. Étape ACK (Validation)
  - **H2** — 2. Architecture & États Logiques de la Table Netfilter Conntrack
  - **H2** — 3. Gestion de la RAM, Timeouts & Détection de Scans Furtifs
      - **H4** — Délais d’Expiration Standards
      - **H4** — Balayages Furtifs & Drapeaux Illégaux
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Machine à états TCP conntrack (NEW, ESTABLISHED, INVALID)
    - **H3** — Exercice 2 — Purge et gestion des délais d’expiration (Timeouts) conntrack
    - **H3** — Exercice 3 — Détecteur de balayages furtifs (Scans Xmas, Null, FIN & Syn-Fin)
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
| Chapitre 3 — Politiques de Sécurité, Listes de Contrôle d’Accès (ACL) & NAT | `chapitre3.html` | `b3-firewall/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| La réception du paquet ACK final du client concluant le 3-Way Handshake |  | — | `opt` | — | actif | data-correct=1 |
| L’émission du premier paquet SYN par le client |  | — | `opt` | — | actif | — |
| La réception de la réponse SYN-ACK émise par le serveur |  | — | `opt` | — | actif | — |
| La fermeture de la connexion par un paquet RST |  | — | `opt` | — | actif | — |
| Pour optimiser les performances : plus de 90% des paquets en transit appartiennent à des s |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le noyau Linux refuse de démarrer si cette règle n’est pas en position 1 |  | — | `opt` | — | actif | — |
| Pour permettre aux paquets SYN de traverser sans être filtrés |  | — | `opt` | — | actif | — |
| Pour désactiver le chiffrement TLS sur les paquets de retour |  | — | `opt` | — | actif | — |
| À une nouvelle connexion logiquement liée à une session existante (ex: canal de données pa |  | — | `opt` | — | actif | data-correct=1 |
| À une connexion suspecte qui doit être mise en quarantaine |  | — | `opt` | — | actif | — |
| À un paquet ayant subi une altération de somme de contrôle (Checksum) |  | — | `opt` | — | actif | — |
| À une session redirigée vers un proxy de cache web |  | — | `opt` | — | actif | — |
| Le pare-feu rejette les nouvelles connexions (« table full, dropping packet ») provoquant |  | — | `opt` | — | actif | data-correct=1 |
| Le pare-feu bascule automatiquement en mode routage non filtré |  | — | `opt` | — | actif | — |
| Le système redémarre instantanément sans sauvegarder les logs |  | — | `opt` | — | actif | — |
| Les paquets sont compressés pour libérer de la mémoire |  | — | `opt` | — | actif | — |
| FIN, PSH et URG |  | — | `opt` | — | actif | data-correct=1 |
| SYN, ACK et RST |  | — | `opt` | — | actif | — |
| Uniquement le drapeau ACK |  | — | `opt` | — | actif | — |
| Tous les drapeaux à 0 (aucun drapeau) |  | — | `opt` | — | actif | — |
| Mitiger les attaques SYN Flood en encodant les informations de session dans le numéro de s |  | — | `opt` | — | actif | data-correct=1 |
| Autoriser le stockage de cookies HTTP dans le pare-feu |  | — | `opt` | — | actif | — |
| Augmenter la taille du tampon d’émission des cartes réseau |  | — | `opt` | — | actif | — |
| Forcer la déconnexion automatique des utilisateurs inactifs |  | — | `opt` | — | actif | — |
| INVALID |  | — | `opt` | — | actif | data-correct=1 |
| ESTABLISHED |  | — | `opt` | — | actif | — |
| NEW |  | — | `opt` | — | actif | — |
| RELATED |  | — | `opt` | — | actif | — |
| Environ 300 octets |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `fw3-c2-e1` | analyse | 300 | active | `PACKET id=1 src=10.0.0.2 dst=192.168.1.10 sport=54321 dport=80 flags=SYN PACKET id=2 src=192.168.1.10 dst=10.0.0.2 sport=80 dport=54321 flags=SYN_ACK PACKET id=3 src=10.0.0.2 dst=192.168.1.10 sport=54321 dport=80 flags=ACK` | Exercice 1 — Machine à états TCP conntrack (NEW, ESTABLISHED, INVALID) |
| `fw3-c2-e2` | analyse | 300 | active | `SESSION id=S1 proto=TCP state=ESTABLISHED last_seen=1000 SESSION id=S2 proto=UDP state=GENERIC last_seen=4800 PURGE now=5000` | Exercice 2 — Purge et gestion des délais d’expiration (Timeouts) conntrack |
| `fw3-c2-e3` | analyse | 300 | active | `PROBE src=192.168.1.100 dst=10.0.0.1 dport=22 flags=FIN,PSH,URG` | Exercice 3 — Détecteur de balayages furtifs (Scans Xmas, Null, FIN & Syn-Fin) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 6 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 3 · elements `code` : 73
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3258 mots · 488 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
| `card` | 5 |
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
