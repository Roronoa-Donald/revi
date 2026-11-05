# Livrable 10 — Registre des Anomalies Résiduelles et Limites du Système

> Répertoire : `REMEDIATION_COMPLETE/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Standard 4.1 AERA/APA/NCME (2014) sur la documentation des limites d'un système de mesure.

---

## 1. Démarche de Transparence Scientifique

Une évaluation pédagogique rigoureuse ne doit jamais prétendre à une perfection illusoire. Conformément aux standards de mesure en éducation, ce document consigne avec précision les anomalies résiduelles, les compromis d'ingénierie adoptés et les périmètres nécessitant une intervention humaine ou institutionnelle complémentaire.

Les éléments répertoriés sont classés selon cinq catégories d'impossibilité ou de choix délibéré.

---

## 2. Classification des Limites et Anomalies Restantes

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Cartographie des Situations Non Résolues             │
├────────────────────────────────────────────────┬───────────────────────┤
│ Catégorie                                      │ Volume / Périmètre    │
├────────────────────────────────────────────────┼───────────────────────┤
│ 1. Blocage technique d'infrastructure          │ 354 exercices suspendus│
│ 2. Ressource pédagogique manquante             │ 4 matières B2 / B3    │
│ 3. Validation humaine obligatoire              │ 184 QCM & Rédactions  │
│ 4. Risque non reproductible / Réseau           │ Latence API externe   │
│ 5. Fonctionnalité volontairement non automatisée│ 3 choix didactiques   │
└────────────────────────────────────────────────┴───────────────────────┘
```

---

### 2.1. Blocages Techniques d'Infrastructure

#### A. Environnements Conteneurisés Dédiés (Docker B2, Linux Avancé B3, GitHub B3)
- **Nature du blocage :** Les exercices d'administration système avancée nécessitent la manipulation réelle de conteneurs (`docker run`, `docker-compose`), de démons système (`systemd`) ou de dépôts distants multi-utilisateurs.
- **Raison technique :** L'hébergement serverless ou conteneurisé standard (Render / Vercel) ne fournit ni démon Docker imbriqué (*Docker-in-Docker*), ni privilèges root (`CAP_SYS_ADMIN`), ni réseau virtuel isolé pour chaque élève.
- **Traitement appliqué :** Maintien sous politique *fail-closed* dans `server/exercises/grading-policy.js` (354 exercices maintenus en statut entraînement non noté, avec message d'information transparent).
- **Plan de résolution futur :** Déploiement d'un cluster d'évaluation éphémère sécurisé par micro-machines virtuelles (ex: Firecracker ou gVisor) doté de quotas stricts.

#### B. Limite de Débit des Moteurs d'Exécution Externes (Piston / Oanor)
- **Nature du blocage :** Les fournisseurs tiers d'exécution de code imposent une limite stricte de 2 requêtes par seconde sur les offres standard.
- **Traitement appliqué :** Le runner exécute les tests cachés séquentiellement et court-circuite dès le premier échec (`short-circuit evaluation`), protégeant l'apprenant contre les erreurs HTTP 429 au détriment d'un rapport exhaustif de tous les tests en cas de plantage initial.

---

### 2.2. Ressources Pédagogiques Manquantes dans les Sources

#### A. Disciplines Sans Annales Officielles Conservées
- **Matières concernées :** *Infographie B2*, *Veille Technologique B3*, *Document Technique B3*, *Management de Projet B1*.
- **Constat :** Contrairement à Linux, aux Probabilités et à la Recherche Opérationnelle dont les TD et examens complets figurent dans `/home/rd/Desktop/proba`, ces disciplines ne disposent pas d'énoncés d'examens écrits formels dans les archives d'origine.
- **Traitement appliqué :** Les exercices existants ont été conservés sous forme de cas pratiques d'entraînement indicatifs sans prétention de conformité d'examen officiel.

---

### 2.3. Situations Nécessitant une Validation Humaine Obligatoire

#### A. Rédaction Libre et Compétences Argumentatives
- **Matières concernées :** *Français Professionnel B1*, *Droit Informatique B1 & B2*, *Méthodes Agiles B3*.
- **Nature de la limite :** La rédaction d'une note de cadrage, d'une lettre de motivation ou la qualification d'un préjudice juridique relève du syllogisme et de la nuance d'argumentation (DOK 3 et 4).
- **Raison du refus de l'automatisation intégrale :** Évaluer un texte argumentatif par une simple comparaison de chaînes ou des expressions rationnelles favorise le plagiat de mots-clés au détriment de la pensée critique.
- **Recommandation :** Réserver ces évaluations à un double regard (auto-évaluation guidée par une grille critériée + évaluation par les pairs ou par l'enseignant tuteur).

#### B. Revue Didactique Fine sur 184 QCM Détectés
- **Nature :** 184 questions présentent une subtilité de vocabulaire ou un ancrage réglementaire spécifique (ex: référence au Code pénal togolais vs droit européen RGPD) nécessitant un arbitrage définitif par le collège des enseignants responsables du cursus.

---

### 2.4. Risques Non Reproductibles et Facteurs Réseau

#### A. Latence et Disponibilité du Tuteur IA (`/api/ai-chat` / `/api/code-help`)
- **Nature du risque :** L'assistant pédagogique s'appuie sur le proxy OpenRouter. En cas de congestion réseau ou de dégradation temporaire du modèle distant (`deepseek/deepseek-chat`), les explications peuvent accuser un temps de latence supérieur à 5 secondes.
- **Mesure de sauvegarde :** L'interface affiche un état de chargement élégant et un bouton de réessai sans jamais bloquer l'accès aux cours ni à la consultation des mémentos.

---

### 2.5. Fonctionnalités Volontairement Non Automatisées (Choix de Conception)

1. **Aucune exécution automatique à la frappe de touche (*Run-on-keystroke*) :**
   - *Justification pédagogique et technique :* Évite la surcharge cognitive de l'étudiant bombardé d'erreurs pendant sa rédaction, préserve les quotas d'exécution partagés et encourage la relecture réfléchie avant la soumission formelle.
2. **Aucune délivrance de diplôme ou d'attestation entièrement désintermédiée :**
   - *Justification éthique :* La plateforme prépare et entraîne les étudiants de B1, B2 et B3 ; la validation formelle des ECTS reste sous le contrôle exclusif du jury universitaire et de l'administration académique.
3. **Maintien strict de la règle « Zéro Emoji » :**
   - *Justification ergonomique et accessibilité :* Exclusion volontaire de tout caractère pictographique fantaisiste pour préserver la clarté et la dignité universitaire de la plateforme.
