'use strict';

module.exports = [
  {
    "id": "cs2-c1-e1",
    "chapter": 1,
    "title": "Évaluation quantitative du niveau de risque informatique",
    "level": "n1",
    "language": "analyse",
    "goal": "Évaluation quantitative du niveau de risque informatique",
    "brief": "<p>Dans la gestion des risques selon la norme ISO 27005, le niveau de risque brut est calculé par le produit de la Menace (M, de 1 à 5), de la Vulnérabilité (V, de 1 à 5) et de l’Impact financier/opérationnel (I, de 1 à 5) : <code>Score = M * V * I</code> (variant de 1 à 125).\n\nLes seuils de criticité sont définis ainsi :\n- Score &lt; 20 : <code>FAIBLE</code>\n- 20 &le; Score &lt; 50 : <code>MOYEN</code>\n- 50 &le; Score &lt; 80 : <code>ELEVE</code>\n- Score &ge; 80 : <code>CRITIQUE</code>\n\nEntrée : Trois entiers séparés par des virgules <code>M,V,I</code>.\nSortie : <code>Score: &lt;Score&gt; | Niveau: &lt;Niveau&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c1-e1) — Évaluation quantitative du niveau de risque informatique\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : 2,2,3\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : 3,3,3\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 3,4,5\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 5,4,4\nA_COMPLETER\n",
    "hints": [
      "Appliquez la formule de calcul de risque brut : Score = M × V × I (produit des trois facteurs de 1 à 5).",
      "Comparez le score aux seuils ISO 27005 : Faible (< 20), Moyen (20 à 49), Élevé (50 à 79) ou Critique (>= 80)."
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
        "stdin": "cas:1",
        "expected": "Score: 12 | Niveau: FAIBLE"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "Score: 27 | Niveau: MOYEN"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "Score: 60 | Niveau: ELEVE"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "Score: 80 | Niveau: CRITIQUE"
      }
    ],
    "solution": "[Exemple]\nScore: 100 | Niveau: CRITIQUE\n\n[Cas 1 — Test de validation 1]\nScore: 12 | Niveau: FAIBLE\n\n[Cas 2 — Test de validation 2]\nScore: 27 | Niveau: MOYEN\n\n[Cas 3 — Test de validation 3]\nScore: 60 | Niveau: ELEVE\n\n[Cas 4 — Test de validation 4]\nScore: 80 | Niveau: CRITIQUE"
  },
  {
    "id": "cs2-c1-e2",
    "chapter": 1,
    "title": "Classification d’incidents selon la triade CIA",
    "level": "n2",
    "language": "analyse",
    "goal": "Classification d’incidents selon la triade CIA",
    "brief": "<p>La sécurité de l’information repose sur la triade CIA : Confidentialité, Intégrité, Disponibilité. Votre programme reçoit un code d’incident et doit déterminer le principe majeur violé ainsi que l’impact :\n- <code>DIVULGATION</code> : <code>Principe: Confidentialite | Impact: Fuite de donnees</code>\n- <code>RANSOMWARE</code> : <code>Principe: Disponibilite | Impact: Chiffrement malveillant des fichiers</code>\n- <code>DDOS</code> : <code>Principe: Disponibilite | Impact: Saturation de la bande passante</code>\n- <code>ALTERATION_BASE</code> : <code>Principe: Integrite | Impact: Modification frauduleuse d enregistrements</code>\n- <code>VOL_SESSION</code> : <code>Principe: Confidentialite | Impact: Usurpation de session utilisateur</code>\n- <code>DEFIGURATION_WEB</code> : <code>Principe: Integrite | Impact: Remplacement non autorise du contenu</code>\n\nSi le code est inconnu, afficher : <code>INCIDENT INCONNU</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c1-e2) — Classification d’incidents selon la triade CIA\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : RANSOMWARE\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : DDOS\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : ALTERATION_BASE\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : AUTRE_CHOSE\nA_COMPLETER\n",
    "hints": [
      "Identifiez quel pilier (Confidentialité, Intégrité ou Disponibilité) est directement compromis par l’incident.",
      "Associez la conséquence opérationnelle exacte : fuite de données, chiffrement malveillant ou altération."
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
        "stdin": "cas:1",
        "expected": "Principe: Disponibilite | Impact: Chiffrement malveillant des fichiers"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "Principe: Disponibilite | Impact: Saturation de la bande passante"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "Principe: Integrite | Impact: Modification frauduleuse d enregistrements"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "INCIDENT INCONNU"
      }
    ],
    "solution": "[Exemple]\nPrincipe: Confidentialite | Impact: Fuite de donnees\n\n[Cas 1 — Test de validation 1]\nPrincipe: Disponibilite | Impact: Chiffrement malveillant des fichiers\n\n[Cas 2 — Test de validation 2]\nPrincipe: Disponibilite | Impact: Saturation de la bande passante\n\n[Cas 3 — Test de validation 3]\nPrincipe: Integrite | Impact: Modification frauduleuse d enregistrements\n\n[Cas 4 — Test de validation 4]\nINCIDENT INCONNU"
  },
  {
    "id": "cs2-c1-e3",
    "chapter": 1,
    "title": "Audit de robustesse de mot de passe (Politique ANSSI / NIST)",
    "level": "n3",
    "language": "analyse",
    "goal": "Audit de robustesse de mot de passe (Politique ANSSI / NIST)",
    "brief": "<p>Pour se prémunir des attaques par dictionnaire et force brute, vérifiez si un mot de passe respecte les 5 critères essentiels :\n1. <code>longueur</code> : au moins 12 caractères\n2. <code>majuscule</code> : au moins une lettre majuscule (A-Z)\n3. <code>minuscule</code> : au moins une lettre minuscule (a-z)\n4. <code>chiffre</code> : au moins un chiffre (0-9)\n5. <code>special</code> : au moins un caractère spécial parmi <code>!@#$%^&*()_+-=[]{}|;:,.<>?</code>\n\nSortie :\n- Si valide : <code>ROBUSTE</code>\n- Si invalide : <code>VULNERABLE (manque: crit1, crit2, ...)</code> dans l’ordre exact ci-dessus.</p>",
    "starter": "# Grille d'analyse (cs2-c1-e3) — Audit de robustesse de mot de passe (Politique ANSSI / NIST)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : admin123\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : MotDePasseTresLongMaisSansChiffreNiSymbole\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : Court1@\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : Cyber_Secu_B2#2026\nA_COMPLETER\n",
    "hints": [
      "Vérifiez les critères ANSSI/NIST : longueur minimale, diversité des classes de caractères et absence de motifs triviaux.",
      "Un mot de passe non conforme sur l’un des critères obligatoires doit être rejeté immédiatement."
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
        "stdin": "cas:1",
        "expected": "VULNERABLE (manque: longueur, majuscule, special)"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "VULNERABLE (manque: chiffre, special)"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "VULNERABLE (manque: longueur)"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "ROBUSTE"
      }
    ],
    "solution": "[Exemple]\nROBUSTE\n\n[Cas 1 — Test de validation 1]\nVULNERABLE (manque: longueur, majuscule, special)\n\n[Cas 2 — Test de validation 2]\nVULNERABLE (manque: chiffre, special)\n\n[Cas 3 — Test de validation 3]\nVULNERABLE (manque: longueur)\n\n[Cas 4 — Test de validation 4]\nROBUSTE"
  }
];
