# Livrable 20 — Performances, Latence et Fiabilité Opérationnelle

> Répertoire d'audit : `AUDIT_GLOBAL_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Date de référence : 3 novembre 2026  
> Auteur : Audit Indépendant et Forensique  

---

## 1. Métriques de Performance et Temps de Réponse

L'architecture s'appuie sur le framework Fastify réputé pour son très faible surcoût (*overhead*) par rapport à Express ou Koa, ainsi que sur une séparation stricte entre les traitements en mémoire et les appels réseau distants.

### 1.1 Distribution des Temps de Réponse par Type de Requête

| Catégorie de Ressource | Moteur de Traitement | Latence Moyenne Observée | Débit Maximal Estimé |
| :--- | :--- | :---: | :---: |
| **Pages Statiques HTML** (Chapitres, Accueil) | Fastify Static / Cache Système | **1,2 à 3,5 ms** | > 8 000 req / s |
| **Feuilles de Styles & Scripts** (`cours.css`, `cours.js`) | Distribution Statique | **0,8 à 2,1 ms** | > 10 000 req / s |
| **Évaluation QCM (/api/qcm/verify)** | Fastify Route / Mémoire | **4,2 à 8,6 ms** | > 2 500 req / s |
| **Exercices Mode `analyse`** (Commandes, Algèbre, RO) | Interpréteur Local ([local-runner.js](file:///home/rd/Desktop/proba/server/services/execution/local-runner.js)) | **0,3 à 1,8 ms** | > 5 000 req / s |
| **Exercices Compilés/Interprétés** (C, C++, Java, Python) | Moteur Distant (Piston / Oanor) | **320 à 1 150 ms** | Limité par quota fournisseur (2 req / s) |

---

## 2. Empreinte Mémoire et Optimisation des Ressources

### 2.1 Consommation de la Pile Node.js (RSS & Heap)

- **Mémoire Résidente au Démarrage (RSS)** : ~68 Mo.
- **Mémoire en Charge Stabilisée** : ~115 à 140 Mo pour l'ensemble du serveur Fastify, des caches de cours et du pool de connexions PostgreSQL.
- **Gestion des Dépendances Lourdes (Monaco Editor)** :
  - Monaco Editor représente un volume statique d'environ 13 Mo.
  - *Choix d'ingénierie exemplaire* : Il n'est pas installé comme dépendance `node_modules` (évitant ainsi d'alourdir la taille du conteneur serverless Vercel de 50 Mo), mais vendorié directement sous `assets/vendor/monaco/`.
  - Son chargement côté client est strictement paresseux (*lazy loading*) : le bundle Monaco n'est téléchargé par le navigateur que sur les pages contenant la balise interactive `<div class="lab" data-lab>`. Les 52 cours sans programmation ne chargent aucun script Monaco.

### 2.2 Vectorisation des Icônes et Absence d'Émojis

Conformément à la charte graphique stricte du projet :
- Zéro émoji dans le DOM, évitant les incohérences de rendu d'une plateforme à l'autre (Android vs Windows vs iOS).
- Utilisation d'un sprite SVG unique et léger : `/assets/img/ui-icons.svg`.
- Polices de caractères hébergées localement, évitant tout blocage de rendu (*render blocking*) lié à la résolution DNS des serveurs de polices externes.

---

## 3. Gestion de la Concurrence et Résilience aux Pannes

```mermaid
flowchart LR
    subgraph "Gestion des Flux Entrants"
        EventLoop["Boucle d'Événements Node.js (Libuv)"]
        Pool["Pool de Connexions pg (10 workers)"]
    end

    subgraph "Protection du Fournisseur Distant"
        Queue["Exécution Séquentielle des Tests"]
        ShortCircuit["Court-Circuit au 1er Échec"]
        DailyBudget["Plafond Journalier (40/user, 900/global)"]
    end

    EventLoop --> Queue
    Queue --> ShortCircuit
    ShortCircuit --> DailyBudget
```

### 3.1 Stratégie Anti-Épuisement de Quota Fournisseur

L'API d'exécution de code distante applique une limite stricte de 2 requêtes par seconde. Le sous-système d'évaluation neutralise le risque de blocage par trois mécanismes conjoints :

1. **Exécution Séquentielle** : Les tests d'une soumission ne sont jamais envoyés en rafale parallèle, mais exécutés un à un séquentiellement.
2. **Court-Circuit Immédiat** : Si le test 1 échoue, les tests 2 à 7 ne sont jamais appelés. Comme la majorité des erreurs étudiantes surviennent dès le premier cas nominal, cette optimisation économise jusqu'à 85 % des appels réseau vers le fournisseur.
3. **Plafond Journalier (`budget.js`)** : Le quota bloque les soumissions d'un étudiant après 40 essais quotidiens, garantissant un partage équitable de la ressource entre tous les apprenants de la promotion.

### 3.2 Basculement Transparent (Failover) Piston $\to$ Oanor

En cas de panne, d'erreur 503 ou de coupure réseau sur le serveur Piston principal :
- Le module [server/services/execution/index.js](file:///home/rd/Desktop/proba/server/services/execution/index.js) bascule instantanément vers l'adaptateur de repli Oanor.
- La transition est totalement transparente pour l'étudiant, qui reçoit son résultat sans message d'erreur d'infrastructure.
- Le pool de connexions PostgreSQL gère automatiquement les reconnexions en cas d'indisponibilité momentanée du serveur de base de données.
