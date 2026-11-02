# Journal brut — contre-vérification S0 A

Commencé le 30 octobre 2026. Ce journal complète `lot2-contreverification-s0-a-independante.md` sans remplacer ses verdicts. Les observations sont ajoutées par groupes ; les échecs et limites ne sont pas masqués. Les scripts de contrôle sont distincts des tests existants.

Environnement des rejeux : Bubblewrap, espaces de noms isolés et sans réseau extérieur, fichiers du dépôt montés en lecture seule, répertoire temporaire privé ; Chromium et les interpréteurs s'exécutent dans cette isolation. Les consultations documentaires publiques sont distinguées des rejeux. Pas de commande Git, pas de `dist/` ni de déploiement.

## Groupe 1 — 30 octobre 2026

PostgreSQL 18.6 : cluster temporaire `initdb` en UTF-8, `listen_addresses=''`, socket Unix privé et arrêt en fin de contrôle. Commandes de base : `CREATE TEMP TABLE checked(price numeric CHECK(price > 0))`, insertion de `NULL`, `NaN`, `Infinity` ; seconde table avec `price numeric NOT NULL CHECK(price > 0 AND price < 'Infinity'::numeric)` et insertions indépendantes. Pour les chaînes : `CREATE TEMP TABLE word(value varchar(3))`, insertion de `ééé` puis de `éééé`. SQLite 3.53.4 utilise une base `:memory:` et les mêmes essais pertinents. Les résultats suivants sont les sorties effectives :

```text
F10 PG CHECK seul : NULL, Infinity, NaN
F10 PG contrainte stricte NULL : accepté=f
F10 PG contrainte stricte NaN : accepté=f
F10 PG contrainte stricte Infinity : accepté=f
F10 PG contrainte stricte zero : accepté=f
F10 PG contrainte stricte negative : accepté=f
F10 PG contrainte stricte 1.25 : accepté=t
F11 PG varchar(3) ééé : caractères=3, octets=6
F11 PG varchar(3) éééé : rejeté
F10 SQLite : CHECK accepte NULL ; NOT NULL le rejette
F11 SQLite varchar(3) éééé : accepté, caractères=4 octets=8
F08 série A,A,B,B,C : effectifs={'A': 2, 'B': 2, 'C': 1} ; modes=['A', 'B']
F09 H0 pièce équilibrée, 9 piles sur 10 : p unilatérale=11/1024 ; bilatérale=11/512
F08 clic réponse correcte : OK
F09 clic réponse correcte : OK ; carte retournée : OK
F10 clic réponse correcte : OK ; carte retournée : OK
F11 carte retournée : OK
```

Le premier sélecteur Chromium F11 cherchait littéralement « différence entre », absent de la question « différence y a-t-il entre » : `cartes=0`. Un second sélecteur ciblant `CHAR(10) et VARCHAR(10)` a effectivement trouvé et retourné la carte. Cet échec intermédiaire est celui du contrôle, pas un défaut imputé à la page. Les documents SQLite et ASA ont été consultés ; la résolution DNS de `www.postgresql.org` a momentanément échoué pendant ce groupe, sans empêcher les essais PostgreSQL locaux.

## Groupe 2 — F86, contre-exemple initial

Dans Python 3 isolé :

```python
line = '  Jean, 15\n'
print(repr(line.split(',')[0]), int(line.split(',')[1]))
print(repr(line.strip().split(',')[0]), int(line.strip().split(',')[1]))
```

Sortie effective :

```text
F86 sans strip : premier champ = '  Jean' ; entier = 15
F86 avec strip : premier champ = 'Jean' ; entier = 15
```

Les trois formulations observées en page sont à `b1-python/chapitres/chapitre5.html:221`, `:505` et `:518` ; l'exécution démontre la perte de blancs, et non que tous les formats de données doivent conserver ces blancs.

Blocs `pre` extraits des pages par `parse5`, exécutés dans Python 3.14.7 sous Bubblewrap ; autres expressions évaluées séparément :

```text
F85 bloc HTML exécuté : Bonjour Python => 5 caractères de aeiouy
F87 blocs HTML exécutés : while => -2 ; boucle imbriquée => 6 lignes
F88 bloc HTML exécuté : Prix TTC : 14.75 € ; virgule => (12.5, 18) ; point => 14.75
F86 int(" 15\n") => 15 ; int("15 ans") => ValueError
F86 clic réponse correcte : OK ; réponse=La ligne entière, avec \n si le saut de ligne est présent
F87 clic réponse correcte : OK ; réponse=6
F86 carte retournée : OK ; role=button ; aria-pressed=None
```

Le premier contrôle de carte F86 a rejeté à tort le résultat car il imposait `aria-pressed=true`, alors que le script propre à cette page bascule `is-flipped` et utilise `role=button` sans cet attribut. Après adaptation du contrôleur à cette implémentation, le clic a bien retourné la carte. Ce contrôle ne prétend pas valider l'accessibilité complète.

### F86 — reprise indépendante du 30 octobre 2026

Après modification de `b1-python/chapitres/chapitre5.html`, analyse `parse5`, exécution Python et interactions Chromium sous Bubblewrap :

```text
F86 résumé analysé : strip conditionnel, int accepte les blancs, ancienne règle universelle absente
F86 reprise contre-exemple :
'  Jean' 15
'Jean' 15
F86 clic réponse correcte : OK ; réponse=La ligne entière, avec \n si le saut de ligne est présent
F86 carte retournée : OK ; role=button ; aria-pressed=None ; absences=[]
F86 résumé après reprise, visible et conditionnel : OK ; condition=true, integer=true, old=false, visible=true
```

La vérification indépendante ne reprend pas à son compte les « 9 tests » déclarés sans les avoir relancés. L'ancienne observation est conservée ci-dessus comme historique.

## Groupe 3 — 30 octobre 2026

Comparaison automatisée `parse5` de la page et des sources FSF/GNU, puis commandes `ln`, `stat`, `touch`, `chmod`, `find` et `openssl passwd -6` sur des fichiers et données fictifs dans `/tmp` isolé ; interactions QCM en Chromium :

```text
F92 page/FSF/GNU : FSF 1985 ; GPL v1 février 1989 ; Linux GPL 1992
F94 alpha et beta : même inode=3 ; liens=2
F96 chmod : mtime inchangé=946684800 ; ctime 1793395337 -> 1793395338 ; find -mtime +1 et -ctime -1 vrais
F102 440 + ug=rwx -> 770
F102 440 + ug+wx -> 770
F102 400 + ug=rwx -> 770
F102 400 + ug+wx -> 730
F106 SHA-512-crypt fictif : même mot + même sel -> même vérificateur ; autre sel -> différent
F94 clic réponse correcte : OK ; Décrire les métadonnées du fichier
F102 clic réponse correcte : OK ; = fixe exactement, + ajoute seulement
F106 clic réponse correcte : OK ; /etc/shadow
```

Le temps `mtime=946684800` a été fixé volontairement ; l'écart de `ctime` provient du `chmod` dans l'expérience. Le numéro d'inode et les horodatages sont propres à cette exécution. Les valeurs d'exemple du vérificateur ne sont ni des identifiants ni des secrets réels.

## Groupe 4 — 30 octobre 2026 : OpenSSH, Bash, Cisco et interface

Les commandes `ssh -F /dev/null -G` n'ouvrent aucune connexion. Toutes les autres chaînes sont des données fictives. Chromium et les exécutables de cours ou du catalogue sont sous Bubblewrap sans réseau ; les pages du dépôt sont montées en lecture seule. Le moteur `runTests` a été appelé avec l'exécuteur local d'analyse pour Cisco et un adaptateur local Bash pour GitHub ; il ne s'agit pas d'une soumission HTTP.

```text
OpenSSH parsing via ssh -F /dev/null -G (aucun réseau)
wrong: user=user hostname=exemple.invalid:2202 port=22
correct: user=user hostname=exemple.invalid port=2202
uri: user=user hostname=exemple.invalid port=2202
F64 expansion citée : $(printf INTERPRETE)
F64 réévaluation eval (données synthétiques) : INTERPRETE
F64 expansion non citée / citée, nombre d arguments : 2 / 1
F14 clic réponse correcte : OK ; réponse=ssh -p 2222 sam@serveur
F13 carte retournée : OK ; role=button ; aria-pressed=true ; absences=[]
F14 carte retournée : OK ; role=button ; aria-pressed=true ; absences=[]
F64 carte retournée : OK ; role=button ; aria-pressed=true ; absences=[]
F13 na2-c4-e2 moteur réel, solution: 4/4 ; verdict SECURITE_MAXIMALE rejeté: 2/4 ; suspension: false
F64 gh3-c5-e3 moteur réel + adaptateur Bash isolé: 5/5 ; suspension UI/API: true
```

Reproduction du contraste Bash : `PAYLOAD='$(printf INTERPRETE)' bash -c 'printf "%s\n" "$PAYLOAD"'` conserve la chaîne, tandis que `PAYLOAD='$(printf INTERPRETE)' bash -c 'eval "printf \"%s\\n\" \"$PAYLOAD\""'` affiche `INTERPRETE`. La vérification `isGradingSuspended` correspond ici au marqueur explicite de la page ; elle ne teste pas la route HTTP ou une authentification. Les résultats internes ne doivent pas être confondus avec un service de correction opérationnel.

## Groupe 5 — 30 octobre 2026 : cartes, calculs et références officielles

Chromium sous Bubblewrap a cliqué ou retourné les éléments actifs ; les quatre QCM ci-dessous ont marqué la bonne réponse, désactivé les choix et affiché leur explication. Le navigateur ne teste pas les services cloud. `ar-c1-e2` a été transmis au vrai `runTests` avec l'exécuteur d'analyse local ; les sorties ont été recalculées à partir des données du squelette, avec fraction décimale exacte, et non reprises de la solution du catalogue.

```text
F15 clic réponse correcte : OK ; réponse=Un ou plusieurs datacenters physiquement séparés, dotés d’alimentations électriques et de réseaux indépendants
F16 clic réponse correcte : OK ; réponse=Le SLA dépend du service, de sa configuration et des conditions applicables
F17 clic réponse correcte : OK ; réponse=Un carré de 44 x 44 pixels CSS dans la cible
F19 clic réponse correcte : OK ; réponse=1024 Kio
F15 carte retournée : OK ; role=button ; aria-pressed=true ; absences=[]
F16 carte retournée : OK ; role=button ; aria-pressed=true ; absences=[]
F17 carte retournée : OK ; role=button ; aria-pressed=true ; absences=[]
F19 carte retournée : OK ; role=button ; aria-pressed=true ; absences=[]
F18 avertissement visible : OK ; {condition: True, dates: True, visible: True}
F18 fin ESU : 2026-10-13 ; contrôle : 2026-10-30 ; jours écoulés : 17
F19 1 Mo = 1000000 octets ; 1 Mio = 1048576 octets ; écart = 48576 octets
F19 ar-c1-e2 calcul indépendant exact: 3/3; 1024 ko : 1.024 mo rejeté à 0/3
F19 valeurs limites : 512 ko -> 0.5 mo ; 1 ko -> 0.0009765625 mo ; 1 go -> 1024 mo
```

Sources consultées directement le 30 octobre 2026 : Oracle décrit une région à un domaine et trois domaines de panne ; Microsoft Azure décrit des groupes de centres séparés ; W3C précise 44 pixels CSS avec exceptions et 24 pixels CSS avec exceptions selon le critère ; Android recommande 48 dp ; la table Microsoft de fin des ESU indique 13 octobre 2026 pour Azure et hors Azure. Le compteur automatique du pilote omet l'avertissement F18 dans son total, mais son résultat individuel figure ci-dessus ; il ne faut pas interpréter ce total comme neuf tests.

## Groupe 6 — 30 octobre 2026 : PHP, SQLite, DP et WebGL

Dans Bubblewrap, avec tous les cours montés en lecture seule et aucun réseau ; les programmes PHP, Python et les shaders sont des expériences indépendantes, pas du code étudiant.

```text
F44 PHP 8.5.8 interface publique get/set, lecture/écriture : Ada Grace ; classe sans propriété rejetée=255
F45 SQLite 3.53.4 FK activées : unique non primaire et composée acceptées ; NULL partiel accepté ; deux valeurs absentes rejetées ; auto-référence acceptée
F46 n=3 W=5 : 18 cellules mises à jour ; valeur DP=8 = énumération=8 ; 8 sous-ensembles
F46 n=3 W=7 : 24 cellules mises à jour ; valeur DP=12 = énumération=12 ; 8 sous-ensembles
F50 normales : triangle=(0, 0, 1) ; ordre inverse=(0, 0, -1) ; alignés=(0, 0, 0) (pas de normale unitaire)
F44 clic réponse correcte : OK ; réponse=Oui : en lecture { get; } et/ou écriture { set; }
F45 clic réponse correcte : OK ; réponse=un ou plusieurs attributs référençant une clé primaire ou unique
F46 clic réponse correcte : OK ; réponse=O(n * W)
F50 clic réponse correcte : OK ; réponse=Parce que trois sommets non alignés définissent un plan unique et une face sans torsion
F45, F46, F50 cartes retournées : OK ; aria-pressed=true ; absences=[]
F50 tracé WebGL 1.0 : POINTS erreur=0 pixels=36 ; LINES erreur=0 pixels=26 ; TRIANGLES erreur=0 pixels=338
```

PHP : `interface Lecture { public string $nom { get; } }`, `interface Ecriture { public string $nom { set; } }`, classe `Personne implements Lecture, Ecriture` avec propriété publique initialisée à `Ada`, puis affectée à `Grace`. Une classe `Incorrecte implements Lecture` sans propriété retourne 255. La première version de notre contrôleur attendait le mauvais libellé d'erreur et désactivait son affichage : elle a échoué à tort ; l'assertion a été corrigée et le groupe rejoué avec succès. Le manuel situe l'introduction en 8.4 ; seule 8.5.8 a été exécutée ici.

SQLite : table `parent(id INTEGER PRIMARY KEY, code TEXT UNIQUE, a INTEGER, b INTEGER, UNIQUE(a,b))` ; enfant avec `REFERENCES parent(code)` et `FOREIGN KEY(x,y) REFERENCES parent(a,b)`. Après insertion du parent `('ABC',3,4)`, `(ABC,3,4)` et `(NULL,NULL,4)` sont acceptés, `(INCONNU,3,4)` et `(ABC,3,5)` rejetés ; une table auto-référencée accepte son parent existant. L'énumération F46 parcourt `2^3` choix indépendamment du remplissage tabulaire. WebGL utilise un canevas 32×32 et `readPixels` après chaque primitive ; les comptes dépendent de ce moteur de rendu et ne mesurent pas une scène du cours.

## Groupe 7 — 30 octobre 2026 : sécurité et modèles

Les cartes et QCM sont activés dans Chromium isolé, pas simplement lus. Aucune commande Git n'est exécutée ; le clic F48 ne fait que choisir une réponse textuelle. Le refus XFRM et les limites de disponibilité sont des limites de l'environnement, pas des défauts attribués au cours.

```text
F48 QCM : OK ; bonne réponse textuelle git-filter-repo --path secret.txt --invert-paths
F53 QCM tunnel : OK ; bonne réponse Mode Tunnel avec ESP
F57 QCM chapitre : OK ; Un état cohérent sans mémoire de la VM
F58 QCM : OK ; spr=https
F67 QCM : OK ; Le coût perdu ne se déduit pas sans autre analyse
F73 QCM : OK ; des certificats ou précertificats soumis peuvent révéler des noms à vérifier
F75 QCM : OK ; SecNumCloud
F48 F53 F57 F58 F59 F63 F67 F75 : cartes retournées ; aria-pressed=true ; absences=[]
F57 QCM historique question 82 : OK ; réponse=B. Un état cohérent de la VM sans capture de la mémoire ; marked=true ; allDisabled=true ; explanation=true ; Score : 1 / 1 (100%) — 99 restantes
F59 URL javascript après encodage et textContent : OK ; encoded=javascript:void(window.__relecture_xss=42) ; protocol=javascript: ; executed=42 ; textChildren=0 ; textValue=<img src=x onerror=probe()>
F53 ip xfrm state list : RTNETLINK answers: Operation not permitted ; status=1
F67 capacités fictives : totale=100 allouée=100 reste=0 ; mesure A=20% ; mesure B=100%
```

Le `javascript:` ci-dessus est notre charge inoffensive, exécutée uniquement dans un navigateur sans réseau ; elle modifie une variable de la page, pas le dépôt. `textContent` est testé sur un `div`, pas sur un récepteur exécutable.

Les cas ci-dessous sont construits depuis les données du squelette selon les règles explicites, sans lire la solution du catalogue. `runTests` et l'exécuteur `analyse` sont ceux du dépôt, appelés dans Bubblewrap ; `suspension=false` pour les quatre exercices indiqués.

```text
F58 az3-c5-e2 calcul indépendant=3/3 ; REQUEST LIST at 100: ALLOWED rejeté à 0/3
  cas 1: PUT 100 ALLOWED ; LIST 100 INSUFFICIENT_PERMISSIONS
  cas 2: GET 150 PROTOCOL_VIOLATION ; GET 80 NOT_YET_VALID ; GET 250 EXPIRED
  cas 3: LIST 100 ALLOWED ; PUT 100 INSUFFICIENT_PERMISSIONS
F59 cs2-c4-e2 calcul indépendant=4/4 ; Bonjour & bienvenue ! rejeté à 0/4
  cas 1: Bonjour &amp; bienvenue !
  cas 2: &lt;img src=x onerror=&#x27;alert(1)&#x27;&gt;
  cas 3: Texte normal sans caracteres speciaux 123
  cas 4: &quot;A &amp; B&quot; &lt; &quot;C &amp; D&quot;
F63 cc3-c1-e3 calcul indépendant=3/3 ; ISOLATION_CERTIFIEE rejeté à 0/3
  sante_region: COMMUNAUTAIRE / HYPOTHESE_ISOLATION=RESTREINT_PAIRS
  dev_sandbox: PUBLIC / HYPOTHESE_ISOLATION=LOGIQUE_MULTI_TENANT
  defense_ops: PRIVE / HYPOTHESE_ISOLATION=ISOLE_PHYSIQUE
F75 cc3-c5-e3 calcul indépendant=3/3 ; CONFORMITE=CONFORME rejeté à 0/3
  banque: TRANSFERT=A_ETUDIER | QUALIFICATION=DECLARATION_A_VERIFIER | CONFORMITE=NON_EVALUEE
  industrie: TRANSFERT=NON_DECLARE | QUALIFICATION=DECLARATION_A_VERIFIER | CONFORMITE=NON_EVALUEE
  association: TRANSFERT=INCONNU | QUALIFICATION=NON_DECLAREE | CONFORMITE=NON_EVALUEE
F67 vt-c4-e3 calcul indépendant=3/3 ; variante srv1 : 50 rejetée à 1/3
  cas 1: vm-a/srv1, vm-b/srv2, vm-c/sans-place ; restes 40 et 40 ; 1/3
  cas 2: vm-a/srv1, vm-b/srv1, vm-c/srv2, vm-d/sans-place ; restes 0 et 0 ; 1/4
  cas 3: vm-bd, vm-web, vm-feu sur fainéant ; reste 0 ; 0/3
```

Pour F73, le 30 octobre 2026, `get-sth` du journal public Google Argon2026h2 renvoie `tree_size=3472792891`, `timestamp_ms=1793396193136`, une signature présente non vérifiée ; `get-entries?start=0&end=0` renvoie une entrée de type 1, `leaf_input` de 780 octets, SHA-256 `34e99227b48642af06cb97655ae268656816fd9043e7875182b8881d1e96eba4`. Le précertificat DER de 1022 octets extrait de `extra_data` donne avec OpenSSL `DNS:flowers-to-the-world.com`. L'URL source est https://ct.googleapis.com/logs/us1/argon2026h2/ct/v1/get-entries?start=0&end=0 ; aucune preuve d'inclusion n'a été vérifiée. Un certificat auto-signé fictif créé dans `/tmp` donne `subjectAltName=DNS:*.exemple.test` et `openssl verify -CAfile /tmp/fixture.crt -verify_hostname nom-non-publie.exemple.test /tmp/fixture.crt` répond `OK` sans DNS. La première création de ce certificat a échoué dans l'isolation dépourvue de configuration OpenSSL ; avec `OPENSSL_CONF=/dev/null` et `-sha256`, elle a réussi. Ce test de nom n'établit pas qu'un service existe.

Documents consultés : RFC 4303 (les combinaisons ESP, anti-rejeu seulement avec intégrité) ; Microsoft Hyper-V (production sans mémoire, standard avec mémoire) ; Microsoft account SAS (champs requis et optionnels) ; documentation Git en lecture seule. L'URL ANSSI renvoie une page de protection anti-robot, malgré HTTP 200 ; la DINUM utilise une formulation d'immunité pour le cloud commercial de confiance et la CNIL décrit les conditions des transferts. Aucun de ces éléments n'est un avis juridique sur un cas concret.

## Groupe 8 — ateliers Bash isolés

Exécution des solutions du catalogue via le vrai `runTests` et un adaptateur Bash local injecté ; `parse5` compare les énoncés/squelettes à leurs pages. Les cas supplémentaires et les sorties des corrigés HTML sont comparés à des calculs indépendants ou à `chmod` GNU dans `/tmp` :

```text
lx-c3-e2: moteur runTests + Bash isolé = 7/7 ; HTML/catalogue identiques
lx-c5-e3: moteur runTests + Bash isolé = 6/6 ; HTML/catalogue identiques
lx-c6-e1: moteur runTests + Bash isolé = 5/5 ; HTML/catalogue identiques
lx-c4-e2: moteur runTests + Bash isolé = 4/4 ; HTML/catalogue identiques
lx-c2-e3: moteur runTests + Bash isolé = 6/6 ; HTML/catalogue identiques
F97 08K, n=06, égalité, ordre ex æquo, plafond 64 bits et n=0 : conformes
F99 n=08, !/*/!!/!hachage, vide et valeurs non analysées : 8/4/2, c puis h
F101 absence/BOM/sh/espace rejetés avant exécution ; shebang valide avec sortie fausse rejeté
F103 21 variations au lab et 18 classes simples au corrigé HTML = chmod GNU réel
F104 lab + corrigé HTML : fichier -n, absence, cycle et deux chaînes simulées de 101 liens = 5/5 chacun
```

Entrée F97 indépendante : seuil `08K`, six fichiers de tailles `008K`, `09K`, `20K`, `20K`, `9223372036854775807`, `01K` ; sortie `max 9223372036854775807`, les deux `20K` dans leur ordre, puis `09K`, total 4. Pour F104, `@`, `*`, `-n`, `x[2]` et `key$abc` retournent leur nom lorsqu'ils figurent dans les fichiers simulés. Une chaîne contenant littéralement une substitution shell a aussi été traitée comme texte : aucun marqueur n'a été créé dans `/tmp` ; ce test limité ne constitue pas un audit de sécurité global.

La première tentative de comparaison F103 a échoué avec `EACCES` parce que notre propre fichier de référence venait de passer en mode `000` ; le contrôleur a été corrigé pour ne pas le réécrire entre essais et le groupe a été rejoué avec succès. Les commandes de chmod ne visaient que ce fichier temporaire, pas le dépôt.
