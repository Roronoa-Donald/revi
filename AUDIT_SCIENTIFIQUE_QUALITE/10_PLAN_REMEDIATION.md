# Livrable 10 — Plan d'Action et Recommandations Scientifiques de Remédiation

> Répertoire d'audit : `AUDIT_SCIENTIFIQUE_QUALITE/`  
> Projet audité : `revi-cours-html`  
> Cadre d'application : Standards AERA/APA/NCME (2014), Biggs (1996), Webb (1997), Mislevy et al. (2003), NBME (2024), Hattie & Timperley (2007).

---

## 1. Principes Directeurs du Plan de Remédiation

Conformément au mandat d'audit, **aucune modification n'est appliquée directement au cours de cette phase diagnostique**. Ce plan formule les prescriptions architecturales et pédagogiques ordonnées par priorité d'impact métrologique.

---

## 2. Programmation des Actions par Vagues de Priorité

### VAGUE 1 — Mesures d'Urgence : Sécurité Métrologique et Intégrité du Moteur
*Objectif : Éliminer les failles critiques permettant la fraude triviale et les faux négatifs/positifs algorithmiques.*

1. **Suppression de la fuite `data-correct="1"` dans les QCM ([`scripts/course-kit.js`](file:///home/rd/Desktop/proba/scripts/course-kit.js)) :**
   - *Action :* Retirer l'attribut `data-correct` du DOM client.
   - *Architecture cible :* Soumettre le choix sélectionné à une route API `/api/qcm/verify` (ou vérifier via un hash salé non réversible côté client) pour restaurer l'intégrité de l'évaluation formative.
2. **Correction des algorithmes de normalisation dans [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js) :**
   - *Action 1 (Faux positifs) :* Désactiver `expandMul` dans le mode général `analyse` ; la réserver exclusivement aux cours de modélisation mathématique (RO B2).
   - *Action 2 (Faux négatifs) :* Filtrer les invites textuelles d'entrée standard (ignorer les lignes préfixées par `Entrez...`, `Donnez...` ou se terminant par `: ` avant d'évaluer la sortie utile).
   - *Action 3 (Flottants) :* Injecter une tolérance numérique par défaut ($10^{-5}$) pour tout test comparant des nombres décimaux en programmation.
3. **Instrumentation de la télémétrie psychométrique :**
   - *Action :* Créer la table `exercise_submissions` dans PostgreSQL (`server/migrations/006_telemetry.sql`) pour enregistrer chaque tentative d'étudiant (identifiant, temps, réponse, motif d'erreur) en vue de l'analyse empirique réelle.

---

### VAGUE 2 — Remédiation des Disciplines Outils, Systèmes & Réseaux (25 cours)
*Objectif : Remplacer les scripts de parsing de log et les formulaires texte par des interactions professionnelles réelles.*

1. **Généralisation du validateur de commandes déterministe ([`command-validator.js`](file:///home/rd/Desktop/proba/server/exercises/command-validator.js)) :**
   - Étendre le validateur AST/Regex sans exécution système aux cours suivants :
     - **Git B1** (`b1-git`) et **GitHub B3** (`b3-github`) : 18 exercices de commandes Git interactives (`git init`, `git add`, `git commit -m "..."`, `git branch`, `git checkout -b`).
     - **Docker B2** (`docker`) : validation de syntaxes de `Dockerfile` (`FROM`, `WORKDIR`, `RUN`, `CMD`) et de commandes `docker run`, `docker-compose up`.
     - **Linux B2** (`linux`) et **Linux Avancé B3** (`b3-linux`) : commandes d'administration `systemctl`, `journalctl`, `fdisk`, `crontab`, `setfacl`.
2. **Création d'un validateur d'environnement Cisco IOS (Réseaux B1, CCNA1, CCNA B2, Réseau LAN B3) :**
   - Évaluer la séquence exacte des commandes de configuration des routeurs et commutateurs (`enable`, `configure terminal`, `interface g0/0`, `ip address <IP> <MASQUE>`, `no shutdown`, `vlan <ID>`, `switchport mode trunk`).
3. **Validation de scripts d'administration PowerShell (Admin Windows B1, WinServer B2, WinServer B3) :**
   - Valider la syntaxe des cmdlets officielles Active Directory et services réseau (`New-ADUser`, `Add-ADGroupMember`, `Install-WindowsFeature -Name AD-Domain-Services`).

---

### VAGUE 3 — Assainissement des Cours de Programmation & Web (11 cours)
*Objectif : Supprimer la variance non liée au construit causée par `sys.stdin` et rétablir des contrats de code propres.*

1. **Adoption universelle du contrat de fonction pure :**
   - Remplacer l'obligation de lire sur l'entrée standard par des fonctions à tester unitairement :
     ```python
     # Avant (artificiel) :
     # s = sys.stdin.read().split()
     # Après (pédagogique) :
     def calculer_tarif(duree_minutes: int, type_vehicule: str) -> float:
         # Implémentation de l'étudiant
     ```
   - Le moteur injecte directement les arguments et teste la valeur de retour, éliminant 100 % des erreurs de parsing de chaînes.
2. **Refonte fondamentale du cours API REST avec Flask ([`api-rest-flask`](file:///home/rd/Desktop/proba/server/exercises/api-rest-flask.js)) :**
   - Fournir un squelette d'application Flask réel (`app = Flask(__name__)`).
   - Tester les routes déclarées via le client de test natif de Flask (`app.test_client().get('/api/...')`), en vérifiant le code HTTP (200, 201, 404) et le dictionnaire JSON retourné.

---

### VAGUE 4 — Élévation Cognitive des Disciplines Méthodologiques et Juridiques (17 cours)
*Objectif : Passer du rappel de vocabulaire (DOK 1) à la pensée stratégique et à la rédaction professionnelle (DOK 2 et 3).*

1. **Droit Informatique (Droit B1 & Droit B2) :**
   - Structurer les exercices sous forme de cas pratiques complets avec validation par étapes du syllogisme juridique :
     - Étape 1 : Qualification juridique des faits.
     - Étape 2 : Identification du fondement légal (articles du Code pénal togolais ou loi 2019-014 relative à la cybersécurité).
     - Étape 3 : Solution argumentée du litige.
2. **Bureautique B1 ([`b1-bureautique`](file:///home/rd/Desktop/proba/server/exercises/b1-bureautique.js)) :**
   - Évaluer la formulation syntaxique exacte des formules de calcul Excel (`=RECHERCHEV(...)`, `=SI(...)`, `=SOMME.SI.ENS(...)`).
3. **Modélisation de Données (Merise B1 & UML B2) :**
   - Mettre en place une syntaxe déclarative formelle (ex: notation PlantUML ou dictionnaire relationnel) permettant à l'étudiant de spécifier explicitement les entités, attributs, associations et cardinalités.
4. **Méthodes Agiles B3 ([`b3-agile`](file:///home/rd/Desktop/proba/server/exercises/b3-agile.js)) :**
   - Valider la rédaction de User Stories conformes aux critères INVEST et aux critères d'acceptation Gherkin (`Étant donné... Quand... Alors...`).

---

### VAGUE 5 — Qualité Rédactionnelle des QCM (Guide NBME 2024)
*Objectif : Éliminer les biais d'évaluation permettant la réussite sans apprentissage.*

1. **Péréquation de la longueur des options (1 193 items à réviser) :**
   - Réécrire les distracteurs pour leur conférer une longueur, un niveau de détail et une tonalité technique identiques à la bonne réponse.
2. **Élimination définitive des options « Toutes/Aucune des réponses » (225 items) :**
   - Remplacer ces options paresseuses par des distracteurs plausibles basés sur des erreurs de raisonnement réelles.
3. **Suppression des formulations négatives (173 items) :**
   - Transformer les questions négatives en questions d'application directes.

---

### VAGUE 6 — Enrichissement Pédagogique du Feedback (Hattie & Timperley 2007)
*Objectif : Remplacer le verdict binaire `wrong_output` par un diagnostic constructif.*

1. **Renseignement systématique des champs `test.hint` et `test.explanation` :**
   - Pour chaque cas de test masqué, consigner l'explication conceptuelle de l'échec (ex: *« Votre fonction ne gère pas le cas limite où la liste est vide »* ou *« Votre règle de pare-feu bloque le trafic retour établi »*).
2. **Transmission de pistes de remédiation (*Feed Forward*) :**
   - Guider l'étudiant vers la section précise du cours à réviser en cas d'erreurs récurrentes.
