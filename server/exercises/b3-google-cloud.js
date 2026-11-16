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
  },
  {
    "id": "gcp3-c2-e1",
    "chapter": 2,
    "title": "Analyse de liaisons IAM et audit des rôles de base",
    "level": "n1",
    "language": "analyse",
    "goal": "Examiner des liaisons locales sans confondre leur présence avec un accès IAM effectif.",
    "brief": "<p>Cette grille maintient uniquement un registre fictif de liaisons locales entre membres et rôles. Elle ne calcule pas l’accès effectif à une ressource : celui-ci dépend de la permission demandée, des autres liaisons et de leur héritage, des conditions ainsi que des règles IAM <em>deny</em> applicables et de leurs exceptions.<br>\nLa présence d’une liaison ne prouve donc pas l’accès ; son absence du registre local ne prouve pas un refus. Les rôles de base <code>roles/viewer</code>, <code>roles/editor</code> et <code>roles/owner</code> sont très larges et déconseillés en production ; ils ne sont pas déclarés obsolètes par cette grille.<br><br>\n<code>BIND role=&lt;role&gt; member=&lt;type:id&gt;</code> enregistre une liaison et retourne <code>BIND_OK: role=&lt;role&gt; member=&lt;member&gt; type=&lt;BASIC_CAUTION_PROD|PREDEFINED&gt;</code>. Les autres rôles cités dans les cas sont prédéfinis.<br>\n<code>CHECK_ROLE member=&lt;member&gt; role=&lt;role&gt;</code> cherche seulement la paire exacte dans le registre et retourne <code>LIAISON: PRESENT member=&lt;member&gt; role=&lt;role&gt;</code> ou <code>LIAISON: ABSENTE member=&lt;member&gt; role=&lt;role&gt;</code>.<br>\n<code>AUDIT_PRIMITIVE_ROLES</code> retourne <code>AUDIT: OK (zero basic roles in use)</code> ou <code>AUDIT: WARNING basic_count=&lt;N&gt; members=&lt;m1,m2,...&gt;</code>, membres triés lexicalement.<br>\nUn contexte indiquant qu’un deny peut s’appliquer ne modifie pas le constat de liaison : l’évaluation du deny sort du périmètre. Voir les <a href=\"https://docs.cloud.google.com/iam/docs/deny-overview\">politiques IAM deny</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c2-e1) — Analyse de liaisons IAM et audit des rôles de base\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Liaison recherchée absente du registre local]\n# Données : BIND role=roles/compute.viewer member=user:bob@corp.com\n# Données : CHECK_ROLE member=user:bob@corp.com role=roles/compute.admin\nA_COMPLETER\n\n[Cas 2 — Audit de deux rôles de base]\n# Données : BIND role=roles/editor member=user:dev@corp.com\n# Données : BIND role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com\n# Données : AUDIT_PRIMITIVE_ROLES\nA_COMPLETER\n\n[Cas 3 — Liaison présente malgré un deny éventuellement applicable]\n# Données : BIND role=roles/storage.objectViewer member=user:lea@corp.com\n# Données : CONTEXTE deny_applicable=POSSIBLE\n# Données : CHECK_ROLE member=user:lea@corp.com role=roles/storage.objectViewer\nA_COMPLETER\n",
    "hints": [
      "Cherchez uniquement la paire membre-rôle dans le registre local ; ne déduisez aucune décision d’accès.",
      "Pour l’audit, comptez les liaisons aux trois rôles de base et triez les membres concernés.",
      "Inspectez chaque binding IAM (member, role) et signalez tout rôle primitif large (roles/owner, editor, viewer) tout en rappelant que les refus/conditions org peuvent primer."
    ],
    "examples": [
      {
        "stdin": "BIND role=roles/storage.objectViewer member=user:alice@cloud.corp\nCHECK_ROLE member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT_PRIMITIVE_ROLES",
        "expected": "BIND_OK: role=roles/storage.objectViewer member=user:alice@cloud.corp type=PREDEFINED\nLIAISON: PRESENT member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT: OK (zero basic roles in use)",
        "note": "La liaison locale est présente ; les conditions et refus éventuels ne sont pas évalués."
      }
    ],
    "tests": [
      {
        "label": "Liaison recherchée absente du registre local",
        "stdin": "cas:1",
        "expected": "BIND_OK: role=roles/compute.viewer member=user:bob@corp.com type=PREDEFINED\nLIAISON: ABSENTE member=user:bob@corp.com role=roles/compute.admin"
      },
      {
        "label": "Audit de deux rôles de base",
        "stdin": "cas:2",
        "expected": "BIND_OK: role=roles/editor member=user:dev@corp.com type=BASIC_CAUTION_PROD\nBIND_OK: role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com type=BASIC_CAUTION_PROD\nAUDIT: WARNING basic_count=2 members=serviceAccount:ci@proj.iam.gserviceaccount.com,user:dev@corp.com"
      },
      {
        "label": "Liaison présente malgré un deny éventuellement applicable",
        "stdin": "cas:3",
        "expected": "BIND_OK: role=roles/storage.objectViewer member=user:lea@corp.com type=PREDEFINED\nLIAISON: PRESENT member=user:lea@corp.com role=roles/storage.objectViewer"
      }
    ],
    "solution": "[Exemple]\nBIND_OK: role=roles/storage.objectViewer member=user:alice@cloud.corp type=PREDEFINED\nLIAISON: PRESENT member=user:alice@cloud.corp role=roles/storage.objectViewer\nAUDIT: OK (zero basic roles in use)\n\n[Cas 1 — Liaison recherchée absente du registre local]\nBIND_OK: role=roles/compute.viewer member=user:bob@corp.com type=PREDEFINED\nLIAISON: ABSENTE member=user:bob@corp.com role=roles/compute.admin\n\n[Cas 2 — Audit de deux rôles de base]\nBIND_OK: role=roles/editor member=user:dev@corp.com type=BASIC_CAUTION_PROD\nBIND_OK: role=roles/owner member=serviceAccount:ci@proj.iam.gserviceaccount.com type=BASIC_CAUTION_PROD\nAUDIT: WARNING basic_count=2 members=serviceAccount:ci@proj.iam.gserviceaccount.com,user:dev@corp.com\n\n[Cas 3 — Liaison présente malgré un deny éventuellement applicable]\nBIND_OK: role=roles/storage.objectViewer member=user:lea@corp.com type=PREDEFINED\nLIAISON: PRESENT member=user:lea@corp.com role=roles/storage.objectViewer",
    "takeaway": "À retenir : Examiner des liaisons locales sans confondre leur présence avec un accès IAM effectif.\nRepère : La liaison locale est présente ; les conditions et refus éventuels ne sont pas évalués."
  },
  {
    "id": "gcp3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Moindre privilège : les rôles de CargoLys",
    "exampleTitle": "Exemple résolu — les rôles d'AquaRivo",
    "goal": "Sélectionner le rôle prédéfini adapté à chaque besoin métier et appliquer le principe du moindre privilège.",
    "brief": "<p><strong>Énoncé.</strong> CargoLys, transporteur havrais, refond les accès IAM de son projet <code>prj-cargolys-prod</code>. L'administrateur recense quatre besoins précis et le catalogue des rôles prédéfinis disponibles :</p><table><tr><th>Rôle prédéfini</th><th>Permissions</th></tr><tr><th>roles/storage.objectViewer</th><td>Lire les objets des buckets</td></tr><tr><th>roles/storage.objectCreator</th><td>Créer des objets dans les buckets</td></tr><tr><th>roles/compute.instanceAdmin.v1</th><td>Administrer les instances Compute Engine</td></tr><tr><th>roles/logging.viewer</th><td>Consulter les journaux</td></tr></table><ul><li><strong>Sarah, auditrice :</strong> uniquement consulter les fichiers de factures stockés dans un bucket ;</li><li><strong>Karim, intégrateur :</strong> déposer des fichiers dans le bucket des manifestes, sans jamais pouvoir en supprimer ;</li><li><strong>Nadia, exploitante :</strong> lire les journaux d'exécution des traitements, sans toucher aux ressources ;</li><li><strong>Omar, ancien administrateur :</strong> bénéficie encore du rôle primitif roles/editor alors qu'il ne gère que les machines virtuelles.</li></ul><p>Pour les questions 1 à 4, répondez avec le nom complet du rôle (au format roles/...).</p><ol><li>Quel rôle accorder à Sarah ?</li><li>Quel rôle accorder à Karim ?</li><li>Quel rôle accorder à Nadia ?</li><li>Quel rôle prédéfini suffit à Omar pour remplacer roles/editor ?</li><li>Quel rôle primitif correspond à un accès en lecture seule sur l'ensemble du projet ?</li></ol>",
    "starter": "# Exercice — Moindre privilège : les rôles de CargoLys\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nom complet du rôle (roles/...). Question 5 : un seul mot anglais.\n\n[Question 1 — Rôle de Sarah, l'auditrice]\nA_COMPLETER\n\n[Question 2 — Rôle de Karim, l'intégrateur]\nA_COMPLETER\n\n[Question 3 — Rôle de Nadia, l'exploitante]\nA_COMPLETER\n\n[Question 4 — Rôle prédéfini suffisant pour Omar]\nA_COMPLETER\n\n[Question 5 — Rôle primitif en lecture seule]\nA_COMPLETER\n",
    "hints": [
      "Partez du besoin exprimé et cherchez le rôle qui le couvre exactement, sans permission superflue : c'est le principe du moindre privilège.",
      "Les noms des rôles prédéfinis décrivent le service puis l'action : objectViewer lit, objectCreator crée, instanceAdmin administre les machines virtuelles.",
      "1. Sarah ne lit que des objets. 2. Karim ne crée que des objets. 3. Nadia ne consulte que des journaux. 4. Omar ne gère que des machines. 5. Parmi viewer, editor et owner, lequel ne fait que lire ?"
    ],
    "examples": [
      {
        "stdin": "AquaRivo, gestionnaire de piscines connectées, recense ses besoins :\n- Rose doit consulter l'état des machines virtuelles → roles/compute.viewer ;\n- Théo doit gérer tous les objets du bucket de données (lecture, écriture, suppression) → roles/storage.objectAdmin ;\n- Inès doit consulter les tableaux de bord de monitoring → roles/monitoring.viewer ;\n- Marc, ancien admin, ne gère que les VM → on remplace roles/editor par roles/compute.instanceAdmin.v1 ;\n- le rôle primitif en lecture seule est viewer.\n\n1) Rose : roles/compute.viewer.\n2) Théo : roles/storage.objectAdmin.\n3) Inès : roles/monitoring.viewer.\n4) Marc : roles/compute.instanceAdmin.v1.\n5) Rôle primitif en lecture seule : viewer.",
        "expected": "Rose : compute.viewer — Théo : objectAdmin — Inès : monitoring.viewer — Marc : instanceAdmin.v1 — primitif lecture seule : viewer",
        "note": "Remplacer un rôle primitif par le rôle prédéfini correspondant au besoin réel réduit la surface d'attaque sans gêner le travail quotidien."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Rôle de Sarah, l'auditrice",
        "stdin": "q:1",
        "expected": "roles/storage.objectViewer||storage.objectViewer||objectViewer"
      },
      {
        "label": "Question 2 — Rôle de Karim, l'intégrateur",
        "stdin": "q:2",
        "expected": "roles/storage.objectCreator||storage.objectCreator||objectCreator"
      },
      {
        "label": "Question 3 — Rôle de Nadia, l'exploitante",
        "stdin": "q:3",
        "expected": "roles/logging.viewer||logging.viewer"
      },
      {
        "label": "Question 4 — Rôle prédéfini suffisant pour Omar",
        "stdin": "q:4",
        "expected": "roles/compute.instanceAdmin.v1||compute.instanceAdmin.v1||instanceAdmin.v1"
      },
      {
        "label": "Question 5 — Rôle primitif en lecture seule",
        "stdin": "q:5",
        "expected": "viewer"
      }
    ],
    "solution": "[Question 1 — Rôle de Sarah, l'auditrice]\nroles/storage.objectViewer\n\n[Question 2 — Rôle de Karim, l'intégrateur]\nroles/storage.objectCreator\n\n[Question 3 — Rôle de Nadia, l'exploitante]\nroles/logging.viewer\n\n[Question 4 — Rôle prédéfini suffisant pour Omar]\nroles/compute.instanceAdmin.v1\n\n[Question 5 — Rôle primitif en lecture seule]\nviewer",
    "takeaway": "1) Sarah : roles/storage.objectViewer — la lecture des objets suffit à son audit, sans droit d'écriture ni de suppression.\n2) Karim : roles/storage.objectCreator — il peut déposer des fichiers, mais pas en supprimer.\n3) Nadia : roles/logging.viewer — la consultation des journaux ne nécessite aucun droit sur les ressources.\n4) Omar : roles/compute.instanceAdmin.v1 — ce rôle prédéfini couvre la gestion des machines virtuelles, alors que roles/editor lui donnait aussi le contrôle des buckets, des bases et des stratégies.\n5) viewer est le rôle primitif de lecture seule : il porte sur tout le projet.\nContrôle : chaque rôle retenu couvre exactement le besoin déclaré — aucun des quatre collaborateurs ne reçoit de permission inutilisée."
  },
  {
    "id": "gcp3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Comptes de service et clés de Vitalis Santé",
    "exampleTitle": "Exemple résolu — l'audit des clés d'OndeLibre",
    "goal": "Auditer l'âge des clés d'un compte de service, statuer sur une politique de rotation et recommander une posture sans clé.",
    "brief": "<p><strong>Énoncé.</strong> Vitalis Santé, plateforme de télémédecine nantaise, utilise le compte de service <code>sa-export@prj-vitalis-prod.iam.gserviceaccount.com</code> pour exporter chaque nuit des synthèses chiffrées depuis une VM Compute Engine. L'audit de sécurité du <strong>1er mars 2026</strong> relève trois clés JSON actives :</p><table><tr><th>Clé</th><th>Créée le</th><th>Dernière utilisation</th></tr><tr><th>key-a</th><td>1er avril 2024</td><td>jamais détectée</td></tr><tr><th>key-b</th><td>1er mai 2025</td><td>cette semaine</td></tr><tr><th>key-c</th><td>1er septembre 2024</td><td>janvier 2026</td></tr></table><p>La politique de sécurité impose une <strong>rotation des clés à 12 mois maximum</strong>.</p><ol><li>Quel âge, en mois, la clé key-a a-t-elle au jour de l'audit ?</li><li>Quel âge, en mois, la clé key-b a-t-elle ?</li><li>Quel âge, en mois, la clé key-c a-t-elle ?</li><li>Combien de clés violent la politique de rotation ?</li><li>Quelle clé n'a jamais servi et doit être supprimée immédiatement ?</li><li>Comment s'appelle un compte de service directement associé à la VM, utilisable sans aucune clé JSON exportée ?</li></ol>",
    "starter": "# Exercice — Comptes de service et clés de Vitalis Santé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Questions 5 et 6 : réponses courtes.\n\n[Question 1 — Âge en mois de la clé key-a]\nA_COMPLETER\n\n[Question 2 — Âge en mois de la clé key-b]\nA_COMPLETER\n\n[Question 3 — Âge en mois de la clé key-c]\nA_COMPLETER\n\n[Question 4 — Nombre de clés hors politique]\nA_COMPLETER\n\n[Question 5 — Clé à supprimer immédiatement]\nA_COMPLETER\n\n[Question 6 — Compte de service utilisable sans clé JSON sur une VM]\nA_COMPLETER\n",
    "hints": [
      "Comptez les mois entiers entre la date de création de chaque clé et le 1er mars 2026, d'anniversaire en anniversaire.",
      "Comparez chaque âge au plafond de 12 mois : une clé au-delà viole la politique, même si elle sert encore.",
      "1. key-a est née en avril 2024 : elle a plus de deux ans. 2. key-b est née en mai 2025. 3. key-c a dépassé un an et demi. 4. Comptez les clés de plus de 12 mois. 5. La clé jamais utilisée ne dessert aucun service. 6. Une VM peut porter son identité sans fichier de clé : le compte est dit... attaché."
    ],
    "examples": [
      {
        "stdin": "OndeLibre, webradio, audite le 1er janvier 2026 le compte de service\nsa-diffusion@prj-onde.iam.gserviceaccount.com.\nPolitique de rotation : 24 mois maximum. Trois clés :\nkey-1 créée le 1er octobre 2023 (jamais utilisée) → 27 mois ;\nkey-2 créée le 1er novembre 2023 (utilisée hier) → 26 mois ;\nkey-3 créée le 1er juin 2024 (utilisée hier) → 19 mois.\n\n1) key-1 : 27 mois.\n2) key-2 : 26 mois.\n3) key-3 : 19 mois.\n4) 2 clés violent la politique (27 et 26 mois dépassent 24).\n5) key-1, jamais utilisée, doit être supprimée immédiatement.\n6) La VM de diffusion utilise un compte de service attaché, sans clé JSON.",
        "expected": "key-1 : 27 mois — key-2 : 26 mois — key-3 : 19 mois — 2 clés hors politique — key-1 à supprimer — compte de service attaché",
        "note": "Une clé jamais utilisée est une porte d'entrée dorée : sa suppression ne gêne aucun service et réduit immédiatement la surface d'attaque."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Âge en mois de la clé key-a",
        "stdin": "q:1",
        "expected": "23"
      },
      {
        "label": "Question 2 — Âge en mois de la clé key-b",
        "stdin": "q:2",
        "expected": "10"
      },
      {
        "label": "Question 3 — Âge en mois de la clé key-c",
        "stdin": "q:3",
        "expected": "18"
      },
      {
        "label": "Question 4 — Nombre de clés hors politique",
        "stdin": "q:4",
        "expected": "2"
      },
      {
        "label": "Question 5 — Clé à supprimer immédiatement",
        "stdin": "q:5",
        "expected": "key-a||la clé key-a"
      },
      {
        "label": "Question 6 — Compte de service utilisable sans clé JSON sur une VM",
        "stdin": "q:6",
        "expected": "un compte de service attaché||le compte de service attaché||compte de service attaché||attaché"
      }
    ],
    "solution": "[Question 1 — Âge en mois de la clé key-a]\n23\n\n[Question 2 — Âge en mois de la clé key-b]\n10\n\n[Question 3 — Âge en mois de la clé key-c]\n18\n\n[Question 4 — Nombre de clés hors politique]\n2\n\n[Question 5 — Clé à supprimer immédiatement]\nkey-a\n\n[Question 6 — Compte de service utilisable sans clé JSON sur une VM]\nun compte de service attaché",
    "takeaway": "1) key-a : d'avril 2024 à mars 2026, 23 mois entiers (12 mois jusqu'en avril 2025, puis 11 mois).\n2) key-b : de mai 2025 à mars 2026, 10 mois.\n3) key-c : de septembre 2024 à mars 2026, 18 mois.\n4) key-a (23 mois) et key-c (18 mois) dépassent le plafond de 12 mois : 2 clés violent la politique.\n5) key-a n'a jamais été utilisée : elle doit être supprimée immédiatement, sans préavis ni migration.\n6) Un compte de service attaché : l'identité est fournie par Google à la ressource elle-même, aucune clé JSON n'est générée ni exportée.\nContrôle : seul key-b (10 mois) est conforme ; à terme, les trois clés devraient disparaître au profit du compte de service attaché à la VM."
  },
  {
    "id": "gcp3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Dimensionner et chiffrer les VM de Bistronomie",
    "exampleTitle": "Exemple résolu — les serveurs de Vertigo Studio",
    "goal": "Lire les caractéristiques des familles de machines Compute Engine et calculer un coût mensuel à partir du prix horaire.",
    "brief": "<p><strong>Énoncé.</strong> Bistronomie, plateforme tourangelle de click &amp; collect pour restaurants, héberge son API de commandes sur <strong>Google Compute Engine (GCE)</strong> dans un projet GCP en région <code>europe-west9</code> (Paris). Les machines tournent 24 h/24 ; le mois de référence compte <strong>730 heures</strong>. Les types de machines retenus et les tarifs horaires fournis par le service financier sont :</p><table><tr><th>Type de machine</th><th>vCPU</th><th>RAM (Go)</th><th>Prix horaire</th></tr><tr><th>e2-medium</th><td>2</td><td>4</td><td>0,034 $</td></tr><tr><th>e2-standard-2</th><td>2</td><td>8</td><td>0,067 $</td></tr><tr><th>e2-standard-4</th><td>4</td><td>16</td><td>0,134 $</td></tr></table><p>L'API de production exige une e2-standard-4 ; le serveur de démonstration peut se contenter d'une e2-standard-2 ; la VM de veille technologique tourne sur une e2-medium.</p><ol><li>Combien de vCPU possède une e2-standard-4 ?</li><li>Quel est le coût mensuel, en dollars, de l'API de production (e2-standard-4 en continu) ?</li><li>Quel est le coût mensuel du serveur de démonstration (e2-standard-2 en continu) ?</li><li>Quel est le coût mensuel de la VM de veille (e2-medium en continu) ?</li><li>Le serveur de démonstration passe d'une e2-standard-4 à une e2-standard-2 : quelle économie mensuelle, en dollars, ce repli procure-t-il ?</li></ol>",
    "starter": "# Exercice — Dimensionner et chiffrer les VM de Bistronomie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses sont des nombres : vCPU, puis dollars (arrondis au centime).\n\n[Question 1 — vCPU d'une e2-standard-4]\nA_COMPLETER\n\n[Question 2 — Coût mensuel de l'API de production (e2-standard-4)]\nA_COMPLETER\n\n[Question 3 — Coût mensuel du serveur de démonstration (e2-standard-2)]\nA_COMPLETER\n\n[Question 4 — Coût mensuel de la VM de veille (e2-medium)]\nA_COMPLETER\n\n[Question 5 — Économie mensuelle du repli e2-standard-4 vers e2-standard-2]\nA_COMPLETER\n",
    "hints": [
      "Le coût mensuel d'une machine en continu s'obtient en multipliant le prix horaire par le nombre d'heures du mois.",
      "L'économie d'un repli de gamme se calcule par différence entre les deux coûts mensuels.",
      "1. Lisez la colonne vCPU du tableau. 2. 730 × 0,134. 3. 730 × 0,067. 4. 730 × 0,034. 5. Soustrayez le coût de la petite machine à celui de la grande."
    ],
    "examples": [
      {
        "stdin": "Vertigo Studio, tournages de drone dans les Alpes, exploite trois VM 24 h/24 (mois de 730 heures) :\n- vm-montage : 0,20 $/h ;\n- vm-tests : 0,10 $/h ;\n- vm-mini : 0,05 $/h.\n\n1) vm-montage : 730 × 0,20 = 146,00 $/mois.\n2) vm-tests : 730 × 0,10 = 73,00 $/mois.\n3) vm-mini : 730 × 0,05 = 36,50 $/mois.\n4) Remplacer vm-montage par une machine à 0,10 $/h économise 146,00 − 73,00 = 73,00 $/mois.",
        "expected": "montage : 146 $ — tests : 73 $ — mini : 36,50 $ — économie : 73 $",
        "note": "Une VM arrêtée ne coûte plus de calcul, mais ses disques persistants restent facturés : le repli de gamme se raisonne machine par machine."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — vCPU d'une e2-standard-4",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Coût mensuel de l'API de production (e2-standard-4)",
        "stdin": "q:2",
        "expected": "97,82||97.82||97,8"
      },
      {
        "label": "Question 3 — Coût mensuel du serveur de démonstration (e2-standard-2)",
        "stdin": "q:3",
        "expected": "48,91||48.91"
      },
      {
        "label": "Question 4 — Coût mensuel de la VM de veille (e2-medium)",
        "stdin": "q:4",
        "expected": "24,82||24.82"
      },
      {
        "label": "Question 5 — Économie mensuelle du repli e2-standard-4 vers e2-standard-2",
        "stdin": "q:5",
        "expected": "48,91||48.91"
      }
    ],
    "solution": "[Question 1 — vCPU d'une e2-standard-4]\n4\n\n[Question 2 — Coût mensuel de l'API de production (e2-standard-4)]\n97,82\n\n[Question 3 — Coût mensuel du serveur de démonstration (e2-standard-2)]\n48,91\n\n[Question 4 — Coût mensuel de la VM de veille (e2-medium)]\n24,82\n\n[Question 5 — Économie mensuelle du repli e2-standard-4 vers e2-standard-2]\n48,91",
    "takeaway": "1) Une e2-standard-4 offre 4 vCPU (et 16 Go de RAM).\n2) API de production : 730 × 0,134 = 97,82 $ par mois.\n3) Serveur de démonstration : 730 × 0,067 = 48,91 $ par mois.\n4) VM de veille : 730 × 0,034 = 24,82 $ par mois.\n5) Économie du repli : 97,82 − 48,91 = 48,91 $ par mois — exactement le prix de la petite machine.\nContrôle : 48,91 + 24,82 = 73,73 $ pour la démonstration et la veille réunies, soit moins que la seule machine de production."
  },
  {
    "id": "gcp3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "L'auto-scaling du MIG de Festilia",
    "exampleTitle": "Exemple résolu — l'auto-scaling de TalentBridge",
    "goal": "Calculer la capacité cible d'un groupe d'instances géré avec auto-scaling CPU et respecter les bornes min et max.",
    "brief": "<p><strong>Énoncé.</strong> Festilia, billetterie toulousaine de festivals, absorbe les mises en vente avec un groupe d'instances géré (MIG) doté d'un auto-scaling basé sur une <strong>CPU cible de 60 %</strong>, avec les bornes <strong>minimum 3</strong> et <strong>maximum 15</strong> instances. Rappel du cours : la capacité cible se calcule ainsi : capacité actuelle × CPU observée ÷ CPU cible, arrondie à l'entier supérieur.</p><p>Trois situations sont observées :</p><ul><li><strong>Montée :</strong> 8 instances tournent à 75 % de CPU moyenne ;</li><li><strong>Pointe d'ouverture :</strong> 12 instances tournent à 80 % de CPU moyenne ;</li><li><strong>Détente :</strong> 10 instances retombent à 45 % de CPU moyenne.</li></ul><ol><li>Quelle capacité cible l'auto-scaler calcule-t-il en montée (8 instances à 75 %) ?</li><li>En pointe, la formule demande 16 instances : combien le MIG peut-il en exécuter au maximum ?</li><li>Quelle capacité cible la formule donne-t-elle en détente (10 instances à 45 %), arrondie à l'entier supérieur ?</li><li>La charge s'effondre à 5 % : le MIG peut-il descendre sous 3 instances ?</li><li>Que fait automatiquement le MIG lorsqu'une de ses instances ne répond plus au health check ?</li></ol>",
    "starter": "# Exercice — L'auto-scaling du MIG de Festilia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre d'instances. Question 4 : oui ou non. Question 5 : réponse courte.\n\n[Question 1 — Capacité cible en montée]\nA_COMPLETER\n\n[Question 2 — Capacité plafonnée en pointe]\nA_COMPLETER\n\n[Question 3 — Capacité cible en détente]\nA_COMPLETER\n\n[Question 4 — Descente sous 3 instances possible ?]\nA_COMPLETER\n\n[Question 5 — Réaction du MIG à une instance défaillante]\nA_COMPLETER\n",
    "hints": [
      "Appliquez la formule capacité actuelle × CPU observée ÷ CPU cible, puis arrondissez à l'entier supérieur.",
      "La capacité calculée ne sort jamais de l'intervalle [minimum ; maximum] : confrontez toujours le résultat aux bornes.",
      "1. 8 × 75 ÷ 60. 2. La formule demande 16, mais la borne maximum est 15. 3. 10 × 45 ÷ 60 = 7,5. 4. La borne minimum protège un socle d'instances. 5. L'auto-healing fait vivre le MIG, pas seulement l'auto-scaling."
    ],
    "examples": [
      {
        "stdin": "TalentBridge, plateforme de recrutement, exploite un MIG avec CPU cible 50 %,\nbornes min 4 et max 10.\n- Montée : 6 instances à 75 % → 6 × 75 ÷ 50 = 9 instances.\n- Pointe : 10 instances à 80 % → 10 × 80 ÷ 50 = 16 demandées, plafonnées à 10.\n- Détente : 4 instances à 25 % → 4 × 25 ÷ 50 = 2, mais la borne minimum impose 4.\n- Une instance défaillante est recréée automatiquement (auto-healing).\n\n1) Montée : 9 instances.\n2) Pointe : 10 instances (plafond max).\n3) Détente : le calcul donne 2, la borne min impose 4.\n4) Non, jamais sous 4 instances.\n5) Le MIG la recrée automatiquement.",
        "expected": "montée : 9 — pointe : 10 (plafond) — détente : 4 (plancher) — jamais sous 4 — recréation automatique",
        "note": "Les bornes min et max transforment le calcul brut en décision encadrée : l'auto-scaler ne fait jamais sortir la flotte de l'intervalle défini."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Capacité cible en montée",
        "stdin": "q:1",
        "expected": "10"
      },
      {
        "label": "Question 2 — Capacité plafonnée en pointe",
        "stdin": "q:2",
        "expected": "15"
      },
      {
        "label": "Question 3 — Capacité cible en détente",
        "stdin": "q:3",
        "expected": "8"
      },
      {
        "label": "Question 4 — Descente sous 3 instances possible ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Réaction du MIG à une instance défaillante",
        "stdin": "q:5",
        "expected": "il la recrée||la recrée||il la recrée automatiquement||il la remplace||la remplace automatiquement||il recrée l instance||recrée automatiquement une instance"
      }
    ],
    "solution": "[Question 1 — Capacité cible en montée]\n10\n\n[Question 2 — Capacité plafonnée en pointe]\n15\n\n[Question 3 — Capacité cible en détente]\n8\n\n[Question 4 — Descente sous 3 instances possible ?]\nnon\n\n[Question 5 — Réaction du MIG à une instance défaillante]\nil la recrée",
    "takeaway": "1) Montée : 8 × 75 ÷ 60 = 10, donc 10 instances.\n2) La formule demande 12 × 80 ÷ 60 = 16 instances, mais la borne maximum limite le MIG à 15 instances.\n3) Détente : 10 × 45 ÷ 60 = 7,5, arrondi à l'entier supérieur : 8 instances.\n4) Non : la borne minimum de 3 instances interdit de descendre plus bas, même à 5 % de charge.\n5) Grâce à l'auto-healing, le MIG recrée automatiquement l'instance défaillante, dans une zone saine si possible.\nContrôle : en montée, 10 instances à 60 % offrent la même capacité totale que 8 instances à 75 % (10 × 60 = 600 = 8 × 75)."
  },
  {
    "id": "gcp3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Serverless : Cloud Run et App Engine pour SnapPhoto",
    "exampleTitle": "Exemple résolu — le service d'AquaQuiz",
    "goal": "Dimensionner le nombre d'instances d'un service Cloud Run selon la simultanéité et choisir le bon service serverless.",
    "brief": "<p><strong>Énoncé.</strong> SnapPhoto, imprimeur photo lillois, a conteneurisé son service de retouche avec Docker et prépare le Black Friday. Le service Cloud Run est configuré avec <strong>40 requêtes simultanées par instance</strong> (concurrency) et <strong>2 instances minimum</strong> pour éviter les démarrages à froid. Les prévisions de trafic : un pic de <strong>600 requêtes par seconde</strong> le jour de l'événement, et environ 80 requêtes par seconde en trafic habituel.</p><p>L'équipe hésite aussi entre Cloud Run, qui exécute directement un conteneur, et App Engine, qui déploie du code avec un fichier <code>app.yaml</code> et des versions nommées.</p><ol><li>Combien d'instances faut-il au pic pour absorber 600 requêtes/s avec 40 requêtes simultanées par instance ?</li><li>La concurrency est portée à 80 requêtes simultanées par instance : combien d'instances suffisent alors au pic ?</li><li>Combien d'instances restent garanties en permanence grâce au paramètre minimum ?</li><li>Quel service managé exécute directement le conteneur Docker de SnapPhoto ?</li><li>Quel service serverless historique déploie du code sans conteneur, piloté par un fichier app.yaml ?</li><li>Cloud Run peut-il réduire le service à zéro instance hors trafic, pour n'être presque plus facturé ?</li></ol>",
    "starter": "# Exercice — Serverless : Cloud Run et App Engine pour SnapPhoto\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre seul. Questions 4 et 5 : le nom du service. Question 6 : oui ou non.\n\n[Question 1 — Instances nécessaires au pic (40 requêtes par instance)]\nA_COMPLETER\n\n[Question 2 — Instances nécessaires au pic (80 requêtes par instance)]\nA_COMPLETER\n\n[Question 3 — Instances garanties en permanence]\nA_COMPLETER\n\n[Question 4 — Service exécutant le conteneur Docker]\nA_COMPLETER\n\n[Question 5 — Service déployant du code via app.yaml]\nA_COMPLETER\n\n[Question 6 — Réduction à zéro instance hors trafic possible ?]\nA_COMPLETER\n",
    "hints": [
      "Le nombre d'instances nécessaires est le débit total divisé par la capacité d'une instance, arrondi à l'entier supérieur.",
      "Augmenter la concurrency réduit le nombre d'instances nécessaires pour un même débit : c'est l'avantage de Cloud Run face à une machine par requête.",
      "1. 600 ÷ 40. 2. 600 ÷ 80 = 7,5. 3. Relisez le paramètre minimum. 4. L'un des deux services est spécialisé dans les conteneurs. 5. L'autre est le service serverless originel de Google Cloud. 6. Sans minimum, Cloud Run supprime les instances inactives."
    ],
    "examples": [
      {
        "stdin": "AquaQuiz, jeux quiz en ligne, expose un service conteneurisé sur Cloud Run :\n30 requêtes simultanées par instance, 3 instances minimum. Pic : 900 requêtes/s.\n\n1) Instances au pic : 900 ÷ 30 = 30.\n2) Avec 90 requêtes par instance : 900 ÷ 90 = 10 instances.\n3) 3 instances restent garanties en permanence.\n4) Le conteneur s'exécute sur Cloud Run.\n5) Le code sans conteneur avec app.yaml, c'est App Engine.\n6) Oui, sans minimum, Cloud Run peut descendre à zéro instance.",
        "expected": "pic : 30 instances — à 90 requêtes par instance : 10 — minimum garanti : 3 — conteneur : Cloud Run — app.yaml : App Engine — zéro instance possible",
        "note": "Une concurrency plus élevée concentre le trafic sur moins d'instances : le même pic coûte moins cher, à condition que l'instance supporte la charge."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Instances nécessaires au pic (40 requêtes par instance)",
        "stdin": "q:1",
        "expected": "15"
      },
      {
        "label": "Question 2 — Instances nécessaires au pic (80 requêtes par instance)",
        "stdin": "q:2",
        "expected": "8"
      },
      {
        "label": "Question 3 — Instances garanties en permanence",
        "stdin": "q:3",
        "expected": "2"
      },
      {
        "label": "Question 4 — Service exécutant le conteneur Docker",
        "stdin": "q:4",
        "expected": "Cloud Run||cloud run"
      },
      {
        "label": "Question 5 — Service déployant du code via app.yaml",
        "stdin": "q:5",
        "expected": "App Engine||app engine"
      },
      {
        "label": "Question 6 — Réduction à zéro instance hors trafic possible ?",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Instances nécessaires au pic (40 requêtes par instance)]\n15\n\n[Question 2 — Instances nécessaires au pic (80 requêtes par instance)]\n8\n\n[Question 3 — Instances garanties en permanence]\n2\n\n[Question 4 — Service exécutant le conteneur Docker]\nCloud Run\n\n[Question 5 — Service déployant du code via app.yaml]\nApp Engine\n\n[Question 6 — Réduction à zéro instance hors trafic possible ?]\noui",
    "takeaway": "1) Au pic : 600 ÷ 40 = 15 instances.\n2) Avec une concurrency de 80 : 600 ÷ 80 = 7,5, arrondi à 8 instances.\n3) Le paramètre minimum garantit 2 instances en permanence, quel que soit le trafic.\n4) Cloud Run exécute directement le conteneur Docker, sans machine virtuelle à gérer.\n5) App Engine déploie du code sans conteneur, piloté par le fichier app.yaml, avec des versions nommées.\n6) Oui : sans instance minimum, Cloud Run peut descendre à zéro instance inactive et n'est alors presque plus facturé.\nContrôle : 15 instances × 40 requêtes = 600 requêtes/s exactement ; 8 × 80 = 640, de quoi absorber les à-coups au-delà du pic prévu."
  },
  {
    "id": "gcp3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le plan d'adressage VPC de Voltalys",
    "exampleTitle": "Exemple résolu — le VPC de RivieraSoft",
    "goal": "Découper un bloc CIDR en sous-réseaux et identifier les adresses réservées par Google Cloud.",
    "brief": "<p><strong>Énoncé.</strong> Voltalys, gestionnaire grenoblois de compteurs d'énergie connectés, crée son VPC en mode personnalisé avec le bloc <strong>10.40.0.0/22</strong>, à découper en sous-réseaux régionaux. Rappel du cours : Google Cloud réserve <strong>4 adresses par sous-réseau</strong> — la première (.0, adresse du réseau), la suivante (.1, passerelle), la troisième (.2, DNS interne) et la dernière (diffusion).</p><ol><li>Combien d'adresses IP contient le bloc 10.40.0.0/22 ?</li><li>Combien de sous-réseaux /24 peut-on découper dans ce bloc /22 ?</li><li>Combien d'adresses utilisables offre un sous-réseau /24, réservations déduites ?</li><li>Quelle est la première adresse utilisable du sous-réseau 10.40.1.0/24 ?</li><li>Quelle est la dernière adresse utilisable du sous-réseau 10.40.1.0/24 ?</li><li>Quelle est l'adresse de la passerelle du sous-réseau 10.40.2.0/24 ?</li></ol>",
    "starter": "# Exercice — Le plan d'adressage VPC de Voltalys\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre seul. Questions 4 à 6 : l'adresse IP.\n\n[Question 1 — Nombre d'adresses du bloc /22]\nA_COMPLETER\n\n[Question 2 — Nombre de sous-réseaux /24]\nA_COMPLETER\n\n[Question 3 — Adresses utilisables d'un /24]\nA_COMPLETER\n\n[Question 4 — Première adresse utilisable de 10.40.1.0/24]\nA_COMPLETER\n\n[Question 5 — Dernière adresse utilisable de 10.40.1.0/24]\nA_COMPLETER\n\n[Question 6 — Passerelle de 10.40.2.0/24]\nA_COMPLETER\n",
    "hints": [
      "Un bloc /n contient 2 puissance (32 − n) adresses : un /22 en contient 2 puissance 10, un /24 en contient 2 puissance 8.",
      "Chaque sous-réseau perd 4 adresses réservées : retranchez-les du total pour obtenir les adresses utilisables.",
      "1. Le /22 couvre le troisième octet de 0 à 3. 2. Comparez les tailles : un /24 est quatre fois plus petit qu'un /22. 3. 256 − 4. 4. Les adresses .0, .1 et .2 sont réservées. 5. La dernière adresse est réservée pour la diffusion. 6. La passerelle est la deuxième adresse du sous-réseau."
    ],
    "examples": [
      {
        "stdin": "RivieraSoft, éditeur niçois de logiciels, crée son VPC en mode personnalisé avec le bloc\n10.70.0.0/23, découpé en sous-réseaux /24. Google Cloud réserve 4 adresses par sous-réseau.\n\n1) Le /23 contient 2 puissance 9 = 512 adresses.\n2) Il fournit 2 sous-réseaux /24 (256 adresses chacun).\n3) Un /24 offre 256 − 4 = 252 adresses utilisables.\n4) Première utilisable de 10.70.0.0/24 : 10.70.0.3 (.0 réseau, .1 passerelle, .2 DNS).\n5) Dernière utilisable : 10.70.0.254 (.255 réservée pour la diffusion).\n6) Passerelle de 10.70.1.0/24 : 10.70.1.1.",
        "expected": "512 adresses — 2 sous-réseaux /24 — 252 utilisables — première : 10.70.0.3 — dernière : 10.70.0.254 — passerelle : 10.70.1.1",
        "note": "La passerelle (.1) et le DNS interne (.2) sont imposés par Google : un plan d'adressage série réserve ces adresses avant d'attribuer des plages aux machines."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'adresses du bloc /22",
        "stdin": "q:1",
        "expected": "1024||1 024"
      },
      {
        "label": "Question 2 — Nombre de sous-réseaux /24",
        "stdin": "q:2",
        "expected": "4||quatre"
      },
      {
        "label": "Question 3 — Adresses utilisables d'un /24",
        "stdin": "q:3",
        "expected": "252"
      },
      {
        "label": "Question 4 — Première adresse utilisable de 10.40.1.0/24",
        "stdin": "q:4",
        "expected": "10.40.1.3"
      },
      {
        "label": "Question 5 — Dernière adresse utilisable de 10.40.1.0/24",
        "stdin": "q:5",
        "expected": "10.40.1.254"
      },
      {
        "label": "Question 6 — Passerelle de 10.40.2.0/24",
        "stdin": "q:6",
        "expected": "10.40.2.1"
      }
    ],
    "solution": "[Question 1 — Nombre d'adresses du bloc /22]\n1024\n\n[Question 2 — Nombre de sous-réseaux /24]\n4\n\n[Question 3 — Adresses utilisables d'un /24]\n252\n\n[Question 4 — Première adresse utilisable de 10.40.1.0/24]\n10.40.1.3\n\n[Question 5 — Dernière adresse utilisable de 10.40.1.0/24]\n10.40.1.254\n\n[Question 6 — Passerelle de 10.40.2.0/24]\n10.40.2.1",
    "takeaway": "1) Un /22 contient 2 puissance 10 = 1024 adresses (de 10.40.0.0 à 10.40.3.255).\n2) Un /22 se découpe en 4 sous-réseaux /24 : 10.40.0.0/24, 10.40.1.0/24, 10.40.2.0/24 et 10.40.3.0/24.\n3) Un /24 contient 256 adresses, moins les 4 réservées : 252 adresses utilisables.\n4) La première adresse utilisable est 10.40.1.3 : .0 est l'adresse du réseau, .1 la passerelle, .2 le DNS interne.\n5) La dernière adresse utilisable est 10.40.1.254 : .255 est réservée pour la diffusion.\n6) La passerelle est la deuxième adresse du sous-réseau : 10.40.2.1.\nContrôle : 252 utilisables × 4 sous-réseaux = 1008 adresses attribuables, et 1024 − 1008 = 16, soit 4 réservations × 4 sous-réseaux."
  },
  {
    "id": "gcp3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Les règles de pare-feu du VPC de Claravue",
    "exampleTitle": "Exemple résolu — les règles de TransOcéan",
    "goal": "Appliquer les priorités et les tags réseau des règles de pare-feu VPC pour prévoir le sort d'un flux.",
    "brief": "<p><strong>Énoncé.</strong> Claravue, éditeur strasbourgeois de SaaS juridique, audite les règles de pare-feu de son VPC <code>claravue-vpc</code>. Quatre règles sont en place :</p><table><tr><th>Règle</th><th>Priorité</th><th>Sens</th><th>Action</th><th>Protocole/Port</th><th>Cible</th></tr><tr><th>allow-web</th><td>500</td><td>ingress</td><td>ALLOW</td><td>tcp:80</td><td>tag « web »</td></tr><tr><th>deny-web</th><td>1000</td><td>ingress</td><td>DENY</td><td>tcp:80</td><td>tag « web »</td></tr><tr><th>allow-ssh-bastion</th><td>100</td><td>ingress</td><td>ALLOW</td><td>tcp:22</td><td>tag « bastion »</td></tr><tr><th>allow-internal</th><td>65535</td><td>ingress</td><td>ALLOW</td><td>icmp</td><td>toutes les VM</td></tr></table><p>Rappel du cours : en cas de chevauchement, la règle à la priorité numérique la plus basse l'emporte ; le trafic entrant non couvert par une règle est refusé implicitement.</p><ol><li>Une requête HTTP (tcp:80) arrive d'Internet sur une VM taguée « web » : est-elle autorisée ?</li><li>Quel principe départage les deux règles contradictoires qui correspondent à cette requête ?</li><li>Une requête SSH (tcp:22) arrive d'Internet sur cette même VM « web » : est-elle autorisée ?</li><li>La règle allow-ssh-bastion s'applique-t-elle à une VM sans aucun tag ?</li><li>Quelle est la priorité par défaut d'une règle créée sans préciser l'option de priorité ?</li><li>Comment nomme-t-on les étiquettes appliquées aux VM pour cibler les règles de pare-feu (deux mots) ?</li></ol>",
    "starter": "# Exercice — Les règles de pare-feu du VPC de Claravue\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 4 : oui ou non. Questions 2, 5 et 6 : réponses courtes.\n\n[Question 1 — Requête HTTP autorisée sur la VM web ?]\nA_COMPLETER\n\n[Question 2 — Principe départageant deux règles contradictoires]\nA_COMPLETER\n\n[Question 3 — Requête SSH autorisée sur la VM web ?]\nA_COMPLETER\n\n[Question 4 — allow-ssh-bastion s'applique-t-elle à une VM sans tag ?]\nA_COMPLETER\n\n[Question 5 — Priorité par défaut d'une règle sans option de priorité]\nA_COMPLETER\n\n[Question 6 — Étiquettes ciblant les VM (deux mots)]\nA_COMPLETER\n",
    "hints": [
      "Listez les règles qui correspondent au flux (port, sens, cible) : si aucune ne correspond, le refus implicite s'applique.",
      "Entre deux règles applicables, celle qui a la valeur de priorité la plus petite est évaluée en premier et l'emporte.",
      "1. Deux règles couvrent tcp:80 sur le tag « web ». 2. Comparez 500 et 1000. 3. Aucune règle ne couvre tcp:22 pour le tag « web ». 4. La cible de allow-ssh-bastion est un tag précis. 5. Sans option de priorité, Google Cloud applique une valeur standard. 6. On les appelle des tags... réseau."
    ],
    "examples": [
      {
        "stdin": "TransOcéan, opérateur de ferries, audite son VPC :\n- allow-api : priorité 600, ingress, ALLOW, tcp:443, tag « api » ;\n- deny-api : priorité 1500, ingress, DENY, tcp:443, tag « api » ;\n- allow-ssh : priorité 250, ingress, ALLOW, tcp:22, tag « admin ».\n\n1) HTTPS sur une VM « api » : allow-api (600) l'emporte sur deny-api (1500) → autorisée.\n2) Le départage se fait par la priorité la plus basse.\n3) SSH sur une VM « api » : aucune règle ne correspond → bloquée (refus implicite).\n4) allow-ssh ne s'applique pas à une VM sans tag.\n5) Priorité par défaut : 1000.\n6) Les étiquettes de ciblage : les tags réseau.",
        "expected": "HTTPS autorisé (priorité 600) — départage : priorité la plus basse — SSH bloqué — règle non applicable sans tag — priorité par défaut : 1000 — tags réseau",
        "note": "Le refus implicite protège tout flux entrant oublié : en pare-feu VPC, ce qui n'est pas explicitement autorisé est refusé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Requête HTTP autorisée sur la VM web ?",
        "stdin": "q:1",
        "expected": "oui"
      },
      {
        "label": "Question 2 — Principe départageant deux règles contradictoires",
        "stdin": "q:2",
        "expected": "la priorité la plus basse||priorité la plus basse||la priorité numérique la plus basse||la valeur de priorité la plus petite||priorité la plus petite"
      },
      {
        "label": "Question 3 — Requête SSH autorisée sur la VM web ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — allow-ssh-bastion s'applique-t-elle à une VM sans tag ?",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Priorité par défaut d'une règle sans option de priorité",
        "stdin": "q:5",
        "expected": "1000||1 000"
      },
      {
        "label": "Question 6 — Étiquettes ciblant les VM (deux mots)",
        "stdin": "q:6",
        "expected": "tags réseau||tag réseau||les tags réseau||network tags"
      }
    ],
    "solution": "[Question 1 — Requête HTTP autorisée sur la VM web ?]\noui\n\n[Question 2 — Principe départageant deux règles contradictoires]\nla priorité la plus basse\n\n[Question 3 — Requête SSH autorisée sur la VM web ?]\nnon\n\n[Question 4 — allow-ssh-bastion s'applique-t-elle à une VM sans tag ?]\nnon\n\n[Question 5 — Priorité par défaut d'une règle sans option de priorité]\n1000\n\n[Question 6 — Étiquettes ciblant les VM (deux mots)]\ntags réseau",
    "takeaway": "1) Oui : allow-web (priorité 500) et deny-web (priorité 1000) correspondent toutes deux, mais 500 est inférieur à 1000, donc allow-web l'emporte.\n2) Le départage se fait par la priorité : la règle à la valeur numérique la plus basse est évaluée en premier.\n3) Non : aucune règle ne couvre tcp:22 pour le tag « web » ; le trafic entrant non autorisé est refusé implicitement.\n4) Non : allow-ssh-bastion cible le tag « bastion » ; une VM sans tag ne la déclenche pas.\n5) La priorité par défaut est 1000, appliquée quand l'option de priorité est absente.\n6) Les tags réseau : ces étiquettes posées sur les VM permettent aux règles de cibler précisément certaines machines.\nContrôle : allow-internal, priorité 65535, ne peut jamais prendre le pas sur une règle plus précise — c'est la valeur maximale, elle ne sert que de filet de secours."
  },
  {
    "id": "gcp3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Interconnexions et répartiteur global : HeliosPay",
    "exampleTitle": "Exemple résolu — la plateforme de NoctuaData",
    "goal": "Choisir l'interconnexion réseau selon le débit et les contraintes, et raisonner sur le répartiteur de charge mondial.",
    "brief": "<p><strong>Énoncé.</strong> HeliosPay, processeur de paiements basé au Luxembourg, exploite son VPC principal en europe-west3 et doit le relier à son datacenter sur site. Les trois options étudiées :</p><table><tr><th>Option</th><th>Débit</th><th>Mise en place</th><th>Coût</th></tr><tr><th>Cloud VPN</th><td>quelques Gbps par tunnel, sur Internet public chiffré</td><td>minutes</td><td>modeste</td></tr><tr><th>Dedicated Interconnect</th><td>10 à 200 Gbps, réseau privé</td><td>plusieurs semaines</td><td>élevé</td></tr><tr><th>VPC Peering</th><td>liaison entre deux VPC, sans transit</td><td>minutes</td><td>modeste</td></tr></table><p>Deux besoins se présentent : (a) une réplication continue de 1,5 Gbps chiffrée, à déployer cette semaine avec un budget serré ; (b) un flux de marché de 40 Gbps en continu, sur réseau privé avec engagement de haute disponibilité. Par ailleurs, le frontal public est servi par un répartiteur de charge HTTP(S) mondial, dont les health checks sondent le port 8080 des backends.</p><ol><li>Quelle option retenir pour le besoin (a) ?</li><li>Quelle option retenir pour le besoin (b) ?</li><li>Le trafic entre deux VPC appairés peut-il transiter vers un troisième VPC via le premier ?</li><li>Grâce à son adresse IP anycast unique, vers quoi le répartiteur mondial route-t-il chaque requête ?</li><li>La règle de pare-feu autorisant les plages de health checks a été supprimée : dans quel état passent les backends alors qu'ils fonctionnent parfaitement (mot anglais) ?</li><li>Quelle est la conséquence pour les utilisateurs si tous les backends passent dans cet état ?</li></ol>",
    "starter": "# Exercice — Interconnexions et répartiteur global : HeliosPay\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nom de l'option. Question 3 : oui ou non. Questions 4 à 6 : réponses courtes.\n\n[Question 1 — Option pour le besoin (a)]\nA_COMPLETER\n\n[Question 2 — Option pour le besoin (b)]\nA_COMPLETER\n\n[Question 3 — Transit possible via un VPC appairé ?]\nA_COMPLETER\n\n[Question 4 — Destination du routage anycast]\nA_COMPLETER\n\n[Question 5 — État des backends sans règle de health checks (mot anglais)]\nA_COMPLETER\n\n[Question 6 — Conséquence pour les utilisateurs]\nA_COMPLETER\n",
    "hints": [
      "Classez les besoins sur trois axes : débit réellement requis, réseau privé ou Internet, et contrainte de délai de mise en place.",
      "Le peering relie deux VPC mais n'est pas transitif : il ne remplace ni un VPN ni une interconnexion avec un site externe.",
      "1. 1,5 Gbps chiffré, vite et pas cher. 2. 40 Gbps privé et garanti. 3. Un appariement est un lien direct entre deux réseaux. 4. L'anycast diffuse la même IP partout dans le monde. 5. Les sondes bloquées font croire les backends défaillants. 6. Un répartiteur sans backend sain ne peut plus servir."
    ],
    "examples": [
      {
        "stdin": "NoctuaData, hébergeur brestois, relie son VPC à son datacenter :\n(a) sauvegarde nocturne de 2 Gbps chiffrée, à déployer aujourd'hui → Cloud VPN ;\n(b) flux continu de 100 Gbps sur réseau privé avec engagement de disponibilité → Dedicated Interconnect ;\nle peering entre deux VPC ne transite pas vers un troisième ;\nle répartiteur mondial anycast route vers le point de présence le plus proche ;\nsans règle de health checks, les backends passent unhealthy ;\nles utilisateurs reçoivent alors des erreurs : le service est indisponible.\n\n1) (a) : Cloud VPN.\n2) (b) : Dedicated Interconnect.\n3) Non, le peering n'est pas transitif.\n4) Vers le point de présence (et le backend) le plus proche.\n5) Les backends passent unhealthy.\n6) Le service devient indisponible.",
        "expected": "(a) Cloud VPN — (b) Dedicated Interconnect — pas de transit — anycast : le plus proche — unhealthy — service indisponible",
        "note": "Les health checks du répartiteur mondial proviennent de plages précises (35.191.0.0/16 et 130.211.0.0/22) : les autoriser dans le pare-feu VPC fait partie du déploiement, sous peine de panne fantôme."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Option pour le besoin (a)",
        "stdin": "q:1",
        "expected": "Cloud VPN||un Cloud VPN||cloud vpn"
      },
      {
        "label": "Question 2 — Option pour le besoin (b)",
        "stdin": "q:2",
        "expected": "Dedicated Interconnect||un Dedicated Interconnect||Interconnect||dedicated interconnect"
      },
      {
        "label": "Question 3 — Transit possible via un VPC appairé ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Destination du routage anycast",
        "stdin": "q:4",
        "expected": "le point de présence le plus proche||point de présence le plus proche||le backend le plus proche||le point le plus proche||le plus proche"
      },
      {
        "label": "Question 5 — État des backends sans règle de health checks (mot anglais)",
        "stdin": "q:5",
        "expected": "unhealthy||non sains||défaillants"
      },
      {
        "label": "Question 6 — Conséquence pour les utilisateurs",
        "stdin": "q:6",
        "expected": "le service devient indisponible||service indisponible||le service est indisponible||indisponibilité du service||des erreurs||ils ne peuvent plus accéder au service"
      }
    ],
    "solution": "[Question 1 — Option pour le besoin (a)]\nCloud VPN\n\n[Question 2 — Option pour le besoin (b)]\nDedicated Interconnect\n\n[Question 3 — Transit possible via un VPC appairé ?]\nnon\n\n[Question 4 — Destination du routage anycast]\nle point de présence le plus proche\n\n[Question 5 — État des backends sans règle de health checks (mot anglais)]\nunhealthy\n\n[Question 6 — Conséquence pour les utilisateurs]\nle service devient indisponible",
    "takeaway": "1) Besoin (a) : Cloud VPN — 1,5 Gbps tient dans un tunnel chiffré sur Internet, la mise en place est quasi immédiate et le coût modeste.\n2) Besoin (b) : Dedicated Interconnect — 40 Gbps en continu sur réseau privé avec engagement de disponibilité dépasse ce qu'un VPN peut offrir ; l'Interconnect s'impose malgré son délai et son coût.\n3) Non : le peering est un lien direct entre deux VPC ; il n'offre pas de transit — le trafic ne peut pas traverser un VPC appairé pour atteindre un troisième.\n4) L'adresse anycast est annoncée depuis le monde entier : chaque requête est routée vers le point de présence — donc le backend — le plus proche de l'utilisateur.\n5) Sans la règle autorisant les plages de health checks, les sondes sont bloquées : tous les backends passent unhealthy.\n6) Le répartiteur retire alors tous les backends de la rotation : le service devient indisponible pour les utilisateurs, alors que les instances tournent parfaitement.\nContrôle : c'est la panne fantôme classique — la cause est une règle de pare-feu oubliée, pas une défaillance applicative."
  },
  {
    "id": "gcp3-c5-e1",
    "chapter": 5,
    "title": "Analyse du cycle de vie et des classes Cloud Storage",
    "level": "n1",
    "language": "analyse",
    "goal": "Évaluer une condition de cycle de vie sans assimiler une simulation à une transition réelle.",
    "brief": "<p>Pour cette grille, les quatre classes <code>STANDARD</code>, <code>NEARLINE</code>, <code>COLDLINE</code> et <code>ARCHIVE</code> sont utilisées dans des buckets non zonaux compatibles. Les durées minimales de facturation de Nearline, Coldline et Archive sont respectivement de 30, 90 et 365 jours ; ce ne sont pas automatiquement les seuils d’âge des règles.<br>\nLa classe <code>RAPID</code> est la cinquième classe : elle est réservée à Rapid Bucket zonal. L’action de cycle de vie <code>SetStorageClass</code> n’est pas prise en charge sur ces buckets et ne permet pas d’y faire transiter des objets depuis les autres classes via cette action.<br><br>\nPour <code>LIFECYCLE_EVAL bucket_type=&lt;NON_ZONAL|RAPID&gt; current_class=&lt;class&gt; age_days=&lt;N&gt; target_class=&lt;class&gt; min_age=&lt;M&gt;</code>, afficher <code>LIFECYCLE: current=&lt;cur&gt; target=&lt;target&gt; age=&lt;N&gt; action=&lt;action&gt; status=&lt;statut&gt;</code>.<br>\n- Si le bucket ou l’une des classes est Rapid : <code>action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS</code>.<br>\n- Pour les transitions non zonales compatibles présentées ici, si <code>age_days &gt;= min_age</code> : <code>action=TRANSITION_ELIGIBLE status=CONDITION_MET</code> ; sinon : <code>action=NONE status=CONDITION_NOT_MET</code>.<br>\nCette grille ne vérifie ni les autres conditions ni les frais, et ne réalise pas de transition. Une règle de cycle de vie est exécutée de façon asynchrone ; une condition remplie ne prouve pas qu’une transition a déjà eu lieu. Sources : <a href=\"https://docs.cloud.google.com/storage/docs/storage-classes\">classes de stockage</a> et <a href=\"https://docs.cloud.google.com/storage/docs/rapid/rapid-bucket\">Rapid Bucket</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e1) — Analyse du cycle de vie et des classes Cloud Storage\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Condition d âge non atteinte]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=NEARLINE age_days=60 target_class=COLDLINE min_age=90\nA_COMPLETER\n\n[Cas 2 — Objet ancien admissible à une transition vers Archive]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=COLDLINE age_days=400 target_class=ARCHIVE min_age=365\nA_COMPLETER\n\n[Cas 3 — Transition impossible depuis un bucket Rapid]\n# Données : LIFECYCLE_EVAL bucket_type=RAPID current_class=RAPID age_days=100 target_class=NEARLINE min_age=30\nA_COMPLETER\n\n[Cas 4 — Rapid ne constitue pas une cible de transition non zonale]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=100 target_class=RAPID min_age=30\nA_COMPLETER\n\n[Cas 5 — Condition satisfaite exactement au seuil]\n# Données : LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=30 target_class=NEARLINE min_age=30\nA_COMPLETER\n",
    "hints": [
      "Écartez d’abord les scénarios Rapid pour SetStorageClass, puis comparez l’âge de l’objet au seuil de la règle.",
      "Une condition satisfaite indique une éligibilité dans la grille, pas une transition réellement exécutée.",
      "Comparez l âge de l objet avec chaque règle de transition (Nearline >= 30 j, Coldline >= 90 j, Archive >= 365 j) ; notez qu une simulation n exécute pas le moteur GCS."
    ],
    "examples": [
      {
        "stdin": "LIFECYCLE_EVAL bucket_type=NON_ZONAL current_class=STANDARD age_days=35 target_class=NEARLINE min_age=30",
        "expected": "LIFECYCLE: current=STANDARD target=NEARLINE age=35 action=TRANSITION_ELIGIBLE status=CONDITION_MET",
        "note": "La condition simulée est satisfaite ; aucune transition réelle n’est observée."
      }
    ],
    "tests": [
      {
        "label": "Condition d âge non atteinte",
        "stdin": "cas:1",
        "expected": "LIFECYCLE: current=NEARLINE target=COLDLINE age=60 action=NONE status=CONDITION_NOT_MET"
      },
      {
        "label": "Objet ancien admissible à une transition vers Archive",
        "stdin": "cas:2",
        "expected": "LIFECYCLE: current=COLDLINE target=ARCHIVE age=400 action=TRANSITION_ELIGIBLE status=CONDITION_MET"
      },
      {
        "label": "Transition impossible depuis un bucket Rapid",
        "stdin": "cas:3",
        "expected": "LIFECYCLE: current=RAPID target=NEARLINE age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS"
      },
      {
        "label": "Rapid ne constitue pas une cible de transition non zonale",
        "stdin": "cas:4",
        "expected": "LIFECYCLE: current=STANDARD target=RAPID age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS"
      },
      {
        "label": "Condition satisfaite exactement au seuil",
        "stdin": "cas:5",
        "expected": "LIFECYCLE: current=STANDARD target=NEARLINE age=30 action=TRANSITION_ELIGIBLE status=CONDITION_MET"
      }
    ],
    "solution": "[Exemple]\nLIFECYCLE: current=STANDARD target=NEARLINE age=35 action=TRANSITION_ELIGIBLE status=CONDITION_MET\n\n[Cas 1 — Condition d âge non atteinte]\nLIFECYCLE: current=NEARLINE target=COLDLINE age=60 action=NONE status=CONDITION_NOT_MET\n\n[Cas 2 — Objet ancien admissible à une transition vers Archive]\nLIFECYCLE: current=COLDLINE target=ARCHIVE age=400 action=TRANSITION_ELIGIBLE status=CONDITION_MET\n\n[Cas 3 — Transition impossible depuis un bucket Rapid]\nLIFECYCLE: current=RAPID target=NEARLINE age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS\n\n[Cas 4 — Rapid ne constitue pas une cible de transition non zonale]\nLIFECYCLE: current=STANDARD target=RAPID age=100 action=NONE status=UNSUPPORTED_SET_STORAGE_CLASS\n\n[Cas 5 — Condition satisfaite exactement au seuil]\nLIFECYCLE: current=STANDARD target=NEARLINE age=30 action=TRANSITION_ELIGIBLE status=CONDITION_MET",
    "takeaway": "À retenir : Évaluer une condition de cycle de vie sans assimiler une simulation à une transition réelle.\nRepère : La condition simulée est satisfaite ; aucune transition réelle n’est observée."
  },
  {
    "id": "gcp3-c5-e2",
    "chapter": 5,
    "title": "Sélecteur de données GCP et objectifs de disponibilité",
    "level": "n2",
    "language": "analyse",
    "goal": "Comparer des services candidats et conditionner les objectifs SLA à la configuration donnée.",
    "brief": "<p>Cette matrice pédagogique propose un service à étudier ; elle ne démontre pas qu’il est le seul choix adapté. Un objectif mensuel de disponibilité (SLO du SLA) ne garantit pas l’absence de panne et reste soumis aux conditions du contrat.<br><br>\nPour les cas relationnels, <code>SELECT_DB model=RELATIONAL choice=&lt;SQL|SPANNER&gt; ... eligible=&lt;YES|NO|UNKNOWN&gt;</code> désigne le service étudié. <code>eligible=YES</code> suppose ici que les conditions de couverture du SLA sont réunies ; en cas de données insuffisantes ou de non-couverture, afficher <code>slo_mensuel=NON_DETERMINE</code> plutôt qu’inventer un objectif.<br>\nCloud SQL : pour une instance HA admissible à cœurs dédiés, <code>edition=ENTERPRISE</code> donne <code>99.95%</code> et <code>edition=ENTERPRISE_PLUS</code> donne <code>99.99%</code>. Le SLA exclut notamment les instances à cœurs partagés et mono-zone ; son calcul est par instance et mois calendaire. Vérifier aussi moteur, maintenance et autres exclusions.<br>\nSpanner : une configuration <code>MULTI_REGION</code> ou <code>DUAL_REGION</code> admissible a un objectif de <code>99.999%</code> ; une configuration <code>REGIONAL</code> a un objectif de <code>99.99%</code> hors Stockholm et <code>99.95%</code> à Stockholm. Si la configuration ou la région nécessaire manque, l’objectif est non déterminé. Le calcul est mensuel par projet et région.<br>\nPour les autres modèles de cette grille, proposer Firestore pour <code>NOSQL_DOCUMENT</code>, Bigtable pour <code>NOSQL_WIDE_COLUMN</code>, ou Cloud Storage pour <code>OBJECT_STORAGE</code>.<br>\nRetourner <code>RECOMMENDATION: service=&lt;nom&gt; &lt;attributs...&gt;</code>. Références consultées le 30 octobre 2026 : <a href=\"https://cloud.google.com/sql/sla\">SLA Cloud SQL</a> et <a href=\"https://cloud.google.com/spanner/sla\">SLA Spanner</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e2) — Sélecteur de données GCP et objectifs de disponibilité\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cloud SQL Enterprise en haute disponibilité]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=HA instance=DEDICATED eligible=YES\nA_COMPLETER\n\n[Cas 2 — Cloud SQL Enterprise Plus en haute disponibilité]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE_PLUS availability=HA instance=DEDICATED eligible=YES\nA_COMPLETER\n\n[Cas 3 — Couverture Cloud SQL absente ou inconnue]\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=HA instance=SHARED_CORE eligible=NO\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=SINGLE_ZONE instance=DEDICATED eligible=NO\n# Données : SELECT_DB model=RELATIONAL scale=REGIONAL choice=SQL edition=ENTERPRISE availability=HA instance=DEDICATED eligible=UNKNOWN\nA_COMPLETER\n\n[Cas 4 — Spanner régional hors Stockholm et birégional]\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=REGIONAL region=PARIS eligible=YES\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=DUAL_REGION eligible=YES\nA_COMPLETER\n\n[Cas 5 — Spanner régional à Stockholm]\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=REGIONAL region=STOCKHOLM eligible=YES\nA_COMPLETER\n\n[Cas 6 — Configuration Spanner non précisée]\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=UNKNOWN eligible=UNKNOWN\n# Données : SELECT_DB model=RELATIONAL choice=SPANNER config=REGIONAL region=UNKNOWN eligible=YES\nA_COMPLETER\n\n[Cas 7 — Trois modèles non relationnels]\n# Données : SELECT_DB model=NOSQL_WIDE_COLUMN\n# Données : SELECT_DB model=NOSQL_DOCUMENT\n# Données : SELECT_DB model=OBJECT_STORAGE\nA_COMPLETER\n",
    "hints": [
      "Ne déduisez pas le SLO de la seule échelle régionale ou mondiale : vérifiez l’édition, la haute disponibilité, la configuration et la couverture.",
      "Distinguez l’objectif contractuel mensuel d’une garantie de fonctionnement continu.",
      "Associez relationnel mondial à Cloud Spanner, transactionnel régional à Cloud SQL et analytique colonne à BigQuery en conditionnant le SLA à la topologie."
    ],
    "examples": [
      {
        "stdin": "SELECT_DB model=RELATIONAL scale=GLOBAL choice=SPANNER config=MULTI_REGION eligible=YES",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=MULTI_REGION slo_mensuel=99.999%",
        "note": "Objectif mensuel de la configuration indiquée, sous réserve des conditions du SLA."
      }
    ],
    "tests": [
      {
        "label": "Cloud SQL Enterprise en haute disponibilité",
        "stdin": "cas:1",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=99.95%"
      },
      {
        "label": "Cloud SQL Enterprise Plus en haute disponibilité",
        "stdin": "cas:2",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE_PLUS availability=HA slo_mensuel=99.99%"
      },
      {
        "label": "Couverture Cloud SQL absente ou inconnue",
        "stdin": "cas:3",
        "expected": "RECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=SINGLE_ZONE slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE"
      },
      {
        "label": "Spanner régional hors Stockholm et birégional",
        "stdin": "cas:4",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=PARIS slo_mensuel=99.99%\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=DUAL_REGION slo_mensuel=99.999%"
      },
      {
        "label": "Spanner régional à Stockholm",
        "stdin": "cas:5",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=STOCKHOLM slo_mensuel=99.95%"
      },
      {
        "label": "Configuration Spanner non précisée",
        "stdin": "cas:6",
        "expected": "RECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=UNKNOWN slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=UNKNOWN slo_mensuel=NON_DETERMINE"
      },
      {
        "label": "Trois modèles non relationnels",
        "stdin": "cas:7",
        "expected": "RECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS\nRECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW\nRECOMMENDATION: service=Cloud_Storage type=BLOB_STORE"
      }
    ],
    "solution": "[Exemple]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=MULTI_REGION slo_mensuel=99.999%\n\n[Cas 1 — Cloud SQL Enterprise en haute disponibilité]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=99.95%\n\n[Cas 2 — Cloud SQL Enterprise Plus en haute disponibilité]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE_PLUS availability=HA slo_mensuel=99.99%\n\n[Cas 3 — Couverture Cloud SQL absente ou inconnue]\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=SINGLE_ZONE slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_SQL type=RDBMS edition=ENTERPRISE availability=HA slo_mensuel=NON_DETERMINE\n\n[Cas 4 — Spanner régional hors Stockholm et birégional]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=PARIS slo_mensuel=99.99%\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=DUAL_REGION slo_mensuel=99.999%\n\n[Cas 5 — Spanner régional à Stockholm]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=STOCKHOLM slo_mensuel=99.95%\n\n[Cas 6 — Configuration Spanner non précisée]\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=UNKNOWN slo_mensuel=NON_DETERMINE\nRECOMMENDATION: service=Cloud_Spanner type=NEW_SQL config=REGIONAL region=UNKNOWN slo_mensuel=NON_DETERMINE\n\n[Cas 7 — Trois modèles non relationnels]\nRECOMMENDATION: service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS\nRECOMMENDATION: service=Firestore type=DOCUMENT_DB latency=LOW\nRECOMMENDATION: service=Cloud_Storage type=BLOB_STORE",
    "takeaway": "À retenir : Comparer des services candidats et conditionner les objectifs SLA à la configuration donnée.\nRepère : Objectif mensuel de la configuration indiquée, sous réserve des conditions du SLA."
  },
  {
    "id": "gcp3-c5-e3",
    "chapter": 5,
    "title": "Analyse de messages et de relivraison Pub/Sub",
    "level": "n3",
    "language": "analyse",
    "goal": "Distinguer acquittement observé, délai en cours et possibilité de relivraison.",
    "brief": "<p>Cette grille représente un abonnement Pub/Sub standard et un message encore retenu, sans simuler de file de lettres mortes ni de requête réelle.<br>\n<code>CREATE_SUB sub=&lt;nom&gt; ack_deadline=&lt;secondes&gt;</code> retourne <code>SUB_READY: name=&lt;nom&gt; ack_deadline=&lt;secondes&gt;s</code>.<br>\n<code>DELIVER_MSG sub=&lt;nom&gt; msg_id=&lt;id&gt; elapsed_time=&lt;secondes&gt; effective_deadline=&lt;secondes&gt; ack=&lt;YES|NO|NACK&gt;</code> décrit une observation. <code>effective_deadline</code> est le délai effectif fourni dans le cas, compte tenu d’une éventuelle prolongation ; <code>ack=YES</code> signifie qu’un acquittement a déjà été accepté, <code>ack=NO</code> qu’aucun n’est connu, et <code>ack=NACK</code> qu’un refus a été émis.<br>\nPour un abonnement connu, retourner <code>DELIVERY: sub=&lt;nom&gt; msg_id=&lt;id&gt; status=&lt;statut&gt; action=&lt;action&gt;</code> :<br>\n- acquittement accepté : <code>status=ACKNOWLEDGED action=NONE</code> ; cela ne prouve pas l’absence de doublons dans une livraison standard ;<br>\n- sans acquittement avant le délai effectif : <code>status=WAITING_FOR_ACK action=NONE</code> ;<br>\n- sans acquittement à partir du délai effectif : <code>status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE</code> ;<br>\n- refus explicite : <code>status=NACKED action=REDELIVERY_POSSIBLE</code>.<br>\nSi l’abonnement est inconnu, retourner <code>DELIVERY: sub=&lt;nom&gt; status=ERROR_SUBSCRIPTION_NOT_FOUND</code>.<br><br>\nUne nouvelle tentative peut cibler le même client ou un autre ; elle n’est ni la preuve d’une panne ni une livraison immédiate garantie. La politique de retry, les prolongations, la rétention et une éventuelle file de lettres mortes influencent le parcours. Voir la <a href=\"https://docs.cloud.google.com/pubsub/docs/subscription-retry-policy\">politique de retry Pub/Sub</a>.</p>",
    "starter": "# Grille d'analyse (gcp3-c5-e3) — Analyse de messages et de relivraison Pub/Sub\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Prolongation du délai encore en cours]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=10\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-1 elapsed_time=14 effective_deadline=30 ack=NO\nA_COMPLETER\n\n[Cas 2 — Abonnement inconnu]\n# Données : DELIVER_MSG sub=unknown-sub msg_id=MSG-1 elapsed_time=5 effective_deadline=10 ack=NO\nA_COMPLETER\n\n[Cas 3 — Délai atteint sans acquittement connu]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-2 elapsed_time=30 effective_deadline=30 ack=NO\nA_COMPLETER\n\n[Cas 4 — Refus explicite du message]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-3 elapsed_time=3 effective_deadline=30 ack=NACK\nA_COMPLETER\n\n[Cas 5 — Acquittement explicitement accepté]\n# Données : CREATE_SUB sub=analytics-sink ack_deadline=30\n# Données : DELIVER_MSG sub=analytics-sink msg_id=LOG-4 elapsed_time=6 effective_deadline=30 ack=YES\nA_COMPLETER\n",
    "hints": [
      "Ne supposez jamais qu’un message est acquitté à partir du seul temps écoulé : l’état ack est fourni.",
      "Comparez elapsed_time au délai effectif, éventuellement prolongé ; une relivraison est possible, pas certaine.",
      "Vérifiez si l acquittement (ack) arrive avant l expiration de ack_deadline : au-delà du délai, Pub/Sub déclenche une relivraison possible (at-least-once)."
    ],
    "examples": [
      {
        "stdin": "CREATE_SUB sub=order-processor ack_deadline=10\nDELIVER_MSG sub=order-processor msg_id=ORD-999 elapsed_time=6 effective_deadline=10 ack=YES\nDELIVER_MSG sub=order-processor msg_id=ORD-1000 elapsed_time=14 effective_deadline=10 ack=NO",
        "expected": "SUB_READY: name=order-processor ack_deadline=10s\nDELIVERY: sub=order-processor msg_id=ORD-999 status=ACKNOWLEDGED action=NONE\nDELIVERY: sub=order-processor msg_id=ORD-1000 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE",
        "note": "Le premier acquittement est connu ; une nouvelle tentative est possible pour le second message."
      }
    ],
    "tests": [
      {
        "label": "Prolongation du délai encore en cours",
        "stdin": "cas:1",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=10s\nDELIVERY: sub=analytics-sink msg_id=LOG-1 status=WAITING_FOR_ACK action=NONE"
      },
      {
        "label": "Abonnement inconnu",
        "stdin": "cas:2",
        "expected": "DELIVERY: sub=unknown-sub status=ERROR_SUBSCRIPTION_NOT_FOUND"
      },
      {
        "label": "Délai atteint sans acquittement connu",
        "stdin": "cas:3",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-2 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE"
      },
      {
        "label": "Refus explicite du message",
        "stdin": "cas:4",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-3 status=NACKED action=REDELIVERY_POSSIBLE"
      },
      {
        "label": "Acquittement explicitement accepté",
        "stdin": "cas:5",
        "expected": "SUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-4 status=ACKNOWLEDGED action=NONE"
      }
    ],
    "solution": "[Exemple]\nSUB_READY: name=order-processor ack_deadline=10s\nDELIVERY: sub=order-processor msg_id=ORD-999 status=ACKNOWLEDGED action=NONE\nDELIVERY: sub=order-processor msg_id=ORD-1000 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE\n\n[Cas 1 — Prolongation du délai encore en cours]\nSUB_READY: name=analytics-sink ack_deadline=10s\nDELIVERY: sub=analytics-sink msg_id=LOG-1 status=WAITING_FOR_ACK action=NONE\n\n[Cas 2 — Abonnement inconnu]\nDELIVERY: sub=unknown-sub status=ERROR_SUBSCRIPTION_NOT_FOUND\n\n[Cas 3 — Délai atteint sans acquittement connu]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-2 status=DEADLINE_EXPIRED action=REDELIVERY_POSSIBLE\n\n[Cas 4 — Refus explicite du message]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-3 status=NACKED action=REDELIVERY_POSSIBLE\n\n[Cas 5 — Acquittement explicitement accepté]\nSUB_READY: name=analytics-sink ack_deadline=30s\nDELIVERY: sub=analytics-sink msg_id=LOG-4 status=ACKNOWLEDGED action=NONE",
    "takeaway": "À retenir : Distinguer acquittement observé, délai en cours et possibilité de relivraison.\nRepère : Le premier acquittement est connu ; une nouvelle tentative est possible pour le second message."
  },
  {
    "id": "gcp3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Chercher un incident dans Cloud Logging : TransVille",
    "exampleTitle": "Exemple résolu — l'incident de PharePilote",
    "goal": "Lire une entrée de journal, filtrer par sévérité et exporter durablement avec un sink.",
    "brief": "<p><strong>Énoncé.</strong> TransVille, réseau de transport nancéien, consolide ses journaux dans Cloud Logging. Chaque entrée se lit <code>type_ressource:SEVERITE:message</code> :</p><pre><code>gce_instance:ERROR:Disk quota exceeded\ncloud_run:INFO:Deploy success\ngce_instance:CRITICAL:Kernel panic\ncloud_run:WARNING:Slow response</code></pre><p>Les sévérités, de la plus bénigne à la plus grave, sont : DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, ALERT, EMERGENCY.</p><p>La nuit du 12 mars, un disque plein a provoqué un incident : l'entrée correspondante porte la sévérité ERROR. L'équipe veut par ailleurs exporter tous les journaux d'audit vers BigQuery.</p><ol><li>Quelle sévérité porte l'entrée « Disk quota exceeded » ?</li><li>Quelle valeur de seuil de sévérité capture à la fois ERROR et CRITICAL sans inclure WARNING ?</li><li>Quelle est la sévérité la plus grave parmi DEBUG, INFO, WARNING, ERROR et CRITICAL ?</li><li>La sévérité NOTICE est-elle plus ou moins grave que WARNING ?</li><li>Quel mécanisme du routeur de journaux permet d'exporter durablement les journaux d'audit vers BigQuery ?</li><li>Quel service de la suite Operations regroupe les traces de pile non interceptées et alerte les développeurs ?</li></ol>",
    "starter": "# Exercice — Chercher un incident dans Cloud Logging : TransVille\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nom de la sévérité en anglais. Questions 4 à 6 : réponses courtes.\n\n[Question 1 — Sévérité de l'entrée Disk quota exceeded]\nA_COMPLETER\n\n[Question 2 — Seuil de sévérité capturant ERROR et CRITICAL]\nA_COMPLETER\n\n[Question 3 — Sévérité la plus grave de la liste]\nA_COMPLETER\n\n[Question 4 — NOTICE comparée à WARNING]\nA_COMPLETER\n\n[Question 5 — Mécanisme d'export durable du routeur de journaux]\nA_COMPLETER\n\n[Question 6 — Service regroupant les traces de pile non interceptées]\nA_COMPLETER\n",
    "hints": [
      "Les sévérités forment un ordre : un filtre « supérieur ou égal à X » capture X et tout ce qui est plus grave.",
      "Le routeur de journaux (Log Router) achemine chaque entrée vers des destinations : l'export durable porte un nom court.",
      "1. L'énoncé donne la sévérité de l'incident du 12 mars. 2. ERROR capture ERROR et au-delà. 3. Comparez les cinq sévérités de la liste. 4. Placez NOTICE dans l'ordre des sévérités. 5. Un sink exporte vers BigQuery, Cloud Storage ou Pub/Sub. 6. Ce service porte un nom explicite : Error Reporting."
    ],
    "examples": [
      {
        "stdin": "PharePilote, supervision des phares connectés, consolide ses journaux :\ngce_instance:ERROR:Disk quota exceeded\ncloud_run:INFO:Deploy success\ngce_instance:CRITICAL:Kernel panic\n\n1) « Disk quota exceeded » porte la sévérité ERROR.\n2) Le seuil ERROR capture ERROR et CRITICAL, sans WARNING.\n3) La plus grave de la liste : CRITICAL.\n4) NOTICE est moins grave que WARNING.\n5) L'export durable vers BigQuery se fait par un sink du Log Router.\n6) Error Reporting regroupe les traces de pile non interceptées.",
        "expected": "ERROR — seuil : ERROR — la plus grave : CRITICAL — NOTICE moins grave — export par sink — Error Reporting",
        "note": "Un filtre de sévérité supérieure ou égale à ERROR est le réflexe de première investigation : il élimine le bruit des INFO et WARNING tout en conservant les pannes critiques."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Sévérité de l'entrée Disk quota exceeded",
        "stdin": "q:1",
        "expected": "ERROR||error"
      },
      {
        "label": "Question 2 — Seuil de sévérité capturant ERROR et CRITICAL",
        "stdin": "q:2",
        "expected": "ERROR||error"
      },
      {
        "label": "Question 3 — Sévérité la plus grave de la liste",
        "stdin": "q:3",
        "expected": "CRITICAL||critical"
      },
      {
        "label": "Question 4 — NOTICE comparée à WARNING",
        "stdin": "q:4",
        "expected": "moins grave||moins"
      },
      {
        "label": "Question 5 — Mécanisme d'export durable du routeur de journaux",
        "stdin": "q:5",
        "expected": "un sink||sink||un log sink||log sink"
      },
      {
        "label": "Question 6 — Service regroupant les traces de pile non interceptées",
        "stdin": "q:6",
        "expected": "Error Reporting||error reporting"
      }
    ],
    "solution": "[Question 1 — Sévérité de l'entrée Disk quota exceeded]\nERROR\n\n[Question 2 — Seuil de sévérité capturant ERROR et CRITICAL]\nERROR\n\n[Question 3 — Sévérité la plus grave de la liste]\nCRITICAL\n\n[Question 4 — NOTICE comparée à WARNING]\nmoins grave\n\n[Question 5 — Mécanisme d'export durable du routeur de journaux]\nun sink\n\n[Question 6 — Service regroupant les traces de pile non interceptées]\nError Reporting",
    "takeaway": "1) L'entrée gce_instance:ERROR:Disk quota exceeded porte la sévérité ERROR.\n2) Le seuil ERROR : un filtre « sévérité supérieure ou égale à ERROR » capture ERROR, CRITICAL, ALERT et EMERGENCY, sans WARNING ni NOTICE.\n3) CRITICAL est la plus grave des cinq sévérités citées (seules ALERT et EMERGENCY sont plus haut dans l'échelle complète).\n4) NOTICE est moins grave que WARNING : l'ordre est DEBUG, INFO, NOTICE, WARNING, ERROR, CRITICAL, puis ALERT et EMERGENCY.\n5) Un sink : ce mécanisme du routeur de journaux exporte durablement les entrées sélectionnées vers BigQuery, Cloud Storage ou Pub/Sub.\n6) Error Reporting regroupe automatiquement les traces de pile non interceptées par motif d'erreur et alerte les développeurs.\nContrôle : avec un seuil ERROR sur l'extrait, deux entrées sortent (ERROR et CRITICAL) ; l'INFO et la WARNING restent masquées."
  },
  {
    "id": "gcp3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Budgets, alertes et remises : le FinOps de Pixelforge",
    "exampleTitle": "Exemple résolu — le pilotage de Mistral Analytics",
    "goal": "Suivre les seuils d'alerte d'un budget et chiffrer les remises d'engagement CUD sur une base de calcul stable.",
    "brief": "<p><strong>Énoncé.</strong> Pixelforge, studio montpelliérain de jeux vidéo, pilote ses dépenses <strong>Google Cloud Billing</strong> avec un budget mensuel de <strong>8 000 €</strong> et des alertes Pub/Sub aux seuils <strong>50 %, 90 % et 100 %</strong>. Au 17 du mois, la consommation atteint <strong>7 400 €</strong>.</p><p>La base de calcul Compute Engine, stable, compte <strong>40 vCPU</strong> tournant 24 h/24 au tarif à la demande de <strong>20 € par vCPU et par mois</strong>. Le directeur financier étudie deux remises d'engagement GCP (<strong>Committed Use Discounts — CUD</strong>) : <strong>1 an : −37 %</strong>, <strong>3 ans : −55 %</strong> sur les vCPU engagés. La remise <strong>Sustained Use Discount (SUD)</strong>, elle, s'applique automatiquement, sans engagement.</p><ol><li>Quel est le coût mensuel à la demande de la base de calcul ?</li><li>À 7 400 € dépensés sur 8 000 €, quel seuil d'alerte vient d'être franchi (50, 90 ou 100) ?</li><li>Quel serait le coût mensuel de la base avec un CUD 1 an ?</li><li>Quel serait le coût mensuel de la base avec un CUD 3 ans ?</li><li>Quelle économie mensuelle, en euros, le CUD 3 ans procure-t-il par rapport au tarif à la demande ?</li><li>La remise SUD est-elle automatique et sans engagement ?</li></ol>",
    "starter": "# Exercice — Budgets, alertes et remises : le FinOps de Pixelforge\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : les nombres seuls. Question 6 : oui ou non.\n\n[Question 1 — Coût mensuel à la demande de la base]\nA_COMPLETER\n\n[Question 2 — Seuil d'alerte franchi au 17 du mois]\nA_COMPLETER\n\n[Question 3 — Coût mensuel avec CUD 1 an]\nA_COMPLETER\n\n[Question 4 — Coût mensuel avec CUD 3 ans]\nA_COMPLETER\n\n[Question 5 — Économie mensuelle du CUD 3 ans]\nA_COMPLETER\n\n[Question 6 — SUD automatique et sans engagement ?]\nA_COMPLETER\n",
    "hints": [
      "Comparez la consommation au budget en pourcentage, puis confrontez-la aux seuils : le seuil franchi est le plus haut seuil dépassé.",
      "Une remise en pourcentage se retranche du coût : −37 % signifie payer 63 % du prix, −55 % signifie payer 45 %.",
      "1. 40 vCPU × 20 €. 2. 7 400 sur 8 000, c'est plus de 90 %. 3. 800 × 0,63. 4. 800 × 0,45. 5. La différence entre le tarif à la demande et le CUD 3 ans. 6. La SUD ne demande aucun engagement au client."
    ],
    "examples": [
      {
        "stdin": "Mistral Analytics, courtage de données aixois, gère un budget mensuel de 5 000 €,\nalertes à 50, 90 et 100 %. Au 20 du mois : 4 600 € consommés (92 %) → seuil 90 franchi.\nBase de calcul : 25 vCPU à 16 €/vCPU/mois à la demande.\n\n1) Base à la demande : 25 × 16 = 400 €/mois.\n2) Seuil franchi : 90 % (4 600/5 000 = 92 %).\n3) CUD 1 an : 400 × 0,63 = 252 €/mois.\n4) CUD 3 ans : 400 × 0,45 = 180 €/mois.\n5) Économie : 400 − 180 = 220 €/mois.\n6) Oui, la SUD est automatique et sans engagement.",
        "expected": "base : 400 € — seuil 90 — CUD 1 an : 252 € — CUD 3 ans : 180 € — économie : 220 € — SUD automatique",
        "note": "Un CUD s'achète sur une charge stable et prévisible : engager des vCPU qui tourneront de toute façon 24 h/24 transforme une dépense subie en dépense négociée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Coût mensuel à la demande de la base",
        "stdin": "q:1",
        "expected": "800||800,00||800.00"
      },
      {
        "label": "Question 2 — Seuil d'alerte franchi au 17 du mois",
        "stdin": "q:2",
        "expected": "90||90 %||90%||le seuil 90"
      },
      {
        "label": "Question 3 — Coût mensuel avec CUD 1 an",
        "stdin": "q:3",
        "expected": "504||504,00||504.00"
      },
      {
        "label": "Question 4 — Coût mensuel avec CUD 3 ans",
        "stdin": "q:4",
        "expected": "360||360,00||360.00"
      },
      {
        "label": "Question 5 — Économie mensuelle du CUD 3 ans",
        "stdin": "q:5",
        "expected": "440||440,00||440.00"
      },
      {
        "label": "Question 6 — SUD automatique et sans engagement ?",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Coût mensuel à la demande de la base]\n800\n\n[Question 2 — Seuil d'alerte franchi au 17 du mois]\n90\n\n[Question 3 — Coût mensuel avec CUD 1 an]\n504\n\n[Question 4 — Coût mensuel avec CUD 3 ans]\n360\n\n[Question 5 — Économie mensuelle du CUD 3 ans]\n440\n\n[Question 6 — SUD automatique et sans engagement ?]\noui",
    "takeaway": "1) Base à la demande : 40 × 20 = 800 € par mois.\n2) 7 400 ÷ 8 000 = 92,5 % : le seuil de 90 % vient d'être franchi (celui de 100 % ne l'est pas encore).\n3) CUD 1 an : 800 × (1 − 0,37) = 800 × 0,63 = 504 € par mois.\n4) CUD 3 ans : 800 × (1 − 0,55) = 800 × 0,45 = 360 € par mois.\n5) Économie du CUD 3 ans : 800 − 360 = 440 € par mois.\n6) Oui : la remise SUD s'applique automatiquement, sans engagement, quand les instances tournent une part suffisante du mois.\nContrôle : l'écart entre les deux CUD vaut 504 − 360 = 144 € par mois ; sur 36 mois, le CUD 3 ans distancerait le CUD 1 an de 5 184 € — à engager seulement si la flotte reste stable."
  },
  {
    "id": "gcp3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Auditer le manifeste Terraform de NordShield",
    "exampleTitle": "Exemple résolu — l'audit d'Aurora Retail",
    "goal": "Lire un manifeste Terraform, connaître le cycle plan/apply et repérer les mauvaises pratiques de sécurité.",
    "brief": "<p><strong>Énoncé.</strong> NordShield, éditeur lillois de cybersécurité, versionne son infrastructure dans Git. Le manifeste principal :</p><pre><code>provider \"google\" {\n  credentials = file(\"nordshield-key.json\")\n  project     = \"prj-nordshield-prod\"\n  region      = \"europe-west1\"\n}\n\nresource \"google_storage_bucket\" \"backup\" {\n  name          = \"nordshield-backup-eu\"\n  location      = \"EU\"\n  force_destroy = true\n}\n\nterraform {\n  backend \"gcs\" {\n    bucket = \"nordshield-tfstate-eu\"\n  }\n}</code></pre><ol><li>Quelle commande Terraform prévisualise les changements sans les appliquer ?</li><li>Quelle commande applique réellement les changements ?</li><li>Dans quel type de ressource le fichier d'état (state) est-il conservé ici ?</li><li>Quelle mauvaise pratique apparaît dans le bloc provider ?</li><li>Quel danger présente l'option force_destroy = true sur un bucket de sauvegardes ?</li><li>Que se passe-t-il si le fichier nordshield-key.json est poussé sur un dépôt Git public ?</li></ol>",
    "starter": "# Exercice — Auditer le manifeste Terraform de NordShield\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : les commandes complètes. Questions 3 à 6 : réponses courtes.\n\n[Question 1 — Commande de prévisualisation des changements]\nA_COMPLETER\n\n[Question 2 — Commande d'application des changements]\nA_COMPLETER\n\n[Question 3 — Type de ressource hébergeant le state]\nA_COMPLETER\n\n[Question 4 — Mauvaise pratique du bloc provider]\nA_COMPLETER\n\n[Question 5 — Danger de force_destroy = true]\nA_COMPLETER\n\n[Question 6 — Conséquence d'une clé poussée sur un dépôt public]\nA_COMPLETER\n",
    "hints": [
      "Le cycle Terraform s'articule autour de trois commandes : init prépare, une commande calcule sans rien toucher, une autre exécute.",
      "Le fichier d'état mémorise l'état réel des ressources ; le bloc backend du manifeste indique où il vit.",
      "1. Cherchez la commande qui affiche un plan d'exécution. 2. Cherchez celle qui applique ce plan. 3. Lisez le bloc backend. 4. Un fichier d'identifiants ne doit jamais vivre à côté du code. 5. Que ferait terraform destroy sur ce bucket ? 6. Une clé publique est une clé compromise."
    ],
    "examples": [
      {
        "stdin": "Aurora Retail, enseigne de mode, audite son manifeste Terraform :\n- provider google avec credentials = file(\"aurora-key.json\") ;\n- bucket d'archives avec force_destroy = true ;\n- backend gcs nommé aurora-tfstate-eu.\n\n1) terraform plan prévisualise les changements.\n2) terraform apply les applique.\n3) Le state vit dans un bucket Cloud Storage (backend gcs).\n4) Mauvaise pratique : la clé de compte de service stockée dans un fichier local, à côté du code.\n5) force_destroy = true permet à terraform destroy de supprimer le bucket et toutes ses archives.\n6) Poussée sur un dépôt public, la clé est immédiatement compromise : n'importe qui s'authentifie en tant que le compte de service.",
        "expected": "plan prévisualise — apply applique — state dans un bucket Cloud Storage — clé locale interdite — destroy efface tout — clé publique égale clé compromise",
        "note": "Règle d'or : aucune clé ne doit être versionnée ; l'identité du poste ou du pipeline (Application Default Credentials) remplace le fichier de clé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Commande de prévisualisation des changements",
        "stdin": "q:1",
        "expected": "terraform plan"
      },
      {
        "label": "Question 2 — Commande d'application des changements",
        "stdin": "q:2",
        "expected": "terraform apply"
      },
      {
        "label": "Question 3 — Type de ressource hébergeant le state",
        "stdin": "q:3",
        "expected": "un bucket Cloud Storage||bucket Cloud Storage||un bucket GCS||bucket GCS||Cloud Storage||GCS"
      },
      {
        "label": "Question 4 — Mauvaise pratique du bloc provider",
        "stdin": "q:4",
        "expected": "la clé de compte de service dans un fichier local||une clé de compte de service versionnée||le fichier d'identifiants versionné||la clé de compte de service stockée à côté du code||une clé de compte de service stockée à côté du code"
      },
      {
        "label": "Question 5 — Danger de force_destroy = true",
        "stdin": "q:5",
        "expected": "terraform destroy supprime le bucket et toutes ses données||il supprime le bucket et toutes ses données||la suppression du bucket et de ses données||suppression de toutes les données du bucket||terraform destroy efface tout sans confirmation||il efface les sauvegardes"
      },
      {
        "label": "Question 6 — Conséquence d'une clé poussée sur un dépôt public",
        "stdin": "q:6",
        "expected": "la clé est compromise||clé compromise||elle est immédiatement compromise||compromission de la clé||n'importe qui peut s'authentifier||elle est compromise"
      }
    ],
    "solution": "[Question 1 — Commande de prévisualisation des changements]\nterraform plan\n\n[Question 2 — Commande d'application des changements]\nterraform apply\n\n[Question 3 — Type de ressource hébergeant le state]\nun bucket Cloud Storage\n\n[Question 4 — Mauvaise pratique du bloc provider]\nla clé de compte de service dans un fichier local\n\n[Question 5 — Danger de force_destroy = true]\nterraform destroy supprime le bucket et toutes ses données\n\n[Question 6 — Conséquence d'une clé poussée sur un dépôt public]\nla clé est compromise",
    "takeaway": "1) terraform plan : calcule et affiche le plan d'exécution sans modifier l'infrastructure.\n2) terraform apply : applique les changements prévus par le plan.\n3) Le state est conservé dans un bucket Cloud Storage : le bloc backend \"gcs\" désigne nordshield-tfstate-eu.\n4) La clé de compte de service stockée dans un fichier local (credentials = file(\"nordshield-key.json\")) : aucune clé ne doit vivre à côté du code ; l'authentification doit s'appuyer sur l'identité de l'opérateur ou du pipeline.\n5) force_destroy = true autorise terraform destroy à supprimer le bucket et toutes ses données sans confirmation : sur un bucket de sauvegardes, une simple erreur détruit l'intégralité des archives.\n6) La clé est immédiatement compromise : n'importe qui peut s'authentifier en tant que le compte de service et consommer ou exfiltrer les ressources. Il faut la révoquer sans délai, auditer les journaux et purger l'historique Git.\nContrôle : les deux corrections prioritaires sont l'authentification sans clé (identité attachée) et la suppression de force_destroy ; le state, lui, est correctement externalisé dans un bucket dédié."
  }
];
