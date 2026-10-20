'use strict';

module.exports = [
  {
    "id": "fw3-c2-e1",
    "chapter": 2,
    "title": "Machine à états TCP conntrack (NEW, ESTABLISHED, INVALID)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le moteur conntrack de suivi de sessions TCP selon la RFC 793 et classifier les paquets reçus.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nRègles de transition d'état conntrack par session identifiée par son quadruplet bidirectionnel <code>{min(ip1:p1, ip2:p2) &lt;-&gt; max(ip1:p1, ip2:p2)}</code> :<br>\n1. Un premier paquet avec <code>flags=SYN</code> initie une session : état = <code>NEW</code> (phase de négociation).<br>\n2. La réponse avec <code>flags=SYN_ACK</code> dans le sens inverse : état = <code>NEW</code> (attente du handshake 3-voies).<br>\n3. Le paquet de confirmation avec <code>flags=ACK</code> clôture le handshake : la session devient <code>ESTABLISHED</code>.<br>\n4. Tout paquet ultérieur (<code>DATA</code>, <code>ACK</code>) sur une session connue en <code>ESTABLISHED</code> : état = <code>ESTABLISHED</code>.<br>\n5. Un paquet <code>FIN</code> ou <code>RST</code> sur une session <code>ESTABLISHED</code> est classifié <code>ESTABLISHED</code> et ferme la session (supprimée de la table après traitement).<br>\n6. Tout paquet (<code>ACK</code>, <code>DATA</code>, <code>FIN</code>, <code>RST</code>, <code>SYN_ACK</code>) reçu hors d'une session active ou sans handshake préalable est classifié <code>INVALID</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>CONNTRACK id={id} state={NEW|ESTABLISHED|INVALID}</code></p>",
    "starter": "# Grille d'analyse (fw3-c2-e1) — Machine à états TCP conntrack (NEW, ESTABLISHED, INVALID)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Paquet DATA légitime après handshake puis fermeture FIN]\n# Données : PACKET id=1 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=SYN\n# Données : PACKET id=2 src=203.0.113.1 dst=10.0.0.5 sport=443 dport=4000 flags=SYN_ACK\n# Données : PACKET id=3 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=ACK\n# Données : PACKET id=4 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=DATA\n# Données : PACKET id=5 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=FIN\n# Données : PACKET id=6 src=10.0.0.5 dst=203.0.113.1 sport=4000 dport=443 flags=DATA\nA_COMPLETER\n\n[Cas 2 — Attaque par paquets orphelins ACK et RST sans handshake]\n# Données : PACKET id=10 src=198.51.100.22 dst=10.0.0.1 sport=60000 dport=22 flags=ACK\n# Données : PACKET id=11 src=198.51.100.22 dst=10.0.0.1 sport=60000 dport=22 flags=RST\nA_COMPLETER\n\n[Cas 3 — Multiples sessions concurrentes avec rejet hors session]\n# Données : PACKET id=A1 src=10.1.1.1 dst=8.8.8.8 sport=1000 dport=53 flags=SYN\n# Données : PACKET id=B1 src=10.2.2.2 dst=1.1.1.1 sport=2000 dport=80 flags=SYN\n# Données : PACKET id=A2 src=8.8.8.8 dst=10.1.1.1 sport=53 dport=1000 flags=SYN_ACK\n# Données : PACKET id=A3 src=10.1.1.1 dst=8.8.8.8 sport=1000 dport=53 flags=ACK\n# Données : PACKET id=C1 src=172.16.0.4 dst=10.1.1.1 sport=3000 dport=22 flags=DATA\nA_COMPLETER\n",
    "hints": [
      "Normaliser la clé de session pour identifier la connexion dans les deux sens.",
      "Suivre les étapes du handshake : SYN -> SYN_ACK -> ACK avant de passer en ESTABLISHED."
    ],
    "examples": [
      {
        "stdin": "PACKET id=1 src=10.0.0.2 dst=192.168.1.10 sport=54321 dport=80 flags=SYN\nPACKET id=2 src=192.168.1.10 dst=10.0.0.2 sport=80 dport=54321 flags=SYN_ACK\nPACKET id=3 src=10.0.0.2 dst=192.168.1.10 sport=54321 dport=80 flags=ACK",
        "expected": "CONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED",
        "note": "Handshake complet à 3 voies TCP."
      }
    ],
    "tests": [
      {
        "label": "Paquet DATA légitime après handshake puis fermeture FIN",
        "stdin": "cas:1",
        "expected": "CONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED\nCONNTRACK id=4 state=ESTABLISHED\nCONNTRACK id=5 state=ESTABLISHED\nCONNTRACK id=6 state=INVALID"
      },
      {
        "label": "Attaque par paquets orphelins ACK et RST sans handshake",
        "stdin": "cas:2",
        "expected": "CONNTRACK id=10 state=INVALID\nCONNTRACK id=11 state=INVALID"
      },
      {
        "label": "Multiples sessions concurrentes avec rejet hors session",
        "stdin": "cas:3",
        "expected": "CONNTRACK id=A1 state=NEW\nCONNTRACK id=B1 state=NEW\nCONNTRACK id=A2 state=NEW\nCONNTRACK id=A3 state=ESTABLISHED\nCONNTRACK id=C1 state=INVALID"
      }
    ],
    "solution": "[Exemple]\nCONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED\n\n[Cas 1 — Paquet DATA légitime après handshake puis fermeture FIN]\nCONNTRACK id=1 state=NEW\nCONNTRACK id=2 state=NEW\nCONNTRACK id=3 state=ESTABLISHED\nCONNTRACK id=4 state=ESTABLISHED\nCONNTRACK id=5 state=ESTABLISHED\nCONNTRACK id=6 state=INVALID\n\n[Cas 2 — Attaque par paquets orphelins ACK et RST sans handshake]\nCONNTRACK id=10 state=INVALID\nCONNTRACK id=11 state=INVALID\n\n[Cas 3 — Multiples sessions concurrentes avec rejet hors session]\nCONNTRACK id=A1 state=NEW\nCONNTRACK id=B1 state=NEW\nCONNTRACK id=A2 state=NEW\nCONNTRACK id=A3 state=ESTABLISHED\nCONNTRACK id=C1 state=INVALID"
  },
  {
    "id": "fw3-c2-e2",
    "chapter": 2,
    "title": "Purge et gestion des délais d’expiration (Timeouts) conntrack",
    "level": "n2",
    "language": "analyse",
    "goal": "Gérer la durée de vie des entrées conntrack selon le protocole et leur dernier timestamp d’activité.",
    "brief": "<p>Un pare-feu stateful alloue de la mémoire pour chaque session. Pour prévenir l'épuisement de la RAM, les entrées inactives doivent expirer selon des délais stricts (RFC et bonnes pratiques Linux netfilter) :<br>\n- <code>TCP:ESTABLISHED</code> : timeout = <code>3600</code> secondes.<br>\n- <code>TCP:SYN_SENT</code> : timeout = <code>60</code> secondes.<br>\n- <code>UDP:GENERIC</code> : timeout = <code>30</code> secondes.<br>\n- <code>ICMP:ECHO</code> : timeout = <code>10</code> secondes.<br><br>\nAnalysez les paramètres du problème pour chaque cas. Des entrées de session : <code>SESSION id=&lt;id&gt; proto=&lt;TCP|UDP|ICMP&gt; state=&lt;state&gt; last_seen=&lt;secondes&gt;</code>.<br>\n2. Une commande finale : <code>PURGE now=&lt;secondes&gt;</code>.<br><br>\nUne session expire si <code>(now - last_seen) &gt; timeout</code>.<br>\nIndiquez pour chaque cas la liste des sessions purgées dans l'ordre de leur déclaration, puis le nombre restant :<br>\n<code>PURGED: {id1}, {id2}, ...</code> (ou <code>PURGED: NONE</code> si aucune)<br>\n<code>REMAINING: {nb_restantes} sessions actives</code></p>",
    "starter": "# Grille d'analyse (fw3-c2-e2) — Purge et gestion des délais d’expiration (Timeouts) conntrack\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sessions mixtes avec conservation ICMP active et TCP expirés]\n# Données : SESSION id=S10 proto=TCP state=ESTABLISHED last_seen=3000\n# Données : SESSION id=S11 proto=ICMP state=ECHO last_seen=7195\n# Données : SESSION id=S12 proto=TCP state=SYN_SENT last_seen=7100\n# Données : PURGE now=7200\nA_COMPLETER\n\n[Cas 2 — Aucune session expirée]\n# Données : SESSION id=A1 proto=TCP state=ESTABLISHED last_seen=1000\n# Données : SESSION id=A2 proto=UDP state=GENERIC last_seen=1020\n# Données : PURGE now=1030\nA_COMPLETER\n\n[Cas 3 — Toutes les sessions conservées et expirées en chaîne]\n# Données : SESSION id=U1 proto=UDP state=GENERIC last_seen=100\n# Données : SESSION id=T1 proto=TCP state=SYN_SENT last_seen=100\n# Données : SESSION id=I1 proto=ICMP state=ECHO last_seen=100\n# Données : PURGE now=200\nA_COMPLETER\n",
    "hints": [
      "Associer chaque couple (proto, state) à sa durée limite.",
      "Calculer l’inactivité : now - last_seen."
    ],
    "examples": [
      {
        "stdin": "SESSION id=S1 proto=TCP state=ESTABLISHED last_seen=1000\nSESSION id=S2 proto=UDP state=GENERIC last_seen=4800\nPURGE now=5000",
        "expected": "PURGED: S1, S2\nREMAINING: 0 sessions actives",
        "note": "S1 inactive depuis 4000s (> 3600s) et S2 inactive depuis 200s (> 30s) : toutes purgées."
      }
    ],
    "tests": [
      {
        "label": "Sessions mixtes avec conservation ICMP active et TCP expirés",
        "stdin": "cas:1",
        "expected": "PURGED: S10, S12\nREMAINING: 1 sessions actives"
      },
      {
        "label": "Aucune session expirée",
        "stdin": "cas:2",
        "expected": "PURGED: NONE\nREMAINING: 2 sessions actives"
      },
      {
        "label": "Toutes les sessions conservées et expirées en chaîne",
        "stdin": "cas:3",
        "expected": "PURGED: U1, T1, I1\nREMAINING: 0 sessions actives"
      }
    ],
    "solution": "[Exemple]\nPURGED: S1, S2\nREMAINING: 0 sessions actives\n\n[Cas 1 — Sessions mixtes avec conservation ICMP active et TCP expirés]\nPURGED: S10, S12\nREMAINING: 1 sessions actives\n\n[Cas 2 — Aucune session expirée]\nPURGED: NONE\nREMAINING: 2 sessions actives\n\n[Cas 3 — Toutes les sessions conservées et expirées en chaîne]\nPURGED: U1, T1, I1\nREMAINING: 0 sessions actives"
  },
  {
    "id": "fw3-c2-e3",
    "chapter": 2,
    "title": "Détecteur de balayages furtifs (Scans Xmas, Null, FIN & Syn-Fin)",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecter les combinaisons illégales de flags TCP caractéristiques des outils de reconnaissance furtive.",
    "brief": "<p>Les attaquants exploitent les spécifications de la RFC 793 pour contourner les pare-feux stateless et cartographier les ports ouverts via des combinaisons atypiques de flags TCP.<br>\nAnalysez les paramètres du problème pour chaque cas.<br><br>\nRègles d'analyse et de classification :<br>\n1. <code>SYN,FIN</code> : Paquet contradictoire demandant l'ouverture et la fermeture simultanées -> <code>SYN_FIN_ANOMALY</code> (Danger élevé).<br>\n2. <code>FIN,PSH,URG</code> (dans n'importe quel ordre) : Arbre de Noël allumé -> <code>XMAS_TREE_SCAN</code> (Sonde Nmap -sX).<br>\n3. <code>NONE</code> (aucun flag activé) : Paquet fantôme -> <code>NULL_SCAN</code> (Sonde Nmap -sN).<br>\n4. Uniquement <code>FIN</code> : Paquet de fin isolé sans handshake -> <code>FIN_SCAN</code> (Sonde Nmap -sF).<br>\n5. Toute autre combinaison standard (ex: <code>SYN</code> seul, <code>ACK</code> seul, <code>SYN,ACK</code>) -> <code>TRAFIC_STANDARD</code>.<br><br>\nPour chaque ligne, afficher :<br>\n<code>SCAN_ALERT: {src} -> {dst}:{dport} [{flags}] => {CLASSIFICATION}</code></p>",
    "starter": "# Grille d'analyse (fw3-c2-e3) — Détecteur de balayages furtifs (Scans Xmas, Null, FIN & Syn-Fin)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Détection Null scan et Syn-Fin anomaly]\n# Données : PROBE src=198.51.100.5 dst=10.0.0.10 dport=80 flags=NONE\n# Données : PROBE src=198.51.100.6 dst=10.0.0.10 dport=443 flags=SYN,FIN\nA_COMPLETER\n\n[Cas 2 — Détection FIN scan isolé et trafic standard]\n# Données : PROBE src=203.0.113.8 dst=10.0.0.2 dport=3306 flags=FIN\n# Données : PROBE src=10.0.0.20 dst=172.16.0.5 dport=80 flags=SYN\nA_COMPLETER\n\n[Cas 3 — Variante Xmas scan avec ordre désordonné des flags]\n# Données : PROBE src=192.0.2.1 dst=192.168.1.1 dport=8080 flags=URG,FIN,PSH\nA_COMPLETER\n",
    "hints": [
      "Découper la chaîne flags par virgule et manipuler un set de flags.",
      "Comparer les ensembles pour gérer l’ordre des flags dans Xmas Scan."
    ],
    "examples": [
      {
        "stdin": "PROBE src=192.168.1.100 dst=10.0.0.1 dport=22 flags=FIN,PSH,URG",
        "expected": "SCAN_ALERT: 192.168.1.100 -> 10.0.0.1:22 [FIN,PSH,URG] => XMAS_TREE_SCAN",
        "note": "Sonde de type Xmas Scan avec FIN, PSH et URG actifs."
      }
    ],
    "tests": [
      {
        "label": "Détection Null scan et Syn-Fin anomaly",
        "stdin": "cas:1",
        "expected": "SCAN_ALERT: 198.51.100.5 -> 10.0.0.10:80 [NONE] => NULL_SCAN\nSCAN_ALERT: 198.51.100.6 -> 10.0.0.10:443 [SYN,FIN] => SYN_FIN_ANOMALY"
      },
      {
        "label": "Détection FIN scan isolé et trafic standard",
        "stdin": "cas:2",
        "expected": "SCAN_ALERT: 203.0.113.8 -> 10.0.0.2:3306 [FIN] => FIN_SCAN\nSCAN_ALERT: 10.0.0.20 -> 172.16.0.5:80 [SYN] => TRAFIC_STANDARD"
      },
      {
        "label": "Variante Xmas scan avec ordre désordonné des flags",
        "stdin": "cas:3",
        "expected": "SCAN_ALERT: 192.0.2.1 -> 192.168.1.1:8080 [URG,FIN,PSH] => XMAS_TREE_SCAN"
      }
    ],
    "solution": "[Exemple]\nSCAN_ALERT: 192.168.1.100 -> 10.0.0.1:22 [FIN,PSH,URG] => XMAS_TREE_SCAN\n\n[Cas 1 — Détection Null scan et Syn-Fin anomaly]\nSCAN_ALERT: 198.51.100.5 -> 10.0.0.10:80 [NONE] => NULL_SCAN\nSCAN_ALERT: 198.51.100.6 -> 10.0.0.10:443 [SYN,FIN] => SYN_FIN_ANOMALY\n\n[Cas 2 — Détection FIN scan isolé et trafic standard]\nSCAN_ALERT: 203.0.113.8 -> 10.0.0.2:3306 [FIN] => FIN_SCAN\nSCAN_ALERT: 10.0.0.20 -> 172.16.0.5:80 [SYN] => TRAFIC_STANDARD\n\n[Cas 3 — Variante Xmas scan avec ordre désordonné des flags]\nSCAN_ALERT: 192.0.2.1 -> 192.168.1.1:8080 [URG,FIN,PSH] => XMAS_TREE_SCAN"
  }
];
