'use strict';

module.exports = [
  {
    "id": "na2-c5-e1",
    "chapter": 5,
    "title": "Parseur de table de routage Cisco (show ip route)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser les entrées d'une table de routage Cisco IOS pour identifier la source (code), le préfixe, la distance administrative et le next-hop.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.168.1.0/24 is directly connected, GigabitEthernet0/0</code><br>\n- <code>L 192.168.1.1/32 is directly connected, GigabitEthernet0/0</code><br>\n- <code>S 10.0.0.0/8 [1/0] via 192.168.1.254</code><br>\n- <code>O 172.16.0.0/16 [110/20] via 10.1.1.2, GigabitEthernet0/1</code><br>\n- <code>S* 0.0.0.0/0 [1/0] via 192.168.1.254</code><br>\nPour chaque route, il Indiquez :<br>\n<code>[&lt;PROTO&gt;] &lt;RESEAU&gt; | AD=&lt;AD&gt; | Metrique=&lt;MET&gt; | Sortie=&lt;VIA_OU_INTERFACE&gt;</code><br>\navec les correspondances de protocoles :<br>\n<code>C</code> -&gt; Directement Connecte (AD=0, Metrique=0)<br>\n<code>L</code> -&gt; Hote Local (AD=0, Metrique=0)<br>\n<code>S</code> ou <code>S*</code> -&gt; Statique (AD et métrique extraits de <code>[AD/Metrique]</code>, par défaut AD=1, Met=0 si non précisé)<br>\n<code>O</code> -&gt; OSPF (AD=110)<br>\n<code>D</code> -&gt; EIGRP (AD=90)<br>\n<code>B</code> -&gt; BGP (AD=20 si eBGP, 200 si iBGP)</p>",
    "starter": "# Grille d'analyse (na2-c5-e1) — Parseur de table de routage Cisco (show ip route)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Route par défaut et route locale]\n# Données : L 192.168.1.254/32 is directly connected, GigabitEthernet0/0\n# Données : S* 0.0.0.0/0 [1/0] via 192.168.1.1\nA_COMPLETER\n\n[Cas 2 — Route dynamique OSPF avec métrique]\n# Données : O 172.16.0.0/16 [110/35] via 10.0.0.2, Serial0/0/0\nA_COMPLETER\n\n[Cas 3 — Route EIGRP interne]\n# Données : D 10.50.0.0/20 [90/30720] via 10.1.1.2\nA_COMPLETER\n\n[Cas 4 — Route statique flottante de secours]\n# Données : S 10.0.0.0/8 [120/0] via 192.168.2.1\nA_COMPLETER\n",
    "hints": [
      "Le premier token indique le code protocole (C, L, S, S*, O, D, B).",
      "Le bloc entre crochets [AD/Metrique] fournit la Distance Administrative et le coût."
    ],
    "examples": [
      {
        "stdin": "C 192.168.1.0/24 is directly connected, GigabitEthernet0/0\nS 10.0.0.0/8 [1/0] via 192.168.1.254",
        "expected": "[Directement Connecte] 192.168.1.0/24 | AD=0 | Metrique=0 | Sortie=GigabitEthernet0/0\n[Statique] 10.0.0.0/8 | AD=1 | Metrique=0 | Sortie=via 192.168.1.254",
        "note": "Extraction de route connectée et route statique standard."
      }
    ],
    "tests": [
      {
        "label": "Route par défaut et route locale",
        "stdin": "cas:1",
        "expected": "[Hote Local] 192.168.1.254/32 | AD=0 | Metrique=0 | Sortie=GigabitEthernet0/0\n[Statique] 0.0.0.0/0 | AD=1 | Metrique=0 | Sortie=via 192.168.1.1"
      },
      {
        "label": "Route dynamique OSPF avec métrique",
        "stdin": "cas:2",
        "expected": "[OSPF] 172.16.0.0/16 | AD=110 | Metrique=35 | Sortie=via 10.0.0.2"
      },
      {
        "label": "Route EIGRP interne",
        "stdin": "cas:3",
        "expected": "[EIGRP] 10.50.0.0/20 | AD=90 | Metrique=30720 | Sortie=via 10.1.1.2"
      },
      {
        "label": "Route statique flottante de secours",
        "stdin": "cas:4",
        "expected": "[Statique] 10.0.0.0/8 | AD=120 | Metrique=0 | Sortie=via 192.168.2.1"
      }
    ],
    "solution": "[Exemple]\n[Directement Connecte] 192.168.1.0/24 | AD=0 | Metrique=0 | Sortie=GigabitEthernet0/0\n[Statique] 10.0.0.0/8 | AD=1 | Metrique=0 | Sortie=via 192.168.1.254\n\n[Cas 1 — Route par défaut et route locale]\n[Hote Local] 192.168.1.254/32 | AD=0 | Metrique=0 | Sortie=GigabitEthernet0/0\n[Statique] 0.0.0.0/0 | AD=1 | Metrique=0 | Sortie=via 192.168.1.1\n\n[Cas 2 — Route dynamique OSPF avec métrique]\n[OSPF] 172.16.0.0/16 | AD=110 | Metrique=35 | Sortie=via 10.0.0.2\n\n[Cas 3 — Route EIGRP interne]\n[EIGRP] 10.50.0.0/20 | AD=90 | Metrique=30720 | Sortie=via 10.1.1.2\n\n[Cas 4 — Route statique flottante de secours]\n[Statique] 10.0.0.0/8 | AD=120 | Metrique=0 | Sortie=via 192.168.2.1"
  },
  {
    "id": "na2-c5-e2",
    "chapter": 5,
    "title": "Moteur de décision Longest Prefix Match (LPM)",
    "level": "n2",
    "language": "analyse",
    "goal": "Déterminer la route exacte empruntée par un paquet IP en appliquant la règle CCNA du préfixe le plus spécifique.",
    "brief": "<p>Analysez les données fournies pour chaque cas.168.1.135</code>).<br>\nLes lignes suivantes décrivent les routes candidates dans la table de routage au format :<br>\n<code>ROUTE &lt;PREFIXE/CIDR&gt; &lt;NEXT_HOP&gt; &lt;AD&gt;</code> (ex: <code>ROUTE 192.168.1.128/28 10.0.0.1 110</code>).<br>\nRègles d'arbitrage Cisco :<br>\n1. Filtrer les routes qui englobent l'IP de destination (l'IP doit appartenir au sous-réseau).<br>\n2. Choisir la route ayant le <strong>masque le plus long (CIDR le plus élevé)</strong> : Longest Prefix Match.<br>\n3. En cas d'égalité parfaite de longueur de préfixe, départager par la <strong>plus petite Distance Administrative (AD)</strong>.<br>\nAfficher :<br>\n<code>ROUTE RETENUE: &lt;PREFIXE/CIDR&gt; via &lt;NEXT_HOP&gt; (Masque /&lt;n&gt;, AD=&lt;ad&gt;)</code><br>\nSi aucune route ne correspond, afficher <code>PAQUET REJETE: Pas de route par defaut</code>.</p>",
    "starter": "# Grille d'analyse (na2-c5-e2) — Moteur de décision Longest Prefix Match (LPM)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Arbitrage par Distance Administrative sur même masque]\n# Données : PAQUET: 10.5.5.5\n# Données : ROUTE 10.5.5.0/24 192.168.1.1 110\n# Données : ROUTE 10.5.5.0/24 192.168.2.1 90\nA_COMPLETER\n\n[Cas 2 — Recours à la route par défaut /0]\n# Données : PAQUET: 8.8.8.8\n# Données : ROUTE 192.168.0.0/16 10.0.0.1 1\n# Données : ROUTE 172.16.0.0/12 10.0.0.2 1\n# Données : ROUTE 0.0.0.0/0 10.0.0.254 1\nA_COMPLETER\n\n[Cas 3 — Rejet en l absence de route correspondante]\n# Données : PAQUET: 203.0.113.5\n# Données : ROUTE 10.0.0.0/8 1.1.1.1 1\n# Données : ROUTE 192.168.1.0/24 2.2.2.2 1\nA_COMPLETER\n\n[Cas 4 — Route hôte /32 prioritaire sur tout]\n# Données : PAQUET: 172.16.1.100\n# Données : ROUTE 172.16.1.0/24 10.1.1.1 1\n# Données : ROUTE 172.16.1.100/32 10.99.99.1 110\nA_COMPLETER\n",
    "hints": [
      "Vérifier l'appartenance à un sous-réseau : (ip & mask) == network.",
      "Le tri principal est sur le CIDR décroissant, le tri secondaire sur l'AD croissante."
    ],
    "examples": [
      {
        "stdin": "PAQUET: 192.168.1.135\nROUTE 192.168.0.0/16 10.1.1.1 1\nROUTE 192.168.1.0/24 10.2.2.1 110\nROUTE 192.168.1.128/28 10.3.3.1 110\nROUTE 0.0.0.0/0 10.0.0.254 1",
        "expected": "ROUTE RETENUE: 192.168.1.128/28 via 10.3.3.1 (Masque /28, AD=110)",
        "note": "Le préfixe /28 est le plus spécifique bien que son AD (110) soit plus forte que /16 (AD 1)."
      }
    ],
    "tests": [
      {
        "label": "Arbitrage par Distance Administrative sur même masque",
        "stdin": "cas:1",
        "expected": "ROUTE RETENUE: 10.5.5.0/24 via 192.168.2.1 (Masque /24, AD=90)"
      },
      {
        "label": "Recours à la route par défaut /0",
        "stdin": "cas:2",
        "expected": "ROUTE RETENUE: 0.0.0.0/0 via 10.0.0.254 (Masque /0, AD=1)"
      },
      {
        "label": "Rejet en l absence de route correspondante",
        "stdin": "cas:3",
        "expected": "PAQUET REJETE: Pas de route par defaut"
      },
      {
        "label": "Route hôte /32 prioritaire sur tout",
        "stdin": "cas:4",
        "expected": "ROUTE RETENUE: 172.16.1.100/32 via 10.99.99.1 (Masque /32, AD=110)"
      }
    ],
    "solution": "[Exemple]\nROUTE RETENUE: 192.168.1.128/28 via 10.3.3.1 (Masque /28, AD=110)\n\n[Cas 1 — Arbitrage par Distance Administrative sur même masque]\nROUTE RETENUE: 10.5.5.0/24 via 192.168.2.1 (Masque /24, AD=90)\n\n[Cas 2 — Recours à la route par défaut /0]\nROUTE RETENUE: 0.0.0.0/0 via 10.0.0.254 (Masque /0, AD=1)\n\n[Cas 3 — Rejet en l absence de route correspondante]\nPAQUET REJETE: Pas de route par defaut\n\n[Cas 4 — Route hôte /32 prioritaire sur tout]\nROUTE RETENUE: 172.16.1.100/32 via 10.99.99.1 (Masque /32, AD=110)"
  },
  {
    "id": "na2-c5-e3",
    "chapter": 5,
    "title": "Calculateur de résumé de routes (Supernetting CIDR)",
    "level": "n3",
    "language": "analyse",
    "goal": "Agréger un ensemble de sous-réseaux IPv4 contigus en un unique préfixe résumé optimal pour optimiser la table de routage.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.168.0.0/24</code>, <code>192.168.1.0/24</code>, <code>192.168.2.0/24</code>, <code>192.168.3.0/24</code>).<br>\nL'objectif est de déterminer le <strong>plus petit préfixe englobant</strong> (Supernet) qui couvre l'ensemble des réseaux donnés :<br>\n1. Convertir chaque réseau en binaire 32 bits.<br>\n2. Trouver le nombre de bits communs de poids fort partagés par TOUS les réseaux.<br>\n3. Calculer l'adresse réseau résultante avec ce nouveau CIDR.<br>\nAfficher :<br>\n<code>RESUME OPTIMAL: &lt;RESEAU_RESUME&gt;/&lt;CIDR_COMMUN&gt;</code><br>\n<code>Masque: &lt;MASQUE_DECIMAL&gt;</code><br>\n<code>Sous-reseaux englobes: &lt;N&gt;</code></p>",
    "starter": "# Grille d'analyse (na2-c5-e3) — Calculateur de résumé de routes (Supernetting CIDR)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux réseaux /24 agrégés en /23]\n# Données : 172.16.10.0/24\n# Données : 172.16.11.0/24\nA_COMPLETER\n\n[Cas 2 — Huit sous-réseaux de succursales]\n# Données : 10.10.0.0/24\n# Données : 10.10.1.0/24\n# Données : 10.10.2.0/24\n# Données : 10.10.3.0/24\n# Données : 10.10.4.0/24\n# Données : 10.10.5.0/24\n# Données : 10.10.6.0/24\n# Données : 10.10.7.0/24\nA_COMPLETER\n\n[Cas 3 — Sous-réseaux /28 de datacenters]\n# Données : 192.168.1.16/28\n# Données : 192.168.1.32/28\nA_COMPLETER\n\n[Cas 4 — Réseau unique sans agrégation]\n# Données : 192.168.1.0/24\nA_COMPLETER\n",
    "hints": [
      "Comparer les représentations binaires des adresses réseau minimale et maximale du lot.",
      "Le premier bit divergent détermine la fin du préfixe commun."
    ],
    "examples": [
      {
        "stdin": "192.168.0.0/24\n192.168.1.0/24\n192.168.2.0/24\n192.168.3.0/24",
        "expected": "RESUME OPTIMAL: 192.168.0.0/22\nMasque: 255.255.252.0\nSous-reseaux englobes: 4",
        "note": "4 blocs /24 contigus résumés en 1 bloc /22."
      }
    ],
    "tests": [
      {
        "label": "Deux réseaux /24 agrégés en /23",
        "stdin": "cas:1",
        "expected": "RESUME OPTIMAL: 172.16.10.0/23\nMasque: 255.255.254.0\nSous-reseaux englobes: 2"
      },
      {
        "label": "Huit sous-réseaux de succursales",
        "stdin": "cas:2",
        "expected": "RESUME OPTIMAL: 10.10.0.0/21\nMasque: 255.255.248.0\nSous-reseaux englobes: 8"
      },
      {
        "label": "Sous-réseaux /28 de datacenters",
        "stdin": "cas:3",
        "expected": "RESUME OPTIMAL: 192.168.1.0/26\nMasque: 255.255.255.192\nSous-reseaux englobes: 2"
      },
      {
        "label": "Réseau unique sans agrégation",
        "stdin": "cas:4",
        "expected": "RESUME OPTIMAL: 192.168.1.0/24\nMasque: 255.255.255.0\nSous-reseaux englobes: 1"
      }
    ],
    "solution": "[Exemple]\nRESUME OPTIMAL: 192.168.0.0/22\nMasque: 255.255.252.0\nSous-reseaux englobes: 4\n\n[Cas 1 — Deux réseaux /24 agrégés en /23]\nRESUME OPTIMAL: 172.16.10.0/23\nMasque: 255.255.254.0\nSous-reseaux englobes: 2\n\n[Cas 2 — Huit sous-réseaux de succursales]\nRESUME OPTIMAL: 10.10.0.0/21\nMasque: 255.255.248.0\nSous-reseaux englobes: 8\n\n[Cas 3 — Sous-réseaux /28 de datacenters]\nRESUME OPTIMAL: 192.168.1.0/26\nMasque: 255.255.255.192\nSous-reseaux englobes: 2\n\n[Cas 4 — Réseau unique sans agrégation]\nRESUME OPTIMAL: 192.168.1.0/24\nMasque: 255.255.255.0\nSous-reseaux englobes: 1"
  }
];
