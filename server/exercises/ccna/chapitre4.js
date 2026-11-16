'use strict';

module.exports = [
  {
    "id": "na2-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "La première session console du routeur de l'agence Crédilienne",
    "exampleTitle": "Exemple résolu — la session console du commutateur du port",
    "goal": "Naviguer la hiérarchie des modes Cisco IOS en lisant une transcription console réelle.",
    "brief": "<p><strong>Énoncé.</strong> L'agence bancaire Crédilienne ouvre une succursale et reçoit son routeur Cisco neuf. L'administrateur le raccorde en console, puis saisit sa première séquence de configuration. Voici la transcription exacte de la session :</p><pre>Router&gt; enable\nRouter# configure terminal\nRouter(config)# hostname R1\nR1(config)# interface GigabitEthernet0/0\nR1(config-if)# ip address 10.8.20.1 255.255.255.0\nR1(config-if)# exit\nR1(config)# line vty 0 4\nR1(config-line)# end\nR1#</pre><p>Rappel du cours : l'invite de commande identifie le mode courant ; <code>exit</code> remonte d'un cran, <code>end</code> (ou Ctrl+Z) ramène directement au mode privilégié ; la configuration saisie vit en RAM (running-config) tant qu'elle n'est pas copiée en NVRAM. Répondez par le mot, l'invite ou la commande exacte.</p><ol><li>Dans quel mode se trouve l'administrateur juste après la commande enable ?</li><li>Quelle invite correspond au mode de configuration globale, une fois le routeur renommé ?</li><li>Quelle invite s'affiche après la commande interface GigabitEthernet0/0 ?</li><li>Que fait la commande end ?</li><li>Quelle commande sauvegarde la configuration en NVRAM ?</li></ol>",
    "starter": "# Exercice — La première session console du routeur de l'agence Crédilienne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot, l'invite ou la commande exacte, sans commentaire.\n\n[Question 1 — Mode atteint après enable]\nA_COMPLETER\n\n[Question 2 — Invite du mode de configuration globale]\nA_COMPLETER\n\n[Question 3 — Invite après interface GigabitEthernet0/0]\nA_COMPLETER\n\n[Question 4 — Rôle de la commande end]\nA_COMPLETER\n\n[Question 5 — Commande de sauvegarde en NVRAM]\nA_COMPLETER\n",
    "hints": [
      "Les invites se lisent comme des pancartes : le chevron seul annonce le mode utilisateur, le dièse le mode privilégié, (config)# la configuration globale et (config-if)# le sous-mode interface.",
      "hostname change le nom de l'équipement dans toutes les invites suivantes : après cette commande, le routeur s'appelle R1 dans chaque prompt.",
      "end ne redescend pas d'un cran comme exit : il quitte tous les sous-modes d'un coup ; la sauvegarde se fait par copy running-config startup-config (alias write memory)."
    ],
    "examples": [
      {
        "stdin": "Au port de plaisance, un commutateur neuf est configuré en console :\nSwitch&gt; enable\nSwitch# configure terminal\nSwitch(config)# hostname SW-QUAI\nSW-QUAI(config)# line console 0\nSW-QUAI(config-line)# exit\nSW-QUAI(config)# end\nSW-QUAI#\n\n1) Après enable : mode privilégié (invite Switch#).\n2) Configuration globale : SW-QUAI(config)#.\n3) line console 0 ouvre le sous-mode ligne : SW-QUAI(config-line)#.\n4) exit remonte d'un cran vers (config)# ; end saute directement au mode privilégié.\n5) Sauvegarde : copy running-config startup-config.",
        "expected": "enable — (config)# globale — (config-line)# console — end : retour direct au privilégié — copy running-config startup-config",
        "note": "Le nom d'entreprise dans l'invite change après hostname : chaque prompt qui suit porte le nouveau nom."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mode atteint après enable",
        "stdin": "q:1",
        "expected": "le mode privilégié||mode privilégié||le mode privileged exec||privileged exec||le mode d'exécution privilégié"
      },
      {
        "label": "Question 2 — Invite du mode de configuration globale",
        "stdin": "q:2",
        "expected": "R1(config)#||R1 (config)#"
      },
      {
        "label": "Question 3 — Invite après interface GigabitEthernet0/0",
        "stdin": "q:3",
        "expected": "R1(config-if)#||R1 (config-if)#"
      },
      {
        "label": "Question 4 — Rôle de la commande end",
        "stdin": "q:4",
        "expected": "elle ramène directement au mode privilégié||revient directement au mode privilégié||quitte tous les sous-modes pour revenir au mode privilégié||ramène directement au mode privilégié"
      },
      {
        "label": "Question 5 — Commande de sauvegarde en NVRAM",
        "stdin": "q:5",
        "expected": "copy running-config startup-config||write memory||copy run start"
      }
    ],
    "solution": "[Question 1 — Mode atteint après enable]\nle mode privilégié\n\n[Question 2 — Invite du mode de configuration globale]\nR1(config)#\n\n[Question 3 — Invite après interface GigabitEthernet0/0]\nR1(config-if)#\n\n[Question 4 — Rôle de la commande end]\nelle ramène directement au mode privilégié\n\n[Question 5 — Commande de sauvegarde en NVRAM]\ncopy running-config startup-config",
    "takeaway": "1) enable fait passer du mode utilisateur au mode privilégié (Router#).\n2) La configuration globale s'annonce par R1(config)# — le nom a changé après hostname R1.\n3) interface GigabitEthernet0/0 ouvre le sous-mode interface : R1(config-if)#.\n4) end quitte tous les sous-modes d'un coup et ramène directement au mode privilégié R1#.\n5) copy running-config startup-config copie la RAM vers la NVRAM (alias write memory).\nContrôle : la transcription se termine par R1# — l'invite du mode privilégié, exactement là où end devait nous déposer."
  },
  {
    "id": "na2-c4-e2",
    "chapter": 4,
    "title": "Audit et durcissement de configuration Cisco IOS",
    "level": "n2",
    "language": "analyse",
    "goal": "Relever la présence de cinq commandes dans un modèle simplifié de configuration Cisco.",
    "brief": "<p>Dans ce modèle simplifié, vérifiez uniquement la présence des commandes suivantes pour chaque cas :<br>\n1. <code>PASSWORD_ENCRYPTION</code> : <code>service password-encryption</code>.<br>\n2. <code>ENABLE_SECRET</code> : <code>enable secret &lt;mot_de_passe&gt;</code> ; <code>enable password</code> ne compte pas.<br>\n3. <code>SSH_ONLY</code> : <code>transport input ssh</code> dans le bloc <code>line vty</code> indiqué.<br>\n4. <code>BANNER_MOTD</code> : <code>banner motd</code>.<br>\n5. <code>LOGIN_LOCAL</code> : <code>login local</code> sur la console ou les lignes VTY indiquées.<br>\nPour chaque critère, utilisez <code>[VALIDE] &lt;NOM_REGLE&gt; : Commande presente</code> ou <code>[ECHEC] &lt;NOM_REGLE&gt; : Commande absente</code>.<br>\nTerminez par <code>SCORE DE PRESENCE: &lt;X&gt;/5 -&gt; CRITERES_REUNIS</code> si les cinq commandes sont présentes, sinon <code>CRITERES_INCOMPLETS</code>.<br>\nCe contrôle ne permet pas de déterminer le type de secret, la conformité juridique ou la sécurité globale de l'équipement.</p>",
    "starter": "# Grille d'analyse (na2-c4-e2) — Audit et durcissement de configuration Cisco IOS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Configuration non sécurisée avec Telnet et mot de passe en clair]\n# Données : enable password cisco\n# Données : line vty 0 4\n# Données :  transport input telnet\n# Données :  login\nA_COMPLETER\n\n[Cas 2 — Durcissement partiel avec mot de passe secret et chiffrement mais sans SSH]\n# Données : service password-encryption\n# Données : enable secret Secr3tKey\n# Données : banner motd #Avertissement#\n# Données : line con 0\n# Données :  login local\nA_COMPLETER\n\n[Cas 3 — Enable password en clair en doublon avec secret]\n# Données : service password-encryption\n# Données : enable secret SuperSec\n# Données : enable password Faible123\n# Données : banner motd *Stop*\n# Données : line vty 0 4\n# Données :  transport input ssh\n# Données :  login local\nA_COMPLETER\n\n[Cas 4 — SSH configuré avec transport input all]\n# Données : service password-encryption\n# Données : enable secret Cl3\n# Données : line vty 0 4\n# Données :  transport input all\n# Données : banner motd #Warning#\nA_COMPLETER\n",
    "hints": [
      "Le type 7 est un masquage faible et réversible ; la présence de enable secret ne révèle pas son type.",
      "Analyser le contexte de bloc \"line vty 0 4\" pour vérifier le transport SSH.",
      "Inspectez chaque ligne de configuration pour vérifier la présence exacte de service password-encryption, enable secret, banner motd, transport input ssh et ip ssh version 2."
    ],
    "examples": [
      {
        "stdin": "service password-encryption\nenable secret Cisc0$ecr3t\nbanner motd #ACCES INTERDIT#\nline con 0\n login local\nline vty 0 4\n transport input ssh\n login local",
        "expected": "[VALIDE] PASSWORD_ENCRYPTION : Commande presente\n[VALIDE] ENABLE_SECRET : Commande presente\n[VALIDE] SSH_ONLY : Commande presente\n[VALIDE] BANNER_MOTD : Commande presente\n[VALIDE] LOGIN_LOCAL : Commande presente\nSCORE DE PRESENCE: 5/5 -> CRITERES_REUNIS",
        "note": "Les cinq commandes sont présentes dans ce modèle ; le résultat ne certifie pas la sécurité de l'équipement."
      }
    ],
    "tests": [
      {
        "label": "Configuration non sécurisée avec Telnet et mot de passe en clair",
        "stdin": "cas:1",
        "expected": "[ECHEC] PASSWORD_ENCRYPTION : Commande absente\n[ECHEC] ENABLE_SECRET : Commande absente\n[ECHEC] SSH_ONLY : Commande absente\n[ECHEC] BANNER_MOTD : Commande absente\n[ECHEC] LOGIN_LOCAL : Commande absente\nSCORE DE PRESENCE: 0/5 -> CRITERES_INCOMPLETS"
      },
      {
        "label": "Durcissement partiel avec mot de passe secret et chiffrement mais sans SSH",
        "stdin": "cas:2",
        "expected": "[VALIDE] PASSWORD_ENCRYPTION : Commande presente\n[VALIDE] ENABLE_SECRET : Commande presente\n[ECHEC] SSH_ONLY : Commande absente\n[VALIDE] BANNER_MOTD : Commande presente\n[VALIDE] LOGIN_LOCAL : Commande presente\nSCORE DE PRESENCE: 4/5 -> CRITERES_INCOMPLETS"
      },
      {
        "label": "Enable password en clair en doublon avec secret",
        "stdin": "cas:3",
        "expected": "[VALIDE] PASSWORD_ENCRYPTION : Commande presente\n[VALIDE] ENABLE_SECRET : Commande presente\n[VALIDE] SSH_ONLY : Commande presente\n[VALIDE] BANNER_MOTD : Commande presente\n[VALIDE] LOGIN_LOCAL : Commande presente\nSCORE DE PRESENCE: 5/5 -> CRITERES_REUNIS"
      },
      {
        "label": "SSH configuré avec transport input all",
        "stdin": "cas:4",
        "expected": "[VALIDE] PASSWORD_ENCRYPTION : Commande presente\n[VALIDE] ENABLE_SECRET : Commande presente\n[ECHEC] SSH_ONLY : Commande absente\n[VALIDE] BANNER_MOTD : Commande presente\n[ECHEC] LOGIN_LOCAL : Commande absente\nSCORE DE PRESENCE: 3/5 -> CRITERES_INCOMPLETS"
      }
    ],
    "solution": "[Exemple]\n[VALIDE] PASSWORD_ENCRYPTION : Commande presente\n[VALIDE] ENABLE_SECRET : Commande presente\n[VALIDE] SSH_ONLY : Commande presente\n[VALIDE] BANNER_MOTD : Commande presente\n[VALIDE] LOGIN_LOCAL : Commande presente\nSCORE DE PRESENCE: 5/5 -> CRITERES_REUNIS\n\n[Cas 1 — Configuration non sécurisée avec Telnet et mot de passe en clair]\n[ECHEC] PASSWORD_ENCRYPTION : Commande absente\n[ECHEC] ENABLE_SECRET : Commande absente\n[ECHEC] SSH_ONLY : Commande absente\n[ECHEC] BANNER_MOTD : Commande absente\n[ECHEC] LOGIN_LOCAL : Commande absente\nSCORE DE PRESENCE: 0/5 -> CRITERES_INCOMPLETS\n\n[Cas 2 — Durcissement partiel avec mot de passe secret et chiffrement mais sans SSH]\n[VALIDE] PASSWORD_ENCRYPTION : Commande presente\n[VALIDE] ENABLE_SECRET : Commande presente\n[ECHEC] SSH_ONLY : Commande absente\n[VALIDE] BANNER_MOTD : Commande presente\n[VALIDE] LOGIN_LOCAL : Commande presente\nSCORE DE PRESENCE: 4/5 -> CRITERES_INCOMPLETS\n\n[Cas 3 — Enable password en clair en doublon avec secret]\n[VALIDE] PASSWORD_ENCRYPTION : Commande presente\n[VALIDE] ENABLE_SECRET : Commande presente\n[VALIDE] SSH_ONLY : Commande presente\n[VALIDE] BANNER_MOTD : Commande presente\n[VALIDE] LOGIN_LOCAL : Commande presente\nSCORE DE PRESENCE: 5/5 -> CRITERES_REUNIS\n\n[Cas 4 — SSH configuré avec transport input all]\n[VALIDE] PASSWORD_ENCRYPTION : Commande presente\n[VALIDE] ENABLE_SECRET : Commande presente\n[ECHEC] SSH_ONLY : Commande absente\n[VALIDE] BANNER_MOTD : Commande presente\n[ECHEC] LOGIN_LOCAL : Commande absente\nSCORE DE PRESENCE: 3/5 -> CRITERES_INCOMPLETS",
    "takeaway": "À retenir : Relever la présence de cinq commandes dans un modèle simplifié de configuration Cisco.\nRepère : Les cinq commandes sont présentes dans ce modèle ; le résultat ne certifie pas la sécurité de l'équipement."
  },
  {
    "id": "na2-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le diagnostic des interfaces de la succursale du Crédilienne",
    "exampleTitle": "Exemple résolu — le diagnostic du routeur de la station balnéaire",
    "goal": "Lire un show ip interface brief et traduire chaque couple Status/Protocol en diagnostic opérationnel.",
    "brief": "<p><strong>Énoncé.</strong> La succursale du Crédilienne se plaint : « le réseau est mort ». L'administrateur se connecte au routeur <code>R1</code> de la succursale et lance <code>show ip interface brief</code>. Voici la sortie exacte :</p><pre>Interface              IP-Address      OK? Method Status                Protocol\nGigabitEthernet0/0     10.3.1.1        YES manual up                    up\nGigabitEthernet0/1     10.3.2.1        YES manual up                    down\nGigabitEthernet0/2     unassigned      YES unset  administratively down down\nSerial0/0/0            172.16.5.2      YES manual down                  down</pre><p>Rappel du cours : la colonne Status décrit la couche 1, la colonne Protocol la couche 2 ; « administratively down » signifie l'interface verrouillée par commande ; « up/down » évoque un problème d'encapsulation. Répondez par le mot ou la commande exacte.</p><ol><li>Quelle interface est pleinement opérationnelle, prête à acheminer du trafic IP ?</li><li>Quel type de problème l'état « up/down » de GigabitEthernet0/1 évoque-t-il ?</li><li>Quelle interface est verrouillée administrativement ?</li><li>Quelle commande la réactive ?</li><li>Le « down/down » de Serial0/0/0 évoque quel niveau de panne ?</li><li>Combien d'interfaces peuvent réellement acheminer du trafic IP ?</li></ol>",
    "starter": "# Exercice — Le diagnostic des interfaces de la succursale du Crédilienne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot ou la commande exacte, sans commentaire.\n\n[Question 1 — Interface pleinement opérationnelle]\nA_COMPLETER\n\n[Question 2 — Type de problème de GigabitEthernet0/1]\nA_COMPLETER\n\n[Question 3 — Interface verrouillée administrativement]\nA_COMPLETER\n\n[Question 4 — Commande qui la réactive]\nA_COMPLETER\n\n[Question 5 — Niveau de panne de Serial0/0/0]\nA_COMPLETER\n\n[Question 6 — Interfaces réellement utilisables]\nA_COMPLETER\n",
    "hints": [
      "Lisez les deux colonnes comme deux ampoules : Status éclaire la couche physique, Protocol la couche liaison ; les deux doivent être allumées pour acheminer du trafic.",
      "up + down signifie « le câble est branché mais la liaison ne se négocie pas » : encodage, vitesse/duplex ou encapsulation incohérente entre les deux extrémités.",
      "administratively down n'est pas une panne matérielle : l'interface a été éteinte par commande, seul no shutdown la rallume ; down/down sans « administratively » renvoie au câblage ou à l'équipement en vis-à-vis."
    ],
    "examples": [
      {
        "stdin": "Sur le routeur de la station balnéaire, show ip interface brief renvoie :\nGi0/0 : up/up (vers le LAN des caisses)\nGi0/1 : administratively down / down\nGi0/2 : up/down (vers le switch du parking)\nSe0/0/0 : up/up (vers le siège)\n\n1) Gi0/0 et Se0/0/0 sont pleinement opérationnelles.\n2) Gi0/2 up/down : problème d'encapsulation ou de négociation, pas de câble débranché.\n3) Gi0/1 est verrouillée par commande : no shutdown la réactive.\n4) Deux interfaces seulement acheminent du trafic IP.",
        "expected": "2 interfaces opérationnelles — Gi0/2 : problème L2 — Gi0/1 : no shutdown — reste : 2 utilisables",
        "note": "Le couple Status/Protocol se traduit en action : physique, négociation, ou simple commande manquante."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Interface pleinement opérationnelle",
        "stdin": "q:1",
        "expected": "GigabitEthernet0/0||Gi0/0||g0/0||GigabitEthernet 0/0"
      },
      {
        "label": "Question 2 — Type de problème de GigabitEthernet0/1",
        "stdin": "q:2",
        "expected": "un problème d'encapsulation||un probleme d'encapsulation||un problème de couche 2||un problème de négociation||un problème d'encapsulation (couche 2)"
      },
      {
        "label": "Question 3 — Interface verrouillée administrativement",
        "stdin": "q:3",
        "expected": "GigabitEthernet0/2||Gi0/2||g0/2||GigabitEthernet 0/2"
      },
      {
        "label": "Question 4 — Commande qui la réactive",
        "stdin": "q:4",
        "expected": "no shutdown||la commande no shutdown"
      },
      {
        "label": "Question 5 — Niveau de panne de Serial0/0/0",
        "stdin": "q:5",
        "expected": "une panne physique||une panne de couche 1||couche 1||la couche 1 (physique)||une panne physique (couche 1)"
      },
      {
        "label": "Question 6 — Interfaces réellement utilisables",
        "stdin": "q:6",
        "expected": "1||une||une seule"
      }
    ],
    "solution": "[Question 1 — Interface pleinement opérationnelle]\nGigabitEthernet0/0\n\n[Question 2 — Type de problème de GigabitEthernet0/1]\nun problème d'encapsulation\n\n[Question 3 — Interface verrouillée administrativement]\nGigabitEthernet0/2\n\n[Question 4 — Commande qui la réactive]\nno shutdown\n\n[Question 5 — Niveau de panne de Serial0/0/0]\nune panne physique\n\n[Question 6 — Interfaces réellement utilisables]\n1",
    "takeaway": "1) GigabitEthernet0/0 affiche up/up : signal physique présent et protocole synchronisé, elle achemine du trafic IP.\n2) Gi0/1 est up en couche 1 mais down en couche 2 : problème d'encapsulation ou de négociation (vitesse/duplex incohérents), pas un câble débranché.\n3) GigabitEthernet0/2 est « administratively down » : verrouillée par commande.\n4) no shutdown, dans le sous-mode interface, la réactive.\n5) Serial0/0/0 est down/down sans mention administrative : panne physique (câble débranché ou équipement distant éteint), couche 1.\n6) Seule Gi0/0 est up/up : une seule interface achemine réellement du trafic IP.\nContrôle : les trois autres interfaces se répartissent les trois diagnostics du cours — L2 (Gi0/1), verrou administratif (Gi0/2), L1 (Se0/0/0) — et aucune n'a d'adresse IP utilisable en l'état."
  }
];
