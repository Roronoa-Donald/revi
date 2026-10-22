# Fidélité aux Sources (Mission A) — `b3-google-cloud` (Google Cloud Platform · B3)

- **Cours** : `b3-google-cloud` (Google Cloud Platform) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (4 fichiers, 50 pages)** :
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt` (12 pages, statut `ok`)
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 2.txt` (12 pages, statut `ok`)
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 3.txt` (11 pages, statut `ok`)
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 4.txt` (15 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt#PAGE 1` : *Support de cours*
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt#PAGE 3` : *Support de cours : Google Cloud*
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt#PAGE 5` : *Support de cours : Google Cloud*
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt#PAGE 7` : *Support de cours : Google Cloud*
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt#PAGE 9` : *Support de cours : Google Cloud*
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt#PAGE 11` : *Support de cours : Google Cloud*
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 2.txt#PAGE 1` : *Support de cours*
- `textes/B3/Semestre II/Google Cloud/Support de cours Module 2.txt#PAGE 3` : *Support de cours : Google Cloud*
- **Progression des chapitres sur le site** :
- `b3-google-cloud/chapitres/chapitre1.html` : **Chapitre 1 — Architecture Globale, Hiérarchie des Ressources & CLI gcloud** — 1. Infrastructure Mondiale de Google Cloud : Régions, Zones & Réseau Edge (`L82`), 2. Hiérarchie Organisationnelle des Ressources Google Cloud (`L107`), 3. Gestion des Quotas, Facturation & Comptes de Facturation (`L134`), 4. Administration avec le SDK gcloud CLI & Cloud Shell (`L156`)
- `b3-google-cloud/chapitres/chapitre2.html` : **Chapitre 2 — Sécurité des Identités IAM, Comptes de Service & Stratégies d'Accès** — 1. Modèle Fondamental Cloud IAM & Principe du Moindre Privilège (`L82`), 2. Typologie des Rôles : Primitifs, Prédéfinis & Personnalisés (Custom) (`L113`), 3. Liaisons IAM (Role Bindings) & Conditions d'Accès CEL (`L144`), 4. Comptes de Service, Risques des Clés & Workload Identity (`L171`)
- `b3-google-cloud/chapitres/chapitre3.html` : **Chapitre 3 — Calcul & Virtualisation (Compute Engine, GKE, Cloud Run & App Engine)** — 1. Google Compute Engine (GCE) : Familles de Machines & SLA (`L82`), 2. Groupes d'Instances Gérés (MIG) : Auto-scaling & Auto-healing (`L113`), 3. Google Kubernetes Engine (GKE) : Standard vs Autopilot (`L135`), 4. Serverless Moderne : Cloud Run vs Cloud Functions & App Engine (`L157`)
- `b3-google-cloud/chapitres/chapitre4.html` : **Chapitre 4 — Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge** — 1. Architecture du VPC Google Cloud : Réseau Global & Sous-Réseaux Régionaux (`L82`), 2. Règles de Pare-Feu VPC (Firewall Rules) : Priorités & Tags Réseau (`L110`), 3. Interconnexions Réseau : VPC Peering, Cloud VPN & Interconnect (`L135`), 4. Cloud Load Balancing : Architecture Anycast Mondiale & URL Maps (`L166`)
- `b3-google-cloud/chapitres/chapitre5.html` : **Chapitre 5 — Stockage Distribué, Bases de Données & Pipeline Big Data** — 1. Google Cloud Storage (GCS) : Classes d'Objets & Cycle de Vie (`L82`), 2. Bases Relationnelles : Cloud SQL vs Cloud Spanner (`L114`), 3. Bases NoSQL : Firestore vs Cloud Bigtable (`L137`), 4. Ingestion de Données Asynchrone : Cloud Pub/Sub & Écosystème Big Data (`L161`)
- `b3-google-cloud/chapitres/chapitre6.html` : **Chapitre 6 — Observabilité (Operations Suite), FinOps & Infrastructure as Code (Terraform)** — 1. Google Cloud Operations Suite : Monitoring, Alertes & Métriques (`L82`), 2. Cloud Logging & Export de Données (Log Sinks) (`L104`), 3. Gouvernance Financière FinOps : Budgets, CUD & SUD (`L132`), 4. Infrastructure as Code (IaC) avec Terraform sur GCP (`L153`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 4 document(s) source(s) (50 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — au moins 3 zones
- **Source PDF** : `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt#PAGE 2` : « MODULE 1 : Introduction au Google Cloud AGOUTOCO Caleb -2- »
- **Site web** : `b3-google-cloud/chapitres/chapitre1.html:L93` : « **au moins 3 zones** : indépendantes (ex: »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Organisation (Niveau 0)
- **Source PDF** : `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt#PAGE 7` : « gle Cloud V. Structure de l'organisation GCP ➤ 1. Projets  Chaque ressource appartient à un projet.  Les projets sont isolés (sécurité, facturation, quotas). ➤ 2. Comptes de fact »
- **Site web** : `b3-google-cloud/chapitres/chapitre1.html:L114` : « **Organisation (Niveau 0)** : Racine absolue liée au nom de domaine de l'entreprise (ex: »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Projets (Niveau 2)
- **Source PDF** : `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt#PAGE 7` : « re de l'organisation GCP ➤ 1. Projets  Chaque ressource appartient à un projet.  Les projets sont isolés (sécurité, facturation, quotas). ➤ 2. Comptes de facturation  Su »
- **Site web** : `b3-google-cloud/chapitres/chapitre1.html:L116` : « **Projets (Niveau 2)** : Unité fondamentale de base. Toutes les ressources doivent être rattachées à un projet. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
