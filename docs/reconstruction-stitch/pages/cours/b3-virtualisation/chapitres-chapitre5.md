# Chapitre 5 — Haute Disponibilité, Clustering & Mobilité (HA, DRS & vMotion)

> Fiche extraite du fichier `b3-virtualisation/chapitres/chapitre5.html` (530 lignes, 42.2 Ko, sha256 `5e7ec607d782`).
> Famille : **cours-b3-virtualisation** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-virtualisation/chapitres/chapitre5.html` |
| Titre du document | Module 5 — Haute Disponibilité, Clustering & Mobilité (HA, DRS & vMotion) \| Virtualisation Avancée B3 |
| Description meta | Module 5 du cours Virtualisation Avancée B3 : Architecture vSphere HA (agents FDM, élection maître/esclave, heartbeats réseau & datastore, contrôle d'admission), équilibrage dynamique vSphere DRS (métriques de charge, seuils 1-5, règles d'affinité et anti-affinité), mobilité à chaud vMotion (pré-copie, dirty rate, convergence et pause de bascule) et Storage vMotion. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Haute Disponibilité, Clustering & Mobilité (HA, DRS & vMotion) |
| 3 | h2 | — | 1. Haute Disponibilité vSphere HA : Agents FDM, Élection & Double Heartbeat |
| 4 | h2 | — | 2. Contrôle d'Admission HA & Politiques de Basculement (Failover Capacity) |
| 5 | h2 | — | 3. Équilibrage Dynamique vSphere DRS & Règles d'Affinité / Anti-Affinité |
| 6 | h2 | — | 4. Mobilité à Chaud vMotion : Algorithme de Pré-Copie & Convergence |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Haute Disponibilité, Clustering & Mobilité (HA, DRS & vMotion)
  - **H2** — 1. Haute Disponibilité vSphere HA : Agents FDM, Élection & Double Heartbeat
      - **H4** — Architecture FDM (Fault Domain Manager)
      - **H4** — Double Canal de Surveillance (Heartbeat)
  - **H2** — 2. Contrôle d'Admission HA & Politiques de Basculement (Failover Capacity)
  - **H2** — 3. Équilibrage Dynamique vSphere DRS & Règles d'Affinité / Anti-Affinité
      - **H4** — Seuils de Migration & Métriques DRS
      - **H4** — Règles d'Affinité & d'Anti-Affinité
  - **H2** — 4. Mobilité à Chaud vMotion : Algorithme de Pré-Copie & Convergence
      - **H4** — Phases de l'Algorithme vMotion
      - **H4** — Équation de Convergence & SDPS
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Modèle simplifié de deux passes de pré-copie vMotion
    - **H3** — Exercice 2 — Calculateur d'Admission Control vSphere HA (Pourcentage de Cluster Réservé)
    - **H3** — Exercice 3 — Moteur de Recommandations DRS & Règles d'Anti-Affinité
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
| nav | `b3-virtualisationnav` | Portail → `/`<br>Virtualisation Avancée B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examen-blanc.html` |

Liens sortants : **22** (externes : 1).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Virtualisation Avancée B3 | `../index.html` | `b3-virtualisation/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-virtualisation/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-virtualisation/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-virtualisation/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-virtualisation/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-virtualisation/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-virtualisation/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-virtualisation/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-virtualisation/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-virtualisation/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-virtualisation/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-virtualisation/atelier.html` | interne |
| Examen | `../chapitres/examen-blanc.html` | `b3-virtualisation/chapitres/examen-blanc.html` | interne |
| documentation Broadcom pour vSphere 8.x | `https://knowledge.broadcom.com/external/article/436882/how-to-identify-vmotion-stun-time.html` | `https://knowledge.broadcom.com/external/article/436882/how-to-identify-vmotion-stun-time.html` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-virtualisation/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-virtualisation/chapitres/formules.html` | interne |
| Module 6 — Sauvegarde Avancée (CBT), Sécurité & Virtualisation du Poste de Travail (VDI) | `chapitre6.html` | `b3-virtualisation/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| En consultant les fichiers de heartbeat sur les datastores partagés en complément du heart |  | — | `opt` | — | actif | data-correct=1 |
| En envoyant un SMS automatique à l'administrateur du centre de données. |  | — | `opt` | — | actif | — |
| En mesurant la consommation électrique de l'onduleur de la salle serveurs. |  | — | `opt` | — | actif | — |
| En redémarrant immédiatement l'appliance vCenter Server sur le cloud. |  | — | `opt` | — | actif | — |
| Il redémarre les machines virtuelles qui tournaient sur cet hôte sur les autres serveurs s |  | — | `opt` | — | actif | data-correct=1 |
| Il synchronise les registres CPU en temps réel sans que la VM ne redémarre. |  | — | `opt` | — | actif | — |
| Il convertit automatiquement les disques des machines virtuelles au format Thin. |  | — | `opt` | — | actif | — |
| Il supprime l'ensemble des fichiers .vmx du datastore par mesure de sécurité. |  | — | `opt` | — | actif | — |
| Définir un pourcentage fixe de capacité CPU et mémoire réservée (Cluster resource percenta |  | — | `opt` | — | actif | data-correct=1 |
| Imposer une taille de slot fixe de 4 Go de RAM et 1 GHz de CPU. |  | — | `opt` | — | actif | — |
| Laisser le cluster sans aucune règle de contrôle d'admission. |  | — | `opt` | — | actif | — |
| Arrêter la moitié des VM chaque soir pour libérer de la mémoire. |  | — | `opt` | — | actif | — |
| Pour forcer deux VM redondantes (ex: 2 contrôleurs AD ou 2 serveurs web) à s'exécuter sur |  | — | `opt` | — | actif | data-correct=1 |
| Pour empêcher une machine virtuelle d'accéder à Internet en dehors des heures de bureau. |  | — | `opt` | — | actif | — |
| Pour fusionner la mémoire vive de deux VM distinctes dans un seul fichier .vswp. |  | — | `opt` | — | actif | — |
| Pour désactiver la carte réseau virtuelle en cas de détection d'un virus. |  | — | `opt` | — | actif | — |
| Le débit réseau effectif vMotion doit être supérieur au rythme de modification mémoire (Di |  | — | `opt` | — | actif | data-correct=1 |
| La taille de la RAM de la VM doit être strictement inférieure à 4 Go. |  | — | `opt` | — | actif | — |
| Le datastore doit obligatoirement être formaté en système de fichiers FAT32. |  | — | `opt` | — | actif | — |
| L'hôte source et l'hôte cible doivent posséder le même numéro de série constructeur. |  | — | `opt` | — | actif | — |
| Il ralentit temporairement l'exécution de la VM pour réduire son rythme d'écriture et favo |  | — | `opt` | — | actif | data-correct=1 |
| Il éteint brusquement la machine virtuelle sans sauvegarder les données. |  | — | `opt` | — | actif | — |
| Il bascule la liaison réseau en Wi-Fi pour contourner le commutateur physique. |  | — | `opt` | — | actif | — |
| Il duplique le fichier .vmx sur l'ensemble des datastores du datacenter. |  | — | `opt` | — | actif | — |
| L'émission d'une trame RARP pour rafraîchir immédiatement les tables CAM des commutateurs |  | — | `opt` | — | actif | data-correct=1 |
| La réinitialisation complète de toutes les cartes réseaux de l'entreprise. |  | — | `opt` | — | actif | — |
| La modification manuelle des entrées DNS sur le serveur Active Directory. |  | — | `opt` | — | actif | — |
| L'envoi d'un email de confirmation au compte administrateur vCenter. |  | — | `opt` | — | actif | — |
| vMotion migre l'état CPU et la mémoire vive entre hôtes ; Storage vMotion migre les fichie |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vrt3-c5-e1` | analyse | 300 | active | `VM=vm-web01 RAM_GB=16 DIRTY_RATE_MBPS=20 NET_GBPS=10 VM=vm-db01 RAM_GB=64 DIRTY_RATE_MBPS=50 NET_GBPS=1 VM=vm-cache RAM_GB=8 DIRTY_RATE_MBPS=150 NET_GBPS=1` | Exercice 1 — Modèle simplifié de deux passes de pré-copie vMotion |
| `vrt3-c5-e2` | analyse | 300 | active | `HOSTS=4 CPU_GHZ=40 RAM_GB=128 FAILURES=1 VMS_CPU=100 VMS_RAM=300 HOSTS=3 CPU_GHZ=50 RAM_GB=256 FAILURES=1 VMS_CPU=110 VMS_RAM=400` | Exercice 2 — Calculateur d'Admission Control vSphere HA (Pourcentage de Cluster Réservé) |
| `vrt3-c5-e3` | analyse | 300 | active | `HOSTS=esxi01:80,esxi02:30,esxi03:40 VMS=dc01:esxi01,dc02:esxi01,web:esxi02 ANTI_AFFINITY=dc01+dc02` | Exercice 3 — Moteur de Recommandations DRS & Règles d'Anti-Affinité |

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
- Blocs `pre` : 4 · elements `code` : 38
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-vm`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3850 mots · 528 noeuds HTML

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
