# Livrable 13 — Guide de Maintenance Opérationnelle et Procédures de Contrôle

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Date de certification : 3 novembre 2026  
> Statut : Manuel de référence technique pour les exploitants et mainteneurs  

---

## 1. Les Quatre Règles d'Or de la Plateforme

Tout développeur, mainteneur ou ingénieur pédagogique intervenant sur `revi-cours-html` doit respecter sans dérogation les quatre règles cardinales suivantes :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LES QUATRE RÈGLES D'OR DE REVI-COURS                  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. RÈGLE ZÉRO ÉMOJI                                                         │
│    Aucun émoji dans le code, HTML, CSS, JS, markdown ou logs.               │
│    Icônes : /assets/img/ui-icons.svg | Symboles : mathématiques et flèches. │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. ÉTANCHÉITÉ CLIENT-SERVEUR DES ÉVALUATIONS                                │
│    Jamais de corrigé, de data-correct ou de cas de test secret dans le DOM.  │
│    Toute évaluation sommative est calculée et validée côté serveur.         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. AUCUNE RÉACTIVATION DE NOTATION SANS PREUVE FORMELLE                     │
│    Un exercice suspendu ne peut redevenir actif sans cas de test certifiés  │
│    et consignation de son empreinte SHA-256 dans grading-evidence.json.     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. SYNCHRONISATION ABSOLUE DU RÉFÉRENTIEL DES COURS                         │
│    Toute modification de liste de cours doit être répercutée à l'unisson    │
│    dans server/courses.js, access-control.js, middleware.js et build.js.    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Procédures Standard d'Exploitation

### 2.1. Procédure d'Ajout ou de Modification d'un Exercice de Code
1. **Édition du catalogue** : modifier ou ajouter la fiche dans [server/exercises/](file:///home/rd/Desktop/proba/server/exercises/) (`statement`, `starter`, `example`, `tests`, `solution`).
2. **Interdiction de fuite** : vérifier que les tests secrets et la solution ne sont jamais exportés vers le client (`toClient()` ne doit renvoyer que l'énoncé et le code d'amorce).
3. **Synchronisation des pages** :
   - Pour un cours compilé : exécuter `npm run courses -- <nom-du-cours>` (ou `npm run courses` pour l'ensemble).
   - Pour un cours manuscrit : exécuter `node scripts/generate-code-labs.js`.
4. **Vérification de non-régression** : exécuter `npm run labs:check`. La commande doit afficher `[ok] ateliers à jour`.
5. **Génération d'empreinte** : si l'exercice doit être éligible à la notation sommative, ajouter son hash SHA-256 dans `grading-evidence.json` après validation unitaire du corrigé de référence.

### 2.2. Procédure de Rédaction ou de Modification d'un QCM
1. **Édition du module de contenu** : modifier les questions dans [server/content/](file:///home/rd/Desktop/proba/server/content/).
2. **Respect des critères NBME 2024** :
   - Privilégier les formulations affirmatives directes (bannir *« Lequel n'est pas... »*).
   - Bannir les options génériques *« Toutes les réponses ci-dessus »* ou *« Aucune de ces réponses »*.
   - Proposer au moins 3 à 4 distracteurs techniques homogènes en longueur et en plausibilité.
   - Fournir une explication didactique complète dans le champ `exp`.
3. **Recompilation des pages** : exécuter `npm run courses -- <nom-du-cours>`.
4. **Mise à jour des manifestes de consolidation** : exécuter `node scripts/build_consolidation_manifests.js`.

### 2.3. Procédure d'Ajout d'une Migration de Base de Données
1. **Création du script** : créer le fichier `server/migrations/00X_nom_descriptif.sql` dans l'ordre strict de la séquence.
2. **Idempotence impérative** : utiliser exclusivement `CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS` ou des blocs conditionnels `DO $$ BEGIN ... END $$`.
3. **Validation de syntaxe et de séquence** : exécuter `node --test tests/migrations-syntax.test.js` et `tests/db-persistence.test.js`.

---

## 3. Trousse à Outils de Validation Continue

Avant toute mise en production ou fusion de branche, le mainteneur doit exécuter séquentiellement les contrôles automatisés suivants :

```bash
# 1. Contrôle de synchronisation des ateliers de code
npm run labs:check

# 2. Contrôle de cohérence des pages HTML générées
npm run courses:check

# 3. Banc de sécurité HTTP et anti-oracle QCM (17 vecteurs)
node --test tests/qcm-security.test.js

# 4. Banc de validation du runner et des suspensions
node --test tests/runner-remediation.test.js tests/grading-prelot3.test.js

# 5. Banc de tests des validateurs shell et oracles
node --test tests/refonte-b1-linux.test.js tests/refonte-probabilites.test.js tests/refonte-RD-RO.test.js

# 6. Banc d'intégrité global de la consolidation (critère de clôture)
node scripts/verifier_consolidation.js
```

Le succès complet de cette séquence garantit que la plateforme demeure protégée contre toute régression fonctionnelle, sécuritaire ou métrologique.
