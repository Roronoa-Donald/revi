/**
 * Catalogue des 18 exercices shell du cours « Projet tutoré » B1 :
 * application de gestion de stock (Python, Tkinter & PostgreSQL) simulée en Bash.
 *
 * Chapitre 1 : cadrage du projet (objectifs, prérequis, structure, environnement).
 * Chapitre 2 : la base de données (table produits, connexion, CRUD SQL).
 * Chapitre 3 : l'interface Tkinter (widgets, saisie, validation, Treeview).
 * Chapitre 4 : le cycle de vie d'un produit (ajout, modification, suppression,
 *              validation avant insertion).
 * Chapitre 5 : la logique métier du stock (seuils d'alerte, valeur du stock,
 *              tri, recherche).
 * Chapitre 6 : fiabiliser et livrer (dépannage, export CSV, améliorations,
 *              tableau de bord).
 *
 * Conventions : language 'shell', ids '<prefixe>-cN-eM', niveaux n1/n2/n3,
 * entrées stdin mono-mots terminées par \n, exemple distinct des tests.
 */
'use strict';

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Cadrage du projet
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'pr-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Les quatre compétences du projet',
    goal: 'Valider le concept Python appliqué à chaque compétence du tutoriel.',
    brief: '<p>Le script lit <strong>n lignes</strong> « competence concept » : concept est un code parmi ' +
      '<code>poo</code>, <code>tkinter</code>, <code>postgres</code> ou <code>crud</code>. Compétences du ' +
      'tutoriel : créer une interface graphique → <code>tkinter</code> ; connecter l\'application à la base → ' +
      '<code>postgres</code> ; implémenter les opérations Create, Read, Update, Delete → <code>crud</code> ; ' +
      'organiser le code en classes (Database, ApplicationGestionStock) → <code>poo</code>. Pour chaque ligne ' +
      'il affiche <code>competence : OK</code> ou <code>competence : ERREUR</code>, puis ' +
      '<code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r competence concept
  # À compléter : le concept attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur la compétence : interface → tkinter, connexion → postgres, operations → crud, classes → poo.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\ninterface tkinter\nconnexion postgres\noperations crud\n', expected: 'interface : OK\nconnexion : OK\noperations : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les cinq competences', stdin: '5\ninterface tkinter\nconnexion postgres\noperations crud\nclasses poo\nmodules poo\n', expected: 'interface : OK\nconnexion : OK\noperations : OK\nclasses : OK\nmodules : OK\ncorrects : 5/5' },
      { label: 'Trois confusions', stdin: '4\ninterface postgres\nconnexion tkinter\nclasses crud\nmodules poo\n', expected: 'interface : ERREUR\nconnexion : ERREUR\nclasses : ERREUR\nmodules : OK\ncorrects : 1/4' },
      { label: 'Revue objectifs', stdin: '5\noperations crud\ninterface tkinter\nmodules poo\nconnexion postgres\nclasses poo\n', expected: 'operations : OK\ninterface : OK\nmodules : OK\nconnexion : OK\nclasses : OK\ncorrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r competence concept
  case "$competence" in
    interface) attendu="tkinter" ;;
    connexion) attendu="postgres" ;;
    operations) attendu="crud" ;;
    classes|modules) attendu="poo" ;;
  esac
  if [ "$concept" = "$attendu" ]; then
    echo "$competence : OK"
    ok=$((ok + 1))
  else
    echo "$competence : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },
  {
    id: 'pr-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Prérequis de l\'environnement',
    goal: 'Décider si la machine d\'un étudiant peut démarrer le projet.',
    brief: '<p>Le script lit <strong>n lignes</strong> « poste python tkinter psql » où python est la ' +
      'version installée (ex. 37 pour 3.7), tkinter et psql valent <code>oui</code> ou <code>non</code>. ' +
      'Prérequis du tutoriel : <strong>Python 3.7 ou supérieur</strong>, Tkinter installé, PostgreSQL ' +
      'installé. Pour chaque ligne il affiche <code>poste : prets</code> si les trois conditions sont ' +
      'réunies, sinon <code>poste : a equiper</code>, puis <code>bilan : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r poste python tkinter psql
  # À compléter : les trois conditions, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Trois conditions en ET : -ge 37, tkinter = oui, psql = oui.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\netudiant1 39 oui oui\netudiant2 37 non oui\netudiant3 36 oui oui\n', expected: 'etudiant1 : prets\netudiant2 : a equiper\netudiant3 : a equiper\nbilan : 1/3' }
    ],
    tests: [
      { label: 'Salle informatique', stdin: '4\na 37 oui oui\nb 310 oui oui\nc 37 oui non\nd 39 non oui\n', expected: 'a : prets\nb : prets\nc : a equiper\nd : a equiper\nbilan : 2/4' },
      { label: 'Tout juste conforme', stdin: '2\nmini 37 oui oui\npresque 37 oui non\n', expected: 'mini : prets\npresque : a equiper\nbilan : 1/2' },
      { label: 'Promotion complete', stdin: '5\np1 39 oui oui\np2 37 oui oui\np3 310 oui oui\np4 36 oui oui\np5 38 non non\n', expected: 'p1 : prets\np2 : prets\np3 : prets\np4 : a equiper\np5 : a equiper\nbilan : 3/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r poste python tkinter psql
  if [ "$python" -ge 37 ] && [ "$tkinter" = "oui" ] && [ "$psql" = "oui" ]; then
    echo "$poste : prets"
    ok=$((ok + 1))
  else
    echo "$poste : a equiper"
  fi
done
echo "bilan : $ok/$n"
`
  },
  {
    id: 'pr-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Structure du projet',
    goal: 'Vérifier le rôle de chaque fichier de l\'organisation imposée.',
    brief: '<p>Le script lit <strong>n lignes</strong> « fichier role » : role est un code parmi ' +
      '<code>interface</code>, <code>database</code>, <code>deps</code> ou <code>doc</code>. Organisation ' +
      'du tutoriel : <code>main.py</code> → <code>interface</code> (Tkinter) ; <code>database.py</code> → ' +
      '<code>database</code> (module de gestion PostgreSQL) ; <code>requirements.txt</code> → ' +
      '<code>deps</code> (psycopg2-binary) ; <code>README.md</code> → <code>doc</code>. Pour chaque ligne ' +
      'il affiche <code>fichier : OK</code> ou <code>fichier : ERREUR</code>, puis <code>corrects : ' +
      'X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r fichier role
  # À compléter : le rôle attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le fichier : main → interface, database → database, requirements → deps, readme → doc.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nmain interface\ndatabase database\nrequirements deps\n', expected: 'main : OK\ndatabase : OK\nrequirements : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les quatre fichiers', stdin: '4\nmain interface\ndatabase database\nrequirements deps\nreadme doc\n', expected: 'main : OK\ndatabase : OK\nrequirements : OK\nreadme : OK\ncorrects : 4/4' },
      { label: 'Trois erreurs', stdin: '4\nmain database\nrequirements interface\nreadme deps\nmain interface\n', expected: 'main : ERREUR\nrequirements : ERREUR\nreadme : ERREUR\nmain : OK\ncorrects : 1/4' },
      { label: 'Depot git', stdin: '5\nreadme doc\nmain interface\nrequirements deps\ndatabase database\nreadme doc\n', expected: 'readme : OK\nmain : OK\nrequirements : OK\ndatabase : OK\nreadme : OK\ncorrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r fichier role
  case "$fichier" in
    main) attendu="interface" ;;
    database) attendu="database" ;;
    requirements) attendu="deps" ;;
    readme) attendu="doc" ;;
  esac
  if [ "$role" = "$attendu" ]; then
    echo "$fichier : OK"
    ok=$((ok + 1))
  else
    echo "$fichier : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — La base de données
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'pr-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'La table produits',
    goal: 'Valider le type PostgreSQL de chaque colonne de la table produits.',
    brief: '<p>Le script lit <strong>n lignes</strong> « colonne type » : type est un code parmi ' +
      '<code>serial</code>, <code>varchar</code>, <code>integer</code> ou <code>decimal</code>. Table du ' +
      'tutoriel : <code>id</code> clé primaire auto-incrémentée → <code>serial</code> ; <code>nom</code> ' +
      'et <code>categorie</code> → <code>varchar</code> ; <code>quantite</code> → <code>integer</code> ; ' +
      '<code>prix</code> → <code>decimal</code> (10,2). Pour chaque ligne il affiche <code>colonne : ' +
      'OK</code> ou <code>colonne : ERREUR</code>, puis <code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r colonne type
  # À compléter : le type attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur la colonne : id → serial, nom/categorie → varchar, quantite → integer, prix → decimal.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nid serial\nquantite integer\nprix decimal\n', expected: 'id : OK\nquantite : OK\nprix : OK\ncorrects : 3/3' }
    ],
    tests: [
      { label: 'Les cinq colonnes', stdin: '5\nid serial\nnom varchar\ncategorie varchar\nquantite integer\nprix decimal\n', expected: 'id : OK\nnom : OK\ncategorie : OK\nquantite : OK\nprix : OK\ncorrects : 5/5' },
      { label: 'Trois erreurs de type', stdin: '4\nid integer\nquantite serial\nprix integer\nnom varchar\n', expected: 'id : ERREUR\nquantite : ERREUR\nprix : ERREUR\nnom : OK\ncorrects : 1/4' },
      { label: 'Schema complet', stdin: '5\nprix decimal\nnom varchar\nid serial\ncategorie varchar\nquantite integer\n', expected: 'prix : OK\nnom : OK\nid : OK\ncategorie : OK\nquantite : OK\ncorrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r colonne type
  case "$colonne" in
    id) attendu="serial" ;;
    nom|categorie) attendu="varchar" ;;
    quantite) attendu="integer" ;;
    prix) attendu="decimal" ;;
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
    id: 'pr-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Connexion PostgreSQL : oui ou non ?',
    goal: 'Décider si la connexion peut s\'établir et réagir comme la méthode connecter().',
    brief: '<p>La méthode <code>connecter()</code> du tutoriel tente la connexion et renvoie True en cas de ' +
      'succès, False en cas d\'échec (exception Error). Le script lit <strong>n lignes</strong> « service ' +
      'etat » : service est un code parmi <code>serveur</code>, <code>mdp</code>, <code>base</code> — etat ' +
      'vaut <code>ok</code> ou <code>ko</code>. Si les trois services sont ok, il affiche <code>connexion ' +
      'reussie</code> ; dès qu\'un service est ko, il affiche <code>erreur : service</code> et s\'arrête ' +
      '(comme le try/except qui renvoie False au premier problème).</p>',
    starter: `for ((i=1; i<=3; i++)); do
  read -r service etat
  # À compléter : sortie au premier défaut, verdict final.
done
# À compléter : le verdict final.
`,
    hints: [
      'Dès que etat vaut ko : echo "erreur : $service" puis exit 0.',
      'Si la boucle se termine sans défaut, afficher le verdict de succès.'
    ],
    examples: [
      { stdin: 'serveur ok\nmdp ok\nbase ok\n', expected: 'connexion reussie' },
      { stdin: 'serveur ok\nmdp ko\nbase ok\n', expected: 'erreur : mdp' }
    ],
    tests: [
      { label: 'Serveur eteint', stdin: 'serveur ko\nmdp ok\nbase ok\n', expected: 'erreur : serveur' },
      { label: 'Base absente', stdin: 'serveur ok\nmdp ok\nbase ko\n', expected: 'erreur : base' },
      { label: 'Double defaut', stdin: 'serveur ko\nmdp ko\nbase ok\n', expected: 'erreur : serveur' }
    ],
    solution: `for ((i=1; i<=3; i++)); do
  read -r service etat
  if [ "$etat" = "ko" ]; then
    echo "erreur : $service"
    exit 0
  fi
done
echo "connexion reussie"
`
  },
  {
    id: 'pr-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'L\'ordre des opérations SQL',
    goal: 'Remettre chaque ordre CRUD devant sa requête SQL et valider l\'ordre du cycle.',
    brief: '<p>Le script lit <strong>4 lignes</strong> « operation sql » dans l\'ordre du cycle : le script ' +
      'doit vérifier que l\'étape 1 est <code>create</code> (requête attendue <code>insert</code>), l\'étape 2 ' +
      '<code>read</code> (<code>select</code>), l\'étape 3 <code>update</code> (<code>update</code>) et ' +
      'l\'étape 4 <code>delete</code> (<code>delete</code>). Pour chaque ligne il affiche <code>etape N : ' +
      'OK</code> quand l\'opération ET sa requête sont justes, sinon <code>etape N : NON</code>, puis ' +
      '<code>etapes correctes : X/4</code>.</p>',
    starter: `for ((i=1; i<=4; i++)); do
  read -r operation sql
  # À compléter : la requête attendue selon l'étape, les deux comparaisons, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le numéro : 1 → create/insert, 2 → read/select, 3 → update/update, 4 → delete/delete.',
      'Les deux conditions doivent être vraies en même temps : operation ET sql.'
    ],
    examples: [
      { stdin: 'create insert\nread select\nupdate update\ndelete delete\n', expected: 'etape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netapes correctes : 4/4' }
    ],
    tests: [
      { label: 'Dernieres etapes inversees', stdin: 'create insert\nread select\ndelete delete\nupdate update\n', expected: 'etape 1 : OK\netape 2 : OK\netape 3 : NON\netape 4 : NON\netapes correctes : 2/4' },
      { label: 'Requetes echangees', stdin: 'create select\nread insert\nupdate update\ndelete delete\n', expected: 'etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4' },
      { label: 'Operations dans le desordre', stdin: 'read select\ncreate insert\nupdate update\ndelete delete\n', expected: 'etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4' }
    ],
    solution: `for ((i=1; i<=4; i++)); do
  read -r operation sql
  case "$i" in
    1) attendu_op="create" ; attendu_sql="insert" ;;
    2) attendu_op="read" ; attendu_sql="select" ;;
    3) attendu_op="update" ; attendu_sql="update" ;;
    4) attendu_op="delete" ; attendu_sql="delete" ;;
  esac
  if [ "$operation" = "$attendu_op" ] && [ "$sql" = "$attendu_sql" ]; then
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
  // Chapitre 3 — L'interface Tkinter
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'pr-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Widget ou méthode ?',
    goal: 'Associer chaque élément Tkinter du tutoriel à sa famille.',
    brief: '<p>Le script lit <strong>n lignes</strong> « element famille » : famille est un code parmi ' +
      '<code>widget</code>, <code>layout</code> ou <code>boite</code>. Éléments du tutoriel : Entry, Label, ' +
      'Button, Frame, Treeview → <code>widget</code> ; pack, grid → <code>layout</code> ; messagebox ' +
      '(showinfo, showerror, askyesno) → <code>boite</code>. Pour chaque ligne il affiche <code>element : ' +
      'OK</code> ou <code>element : ERREUR</code>, puis <code>conformes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r element famille
  # À compléter : la famille attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur l\'élément : entry/label/button/treeview → widget, pack/grid → layout, messagebox → boite.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nentry widget\npack layout\nmessagebox boite\n', expected: 'entry : OK\npack : OK\nmessagebox : OK\nconformes : 3/3' }
    ],
    tests: [
      { label: 'Les six elements', stdin: '6\nentry widget\nlabel widget\nbutton widget\ntreeview widget\ngrid layout\nshowerror boite\n', expected: 'entry : OK\nlabel : OK\nbutton : OK\ntreeview : OK\ngrid : OK\nshowerror : OK\nconformes : 6/6' },
      { label: 'Trois confusions', stdin: '4\npack widget\nentry layout\nmessagebox widget\nbutton widget\n', expected: 'pack : ERREUR\nentry : ERREUR\nmessagebox : ERREUR\nbutton : OK\nconformes : 1/4' },
      { label: 'Interface complete', stdin: '5\ntreeview widget\nshowinfo boite\npack layout\nlabel widget\naskyesno boite\n', expected: 'treeview : OK\nshowinfo : OK\npack : OK\nlabel : OK\naskyesno : OK\nconformes : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r element famille
  case "$element" in
    entry|label|button|treeview) attendu="widget" ;;
    pack|grid) attendu="layout" ;;
    messagebox|showinfo|showerror|askyesno) attendu="boite" ;;
  esac
  if [ "$famille" = "$attendu" ]; then
    echo "$element : OK"
    ok=$((ok + 1))
  else
    echo "$element : ERREUR"
  fi
done
echo "conformes : $ok/$n"
`
  },
  {
    id: 'pr-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Validation des champs de saisie',
    goal: 'Appliquer la validation du formulaire avant tout appel à la base.',
    brief: '<p>La méthode <code>ajouter_produit()</code> du tutoriel refuse l\'insertion si un champ ' +
      'obligatoire est vide, puis convertit quantite en int et prix en float. Le script lit <strong>n ' +
      'lignes</strong> « champ valeur » : champ est un code parmi <code>nom</code>, <code>quantite</code>, ' +
      '<code>prix</code> — valeur est le contenu saisi (un seul mot ; <code>-</code> = vide). Règles : nom ' +
      'non vide ; quantite nombre entier positif ; prix nombre positif. Pour chaque ligne il affiche ' +
      '<code>champ : OK</code> si la règle est respectée, sinon <code>champ : REFUSE</code>, puis ' +
      '<code>valides : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r champ valeur
  # À compléter : la règle selon le champ, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le champ : nom refuse seulement -, quantite/prix testent -gt 0 apres un test numerique.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nnom clavier\nquantite 5\nprix -\n', expected: 'nom : OK\nquantite : OK\nprix : REFUSE\nvalides : 2/3' }
    ],
    tests: [
      { label: 'Formulaire complet', stdin: '5\nnom clavier\nquantite 12\nprix 2500\nnom -\nprix zero\n', expected: 'nom : OK\nquantite : OK\nprix : OK\nnom : REFUSE\nprix : REFUSE\nvalides : 3/5' },
      { label: 'Nombres invalides', stdin: '3\nquantite deux\nquantite -3\nprix -1\n', expected: 'quantite : REFUSE\nquantite : REFUSE\nprix : REFUSE\nvalides : 0/3' },
      { label: 'Relecture fiche', stdin: '4\nnom ecran\nquantite 0\nprix 100\nnom -\n', expected: 'nom : OK\nquantite : REFUSE\nprix : OK\nnom : REFUSE\nvalides : 2/4' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r champ valeur
  valide=1
  case "$champ" in
    nom)
      if [ "$valeur" = "-" ] || [ -z "$valeur" ]; then
        valide=0
      fi
      ;;
    quantite|prix)
      case "$valeur" in
        -|*[!0-9]*) valide=0 ;;
        *) [ "$valeur" -le 0 ] && valide=0 ;;
      esac
      ;;
  esac
  if [ "$valide" = "1" ]; then
    echo "$champ : OK"
    ok=$((ok + 1))
  else
    echo "$champ : REFUSE"
  fi
done
echo "valides : $ok/$n"
`
  },
  {
    id: 'pr-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Message ou boîte ?',
    goal: 'Choisir la bonne boîte de dialogue Tkinter pour chaque situation.',
    brief: '<p>Le script lit <strong>n lignes</strong> « situation boite » : boite est un code parmi ' +
      '<code>showinfo</code>, <code>showwarning</code>, <code>showerror</code> ou <code>askyesno</code>. ' +
      'Usages du tutoriel : produit ajouté avec succès → <code>showinfo</code> ; champs obligatoires non ' +
      'remplis → <code>showwarning</code> ; impossible de se connecter → <code>showerror</code> ; ' +
      'confirmation avant suppression → <code>askyesno</code>. Pour chaque ligne il affiche ' +
      '<code>situation : conforme</code> ou <code>situation : a revoir</code>, puis <code>avis : ' +
      'X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r situation boite
  # À compléter : la boîte attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur la situation : succes/ajoute → showinfo, champs/attention → showwarning, echec/connexion → showerror, suppression/confirme → askyesno.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nsucces showinfo\nchamps showwarning\nsuppression askyesno\n', expected: 'succes : conforme\nchamps : conforme\nsuppression : conforme\navis : 3/3' }
    ],
    tests: [
      { label: 'Les quatre dialogues', stdin: '4\nsucces showinfo\nchamps showwarning\nechec showerror\nsuppression askyesno\n', expected: 'succes : conforme\nchamps : conforme\nechec : conforme\nsuppression : conforme\navis : 4/4' },
      { label: 'Trois erreurs', stdin: '4\nsucces showerror\nechec showinfo\nsuppression showinfo\nchamps showwarning\n', expected: 'succes : a revoir\nechec : a revoir\nsuppression : a revoir\nchamps : conforme\navis : 1/4' },
      { label: 'Revue UX', stdin: '5\nsuppression askyesno\nsucces showinfo\nechec showerror\nchamps showwarning\nsucces showinfo\n', expected: 'suppression : conforme\nsucces : conforme\nechec : conforme\nchamps : conforme\nsucces : conforme\navis : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r situation boite
  case "$situation" in
    succes|ajoute) attendu="showinfo" ;;
    champs|attention) attendu="showwarning" ;;
    echec|connexion) attendu="showerror" ;;
    suppression|confirme) attendu="askyesno" ;;
  esac
  if [ "$boite" = "$attendu" ]; then
    echo "$situation : conforme"
    ok=$((ok + 1))
  else
    echo "$situation : a revoir"
  fi
done
echo "avis : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Cycle de vie d'un produit
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'pr-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Ajout au stock',
    goal: 'Simuler l\'ajout de produits et compter les insertions réussies.',
    brief: '<p>Le script lit <strong>n lignes</strong> « produit quantite » : quantite est le stock initial ' +
      '(nombre positif ; <code>-</code> = champ vide, insertion refusée comme dans le tutoriel). Pour chaque ' +
      'ligne il affiche <code>produit : ajoute</code> si la quantité est un entier positif, sinon ' +
      '<code>produit : refuse</code>, puis <code>ajouts : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r produit quantite
  # À compléter : la validation, l'affichage, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Refuse si quantite vaut - ou n\'est pas un entier positif (test *[!0-9]* puis -gt 0).',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nclavier 10\necran -\nsouris 3\n', expected: 'clavier : ajoute\necran : refuse\nsouris : ajoute\najouts : 2/3' }
    ],
    tests: [
      { label: 'Livraison du jour', stdin: '5\nclavier 10\necran 2\nsouris -\nusb 0\nhub 7\n', expected: 'clavier : ajoute\necran : ajoute\nsouris : refuse\nusb : refuse\nhub : ajoute\najouts : 3/5' },
      { label: 'Champs vides', stdin: '3\na -\nb -\nc 1\n', expected: 'a : refuse\nb : refuse\nc : ajoute\najouts : 1/3' },
      { label: 'Reception complete', stdin: '4\ncable 25\nchargeur 15\nadaptateur 8\nsacoche 4\n', expected: 'cable : ajoute\nchargeur : ajoute\nadaptateur : ajoute\nsacoche : ajoute\najouts : 4/4' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r produit quantite
  valide=1
  case "$quantite" in
    '') valide=0 ;;
    -) valide=0 ;;
    *[!0-9]*) valide=0 ;;
    *) [ "$quantite" -le 0 ] && valide=0 ;;
  esac
  if [ "$valide" = "1" ]; then
    echo "$produit : ajoute"
    ok=$((ok + 1))
  else
    echo "$produit : refuse"
  fi
done
echo "ajouts : $ok/$n"
`
  },
  {
    id: 'pr-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Mouvement de stock',
    goal: 'Appliquer entrées et sorties au stock existant, comme UPDATE quantite.',
    brief: '<p>Le script lit <strong>n lignes</strong> « produit mouvement » où mouvement est un entier ' +
      '<strong>positif pour une entrée</strong> (le stock augmente) et <strong>préfixé de moins pour une ' +
      'sortie</strong> (le stock diminue). Le stock de départ de chaque produit est son entrée précédente : ' +
      'le premier mouvement d\'un produit part de 0. Une sortie qui rendrait le stock négatif est refusée ' +
      '(<code>produit : stock insuffisant</code>, mouvement ignoré) ; sinon le script affiche le nouveau ' +
      'stock (<code>produit : stock=X</code>). Bilan final : <code>mouvements : n</code>.</p>',
    starter: `read -r n
declare -A stock
for ((i=0; i<n; i++)); do
  read -r produit mouvement
  # À compléter : entrée ou sortie, contrôle du stock, mise à jour du tableau associatif.
done
# À compléter : le bilan.
`,
    hints: [
      'Un mouvement qui commence par - est une sortie : quantite = valeur sans le signe.',
      'Sortie refusée si stock[produit] < quantite ; sinon stock += mouvement (entrée) ou -= (sortie).'
    ],
    examples: [
      { stdin: '4\nclavier 10\nclavier -4\nsouris 5\nsouris -9\n', expected: 'clavier : stock=10\nclavier : stock=6\nsouris : stock=5\nsouris : stock insuffisant\nmouvements : 4' }
    ],
    tests: [
      { label: 'Journee normale', stdin: '6\ncable 20\ncable -5\nchargeur 3\nchargeur -2\ncable -15\nchargeur -4\n', expected: 'cable : stock=20\ncable : stock=15\nchargeur : stock=3\nchargeur : stock=1\ncable : stock=0\nchargeur : stock insuffisant\nmouvements : 6' },
      { label: 'Sortie sans entree', stdin: '2\nusb -3\nusb 10\n', expected: 'usb : stock insuffisant\nusb : stock=10\nmouvements : 2' },
      { label: 'Inventaire hebdo', stdin: '5\necran 8\necran -8\necran 12\nsouris 30\nsouris -30\n', expected: 'ecran : stock=8\necran : stock=0\necran : stock=12\nsouris : stock=30\nsouris : stock=0\nmouvements : 5' }
    ],
    solution: `read -r n
declare -A stock
for ((i=0; i<n; i++)); do
  read -r produit mouvement
  actuel=\${stock[$produit]:-0}
  case "$mouvement" in
    -*)
      quantite=\${mouvement#-}
      if [ "$actuel" -lt "$quantite" ]; then
        echo "$produit : stock insuffisant"
      else
        stock[$produit]=$((actuel - quantite))
        echo "$produit : stock=\${stock[$produit]}"
      fi
      ;;
    *)
      stock[$produit]=$((actuel + mouvement))
      echo "$produit : stock=\${stock[$produit]}"
      ;;
  esac
done
echo "mouvements : $n"
`
  },
  {
    id: 'pr-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'Suppression protégée',
    goal: 'Traiter les demandes de suppression avec confirmation et refus motivés.',
    brief: '<p>Le script lit <strong>n lignes</strong> « produit motif » : motif est un code parmi ' +
      '<code>confirme</code>, <code>annule</code> ou <code>absent</code>. Logique du tutoriel : askyesno ' +
      'confirme avant de supprimer — <code>confirme</code> → <code>produit : supprime</code> ; ' +
      '<code>annule</code> → <code>produit : conserve</code> ; <code>absent</code> (produit déjà parti de ' +
      'la table) → <code>produit : introuvable</code> et <strong>compté à part</strong>. Bilan : ' +
      '<code>suppressions : X</code> puis <code>introuvables : Y</code> (dans cet ordre, sur deux lignes).</p>',
    starter: `read -r n
suppr=0
abs=0
for ((i=0; i<n; i++)); do
  read -r produit motif
  # À compléter : le verdict selon le motif, les deux compteurs.
done
# À compléter : le bilan sur deux lignes.
`,
    hints: [
      'Trois verdicts : confirme → supprime (suppr+1), annule → conserve, absent → introuvable (abs+1).',
      'Deux lignes de bilan à la fin : suppressions : X puis introuvables : Y.'
    ],
    examples: [
      { stdin: '3\nclavier confirme\necran annule\nsouris absent\n', expected: 'clavier : supprime\necran : conserve\nsouris : introuvable\nsuppressions : 1\nintrouvables : 1' }
    ],
    tests: [
      { label: 'Nettoyage du catalogue', stdin: '5\na confirme\nb annule\nc confirme\nd absent\ne confirme\n', expected: 'a : supprime\nb : conserve\nc : supprime\nd : introuvable\ne : supprime\nsuppressions : 3\nintrouvables : 1' },
      { label: 'Tout refuse', stdin: '3\nx annule\ny annule\nz absent\n', expected: 'x : conserve\ny : conserve\nz : introuvable\nsuppressions : 0\nintrouvables : 1' },
      { label: 'Purge finale', stdin: '4\np1 confirme\np2 confirme\np3 confirme\np4 confirme\n', expected: 'p1 : supprime\np2 : supprime\np3 : supprime\np4 : supprime\nsuppressions : 4\nintrouvables : 0' }
    ],
    solution: `read -r n
suppr=0
abs=0
for ((i=0; i<n; i++)); do
  read -r produit motif
  case "$motif" in
    confirme)
      echo "$produit : supprime"
      suppr=$((suppr + 1))
      ;;
    annule)
      echo "$produit : conserve"
      ;;
    absent)
      echo "$produit : introuvable"
      abs=$((abs + 1))
      ;;
  esac
done
echo "suppressions : $suppr"
echo "introuvables : $abs"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Logique métier du stock
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'pr-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Alertes de stock bas',
    goal: 'Signaler chaque produit sous son seuil d\'alerte, comme l\'amélioration 2 du tutoriel.',
    brief: '<p>Le script lit <strong>n lignes</strong> « produit seuil stock ». Pour chaque ligne il ' +
      'affiche <code>produit : rupture</code> si stock vaut 0, <code>produit : alerte</code> si le stock ' +
      'est strictement inférieur au seuil (amélioration « avertir si quantité &lt; seuil »), sinon ' +
      '<code>produit : ok</code>. Bilan : <code>ruptures : R</code> puis <code>alertes : A</code> (dans cet ' +
      'ordre, sur deux lignes).</p>',
    starter: `read -r n
r=0
a=0
for ((i=0; i<n; i++)); do
  read -r produit seuil stock
  # À compléter : les trois verdicts, les deux compteurs.
done
# À compléter : le bilan sur deux lignes.
`,
    hints: [
      'Trois cas dans l\'ordre : stock -eq 0 → rupture ; stock -lt seuil → alerte ; sinon ok.',
      'Deux lignes de bilan à la fin : ruptures : R puis alertes : A.'
    ],
    examples: [
      { stdin: '3\nclavier 5 2\necran 3 0\nsouris 4 10\n', expected: 'clavier : alerte\necran : rupture\nsouris : ok\nruptures : 1\nalertes : 1' }
    ],
    tests: [
      { label: 'Inventaire du soir', stdin: '5\na 5 0\nb 3 2\nc 4 4\nd 2 1\ne 6 50\n', expected: 'a : rupture\nb : alerte\nc : ok\nd : alerte\ne : ok\nruptures : 1\nalertes : 2' },
      { label: 'Rupture generale', stdin: '3\nx 1 0\ny 2 0\nz 1 0\n', expected: 'x : rupture\ny : rupture\nz : rupture\nruptures : 3\nalertes : 0' },
      { label: 'Stock sain', stdin: '4\np1 5 5\np2 10 30\np3 2 8\np4 7 7\n', expected: 'p1 : ok\np2 : ok\np3 : ok\np4 : ok\nruptures : 0\nalertes : 0' }
    ],
    solution: `read -r n
r=0
a=0
for ((i=0; i<n; i++)); do
  read -r produit seuil stock
  if [ "$stock" -eq 0 ]; then
    echo "$produit : rupture"
    r=$((r + 1))
  elif [ "$stock" -lt "$seuil" ]; then
    echo "$produit : alerte"
    a=$((a + 1))
  else
    echo "$produit : ok"
  fi
done
echo "ruptures : $r"
echo "alertes : $a"
`
  },
  {
    id: 'pr-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Valeur totale du stock',
    goal: 'Calculer la valeur de chaque ligne (quantite × prix) puis la valeur totale.',
    brief: '<p>Amélioration 2 du tutoriel : « calculer la valeur totale du stock ». Le script lit ' +
      '<strong>n lignes</strong> « produit quantite prix » (prix en FCFA, entier). Pour chaque ligne il ' +
      'affiche <code>produit : X FCFA</code> avec X = quantite × prix, puis la ligne totale ' +
      '<code>valeur totale : T FCFA</code>.</p>',
    starter: `read -r n
total=0
for ((i=0; i<n; i++)); do
  read -r produit quantite prix
  # À compléter : le calcul de la ligne, l'affichage, l'accumulation.
done
# À compléter : la ligne totale.
`,
    hints: [
      'Ligne = quantite * prix ; affiche puis ajoute au total.',
      'La ligne totale sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nclavier 10 5000\nsouris 5 2500\necran 2 45000\n', expected: 'clavier : 50000 FCFA\nsouris : 12500 FCFA\necran : 90000 FCFA\nvaleur totale : 152500 FCFA' }
    ],
    tests: [
      { label: 'Rayon informatique', stdin: '4\nusb 20 1500\ncable 15 2000\nhub 8 7500\nchargeur 6 12000\n', expected: 'usb : 30000 FCFA\ncable : 30000 FCFA\nhub : 60000 FCFA\nchargeur : 72000 FCFA\nvaleur totale : 192000 FCFA' },
      { label: 'Ligne vide', stdin: '3\na 0 5000\nb 3 0\nc 2 100\n', expected: 'a : 0 FCFA\nb : 0 FCFA\nc : 200 FCFA\nvaleur totale : 200 FCFA' },
      { label: 'Revalorisation', stdin: '2\necran 7 45000\nimprimante 3 85000\n', expected: 'ecran : 315000 FCFA\nimprimante : 255000 FCFA\nvaleur totale : 570000 FCFA' }
    ],
    solution: `read -r n
total=0
for ((i=0; i<n; i++)); do
  read -r produit quantite prix
  ligne=$((quantite * prix))
  total=$((total + ligne))
  echo "$produit : $ligne FCFA"
done
echo "valeur totale : $total FCFA"
`
  },
  {
    id: 'pr-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Recherche et tri du catalogue',
    goal: 'Chercher les produits d\'une catégorie puis désigner le plus cher et le mieux stocké.',
    brief: '<p>Améliorations 1 et 4 du tutoriel. Le script lit <strong>n lignes</strong> « produit ' +
      'categorie prix stock » puis une ligne <code>cible</code> (la catégorie recherchée). Pour chaque ' +
      'ligne de la catégorie cible il affiche <code>produit : prix=X stock=Y</code> ; à la fin il affiche ' +
      '<code>plus cher : P (X FCFA)</code> (produit de la cible au prix le plus élevé ; en cas d\'égalité, ' +
      'le premier rencontré gagne), puis <code>trouves : K</code>.</p>',
    starter: `read -r n
trouves=0
meilleur="-"
meilleur_prix=0
for ((i=0; i<n; i++)); do
  read -r produit categorie prix stock
  # À compléter : filtrer sur la cible, afficher, garder le maximum.
done
read -r cible
# Attention : la cible est lue après les n lignes — réorganise si besoin.
`,
    hints: [
      'Lis d\'abord les n lignes dans des tableaux, puis la cible, puis boucle sur les tableaux.',
      'Le max : si prix -gt meilleur_prix OU meilleur = -, mettre à jour meilleur et meilleur_prix.'
    ],
    examples: [
      { stdin: '4\nclavier Periph 5000 12\necran Affichage 45000 3\nsouris Periph 2500 30\nhub Periph 7500 8\nPeriph\n', expected: 'clavier : prix=5000 stock=12\nsouris : prix=2500 stock=30\nhub : prix=7500 stock=8\nplus cher : hub (7500 FCFA)\ntrouves : 3' }
    ],
    tests: [
      { label: 'Rayon reseau', stdin: '5\nswitch Reseau 45000 2\nrouteur Reseau 62000 1\ncable Reseau 2000 40\nimprimante Bureau 85000 3\nprise Reseau 1500 60\nReseau\n', expected: 'switch : prix=45000 stock=2\nrouteur : prix=62000 stock=1\ncable : prix=2000 stock=40\nprise : prix=1500 stock=60\nplus cher : routeur (62000 FCFA)\ntrouves : 4' },
      { label: 'Categorie absente', stdin: '3\na Periph 100 1\nb Bureau 200 2\nc Periph 300 3\nSon\n', expected: 'plus cher : - (0 FCFA)\ntrouves : 0' },
      { label: 'Egalite de prix', stdin: '3\nx Stock 500 10\ny Stock 500 20\nz Bureau 900 1\nStock\n', expected: 'x : prix=500 stock=10\ny : prix=500 stock=20\nplus cher : x (500 FCFA)\ntrouves : 2' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r prods[$i] cats[$i] prix[$i] sto[$i]
done
read -r cible
trouves=0
meilleur="-"
meilleur_prix=0
for ((i=0; i<n; i++)); do
  if [ "\${cats[$i]}" = "$cible" ]; then
    nom=\${prods[$i]}
    echo "$nom : prix=\${prix[$i]} stock=\${sto[$i]}"
    if [ "\${prix[$i]}" -gt "$meilleur_prix" ]; then
      meilleur_prix=\${prix[$i]}
      meilleur=$nom
    fi
    trouves=$((trouves + 1))
  fi
done
echo "plus cher : $meilleur ($meilleur_prix FCFA)"
echo "trouves : $trouves"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Fiabiliser et livrer
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'pr-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Diagnostic d\'erreur',
    goal: 'Associer chaque symptôme de dépannage à sa solution du tutoriel.',
    brief: '<p>Le script lit <strong>n lignes</strong> « symptome solution » : solution est un code parmi ' +
      '<code>service</code>, <code>pip</code>, <code>apt</code> ou <code>utf8</code>. Dépannage du ' +
      'tutoriel : « impossible de se connecter » → vérifier le service PostgreSQL (<code>service</code>) ; ' +
      '« ModuleNotFoundError psycopg2 » → <code>pip install psycopg2-binary</code> (<code>pip</code>) ; ' +
      '« ModuleNotFoundError tkinter » → <code>sudo apt install python3-tk</code> (<code>apt</code>) ; ' +
      '« SyntaxError Non-ASCII » → en-tête coding utf-8 (<code>utf8</code>). Pour chaque ligne il affiche ' +
      '<code>symptome : OK</code> ou <code>symptome : ERREUR</code>, puis <code>diagnostics : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r symptome solution
  # À compléter : la solution attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le symptôme : connexion → service, psycopg2 → pip, tkinter → apt, ascii → utf8.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nconnexion service\npsycopg2 pip\ntkinter apt\n', expected: 'connexion : OK\npsycopg2 : OK\ntkinter : OK\ndiagnostics : 3/3' }
    ],
    tests: [
      { label: 'Les quatre pannes', stdin: '4\nconnexion service\npsycopg2 pip\ntkinter apt\nascii utf8\n', expected: 'connexion : OK\npsycopg2 : OK\ntkinter : OK\nascii : OK\ndiagnostics : 4/4' },
      { label: 'Trois erreurs', stdin: '4\nconnexion pip\npsycopg2 apt\nascii pip\ntkinter apt\n', expected: 'connexion : ERREUR\npsycopg2 : ERREUR\nascii : ERREUR\ntkinter : OK\ndiagnostics : 1/4' },
      { label: 'Soirée debug', stdin: '5\nascii utf8\ntkinter apt\nconnexion service\npsycopg2 pip\nascii utf8\n', expected: 'ascii : OK\ntkinter : OK\nconnexion : OK\npsycopg2 : OK\nascii : OK\ndiagnostics : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r symptome solution
  case "$symptome" in
    connexion) attendu="service" ;;
    psycopg2) attendu="pip" ;;
    tkinter) attendu="apt" ;;
    ascii) attendu="utf8" ;;
  esac
  if [ "$solution" = "$attendu" ]; then
    echo "$symptome : OK"
    ok=$((ok + 1))
  else
    echo "$symptome : ERREUR"
  fi
done
echo "diagnostics : $ok/$n"
`
  },
  {
    id: 'pr-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Export CSV',
    goal: 'Produire une ligne CSV valide par produit, comme l\'amélioration 3 du tutoriel.',
    brief: '<p>Le script lit <strong>n lignes</strong> « produit categorie quantite prix » et écrit une ' +
      'ligne CSV par produit au format <code>produit;categorie;quantite;prix</code> ; la première ligne de ' +
      'l\'export est l\'en-tête <code>nom;categorie;quantite;prix</code>. Après les lignes, il affiche le ' +
      'bilan <code>lignes exportees : n</code>. (Le séparateur du tutoriel est le point-virgule.)</p>',
    starter: `read -r n
echo "nom;categorie;quantite;prix"
for ((i=0; i<n; i++)); do
  read -r produit categorie quantite prix
  # À compléter : la ligne CSV.
done
# À compléter : le bilan.
`,
    hints: [
      'La ligne : "$produit;$categorie;$quantite;$prix".',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '2\nclavier Periph 10 5000\nsouris Periph 30 2500\n', expected: 'nom;categorie;quantite;prix\nclavier;Periph;10;5000\nsouris;Periph;30;2500\nlignes exportees : 2' }
    ],
    tests: [
      { label: 'Catalogue complet', stdin: '3\necran Affichage 3 45000\nusb Stock 40 1500\nhub Stock 8 7500\n', expected: 'nom;categorie;quantite;prix\necran;Affichage;3;45000\nusb;Stock;40;1500\nhub;Stock;8;7500\nlignes exportees : 3' },
      { label: 'Fichier deja exporte', stdin: '2\na Stock 5 100\nb Bureau 3 200\n', expected: 'nom;categorie;quantite;prix\na;Stock;5;100\nb;Bureau;3;200\nlignes exportees : 2' },
      { label: 'Un seul produit', stdin: '1\nimprimante Bureau 2 85000\n', expected: 'nom;categorie;quantite;prix\nimprimante;Bureau;2;85000\nlignes exportees : 1' }
    ],
    solution: `read -r n
echo "nom;categorie;quantite;prix"
for ((i=0; i<n; i++)); do
  read -r produit categorie quantite prix
  echo "$produit;$categorie;$quantite;$prix"
done
echo "lignes exportees : $n"
`
  },
  {
    id: 'pr-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Tableau de bord de soutenance',
    goal: 'Produire le résumé complet du stock : lignes, alertes, valeur, produit le plus cher.',
    brief: '<p>Le script lit <strong>n lignes</strong> « produit quantite prix seuil » et affiche le ' +
      'tableau de bord : une ligne par produit <code>produit : stock=X valeur=V</code> (V = quantite × ' +
      'prix) ; puis <code>total : T FCFA</code> (somme des valeurs) ; <code>alertes : A</code> (produits ' +
      'avec stock strictement inférieur au seuil) ; <code>vitrine : P (V FCFA)</code> (produit de plus ' +
      'grande valeur de ligne, premier rencontré en cas d\'égalité).</p>',
    starter: `read -r n
total=0
alertes=0
vitrine="-"
vitrine_val=0
for ((i=0; i<n; i++)); do
  read -r produit quantite prix seuil
  # À compléter : valeur de ligne, total, alerte, maximum.
done
# À compléter : les quatre lignes de synthèse.
`,
    hints: [
      'V = quantite * prix ; total += V ; alerte si quantite -lt seuil.',
      'Le maximum : si V -gt vitrine_val OU vitrine = -, mettre à jour les deux.'
    ],
    examples: [
      { stdin: '3\nclavier 10 5000 4\nsouris 5 2500 8\necran 2 45000 1\n', expected: 'clavier : stock=10 valeur=50000\nsouris : stock=5 valeur=12500\necran : stock=2 valeur=90000\ntotal : 152500 FCFA\nalertes : 1\nvitrine : ecran (90000 FCFA)' }
    ],
    tests: [
      { label: 'Soutenance finale', stdin: '4\nusb 40 1500 10\ncable 15 2000 20\nhub 8 7500 3\nchargeur 6 12000 8\n', expected: 'usb : stock=40 valeur=60000\ncable : stock=15 valeur=30000\nhub : stock=8 valeur=60000\nchargeur : stock=6 valeur=72000\ntotal : 222000 FCFA\nalertes : 2\nvitrine : chargeur (72000 FCFA)' },
      { label: 'Stock vide', stdin: '2\na 0 5000 0\nb 3 100 5\n', expected: 'a : stock=0 valeur=0\nb : stock=3 valeur=300\ntotal : 300 FCFA\nalertes : 1\nvitrine : b (300 FCFA)' },
      { label: 'Egalite vitrine', stdin: '3\nx 2 5000 1\ny 10 1000 2\nz 1 9000 1\n', expected: 'x : stock=2 valeur=10000\ny : stock=10 valeur=10000\nz : stock=1 valeur=9000\ntotal : 29000 FCFA\nalertes : 0\nvitrine : x (10000 FCFA)' }
    ],
    solution: `read -r n
total=0
alertes=0
vitrine="-"
vitrine_val=0
for ((i=0; i<n; i++)); do
  read -r produit quantite prix seuil
  valeur=$((quantite * prix))
  total=$((total + valeur))
  if [ "$quantite" -lt "$seuil" ]; then
    alertes=$((alertes + 1))
  fi
  if [ "$valeur" -gt "$vitrine_val" ]; then
    vitrine_val=$valeur
    vitrine=$produit
  fi
  echo "$produit : stock=$quantite valeur=$valeur"
done
echo "total : $total FCFA"
echo "alertes : $alertes"
echo "vitrine : $vitrine ($vitrine_val FCFA)"
`
  }
];
