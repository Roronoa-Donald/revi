'use strict';

module.exports = [
  {
    "id": "do3-c4-e1",
    "chapter": 4,
    "title": "Simulateur de bascule Blue-Green sans interruption de service",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le routage du trafic réseau entre deux environnements jumeaux et automatiser la bascule ou le rollback en cas de défaillance du test de santé.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nRègles :<br>\n- Si <code>target == active</code> : le déploiement sur l’environnement actif est prohibé.<br>\n  <code>BLUE_GREEN: ERREUR=DEPLOIEMENT_SUR_ENV_ACTIF_INTERDIT</code><br>\n- Si <code>target != active</code> :<br>\n  - Si <code>health_check == PASS</code> : le routeur commute instantanément sur <code>target</code>.<br>\n    <code>BLUE_GREEN: STATUT=BASCULE_REUSSIE | ROUTER_ACTIF=&lt;target&gt; | VERSION_EN_LIGNE=&lt;new_ver&gt; | ANCIEN_ENV=&lt;ancien&gt; (IDLE)</code><br>\n  - Si <code>health_check == FAIL</code> : bascule avortée, rollback de sécurité.<br>\n    <code>BLUE_GREEN: STATUT=ROLLBACK_ANOMALIE | ROUTER_ACTIF=&lt;active&gt; | VERSION_EN_LIGNE=&lt;ver_active&gt; | TARGET_ABANDONNEE=&lt;target&gt;</code></p>",
    "starter": "# Grille d'analyse (do3-c4-e1) — Simulateur de bascule Blue-Green sans interruption de service\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Échec du test de santé déclenchant le rollback]\n# Données : ROUTER active=GREEN version=2.0.1\n# Données : DEPLOY target=BLUE version=2.1.0 health_check=FAIL\nA_COMPLETER\n\n[Cas 2 — Tentative illégale de déploiement sur l’environnement déjà actif]\n# Données : ROUTER active=BLUE version=1.0.0\n# Données : DEPLOY target=BLUE version=1.1.0 health_check=PASS\nA_COMPLETER\n\n[Cas 3 — Bascule réussie de GREEN vers BLUE]\n# Données : ROUTER active=GREEN version=3.4.0\n# Données : DEPLOY target=BLUE version=3.5.0 health_check=PASS\nA_COMPLETER\n",
    "hints": [
      "Le déploiement Blue-Green garantit zéro interruption car la nouvelle version est validée avant la bascule du load balancer.",
      "En cas d’erreur, aucun utilisateur ne subit la version corrompue."
    ],
    "examples": [
      {
        "stdin": "ROUTER active=BLUE version=1.2.0\nDEPLOY target=GREEN version=1.3.0 health_check=PASS",
        "expected": "BLUE_GREEN: STATUT=BASCULE_REUSSIE | ROUTER_ACTIF=GREEN | VERSION_EN_LIGNE=1.3.0 | ANCIEN_ENV=BLUE (IDLE)",
        "note": "Le test est PASS : le trafic passe sur GREEN (1.3.0), BLUE devient inactif."
      }
    ],
    "tests": [
      {
        "label": "Échec du test de santé déclenchant le rollback",
        "stdin": "cas:1",
        "expected": "BLUE_GREEN: STATUT=ROLLBACK_ANOMALIE | ROUTER_ACTIF=GREEN | VERSION_EN_LIGNE=2.0.1 | TARGET_ABANDONNEE=BLUE"
      },
      {
        "label": "Tentative illégale de déploiement sur l’environnement déjà actif",
        "stdin": "cas:2",
        "expected": "BLUE_GREEN: ERREUR=DEPLOIEMENT_SUR_ENV_ACTIF_INTERDIT"
      },
      {
        "label": "Bascule réussie de GREEN vers BLUE",
        "stdin": "cas:3",
        "expected": "BLUE_GREEN: STATUT=BASCULE_REUSSIE | ROUTER_ACTIF=BLUE | VERSION_EN_LIGNE=3.5.0 | ANCIEN_ENV=GREEN (IDLE)"
      }
    ],
    "solution": "[Exemple]\nBLUE_GREEN: STATUT=BASCULE_REUSSIE | ROUTER_ACTIF=GREEN | VERSION_EN_LIGNE=1.3.0 | ANCIEN_ENV=BLUE (IDLE)\n\n[Cas 1 — Échec du test de santé déclenchant le rollback]\nBLUE_GREEN: STATUT=ROLLBACK_ANOMALIE | ROUTER_ACTIF=GREEN | VERSION_EN_LIGNE=2.0.1 | TARGET_ABANDONNEE=BLUE\n\n[Cas 2 — Tentative illégale de déploiement sur l’environnement déjà actif]\nBLUE_GREEN: ERREUR=DEPLOIEMENT_SUR_ENV_ACTIF_INTERDIT\n\n[Cas 3 — Bascule réussie de GREEN vers BLUE]\nBLUE_GREEN: STATUT=BASCULE_REUSSIE | ROUTER_ACTIF=BLUE | VERSION_EN_LIGNE=3.5.0 | ANCIEN_ENV=GREEN (IDLE)"
  },
  {
    "id": "do3-c4-e2",
    "chapter": 4,
    "title": "Gestionnaire de déploiement progressif en Canari (Canary Release)",
    "level": "n2",
    "language": "analyse",
    "goal": "Acheminer graduellement le trafic utilisateur vers une version canari tout en surveillant le taux d’erreur pour avorter automatiquement en cas de régression.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas...&gt; error_rates=&lt;e1,e2,...&gt;</code>.<br><br>\nDéroulement des paliers :<br>\n- À chaque palier <code>steps[i]</code>, le taux d'erreur observé est <code>error_rates[i]</code>.<br>\n- Si $error\\_rates[i] &gt; seuil\\_max$ : le déploiement est immédiatement interrompu.<br>\n  <code>CANARY_DEPLOY: app=&lt;nom&gt; -&gt; ARRET_ANOMALIE_ETAPE=&lt;step&gt;% (erreur=&lt;e:.2f&gt;%/seuil=&lt;max:.2f&gt;%) | STATUT=ROLLBACK_AUTOMATIQUE</code><br>\n- Si toutes les étapes sont validées jusqu'au dernier palier (100%) sans dépasser le seuil :<br>\n  <code>CANARY_DEPLOY: app=&lt;nom&gt; -&gt; PROMOTION_100%_SUCCES | STATUT=DEPLOIEMENT_FINALISE | VERSION_ACTIVE=&lt;ver&gt;</code></p>",
    "starter": "# Grille d'analyse (do3-c4-e2) — Gestionnaire de déploiement progressif en Canari (Canary Release)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Échec dès le premier palier 5%]\n# Données : CANARY app=auth_api version=1.9.0 seuil_max=0.80 steps=5,20,50,100 error_rates=1.50,0.0,0.0,0.0\nA_COMPLETER\n\n[Cas 2 — Succès sans faille sur 3 paliers]\n# Données : CANARY app=cart_service version=2.0.0 seuil_max=2.00 steps=10,50,100 error_rates=0.50,0.80,1.10\nA_COMPLETER\n\n[Cas 3 — Échec au dernier palier 100%]\n# Données : CANARY app=search_svc version=4.1.0 seuil_max=1.00 steps=10,50,100 error_rates=0.20,0.40,1.80\nA_COMPLETER\n",
    "hints": [
      "Le déploiement Canari réduit le rayon d’impact (blast radius) en exposant d’abord un petit échantillon d’utilisateurs (ex: 5%).",
      "Interrompre la boucle dès le premier dépassement de seuil."
    ],
    "examples": [
      {
        "stdin": "CANARY app=payment_svc version=2.4.0 seuil_max=1.00 steps=5,25,50,100 error_rates=0.20,0.35,0.40,0.45\nCANARY app=reco_engine version=3.0.0 seuil_max=0.50 steps=10,30,70,100 error_rates=0.10,0.85,1.20,2.00",
        "expected": "CANARY_DEPLOY: app=payment_svc -> PROMOTION_100%_SUCCES | STATUT=DEPLOIEMENT_FINALISE | VERSION_ACTIVE=2.4.0\nCANARY_DEPLOY: app=reco_engine -> ARRET_ANOMALIE_ETAPE=30% (erreur=0.85%/seuil=0.50%) | STATUT=ROLLBACK_AUTOMATIQUE",
        "note": "payment_svc est promu à 100%. reco_engine est stoppé au palier 30% avec rollback."
      }
    ],
    "tests": [
      {
        "label": "Échec dès le premier palier 5%",
        "stdin": "cas:1",
        "expected": "CANARY_DEPLOY: app=auth_api -> ARRET_ANOMALIE_ETAPE=5% (erreur=1.50%/seuil=0.80%) | STATUT=ROLLBACK_AUTOMATIQUE"
      },
      {
        "label": "Succès sans faille sur 3 paliers",
        "stdin": "cas:2",
        "expected": "CANARY_DEPLOY: app=cart_service -> PROMOTION_100%_SUCCES | STATUT=DEPLOIEMENT_FINALISE | VERSION_ACTIVE=2.0.0"
      },
      {
        "label": "Échec au dernier palier 100%",
        "stdin": "cas:3",
        "expected": "CANARY_DEPLOY: app=search_svc -> ARRET_ANOMALIE_ETAPE=100% (erreur=1.80%/seuil=1.00%) | STATUT=ROLLBACK_AUTOMATIQUE"
      }
    ],
    "solution": "[Exemple]\nCANARY_DEPLOY: app=payment_svc -> PROMOTION_100%_SUCCES | STATUT=DEPLOIEMENT_FINALISE | VERSION_ACTIVE=2.4.0\nCANARY_DEPLOY: app=reco_engine -> ARRET_ANOMALIE_ETAPE=30% (erreur=0.85%/seuil=0.50%) | STATUT=ROLLBACK_AUTOMATIQUE\n\n[Cas 1 — Échec dès le premier palier 5%]\nCANARY_DEPLOY: app=auth_api -> ARRET_ANOMALIE_ETAPE=5% (erreur=1.50%/seuil=0.80%) | STATUT=ROLLBACK_AUTOMATIQUE\n\n[Cas 2 — Succès sans faille sur 3 paliers]\nCANARY_DEPLOY: app=cart_service -> PROMOTION_100%_SUCCES | STATUT=DEPLOIEMENT_FINALISE | VERSION_ACTIVE=2.0.0\n\n[Cas 3 — Échec au dernier palier 100%]\nCANARY_DEPLOY: app=search_svc -> ARRET_ANOMALIE_ETAPE=100% (erreur=1.80%/seuil=1.00%) | STATUT=ROLLBACK_AUTOMATIQUE"
  },
  {
    "id": "do3-c4-e3",
    "chapter": 4,
    "title": "Simulateur de mise à jour progressive Kubernetes (Rolling Update)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le déroulement pas à pas d’un Rolling Update Kubernetes en garantissant les contraintes de maxSurge et maxUnavailable.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nParamètres :<br>\n- $N$ : nombre désiré de réplicas en régime stable.<br>\n- $S$ (maxSurge) : nombre maximal de pods supplémentaires autorisés au-delà de $N$ ($Total_{max} = N + S$).<br>\n- $U$ (maxUnavailable) : nombre maximal de pods indisponibles autorisés ($Dispo_{min} = N - U$).<br><br>\nAlgorithme de déroulement par pas :<br>\nInitialement, $v1 = N, v2 = 0$.<br>\nÀ chaque pas :<br>\n1. On ajoute autant de pods $v2$ que possible sans dépasser $Total_{max} = N + S$ (soit $ajout = \\min(S, N - v2)$ pour le premier pas ou pour compléter). Plus précisément : $v2_{cible} = \\min(N, v2 + S)$.<br>\n2. Une fois les nouveaux $v2$ créés, on détruit des pods $v1$ pour ramener le total à $N$ (ou s'assurer que $v1 + v2 \\ge N - U$), c’est-à-dire : supprimer des pods $v1$ jusqu’à ce que $v1 = N - v2$ (ou $v1 = 0$ quand $v2 = N$).<br>\n3. Répéter jusqu’à ce que $v1 = 0$ et $v2 = N$.<br><br>\nAfficher :<br>\n<code>ROLLING_SPEC: REPLICAS=&lt;N&gt; | MAX_TOTAL=&lt;N+S&gt; | MIN_DISPO=&lt;N-U&gt;</code><br>\nPuis chaque pas :<br>\n<code>PAS &lt;k&gt;: v1=&lt;v1&gt;, v2=&lt;v2&gt; (total=&lt;v1+v2&gt;)</code><br>\nEt la conclusion finale :<br>\n<code>ETAT_FINAL: v1=0, v2=&lt;N&gt; | SUCCES_ROLLING_UPDATE</code></p>",
    "starter": "# Grille d'analyse (do3-c4-e3) — Simulateur de mise à jour progressive Kubernetes (Rolling Update)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Remplacement par paquets de 2 avec maxSurge=2]\n# Données : ROLLING replicas=4 max_surge=2 max_unavail=0\nA_COMPLETER\n\n[Cas 2 — Pod unique avec maxSurge 1]\n# Données : ROLLING replicas=1 max_surge=1 max_unavail=0\nA_COMPLETER\n\n[Cas 3 — Grande flotte de 6 réplicas avec surge de 3]\n# Données : ROLLING replicas=6 max_surge=3 max_unavail=0\nA_COMPLETER\n",
    "hints": [
      "À chaque itération, créer les pods v2 autorisés puis détruire les anciens pods v1 correspondants.",
      "Le nombre de pods disponibles ne doit jamais chuter sous N - U."
    ],
    "examples": [
      {
        "stdin": "ROLLING replicas=4 max_surge=1 max_unavail=0",
        "expected": "ROLLING_SPEC: REPLICAS=4 | MAX_TOTAL=5 | MIN_DISPO=4\nPAS 1: v1=3, v2=1 (total=4)\nPAS 2: v1=2, v2=2 (total=4)\nPAS 3: v1=1, v2=3 (total=4)\nPAS 4: v1=0, v2=4 (total=4)\nETAT_FINAL: v1=0, v2=4 | SUCCES_ROLLING_UPDATE",
        "note": "Avec maxSurge=1 et maxUnavail=0, les pods se remplacent un par un sans interruption."
      }
    ],
    "tests": [
      {
        "label": "Remplacement par paquets de 2 avec maxSurge=2",
        "stdin": "cas:1",
        "expected": "ROLLING_SPEC: REPLICAS=4 | MAX_TOTAL=6 | MIN_DISPO=4\nPAS 1: v1=2, v2=2 (total=4)\nPAS 2: v1=0, v2=4 (total=4)\nETAT_FINAL: v1=0, v2=4 | SUCCES_ROLLING_UPDATE"
      },
      {
        "label": "Pod unique avec maxSurge 1",
        "stdin": "cas:2",
        "expected": "ROLLING_SPEC: REPLICAS=1 | MAX_TOTAL=2 | MIN_DISPO=1\nPAS 1: v1=0, v2=1 (total=1)\nETAT_FINAL: v1=0, v2=1 | SUCCES_ROLLING_UPDATE"
      },
      {
        "label": "Grande flotte de 6 réplicas avec surge de 3",
        "stdin": "cas:3",
        "expected": "ROLLING_SPEC: REPLICAS=6 | MAX_TOTAL=9 | MIN_DISPO=6\nPAS 1: v1=3, v2=3 (total=6)\nPAS 2: v1=0, v2=6 (total=6)\nETAT_FINAL: v1=0, v2=6 | SUCCES_ROLLING_UPDATE"
      }
    ],
    "solution": "[Exemple]\nROLLING_SPEC: REPLICAS=4 | MAX_TOTAL=5 | MIN_DISPO=4\nPAS 1: v1=3, v2=1 (total=4)\nPAS 2: v1=2, v2=2 (total=4)\nPAS 3: v1=1, v2=3 (total=4)\nPAS 4: v1=0, v2=4 (total=4)\nETAT_FINAL: v1=0, v2=4 | SUCCES_ROLLING_UPDATE\n\n[Cas 1 — Remplacement par paquets de 2 avec maxSurge=2]\nROLLING_SPEC: REPLICAS=4 | MAX_TOTAL=6 | MIN_DISPO=4\nPAS 1: v1=2, v2=2 (total=4)\nPAS 2: v1=0, v2=4 (total=4)\nETAT_FINAL: v1=0, v2=4 | SUCCES_ROLLING_UPDATE\n\n[Cas 2 — Pod unique avec maxSurge 1]\nROLLING_SPEC: REPLICAS=1 | MAX_TOTAL=2 | MIN_DISPO=1\nPAS 1: v1=0, v2=1 (total=1)\nETAT_FINAL: v1=0, v2=1 | SUCCES_ROLLING_UPDATE\n\n[Cas 3 — Grande flotte de 6 réplicas avec surge de 3]\nROLLING_SPEC: REPLICAS=6 | MAX_TOTAL=9 | MIN_DISPO=6\nPAS 1: v1=3, v2=3 (total=6)\nPAS 2: v1=0, v2=6 (total=6)\nETAT_FINAL: v1=0, v2=6 | SUCCES_ROLLING_UPDATE"
  }
];
