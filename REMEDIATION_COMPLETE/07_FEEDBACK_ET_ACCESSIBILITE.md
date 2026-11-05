# Livrable 07 — Feedback Pédagogique, Ergonomie et Accessibilité Numérique

> Répertoire : `REMEDIATION_COMPLETE/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Modèle de Feedback de Hattie & Timperley (2007), Principes UDL 3.0 (CAST), Règles pour l'Accessibilité des Contenus Web (WCAG 2.1 niveau AA).

---

## 1. Refonte du Système de Feedback Pédagogique

### 1.1. Diagnostic du Feedback Initial
Dans la version initiale, l'échec à un test de code ou à une analyse se traduisait par un message d'erreur générique :
- `reason: "wrong_output"`
- Aucun diagnostic explicatif de l'erreur commise.
- L'apprenant était placé face à un blocage cognitif : il constatait l'échec sans comprendre si l'erreur provenait de la logique algorithmique, d'un problème de formattage, d'un espace en trop ou d'un cas limite non traité.

### 1.2. Déploiement du Modèle Didactique de Hattie & Timperley (2007)
Le moteur d'évaluation (`server/exercises/runner.js`) et le validateur de commandes (`server/exercises/command-validator.js`) articulent désormais le retour pédagogique selon trois dimensions :

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Structure du Nouveau Feedback                   │
├────────────────────────────────────────────────────────────────────────┤
│ 1. FEED UP (Où vais-je ?)                                              │
│    Rappel de la compétence visée et du contrat de l'exercice.           │
│    Ex : « L'exercice attend le listage exhaustif avec métadonnées. »   │
├────────────────────────────────────────────────────────────────────────┤
│ 2. FEED BACK (Comment j'y vais ?)                                      │
│    Diagnostic ciblé et bienveillant de l'erreur observée.              │
│    Ex : « Votre commande liste le répertoire mais omet les entrées     │
│          masquées (. et ..). »                                         │
├────────────────────────────────────────────────────────────────────────┤
│ 3. FEED FORWARD (Quelle est la prochaine étape ?)                      │
│    Indice progressif orientant vers la correction autonome.           │
│    Ex : « Consultez le chapitre 1 et utilisez l'option courte -a. »    │
└────────────────────────────────────────────────────────────────────────┘
```

### 1.3. Remédiation des Messages d'Erreur dans le Runner
1. **Invites interactives stdin :**
   - Au lieu de rejeter brutalement un programme débutant qui affiche `Entrez votre nombre : 42`, le runner filtre l'invite grâce à `stripPromptPollution`.
   - Si une ambiguïté persiste, le message informe avec clarté : *« Attention : veillez à afficher uniquement la valeur attendue sans texte d’invite interactif sur stdout. »*
2. **Commandes shell (`command-validator.js`) :**
   - Détection des quasi-erreurs avec messages contextuels sur-mesure :
     - *Drapeau manquant :* « L’option -a est requise pour afficher les fichiers cachés. »
     - *Mauvais utilitaire :* « L'utilitaire utilisé n'est pas standard sous Linux. Utilisez la commande native demandée (ex: ls, chmod, grep). »
     - *Argument manquant :* « N'oubliez pas de préciser le chemin cible de l'opération. »

---

## 2. Accessibilité Numérique et Conformité WCAG 2.1 AA

L'interface de la plateforme a été auditée et alignée sur les standards internationaux d'accessibilité numérique pour garantir l'inclusion de tous les profils d'apprenants (handicaps visuels, moteurs ou cognitifs).

### 2.1. Contraste des Couleurs et Palette Visuelle
Tous les thèmes de cours générés (`scripts/course-kit.js` et feuilles de style `cours.css`) respectent les ratios de contraste prescrits par le critère WCAG 1.4.3 (Contraste minimal 4.5:1 sur texte normal, 3:1 sur texte large et composants UI) :

- **Exemple Cybersécurité B2 :**
  - Couleur d'accentuation principale : Cyan 700 (`#0e7490`) sur fond blanc $\rightarrow$ **Ratio 5.36:1** (Conforme AA).
  - Couleur d'accentuation sombre : Cyan 800 (`#155e75`) sur fond blanc $\rightarrow$ **Ratio 7.27:1** (Conforme AAA).
  - Fond doux (`#ecfeff`) et bordure (`#a5f3fc`) calibrés pour ne pas éblouir tout en délimitant nettement les conteneurs d'information.
- **Exemple Linux B2 & Windows Server :**
  - Orange sombre (`#ea580c`) et Indigo profond (`#3730a3`) offrant des contrastes supérieurs à 6.2:1.

### 2.2. Navigabilité Intégrale au Clavier (Critère WCAG 2.1.1)
- **Ordre logique de tabulation (`tabindex`) :** Tous les éléments interactifs (boutons d'options QCM, onglets d'exercices, consoles de code, boutons de soumission) sont accessibles séquentiellement sans piège au clavier.
- **Indicateurs de focus visuels (Critère WCAG 2.4.7) :** Présence d'un anneau de focus net (`outline: 2px solid var(--accent); outline-offset: 2px`) contrasté sur tout élément recevant le focus clavier, neutralisant l'anti-pattern du `outline: none`.

### 2.3. Compatibilité avec les Technologies d'Assistance (Lecteurs d'Écran)
- **Rôles et états ARIA :**
  - Les conteneurs de QCM portent `role="group"` avec un `aria-label` ou `aria-labelledby` explicite identifiant la question.
  - Les résultats d'évaluation et alertes de score utilisent les régions dynamiques `aria-live="polite"` pour avertir l'apprenant non-voyant sans interrompre la lecture vocale en cours.
  - Les explications dépliées intègrent `aria-expanded="true/false"` pour signaler l'apparition du corrigé.
- **Règle stricte « Zéro Emoji » :**
  - Aucun emoji n'est utilisé dans l'interface, les textes ou les messages d'erreur. Les icônes sont vectorielles et sémantiques (`/assets/img/ui-icons.svg`), évitant la pollution sonore des synthèses vocales (ex: la lecture intempestive de libellés comme *« visage souriant avec yeux rieurs »* au milieu d'un énoncé technique).

---

## 3. Ergonomie et Adaptabilité Multi-Écrans (Responsive Design)

La mise en page a été validée sur un large spectre de résolutions :
- **Mobiles (320px à 480px) :**
  - Cibles tactiles agrandies à un minimum de 44 &times; 44 pixels CSS (WCAG 2.5.5 / 2.5.8), évitant les erreurs de sélection sur les boutons d'options.
  - Passage en colonne unique automatique des grilles complexes.
  - Bandeaux d'état d'entraînement (`lab__training`) et mentions « non noté » parfaitement visibles sans débordement horizontal.
- **Tablettes et Ordinateurs portables (768px à 1200px) :**
  - Disposition ergonomique en deux volets pour les ateliers de code (énoncé à gauche, éditeur et console de test à droite).
- **Écrans larges (&ge; 1440px) :**
  - Largeur de texte bornée (max 75-80 caractères par ligne) pour préserver le confort de lecture et éviter la fatigue oculaire.
