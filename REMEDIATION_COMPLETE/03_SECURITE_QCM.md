# Livrable 03 — Sécurisation Architecturale des QCM et Protection Métrologique

> Répertoire : `REMEDIATION_COMPLETE/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Standards AERA/APA/NCME (2014), Guide NBME (2024), OWASP Top 10 API Security.

---

## 1. Diagnostic de l'Ancien Mécanisme et Vulnérabilité Métrologique

### 1.1. Mécanisme Initial
Dans l'architecture originelle du site, les Questionnaires à Choix Multiples (QCM) étaient intégralement générés sous forme de pages HTML statiques via la fonction `qcm()` du gabarit `scripts/course-kit.js`.

Lors de la compilation des pages de cours :
- L'option correcte recevait systématiquement l'attribut HTML `data-correct="1"`.
- L'explication pédagogique détaillée était injectée immédiatement dans le flux HTML à l'intérieur d'une balise `<div class="q__exp">...</div>` (masquée visuellement en CSS par `display: none` avant le clic).
- Le script client `assets/js/cours.js` interceptait les clics sur les boutons `.opt` et comparait localement l'attribut `data-correct` pour afficher la classe `.is-correct` ou `.is-wrong` et révéler l'explication.

### 1.2. Faiblesse Critique et Fuite des Réponses
Cette conception entraînait une faille métrologique majeure :
1. **Inspection triviale du DOM :** N'importe quel apprenant pouvait ouvrir les outils de développement du navigateur (F12 / Inspecteur) pour lire immédiatement l'attribut `data-correct="1"` ou le texte du corrigé dans `<div class="q__exp">`.
2. **Fraude automatisée :** Une simple ligne de console JavaScript permettait d'obtenir 100 % de réussite sans aucune lecture des questions :
   ```javascript
   document.querySelectorAll('.opt[data-correct="1"]').forEach(btn => btn.click());
   ```
3. **Invalidation de la mesure sommative :** En situation d'examen blanc ou d'évaluation formelle, les scores obtenus ne constituaient en aucun cas une preuve valide de maîtrise de compétences (violation du Standard 1.1 AERA 2014).

---

## 2. Nouvelle Architecture Cible : Évaluation Sécurisée Côté Serveur

Pour éliminer définitivement cette vulnérabilité tout en préservant l'expérience fluide d'apprentissage, une architecture à deux niveaux a été conçue et déployée :

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Navigateur de l'Apprenant                       │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │ Mode Entraînement              │ Mode Évaluation / Examen
                    ▼                                ▼
       ┌────────────────────────┐       ┌────────────────────────┐
       │ Affichage Local        │       │ Interface Épurée       │
       │ (Feedback instantané)  │       │ (Zéro fuite DOM)       │
       └────────────────────────┘       └───────────┬────────────┘
                                                    │
                                                    │ POST /api/qcm/verify
                                                    │ POST /api/qcm/submit
                                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Serveur Node.js / Fastify                       │
│                                                                        │
│  ┌───────────────────────┐             ┌────────────────────────────┐  │
│  │ Route /api/qcm        │ ──────────► │ server/content/<cours>.js  │  │
│  │ Contrôle de validité  │             │ (Banque de questions,      │  │
│  │ Télémétrie d'erreur   │             │  clés secrètes & corrigés) │  │
│  └───────────────────────┘             └────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1. Endpoints API Implémentés (`server/routes/qcm.js`)

Deux endpoints Fastify ont été créés et enregistrés sous le préfixe `/api/qcm` dans `server/app.js` :

#### 1. Vérification Unitaire Sécurisée : `POST /api/qcm/verify`
Permet la vérification pas-à-pas lors d'une séance d'entraînement guidée ou d'une étape de quiz :
- **Corps de requête attendu (JSON) :**
  ```json
  {
    "courseId": "Cyber securite B2",
    "chapter": 1,
    "questionIndex": 0,
    "selectedOption": 0
  }
  ```
- **Comportement :**
  - Validation des types et bornes des paramètres (rejet 400 si incohérent).
  - Chargement sécurisé des données du cours depuis `server/content/` (rejet 404 si introuvable).
  - Comparaison stricte de l'indice soumis avec la clé correcte.
  - Réponse fail-closed :
    ```json
    {
      "valid": true,
      "correct": true,
      "explanation": "Dans son périmètre, le NIST exige 15 caractères..."
    }
    ```
  - En cas de réponse fausse, l'endpoint confirme `correct: false` sans divulguer l'indice de la bonne réponse.

#### 2. Soumission Globale et Notation d'Examen : `POST /api/qcm/submit`
Permet l'évaluation sommative complète d'un chapitre ou d'un examen blanc :
- **Corps de requête attendu (JSON) :**
  ```json
  {
    "courseId": "Cyber securite B2",
    "chapter": 1,
    "mode": "exam",
    "answers": [
      { "index": 0, "selected": 0 },
      { "index": 1, "selected": 3 }
    ]
  }
  ```
- **Garantie anti-triche :**
  - En `mode: "exam"`, les explications des questions échouées sont masquées (`explanation: null`) pour empêcher la découverte itérative des réponses par force brute.
  - Le serveur calcule le score, le pourcentage et l'état de validation (seuil fixé à 70 %).

---

## 3. Prise en Charge du Double Mode dans Course-Kit (`scripts/course-kit.js`)

Pour concilier la sécurité absolue en mode sommatif et la stricte compatibilité descendante avec la suite de tests existante, le gabarit `qcm()` a été enrichi :

```javascript
/** QCM interactif (corrigé par assets/js/cours.js en mode entraînement, ou via API /api/qcm en mode sécurisé). */
function qcm(questions, opts) {
  if (!Array.isArray(questions)) return '';
  const isSecure = Boolean(opts && (opts.secure || opts.mode === 'exam'));
  const rows = questions.map(q => {
    const rawOpts = q.opts || q.choices || q.options || [];
    const correctIdx = typeof q.correct === 'number' ? q.correct : q.answer;
    const options = rawOpts.map((label, index) =>
      '        <button class="opt"' + (!isSecure && index === correctIdx ? ' data-correct="1"' : '') + '>' + inlineHtml(label) + '</button>'
    ).join('\n');
    const expDiv = isSecure
      ? '      <div class="q__exp" data-secure="1"></div>'
      : '      <div class="q__exp">' + inlineHtml(q.exp || q.explanation || '') + '</div>';
    return [
      '    <div class="q">',
      '      <p class="q__stem">' + inlineHtml(q.stem || q.q || '') + '</p>',
      '      <div class="opts">',
      options,
      '      </div>',
      expDiv,
      '    </div>'
    ].join('\n');
  }).join('\n');

  const secureAttr = isSecure ? ' data-secure="1"' : '';
  return '<div class="qcm"' + (opts && opts.mastery ? ' data-mastery="1"' : '') + secureAttr + '>\n' + rows + '\n  </div>';
}
```

### Règle d'Or Respectée :
- **Mode Pratique (statique) :** Conserve le comportement initial (`data-correct="1"`) afin de garantir le passage sans régression des tests institutionnels préexistants (`tests/sql-lot1-dom.test.js`, `tests/langues-lot2.test.js`, etc.) et la conformité stricte vérifiée par `npm run courses:check` (832 pages à jour).
- **Mode Sécurisé (`opts.secure = true` ou `opts.mode = 'exam'`) :** Supprime intégralement `data-correct` du DOM, vide la balise `<div class="q__exp" data-secure="1">` et délègue l'attribution des points et du feedback aux routes serveur `/api/qcm/*`.

---

## 4. Preuves de Validation et Tests de Sécurité

La sécurité métrologique et fonctionnelle de cette nouvelle architecture est prouvée par la suite de tests automatisée `tests/qcm-security.test.js` :

| Test Exécuté | Scénario Évalué | Résultat Observé |
| :--- | :--- | :--- |
| **Test 1 : Différenciation des modes** | Vérification que `opts.secure = true` élimine tout attribut `data-correct` et tout texte d'explication du code HTML rendu. | Conforme (Succès) |
| **Test 2 : Vérification unitaire API** | Soumission de réponses fausses (rejetée avec `correct: false`), de réponses justes (validée avec `correct: true`), de cours erronés (404) et d'indices hors bornes (404). | Conforme (Succès) |
| **Test 3 : Soumission globale API** | Calcul d'un examen blanc complet avec rétention des explications sur réponses erronées en mode examen. | Conforme (Succès) |

Exécution réelle constatée :
```
✔ Course-kit QCM : Mode entraînement vs Mode sécurisé/examen (0.739653ms)
✔ API QCM /api/qcm/verify : validation unitaire sécurisée (174.315677ms)
✔ API QCM /api/qcm/submit : soumission batch et calcul de note (12.812849ms)
ℹ tests 3, pass 3, fail 0
```

---

## 5. Limites et Recommandations Opérationnelles Restantes

1. **Persistance en base de données :** Les soumissions QCM sont actuellement validées de manière stateless en mémoire. Lors du passage en production avec certification officielle, il est recommandé de persister chaque tentative dans une table dédiée (`quiz_submissions`) pour alimenter les analyses psychométriques longitudinales (indices de difficulté $p$ et corrélations bisérielles).
2. **Ordre des distracteurs :** Les distracteurs sont pour l'instant présentés dans l'ordre statique du fichier source. Pour neutraliser les biais de position d'ancrage, une permutation pseudo-aléatoire reproductible par graine de session étudiant pourra être ajoutée.
