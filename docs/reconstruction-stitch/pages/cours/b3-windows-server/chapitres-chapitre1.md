# Chapitre 1 — Architecture Système, Services d’Infrastructure Réseau & Modèle de Licence par Cœur

> Fiche extraite du fichier `b3-windows-server/chapitres/chapitre1.html` (561 lignes, 40.7 Ko, sha256 `b7da6dde97c3`).
> Famille : **cours-b3-windows-server** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-windows-server/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Architecture Système, Services d’Infrastructure Réseau &amp; Modèle de Licence par Cœur \| Windows Server B3 |
| Description meta | Chapitre 1 du cours Windows Server B3 : Architecture interne Windows Server (Kernel NT, HAL, mode utilisateur vs mode noyau), Server Core vs Desktop Experience, rôles d’infrastructure réseau fondamentaux (DHCP avec étendues, exclusions et réservations statiques, DNS d’infrastructure avec zones directes, inverses et enregistrements de service SRV pour Active Directory), et modèle officiel Microsoft de licences par cœur physique. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Architecture Système, Services d’Infrastructure Réseau & Modèle de Licence par Cœur |
| 3 | h2 | — | 1. Architecture Interne du Système d’Exploitation Windows Server |
| 4 | h2 | — | 2. Services Réseau Fondamentaux : DHCP & Résolution DNS d’Infrastructure |
| 5 | h2 | — | 3. Modèle Officiel Microsoft de Licences par Cœur Physique |
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

- **H1** — Chapitre 1 — Architecture Système, Services d’Infrastructure Réseau & Modèle de Licence par Cœur
  - **H2** — 1. Architecture Interne du Système d’Exploitation Windows Server
      - **H4** — Les Deux Anneaux d’Exécution Privilégiée
      - **H4** — Server Core vs Expérience Utilisateur (GUI)
  - **H2** — 2. Services Réseau Fondamentaux : DHCP & Résolution DNS d’Infrastructure
      - **H4** — Architecture et Rôle du Serveur DHCP
      - **H4** — Zones DNS & Enregistrements SRV Active Directory
  - **H2** — 3. Modèle Officiel Microsoft de Licences par Cœur Physique
      - **H4** — Règles de Calcul par Cœur Physique
      - **H4** — Droits de Virtualisation : Standard vs Datacenter
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Validateur d’étendue DHCP, exclusions et conflits de réservation MAC
    - **H3** — Exercice 2 — Validateur de cohérence de zone DNS d’infrastructure (A, PTR, SRV)
    - **H3** — Exercice 3 — Simulateur de dimensionnement de licences Windows Server (Cœurs physiques vs VMs)
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
| Chapitre 2 — Annuaire d’Entreprise Active Directory (AD DS), Gouvernance AGDLP & Rôles FSMO | `chapitre2.html` | `b3-windows-server/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| En mode utilisateur Ring 3 |  | — | `opt` | — | actif | — |
| En mode noyau Ring 0 |  | — | `opt` | — | actif | data-correct=1 |
| Dans le sous-système Win32 |  | — | `opt` | — | actif | — |
| Directement dans le navigateur Edge |  | — | `opt` | — | actif | — |
| Permettre d’exécuter des jeux vidéo en 3D |  | — | `opt` | — | actif | — |
| Réduire la surface d’attaque logicielle et minimiser les vulnérabilités de sécurité |  | — | `opt` | — | actif | data-correct=1 |
| Rendre impossible l’accès via PowerShell |  | — | `opt` | — | actif | — |
| Désactiver totalement la mise en réseau |  | — | `opt` | — | actif | — |
| 4 cœurs |  | — | `opt` | — | actif | — |
| 8 cœurs |  | — | `opt` | — | actif | — |
| 16 cœurs |  | — | `opt` | — | actif | data-correct=1 |
| 32 cœurs |  | — | `opt` | — | actif | — |
| 1 seule machine virtuelle |  | — | `opt` | — | actif | — |
| 2 machines virtuelles |  | — | `opt` | — | actif | data-correct=1 |
| 4 machines virtuelles |  | — | `opt` | — | actif | — |
| Un nombre illimité de machines virtuelles |  | — | `opt` | — | actif | — |
| À bloquer l’accès à Internet des téléphones portables |  | — | `opt` | — | actif | — |
| À réserver des adresses de la plage pour des serveurs ou équipements statiques sans attrib |  | — | `opt` | — | actif | data-correct=1 |
| À forcer le chiffrement AES des paquets réseau |  | — | `opt` | — | actif | — |
| À désactiver le serveur DNS de l’entreprise |  | — | `opt` | — | actif | — |
| Enregistrement MX |  | — | `opt` | — | actif | — |
| Enregistrement TXT |  | — | `opt` | — | actif | — |
| Enregistrement SRV |  | — | `opt` | — | actif | data-correct=1 |
| Enregistrement CNAME |  | — | `opt` | — | actif | — |
| Résoudre un nom de domaine en adresse IPv4 |  | — | `opt` | — | actif | — |
| Résoudre une adresse IP en nom d’hôte complet (FQDN) via un enregistrement PTR |  | — | `opt` | — | actif | data-correct=1 |
| Changer le mot de passe de l’administrateur |  | — | `opt` | — | actif | — |
| Vider la corbeille de Windows |  | — | `opt` | — | actif | — |
| On achète 8 cœurs de licence |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `ws3-c1-e1` | analyse | 300 | active | `SCOPE net=192.168.1. start=10 end=20 EXCLUDE start=12 end=14 RESERVATION mac=00:11:22:33:44:01 ip=192.168.1.15 RESERVATION mac=00:11:22:33:44:02 ip=192.168.1.18` | Exercice 1 — Validateur d’étendue DHCP, exclusions et conflits de réservation MAC |
| `ws3-c1-e2` | analyse | 300 | active | `RECORD_A fqdn=dc01.corp.lan ip=192.168.1.10 RECORD_PTR ip=192.168.1.10 fqdn=dc01.corp.lan RECORD_SRV service=_ldap proto=_tcp port=389 target=dc01.corp.lan` | Exercice 2 — Validateur de cohérence de zone DNS d’infrastructure (A, PTR, SRV) |
| `ws3-c1-e3` | analyse | 300 | active | `SERVER nom=HOTE-PROD-01 sockets=2 cores_per_socket=8 vms=4` | Exercice 3 — Simulateur de dimensionnement de licences Windows Server (Cœurs physiques vs VMs) |

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
- Blocs `pre` : 3 · elements `code` : 9
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cpu`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3561 mots · 436 noeuds HTML

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
