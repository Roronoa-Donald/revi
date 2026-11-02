# Contre-vérification indépendante S0 A — lot 2

Commencée le 30 octobre 2026, après le rejeu des corrections F129 et F191 du rapport S1. Périmètre demandé : F08 F09 F10 F11 F13 F14 F15 F16 F17 F18 F19 F44 F45 F46 F48 F50 F53 F57 F58 F59 F63 F64 F67 F73 F75 F85 F86 F87 F88 F92 F94 F96 F97 F99 F101 F102 F103 F104 F106. Les deux CSV `verification/04-erreurs-a-corriger.csv` et `corrections/suivi.csv` ont été lus pour les 39 fiches ; les localisations historiques et les corrections déclarées sont examinées ci-dessous au fur et à mesure.

**Méthode.** `rejoué` signifie qu'un comportement, un calcul, une interaction ou une comparaison documentaire automatisée a été effectivement vérifié, dans la portée précisée ; `partiel` qu'une partie importante reste non vérifiée ; `défaut` qu'une contradiction ou un contre-exemple concret subsiste ; `non rejoué` qu'aucun rejeu pertinent n'a été possible. Une lecture seule ne vaut pas rejeu. Les exemples ou programmes de cours ne sont exécutés que sous isolation ; aucune commande Git, aucune génération `dist/`, aucun déploiement ni modification de cours ou de test existant.

Preuves brutes, données et commandes : `corrections/resultats/lot2-contreverification-s0-a-independante-journal.md`. Les observations valent à leur heure et ne certifient pas une production ou l'intégralité des cours.

## Groupe 1 — statistiques et SQL

### F08 — rejoué

**Constat/suivi.** Le QCM historique excluait les séries plurimodales ; le suivi annonce toutes les modalités maximales. La question active est `b1-stats/chapitres/chapitre3.html:381`, issue de `server/content/b1-stats/chapitres-1-3.js`.

**Rejeu.** La série `A,A,B,B,C` donne indépendamment les effectifs `2,2,1` et les deux modes `A,B` ; le QCM est effectivement cliqué dans Chromium et accepte toutes les modalités maximales. La page indique séparément sa convention « pas de mode si aucune modalité ne se détache » ; ce cas dépend de la convention pédagogique retenue.

### F09 — rejoué

**Constat/suivi.** La carte historique confondait p-valeur et probabilité d'une cause due au hasard ; le suivi annonce une définition conditionnée par H0 et le modèle. Emplacements actifs : `b3-etude-quantitative/chapitres/chapitre5.html:163`, QCM `:414`, carte `b3-etude-quantitative/chapitres/cartes.html:109`.

**Rejeu.** Sous le modèle d'une pièce équilibrée, neuf piles sur dix donnent une p-valeur exacte `11/1024` en test unilatéral et `11/512` en test bilatéral symétrique ; le sens du test importe. Le QCM a été cliqué et la carte retournée dans Chromium ; ils indiquent H0, les hypothèses et « au moins aussi extrême ». Aucun résultat ne constitue une probabilité a posteriori de H0. Référence ASA consultée : https://www.amstat.org/asa/files/pdfs/P-ValueStatement.pdf.

### F10 — rejoué

**Constat/suivi.** La carte historique présentait `CHECK(prix > 0)` comme suffisante ; le suivi distingue `NOT NULL` et les valeurs non finies PostgreSQL. Carte active `sql/chapitres/cartes.html:68`, QCM `sql/chapitres/chapitre1.html:332`.

**Rejeu.** PostgreSQL 18.6, dans un cluster temporaire isolé, accepte `NULL`, `NaN` et `Infinity` avec `NUMERIC CHECK(prix > 0)` seul. La contrainte du QCM, `NOT NULL CHECK(prix > 0 AND prix < 'Infinity'::numeric)`, rejette `NULL`, `NaN`, `Infinity`, `0` et `-1` et accepte `1.25`. SQLite 3.53.4 accepte également `NULL` avec le seul `CHECK` et le rejette avec `NOT NULL`. La carte et la réponse correcte du QCM ont été effectivement activées. Aucun autre SGBD ni configuration particulière n'est certifié.

### F11 — rejoué

**Constat/suivi.** L'ancienne carte assimilait `CHAR(10)` à une réservation fixe de dix octets ; la version active `sql/chapitres/cartes.html:69` distingue caractères, encodage et SGBD.

**Rejeu.** En UTF-8, PostgreSQL 18.6 accepte `ééé` dans `VARCHAR(3)` : trois caractères et six octets ; il rejette `éééé`. SQLite 3.53.4 accepte `éééé` dans `VARCHAR(3)` : quatre caractères et huit octets. La carte a été retournée dans Chromium après correction d'un sélecteur de notre outil, sans modification de la page. Le contrôle n'établit pas une taille physique universelle de stockage. Référence SQLite consultée : https://www.sqlite.org/datatype3.html#affinity_name_examples.

## Groupe 2 — fondamentaux Python

### F86 — rejoué après reprise

**Constat/suivi.** Le constat initial affirmait à tort que `int(" 15\n")` échouait ; le suivi déclare corrigés la question et le récapitulatif. Les passages actifs `b1-python/chapitres/chapitre5.html:220` et `:505` expliquent désormais que `strip()` est facultatif pour ce nombre et dépend du besoin de retirer les blancs.

**Défaut initial reproduit.** Avant la reprise, le résumé à `b1-python/chapitres/chapitre5.html:518` prescrivait « Toujours `.strip()` avant `split`/conversion ». Avec la ligne `"  Jean, 15\n"`, Python 3 en isolation convertit `15` sans `strip()` et conserve le premier champ `"  Jean"` ; en appliquant le `strip()` alors prescrit avant le découpage, ce champ devient `"Jean"`. L'instruction universelle pouvait donc supprimer des blancs significatifs et contredisait la réserve du même chapitre. Ce contre-exemple ne conteste pas que `strip()` puisse être utile lorsque ces blancs ne doivent pas être conservés.

Le QCM sur la présence éventuelle du saut de ligne et la carte indiquant que `strip()` n'est pas nécessaire pour `int` ont été activés dans Chromium ; le calcul `int(" 15\n") = 15` et le rejet de `"15 ans"` ont été exécutés indépendamment. À eux seuls, ces résultats n'avaient pas corrigé le résumé alors contradictoire.

**Reprise du 30 octobre 2026.** Le résumé actif à `:518` conditionne maintenant `strip()` au choix de ne pas conserver les blancs et rappelle que `int()` accepte déjà les blancs autour d'un nombre. `parse5` vérifie la nouvelle formulation et l'absence de l'ancienne règle universelle ; Chromium confirme que ce résumé est effectivement visible. Le contre-exemple a été rejoué : `"  Jean"` est conservé sans `strip()`, devient `"Jean"` avec `strip()`, et la conversion donne `15` dans les deux cas. Le QCM et la carte ont à nouveau été activés. Verdict actuel : **rejoué** pour cette correction ; les neuf tests rapportés par l'auteur n'ont pas été relancés dans cette reprise indépendante.

### F85 — rejoué

**Constat/suivi.** L'exemple annonçait 4 alors qu'il comptait aussi `y` ; le suivi annonce 5 voyelles non accentuées. Le bloc réellement extrait de `b1-python/chapitres/chapitre2.html:193` a été exécuté sous Python 3.14.7 isolé et affiche **5**, comme la sortie et l'explication de la page. Le contrôle porte sur cet exemple et sur l'ensemble `aeiouy`, pas sur la prise en charge générale des accents.

### F87 — rejoué

**Constat/suivi.** Les anciennes instructions composées sur une ligne produisaient une erreur de syntaxe ; le suivi annonce des blocs indentés. Dans `b1-python/chapitres/chapitre2.html:419` et `:458`, les deux blocs ont été extraits du HTML puis exécutés en isolation : le `while` termine à `-2` et la boucle `2 × 3` imprime six lignes `abc`. Le QCM correspondant a accepté `6` dans Chromium. Les autres exemples et distracteurs de tout le cours n'ont pas été exhaustivement exécutés.

### F88 — rejoué

**Constat/suivi.** L'expression avec virgule était présentée comme nécessairement fautive ; le suivi annonce un tuple dans ce contexte. `b1-python/chapitres/chapitre1.html:173`–`:183` montre désormais le tuple et le point décimal. Python 3.14.7 isolé donne `(12.5, 18)` pour `prix_ht * 1,18`, `14.75` pour `prix_ht * 1.18`, et l'exemple TTC extrait de la page affiche `Prix TTC : 14.75 €`. Le comportement d'une virgule dans un appel dépend de son contexte syntaxique ; aucun arrondi financier généralisé n'est déduit de cet exemple.

## Groupe 3 — chronologie et fichiers Linux

### F92 — rejoué

**Constat/suivi.** La chronologie attribuait la GPL à 1985 ; le suivi distingue FSF 1985, GPL v1 1989 et Linux sous GPL en 1992. La frise active `b1-linux/chapitres/chapitre1.html:108`–`:112` et le résumé `:413` reprennent ces dates.

**Rejeu documentaire automatisé.** Un analyseur a comparé la frise au texte de la GPL v1, daté de février 1989, et à l'historique officiel de la FSF : création en 1985, GPL v1 en 1989, changement de licence Linux en 1992. Il s'agit d'une comparaison de documents, pas d'une expérience historique. Références consultées : https://www.gnu.org/licenses/old-licenses/gpl-1.0.html et https://www.fsf.org/bulletin/2024/fall/tracing-the-fsfs-footsteps.

### F94 — rejoué

**Constat/suivi.** Le nom était attribué à l'inode ; le suivi le replace dans l'entrée de répertoire. `b1-linux/chapitres/chapitre2.html:104` distingue désormais noms et métadonnées. Dans un répertoire temporaire isolé, `alpha` et son lien physique `beta` possèdent le même numéro d'inode et un compteur de deux liens ; le QCM `:334` accepte « métadonnées » dans Chromium. Ce contrôle porte sur le système de fichiers temporaire utilisé, pas sur tous les systèmes de fichiers.

### F96 — rejoué

**Constat/suivi.** `-ctime` était présenté comme date de création ; `b1-linux/chapitres/chapitre3.html:140` le décrit comme changement d'état de l'inode. Sur un fichier temporaire dont `mtime` est fixé à 2000, un `chmod` modifie effectivement `ctime` sans modifier `mtime` ; `find -mtime +1` et `find -ctime -1` sélectionnent tous deux ce fichier. Ces essais illustrent un changement de métadonnées et ne prétendent pas mesurer un temps de création.

### F102 — rejoué

**Constat/suivi.** Le cours opposait les résultats depuis `440` ; `b1-linux/chapitres/chapitre6.html:106` distingue maintenant `440` et `400`. Quatre `chmod` sur fichier temporaire confirment : `440 + ug=rwx → 770`, `440 + ug+wx → 770`, `400 + ug=rwx → 770`, `400 + ug+wx → 730`. Le QCM sur `=` et `+` a aussi été cliqué dans Chromium. Aucun fichier de l'utilisateur n'a été modifié.

### F106 — rejoué

**Constat/suivi.** Le champ `shadow` était décrit comme mot de passe chiffré ; `b1-linux/chapitres/chapitre5.html:109` parle d'un vérificateur généralement dérivé avec sel, non déchiffré. Pour un mot fictif, `openssl passwd -6` isolé produit le même vérificateur avec le même sel et un vérificateur différent avec un autre sel ; le QCM `:322` accepte `/etc/shadow`. Aucun compte réel ni vrai mot de passe n'a été utilisé ; cet exemple n'établit pas à lui seul la sécurité d'un algorithme ou l'impossibilité théorique d'attaquer le vérificateur.

## Groupe 4 — secrets, SSH et variables d'environnement

### F13 — rejoué

**Constat/suivi.** La carte qualifiait le secret Cisco fondé sur MD5 de hachage fort ; le suivi distingue les types. La carte active `ccna/chapitres/cartes.html:97` et le cours `ccna/chapitres/chapitre4.html:146` mentionnent la faiblesse du type 5 et la réversibilité du type 7, ainsi que les types 8 et 9 selon compatibilité. La documentation Cisco officielle consultée confirme les mécanismes : https://www.cisco.com/c/en/us/about/trust-center/resilient-infrastructure/protecting-secrets.html.

**Rejeu.** Carte retournée dans Chromium ; `na2-c4-e2` accepte sa solution **4/4** avec le moteur réel et rejette la variante remplaçant `CRITERES_REUNIS` par `SECURITE_MAXIMALE` (**2/4**, arrêt au premier désaccord). Sa consigne précise qu'il contrôle uniquement la présence de commandes. Aucun équipement Cisco ni algorithme de son firmware n'a été exécuté.

### F14 — rejoué

**Constat/suivi.** La cible `utilisateur@hote:port` était donnée à tort pour la syntaxe ordinaire ; `linux/chapitres/cartes.html:94` et le QCM `linux/chapitres/chapitre4.html:303` prescrivent `ssh -p PORT utilisateur@hote`.

**Rejeu.** `ssh -F /dev/null -G` sur des hôtes fictifs, sans connexion : la cible sans schéma donne `hostname=exemple.invalid:2202 port=22`, l'option `-p 2202` donne `hostname=exemple.invalid port=2202`. L'URI `ssh://user@exemple.invalid:2202` est correctement distinguée et donne aussi le port 2202. Carte retournée et QCM cliqué dans Chromium. La configuration de cet essai est volontairement vide ; aucune connexion SSH réelle n'est testée. Référence : https://man.openbsd.org/ssh.1.

### F64 — partiel

**Constat/suivi.** La carte attribuait à `env:` une protection universelle ; `b3-github/chapitres/cartes.html:107` indique maintenant les limites, les guillemets, la validation et l'absence d'`eval`. Le chapitre `b3-github/chapitres/chapitre5.html:140` et la consigne du lab `:279` limitent également leur portée.

**Rejeu.** Carte retournée ; Bash isolé conserve littéralement `$(printf INTERPRETE)` dans une expansion citée, mais `eval` réinterprète la même donnée synthétique ; une expansion non citée scinde deux mots, contre un argument cité. Le moteur local et la solution du lab `gh3-c5-e3` donnent **5/5**, via un adaptateur Bash isolé. **Limite importante :** la page active affiche `data-grading-suspended="1"` et la route interrompt la correction ; le rejeu interne ne prouve donc pas une validation disponible pour l'élève. Aucun workflow GitHub réel n'a été lancé. Référence : https://docs.github.com/en/actions/concepts/security/script-injections.

## Groupe 5 — cloud, accessibilité, cycle de vie et unités

### F15 — rejoué

**Constat/suivi.** La carte imposait trois zones à toutes les régions ; le suivi distingue les fournisseurs et les domaines Oracle. La carte active `b3-cloud-computing/chapitres/cartes.html:78` a été retournée ; le QCM `b3-cloud-computing/chapitres/chapitre2.html:347` a été cliqué.

**Rejeu.** La documentation Oracle consultée décrit une région à un seul domaine de disponibilité et trois domaines de panne par domaine : elle fournit un contre-exemple à l'ancienne généralisation. La carte et le QCM affichent désormais les distinctions contrôlées. Aucun inventaire de toutes les régions ni déploiement cloud n'a été effectué. Référence : https://docs.oracle.com/en/solutions/design-dr/determine-your-deployment-strategy1.html.

### F16 — rejoué

**Constat/suivi.** La carte assimilait une zone Azure à un unique centre et la seule présence de deux zones à un SLA ; `b3-cloud-azure/chapitres/cartes.html:72` précise qu'une zone peut grouper plusieurs centres et qu'un SLA dépend du service et de ses conditions.

**Rejeu.** Carte retournée et QCM `b3-cloud-azure/chapitres/chapitre1.html:361` cliqué ; la documentation Microsoft décrit les zones comme des groupes de centres séparés. Cette vérification de portée documentaire et d'interface n'exécute pas Azure et ne calcule ni ne certifie le SLA d'un contrat réel. Référence : https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview.

### F17 — rejoué

**Constat/suivi.** La carte attribuait `48 × 48 px` simultanément à Android et WCAG ; `uiux/chapitres/cartes.html:107` indique 44 × 44 pixels CSS pour WCAG 2.5.5 AAA avec exceptions, contre 48 × 48 dp recommandés pour Android. `uiux/chapitres/chapitre5.html:175` distingue aussi le critère 2.5.8 AA et ses exceptions.

**Rejeu.** Carte retournée et QCM `uiux/chapitres/chapitre5.html:408` cliqué ; comparaison aux recommandations W3C et Android. Le modèle pédagogique 48 × 48 pixels CSS n'est pas assimilé à une certification WCAG. Aucun audit d'accessibilité ni mesure sur appareil réel n'a été réalisé. Références : https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html ; https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html ; https://support.google.com/accessibility/android/answer/7101858.

### F18 — rejoué

**Constat/suivi.** Le cours conseillait une souscription ESU pour Windows Server 2012 R2 ; le suivi déclare la fin du support étendu et des ESU et demande un laboratoire isolé.

**Rejeu.** La page active `b1-admin-windows/chapitres/chapitre2.html:82` montre visiblement sous Chromium les dates du 10 octobre 2023 et du 13 octobre 2026, le laboratoire isolé et l'absence de données sensibles. Microsoft donne le 13 octobre 2026 pour les ESU Azure et hors Azure ; le calcul de dates donne 17 jours écoulés au 30 octobre 2026. Aucun serveur Windows ni souscription réelle n'a été testé. Référence : https://learn.microsoft.com/en-us/windows-server/get-started/extended-security-updates-overview.

### F19 — rejoué

**Constat/suivi.** La carte mélangeait Mo et puissances de 1024 ; `b1-architecture/chapitres/cartes.html:65`, le chapitre `:116` et la consigne et l'indice du lab `ar-c1-e2` à `b1-architecture/chapitres/chapitre1.html:244` et `:256` distinguent notation normalisée et codes historiques binaires de l'exercice.

**Rejeu.** Carte retournée et QCM cliqué. Calcul indépendant : 1 Mo = 1 000 000 octets, 1 Mio = 1 048 576 octets. Les trois cas de `ar-c1-e2`, construits indépendamment à partir du squelette avec arithmétique entière exacte, réussissent **3/3** au moteur ; la variante `1024 ko : 1.024 mo` est refusée, conformément à la convention explicitée. Aucun autre système d'unités n'est inféré. Référence : https://physics.nist.gov/cuu/Units/binary.html.

## Groupe 6 — interfaces PHP, clés, algorithmes et géométrie

### F44 — rejoué

**Constat/suivi.** Le QCM niait toute propriété dans une interface PHP ; `php/chapitres/chapitre3.html:129` et `:329` mentionnent désormais les accès publics `get`/`set` depuis PHP 8.4, sans prétendre que l'interface stocke elle-même la valeur.

**Rejeu.** Sous PHP CLI **8.5.8** isolé, deux interfaces imposant respectivement `{ get; }` et `{ set; }` sont implémentées par une propriété publique : lecture `Ada`, écriture puis lecture `Grace`. Une classe sans la propriété est rejetée. Le QCM actif accepte la réponse corrigée dans Chromium. Le manuel confirme l'introduction en 8.4, mais l'interpréteur 8.4 lui-même n'a pas été exécuté. Référence : https://www.php.net/manual/en/language.oop5.interfaces.php.

### F45 — rejoué

**Constat/suivi.** Le cours assimilait une clé étrangère à une clé primaire ; `b1-merise/chapitres/chapitre5.html:83` et `:323`, et la carte `b1-merise/chapitres/cartes.html:99` distinguent référence simple ou composée, clé unique admissible et auto-référence ; la prose `:106` réserve le cas de `NULL`.

**Rejeu.** Dans SQLite 3.53.4 avec `PRAGMA foreign_keys=ON`, une FK vers `UNIQUE` non primaire et une FK composée valides sont acceptées, deux références inexistantes sont rejetées ; une valeur partiellement `NULL` et une auto-référence valide sont acceptées. QCM cliqué et carte retournée. Ces résultats valent pour ce moteur et ses contraintes, pas tous les dialectes ou modes `MATCH`. Référence : https://www.sqlite.org/foreignkeys.html.

### F46 — rejoué

**Constat/suivi.** Le QCM et la carte attribuaient sans contexte `O(nW)` au sac à dos ; `b3-algo/chapitres/chapitre6.html:290` et `b3-algo/chapitres/cartes.html:155` bornent maintenant l'affirmation à la programmation dynamique tabulaire 0/1, capacité entière et autres hypothèses.

**Rejeu.** Sur trois objets `(poids,valeur)=(2,3),(3,4),(4,8)`, un remplissage indépendant visite `n(W+1)` cellules : 18 pour `W=5`, 24 pour `W=7`, valeurs optimales 8 et 12, confirmées par l'énumération des huit sous-ensembles. Le QCM et la carte sont effectivement activés. Les essais finis illustrent la formule ; la justification asymptotique repose sur les deux boucles et le coût constant de cellule, non sur ces seuls timings.

### F50 — rejoué

**Constat/suivi.** Le QCM évoquait exclusivement les triangles et ignorait l'alignement ; `infographie/chapitres/chapitre4.html:332` et `infographie/chapitres/cartes.html:94` limitent maintenant la propriété aux sommets non alignés et mentionnent points et lignes.

**Rejeu.** Produits vectoriels indépendants : normale `(0,0,1)`, ordre inversé `(0,0,-1)`, points alignés `(0,0,0)`. Dans Chromium isolé, WebGL 1.0 dessine effectivement `POINTS`, `LINES` et `TRIANGLES` sans erreur, avec respectivement 36, 26 et 338 pixels colorés ; carte et QCM sont activés. Un contexte WebGL logiciel n'établit pas le comportement de toutes les API ou cartes graphiques. Référence : https://registry.khronos.org/webgl/specs/latest/1.0/index.html.

## Groupe 7 — sécurité, certificats et virtualisation

### F48 — partiel

**Constat/suivi.** La carte prétendait que la suppression créait un commit et effaçait le secret ; `b3-github/chapitres/cartes.html:117` et `b3-github/chapitres/chapitre6.html:145` distinguent index, arbre de travail, `--cached`, commit et historique.

**Rejeu et limite.** Carte retournée et QCM sur les références cliqué ; comparaison à la documentation officielle, qui distingue suppression de l'index et de l'arbre de travail. Conformément à l'interdiction explicite, **aucune commande Git n'a été exécutée** : création de commit, effet réel de `--cached`, révocation et réécriture d'historique ne sont pas rejoués. Référence : https://git-scm.com/docs/git-rm.

### F53 — partiel

**Constat/suivi.** La carte attribuait systématiquement à ESP chiffrement, intégrité et authentification ; `b3-cryptographie/chapitres/cartes.html:128` et `b3-cryptographie/chapitres/chapitre6.html:155` conditionnent désormais les services à l'association de sécurité.

**Rejeu et limite.** Carte retournée et QCM du tunnel cliqué ; la RFC 4303 distingue les trois combinaisons, la confidentialité seule étant facultative pour une implémentation et l'anti-rejeu nécessitant l'intégrité. La lecture de l'état XFRM isolé a échoué par `Operation not permitted` : **aucune association IPsec réelle ni aucun paquet ESP n'a été testé**. Référence : https://www.rfc-editor.org/rfc/rfc4303.

### F57 — partiel

**Constat/suivi.** Un checkpoint Hyper-V était présenté comme capturant toujours la mémoire. La carte active `rd_winserver/chapitres/cartes.html:112` et le chapitre `rd_winserver/chapitres/chapitre6.html:82` distinguent production sans mémoire et standard avec mémoire ; un checkpoint ne remplace pas une sauvegarde indépendante.

**Rejeu et limite.** Carte retournée, QCM du chapitre cliqué, et question 82 du QCM historique directement servable `rd_winserver/chapitres/qcm-100.html:210` effectivement cliquée : bonne réponse, explication affichée et score `1/1`. La documentation Microsoft confirme les deux types. **Pas d'hôte Hyper-V disponible ni de checkpoint/sauvegarde réel rejoué.** Référence : https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/checkpoints.

### F58 — rejoué

**Constat/suivi.** La liste de champs SAS omettait la signature et rendait obligatoires des champs optionnels ; `b3-cloud-azure/chapitres/cartes.html:115`, le chapitre `:134` et le lab `az3-c5-e2` à `b3-cloud-azure/chapitres/chapitre5.html:262` distinguent les champs d'un SAS de compte et bornent la grille fictive.

**Rejeu.** Microsoft confirme `sv,ss,srt,sp,se,sig` requis et `st,spr` facultatifs ; carte et QCM cliqués. Les trois scénarios de permissions, fenêtre et protocole sont recalculés indépendamment et acceptés **3/3** par le moteur réel ; une autorisation indue de `LIST` est rejetée. Le modèle ne vérifie aucune signature : pas de jeton ni de service Azure réels. Référence : https://learn.microsoft.com/en-us/rest/api/storageservices/create-account-sas.

### F59 — rejoué

**Constat/suivi.** Cinq substitutions étaient présentées comme défense XSS universelle ; `Cyber securite B2/chapitres/cartes.html:123` et `Cyber securite B2/chapitres/chapitre4.html:133` distinguent les contextes et recommandent des récepteurs adaptés.

**Rejeu.** Dans Chromium isolé, `javascript:void(window.__relecture_xss=42)` ne contient aucun des cinq caractères ciblés ; après encodage, un clic sur l'URL synthétique exécute bien l'affectation, tandis qu'un `div.textContent` contenant `<img …>` ne crée aucun élément enfant. La carte est retournée. Les quatre entrées de `cs2-c4-e2` sont encodées indépendamment et acceptées **4/4** par le moteur ; une esperluette non encodée est rejetée. Ce n'est ni un audit d'application ni une preuve qu'un récepteur quelconque est sûr. Référence : https://owasp.org/www-community/attacks/xss/.

### F63 — rejoué

**Constat/suivi.** Le multitenant était présenté comme une isolation absolue ; `b3-cloud-computing/chapitres/cartes.html:69` parle de contrôles visant l'isolation sans supprimer les risques. Le lab `cc3-c1-e3`, `b3-cloud-computing/chapitres/chapitre1.html:287`, étiquette sa classification comme hypothétique.

**Rejeu.** Carte retournée ; les trois cas du modèle sont déduits indépendamment et acceptés **3/3** au moteur. Remplacer `HYPOTHESE_ISOLATION` par `ISOLATION_CERTIFIEE` fait rejeter la première réponse. Aucun cloisonnement d'un locataire cloud réel n'a été éprouvé ; ce contrôle ne démontre pas l'absence ou l'existence d'une vulnérabilité particulière.

### F67 — rejoué

**Constat/suivi.** Un hôte sans capacité restante était déclaré utilisé à 100 % ; `b1-virtualisation/chapitres/cartes.html:92` et `b1-virtualisation/chapitres/chapitre4.html:101` distinguent allocation et consommation mesurée. Les seuils du récit sont explicités comme fictifs à `b1-virtualisation/chapitres/chapitre1.html:94`.

**Rejeu.** Carte retournée et QCM sur le coût cliqué. Dans deux scénarios fictifs, 100 unités allouées sur 100 donnent le même reste nul avec des usages mesurés hypothétiques de 20 % et 100 %. Le placement premier hôte du lab `vt-c4-e3` est recalculé indépendamment et accepté **3/3** ; un reste incorrect est refusé. Aucun relevé de charge ni économie réelle n'a été mesuré.

### F73 — rejoué

**Constat/suivi.** Le QCM présentait les journaux CT comme la liste de tous les sous-domaines ; `b3-hacking/chapitres/chapitre2.html:173` et le QCM `:410` parlent de noms issus de certificats ou précertificats, à vérifier, sans exhaustivité.

**Rejeu.** QCM cliqué. Une entrée publique du journal Google Argon2026h2, index 0, est renvoyée comme précertificat ; son SAN est extrait par OpenSSL en isolation. Un certificat synthétique distinct ne contenant que `DNS:*.exemple.test` satisfait le contrôle local du nom `nom-non-publie.exemple.test`, sans prouver ni DNS ni service actif. Il n'y a eu ni vérification cryptographique de preuve d'inclusion du journal ni inventaire des autres journaux. Références : https://www.gstatic.com/ct/log_list/v3/log_list.json et https://letsencrypt.org/docs/ct-logs/.

### F75 — partiel

**Constat/suivi.** La carte déduisait une immunité juridique absolue de SecNumCloud ; `b3-cloud-computing/chapitres/cartes.html:108`, le QCM `b3-cloud-computing/chapitres/chapitre5.html:331` et le lab `:282` exigent une analyse des conditions et ne déduisent pas de conformité.

**Rejeu et limite.** Carte retournée et QCM cliqué ; l'inventaire `cc3-c5-e3` est recalculé indépendamment et accepté **3/3**, avec `CONFORMITE=NON_EVALUEE` dans les trois cas ; `CONFORMITE=CONFORME` est rejeté. La page ANSSI demandée répond par une protection anti-robot sans texte consultable. La DINUM emploie la formule « immunité contre toute réglementation extraterritoriale » pour le *cloud commercial de confiance*, formulation plus large que la prudence du cours ; elle ne permet pas ici de statuer sur une offre ni un contrat. La CNIL rappelle l'analyse des conditions de transfert. **Aucun référentiel ANSSI complet, contrat ou avis juridique n'a été vérifié.** Références : https://www.numerique.gouv.fr/services/cloud/ ; https://www.cnil.fr/fr/transferer-des-donnees-hors-de-lue.

## Groupe 8 — ateliers Linux

Pour ces cinq ateliers, les énoncés et squelettes HTML ont été comparés au catalogue actif par `parse5` ; le moteur `server/exercises/runner.js` a été utilisé avec un adaptateur Bash local injecté sous Bubblewrap, et non avec un prestataire distant.

### F97 — rejoué

**Constat/suivi.** L'ordre seuil/fichiers était incohérent ; `b1-linux/chapitres/chapitre3.html:222` et `server/exercises/b1-linux.js` (`lx-c3-e2`) indiquent désormais seuil, nombre, puis fichiers. Le moteur accepte **7/7** cas du catalogue. Une entrée indépendante `08K`, `n=06`, tailles égales et ex æquo, `09K`, ainsi que la borne `9223372036854775807` produit les conversions et le tri attendus ; l'égalité au seuil et `n=0` sont aussi vérifiés. Le suffixe K vaut ici 1 024 par convention de l'exercice, pas une règle universelle des préfixes.

### F99 — rejoué

**Constat/suivi.** Un marqueur de mot de passe était confondu avec l'impossibilité de toute authentification. L'atelier `lx-c5-e3`, `b1-linux/chapitres/chapitre5.html:261`, et le cours distinguent mot de passe Unix, champ vide, autres méthodes et valeurs non analysées. Le moteur accepte **6/6** cas ; sur huit champs fictifs, le rejeu indépendant compte quatre marqueurs `!`/`*`, deux champs vides et restitue les deux logins dans l'ordre. Aucun fichier `shadow` ni compte réel n'a été consulté ou modifié ; aucune méthode d'authentification réelle n'a été éprouvée.

### F101 — rejoué

**Constat/suivi.** Le shebang était demandé sans être vérifié ; `lx-c6-e1` et `b1-linux/chapitres/chapitre6.html:153` imposent désormais `#!/bin/bash` exactement en première ligne. Le moteur accepte la solution **5/5** avec Bash isolé ; les variantes sans shebang, avec BOM, `#!/bin/sh` ou espace final sont rejetées en `invalid_source` avant tout appel à l'exécuteur. Un shebang valide accompagné d'une mauvaise sortie est aussi refusé. Ceci teste la règle demandée, pas la portabilité de tous les scripts shell.

### F103 — rejoué

**Constat/suivi.** L'énoncé limitait ambiguëment la classe alors que des exemples la combinaient. `b1-linux/chapitres/chapitre4.html:200` et `lx-c4-e2` précisent les combinaisons `u/g/o/a` et répétitions ; le corrigé supplémentaire `b1-linux/exercices/exercices.html:101` se limite explicitement à une classe et une lettre. La solution du lab réussit **4/4** tests du moteur ; 21 variations de classes combinées, `a` ou répétées correspondent à `chmod` GNU sur fichiers temporaires. Le corrigé supplémentaire extrait du HTML correspond à `chmod` pour 18 variations simples `u/g/o`, `+/-`, `r/w/x`. Bits spéciaux et droits ACL hors périmètre.

### F104 — rejoué

**Constat/suivi.** La liste des liens ne permettait pas d'identifier un fichier final existant ; `b1-linux/chapitres/chapitre2.html` (`lx-c2-e3`) et `b1-linux/exercices/exercices.html:161` fournissent maintenant séparément les fichiers existants. Le moteur accepte la solution **6/6** ; le lab et le corrigé supplémentaire extrait de la page ont chacun été rejoués sur cinq cas indépendants : nom final `-n`, cible absente, cycle, chaîne valide de 101 liens et chaîne cassée de 101 liens. Ces chaînes sont des **simulations en mémoire**, sans conclusion sur la limite de suivi de liens du noyau. Des noms spéciaux `@`, `*`, `-n` et `x[2]` ont également été essayés dans le lab.

## Bilan au 30 octobre 2026

**39 fiches examinées : 34 rejouées, 5 partielles, 0 défaut subsistant démontré et 0 fiche entièrement non rejouée.** Les cinq partielles sont F48, F53, F57, F64 et F75 : respectivement, Git interdit, permissions IPsec insuffisantes, absence d'Hyper-V, correction de lab suspendue, et référentiel ANSSI/contrat non vérifiés. Ces nombres ne certifient ni les parties explicitement non rejouées ni l'intégralité des cours.

Le défaut F86 observé avant la reprise reste documenté ; son contre-exemple a été rejoué après la correction et la page active présente désormais la condition attendue. Aucun cours ni test existant n'a été modifié, aucune commande Git ni génération `dist/` ni déploiement n'a été effectué.
