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
  },
  {
    "id": "az3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Les affectations RBAC de Delcourt Logistique",
    "exampleTitle": "Exemple résolu — les affectations RBAC du cabinet Sorgia",
    "goal": "Lire un tableau d'affectations RBAC (rôle, étendue) et raisonner sur l'héritage des permissions.",
    "brief": "<p><strong>Énoncé.</strong> Delcourt Logistique, PME de transport de 90 salariés, vient de déployer son environnement Azure. L'administratrice cloud dresse la liste des affectations de rôles RBAC :</p><table><tr><th>Utilisateur</th><th>Rôle</th><th>Étendue</th></tr><tr><th>Amélie (administratrice cloud)</th><td>Propriétaire</td><td>abonnement sub-prod-01</td></tr><tr><th>Karim (développeur)</th><td>Contributeur</td><td>groupe de ressources rg-web-prod-frc-01</td></tr><tr><th>Sofia (contrôleuse de gestion)</th><td>Lecteur</td><td>abonnement sub-prod-01</td></tr><tr><th>Lucas (stagiaire)</th><td>Lecteur</td><td>groupe de ressources rg-web-prod-frc-01</td></tr></table><p>Rappel du cours : une affectation RBAC accorde un rôle à une identité sur une étendue (abonnement, groupe de ressources ou ressource) ; les permissions descendent dans la hiérarchie, du haut vers le bas.</p><ol><li>Combien d'affectations de rôles le tableau comporte-t-il ?</li><li>Quel rôle permet de créer et de modifier des ressources, mais pas de gérer les accès des autres utilisateurs ?</li><li>Le rôle Lecteur de Sofia, attribué sur l'abonnement, s'applique-t-il aussi au groupe de ressources rg-web-prod-frc-01 ?</li><li>Qui, dans ce tableau, peut attribuer des rôles aux autres utilisateurs sur l'abonnement sub-prod-01 ?</li><li>Le rôle Contributeur de Karim s'applique-t-il aux ressources contenues dans rg-web-prod-frc-01 ?</li></ol>",
    "starter": "# Exercice — Les affectations RBAC de Delcourt Logistique\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le nom du rôle. Questions 3 et 5 : oui ou non.\n\n[Question 1 — Nombre d'affectations de rôles]\nA_COMPLETER\n\n[Question 2 — Rôle permettant de créer et modifier sans gérer les accès]\nA_COMPLETER\n\n[Question 3 — Le Lecteur de Sofia s'applique-t-il au groupe de ressources]\nA_COMPLETER\n\n[Question 4 — Qui peut attribuer des rôles sur l'abonnement]\nA_COMPLETER\n\n[Question 5 — Le Contributeur de Karim s'applique-t-il aux ressources du groupe]\nA_COMPLETER\n",
    "hints": [
      "Chaque ligne du tableau correspond à une affectation : une identité, un rôle, une étendue.",
      "Hiérarchie des rôles du cours : Lecteur (consulter), Contributeur (créer et modifier), Propriétaire (tout, y compris la gestion des accès).",
      "1. Comptez les lignes. 2. Cherchez le rôle « sans gestion des accès ». 3. Suivez le sens de l'héritage, du haut vers le bas. 4. Cherchez le rôle qui inclut la gestion des accès au niveau de l'abonnement. 5. Une ressource appartient à son groupe de ressources."
    ],
    "examples": [
      {
        "stdin": "Le cabinet Sorgia liste ses affectations RBAC :\n- Nadia, Propriétaire, sur le groupe de ressources rg-crm-prod-frc-01 ;\n- Paul, Contributeur, sur l'abonnement sub-cabinet-01 ;\n- Inès, Lecteur, sur le groupe de ressources rg-crm-prod-frc-01.\n\n1) Le tableau comporte 3 affectations.\n2) Le rôle Contributeur permet de créer et modifier sans gérer les accès.\n3) Paul, Contributeur sur l'abonnement, peut agir sur rg-crm-prod-frc-01 par héritage.\n4) Seule Nadia, Propriétaire, peut gérer les accès sur son étendue.",
        "expected": "3 affectations — Contributeur pour créer et modifier — héritage de l'abonnement vers le groupe de ressources — le Propriétaire gère les accès",
        "note": "Les permissions RBAC descendent de l'abonnement vers les groupes de ressources puis les ressources : une étendue large couvre automatiquement les étendues inférieures."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'affectations de rôles",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Rôle permettant de créer et modifier sans gérer les accès",
        "stdin": "q:2",
        "expected": "contributeur||contributor"
      },
      {
        "label": "Question 3 — Le Lecteur de Sofia s'applique-t-il au groupe de ressources",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Qui peut attribuer des rôles sur l'abonnement",
        "stdin": "q:4",
        "expected": "amélie||amelie||amélie (propriétaire)||le propriétaire||propriétaire"
      },
      {
        "label": "Question 5 — Le Contributeur de Karim s'applique-t-il aux ressources du groupe",
        "stdin": "q:5",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Nombre d'affectations de rôles]\n4\n\n[Question 2 — Rôle permettant de créer et modifier sans gérer les accès]\ncontributeur\n\n[Question 3 — Le Lecteur de Sofia s'applique-t-il au groupe de ressources]\noui\n\n[Question 4 — Qui peut attribuer des rôles sur l'abonnement]\namélie\n\n[Question 5 — Le Contributeur de Karim s'applique-t-il aux ressources du groupe]\noui",
    "takeaway": "1) Le tableau comporte 4 affectations : Amélie, Karim, Sofia et Lucas.\n2) Le rôle Contributeur permet de créer et de modifier des ressources, mais pas d'attribuer des rôles : la gestion des accès appartient au Propriétaire.\n3) Oui : le rôle attribué sur l'abonnement descend par héritage vers tous les groupes de ressources qu'il contient, dont rg-web-prod-frc-01.\n4) Amélie : son rôle Propriétaire sur l'abonnement inclut la gestion des accès (attribution de rôles).\n5) Oui : les permissions du groupe de ressources s'appliquent aux ressources qu'il contient.\nContrôle : sur une même étendue, l'ordre des rôles du plus puissant au moins puissant est Propriétaire > Contributeur > Lecteur."
  },
  {
    "id": "az3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit Azure Policy de Brume Diffusion",
    "exampleTitle": "Exemple résolu — l'audit Azure Policy du serrurier Voltige",
    "goal": "Évaluer la conformité de ressources face à des stratégies Azure Policy (effets Refuser et Audit) et choisir l'étendue d'application.",
    "brief": "<p><strong>Énoncé.</strong> Brume Diffusion, PME de distribution de produits d'entretien, applique deux stratégies Azure Policy à son abonnement :</p><ul><li><strong>Stratégie « emplacements autorisés » (effet Refuser)</strong> : toute nouvelle ressource doit être déployée dans francecentral ou northeurope ; tout déploiement hors de ces régions est refusé ;</li><li><strong>Stratégie « balise propriétaire obligatoire » (effet Audit)</strong> : tout groupe de ressources doit porter une balise (tag) <code>propriétaire</code> ; les groupes sans balise sont signalés comme non conformes, sans être bloqués.</li></ul><p>L'audit du jour dresse l'état suivant :</p><table><tr><th>Ressource</th><th>Région</th><th>Observation</th></tr><tr><th>rg-compta-prod-frc-01</th><td>francecentral</td><td>balise propriétaire : oui</td></tr><tr><th>rg-marketing-prod-frc-01</th><td>francecentral</td><td>balise propriétaire : non</td></tr><tr><th>vm-facturation-01</th><td>francecentral</td><td>—</td></tr><tr><th>st-archives-01 (compte de stockage)</th><td>uksouth</td><td>créé avant la stratégie</td></tr></table><ol><li>Combien de ressources du tableau sont non conformes à la stratégie « emplacements autorisés » ?</li><li>Un développeur tente de créer une machine virtuelle dans uksouth : que fait la stratégie d'effet Refuser ?</li><li>La stratégie « balise propriétaire » (effet Audit) bloque-t-elle la création d'un groupe de ressources sans balise ?</li><li>Combien de groupes de ressources sont signalés comme non conformes à la stratégie de balise ?</li><li>Sur quelle étendue faut-il affecter une stratégie pour qu'elle s'applique à plusieurs abonnements à la fois ?</li></ol>",
    "starter": "# Exercice — L'audit Azure Policy de Brume Diffusion\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 5 : répondez de façon courte.\n\n[Question 1 — Ressources non conformes à la stratégie d'emplacements]\nA_COMPLETER\n\n[Question 2 — Action de la stratégie d'effet Refuser sur un déploiement dans uksouth]\nA_COMPLETER\n\n[Question 3 — La stratégie d'effet Audit bloque-t-elle la création]\nA_COMPLETER\n\n[Question 4 — Groupes de ressources signalés sans balise]\nA_COMPLETER\n\n[Question 5 — Étendue pour appliquer une stratégie à plusieurs abonnements]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque ressource, vérifiez d'abord la région (stratégie d'emplacements), puis la balise (stratégie de balisage) : ce sont deux contrôles indépendants.",
      "Effet Refuser : le déploiement est rejeté. Effet Audit : la ressource existe mais est signalée non conforme.",
      "1. Comptez les ressources hors de francecentral et northeurope. 2. Appliquez l'effet Refuser. 3. Relisez ce que fait l'effet Audit. 4. Comptez les groupes de ressources sans balise. 5. Cherchez l'étendue située au-dessus des abonnements."
    ],
    "examples": [
      {
        "stdin": "Le serrurier Voltige applique une stratégie « emplacements autorisés » (effet Refuser,\nfrancecentral uniquement) et une stratégie « balise service obligatoire » (effet Audit).\nAudit : rg-atelier-frc-01 (francecentral, balise absente), rg-boutique-frc-01\n(francecentral, balise présente), st-voltige-01 (westeurope, créé avant la stratégie).\n\n1) 1 ressource est hors région autorisée : st-voltige-01.\n2) Un déploiement dans westeurope serait refusé (effet Refuser).\n3) La stratégie de balise (Audit) signale sans bloquer.\n4) 1 groupe de ressources est signalé sans balise : rg-atelier-frc-01.\n5) Pour viser plusieurs abonnements, on affecte la stratégie à un groupe de gestion.",
        "expected": "1 ressource hors région — déploiement refusé — Audit signale sans bloquer — 1 groupe signalé — étendue : le groupe de gestion",
        "note": "L'effet Refuser protège l'avenir en empêchant les déploiements non conformes ; l'effet Audit mesure l'existant sans l'empêcher."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ressources non conformes à la stratégie d'emplacements",
        "stdin": "q:1",
        "expected": "1||une"
      },
      {
        "label": "Question 2 — Action de la stratégie d'effet Refuser sur un déploiement dans uksouth",
        "stdin": "q:2",
        "expected": "refusé||refuse||le déploiement est refusé||bloqué||bloque le déploiement||deny"
      },
      {
        "label": "Question 3 — La stratégie d'effet Audit bloque-t-elle la création",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Groupes de ressources signalés sans balise",
        "stdin": "q:4",
        "expected": "1||une"
      },
      {
        "label": "Question 5 — Étendue pour appliquer une stratégie à plusieurs abonnements",
        "stdin": "q:5",
        "expected": "le groupe de gestion||groupe de gestion||au groupe de gestion||management group||un groupe de gestion"
      }
    ],
    "solution": "[Question 1 — Ressources non conformes à la stratégie d'emplacements]\n1\n\n[Question 2 — Action de la stratégie d'effet Refuser sur un déploiement dans uksouth]\nrefusé\n\n[Question 3 — La stratégie d'effet Audit bloque-t-elle la création]\nnon\n\n[Question 4 — Groupes de ressources signalés sans balise]\n1\n\n[Question 5 — Étendue pour appliquer une stratégie à plusieurs abonnements]\nle groupe de gestion",
    "takeaway": "1) Une seule ressource est non conforme à la stratégie d'emplacements : st-archives-01, déployée dans uksouth.\n2) La stratégie d'effet Refuser rejette le déploiement : la machine virtuelle n'est pas créée.\n3) Non : l'effet Audit se contente de signaler le groupe de ressources comme non conforme ; il ne bloque rien.\n4) Un seul groupe de ressources est signalé : rg-marketing-prod-frc-01, dépourvu de balise propriétaire.\n5) Il faut affecter la stratégie à un groupe de gestion : cette étendue couvre plusieurs abonnements à la fois.\nContrôle : rg-compta-prod-frc-01 et vm-facturation-01 sont dans une région autorisée et ne violent aucune des deux stratégies."
  },
  {
    "id": "az3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "L'expiration des secrets du coffre Fortis Finance",
    "exampleTitle": "Exemple résolu — l'audit du coffre de la mutuelle Prévia",
    "goal": "Suivre la date d'expiration des secrets d'un coffre Azure Key Vault, calculer les délais de rotation et identifier le rôle de lecture adapté.",
    "brief": "<p><strong>Énoncé.</strong> Fortis Finance, cabinet de conseil en gestion de patrimoine, stocke ses secrets d'application dans le coffre Azure Key Vault <code>kv-fortis-prod</code>. La politique interne impose de renouveler chaque secret avant sa date d'expiration. Voici l'état du coffre lors de l'audit du <strong>1er mai 2025</strong> :</p><table><tr><th>Secret</th><th>Date d'expiration</th></tr><tr><th>mot-de-passe-bdd</th><td>12 mars 2025</td></tr><tr><th>cle-api-banque</th><td>30 avril 2025</td></tr><tr><th>jeton-partenaires</th><td>15 juin 2025</td></tr><tr><th>certificat-signature</th><td>9 août 2025</td></tr></table><p>Rappels du cours : un secret expiré ne peut plus être lu par les applications ; le rôle RBAC « Utilisateur des secrets du coffre de clés » (Key Vault Secrets User) autorise la lecture des secrets sans autoriser leur modification. Le mois de mai compte 31 jours.</p><ol><li>Combien de secrets sont déjà expirés au 1er mai 2025 ?</li><li>Combien de jours reste-t-il avant l'expiration de jeton-partenaires ?</li><li>Quel est le prochain secret à renouveler parmi ceux encore valides ?</li><li>Une application tente de lire le secret mot-de-passe-bdd : que se passe-t-il ?</li><li>Quel rôle RBAC faut-il donner à une application pour qu'elle puisse lire les secrets sans les modifier ?</li></ol>",
    "starter": "# Exercice — L'expiration des secrets du coffre Fortis Finance\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le nombre de jours. Question 4 : répondez de façon courte.\n\n[Question 1 — Secrets déjà expirés au 1er mai 2025]\nA_COMPLETER\n\n[Question 2 — Jours restants avant l'expiration de jeton-partenaires]\nA_COMPLETER\n\n[Question 3 — Prochain secret à renouveler]\nA_COMPLETER\n\n[Question 4 — Lecture du secret mot-de-passe-bdd]\nA_COMPLETER\n\n[Question 5 — Rôle RBAC de lecture seule des secrets]\nA_COMPLETER\n",
    "hints": [
      "Classez les secrets en deux colonnes : ceux dont la date d'expiration est antérieure au 1er mai 2025 (expirés) et les autres.",
      "Pour le délai, comptez d'abord les jours restants en mai (du 1er au 31), puis ajoutez les jours de juin.",
      "1. Comparez chaque date au 1er mai. 2. Mai compte 31 jours. 3. Le prochain à renouveler est celui dont l'expiration est la plus proche de l'audit. 4. Rappelez-vous du comportement d'un secret expiré. 5. Le rôle de lecture porte le mot « secrets » dans son nom."
    ],
    "examples": [
      {
        "stdin": "La mutuelle Prévia audite son coffre kv-previa-prod le 1er mars 2025 :\n- secret-ldap : expiré le 8 février 2025 ;\n- cle-paiement : expire le 20 mars 2025 ;\n- jeton-api : expire le 30 avril 2025.\n\n1) 1 secret est déjà expiré : secret-ldap.\n2) Du 1er mars au 20 mars : 19 jours avant expiration de cle-paiement.\n3) Le prochain à renouveler est cle-paiement.\n4) Lire secret-ldap échoue : un secret expiré n'est plus lisible.\n5) Le rôle « Utilisateur des secrets du coffre de clés » autorise la lecture seule.",
        "expected": "1 secret expiré — 19 jours restants — prochain : cle-paiement — lecture refusée — rôle : Utilisateur des secrets du coffre de clés",
        "note": "L'expiration d'un secret est une protection : mieux vaut une application en échec qu'un secret périmé encore utilisé en production."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Secrets déjà expirés au 1er mai 2025",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Jours restants avant l'expiration de jeton-partenaires",
        "stdin": "q:2",
        "expected": "45||45 jours"
      },
      {
        "label": "Question 3 — Prochain secret à renouveler",
        "stdin": "q:3",
        "expected": "jeton-partenaires||jeton partenaires"
      },
      {
        "label": "Question 4 — Lecture du secret mot-de-passe-bdd",
        "stdin": "q:4",
        "expected": "la lecture échoue||la lecture est refusée||échec||echec||refusée||refusee||refusé||erreur"
      },
      {
        "label": "Question 5 — Rôle RBAC de lecture seule des secrets",
        "stdin": "q:5",
        "expected": "utilisateur des secrets du coffre de clés||key vault secrets user||utilisateur des secrets key vault||utilisateur de secrets du coffre de clés"
      }
    ],
    "solution": "[Question 1 — Secrets déjà expirés au 1er mai 2025]\n2\n\n[Question 2 — Jours restants avant l'expiration de jeton-partenaires]\n45\n\n[Question 3 — Prochain secret à renouveler]\njeton-partenaires\n\n[Question 4 — Lecture du secret mot-de-passe-bdd]\nla lecture échoue\n\n[Question 5 — Rôle RBAC de lecture seule des secrets]\nutilisateur des secrets du coffre de clés",
    "takeaway": "1) Deux secrets sont expirés : mot-de-passe-bdd (12 mars 2025) et cle-api-banque (30 avril 2025), deux dates antérieures au 1er mai 2025.\n2) Du 1er mai au 31 mai : 30 jours ; du 31 mai au 15 juin : 15 jours ; soit 45 jours avant l'expiration de jeton-partenaires.\n3) Parmi les secrets encore valides, jeton-partenaires (15 juin) expire avant certificat-signature (9 août) : c'est le prochain à renouveler.\n4) La lecture échoue : un secret expiré n'est plus retourné par le coffre ; l'application doit récupérer la version renouvelée.\n5) Le rôle « Utilisateur des secrets du coffre de clés » (Key Vault Secrets User) donne la lecture des secrets sans droit de modification.\nContrôle : au 1er mai, les quatre secrets se répartissent en 2 expirés, 1 secret encore valable 45 jours et 1 secret encore valable 100 jours (30 jours en mai + 30 en juin + 31 en juillet + 9 en août)."
  },
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
  },
  {
    "id": "az3-c4-e1",
    "chapter": 4,
    "title": "Calculateur d'adressage Azure VNet & Adresses IP réservées",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la plage d’adresses IP d’un sous-réseau Azure en déduisant les 5 adresses réservées par le système SDN d’Azure.",
    "brief": "<p>Dans chaque sous-réseau IPv4 Azure, les quatre premières adresses et la dernière sont réservées : <strong>5 adresses IP</strong> ne peuvent pas être assignées aux ressources clientes. Les décalages partent de l'adresse réseau du sous-réseau :<br>\n- <code>+0</code> : adresse réseau (Network ID)<br>\n- <code>+1</code> : passerelle par défaut Azure<br>\n- <code>+2</code> et <code>+3</code> : adresses réservées pour la correspondance Azure DNS, et non deux résolveurs<br>\n- dernière adresse : réservée ; le broadcast n'est pas pris en charge dans le VNet<br><br>\nLe DNS fourni par Azure utilise <code>168.63.129.16</code> ; un DNS personnalisé configuré sur le VNet ou l'interface peut être conservé.<br>\nLa première IP assignable est l'adresse réseau + 4, la dernière précède l'adresse finale, et le nombre d'IPs exploitables vaut <code>Total - 5</code>.<br><br>\nFormat d'entrée :<br>\n<code>SUBNET name=&lt;nom&gt; cidr=&lt;adresse/préfixe&gt;</code><br><br>\nFormat de sortie attendu :<br>\n<code>SUBNET &lt;nom&gt;: TOTAL=&lt;total&gt; USABLE=&lt;usable&gt; RESERVED=5 GATEWAY=&lt;gw_ip&gt; DNS_MAP_1=&lt;adresse_reseau_plus_2&gt; DNS_MAP_2=&lt;adresse_reseau_plus_3&gt; RANGE=&lt;first_usable&gt;-&lt;last_usable&gt;</code></p>",
    "starter": "# Grille d'analyse (az3-c4-e1) — Calculateur d'adressage Azure VNet & Adresses IP réservées\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau de base de données /24 distinct]\n# Données : SUBNET name=snet-db cidr=10.0.10.0/24\nA_COMPLETER\n\n[Cas 2 — Petit sous-réseau AzureBastionSubnet en /26]\n# Données : SUBNET name=AzureBastionSubnet cidr=10.0.2.0/26\nA_COMPLETER\n\n[Cas 3 — Sous-réseau GatewaySubnet minimal en /27]\n# Données : SUBNET name=GatewaySubnet cidr=192.168.0.0/27\nA_COMPLETER\n\n[Cas 4 — Sous-réseau /28 dont le réseau ne se termine pas par .0]\n# Données : SUBNET name=snet-offset cidr=10.0.5.16/28\nA_COMPLETER\n",
    "hints": [
      "Déterminez d’abord l’adresse réseau du CIDR, puis calculez les décalages à partir de cette adresse.",
      "La passerelle est à réseau + 1, les correspondances DNS à + 2 et + 3, et la première adresse assignable à + 4.",
      "Déterminez réseau, broadcast et passerelle Azure (.1), puis soustrayez les 5 IP réservées par Azure (.0, .1, .2, .3 et dernière) pour compter les hôtes utilisables."
    ],
    "examples": [
      {
        "stdin": "SUBNET name=snet-web cidr=10.0.1.0/24",
        "expected": "SUBNET snet-web: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.1.1 DNS_MAP_1=10.0.1.2 DNS_MAP_2=10.0.1.3 RANGE=10.0.1.4-10.0.1.254",
        "note": "Dans ce /24, 251 adresses sont exploitables ; DNS_MAP_1 et DNS_MAP_2 désignent les adresses réservées de correspondance."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau de base de données /24 distinct",
        "stdin": "cas:1",
        "expected": "SUBNET snet-db: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.10.1 DNS_MAP_1=10.0.10.2 DNS_MAP_2=10.0.10.3 RANGE=10.0.10.4-10.0.10.254"
      },
      {
        "label": "Petit sous-réseau AzureBastionSubnet en /26",
        "stdin": "cas:2",
        "expected": "SUBNET AzureBastionSubnet: TOTAL=64 USABLE=59 RESERVED=5 GATEWAY=10.0.2.1 DNS_MAP_1=10.0.2.2 DNS_MAP_2=10.0.2.3 RANGE=10.0.2.4-10.0.2.62"
      },
      {
        "label": "Sous-réseau GatewaySubnet minimal en /27",
        "stdin": "cas:3",
        "expected": "SUBNET GatewaySubnet: TOTAL=32 USABLE=27 RESERVED=5 GATEWAY=192.168.0.1 DNS_MAP_1=192.168.0.2 DNS_MAP_2=192.168.0.3 RANGE=192.168.0.4-192.168.0.30"
      },
      {
        "label": "Sous-réseau /28 dont le réseau ne se termine pas par .0",
        "stdin": "cas:4",
        "expected": "SUBNET snet-offset: TOTAL=16 USABLE=11 RESERVED=5 GATEWAY=10.0.5.17 DNS_MAP_1=10.0.5.18 DNS_MAP_2=10.0.5.19 RANGE=10.0.5.20-10.0.5.30"
      }
    ],
    "solution": "[Exemple]\nSUBNET snet-web: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.1.1 DNS_MAP_1=10.0.1.2 DNS_MAP_2=10.0.1.3 RANGE=10.0.1.4-10.0.1.254\n\n[Cas 1 — Sous-réseau de base de données /24 distinct]\nSUBNET snet-db: TOTAL=256 USABLE=251 RESERVED=5 GATEWAY=10.0.10.1 DNS_MAP_1=10.0.10.2 DNS_MAP_2=10.0.10.3 RANGE=10.0.10.4-10.0.10.254\n\n[Cas 2 — Petit sous-réseau AzureBastionSubnet en /26]\nSUBNET AzureBastionSubnet: TOTAL=64 USABLE=59 RESERVED=5 GATEWAY=10.0.2.1 DNS_MAP_1=10.0.2.2 DNS_MAP_2=10.0.2.3 RANGE=10.0.2.4-10.0.2.62\n\n[Cas 3 — Sous-réseau GatewaySubnet minimal en /27]\nSUBNET GatewaySubnet: TOTAL=32 USABLE=27 RESERVED=5 GATEWAY=192.168.0.1 DNS_MAP_1=192.168.0.2 DNS_MAP_2=192.168.0.3 RANGE=192.168.0.4-192.168.0.30\n\n[Cas 4 — Sous-réseau /28 dont le réseau ne se termine pas par .0]\nSUBNET snet-offset: TOTAL=16 USABLE=11 RESERVED=5 GATEWAY=10.0.5.17 DNS_MAP_1=10.0.5.18 DNS_MAP_2=10.0.5.19 RANGE=10.0.5.20-10.0.5.30",
    "takeaway": "À retenir : Calculer la plage d’adresses IP d’un sous-réseau Azure en déduisant les 5 adresses réservées par le système SDN d’Azure.\nRepère : Dans ce /24, 251 adresses sont exploitables ; DNS_MAP_1 et DNS_MAP_2 désignent les adresses réservées de correspondance."
  },
  {
    "id": "az3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le filtrage du portail des Ateliers Norvian",
    "exampleTitle": "Exemple résolu — le filtrage du site de l'imprimerie Rivoire",
    "goal": "Évaluer des règles de sécurité d'un groupe de sécurité réseau (NSG) selon leur priorité et connaître les règles par défaut.",
    "brief": "<p><strong>Énoncé.</strong> Ateliers Norvian, PME industrielle, publie son portail fournisseur sur une machine virtuelle protégée par un groupe de sécurité réseau (NSG). Rappel du cours : les règles sont évaluées de la priorité la plus basse à la plus haute (la règle de priorité 100 passe avant celle de priorité 200) ; la première règle qui correspond au paquet détermine l'action.</p><p>Règles personnalisées du NSG (trafic entrant) :</p><table><tr><th>Priorité</th><th>Nom</th><th>Port</th><th>Source</th><th>Action</th></tr><tr><th>100</th><td>Allow-HTTP</td><td>80</td><td>Internet</td><td>Autoriser</td></tr><tr><th>110</th><td>Allow-HTTPS</td><td>443</td><td>Internet</td><td>Autoriser</td></tr><tr><th>200</th><td>Allow-SSH-Bastion</td><td>22</td><td>AzureBastionSubnet</td><td>Autoriser</td></tr><tr><th>1000</th><td>Deny-All-Inbound</td><td>tous</td><td>quelconque</td><td>Refuser</td></tr></table><p>Le NSG conserve aussi ses règles par défaut : AllowVnetInBound (priorité 65000), AllowAzureLoadBalancerInBound (65001) et DenyAllInbound (65500).</p><ol><li>Un paquet TCP arrive d'Internet sur le port 443 : quelle règle s'applique ?</li><li>Un paquet TCP arrive d'Internet sur le port 3389 (RDP) : quelle action le NSG applique-t-il ?</li><li>Un paquet TCP arrive du sous-réseau AzureBastionSubnet sur le port 22 : est-il autorisé ou refusé ?</li><li>Deux règles correspondent à un même paquet, l'une de priorité 100, l'autre de priorité 200 : laquelle est évaluée en premier ?</li><li>Quel numéro de priorité porte la règle par défaut DenyAllInbound ?</li></ol>",
    "starter": "# Exercice — Le filtrage du portail des Ateliers Norvian\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nom de la règle. Question 3 : autorisé ou refusé.\n\n[Question 1 — Règle appliquée à un paquet TCP 443 depuis Internet]\nA_COMPLETER\n\n[Question 2 — Action du NSG sur un paquet TCP 3389 depuis Internet]\nA_COMPLETER\n\n[Question 3 — Sort d'un paquet TCP 22 depuis AzureBastionSubnet]\nA_COMPLETER\n\n[Question 4 — Règle évaluée en premier entre les priorités 100 et 200]\nA_COMPLETER\n\n[Question 5 — Priorité de la règle par défaut DenyAllInbound]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque paquet, parcourez les règles par priorité croissante et arrêtez-vous à la première qui correspond au port et à la source.",
      "La priorité est un numéro : plus il est petit, plus la règle est évaluée tôt ; 100 passe avant 200, qui passe avant 1000.",
      "1. Port 443 : cherchez la règle dédiée. 2. Aucune règle d'autorisation ne couvre le port 3389 : la règle de refus générale s'applique. 3. La règle 200 couvre le port 22 depuis le sous-réseau Bastion. 4. Comparez les deux numéros. 5. Relisez les trois règles par défaut."
    ],
    "examples": [
      {
        "stdin": "L'imprimerie Rivoire filtre la machine virtuelle de son site avec un NSG :\n- priorité 150 : Allow-HTTPS, port 443, Internet, Autoriser ;\n- priorité 400 : Deny-All-Inbound, tous ports, quelconque, Refuser ;\n- règles par défaut : AllowVnetInBound (65000), DenyAllInbound (65500).\n\n1) Un paquet Internet sur 443 correspond à Allow-HTTPS (priorité 150) : autorisé.\n2) Un paquet Internet sur le port 8080 atteint Deny-All-Inbound (400) : refusé.\n3) La priorité 150 est évaluée avant la priorité 400.\n4) La règle par défaut DenyAllInbound porte le numéro 65500.",
        "expected": "443 : autorisé par Allow-HTTPS — 8080 : refusé par Deny-All-Inbound — la priorité 150 passe avant la 400 — DenyAllInbound : 65500",
        "note": "La règle personnalisée de refus explicite (priorité 400) s'applique avant les règles par défaut : inutile d'attendre la priorité 65500 pour bloquer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Règle appliquée à un paquet TCP 443 depuis Internet",
        "stdin": "q:1",
        "expected": "allow-https||allowhttps||allow https||la règle allow-https (priorité 110)"
      },
      {
        "label": "Question 2 — Action du NSG sur un paquet TCP 3389 depuis Internet",
        "stdin": "q:2",
        "expected": "refusé||refuse||bloqué||le paquet est refusé||refuser"
      },
      {
        "label": "Question 3 — Sort d'un paquet TCP 22 depuis AzureBastionSubnet",
        "stdin": "q:3",
        "expected": "autorise||autoriser||autorisé||le paquet est autorisé||allow"
      },
      {
        "label": "Question 4 — Règle évaluée en premier entre les priorités 100 et 200",
        "stdin": "q:4",
        "expected": "celle de priorité 100||la règle de priorité 100||100||la priorité 100"
      },
      {
        "label": "Question 5 — Priorité de la règle par défaut DenyAllInbound",
        "stdin": "q:5",
        "expected": "65500"
      }
    ],
    "solution": "[Question 1 — Règle appliquée à un paquet TCP 443 depuis Internet]\nallow-https\n\n[Question 2 — Action du NSG sur un paquet TCP 3389 depuis Internet]\nrefusé\n\n[Question 3 — Sort d'un paquet TCP 22 depuis AzureBastionSubnet]\nautorise\n\n[Question 4 — Règle évaluée en premier entre les priorités 100 et 200]\ncelle de priorité 100\n\n[Question 5 — Priorité de la règle par défaut DenyAllInbound]\n65500",
    "takeaway": "1) Le paquet TCP 443 depuis Internet correspond à la règle Allow-HTTPS (priorité 110) : il est autorisé.\n2) Aucune règle d'autorisation ne couvre le port 3389 : la première règle correspondante est Deny-All-Inbound (priorité 1000), le paquet est refusé.\n3) Le paquet SSH depuis AzureBastionSubnet correspond à Allow-SSH-Bastion (priorité 200) : il est autorisé.\n4) La règle de priorité 100 est évaluée avant celle de priorité 200 : le numéro le plus bas gagne.\n5) La règle par défaut DenyAllInbound porte la priorité 65500.\nContrôle : ordre d'évaluation du NSG : 100, 110, 200, 1000, puis les règles par défaut 65000, 65001 et 65500."
  },
  {
    "id": "az3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "La topologie hub-and-spoke du groupe Palissy",
    "exampleTitle": "Exemple résolu — le hub-and-spoke du réseau de cliniques Axelys",
    "goal": "Concevoir un maillage de peerings entre réseaux virtuels Azure (hub-and-spoke) et vérifier la compatibilité des espaces d'adressage.",
    "brief": "<p><strong>Énoncé.</strong> Le groupe Palissy, distributeur disposant de quatre sites, déploie une topologie hub-and-spoke :</p><table><tr><th>Réseau virtuel</th><th>Rôle</th><th>Espace d'adressage</th></tr><tr><th>vnet-hub</th><td>hub (héberge le pare-feu)</td><td>10.10.0.0/16</td></tr><tr><th>vnet-entrepot-est</th><td>spoke</td><td>10.20.0.0/16</td></tr><tr><th>vnet-entrepot-ouest</th><td>spoke</td><td>10.30.0.0/16</td></tr><tr><th>vnet-bureaux</th><td>spoke</td><td>10.40.0.0/16</td></tr></table><p>Rappels du cours : un peering entre deux réseaux virtuels exige deux liaisons, une configurée dans chaque sens ; un peering est impossible entre deux réseaux dont les espaces d'adressage se chevauchent ; dans une topologie hub-and-spoke, le trafic entre deux spokes traverse le hub, qui le route.</p><ol><li>Combien de peerings (liaisons hub-spoke) la topologie établit-elle entre le hub et les trois spokes ?</li><li>Chaque peering exige une liaison par sens : combien de liaisons faut-il configurer au total ?</li><li>Les espaces 10.10.0.0/16 et 10.20.0.0/16 se chevauchent-ils ?</li><li>Par quel réseau virtuel transite le trafic entre vnet-entrepot-est et vnet-entrepot-ouest ?</li><li>Un nouveau site souhaite rejoindre la topologie avec l'espace 10.20.0.0/16 : le peering est-il possible ?</li></ol>",
    "starter": "# Exercice — La topologie hub-and-spoke du groupe Palissy\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 5 : oui ou non. Question 4 : le nom du réseau virtuel.\n\n[Question 1 — Nombre de peerings hub-spoke]\nA_COMPLETER\n\n[Question 2 — Nombre total de liaisons à configurer]\nA_COMPLETER\n\n[Question 3 — Chevauchement entre 10.10.0.0/16 et 10.20.0.0/16]\nA_COMPLETER\n\n[Question 4 — Réseau virtuel de transit entre les deux spokes]\nA_COMPLETER\n\n[Question 5 — Peering possible avec un espace 10.20.0.0/16 supplémentaire]\nA_COMPLETER\n",
    "hints": [
      "Comptez les paires hub-spoke : un peering relie le hub à un spoke, pas les spokes entre eux.",
      "Chaque paire demande deux liaisons : une déclarée depuis chaque réseau virtuel.",
      "1. Un peering par spoke. 2. Multipliez par deux. 3. Comparez les blocs /16 : le deuxième octet suffit à les distinguer. 4. En hub-and-spoke, les spokes ne se parlent pas directement. 5. Vérifiez si la plage demandée existe déjà dans la topologie."
    ],
    "examples": [
      {
        "stdin": "Le réseau de cliniques Axelys construit un hub vnet-hub-axelys (10.50.0.0/16) relié à\ndeux spokes : vnet-imagerie (10.60.0.0/16) et vnet-admin (10.70.0.0/16).\n\n1) La topologie compte 2 peerings hub-spoke.\n2) Il faut 2 liaisons par peering, soit 4 liaisons au total.\n3) 10.50.0.0/16 et 10.60.0.0/16 ne se chevauchent pas.\n4) Le trafic imagerie-admin transite par le hub.\n5) Un spoke supplémentaire en 10.60.0.0/16 serait refusé : chevauchement avec vnet-imagerie.",
        "expected": "2 peerings — 4 liaisons — pas de chevauchement — transit par le hub — chevauchement refusé",
        "note": "Chaque peering se configure par deux liaisons distinctes, une par sens : un sens oublié et le trafic ne passe que dans une seule direction."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de peerings hub-spoke",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Nombre total de liaisons à configurer",
        "stdin": "q:2",
        "expected": "6||six"
      },
      {
        "label": "Question 3 — Chevauchement entre 10.10.0.0/16 et 10.20.0.0/16",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Réseau virtuel de transit entre les deux spokes",
        "stdin": "q:4",
        "expected": "le hub||hub||vnet-hub||le hub (vnet-hub)||par vnet-hub"
      },
      {
        "label": "Question 5 — Peering possible avec un espace 10.20.0.0/16 supplémentaire",
        "stdin": "q:5",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Nombre de peerings hub-spoke]\n3\n\n[Question 2 — Nombre total de liaisons à configurer]\n6\n\n[Question 3 — Chevauchement entre 10.10.0.0/16 et 10.20.0.0/16]\nnon\n\n[Question 4 — Réseau virtuel de transit entre les deux spokes]\nle hub\n\n[Question 5 — Peering possible avec un espace 10.20.0.0/16 supplémentaire]\nnon",
    "takeaway": "1) La topologie établit 3 peerings : hub-est, hub-ouest et hub-bureaux.\n2) Chaque peering exige 2 liaisons (une par sens) : 3 × 2 = 6 liaisons à configurer.\n3) Non : 10.10.0.0/16 couvre les adresses 10.10.x.x et 10.20.0.0/16 couvre les adresses 10.20.x.x ; aucune adresse commune.\n4) Le trafic entre les deux spokes transite par le hub (vnet-hub), qui le route — typiquement à travers le pare-feu.\n5) Non : l'espace 10.20.0.0/16 est déjà utilisé par vnet-entrepot-est ; le peering serait refusé pour chevauchement.\nContrôle : 3 pairings actifs, chacun configuré dans les deux sens, soit 6 liaisons — le hub route les flux entre spokes sans peering direct entre eux."
  },
  {
    "id": "az3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les paliers d'accès des archives de l'étude Daubrun",
    "exampleTitle": "Exemple résolu — l'archivage des plans du cabinet Tympan",
    "goal": "Choisir le palier d'accès d'un stockage Blob (chaud, froid, archive) selon la fréquence de consultation et calculer le coût de stockage.",
    "brief": "<p><strong>Énoncé.</strong> L'étude notariale Daubrun, forte de 12 collaborateurs, archive ses actes scannés dans le stockage Blob Azure. Le tarif mensuel de l'énoncé distingue trois paliers d'accès :</p><table><tr><th>Palier</th><th>Prix au Go / mois</th><th>Usage prévu</th><th>Rétention minimale</th></tr><tr><th>Chaud (Hot)</th><td>0,018 €</td><td>accès fréquent</td><td>aucune</td></tr><tr><th>Froid (Cool)</th><td>0,010 €</td><td>accès occasionnel</td><td>30 jours</td></tr><tr><th>Archive</th><td>0,001 €</td><td>accès rare, récupération lente</td><td>180 jours</td></tr></table><p>L'étude stocke <strong>500 Go</strong> d'actes de l'année en cours, consultés chaque semaine par les notaires, et <strong>2 000 Go</strong> d'actes de plus de dix ans, consultés environ une fois par an.</p><ol><li>Quel palier convient aux 500 Go d'actes de l'année en cours ?</li><li>Quel palier propose le prix au Go le plus bas ?</li><li>Quel est le coût mensuel de stockage des 500 Go en palier chaud, en euros ?</li><li>Quel est le coût mensuel de stockage des 2 000 Go en palier Archive, en euros ?</li><li>Combien de jours de rétention minimale le palier Archive impose-t-il ?</li></ol>",
    "starter": "# Exercice — Les paliers d'accès des archives de l'étude Daubrun\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nom du palier. Questions 3 à 5 : le nombre seul.\n\n[Question 1 — Palier adapté aux actes de l'année en cours]\nA_COMPLETER\n\n[Question 2 — Palier au prix au Go le plus bas]\nA_COMPLETER\n\n[Question 3 — Coût mensuel des 500 Go en palier chaud (en €)]\nA_COMPLETER\n\n[Question 4 — Coût mensuel des 2 000 Go en palier Archive (en €)]\nA_COMPLETER\n\n[Question 5 — Rétention minimale du palier Archive (en jours)]\nA_COMPLETER\n",
    "hints": [
      "Le palier se choisit selon la fréquence d'accès : chaque semaine, c'est un accès fréquent ; une fois par an, c'est un accès rare.",
      "Le coût d'un volume se calcule en multipliant les Go par le prix au Go du palier concerné.",
      "1. Les actes de l'année sont consultés chaque semaine. 2. Comparez les trois prix au Go. 3. Multipliez 500 par 0,018. 4. Multipliez 2 000 par 0,001. 5. Lisez la colonne rétention minimale."
    ],
    "examples": [
      {
        "stdin": "Le cabinet d'architectes Tympan archive ses plans : 800 Go de projets en cours\nconsultés chaque jour, 4 000 Go de projets livrés consultés une fois par trimestre.\n\n1) Les 800 Go de projets en cours vont en palier chaud (accès fréquent).\n2) Les 4 000 Go livrés vont en palier froid (accès occasionnel).\n3) Coût du chaud : 800 × 0,018 = 14,40 € par mois.\n4) Coût du froid : 4 000 × 0,010 = 40 € par mois.\n5) Le palier archive impose 180 jours de rétention minimale.",
        "expected": "projets en cours : palier chaud — projets livrés : palier froid — 14,40 € — 40 € — 180 jours de rétention",
        "note": "Le palier archive n'est pas un disque dur : la récupération y prend des heures et la rétention minimale de 180 jours dissuade d'y stocker des données réactivables."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Palier adapté aux actes de l'année en cours",
        "stdin": "q:1",
        "expected": "chaud||hot||le palier chaud||palier chaud"
      },
      {
        "label": "Question 2 — Palier au prix au Go le plus bas",
        "stdin": "q:2",
        "expected": "archive||l'archive||le palier archive"
      },
      {
        "label": "Question 3 — Coût mensuel des 500 Go en palier chaud (en €)",
        "stdin": "q:3",
        "expected": "9||9,00||9.00||9 €"
      },
      {
        "label": "Question 4 — Coût mensuel des 2 000 Go en palier Archive (en €)",
        "stdin": "q:4",
        "expected": "2||2,00||2.00||2 €"
      },
      {
        "label": "Question 5 — Rétention minimale du palier Archive (en jours)",
        "stdin": "q:5",
        "expected": "180||180 jours"
      }
    ],
    "solution": "[Question 1 — Palier adapté aux actes de l'année en cours]\nchaud\n\n[Question 2 — Palier au prix au Go le plus bas]\narchive\n\n[Question 3 — Coût mensuel des 500 Go en palier chaud (en €)]\n9\n\n[Question 4 — Coût mensuel des 2 000 Go en palier Archive (en €)]\n2\n\n[Question 5 — Rétention minimale du palier Archive (en jours)]\n180",
    "takeaway": "1) Les actes de l'année sont consultés chaque semaine : un accès fréquent, qui appelle le palier chaud.\n2) Le palier Archive propose le prix au Go le plus bas (0,001 €/Go/mois).\n3) Coût du palier chaud : 500 × 0,018 = 9 € par mois.\n4) Coût du palier Archive : 2 000 × 0,001 = 2 € par mois.\n5) Le palier Archive impose 180 jours de rétention minimale.\nContrôle : les 2 000 Go d'actes anciens en palier Archive coûtent moins que les 500 Go récents en palier chaud (2 € contre 9 €) : l'écart de prix au Go compense largement le volume."
  },
  {
    "id": "az3-c5-e2",
    "chapter": 5,
    "title": "Validateur de requêtes avec jetons SAS",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser un modèle fictif de permissions, dates et protocoles, sans valider une signature SAS réelle.",
    "brief": "<p>Ce modèle fictif examine seulement des permissions, des horaires et un protocole : il ne vérifie pas la signature et ne valide pas un vrai jeton SAS. Un SAS de compte réel requiert sv, ss, srt, sp, se et sig ; st et spr sont optionnels, même si les deux sont fournis dans tous les cas de cet exercice. Sans spr, le SAS de compte autorise par défaut https,http, sous réserve des règles du compte.<br><br>\nFormat d'entrée :<br>\nLigne 1 : Configuration du jeton SAS :<br>\n<code>SAS_CONFIG sp=&lt;perms&gt; st=&lt;int&gt; se=&lt;int&gt; spr=&lt;protocol&gt;</code><br>\n- <code>sp</code> : permissions autorisées (sous-chaîne contenant <code>r</code>, <code>w</code>, <code>d</code>, <code>l</code>)<br>\n- <code>st</code> : horodatage début de validité (entier)<br>\n- <code>se</code> : horodatage fin de validité (entier)<br>\n- <code>spr</code> : protocole imposé (<code>https</code> ou <code>https,http</code>)<br><br>\nLignes suivantes : opérations clientes fictives (LIST est ici une étiquette, pas une méthode HTTP) :<br>\n<code>REQUEST method=&lt;GET|PUT|DELETE|LIST&gt; time=&lt;int&gt; proto=&lt;http|https&gt;</code><br><br>\nCorrespondance des opérations fictives avec les permissions du modèle :<br>\n- <code>GET</code> requiert <code>r</code><br>\n- <code>PUT</code> requiert <code>w</code><br>\n- <code>DELETE</code> requiert <code>d</code><br>\n- <code>LIST</code> requiert <code>l</code><br><br>\nOrdre strict d'évaluation de la requête :<br>\n1. Si <code>spr=https</code> et que la requête utilise <code>proto=http</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=PROTOCOL_VIOLATION)</code><br>\n2. Si <code>time &lt; st</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=NOT_YET_VALID)</code><br>\n3. Si <code>time &gt; se</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=EXPIRED)</code><br>\n4. Si la permission requise n'est pas présente dans <code>sp</code> :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: DENIED (reason=INSUFFICIENT_PERMISSIONS)</code><br>\n5. Si tous les contrôles réussissent :<br>\n   <code>REQUEST &lt;method&gt; at &lt;time&gt;: ALLOWED</code></p>",
    "starter": "# Grille d'analyse (az3-c5-e2) — Validateur de requêtes avec jetons SAS (modèle fictif)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Vérification normale des permissions PUT et LIST]\n# Données : SAS_CONFIG sp=rwd st=50 se=150 spr=https\n# Données : REQUEST method=PUT time=100 proto=https\n# Données : REQUEST method=LIST time=100 proto=https\nA_COMPLETER\n\n[Cas 2 — Violations de protocole et fenêtres temporelles expirées ou anticipées]\n# Données : SAS_CONFIG sp=r st=100 se=200 spr=https\n# Données : REQUEST method=GET time=150 proto=http\n# Données : REQUEST method=GET time=80 proto=https\n# Données : REQUEST method=GET time=250 proto=https\nA_COMPLETER\n\n[Cas 3 — Jeton avec protocole dual https et http et permission list]\n# Données : SAS_CONFIG sp=rl st=50 se=150 spr=https,http\n# Données : REQUEST method=LIST time=100 proto=http\n# Données : REQUEST method=PUT time=100 proto=http\nA_COMPLETER\n",
    "hints": [
      "Associez chaque opération fictive à sa lettre de permission : GET à r, PUT à w, DELETE à d et LIST à l.",
      "Respecter l'ordre prescrit des contrôles d'erreur : protocole, puis anticipé, puis expiré, puis permissions.",
      "Vérifiez successivement les trois conditions : fenêtre temporelle validée (start <= t <= end), protocole autorisé (HTTPS) et permission requise présente dans sp="
    ],
    "examples": [
      {
        "stdin": "SAS_CONFIG sp=rw st=100 se=200 spr=https\nREQUEST method=GET time=150 proto=https\nREQUEST method=DELETE time=150 proto=https",
        "expected": "REQUEST GET at 150: ALLOWED\nREQUEST DELETE at 150: DENIED (reason=INSUFFICIENT_PERMISSIONS)",
        "note": "Dans ce modèle fictif, la lecture est autorisée et la suppression refusée par les permissions rw."
      }
    ],
    "tests": [
      {
        "label": "Vérification normale des permissions PUT et LIST",
        "stdin": "cas:1",
        "expected": "REQUEST PUT at 100: ALLOWED\nREQUEST LIST at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
      },
      {
        "label": "Violations de protocole et fenêtres temporelles expirées ou anticipées",
        "stdin": "cas:2",
        "expected": "REQUEST GET at 150: DENIED (reason=PROTOCOL_VIOLATION)\nREQUEST GET at 80: DENIED (reason=NOT_YET_VALID)\nREQUEST GET at 250: DENIED (reason=EXPIRED)"
      },
      {
        "label": "Jeton avec protocole dual https et http et permission list",
        "stdin": "cas:3",
        "expected": "REQUEST LIST at 100: ALLOWED\nREQUEST PUT at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)"
      }
    ],
    "solution": "[Exemple]\nREQUEST GET at 150: ALLOWED\nREQUEST DELETE at 150: DENIED (reason=INSUFFICIENT_PERMISSIONS)\n\n[Cas 1 — Vérification normale des permissions PUT et LIST]\nREQUEST PUT at 100: ALLOWED\nREQUEST LIST at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)\n\n[Cas 2 — Violations de protocole et fenêtres temporelles expirées ou anticipées]\nREQUEST GET at 150: DENIED (reason=PROTOCOL_VIOLATION)\nREQUEST GET at 80: DENIED (reason=NOT_YET_VALID)\nREQUEST GET at 250: DENIED (reason=EXPIRED)\n\n[Cas 3 — Jeton avec protocole dual https et http et permission list]\nREQUEST LIST at 100: ALLOWED\nREQUEST PUT at 100: DENIED (reason=INSUFFICIENT_PERMISSIONS)",
    "takeaway": "À retenir : Analyser un modèle fictif de permissions, dates et protocoles, sans valider une signature SAS réelle.\nRepère : Dans ce modèle fictif, la lecture est autorisée et la suppression refusée par les permissions rw."
  },
  {
    "id": "az3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "La politique de cycle de vie du cabinet Ombrelys",
    "exampleTitle": "Exemple résolu — la purge des mémos du cabinet Vigie",
    "goal": "Appliquer une politique de cycle de vie du stockage Blob (paliers, suppression) et chiffrer le coût d'un volume par palier.",
    "brief": "<p><strong>Énoncé.</strong> Ombrelys, cabinet d'expertise comptable à Lille, applique au conteneur <code>factures</code> la politique de cycle de vie suivante :</p><ul><li>règle 1 : les blobs versés depuis plus de <strong>30 jours</strong> passent en palier Froid ;</li><li>règle 2 : les blobs versés depuis plus de <strong>90 jours</strong> passent en palier Archive ;</li><li>règle 3 : les blobs versés depuis plus de <strong>2 550 jours</strong> (7 ans) sont supprimés.</li></ul><p>Tarifs mensuels de l'énoncé : Chaud 0,018 €/Go, Froid 0,010 €/Go, Archive 0,001 €/Go. Situation au <strong>30 avril 2025</strong> :</p><table><tr><th>Fichier</th><th>Date de versement</th><th>Ancienneté au 30 avril 2025</th></tr><tr><th>facture-2025-03-04.pdf</th><td>4 mars 2025</td><td>57 jours</td></tr><tr><th>facture-2024-09-12.pdf</th><td>12 septembre 2024</td><td>230 jours</td></tr><tr><th>facture-2018-02-01.pdf</th><td>1er février 2018</td><td>plus de 7 ans</td></tr></table><ol><li>Dans quel palier se trouve facture-2025-03-04.pdf au 30 avril 2025 ?</li><li>Dans quel palier se trouve facture-2024-09-12.pdf ?</li><li>Que devient facture-2018-02-01.pdf ?</li><li>Quel est le coût mensuel de stockage de 1 000 Go en palier Froid, en euros ?</li><li>Une facture versée le 15 mars 2025 est-elle déjà passée en palier Froid au 30 avril 2025 ?</li></ol>",
    "starter": "# Exercice — La politique de cycle de vie du cabinet Ombrelys\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : le nom du palier. Question 5 : oui ou non.\n\n[Question 1 — Palier de facture-2025-03-04.pdf]\nA_COMPLETER\n\n[Question 2 — Palier de facture-2024-09-12.pdf]\nA_COMPLETER\n\n[Question 3 — Sort de facture-2018-02-01.pdf]\nA_COMPLETER\n\n[Question 4 — Coût mensuel de 1 000 Go en palier Froid (en €)]\nA_COMPLETER\n\n[Question 5 — Une facture versée le 15 mars 2025 est-elle déjà en palier Froid]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque fichier, comparez son ancienneté aux seuils 30, 90 et 2 550 jours, en commençant par le seuil le plus long.",
      "Le coût d'un volume se calcule en multipliant les Go par le prix au Go du palier concerné.",
      "1. 57 jours se situent entre 30 et 90. 2. 230 jours dépassent 90. 3. Comparez 7 ans au seuil de suppression. 4. Multipliez 1 000 par 0,010. 5. Comptez les jours écoulés depuis le 15 mars (mars compte 31 jours)."
    ],
    "examples": [
      {
        "stdin": "Le cabinet d'avocats Vigie applique : palier Froid après 60 jours, Archive après\n180 jours, suppression après 10 ans. Audit au 1er juin 2025 :\n- memo-2025-04-20.pdf : versé depuis 42 jours ;\n- memo-2024-06-15.pdf : versé depuis 351 jours ;\n- memo-2013-01-10.pdf : plus de 10 ans.\n\n1) 42 jours : moins de 60, le mémo reste en palier Chaud.\n2) 351 jours : au-delà de 180, il est en palier Archive.\n3) Le mémo de 2013 est supprimé.\n4) 2 000 Go en Froid coûtent 2 000 × 0,010 = 20 € par mois.\n5) Un versement du 20 avril 2025 (42 jours) n'est pas encore passé en Froid.",
        "expected": "42 jours : palier chaud — 351 jours : palier archive — plus de 10 ans : supprimé — 2 000 Go en froid : 20 € — pas de bascule avant 60 jours",
        "note": "Les seuils de cycle de vie se comptent depuis la date de versement du blob : chaque règle s'applique au franchissement du seuil, la plus longue durée l'emportant."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Palier de facture-2025-03-04.pdf",
        "stdin": "q:1",
        "expected": "froid||cool||le palier froid"
      },
      {
        "label": "Question 2 — Palier de facture-2024-09-12.pdf",
        "stdin": "q:2",
        "expected": "archive||le palier archive"
      },
      {
        "label": "Question 3 — Sort de facture-2018-02-01.pdf",
        "stdin": "q:3",
        "expected": "supprimée||supprime||elle est supprimée||suppression"
      },
      {
        "label": "Question 4 — Coût mensuel de 1 000 Go en palier Froid (en €)",
        "stdin": "q:4",
        "expected": "10||10,00||10.00||10 €"
      },
      {
        "label": "Question 5 — Une facture versée le 15 mars 2025 est-elle déjà en palier Froid",
        "stdin": "q:5",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Palier de facture-2025-03-04.pdf]\nfroid\n\n[Question 2 — Palier de facture-2024-09-12.pdf]\narchive\n\n[Question 3 — Sort de facture-2018-02-01.pdf]\nsupprimée\n\n[Question 4 — Coût mensuel de 1 000 Go en palier Froid (en €)]\n10\n\n[Question 5 — Une facture versée le 15 mars 2025 est-elle déjà en palier Froid]\noui",
    "takeaway": "1) facture-2025-03-04.pdf a 57 jours d'ancienneté : au-delà du seuil de 30 jours, elle est passée en palier Froid.\n2) facture-2024-09-12.pdf a 230 jours d'ancienneté : au-delà du seuil de 90 jours, elle est passée en palier Archive.\n3) facture-2018-02-01.pdf dépasse 2 550 jours (7 ans) : elle a été supprimée par la règle 3.\n4) 1 000 Go en palier Froid coûtent 1 000 × 0,010 = 10 € par mois.\n5) Oui : versée le 15 mars 2025, la facture a 46 jours d'ancienneté au 30 avril (16 jours restants en mars + 30 jours en avril), au-delà du seuil de 30 jours : elle est en palier Froid.\nContrôle : 4 mars + 30 jours = 3 avril (bascule en Froid) et 15 mars + 30 jours = 14 avril (bascule en Froid) ; les deux dates précèdent le 30 avril 2025."
  },
  {
    "id": "az3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Les premières requêtes KQL du support de Tic-Tac Web",
    "exampleTitle": "Exemple résolu — la supervision de la chaîne ClubAltitude",
    "goal": "Lire une requête KQL (Kusto) du service Log Analytics et identifier le rôle de chaque opérateur.",
    "brief": "<p><strong>Énoncé.</strong> Tic-Tac Web, agence digitale de 40 salariés, supervise l'application d'un client dans Azure Monitor. La responsable support interroge la table <code>AppRequests</code> (une ligne par requête HTTP reçue par l'application) avec la requête KQL suivante :</p><p><code>AppRequests<br>| where resultCode == 500<br>| summarize Total = count() by appName<br>| order by Total desc<br>| take 5</code></p><ol><li>Quel opérateur KQL filtre les lignes selon une condition ?</li><li>Que renvoie <code>summarize Total = count() by appName</code> ?</li><li>Que fait <code>order by Total desc</code> ?</li><li>Combien de lignes au maximum <code>take 5</code> renvoie-t-il ?</li><li>Quelles requêtes HTTP la condition <code>resultCode == 500</code> isole-t-elle ?</li></ol>",
    "starter": "# Exercice — Les premières requêtes KQL du support de Tic-Tac Web\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : l'opérateur seul. Questions 2, 3 et 5 : répondez de façon courte.\n\n[Question 1 — Opérateur qui filtre les lignes selon une condition]\nA_COMPLETER\n\n[Question 2 — Ce que renvoie summarize Total = count() by appName]\nA_COMPLETER\n\n[Question 3 — Ce que fait order by Total desc]\nA_COMPLETER\n\n[Question 4 — Nombre maximum de lignes renvoyées par take 5]\nA_COMPLETER\n\n[Question 5 — Requêtes HTTP isolées par resultCode == 500]\nA_COMPLETER\n",
    "hints": [
      "Une requête KQL se lit comme une chaîne : chaque opérateur, séparé par une barre verticale, transforme la table produite par le précédent.",
      "where réduit la table, summarize agrège (compte) par groupe, order by trie, take limite le nombre de lignes.",
      "1. C'est le mot-clé de filtre. 2. count() compte, by appName groupe. 3. desc signifie décroissant. 4. Le chiffre de take est le plafond. 5. Le code HTTP 500 correspond à une famille d'erreurs connue."
    ],
    "examples": [
      {
        "stdin": "L'application de la chaîne de salles de sport ClubAltitude est supervisée avec :\n\nTraceLog\n| where severityLevel == 2\n| summarize Occurrences = count() by region\n| order by Occurrences asc\n| take 3\n\n1) where filtre les lignes : il ne garde que les traces de sévérité 2.\n2) summarize Occurrences = count() by region compte les lignes par région.\n3) order by Occurrences asc trie par ordre croissant.\n4) take 3 renvoie au maximum 3 lignes.\n5) severityLevel == 2 isole les traces d'erreur.",
        "expected": "where filtre — comptage par région — tri croissant — 3 lignes maximum — traces d'erreur",
        "note": "Chaque opérateur KQL reçoit la table du précédent et rend une table : l'ordre des opérateurs détermine donc le résultat."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Opérateur qui filtre les lignes selon une condition",
        "stdin": "q:1",
        "expected": "where||le where||l'opérateur where"
      },
      {
        "label": "Question 2 — Ce que renvoie summarize Total = count() by appName",
        "stdin": "q:2",
        "expected": "le nombre de requêtes par application||un comptage par application||le total groupé par application||le nombre de lignes par application||le nombre de requêtes groupées par application"
      },
      {
        "label": "Question 3 — Ce que fait order by Total desc",
        "stdin": "q:3",
        "expected": "un tri décroissant||tri décroissant||il trie les lignes par total décroissant||tri par ordre décroissant||trie par ordre décroissant"
      },
      {
        "label": "Question 4 — Nombre maximum de lignes renvoyées par take 5",
        "stdin": "q:4",
        "expected": "5||cinq"
      },
      {
        "label": "Question 5 — Requêtes HTTP isolées par resultCode == 500",
        "stdin": "q:5",
        "expected": "les erreurs serveur||erreurs serveur||les erreurs 500||les requêtes en erreur 500||le code http 500||les réponses http 500"
      }
    ],
    "solution": "[Question 1 — Opérateur qui filtre les lignes selon une condition]\nwhere\n\n[Question 2 — Ce que renvoie summarize Total = count() by appName]\nle nombre de requêtes par application\n\n[Question 3 — Ce que fait order by Total desc]\nun tri décroissant\n\n[Question 4 — Nombre maximum de lignes renvoyées par take 5]\n5\n\n[Question 5 — Requêtes HTTP isolées par resultCode == 500]\nles erreurs serveur",
    "takeaway": "1) L'opérateur where filtre les lignes selon une condition : il ne garde que celles qui la vérifient.\n2) summarize Total = count() by appName renvoie le nombre de requêtes (en erreur 500) groupées par application : une ligne par appName avec son total.\n3) order by Total desc trie les lignes par total décroissant (du plus grand au plus petit).\n4) take 5 renvoie au maximum 5 lignes.\n5) La condition resultCode == 500 isole les requêtes HTTP qui ont reçu le code 500 : les erreurs serveur.\nContrôle : la requête se lit « dans AppRequests, garde les erreurs 500, compte-les par application, trie du plus grand total au plus petit, garde les 5 premières lignes »."
  },
  {
    "id": "az3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "L'alerte CPU et le budget de la plateforme Mezzaluna",
    "exampleTitle": "Exemple résolu — l'alerte du serveur du musée Lumière",
    "goal": "Paramétrer une règle d'alerte Azure Monitor (seuil, fenêtre d'agrégation, groupe d'action) et un budget FinOps, puis vérifier leur déclenchement.",
    "brief": "<p><strong>Énoncé.</strong> Mezzaluna, groupe de 8 restaurants, exploite sa plateforme de réservation sur une machine virtuelle supervisée par Azure Monitor. La règle d'alerte configurée :</p><ul><li>signal : pourcentage UC (processeur) de la machine virtuelle ;</li><li>seuil : 80 % ;</li><li>fenêtre d'agrégation : moyenne sur 5 minutes ;</li><li>fréquence d'évaluation : toutes les minutes ;</li><li>groupe d'action : notification par SMS à l'agent d'astreinte.</li></ul><p>Côté FinOps, le budget mensuel est fixé à <strong>2 000 €</strong>, avec une alerte configurée à <strong>80 % du budget</strong>. Le 12 du mois, le coût cumulé de la plateforme atteint <strong>1 650 €</strong>.</p><ol><li>À quelle condition la règle d'alerte CPU se déclenche-t-elle ?</li><li>Quel montant, en euros, déclenche l'alerte budgétaire ?</li><li>Au 12 du mois, l'alerte budgétaire est-elle déjà déclenchée ?</li><li>Qui l'alerte notifie-t-elle grâce au groupe d'action ?</li><li>La fenêtre d'agrégation étant de 5 minutes et l'évaluation toutes les minutes, combien de mesures la fenêtre agrège-t-elle ?</li></ol>",
    "starter": "# Exercice — L'alerte CPU et le budget de la plateforme Mezzaluna\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le montant seul. Questions 1 et 4 : répondez de façon courte.\n\n[Question 1 — Condition de déclenchement de l'alerte CPU]\nA_COMPLETER\n\n[Question 2 — Montant déclenchant l'alerte budgétaire (en €)]\nA_COMPLETER\n\n[Question 3 — Alerte budgétaire déjà déclenchée au 12 du mois]\nA_COMPLETER\n\n[Question 4 — Destinataire de la notification via le groupe d'action]\nA_COMPLETER\n\n[Question 5 — Nombre de mesures agrégées dans la fenêtre de 5 minutes]\nA_COMPLETER\n",
    "hints": [
      "Le seuil porte sur la moyenne de la fenêtre d'agrégation, pas sur un pic instantané.",
      "L'alerte budgétaire se déclenche au franchissement d'un pourcentage du budget : multipliez le budget par ce pourcentage.",
      "1. Relisez signal, seuil et fenêtre. 2. Calculez 80 % de 2 000 €. 3. Comparez 1 650 € au seuil trouvé. 4. Le groupe d'action définit qui est prévenu. 5. Une évaluation par minute dans une fenêtre de 5 minutes."
    ],
    "examples": [
      {
        "stdin": "Le musée Lumière surveille son serveur de billetterie : seuil UC 75 %, fenêtre\nd'agrégation 15 minutes, évaluation toutes les 5 minutes, groupe d'action : courriel\nà l'exploitation. Budget mensuel 3 000 €, alerte à 90 %.\n\n1) L'alerte se déclenche quand la moyenne d'UC sur 15 minutes dépasse 75 %.\n2) L'alerte budgétaire se déclenche à 90 % de 3 000 €, soit 2 700 €.\n3) À 2 500 € consommés, l'alerte n'est pas encore déclenchée.\n4) Le groupe d'action envoie un courriel à l'exploitation.\n5) La fenêtre de 15 minutes évaluée toutes les 5 minutes agrège 3 mesures.",
        "expected": "moyenne UC > 75 % sur 15 minutes — seuil budgétaire : 2 700 € — 2 500 € : pas encore déclenchée — courriel à l'exploitation — 3 mesures",
        "note": "Le seuil d'alerte porte sur la moyenne de la fenêtre, pas sur un pic instantané : un pic isolé ne déclenche rien."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Condition de déclenchement de l'alerte CPU",
        "stdin": "q:1",
        "expected": "quand la moyenne du processeur sur 5 minutes dépasse 80 %||quand la moyenne du cpu sur 5 minutes depasse 80 %||moyenne cpu > 80 % pendant 5 minutes||cpu moyen > 80 % sur 5 minutes||quand le processeur moyen dépasse 80 % pendant 5 minutes"
      },
      {
        "label": "Question 2 — Montant déclenchant l'alerte budgétaire (en €)",
        "stdin": "q:2",
        "expected": "1600||1 600||1600 €||1 600 €"
      },
      {
        "label": "Question 3 — Alerte budgétaire déjà déclenchée au 12 du mois",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Destinataire de la notification via le groupe d'action",
        "stdin": "q:4",
        "expected": "l'agent d'astreinte||l'astreinte||l'agent d'astreinte par sms||l'équipe d'astreinte"
      },
      {
        "label": "Question 5 — Nombre de mesures agrégées dans la fenêtre de 5 minutes",
        "stdin": "q:5",
        "expected": "5||cinq||5 mesures"
      }
    ],
    "solution": "[Question 1 — Condition de déclenchement de l'alerte CPU]\nquand la moyenne du processeur sur 5 minutes dépasse 80 %\n\n[Question 2 — Montant déclenchant l'alerte budgétaire (en €)]\n1600\n\n[Question 3 — Alerte budgétaire déjà déclenchée au 12 du mois]\noui\n\n[Question 4 — Destinataire de la notification via le groupe d'action]\nl'agent d'astreinte\n\n[Question 5 — Nombre de mesures agrégées dans la fenêtre de 5 minutes]\n5",
    "takeaway": "1) L'alerte se déclenche quand la moyenne du pourcentage UC sur 5 minutes dépasse 80 %.\n2) L'alerte budgétaire se déclenche à 80 % de 2 000 €, soit 1 600 €.\n3) Oui : au 12 du mois, 1 650 € sont déjà consommés, au-delà du seuil de 1 600 €.\n4) Le groupe d'action notifie l'agent d'astreinte, par SMS.\n5) Avec une évaluation par minute, la fenêtre de 5 minutes agrège 5 mesures.\nContrôle : 1 650 € représente 1 650/2 000 = 82,5 % du budget, au-delà des 80 % configurés."
  },
  {
    "id": "az3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le gabarit Bicep de la coopérative Ardoise",
    "exampleTitle": "Exemple résolu — le gabarit de l'association Vélocité",
    "goal": "Lire un fichier Bicep déclaratif (paramètre, ressource, référence SKU) et justifier les apports de l'Infrastructure as Code.",
    "brief": "<p><strong>Énoncé.</strong> Ardoise, coopérative d'artisans du bâtiment, a longtemps créé ses ressources Azure à la main, dans le portail. L'ingénieur cloud remplace désormais ces manipulations par un fichier Bicep versionné dans le dépôt Git, dont voici un extrait :</p><p><code>param location string = 'francecentral'<br><br>resource st 'Microsoft.Storage/storageAccounts@2023-05-01' = {<br>name: 'stoardoiseprod01'<br>location: location<br>sku: { name: 'Standard_LRS' }<br>}</code></p><ol><li>Que fait la première ligne du fichier : <code>param location string = 'francecentral'</code> ?</li><li>Que déclare le mot-clé <code>resource</code> dans ce fichier ?</li><li>Quelle option de réplication du stockage la référence <code>Standard_LRS</code> applique-t-elle ?</li><li>Si le déploiement est relancé à l'identique alors que le compte de stockage existe déjà, que fait l'outil ?</li><li>Quel apport majeur l'Infrastructure as Code offre-t-elle par rapport aux créations manuelles dans le portail ?</li></ol>",
    "starter": "# Exercice — Le gabarit Bicep de la coopérative Ardoise\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : répondez de façon courte.\n\n[Question 1 — Rôle de la ligne param location string = 'francecentral']\nA_COMPLETER\n\n[Question 2 — Ce que déclare le mot-clé resource]\nA_COMPLETER\n\n[Question 3 — Réplication appliquée par la référence Standard_LRS]\nA_COMPLETER\n\n[Question 4 — Comportement d'un déploiement relancé à l'identique]\nA_COMPLETER\n\n[Question 5 — Apport majeur de l'Infrastructure as Code]\nA_COMPLETER\n",
    "hints": [
      "Un fichier Bicep est déclaratif : il décrit l'état souhaité des ressources, pas la suite de clics pour y parvenir.",
      "Le mot-clé param introduit un paramètre ; la valeur après le signe « = » est sa valeur par défaut.",
      "1. Lisez la première ligne : un nom, un type, une valeur par défaut. 2. resource introduit une ressource Azure. 3. LRS est un acronyme de réplication du cours. 4. Un déploiement déclaratif relancé ne duplique pas les ressources. 5. Pensez à ce que le versionnement dans Git apporte aux environnements."
    ],
    "examples": [
      {
        "stdin": "L'association Vélocité déploie son site par gabarit déclaratif :\n\nparam location string = 'northeurope'\nresource app 'Microsoft.Web/sites@2023-12-01' = {\nname: 'app-velocite-prod-01'\nlocation: location\n}\n\n1) La première ligne définit un paramètre avec la valeur par défaut northeurope.\n2) Le mot-clé resource déclare une ressource Azure, ici une application web.\n3) Relancé à l'identique, le déploiement met à jour la ressource existante : il est idempotent.\n4) Le principal apport : des environnements reproductibles, versionnés dans Git.",
        "expected": "paramètre northeurope par défaut — resource déclare une ressource Azure — relance : mise à jour de l'existant — apport : des environnements reproductibles",
        "note": "Un gabarit déclaratif décrit l'état souhaité : relancé tel quel, il rattrape les dérives sans dupliquer les ressources — c'est l'idempotence."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Rôle de la ligne param location string = 'francecentral'",
        "stdin": "q:1",
        "expected": "elle définit un paramètre avec une valeur par défaut||un paramètre avec francecentral en valeur par défaut||elle définit un paramètre location avec la valeur par défaut francecentral||elle déclare un paramètre et sa valeur par défaut"
      },
      {
        "label": "Question 2 — Ce que déclare le mot-clé resource",
        "stdin": "q:2",
        "expected": "une ressource azure à déployer||la déclaration d'une ressource azure||une ressource à déployer||la ressource à déployer"
      },
      {
        "label": "Question 3 — Réplication appliquée par la référence Standard_LRS",
        "stdin": "q:3",
        "expected": "lrs||la lrs||lrs (locally redundant storage)||locally redundant storage||trois copies dans un même datacenter"
      },
      {
        "label": "Question 4 — Comportement d'un déploiement relancé à l'identique",
        "stdin": "q:4",
        "expected": "il met à jour la ressource existante||il met a jour la ressource existante||met à jour la ressource existante||un déploiement idempotent||idempotent"
      },
      {
        "label": "Question 5 — Apport majeur de l'Infrastructure as Code",
        "stdin": "q:5",
        "expected": "des environnements reproductibles||la reproductibilité||reproductible||des environnements reproductibles et versionnés||des déploiements reproductibles et versionnés"
      }
    ],
    "solution": "[Question 1 — Rôle de la ligne param location string = 'francecentral']\nelle définit un paramètre avec une valeur par défaut\n\n[Question 2 — Ce que déclare le mot-clé resource]\nune ressource azure à déployer\n\n[Question 3 — Réplication appliquée par la référence Standard_LRS]\nlrs\n\n[Question 4 — Comportement d'un déploiement relancé à l'identique]\nil met à jour la ressource existante\n\n[Question 5 — Apport majeur de l'Infrastructure as Code]\ndes environnements reproductibles",
    "takeaway": "1) La première ligne définit un paramètre nommé location, de type chaîne, avec la valeur par défaut 'francecentral'.\n2) Le mot-clé resource déclare une ressource Azure à déployer : ici un compte de stockage Microsoft.Storage/storageAccounts.\n3) La référence Standard_LRS applique la réplication LRS (Locally Redundant Storage) : trois copies dans un même datacenter de la région.\n4) Relancé à l'identique, le déploiement met à jour la ressource existante sans en créer une seconde : le déploiement est idempotent.\n5) L'Infrastructure as Code rend les environnements reproductibles et versionnés : le même gabarit déploie des environnements identiques, et chaque évolution est suivie dans Git.\nContrôle : l'extrait combine un paramètre par défaut, une ressource typée avec sa version d'API et sa référence SKU — les trois briques d'un gabarit Bicep lisible."
  }
];
