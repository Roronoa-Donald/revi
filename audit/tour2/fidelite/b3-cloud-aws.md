# Fidélité aux Sources (Mission A) — `b3-cloud-aws` (Services Cloud AWS · B3)

- **Cours** : `b3-cloud-aws` (Services Cloud AWS) — Niveau **B3** (6 chapitres)
- **Documents sources rattachés (2 fichiers, 35 pages)** :
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt` (19 pages, statut `ok`)
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 2.doc.txt` (16 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt#PAGE 1` : *Support de cours*
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt#PAGE 4` : *Support de cours : Services Cloud AWS*
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt#PAGE 7` : *Support de cours : Services Cloud AWS*
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt#PAGE 10` : *Support de cours : Services Cloud AWS*
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt#PAGE 13` : *Support de cours : Services Cloud AWS*
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt#PAGE 16` : *Support de cours : Services Cloud AWS*
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 2.doc.txt#PAGE 1` : *Support de cours*
- `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 2.doc.txt#PAGE 3` : *Support de cours : Services Cloud AWS*
- **Progression des chapitres sur le site** :
- `b3-cloud-aws/chapitres/chapitre1.html` : **Chapitre 1 — Fondements d'AWS, Infrastructure Globale & Modèle de Responsabilité Partagée** — 1. Le Cloud Computing & les Avantages Stratégiques d'AWS (`L80`), 2. Infrastructure Mondiale : Régions, Availability Zones & Edge Locations (`L105`), 3. Le Modèle de Responsabilité Partagée (Shared Responsibility Model) (`L125`), 4. Outils d'Accès & Administration : Console Web, AWS CLI v2 & CloudShell (`L153`)
- `b3-cloud-aws/chapitres/chapitre2.html` : **Chapitre 2 — Sécurité des Identités IAM, Politiques JSON & Gouvernance Multi-Comptes** — 1. Les Fondements d'AWS IAM : Utilisateurs, Groupes & Rôles (`L80`), 2. Structure & Syntaxe des Politiques d'Autorisation JSON (`L101`), 3. Moteur d'Évaluation des Politiques : La Règle d'Or d'AWS (`L132`), 4. Cycle de Vie des Clés d'Accès & Sécurité des Identifiants (`L154`)
- `b3-cloud-aws/chapitres/chapitre3.html` : **Chapitre 3 — Calcul & Conteneurs — EC2, EBS, ELB, Auto Scaling & Fargate** — 1. Amazon EC2 : Familles de Calcul & Modèles d'Achat (`L80`), 2. Stockage Bloc Amazon EBS (Elastic Block Store) & Snapshots (`L104`), 3. Elastic Load Balancing (ELB) : ALB, NLB & Health Checks (`L125`), 4. Auto Scaling Groups (ASG) & Équilibre Multi-AZ (`L146`)
- `b3-cloud-aws/chapitres/chapitre4.html` : **Chapitre 4 — Réseau Avancé — Amazon VPC, Sous-réseaux, Routage & Pare-feux (SG / NACL)** — 1. Amazon VPC : Blocs CIDR & Sous-réseaux Multi-AZ (`L80`), 2. Routage VPC : Internet Gateway, NAT Gateway & Tables de Routage (`L105`), 3. Sécurité Réseau : Security Groups (Stateful) vs Network ACLs (Stateless) (`L126`), 4. Interconnexion & Passerelles Privées : Peering, Transit Gateway & Endpoints (`L151`)
- `b3-cloud-aws/chapitres/chapitre5.html` : **Chapitre 5 — Stockage & Données — Amazon S3, EFS, RDS & NoSQL DynamoDB** — 1. Amazon S3 : Stockage Objet & Classes de Stockage (`L80`), 2. Sécurité S3 : Block Public Access, Versioning & Chiffrement KMS (`L104`), 3. Système de Fichiers Partagé Amazon EFS (Elastic File System) (`L128`), 4. Bases Relationnelles Amazon RDS & Amazon Aurora (`L137`)
- `b3-cloud-aws/chapitres/chapitre6.html` : **Chapitre 6 — Serverless, Observabilité, Supervision & Automatisation (Lambda, CloudWatch, SQS, SNS)** — 1. AWS Lambda & l'Architecture Serverless Événementielle (`L80`), 2. Découplage Asynchrone : Amazon SQS & Amazon SNS (`L103`), 3. Observabilité & Surveillance : Amazon CloudWatch (`L127`), 4. Traçabilité & Audit des Accès : AWS CloudTrail (`L147`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 2 document(s) source(s) (35 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Fin de la conjecture des capacités
- **Source PDF** : `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt#PAGE 4` : « : Services Cloud AWS 1.1 Définition de AWS Amazon Web Services (AWS) est une plateforme de cloud computing qui fournit des services informatiques à la demande via Internet. Elle »
- **Site web** : `b3-cloud-aws/chapitres/chapitre1.html:L89` : « **Fin de la conjecture des capacités** : élasticité automatique à la hausse comme à la baisse selon la demande réelle. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — Déploiement mondial en quelques minutes
- **Source PDF** : `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt#PAGE 9` : « ur  Elastic Beanstalk → déploiement automatique Cas pratique Héberger un site web sur EC2 1.4.2 Services de stockage (Storage) Permettent de stocker les données Exemples  S3 »
- **Site web** : `b3-cloud-aws/chapitres/chapitre1.html:L92` : « **Déploiement mondial en quelques minutes** : accès immédiat à des dizaines de régions géographiques sans délai. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Amazon CloudFront
- **Source PDF** : `textes/B3/Semestre II/Services Cloud AWS/Support de cours Module 1.txt#PAGE 4` : « AWS 1.1 Définition de AWS Amazon Web Services (AWS) est une plateforme de cloud computing qui fournit des services informatiques à la demande via Internet. Elle permet aux entrepris »
- **Site web** : `b3-cloud-aws/chapitres/chapitre1.html:L121` : « **Amazon CloudFront** : et accélérer les requêtes DNS via »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `analyse`.
