# Livrable 03 — Argumentaire de Validité selon les Standards AERA / APA / NCME (2014)

> Répertoire d'audit : `AUDIT_SCIENTIFIQUE_QUALITE/`  
> Projet audité : `revi-cours-html`  
> Cadre d'évaluation : **AERA, APA, NCME — Standards for Educational and Psychological Testing (2014, Chapitre 1 — *Validity*)**.

---

## 1. Cadre d'Analyse : La Validité comme Argument Unifié

Selon le Chapitre 1 des *Standards de 2014*, la validité n'est pas une propriété intrinsèque d'un test, mais le degré auquel les preuves scientifiques et la théorie soutiennent l'interprétation des scores proposée pour l'usage prévu du test (*« Validity refers to the degree to which evidence and theory support the interpretations of test scores for proposed uses of tests »*).

L'audit analyse ci-dessous les preuves disponibles et manquantes à travers les cinq sources reconnues par les Standards.

---

## 2. Analyse Détaillée des Cinq Sources de Preuves

### A. Preuves Fondées sur le Contenu du Test (*Evidence Based on Test Content*)

- **Définition :** Analyse de la relation entre le contenu d'un test (thèmes, libellés des tâches, format des questions) et le domaine de connaissances ou compétences qu'il est censé mesurer.
- **Constats et preuves observées :**
  1. **Sous-représentation critique du construit (*Construct Underrepresentation*) :**
     - Dans le domaine des **Réseaux** ([`b1-reseaux`](file:///home/rd/Desktop/proba/server/exercises/b1-reseaux.js), [`b1-ccna1`](file:///home/rd/Desktop/proba/server/exercises/b1-ccna1.js), [`ccna`](file:///home/rd/Desktop/proba/server/exercises/ccna.js), [`b3-reseau-lan`](file:///home/rd/Desktop/proba/server/exercises/b3-reseau-lan.js)), les objectifs annoncés concernent la configuration d'équipements actifs (routeurs et commutateurs Cisco). Or, les tâches proposées se limitent à du calcul d'octets dans un formulaire texte `[Cas 1]`. La compétence fondamentale d'administration IOS (`configure terminal`, adressage d'interface, routage OSPF, Spanning Tree) n'est jamais activée.
     - En **Bureautique** ([`b1-bureautique`](file:///home/rd/Desktop/proba/server/exercises/b1-bureautique.js)), le support de cours de référence est le tableur Excel et VBA (`cours B1 IT/VB Excel`). Les exercices demandent d'écrire des nombres bruts dans un bloc-notes plutôt que de concevoir des formules dynamiques (`=RECHERCHEV`, `=SOMME.SI`, `=SI`).
     - En **Droit Informatique** ([`b1-droit`](file:///home/rd/Desktop/proba/server/exercises/b1-droit.js), [`droit`](file:///home/rd/Desktop/proba/server/exercises/droit.js)), la compétence académique et professionnelle est la résolution de cas pratiques par le syllogisme juridique (Faits $\to$ Problème $\to$ Règle légale $\to$ Solution). L'exercice actuel demande de deviner des mots isolés.
  2. **Variance non liée au construit (*Construct-Irrelevant Variance*) :**
     - Dans les cours de programmation ([`b1-python`](file:///home/rd/Desktop/proba/server/exercises/b1-python.js), [`b1-algo`](file:///home/rd/Desktop/proba/server/exercises/b1-algo.js), [`b1-php`](file:///home/rd/Desktop/proba/server/exercises/b1-php.js)), l'imposition de la lecture sur `sys.stdin` contraint l'étudiant à écrire un code de désérialisation textuelle complexe (`sys.stdin.read().split()`) avant de traiter le problème métier. Une erreur de découpage de chaîne conduit à l'échec de l'exercice, quand bien même la logique algorithmique sous-jacente est parfaitement maîtrisée.
- **Conclusion sur le contenu :** **Non-conformité démontrée sur 234 exercices** ; menace sévère sur 1 016 exercices.

---

### B. Preuves Fondées sur les Processus de Réponse (*Evidence Based on Response Processes*)

- **Définition :** Examen de la conformité entre les processus cognitifs effectivement engagés par l'étudiant et ceux prévus par la théorie du construit.
- **Constats et preuves observées :**
  1. **Contournement par heuristique de surface dans les QCM :**
     - L'audit a démontré que dans **38,6 % des QCM (1 193 items)**, la bonne réponse est significativement plus longue et détaillée que les distracteurs. L'opération cognitive de l'étudiant consiste à repérer la proposition la plus fournie (*length heuristic*) sans mobiliser de raisonnement disciplinaire.
     - Dans **8,9 % des QCM (274 items)**, la présence d'un indice d'association lexicale directe (*clang association*) permet d'apparier un mot du tronc avec la clé sans compréhension.
  2. **Contournement par devinette de format dans le mode `analyse` :**
     - L'étudiant cherche à satisfaire la regex de normalisation (essayer des variations minuscules/majuscules, avec ou sans deux-points) plutôt qu'à approfondir la notion.
  3. **Fraude triviale par inspection du DOM :**
     - La présence de l'attribut `data-correct="1"` sur les boutons d'options dans le navigateur annule totalement la validité du processus de réponse des QCM en situation d'évaluation autonome.
- **Conclusion sur les processus de réponse :** **Menace majeure sur la validité**. Les traces observables reflètent trop souvent des stratégies de *test-wiseness* ou de rétro-ingénierie de l'interface.

---

### C. Preuves Fondées sur la Structure Interne (*Evidence Based on Internal Structure*)

- **Définition :** Analyse du degré de cohérence entre les relations inter-items (corrélations, dimensions factorielles) et la structure théorique du construit évalué (unidimensionnalité vs multidimensionnalité).
- **Constats et limites méthodologiques :**
  - **Absence de données empiriques :** La plateforme n'enregistrant pas l'historique des soumissions individuelles des étudiants, aucune matrice de corrélation inter-items, aucune analyse factorielle confirmatoire (CFA) et aucun calcul de consistance interne ($\alpha$ de Cronbach ou KR-20) ne peuvent être calculés scientifiquement à ce stade sans fabriquer artificiellement des données (ce qui est expressément proscrit).
  - **Observation qualitative structurelle :** Les ateliers de 3 exercices par chapitre agrègent sous un score unique des compétences hétérogènes sans pondération explicite, ce qui crée une présomption de multidimensionnalité non contrôlée.
- **Conclusion sur la structure interne :** **Absence de preuves suffisantes**. Phase pilote empirique obligatoire.

---

### D. Preuves Fondées sur les Relations avec d'Autres Variables (*Relations to Other Variables*)

- **Définition :** Vérification des corrélations entre les résultats au test et des critères externes pertinents (validité convergente, discriminante, prédictive des examens terminaux ou de la performance professionnelle).
- **Constats et limites méthodologiques :**
  - Aucun dispositif d'appariement n'a été mis en place entre les notes obtenues sur la plateforme et les notes obtenues aux devoirs surveillés réels (présents dans le dossier `epreuves/` ou `old_exam/`).
  - Il est impossible d'affirmer scientifiquement qu'un étudiant ayant 100 % de réussite aux ateliers de code du site obtiendra la moyenne aux examens institutionnels sur table.
- **Conclusion sur les relations externes :** **Absence de preuves suffisantes**.

---

### E. Preuves Fondées sur les Conséquences de l'Évaluation (*Consequences of Testing*)

- **Définition :** Analyse de l'impact pédagogique et sociétal de l'évaluation sur l'apprentissage (*washback effect*) et des conséquences involontaires des interprétations des scores.
- **Constats et preuves observées :**
  1. **Effet rétroactif négatif sur les habitudes d'étude (*Negative Washback*) :**
     - En habituant l'étudiant de B1 à concevoir des scripts Bash lisant stdin pour manipuler Git ou Docker, le système lui fait acquérir des réflexes contre-productifs, en décalage total avec les pratiques professionnelles de l'ingénierie logicielle et des opérations systèmes.
  2. **Illusion de maîtrise (*Illusion of Competence*) :**
     - La validation d'un atelier par le biais de devinettes lexicales dans le mode `analyse` procure à l'étudiant un faux sentiment de compétence, brutalement démenti lors des examens écrits ou des entretiens techniques.
- **Conclusion sur les conséquences :** **Menace documentée sur la pertinence formative de la plateforme**.
