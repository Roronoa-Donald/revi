# Contre-vérification indépendante du lot 2 — échantillon S1

Journal commencé le 30 octobre 2026. Périmètre : F100 F151 F129 F42 F135 F159 F70 F195 F183 F174 F52 F40 F191 F54 F89 F119 F178 F95 F38 F111 F197. Seuls les constats ci-dessous ont un verdict ; le journal est complété par groupes.

## Méthode et limites communes

- Les lignes correspondantes de `verification/04-erreurs-a-corriger.csv` et `corrections/suivi.csv` ont été lues. Le tri croissant de `SHA-256("20261030:" + id)` des 70 lignes de `suivi.csv` reclassées S1 et affectées au lot 2 donne exactement les 21 identifiants demandés.
- Verdicts : **prouvé/rejoué** = contrôle ciblé effectivement exécuté et concluant, dans les limites précisées ; **partiel** = correction présente mais réserve ou élément non rejoué ; **contesté** = assertion insuffisamment étayée ou contredite ; **défaut** = contre-exemple démontré. Un verdict ne certifie pas l'ensemble d'un cours.
- Rejeux dans Bubblewrap : espaces de noms isolés, réseau extérieur absent, sources et pages montées en lecture seule, répertoire temporaire privé. Les réponses d'exercices `analyse` sont des textes sélectionnés par le moteur local, non exécutés comme du code. Aucun code étudiant n'a été lancé hors isolation.
- Les pages ont aussi été ouvertes dans Chromium/ChromeDriver sous cette isolation, sans passer par une instance authentifiée de `server.js`. Treize réponses correctes de QCM, trois réponses incorrectes et une carte retournée ont été vérifiées ; cela ne prouve ni l'injection d'authentification ni l'API en production.
- Le générateur lancé avec `--check` dans l'isolation confirme 221 pages synchronisées pour 17 cours concernés. À 20 h 32 UTC, trois pages de `b1-linux` étaient désynchronisées ; les écarts concernaient des ateliers distincts des passages MBR et UID. Ces pages ont changé sur disque pendant la relecture : le nouveau contrôle à 20 h 54 UTC confirme 13 pages `b1-linux` synchronisées. Nous n'avons écrit aucune régénération dans le dépôt. Les ateliers de `b1-algo/chapitres/chapitre5.html` et `b1-python/chapitres/chapitre1.html` étaient synchronisés avec leurs catalogues lors du contrôle.
- Les calculs ci-dessous ont été construits à partir des données affichées dans les grilles, puis soumis à `server/exercises/runner.js` avec `server/services/execution/index.js` et son sélecteur local `analyse`. Les tests existants ne sont pas modifiés. Les verdicts se rapportent aux fichiers observés pendant cette relecture, pas à une mise en production.

## Groupe 1 — grilles et contre-exemples

### F129 — défaut

**Preuve positive.** `b1-ccna1/chapitres/chapitre1.html:98` et `:283` distinguent désormais 100BASE-T4/catégorie 3 de 100BASE-TX/catégorie 5. Dans `server/exercises/b1-ccna1.js:81`, les trois cas de `cc-c1-e3` recalculés selon les réponses attendues sont acceptés par le moteur : 3/3.

**Contre-exemple rejoué.** L'énoncé demande une catégorie « 5, 5e ou 6a adaptée » sur un canal d'au plus 100 m, sans imposer la catégorie minimale. Dans le cas 3, remplacer seulement `cafe : cat5` par `cafe : cat5e` pour le site `cafe 100m`, sans changer les autres lignes ni `cat6a posees : 1`, donne 2/3 et `wrong_output` au cas 3. Or Cisco indique que 100BASE-TX fonctionne aussi sur catégorie 5e : https://www.cisco.com/c/en/us/td/docs/routers/connectedgrid/modules/switch/gsg/cgr-esm-getting_started/intro.html. La grille refuse donc une réponse compatible avec sa consigne. Aucun câble physique n'a été essayé.

### F191 — défaut

**Emplacement actif.** Le constat initial visait `signature=CLEAN` pour une commande. Il subsiste dans la grille de persistance `hk3-c6-e2`, `b3-hacking/chapitres/chapitre6.html:284`, et dans le catalogue effectivement utilisé `server/exercises/b3-hacking.js:661` ; copie par chapitre : `server/exercises/b3-hacking/chapitre6.js:44`. En revanche, le test F191 existant cible `hk3-c6-e1`, une autre grille consacrée à des chaînes de webshell, dont l'énoncé a effectivement été nuancé.

**Rejeu.** Les trois sorties de `hk3-c6-e2`, recalculées à partir des quatre familles de signatures indiquées, sont acceptées : 3/3. Pour le troisième cas, l'absence de correspondance impose `malicious=FALSE signature=CLEAN risk=LOW`. Une réponse prudente `malicious=NON_EVALUE signature=AUCUNE_CORRESPONDANCE risk=NON_EVALUE` est rejetée au cas 3 : 2/3, `wrong_output`. Le moteur suit donc toujours la consigne contestée, laquelle ne permet pas de déduire l'innocuité ou le risque global d'une commande de l'absence de quatre chaînes. Aucun script, commande suspecte ou logiciel réel n'a été exécuté. Limite : le rejeu porte sur le moteur local, pas sur une soumission HTTP authentifiée.

### F183 — prouvé/rejoué

L'énoncé actif `b3-reseau-lan/chapitres/chapitre4.html:188`–`:192` précise le modèle : un seul gagnant, départage alphabétique, les autres étiquetés secours même à égalité ; il distingue explicitement ECMP réel. Dans `lan3-c4-e1`, les trois cas ont été recalculés indépendamment puis soumis au moteur : 3/3. Pour le cas 1, référence 100 Mbit/s, P1=(100,100) et P2=(1000,1000) ont chacun le coût 2 ; P1 gagne par ordre alphabétique. Donner deux `BEST_PATH` est rejeté au cas 1, conformément au modèle annoncé. La RFC 2328 § 2.4 décrit plusieurs prochains sauts de coût égal : https://www.rfc-editor.org/rfc/rfc2328.html#section-2.4. Aucun routeur OSPF réel n'a été testé.

### F178 — prouvé/rejoué

`b3-etude-quantitative/chapitres/chapitre2.html:225` et `server/exercises/b3-etude-quantitative/chapitre2.js:52` imposent les minima, capacités, plus forts restes et le départage par ordre d'apparition. Six réponses ont été recalculées par divisions entières et restes, puis acceptées par le moteur : 6/6. Notamment, `n=1`, strates `1,1,1` donne `1,0,0`, et non `0,0,0` ; avec `n=5`, tailles `1,2,4` et minima `1,0,1`, le résultat est `1,1,3` ; minima totalisant 3 pour `n=1` et `n=4` pour une population de 3 produisent `IMPOSSIBLE`. La variante `0,0,0` est rejetée au cas 3. Le clic du QCM sur `1,0,0` a également été rejoué dans Chromium isolé. Les 5 376 et 16 750 répartitions mentionnées dans le suivi n'ont pas été rejouées ici ; l'exercice est une grille de réponses fixes, pas un programme de répartition général testé sur des entrées arbitraires.

## Groupe 2 — Linux, SNMP et SSH

### F100 — prouvé/rejoué

`b1-linux/chapitres/chapitre5.html:101` traite 1000 comme convention configurable ; `linux/chapitres/chapitre3.html:297` demande ce que signifie `UID_MIN=1000`, sans affirmer qu'un UID révèle à lui seul la nature du compte. Le manuel des paramètres distingue `UID_MIN` et `SYS_UID_MAX` : https://man7.org/linux/man-pages/man5/login.defs.5.html.

La page de l'atelier `b1-linux/chapitres/chapitre3.html` et le catalogue `server/exercises/b1-linux.js` concordent pour `lx-c3-e3`. Son corrigé Bash a été exécuté sous isolation sur l'exemple, les trois cas déclarés et une entrée indépendante `999,1000,1001` : 5/5 ; cette dernière donne un compte « système » et deux « humains » selon la convention explicitement fictive. Le QCM `root=0` a été cliqué après le dernier contrôle de synchronisation. Il ne s'agit pas d'une classification d'utilisateurs réels ; aucun compte système n'a été créé.

### F151 — prouvé/rejoué

`b3-supervision/chapitres/chapitre2.html:116` et son QCM `:361` rapportent l'intervalle depuis la réinitialisation de la gestion réseau, pas nécessairement le démarrage du système. Le clic de la bonne réponse fonctionne dans Chromium isolé. Les RFC https://www.rfc-editor.org/rfc/rfc3418.html et https://www.rfc-editor.org/rfc/rfc2578.html confirment respectivement l'origine du compteur et les centièmes de seconde modulo 2³². Calcul indépendant exécuté : 2³²/100 = 42 949 672,96 s, soit 497,102696 jours ; incrémenter 2³²−1 revient à zéro modulo 2³². Aucun agent SNMP réel ni redémarrage n'a été observé.

### F135 — partiel

`b1-ccna1/chapitres/chapitre6.html:84` remplace le minimum SSH historique non qualifié par la mention IOS XE 17.10 et 2 048 bits ; le QCM à `:324` accepte la commande RSA affichée. Le clic a été rejoué dans Chromium isolé. La documentation Cisco confirme ce minimum pour IOS XE 17.10, mais précise aussi qu'à partir de 17.11 la poursuite de l'utilisation d'une clé faible est possible avec désactivation de la conformité CSDL et redémarrage : https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-secure-shell-v2-0.html. Le « depuis 17.10 » de la page ne mentionne pas cette exception ; la réserve ne recommande pas de désactiver la protection. Aucun équipement IOS XE n'a été testé.

### F95 — prouvé/rejoué

`b1-linux/chapitres/chapitre2.html:127`–`:134` attribue les quatre entrées à MBR et distingue partition étendue et GPT ; le QCM à `:351` nomme MBR. Ses réponses correcte et incorrecte ont été cliquées après le contrôle de synchronisation. En isolation, `sfdisk` sur deux fichiers-images temporaires de 32 Mio a créé quatre partitions primaires MBR et cinq partitions GPT ; après tentative d'ajout d'une cinquième entrée MBR, le message était `All partitions used` et la table contenait toujours quatre entrées. Attention : `sfdisk` a renvoyé le code 0 malgré l'absence d'ajout ; le résultat a été vérifié en relisant les tables JSON. Aucun disque réel n'a été modifié. Référence : https://learn.microsoft.com/en-us/windows-server/storage/disk-management/change-disk-partition-scheme.

## Groupe 3 — Python, terminaison et PostgreSQL

### F89 — prouvé/rejoué

La page active `b1-python/chapitres/chapitre1.html:164`–`:165` distingue plancher et type des opérandes ; son QCM `:430` et celui de `b1-python/chapitres/simulateur-examen.html:221` en tiennent compte. Le premier QCM a été cliqué dans Chromium isolé. Python 3.14.7 exécuté dans l'isolation donne `-3 // 2 = -2`, `7 // 2 = 3` de type `int`, `7.0 // 2 = 3.0` de type `float`, et `-3.0 // 2 = -2.0` de type `float`. Ces observations concernent les types `int`/`float` cités, pas tous les objets personnalisables. Référence : https://docs.python.org/3.14/reference/expressions.html#binary-arithmetic-operations.

### F111 — prouvé/rejoué

L'exemple Python de Syracuse a été extrait avec un parseur HTML de `b1-algo/chapitres/chapitre5.html:133`, puis exécuté tel quel dans l'isolation : entrées `1 → 0 étape`, `6 → 8 étapes`, `0` et `-3 → « La valeur doit être strictement positive. »`. La page précise que l'atteinte de 1 pour tout entier positif reste une conjecture. Ces quatre exécutions ne prouvent pas la terminaison générale et aucun entier non positif n'entre dans la boucle. Référence de recherche primaire : https://arxiv.org/abs/1909.03562.

### F119 — partiel

`b1-algo/chapitres/chapitre5.html:118`–`:130` explique désormais qu'un progrès apparent ne suffit pas et présente un compteur entier borné ; le bloc Python extrait de cette page s'exécute et affiche `0`. Le QCM à `:313` a été cliqué correctement. Le contre-exemple rationnel exact `x=1; x←x/2` a été exécuté sur 512 tours : `x=1/2**512 > 0`. Plus généralement, `1/2**n > 0` pour tout entier fini `n` démontre l'absence d'arrêt dans ce modèle exact.

**Réserve.** Le résumé de la même page, `b1-algo/chapitres/chapitre5.html:355`, dit encore « Terminaison = initialisation + condition + progression », sans rappeler la borne ou la preuve de fin en temps fini ; lu isolément, il peut réintroduire la simplification que le développement corrige. L'exécution finie de 512 tours ne constitue pas à elle seule une preuve d'infinité.

### F174 — prouvé/rejoué

`b3-sql/chapitres/chapitre1.html:92` conditionne la reprise à la synchronisation WAL et au stockage fiable, distingue `synchronous_commit=off` et mentionne sauvegardes/réplication. Rejeu avec PostgreSQL 18.6 dans un cluster temporaire isolé, sans port réseau externe : `fsync=on`, `wal_writer_delay=10000ms`, `wal_writer_flush_after=0`, puis `synchronous_commit=off`, insertion et `COMMIT`. À la réponse du `COMMIT`, le LSN enregistré après l'insertion était encore 2 304 octets au-delà du LSN WAL synchronisé. Cela démontre un cas d'acquittement avant synchronisation du WAL antérieur, avec les réglages de cette expérience.

Aucune perte de données, panne électrique, réplication ni restauration n'a été provoquée ou vérifiée. Les réglages de l'expérience ne sont pas présentés comme ceux d'un serveur réel. Références : https://www.postgresql.org/docs/18/runtime-config-wal.html et https://www.postgresql.org/docs/18/wal-reliability.html.

## Groupe 4 — Vite, TLS, HTTP et WAN

### F42 — prouvé/rejoué

Dans `react/chapitres/chapitre1.html:93`, le cours distingue Vite 8.3.5, Rolldown et Oxc ; aux lignes `:94`–`:98`, il distingue aussi `create-vite` 9.3.3 de Vite 8.3.5. Les métadonnées JSON officielles des deux versions ont été lues et contrôlées par programme : leurs contraintes Node sont `^20.19.0 || >=22.12.0`. Le calcul `semver.satisfies` rejette 20.18.0, 21.0.0 et 22.11.0, et accepte 20.19.0, 22.12.0 et 22.23.2. La question 7 du QCM livré `react/qcm-100.js` correspond à `scripts/questions-react.js` ; dans Chromium, le choix « Rolldown et Oxc » du QCM de chapitre a été cliqué et accepté.

**Limite.** Aucun projet Vite n'a été installé, démarré ni construit ; les dépendances non épinglées et la disponibilité future des versions ne sont pas garanties par ce contrôle. Références : https://registry.npmjs.org/vite/8.3.5, https://registry.npmjs.org/create-vite/9.3.3 et https://vite.dev/blog/announcing-vite8.

### F195 — prouvé/rejoué

La comparaison automatique du texte HTML analysé de `b3-cryptographie/chapitres/chapitre6.html:82`–`:84` avec l'en-tête du texte officiel de la RFC 9846 constate que cette RFC, datée de juillet 2026, remplace notamment la RFC 8446 ; la page conserve l'historique de publication initiale de TLS 1.3 en 2018. La source est `server/content/b3-cryptographie/chapitre6.js:26`.

**Limite.** Il s'agit du rejeu d'une comparaison documentaire et structurelle, pas d'une négociation TLS ni d'une vérification de toute l'implémentation du protocole. Référence : https://www.rfc-editor.org/rfc/rfc9846.txt.

### F54 — prouvé/rejoué

L'extrait adapté et le QCM de `b3-anglais/chapitres/chapitre2.html:104` et `:388` distinguent l'effet visé des réponses HTTP, conformément à la RFC 9110 § 9.2.2. Dans Chromium, la bonne réponse a été acceptée ; un choix faux a été refusé et la bonne réponse révélée. Un serveur HTTP fictif créé pour le contrôle, exécuté en isolation, reçoit deux `DELETE` identiques : `204`, puis `404`, ressource toujours absente et deux traces ; deux `POST` fictifs produisent deux opérations. Ce modèle illustre la distinction, il ne vérifie pas une API réelle.

**Limite.** Le comportement d'une API dépend aussi de son contrat ; aucun paiement, service externe ou scénario complet d'authentification n'a été exercé. Référence : https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2.

### F40 — prouvé/rejoué

`b1-reseaux/chapitres/chapitre1.html:109` définit le WAN par l'interconnexion de sites distants, sans seuil kilométrique universel ni location obligatoire. Le QCM de la page à `:317` a été effectivement cliqué dans Chromium et accepte « des réseaux locaux de sites distants ». La définition a été comparée à la présentation Cisco : https://www.cisco.com/site/us/en/learn/topics/networking/what-is-a-wan-wide-area-network.html.

**Limite.** Le clic vérifie le comportement de ce QCM et non le fonctionnement d'un WAN réel ; aucun équipement réseau n'a été configuré.

## Groupe 5 — classement, français et disponibilité

### F159 — partiel

`b1-merise/chapitres/chapitre1.html:129`–`:164` présente trois grilles sans les anciennes étiquettes distinctes `d`/`i`, demande de justifier chaque classement et précise que la justification libre nécessite une relecture humaine. Pour `mr-c1-e1` (`server/exercises/b1-merise.js:5`), les réponses calculées indépendamment à partir des trois jeux visibles ont été soumises au moteur réel : **3/3** ; la grille de départ de la page correspond au catalogue, et la projection cliente ne contient ni tests ni solution.

**Réserves.** Chaque ligne de la grille est encore précédée de `# Données :`, y compris `chiffre d affaires de mars 12000 euros`, attendu comme `information` : ce préfixe générique ne donne plus deux catégories distinctes mais peut prêter à confusion avec la catégorie à choisir. C'est une ambiguïté constatée dans le libellé, pas une confusion mesurée chez des apprenants. Le correcteur attend aussi, pour son modèle, `13 juin : donnee` ; il n'évalue pas la justification et aucune relecture humaine ni étude auprès d'apprenants n'a été rejouée.

### F197 — prouvé/rejoué

`b1-fr-pro/chapitres/chapitre3.html:107` n'interdit plus automatiquement « Je suis un chercheur » : il distingue l'énoncé de profession et la caractérisation selon le contexte. Dans Chromium, le QCM à `:345` accepte « Les deux sont possibles » pour « Je suis chercheur » et « Je suis un chercheur passionné » ; un choix qui interdit l'article est refusé. Pour la grille active `fr-c3-e3`, trois réponses calculées indépendamment ont été acceptées **3/3** ; le remplacement d'un cas « à contextualiser » par « article à enlever » est refusé au premier cas.

**Limite.** Le correcteur applique des catégories données dans l'exercice : ces essais ne prouvent pas la correction de toute phrase possible ni une évaluation auprès d'apprenants. La distinction a été confrontée à la grammaire de l'université de Jyväskylä : https://research.jyu.fi/grfle/article-zero.html#085.

### F52 — prouvé/rejoué

Le modèle à `b3-cloud-azure/chapitres/chapitre3.html:118` et la grille `az3-c3-e1` exigent des niveaux nécessaires en série, une même période et des défaillances indépendantes sans cause commune ; ils indiquent que le résultat est fictif et non contractuel. Calcul décimal indépendant : `0,999² × 100 = 99,8001 %`, soit `(1 − 0,999²) × 8 760 = 17,51124 h` d'indisponibilité théorique par année de 8 760 heures. Le QCM à `:405` accepte ce résultat dans Chromium ; le moteur de la grille accepte **3/3** calculs indépendants.

**Limite.** Aucun déploiement Azure ni SLA contractuel n'a été testé ; l'indépendance est une hypothèse du modèle, non une propriété prouvée d'une architecture réelle. Référence sur le caractère contractuel et les conditions des SLA : https://learn.microsoft.com/en-us/azure/reliability/concept-service-level-agreements.

## Groupe 6 — mémoire et estimation agile

### F38 — prouvé/rejoué

`masterclass-apprendre/chapitres/chapitre1.html:91` situe le `7 ± 2` de Miller en 1956 et refuse d'en faire une capacité universelle ; `uiux/chapitres/chapitre3.html:119` indique la même réserve. Le QCM de la masterclass à `:275` a été cliqué dans Chromium : il accepte l'interprétation historique dépendant des tâches et personnes. La grille `mc2-c1-e3` décrit explicitement sa règle de sept et ses groupes de trois comme fictifs : les réponses calculées indépendamment sont acceptées **3/3**. Pour `ux2-c3-e2`, le calcul fictif `arrondi(150 × log2(n+1))` et la limite fictive 7 donnent **4/4** sur les cas visibles, dont zéro option et les valeurs 7 et 8 ; les grilles de départ correspondent aux catalogues.

**Limite.** Les deux grilles testent des règles artificielles, pas les capacités mnésiques ou décisionnelles d'une personne. Aucun apprenant n'a été évalué et le volet de progression du lot 3, signalé non lancé dans le suivi, n'a pas été vérifié. L'article historique de Miller est consultable ici : https://psychclassics.yorku.ca/Miller/.

### F70 — prouvé/rejoué

La réponse de `b3-agile/chapitres/cartes.html:98` affirme que les story points sont relatifs aux références de l'équipe et non directement comparables entre équipes. Dans Chromium isolé, le retournement effectif de cette carte a réussi et exposé cette réponse. La présentation Atlassian consultée décrit aussi une estimation relative et des échelles susceptibles de différer selon les équipes : https://www.atlassian.com/agile/project-management/estimation.

**Limites.** Le rejeu porte sur la carte et sa réponse, sans estimation par une équipe réelle ni comparaison empirique de méthodes. Par simple lecture, une affirmation voisine dans `b3-agile/chapitres/chapitre4.html:66` qualifie encore les story points de « scientifiquement plus précis et reproductible » que les durées ; cette affirmation comparative distincte n'a pas été vérifiée et ne découle pas de la correction de l'échelle.

## Rejeu après corrections — 30 octobre 2026

Les verdicts « défaut » des groupes précédents décrivent l'état observé **avant** les nouvelles corrections. Les contrôles suivants, effectués après la régénération des pages, les remplacent pour l'état présent.

### F129 après correction — prouvé/rejoué

Le catalogue actif `server/exercises/b1-ccna1.js:87` et la consigne HTML `b1-ccna1/chapitres/chapitre1.html:283` énoncent maintenant la convention `100m : cat5`, `1g : cat5e`, `10g : cat6a` et précisent que des catégories supérieures peuvent également convenir en pratique. Le contenu visible dans Chromium a été contrôlé ; `parse5` confirme l'identité de la consigne et du départ entre page et catalogue.

À partir des trois jeux affichés, un oracle indépendant a calculé les réponses soumises à `runTests` et au sélecteur local réel : **3/3**. Dans le cas 3, `cafe : cat5e`, choix physiquement compatible mais désormais hors convention, est refusé (**2/3**, `wrong_output`) ; une catégorie erronée dans chacun des deux premiers cas et un décompte erroné dans le troisième sont également refusés. La vérification ne prétend pas que la catégorie 5e soit physiquement inadaptée et aucun câble n'a été essayé.

### F191 après correction — prouvé/rejoué

La consigne visible de `b3-hacking/chapitres/chapitre6.html:273` et le catalogue actif `server/exercises/b3-hacking.js:661` présentent quatre recherches de motifs, sans lancer de commandes ; ils indiquent que correspondance comme absence de correspondance ne prouvent ni intention ni risque. Les deux imposent `malicious=NON_EVALUE` et `risk=NON_EVALUE`, avec `signature=AUCUNE_CORRESPONDANCE` en l'absence de motif. Le contrôle DOM Chromium et la comparaison `parse5` page/catalogue ont réussi.

Un oracle indépendant des quatre règles a recalculé les trois cas : **3/3** par le moteur réel. L'ancien verdict `malicious=FALSE signature=CLEAN risk=LOW` est refusé au cas 3 (**2/3**) ; l'ancien verdict `TRUE`/`CRITICAL` est refusé au cas 1 (**0/3**), et une signature fausse au cas 2 (**1/3**). L'exemple affiché `BASH_REVERSE_SHELL` a été recalculé séparément. Les chaînes de commande n'ont pas été exécutées ; ces essais portent sur les cas fixes d'une grille, pas sur les performances d'un détecteur réel.

Pour les deux cours, `generate-courses.js --check` en isolation indique **26 pages à jour sur 2 cours**. La projection cliente contrôlée ne contient ni tests ni solution. Le navigateur a ouvert les fichiers locaux, sans tester l'authentification ni une soumission API distante.

### Reproduction minimale des deux variantes

Depuis la racine du dépôt, avec `bwrap`, Node et les dépendances déjà installés :

```sh
root="$PWD"; node_bin="$(command -v node)"
bwrap --unshare-all --new-session --die-with-parent --clearenv \
  --ro-bind /usr /usr --ro-bind /lib /lib --ro-bind /lib64 /lib64 \
  --dir /etc --ro-bind /etc/ld.so.cache /etc/ld.so.cache \
  --proc /proc --dev /dev --tmpfs /tmp --dir /runtime \
  --ro-bind "$node_bin" /runtime/node --dir /work \
  --ro-bind "$root/server" /work/server --ro-bind "$root/node_modules" /work/node_modules \
  --setenv HOME /tmp --setenv PATH /runtime:/usr/bin:/bin --chdir /work \
  /runtime/node - <<'NODE'
const { getExercise } = require('./server/exercises');
const { runTests } = require('./server/exercises/runner');
const { execute } = require('./server/services/execution');
const variants = [
  ['cc-c1-e3', 'cafe : cat5\n', 'cafe : cat5e\n'],
  ['hk3-c6-e2', 'malicious=NON_EVALUE signature=AUCUNE_CORRESPONDANCE risk=NON_EVALUE',
    'malicious=FALSE signature=CLEAN risk=LOW']
];
(async () => {
  for (const [id, from, to] of variants) {
    const item = getExercise(id);
    const baseline = await runTests(item, item.solution, { execute });
    const changed = item.solution.replace(from, to);
    if (changed === item.solution) throw new Error('Variante absente : ' + id);
    const result = await runTests(item, changed, { execute });
    console.log(`${id}: référence=${baseline.passed}/${baseline.total}; variante=${result.passed}/${result.total}; ${result.stop.reason}; cas ${result.stop.testIndex + 1}`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
NODE
```

Sortie observée :

```text
cc-c1-e3: référence=3/3; variante=2/3; wrong_output; cas 3
hk3-c6-e2: référence=3/3; variante=2/3; wrong_output; cas 3
```

Cette reproduction minimale utilise la solution du catalogue ; les **3/3 calculés indépendamment** rapportés plus haut proviennent d'un oracle distinct et non de cette solution. Les soumissions `analyse` sont des textes sélectionnés localement et non du code exécuté.

**Bilan S1 actuel : 18 prouvés/rejoués, 3 partiels (F135, F119, F159), aucun défaut subsistant démontré sur les deux corrections rejouées.** Ce bilan ne certifie ni les cours entiers ni les limites mentionnées pour les cas partiels.

## Annexe — console CCNA et grille, 30 octobre 2026

Cette vérification complémentaire est hors des 21 verdicts S1 et ne change pas leur décompte.

**Console — concordance documentaire, sans équipement.** Dans `server/content/b1-ccna1/chapitres-4-6.js:349` et `b1-ccna1/chapitres/chapitre6.html:94`, les dix minutes sont attribuées à la documentation IOS de 2019, avec réserve sur la plateforme et la configuration ; `logging synchronous` est décrit comme un affichage sur une ligne séparée, suivi du réaffichage de l'invite. Les deux concordent avec les références Cisco mises à jour le 16 décembre 2019 : [exec-timeout](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/fundamentals/command/cf_command_ref/D_through_E.html) et [logging synchronous](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/fundamentals/command/cf_command_ref/L_through_mode.html). Le paragraphe de la source et celui de la page active ont été comparés par parseur HTML ; auparavant, leur affichage et celui de la consigne ont aussi été observés dans Chromium isolé. Ce n'est pas une mesure sur un routeur ou commutateur, ni une garantie pour toute version ou configuration. La référence IOS précise aussi qu'à expiration l'EXEC peut reprendre une connexion existante ; en l'absence de connexion, il déconnecte la session entrante.

**Réserve résiduelle.** Les formulations « jamais déconnecté » restent dans `b1-ccna1/chapitres/chapitre6.html:101` et `:404`, ainsi que dans leur source `server/content/b1-ccna1/chapitres-4-6.js:361` et `:414`. Elles sont trop absolues : `exec-timeout 0 0` désactive le délai EXEC d'inactivité, pas toutes les causes possibles de déconnexion. Par exemple, Cisco documente pour des lignes VTY un `absolute-timeout` configuré qui termine une connexion même active : [référence Cisco mise à jour le 29 juillet 2016](https://www.cisco.com/c/en/us/td/docs/ios/termserv/command/reference/tsv_book/tsv_a1.html). Cette possibilité est documentaire ; aucune combinaison de commandes n'a été essayée sur matériel. Une formulation limitée à l'absence d'expiration par le minuteur EXEC éviterait cette ambiguïté.

**Grille `cc-c6-e3` — rejouée sur ses trois cas fixes.** `server/exercises/b1-ccna1.js:661` et `b1-ccna1/chapitres/chapitre6.html:228` concordent pour l'énoncé, les données initiales et l'exemple. Les dix minutes, la minute DNS et les effets de l'absence de `s`, `t` ou `d` sont explicitement présentés comme des hypothèses d'un modèle fictif. Un oracle distinct de la solution du catalogue a appliqué l'ordre du premier réglage manquant `s`, `t`, `d` aux données affichées, puis soumis ses réponses à `runTests` et au service d'exécution réels. Le moteur accepte **3/3** et rejette les trois erreurs ciblées ci-dessous. L'exemple a été recalculé séparément : il ne constitue pas un quatrième test du moteur.

```text
EXEMPLE recalculé indépendamment:
s1 : fluide
s2 : gene (motif dns)
s3 : gene (motif syslog)
sessions fluides : 1/3
GRILLE recalculée indépendamment:
[Cas 1 — Parfaites]
lab1 : fluide
lab2 : fluide
sessions fluides : 2/2

[Cas 2 — Sans timeout]
lab1 : gene (motif timeout)
lab2 : fluide
sessions fluides : 1/2

[Cas 3 — Aucun réglage]
lab1 : gene (motif syslog)
lab2 : gene (motif syslog)
lab3 : gene (motif syslog)
sessions fluides : 0/3
MOTEUR réel runTests+execute: oracle 3/3; aucun arrêt
MOTEUR mutation cas 1: fluide → timeout: 0/3; wrong_output; cas 1
MOTEUR mutation cas 2: timeout → fluide: 1/3; wrong_output; cas 2
MOTEUR mutation cas 3: syslog → dns: 2/3; wrong_output; cas 3
ROUTE réelle Fastify injectée: anonyme 401; jeton local oracle 3/3; mutation timeout 1/3 wrong_output
```

Rejeu effectué sous Bubblewrap, sans réseau et avec dépôt monté en lecture seule ; la route Fastify a été injectée en mémoire avec une identité locale temporaire, pas appelée sur le service déployé. Les réponses `analyse` sont des textes, non des programmes exécutés. Les trois cas et mutations ci-dessus ne prouvent ni le comportement d'IOS, ni l'exactitude de toutes les configurations possibles. Les commandes de rejeu utilisées sont `sh /tmp/relecture-s1.8yyMthBd/ccna6_minimal_replay.sh` et `/tmp/relecture-s1.8yyMthBd/sandbox.sh /runtime/node /audit/ccna6_replay.cjs` depuis la racine ; ces scripts sont **temporaires**, les données et sorties utiles sont conservées ci-dessus.

## Reprise — `exec-timeout 0 0`, 30 octobre 2026

**Verdict ciblé : rejoué.** La réserve précédente est conservée comme constat historique. Parmi les 13 pages HTML locales du cours analysées, le texte contient sept occurrences pertinentes de `0 0` : six descriptions limitent explicitement l'effet au délai EXEC d'inactivité ; la septième est une question, et non une affirmation. Les anciennes formulations absolues recherchées ne sont plus présentes dans le périmètre inspecté.

- `b1-ccna1/chapitres/chapitre6.html:94`, `:101`, `:370` et `:404` : quatre descriptions qualifiées ; la première précise aussi que d'autres causes peuvent terminer la session.
- `b1-ccna1/chapitres/formules.html:209` et `:211` : le mémo associe `0 0` à la désactivation du délai EXEC d'inactivité.
- `b1-ccna1/chapitres/simulateur-examen.html:119` et `:120` : l'énoncé pose la question ; le corrigé limite l'effet à l'inactivité et mentionne les autres causes possibles.
- Sources correspondantes : `server/content/b1-ccna1/chapitres-4-6.js:353`, `:361`, `:382`, `:414` et `server/content/b1-ccna1/pages.js:358`, `:451`, `:452`. Le contrôle du générateur confirme la concordance des 13 pages du cours avec leurs sources.

**Contrôles effectivement exécutés.** Un parseur HTML a inventorié le texte des 13 pages hors scripts, styles et SVG ; les sept contextes ont été examinés. Une recherche complémentaire dans les HTML et JavaScript actifs a ciblé les anciennes formulations et des termes absolus à proximité de la session ou du délai. En mémoire, chacun des six effets a été remplacé successivement par « jamais déconnecté » et « sessions jamais expirées » : les 12 variantes ont été détectées comme absolues et dépourvues de qualification. Dans Chromium isolé, les quatre descriptions du chapitre et celle du mémo étaient visibles ; le corrigé du simulateur s'est ouvert et affichait la qualification attendue.

```text
HTML parse5 : 13 pages; 7 occurrences textuelles = 6 effets qualifiés + 1 question; anciennes formulations exactes absentes
Sources : 7 lignes avec 0 0 dans les deux fichiers
chapitre6.html: 4/4 explications qualifiées
formules.html: 1/1 explications qualifiées
simulateur-examen.html: 1/1 explications qualifiées
Mutations en mémoire: 12/12 formulations absolues détectées et sans qualification
Chromium chapitre6: 4/4 descriptions visibles et qualifiées
Chromium formules: count=1, visible=true, qualified=true
Chromium simulateur: before=false, after=true, visible=true, qualified=true, otherCauses=true
[ok] cours à jour (13 pages, 1 cours)
```

Les deux lignes Chromium condensent les champs des sorties JSON. Un premier motif de contrôle, trop strict, rejetait à tort l'incise « en production » ; après correction du motif, le contrôle complet ci-dessus a réussi. Une première tentative dans un bac minimal omettait le montage de `b1-sql`, requis par le générateur ; le montage ajouté en lecture seule, le contrôle a réussi.

**Limites.** Le constat d'absence est borné aux fichiers et aux formulations contrôlés, pas à toutes les paraphrases imaginables. Hors du cas `0 0`, la carte `b1-ccna1/chapitres/cartes.html:112` résume encore `exec-timeout minutes seconds` par « déconnexion », sans préciser l'inactivité ; cette formulation générale ne sert pas ici de preuve sur `0 0`. La référence Cisco IOS datée de 2019 citée dans l'annexe précédente reste une référence documentaire : aucun matériel, configuration particulière ni service déployé n'a été testé. Aucun accès externe n'a été effectué pour cette reprise ; les essais ont tourné avec réseau isolé et fichiers du dépôt en lecture seule.

Reproduction du contrôle de synchronisation, depuis la racine du dépôt :

```sh
root="$PWD"; node_bin="$(command -v node)"
bwrap --unshare-all --new-session --die-with-parent --clearenv \
  --ro-bind /usr /usr --ro-bind /lib /lib --ro-bind /lib64 /lib64 --symlink usr/bin /bin \
  --dir /etc --ro-bind /etc/ld.so.cache /etc/ld.so.cache \
  --proc /proc --dev /dev --tmpfs /tmp --dir /runtime --ro-bind "$node_bin" /runtime/node \
  --dir /work --ro-bind "$root/server" /work/server --ro-bind "$root/scripts" /work/scripts \
  --ro-bind "$root/node_modules" /work/node_modules --ro-bind "$root/b1-ccna1" /work/b1-ccna1 \
  --ro-bind "$root/b1-sql" /work/b1-sql --setenv HOME /tmp --setenv PATH /runtime:/usr/bin:/bin \
  --chdir /work /runtime/node /work/scripts/generate-courses.js --check b1-ccna1
```

Cette reprise complémentaire ne modifie pas le décompte des 21 verdicts S1.

### Reprise — carte CCNA, 30 octobre 2026

**Rejoué :** la réponse de `server/content/b1-ccna1/chapitres-4-6.js:429` correspond à celle de `b1-ccna1/chapitres/cartes.html:112` et précise le délai EXEC d'inactivité. Un clic WebDriver dans Chromium isolé, après défilement instantané, retourne la carte (`aria-pressed` passe de `false` à `true`). La réserve précédente est levée pour cette carte ; aucun équipement IOS ni service déployé n'a été testé.
