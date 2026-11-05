# Livrable 10 — Registre des Anomalies Résiduelles, Limites Techniques et Dette Pédagogique

> Répertoire de livraison : `CONTRE_AUDIT_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Date d'audit contradictoire : 3 novembre 2026  

---

## 1. Cadre de Transparence Déontologique

Conformément au mandat du contre-audit, ce document consigne de manière exhaustive, sans complaisance ni dissimulation, l'ensemble des limites techniques, fragilités métrologiques et arbitrages humains demeurant en suspens sur la plateforme `revi-cours-html`.

---

## 2. Registre des Anomalies et Limites Constatées

### Anomalie Résiduelle 1 : Fragilité Métrologique des 814 Exercices Déclarés `NOTATION_AUTORISEE`
- **Composant** : Banque d'exercices actifs ([server/exercises/](file:///home/rd/Desktop/proba/server/exercises/)).
- **Constat factuel** :
  * 792 sur 814 exercices (97,3 %) sont de type `language: 'analyse'` et s'exécutent via l'interpréteur de chaînes [local-runner.js](file:///home/rd/Desktop/proba/server/services/execution/local-runner.js).
  * 652 sur 814 exercices (80,1 %) ne disposent d'**aucun cas de test négatif** (rejet d'entrée invalide) et d'**aucun cas limite** (valeur zéro, chaîne vide, borne extrême). Ils ne comportent que 2 ou 3 cas nominaux positifs.
  * Ces 792 exercices contournent le contrôle d'intégrité par empreinte SHA-256 via la clause d'échappement `if (exercise.language === 'analyse') return false;` dans [grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js#L39).
- **Risque métrologique** : Risque élevé de validation par des solutions d'étudiants incomplètes ou artificiellement codées en dur (*hardcoding*).
- **Mesure conservatoire requise** : Réserver la notation de ces 814 fiches à l'évaluation formative d'entraînement (`ENTRAINEMENT_FORMATIF_SEUL`), sans attribuer de note certificative officielle tant que des cas limites et négatifs n'ont pas été ajoutés.

---

### Anomalie Résiduelle 2 : Arbitrage Humain Non Réalisé sur les 184 QCM Signalés
- **Composant** : Banque d'items QCM ([flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json)).
- **Constat factuel** :
  * 100 % des 184 questions signalées sont toujours marquées `review_status: 'A_REFORMULER'` et `revue_humaine_requise: 'OUI'`.
  * Aucune décision d'arbitrage pédagogique, aucune reformulation textuelle et aucune signature d'enseignant titulaire n'a encore été enregistrée dans le code source.
- **Risque didactique** : Risque de questions ambiguës, formulées négativement ou contenant des distracteurs inégaux.
- **Mesure conservatoire requise** : Neutralisation de ces items dans les sessions d'examen sommatif (`secure: true`) et maintien en consultation formative avec explication.

---

### Anomalie Résiduelle 3 : Sous-Évaluation Massive du Biais d'Asymétrie de Longueur
- **Composant** : Questions à choix multiples ([server/content/](file:///home/rd/Desktop/proba/server/content/)).
- **Constat factuel** :
  * Le générateur antérieur [build_finalisation_manifests.js](file:///home/rd/Desktop/proba/scripts/build_finalisation_manifests.js) avait bridé artificiellement le compteur d'asymétrie de longueur à 28 items.
  * L'analyse sémantique réelle menée par le contre-audit révèle que **701 questions (22,7 % du corpus)** présentent une bonne réponse dont la longueur textuelle est au moins le double de la moyenne des distracteurs.
- **Risque psychométrique** : Biais de docilité au test (*test-wiseness*) : un apprenant avisé peut deviner la bonne réponse uniquement à sa verbosité sans maîtriser la notion.
- **Mesure recommandée** : Campagne de réécriture progressive des distracteurs pour homogénéiser les longueurs d'options.

---

### Anomalie Résiduelle 4 : Disparité de Sémantique Accessible sur les QCM
- **Composant** : Gabarit HTML [scripts/course-kit.js](file:///home/rd/Desktop/proba/scripts/course-kit.js).
- **Constat factuel** :
  * Le rapport d'accessibilité antérieur affirmait l'utilisation de balises `<fieldset>` et `<legend>` associées à des `<input type="radio">` et `<label>`.
  * Le code réel génère des conteneurs `<div class="q">` et des boutons `<button class="opt">`.
- **Risque d'accessibilité** : Vocalisation fragmentée pour les utilisateurs de lecteurs d'écran naviguant exclusivement de bouton en bouton sans annonce automatique de l'intitulé de la question parente.
- **Mesure recommandée** : Enrichir le gabarit QCM avec les attributs ARIA appropriés (`role="group"` et `aria-labelledby`) ou migrer vers des formulaires sémantiques complets.

---

### Anomalie Résiduelle 5 : 227 Exercices de Programmation Réelle en Suspension Conservatoire
- **Composant** : Fiches de code Python, C, PHP, Java, PowerShell ([server/exercises/](file:///home/rd/Desktop/proba/server/exercises/)).
- **Constat factuel** :
  * 227 exercices demeurent suspendus (`NOTATION_SUSPENDUE`) en raison de l'absence de banc de tests d'infrastructure et d'empreinte dans [grading-evidence.json](file:///home/rd/Desktop/proba/server/exercises/grading-evidence.json).
- **Impact opérationnel** : 18,2 % du catalogue total n'est pas disponible pour la notation sommative.
- **Mesure requise** : Mise en place d'un banc d'exécution distant certifiant les solutions sur compilateurs réels avant enregistrement de leurs empreintes SHA-256.

---

## 3. Matrice de Priorisation des Chantiers de Clôture

| Chantier | Composant Cible | Criticité | Effort Estimé | Acteur Responsable |
| :--- | :--- | :---: | :---: | :--- |
| **Chantier 1** | Arbitrage enseignant sur les 184 QCM signalés | **HAUTE** | 3 jours-homme | Commission pédagogique d'enseignants titulaires |
| **Chantier 2** | Homogénéisation des 701 distracteurs asymétriques | **MOYENNE** | 5 jours-homme | Auteurs de contenus / relecteurs didactiques |
| **Chantier 3** | Enrichissement en tests négatifs/limites des 814 fiches | **MOYENNE** | 10 jours-homme | Équipe de conception d'exercices |
| **Chantier 4** | Banc de certification distante pour les 227 suspensions | **MOYENNE** | 4 jours-homme | Ingénierie infrastructure (Piston / Oanor) |
| **Chantier 5** | Amélioration sémantique ARIA du gabarit QCM | **BASSE** | 1 jour-homme | Développement frontend / accessibilité |
