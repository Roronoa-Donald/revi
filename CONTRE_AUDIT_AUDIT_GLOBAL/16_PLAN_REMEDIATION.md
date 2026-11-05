# 16_PLAN_REMEDIATION — PLAN D'ACTION RECOMMANDE SANS EXECUTION

**Projet :** `revi-cours-html`  
**Répertoire :** `/home/rd/Desktop/proba`  
**Nature du document :** Recommandations techniques, pédagogiques et docimologiques hiérarchisées.  
**Directive stricte appliquée :** Aucune modification applicative n'a été exécutée lors de cet audit.

---

## 1. VUE D'ENSEMBLE DE LA STRATEGIE DE REMEDIATION

Le contre-audit forensique a établi que la plateforme dispose d'une infrastructure technique solide (Fastify sécurisé, catalogue de 1 250 exercices fonctionnel, 71 cours référencés), mais souffre de biais docimologiques réels sur sa banque de QCM, d'un manque de tests négatifs/limites sur 551 exercices actifs, et d'un outillage d'audit antérieur ayant introduit des artefacts métrologiques.

La remédiation recommandée est découpée en cinq lots d'intervention étalés sur un calendrier de 12 semaines :

```
Chantier de Remédiation (12 Semaines)
├── LOT A : Fiabilité de l'Audit et des Registres (Semaines 1-2) — Priorité Absolue
├── LOT B : Éligibilité des Exercices et Tests Robustes (Semaines 3-6) — Priorité Haute
├── LOT C : Docimologie et Banque de QCM (Semaines 5-9) — Priorité Haute
├── LOT D : Accessibilité Numérique WCAG 2.1 AA (Semaines 7-10) — Priorité Moyenne
└── LOT E : Infrastructure, Sandbox et Persistance (Semaines 9-12) — Priorité Moyenne
```

---

## 2. DETAIL DES LOTS D'INTERVENTION

### LOT A — Fiabilité de l'Audit et des Registres (Semaines 1-2)
*Objectif : Éliminer les scripts de complaisance et doter le projet d'outils d'extraction directes reproductibles.*

1. **Suppression ou refonte intégrale de `scripts/build_audit_global_csvs.js`** :
   - Éliminer tout appel à `.slice()` sur les effectifs d'exercices ou de QCM.
   - Supprimer l'affectation systématique de constantes textuelles de complaisance (`TESTEE_RUNNER_OK`, `CONFORME`, `> 2.0x`).
   - Rompre la dépendance circulaire sur les anciens fichiers CSV en lisant directement les modules sources.
2. **Normalisation des chemins et de la casse** :
   - Harmoniser le nom du cours `Cyber securite B2` et de son sous-dossier `cyber-securite-b2` pour éviter la perte de questions QCM.
3. **Mise en place d'un banc de parsing strict** :
   - Valider la syntaxe RFC 4180 de tous les exports CSV (gestion des guillemets doublés, des sauts de ligne et encodage UTF-8 sans BOM).
4. **Conservation des journaux de preuve originaux** :
   - Distinguer formellement les preuves réexécutées fraîches des archives historiques héritées.

---

### LOT B — Éligibilité des Exercices à la Notation Sommative (Semaines 3-6)
*Objectif : Sécuriser la validité métrologique des exercices de code avant leur utilisation en examen noté.*

1. **Enrichissement des tests sur les 551 fiches vulnérables** :
   - Ajouter systématiquement au moins **un cas limite** (0, chaîne vide, valeur frontière) et **un cas négatif** (entrée invalide, gestion d'erreur, format rejeté) sur chacune des 551 fiches ne comportant que des cas nominaux.
2. **Certification des contrats de réponse** :
   - Auditer le texte des énoncés pour garantir que le format exact de sortie attendu (espaces, retours à la ligne, types) est sans ambiguïté.
3. **Chantier de levée des 354 suspensions** :
   - *Phase 1 (126 cours globaux)* : Adapter les 7 cours suspendus (`csharp`, `docker`, `b3-linux`, `b3-github`, `b1-sql`, `sql`, `b3-sql`). Pour les cours SQL, brancher le simulateur WebAssembly ou un moteur backend adapté.
   - *Phase 2 (1 individu)* : Réécrire l'exercice `algo-c9-e2` pour valider dynamiquement l'algorithme itératif spécifié dans l'énoncé.
   - *Phase 3 (227 SHA-256)* : Régénérer les empreintes cryptographiques dans `grading-evidence.json` après validation unitaire de chaque fiche.

---

### LOT C — Docimologie et Banque de QCM (Semaines 5-9)
*Objectif : Mettre la banque de 3 185 items en conformité avec les standards internationaux (NBME 2024 / AERA).*

1. **Commission d'Arbitrage Pédagogique sur les 41 fiches prioritaires** :
   - Soumettre en priorité aux enseignants les 41 questions cumulant énoncé contestable et asymétrie de longueur.
2. **Harmonisation de la longueur des options (1 160 questions asymétriques)** :
   - Allonger les distracteurs trop concis ou condenser les réponses correctes trop verbeuses pour ramener le ratio $L(\text{correct}) / \overline{L(\text{distracteurs})}$ entre 0,7 et 1,4.
3. **Réécriture des 31 formulations négatives** :
   - Remplacer les formulations de type « Quelle proposition N'EST PAS... » par des questions affirmatives orientées compétences (« Quelle est la commande appropriée pour... »).
4. **Suppression des 33 options « Toutes / Aucune des réponses »** :
   - Remplacer ces options parasites par des distracteurs plausibles portant sur des confusions conceptuelles fréquentes.

---

### LOT D — Accessibilité Numérique et Ergonomie (Semaines 7-10)
*Objectif : Atteindre une conformité vérifiable au standard WCAG 2.1 niveau AA sur les interfaces d'évaluation.*

1. **Restructuration sémantique du gabarit QCM (`scripts/course-kit.js`)** :
   - Envelopper chaque question dans un conteneur `<fieldset>` avec `<legend class="q__stem">` (ou conteneur `role="radiogroup"` avec `aria-labelledby`).
   - Assigner l'attribut `role="radio"` aux options et gérer dynamiquement `aria-checked="true|false"`.
2. **Notification des retours didactiques** :
   - Ajouter l'attribut `aria-live="polite"` et `role="status"` sur le bloc d'explication `.q__exp` pour les lecteurs d'écran.
3. **Audit de contraste complet** :
   - Vérifier les états `:focus-visible` au clavier sur les boutons d'options et les liens de navigation de cours.

---

### LOT E — Infrastructure, Sandbox et Persistance (Semaines 9-12)
*Objectif : Consolider la robustesse opérationnelle en production.*

1. **Persistance obligatoire des sessions sommatives** :
   - Rendre la variable `DATABASE_URL` obligatoire en environnement de production pour interdire le fallback en mémoire volatile lors des examens officiels.
2. **Pérennisation du script de confinement Bubblewrap** :
   - Commiter les ajouts de `corrections/outils/rejouer-isole.sh` dans Git pour aligner la suite de tests isolée avec l'arbre officiel.
3. **Surveillance des quotas et observabilité** :
   - Mettre en place une journalisation structurée des rejets HTTP 429 et des temps de réponse d'exécution Piston/Oanor.
