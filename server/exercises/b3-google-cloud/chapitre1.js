'use strict';

module.exports = [
  {
    "id": "gcp3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "La hiérarchie de ressources de la scale-up Verdalia",
    "exampleTitle": "Exemple résolu — l'organisation du cabinet Odonata",
    "goal": "Situer chaque élément d'une organisation Google Cloud dans la hiérarchie des ressources et valider un identifiant de projet.",
    "brief": "<p><strong>Énoncé.</strong> Verdalia, scale-up lyonnaise de cosmétiques en ligne, organise son domaine Google Cloud. L'entreprise a créé l'organisation <code>verdalia.com</code> (liée à son domaine Cloud Identity), puis deux dossiers : « Production » et « Data-Lab ». Chaque dossier contient ses projets, par exemple <code>verdalia-prod-app</code> et <code>verdalia-lab-data</code>, qui hébergent eux-mêmes des machines virtuelles, des buckets et des tables BigQuery.</p><p>Rappel du cours : la hiérarchie des ressources s'étend de l'organisation (niveau 0) vers les dossiers (niveau 1), les projets (niveau 2) puis les ressources (niveau 3) ; les stratégies IAM accordées à un niveau sont héritées par tous les niveaux inférieurs.</p><p>Pour son prochain projet de production, le service informatique propose l'identifiant de projet <code>Verdalia_Prod</code>.</p><ol><li>Quel élément se trouve à la racine de la hiérarchie des ressources de Verdalia ?</li><li>À quel niveau de la hiérarchie se situe un projet ?</li><li>Quel est le parent direct d'un projet dans cette hiérarchie ?</li><li>L'identifiant proposé <code>Verdalia_Prod</code> respecte-t-il les règles Google Cloud (minuscules, chiffres et tirets uniquement) ?</li><li>Quelle entité de la hiérarchie rassemble la facturation, les quotas et les autorisations IAM des ressources qu'elle contient ?</li></ol>",
    "starter": "# Exercice — La hiérarchie de ressources de la scale-up Verdalia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le nombre seul. Questions 1, 3 et 5 : réponses courtes. Question 4 : oui ou non.\n\n[Question 1 — Élément à la racine de la hiérarchie]\nA_COMPLETER\n\n[Question 2 — Niveau hiérarchique d'un projet]\nA_COMPLETER\n\n[Question 3 — Parent direct d'un projet]\nA_COMPLETER\n\n[Question 4 — Validité de l'identifiant Verdalia_Prod]\nA_COMPLETER\n\n[Question 5 — Entité rassemblant facturation, quotas et IAM]\nA_COMPLETER\n",
    "hints": [
      "La hiérarchie descend de la racine vers les ressources : organisation, puis dossiers, puis projets, puis ressources ; comptez les niveaux en partant de 0 pour l'organisation.",
      "Un identifiant de projet Google Cloud n'accepte que des minuscules, des chiffres et des tirets : toute majuscule ou tout underscore le rend invalide.",
      "1. La racine représente l'entreprise. 2. L'organisation est le niveau 0, les dossiers le niveau 1. 3. Un projet est forcément créé dans un dossier (ou directement dans l'organisation). 4. Cherchez les caractères interdits dans Verdalia_Prod. 5. C'est l'unité d'allocation des ressources qui porte facturation, quotas et IAM."
    ],
    "examples": [
      {
        "stdin": "Le cabinet Odonata organise son domaine Google Cloud : l'organisation odonata-data.com\ncontient les dossiers « Études » et « Production », qui contiennent chacun des projets\n(odonata-etudes-fr, odonata-prod-api), lesquels hébergent VM et buckets.\nOn propose l'identifiant Odonata_Lab pour un nouveau projet.\n\n1) La racine de la hiérarchie est l'organisation odonata-data.com.\n2) Un projet se situe au niveau 2.\n3) Le parent direct d'un projet est le dossier.\n4) Odonata_Lab est invalide : majuscules et underscore interdits.\n5) Le projet rassemble facturation, quotas et IAM.",
        "expected": "racine : l'organisation — projet : niveau 2 — parent : le dossier — Odonata_Lab invalide — facturation, quotas et IAM dans le projet",
        "note": "L'identifiant de projet est unique au monde et immuable : seul le libellé d'affichage peut être modifié après création."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Élément à la racine de la hiérarchie",
        "stdin": "q:1",
        "expected": "l'organisation||l’organisation||organisation"
      },
      {
        "label": "Question 2 — Niveau hiérarchique d'un projet",
        "stdin": "q:2",
        "expected": "2||niveau 2||deux"
      },
      {
        "label": "Question 3 — Parent direct d'un projet",
        "stdin": "q:3",
        "expected": "le dossier||dossier||un dossier"
      },
      {
        "label": "Question 4 — Validité de l'identifiant Verdalia_Prod",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Entité rassemblant facturation, quotas et IAM",
        "stdin": "q:5",
        "expected": "le projet||projet"
      }
    ],
    "solution": "[Question 1 — Élément à la racine de la hiérarchie]\nl'organisation\n\n[Question 2 — Niveau hiérarchique d'un projet]\n2\n\n[Question 3 — Parent direct d'un projet]\nle dossier\n\n[Question 4 — Validité de l'identifiant Verdalia_Prod]\nnon\n\n[Question 5 — Entité rassemblant facturation, quotas et IAM]\nle projet",
    "takeaway": "1) La racine de la hiérarchie est l'organisation verdalia.com, liée au domaine Cloud Identity de l'entreprise.\n2) L'organisation est le niveau 0 et les dossiers le niveau 1 : le projet se situe au niveau 2.\n3) Le parent direct d'un projet est le dossier qui le contient (ici « Production » ou « Data-Lab »).\n4) Non : l'identifiant Verdalia_Prod contient une majuscule et un underscore, tous deux interdits ; seuls les minuscules, les chiffres et les tirets sont acceptés (6 à 30 caractères, en commençant par une lettre).\n5) C'est le projet : chaque ressource appartient à un projet qui porte sa facturation, ses quotas et ses autorisations IAM.\nContrôle : les stratégies IAM posées sur l'organisation ou sur un dossier sont héritées par les projets ; aucune ressource ne se crée en dehors d'un projet."
  },
  {
    "id": "gcp3-c1-e2",
    "chapter": 1,
    "title": "Sélecteur de Région et Répartition Multi-Zones GCP",
    "level": "n2",
    "language": "analyse",
    "goal": "Répartir fictivement des instances entre zones et distinguer répartition et résilience démontrée.",
    "brief": "<p>Utilisez ce référentiel figé pour la grille : il ne constitue ni un inventaire officiel à jour ni une mesure actuelle de l’empreinte carbone.<br>\n- <code>europe-west1</code> : Belgique, zones a, b, c, low_carbon=YES<br>\n- <code>europe-west9</code> : Paris, zones a, b, c, low_carbon=YES<br>\n- <code>us-central1</code> : Iowa, zones a, b, c, f, low_carbon=NO<br>\n- <code>asia-east1</code> : Taïwan, zones a, b, c, low_carbon=NO<br><br>\n<code>REGION_INFO region=&lt;nom&gt;</code> retourne <code>REGION: name=&lt;nom&gt; location=&lt;lieu&gt; zones_count=&lt;N&gt; low_carbon=&lt;YES|NO&gt;</code>, ou <code>REGION: name=&lt;nom&gt; status=UNKNOWN</code> si elle est absente du référentiel.<br><br>\n<code>MULTI_ZONE_DEPLOY region=&lt;nom&gt; instance_count=&lt;N&gt;</code> simule une répartition dans une région connue. Si N est inférieur à 1, retourner <code>DEPLOY: region=&lt;nom&gt; total=&lt;N&gt; status=INVALID_INSTANCE_COUNT</code>.<br>\nSinon, répartir les instances sur les zones dans l’ordre donné : division entière, puis reste attribué de gauche à droite. Afficher chaque zone, y compris celles qui reçoivent zéro instance, et le statut :<br>\n- <code>SINGLE_ZONE_NO_REDUNDANCY</code> si une seule zone reçoit des instances ;<br>\n- <code>MULTI_ZONE_NO_GUARANTEE</code> si plusieurs zones en reçoivent.<br>\nFormat : <code>DEPLOY: region=&lt;nom&gt; total=&lt;N&gt; allocation=&lt;zone1:n1,zone2:n2,...&gt; status=&lt;statut&gt;</code>.<br><br>\nLa répartition ne crée aucune ressource et ne démontre pas la haute disponibilité. Il faut notamment vérifier capacité et quotas, dépendances, contrôles de santé, charge et basculement. Voir les <a href=\"https://docs.cloud.google.com/architecture/framework/reliability\">principes de conception pour la disponibilité</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c1-e2) — Sélecteur de Région et Répartition Multi-Zones GCP\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Répartition dans quatre zones]\n# Données : MULTI_ZONE_DEPLOY region=us-central1 instance_count=6\nA_COMPLETER\n\n[Cas 2 — Région absente du référentiel]\n# Données : REGION_INFO region=mars-west1\nA_COMPLETER\n\n[Cas 3 — Une seule instance ne crée pas de redondance]\n# Données : MULTI_ZONE_DEPLOY region=europe-west9 instance_count=1\nA_COMPLETER\n\n[Cas 4 — Zéro instance est invalide]\n# Données : MULTI_ZONE_DEPLOY region=europe-west9 instance_count=0\nA_COMPLETER\n\n[Cas 5 — Deux zones occupées ne garantissent pas la résilience]\n# Données : MULTI_ZONE_DEPLOY region=europe-west9 instance_count=2\nA_COMPLETER\n\n[Cas 6 — Répartition exacte sur trois zones]\n# Données : MULTI_ZONE_DEPLOY region=europe-west1 instance_count=9\nA_COMPLETER\n\n[Cas 7 — Nombre négatif invalide]\n# Données : MULTI_ZONE_DEPLOY region=europe-west1 instance_count=-2\nA_COMPLETER\n",
    "hints": [
      "Pour N instances et M zones, calculez le quotient et le reste ; les premières zones reçoivent une instance supplémentaire.",
      "Comptez les zones réellement occupées et ne déduisez jamais un basculement fonctionnel de la seule répartition.",
      "Répartissez équitablement les instances en round-robin sur les zones de la région GCP choisie (ex. europe-west9-a/b/c) et indiquez que la tolérance aux pannes dépend du déploiement."
    ],
    "examples": [
      {
        "stdin": "REGION_INFO region=europe-west9\nMULTI_ZONE_DEPLOY region=europe-west9 instance_count=5",
        "expected": "REGION: name=europe-west9 location=Paris zones_count=3 low_carbon=YES\nDEPLOY: region=europe-west9 total=5 allocation=europe-west9-a:2,europe-west9-b:2,europe-west9-c:1 status=MULTI_ZONE_NO_GUARANTEE",
        "note": "Les cinq instances sont réparties sur trois zones ; la résilience reste à vérifier séparément."
      }
    ],
    "tests": [
      {
        "label": "Répartition dans quatre zones",
        "stdin": "cas:1",
        "expected": "DEPLOY: region=us-central1 total=6 allocation=us-central1-a:2,us-central1-b:2,us-central1-c:1,us-central1-f:1 status=MULTI_ZONE_NO_GUARANTEE"
      },
      {
        "label": "Région absente du référentiel",
        "stdin": "cas:2",
        "expected": "REGION: name=mars-west1 status=UNKNOWN"
      },
      {
        "label": "Une seule instance ne crée pas de redondance",
        "stdin": "cas:3",
        "expected": "DEPLOY: region=europe-west9 total=1 allocation=europe-west9-a:1,europe-west9-b:0,europe-west9-c:0 status=SINGLE_ZONE_NO_REDUNDANCY"
      },
      {
        "label": "Zéro instance est invalide",
        "stdin": "cas:4",
        "expected": "DEPLOY: region=europe-west9 total=0 status=INVALID_INSTANCE_COUNT"
      },
      {
        "label": "Deux zones occupées ne garantissent pas la résilience",
        "stdin": "cas:5",
        "expected": "DEPLOY: region=europe-west9 total=2 allocation=europe-west9-a:1,europe-west9-b:1,europe-west9-c:0 status=MULTI_ZONE_NO_GUARANTEE"
      },
      {
        "label": "Répartition exacte sur trois zones",
        "stdin": "cas:6",
        "expected": "DEPLOY: region=europe-west1 total=9 allocation=europe-west1-a:3,europe-west1-b:3,europe-west1-c:3 status=MULTI_ZONE_NO_GUARANTEE"
      },
      {
        "label": "Nombre négatif invalide",
        "stdin": "cas:7",
        "expected": "DEPLOY: region=europe-west1 total=-2 status=INVALID_INSTANCE_COUNT"
      }
    ],
    "solution": "[Exemple]\nREGION: name=europe-west9 location=Paris zones_count=3 low_carbon=YES\nDEPLOY: region=europe-west9 total=5 allocation=europe-west9-a:2,europe-west9-b:2,europe-west9-c:1 status=MULTI_ZONE_NO_GUARANTEE\n\n[Cas 1 — Répartition dans quatre zones]\nDEPLOY: region=us-central1 total=6 allocation=us-central1-a:2,us-central1-b:2,us-central1-c:1,us-central1-f:1 status=MULTI_ZONE_NO_GUARANTEE\n\n[Cas 2 — Région absente du référentiel]\nREGION: name=mars-west1 status=UNKNOWN\n\n[Cas 3 — Une seule instance ne crée pas de redondance]\nDEPLOY: region=europe-west9 total=1 allocation=europe-west9-a:1,europe-west9-b:0,europe-west9-c:0 status=SINGLE_ZONE_NO_REDUNDANCY\n\n[Cas 4 — Zéro instance est invalide]\nDEPLOY: region=europe-west9 total=0 status=INVALID_INSTANCE_COUNT\n\n[Cas 5 — Deux zones occupées ne garantissent pas la résilience]\nDEPLOY: region=europe-west9 total=2 allocation=europe-west9-a:1,europe-west9-b:1,europe-west9-c:0 status=MULTI_ZONE_NO_GUARANTEE\n\n[Cas 6 — Répartition exacte sur trois zones]\nDEPLOY: region=europe-west1 total=9 allocation=europe-west1-a:3,europe-west1-b:3,europe-west1-c:3 status=MULTI_ZONE_NO_GUARANTEE\n\n[Cas 7 — Nombre négatif invalide]\nDEPLOY: region=europe-west1 total=-2 status=INVALID_INSTANCE_COUNT",
    "takeaway": "À retenir : Répartir fictivement des instances entre zones et distinguer répartition et résilience démontrée.\nRepère : Les cinq instances sont réparties sur trois zones ; la résilience reste à vérifier séparément."
  },
  {
    "id": "gcp3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Quotas, facturation et configurations gcloud de Norvelia",
    "exampleTitle": "Exemple résolu — la mise en place de Studio Kiwi",
    "goal": "Raisonner sur les quotas par projet, la liaison du compte de facturation et les configurations gcloud.",
    "brief": "<p><strong>Énoncé.</strong> Norvelia, assurance en ligne, prépare la montée en charge de son projet <code>norvelia-prod-euw9</code>. Le quota Compute Engine de ce projet, pour la région europe-west9, est fixé à <strong>20 vCPU</strong>. La flotte actuelle compte <strong>3 machines e2-standard-4</strong> (4 vCPU chacune) et <strong>1 machine e2-standard-8</strong> (8 vCPU). L'équipe veut ajouter une machine supplémentaire de type e2-standard-4.</p><p>Par ailleurs, le projet <code>norvelia-dev-euw9</code> n'est lié à aucun compte de facturation, et l'ingénieur cloud travaille avec deux configurations gcloud : <code>dev-norvelia</code> (active) et <code>prod-norvelia</code>.</p><ol><li>Combien de vCPU la flotte actuelle consomme-t-elle ?</li><li>Combien de vCPU la flotte consommerait-elle avec la machine supplémentaire ?</li><li>La création de la machine supplémentaire est refusée : quel mécanisme Google Cloud l'a bloquée (deux mots) ?</li><li>Que doit faire l'équipe pour débloquer la création, sans changer de type de machine ?</li><li>Dans le projet norvelia-dev-euw9, la création d'une VM échoue aussi, mais pour une raison liée à l'argent : laquelle ?</li><li>Quelle commande unique permet de basculer de la configuration dev-norvelia vers prod-norvelia ?</li></ol>",
    "starter": "# Exercice — Quotas, facturation et configurations gcloud de Norvelia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nombre seul. Question 6 : la commande gcloud complète.\n\n[Question 1 — vCPU consommés par la flotte actuelle]\nA_COMPLETER\n\n[Question 2 — vCPU demandés avec la machine supplémentaire]\nA_COMPLETER\n\n[Question 3 — Mécanisme ayant bloqué la création (deux mots)]\nA_COMPLETER\n\n[Question 4 — Action pour débloquer la création]\nA_COMPLETER\n\n[Question 5 — Raison de l'échec dans le projet dev]\nA_COMPLETER\n\n[Question 6 — Commande de bascule de configuration]\nA_COMPLETER\n",
    "hints": [
      "Comptez les vCPU machine par machine : une e2-standard-4 en apporte 4, une e2-standard-8 en apporte 8 ; comparez ensuite le total au quota de 20 vCPU.",
      "Un quota est propre à un projet (et souvent à une région) : la consommation d'un autre projet ne compte pas dans ce total.",
      "1. 3 machines × 4 vCPU, plus 1 machine × 8 vCPU. 2. Ajoutez 4 vCPU au total. 3. Le total dépasse 20 vCPU. 4. La seule issue sans changer de machine est une demande d'augmentation. 5. Sans compte de facturation lié, aucun déploiement payant n'est possible. 6. Une seule commande gcloud active une configuration existante."
    ],
    "examples": [
      {
        "stdin": "Studio Kiwi, studio d'animation, prépare son projet kiwi-prod-euw1.\nQuota : 16 vCPU en europe-west1.\nFlotte : 2 e2-standard-4 (4 vCPU chacune) et 1 e2-standard-8 (8 vCPU) ;\non veut ajouter une e2-micro (2 vCPU).\n\n1) Flotte actuelle : 2 × 4 + 8 = 16 vCPU, au plafond exactement.\n2) Avec l'e2-micro : 18 vCPU demandés.\n3) La création est bloquée : quota dépassé.\n4) Pour débloquer : demander une augmentation de quota.\n5) Dans kiwi-dev-euw1 sans facturation liée, la création échoue : le projet n'est lié à aucun compte de facturation.\n6) Bascule : gcloud config configurations activate prod-kiwi.",
        "expected": "flotte : 16 vCPU — demandé : 18 vCPU — quota dépassé — augmentation de quota à demander — échec : aucun compte de facturation lié — gcloud config configurations activate prod-kiwi",
        "note": "Un quota atteint n'est pas une panne : la demande d'augmentation se fait depuis la console IAM et admin, section Quotas, et est souvent accordée rapidement pour de petits volumes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — vCPU consommés par la flotte actuelle",
        "stdin": "q:1",
        "expected": "20"
      },
      {
        "label": "Question 2 — vCPU demandés avec la machine supplémentaire",
        "stdin": "q:2",
        "expected": "24"
      },
      {
        "label": "Question 3 — Mécanisme ayant bloqué la création (deux mots)",
        "stdin": "q:3",
        "expected": "quota dépassé||dépassement de quota||le quota est dépassé||quota dépassé (vcpu)"
      },
      {
        "label": "Question 4 — Action pour débloquer la création",
        "stdin": "q:4",
        "expected": "demander une augmentation de quota||demander une augmentation du quota||une augmentation de quota||augmenter le quota||demander une hausse de quota"
      },
      {
        "label": "Question 5 — Raison de l'échec dans le projet dev",
        "stdin": "q:5",
        "expected": "aucun compte de facturation lié||pas de compte de facturation lié||le projet n'est lié à aucun compte de facturation||facturation non activée||la facturation n'est pas activée"
      },
      {
        "label": "Question 6 — Commande de bascule de configuration",
        "stdin": "q:6",
        "expected": "gcloud config configurations activate prod-norvelia||configurations activate prod-norvelia"
      }
    ],
    "solution": "[Question 1 — vCPU consommés par la flotte actuelle]\n20\n\n[Question 2 — vCPU demandés avec la machine supplémentaire]\n24\n\n[Question 3 — Mécanisme ayant bloqué la création (deux mots)]\nquota dépassé\n\n[Question 4 — Action pour débloquer la création]\ndemander une augmentation de quota\n\n[Question 5 — Raison de l'échec dans le projet dev]\naucun compte de facturation lié\n\n[Question 6 — Commande de bascule de configuration]\ngcloud config configurations activate prod-norvelia",
    "takeaway": "1) Flotte actuelle : 3 × 4 + 1 × 8 = 12 + 8 = 20 vCPU, exactement au plafond du quota.\n2) Avec la machine supplémentaire : 20 + 4 = 24 vCPU demandés.\n3) La création est refusée car la demande (24 vCPU) dépasse le quota de 20 vCPU : le quota est dépassé.\n4) Sans changer de type de machine, la seule issue est de demander une augmentation de quota (console IAM et admin, section Quotas).\n5) Dans le projet dev, la création échoue car le projet n'est lié à aucun compte de facturation : Google Cloud refuse de provisionner des ressources payantes dans un projet non facturable.\n6) gcloud config configurations activate prod-norvelia : chaque configuration conserve son couple projet/région/zone, la bascule ne demande qu'une seule commande.\nContrôle : les quotas ne sont pas partagés entre projets — consommer 20 vCPU dans le projet de production ne réduit pas le quota du projet dev ; mais la facturation, elle, est indispensable dans les deux."
  }
];
