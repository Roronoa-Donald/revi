# 🔨 AUDIT-SANS-PITIE.md
### Playbook de chasse aux bugs, à l'incomplétude et à la médiocrité visuelle — post-refonte

> NOTE : copie de travail placée ici (zai-hermes/) pour les sous-agents d'audit. Le fichier était absent de la racine du repo.

> **Doctrine** : après une refonte complète, le code "a l'air" de marcher. Ce document part du principe inverse — **rien ne marche tant que ce n'est pas prouvé**. Chaque page, chaque route, chaque fonction est coupable jusqu'à preuve du contraire, apportée par lecture de code réelle ou exécution réelle, jamais par supposition.

---

## 2. Doctrine : zéro tolérance

1. **Aucune affirmation sans preuve.** "Cette fonction semble correcte" est interdit. La conclusion doit venir d'une lecture complète de la fonction, de ses appelants, et si possible d'une exécution (test, `curl`, rendu réel).
2. **Le diff de refonte n'est pas une garantie.** Un commit massif de refactoring est la source la plus probable de régressions silencieuses.
3. **"Ça compile" ≠ "ça marche".** Un type `any`, un cast forcé, un `try/catch` vide font passer la compilation tout en cachant un bug.
4. **Le silence est suspect.** Un écran vide sans erreur, une promesse non attendue, un `catch` qui avale l'erreur sans la logguer — ce sont des bugs à part entière.
5. **Rien n'est corrigé sans être re-vérifié.** Toute correction déclenche une repasse de l'agent qui a trouvé le bug.
6. **La complétude n'est pas l'esthétique.** Le test fonctionnel prime toujours sur l'apparence.

---

## 6. Format de rapport de bug standard

Chaque agent d'audit utilise **exactement** ce format pour chaque trouvaille :

```markdown
### [P0] Titre court et sans ambiguïté du problème
- **ID** : COMPLETUDE-001 (préfixe = agent + numéro séquentiel)
- **Type** : Complétude / Logique / Intégration / Tests / Visuel
- **Fichier(s)** : chemin/vers/fichier.ts (lignes 42–58)
- **Description** : ce qui est cassé ou incomplet, en une phrase factuelle.
- **Reproduction** : étapes concrètes (ou commande exécutée) pour observer le problème.
- **Cause racine** : pourquoi ça arrive — pas seulement où.
- **Correctif proposé** : approche concrète, pas "à revoir".
- **Statut** : Ouvert / En cours / Corrigé / Vérifié
```

Chaque agent maintient un fichier `audit/<son-nom-court>.md` avec toutes ses entrées, plus un en-tête récapitulatif :

```markdown
# Rapport — chasseur-de-completude
Date : [date]
Total : 4 P0, 9 P1, 12 P2, 3 P3
```

---

## 7. Grille de sévérité

| Niveau | Nom | Définition | Politique |
|---|---|---|---|
| **P0** | Bloquant | Fonctionnalité clé cassée, crash, perte/corruption de données, faille de sécurité évidente, résultat affiché faux | Interdiction absolue de livrer tant que non corrigé |
| **P1** | Majeur | Fonctionnalité incomplète ou incohérente visible par l'utilisateur, bug logique qui n'apparaît que dans certains cas | Corrigé avant la fin de la session d'audit |
| **P2** | Mineur | Cas limite mal géré, message d'erreur peu clair, incohérence visuelle notable | Corrigé si le temps le permet, sinon planifié explicitement |
| **P3** | Cosmétique | Espacement, détail typographique, micro-incohérence sans impact fonctionnel | Backlog, jamais bloquant |

**Règle non négociable : aucun P0 ou P1 ouvert au moment de déclarer l'audit terminé.**

---

## 8. ANNEXE — charte d'excellence visuelle et d'interaction

> Cette charte s'appuie sur l'observation directe de brilliant.org. Elle en extrait des **principes transposables**, pas un style à copier. La charte validée par l'utilisateur pour CE projet est DESIGN.md (racine du repo) : JetBrains Mono partout, light-first, papier #f5f3f1, periwinkle #456dff, rayons 12–16px.

### 8.1 — Ce qui rend un produit comme brilliant.org "vivant"

1. **Un guide, pas un formulaire.** Chaque interaction significative doit donner un retour visible immédiatement (pas de clic silencieux).
2. **Interactivité avant le texte.**
3. **Contenu en bouchées, jamais en pavé.**
4. **Un système d'illustration cohérent** (une seule famille visuelle répétée partout).
5. **Preuve sociale intégrée à l'expérience, pas reléguée en bas de page.**
6. **Un CTA principal unique et dominant, répété.** Jamais plusieurs actions de même poids visuel en concurrence.
7. **Le mouvement a un rôle, pas un effet.**

### 8.2 — Checklist vérifiable écran par écran

**Fondations**
- [ ] Toutes les couleurs, espacements, rayons, ombres et typographies viennent d'un fichier de tokens central (pas de valeurs codées en dur dispersées)
- [ ] Une échelle typographique cohérente est utilisée partout
- [ ] Une seule famille d'icônes/illustrations dans tout le produit

**États (obligatoires sur CHAQUE écran qui charge des données)**
- [ ] État de chargement (skeleton ou spinner cohérent, jamais un écran blanc)
- [ ] État vide (message + action)
- [ ] État d'erreur (message clair, action de récupération si possible)
- [ ] État de succès / cas nominal

**Interaction**
- [ ] Chaque élément cliquable a un état `hover`, `focus` et `active` visuellement distinct
- [ ] Le focus clavier est visible et suit un ordre de tabulation logique
- [ ] Chaque action asynchrone donne un retour immédiat — jamais de clic qui ne produit visuellement rien pendant 2 secondes ou plus
- [ ] Les animations ont une durée et une courbe d'accélération cohérentes dans tout le produit

**Contenu et structure**
- [ ] Aucun contenu de test visible en apparence (Lorem ipsum, données factices, images cassées)
- [ ] Chaque image a un texte alternatif pertinent
- [ ] Un seul CTA principal visuellement dominant par écran
- [ ] La preuve sociale ou les éléments de confiance (le cas échéant) sont visibles sans scroll excessif

**Accessibilité**
- [ ] Contraste texte/fond ≥ 4.5:1 pour le texte courant (WCAG AA)
- [ ] Cibles tactiles ≥ 44×44px
- [ ] Navigation complète au clavier possible sur les parcours critiques

**Responsive**
- [ ] Aucun débordement horizontal sur mobile
- [ ] Contenu prioritaire lisible sans zoom sur un écran de 375px de large
- [ ] Les breakpoints principaux sont testés, pas seulement supposés fonctionner

Toute case non cochée devient une entrée dans le rapport design-ux, avec la sévérité appropriée (un écran sans état d'erreur est un P1, un écart de contraste mineur un P2/P3).

---

## 9. Boucle de vérification "aucun bug oublié"

1. Auditeur X produit son rapport avec N entrées.
2. Correcteur traite les entrées par ordre de sévérité, une à une.
3. Après chaque lot corrigé, l'auditeur X d'origine est ré-invoqué UNIQUEMENT sur les fichiers touchés, pour confirmer résolution ET absence de régression.
4. Une entrée ne passe au statut "Vérifié" que si l'auditeur d'origine la confirme.
5. Répéter jusqu'à ce que les rapports ne contiennent plus aucun P0 ni P1 "Ouvert" ou "En cours".
6. Faire tourner une dernière fois TOUS les auditeurs sur l'ensemble du repo avant de clôturer.

---

## 11. Definition of Done

L'audit n'est terminé **que si toutes ces cases sont cochées**, avec preuve à l'appui :

- [ ] Les 5 auditeurs (complétude, logique, intégration, tests, design/UX) ont tourné sur l'intégralité du périmètre
- [ ] Les rapports ne contiennent plus aucune entrée P0 ou P1 au statut "Ouvert" ou "En cours"
- [ ] Chaque correction a été re-vérifiée par l'auditeur d'origine, pas seulement par le correcteur
- [ ] La suite de tests complète passe sans échec, sans test `.skip`/`.only` oublié
- [ ] Le build de production se termine sans erreur ni avertissement de type
- [ ] Le lint tourne à zéro erreur (pas de désactivations ajoutées pour faire passer l'audit)
- [ ] Chaque écran principal a été vérifié manuellement dans ses 4 états
- [ ] La checklist section 8.2 est cochée pour chaque écran principal
- [ ] Une dernière passe complète de tous les auditeurs sur l'ensemble du repo ne remonte aucun P0/P1 nouveau
