/**
 * Exercices du chapitre 1 — Cybersécurité B2.
 */
'use strict';

module.exports = [
  {
    "id": "cs2-c1-e1",
    "chapter": 1,
    "title": "Évaluation quantitative du niveau de risque informatique",
    "level": "n1",
    "language": "python",
    "goal": "Évaluation quantitative du niveau de risque informatique",
    "brief": "<p>Dans la gestion des risques selon la norme ISO 27005, le niveau de risque brut est calculé par le produit de la Menace (M, de 1 à 5), de la Vulnérabilité (V, de 1 à 5) et de l’Impact financier/opérationnel (I, de 1 à 5) : <code>Score = M * V * I</code> (variant de 1 à 125).\n\nLes seuils de criticité sont définis ainsi :\n- Score &lt; 20 : <code>FAIBLE</code>\n- 20 &le; Score &lt; 50 : <code>MOYEN</code>\n- 50 &le; Score &lt; 80 : <code>ELEVE</code>\n- Score &ge; 80 : <code>CRITIQUE</code>\n\nEntrée : Trois entiers séparés par des virgules <code>M,V,I</code>.\nSortie : <code>Score: &lt;Score&gt; | Niveau: &lt;Niveau&gt;</code>.</p>",
    "starter": "import sys\n\nligne = sys.stdin.read().strip()\n\n# À compléter : calculer le score M * V * I et afficher le niveau de criticité\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "4,5,5",
        "expected": "Score: 100 | Niveau: CRITIQUE",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "2,2,3",
        "expected": "Score: 12 | Niveau: FAIBLE"
      },
      {
        "label": "Test de validation 2",
        "stdin": "3,3,3",
        "expected": "Score: 27 | Niveau: MOYEN"
      },
      {
        "label": "Test de validation 3",
        "stdin": "3,4,5",
        "expected": "Score: 60 | Niveau: ELEVE"
      },
      {
        "label": "Test de validation 4",
        "stdin": "5,4,4",
        "expected": "Score: 80 | Niveau: CRITIQUE"
      }
    ],
    "solution": "import sys\n\nligne = sys.stdin.read().strip()\nif ligne:\n    m_s, v_s, i_s = ligne.split(\",\")\n    m, v, i = int(m_s.strip()), int(v_s.strip()), int(i_s.strip())\n    score = m * v * i\n    if score < 20:\n        niveau = \"FAIBLE\"\n    elif score < 50:\n        niveau = \"MOYEN\"\n    elif score < 80:\n        niveau = \"ELEVE\"\n    else:\n        niveau = \"CRITIQUE\"\n    print(f\"Score: {score} | Niveau: {niveau}\")\n"
  },
  {
    "id": "cs2-c1-e2",
    "chapter": 1,
    "title": "Classification d’incidents selon la triade CIA",
    "level": "n2",
    "language": "python",
    "goal": "Classification d’incidents selon la triade CIA",
    "brief": "<p>La sécurité de l’information repose sur la triade CIA : Confidentialité, Intégrité, Disponibilité. Votre programme reçoit un code d’incident et doit déterminer le principe majeur violé ainsi que l’impact :\n- <code>DIVULGATION</code> : <code>Principe: Confidentialite | Impact: Fuite de donnees</code>\n- <code>RANSOMWARE</code> : <code>Principe: Disponibilite | Impact: Chiffrement malveillant des fichiers</code>\n- <code>DDOS</code> : <code>Principe: Disponibilite | Impact: Saturation de la bande passante</code>\n- <code>ALTERATION_BASE</code> : <code>Principe: Integrite | Impact: Modification frauduleuse d enregistrements</code>\n- <code>VOL_SESSION</code> : <code>Principe: Confidentialite | Impact: Usurpation de session utilisateur</code>\n- <code>DEFIGURATION_WEB</code> : <code>Principe: Integrite | Impact: Remplacement non autorise du contenu</code>\n\nSi le code est inconnu, afficher : <code>INCIDENT INCONNU</code>.</p>",
    "starter": "import sys\n\nincident = sys.stdin.read().strip()\n\n# À compléter : classifier selon la triade CIA\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "DIVULGATION",
        "expected": "Principe: Confidentialite | Impact: Fuite de donnees",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "RANSOMWARE",
        "expected": "Principe: Disponibilite | Impact: Chiffrement malveillant des fichiers"
      },
      {
        "label": "Test de validation 2",
        "stdin": "DDOS",
        "expected": "Principe: Disponibilite | Impact: Saturation de la bande passante"
      },
      {
        "label": "Test de validation 3",
        "stdin": "ALTERATION_BASE",
        "expected": "Principe: Integrite | Impact: Modification frauduleuse d enregistrements"
      },
      {
        "label": "Test de validation 4",
        "stdin": "AUTRE_CHOSE",
        "expected": "INCIDENT INCONNU"
      }
    ],
    "solution": "import sys\n\ncode = sys.stdin.read().strip()\ntable = {\n    \"DIVULGATION\": \"Principe: Confidentialite | Impact: Fuite de donnees\",\n    \"RANSOMWARE\": \"Principe: Disponibilite | Impact: Chiffrement malveillant des fichiers\",\n    \"DDOS\": \"Principe: Disponibilite | Impact: Saturation de la bande passante\",\n    \"ALTERATION_BASE\": \"Principe: Integrite | Impact: Modification frauduleuse d enregistrements\",\n    \"VOL_SESSION\": \"Principe: Confidentialite | Impact: Usurpation de session utilisateur\",\n    \"DEFIGURATION_WEB\": \"Principe: Integrite | Impact: Remplacement non autorise du contenu\"\n}\nif code in table:\n    print(table[code])\nelse:\n    print(\"INCIDENT INCONNU\")\n"
  },
  {
    "id": "cs2-c1-e3",
    "chapter": 1,
    "title": "Audit de robustesse de mot de passe (Politique ANSSI / NIST)",
    "level": "n3",
    "language": "python",
    "goal": "Audit de robustesse de mot de passe (Politique ANSSI / NIST)",
    "brief": "<p>Pour se prémunir des attaques par dictionnaire et force brute, vérifiez si un mot de passe respecte les 5 critères essentiels :\n1. <code>longueur</code> : au moins 12 caractères\n2. <code>majuscule</code> : au moins une lettre majuscule (A-Z)\n3. <code>minuscule</code> : au moins une lettre minuscule (a-z)\n4. <code>chiffre</code> : au moins un chiffre (0-9)\n5. <code>special</code> : au moins un caractère spécial parmi <code>!@#$%^&*()_+-=[]{}|;:,.<>?</code>\n\nSortie :\n- Si valide : <code>ROBUSTE</code>\n- Si invalide : <code>VULNERABLE (manque: crit1, crit2, ...)</code> dans l’ordre exact ci-dessus.</p>",
    "starter": "import sys\n\nmdp = sys.stdin.read().rstrip(\"\\r\\n\")\n\n# À compléter : auditer le mot de passe et lister les manques éventuels\n",
    "hints": [
      "Lis l entrée standard avec input().strip() ou sys.stdin.",
      "Traite les cas selon la spécification de l exercice.",
      "Affiche le résultat exactement sous la forme attendue."
    ],
    "examples": [
      {
        "stdin": "Secr3t_P@ssw0rd2026",
        "expected": "ROBUSTE",
        "note": "Exemple de référence."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "admin123",
        "expected": "VULNERABLE (manque: longueur, majuscule, special)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "MotDePasseTresLongMaisSansChiffreNiSymbole",
        "expected": "VULNERABLE (manque: chiffre, special)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "Court1@",
        "expected": "VULNERABLE (manque: longueur)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "Cyber_Secu_B2#2026",
        "expected": "ROBUSTE"
      }
    ],
    "solution": "import sys, re\n\nmdp = sys.stdin.read().rstrip(\"\\r\\n\")\nmanques = []\nif len(mdp) < 12:\n    manques.append(\"longueur\")\nif not re.search(r\"[A-Z]\", mdp):\n    manques.append(\"majuscule\")\nif not re.search(r\"[a-z]\", mdp):\n    manques.append(\"minuscule\")\nif not re.search(r\"[0-9]\", mdp):\n    manques.append(\"chiffre\")\nspeciaux = set(\"!@#$%^&*()_+-=[]{}|;:,.<>?\")\nif not any(c in speciaux for c in mdp):\n    manques.append(\"special\")\n\nif not manques:\n    print(\"ROBUSTE\")\nelse:\n    print(\"VULNERABLE (manque: \" + \", \".join(manques) + \")\")\n"
  }
];
