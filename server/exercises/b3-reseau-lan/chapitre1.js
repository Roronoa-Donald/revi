'use strict';

module.exports = [
  {
    "id": "lan3-c1-e1",
    "chapter": 1,
    "title": "Calculateur de priorité et élection du Root Bridge STP (Bridge ID)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler l'élection du commutateur racine (Root Bridge) dans une instance Spanning Tree 802.1D / PVST+.",
    "brief": "<p>Dans les architectures de commutation Ethernet, le protocole <strong>Spanning Tree (STP)</strong> élimine les boucles de couche 2 en élisant un commutateur racine unique (<strong>Root Bridge</strong>) par domaine de diffusion / VLAN.<br><br>\nChaque commutateur est identifié par son <strong>Bridge ID (BID)</strong> composé de :<br>\n- <strong>Bridge Priority :</strong> valeur de base multiple de 4096 (ex: 32768, 4096, 0).<br>\n- <strong>System ID Extension :</strong> le numéro de VLAN (ex: VLAN 10).<br>\n- <strong>Adresse MAC :</strong> valeur utilisée dans le Bridge ID ; dans cette simulation, les identifiants sont distincts dans le domaine STP.<br>\nLa priorité totale est <code>total_priority = priority + vlan</code>.<br><br>\nRègles d'élection du Root Bridge :<br>\n1. Le commutateur ayant la plus petite <code>total_priority</code> est élu Root Bridge.<br>\n2. En cas d'égalité sur la priorité totale, le commutateur ayant la plus petite adresse MAC (ordre lexicographique de l'adresse en minuscules normalisée) l'emporte.<br><br>\nl’étude de cas comporte dans l’énoncé du cas des déclarations de commutateurs pour un VLAN donné :<br>\n<code>BRIDGE name=&lt;nom&gt; vlan=&lt;int&gt; priority=&lt;int&gt; mac=&lt;mac_format_libre&gt;</code><br><br>\nPour chaque commutateur (triés par nom alphabétique), afficher :<br>\n<code>STP_BRIDGE name={name} vlan={vlan} total_prio={total_priority} mac={mac_norm} role={ROOT|NON_ROOT}</code><br>\nPuis sur une ligne finale :<br>\n<code>ROOT_WINNER name={root_name} total_prio={root_prio} mac={root_mac}</code></p>",
    "starter": "# Grille d'analyse (lan3-c1-e1) — Calculateur de priorité et élection du Root Bridge STP (Bridge ID)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Départage sur adresse MAC en cas d'égalité parfaite de priorité]\n# Données : BRIDGE name=SW-A vlan=1 priority=32768 mac=00:50:56:00:00:02\n# Données : BRIDGE name=SW-B vlan=1 priority=32768 mac=00:50:56:00:00:01\nA_COMPLETER\n\n[Cas 2 — Priorité racine explicite configurée à 0]\n# Données : BRIDGE name=CORE_PRIMARY vlan=100 priority=0 mac=02:00:00:aa:bb:cc\n# Données : BRIDGE name=CORE_SECONDARY vlan=100 priority=4096 mac=02:00:00:11:22:33\nA_COMPLETER\n\n[Cas 3 — Formats de MAC avec tirets ou points normalisés]\n# Données : BRIDGE name=SW1 vlan=20 priority=32768 mac=00-1B-44-11-3A-B7\n# Données : BRIDGE name=SW2 vlan=20 priority=32768 mac=001b.4411.3ab6\nA_COMPLETER\n",
    "hints": [
      "Normaliser la MAC en minuscules avec des deux-points (ex: 00:1a:2b:3c:4d:5e) ou format comparable.",
      "Calculer total_prio = priority + vlan.",
      "Comparer le tuple (total_prio, mac_norm)."
    ],
    "examples": [
      {
        "stdin": "BRIDGE name=SW-CORE1 vlan=10 priority=32768 mac=00:11:22:33:44:55\nBRIDGE name=SW-CORE2 vlan=10 priority=4096 mac=00:aa:bb:cc:dd:ee\nBRIDGE name=SW-ACCESS1 vlan=10 priority=32768 mac=00:11:22:11:22:33",
        "expected": "STP_BRIDGE name=SW-ACCESS1 vlan=10 total_prio=32778 mac=00:11:22:11:22:33 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE1 vlan=10 total_prio=32778 mac=00:11:22:33:44:55 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE2 vlan=10 total_prio=4106 mac=00:aa:bb:cc:dd:ee role=ROOT\nROOT_WINNER name=SW-CORE2 total_prio=4106 mac=00:aa:bb:cc:dd:ee",
        "note": "SW-CORE2 a la plus faible priorité (4096 + 10 = 4106) et devient Root Bridge."
      }
    ],
    "tests": [
      {
        "label": "Départage sur adresse MAC en cas d'égalité parfaite de priorité",
        "stdin": "cas:1",
        "expected": "STP_BRIDGE name=SW-A vlan=1 total_prio=32769 mac=00:50:56:00:00:02 role=NON_ROOT\nSTP_BRIDGE name=SW-B vlan=1 total_prio=32769 mac=00:50:56:00:00:01 role=ROOT\nROOT_WINNER name=SW-B total_prio=32769 mac=00:50:56:00:00:01"
      },
      {
        "label": "Priorité racine explicite configurée à 0",
        "stdin": "cas:2",
        "expected": "STP_BRIDGE name=CORE_PRIMARY vlan=100 total_prio=100 mac=02:00:00:aa:bb:cc role=ROOT\nSTP_BRIDGE name=CORE_SECONDARY vlan=100 total_prio=4196 mac=02:00:00:11:22:33 role=NON_ROOT\nROOT_WINNER name=CORE_PRIMARY total_prio=100 mac=02:00:00:aa:bb:cc"
      },
      {
        "label": "Formats de MAC avec tirets ou points normalisés",
        "stdin": "cas:3",
        "expected": "STP_BRIDGE name=SW1 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b7 role=NON_ROOT\nSTP_BRIDGE name=SW2 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b6 role=ROOT\nROOT_WINNER name=SW2 total_prio=32788 mac=00:1b:44:11:3a:b6"
      }
    ],
    "solution": "[Exemple]\nSTP_BRIDGE name=SW-ACCESS1 vlan=10 total_prio=32778 mac=00:11:22:11:22:33 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE1 vlan=10 total_prio=32778 mac=00:11:22:33:44:55 role=NON_ROOT\nSTP_BRIDGE name=SW-CORE2 vlan=10 total_prio=4106 mac=00:aa:bb:cc:dd:ee role=ROOT\nROOT_WINNER name=SW-CORE2 total_prio=4106 mac=00:aa:bb:cc:dd:ee\n\n[Cas 1 — Départage sur adresse MAC en cas d'égalité parfaite de priorité]\nSTP_BRIDGE name=SW-A vlan=1 total_prio=32769 mac=00:50:56:00:00:02 role=NON_ROOT\nSTP_BRIDGE name=SW-B vlan=1 total_prio=32769 mac=00:50:56:00:00:01 role=ROOT\nROOT_WINNER name=SW-B total_prio=32769 mac=00:50:56:00:00:01\n\n[Cas 2 — Priorité racine explicite configurée à 0]\nSTP_BRIDGE name=CORE_PRIMARY vlan=100 total_prio=100 mac=02:00:00:aa:bb:cc role=ROOT\nSTP_BRIDGE name=CORE_SECONDARY vlan=100 total_prio=4196 mac=02:00:00:11:22:33 role=NON_ROOT\nROOT_WINNER name=CORE_PRIMARY total_prio=100 mac=02:00:00:aa:bb:cc\n\n[Cas 3 — Formats de MAC avec tirets ou points normalisés]\nSTP_BRIDGE name=SW1 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b7 role=NON_ROOT\nSTP_BRIDGE name=SW2 vlan=20 total_prio=32788 mac=00:1b:44:11:3a:b6 role=ROOT\nROOT_WINNER name=SW2 total_prio=32788 mac=00:1b:44:11:3a:b6",
    "takeaway": "À retenir : Simuler l'élection du commutateur racine (Root Bridge) dans une instance Spanning Tree 802.1D / PVST+.\nRepère : SW-CORE2 a la plus faible priorité (4096 + 10 = 4106) et devient Root Bridge."
  },
  {
    "id": "lan3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le choix du port racine de l'immeuble Ravel",
    "exampleTitle": "Exemple résolu — le port racine du site logistique de Norbay",
    "goal": "Élire le Root Port d'un commutateur d'accès en appliquant l'ordre de départage STP : coût de chemin, puis priorité du BID émetteur, puis Port ID émetteur.",
    "brief": "<p><strong>Énoncé.</strong> L'immeuble Ravel, siège du cabinet d'expertise comptable Aldan &amp; Fils, est desservi par le commutateur d'étage SW-R3. Celui-ci dispose de trois liaisons montantes vers la couche de distribution. Après convergence du Spanning Tree (802.1D) sur le VLAN 30, l'état des ports est le suivant :</p><table><tr><th>Port local</th><th>Coût de chemin vers la racine</th><th>Priorité du BID émetteur</th><th>Port ID émetteur</th></tr><tr><th>Gi0/1</th><td>8</td><td>24576</td><td>128.2</td></tr><tr><th>Gi0/2</th><td>8</td><td>24576</td><td>128.1</td></tr><tr><th>Gi0/3</th><td>19</td><td>24576</td><td>128.5</td></tr></table><p>Rappel du cours : le Root Port est le port offrant le meilleur chemin vers la racine. L'ordre de départage est : 1) le coût de chemin le plus faible ; 2) la priorité du BID du commutateur émetteur la plus faible ; 3) le Port ID de l'émetteur le plus faible ; 4) le nom de port local le plus petit. Les ports montants non élus passent en blocage (rôle alterné en RSTP).</p><p>Répondez par le nombre seul (questions 1 et 4) ou par de courts libellés.</p><ol><li>Quel est le coût de chemin le plus faible constaté sur SW-R3 ?</li><li>Gi0/1 et Gi0/2 ont le même coût et des émetteurs de même priorité : quel critère les départage ?</li><li>Quel port est élu Root Port sur SW-R3 ?</li><li>Quel est le coût du chemin vers la racine emprunté par le port élu ?</li><li>Dans la topologie convergée, quel état occupent les ports Gi0/1 et Gi0/3 ?</li></ol>",
    "starter": "# Exercice — Le choix du port racine de l'immeuble Ravel\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 4 : le nombre seul. Questions 2, 3 et 5 : un court libellé.\n\n[Question 1 — Coût de chemin le plus faible]\nA_COMPLETER\n\n[Question 2 — Critère de départage entre Gi0/1 et Gi0/2]\nA_COMPLETER\n\n[Question 3 — Root Port de SW-R3]\nA_COMPLETER\n\n[Question 4 — Coût du chemin retenu]\nA_COMPLETER\n\n[Question 5 — État final des ports Gi0/1 et Gi0/3]\nA_COMPLETER\n",
    "hints": [
      "Comparez d'abord les coûts : un port de coût 19 ne peut jamais battre un port de coût 8, quel que soit le reste de sa configuration.",
      "À coût égal, examinez la priorité du BID émetteur ; si elle est aussi identique, seul le Port ID de l'émetteur peut séparer les deux ports.",
      "1. Deux ports affichent le coût minimal. 2. Leurs émetteurs ont la même priorité : comparez les Port ID (128.1 contre 128.2). 3. Le port montant non élu ne transmet pas : il bloque."
    ],
    "examples": [
      {
        "stdin": "Le site logistique de Norbay exploite le commutateur SW-LOG sur le VLAN 20.\nTe1/1 : coût de chemin 4, priorité du BID émetteur 32788, Port ID émetteur 128.1.\nTe1/2 : coût de chemin 4, priorité du BID émetteur 24696, Port ID émetteur 128.2.\nGi1/0/5 : coût de chemin 19, priorité du BID émetteur 24696, Port ID émetteur 128.7.\n\n1) Coût minimal : 4 (Te1/1 et Te1/2 à égalité).\n2) Départage sur la priorité du BID émetteur : 24696 < 32788, donc Te1/2 l'emporte.\n3) Te1/2 est élu Root Port ; coût du chemin retenu : 4.\n4) Te1/1 et Gi1/0/5 restent en blocage (alternés).",
        "expected": "coût minimal : 4 — départage par le BID émetteur — Root Port : Te1/2 — coût retenu : 4 — Te1/1 et Gi1/0/5 bloqués",
        "note": "L'ordre de départage est strict : le coût d'abord, puis le BID émetteur, puis le Port ID ; on ne passe au critère suivant qu'en cas d'égalité parfaite."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Coût de chemin le plus faible",
        "stdin": "q:1",
        "expected": "8"
      },
      {
        "label": "Question 2 — Critère de départage entre Gi0/1 et Gi0/2",
        "stdin": "q:2",
        "expected": "le Port ID de l'émetteur||le port ID de l'émetteur||le Port ID émetteur||le Port ID||Port ID de l'émetteur||le port ID le plus faible"
      },
      {
        "label": "Question 3 — Root Port de SW-R3",
        "stdin": "q:3",
        "expected": "Gi0/2||gi0/2||Gi 0/2||le port Gi0/2"
      },
      {
        "label": "Question 4 — Coût du chemin retenu",
        "stdin": "q:4",
        "expected": "8"
      },
      {
        "label": "Question 5 — État final des ports Gi0/1 et Gi0/3",
        "stdin": "q:5",
        "expected": "bloqués||bloques||en blocage||blocage||alternés||alternes||alternate||alternatifs"
      }
    ],
    "solution": "[Question 1 — Coût de chemin le plus faible]\n8\n\n[Question 2 — Critère de départage entre Gi0/1 et Gi0/2]\nle Port ID de l'émetteur\n\n[Question 3 — Root Port de SW-R3]\nGi0/2\n\n[Question 4 — Coût du chemin retenu]\n8\n\n[Question 5 — État final des ports Gi0/1 et Gi0/3]\nbloqués",
    "takeaway": "1) Les coûts de chemin annoncés sont 8, 8 et 19 : le plus faible est 8.\n2) Gi0/1 et Gi0/2 affichent le même coût (8) et des émetteurs de même priorité (24576) : le départage se fait sur le Port ID de l'émetteur, le plus faible l'emportant.\n3) 128.1 (Gi0/2) bat 128.2 (Gi0/1) : Gi0/2 est élu Root Port.\n4) Le chemin vers la racine emprunté par Gi0/2 coûte 8.\n5) Les ports Gi0/1 et Gi0/3, non élus, passent en blocage (rôle alterné en RSTP).\nContrôle : un commutateur non racine ne possède qu'un seul Root Port ; les trois liaisons montantes ne peuvent pas transmettre simultanément sans créer une boucle."
  },
  {
    "id": "lan3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "L'audit de protection STP de la banque Cévale",
    "exampleTitle": "Exemple résolu — les incidents STP de l'usine de Sorans",
    "goal": "Diagnostiquer les incidents des protections STP (BPDU Guard, Root Guard, Loop Guard) et connaître leurs conditions de rétablissement.",
    "brief": "<p><strong>Énoncé.</strong> La banque régionale Cévale vient de subir trois incidents sur son commutateur d'étage SW-ACC1. Le consultant de la société Infranet relève, pour chaque port, l'exigence de sécurité à respecter et l'incident constaté :</p><table><tr><th>Port</th><th>Exigence de sécurité</th><th>Incident constaté</th></tr><tr><th>Fa0/12 (prise de salle de réunion, PortFast actif)</th><td>La réception d'une BPDU sur une prise utilisateur doit couper immédiatement le port</td><td>Un visiteur a branché un mini-commutateur personnel : une BPDU est reçue</td></tr><tr><th>Gi0/1 (lien vers le commutateur d'un prestataire)</th><td>Le prestataire ne doit jamais devenir racine sur ce segment</td><td>Le prestataire passe la priorité de base de son commutateur à 0 : des BPDUs supérieures arrivent</td></tr><tr><th>Gi0/2 (lien montant fibre, port racine)</th><td>Si les BPDUs n'arrivent plus sans transition normale, le port doit se bloquer pour éviter une boucle</td><td>Une fibre endommagée ne laisse passer les trames que dans un seul sens : plus aucune BPDU reçue</td></tr></table><p>Rappel du cours : BPDU Guard désactive (err-disabled) tout port PortFast qui reçoit une BPDU ; Root Guard place un port en état « root inconsistent » tant que des BPDUs supérieures y arrivent, puis le rétablit automatiquement dès qu'elles cessent ; Loop Guard place un port racine ou alterné en état « loop inconsistent » quand les BPDUs disparaissent, pour empêcher une boucle unidirectionnelle.</p><p>Répondez par les noms exacts des mécanismes ou des états ; la question 5 appelle « oui » ou « non ».</p><ol><li>Quel mécanisme a placé le port Fa0/12 en err-disabled ?</li><li>Quel état spécifique affiche le port Gi0/1 tant qu'il reçoit les BPDUs supérieures du prestataire ?</li><li>Quel mécanisme protège Gi0/2 contre la boucle unidirectionnelle ?</li><li>Quelle manipulation manuelle le technicien doit-il exécuter pour réactiver Fa0/12 après l'incident ?</li><li>Une fois le prestataire corrigé, Gi0/1 revient-il seul en transmission, sans intervention ?</li></ol>",
    "starter": "# Exercice — L'audit de protection STP de la banque Cévale\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nom du mécanisme ou de l'état. Question 4 : les deux commandes.\n# Question 5 : oui ou non.\n\n[Question 1 — Mécanisme ayant désactivé Fa0/12]\nA_COMPLETER\n\n[Question 2 — État affiché par Gi0/1]\nA_COMPLETER\n\n[Question 3 — Mécanisme protégeant Gi0/2]\nA_COMPLETER\n\n[Question 4 — Manipulation pour réactiver Fa0/12]\nA_COMPLETER\n\n[Question 5 — Rétablissement automatique de Gi0/1 ?]\nA_COMPLETER\n",
    "hints": [
      "Le port Fa0/12 est un port d'accès avec PortFast : seule la protection dédiée aux BPDUs non attendues place ce type de port en err-disabled.",
      "Root Guard et Loop Guard réagissent à des anomalies opposées : une BPDU trop bonne qui arrive, et des BPDUs qui disparaissent.",
      "1. BPDU Guard coupe le port ; sa réactivation est manuelle. 2. Root Guard bloque tant que la BPDU supérieure arrive, puis relâche seul. 3. Loop Guard réagit à l'absence de BPDU sur un port racine ou alterné."
    ],
    "examples": [
      {
        "stdin": "À l'usine de Sorans, deux incidents sont constatés sur SW-AT2.\nPort Fa0/20 (PortFast + BPDU Guard) : un commutateur est branché lors d'un séminaire, une BPDU arrive.\nPort Gi0/2 (Root Guard) : le commutateur voisin annonce une priorité meilleure que celle de la racine.\n\n1) Fa0/20 reçoit une BPDU : BPDU Guard le place en err-disabled.\n2) Gi0/2 affiche l'état root inconsistent et bloque le trafic.\n3) Fa0/20 exige un shutdown puis un no shutdown manuels.\n4) Une fois le voisin corrigé, Gi0/2 se rétablit seul.",
        "expected": "Fa0/20 : BPDU Guard, err-disabled — Gi0/2 : root inconsistent — réactivation manuelle de Fa0/20 — rétablissement automatique de Gi0/2",
        "note": "Seule la protection BPDU Guard exige une intervention manuelle : Root Guard et Loop Guard se rétablissent d'eux-mêmes quand l'anomalie disparaît."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mécanisme ayant désactivé Fa0/12",
        "stdin": "q:1",
        "expected": "BPDU Guard||bpduguard||la BPDU Guard||BPDU_Guard"
      },
      {
        "label": "Question 2 — État affiché par Gi0/1",
        "stdin": "q:2",
        "expected": "root inconsistent||root_inconsistent||root-inconsistent||ROOT_INCONSISTENT"
      },
      {
        "label": "Question 3 — Mécanisme protégeant Gi0/2",
        "stdin": "q:3",
        "expected": "Loop Guard||loopguard||la Loop Guard||Loop_Guard"
      },
      {
        "label": "Question 4 — Manipulation pour réactiver Fa0/12",
        "stdin": "q:4",
        "expected": "shutdown puis no shutdown||shutdown / no shutdown||shutdown no shutdown||shutdown et no shutdown||shutdown, puis no shutdown"
      },
      {
        "label": "Question 5 — Rétablissement automatique de Gi0/1 ?",
        "stdin": "q:5",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Mécanisme ayant désactivé Fa0/12]\nBPDU Guard\n\n[Question 2 — État affiché par Gi0/1]\nroot inconsistent\n\n[Question 3 — Mécanisme protégeant Gi0/2]\nLoop Guard\n\n[Question 4 — Manipulation pour réactiver Fa0/12]\nshutdown puis no shutdown\n\n[Question 5 — Rétablissement automatique de Gi0/1 ?]\noui",
    "takeaway": "1) Fa0/12 est un port PortFast qui a reçu une BPDU : BPDU Guard l'a placé en err-disabled.\n2) Gi0/1 reçoit des BPDUs supérieures alors qu'il ne doit jamais voir le prestataire devenir racine : Root Guard l'affiche en état root inconsistent et bloque le trafic.\n3) La disparition des BPDUs sur un port racine est le déclencheur de Loop Guard, qui place Gi0/2 en loop inconsistent pour empêcher la boucle unidirectionnelle.\n4) Un port en err-disabled ne se réactive pas seul : le technicien doit exécuter shutdown puis no shutdown.\n5) Oui : dès que le prestataire cesse d'émettre des BPDUs supérieures, Root Guard rétablit Gi0/1 automatiquement.\nContrôle : trois exigences de sécurité distinctes, trois mécanismes distincts ; un seul d'entre eux (BPDU Guard) exige une action manuelle."
  }
];
