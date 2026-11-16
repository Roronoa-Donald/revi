'use strict';

module.exports = [
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
    "brief": "<p><strong>Énoncé.</strong> Pixelforge, studio montpelliérain de jeux vidéo, pilote ses dépenses avec un budget mensuel de <strong>8 000 €</strong> et des alertes aux seuils <strong>50 %, 90 % et 100 %</strong>. Au 17 du mois, la consommation atteint <strong>7 400 €</strong>.</p><p>La base de calcul, stable, compte <strong>40 vCPU</strong> tournant 24 h/24 au tarif à la demande de <strong>20 € par vCPU et par mois</strong>. Le directeur financier étudie deux remises d'engagement (CUD) : <strong>1 an : −37 %</strong>, <strong>3 ans : −55 %</strong> sur les vCPU engagés. La remise SUD, elle, s'applique automatiquement, sans engagement.</p><ol><li>Quel est le coût mensuel à la demande de la base de calcul ?</li><li>À 7 400 € dépensés sur 8 000 €, quel seuil d'alerte vient d'être franchi (50, 90 ou 100) ?</li><li>Quel serait le coût mensuel de la base avec un CUD 1 an ?</li><li>Quel serait le coût mensuel de la base avec un CUD 3 ans ?</li><li>Quelle économie mensuelle, en euros, le CUD 3 ans procure-t-il par rapport au tarif à la demande ?</li><li>La remise SUD est-elle automatique et sans engagement ?</li></ol>",
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
