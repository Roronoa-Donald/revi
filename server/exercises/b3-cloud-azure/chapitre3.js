'use strict';

module.exports = [
  {
    "id": "az3-c3-e1",
    "chapter": 3,
    "title": "Dimensionneur de VM Azure et calcul de SLA combiné",
    "level": "n1",
    "language": "analyse",
    "goal": "Sélectionner une série de VM et estimer la disponibilité composée dans un modèle fictif.",
    "brief": "<p>Ce modèle fictif estime la disponibilité théorique d'une architecture multi-tiers. Tous les niveaux sont nécessaires en série, leurs disponibilités portent sur une même période et leurs défaillances sont indépendantes, sans cause commune. Les valeurs ci-dessous sont hypothétiques et le résultat est non contractuel : il ne remplace pas les SLA du service et leurs conditions.<br><br>\nRègles de sélection des séries Azure :<br>\n- Si <code>burst=true</code> : série <code>B-series</code> (Burstable économique)<br>\n- Sinon, selon le ratio mémoire / vCPU (<code>ram_gb / vcpu</code>) :<br>\n  - Si <code>ratio &gt;= 8.0</code> : série <code>E-series</code> (Optimisée en mémoire)<br>\n  - Si <code>ratio &lt;= 2.0</code> : série <code>F-series</code> (Optimisée en calcul)<br>\n  - Sinon : série <code>D-series</code> (Usage général)<br><br>\nDisponibilité unitaire hypothétique selon la redondance et le disque :<br>\n- Si <code>redundancy=AZONE</code> (Zones de disponibilité) : <code>99.99%</code><br>\n- Si <code>redundancy=ASET</code> (Availability Set) : <code>99.95%</code><br>\n- Si <code>redundancy=SINGLE</code> (VM unique) :<br>\n  - <code>disk=SSD_PREM</code> : <code>99.90%</code><br>\n  - <code>disk=SSD_STD</code> : <code>99.50%</code><br>\n  - <code>disk=HDD_STD</code> : <code>95.00%</code><br><br>\nFormat d'entrée : chaque ligne déclare un tier applicatif :<br>\n<code>TIER name=&lt;nom&gt; vcpu=&lt;int&gt; ram_gb=&lt;int&gt; burst=&lt;true|false&gt; disk=&lt;disque&gt; redundancy=&lt;redondance&gt;</code><br><br>\nFormat de sortie attendu :<br>\nPour chaque tier :<br>\n<code>TIER &lt;nom&gt;: SERIES=&lt;SERIES&gt; SLA=&lt;sla_tier:.2f&gt;%</code><br>\nÀ la fin de la lecture, calculer la disponibilité composée théorique (produit des disponibilités sous les hypothèses ci-dessus) et l'indisponibilité estimée sur 8760 heures. Le libellé COMPOSITE_SLA est un identifiant de sortie, pas un engagement contractuel :<br>\n<code>COMPOSITE_SLA: &lt;composite:.4f&gt;% (downtime_year=&lt;downtime_hours:.2f&gt;h)</code></p>",
    "starter": "# Grille d'analyse (az3-c3-e1) — Dimensionneur de VM Azure et calcul de SLA combiné (modèle fictif)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Architecture multi-tiers Web, App et DB avec SLA combiné]\n# Données : TIER name=web vcpu=2 ram_gb=8 burst=false disk=SSD_PREM redundancy=AZONE\n# Données : TIER name=app vcpu=4 ram_gb=16 burst=false disk=SSD_PREM redundancy=AZONE\n# Données : TIER name=db vcpu=8 ram_gb=64 burst=false disk=SSD_PREM redundancy=ASET\nA_COMPLETER\n\n[Cas 2 — Tier unique burstable avec disque SSD Standard]\n# Données : TIER name=dev vcpu=2 ram_gb=4 burst=true disk=SSD_STD redundancy=SINGLE\nA_COMPLETER\n\n[Cas 3 — Tier calcul intensif F-series avec HDD Standard]\n# Données : TIER name=batch vcpu=8 ram_gb=16 burst=false disk=HDD_STD redundancy=SINGLE\nA_COMPLETER\n",
    "hints": [
      "Calculer ratio = ram_gb / vcpu si burst n'est pas actif.",
      "Pour ces tiers nécessaires et indépendants sur une même période, multiplier les probabilités : prod(SLA_i / 100) * 100.",
      "Appliquez la formule de disponibilité composée en série (prod SLA_i) ou en parallèle (1 - prod(1 - SLA_i)) selon le scénario web/DB et la série de VM."
    ],
    "examples": [
      {
        "stdin": "TIER name=web vcpu=2 ram_gb=8 burst=false disk=SSD_PREM redundancy=AZONE\nTIER name=db vcpu=4 ram_gb=32 burst=false disk=SSD_PREM redundancy=ASET",
        "expected": "TIER web: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9400% (downtime_year=5.26h)",
        "note": "Dans ce modèle fictif, le tier Web utilise D-series et AZone, et le tier DB E-series et ASet."
      }
    ],
    "tests": [
      {
        "label": "Architecture multi-tiers Web, App et DB avec SLA combiné",
        "stdin": "cas:1",
        "expected": "TIER web: SERIES=D-series SLA=99.99%\nTIER app: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9300% (downtime_year=6.13h)"
      },
      {
        "label": "Tier unique burstable avec disque SSD Standard",
        "stdin": "cas:2",
        "expected": "TIER dev: SERIES=B-series SLA=99.50%\nCOMPOSITE_SLA: 99.5000% (downtime_year=43.80h)"
      },
      {
        "label": "Tier calcul intensif F-series avec HDD Standard",
        "stdin": "cas:3",
        "expected": "TIER batch: SERIES=F-series SLA=95.00%\nCOMPOSITE_SLA: 95.0000% (downtime_year=438.00h)"
      }
    ],
    "solution": "[Exemple]\nTIER web: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9400% (downtime_year=5.26h)\n\n[Cas 1 — Architecture multi-tiers Web, App et DB avec SLA combiné]\nTIER web: SERIES=D-series SLA=99.99%\nTIER app: SERIES=D-series SLA=99.99%\nTIER db: SERIES=E-series SLA=99.95%\nCOMPOSITE_SLA: 99.9300% (downtime_year=6.13h)\n\n[Cas 2 — Tier unique burstable avec disque SSD Standard]\nTIER dev: SERIES=B-series SLA=99.50%\nCOMPOSITE_SLA: 99.5000% (downtime_year=43.80h)\n\n[Cas 3 — Tier calcul intensif F-series avec HDD Standard]\nTIER batch: SERIES=F-series SLA=95.00%\nCOMPOSITE_SLA: 95.0000% (downtime_year=438.00h)",
    "takeaway": "À retenir : Sélectionner une série de VM et estimer la disponibilité composée dans un modèle fictif.\nRepère : Dans ce modèle fictif, le tier Web utilise D-series et AZone, et le tier DB E-series et ASet."
  },
  {
    "id": "az3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La règle d'autoscaling du VMSS de Rideline",
    "exampleTitle": "Exemple résolu — l'autoscale du VMSS de la billetterie Weego",
    "goal": "Appliquer pas à pas les règles d'autoscale (montée et descente en charge) d'un groupe de machines virtuelles identiques.",
    "brief": "<p><strong>Énoncé.</strong> Rideline, plateforme de réservation de trajets, héberge son site sur un groupe de machines virtuelles identiques (VMSS) régi par un profil d'autoscale :</p><ul><li>nombre d'instances : minimum <strong>2</strong>, maximum <strong>8</strong> ;</li><li>règle de montée en charge : si le processeur moyen dépasse 70 % pendant 10 minutes, ajouter 2 instances ;</li><li>règle de descente : si le processeur moyen passe sous 30 % pendant 10 minutes, retirer 1 instance ;</li><li>entre 30 % et 70 %, aucune règle ne se déclenche.</li></ul><p>Le vendredi soir, l'autoscale évalue la métrique toutes les 10 minutes et exécute au plus une action par évaluation :</p><table><tr><th>Heure</th><th>Instances</th><th>Processeur moyen</th><th>Action</th></tr><tr><th>18 h 00</th><td>2</td><td>45 %</td><td>aucune</td></tr><tr><th>18 h 10</th><td>2</td><td>82 %</td><td>montée : + 2</td></tr><tr><th>18 h 20</th><td>4</td><td>78 %</td><td>montée : + 2</td></tr><tr><th>18 h 30</th><td>6</td><td>55 %</td><td>aucune</td></tr><tr><th>22 h 00</th><td>6</td><td>22 %</td><td>descente : − 1</td></tr></table><ol><li>Combien d'instances tournent à 18 h 00 ?</li><li>Combien d'instances après la montée de 18 h 10 ?</li><li>Combien d'instances après la montée de 18 h 20 ?</li><li>Pourquoi aucune règle ne se déclenche-t-elle à 18 h 30 ?</li><li>Combien d'instances après la descente de 22 h 00 ?</li></ol>",
    "starter": "# Exercice — La règle d'autoscaling du VMSS de Rideline\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 et 5 : le nombre seul. Question 4 : répondez de façon courte.\n\n[Question 1 — Instances à 18 h 00]\nA_COMPLETER\n\n[Question 2 — Instances après la montée de 18 h 10]\nA_COMPLETER\n\n[Question 3 — Instances après la montée de 18 h 20]\nA_COMPLETER\n\n[Question 4 — Pourquoi aucune action à 18 h 30]\nA_COMPLETER\n\n[Question 5 — Instances après la descente de 22 h 00]\nA_COMPLETER\n",
    "hints": [
      "Suivez le tableau ligne par ligne : le nombre d'instances d'une ligne part du nombre d'instances de la ligne précédente, modifié par l'action.",
      "Une montée ajoute 2 instances, une descente en retire 1 ; une ligne « aucune action » conserve le même nombre.",
      "1. Lisez la première ligne. 2. Ajoutez 2 à 2. 3. Ajoutez 2 au résultat précédent. 4. Comparez 55 % aux seuils 30 % et 70 %. 5. Retirez 1 au nombre d'instances de 18 h 30."
    ],
    "examples": [
      {
        "stdin": "La billetterie Weego règle son VMSS : minimum 3, maximum 10 ; montée +1 si le processeur\ndépasse 75 % pendant 10 minutes ; descente −1 sous 25 %.\nSamedi 20 h : 3 instances, CPU 60 % (aucune action).\nSamedi 20 h 10 : CPU 80 % → montée : 4 instances.\nSamedi 20 h 20 : CPU 80 % → montée : 5 instances.\nSamedi 23 h : CPU 20 % → descente : 4 instances.\n\n1) Au départ : 3 instances.\n2) Après la première montée : 4.\n3) Après la seconde montée : 5.\n4) À 60 %, aucune action : la valeur est sous le seuil de montée (75 %).\n5) Après la descente : 4.",
        "expected": "départ : 3 instances — après les montées : 4 puis 5 — à 60 % aucune action (sous le seuil de montée) — après la descente : 4",
        "note": "Entre les deux seuils, la plateforme n'agit pas : cette zone tampon évite que le nombre d'instances oscille sans cesse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Instances à 18 h 00",
        "stdin": "q:1",
        "expected": "2"
      },
      {
        "label": "Question 2 — Instances après la montée de 18 h 10",
        "stdin": "q:2",
        "expected": "4"
      },
      {
        "label": "Question 3 — Instances après la montée de 18 h 20",
        "stdin": "q:3",
        "expected": "6"
      },
      {
        "label": "Question 4 — Pourquoi aucune action à 18 h 30",
        "stdin": "q:4",
        "expected": "parce que 55 % est compris entre 30 % et 70 %||55 % est compris entre 30 et 70 %||car 55 % est compris entre les deux seuils||le processeur est entre 30 % et 70 %||55 est compris entre 30 et 70"
      },
      {
        "label": "Question 5 — Instances après la descente de 22 h 00",
        "stdin": "q:5",
        "expected": "5"
      }
    ],
    "solution": "[Question 1 — Instances à 18 h 00]\n2\n\n[Question 2 — Instances après la montée de 18 h 10]\n4\n\n[Question 3 — Instances après la montée de 18 h 20]\n6\n\n[Question 4 — Pourquoi aucune action à 18 h 30]\nparce que 55 % est compris entre 30 % et 70 %\n\n[Question 5 — Instances après la descente de 22 h 00]\n5",
    "takeaway": "1) À 18 h 00, la flotte compte 2 instances (le minimum du profil).\n2) À 18 h 10, le processeur atteint 82 %, au-dessus de 70 % : la règle de montée ajoute 2 instances, soit 2 + 2 = 4 instances.\n3) À 18 h 20, le processeur atteint 78 % : nouvelle montée, 4 + 2 = 6 instances.\n4) Aucune action à 18 h 30 car 55 % se situe entre les deux seuils (30 % et 70 %) : ni montée ni descente ne se déclenche.\n5) À 22 h 00, le processeur tombe à 22 %, sous 30 % : la descente retire 1 instance, soit 6 − 1 = 5 instances.\nContrôle : le plafond de 8 instances n'est jamais atteint (maximum observé : 6) et le plancher de 2 non plus (minimum observé : 5 en fin de soirée)."
  },
  {
    "id": "az3-c3-e3",
    "chapter": 3,
    "title": "Gestionnaire de déploiement Azure App Service & Slot Swap",
    "level": "n3",
    "language": "analyse",
    "goal": "Étudier un modèle fictif de préchauffage et de bascule entre slots, distinct du comportement réel d’Azure App Service.",
    "brief": "<p>Ce modèle fictif simule une bascule entre versions : ses commandes et son paramètre <code>auto_rollback</code> sont fictifs, et la sonde ne démontre pas l'intégrité de l'application.<br>Dans Azure App Service, par défaut, tous les codes HTTP de préchauffage, y compris 500, sont acceptés. <code>WEBSITE_SWAP_WARMUP_PING_PATH</code> choisit le chemin et <code>WEBSITE_SWAP_WARMUP_PING_STATUSES</code> limite les codes acceptés. Un code non admis ne valide pas le préchauffage ; si celui-ci n'aboutit pas, le swap n'est pas terminé. Un nouveau swap peut rétablir les versions mais n'annule pas automatiquement les données.<br>Les règles ci-dessous appartiennent uniquement à la simulation et ne décrivent pas un rollback automatique Azure.<br><br>\nÉtat initial :<br>\n- Slot <code>Production</code> : version <code>v1.0.0</code>.<br>\n- Slot <code>Staging</code> : version <code>none</code> (inactif).<br><br>\nCommandes prises en charge :<br>\n1. <code>DEPLOY_STAGE version=&lt;v&gt; probe=&lt;status_code&gt;</code><br>\n   Déploie la version <code>v</code> sur le slot Staging avec le code de sonde simulée <code>status_code</code>.<br>\n   Afficher : <code>STAGE_DEPLOYED: version=&lt;v&gt; probe=&lt;status_code&gt;</code><br><br>\n2. <code>SWAP_SLOTS auto_rollback=&lt;true|false&gt;</code><br>\n   Dans le modèle, vérifiez la sonde simulée du slot Staging :<br>\n   - Si <code>probe == 200</code> :<br>\n     La bascule s'effectue avec succès. La version de Staging devient celle de Production, et l'ancienne version de Production est basculée sur Staging.<br>\n     Afficher : <code>SWAP_SUCCESS: prod=&lt;new_prod&gt; stage=&lt;new_stage&gt;</code><br>\n   - Si <code>probe != 200</code> :<br>\n     - Si <code>auto_rollback=true</code> : la bascule est annulée, Production reste inchangée et Staging est réinitialisé à <code>none</code>.<br>\n       Afficher : <code>SWAP_ABORTED: probe_failed (status=&lt;status_code&gt;), rollback to &lt;current_prod&gt;</code><br>\n     - Si <code>auto_rollback=false</code> : la bascule a lieu malgré l'anomalie.<br>\n       Afficher : <code>SWAP_WARNING: degraded_deployment (status=&lt;status_code&gt;), prod=&lt;new_prod&gt;</code><br><br>\n3. <code>STATUS</code><br>\n   Afficher : <code>CURRENT_STATE: prod=&lt;current_prod&gt; stage=&lt;current_stage&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c3-e3) — Gestionnaire de déploiement Azure App Service & Slot Swap (modèle fictif)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Déploiement sain et bascule vers production]\n# Données : DEPLOY_STAGE version=v1.2.0-rc1 probe=200\n# Données : SWAP_SLOTS auto_rollback=true\n# Données : STATUS\nA_COMPLETER\n\n[Cas 2 — Échec de sonde avec auto-rollback activé]\n# Données : DEPLOY_STAGE version=v2.0.0-bug probe=500\n# Données : SWAP_SLOTS auto_rollback=true\n# Données : STATUS\nA_COMPLETER\n\n[Cas 3 — Échec de sonde sans auto-rollback forçant le swap]\n# Données : DEPLOY_STAGE version=v1.2.0 probe=503\n# Données : SWAP_SLOTS auto_rollback=false\n# Données : STATUS\nA_COMPLETER\n",
    "hints": [
      "Gérer deux variables d'état prod_ver (initialement \"v1.0.0\") et stage_ver (initialement \"none\"), ainsi que stage_probe.",
      "Lors du swap réussi, échanger les valeurs de prod_ver et stage_ver.",
      "Contrôlez le statut HTTP du préchauffage sur le slot de staging avant d autoriser la permutation avec production dans le format attendu."
    ],
    "examples": [
      {
        "stdin": "DEPLOY_STAGE version=v1.1.0 probe=200\nSWAP_SLOTS auto_rollback=true\nSTATUS",
        "expected": "STAGE_DEPLOYED: version=v1.1.0 probe=200\nSWAP_SUCCESS: prod=v1.1.0 stage=v1.0.0\nCURRENT_STATE: prod=v1.1.0 stage=v1.0.0",
        "note": "Dans ce modèle fictif, le code 200 déclenche la bascule des versions."
      }
    ],
    "tests": [
      {
        "label": "Déploiement sain et bascule vers production",
        "stdin": "cas:1",
        "expected": "STAGE_DEPLOYED: version=v1.2.0-rc1 probe=200\nSWAP_SUCCESS: prod=v1.2.0-rc1 stage=v1.0.0\nCURRENT_STATE: prod=v1.2.0-rc1 stage=v1.0.0"
      },
      {
        "label": "Échec de sonde avec auto-rollback activé",
        "stdin": "cas:2",
        "expected": "STAGE_DEPLOYED: version=v2.0.0-bug probe=500\nSWAP_ABORTED: probe_failed (status=500), rollback to v1.0.0\nCURRENT_STATE: prod=v1.0.0 stage=none"
      },
      {
        "label": "Échec de sonde sans auto-rollback forçant le swap",
        "stdin": "cas:3",
        "expected": "STAGE_DEPLOYED: version=v1.2.0 probe=503\nSWAP_WARNING: degraded_deployment (status=503), prod=v1.2.0\nCURRENT_STATE: prod=v1.2.0 stage=v1.0.0"
      }
    ],
    "solution": "[Exemple]\nSTAGE_DEPLOYED: version=v1.1.0 probe=200\nSWAP_SUCCESS: prod=v1.1.0 stage=v1.0.0\nCURRENT_STATE: prod=v1.1.0 stage=v1.0.0\n\n[Cas 1 — Déploiement sain et bascule vers production]\nSTAGE_DEPLOYED: version=v1.2.0-rc1 probe=200\nSWAP_SUCCESS: prod=v1.2.0-rc1 stage=v1.0.0\nCURRENT_STATE: prod=v1.2.0-rc1 stage=v1.0.0\n\n[Cas 2 — Échec de sonde avec auto-rollback activé]\nSTAGE_DEPLOYED: version=v2.0.0-bug probe=500\nSWAP_ABORTED: probe_failed (status=500), rollback to v1.0.0\nCURRENT_STATE: prod=v1.0.0 stage=none\n\n[Cas 3 — Échec de sonde sans auto-rollback forçant le swap]\nSTAGE_DEPLOYED: version=v1.2.0 probe=503\nSWAP_WARNING: degraded_deployment (status=503), prod=v1.2.0\nCURRENT_STATE: prod=v1.2.0 stage=v1.0.0",
    "takeaway": "À retenir : Étudier un modèle fictif de préchauffage et de bascule entre slots, distinct du comportement réel d’Azure App Service.\nRepère : Dans ce modèle fictif, le code 200 déclenche la bascule des versions."
  }
];
