'use strict';

module.exports = [
  {
    "id": "ws3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le partage Projets du cabinet Alpha Conseil",
    "exampleTitle": "Exemple résolu — le partage Ventes du même cabinet",
    "goal": "Déterminer le droit d'accès réseau effectif entre permissions de partage et permissions NTFS.",
    "brief": "<p><strong>Énoncé.</strong> Le cabinet d'architecture Alpha Conseil partage le dossier D:\\Projets depuis le serveur SRV-FICHIER (partage SMB « Projets »). Les quatre profils d'accès sont les suivants :</p><table><tr><th>Utilisateur</th><th>Permission de partage</th><th>Permission NTFS</th></tr><tr><th>Amélie (cheffe de projet)</th><td>Modification</td><td>Écriture</td></tr><tr><th>Bruno (dessinateur)</th><td>Lecture</td><td>Modification</td></tr><tr><th>Chloé (stagiaire)</th><td>Lecture</td><td>Lecture</td></tr><tr><th>David (administrateur)</th><td>Contrôle total</td><td>Contrôle total</td></tr></table><p>Rappel du cours : pour un accès réseau, le droit effectif est le plus restrictif des deux barrières. Les questions 2 à 5 appellent le niveau de droit exact ; la question 6 appelle des prénoms.</p><ol><li>Quelle règle détermine le droit d'accès réseau effectif ?</li><li>Quel est le droit effectif d'Amélie ?</li><li>Quel est le droit effectif de Bruno ?</li><li>Quel est le droit effectif de Chloé ?</li><li>Quel est le droit effectif de David ?</li><li>Qui ne peut pas modifier les fichiers du partage ?</li></ol>",
    "starter": "# Exercice — Le partage Projets du cabinet Alpha Conseil\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 à 5 : le niveau de droit exact. Question 6 : les prénoms.\n\n[Question 1 — Règle du droit effectif]\nA_COMPLETER\n\n[Question 2 — Droit effectif d'Amélie]\nA_COMPLETER\n\n[Question 3 — Droit effectif de Bruno]\nA_COMPLETER\n\n[Question 4 — Droit effectif de Chloé]\nA_COMPLETER\n\n[Question 5 — Droit effectif de David]\nA_COMPLETER\n\n[Question 6 — Utilisateurs sans modification possible]\nA_COMPLETER\n",
    "hints": [
      "Le partage et NTFS sont deux barrières successives : le droit réseau ne peut excéder aucune des deux.",
      "Classez chaque niveau sur une échelle unique, puis prenez le plus faible des deux côtés, utilisateur par utilisateur.",
      "Pour la question 6, ne peuvent modifier que ceux dont le droit effectif atteint au moins Écriture."
    ],
    "examples": [
      {
        "stdin": "Le partage Ventes (D:\\Ventes) du même cabinet :\nÉmilie : partage Contrôle total, NTFS Lecture ; Farid : partage Lecture, NTFS Écriture ;\nGaby : partage Modification, NTFS Contrôle total ; Hanna : partage Contrôle total, NTFS Contrôle total.\n\n1) Règle : la plus restrictive des deux barrières.\n2) Émilie : Lecture (bridée par le NTFS).\n3) Farid : Lecture (bridé par le partage).\n4) Gaby : Modification (bridée par le partage).\n5) Hanna : Contrôle total.\n6) Ne peuvent pas modifier : Émilie et Farid.",
        "expected": "la plus restrictive — Émilie : Lecture — Farid : Lecture — Gaby : Modification — Hanna : Contrôle total — Émilie et Farid",
        "note": "Une permission généreuse d'un côté ne relève jamais un bridage de l'autre : chaque utilisateur est limité par sa barrière la plus basse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Règle du droit effectif",
        "stdin": "q:1",
        "expected": "la plus restrictive||le plus restrictif||la plus restrictive des deux||la plus restrictive des deux barrières"
      },
      {
        "label": "Question 2 — Droit effectif d'Amélie",
        "stdin": "q:2",
        "expected": "Écriture||ecriture"
      },
      {
        "label": "Question 3 — Droit effectif de Bruno",
        "stdin": "q:3",
        "expected": "Lecture||lecture"
      },
      {
        "label": "Question 4 — Droit effectif de Chloé",
        "stdin": "q:4",
        "expected": "Lecture||lecture"
      },
      {
        "label": "Question 5 — Droit effectif de David",
        "stdin": "q:5",
        "expected": "Contrôle total||controle total"
      },
      {
        "label": "Question 6 — Utilisateurs sans modification possible",
        "stdin": "q:6",
        "expected": "Bruno et Chloé||bruno et chloe"
      }
    ],
    "solution": "[Question 1 — Règle du droit effectif]\nla plus restrictive\n\n[Question 2 — Droit effectif d'Amélie]\nÉcriture\n\n[Question 3 — Droit effectif de Bruno]\nLecture\n\n[Question 4 — Droit effectif de Chloé]\nLecture\n\n[Question 5 — Droit effectif de David]\nContrôle total\n\n[Question 6 — Utilisateurs sans modification possible]\nBruno et Chloé",
    "takeaway": "1) Le droit effectif est la plus restrictive des deux barrières (partage et NTFS).\n2) Amélie : partage Modification, NTFS Écriture, donc Écriture.\n3) Bruno : partage Lecture, NTFS Modification, donc Lecture (le partage bride).\n4) Chloé : Lecture des deux côtés, donc Lecture.\n5) David : Contrôle total des deux côtés, donc Contrôle total.\n6) Seuls l'Écriture et au-delà permettent de modifier : Bruno (Lecture) et Chloé (Lecture) ne peuvent pas modifier les fichiers.\nContrôle : aucun profil ne dépasse l'une de ses deux barrières ; Amélie garde l'écriture grâce à son partage Modification."
  },
  {
    "id": "ws3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Les droits sur le dossier Cadres de la direction",
    "exampleTitle": "Exemple résolu — les droits sur le dossier Salaires",
    "goal": "Résoudre des autorisations NTFS selon la hiérarchie refus explicite, autorisation explicite, refus hérité, autorisation héritée.",
    "brief": "<p><strong>Énoncé.</strong> Sur SRV-FICHIER, le service RH gère l'arborescence D:\\RH\\Cadres. Les autorisations portées par le dossier Cadres sont les suivantes :</p><table><tr><th>Cible</th><th>Portée</th><th>Droit</th><th>Action</th></tr><tr><th>GG_Cadres</th><td>explicite</td><td>Lecture</td><td>Autoriser</td></tr><tr><th>GG_Cadres</th><td>explicite</td><td>Écriture</td><td>Autoriser</td></tr><tr><th>Thomas</th><td>explicite</td><td>Lecture</td><td>Refuser</td></tr><tr><th>Thomas</th><td>explicite</td><td>Écriture</td><td>Refuser</td></tr><tr><th>GG_RH</th><td>héritée de D:\\RH</td><td>Lecture</td><td>Autoriser</td></tr><tr><th>GG_RH</th><td>héritée de D:\\RH</td><td>Suppression</td><td>Refuser</td></tr></table><p>Appartenance : <strong>Marc</strong> est membre de GG_RH et de GG_Cadres ; <strong>Julie</strong> est membre de GG_RH uniquement ; <strong>Thomas</strong>, cadre partant à la retraite, est membre de GG_Cadres uniquement. Répondez par « Accordé » ou « Refusé » aux questions 2 à 5, de façon courte ailleurs.</p><ol><li>Quelle catégorie d'autorisations l'emporte sur toutes les autres ?</li><li>Le droit de lecture de Marc : accordé ou refusé ?</li><li>Le droit de suppression de Marc : accordé ou refusé ?</li><li>Le droit d'écriture de Julie : accordé ou refusé ?</li><li>Le droit de lecture de Thomas : accordé ou refusé ?</li><li>Quel niveau d'autorisation permet la lecture de Julie ?</li></ol>",
    "starter": "# Exercice — Les droits sur le dossier Cadres de la direction\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 à 5 : Accordé ou Refusé.\n\n[Question 1 — Catégorie d'autorisations prioritaire]\nA_COMPLETER\n\n[Question 2 — Lecture de Marc]\nA_COMPLETER\n\n[Question 3 — Suppression de Marc]\nA_COMPLETER\n\n[Question 4 — Écriture de Julie]\nA_COMPLETER\n\n[Question 5 — Lecture de Thomas]\nA_COMPLETER\n\n[Question 6 — Niveau de l'autorisation de Julie]\nA_COMPLETER\n",
    "hints": [
      "Hiérarchie du cours : refus explicite, puis autorisation explicite, puis refus hérité, puis autorisation héritée, et enfin refus implicite.",
      "Pour Marc, la lecture existe en explicite (GG_Cadres) et en héritée (GG_RH) : la catégorie la plus haute tranche.",
      "Pour Julie, aucune autorisation d'écriture n'existe nulle part : sans aucune ACE, le refus est implicite."
    ],
    "examples": [
      {
        "stdin": "Le dossier D:\\Direction\\Salaires porte :\nGG_Direction (explicite) Autoriser Lecture ; GG_Direction (explicite) Autoriser Écriture ;\nZoe (explicite) Refuser Lecture ; Zoe (explicite) Refuser Écriture ;\nGG_Siege (héritée de D:\\Direction) Autoriser Lecture ; GG_Siege (héritée) Refuser Suppression.\nNadia appartient à GG_Siege et GG_Direction ; Paul à GG_Siege ; Zoe à GG_Direction.\n\n1) Le refus explicite l'emporte sur tout.\n2) Lecture de Nadia : accordée (via GG_Direction).\n3) Suppression de Nadia : refusée (refus hérité de GG_Siege).\n4) Écriture de Paul : refusée (refus implicite).\n5) Lecture de Zoe : refusée (refus explicite).\n6) La lecture de Paul est permise par l'autorisation héritée.",
        "expected": "le refus explicite — Nadia : accordée — refus hérité — Paul : refus implicite — Zoe : refus explicite — autorisation héritée",
        "note": "Le refus explicite ne se contourne jamais : même une autorisation explicite du même niveau ne le renverse pas."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Catégorie d'autorisations prioritaire",
        "stdin": "q:1",
        "expected": "le refus explicite||refus explicite||Refuser explicite"
      },
      {
        "label": "Question 2 — Lecture de Marc",
        "stdin": "q:2",
        "expected": "Accordé||accordé||Oui||oui"
      },
      {
        "label": "Question 3 — Suppression de Marc",
        "stdin": "q:3",
        "expected": "Refusé||refusé||Non||non"
      },
      {
        "label": "Question 4 — Écriture de Julie",
        "stdin": "q:4",
        "expected": "Refusé||refusé||Non||non"
      },
      {
        "label": "Question 5 — Lecture de Thomas",
        "stdin": "q:5",
        "expected": "Refusé||refusé||Non||non"
      },
      {
        "label": "Question 6 — Niveau de l'autorisation de Julie",
        "stdin": "q:6",
        "expected": "héritée||l'autorisation héritée||une autorisation héritée"
      }
    ],
    "solution": "[Question 1 — Catégorie d'autorisations prioritaire]\nle refus explicite\n\n[Question 2 — Lecture de Marc]\nAccordé\n\n[Question 3 — Suppression de Marc]\nRefusé\n\n[Question 4 — Écriture de Julie]\nRefusé\n\n[Question 5 — Lecture de Thomas]\nRefusé\n\n[Question 6 — Niveau de l'autorisation de Julie]\nhéritée",
    "takeaway": "1) Le refus explicite l'emporte sur toutes les autres catégories.\n2) Accordée : la lecture de Marc provient de l'autorisation explicite de GG_Cadres, prioritaire sur l'autorisation héritée de GG_RH.\n3) Refusée : la suppression de Marc est bloquée par le refus hérité de GG_RH ; aucune autorisation explicite de suppression n'existe.\n4) Refusée : Julie ne possède aucune ACE d'écriture, le refus est implicite.\n5) Refusée : le refus explicite porté sur le compte de Thomas gagne contre l'autorisation explicite de GG_Cadres.\n6) La lecture de Julie est permise par l'autorisation héritée de GG_RH, venue de D:\\RH.\nContrôle : la hiérarchie tranche chaque droit séparément — lecture, écriture et suppression sont arbitrées indépendamment."
  },
  {
    "id": "ws3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le choix du layout du pool de stockage de SRV-FICHIER",
    "exampleTitle": "Exemple résolu — le pool du serveur de fichiers filial",
    "goal": "Chiffrer la capacité utile des layouts Storage Spaces et arbitrer selon un besoin en capacité et en tolérance de pannes.",
    "brief": "<p><strong>Énoncé.</strong> Marnier dote SRV-FICHIER d'un pool de six disques neufs de <strong>4 To</strong> chacun, soit 4000 Go par disque (24 000 Go bruts). Le cours donne les layouts suivants pour un même pool :</p><table><tr><th>Layout</th><th>Disques minimum</th><th>Pannes tolérées</th><th>Capacité utile</th></tr><tr><th>Simple</th><td>1</td><td>0</td><td>somme brute</td></tr><tr><th>Miroir double</th><td>2</td><td>1</td><td>moitié de la brute</td></tr><tr><th>Miroir triple</th><td>5</td><td>2</td><td>tiers de la brute</td></tr><tr><th>Parité</th><td>3</td><td>1</td><td>brute × (N − 1) / N</td></tr></table><p>Le service demandeur souhaite <strong>14 To utiles</strong> en tolérant <strong>au moins une panne de disque</strong>. Répondez par le nombre seul en Go pour les questions 1 à 4.</p><ol><li>Quelle est la capacité utile en Go du layout Simple ?</li><li>Quelle est la capacité utile en Go du layout Miroir double ?</li><li>Quelle est la capacité utile en Go du layout Miroir triple ?</li><li>Quelle est la capacité utile en Go du layout Parité ?</li><li>Combien de pannes le miroir triple tolère-t-il ?</li><li>Quel layout retenir entre miroir double et parité pour satisfaire la demande du service ?</li></ol>",
    "starter": "# Exercice — Le choix du layout du pool de stockage de SRV-FICHIER\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul en Go. Question 6 : miroir double ou parité.\n\n[Question 1 — Capacité utile Simple (Go)]\nA_COMPLETER\n\n[Question 2 — Capacité utile Miroir double (Go)]\nA_COMPLETER\n\n[Question 3 — Capacité utile Miroir triple (Go)]\nA_COMPLETER\n\n[Question 4 — Capacité utile Parité (Go)]\nA_COMPLETER\n\n[Question 5 — Pannes tolérées par le miroir triple]\nA_COMPLETER\n\n[Question 6 — Layout retenu pour 14 To utiles]\nA_COMPLETER\n",
    "hints": [
      "Posez la brute : 6 × 4000 = 24 000 Go, puis appliquez la règle de chaque layout.",
      "La parité avec N disques offre la brute × (N − 1)/N : ici 24 000 × 5/6.",
      "Pour la question 6, confrontez chaque capacité utile à la demande de 14 To : 12 000 Go (miroir double) ne suffisent pas."
    ],
    "examples": [
      {
        "stdin": "Un pool filial compte six disques de 2 To (2000 Go), soit 12 000 Go bruts.\nLe service demande 7 To utiles en tolérant une panne.\n\n1) Simple : 12 000 Go.\n2) Miroir double : 6000 Go.\n3) Miroir triple : 4000 Go.\n4) Parité : 12 000 × 5/6 = 10 000 Go.\n5) Le miroir triple tolère 2 pannes.\n6) Retenu : parité (6000 Go insuffisants, 10 000 Go suffisent).",
        "expected": "Simple 12000 — miroir double 6000 — miroir triple 4000 — parité 10000 — 2 pannes — parité retenue",
        "note": "La capacité utile se calcule toujours sur la brute du pool, jamais sur le besoin : le besoin ne fait que sélectionner le layout."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Capacité utile Simple (Go)",
        "stdin": "q:1",
        "expected": "24000||24 000||24000 Go"
      },
      {
        "label": "Question 2 — Capacité utile Miroir double (Go)",
        "stdin": "q:2",
        "expected": "12000||12 000||12000 Go"
      },
      {
        "label": "Question 3 — Capacité utile Miroir triple (Go)",
        "stdin": "q:3",
        "expected": "8000||8 000||8000 Go"
      },
      {
        "label": "Question 4 — Capacité utile Parité (Go)",
        "stdin": "q:4",
        "expected": "20000||20 000||20000 Go"
      },
      {
        "label": "Question 5 — Pannes tolérées par le miroir triple",
        "stdin": "q:5",
        "expected": "2||deux"
      },
      {
        "label": "Question 6 — Layout retenu pour 14 To utiles",
        "stdin": "q:6",
        "expected": "parité||la parité||Parité"
      }
    ],
    "solution": "[Question 1 — Capacité utile Simple (Go)]\n24000\n\n[Question 2 — Capacité utile Miroir double (Go)]\n12000\n\n[Question 3 — Capacité utile Miroir triple (Go)]\n8000\n\n[Question 4 — Capacité utile Parité (Go)]\n20000\n\n[Question 5 — Pannes tolérées par le miroir triple]\n2\n\n[Question 6 — Layout retenu pour 14 To utiles]\nparité",
    "takeaway": "1) Simple : 6 × 4000 = 24 000 Go (aucune résilience).\n2) Miroir double : 24 000 / 2 = 12 000 Go.\n3) Miroir triple : 24 000 / 3 = 8000 Go.\n4) Parité : 24 000 × (6 − 1)/6 = 20 000 Go.\n5) Le miroir triple tolère 2 pannes de disque.\n6) La demande est de 14 000 Go avec au moins une panne tolérée : le miroir double (12 000 Go) est insuffisant, la parité (20 000 Go) satisfait les deux contraintes ; on retient la parité.\nContrôle : chaque layout est une alternative, pas un cumul ; la parité sacrifie 4000 Go (l'équivalent d'un disque) pour sa résilience."
  }
];
