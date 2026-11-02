'use strict';

module.exports = [
  {
    "id": "vo3-c5-e1",
    "chapter": 5,
    "title": "Calculateur d'Erlang B & Dimensionnement de Trunks Téléphoniques",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la probabilité de blocage GoS par la formule récursive d'Erlang B et dimensionner le nombre de canaux requis.",
    "brief": "<p>La loi d'Erlang B modélise la probabilité de blocage d'appels téléphoniques (Grade of Service, GoS) sur un faisceau (trunk) de <code>N</code> canaux sans mise en attente (appels rejetés si tous les canaux sont occupés).<br>Le trafic offert <code>A</code> (en Erlangs) est calculé par :<br><code>A = (CALLS_PER_HOUR * DURATION_SEC) / 3600.0</code></p>\n<p>La formule récursive d'Erlang B pour calculer la probabilité de blocage <code>B(N, A)</code> est :</p><ul><li><code>B(0, A) = 1.0</code></li><li><code>B(k, A) = (A * B(k-1, A)) / (k + A * B(k-1, A))</code> pour <code>k = 1, 2, ..., N</code>.</li></ul>\n<p>Format d'entrée :<br>Lignes de la forme :<br>CALLS_PER_HOUR=<nb> DURATION_SEC=<duree_moyenne> CHANNELS=<nb_canaux> TARGET_GOS_PCT=<seuil_gos_max_pct></p>\n<p>Règles de calcul :<br>1. Calculer le trafic offert <code>A</code> en Erlangs.<br>2. Calculer la probabilité de blocage réelle <code>B(N, A)</code> en pourcentage (<code>B * 100.0</code>).<br>3. Comparer avec le seuil cible <code>TARGET_GOS_PCT</code> :<br>   - Si <code>blocage_pct <= TARGET_GOS_PCT</code> -> <code>CONFORME:OUI</code><br>   - Sinon -> <code>CONFORME:NON</code><br>4. Déterminer le nombre minimal de canaux <code>N_MIN</code> nécessaires pour que <code>B(N_MIN, A) * 100.0 <= TARGET_GOS_PCT</code>.</p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>TRAFIC:<A:.2f>E | CANAUX:<N> | BLOCAGE:<blocage_pct:.2f>% | TARGET:<target:.2f>% | CONFORME:<OUI|NON> | CANAUX_REQUIS:<N_MIN></p>",
    "starter": "# Grille d'analyse (vo3-c5-e1) — Calculateur d'Erlang B & Dimensionnement de Trunks Téléphoniques\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CALLS_PER_HOUR=50 DURATION_SEC=60 CHANNELS=5 TARGET_GOS_PCT=1.0\n# Données : CALLS_PER_HOUR=300 DURATION_SEC=180 CHANNELS=25 TARGET_GOS_PCT=1.0\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CALLS_PER_HOUR=60 DURATION_SEC=120 CHANNELS=4 TARGET_GOS_PCT=5.0\n# Données : CALLS_PER_HOUR=10 DURATION_SEC=300 CHANNELS=2 TARGET_GOS_PCT=2.0\nA_COMPLETER\n",
    "hints": [
      "Appliquez la formule récursive : B(k) = (A * B(k-1)) / (k + A * B(k-1)) avec B(0) = 1.0.",
      "Incrémentez le nombre de canaux k jusqu'à atteindre un blocage inférieur au seuil GoS."
    ],
    "examples": [
      {
        "stdin": "CALLS_PER_HOUR=120 DURATION_SEC=180 CHANNELS=10 TARGET_GOS_PCT=1.0\nCALLS_PER_HOUR=200 DURATION_SEC=120 CHANNELS=8 TARGET_GOS_PCT=2.0",
        "expected": "TRAFIC:6.00E | CANAUX:10 | BLOCAGE:4.31% | TARGET:1.00% | CONFORME:NON | CANAUX_REQUIS:13\nTRAFIC:6.67E | CANAUX:8 | BLOCAGE:15.97% | TARGET:2.00% | CONFORME:NON | CANAUX_REQUIS:13\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "TRAFIC:0.83E | CANAUX:5 | BLOCAGE:0.15% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:4\nTRAFIC:15.00E | CANAUX:25 | BLOCAGE:0.50% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:24\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "TRAFIC:2.00E | CANAUX:4 | BLOCAGE:9.52% | TARGET:5.00% | CONFORME:NON | CANAUX_REQUIS:5\nTRAFIC:0.83E | CANAUX:2 | BLOCAGE:15.92% | TARGET:2.00% | CONFORME:NON | CANAUX_REQUIS:4\n"
      }
    ],
    "solution": "[Exemple]\nTRAFIC:6.00E | CANAUX:10 | BLOCAGE:4.31% | TARGET:1.00% | CONFORME:NON | CANAUX_REQUIS:13\nTRAFIC:6.67E | CANAUX:8 | BLOCAGE:15.97% | TARGET:2.00% | CONFORME:NON | CANAUX_REQUIS:13\n\n\n[Cas 1 — Cas de test 1]\nTRAFIC:0.83E | CANAUX:5 | BLOCAGE:0.15% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:4\nTRAFIC:15.00E | CANAUX:25 | BLOCAGE:0.50% | TARGET:1.00% | CONFORME:OUI | CANAUX_REQUIS:24\n\n\n[Cas 2 — Cas de test 2]\nTRAFIC:2.00E | CANAUX:4 | BLOCAGE:9.52% | TARGET:5.00% | CONFORME:NON | CANAUX_REQUIS:5\nTRAFIC:0.83E | CANAUX:2 | BLOCAGE:15.92% | TARGET:2.00% | CONFORME:NON | CANAUX_REQUIS:4"
  },
  {
    "id": "vo3-c5-e2",
    "chapter": 5,
    "title": "Validateur de Marquage QoS & Mappage DSCP / CoS 802.1p",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la conformité du marquage QoS (CoS 5, DSCP EF 46) et la ségrégation en Voice VLAN pour les flux ToIP.",
    "brief": "<p>Dans les réseaux d'entreprise, la qualité de service (QoS) est indispensable pour préserver la voix en temps réel de la gigue et de la congestion. Les standards IETF et IEEE recommandent :   Dans l'en-tête IP (champ ToS / DiffServ), la valeur DSCP est décalée de 2 bits à gauche : <code>ToS = DSCP << 2</code> (ex: 46 << 2 = 184 soit 0xB8).   Le marquage de niveau 2 (802.1p CoS) associé est <code>CoS = 5</code> (Voice).   ToS = 24 << 2 = 96 (0x60) ou 26 << 2 = 104 (0x68).   Le marquage CoS associé est <code>CoS = 3</code> (Call Signaling).</p><ul><li>Médias vocaux RTP : DSCP EF (Expedited Forwarding = valeur décimale 46, binaire 101110)</li><li>Signalisation SIP : DSCP CS3 (valeur 24) ou AF31 (valeur 26)</li><li>Trafic Best-Effort (données web/bureautique) : DSCP CS0 (0, ToS = 0, CoS = 0).</li></ul>\n<p>Format d'entrée :<br>Lignes décrivant des flux réseau observés :<br>FLUX=<RTP_VOICE|SIP_SIGNALING|DATA_DEFAULT> DSCP_DEC=<valeur> COS_OBSERVED=<cos></p>\n<p>Règles de validation :<br>1. Calculer la valeur théorique du champ ToS (hexadécimal 0x..) : <code>tos = dscp << 2</code>.<br>2. Vérifier la conformité du marquage DSCP et CoS selon le type de flux :<br>   - RTP_VOICE : attendu DSCP == 46 et CoS == 5<br>   - SIP_SIGNALING : attendu DSCP in {24, 26} et CoS == 3<br>   - DATA_DEFAULT : attendu DSCP == 0 et CoS == 0<br>3. Si tout correspond -> <code>STATUT:CONFORME</code><br>   Sinon -> <code>STATUT:NON_CONFORME</code> (préciser l'anomalie : DSCP_INCORRECT, COS_INCORRECT ou TOUS_DEUX_INCORRECTS).</p>\n<p>Format de sortie :<br>Pour chaque ligne, afficher :<br>FLUX:<nom> | DSCP:<val> | TOS:0x<hex> | COS:<cos> | STATUT:<statut> | ANOMALIE:<AUCUNE|anomalie></p>",
    "starter": "# Grille d'analyse (vo3-c5-e2) — Validateur de Marquage QoS & Mappage DSCP / CoS 802.1p\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : FLUX=DATA_DEFAULT DSCP_DEC=0 COS_OBSERVED=0\n# Données : FLUX=DATA_DEFAULT DSCP_DEC=46 COS_OBSERVED=5\n# Données : FLUX=RTP_VOICE DSCP_DEC=46 COS_OBSERVED=0\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : FLUX=SIP_SIGNALING DSCP_DEC=46 COS_OBSERVED=3\n# Données : FLUX=SIP_SIGNALING DSCP_DEC=0 COS_OBSERVED=0\nA_COMPLETER\n",
    "hints": [
      "Contrôlez que les flux RTP sont marqués avec DSCP 46 (Expedited Forwarding).",
      "Vérifiez que la signalisation SIP est protégée par un marquage CS3 (24) ou AF31 (26)."
    ],
    "examples": [
      {
        "stdin": "FLUX=RTP_VOICE DSCP_DEC=46 COS_OBSERVED=5\nFLUX=RTP_VOICE DSCP_DEC=0 COS_OBSERVED=0\nFLUX=SIP_SIGNALING DSCP_DEC=26 COS_OBSERVED=3\nFLUX=SIP_SIGNALING DSCP_DEC=24 COS_OBSERVED=5",
        "expected": "FLUX:RTP_VOICE | DSCP:46 | TOS:0xb8 | COS:5 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:RTP_VOICE | DSCP:0 | TOS:0x00 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\nFLUX:SIP_SIGNALING | DSCP:26 | TOS:0x68 | COS:3 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:SIP_SIGNALING | DSCP:24 | TOS:0x60 | COS:5 | STATUT:NON_CONFORME | ANOMALIE:COS_INCORRECT\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "FLUX:DATA_DEFAULT | DSCP:0 | TOS:0x00 | COS:0 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:DATA_DEFAULT | DSCP:46 | TOS:0xb8 | COS:5 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\nFLUX:RTP_VOICE | DSCP:46 | TOS:0xb8 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:COS_INCORRECT\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "FLUX:SIP_SIGNALING | DSCP:46 | TOS:0xb8 | COS:3 | STATUT:NON_CONFORME | ANOMALIE:DSCP_INCORRECT\nFLUX:SIP_SIGNALING | DSCP:0 | TOS:0x00 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\n"
      }
    ],
    "solution": "[Exemple]\nFLUX:RTP_VOICE | DSCP:46 | TOS:0xb8 | COS:5 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:RTP_VOICE | DSCP:0 | TOS:0x00 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\nFLUX:SIP_SIGNALING | DSCP:26 | TOS:0x68 | COS:3 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:SIP_SIGNALING | DSCP:24 | TOS:0x60 | COS:5 | STATUT:NON_CONFORME | ANOMALIE:COS_INCORRECT\n\n\n[Cas 1 — Cas de test 1]\nFLUX:DATA_DEFAULT | DSCP:0 | TOS:0x00 | COS:0 | STATUT:CONFORME | ANOMALIE:AUCUNE\nFLUX:DATA_DEFAULT | DSCP:46 | TOS:0xb8 | COS:5 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS\nFLUX:RTP_VOICE | DSCP:46 | TOS:0xb8 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:COS_INCORRECT\n\n\n[Cas 2 — Cas de test 2]\nFLUX:SIP_SIGNALING | DSCP:46 | TOS:0xb8 | COS:3 | STATUT:NON_CONFORME | ANOMALIE:DSCP_INCORRECT\nFLUX:SIP_SIGNALING | DSCP:0 | TOS:0x00 | COS:0 | STATUT:NON_CONFORME | ANOMALIE:TOUS_DEUX_INCORRECTS"
  },
  {
    "id": "vo3-c5-e3",
    "chapter": 5,
    "title": "Observer les mappages STUN avant les vérifications ICE",
    "level": "n3",
    "language": "analyse",
    "goal": "Comparer deux mappages observés sans confondre cette observation avec une preuve de connectivité.",
    "brief": "<p>Deux serveurs STUN (RFC 8489) observent l'adresse et le port d'un même socket local. Comparez les deux couples observés : s'ils sont égaux, indiquez <code>MAPPAGES_IDENTIQUES</code>, sinon <code>MAPPAGES_DIFFERENTS</code>. Comparer ces deux observations ne permet pas de déterminer le filtrage ni de garantir qu'un pair sera joignable, même si les valeurs sont identiques à l'adresse locale.</p>\n<p>La suite est de procéder à des vérifications de connectivité ICE (RFC 8445), avec un relais TURN éventuel selon les résultats et la configuration. Cette grille n'établit ni le type exact de NAT ni le chemin choisi.</p>\n<p>Chaque ligne contient <code>CLIENT_LOCAL=&lt;adresse:port&gt; STUN1_MAPPED=&lt;adresse:port&gt; STUN2_MAPPED=&lt;adresse:port&gt;</code>. Recopiez les trois valeurs et indiquez l'observation selon ce format :</p>\n<p><code>LOCAL:&lt;local&gt; | MAPPED_S1:&lt;s1&gt; | MAPPED_S2:&lt;s2&gt; | OBSERVATION:&lt;MAPPAGES_IDENTIQUES ou MAPPAGES_DIFFERENTS&gt; | SUITE:VERIFIER_ICE</code></p>",
    "starter": "# Grille d'analyse (vo3-c5-e3) — Observer les mappages STUN avant les vérifications ICE\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cas de test 1]\n# Données : CLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45000\n# Données : CLIENT_LOCAL=10.0.0.2:16384 STUN1_MAPPED=82.65.1.20:45000 STUN2_MAPPED=82.65.1.20:45002\nA_COMPLETER\n\n[Cas 2 — Cas de test 2]\n# Données : CLIENT_LOCAL=195.154.10.2:5060 STUN1_MAPPED=195.154.10.2:5060 STUN2_MAPPED=195.154.10.2:5060\nA_COMPLETER\n",
    "hints": [
      "Comparez les deux couples adresse et port observés par les serveurs.",
      "Les observations seules ne démontrent pas que le trafic entre les pairs est autorisé."
    ],
    "examples": [
      {
        "stdin": "CLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10500\nCLIENT_LOCAL=192.168.1.15:5060 STUN1_MAPPED=198.51.100.42:10500 STUN2_MAPPED=198.51.100.42:10501\nCLIENT_LOCAL=203.0.113.10:5060 STUN1_MAPPED=203.0.113.10:5060 STUN2_MAPPED=203.0.113.10:5060",
        "expected": "LOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10500 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10501 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\nLOCAL:203.0.113.10:5060 | MAPPED_S1:203.0.113.10:5060 | MAPPED_S2:203.0.113.10:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\n",
        "note": "Cas d'usage nominal."
      }
    ],
    "tests": [
      {
        "label": "Cas de test 1",
        "stdin": "cas:1",
        "expected": "LOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45000 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45002 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\n"
      },
      {
        "label": "Cas de test 2",
        "stdin": "cas:2",
        "expected": "LOCAL:195.154.10.2:5060 | MAPPED_S1:195.154.10.2:5060 | MAPPED_S2:195.154.10.2:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\n"
      }
    ],
    "solution": "[Exemple]\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10500 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:192.168.1.15:5060 | MAPPED_S1:198.51.100.42:10500 | MAPPED_S2:198.51.100.42:10501 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\nLOCAL:203.0.113.10:5060 | MAPPED_S1:203.0.113.10:5060 | MAPPED_S2:203.0.113.10:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\n\n[Cas 1 — Cas de test 1]\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45000 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE\nLOCAL:10.0.0.2:16384 | MAPPED_S1:82.65.1.20:45000 | MAPPED_S2:82.65.1.20:45002 | OBSERVATION:MAPPAGES_DIFFERENTS | SUITE:VERIFIER_ICE\n\n[Cas 2 — Cas de test 2]\nLOCAL:195.154.10.2:5060 | MAPPED_S1:195.154.10.2:5060 | MAPPED_S2:195.154.10.2:5060 | OBSERVATION:MAPPAGES_IDENTIQUES | SUITE:VERIFIER_ICE"
  }
];
