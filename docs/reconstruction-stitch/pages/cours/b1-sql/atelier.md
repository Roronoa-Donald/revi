# Atelier et simulateur SQL

> Fiche extraite du fichier `b1-sql/atelier.html` (235 lignes, 16.6 Ko, sha256 `7588766113db`).
> Famille : **cours-b1-sql** · sous-type : `atelier` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-sql/atelier.html` |
| Titre du document | Atelier et simulateur SQL \| SQL B1 |
| Description meta | Atelier SQL B1 : zone libre et simulateur SQLite local avec parc_auto, missions et mode examen. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Atelier et simulateur SQL |
| 3 | h2 | — | Zone libre |
| 4 | h2 | — | Simulateur SQL |
| 5 | h2 | — | Missions guidées |
| 6 | .lab | code lab | 1 bloc(s) |

## 3. Hierarchie des titres

- **H1** — Atelier et simulateur SQL
  - **H2** — Zone libre
    - **H3** — Zone libre — requêtes SQL
  - **H2** — Simulateur SQL
  - **H2** — Missions guidées

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `sqlnav` | Portail → `/`<br>SQL B1 → `index.html`<br>Sommaire → `sommaire.html`<br>Ch. 1 → `chapitres/chapitre1.html`<br>Ch. 2 → `chapitres/chapitre2.html`<br>Ch. 3 → `chapitres/chapitre3.html`<br>Ch. 4 → `chapitres/chapitre4.html`<br>Ch. 5 → `chapitres/chapitre5.html`<br>Ch. 6 → `chapitres/chapitre6.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `exercices/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/simulateur-examen.html` |

Liens sortants : **20** (externes : 1).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| SQL B1 | `index.html` | `b1-sql/index.html` | interne |
| Sommaire | `sommaire.html` | `b1-sql/sommaire.html` | interne |
| Ch. 1 | `chapitres/chapitre1.html` | `b1-sql/chapitres/chapitre1.html` | interne |
| Ch. 2 | `chapitres/chapitre2.html` | `b1-sql/chapitres/chapitre2.html` | interne |
| Ch. 3 | `chapitres/chapitre3.html` | `b1-sql/chapitres/chapitre3.html` | interne |
| Ch. 4 | `chapitres/chapitre4.html` | `b1-sql/chapitres/chapitre4.html` | interne |
| Ch. 5 | `chapitres/chapitre5.html` | `b1-sql/chapitres/chapitre5.html` | interne |
| Ch. 6 | `chapitres/chapitre6.html` | `b1-sql/chapitres/chapitre6.html` | interne |
| Cartes | `chapitres/cartes.html` | `b1-sql/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `b1-sql/chapitres/formules.html` | interne |
| Exercices | `exercices/exercices.html` | `b1-sql/exercices/exercices.html` | interne |
| Atelier | `atelier.html` | `b1-sql/atelier.html` | interne |
| Examen | `chapitres/simulateur-examen.html` | `b1-sql/chapitres/simulateur-examen.html` | interne |
| Chapitre 1 — Bases de données | `chapitres/chapitre1.html` | `b1-sql/chapitres/chapitre1.html` | interne |
| documentation officielle SQLite | `https://sqlite.org/docs.html` | `https://sqlite.org/docs.html` | externe |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Exécuter |  | sqlsim-run | `btn btn--primary` | — | actif | — |
| Réinitialiser la base |  | sqlsim-reset | `btn` | — | actif | — |
| Exporter en CSV |  | sqlsim-export | `btn` | — | actif | — |
| Résultat |  | sqlsim-tab-table | `sqlsim__tab is-active` | — | actif | — |
| Journal |  | sqlsim-tab-log | `sqlsim__tab` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `(zone libre)` | sql | 360 | active | `PRAGMA foreign_keys = ON; CREATE TABLE Marque (   codemarque TEXT NOT NULL PRIMARY KEY,   nommarque  TEXT NOT NULL UNIQUE,   paysmarque TEXT NOT NULL,   UNIQUE (codemarque, nommarque) ); CREATE TABLE Voiture (   immat     TEXT NOT NULL PRIMARY KEY,   marque    TEXT NOT NULL,   codemarque TEXT NOT NULL,   moteur    TEXT NOT NULL,   datecirc  TEXT,   km        INTEGER NOT NULL,   pxachat   INTEGER NOT NULL,   nbreplace INTEGER NOT NULL,   FOREIGN KEY (codemarque, marque) REFERENCES Marque (codemarque, nommarque) ); CREATE TABLE Equipement (   codeequipement TEXT NOT NULL PRIMARY KEY,   nomequipement TEXT NOT NULL UNIQUE,   prix INTEGER DEFAULT 0 ); CREATE TABLE VoitureEquipement (   immat TEXT NOT NULL,   codeequipement TEXT NOT NULL,   PRIMARY KEY (immat, codeequipement),   FOREIGN KEY (immat) REFERENCES Voiture (immat) ON DELETE CASCADE,   FOREIGN KEY (codeequipement) REFERENCES Equipement (codeequipement) ON DELETE CASCADE ); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('TOY','TOYOTA','JAPON'),('MIT','MITSUBISHI','JAPON'),('MAZ','MAZDA','JAPON'), ('NIS','NISSAN','JAPON'),('SUZ','SUZUKI','JAPON'),('BNZ','MERCEDES BENZ','ALLEMAGNE'), ('BMW','BMW','ALLEMAGNE'),('KIA','KIA','COREE DU SUD'),('HYU','HYUNDAI','COREE DU SUD'), ('REN','RENAULT','FRANCE'),('PEU','PEUGEOT','FRANCE'),('MG','MG','ROYAUME-UNI'); INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace) VALUES ('TG-7854-Z','MERCEDES BENZ','BNZ','DIESEL','2000-01-21',500,6000000,5), ('TG-6733-AB','MERCEDES BENZ','BNZ','DIESEL','2002-01-21',0,16000000,5), ('TG-2020-AC','MERCEDES BENZ','BNZ','ESSENCE','2003-03-21',0,9000000,5), ('TG-3733-AC','TOYOTA','TOY','HYBRIDE','2010-01-21',0,20000000,7), ('TG-6733-AC','MERCEDES BENZ','BNZ','DIESEL','2012-01-21',0,9600000,5), ('TG-5420-AF','SUZUKI','SUZ','ELECTRIQUE','2013-01-21',10000,21600000,5), ('TG-9420-AF','TOYOTA','TOY','ESSENCE','2013-09-21',0,50000000,7), ('TG-1200-AK','SUZUKI','SUZ','ELECTRIQUE','2014-01-21',0,11600000,5), ('TG-9420-AK','TOYOTA','TOY','ESSENCE','2014-09-21',100,50000000,7), ('TG-0020-AL','TOYOTA','TOY','DIESEL','2014-11-21',0,50000000,7), ('TG-4444-AL','HYUNDAI','HYU','ESSENCE','2015-09-21',5,10000000,5), ('TG-5420-AL','BMW','BMW','ESSENCE','2015-10-21',0,50000000,7), ('TG-0020-AV','MITSUBISHI','MIT','ESSENCE','2018-10-21',30,50000000,7), ('TG-0480-AV','BMW','BMW','ELECTRIQUE','2015-12-21',0,50000000,5), ('TG-1420-AW','MAZDA','MAZ','ESSENCE','2016-02-01',0,17000000,5), ('TG-2540-AW','KIA','KIA','ESSENCE','2016-10-21',0,50000000,7), ('TG-5220-BA','NISSAN','NIS','ESSENCE','2019-10-21',6700,10000000,5), ('TG-2222-BC','RENAULT','REN','DIESEL','2020-01-20',0,15000000,5), ('TG-3333-BC','PEUGEOT','PEU','ESSENCE','2021-03-15',0,20000000,5), ('TG-4444-BC','PEUGEOT','PEU','DIESEL','2021-06-10',25000,30000000,7), ('TG-5555-BC','MG','MG','ESSENCE','2022-08-01',0,20000000,5), ('TG-6666-BC','TOYOTA','TOY','HYBRIDE','2023-05-20',0,25000000,7), ('TG-7777-BC','HYUNDAI','HYU','ELECTRIQUE','2023-09-12',0,23000000,5); INSERT INTO Equipement (codeequipement, nomequipement, prix) VALUES ('AIR','Climatisation',0),('GPS','Navigation GPS',450000), ('CAM','Camera de recul',200000),('RAD','Autoradio',NULL); INSERT INTO VoitureEquipement (immat, codeequipement) VALUES ('TG-7854-Z','AIR'),('TG-3733-AC','AIR'),('TG-3733-AC','GPS'), ('TG-9420-AF','GPS'),('TG-0020-AV','CAM'),('TG-0480-AV','RAD');` | Zone libre — requêtes SQL |

- Encadres pedagogiques : 4 (`.box`, variantes `box--*`).

Etats et interactions a reconstruire :

- Zone libre `data-lab` avec code de depart, entree standard pre-remplie, console, tuteur IA.
- Execution uniquement au clic (ou Ctrl+Entree) ; bouton Stop pendant l'execution.
- Etats de statut : pret, execution, succes, erreur, delai depasse, quota, service indisponible.
- Encadres explicatifs et trois erreurs classiques.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 14 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-database`, `#i-target`, `#i-terminal`, `#i-play`, `#i-hourglass`, `#i-file`, `#i-compass`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~805 mots · 178 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`, `assets/css/sql-simulator.css`
- Scripts externes : `/assets/js/theme.js`, `assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`, `assets/vendor/sqljs/sql-wasm.js`, `assets/js/sql-simulator.js`
- Blocs `<style>` inline : 0 · scripts inline : 2

## 10. Classes et attributs data observes

Classes distinctes : 49. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 12 |
| `btn` | 5 |
| `box` | 4 |
| `box__title` | 4 |
| `is-active` | 2 |
| `lead` | 2 |
| `box--objectifs` | 2 |
| `btn--primary` | 2 |
| `sqlsim__tab` | 2 |
| `sqlsim__pane` | 2 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `sqlnav` | 1 |
| `sqlnav__in` | 1 |
| `sqlnav__home` | 1 |
| `sqlnav__sep` | 1 |
| `sqlnav__brand` | 1 |
| `sqlnav__links` | 1 |
| `sqlnav__actions` | 1 |
| `theme-toggle` | 1 |

Attributs `data-*` : `data-lab` (1), `data-language` (1), `data-height` (1), `data-languages` (1), `data-stdin` (1), `data-lab-starter` (1)

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
