/**
 * Exercices du chapitre 4 — UML B2.
 * Diagramme de Séquence et Interactions Dynamiques.
 */
'use strict';

module.exports = [
  {
    id: 'um2-c4-e1',
    chapter: 4,
    title: "Simulateur de trace de diagramme de séquence",
    level: 'n1',
    language: 'python',
    goal: "Valider l'ordonnancement temporel vertical des messages et l'équilibre des appels/retours entre lignes de vie (lifelines).",
    brief: '<p>Le script lit sur l\'entrée standard une suite ordonnée de messages échangés entre lifelines :<br>\n- Message synchrone (appel) : <code>&lt;Source&gt; -&gt; &lt;Cible&gt; : &lt;methode&gt;(&lt;args&gt;)</code><br>\n- Message de retour : <code>&lt;Source&gt; --&gt; &lt;Cible&gt; : &lt;reponse&gt;</code><br>\nRègles de validation d\'un diagramme de séquence bien formé :<br>\n1. Un message de retour <code>A --&gt; B</code> n\'est valide que si un appel synchrone <code>B -&gt; A</code> est actuellement ouvert sur la pile d\'activation.<br>\n2. À la fin de la séquence, toutes les activations doivent être fermées (pile vide).<br>\nPour chaque ligne lue :<br>\n- Si appel synchrone : afficher <code>[APPEL] &lt;Source&gt; invoque &lt;Cible&gt;.&lt;methode&gt; (Profondeur: &lt;N&gt;)</code><br>\n- Si retour : afficher <code>[RETOUR] &lt;Source&gt; repond a &lt;Cible&gt; : &lt;reponse&gt;</code><br>\n- Si retour incohérent : afficher <code>[ERREUR RETOUR] Pas d appel en attente de &lt;Cible&gt; vers &lt;Source&gt;</code>.<br>\nTerminer par le statut global : <code>SEQUENCE VALIDE</code> ou <code>SEQUENCE INCOMPLETE (&lt;X&gt; appels non clos)</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la pile d'activation du diagramme de séquence
`,
    hints: [
      'Gérer une pile (stack) d\'appels contenant des tuples (demandeur, executeur).',
      'Un message "-->" doit dépiler le sommet de la pile et vérifier la concordance des acteurs.'
    ],
    examples: [
      {
        stdin: "Client -> Serveur : getCatalogue()\nServeur -> BDD : queryAll()\nBDD --> Serveur : [art1, art2]\nServeur --> Client : listeArticles",
        expected: "[APPEL] Client invoque Serveur.getCatalogue (Profondeur: 1)\n[APPEL] Serveur invoque BDD.queryAll (Profondeur: 2)\n[RETOUR] BDD repond a Serveur : [art1, art2]\n[RETOUR] Serveur repond a Client : listeArticles\nSEQUENCE VALIDE",
        note: 'Trace synchrone imbriquée parfaitement équilibrée.'
      }
    ],
    tests: [
      {
        label: 'Appel non refermé en fin de scénario',
        stdin: "IHM -> Controller : valider()\nController -> Service : check()",
        expected: "[APPEL] IHM invoque Controller.valider (Profondeur: 1)\n[APPEL] Controller invoque Service.check (Profondeur: 2)\nSEQUENCE INCOMPLETE (2 appels non clos)"
      },
      {
        label: 'Retour envoyé sans appel préalable',
        stdin: "Client --> Serveur : ok",
        expected: "[ERREUR RETOUR] Pas d appel en attente de Serveur vers Client\nSEQUENCE VALIDE"
      },
      {
        label: 'Séquence à trois niveaux avec fermetures successives',
        stdin: "A -> B : m1()\nB --> A : r1\nA -> C : m2()\nC --> A : r2",
        expected: "[APPEL] A invoque B.m1 (Profondeur: 1)\n[RETOUR] B repond a A : r1\n[APPEL] A invoque C.m2 (Profondeur: 1)\n[RETOUR] C repond a A : r2\nSEQUENCE VALIDE"
      },
      {
        label: 'Mauvais destinataire sur message de retour',
        stdin: "A -> B : f()\nB --> C : res",
        expected: "[APPEL] A invoque B.f (Profondeur: 1)\n[ERREUR RETOUR] Pas d appel en attente de C vers B\nSEQUENCE INCOMPLETE (1 appels non clos)"
      }
    ],
    solution: `import sys, re

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    stack = [] # list of (src, dst)
    
    for l in lignes:
        if "-->" in l:
            # Message retour
            m = re.match(r"(\\w+)\\s*-->\\s*(\\w+)\\s*:\\s*(.*)", l)
            if m:
                src, dst, rep = m.groups()
                rep = rep.strip()
                if stack and stack[-1] == (dst, src):
                    stack.pop()
                    print(f"[RETOUR] {src} repond a {dst} : {rep}")
                else:
                    print(f"[ERREUR RETOUR] Pas d appel en attente de {dst} vers {src}")
        elif "->" in l:
            # Message synchrone
            m = re.match(r"(\\w+)\\s*->\\s*(\\w+)\\s*:\\s*(\\w+)\\(.*\\)", l)
            if m:
                src, dst, methode = m.groups()
                stack.append((src, dst))
                print(f"[APPEL] {src} invoque {dst}.{methode} (Profondeur: {len(stack)})")
                
    if not stack:
        print("SEQUENCE VALIDE")
    else:
        print(f"SEQUENCE INCOMPLETE ({len(stack)} appels non clos)")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c4-e2',
    chapter: 4,
    title: "Évaluateur de fragments combinés (alt, opt, loop)",
    level: 'n2',
    language: 'python',
    goal: "Interpréter les fragments d'interaction UML (alt pour alternative exclusive, opt pour optionnel, loop pour itération).",
    brief: '<p>Le script simule l\'exécution d\'un fragment combiné UML en fonction d\'un contexte de variables initiales :<br>\n- Première ligne : variables d\'état au format <code>VAR k=v ...</code> (ex: <code>VAR solde=150 age=20</code>).<br>\n- Lignes suivantes : blocs de séquence balisés :<br>\n  * <code>ALT [garde]</code> ... <code>ELSE</code> ... <code>END_ALT</code><br>\n  * <code>OPT [garde]</code> ... <code>END_OPT</code><br>\n  * <code>LOOP [N]</code> ... <code>END_LOOP</code> (répète N fois le bloc)<br>\n  * Messages simples : <code>A -&gt; B : msg</code><br>\nLe script évalue les gardes booléennes simples (ex: <code>solde &gt;= 100</code>). Si la condition est vraie, les messages internes sont exécutés et affichés au format :<br>\n<code>[EXEC] &lt;Source&gt; -&gt; &lt;Cible&gt; : &lt;msg&gt;</code>.<br>\nSi la garde est fausse, le bloc est ignoré (ou la branche ELSE est empruntée).<br>\nÀ la fin, afficher le nombre total de messages émis : <code>MESSAGES TRANSMIS: &lt;N&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : exécuter les fragments combinés selon les gardes
`,
    hints: [
      'Stocker les variables dans un dictionnaire pour évaluer les expressions de garde.',
      'Pour le bloc LOOP [N], exécuter le corps N fois.'
    ],
    examples: [
      {
        stdin: "VAR solde=200\nALT [solde >= 100]\n  Client -> Distributeur : delivrerBillets\nELSE\n  Client -> Distributeur : refuserRetrait\nEND_ALT",
        expected: "[EXEC] Client -> Distributeur : delivrerBillets\nMESSAGES TRANSMIS: 1",
        note: 'La garde solde >= 100 est vraie (200 >= 100), la branche ALT est exécutée.'
      }
    ],
    tests: [
      {
        label: 'Branche ELSE exécutée',
        stdin: "VAR solde=50\nALT [solde >= 100]\n  Client -> Distributeur : delivrerBillets\nELSE\n  Client -> Distributeur : refuserRetrait\nEND_ALT",
        expected: "[EXEC] Client -> Distributeur : refuserRetrait\nMESSAGES TRANSMIS: 1"
      },
      {
        label: 'Fragment OPT vérifié',
        stdin: "VAR assurance=1\nOPT [assurance == 1]\n  Client -> Assureur : souscrirePolice\nEND_OPT",
        expected: "[EXEC] Client -> Assureur : souscrirePolice\nMESSAGES TRANSMIS: 1"
      },
      {
        label: 'Fragment OPT non vérifié',
        stdin: "VAR assurance=0\nOPT [assurance == 1]\n  Client -> Assureur : souscrirePolice\nEND_OPT",
        expected: "MESSAGES TRANSMIS: 0"
      },
      {
        label: 'Fragment LOOP répété 3 fois',
        stdin: "VAR ok=1\nLOOP [3]\n  Capteur -> Serveur : envoyerMesure\nEND_LOOP",
        expected: "[EXEC] Capteur -> Serveur : envoyerMesure\n[EXEC] Capteur -> Serveur : envoyerMesure\n[EXEC] Capteur -> Serveur : envoyerMesure\nMESSAGES TRANSMIS: 3"
      }
    ],
    solution: `import sys, re

def eval_garde(expr, vars_map):
    expr = expr.strip()
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
        
    vars_map = {}
    if lignes[0].startswith("VAR "):
        parts = lignes[0][4:].split()
        for p in parts:
            k, v = p.split("=")
            vars_map[k] = float(v)
        code_lines = lignes[1:]
    else:
        code_lines = lignes
        
    total_msgs = 0
    i = 0
    n = len(code_lines)
    
    while i < n:
        l = code_lines[i]
        if l.startswith("ALT ["):
            garde = l[5:l.find("]")]
            branche_alt = []
            branche_else = []
            dans_else = False
            i += 1
            while i < n and code_lines[i] != "END_ALT":
                if code_lines[i] == "ELSE":
                    dans_else = True
                else:
                    if dans_else:
                        branche_else.append(code_lines[i])
                    else:
                        branche_alt.append(code_lines[i])
                i += 1
            choix = branche_alt if eval_garde(garde, vars_map) else branche_else
            for msg in choix:
                print(f"[EXEC] {msg}")
                total_msgs += 1
        elif l.startswith("OPT ["):
            garde = l[5:l.find("]")]
            bloc = []
            i += 1
            while i < n and code_lines[i] != "END_OPT":
                bloc.append(code_lines[i])
                i += 1
            if eval_garde(garde, vars_map):
                for msg in bloc:
                    print(f"[EXEC] {msg}")
                    total_msgs += 1
        elif l.startswith("LOOP ["):
            nb = int(l[6:l.find("]")])
            bloc = []
            i += 1
            while i < n and code_lines[i] != "END_LOOP":
                bloc.append(code_lines[i])
                i += 1
            for _ in range(nb):
                for msg in bloc:
                    print(f"[EXEC] {msg}")
                    total_msgs += 1
        else:
            if "->" in l:
                print(f"[EXEC] {l}")
                total_msgs += 1
        i += 1
        
    print(f"MESSAGES TRANSMIS: {total_msgs}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c4-e3',
    chapter: 4,
    title: "Analyseur de synchronisme et concurrence de messages",
    level: 'n3',
    language: 'python',
    goal: "Distinguer les messages synchrones (flèche pleine, appel bloquant) des messages asynchrones (flèche ouverte, non bloquant) et détecter les risques de blocage.",
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- <code>SYNC &lt;A&gt; -&gt;&gt; &lt;B&gt; : &lt;op&gt;</code> (Appel synchrone : l\'émetteur A est bloqué jusqu\'à la réponse de B)<br>\n- <code>ASYNC &lt;A&gt; -&gt; &lt;B&gt; : &lt;signal&gt;</code> (Message asynchrone : non bloquant, A continue sans attendre)<br>\n- <code>REPLY &lt;B&gt; --&gt; &lt;A&gt;</code> (Fin du blocage de A)<br>\nRègles d\'analyse :<br>\n1. Si un émetteur A tente un appel (synchrone ou asynchrone) alors qu\'il est lui-même <strong>déjà bloqué en attente d\'une réponse synchrone</strong> : <code>[BLOCAGE] &lt;A&gt; ne peut pas emettre (bloque en attente de reponse)</code>.<br>\n2. Si un appel synchrone est circulaire direct (A attend B et B attend A) : <code>[DEADLOCK] Interblocage mutuel detecte entre &lt;A&gt; et &lt;B&gt;</code>.<br>\n3. Sinon, afficher : <code>[OK] &lt;TYPE&gt; de &lt;A&gt; vers &lt;B&gt; (Statut &lt;A&gt;: &lt;BLOQUE|LIBRE&gt;)</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : modéliser l'état bloquant/non-bloquant des lifelines
`,
    hints: [
      'Maintenir l\'état de chaque lifeline : bloquée (avec le nom de l\'acteur attendu) ou libre.',
      'Un message asynchrone n\'altère pas la disponibilité de l\'émetteur.'
    ],
    examples: [
      {
        stdin: "SYNC Client ->> Serveur : getData\nASYNC Serveur -> Logger : logEvent\nREPLY Serveur --> Client\nSYNC Client ->> Autre : check",
        expected: "[OK] SYNC de Client vers Serveur (Statut Client: BLOQUE)\n[OK] ASYNC de Serveur vers Logger (Statut Serveur: LIBRE)\n[OK] REPLY de Serveur vers Client (Statut Client: LIBRE)\n[OK] SYNC de Client vers Autre (Statut Client: BLOQUE)",
        note: 'Le client se bloque sur l\'appel synchrone, le serveur émet en asynchrone sans bloquer, puis le client est débloqué.'
      }
    ],
    tests: [
      {
        label: 'Émission refusée pour acteur déjà bloqué',
        stdin: "SYNC A ->> B : req1\nSYNC A ->> C : req2",
        expected: "[OK] SYNC de A vers B (Statut A: BLOQUE)\n[BLOCAGE] A ne peut pas emettre (bloque en attente de reponse)"
      },
      {
        label: 'Deadlock mutuel direct',
        stdin: "SYNC X ->> Y : call1\nSYNC Y ->> X : call2",
        expected: "[OK] SYNC de X vers Y (Statut X: BLOQUE)\n[DEADLOCK] Interblocage mutuel detecte entre Y et X"
      },
      {
        label: 'Messages asynchrones consécutifs sans blocage',
        stdin: "ASYNC Producteur -> File : push1\nASYNC Producteur -> File : push2\nASYNC Producteur -> File : push3",
        expected: "[OK] ASYNC de Producteur vers File (Statut Producteur: LIBRE)\n[OK] ASYNC de Producteur vers File (Statut Producteur: LIBRE)\n[OK] ASYNC de Producteur vers File (Statut Producteur: LIBRE)"
      },
      {
        label: 'Déblocage normal et réutilisation',
        stdin: "SYNC A ->> B : f\nREPLY B --> A\nASYNC A -> C : g",
        expected: "[OK] SYNC de A vers B (Statut A: BLOQUE)\n[OK] REPLY de B vers A (Statut A: LIBRE)\n[OK] ASYNC de A vers C (Statut A: LIBRE)"
      }
    ],
    solution: `import sys, re

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    en_attente = {} # acteur -> acteur_attendu (None si libre)
    
    for l in lignes:
        if l.startswith("SYNC "):
            m = re.match(r"SYNC\\s+(\\w+)\\s*->>\\s*(\\w+)", l)
            if m:
                a, b = m.groups()
                if en_attente.get(a):
                    print(f"[BLOCAGE] {a} ne peut pas emettre (bloque en attente de reponse)")
                elif en_attente.get(b) == a:
                    print(f"[DEADLOCK] Interblocage mutuel detecte entre {a} et {b}")
                else:
                    en_attente[a] = b
                    print(f"[OK] SYNC de {a} vers {b} (Statut {a}: BLOQUE)")
        elif l.startswith("ASYNC "):
            m = re.match(r"ASYNC\\s+(\\w+)\\s*->\\s*(\\w+)", l)
            if m:
                a, b = m.groups()
                if en_attente.get(a):
                    print(f"[BLOCAGE] {a} ne peut pas emettre (bloque en attente de reponse)")
                else:
                    print(f"[OK] ASYNC de {a} vers {b} (Statut {a}: LIBRE)")
        elif l.startswith("REPLY "):
            m = re.match(r"REPLY\\s+(\\w+)\\s*-->\\s*(\\w+)", l)
            if m:
                b, a = m.groups()
                if en_attente.get(a) == b:
                    en_attente[a] = None
                    print(f"[OK] REPLY de {b} vers {a} (Statut {a}: LIBRE)")
                else:
                    print(f"[OK] REPLY de {b} vers {a} (Statut {a}: LIBRE)")

if __name__ == "__main__":
    main()
`
  }
];
