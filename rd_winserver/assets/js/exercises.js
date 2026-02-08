/* ============================================================
   exercises.js — Windows Server 2022 Exercise Engine
   144 exercises: 18 per chapter (5 guided + 10 quiz + 3 drag)
   ============================================================ */

const ExerciseEngine = (() => {
    const DB = {
        chapitre1: {
            title: "Fondamentaux Windows Server",
            guided: [
                { q: "Windows Server est principalement conçu pour quel usage ?", hint: "Pensez à un hôtel : le serveur est la réception, pas la chambre.", a: "Windows Server est conçu pour fournir des services réseau (hébergement, gestion centralisée, authentification) à de multiples utilisateurs et appareils, contrairement à Windows Desktop orienté usage individuel." },
                { q: "Citez les 3 éditions de Windows Server 2022 et leurs cas d'usage.", hint: "Pensez opérateur mobile : forfait basique, standard, illimité.", a: "Essentials (petites structures, max 25 users), Standard (environnements physiques ou faiblement virtualisés, 2 VMs incluses), Datacenter (virtualisation massive, VMs illimitées, Storage Spaces Direct)." },
                { q: "Quelle est la différence entre Desktop Experience et Server Core ?", hint: "L'un a une interface graphique, l'autre non.", a: "Desktop Experience = interface graphique complète (explorateur, navigateur). Server Core = ligne de commande uniquement, plus sécurisé (moins de surface d'attaque), moins de mises à jour, moins de RAM utilisée." },
                { q: "Expliquez la logique Verbe-Nom de PowerShell avec 3 exemples.", hint: "Get-Service, New-Item, Restart-Computer…", a: "PowerShell utilise le format Verbe-Nom : Get-Service (obtenir un service), New-ADUser (créer un utilisateur AD), Restart-Computer (redémarrer l'ordinateur). Les verbes standards sont Get, Set, New, Remove, Start, Stop, Install." },
                { q: "Pourquoi configurer une IP statique sur un serveur ?", hint: "Les clients doivent toujours trouver le serveur à la même adresse.", a: "Un serveur a besoin d'une IP fixe pour que les clients (DNS, DHCP, AD) puissent le joindre de façon fiable. Une IP dynamique qui change empêcherait les services réseau de fonctionner correctement." }
            ],
            quiz: [
                { q: "Combien de connexions RDP simultanées un Windows Desktop autorise-t-il ?", options: ["1", "2", "Illimité", "10"], answer: 0 },
                { q: "Quelle édition WS2022 permet un nombre illimité de VMs Hyper-V ?", options: ["Essentials", "Standard", "Datacenter", "Home Server"], answer: 2 },
                { q: "Quel rôle transforme un serveur en contrôleur de domaine ?", options: ["DNS", "DHCP", "AD DS", "Hyper-V"], answer: 2 },
                { q: "Quel est le cmdlet pour installer un rôle Windows Server ?", options: ["Add-WindowsRole", "Install-WindowsFeature", "Enable-Feature", "Setup-Role"], answer: 1 },
                { q: "Quelle commande PowerShell renomme un ordinateur ?", options: ["Set-Name", "Rename-Computer", "Change-Hostname", "Set-ComputerName"], answer: 1 },
                { q: "Server Core ne possède PAS :", options: ["PowerShell", "Interface graphique complète", "Invite de commandes", "Services réseau"], answer: 1 },
                { q: "Quel port utilise RDP par défaut ?", options: ["22", "443", "3389", "8080"], answer: 2 },
                { q: "Quelle commande vérifie les rôles installés ?", options: ["Get-WindowsFeature", "Show-Roles", "List-Features", "Get-ServerRole"], answer: 0 },
                { q: "Quel outil graphique centralise la gestion des rôles ?", options: ["Event Viewer", "Server Manager", "Task Manager", "Device Manager"], answer: 1 },
                { q: "RAM minimum recommandée pour WS2022 ?", options: ["512 Mo", "2 Go", "4 Go", "8 Go"], answer: 1 }
            ],
            drag: [
                { q: "Associez chaque rôle à sa fonction :", pairs: [["AD DS", "Gestion identités/domaine"], ["DNS", "Résolution de noms"], ["DHCP", "Attribution IP automatique"], ["Hyper-V", "Virtualisation"]] },
                { q: "Associez le verbe PowerShell à son action :", pairs: [["Get", "Obtenir/Lire"], ["Set", "Modifier"], ["New", "Créer"], ["Remove", "Supprimer"]] },
                { q: "Associez l'édition à sa caractéristique :", pairs: [["Essentials", "Max 25 utilisateurs"], ["Standard", "2 VMs Hyper-V incluses"], ["Datacenter", "VMs illimitées"], ["Server Core", "Pas d'interface graphique"]] }
            ]
        },
        chapitre2: {
            title: "Active Directory DS",
            guided: [
                { q: "Qu'est-ce qu'Active Directory Domain Services et à quoi sert-il ?", hint: "Pensez à l'état civil d'une ville.", a: "AD DS est un service d'annuaire qui centralise la gestion des identités (utilisateurs, ordinateurs, groupes) et des ressources du réseau. Il permet l'authentification, l'autorisation et l'application de politiques de sécurité à l'échelle de l'entreprise." },
                { q: "Expliquez la hiérarchie Forêt > Arbre > Domaine > OU avec une analogie.", hint: "Pays > Région > Ville > Quartier.", a: "Forêt = pays (frontière de sécurité ultime, schéma commun). Arbre = région (domaines partageant un espace DNS contigu). Domaine = ville (unité administrative). OU = quartier (organisation interne pour appliquer des GPO)." },
                { q: "Pourquoi faut-il au minimum 2 contrôleurs de domaine ?", hint: "SPOF = Single Point of Failure.", a: "Un seul DC est un point de défaillance unique (SPOF). S'il tombe, plus personne ne peut se connecter au domaine. Avec 2 DC, la réplication assure que si l'un tombe, l'autre prend le relais automatiquement." },
                { q: "Citez les 5 rôles FSMO et leur portée.", hint: "2 au niveau forêt, 3 au niveau domaine.", a: "Forêt : Schema Master (modifications du schéma), Domain Naming Master (ajout/suppression de domaines). Domaine : PDC Emulator (mot de passe, heure), RID Master (attribution des SID), Infrastructure Master (références inter-domaines)." },
                { q: "Quelle est la différence entre une OU et un Groupe ?", hint: "L'une organise, l'autre donne des permissions.", a: "Une OU est un conteneur d'organisation pour appliquer des GPO et déléguer l'administration. Un Groupe est utilisé pour attribuer des permissions sur des ressources. Un utilisateur peut être dans une seule OU mais dans plusieurs Groupes." }
            ],
            quiz: [
                { q: "Quel protocole AD utilise pour l'authentification ?", options: ["NTLM", "Kerberos", "OAuth", "SAML"], answer: 1 },
                { q: "Quel port utilise LDAP par défaut ?", options: ["53", "88", "389", "445"], answer: 2 },
                { q: "Combien de rôles FSMO existe-t-il au total ?", options: ["3", "5", "7", "2"], answer: 1 },
                { q: "Quel cmdlet crée un nouvel utilisateur AD ?", options: ["Add-User", "New-ADUser", "Create-ADAccount", "New-User"], answer: 1 },
                { q: "Le Schema Master est unique à l'échelle de :", options: ["L'OU", "Le domaine", "L'arbre", "La forêt"], answer: 3 },
                { q: "Quel objet AD représente un conteneur pour organiser les ressources ?", options: ["Groupe", "OU", "Domaine", "Site"], answer: 1 },
                { q: "Quel cmdlet installe la forêt AD DS ?", options: ["New-ADForest", "Install-ADDSForest", "Create-Forest", "Add-ADForest"], answer: 1 },
                { q: "Le PDC Emulator gère principalement :", options: ["Le schéma", "Les SID", "Les mots de passe et l'heure", "Les noms DNS"], answer: 2 },
                { q: "Une relation de confiance permet :", options: ["De fusionner deux forêts", "D'accéder aux ressources d'un autre domaine", "De supprimer un DC", "De créer des OU"], answer: 1 },
                { q: "Quel port utilise Kerberos ?", options: ["389", "88", "636", "53"], answer: 1 }
            ],
            drag: [
                { q: "Associez le niveau hiérarchique à son analogie :", pairs: [["Forêt", "Pays"], ["Arbre", "Région"], ["Domaine", "Ville"], ["OU", "Quartier"]] },
                { q: "Associez le rôle FSMO à sa fonction :", pairs: [["Schema Master", "Modifications du schéma"], ["RID Master", "Attribution des SID"], ["PDC Emulator", "Mots de passe et heure"], ["Infrastructure Master", "Références inter-domaines"]] },
                { q: "Associez le protocole AD à son port :", pairs: [["LDAP", "389"], ["Kerberos", "88"], ["DNS", "53"], ["SMB", "445"]] }
            ]
        },
        chapitre3: {
            title: "GPO & Sécurité",
            guided: [
                { q: "Qu'est-ce qu'une GPO et à quoi sert-elle ?", hint: "Pensez aux lois d'un pays appliquées aux citoyens.", a: "Une GPO (Group Policy Object) est un ensemble de règles et configurations appliquées automatiquement aux utilisateurs et/ou ordinateurs d'un domaine AD. Elle permet de standardiser les paramètres de sécurité, les restrictions et les configurations à grande échelle." },
                { q: "Expliquez l'ordre d'application LSDOU.", hint: "Local, Site, Domaine, OU — le dernier gagne.", a: "Les GPO s'appliquent dans l'ordre : Local → Site → Domain → OU. En cas de conflit, la dernière GPO appliquée (la plus proche de l'objet, donc l'OU) gagne. C'est le principe du 'last writer wins'." },
                { q: "Quelle est la différence entre Block Inheritance et Enforced ?", hint: "Indépendance vs loi constitutionnelle.", a: "Block Inheritance empêche les GPO parentes de s'appliquer à une OU (comme déclarer l'indépendance). Enforced force une GPO à s'appliquer même si un Block Inheritance existe en dessous (comme une loi constitutionnelle qui prime sur tout)." },
                { q: "Comment restreindre l'application d'une GPO à un groupe spécifique ?", hint: "Security Filtering dans la GPMC.", a: "Dans GPMC, onglet Scope → Security Filtering : retirer 'Authenticated Users' et ajouter le groupe ciblé. Seuls les membres de ce groupe recevront la GPO. On peut aussi utiliser un filtre WMI pour cibler selon des critères système." },
                { q: "Citez les commandes essentielles pour diagnostiquer les GPO.", hint: "gpresult, gpupdate, rsop.msc.", a: "gpresult /r (résumé des GPO appliquées), gpresult /h rapport.html (rapport détaillé HTML), gpupdate /force (forcer la mise à jour immédiate des GPO), rsop.msc (Resultant Set of Policy en mode graphique)." }
            ],
            quiz: [
                { q: "Dans l'ordre LSDOU, quelle GPO a la priorité la plus haute ?", options: ["Local", "Site", "Domain", "OU"], answer: 3 },
                { q: "Quel outil graphique gère les GPO ?", options: ["Server Manager", "GPMC (gpmc.msc)", "Event Viewer", "ADUC"], answer: 1 },
                { q: "Quelle commande force la mise à jour des GPO immédiatement ?", options: ["gpupdate /force", "gpo /refresh", "Update-GPO", "Refresh-Policy"], answer: 0 },
                { q: "Une GPO s'applique aux :", options: ["Utilisateurs uniquement", "Ordinateurs uniquement", "Utilisateurs ET Ordinateurs", "Groupes de sécurité"], answer: 2 },
                { q: "Le filtrage WMI permet de cibler les GPO selon :", options: ["Le nom de l'utilisateur", "Les caractéristiques système (OS, RAM...)", "L'heure de la journée", "La météo"], answer: 1 },
                { q: "'Enforced' sur une GPO signifie :", options: ["Elle est désactivée", "Elle ignore le Block Inheritance", "Elle s'applique une seule fois", "Elle est supprimée après application"], answer: 1 },
                { q: "Quel événement ID correspond à un échec de connexion ?", options: ["4624", "4625", "1074", "7036"], answer: 1 },
                { q: "Combien de tentatives avant verrouillage (bonne pratique) ?", options: ["3", "5", "10", "Illimité"], answer: 1 },
                { q: "gpresult /h génère :", options: ["Un fichier texte", "Un rapport HTML", "Un e-mail", "Un fichier CSV"], answer: 1 },
                { q: "La Computer Configuration s'applique :", options: ["À la connexion utilisateur", "Au démarrage de l'ordinateur", "Manuellement", "Au redémarrage du DC"], answer: 1 }
            ],
            drag: [
                { q: "Remettez l'ordre LSDOU :", pairs: [["1er", "Local"], ["2e", "Site"], ["3e", "Domain"], ["4e", "OU"]] },
                { q: "Associez la GPO à son effet :", pairs: [["Password Policy", "Force 12 caractères min"], ["USB Block", "Désactive le stockage amovible"], ["Drive Mapping", "Connecte un lecteur réseau"], ["Wallpaper", "Impose un fond d'écran"]] },
                { q: "Associez l'outil diagnostic à son rôle :", pairs: [["gpresult /r", "Résumé des GPO appliquées"], ["gpupdate /force", "Forcer la mise à jour"], ["rsop.msc", "Résultat visuel des politiques"], ["gpresult /h", "Rapport HTML détaillé"]] }
            ]
        },
        chapitre4: {
            title: "DNS & DHCP",
            guided: [
                { q: "Pourquoi le DNS est-il vital pour Active Directory ?", hint: "AD utilise DNS pour localiser les contrôleurs de domaine.", a: "AD DS dépend entièrement du DNS pour localiser les services (enregistrements SRV). Sans DNS fonctionnel, les clients ne trouvent pas les DC, la réplication échoue, les GPO ne s'appliquent pas, et l'authentification Kerberos ne fonctionne plus." },
                { q: "Expliquez la différence entre zone de recherche directe et inversée.", hint: "Nom → IP vs IP → Nom.", a: "Zone directe (Forward) : résout un nom en adresse IP (srv-dc01.lab.local → 192.168.1.10). Zone inversée (Reverse) : résout une IP en nom (192.168.1.10 → srv-dc01.lab.local). Les deux sont nécessaires pour un fonctionnement optimal." },
                { q: "Décrivez le processus DORA du DHCP.", hint: "Discover, Offer, Request, Acknowledge.", a: "1) Discover : le client envoie un broadcast pour trouver un serveur DHCP. 2) Offer : le serveur propose une IP. 3) Request : le client accepte l'offre. 4) Acknowledge : le serveur confirme et le bail démarre." },
                { q: "Pourquoi utiliser des zones intégrées à AD plutôt que des zones primaires classiques ?", hint: "Réplication automatique entre DC, mises à jour sécurisées.", a: "Les zones AD-intégrées bénéficient de la réplication multi-maître d'AD (tous les DC peuvent écrire), des mises à jour dynamiques sécurisées (seuls les ordinateurs du domaine peuvent s'enregistrer), et de la tolérance aux pannes native sans transfert de zone manuel." },
                { q: "Comment planifier l'adressage IP d'un réseau avec DHCP ?", hint: "Réserver des plages, exclure les serveurs.", a: "Règle : IP statiques (serveurs, imprimantes) dans une plage exclue du scope DHCP (ex: .1 à .50). Scope DHCP pour les clients (ex: .51 à .200). Réservations MAC pour les périphériques critiques. Bail adapté à l'usage (8h bureau, 1h WiFi invité)." }
            ],
            quiz: [
                { q: "Quel port utilise le DNS ?", options: ["80", "53", "389", "443"], answer: 1 },
                { q: "Un enregistrement A mappe :", options: ["Nom → IPv6", "Nom → IPv4", "IP → Nom", "Nom → Alias"], answer: 1 },
                { q: "Un enregistrement CNAME est :", options: ["Un pointeur inverse", "Un alias vers un autre nom", "Un serveur de mail", "Une autorité de zone"], answer: 1 },
                { q: "Quel type de zone est recommandé en environnement AD ?", options: ["Primaire", "Secondaire", "Stub", "Intégrée AD"], answer: 3 },
                { q: "Le 'D' de DORA signifie :", options: ["Distribute", "Discover", "Deploy", "Dynamic"], answer: 1 },
                { q: "Un enregistrement SRV sert à :", options: ["Mapper un nom IPv4", "Localiser un service", "Créer un alias", "Gérer le mail"], answer: 1 },
                { q: "Quelle commande vide le cache DNS client ?", options: ["dns /flush", "ipconfig /flushdns", "Clear-DNS", "nslookup /clear"], answer: 1 },
                { q: "Quel cmdlet installe le rôle DNS ?", options: ["Add-DNS", "Install-WindowsFeature DNS", "Enable-DNS", "New-DNSServer"], answer: 1 },
                { q: "La durée du bail DHCP définit :", options: ["La vitesse de connexion", "Combien de temps l'IP est attribuée", "Le nombre max de clients", "La taille du réseau"], answer: 1 },
                { q: "Quel outil teste la résolution DNS ?", options: ["ping", "tracert", "nslookup", "netstat"], answer: 2 }
            ],
            drag: [
                { q: "Associez l'enregistrement DNS à sa fonction :", pairs: [["A", "Nom → IPv4"], ["AAAA", "Nom → IPv6"], ["CNAME", "Alias"], ["MX", "Serveur mail"]] },
                { q: "Associez l'étape DORA à sa description :", pairs: [["Discover", "Client cherche un serveur"], ["Offer", "Serveur propose une IP"], ["Request", "Client accepte l'offre"], ["Acknowledge", "Serveur confirme le bail"]] },
                { q: "Associez la commande diagnostic à son usage :", pairs: [["nslookup", "Tester la résolution DNS"], ["ipconfig /renew", "Renouveler le bail DHCP"], ["Resolve-DnsName", "Résolution DNS PowerShell"], ["dcdiag /test:dns", "Vérifier DNS du DC"]] }
            ]
        },
        chapitre5: {
            title: "Sauvegarde & Restauration",
            guided: [
                { q: "Expliquez la différence entre sauvegarde incrémentielle et différentielle.", hint: "L'une part de la dernière sauvegarde, l'autre de la dernière complète.", a: "Incrémentielle : sauvegarde les données modifiées depuis la DERNIÈRE sauvegarde (complète ou incrémentielle). Plus rapide mais restauration complexe (chaîne complète nécessaire). Différentielle : sauvegarde les données modifiées depuis la dernière COMPLÈTE. Plus grosse mais restauration simple (complète + 1 diff)." },
                { q: "Décrivez la stratégie de sauvegarde 3-2-1.", hint: "3 copies, 2 supports, 1 hors-site.", a: "3 copies de chaque donnée importante. 2 types de supports différents (disque local + NAS/cloud). 1 copie stockée hors-site (datacenter distant ou cloud) pour se protéger des catastrophes locales (incendie, inondation)." },
                { q: "Quelle est la différence entre PCA et PRA ?", hint: "L'un maintient le service, l'autre le restaure.", a: "PCA (Plan de Continuité d'Activité) : maintenir le service PENDANT un incident (redondance, failover). PRA (Plan de Reprise d'Activité) : restaurer le service APRÈS un incident (backup, restauration). Le PCA coûte plus cher mais évite l'interruption." },
                { q: "Expliquez RPO et RTO avec un exemple concret.", hint: "Combien de données perd-on / combien de temps pour restaurer.", a: "RPO (Recovery Point Objective) = perte de données acceptable. Si RPO = 4h, on sauvegarde toutes les 4h (au pire, on perd 4h de données). RTO (Recovery Time Objective) = temps max pour restaurer le service. Si RTO = 2h, la restauration doit être terminée en 2h." },
                { q: "Pourquoi tester régulièrement les restaurations ?", hint: "Une sauvegarde jamais testée n'est qu'un espoir.", a: "Sans test, on ne sait pas si la sauvegarde est valide (fichier corrompu ?), si la procédure fonctionne (outil compatible ?), si le temps de restauration respecte le RTO, ou si toutes les données nécessaires sont incluses. Un test mensuel est la bonne pratique minimum." }
            ],
            quiz: [
                { q: "La sauvegarde complète copie :", options: ["Seulement les fichiers modifiés", "Tout, à chaque fois", "Seulement l'OS", "Les fichiers de plus de 1 Mo"], answer: 1 },
                { q: "La stratégie 3-2-1 exige combien de copies hors-site ?", options: ["0", "1", "2", "3"], answer: 1 },
                { q: "RPO = 0 signifie :", options: ["Pas de sauvegarde", "Aucune perte de données tolérée", "Restauration instantanée", "Sauvegarde annuelle"], answer: 1 },
                { q: "Quel outil intégré WS2022 gère les sauvegardes ?", options: ["WSUS", "Windows Server Backup", "System Center", "Veeam"], answer: 1 },
                { q: "Quel cmdlet installe WS Backup ?", options: ["Install-Backup", "Install-WindowsFeature Windows-Server-Backup", "Add-WBFeature", "Enable-Backup"], answer: 1 },
                { q: "L'incrémentielle est plus rapide car elle sauvegarde :", options: ["Tout", "Les changements depuis la dernière complète", "Les changements depuis la dernière sauvegarde", "Rien"], answer: 2 },
                { q: "Pour restaurer une incrémentielle du jeudi, il faut :", options: ["Seulement jeudi", "Complète + toutes les incrémentielles jusqu'à jeudi", "Complète + jeudi", "N'importe quelle incrémentielle"], answer: 1 },
                { q: "Le PCA vise à :", options: ["Restaurer après sinistre", "Maintenir le service pendant l'incident", "Sauvegarder les données", "Former les employés"], answer: 1 },
                { q: "Quelle fréquence de test de restauration est recommandée ?", options: ["Jamais", "Annuelle", "Mensuelle", "À chaque sauvegarde"], answer: 2 },
                { q: "RTO mesure :", options: ["La quantité de données perdues", "Le temps maximum de restauration", "Le coût de la sauvegarde", "Le nombre de copies"], answer: 1 }
            ],
            drag: [
                { q: "Associez le type de sauvegarde à sa caractéristique :", pairs: [["Complète", "Copie tout à chaque fois"], ["Incrémentielle", "Changements depuis dernière backup"], ["Différentielle", "Changements depuis dernière complète"], ["3-2-1", "3 copies, 2 supports, 1 hors-site"]] },
                { q: "Associez la métrique à sa question :", pairs: [["RPO", "Combien de données peut-on perdre ?"], ["RTO", "Combien de temps pour restaurer ?"], ["PCA", "Comment maintenir le service ?"], ["PRA", "Comment reprendre après sinistre ?"]] },
                { q: "Associez l'étape de planification :", pairs: [["1", "Identifier les données critiques"], ["2", "Définir la fréquence de sauvegarde"], ["3", "Choisir les supports et outils"], ["4", "Tester la restauration"]] }
            ]
        },
        chapitre6: {
            title: "Haute Disponibilité",
            guided: [
                { q: "Quels sont les 3 piliers de la haute disponibilité ?", hint: "Redondance, Failover, Monitoring.", a: "Redondance : dupliquer les composants critiques (2 DC, 2 liens réseau). Failover : basculer automatiquement vers le composant de secours quand le principal tombe. Monitoring : surveiller en temps réel pour détecter les pannes immédiatement." },
                { q: "Expliquez la différence entre cluster Active-Passive et Active-Active.", hint: "Un copilote en veille vs deux caisses ouvertes.", a: "Active-Passive : un nœud travaille, l'autre attend (simple mais sous-utilisation). Active-Active : tous les nœuds travaillent simultanément (performance optimale mais plus complexe, risque de surcharge si un tombe)." },
                { q: "Qu'est-ce que le quorum dans un cluster et pourquoi est-il important ?", hint: "Vote du conseil d'administration.", a: "Le quorum est le mécanisme de vote qui détermine si le cluster a assez de nœuds pour fonctionner. Il empêche le 'split-brain' (deux moitiés du cluster qui croient chacune être le cluster actif). Un témoin (disk/file share/cloud) départage en cas d'égalité." },
                { q: "Quand utiliser NLB plutôt que Failover Clustering ?", hint: "Stateless vs Stateful.", a: "NLB pour les services sans état (web, portail, API) qui ne modifient pas de données locales. Failover Clustering pour les services avec état (SQL Server, serveurs de fichiers, Hyper-V) qui nécessitent un stockage partagé et une cohérence des données." },
                { q: "Que signifie un SLA de 99.99% en termes de temps d'arrêt ?", hint: "Environ 52 minutes par an.", a: "99.99% = maximum 52 minutes d'arrêt par an (4 minutes 23 secondes par mois). Chaque '9' supplémentaire coûte exponentiellement plus cher en infrastructure, redondance et complexité." }
            ],
            quiz: [
                { q: "Un SLA de 99.9% autorise combien d'arrêt par an ?", options: ["5 minutes", "52 minutes", "8h 45min", "3 jours"], answer: 2 },
                { q: "Quel cmdlet crée un cluster Windows ?", options: ["Create-Cluster", "New-Cluster", "Add-Cluster", "Build-Cluster"], answer: 1 },
                { q: "Test-Cluster est :", options: ["Optionnel", "Recommandé", "Obligatoire avant création", "Inutile"], answer: 2 },
                { q: "Le rôle NLB est adapté pour :", options: ["SQL Server", "Serveurs de fichiers", "Serveurs web stateless", "Hyper-V"], answer: 2 },
                { q: "Cloud Witness utilise :", options: ["Un disque local", "Un partage réseau", "Azure Blob Storage", "Une clé USB"], answer: 2 },
                { q: "Dans un cluster Active-Passive, combien de nœuds traitent les requêtes ?", options: ["0", "1", "2", "Tous"], answer: 1 },
                { q: "La réplication synchrone garantit :", options: ["Plus de vitesse", "RPO = 0", "Moins de coût", "Pas de témoin"], answer: 1 },
                { q: "Quel stockage est requis pour Failover Cluster ?", options: ["USB", "SAN partagé", "Disque local uniquement", "Cloud uniquement"], answer: 1 },
                { q: "Le heartbeat dans un cluster sert à :", options: ["Transférer les données", "Vérifier que les nœuds sont vivants", "Sauvegarder", "Chiffrer le trafic"], answer: 1 },
                { q: "Storage Replica permet la réplication :", options: ["De fichiers uniquement", "De volumes complets", "De VMs uniquement", "De base de données"], answer: 1 }
            ],
            drag: [
                { q: "Associez le type de cluster à son cas d'usage :", pairs: [["Active-Passive", "SQL Server critique"], ["Active-Active", "Applications distribuées"], ["NLB", "Serveurs web"], ["Failover Cluster", "Hyper-V avec SAN"]] },
                { q: "Associez le mode de quorum :", pairs: [["Node Majority", "3+ nœuds"], ["Node + Disk Witness", "2 nœuds"], ["File Share Witness", "Cluster multi-sites"], ["Cloud Witness", "Cluster hybride Azure"]] },
                { q: "Associez la disponibilité au temps d'arrêt :", pairs: [["99%", "3 jours 15h/an"], ["99.9%", "8h 45min/an"], ["99.99%", "52 min/an"], ["99.999%", "5 min 15s/an"]] }
            ]
        },
        chapitre7: {
            title: "Maintenance Windows Server",
            guided: [
                { q: "Expliquez les 3 types de maintenance avec un exemple concret chacun.", hint: "Préventive = révision, Corrective = dépannage, Évolutive = amélioration.", a: "Préventive : appliquer les mises à jour de sécurité chaque mois (on prévient les failles). Corrective : le service DNS est en panne, on le redémarre et on corrige la cause (on répare). Évolutive : migrer de WS2016 vers WS2022 pour bénéficier des nouvelles fonctionnalités (on améliore)." },
                { q: "Quels sont les IDs d'événements critiques à surveiller dans Event Viewer ?", hint: "4625, 1074, 41, 7036, 1001.", a: "4625 : échec de connexion (tentative d'intrusion ?). 1074 : arrêt/redémarrage du système (qui l'a fait ?). 41 : crash système inattendu (kernel power). 7036 : changement d'état d'un service. 1001 : BSOD bugcheck (écran bleu)." },
                { q: "Quels seuils de performance indiquent un problème critique ?", hint: "CPU > 85%, RAM libre < 10%, Disk Queue > 4.", a: "CPU > 85% soutenu = surcharge. Mémoire disponible < 10% = risque de swap. Disk Queue Length > 4 = goulet d'étranglement I/O. Réseau > 80% de la bande passante = saturation. Ces seuils nécessitent une investigation immédiate." },
                { q: "Quel est l'intérêt de WSUS pour la gestion des mises à jour ?", hint: "Centralisation, contrôle, économie de bande passante.", a: "WSUS centralise le téléchargement des MAJ (1 seul téléchargement vs N). Il permet l'approbation manuelle (tester avant de déployer), le ciblage par groupe d'ordinateurs, le reporting de conformité, et la planification hors heures de production." },
                { q: "Décrivez la méthodologie de dépannage en 6 étapes.", hint: "Symptôme → Chronologie → Changements → Isoler → Corriger → Documenter.", a: "1) Identifier le symptôme précis. 2) Quand ça a commencé ? (Event Viewer). 3) Quels changements récents ? (MAJ, GPO, config). 4) Isoler la cause (tests, logs). 5) Appliquer la correction (fix, rollback). 6) Documenter pour la base de connaissances." }
            ],
            quiz: [
                { q: "La maintenance préventive vise à :", options: ["Réparer après panne", "Éviter les pannes", "Améliorer les capacités", "Remplacer le serveur"], answer: 1 },
                { q: "Event ID 4625 correspond à :", options: ["Connexion réussie", "Échec de connexion", "Redémarrage système", "Crash BSOD"], answer: 1 },
                { q: "Un CPU soutenu à 90% est :", options: ["Normal", "Attention", "Critique", "Optimal"], answer: 2 },
                { q: "WSUS signifie :", options: ["Windows Server Update Services", "Windows System Upgrade Service", "Windows Security Update System", "Web Server Update Services"], answer: 0 },
                { q: "Quel outil surveille les performances en temps réel ?", options: ["Event Viewer", "perfmon.msc", "Server Manager", "Task Scheduler"], answer: 1 },
                { q: "Le Disk Queue Length critique est au-dessus de :", options: ["1", "2", "4", "10"], answer: 2 },
                { q: "Quelle commande PowerShell liste les services arrêtés automatiques ?", options: ["Get-Service | Where Stopped", "Get-StoppedService", "Find-Service -Down", "List-Service -Auto"], answer: 0 },
                { q: "La maintenance corrective est caractérisée par :", options: ["Un planning mensuel", "Une intervention d'urgence", "Un upgrade OS", "Un achat de matériel"], answer: 1 },
                { q: "À quelle fréquence faut-il vérifier l'Event Viewer ?", options: ["Annuellement", "Mensuellement", "Hebdomadairement", "Quotidiennement"], answer: 3 },
                { q: "Quelle étape de dépannage vient après 'Isoler la cause' ?", options: ["Documenter", "Identifier le symptôme", "Appliquer la correction", "Chercher les changements"], answer: 2 }
            ],
            drag: [
                { q: "Associez le type de maintenance à son objectif :", pairs: [["Préventive", "Éviter les pannes"], ["Corrective", "Réparer après panne"], ["Évolutive", "Améliorer le système"], ["Planifiée", "Intervention organisée"]] },
                { q: "Associez l'Event ID à son événement :", pairs: [["4625", "Échec de connexion"], ["1074", "Shutdown/Reboot"], ["41", "Crash système"], ["7036", "Service arrêté/démarré"]] },
                { q: "Associez la fréquence à la tâche :", pairs: [["Quotidien", "Vérifier Event Viewer"], ["Hebdomadaire", "Appliquer les MAJ testées"], ["Mensuel", "Tester une restauration"], ["Annuel", "Audit complet de sécurité"]] }
            ]
        },
        chapitre8: {
            title: "Hyper-V & Snapshots VM",
            guided: [
                { q: "Quelle est la différence entre un hyperviseur Type 1 et Type 2 ?", hint: "L'un s'installe sur le matériel, l'autre sur un OS.", a: "Type 1 (bare-metal) : s'installe directement sur le matériel, performances optimales, usage production (Hyper-V, VMware ESXi, Proxmox). Type 2 (hosted) : s'installe sur un OS existant, plus simple mais overhead, usage test/dev (VirtualBox, VMware Workstation)." },
                { q: "Expliquez les 3 types de switches virtuels Hyper-V.", hint: "External, Internal, Private — niveaux d'accès différents.", a: "External : les VMs accèdent au réseau physique et à Internet (production). Internal : communication entre les VMs et l'hôte uniquement (pas d'accès externe). Private : communication entre VMs uniquement (isolation totale, idéal pour les labs de test)." },
                { q: "Pourquoi un snapshot n'est-il PAS une sauvegarde ?", hint: "Fichiers .avhdx, performance, durée limitée.", a: "Un snapshot crée des fichiers différentiels (.avhdx) qui grossissent avec chaque modification. Au-delà de 72h, les performances se dégradent significativement. Un snapshot ne protège pas contre la perte du disque physique. Une sauvegarde (WS Backup) copie les données sur un support séparé pour une protection long terme." },
                { q: "Quelle est la différence entre checkpoint Standard et Production ?", hint: "L'un capture la mémoire, l'autre utilise VSS.", a: "Standard : capture l'état complet (disque + mémoire RAM + config), comme une photo exacte. Idéal pour le test. Production : utilise VSS (Volume Shadow Copy) pour créer un état disque cohérent sans capturer la RAM. Recommandé en production car les applications restent dans un état propre." },
                { q: "Qu'est-ce que Live Migration et quels sont ses prérequis ?", hint: "Déplacer une VM allumée sans interruption.", a: "Live Migration déplace une VM d'un hôte Hyper-V à un autre sans interruption de service. Prérequis : mêmes domaine AD, processeurs compatibles, réseau dédié pour la migration, et stockage partagé (ou Storage Migration pour le stockage local)." }
            ],
            quiz: [
                { q: "Hyper-V est un hyperviseur de :", options: ["Type 1", "Type 2", "Type 3", "Aucun type"], answer: 0 },
                { q: "Quel switch permet aux VMs d'accéder à Internet ?", options: ["Private", "Internal", "External", "NAT"], answer: 2 },
                { q: "Combien de temps maximum garder un snapshot en production ?", options: ["24h", "72h", "1 semaine", "1 mois"], answer: 1 },
                { q: "Quel format de disque est recommandé pour Hyper-V ?", options: ["VHD", "VHDX", "VMDK", "ISO"], answer: 1 },
                { q: "Quel cmdlet crée une VM ?", options: ["Create-VM", "New-VM", "Add-VM", "Build-VM"], answer: 1 },
                { q: "Le type de checkpoint recommandé en production est :", options: ["Standard", "Production", "Quick", "Full"], answer: 1 },
                { q: "Quelle taille maximale pour un VHDX ?", options: ["2 To", "16 To", "64 To", "128 To"], answer: 2 },
                { q: "Quel cmdlet crée un snapshot ?", options: ["New-Snapshot", "Checkpoint-VM", "Save-VM", "Snapshot-VM"], answer: 1 },
                { q: "Un disque fixe vs dynamique en production :", options: ["Dynamique est mieux", "Fixe est mieux", "Aucune différence", "Ni l'un ni l'autre"], answer: 1 },
                { q: "Quel prérequis matériel pour Hyper-V ?", options: ["GPU dédié", "SLAT (virtualisation matérielle)", "32 Go RAM minimum", "SSD obligatoire"], answer: 1 }
            ],
            drag: [
                { q: "Associez le type de switch à son accès :", pairs: [["External", "VMs + Hôte + Réseau physique"], ["Internal", "VMs + Hôte uniquement"], ["Private", "VMs entre elles uniquement"], ["NAT", "VMs avec traduction d'adresse"]] },
                { q: "Associez le type de disque à son usage :", pairs: [["VHDX Fixe", "Production (performance)"], ["VHDX Dynamique", "Test (économie espace)"], ["Differencing", "Snapshots (automatique)"], ["VHD", "Compatibilité anciens systèmes"]] },
                { q: "Associez le cmdlet Hyper-V à son action :", pairs: [["New-VM", "Créer une VM"], ["Checkpoint-VM", "Créer un snapshot"], ["Start-VM", "Démarrer une VM"], ["Export-VM", "Exporter une VM"]] }
            ]
        }
    };

    function getChapterFromPath() {
        const p = window.location.pathname;
        const m = p.match(/chapitre(\d+)/);
        return m ? 'chapitre' + m[1] : null;
    }

    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function renderGuided(ex, idx) {
        return `<div class="exercise-card" data-type="guided" data-index="${idx}">
            <div class="exercise-header"><span class="exercise-badge guided">Exercice Guidé ${idx + 1}</span></div>
            <p class="exercise-question">${ex.q}</p>
            <button class="exercise-hint-btn" onclick="this.nextElementSibling.classList.toggle('show')"><i class="fas fa-lightbulb"></i> Indice</button>
            <div class="exercise-hint">${ex.hint}</div>
            <textarea class="exercise-textarea" placeholder="Écris ta réponse ici…" rows="4"></textarea>
            <button class="exercise-submit-btn" onclick="ExerciseEngine.showGuidedAnswer(this, ${idx})"><i class="fas fa-check"></i> Voir la correction</button>
            <div class="exercise-answer" id="guided-answer-${idx}"><strong>✅ Réponse :</strong> ${ex.a}</div>
        </div>`;
    }

    function renderQuiz(ex, idx) {
        const opts = ex.options.map((o, i) =>
            `<label class="quiz-option" data-index="${i}">
                <input type="radio" name="quiz-${idx}" value="${i}">
                <span>${o}</span>
            </label>`
        ).join('');
        return `<div class="exercise-card" data-type="quiz" data-index="${idx}">
            <div class="exercise-header"><span class="exercise-badge quiz">Quiz ${idx + 1}</span></div>
            <p class="exercise-question">${ex.q}</p>
            <div class="quiz-options">${opts}</div>
            <button class="exercise-submit-btn" onclick="ExerciseEngine.checkQuiz(this, ${idx}, ${ex.answer})"><i class="fas fa-paper-plane"></i> Valider</button>
            <div class="exercise-feedback" id="quiz-feedback-${idx}"></div>
        </div>`;
    }

    function renderDrag(ex, idx) {
        const shuffledRight = shuffle(ex.pairs.map(p => p[1]));
        const leftItems = ex.pairs.map((p, i) =>
            `<div class="drag-left-item" data-pair="${i}">${p[0]}</div>`
        ).join('');
        const rightItems = shuffledRight.map(r =>
            `<div class="drag-right-item" draggable="true" data-value="${r}">${r}</div>`
        ).join('');
        return `<div class="exercise-card" data-type="drag" data-index="${idx}">
            <div class="exercise-header"><span class="exercise-badge drag">Glisser-Déposer ${idx + 1}</span></div>
            <p class="exercise-question">${ex.q}</p>
            <div class="drag-container">
                <div class="drag-left">${leftItems}</div>
                <div class="drag-right">${rightItems}</div>
            </div>
            <div class="drag-zone" id="drag-zone-${idx}">
                ${ex.pairs.map((p, i) => `<div class="drag-match" data-pair="${i}">
                    <span class="drag-match-left">${p[0]}</span>
                    <span class="drag-match-arrow">→</span>
                    <span class="drag-match-right" data-drop="${i}" ondrop="ExerciseEngine.handleDrop(event)" ondragover="event.preventDefault()">Déposer ici</span>
                </div>`).join('')}
            </div>
            <button class="exercise-submit-btn" onclick="ExerciseEngine.checkDrag(this, ${idx})"><i class="fas fa-check-double"></i> Vérifier</button>
            <div class="exercise-feedback" id="drag-feedback-${idx}"></div>
        </div>`;
    }

    function init() {
        const ch = getChapterFromPath();
        if (!ch || !DB[ch]) return;
        const container = document.getElementById('interactive-exercises');
        if (!container) return;
        const data = DB[ch];

        let html = `<div class="exercises-section">
            <h2 class="exercises-title"><i class="fas fa-dumbbell"></i> Exercices — ${data.title}</h2>
            <div class="exercise-tabs">
                <button class="exercise-tab active" data-tab="guided" onclick="ExerciseEngine.switchTab('guided')">Guidés (${data.guided.length})</button>
                <button class="exercise-tab" data-tab="quiz" onclick="ExerciseEngine.switchTab('quiz')">Quiz (${data.quiz.length})</button>
                <button class="exercise-tab" data-tab="drag" onclick="ExerciseEngine.switchTab('drag')">Drag & Drop (${data.drag.length})</button>
            </div>
            <div class="exercise-panel active" id="panel-guided">${data.guided.map((e, i) => renderGuided(e, i)).join('')}</div>
            <div class="exercise-panel" id="panel-quiz">${data.quiz.map((e, i) => renderQuiz(e, i)).join('')}</div>
            <div class="exercise-panel" id="panel-drag">${data.drag.map((e, i) => renderDrag(e, i)).join('')}</div>
        </div>`;
        container.innerHTML = html;

        // Enable drag events + click-to-select fallback for mobile
        let selectedDragItem = null;

        document.querySelectorAll('.drag-right-item').forEach(item => {
            // Desktop drag
            item.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', e.target.dataset.value);
                e.target.classList.add('dragging');
            });
            item.addEventListener('dragend', e => e.target.classList.remove('dragging'));

            // Click/tap to select (mobile + desktop fallback)
            item.addEventListener('click', () => {
                if (parseFloat(item.style.opacity) === 0.4) return; // already placed
                document.querySelectorAll('.drag-right-item.selected').forEach(s => s.classList.remove('selected'));
                item.classList.add('selected');
                selectedDragItem = item;
            });
        });

        // Click on drop zone to place selected item
        document.querySelectorAll('.drag-match-right').forEach(dropZone => {
            dropZone.addEventListener('click', () => {
                if (!selectedDragItem) return;
                const val = selectedDragItem.dataset.value;
                dropZone.textContent = val;
                dropZone.dataset.matched = val;
                selectedDragItem.style.opacity = '0.4';
                selectedDragItem.classList.remove('selected');
                selectedDragItem = null;
            });
        });
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        switchTab(tab) {
            document.querySelectorAll('.exercise-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
            document.querySelectorAll('.exercise-panel').forEach(p => p.classList.toggle('active', p.id === `panel-${tab}`));
        },
        showGuidedAnswer(btn, idx) {
            const answer = document.getElementById(`guided-answer-${idx}`);
            answer.classList.add('show');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-check"></i> Correction affichée';
            if (typeof GameEngine !== 'undefined') GameEngine.addXP(10);
        },
        checkQuiz(btn, idx, correct) {
            const card = btn.closest('.exercise-card');
            const selected = card.querySelector(`input[name="quiz-${idx}"]:checked`);
            const feedback = document.getElementById(`quiz-feedback-${idx}`);
            if (!selected) { feedback.innerHTML = '<span class="feedback-wrong">⚠️ Sélectionne une réponse !</span>'; feedback.classList.add('show'); return; }
            const val = parseInt(selected.value);
            card.querySelectorAll('.quiz-option').forEach(o => {
                const i = parseInt(o.dataset.index);
                if (i === correct) o.classList.add('correct');
                else if (i === val && val !== correct) o.classList.add('wrong');
                o.querySelector('input').disabled = true;
            });
            if (val === correct) {
                feedback.innerHTML = '<span class="feedback-correct">✅ Bonne réponse !</span>';
                if (typeof GameEngine !== 'undefined') GameEngine.addXP(15);
            } else {
                feedback.innerHTML = '<span class="feedback-wrong">❌ Mauvaise réponse.</span>';
            }
            feedback.classList.add('show');
            btn.disabled = true;
        },
        handleDrop(e) {
            e.preventDefault();
            const val = e.dataTransfer.getData('text/plain');
            e.target.textContent = val;
            e.target.dataset.matched = val;
            const src = document.querySelector(`.drag-right-item[data-value="${val}"]`);
            if (src) src.style.opacity = '0.4';
        },
        checkDrag(btn, idx) {
            const ch = getChapterFromPath();
            if (!ch || !DB[ch]) return;
            const pairs = DB[ch].drag[idx].pairs;
            const feedback = document.getElementById(`drag-feedback-${idx}`);
            let correct = 0;
            const zone = document.getElementById(`drag-zone-${idx}`);

            // Clear previous results
            zone.querySelectorAll('.drag-match-right').forEach(d => {
                d.classList.remove('correct', 'wrong');
            });

            zone.querySelectorAll('.drag-match').forEach((m, i) => {
                const drop = m.querySelector('.drag-match-right');
                if (drop.dataset.matched === pairs[i][1]) {
                    drop.classList.add('correct'); correct++;
                } else {
                    drop.classList.add('wrong');
                }
            });

            if (correct === pairs.length) {
                feedback.innerHTML = '<span class="feedback-correct">✅ Tout est correct !</span>';
                btn.disabled = true;
                if (typeof GameEngine !== 'undefined') GameEngine.addXP(20);
            } else {
                feedback.innerHTML = `<span class="feedback-wrong">❌ ${correct}/${pairs.length} correct(s). Corrige les réponses en rouge et réessaie !</span>`;
                // Reset wrong answers so user can retry
                setTimeout(() => {
                    zone.querySelectorAll('.drag-match-right.wrong').forEach(d => {
                        const oldVal = d.dataset.matched;
                        d.classList.remove('wrong');
                        d.textContent = 'Déposer ici';
                        delete d.dataset.matched;
                        // Re-enable the draggable item
                        if (oldVal) {
                            const src = document.querySelector(`.drag-right-item[data-value="${oldVal}"]`);
                            if (src) { src.style.opacity = '1'; src.classList.remove('selected'); }
                        }
                    });
                }, 1500);
            }
            feedback.classList.add('show');
        }
    };
})();
