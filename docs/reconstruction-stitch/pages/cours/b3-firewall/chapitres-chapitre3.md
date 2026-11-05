# Chapitre 3 — Politiques de Sécurité, Listes de Contrôle d’Accès (ACL) & NAT

> Fiche extraite du fichier `b3-firewall/chapitres/chapitre3.html` (525 lignes, 38.1 Ko, sha256 `49276a65ccb4`).
> Famille : **cours-b3-firewall** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-firewall/chapitres/chapitre3.html` |
| Titre du document | Chapitre 3 — Politiques de Sécurité, Listes de Contrôle d’Accès (ACL) &amp; NAT \| Firewall & Sécurité Réseau B3 |
| Description meta | Chapitre 3 du cours Firewall & Sécurité Réseau B3 : Moteur d’évaluation First-Match-Wins, politique Default DROP, détection du masquage de règles (Rule Shadowing), redondances et translation d’adresses NAT/PAT (SNAT, DNAT). Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Politiques de Sécurité, Listes de Contrôle d’Accès (ACL) & NAT |
| 3 | h2 | — | 1. Le Moteur d’Évaluation des ACLs : Principe First-Match-Wins |
| 4 | h2 | — | 2. Anomalies de Configuration d’ACLs : Rule Shadowing & Redondance |
| 5 | h2 | — | 3. Translation d’Adresses Réseau : SNAT Masquerade & DNAT Port Forwarding |
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

- **H1** — Chapitre 3 — Politiques de Sécurité, Listes de Contrôle d’Accès (ACL) & NAT
  - **H2** — 1. Le Moteur d’Évaluation des ACLs : Principe First-Match-Wins
      - **H4** — 1. Mécanisme Séquentiel
      - **H4** — 2. Règle Implicite Finale
  - **H2** — 2. Anomalies de Configuration d’ACLs : Rule Shadowing & Redondance
  - **H2** — 3. Translation d’Adresses Réseau : SNAT Masquerade & DNAT Port Forwarding
      - **H4** — 1. SNAT (Source NAT / Masquerade / PAT)
      - **H4** — 2. DNAT (Destination NAT / Port Forwarding)
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Moteur d’évaluation d’ACL First-Match-Wins avec Default DROP
    - **H3** — Exercice 2 — Détecteur d’anomalies et masquage de règles (Rule Shadowing)
    - **H3** — Exercice 3 — Simulateur de translation d’adresses NAT (SNAT Masquerade & DNAT)
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
| Chapitre 4 — Architectures Réseau Sécurisées, Zone Démilitarisée (DMZ) & Bastions | `chapitre4.html` | `b3-firewall/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| L’action de cette règle est appliquée immédiatement et l’évaluation des règles suivantes e |  | — | `opt` | — | actif | data-correct=1 |
| Le paquet continue à être comparé à toutes les règles suivantes pour faire une moyenne |  | — | `opt` | — | actif | — |
| Le paquet est renvoyé à l’émetteur pour confirmation |  | — | `opt` | — | actif | — |
| Le pare-feu applique obligatoirement l’action la plus restrictive parmi toutes les règles |  | — | `opt` | — | actif | — |
| Une règle antérieure englobe totalement les critères d’une règle postérieure avec une acti |  | — | `opt` | — | actif | data-correct=1 |
| Une règle qui masque le mot de passe de l’administrateur dans les logs |  | — | `opt` | — | actif | — |
| Une règle qui s’applique uniquement pendant la nuit |  | — | `opt` | — | actif | — |
| Un bogue de mémoire vive faisant disparaître les règles après un redémarrage |  | — | `opt` | — | actif | — |
| De la règle la plus spécifique (hôte, port précis) vers la règle la plus générale (sous-ré |  | — | `opt` | — | actif | data-correct=1 |
| De la règle la plus générale vers la plus spécifique |  | — | `opt` | — | actif | — |
| Par ordre alphabétique des noms de serveurs |  | — | `opt` | — | actif | — |
| Toutes les règles DENY d’abord puis toutes les règles PERMIT à la fin |  | — | `opt` | — | actif | — |
| Le PAT (Port Address Translation / SNAT dynamique) qui associe chaque flux à un port sourc |  | — | `opt` | — | actif | data-correct=1 |
| Le routage statique sans passerelle |  | — | `opt` | — | actif | — |
| Le protocole ARP gratuit |  | — | `opt` | — | actif | — |
| Le protocole Spanning Tree (STP) |  | — | `opt` | — | actif | — |
| Pour rediriger une requête arrivant sur l’adresse IP publique du pare-feu vers un serveur |  | — | `opt` | — | actif | data-correct=1 |
| Pour permettre aux utilisateurs internes de consulter un site web public |  | — | `opt` | — | actif | — |
| Pour chiffrer les disques durs des serveurs de bases de données |  | — | `opt` | — | actif | — |
| Pour attribuer automatiquement une adresse IP par DHCP |  | — | `opt` | — | actif | — |
| Redondante (Redundant) |  | — | `opt` | — | actif | data-correct=1 |
| Masquée (Shadowed) |  | — | `opt` | — | actif | — |
| Invalide (Invalid Syntax) |  | — | `opt` | — | actif | — |
| Prioritaire |  | — | `opt` | — | actif | — |
| L’adresse IP source (remplacée par l’IP publique du pare-feu) |  | — | `opt` | — | actif | data-correct=1 |
| L’adresse IP destination (remplacée par 127.0.0.1) |  | — | `opt` | — | actif | — |
| L’adresse MAC du commutateur de distribution |  | — | `opt` | — | actif | — |
| Le numéro de réseau de diffusion (Broadcast) |  | — | `opt` | — | actif | — |
| Pour détecter les balayages de ports, cartographies réseau et tentatives d’intrusion hosti |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `fw3-c3-e1` | analyse | 300 | active | `RULE id=R1 action=PERMIT proto=TCP src=ANY dst=10.0.0.10 dport=443 RULE id=R2 action=DENY proto=ANY src=ANY dst=10.0.0.10 dport=ANY PACKET id=P1 proto=TCP src=192.168.1.50 dst=10.0.0.10 dport=443 PACKET id=P2 proto=TCP src=192.168.1.50 dst=10.0.0.10 dport=22` | Exercice 1 — Moteur d’évaluation d’ACL First-Match-Wins avec Default DROP |
| `fw3-c3-e2` | analyse | 300 | active | `RULE id=R1 action=DENY proto=ANY src=ANY dst=ANY dport=ANY RULE id=R2 action=PERMIT proto=TCP src=10.0.0.1 dst=10.0.0.2 dport=80` | Exercice 2 — Détecteur d’anomalies et masquage de règles (Rule Shadowing) |
| `fw3-c3-e3` | analyse | 300 | active | `CONFIG_SNAT public_ip=198.51.100.1 start_port=40000 PACKET dir=OUTBOUND src=192.168.1.50:52001 dst=93.184.216.34:80` | Exercice 3 — Simulateur de translation d’adresses NAT (SNAT Masquerade & DNAT) |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 3 · elements `code` : 45
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3301 mots · 478 noeuds HTML

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
