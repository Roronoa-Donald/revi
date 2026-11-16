'use strict';

module.exports = [
  {
    "id": "cr3-c6-e1",
    "chapter": 6,
    "title": "Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser une suite et les paramètres TLS négociés sans déduire la PFS du seul nom TLS 1.3.",
    "brief": "<p>En TLS 1.3, la suite indique l’AEAD et la fonction de hachage HKDF ; elle ne détermine ni le mode d’échange, ni le groupe, ni la PFS. Le mode, le groupe et la phase doivent être connus séparément. Ce modèle traite les paramètres des cas sans vérifier une négociation réelle ni la sécurité globale. <code>dhe</code> désigne ici un échange éphémère sans PSK ; ce n’est pas un mode PSK TLS.<br><br>\nPour les suites TLS 1.3 du modèle, analyser <code>PARSE_SUITE suite=&lt;nom&gt; mode=&lt;mode&gt; group=&lt;groupe&gt; phase=&lt;phase&gt;</code>. Pour chaque paramètre absent, afficher <code>UNKNOWN</code> ; si des informations nécessaires manquent, afficher <code>pfs=UNKNOWN status=PARAMETERS_REQUIRED</code>.<br>\nEn <code>phase=1-rtt</code>, <code>mode=psk_ke group=none</code> donne <code>pfs=NO</code> dans ce modèle ; <code>mode=dhe</code> ou <code>mode=psk_dhe_ke</code> avec un groupe éphémère donne <code>pfs=CONDITIONAL</code>, sous réserve d’authentification et d’effacement des secrets éphémères. En <code>phase=0-rtt</code>, la PFS est <code>NOT_GUARANTEED</code>, quel que soit le mode ultérieur ; les données anticipées présentent un risque de rejeu. Lorsque ces paramètres sont indiqués, <code>status=PARAMETERS_ONLY</code> n’est pas une certification de sécurité.<br>\nPour les suites avec <code>_WITH_</code>, on suppose TLS 1.2 : leur nom ne prouve pas la version négociée. Extraire échange, chiffrement et hachage. Un échange ECDHE/DHE indique <code>pfs=CONDITIONAL status=PARAMETERS_ONLY</code> ; RSA statique indique <code>pfs=NO status=WEAK_NO_PFS</code>. RC4, DES, 3DES, NULL ou EXPORT conduit à <code>status=INSECURE</code>.<br><br>\nFormat TLS 1.3 : <code>SUITE: &lt;nom&gt; ver=TLS1.3 kex=&lt;mode&gt; group=&lt;groupe&gt; phase=&lt;phase&gt; enc=&lt;algorithme&gt; hash=&lt;hachage&gt; pfs=&lt;pfs&gt; status=&lt;statut&gt;</code>.<br>\nFormat TLS 1.2 : <code>SUITE: &lt;nom&gt; ver=TLS1.2 kex=&lt;échange&gt; enc=&lt;algorithme&gt; hash=&lt;hachage&gt; pfs=&lt;pfs&gt; status=&lt;statut&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c6-e1) — Analyseur de Suite Cryptographique TLS (Cipher Suite Parser)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Suite TLS 1.3 sans paramètres négociés]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384\nA_COMPLETER\n\n[Cas 2 — Suite TLS 1.2 sans confidentialité persistante]\n# Données : PARSE_SUITE suite=TLS_RSA_WITH_AES_256_CBC_SHA256\nA_COMPLETER\n\n[Cas 3 — Suite TLS avec chiffrement déprécié]\n# Données : PARSE_SUITE suite=TLS_RSA_WITH_RC4_128_SHA\nA_COMPLETER\n\n[Cas 4 — TLS 1.3 avec PSK seul en 1-RTT]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=psk_ke group=none phase=1-rtt\nA_COMPLETER\n\n[Cas 5 — TLS 1.3 avec PSK et échange éphémère en 1-RTT]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=psk_dhe_ke group=x25519 phase=1-rtt\nA_COMPLETER\n\n[Cas 6 — Même suite et échange, données anticipées 0-RTT]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=psk_dhe_ke group=x25519 phase=0-rtt\nA_COMPLETER\n\n[Cas 7 — Handshake initial TLS 1.3 avec échange éphémère]\n# Données : PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 mode=dhe group=x25519 phase=1-rtt\nA_COMPLETER\n",
    "hints": [
      "Le nom TLS 1.3 indique l’AEAD et le hachage, mais ne révèle pas le mode d’échange ni le groupe.",
      "Distinguez les données 0-RTT, le mode PSK seul et le mode PSK avec échange éphémère en 1-RTT ; ne concluez pas à une sécurité globale.",
      "Extrayez échange de clés, authentification, chiffrement symétrique et condensat depuis le nom de la suite ; ne concluez à la PFS qu en présence explicite d ECDHE/DHE."
    ],
    "examples": [
      {
        "stdin": "PARSE_SUITE suite=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
        "expected": "SUITE: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 ver=TLS1.2 kex=ECDHE_RSA enc=AES_128_GCM hash=SHA256 pfs=CONDITIONAL status=PARAMETERS_ONLY",
        "note": "L’échange ECDHE permet la PFS sous hypothèses ; la configuration complète n’est pas auditée."
      }
    ],
    "tests": [
      {
        "label": "Suite TLS 1.3 sans paramètres négociés",
        "stdin": "cas:1",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=UNKNOWN group=UNKNOWN phase=UNKNOWN enc=AES_256_GCM hash=SHA384 pfs=UNKNOWN status=PARAMETERS_REQUIRED"
      },
      {
        "label": "Suite TLS 1.2 sans confidentialité persistante",
        "stdin": "cas:2",
        "expected": "SUITE: TLS_RSA_WITH_AES_256_CBC_SHA256 ver=TLS1.2 kex=RSA enc=AES_256_CBC hash=SHA256 pfs=NO status=WEAK_NO_PFS"
      },
      {
        "label": "Suite TLS avec chiffrement déprécié",
        "stdin": "cas:3",
        "expected": "SUITE: TLS_RSA_WITH_RC4_128_SHA ver=TLS1.2 kex=RSA enc=RC4_128 hash=SHA pfs=NO status=INSECURE"
      },
      {
        "label": "TLS 1.3 avec PSK seul en 1-RTT",
        "stdin": "cas:4",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_ke group=none phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=NO status=PARAMETERS_ONLY"
      },
      {
        "label": "TLS 1.3 avec PSK et échange éphémère en 1-RTT",
        "stdin": "cas:5",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY"
      },
      {
        "label": "Même suite et échange, données anticipées 0-RTT",
        "stdin": "cas:6",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=0-rtt enc=AES_256_GCM hash=SHA384 pfs=NOT_GUARANTEED status=PARAMETERS_ONLY"
      },
      {
        "label": "Handshake initial TLS 1.3 avec échange éphémère",
        "stdin": "cas:7",
        "expected": "SUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=dhe group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY"
      }
    ],
    "solution": "[Exemple]\nSUITE: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 ver=TLS1.2 kex=ECDHE_RSA enc=AES_128_GCM hash=SHA256 pfs=CONDITIONAL status=PARAMETERS_ONLY\n\n[Cas 1 — Suite TLS 1.3 sans paramètres négociés]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=UNKNOWN group=UNKNOWN phase=UNKNOWN enc=AES_256_GCM hash=SHA384 pfs=UNKNOWN status=PARAMETERS_REQUIRED\n\n[Cas 2 — Suite TLS 1.2 sans confidentialité persistante]\nSUITE: TLS_RSA_WITH_AES_256_CBC_SHA256 ver=TLS1.2 kex=RSA enc=AES_256_CBC hash=SHA256 pfs=NO status=WEAK_NO_PFS\n\n[Cas 3 — Suite TLS avec chiffrement déprécié]\nSUITE: TLS_RSA_WITH_RC4_128_SHA ver=TLS1.2 kex=RSA enc=RC4_128 hash=SHA pfs=NO status=INSECURE\n\n[Cas 4 — TLS 1.3 avec PSK seul en 1-RTT]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_ke group=none phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=NO status=PARAMETERS_ONLY\n\n[Cas 5 — TLS 1.3 avec PSK et échange éphémère en 1-RTT]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY\n\n[Cas 6 — Même suite et échange, données anticipées 0-RTT]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=psk_dhe_ke group=x25519 phase=0-rtt enc=AES_256_GCM hash=SHA384 pfs=NOT_GUARANTEED status=PARAMETERS_ONLY\n\n[Cas 7 — Handshake initial TLS 1.3 avec échange éphémère]\nSUITE: TLS_AES_256_GCM_SHA384 ver=TLS1.3 kex=dhe group=x25519 phase=1-rtt enc=AES_256_GCM hash=SHA384 pfs=CONDITIONAL status=PARAMETERS_ONLY",
    "takeaway": "À retenir : Analyser une suite et les paramètres TLS négociés sans déduire la PFS du seul nom TLS 1.3.\nRepère : L’échange ECDHE permet la PFS sous hypothèses ; la configuration complète n’est pas auditée."
  },
  {
    "id": "cr3-c6-e2",
    "chapter": 6,
    "title": "Analyse illustrative des phases TLS 1.3 et de la confidentialité persistante (PFS)",
    "level": "n2",
    "language": "analyse",
    "goal": "Comparer les phases TLS 1.3 et calculer un identifiant public purement illustratif, sans dériver de secret TLS.",
    "brief": "<p>TLS 1.3 (RFC 9846 ; RFC 8446 historique) peut transmettre des données 0-RTT avant la fin de la poignée de mains : leur confidentialité persistante n’est pas garantie par le protocole et elles peuvent être rejouées. En 1-RTT, un échange éphémère authentifié peut fournir la PFS si les secrets éphémères sont effacés ; le mode PSK seul ne la fournit pas par son échange. Le serveur peut refuser les données anticipées.<br><br>\nCe modèle ne simule pas le protocole réel, ni la validation des pairs. Les cas 0-RTT supposent un PSK ; <code>dhe</code> désigne ici un échange éphémère sans PSK, pas un mode PSK TLS. TLS dérive ses secrets avec HKDF à partir notamment du PSK et/ou d’un secret d’échange, selon la phase et le transcript. On calcule ici seulement <code>demo_id = sha256(client_share:server_share:group)[:16]</code> sur la chaîne encodée en UTF-8, puis en conservant les 16 premiers caractères hexadécimaux. Il n’est pas un secret, une clé ou une dérivation TLS ; les valeurs sont publiques et synthétiques. En 0-RTT, les parts éventuelles sont données après coup pour cet identifiant, pas pour dériver les données anticipées.<br><br>\nRègles du modèle :<br>\n- Pour un handshake initial TLSv1.2, <code>mode=dhe</code> donne <code>pfs=CONDITIONAL</code> sous les hypothèses ci-dessus ; <code>mode=rsa</code> (RSA statique) donne <code>pfs=NO</code>, sinon <code>pfs=UNKNOWN</code>. Format : <code>TLS1.2: rtt=2-RTT pfs=&lt;pfs&gt; status=MODEL_ONLY</code>.<br>\n- Pour une autre version que TLSv1.2 ou TLSv1.3 : <code>STATUS=REJECTED (TLS version unsupported: &lt;v&gt;)</code>.<br>\n- Pour TLSv1.3 en mode <code>dhe</code> ou <code>psk_dhe_ke</code>, accepter seulement <code>x25519</code>, <code>secp256r1</code>, <code>secp384r1</code> ; sinon <code>STATUS=REJECTED (unsupported elliptic group: &lt;grp&gt;)</code>. En mode <code>psk_ke</code>, il n’y a ni groupe ni parts : utiliser <code>none</code>.<br>\n- En <code>phase=0-rtt</code>, afficher <code>pfs=NOT_GUARANTEED</code>. En <code>phase=1-rtt</code>, afficher <code>pfs=NO</code> pour <code>psk_ke</code>, sinon <code>pfs=CONDITIONAL</code> sous les hypothèses ci-dessus.<br>\nFormat : <code>TLS1.3: phase=&lt;phase&gt; mode=&lt;mode&gt; group=&lt;grp&gt; pfs=&lt;pfs&gt; demo_id=&lt;id&gt; status=MODEL_ONLY</code>.</p>",
    "starter": "# Grille d'analyse (cr3-c6-e2) — Analyse illustrative des phases TLS 1.3 et de la confidentialité persistante (PFS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Données anticipées 0-RTT avec PSK et échange ultérieur]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=psk_dhe_ke phase=0-rtt\nA_COMPLETER\n\n[Cas 2 — Handshake initial TLS 1.2 avec RSA statique]\n# Données : TLS_HANDSHAKE client_version=TLSv1.2 server_version=TLSv1.2 group=none client_share=none server_share=none mode=rsa phase=1-rtt\nA_COMPLETER\n\n[Cas 3 — Rejet version obsolète TLS 1.0]\n# Données : TLS_HANDSHAKE client_version=TLSv1.0 server_version=TLSv1.0 group=none client_share=none server_share=none mode=none phase=1-rtt\nA_COMPLETER\n\n[Cas 4 — Données 1-RTT avec PSK et échange éphémère]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=psk_dhe_ke phase=1-rtt\nA_COMPLETER\n\n[Cas 5 — Données 1-RTT avec PSK seul]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=none client_share=none server_share=none mode=psk_ke phase=1-rtt\nA_COMPLETER\n\n[Cas 6 — Données anticipées 0-RTT avec PSK seul]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=none client_share=none server_share=none mode=psk_ke phase=0-rtt\nA_COMPLETER\n\n[Cas 7 — Groupe non pris en charge par le modèle]\n# Données : TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=legacy1024 client_share=A1B2 server_share=C3D4 mode=dhe phase=1-rtt\nA_COMPLETER\n",
    "hints": [
      "Distinguez la phase des données du mode d’échange négocié ; 0-RTT ne termine pas le handshake et ne garantit pas la PFS.",
      "Pour l’identifiant public uniquement, concaténez client_share, server_share et group avec « : », puis prenez les 16 premiers caractères hexadécimaux de SHA-256.",
      "Vérifiez la combinaison version/mode/groupe (TLS 1.3 n impose PFS que si PSK-only n est pas utilisé seul) et respectez le format exact de la ligne illustrative."
    ],
    "examples": [
      {
        "stdin": "TLS_HANDSHAKE client_version=TLSv1.3 server_version=TLSv1.3 group=x25519 client_share=A1B2 server_share=C3D4 mode=dhe phase=1-rtt",
        "expected": "TLS1.3: phase=1-rtt mode=dhe group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY",
        "note": "Échange éphémère illustratif ; le hachage public n’est pas un secret TLS."
      }
    ],
    "tests": [
      {
        "label": "Données anticipées 0-RTT avec PSK et échange ultérieur",
        "stdin": "cas:1",
        "expected": "TLS1.3: phase=0-rtt mode=psk_dhe_ke group=x25519 pfs=NOT_GUARANTEED demo_id=f91a13a53fa8daae status=MODEL_ONLY"
      },
      {
        "label": "Handshake initial TLS 1.2 avec RSA statique",
        "stdin": "cas:2",
        "expected": "TLS1.2: rtt=2-RTT pfs=NO status=MODEL_ONLY"
      },
      {
        "label": "Rejet version obsolète TLS 1.0",
        "stdin": "cas:3",
        "expected": "STATUS=REJECTED (TLS version unsupported: TLSv1.0)"
      },
      {
        "label": "Données 1-RTT avec PSK et échange éphémère",
        "stdin": "cas:4",
        "expected": "TLS1.3: phase=1-rtt mode=psk_dhe_ke group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY"
      },
      {
        "label": "Données 1-RTT avec PSK seul",
        "stdin": "cas:5",
        "expected": "TLS1.3: phase=1-rtt mode=psk_ke group=none pfs=NO demo_id=882e45d0b744de68 status=MODEL_ONLY"
      },
      {
        "label": "Données anticipées 0-RTT avec PSK seul",
        "stdin": "cas:6",
        "expected": "TLS1.3: phase=0-rtt mode=psk_ke group=none pfs=NOT_GUARANTEED demo_id=882e45d0b744de68 status=MODEL_ONLY"
      },
      {
        "label": "Groupe non pris en charge par le modèle",
        "stdin": "cas:7",
        "expected": "STATUS=REJECTED (unsupported elliptic group: legacy1024)"
      }
    ],
    "solution": "[Exemple]\nTLS1.3: phase=1-rtt mode=dhe group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY\n\n[Cas 1 — Données anticipées 0-RTT avec PSK et échange ultérieur]\nTLS1.3: phase=0-rtt mode=psk_dhe_ke group=x25519 pfs=NOT_GUARANTEED demo_id=f91a13a53fa8daae status=MODEL_ONLY\n\n[Cas 2 — Handshake initial TLS 1.2 avec RSA statique]\nTLS1.2: rtt=2-RTT pfs=NO status=MODEL_ONLY\n\n[Cas 3 — Rejet version obsolète TLS 1.0]\nSTATUS=REJECTED (TLS version unsupported: TLSv1.0)\n\n[Cas 4 — Données 1-RTT avec PSK et échange éphémère]\nTLS1.3: phase=1-rtt mode=psk_dhe_ke group=x25519 pfs=CONDITIONAL demo_id=f91a13a53fa8daae status=MODEL_ONLY\n\n[Cas 5 — Données 1-RTT avec PSK seul]\nTLS1.3: phase=1-rtt mode=psk_ke group=none pfs=NO demo_id=882e45d0b744de68 status=MODEL_ONLY\n\n[Cas 6 — Données anticipées 0-RTT avec PSK seul]\nTLS1.3: phase=0-rtt mode=psk_ke group=none pfs=NOT_GUARANTEED demo_id=882e45d0b744de68 status=MODEL_ONLY\n\n[Cas 7 — Groupe non pris en charge par le modèle]\nSTATUS=REJECTED (unsupported elliptic group: legacy1024)",
    "takeaway": "À retenir : Comparer les phases TLS 1.3 et calculer un identifiant public purement illustratif, sans dériver de secret TLS.\nRepère : Échange éphémère illustratif ; le hachage public n’est pas un secret TLS."
  },
  {
    "id": "cr3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Préparer la migration post-quantique du groupe Meridor",
    "exampleTitle": "Exemple résolu — le plan post-quantique du ministère",
    "goal": "Évaluer l'impact des algorithmes quantiques de Shor et de Grover et proposer des mesures de migration post-quantique.",
    "brief": "<p><strong>Énoncé.</strong> Le RSSI du groupe industriel Meridor prépare la migration cryptographique post-quantique. Le comité de sécurité rappelle deux faits : l'algorithme de <strong>Shor</strong> factorise les entiers et résout les logarithmes discrets, mettant RSA, DH et ECC à terre dès qu'un ordinateur quantique suffisant existera ; l'algorithme de <strong>Grover</strong> accélère la recherche exhaustive d'un facteur racine carrée, affaiblissant le symétrique de moitié en bits de sécurité. Le groupe chiffre aujourd'hui ses liaisons en RSA-2048 et ses archives en AES-128.</p><ol><li>Quel algorithme quantique menace directement RSA-2048 et ECC ?</li><li>Quel algorithme quantique réduit la sécurité des clés symétriques ?</li><li>Sous Grover, la sécurité effective d'AES-128 tombe à environ combien de bits ?</li><li>Quelle famille d'algorithmes, standardisée par le NIST en 2024 pour remplacer les échanges de clés RSA et ECC, porte un nom en ML- (un nom suffit) ?</li><li>Quel risque, résumé par la formule « harvest now, decrypt later », impose de migrer avant l'arrivée de l'ordinateur quantique ?</li><li>Quelle mesure simple, côté symétrique, conserve une marge post-quantique confortable pour les archives ?</li></ol>",
    "starter": "# Exercice — Préparer la migration post-quantique du groupe Meridor\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nom ou le nombre. Questions 4 à 6 : quelques mots.\n\n[Question 1 — Algorithme quantique menaçant RSA et ECC]\nA_COMPLETER\n\n[Question 2 — Algorithme quantique affaiblissant le symétrique]\nA_COMPLETER\n\n[Question 3 — Sécurité effective d'AES-128 sous Grover]\nA_COMPLETER\n\n[Question 4 — Famille post-quantique standardisée par le NIST en 2024]\nA_COMPLETER\n\n[Question 5 — Risque résumé par harvest now, decrypt later]\nA_COMPLETER\n\n[Question 6 — Mesure symétrique simple pour la marge post-quantique]\nA_COMPLETER\n",
    "hints": [
      "Shor s'attaque aux problèmes structurels (factorisation, logarithme discret) ; Grover accélère la recherche exhaustive d'un facteur racine carrée.",
      "Un standard du NIST publié en 2024 pour l'échange de clés, issu de la soumission Kyber, porte un nom commençant par ML-.",
      "1. La factorisation est le talon d'Achille de RSA. 2. La recherche exhaustive concerne les clés symétriques. 3. 128 / 2. 4. Le standard s'appelle ML-KEM. 5. Des captures réseau sont stockées en attendant le calculateur capable de les ouvrir. 6. Doubler la taille de clé annule l'effet de Grover."
    ],
    "examples": [
      {
        "stdin": "Un ministère dresse le même plan : liaisons en RSA-3072, archives en AES-192, condensés en SHA-256.\n1) RSA-3072 tombe sous l'algorithme de Shor.\n2) Le symétrique est affaibli par l'algorithme de Grover.\n3) AES-192 sous Grover : environ 96 bits de sécurité.\n4) Le NIST a standardisé ML-KEM (issu de Kyber) pour les échanges de clés.\n5) « Harvest now, decrypt later » : les captures d'aujourd'hui seront ouvertes demain.\n6) Mesure symétrique : passer à AES-256 (doubler la marge).",
        "expected": "Shor — Grover — 96 bits — ML-KEM — les captures stockées seront déchiffrées plus tard — AES-256",
        "note": "Grover enlève la moitié des bits de sécurité : doubler les clés symétriques suffit à le neutraliser, contrairement à Shor qui impose de changer de famille."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Algorithme quantique menaçant RSA et ECC",
        "stdin": "q:1",
        "expected": "Shor||l'algorithme de Shor||shor"
      },
      {
        "label": "Question 2 — Algorithme quantique affaiblissant le symétrique",
        "stdin": "q:2",
        "expected": "Grover||l'algorithme de Grover||grover"
      },
      {
        "label": "Question 3 — Sécurité effective d'AES-128 sous Grover",
        "stdin": "q:3",
        "expected": "64||64 bits"
      },
      {
        "label": "Question 4 — Famille post-quantique standardisée par le NIST en 2024",
        "stdin": "q:4",
        "expected": "ML-KEM||ml-kem||Kyber||kyber||ML-KEM (Kyber)"
      },
      {
        "label": "Question 5 — Risque résumé par harvest now, decrypt later",
        "stdin": "q:5",
        "expected": "les captures actuelles seront déchiffrées plus tard||des adversaires enregistrent les communications chiffrées aujourd'hui pour les déchiffrer plus tard||l'enregistrement des communications chiffrées pour déchiffrement futur||harvest now decrypt later||récolter maintenant, déchiffrer plus tard"
      },
      {
        "label": "Question 6 — Mesure symétrique simple pour la marge post-quantique",
        "stdin": "q:6",
        "expected": "passer à AES-256||AES-256||aes-256||doubler la taille de clé||utiliser AES-256"
      }
    ],
    "solution": "[Question 1 — Algorithme quantique menaçant RSA et ECC]\nShor\n\n[Question 2 — Algorithme quantique affaiblissant le symétrique]\nGrover\n\n[Question 3 — Sécurité effective d'AES-128 sous Grover]\n64\n\n[Question 4 — Famille post-quantique standardisée par le NIST en 2024]\nML-KEM\n\n[Question 5 — Risque résumé par harvest now, decrypt later]\nles captures actuelles seront déchiffrées plus tard\n\n[Question 6 — Mesure symétrique simple pour la marge post-quantique]\npasser à AES-256",
    "takeaway": "1) L'algorithme de Shor, qui factorise les entiers et résout les logarithmes discrets.\n2) L'algorithme de Grover, qui accélère la recherche exhaustive d'un facteur racine carrée.\n3) 128 / 2 = 64 bits de sécurité effective.\n4) ML-KEM (Module-Lattice Key Encapsulation Mechanism, issu de Kyber), standardisé par le NIST en 2024 pour l'échange de clés.\n5) Des adversaires enregistrent aujourd'hui les communications chiffrées pour les déchiffrer dès qu'un ordinateur quantique suffisant existera : les données à longue durée de vie sont déjà exposées.\n6) Passer à AES-256 : doubler la taille de clé restaure la marge face à Grover.\nContrôle : Shor impose de changer de famille (RSA vers ML-KEM) ; Grover se neutralise en doublant les clés (AES-128 vers AES-256)."
  }
];
