'use strict';

module.exports = [
  {
    "id": "um2-c5-e1",
    "chapter": 5,
    "title": "Simulateur de chemin d'activité (décisions et gardes)",
    "level": "n1",
    "language": "analyse",
    "goal": "Suivre le chemin d'exécution d'un diagramme d'activités depuis le nœud initial jusqu'au nœud final en évaluant les gardes de décision.",
    "brief": "<p>Analysez les données fournies pour chaque cas...</code> (ex: <code>VAR stock=5 solde=100</code>).<br>\n- Lignes suivantes : Description du graphe d'activités :<br>\n  * <code>ACTION &lt;Nom&gt; -&gt; &lt;Cible&gt;</code> (Transition inconditionnelle)<br>\n  * <code>DECISION &lt;Nom&gt; [&lt;garde1&gt;] -&gt; &lt;Cible1&gt; | [else] -&gt; &lt;Cible2&gt;</code><br>\n  * <code>FINAL &lt;Nom&gt;</code><br>\nLe parcours débute au nœud <code>INITIAL</code>.<br>\nLe script Indiquez chronologiquement chaque étape franchie :<br>\n<code>[ETAPE] &lt;NomNoeud&gt;</code><br>\nLorsqu'un nœud final est atteint, afficher :<br>\n<code>PROCESSUS TERMINE au noeud &lt;NomFinal&gt; (Total etapes: &lt;N&gt;)</code>.</p>",
    "starter": "# Grille d'analyse (um2-c5-e1) — Simulateur de chemin d'activité (décisions et gardes)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Chemin alternatif empruntant la branche else]\n# Données : VAR stock=0\n# Données : ACTION INITIAL -> VerifierStock\n# Données : DECISION VerifierStock [stock > 0] -> PreparerColis | [else] -> RuptureStock\n# Données : ACTION RuptureStock -> FIN\n# Données : FINAL FIN\nA_COMPLETER\n\n[Cas 2 — Chemin direct sans décision]\n# Données : ACTION INITIAL -> Etape1\n# Données : ACTION Etape1 -> Etape2\n# Données : ACTION Etape2 -> FIN\n# Données : FINAL FIN\nA_COMPLETER\n\n[Cas 3 — Deux décisions successives]\n# Données : VAR solde=50 vip=1\n# Données : ACTION INITIAL -> D1\n# Données : DECISION D1 [solde >= 100] -> Valider | [else] -> D2\n# Données : DECISION D2 [vip == 1] -> AutoriserDecouvert | [else] -> Rejeter\n# Données : ACTION AutoriserDecouvert -> FIN\n# Données : FINAL FIN\nA_COMPLETER\n",
    "hints": [
      "Stocker les transitions dans un graphe et évaluer les expressions entre crochets pour choisir la branche de décision.",
      "Le mot-clé \"else\" est sélectionné si la garde principale est fausse."
    ],
    "examples": [
      {
        "stdin": "VAR stock=10\nACTION INITIAL -> VerifierStock\nDECISION VerifierStock [stock > 0] -> PreparerColis | [else] -> Reapprovisionner\nACTION PreparerColis -> Expédier\nACTION Expédier -> FIN\nFINAL FIN",
        "expected": "[ETAPE] INITIAL\n[ETAPE] VerifierStock\n[ETAPE] PreparerColis\n[ETAPE] Expédier\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 5)",
        "note": "Parcours avec garde stock > 0 vérifiée (10 > 0)."
      }
    ],
    "tests": [
      {
        "label": "Chemin alternatif empruntant la branche else",
        "stdin": "cas:1",
        "expected": "[ETAPE] INITIAL\n[ETAPE] VerifierStock\n[ETAPE] RuptureStock\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 4)"
      },
      {
        "label": "Chemin direct sans décision",
        "stdin": "cas:2",
        "expected": "[ETAPE] INITIAL\n[ETAPE] Etape1\n[ETAPE] Etape2\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 4)"
      },
      {
        "label": "Deux décisions successives",
        "stdin": "cas:3",
        "expected": "[ETAPE] INITIAL\n[ETAPE] D1\n[ETAPE] D2\n[ETAPE] AutoriserDecouvert\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 5)"
      }
    ],
    "solution": "[Exemple]\n[ETAPE] INITIAL\n[ETAPE] VerifierStock\n[ETAPE] PreparerColis\n[ETAPE] Expédier\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 5)\n\n[Cas 1 — Chemin alternatif empruntant la branche else]\n[ETAPE] INITIAL\n[ETAPE] VerifierStock\n[ETAPE] RuptureStock\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 4)\n\n[Cas 2 — Chemin direct sans décision]\n[ETAPE] INITIAL\n[ETAPE] Etape1\n[ETAPE] Etape2\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 4)\n\n[Cas 3 — Deux décisions successives]\n[ETAPE] INITIAL\n[ETAPE] D1\n[ETAPE] D2\n[ETAPE] AutoriserDecouvert\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 5)"
  },
  {
    "id": "um2-c5-e2",
    "chapter": 5,
    "title": "Vérificateur de synchronisation Fork / Join",
    "level": "n2",
    "language": "analyse",
    "goal": "Modéliser le parallélisme dans un diagramme d'activités avec barre de divergence (Fork) et barre de synchronisation (Join).",
    "brief": "<p>Dans un diagramme d'activités UML :<br>\n- Une barre <strong>FORK</strong> scinde un flux unique en plusieurs branches exécutées en parallèle.<br>\n- Une barre <strong>JOIN</strong> attend impérativement la complétion de <strong>TOUTES</strong> les branches entrantes avant d'autoriser la poursuite du flux.<br>\nAnalysez les données fournies pour chaque cas...</code> (déclenche N branches)<br>\n- <code>JOIN &lt;NomJoin&gt; &lt;- &lt;B1&gt;,&lt;B2&gt;...</code> (attend toutes les branches)<br>\n- Les notifications d'achèvement de branches au format :<br>\n  <code>COMPLETE &lt;Branche&gt;</code>.<br>\nPour chaque complétion, afficher :<br>\n<code>[RECU] Branche &lt;B&gt; terminee (En attente join &lt;Join&gt;: &lt;Restantes&gt;)</code>.<br>\nLorsque la dernière branche requise par le Join est complétée :<br>\n<code>[SYNCHRONISE] Barre Join &lt;NomJoin&gt; franchie ! Poursuite du flux vers l'etape suivante.</code></p>",
    "starter": "# Grille d'analyse (um2-c5-e2) — Vérificateur de synchronisation Fork / Join\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois branches avec exécution désordonnée]\n# Données : FORK F1 -> B1,B2,B3\n# Données : JOIN J1 <- B1,B2,B3\n# Données : COMPLETE B2\n# Données : COMPLETE B3\n# Données : COMPLETE B1\nA_COMPLETER\n\n[Cas 2 — Join bloqué avec branche manquante]\n# Données : FORK F1 -> A,B\n# Données : JOIN J1 <- A,B\n# Données : COMPLETE A\nA_COMPLETER\n\n[Cas 3 — Deux barres Join séquentielles]\n# Données : JOIN J1 <- A,B\n# Données : COMPLETE A\n# Données : COMPLETE B\n# Données : JOIN J2 <- C,D\n# Données : COMPLETE C\n# Données : COMPLETE D\nA_COMPLETER\n",
    "hints": [
      "Maintenir un ensemble des branches attendues par chaque barre de jointure (Join).",
      "Le Join ne se débloque que lorsque son ensemble de branches manquantes devient vide."
    ],
    "examples": [
      {
        "stdin": "FORK F1 -> B_Facturation,B_Livraison\nJOIN J1 <- B_Facturation,B_Livraison\nCOMPLETE B_Facturation\nCOMPLETE B_Livraison",
        "expected": "[RECU] Branche B_Facturation terminee (En attente join J1: 1 restante)\n[RECU] Branche B_Livraison terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante.",
        "note": "Synchronisation de 2 flux parallèles."
      }
    ],
    "tests": [
      {
        "label": "Trois branches avec exécution désordonnée",
        "stdin": "cas:1",
        "expected": "[RECU] Branche B2 terminee (En attente join J1: 2 restantes)\n[RECU] Branche B3 terminee (En attente join J1: 1 restante)\n[RECU] Branche B1 terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante."
      },
      {
        "label": "Join bloqué avec branche manquante",
        "stdin": "cas:2",
        "expected": "[RECU] Branche A terminee (En attente join J1: 1 restante)"
      },
      {
        "label": "Deux barres Join séquentielles",
        "stdin": "cas:3",
        "expected": "[RECU] Branche A terminee (En attente join J1: 1 restante)\n[RECU] Branche B terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante.\n[RECU] Branche C terminee (En attente join J2: 1 restante)\n[RECU] Branche D terminee (En attente join J2: 0 restante)\n[SYNCHRONISE] Barre Join J2 franchie ! Poursuite du flux vers l'etape suivante."
      }
    ],
    "solution": "[Exemple]\n[RECU] Branche B_Facturation terminee (En attente join J1: 1 restante)\n[RECU] Branche B_Livraison terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante.\n\n[Cas 1 — Trois branches avec exécution désordonnée]\n[RECU] Branche B2 terminee (En attente join J1: 2 restantes)\n[RECU] Branche B3 terminee (En attente join J1: 1 restante)\n[RECU] Branche B1 terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante.\n\n[Cas 2 — Join bloqué avec branche manquante]\n[RECU] Branche A terminee (En attente join J1: 1 restante)\n\n[Cas 3 — Deux barres Join séquentielles]\n[RECU] Branche A terminee (En attente join J1: 1 restante)\n[RECU] Branche B terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante.\n[RECU] Branche C terminee (En attente join J2: 1 restante)\n[RECU] Branche D terminee (En attente join J2: 0 restante)\n[SYNCHRONISE] Barre Join J2 franchie ! Poursuite du flux vers l'etape suivante."
  },
  {
    "id": "um2-c5-e3",
    "chapter": 5,
    "title": "Partitionneur de responsabilités (Couloirs Swimlanes)",
    "level": "n3",
    "language": "analyse",
    "goal": "Organiser les actions d'un processus métier dans leurs couloirs de responsabilité (swimlanes) et tracer les transferts inter-organisationnels.",
    "brief": "<p>Analysez les données fournies pour chaque cas...</code><br>\n- La séquence ordonnée d'exécution : <code>SEQUENCE &lt;A1&gt; -&gt; &lt;A2&gt; -&gt; &lt;A3&gt;...</code><br>\nLe script doit afficher :<br>\n1. La chronologie des actions avec leur responsable :<br>\n   <code>1. &lt;Action&gt; [Assigne a : &lt;Couloir&gt;]</code><br>\n2. Le journal des transferts de responsabilité (chaque fois que deux actions consécutives changent de couloir) :<br>\n   <code>[TRANSFERT] &lt;CouloirSource&gt; -&gt; &lt;CouloirCible&gt; (Transition : &lt;ActionPrec&gt; vers &lt;ActionSuiv&gt;)</code><br>\n3. Le bilan : <code>TOTAL TRANSFERTS: &lt;N&gt;</code>.</p>",
    "starter": "# Grille d'analyse (um2-c5-e3) — Partitionneur de responsabilités (Couloirs Swimlanes)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Allers-retours multiples entre trois couloirs]\n# Données : SWIMLANE Client : DemanderDevis,Accepter\n# Données : SWIMLANE Commercial : EtablirDevis\n# Données : SWIMLANE Comptabilite : EmettreFacture\n# Données : SEQUENCE DemanderDevis -> EtablirDevis -> Accepter -> EmettreFacture\nA_COMPLETER\n\n[Cas 2 — Aucun transfert (processus mono-acteur)]\n# Données : SWIMLANE Dev : Coder,Tester,Deposer\n# Données : SEQUENCE Coder -> Tester -> Deposer\nA_COMPLETER\n\n[Cas 3 — Action exécutée par rôle unique]\n# Données : SWIMLANE A : Act1\n# Données : SWIMLANE B : Act2\n# Données : SEQUENCE Act1 -> Act2\nA_COMPLETER\n",
    "hints": [
      "Associer chaque action à son couloir de nage unique dans un dictionnaire.",
      "Comparer le couloir de l'action i avec le couloir de l'action i-1 pour détecter un changement d'intervenant."
    ],
    "examples": [
      {
        "stdin": "SWIMLANE Client : SaisirCommande,Payer\nSWIMLANE Logistique : PreparerColis,Expedier\nSEQUENCE SaisirCommande -> Payer -> PreparerColis -> Expedier",
        "expected": "1. SaisirCommande [Assigne a : Client]\n2. Payer [Assigne a : Client]\n3. PreparerColis [Assigne a : Logistique]\n4. Expedier [Assigne a : Logistique]\n[TRANSFERT] Client -> Logistique (Transition : Payer vers PreparerColis)\nTOTAL TRANSFERTS: 1",
        "note": "Un seul transfert de responsabilité entre le Client et la Logistique."
      }
    ],
    "tests": [
      {
        "label": "Allers-retours multiples entre trois couloirs",
        "stdin": "cas:1",
        "expected": "1. DemanderDevis [Assigne a : Client]\n2. EtablirDevis [Assigne a : Commercial]\n3. Accepter [Assigne a : Client]\n4. EmettreFacture [Assigne a : Comptabilite]\n[TRANSFERT] Client -> Commercial (Transition : DemanderDevis vers EtablirDevis)\n[TRANSFERT] Commercial -> Client (Transition : EtablirDevis vers Accepter)\n[TRANSFERT] Client -> Comptabilite (Transition : Accepter vers EmettreFacture)\nTOTAL TRANSFERTS: 3"
      },
      {
        "label": "Aucun transfert (processus mono-acteur)",
        "stdin": "cas:2",
        "expected": "1. Coder [Assigne a : Dev]\n2. Tester [Assigne a : Dev]\n3. Deposer [Assigne a : Dev]\nTOTAL TRANSFERTS: 0"
      },
      {
        "label": "Action exécutée par rôle unique",
        "stdin": "cas:3",
        "expected": "1. Act1 [Assigne a : A]\n2. Act2 [Assigne a : B]\n[TRANSFERT] A -> B (Transition : Act1 vers Act2)\nTOTAL TRANSFERTS: 1"
      }
    ],
    "solution": "[Exemple]\n1. SaisirCommande [Assigne a : Client]\n2. Payer [Assigne a : Client]\n3. PreparerColis [Assigne a : Logistique]\n4. Expedier [Assigne a : Logistique]\n[TRANSFERT] Client -> Logistique (Transition : Payer vers PreparerColis)\nTOTAL TRANSFERTS: 1\n\n[Cas 1 — Allers-retours multiples entre trois couloirs]\n1. DemanderDevis [Assigne a : Client]\n2. EtablirDevis [Assigne a : Commercial]\n3. Accepter [Assigne a : Client]\n4. EmettreFacture [Assigne a : Comptabilite]\n[TRANSFERT] Client -> Commercial (Transition : DemanderDevis vers EtablirDevis)\n[TRANSFERT] Commercial -> Client (Transition : EtablirDevis vers Accepter)\n[TRANSFERT] Client -> Comptabilite (Transition : Accepter vers EmettreFacture)\nTOTAL TRANSFERTS: 3\n\n[Cas 2 — Aucun transfert (processus mono-acteur)]\n1. Coder [Assigne a : Dev]\n2. Tester [Assigne a : Dev]\n3. Deposer [Assigne a : Dev]\nTOTAL TRANSFERTS: 0\n\n[Cas 3 — Action exécutée par rôle unique]\n1. Act1 [Assigne a : A]\n2. Act2 [Assigne a : B]\n[TRANSFERT] A -> B (Transition : Act1 vers Act2)\nTOTAL TRANSFERTS: 1"
  }
];
