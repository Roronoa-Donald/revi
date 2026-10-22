# Rapport d'Audit Pédagogique — `b3-pfsense` (pfSense & Routage · B3)

- **Identifiant / Slug** : `b3-pfsense`
- **Niveau académique** : B3 (6 chapitres)
- **Fichiers lus** : **13 / 13 fichiers HTML lus intégralement (0 fichier « NON LU »)**
- **Langage(s) des ateliers dans le HTML** : `analyse`
- **Prérequis déclarés** : Aucun encadré de prérequis pédagogiques déclaré
- **Prérequis réels déduits** : ccna (B2), b3-firewall, b3-cryptographie (placé au S2 !), b3-reseau-lan
- **Diagnostic topologique (Phase 1)** : Exige CIDR, VLAN 802.1Q, NAT, états TCP, et au Ch. 5 PKI X.509/IPsec enseignés au S2 dans b3-cryptographie !
- **Registre de concepts (`audit/registres/b3-pfsense.csv`)** : 462 termes techniques recensés (148 définis avant/à la 1re occurrence, **17 définis après (`D2`)**, **284 jamais définis (`D1/D4/D6`)**, 13 définis dans un autre cours)
- **Score moyen C1–C14** : **14.0 / 42 (33.3 %)**
- **Verdict global** : **À RÉÉCRIRE (33.3 % — < 70 %)**

## 1. Grille d'Évaluation C1–C14 par Chapitre (Phase 3)

| # | Critère | Ch.1 | Ch.2 | Ch.3 | Ch.4 | Ch.5 | Ch.6 | Moyenne |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1** | Mise en situation concrète, cohérente, qui donne envie et du sens | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C2** | Objectifs mesurables (verbes d’action), tous couverts par le chapitre | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C3** | Prérequis explicites et réellement acquis | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C4** | Ordre d’introduction : zéro référence en avant, zéro boucle | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C5** | Définitions précises, accompagnées d’un exemple, sans terme inconnu | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C6** | Exemples résolus avant les exercices, progression des difficultés | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C7** | Charge cognitive : dosage, segmentation, phrases claires | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C8** | Cohérence interne (notations, terminologie, chiffres, consignes) | 0/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **0.8/3** |
| **C9** | Exercices préparés par le cours, énoncés non ambigus, format d’entrée/sortie explicite, indices utiles sans spoiler | 0/3 | 1/3 | 0/3 | 1/3 | 0/3 | 1/3 | **0.5/3** |
| **C10** | QCM : testent la compréhension, distracteurs plausibles, explications, zéro ambiguïté | 1/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **1.8/3** |
| **C11** | Auto-évaluation : seuils complets et cohérents, checklist = objectifs, tuteur pertinent | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C12** | Exactitude technique (signalée, jamais supposée) | 1/3 | 2/3 | 2/3 | 2/3 | 2/3 | 2/3 | **1.8/3** |
| **C13** | Cohérence avec cartes, mémo, examens du même cours | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | 1/3 | **1.0/3** |
| **C14** | Rendu propre (pas d’artefacts, de liens cassés, de texte manquant) | 0/3 | 0/3 | 0/3 | 1/3 | 1/3 | 1/3 | **0.5/3** |
| **Total** | **Score sur 42 (et %)** | **8/42** (19.0%) | **15/42** (35.7%) | **14/42** (33.3%) | **16/42** (38.1%) | **15/42** (35.7%) | **16/42** (38.1%) | **14.0/42 (33.3%)** |

## 2. Liste des Constats Pédagogiques, Techniques et d'Interface (Modèle Annexe B)

### `PFSENSE-B3-CH1-001` — D8 (Gravité : **S0**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L76`
- **Extrait (≤ 15 mots)** : « calculer et valider les plans d’adressage IPv4/IPv6 en notation CIDR »
- **Pourquoi un novice bute** : Objectif pédagogique et item de checklist (L445) totalement non tenus : aucune section du Chapitre 1 n’explique la notation CIDR (longueur de préfixe `/n`, calcul du masque, adresse réseau, adresse de diffusion, nombre d’hôtes), et l’IPv6 n’est abordé à aucun endroit du chapitre.
- **Preuve** : Objectif 4 à L76 et checklist L445 vs sections théoriques 1, 2 et 3 (L82-151) qui ne contiennent ni explication CIDR ni mention d’IPv6.
- **Correction minimale proposée** : Ajouter une sous-section dédiée au calcul de sous-réseaux CIDR IPv4 et IPv6 avec exemple résolu pas à pas (ou retirer IPv6 de l’objectif et inclure un rappel structuré du calcul CIDR avec renvoi au cours CCNA).
- **Effort** : `M` | **Dépendances** : `aucune`

### `PFSENSE-B3-CH1-002` — D6 (Gravité : **S0**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L161,L189-203`
- **Extrait (≤ 15 mots)** : « Règles de calcul (avec le module ipaddress) … IFACE_CONFIG iface=lan »
- **Pourquoi un novice bute** : L’exercice 1 exige le module Python `ipaddress` (`ipaddress.ip_interface(ip_str)`, `.network`, `.network_address`, `.broadcast_address`, `.num_addresses`) qui n’est jamais présenté dans le cours, un calcul CIDR non enseigné dans le chapitre, et un format d’entrée ad hoc (`IFACE_CONFIG iface=lan ip=192.168.1.1/24`) sans préciser comment le programme le reçoit.
- **Preuve** : Énoncé L189-193 et indices L202-203 de `chapitre1.html` ; absence totale de `ipaddress` dans les sections de cours L82-151.
- **Correction minimale proposée** : Enseigner explicitement l’usage de `ipaddress` avec un exemple résolu complet dans le cours (ou remplacer l’exercice par une vraie activité de plan d’adressage et de configuration pfSense préparée par la théorie).
- **Effort** : `M` | **Dépendances** : `PFSENSE-B3-CH1-001`

### `PFSENSE-B3-CH1-003` — D6 / D7 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L240-245`
- **Extrait (≤ 15 mots)** : « Syntax : {action} in on {iface} [proto {proto}] from {src} to {dst} »
- **Pourquoi un novice bute** : L’exercice 2 demande de convertir une règle WebGUI en directive native `pf.conf` (`pass in on lan proto tcp from 192.168.1.0/24 to any port 443`), alors que la grammaire de `pf.conf` (`pass`/`block`, direction `in`/`out`, mot-clé `on`, clauses `proto`, `from ... to ...`, `port`) n’est jamais enseignée dans le chapitre.
- **Preuve** : Énoncé L240-245 vs Section 1 (L82-105) qui cite uniquement `/tmp/rules.debug` sans jamais montrer une seule règle `pf.conf`.
- **Correction minimale proposée** : Ajouter dans la Section 1 un encadré présentant la structure syntaxique d’une règle `pf.conf` avec un exemple commenté élément par élément avant les exercices.
- **Effort** : `S` | **Dépendances** : `aucune`

### `PFSENSE-B3-CH1-004` — D4 / D1 / D2 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L66,L88-92,L126-148`
- **Extrait (≤ 15 mots)** : « m0n0wall … mbuf … BPF … double NAT … RRSIG … Option 66/67 »
- **Pourquoi un novice bute** : Accumulation de termes techniques et d’acronymes parachutés sans définition réelle : `m0n0wall` (L66), contrôleurs `igb`/`em`/`vtnet` (L88), `BPF` défini à l’aide de `trames` et `tcpdump` non expliqués (L90), `mbuf` défini par « tampons de mémoire noyau » sans explication (L92), `ISC DHCPD / Kea` (L134), `NTP` et `PXE TFTP (option 66/67)` (L139), `Cache Poisoning` et `RRSIG` (L146), `Active Directory` (L148), ainsi que des distracteurs de QCM non vus (`eBPF / XDP` L327, `WFP` L326, `DoH` L394). S’y ajoutent des références en avant : `états de connexion` / `stateful` (L66, enseigné au Ch. 2), `double NAT` (L126, NAT enseigné au Ch. 3) et `DMZ` (L121, enseignée au Ch. 4).
- **Preuve** : Registre `audit/registres/b3-pfsense.csv` : 18 termes `jamais_défini` (D1/D4) et 9 termes `défini_après` (D2) au seul Chapitre 1.
- **Correction minimale proposée** : Définir en mots simples chaque terme conservé à sa première occurrence, retirer le jargon non mobilisé par la suite (`m0n0wall`, `mbuf`, `option 66/67`, `RRSIG`) et ajouter des renvois explicites (« voir chapitre 2/3/4 ») pour `stateful`, `NAT` et `DMZ`.
- **Effort** : `M` | **Dépendances** : `aucune`

### `PFSENSE-B3-CH1-005` — D8 (Gravité : **S0**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L78,L155-204`
- **Extrait (≤ 15 mots)** : « Complétez chaque grille d’analyse … critère par critère » vs « module ipaddress »
- **Pourquoi un novice bute** : Contradiction frontale créée par la migration partielle `remediate-26-exercises.js` : l’objectif 6 (L78) annonce « développer en Python 3 », les énoncés (L189, L241) et les indices (L202, L254, L310) donnent des instructions de code Python (`ipaddress.ip_interface(ip_str)`, `ip in net`), mais l’introduction de la section 4 (L155) et l’éditeur (`data-language="analyse"`, L159) imposent une « grille d’analyse » en texte statique où tout code Python échoue à la validation. De plus, l’énoncé dit « Analysez les paramètres du problème pour chaque cas » (L188) alors qu’un seul « Cas d’exemple » (L195) est affiché dans la fiche.
- **Preuve** : L78, L155, L159-177, L188-204 de `b3-pfsense/chapitres/chapitre1.html` et `scripts/remediate-26-exercises.js:L28`.
- **Correction minimale proposée** : Choisir un mode unique et cohérent : soit restaurer `data-language="python"` avec un code de départ Python pré-rempli gérant l’entrée/sortie pour que l’élève ne code que la logique réseau, soit réécrire intégralement les objectifs, énoncés et indices en études de cas d’architecture pfSense sans aucune mention de Python ni de `ipaddress`.
- **Effort** : `M` | **Dépendances** : `PFSENSE-B3-CH1-002`

### `PFSENSE-B3-CH1-006` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L308-313`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots » (suivi de 3 items `<li>`)
- **Pourquoi un novice bute** : Le bouton `<summary>` de l’exercice 3 annonce « Deux indices, rédigés en mots » (L308), mais la liste numérotée `<ol>` qui suit affiche trois indices (L310-312), contenant en outre du code Python (`ipaddress.ip_network(subnet)`, `ip in net`, `start <= static <= end`).
- **Preuve** : Lignes 308 à 313 de `b3-pfsense/chapitres/chapitre1.html`.
- **Correction minimale proposée** : Générer dynamiquement le libellé du `<summary>` dans `scripts/generate-code-labs.js` selon `ex.hints.length` (ou regrouper en 2 indices véritablement rédigés en mots).
- **Effort** : `XS` | **Dépendances** : `aucune`

### `PFSENSE-B3-CH1-007` — D12 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L191`
- **Extrait (≤ 15 mots)** : « usable_hosts = net.num_addresses - 2 (si prefix < 31, sinon 0) »
- **Pourquoi un novice bute** : Erreur technique et factuelle double : (1) Sur le plan des standards réseau, la RFC 3021 (« Using 31-Bit Prefixes on IPv4 Point-to-Point Links ») définit qu’un sous-réseau `/31` possède **2 adresses d’hôtes utilisables** sur une liaison point-à-point (et un `/32` représente **1 adresse d’hôte** unique / route d’hôte, pas 0) ; (2) Sur le plan du module Python `ipaddress` exigé à la ligne 189, la documentation officielle de `IPv4Network.hosts()` stipule explicitement que `list(ip_network("192.0.2.0/31").hosts())` renvoie **2 hôtes** et que `list(ip_network("192.0.2.1/32").hosts())` renvoie **1 hôte**.
- **Preuve** : L191 de `chapitre1.html` confrontée à l’IETF RFC 3021 (https://www.rfc-editor.org/info/rfc3021/) et à la documentation officielle Python 3 `ipaddress.IPv4Network.hosts()` (https://docs.python.org/fr/3/library/ipaddress.html).
- **Correction minimale proposée** : Préciser que la formule classique $2^{32-n} - 2$ ne vaut que pour les sous-réseaux multi-accès standards ($n \le 30$), tandis qu’en liaison point-à-point `/31` (RFC 3021) il y a 2 adresses utilisables et en `/32` 1 adresse d’hôte (conformément à `len(list(net.hosts()))`).
- **Effort** : `XS` | **Dépendances** : `aucune`

### `PFSENSE-B3-CH1-008` — D7 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L352-359`
- **Extrait (≤ 15 mots)** : « Tout le trafic entrant est bloqué (aucun flux autorisé) »
- **Pourquoi un novice bute** : Dans le vocabulaire des pare-feux, « trafic entrant » est ambigu pour un étudiant : s’agit-il du trafic provenant d’Internet/du LAN qui tente d’entrer *vers* le sous-réseau OPT, ou du trafic émis par les hôtes du réseau OPT qui entre *dans l’interface OPT* du pare-feu (`in on opt1`) ? L’explication (L359) ne lève pas cette ambiguïté directionnelle.
- **Preuve** : QCM question 4 à L352-359 de `b3-pfsense/chapitres/chapitre1.html`.
- **Correction minimale proposée** : Reformuler l’option et l’explication : « Aucune règle n’est créée par défaut : tout trafic arrivant sur l’interface OPT (émis par les hôtes du réseau OPT) est bloqué jusqu’à l’ajout d’une règle explicite ».
- **Effort** : `XS` | **Dépendances** : `aucune`

### `PFSENSE-B3-CH1-009` — D10 / D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L66`
- **Extrait (≤ 15 mots)** : « sa vélocité … la cinématique d’interception … fondations inébranlables »
- **Pourquoi un novice bute** : La mise en situation est un bloc monolithique de 108 mots (une phrase de 41 mots et une phrase de 53 mots) qui empile 11 concepts techniques avant toute définition, dans un style emphatique (« vélocité », « cinématique d’interception », « fondations inébranlables ») sans décrire aucune situation concrète d’entreprise. De plus, le chapitre ne comporte aucun encadré gradué « Niveau 1 — Intuition / Niveau 2 — Technique » contrairement à `b1-algo`.
- **Preuve** : L66 de `b3-pfsense/chapitres/chapitre1.html` ; absence de `.box--intuition` sur tout le cours `b3-pfsense`.
- **Correction minimale proposée** : Remplacer par un scénario concret en 50 mots (ex. mise en service d’un pare-feu d’entreprise séparant la fibre FAI, le réseau bureautique et une salle serveurs) et structurer chaque section selon le double palier Intuition / Technique.
- **Effort** : `S` | **Dépendances** : `aucune`

### `PFSENSE-B3-CH1-010` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre1.html:L6,L41,L43,L126,L463-467`
- **Extrait (≤ 15 mots)** : « </p>,<ul>,  <li>Block private networks … </li>,  <li>Block bogon »
- **Pourquoi un novice bute** : Quatre défauts d’interface et de rendu dégradant directement l’apprentissage : (1) À la ligne 126, des **virgules parasites** (`,<ul>,  <li>...</li>,  <li>...</li>,</ul>`) s’affichent entre les paragraphes et puces de l’encadré « Protection Anti-Usurpation » (causées par un tableau JS passé à `kit.box()` dans `server/content/b3-pfsense.js` et converti via `.toString()`) ; (2) Aux lignes 463-467 (`.bands`), les **seuils en pourcentage (`< 50 %`, `50–69 %`, etc.) sont totalement absents** du texte rendu ; (3) Aux lignes 41 et 43, les liens de navigation `../exercices/exercices.html` et `../chapitres/simulateur-examen.html` sont **cassés (404)** car les fichiers réels sont `chapitres/exercices.html` et `chapitres/examens.html` ; (4) À la ligne 6 (`<title>`), `&amp;amp;` est doublement échappé.
- **Preuve** : Lignes 6, 41, 43, 126 et 463-467 de `b3-pfsense/chapitres/chapitre1.html`.
- **Correction minimale proposée** : Corriger `kit.box()` dans `scripts/course-kit.js` (accepter un tableau `inner` via `.join("\n")`), ajouter les plages de pourcentage dans `.bands`, et pointer `navItems()` vers les chemins réels des fichiers.
- **Effort** : `S` | **Dépendances** : `aucune`

### `PFSENSE-B3-TRANS-011` — D8 / D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/exercices.html:L57,L65-260`
- **Extrait (≤ 15 mots)** : « 18 ateliers de programmation interactive en Python 3 » / `href="chapitres/chapitre1.html#pf3-c1-e1"`
- **Pourquoi un novice bute** : Double incohérence majeure sur la page catalogue `chapitres/exercices.html` : (1) Elle annonce 18 ateliers en « Python 3 » (`Langage : Python` sur chaque carte) alors que les 18 ateliers dans les chapitres sont en mode `analyse` (« Étude de cas ») ; (2) Les 36 liens (18 titres + 18 boutons) pointent vers `chapitres/chapitreN.html` depuis un fichier déjà situé dans `chapitres/`, générant 36 erreurs **404** (`/b3-pfsense/chapitres/chapitres/chapitre1.html`), vers des ancres `#pf3-cX-eY` qui n’existent même pas comme `id` dans les chapitres.
- **Preuve** : L57 et L65-260 de `b3-pfsense/chapitres/exercices.html`.
- **Correction minimale proposée** : Remplacer `href="chapitres/chapitre` par `href="chapitre` dans `chapitres/exercices.html`, ajouter `id="pf3-cX-eY"` sur chaque `<div class="lab">` et harmoniser le langage affiché.
- **Effort** : `S` | **Dépendances** : `aucune`

### `PFSENSE-B3-TRANS-012` — D9 / D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/examens.html:L84,L95`
- **Extrait (≤ 15 mots)** : « configure une queue prioritaire avec ordonnanceur CBQ ou HFSC »
- **Pourquoi un novice bute** : Le corrigé du Contrôle Continu (Partie 2, Q2, L95) attend de l’étudiant qu’il cite les ordonnanceurs `CBQ` ou `HFSC`, alors que `HFSC` n’est mentionné dans aucun des 6 chapitres du cours et que `CBQ` n’apparaît qu’une seule fois comme distracteur faux d’un QCM au Chapitre 2 (`chapitre2.html:L410` : « Dummynet au lieu de CBQ »). De plus, le corrigé complet est affiché directement en clair sous le sujet (sans balise repliable `<details>`) et sans chronomètre interactif.
- **Preuve** : `b3-pfsense/chapitres/examens.html:L84,L95` vs recherche intégrale de `CBQ`/`HFSC` dans `b3-pfsense/chapitres/chapitre1..6.html`.
- **Correction minimale proposée** : Aligner le corrigé de l’examen sur les limiteurs Dummynet effectivement enseignés au Chapitre 2 (§3), et replier le bloc `.box--solution` dans une balise `<details><summary>Voir le corrigé</summary>...</details>`.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-001` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Le filtrage de paquets moderne ne se résume pas à l’ouverture statique de ports. Dans… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (103 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-002` — D13 (Gravité : **S3**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L66`
- **Extrait (≤ 15 mots)** : « Le filtrage de paquets moderne ne se résume pas à l’ouverture statique de ports. Dans… »
- **Pourquoi un novice bute** : Style emphatique (« cinématique ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « cinématique » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-003` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L157`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L157 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-004` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L109`
- **Extrait (≤ 15 mots)** : « <p>Lorsqu’un paquet pénètre sur une interface, l’ordre d’évaluation traverse les onglets suivants :</p>,<ol>, <li><strong>Floating Rules… »
- **Pourquoi un novice bute** : Virgules parasites visibles dans le rendu HTML, causées par un tableau JS concaténé via toString() dans kit.box().
- **Correction minimale proposée** : Joindre les lignes du tableau avec .join("\n") dans server/content et scripts/course-kit.js.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-005` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-006` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-007` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-008` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L488`
- **Extrait (≤ 15 mots)** : « Difficultés à ordonner les règles de filtrage ou incompréhension de l’impact du mot-clé quick sur… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-009` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L161`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (pf3-c2-e1) — Résolveur d’alias d’adresses et de ports pfSense (Firewall Aliases) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-010` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre2.html:L325`
- **Extrait (≤ 15 mots)** : « Pour chaque ligne, afficher :<br> »
- **Pourquoi un novice bute** : Consigne d’entrée/sortie de programme résiduelle dans une grille d’analyse alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-011` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L66`
- **Extrait (≤ 15 mots)** : « Dans un réseau professionnel, les adresses IPv4 publiques sont une ressource rare et coûteuse. Le… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (96 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-012` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L151`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L151 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-013` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L125`
- **Extrait (≤ 15 mots)** : « <p>Pour utiliser des adresses IP publiques additionnelles fournies par le FAI sur une interface WAN,… »
- **Pourquoi un novice bute** : Virgules parasites visibles dans le rendu HTML, causées par un tableau JS concaténé via toString() dans kit.box().
- **Correction minimale proposée** : Joindre les lignes du tableau avec .join("\n") dans server/content et scripts/course-kit.js.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-014` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-015` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L41`
- **Extrait (≤ 15 mots)** : « <a href="../exercices/exercices.html">Exercices</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../exercices/exercices.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-016` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L43`
- **Extrait (≤ 15 mots)** : « <a href="../chapitres/simulateur-examen.html">Examen</a> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « ../chapitres/simulateur-examen.html » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-017` — D15 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L490`
- **Extrait (≤ 15 mots)** : « Difficultés à configurer une redirection de port ou confusion entre les modes de NAT entrant… »
- **Pourquoi un novice bute** : Les seuils en pourcentage (< 50 %, 50-69 %, 70-89 %, 90-94 %, ≥ 95 %) sont absents du bandeau d’auto-évaluation.
- **Correction minimale proposée** : Afficher explicitement les plages de pourcentage devant chaque palier de maîtrise.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-018` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L155`
- **Extrait (≤ 15 mots)** : « # Grille d'analyse (pf3-c3-e1) — Simulateur de redirection de ports (Port Forwarding / DNAT) »
- **Pourquoi un novice bute** : Grille « analyse » divulguant les 3 cas de test supposés cachés et dépourvue de bloc [Exemple] pour le bouton Exécuter.
- **Correction minimale proposée** : Séparer le cas d’exemple exécutable des cas de validation cachés, ou restaurer un vrai exercice exécutable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-019` — D8 (Gravité : **S1**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L274`
- **Extrait (≤ 15 mots)** : « <li>Stocker les réseaux avec ipaddress.ip_network(subnet).</li> »
- **Pourquoi un novice bute** : Référence au module Python ipaddress dans une grille d’analyse statique alors que l’éditeur est en mode texte statique (data-language="analyse").
- **Correction minimale proposée** : Aligner la consigne, les indices et le moteur d’exécution.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-020` — D8 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre3.html:L334`
- **Extrait (≤ 15 mots)** : « Deux indices, rédigés en mots (3 affichés) »
- **Pourquoi un novice bute** : Le titre annonce « Deux indices » mais la liste ordonnée en contient 3.
- **Correction minimale proposée** : Adapter l’intitulé en « 3 indices » ou ramener la liste à 2 indices.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-021` — D10 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre4.html:L66`
- **Extrait (≤ 15 mots)** : « Un réseau plat non segmenté est une vulnérabilité critique majeure : un poste de travail… »
- **Pourquoi un novice bute** : Mise en situation d’un seul bloc dense (103 mots) chargée de termes techniques non encore définis.
- **Correction minimale proposée** : Scinder en 2 paragraphes courts et partir d’un problème concret sans jargon préalable.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-022` — D13 (Gravité : **S3**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre4.html:L500`
- **Extrait (≤ 15 mots)** : « Je comprends la cinématique d’une attaque par Double Tagging exploitant le VLAN natif. »
- **Pourquoi un novice bute** : Style emphatique (« cinématique ») qui alourdit la lecture sans valeur explicative pour un étudiant.
- **Correction minimale proposée** : Remplacer « cinématique » par un terme factuel et sobre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-023` — D13 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre4.html:L160`
- **Extrait (≤ 15 mots)** : « Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse… »
- **Pourquoi un novice bute** : Mélange tutoiement (L71 : objectifs/test de maîtrise) et vouvoiement (L160 : consignes d’exercices).
- **Correction minimale proposée** : Uniformiser le registre d’adresse sur tout le chapitre.
- **Effort** : `XS` | **Dépendances** : `aucune`

### `B3-PFSENSE-024` — D15 (Gravité : **S2**)
- **Cours / fichier** : `b3-pfsense/chapitres/chapitre4.html:L13`
- **Extrait (≤ 15 mots)** : « <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml"> »
- **Pourquoi un novice bute** : Lien cassé (404) vers « /assets/img/favicon.svg » (fichier inexistant à cet emplacement).
- **Correction minimale proposée** : Corriger la cible du lien vers le chemin réel du fichier dans le dépôt.
- **Effort** : `XS` | **Dépendances** : `aucune`

## 3. Contre-Lecture Indépendante — Second Lecteur Novice (Section 5 & Annexe A)

- **Périmètre de contre-lecture** : Chapitre 1 public (`chapitres/chapitre1.html`) ainsi que tous les chapitres présentant au moins un critère $\le 1/3$ : **Chapitres 1, 2, 3, 4, 5, 6**.
- **Journal linéaire du second lecteur novice (étudiant B3 découvrant pfSense) sur `b3-pfsense/chapitres/chapitre1.html`** :
  1. **L66 (Mise en situation)** : *« En un seul paragraphe compact, je rencontre `m0n0wall`, `FreeBSD`, `Packet Filter (pf)`, `états de connexion`, `WAN/LAN/Optional`, `CIDR`, `DHCP`, `Unbound`, `DNSSEC`. Aucune situation concrète ne m'est posée. »*
  2. **L76 & L78 (Objectifs)** : *« L'objectif 4 promet le calcul CIDR IPv4/IPv6 et l'objectif 6 promet du développement Python 3. »*
  3. **L88–93 (Couche Noyau)** : *« On me cite `igb`, `em`, `vtnet`, `BPF`, `tcpdump`, `pfctl -f /tmp/rules.debug`, `mbuf` sans définir ce qu'est un tampon noyau mbuf ni comment `/tmp/rules.debug` est structuré. »*
  4. **L126 (Protection Anti-Usurpation)** : *« Des virgules `,<ul>, <li>` apparaissent entre les blocs, et on me parle de `double NAT` alors que le NAT est au Chapitre 3. »*
  5. **L134–149 (DHCP & Unbound)** : *« On me cite `ISC DHCPD / Kea`, `options PXE TFTP (option 66/67)`, `RRSIG`, `Cache Poisoning`, `Active Directory` sans explication. Et je n'ai toujours vu aucune section sur le calcul CIDR ni sur IPv6 ! »*
  6. **L155–315 (Études de cas / Exercices 1, 2, 3)** : *« Blocage total : le chapeau (L155) et le code de départ (L162) me demandent de remplir une grille de texte statique (`[Cas 1] ... A_COMPLETER`), mais l'énoncé (L189) et les indices (L202) m'ordonnent d'utiliser le module Python `ipaddress.ip_interface(ip_str)` ! Si j'écris du Python, le validateur échoue car il est en mode `analyse`. À l'exercice 2 (L241), on me demande de produire la syntaxe `pass in on ... proto ... from ... to ... port ...` de `pf.conf` qui n'a jamais été montrée dans le cours. »*

## 4. Audit des Ressources Transverses (Phase 4)

- **Flashcards (`chapitres/cartes.html`)** : Présentes. Une notion par carte respectée, mais nombre de cartes par module souvent inférieur aux « 8 notions à connaître absolument » listées en fin de chapitre.
- **Mémo / Formules (`chapitres/formules.html`)** : Présent. Synthèse dense utile en révision, mais introduit parfois des syntaxes ou options CLI non détaillées dans le corps des chapitres (`D1`/`D13`).
- **Catalogue d'exercices (`chapitres/exercices.html`) & Atelier (`atelier.html`)** : Dans les cours convertis en `analyse`, le catalogue ou l’atelier conserve des mentions résiduelles de Python/Bash (`D8`) et, pour 11 cours B3, les liens relatifs `chapitres/chapitreN.html` depuis `chapitres/exercices.html` produisent des erreurs 404 (`D15`).
- **Simulateur d'examen / Examens blancs (`chapitres/examens.html`)** : Dans les cours B3 (`examens.html`), les corrigés sont affichés directement en clair sans balise `<details>` et sans chronomètre interactif (`data-timer`), contrairement aux cours B1/B2 (`simulateur-examen.html`).
- **Tuteur IA « Expliquer mon erreur » (`server/services/ai-help.js`)** : Règle du « zéro code fourni » bien garantie côté serveur (`sanitizeExplanation()`), mais le prompt système fige la cible sur *« étudiants débutants de niveau B1 en programmation »* (`L14`), ce qui est désaligné pour les cours d'infrastructure, de gestion, de droit et pour les niveaux B2/B3 (`D14`).

## 5. Ce qui Fonctionne Bien — Bonnes Pratiques à Généraliser

- **Structure récurrente de fin de chapitre** : La séquence *Erreurs classiques à reconnaître en examen* (`.box--pitfall`) → *Méthodologie de résolution pas à pas* (`.box--method`) → *Révision active (Résumé + Checklist)* offre un excellent étayage métacognitif.
- **Garde-fou serveur du tuteur IA** : L'encadrement strict du prompt et le retrait automatique des blocs de code (`sanitizeExplanation` dans `server/services/ai-help.js`) préservent l'effort cognitif de l'apprenant.

## 6. Verdict Final sur `b3-pfsense`

**À RÉÉCRIRE (33.3 % — < 70 %)** — Score moyen : **14.0 / 42 (33.3 %)**. Aucune modification n'a été appliquée au code source (mode lecture seule jusqu'à validation de la Phase 7).
