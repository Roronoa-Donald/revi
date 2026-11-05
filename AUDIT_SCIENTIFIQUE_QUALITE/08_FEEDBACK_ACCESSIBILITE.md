# Livrable 08 — Qualité du Feedback Pédagogique et Accessibilité Universelle (UDL 3.0)

> Répertoire d'audit : `AUDIT_SCIENTIFIQUE_QUALITE/`  
> Projet audité : `revi-cours-html`  
> Cadres d'évaluation : **Hattie & Timperley (The Power of Feedback, 2007)**, **CAST Universal Design for Learning Guidelines (UDL 3.0, 2024)**, AERA/APA/NCME (2014, Chapitre 3 — *Fairness in Testing*).

---

## 1. Audit de la Qualité du Feedback Pédagogique (Hattie & Timperley, 2007)

Selon la méta-analyse fondatrice de John Hattie et Helen Timperley (2007), le feedback n'est efficace que s'il répond simultanément à trois interrogations fondamentales :
- **Feed Up** (*Où dois-je aller ?* — Clarté des objectifs et des critères de performance acceptables).
- **Feedback** (*Comment suis-je en train de progresser ?* — Diagnostic précis de l'écart entre la production de l'étudiant et la cible attendue).
- **Feed Forward** (*Quelle est la prochaine étape ?* — Indications opérationnelles pour corriger la démarche cognitive lors de la prochaine tentative).

Ces informations doivent idéalement opérer au niveau du **processus de résolution** (*Process Level*) ou de l'**autorégulation** (*Self-Regulation Level*), et non se cantonner à un simple verdict sur la tâche (*Task Level*).

---

### 1.1. Bilan Métrologique sur les 1 250 Exercices de la Plateforme

L'analyse de l'objet de retour produit par le moteur d'exécution [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js) montre une défaillance structurelle :

| Critère de Feedback | Présence dans les Exercices | Pourcentage | Statut Documentaire | Diagnostic Pédagogique |
| :--- | :--- | :--- | :--- | :--- |
| **Verdict binaire sur la tâche (Réussi / Échoué)** | 1 250 / 1 250 | 100 % | Conforme technique | Indique seulement le résultat brut, sans valeur formative. |
| **Diagnostic d'erreur dynamique sur test échoué (`userMessage`)** | **5 / 1 250** | **0,4 %** | **Non-conformité démontrée** | **99,6 % des exercices renvoient une chaîne vide (`""`) en cas d'échec sur un test masqué.** |
| **Feed Forward (piste de remédiation ciblée)** | 0 / 1 250 | 0 % | **Non-conformité démontrée** | Aucune suggestion d'étape suivante n'est fournie dynamiquement. |
| **Indices d'aide statiques génériques (`hints`)** | 1 245 / 1 250 | 99,6 % | Menace sur la validité | Indices rédigés à l'avance, déconnectés de l'erreur commise par l'élève. |

---

### 1.2. Preuve de la Rupture du Feedback dans le Moteur de Notation

Dans [`server/exercises/runner.js`](file:///home/rd/Desktop/proba/server/exercises/runner.js#L302-L315) :
```javascript
if (!matched) {
  return report({
    reason: 'wrong_output',
    testIndex: index,
    label: test.label || `Test ${index + 1}`,
    input: test.stdin || '',
    expected: test.expected,
    actual: outcome.stdout || '',
    stderr: outcome.stderr || '',
    compileError: '',
    exitCode: outcome.exitCode,
    userMessage: test.hint || test.explanation || ''
  });
}
```

Lorsque l'élève échoue :
1. Les champs `test.hint` et `test.explanation` étant absents de la quasi-totalité des catalogues d'exercices, `userMessage` vaut strictement `""`.
2. Le client web [`assets/js/code-lab.js`](file:///home/rd/Desktop/proba/assets/js/code-lab.js) reçoit une réponse négative et affiche le libellé générique : *« Échec du test : wrong_output »*.
3. L'étudiant sait qu'il a échoué, mais n'a **aucune information sur la nature de son erreur** (problème d'arrondi ? dépassement de capacité ? cas limite nul ? erreur de syntaxe ? saut de ligne manquant ?).
4. Cette absence totale de *Feed Forward* contraint l'étudiant à des soumissions répétées à l'aveugle par essai-erreur, ce qui dégrade l'apprentissage et encourage le devinement.

---

## 2. Audit d'Équité et d'Accessibilité Universelle (CAST UDL 3.0 & AERA Standard 3)

Le cadre *Universal Design for Learning (UDL 3.0, 2024)* stipule que les modalités de présentation et d'interaction ne doivent jamais constituer une barrière non pertinente empêchant l'étudiant de faire la preuve de ses compétences réelles (*Construct-Irrelevant Barrier*).

---

### 2.1. Principes de Représentation (Perception et Compréhension)

1. **Rendu des formules mathématiques :**
   - *Point fort :* L'intégration de KaTeX dans les cours générés assure un affichage vectoriel propre des symboles mathématiques ($\sum, \int, \in, \le$) lorsque les gabarits sont respectés.
   - *Anomalie observée :* Dans plus de 60 exercices d'Algèbre et de Statistiques ([`b1-algebre`](file:///home/rd/Desktop/proba/server/exercises/b1-algebre.js), [`b1-stats`](file:///home/rd/Desktop/proba/server/exercises/b1-stats.js)), les données sont présentées sous forme de texte brut sans mise en page tabulaire (`Données : 2, Données : 10, Données : -5`), rendant la lecture d'une matrice ou d'une distribution statistique difficilement accessible aux étudiants malvoyants ou dyslexiques.
2. **Contraste et Lisibilité :**
   - Le thème sombre par défaut des ateliers de code respecte les ratios de contraste WCAG AA (supérieurs à 4.5:1 pour le texte courant et les commentaires).
   - Les blocs d'avertissement et alertes de l'atelier utilisent des contrastes chromatiques suffisants.

---

### 2.2. Principes d'Action et d'Expression (Interaction et Saisie)

1. **Dépendance à l'éditeur Monaco sur terminaux mobiles :**
   - *Constat d'inaccessibilité matérielle :* L'éditeur Monaco (intégré dans les ateliers de code) est optimisé pour les ordinateurs de bureau avec clavier physique.
   - Sur smartphone et tablette (écrans $< 768\text{ px}$), la zone de saisie déclenche le clavier virtuel qui masque la consigne et le panneau de sortie.
   - Dans les cours de systèmes ou d'outils (Git, Linux, Docker), taper des commandes longues avec caractères spéciaux (`|`, `\`, `-`, `$`, `{}`) sur un clavier tactile mobile engendre un taux d'erreur typographique très élevé, totalement étranger à la compétence informatique mesurée.
2. **Navigation au Clavier et Piège du Focus (*Keyboard Trap*) :**
   - Lorsque le focus clavier entre dans l'éditeur Monaco, la touche `Tab` insère des indentations dans le code au lieu de permettre la navigation séquentielle vers le bouton « Exécuter » ou « Soumettre ».
   - Un raccourci clavier standard (`Ctrl+M` pour libérer la touche Tab sous Monaco) existe mais n'est documenté nulle part dans l'interface pour l'étudiant, ce qui constitue une barrière d'accessibilité pour les utilisateurs naviguant exclusivement au clavier.

---

### 2.3. Synthèse de l'Équité

| Dimension d'Équité (AERA 2014) | Évaluation | Preuve / Observation | Statut Documentaire |
| :--- | :--- | :--- | :--- |
| **Absence de barrière d'interface non pertinente** | Menace sévère | Saisie mobile de code et navigation clavier Monaco non guidée. | Menace sur l'équité |
| **Clarté et non-ambiguïté des consignes** | Inégale | Enoncés de 201 exercices focalisés sur le formatage stdin plutôt que sur la logique. | Menace sur la validité |
| **Qualité explicative du diagnostic** | Quasi-nulle | 99,6 % des retours sont muets sur la cause de l'erreur (`userMessage = ""`). | Non-conformité démontrée |
| **Adaptabilité aux besoins spécifiques** | Partielle | KaTeX présent mais accessibilité textuelle des matrices défaillante. | Menace sur l'équité |
