# Chapitre 6 — Déploiement Linux Netfilter (iptables / nftables), Logs & Intégration SIEM

> Fiche extraite du fichier `b3-firewall/chapitres/chapitre6.html` (536 lignes, 38.9 Ko, sha256 `eab5777f02dc`).
> Famille : **cours-b3-firewall** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-firewall/chapitres/chapitre6.html` |
| Titre du document | Chapitre 6 — Déploiement Linux Netfilter (iptables / nftables), Logs &amp; Intégration SIEM \| Firewall & Sécurité Réseau B3 |
| Description meta | Chapitre 6 du cours Firewall & Sécurité Réseau B3 : Architecture du sous-système netfilter du noyau Linux, comparaison syntaxique iptables vs nftables, analyse statistique des logs pare-feu, détection de force brute et bannissement dynamique avec Fail2ban/SIEM. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Déploiement Linux Netfilter (iptables / nftables), Logs & Intégration SIEM |
| 3 | h2 | — | 1. L’Architecture Netfilter du Noyau Linux : Tables, Chaînes & Hooks |
| 4 | h2 | — | 2. Comparaison Pratique : iptables (Hérité) vs nftables (Moderne) |
| 5 | h2 | — | 3. Analyse des Journaux (Syslog) & Réponse Active SIEM / Fail2ban |
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

- **H1** — Chapitre 6 — Déploiement Linux Netfilter (iptables / nftables), Logs & Intégration SIEM
  - **H2** — 1. L’Architecture Netfilter du Noyau Linux : Tables, Chaînes & Hooks
      - **H4** — 1. Les Cinq Chaînes Standards (Hooks)
      - **H4** — 2. Les Tables Fonctionnelles
  - **H2** — 2. Comparaison Pratique : iptables (Hérité) vs nftables (Moderne)
  - **H2** — 3. Analyse des Journaux (Syslog) & Réponse Active SIEM / Fail2ban
      - **H4** — 1. Exploitation des Logs de Pare-feu
      - **H4** — 2. Bannissement Dynamique & SIEM / Fail2ban
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Compilateur de règles vers les syntaxes iptables et nftables
    - **H3** — Exercice 2 — Parseur et agrégateur statistique de journaux de pare-feu (Logs)
    - **H3** — Exercice 3 — Détecteur de force brute et bannissement dynamique (Fail2ban SIEM)
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
| Atelier de code | `../atelier.html` | `b3-firewall/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| La chaîne FORWARD |  | — | `opt` | — | actif | data-correct=1 |
| La chaîne INPUT |  | — | `opt` | — | actif | — |
| La chaîne OUTPUT |  | — | `opt` | — | actif | — |
| La chaîne PREROUTING |  | — | `opt` | — | actif | — |
| Une syntaxe unifiée pour IPv4/IPv6, des opérations atomiques et une exécution par bytecode |  | — | `opt` | — | actif | data-correct=1 |
| Il supprime totalement le besoin de configurer des adresses IP |  | — | `opt` | — | actif | — |
| Il remplace le protocole TCP par un protocole plus rapide |  | — | `opt` | — | actif | — |
| Il fonctionne uniquement sans connexion réseau |  | — | `opt` | — | actif | — |
| Parce que de nombreux démons locaux (ex: communication serveur web vers BDD locale) utilis |  | — | `opt` | — | actif | data-correct=1 |
| Pour permettre aux utilisateurs extérieurs de télécharger les logs |  | — | `opt` | — | actif | — |
| Pour éviter que la carte réseau physique ne chauffe trop |  | — | `opt` | — | actif | — |
| Pour activer automatiquement le mode Wi-Fi |  | — | `opt` | — | actif | — |
| POSTROUTING |  | — | `opt` | — | actif | data-correct=1 |
| PREROUTING |  | — | `opt` | — | actif | — |
| INPUT |  | — | `opt` | — | actif | — |
| FORWARD |  | — | `opt` | — | actif | — |
| Il surveille les logs d’authentification et ajoute dynamiquement l’adresse IP de l’attaqua |  | — | `opt` | — | actif | data-correct=1 |
| Il change automatiquement le mot de passe de l’administrateur à chaque attaque |  | — | `opt` | — | actif | — |
| Il redémarre le serveur Linux à chaque tentative de connexion échouée |  | — | `opt` | — | actif | — |
| Il envoie un message texte d’avertissement au pirate |  | — | `opt` | — | actif | — |
| La table filter |  | — | `opt` | — | actif | data-correct=1 |
| La table nat |  | — | `opt` | — | actif | — |
| La table mangle |  | — | `opt` | — | actif | — |
| La table raw |  | — | `opt` | — | actif | — |
| nft add element inet filter blacklist { IP } |  | — | `opt` | — | actif | data-correct=1 |
| nft remove table inet filter |  | — | `opt` | — | actif | — |
| nft delete rule all |  | — | `opt` | — | actif | — |
| nft shutdown network |  | — | `opt` | — | actif | — |
| La session SSH de l’administrateur est immédiatement coupée et il perd l’accès à distance |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `fw3-c6-e1` | analyse | 300 | active | `RULE chain=INPUT proto=tcp src=ANY dst=10.0.0.1 dport=22 target=ACCEPT` | Exercice 1 — Compilateur de règles vers les syntaxes iptables et nftables |
| `fw3-c6-e2` | analyse | 300 | active | `firewall: [DROP] IN=eth0 OUT= SRC=203.0.113.5 DST=10.0.0.1 PROTO=TCP SPT=45000 DPT=22 firewall: [ACCEPT] IN=eth0 OUT=eth1 SRC=192.168.1.10 DST=10.0.0.2 PROTO=TCP SPT=50000 DPT=80 firewall: [DROP] IN=eth0 OUT= SRC=203.0.113.5 DST=10.0.0.1 PROTO=TCP SPT=45001 DPT=22` | Exercice 2 — Parseur et agrégateur statistique de journaux de pare-feu (Logs) |
| `fw3-c6-e3` | analyse | 300 | active | `AUTH_FAIL ts=100 ip=203.0.113.50 service=ssh AUTH_FAIL ts=120 ip=203.0.113.50 service=ssh AUTH_FAIL ts=140 ip=203.0.113.50 service=ssh` | Exercice 3 — Détecteur de force brute et bannissement dynamique (Fail2ban SIEM) |

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
- Blocs `pre` : 3 · elements `code` : 81
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3386 mots · 529 noeuds HTML

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
