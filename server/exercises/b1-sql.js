/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "sq-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le vocabulaire des bases de données",
    "goal": "Associer chaque terme du chapitre à sa définition exacte.",
    "brief": "<p>Analysez chaque ligne proposée « terme definition » : definition est un code parmi <code>contenu</code>, <code>logiciel</code>, <code>langage</code> ou <code>modele</code>. Vocabulaire du chapitre : la <strong>base de données</strong> est le contenu organisé → <code>contenu</code> ; le <strong>SGBD</strong> est le logiciel qui la gère → <code>logiciel</code> ; <strong>SQL</strong> est le langage d’interrogation → <code>langage</code> ; le <strong>modèle relationnel</strong> organise les données en tables → <code>modele</code>. Pour chaque ligne il Indiquez <code>terme : OK</code> ou <code>terme : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c1-e1) — Le vocabulaire des bases de données\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre termes]\n# Données : 4\n# Données : base contenu\n# Données : sgbd logiciel\n# Données : sql langage\n# Données : relationnel modele\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : base logiciel\n# Données : sgbd contenu\n# Données : sql modele\n# Données : relationnel modele\nA_COMPLETER\n\n[Cas 3 — Interro écrite]\n# Données : 5\n# Données : relationnel modele\n# Données : sql langage\n# Données : base contenu\n# Données : sgbd logiciel\n# Données : base logiciel\nA_COMPLETER\n",
    "hints": [
      "Un case sur le terme : base → contenu, sgbd → logiciel, sql → langage, relationnel → modele.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nbase contenu\nsgbd logiciel\nsql langage\n",
        "expected": "base : OK\nsgbd : OK\nsql : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les quatre termes",
        "stdin": "cas:1",
        "expected": "base : OK\nsgbd : OK\nsql : OK\nrelationnel : OK\ncorrects : 4/4"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "base : ERREUR\nsgbd : ERREUR\nsql : ERREUR\nrelationnel : OK\ncorrects : 1/4"
      },
      {
        "label": "Interro écrite",
        "stdin": "cas:3",
        "expected": "relationnel : OK\nsql : OK\nbase : OK\nsgbd : OK\nbase : ERREUR\ncorrects : 4/5"
      }
    ],
    "solution": "[Exemple]\nbase : OK\nsgbd : OK\nsql : OK\ncorrects : 3/3\n\n[Cas 1 — Les quatre termes]\nbase : OK\nsgbd : OK\nsql : OK\nrelationnel : OK\ncorrects : 4/4\n\n[Cas 2 — Trois confusions]\nbase : ERREUR\nsgbd : ERREUR\nsql : ERREUR\nrelationnel : OK\ncorrects : 1/4\n\n[Cas 3 — Interro écrite]\nrelationnel : OK\nsql : OK\nbase : OK\nsgbd : OK\nbase : ERREUR\ncorrects : 4/5"
  },
  {
    "id": "sq-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les six fonctions d’une base",
    "goal": "Valider la fonction FIQSCP cochée pour chaque besoin exprimé.",
    "brief": "<p>Analysez chaque ligne proposée « besoin fonction » : fonction est un code parmi <code>fiable</code>, <code>volumes</code>, <code>rapide</code>, <code>sur</code>, <code>coherent</code> ou <code>partage</code>. Besoins du cours : restituer l’information à l’identique → <code>fiable</code> ; absorber de grands volumes → <code>volumes</code> ; répondre vite → <code>rapide</code> ; autoriser selon l’utilisateur → <code>sur</code> ; rester conforme au modèle → <code>coherent</code> ; servir plusieurs applications et métiers → <code>partage</code>. Pour chaque ligne il Indiquez <code>besoin : OK</code> ou <code>besoin : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c1-e2) — Les six fonctions d’une base\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les six fonctions]\n# Données : 6\n# Données : restitution fiable\n# Données : masse volumes\n# Données : reponse rapide\n# Données : acces sur\n# Données : qualite coherent\n# Données : metiers partage\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : restitution rapide\n# Données : masse fiable\n# Données : acces partage\n# Données : reponse rapide\nA_COMPLETER\n\n[Cas 3 — Support de cours]\n# Données : 5\n# Données : qualite coherent\n# Données : metiers partage\n# Données : acces sur\n# Données : masse volumes\n# Données : restitution fiable\nA_COMPLETER\n",
    "hints": [
      "Un case sur le besoin : restitution → fiable, masse → volumes, reponse → rapide, acces → sur, qualite → coherent, metiers → partage.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nrestitution fiable\nmasse volumes\nmetiers partage\n",
        "expected": "restitution : OK\nmasse : OK\nmetiers : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les six fonctions",
        "stdin": "cas:1",
        "expected": "restitution : OK\nmasse : OK\nreponse : OK\nacces : OK\nqualite : OK\nmetiers : OK\ncorrects : 6/6"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "restitution : ERREUR\nmasse : ERREUR\nacces : ERREUR\nreponse : OK\ncorrects : 1/4"
      },
      {
        "label": "Support de cours",
        "stdin": "cas:3",
        "expected": "qualite : OK\nmetiers : OK\nacces : OK\nmasse : OK\nrestitution : OK\ncorrects : 5/5"
      }
    ],
    "solution": "[Exemple]\nrestitution : OK\nmasse : OK\nmetiers : OK\ncorrects : 3/3\n\n[Cas 1 — Les six fonctions]\nrestitution : OK\nmasse : OK\nreponse : OK\nacces : OK\nqualite : OK\nmetiers : OK\ncorrects : 6/6\n\n[Cas 2 — Trois confusions]\nrestitution : ERREUR\nmasse : ERREUR\nacces : ERREUR\nreponse : OK\ncorrects : 1/4\n\n[Cas 3 — Support de cours]\nqualite : OK\nmetiers : OK\nacces : OK\nmasse : OK\nrestitution : OK\ncorrects : 5/5"
  },
  {
    "id": "sq-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Clé primaire ou clé étrangère ?",
    "goal": "Classer les contraintes de clés des tables Marque et Voiture.",
    "brief": "<p>Analysez chaque ligne proposée « colonne role » : role est un code parmi <code>primaire</code>, <code>etrangere</code>, <code>attribut</code> ou <code>calcule</code>. Schéma du parc_auto : <code>codemarque</code> dans Marque → <code>primaire</code> ; <code>immat</code> dans Voiture → <code>primaire</code> ; <code>marque</code> dans Voiture (copie de codemarque) → <code>etrangere</code> ; <code>pxachat</code> dans Voiture → <code>attribut</code> ; <code>nb</code> issu d’un COUNT → <code>calcule</code>. Pour chaque ligne il Indiquez <code>colonne : OK</code> ou <code>colonne : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c1-e3) — Clé primaire ou clé étrangère ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les cinq colonnes]\n# Données : 5\n# Données : codemarque primaire\n# Données : immat primaire\n# Données : marque etrangere\n# Données : pxachat attribut\n# Données : nb calcule\nA_COMPLETER\n\n[Cas 2 — Trois erreurs de rôle]\n# Données : 4\n# Données : marque primaire\n# Données : immat etrangere\n# Données : nb attribut\n# Données : pxachat attribut\nA_COMPLETER\n\n[Cas 3 — Schema du parc]\n# Données : 5\n# Données : pxachat attribut\n# Données : nb calcule\n# Données : marque etrangere\n# Données : immat primaire\n# Données : codemarque primaire\nA_COMPLETER\n",
    "hints": [
      "Un case sur la colonne : codemarque/immat → primaire, marque → etrangere, pxachat → attribut, nb → calcule.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\ncodemarque primaire\nimmat primaire\nmarque etrangere\n",
        "expected": "codemarque : OK\nimmat : OK\nmarque : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les cinq colonnes",
        "stdin": "cas:1",
        "expected": "codemarque : OK\nimmat : OK\nmarque : OK\npxachat : OK\nnb : OK\ncorrects : 5/5"
      },
      {
        "label": "Trois erreurs de rôle",
        "stdin": "cas:2",
        "expected": "marque : ERREUR\nimmat : ERREUR\nnb : ERREUR\npxachat : OK\ncorrects : 1/4"
      },
      {
        "label": "Schema du parc",
        "stdin": "cas:3",
        "expected": "pxachat : OK\nnb : OK\nmarque : OK\nimmat : OK\ncodemarque : OK\ncorrects : 5/5"
      }
    ],
    "solution": "[Exemple]\ncodemarque : OK\nimmat : OK\nmarque : OK\ncorrects : 3/3\n\n[Cas 1 — Les cinq colonnes]\ncodemarque : OK\nimmat : OK\nmarque : OK\npxachat : OK\nnb : OK\ncorrects : 5/5\n\n[Cas 2 — Trois erreurs de rôle]\nmarque : ERREUR\nimmat : ERREUR\nnb : ERREUR\npxachat : OK\ncorrects : 1/4\n\n[Cas 3 — Schema du parc]\npxachat : OK\nnb : OK\nmarque : OK\nimmat : OK\ncodemarque : OK\ncorrects : 5/5"
  },
  {
    "id": "sq-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le type SQL de chaque colonne",
    "goal": "Valider le type du schéma parc_auto colonne par colonne.",
    "brief": "<p>Analysez chaque ligne proposée « colonne type » : type est un code parmi <code>text</code>, <code>entier</code> ou <code>date</code>. Schéma du support : immat, marque, moteur et datecirc → <code>text</code> (datecirc stocké TEXT sous SQLite, format AAAA-MM-JJ qui se trie comme une chaîne) ; km, pxachat et nbreplace → <code>entier</code>. Pour chaque ligne il Indiquez <code>colonne : OK</code> ou <code>colonne : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c2-e1) — Le type SQL de chaque colonne\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les sept colonnes]\n# Données : 7\n# Données : immat text\n# Données : marque text\n# Données : moteur text\n# Données : datecirc text\n# Données : km entier\n# Données : pxachat entier\n# Données : nbreplace entier\nA_COMPLETER\n\n[Cas 2 — Trois erreurs de type]\n# Données : 4\n# Données : km text\n# Données : immat entier\n# Données : nbreplace text\n# Données : datecirc text\nA_COMPLETER\n\n[Cas 3 — Schema Voiture]\n# Données : 7\n# Données : nbreplace entier\n# Données : datecirc text\n# Données : pxachat entier\n# Données : moteur text\n# Données : km entier\n# Données : marque text\n# Données : immat text\nA_COMPLETER\n",
    "hints": [
      "Un case sur la colonne : immat/marque/moteur/datecirc → text, km/pxachat/nbreplace → entier.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nimmat text\nkm entier\npxachat entier\n",
        "expected": "immat : OK\nkm : OK\npxachat : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les sept colonnes",
        "stdin": "cas:1",
        "expected": "immat : OK\nmarque : OK\nmoteur : OK\ndatecirc : OK\nkm : OK\npxachat : OK\nnbreplace : OK\ncorrects : 7/7"
      },
      {
        "label": "Trois erreurs de type",
        "stdin": "cas:2",
        "expected": "km : ERREUR\nimmat : ERREUR\nnbreplace : ERREUR\ndatecirc : OK\ncorrects : 1/4"
      },
      {
        "label": "Schema Voiture",
        "stdin": "cas:3",
        "expected": "nbreplace : OK\ndatecirc : OK\npxachat : OK\nmoteur : OK\nkm : OK\nmarque : OK\nimmat : OK\ncorrects : 7/7"
      }
    ],
    "solution": "[Exemple]\nimmat : OK\nkm : OK\npxachat : OK\ncorrects : 3/3\n\n[Cas 1 — Les sept colonnes]\nimmat : OK\nmarque : OK\nmoteur : OK\ndatecirc : OK\nkm : OK\npxachat : OK\nnbreplace : OK\ncorrects : 7/7\n\n[Cas 2 — Trois erreurs de type]\nkm : ERREUR\nimmat : ERREUR\nnbreplace : ERREUR\ndatecirc : OK\ncorrects : 1/4\n\n[Cas 3 — Schema Voiture]\nnbreplace : OK\ndatecirc : OK\npxachat : OK\nmoteur : OK\nkm : OK\nmarque : OK\nimmat : OK\ncorrects : 7/7"
  },
  {
    "id": "sq-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "INSERT : ligne conforme ou rejetée ?",
    "goal": "Décider si une insertion respecte les contraintes NOT NULL et PRIMARY KEY.",
    "brief": "<p>Analysez chaque ligne proposée « immat marque moteur km pxachat nbreplace ». Contraintes de Voiture : immat (clé primaire), marque et moteur (NOT NULL) obligatoires — la valeur <code>-</code> signifie absent ; km, pxachat et nbreplace, entiers. Règles de refus : clé primaire absente, marque ou moteur absent, valeur non numérique dans km/pxachat/nbreplace. Pour chaque ligne il Indiquez <code>immat : inseree</code> ou <code>immat : rejetee (raison)</code> avec raison = <code>cle</code>, <code>obligatoire</code> ou <code>type</code> (dans cet ordre de priorité), puis <code>insertions : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c2-e2) — INSERT : ligne conforme ou rejetée ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois rejets distincts]\n# Données : 3\n# Données : TG-2222-AA RENAULT DIESEL 0 15000000 5\n# Données : TG-3333-AA - DIESEL 0 15000000 5\n# Données : TG-4444-AA PEUGEOT ESSENCE dix 15000000 5\nA_COMPLETER\n\n[Cas 2 — Lot du stage]\n# Données : 4\n# Données : TG-5555-AA KIA ESSENCE 0 50000000 7\n# Données : TG-6666-AA MG ESSENCE 0 20000000 5\n# Données : TG-7777-AA MAZDA ESSENCE - 17000000 5\n# Données : TG-8888-AA NISSAN ESSENCE 0 10000000 cinq\nA_COMPLETER\n\n[Cas 3 — Reprise du support]\n# Données : 3\n# Données : TG-9999-AA TOYOTA HYBRIDE 0 25000000 7\n# Données : - - - 0 0 0\n# Données : TG-1212-AA HYUNDAI ELECTRIQUE 0 23000000 5\nA_COMPLETER\n",
    "hints": [
      "Contrôle 1 : immat = \"-\" → rejetee (cle). Contrôle 2 : marque = \"-\" ou moteur = \"-\" → rejetee (obligatoire).",
      "Contrôle 3 : case sur km, pxachat, nbreplace — tout motif contenant un caractère autre que 0-9 → rejetee (type)."
    ],
    "examples": [
      {
        "stdin": "2\nTG-1111-AA TOYOTA DIESEL 0 5000000 5\n- BMW ESSENCE 0 10000000 5\n",
        "expected": "TG-1111-AA : inseree\n- : rejetee (cle)\ninsertions : 1/2"
      }
    ],
    "tests": [
      {
        "label": "Trois rejets distincts",
        "stdin": "cas:1",
        "expected": "TG-2222-AA : inseree\nTG-3333-AA : rejetee (obligatoire)\nTG-4444-AA : rejetee (type)\ninsertions : 1/3"
      },
      {
        "label": "Lot du stage",
        "stdin": "cas:2",
        "expected": "TG-5555-AA : inseree\nTG-6666-AA : inseree\nTG-7777-AA : rejetee (type)\nTG-8888-AA : rejetee (type)\ninsertions : 2/4"
      },
      {
        "label": "Reprise du support",
        "stdin": "cas:3",
        "expected": "TG-9999-AA : inseree\n- : rejetee (cle)\nTG-1212-AA : inseree\ninsertions : 2/3"
      }
    ],
    "solution": "[Exemple]\nTG-1111-AA : inseree\n- : rejetee (cle)\ninsertions : 1/2\n\n[Cas 1 — Trois rejets distincts]\nTG-2222-AA : inseree\nTG-3333-AA : rejetee (obligatoire)\nTG-4444-AA : rejetee (type)\ninsertions : 1/3\n\n[Cas 2 — Lot du stage]\nTG-5555-AA : inseree\nTG-6666-AA : inseree\nTG-7777-AA : rejetee (type)\nTG-8888-AA : rejetee (type)\ninsertions : 2/4\n\n[Cas 3 — Reprise du support]\nTG-9999-AA : inseree\n- : rejetee (cle)\nTG-1212-AA : inseree\ninsertions : 2/3"
  },
  {
    "id": "sq-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "L’ordre des clauses CREATE TABLE",
    "goal": "Valider l’ordre du cycle : CREATE TABLE, colonnes, INSERT.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Pour chaque ligne il Indiquez <code>etape N : OK</code> quand l’étape ET son objet sont justes, sinon <code>etape N : NON</code>, puis <code>etapes correctes : X/4</code>.</p>",
    "starter": "# Grille d'analyse (sq-c2-e3) — L’ordre des clauses CREATE TABLE\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux dernières inversées]\n# Données : create table\n# Données : colonne type\n# Données : insert donnees\n# Données : cle primaire\nA_COMPLETER\n\n[Cas 2 — Objets échangés]\n# Données : create type\n# Données : colonne table\n# Données : cle primaire\n# Données : insert donnees\nA_COMPLETER\n\n[Cas 3 — Ordre mélangé]\n# Données : colonne type\n# Données : create table\n# Données : cle primaire\n# Données : insert donnees\nA_COMPLETER\n",
    "hints": [
      "Un case sur le numéro : 1 → create/table, 2 → colonne/type, 3 → cle/primaire, 4 → insert/donnees.",
      "Les deux conditions doivent être vraies en même temps : etape ET objet."
    ],
    "examples": [
      {
        "stdin": "create table\ncolonne type\ncle primaire\ninsert donnees\n",
        "expected": "etape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netapes correctes : 4/4"
      }
    ],
    "tests": [
      {
        "label": "Deux dernières inversées",
        "stdin": "cas:1",
        "expected": "etape 1 : OK\netape 2 : OK\netape 3 : NON\netape 4 : NON\netapes correctes : 2/4"
      },
      {
        "label": "Objets échangés",
        "stdin": "cas:2",
        "expected": "etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4"
      },
      {
        "label": "Ordre mélangé",
        "stdin": "cas:3",
        "expected": "etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4"
      }
    ],
    "solution": "[Exemple]\netape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netapes correctes : 4/4\n\n[Cas 1 — Deux dernières inversées]\netape 1 : OK\netape 2 : OK\netape 3 : NON\netape 4 : NON\netapes correctes : 2/4\n\n[Cas 2 — Objets échangés]\netape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4\n\n[Cas 3 — Ordre mélangé]\netape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4"
  },
  {
    "id": "sq-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Clause ou mot-clé SQL ?",
    "goal": "Associer chaque mot du SELECT à sa famille.",
    "brief": "<p>Analysez chaque ligne proposée « mot famille » : famille est un code parmi <code>projection</code>, <code>filtrage</code>, <code>tri</code> ou <code>limite</code>. Vocabulaire du chapitre : SELECT et les colonnes affichées → <code>projection</code> ; WHERE et DISTINCT → <code>filtrage</code> ; ORDER BY → <code>tri</code> ; LIMIT → <code>limite</code>. Pour chaque ligne il Indiquez <code>mot : OK</code> ou <code>mot : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c3-e1) — Clause ou mot-clé SQL ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les cinq mots]\n# Données : 5\n# Données : select projection\n# Données : where filtrage\n# Données : distinct filtrage\n# Données : order tri\n# Données : limit limite\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : where tri\n# Données : select filtrage\n# Données : order limite\n# Données : limit limite\nA_COMPLETER\n\n[Cas 3 — Requête complète]\n# Données : 5\n# Données : limit limite\n# Données : order tri\n# Données : distinct filtrage\n# Données : where filtrage\n# Données : select projection\nA_COMPLETER\n",
    "hints": [
      "Un case sur le mot : select → projection, where/distinct → filtrage, order → tri, limit → limite.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nselect projection\nwhere filtrage\nlimit limite\n",
        "expected": "select : OK\nwhere : OK\nlimit : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les cinq mots",
        "stdin": "cas:1",
        "expected": "select : OK\nwhere : OK\ndistinct : OK\norder : OK\nlimit : OK\ncorrects : 5/5"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "where : ERREUR\nselect : ERREUR\norder : ERREUR\nlimit : OK\ncorrects : 1/4"
      },
      {
        "label": "Requête complète",
        "stdin": "cas:3",
        "expected": "limit : OK\norder : OK\ndistinct : OK\nwhere : OK\nselect : OK\ncorrects : 5/5"
      }
    ],
    "solution": "[Exemple]\nselect : OK\nwhere : OK\nlimit : OK\ncorrects : 3/3\n\n[Cas 1 — Les cinq mots]\nselect : OK\nwhere : OK\ndistinct : OK\norder : OK\nlimit : OK\ncorrects : 5/5\n\n[Cas 2 — Trois confusions]\nwhere : ERREUR\nselect : ERREUR\norder : ERREUR\nlimit : OK\ncorrects : 1/4\n\n[Cas 3 — Requête complète]\nlimit : OK\norder : OK\ndistinct : OK\nwhere : OK\nselect : OK\ncorrects : 5/5"
  },
  {
    "id": "sq-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Diesels de luxe : filtrer le parc",
    "goal": "Appliquer un filtre WHERE à deux conditions avec comparaisons numériques.",
    "brief": "<p>Analysez chaque ligne proposée « immat moteur prix » et rejoue la mission « Diesels de luxe » : afficher les voitures dont <code>moteur</code> vaut DIESEL et dont le prix dépasse 20 millions (strictement). Le nom de marque ne fait pas partie des données. Pour chaque voiture il Indiquez <code>immat : retient</code> si les deux conditions sont vraies, sinon <code>immat : ecarte</code>, puis <code>retenues : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c3-e2) — Diesels de luxe : filtrer le parc\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Moteur seul]\n# Données : 3\n# Données : TG-2222-BC DIESEL 15000000\n# Données : TG-7854-Z DIESEL 6000000\n# Données : TG-4444-BC DIESEL 30000000\nA_COMPLETER\n\n[Cas 2 — Prix seul]\n# Données : 3\n# Données : TG-9420-AF ESSENCE 50000000\n# Données : TG-5420-AL ESSENCE 50000000\n# Données : TG-2540-AW ESSENCE 50000000\nA_COMPLETER\n\n[Cas 3 — Sélection complète]\n# Données : 4\n# Données : TG-9420-AF DIESEL 50000000\n# Données : TG-9420-AK DIESEL 50000000\n# Données : TG-0020-AL DIESEL 50000000\n# Données : TG-6733-AC DIESEL 9600000\nA_COMPLETER\n",
    "hints": [
      "Les deux conditions en ET : moteur = DIESEL et prix -gt 20000000.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nTG-9420-AF ESSENCE 50000000\nTG-6733-AC DIESEL 9600000\nTG-0020-AL DIESEL 50000000\n",
        "expected": "TG-9420-AF : ecarte\nTG-6733-AC : ecarte\nTG-0020-AL : retient\nretenues : 1/3"
      }
    ],
    "tests": [
      {
        "label": "Moteur seul",
        "stdin": "cas:1",
        "expected": "TG-2222-BC : ecarte\nTG-7854-Z : ecarte\nTG-4444-BC : retient\nretenues : 1/3"
      },
      {
        "label": "Prix seul",
        "stdin": "cas:2",
        "expected": "TG-9420-AF : ecarte\nTG-5420-AL : ecarte\nTG-2540-AW : ecarte\nretenues : 0/3"
      },
      {
        "label": "Sélection complète",
        "stdin": "cas:3",
        "expected": "TG-9420-AF : retient\nTG-9420-AK : retient\nTG-0020-AL : retient\nTG-6733-AC : ecarte\nretenues : 3/4"
      }
    ],
    "solution": "[Exemple]\nTG-9420-AF : ecarte\nTG-6733-AC : ecarte\nTG-0020-AL : retient\nretenues : 1/3\n\n[Cas 1 — Moteur seul]\nTG-2222-BC : ecarte\nTG-7854-Z : ecarte\nTG-4444-BC : retient\nretenues : 1/3\n\n[Cas 2 — Prix seul]\nTG-9420-AF : ecarte\nTG-5420-AL : ecarte\nTG-2540-AW : ecarte\nretenues : 0/3\n\n[Cas 3 — Sélection complète]\nTG-9420-AF : retient\nTG-9420-AK : retient\nTG-0020-AL : retient\nTG-6733-AC : ecarte\nretenues : 3/4"
  },
  {
    "id": "sq-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Le TOP 3 des prix : LIMIT après tri",
    "goal": "Trier par prix décroissant puis retenir les trois premières lignes.",
    "brief": "<p>Analysez chaque ligne proposée « immat prix », trie mentalement par prix décroissant (égalité : la ligne lue en premier reste devant) et retient les <strong>3 premiers</strong> — comme <code>ORDER BY pxachat DESC LIMIT 3</code>. Il Indiquez d’abord chaque ligne <code>immat : prix</code> triée (du plus cher au moins cher, tout le lot), puis <code>top3 : immat1,immat2,immat3</code>.</p>",
    "starter": "# Grille d'analyse (sq-c3-e3) — Le TOP 3 des prix : LIMIT après tri\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cinq voitures]\n# Données : 5\n# Données : TG-0001-AA 25000000\n# Données : TG-0002-AA 50000000\n# Données : TG-0003-AA 10000000\n# Données : TG-0004-AA 20000000\n# Données : TG-0005-AA 17000000\nA_COMPLETER\n\n[Cas 2 — Égalité de prix]\n# Données : 4\n# Données : TG-0001-AA 50000000\n# Données : TG-0002-AA 50000000\n# Données : TG-0003-AA 6000000\n# Données : TG-0004-AA 20000000\nA_COMPLETER\n\n[Cas 3 — Ordre déjà trié]\n# Données : 3\n# Données : TG-0001-AA 50000000\n# Données : TG-0002-AA 25000000\n# Données : TG-0003-AA 10000000\nA_COMPLETER\n",
    "hints": [
      "Tri par sélection : à chaque tour, chercher le plus grand prix restant et l’échanger avec la position courante.",
      "L’échange ne se fait que si le prix est STRICTEMENT supérieur : l’égalité conserve l’ordre de lecture."
    ],
    "examples": [
      {
        "stdin": "3\nTG-0001-AA 25000000\nTG-0002-AA 50000000\nTG-0003-AA 10000000\n",
        "expected": "TG-0002-AA : 50000000\nTG-0001-AA : 25000000\nTG-0003-AA : 10000000\ntop3 : TG-0002-AA,TG-0001-AA,TG-0003-AA"
      }
    ],
    "tests": [
      {
        "label": "Cinq voitures",
        "stdin": "cas:1",
        "expected": "TG-0002-AA : 50000000\nTG-0001-AA : 25000000\nTG-0004-AA : 20000000\nTG-0005-AA : 17000000\nTG-0003-AA : 10000000\ntop3 : TG-0002-AA,TG-0001-AA,TG-0004-AA"
      },
      {
        "label": "Égalité de prix",
        "stdin": "cas:2",
        "expected": "TG-0001-AA : 50000000\nTG-0002-AA : 50000000\nTG-0004-AA : 20000000\nTG-0003-AA : 6000000\ntop3 : TG-0001-AA,TG-0002-AA,TG-0004-AA"
      },
      {
        "label": "Ordre déjà trié",
        "stdin": "cas:3",
        "expected": "TG-0001-AA : 50000000\nTG-0002-AA : 25000000\nTG-0003-AA : 10000000\ntop3 : TG-0001-AA,TG-0002-AA,TG-0003-AA"
      }
    ],
    "solution": "[Exemple]\nTG-0002-AA : 50000000\nTG-0001-AA : 25000000\nTG-0003-AA : 10000000\ntop3 : TG-0002-AA,TG-0001-AA,TG-0003-AA\n\n[Cas 1 — Cinq voitures]\nTG-0002-AA : 50000000\nTG-0001-AA : 25000000\nTG-0004-AA : 20000000\nTG-0005-AA : 17000000\nTG-0003-AA : 10000000\ntop3 : TG-0002-AA,TG-0001-AA,TG-0004-AA\n\n[Cas 2 — Égalité de prix]\nTG-0001-AA : 50000000\nTG-0002-AA : 50000000\nTG-0004-AA : 20000000\nTG-0003-AA : 6000000\ntop3 : TG-0001-AA,TG-0002-AA,TG-0004-AA\n\n[Cas 3 — Ordre déjà trié]\nTG-0001-AA : 50000000\nTG-0002-AA : 25000000\nTG-0003-AA : 10000000\ntop3 : TG-0001-AA,TG-0002-AA,TG-0003-AA"
  },
  {
    "id": "sq-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Jointure ou pas ?",
    "goal": "Décider quelle jointure porte chaque besoin du rapport.",
    "brief": "<p>Analysez chaque ligne proposée « besoin jointure » : jointure est un code parmi <code>inner</code>, <code>left</code> ou <code>aucune</code>. Règles du cours : les deux tables ont des lignes correspondantes → <code>inner</code> ; garder toutes les lignes de gauche même sans correspondance → <code>left</code> ; une seule table suffit → <code>aucune</code>. Pour chaque ligne il Indiquez <code>besoin : OK</code> ou <code>besoin : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c4-e1) — Jointure ou pas ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les trois cas]\n# Données : 3\n# Données : rapprochement inner\n# Données : complets left\n# Données : une_table aucune\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : rapprochement left\n# Données : complets inner\n# Données : une_table inner\n# Données : complets left\nA_COMPLETER\n\n[Cas 3 — Rapport du parc]\n# Données : 5\n# Données : complets left\n# Données : rapprochement inner\n# Données : une_table aucune\n# Données : rapprochement inner\n# Données : complets left\nA_COMPLETER\n",
    "hints": [
      "Un case sur le besoin : rapprochement → inner, complets → left, une_table → aucune.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\ncomplets left\nrapprochement inner\nune_table aucune\n",
        "expected": "complets : OK\nrapprochement : OK\nune_table : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les trois cas",
        "stdin": "cas:1",
        "expected": "rapprochement : OK\ncomplets : OK\nune_table : OK\ncorrects : 3/3"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "rapprochement : ERREUR\ncomplets : ERREUR\nune_table : ERREUR\ncomplets : OK\ncorrects : 1/4"
      },
      {
        "label": "Rapport du parc",
        "stdin": "cas:3",
        "expected": "complets : OK\nrapprochement : OK\nune_table : OK\nrapprochement : OK\ncomplets : OK\ncorrects : 5/5"
      }
    ],
    "solution": "[Exemple]\ncomplets : OK\nrapprochement : OK\nune_table : OK\ncorrects : 3/3\n\n[Cas 1 — Les trois cas]\nrapprochement : OK\ncomplets : OK\nune_table : OK\ncorrects : 3/3\n\n[Cas 2 — Trois confusions]\nrapprochement : ERREUR\ncomplets : ERREUR\nune_table : ERREUR\ncomplets : OK\ncorrects : 1/4\n\n[Cas 3 — Rapport du parc]\ncomplets : OK\nrapprochement : OK\nune_table : OK\nrapprochement : OK\ncomplets : OK\ncorrects : 5/5"
  },
  {
    "id": "sq-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Marque et voitures : la jointure pas à pas",
    "goal": "Rapprocher chaque voiture de sa marque et signaler les orphelines.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Il rejoue <code>FROM Voiture JOIN Marque ON Voiture.marque = Marque.code</code> : pour chaque voiture, si son code existe dans Marque, il Indiquez <code>immat : marque</code> (jointure INNER réussie) et compte la marque ; sinon il Indiquez <code>immat : orpheline</code> (LEFT JOIN sans correspondance). À la fin il Indiquez <code>orinelles : X/n</code> puis une ligne <code>code : voitures</code> pour chaque marque dont le compteur vaut au moins 1, dans l’ordre de lecture de Marque.</p>",
    "starter": "# Grille d'analyse (sq-c4-e2) — Marque et voitures : la jointure pas à pas\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une orpheline]\n# Données : 2\n# Données : TOY\n# Données : BMW\n# Données : 3\n# Données : TG-3733-AC TOY\n# Données : TG-0099-ZZ FIAT\n# Données : TG-0480-AV BMW\nA_COMPLETER\n\n[Cas 2 — Plusieurs voitures par marque]\n# Données : 2\n# Données : TOY\n# Données : KIA\n# Données : 4\n# Données : TG-3733-AC TOY\n# Données : TG-9420-AF TOY\n# Données : TG-2540-AW KIA\n# Données : TG-9420-AK TOY\nA_COMPLETER\n\n[Cas 3 — Marque jamais servie]\n# Données : 3\n# Données : TOY\n# Données : MG\n# Données : REN\n# Données : 2\n# Données : TG-2222-BC REN\n# Données : TG-0099-ZZ FIAT\nA_COMPLETER\n",
    "hints": [
      "Test de correspondance : [ -n \"${compte[$marque]+x}\" ] dit si le code existe dans Marque.",
      "Les bilans sortent après les deux boucles : d’abord orphelines, puis les marques dans l’ordre de lecture."
    ],
    "examples": [
      {
        "stdin": "2\nTOY\nBMW\n2\nTG-3733-AC TOY\nTG-5420-AL BMW\n",
        "expected": "TG-3733-AC : TOY\nTG-5420-AL : BMW\norphelines : 0/2\nTOY : 1\nBMW : 1"
      }
    ],
    "tests": [
      {
        "label": "Une orpheline",
        "stdin": "cas:1",
        "expected": "TG-3733-AC : TOY\nTG-0099-ZZ : orpheline\nTG-0480-AV : BMW\norphelines : 1/3\nTOY : 1\nBMW : 1"
      },
      {
        "label": "Plusieurs voitures par marque",
        "stdin": "cas:2",
        "expected": "TG-3733-AC : TOY\nTG-9420-AF : TOY\nTG-2540-AW : KIA\nTG-9420-AK : TOY\norphelines : 0/4\nTOY : 3\nKIA : 1"
      },
      {
        "label": "Marque jamais servie",
        "stdin": "cas:3",
        "expected": "TG-2222-BC : REN\nTG-0099-ZZ : orpheline\norphelines : 1/2\nREN : 1"
      }
    ],
    "solution": "[Exemple]\nTG-3733-AC : TOY\nTG-5420-AL : BMW\norphelines : 0/2\nTOY : 1\nBMW : 1\n\n[Cas 1 — Une orpheline]\nTG-3733-AC : TOY\nTG-0099-ZZ : orpheline\nTG-0480-AV : BMW\norphelines : 1/3\nTOY : 1\nBMW : 1\n\n[Cas 2 — Plusieurs voitures par marque]\nTG-3733-AC : TOY\nTG-9420-AF : TOY\nTG-2540-AW : KIA\nTG-9420-AK : TOY\norphelines : 0/4\nTOY : 3\nKIA : 1\n\n[Cas 3 — Marque jamais servie]\nTG-2222-BC : REN\nTG-0099-ZZ : orpheline\norphelines : 1/2\nREN : 1"
  },
  {
    "id": "sq-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Catalogue croisé : jointure par pays",
    "goal": "Rapprocher chaque voiture de la marque au pays demandé, comme une jointure avec condition.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Il rejoue la jointure <code>Voiture JOIN Marque</code> : pour chaque voiture dont la marque appartient à un code de pays égal à cible, il Indiquez <code>immat : marque</code>, pour les autres <code>immat : hors cible</code>, puis <code>jointes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c4-e3) — Catalogue croisé : jointure par pays\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes du pays]\n# Données : 1\n# Données : TOY JAPON\n# Données : JAPON\n# Données : 3\n# Données : TG-3733-AC TOY HYBRIDE\n# Données : TG-9420-AF TOY ESSENCE\n# Données : TG-0020-AL TOY DIESEL\nA_COMPLETER\n\n[Cas 2 — Marque absente de Marque]\n# Données : 1\n# Données : TOY JAPON\n# Données : JAPON\n# Données : 2\n# Données : TG-0099-ZZ FIAT ESSENCE\n# Données : TG-3733-AC TOY HYBRIDE\nA_COMPLETER\n\n[Cas 3 — Cible sans voiture]\n# Données : 2\n# Données : TOY JAPON\n# Données : REN FRANCE\n# Données : ALLEMAGNE\n# Données : 2\n# Données : TG-3733-AC TOY HYBRIDE\n# Données : TG-2222-BC REN DIESEL\nA_COMPLETER\n",
    "hints": [
      "Le pays d’une marque : ${payscode[$marque]} — absent si le code n’est pas dans Marque.",
      "Une jointure réussie exige un code connu ET un pays égal à la cible."
    ],
    "examples": [
      {
        "stdin": "2\nTOY JAPON\nBMW ALLEMAGNE\nJAPON\n3\nTG-3733-AC TOY DIESEL\nTG-5420-AL BMW ESSENCE\nTG-2222-BC REN DIESEL\n",
        "expected": "TG-3733-AC : TOY\nTG-5420-AL : hors cible\nTG-2222-BC : hors cible\njointes : 1/3"
      }
    ],
    "tests": [
      {
        "label": "Toutes du pays",
        "stdin": "cas:1",
        "expected": "TG-3733-AC : TOY\nTG-9420-AF : TOY\nTG-0020-AL : TOY\njointes : 3/3"
      },
      {
        "label": "Marque absente de Marque",
        "stdin": "cas:2",
        "expected": "TG-0099-ZZ : hors cible\nTG-3733-AC : TOY\njointes : 1/2"
      },
      {
        "label": "Cible sans voiture",
        "stdin": "cas:3",
        "expected": "TG-3733-AC : hors cible\nTG-2222-BC : hors cible\njointes : 0/2"
      }
    ],
    "solution": "[Exemple]\nTG-3733-AC : TOY\nTG-5420-AL : hors cible\nTG-2222-BC : hors cible\njointes : 1/3\n\n[Cas 1 — Toutes du pays]\nTG-3733-AC : TOY\nTG-9420-AF : TOY\nTG-0020-AL : TOY\njointes : 3/3\n\n[Cas 2 — Marque absente de Marque]\nTG-0099-ZZ : hors cible\nTG-3733-AC : TOY\njointes : 1/2\n\n[Cas 3 — Cible sans voiture]\nTG-3733-AC : hors cible\nTG-2222-BC : hors cible\njointes : 0/2"
  },
  {
    "id": "sq-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les cinq agrégats",
    "goal": "Associer chaque agrégat à son rôle.",
    "brief": "<p>Analysez chaque ligne proposée « agrégat role » : role est un code parmi <code>compte</code>, <code>somme</code>, <code>moyenne</code>, <code>min</code> ou <code>max</code>. Rôles du cours : COUNT compte les lignes → <code>compte</code> ; SUM additionne → <code>somme</code> ; AVG fait la moyenne → <code>moyenne</code> ; MIN donne la plus petite valeur → <code>min</code> ; MAX la plus grande → <code>max</code>. Pour chaque ligne il Indiquez <code>agrégat : OK</code> ou <code>agrégat : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c5-e1) — Les cinq agrégats\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les cinq agrégats]\n# Données : 5\n# Données : count compte\n# Données : sum somme\n# Données : avg moyenne\n# Données : min min\n# Données : max max\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : count somme\n# Données : avg compte\n# Données : min max\n# Données : max max\nA_COMPLETER\n\n[Cas 3 — Fiche de révision]\n# Données : 5\n# Données : max max\n# Données : min min\n# Données : avg moyenne\n# Données : sum somme\n# Données : count compte\nA_COMPLETER\n",
    "hints": [
      "Un case sur l’agrégat : count → compte, sum → somme, avg → moyenne, min → min, max → max.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\ncount compte\nsum somme\nmax max\n",
        "expected": "count : OK\nsum : OK\nmax : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les cinq agrégats",
        "stdin": "cas:1",
        "expected": "count : OK\nsum : OK\navg : OK\nmin : OK\nmax : OK\ncorrects : 5/5"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "count : ERREUR\navg : ERREUR\nmin : ERREUR\nmax : OK\ncorrects : 1/4"
      },
      {
        "label": "Fiche de révision",
        "stdin": "cas:3",
        "expected": "max : OK\nmin : OK\navg : OK\nsum : OK\ncount : OK\ncorrects : 5/5"
      }
    ],
    "solution": "[Exemple]\ncount : OK\nsum : OK\nmax : OK\ncorrects : 3/3\n\n[Cas 1 — Les cinq agrégats]\ncount : OK\nsum : OK\navg : OK\nmin : OK\nmax : OK\ncorrects : 5/5\n\n[Cas 2 — Trois confusions]\ncount : ERREUR\navg : ERREUR\nmin : ERREUR\nmax : OK\ncorrects : 1/4\n\n[Cas 3 — Fiche de révision]\nmax : OK\nmin : OK\navg : OK\nsum : OK\ncount : OK\ncorrects : 5/5"
  },
  {
    "id": "sq-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Comptage par marque : GROUP BY",
    "goal": "Reproduire COUNT(*) GROUP BY marque avec les bilans du cours.",
    "brief": "<p>Analysez chaque ligne proposée « immat marque » (23 voitures au support). Pour chaque ligne il Indiquez <code>immat : marque</code>, puis une ligne <code>marque : X</code> par marque présente <strong>dans l’ordre de première apparition</strong> avec son compte — c’est <code>SELECT marque, COUNT(*) GROUP BY marque</code> — et enfin <code>marques : X</code> (nombre de groupes).</p>",
    "starter": "# Grille d'analyse (sq-c5-e2) — Comptage par marque : GROUP BY\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Parc réduit]\n# Données : 4\n# Données : TG-7854-Z BNZ\n# Données : TG-3733-AC TOY\n# Données : TG-6733-AC BNZ\n# Données : TG-9420-AK TOY\nA_COMPLETER\n\n[Cas 2 — Six voitures du support]\n# Données : 6\n# Données : TG-9420-AF TOY\n# Données : TG-5420-AF SUZ\n# Données : TG-1200-AK SUZ\n# Données : TG-0020-AL TOY\n# Données : TG-4444-AL HYU\n# Données : TG-5420-AL BMW\nA_COMPLETER\n\n[Cas 3 — Une seule marque]\n# Données : 3\n# Données : TG-2222-BC REN\n# Données : TG-2222-BC REN\n# Données : TG-2222-BC REN\nA_COMPLETER\n",
    "hints": [
      "Nouvelle marque : [ -z \"${compte[$marque]+x}\" ] → ordre[$g]=$marque et g=$((g+1)).",
      "Les bilans sortent après la boucle : marques dans l’ordre du tableau ordre, puis g."
    ],
    "examples": [
      {
        "stdin": "3\nTG-3733-AC TOY\nTG-5420-AL BMW\nTG-9420-AF TOY\n",
        "expected": "TG-3733-AC : TOY\nTG-5420-AL : BMW\nTG-9420-AF : TOY\nTOY : 2\nBMW : 1\nmarques : 2"
      }
    ],
    "tests": [
      {
        "label": "Parc réduit",
        "stdin": "cas:1",
        "expected": "TG-7854-Z : BNZ\nTG-3733-AC : TOY\nTG-6733-AC : BNZ\nTG-9420-AK : TOY\nBNZ : 2\nTOY : 2\nmarques : 2"
      },
      {
        "label": "Six voitures du support",
        "stdin": "cas:2",
        "expected": "TG-9420-AF : TOY\nTG-5420-AF : SUZ\nTG-1200-AK : SUZ\nTG-0020-AL : TOY\nTG-4444-AL : HYU\nTG-5420-AL : BMW\nTOY : 2\nSUZ : 2\nHYU : 1\nBMW : 1\nmarques : 4"
      },
      {
        "label": "Une seule marque",
        "stdin": "cas:3",
        "expected": "TG-2222-BC : REN\nTG-2222-BC : REN\nTG-2222-BC : REN\nREN : 3\nmarques : 1"
      }
    ],
    "solution": "[Exemple]\nTG-3733-AC : TOY\nTG-5420-AL : BMW\nTG-9420-AF : TOY\nTOY : 2\nBMW : 1\nmarques : 2\n\n[Cas 1 — Parc réduit]\nTG-7854-Z : BNZ\nTG-3733-AC : TOY\nTG-6733-AC : BNZ\nTG-9420-AK : TOY\nBNZ : 2\nTOY : 2\nmarques : 2\n\n[Cas 2 — Six voitures du support]\nTG-9420-AF : TOY\nTG-5420-AF : SUZ\nTG-1200-AK : SUZ\nTG-0020-AL : TOY\nTG-4444-AL : HYU\nTG-5420-AL : BMW\nTOY : 2\nSUZ : 2\nHYU : 1\nBMW : 1\nmarques : 4\n\n[Cas 3 — Une seule marque]\nTG-2222-BC : REN\nTG-2222-BC : REN\nTG-2222-BC : REN\nREN : 3\nmarques : 1"
  },
  {
    "id": "sq-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Analyse complète du parc : HAVING",
    "goal": "Grouper par moteur, appliquer SUM et AVG, puis filtrer les groupes avec HAVING.",
    "brief": "<p>Analysez chaque ligne proposée « immat moteur prix » puis une ligne <code>seuil</code>. Il rejoue <code>SELECT moteur, SUM(pxachat), AVG(pxachat) GROUP BY moteur HAVING SUM(pxachat) &gt;= seuil</code> : après les lignes, il Indiquez pour chaque moteur <strong>dans l’ordre de première apparition</strong> et dont la somme des prix atteint le seuil <code>moteur : somme=X moyenne=Y</code> (moyenne arrondie à l’entier inférieur), puis <code>groupes : X</code>.</p>",
    "starter": "# Grille d'analyse (sq-c5-e3) — Analyse complète du parc : HAVING\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Seuil intermédiaire]\n# Données : 4\n# Données : TG-0001-AA DIESEL 15000000\n# Données : TG-0002-AA ESSENCE 50000000\n# Données : TG-0003-AA DIESEL 10000000\n# Données : TG-0004-AA HYBRIDE 25000000\n# Données : 50000000\nA_COMPLETER\n\n[Cas 2 — Seuil exact : deux groupes]\n# Données : 3\n# Données : TG-0001-AA ESSENCE 10000000\n# Données : TG-0002-AA ESSENCE 20000000\n# Données : TG-0003-AA DIESEL 6000000\n# Données : 6000000\nA_COMPLETER\n\n[Cas 3 — Seuil élevé : aucun groupe]\n# Données : 2\n# Données : TG-0001-AA ELECTRIQUE 11600000\n# Données : TG-0002-AA ELECTRIQUE 21600000\n# Données : 100000000\nA_COMPLETER\n",
    "hints": [
      "La clause GROUP BY regroupe les enregistrements partageant la même modalité.",
      "La clause HAVING filtre les groupes formés en évaluant une condition sur une fonction d’agrégation (SUM, AVG, COUNT)."
    ],
    "examples": [
      {
        "stdin": "3\nTG-0001-AA DIESEL 15000000\nTG-0002-AA DIESEL 25000000\nTG-0003-AA ESSENCE 10000000\n40000000\n",
        "expected": "DIESEL : somme=40000000 moyenne=20000000\ngroupes : 1"
      }
    ],
    "tests": [
      {
        "label": "Seuil intermédiaire",
        "stdin": "cas:1",
        "expected": "ESSENCE : somme=50000000 moyenne=50000000\ngroupes : 1"
      },
      {
        "label": "Seuil exact : deux groupes",
        "stdin": "cas:2",
        "expected": "ESSENCE : somme=30000000 moyenne=15000000\nDIESEL : somme=6000000 moyenne=6000000\ngroupes : 2"
      },
      {
        "label": "Seuil élevé : aucun groupe",
        "stdin": "cas:3",
        "expected": "groupes : 0"
      }
    ],
    "solution": "[Exemple]\nDIESEL : somme=40000000 moyenne=20000000\ngroupes : 1\n\n[Cas 1 — Seuil intermédiaire]\nESSENCE : somme=50000000 moyenne=50000000\ngroupes : 1\n\n[Cas 2 — Seuil exact : deux groupes]\nESSENCE : somme=30000000 moyenne=15000000\nDIESEL : somme=6000000 moyenne=6000000\ngroupes : 2\n\n[Cas 3 — Seuil élevé : aucun groupe]\ngroupes : 0"
  },
  {
    "id": "sq-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "UPDATE, DELETE ou GRANT ?",
    "goal": "Associer chaque opération de fin de cours à sa famille.",
    "brief": "<p>Analysez chaque ligne proposée « operation famille » : famille est un code parmi <code>maj</code>, <code>suppression</code>, <code>structure</code> ou <code>droits</code>. Familles du chapitre : UPDATE → <code>maj</code> ; DELETE → <code>suppression</code> ; ALTER TABLE → <code>structure</code> ; GRANT et REVOKE → <code>droits</code>. Pour chaque ligne il Indiquez <code>operation : OK</code> ou <code>operation : ERREUR</code>, puis <code>corrects : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c6-e1) — UPDATE, DELETE ou GRANT ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les cinq opérations]\n# Données : 5\n# Données : update maj\n# Données : delete suppression\n# Données : alter structure\n# Données : grant droits\n# Données : revoke droits\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : update suppression\n# Données : delete maj\n# Données : alter droits\n# Données : grant droits\nA_COMPLETER\n\n[Cas 3 — Fiche mémo]\n# Données : 5\n# Données : revoke droits\n# Données : grant droits\n# Données : alter structure\n# Données : delete suppression\n# Données : update maj\nA_COMPLETER\n",
    "hints": [
      "Un case sur l’opération : update → maj, delete → suppression, alter → structure, grant/revoke → droits.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nupdate maj\ndelete suppression\ngrant droits\n",
        "expected": "update : OK\ndelete : OK\ngrant : OK\ncorrects : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les cinq opérations",
        "stdin": "cas:1",
        "expected": "update : OK\ndelete : OK\nalter : OK\ngrant : OK\nrevoke : OK\ncorrects : 5/5"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "update : ERREUR\ndelete : ERREUR\nalter : ERREUR\ngrant : OK\ncorrects : 1/4"
      },
      {
        "label": "Fiche mémo",
        "stdin": "cas:3",
        "expected": "revoke : OK\ngrant : OK\nalter : OK\ndelete : OK\nupdate : OK\ncorrects : 5/5"
      }
    ],
    "solution": "[Exemple]\nupdate : OK\ndelete : OK\ngrant : OK\ncorrects : 3/3\n\n[Cas 1 — Les cinq opérations]\nupdate : OK\ndelete : OK\nalter : OK\ngrant : OK\nrevoke : OK\ncorrects : 5/5\n\n[Cas 2 — Trois confusions]\nupdate : ERREUR\ndelete : ERREUR\nalter : ERREUR\ngrant : OK\ncorrects : 1/4\n\n[Cas 3 — Fiche mémo]\nrevoke : OK\ngrant : OK\nalter : OK\ndelete : OK\nupdate : OK\ncorrects : 5/5"
  },
  {
    "id": "sq-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "UPDATE ciblé : condition WHERE obligatoire",
    "goal": "Appliquer une hausse de prix uniquement aux voitures du moteur demandé.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Il rejoue <code>UPDATE Voiture SET pxachat = pxachat * (100 + hausse) / 100 WHERE moteur = moteur</code> : pour chaque voiture du moteur demandé il Indiquez <code>immat : ancien -&gt; nouveau</code> (prix recalculé, arrondi à l’entier inférieur), pour les autres <code>immat : inchangé</code>, puis <code>lignes modifiees : X</code> — le nombre que renverrait l’UPDATE.</p>",
    "starter": "# Grille d'analyse (sq-c6-e2) — UPDATE ciblé : condition WHERE obligatoire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Hausse zéro]\n# Données : 3\n# Données : TG-0001-AA DIESEL 20000000\n# Données : TG-0002-AA ESSENCE 10000000\n# Données : TG-0003-AA DIESEL 15000000\n# Données : DIESEL 0\nA_COMPLETER\n\n[Cas 2 — Baisse de 20 %]\n# Données : 3\n# Données : TG-0001-AA HYBRIDE 25000000\n# Données : TG-0002-AA HYBRIDE 20000000\n# Données : TG-0003-AA DIESEL 15000000\n# Données : HYBRIDE -20\nA_COMPLETER\n\n[Cas 3 — Moteur absent du lot]\n# Données : 3\n# Données : TG-0001-AA DIESEL 20000000\n# Données : TG-0002-AA ESSENCE 10000000\n# Données : TG-0003-AA DIESEL 15000000\n# Données : ELECTRIQUE 5\nA_COMPLETER\n",
    "hints": [
      "Nouveau prix : $(( prix * (100 + hausse) / 100 )) — la division entière tronque, c’est l’arrondi demandé.",
      "Le compteur ne progresse que pour les lignes réellement modifiées : c’est le « X rows affected »."
    ],
    "examples": [
      {
        "stdin": "3\nTG-0001-AA DIESEL 20000000\nTG-0002-AA ESSENCE 10000000\nTG-0003-AA DIESEL 15000000\nDIESEL 10\n",
        "expected": "TG-0001-AA : 20000000 -> 22000000\nTG-0002-AA : inchangé\nTG-0003-AA : 15000000 -> 16500000\nlignes modifiees : 2"
      }
    ],
    "tests": [
      {
        "label": "Hausse zéro",
        "stdin": "cas:1",
        "expected": "TG-0001-AA : 20000000 -> 20000000\nTG-0002-AA : inchangé\nTG-0003-AA : 15000000 -> 15000000\nlignes modifiees : 2"
      },
      {
        "label": "Baisse de 20 %",
        "stdin": "cas:2",
        "expected": "TG-0001-AA : 25000000 -> 20000000\nTG-0002-AA : 20000000 -> 16000000\nTG-0003-AA : inchangé\nlignes modifiees : 2"
      },
      {
        "label": "Moteur absent du lot",
        "stdin": "cas:3",
        "expected": "TG-0001-AA : inchangé\nTG-0002-AA : inchangé\nTG-0003-AA : inchangé\nlignes modifiees : 0"
      }
    ],
    "solution": "[Exemple]\nTG-0001-AA : 20000000 -> 22000000\nTG-0002-AA : inchangé\nTG-0003-AA : 15000000 -> 16500000\nlignes modifiees : 2\n\n[Cas 1 — Hausse zéro]\nTG-0001-AA : 20000000 -> 20000000\nTG-0002-AA : inchangé\nTG-0003-AA : 15000000 -> 15000000\nlignes modifiees : 2\n\n[Cas 2 — Baisse de 20 %]\nTG-0001-AA : 25000000 -> 20000000\nTG-0002-AA : 20000000 -> 16000000\nTG-0003-AA : inchangé\nlignes modifiees : 2\n\n[Cas 3 — Moteur absent du lot]\nTG-0001-AA : inchangé\nTG-0002-AA : inchangé\nTG-0003-AA : inchangé\nlignes modifiees : 0"
  },
  {
    "id": "sq-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le journal d’administration : audit de session",
    "goal": "Vérifier les autorisations avant chaque opération, comme GRANT/REVOKE le décident.",
    "brief": "<p>Analysez chaque ligne proposée « role operation » : role est un code parmi <code>admin</code>, <code>ecriture</code> ou <code>lecture</code> ; operation est un code parmi <code>select</code>, <code>insert</code>, <code>update</code>, <code>delete</code> ou <code>grant</code>. Droits du cours : admin peut tout ; ecriture peut select, insert, update et delete ; lecture ne peut que select ; personne d’autre ne peut grant. Pour chaque ligne il Indiquez <code>role/operation : autorise</code> ou <code>role/operation : refuse</code>, puis <code>autorisations : X/n</code>.</p>",
    "starter": "# Grille d'analyse (sq-c6-e3) — Le journal d’administration : audit de session\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — La matrice complète]\n# Données : 6\n# Données : admin grant\n# Données : admin delete\n# Données : ecriture insert\n# Données : ecriture grant\n# Données : lecture select\n# Données : lecture update\nA_COMPLETER\n\n[Cas 2 — Revue de droits]\n# Données : 5\n# Données : lecture insert\n# Données : ecriture update\n# Données : ecriture select\n# Données : admin grant\n# Données : lecture grant\nA_COMPLETER\n\n[Cas 3 — Session mixte]\n# Données : 6\n# Données : ecriture delete\n# Données : lecture select\n# Données : admin update\n# Données : admin grant\n# Données : ecriture grant\n# Données : lecture delete\nA_COMPLETER\n",
    "hints": [
      "Un case sur le rôle qui fixe la liste des opérations permises : admin → toutes, ecriture → les quatre CRUD, lecture → select.",
      "grant est refusé à tout le monde sauf admin ; le bilan sort après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nadmin grant\nlecture select\necriture delete\n",
        "expected": "admin/grant : autorise\nlecture/select : autorise\necriture/delete : autorise\nautorisations : 3/3"
      }
    ],
    "tests": [
      {
        "label": "La matrice complète",
        "stdin": "cas:1",
        "expected": "admin/grant : autorise\nadmin/delete : autorise\necriture/insert : autorise\necriture/grant : refuse\nlecture/select : autorise\nlecture/update : refuse\nautorisations : 4/6"
      },
      {
        "label": "Revue de droits",
        "stdin": "cas:2",
        "expected": "lecture/insert : refuse\necriture/update : autorise\necriture/select : autorise\nadmin/grant : autorise\nlecture/grant : refuse\nautorisations : 3/5"
      },
      {
        "label": "Session mixte",
        "stdin": "cas:3",
        "expected": "ecriture/delete : autorise\nlecture/select : autorise\nadmin/update : autorise\nadmin/grant : autorise\necriture/grant : refuse\nlecture/delete : refuse\nautorisations : 4/6"
      }
    ],
    "solution": "[Exemple]\nadmin/grant : autorise\nlecture/select : autorise\necriture/delete : autorise\nautorisations : 3/3\n\n[Cas 1 — La matrice complète]\nadmin/grant : autorise\nadmin/delete : autorise\necriture/insert : autorise\necriture/grant : refuse\nlecture/select : autorise\nlecture/update : refuse\nautorisations : 4/6\n\n[Cas 2 — Revue de droits]\nlecture/insert : refuse\necriture/update : autorise\necriture/select : autorise\nadmin/grant : autorise\nlecture/grant : refuse\nautorisations : 3/5\n\n[Cas 3 — Session mixte]\necriture/delete : autorise\nlecture/select : autorise\nadmin/update : autorise\nadmin/grant : autorise\necriture/grant : refuse\nlecture/delete : refuse\nautorisations : 4/6"
  }
];
