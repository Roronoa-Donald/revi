# Cloud et DevOps

**Appréciation : à corriger avant publication.** Chapitres sélectionnés : Google Cloud B3 1 et 5. Population : 6 cours avec chapitre 1, 108 exercices, 270 QCM et 218 cartes ; 20 exercices, 10 QCM et 10 cartes tirés dans l'ensemble de la famille. Voir `../echantillons-identifiants.json`.

## Exactitude et constats

- **F213 — D9, S0, observé** — `server/exercises/docker.js:357` : une machine à états indépendante qui passe de `PAUSED` à `STOPPED` après `unpause` reçoit 3/3, alors que l'énoncé exige `RUNNING`. Ajouter les transitions autorisées et interdites, notamment dans des séquences inédites.

Les textes principaux des chapitres Google Cloud B3 1 et 5 sélectionnés ont été lus ; aucune configuration cloud ni facturation réelle n'a été testée.

- **F204 — D9, S0, observé** — Les 18 corrigés Docker de `server/exercises/docker.js` encodent toutes les entrées des tests ; `dk2-c1-e1` passe ces tests mais ne produit rien pour une entrée valide indépendante. La même structure est observée dans 18 corrigés B3 Linux et 18 B3 GitHub ; un corrigé de chacun de ces cours échoue aussi sur une entrée nouvelle. Voir `../sondes-corriges-memorises.json`.

- **F198–F201 — D9/D12, S0/S1, observé.** Les adresses Azure réservées `.2` et `.3` sont qualifiées à tort de serveurs DNS primaire et secondaire (`b3-cloud-azure/chapitres/chapitre4.html:99`) ; le swap App Service est décrit avec une vérification trop rassurante (`b3-cloud-azure/chapitres/chapitre3.html:333`). Le SLA Cloud SQL dépend de l'édition et de la configuration (`b3-google-cloud/chapitres/chapitre5.html:277`) et le dimensionnement mémoire nécessite une hypothèse de durée ou de concurrence (`b3-cloud-computing/chapitres/chapitre3.html:296`). Aucun test n'a été lancé sur des comptes cloud.
- **F168 — D9/D12, S1, observé** — `b3-devops/chapitres/chapitre1.html:296`, « Grille de classification officielle DORA » : cette grille à seuils fixes est dite universelle sans millésime. DORA indique que les profils sont issus des données, que les métriques évoluent et que le contexte compte ; ses travaux actuels utilisent cinq métriques. Dater le barème, le qualifier d'hypothèse d'exercice et expliquer ses limites. Sources : https://dora.dev/faq/, https://dora.dev/insights/dora-metrics-history/ et https://dora.dev/guides/dora-metrics/, consultées le 29 octobre 2026.
- **F155 — D12, S0, observé** — `b3-google-cloud/chapitres/chapitre1.html:135`, « sans possibilité de révocation sélective » : des politiques IAM deny peuvent refuser certaines permissions héritées à un niveau inférieur. Préciser permissions prises en charge et exceptions. Google : https://docs.cloud.google.com/iam/docs/deny-overview.
- **F156/F157 — D9/D12, S0/S1, observé** — `b3-google-cloud/chapitres/chapitre1.html:299`, « `status=HA_RESILIENT` », est imposé même à une seule instance ; `chapitre5.html:392`, « à un autre consommateur », présente une relivraison particulière comme garantie. Clarifier les hypothèses de résilience et de retry : https://docs.cloud.google.com/pubsub/docs/subscription-retry-policy.
- **F166/F167 — D12, S1, observé** — `b3-google-cloud/chapitres/chapitre5.html:439`, « 4 classes de stockage », omet Rapid ; `:441`, « 99.999% de SLA », omet les conditions de configuration de Spanner. Dater les recommandations : https://cloud.google.com/storage/docs/storage-classes et https://cloud.google.com/spanner/sla. Sources consultées le 29 octobre 2026.
- **F15 — D12, S0, observé** — `b3-cloud-computing/chapitres/cartes.html:78`, « une Région Cloud ... au minimum trois Zones » : ce n'est pas une règle universelle entre fournisseurs et régions. Oracle décrit des régions à un domaine de disponibilité et Microsoft liste des régions sans zones de disponibilité ; nommer fournisseur et périmètre au lieu de généraliser.
- **F16 — D12, S0, observé** — `b3-cloud-azure/chapitres/cartes.html:65`, « un datacenter ... garantit un SLA de 99.99% » : une zone peut comporter plusieurs centres, et deux zones ne garantissent pas, à elles seules, le SLA de chaque service. Présenter les conditions documentées du service utilisé.
- **F58 — D12, S0, observé** — `b3-cloud-azure/chapitres/cartes.html:108`, « quatre composants essentiels d'un jeton de sécurité SAS » : la liste omet la signature `sig`. Dans un account SAS, `st` et `spr` sont optionnels ; présenter la signature et les champs requis du type de SAS choisi.
- **F75 — D12, S0, observé** — `b3-cloud-computing/chapitres/cartes.html:108`, « une immunité juridique absolue » : la qualification SecNumCloud impose des exigences et vise notamment à résister aux injonctions extraterritoriales ; elle n'établit pas une immunité absolue ni un niveau « militaire » universel. Présenter le périmètre d'une offre et les conditions de sa qualification.
- **F76 — D12, S1, observé** — `b3-cloud-aws/chapitres/cartes.html:94`, « .0 (réseau), .1 (routeur VPC) » : ces suffixes supposent un exemple de sous-réseau particulier. Les adresses sont relatives au CIDR ; AWS documente en outre une exception pour certaines adresses apportées en BYOIP.
- **F72 — D7/D12, S1, observé** — `docker/chapitres/chapitre4.html:406`, « docker attach mon_conteneur » : `attach` peut aussi rattacher le terminal à un shell principal interactif. Dire qu'on veut démarrer un **nouveau** shell pour rendre `docker exec` non ambigu.
- **F55 — D12, S1, observé** — `docker/chapitres/cartes.html:108`, « si elle existe dans .env » : Compose peut utiliser le shell ou d'autres fichiers et `${VAR:-default}` prend aussi le repli si la valeur est vide. Préciser les priorités.
- **F63 — D12, S1, observé** — `b3-cloud-computing/chapitres/cartes.html:69`, « leur isolation logique absolue » : l'isolation entre locataires est un objectif de conception, pas une garantie absolue contre toute faille. Décrire les mécanismes et les limites.
- **F52 — D7/D9/D12, S1, observé** — `b3-cloud-azure/chapitres/chapitre3.html:406`, « Quel est le SLA composite » : le produit `0,999 × 0,999` est un modèle conditionnel, pas une garantie contractuelle générale ; les pannes communes et les définitions de mesure comptent. Expliciter les hypothèses et distinguer disponibilité modélisée, SLA et SLO.
- **F31 — D8/D13, S1, observé** — `b3-cloud-aws/chapitres/exercices.html:58`, « 18 ateliers de programmation » : les exercices contrôlés utilisent le mode analyse, notamment `b3-cloud-aws/chapitres/chapitre1.html:213`. Décrire les études de cas et leur mode effectif.

## Grille C1–C14 — éléments examinés

| Critère | Constat ou limite |
|---|---|
| C1 Situation | `b3-google-cloud/chapitres/chapitre1.html:65` met en scène la structuration de projets et les risques de coûts. |
| C2 Objectifs | Le chapitre 1 énumère des actions et notions à `b3-google-cloud/chapitres/chapitre1.html:70` ; « maîtriser » reste à traduire en tâches observables. |
| C3 Prérequis | IAM, réseau, terminal et bases de données nécessaires n'ont pas été vérifiés dans les cours précédents. |
| C4 Ordre | Le chapitre 5 introduit les services de données après les fondations du chapitre 1 ; cela ne prouve pas l'absence de dépendances manquantes. |
| C5 Définitions | Régions, zones et SLA sont trop généralisés dans les cartes F15/F16. |
| C6 Exemples et progression | Les sections et cas existent ; exemples résolus et progressivité de tous les exercices ne sont pas certifiés. |
| C7 Charge | Les objectifs combinent services, acronymes et CLI ; le niveau de charge perçu n'a pas été mesuré. |
| C8 Cohérence | L'annonce AWS de programmation ne correspond pas au mode analyse échantillonné ; F31. |
| C9 Exercices | 20 corrigés passent les tests, mais une unique instance reçoit un statut de résilience non justifié, F156 ; le mode annoncé et les activités doivent aussi être alignés. |
| C10 QCM | Le produit de SLA nécessite des hypothèses explicites, F52 ; d'autres distracteurs choisis sont parfois très éloignés de l'erreur plausible. |
| C11 Auto-évaluation | Les seuils sont contrôlés sur le corpus reconnu, pas la couverture propre à GCP. |
| C12 Exactitude | F15/F16/F52/F155/F166/F167 imposent de distinguer fournisseur, permissions, version, service, configuration et contrat. |
| C13 Ressources | Les cartes cloud doivent refléter les restrictions des chapitres et les documentations fournisseurs. |
| C14 Rendu | F31 est une incohérence visible de libellé ; aucun test d'un compte cloud réel ou d'une architecture déployée. |

## Exercices, QCM et cartes

Les dix QCM et dix cartes de la famille ont été lus individuellement dans leur texte extrait ; appréciations et réserves figurent dans `../07-relecture-familles.csv`.

Les **20 exercices de l'échantillon** ont reçu deux variantes ciblées chacun : 39 sont rejetées et une est acceptée malgré son erreur de transition, confirmée par une entrée indépendante. Les 17 exercices en mode analyse ont été sondés à partir des corrigés et les trois exercices Bash à partir de programmes indépendants ; ces variantes ne proviennent pas d'étudiants. Détails : `../sondes-reponses-plausibles.json` et `../sondes-sept-restants.json`. Un modèle peut cependant imposer une règle qui ne reflète pas toute la réalité, F198–F201.

**20 corrigés sur 20** passent ; **2 des 40 variantes automatiques** passent également, sans que leur caractère réellement incorrect soit établi. Les autres sont rejetées. Ne pas interpréter ces scores comme preuve de maîtrise de GCP, Azure ou DevOps. Les 10 QCM et 10 cartes tirés sont référencés dans l'échantillon.

**Niveau.** Le cas GCP vise un rôle d'architecture B3 ; une progression guidée IAM/réseau avant les services et des contre-exemples sur les SLA sont nécessaires à évaluer auprès d'étudiants. Les défis avancés et coûts réels ne sont pas validés.

## Confrontation aux supports et références

`corpus-cours-revi.zip`, `textes/B3/Semestre II/Google Cloud/Support de cours Module 1 .txt`, page 1, identifie le support Google Cloud B3, comme `b3-google-cloud/chapitres/chapitre1.html:56` ; ce seul titre ne démontre pas la fidélité du contenu. Le corpus ne contient pas de PDF pour `b3-devops` ni `docker` ; aucune fidélité n'est inférée pour ces cours.

Sources primaires consultées le 29 octobre 2026 :

- ANSSI, qualification SecNumCloud : https://cyber.gouv.fr/enjeux-technologiques/cloud/faq-qualification-secnumcloud/
- AWS, taille des sous-réseaux et BYOIP : https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html
- Docker, rattachement à un conteneur : https://docs.docker.com/reference/cli/docker/container/attach/

- Microsoft, zones : https://learn.microsoft.com/en-us/azure/availability-zones/az-overview
- Microsoft, paramètres des SAS de compte : https://learn.microsoft.com/en-us/rest/api/storageservices/create-account-sas
- Microsoft, limites d'isolation de conteneurs multitenants : https://learn.microsoft.com/en-us/virtualization/windowscontainers/manage-containers/container-security
- Docker, interpolation Compose : https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation
- Microsoft, régions et disponibilité des zones : https://learn.microsoft.com/azure/reliability/regions-list
- Microsoft, limites des calculs de SLA : https://learn.microsoft.com/en-us/azure/reliability/concept-service-level-agreements
- Oracle, domaines et régions : https://docs.oracle.com/en/solutions/design-dr/determine-your-deployment-strategy1.html
- Google Cloud, hiérarchie des ressources : https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy
- Microsoft, adressage DNS Azure et swap App Service : https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq ; https://learn.microsoft.com/en-us/azure/app-service/reference-app-settings
- Google Cloud, SLA Cloud SQL par édition : https://cloud.google.com/sql/sla
- AWS, différence entre débit et concurrence : https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html
