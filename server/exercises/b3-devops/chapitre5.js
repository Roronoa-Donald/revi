'use strict';

module.exports = [
  {
    "id": "do3-c5-e1",
    "chapter": 5,
    "title": "Classificateur de paradigmes d’Infrastructure as Code (Déclaratif vs Impératif)",
    "level": "n1",
    "language": "analyse",
    "goal": "Identifier les propriétés d’idempotence et de gestion d’état d’un outil IaC pour qualifier son adéquation opérationnelle.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nRègles de qualification :<br>\n- <code>ETAT</code> : <code>AVEC_STATE</code> si <code>GESTION_ETAT == OUI</code>, sinon <code>SANS_STATE</code>.<br>\n- <code>USAGE</code> :<br>\n  - Si <code>PARADIGME == DECLARATIF</code>, <code>GESTION_ETAT == OUI</code> et <code>IDEMPOTENT == OUI</code> :<br>\n    <code>USAGE=PROVISIONING_INFRASTRUCTURE_OPTIMAL</code> (ex: Terraform, OpenTofu)<br>\n  - Sinon si <code>PARADIGME == DECLARATIF</code>, <code>GESTION_ETAT == NON</code> et <code>IDEMPOTENT == OUI</code> :<br>\n    <code>USAGE=GESTION_CONFIGURATION_ETATS</code> (ex: Ansible)<br>\n  - Sinon si <code>PARADIGME == IMPERATIF</code> :<br>\n    <code>USAGE=SCRIPT_PROCEDURAL_LEGACY</code> (scripts Shell sans garantie de convergence)<br>\n  - Sinon :<br>\n    <code>USAGE=HYBRIDE_SPECIALISE</code><br><br>\nAfficher :<br>\n<code>OUTIL_IAC: &lt;nom&gt; -&gt; PARADIGME=&lt;PARADIGME&gt; | ETAT=&lt;ETAT&gt; | USAGE=&lt;USAGE&gt;</code></p>",
    "starter": "# Grille d'analyse (do3-c5-e1) — Classificateur de paradigmes d’Infrastructure as Code (Déclaratif vs Impératif)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — OpenTofu provisionneur d’infrastructure moderne]\n# Données : OUTIL nom=opentofu PARADIGME=DECLARATIF GESTION_ETAT=OUI IDEMPOTENT=OUI\nA_COMPLETER\n\n[Cas 2 — Script PowerShell impératif pour maintenance]\n# Données : OUTIL nom=ps_deploy PARADIGME=IMPERATIF GESTION_ETAT=NON IDEMPOTENT=NON\nA_COMPLETER\n\n[Cas 3 — Gestionnaire de paquets idempotent sans fichier d’état]\n# Données : OUTIL nom=puppet_agent PARADIGME=DECLARATIF GESTION_ETAT=NON IDEMPOTENT=OUI\nA_COMPLETER\n",
    "hints": [
      "Le déclaratif décrit « l’état cible désiré », l’impératif dicte « la séquence d’instructions à exécuter ».",
      "L’idempotence garantit qu’appliquer plusieurs fois le même code produit strictement le même résultat."
    ],
    "examples": [
      {
        "stdin": "OUTIL nom=terraform PARADIGME=DECLARATIF GESTION_ETAT=OUI IDEMPOTENT=OUI\nOUTIL nom=ansible PARADIGME=DECLARATIF GESTION_ETAT=NON IDEMPOTENT=OUI\nOUTIL nom=bash_script PARADIGME=IMPERATIF GESTION_ETAT=NON IDEMPOTENT=NON",
        "expected": "OUTIL_IAC: terraform -> PARADIGME=DECLARATIF | ETAT=AVEC_STATE | USAGE=PROVISIONING_INFRASTRUCTURE_OPTIMAL\nOUTIL_IAC: ansible -> PARADIGME=DECLARATIF | ETAT=SANS_STATE | USAGE=GESTION_CONFIGURATION_ETATS\nOUTIL_IAC: bash_script -> PARADIGME=IMPERATIF | ETAT=SANS_STATE | USAGE=SCRIPT_PROCEDURAL_LEGACY",
        "note": "Terraform maintient un tfstate pour provisionner, Ansible configure les machines sans state distant."
      }
    ],
    "tests": [
      {
        "label": "OpenTofu provisionneur d’infrastructure moderne",
        "stdin": "cas:1",
        "expected": "OUTIL_IAC: opentofu -> PARADIGME=DECLARATIF | ETAT=AVEC_STATE | USAGE=PROVISIONING_INFRASTRUCTURE_OPTIMAL"
      },
      {
        "label": "Script PowerShell impératif pour maintenance",
        "stdin": "cas:2",
        "expected": "OUTIL_IAC: ps_deploy -> PARADIGME=IMPERATIF | ETAT=SANS_STATE | USAGE=SCRIPT_PROCEDURAL_LEGACY"
      },
      {
        "label": "Gestionnaire de paquets idempotent sans fichier d’état",
        "stdin": "cas:3",
        "expected": "OUTIL_IAC: puppet_agent -> PARADIGME=DECLARATIF | ETAT=SANS_STATE | USAGE=GESTION_CONFIGURATION_ETATS"
      }
    ],
    "solution": "[Exemple]\nOUTIL_IAC: terraform -> PARADIGME=DECLARATIF | ETAT=AVEC_STATE | USAGE=PROVISIONING_INFRASTRUCTURE_OPTIMAL\nOUTIL_IAC: ansible -> PARADIGME=DECLARATIF | ETAT=SANS_STATE | USAGE=GESTION_CONFIGURATION_ETATS\nOUTIL_IAC: bash_script -> PARADIGME=IMPERATIF | ETAT=SANS_STATE | USAGE=SCRIPT_PROCEDURAL_LEGACY\n\n[Cas 1 — OpenTofu provisionneur d’infrastructure moderne]\nOUTIL_IAC: opentofu -> PARADIGME=DECLARATIF | ETAT=AVEC_STATE | USAGE=PROVISIONING_INFRASTRUCTURE_OPTIMAL\n\n[Cas 2 — Script PowerShell impératif pour maintenance]\nOUTIL_IAC: ps_deploy -> PARADIGME=IMPERATIF | ETAT=SANS_STATE | USAGE=SCRIPT_PROCEDURAL_LEGACY\n\n[Cas 3 — Gestionnaire de paquets idempotent sans fichier d’état]\nOUTIL_IAC: puppet_agent -> PARADIGME=DECLARATIF | ETAT=SANS_STATE | USAGE=GESTION_CONFIGURATION_ETATS"
  },
  {
    "id": "do3-c5-e2",
    "chapter": 5,
    "title": "Détecteur de dérive d’infrastructure Terraform (Drift Detection)",
    "level": "n2",
    "language": "analyse",
    "goal": "Comparer l’état déclaré dans le code (.tf), le fichier d’état (tfstate) et la réalité observée sur le Cloud pour détecter toute altération non autorisée.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nMatrice de diagnostic déterministe :<br>\n1. Si <code>code_val == state_val == real_val</code> :<br>\n   <code>STATUT=SYNCHRONISE | ACTION=AUCUNE</code><br>\n2. Si <code>code_val != state_val</code> et <code>state_val == real_val</code> :<br>\n   <code>STATUT=PLAN_EN_ATTENTE | ACTION=TERRAFORM_APPLY</code> (le code a été modifié par un développeur et attend d’être appliqué)<br>\n3. Si <code>code_val == state_val</code> et <code>state_val != real_val</code> :<br>\n   <code>STATUT=DERIVE_EXTERNE | ACTION=TERRAFORM_REFRESH_OU_ALIGNEMENT</code> (une modification manuelle clandestine a été opérée sur la console Cloud)<br>\n4. Si <code>code_val != state_val</code> et <code>state_val != real_val</code> :<br>\n   <code>STATUT=CONFLIT_MAJEUR | ACTION=RESOLUTION_MANUELLE_REQUISE</code><br><br>\nAfficher :<br>\n<code>DRIFT_AUDIT: &lt;nom&gt; -&gt; STATUT=&lt;STATUT&gt; | ACTION=&lt;ACTION&gt;</code></p>",
    "starter": "# Grille d'analyse (do3-c5-e2) — Détecteur de dérive d’infrastructure Terraform (Drift Detection)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Conflit complexe avec modification conjointe code et console]\n# Données : RESOURCE id=s3_bucket code_val=private_kms state_val=private_sse real_val=public_open\nA_COMPLETER\n\n[Cas 2 — Ressource parfaitement synchronisée]\n# Données : RESOURCE id=vpc_main code_val=10.0.0.0/16 state_val=10.0.0.0/16 real_val=10.0.0.0/16\nA_COMPLETER\n\n[Cas 3 — Dérive sur la taille d’un disque managé]\n# Données : RESOURCE id=ebs_data code_val=100G state_val=100G real_val=200G\nA_COMPLETER\n",
    "hints": [
      "La dérive externe (Drift) se produit quand un administrateur contourne le dépôt Git et modifie manuellement l’infrastructure.",
      "Comparer les trois valeurs deux à deux."
    ],
    "examples": [
      {
        "stdin": "RESOURCE id=vm_instance code_val=t3.medium state_val=t3.medium real_val=t3.medium\nRESOURCE id=db_cluster code_val=db.r5.xlarge state_val=db.r5.large real_val=db.r5.large\nRESOURCE id=security_group code_val=port_443 state_val=port_443 real_val=port_22_ouvert",
        "expected": "DRIFT_AUDIT: vm_instance -> STATUT=SYNCHRONISE | ACTION=AUCUNE\nDRIFT_AUDIT: db_cluster -> STATUT=PLAN_EN_ATTENTE | ACTION=TERRAFORM_APPLY\nDRIFT_AUDIT: security_group -> STATUT=DERIVE_EXTERNE | ACTION=TERRAFORM_REFRESH_OU_ALIGNEMENT",
        "note": "Le security_group a subi une modification manuelle (port 22 ouvert) non déclarée dans Git."
      }
    ],
    "tests": [
      {
        "label": "Conflit complexe avec modification conjointe code et console",
        "stdin": "cas:1",
        "expected": "DRIFT_AUDIT: s3_bucket -> STATUT=CONFLIT_MAJEUR | ACTION=RESOLUTION_MANUELLE_REQUISE"
      },
      {
        "label": "Ressource parfaitement synchronisée",
        "stdin": "cas:2",
        "expected": "DRIFT_AUDIT: vpc_main -> STATUT=SYNCHRONISE | ACTION=AUCUNE"
      },
      {
        "label": "Dérive sur la taille d’un disque managé",
        "stdin": "cas:3",
        "expected": "DRIFT_AUDIT: ebs_data -> STATUT=DERIVE_EXTERNE | ACTION=TERRAFORM_REFRESH_OU_ALIGNEMENT"
      }
    ],
    "solution": "[Exemple]\nDRIFT_AUDIT: vm_instance -> STATUT=SYNCHRONISE | ACTION=AUCUNE\nDRIFT_AUDIT: db_cluster -> STATUT=PLAN_EN_ATTENTE | ACTION=TERRAFORM_APPLY\nDRIFT_AUDIT: security_group -> STATUT=DERIVE_EXTERNE | ACTION=TERRAFORM_REFRESH_OU_ALIGNEMENT\n\n[Cas 1 — Conflit complexe avec modification conjointe code et console]\nDRIFT_AUDIT: s3_bucket -> STATUT=CONFLIT_MAJEUR | ACTION=RESOLUTION_MANUELLE_REQUISE\n\n[Cas 2 — Ressource parfaitement synchronisée]\nDRIFT_AUDIT: vpc_main -> STATUT=SYNCHRONISE | ACTION=AUCUNE\n\n[Cas 3 — Dérive sur la taille d’un disque managé]\nDRIFT_AUDIT: ebs_data -> STATUT=DERIVE_EXTERNE | ACTION=TERRAFORM_REFRESH_OU_ALIGNEMENT"
  },
  {
    "id": "do3-c5-e3",
    "chapter": 5,
    "title": "Planificateur d’exécution Terraform et graphe de dépendances (DAG)",
    "level": "n3",
    "language": "analyse",
    "goal": "Construire les vagues d’exécution parallèles (Execution Waves) à partir du graphe orienté acyclique (DAG) de dépendances entre ressources.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas...|NONE&gt;</code>.<br><br>\nRègles :<br>\n- <strong>Vague 1 :</strong> toutes les ressources qui n'ont aucune dépendance (ou dont <code>depends_on == NONE</code>). Elles peuvent être créées simultanément en parallèle.<br>\n- <strong>Vague $k$ :</strong> toutes les ressources non encore créées dont <strong>l’ensemble</strong> des dépendances a été satisfait lors des vagues $1$ à $k-1$.<br>\n- Au sein de chaque vague, trier les identifiants de ressources par <strong>ordre alphabétique</strong>.<br>\n- Si un cycle de dépendance mutuelle est détecté :<br>\n  <code>TERRAFORM_DAG: ERREUR=CYCLE_DE_DEPENDANCE_DETECTE</code><br>\n- Sinon, afficher les vagues successives et le parallélisme maximal ($P = \\max(|Vague_i|)$) :<br>\n  <code>TERRAFORM_DAG: VAGUE 1=[&lt;...&gt;] | VAGUE 2=[&lt;...&gt;] ... | PARALLELISME_MAX=&lt;P&gt;</code></p>",
    "starter": "# Grille d'analyse (do3-c5-e3) — Planificateur d’exécution Terraform et graphe de dépendances (DAG)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cycle direct de dépendance croisée]\n# Données : RESOURCE id=res_a depends_on=res_b\n# Données : RESOURCE id=res_b depends_on=res_a\nA_COMPLETER\n\n[Cas 2 — Toutes les ressources indépendantes en Vague 1]\n# Données : RESOURCE id=bucket_a depends_on=NONE\n# Données : RESOURCE id=bucket_b depends_on=NONE\n# Données : RESOURCE id=bucket_c depends_on=NONE\nA_COMPLETER\n\n[Cas 3 — Chaîne linéaire stricte à 3 niveaux]\n# Données : RESOURCE id=r1 depends_on=NONE\n# Données : RESOURCE id=r2 depends_on=r1\n# Données : RESOURCE id=r3 depends_on=r2\nA_COMPLETER\n",
    "hints": [
      "Chaque vague regroupe les nœuds dont le degré entrant résiduel est nul.",
      "Le parallélisme maximal correspond au plus grand nombre de ressources déployables dans une même vague."
    ],
    "examples": [
      {
        "stdin": "RESOURCE id=vpc depends_on=NONE\nRESOURCE id=subnet_pub depends_on=vpc\nRESOURCE id=subnet_priv depends_on=vpc\nRESOURCE id=vm_web depends_on=subnet_pub\nRESOURCE id=db_sql depends_on=subnet_priv",
        "expected": "TERRAFORM_DAG: VAGUE 1=[vpc] | VAGUE 2=[subnet_priv, subnet_pub] | VAGUE 3=[db_sql, vm_web] | PARALLELISME_MAX=2",
        "note": "Le VPC est créé seul (Vague 1), puis les deux sous-réseaux en parallèle (Vague 2), puis les machines et bases (Vague 3)."
      }
    ],
    "tests": [
      {
        "label": "Cycle direct de dépendance croisée",
        "stdin": "cas:1",
        "expected": "TERRAFORM_DAG: ERREUR=CYCLE_DE_DEPENDANCE_DETECTE"
      },
      {
        "label": "Toutes les ressources indépendantes en Vague 1",
        "stdin": "cas:2",
        "expected": "TERRAFORM_DAG: VAGUE 1=[bucket_a, bucket_b, bucket_c] | PARALLELISME_MAX=3"
      },
      {
        "label": "Chaîne linéaire stricte à 3 niveaux",
        "stdin": "cas:3",
        "expected": "TERRAFORM_DAG: VAGUE 1=[r1] | VAGUE 2=[r2] | VAGUE 3=[r3] | PARALLELISME_MAX=1"
      }
    ],
    "solution": "[Exemple]\nTERRAFORM_DAG: VAGUE 1=[vpc] | VAGUE 2=[subnet_priv, subnet_pub] | VAGUE 3=[db_sql, vm_web] | PARALLELISME_MAX=2\n\n[Cas 1 — Cycle direct de dépendance croisée]\nTERRAFORM_DAG: ERREUR=CYCLE_DE_DEPENDANCE_DETECTE\n\n[Cas 2 — Toutes les ressources indépendantes en Vague 1]\nTERRAFORM_DAG: VAGUE 1=[bucket_a, bucket_b, bucket_c] | PARALLELISME_MAX=3\n\n[Cas 3 — Chaîne linéaire stricte à 3 niveaux]\nTERRAFORM_DAG: VAGUE 1=[r1] | VAGUE 2=[r2] | VAGUE 3=[r3] | PARALLELISME_MAX=1"
  }
];
