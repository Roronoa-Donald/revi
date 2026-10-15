/**
 * Catalogue des 18 exercices shell du cours « Bases de données & SQL » B1 :
 * la base parc_auto du support (Marque : 12 marques ; Voiture : 23 voitures),
 * manipulée en Bash pour faire tourner la logique des requêtes en réel.
 *
 * Chapitre 1 : bases de données et SGBD (fonctions, types, modèle relationnel).
 * Chapitre 2 : types de données et création de tables (CREATE TABLE, INSERT).
 * Chapitre 3 : interroger (SELECT, WHERE, DISTINCT, ORDER BY, LIMIT).
 * Chapitre 4 : jointures (INNER, LEFT, alias, colonnes préfixées).
 * Chapitre 5 : agrégation (COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING).
 * Chapitre 6 : modifier et protéger (UPDATE, DELETE, ALTER, privilèges).
 *
 * Conventions : language 'shell', ids 'sq-cN-eM', niveaux n1/n2/n3, entrées
 * stdin mono-mots terminées par \n, exemple distinct des tests cachés.
 */
'use strict';

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Bases de données et SGBD
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sq-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Le vocabulaire des bases de données',
    goal: 'Associer chaque terme du chapitre à sa définition exacte.',
    brief: '<p>Le script lit <strong>n lignes</strong> « terme definition » : definition est un code parmi ' +
      '<code>contenu</code>, <code>logiciel</code>, <code>langage</code> ou <code>modele</code>. Vocabulaire ' +
      'du chapitre : la <strong>base de données</strong> est le contenu organisé → <code>contenu</code> ; le ' +
      '<strong>SGBD</strong> est le logiciel qui la gère → <code>logiciel</code> ; <strong>SQL</strong> est le ' +
      'langage d’interrogation → <code>langage</code> ; le <strong>modèle relationnel</strong> organise les ' +
      'données en tables → <code>modele</code>. Pour chaque ligne il affiche <code>terme : OK</code> ou ' +
      '<code>terme : ERREUR</code>, puis <code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r terme definition
  # À compléter : la définition attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le terme : base → contenu, sgbd → logiciel, sql → langage, relationnel → modele.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nbase contenu\nsgbd logiciel\nsql langage\n', expected: 'base : OK\nsgbd : OK\nsql : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les quatre termes', stdin: '4\nbase contenu\nsgbd logiciel\nsql langage\nrelationnel modele\n', expected: 'base : OK\nsgbd : OK\nsql : OK\nrelationnel : OK\ncorrects : 4/4' },
      { label: 'Trois confusions', stdin: '4\nbase logiciel\nsgbd contenu\nsql modele\nrelationnel modele\n', expected: 'base : ERREUR\nsgbd : ERREUR\nsql : ERREUR\nrelationnel : OK\ncorrects : 1/4' },
      { label: 'Interro écrite', stdin: '5\nrelationnel modele\nsql langage\nbase contenu\nsgbd logiciel\nbase logiciel\n', expected: 'relationnel : OK\nsql : OK\nbase : OK\nsgbd : OK\nbase : ERREUR\ncorrects : 4/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r terme definition
  case "$terme" in
    base) attendu="contenu" ;;
    sgbd) attendu="logiciel" ;;
    sql) attendu="langage" ;;
    relationnel) attendu="modele" ;;
  esac
  if [ "$definition" = "$attendu" ]; then
    echo "$terme : OK"
    ok=$((ok + 1))
  else
    echo "$terme : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },
  {
    id: 'sq-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Les six fonctions d’une base',
    goal: 'Valider la fonction FIQSCP cochée pour chaque besoin exprimé.',
    brief: '<p>Le script lit <strong>n lignes</strong> « besoin fonction » : fonction est un code parmi ' +
      '<code>fiable</code>, <code>volumes</code>, <code>rapide</code>, <code>sur</code>, <code>coherent</code> ' +
      'ou <code>partage</code>. Besoins du cours : restituer l’information à l’identique → ' +
      '<code>fiable</code> ; absorber de grands volumes → <code>volumes</code> ; répondre vite → ' +
      '<code>rapide</code> ; autoriser selon l’utilisateur → <code>sur</code> ; rester conforme au modèle → ' +
      '<code>coherent</code> ; servir plusieurs applications et métiers → <code>partage</code>. Pour chaque ' +
      'ligne il affiche <code>besoin : OK</code> ou <code>besoin : ERREUR</code>, puis <code>corrects : ' +
      'X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r besoin fonction
  # À compléter : la fonction attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le besoin : restitution → fiable, masse → volumes, reponse → rapide, acces → sur, qualite → coherent, metiers → partage.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nrestitution fiable\nmasse volumes\nmetiers partage\n', expected: 'restitution : OK\nmasse : OK\nmetiers : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les six fonctions', stdin: '6\nrestitution fiable\nmasse volumes\nreponse rapide\nacces sur\nqualite coherent\nmetiers partage\n', expected: 'restitution : OK\nmasse : OK\nreponse : OK\nacces : OK\nqualite : OK\nmetiers : OK\ncorrects : 6/6' },
      { label: 'Trois confusions', stdin: '4\nrestitution rapide\nmasse fiable\nacces partage\nreponse rapide\n', expected: 'restitution : ERREUR\nmasse : ERREUR\nacces : ERREUR\nreponse : OK\ncorrects : 1/4' },
      { label: 'Support de cours', stdin: '5\nqualite coherent\nmetiers partage\nacces sur\nmasse volumes\nrestitution fiable\n', expected: 'qualite : OK\nmetiers : OK\nacces : OK\nmasse : OK\nrestitution : OK\ncorrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r besoin fonction
  case "$besoin" in
    restitution) attendu="fiable" ;;
    masse) attendu="volumes" ;;
    reponse) attendu="rapide" ;;
    acces) attendu="sur" ;;
    qualite) attendu="coherent" ;;
    metiers) attendu="partage" ;;
  esac
  if [ "$fonction" = "$attendu" ]; then
    echo "$besoin : OK"
    ok=$((ok + 1))
  else
    echo "$besoin : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },
  {
    id: 'sq-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Clé primaire ou clé étrangère ?',
    goal: 'Classer les contraintes de clés des tables Marque et Voiture.',
    brief: '<p>Le script lit <strong>n lignes</strong> « colonne role » : role est un code parmi ' +
      '<code>primaire</code>, <code>etrangere</code>, <code>attribut</code> ou <code>calcule</code>. ' +
      'Schéma du parc_auto : <code>codemarque</code> dans Marque → <code>primaire</code> ; ' +
      '<code>immat</code> dans Voiture → <code>primaire</code> ; <code>marque</code> dans Voiture (copie de ' +
      'codemarque) → <code>etrangere</code> ; <code>pxachat</code> dans Voiture → <code>attribut</code> ; ' +
      '<code>nb</code> issu d’un COUNT → <code>calcule</code>. Pour chaque ligne il affiche <code>colonne : ' +
      'OK</code> ou <code>colonne : ERREUR</code>, puis <code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r colonne role
  # À compléter : le rôle attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur la colonne : codemarque/immat → primaire, marque → etrangere, pxachat → attribut, nb → calcule.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\ncodemarque primaire\nimmat primaire\nmarque etrangere\n', expected: 'codemarque : OK\nimmat : OK\nmarque : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les cinq colonnes', stdin: '5\ncodemarque primaire\nimmat primaire\nmarque etrangere\npxachat attribut\nnb calcule\n', expected: 'codemarque : OK\nimmat : OK\nmarque : OK\npxachat : OK\nnb : OK\ncorrects : 5/5' },
      { label: 'Trois erreurs de rôle', stdin: '4\nmarque primaire\nimmat etrangere\nnb attribut\npxachat attribut\n', expected: 'marque : ERREUR\nimmat : ERREUR\nnb : ERREUR\npxachat : OK\ncorrects : 1/4' },
      { label: 'Schema du parc', stdin: '5\npxachat attribut\nnb calcule\nmarque etrangere\nimmat primaire\ncodemarque primaire\n', expected: 'pxachat : OK\nnb : OK\nmarque : OK\nimmat : OK\ncodemarque : OK\ncorrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r colonne role
  case "$colonne" in
    codemarque|immat) attendu="primaire" ;;
    marque) attendu="etrangere" ;;
    pxachat) attendu="attribut" ;;
    nb) attendu="calcule" ;;
  esac
  if [ "$role" = "$attendu" ]; then
    echo "$colonne : OK"
    ok=$((ok + 1))
  else
    echo "$colonne : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Types de données et création de tables
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sq-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Le type SQL de chaque colonne',
    goal: 'Valider le type du schéma parc_auto colonne par colonne.',
    brief: '<p>Le script lit <strong>n lignes</strong> « colonne type » : type est un code parmi ' +
      '<code>text</code>, <code>entier</code> ou <code>date</code>. Schéma du support : immat, marque, ' +
      'moteur et datecirc → <code>text</code> (datecirc stocké TEXT sous SQLite, format AAAA-MM-JJ qui se ' +
      'trie comme une chaîne) ; km, pxachat et nbreplace → <code>entier</code>. Pour chaque ligne il affiche ' +
      '<code>colonne : OK</code> ou <code>colonne : ERREUR</code>, puis <code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r colonne type
  # À compléter : le type attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur la colonne : immat/marque/moteur/datecirc → text, km/pxachat/nbreplace → entier.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nimmat text\nkm entier\npxachat entier\n', expected: 'immat : OK\nkm : OK\npxachat : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les sept colonnes', stdin: '7\nimmat text\nmarque text\nmoteur text\ndatecirc text\nkm entier\npxachat entier\nnbreplace entier\n', expected: 'immat : OK\nmarque : OK\nmoteur : OK\ndatecirc : OK\nkm : OK\npxachat : OK\nnbreplace : OK\ncorrects : 7/7' },
      { label: 'Trois erreurs de type', stdin: '4\nkm text\nimmat entier\nnbreplace text\ndatecirc text\n', expected: 'km : ERREUR\nimmat : ERREUR\nnbreplace : ERREUR\ndatecirc : OK\ncorrects : 1/4' },
      { label: 'Schema Voiture', stdin: '7\nnbreplace entier\ndatecirc text\npxachat entier\nmoteur text\nkm entier\nmarque text\nimmat text\n', expected: 'nbreplace : OK\ndatecirc : OK\npxachat : OK\nmoteur : OK\nkm : OK\nmarque : OK\nimmat : OK\ncorrects : 7/7' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r colonne type
  case "$colonne" in
    immat|marque|moteur|datecirc) attendu="text" ;;
    km|pxachat|nbreplace) attendu="entier" ;;
  esac
  if [ "$type" = "$attendu" ]; then
    echo "$colonne : OK"
    ok=$((ok + 1))
  else
    echo "$colonne : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },
  {
    id: 'sq-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'INSERT : ligne conforme ou rejetée ?',
    goal: 'Décider si une insertion respecte les contraintes NOT NULL et PRIMARY KEY.',
    brief: '<p>Le script lit <strong>n lignes</strong> « immat marque moteur km pxachat nbreplace ». ' +
      'Contraintes de Voiture : immat (clé primaire), marque et moteur (NOT NULL) obligatoires — la valeur ' +
      '<code>-</code> signifie absent ; km, pxachat et nbreplace, entiers. Règles de refus : clé primaire ' +
      'absente, marque ou moteur absent, valeur non numérique dans km/pxachat/nbreplace. Pour chaque ligne ' +
      'il affiche <code>immat : inseree</code> ou <code>immat : rejetee (raison)</code> avec raison = ' +
      '<code>cle</code>, <code>obligatoire</code> ou <code>type</code> (dans cet ordre de priorité), puis ' +
      '<code>insertions : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r immat marque moteur km pxachat nbreplace
  # À compléter : les trois contrôles dans l'ordre, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Contrôle 1 : immat = "-" → rejetee (cle). Contrôle 2 : marque = "-" ou moteur = "-" → rejetee (obligatoire).',
      'Contrôle 3 : case sur km, pxachat, nbreplace — tout motif contenant un caractère autre que 0-9 → rejetee (type).'
    ],
    examples: [
      { stdin: '2\nTG-1111-AA TOYOTA DIESEL 0 5000000 5\n- BMW ESSENCE 0 10000000 5\n', expected: 'TG-1111-AA : inseree\n- : rejetee (cle)\ninsertions : 1/2' }
    ],
    tests: [
      { label: 'Trois rejets distincts', stdin: '3\nTG-2222-AA RENAULT DIESEL 0 15000000 5\nTG-3333-AA - DIESEL 0 15000000 5\nTG-4444-AA PEUGEOT ESSENCE dix 15000000 5\n', expected: 'TG-2222-AA : inseree\nTG-3333-AA : rejetee (obligatoire)\nTG-4444-AA : rejetee (type)\ninsertions : 1/3' },
      { label: 'Lot du stage', stdin: '4\nTG-5555-AA KIA ESSENCE 0 50000000 7\nTG-6666-AA MG ESSENCE 0 20000000 5\nTG-7777-AA MAZDA ESSENCE - 17000000 5\nTG-8888-AA NISSAN ESSENCE 0 10000000 cinq\n', expected: 'TG-5555-AA : inseree\nTG-6666-AA : inseree\nTG-7777-AA : rejetee (type)\nTG-8888-AA : rejetee (type)\ninsertions : 2/4' },
      { label: 'Reprise du support', stdin: '3\nTG-9999-AA TOYOTA HYBRIDE 0 25000000 7\n- - - 0 0 0\nTG-1212-AA HYUNDAI ELECTRIQUE 0 23000000 5\n', expected: 'TG-9999-AA : inseree\n- : rejetee (cle)\nTG-1212-AA : inseree\ninsertions : 2/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r immat marque moteur km pxachat nbreplace
  if [ "$immat" = "-" ]; then
    echo "$immat : rejetee (cle)"
  elif [ "$marque" = "-" ] || [ "$moteur" = "-" ]; then
    echo "$immat : rejetee (obligatoire)"
  else
    valide=1
    for valeur in "$km" "$pxachat" "$nbreplace"; do
      case "$valeur" in
        -|*[!0-9]*) valide=0 ;;
      esac
    done
    if [ "$valide" = "1" ]; then
      echo "$immat : inseree"
      ok=$((ok + 1))
    else
      echo "$immat : rejetee (type)"
    fi
  fi
done
echo "insertions : $ok/$n"
`
  },
  {
    id: 'sq-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'L’ordre des clauses CREATE TABLE',
    goal: 'Valider l’ordre du cycle : CREATE TABLE, colonnes, INSERT.',
    brief: '<p>Le script lit <strong>4 lignes</strong> « etape objet » dans l’ordre d’exécution : le script ' +
      'vérifie que l’étape 1 est <code>create</code> (objet attendu <code>table</code>), l’étape 2 ' +
      '<code>colonne</code> (<code>type</code>), l’étape 3 <code>cle</code> (<code>primaire</code>) et ' +
      'l’étape 4 <code>insert</code> (<code>donnees</code>). Pour chaque ligne il affiche <code>etape N : ' +
      'OK</code> quand l’étape ET son objet sont justes, sinon <code>etape N : NON</code>, puis ' +
      '<code>etapes correctes : X/4</code>.</p>',
    starter: `for ((i=1; i<=4; i++)); do
  read -r etape objet
  # À compléter : l'objet attendu selon l'étape, les deux comparaisons, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le numéro : 1 → create/table, 2 → colonne/type, 3 → cle/primaire, 4 → insert/donnees.',
      'Les deux conditions doivent être vraies en même temps : etape ET objet.'
    ],
    examples: [
      { stdin: 'create table\ncolonne type\ncle primaire\ninsert donnees\n', expected: 'etape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netapes correctes : 4/4' }
    ],
    tests: [
      { label: 'Deux dernières inversées', stdin: 'create table\ncolonne type\ninsert donnees\ncle primaire\n', expected: 'etape 1 : OK\netape 2 : OK\netape 3 : NON\netape 4 : NON\netapes correctes : 2/4' },
      { label: 'Objets échangés', stdin: 'create type\ncolonne table\ncle primaire\ninsert donnees\n', expected: 'etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4' },
      { label: 'Ordre mélangé', stdin: 'colonne type\ncreate table\ncle primaire\ninsert donnees\n', expected: 'etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4' }
    ],
    solution: `ok=0
for ((i=1; i<=4; i++)); do
  read -r etape objet
  case "$i" in
    1) attendu_etape="create" ; attendu_objet="table" ;;
    2) attendu_etape="colonne" ; attendu_objet="type" ;;
    3) attendu_etape="cle" ; attendu_objet="primaire" ;;
    4) attendu_etape="insert" ; attendu_objet="donnees" ;;
  esac
  if [ "$etape" = "$attendu_etape" ] && [ "$objet" = "$attendu_objet" ]; then
    echo "etape $i : OK"
    ok=$((ok + 1))
  else
    echo "etape $i : NON"
  fi
done
echo "etapes correctes : $ok/4"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Interroger : SELECT, WHERE, tri et restrictions
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sq-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Clause ou mot-clé SQL ?',
    goal: 'Associer chaque mot du SELECT à sa famille.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mot famille » : famille est un code parmi ' +
      '<code>projection</code>, <code>filtrage</code>, <code>tri</code> ou <code>limite</code>. Vocabulaire ' +
      'du chapitre : SELECT et les colonnes affichées → <code>projection</code> ; WHERE et DISTINCT → ' +
      '<code>filtrage</code> ; ORDER BY → <code>tri</code> ; LIMIT → <code>limite</code>. Pour chaque ligne ' +
      'il affiche <code>mot : OK</code> ou <code>mot : ERREUR</code>, puis <code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r mot famille
  # À compléter : la famille attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le mot : select → projection, where/distinct → filtrage, order → tri, limit → limite.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nselect projection\nwhere filtrage\nlimit limite\n', expected: 'select : OK\nwhere : OK\nlimit : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les cinq mots', stdin: '5\nselect projection\nwhere filtrage\ndistinct filtrage\norder tri\nlimit limite\n', expected: 'select : OK\nwhere : OK\ndistinct : OK\norder : OK\nlimit : OK\ncorrects : 5/5' },
      { label: 'Trois confusions', stdin: '4\nwhere tri\nselect filtrage\norder limite\nlimit limite\n', expected: 'where : ERREUR\nselect : ERREUR\norder : ERREUR\nlimit : OK\ncorrects : 1/4' },
      { label: 'Requête complète', stdin: '5\nlimit limite\norder tri\ndistinct filtrage\nwhere filtrage\nselect projection\n', expected: 'limit : OK\norder : OK\ndistinct : OK\nwhere : OK\nselect : OK\ncorrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r mot famille
  case "$mot" in
    select) attendu="projection" ;;
    where|distinct) attendu="filtrage" ;;
    order) attendu="tri" ;;
    limit) attendu="limite" ;;
  esac
  if [ "$famille" = "$attendu" ]; then
    echo "$mot : OK"
    ok=$((ok + 1))
  else
    echo "$mot : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },
  {
    id: 'sq-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Diesels de luxe : filtrer le parc',
    goal: 'Appliquer un filtre WHERE à deux conditions avec comparaisons numériques.',
    brief: '<p>Le script lit <strong>n lignes</strong> « immat moteur prix » et rejoue la mission « Diesels ' +
      'de luxe » : afficher les voitures dont <code>moteur</code> vaut DIESEL et dont le prix dépasse 20 ' +
      'millions (strictement). Le nom de marque ne fait pas partie des données. Pour chaque voiture il affiche <code>immat : retient</code> si les deux ' +
      'conditions sont vraies, sinon <code>immat : ecarte</code>, puis <code>retenues : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r immat moteur prix
  # À compléter : les deux conditions, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Les deux conditions en ET : moteur = DIESEL et prix -gt 20000000.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nTG-9420-AF ESSENCE 50000000\nTG-6733-AC DIESEL 9600000\nTG-0020-AL DIESEL 50000000\n', expected: 'TG-9420-AF : ecarte\nTG-6733-AC : ecarte\nTG-0020-AL : retient\nretenues : 1/3' }
    ],
    tests: [
      { label: 'Moteur seul', stdin: '3\nTG-2222-BC DIESEL 15000000\nTG-7854-Z DIESEL 6000000\nTG-4444-BC DIESEL 30000000\n', expected: 'TG-2222-BC : ecarte\nTG-7854-Z : ecarte\nTG-4444-BC : retient\nretenues : 1/3' },
      { label: 'Prix seul', stdin: '3\nTG-9420-AF ESSENCE 50000000\nTG-5420-AL ESSENCE 50000000\nTG-2540-AW ESSENCE 50000000\n', expected: 'TG-9420-AF : ecarte\nTG-5420-AL : ecarte\nTG-2540-AW : ecarte\nretenues : 0/3' },
      { label: 'Sélection complète', stdin: '4\nTG-9420-AF DIESEL 50000000\nTG-9420-AK DIESEL 50000000\nTG-0020-AL DIESEL 50000000\nTG-6733-AC DIESEL 9600000\n', expected: 'TG-9420-AF : retient\nTG-9420-AK : retient\nTG-0020-AL : retient\nTG-6733-AC : ecarte\nretenues : 3/4' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r immat moteur prix
  if [ "$moteur" = "DIESEL" ] && [ "$prix" -gt 20000000 ]; then
    echo "$immat : retient"
    ok=$((ok + 1))
  else
    echo "$immat : ecarte"
  fi
done
echo "retenues : $ok/$n"
`
  },
  {
    id: 'sq-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Le TOP 3 des prix : LIMIT après tri',
    goal: 'Trier par prix décroissant puis retenir les trois premières lignes.',
    brief: '<p>Le script lit <strong>n lignes</strong> « immat prix », trie mentalement par prix ' +
      'décroissant (égalité : la ligne lue en premier reste devant) et retient les <strong>3 premiers</strong> ' +
      '— comme <code>ORDER BY pxachat DESC LIMIT 3</code>. Il affiche d’abord chaque ligne ' +
      '<code>immat : prix</code> triée (du plus cher au moins cher, tout le lot), puis <code>top3 : ' +
      'immat1,immat2,immat3</code>.</p>',
    starter: `read -r n
# À compléter : lecture dans des variables indexées immat_i et prix_i.
for ((i=0; i<n; i++)); do
  read -r immat prix
done
# À compléter : tri décroissant par prix (égalité : ordre de lecture conservé).
# À compléter : affichage du lot trié, puis du top 3.
`,
    hints: [
      'Tri par sélection : à chaque tour, chercher le plus grand prix restant et l’échanger avec la position courante.',
      'L’échange ne se fait que si le prix est STRICTEMENT supérieur : l’égalité conserve l’ordre de lecture.'
    ],
    examples: [
      { stdin: '3\nTG-0001-AA 25000000\nTG-0002-AA 50000000\nTG-0003-AA 10000000\n', expected: 'TG-0002-AA : 50000000\nTG-0001-AA : 25000000\nTG-0003-AA : 10000000\ntop3 : TG-0002-AA,TG-0001-AA,TG-0003-AA' }
    ],
    tests: [
      { label: 'Cinq voitures', stdin: '5\nTG-0001-AA 25000000\nTG-0002-AA 50000000\nTG-0003-AA 10000000\nTG-0004-AA 20000000\nTG-0005-AA 17000000\n', expected: 'TG-0002-AA : 50000000\nTG-0001-AA : 25000000\nTG-0004-AA : 20000000\nTG-0005-AA : 17000000\nTG-0003-AA : 10000000\ntop3 : TG-0002-AA,TG-0001-AA,TG-0004-AA' },
      { label: 'Égalité de prix', stdin: '4\nTG-0001-AA 50000000\nTG-0002-AA 50000000\nTG-0003-AA 6000000\nTG-0004-AA 20000000\n', expected: 'TG-0001-AA : 50000000\nTG-0002-AA : 50000000\nTG-0004-AA : 20000000\nTG-0003-AA : 6000000\ntop3 : TG-0001-AA,TG-0002-AA,TG-0004-AA' },
      { label: 'Ordre déjà trié', stdin: '3\nTG-0001-AA 50000000\nTG-0002-AA 25000000\nTG-0003-AA 10000000\n', expected: 'TG-0001-AA : 50000000\nTG-0002-AA : 25000000\nTG-0003-AA : 10000000\ntop3 : TG-0001-AA,TG-0002-AA,TG-0003-AA' }
    ],
    solution: `read -r n
declare -A immats
declare -A prixs
for ((i=0; i<n; i++)); do
  read -r immat prix
  immats[$i]=$immat
  prixs[$i]=$prix
done
for ((i=0; i<n-1; i++)); do
  for ((j=0; j<n-1-i; j++)); do
    if [ "\${prixs[$((j+1))]}" -gt "\${prixs[$j]}" ]; then
      tmp=\${prixs[$j]} ; prixs[$j]=\${prixs[$((j+1))]} ; prixs[$((j+1))]=$tmp
      tmp=\${immats[$j]} ; immats[$j]=\${immats[$((j+1))]} ; immats[$((j+1))]=$tmp
    fi
  done
done
for ((i=0; i<n; i++)); do
  echo "\${immats[$i]} : \${prixs[$i]}"
done
echo "top3 : \${immats[0]},\${immats[1]},\${immats[2]}"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Jointures : relier les tables
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sq-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Jointure ou pas ?',
    goal: 'Décider quelle jointure porte chaque besoin du rapport.',
    brief: '<p>Le script lit <strong>n lignes</strong> « besoin jointure » : jointure est un code parmi ' +
      '<code>inner</code>, <code>left</code> ou <code>aucune</code>. Règles du cours : les deux tables ont ' +
      'des lignes correspondantes → <code>inner</code> ; garder toutes les lignes de gauche même sans ' +
      'correspondance → <code>left</code> ; une seule table suffit → <code>aucune</code>. Pour chaque ligne ' +
      'il affiche <code>besoin : OK</code> ou <code>besoin : ERREUR</code>, puis <code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r besoin jointure
  # À compléter : la jointure attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le besoin : rapprochement → inner, complets → left, une_table → aucune.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\ncomplets left\nrapprochement inner\nune_table aucune\n', expected: 'complets : OK\nrapprochement : OK\nune_table : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les trois cas', stdin: '3\nrapprochement inner\ncomplets left\nune_table aucune\n', expected: 'rapprochement : OK\ncomplets : OK\nune_table : OK\ncorrects : 3/3' },
      { label: 'Trois confusions', stdin: '4\nrapprochement left\ncomplets inner\nune_table inner\ncomplets left\n', expected: 'rapprochement : ERREUR\ncomplets : ERREUR\nune_table : ERREUR\ncomplets : OK\ncorrects : 1/4' },
      { label: 'Rapport du parc', stdin: '5\ncomplets left\nrapprochement inner\nune_table aucune\nrapprochement inner\ncomplets left\n', expected: 'complets : OK\nrapprochement : OK\nune_table : OK\nrapprochement : OK\ncomplets : OK\ncorrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r besoin jointure
  case "$besoin" in
    rapprochement) attendu="inner" ;;
    complets) attendu="left" ;;
    une_table) attendu="aucune" ;;
  esac
  if [ "$jointure" = "$attendu" ]; then
    echo "$besoin : OK"
    ok=$((ok + 1))
  else
    echo "$besoin : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },
  {
    id: 'sq-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Marque et voitures : la jointure pas à pas',
    goal: 'Rapprocher chaque voiture de sa marque et signaler les orphelines.',
    brief: '<p>Le script lit d’abord <strong>m lignes</strong> « code marque » (la table Marque), puis ' +
      '<strong>n lignes</strong> « immat marque » (la table Voiture). Il rejoue <code>FROM Voiture JOIN ' +
      'Marque ON Voiture.marque = Marque.code</code> : pour chaque voiture, si son code existe dans Marque, ' +
      'il affiche <code>immat : marque</code> (jointure INNER réussie) et compte la marque ; sinon il ' +
      'affiche <code>immat : orpheline</code> (LEFT JOIN sans correspondance). À la fin il affiche ' +
      '<code>orinelles : X/n</code> puis une ligne <code>code : voitures</code> pour chaque marque dont le ' +
      'compteur vaut au moins 1, dans l’ordre de lecture de Marque.</p>',
    starter: `read -r m
declare -A compte
for ((i=0; i<m; i++)); do
  read -r code
  # À compléter : mémoriser la marque, compteur à 0.
done
read -r n
orphelines=0
for ((i=0; i<n; i++)); do
  read -r immat marque
  # À compléter : correspondance, compteur de marque, cas orphelin.
done
# À compléter : bilan orphelines + liste des marques servies.
`,
    hints: [
      'Test de correspondance : [ -n "\${compte[$marque]+x}" ] dit si le code existe dans Marque.',
      'Les bilans sortent après les deux boucles : d’abord orphelines, puis les marques dans l’ordre de lecture.'
    ],
    examples: [
      { stdin: '2\nTOY\nBMW\n2\nTG-3733-AC TOY\nTG-5420-AL BMW\n', expected: 'TG-3733-AC : TOY\nTG-5420-AL : BMW\norphelines : 0/2\nTOY : 1\nBMW : 1' }
    ],
    tests: [
      { label: 'Une orpheline', stdin: '2\nTOY\nBMW\n3\nTG-3733-AC TOY\nTG-0099-ZZ FIAT\nTG-0480-AV BMW\n', expected: 'TG-3733-AC : TOY\nTG-0099-ZZ : orpheline\nTG-0480-AV : BMW\norphelines : 1/3\nTOY : 1\nBMW : 1' },
      { label: 'Plusieurs voitures par marque', stdin: '2\nTOY\nKIA\n4\nTG-3733-AC TOY\nTG-9420-AF TOY\nTG-2540-AW KIA\nTG-9420-AK TOY\n', expected: 'TG-3733-AC : TOY\nTG-9420-AF : TOY\nTG-2540-AW : KIA\nTG-9420-AK : TOY\norphelines : 0/4\nTOY : 3\nKIA : 1' },
      { label: 'Marque jamais servie', stdin: '3\nTOY\nMG\nREN\n2\nTG-2222-BC REN\nTG-0099-ZZ FIAT\n', expected: 'TG-2222-BC : REN\nTG-0099-ZZ : orpheline\norphelines : 1/2\nREN : 1' }
    ],
    solution: `read -r m
declare -A compte
declare -A ordre
for ((i=0; i<m; i++)); do
  read -r code
  compte[$code]=0
  ordre[$i]=$code
done
read -r n
orphelines=0
for ((i=0; i<n; i++)); do
  read -r immat marque
  if [ -n "\${compte[$marque]+x}" ]; then
    echo "$immat : $marque"
    compte[$marque]=$((\${compte[$marque]} + 1))
  else
    echo "$immat : orpheline"
    orphelines=$((orphelines + 1))
  fi
done
echo "orphelines : $orphelines/$n"
for ((i=0; i<m; i++)); do
  code=\${ordre[$i]}
  if [ "\${compte[$code]}" -ge 1 ]; then
    echo "$code : \${compte[$code]}"
  fi
done
`
  },
  {
    id: 'sq-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'Catalogue croisé : jointure par pays',
    goal: 'Rapprocher chaque voiture de la marque au pays demandé, comme une jointure avec condition.',
    brief: '<p>Le script lit d’abord <strong>m lignes</strong> « code pays » (table Marque réduite), puis ' +
      'une ligne <code>cible</code> (pays recherché), enfin <strong>n lignes</strong> « immat marque ' +
      'moteur » (table Voiture réduite). Il rejoue la jointure <code>Voiture JOIN Marque</code> : pour ' +
      'chaque voiture dont la marque appartient à un code de pays égal à cible, il affiche <code>immat : ' +
      'marque</code>, pour les autres <code>immat : hors cible</code>, puis <code>jointes : X/n</code>.</p>',
    starter: `read -r m
declare -A payscode
for ((i=0; i<m; i++)); do
  read -r code p
  # À compléter : mémoriser le pays par code.
done
read -r cible
read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r immat marque moteur
  # À compléter : pays de la marque, comparaison à la cible, compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Le pays d’une marque : \${payscode[$marque]} — absent si le code n’est pas dans Marque.',
      'Une jointure réussie exige un code connu ET un pays égal à la cible.'
    ],
    examples: [
      { stdin: '2\nTOY JAPON\nBMW ALLEMAGNE\nJAPON\n3\nTG-3733-AC TOY DIESEL\nTG-5420-AL BMW ESSENCE\nTG-2222-BC REN DIESEL\n', expected: 'TG-3733-AC : TOY\nTG-5420-AL : hors cible\nTG-2222-BC : hors cible\njointes : 1/3' }
    ],
    tests: [
      { label: 'Toutes du pays', stdin: '1\nTOY JAPON\nJAPON\n3\nTG-3733-AC TOY HYBRIDE\nTG-9420-AF TOY ESSENCE\nTG-0020-AL TOY DIESEL\n', expected: 'TG-3733-AC : TOY\nTG-9420-AF : TOY\nTG-0020-AL : TOY\njointes : 3/3' },
      { label: 'Marque absente de Marque', stdin: '1\nTOY JAPON\nJAPON\n2\nTG-0099-ZZ FIAT ESSENCE\nTG-3733-AC TOY HYBRIDE\n', expected: 'TG-0099-ZZ : hors cible\nTG-3733-AC : TOY\njointes : 1/2' },
      { label: 'Cible sans voiture', stdin: '2\nTOY JAPON\nREN FRANCE\nALLEMAGNE\n2\nTG-3733-AC TOY HYBRIDE\nTG-2222-BC REN DIESEL\n', expected: 'TG-3733-AC : hors cible\nTG-2222-BC : hors cible\njointes : 0/2' }
    ],
    solution: `read -r m
declare -A payscode
for ((i=0; i<m; i++)); do
  read -r code p
  payscode[$code]=$p
done
read -r cible
read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r immat marque moteur
  code_pays="\${payscode[$marque]}"
  if [ -n "$code_pays" ] && [ "$code_pays" = "$cible" ]; then
    echo "$immat : $marque"
    ok=$((ok + 1))
  else
    echo "$immat : hors cible"
  fi
done
echo "jointes : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Agrégation : compter, regrouper, filtrer les groupes
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sq-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Les cinq agrégats',
    goal: 'Associer chaque agrégat à son rôle.',
    brief: '<p>Le script lit <strong>n lignes</strong> « agrégat role » : role est un code parmi ' +
      '<code>compte</code>, <code>somme</code>, <code>moyenne</code>, <code>min</code> ou ' +
      '<code>max</code>. Rôles du cours : COUNT compte les lignes → <code>compte</code> ; SUM additionne → ' +
      '<code>somme</code> ; AVG fait la moyenne → <code>moyenne</code> ; MIN donne la plus petite valeur → ' +
      '<code>min</code> ; MAX la plus grande → <code>max</code>. Pour chaque ligne il affiche <code>agrégat ' +
      ': OK</code> ou <code>agrégat : ERREUR</code>, puis <code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r agregat role
  # À compléter : le rôle attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur l’agrégat : count → compte, sum → somme, avg → moyenne, min → min, max → max.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\ncount compte\nsum somme\nmax max\n', expected: 'count : OK\nsum : OK\nmax : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les cinq agrégats', stdin: '5\ncount compte\nsum somme\navg moyenne\nmin min\nmax max\n', expected: 'count : OK\nsum : OK\navg : OK\nmin : OK\nmax : OK\ncorrects : 5/5' },
      { label: 'Trois confusions', stdin: '4\ncount somme\navg compte\nmin max\nmax max\n', expected: 'count : ERREUR\navg : ERREUR\nmin : ERREUR\nmax : OK\ncorrects : 1/4' },
      { label: 'Fiche de révision', stdin: '5\nmax max\nmin min\navg moyenne\nsum somme\ncount compte\n', expected: 'max : OK\nmin : OK\navg : OK\nsum : OK\ncount : OK\ncorrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r agregat role
  case "$agregat" in
    count) attendu="compte" ;;
    sum) attendu="somme" ;;
    avg) attendu="moyenne" ;;
    min) attendu="min" ;;
    max) attendu="max" ;;
  esac
  if [ "$role" = "$attendu" ]; then
    echo "$agregat : OK"
    ok=$((ok + 1))
  else
    echo "$agregat : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },
  {
    id: 'sq-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Comptage par marque : GROUP BY',
    goal: 'Reproduire COUNT(*) GROUP BY marque avec les bilans du cours.',
    brief: '<p>Le script lit <strong>n lignes</strong> « immat marque » (23 voitures au support). Pour ' +
      'chaque ligne il affiche <code>immat : marque</code>, puis une ligne <code>marque : X</code> par ' +
      'marque présente <strong>dans l’ordre de première apparition</strong> avec son compte — c’est ' +
      '<code>SELECT marque, COUNT(*) GROUP BY marque</code> — et enfin <code>marques : X</code> (nombre de ' +
      'groupes).</p>',
    starter: `read -r n
declare -A compte
declare -A ordre
g=0
for ((i=0; i<n; i++)); do
  read -r immat marque
  echo "$immat : $marque"
  # À compléter : nouvelle marque → enregistrer l'ordre ; compteur incrémenté.
done
# À compléter : bilans dans l'ordre d'apparition, puis nombre de groupes.
`,
    hints: [
      'Nouvelle marque : [ -z "\${compte[$marque]+x}" ] → ordre[$g]=$marque et g=$((g+1)).',
      'Les bilans sortent après la boucle : marques dans l’ordre du tableau ordre, puis g.'
    ],
    examples: [
      { stdin: '3\nTG-3733-AC TOY\nTG-5420-AL BMW\nTG-9420-AF TOY\n', expected: 'TG-3733-AC : TOY\nTG-5420-AL : BMW\nTG-9420-AF : TOY\nTOY : 2\nBMW : 1\nmarques : 2' }
    ],
    tests: [
      { label: 'Parc réduit', stdin: '4\nTG-7854-Z BNZ\nTG-3733-AC TOY\nTG-6733-AC BNZ\nTG-9420-AK TOY\n', expected: 'TG-7854-Z : BNZ\nTG-3733-AC : TOY\nTG-6733-AC : BNZ\nTG-9420-AK : TOY\nBNZ : 2\nTOY : 2\nmarques : 2' },
      { label: 'Six voitures du support', stdin: '6\nTG-9420-AF TOY\nTG-5420-AF SUZ\nTG-1200-AK SUZ\nTG-0020-AL TOY\nTG-4444-AL HYU\nTG-5420-AL BMW\n', expected: 'TG-9420-AF : TOY\nTG-5420-AF : SUZ\nTG-1200-AK : SUZ\nTG-0020-AL : TOY\nTG-4444-AL : HYU\nTG-5420-AL : BMW\nTOY : 2\nSUZ : 2\nHYU : 1\nBMW : 1\nmarques : 4' },
      { label: 'Une seule marque', stdin: '3\nTG-2222-BC REN\nTG-2222-BC REN\nTG-2222-BC REN\n', expected: 'TG-2222-BC : REN\nTG-2222-BC : REN\nTG-2222-BC : REN\nREN : 3\nmarques : 1' }
    ],
    solution: `read -r n
declare -A compte
declare -A ordre
g=0
for ((i=0; i<n; i++)); do
  read -r immat marque
  echo "$immat : $marque"
  if [ -z "\${compte[$marque]+x}" ]; then
    ordre[$g]=$marque
    g=$((g + 1))
  fi
  compte[$marque]=$((\${compte[$marque]:-0} + 1))
done
for ((i=0; i<g; i++)); do
  marque=\${ordre[$i]}
  echo "$marque : \${compte[$marque]}"
done
echo "marques : $g"
`
  },
  {
    id: 'sq-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Analyse complète du parc : HAVING',
    goal: 'Grouper par moteur, appliquer SUM et AVG, puis filtrer les groupes avec HAVING.',
    brief: '<p>Le script lit <strong>n lignes</strong> « immat moteur prix » puis une ligne <code>seuil</code>. ' +
      'Il rejoue <code>SELECT moteur, SUM(pxachat), AVG(pxachat) GROUP BY moteur HAVING SUM(pxachat) &gt;= ' +
      'seuil</code> : après les lignes, il affiche pour chaque moteur <strong>dans l’ordre de première ' +
      'apparition</strong> et dont la somme des prix atteint le seuil <code>moteur : somme=X moyenne=Y</code> ' +
      '(moyenne arrondie à l’entier inférieur), puis <code>groupes : X</code>.</p>',
    starter: `read -r n
declare -A somme
declare -A nb
declare -A ordre
g=0
for ((i=0; i<n; i++)); do
  read -r immat moteur prix
  # À compléter : groupe nouveau → ordre ; somme et effectif incrémentés.
done
read -r seuil
# À compléter : affichage des groupes filtrés par HAVING, moyenne entière.
`,
    hints: [
      'Division entière bash : $(( somme / nb )) tronque déjà vers zéro — pas d’outil externe.',
      'Le filtre HAVING porte sur la somme : sommer d’abord, afficher seulement les groupes à somme >= seuil.'
    ],
    examples: [
      { stdin: '3\nTG-0001-AA DIESEL 15000000\nTG-0002-AA DIESEL 25000000\nTG-0003-AA ESSENCE 10000000\n40000000\n', expected: 'DIESEL : somme=40000000 moyenne=20000000\ngroupes : 1' }
    ],
    tests: [
      { label: 'Seuil intermédiaire', stdin: '4\nTG-0001-AA DIESEL 15000000\nTG-0002-AA ESSENCE 50000000\nTG-0003-AA DIESEL 10000000\nTG-0004-AA HYBRIDE 25000000\n50000000\n', expected: 'ESSENCE : somme=50000000 moyenne=50000000\ngroupes : 1' },
      { label: 'Seuil exact : deux groupes', stdin: '3\nTG-0001-AA ESSENCE 10000000\nTG-0002-AA ESSENCE 20000000\nTG-0003-AA DIESEL 6000000\n6000000\n', expected: 'ESSENCE : somme=30000000 moyenne=15000000\nDIESEL : somme=6000000 moyenne=6000000\ngroupes : 2' },
      { label: 'Seuil élevé : aucun groupe', stdin: '2\nTG-0001-AA ELECTRIQUE 11600000\nTG-0002-AA ELECTRIQUE 21600000\n100000000\n', expected: 'groupes : 0' }
    ],
    solution: `read -r n
declare -A somme
declare -A nb
declare -A ordre
g=0
for ((i=0; i<n; i++)); do
  read -r immat moteur prix
  if [ -z "\${somme[$moteur]+x}" ]; then
    ordre[$g]=$moteur
    g=$((g + 1))
  fi
  somme[$moteur]=$((\${somme[$moteur]:-0} + prix))
  nb[$moteur]=$((\${nb[$moteur]:-0} + 1))
done
read -r seuil
passe=0
for ((i=0; i<g; i++)); do
  moteur=\${ordre[$i]}
  s=\${somme[$moteur]}
  if [ "$s" -ge "$seuil" ]; then
    echo "$moteur : somme=$s moyenne=$((s / \${nb[$moteur]}))"
    passe=$((passe + 1))
  fi
done
echo "groupes : $passe"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Modifier les données et gérer les droits
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sq-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'UPDATE, DELETE ou GRANT ?',
    goal: 'Associer chaque opération de fin de cours à sa famille.',
    brief: '<p>Le script lit <strong>n lignes</strong> « operation famille » : famille est un code parmi ' +
      '<code>maj</code>, <code>suppression</code>, <code>structure</code> ou <code>droits</code>. Familles ' +
      'du chapitre : UPDATE → <code>maj</code> ; DELETE → <code>suppression</code> ; ALTER TABLE → ' +
      '<code>structure</code> ; GRANT et REVOKE → <code>droits</code>. Pour chaque ligne il affiche ' +
      '<code>operation : OK</code> ou <code>operation : ERREUR</code>, puis <code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r operation famille
  # À compléter : la famille attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur l’opération : update → maj, delete → suppression, alter → structure, grant/revoke → droits.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nupdate maj\ndelete suppression\ngrant droits\n', expected: 'update : OK\ndelete : OK\ngrant : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les cinq opérations', stdin: '5\nupdate maj\ndelete suppression\nalter structure\ngrant droits\nrevoke droits\n', expected: 'update : OK\ndelete : OK\nalter : OK\ngrant : OK\nrevoke : OK\ncorrects : 5/5' },
      { label: 'Trois confusions', stdin: '4\nupdate suppression\ndelete maj\nalter droits\ngrant droits\n', expected: 'update : ERREUR\ndelete : ERREUR\nalter : ERREUR\ngrant : OK\ncorrects : 1/4' },
      { label: 'Fiche mémo', stdin: '5\nrevoke droits\ngrant droits\nalter structure\ndelete suppression\nupdate maj\n', expected: 'revoke : OK\ngrant : OK\nalter : OK\ndelete : OK\nupdate : OK\ncorrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r operation famille
  case "$operation" in
    update) attendu="maj" ;;
    delete) attendu="suppression" ;;
    alter) attendu="structure" ;;
    grant|revoke) attendu="droits" ;;
  esac
  if [ "$famille" = "$attendu" ]; then
    echo "$operation : OK"
    ok=$((ok + 1))
  else
    echo "$operation : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },
  {
    id: 'sq-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'UPDATE ciblé : condition WHERE obligatoire',
    goal: 'Appliquer une hausse de prix uniquement aux voitures du moteur demandé.',
    brief: '<p>Le script lit d’abord <strong>n lignes</strong> « immat moteur prix » (la table), puis une ' +
      'ligne <code>moteur hausse</code> — hausse en pourcentage entier. Il rejoue <code>UPDATE Voiture SET ' +
      'pxachat = pxachat * (100 + hausse) / 100 WHERE moteur = moteur</code> : pour chaque voiture du moteur ' +
      'demandé il affiche <code>immat : ancien -&gt; nouveau</code> (prix recalculé, arrondi à l’entier ' +
      'inférieur), pour les autres <code>immat : inchangé</code>, puis <code>lignes modifiees : X</code> — ' +
      'le nombre que renverrait l’UPDATE.</p>',
    starter: `read -r n
declare -A immats
declare -A moteurs
declare -A prixs
for ((i=0; i<n; i++)); do
  read -r immat moteur prix
  # À compléter : mémoriser la ligne.
done
read -r moteur hausse
# À compléter : parcours, recalcul conditionnel, compteur.
`,
    hints: [
      'Nouveau prix : $(( prix * (100 + hausse) / 100 )) — la division entière tronque, c’est l’arrondi demandé.',
      'Le compteur ne progresse que pour les lignes réellement modifiées : c’est le « X rows affected ».'
    ],
    examples: [
      { stdin: '3\nTG-0001-AA DIESEL 20000000\nTG-0002-AA ESSENCE 10000000\nTG-0003-AA DIESEL 15000000\nDIESEL 10\n', expected: 'TG-0001-AA : 20000000 -> 22000000\nTG-0002-AA : inchangé\nTG-0003-AA : 15000000 -> 16500000\nlignes modifiees : 2' }
    ],
    tests: [
      { label: 'Hausse zéro', stdin: '3\nTG-0001-AA DIESEL 20000000\nTG-0002-AA ESSENCE 10000000\nTG-0003-AA DIESEL 15000000\nDIESEL 0\n', expected: 'TG-0001-AA : 20000000 -> 20000000\nTG-0002-AA : inchangé\nTG-0003-AA : 15000000 -> 15000000\nlignes modifiees : 2' },
      { label: 'Baisse de 20 %', stdin: '3\nTG-0001-AA HYBRIDE 25000000\nTG-0002-AA HYBRIDE 20000000\nTG-0003-AA DIESEL 15000000\nHYBRIDE -20\n', expected: 'TG-0001-AA : 25000000 -> 20000000\nTG-0002-AA : 20000000 -> 16000000\nTG-0003-AA : inchangé\nlignes modifiees : 2' },
      { label: 'Moteur absent du lot', stdin: '3\nTG-0001-AA DIESEL 20000000\nTG-0002-AA ESSENCE 10000000\nTG-0003-AA DIESEL 15000000\nELECTRIQUE 5\n', expected: 'TG-0001-AA : inchangé\nTG-0002-AA : inchangé\nTG-0003-AA : inchangé\nlignes modifiees : 0' }
    ],
    solution: `read -r n
declare -A immats
declare -A moteurs
declare -A prixs
for ((i=0; i<n; i++)); do
  read -r immat moteur prix
  immats[$i]=$immat
  moteurs[$i]=$moteur
  prixs[$i]=$prix
done
read -r moteur hausse
modifiees=0
for ((i=0; i<n; i++)); do
  if [ "\${moteurs[$i]}" = "$moteur" ]; then
    nouveau=$((\${prixs[$i]} * (100 + hausse) / 100))
    echo "\${immats[$i]} : \${prixs[$i]} -> $nouveau"
    modifiees=$((modifiees + 1))
  else
    echo "\${immats[$i]} : inchangé"
  fi
done
echo "lignes modifiees : $modifiees"
`
  },
  {
    id: 'sq-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Le journal d’administration : audit de session',
    goal: 'Vérifier les autorisations avant chaque opération, comme GRANT/REVOKE le décident.',
    brief: '<p>Le script lit <strong>n lignes</strong> « role operation » : role est un code parmi ' +
      '<code>admin</code>, <code>ecriture</code> ou <code>lecture</code> ; operation est un code parmi ' +
      '<code>select</code>, <code>insert</code>, <code>update</code>, <code>delete</code> ou ' +
      '<code>grant</code>. Droits du cours : admin peut tout ; ecriture peut select, insert, update et ' +
      'delete ; lecture ne peut que select ; personne d’autre ne peut grant. Pour chaque ligne il affiche ' +
      '<code>role/operation : autorise</code> ou <code>role/operation : refuse</code>, puis ' +
      '<code>autorisations : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r role operation
  # À compléter : le droit selon le rôle, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le rôle qui fixe la liste des opérations permises : admin → toutes, ecriture → les quatre CRUD, lecture → select.',
      'grant est refusé à tout le monde sauf admin ; le bilan sort après la boucle.'
    ],
    examples: [
      { stdin: '3\nadmin grant\nlecture select\necriture delete\n', expected: 'admin/grant : autorise\nlecture/select : autorise\necriture/delete : autorise\nautorisations : 3/3' }
    ],
    tests: [
      { label: 'La matrice complète', stdin: '6\nadmin grant\nadmin delete\necriture insert\necriture grant\nlecture select\nlecture update\n', expected: 'admin/grant : autorise\nadmin/delete : autorise\necriture/insert : autorise\necriture/grant : refuse\nlecture/select : autorise\nlecture/update : refuse\nautorisations : 4/6' },
      { label: 'Revue de droits', stdin: '5\nlecture insert\necriture update\necriture select\nadmin grant\nlecture grant\n', expected: 'lecture/insert : refuse\necriture/update : autorise\necriture/select : autorise\nadmin/grant : autorise\nlecture/grant : refuse\nautorisations : 3/5' },
      { label: 'Session mixte', stdin: '6\necriture delete\nlecture select\nadmin update\nadmin grant\necriture grant\nlecture delete\n', expected: 'ecriture/delete : autorise\nlecture/select : autorise\nadmin/update : autorise\nadmin/grant : autorise\necriture/grant : refuse\nlecture/delete : refuse\nautorisations : 4/6' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r role operation
  case "$role" in
    admin) permis="select insert update delete grant" ;;
    ecriture) permis="select insert update delete" ;;
    lecture) permis="select" ;;
  esac
  if [[ " $permis " == *" $operation "* ]]; then
    echo "$role/$operation : autorise"
    ok=$((ok + 1))
  else
    echo "$role/$operation : refuse"
  fi
done
echo "autorisations : $ok/$n"
`
  }
];
