'use strict';

const fs = require('fs');
const childProcess = require('child_process');
const crypto = require('crypto');
const catalogue = require('/project/server/exercises');
const execution = require('/project/server/services/execution');
const local = require('/project/server/services/execution/local-runner');
const { runTests } = require('/project/server/exercises/runner');

const sample = JSON.parse(fs.readFileSync('/project/verification/echantillons-identifiants.json', 'utf8'));

const proposals = {
  'asm2-c5-e1': [
    { caseNumber: 1, description: 'Considérer MOV comme une copie qui vide ses registres sources', changes: [['EAX=10', 'EAX=0'], ['EBX=20', 'EBX=0']] },
    { caseNumber: 1, description: 'Inverser destination et source dans les deux transferts entre registres', changes: [['EAX=10', 'EAX=0'], ['EBX=20', 'EBX=0'], ['ECX=10', 'ECX=0'], ['EDX=20', 'EDX=0']] }
  ],
  'sq-c5-e2': [
    { description: 'Filtrer chaque commande avec WHERE avant agrégation plutôt que le total avec HAVING', changes: [['GROUP BY client HAVING SUM(montant) >= 20000', 'WHERE montant >= 20000 GROUP BY client']] },
    { description: 'Exclure par erreur un total égal au seuil', changes: [['SUM(montant) >= 20000', 'SUM(montant) > 20000']] }
  ],
  'sql2-c5-e3': [
    { description: 'Additionner les débits aussi dans la colonne des crédits', changes: [["sens = 'CREDIT'", "sens = 'DEBIT'"]] },
    { description: 'Regrouper par sens au lieu de regrouper par transaction', changes: [['GROUP BY tx_id', 'GROUP BY sens']] }
  ],
  'sq-c2-e2': [
    { description: 'Donner zéro comme valeur par défaut au lieu de un', changes: [['DEFAULT 1', 'DEFAULT 0']] },
    { description: 'Omettre la contrainte de présence du login', changes: [['login TEXT NOT NULL', 'login TEXT']] }
  ],
  'sql3-c1-e2': [
    { description: 'Inclure à tort une transaction créée à la borne du snapshot', changes: [['xmin < 50', 'xmin <= 50']] },
    { description: 'Exclure à tort une suppression à la borne du snapshot', changes: [['xmax >= 50', 'xmax > 50']] }
  ],
  'sq-c3-e2': [
    { description: 'Exclure les bornes au lieu de les inclure', changes: [['prix BETWEEN 1000 AND 50000', 'prix > 1000 AND prix < 50000']] },
    { description: 'Rechercher Cable partout au lieu de le chercher au début', changes: [["LIKE 'Cable%'", "LIKE '%Cable%'"]] }
  ],
  'sql3-c2-e1': [
    { description: 'Compter tous les pays non nuls au lieu des pays distincts', changes: [['COUNT(DISTINCT code_pays)', 'COUNT(code_pays)']] },
    { description: 'Compter tous les emails non nuls au lieu des emails distincts', changes: [['COUNT(DISTINCT email_client)', 'COUNT(email_client)']] }
  ],
  'sql3-c6-e3': [
    { description: 'Choisir le LSN le plus petit au lieu du plus grand', changes: [['received_lsn DESC', 'received_lsn ASC']] },
    { description: 'Départager les égalités par priorité croissante', changes: [['priority DESC', 'priority ASC']] }
  ],
  'sq-c1-e1': [
    { description: 'Trier les identifiants par ordre décroissant', changes: [['ORDER BY id ASC', 'ORDER BY id DESC']] },
    { description: 'Omettre l’identifiant dans la projection de toutes les colonnes', changes: [['SELECT *', 'SELECT nom, filiere']] }
  ],
  'sql2-c3-e3': [
    { description: 'Conserver les clients qui ont une commande au lieu de ceux qui n’en ont aucune', changes: [['WHERE NOT EXISTS', 'WHERE EXISTS']] },
    { description: 'Relier l’identifiant de commande au client au lieu de la clé client', changes: [['cmd.client_id = c.id', 'cmd.id = c.id']] }
  ],
  'sq-c2-e1': [
    { description: 'Omettre la clé primaire sur le numéro de salle', changes: [['numero INT PRIMARY KEY', 'numero INT']] },
    { description: 'Autoriser un bâtiment absent malgré NOT NULL', changes: [['batiment TEXT NOT NULL', 'batiment TEXT']] }
  ],
  'sql3-c4-e3': [
    { description: 'Numéroter la racine au niveau zéro au lieu de un', changes: [['SELECT id, nom, 1 FROM', 'SELECT id, nom, 0 FROM']] },
    { description: 'Incrémenter le niveau de deux à chaque génération', changes: [['h.niveau + 1', 'h.niveau + 2']] }
  ],
  'sql3-c4-e1': [
    { description: 'Utiliser le mois suivant au lieu du mois précédent', changes: [['LAG(ca, 1, 0) OVER (ORDER BY mois ASC) AS ca_precedent', 'LEAD(ca, 1, 0) OVER (ORDER BY mois ASC) AS ca_precedent']] },
    { description: 'Inverser le signe de la variation', changes: [['ca - LAG(ca, 1, 0) OVER (ORDER BY mois ASC)', 'LAG(ca, 1, 0) OVER (ORDER BY mois ASC) - ca']] }
  ],
  'sq-c3-e1': [
    { description: 'Exclure les notes égales à douze', changes: [['note >= 12', 'note > 12']] },
    { description: 'Trier les notes par ordre croissant', changes: [['note DESC', 'note ASC']] }
  ],
  'sq-c6-e2': [
    { description: 'Supprimer aussi les sessions non expirées en oubliant le filtre', changes: [[' WHERE expiree = 1', '']] },
    { description: 'Supprimer les sessions actives plutôt que les expirées', changes: [['expiree = 1', 'expiree = 0']] }
  ],
  'sql3-c5-e1': [
    { description: 'Déclencher également une alerte lorsque le solde vaut zéro', changes: [['NEW.solde < 0', 'NEW.solde <= 0']] },
    { description: 'Déclencher à l’insertion plutôt qu’à la mise à jour', changes: [['AFTER UPDATE', 'AFTER INSERT']] }
  ],
  'sq-c1-e2': [
    { description: 'Afficher aussi credits au lieu de limiter la projection', changes: [['SELECT code, intitule', 'SELECT *']] },
    { description: 'Trier les codes dans le sens décroissant', changes: [['ORDER BY code ASC', 'ORDER BY code DESC']] }
  ],
  'sql3-c6-e1': [
    { description: 'Affecter à tort le mois 3 au second trimestre', changes: [['mois <= 3', 'mois < 3']] },
    { description: 'Affecter à tort le mois 6 au troisième trimestre', changes: [['mois <= 6', 'mois < 6']] }
  ],
  'sq-c3-e3': [
    { description: 'Comparer NULL avec le signe égal', changes: [['date_livraison IS NULL', 'date_livraison = NULL']] },
    { description: 'Sélectionner les commandes livrées au lieu des non livrées', changes: [['date_livraison IS NULL', 'date_livraison IS NOT NULL']] }
  ],
  'sql3-c3-e3': [
    { description: 'Inverser l’ordre des colonnes demandé dans l’index', changes: [['commandes(annee, montant)', 'commandes(montant, annee)']] },
    { description: 'Calculer le total de l’année précédente', changes: [['annee = 2025', 'annee = 2024']] }
  ],
  'sql2-c4-e2': [
    { description: 'Cumuler dans l’ordre inverse des jours', changes: [['SUM(montant) OVER (ORDER BY jour ASC)', 'SUM(montant) OVER (ORDER BY jour DESC)']] },
    { description: 'Répéter le total général au lieu d’un cumul progressif', changes: [['SUM(montant) OVER (ORDER BY jour ASC)', 'SUM(montant) OVER ()']] }
  ],
  'ws3-c2-e3': [
    { caseNumber: 1, description: 'Ne pas signaler la suppression d’un compte jamais créé', changes: [['ANOMALIE_ORPHELIN user=fantome actor=hacker\n', ''], ['alertes_securite=1', 'alertes_securite=0']] },
    { caseNumber: 1, description: 'Retirer un compte actif après une suppression visant un autre compte', changes: [['users_crees_actifs=1', 'users_crees_actifs=0']] }
  ],
  'cc-c5-e1': [
    { caseNumber: 1, description: 'Considérer à tort configure refusé après enable', changes: [['configure : OK', 'configure : REFUSE'], ['valides : 3/3', 'valides : 2/3']] },
    { caseNumber: 1, description: 'Considérer à tort que exit revient directement au mode utilisateur', changes: [['exit : OK', 'exit : REFUSE'], ['valides : 3/3', 'valides : 2/3']] }
  ],
  'lan3-c1-e1': [
    { caseNumber: 1, description: 'Élire la plus grande adresse MAC lorsque les priorités sont égales', changes: [['mac=00:50:56:00:00:02 role=NON_ROOT', 'mac=00:50:56:00:00:02 role=ROOT'], ['mac=00:50:56:00:00:01 role=ROOT', 'mac=00:50:56:00:00:01 role=NON_ROOT'], ['ROOT_WINNER name=SW-B total_prio=32769 mac=00:50:56:00:00:01', 'ROOT_WINNER name=SW-A total_prio=32769 mac=00:50:56:00:00:02']] },
    { caseNumber: 1, description: 'Oublier le numéro de VLAN dans la priorité totale du premier commutateur', changes: [['name=SW-A vlan=1 total_prio=32769', 'name=SW-A vlan=1 total_prio=32768']] }
  ],
  'lan3-c4-e1': [
    { caseNumber: 1, description: 'Inverser le départage alphabétique des deux chemins à égalité du modèle', changes: [['id=P1 total_cost=2 hops_count=2 status=BEST_PATH', 'id=P1 total_cost=2 hops_count=2 status=BACKUP_PATH'], ['id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH', 'id=P2 total_cost=2 hops_count=2 status=BEST_PATH'], ['best_path=P1 metric=2', 'best_path=P2 metric=2']] },
    { caseNumber: 3, description: 'Choisir le moins de sauts au lieu du coût total le plus faible', changes: [['id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH', 'id=DETOUR_FAST total_cost=20 hops_count=2 status=BACKUP_PATH'], ['id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH', 'id=DIRECT_SLOW total_cost=500 hops_count=1 status=BEST_PATH'], ['best_path=DETOUR_FAST metric=20', 'best_path=DIRECT_SLOW metric=500']] }
  ],
  'lan3-c2-e2': [
    { caseNumber: 1, description: 'Hacher uniquement le port source plutôt que source XOR destination', changes: [['hash_idx=0 port=Te1/1', 'hash_idx=1 port=Te1/2']] },
    { caseNumber: 2, description: 'Additionner les octets MAC au lieu de calculer leur XOR', changes: [['hash_idx=2 port=Eth3', 'hash_idx=1 port=Eth2']] }
  ],
  'lan3-c5-e1': [
    { caseNumber: 1, description: 'Confondre la réaction restrict avec un rejet silencieux protect', changes: [['status=VIOLATION action=DROP_ALERT', 'status=VIOLATION action=DROP_SILENT']] },
    { caseNumber: 1, description: 'Désactiver le port en mode restrict comme en mode shutdown', changes: [['status=VIOLATION action=DROP_ALERT state=UP', 'status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE']] }
  ],
  'cc-c6-e2': [
    { caseNumber: 2, description: 'Accepter gateway à la place de la configuration IP de l’étape 2', changes: [['etape 2 : NON', 'etape 2 : OK'], ['justes : 1/3', 'justes : 2/3']] },
    { caseNumber: 2, description: 'Accepter la commande IP à la place de no shutdown à l’étape 3', changes: [['etape 3 : NON', 'etape 3 : OK'], ['justes : 1/3', 'justes : 2/3']] }
  ],
  'pf3-c1-e1': [
    { caseNumber: 1, description: 'Compter les 256 adresses du /24 comme hôtes utilisables', changes: [['hosts=254', 'hosts=256']] },
    { caseNumber: 1, description: 'Confondre l’adresse de l’interface avec l’adresse du réseau', changes: [['net=10.10.20.0', 'net=10.10.20.1']] }
  ],
  'sup3-c3-e1': [
    { caseNumber: 1, description: 'Associer le code de retour zéro à WARNING au lieu de OK', changes: [['status=OK', 'status=WARNING']] },
    { caseNumber: 1, description: 'Ne relever que la première métrique perfdata et omettre la perte de paquets', changes: [[',pl=0%', '']] }
  ],
  'sup3-c5-e2': [
    { caseNumber: 1, description: 'Oublier le signe négatif de la variation et conclure à une situation normale', changes: [['deviation=-88.0% alert=LOG_DROP action=REQUIRED', 'deviation=+88.0% alert=NORMAL action=NONE']] },
    { caseNumber: 1, description: 'Comparer l’avant-dernier débit au lieu du dernier échantillon', changes: [['current=120.0 deviation=-88.0% alert=LOG_DROP action=REQUIRED', 'current=950.0 deviation=-5.0% alert=NORMAL action=NONE']] }
  ],
  'cc-c2-e1': [
    { caseNumber: 1, description: 'Ajouter à tort une couche physique distincte au modèle TCP/IP à quatre couches', changes: [['bits : ABSENT', 'bits : OK'], ['conformes : 3/4', 'conformes : 4/4']] },
    { caseNumber: 1, description: 'Exclure à tort la couche accès du modèle à quatre couches', changes: [['trame : OK', 'trame : ABSENT'], ['conformes : 3/4', 'conformes : 2/4']] }
  ],
  'cc-c2-e3': [
    { caseNumber: 1, description: 'Exclure à tort le codage de la couche présentation OSI', changes: [['codage : conforme', 'codage : a revoir'], ['conformes : 2/2', 'conformes : 1/2']] },
    { caseNumber: 1, description: 'Exclure à tort la gestion de session du modèle OSI', changes: [['session : conforme', 'session : a revoir'], ['conformes : 2/2', 'conformes : 1/2']] }
  ],
  're-c3-e2': [
    { caseNumber: 1, description: 'Refuser à tort le routeur placé en couche réseau', changes: [['routeur : couche 3', 'routeur : hors couche'], ['routeurs : 1/1', 'routeurs : 0/1']] },
    { caseNumber: 1, description: 'Classer correctement le routeur mais oublier de le compter', changes: [['routeurs : 1/1', 'routeurs : 0/1']] }
  ],
  'sup3-c4-e1': [
    { caseNumber: 1, description: 'Convertir la valeur en kibioctets alors que la métrique demande des octets', changes: [['value=1048576', 'value=1024']] },
    { caseNumber: 3, description: 'Conserver l’ordre d’entrée des labels au lieu de les trier', changes: [['labels=instance=10.0.0.1:9100,job=node-exporter', 'labels=job=node-exporter,instance=10.0.0.1:9100']] }
  ],
  'lan3-c4-e2': [
    { caseNumber: 1, description: 'Attribuer à tort le LSA de type 4 à un ASBR au lieu d’un ABR', changes: [['type=4 name=ASBR_Summary_LSA emitter=ABR', 'type=4 name=ASBR_Summary_LSA emitter=ASBR']] },
    { caseNumber: 1, description: 'Propager à tort le LSA NSSA de type 7 au niveau de tout le système autonome', changes: [['type=7 name=NSSA_External_LSA emitter=ASBR scope=NSSA_LOCAL', 'type=7 name=NSSA_External_LSA emitter=ASBR scope=AS_WIDE']] }
  ],
  'lan3-c3-e3': [
    { caseNumber: 1, description: 'Affecter le même AVF aux deux clients malgré le hachage demandé', changes: [['client=HOST_B assigned_avf=GW2 vmac=00:07:b4:00:02:02', 'client=HOST_B assigned_avf=GW1 vmac=00:07:b4:00:02:01']] },
    { caseNumber: 2, description: 'Alterner les deux routeurs sans respecter le poids deux pour un', changes: [['client=C2 assigned_avf=CORE_STRONG vmac=00:07:b4:00:03:01', 'client=C2 assigned_avf=CORE_WEAK vmac=00:07:b4:00:03:02']] }
  ],
  're-c1-e3': [
    { caseNumber: 1, description: 'Classer le WLAN comme filaire et ne pas le compter sans fil', changes: [['lycee : WLAN', 'lycee : LAN'], ['sans fil : 1/1', 'sans fil : 0/1']] },
    { caseNumber: 2, description: 'Confondre un réseau personnel PAN avec un réseau métropolitain MAN', changes: [['studio : PAN', 'studio : MAN']] }
  ],
  'na2-c3-e1': [
    { caseNumber: 1, description: 'Renvoyer un broadcast uniquement sur le port de réception au lieu de le diffuser ailleurs', changes: [['ACTION: FLOOD (ports sauf Fa0/3)', 'ACTION: FORWARD vers Fa0/3']] },
    { caseNumber: 3, description: 'Garder l’ancien port après déplacement de la source', changes: [['00:50:56:01:02:03 -> Fa0/4', '00:50:56:01:02:03 -> Fa0/1']] }
  ],
  'pf3-c5-e2': [
    { caseNumber: 1, description: 'Approuver le groupe DH faible rejeté par la règle de l’exercice', changes: [['status=REJECTED reason=WEAK_DH_GROUP level=NONE', 'status=APPROVED reason=NONE level=STANDARD']] },
    { caseNumber: 2, description: 'Approuver une clé AES de 64 bits malgré le minimum demandé', changes: [['status=REJECTED reason=WEAK_KEY_LENGTH level=NONE', 'status=APPROVED reason=NONE level=STANDARD']] }
  ],
  'pf3-c5-e3': [
    { caseNumber: 1, description: 'Envoyer le trafic Web directement malgré le mode tunnel complet', changes: [['id=P_WEB dst=142.250.200.46 tunnel=YES gw=10.200.0.1 path=TUNNEL_DEFAULT', 'id=P_WEB dst=142.250.200.46 tunnel=NO gw=192.168.0.254 path=DIRECT_INTERNET']] },
    { caseNumber: 3, description: 'Inclure à tort l’adresse voisine dans un préfixe /32', changes: [['id=NEIGHBOR dst=198.51.100.51 tunnel=NO gw=192.168.1.1 path=DIRECT_INTERNET', 'id=NEIGHBOR dst=198.51.100.51 tunnel=YES gw=10.8.0.1 path=CORPORATE_ROUTE subnet=198.51.100.50/32']] }
  ],
  'vo3-c5-e3': [
    { caseNumber: 1, description: 'Qualifier de symétrique le premier mappage identique entre les deux serveurs du modèle', changes: [['TOPOLOGIE:NAT_CONE | SOLUTION:STUN_DIRECT', 'TOPOLOGIE:NAT_SYMETRIQUE | SOLUTION:SERVEUR_RELAIS_TURN']] },
    { caseNumber: 1, description: 'Qualifier de cône le second mappage malgré le changement de port du modèle', changes: [['TOPOLOGIE:NAT_SYMETRIQUE | SOLUTION:SERVEUR_RELAIS_TURN', 'TOPOLOGIE:NAT_CONE | SOLUTION:STUN_DIRECT']] }
  ],
  'fw3-c3-e1': [
    { caseNumber: 1, description: 'Ignorer la différence de protocole entre la règle UDP et le paquet TCP', changes: [['action=DENY matched=DEFAULT_DROP', 'action=PERMIT matched=R10']] },
    { caseNumber: 1, description: 'Appliquer un permis par défaut au lieu du refus implicite', changes: [['action=DENY matched=DEFAULT_DROP', 'action=PERMIT matched=DEFAULT_DROP']] }
  ],
  'cr3-c5-e2': [
    { caseNumber: 1, description: 'Refuser à tort un nom couvert par le SAN générique du modèle', changes: [['STATUS=VALID fqdn=web.cloud.corp valid_until=2027-01-01 ca=false', 'STATUS=INVALID reason=HOSTNAME_MISMATCH']] },
    { caseNumber: 3, description: 'Accepter un certificat après sa date d’expiration', changes: [['STATUS=INVALID reason=CERTIFICATE_EXPIRED', 'STATUS=VALID fqdn=api.cloud.corp valid_until=2027-01-01 ca=false']] }
  ],
  'cs2-c1-e3': [
    { caseNumber: 1, description: 'Omettre la longueur insuffisante dans la politique fictive du cas', changes: [['manque: longueur, majuscule, special', 'manque: majuscule, special']] },
    { caseNumber: 1, description: 'Omettre le caractère spécial absent dans la politique fictive du cas', changes: [['manque: longueur, majuscule, special', 'manque: longueur, majuscule']] }
  ],
  'cs2-c1-e1': [
    { caseNumber: 1, description: 'Additionner les trois facteurs au lieu de les multiplier', changes: [['Score: 12', 'Score: 7']] },
    { caseNumber: 1, description: 'Oublier le facteur vulnérabilité dans le calcul du score', changes: [['Score: 12', 'Score: 6']] }
  ],
  'cs2-c2-e3': [
    { caseNumber: 1, description: 'Déclarer valide une signature dont le résultat ne correspond pas au message', changes: [['INVALIDE (obtenu: 166, attendu: 42)', 'VALIDE (m = 42)']] },
    { caseNumber: 1, description: 'Intervertir le résultat de la vérification et la valeur attendue', changes: [['INVALIDE (obtenu: 166, attendu: 42)', 'INVALIDE (obtenu: 42, attendu: 166)']] }
  ],
  'hk3-c3-e3': [
    { caseNumber: 1, description: 'Sous-estimer le risque associé au droit d’écriture dans le barème du cas', changes: [['risk=CRITICAL', 'risk=HIGH']] },
    { caseNumber: 1, description: 'Compter toute la liste au lieu de s’arrêter après la première correspondance', changes: [['attempts=3', 'attempts=4']] }
  ],
  'hk3-c4-e2': [
    { caseNumber: 1, description: 'Accepter une première hypothèse de caractère pourtant incorrecte', changes: [['pos=1 char=A match=FALSE delay=0.0s', 'pos=1 char=A match=TRUE delay=5.0s'], ['confirmed_chars=ROOT', 'confirmed_chars=AROOT']] },
    { caseNumber: 1, description: 'Refuser le premier caractère pourtant confirmé', changes: [['pos=1 char=R match=TRUE delay=5.0s', 'pos=1 char=R match=FALSE delay=0.0s'], ['confirmed_chars=ROOT', 'confirmed_chars=OOT']] }
  ],
  'cr3-c1-e2': [
    { caseNumber: 2, description: 'Marquer la clé comme réutilisée alors que le cas indique reuse=false', changes: [['OTP: VALID (perfect secrecy achieved)', 'OTP: INVALID (key reused, vulnerable to two-time pad attack)']] },
    { caseNumber: 3, description: 'Accepter une clé plus courte que le message dans le modèle OTP', changes: [['OTP: INVALID (key shorter than message)', 'OTP: VALID (perfect secrecy achieved)']] }
  ],
  'cy-c4-e1': [
    { caseNumber: 1, description: 'Inclure à tort le jour 46 dans le délai de 45 jours', changes: [['serveur_web : hors delai', 'serveur_web : dans les temps']] },
    { caseNumber: 1, description: 'Exclure à tort le jour 45 de la borne inclusive', changes: [['serveur_web : dans les temps', 'serveur_web : hors delai']] }
  ],
  'cr3-c6-e2': [
    { caseNumber: 1, description: 'Ignorer la mention de reprise 0-RTT et choisir 1-RTT', changes: [['rtt=0-RTT (early data)', 'rtt=1-RTT']] },
    { caseNumber: 1, description: 'Inverser les parts client et serveur dans la formule de hachage imposée', changes: [['master_secret=f91a13a53fa8daae', 'master_secret=f045176ee170ed56']] }
  ],
  'cr3-c6-e1': [
    { caseNumber: 1, description: 'Attribuer à tort un échange RSA à la suite TLS 1.3 du modèle', changes: [['kex=ECDHE/DHE', 'kex=RSA']] },
    { caseNumber: 2, description: 'Attribuer la confidentialité persistante à l’échange RSA statique', changes: [['pfs=NO status=WEAK (no forward secrecy)', 'pfs=YES status=SECURE']] }
  ],
  'cr3-c5-e1': [
    { caseNumber: 1, description: 'Rejeter à tort une signature correspondant au message dans le modèle', changes: [['status=VALID_SIGNATURE (authentic & untampered)', 'status=INVALID_SIGNATURE (tampered message or wrong key)']] },
    { caseNumber: 2, description: 'Accepter une signature dont la vérification ne correspond pas au message', changes: [['status=INVALID_SIGNATURE (tampered message or wrong key)', 'status=VALID_SIGNATURE (authentic & untampered)']] }
  ],
  'hk3-c5-e3': [
    { caseNumber: 1, description: 'Utiliser quatre octets au lieu de huit pour le pointeur x64', changes: [['ret_bytes=8', 'ret_bytes=4'], ['total_size=421', 'total_size=417']] },
    { caseNumber: 1, description: 'Omettre la taille de la zone NOP dans le total', changes: [['total_size=421', 'total_size=357']] }
  ],
  'cs2-c2-e2': [
    { caseNumber: 1, description: 'Considérer identiques deux empreintes différentes', changes: [['FALSIFIE (', 'INTEGRE (']] },
    { caseNumber: 3, description: 'Rejeter à tort une empreinte identique écrite en majuscules', changes: [['INTEGRE (', 'FALSIFIE (']] }
  ],
  'hk3-c6-e3': [
    { caseNumber: 1, description: 'Attribuer dix points à chaque faille haute au lieu de cinq', changes: [['risk_score=12', 'risk_score=22']] },
    { caseNumber: 1, description: 'Ne compter qu’une des deux failles hautes dans la synthèse', changes: [['high=2 medium=1', 'high=1 medium=1'], ['risk_score=12 posture=HIGH_EXPOSURE', 'risk_score=7 posture=MODERATE_EXPOSURE']] }
  ],
  'cr3-c2-e3': [
    { caseNumber: 1, description: 'Retirer à tort le dernier caractère du message déchiffré', changes: [['text=CRYPTO_OK', 'text=CRYPTO_O']] },
    { caseNumber: 2, description: 'Omettre le bloc de padding quand le message remplit un bloc', changes: [['blocks=2 hex=B850FA00ABFEAEE9', 'blocks=1 hex=B850FA00']] }
  ],
  'cs2-c4-e2': [
    { caseNumber: 1, description: 'Laisser le caractère esperluette non échappé', changes: [['&amp;', '&']] },
    { caseNumber: 2, description: 'Laisser les chevrons de la balise non échappés', changes: [['&lt;img', '<img'], ['&gt;', '>']] }
  ],
  'hk3-c6-e2': [
    { caseNumber: 1, description: 'Ne pas détecter la signature netcat pourtant présente', changes: [['malicious=TRUE signature=NETCAT_REVERSE_SHELL risk=CRITICAL', 'malicious=FALSE signature=CLEAN risk=LOW']] },
    { caseNumber: 1, description: 'Classer une signature netcat comme une signature Bash', changes: [['signature=NETCAT_REVERSE_SHELL', 'signature=BASH_REVERSE_SHELL']] }
  ],
  'fw3-c6-e1': [
    { caseNumber: 1, description: 'Retirer la restriction de port de la commande iptables', changes: [[' --dport 53', '']] },
    { caseNumber: 1, description: 'Utiliser TCP dans la règle nftables alors que l’entrée demande UDP', changes: [['udp dport 53', 'tcp dport 53']] }
  ],
  'cy-c6-e2': [
    { caseNumber: 1, description: 'Attribuer le système de management de la sécurité au RGPD au lieu de la norme indiquée', changes: [['ISO27001 : smsi', 'RGPD : smsi']] },
    { caseNumber: 1, description: 'Oublier de compter la norme pourtant rencontrée', changes: [['couvert : 1/1', 'couvert : 0/1']] }
  ],
  'do3-c1-e2': [
    { caseNumber: 1, description: 'Traiter la fréquence par jour comme si elle était donnée par semaine', changes: [['CLASSE=HIGH', 'CLASSE=MEDIUM']] },
    { caseNumber: 1, description: 'Traiter le délai en heures comme s’il était donné en jours', changes: [['CLASSE=HIGH', 'CLASSE=LOW']] }
  ],
  'pr-c1-e1': [
    { caseNumber: 2, description: 'Confondre PostgreSQL et la bibliothèque de l’interface graphique', changes: [['interface : ERREUR', 'interface : OK'], ['corrects : 1/4', 'corrects : 2/4']] },
    { caseNumber: 2, description: 'Confondre Tkinter et la connexion à la base de données', changes: [['connexion : ERREUR', 'connexion : OK'], ['corrects : 1/4', 'corrects : 2/4']] }
  ],
  'ro2-c1-e5': [
    { caseNumber: 1, description: 'Attribuer une remise sur volume à un défaut d’additivité', changes: [['PROPORTIONNALITE', 'ADDITIVITE']] },
    { caseNumber: 2, description: 'Traiter une décision binaire comme une variable continue', changes: [['PLNE', 'PROGRAMMATION CONTINUE']] }
  ],
  'al-c5-e1': [
    { caseNumber: 1, description: 'Considérer dépendantes les deux lignes d’une matrice inversible', changes: [['\n2\n', '\n1\n']] },
    { caseNumber: 2, description: 'Compter les trois lignes identiques comme indépendantes', changes: [['\n1\n', '\n3\n']] }
  ],
  'st-c2-e2': [
    { caseNumber: 1, description: 'Diviser les effectifs par N−1 au lieu de N', changes: [['1 20.00', '1 25.00'], ['2 40.00', '2 50.00'], ['3 40.00', '3 50.00']] },
    { caseNumber: 2, description: 'Compter une modalité une seule fois au lieu de compter ses deux occurrences', changes: [['7 100.00', '7 50.00']] }
  ],
  'ro2-c1-e3': [
    { caseNumber: 1, description: 'Retenir le candidat le moins cher sans vérifier la première contrainte', changes: [['x1=12 x2=4 COUT=92', 'x1=8 x2=5 COUT=80']] },
    { caseNumber: 1, description: 'Exclure une solution qui satisfait exactement une borne minimale', changes: [['x1=12 x2=4 COUT=92', 'x1=10 x2=6 COUT=98']] }
  ],
  'st-c4-e2': [
    { caseNumber: 1, description: 'Utiliser N−1 pour la variance au lieu de N dans le calcul demandé', changes: [['1.12', '1.29'], ['44.72', '51.64']] },
    { caseNumber: 1, description: 'Donner le rapport écart-type sur moyenne sans le convertir en pourcentage', changes: [['44.72', '0.45']] }
  ],
  'ro2-c3-e2': [
    { caseNumber: 1, description: 'Choisir le plus grand ratio au lieu du plus petit admissible', changes: [['LIGNE_1 MIN_RATIO=2.00', 'LIGNE_3 MIN_RATIO=30.00']] },
    { caseNumber: 1, description: 'Inverser le numérateur et le dénominateur de chaque ratio', changes: [['LIGNE_1 MIN_RATIO=2.00', 'LIGNE_3 MIN_RATIO=0.03']] }
  ],
  'al-c1-e2': [
    { caseNumber: 1, description: 'Ajouter le scalaire à chaque composante au lieu de multiplier', changes: [['10 -8', '7 -2']] },
    { caseNumber: 1, description: 'Perdre le signe négatif en multipliant', changes: [['10 -8', '10 8']] }
  ],
  'ro2-c1-e4': [
    { caseNumber: 1, description: 'Inverser les marges unitaires des deux produits', changes: [['40*x1 + 70*x2', '70*x1 + 40*x2']] },
    { caseNumber: 1, description: 'Minimiser la marge au lieu de la maximiser', changes: [['MAX Z', 'MIN Z']] }
  ],
  'st-c3-e2': [
    { caseNumber: 1, description: 'Prendre la moyenne simple des modalités sans leurs effectifs', changes: [['17.50', '15.00']] },
    { caseNumber: 1, description: 'Diviser la somme pondérée par le nombre de modalités au lieu de l’effectif total', changes: [['17.50', '35.00']] }
  ],
  'st-c4-e3': [
    { caseNumber: 1, description: 'Ignorer les effectifs et calculer la variance non pondérée des modalités', changes: [['18.75', '25.00']] },
    { caseNumber: 1, description: 'Donner l’écart-type au lieu de la variance demandée', changes: [['18.75', '4.33']] }
  ],
  'al-c1-e1': [
    { caseNumber: 1, description: 'Soustraire le deuxième vecteur au lieu de l’additionner', changes: [['13 2', '7 -12']] },
    { caseNumber: 1, description: 'Perdre le signe de la composante négative', changes: [['13 2', '13 12']] }
  ],
  'ro2-c6-e1': [
    { caseNumber: 1, description: 'Indiquer les dates de fin au lieu des dates de début au plus tôt', changes: [['A=0,B=4,C=9', 'A=4,B=9,C=15']] },
    { caseNumber: 1, description: 'Oublier le temps cumulé avant la tâche B', changes: [['A=0,B=4,C=9 DUREE_PROJET=15', 'A=0,B=4,C=5 DUREE_PROJET=11']] }
  ],
  'eq3-c2-e1': [
    { caseNumber: 1, description: 'Omettre la correction pour la population finie', changes: [['TAILLE_REQUISE=278', 'TAILLE_REQUISE=385']] },
    { caseNumber: 1, description: 'Arrondir la taille requise vers le bas', changes: [['TAILLE_REQUISE=278', 'TAILLE_REQUISE=277']] }
  ],
  'pb2-c3-e3': [
    { caseNumber: 1, description: 'Calculer P(X < t) au lieu de P(X ≤ t)', changes: [['0.5000', '0.2000']] },
    { caseNumber: 1, description: 'Calculer seulement P(X = t) au lieu de la probabilité cumulée', changes: [['0.5000', '0.3000']] }
  ],
  'st-c3-e3': [
    { caseNumber: 1, description: 'Prendre la valeur centrale inférieure sans moyenner les deux', changes: [['6.00', '4.00']] },
    { caseNumber: 1, description: 'Prendre la valeur centrale supérieure sans moyenner les deux', changes: [['6.00', '8.00']] }
  ],
  'ro2-c5-e1': [
    { caseNumber: 1, description: 'Affecter les offres sur la diagonale sans respecter les demandes', changes: [['FLUX: (1,1)=25.0,(2,1)=5.0,(2,2)=20.0 COUT_TOTAL=165.0', 'FLUX: (1,1)=25.0,(2,2)=25.0 COUT_TOTAL=175.0']] },
    { caseNumber: 1, description: 'Appliquer au flux (2,1) le coût unitaire de la case (1,2)', changes: [['COUT_TOTAL=165.0', 'COUT_TOTAL=170.0']] }
  ],
  'eq3-c2-e3': [
    { caseNumber: 1, description: 'Laisser les écarts positifs et négatifs s’annuler au lieu de prendre le maximum absolu', changes: [['ECART_MAX=5.0%', 'ECART_MAX=0.0%'], ['CONFORMITE=ACCEPTABLE_BIAIS_LEGER', 'CONFORMITE=EXCELLENTE_REPRESENTATIF']] },
    { caseNumber: 1, description: 'Confondre dix pour cent de variation relative avec cinq points de pourcentage', changes: [['ECART_MAX=5.0%', 'ECART_MAX=10.0%'], ['CONFORMITE=ACCEPTABLE_BIAIS_LEGER', 'CONFORMITE=REJET_BIAIS_CRITIQUE']] }
  ],
  'eq3-c4-e3': [
    { caseNumber: 1, description: 'Ne compter que les présences concordantes et ignorer les absences concordantes', changes: [['ACCORDS=8/10 (80.0%)', 'ACCORDS=4/10 (40.0%)'], ['FIABILITE=ACCEPTABLE_CONCORDANCE_MODEREE', 'FIABILITE=INSUFFISANTE_GRILLE_AMBIGUE']] },
    { caseNumber: 1, description: 'Confondre taux de désaccord et taux d’accord', changes: [['ACCORDS=8/10 (80.0%)', 'ACCORDS=2/10 (20.0%)'], ['FIABILITE=ACCEPTABLE_CONCORDANCE_MODEREE', 'FIABILITE=INSUFFISANTE_GRILLE_AMBIGUE']] }
  ],
  'pb2-c3-e1': [
    { caseNumber: 1, description: 'Moyenner les valeurs sans utiliser les probabilités', changes: [['2.3000', '2.0000']] },
    { caseNumber: 1, description: 'Attribuer les probabilités des extrémités dans l’ordre inverse', changes: [['2.3000', '1.7000']] }
  ],
  'eq3-c2-e2': [
    { caseNumber: 1, description: 'Répartir également l’échantillon au lieu de respecter les poids des strates', changes: [['n_sonde=90 (60.0%)', 'n_sonde=50 (33.3%)'], ['n_sonde=45 (30.0%)', 'n_sonde=50 (33.3%)'], ['n_sonde=15 (10.0%)', 'n_sonde=50 (33.3%)']] },
    { caseNumber: 1, description: 'Attribuer les allocations des deux premières strates dans l’ordre inverse', changes: [['n_sonde=90 (60.0%)', 'n_sonde=45 (30.0%)'], ['n_sonde=45 (30.0%)', 'n_sonde=90 (60.0%)']] }
  ],
  'fr-c4-e3': [
    { caseNumber: 2, description: 'Accepter à tort téléphoner construit sans à', changes: [['telephoner : construction fautive', 'telephoner : construction correcte'], ['solecismes : 2/2', 'solecismes : 1/2']] },
    { caseNumber: 2, description: 'Accepter à tort rappeler construit avec à', changes: [['rappeler : construction fautive', 'rappeler : construction correcte'], ['solecismes : 2/2', 'solecismes : 1/2']] }
  ],
  'vt3-c3-e1': [
    { caseNumber: 1, description: 'Attribuer au premier article le GUID du second', changes: [['ARTICLE id=cve-1', 'ARTICLE id=cve-2']] },
    { caseNumber: 1, description: 'Attribuer au premier article la date de publication du second', changes: [['date=2025-09-20', 'date=2025-10-05']] }
  ],
  'an3-c3-e1': [
    { caseNumber: 1, description: 'Qualifier de professionnel un message rempli de formulations familières', changes: [['REGISTER=UNPROFESSIONAL', 'REGISTER=PROFESSIONAL']] },
    { caseNumber: 1, description: 'Compter trois défauts alors que quatre sont énumérés', changes: [['DEFECTS=4', 'DEFECTS=3']] }
  ],
  'en-c3-e1': [
    { caseNumber: 1, description: 'Accepter une clôture isolée sans ouverture ni développement', changes: [['close : hors structure', 'close : ok'], ['presentation : a revoir', 'presentation : valide']] },
    { caseNumber: 2, description: 'Accepter deux ouvertures consécutives comme une présentation complète', changes: [['open : hors structure', 'open : ok'], ['presentation : a revoir', 'presentation : valide']] }
  ],
  'an3-c6-e3': [
    { caseNumber: 1, description: 'Oublier un mot-clé présent dans le calcul de correspondance', changes: [['MATCH=100% (4/4)', 'MATCH=75% (3/4)']] },
    { caseNumber: 1, description: 'Prendre les trois verbes faibles pour des verbes forts', changes: [['STRONG_VERBS=0 | WEAK_VERBS=3 | RATING=LOW', 'STRONG_VERBS=3 | WEAK_VERBS=0 | RATING=HIGH']] }
  ],
  'vt3-c1-e3': [
    { caseNumber: 1, description: 'Calculer le ROI sur le bénéfice brut sans retirer le coût de veille', changes: [['roi=100.00%', 'roi=200.00%']] },
    { caseNumber: 1, description: 'Prendre le bénéfice net pour le rapport bénéfices sur coûts', changes: [['bcr=2.00', 'bcr=1.00']] }
  ],
  'an3-c4-e2': [
    { caseNumber: 1, description: 'Calculer la marge de panne comme si la cible était 99,9 % plutôt que 99,99 %', changes: [['ALLOWED=4.32m', 'ALLOWED=43.20m']] },
    { caseNumber: 1, description: 'Calculer la pénalité sur le seul dépassement au lieu du downtime total spécifié', changes: [['PENALTY=2000 USD', 'PENALTY=1928 USD']] }
  ],
  'an3-c5-e1': [
    { caseNumber: 1, description: 'Traduire une indisponibilité temporaire en fermeture définitive', changes: [['temporarily unavailable', 'permanently unavailable']] },
    { caseNumber: 1, description: 'Attribuer sans élément le problème à un refus bancaire', changes: [['No money has been charged from your card.', 'Your bank declined the payment.']] }
  ],
  'an3-c5-e3': [
    { caseNumber: 1, description: 'Approuver malgré la violation de la règle blameless du modèle', changes: [['STATUS=REJECTED', 'STATUS=APPROVED']] },
    { caseNumber: 2, description: 'Attribuer le rejet à une accusation au lieu de la chaîne de pourquoi incomplète', changes: [['INCOMPLETE_5_WHYS_CHAIN', 'BLAMELESS_VIOLATION_DETECTED']] }
  ],
  'mc2-c1-e2': [
    { caseNumber: 1, description: 'Inclure l’effort germane dans la charge de base au lieu d’additionner I et E selon le modèle', changes: [['Charge: 9', 'Charge: 11']] },
    { caseNumber: 2, description: 'Compter tout l’effort germane malgré une capacité résiduelle nulle dans le modèle', changes: [['Germane_utile: 0', 'Germane_utile: 5']] }
  ],
  'an3-c2-e2': [
    { caseNumber: 1, description: 'Déclarer valide une route authentifiée sans code d’erreur d’authentification prévu', changes: [['INVALID | ISSUES=MISSING_AUTH_ERROR_CODE', 'VALID | ISSUES=NONE']] },
    { caseNumber: 2, description: 'Ne signaler que la méthode invalide en oubliant le chemin invalide', changes: [['ISSUES=INVALID_METHOD,INVALID_PATH_FORMAT', 'ISSUES=INVALID_METHOD']] }
  ],
  'fr-c6-e1': [
    { caseNumber: 1, description: 'Rejeter l’auxiliaire être avec naître dans le modèle', changes: [['naitre : auxiliaire correct', 'naitre : auxiliaire fautif'], ['erreurs : 0/1', 'erreurs : 1/1']] },
    { caseNumber: 2, description: 'Accepter être avec finir dans ce cas', changes: [['finir : auxiliaire fautif', 'finir : auxiliaire correct'], ['erreurs : 2/2', 'erreurs : 1/2']] }
  ],
  'fr-c3-e3': [
    { caseNumber: 1, description: 'Oublier le premier article signalé par le modèle', changes: [['p1 : article a enlever', 'p1 : correcte'], ['article : 2', 'article : 1'], ['total : 3/3', 'total : 2/3']] },
    { caseNumber: 1, description: 'Oublier la majuscule à corriger et sous-compter les fautes', changes: [['p3 : majuscule a enlever', 'p3 : correcte'], ['majuscule : 1', 'majuscule : 0'], ['total : 3/3', 'total : 2/3']] }
  ],
  'fr-c5-e3': [
    { caseNumber: 1, description: 'Accepter les compétences dans le premier paragraphe réservé à l’entreprise', changes: [['p1 : hors sujet (attendu entreprise)', 'p1 : conforme'], ['paragraphes : 0/3', 'paragraphes : 1/3']] },
    { caseNumber: 1, description: 'Accepter la présentation de l’entreprise dans le paragraphe des compétences', changes: [['p2 : hors sujet (attendu competences)', 'p2 : conforme'], ['paragraphes : 0/3', 'paragraphes : 1/3']] }
  ],
  'dr2-c6-e1': [
    { caseNumber: 1, description: 'Attribuer au code 68 la création de l’instance plutôt que son contrôle dans le modèle', changes: [['a68 : mission de controle', 'a68 : creation de l IPDCP']] },
    { caseNumber: 3, description: 'Confondre le code des sanctions avec celui de la création de l’instance dans le modèle', changes: [['a79 : traitements sans formalites', 'a79 : creation de l IPDCP']] }
  ],
  'dr2-c4-e3': [
    { caseNumber: 1, description: 'Confondre une loi nationale avec un traité OMPI', changes: [['protection des donnees : loi nationale', 'protection des donnees : traite OMPI'], ['bilan : 0 traite OMPI / 0 convention europeenne / 1 loi nationale', 'bilan : 1 traite OMPI / 0 convention europeenne / 0 loi nationale']] },
    { caseNumber: 2, description: 'Classer un traité OMPI comme convention européenne', changes: [['phonogrammes : traite OMPI', 'phonogrammes : convention europeenne'], ['bilan : 2 traite OMPI / 0 convention europeenne / 0 loi nationale', 'bilan : 1 traite OMPI / 1 convention europeenne / 0 loi nationale']] }
  ],
  'dr2-c2-e2': [
    { caseNumber: 1, description: 'Classer à tort un dossier médical comme donnée ordinaire dans le modèle', changes: [['dossier medical : sensible', 'dossier medical : ordinaire'], ['sensibles : 1/1', 'sensibles : 0/1']] },
    { caseNumber: 2, description: 'Classer à tort une date de naissance ordinaire comme donnée sensible dans le modèle', changes: [['date de naissance : ordinaire', 'date de naissance : sensible'], ['sensibles : 0/2', 'sensibles : 1/2']] }
  ],
  'vt3-c6-e3': [
    { caseNumber: 1, description: 'Oublier une heure de traitement du premier article et fausser la moyenne', changes: [['cycle_time=4h', 'cycle_time=3h'], ['avg_cycle_time=5.0h', 'avg_cycle_time=4.5h']] },
    { caseNumber: 1, description: 'Ne compter qu’une diffusion sur deux dans le taux d’approbation', changes: [['taux_approbation=100.0%', 'taux_approbation=50.0%']] }
  ],
  'dt3-c6-e1': [
    { caseNumber: 1, description: 'Prendre le nombre total de mots pour la longueur moyenne par phrase', changes: [['ASL=11.0', 'ASL=22.0']] },
    { caseNumber: 2, description: 'Compter une seule phrase malgré les deux séparateurs du cas', changes: [['PHRASES=2 -> ASL=17.0', 'PHRASES=1 -> ASL=34.0']] }
  ],
  'vt3-c4-e2': [
    { caseNumber: 1, description: 'Attribuer un score positif au document ne contenant aucun des termes cherchés', changes: [['RANK id=B score=0.0000', 'RANK id=B score=0.4016']] },
    { caseNumber: 1, description: 'Choisir comme meilleur résultat le document de score nul', changes: [['top_doc=A top_score=0.4016', 'top_doc=B top_score=0.0000']] }
  ],
  'gcp3-c4-e2': [
    { caseNumber: 1, description: 'Appliquer une règle UDP à un paquet TCP', changes: [['action=DENY matched_priority=65535 (implicit_deny)', 'action=ALLOW matched_priority=500']] },
    { caseNumber: 2, description: 'Ignorer la priorité numérique la plus faible et autoriser SSH', changes: [['action=DENY matched_priority=100', 'action=ALLOW matched_priority=1000']] }
  ],
  'az3-c6-e2': [
    { caseNumber: 1, description: 'Ne pas déclencher l’alerte CPU malgré le dépassement du seuil', changes: [['ALERT_FIRED: metric=CPU val=92.0% threshold=75% severity=Sev1 action=TRIGGER_ACTION_GROUP', 'ALERT_OK: metric=CPU val=92.0%']] },
    { caseNumber: 2, description: 'Ne pas déclencher l’alerte de prévision malgré le dépassement du budget', changes: [['ALERT_FIRED: metric=SPEND_FORECAST val=550.00EUR threshold=500.00EUR (pct=100%) severity=Sev1 action=NOTIFY_FINOPS', 'ALERT_OK: metric=SPEND_FORECAST val=550.00EUR']] }
  ],
  'do3-c6-e3': [
    { caseNumber: 1, description: 'Oublier une des trois transitions d’état de la séquence', changes: [['BASCULES=3', 'BASCULES=2']] },
    { caseNumber: 2, description: 'Diagnostiquer un flapping malgré une séquence sans transition', changes: [['DIAGNOSTIC=STABLE', 'DIAGNOSTIC=FLAPPING_INSTABILITE (RECOMMANDATION=AJOUTER_FOR_CLAUSE)']] }
  ],
  'az3-c3-e3': [
    { caseNumber: 1, description: 'Confondre les versions de production et staging après le swap simulé', changes: [['SWAP_SUCCESS: prod=v1.2.0-rc1 stage=v1.0.0', 'SWAP_SUCCESS: prod=v1.0.0 stage=v1.2.0-rc1'], ['CURRENT_STATE: prod=v1.2.0-rc1 stage=v1.0.0', 'CURRENT_STATE: prod=v1.0.0 stage=v1.2.0-rc1']] },
    { caseNumber: 2, description: 'Effectuer le swap malgré la sonde en erreur et le rollback demandé par le modèle', changes: [['SWAP_ABORTED: probe_failed (status=500), rollback to v1.0.0', 'SWAP_SUCCESS: prod=v2.0.0-bug stage=v1.0.0'], ['CURRENT_STATE: prod=v1.0.0 stage=none', 'CURRENT_STATE: prod=v2.0.0-bug stage=v1.0.0']] }
  ],
  'az3-c2-e1': [
    { caseNumber: 1, description: 'Accorder une écriture à un rôle Reader selon la matrice donnée', changes: [['ACTION Microsoft.Compute/virtualMachines/write -> DENIED', 'ACTION Microsoft.Compute/virtualMachines/write -> ALLOWED']] },
    { caseNumber: 2, description: 'Autoriser Contributor à modifier les affectations de rôle selon la matrice donnée', changes: [['ACTION Microsoft.Authorization/roleAssignments/write -> DENIED', 'ACTION Microsoft.Authorization/roleAssignments/write -> ALLOWED']] }
  ],
  'gcp3-c4-e3': [
    { caseNumber: 1, description: 'Diriger une URL statique vers un autre backend', changes: [['backend=cdn-static-backend', 'backend=default-backend']] },
    { caseNumber: 2, description: 'Appliquer la règle de banque à un autre hôte et à un autre chemin', changes: [['status=404_NOT_FOUND', 'backend=banking-backend protocol=HTTPS status=FORWARDED']] }
  ],
  'do3-c2-e2': [
    { caseNumber: 1, description: 'Valider une couverture sous le seuil du modèle', changes: [['STATUT=FAILED | MOTIFS=[COUVERTURE_INSUFFISANTE]', 'STATUT=PASSED | MOTIFS=[]']] },
    { caseNumber: 2, description: 'Valider malgré une vulnérabilité détectée', changes: [['STATUT=FAILED | MOTIFS=[VULNERABILITES_DETECTEES]', 'STATUT=PASSED | MOTIFS=[]']] }
  ],
  'az3-c4-e1': [
    { caseNumber: 1, description: 'Oublier la première adresse disponible du sous-réseau', changes: [['RANGE=10.0.10.4-10.0.10.254', 'RANGE=10.0.10.5-10.0.10.254']] },
    { caseNumber: 2, description: 'Réserver seulement deux adresses au lieu des cinq annoncées', changes: [['USABLE=59 RESERVED=5', 'USABLE=62 RESERVED=2']] }
  ],
  'cc3-c3-e3': [
    { caseNumber: 1, description: 'Identifier le CPU comme facteur limitant malgré le besoin supérieur en IOPS', changes: [['LIMITANT=IOPS', 'LIMITANT=CPU']] },
    { caseNumber: 2, description: 'Arrondir le besoin mémoire vers le bas au lieu de prévoir assez d’instances', changes: [['INSTANCES=11 (CPU=1, RAM=11, IOPS=1)', 'INSTANCES=10 (CPU=1, RAM=10, IOPS=1)']] }
  ],
  'az3-c1-e1': [
    { caseNumber: 1, description: 'Oublier un niveau dans la profondeur de la première hiérarchie', changes: [['depth=4 sub=sub-corp-01', 'depth=3 sub=sub-corp-01']] },
    { caseNumber: 1, description: 'Attribuer à la première hiérarchie l’abonnement de la seconde', changes: [['sub=sub-corp-01 rg=rg-web-prod-fc-01', 'sub=sub-sandbox-02 rg=rg-web-prod-fc-01']] }
  ],
  'aws3-c3-e1': [
    { caseNumber: 1, description: 'Facturer la base à la demande sans appliquer la remise réservée du scénario', changes: [['baseline_cost=46.80$ spike_cost=0.00$ total_cost=46.80$ savings_pct=35.00%', 'baseline_cost=72.00$ spike_cost=0.00$ total_cost=72.00$ savings_pct=0.00%']] },
    { caseNumber: 2, description: 'Facturer le pic à plein tarif sans appliquer la remise Spot du scénario', changes: [['spike_cost=12.00$ total_cost=12.00$ savings_pct=75.00%', 'spike_cost=48.00$ total_cost=48.00$ savings_pct=0.00%']] }
  ],
  'cc3-c6-e3': [
    { caseNumber: 1, description: 'Intervertir les coûts attribués à la réservation et au Spot', changes: [['RI=$144.00, SPOT=$720.00', 'RI=$720.00, SPOT=$144.00']] },
    { caseNumber: 1, description: 'Oublier les heures de burst dans le coût de référence et l’économie', changes: [['COUT_NAIF=$2760.00', 'COUT_NAIF=$2640.00'], ['ECONOMIE=$1776.00 (-64.3%)', 'ECONOMIE=$1656.00 (-62.7%)']] }
  ],
  'cc3-c5-e1': [
    { caseNumber: 1, description: 'Attribuer la sécurité physique du centre de données IaaS au client dans la matrice donnée', changes: [['RESPONSABLE=CSP', 'RESPONSABLE=CLIENT']] },
    { caseNumber: 2, description: 'Attribuer la configuration de pare-feu réseau IaaS au fournisseur dans la matrice donnée', changes: [['RESPONSABLE=CLIENT', 'RESPONSABLE=CSP']] }
  ],
  'do3-c1-e1': [
    { caseNumber: 1, description: 'Surestimer la moyenne des cinq dimensions du barème', changes: [['MOYENNE=2.20/5 (44.0%)', 'MOYENNE=3.20/5 (64.0%)']] },
    { caseNumber: 2, description: 'Omettre l’axe Culture pourtant sous le seuil prioritaire de l’exercice', changes: [['AXES_PRIORITAIRES=[CULTURE]', 'AXES_PRIORITAIRES=[]']] }
  ],
  'gcp3-c5-e2': [
    { caseNumber: 1, description: 'Ne pas respecter le choix Cloud SQL fixé pour le cas relationnel régional', changes: [['service=Cloud_SQL type=RDBMS sla=99.95%', 'service=Cloud_Spanner type=NEW_SQL sla=99.999%']] },
    { caseNumber: 2, description: 'Confondre la base à colonnes larges avec une base documentaire', changes: [['service=Cloud_Bigtable type=WIDE_COLUMN usecase=IOT_ANALYTICS', 'service=Firestore type=DOCUMENT_DB latency=LOW']] }
  ],
  'gcp3-c6-e3': [
    { caseNumber: 1, description: 'Accepter un fichier de clé indiqué en dur selon les règles du linter fictif', changes: [['status=REJECTED reason=HARDCODED_SECRETS', 'status=APPROVED reason=NONE']] },
    { caseNumber: 2, description: 'Accepter l’ouverture de SSH à toutes les sources selon le linter fictif', changes: [['status=REJECTED reason=OPEN_INGRESS_MANAGEMENT_PORT port=22', 'status=APPROVED reason=NONE']] }
  ],
  'ig2-c1-e3': [
    { caseNumber: 1, description: 'Choisir JPEG malgré le besoin de transparence alpha', changes: [['FORMAT: WebP', 'FORMAT: JPEG']] },
    { caseNumber: 2, description: 'Confondre un format matriciel avec le format vectoriel demandé', changes: [['FORMAT: SVG', 'FORMAT: PNG']] }
  ],
  'ux2-c3-e3': [
    { caseNumber: 1, description: 'Attribuer une erreur technique incompréhensible à la mauvaise heuristique', changes: [['[H9] Diagnostic clair des erreurs', '[H2] Correspondance monde reel']] },
    { caseNumber: 2, description: 'Confondre mémorisation et cohérence graphique', changes: [['[H6] Reconnaissance plutot que rappel', '[H4] Coherence et standards']] }
  ],
  'ib2-c4-e2': [
    { caseNumber: 1, description: 'Oublier une exigence Must dans les poids et le total', changes: [['"Must": 13', '"Must": 8'], ['"Total": 13', '"Total": 8']] },
    { caseNumber: 2, description: 'Omettre les exigences Wont du total prévu par le barème', changes: [['"Total": 21', '"Total": 16']] }
  ],
  'um2-c2-e2': [
    { caseNumber: 1, description: 'Oublier le cas d’utilisation hérité de l’infirmier', changes: [['Infirmier (Directs: 1, Total: 2) -> AdministrerSoin, ConsulterDossier', 'Infirmier (Directs: 1, Total: 1) -> AdministrerSoin']] },
    { caseNumber: 1, description: 'Oublier le cas d’utilisation hérité du médecin', changes: [['Medecin (Directs: 1, Total: 2) -> ConsulterDossier, PrescrireTraitement', 'Medecin (Directs: 1, Total: 1) -> PrescrireTraitement']] }
  ],
  'pr-c5-e1': [
    { caseNumber: 1, description: 'Ranger le stock nul en alerte plutôt qu’en rupture', changes: [['a : rupture', 'a : alerte'], ['ruptures : 1', 'ruptures : 0'], ['alertes : 2', 'alertes : 3']] },
    { caseNumber: 1, description: 'Ne pas détecter un stock inférieur au seuil d’alerte', changes: [['b : alerte', 'b : ok'], ['alertes : 2', 'alertes : 1']] }
  ],
  'ux2-c6-e1': [
    { caseNumber: 1, description: 'Introduire une erreur de décimale dans le contraste noir-blanc', changes: [['CONTRASTE: 21.00:1', 'CONTRASTE: 2.10:1']] },
    { caseNumber: 2, description: 'Attribuer AAA au texte normal avec un contraste inférieur à 7:1', changes: [['NORMAL: AA', 'NORMAL: AAA']] }
  ],
  'ag3-c5-e1': [
    { caseNumber: 1, description: 'Calculer une moyenne trop faible et en déduire un sprint supplémentaire', changes: [['avg_velocity=31.0', 'avg_velocity=30.0'], ['sprints_needed=5', 'sprints_needed=6']] },
    { caseNumber: 2, description: 'Sous-estimer le nombre de sprints nécessaires', changes: [['sprints_needed=2', 'sprints_needed=1']] }
  ],
  'ig2-c6-e3': [
    { caseNumber: 1, description: 'Oublier le dernier niveau de mipmap 1×1', changes: [['13 NIVEAUX', '12 NIVEAUX']] },
    { caseNumber: 1, description: 'Compter la seule texture initiale en oubliant les mipmaps', changes: [['TOTAL: 87381.33 Ko', 'TOTAL: 65536.00 Ko'], ['SURCOUT: +33.33%', 'SURCOUT: +0.00%']] }
  ],
  'erp2-c3-e3': [
    { caseNumber: 1, description: 'Conserver la version ancienne au lieu de la version la plus récente', changes: [['"nom": "ROBERT", "version": 3', '"nom": "BOB", "version": 1']] },
    { caseNumber: 2, description: 'Oublier la normalisation des noms en majuscules', changes: [['"nom": "ADAM"', '"nom": "Adam"'], ['"nom": "ZACK"', '"nom": "Zack"']] }
  ],
  'ib2-c6-e1': [
    { caseNumber: 1, description: 'Oublier un critère INVEST manquant et surestimer le score', changes: [['NON_CONFORME (4/6)', 'NON_CONFORME (5/6)'], ['Negociable, Small', 'Negociable']] },
    { caseNumber: 2, description: 'Déclarer conforme une user story non testable', changes: [['NON_CONFORME (5/6)', 'CONFORME (5/6)']] }
  ],
  'ag3-c6-e1': [
    { caseNumber: 1, description: 'Déclarer une dépendance simultanée munie d’une marge', changes: [['status=TIGHT_COUPLING detail=lag=0sprints', 'status=FEASIBLE_BUFFER detail=margin=+1sprints']] },
    { caseNumber: 2, description: 'Sous-estimer la marge entre les sprints fournisseur et client', changes: [['margin=+3sprints', 'margin=+1sprints']] }
  ],
  'pr-c2-e3': [
    { caseNumber: 1, description: 'Accepter les deux dernières opérations inversées dans la grille ordonnée', changes: [['etape 3 : NON', 'etape 3 : OK'], ['etape 4 : NON', 'etape 4 : OK'], ['etapes correctes : 2/4', 'etapes correctes : 4/4']] },
    { caseNumber: 2, description: 'Accepter les requêtes INSERT et SELECT échangées', changes: [['etape 1 : NON', 'etape 1 : OK'], ['etape 2 : NON', 'etape 2 : OK'], ['etapes correctes : 2/4', 'etapes correctes : 4/4']] }
  ],
  'ib2-c5-e3': [
    { caseNumber: 1, description: 'Ranger l’événement dans le champ contexte', changes: [['"contexte": "un panier contenant 2 articles"', '"contexte": "l utilisateur clique sur Commander"']] },
    { caseNumber: 3, description: 'Conserver la ponctuation finale contrairement à la consigne de normalisation', changes: [['"resultat_attendu": "un message invite au renouvellement"', '"resultat_attendu": "un message invite au renouvellement."']] }
  ],
  'ig2-c5-e2': [
    { caseNumber: 1, description: 'Oublier l’exposant de brillance dans le modèle de Phong', changes: [['INTENSITE_SPECULAIRE: 0.316', 'INTENSITE_SPECULAIRE: 0.866']] },
    { caseNumber: 2, description: 'Employer l’exposant 8 au lieu de 128', changes: [['INTENSITE_SPECULAIRE: 0.526', 'INTENSITE_SPECULAIRE: 0.961']] }
  ],
  'vrt3-c4-e1': [
    { caseNumber: 1, description: 'Accepter le VLAN 5000 malgré la plage prévue par le modèle', changes: [['VLAN:5000 | MODE:INVALID_VLAN', 'VLAN:5000 | MODE:VST']] },
    { caseNumber: 1, description: 'Oublier la redondance du groupe Storage-iSCSI', changes: [['FRAMES:JUMBO_ENABLED | REDUNDANCY:REDUNDANT', 'FRAMES:JUMBO_ENABLED | REDUNDANCY:SINGLE_UPLINK_WARNING']] }
  ],
  'ar-c3-e2': [
    { caseNumber: 1, description: 'Inverser les bits sans ajouter un au complément à deux', changes: [['0010 : c2=1110', '0010 : c2=1101']] },
    { caseNumber: 1, description: 'Confondre le complément à deux de 1000 avec zéro', changes: [['1000 : c2=1000', '1000 : c2=0000']] }
  ],
  'aw-c2-e1': [
    { caseNumber: 2, description: 'Accepter la caractéristique illimitée pour Standard dans cette grille historique', changes: [['standard : ERREUR', 'standard : OK'], ['correctes : 1/4', 'correctes : 2/4']] },
    { caseNumber: 2, description: 'Accepter la caractéristique vm2 pour Datacenter dans la grille historique', changes: [['datacenter : ERREUR', 'datacenter : OK'], ['correctes : 1/4', 'correctes : 2/4']] }
  ],
  'vrt3-c1-e2': [
    { caseNumber: 1, description: 'Oublier le partage mémoire TPS dans le déficit et le swap simulés', changes: [['DEFICIT:40.0GB', 'DEFICIT:48.0GB'], ['SWAP:26.8GB', 'SWAP:34.8GB']] },
    { caseNumber: 2, description: 'Ignorer la compression et transférer sa part en swap', changes: [['COMPRESSED:1.5GB', 'COMPRESSED:0.0GB'], ['SWAP:1.5GB', 'SWAP:3.0GB']] }
  ],
  'ws3-c3-e3': [
    { caseNumber: 1, description: 'Appliquer la GPO sans respecter le filtre WMI de mémoire', changes: [['statut=IGNORE motif=REFUS_WMI', 'statut=APPLIQUE motif=OK'], ['appliquees=0 ignorees=1', 'appliquees=1 ignorees=0']] },
    { caseNumber: 2, description: 'Appliquer la GPO malgré une architecture cliente incompatible', changes: [['statut=IGNORE motif=REFUS_WMI', 'statut=APPLIQUE motif=OK'], ['appliquees=0 ignorees=1', 'appliquees=1 ignorees=0']] }
  ],
  'aw-c2-e3': [
    { caseNumber: 1, description: 'Inverser le nom de machine et le compte dans une connexion locale', changes: [['VM2012R2TEST\\admin', 'admin\\VM2012R2TEST']] },
    { caseNumber: 2, description: 'Inverser domaine et utilisateur dans un nom UPN', changes: [['iziti@ntic.ma', 'ntic.ma@iziti']] }
  ],
  'aw-c4-e3': [
    { caseNumber: 1, description: 'Classer un compte dans la mauvaise unité d’organisation', changes: [['\niziti : TRI\n', '\niziti : VENTES\n'], ['TRI : 3 objets', 'TRI : 2 objets'], ['VENTES : 1 objets', 'VENTES : 2 objets']] },
    { caseNumber: 2, description: 'Compter les objets mais oublier qu’ils partagent la même unité', changes: [['uos : 1', 'uos : 4']] }
  ],
  'ar-c2-e1': [
    { caseNumber: 1, description: 'Interpréter les chiffres binaires comme une valeur décimale écrite telle quelle', changes: [['1011 : decimal=11', '1011 : decimal=1011']] },
    { caseNumber: 1, description: 'Décaler d’un rang la puissance de deux de 10000', changes: [['10000 : decimal=16', '10000 : decimal=8']] }
  ],
  'asm2-c3-e3': [
    { caseNumber: 2, description: 'Additionner directement segment et déplacement sans multiplier le segment par 16', changes: [['PHY=0x10250 DEC=66128', 'PHY=0x01250 DEC=4688']] },
    { caseNumber: 2, description: 'Lire les chiffres hexadécimaux comme des chiffres décimaux', changes: [['PHY=0x10250 DEC=66128', 'PHY=0x10250 DEC=10250']] }
  ],
  'algo-c6-e3': [
    { description: 'Trier par sélection dans le sens décroissant', changes: [['tableau[i] < tableau[indice_min]', 'tableau[i] > tableau[indice_min]']] },
    { description: 'Arrêter le tri avant le dernier échange nécessaire', changes: [['range(n - 1)', 'range(n - 2)']] }
  ],
  'fl2-c1-e1': [
    { description: 'Confondre le chemin HTTP et la méthode', changes: [['Chemin: {chemin}', 'Chemin: {methode}']] },
    { description: 'Confondre la version HTTP et la méthode', changes: [['Version: {version}', 'Version: {methode}']] }
  ],
  'web-c4-e3': [
    { description: 'Diviser les unités relatives par leur base au lieu de les multiplier', changes: [['nombre * base', 'nombre / base']] },
    { description: 'Imposer une base fixe de 16 pixels au lieu de celle fournie', changes: [['nombre * base', 'nombre * 16']] }
  ],
  'algo-c4-e3': [
    { description: 'Initialiser le produit de la factorielle à zéro', changes: [['produit = 1', 'produit = 0']] },
    { description: 'Oublier le dernier facteur de n factorielle', changes: [['range(1, n + 1)', 'range(1, n)']] }
  ],
  'c-c8-e2': [
    { description: 'Additionner les côtés au lieu de calculer l’aire', changes: [['return largeur * hauteur;', 'return largeur + hauteur;']] },
    { description: 'Appliquer la formule de l’aire d’un triangle à un rectangle', changes: [['return largeur * hauteur;', 'return largeur * hauteur / 2;']] }
  ],
  'c-c3-e3': [
    { description: 'Exclure n de la somme de 1 à n', changes: [['i <= n', 'i < n']] },
    { description: 'Compter les itérations au lieu de sommer les entiers', changes: [['somme += i', 'somme += 1']] }
  ],
  'php-c3-e2': [
    { description: 'Exclure un panier égal au seuil de livraison gratuite', changes: [['$panier >= 50', '$panier > 50']] },
    { description: 'Facturer dix euros au lieu des cinq demandés', changes: [['$total = $panier + 5', '$total = $panier + 10']] }
  ],
  'al3-c5-e1': [
    { description: 'Mettre à jour la distance lorsque le chemin est plus long au lieu de plus court', changes: [['dist_u + w < dist_v_before', 'dist_u + w > dist_v_before']] },
    { description: 'Oublier le poids de l’arc dans la nouvelle distance', changes: [['dist_v_after = dist_u + w', 'dist_v_after = dist_u']] }
  ],
  'c-c2-e3': [
    { description: 'Effectuer une division entière avant l’affichage décimal', changes: [['(a + b + c) / 3.0', '(double)((a + b + c) / 3)']] },
    { description: 'Omettre la troisième note du numérateur', changes: [['(a + b + c) / 3.0', '(a + b) / 3.0']] }
  ],
  'algo-c10-e1': [
    { description: 'Appliquer 10 % dès exactement 50 articles malgré le seuil strict', changes: [['quantite > 50', 'quantite >= 50']] },
    { description: 'Appliquer 5 % dès exactement 10 articles malgré le seuil strict', changes: [['quantite > 10', 'quantite >= 10']] }
  ],
  'web-c1-e2': [
    { description: 'Utiliser les dizaines plutôt que les centaines pour choisir la famille HTTP', changes: [['Math.floor(code / 100)', 'Math.floor(code / 10)']] },
    { description: 'Arrondir au lieu de prendre la centaine inférieure', changes: [['Math.floor(code / 100)', 'Math.round(code / 100)']] }
  ],
  'php2-c5-e2': [
    { description: 'Interdire à tort le retrait inférieur au solde', changes: [['$montant > $solde', '$montant < $solde']] },
    { description: 'Inverser solde et montant dans le calcul du reste', changes: [['return $solde - $montant', 'return $montant - $solde']] }
  ],
  'php2-c3-e3': [
    { description: 'Omettre le prix dans la représentation du produit', changes: [["return $this->nom . ' (' . $this->prix . ' EUR)';", 'return $this->nom;']] },
    { description: 'Inverser nom et prix dans la représentation du produit', changes: [["return $this->nom . ' (' . $this->prix . ' EUR)';", "return $this->prix . ' (' . $this->nom . ' EUR)';"]] }
  ],
  'php-c7-e2': [
    { description: 'Stocker un article au lieu de sa quantité', changes: [['$stock[$parts[0]] = (int)$parts[1]', '$stock[$parts[0]] = 1']] },
    { description: 'Remplacer le total par la dernière quantité au lieu de l’accumuler', changes: [['$total += $quantite', '$total = $quantite']] }
  ],
  'web-c1-e1': [
    { description: 'Inclure le séparateur point d’interrogation dans la requête', changes: [['cheminRequete.slice(interrogation + 1)', 'cheminRequete.slice(interrogation)']] },
    { description: 'Inclure à tort le chemin dans l’hôte', changes: [['reste.slice(0, barre)', 'reste']] }
  ],
  'php-c6-e1': [
    { description: 'Omettre le nom dans le message de bienvenue', changes: [['return "Bienvenue $nom";', 'return "Bienvenue";']] },
    { description: 'Remplacer le nom par sa seule initiale', changes: [['return "Bienvenue $nom";', 'return "Bienvenue " . substr($nom, 0, 1);']] }
  ],
  'lx2-c3-e2': [
    { description: 'Examiner les permissions du groupe au lieu du propriétaire', changes: [['cut -c1-3', 'cut -c4-6']] },
    { description: 'Confondre le droit de lecture avec celui d’écriture', changes: [['lire) case "$trio" in *r*', 'lire) case "$trio" in *w*']] }
  ],
  'lx-c2-e3': [
    { description: 'Inverser les liens symboliques et leurs cibles', changes: [['liens[$cible]="$source"', 'liens[$source]="$cible"']] },
    { description: 'Rester sur le lien courant au lieu de suivre sa cible', changes: [['courant="${liens[$courant]}"', 'courant="$courant"']] }
  ],
  'lx2-c6-e1': [
    { description: 'Redémarrer un service inactif au lieu de le démarrer', changes: [['inactive) echo "$service : demarrer"', 'inactive) echo "$service : redemarrer"']] },
    { description: 'Ne rien faire lorsqu’un service est en échec', changes: [['failed) echo "$service : redemarrer"', 'failed) echo "$service : rien a faire"']] }
  ],
  'gt-c1-e2': [
    { description: 'Autoriser le commit lorsqu’un seul élément de l’identité est configuré', changes: [['[ "$has_name" = "1" ] && [ "$has_email" = "1" ]', '[ "$has_name" = "1" ] || [ "$has_email" = "1" ]']] },
    { description: 'Reconnaître la mauvaise clé de configuration du courrier', changes: [['"user.email"', '"user.mail"']] }
  ],
  'gt-c6-e1': [
    { description: 'Oublier de vider la copie de travail après le stash', changes: [['remises+=("$copie")\n    copie=0', 'remises+=("$copie")\n    copie=$copie']] },
    { description: 'Remplacer au lieu d’ajouter les modifications récupérées', changes: [['copie=$((copie + ${remises[$dernier]}))', 'copie=${remises[$dernier]}']] }
  ],
  'gt-c4-e2': [
    { description: 'Oublier l’historique hérité par une nouvelle branche', changes: [['comptes+=("${comptes[$courante]}")', 'comptes+=(0)']] },
    { description: 'Compter chaque commit deux fois', changes: [['${comptes[$courante]} + 1', '${comptes[$courante]} + 2']] }
  ],
  'java2-c1-e3': [
    { description: 'Inverser le facteur de conversion Celsius vers Fahrenheit', changes: [['celsius * 9.0 / 5.0 + 32.0', 'celsius * 5.0 / 9.0 + 32.0']] },
    { description: 'Oublier le décalage de 32 degrés Fahrenheit', changes: [['celsius * 9.0 / 5.0 + 32.0', 'celsius * 9.0 / 5.0']] }
  ],
  'vm2-c5-e3': [
    { description: 'Autoriser tous les ports entre LAN et DMZ', changes: [['$memeZone -or ($traversee -and $port -eq 443)', '$memeZone -or $traversee']] },
    { description: 'Autoriser le port 80 plutôt que 443 entre LAN et DMZ', changes: [['$port -eq 443', '$port -eq 80']] }
  ],
  'ws2-c2-e2': [
    { description: 'Inverser requêtes et serveurs dans la répartition', changes: [['$requetes / $serveurs', '$serveurs / $requetes']] },
    { description: 'Arrondir vers le haut au lieu de prendre la division entière', changes: [['[math]::Floor', '[math]::Ceiling']] }
  ],
  'vm2-c6-e3': [
    { description: 'Confondre le volume restant avec le volume éliminé', changes: [['(100 - $taux)', '$taux']] },
    { description: 'Ajouter le taux dédupliqué au lieu de le retrancher', changes: [['(100 - $taux)', '(100 + $taux)']] }
  ],
  'vm2-c3-e2': [
    { description: 'Attribuer la supervision à la phase de conception', changes: [['"conception" { Write-Output "tache : definir les besoins" }', '"conception" { Write-Output "tache : superviser et sauvegarder" }']] },
    { description: 'Attribuer la définition des besoins à l’exploitation', changes: [['"exploitation" { Write-Output "tache : superviser et sauvegarder" }', '"exploitation" { Write-Output "tache : definir les besoins" }']] }
  ],
  'ws2-c3-e1': [
    { description: 'Assimiler une égalité à une majorité stricte', changes: [['$enLigne * 2 -gt $total', '$enLigne * 2 -ge $total']] },
    { description: 'Se contenter d’un tiers des membres pour une majorité', changes: [['$enLigne * 2 -gt $total', '$enLigne * 3 -gt $total']] }
  ],
  'vm2-c1-e1': [
    { description: 'Additionner serveurs et VM par serveur au lieu de les multiplier', changes: [['$serveurs * $parServeur', '$serveurs + $parServeur']] },
    { description: 'Oublier un serveur dans le nombre de VM', changes: [['$serveurs * $parServeur', '($serveurs - 1) * $parServeur']] }
  ],
  'vm2-c5-e2': [
    { description: 'Confondre la zone utilisateurs avec la zone serveurs pour le VLAN 10', changes: [['vlan 10 : utilisateurs', 'vlan 10 : serveurs']] },
    { description: 'Confondre la DMZ avec la zone utilisateurs pour le VLAN 30', changes: [['vlan 30 : DMZ', 'vlan 30 : utilisateurs']] }
  ]
};

function nativeCommand(command, args, input, timeout = 5000) {
  const result = childProcess.spawnSync(command, args, {
    input, encoding: 'utf8', timeout, maxBuffer: 1024 * 1024, cwd: '/tmp',
    env: { PATH: '/usr/bin:/bin', HOME: '/tmp', LANG: 'C.UTF-8' }
  });
  return {
    ok: result.status === 0 && !result.error,
    stdout: result.stdout || '',
    stderr: result.stderr || (result.error ? result.error.message : ''),
    exitCode: result.status,
    status: result.status === 0 && !result.error ? 'success' : 'runtime_error'
  };
}

function prepareNative(language, code) {
  if (language === 'python') return { command: '/usr/bin/python3', args: ['-I', '-c', code] };
  if (language === 'javascript') return { command: '/usr/bin/node', args: ['--max-old-space-size=96', '-e', code] };
  if (language === 'shell') return { command: '/bin/bash', args: ['-c', code] };
  const name = `/tmp/audit-${crypto.createHash('sha256').update(code).digest('hex').slice(0, 20)}`;
  if (language === 'powershell') {
    fs.writeFileSync(name + '.ps1', code);
    return { command: '/runtimes/powershell/pwsh', args: ['-NoLogo', '-NoProfile', '-NonInteractive', '-File', name + '.ps1'] };
  }
  if (language === 'java') {
    fs.mkdirSync(name, { recursive: true });
    fs.writeFileSync(name + '/Main.java', code);
    const result = nativeCommand('/runtimes/jdk/bin/javac', ['-encoding', 'UTF-8', '-d', name, name + '/Main.java'], '', 30000);
    return result.ok ? { command: '/runtimes/jdk/bin/java', args: ['-cp', name, 'Main'] } : { error: 'compilation Java impossible' };
  }
  if (language === 'php') {
    fs.writeFileSync(name + '.php', code);
    return { command: '/project/tools/php-cli/php', args: ['-n', name + '.php'] };
  }
  if (language === 'c' || language === 'cpp') {
    const compiler = language === 'c' ? '/usr/bin/gcc' : '/usr/bin/g++';
    const standard = language === 'c' ? 'gnu11' : 'gnu++17';
    const result = nativeCommand(compiler, ['-x', language === 'c' ? 'c' : 'c++', `-std=${standard}`, '-', '-o', name, '-lm'], code, 15000);
    return result.ok ? { command: name, args: [] } : { error: 'compilation impossible' };
  }
  return { error: 'runtime non préparé' };
}

function changeSection(solution, proposal) {
  let start = 0;
  let end = solution.length;
  if (proposal.caseNumber) {
    const expression = new RegExp(`^\\[Cas\\s+${proposal.caseNumber}\\b[^\\]]*\\]`, 'im');
    const match = expression.exec(solution);
    if (!match) throw new Error(`Cas ${proposal.caseNumber} introuvable`);
    start = match.index;
    const next = solution.slice(start + match[0].length).search(/^\[Cas\s+\d+\b/im);
    end = next < 0 ? solution.length : start + match[0].length + next;
  }
  let section = solution.slice(start, end);
  const replacements = [];
  for (const [index, [from, to]] of proposal.changes.entries()) {
    const occurrences = section.split(from).length - 1;
    if (occurrences !== 1) throw new Error(`Mutation non unique : ${occurrences} (${proposal.description})`);
    const placeholder = `\u0001AUDIT_${index}\u0002`;
    section = section.replace(from, placeholder);
    replacements.push([placeholder, to]);
  }
  for (const [placeholder, replacement] of replacements) section = section.replace(placeholder, replacement);
  return solution.slice(0, start) + section + solution.slice(end);
}

async function evaluate(exercise, submitted) {
  const prepared = ['analyse', 'sql'].includes(exercise.language) ? null : prepareNative(exercise.language, submitted);
  if (prepared && prepared.error) return { executed: false, accepted: false, reason: prepared.error };
  const result = await runTests(exercise, submitted, {
    execute: async payload => {
      if (prepared) return nativeCommand(prepared.command, prepared.args, payload.stdin || '');
      const outcome = exercise.language === 'analyse' ? await local.runAnalyse(payload.code, payload.stdin) : await local.runSql(payload.code, payload.stdin, 4000);
      return execution.normalizeResponse(outcome, 'local');
    }
  });
  return {
    executed: !result.error,
    accepted: result.ok && result.passed === result.total && !result.stop,
    passed: result.passed,
    total: result.total,
    reason: result.error ? result.error.code : (result.stop ? result.stop.reason : null)
  };
}

async function main() {
  const findings = [];
  const skipped = [];
  for (const [family, selection] of Object.entries(sample.families)) {
    const available = selection.exercises_20.map(item => catalogue.getExercise(item.id));
    const selected = available.filter(item => proposals[item.id]);
    skipped.push(...available.filter(item => !proposals[item.id]).map(item => ({ family, id: item.id, language: item.language })));
    for (const exercise of selected) {
      if (!exercise || !proposals[exercise.id]) throw new Error(`Exercice sélectionné non prévu : ${family}`);
      const baseline = await evaluate(exercise, exercise.solution);
      const variants = [];
      for (const proposal of proposals[exercise.id]) {
        const submitted = changeSection(exercise.solution, proposal);
        variants.push({ description: proposal.description, ...(await evaluate(exercise, submitted)) });
      }
      findings.push({ family, id: exercise.id, language: exercise.language, baseline, variants });
    }
  }
  process.stdout.write(JSON.stringify({ selection: 'exercices échantillonnés disposant de deux variantes conceptuelles ciblées', skipped, findings }, null, 2) + '\n');
}

main().catch(error => {
  process.stderr.write(error.message + '\n');
  process.exitCode = 1;
});
