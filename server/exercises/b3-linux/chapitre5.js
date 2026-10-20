'use strict';

module.exports = [
  {
    "id": "lx3-c5-e1",
    "chapter": 5,
    "title": "Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la cohérence de configuration des interfaces réseau virtuelles (veth) et des ponts sous Linux.",
    "brief": "<p>Sous Linux, la communication inter-conteneurs repose sur des paires d'interfaces virtuelles (<strong>veth pairs</strong>, sorte de câble réseau virtuel) connectées à un pont logiciel (<strong>Linux Bridge</strong>).<br><br>\nRègles de validation :<br>\n1. Un pont (<code>type=bridge</code>) ne peut pas être lui-même esclave d'un autre équipement (<code>master</code> doit valoir <code>NONE</code>). Sinon, erreur <code>BRIDGE_CANNOT_HAVE_MASTER</code>.<br>\n2. Une interface doit avoir son état activé (<code>state=UP</code>). Si <code>state=DOWN</code>, erreur <code>INTERFACE_DOWN</code>.<br>\n3. Une interface <code>veth</code> doit soit être rattachée à un pont maître (<code>master != NONE</code>), soit posséder une adresse IP (<code>ip != NONE</code>). Si les deux sont à <code>NONE</code>, erreur <code>VETH_UNATTACHED</code>.<br><br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nPour chaque interface, afficher :<br>\n<code>NET_AUDIT iface={name} valid={OUI|NON} error={OK|motif}</code></p>",
    "starter": "# Grille d'analyse (lx3-c5-e1) — Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rejet d’une interface éteinte (DOWN)]\n# Données : NET_IFACE name=veth_app type=veth master=br0 ip=NONE state=DOWN\nA_COMPLETER\n\n[Cas 2 — Rejet d’un pont avec master et veth orpheline]\n# Données : NET_IFACE name=br1 type=bridge master=br0 ip=NONE state=UP\n# Données : NET_IFACE name=veth_orphan type=veth master=NONE ip=NONE state=UP\nA_COMPLETER\n\n[Cas 3 — Veth autonome avec IP directe (mode point-à-point)]\n# Données : NET_IFACE name=veth0 type=veth master=NONE ip=192.168.100.2/30 state=UP\nA_COMPLETER\n",
    "hints": [
      "Tester les règles dans l’ordre : état UP, bridge sans master, veth avec master ou IP.",
      "Dès qu’une règle échoue, valid=NON avec l’erreur correspondante."
    ],
    "examples": [
      {
        "stdin": "NET_IFACE name=br0 type=bridge master=NONE ip=10.0.0.1/24 state=UP",
        "expected": "NET_AUDIT iface=br0 valid=OUI error=OK",
        "note": "Pont logiciel actif avec IP et sans maître : configuration conforme."
      }
    ],
    "tests": [
      {
        "label": "Rejet d’une interface éteinte (DOWN)",
        "stdin": "cas:1",
        "expected": "NET_AUDIT iface=veth_app valid=NON error=INTERFACE_DOWN"
      },
      {
        "label": "Rejet d’un pont avec master et veth orpheline",
        "stdin": "cas:2",
        "expected": "NET_AUDIT iface=br1 valid=NON error=BRIDGE_CANNOT_HAVE_MASTER\nNET_AUDIT iface=veth_orphan valid=NON error=VETH_UNATTACHED"
      },
      {
        "label": "Veth autonome avec IP directe (mode point-à-point)",
        "stdin": "cas:3",
        "expected": "NET_AUDIT iface=veth0 valid=OUI error=OK"
      }
    ],
    "solution": "[Exemple]\nNET_AUDIT iface=br0 valid=OUI error=OK\n\n[Cas 1 — Rejet d’une interface éteinte (DOWN)]\nNET_AUDIT iface=veth_app valid=NON error=INTERFACE_DOWN\n\n[Cas 2 — Rejet d’un pont avec master et veth orpheline]\nNET_AUDIT iface=br1 valid=NON error=BRIDGE_CANNOT_HAVE_MASTER\nNET_AUDIT iface=veth_orphan valid=NON error=VETH_UNATTACHED\n\n[Cas 3 — Veth autonome avec IP directe (mode point-à-point)]\nNET_AUDIT iface=veth0 valid=OUI error=OK"
  },
  {
    "id": "lx3-c5-e2",
    "chapter": 5,
    "title": "Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)",
    "level": "n2",
    "language": "analyse",
    "goal": "Aiguiller les paquets réseau vers la bonne table de routage selon les règles de politique PBR (Policy Routing).",
    "brief": "<p>Sous Linux, la commande <code>ip rule</code> permet de router le trafic non seulement d'après l'adresse de destination (routage classique), mais également en fonction de l'adresse source ou du port applicatif vers des tables de routage indépendantes (Policy-Based Routing).<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nPuis il lit des paquets à router :<br>\n<code>PACKET id=&lt;id&gt; src=&lt;ip&gt; dport=&lt;port&gt;</code>.<br><br>\nPrincipe First-Match-Wins : le paquet est évalué séquentiellement contre chaque règle dans l'ordre de priorité croissante. Dès qu'une règle correspond (adresse source identique ou ANY, et port identique ou ANY), le routage s'arrête et la table associée est retournée.<br><br>\nPour chaque paquet, afficher :<br>\n<code>ROUTE_MATCH packet={id} matched_prio={prio} table={nom_table}</code></p>",
    "starter": "# Grille d'analyse (lx3-c5-e2) — Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Aiguillage selon le port de destination (trafic web vs standard)]\n# Données : RULE prio=200 src=ANY dport=80 table=proxy_table\n# Données : RULE prio=300 src=ANY dport=443 table=proxy_table\n# Données : RULE prio=32766 src=ANY dport=ANY table=main\n# Données : PACKET id=10 src=10.0.0.5 dport=80\n# Données : PACKET id=11 src=10.0.0.5 dport=22\nA_COMPLETER\n\n[Cas 2 — Aiguillage par IP source prioritaire sur la table par défaut]\n# Données : RULE prio=50 src=172.16.0.10 dport=ANY table=admin_gateway\n# Données : RULE prio=32766 src=ANY dport=ANY table=main\n# Données : PACKET id=20 src=172.16.0.10 dport=8080\n# Données : PACKET id=21 src=172.16.0.99 dport=8080\nA_COMPLETER\n\n[Cas 3 — Règle par défaut (catch-all) de priorité maximale]\n# Données : RULE prio=32766 src=ANY dport=ANY table=default_wan\n# Données : PACKET id=99 src=1.2.3.4 dport=53\nA_COMPLETER\n",
    "hints": [
      "Stocker les règles ordonnées par leur priorité numérique (prio).",
      "Tester chaque paquet contre les règles et stopper dès la première correspondance."
    ],
    "examples": [
      {
        "stdin": "RULE prio=100 src=192.168.1.50 dport=ANY table=vpn_tunnel\nRULE prio=32766 src=ANY dport=ANY table=main\nPACKET id=1 src=192.168.1.50 dport=443",
        "expected": "ROUTE_MATCH packet=1 matched_prio=100 table=vpn_tunnel",
        "note": "Le paquet provient de l’IP 192.168.1.50 et correspond à la règle 100 routant vers vpn_tunnel."
      }
    ],
    "tests": [
      {
        "label": "Aiguillage selon le port de destination (trafic web vs standard)",
        "stdin": "cas:1",
        "expected": "ROUTE_MATCH packet=10 matched_prio=200 table=proxy_table\nROUTE_MATCH packet=11 matched_prio=32766 table=main"
      },
      {
        "label": "Aiguillage par IP source prioritaire sur la table par défaut",
        "stdin": "cas:2",
        "expected": "ROUTE_MATCH packet=20 matched_prio=50 table=admin_gateway\nROUTE_MATCH packet=21 matched_prio=32766 table=main"
      },
      {
        "label": "Règle par défaut (catch-all) de priorité maximale",
        "stdin": "cas:3",
        "expected": "ROUTE_MATCH packet=99 matched_prio=32766 table=default_wan"
      }
    ],
    "solution": "[Exemple]\nROUTE_MATCH packet=1 matched_prio=100 table=vpn_tunnel\n\n[Cas 1 — Aiguillage selon le port de destination (trafic web vs standard)]\nROUTE_MATCH packet=10 matched_prio=200 table=proxy_table\nROUTE_MATCH packet=11 matched_prio=32766 table=main\n\n[Cas 2 — Aiguillage par IP source prioritaire sur la table par défaut]\nROUTE_MATCH packet=20 matched_prio=50 table=admin_gateway\nROUTE_MATCH packet=21 matched_prio=32766 table=main\n\n[Cas 3 — Règle par défaut (catch-all) de priorité maximale]\nROUTE_MATCH packet=99 matched_prio=32766 table=default_wan"
  },
  {
    "id": "lx3-c5-e3",
    "chapter": 5,
    "title": "Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler la séquence de résolution de noms d’hôtes selon la politique déclarative de nsswitch.conf.",
    "brief": "<p>Le fichier <code>/etc/nsswitch.conf</code> (Name Service Switch) régit l'ordre dans lequel la bibliothèque C (glibc) consulte les bases de données système (fichiers locaux <code>files</code> comme <code>/etc/hosts</code>, résolveur DNS <code>dns</code>, mDNS <code>mdns4</code>).<br><br>\nAnalysez les données fournies pour chaque cas.<br><br>\nPuis il lit des requêtes de résolution :<br>\n<code>QUERY_HOST name=&lt;fqdn&gt; in_files=&lt;OUI|NON&gt; in_dns=&lt;OUI|NON&gt; in_mdns=&lt;OUI|NON&gt;</code>.<br><br>\nRègles :<br>\n- Les sources déclarées dans <code>order</code> sont interrogées successivement de gauche à droite.<br>\n- Dès qu'une source répond <code>OUI</code>, la résolution s'arrête immédiatement : <code>resolved_by={source} status=SUCCESS</code>.<br>\n- Si aucune source ne répond <code>OUI</code> : <code>resolved_by=NONE status=NOT_FOUND</code>.<br><br>\nPour chaque requête, afficher :<br>\n<code>RESOLV_RESULT host={name} resolved_by={source} status={SUCCESS|NOT_FOUND}</code></p>",
    "starter": "# Grille d'analyse (lx3-c5-e3) — Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Résolution par DNS distant lorsque le fichier local échoue]\n# Données : CONF_NSSWITCH order=files,dns\n# Données : QUERY_HOST name=api.github.com in_files=NON in_dns=OUI in_mdns=NON\nA_COMPLETER\n\n[Cas 2 — Hôte introuvable dans toutes les sources déclarées]\n# Données : CONF_NSSWITCH order=files,dns,mdns\n# Données : QUERY_HOST name=unknown.corp in_files=NON in_dns=NON in_mdns=NON\nA_COMPLETER\n\n[Cas 3 — Priorité inversée (dns avant files)]\n# Données : CONF_NSSWITCH order=dns,files\n# Données : QUERY_HOST name=internal.test in_files=OUI in_dns=OUI in_mdns=NON\nA_COMPLETER\n",
    "hints": [
      "Découper la chaîne order avec split(\",\") pour obtenir la liste ordonnée des sources.",
      "Parcourir les sources dans l’ordre et vérifier si la présence est OUI."
    ],
    "examples": [
      {
        "stdin": "CONF_NSSWITCH order=files,dns\nQUERY_HOST name=localhost in_files=OUI in_dns=NON in_mdns=NON",
        "expected": "RESOLV_RESULT host=localhost resolved_by=files status=SUCCESS",
        "note": "Présent dans /etc/hosts (files) : résolu en priorité par files."
      }
    ],
    "tests": [
      {
        "label": "Résolution par DNS distant lorsque le fichier local échoue",
        "stdin": "cas:1",
        "expected": "RESOLV_RESULT host=api.github.com resolved_by=dns status=SUCCESS"
      },
      {
        "label": "Hôte introuvable dans toutes les sources déclarées",
        "stdin": "cas:2",
        "expected": "RESOLV_RESULT host=unknown.corp resolved_by=NONE status=NOT_FOUND"
      },
      {
        "label": "Priorité inversée (dns avant files)",
        "stdin": "cas:3",
        "expected": "RESOLV_RESULT host=internal.test resolved_by=dns status=SUCCESS"
      }
    ],
    "solution": "[Exemple]\nRESOLV_RESULT host=localhost resolved_by=files status=SUCCESS\n\n[Cas 1 — Résolution par DNS distant lorsque le fichier local échoue]\nRESOLV_RESULT host=api.github.com resolved_by=dns status=SUCCESS\n\n[Cas 2 — Hôte introuvable dans toutes les sources déclarées]\nRESOLV_RESULT host=unknown.corp resolved_by=NONE status=NOT_FOUND\n\n[Cas 3 — Priorité inversée (dns avant files)]\nRESOLV_RESULT host=internal.test resolved_by=dns status=SUCCESS"
  }
];
