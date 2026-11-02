# Échantillon de grilles formatives pour relecture humaine

Le catalogue contient 830 grilles ; 42 sont tirées, soit 5.06 % (5 % arrondi à l'entier supérieur).
Graine : `revi-lot1-partie3-2026-10-30`. L'ordre des cours puis le choix d'une fiche dans chaque cours sont déterminés par SHA-256 de la graine et de l'identifiant.
Le tirage comprend une grille de chacun des 42 cours retenus sur 46 ; les cours non tirés sont : `b1-droit`, `b3-cloud-azure`, `masterclass-apprendre`, `uml`.
Ce tirage stratifié n’est pas une preuve statistique de qualité pour toutes les grilles. Les attendus et corrigés ne sont pas reproduits dans ce document.

## Grille de relecture

- Compréhension : vocabulaire défini, objectif compréhensible, consigne non ambiguë.
- Cohérence : cas et indices compatibles avec la consigne ; données suffisantes et cas limites pertinents.
- Statut : activité explicitement formative, sans prétention à une validation générale.
- Noter chaque observation et son emplacement ; aucune relecture humaine n’est présumée effectuée.

## vo3-c1-e2 — Estimateur de Qualité Vocale & Modèle E (Score R & MOS)

Cours : Téléphonie VoIP (`b3-voip`), chapitre 1.
Source : `server/exercises/b3-voip.js`.

**Objectif :** Estimer le facteur de qualité R et le score MOS selon la recommandation ITU-T G.107 en fonction du délai et des pertes.

**Consigne**

Le standard ITU-T G.107 (E-Model) évalue la qualité de transmission vocale à travers un facteur de qualité R (variant typiquement de 0 à 100). Une simplification standardisée pour la ToIP prend en compte : - Si D <= 100 : Id = 0 - Si 100 < D <= 177 : Id = 0.024 * D - Si D > 177 : Id = 0.024 * D + 0.11 * (D - 177) - Pour G.711 : Ie = 2.5 * P - Pour G.729 : Ie = 11.0 + 3.0 * P - Pour G.722 : Ie = 2.0 * P
R0 : facteur intrinsèque de base (environ 93.2 pour G.711, 83.0 pour G.729, 94.0 pour G.722).
Id : dégradation liée au délai unidirectionnel D (en millisecondes) :
Ie : dégradation liée aux pertes de paquets P (pourcentage 0..100) :
Calcul du facteur R : R = max(0.0, min(100.0, R0 - Id - Ie))

Conversion du facteur R en score MOS (Mean Opinion Score entre 1.0 et 4.5) selon la formule ITU-T : MOS = 1.0 + 0.035 * R + R * (R - 60.0) * (100.0 - R) * 7e-6 (borné entre 1.0 et 4.5)
Si R < 0 : MOS = 1.0
Si 0 <= R <= 100 :
Si R > 100 : MOS = 4.5

Qualification de la qualité :
MOS >= 4.03 : EXCELLENT
3.60 <= MOS < 4.03 : BON
3.10 <= MOS < 3.60 : MOYEN
MOS < 3.10 : MAUVAIS

Format d'entrée :
Lignes de la forme :
CODEC= DELAY_MS= LOSS_PCT=

Format de sortie :
Pour chaque ligne, afficher :
CODEC: | DELAY:ms | LOSS:
% | R: | MOS: | QUALITE:

**Données et grille visibles**

~~~text
# Grille d'analyse (vo3-c1-e2) — Estimateur de Qualité Vocale & Modèle E (Score R & MOS)
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Cas de test 1]
# Données : CODEC=G.722 DELAY_MS=80 LOSS_PCT=1.0
# Données : CODEC=G.711 DELAY_MS=200 LOSS_PCT=6.0
# Données : CODEC=G.729 DELAY_MS=120 LOSS_PCT=1.0
A_COMPLETER

[Cas 2 — Cas de test 2]
# Données : CODEC=G.711 DELAY_MS=300 LOSS_PCT=15.0
# Données : CODEC=G.722 DELAY_MS=180 LOSS_PCT=0.5
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
CODEC=G.711 DELAY_MS=50 LOSS_PCT=0.0
CODEC=G.711 DELAY_MS=150 LOSS_PCT=2.0
CODEC=G.729 DELAY_MS=220 LOSS_PCT=5.0
~~~

**Indices visibles**

- Appliquez la formule par morceaux pour Id selon les seuils de 100 ms et 177 ms.
- Bornez le score MOS entre 1.0 et 4.5.

## st-c2-e1 — Tableau des effectifs

Cours : Statistique descriptive (`b1-stats`), chapitre 2.
Source : `server/exercises/b1-stats.js`.

**Objectif :** Regrouper une série par modalité et compter les effectifs.

**Consigne**

Dans cette étude, on considère un entier n, puis les n valeurs d’une série (une par ligne). Affichez le tableau des effectifs : une ligne par modalité, dans l’ordre croissant, au format valeur effectif.

**Données et grille visibles**

~~~text
# Grille de calcul (st-c2-e1) — Tableau des effectifs
# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :

[Cas 1 — Petites valeurs]
# Données : 5
# Données : 1
# Données : 1
# Données : 2
# Données : 3
# Données : 3
A_COMPLETER

[Cas 2 — Série constante]
# Données : 3
# Données : 5
# Données : 5
# Données : 5
A_COMPLETER

[Cas 3 — Trois modalités]
# Données : 6
# Données : 10
# Données : 20
# Données : 10
# Données : 30
# Données : 20
# Données : 10
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
8
8
9
12
15
15
12
12
15
~~~

**Indices visibles**

- Parcourez les valeurs une seule fois en comptant dans un dictionnaire : c’est plus court que de compter chaque modalité séparément.
- Triez ensuite les couples (valeur, effectif) avant de les afficher.

## lan3-c2-e3 — Contrôleur de cohérence des interfaces membres EtherChannel

Cours : Réseau LAN Avancé (`b3-reseau-lan`), chapitre 2.
Source : `server/exercises/b3-reseau-lan.js`.

**Objectif :** Vérifier la parfaite homogénéité des paramètres de configuration des ports d'un Port-Channel.

**Consigne**

Pour qu'un groupe EtherChannel puisse s'activer (état UP), tous les ports membres physiques doivent présenter des paramètres strictement identiques.

Paramètres obligatoirement homogènes :

- speed (vitesse en Mbps, ex: 1000)

- duplex (ex: full)

- mode (access ou trunk)

- Si mode == 'access' : même vlan d'accès.

- Si mode == 'trunk' : même native_vlan ET même ensemble de allowed_vlans.

Analysez les paramètres du problème pour chaque cas.

Pour chaque port membre (triés par nom de port) :

- Si tous les paramètres concordent avec la référence :

status=COMPLIANT reason=NONE.

- En cas de discordance :

status=INCOMPLIANT reason=<première_discordance_parmi: SPEED_MISMATCH, DUPLEX_MISMATCH, MODE_MISMATCH, ACCESS_VLAN_MISMATCH, NATIVE_VLAN_MISMATCH, ALLOWED_VLANS_MISMATCH>.

Afficher pour chaque port :

MEMBER_AUDIT group={group} port={port} status={status} reason={reason}

Et la synthèse finale du groupe :

BUNDLE_STATUS group={group} state={UP si 100% compliant sinon SUSPENDED} compliant_count={c}/{total}

**Données et grille visibles**

~~~text
# Grille d'analyse (lan3-c2-e3) — Contrôleur de cohérence des interfaces membres EtherChannel
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Tous les membres conformes sur trunk]
# Données : MEMBER group=Po5 port=Te1/1 speed=10000 duplex=full mode=trunk vlan=1 native=99 allowed=10,20
# Données : MEMBER group=Po5 port=Te1/2 speed=10000 duplex=full mode=trunk vlan=1 native=99 allowed=20,10
A_COMPLETER

[Cas 2 — Discordance de VLAN natif et allowed sur trunk]
# Données : MEMBER group=Po2 port=Gi1 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,20
# Données : MEMBER group=Po2 port=Gi2 speed=1000 duplex=full mode=trunk vlan=1 native=20 allowed=10,20
# Données : MEMBER group=Po2 port=Gi3 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,30
A_COMPLETER

[Cas 3 — Discordance de mode access vs trunk]
# Données : MEMBER group=Po3 port=Fa0/1 speed=100 duplex=full mode=access vlan=10 native=1 allowed=ALL
# Données : MEMBER group=Po3 port=Fa0/2 speed=100 duplex=full mode=trunk vlan=10 native=1 allowed=ALL
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
MEMBER group=Po1 port=Gi0/1 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,20,30
MEMBER group=Po1 port=Gi0/2 speed=1000 duplex=full mode=trunk vlan=1 native=10 allowed=10,20,30
MEMBER group=Po1 port=Gi0/3 speed=100 duplex=full mode=trunk vlan=1 native=10 allowed=10,20,30
~~~

**Indices visibles**

- Prendre le premier port comme modèle.
- Comparer les champs dans l'ordre : speed, duplex, mode, vlan (si access), native/allowed (si trunk).
- Normaliser allowed_vlans sous forme d'un set d'entiers.

## do3-c2-e2 — Auditeur de seuil de qualité de build CI (Quality Gate SonarQube)

Cours : DevOps (`b3-devops`), chapitre 2.
Source : `server/exercises/b3-devops.js`.

**Objectif :** Vérifier automatiquement si un code soumis en intégration continue satisfait les exigences de qualité et de sécurité requises pour être fusionné.

**Consigne**

Analysez les paramètres du problème pour chaque cas.

Seuils d'acceptation du Quality Gate :

1. coverage >= 80.0 (sinon alerte : COUVERTURE_INSUFFISANTE)

2. vuln == 0 (sinon alerte : VULNERABILITES_DETECTEES)

3. bugs == 0 (sinon alerte : BUGS_CRITIQUES_DETECTES)

4. duplicated <= 3.0 (sinon alerte : DUPLICATION_EXCESSIVE)

Statut global :

- Si aucune alerte : STATUT=PASSED et MOTIFS=[AUCUN]

- Si une ou plusieurs alertes : STATUT=FAILED et MOTIFS=[<liste ordonnée séparée par virgule>]

Afficher :

QUALITY_GATE: <nom> -> STATUT=<PASSED|FAILED> | MOTIFS=[<motifs>]

**Données et grille visibles**

~~~text
# Grille d'analyse (do3-c2-e2) — Auditeur de seuil de qualité de build CI (Quality Gate SonarQube)
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Échec sur la couverture de tests uniquement]
# Données : GATE app=billing_worker coverage=79.9 vuln=0 bugs=0 duplicated=2.0
A_COMPLETER

[Cas 2 — Vulnérabilité de sécurité isolée]
# Données : GATE app=user_profile coverage=92.0 vuln=1 bugs=0 duplicated=1.0
A_COMPLETER

[Cas 3 — Code sain conforme aux normes d’entreprise]
# Données : GATE app=search_engine coverage=80.0 vuln=0 bugs=0 duplicated=3.0
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
GATE app=auth_service coverage=85.5 vuln=0 bugs=0 duplicated=1.8
GATE app=payment_api coverage=72.0 vuln=2 bugs=1 duplicated=4.5
~~~

**Indices visibles**

- Garder l’ordre exact des motifs en cas de défaillances multiples.
- Un Quality Gate strict empêche la dette technique de s’infiltrer dans la branche principale.

## fw3-c4-e1 — Contrôleur de conformité des flux de sécurité DMZ

Cours : Firewall (`b3-firewall`), chapitre 4.
Source : `server/exercises/b3-firewall.js`.

**Objectif :** Vérifier la conformité des flux réseau selon la matrice de sécurité inter-zones et interdire formellement DMZ vers LAN.

**Consigne**

La Zone Démilitarisée (DMZ) héberge les serveurs publics de l'entreprise. La règle cardinale de sécurité réseau stipule qu'aucune connexion ne doit jamais pouvoir être initiée depuis la DMZ vers le réseau interne LAN (car un pirate ayant compromis un serveur web en DMZ pourrait pivoter vers les postes internes).

Matrice de conformité des flux initiés :

1. DMZ -> LAN : Toujours VIOLATION_CRITIQUE_DMZ_VERS_LAN quel que soit le port.

2. WAN -> DMZ : Autorisé uniquement sur les ports publics 80, 443, 25, 53 -> CONFORME (sinon SERVICE_NON_AUTORISE).

3. LAN -> DMZ : Autorisé pour l'administration et les services 80, 443, 22, 3306 -> CONFORME (sinon SERVICE_NON_AUTORISE).

4. LAN -> WAN : Autorisé pour la navigation 80, 443, 53 -> CONFORME (sinon SERVICE_NON_AUTORISE).

5. DMZ -> WAN : Autorisé uniquement pour les mises à jour et DNS 80, 443, 53 -> CONFORME (sinon SERVICE_NON_AUTORISE).

6. WAN -> LAN : Toujours VIOLATION_WAN_VERS_LAN_INTERDIT.

Analysez les paramètres du problème pour chaque cas.

Pour chaque flux, afficher :

AUDIT flow={id} status={CONFORME | motif_rejet}

**Données et grille visibles**

~~~text
# Grille d'analyse (fw3-c4-e1) — Contrôleur de conformité des flux de sécurité DMZ
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Tentative de connexion WAN directe vers le LAN]
# Données : FLOW id=W1 src_zone=WAN dst_zone=LAN dport=22
# Données : FLOW id=W2 src_zone=WAN dst_zone=DMZ dport=80
A_COMPLETER

[Cas 2 — Flux applicatif LAN vers base de données DMZ et service non autorisé]
# Données : FLOW id=L1 src_zone=LAN dst_zone=DMZ dport=3306
# Données : FLOW id=L2 src_zone=LAN dst_zone=DMZ dport=139
# Données : FLOW id=D1 src_zone=DMZ dst_zone=WAN dport=443
# Données : FLOW id=D2 src_zone=DMZ dst_zone=WAN dport=22
A_COMPLETER

[Cas 3 — Navigation LAN vers Internet WAN légitime et interdite]
# Données : FLOW id=N1 src_zone=LAN dst_zone=WAN dport=80
# Données : FLOW id=N2 src_zone=LAN dst_zone=WAN dport=6667
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
FLOW id=F1 src_zone=WAN dst_zone=DMZ dport=443
FLOW id=F2 src_zone=DMZ dst_zone=LAN dport=3306
~~~

**Indices visibles**

- Traiter en priorité les violations absolues (DMZ->LAN et WAN->LAN).
- Vérifier si le port destination fait partie de la liste blanche autorisée pour le couple (src, dst).

## cc-c3-e2 — SOHO ou entreprise

Cours : CCNA 1 (`b1-ccna1`), chapitre 3.
Source : `server/exercises/b1-ccna1.js`.

**Objectif :** Distinguer le réseau local SOHO du réseau local d'entreprise selon l'équipement décrit.

**Consigne**

Analysez chaque ligne proposée « reseau usage » : usage est un code parmi soho ou entreprise. Réseau SOHO : un seul commutateur pour tous les postes, ou un « routeur sans fil » unique qui fait tout. Réseau d'entreprise : un commutateur par étage dans la salle technique, point d'accès par étage. Pour chaque ligne, indiquez reseau : conforme ou reseau : a revoir, puis conformes : X/n.

**Données et grille visibles**

~~~text
# Grille d'analyse (cc-c3-e2) — SOHO ou entreprise
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — La maison]
# Données : 2
# Données : domicile soho
# Données : appartement soho
A_COMPLETER

[Cas 2 — La tour]
# Données : 3
# Données : etage1 entreprise
# Données : etage2 entreprise
# Données : etage3 entreprise
A_COMPLETER

[Cas 3 — Inversé]
# Données : 2
# Données : etage1 soho
# Données : domicile entreprise
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
2
domicile soho
etage1 soho
~~~

**Indices visibles**

- Un seul appareil qui fait tout → SOHO ; un commutateur par étage → entreprise.
- Un case par usage donne la famille attendue.

## hk3-c5-e3 — Calculateur d'Offset de Buffer Overflow et Agencement de Payload

Cours : Hacking éthique (`b3-hacking`), chapitre 5.
Source : `server/exercises/b3-hacking.js`.

**Objectif :** Calculer la structure et la taille globale d'un exploit de dépassement de tampon de pile (Stack Buffer Overflow).

**Consigne**

Dans l'exploitation de binaires compilés (x86/x64 sans canary), un dépassement de tampon permet de réécrire le pointeur d'instruction de retour (EIP/RIP).

Structure du payload dans la pile :

1. PADDING : offset octets (remplissage jusqu'au pointeur de retour).

2. RET_ADDR : taille de l'adresse de retour (4 octets en x86, 8 octets en x64).

3. NOP_SLED : sled_len octets de NOP (\x90).

4. SHELLCODE : shellcode_len octets du code exécutable injecté.

Calcul de la taille totale du payload :

total_size = offset + ret_bytes + sled_len + shellcode_len.

Données du cas : BOF_LAYOUT arch=<x86|x64> offset=<N> sled_len=<S> shellcode_len=<L>.

Résultat d’analyse attendu : PAYLOAD_LAYOUT: arch=<arch> offset=<N> ret_bytes=<4|8> sled=<S> shellcode=<L> total_size=<total> status=READY_FOR_INJECTION.

**Données et grille visibles**

~~~text
# Grille d'analyse (hk3-c5-e3) — Calculateur d'Offset de Buffer Overflow et Agencement de Payload
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Payload 64-bit avec pointeur d'instruction RIP sur 8 octets]
# Données : BOF_LAYOUT arch=x64 offset=264 sled_len=64 shellcode_len=85
A_COMPLETER

[Cas 2 — Petit offset sans NOP sled (saut direct au début du shellcode)]
# Données : BOF_LAYOUT arch=x86 offset=40 sled_len=0 shellcode_len=28
A_COMPLETER

[Cas 3 — Tampon volumineux sous architecture x64]
# Données : BOF_LAYOUT arch=x64 offset=1024 sled_len=128 shellcode_len=120
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
BOF_LAYOUT arch=x86 offset=112 sled_len=32 shellcode_len=44
~~~

**Indices visibles**

- Identifiez ret_bytes : 4 octets pour x86 et 8 octets pour x64.
- Sommez offset + ret_bytes + sled_len + shellcode_len.
- Affichez la disposition du payload selon le format demandé.

## mr-c1-e2 — Les trois sous-systèmes

Cours : Modélisation (MERISE) (`b1-merise`), chapitre 1.
Source : `server/exercises/b1-merise.js`.

**Objectif :** Router les flux de l'entreprise vers le bon sous-système : décision, opérant ou information.

**Consigne**

Analysez chaque ligne proposée « flux sous_systeme » : sous_systeme vaut d (décision), o (opérant) ou si (information). Pour chaque ligne, indiquez flux : role, où role vaut piloter (décision), produire (opérant) ou memoriser (information). Terminez par flux si : X/n, X étant le nombre de lignes dirigées vers le système d'information.

**Données et grille visibles**

~~~text
# Grille d'analyse (mr-c1-e2) — Les trois sous-systèmes
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Un seul flux opérant]
# Données : 1
# Données : production o
A_COMPLETER

[Cas 2 — Deux flux SI]
# Données : 2
# Données : commandes si
# Données : livraisons si
A_COMPLETER

[Cas 3 — Cinq flux mixtes]
# Données : 5
# Données : budget d
# Données : fabrication o
# Données : factures si
# Données : inventaire si
# Données : recrutement d
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
4
objectifs d
assemblage o
stockage si
controles d
~~~

**Indices visibles**

- Un case avec trois branches couvre d, o et si ; ajoutez une branche *) par sécurité.
- Le compteur du système d'information s'incrémente seulement dans la branche si.

## ib2-c1-e1 — Besoin vs Solution technique

Cours : Ingénierie du besoin (`ingenierie-besoin`), chapitre 1.
Source : `server/exercises/ingenierie-besoin.js`.

**Objectif :** Distinguer un besoin métier (le « Quoi / Pourquoi ») d’une solution technique prématurée (le « Comment »).

**Consigne**

En ingénierie des exigences, un besoin exprime un objectif ou une difficulté utilisateur ; une solution décrit un choix technique de réalisation.
Classez chaque énoncé dans les données du cas : Besoin, Solution ou Inconnu lorsque l’information ne permet pas de trancher. Répondez au format Type: <classification>.

**Données et grille visibles**

~~~text
# Grille d'analyse (ib2-c1-e1) — Besoin vs Solution technique
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Test 1]
# Données : utiliser react avec mongodb
A_COMPLETER

[Cas 2 — Test 2]
# Données : securiser l acces aux comptes bancaires
A_COMPLETER

[Cas 3 — Test 3]
# Données : attentes a preciser
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
reduire le temps d attente au guichet
~~~

**Indices visibles**

- Cherchez si l’énoncé décrit une finalité métier ou une technologie à utiliser.
- Si la formulation ne donne pas assez d’information, ne supposez pas une classification.

## en-c6-e3 — The final assessment

Cours : Anglais des affaires (`b1-anglais`), chapitre 6.
Source : `server/exercises/b1-anglais.js`.

**Objectif :** Évaluer le parcours complet (le test final du support) : quatre compétences notées, verdict de passage.

**Consigne**

L’analyse porte sur d'abord seuil (score minimal, entier). Puis il lit n lignes « competence score » (score entier). Pour chaque situation, indiquez competence : score X. Final : moyenne : M (moyenne entière arrondie vers le bas) et verdict : admis si M ≥ seuil, verdict : entrainement sinon. Si n = 0, afficher moyenne : 0.

**Données et grille visibles**

~~~text
# Grille d'analyse (en-c6-e3) — The final assessment
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Sous le seuil]
# Données : 2
# Données : vocabulaire 70
# Données : emails 75
A_COMPLETER

[Cas 2 — Aucune competence]
# Données : 0
A_COMPLETER

[Cas 3 — Cinq competences]
# Données : 5
# Données : a 80
# Données : b 70
# Données : c 90
# Données : d 65
# Données : e 75
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
70
4
vocabulaire 80
emails 90
presentations 60
prononciation 75
~~~

**Indices visibles**

- Calculate the overall English proficiency score across all evaluated competencies.
- Determine the corresponding CEFR benchmark level (B1, B2, or C1).

## aw-c1-e3 — La charge du jour : tâches normales et grosses

Cours : Administration Windows (`b1-admin-windows`), chapitre 1.
Source : `server/exercises/b1-admin-windows.js`.

**Objectif :** Mesurer la charge quotidienne de l’administrateur : petites et grosses tâches.

**Consigne**

Le support rappelle que l’administrateur « gère quotidiennement de multiples tâches, petites ou grosses ». Analysez chaque ligne proposée « tache duree » (durée en minutes). Une tâche de 30 minutes ou plus est grosse, sinon normale. Pour chaque ligne indiquez tache : normale ou tache : grosse, puis charge : X min (somme des durées) et grosses : Y.

**Données et grille visibles**

~~~text
# Grille d'analyse (aw-c1-e3) — La charge du jour : tâches normales et grosses
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Journée chargée]
# Données : 4
# Données : comptes 15
# Données : panne 60
# Données : mails 5
# Données : update 30
A_COMPLETER

[Cas 2 — Que des petites]
# Données : 3
# Données : mails 5
# Données : comptes 10
# Données : check 14
A_COMPLETER

[Cas 3 — Frontière exacte]
# Données : 3
# Données : a 29
# Données : b 30
# Données : c 31
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
3
patch 45
comptes 10
sauvegarde 30
~~~

**Indices visibles**

- Test de classement : duree -ge 30 → grosse, sinon normale ; la somme progresse dans les deux cas.
- Les deux bilans sortent une seule fois, après la boucle.

## cc3-c1-e3 — Évaluateur de modèles de déploiement Cloud (Public, Privé, Hybride, Communautaire)

Cours : Cloud Computing (`b3-cloud-computing`), chapitre 1.
Source : `server/exercises/b3-cloud-computing.js`.

**Objectif :** Qualifier automatiquement le modèle de déploiement Cloud cible d’une organisation selon ses contraintes de colocation, connectivité et criticité des données.

**Consigne**

Analysez les paramètres du problème pour chaque cas.

Arbre de qualification déterministe :

1. Si PARTAGE == COMMUNAUTE -> MODELE=COMMUNAUTAIRE.

2. Sinon si RESEAU == HYBRIDE -> MODELE=HYBRIDE.

3. Sinon si TENANT == DEDIE ou DONNEES == SECRET ou PARTAGE == EXCLUSIF -> MODELE=PRIVE.

4. Sinon si TENANT == MULTI et RESEAU == INTERNET -> MODELE=PUBLIC.

5. Sinon -> MODELE=PRIVE.

Déterminer également le NIVEAU_ISOLATION :

- Si MODELE == PRIVE : ISOLE_PHYSIQUE

- Si MODELE == HYBRIDE : SEGMENTE_VPN

- Si MODELE == COMMUNAUTAIRE : RESTREINT_PAIRS

- Si MODELE == PUBLIC : LOGIQUE_MULTI_TENANT

Afficher :

MODELE: <nom> -> DEPL=<MODELE> | ISOLATION=<NIVEAU_ISOLATION>

**Données et grille visibles**

~~~text
# Grille d'analyse (cc3-c1-e3) — Évaluateur de modèles de déploiement Cloud (Public, Privé, Hybride, Communautaire)
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Groupement inter-hospitalier communautaire]
# Données : DEPL nom=sante_region TENANT=MULTI RESEAU=VPN_PRIVE DONNEES=SENSIBLE PARTAGE=COMMUNAUTE
A_COMPLETER

[Cas 2 — Environnement de dev public]
# Données : DEPL nom=dev_sandbox TENANT=MULTI RESEAU=INTERNET DONNEES=STANDARD PARTAGE=OUVERT
A_COMPLETER

[Cas 3 — Système d’armes militaire dédié]
# Données : DEPL nom=defense_ops TENANT=DEDIE RESEAU=VPN_PRIVE DONNEES=SECRET PARTAGE=EXCLUSIF
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
DEPL nom=startup_web TENANT=MULTI RESEAU=INTERNET DONNEES=STANDARD PARTAGE=OUVERT
DEPL nom=hopital_chru TENANT=DEDIE RESEAU=VPN_PRIVE DONNEES=SECRET PARTAGE=EXCLUSIF
DEPL nom=banque_core TENANT=MULTI RESEAU=HYBRIDE DONNEES=SENSIBLE PARTAGE=OUVERT
~~~

**Indices visibles**

- Appliquer les règles dans l’ordre strict : Communauté puis Hybride puis Privé puis Public.
- Le Cloud communautaire fédère plusieurs organisations partageant des exigences communes (ex: secteur bancaire ou recherche).

## vrt3-c4-e3 — Calculateur de Régulation de Trafic Réseau (Traffic Shaping : Average, Peak, Burst Size)

Cours : Virtualisation Avancée (`b3-virtualisation`), chapitre 4.
Source : `server/exercises/b3-virtualisation.js`.

**Objectif :** Modéliser l'algorithme de lissage de trafic réseau (Token Bucket) et calculer la durée de transfert et le débit effectif.

**Consigne**

Le Traffic Shaping sur un vSwitch régule la bande passante selon un algorithme de seau à jetons (Token Bucket) :

1. Paramètres du profil de régulation :

- AVG_KBPS : Débit moyen permanent alloué (en kbps).

- PEAK_KBPS : Débit maximal autorisé en période de pic (en kbps).

- BURST_KB : Capacité maximale du tampon de rafale (en Ko).

2. Calculs pour un transfert de TRANSFER_MB Mo :

- Volume total en kilobits : total_kbits = TRANSFER_MB * 8000.0 (unité réseau : 1 Mo = 1 000 Ko = 8 000 kb).

- Capacité de rafale en kilobits : burst_kbits = min(total_kbits, BURST_KB * 8.0).

- Durée de la phase de rafale : burst_time_s = burst_kbits / PEAK_KBPS.

- Volume restant à écouler au débit moyen : remaining_kbits = total_kbits - burst_kbits.

- Durée de la phase moyenne : avg_time_s = remaining_kbits / AVG_KBPS.

- Durée totale du transfert : total_time_s = burst_time_s + avg_time_s.

- Débit moyen effectif global : effective_rate_kbps = total_kbits / total_time_s.

Format d'entrée (les données d’entrée) :

Lignes : PROFILE=<nom> AVG_KBPS=<n> PEAK_KBPS=<n> BURST_KB=<n> TRANSFER_MB=<n>.

Format de sortie :

PROFILE:<nom> | BURST_TIME:<burst_time_s:.2f>s | TOTAL_TIME:<total_time_s:.2f>s | EFFECTIVE_RATE:<effective_rate_kbps:.1f>kbps

**Données et grille visibles**

~~~text
# Grille d'analyse (vrt3-c4-e3) — Calculateur de Régulation de Trafic Réseau (Traffic Shaping : Average, Peak, Burst Size)
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Transfert très court entièrement contenu dans la rafale]
# Données : PROFILE=Quick-Burst AVG_KBPS=5000 PEAK_KBPS=20000 BURST_KB=4000 TRANSFER_MB=1
A_COMPLETER

[Cas 2 — Très gros transfert dominé par le débit moyen]
# Données : PROFILE=Heavy-Transfer AVG_KBPS=20000 PEAK_KBPS=80000 BURST_KB=10000 TRANSFER_MB=200
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
PROFILE=Web-Policy AVG_KBPS=10000 PEAK_KBPS=40000 BURST_KB=5000 TRANSFER_MB=10
PROFILE=DB-Replication AVG_KBPS=50000 PEAK_KBPS=100000 BURST_KB=10000 TRANSFER_MB=50
~~~

**Indices visibles**

- Convertissez les Mo en kilobits réseau : total_kbits = TRANSFER_MB * 8000.0.
- La rafale n'absorbe qu'au plus min(total_kbits, BURST_KB * 8.0) avant retour au débit moyen.

## re-c3-e2 — Où travaille l'équipement

Cours : Architecture des réseaux (`b1-reseaux`), chapitre 3.
Source : `server/exercises/b1-reseaux.js`.

**Objectif :** Placer les équipements dans leurs couches : câble (1), commutateur (2), routeur (3), application (7).

**Consigne**

Analysez chaque ligne proposée « equipement couche » : couche vaut c1 (câble, connecteur), c2 (commutateur), c3 (routeur) ou c7 (navigateur, messagerie). Pour chaque ligne, indiquez equipement : couche N si l'équipement correspond bien à cette couche, equipement : hors couche sinon. Terminez par routeurs : X/n (les équipements placés correctement en couche 3).

**Données et grille visibles**

~~~text
# Grille d'analyse (re-c3-e2) — Où travaille l'équipement
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Un routeur bien placé]
# Données : 1
# Données : routeur c3
A_COMPLETER

[Cas 2 — Hors couche]
# Données : 2
# Données : switch c3
# Données : navigateur c2
A_COMPLETER

[Cas 3 — Cinq equipements]
# Données : 5
# Données : routeur c3
# Données : switch c2
# Données : cable c1
# Données : application c7
# Données : switch c3
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
4
routeur c3
switch c2
cable c1
routeur c2
~~~

**Indices visibles**

- Un case sur la couche donne l'équipement attendu : c1 cable, c2 commutateur, c3 routeur, c7 application.
- La comparaison équipement reçu contre équipement attendu décide du verdict.

## dt3-c2-e2 — Matrice de traçabilité des exigences (Requirements Traceability Matrix - RTM)

Cours : Document technique (`b3-document-technique`), chapitre 2.
Source : `server/exercises/b3-document-technique.js`.

**Objectif :** Auditer la couverture bidirectionnelle entre une exigence métier, sa spécification détaillée et son cas de test de recette.

**Consigne**

Pour chaque cas d’application :

RTM_ENTRY req=<REQ_ID> sfd=<SFD_ID> test=<TEST_ID>.

Règles d'évaluation de couverture :

- sfd est valide si différente de AUCUN et NON_COUVERT.

- test est valide si différent de AUCUN et NON_COUVERT.

Statut de couverture :

- Si les deux sont valides :

COUVERTURE=COMPLETE (SPEC_ET_TEST)

- Si sfd valide mais test invalide :

COUVERTURE=PARTIELLE (TEST_MANQUANT)

- Si sfd invalide mais test valide :

COUVERTURE=PARTIELLE (SFD_MANQUANTE)

- Si les deux sont invalides :

COUVERTURE=ORPHELINE_NON_COUVERTE (CRITIQUE)

Afficher :

RTM_AUDIT: <req> -> COUVERTURE=<COUVERTURE>

**Données et grille visibles**

~~~text
# Grille d'analyse (dt3-c2-e2) — Matrice de traçabilité des exigences (Requirements Traceability Matrix - RTM)
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Exigence spécifiée mais sans cas de test associé]
# Données : RTM_ENTRY req=REQ-102 sfd=SFD-PAY-02 test=AUCUN
A_COMPLETER

[Cas 2 — Exigence testée sans spécification formelle]
# Données : RTM_ENTRY req=REQ-103 sfd=NON_COUVERT test=TEST-EXPORT-01
A_COMPLETER

[Cas 3 — Exigence totalement orpheline critique]
# Données : RTM_ENTRY req=REQ-104 sfd=AUCUN test=NON_COUVERT
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
RTM_ENTRY req=REQ-101 sfd=SFD-AUTH-01 test=TEST-AUTH-E2E
~~~

**Indices visibles**

- Tester la présence de valeurs invalides AUCUN ou NON_COUVERT.
- Distinguer les couvertures partielles selon la composante absente.

## vt3-c4-e3 — Classificateur bayésien naïf d’alertes de veille (Pertinent vs Bruit)

Cours : Veille technologique & Innovation (`b3-veille`), chapitre 4.
Source : `server/exercises/b3-veille.js`.

**Objectif :** Appliquer le modèle probabiliste de Naive Bayes pour filtrer automatiquement les alertes entrantes en éliminant le bruit informationnel.

**Consigne**

Dans la surveillance temps réel, les flux génèrent une surcharge cognitive de notifications parasites. Un filtre probabiliste Naive Bayes calcule la log-vraisemblance d’appartenance aux classes `PERTINENT` et `BRUIT` :

Pour une alerte composée des mots $w_1, w_2, \dots, w_k$ :
$$\ln P(\text{Pertinent}|d) = \ln P_0(\text{pertinent}) + \sum_{i=1}^k \ln P(w_i | \text{pertinent})$$
$$\ln P(\text{Bruit}|d) = \ln P_0(\text{bruit}) + \sum_{i=1}^k \ln P(w_i | \text{bruit})$$
(les mots inconnus non présents dans la table de probabilités sont ignorés)

Règle de décision :
- Si $\ln P(\text{Pertinent}|d) \ge \ln P(\text{Bruit}|d)$ : `decision = PERTINENT`
- Sinon : `decision = BRUIT`
- Différence logarithmique : $\text{diff} = \ln P(\text{Pertinent}|d) - \ln P(\text{Bruit}|d)$ (arrondie à 2 décimales)

Entrée :
`PRIOR pertinent= bruit=`
`PROB word= p_pert= p_bruit=`
`ALERT id= text=`

Résultat d’analyse attendu :
- Pour chaque alerte :
`CLASSIFICATION id= decision= diff=`
- Bilan :
`SUMMARY total_alertes= retenues= rejetees=`

**Données et grille visibles**

~~~text
# Grille d'analyse (vt3-c4-e3) — Classificateur bayésien naïf d’alertes de veille (Pertinent vs Bruit)
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Alerte avec mots mixtes départagée par le ratio de cotes]
# Données : PRIOR pertinent=0.6 bruit=0.4
# Données : PROB word=securite p_pert=0.10 p_bruit=0.05
# Données : PROB word=sponsorise p_pert=0.01 p_bruit=0.20
# Données : ALERT id=X1 text=article securite sponsorise par notre partenaire
A_COMPLETER

[Cas 2 — Toutes les alertes hautement pertinentes]
# Données : PRIOR pertinent=0.5 bruit=0.5
# Données : PROB word=vulnerabilite p_pert=0.25 p_bruit=0.01
# Données : ALERT id=K1 text=vulnerabilite linux
# Données : ALERT id=K2 text=nouvelle vulnerabilite windows
A_COMPLETER

[Cas 3 — Alerte sans aucun mot connu dans le dictionnaire]
# Données : PRIOR pertinent=0.7 bruit=0.3
# Données : PROB word=ia p_pert=0.10 p_bruit=0.02
# Données : ALERT id=EMPTY text=bonjour tout le monde
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
PRIOR pertinent=0.5 bruit=0.5
PROB word=faille p_pert=0.20 p_bruit=0.01
PROB word=zero-day p_pert=0.15 p_bruit=0.001
PROB word=promo p_pert=0.005 p_bruit=0.30
PROB word=gratuit p_pert=0.01 p_bruit=0.25
ALERT id=A1 text=decouverte d une faille critique zero-day
ALERT id=A2 text=super promo webinaire gratuit pour tous
~~~

**Indices visibles**

- Convertir les probabilités P_pert et P_bruit avec math.log().
- Additionner les logs pour chaque mot de l’alerte présent dans la table.
- Comparer les sommes cumulées pour statuer sur la décision.

## asm2-c2-e2 — Simulateur d’ALU 8 bits & Drapeaux d’état (ZF, CF, SF)

Cours : Assembleur (`assembleur`), chapitre 2.
Source : `server/exercises/assembleur.js`.

**Objectif :** Calculer la mise à jour des drapeaux du registre EFLAGS (Z, C, S) après une addition ou soustraction.

**Consigne**

L’Unité Arithmétique et Logique (ALU) met à jour des indicateurs d’état après chaque calcul :
ZF (Zero Flag) : mis à 1 si le résultat 8 bits vaut 0, sinon 0 ;
CF (Carry Flag) : retenue non signée (1 si dépassement > 255 en ADD, ou emprunt A < B en SUB) ;
SF (Sign Flag) : bit de signe du résultat 8 bits (bit 7 à 1).
Analysez les paramètres du problème pour chaque cas..255). Indiquez :
RES=0xXX ZF=<0|1> CF=<0|1> SF=<0|1>.

**Données et grille visibles**

~~~text
# Grille d'analyse (asm2-c2-e2) — Simulateur d’ALU 8 bits & Drapeaux d’état (ZF, CF, SF)
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Soustraction donnant zéro (ZF=1)]
# Données : SUB;42;42
A_COMPLETER

[Cas 2 — Soustraction avec emprunt et signe négatif (CF=1, SF=1)]
# Données : SUB;5;10
A_COMPLETER

[Cas 3 — Addition normale sans retenue]
# Données : ADD;20;30
A_COMPLETER

[Cas 4 — Addition produisant un résultat négatif 8 bits (SF=1)]
# Données : ADD;100;30
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
ADD;250;10
~~~

**Indices visibles**

- Pour ADD : somme = A + B, CF = 1 si somme > 255 sinon 0, res = somme & 0xFF.
- Pour SUB : diff = A - B, CF = 1 si A < B sinon 0, res = diff & 0xFF.
- ZF = 1 si res == 0 sinon 0, SF = 1 si (res & 0x80) != 0 sinon 0.

## vt-c6-e2 — Le bilan avant/après du parc

Cours : Virtualisation des serveurs (`b1-virtualisation`), chapitre 6.
Source : `server/exercises/b1-virtualisation.js`.

**Objectif :** Produire le tableau de bord de l’argumentaire : gaspillage avant, rente après.

**Consigne**

Analysez chaque ligne proposée « serveur avant apres » (taux d’utilisation %). Indiquez pour chaque serveur serveur : avant=A% apres=B%, puis trois bilans : reveilles : X (passés de moins de 30 % à 80 % ou plus), moyenne avant : Y% et moyenne apres : Z% (moyennes arrondies à l’entier inférieur).

**Données et grille visibles**

~~~text
# Grille d'analyse (vt-c6-e2) — Le bilan avant/après du parc
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Parc du support]
# Données : 4
# Données : a 10 95
# Données : b 20 80
# Données : c 40 45
# Données : d 50 55
A_COMPLETER

[Cas 2 — Tout réveillé]
# Données : 3
# Données : a 5 90
# Données : b 10 85
# Données : c 0 100
A_COMPLETER

[Cas 3 — Rien ne bouge]
# Données : 2
# Données : a 60 60
# Données : b 70 65
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
3
srv1 20 90
srv2 30 50
srv3 10 85
~~~

**Indices visibles**

- Identifiez les machines virtuelles réveillées dont la charge passe d’un niveau faible (< 30%) à un niveau actif (>= 80%).
- Comparez la moyenne de consommation avant et après réallocation dynamique des vCPU.

## na2-c6-e1 — Décodeur de balise Ethernet IEEE 802.1Q (VLAN Tagging)

Cours : CCNA Réseau (`ccna`), chapitre 6.
Source : `server/exercises/ccna.js`.

**Objectif :** Décoder la balise 802.1Q de 4 octets insérée dans la trame Ethernet (TPID, PCP, DEI, VID).

**Consigne**

Une balise 802.1Q fait 4 octets (32 bits) :

- TPID (16 bits) : Tag Protocol Identifier, doit valoir 0x8100 pour 802.1Q standard.

- TCI (16 bits) : Tag Control Information, décomposé en :

* PCP (3 bits, 0-7) : Priority Code Point (classe de service CoS).

* DEI (1 bit, 0 ou 1) : Drop Eligible Indicator (éligible au rejet en cas de congestion).

* VID (12 bits, 1-4094) : VLAN ID.

Analysez les paramètres du problème pour chaque cas.

Il décode et Indiquez :

- TPID: 0x<HEX> (<VALIDE|INVALIDE>)

- VLAN ID: <VID> (<STANDARD|ETENDU|RESERVE>) (1-1005: STANDARD, 1006-4094: ETENDU, 0 ou 4095: RESERVE)

- Priorite CoS (PCP): <PCP> (<QOS_DESCRIPTION>) (0: Best Effort, 1: Background, 2: Spare, 3: Critical, 4: Video, 5: Voice, 6: Internetwork Control, 7: Network Control)

- Drop Eligible (DEI): <OUI|NON>

**Données et grille visibles**

~~~text
# Grille d'analyse (na2-c6-e1) — Décodeur de balise Ethernet IEEE 802.1Q (VLAN Tagging)
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — VLAN étendu avec vidéo et drop eligible]
# Données : 81009800
A_COMPLETER

[Cas 2 — VLAN 1 par défaut sans priorité]
# Données : 81000001
A_COMPLETER

[Cas 3 — TPID invalide avec protocole non-standard]
# Données : 88a8201e
A_COMPLETER

[Cas 4 — Contrôle réseau haute priorité PCP 7]
# Données : 8100e064
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
8100a00a
~~~

**Indices visibles**

- Les deux premiers octets (4 caractères hex) correspondent au TPID.
- Les 4 caractères suivants correspondent au TCI sur 16 bits : PCP = (TCI >> 13) & 7, DEI = (TCI >> 12) & 1, VID = TCI & 0x0FFF.

## sup3-c1-e2 — Matrice de Criticité & Priorisation d’Incidents de Supervision

Cours : Supervision (`b3-supervision`), chapitre 1.
Source : `server/exercises/b3-supervision.js`.

**Objectif :** Qualifier et classifier le niveau de gravité d'une alerte selon la couche réseau/système, le nombre d'utilisateurs et la redondance.

**Consigne**

Pour prioriser l'action des équipes d'exploitation sans provoquer de fatigue d'alerte, chaque événement doit être qualifié :

Règles de classification :

1. P1-CRITICAL : Si (USERS >= 100 ET REDUNDANT=NO) OU (LAYER=database ET USERS >= 50).

2. P2-HIGH : Sinon, si USERS >= 50 OU (REDUNDANT=NO ET LAYER in [network, server]).

3. P3-MEDIUM : Sinon, si USERS >= 10.

4. P4-LOW : Tous les autres cas.

Données du cas : INCIDENT SERVICE=<nom> LAYER=<network|server|database|application> USERS=<n> REDUNDANT=<YES|NO>.

Résultat d’analyse attendu : INCIDENT_PRIORITY: service=<nom> layer=<layer> users=<n> priority=<P1-CRITICAL|P2-HIGH|P3-MEDIUM|P4-LOW>.

**Données et grille visibles**

~~~text
# Grille d'analyse (sup3-c1-e2) — Matrice de Criticité & Priorisation d’Incidents de Supervision
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Base de données principale sans redondance 80 utilisateurs]
# Données : INCIDENT SERVICE=Postgres-Primary LAYER=database USERS=80 REDUNDANT=NO
A_COMPLETER

[Cas 2 — Serveur DHCP sans redondance avec 5 utilisateurs]
# Données : INCIDENT SERVICE=DHCP-Primary LAYER=server USERS=5 REDUNDANT=NO
A_COMPLETER

[Cas 3 — Serveur Web Nginx redondant avec 30 utilisateurs]
# Données : INCIDENT SERVICE=Nginx-Web-Front LAYER=application USERS=30 REDUNDANT=YES
A_COMPLETER

[Cas 4 — Service NTP interne redondant avec 0 utilisateur direct]
# Données : INCIDENT SERVICE=NTP-Internal LAYER=server USERS=0 REDUNDANT=YES
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
INCIDENT SERVICE=Switch-Core-01 LAYER=network USERS=250 REDUNDANT=NO
~~~

**Indices visibles**

- Extrayez les paramètres clé=valeur de chaque ligne INCIDENT.
- Vérifiez les conditions dans l'ordre de priorité décroissant (P1 puis P2 puis P3 puis P4).

## ig2-c1-e3 — Classificateur de formats d’image selon le cas d’usage

Cours : Infographie (`infographie`), chapitre 1.
Source : `server/exercises/infographie.js`.

**Objectif :** Sélectionner le format d’image optimal (SVG, PNG, JPEG, WebP) selon les contraintes de transparence, nature graphique et poids.

**Consigne**

Analysez les données fournies pour chaque cas.

Règles de recommandation industrielle :

- Si NATURE=VECTORIEL ou COMPLEXITE=ICONE : FORMAT: SVG | JUSTIFICATION: Vectoriel resolution-independante et taille plume pour logos et icones.

- Sinon (Raster) :

* Si TRANSPARENCE=OUI et COMPLEXITE=ILLUSTRATION : FORMAT: PNG | JUSTIFICATION: Compression sans perte avec canal alpha transparent.

* Si TRANSPARENCE=NON et COMPLEXITE=PHOTO : FORMAT: JPEG | JUSTIFICATION: Compression avec perte optimale pour degrades photographiques.

* Pour tout autre cas web moderne : FORMAT: WebP | JUSTIFICATION: Format polyvalent moderne combinant transparence alpha et haute compression.

Afficher :

ASSET: <entree> -> <FORMAT> | <JUSTIFICATION>

**Données et grille visibles**

~~~text
# Grille d'analyse (ig2-c1-e3) — Classificateur de formats d’image selon le cas d’usage
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Photo avec transparence (fond détouré)]
# Données : NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=PHOTO
A_COMPLETER

[Cas 2 — Logo vectoriel simple sans transparence]
# Données : NATURE=VECTORIEL TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION
A_COMPLETER

[Cas 3 — Illustration sans transparence]
# Données : NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=ILLUSTRATION
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
NATURE=VECTORIEL TRANSPARENCE=OUI COMPLEXITE=ICONE
NATURE=RASTER TRANSPARENCE=NON COMPLEXITE=PHOTO
NATURE=RASTER TRANSPARENCE=OUI COMPLEXITE=ILLUSTRATION
~~~

**Indices visibles**

- SVG est le standard universel pour les tracés vectoriels et icônes.
- PNG préserve la transparence sans artefacts.
- JPEG compresse efficacement les photos riches sans canal alpha.

## bu-c6-e2 — Composer le diaporama

Cours : Bureautique (`b1-bureautique`), chapitre 6.
Source : `server/exercises/b1-bureautique.js`.

**Objectif :** Valider la construction d'une présentation : chaque diapositive a un rôle et une place.

**Consigne**

Pour chaque situation proposée : type est un code parmi titre, contenu, graphique ou conclusion. Présentation conforme : la diapositive 1 est un titre, la dernière une conclusion, les autres un contenu ou un graphique. Pour chaque diapositive Indiquez diapo : conforme ou diapo : a revoir ; Concluez par presentation : conforme si TOUTES les diapositives sont conformes, presentation : a revoir dès qu'une seule faute.

**Données et grille visibles**

~~~text
# Grille d'analyse (bu-c6-e2) — Composer le diaporama
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Titre mal placé]
# Données : d1 contenu
# Données : d2 contenu
# Données : d3 conclusion
A_COMPLETER

[Cas 2 — Avec graphique]
# Données : d1 titre
# Données : d2 graphique
# Données : d3 contenu
# Données : d4 conclusion
A_COMPLETER

[Cas 3 — Fin manquante]
# Données : d1 titre
# Données : d2 contenu
# Données : d3 contenu
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
3
d1 titre
d2 contenu
d3 conclusion
~~~

**Indices visibles**

- Le numéro de la diapositive est le compteur i : 1 = titre, n = conclusion, entre les deux contenu ou graphique.
- Une seule diapositive fautive invalide toute la présentation.

## gcp3-c6-e1 — Interpréteur de Filtres Cloud Logging et Détection d'Incidents

Cours : Google Cloud Platform (`b3-google-cloud`), chapitre 6.
Source : `server/exercises/b3-google-cloud.js`.

**Objectif :** Filtrer des flux d'événements Google Cloud Logging selon le type de ressource et le niveau de sévérité.

**Consigne**

Google Cloud Logging structure les événements avec un type de ressource et un niveau de gravité :

Hiérarchie des sévérités :

DEBUG (0) < INFO (1) < NOTICE (2) < WARNING (3) < ERROR (4) < CRITICAL (5).

Format d'un log : resource_type:severity:message (ex: gce_instance:ERROR:Disk quota exceeded).

Paramètres soumis à l’analyse :

LOG_QUERY target_resource=<res> min_severity=<sev> logs=<log1;log2;...>.

Résultat d’analyse attendu :

LOG_RESULTS: resource=<res> min_sev=<sev> total=<T> matched=<M> critical_count=<C>.

**Données et grille visibles**

~~~text
# Grille d'analyse (gcp3-c6-e1) — Interpréteur de Filtres Cloud Logging et Détection d'Incidents
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Filtrage ne retenant aucun log correspondant]
# Données : LOG_QUERY target_resource=cloud_run min_severity=ERROR logs=gce_instance:ERROR:Crash;cloud_run:INFO:Deploy success
A_COMPLETER

[Cas 2 — Tous les logs correspondent pour sévérité minimale DEBUG]
# Données : LOG_QUERY target_resource=gke_cluster min_severity=DEBUG logs=gke_cluster:DEBUG:Pod init;gke_cluster:INFO:Pod scheduled;gke_cluster:CRITICAL:Node down
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
LOG_QUERY target_resource=gce_instance min_severity=WARNING logs=gce_instance:INFO:Boot ok;gce_instance:ERROR:Disk full;cloud_run:ERROR:Timeout;gce_instance:CRITICAL:Kernel panic
~~~

**Indices visibles**

- Créez un dictionnaire associant chaque sévérité à son niveau numérique (DEBUG=0 ... CRITICAL=5).
- Un log correspond si log_resource == target_resource et log_sev_level >= min_sev_level.

## aws3-c3-e3 — Simulateur d'Auto Scaling Group & Répartition Équilibrée Multi-AZ

Cours : Services Cloud AWS (`b3-cloud-aws`), chapitre 3.
Source : `server/exercises/b3-cloud-aws.js`.

**Objectif :** Simuler l'algorithme de répartition équilibrée d'un Auto Scaling Group lors d'un événement de mise à l'échelle (Scale Out ou Scale In).

**Consigne**

Un Auto Scaling Group (ASG) garantit que les instances sont toujours réparties le plus équitablement possible entre les Availability Zones (AZs) configurées :

Algorithme de répartition :

1. Scale Out (Ajout d'instances) :

À chaque nouvelle instance à ajouter, l'ASG sélectionne la zone qui possède actuellement le moins d'instances. En cas d'égalité, il choisit la première zone par ordre alphabétique.

2. Scale In (Suppression d'instances) :

À chaque instance à supprimer, l'ASG sélectionne la zone qui possède le plus d'instances. En cas d'égalité, il choisit la première zone par ordre alphabétique.

3. Bornes Min/Max : La capacité cible (Desired) ne peut pas descendre sous MIN ni dépasser MAX (tronquer si nécessaire).

Données du cas :

ASG_DISTRIB ZONES=<az1:count,az2:count,...> TARGET=<n> MIN=<min> MAX=<max>.

Résultat d’analyse attendu :

ASG_PLAN: target=<t> current=<c> delta=<+n|-n|0> final_distribution=<az1:count,az2:count,...>.

**Données et grille visibles**

~~~text
# Grille d'analyse (aws3-c3-e3) — Simulateur d'Auto Scaling Group & Répartition Équilibrée Multi-AZ
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Scale Out de 2 à 5 instances sur 3 zones déséquilibrées]
# Données : ASG_DISTRIB ZONES=us-east-1a:1,us-east-1b:0,us-east-1c:1 TARGET=5 MIN=1 MAX=8
A_COMPLETER

[Cas 2 — Scale In de 7 à 3 instances]
# Données : ASG_DISTRIB ZONES=eu-central-1a:3,eu-central-1b:2,eu-central-1c:2 TARGET=3 MIN=2 MAX=10
A_COMPLETER

[Cas 3 — Target plafonné par MAX]
# Données : ASG_DISTRIB ZONES=ap-southeast-1a:2,ap-southeast-1b:2 TARGET=12 MIN=2 MAX=6
A_COMPLETER

[Cas 4 — Capacité déjà atteinte (delta = 0)]
# Données : ASG_DISTRIB ZONES=eu-west-1a:2,eu-west-1b:2 TARGET=4 MIN=2 MAX=6
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
ASG_DISTRIB ZONES=eu-west-3a:1,eu-west-3b:1,eu-west-3c:1 TARGET=6 MIN=2 MAX=10
~~~

**Indices visibles**

- Analysez scrupuleusement le format d'entrée les données d’entrée.
- Respectez la casse et les séparateurs attendus en sortie.

## pb2-c6-e3 — Théorème central limite

Cours : Probabilités (`probabilites`), chapitre 6.
Source : `server/exercises/probabilites.js`.

**Objectif :** Approximer P(S ≤ x) par la loi normale après standardisation.

**Consigne**

Dans cette étude, on considère quatre nombres, un par ligne : l’effectif n, la moyenne mu de chaque variable, son écart-type sigma, puis un seuil x. La somme S des n variables a pour moyenne n·mu et pour écart-type sigma·√n. Indiquez d’abord l’écart réduit z = (x − n·mu)/(sigma·√n) sur la ligne z = …, puis l’approximation Φ(z) sur la ligne P = …, chacune à 4 décimales.

**Données et grille visibles**

~~~text
# Grille de calcul (pb2-c6-e3) — Théorème central limite
# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :

[Cas 1 — Trente-six variables]
# Données : 36
# Données : 10
# Données : 2
# Données : 372
A_COMPLETER

[Cas 2 — Vingt-cinq variables]
# Données : 25
# Données : 4
# Données : 1
# Données : 95
A_COMPLETER

[Cas 3 — Soixante-quatre variables]
# Données : 64
# Données : 1
# Données : 2
# Données : 64
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
100
0.5
1
55
~~~

**Indices visibles**

- La somme a pour moyenne n * mu et pour écart-type sigma * sqrt(n).
- Calculez z = (x - n * mu) / (sigma * sqrt(n)), puis Φ(z) = 0.5 * (1 + erf(z / sqrt(2))).

## cs2-c1-e2 — Classification d’incidents selon la triade CIA

Cours : Cybersecurite B2 (`Cyber securite B2`), chapitre 1.
Source : `server/exercises/cyber-securite-b2.js`.

**Objectif :** Classification d’incidents selon la triade CIA

**Consigne**

La triade CIA comprend la Confidentialite, l’Integrite et la Disponibilite. Pour chaque code d’incident, identifiez le principe majeur compromis et sa conséquence.
Choisissez la conséquence parmi : Fuite de donnees, Chiffrement malveillant des fichiers, Saturation de la bande passante, Modification frauduleuse d enregistrements, Usurpation de session utilisateur et Remplacement non autorise du contenu. Répondez Principe: <principe> | Impact: <consequence>. Si le code ne décrit aucun incident connu, répondez INCIDENT INCONNU.

**Données et grille visibles**

~~~text
# Grille d'analyse (cs2-c1-e2) — Classification d’incidents selon la triade CIA
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Test de validation 1]
# Données : RANSOMWARE
A_COMPLETER

[Cas 2 — Test de validation 2]
# Données : DDOS
A_COMPLETER

[Cas 3 — Test de validation 3]
# Données : ALTERATION_BASE
A_COMPLETER

[Cas 4 — Test de validation 4]
# Données : AUTRE_CHOSE
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
DIVULGATION
~~~

**Indices visibles**

- Identifiez quel pilier (Confidentialité, Intégrité ou Disponibilité) est directement compromis par l’incident.
- Associez la conséquence opérationnelle exacte : fuite de données, chiffrement malveillant ou altération.

## cy-c4-e3 — ACL du serveur de fichiers

Cours : Cybersécurité (`b1-cyber`), chapitre 4.
Source : `server/exercises/b1-cyber.js`.

**Objectif :** Simuler une liste de contrôle d’accès : ajouter, retirer, refuser le retrait d’une entrée absente.

**Consigne**

Le script gère une ACL vide au départ et lit n lignes « action fichier » : add fichier l’ajoute et Indiquez add fichier : ok ; remove fichier la retire si présente (remove fichier : ok) ou échoue (remove fichier : introuvable). Enfin bilan : K éléments avec K le nombre d’entrées distinctes restantes — ajouter deux fois le même fichier ne le compte qu’une fois, et un add sur un nom présent est refusé.

**Données et grille visibles**

~~~text
# Grille d'analyse (cy-c4-e3) — ACL du serveur de fichiers
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Ajout puis retrait]
# Données : 2
# Données : add rapports
# Données : remove rapports
A_COMPLETER

[Cas 2 — Retrait à vide, double ajout]
# Données : 3
# Données : remove archivage
# Données : add factures
# Données : add factures
A_COMPLETER

[Cas 3 — Quatre opérations]
# Données : 4
# Données : add notes.txt
# Données : add notes.txt
# Données : remove notes.txt
# Données : add paie
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
6
add rapports
add photo_a.png
add rapports
remove photo_a.png
add photo_a.png
remove factures
~~~

**Indices visibles**

- Vérifiez la présence du fichier dans la liste des ressources sensibles avant de modifier les permissions.
- Mettez à jour le journal d’audit de sécurité pour consigner l’opération de retrait.

## pr-c6-e2 — Export CSV

Cours : Projet (`b1-projet`), chapitre 6.
Source : `server/exercises/b1-projet.js`.

**Objectif :** Produire une ligne CSV valide par produit, comme l'amélioration 3 du tutoriel.

**Consigne**

Analysez chaque ligne proposée « produit categorie quantite prix » et écrit une ligne CSV par produit au format produit;categorie;quantite;prix ; la première ligne de l'export est l'en-tête nom;categorie;quantite;prix. Après les lignes,, indiquez le bilan lignes exportees : n. (Le séparateur du tutoriel est le point-virgule.)

**Données et grille visibles**

~~~text
# Grille d'analyse (pr-c6-e2) — Export CSV
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Catalogue complet]
# Données : 3
# Données : ecran Affichage 3 45000
# Données : usb Stock 40 1500
# Données : hub Stock 8 7500
A_COMPLETER

[Cas 2 — Fichier deja exporte]
# Données : 2
# Données : a Stock 5 100
# Données : b Bureau 3 200
A_COMPLETER

[Cas 3 — Un seul produit]
# Données : 1
# Données : imprimante Bureau 2 85000
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
2
clavier Periph 10 5000
souris Periph 30 2500
~~~

**Indices visibles**

- La ligne : `"$produit;$categorie;$quantite;$prix"`.
- Le bilan sort une seule fois, après la boucle.

## ws3-c6-e2 — Calculateur de quorum de cluster de basculement (Failover Clustering)

Cours : Windows Server (`b3-windows-server`), chapitre 6.
Source : `server/exercises/b3-windows-server.js`.

**Objectif :** Calculer la majorité absolue des voix et vérifier le maintien du quorum dans un cluster Windows Server en cas de panne de nœuds.

**Consigne**

Dans un cluster de basculement (WSFC - Windows Server Failover Clustering), le modèle de Quorum garantit la cohérence du cluster :
- `NODE id= vote=<0|1> status=` : chaque nœud ayant `vote=1` détient 1 voix.
- `WITNESS type= status=` : si `type != NONE`, le témoin apporte 1 voix de départage.

Règles de Quorum officielles Microsoft :
1. Total des voix configurées : `total_votes = sum(votes des nœuds) + (1 si witness != NONE sinon 0)`.
2. Majorité absolue requise : `required_majority = (total_votes // 2) + 1`.
3. Voix actives : `active_votes = sum(voix des nœuds avec vote=1 et status=ONLINE) + (1 si witness != NONE et status=ONLINE sinon 0)`.
4. État du cluster : si `active_votes >= required_majority` -> `QUORUM_OK` ; sinon -> `PERTE_QUORUM`.

Entrée :
`NODE id= vote=<0|1> status=` (1 ou plusieurs)
`WITNESS type= status=`

Résultat d’analyse attendu :
- Ligne d’analyse du quorum :
`QUORUM_ANALYSIS total_votes= required_majority= active_votes= cluster_status=`
- Bilan de disponibilité :
`SUMMARY nodes_online= nodes_offline= witness_status=`

**Données et grille visibles**

~~~text
# Grille d'analyse (ws3-c6-e2) — Calculateur de quorum de cluster de basculement (Failover Clustering)
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Perte de quorum suite à double panne de nœuds sans témoin]
# Données : NODE id=S1 vote=1 status=ONLINE
# Données : NODE id=S2 vote=1 status=OFFLINE
# Données : NODE id=S3 vote=1 status=OFFLINE
# Données : WITNESS type=NONE status=OFFLINE
A_COMPLETER

[Cas 2 — Cluster binaire avec témoin maintenant le quorum]
# Données : NODE id=N1 vote=1 status=ONLINE
# Données : NODE id=N2 vote=1 status=OFFLINE
# Données : WITNESS type=DISK status=ONLINE
A_COMPLETER

[Cas 3 — Cluster avec un nœud sans droit de vote (vote=0)]
# Données : NODE id=N1 vote=1 status=ONLINE
# Données : NODE id=N2 vote=0 status=ONLINE
# Données : NODE id=N3 vote=1 status=ONLINE
# Données : WITNESS type=FILE_SHARE status=ONLINE
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
NODE id=NODE-01 vote=1 status=ONLINE
NODE id=NODE-02 vote=1 status=ONLINE
NODE id=NODE-03 vote=1 status=OFFLINE
WITNESS type=CLOUD status=ONLINE
~~~

**Indices visibles**

- Compter les voix configurées (nœuds avec vote=1 + 1 si witness présent).
- Calculer la majorité avec total_votes // 2 + 1.
- Additionner les voix en ligne et comparer au seuil de majorité.

## ar-c3-e1 — Complement a un

Cours : Circuit logique & architecture des ordinateurs (`b1-architecture`), chapitre 3.
Source : `server/exercises/b1-architecture.js`.

**Objectif :** Inverser tous les bits d'un mot binaire pour obtenir son complément à 1.

**Consigne**

Analysez chaque ligne proposée contenant chacune un binaire de 4 bits. Pour chaque ligne il calcule le complément à 1 — chaque bit 0 devient 1 et chaque bit 1 devient 0, première représentation des nombres signés vue en cours — et Indiquez binaire : c1=XXXX, puis le bilan complements : n.

**Données et grille visibles**

~~~text
# Grille d'analyse (ar-c3-e1) — Complement a un
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Inversion double]
# Données : 4
# Données : 1111
# Données : 1001
# Données : 0011
# Données : 0101
A_COMPLETER

[Cas 2 — Bords opposes]
# Données : 3
# Données : 0001
# Données : 1110
# Données : 0111
A_COMPLETER

[Cas 3 — Poids fort a un]
# Données : 2
# Données : 1000
# Données : 1101
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
3
0110
0000
1010
~~~

**Indices visibles**

- La commande tr '01' '10' inverse tous les bits d'un mot.
- Passez par une variable : `c1=$(printf '%s' "$binaire" | tr ...)`.

## erp2-c2-e3 — Machine à états de commande (BPMN)

Cours : ERP & SI (`erp-si`), chapitre 2.
Source : `server/exercises/erp-si.js`.

**Objectif :** Valider le respect des transitions du cycle de vie d’une commande dans l’ERP.

**Consigne**

Dans un processus modélisé (BPMN), les commandes traversent des états successifs selon un cycle strict :

BROUILLON → peut passer à VALIDE ou ANNULE

VALIDE → peut passer à EN_PREPARATION ou ANNULE

EN_PREPARATION → peut passer à EXPEDIE

EXPEDIE → peut passer à LIVRE ou RETOURNE

LIVRE, ANNULE, RETOURNE → états finaux (aucune transition autorisée).

Analyse deux lignes fournies dans les données du cas (l’état actuel puis l’état demandé, en majuscules).
- Si la transition est autorisée : affiche Transition autorisee: <actuel> -> <cible>.
- Sinon : affiche Transition interdite: de <actuel> vers <cible>.

**Données et grille visibles**

~~~text
# Grille d'analyse (erp2-c2-e3) — Machine à états de commande (BPMN)
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Saut d’étape interdit]
# Données : BROUILLON
# Données : EXPEDIE
A_COMPLETER

[Cas 2 — Annulation en cours de préparation]
# Données : VALIDE
# Données : ANNULE
A_COMPLETER

[Cas 3 — Modification d’une commande déjà livrée]
# Données : LIVRE
# Données : EN_PREPARATION
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
BROUILLON
VALIDE
~~~

**Indices visibles**

- Définissez un dictionnaire associant chaque état de départ à un ensemble (set) d’états cibles autorisés.
- Exemple : transitions = {"BROUILLON": {"VALIDE", "ANNULE"}, ...}.

## al-c6-e2 — Valeurs propres d’une matrice 2 × 2

Cours : Algèbre linéaire (`b1-algebre`), chapitre 6.
Source : `server/exercises/b1-algebre.js`.

**Objectif :** Résoudre le polynôme caractéristique λ² − s·λ + p = 0.

**Consigne**

Dans cette étude, on considère deux lignes de deux entiers (une matrice 2 × 2). Affichez ses valeurs propres réelles, la plus petite puis la plus grande, chacune arrondie à deux décimales. S’il n’y a pas de valeur propre réelle, Indiquez pas de valeur propre reelle.

**Données et grille visibles**

~~~text
# Grille de calcul (al-c6-e2) — Valeurs propres d’une matrice 2 × 2
# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :

[Cas 1 — Matrice symétrique]
# Données : 2 1
# Données : 1 2
A_COMPLETER

[Cas 2 — Matrice diagonale]
# Données : 3 0
# Données : 0 -1
A_COMPLETER

[Cas 3 — Rotation : discriminant négatif]
# Données : 0 1
# Données : -1 0
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
4 1
2 3
~~~

**Indices visibles**

- Le polynôme caractéristique s’écrit λ² − s·λ + p = 0, où s est la trace et p le déterminant.
- Le discriminant Δ = s² − 4p décide : négatif, pas de racine réelle ; sinon les racines sont (s ± √Δ)/2.

## an3-c3-e3 — Générateur d’alerte d’escalade d’incident pour le management

Cours : Anglais (`b3-anglais`), chapitre 3.
Source : `server/exercises/b3-anglais.js`.

**Objectif :** Générer un communiqué d’escalade d’incident critique (Executive Incident Broadcast) formaté en anglais pour les parties prenantes.

**Consigne**

Lors d'une panne majeure en production, l'équipe d'astreinte (SRE / Incident Commander) doit publier un bulletin d'incident synthétique et standardisé à destination des directeurs et partenaires internationaux.

Pour chaque cas d’application une ligne au format :

INCIDENT_DATA id=<id> service=<srv> impact_pct=<pct> downtime_min=<min> eta_min=<eta> workaround=<yes|no>.

Règles de génération :

- Objet (SUBJECT) : [INCIDENT <id>] SEV-1 Outage: <service> (<impact_pct>% users affected)

- Statut (STATUS) :

* Si eta_min == 0 : RESOLVED_MONITORING

* Si eta_min <= 30 : ACTIVE_MITIGATION_IN_PROGRESS

* Si eta_min > 30 : CRITICAL_EXECUTIVE_ESCALATION

- Impact (IMPACT) : <service> degraded for <downtime_min> minutes

- ETA Résolution (ETA_RESOLUTION) : <eta_min> minutes (ou Immediate / Stable si eta_min vaut 0)

- Contournement (WORKAROUND) :

* Si workaround=yes : Available - traffic redirected to secondary region

* Si workaround=no : None available - full engineering mobilization

Format attendu :

--- INCIDENT BROADCAST ---

SUBJECT: ...

STATUS: ...

IMPACT: ...

ETA_RESOLUTION: ...

WORKAROUND: ...

--- END BROADCAST ---

**Données et grille visibles**

~~~text
# Grille d'analyse (an3-c3-e3) — Générateur d’alerte d’escalade d’incident pour le management
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Incident résolu avec ETA à 0]
# Données : INCIDENT_DATA id=INC-7010 service=AuthGateway impact_pct=10 downtime_min=15 eta_min=0 workaround=no
A_COMPLETER

[Cas 2 — Escalade critique sans contournement avec ETA supérieure à 30 min]
# Données : INCIDENT_DATA id=INC-9999 service=PostgresMaster impact_pct=100 downtime_min=65 eta_min=45 workaround=no
A_COMPLETER

[Cas 3 — Deux incidents consécutifs]
# Données : INCIDENT_DATA id=INC-1100 service=SearchEngine impact_pct=40 downtime_min=25 eta_min=15 workaround=yes
# Données : INCIDENT_DATA id=INC-1101 service=BillingEngine impact_pct=95 downtime_min=50 eta_min=60 workaround=no
A_COMPLETER

[Cas 4 — ETA limite exacte à 30 minutes]
# Données : INCIDENT_DATA id=INC-3300 service=QueueBroker impact_pct=50 downtime_min=30 eta_min=30 workaround=yes
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
INCIDENT_DATA id=INC-8902 service=CheckoutAPI impact_pct=85 downtime_min=42 eta_min=20 workaround=yes
~~~

**Indices visibles**

- Extraire les paramètres via des regex : r"(\w+)=([^\s]+)".
- Convertir les valeurs numériques d'impact, downtime et eta en entiers.

## ux2-c5-e3 — Analyseur de zone du pouce mobile (Thumb Zone)

Cours : UI/UX Design (`uiux`), chapitre 5.
Source : `server/exercises/uiux.js`.

**Objectif :** Évaluer la facilité d’accès à une main d’une action interactive sur un écran mobile 390x844 px selon Steven Hoober.

**Consigne**

Pour chaque cas d’application des lignes au format <NomAction> <X> <Y>.

Sur un écran mobile de référence de 390px de large et 844px de haut :

- ZONE_NATURELLE (Confort maximal) : Y compris entre 450 et 750 ET X compris entre 40 et 350.

- ZONE_DIFFICILE (Inaccessible à une main) : Y < 250.

- ZONE_ETIREE (Effort modéré) : tous les autres cas situés dans l'écran.

Pour chaque ligne, afficher :

<NomAction> (<X>, <Y>) -> <ZONE_NATURELLE | ZONE_ETIREE | ZONE_DIFFICILE>

**Données et grille visibles**

~~~text
# Grille d'analyse (ux2-c5-e3) — Analyseur de zone du pouce mobile (Thumb Zone)
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Actions de barre inférieure de navigation (Tab Bar)]
# Données : TabAccueil 100 700
# Données : TabProfil 300 720
A_COMPLETER

[Cas 2 — En-têtes et boutons de navigation supérieure]
# Données : BoutonRetour 20 80
# Données : TitrePage 195 100
# Données : BoutonFiltre 350 150
A_COMPLETER

[Cas 3 — Bordures extrêmes et zone étirée]
# Données : BoutonFlottant 20 600
# Données : ActionBasse 195 800
# Données : ActionMilieu 195 380
A_COMPLETER

[Cas 4 — Limites exactes]
# Données : PointA 40 450
# Données : PointB 350 750
# Données : PointHaut 195 249
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
BoutonValiderPanier 195 600
MenuBurger 30 60
ChampNom 200 350
~~~

**Indices visibles**

- Tester d'abord la ZONE_DIFFICILE (Y < 250).
- Tester ensuite la ZONE_NATURELLE (450 <= Y <= 750 et 40 <= X <= 350).

## cr3-c1-e2 — Chiffre Polyalphabétique de Vigenère et Masque Jetable (OTP)

Cours : Cryptographie & PKI (`b3-cryptographie`), chapitre 1.
Source : `server/exercises/b3-cryptographie.js`.

**Objectif :** Réaliser le chiffrement et le déchiffrement polyalphabétique de Vigenère et valider les propriétés de sécurité d'un masque jetable (One-Time Pad).

**Consigne**

Le chiffre de Vigenère utilise une clé alphabétique répétée pour masquer les fréquences de lettres. Le masque jetable (Vernam / OTP) offre une confidentialité théorique parfaite si et seulement si la clé est purement aléatoire, au moins aussi longue que le message, et jamais réutilisée.

Opérations soumises à l’analyse :

1. VIGENERE ENC key=<cle> text=<texte> : chiffre le texte.

2. VIGENERE DEC key=<cle> text=<texte> : déchiffre le texte.

3. OTP VERIFY key_len=<k> text_len=<t> reuse=<true|false> :

- Si key_len < text_len : OTP: INVALID (key shorter than message)

- Sinon si reuse == true : OTP: INVALID (key reused, vulnerable to two-time pad attack)

- Sinon : OTP: VALID (perfect secrecy achieved)

Pour les opérations VIGENERE : OUT: <texte_resultat>.

**Données et grille visibles**

~~~text
# Grille d'analyse (cr3-c1-e2) — Chiffre Polyalphabétique de Vigenère et Masque Jetable (OTP)
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Déchiffrement de Vigenère]
# Données : VIGENERE DEC key=SECRET text=EIUJEZW GQEJBVIPKMXD
A_COMPLETER

[Cas 2 — Validation OTP conforme]
# Données : OTP VERIFY key_len=64 text_len=64 reuse=false
A_COMPLETER

[Cas 3 — Clé OTP trop courte]
# Données : OTP VERIFY key_len=32 text_len=64 reuse=false
A_COMPLETER

[Cas 4 — Réutilisation de clé OTP interdite]
# Données : OTP VERIFY key_len=128 text_len=64 reuse=true
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
VIGENERE ENC key=SECRET text=MESSAGE CONFIDENTIEL
~~~

**Indices visibles**

- Maintenez un index ki incrémenté uniquement lorsque le caractère courant est une lettre alphabétique.
- Pour OTP, vérifiez d abord si key_len < text_len, puis si reuse est true, sinon déclarez valide.

## ro2-c5-e1 — Méthode du Coin Nord-Ouest (Transport)

Cours : Recherche Opérationnelle (`RD-RO`), chapitre 5.
Source : `server/exercises/RD-RO.js`.

**Objectif :** Construire une solution de base réalisable initiale par la règle du coin Nord-Ouest.

**Consigne**

Dans un problème de transport équilibré (somme des offres = somme des demandes), la règle du Coin Nord-Ouest commence en haut à gauche $(i=0, j=0)$ :
Alloue $x_{ij} = \min(offre_i, demande_j)$ ;
Soustrait cette quantité de $offre_i$ et $demande_j$ ;
Si $offre_i = 0$, avance vers le bas ($i \leftarrow i + 1$) ; si $demande_j = 0$, avance vers la droite ($j \leftarrow j + 1$).
Analysez les paramètres du problème pour chaque cas...;d1,d2,...;cout11,cout12,...|cout21,cout22,...|....
Calculez les flux non nuls alloués et le coût total de transport $C = \sum x_{ij} \times c_{ij}$.
Indiquez :
FLUX: (i,j)=qte,... COUT_TOTAL=<C à 1 décimale>
(les indices $i, j$ sont 1-indexés).

**Données et grille visibles**

~~~text
# Grille de calcul (ro2-c5-e1) — Méthode du Coin Nord-Ouest (Transport)
# Complétez la résolution mathématique demandée sous chaque cas ci-dessous :

[Cas 1 — Deux origines deux destinations]
# Données : 25,25;30,20;2,4|3,5
A_COMPLETER

[Cas 2 — Trois origines deux destinations]
# Données : 10,20,30;25,35;4,6|2,5|3,1
A_COMPLETER

[Cas 3 — Matrice 2x2 avec égalité parfaite sur la première case]
# Données : 20,30;20,30;5,8|4,2
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
30,40;20,30,20;3,5,7|2,4,6
~~~

**Indices visibles**

- La méthode du coin Nord-Ouest initialise la matrice de transport en saturant d’abord la case (1, 1).
- À chaque étape, allouez min(offre restante, demande restante) et déplacez-vous vers la droite ou vers le bas selon la saturation.

## fr-c5-e2 — Appel et politesse

Cours : Français professionnel (`b1-fr-pro`), chapitre 5.
Source : `server/exercises/b1-fr-pro.js`.

**Objectif :** Valider les formules : « Madame, Monsieur, » pour l'appel, « Cordialement, » pour le courriel — jamais « Bonjour Madame ».

**Consigne**

Pour chaque situation proposée : formule vaut madame, monsieur, madamemonsieur, madamedirectrice (appels), cordialement, bienavous, sinceres, salutations (politesse), ou autre chose ; type vaut appel ou politesse. Pour chaque situation, indiquez formule : valide si la formule appartient au type annoncé, formule : inadaptee si elle appartient à l'autre type, formule : inconnue sinon (par exemple « Bonjour Madame »). Concluez par valides : X/n.

**Données et grille visibles**

~~~text
# Grille d'analyse (fr-c5-e2) — Appel et politesse
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Appel collectif]
# Données : madamemonsieur appel
A_COMPLETER

[Cas 2 — Politesse bien placee]
# Données : cordialement politesse
# Données : sinceres politesse
A_COMPLETER

[Cas 3 — Cinq formules]
# Données : monsieur appel
# Données : madame appel
# Données : salutations appel
# Données : bienavous politesse
# Données : chere appel
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
4
madame appel
salutations politesse
cordialement appel
bonjour appel
~~~

**Indices visibles**

- Un case sur la formule détermine sa famille réelle : appel, politesse ou inconnue.
- Famille égale au type annoncé : valide ; famille différente : inadaptee ; famille inconnue : inconnue.

## dr2-c2-e2 — Les données sensibles

Cours : Droit Informatique (`droit`), chapitre 2.
Source : `server/exercises/droit.js`.

**Objectif :** Repérer les données à caractère sensible et les distinguer des données ordinaires.

**Consigne**

Pour chaque situation proposée : ori (origine raciale ou ethnique), opi (opinions religieuses, philosophiques, politiques, syndicales), san (santé ou vie sexuelle), msr (mesures sociales, poursuites, sanctions) ou ord (donnée ordinaire). Pour chaque situation, indiquez libelle : sensible ou libelle : ordinaire. Enfin sensibles : X/n.

**Données et grille visibles**

~~~text
# Grille d'analyse (dr2-c2-e2) — Les données sensibles
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Une donnée de santé]
# Données : san dossier medical
A_COMPLETER

[Cas 2 — Aucune donnée sensible]
# Données : ord date de naissance
# Données : ord langue parlee
A_COMPLETER

[Cas 3 — Cinq données mixtes]
# Données : opi appartenance syndicale
# Données : msr sanction administrative
# Données : ord centre de loisirs
# Données : san vie sexuelle
# Données : ori appartenance ethnique
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
2
ori origine ethnique
ord adresse postale
~~~

**Indices visibles**

- ori, opi, san et msr désignent des données sensibles ; ord ne l'est pas.
- Un case avec les quatre codes sensibles, et un cas par défaut, suffit.

## rb-c5-e1 — Tables de vérité des cinq portes

Cours : Club de robotique (`b1-robotique`), chapitre 5.
Source : `server/exercises/b1-robotique.js`.

**Objectif :** Calculer AND, OR, NAND, NOR et XOR sur un couple de bits, sans bibliothèque.

**Consigne**

Analysez les données soumises pour chaque cas. Indiquez cinq lignes, une par porte : AND : x, OR : x, NAND : x, NOR : x, XOR : x. Les valeurs se calculent de manière méthodique : NAND = non(ET), NOR = non(OU), XOR vaut 1 exactement quand les bits diffèrent.

**Données et grille visibles**

~~~text
# Grille d'analyse (rb-c5-e1) — Tables de vérité des cinq portes
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Deux bits à 1]
# Données : 1 1
A_COMPLETER

[Cas 2 — Deux bits à 0]
# Données : 0 0
A_COMPLETER

[Cas 3 — Inverse du premier cas]
# Données : 0 1
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
1 0
~~~

**Indices visibles**

- de manière méthodique, et se note and, ou se note or, et non() se note not. Le résultat s’affiche en 0/1 : int(...).
- XOR se réduit à a != b : vrai exactement quand les deux bits diffèrent.

## ag3-c6-e2 — Validateur d’Organisation Matricielle Spotify (Squads, Tribes, Chapters)

Cours : Méthodes agiles (`b3-agile`), chapitre 6.
Source : `server/exercises/b3-agile.js`.

**Objectif :** Contrôler la cohérence de l’affectation des ingénieurs au sein du modèle agile d’entreprise (Spotify Model).

**Consigne**

Dans le modèle agile popularisé par Henrik Kniberg (Spotify Model) :

- Squad : Cellule autonome pluridisciplinaire (produit, dev, ops).

- Tribe : Regroupement de Squads travaillant sur le même domaine métier.

- Chapter : Ligne de compétence métier (ex: Chapitre QA, Chapitre Backend) transverse au sein d'une même Tribe.

- Guild : Communauté d'intérêt informelle libre à l'échelle de toute l'entreprise.

Pour chaque cas d’application des profils au format :

MEMBER_CHECK name=<nom> squad=<nom> tribe=<nom> chapter=<nom> guilds=<g1,g2|NONE>.

Règles de validation :

1. Chaque membre doit obligatoirement avoir une Squad non nulle (squad != 'NONE').

2. Chaque membre doit obligatoirement être rattaché à une Tribe (tribe != 'NONE').

3. Chaque membre doit avoir un Chapter de compétences (chapter != 'NONE').

Si valide : calculer le nombre de guildes rejointes (0 si guilds == 'NONE', sinon le nombre d'éléments séparés par virgule).

Afficher :

SPOTIFY_AUDIT name={name} status=VALID tribe={tribe} squad={squad} guild_count={count}

Si un élément structurel manque :

SPOTIFY_AUDIT name={name} status=INVALID missing={élément_manquant}

**Données et grille visibles**

~~~text
# Grille d'analyse (ag3-c6-e2) — Validateur d’Organisation Matricielle Spotify (Squads, Tribes, Chapters)
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Membre sans Squad affectée (orphelin)]
# Données : MEMBER_CHECK name=Bob squad=NONE tribe=MusicTribe chapter=Frontend guilds=NONE
A_COMPLETER

[Cas 2 — Membre sans Tribe]
# Données : MEMBER_CHECK name=Charlie squad=CheckoutSquad tribe=NONE chapter=QA guilds=Security
A_COMPLETER

[Cas 3 — Membre valide sans aucune guilde]
# Données : MEMBER_CHECK name=Diana squad=PlayerSquad tribe=MediaTribe chapter=Mobile guilds=NONE
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
MEMBER_CHECK name=Alice squad=SearchSquad tribe=MusicTribe chapter=Backend guilds=DevOps,CleanCode
~~~

**Indices visibles**

- Tester dans l’ordre : squad == "NONE", tribe == "NONE", chapter == "NONE".
- Si guilds != "NONE", compter les éléments séparés par virgule.

## eq3-c2-e2 — Échantillonnage stratifié proportionnel

Cours : Étude quantitative & qualitative (`b3-etude-quantitative`), chapitre 2.
Source : `server/exercises/b3-etude-quantitative.js`.

**Objectif :** Calculer la ventilation exacte des quotas de sondage par sous-population selon leur poids démographique réel.

**Consigne**

Pour chaque cas d’application :

STRATIFIE etude=<nom> n=<taille_echantillon> strates=<NOM1>:<N1>,<NOM2>:<N2>,....

Calculs :

- Calculer la population totale mère : $N = \sum N_i$.

- Pour chaque strate $i$ :

- Poids relatif : $W_i = N_i / N$.

- Effectif théorique à sonder : $n_i = \text{round}(n \times W_i)$.

- Pourcentage dans l'échantillon : $P_i = (n_i / n) \times 100$ (1 décimale).

Afficher :

STRATIFICATION: {etude} (N_TOTAL={N}, n_CIBLE={n})

Pour chaque strate dans l'ordre d'apparition :

- {NOM_i}: N_pop={N_i} (W={W_i*100:.1f}%) -> n_sonde={n_i} ({P_i:.1f}%)

**Données et grille visibles**

~~~text
# Grille d'analyse (eq3-c2-e2) — Échantillonnage stratifié proportionnel
# Complétez la réponse attendue sous chaque cas ci-dessous :

[Cas 1 — Échantillonnage universitaire sur 3 facultés]
# Données : STRATIFIE etude=CampusTech n=150 strates=INFO:600,RESEAUX:300,CYBER:100
A_COMPLETER

[Cas 2 — Échantillon médical avec effectifs variés]
# Données : STRATIFIE etude=PersonnelSante n=100 strates=MEDECINS:50,INFIRMIERS:350,AIDES:600
A_COMPLETER

[Cas 3 — Deux strates équilibrées]
# Données : STRATIFIE etude=PariteEquipe n=80 strates=FEMMES:250,HOMMES:250
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
STRATIFIE etude=SondageDSI n=200 strates=DEV:400,OPS:300,QA:200,DIR:100
~~~

**Indices visibles**

- Sommer tous les Ni pour obtenir la population mère totale N.
- Utiliser round() pour arrondir chaque effectif à sonder.

## pf3-c5-e2 — Validateur de proposition cryptographique IPsec (IKEv2 & ESP)

Cours : pfSense & Routage (`b3-pfsense`), chapitre 5.
Source : `server/exercises/b3-pfsense.js`.

**Objectif :** Auditer la conformité ANSSI/NIST des propositions IKEv2 Phase 1 et Phase 2 dans pfSense.

**Consigne**

Lors de l'établissement d'un tunnel VPN IPsec Site-à-Site, pfSense négocie les paramètres de chiffrement (IKE Phase 1 et ESP Phase 2). Les algorithmes obsolètes ou cassés (DES, 3DES, MD5, groupes Diffie-Hellman faibles) doivent impérativement être rejetés.

Analysez les paramètres du problème pour chaque cas. Si enc figure parmi DES, 3DES, RC4 :

status=REJECTED reason=INSECURE_CIPHER level=NONE.

2. Si hash figure parmi MD5, SHA1 :

status=REJECTED reason=WEAK_HASH level=NONE.

3. Si dh_group < 14 (groupes 1, 2, 5 modp obsolètes) :

status=REJECTED reason=WEAK_DH_GROUP level=NONE.

4. Si enc in ['AES-CBC', 'AES-GCM'] et key_len < 128 :

status=REJECTED reason=WEAK_KEY_LENGTH level=NONE.

5. Si tous les critères sont satisfaits :

status=APPROVED reason=NONE.

Le niveau de sécurité est évalué :

- Si dh_group >= 19 (courbes elliptiques NIST P-256 ou plus) et key_len >= 256 : level=HIGH.

- Sinon : level=STANDARD.

Pour chaque proposition, afficher :

IPSEC_AUDIT id={id} phase={phase} status={status} reason={reason} level={level}

**Données et grille visibles**

~~~text
# Grille d'analyse (pf3-c5-e2) — Validateur de proposition cryptographique IPsec (IKEv2 & ESP)
# Complétez la résolution demandée sous chaque cas ci-dessous :

[Cas 1 — Rejet du groupe DH 2 obsolète]
# Données : IKE_PROPOSAL id=WEAK_DH phase=1 enc=AES-CBC key_len=256 hash=SHA256 dh_group=2
A_COMPLETER

[Cas 2 — Rejet de clé AES trop courte (< 128)]
# Données : IKE_PROPOSAL id=SHORT_KEY phase=2 enc=AES-CBC key_len=64 hash=SHA256 dh_group=14
A_COMPLETER

[Cas 3 — Validation proposition Phase 2 moderne ChaCha20]
# Données : IKE_PROPOSAL id=CHACHA_MODERN phase=2 enc=CHACHA20-POLY1305 key_len=256 hash=SHA512 dh_group=20
A_COMPLETER
~~~

**Entrée de l’exemple visible**

~~~text
IKE_PROPOSAL id=PROP1 phase=1 enc=AES-GCM key_len=256 hash=SHA384 dh_group=19
IKE_PROPOSAL id=PROP2 phase=1 enc=3DES key_len=168 hash=SHA256 dh_group=14
IKE_PROPOSAL id=PROP3 phase=2 enc=AES-CBC key_len=128 hash=MD5 dh_group=14
IKE_PROPOSAL id=PROP4 phase=1 enc=AES-CBC key_len=128 hash=SHA256 dh_group=14
~~~

**Indices visibles**

- Rejeter en priorité les chiffrements cassés (DES, 3DES, RC4).
- Vérifier le groupe DH >= 14 (DH 14 = 2048-bit MODP).

