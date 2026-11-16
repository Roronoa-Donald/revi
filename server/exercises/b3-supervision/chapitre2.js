'use strict';

module.exports = [
  {
    "id": "sup3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Les protocoles de collecte du nouveau campus de ValRomane",
    "exampleTitle": "Exemple résolu — le parc du centre hospitalier Saint-Roch",
    "goal": "Choisir le protocole de collecte adapté à chaque famille d'équipement et connaître les bases de SNMP.",
    "brief": "<p><strong>Énoncé.</strong> L'université ValRomane ouvre un campus neuf et l'équipe réseau doit raccorder tout le parc à la supervision centralisée. Le recensement des équipements donne :</p><table><tr><th>Famille d'équipement</th><th>Quantité</th><th>Protocoles disponibles</th></tr><tr><th>Commutateurs d'accès et de cœur</th><td>12</td><td>SNMP v2c et v3</td></tr><tr><th>Routeurs WAN</th><td>4</td><td>SNMP v2c et v3</td></tr><tr><th>Serveurs Debian</th><td>80</td><td>agent de supervision et SNMP</td></tr><tr><th>Imprimantes réseau</th><td>150</td><td>SNMP uniquement</td></tr><tr><th>Onduleurs de salle serveurs</th><td>18</td><td>SNMP uniquement</td></tr></table><p>Rappel du cours : SNMP fonctionne sur UDP ; les requêtes du superviseur interrogent l'agent de l'équipement, tandis que les interruptions (traps) sont envoyées par l'équipement vers le superviseur. SNMP v1 et v2c s'appuient sur une communauté transmise en clair ; seule la version 3 ajoute l'authentification et le chiffrement.</p><ol><li>Quel est le seul protocole de supervision disponible sur l'ensemble du parc ?</li><li>Combien d'équipements le campus compte-t-il au total ?</li><li>Quelle version de SNMP apporte l'authentification et le chiffrement des échanges ?</li><li>Sur quel port UDP le superviseur interroge-t-il un agent SNMP par défaut ?</li><li>Sur quel port UDP un équipement envoie-t-il ses traps au superviseur par défaut ?</li></ol>",
    "starter": "# Exercice — Les protocoles de collecte du nouveau campus de ValRomane\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 3 : un mot ou une version. Questions 4 et 5 : le numéro de port.\n\n[Question 1 — Protocole commun à tout le parc]\nA_COMPLETER\n\n[Question 2 — Nombre total d'équipements]\nA_COMPLETER\n\n[Question 3 — Version de SNMP chiffrée et authentifiée]\nA_COMPLETER\n\n[Question 4 — Port UDP des requêtes du superviseur]\nA_COMPLETER\n\n[Question 5 — Port UDP des traps]\nA_COMPLETER\n",
    "hints": [
      "Listez les protocoles disponibles famille par famille : celui qui figure sur toutes les lignes du tableau est le socle commun du parc.",
      "SNMP v1 et v2c n'offrent aucun chiffrement et transportent la communauté en clair ; seul SNMP v3 ajoute authentification et confidentialité.",
      "1. Cherchez le protocole présent dans chaque ligne du tableau. 2. Additionnez les quantités. 3. Comparez les garanties de v1, v2c et v3. 4. et 5. Requêtes et traps utilisent deux ports UDP distincts, 161 et 162."
    ],
    "examples": [
      {
        "stdin": "Le centre hospitalier Saint-Roch raccorde son parc : 20 commutateurs, 5 routeurs,\n40 serveurs, 60 imprimantes réseau et 10 onduleurs. Tous parlent SNMP ; les serveurs\nacceptent en plus un agent de supervision.\n\n1) Protocole commun : SNMP.\n2) Parc total : 20 + 5 + 40 + 60 + 10 = 135 équipements.\n3) La version 3 apporte authentification et chiffrement.\n4) Les requêtes partent vers le port UDP 161.\n5) Les traps arrivent sur le port UDP 162.",
        "expected": "protocole commun SNMP — 135 équipements — version 3 — requêtes UDP 161 — traps UDP 162",
        "note": "Les imprimantes et les onduleurs, qui ne peuvent héberger aucun agent, ne sont supervisables que par SNMP : c'est lui qui impose le socle commun."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Protocole commun à tout le parc",
        "stdin": "q:1",
        "expected": "snmp||le snmp||SNMP"
      },
      {
        "label": "Question 2 — Nombre total d'équipements",
        "stdin": "q:2",
        "expected": "264||264 équipements"
      },
      {
        "label": "Question 3 — Version de SNMP chiffrée et authentifiée",
        "stdin": "q:3",
        "expected": "3||v3||la version 3||snmp v3||snmpv3||SNMPv3"
      },
      {
        "label": "Question 4 — Port UDP des requêtes du superviseur",
        "stdin": "q:4",
        "expected": "161||le port 161||udp 161"
      },
      {
        "label": "Question 5 — Port UDP des traps",
        "stdin": "q:5",
        "expected": "162||le port 162||udp 162"
      }
    ],
    "solution": "[Question 1 — Protocole commun à tout le parc]\nsnmp\n\n[Question 2 — Nombre total d'équipements]\n264\n\n[Question 3 — Version de SNMP chiffrée et authentifiée]\n3\n\n[Question 4 — Port UDP des requêtes du superviseur]\n161\n\n[Question 5 — Port UDP des traps]\n162",
    "takeaway": "1) Les imprimantes et les onduleurs n'exposent que SNMP : c'est le seul protocole commun aux 264 équipements.\n2) Total : 12 + 4 + 80 + 150 + 18 = 264 équipements.\n3) SNMP v3 est la version qui authentifie les parties et chiffre les échanges ; v1 et v2c circulent en clair.\n4) Le superviseur interroge les agents sur le port UDP 161.\n5) Les traps remontent de l'équipement vers le superviseur sur le port UDP 162.\nContrôle : 12 + 4 + 80 + 150 + 18 = 264, chaque famille du recensement est comptée une seule fois."
  },
  {
    "id": "sup3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Décoder les OIDs MIB-2 du commutateur de la mairie de Portval",
    "exampleTitle": "Exemple résolu — les OIDs du routeur de la station des Trois-Pics",
    "goal": "Lire des OIDs du sous-arbre mib-2, interpréter sysUpTime, ifOperStatus et les compteurs d'octets.",
    "brief": "<p><strong>Énoncé.</strong> La mairie de Portval supervise le commutateur de sa salle technique par des interrogations <code>snmpget</code>. Toutes les valeurs lues proviennent du sous-arbre standard <code>1.3.6.1.2.1</code>. Le tableau ci-dessous rassemble les dernières interrogations :</p><table><tr><th>OID interrogé</th><th>Nom symbolique</th><th>Réponse de l'agent</th></tr><tr><th>1.3.6.1.2.1.1.3.0</th><td>sysUpTime.0</td><td>Timeticks: (12 960 000) 1 day, 12:00:00</td></tr><tr><th>1.3.6.1.2.1.2.2.1.8.1</th><td>ifOperStatus.1</td><td>Integer: 1 (up)</td></tr><tr><th>1.3.6.1.2.1.2.2.1.10.1</th><td>ifInOctets.1</td><td>Counter32: 4 294 967 295</td></tr><tr><th>1.3.6.1.2.1.2.2.1.16.1</th><td>ifOutOctets.1</td><td>Counter32: 1 842 033</td></tr></table><p>Rappels du cours : sysUpTime s'exprime en centièmes de seconde ; ifInOctets comptabilise les octets reçus par l'interface et ifOutOctets les octets émis ; un Counter32 compte modulo 4 294 967 296.</p><ol><li>À quel sous-arbre standard de la MIB appartiennent ces OIDs ?</li><li>L'agent affiche 12 960 000 centièmes de seconde de fonctionnement : cela représente combien d'heures ?</li><li>ifOperStatus.1 renvoie 1 : dans quel état opérationnel l'interface se trouve-t-elle ?</li><li>Quel type de données SNMP ifInOctets utilise-t-il, et que se passe-t-il quand il atteint 4 294 967 295 ?</li><li>Que mesure ifOutOctets.1 ?</li></ol>",
    "starter": "# Exercice — Décoder les OIDs MIB-2 du commutateur de la mairie de Portval\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le nombre d'heures seul. Les autres questions appellent un court libellé.\n\n[Question 1 — Sous-arbre MIB standard]\nA_COMPLETER\n\n[Question 2 — Durée de fonctionnement en heures]\nA_COMPLETER\n\n[Question 3 — État opérationnel de l'interface]\nA_COMPLETER\n\n[Question 4 — Type de compteur et comportement à saturation]\nA_COMPLETER\n\n[Question 5 — Ce que mesure ifOutOctets.1]\nA_COMPLETER\n",
    "hints": [
      "L'OID 1.3.6.1.2.1 est la racine du sous-arbre standard : toute interrogation qui commence par cette suite lit la même branche de la MIB.",
      "Un Timeticks compte les centièmes de seconde : divisez par 100 pour obtenir des secondes, puis par 3 600 pour des heures.",
      "1. La racine commune aux quatre OIDs se lit dans le tableau. 2. 12 960 000 / 100 = 129 600 secondes, puis divisez par 3 600. 3. ifOperStatus vaut 1 pour l'état nominal. 4. Un compteur 32 bits boucle. 5. ifOutOctets regarde le sens de sortie de l'interface."
    ],
    "examples": [
      {
        "stdin": "Le routeur de la station des Trois-Pics est interrogé par snmpget.\nsysUpTime.0 = Timeticks: (21 600 000) 2 days, 12:00:00\nifOperStatus.2 = Integer: 2 (down)\nifInOctets.3 = Counter32: 4 294 967 295\n\n1) Sous-arbre : mib-2 (1.3.6.1.2.1).\n2) 21 600 000 / 100 = 216 000 secondes = 60 heures.\n3) ifOperStatus.2 vaut 2 : l'interface est down, hors service.\n4) Le Counter32 arrive à son maximum et repart à zéro : le calcul de débit doit compenser ce repliement.\n5) ifInOctets.3 mesure les octets reçus, c'est-à-dire le trafic entrant de l'interface.",
        "expected": "sous-arbre mib-2 — 60 heures — interface down — le compteur repart à zéro — ifInOctets mesure le trafic entrant",
        "note": "ifOperStatus vaut 1 pour up et 2 pour down : c'est la première valeur à interroger pour savoir si un lien transporteur est réellement actif."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Sous-arbre MIB standard",
        "stdin": "q:1",
        "expected": "mib-2||mib2||la mib-2||MIB-2||mib 2"
      },
      {
        "label": "Question 2 — Durée de fonctionnement en heures",
        "stdin": "q:2",
        "expected": "36||36 heures||36 h"
      },
      {
        "label": "Question 3 — État opérationnel de l'interface",
        "stdin": "q:3",
        "expected": "up||l'interface est up||up (fonctionnelle)||fonctionnelle||l'interface est fonctionnelle"
      },
      {
        "label": "Question 4 — Type de compteur et comportement à saturation",
        "stdin": "q:4",
        "expected": "counter32||un counter32||compteur 32 bits||un compteur 32 bits||counter32 qui repart à zéro"
      },
      {
        "label": "Question 5 — Ce que mesure ifOutOctets.1",
        "stdin": "q:5",
        "expected": "les octets émis||le trafic sortant||les octets sortants||les octets émis par l'interface"
      }
    ],
    "solution": "[Question 1 — Sous-arbre MIB standard]\nmib-2\n\n[Question 2 — Durée de fonctionnement en heures]\n36\n\n[Question 3 — État opérationnel de l'interface]\nup\n\n[Question 4 — Type de compteur et comportement à saturation]\ncounter32\n\n[Question 5 — Ce que mesure ifOutOctets.1]\nles octets émis",
    "takeaway": "1) Les quatre OIDs commencent par 1.3.6.1.2.1 : ils appartiennent au sous-arbre mib-2, la branche standard de la MIB.\n2) 12 960 000 centièmes de seconde = 129 600 secondes = 36 heures de fonctionnement.\n3) ifOperStatus.1 vaut 1 : l'interface est up, opérationnelle et prête à transporter du trafic.\n4) ifInOctets est un Counter32 : arrivé à 4 294 967 295, il repart à zéro au prochain octet ; le calcul de débit doit détecter et compenser ce repliement.\n5) ifOutOctets.1 comptabilise les octets émis par l'interface 1, c'est-à-dire son trafic sortant.\nContrôle : 36 heures correspondent bien à la mention « 1 day, 12:00:00 » renvoyée par l'agent."
  },
  {
    "id": "sup3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Facility et sévérité : les trames syslog du pare-feu de FortVille",
    "exampleTitle": "Exemple résolu — les trames syslog de la messagerie d'Oze",
    "goal": "Décomposer une valeur PRI syslog en facility et sévérité, puis en déduire le traitement par le NOC.",
    "brief": "<p><strong>Énoncé.</strong> Le collecteur syslog du NOC reçoit les journaux du pare-feu de la ville de FortVille. Au format RFC 3164, chaque trame commence par une valeur PRI = facility × 8 + sévérité. Facilités utiles ici : 0 noyau, 3 démons (services système), 4 sécurité et authentification, 20 local4 (réservé aux équipements réseau). Échelle de sévérité : 0 urgence, 1 alerte, 2 critique, 3 erreur, 4 avertissement, 5 notification, 6 informationnel, 7 débogage. Trames reçues cette nuit :</p><table><tr><th>Trame</th><th>PRI</th><th>Message</th></tr><tr><th>A</th><td>34</td><td>pare-feu : table de sessions saturée</td></tr><tr><th>B</th><td>27</td><td>service httpd : impossible de se lier au port 80</td></tr><tr><th>C</th><td>0</td><td>kernel : panique noyau sur le routeur</td></tr><tr><th>D</th><td>165</td><td>supervision : sauvegarde de configuration terminée</td></tr></table><ol><li>Pour la trame A (PRI 34), quelle est la valeur de la facility ?</li><li>Pour la trame A, quelle est la valeur de la sévérité ?</li><li>Pour la trame B (PRI 27), à quelle famille de services la facility 3 correspond-elle ?</li><li>La trame C porte PRI 0 : quel niveau de sévérité ce message transporte-t-il ?</li><li>Quelle trame doit réveiller l'astreinte immédiatement ?</li></ol>",
    "starter": "# Exercice — Facility et sévérité : les trames syslog du pare-feu de FortVille\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 4 : la valeur ou le mot exact. Question 3 : un court libellé. Question 5 : la lettre de la trame.\n\n[Question 1 — Facility de la trame A (PRI 34)]\nA_COMPLETER\n\n[Question 2 — Sévérité de la trame A]\nA_COMPLETER\n\n[Question 3 — Famille de services de la facility 3]\nA_COMPLETER\n\n[Question 4 — Niveau de sévérité de la trame C (PRI 0)]\nA_COMPLETER\n\n[Question 5 — Trame à traiter en urgence]\nA_COMPLETER\n",
    "hints": [
      "Décomposez PRI = facility × 8 + sévérité : la facility est le quotient de la division euclidienne par 8, la sévérité en est le reste.",
      "Une sévérité 0 (urgence) signale un système inutilisable : c'est le niveau le plus grave de l'échelle syslog.",
      "1. PRI 34 = 4 × 8 + 2. 2. Le reste 2 correspond à critique. 3. PRI 27 = 3 × 8 + 3 : la facility 3 couvre les services système. 4. PRI 0 = 0 × 8 + 0, gravité maximale. 5. Comparez les sévérités des quatre trames."
    ],
    "examples": [
      {
        "stdin": "La messagerie de la ville d'Oze envoie deux trames au collecteur :\ntrame X, PRI 19 : « smtp : file d'attente saturée »\ntrame Y, PRI 86 : « authentification de l'administrateur réussie »\n\n1) PRI 19 = 2 × 8 + 3 : facility 2 (messagerie), sévérité 3 (erreur).\n2) PRI 86 = 10 × 8 + 6 : facility 10 (authpriv), sévérité 6 (informationnel).\n3) La trame X mérite un ticket sans réveiller l'astreinte ; la trame Y alimente seulement l'historique.",
        "expected": "PRI 19 : messagerie, erreur — PRI 86 : authpriv, informationnel — seule la trame X ouvre un ticket",
        "note": "Toutes les sévérités ne se valent pas : une erreur de service (3) appelle un ticket, une trace informationnelle (6) alimente seulement l'historique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Facility de la trame A (PRI 34)",
        "stdin": "q:1",
        "expected": "4||la facility 4||securite||sécurité||la sécurité"
      },
      {
        "label": "Question 2 — Sévérité de la trame A",
        "stdin": "q:2",
        "expected": "2||critique||critical||la sévérité 2"
      },
      {
        "label": "Question 3 — Famille de services de la facility 3",
        "stdin": "q:3",
        "expected": "les démons||les demons||daemon||les services système||les services systeme"
      },
      {
        "label": "Question 4 — Niveau de sévérité de la trame C (PRI 0)",
        "stdin": "q:4",
        "expected": "urgence||emergency||le niveau urgence||0 (urgence)"
      },
      {
        "label": "Question 5 — Trame à traiter en urgence",
        "stdin": "q:5",
        "expected": "la trame C||trame C||C"
      }
    ],
    "solution": "[Question 1 — Facility de la trame A (PRI 34)]\n4\n\n[Question 2 — Sévérité de la trame A]\n2\n\n[Question 3 — Famille de services de la facility 3]\nles démons\n\n[Question 4 — Niveau de sévérité de la trame C (PRI 0)]\nurgence\n\n[Question 5 — Trame à traiter en urgence]\nla trame C",
    "takeaway": "1) PRI 34 = 4 × 8 + 2 : la facility vaut 4 (sécurité et authentification).\n2) Le reste vaut 2 : la sévérité est 2, critique.\n3) PRI 27 = 3 × 8 + 3 : la facility 3 désigne les démons, les services système comme httpd.\n4) PRI 0 = 0 × 8 + 0 : le message du noyau transporte la sévérité 0, urgence, la plus grave de l'échelle.\n5) La trame C, panique noyau en sévérité urgence, doit réveiller l'astreinte immédiatement.\nContrôle : 34 = 4 × 8 + 2, 27 = 3 × 8 + 3, 0 = 0 × 8 + 0 et 165 = 20 × 8 + 5 : chaque PRI se décompose sans ambiguïté en quotient et reste de la division par 8."
  }
];
