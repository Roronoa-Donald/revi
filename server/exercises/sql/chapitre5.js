'use strict';

module.exports = [
  {
    "id": "sql2-c5-e1",
    "chapter": 5,
    "title": "Simulateur de transaction atomique bancaire (COMMIT vs ROLLBACK)",
    "level": "n1",
    "language": "analyse",
    "goal": "Appliquer l’atomicité (A de ACID) : si un virement échoue (fonds insuffisants), la transaction entière est annulée.",
    "brief": "<p>Une transaction bancaire transfère des fonds entre comptes : <code>TRANSFERT source destination montant</code>. Pour chaque transfert, le compte source doit exister et disposer d’au moins le montant demandé (pas de découvert). Le compte destination doit également exister.\nSi toutes les opérations réussissent, la transaction fait <code>COMMIT</code>. Si la moindre opération échoue, la transaction fait <code>ROLLBACK</code> et restaure l’état exact de départ.</p>\n<p>Entrée :\n- Ligne 1 : Soldes initiaux <code>compte:solde</code> séparés par des virgules (ex: <code>A:1000,B:500,C:200</code>).\n- Lignes suivantes : Opérations <code>TRANSFERT source destination montant</code>.\n\nSortie :\n- Si succès : <code>Statut: COMMIT | Soldes: &lt;compte:solde triés&gt;</code>\n- Si échec : <code>Statut: ROLLBACK | Erreur: &lt;Raison&gt; | Soldes: &lt;soldes initiaux inchangés&gt;</code></p>",
    "starter": "# Grille d'analyse (sql2-c5-e1) — Simulateur de transaction atomique bancaire (COMMIT vs ROLLBACK)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — ROLLBACK pour solde insuffisant]\n# Données : A:100,B:50\n# Données : TRANSFERT A B 50\n# Données : TRANSFERT A B 80\nA_COMPLETER\n\n[Cas 2 — ROLLBACK pour compte inexistant]\n# Données : A:500,B:200\n# Données : TRANSFERT A Z 100\nA_COMPLETER\n\n[Cas 3 — Multiple transferts équilibrés avec COMMIT]\n# Données : A:100,B:100,C:100\n# Données : TRANSFERT A B 100\n# Données : TRANSFERT B C 200\n# Données : TRANSFERT C A 50\nA_COMPLETER\n",
    "hints": [
      "Garde une copie indépendante des soldes initiaux pour le ROLLBACK.",
      "Vérifie que les comptes source et destination existent.",
      "Vérifie que le solde de la source est suffisant (>= montant).",
      "Si une erreur survient, interromps les virements et restaure la copie de départ."
    ],
    "examples": [
      {
        "stdin": "A:1000,B:500,C:200\nTRANSFERT A B 300\nTRANSFERT B C 150",
        "expected": "Statut: COMMIT | Soldes: A:700,B:650,C:350",
        "note": "Tous les virements sont valides, la transaction est validée (COMMIT)."
      }
    ],
    "tests": [
      {
        "label": "ROLLBACK pour solde insuffisant",
        "stdin": "cas:1",
        "expected": "Statut: ROLLBACK | Erreur: Solde insuffisant pour A | Soldes: A:100,B:50"
      },
      {
        "label": "ROLLBACK pour compte inexistant",
        "stdin": "cas:2",
        "expected": "Statut: ROLLBACK | Erreur: Compte inconnu Z | Soldes: A:500,B:200"
      },
      {
        "label": "Multiple transferts équilibrés avec COMMIT",
        "stdin": "cas:3",
        "expected": "Statut: COMMIT | Soldes: A:50,B:0,C:250"
      }
    ],
    "solution": "[Exemple]\nStatut: COMMIT | Soldes: A:700,B:650,C:350\n\n[Cas 1 — ROLLBACK pour solde insuffisant]\nStatut: ROLLBACK | Erreur: Solde insuffisant pour A | Soldes: A:100,B:50\n\n[Cas 2 — ROLLBACK pour compte inexistant]\nStatut: ROLLBACK | Erreur: Compte inconnu Z | Soldes: A:500,B:200\n\n[Cas 3 — Multiple transferts équilibrés avec COMMIT]\nStatut: COMMIT | Soldes: A:50,B:0,C:250"
  },
  {
    "id": "sql2-c5-e2",
    "chapter": 5,
    "title": "Gestionnaire de points de sauvegarde SAVEPOINT & ROLLBACK TO",
    "level": "n2",
    "language": "analyse",
    "goal": "Gérer des états intermédiaires dans une transaction avec les points de reprise SAVEPOINT.",
    "brief": "<p>Dans une longue transaction SQL, l’instruction <code>SAVEPOINT nom_point</code> sauvegarde l’état courant de la base. En cas d’erreur survenue ultérieurement, la commande <code>ROLLBACK TO nom_point</code> annule uniquement les opérations effectuées après ce point de sauvegarde sans compromettre le reste de la transaction.</p>\n<p>Entrée :\nUne suite de commandes sur chaque ligne :\n- <code>AJOUT cle valeur</code>\n- <code>SAVEPOINT nom</code>\n- <code>ROLLBACK TO nom</code>\n- <code>COMMIT</code>\n\nSortie :\n<code>Etat_Final: &lt;cle:valeur triées&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sql2-c5-e2) — Gestionnaire de points de sauvegarde SAVEPOINT & ROLLBACK TO\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Savepoints multiples emboîtés]\n# Données : AJOUT X 1\n# Données : SAVEPOINT sp1\n# Données : AJOUT Y 2\n# Données : SAVEPOINT sp2\n# Données : AJOUT Z 3\n# Données : ROLLBACK TO sp2\n# Données : COMMIT\nA_COMPLETER\n\n[Cas 2 — Retour complet au premier savepoint]\n# Données : AJOUT K 100\n# Données : SAVEPOINT depart\n# Données : AJOUT K 200\n# Données : AJOUT L 300\n# Données : ROLLBACK TO depart\n# Données : COMMIT\nA_COMPLETER\n\n[Cas 3 — Aucun rollback intervenu]\n# Données : AJOUT A 1\n# Données : AJOUT B 2\n# Données : COMMIT\nA_COMPLETER\n",
    "hints": [
      "Maintiens un dictionnaire représentant l état de la base.",
      "Pour chaque SAVEPOINT nom, sauvegarde une copie superficielle ou profonde du dictionnaire dans un historique {nom: copie}.",
      "Lors de ROLLBACK TO nom, restaure la copie correspondante."
    ],
    "examples": [
      {
        "stdin": "AJOUT A 10\nSAVEPOINT sp1\nAJOUT B 20\nROLLBACK TO sp1\nAJOUT C 30\nCOMMIT",
        "expected": "Etat_Final: A:10,C:30",
        "note": "L'ajout de B est annulé par le ROLLBACK TO sp1, mais A:10 est conservé."
      }
    ],
    "tests": [
      {
        "label": "Savepoints multiples emboîtés",
        "stdin": "cas:1",
        "expected": "Etat_Final: X:1,Y:2"
      },
      {
        "label": "Retour complet au premier savepoint",
        "stdin": "cas:2",
        "expected": "Etat_Final: K:100"
      },
      {
        "label": "Aucun rollback intervenu",
        "stdin": "cas:3",
        "expected": "Etat_Final: A:1,B:2"
      }
    ],
    "solution": "[Exemple]\nEtat_Final: A:10,C:30\n\n[Cas 1 — Savepoints multiples emboîtés]\nEtat_Final: X:1,Y:2\n\n[Cas 2 — Retour complet au premier savepoint]\nEtat_Final: K:100\n\n[Cas 3 — Aucun rollback intervenu]\nEtat_Final: A:1,B:2"
  },
  {
    "id": "sql2-c5-e3",
    "chapter": 5,
    "title": "Détecteur d’interblocage (Deadlock) par graphe d’attente (Wait-For Graph)",
    "level": "n3",
    "language": "analyse",
    "goal": "Construire le graphe orienté de dépendance des transactions et détecter la présence d’un cycle d’interblocage.",
    "brief": "<p>Un interblocage (Deadlock) survient lorsque deux ou plusieurs transactions s’attendent mutuellement pour libérer des verrous exclusifs.\nSi la transaction T1 détient la ressource R1 et attend R2, alors que T2 détient R2 et attend R1, il y a une dépendance circulaire <code>T1 -&gt; T2 -&gt; T1</code>.</p>\n<p>Entrée :\nChaque ligne décrit une transaction : <code>T_ID DETIENT ressource_tenue ATTEND ressource_attendue</code> (ou <code>ATTEND AUCUNE</code> s’il n’y a pas d’attente).\n\nSortie :\n- S’il existe un cycle : <code>DEADLOCK DETECTE: cycle &lt;T_A -&gt; T_B -&gt; ... -&gt; T_A&gt;</code>\n- Si le graphe est acyclique : <code>AUCUN DEADLOCK: execution possible</code>.</p>",
    "starter": "# Grille d'analyse (sql2-c5-e3) — Détecteur d’interblocage (Deadlock) par graphe d’attente (Wait-For Graph)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Exécution séquentielle sans cycle]\n# Données : T1 DETIENT R1 ATTEND AUCUNE\n# Données : T2 DETIENT R2 ATTEND R1\nA_COMPLETER\n\n[Cas 2 — Interblocage à 3 transactions (T1 -> T2 -> T3 -> T1)]\n# Données : T1 DETIENT R1 ATTEND R2\n# Données : T2 DETIENT R2 ATTEND R3\n# Données : T3 DETIENT R3 ATTEND R1\nA_COMPLETER\n\n[Cas 3 — Graphe sans attente mutuelle]\n# Données : T1 DETIENT R1 ATTEND R3\n# Données : T2 DETIENT R2 ATTEND R3\n# Données : T3 DETIENT R3 ATTEND AUCUNE\nA_COMPLETER\n",
    "hints": [
      "Établis qui détient chaque ressource : detenteurs[ressource] = transaction.",
      "Pour chaque transaction qui attend une ressource, crée une arête orientée : T_demandeur -> detenteurs[ressource].",
      "Applique un parcours en profondeur (DFS) pour détecter si un cycle existe."
    ],
    "examples": [
      {
        "stdin": "T1 DETIENT R1 ATTEND R2\nT2 DETIENT R2 ATTEND R1",
        "expected": "DEADLOCK DETECTE: cycle T1 -> T2 -> T1",
        "note": "T1 attend T2 qui attend T1 : cycle d'interblocage."
      }
    ],
    "tests": [
      {
        "label": "Exécution séquentielle sans cycle",
        "stdin": "cas:1",
        "expected": "AUCUN DEADLOCK: execution possible"
      },
      {
        "label": "Interblocage à 3 transactions (T1 -> T2 -> T3 -> T1)",
        "stdin": "cas:2",
        "expected": "DEADLOCK DETECTE: cycle T1 -> T2 -> T3 -> T1"
      },
      {
        "label": "Graphe sans attente mutuelle",
        "stdin": "cas:3",
        "expected": "AUCUN DEADLOCK: execution possible"
      }
    ],
    "solution": "[Exemple]\nDEADLOCK DETECTE: cycle T1 -> T2 -> T1\n\n[Cas 1 — Exécution séquentielle sans cycle]\nAUCUN DEADLOCK: execution possible\n\n[Cas 2 — Interblocage à 3 transactions (T1 -> T2 -> T3 -> T1)]\nDEADLOCK DETECTE: cycle T1 -> T2 -> T3 -> T1\n\n[Cas 3 — Graphe sans attente mutuelle]\nAUCUN DEADLOCK: execution possible"
  }
];
