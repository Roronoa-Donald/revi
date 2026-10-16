/**
 * chapitre2.js — Études de cas du cours « b3-document-technique ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dt3-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Validateur formel de cas d’utilisation (Use Case) en SFD",
    goal: "Vérifier la complétude et la rigueur structurelle d’une fiche de cas d’utilisation dans une spécification fonctionnelle détaillée.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>USE_CASE_AUDIT id=&lt;id&gt; acteur=&lt;v&gt; declencheur=&lt;v&gt; pre=&lt;v&gt; nominal=&lt;etapes&gt; post=&lt;v&gt;</code>.<br><br>\nCritères de conformité (5 critères évalués) :<br>\n1. <code>ACTEUR</code> : la valeur n'est ni vide ni <code>AUCUN</code> ni <code>NON_DEFINI</code>.<br>\n2. <code>DECLENCHEUR</code> : la valeur n'est ni vide ni <code>AUCUN</code>.<br>\n3. <code>PRECONDITIONS</code> : la valeur n'est ni vide ni <code>AUCUN</code>.<br>\n4. <code>SCENARIO_NOMINAL</code> : contient au moins 2 étapes séparées par <code>-&gt;</code>.<br>\n5. <code>POSTCONDITIONS</code> : la valeur n'est ni vide ni <code>AUCUN</code>.<br><br>\nStatut :<br>\n- Si 5/5 : <code>STATUT=CONFORME_SFD_VALIDEE</code><br>\n- Sinon : <code>STATUT=NON_CONFORME (ANOMALIES=[&lt;champs_en_erreur&gt;])</code><br>\n(L'ordre des anomalies : <code>ACTEUR</code>, <code>DECLENCHEUR</code>, <code>PRECONDITIONS</code>, <code>SCENARIO_NOMINAL</code>, <code>POSTCONDITIONS</code>).<br><br>\nAfficher :<br>\n<code>USE_CASE: &lt;id&gt; -&gt; SCORE=&lt;N&gt;/5 | STATUT=&lt;STATUT&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c2-e1) — Validateur formel de cas d’utilisation (Use Case) en SFD\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Cas d’utilisation avec scénario trop court et acteur manquant]\n# Données : USE_CASE_AUDIT id=UC-02 acteur=AUCUN declencheur=ClicPaiement pre=PanierValide nominal=PaiementDirect post=FactureGeneree\nA_COMPLETER\n\n[Cas 2 — Préconditions et postconditions absentes]\n# Données : USE_CASE_AUDIT id=UC-03 acteur=Admin declencheur=RequeteReset pre=AUCUN nominal=SelectionUtilisateur->ClicReset->EmailEnvoye post=AUCUN\nA_COMPLETER\n\n[Cas 3 — Tous critères validés avec étapes complexes]\n# Données : USE_CASE_AUDIT id=UC-04 acteur=Gestionnaire declencheur=UploadFichier pre=DroitEcriture nominal=ScanAntivirus->ExtractionDonnees->EnregistrementBDD post=FichierArchive\nA_COMPLETER\n",
    hints: [
          "Pour le scénario nominal, compter le nombre d’étapes via split(\"->\").",
          "Identifier les champs vides ou valant AUCUN / NON_DEFINI."
    ],
    examples: [
          {
                "stdin": "USE_CASE_AUDIT id=UC-01 acteur=Client declencheur=ClicConnexion pre=CompteActif nominal=SaisieIdentifiants->ValidationToken post=SessionOuverte",
                "expected": "USE_CASE: UC-01 -> SCORE=5/5 | STATUT=CONFORME_SFD_VALIDEE",
                "note": "Les 5 critères sont parfaitement remplis."
          }
    ],
    tests: [
          {
                "label": "Cas d’utilisation avec scénario trop court et acteur manquant",
                "stdin": "cas:1",
                "expected": "USE_CASE: UC-02 -> SCORE=3/5 | STATUT=NON_CONFORME (ANOMALIES=[ACTEUR, SCENARIO_NOMINAL])"
          },
          {
                "label": "Préconditions et postconditions absentes",
                "stdin": "cas:2",
                "expected": "USE_CASE: UC-03 -> SCORE=3/5 | STATUT=NON_CONFORME (ANOMALIES=[PRECONDITIONS, POSTCONDITIONS])"
          },
          {
                "label": "Tous critères validés avec étapes complexes",
                "stdin": "cas:3",
                "expected": "USE_CASE: UC-04 -> SCORE=5/5 | STATUT=CONFORME_SFD_VALIDEE"
          }
    ],
    solution: "[Exemple]\nUSE_CASE: UC-01 -> SCORE=5/5 | STATUT=CONFORME_SFD_VALIDEE\n\n[Cas 1 — Cas d’utilisation avec scénario trop court et acteur manquant]\nUSE_CASE: UC-02 -> SCORE=3/5 | STATUT=NON_CONFORME (ANOMALIES=[ACTEUR, SCENARIO_NOMINAL])\n\n[Cas 2 — Préconditions et postconditions absentes]\nUSE_CASE: UC-03 -> SCORE=3/5 | STATUT=NON_CONFORME (ANOMALIES=[PRECONDITIONS, POSTCONDITIONS])\n\n[Cas 3 — Tous critères validés avec étapes complexes]\nUSE_CASE: UC-04 -> SCORE=5/5 | STATUT=CONFORME_SFD_VALIDEE\n"
  },
  {
    id: "dt3-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Matrice de traçabilité des exigences (Requirements Traceability Matrix - RTM)",
    goal: "Auditer la couverture bidirectionnelle entre une exigence métier, sa spécification détaillée et son cas de test de recette.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>RTM_ENTRY req=&lt;REQ_ID&gt; sfd=&lt;SFD_ID&gt; test=&lt;TEST_ID&gt;</code>.<br><br>\nRègles d'évaluation de couverture :<br>\n- <code>sfd</code> est valide si différente de <code>AUCUN</code> et <code>NON_COUVERT</code>.<br>\n- <code>test</code> est valide si différent de <code>AUCUN</code> et <code>NON_COUVERT</code>.<br><br>\nStatut de couverture :<br>\n- Si les deux sont valides :<br>\n  <code>COUVERTURE=COMPLETE (SPEC_ET_TEST)</code><br>\n- Si <code>sfd</code> valide mais <code>test</code> invalide :<br>\n  <code>COUVERTURE=PARTIELLE (TEST_MANQUANT)</code><br>\n- Si <code>sfd</code> invalide mais <code>test</code> valide :<br>\n  <code>COUVERTURE=PARTIELLE (SFD_MANQUANTE)</code><br>\n- Si les deux sont invalides :<br>\n  <code>COUVERTURE=ORPHELINE_NON_COUVERTE (CRITIQUE)</code><br><br>\nAfficher :<br>\n<code>RTM_AUDIT: &lt;req&gt; -&gt; COUVERTURE=&lt;COUVERTURE&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c2-e2) — Matrice de traçabilité des exigences (Requirements Traceability Matrix - RTM)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Exigence spécifiée mais sans cas de test associé]\n# Données : RTM_ENTRY req=REQ-102 sfd=SFD-PAY-02 test=AUCUN\nA_COMPLETER\n\n[Cas 2 — Exigence testée sans spécification formelle]\n# Données : RTM_ENTRY req=REQ-103 sfd=NON_COUVERT test=TEST-EXPORT-01\nA_COMPLETER\n\n[Cas 3 — Exigence totalement orpheline critique]\n# Données : RTM_ENTRY req=REQ-104 sfd=AUCUN test=NON_COUVERT\nA_COMPLETER\n",
    hints: [
          "Tester la présence de valeurs invalides AUCUN ou NON_COUVERT.",
          "Distinguer les couvertures partielles selon la composante absente."
    ],
    examples: [
          {
                "stdin": "RTM_ENTRY req=REQ-101 sfd=SFD-AUTH-01 test=TEST-AUTH-E2E",
                "expected": "RTM_AUDIT: REQ-101 -> COUVERTURE=COMPLETE (SPEC_ET_TEST)",
                "note": "Exigence spécifiée et testée : couverture complète."
          }
    ],
    tests: [
          {
                "label": "Exigence spécifiée mais sans cas de test associé",
                "stdin": "cas:1",
                "expected": "RTM_AUDIT: REQ-102 -> COUVERTURE=PARTIELLE (TEST_MANQUANT)"
          },
          {
                "label": "Exigence testée sans spécification formelle",
                "stdin": "cas:2",
                "expected": "RTM_AUDIT: REQ-103 -> COUVERTURE=PARTIELLE (SFD_MANQUANTE)"
          },
          {
                "label": "Exigence totalement orpheline critique",
                "stdin": "cas:3",
                "expected": "RTM_AUDIT: REQ-104 -> COUVERTURE=ORPHELINE_NON_COUVERTE (CRITIQUE)"
          }
    ],
    solution: "[Exemple]\nRTM_AUDIT: REQ-101 -> COUVERTURE=COMPLETE (SPEC_ET_TEST)\n\n[Cas 1 — Exigence spécifiée mais sans cas de test associé]\nRTM_AUDIT: REQ-102 -> COUVERTURE=PARTIELLE (TEST_MANQUANT)\n\n[Cas 2 — Exigence testée sans spécification formelle]\nRTM_AUDIT: REQ-103 -> COUVERTURE=PARTIELLE (SFD_MANQUANTE)\n\n[Cas 3 — Exigence totalement orpheline critique]\nRTM_AUDIT: REQ-104 -> COUVERTURE=ORPHELINE_NON_COUVERTE (CRITIQUE)\n"
  },
  {
    id: "dt3-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Validateur de matrice de flux réseau pour Spécification Technique Détaillée (STD)",
    goal: "Analyser une matrice de flux d’ouverture de pare-feu et alerter sur les règles permissives dangereuses.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>FLUX_ENTRY src=&lt;src&gt; dst=&lt;dst&gt; proto=&lt;proto&gt; port=&lt;port&gt;</code>.<br><br>\nRègles de validation et de sécurité :<br>\n- Protocole : doit valoir soit <code>TCP</code> soit <code>UDP</code> (insensible à la casse). Si différent :<br>\n  <code>VERDICT=PROTOCOLE_INVALIDE</code><br>\n- Port tout ouvert : si <code>port == ALL</code> ou <code>port == *</code> ou <code>port == 0</code> :<br>\n  <code>VERDICT=ALERTE_SECURITE_PORT_TOUT_OUVERT (PORT_RESTREINT_REQUIS)</code><br>\n- Source ou destination universelle : si <code>src == ANY</code> ou <code>dst == ANY</code> ou <code>0.0.0.0/0</code> :<br>\n  <code>VERDICT=ALERTE_SECURITE_REGLE_TROP_PERMISSIVE (IP_EXPLICITE_REQUISE)</code><br>\n- Port standard valide : le port doit être un entier numérique valide compris entre 1 et 65535.<br>\n- Si tous les contrôles sont sains :<br>\n  <code>VERDICT=REGLE_STD_VALIDE</code><br><br>\nAfficher :<br>\n<code>FLUX_AUDIT: &lt;src&gt; -&gt; &lt;dst&gt; (&lt;PROTO&gt;/&lt;port&gt;) | VERDICT=&lt;VERDICT&gt;</code></p>",
    starter: "# Grille d'analyse (dt3-c2-e3) — Validateur de matrice de flux réseau pour Spécification Technique Détaillée (STD)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Ouverture de port universelle interdite]\n# Données : FLUX_ENTRY src=10.0.1.10 dst=10.0.2.20 proto=TCP port=ALL\nA_COMPLETER\n\n[Cas 2 — Source ou destination ANY interdite]\n# Données : FLUX_ENTRY src=ANY dst=10.0.2.20 proto=TCP port=22\nA_COMPLETER\n\n[Cas 3 — Protocole inconnu ou invalide]\n# Données : FLUX_ENTRY src=10.0.1.5 dst=10.0.2.5 proto=ICMP port=80\nA_COMPLETER\n",
    hints: [
          "Tester les alertes de sécurité dans l’ordre de priorité.",
          "Valider que le port est un entier compris entre 1 et 65535."
    ],
    examples: [
          {
                "stdin": "FLUX_ENTRY src=10.0.1.10 dst=10.0.2.20 proto=TCP port=443",
                "expected": "FLUX_AUDIT: 10.0.1.10 -> 10.0.2.20 (TCP/443) | VERDICT=REGLE_STD_VALIDE",
                "note": "Flux HTTPS restreint entre deux adresses internes : règle valide."
          }
    ],
    tests: [
          {
                "label": "Ouverture de port universelle interdite",
                "stdin": "cas:1",
                "expected": "FLUX_AUDIT: 10.0.1.10 -> 10.0.2.20 (TCP/ALL) | VERDICT=ALERTE_SECURITE_PORT_TOUT_OUVERT (PORT_RESTREINT_REQUIS)"
          },
          {
                "label": "Source ou destination ANY interdite",
                "stdin": "cas:2",
                "expected": "FLUX_AUDIT: ANY -> 10.0.2.20 (TCP/22) | VERDICT=ALERTE_SECURITE_REGLE_TROP_PERMISSIVE (IP_EXPLICITE_REQUISE)"
          },
          {
                "label": "Protocole inconnu ou invalide",
                "stdin": "cas:3",
                "expected": "FLUX_AUDIT: 10.0.1.5 -> 10.0.2.5 (ICMP/80) | VERDICT=PROTOCOLE_INVALIDE"
          }
    ],
    solution: "[Exemple]\nFLUX_AUDIT: 10.0.1.10 -> 10.0.2.20 (TCP/443) | VERDICT=REGLE_STD_VALIDE\n\n[Cas 1 — Ouverture de port universelle interdite]\nFLUX_AUDIT: 10.0.1.10 -> 10.0.2.20 (TCP/ALL) | VERDICT=ALERTE_SECURITE_PORT_TOUT_OUVERT (PORT_RESTREINT_REQUIS)\n\n[Cas 2 — Source ou destination ANY interdite]\nFLUX_AUDIT: ANY -> 10.0.2.20 (TCP/22) | VERDICT=ALERTE_SECURITE_REGLE_TROP_PERMISSIVE (IP_EXPLICITE_REQUISE)\n\n[Cas 3 — Protocole inconnu ou invalide]\nFLUX_AUDIT: 10.0.1.5 -> 10.0.2.5 (ICMP/80) | VERDICT=PROTOCOLE_INVALIDE\n"
  }
];
