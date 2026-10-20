'use strict';

module.exports = [
  {
    "id": "sql2-c2-e1",
    "chapter": 2,
    "title": "Moteur d’évaluation de clause WHERE multi-critères",
    "level": "n1",
    "language": "analyse",
    "goal": "Filtrer un ensemble de données selon des conditions combinées avec AND et comparateurs.",
    "brief": "<p>Le script simule l’exécution d’une clause <code>WHERE</code> sur un jeu d’enregistrements d’employés.\nChaque employé est décrit par : <code>id:nom:departement:salaire</code>.\n\nEntrée :\n- Ligne 1 : Les critères de filtrage séparés par des virgules (ex: <code>dept=IT,salaire&gt;=3000</code>).\n- Ligne 2 : La liste des employés séparés par des points-virgules (ex: <code>1:Alice:IT:3200;2:Bob:RH:2500;3:Claire:IT:2800</code>).\n\nSortie :\nLa liste des noms d’employés correspondants, triés par salaire décroissant sous la forme <code>Nom(Salaire)</code>, séparés par des virgules (ou <code>AUCUN</code> si aucun résultat).</p>",
    "starter": "# Grille d'analyse (sql2-c2-e1) — Moteur d’évaluation de clause WHERE multi-critères\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Filtre sur département uniquement]\n# Données : dept=RH\n# Données : 1:Alice:IT:3200;2:Bob:RH:2500;3:Claire:RH:2900\nA_COMPLETER\n\n[Cas 2 — Filtre avec opérateur inférieur strict]\n# Données : salaire<3000\n# Données : 1:Alice:IT:3200;2:Bob:RH:2500;3:Claire:IT:2800;4:Marc:IT:3000\nA_COMPLETER\n\n[Cas 3 — Aucun enregistrement ne correspond]\n# Données : dept=FINANCE,salaire>=5000\n# Données : 1:Alice:IT:3200;2:Bob:RH:2500\nA_COMPLETER\n",
    "hints": [
      "Parse les critères : repère les opérateurs >=, <=, >, <, =, !=.",
      "Pour chaque employé, vérifie que TOUTES les conditions (AND implicite) sont satisfaites.",
      "Trie les employés retenus par salaire décroissant."
    ],
    "examples": [
      {
        "stdin": "dept=IT,salaire>=3000\n1:Alice:IT:3200;2:Bob:RH:2500;3:Claire:IT:2800;4:David:IT:4100",
        "expected": "David(4100),Alice(3200)",
        "note": "David et Alice appartiennent au département IT avec un salaire >= 3000."
      }
    ],
    "tests": [
      {
        "label": "Filtre sur département uniquement",
        "stdin": "cas:1",
        "expected": "Claire(2900),Bob(2500)"
      },
      {
        "label": "Filtre avec opérateur inférieur strict",
        "stdin": "cas:2",
        "expected": "Claire(2800),Bob(2500)"
      },
      {
        "label": "Aucun enregistrement ne correspond",
        "stdin": "cas:3",
        "expected": "AUCUN"
      }
    ],
    "solution": "[Exemple]\nDavid(4100),Alice(3200)\n\n[Cas 1 — Filtre sur département uniquement]\nClaire(2900),Bob(2500)\n\n[Cas 2 — Filtre avec opérateur inférieur strict]\nClaire(2800),Bob(2500)\n\n[Cas 3 — Aucun enregistrement ne correspond]\nAUCUN"
  },
  {
    "id": "sql2-c2-e2",
    "chapter": 2,
    "title": "Gestionnaire de logique tri-valuée et fonction COALESCE",
    "level": "n2",
    "language": "analyse",
    "goal": "Implémenter la logique tri-valuée SQL (TRUE, FALSE, UNKNOWN) et la substitution de valeurs NULL par COALESCE.",
    "brief": "<p>En SQL, une comparaison avec <code>NULL</code> (ex: <code>col = NULL</code>) ne renvoie ni TRUE ni FALSE mais <code>UNKNOWN</code>. La fonction <code>COALESCE(v1, v2, ..., defaut)</code> renvoie le premier argument non-NULL rencontré.</p>\n<p>Entrée :\nChaque ligne contient une séquence de valeurs séparées par des virgules : <code>tel_fixe,tel_mobile,tel_bureau,defaut</code> (la valeur <code>NULL</code> est écrite textuellement <code>NULL</code>).\n\nSortie :\nPour chaque ligne : <code>Contact: &lt;Valeur_Retenue&gt;</code>.</p>",
    "starter": "# Grille d'analyse (sql2-c2-e2) — Gestionnaire de logique tri-valuée et fonction COALESCE\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes les valeurs sont nulles sauf le repli]\n# Données : NULL,NULL,NULL,Aucun_numero\nA_COMPLETER\n\n[Cas 2 — Premier champ déjà renseigné]\n# Données : 0102030405,0600000000,0900000000,Defaut\nA_COMPLETER\n\n[Cas 3 — Multiples lignes avec cas variés]\n# Données : NULL,NULL,0955443322,Standard\n# Données : NULL,0788990011,NULL,Standard\nA_COMPLETER\n",
    "hints": [
      "Traite la chaîne de caractères \"NULL\" comme une absence de valeur.",
      "Itère sur les éléments de gauche à droite et retiens le premier élément distinct de \"NULL\"."
    ],
    "examples": [
      {
        "stdin": "NULL,0611223344,NULL,Non_renseigne\nNULL,NULL,NULL,Inconnu\n0140000000,0699887766,NULL,Defaut",
        "expected": "Contact: 0611223344\nContact: Inconnu\nContact: 0140000000",
        "note": "COALESCE retient le premier champ non nul."
      }
    ],
    "tests": [
      {
        "label": "Toutes les valeurs sont nulles sauf le repli",
        "stdin": "cas:1",
        "expected": "Contact: Aucun_numero"
      },
      {
        "label": "Premier champ déjà renseigné",
        "stdin": "cas:2",
        "expected": "Contact: 0102030405"
      },
      {
        "label": "Multiples lignes avec cas variés",
        "stdin": "cas:3",
        "expected": "Contact: 0955443322\nContact: 0788990011"
      }
    ],
    "solution": "[Exemple]\nContact: 0611223344\nContact: Inconnu\nContact: 0140000000\n\n[Cas 1 — Toutes les valeurs sont nulles sauf le repli]\nContact: Aucun_numero\n\n[Cas 2 — Premier champ déjà renseigné]\nContact: 0102030405\n\n[Cas 3 — Multiples lignes avec cas variés]\nContact: 0955443322\nContact: 0788990011"
  },
  {
    "id": "sql2-c2-e3",
    "chapter": 2,
    "title": "Émulateur d’opérateur de recherche SQL LIKE (% et _)",
    "level": "n3",
    "language": "analyse",
    "goal": "Convertir un motif SQL LIKE en expression régulière et filtrer un dictionnaire de mots.",
    "brief": "<p>En SQL, l’opérateur <code>LIKE</code> utilise deux caractères génériques (jokers) :\n- <code>%</code> représente zéro, un ou plusieurs caractères ;\n- <code>_</code> représente exactement un caractère quelconque.\nLa comparaison est insensible à la casse (comme sous MySQL par défaut).\n\nEntrée :\n- Ligne 1 : Le motif SQL LIKE (ex: <code>A%_E</code>).\n- Ligne 2 : La liste de mots candidats séparés par des virgules (ex: <code>arbre,ANGLE,acte,AUBE,avion</code>).\n\nSortie :\n<code>Correspondances: &lt;mot1,mot2&gt;</code> ou <code>Correspondances: AUCUNE</code>.</p>",
    "starter": "# Grille d'analyse (sql2-c2-e3) — Émulateur d’opérateur de recherche SQL LIKE (% et _)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Motif simple se terminant par une chaîne fixe]\n# Données : %tion\n# Données : programmation,sql,fonction,action,table\nA_COMPLETER\n\n[Cas 2 — Motif avec tirets bas stricts (longueur fixe)]\n# Données : ___s\n# Données : des,mots,bras,test,mais\nA_COMPLETER\n\n[Cas 3 — Aucune correspondance]\n# Données : Z%\n# Données : alpha,beta,gamma\nA_COMPLETER\n",
    "hints": [
      "Échappe d abord les caractères spéciaux d expression régulière.",
      "Remplace % par .* et _ par . en bornant le tout avec ^ et $.",
      "Applique re.IGNORECASE."
    ],
    "examples": [
      {
        "stdin": "A%_E\nbateau,ANGLE,acte,AUBE,avion",
        "expected": "Correspondances: ANGLE,acte,AUBE",
        "note": "ANGLE, acte et AUBE commencent par A, ont au moins 1 lettre intermédiaire et finissent par E."
      }
    ],
    "tests": [
      {
        "label": "Motif simple se terminant par une chaîne fixe",
        "stdin": "cas:1",
        "expected": "Correspondances: programmation,fonction,action"
      },
      {
        "label": "Motif avec tirets bas stricts (longueur fixe)",
        "stdin": "cas:2",
        "expected": "Correspondances: mots,bras,mais"
      },
      {
        "label": "Aucune correspondance",
        "stdin": "cas:3",
        "expected": "Correspondances: AUCUNE"
      }
    ],
    "solution": "[Exemple]\nCorrespondances: ANGLE,acte,AUBE\n\n[Cas 1 — Motif simple se terminant par une chaîne fixe]\nCorrespondances: programmation,fonction,action\n\n[Cas 2 — Motif avec tirets bas stricts (longueur fixe)]\nCorrespondances: mots,bras,mais\n\n[Cas 3 — Aucune correspondance]\nCorrespondances: AUCUNE"
  }
];
