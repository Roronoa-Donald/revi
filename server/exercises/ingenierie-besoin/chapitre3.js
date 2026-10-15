/**
 * Exercices du chapitre 3 — Ingénierie du besoin B2.
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "python",
    "title": "Choix de la technique d’élicitation",
    "goal": "Identifier la méthode de recueil des exigences la plus adaptée selon le contexte organisationnel.",
    "brief": "<p>Le choix de la technique d’élicitation dépend de la dispersion des acteurs, de la nature du savoir (explicite ou tacite) et du degré de consensus :</p><ul>  <li><code>utilisateurs_disperses_grand_nombre</code> &rarr; <code>Technique: Questionnaire en ligne</code></li>  <li><code>processus_tacite_metier_complexe</code> &rarr; <code>Technique: Observation terrain (Shadowing)</code></li>  <li><code>conflit_parties_prenantes_consensus</code> &rarr; <code>Technique: Atelier anime (Workshop JAD)</code></li>  <li><code>besoin_flou_feedback_rapide</code> &rarr; <code>Technique: Prototypage exploratoire</code></li>  <li><code>systeme_existant_sans_documentation</code> &rarr; <code>Technique: Analyse documentaire et code</code></li>  <li>Pour tout autre contexte &rarr; <code>Technique: Entretien individuel</code></li></ul><p>Lit un identifiant de contexte sur l’entrée standard et affiche la technique recommandée.</p>",
    "starter": "ligne = input().strip()\n\n# À compléter : calculer la taille d'échantillon selon la formule de Taro Yamane\n",
    "hints": [
      "Utilise un dictionnaire Python associant chaque chaîne de contexte à son intitulé de technique.",
      "Utilise table.get(contexte, \"Entretien individuel\") comme repli."
    ],
    "examples": [
      {
        "stdin": "processus_tacite_metier_complexe",
        "expected": "Technique: Observation terrain (Shadowing)",
        "note": "Lorsque les experts métier ont du mal à verbaliser leurs gestes quotidiens, l’observation directe est indispensable."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "utilisateurs_disperses_grand_nombre",
        "expected": "Technique: Questionnaire en ligne"
      },
      {
        "label": "Test 2",
        "stdin": "conflit_parties_prenantes_consensus",
        "expected": "Technique: Atelier anime (Workshop JAD)"
      },
      {
        "label": "Test 3",
        "stdin": "alignement_directeur_projet",
        "expected": "Technique: Entretien individuel"
      }
    ],
    "solution": "import sys\n\ncontexte = sys.stdin.readline().strip().lower()\n\ntable = {\n    \"utilisateurs_disperses_grand_nombre\": \"Questionnaire en ligne\",\n    \"processus_tacite_metier_complexe\": \"Observation terrain (Shadowing)\",\n    \"conflit_parties_prenantes_consensus\": \"Atelier anime (Workshop JAD)\",\n    \"besoin_flou_feedback_rapide\": \"Prototypage exploratoire\",\n    \"systeme_existant_sans_documentation\": \"Analyse documentaire et code\"\n}\n\nres = table.get(contexte, \"Entretien individuel\")\nprint(f\"Technique: {res}\")"
  },
  {
    "id": "ib2-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "python",
    "title": "Agrégation de résultats d’enquête d’élicitation",
    "goal": "Analyser les résultats d’un sondage d’utilisateurs pour classer les fonctionnalités selon leur appréciation.",
    "brief": "<p>Lors d’une campagne d’élicitation par questionnaire, les utilisateurs évaluent l’intérêt de chaque fonctionnalité sur une échelle de 1 à 5.</p><p>Lit sur l’entrée standard :<br>- Première ligne : un entier <code>N</code> (nombre de réponses collectées).<br>- Les <code>N</code> lignes suivantes : <code>Fonctionnalite;Note</code> (la note est un entier de 1 à 5).<br>Affiche chaque fonctionnalité distincte avec sa moyenne (à 1 décimale) et le nombre de votes, triée par <strong>note moyenne décroissante</strong> (en cas d’égalité, par nom alphabétique) :<br><code>&lt;Fonctionnalite&gt;: &lt;Moyenne&gt;/5 (&lt;Votes&gt; avis)</code>.</p>",
    "starter": "ligne = input().strip()\n\n# À compléter : générer la fiche Persona formatée\n",
    "hints": [
      "Stocke pour chaque fonctionnalité la liste de ses notes reçues.",
      "Calcule la moyenne avec round(sum(notes) / len(notes), 1).",
      "Trie avec la clé (-moyenne, nom)."
    ],
    "examples": [
      {
        "stdin": "4\nMode Sombre;5\nExport Excel;3\nMode Sombre;4\nExport Excel;4",
        "expected": "Mode Sombre: 4.5/5 (2 avis)\nExport Excel: 3.5/5 (2 avis)",
        "note": "Le Mode Sombre obtient une moyenne de 4.5 contre 3.5 pour l’Export Excel."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "3\nAuthentification SSO;5\nAuthentification SSO;5\nAuthentification SSO;4",
        "expected": "Authentification SSO: 4.7/5 (3 avis)"
      },
      {
        "label": "Test 2",
        "stdin": "5\nRecherche Floue;4\nNotification SMS;2\nRecherche Floue;4\nExport PDF;4\nNotification SMS;4",
        "expected": "Export PDF: 4.0/5 (1 avis)\nRecherche Floue: 4.0/5 (2 avis)\nNotification SMS: 3.0/5 (2 avis)"
      },
      {
        "label": "Test 3",
        "stdin": "2\nPaiement CB;5\nPaiement Paypal;5",
        "expected": "Paiement CB: 5.0/5 (1 avis)\nPaiement Paypal: 5.0/5 (1 avis)"
      }
    ],
    "solution": "import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\nif not lignes:\n    sys.exit(0)\n\nn = int(lignes[0])\ndonnees = {}\n\nfor l in lignes[1:n+1]:\n    if \";\" in l:\n        f, note_str = l.split(\";\")\n        donnees.setdefault(f, []).append(int(note_str))\n\nresultats = []\nfor f, notes in donnees.items():\n    moy = round(sum(notes) / len(notes), 1)\n    count = len(notes)\n    resultats.append((f, moy, count))\n\nresultats.sort(key=lambda x: (-x[1], x[0]))\n\nfor f, moy, count in resultats:\n    print(f\"{f}: {moy:.1f}/5 ({count} avis)\")"
  },
  {
    "id": "ib2-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "python",
    "title": "Modélisation et validation d’un Persona",
    "goal": "Vérifier la complétude et formater la synthèse d’une fiche Persona pour l’équipe de développement.",
    "brief": "<p>Un <strong>Persona</strong> est un archétype utilisateur fictif mais réaliste. Pour être exploitable par l’équipe, son objet JSON doit contenir :<br>- <code>nom</code> : chaîne non vide.<br>- <code>role</code> : chaîne non vide.<br>- <code>objectifs</code> : liste non vide de chaînes.<br>- <code>frustrations</code> : liste non vide de chaînes.</p><p>Lit un objet JSON sur l’entrée standard et affiche :<br>- Si valide : <code>PERSONA: &lt;nom&gt; (&lt;role&gt;) | Objectifs: &lt;N&gt; | Frustrations: &lt;M&gt; | STATUT: VALIDE</code><br>- Si une propriété obligatoire manque ou est vide : <code>REJET: Persona incomplet (&lt;propriete&gt;)</code> (tester dans l’ordre : nom, role, objectifs, frustrations).</p>",
    "starter": "ligne = input().strip()\n\n# À compléter : sélectionner la technique d'élicitation optimale\n",
    "hints": [
      "Parse le JSON avec json.loads().",
      "Vérifie que les chaînes nom et role ne sont pas vides, et que les listes objectifs et frustrations ont une longueur > 0."
    ],
    "examples": [
      {
        "stdin": "{\"nom\": \"Claire\", \"role\": \"Gestionnaire de paie\", \"objectifs\": [\"Gagner du temps\", \"Eviter les erreurs\"], \"frustrations\": [\"Logiciel trop lent\"]}",
        "expected": "PERSONA: Claire (Gestionnaire de paie) | Objectifs: 2 | Frustrations: 1 | STATUT: VALIDE",
        "note": "Tous les champs requis sont présents, Claire est un persona valide et exploitable."
      }
    ],
    "tests": [
      {
        "label": "Test 1",
        "stdin": "{\"nom\": \"\", \"role\": \"Comptable\", \"objectifs\": [\"Cloturer\"], \"frustrations\": [\"Bugs\"]}",
        "expected": "REJET: Persona incomplet (nom)"
      },
      {
        "label": "Test 2",
        "stdin": "{\"nom\": \"Marc\", \"role\": \"Commercial\", \"objectifs\": [], \"frustrations\": [\"Perte de temps\"]}",
        "expected": "REJET: Persona incomplet (objectifs)"
      },
      {
        "label": "Test 3",
        "stdin": "{\"nom\": \"Sophie\", \"role\": \"DRH\", \"objectifs\": [\"Suivre les talents\"], \"frustrations\": [\"Tableaux Excel eparpilles\", \"Manque de visibilite\"]}",
        "expected": "PERSONA: Sophie (DRH) | Objectifs: 1 | Frustrations: 2 | STATUT: VALIDE"
      }
    ],
    "solution": "import json, sys\n\nraw = sys.stdin.readline().strip()\ndata = json.loads(raw)\n\nprops = [\"nom\", \"role\", \"objectifs\", \"frustrations\"]\nerreur = None\n\nfor p in props:\n    val = data.get(p)\n    if val is None:\n        erreur = f\"REJET: Persona incomplet ({p})\"\n        break\n    if isinstance(val, str) and val.strip() == \"\":\n        erreur = f\"REJET: Persona incomplet ({p})\"\n        break\n    if isinstance(val, list) and len(val) == 0:\n        erreur = f\"REJET: Persona incomplet ({p})\"\n        break\n\nif erreur:\n    print(erreur)\nelse:\n    nb_obj = len(data[\"objectifs\"])\n    nb_frust = len(data[\"frustrations\"])\n    print(f\"PERSONA: {data['nom']} ({data['role']}) | Objectifs: {nb_obj} | Frustrations: {nb_frust} | STATUT: VALIDE\")"
  }
];
