'use strict';

module.exports = [
  {
    "id": "na2-c4-e1",
    "chapter": 4,
    "title": "Parseur et validateur de hiérarchie de modes Cisco IOS",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler la navigation entre les modes CLI Cisco IOS (User EXEC, Privileged EXEC, Global Config, Interface Config) et vérifier la validité des commandes.",
    "brief": "<p>Le script simule une session interactive Cisco IOS sur un équipement nommé <code>Router</code>.<br>\nModes possibles et leurs invites :<br>\n- <code>USER</code> : <code>Router&gt;</code><br>\n- <code>PRIVILEGED</code> : <code>Router#</code><br>\n- <code>CONFIG</code> : <code>Router(config)#</code><br>\n- <code>CONFIG_IF</code> : <code>Router(config-if)#</code><br>\nTransitions valides :<br>\n- Depuis <code>USER</code> : <code>enable</code> -&gt; <code>PRIVILEGED</code><br>\n- Depuis <code>PRIVILEGED</code> : <code>disable</code> -&gt; <code>USER</code>, <code>configure terminal</code> -&gt; <code>CONFIG</code><br>\n- Depuis <code>CONFIG</code> : <code>interface &lt;nom&gt;</code> -&gt; <code>CONFIG_IF</code>, <code>exit</code> -&gt; <code>PRIVILEGED</code>, <code>end</code> -&gt; <code>PRIVILEGED</code><br>\n- Depuis <code>CONFIG_IF</code> : <code>exit</code> -&gt; <code>CONFIG</code>, <code>end</code> -&gt; <code>PRIVILEGED</code><br>\nToute autre commande est considérée comme exécutée dans le mode courant (afficher <code>OK: &lt;cmd&gt;</code>), sauf si une commande de mode restreint est appelée dans un mode insuffisant (ex: <code>configure terminal</code> appelé en mode <code>USER</code> -&gt; afficher <code>ERREUR: Commande non autorisee en mode USER</code>).<br>\nPour chaque commande de l'entrée standard, afficher l'invite courante suivie de la commande, puis le résultat ou l'erreur, et enfin la nouvelle invite.</p>",
    "starter": "# Grille d'analyse (na2-c4-e1) — Parseur et validateur de hiérarchie de modes Cisco IOS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tentative de config terminal depuis mode utilisateur]\n# Données : configure terminal\n# Données : enable\n# Données : configure terminal\nA_COMPLETER\n\n[Cas 2 — Exécution de commandes show et ip address]\n# Données : enable\n# Données : show version\n# Données : configure terminal\n# Données : hostname R1\nA_COMPLETER\n\n[Cas 3 — Saut direct avec end depuis sous-interface]\n# Données : enable\n# Données : configure terminal\n# Données : interface fa0/1\n# Données : end\nA_COMPLETER\n\n[Cas 4 — Refus de commande interface hors mode config]\n# Données : interface g0/1\nA_COMPLETER\n",
    "hints": [
      "Utiliser une variable mode (\"USER\", \"PRIV\", \"CONF\", \"IF\") et mettre à jour l'invite après chaque transition.",
      "Les commandes \"exit\" et \"end\" permettent de remonter dans la hiérarchie."
    ],
    "examples": [
      {
        "stdin": "enable\nconfigure terminal\ninterface g0/0\nexit\nend\ndisable",
        "expected": "Router> enable\nRouter# configure terminal\nRouter(config)# interface g0/0\nRouter(config-if)# exit\nRouter(config)# end\nRouter# disable\nRouter>",
        "note": "Parcours complet de descente et remontée dans l'arborescence de configuration."
      }
    ],
    "tests": [
      {
        "label": "Tentative de config terminal depuis mode utilisateur",
        "stdin": "cas:1",
        "expected": "Router> configure terminal\nERREUR: Commande non autorisee en mode USER\nRouter> enable\nRouter# configure terminal\nRouter(config)#"
      },
      {
        "label": "Exécution de commandes show et ip address",
        "stdin": "cas:2",
        "expected": "Router> enable\nRouter# show version\nOK: show version\nRouter# configure terminal\nRouter(config)# hostname R1\nOK: hostname R1\nRouter(config)#"
      },
      {
        "label": "Saut direct avec end depuis sous-interface",
        "stdin": "cas:3",
        "expected": "Router> enable\nRouter# configure terminal\nRouter(config)# interface fa0/1\nRouter(config-if)# end\nRouter#"
      },
      {
        "label": "Refus de commande interface hors mode config",
        "stdin": "cas:4",
        "expected": "Router> interface g0/1\nERREUR: Commande non autorisee en mode USER\nRouter>"
      }
    ],
    "solution": "[Exemple]\nRouter> enable\nRouter# configure terminal\nRouter(config)# interface g0/0\nRouter(config-if)# exit\nRouter(config)# end\nRouter# disable\nRouter>\n\n[Cas 1 — Tentative de config terminal depuis mode utilisateur]\nRouter> configure terminal\nERREUR: Commande non autorisee en mode USER\nRouter> enable\nRouter# configure terminal\nRouter(config)#\n\n[Cas 2 — Exécution de commandes show et ip address]\nRouter> enable\nRouter# show version\nOK: show version\nRouter# configure terminal\nRouter(config)# hostname R1\nOK: hostname R1\nRouter(config)#\n\n[Cas 3 — Saut direct avec end depuis sous-interface]\nRouter> enable\nRouter# configure terminal\nRouter(config)# interface fa0/1\nRouter(config-if)# end\nRouter#\n\n[Cas 4 — Refus de commande interface hors mode config]\nRouter> interface g0/1\nERREUR: Commande non autorisee en mode USER\nRouter>"
  },
  {
    "id": "na2-c4-e2",
    "chapter": 4,
    "title": "Audit et durcissement de configuration Cisco IOS",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser un fichier de configuration running-config pour valider les 5 règles fondamentales de sécurisation.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nIl contrôle 5 critères de sécurité essentiels :<br>\n1. <code>PASSWORD_ENCRYPTION</code> : présence de la commande <code>service password-encryption</code>.<br>\n2. <code>ENABLE_SECRET</code> : présence de <code>enable secret &lt;mot_de_passe&gt;</code> (et NON <code>enable password</code> en clair).<br>\n3. <code>SSH_ONLY</code> : dans le bloc <code>line vty</code>, présence de <code>transport input ssh</code>.<br>\n4. <code>BANNER_MOTD</code> : présence d'une bannière d'avertissement <code>banner motd</code>.<br>\n5. <code>LOGIN_LOCAL</code> : présence de <code>login local</code> sur la console ou les lignes VTY.<br>\nIndiquez pour chaque règle :<br>\n<code>[VALIDE|ECHEC] &lt;NOM_REGLE&gt; : &lt;detail&gt;</code><br>\nPuis la conclusion : <code>SCORE DE DURCISSEMENT: &lt;X&gt;/5</code> (CONFORME si 5/5, VULNERABLE sinon).</p>",
    "starter": "# Grille d'analyse (na2-c4-e2) — Audit et durcissement de configuration Cisco IOS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Configuration non sécurisée avec Telnet et mot de passe en clair]\n# Données : enable password cisco\n# Données : line vty 0 4\n# Données :  transport input telnet\n# Données :  login\nA_COMPLETER\n\n[Cas 2 — Durcissement partiel avec mot de passe secret et chiffrement mais sans SSH]\n# Données : service password-encryption\n# Données : enable secret Secr3tKey\n# Données : banner motd #Avertissement#\n# Données : line con 0\n# Données :  login local\nA_COMPLETER\n\n[Cas 3 — Enable password en clair en doublon avec secret]\n# Données : service password-encryption\n# Données : enable secret SuperSec\n# Données : enable password Faible123\n# Données : banner motd *Stop*\n# Données : line vty 0 4\n# Données :  transport input ssh\n# Données :  login local\nA_COMPLETER\n\n[Cas 4 — SSH configuré avec transport input all]\n# Données : service password-encryption\n# Données : enable secret Cl3\n# Données : line vty 0 4\n# Données :  transport input all\n# Données : banner motd #Warning#\nA_COMPLETER\n",
    "hints": [
      "enable secret utilise un hachage MD5/SHA-256 alors qu'enable password stocke en clair ou réversible.",
      "Analyser le contexte de bloc \"line vty 0 4\" pour vérifier le transport SSH."
    ],
    "examples": [
      {
        "stdin": "service password-encryption\nenable secret Cisc0$ecr3t\nbanner motd #ACCES INTERDIT#\nline con 0\n login local\nline vty 0 4\n transport input ssh\n login local",
        "expected": "[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[VALIDE] SSH_ONLY : Transport SSH exclusif sur VTY\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[VALIDE] LOGIN_LOCAL : Authentification sur base locale\nSCORE DE DURCISSEMENT: 5/5 -> CONFORME",
        "note": "Configuration totalement conforme aux bonnes pratiques de sécurité."
      }
    ],
    "tests": [
      {
        "label": "Configuration non sécurisée avec Telnet et mot de passe en clair",
        "stdin": "cas:1",
        "expected": "[ECHEC] PASSWORD_ENCRYPTION : Chiffrement de base absent\n[ECHEC] ENABLE_SECRET : Mot de passe secret manquant ou en clair\n[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant\n[ECHEC] BANNER_MOTD : Aucune banniere MOTD\n[ECHEC] LOGIN_LOCAL : Base locale non activee\nSCORE DE DURCISSEMENT: 0/5 -> VULNERABLE"
      },
      {
        "label": "Durcissement partiel avec mot de passe secret et chiffrement mais sans SSH",
        "stdin": "cas:2",
        "expected": "[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[VALIDE] LOGIN_LOCAL : Authentification sur base locale\nSCORE DE DURCISSEMENT: 4/5 -> VULNERABLE"
      },
      {
        "label": "Enable password en clair en doublon avec secret",
        "stdin": "cas:3",
        "expected": "[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[VALIDE] SSH_ONLY : Transport SSH exclusif sur VTY\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[VALIDE] LOGIN_LOCAL : Authentification sur base locale\nSCORE DE DURCISSEMENT: 5/5 -> CONFORME"
      },
      {
        "label": "SSH configuré avec transport input all",
        "stdin": "cas:4",
        "expected": "[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[ECHEC] LOGIN_LOCAL : Base locale non activee\nSCORE DE DURCISSEMENT: 3/5 -> VULNERABLE"
      }
    ],
    "solution": "[Exemple]\n[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[VALIDE] SSH_ONLY : Transport SSH exclusif sur VTY\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[VALIDE] LOGIN_LOCAL : Authentification sur base locale\nSCORE DE DURCISSEMENT: 5/5 -> CONFORME\n\n[Cas 1 — Configuration non sécurisée avec Telnet et mot de passe en clair]\n[ECHEC] PASSWORD_ENCRYPTION : Chiffrement de base absent\n[ECHEC] ENABLE_SECRET : Mot de passe secret manquant ou en clair\n[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant\n[ECHEC] BANNER_MOTD : Aucune banniere MOTD\n[ECHEC] LOGIN_LOCAL : Base locale non activee\nSCORE DE DURCISSEMENT: 0/5 -> VULNERABLE\n\n[Cas 2 — Durcissement partiel avec mot de passe secret et chiffrement mais sans SSH]\n[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[VALIDE] LOGIN_LOCAL : Authentification sur base locale\nSCORE DE DURCISSEMENT: 4/5 -> VULNERABLE\n\n[Cas 3 — Enable password en clair en doublon avec secret]\n[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[VALIDE] SSH_ONLY : Transport SSH exclusif sur VTY\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[VALIDE] LOGIN_LOCAL : Authentification sur base locale\nSCORE DE DURCISSEMENT: 5/5 -> CONFORME\n\n[Cas 4 — SSH configuré avec transport input all]\n[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[ECHEC] LOGIN_LOCAL : Base locale non activee\nSCORE DE DURCISSEMENT: 3/5 -> VULNERABLE"
  },
  {
    "id": "na2-c4-e3",
    "chapter": 4,
    "title": "Parseur d'état d'interfaces Cisco (show ip interface brief)",
    "level": "n3",
    "language": "analyse",
    "goal": "Analyser la sortie de la commande Cisco « show ip interface brief » pour diagnostiquer les incidents de couche 1 et couche 2.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nChaque ligne comporte les colonnes :<br>\n<code>Interface | IP-Address | OK? | Method | Status | Protocol</code><br>\nPour chaque interface active ou inactive, le script détermine le diagnostic :<br>\n- Si <code>Status == \"up\"</code> et <code>Protocol == \"up\"</code> : <code>OPERATIONNEL (L1 Up / L2 Up)</code><br>\n- Si <code>Status == \"up\"</code> et <code>Protocol == \"down\"</code> : <code>ERREUR_LIAISON (L1 Up / L2 Down - Probleme encapsulation ou clock-rate)</code><br>\n- Si <code>Status == \"down\"</code> et <code>Protocol == \"down\"</code> : <code>NON_CONNECTE (L1 Down / L2 Down - Cable debranche)</code><br>\n- Si <code>Status == \"administratively down\"</code> : <code>DESACTIVE_ADMIN (Interface sous shutdown)</code><br>\nFormat de sortie :<br>\n<code>&lt;INTERFACE&gt; (&lt;IP&gt;) -&gt; &lt;DIAGNOSTIC&gt;</code></p>",
    "starter": "# Grille d'analyse (na2-c4-e3) — Parseur d'état d'interfaces Cisco (show ip interface brief)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Problème de couche 2 avec protocole down]\n# Données : Interface IP-Address OK? Method Status Protocol\n# Données : Serial0/0/0 10.0.0.1 YES manual up down\nA_COMPLETER\n\n[Cas 2 — Câble déconnecté]\n# Données : Interface IP-Address OK? Method Status Protocol\n# Données : FastEthernet0/24 172.16.10.1 YES manual down down\nA_COMPLETER\n\n[Cas 3 — Mix complet sur un commutateur 4 ports]\n# Données : Interface IP-Address OK? Method Status Protocol\n# Données : Fa0/1 192.168.0.254 YES manual up up\n# Données : Fa0/2 unassigned YES unset down down\n# Données : Fa0/3 unassigned YES unset administratively down down\n# Données : Fa0/4 192.168.0.253 YES manual up down\nA_COMPLETER\n\n[Cas 4 — Interface Loopback toujours up]\n# Données : Interface IP-Address OK? Method Status Protocol\n# Données : Loopback0 1.1.1.1 YES manual up up\nA_COMPLETER\n",
    "hints": [
      "Ignorer la ligne d'en-tête contenant \"Interface IP-Address OK? Method Status Protocol\".",
      "Le statut \"administratively down\" compte pour deux mots lors du découpage."
    ],
    "examples": [
      {
        "stdin": "Interface IP-Address OK? Method Status Protocol\nGigabitEthernet0/0 192.168.1.1 YES manual up up\nGigabitEthernet0/1 unassigned YES unset administratively down down",
        "expected": "GigabitEthernet0/0 (192.168.1.1) -> OPERATIONNEL (L1 Up / L2 Up)\nGigabitEthernet0/1 (unassigned) -> DESACTIVE_ADMIN (Interface sous shutdown)",
        "note": "Une interface opérationnelle et une interface coupée administrativement."
      }
    ],
    "tests": [
      {
        "label": "Problème de couche 2 avec protocole down",
        "stdin": "cas:1",
        "expected": "Serial0/0/0 (10.0.0.1) -> ERREUR_LIAISON (L1 Up / L2 Down - Probleme encapsulation ou clock-rate)"
      },
      {
        "label": "Câble déconnecté",
        "stdin": "cas:2",
        "expected": "FastEthernet0/24 (172.16.10.1) -> NON_CONNECTE (L1 Down / L2 Down - Cable debranche)"
      },
      {
        "label": "Mix complet sur un commutateur 4 ports",
        "stdin": "cas:3",
        "expected": "Fa0/1 (192.168.0.254) -> OPERATIONNEL (L1 Up / L2 Up)\nFa0/2 (unassigned) -> NON_CONNECTE (L1 Down / L2 Down - Cable debranche)\nFa0/3 (unassigned) -> DESACTIVE_ADMIN (Interface sous shutdown)\nFa0/4 (192.168.0.253) -> ERREUR_LIAISON (L1 Up / L2 Down - Probleme encapsulation ou clock-rate)"
      },
      {
        "label": "Interface Loopback toujours up",
        "stdin": "cas:4",
        "expected": "Loopback0 (1.1.1.1) -> OPERATIONNEL (L1 Up / L2 Up)"
      }
    ],
    "solution": "[Exemple]\nGigabitEthernet0/0 (192.168.1.1) -> OPERATIONNEL (L1 Up / L2 Up)\nGigabitEthernet0/1 (unassigned) -> DESACTIVE_ADMIN (Interface sous shutdown)\n\n[Cas 1 — Problème de couche 2 avec protocole down]\nSerial0/0/0 (10.0.0.1) -> ERREUR_LIAISON (L1 Up / L2 Down - Probleme encapsulation ou clock-rate)\n\n[Cas 2 — Câble déconnecté]\nFastEthernet0/24 (172.16.10.1) -> NON_CONNECTE (L1 Down / L2 Down - Cable debranche)\n\n[Cas 3 — Mix complet sur un commutateur 4 ports]\nFa0/1 (192.168.0.254) -> OPERATIONNEL (L1 Up / L2 Up)\nFa0/2 (unassigned) -> NON_CONNECTE (L1 Down / L2 Down - Cable debranche)\nFa0/3 (unassigned) -> DESACTIVE_ADMIN (Interface sous shutdown)\nFa0/4 (192.168.0.253) -> ERREUR_LIAISON (L1 Up / L2 Down - Probleme encapsulation ou clock-rate)\n\n[Cas 4 — Interface Loopback toujours up]\nLoopback0 (1.1.1.1) -> OPERATIONNEL (L1 Up / L2 Up)"
  }
];
