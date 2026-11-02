# Consultations complémentaires du lot 2

Consultations du 30 octobre 2026, depuis le dossier local. Les empreintes portent sur les fichiers téléchargés, pas sur la validité pédagogique des corrections. Les sources Python éclairent des conventions algorithmiques générales ; les formats et les seuils chiffrés restent ceux des énoncés locaux.

| Source consultée | Portée | SHA-256 |
|---|---|---|
| https://docs.python.org/3/library/functions.html#max | Maximum, liste vide et première égalité ; F109 et F112 | `c654504676a9e02484d9b9699e54e26de60117e6b1d5ad4cb076198d73284caf` |
| https://docs.python.org/3/reference/expressions.html#comparisons | Comparaisons strictes ; F206 | `5401ba05cd926d62245846fcd8c3f93e330e6712b2c5ce0080bcd6efe7ad9235` |
| https://xlinux.nist.gov/dads/HTML/selectionSort.html | Définition du tri par sélection ; F205 | `527100d184fd3c10e3b5b1ff16b4f12468bf8c8c166fd1977eb24629640e443e` |
| https://pubmed.ncbi.nlm.nih.gov/11515286/ | Cowan, réexamen de la capacité de la mémoire à court terme ; ne valide aucun barème local ; F164 | `af521642410722b34226233ef869d9515d13a068f470bd35b9d03bc34ceef195` |
| https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0120644 | Réplication de la courbe d’oubli avec un participant et un protocole déterminé ; pas de généralisation automatique ; F165 | `d39b04993491324f90278c44cfa17d594ef18741a347e1afb8af252372b77a04` |
| https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf | Portée limitée des évaluations de sécurité ; F189 | `58e5ed41e5c8ca34ce14fd80b70f118f2c6d613d1647bc307edca30bcc45f063` |
| https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-94.pdf | Limites de la détection par signatures ; F191 | `289c2ed27f7e3aac41624bf2e6fad268642bad2dabe352a5ab28fa169824a96e` |
| https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/coefvari.htm | Coefficient de variation, échelle de rapport et moyenne proche de zéro | `8e2ae8a471436a4425417b8f8bac41fb5865ef5c5a68800d4af1561fe9d55e62` |
| https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9200/software/release/17-18/configuration_guide/sec/b_1718_sec_9200_cg/configuring_dynamic_arp_inspection.html | DAI, table DHCP Snooping et ACL ARP statique | `10922dc77efc575293ec32f15c4c77511e9fa31665ffacc5b4fa13aae0ca8994` |
| https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9200/software/release/17-18/configuration_guide/sec/b_1718_sec_9200_cg/configuring_ip_source_guard.html | IP Source Guard et hôtes statiques, selon la plateforme indiquée | `b4e55eb4f63fd0b11cab696161276bc140291cc55705415acc44661ae9a4be26` |

Les pages de cycle de vie Microsoft pour Windows Server 2022 et 2025 ont également répondu HTTP 200. La lecture du PDF NIST SP 800-115 a produit un avertissement de configuration PDF, mais `pdftotext` a extrait les passages consultés.

Le premier identifiant PubMed essayé renvoyait un article sur l’analyse du sommeil, sans rapport avec la mémoire de travail. Il a été écarté ; seule la référence Cowan ci-dessus est retenue.

## Compléments de la relecture et de la contre-vérification

Documents consultés le **30 octobre 2026** ; les empreintes ont été recalculées sur les fichiers téléchargés. Leur consultation n’établit pas, à elle seule, la conformité de toutes les pages.

| Source consultée | Portée | SHA-256 |
|---|---|---|
| https://www.rfc-editor.org/rfc/rfc5936.html | Transfert de zone DNS AXFR et restrictions d’accès à distinguer | `4cde18bd504a9c55d1b147e2085ce39f613d1f99f3aba746cf664e1a1282ac6c` |
| https://www.rfc-editor.org/rfc/rfc9989.html | Spécification DMARC publiée en 2026 | `42170b943701261263ffc1f868b988b0838351d65fe4270a6865198852bd9a92` |
| https://www.rfc-editor.org/rfc/rfc9293.html | Spécification TCP publiée en 2022, remplaçant la RFC 793 | `0be501b21b790ae4fa1db0cfe3d3ee935a94f69dc8e0ef7e32a04250eaa30f13` |
| https://www.itl.nist.gov/div898/handbook/eda/section3/boxplot.htm | Boîte à moustaches et valeurs potentiellement atypiques | `177f08be3e37da0581d14fa2551ecd4a870e54763906efc71a604d670f047fd6` |
| https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/correlat.htm | Corrélation et conditions de calcul | `7d09f73dc0ee3ba2ab760545a15a9a0f5e06bbdc93e25bdee3d8f1062105f132` |
| https://www.nngroup.com/articles/ten-usability-heuristics/ | Heuristiques d’utilisabilité, notamment prévention et traitement des erreurs | `53faa38cd77dcc121fbd882171577599a5689da14df0ab7da8ab5dddf257124e` |
| https://www.nngroup.com/articles/quantitative-research-study-guide/ | Études quantitatives et rôle de l’échantillon | `9bb76f36bdf454a2ec918dee536f7a5e596ff9e9bdb1a4786191154cb9453fba` |
| https://www.cisco.com/c/en/us/td/docs/routers/connectedgrid/modules/switch/gsg/cgr-esm-getting_started/intro.html | Sur l’équipement documenté, 100BASE-TX fonctionne notamment avec des câbles de catégories 5 et 5e ; la grille F129 impose un choix conventionnel, pas une exclusivité technique | `d27063a19f8704d5e768075bbd89826680c332690d14c4e251f47fc302063970` |
| https://www.rfc-editor.org/rfc/rfc9846.html | TLS 1.3 : spécification de 2026 ; la vérification du QCM distingue les cas avec et sans HelloRetryRequest | `e2500fd8c735e614128efd3817da426382bc26b97d7056f031c6453d13a67fe3` |
| https://knowledge.broadcom.com/external/article/450717/deleting-data-from-a-thin-provisioned-di.html | La suppression dans l’invité ne libère pas nécessairement l’espace alloué dans un disque thin | `213e7bcc810915d2f196cdf72bde29dac86f08a920fc0e5cbfd0998246136d6d` |
| https://docs.netgate.com/pfsense/en/latest/highavailability/pfsync.html | Réplication pfsync et nécessité de protéger le réseau de synchronisation | `e8e8204687ce651887cf427ca9405430a8b2173b710b8e706b6f8a2532ab0e1e` |
| https://docs.netgate.com/pfsense/en/latest/highavailability/troubleshooting-high-availability-clusters.html | Conditions et limites opérationnelles d’un cluster haute disponibilité pfSense | `8289a7fd160d5edc06688f8dcb9f41a4dda2a18db15c87f397b6c67be822d2ba` |
| https://docs.python.org/3.14/library/stdtypes.html#str.strip | `strip()` retire les blancs aux deux extrémités par défaut ; leur conservation dépend de l’usage | `cefe7e87ad5b3cf5724eb647d4df2208561de96d12fca83ad01f1789404d512c` |
| https://knowledge.broadcom.com/external/article/407273/sensitive-virtual-machines-become-impact.html | Une pause vMotion peut affecter certaines applications sensibles | `e49381eb74663ad78987be8a5188c087c3d721d817cf7bb66aaa14b308c33dd1` |
| https://knowledge.broadcom.com/external/article/321009/understanding-and-troubleshooting-vmotio.html | Étapes de vMotion, convergence et mécanisme SDPS ; les ralentissements peuvent avoir un impact | `c50dccea9d1170c5fc5c7fea32657acc1f5acea9c11195c3f033594e6c551391` |
| https://knowledge.broadcom.com/external/article/436882/how-to-identify-vmotion-stun-time.html | Sur vSphere 8.x, 500 ms est un objectif de bascule et la pause effective se mesure | `b2af79842c885af00413ed50baafe4207dbb1beaf2f76328b72fb713aab4f28d` |

La consultation directe de certaines pages GNU sur `chmod` et `ln` a expiré lors de cette dernière reprise : les essais locaux ont été conservés, sans prétendre à une nouvelle consultation réussie de ces pages.

## Reprise GCP et console Cisco

Sources consultées le **30 octobre 2026**. Elles documentent les plateformes et versions décrites, sans établir un comportement identique sur tous les équipements ou services.

| Source consultée | Portée | SHA-256 |
|---|---|---|
| https://cloud.google.com/about/locations | Les régions comportent au moins trois zones ; Stockholm, Osaka et Montréal ont des zones dans un ou deux centres physiques au moment de la consultation. | `905c96709544d46fe25fa03d578353b3f08172689fc073308945028fd685af74` |
| https://docs.cloud.google.com/architecture/framework/reliability | La fiabilité dépend notamment de la redondance et de la conception ; la seule présence de zones ne constitue pas une garantie. | `f9d7342ae84eec72a87be1dcf2e8d7d5200a513cb70d7c3f74875716f576b8ef` |
| https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/fundamentals/command/cf_command_ref/D_through_E.html | La commande `exec-timeout` de Cisco IOS a un délai par défaut de dix minutes dans cette référence, mise à jour le 16 décembre 2019 ; vérifier la plateforme et sa configuration. | `01d645043ff7b7365225a1895a7e0ced8b3d62d25106f4225de850bc4b4a2fa4` |
| https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/fundamentals/command/cf_command_ref/L_through_mode.html | `logging synchronous` affiche les messages non sollicités séparément puis réaffiche l’invite, selon cette référence Cisco IOS mise à jour le 16 décembre 2019. | `a169c76bfa096238e305cef2004c8e10a09fca27213b33cef205fb0d489a7bac` |
| https://sre.google/sre-book/service-level-objectives/ | SLI, SLO et SLA sont distincts ; un objectif ne constitue pas nécessairement un contrat. | `60851ff3487eef695bb59143b5123a79af081091ce8bf2909ad83ad924438365` |

Le guide NIST SP 800-115, déjà référencé ci-dessus, recommande de définir les règles d’engagement et d’examiner les aspects juridiques ; il n’établit pas le droit français. L’accès direct à Légifrance pour la version applicable des articles 323-1 et 323-2 a échoué (HTTP 403) : les peines actuelles ne sont pas revendiquées comme vérifiées.

## Reprise indépendante F154–F156 et rendu

- **30 octobre 2026 :** https://cloud.google.com/compute/sla — conditions contractuelles Google Compute Engine ; le pourcentage dépend notamment de la configuration, du niveau et de la région. Le document a été obtenu en HTTP 200, SHA-256 `92c459a1ae42ff428367cdaea42c7ee8587eb4c4b70eea568ad08059e376024e`. L'exercice utilise désormais deux objectifs explicitement fictifs et ne les attribue plus automatiquement à un SLA réel.
- **30 octobre 2026 :** extrait indexé de https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047052655 — l'article 323-1 mentionne l'accès ou le maintien frauduleux. L'extrait indexé a été consulté, mais l'accès direct de l'outil de contre-vérification renvoyait HTTP 403 ; ni l'actualité exacte des peines ni l'application aux faits ne sont certifiées ici. La nouvelle formulation ne qualifie pas automatiquement l'absence d'écrit de délit.
- **30 octobre 2026 :** l'analyse de sécurité porte sur un fragment synthétique local et ne démontre pas qu'un étudiant peut modifier les contenus. Le contrôle de rendu interdit maintenant les attributs sur les balises `<br>` dans les textes traités par le gabarit ; la contre-vérification indépendante et les limites CSP sont consignées séparément.

## Reprise du délai console Cisco

- **30 octobre 2026 :** https://www.cisco.com/c/en/us/td/docs/ios/termserv/command/reference/tsv_book/tsv_a1.html — la commande `absolute-timeout` peut mettre fin à une session après une durée configurée, indépendamment du délai EXEC d'inactivité. Le document a été obtenu en HTTP 200 ; SHA-256 du flux reçu lors de la seconde consultation : `a5ffe0765b9b78707314f774cd5896546de54ff1a206a5b00327454694c7e2f3`. Aucune configuration n'a été essayée sur un équipement Cisco réel. Cette source complète la référence `exec-timeout` de 2019 indiquée ci-dessus.

## Reprise des bornes des simulations C#

Sources Microsoft consultées le **30 octobre 2026**. Les exercices sont des simulations à entrées textuelles, pas des exécutions directes de constructeurs ou de tâches asynchrones réelles.

| Source consultée | Portée | SHA-256 du flux reçu |
|---|---|---|
| https://learn.microsoft.com/en-us/dotnet/api/system.numerics.biginteger?view=net-9.0 | `BigInteger` représente des entiers au-delà des bornes `Int64`, sous réserve des ressources disponibles. | `0bcdb4551e19b23679fd0c1f3c7945a71ac629363cdc3a8d93bf9f6372a8a515` |
| https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#real-literals | Grammaire des littéraux numériques réels C# ; le petit langage de la simulation précise lui-même sa notation décimale. | `c1fa6c87eb4a7d4b345521d083949f54849f1a5a523f730602315e1bd0956f4e` |
| https://learn.microsoft.com/en-us/dotnet/api/system.decimal.parse?view=net-9.0 | Analyse d'un nombre en `decimal` et rôle de la culture utilisée ; l'exercice emploie un point en culture invariante. | `d5ca83c92fe7145ee483ea00b067ce8f3ab91ca98d2abe59f0b1978c1f371879` |
| https://learn.microsoft.com/en-us/dotnet/api/system.midpointrounding?view=net-9.0 | `AwayFromZero` arrondit au plus proche et, en cas d'égalité, vers la valeur éloignée de zéro ; cette convention est maintenant explicite dans la simulation des prix. | `74101e8a09c0277db5688f3df99e4c4285af98834823a4514aa284c7f934b136` |
