# Réseaux et supervision

**Appréciation : à corriger avant publication.** Chapitres sélectionnés : supervision B3 1 et 2. Population : 7 cours avec chapitre 1, 126 exercices, 356 QCM et 247 cartes ; 20 exercices, 10 QCM et 10 cartes tirés dans la famille entière. La sélection reproductible figure dans `../echantillons-identifiants.json`.

## Exactitude et constats

Les textes principaux des chapitres Supervision B3 1 et 2 sélectionnés, ainsi que ceux des douze chapitres de Réseaux B1 et CCNA 1, ont été lus ; chaque affirmation et chaque rendu ne sont pas pour autant certifiés.

- **F179 — D9/D14, S0, observé** — `b1-reseaux/chapitres/chapitre1.html:264`, « Cas 3 — Six reseaux » : un séparateur corrompu fusionne deux réponses. Un contrôle de tout le catalogue détecte 18 corrigés et attendus touchés, dont 14 en Réseaux B1 ; les 18 corrigés corrompus sont acceptés et les 18 versions où les lignes sont séparées sont rejetées. Voir `../sondes-sorties-corrompues.json`.
- **F180–F183 — D8/D9/D12, S0/S1, observé** — `b3-voip/chapitres/chapitre5.html:272` promet à tort que STUN suffit à établir des flux directs ; `b3-pfsense/chapitres/chapitre5.html:277` assimile tout numéro de groupe IKE supérieur ou égal à 19 à une courbe NIST robuste ; `b3-reseau-lan/chapitres/chapitre5.html:203` dit un état err-disable irrécupérable, et `chapitre4.html:190` impose un seul meilleur chemin à égalité sans signaler que le modèle omet l'ECMP. Les sources et les limites sont dans le registre.
- **F122–F125 — D12, S0/S1, observé** — `b1-reseaux/chapitres/chapitre3.html:98`, « Le chiffrement est de la couche 6 », exclut à tort les autres couches ; `chapitre4.html:83` généralise CSMA/CD au full-duplex ; `chapitre5.html:82` généralise l'OUI ; `chapitre6.html:96` omet les `/31` point à point. Voir les RFC et la documentation Cisco dans le registre.
- **F127–F137 — D6/D8/D9/D12, S0/S1** — `b1-ccna1/chapitres/chapitre1.html:103`, « le 10 Gigabit exige cat 6a ou 7 », oublie le cas catégorie 6 à portée limitée ; `chapitre2.html:275` rejette à tort le routage dans OSI ; `chapitre4.html:326`, « reste inchangé », oublie le TTL IPv4 ; `chapitre5.html:153` refuse `show version` en mode privilégié ; `chapitre6.html:84` généralise un minimum SSH historique et l'authentification par mot de passe.
- **F150–F152 — D9/D12, S0/S1, observé** — `b3-supervision/chapitres/chapitre2.html:152`, « garantissant la non-répudiation », confond les garanties TCP et TLS ; `:116`, « depuis le dernier boot », décrit mal `sysUpTime`. Sans panne, `chapitre1.html:199` affiche un MTTR arbitraire au lieu d'une mesure non disponible. Sources : https://www.rfc-editor.org/rfc/rfc5425.html et https://www.rfc-editor.org/rfc/rfc3418.html, consultées le 29 octobre 2026.
- **F12 — D12, S0, observé** — `ccna/chapitres/cartes.html:75`, « `2^(32 - n) - 2` » : la formule est donnée sans exception pour les hôtes IPv4. Sur un lien point à point `/31` répondant à la RFC 3021, les deux adresses peuvent être utilisées. Distinguer le cas général et ses conditions ; le cours pfSense traite déjà ce cas à `b3-pfsense/chapitres/chapitre1.html:173`.
- **F13 — D12, S0, observé** — `ccna/chapitres/cartes.html:97`, « hachage cryptographique fort ... MD5/SHA » : regrouper MD5 et SHA comme une garantie forte masque les différences de mécanisme et de robustesse. Présenter les types Cisco applicables et leurs limites, en utilisant les recommandations du constructeur.
- **F62 — D12, S1, observé** — `b3-voip/chapitres/cartes.html:69`, « 40 octets au total » : ce calcul suppose IPv4 sans options et un RTP minimal. L'en-tête de base IPv6 compte 40 octets à lui seul ; préciser les hypothèses avant de dimensionner le débit.
- **F40 — D12, S1, observé** — `b1-reseaux/chapitres/chapitre1.html:109`, « plus de 100 km ... loue des liaisons » : ni une distance fixe ni la location à un opérateur ne définit universellement un WAN. Donner ces cas comme exemples possibles.
- **F24 — D15, S1, observé** — `b3-voip/chapitres/chapitre1.html:186`, « `PER_CALL:<bandwidth_per_call_kbps:.1f>` » : le navigateur interprète les paramètres entre chevrons comme des balises. Encoder les caractères et vérifier l'affichage du format attendu.
- **F36 — D14, S2, observé** — `b1-reseaux/chapitres/chapitre1.html:179`, « local donne LAN, etendu donne WAN » : l'indice divulgue la distinction complète. Orienter plutôt vers une comparaison des portées et propriétés.

## Grille C1–C14 — éléments examinés

| Critère | Constat ou limite |
|---|---|
| C1 Situation | `b3-supervision/chapitres/chapitre1.html:65` donne une mission NOC concrète ; le chapitre 2 continue sur l'architecture de supervision. |
| C2 Objectifs | `b3-supervision/chapitres/chapitre1.html:70` demande distinguer, délimiter, calculer et interpréter ; couverture individuelle non vérifiée. |
| C3 Prérequis | Réseau, systèmes, ports et métriques nécessaires ne sont pas attestés pour chaque lecteur ; graphe inter-cours non établi. |
| C4 Ordre | `b3-supervision/chapitres/chapitre2.html:107` introduit SNMP après les composants ; aucune conclusion sur tous les éventuels renvois en avant. |
| C5 Définitions | La définition WAN B1 est trop restrictive, F40 ; le découpage `/31` est incomplet, F12. |
| C6 Exemples et progression | Les chapitres comprennent des situations et calculs ; l'existence d'un exemple résolu avant chaque exercice reste à établir. |
| C7 Charge | La situation de supervision mobilise plusieurs acronymes en même temps ; leur maîtrise effective par les étudiants B3 n'est pas mesurée. |
| C8 Cohérence | CCNA omet l'exception `/31` que pfSense précise ; les cartes et chapitres doivent être alignés. |
| C9 Exercices | Les 20 corrigés passent, mais la réponse cohérente à `re-c1-e3` est rejetée parce que l'attendu est corrompu, F179 ; l'indice de `b1-reseaux/chapitres/chapitre1.html:179` donne la réponse, F36. |
| C10 QCM | Le QCM IPv4 affirme à tort que l'en-tête reste inchangé, F131 ; ailleurs, `b3-reseau-lan/chapitres/chapitre3.html:429` distingue VRRP/IP 112 sans expliquer séparément chaque distracteur. |
| C11 Auto-évaluation | Seuils du corpus étudiés transversalement ; correspondance de chaque grille aux objectifs réseau non vérifiée. |
| C12 Exactitude | F12–F13 et F40 nécessitent des définitions conditionnelles et sourcées. |
| C13 Ressources | Aligner cartes CCNA, chapitre pfSense et indices B1 ; la couverture de toutes les cartes n'est pas établie. |
| C14 Rendu | Le format VoIP perd ses paramètres au rendu, F24 ; le parcours sur matériel réseau réel n'est pas testé. |

## Exercices, QCM et cartes

Les dix QCM et dix cartes de la famille ont été lus individuellement dans leur texte extrait ; appréciations et réserves figurent dans `../07-relecture-familles.csv`.

Les **20 exercices échantillonnés** ont chacun reçu deux variantes ciblant des erreurs de raisonnement : les 40 sont rejetées. Elles sont construites à partir des corrigés, pas recueillies auprès d'étudiants. Pour OSPF, STUN et IKE, ces variantes suivent les règles du modèle imposé, dont les limites ou erreurs réelles sont relevées ci-dessus. Détails : `../sondes-reponses-plausibles.json`.

Les **20 corrigés échantillonnés réussissent** et les **40 variantes automatiques sont rejetées**, mais cela ne prouve pas leur exactitude : F179 montre un corrigé et un attendu corrompus qui se valident mutuellement. Les 10 QCM et 10 cartes sélectionnés sont référencés ; seuls les écarts étayés ci-dessus sont déclarés.

**Niveau.** Le scénario B3 de supervision correspond à un contexte professionnel, mais sa faisabilité pour un étudiant en difficulté et la qualité des défis n'ont pas été testées avec une classe. Pour B1, expliquer les distinctions LAN/WAN avec exemples et contre-exemples avant la classification.

## Confrontation aux supports et références

`corpus-cours-revi.zip`, `textes/B3/Semestre II/Supervision/CDP_COURS_Supervision système et réseaux_UPDATE.txt`, page 1, et `b3-supervision/chapitres/chapitre1.html:56` portent sur la supervision. Ce rapprochement de titre ne valide ni l'ordre, ni la couverture des protocoles. Le corpus annonce zéro PDF pour `ccna` et `b3-pfsense`. Les textes principaux des six chapitres de Réseaux B1 et des six chapitres CCNA 1 ont été relus ; cela ne constitue pas une validation exhaustive de leurs sources ou évaluations.

Sources primaires consultées le 29 octobre 2026 :

- IETF, `/31` : https://www.rfc-editor.org/rfc/rfc3021.html
- IETF, en-tête IPv6 : https://www.rfc-editor.org/rfc/rfc8200.html
- IETF, en-tête RTP : https://www.rfc-editor.org/rfc/rfc3550.html
- IETF, VRRP : https://www.rfc-editor.org/rfc/rfc9568.html
- IETF, STUN et ICE : https://www.rfc-editor.org/rfc/rfc8489.html et https://www.rfc-editor.org/rfc/rfc8445.html
- IETF, OSPF et chemins à coût égal : https://www.rfc-editor.org/rfc/rfc2328.html
- IANA, registre des groupes IKEv2 : https://www.iana.org/assignments/ikev2-parameters
- Cisco, récupération après erreur Port Security : https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s6.html
- Cisco, protection des secrets : https://www.cisco.com/c/en/us/about/trust-center/resilient-infrastructure/protecting-secrets.html
- Cisco, WAN : https://www.cisco.com/site/us/en/learn/topics/networking/what-is-a-wan-wide-area-network.html
