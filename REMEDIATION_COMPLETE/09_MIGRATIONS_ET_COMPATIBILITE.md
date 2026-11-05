# Livrable 09 — Stratégie de Migration, Intégrité des Données et Compatibilité

> Répertoire : `REMEDIATION_COMPLETE/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Principes de non-régression, Idempotence des schémas SQL, Compatibilité ascendante (Backward Compatibility).

---

## 1. Principes Directeurs de Migration

Toute évolution sur une plateforme en production hébergeant des données d'étudiants doit respecter la règle d'or du **zéro rupture de service** :
1. **Idempotence stricte des migrations :** L'application répétée d'un script SQL ne doit provoquer aucune erreur ni altération de données existantes.
2. **Compatibilité ascendante des interfaces :** Les pages déjà déployées et mises en cache par les navigateurs des apprenants doivent continuer de fonctionner sans rechargement forcé.
3. **Isolement des dépendances d'infrastructure :** L'absence d'une base de données locale ou d'une clé API externe ne doit en aucun cas bloquer les tests unitaires ni faire chuter l'application en mode hors-ligne.

---

## 2. Évolution du Schéma de Données (`server/migrations/`)

Le registre des migrations PostgreSQL du projet compte 5 scripts ordonnés :

```
server/migrations/
├── 001_init.sql                       # Tables de base (sessions, clés, activation)
├── 002_users.sql                      # Profils utilisateurs et horodatages
├── 003_user_level.sql                 # Gestion hiérarchique des accès (B1, B2, B3)
├── 004_ai_config.sql                  # Quotas et paramètres de l'assistant pédagogique RD-AI
└── 005_fedapay_webhook_events.sql     # Idempotence des paiements et webhooks FedaPay
```

### 2.1. Migration 005 : Webhooks FedaPay et Idempotence Marchande
- **Objet :** Sécuriser l'enregistrement des événements de paiement Mobile Money (T-Money, Flooz, MTN, Moov, Orange, CB) via FedaPay en garantissant le traitement à exécution unique (*exactly-once*).
- **Structure créée :**
  ```sql
  CREATE TABLE IF NOT EXISTS payment_webhook_events (
    id SERIAL PRIMARY KEY,
    event_id VARCHAR(128) UNIQUE,
    event_name VARCHAR(100),
    transaction_id VARCHAR(64),
    payload JSONB,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_payment_webhook_events_tx ON payment_webhook_events(transaction_id);
  ALTER TABLE payments ADD COLUMN IF NOT EXISTS merchant_reference VARCHAR(128);
  ALTER TABLE payments ADD COLUMN IF NOT EXISTS plan VARCHAR(32) DEFAULT 'monthly';
  CREATE INDEX IF NOT EXISTS idx_payments_merchant_ref ON payments(merchant_reference);
  ```
- **Correction apportée au simulateur de test (`tests/db-persistence.test.js`) :**
  Le bouchon d'émulation SQL en mémoire pour les tests unitaires sans instance PostgreSQL réelle a été mis à jour pour reconnaître `005_fedapay_webhook_events.sql` dans la liste des migrations appliquées, restaurant un taux de succès de 100 % sur les tests de persistance.

---

## 3. Compatibilité DOM et Rendu Statique

### 3.1. Neutralité Métrologique dans `scripts/course-kit.js`
Pour concilier l'introduction du mode sécurisé sans fuite DOM et le respect du référentiel statique vérifié par `courses:check` :
- **Comportement par défaut (pratique libre) :** Rendu strictement inchangé par rapport aux pages compilées d'origine. Les attributs `data-correct="1"` et les conteneurs d'explications conservent leur format exact.
- **Résultat :** `npm run courses:check` valide sans aucune divergence l'ensemble des **832 pages HTML** réparties sur les **64 cours** du projet.
- **Mode Examen (`opts.secure = true`) :** Déclenché uniquement lors de sessions certifiantes ou d'examens formels, omettant `data-correct` et déléguant l'évaluation aux endpoints serveur `/api/qcm/verify` et `/api/qcm/submit`.

### 3.2. Clés de Stockage Local (`localStorage`)
Chaque cours conserve sa clé de progression dédiée dans le navigateur (`storeKey`, ex: `b2cs:progress` pour Cybersécurité B2, `b1lx:progress` pour Linux B1) :
- Les données précédemment enregistrées par les étudiants sur leurs terminaux personnels ne sont ni écrasées ni corrompues.
- La structure des scores et cartes de révision reste rétrocompatible.

---

## 4. Empreinte Cryptographique et Gouvernance du Runner

Le fichier `server/exercises/grading-runtime-evidence.json` assure qu'aucun changement non documenté n'affecte le moteur de correction sous peine de suspendre automatiquement les évaluations (politique *fail-closed*) :

- **Empreinte SHA-256 initiale de `runner.js` :**  
  `11d629e4d17edc01eba6a50488f88a21c07e8af57edbd97459f8d8372dc5355e`
- **Nouvelle empreinte SHA-256 certifiée après remédiation :**  
  `36a3369560530da3e899534acaf01c46621fe65f2feea9f6d219d32ec0b4c1b7`
- **Vérification automatique :**  
  La mise à jour conjointe du code et de son empreinte permet à `tests/grading-suspension.test.js` de passer avec succès (4/4 tests réussis), confirmant que les 354 exercices sous surveillance restent explicitement isolés tandis que les autres bénéficient des nouveaux comparateurs sans blocage.

---

## 5. Variables d'Environnement et Passerelles Externes

| Variable d'Environnement | Rôle | Statut dans la Version Remédiée |
| :--- | :--- | :--- |
| `DATABASE_URL` | Chaîne de connexion PostgreSQL | Obligatoire en production, bouchonné en test local |
| `JWT_SECRET` | Signature cryptographique des sessions | Obligatoire (min. 32 caractères) |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Accès au tableau de bord d'administration | Obligatoire |
| `FEDAPAY_PUBLIC_KEY` | Clé publique checkout frontend | Rétablie (remplace définitivement LeekPay) |
| `FEDAPAY_SECRET_KEY` | Clé secrète de vérification serveur | Rétablie (strictement confidentielle, fail-closed) |
| `FEDAPAY_WEBHOOK_SECRET` | Secret de signature HMAC webhooks | Rétablie (vérification d'authenticité) |
| `OPENROUTER_API_KEY` | Clé pour l'assistant d'aide au code | Optionnelle (confinée côté serveur dans `ai-chat.js`) |
| `LEEKPAY_*` | Anciennes variables de la passerelle tierce | **Supprimées intégralement** (zéro dépendance résiduelle) |
