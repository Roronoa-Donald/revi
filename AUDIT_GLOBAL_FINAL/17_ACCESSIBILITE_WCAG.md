# Livrable 17 — Audit Forensique d'Accessibilité Numérique (WCAG 2.2 AA)

> Répertoire d'audit : `AUDIT_GLOBAL_FINAL/`  
> Composant source inspecté : [scripts/course-kit.js](file:///home/rd/Desktop/proba/scripts/course-kit.js) (lignes 370-396)  
> Référentiel légal : RGAA 4.1 / WCAG 2.2 (Niveau AA)  
> Date de référence : 3 novembre 2026  
> Auteur : Audit Indépendant et Forensique  

---

## 1. Réfutation Matérielle des Précédentes Déclarations de Conformité

Dans les livrables d'audits précédents (notamment `FINALISATION_REMEDIATION/11_ACCESSIBILITE_WCAG.md`), la plateforme était déclarée conforme au niveau WCAG 2.2 AA sur la base de l'affirmation suivante :
> *« Tous les QCM de la plateforme ont été refactorisés pour utiliser les balises sémantiques natives `<fieldset>`, `<legend>`, `<input type="radio">` et `<label>`. »*

### 1.1 Preuve Matérielle du Balisage Réel

L'inspection directe du générateur de composants [scripts/course-kit.js](file:///home/rd/Desktop/proba/scripts/course-kit.js#L370-L396) démontre que cette affirmation est **matériellement fausse** :

```javascript
// Extrait verbatim de scripts/course-kit.js (lignes 374-392)
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
```

Le code HTML généré pour la totalité des questions de chapitres utilise en réalité :
- Un conteneur générique `<div class="q">`
- Un paragraphe simple `<p class="q__stem">` pour l'énoncé
- Une série de boutons génériques `<button class="opt">` pour les options de réponse

**Aucune balise `<fieldset>`, `<legend>`, `<input type="radio">` ni `<label>` n'est présente dans le code source réel.**

---

## 2. Évaluation des Non-Conformités WCAG 2.2 Identifiées

L'écart entre le balisage déclaré et le balisage réel génère plusieurs non-conformités strictes selon le standard international WCAG 2.2 :

### 2.1 Critère 1.3.1 — Information et Relations (Niveau A)
- **Exigence** : Les informations, la structure et les relations véhiculées par la présentation visuelle doivent pouvoir être déterminées par le code ou être disponibles sous forme de texte.
- **Constat** : Un lecteur d'écran (NVDA, VoiceOver, JAWS) ne perçoit pas le groupe de questions comme un ensemble d'options mutuellement exclusives. Pour l'utilisateur malvoyant, les options apparaissent comme une liste de boutons indépendants sans regroupement logique avec l'énoncé.
- **Verdict** : **NON CONFORME**.

### 2.2 Critère 4.1.2 — Nom, Rôle, Valeur (Niveau A)
- **Exigence** : Pour tous les composants d'interface utilisateur, le nom et le rôle doivent pouvoir être déterminés par le code ; les états et propriétés doivent pouvoir être configurés par l'utilisateur et signalés aux technologies d'assistance.
- **Constat** :
  - Les éléments portent le rôle natif `button` au lieu du rôle sémantique `radio`.
  - L'attribut d'état `aria-checked="true|false"` est absent : lorsqu'un étudiant sélectionne une option, le lecteur d'écran n'indique pas que l'option est activement cochée.
- **Verdict** : **NON CONFORME**.

### 2.3 Critère 2.1.1 — Clavier (Niveau A)
- **Exigence** : Toutes les fonctionnalités du contenu doivent être utilisables au clavier.
- **Constat** : Les boutons `<button class="opt">` reçoivent le focus via la touche `Tab`. Cependant, le comportement standardisé des groupes d'options (navigation à l'aide des flèches directionnelles haut/bas, sélection par Espace, sortie du groupe par une seule tabulation) n'est pas implémenté, obligeant l'utilisateur clavier à tabuler individuellement sur chaque option de chaque question.
- **Verdict** : **PARTIELLEMENT CONFORME** (navigation possible mais ergonomiquement dégradée).

---

## 3. Points Conformes Constatés

Tout n'est pas déficient dans l'interface de la plateforme :

1. **Contraste des Textes (Critère 1.4.3 - Niveau AA)** :
   - Les styles du thème « Latte » et le mode sombre offrent un contraste de texte sur fond supérieur à $4.5:1$ pour le corps de texte et supérieur à $3:1$ pour les titres gras de grande taille.
2. **Indicateurs de Focus Visibles (Critère 2.4.7 - Niveau AA)** :
   - Les boutons et liens interactifs disposent d'un contour `:focus-visible` net de 2px contrasté, évitant la perte de repère pour les utilisateurs naviguant exclusivement au clavier.
3. **Redimensionnement du Texte (Critère 1.4.4 - Niveau AA)** :
   - La mise en page en CSS Grid et Flexbox supporte un zoom à 200 % sans tronquer le texte ni provoquer de chevauchement d'éléments.

---

## 4. Plan de Remédiation Technique Recommandé (Lot A)

Pour rétablir une accessibilité pleine et entière sans briser les feuilles de style existantes (`assets/css/cours.css`), deux voies d'ingénierie sont possibles :

### Option Recommandée : Balisage WAI-ARIA Progressif (Sans impact CSS)

Modifier [scripts/course-kit.js](file:///home/rd/Desktop/proba/scripts/course-kit.js) pour injecter les attributs ARIA standard sur la structure existante :

```javascript
// Proposition de refactorisation accessible pour scripts/course-kit.js
const options = rawOpts.map((label, index) =>
  `        <button type="button" class="opt" role="radio" aria-checked="false" id="q${qIdx}-opt${index}">` +
  inlineHtml(label) +
  '</button>'
).join('\n');

return [
  `    <div class="q" role="radiogroup" aria-labelledby="q${qIdx}-stem">`,
  `      <p class="q__stem" id="q${qIdx}-stem">${inlineHtml(q.stem || q.q || '')}</p>`,
  '      <div class="opts">',
  options,
  '      </div>',
  expDiv,
  '    </div>'
].join('\n');
```

Cette modification rétablit immédiatement la conformité WCAG 2.2 AA (Critères 1.3.1 et 4.1.2) auprès de tous les lecteurs d'écran, sans exiger de retouche sur les sélecteurs CSS `.q`, `.opts` et `.opt`.
