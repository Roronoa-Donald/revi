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
  },
  {
    "id": "lan3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La négociation des cinq agrégats du Crédit du Val",
    "exampleTitle": "Exemple résolu — les agrégats du lycée technique de Vimeux",
    "goal": "Prédire la formation d'un port-channel selon les modes de négociation LACP (active/passive), PAgP (desirable/auto) et le mode statique on.",
    "brief": "<p><strong>Énoncé.</strong> Le Crédit du Val, banque régionale de 40 agences, relie ses étages et son bloc serveurs au commutateur central de la salle machine. Pour chaque liaison candidate, le technicien note le mode d'agrégation configuré sur chaque extrémité :</p><table><tr><th>Agrégat</th><th>Extrémité A</th><th>Extrémité B</th></tr><tr><th>Po-A (vers le bloc serveurs)</th><td>active</td><td>passive</td></tr><tr><th>Po-B (vers l'étage 2)</th><td>active</td><td>on</td></tr><tr><th>Po-C (vers l'étage 3)</th><td>desirable</td><td>auto</td></tr><tr><th>Po-D (vers la salle des archives)</th><td>passive</td><td>passive</td></tr><tr><th>Po-E (vers le coffre-fort numérique)</th><td>on</td><td>on</td></tr></table><p>Rappel du cours : LACP (norme 802.3ad) négocie entre les modes active et passive ; PAgP (propriétaire Cisco) négocie entre les modes desirable et auto ; le mode on force l'agrégation sans aucune négociation. Un canal se forme entre deux ports LACP si au moins une extrémité est active, entre deux ports PAgP si au moins une extrémité est desirable, et entre deux ports on ; aucune combinaison mixte (LACP contre PAgP, ou négociation contre on) ne forme de canal.</p><p>La question 1 appelle le nom du protocole ; les questions 2 à 6 appellent « oui » ou « non ».</p><ol><li>À quel protocole de négociation appartiennent les modes « active » et « passive » ?</li><li>L'agrégat Po-A (active + passive) forme-t-il un canal ?</li><li>L'agrégat Po-B (active + on) forme-t-il un canal ?</li><li>L'agrégat Po-C (desirable + auto) forme-t-il un canal ?</li><li>L'agrégat Po-D (passive + passive) forme-t-il un canal ?</li><li>L'agrégat Po-E (on + on) forme-t-il un canal ?</li></ol>",
    "starter": "# Exercice — La négociation des cinq agrégats du Crédit du Val\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nom du protocole. Questions 2 à 6 : oui ou non.\n\n[Question 1 — Protocole des modes active et passive]\nA_COMPLETER\n\n[Question 2 — Po-A (active + passive) : canal formé ?]\nA_COMPLETER\n\n[Question 3 — Po-B (active + on) : canal formé ?]\nA_COMPLETER\n\n[Question 4 — Po-C (desirable + auto) : canal formé ?]\nA_COMPLETER\n\n[Question 5 — Po-D (passive + passive) : canal formé ?]\nA_COMPLETER\n\n[Question 6 — Po-E (on + on) : canal formé ?]\nA_COMPLETER\n",
    "hints": [
      "Identifiez d'abord la famille de chaque mode : active/passive appartiennent à LACP, desirable/auto à PAgP, on n'appartient à aucun protocole de négociation.",
      "Un canal LACP exige au moins un côté active ; un canal PAgP exige au moins un côté desirable ; le mode on doit faire face à un autre mode on.",
      "1. Po-A : LACP avec un côté actif. 2. Po-B : LACP contre on, aucune négociation commune. 3. Po-C : PAgP avec un côté desirable. 4. Po-D : aucun côté ne prend l'initiative. 5. Po-E : deux modes on se répondent."
    ],
    "examples": [
      {
        "stdin": "Le lycée technique de Vimeux teste quatre agrégats entre sa salle machine et ses deux bâtiments.\nPo-1 : active + active. Po-2 : desirable + desirable.\nPo-3 : auto + auto. Po-4 : passive + desirable.\n\n1) Po-1 : LACP avec deux extrémités actives : canal formé.\n2) Po-2 : PAgP avec deux extrémités desirable : canal formé.\n3) Po-3 : PAgP auto + auto, aucun côté ne négocie : pas de canal.\n4) Po-4 : LACP passif face à PAgP desirable, protocoles incompatibles : pas de canal.",
        "expected": "Po-1 : canal formé — Po-2 : canal formé — Po-3 : pas de canal — Po-4 : pas de canal (protocoles différents)",
        "note": "Passive + passive et auto + auto échouent pour la même raison : aucune des deux extrémités ne prend l'initiative de la négociation."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Protocole des modes active et passive",
        "stdin": "q:1",
        "expected": "LACP||le LACP||lacp 802.3ad||802.3ad"
      },
      {
        "label": "Question 2 — Po-A (active + passive) : canal formé ?",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — Po-B (active + on) : canal formé ?",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Po-C (desirable + auto) : canal formé ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Po-D (passive + passive) : canal formé ?",
        "stdin": "q:5",
        "expected": "non"
      },
      {
        "label": "Question 6 — Po-E (on + on) : canal formé ?",
        "stdin": "q:6",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Protocole des modes active et passive]\nLACP\n\n[Question 2 — Po-A (active + passive) : canal formé ?]\noui\n\n[Question 3 — Po-B (active + on) : canal formé ?]\nnon\n\n[Question 4 — Po-C (desirable + auto) : canal formé ?]\noui\n\n[Question 5 — Po-D (passive + passive) : canal formé ?]\nnon\n\n[Question 6 — Po-E (on + on) : canal formé ?]\noui",
    "takeaway": "1) Les modes active et passive appartiennent à LACP (norme 802.3ad).\n2) Po-A : une extrémité active suffit pour lancer la négociation LACP, le canal se forme.\n3) Po-B : le mode on force l'agrégation sans négocier ; face à un port LACP active, aucune entente n'est possible : pas de canal.\n4) Po-C : desirable et auto sont deux modes PAgP, et une extrémité desirable suffit : le canal se forme.\n5) Po-D : deux extrémités passives n'émettent aucune trame de négociation LACP : pas de canal.\n6) Po-E : deux modes on forcent l'agrégation des deux côtés : le canal se forme, sans négociation ni détection de panne de protocole.\nContrôle : trois canaux se forment (Po-A, Po-C, Po-E) ; les échecs concernent soit l'absence d'initiateur (Po-D), soit des modes incompatibles (Po-B)."
  },
  {
    "id": "lan3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le dimensionnement du port-channel Po1 de Pharmalys",
    "exampleTitle": "Exemple résolu — le port-channel du studio Vidéralp",
    "goal": "Dimensionner un lien trunk agrégé (bande passante totale, débit d'un flux unique, panne d'un membre) et prédire le lien utilisé par hachage.",
    "brief": "<p><strong>Énoncé.</strong> Pharmalys, laboratoire pharmaceutique de 900 salariés, sature son unique liaison 1 Gbit/s entre le commutateur d'étage SW-ET4 et le cœur de réseau. L'administrateur agrège quatre liaisons cuivre 1 Gbit/s dans le port-channel Po1 (membres Gi2/0/1 à Gi2/0/4). La répartition de charge s'appuie sur un hachage des adresses IP source et destination ; pour simplifier, le lien utilisé par un flux est déterminé par le dernier octet des deux adresses : numéro de lien = (octet_source XOR octet_destination) mod 4, les liens étant numérotés de 0 à 3.</p><p>Rappels du cours : la bande passante d'un port-channel est la somme des débits de ses membres actifs ; un flux unique (un couple d'adresses IP, une « conversation ») emprunte toujours un seul lien du canal.</p><p>Répondez par le nombre seul (débit en Gbit/s, ou numéro de lien).</p><ol><li>Quelle est la bande passante théorique du port-channel Po1, en Gbit/s ?</li><li>Un transfert unique relie le serveur de paie (192.168.10.10) à l'imprimante badgeuse (192.168.10.100) : quelle bande passante maximale, en Gbit/s, ce flux peut-il atteindre ?</li><li>Quel lien (numéro 0 à 3) emprunte le flux de la question 2 ?</li><li>Le flux du serveur d'archivage (192.168.10.50) vers la baie de sauvegarde (192.168.10.62) emprunte quel lien ?</li><li>La liaison Gi2/0/3 tombe en panne : quelle est la nouvelle capacité du canal, en Gbit/s ?</li></ol>",
    "starter": "# Exercice — Le dimensionnement du port-channel Po1 de Pharmalys\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Toutes les réponses sont des nombres (Gbit/s ou numéro de lien).\n\n[Question 1 — Bande passante théorique du canal (en Gbit/s)]\nA_COMPLETER\n\n[Question 2 — Débit maximal d'un flux unique (en Gbit/s)]\nA_COMPLETER\n\n[Question 3 — Lien du flux serveur de paie vers badgeuse]\nA_COMPLETER\n\n[Question 4 — Lien du flux archivage vers sauvegarde]\nA_COMPLETER\n\n[Question 5 — Capacité du canal après panne d'un membre (en Gbit/s)]\nA_COMPLETER\n",
    "hints": [
      "La capacité d'un canal est additive : quatre membres de 1 Gbit/s offrent 4 Gbit/s cumulés, mais un seul membre à la fois pour chaque conversation.",
      "Le hachage se calcule sur les derniers octets : 10 XOR 100, puis le reste de la division par 4 donne le numéro de lien.",
      "1. 4 × 1 Gbit/s. 2. Un flux unique ne traverse qu'un lien. 3. 10 XOR 100 = 110, puis 110 mod 4. 4. 50 XOR 62 = 12, puis 12 mod 4. 5. Un membre en moins retire 1 Gbit/s."
    ],
    "examples": [
      {
        "stdin": "Le studio Vidéralp agrège deux liaisons 10 Gbit/s dans Po5 (liens numérotés 0 et 1).\nUn flux relie la station de montage 172.16.4.20 au serveur de rendu 172.16.4.35\n(hachage : lien = (octet_source XOR octet_destination) mod 2).\n\n1) Capacité du canal : 2 × 10 = 20 Gbit/s.\n2) Un flux unique traverse un seul lien : 10 Gbit/s au maximum.\n3) 20 XOR 35 = 55 ; 55 mod 2 = 1 → lien 1.\n4) Une liaison tombe : capacité restante 10 Gbit/s, le flux continue via l'autre lien.",
        "expected": "capacité : 20 Gbit/s — un flux unique : 10 Gbit/s au plus — lien 1 — après panne : 10 Gbit/s",
        "note": "Le hachage répartit les flux entre les liens, jamais les paquets d'un même flux : la bande passante d'une conversation reste celle d'un seul membre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Bande passante théorique du canal (en Gbit/s)",
        "stdin": "q:1",
        "expected": "4||4 Gbit/s"
      },
      {
        "label": "Question 2 — Débit maximal d'un flux unique (en Gbit/s)",
        "stdin": "q:2",
        "expected": "1||1 Gbit/s"
      },
      {
        "label": "Question 3 — Lien du flux serveur de paie vers badgeuse",
        "stdin": "q:3",
        "expected": "2||lien 2||le lien 2"
      },
      {
        "label": "Question 4 — Lien du flux archivage vers sauvegarde",
        "stdin": "q:4",
        "expected": "0||lien 0||le lien 0"
      },
      {
        "label": "Question 5 — Capacité du canal après panne d'un membre (en Gbit/s)",
        "stdin": "q:5",
        "expected": "3||3 Gbit/s"
      }
    ],
    "solution": "[Question 1 — Bande passante théorique du canal (en Gbit/s)]\n4\n\n[Question 2 — Débit maximal d'un flux unique (en Gbit/s)]\n1\n\n[Question 3 — Lien du flux serveur de paie vers badgeuse]\n2\n\n[Question 4 — Lien du flux archivage vers sauvegarde]\n0\n\n[Question 5 — Capacité du canal après panne d'un membre (en Gbit/s)]\n3",
    "takeaway": "1) Le canal agrège quatre membres de 1 Gbit/s : 4 × 1 = 4 Gbit/s.\n2) Un flux unique (serveur de paie vers imprimante badgeuse) emprunte un seul lien : 1 Gbit/s au maximum.\n3) Derniers octets : 10 XOR 100 = 110 (soit 0b0001010 XOR 0b1100100 = 0b1101110) ; 110 mod 4 = 2 : le flux emprunte le lien 2.\n4) 50 XOR 62 = 12 (0b0110010 XOR 0b0111110 = 0b0001100) ; 12 mod 4 = 0 : le flux emprunte le lien 0.\n5) Après la panne de Gi2/0/3, il reste trois membres actifs : 3 × 1 = 3 Gbit/s.\nContrôle : les deux flux calculés (liens 2 et 0) tombent sur des liens distincts ; la panne d'un membre ne coupe aucun flux, elle réduit seulement la capacité."
  },
  {
    "id": "lan3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Le diagnostic des membres du port-channel de la DMZ de Solidia",
    "exampleTitle": "Exemple résolu — le port-channel du plateau technique d'Aerolis",
    "goal": "Contrôler la cohérence des membres d'un EtherChannel (vitesse, duplex, mode, VLANs autorisés) et déduire les membres actifs et la capacité restante.",
    "brief": "<p><strong>Énoncé.</strong> La mutuelle Solidia publie son portail de gestion des remboursements depuis une DMZ. Le port-channel Po20 relie le pare-feu au commutateur d'agrégation SW-DMZ ; il a été assemblé à partir de quatre ports. À la suite de chutes de débit, l'administrateur relève l'état des quatre membres :</p><table><tr><th>Port</th><th>Vitesse</th><th>Duplex</th><th>Mode</th><th>VLANs autorisés</th></tr><tr><th>Gi1/0/1</th><td>1 Gbit/s</td><td>full</td><td>trunk</td><td>10, 20, 30</td></tr><tr><th>Gi1/0/2</th><td>1 Gbit/s</td><td>full</td><td>trunk</td><td>10, 20, 30</td></tr><tr><th>Gi1/0/3</th><td>1 Gbit/s</td><td>full</td><td>trunk</td><td>10, 20</td></tr><tr><th>Gi1/0/4</th><td>100 Mbit/s</td><td>full</td><td>trunk</td><td>10, 20, 30</td></tr></table><p>Rappel du cours : un port ne rejoint le canal que si sa configuration est strictement identique à celle du groupe : même vitesse, même duplex, même mode (accès ou trunk) et mêmes VLANs autorisés. Tout port incohérent est écarté (suspendu) et le canal se reforme avec les seuls membres compatibles ; la bande passante du canal est la somme des débits de ses membres actifs.</p><p>Répondez par le nombre seul (questions 1, 4 et 5) ou par un court libellé (questions 2 et 3).</p><ol><li>Combien de ports forment le canal Po20 après contrôle de cohérence ?</li><li>Quel critère écarte Gi1/0/3 du canal ?</li><li>Quel critère écarte Gi1/0/4 du canal ?</li><li>Quelle est la capacité du canal après le contrôle, en Gbit/s ?</li><li>L'administrateur corrige la vitesse de Gi1/0/4 (1 Gbit/s) mais laisse Gi1/0/3 inchangé : combien de membres actifs compte alors Po20 ?</li></ol>",
    "starter": "# Exercice — Le diagnostic des membres du port-channel de la DMZ de Solidia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 4 et 5 : le nombre seul. Questions 2 et 3 : un court libellé.\n\n[Question 1 — Nombre de membres actifs du canal]\nA_COMPLETER\n\n[Question 2 — Critère écartant Gi1/0/3]\nA_COMPLETER\n\n[Question 3 — Critère écartant Gi1/0/4]\nA_COMPLETER\n\n[Question 4 — Capacité du canal (en Gbit/s)]\nA_COMPLETER\n\n[Question 5 — Membres actifs après correction de Gi1/0/4]\nA_COMPLETER\n",
    "hints": [
      "Comparez chaque ligne du tableau à la configuration majoritaire du groupe : un seul attribut divergent suffit à suspendre un membre.",
      "Gi1/0/3 diffère par la liste des VLANs ; Gi1/0/4 diffère par le débit de sa liaison.",
      "1. Ne conservent le canal que les ports strictement identiques. 2. Deux ports restent. 3. La capacité suit le nombre de membres actifs. 4. Corriger la vitesse de Gi1/0/4 ne règle pas l'écart de VLANs de Gi1/0/3."
    ],
    "examples": [
      {
        "stdin": "Le plateau technique d'Aerolis agrège quatre ports dans Po30.\nTe1/1/1 : 10 Gbit/s, full, trunk, VLANs 100, 200.\nTe1/1/2 : 10 Gbit/s, full, trunk, VLANs 100, 200.\nTe1/1/3 : 10 Gbit/s, half, trunk, VLANs 100, 200.\nTe1/1/4 : 10 Gbit/s, full, accès, VLAN 100.\n\n1) Seuls Te1/1/1 et Te1/1/2 sont cohérents : 2 membres actifs.\n2) Te1/1/3 est écarté : duplex half au lieu de full.\n3) Te1/1/4 est écarté : port d'accès au lieu de trunk.\n4) Capacité restante : 2 × 10 = 20 Gbit/s.",
        "expected": "2 membres actifs — Te1/1/3 écarté pour le duplex — Te1/1/4 écarté pour le mode — capacité 20 Gbit/s",
        "note": "Le contrôle de cohérence est strict : un seul attribut divergent (un VLAN manquant, un duplex différent) suffit à suspendre le membre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de membres actifs du canal",
        "stdin": "q:1",
        "expected": "2"
      },
      {
        "label": "Question 2 — Critère écartant Gi1/0/3",
        "stdin": "q:2",
        "expected": "les VLANs autorisés||les VLAN autorisés||la liste des VLANs||VLAN différents||les VLANs||les VLANs différents"
      },
      {
        "label": "Question 3 — Critère écartant Gi1/0/4",
        "stdin": "q:3",
        "expected": "la vitesse||vitesse||le débit||débit"
      },
      {
        "label": "Question 4 — Capacité du canal (en Gbit/s)",
        "stdin": "q:4",
        "expected": "2||2 Gbit/s"
      },
      {
        "label": "Question 5 — Membres actifs après correction de Gi1/0/4",
        "stdin": "q:5",
        "expected": "3"
      }
    ],
    "solution": "[Question 1 — Nombre de membres actifs du canal]\n2\n\n[Question 2 — Critère écartant Gi1/0/3]\nles VLANs autorisés\n\n[Question 3 — Critère écartant Gi1/0/4]\nla vitesse\n\n[Question 4 — Capacité du canal (en Gbit/s)]\n2\n\n[Question 5 — Membres actifs après correction de Gi1/0/4]\n3",
    "takeaway": "1) Seuls Gi1/0/1 et Gi1/0/2 sont strictement identiques (1 Gbit/s, full, trunk, VLANs 10, 20, 30) : le canal compte 2 membres actifs.\n2) Gi1/0/3 est écarté car sa liste de VLANs autorisés (10, 20) diffère de celle du groupe (10, 20, 30).\n3) Gi1/0/4 est écarté car sa vitesse (100 Mbit/s) diffère du 1 Gbit/s du groupe.\n4) Le canal actif regroupe deux liens de 1 Gbit/s : 2 Gbit/s.\n5) Une fois la vitesse de Gi1/0/4 corrigée, il rejoint le canal (3 membres), mais Gi1/0/3 reste suspendu tant que ses VLANs ne sont pas alignés : 3 membres actifs.\nContrôle : 2 membres actifs avant correction, 3 après ; le port suspendu reste physiquement actif mais hors canal."
  },
  {
    "id": "lan3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "L'élection du maître VRRP du site de production de Vellum",
    "exampleTitle": "Exemple résolu — le VRRP du siège de Papermühle",
    "goal": "Élire le routeur maître VRRP d'un site réel en appliquant la priorité, la préemption et le départage par adresse IP.",
    "brief": "<p><strong>Énoncé.</strong> Vellum Industries fabrique du papier technique sur un site isolé. Le VLAN 40 (production) sort vers le réseau d'entreprise via deux routeurs redondants configurés en VRRP (groupe 40). Les postes utilisent l'adresse virtuelle 10.40.0.1 comme passerelle :</p><table><tr><th>Routeur</th><th>Priorité VRRP</th><th>Adresse IP physique</th><th>Préemption</th></tr><tr><th>R-PRIM</th><td>150</td><td>10.40.0.2</td><td>activée</td></tr><tr><th>R-SEC</th><td>100</td><td>10.40.0.3</td><td>activée</td></tr></table><p>Rappel du cours : dans VRRP, le routeur de priorité la plus élevée devient maître (Master) et détient l'adresse IP virtuelle ; à priorités égales, l'adresse IP physique la plus élevée l'emporte ; avec la préemption activée, un routeur de priorité supérieure qui revient reprend le rôle de maître. La priorité appliquée par défaut, si aucune n'est configurée, est 100.</p><p>Répondez par le nom exact du routeur (questions 1, 3 et 5), le nombre seul (question 2), ou « oui » / « non » (question 4).</p><ol><li>Quel routeur est élu maître du groupe 40 au démarrage ?</li><li>Quelle priorité VRRP est appliquée quand aucune priorité n'est configurée ?</li><li>R-PRIM tombe en panne : quel routeur devient maître ?</li><li>R-PRIM revient à la normale : redevient-il maître ?</li><li>Le technicien aligne la priorité de R-SEC sur 150 : quel routeur devient maître après convergence ?</li></ol>",
    "starter": "# Exercice — L'élection du maître VRRP du site de production de Vellum\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 5 : le nom du routeur. Question 2 : le nombre seul.\n# Question 4 : oui ou non.\n\n[Question 1 — Maître VRRP au démarrage]\nA_COMPLETER\n\n[Question 2 — Priorité par défaut de VRRP]\nA_COMPLETER\n\n[Question 3 — Maître pendant la panne de R-PRIM]\nA_COMPLETER\n\n[Question 4 — R-PRIM redevient-il maître à son retour ?]\nA_COMPLETER\n\n[Question 5 — Maître après alignement des priorités à 150]\nA_COMPLETER\n",
    "hints": [
      "L'élection VRRP cherche la priorité la plus élevée, contrairement à STP qui cherche la plus petite valeur.",
      "La préemption permet à un routeur revenu avec une meilleure priorité de reprendre la main sans attendre l'expiration du maître actuel.",
      "1. Comparez 150 et 100. 2. La valeur par défaut est fixée par la norme. 3. Le routeur survivant devient maître. 4. La préemption est activée. 5. À priorités égales, l'adresse IP physique la plus élevée l'emporte."
    ],
    "examples": [
      {
        "stdin": "Le siège de Papermühle exploite deux routeurs VRRP sur le VLAN 25.\nR-P : priorité 120, IP 10.25.0.2 ; R-S : priorité 120, IP 10.25.0.3.\nLes postes utilisent la passerelle virtuelle 10.25.0.1.\n\n1) Priorités égales (120) : le départage se fait sur l'adresse IP physique.\n2) 10.25.0.3 > 10.25.0.2 : R-S devient maître.\n3) La priorité par défaut, sans configuration, est 100.\n4) Si R-P monte à 200 avec préemption, il redevient maître.",
        "expected": "maître : R-S (IP la plus élevée) — priorité par défaut : 100 — après passage à 200 : R-P maître",
        "note": "VRRP départage les égalités par l'adresse IP la plus élevée, contrairement à STP qui utilise la plus petite valeur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Maître VRRP au démarrage",
        "stdin": "q:1",
        "expected": "R-PRIM||le routeur R-PRIM||RPRIM"
      },
      {
        "label": "Question 2 — Priorité par défaut de VRRP",
        "stdin": "q:2",
        "expected": "100"
      },
      {
        "label": "Question 3 — Maître pendant la panne de R-PRIM",
        "stdin": "q:3",
        "expected": "R-SEC||le routeur R-SEC||RSEC"
      },
      {
        "label": "Question 4 — R-PRIM redevient-il maître à son retour ?",
        "stdin": "q:4",
        "expected": "oui"
      },
      {
        "label": "Question 5 — Maître après alignement des priorités à 150",
        "stdin": "q:5",
        "expected": "R-SEC||le routeur R-SEC||RSEC"
      }
    ],
    "solution": "[Question 1 — Maître VRRP au démarrage]\nR-PRIM\n\n[Question 2 — Priorité par défaut de VRRP]\n100\n\n[Question 3 — Maître pendant la panne de R-PRIM]\nR-SEC\n\n[Question 4 — R-PRIM redevient-il maître à son retour ?]\noui\n\n[Question 5 — Maître après alignement des priorités à 150]\nR-SEC",
    "takeaway": "1) R-PRIM affiche la priorité la plus élevée (150 contre 100) : il est élu maître du groupe 40 et détient l'adresse virtuelle 10.40.0.1.\n2) La priorité VRRP appliquée par défaut est 100.\n3) Pendant la panne de R-PRIM, R-SEC est le seul candidat : il devient maître.\n4) Oui : la préemption est activée et R-PRIM revient avec une priorité supérieure (150), il reprend le rôle de maître.\n5) Avec deux priorités égales à 150, le départage se fait sur l'adresse IP physique la plus élevée : 10.40.0.3 > 10.40.0.2, donc R-SEC devient maître.\nContrôle : dans les deux situations (départ et alignement à 150), un seul routeur détient l'adresse virtuelle 10.40.0.1."
  },
  {
    "id": "lan3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La bascule HSRP du siège de Transversale",
    "exampleTitle": "Exemple résolu — la bascule HSRP de l'agence de Port-Rolland",
    "goal": "Calculer l'effet du suivi d'interface (object tracking) sur la priorité HSRP et prévoir les bascules du routeur actif.",
    "brief": "<p><strong>Énoncé.</strong> Transversale, courtier en assurance de 600 salariés, concentre son trafic Internet au siège. Deux routeurs HSRP (groupe 1, VLAN 100) servent de passerelle : R-A (priorité 120) et R-B (priorité 100), tous deux avec la préemption activée. L'adresse virtuelle est 10.100.0.1. Pour réagir aux pannes de liens montants, R-A surveille d'abord son interface WAN Gi0/0 avec un décrément de 40, puis on lui ajoute le suivi du lien DMZ Gi0/1 avec un décrément de 15.</p><p>Rappel du cours : en HSRP, le routeur de priorité la plus élevée devient actif ; chaque interface suivie qui tombe retranche son décrément de la priorité du routeur ; avec la préemption, la bascule se produit dès que la priorité effective d'un routeur repasse au-dessus de celle de l'autre.</p><p>Répondez par le nombre seul (questions 1, 2 et 5) ou le nom du routeur (questions 3 et 4).</p><ol><li>Quelle est la priorité effective de R-A en fonctionnement normal ?</li><li>Le lien WAN Gi0/0 tombe : quelle est la priorité effective de R-A ?</li><li>Dans cette situation, quel routeur détient le rôle actif ?</li><li>Le lien WAN est rétabli : quel routeur redevient actif ?</li><li>WAN et DMZ tombent simultanément : quelle est la priorité effective de R-A ?</li></ol>",
    "starter": "# Exercice — La bascule HSRP du siège de Transversale\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 5 : le nombre seul. Questions 3 et 4 : le nom du routeur.\n\n[Question 1 — Priorité effective de R-A en fonctionnement normal]\nA_COMPLETER\n\n[Question 2 — Priorité de R-A après la panne du WAN]\nA_COMPLETER\n\n[Question 3 — Routeur actif pendant la panne du WAN]\nA_COMPLETER\n\n[Question 4 — Routeur actif après le rétablissement du WAN]\nA_COMPLETER\n\n[Question 5 — Priorité de R-A si WAN et DMZ tombent]\nA_COMPLETER\n",
    "hints": [
      "En fonctionnement normal, aucune interface suivie n'est tombée : la priorité effective est la priorité configurée.",
      "Chaque interface suivie tombée retranche son décrément : 120 − 40 pour le WAN seul, puis encore − 15 pour la DMZ.",
      "1. Priorité configurée. 2. 120 − 40. 3. Comparez le résultat à la priorité de R-B (100). 4. La préemption rend la main au routeur de priorité supérieure. 5. Les décréments s'additionnent."
    ],
    "examples": [
      {
        "stdin": "L'agence de Port-Rolland exploite deux routeurs HSRP.\nR-1 : priorité 130, préemption ; R-2 : priorité 110.\nR-1 surveille son lien WAN avec un décrément de 50, puis un lien SAV avec un décrément de 20.\n\n1) Fonctionnement normal : priorité effective de R-1 = 130.\n2) WAN tombé : 130 − 50 = 80, sous 110 → R-2 devient actif.\n3) WAN rétabli : R-1 revient à 130 et redevient actif (préemption).\n4) WAN + SAV tombés : 130 − 50 − 20 = 60.",
        "expected": "normal : 130 — WAN tombé : 80, R-2 actif — retour du WAN : R-1 actif — double panne : 60",
        "note": "Les décréments s'additionnent : chaque interface suivie tombée retranche sa propre valeur de la priorité de base."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Priorité effective de R-A en fonctionnement normal",
        "stdin": "q:1",
        "expected": "120"
      },
      {
        "label": "Question 2 — Priorité de R-A après la panne du WAN",
        "stdin": "q:2",
        "expected": "80"
      },
      {
        "label": "Question 3 — Routeur actif pendant la panne du WAN",
        "stdin": "q:3",
        "expected": "R-B||le routeur R-B||RB"
      },
      {
        "label": "Question 4 — Routeur actif après le rétablissement du WAN",
        "stdin": "q:4",
        "expected": "R-A||le routeur R-A||RA"
      },
      {
        "label": "Question 5 — Priorité de R-A si WAN et DMZ tombent",
        "stdin": "q:5",
        "expected": "65"
      }
    ],
    "solution": "[Question 1 — Priorité effective de R-A en fonctionnement normal]\n120\n\n[Question 2 — Priorité de R-A après la panne du WAN]\n80\n\n[Question 3 — Routeur actif pendant la panne du WAN]\nR-B\n\n[Question 4 — Routeur actif après le rétablissement du WAN]\nR-A\n\n[Question 5 — Priorité de R-A si WAN et DMZ tombent]\n65",
    "takeaway": "1) Aucune interface suivie n'est tombée : la priorité effective de R-A vaut 120.\n2) La chute du WAN retranche 40 : 120 − 40 = 80.\n3) R-A (80) passe sous la priorité de R-B (100) : R-B devient le routeur actif.\n4) Le WAN rétabli, R-A revient à 120 et, la préemption étant activée, il redevient actif.\n5) WAN et DMZ tombés : 120 − 40 − 15 = 65.\nContrôle : 80 < 100 explique la bascule ; 120 > 100 explique le retour ; 65 < 100 maintiendrait R-B actif."
  },
  {
    "id": "lan3-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "L'équilibrage GLBP du campus d'Aurelia",
    "exampleTitle": "Exemple résolu — le GLBP du centre de recherche de Néovia",
    "goal": "Répartir la charge entre passerelles virtuelles GLBP : élection de l'AVG, nombre de MAC virtuelles, parts de trafic selon les poids et reprise après panne.",
    "brief": "<p><strong>Énoncé.</strong> Aurelia, école d'ingénieurs de 3 000 étudiants, dessert ses amphithéâtres via trois routeurs GLBP (groupe 10). Chaque hôte conserve une passerelle virtuelle unique (10.10.0.1), mais l'AVG distribue des adresses MAC virtuelles distinctes pour équilibrer les flux. La configuration est la suivante :</p><table><tr><th>Routeur</th><th>Priorité GLBP</th><th>Poids (weight)</th></tr><tr><th>R1</th><td>200</td><td>100</td></tr><tr><th>R2</th><td>150</td><td>100</td></tr><tr><th>R3</th><td>150</td><td>50</td></tr></table><p>Rappel du cours : GLBP élit une passerelle virtuelle active (AVG) parmi les priorités les plus élevées ; tous les routeurs du groupe servent de passerelle virtuelle (AVF) et reçoivent chacun une adresse MAC virtuelle. En équilibrage pondéré (weighted), la part de trafic d'un AVF est proportionnelle à son poids rapporté à la somme des poids des AVF actifs.</p><p>Répondez par le nom du routeur (questions 1) ou le nombre seul (questions 2 à 5, parts en pourcentage).</p><ol><li>Quel routeur est élu AVG du groupe 10 ?</li><li>Combien d'adresses MAC virtuelles le groupe expose-t-il aux hôtes ?</li><li>Quelle part du trafic (en %) R1 reçoit-il ?</li><li>Quelle part du trafic (en %) R3 reçoit-il ?</li><li>R3 tombe en panne : quelle part du trafic (en %) R1 reçoit-il désormais ?</li></ol>",
    "starter": "# Exercice — L'équilibrage GLBP du campus d'Aurelia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nom du routeur. Questions 2 à 5 : le nombre seul (parts en %).\n\n[Question 1 — AVG du groupe 10]\nA_COMPLETER\n\n[Question 2 — Nombre d'adresses MAC virtuelles]\nA_COMPLETER\n\n[Question 3 — Part du trafic de R1 (en %)]\nA_COMPLETER\n\n[Question 4 — Part du trafic de R3 (en %)]\nA_COMPLETER\n\n[Question 5 — Part du trafic de R1 après la panne de R3 (en %)]\nA_COMPLETER\n",
    "hints": [
      "L'AVG est le routeur de priorité la plus élevée du groupe ; il attribue ensuite les adresses MAC virtuelles aux AVF.",
      "Chaque AVF actif reçoit une adresse MAC virtuelle : comptez les routeurs du groupe.",
      "1. Comparez 200, 150 et 150. 2. Un AVF = une MAC virtuelle. 3. Part = poids / somme des poids, soit 100 / 250. 4. 50 / 250. 5. Après la panne, la somme des poids ne compte plus que R1 et R2."
    ],
    "examples": [
      {
        "stdin": "Le centre de recherche de Néovia exploite trois routeurs GLBP (groupe 5).\nR-A : priorité 250, poids 60 ; R-B : priorité 200, poids 60 ; R-C : priorité 150, poids 30.\n\n1) L'AVG est le routeur de priorité la plus élevée : R-A.\n2) Chaque AVF reçoit une MAC virtuelle : 3 adresses.\n3) Somme des poids : 150 ; part de R-A : 60/150 = 40 % (R-B : 40 %, R-C : 20 %).\n4) R-C tombe : somme des poids 120 ; part de R-A : 60/120 = 50 %.",
        "expected": "AVG : R-A — 3 MAC virtuelles — part de R-A : 40 % — après panne de R-C : 50 %",
        "note": "Avec trois AVF actifs, chaque hôte reçoit l'une des trois MAC virtuelles : la charge suit les poids, pas le nombre d'hôtes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — AVG du groupe 10",
        "stdin": "q:1",
        "expected": "R1||le routeur R1||R 1"
      },
      {
        "label": "Question 2 — Nombre d'adresses MAC virtuelles",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Part du trafic de R1 (en %)",
        "stdin": "q:3",
        "expected": "40||40 %||40%"
      },
      {
        "label": "Question 4 — Part du trafic de R3 (en %)",
        "stdin": "q:4",
        "expected": "20||20 %||20%"
      },
      {
        "label": "Question 5 — Part du trafic de R1 après la panne de R3 (en %)",
        "stdin": "q:5",
        "expected": "50||50 %||50%"
      }
    ],
    "solution": "[Question 1 — AVG du groupe 10]\nR1\n\n[Question 2 — Nombre d'adresses MAC virtuelles]\n3\n\n[Question 3 — Part du trafic de R1 (en %)]\n40\n\n[Question 4 — Part du trafic de R3 (en %)]\n20\n\n[Question 5 — Part du trafic de R1 après la panne de R3 (en %)]\n50",
    "takeaway": "1) La priorité la plus élevée est 200 : R1 est élu AVG du groupe 10.\n2) Les trois routeurs sont des AVF : le groupe expose 3 adresses MAC virtuelles aux hôtes.\n3) Somme des poids : 100 + 100 + 50 = 250 ; part de R1 : 100/250 = 40 %.\n4) Part de R3 : 50/250 = 20 %.\n5) R3 tombé, la somme des poids actifs vaut 100 + 100 = 200 ; part de R1 : 100/200 = 50 %.\nContrôle : 40 % + 40 % + 20 % = 100 % avant la panne ; 50 % + 50 % = 100 % après la panne de R3."
  },
  {
    "id": "lan3-c4-e1",
    "chapter": 4,
    "title": "Calculateur de métrique de coût OSPF et sélection du meilleur chemin",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer le coût OSPF cumulé de chemins concurrents à partir de la bande passante de référence.",
    "brief": "<p>Le protocole <strong>OSPFv2 (Open Shortest Path First - RFC 2328)</strong> sélectionne les routes selon leur coût. Dans cet exercice, on utilise le modèle de calcul suivant pour chaque interface :<br>\n<code>coût = max(1, ref_bandwidth // interface_bandwidth)</code> (bandes passantes en Mbps). Ce calcul basé sur la bande passante est une convention d'implémentation, pas une formule imposée par la RFC.<br>\nLa référence historique de 100 Mbps utilisée ici par défaut donne un coût de 1 pour FastEthernet, Gigabit et 10G. Sur certains équipements, elle se configure avec <code>auto-cost reference-bandwidth</code>, par exemple à 10000 ou 100000 Mbps.<br><br>\nLe coût total d'un chemin est la somme des coûts des interfaces de sortie de ses sauts. Tous les chemins d'un cas concernent une même destination et une même catégorie de route.</p><p><strong>Modèle pédagogique :</strong> parmi les chemins de coût minimal, choisir exactement un <code>BEST_PATH</code> : en cas d'égalité, retenir l'identifiant le premier par ordre alphabétique. Tous les autres reçoivent <code>BACKUP_PATH</code>, même à coût égal ; ce statut ne signifie pas nécessairement qu'ils seraient des secours en OSPF réel.<br>\nEn effet, OSPF peut utiliser plusieurs prochains sauts de coût égal en parallèle (ECMP) ; leur nombre dépend notamment de l'implémentation et de sa configuration. Le départage alphabétique est propre à cet exercice, pas une règle générale d'OSPF.</p><p>Analyse les données de chaque cas :<br>\n<code>OSPF_CONFIG ref_bw=&lt;reference_en_Mbps&gt;</code><br>\n<code>PATH id=&lt;id&gt; hops=&lt;bw1,bw2,...&gt;</code> (vitesses des interfaces en Mbps).<br><br>\nPour chaque chemin, trié par identifiant alphabétique, affiche :<br>\n<code>OSPF_PATH id={id} total_cost={total_cost} hops_count={len(hops)} status={BEST_PATH|BACKUP_PATH}</code><br>\nPuis affiche la ligne :<br>\n<code>OSPF_ROUTE best_path={winner_id} metric={winner_cost}</code></p><p>Sources consultées le 2026-10-30 : RFC 2328, section 2.4, <code>https://www.rfc-editor.org/rfc/rfc2328.html#section-2.4</code> ; Cisco, coûts OSPF, <code>https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/9237-9.html</code>.</p>",
    "starter": "# Grille d'analyse (lan3-c4-e1) — Calculateur de métrique de coût OSPF et sélection du meilleur chemin\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Bande passante de référence par défaut 100 Mbps sans différenciation au-delà]\n# Données : OSPF_CONFIG ref_bw=100\n# Données : PATH id=P1 hops=100,100\n# Données : PATH id=P2 hops=1000,1000\nA_COMPLETER\n\n[Cas 2 — Chemin à saut unique très rapide surpassant un chemin multi-sauts]\n# Données : OSPF_CONFIG ref_bw=100000\n# Données : PATH id=FIBRE hops=100000\n# Données : PATH id=CUIVRE hops=10000,10000\nA_COMPLETER\n\n[Cas 3 — Liaisons lentes pénalisées (T1/E1)]\n# Données : OSPF_CONFIG ref_bw=1000\n# Données : PATH id=DIRECT_SLOW hops=2\n# Données : PATH id=DETOUR_FAST hops=100,100\nA_COMPLETER\n",
    "hints": [
      "Calculer pour chaque saut : max(1, ref_bw // bw).",
      "Sommer les coûts pour obtenir total_cost.",
      "Parmi les coûts minimaux, seul l'identifiant alphabétiquement premier est BEST_PATH ; les autres sont BACKUP_PATH dans ce modèle, même à coût égal."
    ],
    "examples": [
      {
        "stdin": "OSPF_CONFIG ref_bw=10000\nPATH id=PATH_A hops=1000,1000,1000\nPATH id=PATH_B hops=10000,100\nPATH id=PATH_C hops=10000,10000",
        "expected": "OSPF_PATH id=PATH_A total_cost=30 hops_count=3 status=BACKUP_PATH\nOSPF_PATH id=PATH_B total_cost=101 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=PATH_C total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_ROUTE best_path=PATH_C metric=2",
        "note": "PATH_C traverse deux liens 10G (coût 1 + 1 = 2) et bat PATH_A (coût 10+10+10 = 30)."
      }
    ],
    "tests": [
      {
        "label": "Bande passante de référence par défaut 100 Mbps sans différenciation au-delà",
        "stdin": "cas:1",
        "expected": "OSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH\nOSPF_ROUTE best_path=P1 metric=2"
      },
      {
        "label": "Chemin à saut unique très rapide surpassant un chemin multi-sauts",
        "stdin": "cas:2",
        "expected": "OSPF_PATH id=CUIVRE total_cost=20 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=FIBRE total_cost=1 hops_count=1 status=BEST_PATH\nOSPF_ROUTE best_path=FIBRE metric=1"
      },
      {
        "label": "Liaisons lentes pénalisées (T1/E1)",
        "stdin": "cas:3",
        "expected": "OSPF_PATH id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH\nOSPF_PATH id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH\nOSPF_ROUTE best_path=DETOUR_FAST metric=20"
      }
    ],
    "solution": "[Exemple]\nOSPF_PATH id=PATH_A total_cost=30 hops_count=3 status=BACKUP_PATH\nOSPF_PATH id=PATH_B total_cost=101 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=PATH_C total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_ROUTE best_path=PATH_C metric=2\n\n[Cas 1 — Bande passante de référence par défaut 100 Mbps sans différenciation au-delà]\nOSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH\nOSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH\nOSPF_ROUTE best_path=P1 metric=2\n\n[Cas 2 — Chemin à saut unique très rapide surpassant un chemin multi-sauts]\nOSPF_PATH id=CUIVRE total_cost=20 hops_count=2 status=BACKUP_PATH\nOSPF_PATH id=FIBRE total_cost=1 hops_count=1 status=BEST_PATH\nOSPF_ROUTE best_path=FIBRE metric=1\n\n[Cas 3 — Liaisons lentes pénalisées (T1/E1)]\nOSPF_PATH id=DETOUR_FAST total_cost=20 hops_count=2 status=BEST_PATH\nOSPF_PATH id=DIRECT_SLOW total_cost=500 hops_count=1 status=BACKUP_PATH\nOSPF_ROUTE best_path=DETOUR_FAST metric=20",
    "takeaway": "À retenir : Calculer le coût OSPF cumulé de chemins concurrents à partir de la bande passante de référence.\nRepère : PATH_C traverse deux liens 10G (coût 1 + 1 = 2) et bat PATH_A (coût 10+10+10 = 30)."
  },
  {
    "id": "lan3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "La lecture des LSAs du siège de Calorix",
    "exampleTitle": "Exemple résolu — les LSAs du réseau de la mairie de Tréville",
    "goal": "Classer les LSAs d'une base d'états de liens par type (1 à 5) à partir de leur contenu et de leur émetteur.",
    "brief": "<p><strong>Énoncé.</strong> Calorix, fabricant de matériel de chauffage, exploite un domaine OSPF à deux aires : l'aire 0 (cœur, siège) et l'aire 1 (usine). Le routeur interne R-INT1, situé dans l'aire 1, affiche sa base d'états de liens. L'ingénieur relève les cinq entrées suivantes :</p><table><tr><th>Entrée</th><th>Contenu</th><th>Émise par</th></tr><tr><th>LSA-a</th><td>Les liens de R-INT1 dans l'aire 1</td><td>R-INT1</td></tr><tr><th>LSA-b</th><td>Les routeurs raccordés au réseau multi-accès 10.1.1.0/24 (segment dont R-ABR1 est le DR)</td><td>R-ABR1</td></tr><tr><th>LSA-c</th><td>Le réseau 10.20.0.0/16 de l'aire 0, annoncé à l'aire 1</td><td>R-ABR1</td></tr><tr><th>LSA-d</th><td>La localisation de l'ASBR R-ASBR (situé dans l'aire 0) pour les routeurs de l'aire 1</td><td>R-ABR1</td></tr><tr><th>LSA-e</th><td>La route externe 0.0.0.0/0 vers le fournisseur Internet, redistribuée</td><td>R-ASBR</td></tr></table><p>Rappel du cours : type 1 (Router LSA, un routeur décrit ses liens dans son aire) ; type 2 (Network LSA, le DR décrit un segment multi-accès) ; type 3 (Network Summary, un ABR annonce un réseau d'une autre aire) ; type 4 (ASBR Summary, un ABR annonce la route vers un ASBR) ; type 5 (AS External, un ASBR annonce une route externe). Les types 1 et 2 ne quittent jamais leur aire de départ.</p><p>Répondez par le numéro du type (un chiffre entre 1 et 5).</p><ol><li>Quel est le type du LSA-a ?</li><li>Quel est le type du LSA-b ?</li><li>Quel est le type du LSA-c ?</li><li>Quel est le type du LSA-d ?</li><li>Quel est le type du LSA-e ?</li></ol>",
    "starter": "# Exercice — La lecture des LSAs du siège de Calorix\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Chaque réponse est le numéro du type de LSA (1 à 5).\n\n[Question 1 — Type du LSA-a]\nA_COMPLETER\n\n[Question 2 — Type du LSA-b]\nA_COMPLETER\n\n[Question 3 — Type du LSA-c]\nA_COMPLETER\n\n[Question 4 — Type du LSA-d]\nA_COMPLETER\n\n[Question 5 — Type du LSA-e]\nA_COMPLETER\n",
    "hints": [
      "Identifiez l'émetteur : un routeur ordinaire, un DR, un ABR ou un ASBR n'émettent pas les mêmes types.",
      "Un LSA dont le contenu est un réseau situé dans une autre aire est un résumé d'ABR ; s'il décrit un segment local multi-accès, c'est le DR qui parle.",
      "1. LSA-a : un routeur décrit ses propres liens dans son aire. 2. LSA-b : un DR décrit son segment. 3. LSA-c : un ABR résume un réseau d'une autre aire. 4. LSA-d : un ABR indique où trouver un ASBR. 5. LSA-e : un ASBR redistribue une route externe."
    ],
    "examples": [
      {
        "stdin": "La mairie de Tréville exploite un domaine OSPF à deux aires.\nLSA-x : les liens de R-Mairie dans l'aire 1.\nLSA-y : les routeurs du segment 10.9.9.0/24, émis par le DR.\nLSA-z : le réseau 10.8.0.0/16 de l'aire 0, annoncé dans l'aire 1 par R-ABR.\nLSA-w : la route vers l'ASBR du siège, annoncée dans l'aire 1 par R-ABR.\nLSA-v : la route externe du réseau des écoles, redistribuée par l'ASBR.\n\n1) LSA-x : type 1 (Router LSA).\n2) LSA-y : type 2 (Network LSA du DR).\n3) LSA-z : type 3 (résumé de réseau par l'ABR).\n4) LSA-w : type 4 (résumé vers l'ASBR).\n5) LSA-v : type 5 (route externe).",
        "expected": "x : type 1 — y : type 2 — z : type 3 — w : type 4 — v : type 5",
        "note": "Les types 1 et 2 restent confinés dans leur aire ; seuls les résumés (types 3 et 4) et les externes (type 5) traversent les frontières."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type du LSA-a",
        "stdin": "q:1",
        "expected": "1||type 1||LSA 1||le type 1"
      },
      {
        "label": "Question 2 — Type du LSA-b",
        "stdin": "q:2",
        "expected": "2||type 2||LSA 2||le type 2"
      },
      {
        "label": "Question 3 — Type du LSA-c",
        "stdin": "q:3",
        "expected": "3||type 3||LSA 3||le type 3"
      },
      {
        "label": "Question 4 — Type du LSA-d",
        "stdin": "q:4",
        "expected": "4||type 4||LSA 4||le type 4"
      },
      {
        "label": "Question 5 — Type du LSA-e",
        "stdin": "q:5",
        "expected": "5||type 5||LSA 5||le type 5"
      }
    ],
    "solution": "[Question 1 — Type du LSA-a]\n1\n\n[Question 2 — Type du LSA-b]\n2\n\n[Question 3 — Type du LSA-c]\n3\n\n[Question 4 — Type du LSA-d]\n4\n\n[Question 5 — Type du LSA-e]\n5",
    "takeaway": "1) LSA-a : un routeur décrit ses liens dans sa propre aire : Router LSA, type 1.\n2) LSA-b : le DR du segment multi-accès 10.1.1.0/24 décrit les routeurs raccordés : Network LSA, type 2.\n3) LSA-c : l'ABR annonce à l'aire 1 un réseau de l'aire 0 : Network Summary, type 3.\n4) LSA-d : l'ABR annonce la localisation d'un ASBR : ASBR Summary, type 4.\n5) LSA-e : l'ASBR redistribue une route externe (0.0.0.0/0 vers Internet) : AS External, type 5.\nContrôle : les cinq types majeurs sont présents une fois chacun ; les types 1 et 2 ne quittent pas l'aire 1, les types 3, 4 et 5 y arrivent par l'ABR ou l'ASBR."
  },
  {
    "id": "lan3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Les aires spéciales de l'agence de Montferand",
    "exampleTitle": "Exemple résolu — les aires OSPF du groupement Verchant",
    "goal": "Choisir une aire OSPF spéciale (stub, totally stubby, NSSA) selon les besoins d'une agence et compter les LSAs restants.",
    "brief": "<p><strong>Énoncé.</strong> Montferand est une agence bancaire reliée au siège par un lien de 20 Mbit/s. Son aire OSPF 51 reçoit aujourd'hui : 12 LSAs de type 3 (réseaux des autres aires), 4 LSAs de type 4 (localisations d'ASBR) et 6 LSAs de type 5 (routes externes), en plus des LSAs internes de l'agence. Le responsable réseau veut alléger la table de routage des routeurs de l'agence, avec deux contraintes : les postes de l'agence ne consomment aucune route externe, mais l'agence doit pouvoir annoncer une route externe vers un partenaire de sauvegarde qui y est raccordé.</p><p>Rappel du cours : une aire stub supprime les LSAs de type 5 (routes externes) et conserve les types 3 ; une aire totalement stub (totally stubby) supprime aussi les types 3 et 4, ne laissant qu'une route par défaut injectée par l'ABR ; une aire NSSA autorise un ASBR interne : les routes externes y entrent sous forme de LSAs de type 7, que l'ABR convertit en type 5 vers le reste du domaine.</p><p>Répondez par le nom de l'aire (questions 1 à 3), le nombre seul (question 4) ou un court libellé (question 5).</p><ol><li>L'agence n'a besoin d'aucune route externe mais souhaite garder les routes inter-aires : quelle aire spéciale suffit ?</li><li>Pour supprimer aussi les LSAs de type 3 et 4, quel type d'aire l'administrateur configure-t-il ?</li><li>L'agence doit annoncer sa route externe vers le partenaire : quelle aire spéciale le permet ?</li><li>Après passage en aire totalement stub, combien de LSAs de type 3 décrivant les réseaux des autres aires restent-ils dans l'aire 51 ?</li><li>Quelle route l'ABR injecte-t-il dans une aire totalement stub pour assurer la sortie vers le reste du domaine ?</li></ol>",
    "starter": "# Exercice — Les aires spéciales de l'agence de Montferand\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nom de l'aire. Question 4 : le nombre seul.\n# Question 5 : un court libellé.\n\n[Question 1 — Aire spéciale supprimant les types 5 seulement]\nA_COMPLETER\n\n[Question 2 — Aire supprimant aussi les types 3 et 4]\nA_COMPLETER\n\n[Question 3 — Aire autorisant un ASBR interne]\nA_COMPLETER\n\n[Question 4 — LSAs de type 3 restants en aire totalement stub]\nA_COMPLETER\n\n[Question 5 — Route injectée par l'ABR dans une aire totalement stub]\nA_COMPLETER\n",
    "hints": [
      "Classez les besoins : supprimer les externes (stub), supprimer aussi les inter-aires (totally stubby), ou injecter des externes locales (NSSA).",
      "L'aire totalement stub remplace tous les résumés par une unique route vers l'ABR.",
      "1. L'agence garde les types 3 : l'aire stub suffit. 2. Totally stubby chasse aussi les types 3 et 4. 3. Le type 7 est propre aux NSSA. 4. Aucun résumé de réseau distant ne survit. 5. Une seule route suffit à sortir de l'aire."
    ],
    "examples": [
      {
        "stdin": "Le groupement Verchant exploite une aire distante 60.\nBesoins : supprimer les routes externes (LSA type 5) tout en gardant les réseaux\nintersites (type 3), puis annoncer une route externe d'un partenaire local.\n\n1) Supprimer les types 5 seulement : aire stub.\n2) Supprimer aussi les types 3 et 4 : aire totalement stub.\n3) Annoncer une externe locale : aire NSSA (LSA type 7 converti en type 5 par l'ABR).\n4) En aire totalement stub, aucun LSA de type 3 de réseau distant ne reste.\n5) L'ABR injecte une route par défaut (0.0.0.0/0).",
        "expected": "stub — totally stub — NSSA (type 7) — 0 LSA de type 3 restant — route par défaut",
        "note": "Le type 7 n'existe que dans les NSSA : c'est le véhicule local des routes externes, converti en type 5 au passage de l'ABR."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Aire spéciale supprimant les types 5 seulement",
        "stdin": "q:1",
        "expected": "stub||aire stub||une aire stub||stub area"
      },
      {
        "label": "Question 2 — Aire supprimant aussi les types 3 et 4",
        "stdin": "q:2",
        "expected": "totally stubby||totally stub||aire totalement stub||totalement stub||aire totally stubby||totally stubby area"
      },
      {
        "label": "Question 3 — Aire autorisant un ASBR interne",
        "stdin": "q:3",
        "expected": "NSSA||aire NSSA||une aire NSSA||not-so-stubby"
      },
      {
        "label": "Question 4 — LSAs de type 3 restants en aire totalement stub",
        "stdin": "q:4",
        "expected": "0||aucun||aucun LSA"
      },
      {
        "label": "Question 5 — Route injectée par l'ABR dans une aire totalement stub",
        "stdin": "q:5",
        "expected": "une route par défaut||la route par défaut||0.0.0.0/0||une route par defaut||route par défaut"
      }
    ],
    "solution": "[Question 1 — Aire spéciale supprimant les types 5 seulement]\nstub\n\n[Question 2 — Aire supprimant aussi les types 3 et 4]\ntotally stubby\n\n[Question 3 — Aire autorisant un ASBR interne]\nNSSA\n\n[Question 4 — LSAs de type 3 restants en aire totalement stub]\n0\n\n[Question 5 — Route injectée par l'ABR dans une aire totalement stub]\nune route par défaut",
    "takeaway": "1) L'aire stub supprime les LSAs de type 5 (routes externes) tout en conservant les types 3 : elle suffit au besoin décrit.\n2) Pour chasser aussi les types 3 et 4, il faut une aire totalement stub (totally stubby).\n3) L'agence doit annoncer une route externe locale : seule l'aire NSSA autorise un ASBR interne (routes portées en type 7, converties en type 5 par l'ABR).\n4) En aire totalement stub, aucun LSA de type 3 décrivant les réseaux d'autres aires n'est admis : il en reste 0.\n5) L'ABR injecte une route par défaut, qui dirige vers lui tout le trafic sortant de l'aire.\nContrôle : l'agence de Montferand combine les deux contraintes en choisissant une NSSA si la route du partenaire doit être annoncée ; sinon une aire totalement stub serait la plus légère."
  },
  {
    "id": "lan3-c5-e1",
    "chapter": 5,
    "title": "Contrôleur de Port Security et détection de violation (Protect, Restrict, Shutdown)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler le mécanisme Cisco Port Security et les modes de réaction face aux adresses MAC non autorisées.",
    "brief": "<p>La fonctionnalité <strong>Port Security</strong> limite les adresses MAC autorisées sur un port à celles qui sont configurées ou apprises, jusqu'au quota <code>max_mac</code>.<br><br>\nPour une trame non autorisée, ce modèle distingue trois modes :<br>\n- <strong>protect :</strong> la trame est détruite sans alerte ni incrément de compteur ; le port reste <code>UP</code> (<code>action=DROP_SILENT</code>).<br>\n- <strong>restrict :</strong> la trame est détruite, le compteur et l'alerte sont activés ; le port reste <code>UP</code> (<code>action=DROP_ALERT</code>).<br>\n- <strong>shutdown :</strong> le port passe en <code>ERR_DISABLE</code> (<code>action=PORT_SHUTDOWN</code>). Dans ce scénario sans rétablissement, les trames suivantes sont rejetées avec <code>action=DROP state=ERR_DISABLE</code>.<br><br>\nEn pratique, après diagnostic et correction de la cause, une réactivation manuelle (<code>shutdown</code> puis <code>no shutdown</code>) ou une récupération automatique configurée peut être possible selon la plateforme.<br><br>\nChaque cas commence par <code>PORT_SEC port=&lt;port&gt; max_mac=&lt;quota&gt; mode=&lt;protect|restrict|shutdown&gt; sticky_macs=&lt;adresses|NONE&gt;</code>, suivi des trames <code>FRAME id=&lt;nom&gt; src_mac=&lt;mac&gt;</code>.<br>\nPour chaque trame, afficher :<br>\n<code>PORT_SEC_REPORT id={id} port={port} mac={src_mac} status={PERMIT|VIOLATION|PORT_DOWN} action={action} state={state}</code></p>",
    "starter": "# Grille d'analyse (lan3-c5-e1) — Contrôleur de Port Security et détection de violation (Protect, Restrict, Shutdown)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode restrict conservant le port UP avec drop et alerte]\n# Données : PORT_SEC port=Gi0/1 max_mac=1 mode=restrict sticky_macs=00:00:00:00:00:01\n# Données : FRAME id=R1 src_mac=00:00:00:00:00:01\n# Données : FRAME id=R2 src_mac=00:00:00:00:00:99\n# Données : FRAME id=R3 src_mac=00:00:00:00:00:01\nA_COMPLETER\n\n[Cas 2 — Mode protect silencieux]\n# Données : PORT_SEC port=Fa0/5 max_mac=1 mode=protect sticky_macs=NONE\n# Données : FRAME id=P1 src_mac=00:50:56:00:00:01\n# Données : FRAME id=P2 src_mac=00:50:56:00:00:02\nA_COMPLETER\n\n[Cas 3 — Apprentissage dynamique jusqu'à max_mac=2]\n# Données : PORT_SEC port=Eth1 max_mac=2 mode=shutdown sticky_macs=NONE\n# Données : FRAME id=D1 src_mac=00:01:02:03:04:01\n# Données : FRAME id=D2 src_mac=00:01:02:03:04:02\n# Données : FRAME id=D3 src_mac=00:01:02:03:04:03\nA_COMPLETER\n",
    "hints": [
      "Le mécanisme de sécurité Port Security surveille le nombre d’adresses MAC distinctes autorisées sur un port de commutateur.",
      "Si une adresse inconnue dépasse le quota, seul le mode shutdown du scénario place le port en err-disable.",
      "Vérifiez si le nombre d adresses MAC apprises dépasse max_mac : protect ignore sans log, restrict ignore avec compteur, shutdown désactive le port."
    ],
    "examples": [
      {
        "stdin": "PORT_SEC port=Fa0/1 max_mac=1 mode=shutdown sticky_macs=00:11:22:33:44:01\nFRAME id=F1 src_mac=00:11:22:33:44:01\nFRAME id=F2 src_mac=00:aa:bb:cc:dd:02\nFRAME id=F3 src_mac=00:11:22:33:44:01",
        "expected": "PORT_SEC_REPORT id=F1 port=Fa0/1 mac=00:11:22:33:44:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=F2 port=Fa0/1 mac=00:aa:bb:cc:dd:02 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE\nPORT_SEC_REPORT id=F3 port=Fa0/1 mac=00:11:22:33:44:01 status=PORT_DOWN action=DROP state=ERR_DISABLE",
        "note": "F1 est autorisée ; F2 déclenche le shutdown du port ; F3 arrive sur un port désactivé."
      }
    ],
    "tests": [
      {
        "label": "Mode restrict conservant le port UP avec drop et alerte",
        "stdin": "cas:1",
        "expected": "PORT_SEC_REPORT id=R1 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=R2 port=Gi0/1 mac=00:00:00:00:00:99 status=VIOLATION action=DROP_ALERT state=UP\nPORT_SEC_REPORT id=R3 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP"
      },
      {
        "label": "Mode protect silencieux",
        "stdin": "cas:2",
        "expected": "PORT_SEC_REPORT id=P1 port=Fa0/5 mac=00:50:56:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=P2 port=Fa0/5 mac=00:50:56:00:00:02 status=VIOLATION action=DROP_SILENT state=UP"
      },
      {
        "label": "Apprentissage dynamique jusqu'à max_mac=2",
        "stdin": "cas:3",
        "expected": "PORT_SEC_REPORT id=D1 port=Eth1 mac=00:01:02:03:04:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D2 port=Eth1 mac=00:01:02:03:04:02 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D3 port=Eth1 mac=00:01:02:03:04:03 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE"
      }
    ],
    "solution": "[Exemple]\nPORT_SEC_REPORT id=F1 port=Fa0/1 mac=00:11:22:33:44:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=F2 port=Fa0/1 mac=00:aa:bb:cc:dd:02 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE\nPORT_SEC_REPORT id=F3 port=Fa0/1 mac=00:11:22:33:44:01 status=PORT_DOWN action=DROP state=ERR_DISABLE\n\n[Cas 1 — Mode restrict conservant le port UP avec drop et alerte]\nPORT_SEC_REPORT id=R1 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=R2 port=Gi0/1 mac=00:00:00:00:00:99 status=VIOLATION action=DROP_ALERT state=UP\nPORT_SEC_REPORT id=R3 port=Gi0/1 mac=00:00:00:00:00:01 status=PERMIT action=FORWARD state=UP\n\n[Cas 2 — Mode protect silencieux]\nPORT_SEC_REPORT id=P1 port=Fa0/5 mac=00:50:56:00:00:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=P2 port=Fa0/5 mac=00:50:56:00:00:02 status=VIOLATION action=DROP_SILENT state=UP\n\n[Cas 3 — Apprentissage dynamique jusqu'à max_mac=2]\nPORT_SEC_REPORT id=D1 port=Eth1 mac=00:01:02:03:04:01 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D2 port=Eth1 mac=00:01:02:03:04:02 status=PERMIT action=FORWARD state=UP\nPORT_SEC_REPORT id=D3 port=Eth1 mac=00:01:02:03:04:03 status=VIOLATION action=PORT_SHUTDOWN state=ERR_DISABLE",
    "takeaway": "À retenir : Simuler le mécanisme Cisco Port Security et les modes de réaction face aux adresses MAC non autorisées.\nRepère : F1 est autorisée ; F2 déclenche le shutdown du port ; F3 arrive sur un port désactivé."
  },
  {
    "id": "lan3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "La base de liaisons DHCP Snooping de la résidence Néolis",
    "exampleTitle": "Exemple résolu — le DHCP Snooping du siège de Fontenay",
    "goal": "Exploiter la base de liaisons DHCP Snooping (ports de confiance, entrées, expiration) pour protéger l'attribution des adresses.",
    "brief": "<p><strong>Énoncé.</strong> Néolis opère une résidence de 240 logements étudiants : chaque chambre dispose d'une prise RJ45 raccordée à un commutateur d'étage. Le VLAN 60 (logements) est protégé par DHCP Snooping : seules la liaison montante vers le serveur DHCP institutionnel (port Gi1/0/24) et la liaison vers le routeur sont déclarées de confiance ; toutes les prises chambres sont non approuvées. La base de liaisons contient :</p><table><tr><th>Adresse MAC</th><th>Adresse IP attribuée</th><th>VLAN</th><th>Port</th><th>Bail</th></tr><tr><th>00:1a:2b:3c:4d:01</th><td>10.60.0.11</td><td>60</td><td>Gi0/3</td><td>12 h</td></tr><tr><th>00:1a:2b:3c:4d:02</th><td>10.60.0.12</td><td>60</td><td>Gi0/4</td><td>12 h</td></tr><tr><th>00:1a:2b:3c:4d:03</th><td>10.60.0.13</td><td>60</td><td>Gi0/5</td><td>12 h</td></tr></table><p>Rappel du cours : DHCP Snooping distingue les messages clients (DISCOVER, REQUEST), acceptés sur les ports non approuvés avec une limitation de débit, des messages serveur (OFFER, ACK, NAK), rejetés sur tout port non approuvé. La base de liaisons enregistre le couple adresse MAC / adresse IP de chaque bail, avec le port et le VLAN ; l'entrée est retirée à l'expiration du bail.</p><p>Répondez par un court libellé, le nombre seul, ou « oui » / « non » (question 5).</p><ol><li>Sur quel type de port les messages émis par un serveur DHCP (OFFER, ACK) sont-ils acceptés ?</li><li>Un étudiant branche un routeur grand public (serveur DHCP pirate) sur sa prise : que fait le commutateur de ses DHCPOFFER ?</li><li>Combien d'entrées la base de liaisons contient-elle ?</li><li>Le bail de la machine 10.60.0.13 expire sans renouvellement : que devient l'entrée correspondante ?</li><li>Les messages DHCPDISCOVER d'un poste, envoyés sur sa prise non approuvée, sont-ils bloqués ?</li></ol>",
    "starter": "# Exercice — La base de liaisons DHCP Snooping de la résidence Néolis\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 4 : un court libellé. Question 3 : le nombre seul.\n# Question 5 : oui ou non.\n\n[Question 1 — Type de port acceptant les messages serveur]\nA_COMPLETER\n\n[Question 2 — Sort réservé aux DHCPOFFER du routeur pirate]\nA_COMPLETER\n\n[Question 3 — Nombre d'entrées de la base]\nA_COMPLETER\n\n[Question 4 — Devenir de l'entrée à l'expiration du bail]\nA_COMPLETER\n\n[Question 5 — Les DHCPDISCOVER sont-ils bloqués ?]\nA_COMPLETER\n",
    "hints": [
      "Le filtrage ne vise que les messages de type serveur : OFFER, ACK et NAK ne peuvent venir que d'un port de confiance.",
      "La base de liaisons suit les baux : une ligne par adresse attribuée, retirée quand le bail meurt.",
      "1. Seuls les ports déclarés de confiance acceptent les messages serveur. 2. La prise de l'étudiant est non approuvée. 3. Comptez les lignes du tableau. 4. Le bail de 12 h expire sans renouvellement. 5. Les messages clients passent, avec limitation de débit."
    ],
    "examples": [
      {
        "stdin": "Le siège de Fontenay protège son VLAN 15 par DHCP Snooping.\nSeuls le port vers le serveur DHCP (Gi1/0/1) et le port vers le routeur (Gi1/0/2) sont de confiance.\nLa base contient : 00:2b:3c:4d:5e:01 → 10.15.0.21 (Gi0/1) et 00:2b:3c:4d:5e:02 → 10.15.0.22 (Gi0/2).\n\n1) Les OFFER d'un serveur pirate branché en Gi0/10 sont rejetées : port non approuvé.\n2) La base compte 2 entrées.\n3) À l'expiration d'un bail, l'entrée est retirée de la base.\n4) Les DISCOVER des clients passent sur les ports non approuvés (avec limitation de débit).",
        "expected": "OFFER rejetées sur port non approuvé — 2 entrées — bail expiré : entrée retirée — DISCOVER transmis",
        "note": "Le filtrage ne vise que les messages de type serveur : le client légitime continue d'obtenir ses bails via le port approuvé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type de port acceptant les messages serveur",
        "stdin": "q:1",
        "expected": "les ports de confiance||les ports approuvés||les ports approuves||ports de confiance||trusted||les ports trusted"
      },
      {
        "label": "Question 2 — Sort réservé aux DHCPOFFER du routeur pirate",
        "stdin": "q:2",
        "expected": "il les rejette||ils sont rejetés||rejetées||rejetes||bloquées||bloquees||supprimées||supprimees"
      },
      {
        "label": "Question 3 — Nombre d'entrées de la base",
        "stdin": "q:3",
        "expected": "3"
      },
      {
        "label": "Question 4 — Devenir de l'entrée à l'expiration du bail",
        "stdin": "q:4",
        "expected": "elle est supprimée||supprimée||supprimee||elle est retirée||retirée||elle est effacée||effacée"
      },
      {
        "label": "Question 5 — Les DHCPDISCOVER sont-ils bloqués ?",
        "stdin": "q:5",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Type de port acceptant les messages serveur]\nles ports de confiance\n\n[Question 2 — Sort réservé aux DHCPOFFER du routeur pirate]\nil les rejette\n\n[Question 3 — Nombre d'entrées de la base]\n3\n\n[Question 4 — Devenir de l'entrée à l'expiration du bail]\nelle est supprimée\n\n[Question 5 — Les DHCPDISCOVER sont-ils bloqués ?]\nnon",
    "takeaway": "1) Les messages serveur (OFFER, ACK, NAK) ne sont acceptés que sur les ports de confiance, ici Gi1/0/24 et la liaison vers le routeur.\n2) Le routeur pirate est branché sur une prise non approuvée : ses DHCPOFFER sont rejetées par le commutateur.\n3) La base de liaisons contient 3 entrées (10.60.0.11, 10.60.0.12 et 10.60.0.13).\n4) Le bail de 10.60.0.13 expire sans renouvellement : l'entrée est retirée de la base.\n5) Non : les messages clients (DISCOVER, REQUEST) sont transmis depuis les prises non approuvées, avec une limitation de débit.\nContrôle : la table reflète exactement les baux actifs du VLAN 60 ; un poste dont le bail expire disparaît de la base jusqu'à son prochain bail."
  },
  {
    "id": "lan3-c5-e3",
    "chapter": 5,
    "title": "Filtre anti-usurpation Dynamic ARP Inspection (DAI)",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser des trames ARP en les comparant à des liaisons fournies, sans conclure à une attaque sur ce seul indice.",
    "brief": "<p>Un empoisonnement de cache ARP peut détourner certaines communications si un attaquant parvient à faire accepter une fausse liaison. <strong>Dynamic ARP Inspection (DAI)</strong> vérifie les messages ARP sur les ports non fiables selon les liaisons DHCP ou les ACL ARP configurées.<br><br>\nDans cette grille simplifiée, tous les messages proviennent de ports non fiables et seules les liaisons <code>BINDING</code> fournies sont utilisées ; aucune ACL ARP n'est modélisée. Une différence de liaison ne prouve pas une attaque : elle peut aussi résulter d'une configuration erronée ou périmée. Les actions et alertes ci-dessous sont celles du modèle, pas une garantie sur chaque commutateur.<br><br>\n1. Si <code>(sender_mac, sender_ip, vlan)</code> correspond à une liaison : <code>status=PERMIT action=FORWARD reason=BINDING_MATCH</code>.<br>\n2. Si <code>sender_ip</code> est enregistré pour ce VLAN avec une autre MAC : <code>status=DENY action=DROP_ALERT reason=BINDING_MISMATCH</code>.<br>\n3. Si <code>sender_ip</code> n'est pas enregistré pour ce VLAN : <code>status=DENY action=DROP reason=UNKNOWN_HOST_BINDING</code>.<br><br>\nPour chaque message, indiquez : <code>DAI_AUDIT id={id} vlan={vlan} sender_ip={sender_ip} sender_mac={sender_mac} status={status} action={action} reason={reason}</code>.</p>",
    "starter": "# Grille d'analyse (lan3-c5-e3) — Filtre anti-usurpation Dynamic ARP Inspection (DAI)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — VLANs multiples avec la même IP privée dans des domaines isolés]\n# Données : BINDING mac=00:00:00:00:00:01 ip=10.0.0.1 vlan=10\n# Données : BINDING mac=00:00:00:00:00:02 ip=10.0.0.1 vlan=20\n# Données : ARP_FRAME id=A1 vlan=10 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254\n# Données : ARP_FRAME id=A2 vlan=20 sender_mac=00:00:00:00:00:01 sender_ip=10.0.0.1 target_ip=10.0.0.254\nA_COMPLETER\n\n[Cas 2 — Requête conforme à la liaison]\n# Données : BINDING mac=00:22:33:44:55:66 ip=172.16.10.5 vlan=5\n# Données : ARP_FRAME id=OK vlan=5 sender_mac=00:22:33:44:55:66 sender_ip=172.16.10.5 target_ip=172.16.10.1\nA_COMPLETER\n\n[Cas 3 — Hôte absent de la base de ce VLAN]\n# Données : BINDING mac=00:11:11:11:11:11 ip=192.168.1.5 vlan=1\n# Données : ARP_FRAME id=UNKNOWN vlan=1 sender_mac=00:99:99:99:99:99 sender_ip=192.168.1.200 target_ip=192.168.1.1\nA_COMPLETER\n",
    "hints": [
      "Normalisez les adresses MAC en minuscules.",
      "Comparez chaque couple (vlan, sender_ip) à la MAC enregistrée dans les liaisons fournies.",
      "Comparez exactement le triplet (MAC, IP, port) de la trame ARP avec la table de liaison DHCP Snooping fournie ; toute discordance reste un indice à corréler."
    ],
    "examples": [
      {
        "stdin": "BINDING mac=00:11:22:33:44:01 ip=192.168.1.10 vlan=10\nBINDING mac=00:11:22:33:44:02 ip=192.168.1.20 vlan=10\nARP_FRAME id=ARP1 vlan=10 sender_mac=00:11:22:33:44:01 sender_ip=192.168.1.10 target_ip=192.168.1.1\nARP_FRAME id=ARP2 vlan=10 sender_mac=00:aa:bb:cc:dd:ee sender_ip=192.168.1.10 target_ip=192.168.1.20\nARP_FRAME id=ARP3 vlan=10 sender_mac=00:11:22:33:44:99 sender_ip=192.168.1.99 target_ip=192.168.1.1",
        "expected": "DAI_AUDIT id=ARP1 vlan=10 sender_ip=192.168.1.10 sender_mac=00:11:22:33:44:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=ARP2 vlan=10 sender_ip=192.168.1.10 sender_mac=00:aa:bb:cc:dd:ee status=DENY action=DROP_ALERT reason=BINDING_MISMATCH\nDAI_AUDIT id=ARP3 vlan=10 sender_ip=192.168.1.99 sender_mac=00:11:22:33:44:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING",
        "note": "ARP1 correspond à la liaison ; ARP2 présente une MAC différente ; ARP3 n'a pas de liaison dans ce VLAN."
      }
    ],
    "tests": [
      {
        "label": "VLANs multiples avec la même IP privée dans des domaines isolés",
        "stdin": "cas:1",
        "expected": "DAI_AUDIT id=A1 vlan=10 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=A2 vlan=20 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=DENY action=DROP_ALERT reason=BINDING_MISMATCH"
      },
      {
        "label": "Requête conforme à la liaison",
        "stdin": "cas:2",
        "expected": "DAI_AUDIT id=OK vlan=5 sender_ip=172.16.10.5 sender_mac=00:22:33:44:55:66 status=PERMIT action=FORWARD reason=BINDING_MATCH"
      },
      {
        "label": "Hôte absent de la base de ce VLAN",
        "stdin": "cas:3",
        "expected": "DAI_AUDIT id=UNKNOWN vlan=1 sender_ip=192.168.1.200 sender_mac=00:99:99:99:99:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING"
      }
    ],
    "solution": "[Exemple]\nDAI_AUDIT id=ARP1 vlan=10 sender_ip=192.168.1.10 sender_mac=00:11:22:33:44:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=ARP2 vlan=10 sender_ip=192.168.1.10 sender_mac=00:aa:bb:cc:dd:ee status=DENY action=DROP_ALERT reason=BINDING_MISMATCH\nDAI_AUDIT id=ARP3 vlan=10 sender_ip=192.168.1.99 sender_mac=00:11:22:33:44:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING\n\n[Cas 1 — VLANs multiples avec la même IP privée dans des domaines isolés]\nDAI_AUDIT id=A1 vlan=10 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=PERMIT action=FORWARD reason=BINDING_MATCH\nDAI_AUDIT id=A2 vlan=20 sender_ip=10.0.0.1 sender_mac=00:00:00:00:00:01 status=DENY action=DROP_ALERT reason=BINDING_MISMATCH\n\n[Cas 2 — Requête conforme à la liaison]\nDAI_AUDIT id=OK vlan=5 sender_ip=172.16.10.5 sender_mac=00:22:33:44:55:66 status=PERMIT action=FORWARD reason=BINDING_MATCH\n\n[Cas 3 — Hôte absent de la base de ce VLAN]\nDAI_AUDIT id=UNKNOWN vlan=1 sender_ip=192.168.1.200 sender_mac=00:99:99:99:99:99 status=DENY action=DROP reason=UNKNOWN_HOST_BINDING",
    "takeaway": "À retenir : Analyser des trames ARP en les comparant à des liaisons fournies, sans conclure à une attaque sur ce seul indice.\nRepère : ARP1 correspond à la liaison ; ARP2 présente une MAC différente ; ARP3 n'a pas de liaison dans ce VLAN."
  },
  {
    "id": "lan3-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le marquage CoS et DSCP de la voix sur le réseau d'Helvétia",
    "exampleTitle": "Exemple résolu — le marquage du campus de Rivalta",
    "goal": "Mettre en correspondance les marquages de niveau 2 (CoS 802.1p) et de niveau 3 (DSCP) du plan de QoS d'une entreprise.",
    "brief": "<p><strong>Énoncé.</strong> Helvétia, assurance de 500 collaborateurs, déploie la téléphonie sur IP sur son réseau unique. Le plan de QoS marque les flux au niveau 2 par la valeur CoS (champ de 3 bits de l'en-tête 802.1Q) et au niveau 3 par le DSCP (6 bits du champ ToS de l'en-tête IP). Le plan de classification validé par la DSI est :</p><table><tr><th>Flux</th><th>CoS 802.1p</th><th>DSCP cible</th></tr><tr><th>Voix (RTP)</th><td>5</td><td>EF (46)</td></tr><tr><th>Signalisation d'appel</th><td>3</td><td>AF31 (26)</td></tr><tr><th>Visioconférence</th><td>4</td><td>AF41 (34)</td></tr><tr><th>Données métier</th><td>2</td><td>AF21 (18)</td></tr><tr><th>Navigation web</th><td>0</td><td>0</td></tr></table><p>Rappels du cours : la valeur CoS voyage dans le tag 802.1Q de la trame ; le DSCP est codé dans l'en-tête IP. Les classes CS valent 8 × n (CS0 = 0, CS1 = 8, etc.), la classe EF vaut 46, et une classe AFxy vaut 8 × x + 2 × y.</p><p>Répondez par le nom et la valeur, ou le nombre seul.</p><ol><li>Dans quel élément de la trame Ethernet la valeur CoS est-elle transportée ?</li><li>Quel DSCP (nom et valeur) correspond au flux voix ?</li><li>Quelle est la valeur numérique du DSCP AF41 ?</li><li>La signalisation d'appel est marquée AF31 : quelle est sa valeur numérique ?</li><li>Quel DSCP (valeur numérique) reçoit le trafic best effort (CoS 0) ?</li></ol>",
    "starter": "# Exercice — Le marquage CoS et DSCP de la voix sur le réseau d'Helvétia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : un court libellé. Question 2 : le nom du DSCP et sa valeur.\n# Questions 3 à 5 : le nombre seul.\n\n[Question 1 — Transport de la valeur CoS dans la trame]\nA_COMPLETER\n\n[Question 2 — DSCP du flux voix]\nA_COMPLETER\n\n[Question 3 — Valeur numérique du DSCP AF41]\nA_COMPLETER\n\n[Question 4 — Valeur numérique du DSCP AF31]\nA_COMPLETER\n\n[Question 5 — DSCP du trafic best effort]\nA_COMPLETER\n",
    "hints": [
      "La CoS est un marquage de niveau 2 : elle vit dans la trame, pas dans le paquet IP.",
      "Une classe AFxy se calcule : 8 × x + 2 × y ; par exemple AF41 = 8 × 4 + 2 × 1.",
      "1. Le champ de 3 bits se trouve dans le tag ajouté aux trames VLAN. 2. La voix utilise la classe réservée EF. 3. AF41 : appliquez la formule. 4. AF31 : même formule. 5. Le trafic sans exigence reçoit la valeur nulle."
    ],
    "examples": [
      {
        "stdin": "Le campus de Rivalta applique le marquage suivant.\nVisioconférence : CoS 4 → AF41 = 8 × 4 + 2 × 1 = 34.\nDonnées de gestion : CoS 1 → AF11 = 8 × 1 + 2 × 1 = 10.\nSignalisation : CoS 3 → AF31 = 8 × 3 + 2 × 1 = 26.\nVoix : CoS 5 → EF = 46.\n\n1) AF41 vaut 34, AF11 vaut 10.\n2) La CoS voyage dans le tag 802.1Q de la trame.\n3) Le best effort (CoS 0) reçoit le DSCP 0 (CS0).",
        "expected": "AF41 : 34 — AF11 : 10 — CoS portée par le tag 802.1Q — best effort : DSCP 0",
        "note": "Un flux conserve son marquage de bout en bout : la CoS sert au niveau 2 (commutation), le DSCP au niveau 3 (routage)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Transport de la valeur CoS dans la trame",
        "stdin": "q:1",
        "expected": "le tag 802.1Q||l'en-tête 802.1Q||l'entete 802.1Q||le champ CoS du tag 802.1Q||dans le tag 802.1Q||802.1Q"
      },
      {
        "label": "Question 2 — DSCP du flux voix",
        "stdin": "q:2",
        "expected": "EF (46)||EF||46||EF 46||Expedited Forwarding"
      },
      {
        "label": "Question 3 — Valeur numérique du DSCP AF41",
        "stdin": "q:3",
        "expected": "34"
      },
      {
        "label": "Question 4 — Valeur numérique du DSCP AF31",
        "stdin": "q:4",
        "expected": "26"
      },
      {
        "label": "Question 5 — DSCP du trafic best effort",
        "stdin": "q:5",
        "expected": "0||CS0||0 (CS0)||BE"
      }
    ],
    "solution": "[Question 1 — Transport de la valeur CoS dans la trame]\nle tag 802.1Q\n\n[Question 2 — DSCP du flux voix]\nEF (46)\n\n[Question 3 — Valeur numérique du DSCP AF41]\n34\n\n[Question 4 — Valeur numérique du DSCP AF31]\n26\n\n[Question 5 — DSCP du trafic best effort]\n0",
    "takeaway": "1) La valeur CoS (3 bits) est transportée dans le tag 802.1Q ajouté à la trame Ethernet sur les liens VLAN.\n2) Le flux voix est marqué EF (Expedited Forwarding), valeur DSCP 46.\n3) AF41 = 8 × 4 + 2 × 1 = 34.\n4) AF31 = 8 × 3 + 2 × 1 = 26.\n5) Le trafic best effort (CoS 0) reçoit le DSCP 0 (CS0).\nContrôle : les valeurs AF suivent toutes la formule 8x + 2y (34, 26, 18) ; la voix sort du schéma AF avec EF = 46."
  },
  {
    "id": "lan3-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "L'ordonnancement des files du commutateur d'étage de Norpareil",
    "exampleTitle": "Exemple résolu — l'ordonnancement du stade d'Aquarum",
    "goal": "Comparer les ordonnanceurs de files (priorité stricte, round robin pondéré) et calculer les parts de débit et le risque d'affamement.",
    "brief": "<p><strong>Énoncé.</strong> Norpareil, logisticien de 700 salariés, fait transiter voix et données par le même commutateur d'étage SW-ET7. Sa sortie vers le cœur de réseau est gérée par quatre files d'attente :</p><table><tr><th>File</th><th>Flux transportés</th><th>Ordonnanceur</th><th>Poids</th></tr><tr><th>File 4</th><td>Voix (DSCP EF)</td><td>priorité stricte</td><td>—</td></tr><tr><th>File 1</th><td>Données métier</td><td>WRR</td><td>5</td></tr><tr><th>File 2</th><td>Flux transactionnels</td><td>WRR</td><td>3</td></tr><tr><th>File 3</th><td>Navigation web</td><td>WRR</td><td>2</td></tr></table><p>Rappel du cours : la priorité stricte sert la file prioritaire dès qu'elle contient des paquets, avant toutes les autres ; le round robin pondéré (WRR) sert à tour de rôle chaque file, un cycle complet servant la somme des poids. La part de débit d'une file WRR vaut son poids divisé par la somme des poids actifs.</p><p>Répondez par un court libellé (questions 1 et 5) ou le nombre seul (questions 2 à 4, parts en pourcentage).</p><ol><li>Quel type d'ordonnanceur sert la file 4 ?</li><li>Lors d'un cycle WRR complet, combien de paquets sont servis au total sur les files 1 à 3 ?</li><li>Quelle part du débit disponible (en %) la file 1 reçoit-elle ?</li><li>Quelle part du débit (en %) la file 3 reçoit-elle ?</li><li>Quel risque court le trafic des files 1 à 3 si le flux voix sature la liaison ?</li></ol>",
    "starter": "# Exercice — L'ordonnancement des files du commutateur d'étage de Norpareil\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 5 : un court libellé. Questions 2 à 4 : le nombre seul.\n\n[Question 1 — Ordonnanceur de la file 4]\nA_COMPLETER\n\n[Question 2 — Paquets servis par cycle WRR complet]\nA_COMPLETER\n\n[Question 3 — Part de débit de la file 1 (en %)]\nA_COMPLETER\n\n[Question 4 — Part de débit de la file 3 (en %)]\nA_COMPLETER\n\n[Question 5 — Risque pour les files 1 à 3 si la voix sature le lien]\nA_COMPLETER\n",
    "hints": [
      "Deux mécanismes cohabitent : un service immédiat pour la voix, un partage pondéré pour le reste.",
      "Un cycle WRR sert 5 paquets de la file 1, 3 de la file 2 et 2 de la file 3 : comptez le total.",
      "1. La voix est servie avant tout le monde. 2. Additionnez les poids. 3. 5 sur le total des poids. 4. 2 sur le total des poids. 5. Si une file prioritaire ne vide jamais, que restent-ils aux autres ?"
    ],
    "examples": [
      {
        "stdin": "Le stade d'Aquarum gère sa sortie réseau par quatre files.\nFile 4 (billetterie temps réel) : priorité stricte.\nFiles 1 à 3 (WRR) : poids 4, 4 et 2.\n\n1) La file 4 est servie par priorité stricte.\n2) Un cycle WRR complet sert 4 + 4 + 2 = 10 paquets.\n3) Parts : file 1 = 40 %, file 2 = 40 %, file 3 = 20 %.\n4) Si la billetterie sature la liaison, les files WRR s'affament.",
        "expected": "priorité stricte — cycle : 10 paquets — parts : 40 / 40 / 20 % — risque : affamement",
        "note": "Le WRR garantit une part minimale à chaque file, contrairement à la priorité stricte qui peut affamer les autres."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ordonnanceur de la file 4",
        "stdin": "q:1",
        "expected": "priorité stricte||priorite stricte||strict priority||la priorité stricte||SP"
      },
      {
        "label": "Question 2 — Paquets servis par cycle WRR complet",
        "stdin": "q:2",
        "expected": "10"
      },
      {
        "label": "Question 3 — Part de débit de la file 1 (en %)",
        "stdin": "q:3",
        "expected": "50||50 %||50%"
      },
      {
        "label": "Question 4 — Part de débit de la file 3 (en %)",
        "stdin": "q:4",
        "expected": "20||20 %||20%"
      },
      {
        "label": "Question 5 — Risque pour les files 1 à 3 si la voix sature le lien",
        "stdin": "q:5",
        "expected": "l'affamement||affamement||la famine||starvation||l'affamement des autres files"
      }
    ],
    "solution": "[Question 1 — Ordonnanceur de la file 4]\npriorité stricte\n\n[Question 2 — Paquets servis par cycle WRR complet]\n10\n\n[Question 3 — Part de débit de la file 1 (en %)]\n50\n\n[Question 4 — Part de débit de la file 3 (en %)]\n20\n\n[Question 5 — Risque pour les files 1 à 3 si la voix sature le lien]\nl'affamement",
    "takeaway": "1) La file 4 (voix) est servie par priorité stricte : elle passe avant toutes les autres dès qu'elle contient des paquets.\n2) Un cycle WRR complet sert 5 + 3 + 2 = 10 paquets.\n3) Part de la file 1 : 5/10 = 50 % du débit alloué aux files WRR.\n4) Part de la file 3 : 2/10 = 20 %.\n5) Si le flux voix sature la liaison, les files 1 à 3 risquent l'affamement (starvation) : la priorité stricte ne leur laisse aucun créneau garanti.\nContrôle : 50 % + 30 % + 20 % = 100 % du débit restant après service de la voix."
  },
  {
    "id": "lan3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La cartographie LLDP du plateau technique de Datagora",
    "exampleTitle": "Exemple résolu — l'inventaire LLDP de l'hôpital de Sanzel",
    "goal": "Exploiter les informations publiées par LLDP (norme 802.1AB, TLV système, port, capacités, adresse de gestion) pour documenter un réseau réel.",
    "brief": "<p><strong>Énoncé.</strong> Datagora héberge un plateau technique mutualisé entre plusieurs clients. Le technicien d'exploitation collecte la table des voisins LLDP du commutateur SW-TECH, qui annonce ses trames toutes les 30 secondes et conserve une entrée quatre fois plus longtemps. La table affiche :</p><table><tr><th>Port local</th><th>Voisin annoncé</th><th>Port distant</th><th>Capacités annoncées</th><th>Adresse de gestion</th></tr><tr><th>Gi1/0/1</th><td>SW-COEUR</td><td>Te0/1</td><td>bridge</td><td>10.0.0.11</td></tr><tr><th>Gi1/0/2</th><td>SW-ACC4</td><td>Gi0/24</td><td>bridge</td><td>10.0.0.14</td></tr><tr><th>Gi1/0/13</th><td>R-BAORD</td><td>Gi0/2</td><td>router</td><td>10.0.0.21</td></tr></table><p>Rappel du cours : LLDP (norme IEEE 802.1AB) publie des informations sous forme de TLV : nom du système, description du port, capacités (bridge, router, etc.) et adresse de gestion. La table des voisins documente le raccordement exact (« qui est branché sur quel port ») sans transporter aucun trafic utilisateur ; une entrée est purgée si aucune trame n'est reçue pendant le temps de conservation.</p><p>Répondez par la norme, le nombre seul, le nom du port ou l'adresse IP.</p><ol><li>Quelle norme IEEE décrit LLDP ?</li><li>Combien de voisins LLDP SW-TECH a-t-il découverts ?</li><li>Par quel port local SW-TECH est-il raccordé au routeur R-BAORD ?</li><li>Quelle adresse de gestion le voisin SW-COEUR annonce-t-il ?</li><li>Après combien de secondes, sans nouvelle trame, une entrée de voisin est-elle purgée (intervalle 30 s, multiplicateur 4) ?</li></ol>",
    "starter": "# Exercice — La cartographie LLDP du plateau technique de Datagora\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 4 : la norme, le port ou l'adresse. Questions 2 et 5 : le nombre seul.\n\n[Question 1 — Norme IEEE décrivant LLDP]\nA_COMPLETER\n\n[Question 2 — Nombre de voisins découverts]\nA_COMPLETER\n\n[Question 3 — Port local raccordé à R-BAORD]\nA_COMPLETER\n\n[Question 4 — Adresse de gestion annoncée par SW-COEUR]\nA_COMPLETER\n\n[Question 5 — Temps de purge d'une entrée (en secondes)]\nA_COMPLETER\n",
    "hints": [
      "LLDP est normalisé par l'IEEE sous un numéro de norme dédié, souvent confondu avec 802.1Q.",
      "Chaque ligne de la table correspond à un voisin découvert sur un port local précis.",
      "1. La norme porte la référence 802.1AB. 2. Comptez les lignes. 3. Cherchez la ligne du routeur. 4. La TLV de gestion porte une IP. 5. Temps de conservation = intervalle × multiplicateur."
    ],
    "examples": [
      {
        "stdin": "L'hôpital de Sanzel collecte la table LLDP de SW-BLOC-B.\nGi0/1 : voisin SW-NET-CORE, port distant Gi1/0/9, bridge, gestion 10.5.0.9.\nGi0/2 : voisin SW-ONCO, port distant Gi0/49, bridge, gestion 10.5.0.30.\nGi0/24 : voisin R-PACS (routeur), port distant Gi0/1, router, gestion 10.5.0.50.\n\n1) Trois voisins découverts.\n2) Le voisin raccordé sur Gi0/24 est R-PACS.\n3) SW-NET-CORE annonce la gestion 10.5.0.9.\n4) Hold time = 30 × 4 = 120 s.",
        "expected": "3 voisins — R-PACS sur Gi0/24 — gestion de SW-NET-CORE : 10.5.0.9 — hold time 120 s",
        "note": "LLDP se contente de publier l'identité et le point de raccordement des voisins : il ne route et ne commute aucun trafic utilisateur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Norme IEEE décrivant LLDP",
        "stdin": "q:1",
        "expected": "802.1AB||IEEE 802.1AB||la norme 802.1AB"
      },
      {
        "label": "Question 2 — Nombre de voisins découverts",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Port local raccordé à R-BAORD",
        "stdin": "q:3",
        "expected": "Gi1/0/13||gi1/0/13||le port Gi1/0/13"
      },
      {
        "label": "Question 4 — Adresse de gestion annoncée par SW-COEUR",
        "stdin": "q:4",
        "expected": "10.0.0.11"
      },
      {
        "label": "Question 5 — Temps de purge d'une entrée (en secondes)",
        "stdin": "q:5",
        "expected": "120||120 s||120 secondes"
      }
    ],
    "solution": "[Question 1 — Norme IEEE décrivant LLDP]\n802.1AB\n\n[Question 2 — Nombre de voisins découverts]\n3\n\n[Question 3 — Port local raccordé à R-BAORD]\nGi1/0/13\n\n[Question 4 — Adresse de gestion annoncée par SW-COEUR]\n10.0.0.11\n\n[Question 5 — Temps de purge d'une entrée (en secondes)]\n120",
    "takeaway": "1) LLDP est décrit par la norme IEEE 802.1AB.\n2) La table liste trois voisins : SW-COEUR, SW-ACC4 et R-BAORD.\n3) Le routeur R-BAORD est raccordé au port local Gi1/0/13 (port distant Gi0/2).\n4) SW-COEUR annonce l'adresse de gestion 10.0.0.11 dans sa TLV dédiée.\n5) Temps de conservation = intervalle × multiplicateur = 30 × 4 = 120 secondes sans nouvelle trame avant purge.\nContrôle : trois lignes, trois voisins distincts ; les adresses de gestion annoncées (10.0.0.11, 10.0.0.14, 10.0.0.21) sont toutes joignables pour l'exploitation."
  }
];
