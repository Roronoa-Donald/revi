# Chapitre 3 — Balayage Réseau, Énumération & Cartographie des Vulnérabilités (Scanning)

> Fiche extraite du fichier `b3-hacking/chapitres/chapitre3.html` (538 lignes, 40.4 Ko, sha256 `81ddee4ad403`).
> Famille : **cours-b3-hacking** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-hacking/chapitres/chapitre3.html` |
| Titre du document | Module 3 — Balayage Réseau, Énumération & Cartographie des Vulnérabilités (Scanning) \| Hacking Éthique & Pentest B3 |
| Description meta | Module 3 du cours Hacking Éthique & Pentest B3 : Mécanismes réseau TCP/IP et RFC 9293 (août 2022, remplaçant la RFC 793), techniques de scan de ports avancées avec Nmap (TCP Connect, SYN Stealth, UDP, scans furtifs FIN/Null/Xmas, ACK mapping de pare-feu), détection d'OS par fingerprinting TCP et analyse des options de paquets, énumération de protocoles d'infrastructure (SMB, NetBIOS, SNMP v1/v2c, LDAP, SSH), et cartographie des vulnérabilités via Nmap Scripting Engine (NSE) et scanners automatisés. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 3 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 3 — Balayage Réseau, Énumération & Cartographie des Vulnérabilités (Scanning) |
| 3 | h2 | — | 1. Référence TCP actuelle et portée des observations |
| 4 | h2 | — | 2. Mécanismes réseau TCP/IP au cœur du balayage |
| 5 | h2 | — | 3. Techniques Avancées de Sondes Nmap & Cartographie de Pare-Feu |
| 6 | h2 | — | 4. Empreinte de Système d'Exploitation (OS Fingerprinting) & Détection de Versions |
| 7 | h2 | — | 5. Énumération Approfondie des Protocoles d'Infrastructure : SMB & SNMP |
| 8 | h2 | — | 6. Nmap Scripting Engine (NSE) & Cartographie des Vulnérabilités |
| 9 | h2 | — | 7. Études de cas & applications pratiques |
| 10 | h2 | — | 8. QCM — niveau examen |
| 11 | h2 | — | 9. Erreurs classiques — récapitulatif |
| 12 | h2 | — | 10. Méthodologie de résolution |
| 13 | h2 | — | 11. Révision active |
| 14 | h2 | — | 12. Test de maîtrise |
| 15 | .lab | code lab | 3 bloc(s) |
| 16 | .qcm | QCM | 8 question(s) |
| 17 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 3 — Balayage Réseau, Énumération & Cartographie des Vulnérabilités (Scanning)
  - **H2** — 1. Référence TCP actuelle et portée des observations
  - **H2** — 2. Mécanismes réseau TCP/IP au cœur du balayage
      - **H4** — Connexion TCP Normale (3-Way Handshake)
      - **H4** — Port Fermé ou Non Écouté
  - **H2** — 3. Techniques Avancées de Sondes Nmap & Cartographie de Pare-Feu
  - **H2** — 4. Empreinte de Système d'Exploitation (OS Fingerprinting) & Détection de Versions
      - **H4** — OS Fingerprinting (-O)
      - **H4** — Détection de Version de Service (-sV)
  - **H2** — 5. Énumération Approfondie des Protocoles d'Infrastructure : SMB & SNMP
      - **H4** — Protocole SMB / Samba (Ports 139 / 445)
      - **H4** — Protocole SNMP (Port 161 UDP)
  - **H2** — 6. Nmap Scripting Engine (NSE) & Cartographie des Vulnérabilités
  - **H2** — 7. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Interpréteur de Drapeaux TCP et Diagnostic de Sondes de Scan
    - **H3** — Exercice 2 — Analyseur de Bannières de Services Réseau et Détection de Failles Connues
    - **H3** — Exercice 3 — Recherche simulée dans une liste de communautés SNMP
  - **H2** — 8. QCM — niveau examen
  - **H2** — 9. Erreurs classiques — récapitulatif
  - **H2** — 10. Méthodologie de résolution
  - **H2** — 11. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 12. Test de maîtrise

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
| Module 4 — Exploitation des Vulnérabilités Web (OWASP Top 10 & Injection) | `chapitre4.html` | `b3-hacking/chapitres/chapitre4.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Parce qu'il envoie un paquet RST immédiatement après avoir reçu le SYN+ACK sans jamais env |  | — | `opt` | — | actif | data-correct=1 |
| Parce qu'il chiffre l'intégralité des paquets transmis avec une clé AES 256 bits |  | — | `opt` | — | actif | — |
| Parce qu'il masque l'adresse IP de l'auditeur en usurpant automatiquement celle de la pass |  | — | `opt` | — | actif | — |
| Parce qu'il utilise exclusivement des ports sources inférieurs à 1024 |  | — | `opt` | — | actif | — |
| Un paquet TCP avec le drapeau RST (ou RST+ACK) |  | — | `opt` | — | actif | data-correct=1 |
| Un paquet ICMP Echo Reply (Type 0) |  | — | `opt` | — | actif | — |
| Aucune réponse (Timeout silencieux) |  | — | `opt` | — | actif | — |
| Un paquet TCP SYN+ACK |  | — | `opt` | — | actif | — |
| TTL 64 pour Linux contre TTL 128 pour Windows |  | — | `opt` | — | actif | data-correct=1 |
| TTL 255 pour Linux contre TTL 32 pour Windows |  | — | `opt` | — | actif | — |
| TTL 128 pour Linux contre TTL 64 pour Windows |  | — | `opt` | — | actif | — |
| Le TTL est strictement identique sur tous les systèmes d'exploitation |  | — | `opt` | — | actif | — |
| Cartographier les règles de pare-feu et déterminer s'il s'agit d'un pare-feu avec état (St |  | — | `opt` | — | actif | data-correct=1 |
| Identifier les versions des logiciels serveurs web |  | — | `opt` | — | actif | — |
| Déchiffrer les communications HTTPS en cours |  | — | `opt` | — | actif | — |
| Énumérer les utilisateurs du domaine Active Directory |  | — | `opt` | — | actif | — |
| Parce que la pile TCP de Windows ne respecte pas la RFC 793 et répond systématiquement par |  | — | `opt` | — | actif | data-correct=1 |
| Parce que Windows bloque physiquement la carte réseau dès qu'un paquet suspect est détecté |  | — | `opt` | — | actif | — |
| Parce que ces scans exigent le protocole IPv6 qui est désactivé sous Windows |  | — | `opt` | — | actif | — |
| Parce que Nmap refuse d'exécuter ces scans sur des systèmes Windows |  | — | `opt` | — | actif | — |
| Un attaquant peut interroger la base MIB et extraire la liste complète des processus, inte |  | — | `opt` | — | actif | data-correct=1 |
| Le serveur est immédiatement formaté et rendu inaccessible |  | — | `opt` | — | actif | — |
| Les clés privées SSH du serveur sont écrites en clair sur le port série |  | — | `opt` | — | actif | — |
| Aucun risque, la communauté public est chiffrée par défaut |  | — | `opt` | — | actif | — |
| Une connexion établie anonymement sans nom d'utilisateur ni mot de passe permettant d'énum |  | — | `opt` | — | actif | data-correct=1 |
| Une coupure brutale de la connexion réseau par le pare-feu |  | — | `opt` | — | actif | — |
| Une session dont les données ont été corrompues par des zéros binaires |  | — | `opt` | — | actif | — |
| Une commande de redémarrage automatique du contrôleur de domaine |  | — | `opt` | — | actif | — |
| --script vuln |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `hk3-c3-e1` | analyse | 300 | active | `TCP_PROBE scan_type=SYN port=443 reply=SYN+ACK` | Exercice 1 — Interpréteur de Drapeaux TCP et Diagnostic de Sondes de Scan |
| `hk3-c3-e2` | analyse | 300 | active | `BANNER_SCAN port=21 service=ftp banner=220 (vsFTPd 2.3.4)` | Exercice 2 — Analyseur de Bannières de Services Réseau et Détection de Failles Connues |
| `hk3-c3-e3` | analyse | 300 | active | `SNMP_TEST target=192.168.1.1 wordlist=public,private,cisco,admin target_community=public target_perm=RO sys_descr=Cisco_IOS_Software_C2960` | Exercice 3 — Recherche simulée dans une liste de communautés SNMP |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 4 · elements `code` : 79
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3557 mots · 531 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
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
