# Chapitre 4 — Fondamentaux des WAN et du routage IP

> Fiche extraite du fichier `b1-ccna1/chapitres/chapitre4.html` (458 lignes, 27.2 Ko, sha256 `8b7831cd90a2`).
> Famille : **cours-b1-ccna1** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1-ccna1/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Fondamentaux des WAN et du routage IP \| CCNA 1 B1 |
| Description meta | Chapitre 4 du cours de CCNA 1 B1 : WAN de lignes louées (HDLC) et Ethernet WAN (EoMPLS) ; la logique de routage en quatre étapes ; règles des sous-réseaux ; l'en-tête IP ; comment les protocoles de routage apprennent les routes. Théorie, exemples détaillés, études de cas d’application, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B1 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Fondamentaux des WAN et du routage IP |
| 3 | h2 | — | 1. Les WAN : lignes louées et Ethernet |
| 4 | h2 | — | 2. Sous-réseaux, en-tête IP et protocoles de routage |
| 5 | h2 | — | 3. Études de cas & applications pratiques |
| 6 | h2 | — | 4. QCM — niveau examen |
| 7 | h2 | — | 5. Erreurs classiques — récapitulatif |
| 8 | h2 | — | 6. Méthodologie de résolution |
| 9 | h2 | — | 7. Révision active |
| 10 | h2 | — | 8. Test de maîtrise |
| 11 | .lab | code lab | 3 bloc(s) |
| 12 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Fondamentaux des WAN et du routage IP
  - **H2** — 1. Les WAN : lignes louées et Ethernet
  - **H2** — 2. Sous-réseaux, en-tête IP et protocoles de routage
  - **H2** — 3. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Comparer des sous-réseaux IPv4
    - **H3** — Exercice 2 — Les quatre étapes du routage
    - **H3** — Exercice 3 — Les trois protocoles de routage apprennent
  - **H2** — 4. QCM — niveau examen
  - **H2** — 5. Erreurs classiques — récapitulatif
  - **H2** — 6. Méthodologie de résolution
  - **H2** — 7. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 8. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `ccnav` | Portail → `/`<br>CCNA 1 B1 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../exercices/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/simulateur-examen.html` |

Liens sortants : **24** (externes : 3).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| CCNA 1 B1 | `../index.html` | `b1-ccna1/index.html` | interne |
| Sommaire | `../sommaire.html` | `b1-ccna1/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b1-ccna1/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b1-ccna1/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b1-ccna1/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b1-ccna1/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b1-ccna1/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b1-ccna1/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b1-ccna1/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b1-ccna1/chapitres/formules.html` | interne |
| Exercices | `../exercices/exercices.html` | `b1-ccna1/exercices/exercices.html` | interne |
| Atelier | `../atelier.html` | `b1-ccna1/atelier.html` | interne |
| Examen | `../chapitres/simulateur-examen.html` | `b1-ccna1/chapitres/simulateur-examen.html` | interne |
| RFC 791, IPv4 | `https://www.rfc-editor.org/rfc/rfc791` | `https://www.rfc-editor.org/rfc/rfc791` | externe |
| RFC 1122, réseaux logiques multiples | `https://www.rfc-editor.org/rfc/rfc1122` | `https://www.rfc-editor.org/rfc/rfc1122` | externe |
| RFC 1812, routeurs IPv4 | `https://www.rfc-editor.org/rfc/rfc1812` | `https://www.rfc-editor.org/rfc/rfc1812` | externe |
| Réviser avec les flashcards | `cartes.html` | `b1-ccna1/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b1-ccna1/chapitres/formules.html` | interne |
| Chapitre 5 — L'interface en ligne de commande | `chapitre5.html` | `b1-ccna1/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| HDLC |  | — | `opt` | — | actif | data-correct=1 |
| EoMPLS |  | — | `opt` | — | actif | — |
| ARP |  | — | `opt` | — | actif | — |
| chercher la route |  | — | `opt` | — | actif | — |
| vérifier le FCS |  | — | `opt` | — | actif | data-correct=1 |
| encapsuler |  | — | `opt` | — | actif | — |
| Comparer les adresses et leurs masques ou préfixes |  | — | `opt` | — | actif | data-correct=1 |
| Supposer qu'elles sont toujours dans le même sous-réseau |  | — | `opt` | — | actif | — |
| Vérifier uniquement leur adresse MAC |  | — | `opt` | — | actif | — |
| 20 à 60 octets selon les options |  | — | `opt` | — | actif | data-correct=1 |
| toujours 20 octets |  | — | `opt` | — | actif | — |
| toujours 64 octets |  | — | `opt` | — | actif | — |
| Le TTL diminue et la somme de contrôle est recalculée |  | — | `opt` | — | actif | data-correct=1 |
| Il reste intégralement inchangé |  | — | `opt` | — | actif | — |
| Il est toujours supprimé |  | — | `opt` | — | actif | — |
| une métrique |  | — | `opt` | — | actif | data-correct=1 |
| un hasard |  | — | `opt` | — | actif | — |
| l'alphabet |  | — | `opt` | — | actif | — |
| son routeur par défaut |  | — | `opt` | — | actif | data-correct=1 |
| son switch |  | — | `opt` | — | actif | — |
| le serveur DNS |  | — | `opt` | — | actif | — |
| apprendre la MAC d'un hôte IP du LAN |  | — | `opt` | — | actif | data-correct=1 |
| router entre sous-réseaux |  | — | `opt` | — | actif | — |
| chiffrer SSH |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `cc-c4-e1` | analyse | 300 | active | `2 meme 192.0.2.1 192.0.2.2 /24 autre 192.0.2.1 192.0.3.1 /24` | Exercice 1 — Comparer des sous-réseaux IPv4 |
| `cc-c4-e2` | analyse | 300 | active | `3 1 fcs 2 desencapsule 4 encapsule` | Exercice 2 — Les quatre étapes du routage |
| `cc-c4-e3` | analyse | 300 | active | `3 R1 150.150.4.0 R2 150.150.4.0 R3 150.150.4.0` | Exercice 3 — Les trois protocoles de routage apprennent |

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

- Tableaux : 0
- Blocs `pre` : 3 · elements `code` : 14
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-globe`, `#i-play`, `#i-target`, `#i-pin`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2223 mots · 372 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 64. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 24 |
| `ic` | 20 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
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
| `lab__formative-notice` | 3 |

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
