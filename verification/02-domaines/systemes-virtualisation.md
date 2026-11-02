# Systèmes et virtualisation

**Appréciation : à corriger avant publication.** Chapitres sélectionnés : Linux B2 1 et 2. La famille regroupe notamment Linux, Windows, virtualisation, architecture et bureautique : 11 cours avec chapitre 1, 198 exercices, 616 QCM et 364 cartes. Les 20 exercices, 10 QCM et 10 cartes sont tirés dans toute la famille ; voir `../echantillons-identifiants.json`.

## Exactitude et constats

- **F225 — D8/D9, S1, observé** — Les six chapitres Linux B3 annoncent des réalisations Python, par exemple `b3-linux/chapitres/chapitre1.html:78`, alors que leurs trois ateliers par chapitre sont en Bash. Clarifier les objectifs ou fournir les activités Python annoncées.

- **F220/F221 — D12, S0, observé** — `admin-vm/chapitres/chapitre4.html:82` promet des performances constantes pour les disques épais et assimile l'espace thin aux fichiers visibles ; `chapitre6.html:125` garantit une migration sans interruption. Ces propriétés dépendent de la charge et de l'environnement ; une bascule vMotion peut affecter les applications sensibles. Sources officielles consultées le 29 octobre 2026 : https://knowledge.broadcom.com/external/article/343258/understanding-largescale-sequential-writ.html ; https://knowledge.broadcom.com/external/article/337348/using-thin-provisioned-disks-with-virtua.html ; https://knowledge.broadcom.com/external/article/407273/sensitive-virtual-machines-become-impact.html.

- **F209/F210 — D9, S0, observé** — Les tests acceptent un arrondi supérieur de la charge (`rd_winserver/chapitres/chapitre2.html:190`) et une mauvaise tâche pour la phase d'exploitation (`admin-vm/chapitres/chapitre3.html:189`). Deux entrées indépendantes montrent ces erreurs ; voir `../sondes-contre-exemples-code.json`.

- **F204 — D9, S0, observé** — Les 18 corrigés de `server/exercises/b3-linux.js` encodent toutes les entrées des tests et des sorties prédéfinies ; `lx3-c1-e2` passe ses tests mais ne produit rien pour une carte mémoire valide indépendante. Deux autres cours présentent la même structure. Voir `../sondes-corriges-memorises.json` ; seuls trois corrigés ont reçu ce contrôle dynamique.

Les textes principaux des chapitres Linux B2 1 et 2 sélectionnés ont été lus ; les six textes principaux d'architecture B1 ont également été relus, sans validation intégrale du rendu ou des exemples.

- **F147–F149 — D12, S0/S1, observé** — `linux/chapitres/chapitre2.html:82`, « acceptent l’option », attribue `-r` à `mv` ; `:122`, « `jourctl -p err -b` », contient une commande erronée ; `linux/chapitres/chapitre1.html:296`, « sauvegarder la machine », confond la sauvegarde de `/etc` avec celle des données. Corriger commandes et stratégie de sauvegarde. GNU : https://www.gnu.org/software/coreutils/manual/html_node/mv-invocation.html, consulté le 29 octobre 2026.
- **F138–F140 — D8/D12, S0/S1, observé ou déduit** — `b1-architecture/chapitres/chapitre1.html:117`, « `1 Mo/s = 8 Mbps` », contredit la convention binaire précédente ; l'exercice de `:241` promet des entiers malgré `512 ko`. À `b1-architecture/chapitres/chapitre2.html:154`, « poids 2 puissance 9 » ne vaut pas pour chaque longueur de mot. Contre-exemples : `../sondes-lecture-complementaire.json`.
- **F141–F144 — D6/D8/D9/D12, S0/S1** — `b1-architecture/chapitres/chapitre3.html:105`, « retenue finale » : elle ne donne pas à elle seule le signe. Le décodeur `chapitre4.html:282` inverse l'ordre des bits par rapport à l'exemple ; la bascule JK `chapitre5.html:226` ne précise pas l'état initial ; `chapitre5.html:83` exclut les circuits séquentiels asynchrones.
- **F14 — D12, S0, observé** — `linux/chapitres/cartes.html:94`, « `utilisateur@hote:port` » : la commande SSH ne traite pas ce suffixe comme un port. Présenter `ssh -p PORT utilisateur@hote`, puis distinguer les autres syntaxes comme `scp` ou URI.
- **F18 — D12, S0, observé** — `b1-admin-windows/chapitres/chapitre2.html:82`, « production sans souscription ESU » : les mises à jour de sécurité étendues de Windows Server 2012 R2 ont pris fin le **13 octobre 2026**. Actualiser la note et renvoyer à la politique de cycle de vie et de migration, sans affirmer que toute machine s'arrête à cette date.
- **F57 — D12, S0, observé** — `rd_winserver/chapitres/cartes.html:112`, « La mémoire, l’état du processeur et les disques virtuels » : un checkpoint Hyper-V de production ne capture pas la mémoire, contrairement à un checkpoint standard. Distinguer leurs usages et ne pas présenter un checkpoint comme une sauvegarde complète.
- **F67 — D12, S0, observé** — `b1-virtualisation/chapitres/cartes.html:92`, « toutes ses ressources travaillent » : une capacité entièrement allouée ne prouve pas une utilisation réelle à 100 %, car les VM peuvent être inactives. Séparer capacité réservée et métriques mesurées de CPU, mémoire et stockage.
- **F71 — D15/D14, S1, observé** — `b1-linux/chapitres/simulateur-examen.html:210`, « final sur l’entrée, que devient le dernier read ? » : la question a perdu le nom du retour à la ligne. Dans `server/content/b1-linux/pages.js:458`, `\n` produit un saut de ligne au lieu de nommer le caractère. Une sonde Bash montre que `read` renvoie 1 en fin de fichier tout en conservant le texte lu ; distinguer statut et affectation.
- **F19 — D12, S1, observé** — `b1-architecture/chapitres/cartes.html:65`, « 1 Mo = 1024 Ko » : distinguer les préfixes décimaux SI (`Mo`, `Ko`) des préfixes binaires (`Mio`, `Kio`), en signalant les usages historiques ambigus.
- **F23/F27 — D15, S1, observé** — `b3-linux/chapitres/chapitre5.html:313`, « `ip addr add <IP/CIDR>` », masque le paramètre interprété comme balise ; `b1-linux/chapitres/chapitre3.html:194` voit du Bash pris pour une formule. Échapper les chevrons et exclure le code du traitement mathématique.
- **F34 — D10, S1, déduit** — `b1-linux/chapitres/chapitre1.html:150`, « Voici les huit éléments dont vous aurez besoin » : plusieurs notions liées arrivent avant la pratique. Segmenter et ajouter un exemple guidé ; l'effet réel sur la charge nécessite des essais avec débutants.
- **F41 — D13, S2, observé** — `linux/chapitres/chapitre2.html:76`, « filtres un journal » : corriger l'infinitif dans la liste d'objectifs. Le tutoiement et le seuil répété à `b1-linux/chapitres/chapitre1.html:431` et `:433` sont F29–F30.
- **F92–F96, F98–F100 et F106 — exactitude, dont F99 S0** — dans les six chapitres Linux B1, la chronologie GPL, les noms et métadonnées des fichiers, les schémas de partition, `find -ctime`, le swap et les plages d'UID demandent correction. Le point le plus sensible est `b1-linux/chapitres/chapitre5.html:97` : un mot de passe verrouillé ne prouve pas l'impossibilité de toute authentification. Distinguer également hachage et chiffrement des mots de passe.
- **F97/F103/F104 — exercices, S1** — l'ordre du seuil contredit l'exemple ; une modification symbolique accepte plusieurs classes malgré un énoncé ambigu ; la liste des liens ne permet pas d'identifier une cible inexistante. Emplacements et corrections minimales : `../04-erreurs-a-corriger.csv`.
- **F101/F102/F105 — commandes et évaluation, S1** — le squelette ne fournit pas le shebang demandé et une soumission sans shebang réussit les trois tests avec Bash local injecté ; l'exemple `chmod` est faux pour les droits initiaux 440 ; GNU `find` n'impose pas un chemin explicite. Voir `../sondes-linux-fondamentaux.json` et `../sondes-shebang.json` ; le fournisseur réel n'a pas été appelé.

## Grille C1–C14 — éléments examinés

| Critère | Constat ou limite |
|---|---|
| C1 Situation | `linux/chapitres/chapitre2.html:65` contextualise la recherche de journaux et de liens cassés. |
| C2 Objectifs | `linux/chapitres/chapitre2.html:70` annonce des actions concrètes ; une formulation grammaticale est à corriger, F41. |
| C3 Prérequis | Les acquis de terminal, chemins et droits avant les deux chapitres ne sont pas individuellement attestés. |
| C4 Ordre | Le site B1 place les commandes avant l'installation ; les supports étudiés inversent cet ordre. Un ordre différent ne prouve pas à lui seul un échec pédagogique. |
| C5 Définitions | La carte SSH donne une syntaxe erronée, F14 ; les unités d'architecture appellent F19. |
| C6 Exemples et progression | Les chapitres présentent des exemples de commandes ; le passage guidé de chaque exemple à chaque exercice reste à vérifier. |
| C7 Charge | La concentration de notions dans `b1-linux/chapitres/chapitre1.html:148` justifie l'essai d'une progression plus découpée, F34. |
| C8 Cohérence | `b1-linux/chapitres/chapitre1.html:431` répète un seuil ; F30. Les conventions d'unités requièrent une harmonisation. |
| C9 Exercices | Les 20 corrigés échantillonnés passent ; cela ne certifie pas la préparation ni la sécurité de tous les exercices. |
| C10 QCM | Le QCM sur `veth`, `b3-linux/chapitres/chapitre5.html:295`, distingue une paire virtuelle des autres objets ; tous les distracteurs ne sont pas évalués séparément. |
| C11 Auto-évaluation | Les échelles sont globalement structurées, mais 248 libellés bas se répètent dans le corpus reconnu ; F30. |
| C12 Exactitude | L'exemple SSH, la note Windows et les unités nécessitent F14, F18 et F19. |
| C13 Ressources | Corriger la carte SSH et rapprocher les exemples des commandes réellement présentées. |
| C14 Rendu | Paramètre réseau masqué et Bash rendu en mathématiques : F23/F27 ; la carte Linux utilisée au test clavier fonctionne, voir `../03-transversal.md`. |

## Exercices, QCM et cartes

Les dix QCM et dix cartes de la famille ont été lus individuellement dans leur texte extrait ; appréciations et réserves figurent dans `../07-relecture-familles.csv`.

Les **20 exercices échantillonnés** ont reçu deux variantes ciblées chacun : 38 sont rejetées et deux erronées sont acceptées, puis confrontées à des entrées indépendantes. Les 19 premiers ont été sondés à partir des corrigés et le Bash restant à partir de programmes indépendants ; ces variantes ne sont pas des productions d'étudiants. Voir F204, `../sondes-reponses-plausibles.json` et `../sondes-sept-restants.json`.

**20 corrigés sur 20** passent leurs tests cachés et **6 variantes automatiques sur 40** passent ; certaines mutations ne changent rien. On ne peut pas en déduire six corrigés défectueux ni une couverture suffisante des erreurs réalistes. Le défaut du corrigé B3 Linux ci-dessus est, lui, établi indépendamment. Les 10 QCM et 10 cartes tirés servent d'échantillon, non de certification ; la lisibilité de tous les corrigés reste à contrôler.

**Niveau.** Les exemples Linux B2 visent une pratique d'administration ; pour B1, la densité de prérequis et les incohérences de rendu justifient un accompagnement renforcé. L'adéquation réelle à chaque étudiant et les défis B3 n'ont pas été mesurés.

## Confrontation aux supports et références

Dans `corpus-cours-revi.zip`, `textes/B1/LINUX/Chap.3_Installation_Debian_12.txt` précède `Chap.4_Commandes_de_Base_Unix.txt` ; le site présente les commandes au chapitre 3 et l'installation au chapitre 4. Il s'agit d'une inversion d'ordre, pas d'une preuve d'omission. Les textes principaux extraits des six chapitres Linux B1 et des six chapitres d'architecture B1 ont été relus, sans certification de chaque affirmation ni de chaque évaluation. L'index indique qu'aucun PDF n'est fourni pour Linux B2 et `b3-linux`. Le TP B2 de machines virtuelles corrompu est une source manquante.

Sources primaires consultées le 29 octobre 2026 :

- OpenSSH, option de port : https://man.openbsd.org/ssh
- Microsoft, cycle de vie Windows Server 2012 R2 : https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2012-r2
- Microsoft, checkpoints Hyper-V : https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/checkpoints
- Microsoft, indicateurs Hyper-V : https://learn.microsoft.com/en-us/windows/win32/hyperv_v2/msvm-summaryinformation
- BIPM, préfixes SI : https://www.bipm.org/en/measurement-units/si-prefixes
- KaTeX, auto-rendu : https://katex.org/docs/autorender
- GNU Findutils, âges des fichiers et invocation : https://www.gnu.org/software/findutils/manual/html_node/find_html/Age-Ranges.html ; https://www.gnu.org/software/findutils/manual/html_node/find_html/Invoking-find.html
- Linux, comptes shadow et plages d'identifiants : https://man7.org/linux/man-pages/man5/shadow.5.html ; https://man7.org/linux/man-pages/man5/login.defs.5.html
- FHS, fichiers temporaires : https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s18.html
- Microsoft, comparaison MBR/GPT : https://learn.microsoft.com/en-us/windows-server/storage/disk-management/change-disk-partition-scheme
