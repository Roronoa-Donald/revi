# 08_LIMITES, RISQUES ET POINTS NON VÉRIFIABLES — CADRE DE PRUDENCE FORENSIQUE

**Cadre déontologique :** Règle 1.1 et 1.2 du mandat de réconciliation (Vérifier avant de conclure, interdiction absolue de modifier l'application).  
**Dépôt audité :** [revi-cours-html](file:///home/rd/Desktop/proba)  

---

## 1. LIMITES TECHNIQUES DE LA MISSION FORENSIQUE

Le présent travail s'est astreint à une rigueur mathématique et technique absolue. Néanmoins, certaines limites méthodologiques objectives doivent être clairement consignées :

1. **Absence de rejeu unitaire exhaustif des 1 250 runners d'exercices :**
   - Le banc de validation globale du catalogue [scripts/generate-code-labs.js --check](file:///home/rd/Desktop/proba/scripts/generate-code-labs.js) a été rejoué et validé (`1 250 exercices, 68 cours`).
   - Cependant, exécuter individuellement les 1 250 suites de tests dans un conteneur sandbox `bwrap` (Bubblewrap) avec compilation native (C++, Python, Java, PHP, Rust) requiert plusieurs heures d'exécution CPU et dépasse le périmètre d'une réconciliation statique et métrologique.
   - Par conséquent, la validité individuelle au runtime des 814 fiches actives non-pilotes repose sur l'intégrité prouvée du banc [npm_test_full.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/npm_test_full.log) (8 401 tests validés), mais ne constitue pas une preuve P4 unitaire fraîche générée dans cette session.

2. **Validité pédagogique et scientifique intrinsèque des questions QCM :**
   - L'audit a mesuré avec exactitude les propriétés formelles et psychométriques des 3 185 QCM (longueur des options, ratios de mots, présence de négations, unicité des identifiants, protection contre l'oracle).
   - Toutefois, la justesse didactique intrinsèque d'une question (par exemple : *« La complexité en temps amorti d'une opération sur une table de hachage est-elle scientifiquement O(1) sous telle hypothèse ? »*) relève de l'expertise d'un enseignant-chercheur de la discipline et ne peut être garantie par un audit algorithmique.

---

## 2. RISQUES RÉSIDUELS POUR LA PLATEFORME

L'analyse contradictoire met en évidence quatre risques opérationnels majeurs nécessitant un traitement prioritaire :

### 1. Risque d'aléa d'évaluation sur les 551 fiches purement nominales
- **Constat :** Sur les 814 exercices actifs hors pilote, **551 fiches (67,7 %)** ne testent aucun cas limite (zéro, chaîne vide, liste nulle) ni aucun cas invalide (rejet d'erreur).
- **Risque :** Un code étudiant naïf ou partiellement erroné peut réussir les tests nominaux et obtenir la note maximale, tandis qu'un code sophistiqué gérant les exceptions pourrait échouer sur des divergences mineures de sortie.
- **Criticité :** **ÉLEVÉE**.

### 2. Risque de contournement par devinette sur les 1 160 QCM asymétriques
- **Constat :** **1 160 questions (36,4 %)** présentent une réponse correcte deux fois plus longue en caractères ou en mots que la moyenne des distracteurs.
- **Risque :** Les apprenants peuvent inférer la réponse correcte sans maîtriser le concept enseigné, simplement en sélectionnant systématiquement l'option la plus verbeuse.
- **Criticité :** **MOYENNE**.

### 3. Risque d'injustice sur les 31 questions négatives et 33 questions combinatoires
- **Constat :** 31 questions contiennent des pièges syntaxiques négatifs et 33 questions des options de regroupement (« les deux », « 1 et 2 »).
- **Risque :** Biais cognitif pénalisant les étudiants maîtrisant la matière mais distraits par la double négation.
- **Criticité :** **MOYENNE**.

### 4. Risque lié au maintien indéfini des 354 suspensions
- **Constat :** 354 exercices sont gelés pour notation sommative.
- **Risque :** Frustration des étudiants inscrits dans les 7 cours suspendus (`b1-prog-web`, `droit`, etc.) qui ne peuvent valider leurs compétences de manière certifiante.
- **Criticité :** **FAIBLE À COURT TERME, ÉLEVÉE À MOYEN TERME**.

---

## 3. PLAN D'ACTION ET RECOMMANDATIONS DIDACTIQUES

Pour lever les réserves émises dans la certification, les actions suivantes sont recommandées :

1. **Commission enseignante d'arbitrage (Priorité 1) :**
   - Convoquer une commission académique pour réécrire les énoncés des 31 questions négatives en formes affirmatives directes.
   - Éliminer les options composites dans les 33 QCM signalés.
2. **Harmonisation de la longueur des distracteurs (Priorité 2) :**
   - Étendre la rédaction des distracteurs courts sur les 1 160 questions asymétriques pour égaliser le profil visuel des 4 options.
3. **Chantier de renforcement des bancs de test (Priorité 3) :**
   - Ajouter au moins un cas de limite et un cas négatif sur les 551 exercices identifiés dans [manifest_tests_limites.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_tests_limites.json).
4. **Levée progressive des 354 suspensions (Priorité 4) :**
   - Régénérer les empreintes SHA-256 des 227 exercices après vérification unitaire runner.
   - Ré-autoriser progressivement les 7 cours suspendus après validation de conformité pédagogique.
