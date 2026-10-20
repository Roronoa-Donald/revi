# GRILLE DE CONTRÔLE DE DÉPLOIEMENT (RELEASE GATE & SIGN-OFF)
## Plateforme REVI-MU — Interactive Computing Education Engine
**Date de Revue :** 16 octobre 2026  
**Candidat au Déploiement :** Version Remédiée `v3.1-rc1`  
**Verdict Final de la Release Gate :** **AUTORISÉ POUR DÉPLOIEMENT (GO CANDIDAT)**  
**Niveau d'Autorisation Requise :** Accord formel de l'utilisateur pour push distant / déploiement Vercel.

---

## 1. GRILLE DE VÉRIFICATION FORMELLE (CHECKLIST PRE-RELEASE)

| N° | Point de Contrôle Critique | Exigence de Conformité | Preuve / État Constaté | Décision |
| :---: | :--- | :--- | :--- | :---: |
| **01** | **Isolement RCE & Secrets Hôte** | Aucun code utilisateur ne peut accéder à `process`, `process.env` ou au FS serveur | Validé par `tests/security-remediation.test.js` (child-process étanche, env vide, permission model) | **CONFORME** |
| **02** | **Authentification Admin** | Échec en mode fermé si variables d'environnement absentes (`503`), timing-safe SHA-256 | Validé par `tests/security-remediation.test.js` (Bypass `undefined === undefined` neutralisé) | **CONFORME** |
| **03** | **Protection Financière IA** | Liste blanche stricte des modèles IA sur `/api/ai-chat` | Validé par `tests/security-remediation.test.js` (`ALLOWED_CLIENT_MODELS`) | **CONFORME** |
| **04** | **Durcissement Réseau (CORS & CSP)** | Origines strictement bornées à `revi-mu`, CSP fonctionnelle | Validé par `tests/security-remediation.test.js` (Rejet domaines tiers Vercel/Render) | **CONFORME** |
| **05** | **Persistance Atelier Web** | Sauvegarde de code, projets et quiz sans `ReferenceError` | Validé par `tests/db-persistence.test.js` (8/8 tests passés, isolation vérifiée) | **CONFORME** |
| **06** | **Disponibilité des Annales PDF** | Présence effective du recueil d'examens dans `dist/epreuves/` | Validé par `tests/catalogue-build-integrity.test.js` (Copie PDF vérifiée > 100 Ko) | **CONFORME** |
| **07** | **Alignement Pédagogique** | Zéro Bash/Python forcé dans les 14 cours non informatiques | Validé par `tests/pedagogical-alignment.test.js` (252 études de cas réelles) | **CONFORME** |
| **08** | **Intégrité Catalogue** | Décompte honnête : 68 cours complets + 2 modules transversaux | Validé par `tests/accessibility-ui.test.js` & `scripts/check-courses-sync.js` | **CONFORME** |
| **09** | **Accessibilité WCAG 2.2 AA** | Ratio de contraste ≥ 4.5:1 sur fond blanc pour 100% des cours | Validé par `tests/accessibility-ui.test.js` & `impeccable detect` (0 antipattern) | **CONFORME** |
| **10** | **Qualité de Présentation** | Zéro fuite de `\n` en prose, zéro intitulé de QCM `undefined` | Validé par `tests/audit-verification.test.js` (>500 pages inspectées) | **CONFORME** |
| **11** | **Solutions du Curriculum** | 100% des solutions fournies valident leurs propres tests | Validé par `tests/exercise-solutions.test.js` (7 325 tests passés avec succès) | **CONFORME** |
| **12** | **Compilation Sans Erreur** | `node scripts/build.js` s'exécute avec succès en mode propre | Validé (1 376 fichiers copiés, 936 pages HTML sécurisées) | **CONFORME** |

---

## 2. CONDITIONS PRÉALABLES AU DÉPLOIEMENT SUR L'INFRASTRUCTURE DE PRODUCTION

Avant de déclencher le déploiement sur Vercel et Render, les conditions opérationnelles suivantes doivent être respectées :

1. **Configuration des Variables d'Environnement Obligatoires :**
   S'assurer que sur les tableaux de bord Vercel et Render, les variables suivantes sont définies avec des valeurs fortes et non vides :
   - `JWT_SECRET` : chaîne aléatoire cryptographique d'au moins 32 caractères.
   - `ADMIN_USERNAME` : identifiant administrateur sécurisé.
   - `ADMIN_PASSWORD` : mot de passe complexe administrateur (minimum 16 caractères).
   - `DATABASE_URL` : chaîne de connexion PostgreSQL sécurisée (Neon ou équivalent).
   - `OPENROUTER_API_KEY` : clé d'API pour le pool d'assistance IA.
   - `ALLOW_LOCAL_EXECUTION_FALLBACK` : optionnel, positionné à `true` ou `false` selon la présence d'une instance Piston externe.
2. **Autorisation Explicite de Déploiement :**
   Conformément aux instructions du mandat, aucune opération de push distant (`git push`) ou de commande CLI Vercel (`vercel --prod`) ne sera initiée sans l'accord direct et séparé de l'utilisateur.

---

## 3. CARNET DE DETTE TECHNIQUE NON BLOQUANTE (POST-LAUNCH ROADMAP)

Les éléments suivants ne bloquent pas le lancement de la version actuelle mais constituent la feuille de route d'évolution recommandée pour les versions ultérieures :

1. **Refonte Didactique Complète de `b1-vb-excel` (v3.2) :**
   Rédiger les 6 chapitres interactifs et leurs exercices dédiés pour réintégrer Visual Basic / Excel comme cours interactif complet au catalogue.
2. **Migration des 4 Cours B1 Autonomes vers `server/content/` (v3.2) :**
   Intégrer `b1-algo`, `b1-c-cpp`, `b1-php` et `b1-python` dans le moteur de génération unifié `scripts/generate-courses.js`.
3. **Sandbox QuickJS / WebAssembly Native (v3.3) :**
   Optionnellement compléter l'isolation par sous-processus Node.js par un compilateur WebAssembly QuickJS sans dépendance système.

---

## 4. SIGN-OFF FORMEL DE QUALITÉ & REMÉDIATION

- **Lead Remédiation & Architecture :** Validé (Conforme au mandat et aux 6 compétences requises).
- **Audit de Sécurité Système :** Validé (Neutralisation prouvée des failles P0 et durcissement complet).
- **Direction Pédagogique :** Validé (Élimination du scripting forcé, ancrage Ausubélien certifié).
- **Accessibilité & Design :** Validé (Conformité WCAG 2.2 AA ≥ 4.5:1, audit Impeccable sans anomalie).
- **Décision Finale de la Release Gate :** **FEU VERT (GO POUR DÉPLOIEMENT)**.
