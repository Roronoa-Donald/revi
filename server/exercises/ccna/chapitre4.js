/**
 * Exercices du chapitre 4 — CCNA Réseau B2.
 * Configuration des Équipements sous Cisco IOS et Sécurisation.
 */
'use strict';

module.exports = [
  {
    id: 'na2-c4-e1',
    chapter: 4,
    title: "Parseur et validateur de hiérarchie de modes Cisco IOS",
    level: 'n1',
    language: 'python',
    goal: "Simuler la navigation entre les modes CLI Cisco IOS (User EXEC, Privileged EXEC, Global Config, Interface Config) et vérifier la validité des commandes.",
    brief: '<p>Le script simule une session interactive Cisco IOS sur un équipement nommé <code>Router</code>.<br>\nModes possibles et leurs invites :<br>\n- <code>USER</code> : <code>Router&gt;</code><br>\n- <code>PRIVILEGED</code> : <code>Router#</code><br>\n- <code>CONFIG</code> : <code>Router(config)#</code><br>\n- <code>CONFIG_IF</code> : <code>Router(config-if)#</code><br>\nTransitions valides :<br>\n- Depuis <code>USER</code> : <code>enable</code> -&gt; <code>PRIVILEGED</code><br>\n- Depuis <code>PRIVILEGED</code> : <code>disable</code> -&gt; <code>USER</code>, <code>configure terminal</code> -&gt; <code>CONFIG</code><br>\n- Depuis <code>CONFIG</code> : <code>interface &lt;nom&gt;</code> -&gt; <code>CONFIG_IF</code>, <code>exit</code> -&gt; <code>PRIVILEGED</code>, <code>end</code> -&gt; <code>PRIVILEGED</code><br>\n- Depuis <code>CONFIG_IF</code> : <code>exit</code> -&gt; <code>CONFIG</code>, <code>end</code> -&gt; <code>PRIVILEGED</code><br>\nToute autre commande est considérée comme exécutée dans le mode courant (afficher <code>OK: &lt;cmd&gt;</code>), sauf si une commande de mode restreint est appelée dans un mode insuffisant (ex: <code>configure terminal</code> appelé en mode <code>USER</code> -&gt; afficher <code>ERREUR: Commande non autorisee en mode USER</code>).<br>\nPour chaque commande de l\'entrée standard, afficher l\'invite courante suivie de la commande, puis le résultat ou l\'erreur, et enfin la nouvelle invite.</p>',
    starter: `import sys

commandes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la machine à états des modes Cisco IOS
`,
    hints: [
      'Utiliser une variable mode ("USER", "PRIV", "CONF", "IF") et mettre à jour l\'invite après chaque transition.',
      'Les commandes "exit" et "end" permettent de remonter dans la hiérarchie.'
    ],
    examples: [
      {
        stdin: "enable\nconfigure terminal\ninterface g0/0\nexit\nend\ndisable",
        expected: "Router> enable\nRouter# configure terminal\nRouter(config)# interface g0/0\nRouter(config-if)# exit\nRouter(config)# end\nRouter# disable\nRouter>",
        note: 'Parcours complet de descente et remontée dans l\'arborescence de configuration.'
      }
    ],
    tests: [
      {
        label: 'Tentative de config terminal depuis mode utilisateur',
        stdin: "configure terminal\nenable\nconfigure terminal",
        expected: "Router> configure terminal\nERREUR: Commande non autorisee en mode USER\nRouter> enable\nRouter# configure terminal\nRouter(config)#"
      },
      {
        label: 'Exécution de commandes show et ip address',
        stdin: "enable\nshow version\nconfigure terminal\nhostname R1",
        expected: "Router> enable\nRouter# show version\nOK: show version\nRouter# configure terminal\nRouter(config)# hostname R1\nOK: hostname R1\nRouter(config)#"
      },
      {
        label: 'Saut direct avec end depuis sous-interface',
        stdin: "enable\nconfigure terminal\ninterface fa0/1\nend",
        expected: "Router> enable\nRouter# configure terminal\nRouter(config)# interface fa0/1\nRouter(config-if)# end\nRouter#"
      },
      {
        label: 'Refus de commande interface hors mode config',
        stdin: "interface g0/1",
        expected: "Router> interface g0/1\nERREUR: Commande non autorisee en mode USER\nRouter>"
      }
    ],
    solution: `import sys

def main():
    mode = "USER"
    
    def prompt_str(m):
        if m == "USER":
            return "Router>"
        elif m == "PRIV":
            return "Router#"
        elif m == "CONF":
            return "Router(config)#"
        elif m == "IF":
            return "Router(config-if)#"
        return "Router>"
        
    for line in sys.stdin:
        cmd = line.strip()
        if not cmd:
            continue
            
        cur_p = prompt_str(mode)
        print(f"{cur_p} {cmd}")
        
        # Vérification des erreurs de contexte
        if cmd == "configure terminal" and mode != "PRIV":
            print(f"ERREUR: Commande non autorisee en mode {mode}")
            continue
        if cmd.startswith("interface ") and mode != "CONF":
            print(f"ERREUR: Commande non autorisee en mode {mode}")
            continue
            
        # Transitions
        if mode == "USER":
            if cmd == "enable":
                mode = "PRIV"
            else:
                print(f"OK: {cmd}")
        elif mode == "PRIV":
            if cmd == "configure terminal":
                mode = "CONF"
            elif cmd == "disable":
                mode = "USER"
            else:
                print(f"OK: {cmd}")
        elif mode == "CONF":
            if cmd.startswith("interface "):
                mode = "IF"
            elif cmd == "exit":
                mode = "PRIV"
            elif cmd == "end":
                mode = "PRIV"
            else:
                print(f"OK: {cmd}")
        elif mode == "IF":
            if cmd == "exit":
                mode = "CONF"
            elif cmd == "end":
                mode = "PRIV"
            else:
                print(f"OK: {cmd}")
                
    # Invite finale
    print(prompt_str(mode))

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'na2-c4-e2',
    chapter: 4,
    title: "Audit et durcissement de configuration Cisco IOS",
    level: 'n2',
    language: 'python',
    goal: "Analyser un fichier de configuration running-config pour valider les 5 règles fondamentales de sécurisation.",
    brief: '<p>Le script lit sur l\'entrée standard un extrait de configuration Cisco IOS (lignes <code>running-config</code>).<br>\nIl contrôle 5 critères de sécurité essentiels :<br>\n1. <code>PASSWORD_ENCRYPTION</code> : présence de la commande <code>service password-encryption</code>.<br>\n2. <code>ENABLE_SECRET</code> : présence de <code>enable secret &lt;mot_de_passe&gt;</code> (et NON <code>enable password</code> en clair).<br>\n3. <code>SSH_ONLY</code> : dans le bloc <code>line vty</code>, présence de <code>transport input ssh</code>.<br>\n4. <code>BANNER_MOTD</code> : présence d\'une bannière d\'avertissement <code>banner motd</code>.<br>\n5. <code>LOGIN_LOCAL</code> : présence de <code>login local</code> sur la console ou les lignes VTY.<br>\nLe script affiche pour chaque règle :<br>\n<code>[VALIDE|ECHEC] &lt;NOM_REGLE&gt; : &lt;detail&gt;</code><br>\nPuis la conclusion : <code>SCORE DE DURCISSEMENT: &lt;X&gt;/5</code> (CONFORME si 5/5, VULNERABLE sinon).</p>',
    starter: `import sys

config_text = sys.stdin.read()

# À compléter : auditer la configuration Cisco selon les 5 critères de durcissement
`,
    hints: [
      'enable secret utilise un hachage MD5/SHA-256 alors qu\'enable password stocke en clair ou réversible.',
      'Analyser le contexte de bloc "line vty 0 4" pour vérifier le transport SSH.'
    ],
    examples: [
      {
        stdin: "service password-encryption\nenable secret Cisc0$ecr3t\nbanner motd #ACCES INTERDIT#\nline con 0\n login local\nline vty 0 4\n transport input ssh\n login local",
        expected: "[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[VALIDE] SSH_ONLY : Transport SSH exclusif sur VTY\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[VALIDE] LOGIN_LOCAL : Authentification sur base locale\nSCORE DE DURCISSEMENT: 5/5 -> CONFORME",
        note: 'Configuration totalement conforme aux bonnes pratiques de sécurité.'
      }
    ],
    tests: [
      {
        label: 'Configuration non sécurisée avec Telnet et mot de passe en clair',
        stdin: "enable password cisco\nline vty 0 4\n transport input telnet\n login",
        expected: "[ECHEC] PASSWORD_ENCRYPTION : Chiffrement de base absent\n[ECHEC] ENABLE_SECRET : Mot de passe secret manquant ou en clair\n[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant\n[ECHEC] BANNER_MOTD : Aucune banniere MOTD\n[ECHEC] LOGIN_LOCAL : Base locale non activee\nSCORE DE DURCISSEMENT: 0/5 -> VULNERABLE"
      },
      {
        label: 'Durcissement partiel avec mot de passe secret et chiffrement mais sans SSH',
        stdin: "service password-encryption\nenable secret Secr3tKey\nbanner motd #Avertissement#\nline con 0\n login local",
        expected: "[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[VALIDE] LOGIN_LOCAL : Authentification sur base locale\nSCORE DE DURCISSEMENT: 4/5 -> VULNERABLE"
      },
      {
        label: 'Enable password en clair en doublon avec secret',
        stdin: "service password-encryption\nenable secret SuperSec\nenable password Faible123\nbanner motd *Stop*\nline vty 0 4\n transport input ssh\n login local",
        expected: "[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[VALIDE] SSH_ONLY : Transport SSH exclusif sur VTY\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[VALIDE] LOGIN_LOCAL : Authentification sur base locale\nSCORE DE DURCISSEMENT: 5/5 -> CONFORME"
      },
      {
        label: 'SSH configuré avec transport input all',
        stdin: "service password-encryption\nenable secret Cl3\nline vty 0 4\n transport input all\nbanner motd #Warning#",
        expected: "[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active\n[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache\n[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant\n[VALIDE] BANNER_MOTD : Banniere legale declaree\n[ECHEC] LOGIN_LOCAL : Base locale non activee\nSCORE DE DURCISSEMENT: 3/5 -> VULNERABLE"
      }
    ],
    solution: `import sys, re

def main():
    content = sys.stdin.read()
    lignes = [l.strip() for l in content.splitlines()]
    
    score = 0
    
    # 1. service password-encryption
    r1 = any(l == "service password-encryption" for l in lignes)
    if r1:
        print("[VALIDE] PASSWORD_ENCRYPTION : Chiffrement global active")
        score += 1
    else:
        print("[ECHEC] PASSWORD_ENCRYPTION : Chiffrement de base absent")
        
    # 2. enable secret
    r2 = any(l.startswith("enable secret ") for l in lignes)
    if r2:
        print("[VALIDE] ENABLE_SECRET : Mot de passe privilegie hache")
        score += 1
    else:
        print("[ECHEC] ENABLE_SECRET : Mot de passe secret manquant ou en clair")
        
    # 3. SSH only sur vty
    # Rechercher bloc line vty puis transport input ssh
    in_vty = False
    ssh_found = False
    for l in lignes:
        if l.startswith("line vty"):
            in_vty = True
        elif in_vty:
            if l.startswith("line ") or l.startswith("interface ") or l == "!":
                in_vty = False
            elif l == "transport input ssh":
                ssh_found = True
    if ssh_found:
        print("[VALIDE] SSH_ONLY : Transport SSH exclusif sur VTY")
        score += 1
    else:
        print("[ECHEC] SSH_ONLY : Telnet autorise ou SSH manquant")
        
    # 4. Banner motd
    r4 = any(l.startswith("banner motd") for l in lignes)
    if r4:
        print("[VALIDE] BANNER_MOTD : Banniere legale declaree")
        score += 1
    else:
        print("[ECHEC] BANNER_MOTD : Aucune banniere MOTD")
        
    # 5. login local
    r5 = any(l == "login local" for l in lignes)
    if r5:
        print("[VALIDE] LOGIN_LOCAL : Authentification sur base locale")
        score += 1
    else:
        print("[ECHEC] LOGIN_LOCAL : Base locale non activee")
        
    bilan = "CONFORME" if score == 5 else "VULNERABLE"
    print(f"SCORE DE DURCISSEMENT: {score}/5 -> {bilan}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'na2-c4-e3',
    chapter: 4,
    title: "Parseur d'état d'interfaces Cisco (show ip interface brief)",
    level: 'n3',
    language: 'python',
    goal: "Analyser la sortie de la commande Cisco « show ip interface brief » pour diagnostiquer les incidents de couche 1 et couche 2.",
    brief: '<p>Le script lit sur l\'entrée standard la sortie brute de <code>show ip interface brief</code>.<br>\nChaque ligne comporte les colonnes :<br>\n<code>Interface | IP-Address | OK? | Method | Status | Protocol</code><br>\nPour chaque interface active ou inactive, le script détermine le diagnostic :<br>\n- Si <code>Status == "up"</code> et <code>Protocol == "up"</code> : <code>OPERATIONNEL (L1 Up / L2 Up)</code><br>\n- Si <code>Status == "up"</code> et <code>Protocol == "down"</code> : <code>ERREUR_LIAISON (L1 Up / L2 Down - Probleme encapsulation ou clock-rate)</code><br>\n- Si <code>Status == "down"</code> et <code>Protocol == "down"</code> : <code>NON_CONNECTE (L1 Down / L2 Down - Cable debranche)</code><br>\n- Si <code>Status == "administratively down"</code> : <code>DESACTIVE_ADMIN (Interface sous shutdown)</code><br>\nFormat de sortie :<br>\n<code>&lt;INTERFACE&gt; (&lt;IP&gt;) -&gt; &lt;DIAGNOSTIC&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : analyser l'état physique et logique des interfaces Cisco
`,
    hints: [
      'Ignorer la ligne d\'en-tête contenant "Interface IP-Address OK? Method Status Protocol".',
      'Le statut "administratively down" compte pour deux mots lors du découpage.'
    ],
    examples: [
      {
        stdin: "Interface IP-Address OK? Method Status Protocol\nGigabitEthernet0/0 192.168.1.1 YES manual up up\nGigabitEthernet0/1 unassigned YES unset administratively down down",
        expected: "GigabitEthernet0/0 (192.168.1.1) -> OPERATIONNEL (L1 Up / L2 Up)\nGigabitEthernet0/1 (unassigned) -> DESACTIVE_ADMIN (Interface sous shutdown)",
        note: 'Une interface opérationnelle et une interface coupée administrativement.'
      }
    ],
    tests: [
      {
        label: 'Problème de couche 2 avec protocole down',
        stdin: "Interface IP-Address OK? Method Status Protocol\nSerial0/0/0 10.0.0.1 YES manual up down",
        expected: "Serial0/0/0 (10.0.0.1) -> ERREUR_LIAISON (L1 Up / L2 Down - Probleme encapsulation ou clock-rate)"
      },
      {
        label: 'Câble déconnecté',
        stdin: "Interface IP-Address OK? Method Status Protocol\nFastEthernet0/24 172.16.10.1 YES manual down down",
        expected: "FastEthernet0/24 (172.16.10.1) -> NON_CONNECTE (L1 Down / L2 Down - Cable debranche)"
      },
      {
        label: 'Mix complet sur un commutateur 4 ports',
        stdin: "Interface IP-Address OK? Method Status Protocol\nFa0/1 192.168.0.254 YES manual up up\nFa0/2 unassigned YES unset down down\nFa0/3 unassigned YES unset administratively down down\nFa0/4 192.168.0.253 YES manual up down",
        expected: "Fa0/1 (192.168.0.254) -> OPERATIONNEL (L1 Up / L2 Up)\nFa0/2 (unassigned) -> NON_CONNECTE (L1 Down / L2 Down - Cable debranche)\nFa0/3 (unassigned) -> DESACTIVE_ADMIN (Interface sous shutdown)\nFa0/4 (192.168.0.253) -> ERREUR_LIAISON (L1 Up / L2 Down - Probleme encapsulation ou clock-rate)"
      },
      {
        label: 'Interface Loopback toujours up',
        stdin: "Interface IP-Address OK? Method Status Protocol\nLoopback0 1.1.1.1 YES manual up up",
        expected: "Loopback0 (1.1.1.1) -> OPERATIONNEL (L1 Up / L2 Up)"
      }
    ],
    solution: `import sys

def main():
    for line in sys.stdin:
        line = line.strip()
        if not line or "IP-Address" in line:
            continue
        parts = line.split()
        if len(parts) < 6:
            continue
            
        iface = parts[0]
        ip = parts[1]
        
        # Les deux derniers champs sont souvent le protocole et le statut
        protocol = parts[-1].lower()
        if parts[-3].lower() == "administratively" and parts[-2].lower() == "down":
            status = "administratively down"
        else:
            status = parts[-2].lower()
            
        if status == "administratively down":
            diag = "DESACTIVE_ADMIN (Interface sous shutdown)"
        elif status == "up" and protocol == "up":
            diag = "OPERATIONNEL (L1 Up / L2 Up)"
        elif status == "up" and protocol == "down":
            diag = "ERREUR_LIAISON (L1 Up / L2 Down - Probleme encapsulation ou clock-rate)"
        elif status == "down" and protocol == "down":
            diag = "NON_CONNECTE (L1 Down / L2 Down - Cable debranche)"
        else:
            diag = f"INCONNU ({status}/{protocol})"
            
        print(f"{iface} ({ip}) -> {diag}")

if __name__ == "__main__":
    main()
`
  }
];
