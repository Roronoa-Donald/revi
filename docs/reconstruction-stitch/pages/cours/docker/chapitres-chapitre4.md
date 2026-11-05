# Chapitre 4 — Cycle de Vie des Conteneurs, Réseau & Stockage

> Fiche extraite du fichier `docker/chapitres/chapitre4.html` (557 lignes, 38.6 Ko, sha256 `ddd1dc664e29`).
> Famille : **cours-docker** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/docker/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Cycle de Vie des Conteneurs, Réseau &amp; Stockage \| Docker B2 |
| Description meta | Chapitre 4 du cours Docker B2 : Machine à états finis des conteneurs, pilotage en ligne de commande (run, exec, stop, rm), redirection de ports (NAT iptables), modes réseau (bridge, host, none, DNS interne à 127.0.0.11), et stratégies de persistance des données (Volumes nommés, Bind Mounts, Tmpfs). Notions fondamentales, ateliers de simulation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B2 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Cycle de Vie des Conteneurs, Réseau & Stockage |
| 3 | h2 | — | 1. Machine à États Finis et Commandes du Cycle de Vie |
| 4 | h2 | — | 2. Réseaux Docker, Port Mapping et DNS Intégré |
| 5 | h2 | — | 3. Persistance des Données : Volumes Nommés vs Bind Mounts vs Tmpfs |
| 6 | h2 | — | 4. Commandes d’Exécution et Diagnostic en Production |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 2 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Cycle de Vie des Conteneurs, Réseau & Stockage
  - **H2** — 1. Machine à États Finis et Commandes du Cycle de Vie
  - **H2** — 2. Réseaux Docker, Port Mapping et DNS Intégré
      - **H4** — Bridge Network (Par Défaut)
      - **H4** — Host Network (--network=host)
      - **H4** — None Network (--network=none)
  - **H2** — 3. Persistance des Données : Volumes Nommés vs Bind Mounts vs Tmpfs
  - **H2** — 4. Commandes d’Exécution et Diagnostic en Production
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Gestionnaire d’états du cycle de vie d’un conteneur
    - **H3** — Exercice 2 — Simulateur de redirection de ports (Port Mapping NAT) et conflits
    - **H3** — Exercice 3 — Audit de persistance des données : Volumes nommés vs Bind Mounts vs Tmpfs
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
| nav | `dockernav` | Portail → `/`<br>Docker B2 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Docker B2 | `../index.html` | `docker/index.html` | interne |
| Sommaire | `../sommaire.html` | `docker/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `docker/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `docker/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `docker/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `docker/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `docker/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `docker/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `docker/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `docker/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `docker/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `docker/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `docker/chapitres/simulateur-examen.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `docker/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `docker/chapitres/formules.html` | interne |
| Chapitre 5 — Orchestration avec Docker Compose | `chapitre5.html` | `docker/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| SIGKILL (9) |  | — | `opt` | — | actif | — |
| SIGTERM (15) |  | — | `opt` | — | actif | data-correct=1 |
| SIGHUP (1) |  | — | `opt` | — | actif | — |
| SIGINT (2) |  | — | `opt` | — | actif | — |
| Parce que le bridge par défaut désactive la connexion Internet |  | — | `opt` | — | actif | — |
| Parce que les réseaux personnalisés intègrent un serveur DNS interne permettant la résolut |  | — | `opt` | — | actif | data-correct=1 |
| Parce que le bridge personnalisé est deux fois plus rapide en calcul mathématique |  | — | `opt` | — | actif | — |
| Parce que le bridge par défaut est payant |  | — | `opt` | — | actif | — |
| Dans le BIOS de la carte mère |  | — | `opt` | — | actif | — |
| Dans le répertoire interne géré par le démon Docker à l’emplacement « /var/lib/docker/volu |  | — | `opt` | — | actif | data-correct=1 |
| Dans le dossier Téléchargements de l’utilisateur |  | — | `opt` | — | actif | — |
| Sur une clé USB externe |  | — | `opt` | — | actif | — |
| -v 8080:80 |  | — | `opt` | — | actif | — |
| -p 8080:80 |  | — | `opt` | — | actif | data-correct=1 |
| --expose 8080:80 |  | — | `opt` | — | actif | — |
| -net 8080:80 |  | — | `opt` | — | actif | — |
| docker run -it mon_conteneur |  | — | `opt` | — | actif | — |
| docker exec -it mon_conteneur /bin/sh |  | — | `opt` | — | actif | data-correct=1 |
| docker attach mon_conteneur |  | — | `opt` | — | actif | — |
| docker inspect mon_conteneur |  | — | `opt` | — | actif | — |
| Les données sont stockées sur un serveur distant en Chine |  | — | `opt` | — | actif | — |
| Les données sont écrites exclusivement dans la mémoire vive RAM de l’hôte et disparaissent |  | — | `opt` | — | actif | data-correct=1 |
| Les données sont compressées au format MP3 |  | — | `opt` | — | actif | — |
| Le disque dur est formaté |  | — | `opt` | — | actif | — |
| En ajoutant le suffixe « :ro » à la fin de la déclaration (ex: -v /etc/config:/app/config: |  | — | `opt` | — | actif | data-correct=1 |
| En supprimant le fichier après l’avoir monté |  | — | `opt` | — | actif | — |
| En désactivant le pare-feu Linux |  | — | `opt` | — | actif | — |
| En passant le conteneur en mode root |  | — | `opt` | — | actif | — |
| docker view |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `dk2-c4-e1` | shell | 300 | suspendue | `create start pause unpause stop rm` | Exercice 1 — Gestionnaire d’états du cycle de vie d’un conteneur |
| `dk2-c4-e2` | shell | 300 | suspendue | `web_nginx 8080:80 api_node 3000:3000 autre_nginx 8080:80` | Exercice 2 — Simulateur de redirection de ports (Port Mapping NAT) et conflits |
| `dk2-c4-e3` | shell | 300 | suspendue | `-v db_data:/var/lib/mysql -v /etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro --tmpfs /tmp` | Exercice 3 — Audit de persistance des données : Volumes nommés vs Bind Mounts vs Tmpfs |

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

- Tableaux : 2 (0 lignes / 3 en-tetes ; 0 lignes / 4 en-tetes)
- Blocs `pre` : 6 · elements `code` : 95
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-blocks`, `#i-play`, `#i-target`, `#i-info`, `#i-terminal`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3348 mots · 560 noeuds HTML

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
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `card` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |

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
