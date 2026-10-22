# Fidélité aux Sources (Mission A) — `b3-cloud-azure` (Cloud Azure · B3)

- **Cours** : `b3-cloud-azure` (Cloud Azure) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (3 fichiers, 32 pages)** :
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 1 .txt` (9 pages, statut `ok`)
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 2.txt` (9 pages, statut `ok`)
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 3.txt` (14 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 1 .txt#PAGE 1` : *Support de cours*
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 1 .txt#PAGE 2` : *Support de cours : Services Cloud AZURE*
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 1 .txt#PAGE 3` : *Support de cours : Services Cloud AZURE*
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 1 .txt#PAGE 4` : *Support de cours : Services Cloud AZURE*
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 1 .txt#PAGE 5` : *Support de cours : Services Cloud AZURE*
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 1 .txt#PAGE 6` : *Support de cours : Services Cloud AZURE*
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 2.txt#PAGE 1` : *Support de cours*
- `textes/B3/Semestre II/Cloud Azure/Support de cours Module 2.txt#PAGE 2` : *Support de cours : Service Cloud AZURE*
- **Progression des chapitres sur le site** :
- `b3-cloud-azure/chapitres/chapitre1.html` : **Chapitre 1 — Architecture Globale, Régions, Souscriptions & Hiérarchie ARM** — 1. Organisation Mondiale d'Azure : Datacenters, Régions, Zones de Disponibilité et Paires (`L82`), 2. Hiérarchie de Gestion Organisationnelle ARM (Azure Resource Manager) (`L104`), 3. Le Cloud Adoption Framework (CAF) : Conventions de Nommage, Tags & FinOps (`L117`), 4. Études de cas & applications pratiques (`L130`)
- `b3-cloud-azure/chapitres/chapitre2.html` : **Chapitre 2 — Identité Microsoft Entra ID (Azure AD), RBAC & Gouvernance** — 1. Identité Moderne avec Microsoft Entra ID & Managed Identities (`L82`), 2. Contrôle d'Accès Granulaire Azure RBAC (Role-Based Access Control) (`L104`), 3. Gouvernance avec Azure Policy, Resource Locks & Azure Key Vault (`L119`), 4. Études de cas & applications pratiques (`L143`)
- `b3-cloud-azure/chapitres/chapitre3.html` : **Chapitre 3 — Calcul & Virtualisation Azure (Azure Compute, VMSS & PaaS)** — 1. Machines Virtuelles Azure IaaS : Familles, Séries et Disques Managés (`L82`), 2. Haute Disponibilité : Availability Sets, Zones & Calcul de SLA Composite (`L106`), 3. Évolutivité avec VMSS et Déploiements Zéro-Downtime PaaS sur App Service (`L121`), 4. Études de cas & applications pratiques (`L144`)
- `b3-cloud-azure/chapitres/chapitre4.html` : **Chapitre 4 — Réseau Virtuel Azure (Azure Virtual Network - VNet & Sécurité)** — 1. Fondations SDN : Réseaux Virtuels Azure VNet et Adressage Réservé (`L82`), 2. Sécurité Périmétrique : Network Security Groups (NSG) & Azure Bastion (`L107`), 3. Interconnexion Réseau d'Entreprise : VNet Peering & Topologie Hub-and-Spoke (`L124`), 4. Études de cas & applications pratiques (`L147`)
- `b3-cloud-azure/chapitres/chapitre5.html` : **Chapitre 5 — Stockage Azure (Blob, Files, Disques) et Données Managées** — 1. Comptes de Stockage Azure (Storage Accounts) & Éventail de Services (`L82`), 2. Paliers d'Accès (Access Tiers), Cycle de Vie & Réplication des Données (`L104`), 3. Sécurité par Jetons SAS & Bases de Données Managées (SQL vs Cosmos DB) (`L121`), 4. Études de cas & applications pratiques (`L146`)
- `b3-cloud-azure/chapitres/chapitre6.html` : **Chapitre 6 — Surveillance, Gestion des Coûts & Automatisation (IaC & KQL)** — 1. Observabilité Globale avec Azure Monitor & Règles d'Alerte (`L83`), 2. Analyse Avancée des Journaux avec Log Analytics & KQL (Kusto Query Language) (`L104`), 3. Microsoft Defender for Cloud, FinOps Budgets & Infrastructure as Code (Bicep) (`L127`), 4. Études de cas & applications pratiques (`L150`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 3 document(s) source(s) (32 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Région Azure
- **Source PDF** : `textes/B3/Semestre II/Cloud Azure/Support de cours Module 1 .txt#PAGE 3` : « s de données, réseaux.  Régions : Emplacements géographiques des datacenters (ex : "West Europe", "East US"). AGOUTOCO Caleb -3- »
- **Site web** : `b3-cloud-azure/chapitres/chapitre1.html:L89` : « **Région Azure** : zone géographique délimitée abritant un ou plusieurs datacenters reliés par un réseau régional à faible latence (ex. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Paires Régionales (Regional Pairs)
- **Source PDF** : `textes/B3/Semestre II/Cloud Azure/Support de cours Module 2.txt#PAGE 3` : « able Storage Données NoSQL en paires clé/valeur Stockage léger, journaux, profils utilisateurs Queue Storage Messages FIFO entre composants applicatifs »
- **Site web** : `b3-cloud-azure/chapitres/chapitre1.html:L97` : « **Paires Régionales (Regional Pairs)** : chaque région Azure est couplée à une autre région de la même zone géographique, distante d'au moins 480 km (ex. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Mises à jour ordonnées
- **Source PDF** : `textes/B3/Semestre II/Cloud Azure/Support de cours Module 3.txt#PAGE 3` : « Rôle : définit les actions permises (lecteur, contributeur…)  Affectation : rôle attribué à un utilisateur/groupe sur une ressource AGOUTOCO Caleb -3- »
- **Site web** : `b3-cloud-azure/chapitres/chapitre1.html:L98` : « **Mises à jour ordonnées** : lors des opérations de maintenance de la plateforme Azure, Microsoft ne met jamais à jour les deux régions d'une même paire simultanément, garantissant la conti »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
