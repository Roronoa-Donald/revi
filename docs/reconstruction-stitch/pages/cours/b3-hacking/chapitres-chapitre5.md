# Chapitre 5 — Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access)

> Fiche extraite du fichier `b3-hacking/chapitres/chapitre5.html` (573 lignes, 41.9 Ko, sha256 `a8e1e4db8567`).
> Famille : **cours-b3-hacking** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-hacking/chapitres/chapitre5.html` |
| Titre du document | Module 5 — Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access) \| Hacking Éthique & Pentest B3 |
| Description meta | Module 5 du cours Hacking Éthique & Pentest B3 : Mécanismes d'exploitation bas niveau et corruption de mémoire (architecture de pile, dépassement de tampon Buffer Overflow x86/x64, détournement d'EIP/RIP, NOP sled et protections ASLR/DEP/Canaries), utilisation professionnelle de Metasploit Framework et payloads Meterpreter, vecteurs d'élévation de privilèges sous Linux (binaires SUID GTFOBins, configurations sudoers NOPASSWD, crontabs modifiables), élévation de privilèges Windows (Unquoted Service Paths, SeImpersonatePrivilege et PrintSpoofer), et techniques de mouvement latéral et pivoting réseau (tunnels SSH, proxies SOCKS et Chisel). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access) |
| 3 | h2 | — | 1. Architecture Mémoire & Dépassement de Tampon (Stack Buffer Overflow) |
| 4 | h2 | — | 2. Exploitation avec Metasploit Framework & Sessions Meterpreter |
| 5 | h2 | — | 3. Élévation de Privilèges Linux : SUID, GTFOBins & Sudoers |
| 6 | h2 | — | 4. Élévation de Privilèges Windows : Unquoted Service Paths & SeImpersonate |
| 7 | h2 | — | 5. Mouvement Latéral et Pivoting Réseau (SSH & Chisel) |
| 8 | h2 | — | 6. Études de cas & applications pratiques |
| 9 | h2 | — | 7. QCM — niveau examen |
| 10 | h2 | — | 8. Erreurs classiques — récapitulatif |
| 11 | h2 | — | 9. Méthodologie de résolution |
| 12 | h2 | — | 10. Révision active |
| 13 | h2 | — | 11. Test de maîtrise |
| 14 | .lab | code lab | 3 bloc(s) |
| 15 | .qcm | QCM | 8 question(s) |
| 16 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Exploitation Système, Escalade de Privilèges & Pivoting (Gaining Access)
  - **H2** — 1. Architecture Mémoire & Dépassement de Tampon (Stack Buffer Overflow)
      - **H4** — Organisation de la Pile (Stack)
      - **H4** — Mécanique de l'Exploit
  - **H2** — 2. Exploitation avec Metasploit Framework & Sessions Meterpreter
  - **H2** — 3. Élévation de Privilèges Linux : SUID, GTFOBins & Sudoers
      - **H4** — Binaires SUID & GTFOBins
      - **H4** — Droits Sudoers Permissifs (sudo -l)
  - **H2** — 4. Élévation de Privilèges Windows : Unquoted Service Paths & SeImpersonate
      - **H4** — Chemins de Services Non Quotés (Unquoted Service Paths)
      - **H4** — Abus de Privilèges de Jetons (SeImpersonatePrivilege)
  - **H2** — 5. Mouvement Latéral et Pivoting Réseau (SSH & Chisel)
      - **H4** — Tunnel SSH Local (-L)
      - **H4** — Tunnel Dynamique SOCKS (-D)
      - **H4** — Tunneling HTTP Chisel
  - **H2** — 6. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Auditeur de Permissions Linux et Détection de Binaires SUID Anormaux
    - **H3** — Exercice 2 — Analyseur de Fichier Sudoers et Détection de Droits Dangereux (NOPASSWD)
    - **H3** — Exercice 3 — Calculateur d'Offset de Buffer Overflow et Agencement de Payload
  - **H2** — 7. QCM — niveau examen
  - **H2** — 8. Erreurs classiques — récapitulatif
  - **H2** — 9. Méthodologie de résolution
  - **H2** — 10. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 11. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-hackingnav` | Portail → `/`<br>Hacking Éthique & Pentest B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Hacking Éthique & Pentest B3 | `../index.html` | `b3-hacking/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-hacking/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-hacking/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-hacking/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-hacking/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-hacking/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-hacking/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-hacking/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-hacking/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-hacking/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-hacking/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-hacking/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-hacking/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-hacking/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-hacking/chapitres/formules.html` | interne |
| Module 6 — Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest | `chapitre6.html` | `b3-hacking/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le registre EIP (Extended Instruction Pointer) |  | — | `opt` | — | actif | data-correct=1 |
| Le registre EAX (Accumulateur) |  | — | `opt` | — | actif | — |
| Le registre ECX (Compteur) |  | — | `opt` | — | actif | — |
| Le registre ESP (Stack Pointer) |  | — | `opt` | — | actif | — |
| Créer une zone d'atterrissage tolérante : si le saut processeur tombe n'importe où dans le |  | — | `opt` | — | actif | data-correct=1 |
| Chiffrer le shellcode pour le rendre indétectable par l'antivirus |  | — | `opt` | — | actif | — |
| Augmenter les privilèges de l'utilisateur au niveau root avant l'exécution |  | — | `opt` | — | actif | — |
| Supprimer les journaux d'événements du système d'exploitation |  | — | `opt` | — | actif | — |
| DEP / NX (Data Execution Prevention / No-Execute) |  | — | `opt` | — | actif | data-correct=1 |
| ASLR (Address Space Layout Randomization) |  | — | `opt` | — | actif | — |
| DHCP Snooping |  | — | `opt` | — | actif | — |
| RAID 5 |  | — | `opt` | — | actif | — |
| Il est scindé en deux parties : un petit chargeur initial (Stager) qui se connecte pour té |  | — | `opt` | — | actif | data-correct=1 |
| Il s'exécute exclusivement depuis une clé USB physique |  | — | `opt` | — | actif | — |
| Il ne fonctionne que si la cible dispose de privilèges root préalables |  | — | `opt` | — | actif | — |
| Il est entièrement compilé en assembleur 16-bit |  | — | `opt` | — | actif | — |
| Parce qu'il permet d'exécuter un shell arbitraire via la commande : find . -exec /bin/sh - |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu'il efface automatiquement le mot de passe root dans le fichier /etc/shadow |  | — | `opt` | — | actif | — |
| Parce qu'il désactive le pare-feu iptables lors de chaque recherche |  | — | `opt` | — | actif | — |
| Parce qu'il redémarre la machine en mode secours mono-utilisateur |  | — | `opt` | — | actif | — |
| Le chemin vers l'exécutable du service comporte des espaces et n'est pas entouré de guille |  | — | `opt` | — | actif | data-correct=1 |
| Le pare-feu Windows est désactivé sur le profil domaine |  | — | `opt` | — | actif | — |
| Le mot de passe administrateur comporte moins de 8 caractères |  | — | `opt` | — | actif | — |
| Le service utilise le protocole UDP au lieu de TCP |  | — | `opt` | — | actif | — |
| SeImpersonatePrivilege |  | — | `opt` | — | actif | data-correct=1 |
| SeShutdownPrivilege |  | — | `opt` | — | actif | — |
| SeTimeZonePrivilege |  | — | `opt` | — | actif | — |
| SeUndockPrivilege |  | — | `opt` | — | actif | — |
| ssh -D 1080 user@pivot |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `hk3-c5-e1` | analyse | 300 | active | `SUID_CHECK path=/usr/bin/find owner=root mode=4755` | Exercice 1 — Auditeur de Permissions Linux et Détection de Binaires SUID Anormaux |
| `hk3-c5-e2` | analyse | 300 | active | `SUDO_PARSE rule=developer ALL=(ALL) NOPASSWD: /usr/bin/find` | Exercice 2 — Analyseur de Fichier Sudoers et Détection de Droits Dangereux (NOPASSWD) |
| `hk3-c5-e3` | analyse | 300 | active | `BOF_LAYOUT arch=x86 offset=112 sled_len=32 shellcode_len=44` | Exercice 3 — Calculateur d'Offset de Buffer Overflow et Agencement de Payload |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 8 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 6 · elements `code` : 104
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3585 mots · 600 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 20 |
| `card` | 9 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `grid` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |

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
