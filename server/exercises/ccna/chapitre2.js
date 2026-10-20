'use strict';

module.exports = [
  {
    "id": "na2-c2-e1",
    "chapter": 2,
    "title": "Calculateur de masque IPv4 et masque générique (Wildcard)",
    "level": "n1",
    "language": "analyse",
    "goal": "Convertir une longueur de préfixe CIDR (/n) en masque décimal pointé, masque générique (wildcard pour ACL/OSPF) et compter les adresses.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nPour chaque préfixe <code>/n</code> (avec <code>0 &lt;= n &lt;= 32</code>), il Indiquez une ligne au format :<br>\n<code>/n -&gt; Masque: &lt;M.M.M.M&gt; | Wildcard: &lt;W.W.W.W&gt; | Total: &lt;T&gt; | Hotes: &lt;H&gt;</code><br>\navec <code>H = max(0, 2**(32-n) - 2)</code> si <code>n &lt;= 30</code>, <code>2</code> si <code>n == 31</code> (RFC 3021 liens point-à-point), et <code>1</code> si <code>n == 32</code> (adresse d'hôte unique / loopback).</p>",
    "starter": "# Grille d'analyse (na2-c2-e1) — Calculateur de masque IPv4 et masque générique (Wildcard)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Préfixes classe A, B et intermédiaires]\n# Données : /8 /16 /27\nA_COMPLETER\n\n[Cas 2 — Sous-réseau /29 et RFC 3021 point à point /31]\n# Données : /29 /31\nA_COMPLETER\n\n[Cas 3 — Route par défaut /0]\n# Données : /0\nA_COMPLETER\n\n[Cas 4 — Nombres sans slash]\n# Données : 21 26 28\nA_COMPLETER\n",
    "hints": [
      "Le masque contient n bits à 1 suivis de (32 - n) bits à 0.",
      "Le masque générique (Wildcard) s'obtient par soustraction de chaque octet à 255 : (255 - M).",
      "Le nombre total d'adresses est 2**(32 - n)."
    ],
    "examples": [
      {
        "stdin": "/24 /30 /32",
        "expected": "/24 -> Masque: 255.255.255.0 | Wildcard: 0.0.0.255 | Total: 256 | Hotes: 254\n/30 -> Masque: 255.255.255.252 | Wildcard: 0.0.0.3 | Total: 4 | Hotes: 2\n/32 -> Masque: 255.255.255.255 | Wildcard: 0.0.0.0 | Total: 1 | Hotes: 1",
        "note": "Conversions classiques pour LAN, lien inter-routeur et loopback."
      }
    ],
    "tests": [
      {
        "label": "Préfixes classe A, B et intermédiaires",
        "stdin": "cas:1",
        "expected": "/8 -> Masque: 255.0.0.0 | Wildcard: 0.255.255.255 | Total: 16777216 | Hotes: 16777214\n/16 -> Masque: 255.255.0.0 | Wildcard: 0.0.255.255 | Total: 65536 | Hotes: 65534\n/27 -> Masque: 255.255.255.224 | Wildcard: 0.0.0.31 | Total: 32 | Hotes: 30"
      },
      {
        "label": "Sous-réseau /29 et RFC 3021 point à point /31",
        "stdin": "cas:2",
        "expected": "/29 -> Masque: 255.255.255.248 | Wildcard: 0.0.0.7 | Total: 8 | Hotes: 6\n/31 -> Masque: 255.255.255.254 | Wildcard: 0.0.0.1 | Total: 2 | Hotes: 2"
      },
      {
        "label": "Route par défaut /0",
        "stdin": "cas:3",
        "expected": "/0 -> Masque: 0.0.0.0 | Wildcard: 255.255.255.255 | Total: 4294967296 | Hotes: 4294967294"
      },
      {
        "label": "Nombres sans slash",
        "stdin": "cas:4",
        "expected": "/21 -> Masque: 255.255.248.0 | Wildcard: 0.0.7.255 | Total: 2048 | Hotes: 2046\n/26 -> Masque: 255.255.255.192 | Wildcard: 0.0.0.63 | Total: 64 | Hotes: 62\n/28 -> Masque: 255.255.255.240 | Wildcard: 0.0.0.15 | Total: 16 | Hotes: 14"
      }
    ],
    "solution": "[Exemple]\n/24 -> Masque: 255.255.255.0 | Wildcard: 0.0.0.255 | Total: 256 | Hotes: 254\n/30 -> Masque: 255.255.255.252 | Wildcard: 0.0.0.3 | Total: 4 | Hotes: 2\n/32 -> Masque: 255.255.255.255 | Wildcard: 0.0.0.0 | Total: 1 | Hotes: 1\n\n[Cas 1 — Préfixes classe A, B et intermédiaires]\n/8 -> Masque: 255.0.0.0 | Wildcard: 0.255.255.255 | Total: 16777216 | Hotes: 16777214\n/16 -> Masque: 255.255.0.0 | Wildcard: 0.0.255.255 | Total: 65536 | Hotes: 65534\n/27 -> Masque: 255.255.255.224 | Wildcard: 0.0.0.31 | Total: 32 | Hotes: 30\n\n[Cas 2 — Sous-réseau /29 et RFC 3021 point à point /31]\n/29 -> Masque: 255.255.255.248 | Wildcard: 0.0.0.7 | Total: 8 | Hotes: 6\n/31 -> Masque: 255.255.255.254 | Wildcard: 0.0.0.1 | Total: 2 | Hotes: 2\n\n[Cas 3 — Route par défaut /0]\n/0 -> Masque: 0.0.0.0 | Wildcard: 255.255.255.255 | Total: 4294967296 | Hotes: 4294967294\n\n[Cas 4 — Nombres sans slash]\n/21 -> Masque: 255.255.248.0 | Wildcard: 0.0.7.255 | Total: 2048 | Hotes: 2046\n/26 -> Masque: 255.255.255.192 | Wildcard: 0.0.0.63 | Total: 64 | Hotes: 62\n/28 -> Masque: 255.255.255.240 | Wildcard: 0.0.0.15 | Total: 16 | Hotes: 14"
  },
  {
    "id": "na2-c2-e2",
    "chapter": 2,
    "title": "Analyseur complet de sous-réseau IPv4",
    "level": "n2",
    "language": "analyse",
    "goal": "Déterminer l'adresse de sous-réseau, l'adresse de diffusion (broadcast), la plage d'adresses hôtes valides et la classe d'adresse.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.168.10.45/26</code>).<br>\nIl calcule et Indiquez dans l'ordre :<br>\n- <code>Reseau: &lt;IP_RESEAU&gt;/&lt;CIDR&gt;</code><br>\n- <code>Masque: &lt;MASQUE_DECIMAL&gt;</code><br>\n- <code>Broadcast: &lt;IP_BROADCAST&gt;</code><br>\n- <code>Premier hote: &lt;IP_PREMIER&gt;</code><br>\n- <code>Dernier hote: &lt;IP_DERNIER&gt;</code><br>\n- <code>Capacite: &lt;NB_HOTES&gt; hotes utiles</code><br>\n- <code>Type: &lt;PRIVE|PUBLIC|LOOPBACK|APIPA|MULTICAST&gt;</code> (Privé selon RFC 1918 : 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 ; Loopback 127.0.0.0/8 ; APIPA 169.254.0.0/16 ; Multicast 224.0.0.0/4 ; sinon Public).</p>",
    "starter": "# Grille d'analyse (na2-c2-e2) — Analyseur complet de sous-réseau IPv4\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sous-réseau classe A privé /20]\n# Données : 10.50.88.130/20\nA_COMPLETER\n\n[Cas 2 — Adresse publique /28]\n# Données : 8.8.8.8/28\nA_COMPLETER\n\n[Cas 3 — Lien d interconnexion /30 privé 172.16]\n# Données : 172.16.1.5/30\nA_COMPLETER\n\n[Cas 4 — Adresse automatique APIPA 169.254]\n# Données : 169.254.12.34/16\nA_COMPLETER\n",
    "hints": [
      "Convertir l'adresse IPv4 en entier 32 bits facilite l'opération ET bit à bit avec le masque de sous-réseau.",
      "L'adresse réseau a tous les bits d'hôte à 0 ; l'adresse de broadcast a tous les bits d'hôte à 1.",
      "Premier hôte = réseau + 1, dernier hôte = broadcast - 1."
    ],
    "examples": [
      {
        "stdin": "192.168.10.45/26",
        "expected": "Reseau: 192.168.10.0/26\nMasque: 255.255.255.192\nBroadcast: 192.168.10.63\nPremier hote: 192.168.10.1\nDernier hote: 192.168.10.62\nCapacite: 62 hotes utiles\nType: PRIVE",
        "note": "Sous-réseau /26 avec 62 hôtes exploitables sur adresse RFC 1918."
      }
    ],
    "tests": [
      {
        "label": "Sous-réseau classe A privé /20",
        "stdin": "cas:1",
        "expected": "Reseau: 10.50.80.0/20\nMasque: 255.255.240.0\nBroadcast: 10.50.95.255\nPremier hote: 10.50.80.1\nDernier hote: 10.50.95.254\nCapacite: 4094 hotes utiles\nType: PRIVE"
      },
      {
        "label": "Adresse publique /28",
        "stdin": "cas:2",
        "expected": "Reseau: 8.8.8.0/28\nMasque: 255.255.255.240\nBroadcast: 8.8.8.15\nPremier hote: 8.8.8.1\nDernier hote: 8.8.8.14\nCapacite: 14 hotes utiles\nType: PUBLIC"
      },
      {
        "label": "Lien d interconnexion /30 privé 172.16",
        "stdin": "cas:3",
        "expected": "Reseau: 172.16.1.4/30\nMasque: 255.255.255.252\nBroadcast: 172.16.1.7\nPremier hote: 172.16.1.5\nDernier hote: 172.16.1.6\nCapacite: 2 hotes utiles\nType: PRIVE"
      },
      {
        "label": "Adresse automatique APIPA 169.254",
        "stdin": "cas:4",
        "expected": "Reseau: 169.254.0.0/16\nMasque: 255.255.0.0\nBroadcast: 169.254.255.255\nPremier hote: 169.254.0.1\nDernier hote: 169.254.255.254\nCapacite: 65534 hotes utiles\nType: APIPA"
      }
    ],
    "solution": "[Exemple]\nReseau: 192.168.10.0/26\nMasque: 255.255.255.192\nBroadcast: 192.168.10.63\nPremier hote: 192.168.10.1\nDernier hote: 192.168.10.62\nCapacite: 62 hotes utiles\nType: PRIVE\n\n[Cas 1 — Sous-réseau classe A privé /20]\nReseau: 10.50.80.0/20\nMasque: 255.255.240.0\nBroadcast: 10.50.95.255\nPremier hote: 10.50.80.1\nDernier hote: 10.50.95.254\nCapacite: 4094 hotes utiles\nType: PRIVE\n\n[Cas 2 — Adresse publique /28]\nReseau: 8.8.8.0/28\nMasque: 255.255.255.240\nBroadcast: 8.8.8.15\nPremier hote: 8.8.8.1\nDernier hote: 8.8.8.14\nCapacite: 14 hotes utiles\nType: PUBLIC\n\n[Cas 3 — Lien d interconnexion /30 privé 172.16]\nReseau: 172.16.1.4/30\nMasque: 255.255.255.252\nBroadcast: 172.16.1.7\nPremier hote: 172.16.1.5\nDernier hote: 172.16.1.6\nCapacite: 2 hotes utiles\nType: PRIVE\n\n[Cas 4 — Adresse automatique APIPA 169.254]\nReseau: 169.254.0.0/16\nMasque: 255.255.0.0\nBroadcast: 169.254.255.255\nPremier hote: 169.254.0.1\nDernier hote: 169.254.255.254\nCapacite: 65534 hotes utiles\nType: APIPA"
  },
  {
    "id": "na2-c2-e3",
    "chapter": 2,
    "title": "Planificateur et allocateur VLSM hiérarchique",
    "level": "n3",
    "language": "analyse",
    "goal": "Découper un bloc IPv4 mère en sous-réseaux optimaux avec Variable Length Subnet Masking (VLSM).",
    "brief": "<p>Analysez les données fournies pour chaque cas.168.1.0/24</code>).<br>\nLes lignes suivantes décrivent les besoins sous la forme <code>&lt;NOM_SOUS_RESEAU&gt;: &lt;NB_HOTES&gt;</code>.<br>\nL'algorithme VLSM exige de :<br>\n1. Trier les demandes par <strong>nombre d'hôtes requis décroissant</strong> (les sous-réseaux les plus larges en premier pour éviter la fragmentation de l'espace d'adressage). En cas d'égalité d'hôtes, conserver l'ordre d'apparition.<br>\n2. Calculer pour chaque besoin la taille du bloc <code>2**k</code> telle que <code>2**k - 2 &gt;= NB_HOTES</code> (et <code>k &gt;= 2</code>, sauf si hôtes == 1 où <code>k=2</code> pour /30). Le préfixe attribué est <code>/(32 - k)</code>.<br>\n3. Allouer séquentiellement à partir de l'adresse de base du bloc racine.<br>\nPour chaque sous-réseau, afficher :<br>\n<code>&lt;NOM&gt; (&lt;BESOIN&gt; hotes) -&gt; &lt;RESEAU&gt;/&lt;CIDR&gt; [&lt;FIRST&gt; - &lt;LAST&gt;] BC: &lt;BCAST&gt;</code></p>",
    "starter": "# Grille d'analyse (na2-c2-e3) — Planificateur et allocateur VLSM hiérarchique\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux grands départements et deux petits]\n# Données : 10.0.0.0/22\n# Données : Dev: 200\n# Données : Support: 100\n# Données : Admin: 50\n# Données : Serveurs: 30\nA_COMPLETER\n\n[Cas 2 — Besoins avec tailles identiques stables]\n# Données : 172.16.0.0/23\n# Données : VLAN10: 60\n# Données : VLAN20: 60\n# Données : VLAN30: 14\nA_COMPLETER\n\n[Cas 3 — Trois liaisons WAN point à point]\n# Données : 192.168.100.0/28\n# Données : WAN_AB: 2\n# Données : WAN_BC: 2\n# Données : WAN_CA: 2\nA_COMPLETER\n\n[Cas 4 — Grand campus universitaire]\n# Données : 10.100.0.0/16\n# Données : Amphis: 1000\n# Données : Labos: 500\n# Données : Wi-Fi: 250\nA_COMPLETER\n",
    "hints": [
      "Le tri par nombre d'hôtes décroissant est impératif en VLSM sous peine de briser la contrainte d'alignement sur les puissances de 2.",
      "L'adresse réseau du bloc suivant commence immédiatement à l'adresse de broadcast du bloc précédent + 1."
    ],
    "examples": [
      {
        "stdin": "192.168.1.0/24\nDirection: 50\nComptabilite: 25\nInformatique: 12\nLienWAN: 2",
        "expected": "Direction (50 hotes) -> 192.168.1.0/26 [192.168.1.1 - 192.168.1.62] BC: 192.168.1.63\nComptabilite (25 hotes) -> 192.168.1.64/27 [192.168.1.65 - 192.168.1.94] BC: 192.168.1.95\nInformatique (12 hotes) -> 192.168.1.96/28 [192.168.1.97 - 192.168.1.110] BC: 192.168.1.111\nLienWAN (2 hotes) -> 192.168.1.112/30 [192.168.1.113 - 192.168.1.114] BC: 192.168.1.115",
        "note": "Allocation VLSM typique d'une entreprise avec un lien WAN."
      }
    ],
    "tests": [
      {
        "label": "Deux grands départements et deux petits",
        "stdin": "cas:1",
        "expected": "Dev (200 hotes) -> 10.0.0.0/24 [10.0.0.1 - 10.0.0.254] BC: 10.0.0.255\nSupport (100 hotes) -> 10.0.1.0/25 [10.0.1.1 - 10.0.1.126] BC: 10.0.1.127\nAdmin (50 hotes) -> 10.0.1.128/26 [10.0.1.129 - 10.0.1.190] BC: 10.0.1.191\nServeurs (30 hotes) -> 10.0.1.192/27 [10.0.1.193 - 10.0.1.222] BC: 10.0.1.223"
      },
      {
        "label": "Besoins avec tailles identiques stables",
        "stdin": "cas:2",
        "expected": "VLAN10 (60 hotes) -> 172.16.0.0/26 [172.16.0.1 - 172.16.0.62] BC: 172.16.0.63\nVLAN20 (60 hotes) -> 172.16.0.64/26 [172.16.0.65 - 172.16.0.126] BC: 172.16.0.127\nVLAN30 (14 hotes) -> 172.16.0.128/28 [172.16.0.129 - 172.16.0.142] BC: 172.16.0.143"
      },
      {
        "label": "Trois liaisons WAN point à point",
        "stdin": "cas:3",
        "expected": "WAN_AB (2 hotes) -> 192.168.100.0/30 [192.168.100.1 - 192.168.100.2] BC: 192.168.100.3\nWAN_BC (2 hotes) -> 192.168.100.4/30 [192.168.100.5 - 192.168.100.6] BC: 192.168.100.7\nWAN_CA (2 hotes) -> 192.168.100.8/30 [192.168.100.9 - 192.168.100.10] BC: 192.168.100.11"
      },
      {
        "label": "Grand campus universitaire",
        "stdin": "cas:4",
        "expected": "Amphis (1000 hotes) -> 10.100.0.0/22 [10.100.0.1 - 10.100.3.254] BC: 10.100.3.255\nLabos (500 hotes) -> 10.100.4.0/23 [10.100.4.1 - 10.100.5.254] BC: 10.100.5.255\nWi-Fi (250 hotes) -> 10.100.6.0/24 [10.100.6.1 - 10.100.6.254] BC: 10.100.6.255"
      }
    ],
    "solution": "[Exemple]\nDirection (50 hotes) -> 192.168.1.0/26 [192.168.1.1 - 192.168.1.62] BC: 192.168.1.63\nComptabilite (25 hotes) -> 192.168.1.64/27 [192.168.1.65 - 192.168.1.94] BC: 192.168.1.95\nInformatique (12 hotes) -> 192.168.1.96/28 [192.168.1.97 - 192.168.1.110] BC: 192.168.1.111\nLienWAN (2 hotes) -> 192.168.1.112/30 [192.168.1.113 - 192.168.1.114] BC: 192.168.1.115\n\n[Cas 1 — Deux grands départements et deux petits]\nDev (200 hotes) -> 10.0.0.0/24 [10.0.0.1 - 10.0.0.254] BC: 10.0.0.255\nSupport (100 hotes) -> 10.0.1.0/25 [10.0.1.1 - 10.0.1.126] BC: 10.0.1.127\nAdmin (50 hotes) -> 10.0.1.128/26 [10.0.1.129 - 10.0.1.190] BC: 10.0.1.191\nServeurs (30 hotes) -> 10.0.1.192/27 [10.0.1.193 - 10.0.1.222] BC: 10.0.1.223\n\n[Cas 2 — Besoins avec tailles identiques stables]\nVLAN10 (60 hotes) -> 172.16.0.0/26 [172.16.0.1 - 172.16.0.62] BC: 172.16.0.63\nVLAN20 (60 hotes) -> 172.16.0.64/26 [172.16.0.65 - 172.16.0.126] BC: 172.16.0.127\nVLAN30 (14 hotes) -> 172.16.0.128/28 [172.16.0.129 - 172.16.0.142] BC: 172.16.0.143\n\n[Cas 3 — Trois liaisons WAN point à point]\nWAN_AB (2 hotes) -> 192.168.100.0/30 [192.168.100.1 - 192.168.100.2] BC: 192.168.100.3\nWAN_BC (2 hotes) -> 192.168.100.4/30 [192.168.100.5 - 192.168.100.6] BC: 192.168.100.7\nWAN_CA (2 hotes) -> 192.168.100.8/30 [192.168.100.9 - 192.168.100.10] BC: 192.168.100.11\n\n[Cas 4 — Grand campus universitaire]\nAmphis (1000 hotes) -> 10.100.0.0/22 [10.100.0.1 - 10.100.3.254] BC: 10.100.3.255\nLabos (500 hotes) -> 10.100.4.0/23 [10.100.4.1 - 10.100.5.254] BC: 10.100.5.255\nWi-Fi (250 hotes) -> 10.100.6.0/24 [10.100.6.1 - 10.100.6.254] BC: 10.100.6.255"
  }
];
