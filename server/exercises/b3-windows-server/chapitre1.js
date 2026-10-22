'use strict';

module.exports = [
  {
    "id": "ws3-c1-e1",
    "chapter": 1,
    "title": "Validateur d’étendue DHCP, exclusions et conflits de réservation MAC",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la liste des adresses IP distribuables d’une étendue DHCP après déduction des exclusions et détecter les conflits de réservation.",
    "brief": "Dans l’administration d’un serveur DHCP Windows Server, une étendue (Scope) distribue dynamiquement des adresses IP IPv4 :\n- `SCOPE net=<PREFIX> start=<N_START> end=<N_END>` : définit la plage complète d’adresses `PREFIX.N` (ex: net=192.168.1. start=10 end=30).\n- `EXCLUDE start=<N1> end=<N2>` : plage d’hôtes exclus de la distribution dynamique (inclusifs).\n- `RESERVATION mac=<MAC> ip=<PREFIX.N>` : association statique MAC / IP.\n\nRègles de validation :\n- Une réservation est en conflit (`CONFLIT`) si l’IP est hors de la plage `[start, end]`, ou si deux réservations ont la même IP avec des MAC différentes, ou si la même MAC a plusieurs IP différentes. Sinon elle est `VALIDE`.\n- Une adresse IP est distribuable dynamiquement si son numéro d’hôte est dans `[start, end]`, n’est couvert par aucune plage d’exclusion `EXCLUDE`, et n’est assigné à aucune réservation valide.\n\nEntrée :\n`SCOPE net=<PREFIX> start=<N1> end=<N2>`\n`EXCLUDE start=<N1> end=<N2>` (0 ou plusieurs)\n`RESERVATION mac=<MAC> ip=<IP>` (0 ou plusieurs)\n\nRésultat d’analyse attendu :\n- Ligne de statut des réservations :\n  `RESERVATIONS valides=<V> conflits=<C>`\n- Ligne du pool d’adresses dynamiques :\n  `POOL_DYNAMIC total_disponibles=<D> first_ip=<IP_MIN> last_ip=<IP_MAX>` (si total > 0, sinon `POOL_DYNAMIC total_disponibles=0 first_ip=NONE last_ip=NONE`)\n- Bilan :\n  `SUMMARY statut=<OK|AVERTISSEMENT> pool_pct=<PCT>%` (où pool_pct = round((total_disponibles / total_scope) * 100, 1) ; statut=OK si conflits=0, sinon AVERTISSEMENT)",
    "starter": "# Grille d'analyse (ws3-c1-e1) — Validateur d’étendue DHCP, exclusions et conflits de réservation MAC\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Conflit de réservation sur même adresse IP]\n# Données : SCOPE net=10.0.0. start=100 end=110\n# Données : RESERVATION mac=AA:BB:CC:01 ip=10.0.0.105\n# Données : RESERVATION mac=AA:BB:CC:02 ip=10.0.0.105\nA_COMPLETER\n\n[Cas 2 — Réservation hors de la plage du scope]\n# Données : SCOPE net=172.16.0. start=50 end=60\n# Données : EXCLUDE start=55 end=60\n# Données : RESERVATION mac=11:22:33:44 ip=172.16.0.99\nA_COMPLETER\n\n[Cas 3 — Toutes les adresses exclues ou réservées]\n# Données : SCOPE net=192.168.10. start=1 end=3\n# Données : EXCLUDE start=1 end=2\n# Données : RESERVATION mac=AA:11 ip=192.168.10.3\nA_COMPLETER\n",
    "hints": [
      "Stocker les entiers d’hôtes exclus dans un ensemble (set).",
      "Vérifier les doublons de MAC et d’IP pour les réservations avec des dictionnaires.",
      "Calculer les adresses disponibles en soustrayant exclusions et réservations valides."
    ],
    "examples": [
      {
        "stdin": "SCOPE net=192.168.1. start=10 end=20\nEXCLUDE start=12 end=14\nRESERVATION mac=00:11:22:33:44:01 ip=192.168.1.15\nRESERVATION mac=00:11:22:33:44:02 ip=192.168.1.18",
        "expected": "RESERVATIONS valides=2 conflits=0\nPOOL_DYNAMIC total_disponibles=6 first_ip=192.168.1.10 last_ip=192.168.1.20\nSUMMARY statut=OK pool_pct=54.5%",
        "note": "Étendue de 11 adresses (10 à 20). 3 exclues (12, 13, 14), 2 réservées (15, 18). Reste : 10, 11, 16, 17, 19, 20 (6 adresses, 6/11 = 54.5%)."
      }
    ],
    "tests": [
      {
        "label": "Conflit de réservation sur même adresse IP",
        "stdin": "cas:1",
        "expected": "RESERVATIONS valides=0 conflits=2\nPOOL_DYNAMIC total_disponibles=11 first_ip=10.0.0.100 last_ip=10.0.0.110\nSUMMARY statut=AVERTISSEMENT pool_pct=100.0%"
      },
      {
        "label": "Réservation hors de la plage du scope",
        "stdin": "cas:2",
        "expected": "RESERVATIONS valides=0 conflits=1\nPOOL_DYNAMIC total_disponibles=5 first_ip=172.16.0.50 last_ip=172.16.0.54\nSUMMARY statut=AVERTISSEMENT pool_pct=45.5%"
      },
      {
        "label": "Toutes les adresses exclues ou réservées",
        "stdin": "cas:3",
        "expected": "RESERVATIONS valides=1 conflits=0\nPOOL_DYNAMIC total_disponibles=0 first_ip=NONE last_ip=NONE\nSUMMARY statut=OK pool_pct=0.0%"
      }
    ],
    "solution": "[Exemple]\nRESERVATIONS valides=2 conflits=0\nPOOL_DYNAMIC total_disponibles=6 first_ip=192.168.1.10 last_ip=192.168.1.20\nSUMMARY statut=OK pool_pct=54.5%\n\n[Cas 1 — Conflit de réservation sur même adresse IP]\nRESERVATIONS valides=0 conflits=2\nPOOL_DYNAMIC total_disponibles=11 first_ip=10.0.0.100 last_ip=10.0.0.110\nSUMMARY statut=AVERTISSEMENT pool_pct=100.0%\n\n[Cas 2 — Réservation hors de la plage du scope]\nRESERVATIONS valides=0 conflits=1\nPOOL_DYNAMIC total_disponibles=5 first_ip=172.16.0.50 last_ip=172.16.0.54\nSUMMARY statut=AVERTISSEMENT pool_pct=45.5%\n\n[Cas 3 — Toutes les adresses exclues ou réservées]\nRESERVATIONS valides=1 conflits=0\nPOOL_DYNAMIC total_disponibles=0 first_ip=NONE last_ip=NONE\nSUMMARY statut=OK pool_pct=0.0%"
  },
  {
    "id": "ws3-c1-e2",
    "chapter": 1,
    "title": "Validateur de cohérence de zone DNS d’infrastructure (A, PTR, SRV)",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la réciprocité des enregistrements A et PTR et la présence des enregistrements de service SRV indispensables à Active Directory.",
    "brief": "Dans une infrastructure Windows Server avec Active Directory, le DNS assure la résolution de noms et la découverte des contrôleurs de domaine (DC) :\n- `RECORD_A fqdn=<NOM> ip=<IP>` : résolution directe.\n- `RECORD_PTR ip=<IP> fqdn=<NOM>` : résolution inverse (Reverse Lookup).\n- `RECORD_SRV service=<SVC> proto=<PROTO> port=<PORT> target=<DC_FQDN>` : localisation de services AD (ex: _ldap, _kerberos).\n\nRègles d’audit de zone :\n1. Réciprocité A / PTR : chaque `RECORD_A` doit avoir son `RECORD_PTR` exact (même IP et même FQDN). Si le PTR manque ou pointe vers un autre nom, émettre `ANOMALIE_PTR fqdn=<NOM> ip=<IP>`.\n2. Résolution de cible SRV : la cible `target` d’un `RECORD_SRV` doit impérativement posséder un enregistrement direct `RECORD_A`. Si absent, émettre `ANOMALIE_SRV target=<DC_FQDN> service=<SVC>`.\n\nRésultat d’analyse attendu :\n- Anomalies triées par FQDN / target alphabétique croissant :\n  `ANOMALIE_PTR fqdn=<NOM> ip=<IP>` ou `ANOMALIE_SRV target=<DC_FQDN> service=<SVC>`\n- Bilan :\n  `SUMMARY total_records=<N> anomalies=<C> statut=<CONFORME|NON_CONFORME>`",
    "starter": "# Grille d'analyse (ws3-c1-e2) — Validateur de cohérence de zone DNS d’infrastructure (A, PTR, SRV)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Enregistrement PTR manquant et cible SRV inconnue]\n# Données : RECORD_A fqdn=srv01.corp.lan ip=10.0.0.5\n# Données : RECORD_SRV service=_kerberos proto=_tcp port=88 target=dc02.corp.lan\nA_COMPLETER\n\n[Cas 2 — Désynchronisation entre A et PTR sur l’IP]\n# Données : RECORD_A fqdn=mail.corp.lan ip=192.168.1.25\n# Données : RECORD_PTR ip=192.168.1.25 fqdn=ancien-mail.corp.lan\n# Données : RECORD_A fqdn=dc.corp.lan ip=192.168.1.1\n# Données : RECORD_PTR ip=192.168.1.1 fqdn=dc.corp.lan\nA_COMPLETER\n\n[Cas 3 — Multiples SRV sur le même DC valide]\n# Données : RECORD_A fqdn=dc.dom.local ip=172.16.1.1\n# Données : RECORD_PTR ip=172.16.1.1 fqdn=dc.dom.local\n# Données : RECORD_SRV service=_ldap proto=_tcp port=389 target=dc.dom.local\n# Données : RECORD_SRV service=_kerberos proto=_tcp port=88 target=dc.dom.local\n# Données : RECORD_SRV service=_kpasswd proto=_tcp port=464 target=dc.dom.local\nA_COMPLETER\n",
    "hints": [
      "Indexer les enregistrements A sous forme {fqdn: ip} et l’inverse {ip: fqdn}.",
      "Comparer les enregistrements PTR à l’index des A.",
      "Vérifier que chaque target de SRV existe dans les clés de l’index A."
    ],
    "examples": [
      {
        "stdin": "RECORD_A fqdn=dc01.corp.lan ip=192.168.1.10\nRECORD_PTR ip=192.168.1.10 fqdn=dc01.corp.lan\nRECORD_SRV service=_ldap proto=_tcp port=389 target=dc01.corp.lan",
        "expected": "SUMMARY total_records=3 anomalies=0 statut=CONFORME",
        "note": "Enregistrement direct et inverse synchronisés, cible SRV résolue."
      }
    ],
    "tests": [
      {
        "label": "Enregistrement PTR manquant et cible SRV inconnue",
        "stdin": "cas:1",
        "expected": "ANOMALIE_PTR fqdn=srv01.corp.lan ip=10.0.0.5\nANOMALIE_SRV target=dc02.corp.lan service=_kerberos\nSUMMARY total_records=2 anomalies=2 statut=NON_CONFORME"
      },
      {
        "label": "Désynchronisation entre A et PTR sur l’IP",
        "stdin": "cas:2",
        "expected": "ANOMALIE_PTR fqdn=mail.corp.lan ip=192.168.1.25\nSUMMARY total_records=4 anomalies=1 statut=NON_CONFORME"
      },
      {
        "label": "Multiples SRV sur le même DC valide",
        "stdin": "cas:3",
        "expected": "SUMMARY total_records=5 anomalies=0 statut=CONFORME"
      }
    ],
    "solution": "[Exemple]\nSUMMARY total_records=3 anomalies=0 statut=CONFORME\n\n[Cas 1 — Enregistrement PTR manquant et cible SRV inconnue]\nANOMALIE_PTR fqdn=srv01.corp.lan ip=10.0.0.5\nANOMALIE_SRV target=dc02.corp.lan service=_kerberos\nSUMMARY total_records=2 anomalies=2 statut=NON_CONFORME\n\n[Cas 2 — Désynchronisation entre A et PTR sur l’IP]\nANOMALIE_PTR fqdn=mail.corp.lan ip=192.168.1.25\nSUMMARY total_records=4 anomalies=1 statut=NON_CONFORME\n\n[Cas 3 — Multiples SRV sur le même DC valide]\nSUMMARY total_records=5 anomalies=0 statut=CONFORME"
  },
  {
    "id": "ws3-c1-e3",
    "chapter": 1,
    "title": "Simulateur de dimensionnement de licences Windows Server (Cœurs physiques vs VMs)",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer le nombre de packs de licences cœurs requis et déterminer l’édition financièrement optimale (Standard vs Datacenter).",
    "brief": "Les règles officielles de licences par cœur Microsoft Windows Server imposent :\n- Règle 1 : minimum 8 cœurs physiques par socket CPU (si < 8, compter 8).\n- Règle 2 : minimum 16 cœurs physiques par serveur physique au total.\n- Licences vendues par packs de 2 cœurs : `packs_base = ceil(total_coeurs / 2)`.\n\nRègles de virtualisation Windows Server :\n- `Édition Standard` (120 € / pack 2 cœurs) : chaque licence complète de l’hôte accorde 2 VMs. Pour $V$ machines virtuelles, multiplier les packs de base par `max(1, ceil(V / 2))`.\n- `Édition Datacenter` (750 € / pack 2 cœurs) : une seule licence complète de l’hôte accorde un nombre illimité de VMs (`packs_base` invariants).\n\nEntrée :\n`SERVER nom=<NOM> sockets=<S> cores_per_socket=<C> vms=<V>`\n\nRésultat d’analyse attendu :\n- Profil hôte :\n  `SERVER_PROFILE nom=<NOM> base_cores=<COEURS> packs_base=<PACKS>`\n- Coûts par édition :\n  `EDITION_STANDARD packs=<PACKS_STD> cout=<COUT_STD>EUR`\n  `EDITION_DATACENTER packs=<PACKS_DC> cout=<COUT_DC>EUR`\n- Recommandation finale (Standard si cout_std <= cout_dc, sinon Datacenter) :\n  `RECOMMENDATION nom=<NOM> edition_recommandee=<STANDARD|DATACENTER> economie=<DIFF>EUR`",
    "starter": "# Grille d'analyse (ws3-c1-e3) — Simulateur de dimensionnement de licences Windows Server (Cœurs physiques vs VMs)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Forte densité de virtualisation justifiant l’édition Datacenter]\n# Données : SERVER nom=CLUSTER-NODE-A sockets=2 cores_per_socket=16 vms=18\nA_COMPLETER\n\n[Cas 2 — Mono-socket avec minimums 8 et 16 cœurs appliqués]\n# Données : SERVER nom=EDGE-SERVER sockets=1 cores_per_socket=4 vms=2\nA_COMPLETER\n\n[Cas 3 — Aucune machine virtuelle (serveur physique bare-metal)]\n# Données : SERVER nom=BARE-METAL sockets=2 cores_per_socket=10 vms=0\nA_COMPLETER\n",
    "hints": [
      "Appliquer max(8, cores) par socket, puis max(16, total).",
      "Calculer les packs Standard en multipliant packs_base par math.ceil(vms / 2) si vms > 0.",
      "Comparer les coûts totaux (120€ vs 750€ par pack)."
    ],
    "examples": [
      {
        "stdin": "SERVER nom=HOTE-PROD-01 sockets=2 cores_per_socket=8 vms=4",
        "expected": "SERVER_PROFILE nom=HOTE-PROD-01 base_cores=16 packs_base=8\nEDITION_STANDARD packs=16 cout=1920EUR\nEDITION_DATACENTER packs=8 cout=6000EUR\nRECOMMENDATION nom=HOTE-PROD-01 edition_recommandee=STANDARD economie=4080EUR",
        "note": "16 cœurs = 8 packs. 4 VMs = 2 passages de licence Standard (16 packs = 1920€). Datacenter = 8 packs (6000€). Standard est plus économique de 4080€."
      }
    ],
    "tests": [
      {
        "label": "Forte densité de virtualisation justifiant l’édition Datacenter",
        "stdin": "cas:1",
        "expected": "SERVER_PROFILE nom=CLUSTER-NODE-A base_cores=32 packs_base=16\nEDITION_STANDARD packs=144 cout=17280EUR\nEDITION_DATACENTER packs=16 cout=12000EUR\nRECOMMENDATION nom=CLUSTER-NODE-A edition_recommandee=DATACENTER economie=5280EUR"
      },
      {
        "label": "Mono-socket avec minimums 8 et 16 cœurs appliqués",
        "stdin": "cas:2",
        "expected": "SERVER_PROFILE nom=EDGE-SERVER base_cores=16 packs_base=8\nEDITION_STANDARD packs=8 cout=960EUR\nEDITION_DATACENTER packs=8 cout=6000EUR\nRECOMMENDATION nom=EDGE-SERVER edition_recommandee=STANDARD economie=5040EUR"
      },
      {
        "label": "Aucune machine virtuelle (serveur physique bare-metal)",
        "stdin": "cas:3",
        "expected": "SERVER_PROFILE nom=BARE-METAL base_cores=20 packs_base=10\nEDITION_STANDARD packs=10 cout=1200EUR\nEDITION_DATACENTER packs=10 cout=7500EUR\nRECOMMENDATION nom=BARE-METAL edition_recommandee=STANDARD economie=6300EUR"
      }
    ],
    "solution": "[Exemple]\nSERVER_PROFILE nom=HOTE-PROD-01 base_cores=16 packs_base=8\nEDITION_STANDARD packs=16 cout=1920EUR\nEDITION_DATACENTER packs=8 cout=6000EUR\nRECOMMENDATION nom=HOTE-PROD-01 edition_recommandee=STANDARD economie=4080EUR\n\n[Cas 1 — Forte densité de virtualisation justifiant l’édition Datacenter]\nSERVER_PROFILE nom=CLUSTER-NODE-A base_cores=32 packs_base=16\nEDITION_STANDARD packs=144 cout=17280EUR\nEDITION_DATACENTER packs=16 cout=12000EUR\nRECOMMENDATION nom=CLUSTER-NODE-A edition_recommandee=DATACENTER economie=5280EUR\n\n[Cas 2 — Mono-socket avec minimums 8 et 16 cœurs appliqués]\nSERVER_PROFILE nom=EDGE-SERVER base_cores=16 packs_base=8\nEDITION_STANDARD packs=8 cout=960EUR\nEDITION_DATACENTER packs=8 cout=6000EUR\nRECOMMENDATION nom=EDGE-SERVER edition_recommandee=STANDARD economie=5040EUR\n\n[Cas 3 — Aucune machine virtuelle (serveur physique bare-metal)]\nSERVER_PROFILE nom=BARE-METAL base_cores=20 packs_base=10\nEDITION_STANDARD packs=10 cout=1200EUR\nEDITION_DATACENTER packs=10 cout=7500EUR\nRECOMMENDATION nom=BARE-METAL edition_recommandee=STANDARD economie=6300EUR"
  }
];
