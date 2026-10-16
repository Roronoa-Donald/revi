/**
 * chapitre3.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ib2-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Choix de la technique d’élicitation",
    goal: "Identifier la méthode de recueil des exigences la plus adaptée selon le contexte organisationnel.",
    brief: "<p>Le choix de la technique d’élicitation dépend de la dispersion des acteurs, de la nature du savoir (explicite ou tacite) et du degré de consensus :</p><ul>  <li><code>utilisateurs_disperses_grand_nombre</code> &rarr; <code>Technique: Questionnaire en ligne</code></li>  <li><code>processus_tacite_metier_complexe</code> &rarr; <code>Technique: Observation terrain (Shadowing)</code></li>  <li><code>conflit_parties_prenantes_consensus</code> &rarr; <code>Technique: Atelier anime (Workshop JAD)</code></li>  <li><code>besoin_flou_feedback_rapide</code> &rarr; <code>Technique: Prototypage exploratoire</code></li>  <li><code>systeme_existant_sans_documentation</code> &rarr; <code>Technique: Analyse documentaire et code</code></li>  <li>Pour tout autre contexte &rarr; <code>Technique: Entretien individuel</code></li></ul><p>Lit un identifiant de contexte sur l’entrée standard et affiche la technique recommandée.</p>",
    starter: "# Grille d'analyse (ib2-c3-e1) — Choix de la technique d’élicitation\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : utilisateurs_disperses_grand_nombre\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : conflit_parties_prenantes_consensus\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : alignement_directeur_projet\nA_COMPLETER\n",
    hints: [
          "Utilise un la grille de critères associant chaque chaîne de contexte à son intitulé de technique.",
          "Utilise table.get(contexte, \"Entretien individuel\") comme repli."
    ],
    examples: [
          {
                "stdin": "processus_tacite_metier_complexe",
                "expected": "Technique: Observation terrain (Shadowing)",
                "note": "Lorsque les experts métier ont du mal à verbaliser leurs gestes quotidiens, l’observation directe est indispensable."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "Technique: Questionnaire en ligne"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "Technique: Atelier anime (Workshop JAD)"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "Technique: Entretien individuel"
          }
    ],
    solution: "[Exemple]\nTechnique: Observation terrain (Shadowing)\n\n[Cas 1 — Test 1]\nTechnique: Questionnaire en ligne\n\n[Cas 2 — Test 2]\nTechnique: Atelier anime (Workshop JAD)\n\n[Cas 3 — Test 3]\nTechnique: Entretien individuel\n"
  },
  {
    id: "ib2-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Agrégation de résultats d’enquête d’élicitation",
    goal: "Analyser les résultats d’un sondage d’utilisateurs pour classer les fonctionnalités selon leur appréciation.",
    brief: "<p>Lors d’une campagne d’élicitation par questionnaire, les utilisateurs évaluent l’intérêt de chaque fonctionnalité sur une échelle de 1 à 5.</p><p>Lit sur l’entrée standard :<br>- Première ligne : un entier <code>N</code> (nombre de réponses collectées).<br>- Les <code>N</code> lignes suivantes : <code>Fonctionnalite;Note</code> (la note est un entier de 1 à 5).<br>Affiche chaque fonctionnalité distincte avec sa moyenne (à 1 décimale) et le nombre de votes, triée par <strong>note moyenne décroissante</strong> (en cas d’égalité, par nom alphabétique) :<br><code>&lt;Fonctionnalite&gt;: &lt;Moyenne&gt;/5 (&lt;Votes&gt; avis)</code>.</p>",
    starter: "# Grille d'analyse (ib2-c3-e2) — Agrégation de résultats d’enquête d’élicitation\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : Authentification SSO;5\n# Données : Authentification SSO;5\n# Données : Authentification SSO;4\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : Recherche Floue;4\n# Données : Notification SMS;2\n# Données : Recherche Floue;4\n# Données : Export PDF;4\n# Données : Notification SMS;4\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : Paiement CB;5\n# Données : Paiement Paypal;5\nA_COMPLETER\n",
    hints: [
          "Stocke pour chaque fonctionnalité la liste de ses notes reçues.",
          "Calcule la moyenne avec round(sum(notes) / len(notes), 1).",
          "Trie avec la clé (-moyenne, nom)."
    ],
    examples: [
          {
                "stdin": "4\nMode Sombre;5\nExport Excel;3\nMode Sombre;4\nExport Excel;4",
                "expected": "Mode Sombre: 4.5/5 (2 avis)\nExport Excel: 3.5/5 (2 avis)",
                "note": "Le Mode Sombre obtient une moyenne de 4.5 contre 3.5 pour l’Export Excel."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "Authentification SSO: 4.7/5 (3 avis)"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "Export PDF: 4.0/5 (1 avis)\nRecherche Floue: 4.0/5 (2 avis)\nNotification SMS: 3.0/5 (2 avis)"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "Paiement CB: 5.0/5 (1 avis)\nPaiement Paypal: 5.0/5 (1 avis)"
          }
    ],
    solution: "[Exemple]\nMode Sombre: 4.5/5 (2 avis)\nExport Excel: 3.5/5 (2 avis)\n\n[Cas 1 — Test 1]\nAuthentification SSO: 4.7/5 (3 avis)\n\n[Cas 2 — Test 2]\nExport PDF: 4.0/5 (1 avis)\nRecherche Floue: 4.0/5 (2 avis)\nNotification SMS: 3.0/5 (2 avis)\n\n[Cas 3 — Test 3]\nPaiement CB: 5.0/5 (1 avis)\nPaiement Paypal: 5.0/5 (1 avis)\n"
  },
  {
    id: "ib2-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Modélisation et validation d’un Persona",
    goal: "Vérifier la complétude et formater la synthèse d’une fiche Persona pour l’équipe de développement.",
    brief: "<p>Un <strong>Persona</strong> est un archétype utilisateur fictif mais réaliste. Pour être exploitable par l’équipe, son objet JSON doit contenir :<br>- <code>nom</code> : chaîne non vide.<br>- <code>role</code> : chaîne non vide.<br>- <code>objectifs</code> : liste non vide de chaînes.<br>- <code>frustrations</code> : liste non vide de chaînes.</p><p>Lit un objet JSON sur l’entrée standard et affiche :<br>- Si valide : <code>PERSONA: &lt;nom&gt; (&lt;role&gt;) | Objectifs: &lt;N&gt; | Frustrations: &lt;M&gt; | STATUT: VALIDE</code><br>- Si une propriété obligatoire manque ou est vide : <code>REJET: Persona incomplet (&lt;propriete&gt;)</code> (tester dans l’ordre : nom, role, objectifs, frustrations).</p>",
    starter: "# Grille d'analyse (ib2-c3-e3) — Modélisation et validation d’un Persona\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Test 1]\n# Données : {\"nom\": \"\", \"role\": \"Comptable\", \"objectifs\": [\"Cloturer\"], \"frustrations\": [\"Bugs\"]}\nA_COMPLETER\n\n[Cas 2 — Test 2]\n# Données : {\"nom\": \"Marc\", \"role\": \"Commercial\", \"objectifs\": [], \"frustrations\": [\"Perte de temps\"]}\nA_COMPLETER\n\n[Cas 3 — Test 3]\n# Données : {\"nom\": \"Sophie\", \"role\": \"DRH\", \"objectifs\": [\"Suivre les talents\"], \"frustrations\": [\"Tableaux Excel eparpilles\", \"Manque de visibilite\"]}\nA_COMPLETER\n",
    hints: [
          "Parse le JSON avec json.loads().",
          "Vérifie que les chaînes nom et role ne sont pas vides, et que les listes objectifs et frustrations ont une longueur > 0."
    ],
    examples: [
          {
                "stdin": "{\"nom\": \"Claire\", \"role\": \"Gestionnaire de paie\", \"objectifs\": [\"Gagner du temps\", \"Eviter les erreurs\"], \"frustrations\": [\"Logiciel trop lent\"]}",
                "expected": "PERSONA: Claire (Gestionnaire de paie) | Objectifs: 2 | Frustrations: 1 | STATUT: VALIDE",
                "note": "Tous les champs requis sont présents, Claire est un persona valide et exploitable."
          }
    ],
    tests: [
          {
                "label": "Test 1",
                "stdin": "cas:1",
                "expected": "REJET: Persona incomplet (nom)"
          },
          {
                "label": "Test 2",
                "stdin": "cas:2",
                "expected": "REJET: Persona incomplet (objectifs)"
          },
          {
                "label": "Test 3",
                "stdin": "cas:3",
                "expected": "PERSONA: Sophie (DRH) | Objectifs: 1 | Frustrations: 2 | STATUT: VALIDE"
          }
    ],
    solution: "[Exemple]\nPERSONA: Claire (Gestionnaire de paie) | Objectifs: 2 | Frustrations: 1 | STATUT: VALIDE\n\n[Cas 1 — Test 1]\nREJET: Persona incomplet (nom)\n\n[Cas 2 — Test 2]\nREJET: Persona incomplet (objectifs)\n\n[Cas 3 — Test 3]\nPERSONA: Sophie (DRH) | Objectifs: 1 | Frustrations: 2 | STATUT: VALIDE\n"
  }
];
