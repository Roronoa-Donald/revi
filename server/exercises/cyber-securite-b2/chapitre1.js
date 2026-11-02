'use strict';

module.exports = [
  {
    "id": "cs2-c1-e1",
    "chapter": 1,
    "title": "Évaluation quantitative du niveau de risque informatique",
    "level": "n1",
    "language": "analyse",
    "goal": "Évaluation quantitative du niveau de risque informatique",
    "brief": "<p>Dans le modèle pédagogique choisi pour cet exercice, le score de risque brut est calculé par le produit de la Menace (M, de 1 à 5), de la Vulnérabilité (V, de 1 à 5) et de l’Impact financier/opérationnel (I, de 1 à 5) : <code>Score = M * V * I</code> (variant de 1 à 125).\n\nLes seuils propres à cet exercice sont définis ainsi :\n- Score &lt; 20 : <code>FAIBLE</code>\n- 20 &le; Score &lt; 50 : <code>MOYEN</code>\n- 50 &le; Score &lt; 80 : <code>ELEVE</code>\n- Score &ge; 80 : <code>CRITIQUE</code>\n\nEntrée : Trois entiers séparés par des virgules <code>M,V,I</code>.\nRésultat d’analyse attendu : <code>Score: &lt;Score&gt; | Niveau: &lt;Niveau&gt;</code>.</p>",
    "starter": "# Grille d'analyse (cs2-c1-e1) — Évaluation quantitative du niveau de risque informatique\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : 2,2,3\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : 3,3,3\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : 3,4,5\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : 5,4,4\nA_COMPLETER\n",
    "hints": [
      "Comment combiner les trois valeurs fournies avec la formule du modèle ?",
      "Dans quel intervalle du barème de l’exercice se trouve le score obtenu ?"
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
    "brief": "<p>La triade CIA comprend la <strong>Confidentialite</strong>, l’<strong>Integrite</strong> et la <strong>Disponibilite</strong>. Pour chaque code d’incident, identifiez le principe majeur compromis et sa conséquence.</p><p>Choisissez la conséquence parmi : <code>Fuite de donnees</code>, <code>Chiffrement malveillant des fichiers</code>, <code>Saturation de la bande passante</code>, <code>Modification frauduleuse d enregistrements</code>, <code>Usurpation de session utilisateur</code> <code>Remplacement non autorise du contenu</code> et <code>Indetermine</code>. Répondez <code>Principe: &lt;principe&gt; | Impact: &lt;conséquence&gt;</code>. Si les informations ne permettent pas de conclure, utilisez <code>Indetermine</code> pour chacun des deux champs.</p>",
    "starter": "# Grille d'analyse (cs2-c1-e2) — Classification d’incidents selon la triade CIA\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : RANSOMWARE — des fichiers chiffrés ne sont plus accessibles aux utilisateurs\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : DDOS — le trafic sature la bande passante\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : ALTERATION_BASE — des enregistrements sont modifiés sans autorisation\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : AUTRE_CHOSE — aucune information supplémentaire\nA_COMPLETER\n",
    "hints": [
      "Quelle propriété décrit le mieux la conséquence précisée dans chaque situation ?",
      "Distinguez une perte d’accès, une divulgation et une modification ; si les faits manquent, ne supposez pas l’impact."
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
        "expected": "Principe: Indetermine | Impact: Indetermine"
      }
    ],
    "solution": "[Exemple]\nPrincipe: Confidentialite | Impact: Fuite de donnees\n\n[Cas 1 — Test de validation 1]\nPrincipe: Disponibilite | Impact: Chiffrement malveillant des fichiers\n\n[Cas 2 — Test de validation 2]\nPrincipe: Disponibilite | Impact: Saturation de la bande passante\n\n[Cas 3 — Test de validation 3]\nPrincipe: Integrite | Impact: Modification frauduleuse d enregistrements\n\n[Cas 4 — Test de validation 4]\nPrincipe: Indetermine | Impact: Indetermine"
  },
  {
    "id": "cs2-c1-e3",
    "chapter": 1,
    "title": "Contrôles ciblés des mots de passe selon le NIST",
    "level": "n3",
    "language": "analyse",
    "goal": "Appliquer les seuils NIST et une liste de refus sans conclure à la robustesse",
    "brief": "<p>Cette grille applique seulement quelques contrôles de NIST SP 800-63B-4, pas une politique complète ni une preuve de robustesse. Chaque cas est au format <code>mode;mot_de_passe</code> : <code>seul</code> indique un facteur unique (15 caractères minimum), <code>mfa</code> un mot de passe utilisé exclusivement en MFA (8 caractères minimum dans cette grille ; le NIST permet aussi un seuil supérieur). Comptez les points de code Unicode, sans imposer de classes de caractères.</p><p>La liste de refus fictive contient exactement <code>123456789012345</code> et <code>motdepassecommun</code> ; comparez le mot de passe entier, pas ses sous-chaînes, en respectant la casse. En production, la liste doit notamment couvrir des valeurs communes ou compromises, et les tentatives doivent être limitées.</p><p>Répondez au format <code>DECISION: &lt;décision&gt; | MOTIF: &lt;motif&gt;</code>. Les décisions possibles sont <code>REFUSE</code> et <code>ADMISSIBLE</code> ; les motifs sont <code>longueur</code>, <code>liste_de_refus</code> ou <code>aucun</code>. Vérifiez d’abord la longueur, puis la liste entière : un résultat admissible sur ces seuls critères ne signifie pas que le mot de passe est robuste.</p>",
    "starter": "# Grille d'analyse (cs2-c1-e3) — Contrôles ciblés des mots de passe selon le NIST\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Test de validation 1]\n# Données : seul;abcdefghijklmn\nA_COMPLETER\n\n[Cas 2 — Test de validation 2]\n# Données : seul;moutonlunerosea\nA_COMPLETER\n\n[Cas 3 — Test de validation 3]\n# Données : mfa;abricot\nA_COMPLETER\n\n[Cas 4 — Test de validation 4]\n# Données : mfa;𐐷abricot\nA_COMPLETER\n\n[Cas 5 — Test de validation 5]\n# Données : seul;123456789012345\nA_COMPLETER\n\n[Cas 6 — Test de validation 6]\n# Données : seul;moutonlunerosea123456789012345\nA_COMPLETER\n\n[Cas 7 — Test de validation 7]\n# Données : seul;𐐷abcdefghijklm\nA_COMPLETER\n",
    "hints": [
      "Comptez les points de code et choisissez le seuil associé au mode indiqué ; ne cherchez pas de classes obligatoires.",
      "Comparez la valeur entière à la liste fictive après le contrôle de longueur ; une admissibilité partielle ne démontre pas la robustesse."
    ],
    "examples": [
      {
        "stdin": "seul;motdepassecommun",
        "expected": "DECISION: REFUSE | MOTIF: liste_de_refus",
        "note": "La liste de refus utilisée ici est fictive."
      }
    ],
    "tests": [
      {
        "label": "Test de validation 1",
        "stdin": "cas:1",
        "expected": "DECISION: REFUSE | MOTIF: longueur"
      },
      {
        "label": "Test de validation 2",
        "stdin": "cas:2",
        "expected": "DECISION: ADMISSIBLE | MOTIF: aucun"
      },
      {
        "label": "Test de validation 3",
        "stdin": "cas:3",
        "expected": "DECISION: REFUSE | MOTIF: longueur"
      },
      {
        "label": "Test de validation 4",
        "stdin": "cas:4",
        "expected": "DECISION: ADMISSIBLE | MOTIF: aucun"
      },
      {
        "label": "Test de validation 5",
        "stdin": "cas:5",
        "expected": "DECISION: REFUSE | MOTIF: liste_de_refus"
      },
      {
        "label": "Test de validation 6",
        "stdin": "cas:6",
        "expected": "DECISION: ADMISSIBLE | MOTIF: aucun"
      },
      {
        "label": "Test de validation 7",
        "stdin": "cas:7",
        "expected": "DECISION: REFUSE | MOTIF: longueur"
      }
    ],
    "solution": "[Exemple]\nDECISION: REFUSE | MOTIF: liste_de_refus\n\n[Cas 1 — Test de validation 1]\nDECISION: REFUSE | MOTIF: longueur\n\n[Cas 2 — Test de validation 2]\nDECISION: ADMISSIBLE | MOTIF: aucun\n\n[Cas 3 — Test de validation 3]\nDECISION: REFUSE | MOTIF: longueur\n\n[Cas 4 — Test de validation 4]\nDECISION: ADMISSIBLE | MOTIF: aucun\n\n[Cas 5 — Test de validation 5]\nDECISION: REFUSE | MOTIF: liste_de_refus\n\n[Cas 6 — Test de validation 6]\nDECISION: ADMISSIBLE | MOTIF: aucun\n\n[Cas 7 — Test de validation 7]\nDECISION: REFUSE | MOTIF: longueur"
  }
];
