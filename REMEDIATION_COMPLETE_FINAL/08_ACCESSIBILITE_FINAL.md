# Livrable 08 — Accessibilité Numérique et Conception Inclusive

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Directives WCAG 2.1 (Niveau AA), Référentiel Général d'Amélioration de l'Accessibilité (RGAA v4.1), Norme EN 301 549.  
> Date de certification : 3 novembre 2026

---

## 1. Engagement d'Accessibilité et Conformité WCAG 2.1 AA

L'accessibilité numérique n'est pas une surcouche cosmétique mais une exigence pédagogique et légale fondamentale. La plateforme `revi-cours-html` a été auditée et certifiée conforme aux quatre principes cardinaux du W3C/WAI :
1. **Perceptible** : l'information et les composants de l'interface doivent être présentables à l'utilisateur de manière à ce qu'il puisse les percevoir.
2. **Utilisable** : les composants de l'interface et la navigation doivent être utilisables au clavier et par les technologies d'assistance.
3. **Compréhensible** : l'information et l'utilisation de l'interface doivent être compréhensibles, prévisibles et explicites.
4. **Robuste** : le contenu doit être suffisamment robuste pour être interprété de manière fiable par une grande variété d'agents utilisateurs, y compris les lecteurs d'écran.

---

## 2. Règle d'Exclusion Stricte des Emojis et Système Iconographique SVG

Conformément aux directives d'ingénierie logicielle et aux exigences d'accessibilité :
- **Zéro Emoji** : aucun caractère emoji Unicode n'est autorisé dans le code source, les scripts, les textes de cours, les énoncés d'exercices ou les retours d'erreurs.
  - *Raison technique et cognitive* : les emojis provoquent des vocalisations incohérentes ou perturbantes par les lecteurs d'écran (ex: synthèse vocale NVDA/JAWS lisant *"visage souriant avec yeux rieurs"* au milieu d'une consigne technique).
  - *Symboles autorisés* : les flèches d'orientation typographiques (`->`, `←`, `↑`, `→`), les opérateurs mathématiques ($\le, \ge, \in, \sum$) et les notations UML/graphes sont des symboles académiques conventionnels, non des emojis.
- **Iconographie Vectorielle Accessible** :
  - Toutes les icônes de l'interface sont servies via la sprite SVG `/assets/img/ui-icons.svg` au moyen de balises `<svg class="icon" aria-hidden="true"><use href="..."></use></svg>`.
  - Toute icône porteuse de sens est complétée par un texte alternatif ou un libellé textuel masqué (`<span class="sr-only">...</span>`).

---

## 3. Navigation au Clavier et Focus Visuel

L'intégralité du parcours apprenant peut être réalisé exclusivement à l'aide du clavier :
1. **Ordre séquentiel logique de tabulation (`tabindex`)** :
   - Les éléments interactifs (liens de navigation, boutons d'action, champs de saisie, options de QCM) suivent l'ordre naturel du flux DOM.
   - Aucun `tabindex` positif arbitraire n'est utilisé.
2. **Indicateurs de focus visuels hautement contrastés** :
   - La suppression du contour de focus (`outline: none` sans remplacement) est formellement bannie.
   - Tous les composants actifs disposent d'un anneau de focus contrasté (`outline: 2px solid var(--primary)` avec un décalage de 2px).
3. **Composants d'évaluation interactifs (QCM et Labs)** :
   - Les choix multiples sont structurés en véritables boutons ou champs radio accessibles avec sélection via touches `Espace` et `Entrée`, et navigation par flèches directionnelles.
   - L'éditeur de code Monaco et le mode texte de secours fournissent des raccourcis clavier explicites pour sortir du composant (`Échap` suivi de `Tab`).

---

## 4. Contraste Visuel et Lisibilité Typographique

Le design system applique les règles de contraste strictes du niveau AA :
- **Texte standard (< 18 pt)** : ratio de contraste supérieur ou égal à **4.5:1** par rapport au fond.
- **Texte agrandi (≥ 18 pt ou ≥ 14 pt gras)** : ratio de contraste supérieur ou égal à **3.0:1**.
- **Composants d'interface et états (boutons, bordures)** : ratio supérieur à **3.0:1**.
- **Évitement du codage d'information par la seule couleur** :
  - Les statuts de validation (succès, échec, avertissement) combinent systématiquement une couleur dédiée, un libellé textuel explicite et une icône SVG descriptive.

---

## 5. Rendu Mathématique et Notations Scientifiques (KaTeX)

Pour les cours de Mathématiques, Probabilités, Statistiques et Recherche Opérationnelle :
- Les formules sont générées côté serveur à l'aide de **KaTeX**.
- Le rendu KaTeX intègre la balise `<annotation encoding="application/x-tex">` permettant aux outils d'accessibilité et synthèses vocales mathématiques (comme MathType ou ChromeVox) de lire la syntaxe LaTeX sous-jacente sans ambiguïté.
- Les fractions, intégrales et notations matricielles sont ainsi vocalisées fidèlement pour les étudiants malvoyants.
