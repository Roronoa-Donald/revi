'use strict';

module.exports = [
  {
    "id": "um2-c6-e1",
    "chapter": 6,
    "title": "Machine à états finis UML (State Machine)",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler un automate d'états finis UML en évaluant les transitions déclenchées par des événements avec gardes et actions.",
    "brief": "<p>Analysez les données fournies pour chaque cas...]</code>.<br>\nPour chaque événement :<br>\n- Si une transition valide existe depuis l'état courant avec une garde vraie :<br>\n  franchir la transition, exécuter l'action éventuelle, et afficher :<br>\n  <code>[TRANSITION] &lt;Source&gt; -&gt; &lt;Cible&gt; via &lt;event&gt; [Action: &lt;act&gt;]</code><br>\n- Si aucune transition n'est franchissable :<br>\n  afficher <code>[IGNORE] Evenement &lt;event&gt; sans effet dans l'etat &lt;EtatCourant&gt;</code>.<br>\nÀ la fin, afficher : <code>ETAT FINAL COURANT: &lt;Etat&gt;</code>.</p>",
    "starter": "# Grille d'analyse (um2-c6-e1) — Machine à états finis UML (State Machine)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Événement ignoré car état incompatible]\n# Données : INITIAL Initial\n# Données : TRANSITION Initial -> Actif : start / initTimer\n# Données : EVENT stop\n# Données : EVENT start\nA_COMPLETER\n\n[Cas 2 — Garde non satisfaite]\n# Données : INITIAL Verrouille\n# Données : TRANSITION Verrouille -> Deverrouille : badge [codeValide==1] / ouvrirPorte\n# Données : EVENT badge codeValide=0\nA_COMPLETER\n\n[Cas 3 — Transition sans action]\n# Données : INITIAL E1\n# Données : TRANSITION E1 -> E2 : valider\n# Données : EVENT valider\nA_COMPLETER\n",
    "hints": [
      "Gérer l'état courant sous forme d'une variable initialisée par la directive INITIAL.",
      "Une transition est franchie seulement si l'événement correspond et que sa condition de garde est satisfaite."
    ],
    "examples": [
      {
        "stdin": "INITIAL Cree\nTRANSITION Cree -> Paye : payer [montant>0] / emettreRecu\nTRANSITION Paye -> Expedie : expedier / notifierClient\nEVENT payer montant=50\nEVENT expedier",
        "expected": "[TRANSITION] Cree -> Paye via payer [Action: emettreRecu]\n[TRANSITION] Paye -> Expedie via expedier [Action: notifierClient]\nETAT FINAL COURANT: Expedie",
        "note": "Cycle de vie d'une commande : Créée -> Payée -> Expédiée."
      }
    ],
    "tests": [
      {
        "label": "Événement ignoré car état incompatible",
        "stdin": "cas:1",
        "expected": "[IGNORE] Evenement stop sans effet dans l'etat Initial\n[TRANSITION] Initial -> Actif via start [Action: initTimer]\nETAT FINAL COURANT: Actif"
      },
      {
        "label": "Garde non satisfaite",
        "stdin": "cas:2",
        "expected": "[IGNORE] Evenement badge sans effet dans l'etat Verrouille\nETAT FINAL COURANT: Verrouille"
      },
      {
        "label": "Transition sans action",
        "stdin": "cas:3",
        "expected": "[TRANSITION] E1 -> E2 via valider [Action: aucune]\nETAT FINAL COURANT: E2"
      }
    ],
    "solution": "[Exemple]\n[TRANSITION] Cree -> Paye via payer [Action: emettreRecu]\n[TRANSITION] Paye -> Expedie via expedier [Action: notifierClient]\nETAT FINAL COURANT: Expedie\n\n[Cas 1 — Événement ignoré car état incompatible]\n[IGNORE] Evenement stop sans effet dans l'etat Initial\n[TRANSITION] Initial -> Actif via start [Action: initTimer]\nETAT FINAL COURANT: Actif\n\n[Cas 2 — Garde non satisfaite]\n[IGNORE] Evenement badge sans effet dans l'etat Verrouille\nETAT FINAL COURANT: Verrouille\n\n[Cas 3 — Transition sans action]\n[TRANSITION] E1 -> E2 via valider [Action: aucune]\nETAT FINAL COURANT: E2"
  },
  {
    "id": "um2-c6-e2",
    "chapter": 6,
    "title": "Vérificateur d'interfaces de composants (Lollipop)",
    "level": "n2",
    "language": "analyse",
    "goal": "Valider l'assemblage de composants logiciels UML en appariant les interfaces fournies (ball/lollipop) et requises (socket).",
    "brief": "<p>Dans un diagramme de composants UML :<br>\n- Un composant <strong>fournit</strong> une interface via une sucette/cercle plein (lollipop) : <code>PROVIDES &lt;Composant&gt; &lt;Interface&gt;:&lt;Version&gt;</code>.<br>\n- Un composant <strong>requiert</strong> une interface via un demi-cercle (socket) : <code>REQUIRES &lt;Composant&gt; &lt;Interface&gt;:&lt;VersionMin&gt;</code>.<br>\n- Un connecteur d'assemblage relie deux composants : <code>CONNECT &lt;ClientComp&gt; -&gt; &lt;FournisseurComp&gt; [&lt;Interface&gt;]</code>.<br>\nRègles de validation :<br>\n1. Le composant fournisseur doit obligatoirement fournir l'interface spécifiée.<br>\n2. Le composant client doit requérir cette interface.<br>\n3. La version fournie doit être <strong>supérieure ou égale</strong> à la version minimale requise (<code>VersionFournie &gt;= VersionMin</code>).<br>\nAfficher pour chaque connecteur :<br>\n<code>[VALIDE|ERREUR] Assemblage &lt;Client&gt; -&gt; &lt;Fournisseur&gt; (&lt;Interface&gt;) : &lt;motif&gt;</code>.<br>\nÀ la fin : <code>CONNECTEURS CONFORMES: &lt;N&gt;/&lt;Total&gt;</code>.</p>",
    "starter": "# Grille d'analyse (um2-c6-e2) — Vérificateur d'interfaces de composants (Lollipop)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Version fournie obsolète par rapport au besoin]\n# Données : PROVIDES DBService IDatabase:1.0\n# Données : REQUIRES BackendApp IDatabase:2.0\n# Données : CONNECT BackendApp -> DBService [IDatabase]\nA_COMPLETER\n\n[Cas 2 — Interface non fournie par le composant cible]\n# Données : PROVIDES AuthEngine IAuth:1.0\n# Données : REQUIRES Gateway IPayment:1.0\n# Données : CONNECT Gateway -> AuthEngine [IPayment]\nA_COMPLETER\n\n[Cas 3 — Plusieurs connecteurs réussis]\n# Données : PROVIDES C1 I1:1.0\n# Données : PROVIDES C2 I2:3.0\n# Données : REQUIRES App I1:1.0\n# Données : REQUIRES App I2:2.5\n# Données : CONNECT App -> C1 [I1]\n# Données : CONNECT App -> C2 [I2]\nA_COMPLETER\n",
    "hints": [
      "Gérer un dictionnaire pour les interfaces fournies (comp -> {interface: version}) et requises.",
      "Comparer les numéros de version sous forme numérique flottante ou entière."
    ],
    "examples": [
      {
        "stdin": "PROVIDES ServicePaiement IPayment:2.0\nREQUIRES ModulePanier IPayment:1.5\nCONNECT ModulePanier -> ServicePaiement [IPayment]",
        "expected": "[VALIDE] Assemblage ModulePanier -> ServicePaiement (IPayment) : Compatibilite version v2.0 >= v1.5\nCONNECTEURS CONFORMES: 1/1",
        "note": "Le service fournit IPayment v2.0, supérieur au v1.5 requis."
      }
    ],
    "tests": [
      {
        "label": "Version fournie obsolète par rapport au besoin",
        "stdin": "cas:1",
        "expected": "[ERREUR] Assemblage BackendApp -> DBService (IDatabase) : Version incompatible v1.0 < v2.0\nCONNECTEURS CONFORMES: 0/1"
      },
      {
        "label": "Interface non fournie par le composant cible",
        "stdin": "cas:2",
        "expected": "[ERREUR] Assemblage Gateway -> AuthEngine (IPayment) : Interface non fournie par AuthEngine\nCONNECTEURS CONFORMES: 0/1"
      },
      {
        "label": "Plusieurs connecteurs réussis",
        "stdin": "cas:3",
        "expected": "[VALIDE] Assemblage App -> C1 (I1) : Compatibilite version v1.0 >= v1.0\n[VALIDE] Assemblage App -> C2 (I2) : Compatibilite version v3.0 >= v2.5\nCONNECTEURS CONFORMES: 2/2"
      }
    ],
    "solution": "[Exemple]\n[VALIDE] Assemblage ModulePanier -> ServicePaiement (IPayment) : Compatibilite version v2.0 >= v1.5\nCONNECTEURS CONFORMES: 1/1\n\n[Cas 1 — Version fournie obsolète par rapport au besoin]\n[ERREUR] Assemblage BackendApp -> DBService (IDatabase) : Version incompatible v1.0 < v2.0\nCONNECTEURS CONFORMES: 0/1\n\n[Cas 2 — Interface non fournie par le composant cible]\n[ERREUR] Assemblage Gateway -> AuthEngine (IPayment) : Interface non fournie par AuthEngine\nCONNECTEURS CONFORMES: 0/1\n\n[Cas 3 — Plusieurs connecteurs réussis]\n[VALIDE] Assemblage App -> C1 (I1) : Compatibilite version v1.0 >= v1.0\n[VALIDE] Assemblage App -> C2 (I2) : Compatibilite version v3.0 >= v2.5\nCONNECTEURS CONFORMES: 2/2"
  },
  {
    "id": "um2-c6-e3",
    "chapter": 6,
    "title": "Mappeur de diagramme de déploiement (Nœuds & Artefacts)",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la cohérence d'un diagramme de déploiement : hébergement des artefacts dans les nœuds et compatibilité des protocoles de communication.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nPour chaque communication applicative <code>COMM</code> :<br>\n1. Si les deux artefacts résident sur le <strong>même nœud</strong> : <code>[LOCAL] Communication intra-noeud sur &lt;Noeud&gt; : OK</code>.<br>\n2. S'ils sont sur deux nœuds distincts, vérifier s'il existe un <code>LINK</code> direct entre ces deux nœuds supportant le protocole requis <code>REQ_PROTO</code>.<br>\n   - Si oui : <code>[RESEAU OK] &lt;ArtA&gt; (&lt;NoeudA&gt;) communique avec &lt;ArtB&gt; (&lt;NoeudB&gt;) via &lt;Proto&gt;</code>.<br>\n   - Si aucun lien réseau ou protocole incompatible : <code>[ECHEC RESEAU] Pas de lien compatible &lt;Proto&gt; entre &lt;NoeudA&gt; et &lt;NoeudB&gt;</code>.<br>\nBilan final : <code>COMMUNICATIONS OPERATIONNELLES: &lt;N&gt;/&lt;Total&gt;</code>.</p>",
    "starter": "# Grille d'analyse (um2-c6-e3) — Mappeur de diagramme de déploiement (Nœuds & Artefacts)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Communication locale sur même nœud]\n# Données : NODE Srv1 <<device>>\n# Données : DEPLOY ServiceA ON Srv1\n# Données : DEPLOY ServiceB ON Srv1\n# Données : COMM ServiceA -> ServiceB REQ_PROTO=IPC\nA_COMPLETER\n\n[Cas 2 — Protocole réseau incompatible]\n# Données : NODE AppSrv <<device>>\n# Données : NODE DBSrv <<device>>\n# Données : DEPLOY Backend ON AppSrv\n# Données : DEPLOY Postgres ON DBSrv\n# Données : LINK AppSrv <--> DBSrv PROTO=SSH\n# Données : COMM Backend -> Postgres REQ_PROTO=JDBC\nA_COMPLETER\n\n[Cas 3 — Absence totale de lien réseau]\n# Données : NODE N1 <<device>>\n# Données : NODE N2 <<device>>\n# Données : DEPLOY A1 ON N1\n# Données : DEPLOY A2 ON N2\n# Données : COMM A1 -> A2 REQ_PROTO=TCP\nA_COMPLETER\n",
    "hints": [
      "Associer chaque artefact à son nœud d'hébergement.",
      "Vérifier l'existence d'un lien réseau bidirectionnel supportant le protocole spécifié."
    ],
    "examples": [
      {
        "stdin": "NODE ClientPC <<device>>\nNODE WebServer <<executionEnvironment>>\nDEPLOY AppReact ON ClientPC\nDEPLOY ApiFlask ON WebServer\nLINK ClientPC <--> WebServer PROTO=HTTPS\nCOMM AppReact -> ApiFlask REQ_PROTO=HTTPS",
        "expected": "[RESEAU OK] AppReact (ClientPC) communique avec ApiFlask (WebServer) via HTTPS\nCOMMUNICATIONS OPERATIONNELLES: 1/1",
        "note": "Communication client-serveur validée sur lien HTTPS."
      }
    ],
    "tests": [
      {
        "label": "Communication locale sur même nœud",
        "stdin": "cas:1",
        "expected": "[LOCAL] Communication intra-noeud sur Srv1 : OK\nCOMMUNICATIONS OPERATIONNELLES: 1/1"
      },
      {
        "label": "Protocole réseau incompatible",
        "stdin": "cas:2",
        "expected": "[ECHEC RESEAU] Pas de lien compatible JDBC entre AppSrv et DBSrv\nCOMMUNICATIONS OPERATIONNELLES: 0/1"
      },
      {
        "label": "Absence totale de lien réseau",
        "stdin": "cas:3",
        "expected": "[ECHEC RESEAU] Pas de lien compatible TCP entre N1 et N2\nCOMMUNICATIONS OPERATIONNELLES: 0/1"
      }
    ],
    "solution": "[Exemple]\n[RESEAU OK] AppReact (ClientPC) communique avec ApiFlask (WebServer) via HTTPS\nCOMMUNICATIONS OPERATIONNELLES: 1/1\n\n[Cas 1 — Communication locale sur même nœud]\n[LOCAL] Communication intra-noeud sur Srv1 : OK\nCOMMUNICATIONS OPERATIONNELLES: 1/1\n\n[Cas 2 — Protocole réseau incompatible]\n[ECHEC RESEAU] Pas de lien compatible JDBC entre AppSrv et DBSrv\nCOMMUNICATIONS OPERATIONNELLES: 0/1\n\n[Cas 3 — Absence totale de lien réseau]\n[ECHEC RESEAU] Pas de lien compatible TCP entre N1 et N2\nCOMMUNICATIONS OPERATIONNELLES: 0/1"
  }
];
