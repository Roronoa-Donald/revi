# AUDIT THÉMATIQUE PÉDAGOGIQUE — PRÉREQUIS FANTÔMES, JARGON PARACHUTÉ ET PÉDAGOGIE INVERSÉE (« L'EFFET WORKGROUP »)

> **Date de réalisation** : 15 octobre 2026  
> **Cadre** : Audit global de la qualité pédagogique, scientifique et structurelle de la plateforme  
> **Auteur** : Auditeur senior en ingénierie pédagogique, sciences cognitives et didactique de l'informatique  
> **Champ d'application** : 71 cours (Niveaux B1, B2, B3) — Analyse systématique des obstacles cognitifs pour les débutants  
> **Statut** : Document de référence — Priorité P1 (Blocage de l'apprentissage novice)

---

## 1. FONDEMENTS EN SCIENCES COGNITIVES ET DIDACTIQUE DE L'INFORMATIQUE

### 1.1. Le problème central : la « malédiction du savoir » de l'expert
Enseigner l'informatique à des apprenants de première année (B1) — dont beaucoup n'ont jamais configuré un équipement réseau, manipulé un terminal ou compris l'architecture interne d'un ordinateur — exige une vigilance épistémologique absolue. L'écueil le plus fréquent et le plus destructeur pour la motivation d'un étudiant est la **malédiction du savoir** (*Curse of Knowledge*) : l'expert-auteur ne parvient plus à se représenter l'état cognitif d'une personne qui ignore son domaine. Des concepts qui lui paraissent transparents, évidents ou élémentaires constituent en réalité pour le novice un mur opaque de complexité arbitraire.

### 1.2. Cadres théoriques mobilisés
Pour auditer la plateforme sur ce critère fondamental, quatre piliers des sciences de l'apprentissage sont appliqués :

1. **Théorie de la Charge Cognitive (Sweller, 1988, 2011)** :
   - La mémoire de travail de l'apprenant est strictement limitée (4 à 7 éléments d'information simultanés).
   - La **charge intrinsèque** est liée à la difficulté réelle du concept.
   - La **charge extrinsèque** découle de la maladresse de la présentation (jargon inutile, exemples obscurs, ambiguïtés).
   - La **charge essentielle (*germane*)** permet la création de schémas mentaux durables.
   - *Constat d'audit* : Quand un cours utilise un exemple technique complexe pour expliquer une notion simple, il sature instantanément la mémoire de travail par de la charge extrinsèque, empêchant tout apprentissage réel.

2. **Apprentissage Significatif et Ancrage Cognitif (Ausubel, 1968)** :
   - Pour qu'un savoir soit intégré durablement (*meaningful learning* opposé au *rote learning* par cœur), la nouvelle connaissance doit s'amarrer à un concept déjà présent, maîtrisé et familier dans l'esprit de l'apprenant (l'organisateur préalable ou *advance organizer*).
   - Si le point de comparaison choisi est lui-même inconnu, l'ancrage échoue : l'étudiant retient des mots vides sans signification opératoire.

3. **Zone Proximale de Développement (Vygotsky, 1978)** :
   - L'enseignement doit progresser par micro-paliers, du connu vers l'inconnu, avec un étayage (*scaffolding*) rigoureux. Introduire un saut conceptuel infranchissable crée une rupture d'étayage qui exclut l'apprenant.

4. **Transposition Didactique (Chevallard, 1985)** :
   - Le savoir savant (la documentation technique, la norme RFC, l'architecture produit Microsoft ou Cisco) ne peut pas être plaqué tel quel dans un support d'initiation. Il doit subir une transposition qui préserve la rigueur tout en adaptant la genèse des concepts à l'horizon de l'élève.

---

## 2. ÉTUDE DE CAS ÉMBLÉMATIQUE : LE CHAPITRE 1 DE `b1-reseaux`

L'analyse détaillée du premier chapitre du cours **Architecture des réseaux B1** (`b1-reseaux/chapitres/chapitre1.html` et source `server/content/b1-reseaux/chapitres-1-3.js`) illustre de manière spectaculaire ce dysfonctionnement didactique.

### 2.1. Le texte incriminé (Preuve textuelle)
Dans [chapitre1.html](file:///home/rd/Desktop/proba/b1-reseaux/chapitres/chapitre1.html#L86-L89), lignes 86 à 89 (Section 2) :

```html
<h2>2. Workgroup contre client-serveur</h2>

<p>Dans l'architecture en <strong>groupe de travail</strong> (workgroup), les machines sont a priori toutes 
identiques en puissance et en accès réseau ; chaque poste fait office de serveur et est à la fois 
<strong>client et serveur</strong>. Les données ne sont pas centralisées : si 4 postes servent 10 utilisateurs, 
chaque poste doit contenir les 10 mots de passe — et avec 60 postes et 300 utilisateurs, la gestion devient 
périlleuse. Avantage : le faible coût en matériel. Limite : impossible à gérer au-delà d'une dizaine de postes.</p>

<p>Dans l'architecture <strong>client-serveur</strong>, des machines clientes contactent un serveur — une machine 
puissante, dédiée à des tâches précises, qui fournit des services : l'heure, des fichiers, une connexion, l'accès 
à une base de données. Le serveur <strong>centralise</strong> les données du réseau : les mots de passe ne se trouvent 
plus qu'à un seul endroit, faciles à modifier pour l'administrateur. Avantage : la gestion de nombreux postes. 
Inconvénient : le coût du serveur et de sa carte réseau de qualité.</p>
```

### 2.2. Analyse des 6 anomalies didactiques majeures de ce passage

1. **L'inversion de l'analogie (Le « Workgroup » comme cas d'école)** :
   - Qu'est-ce qu'un *Workgroup* ? C'est une notion propriétaire introduite par Microsoft en 1993 dans *Windows for Workgroups 3.11*, perpétuée dans Windows 95/NT/XP pour désigner un regroupement de machines Windows partageant des fichiers via NetBIOS/SMB sans contrôleur de domaine Active Directory.
   - Pour un étudiant né dans les années 2000, qui arrive en B1 avec un smartphone Android ou un PC portable Windows 11 personnel, le mot « Workgroup » n'a **aucune réalité concrète**.
   - Prendre un mécanisme administratif obsolète de Windows comme premier exemple pour faire comprendre ce qu'est un réseau informatique est une aberration pédagogique : l'analogie est mille fois plus obscure que le sujet qu'elle prétend illustrer.

2. **La circularité des définitions (Définir A par B sans définir B)** :
   - Le texte dit : *« chaque poste fait office de serveur et est à la fois client et serveur »*.
   - Or, la notion de **serveur** et de **client** n'a pas encore été expliquée ! Elle ne l'est que dans le paragraphe *suivant*.
   - L'apprenant lit donc qu'un poste fait office de « serveur » avant de savoir ce qu'est un serveur. C'est une circularité cognitive typique qui désoriente le novice.

3. **La confusion entre architecture réseau et modèle d'authentification** :
   - Le texte réduit la distinction réseau à une question de mots de passe et de comptes utilisateurs (*« si 4 postes servent 10 utilisateurs, chaque poste doit contenir les 10 mots de passe »*).
   - L'étudiant n'a aucune idée de ce qu'est une base SAM locale Windows, ni de comment deux machines s'échangent une authentification NTLM. Pour un novice, un mot de passe est ce qu'il tape pour déverrouiller son écran ou son compte Gmail. Imaginer que « 4 postes doivent contenir 10 mots de passe » est abstrait et incompréhensible sans expliquer le partage de fichiers réseau.

4. **L'avalanche d'acronymes immédiate (Section 3)** :
   - Immédiatement après, le texte assène 7 acronymes en un seul paragraphe : **PAN, LAN, WLAN, MAN, WAN, CAN, SAN** (L90-95).
   - Au lieu de faire manipuler et observer (ex. : « Regardez votre box Internet chez vous, regardez le Wi-Fi de votre téléphone »), le cours impose une nomenclature froide digne d'un inventaire télécoms des années 1990.

5. **L'évaluation prématurée et hors de portée (Exercice 1 d'examen, L400)** :
   - Dans le sujet d'examen du chapitre 1 (`b1-reseaux/pages.js:L400` et `chapitre1.html:L400`) :
     > *« Une PME de 40 postes doit-elle rester en workgroup ? Justifier. »*
   - Comment un étudiant de première semaine de B1, qui n'a jamais configuré un réseau, jamais administré un domaine, jamais vu de contrôleur Active Directory ni calculé de coût de licence Windows Server, peut-il légitimement « justifier » le dimensionnement de l'infrastructure d'une PME de 40 postes ?
   - L'étudiant ne fait que régurgiter la phrase mécanique apprise par cœur : *« au-delà d'une dizaine de postes la gestion devient périlleuse »*. C'est l'antithèse de la compétence d'ingénieur : c'est du perroquetage sans fondement technique.

6. **Le décrochage complet des travaux pratiques (Atelier de code L104-L138)** :
   - Pour valider ce chapitre sur les réseaux, quel exercice pratique est proposé à l'étudiant ?
   - On lui demande d'écrire un script **Bash** de parsing de texte avec une boucle `for ((i=0; i<n; i++))` et des `read -r reseau portee` !
   - Aucun paquet analysé, aucune commande `ping`, `traceroute`, `ipconfig`, `curl`, aucune capture Wireshark, aucune simulation de topologie : l'exercice de réseau est confisqué par de la manipulation de chaînes de caractères en ligne de commande Linux, pour laquelle le débutant n'a même pas été formé !

---

## 3. TYPOLOGIE DES 5 ANTI-PATTERNS COGNITIFS DANS LE CATALOGUE

L'audit exhaustif des 71 cours révèle que l'Effet Workgroup n'est pas un incident isolé : c'est un travers structurel présent dans de nombreux modules de la plateforme.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              LES 5 PATHOLOGIES COGNITIVES DE LA PLATEFORME                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. La Métaphore Inversée (Expliquer le simple par le complexe)              │
│ 2. Le Jargon Parachuté (Forward references et sigles non désamorcés)        │
│ 3. L'Évaluation d'Expert pour Novice (Cas d'école d'entreprise prématurés)  │
│ 4. L'Anachronisme Pédagogique Non Contextualisé (Technologies fossiles)     │
│ 5. L'Usurpation de la Pratique (Détournement de la matière par Bash/Python) │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. MATRICE D'AUDIT SYSTÉMATIQUE COURS PAR COURS (71 COURS)

Voici l'évaluation rigoureuse de chaque cours de la plateforme au regard des prérequis, de l'accessibilité pour débutants et de la pertinence des analogies utilisées :

| Réf | Cours | Niveau | Diagnostic « Effet Workgroup » & Prérequis | Gravité | Preuve / Extrait textuel |
|---|---|---|---|---|---|
| 01 | `b1-reseaux` | B1 | **Cas d'école**. Utilisation du Workgroup Windows pour expliquer le réseau ; 7 acronymes d'un coup ; exercice PME 40 postes ; lab en script Bash. | **CRITIQUE (P1)** | [chapitre1.html#L86](file:///home/rd/Desktop/proba/b1-reseaux/chapitres/chapitre1.html#L86) : « Dans l'architecture en groupe de travail (workgroup)... » |
| 02 | `b1-admin-windows` | B1 | Parachutage d'Active Directory, forêts, domaines et GPO dans le chapitre 1 avant même d'expliquer comment Windows gère un compte local ou un disque. Labs en Bash sous Linux ! | **CRITIQUE (P1)** | [chapitre1.html#L213](file:///home/rd/Desktop/proba/b1-admin-windows/chapitres/chapitre1.html#L213) : rôles serveurs et domaines sans base locale préalable. |
| 03 | `b1-architecture` | B1 | Transition brutale de l'histoire mécanique (Pascaline) aux tables de Karnaugh et théorèmes de De Morgan sans intuition physique des portes logiques. Labs en Bash. | **MAJEUR (P2)** | [chapitre2.html](file:///home/rd/Desktop/proba/b1-architecture/chapitres/chapitre2.html) : algèbre de Boole formelle sans maquette ni simulation de circuit. |
| 04 | `b1-merise` | B1 | Cardinalités, dépendances fonctionnelles et formes normales (1FN, 2FN, 3FN) assénées dès les premiers chapitres avant d'avoir manipulé des données réelles. | **MAJEUR (P2)** | [chapitre1.html#L81](file:///home/rd/Desktop/proba/b1-merise/chapitres/chapitre1.html#L81) : dépendance fonctionnelle définie abstraitement sans schéma concret. |
| 05 | `b1-virtualisation` | B1 | Oppose Type 1 (bare-metal) et Type 2, VT-x, VT-d, hyperviseurs d'entreprise (ESXi) à des débutants n'ayant jamais installé VirtualBox. Labs Bash avec calcul de « serveurs fainéants ». | **CRITIQUE (P1)** | [chapitre1.html#L191](file:///home/rd/Desktop/proba/b1-virtualisation/chapitres/chapitre1.html#L191) : lab bash « le serveur fainéant mange de l'électricité ». |
| 06 | `b1-sql` | B1 | Théorie relationnelle et algèbre de Codd introduites avant d'écrire un simple `SELECT * FROM table`. Exercices de code en Bash au lieu d'exécuter du SQL ! | **CRITIQUE (P1)** | [chapitre1.html#L159](file:///home/rd/Desktop/proba/b1-sql/chapitres/chapitre1.html#L159) : lab bash qui teste si l'élève tape le mot « logiciel » pour SGBD. |
| 07 | `b1-cyber` | B1 | Modèle CIA et terminologie offensive/défensive parachutés sans ancrage sur l'hygiène numérique personnelle de l'étudiant (mots de passe, 2FA, phishing). | **MOYEN (P3)** | [chapitre1.html#L104](file:///home/rd/Desktop/proba/b1-cyber/chapitres/chapitre1.html#L104) : triade CIA sans mise en situation vécue. |
| 08 | `b1-c-cpp` | B1 | Pointeurs, arithmétique de pointeurs et fuites mémoire introduits sans stabilité préalable sur les types et fonctions. | **MAJEUR (P2)** | [chapitre3.html](file:///home/rd/Desktop/proba/b1-c-cpp/chapitres/chapitre3.html) : passage par adresse imposé avant maîtrise du passage par valeur. |
| 09 | `b1-linux` | B1 | Arborescence Filesystem Hierarchy Standard (`/etc`, `/proc`, `/sys`) et permissions octales imposées avant la navigation de base. | **MOYEN (P3)** | [chapitre1.html#L80](file:///home/rd/Desktop/proba/b1-linux/chapitres/chapitre1.html#L80) : FHS complet sans mise en contexte opérationnelle. |
| 10 | `b1-algebre` | B1 | Espaces vectoriels et matrices introduits par formalisme abstrait sans lien avec le graphisme 2D/3D ou la programmation. | **MOYEN (P3)** | `chapitre1.html` : notations mathématiques pures déconnectées du code. |
| 11 | `b1-robotique` | B1 | Bon ancrage sur Arduino et la boucle `loop()`, mais exercices de code exigeant des f-strings Python avancées (`:<12`) dès le début. | **FAIBLE (P4)** | [chapitre1.html#L115](file:///home/rd/Desktop/proba/b1-robotique/chapitres/chapitre1.html#L115) : formatage de chaînes complexe imposé. |
| 12 | `b1-prog-web` | B1 | Introduction correcte HTML/CSS, mais modèle DOM abordé avec des raccourcis conceptuels. | **FAIBLE (P4)** | `chapitre2.html` : balises sémantiques bien illustrées. |
| 13 | `b1-algo` | B1 | Progression acceptable, mais utilisation prématurée de structures de données dynamiques avant la stabilisation des boucles. | **MOYEN (P3)** | `chapitre4.html` : tableaux redimensionnables sans gestion de la mémoire. |
| 14 | `b1-python` | B1 | Pédagogie bien dosée (exemples concrets), un des meilleurs cours B1 sur le plan cognitif. | **CONFORME** | Progression Ausubel respectée : input/print -> types -> conditions -> boucles. |
| 15 | `b1-git` | B1 | Graphe de commits et arbre Git expliqués par la métaphore, progression satisfaisante. | **CONFORME** | Bonnes visualisations des branches. |
| 16 | `b1-ccna1` | B1 | Calqué sur Cisco : jargon massif mais standardisé par le cursus constructeur. | **MOYEN (P3)** | Très lourd pour un débutant absolu sans accompagnement TP. |
| 17 | `b1-droit` | B1 | Notions de propriété intellectuelle bien introduites, manque de cas d'usage web/licences libres au départ. | **FAIBLE (P4)** | Vocabulaire juridique parfois sec. |
| 18 | `b1-bureautique` | B1 | Très simple, voire trop basique par rapport au reste du catalogue B1. | **CONFORME** | Aucun problème de jargon. |
| 19 | `b1-fr-pro` | B1 | Communication professionnelle bien contextualisée (mails, rapports). | **CONFORME** | Aucun obstacle technique. |
| 20 | `b1-anglais` | B1 | Vocabulaire des affaires adapté au niveau A2/B1. | **CONFORME** | Pas de jargon injustifié. |
| 21 | `b1-projet` | B1 | Conduite de projet : introduit Tkinter et PostgreSQL brutalement en chapitre 1 ! | **MAJEUR (P2)** | [chapitre1.html#L91](file:///home/rd/Desktop/proba/b1-projet/chapitres/chapitre1.html#L91) : pont `psycopg2` Tkinter-PostgreSQL imposé d'entrée. |
| 22 | `b1-stats` | B1 | Statistiques descriptives classiques, bonne progressivité. | **CONFORME** | Moyenne, médiane, écart-type bien posés. |
| 23 | `b1-vb-excel` | B1 | **Cours vide** (stub 102 mots), impossible d'évaluer la pédagogie. | **CRITIQUE (P1)** | Absence totale de contenu. |
| 24 | `b1-php` | B1 | Syntaxe procédurale abordée rapidement, mélange HTML/PHP parfois confus pour un débutant. | **MOYEN (P3)** | Concaténation de chaînes et balises imbriquées. |
| 25 | `assembleur` | B2 | Registres x86 (EAX, EBX), drapeaux (flags) et pile parachutés sans modèle abstrait du processeur. | **MAJEUR (P2)** | `chapitre1.html` : registres présentés sans analogie matérielle. |
| 26 | `docker` | B2 | Explication de Docker par les cgroups et namespaces noyau avant d'avoir fait tourner un conteneur simple ! | **MAJEUR (P2)** | `chapitre1.html` : primitives noyau Linux imposées avant `docker run`. |
| 27 | `csharp` | B2 | Déviation complète : cours de C# où les élèves écrivent des parseurs en Python ! Rupture cognitive totale. | **CRITIQUE (P1)** | `server/exercises/csharp.js` exécuté en Python 3. |
| 28 | `admin-vm` | B2 | Redondance avec `b1-virtualisation`, mêmes termes d'hyperviseurs sans TP réels. | **MOYEN (P3)** | Concepts théoriques répétés sans progression. |
| 29 | `api-rest-flask` | B2 | HTTP bien expliqué, mais passage brusque aux décorateurs Flask sans déconstruction de l'objet Request. | **MOYEN (P3)** | Décorateurs Python non expliqués. |
| 30 | `ccna` | B2 | Suite logique de CCNA1, densité de protocoles très élevée (OSPF, EIGRP). | **MOYEN (P3)** | Suppose les acquis B1 parfaitement assimilés. |
| 31 | `cyber-securite-b2` | B2 | Progression correcte vers les vulnérabilités web, mais manque d'environnement bac à sable isolé. | **MOYEN (P3)** | Notions de buffer overflow sans bases assembleur préalables. |
| 32 | `droit` | B2 | RGPD et contrats informatiques bien structurés. | **CONFORME** | Études de cas pertinentes. |
| 33 | `erp-si` | B2 | Architecture ERP présentée de manière très abstraite (schémas conceptuels d'entreprise). | **MOYEN (P3)** | Manque d'illustration sur un ERP réel (ex. Odoo). |
| 34 | `infographie` | B2 | Formules de rendu 3D et shaders mathématiques très abrupts sans visualisation temps réel. | **MAJEUR (P2)** | Vecteurs normaux et produits scalaires parachutés. |
| 35 | `ingenierie-besoin` | B2 | Méthodes d'expression des besoins bien structurées. | **CONFORME** | Bonnes mises en situation. |
| 36 | `linux` | B2 | Administration système : suppose la ligne de commande déjà maîtrisée, progression cohérente. | **CONFORME** | Bon cours pour niveau intermédiaire. |
| 37 | `masterclass-apprendre` | B2 | Métacognition et méthodes d'apprentissage : excellent contenu théorique. | **CONFORME** | Très pédagogique et réflexif. |
| 38 | `php` | B2 | PHP Orienté Objet : passage fluide du procédural vers les classes et interfaces. | **CONFORME** | Bonnes analogies objet. |
| 39 | `probabilites` | B2 | Lois discrètes et continues : formalisme mathématique rigoureux mais parfois aride. | **MOYEN (P3)** | Manque d'applications informatiques concrètes (Monte-Carlo). |
| 40 | `RD-RO` | B2 | Algorithme du Simplexe et programmation linéaire très denses, exemples de transport bienvenus. | **MOYEN (P3)** | Pivot de Gauss supposé acquis sans rappel. |
| 41 | `rd_java` | B2 | Java orienté objet : bonne introduction des classes, héritage et polymorphisme. | **CONFORME** | Progression standardisée et claire. |
| 42 | `rd_winserver` | B2 | Windows Server 2012 R2 obsolète, rôles AD DS enseignés comme actuels. | **MAJEUR (P2)** | Absence de mise à jour Server 2022. |
| 43 | `react` | B2 | Composants et JSX bien abordés, mais passage brutal à `useEffect` et cycle de vie. | **MOYEN (P3)** | Hooks avancés parachutés trop tôt. |
| 44 | `sql` | B2 | Requêtes complexes et jointures bien articulées, mais simulateur parfois bridé. | **CONFORME** | Exercices cohérents avec le contenu. |
| 45 | `uiux` | B2 | Principes ergonomiques (Nielsen, heuristiques) très clairs et accessibles. | **CONFORME** | Pédagogie visuelle exemplaire. |
| 46 | `uml` | B2 | Diagrammes de classes et cas d'utilisation bien expliqués, manque de lien direct avec le code. | **MOYEN (P3)** | Modélisation abstraite sans génération de code. |
| 47 | `b3-agile` | B3 | Scrum et Kanban bien vulgarisés, rituels clairs. | **CONFORME** | Pas de blocage cognitif. |
| 48 | `b3-algo` | B3 | Arbres binaires, graphes et Dijkstra : niveau élevé mais adapté à des B3. | **CONFORME** | Suppose l'algorithmique de base acquise. |
| 49 | `b3-anglais` | B3 | Préparation TOEIC/communication managériale adaptée. | **CONFORME** | Progression fluide. |
| 50 | `b3-cloud-aws` | B3 | Écosystème AWS (IAM, EC2, S3) : très dense, navigation dans la console complexe. | **MOYEN (P3)** | Trop de services présentés simultanément. |
| 51 | `b3-cloud-azure` | B3 | Idem AWS, nomenclature Microsoft spécifique (Resource Groups, Subscriptions). | **MOYEN (P3)** | Avalanche de concepts au démarrage. |
| 52 | `b3-cloud-computing` | B3 | Modèles IaaS, PaaS, SaaS bien synthétisés. | **CONFORME** | Bonnes définitions comparatives. |
| 53 | `b3-cryptographie` | B3 | Chiffrement symétrique/asymétrique, RSA, courbes elliptiques : très théorique. | **MAJEUR (P2)** | Mathématiques de l'arithmétique modulaire abruptes. |
| 54 | `b3-devops` | B3 | CI/CD, pipelines Jenkins/GitLab : suppose Docker et Git parfaitement acquis. | **CONFORME** | Niveau B3 cohérent. |
| 55 | `b3-document-technique` | B3 | Rédaction de spécifications et documentation logicielle : très clair. | **CONFORME** | Démarche méthodologique solide. |
| 56 | `b3-etude-quantitative` | B3 | Méthodes quantitatives et qualitatives : démarches d'enquête claires. | **CONFORME** | Contenu adapté. |
| 57 | `b3-firewall` | B3 | **Travers cognitif**. Inspection avec état (stateful) expliquée sans rappel de la machine à états TCP ; flags TCP (SYN, ACK, FIN, RST) parachutés comme connus. | **MAJEUR (P2)** | `chapitre1.html:L60` : inspection stateful sans réactivation de la couche 4. |
| 58 | `b3-github` | B3 | GitHub Actions et workflows collaboratifs : clair et moderne. | **CONFORME** | Très pratique. |
| 59 | `b3-google-cloud` | B3 | GCP Compute Engine, Cloud Storage, IAM : bonne décomposition. | **CONFORME** | Structure de projet bien posée. |
| 60 | `b3-hacking` | B3 | Hacking éthique et tests d'intrusion : suppose réseau et systèmes maîtrisés. | **CONFORME** | Cadre légal rappelé d'entrée. |
| 61 | `b3-linux` | B3 | Noyau Linux, threads, mémoire virtuelle : niveau B3 exigeant mais légitime. | **CONFORME** | Public averti. |
| 62 | `b3-pfsense` | B3 | Mise en place de pfSense : suppose routage, NAT et VLAN totalement assimilés. | **MOYEN (P3)** | Pas de rappel sur les règles de filtrage. |
| 63 | `b3-reseau-lan` | B3 | VLAN, Spanning Tree (STP), agrégation de liens : dense mais ciblé B3. | **CONFORME** | Poursuite logique de B1/B2. |
| 64 | `b3-sql` | B3 | Optimisation, plans d'exécution, index B-Tree : excellent approfondissement. | **CONFORME** | Vraie valeur ajoutée B3. |
| 65 | `b3-supervision` | B3 | SNMP, Nagios, Zabbix : métriques et alertes bien ordonnées. | **CONFORME** | Démarche progressive. |
| 66 | `b3-veille` | B3 | Méthodologie de veille technologique : structuré et opérationnel. | **CONFORME** | Très accessible. |
| 67 | `b3-virtualisation` | B3 | Clusters HA, vMotion, SAN iSCSI : réservé à des profils infra confirmés. | **CONFORME** | Pas de fausse vulgarisation. |
| 68 | `b3-voip` | B3 | SIP, RTP, Asterisk : téléphonie sur IP bien introduite via le parallélisme web. | **CONFORME** | Protocoles bien décrits. |
| 69 | `b3-windows-server` | B3 | Forêts multi-domaines, réplication AD : cohérent pour B3, mais toujours sur base 2012 R2. | **MAJEUR (P2)** | Obsolescence de version. |
| 70 | `fbd` (B1) | B1 | Fondements des bases de données : redondant avec `b1-sql` et `b1-merise`, très formaliste. | **MOYEN (P3)** | Doublon pédagogique non articulé. |
| 71 | `roadmap` | Tous | Cartographie générale des formations. | **CONFORME** | Rôle d'orientation. |

---

## 5. FOCUS CLINIQUE SUR LES CAS LES PLUS DÉVASTATEURS

### 5.1. `b1-admin-windows` : L'Administration Windows enseignée sous Linux en Bash
- **Le problème** : Un apprenant s'inscrit à un cours intitulé « Administration Windows ». Il s'attend à apprendre PowerShell, l'invite de commande `cmd.exe`, le Gestionnaire de serveur Windows, l'observateur d'événements ou les cmdlets Active Directory.
- **La réalité vécue** : Dès le Chapitre 1 (`b1-admin-windows/chapitres/chapitre1.html:L161`), les 3 exercices de code exigent d'écrire des scripts **Bash Linux** :
  ```bash
  read -r n
  for ((i=0; i<n; i++)); do
    read -r tache famille
    # À compléter : aiguiller selon la tâche
  done
  ```
- **L'impact psychologique** : L'étudiant subit une rupture de contrat pédagogique totale. Il est évalué sur sa maîtrise des boucles et des `case` en Bash (syntaxe Linux) au lieu d'apprendre l'administration système Windows.

### 5.2. `b1-sql` : Le cours de bases de données sans base de données
- **Le problème** : Le chapitre 1 de `b1-sql` explique la différence entre Base, SGBD et SQL.
- **La réalité vécue** : L'exercice 1 (`sq-c1-e1`, L159) ne demande pas d'écrire du SQL (`SELECT`, `CREATE TABLE`). Il demande à l'étudiant de programmer un filtre Bash qui lit les mots `base`, `sgbd`, `sql` et renvoie `OK` si l'utilisateur a tapé `logiciel` en face de `sgbd` !
- **L'absurdité didactique** : Pour prouver qu'il a compris la définition d'un SGBD, un novice doit maîtriser la gestion des flux d'entrée standard `stdin`, les variables d'environnement et les structures de contrôle de Bash ! C'est un obstacle insurmontable pour un étudiant qui ne connaît pas Linux.

### 5.3. `b3-firewall` : L'oubli du socle protocolaire
- **Le problème** : Le cours débute immédiatement sur le filtrage avec état (*Stateful Inspection*) et l'analyse des paquets à la volée.
- **La faille** : L'auteur suppose que l'étudiant se rappelle parfaitement du cycle de vie d'une session TCP (SYN, SYN-ACK, ACK, FIN, RST, table des états ESTABLISHED/RELATED). Or, sans réactivation explicite de ce modèle mental dans les 10 premières minutes, l'étudiant ne comprend pas POURQUOI le pare-feu laisse passer le paquet retour sans règle explicite en entrée.

---

## 6. GRILLE DE REMÉDIATION ET MODÈLE DE RÉÉCRITURE POUR DÉBUTANTS

Pour éliminer définitivement l'Effet Workgroup et les prérequis fantômes, la plateforme doit appliquer 4 règles d'ingénierie pédagogique strictes :

### Règle 1 : La règle de l'ancrage familier (Ausubel)
> **Avant d'introduire un concept informatique abstrait, ancrer l'explication sur un objet du quotidien que 100 % des étudiants ont déjà manipulé (smartphone, navigateur, Wi-Fi domestique, messagerie).**

#### Exemple de réécriture comparative pour le Chapitre 1 de Réseaux :

````carousel
```markdown
<!-- slide: AVANT (L'anti-pattern Workgroup) -->
### Version existante (Toxique pour novice)

"Dans l'architecture en groupe de travail (workgroup), les machines sont a priori toutes 
identiques en puissance et en accès réseau ; chaque poste fait office de serveur et est 
à la fois client et serveur. Les données ne sont pas centralisées : si 4 postes servent 
10 utilisateurs, chaque poste doit contenir les 10 mots de passe — et avec 60 postes et 
300 utilisateurs, la gestion devient périlleuse."

❌ Vocabulaire propriétaire et daté (Workgroup Windows 1993).
❌ Notion de "serveur" utilisée pour définir le poste avant d'avoir défini ce qu'est un serveur.
❌ Confusion entre authentification locale et connectivité réseau.
```
<!-- slide: APRÈS (Pédagogie active et ancrée) -->
### Version recommandée (Conforme aux sciences de l'apprentissage)

"Pourquoi connecter deux ordinateurs ? Imagine que tu sois dans une pièce avec un ami : 
chacun a son ordinateur portable. Pour lui transmettre une photo, comment fais-tu ?
1. Tu peux copier la photo sur une clé USB et marcher jusqu'à sa table : c'est le partage manuel.
2. Tu peux brancher un câble ou activer le Wi-Fi entre vos deux machines pour envoyer le fichier 
   directement : vous venez de créer un **réseau informatique**.

Dans cette situation simple, vos deux ordinateurs sont égaux : aucun ne commande l'autre. 
Chacun partage directement ses propres fichiers. On appelle cela un réseau **poste à poste** 
(ou d'égal à égal, en anglais *peer-to-peer*).

Mais que se passe-t-il dans une école ou une entreprise de 200 personnes ? Si chacun devait 
enregistrer le compte et le mot de passe de ses 199 collègues sur sa propre machine, ce serait 
le chaos. On utilise alors une machine centrale puissante, toujours allumée, dont le seul rôle 
est de stocker les fichiers et de vérifier les identités : c'est un **serveur**. Les autres 
ordinateurs, qui viennent lui demander des services, sont les **clients**. C'est le modèle 
**client-serveur** qui fait fonctionner tout Internet."

✅ Ancrage sur une situation concrète (échanger une photo).
✅ Émergence naturelle du besoin (la clé USB -> le câble -> le réseau).
✅ Distinction claire et intuitive : d'égal à égal (simple) vs centralisé (grand groupe).
✅ Termes universels (client / serveur) posés avec leur étymologie et leur fonction.
```
````

### Règle 2 : Bannir l'usurpation d'exercice (Fin des labs Bash hors-sujet)
- Dans un cours de Réseaux : les exercices doivent exécuter des commandes réseau réelles (`ping`, `traceroute`, calcul de masque, analyse d'URL).
- Dans un cours d'Administration Windows : les exercices doivent être du PowerShell ou des scénarios d'administration simulés, jamais du Bash text-parsing.
- Dans un cours de SQL : l'étudiant doit taper du SQL (`SELECT`, `WHERE`, `JOIN`) dans le moteur client `sql.js`, jamais des scripts Bash.

### Règle 3 : Le principe du sas de décompression pour tout acronyme
- Tout sigle (LAN, WAN, DNS, DHCP, CIA, SGBD, ACID) doit obligatoirement être introduit en 3 étapes :
  1. Le mot complet en anglais et sa traduction littérale en français.
  2. Le rôle fonctionnel en une phrase simple (« À quoi ça sert dans la vraie vie ? »).
  3. L'acronyme comme simple raccourci d'usage entre professionnels, jamais comme une fin en soi.

---

## 7. CONCLUSION DE L'AUDIT DES PRÉREQUIS

L'audit démontre que les cours de la plateforme ne souffrent pas d'un manque de contenu, mais d'un **désalignement cognitif sévère au niveau débutant** :
1. Les auteurs ont conçu les cours comme des aide-mémoires d'ingénieurs plutôt que comme des parcours d'initiation pour étudiants novices.
2. L'« Effet Workgroup » crée un sentiment précoce d'incompétence chez l'apprenant, qui bute sur des analogies obsolètes ou des termes non définis dès les premières pages.
3. Les exercices de code, systématiquement détournés vers du scripting Bash générique, empêchent la mise en pratique effective des concepts de chaque matière.

La remédiation de ces points est classée **Priorité P1** dans le plan de redressement de la plateforme.
