# Chapitre 6 — Administration Avancée PowerShell, Sauvegardes VSS & Tolérance aux Pannes

> Fiche extraite du fichier `b3-windows-server/chapitres/chapitre6.html` (571 lignes, 39.6 Ko, sha256 `c592a9fc2a38`).
> Famille : **cours-b3-windows-server** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-windows-server/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Administration Avancée PowerShell, Sauvegardes VSS &amp; Tolérance aux Pannes \| Windows Server B3 |
| Description meta | Chapitre 6 du cours Windows Server B3 : Automatisation d’administration système avec PowerShell 5.1/7 et cmdlets d’infrastructure, administration à distance sécurisée PowerShell Remoting (WinRM, sessions interactives et Invoke-Command distribué), stratégie de sauvegardes bare-metal d’entreprise avec Windows Server Backup (wbadmin) et architecture VSS (Requestor, Writer, Provider), clusters de basculement Windows Server Failover Clustering (WSFC), modèle mathématique de calcul du quorum (majorité absolue, témoins Disk, File Share et Cloud Witness) et prévention absolue du Split-Brain. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Administration Avancée PowerShell, Sauvegardes VSS & Tolérance aux Pannes |
| 3 | h2 | — | 1. Automatisation Système et Administration à Distance (WinRM) |
| 4 | h2 | — | 2. Sauvegardes d’Entreprise et Architecture VSS (Volume Shadow Copy) |
| 5 | h2 | — | 3. Clustering de Basculement (WSFC) & Formules de Quorum |
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

- **H1** — Chapitre 6 — Administration Avancée PowerShell, Sauvegardes VSS & Tolérance aux Pannes
  - **H2** — 1. Automatisation Système et Administration à Distance (WinRM)
      - **H4** — Architecture de PowerShell Remoting (WinRM)
      - **H4** — Modules Fondamentaux d’Infrastructure
  - **H2** — 2. Sauvegardes d’Entreprise et Architecture VSS (Volume Shadow Copy)
      - **H4** — Le Modèle Tripartite de VSS
      - **H4** — Types de Sauvegardes & Stratégie Bare-Metal
  - **H2** — 3. Clustering de Basculement (WSFC) & Formules de Quorum
      - **H4** — Modèle Mathématique du Quorum
      - **H4** — Prévention du Split-Brain & Choix du Témoin
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Analyseur syntaxique de commandes PowerShell d’administration Active Directory
    - **H3** — Exercice 2 — Calculateur de quorum de cluster de basculement (Failover Clustering)
    - **H3** — Exercice 3 — Planificateur de sauvegardes Windows Server Backup (VSS Full vs Incremental)
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
| nav | `b3-windows-servernav` | Portail → `/`<br>Windows Server B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Windows Server B3 | `../index.html` | `b3-windows-server/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-windows-server/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-windows-server/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-windows-server/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-windows-server/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-windows-server/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-windows-server/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-windows-server/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-windows-server/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-windows-server/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-windows-server/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-windows-server/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-windows-server/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-windows-server/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-windows-server/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `b3-windows-server/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| SSH uniquement |  | — | `opt` | — | actif | — |
| WS-Management (WS-Man) via le service WinRM |  | — | `opt` | — | actif | data-correct=1 |
| Telnet sur le port 23 |  | — | `opt` | — | actif | — |
| SNMPv1 |  | — | `opt` | — | actif | — |
| Port 80 |  | — | `opt` | — | actif | — |
| Port 443 |  | — | `opt` | — | actif | — |
| Port 5985 |  | — | `opt` | — | actif | data-correct=1 |
| Port 3389 |  | — | `opt` | — | actif | — |
| Il écrit les données sur la bande magnétique |  | — | `opt` | — | actif | — |
| Il suspend brièvement les transactions de l’application et vide les caches pour assurer la |  | — | `opt` | — | actif | data-correct=1 |
| Il facture les licences de sauvegarde à l’entreprise |  | — | `opt` | — | actif | — |
| Il chiffre le disque avec BitLocker |  | — | `opt` | — | actif | — |
| 3 voix au total, majorité de 2 voix |  | — | `opt` | — | actif | data-correct=1 |
| 3 voix au total, majorité de 3 voix |  | — | `opt` | — | actif | — |
| 2 voix au total, majorité de 1 voix |  | — | `opt` | — | actif | — |
| 4 voix au total, majorité de 3 voix |  | — | `opt` | — | actif | — |
| Le dépassement de la mémoire vive |  | — | `opt` | — | actif | — |
| Le phénomène de Split-Brain et la corruption des données sur le stockage partagé |  | — | `opt` | — | actif | data-correct=1 |
| La surchauffe des ventilateurs du serveur |  | — | `opt` | — | actif | — |
| L’expiration des licences Windows |  | — | `opt` | — | actif | — |
| Témoin disquette 3.5 pouces |  | — | `opt` | — | actif | — |
| Témoin Cloud (Cloud Witness) sur stockage Blob Azure |  | — | `opt` | — | actif | data-correct=1 |
| Témoin imprimante réseau |  | — | `opt` | — | actif | — |
| Témoin câble série RS-232 |  | — | `opt` | — | actif | — |
| Enter-PSSession |  | — | `opt` | — | actif | — |
| Invoke-Command |  | — | `opt` | — | actif | data-correct=1 |
| Start-Process |  | — | `opt` | — | actif | — |
| Set-ExecutionPolicy |  | — | `opt` | — | actif | — |
| wbadmin stop job |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ws3-c6-e1` | analyse | 300 | active | `POWERSHELL New-ADUser -Name "Alice Smith" -SamAccountName asmith -Enabled $true POWERSHELL Set-ADUser -Department "Finance"` | Exercice 1 — Analyseur syntaxique de commandes PowerShell d’administration Active Directory |
| `ws3-c6-e2` | analyse | 300 | active | `NODE id=NODE-01 vote=1 status=ONLINE NODE id=NODE-02 vote=1 status=ONLINE NODE id=NODE-03 vote=1 status=OFFLINE WITNESS type=CLOUD status=ONLINE` | Exercice 2 — Calculateur de quorum de cluster de basculement (Failover Clustering) |
| `ws3-c6-e3` | analyse | 300 | active | `SOURCE_VOL letter=D size_gb=500 daily_change_gb=20 POLICY retention_weeks=4` | Exercice 3 — Planificateur de sauvegardes Windows Server Backup (VSS Full vs Incremental) |

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
- Blocs `pre` : 3 · elements `code` : 19
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3329 mots · 444 noeuds HTML

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
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
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
