'use strict';

module.exports = [
  {
    "id": "az3-c1-e1",
    "chapter": 1,
    "title": "Analyse d’une hiérarchie et convention de nommage fictives",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer à des chemins une convention fictive de hiérarchie et de nommage inspirée d’Azure.",
    "brief": "<p>Pour cet exercice, une convention fictive inspirée d’Azure utilise un chemin à quatre segments. Dans Azure, le nombre de groupes de gestion peut varier et la convention de nommage est à définir selon l’organisation :\n<code>ManagementGroup_Parent / ManagementGroup_Child / Subscription / ResourceGroup</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas. La chaîne doit comporter exactement 4 segments non vides séparés par <code>/</code>. Si ce n'est pas le cas, utilisez <code>INVALID: reason=&lt;motif&gt;</code> avec le motif <code>MALFORMED_HIERARCHY</code>.<br>\n2. Le 4e segment correspond au Resource Group (RG). Il doit respecter le gabarit fictif suivant :<br>\n   <code>rg-&lt;app&gt;-&lt;env&gt;-&lt;region&gt;-&lt;instance&gt;</code><br>\n   - Préfixe : exactement <code>rg-</code><br>\n   - <code>&lt;app&gt;</code> : chaîne alphanumérique non vide (lettres/chiffres)<br>\n   - <code>&lt;env&gt;</code> : une valeur parmi <code>prod</code>, <code>dev</code>, <code>stage</code>, <code>test</code><br>\n   - <code>&lt;region&gt;</code> : code région abrégé parmi <code>we</code> (West Europe), <code>ne</code> (North Europe), <code>fc</code> (France Central), <code>use</code> (East US)<br>\n   - <code>&lt;instance&gt;</code> : exactement 2 chiffres décimaux (ex: <code>01</code>, <code>02</code>)<br>\n3. Si le format du RG ne respecte pas ce gabarit :<br>\n   <code>INVALID: rg=&lt;rg_name&gt; reason=NON_COMPLIANT_NAMING</code><br>\n4. Si la hiérarchie et le nom du RG sont conformes :<br>\n   <code>VALID: HIERARCHY depth=4 sub=&lt;segment3&gt; rg=&lt;rg_name&gt; status=COMPLIANT</code></p>",
    "starter": "# Grille d'analyse (az3-c1-e1) — Validateur de hiérarchie ARM & Conventions de nommage CAF\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série A]\n# Données : HIERARCHY mg-root/mg-prod/sub-corp-01/rg-web-prod-fc-01\n# Données : HIERARCHY mg-tenant/mg-dev/sub-sandbox-02/rg-api-dev-use-02\nA_COMPLETER\n\n[Cas 2 — Série B]\n# Données : HIERARCHY mg-root/sub-prod-01/rg-web-prod-fc-01\n# Données : HIERARCHY mg-root/mg-core/sub-01/sub-02/rg-data-prod-we-01\nA_COMPLETER\n\n[Cas 3 — Série C]\n# Données : HIERARCHY mg-root/mg-prod/sub-01/rg-web-preprod-we-01\n# Données : HIERARCHY mg-root/mg-prod/sub-01/rg-db-prod-paris-01\n# Données : HIERARCHY mg-root/mg-prod/sub-01/my-resource-group\nA_COMPLETER\n\n[Cas 4 — Série D]\n# Données : HIERARCHY mg-root//sub-01/rg-app-test-ne-01\nA_COMPLETER\n",
    "hints": [
      "Utiliser l’extraction des champs sur le chemin de la hiérarchie pour vérifier qu'il contient exactement 4 éléments.",
      "Valider le nom du groupe de ressources à l'aide d'une regex ou en découpant sur le tiret \"-\" : rg-<app>-<env>-<region>-<instance>.",
      "Vérifiez que les préfixes suivent la hiérarchie Management Group -> Subscription -> Resource Group -> Ressource et respectent les conventions alphanumériques."
    ],
    "examples": [
      {
        "stdin": "HIERARCHY mg-root/mg-core/sub-prod-01/rg-erp-prod-we-01",
        "expected": "VALID: HIERARCHY depth=4 sub=sub-prod-01 rg=rg-erp-prod-we-01 status=COMPLIANT",
        "note": "Chemin conforme à la convention fictive de cet exercice."
      }
    ],
    "tests": [
      {
        "label": "Hiérarchies conformes en production et dev",
        "stdin": "cas:1",
        "expected": "VALID: HIERARCHY depth=4 sub=sub-corp-01 rg=rg-web-prod-fc-01 status=COMPLIANT\nVALID: HIERARCHY depth=4 sub=sub-sandbox-02 rg=rg-api-dev-use-02 status=COMPLIANT"
      },
      {
        "label": "Erreur de hiérarchie malformée",
        "stdin": "cas:2",
        "expected": "INVALID: reason=MALFORMED_HIERARCHY\nINVALID: reason=MALFORMED_HIERARCHY"
      },
      {
        "label": "Nom de Resource Group non conforme (env ou région invalide)",
        "stdin": "cas:3",
        "expected": "INVALID: rg=rg-web-preprod-we-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=rg-db-prod-paris-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=my-resource-group reason=NON_COMPLIANT_NAMING"
      },
      {
        "label": "Segment vide dans la hiérarchie",
        "stdin": "cas:4",
        "expected": "INVALID: reason=MALFORMED_HIERARCHY"
      }
    ],
    "solution": "[Exemple]\nVALID: HIERARCHY depth=4 sub=sub-prod-01 rg=rg-erp-prod-we-01 status=COMPLIANT\n\n[Cas 1 — Hiérarchies conformes en production et dev]\nVALID: HIERARCHY depth=4 sub=sub-corp-01 rg=rg-web-prod-fc-01 status=COMPLIANT\nVALID: HIERARCHY depth=4 sub=sub-sandbox-02 rg=rg-api-dev-use-02 status=COMPLIANT\n\n[Cas 2 — Erreur de hiérarchie malformée]\nINVALID: reason=MALFORMED_HIERARCHY\nINVALID: reason=MALFORMED_HIERARCHY\n\n[Cas 3 — Nom de Resource Group non conforme (env ou région invalide)]\nINVALID: rg=rg-web-preprod-we-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=rg-db-prod-paris-01 reason=NON_COMPLIANT_NAMING\nINVALID: rg=my-resource-group reason=NON_COMPLIANT_NAMING\n\n[Cas 4 — Segment vide dans la hiérarchie]\nINVALID: reason=MALFORMED_HIERARCHY",
    "takeaway": "À retenir : Appliquer à des chemins une convention fictive de hiérarchie et de nommage inspirée d’Azure.\nRepère : Chemin conforme à la convention fictive de cet exercice."
  },
  {
    "id": "az3-c1-e2",
    "chapter": 1,
    "title": "Sélecteur de région, Zones de disponibilité et Paires géographiques",
    "level": "n2",
    "language": "analyse",
    "goal": "Appliquer une grille fictive de résilience et de réplication sans en déduire un SLA réel.",
    "brief": "<p>Une zone de disponibilité peut regrouper un ou plusieurs datacenters. Ce modèle fictif utilise des noms, nombres de zones et paires fournis uniquement pour l'exercice. Il ne permet pas de déduire ni de garantir un SLA : celui-ci dépend du service, de la configuration et des conditions applicables.<br><br>\nDonnées fictives pour cette grille, à ne pas utiliser comme inventaire Azure :<br>\n- <code>westeurope</code> : paired=<code>northeurope</code>, zones=3<br>\n- <code>northeurope</code> : paired=<code>westeurope</code>, zones=3<br>\n- <code>francecentral</code> : paired=<code>francesouth</code>, zones=3<br>\n- <code>eastus</code> : paired=<code>westus</code>, zones=3<br>\n- <code>germanywestcentral</code> : paired=<code>germanynorth</code>, zones=3<br>\n- <code>brazilsouth</code> : paired=<code>southcentralus</code>, zones=2<br><br>\nChaque cas indique une cible fictive (<code>99.9%</code>, <code>99.95%</code> ou <code>99.99%</code>). Les étiquettes <code>AZ_SUPPORTED</code> et <code>TARGET_SLA_UNMET</code> décrivent uniquement le résultat du modèle, et non un engagement réel.<br><br>\nRègles de décision :<br>\n1. Si la région n'est pas dans le catalogue :<br>\n   <code>REGION: &lt;nom_region&gt; -&gt; UNKNOWN_REGION</code><br>\n2. Si le SLA cible est <code>99.99%</code> :<br>\n   - Si la région possède au moins 3 zones de disponibilité (<code>zones &gt;= 3</code>) :<br>\n     <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=AZ_SUPPORTED (zones=&lt;zones&gt;) | PAIRED=&lt;paired&gt; | REPLICATION=ZRS_OR_GZRS</code><br>\n   - Sinon :<br>\n     <code>REGION: &lt;nom_region&gt; -&gt; INSUFFICIENT_ZONES (zones=&lt;zones&gt;) | TARGET_SLA_UNMET</code><br>\n3. Si le SLA cible est <code>99.95%</code> :<br>\n   <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=AVAILABILITY_SETS | PAIRED=&lt;paired&gt; | REPLICATION=LRS_OR_GRS</code><br>\n4. Si le SLA cible est inférieur ou égal à <code>99.9%</code> :<br>\n   <code>REGION: &lt;nom_region&gt; -&gt; RESILIENCE=SINGLE_VM_PREMIUM | PAIRED=&lt;paired&gt; | REPLICATION=LRS</code></p>",
    "starter": "# Grille d'analyse (az3-c1-e2) — Sélecteur de région, Zones de disponibilité et Paires géographiques (modèle fictif)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — SLA haute disponibilité 99.99% sur West Europe et France Central]\n# Données : REGION westeurope SLA 99.99%\n# Données : REGION francecentral SLA 99.99%\nA_COMPLETER\n\n[Cas 2 — Région avec zones insuffisantes pour 99.99%]\n# Données : REGION brazilsouth SLA 99.99%\nA_COMPLETER\n\n[Cas 3 — Paliers SLA 99.95% et 99.9% sur diverses régions]\n# Données : REGION northeurope SLA 99.95%\n# Données : REGION eastus SLA 99.9%\n# Données : REGION germanywestcentral SLA 99.95%\nA_COMPLETER\n\n[Cas 4 — Région non répertoriée]\n# Données : REGION mars-central SLA 99.99%\nA_COMPLETER\n",
    "hints": [
      "Utilisez exclusivement les nombres de zones et paires fictifs fournis dans le tableau.",
      "Appliquez les seuils du modèle sans conclure à un SLA réel ; vérifiez séparément les conditions du service.",
      "Croisez le support des Zones de Disponibilité (AZ >= 3) et la région paire fournie pour déterminer la résilience fictive, sans extrapoler un SLA contractuel."
    ],
    "examples": [
      {
        "stdin": "REGION westeurope SLA 99.99%",
        "expected": "REGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS",
        "note": "Dans ce modèle fictif, la grille associe trois zones à la cible 99.99% ; cela ne garantit aucun SLA réel."
      }
    ],
    "tests": [
      {
        "label": "SLA haute disponibilité 99.99% sur West Europe et France Central",
        "stdin": "cas:1",
        "expected": "REGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS\nREGION: francecentral -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=francesouth | REPLICATION=ZRS_OR_GZRS"
      },
      {
        "label": "Région avec zones insuffisantes pour 99.99%",
        "stdin": "cas:2",
        "expected": "REGION: brazilsouth -> INSUFFICIENT_ZONES (zones=2) | TARGET_SLA_UNMET"
      },
      {
        "label": "Paliers SLA 99.95% et 99.9% sur diverses régions",
        "stdin": "cas:3",
        "expected": "REGION: northeurope -> RESILIENCE=AVAILABILITY_SETS | PAIRED=westeurope | REPLICATION=LRS_OR_GRS\nREGION: eastus -> RESILIENCE=SINGLE_VM_PREMIUM | PAIRED=westus | REPLICATION=LRS\nREGION: germanywestcentral -> RESILIENCE=AVAILABILITY_SETS | PAIRED=germanynorth | REPLICATION=LRS_OR_GRS"
      },
      {
        "label": "Région non répertoriée",
        "stdin": "cas:4",
        "expected": "REGION: mars-central -> UNKNOWN_REGION"
      }
    ],
    "solution": "[Exemple]\nREGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS\n\n[Cas 1 — SLA haute disponibilité 99.99% sur West Europe et France Central]\nREGION: westeurope -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=northeurope | REPLICATION=ZRS_OR_GZRS\nREGION: francecentral -> RESILIENCE=AZ_SUPPORTED (zones=3) | PAIRED=francesouth | REPLICATION=ZRS_OR_GZRS\n\n[Cas 2 — Région avec zones insuffisantes pour 99.99%]\nREGION: brazilsouth -> INSUFFICIENT_ZONES (zones=2) | TARGET_SLA_UNMET\n\n[Cas 3 — Paliers SLA 99.95% et 99.9% sur diverses régions]\nREGION: northeurope -> RESILIENCE=AVAILABILITY_SETS | PAIRED=westeurope | REPLICATION=LRS_OR_GRS\nREGION: eastus -> RESILIENCE=SINGLE_VM_PREMIUM | PAIRED=westus | REPLICATION=LRS\nREGION: germanywestcentral -> RESILIENCE=AVAILABILITY_SETS | PAIRED=germanynorth | REPLICATION=LRS_OR_GRS\n\n[Cas 4 — Région non répertoriée]\nREGION: mars-central -> UNKNOWN_REGION",
    "takeaway": "À retenir : Appliquer une grille fictive de résilience et de réplication sans en déduire un SLA réel.\nRepère : Dans ce modèle fictif, la grille associe trois zones à la cible 99.99% ; cela ne garantit aucun SLA réel."
  },
  {
    "id": "az3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Le budget Azure de la boutique Norenza",
    "exampleTitle": "Exemple résolu — l'hébergement du site de l'agence Lumen",
    "goal": "Calculer le coût mensuel d'une flotte de machines virtuelles (calcul, disques, flux sortants) et l'économie apportée par une réservation.",
    "brief": "<p><strong>Énoncé.</strong> Norenza, PME de commerce en ligne de 12 salariés, dimensionne sa plateforme de e-commerce. L'architecte retient le barème mensuel suivant (tarifs de l'énoncé, calcul Linux en Europe de l'Ouest, mois de 730 heures) :</p><table><tr><th>Ressource</th><th>Tarif mensuel</th></tr><tr><th>VM Standard_B2s (calcul)</th><td>30,37 €</td></tr><tr><th>VM Standard_D4s_v5 (calcul)</th><td>140,16 €</td></tr><tr><th>VM Standard_E4s_v5 (calcul)</th><td>183,96 €</td></tr><tr><th>Disque SSD Premium P10 (128 Go)</th><td>19,71 €</td></tr><tr><th>Disque SSD Premium P20 (512 Go)</th><td>73,22 €</td></tr></table><p>Flux sortants (egress) : les 100 premiers Go du mois sont gratuits, puis chaque Go supplémentaire est facturé 0,087 €. Réservation de calcul : un engagement d'un an (RI 1 an) accorde 35 % de remise sur le seul coût de calcul des machines virtuelles ; les disques et les flux sortants ne bénéficient d'aucune remise.</p><p>La flotte retenue comprend <strong>2 VM Standard_D4s_v5</strong>, chacune munie d'<strong>1 disque P20</strong>, et l'application génère <strong>150 Go</strong> de flux sortants par mois. L'entreprise signe un engagement de réservation d'un an. Arrondissez chaque résultat au centime d'euro.</p><ol><li>Quel est le coût mensuel du calcul des 2 VM avant remise, en euros ?</li><li>Quel est le montant mensuel de la remise de réservation (35 % du calcul), en euros ?</li><li>Quel est le coût mensuel du calcul après remise, en euros ?</li><li>Quel est le coût mensuel des 2 disques P20, en euros ?</li><li>Quel est le coût mensuel des flux sortants pour 150 Go, en euros ?</li></ol>",
    "starter": "# Exercice — Le budget Azure de la boutique Norenza\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nombre seul, au centime d'euro près (par exemple 280,32).\n\n[Question 1 — Coût mensuel du calcul avant remise (en €)]\nA_COMPLETER\n\n[Question 2 — Montant mensuel de la remise de réservation (en €)]\nA_COMPLETER\n\n[Question 3 — Coût mensuel du calcul après remise (en €)]\nA_COMPLETER\n\n[Question 4 — Coût mensuel des 2 disques P20 (en €)]\nA_COMPLETER\n\n[Question 5 — Coût mensuel des flux sortants pour 150 Go (en €)]\nA_COMPLETER\n",
    "hints": [
      "Le coût de calcul avant remise est la quantité de machines multipliée par le tarif mensuel d'une machine.",
      "La remise de réservation ne porte que sur le calcul : disques et flux sortants se calculent au tarif plein.",
      "1. Multipliez 2 par 140,16. 2. Prenez 35 % de ce résultat. 3. Soustrayez la remise du coût avant remise. 4. Multipliez 2 par 73,22. 5. Retirez les 100 Go gratuits puis multipliez par 0,087."
    ],
    "examples": [
      {
        "stdin": "L'agence Lumen héberge un site vitrine : 1 VM Standard_B2s avec 1 disque P10, 120 Go de\nflux sortants dans le mois et un engagement de réservation de 3 ans (60 % de remise\nsur le calcul seul).\n\n1) Calcul avant remise : 1 × 30,37 = 30,37 €.\n2) Remise 3 ans : 30,37 × 0,60 = 18,222, arrondie à 18,22 €.\n3) Calcul après remise : 30,37 − 18,22 = 12,15 €.\n4) Disque P10 : 1 × 19,71 = 19,71 €.\n5) Flux sortants : 120 − 100 = 20 Go facturés, soit 20 × 0,087 = 1,74 €.",
        "expected": "calcul avant remise : 30,37 € — remise : 18,22 € — calcul après remise : 12,15 € — disque : 19,71 € — flux sortants : 1,74 €",
        "note": "La remise de réservation ne s'applique qu'au calcul : disques et flux sortants restent facturés au tarif plein."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Coût mensuel du calcul avant remise (en €)",
        "stdin": "q:1",
        "expected": "280,32||280.32"
      },
      {
        "label": "Question 2 — Montant mensuel de la remise de réservation (en €)",
        "stdin": "q:2",
        "expected": "98,11||98.11"
      },
      {
        "label": "Question 3 — Coût mensuel du calcul après remise (en €)",
        "stdin": "q:3",
        "expected": "182,21||182.21"
      },
      {
        "label": "Question 4 — Coût mensuel des 2 disques P20 (en €)",
        "stdin": "q:4",
        "expected": "146,44||146.44"
      },
      {
        "label": "Question 5 — Coût mensuel des flux sortants pour 150 Go (en €)",
        "stdin": "q:5",
        "expected": "4,35||4.35"
      }
    ],
    "solution": "[Question 1 — Coût mensuel du calcul avant remise (en €)]\n280,32\n\n[Question 2 — Montant mensuel de la remise de réservation (en €)]\n98,11\n\n[Question 3 — Coût mensuel du calcul après remise (en €)]\n182,21\n\n[Question 4 — Coût mensuel des 2 disques P20 (en €)]\n146,44\n\n[Question 5 — Coût mensuel des flux sortants pour 150 Go (en €)]\n4,35",
    "takeaway": "1) Calcul avant remise : 2 × 140,16 = 280,32 €.\n2) Remise RI 1 an : 280,32 × 0,35 = 98,112, arrondie à 98,11 €.\n3) Calcul après remise : 280,32 − 98,11 = 182,21 €.\n4) Disques : 2 × 73,22 = 146,44 €.\n5) Flux sortants : 150 − 100 = 50 Go facturés, soit 50 × 0,087 = 4,35 €.\nContrôle : coût total de la flotte = 182,21 + 146,44 + 4,35 = 333,00 € par mois."
  }
];
