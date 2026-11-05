# 13_ACCESSIBILITE_SANDBOX_PERFORMANCES — ACCESSIBILITE WCAG, BUBBLEWRAP ET PERFORMANCES

**Projet :** `revi-cours-html`  
**Répertoire :** `/home/rd/Desktop/proba`  
**Fichiers inspectés :** `scripts/course-kit.js`, `corrections/outils/rejouer-isole.sh`, `server/services/execution/budget.js`

---

## 1. AUDIT DE L'ACCESSIBILITE NUMERIQUE (WCAG 2.1 NIVEAU AA)

L'ancien rapport affirmait de manière catégorique une « non-conformité totale de la sémantique QCM ». Une inspection contradictoire du gabarit HTML produit par `scripts/course-kit.js` et des feuilles de style associées conduit à une appréciation plus rigoureuse et nuancée :

### 1.1 Points Forts Vérifiés
1. **Éléments Interactifs Négatifs Natifs** : Les options de réponse ne sont pas de simples `<div>` ou `<span>` cliquables, mais de véritables éléments HTML `<button class="opt">`.  
   Ils héritent donc nativement de la focalisation clavier (`Tab` / `Shift+Tab`) et de l'activation par les touches `Entrée` et `Espace`, sans nécessiter de `tabindex` artificiel.
2. **Contraste Typographique WCAG AA** : Toutes les palettes de couleurs définies dans les cours respectent scrupuleusement les exigences de contraste minimum (4,5:1 pour le texte normal) :
   - RD-RO (Teal) : `#0f766e` sur blanc $\rightarrow$ ratio de **5,56:1**.
   - Cybersécurité B2 (Cyan) : `#0e7490` sur blanc $\rightarrow$ ratio de **5,36:1** ; `#155e75` $\rightarrow$ **7,27:1**.
3. **Mise en Page Fluide et Responsive** : Présence de la balise `<meta name="viewport" content="width=device-width, initial-scale=1.0">` sur 100 % des pages générées, interdisant le zoom bloqué.

### 1.2 Lacunes et Défauts Sémantiques Confirmés
1. **Absence de Regroupement Sémantique (`role="radiogroup"`)** : Le conteneur `<div class="opts">` ne déclare pas d'attribut `role="radiogroup"`. Un lecteur d'écran ne peut pas annoncer à l'utilisateur le nombre total d'options (ex: « Option 1 sur 4 »).
2. **Absence d'Attribut d'État (`aria-checked` ou `aria-pressed`)** : Lorsqu'une option est sélectionnée, sa classe CSS devient `.opt--selected`, mais aucun état ARIA n'est mis à jour pour les technologies d'assistance.
3. **Liaison Énoncé-Options Manquante** : L'énoncé `<p class="q__stem">` ne possède pas d'identifiant lié aux options par `aria-labelledby`.
4. **Retour Dynamique Non Notifié (`aria-live`)** : Le conteneur d'explication `<div class="q__exp">` apparaît dynamiquement dans le DOM sans `aria-live="polite"` ni `role="status"`, privant les utilisateurs non-voyants du retour pédagogique immédiat.

**Verdict Accessibilité :**  
Le composant QCM est **partiellement accessible au clavier**, mais présente des **défauts sémantiques avérés pour les lecteurs d'écran**. Il ne doit pas être qualifié de « totalement inaccessible », mais nécessite une mise en conformité ARIA formelle.

---

## 2. AUDIT TECHNIQUE DU SCRIPT DE SANDBOX BUBBLEWRAP

Le script `corrections/outils/rejouer-isole.sh` a été audité pour vérifier son comportement de confinement :

### 2.1 Objet de la Modification Récente
Les lignes 57 à 64 ont été ajoutées pour copier conditionnellement deux fichiers non suivis par Git dans le répertoire d'exécution temporaire :

```bash
if [[ -f "$root/server/routes/qcm.js" && ! -f "$temp_dir/project/server/routes/qcm.js" ]]; then
  mkdir -p "$temp_dir/project/server/routes"
  cp -- "$root/server/routes/qcm.js" "$temp_dir/project/server/routes/qcm.js"
fi
if [[ -f "$root/server/exercises/command-validator.js" && ! -f "$temp_dir/project/server/exercises/command-validator.js" ]]; then
  mkdir -p "$temp_dir/project/server/exercises"
  cp -- "$root/server/exercises/command-validator.js" "$temp_dir/project/server/exercises/command-validator.js"
fi
```

**Justification technique :**  
Le script créant son espace de test à partir d'une extraction d'archive Git (`git archive`), les fichiers ajoutés lors des phases de remédiation mais non encore commités étaient absents du sandbox, provoquant des échecs artificiels de tests. La copie ciblée de ces deux composants résout cette anomalie sans compromettre l'isolation.

### 2.2 Analyse de Sécurité de la Sandbox
- **Confinement du Système de Fichiers** : L'environnement utilise Bubblewrap (`bwrap`) avec montage en lecture seule du système hôte (`--ro-bind / /`) et espace temporaire volatile dédié (`--bind "$temp_dir" "$temp_dir"`).
- **Gestion des Secrets** : Le fichier `.env` n'est pas copié dans le conteneur ; les variables nécessaires sont injectées sous forme de clés de test factices.
- **Nettoyage Garanti** : L'interruption ou la terminaison normale déclenche un piège POSIX (`trap 'rm -rf "$temp_dir"' EXIT`) supprimant immédiatement tous les artefacts d'exécution.
- **Réseau** : Le réseau est désactivé par défaut (`--unshare-net`), sauf pour les tests d'intégration nécessitant un accès contrôlé.

---

## 3. PERFORMANCES ET PROTECTION CONTRE L'EPUISEMENT DES RESSOURCES

L'architecture d'exécution de code applique une triple barrière de sécurité pour prévenir les dénis de service et les dépassements de coûts :

1. **Pas d'Exécution à la Frappe** : Le widget Monaco Editor n'exécute jamais de code automatiquement lors de la saisie ; seule une action explicite sur le bouton « Exécuter » déclenche un appel API.
2. **Plafonds Temporels Stricts** : Chaque requête d'exécution est bornée par un timeout dur configuré par `CODE_EXEC_TIMEOUT_MS` (20 secondes par défaut).
3. **Garde-Fou de Quota Journalier (`budget.js`)** :
   - Quota individuel : limité à **40 exécutions par jour et par utilisateur**.
   - Quota global : limité à **900 exécutions par jour pour l'ensemble de la plateforme**.
   - Lorsque le quota est atteint, l'API renvoie un code HTTP 429 avec explication claire, protégeant l'infrastructure contre les boucles infinies ou les abus.
