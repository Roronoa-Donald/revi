'use strict';

module.exports = [
  {
    "id": "cc3-c1-e1",
    "chapter": 1,
    "title": "Classificateur de modèles de service (IaaS, PaaS, SaaS) et responsabilités",
    "level": "n1",
    "language": "analyse",
    "goal": "Déterminer la répartition des responsabilités opérationnelles (INFRA, OS, RUNTIME, APP, DATA) entre le fournisseur (CSP) et le client selon le modèle de service.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nPour chaque couche technique (<code>INFRA</code>, <code>OS</code>, <code>RUNTIME</code>, <code>APP</code>, <code>DATA</code>), la gestion est attribuée comme suit :<br>\n- <strong>IaaS</strong> : INFRA=CSP, OS=CLIENT, RUNTIME=CLIENT, APP=CLIENT, DATA=CLIENT<br>\n- <strong>PaaS</strong> : INFRA=CSP, OS=CSP, RUNTIME=CSP, APP=CLIENT, DATA=CLIENT<br>\n- <strong>SaaS</strong> : INFRA=CSP, OS=CSP, RUNTIME=CSP, APP=CSP, DATA=CSP<br>\nAfficher pour chaque ligne :<br>\n<code>RESP: nom=&lt;nom&gt; TYPE=&lt;TYPE&gt; | INFRA=&lt;CSP|CLIENT&gt; OS=&lt;CSP|CLIENT&gt; RUNTIME=&lt;CSP|CLIENT&gt; APP=&lt;CSP|CLIENT&gt; DATA=&lt;CSP|CLIENT&gt;</code></p>",
    "starter": "# Grille d'analyse (cc3-c1-e1) — Classificateur de modèles de service (IaaS, PaaS, SaaS) et responsabilités\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Machine virtuelle brute IaaS]\n# Données : SERVICE nom=vm_compute TYPE=IaaS\nA_COMPLETER\n\n[Cas 2 — Plateforme managée PaaS]\n# Données : SERVICE nom=app_engine TYPE=PaaS\nA_COMPLETER\n\n[Cas 3 — Logiciel clé en main SaaS]\n# Données : SERVICE nom=salesforce TYPE=SaaS\nA_COMPLETER\n",
    "hints": [
      "En IaaS, le client installe et gère l’OS et tout ce qui est au-dessus.",
      "En PaaS, l’OS et le runtime (ex: Python, Node.js) sont infogérés par le CSP.",
      "En SaaS, le client consomme directement l’application et héberge ses données dessus."
    ],
    "examples": [
      {
        "stdin": "SERVICE nom=ec2 TYPE=IaaS\nSERVICE nom=elastic_beanstalk TYPE=PaaS\nSERVICE nom=office365 TYPE=SaaS",
        "expected": "RESP: nom=ec2 TYPE=IaaS | INFRA=CSP OS=CLIENT RUNTIME=CLIENT APP=CLIENT DATA=CLIENT\nRESP: nom=elastic_beanstalk TYPE=PaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CLIENT DATA=CLIENT\nRESP: nom=office365 TYPE=SaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CSP DATA=CSP",
        "note": "Le périmètre de maintenance du client diminue au fur et à mesure de l’élévation du niveau d’abstraction."
      }
    ],
    "tests": [
      {
        "label": "Machine virtuelle brute IaaS",
        "stdin": "cas:1",
        "expected": "RESP: nom=vm_compute TYPE=IaaS | INFRA=CSP OS=CLIENT RUNTIME=CLIENT APP=CLIENT DATA=CLIENT"
      },
      {
        "label": "Plateforme managée PaaS",
        "stdin": "cas:2",
        "expected": "RESP: nom=app_engine TYPE=PaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CLIENT DATA=CLIENT"
      },
      {
        "label": "Logiciel clé en main SaaS",
        "stdin": "cas:3",
        "expected": "RESP: nom=salesforce TYPE=SaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CSP DATA=CSP"
      }
    ],
    "solution": "[Exemple]\nRESP: nom=ec2 TYPE=IaaS | INFRA=CSP OS=CLIENT RUNTIME=CLIENT APP=CLIENT DATA=CLIENT\nRESP: nom=elastic_beanstalk TYPE=PaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CLIENT DATA=CLIENT\nRESP: nom=office365 TYPE=SaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CSP DATA=CSP\n\n[Cas 1 — Machine virtuelle brute IaaS]\nRESP: nom=vm_compute TYPE=IaaS | INFRA=CSP OS=CLIENT RUNTIME=CLIENT APP=CLIENT DATA=CLIENT\n\n[Cas 2 — Plateforme managée PaaS]\nRESP: nom=app_engine TYPE=PaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CLIENT DATA=CLIENT\n\n[Cas 3 — Logiciel clé en main SaaS]\nRESP: nom=salesforce TYPE=SaaS | INFRA=CSP OS=CSP RUNTIME=CSP APP=CSP DATA=CSP"
  },
  {
    "id": "cc3-c1-e2",
    "chapter": 1,
    "title": "Auditeur des 5 caractéristiques essentielles NIST (SP 800-145)",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la conformité d’une offre d’infrastructure aux 5 critères obligatoires de la définition NIST du Cloud Computing.",
    "brief": "<p>Le standard NIST SP 800-145 impose 5 caractéristiques cumulatives :<br>\n1. <code>ON_DEMAND_SELF_SERVICE</code> (libre-service à la demande)<br>\n2. <code>BROAD_NETWORK_ACCESS</code> (accès réseau étendu)<br>\n3. <code>RESOURCE_POOLING</code> (mutualisation des ressources)<br>\n4. <code>RAPID_ELASTICITY</code> (élasticité rapide)<br>\n5. <code>MEASURED_SERVICE</code> (service mesuré / facturation à l’usage)<br><br>\nAnalysez les données fournies pour chaque cas...&gt;</code> (séparées par des virgules).<br>\nCalculer le score de conformité sur 5 (pourcentage = <code>score * 20</code>).<br>\nIdentifier les critères manquants dans l'ordre officiel ci-dessus.<br>\nSi les 5 critères sont présents : <code>STATUT=CONFORME</code> et <code>MANQUES=AUCUN</code>.<br>\nSinon : <code>STATUT=NON_CONFORME</code> et <code>MANQUES=&lt;liste séparée par virgule&gt;</code>.<br>\nAfficher :<br>\n<code>CONFORMITE: nom=&lt;nom&gt; SCORE=&lt;score&gt;/5 (&lt;pct&gt;%) STATUT=&lt;STATUT&gt; MANQUES=&lt;MANQUES&gt;</code></p>",
    "starter": "# Grille d'analyse (cc3-c1-e2) — Auditeur des 5 caractéristiques essentielles NIST (SP 800-145)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cloud conforme aux 5 critères]\n# Données : AUDIT composant=openstack_prod CARACS=ON_DEMAND_SELF_SERVICE,BROAD_NETWORK_ACCESS,RESOURCE_POOLING,RAPID_ELASTICITY,MEASURED_SERVICE\nA_COMPLETER\n\n[Cas 2 — Hébergement sans élasticité ni mesure]\n# Données : AUDIT composant=serveur_dedie CARACS=ON_DEMAND_SELF_SERVICE,BROAD_NETWORK_ACCESS,RESOURCE_POOLING\nA_COMPLETER\n\n[Cas 3 — Environnement isolé sans libre service]\n# Données : AUDIT composant=mainframe CARACS=RESOURCE_POOLING,MEASURED_SERVICE\nA_COMPLETER\n",
    "hints": [
      "Garder la liste ordonnée des 5 caractéristiques officielles pour générer les manques dans l'ordre.",
      "Un Cloud privé conforme doit également respecter l'intégralité des 5 caractéristiques."
    ],
    "examples": [
      {
        "stdin": "AUDIT composant=aws_ec2 CARACS=ON_DEMAND_SELF_SERVICE,BROAD_NETWORK_ACCESS,RESOURCE_POOLING,RAPID_ELASTICITY,MEASURED_SERVICE\nAUDIT composant=vps_statique CARACS=BROAD_NETWORK_ACCESS,RESOURCE_POOLING",
        "expected": "CONFORMITE: nom=aws_ec2 SCORE=5/5 (100%) STATUT=CONFORME MANQUES=AUCUN\nCONFORMITE: nom=vps_statique SCORE=2/5 (40%) STATUT=NON_CONFORME MANQUES=ON_DEMAND_SELF_SERVICE,RAPID_ELASTICITY,MEASURED_SERVICE",
        "note": "Une solution d’hébergement classique manque souvent d’élasticité dynamique et d’API en libre-service."
      }
    ],
    "tests": [
      {
        "label": "Cloud conforme aux 5 critères",
        "stdin": "cas:1",
        "expected": "CONFORMITE: nom=openstack_prod SCORE=5/5 (100%) STATUT=CONFORME MANQUES=AUCUN"
      },
      {
        "label": "Hébergement sans élasticité ni mesure",
        "stdin": "cas:2",
        "expected": "CONFORMITE: nom=serveur_dedie SCORE=3/5 (60%) STATUT=NON_CONFORME MANQUES=RAPID_ELASTICITY,MEASURED_SERVICE"
      },
      {
        "label": "Environnement isolé sans libre service",
        "stdin": "cas:3",
        "expected": "CONFORMITE: nom=mainframe SCORE=2/5 (40%) STATUT=NON_CONFORME MANQUES=ON_DEMAND_SELF_SERVICE,BROAD_NETWORK_ACCESS,RAPID_ELASTICITY"
      }
    ],
    "solution": "[Exemple]\nCONFORMITE: nom=aws_ec2 SCORE=5/5 (100%) STATUT=CONFORME MANQUES=AUCUN\nCONFORMITE: nom=vps_statique SCORE=2/5 (40%) STATUT=NON_CONFORME MANQUES=ON_DEMAND_SELF_SERVICE,RAPID_ELASTICITY,MEASURED_SERVICE\n\n[Cas 1 — Cloud conforme aux 5 critères]\nCONFORMITE: nom=openstack_prod SCORE=5/5 (100%) STATUT=CONFORME MANQUES=AUCUN\n\n[Cas 2 — Hébergement sans élasticité ni mesure]\nCONFORMITE: nom=serveur_dedie SCORE=3/5 (60%) STATUT=NON_CONFORME MANQUES=RAPID_ELASTICITY,MEASURED_SERVICE\n\n[Cas 3 — Environnement isolé sans libre service]\nCONFORMITE: nom=mainframe SCORE=2/5 (40%) STATUT=NON_CONFORME MANQUES=ON_DEMAND_SELF_SERVICE,BROAD_NETWORK_ACCESS,RAPID_ELASTICITY"
  },
  {
    "id": "cc3-c1-e3",
    "chapter": 1,
    "title": "Évaluateur de modèles de déploiement Cloud (Public, Privé, Hybride, Communautaire)",
    "level": "n3",
    "language": "analyse",
    "goal": "Qualifier automatiquement le modèle de déploiement Cloud cible d’une organisation selon ses contraintes de colocation, connectivité et criticité des données.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nArbre de qualification déterministe :<br>\n1. Si <code>PARTAGE == COMMUNAUTE</code> -&gt; <code>MODELE=COMMUNAUTAIRE</code>.<br>\n2. Sinon si <code>RESEAU == HYBRIDE</code> -&gt; <code>MODELE=HYBRIDE</code>.<br>\n3. Sinon si <code>TENANT == DEDIE</code> ou <code>DONNEES == SECRET</code> ou <code>PARTAGE == EXCLUSIF</code> -&gt; <code>MODELE=PRIVE</code>.<br>\n4. Sinon si <code>TENANT == MULTI</code> et <code>RESEAU == INTERNET</code> -&gt; <code>MODELE=PUBLIC</code>.<br>\n5. Sinon -&gt; <code>MODELE=PRIVE</code>.<br><br>\nDéterminer également le <code>NIVEAU_ISOLATION</code> :<br>\n- Si <code>MODELE == PRIVE</code> : <code>ISOLE_PHYSIQUE</code><br>\n- Si <code>MODELE == HYBRIDE</code> : <code>SEGMENTE_VPN</code><br>\n- Si <code>MODELE == COMMUNAUTAIRE</code> : <code>RESTREINT_PAIRS</code><br>\n- Si <code>MODELE == PUBLIC</code> : <code>LOGIQUE_MULTI_TENANT</code><br><br>\nAfficher :<br>\n<code>MODELE: &lt;nom&gt; -&gt; DEPL=&lt;MODELE&gt; | ISOLATION=&lt;NIVEAU_ISOLATION&gt;</code></p>",
    "starter": "# Grille d'analyse (cc3-c1-e3) — Évaluateur de modèles de déploiement Cloud (Public, Privé, Hybride, Communautaire)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Groupement inter-hospitalier communautaire]\n# Données : DEPL nom=sante_region TENANT=MULTI RESEAU=VPN_PRIVE DONNEES=SENSIBLE PARTAGE=COMMUNAUTE\nA_COMPLETER\n\n[Cas 2 — Environnement de dev public]\n# Données : DEPL nom=dev_sandbox TENANT=MULTI RESEAU=INTERNET DONNEES=STANDARD PARTAGE=OUVERT\nA_COMPLETER\n\n[Cas 3 — Système d’armes militaire dédié]\n# Données : DEPL nom=defense_ops TENANT=DEDIE RESEAU=VPN_PRIVE DONNEES=SECRET PARTAGE=EXCLUSIF\nA_COMPLETER\n",
    "hints": [
      "Appliquer les règles dans l’ordre strict : Communauté puis Hybride puis Privé puis Public.",
      "Le Cloud communautaire fédère plusieurs organisations partageant des exigences communes (ex: secteur bancaire ou recherche)."
    ],
    "examples": [
      {
        "stdin": "DEPL nom=startup_web TENANT=MULTI RESEAU=INTERNET DONNEES=STANDARD PARTAGE=OUVERT\nDEPL nom=hopital_chru TENANT=DEDIE RESEAU=VPN_PRIVE DONNEES=SECRET PARTAGE=EXCLUSIF\nDEPL nom=banque_core TENANT=MULTI RESEAU=HYBRIDE DONNEES=SENSIBLE PARTAGE=OUVERT",
        "expected": "MODELE: startup_web -> DEPL=PUBLIC | ISOLATION=LOGIQUE_MULTI_TENANT\nMODELE: hopital_chru -> DEPL=PRIVE | ISOLATION=ISOLE_PHYSIQUE\nMODELE: banque_core -> DEPL=HYBRIDE | ISOLATION=SEGMENTE_VPN",
        "note": "Le Cloud hybride articule des ressources privées locales et des extensions élastiques publiques."
      }
    ],
    "tests": [
      {
        "label": "Groupement inter-hospitalier communautaire",
        "stdin": "cas:1",
        "expected": "MODELE: sante_region -> DEPL=COMMUNAUTAIRE | ISOLATION=RESTREINT_PAIRS"
      },
      {
        "label": "Environnement de dev public",
        "stdin": "cas:2",
        "expected": "MODELE: dev_sandbox -> DEPL=PUBLIC | ISOLATION=LOGIQUE_MULTI_TENANT"
      },
      {
        "label": "Système d’armes militaire dédié",
        "stdin": "cas:3",
        "expected": "MODELE: defense_ops -> DEPL=PRIVE | ISOLATION=ISOLE_PHYSIQUE"
      }
    ],
    "solution": "[Exemple]\nMODELE: startup_web -> DEPL=PUBLIC | ISOLATION=LOGIQUE_MULTI_TENANT\nMODELE: hopital_chru -> DEPL=PRIVE | ISOLATION=ISOLE_PHYSIQUE\nMODELE: banque_core -> DEPL=HYBRIDE | ISOLATION=SEGMENTE_VPN\n\n[Cas 1 — Groupement inter-hospitalier communautaire]\nMODELE: sante_region -> DEPL=COMMUNAUTAIRE | ISOLATION=RESTREINT_PAIRS\n\n[Cas 2 — Environnement de dev public]\nMODELE: dev_sandbox -> DEPL=PUBLIC | ISOLATION=LOGIQUE_MULTI_TENANT\n\n[Cas 3 — Système d’armes militaire dédié]\nMODELE: defense_ops -> DEPL=PRIVE | ISOLATION=ISOLE_PHYSIQUE"
  }
];
