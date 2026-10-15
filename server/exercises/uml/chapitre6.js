/**
 * Exercices du chapitre 6 — UML B2.
 * Diagrammes d'États-Transitions, Composants et Déploiement.
 */
'use strict';

module.exports = [
  {
    id: 'um2-c6-e1',
    chapter: 6,
    title: "Machine à états finis UML (State Machine)",
    level: 'n1',
    language: 'python',
    goal: "Simuler un automate d'états finis UML en évaluant les transitions déclenchées par des événements avec gardes et actions.",
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- <code>INITIAL &lt;EtatInitial&gt;</code><br>\n- Les transitions : <code>TRANSITION &lt;Source&gt; -&gt; &lt;Cible&gt; : &lt;evenement&gt; [&lt;garde&gt;] / &lt;action&gt;</code><br>\n  (la garde <code>[&lt;garde&gt;]</code> et l\'action <code>/ &lt;action&gt;</code> sont optionnelles)<br>\n- La suite d\'événements reçus : <code>EVENT &lt;evenement&gt; [VAR=val ...]</code>.<br>\nPour chaque événement :<br>\n- Si une transition valide existe depuis l\'état courant avec une garde vraie :<br>\n  franchir la transition, exécuter l\'action éventuelle, et afficher :<br>\n  <code>[TRANSITION] &lt;Source&gt; -&gt; &lt;Cible&gt; via &lt;event&gt; [Action: &lt;act&gt;]</code><br>\n- Si aucune transition n\'est franchissable :<br>\n  afficher <code>[IGNORE] Evenement &lt;event&gt; sans effet dans l\'etat &lt;EtatCourant&gt;</code>.<br>\nÀ la fin, afficher : <code>ETAT FINAL COURANT: &lt;Etat&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la machine à états UML
`,
    hints: [
      'Gérer l\'état courant sous forme d\'une variable initialisée par la directive INITIAL.',
      'Une transition est franchie seulement si l\'événement correspond et que sa condition de garde est satisfaite.'
    ],
    examples: [
      {
        stdin: "INITIAL Cree\nTRANSITION Cree -> Paye : payer [montant>0] / emettreRecu\nTRANSITION Paye -> Expedie : expedier / notifierClient\nEVENT payer montant=50\nEVENT expedier",
        expected: "[TRANSITION] Cree -> Paye via payer [Action: emettreRecu]\n[TRANSITION] Paye -> Expedie via expedier [Action: notifierClient]\nETAT FINAL COURANT: Expedie",
        note: 'Cycle de vie d\'une commande : Créée -> Payée -> Expédiée.'
      }
    ],
    tests: [
      {
        label: 'Événement ignoré car état incompatible',
        stdin: "INITIAL Initial\nTRANSITION Initial -> Actif : start / initTimer\nEVENT stop\nEVENT start",
        expected: "[IGNORE] Evenement stop sans effet dans l'etat Initial\n[TRANSITION] Initial -> Actif via start [Action: initTimer]\nETAT FINAL COURANT: Actif"
      },
      {
        label: 'Garde non satisfaite',
        stdin: "INITIAL Verrouille\nTRANSITION Verrouille -> Deverrouille : badge [codeValide==1] / ouvrirPorte\nEVENT badge codeValide=0",
        expected: "[IGNORE] Evenement badge sans effet dans l'etat Verrouille\nETAT FINAL COURANT: Verrouille"
      },
      {
        label: 'Transition sans action',
        stdin: "INITIAL E1\nTRANSITION E1 -> E2 : valider\nEVENT valider",
        expected: "[TRANSITION] E1 -> E2 via valider [Action: aucune]\nETAT FINAL COURANT: E2"
      },
      {
        label: 'Retour vers état antérieur',
        stdin: "INITIAL EnPause\nTRANSITION EnPause -> EnCours : reprendre / resume\nTRANSITION EnCours -> EnPause : pause / hold\nEVENT reprendre\nEVENT pause",
        expected: "[TRANSITION] EnPause -> EnCours via reprendre [Action: resume]\n[TRANSITION] EnCours -> EnPause via pause [Action: hold]\nETAT FINAL COURANT: EnPause"
      }
    ],
    solution: `import sys, re

def eval_garde(expr, vars_map):
    if not expr:
        return True
    m = re.match(r"(\\w+)\\s*(>=|<=|>|<|==|!=)\\s*([-\\d\\.]+)", expr)
    if not m:
        return True
    vname, op, ref_str = m.groups()
    val = vars_map.get(vname, 0.0)
    ref = float(ref_str)
    if op == ">=": return val >= ref
    if op == "<=": return val <= ref
    if op == ">": return val > ref
    if op == "<": return val < ref
    if op == "==": return abs(val - ref) < 1e-9
    if op == "!=": return abs(val - ref) >= 1e-9
    return False

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    etat = "INIT"
    transitions = []
    
    for l in lignes:
        if l.startswith("INITIAL "):
            etat = l[8:].strip()
        elif l.startswith("TRANSITION "):
            # TRANSITION Cree -> Paye : payer [montant>0] / emettreRecu
            m = re.match(r"TRANSITION\\s+(\\w+)\\s*->\\s*(\\w+)\\s*:\\s*(\\w+)(?:\\s*\\[(.*?)\\])?(?:\\s*/\\s*(\\w+))?", l)
            if m:
                src, dst, evt, garde, action = m.groups()
                transitions.append({
                    "src": src, "dst": dst, "evt": evt,
                    "garde": garde or "", "action": action or "aucune"
                })
        elif l.startswith("EVENT "):
            parts = l[6:].split()
            evt_name = parts[0]
            vars_map = {}
            for p in parts[1:]:
                if "=" in p:
                    k, v = p.split("=")
                    vars_map[k] = float(v)
                    
            trouve = False
            for t in transitions:
                if t["src"] == etat and t["evt"] == evt_name:
                    if eval_garde(t["garde"], vars_map):
                        print(f"[TRANSITION] {t['src']} -> {t['dst']} via {evt_name} [Action: {t['action']}]")
                        etat = t["dst"]
                        trouve = True
                        break
            if not trouve:
                print(f"[IGNORE] Evenement {evt_name} sans effet dans l'etat {etat}")
                
    print(f"ETAT FINAL COURANT: {etat}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c6-e2',
    chapter: 6,
    title: "Vérificateur d'interfaces de composants (Lollipop)",
    level: 'n2',
    language: 'python',
    goal: "Valider l'assemblage de composants logiciels UML en appariant les interfaces fournies (ball/lollipop) et requises (socket).",
    brief: '<p>Dans un diagramme de composants UML :<br>\n- Un composant <strong>fournit</strong> une interface via une sucette/cercle plein (lollipop) : <code>PROVIDES &lt;Composant&gt; &lt;Interface&gt;:&lt;Version&gt;</code>.<br>\n- Un composant <strong>requiert</strong> une interface via un demi-cercle (socket) : <code>REQUIRES &lt;Composant&gt; &lt;Interface&gt;:&lt;VersionMin&gt;</code>.<br>\n- Un connecteur d\'assemblage relie deux composants : <code>CONNECT &lt;ClientComp&gt; -&gt; &lt;FournisseurComp&gt; [&lt;Interface&gt;]</code>.<br>\nRègles de validation :<br>\n1. Le composant fournisseur doit obligatoirement fournir l\'interface spécifiée.<br>\n2. Le composant client doit requérir cette interface.<br>\n3. La version fournie doit être <strong>supérieure ou égale</strong> à la version minimale requise (<code>VersionFournie &gt;= VersionMin</code>).<br>\nAfficher pour chaque connecteur :<br>\n<code>[VALIDE|ERREUR] Assemblage &lt;Client&gt; -&gt; &lt;Fournisseur&gt; (&lt;Interface&gt;) : &lt;motif&gt;</code>.<br>\nÀ la fin : <code>CONNECTEURS CONFORMES: &lt;N&gt;/&lt;Total&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider l'assemblage des interfaces de composants
`,
    hints: [
      'Gérer un dictionnaire pour les interfaces fournies (comp -> {interface: version}) et requises.',
      'Comparer les numéros de version sous forme numérique flottante ou entière.'
    ],
    examples: [
      {
        stdin: "PROVIDES ServicePaiement IPayment:2.0\nREQUIRES ModulePanier IPayment:1.5\nCONNECT ModulePanier -> ServicePaiement [IPayment]",
        expected: "[VALIDE] Assemblage ModulePanier -> ServicePaiement (IPayment) : Compatibilite version v2.0 >= v1.5\nCONNECTEURS CONFORMES: 1/1",
        note: 'Le service fournit IPayment v2.0, supérieur au v1.5 requis.'
      }
    ],
    tests: [
      {
        label: 'Version fournie obsolète par rapport au besoin',
        stdin: "PROVIDES DBService IDatabase:1.0\nREQUIRES BackendApp IDatabase:2.0\nCONNECT BackendApp -> DBService [IDatabase]",
        expected: "[ERREUR] Assemblage BackendApp -> DBService (IDatabase) : Version incompatible v1.0 < v2.0\nCONNECTEURS CONFORMES: 0/1"
      },
      {
        label: 'Interface non fournie par le composant cible',
        stdin: "PROVIDES AuthEngine IAuth:1.0\nREQUIRES Gateway IPayment:1.0\nCONNECT Gateway -> AuthEngine [IPayment]",
        expected: "[ERREUR] Assemblage Gateway -> AuthEngine (IPayment) : Interface non fournie par AuthEngine\nCONNECTEURS CONFORMES: 0/1"
      },
      {
        label: 'Plusieurs connecteurs réussis',
        stdin: "PROVIDES C1 I1:1.0\nPROVIDES C2 I2:3.0\nREQUIRES App I1:1.0\nREQUIRES App I2:2.5\nCONNECT App -> C1 [I1]\nCONNECT App -> C2 [I2]",
        expected: "[VALIDE] Assemblage App -> C1 (I1) : Compatibilite version v1.0 >= v1.0\n[VALIDE] Assemblage App -> C2 (I2) : Compatibilite version v3.0 >= v2.5\nCONNECTEURS CONFORMES: 2/2"
      },
      {
        label: 'Interface non requise par le client',
        stdin: "PROVIDES Srv IService:1.0\nCONNECT Client -> Srv [IService]",
        expected: "[ERREUR] Assemblage Client -> Srv (IService) : Interface non requise par Client\nCONNECTEURS CONFORMES: 0/1"
      }
    ],
    solution: `import sys, re

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    provides = {} # comp -> {iface: version}
    requires = {} # comp -> {iface: version}
    connects = []
    
    for l in lignes:
        if l.startswith("PROVIDES "):
            parts = l[9:].split()
            cname = parts[0]
            iname, v_str = parts[1].split(":")
            provides.setdefault(cname, {})[iname] = float(v_str)
        elif l.startswith("REQUIRES "):
            parts = l[9:].split()
            cname = parts[0]
            iname, v_str = parts[1].split(":")
            requires.setdefault(cname, {})[iname] = float(v_str)
        elif l.startswith("CONNECT "):
            # CONNECT Client -> Fournisseur [Interface]
            m = re.match(r"CONNECT\\s+(\\w+)\\s*->\\s*(\\w+)\\s*\\[(\\w+)\\]", l)
            if m:
                connects.append(m.groups())
                
    conformes = 0
    for client, four, iface in connects:
        valide = True
        motif = ""
        
        req_v = requires.get(client, {}).get(iface)
        prov_v = provides.get(four, {}).get(iface)
        
        if req_v is None:
            valide = False
            motif = f"Interface non requise par {client}"
        elif prov_v is None:
            valide = False
            motif = f"Interface non fournie par {four}"
        elif prov_v < req_v:
            valide = False
            motif = f"Version incompatible v{prov_v} < v{req_v}"
        else:
            valide = True
            motif = f"Compatibilite version v{prov_v} >= v{req_v}"
            
        statut = "VALIDE" if valide else "ERREUR"
        if valide:
            conformes += 1
        print(f"[{statut}] Assemblage {client} -> {four} ({iface}) : {motif}")
        
    print(f"CONNECTEURS CONFORMES: {conformes}/{len(connects)}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c6-e3',
    chapter: 6,
    title: "Mappeur de diagramme de déploiement (Nœuds & Artefacts)",
    level: 'n3',
    language: 'python',
    goal: "Vérifier la cohérence d'un diagramme de déploiement : hébergement des artefacts dans les nœuds et compatibilité des protocoles de communication.",
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- Déclaration des nœuds matériels/d\'exécution : <code>NODE &lt;NomNoeud&gt; &lt;&lt;device|executionEnvironment&gt;&gt;</code><br>\n- Déploiement des artefacts : <code>DEPLOY &lt;Artefact&gt; ON &lt;NomNoeud&gt;</code><br>\n- Liens de communication entre nœuds : <code>LINK &lt;NoeudA&gt; &lt;--&gt; &lt;NoeudB&gt; PROTO=&lt;HTTPS|JDBC|SSH|REST|TCP&gt;</code><br>\n- Requêtes de communication applicative entre artefacts : <code>COMM &lt;ArtA&gt; -&gt; &lt;ArtB&gt; REQ_PROTO=&lt;Proto&gt;</code>.<br>\nPour chaque communication applicative <code>COMM</code> :<br>\n1. Si les deux artefacts résident sur le <strong>même nœud</strong> : <code>[LOCAL] Communication intra-noeud sur &lt;Noeud&gt; : OK</code>.<br>\n2. S\'ils sont sur deux nœuds distincts, vérifier s\'il existe un <code>LINK</code> direct entre ces deux nœuds supportant le protocole requis <code>REQ_PROTO</code>.<br>\n   - Si oui : <code>[RESEAU OK] &lt;ArtA&gt; (&lt;NoeudA&gt;) communique avec &lt;ArtB&gt; (&lt;NoeudB&gt;) via &lt;Proto&gt;</code>.<br>\n   - Si aucun lien réseau ou protocole incompatible : <code>[ECHEC RESEAU] Pas de lien compatible &lt;Proto&gt; entre &lt;NoeudA&gt; et &lt;NoeudB&gt;</code>.<br>\nBilan final : <code>COMMUNICATIONS OPERATIONNELLES: &lt;N&gt;/&lt;Total&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider le déploiement et les communications inter-nœuds
`,
    hints: [
      'Associer chaque artefact à son nœud d\'hébergement.',
      'Vérifier l\'existence d\'un lien réseau bidirectionnel supportant le protocole spécifié.'
    ],
    examples: [
      {
        stdin: "NODE ClientPC <<device>>\nNODE WebServer <<executionEnvironment>>\nDEPLOY AppReact ON ClientPC\nDEPLOY ApiFlask ON WebServer\nLINK ClientPC <--> WebServer PROTO=HTTPS\nCOMM AppReact -> ApiFlask REQ_PROTO=HTTPS",
        expected: "[RESEAU OK] AppReact (ClientPC) communique avec ApiFlask (WebServer) via HTTPS\nCOMMUNICATIONS OPERATIONNELLES: 1/1",
        note: 'Communication client-serveur validée sur lien HTTPS.'
      }
    ],
    tests: [
      {
        label: 'Communication locale sur même nœud',
        stdin: "NODE Srv1 <<device>>\nDEPLOY ServiceA ON Srv1\nDEPLOY ServiceB ON Srv1\nCOMM ServiceA -> ServiceB REQ_PROTO=IPC",
        expected: "[LOCAL] Communication intra-noeud sur Srv1 : OK\nCOMMUNICATIONS OPERATIONNELLES: 1/1"
      },
      {
        label: 'Protocole réseau incompatible',
        stdin: "NODE AppSrv <<device>>\nNODE DBSrv <<device>>\nDEPLOY Backend ON AppSrv\nDEPLOY Postgres ON DBSrv\nLINK AppSrv <--> DBSrv PROTO=SSH\nCOMM Backend -> Postgres REQ_PROTO=JDBC",
        expected: "[ECHEC RESEAU] Pas de lien compatible JDBC entre AppSrv et DBSrv\nCOMMUNICATIONS OPERATIONNELLES: 0/1"
      },
      {
        label: 'Absence totale de lien réseau',
        stdin: "NODE N1 <<device>>\nNODE N2 <<device>>\nDEPLOY A1 ON N1\nDEPLOY A2 ON N2\nCOMM A1 -> A2 REQ_PROTO=TCP",
        expected: "[ECHEC RESEAU] Pas de lien compatible TCP entre N1 et N2\nCOMMUNICATIONS OPERATIONNELLES: 0/1"
      },
      {
        label: 'Architecture multi-tiers avec deux liens valides',
        stdin: "NODE Client <<device>>\nNODE Web <<device>>\nNODE DB <<device>>\nDEPLOY Nav ON Client\nDEPLOY App ON Web\nDEPLOY Data ON DB\nLINK Client <--> Web PROTO=HTTPS\nLINK Web <--> DB PROTO=JDBC\nCOMM Nav -> App REQ_PROTO=HTTPS\nCOMM App -> Data REQ_PROTO=JDBC",
        expected: "[RESEAU OK] Nav (Client) communique avec App (Web) via HTTPS\n[RESEAU OK] App (Web) communique avec Data (DB) via JDBC\nCOMMUNICATIONS OPERATIONNELLES: 2/2"
      }
    ],
    solution: `import sys, re

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    art_to_node = {} # art -> node
    links = {} # frozenset(a, b) -> set of protos
    comms = []
    
    for l in lignes:
        if l.startswith("DEPLOY "):
            m = re.match(r"DEPLOY\\s+(\\w+)\\s+ON\\s+(\\w+)", l)
            if m:
                art, node = m.groups()
                art_to_node[art] = node
        elif l.startswith("LINK "):
            # LINK A <--> B PROTO=HTTPS
            m = re.match(r"LINK\\s+(\\w+)\\s*<-->\\s*(\\w+)\\s+PROTO=(\\w+)", l)
            if m:
                na, nb, proto = m.groups()
                pair = frozenset([na, nb])
                links.setdefault(pair, set()).add(proto)
        elif l.startswith("COMM "):
            m = re.match(r"COMM\\s+(\\w+)\\s*->\\s*(\\w+)\\s+REQ_PROTO=(\\w+)", l)
            if m:
                comms.append(m.groups())
                
    operationnelles = 0
    for a1, a2, req_p in comms:
        n1 = art_to_node.get(a1, "Inconnu")
        n2 = art_to_node.get(a2, "Inconnu")
        
        if n1 == n2 and n1 != "Inconnu":
            print(f"[LOCAL] Communication intra-noeud sur {n1} : OK")
            operationnelles += 1
        else:
            pair = frozenset([n1, n2])
            supported_protos = links.get(pair, set())
            if req_p in supported_protos:
                print(f"[RESEAU OK] {a1} ({n1}) communique avec {a2} ({n2}) via {req_p}")
                operationnelles += 1
            else:
                print(f"[ECHEC RESEAU] Pas de lien compatible {req_p} entre {n1} et {n2}")
                
    print(f"COMMUNICATIONS OPERATIONNELLES: {operationnelles}/{len(comms)}")

if __name__ == "__main__":
    main()
`
  }
];
