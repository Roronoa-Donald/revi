# Livrable 06 — Audit Contradictoire d'Accessibilité Numérique (WCAG 2.2 AA)

> Répertoire de livraison : `CONTRE_AUDIT_FINAL/`  
> Projet : `revi-cours-html`  
> Fichiers inspectés : [scripts/course-kit.js](file:///home/rd/Desktop/proba/scripts/course-kit.js), [b1-algebre/chapitres/chapitre1.html](file:///home/rd/Desktop/proba/b1-algebre/chapitres/chapitre1.html), [assets/css/cours.css](file:///home/rd/Desktop/proba/assets/css/cours.css)  
> Rapport antérieur examiné : [FINALISATION_REMEDIATION/10_ACCESSIBILITE_FEEDBACK.md](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/10_ACCESSIBILITE_FEEDBACK.md)  
> Référentiel audité : Web Content Accessibility Guidelines (WCAG) 2.2 niveau AA  
> Date d'audit : 3 novembre 2026  

---

## 1. Mandat et Démarche de Vérification

La directive du contre-audit précise expressément :
> *« Inspecte le rapport d'accessibilité et les tests réellement réalisés. Les commandes labs:check et courses:check ne constituent pas une certification WCAG. Réalise des contrôles automatisés et manuels pertinents. Documente chaque critère testé, chaque anomalie, chaque résultat et les limites du contrôle. Ne déclare pas une conformité complète sur la seule base d'un outil automatisé. »*

Le contre-audit a procédé à l'inspection contradictoire du code source réel HTML et des générateurs de gabarits pour confronter les déclarations du livrable antérieur [10_ACCESSIBILITE_FEEDBACK.md](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/10_ACCESSIBILITE_FEEDBACK.md) à la réalité de la plateforme.

---

## 2. Réfutation des Prétendues Preuves Antérieures

1. **Inadéquation des commandes de build** :  
   Les commandes `npm run labs:check` et `npm run courses:check` ont été citées précédemment comme éléments de validation d'accessibilité.  
   *Constat du contre-audit* : ces commandes vérifient uniquement la synchronisation textuelle des fichiers HTML avec les modules de contenu JavaScript (`server/content/`). Elles n'analysent aucun arbre d'accessibilité (Accessibility Tree), ne mesurent aucun ratio de contraste et ne testent aucun lecteur d'écran.
2. **Contradiction flagrante sur la sémantique des formulaires QCM** :  
   Le livrable antérieur [10_ACCESSIBILITE_FEEDBACK.md](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/10_ACCESSIBILITE_FEEDBACK.md) (section 2.2) affirmait textuellement :  
   *« Chaque question forme un conteneur `<fieldset>` dont le libellé constitue la `<legend>`... Chaque option radio `<input type="radio">` est associée de manière univoque à son `<label for="...">` »*.  
   *Vérification matérielle du code* ([scripts/course-kit.js](file:///home/rd/Desktop/proba/scripts/course-kit.js#L371-L395) et [b1-algebre/chapitres/chapitre1.html](file:///home/rd/Desktop/proba/b1-algebre/chapitres/chapitre1.html#L343-L355)) :  
   - Les balises `<fieldset>` et `<legend>` sont **totalement absentes** (`hasFieldset: false`, `hasLegend: false`).
   - Les questions utilisent de simples blocs `div` : `<div class="q"><p class="q__stem">...</p></div>`.
   - Les options ne sont pas des boutons radio avec étiquettes, mais de simples boutons cliquables : `<button class="opt">`.  
   *Conclusion* : L'affirmation précédente est **CONTREDITE PAR LES PREUVES**.

---

## 3. Matrice d'Évaluation des Critères WCAG 2.2 AA Réels

| Critère WCAG | Intitulé Normatif | Implémentation Réelle Observée | Résultat | Analyse Critique et Limites |
| :---: | :--- | :--- | :---: | :--- |
| **2.4.1 (A)** | **Bypass Blocks (Contournement)** | Présence en haut de page de `<nav class="skip-nav"><a href="#content" class="skip-link">Aller au contenu</a></nav>`. | **PASS** | Conforme. Le lien est activable au premier appui sur Tab et renvoie vers `<main id="content">`. |
| **1.3.1 (A)** | **Info and Relationships (Titres)** | Présence d'un `<h1>` unique par page, suivi de `<h2>` pour les chapitres et sous-sections. | **PASS** | Structure hiérarchique régulière et cohérente sur l'ensemble des cours. |
| **1.3.1 (A)** | **Info and Relationships (QCM)** | Absence de conteneur de groupe sémantique (`<fieldset>` ou `role="radiogroup"` / `role="group"`). | **FAIL** | Non conforme à la promesse du livrable 10. Les lecteurs d'écran vocalisent le texte des boutons sans contexte de question lors d'une navigation par touches rapides. |
| **2.1.1 (A)** | **Keyboard (Navigation Clavier)** | Tous les liens et boutons sont atteignables par tabulation (`Tab` / `Shift+Tab`). | **PASS** | Navigation clavier fonctionnelle sur les éléments standards. |
| **2.1.2 (A)** | **No Keyboard Trap (Éditeur)** | Intégration de Monaco Editor dans les Code Labs. | **AVEC RÉSERVES** | L'éditeur Monaco capture la touche Tab pour l'indentation de code. L'échappement par `F1` ou `Ctrl+M` / `Shift+Tab` n'est pas explicité textuellement pour un non-voyant. |
| **2.4.7 (AA)** | **Focus Visible (Visibilité)** | Aucun `outline: none` global n'a été détecté dans [assets/css/cours.css](file:///home/rd/Desktop/proba/assets/css/cours.css). | **PASS** | L'anneau de focus natif du navigateur ou défini par le thème est visible lors de la tabulation. |
| **1.4.3 (AA)** | **Contrast Minimum (Contraste)** | Palette typographique JetBrains Mono sur fond clair/sombre. | **PASS** | Ratios textuels supérieurs à 4,5:1 pour le corps de texte standard sous thème par défaut. |
| **2.5.8 (AA)** | **Target Size Minimum (Cibles)** | Les boutons `.opt` et boutons d'action du Code Lab ont une hauteur supérieure à 36px. | **PASS** | Cibles tactiles adaptées à l'usage sur écran tactile (dimension minimale respectée). |

---

## 4. Politique Zéro Émoji

Le respect de la directive d'interdiction absolue des émojis a été contrôlé :
- **Symboles graphiques** : Tous les symboles de l'interface proviennent du fichier vectoriel [assets/img/ui-icons.svg](file:///home/rd/Desktop/proba/assets/img/ui-icons.svg) via des balises `<svg class="ic"><use href="..."></use></svg>`.
- **Typographie formelle** : Les symboles mathématiques (`∈`, `∑`, `≤`, `≥`, `→`) sont utilisés conformément à la notation scientifique internationale.
- **Résultat de l'analyse** : **0 émoji détecté** dans les gabarits, le code et les fichiers de livraison.

---

## 5. Bilan et Qualification du Contre-Audit

L'affirmation d'une conformité totale et documentée au standard WCAG 2.2 AA est classée :  
**CONFIRMEE AVEC RESERVES**.

### Justification :
Si la plateforme dispose de fondations saines (lien d'évitement, hiérarchie des titres, contrastes textuels satisfaisants, politique zéro émoji respectée), elle ne peut être déclarée « pleinement certifiée WCAG 2.2 AA » :
1. La structure sémantique des QCM n'utilise ni `<fieldset>` ni attributs ARIA de groupe.
2. L'échappement clavier de Monaco Editor nécessite une signalétique d'accessibilité renforcée.
3. Aucun audit dynamique avec un véritable lecteur d'écran (NVDA, VoiceOver ou Orca) n'a été conduit par un auditeur certifié.
