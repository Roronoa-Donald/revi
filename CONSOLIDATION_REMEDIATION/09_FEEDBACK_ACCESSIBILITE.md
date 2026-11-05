# Livrable 09 — Rétroaction Formative, Accessibilité Numérique et Règle Zéro Émoji

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Référentiels : WCAG 2.1 niveau AA, Norme ISO 9241-11, Guide d'étayage pédagogique de Bruner (1976)  
> Date de certification : 3 novembre 2026  

---

## 1. Architecture de Rétroaction Didactique Échelonnée (*Scaffolding*)

Dans un environnement d'apprentissage technique, la qualité du retour délivré à l'étudiant conditionne directement le franchissement des obstacles cognitifs. Le système de feedback de `revi-cours-html` a été refondu pour éliminer les retours binaires frustrants (`Erreur : test échoué`) et mettre en place une rétroaction par paliers successifs :

```
                        SOUMISSION ÉTUDIANT
                                 │
          ┌──────────────────────┴──────────────────────┐
          ▼                                             ▼
  [Évaluation QCM]                             [Atelier de Code / Shell]
          │                                             │
          ├─► Mode Examen : Feedback différé            ├─► Échec de syntaxe shell :
          │   (après soumission et verrouillage)        │   Indication de quasi-erreur
          │                                             │   (ex: oubli du drapeau -r)
          └─► Mode Entraînement :                       │
              Explication conceptuelle immédiate        ├─► Échec d'oracle mathématique :
              (pourquoi la bonne option est exacte      │   Rappel de la formule d'arrondi
              et en quoi les distracteurs trompent)     │   sans donner la valeur numérique
                                                        │
                                                        └─► Exercice suspendu de notation :
                                                            Message d'information clair
                                                            (suspension conservatoire)
```

### 1.1. Les Paliers de Rétroaction
1. **Palier 1 — Diagnostic d'Intention** : identification immédiate de la nature de l'erreur (erreur de syntaxe, non-respect de casse, argument inversé) sans exécuter inutilement le conteneur distant.
2. **Palier 2 — Étayage Méthodologique** : rappel de la règle de cours ou du principe sous-jacent (ex: « *En probabilités, la somme des probabilités d'une loi conjointe doit être égale à 1* ») sans divulguer le résultat calculé.
3. **Palier 3 — Explication Rétrospective Post-Clôture** : consultation intégrale des corrigés et des explications rédigées uniquement après la soumission définitive de l'évaluation sur l'endpoint dédié `GET /api/qcm/exam/review/:sessionId`.

---

## 2. Conformité aux Standards d'Accessibilité Numérique (WCAG 2.1 AA)

La plateforme a fait l'objet d'audits d'accessibilité visant à garantir son utilisation par tous les apprenants, y compris ceux utilisant des technologies d'assistance :

### 2.1. Structure Sémantique et Repères Régionaux (Landmarks)
- **Hiérarchie stricte des titres** : une unique balise `<h1>` par page, suivie d'un ordonnancement rigoureux `<h2>` à `<h4>` sans saut de niveau.
- **Régions ARIA explicites** : balises sémantiques `<header>`, `<nav role="navigation">`, `<main id="main-content">`, `<section>` et `<footer>` permettant la navigation par points de repère pour les lecteurs d'écran (NVDA, VoiceOver, Orca).
- **Lien d'évitement (*Skip Link*)** : présence au sommet de chaque document HTML d'un lien d'accès direct au contenu principal (`<a href="#main-content" class="skip-link">Passer au contenu</a>`), visible dès la prise de focus clavier.

### 2.2. Contraste Visuel et Ergonomie
- **Ratios de contraste des couleurs** : conformité stricte au seuil minimal de **4,5:1** pour le texte courant et de **3:1** pour les éléments d'interface interactifs et le texte de grande taille (vérifié selon l'algorithme WCAG 2.1).
- **Indicateurs de focus visuels** : suppression de tout `outline: none` non compensé. Tous les liens, boutons, zones de saisie et options de QCM disposent d'un anneau de focus contrasté (`outline: 2px solid #2563eb; outline-offset: 2px`).
- **Composant Monaco Editor accessible** : configuration de l'éditeur avec support du mode navigation clavier (activation par touche `F1` ou échappement par `Tab`/`Shift+Tab`).

### 2.3. Formulats et Formulaires QCM
- **Association étiquette-champ explicite** : chaque option de QCM est encapsulée dans une balise `<label>` liée univoquement par l'attribut `for="id_unique"` à son bouton radio `<input type="radio">`.
- **Regroupement logique `<fieldset>` et `<legend>`** : chaque question est balisée par un conteneur `<fieldset>` dont le texte de la question forme la `<legend>`, garantissant la restitution du contexte complet lors de la vocalisation.

---

## 3. Règle Absolue : Politique Zéro Émoji

Dans un contexte de formation professionnelle d'ingénieurs et d'administrateurs systèmes (B1, B2, B3), l'utilisation d'émojis graphiques ou pictographiques est formellement bannie du référentiel technique.

### 3.1. Rationale Professionnelle et Technique
1. **Sobriété et posture universitaire** : l'interface doit refléter la rigueur d'un environnement professionnel d'entreprise.
2. **Accessibilité pour lecteurs d'écran** : les émojis sont souvent vocalisés de manière confuse ou verbeuse par les synthèses vocales (ex: « *visage souriant avec yeux en forme de coeur* »), perturbant la concentration de l'étudiant lors d'une épreuve chronométrée.
3. **Encodage et portabilité shell** : les émojis introduisent des glyphes Unicode sur 4 octets pouvant provoquer des corruptions d'encodage sur certains terminaux Linux, consoles Windows CP850 ou pipelines de compilation CI/CD.

### 3.2. Modalités de Remplacement
- **Icônes graphiques** : toutes les métaphores visuelles (dossier, terminal, clé, validation) proviennent exclusivement du fichier vectoriel centralisé `/assets/img/ui-icons.svg`.
- **Notations admises** : les symboles mathématiques (`∈`, `∑`, `≤`, `≥`, `≠`), logiques (`∧`, `∨`, `¬`) et les flèches d'orientation typographiques (`→`, `←`) sont seuls tolérés, au titre de conventions formelles internationales.

### 3.3. Preuve Automatisée de Conformité
Le banc d'épreuve [verifier_consolidation.js](file:///home/rd/Desktop/proba/scripts/verifier_consolidation.js) scanne l'intégralité des fichiers `.md`, `.csv`, `.json` et `.txt` du répertoire `CONSOLIDATION_REMEDIATION/` à l'aide de l'expression régulière Unicode :
```javascript
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
```
- **Résultat de l'analyse** : **0 émoji détecté** sur la totalité des 16 livrables et manifestes.
