# Rapport d'Audit Détaillé — Architecture des réseaux (B1)

## 1. Identité et emplacement
- **Identifiant registre** : `b1-reseaux`
- **Slug** : `b1-reseaux`
- **Niveau académique** : B1 (Licence 1)
- **Dossier dans le dépôt** : [`b1-reseaux/`](file:///home/rd/Desktop/proba/b1-reseaux)
- **Statut de l'audit** : **AUDITÉ** — Audit intégral des 6 chapitres, des fiches de cours, des 18 exercices et des QCM.

## 2. Objectifs annoncés
- Comprendre et maîtriser les fondements de Architecture des réseaux
- Appliquer les méthodes et outils professionnels de Architecture des réseaux
- Résoudre des cas pratiques et valider l'examen terminal

## 3. Documents de référence
Le cours est associé à **3 document(s)** de référence dans le dépôt :
- `cours B1 IT/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -1.pdf` (4352 mots, pertinence: forte, exploitée: oui)
- `cours B1 IT/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -2.pdf` (2069 mots, pertinence: forte, exploitée: oui)
- `cours B1 IT/Architecture réseau/ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -3.pdf` (2169 mots, pertinence: forte, exploitée: oui)

## 4. Conformité aux références
- **Score C1** : **16.5/20**
- **Justification** : Conformité avérée avec 3 document(s) du programme académique (ex: ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -1.pdf).
*(Voir le détail ligne par ligne dans le Livrable D : [`audit/pedagogique/D-conformite/b1-reseaux.md`](file:///home/rd/Desktop/proba/audit/pedagogique/D-conformite/b1-reseaux.md))*

## 5. Erreurs factuelles et techniques
Plusieurs anomalies ont été constatées lors de l'audit matériel :
### [P0] Dans scripts/course-kit.js ligne 195, le générateur lit q.stem alors que le module de contenu définit la question sous la clé q. Résultat : l'énoncé de chaque question s'affiche 'undefined'.
- **Localisation** : `b1-reseaux/chapitres/chapitre1.html:L267 et suivants`
- **Passage** : `<p class="q__stem">undefined</p>`
- **Risque** : L'apprenant doit deviner la question à partir des réponses ou de l'explication, ce qui détruit la validité de l'évaluation formative.
- **Correction recommandée** : Modifier scripts/course-kit.js ligne 195 : utiliser (q.stem || q.q) puis regénérer le cours avec npm run courses.
### [P2] Les exercices s'exécutent en shell par simulation de règles logiques, ce qui crée un biais métacognitif pour une matière non-développement.
- **Localisation** : `server/exercises/b1-reseaux.js`
- **Passage** : `language: 'shell'`
- **Risque** : Dispersion de l'effort cognitif sur la syntaxe du langage de script plutôt que sur les compétences métier de la matière.
- **Correction recommandée** : Compléter par des études de cas réelles, des grilles d'analyse ou des simulateurs dédiés.

## 6. Complétude
- **Score C4** : **13.5/15**
- **Analyse** : Couverture exhaustive des modules annoncés au syllabus avec exercices et mémos de synthèse. Le cours comporte 6 chapitres et 18 exercices pratiques.

## 7. Compréhensibilité et qualité des explications
- **Score C3** : **8.5/15**
- **Analyse didactique** : Explications des chapitres très claires (Situation/Intuition/Technique), mais pénalisé par le bug bloquant des énoncés de QCM affichés 'undefined'.
- **Pédagogie par paliers** : L'approche structurée (Mise en situation concrète, Intuition, Approfondissement technique, Pièges classiques et Mnémotechnique) offre une excellente progressivité pour un apprenant débutant ou intermédiaire.

## 8. Prérequis
- **Déclarés** : Culture générale informatique
- **Réels** : Bases de la logique et de l'environnement informatique
- **Cohérence** : Les prérequis sont introduits de façon fluide dans les premières sections.

## 9. Progression pédagogique
- **Score C5** : **8.5/10**
- **Analyse** : Progression linéaire saine, prérequis précisés, montée en difficulté cohérente d'un chapitre à l'autre. La transition entre chapitres suit une courbe d'apprentissage rigoureuse.

## 10. Structure et répartition des chapitres
- **Score C6** : **8.0/10**
- **Volume** : 6 chapitres (15735 mots au total).
- **Temps d'apprentissage estimé** :
  - Lecture et compréhension : 6-8 h
  - Pratique des exercices : 6-10 h
  - Révision et auto-évaluation : 4-6 h
  - **Total estimé** : **20-30 h**

## 11. Exemples et exercices (Sciences de l'apprentissage)
- **Score C7** : **4.5/10**
- **Récupération active** : Stimulée par les flashcards (`cartes.html`), les QCM de fin de chapitre et le simulateur d'examen chronométré.
- **Répétition espacée** : Dispositif de mémorisation présent dans les fiches mais la planification temporelle automatisée est absente de la plateforme (recommandation fonctionnelle).
- **Ateliers de code** : 18 exercices dans `server/exercises/` en `shell`. Les corrigés ont été testés avec succès via la suite de tests automatisée.

## 12. Intérêt pédagogique et engagement
- **Score C8** : **4.5/5**
- **Analyse** : Ton engageant, mise en situation professionnelle réaliste, rigueur terminologique et absence de fioritures inutiles. Scénarios professionnels d'immersion crédibles qui motivent l'apprenant.

## 13. Forces
- Architecture didactique remarquablement soignée (boîtes d'intuition, métaphores claires, encadrés d'avertissement).
- Richesse de l'outillage d'apprentissage autonome (flashcards, mémo, examens blancs corrigés).
- Alignement fort avec les sujets d'examens historiques du Collège de Paris Supérieur.

## 14. Défauts
- Bug d'affichage critique : les énoncés des questions de QCM sont rendus comme 'undefined' (48 questions affectées).
- Rigidité du gabarit en 6 chapitres pour certaines thématiques denses.

## 15. Note détaillée sur 100

| Critère | Pondération | Note attribuée | Justification synthétique |
|---|---:|---:|---|
| C1. Conformité aux références | 20 | 16.5 | Conformité avérée avec 3 document(s) du programme académique (ex: ARCHITECTURE DES RESEAUX - COLLEGE DE PARIS -1.pdf). |
| C2. Exactitude technique & scientifique | 15 | 14.0 | Syntaxe, commandes et modèles conformes aux standards actuels. |
| C3. Compréhensibilité & explications | 15 | 8.5 | Explications des chapitres très claires (Situation/Intuition/Technique), mais pénalisé par le bug bloquant des énoncés de QCM affichés 'undefined'. |
| C4. Complétude par rapport aux objectifs | 15 | 13.5 | Couverture exhaustive des modules annoncés au syllabus avec exercices et mémos de synthèse. |
| C5. Progression pédagogique & prérequis | 10 | 8.5 | Progression linéaire saine, prérequis précisés, montée en difficulté cohérente d'un chapitre à l'autre. |
| C6. Structure & répartition des chapitres | 10 | 8.0 | Structure standardisée en 6 chapitres équilibrés avec cartes, mémo et examens. |
| C7. Exercices & qualité des évaluations | 10 | 4.5 | Pénalité majeure : 48 questions de QCM sans énoncé ('undefined'). Les ateliers de code fonctionnent mais l'auto-évaluation théorique est dégradée. |
| C8. Intérêt pédagogique & qualité éditoriale | 5 | 4.5 | Ton engageant, mise en situation professionnelle réaliste, rigueur terminologique et absence de fioritures inutiles. |
| **TOTAL** | **100** | **78 / 100** | **Satisfaisant** |

## 16. Niveau de confiance
- **Niveau** : **MOYEN**
- **Justification** : Vérification exhaustive des textes, tests d'exécution des corrigés et recoupement avec les documents académiques.
- **Vérifications non effectuées** : Déploiement physique sur cluster ou équipement réseau réel.

## 17. Corrections recommandées (Plan d'action)
- **[P0]** : Modifier scripts/course-kit.js ligne 195 : utiliser (q.stem || q.q) puis regénérer le cours avec npm run courses. *(Ref: b1-reseaux-001)*
- **[P2]** : Compléter par des études de cas réelles, des grilles d'analyse ou des simulateurs dédiés. *(Ref: b1-reseaux-p2-01)*

---

### Réponse à la question centrale
> **Un étudiant qui suit réellement ce cours, en commençant au niveau prévu et en travaillant les exercices proposés, dispose-t-il d'un parcours fiable, cohérent et suffisamment complet pour acquérir les compétences annoncées ?**

**Verdict : OUI AVEC RÉSERVES**  
*Le cours théorique et les ateliers de code sont solides, mais l'évaluation par QCM est compromise par les énoncés undefined.*

### Contre-examen
Les constats préliminaires ont été contre-expertisés. Les simulations en script ont été réévaluées pour vérifier si elles suffisaient à l'apprentissage logique : elles constituent un palliatif algorithmique honorable mais ne sauraient remplacer la pratique sur outils natifs pour les compétences d'infrastructure et de développement spécialisé.
