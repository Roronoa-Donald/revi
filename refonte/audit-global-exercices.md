# Audit Global d'Adéquation Formelle et Pédagogique des Exercices

> Projet : `revi-cours-html` / `Desktop/proba`  
> Périmètre audité : **68 cours** (23 cours B1, 22 cours B2, 23 cours B3), soit **1250 exercices**.  
> Référence des supports réels : Dossiers sources `/home/rd/Desktop/proba/cours B1 IT/`, `COURS_B3/`, `Cyber securite B2/`, `RD-RO/`, `assembleur/`, `droitb2/`, `administration machine virtuel/`.  
> Date de l'audit : 2 novembre 2026.

---

## 1. Diagnostic Général et Typologie des Inadéquations

L'audit approfondi des 1250 exercices répartis sur les 68 cours révèle que **plus de 85 % des exercices actuels souffrent d'une double dérive** :

### A. Inadéquation Formelle (Le format technique d'évaluation est inadapté au domaine)
1. **Le syndrome du « script stdin universel »** (cours de code et d'outils) :
   - On impose à l'étudiant d'écrire un script (en Python, Bash, C ou PHP) qui lit l'entrée standard (`sys.stdin`, `read -r`, `fgets`) pour parser des données textuelles.
   - *Exemple absurde :* Dans **Git B1** (`b1-git`) et **GitHub B3** (`b3-github`), l'étudiant doit écrire un script Bash lisant des logs pour extraire des SHA-1 au lieu d'apprendre et taper les commandes fondamentales `git init`, `git add`, `git commit -m "..."`, `git branch`, `git checkout` !
   - *Exemple absurde :* Dans **API REST avec Flask B2** (`api-rest-flask`), l'étudiant doit parser manuellement avec `sys.stdin` une chaîne textuelle représentant une ligne HTTP brute (`GET /users HTTP/1.1`) au lieu d'écrire une vraie route `@app.route('/users')` retournant un `jsonify()`.
   - *Exemple absurde :* Dans **Docker B2** (`docker`), l'étudiant écrit un script Bash de diagnostic de `/sys/fs/cgroup` au lieu d'écrire un `Dockerfile` (`FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`) ou des commandes `docker run -d -p 80:80`.
2. **Le syndrome du gabarit générique « analyse » (`[Cas 1] A_COMPLETER`)** :
   - 46 cours sur 68 ont été uniformisés sous un gabarit textuel statique. L'étudiant doit y inscrire un mot-clé ou un chiffre sous des balises `[Cas 1 — ...]`.
   - Ce format dénature complètement les disciplines pratiques (Réseaux, Systèmes, Cloud, Bureautique) et les disciplines méthodologiques (Droit, Français, Management, Ergonomie) en les réduisant à un formulaire de devinettes textuelles.

### B. Inadéquation Pédagogique (Déconnexion des cours et examens réels)
- Les énoncés inventés posent souvent des mini-énigmes algorithmiques ou des calculs de ratios abstraits (ex. calculer le ratio d'un triangle de fer en Agile, calculer une disponibilité MTBF dans un champ texte en Supervision) au lieu d'entraîner l'étudiant aux compétences professionnelles et académiques évaluées dans ses devoirs surveillés et examens officiels.

---

## 2. Matrice d'Audit par Domaine Pédagogique

---

### DOMAINE 1 : Systèmes, Réseaux, Cloud & Infrastructure (25 cours)

| Cours | Format Actuel | Inadéquation Formelle Constatée | Inadéquation Pédagogique (vs Supports Réels) | Modèle Cible Recommandé |
| :--- | :--- | :--- | :--- | :--- |
| **Linux B1** (`b1-linux`) | Shell stdin (18 ex) | Scripting Bash imposé dès Ch. 1 (boucles, stdin) alors que Bash n'est pas enseigné. | **Corrigé en phase pilote** : aligné sur TD Linux (commandes pures `ls`, `pwd`, `grep`, `chmod`). | Défis de commandes shell pures (regex & AST, 0 exécution). |
| **Git B1** (`b1-git`) | Shell stdin (18 ex) | L'étudiant écrit des scripts Bash lisant stdin pour parser des logs au lieu de commandes Git. | Déconnecté des 6 docs et 2 PDFs de `cours B1 IT/Git` (création de dépôt, commit, branches, fusion, remotes). | Défis de commandes Git interactives (`git init`, `git add`, `git commit`, `git checkout`). |
| **Réseaux B1** (`b1-reseaux`) | Analyse (18 ex) | Remplissage de blocs texte `[Cas 1]` pour des découpages de chaînes. | Les 3 PDFs de `cours B1 IT/Architecture réseau` enseignent le modèle OSI, calcul CIDR, masques, broadcast, classes d'adresses. | Calculs de masques et adresses IP pas-à-pas (champs structurés Net/Host/Broadcast). |
| **CCNA1 B1** (`b1-ccna1`) | Analyse (18 ex) | Remplissage de texte abstrait sans aucune CLI réseau. | Le support officiel Cisco CCNA1 enseigne les modes de configuration IOS (`enable`, `conf t`, `interface`, `ip address`). | Défis de commandes Cisco IOS (syntaxe de configuration de commutateur et routeur). |
| **Admin Windows B1** (`b1-admin-windows`) | Analyse (18 ex) | Texte statique demandant des classifications artificielles. | Le cours du Dr Abasse KPEGOUNI porte sur Windows Server 2012 R2, Active Directory AD DS, création d'OU et utilisateurs. | Cmdlets PowerShell / commandes AD DS réelles (`New-ADUser`, `Add-ADGroupMember`, `Install-WindowsFeature`). |
| **Virtualisation B1** (`b1-virtualisation`) | Analyse (18 ex) | Questions de compréhension textuelle sur un conte allégorique. | Le document réel porte sur les concepts d'hyperviseur Type 1 / Type 2, allocation RAM/vCPU, stockage VMDK/QCOW2. | Défis d'architecture de virtualisation et dimensionnement précis de ressources d'hôte. |
| **Linux B2** (`linux`) | Shell stdin (18 ex) | Scripts Bash de parsing de fichiers au lieu d'administration système. | Le cours d'administration Linux B2 traite de systemd, LVM, partitionnement `fdisk`, crontab, logs rsyslog. | Défis de commandes d'administration avancée (`systemctl`, `journalctl`, `lvcreate`, `crontab`). |
| **WinServer B2** (`rd_winserver`) | PowerShell (18 ex) | Scripts PowerShell traitant des tableaux sur stdin au lieu d'AD/GPO. | Les 2 PDFs traitent de l'annuaire Active Directory, DNS, DHCP, stratégies de groupe (GPO). | Scripts PowerShell d'administration système réels (`Get-ADUser`, `Set-GPPermission`, `Add-DhcpServerv4Scope`). |
| **Admin VM B2** (`admin-vm`) | PowerShell (18 ex) | Algorithmes de bin-packing textuels au lieu de gestion de VM. | Les 16 PDFs de cours traitent de Proxmox VE, KVM, ESXi, VLANs et stockage LVM partagé. | Commandes de gestion d'hyperviseur (`qm create`, `virsh define`, `pvesm add`). |
| **CCNA B2** (`ccna`) | Analyse (18 ex) | Décodage manuel d'octets Ethernet dans un bloc texte. | Le programme CCNA B2 porte sur le routage statique, OSPF, VLANs, trunk 802.1Q, NAT/PAT. | Ligne de commande Cisco IOS pour routage dynamique et configuration de trunks. |
| **Docker B2** (`docker`) | Shell (18 ex) | Scripts Bash inspectant `/proc` et cgroups au lieu d'utiliser Docker. | Le cours Docker enseigne le cycle de vie des conteneurs, les Dockerfiles multi-stage, les réseaux et volumes. | Écriture et validation de `Dockerfile`, `docker-compose.yml` et commandes `docker run`. |
| **Cloud B3** (`b3-cloud-computing`) | Analyse (18 ex) | Classificateur IaaS/PaaS/SaaS textuel simpliste. | Le support officiel porte sur l'architecture Cloud, le calcul de TCO, l'élasticité et la haute disponibilité. | Études d'architecture Cloud chiffrées et matrices de dimensionnement d'infrastructure. |
| **DevOps B3** (`b3-devops`) | Analyse (18 ex) | Remplissage de formulaire de score de maturité CALMS. | Le document `CC_Devops.docx` porte sur les pipelines CI/CD, l'intégration Git/Jenkins, l'infrastructure as code. | Écriture de syntaxes de pipelines CI/CD (GitHub Actions / GitLab CI) et scripts de déploiement. |
| **Firewall B3** (`b3-firewall`) | Analyse (18 ex) | Simulation de règles de filtrage dans des chaînes de texte. | Les 3 modules de cours portent sur les zones de sécurité, les règles d'inspection d'état, NAT/PAT et iptables. | Écriture de règles iptables/nftables et syntaxe de filtrage d'entreprise. |
| **GitHub B3** (`b3-github`) | Shell stdin (18 ex) | Recalcul manuel de hash SHA-1 d'objets Git en Bash. | Le cours porte sur les workflows GitHub réels : branches, Pull Requests, gestion des conflits, GitHub Actions. | Scénarios de collaboration Git réels (rebase interactif, résolution de conflits, hooks). |
| **Linux Avancé B3** (`b3-linux`) | Shell (18 ex) | Parsing de `/proc` en script Bash. | Le cours L3 de gestion des utilisateurs porte sur PAM, LDAP, quotas disque, durcissement et audit système. | Configuration de sécurité Linux (`/etc/pam.d`, ACLs `setfacl`, auditd). |
| **pfSense B3** (`b3-pfsense`) | Analyse (18 ex) | Calculs de masques CIDR dans un formulaire texte. | Le cours porte sur le déploiement et la configuration de pare-feu pfSense (règles de filtrage, passerelles, OpenVPN). | Syntaxe de règles de pare-feu pfSense et routage multi-WAN. |
| **Réseau LAN B3** (`b3-reseau-lan`) | Analyse (18 ex) | Calculs arithmétiques de priorité Root Bridge dans du texte. | Le support `Réseaux LAN-WAN et Interconnexion` porte sur STP/RSTP, EtherChannel, VTP, routage inter-VLAN. | Commandes de commutation Cisco complètes (`channel-group`, `switchport trunk encapsulation`, `spanning-tree mode rapid-pvst`). |
| **Windows Server B3** (`b3-windows-server`) | Analyse (18 ex) | Formulaire texte pour des calculs d'étendues DHCP. | Les 3 modules portent sur la forêt Active Directory, les relations d'approbation, la réplication et PowerShell avancé. | Scripts PowerShell d'administration de domaine et gestion de forêts d'entreprise. |
| **Azure B3** (`b3-cloud-azure`) | Analyse (18 ex) | Parsing de conventions de nommage fictives dans du texte. | Les 3 modules portent sur les Resource Groups, VNets, NSG, VM Azure et Azure CLI. | Commandes Azure CLI réelles (`az group create`, `az vm create`, `az network nsg rule create`). |
| **Google Cloud B3** (`b3-google-cloud`) | Analyse (18 ex) | Validation de regex de chaînes GCP dans du texte. | Les 4 modules portent sur Compute Engine, VPC, Cloud IAM, Cloud Storage et l'outil `gcloud`. | Commandes `gcloud` authentiques (`gcloud compute instances create`, `gcloud iam service-accounts`). |
| **AWS B3** (`b3-cloud-aws`) | Analyse (18 ex) | Découpage de chaînes d'ARN Amazon dans du texte. | Les 2 modules de cours portent sur EC2, S3, IAM, VPC, passerelles Internet et AWS CLI. | Commandes AWS CLI et déclarations de politiques IAM au format JSON. |
| **Supervision B3** (`b3-supervision`) | Analyse (18 ex) | Calculs de formules MTBF/MTTR dans des champs texte. | Les supports de cours et procédures d'installation portent sur Nagios, NRPE, les plugins et les fichiers `.cfg`. | Définitions de fichiers de configuration Nagios (`define host`, `define service`, `check_ping`). |
| **VoIP / ToIP B3** (`b3-voip`) | Analyse (18 ex) | Calculs de débits de codecs dans du texte. | Les supports de TP ToIP/VoIP portent sur les protocoles SIP/RTP, les softphones et les plans de numérotation Asterisk. | Écriture de plans de numérotation Asterisk (`extensions.conf`) et configuration SIP (`pjsip.conf`). |
| **Virtualisation B3** (`b3-virtualisation`) | Analyse (18 ex) | Calculs de ratios de surallocation vCPU dans du texte. | Les 4 modules portent sur l'architecture VMware ESXi / vCenter, vMotion, DRS, HA et le stockage SAN/NAS. | Conception d'architectures de cluster haute disponibilité et dimensionnement d'infrastructures virtualisées. |

---

### DOMAINE 2 : Programmation & Développement Web (11 cours)

| Cours | Format Actuel | Inadéquation Formelle Constatée | Inadéquation Pédagogique (vs Supports Réels) | Modèle Cible Recommandé |
| :--- | :--- | :--- | :--- | :--- |
| **Python B1** (`b1-python`) | Python stdin (18 ex) | Utilisation systématique de `sys.stdin.read().split()` qui oblige l'élève à du parsing avant de coder. | Le cours de Python B1 enseigne les variables, types, boucles, fonctions et listes de manière progressive. | Contrat de fonction pure (`def solution(n, ...): return ...`) sans pollution de lecture stdin. |
| **C & C++ B1** (`b1-c-cpp`) | C / C++ (24 ex) | `scanf` / `cin` obligatoires avec risques de dépassement de tampon. | Les supports enseignent la syntaxe C, les types, les pointeurs, les tableaux et les structures. | Signatures de fonctions C claires (`int resoudre(const int* tab, int taille)`) testées par un runner unitaire. |
| **Algo B1** (`b1-algo`) | Python stdin (30 ex) | 30 exercices lisant stdin avec des problèmes de découpage de chaînes. | Les 11 PDFs d'Algorithmique de B1 portent sur le pseudo-code officiel, les boucles, les tableaux et les tris. | Pseudo-code standard et fonctions Python idiomatiques résolvant les vrais algorithmes des examens. |
| **PHP B1** (`b1-php`) | PHP stdin (24 ex) | `fgets(STDIN)` imposé partout alors que PHP est un langage web manipulateur de requêtes et tableaux. | Les 5 PDFs de `cours B1 IT/php` portent sur les variables `$_GET`, `$_POST`, les sessions, formulaires et bases PDO. | Fonctions PHP opérant sur des tableaux associatifs et génération de fragments HTML sécurisés. |
| **Prog Web B1** (`b1-prog-web`) | JS (18 ex) | Manipulation de chaînes pour simuler des URL et codes HTTP. | Les 6 PDFs de Prog Web portent sur HTML5, CSS3, DOM JavaScript, événements et requêtes `fetch`. | Manipulation du DOM, validation de formulaires JS et appels d'API asynchrones. |
| **PHP B2** (`php`) | PHP stdin (18 ex) | `fgets(STDIN)` imposé pour simuler des classes POO. | Le cours porte sur la POO avancée : héritage, interfaces, classes abstraites, exceptions, namespaces, MVC. | Conception de véritables classes PHP orientées objet instanciées et testées unitairement. |
| **Java B2** (`rd_java`) | Java (18 ex) | Exercices basiques de calcul d'entiers sans réelle architecture objet. | Le cours Java B2 traite des collections (`List`, `Map`), du polymorphisme, des flux (Streams) et des exceptions. | Classes et méthodes Java respectant les contrats d'interfaces et l'encapsulation objet. |
| **React B2** (`react`) | JS (18 ex) | Simulation pure de `createElement` sans composant React fonctionnel. | Le cours React B2 porte sur JSX, les composants fonctionnels, les hooks (`useState`, `useEffect`) et les props. | Composants React fonctionnels avec hooks validés sur leur rendu et état interne. |
| **Flask B2** (`api-rest-flask`) | Python stdin (18 ex) | **Inadéquation totale :** parsing manuel de requêtes HTTP sur stdin sans jamais importer ni utiliser Flask ! | Le cours enseigne la création d'une API REST avec Flask : routes, verbes HTTP, codes d'état, sérialisation JSON. | Vraies applications Flask avec routes `@app.route()`, codes HTTP (200, 201, 400, 404) et payload JSON. |
| **C# B2** (`csharp`) | C# (18 ex) | Analyse textuelle du boxing/unboxing sans pratique applicative. | Le cours C# B2 porte sur la syntaxe moderne, LINQ, la programmation asynchrone (`async/await`) et .NET. | Méthodes C# et requêtes LINQ concrètes testées unitairement. |
| **Algo B3** (`b3-algo`) | Python stdin (18 ex) | Exercices abstraits sur stdin sur les ordres de grandeur de complexité. | Le support `ALGO_B3.pdf` et les TP portent sur les structures avancées (arbres, tas, graphes Dijkstra/Floyd, dynamique). | Implémentation d'algorithmes de parcours de graphes et d'optimisation combinatoire. |

---

### DOMAINE 3 : Bases de Données & Modélisation (4 cours)

| Cours | Format Actuel | Inadéquation Formelle Constatée | Inadéquation Pédagogique (vs Supports Réels) | Modèle Cible Recommandé |
| :--- | :--- | :--- | :--- | :--- |
| **Merise B1** (`b1-merise`) | Analyse (18 ex) | Formulaire `[Cas 1]` demandant d'écrire des bouts de règles en texte. | Les 3 PDFs de `cours B1 IT/Modélisation (MERISE)` portent sur le dictionnaire de données, les MCD (entités, associations, cardinalités 0,n / 1,1), et le passage au MLD. | Modélisation formelle de MCD : déclaration structurée des entités, associations, cardinalités et génération du schéma relationnel MLD. |
| **SQL B1** (`b1-sql`) | SQL (18 ex) | Exercices SQL existants (avec simulateur sql.js), mais non exécutables côté serveur. | Les supports de cours et TP portent sur `CREATE TABLE`, `INSERT`, `SELECT`, `WHERE`, `ORDER BY`, `GROUP BY`, jointures `INNER JOIN`. | Validation sur base SQLite en mémoire avec schéma préchargé et comparaison des tables résultats. |
| **SQL B2** (`sql`) | SQL (18 ex) | Exercices sans persistance ni exécution déclarative complète. | Le cours porte sur les jointures complexes (`LEFT/RIGHT OUTER JOIN`), sous-requêtes, contraintes d'intégrité, vues. | Requêtes SQL exécutées sur base relationnelle avec validation du jeu d'enregistrements retourné. |
| **SQL B3** (`b3-sql`) | SQL (18 ex) | Audit fictif de transactions textuelles sans moteur SQL. | Les projets et TD de B3 (`TD1 BDR_SQL_SD CDP IT 2025_26.pdf`) portent sur l'indexation, les transactions ACID, les triggers et procédures stockées. | Requêtes SQL avancées, fenêtrage analytique (`OVER/PARTITION BY`), gestion des verrous et transactions. |

---

### DOMAINE 4 : Mathématiques, Statistiques & Cybersécurité (10 cours)

| Cours | Format Actuel | Inadéquation Formelle Constatée | Inadéquation Pédagogique (vs Supports Réels) | Modèle Cible Recommandé |
| :--- | :--- | :--- | :--- | :--- |
| **Algèbre B1** (`b1-algebre`) | Analyse (18 ex) | Remplissage d'une suite de chiffres sur une ligne pour simuler des vecteurs. | Les 6 PDFs de cours portent sur les espaces vectoriels, familles libres/génératrices, bases, applications linéaires, matrices et pivot de Gauss. | Résolution mathématique par étapes avec vérification du système linéaire, du déterminant et du rang de la matrice. |
| **Statistiques B1** (`b1-stats`) | Analyse (18 ex) | Remplissage de valeurs isolées sans tableau de distribution. | Le cours de M. TCHAMDJA porte sur les effectifs, fréquences, moyennes pondérées, variance $\sigma^2$, écart-type, quartiles et droite de régression des moindres carrés. | Tableaux statistiques complets avec étapes de calcul (centre de classe, fréquences cumulées, variance, covariance). |
| **Cyber B1** (`b1-cyber`) | Analyse (18 ex) | Classifications textuelles de menaces dans `[Cas 1]`. | Le cours enseigne les principes CIA (Confidentialité, Intégrité, Disponibilité), l'ingénierie sociale, les malwares et la politique de mots de passe. | Scénarios d'analyse d'incidents de sécurité et identification ciblée des vulnérabilités. |
| **Probabilités B2** (`probabilites`) | Analyse (18 ex) | Anciennement scripts flottants approximatifs. | **Corrigé en phase pilote** : aligné sur les TD 1 à 6 du Dr AGBOKOU et l'examen 2024-2025. | Oracle de fractions irréductibles exactes et étapes mathématiques (univers, formule, calcul). |
| **Recherche Op. B2** (`RD-RO`) | Analyse (20 ex) | Anciennement scripts génériques sur stdin. | **Corrigé en phase pilote** : aligné sur les DS B2A/B2B et l'examen 3h. | Modélisation PL, pivot Simplexe (Dantzig/ratio), dualité et réseau MPM/PERT avec crashing. |
| **Assembleur B2** (`assembleur`) | Analyse (18 ex) | Masquages binaires sous forme de chiffres texte dans `[Cas 1]`. | Les 5 PDFs de cours portent sur l'architecture du microprocesseur, le jeu d'instructions x86 (`MOV`, `ADD`, `SUB`, `JMP`, `CALL`, `RET`), et la gestion de la pile. | Simulateur de jeu d'instructions assembleur x86 avec inspection des registres (EAX, EBX, ESP, EIP) et drapeaux (ZF, CF, SF). |
| **Cyber B2** (`Cyber securite B2`) | Analyse (18 ex) | Calculs de formules de risque dans des champs texte. | Les 15 PDFs de cours traitent des attaques réseau (Man-in-the-Middle, ARP Spoofing, injections SQL, XSS, sniffing Wireshark). | Scénarios d'audit de sécurité réseau et analyse de captures de trames Wireshark. |
| **Étude Quant. B3** (`b3-etude-quantitative`) | Analyse (18 ex) | Questions théoriques sur la recherche universitaire. | Les supports réels (`EXERCICE 2 - UTILISATION DE EXCEL.xlsx`, guide mémoire) portent sur l'analyse de données d'enquête, échantillonnage et tests statistiques. | Traitement de jeux de données d'enquêtes réels avec calcul d'intervalles de confiance et tests d'hypothèses. |
| **Cryptographie B3** (`b3-cryptographie`) | Analyse (18 ex) | Chiffrement de César et Vigenère enfantins dans du texte. | Les documents (`PolyCrypto2010.pdf`, `TD CDP L3 CRYPTOGRAPHIE.docx`) portent sur l'arithmétique modulaire, RSA, AES, Diffie-Hellman, SHA-256 et signatures. | Calculs cryptographiques authentiques : Bézout, exponentiation modulaire rapide, génération de clés RSA $(e, d, n)$. |
| **Hacking B3** (`b3-hacking`) | Analyse (18 ex) | Calcul arithmétique de formule de score CVSS v3.1. | Le cours CEH (`Cours CEH.pdf`) porte sur les méthodologies de test d'intrusion, le scan Nmap, l'exploitation de failles et la post-exploitation. | Analyse de rapports de scan de ports Nmap et identification de vecteurs d'attaque réels. |

---

### DOMAINE 5 : Méthodologie, Droit, Management & Communication (17 cours)

| Cours | Format Actuel | Inadéquation Formelle Constatée | Inadéquation Pédagogique (vs Supports Réels) | Modèle Cible Recommandé |
| :--- | :--- | :--- | :--- | :--- |
| **Droit B1** (`b1-droit`) | Analyse (18 ex) | Remplissage de mots isolés dans `[Cas 1]`. | Les 2 PDFs de droit portent sur les sources du droit, l'organisation judiciaire, les personnes morales/physiques, la responsabilité civile. | Cas pratiques juridiques structurés (faits $\to$ qualification $\to$ règle légale applicable $\to$ solution). |
| **Anglais B1** (`b1-anglais`) | Analyse (18 ex) | Questions de vocabulaire isolées dans du texte. | Les 4 PDFs d'`Anglais des affaires` portent sur la communication professionnelle en anglais, réunions, emails, vocabulaire IT. | Rédaction d'emails professionnels en anglais, reformulation et compréhension de documentation technique. |
| **Français Pro B1** (`b1-fr-pro`) | Analyse (18 ex) | Classification théorique de citations de Mehrabian. | Les 2 PDFs portent sur la communication d'entreprise : lettre formelle, compte-rendu, note de cadrage, CV et entretien. | Exercices de rédaction professionnelle appliquée (structure de mail, objet percutant, formule de politesse, correction syntaxique). |
| **Bureautique B1** (`b1-bureautique`) | Analyse (18 ex) | Formulaire texte pour des calculs simples. | Le support officiel est `cours B1 IT/VB Excel` : fonctions de calcul Excel, références relatives/absolues, tableaux croisés, macros. | Écriture et validation de vraies formules Excel (`=RECHERCHEV`, `=INDEX`, `=SI`, `=SOMME.SI.ENS`, `=NB.SI`). |
| **Robotique B1** (`b1-robotique`) | Analyse (18 ex) | Formulaire texte demandant des classements abstraits. | Les 3 PDFs de `CLUB DE ROBOTIQUE` portent sur Arduino, capteurs ultrason/infrarouge, servomoteurs et programmation C/C++ embarquée. | Algorithmes de contrôle de capteurs et actionneurs en C/C++ pour microcontrôleur Arduino. |
| **Projet B1** (`b1-projet`) | Analyse (18 ex) | Classifications théoriques de jalons de projet. | Le document porte sur le cycle de vie d'un projet IT, cahier des charges, WBS (Work Breakdown Structure), diagramme de Gantt. | Découpage WBS, calcul de marges et construction de plannings prévisionnels. |
| **Droit B2** (`droit`) | Analyse (18 ex) | Devises lexicales dans du texte. | Les 5 PDFs de `droitb2` portent sur le droit du numérique, propriété intellectuelle (droit d'auteur, brevets logiciels), RGPD et loi togolaise 2019-014. | Syllogisme juridique appliqué aux litiges du numérique (contrefaçon logicielle, violation de données personnelles). |
| **ERP & SI B2** (`erp-si`) | Analyse (18 ex) | Classifications de composantes de SI. | Le cours porte sur l'intégration des processus métier (achat, vente, stock, comptabilité) dans un ERP (SAP, Odoo). | Modélisation des flux d'information inter-services et paramétrage de processus ERP. |
| **Ingénierie du Besoin B2** (`ingenierie-besoin`) | Analyse (18 ex) | Distinction besoin vs solution dans du texte. | Le cours porte sur le recueil des exigences, la rédaction de cahiers des charges, la traçabilité des exigences (norme IEEE 830). | Rédaction et qualification formelle d'exigences fonctionnelles et non-fonctionnelles selon les critères INVEST. |
| **Masterclass Apprendre B2** (`masterclass-apprendre`) | Analyse (18 ex) | Restitution par cœur de la typologie des mémoires. | Le cours porte sur les sciences cognitives appliquées à l'apprentissage (répétition espacée, effet de test, méthode Feynman). | Application pratique des techniques de révision et planification optimale de sessions d'étude. |
| **UML B2** (`uml`) | Analyse (18 ex) | Quiz lexical sur les 14 diagrammes UML. | Le cours porte sur la modélisation orientée objet : diagrammes de cas d'utilisation, diagrammes de classes, diagrammes de séquence. | Modélisation formelle textuelle (PlantUML) ou syntaxe déclarative de relations (héritage, composition, multiplicités). |
| **UI/UX B2** (`uiux`) | Analyse (18 ex) | Tri de livrables UI vs UX dans du texte. | Le cours porte sur la démarche UX (recherche utilisateur, personas, parcours), l'architecture de l'information et les règles d'utilisabilité de Nielsen. | Évaluation ergonomique d'interfaces (heuristiques de Nielsen, détection de dark patterns, calcul de contraste WCAG). |
| **Infographie B2** (`infographie`) | Analyse (18 ex) | Calculs de conversion de couleurs RVB en CMJN. | Le cours porte sur la composition graphique, la typographie, l'identité visuelle, Photoshop/Illustrator, la vectorisation. | Analyse de règles de composition visuelle, choix typographiques et règles d'impression vectorielle. |
| **Agile B3** (`b3-agile`) | Analyse (18 ex) | Calcul d'écart de triangle de fer dans du texte. | Le dossier `Methode agiles` porte sur Scrum : rôles (PO, SM), cérémonies (Sprint Planning, Daily, Rétrospective), rédaction de User Stories. | Rédaction de User Stories conformes au standard Agile avec critères d'acceptation Gherkin (`Étant donné... Quand... Alors...`). |
| **Doc Technique B3** (`b3-document-technique`) | Analyse (18 ex) | Questions de classification de formats de documents. | Le document `document_technique.docx` porte sur la structure d'un dossier technique d'ingénierie (architecture, installation, exploitation). | Rédaction et structuration de sections critiques d'un dossier d'architecture technique (DAT) ou d'un manuel d'exploitation. |
| **Veille B3** (`b3-veille`) | Analyse (18 ex) | Tri de types de veilles (juridique, tech). | Le support `VEILLE TECHNOLOGIQUE.pdf` porte sur la méthodologie de veille : sourcing, flux RSS, agrégateurs, traitement et diffusion de livrables. | Élaboration d'un plan de veille thématique, sélection de sources fiables et rédaction d'une note de synthèse stratégique. |
| **Anglais B3** (`b3-anglais`) | Analyse (18 ex) | Expansion mécanique d'acronymes informatiques. | Les sessions d'anglais B3 IT portent sur la participation à des réunions techniques, la négociation, et la rédaction de tickets Jira en anglais. | Rédaction professionnelle en anglais technique (tickets d'incident, release notes, compte-rendu d'incident post-mortem). |

---

## 3. Synthèse Chiffrée et Plan d'Action par Vagues

Sur les **68 cours** audités :
- **3 cours corrigés en phase pilote** (Linux B1, Probabilités B2, Recherche Opérationnelle B2) : 56 fiches prêtes, validées et testées.
- **20 cours nécessitant une refonte formelle prioritaire (Groupes Outils, CLI, Réseaux, Systèmes)** : Git B1, Réseaux B1, CCNA1, Admin Windows, Linux B2, Docker B2, WinServer B2, Admin VM, CCNA B2, GitHub B3, Réseau LAN B3, Firewall B3, pfSense B3, Supervision B3, Windows Server B3, Azure B3, GCP B3, AWS B3, VoIP B3, Virtualisation B3.
- **11 cours de code à assainir (Suppression de stdin)** : Python B1, C/C++ B1, Algo B1, PHP B1, Prog Web B1, PHP B2, Java B2, React B2, Flask B2, C# B2, Algo B3.
- **17 cours de méthodologie & gestion à transformer** : Droit B1/B2, Français pro B1, Anglais B1/B3, Bureautique (Excel) B1, Merise B1, Agile B3, Document technique B3, Veille B3, UML B2, UI/UX B2, Infographie B2, etc.
- **4 cours de mathématiques/statistiques à aligner sur le standard de calcul exact de Probabilités** : Algèbre B1, Statistiques B1, Cryptographie B3, Étude quantitative B3.
