# Chapitre 6 — Sécurité Avancée, Durcissement du Noyau, PAM & Auditing (auditd)

> Fiche extraite du fichier `b3-linux/chapitres/chapitre6.html` (497 lignes, 37.8 Ko, sha256 `cd98ecca6385`).
> Famille : **cours-b3-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-linux/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Sécurité Avancée, Durcissement du Noyau, PAM &amp; Auditing (auditd) \| Linux Avancé B3 |
| Description meta | Chapitre 6 du cours Linux Avancé B3 : Durcissement du noyau (/etc/sysctl.conf, ASLR, restriction dmesg/kptr), pile modulaire d’authentification PAM (required/requisite/sufficient), et traçabilité avec auditd. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Sécurité Avancée, Durcissement du Noyau, PAM & Auditing (auditd) |
| 3 | h2 | — | 1. Durcissement du Noyau Linux : Paramètres sysctl & Protections Mémoire |
| 4 | h2 | — | 2. Architecture PAM (Pluggable Authentication Modules) : Mécanique et Drapeaux |
| 5 | h2 | — | 3. Le Sous-Système d’Audit du Noyau : auditd, aureport & Traçabilité des Privilèges |
| 6 | h2 | — | 4. Bonnes Pratiques de Durcissement en Production & Standards CIS / ANSSI |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Sécurité Avancée, Durcissement du Noyau, PAM & Auditing (auditd)
  - **H2** — 1. Durcissement du Noyau Linux : Paramètres sysctl & Protections Mémoire
      - **H4** — 1. Protection de la Mémoire & Anti-Exploitation
      - **H4** — 2. Durcissement Réseau & Système de Fichiers
  - **H2** — 2. Architecture PAM (Pluggable Authentication Modules) : Mécanique et Drapeaux
  - **H2** — 3. Le Sous-Système d’Audit du Noyau : auditd, aureport & Traçabilité des Privilèges
      - **H4** — 1. Les Règles d’Audit du Noyau (auditctl)
      - **H4** — 2. Analyse & Détection d’Élévations (ausearch / aureport)
  - **H2** — 4. Bonnes Pratiques de Durcissement en Production & Standards CIS / ANSSI
      - **H4** — 1. Principe du Moindre Privilège & Réduction de Surface
      - **H4** — 2. Intégrité & Automatisation
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf)
    - **H3** — Exercice 2 — Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient)
    - **H3** — Exercice 3 — Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-linuxnav` | Portail → `/`<br>Linux Avancé B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Linux Avancé B3 | `../index.html` | `b3-linux/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-linux/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-linux/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-linux/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-linux/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-linux/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-linux/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-linux/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-linux/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-linux/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-linux/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-linux/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-linux/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-linux/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-linux/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `b3-linux/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| kernel.aslr_enable = 1 |  | — | `opt` | — | actif | — |
| kernel.randomize_va_space = 2 |  | — | `opt` | — | actif | data-correct=1 |
| vm.randomize_memory = 1 |  | — | `opt` | — | actif | — |
| security.aslr_level = 3 |  | — | `opt` | — | actif | — |
| Le système s’éteint immédiatement par sécurité |  | — | `opt` | — | actif | — |
| La chaîne d’authentification est immédiatement interrompue avec un message d’erreur |  | — | `opt` | — | actif | — |
| L’échec global est mémorisé, mais PAM continue d’évaluer les modules suivants de la chaîne |  | — | `opt` | — | actif | data-correct=1 |
| L’échec est ignoré et l’utilisateur est connecté |  | — | `opt` | — | actif | — |
| required |  | — | `opt` | — | actif | — |
| requisite |  | — | `opt` | — | actif | data-correct=1 |
| sufficient |  | — | `opt` | — | actif | — |
| optional |  | — | `opt` | — | actif | — |
| Il accorde l’accès immédiatement sans évaluer la suite de la chaîne pour ce type de gestio |  | — | `opt` | — | actif | data-correct=1 |
| Il demande obligatoirement un second mot de passe |  | — | `opt` | — | actif | — |
| Il annule l’authentification |  | — | `opt` | — | actif | — |
| Il réinitialise les droits de l’utilisateur |  | — | `opt` | — | actif | — |
| sysctl --reload |  | — | `opt` | — | actif | — |
| sysctl -p /etc/sysctl.conf |  | — | `opt` | — | actif | data-correct=1 |
| systemctl restart kernel |  | — | `opt` | — | actif | — |
| proc-reload |  | — | `opt` | — | actif | — |
| uid == 0 et euid == 1000 |  | — | `opt` | — | actif | — |
| uid != 0 et euid == 0 |  | — | `opt` | — | actif | data-correct=1 |
| pid == 1 et ppid == 0 |  | — | `opt` | — | actif | — |
| gid == 100 et egid == 100 |  | — | `opt` | — | actif | — |
| À enregistrer les cookies de session des navigateurs Web |  | — | `opt` | — | actif | — |
| À protéger la pile réseau TCP contre les attaques par déni de service SYN Flood |  | — | `opt` | — | actif | data-correct=1 |
| À accélérer la vitesse de téléchargement Wi-Fi |  | — | `opt` | — | actif | — |
| À désactiver le pare-feu iptables |  | — | `opt` | — | actif | — |
| /etc/audit/rules.d/audit.rules |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx3-c6-e1` | shell | 300 | suspendue | `SYSCTL_CHECK key=kernel.randomize_va_space current=2 recommended=2` | Exercice 1 — Auditeur de paramètres de durcissement du noyau (/etc/sysctl.conf) |
| `lx3-c6-e2` | shell | 300 | suspendue | `PAM_STEP module=pam_unix.so control=sufficient res=SUCCESS` | Exercice 2 — Évaluateur de chaîne de modules d’authentification PAM (required vs sufficient) |
| `lx3-c6-e3` | shell | 300 | suspendue | `AUDIT_LOG id=101 uid=1000 euid=0 exe=/usr/bin/sudo res=success` | Exercice 3 — Parseur de journaux d’audit Linux auditd et détection d’élévation de privilèges |

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

- Tableaux : 1 (0 lignes / 4 en-tetes)
- Blocs `pre` : 6 · elements `code` : 66
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3080 mots · 537 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

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
| `card` | 6 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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
