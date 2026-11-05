# 17_BILAN_FINAL — SYNTHESE ET REPONSES AUX 30 QUESTIONS OBLIGATOIRES DU CONTRE-AUDIT

**Projet :** `revi-cours-html`  
**Répertoire :** `/home/rd/Desktop/proba`  
**Branche :** `remediation-pedagogique-qualite` (commit `20dc28e`)  
**Mission :** Contre-audit indépendant contradictoire et forensique de la livraison `AUDIT_GLOBAL_FINAL/`.

---

# PARTIE I — REPONSES PRECISES AUX 30 QUESTIONS DU MANDAT (SECTION 23)

### Question 1 : Le générateur précédent est-il fiable ?
**NON.** Le script `scripts/build_audit_global_csvs.js` n'est pas fiable. Il utilise des troncatures arbitraires (`slice()`) pour forcer des effectifs d'affichage (814 et 3 089), injecte des constantes textuelles de complaisance sans exécution (85 occurrences détectées), lit un ancien CSV au lieu des sources, et hardcode le ratio d'asymétrie à `> 2.0x`.

### Question 2 : Combien de statuts de preuve étaient artificiellement attribués ?
Au moins **85 occurrences de statuts et preuves pré-remplis** ont été identifiées dans le code du générateur (`TESTEE_RUNNER_OK`, `VERIFIEE_NON_REGRESSION`, `SPECIFIE_DANS_ENONCE`, `PROTEGE_SERVEUR_FASTIFY`, `CONFORME_VALIDATION_TECHNIQUE`). Sur les 814 fiches analysées par ce script, 100 % ont reçu ces statuts par injection de chaînes constantes sans exécution unitaire individuelle.

### Question 3 : Les 1 250 exercices sont-ils réellement présents ?
**OUI.** L'inspection directe de `server/exercises/index.js` et du catalogue confirme la présence effective de **1 250 exercices uniques**. Aucun doublon d'identifiant n'a été constaté.

### Question 4 : Le catalogue contient-il bien 68 configurations de cours ?
**OUI.** Le fichier `server/exercises/course-config.js` déclare exactement **68 cours avec ateliers interactifs** (23 en B1, 22 en B2 et 23 en B3). Les 3 cours de `COURSES` non configurés sont `b1-sql` (simulateur WASM autonome), `preparation-web` et `epreuves`.

### Question 5 : Les 82 exercices pilotes sont-ils réellement validés ?
**OUI.** Les 82 exercices se décomposent en **55 exercices des trois pôles pilotes historiques** (`b1-linux`: 18, `probabilites`: 19, `RD-RO`: 18), couverts par des bancs de tests dédiés (`tests/refonte-*.test.js`), et **27 exercices de lots unitaires testés** (`b1-python`, `b1-c-cpp`, `rd_winserver`, `react`). Leur validité technique et didactique est confirmée.

### Question 6 : Les 814 identifiants sont-ils exactement réconciliés ?
**OUI SUR LE PLAN THEORIQUE, MAIS ALTERES DANS L'AUDIT AUDITE.**
L'effectif théorique est rigoureusement de $1\,250 - 354 \text{ (suspendus)} - 82 \text{ (pilotes)} = \mathbf{814}$.  
Cependant, le générateur précédent a redéfini les cours pilotes, obtenu 858 fiches, puis appliqué `slice(0, 814)`. Ce découpage a **supprimé 44 fiches actives de B3** (`sup3`, `vo3`, `vrt3`) et conservé 44 fiches B2 qui n'auraient pas dû s'y trouver. Le contre-audit rétablit la liste authentique dans `06_AUDIT_814_EXERCICES.csv`.

### Question 7 : Le chiffre de 652 est-il reproductible depuis les vrais tests ?
**NON.** Le chiffre de 652 fiches (soit 80,10 %) prétendument privées de tests limites et négatifs est un artefact produit par une recherche textuelle simpliste sur le seul champ `description` (162 fiches détectées, $814 - 162 = 652$).  
L'analyse forensique complète (prenant en compte les valeurs réelles de `stdin`, `expected` et les règles d'assertion) prouve que **263 fiches disposent de tests limites ou négatifs réels**. Le contingent d'exercices purement nominaux s'élève à **551 fiches** (67,69 %).

### Question 8 : Les 354 suspensions ont-elles été recalculées ?
**OUI.** Le recalcul direct via `server/exercises/grading-policy.js` confirme rigoureusement :
- 126 exercices suspendus par cours global (7 cours de 18 exercices : `csharp`, `docker`, `b3-linux`, `b3-github`, `b1-sql`, `sql`, `b3-sql`).
- 1 exercice suspendu individuellement (`algo-c9-e2`).
- 227 exercices suspendus par absence d'empreinte SHA-256 valide dans `grading-evidence.json`.
Total : $126 + 1 + 227 = \mathbf{354}$ suspensions exactes.

### Question 9 : Combien d'exercices disposent d'une vraie preuve individuelle ?
Seuls les **82 exercices pilotes et de lots testés** disposent d'une preuve de réussite unitaire fraîchement démontrée par des suites dédiées. Les **814 fiches actives non-pilotes** n'ont fait l'objet d'aucune exécution unitaire individuelle enregistrée dans le cadre de l'Audit Global et doivent être qualifiées de `NON_VERIFIE_EXECUTION_INDIVIDUELLE`.

### Question 10 : Combien de sources QCM existent réellement ?
Il existe **64 modules de cours dans `server/content/`** (contenant 2 925 questions de chapitres) et **26 fichiers de pages d'examen** contenant une constante `mastery` ou `EXAMEN_QCM` (totalisant 260 questions d'examen). En marge du corpus principal, 7 cours disposent de fichiers autonomes `qcm-100.js` (totalisant 500 questions servies côté client).

### Question 11 : Le corpus contient-il 3 089, 3 158 ou un autre nombre d'items ?
Le corpus exhaustif réel contient exactement **3 185 questions uniques** ($2\,925 \text{ chapitres} + 260 \text{ examens}$).  
- Le chiffre de 3 089 résultait d'une troncature par `slice(0, 2829)` de 69 questions de chapitres.  
- Le chiffre de 3 158 omettait les 27 questions du cours `Cyber securite B2` à cause d'une discordance de nom de dossier (`cyber-securite-b2`).

### Question 12 : Les 69 questions supplémentaires sont-elles identifiées ?
**OUI.** Ce sont très exactement les 69 questions de chapitres situées au-delà de l'index 2 829 dans le tableau `rawChapterItems` de `scripts/build_finalisation_manifests.js` (ligne 484), réintégrées dans notre inventaire `08_INVENTAIRE_QCM.json`.

### Question 13 : Les identifiants QCM sont-ils uniques ?
**OUI.** La totalité des 3 185 questions dispose d'un identifiant normalisé et unique (ex: `QCM-linux-C3-Q5`, `QCM-b1-algebre-EXAM-Q2`). Zéro doublon détecté.

### Question 14 : Les options complètes ont-elles été extraites ?
**OUI.** Le fichier `08_INVENTAIRE_QCM.json` consigne l'intégralité du texte des options, sans troncature, pour les 3 185 questions.

### Question 15 : Les clés originales sont-elles présentes dans le manifeste privé ?
**OUI.** L'indice de la réponse correcte (`reponse_correcte`, de 0 à 3) est rigoureusement conservé dans `08_INVENTAIRE_QCM.json` et `MANIFESTES/08_INVENTAIRE_QCM_COMPLET.json`.

### Question 16 : Les 184 questions historiques sont-elles correctement reconstituées ?
**OUI.** Les 184 identifiants originaux ont été extraits de `FINALISATION_REMEDIATION/flagged_184_items.json`. Le contre-audit a également mis en évidence que ce chiffre résultait d'un forçage par quotas (78 + 46 + 32 + 28 = 184).

### Question 17 : Combien de formulations négatives réelles existent ?
L'analyse sémantique exhaustive des 3 185 énoncés identifie **31 questions réelles avec formulation négative** ("n'est pas", "faux", "incorrect", "sauf", "ne permet pas"). Les chiffres antérieurs (78) incluaient des faux positifs (mots situés dans les explications ou énoncés affirmatifs citant une commande).

### Question 18 : Combien de questions possèdent réellement une option toutes/aucune ?
Exactement **33 questions réelles** comportent une option de type « toutes les réponses », « aucune des réponses » ou « les deux ».

### Question 19 : Combien de questions dépassent réellement le ratio 2.0 ?
- En longueur de caractères : **983 questions** (30,86 %).
- En nombre de mots : **976 questions** (30,64 %).
- Cumul (ratio caractères OU ratio mots $\ge 2.0$) : **1 160 questions** (36,42 %).  
L'asymétrie de longueur est donc un phénomène généralisé, bien plus étendu que les 701 fiches annoncées.

### Question 20 : Quelle est l'intersection réelle entre 184 et les asymétries ?
Dans les registres historiques, l'intersection compte exactement **41 questions**.

### Question 21 : L'union est-elle effectivement égale à 844 ?
**OUI.** L'équation historique est confirmée :
$$|H \cup L| = 184 + 701 - 41 = \mathbf{844} \text{ questions uniques}$$

### Question 22 : Les 931 fichiers HTML sont-ils correctement réconciliés avec les 832 pages générées ?
**OUI.**
- **832 pages** correspondent aux 13 pages générées par kit pour les 64 cours générés ($64 \times 13 = 832$).
- **931 fichiers** représentent l'ensemble des pages de cours servies : 868 pages générées + 60 pages manuelles des 4 cours B1 + 3 pages de la section `preparation-web`.

### Question 23 : Les preuves HTTP sont-elles fraîches ou héritées ?
**HERITEES.** Le fichier `http_adversarial_proofs.log` dans `AUDIT_GLOBAL_FINAL/PREUVES/` possède une empreinte SHA-256 (`a663f486db33...`) identique octet par octet à celle de `CONTRE_AUDIT_FINAL/PREUVES/`.

### Question 24 : Les preuves PostgreSQL sont-elles fraîches ou héritées ?
**HERITEES.** Le fichier `postgresql_isolated_run.log` est identique octet par octet au journal de `CONTRE_AUDIT_FINAL` (SHA-256 : `8ed67a0305b4...`).

### Question 25 : La suite complète a-t-elle été réellement rejouée ?
**NON.** Le journal `npm_test_full.log` (1,59 Mo, 50 000 assertions) archivé dans `AUDIT_GLOBAL_FINAL/PREUVES/` est une copie conforme de celui de `CONTRE_AUDIT_FINAL` (SHA-256 : `a94a4774bda1...`).

### Question 26 : Les déclarations WCAG sont-elles démontrées ?
**PARTIELLEMENT.** La déclaration de non-conformité totale était exagérée. Les boutons d'options sont natifs (`<button class="opt">`) et accessibles au clavier, les contrastes sont conformes WCAG AA. En revanche, l'absence de sémantique `role="radiogroup"` et d'annonces `aria-live` pour les lecteurs d'écran est confirmée.

### Question 27 : Les conclusions de sécurité sont-elles limitées au périmètre testé ?
**OUI.** Les garanties sont strictement limitées à la couche applicative Fastify et aux 12 vecteurs unitaires testés par `tests/qcm-security.test.js`.

### Question 28 : Quelles affirmations des rapports précédents doivent être retirées ?
1. L'affirmation que les 814 fiches ont été individuellement vérifiées par runner (`TESTEE_RUNNER_OK`).
2. L'affirmation que le corpus QCM ne compte que 3 089 items.
3. L'affirmation que 652 fiches ont 0 test limite/négatif (le vrai chiffre est 551).
4. L'affirmation que les preuves d'audit global étaient fraîches et réexécutées.
5. La qualification d'inaccessibilité totale du gabarit QCM.

### Question 29 : Quels résultats sont suffisamment fiables pour guider une remédiation ?
1. Le catalogue des 1 250 exercices et les 354 suspensions décomposées.
2. Le registre exhaustif des 3 185 questions QCM (`08_INVENTAIRE_QCM.json`).
3. L'inventaire des 1 160 questions asymétriques avec leurs ratios calculés réels.
4. La liste des 551 fiches d'exercices purement nominales nécessitant des tests robustes.
5. L'architecture de sécurisation Fastify `/api/qcm`.

### Question 30 : Quelles validations nécessitent encore une intervention humaine ?
1. **L'arbitrage didactique des 41 QCM prioritaires** et la validation des réécritures des 31 questions négatives par une commission enseignante.
2. **L'audit des contrats de réponse des 551 exercices de code** pour s'assurer que les énoncés précisent les formats requis.
3. **La conception des nouveaux ateliers de code pour les 7 cours suspendus** (notamment l'intégration du moteur SQL interactif).

---

# PARTIE II — INTERDICTIONS FORMELLES DE CERTIFICATION

En application stricte de la déontologie scientifique et de l'ingénierie qualité :

1. **INTERDICTION DE CERTIFIER LES 814 EXERCICES EN NOTATION SOMMATIVE OFFICIELLE** :
   Tant que les 551 fiches purement nominales n'ont pas été dotées d'au moins un cas limite et un cas négatif, et tant qu'un banc de certification unitaire individuel n'a pas été exécuté, ces exercices doivent être cantonnés à l'**entraînement formatif seul**.
2. **INTERDICTION DE CERTIFIER LA BANQUE QCM COMME CONFORME AUX STANDARDS INTERNATIONAUX** :
   Avec 36,42 % de questions présentant un biais d'asymétrie supérieur à 2.0x, la banque ne peut servir à des examens certifiants à fort enjeu avant harmonisation des distracteurs.
3. **INTERDICTION DE DECLARER LE SITE 100 % ACCESSIBLE WCAG** :
   Tant que les attributs `role="radiogroup"`, `aria-checked` et `aria-live` n'ont pas été intégrés au gabarit `scripts/course-kit.js`.
