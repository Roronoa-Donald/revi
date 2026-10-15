/**
 * server/exercises/b1-git.js — catalogue d'exercices du cours « Git B1 ».
 *
 * Les mécanismes de Git (dépôt, index, commits, branches, distant, reset/stash)
 * sont simulés en Bash pur : le script lit des opérations sur son entrée
 * standard et reproduit l'effet des commandes, sans lancer Git. Le langage
 * reste exactement celui du terminal de la salle TP.
 *
 * Pièges de rédaction appliqués (vécus sur b1-linux) :
 *   - `${...}` bash échappé `\${...}` dans les template literals JS ;
 *   - chaque entrée stdin se termine par `\n` (le dernier `read` échoue à l'EOF) ;
 *   - entrées d'un même chapitre toutes distinctes entre elles ;
 *   - corrigés exécutés en réel par tests/exercise-solutions.test.js.
 */
'use strict';

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Créer un dépôt : init, config, status
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gt-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Journal du dépôt',
    goal: 'Rejouer la séquence git init / config / status d’un TP et rendre compte de l’état du dépôt.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>init nom</code> (crée le dépôt et ' +
      'affiche <code>dépôt nom créé</code>), <code>config cle valeur</code> (enregistre la ' +
      'configuration), <code>status</code>. À chaque <code>status</code> il affiche deux lignes : ' +
      '<code>dépôt : NOM</code> (ou <code>dépôt : aucun</code> si pas encore d’init) et ' +
      '<code>config : ok</code> si user.name ET user.email sont posés, <code>config : manquant</code> ' +
      'sinon.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  # À compléter : tenir le journal du dépôt et répondre aux status.
done
`,
    hints: [
      'Couper l’opération et son argument : read -r op reste lit le premier mot puis tout le reste de la ligne.',
      'Deux drapeaux suffisent pour la config : un pour user.name, un pour user.email.'
    ],
    examples: [
      { stdin: '4\ninit gestion_taches\nconfig user.name Alice\nstatus\nconfig user.email a@x.fr\n', expected: 'dépôt gestion_taches créé\ndépôt : gestion_taches\nconfig : manquant' }
    ],
    tests: [
      { label: 'Status avant init', stdin: '1\nstatus\n', expected: 'dépôt : aucun\nconfig : manquant' },
      { label: 'Config complète', stdin: '4\ninit projet\nconfig user.name Bob\nconfig user.email b@x.fr\nstatus\n', expected: 'dépôt projet créé\ndépôt : projet\nconfig : ok' },
      { label: 'Status répété', stdin: '3\ninit depot\nstatus\nstatus\n', expected: 'dépôt depot créé\ndépôt : depot\nconfig : manquant\ndépôt : depot\nconfig : manquant' }
    ],
    solution: `read -r n
nom=""
has_name=0
has_email=0
for ((i=0; i<n; i++)); do
  read -r op reste
  if [ "$op" = "init" ]; then
    nom="$reste"
    echo "dépôt $nom créé"
  elif [ "$op" = "config" ]; then
    cle="\${reste%% *}"
    [ "$cle" = "user.name" ] && has_name=1
    [ "$cle" = "user.email" ] && has_email=1
  elif [ "$op" = "status" ]; then
    if [ -z "$nom" ]; then
      echo "dépôt : aucun"
    else
      echo "dépôt : $nom"
    fi
    if [ "$has_name" = "1" ] && [ "$has_email" = "1" ]; then
      echo "config : ok"
    else
      echo "config : manquant"
    fi
  fi
done
`
  },
  {
    id: 'gt-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Identité et commits refusés',
    goal: 'Simuler le refus de commit sans identité : le premier piège du TP1.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>config user.name X</code>, ' +
      '<code>config user.email X</code>, ou <code>commit msg</code>. Un commit est accepté seulement si ' +
      'user.name ET user.email sont posés : il affiche alors <code>[main SHA] msg</code> avec SHA le ' +
      'numéro du commit sur quatre chiffres (0001, 0002…). Sinon il affiche ' +
      '<code>erreur : identité manquante</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  # À compléter : refuser les commits sans identité, numéroter les acceptés.
done
`,
    hints: [
      'Un compteur de commits acceptés, initialisé avant la boucle, sert de numéro.',
      'Le formatage sur quatre chiffres : printf "%04d" $numero.'
    ],
    examples: [
      { stdin: '4\nconfig user.name Alice\nconfig user.email a@x.fr\ncommit init\ncommit second\n', expected: '[main 0001] init\n[main 0002] second' }
    ],
    tests: [
      { label: 'Sans identité', stdin: '1\ncommit premier\n', expected: 'erreur : identité manquante' },
      { label: 'Nom seul', stdin: '3\nconfig user.name Bob\ncommit un\nconfig user.email b@x.fr\n', expected: 'erreur : identité manquante' },
      { label: 'Trois commits', stdin: '4\nconfig user.name A\nconfig user.email a@x\ncommit un\ndeux\n', expected: '[main 0001] un' }
    ],
    solution: `read -r n
has_name=0
has_email=0
numero=0
for ((i=0; i<n; i++)); do
  read -r op reste
  if [ "$op" = "config" ]; then
    cle="\${reste%% *}"
    [ "$cle" = "user.name" ] && has_name=1
    [ "$cle" = "user.email" ] && has_email=1
  elif [ "$op" = "commit" ]; then
    if [ "$has_name" = "1" ] && [ "$has_email" = "1" ]; then
      numero=$((numero + 1))
      printf '[main %04d] %s\\n' "$numero" "$reste"
    else
      echo "erreur : identité manquante"
    fi
  fi
done
`
  },
  {
    id: 'gt-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'git status classé',
    goal: 'Classer les fichiers en non suivis, modifiés ou indexés, comme la sortie de git status.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>cree fichier</code> (fichier non ' +
      'suivi), <code>modifie fichier</code> (valide pour un fichier créé ou indexé ; ignoré sinon), ' +
      '<code>add fichier</code>, ou <code>status</code>. Le status affiche trois lignes : ' +
      '<code>non suivis : K</code>, <code>modifies : K</code>, <code>indexes : K</code> — K étant le ' +
      'nombre de fichiers de chaque catégorie. Un <code>modifie</code> sur un fichier non suivi ou ' +
      'inconnu est ignoré. Un <code>add</code> enlève le fichier des autres catégories et le compte ' +
      'une seule fois.</p>',
    starter: `read -r n
non_suivis=0
modifies=0
indexes=0
for ((i=0; i<n; i++)); do
  read -r op fichier
  # À compléter : suivre l'état de chaque fichier et les trois comptes.
done
# À compléter : afficher les trois comptes.
`,
    hints: [
      'Trois comptes et trois règles de passage : cree → non suivi, modifie → modifié, add → indexé.',
      'add depuis une autre catégorie doit décrémenter l’ancienne catégorie, sinon les comptes doublent.'
    ],
    examples: [
      { stdin: '6\ncree main.py\ncree README.md\nadd main.py\nmodifie main.py\nstatus\nadd README.md\n', expected: 'non suivis : 1\nmodifies : 1\nindexes : 0', note: 'main.py indexé puis modifié repasse en « modifies » ; README.md reste non suivi au status.' }
    ],
    tests: [
      { label: 'Tout indexé', stdin: '4\ncree a\ncree b\nadd a\nstatus\n', expected: 'non suivis : 1\nmodifies : 0\nindexes : 1' },
      { label: 'Modifie ignoré', stdin: '3\nmodifie fantome\ncree x\nstatus\n', expected: 'non suivis : 1\nmodifies : 0\nindexes : 0' },
      { label: 'Add double ignoré', stdin: '4\ncree a\nadd a\nadd a\nstatus\n', expected: 'non suivis : 0\nmodifies : 0\nindexes : 1' }
    ],
    solution: `read -r n
declare -A etat
non_suivis=0
modifies=0
indexes=0
for ((i=0; i<n; i++)); do
  read -r op fichier
  courant="\${etat[$fichier]:-}"
  if [ "$op" = "cree" ]; then
    if [ -z "$courant" ]; then
      etat[$fichier]="non_suivi"
      non_suivis=$((non_suivis + 1))
    fi
  elif [ "$op" = "modifie" ]; then
    if [ "$courant" = "non_suivi" ]; then
      non_suivis=$((non_suivis - 1))
      etat[$fichier]="modifie"
      modifies=$((modifies + 1))
    elif [ "$courant" = "indexe" ]; then
      indexes=$((indexes - 1))
      etat[$fichier]="modifie"
      modifies=$((modifies + 1))
    fi
  elif [ "$op" = "add" ]; then
    if [ "$courant" = "non_suivi" ]; then
      non_suivis=$((non_suivis - 1))
      etat[$fichier]="indexe"
      indexes=$((indexes + 1))
    elif [ "$courant" = "modifie" ]; then
      modifies=$((modifies - 1))
      etat[$fichier]="indexe"
      indexes=$((indexes + 1))
    elif [ -z "$courant" ]; then
      etat[$fichier]="indexe"
      indexes=$((indexes + 1))
    fi
  elif [ "$op" = "status" ]; then
    echo "non suivis : $non_suivis"
    echo "modifies : $modifies"
    echo "indexes : $indexes"
  fi
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Index et commits : add, reset, commit
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gt-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Cycle add / commit',
    goal: 'Reproduire le trajet copie de travail → index → dépôt local des fichiers.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>add fichier</code> (met en index), ' +
      '<code>commit</code> (archève tout l’index : chaque fichier indexé devient « commité » et l’index ' +
      'se vide), ou <code>compte</code>. Le compte affiche <code>index : K</code> et ' +
      '<code>commits : K</code> (nombre total de fichiers passés au dépôt, tous commits confondus).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op fichier
  # À compléter : index, dépôt, comptes.
done
# À compléter : afficher les comptes.
`,
    hints: [
      'Un commit ne crée pas une pile : il vide l’index vers le dépôt.',
      'Deux compteurs : taille courante de l’index et cumul des fichiers commités.'
    ],
    examples: [
      { stdin: '6\nadd a\nadd b\ncommit\nadd c\ncompte\ncommit\n', expected: 'index : 1\ncommits : 2', note: 'Le compte se lit après le premier commit ; le second commit archève c.' }
    ],
    tests: [
      { label: 'Rien de commité', stdin: '3\nadd a\nadd b\ncompte\n', expected: 'index : 2\ncommits : 0' },
      { label: 'Deux commits', stdin: '5\nadd a\ncommit\nadd b\ncommit\ncompte\n', expected: 'index : 0\ncommits : 2' },
      { label: 'Index partiel', stdin: '4\nadd a\nadd b\ncommit\ncompte\n', expected: 'index : 0\ncommits : 2' }
    ],
    solution: `read -r n
taille_index=0
cumul=0
for ((i=0; i<n; i++)); do
  read -r op fichier
  if [ "$op" = "add" ]; then
    taille_index=$((taille_index + 1))
  elif [ "$op" = "commit" ]; then
    cumul=$((cumul + taille_index))
    taille_index=0
  elif [ "$op" = "compte" ]; then
    echo "index : $taille_index"
    echo "commits : $cumul"
  fi
done
`
  },
  {
    id: 'gt-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'reset HEAD sélectif',
    goal: 'Retirer des fichiers de l’index avec git reset HEAD, fichier par fichier.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>add fichier</code>, ' +
      '<code>reset fichier</code> (retire du index ; si le fichier n’y est pas, affiche ' +
      '<code>non indexé</code>), ou <code>index</code> (affiche le contenu courant de l’index, un ' +
      'fichier par ligne, dans l’ordre des add encore présents ; rien si l’index est vide).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op fichier
  # À compléter : maintenir l'index comme une file avec retraits.
done
# À compléter : afficher l'index.
`,
    hints: [
      'Deux tableaux parallèles (noms et drapeau présent) permettent de retirer sans réordonner.',
      'Pour retirer : marquer présent=0 ; pour afficher : ne lister que les présents.'
    ],
    examples: [
      { stdin: '6\nadd a\nadd b\nreset a\nindex\nadd c\nindex\n', expected: 'b\nb\nc', note: 'Le premier index ne montre plus a ; le second montre b puis c.' }
    ],
    tests: [
      { label: 'Reset inconnu', stdin: '2\nreset x\nindex\n', expected: 'non indexé' },
      { label: 'Reset puis re-add', stdin: '5\nadd a\nreset a\nadd a\nindex\nreset a\n', expected: 'a' },
      { label: 'Ordre conservé', stdin: '5\nadd a\nadd b\nadd c\nreset b\nindex\n', expected: 'a\nc' }
    ],
    solution: `read -r n
noms=()
vivant=()
for ((i=0; i<n; i++)); do
  read -r op fichier
  if [ "$op" = "add" ]; then
    noms+=("$fichier")
    vivant+=(1)
  elif [ "$op" = "reset" ]; then
    trouve=0
    for idx in "\${!noms[@]}"; do
      if [ "\${noms[$idx]}" = "$fichier" ] && [ "\${vivant[$idx]}" = "1" ]; then
        vivant[$idx]=0
        trouve=1
      fi
    done
    [ "$trouve" = "0" ] && echo "non indexé"
  elif [ "$op" = "index" ]; then
    for idx in "\${!noms[@]}"; do
      [ "\${vivant[$idx]}" = "1" ] && echo "\${noms[$idx]}"
    done
  fi
done
exit 0
`
  },
  {
    id: 'gt-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'Messages de commit disciplinés',
    goal: 'Valider les messages de commit selon la convention du TP : verbosité et longueur.',
    brief: '<p>Le script lit <strong>n lignes</strong> de messages de commit (une par ligne). Pour ' +
      'chacune il affiche <code>ok</code> si : le message commence par une majuscule <em>et</em> fait au ' +
      'plus 50 caractères <em>et</em> ne contient pas de point final. Sinon il affiche le motif exact : ' +
      '<code>majuscule</code>, <code>longueur</code>, <code>point final</code> — dans cet ordre de ' +
      'priorité, un seul motif par message.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r ligne
  # À compléter : trois règles, la première vraie gagne.
done
`,
    hints: [
      'Premier caractère : \${ligne:0:1} ; le comparer à sa version majuscule couvre lettres et accents.',
      'Longueur : \${#ligne} ; point final : vérifier que le dernier caractère est un point.'
    ],
    examples: [
      { stdin: '3\nInitialisation du projet\najout du point d entrée\nAjout du point d entrée.\n', expected: 'ok\nmajuscule\npoint final' }
    ],
    tests: [
      { label: 'Trop long', stdin: '1\nUn message de commit beaucoup trop long pour la convention des cinquante\n', expected: 'longueur' },
      { label: 'Juste à la limite', stdin: '1\nAjout du fichier gitignore pour les caches python\n', expected: 'ok' },
      { label: 'Priorité majuscule', stdin: '2\npremier commit beaucoup trop long pour passer dans les cinquante caractères\ncorrect.\n', expected: 'majuscule\nmajuscule' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r ligne
  premiere="\${ligne:0:1}"
  maj="\${premiere^^}"
  dernier="\${ligne: -1}"
  if [ "$premiere" != "$maj" ]; then
    echo "majuscule"
  elif [ "\${#ligne}" -gt 50 ]; then
    echo "longueur"
  elif [ "$dernier" = "." ]; then
    echo "point final"
  else
    echo "ok"
  fi
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Historique et annulations : log, reset, revert
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gt-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'log --oneline simulé',
    goal: 'Produire un historique numéroté de commits, comme git log --oneline.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>commit msg</code> (ajoute un commit ' +
      'avec un SHA croissant : a1, a2, a3…), ou <code>log</code> (affiche l’historique, du plus récent ' +
      'au plus ancien, sous la forme <code>SHA msg</code> ; rien si aucun commit).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  # À compléter : empiler les commits, afficher en sens inverse.
done
`,
    hints: [
      'Empiler dans l’ordre d’arrivée puis parcourir le tableau à l’envers affiche du plus récent au plus ancien.',
      'Un compteur de commits construit les SHA : a$numero.'
    ],
    examples: [
      { stdin: '5\ncommit init\ncommit ajout\nlog\ncommit fix\nlog\n', expected: 'a2 ajout\na1 init\na3 fix\na2 ajout\na1 init' }
    ],
    tests: [
      { label: 'Historique vide', stdin: '1\nlog\n', expected: '' },
      { label: 'Un seul commit', stdin: '2\ncommit seul\nlog\n', expected: 'a1 seul' },
      { label: 'Quatre commits', stdin: '5\ncommit un\ncommit deux\ncommit trois\ncommit quatre\nlog\n', expected: 'a4 quatre\na3 trois\na2 deux\na1 un' }
    ],
    solution: `read -r n
shas=()
msgs=()
numero=0
for ((i=0; i<n; i++)); do
  read -r op reste
  if [ "$op" = "commit" ]; then
    numero=$((numero + 1))
    shas+=("a$numero")
    msgs+=("$reste")
  elif [ "$op" = "log" ]; then
    total=\${#shas[@]}
    for ((k=total - 1; k>=0; k--)); do
      echo "\${shas[$k]} \${msgs[$k]}"
    done
  fi
done
`
  },
  {
    id: 'gt-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'reset --soft / --mixed / --hard',
    goal: 'Rejouer les trois options de git reset et leurs effets sur dépôt, index et copie de travail.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>commit</code> (ajoute un commit : ' +
      'l’index se vide et la copie redevient propre), <code>fichier</code> (une modification apparaît ' +
      'sur la copie de travail), <code>reset option k</code> où option vaut <code>soft</code>, ' +
      '<code>mixed</code> ou <code>hard</code> et k le nombre de commits à annuler (0 = ne traite que ' +
      'les modifications non commitées), ou <code>etat</code> (affiche <code>commits : K</code>, ' +
      '<code>index : vide|plein</code> et <code>copie : propre|modifiée</code>). Effets de reset : ' +
      '<code>soft</code> remonte les commits annulés dans l’index ; <code>mixed</code> les laisse dans ' +
      'la copie de travail ; <code>hard</code> efface aussi les modifications de la copie.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op a b
  # À compléter : trois comptes, un par espace Git.
done
`,
    hints: [
      'soft : les commits annulés remontent dans l’index — l’index redevient plein.',
      'hard efface aussi les modifications de la copie de travail ; soft et mixed les laissent.'
    ],
    examples: [
      { stdin: '4\ncommit\ncommit\nreset soft 1\netat\n', expected: 'commits : 1\nindex : plein\ncopie : propre' }
    ],
    tests: [
      { label: 'Hard efface tout', stdin: '4\ncommit\nfichier\nreset hard 0\netat\n', expected: 'commits : 1\nindex : vide\ncopie : propre' },
      { label: 'Mixed vide l index', stdin: '4\ncommit\nreset mixed 1\netat\n', expected: 'commits : 0\nindex : vide\ncopie : propre' },
      { label: 'Trop de commits', stdin: '3\ncommit\nreset soft 5\netat\n', expected: 'commits : 0\nindex : plein\ncopie : propre' }
    ],
    solution: `read -r n
commits=0
index="vide"
modifs=0
for ((i=0; i<n; i++)); do
  read -r op a b
  if [ "$op" = "commit" ]; then
    commits=$((commits + 1))
    index="vide"
    modifs=0
  elif [ "$op" = "fichier" ]; then
    modifs=$((modifs + 1))
  elif [ "$op" = "reset" ]; then
    k="$b"
    if [ "$k" -gt "$commits" ]; then
      k="$commits"
    fi
    commits=$((commits - k))
    if [ "$a" = "soft" ]; then
      index="plein"
    else
      index="vide"
      if [ "$a" = "hard" ]; then
        modifs=0
      fi
    fi
  elif [ "$op" = "etat" ]; then
    echo "commits : $commits"
    echo "index : $index"
    if [ "$modifs" -gt 0 ]; then
      echo "copie : modifiée"
    else
      echo "copie : propre"
    fi
  fi
done
`
  },
  {
    id: 'gt-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'revert : annuler avec trace',
    goal: 'Simuler git revert : l’annulation devient un nouveau commit visible dans l’historique.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>commit msg</code>, ' +
      '<code>revert k</code> (annule le k-ième commit le plus récent — k=1 le dernier — en ajoutant un ' +
      'commit <code>Revert: msg</code> ; si l’historique a moins de k commits, affiche ' +
      '<code>inaccessible</code>), ou <code>log</code> (comme au chapitre : du plus récent au plus ' +
      'ancien, <code>SHA msg</code>, SHA a1, a2… par ordre de création).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  # À compléter : revert empile un commit de plus.
done
`,
    hints: [
      'revert k : l’index du commit visé est total - k dans le tableau (k=1 → dernier).',
      'Le commit de revert porte le message Revert: suivi du message annulé, et consomme un SHA.'
    ],
    examples: [
      { stdin: '4\ncommit init\ncommit ajout\nrevert 1\nlog\n', expected: 'a3 Revert: ajout\na2 ajout\na1 init', note: 'Revert garde la trace : a2 reste dans l\'historique, l\'annulation s\'empile au-dessus.' }
    ],
    tests: [
      { label: 'Revert inaccessible', stdin: '2\nrevert 3\nlog\n', expected: 'inaccessible' },
      { label: 'Revert du milieu', stdin: '5\ncommit un\ncommit deux\ncommit trois\nrevert 2\nlog\n', expected: 'a4 Revert: deux\na3 trois\na2 deux\na1 un' },
      { label: 'Deux reverts', stdin: '5\ncommit un\ncommit deux\nrevert 1\nrevert 1\nlog\n', expected: 'a4 Revert: Revert: deux\na3 Revert: deux\na2 deux\na1 un' }
    ],
    solution: `read -r n
shas=()
msgs=()
numero=0
for ((i=0; i<n; i++)); do
  read -r op reste
  if [ "$op" = "commit" ]; then
    numero=$((numero + 1))
    shas+=("a$numero")
    msgs+=("$reste")
  elif [ "$op" = "revert" ]; then
    total=\${#shas[@]}
    if [ "$reste" -gt "$total" ] || [ "$total" = "0" ]; then
      echo "inaccessible"
    else
      idx=$((total - reste))
      cible="\${msgs[$idx]}"
      numero=$((numero + 1))
      shas+=("a$numero")
      msgs+=("Revert: $cible")
    fi
  elif [ "$op" = "log" ]; then
    total=\${#shas[@]}
    for ((k=total - 1; k>=0; k--)); do
      echo "\${shas[$k]} \${msgs[$k]}"
    done
  fi
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Branches : créer, basculer, fusionner
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gt-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Créer et basculer',
    goal: 'Simuler git branch et git checkout : la branche courante et la liste des branches.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>branch nom</code> (crée une branche ; ' +
      'si elle existe déjà, affiche <code>existe</code>), <code>checkout nom</code> (basculer ; si la ' +
      'branche n’existe pas, affiche <code>inconnue</code>), ou <code>branches</code> (affiche la liste ' +
      'des branches, une par ligne, dans l’ordre de création, la courante marquée d’une étoile : ' +
      '<code>* nom</code>).</p>',
    starter: `read -r n
branches=(main)
courante=main
for ((i=0; i<n; i++)); do
  read -r op nom
  # À compléter : créer, basculer, lister.
done
`,
    hints: [
      'Le dépôt démarre avec une branche main, qui est la courante.',
      'Pour lister : étoile si le nom vaut la courante, deux espaces sinon.'
    ],
    examples: [
      { stdin: '4\nbranch feature\ncheckout feature\nbranches\ncheckout main\n', expected: '  main\n* feature' }
    ],
    tests: [
      { label: 'Branche doublon', stdin: '2\nbranch main\nbranches\n', expected: 'existe\n* main' },
      { label: 'Checkout inconnu', stdin: '2\ncheckout ghost\nbranches\n', expected: 'inconnue\n* main' },
      { label: 'Trois branches', stdin: '5\nbranch a\nbranch b\ncheckout a\nbranches\ncheckout b\n', expected: '  main\n* a\n  b' }
    ],
    solution: `read -r n
branches=(main)
courante=main
for ((i=0; i<n; i++)); do
  read -r op nom
  if [ "$op" = "branch" ]; then
    deja=0
    for b in "\${branches[@]}"; do
      [ "$b" = "$nom" ] && deja=1
    done
    if [ "$deja" = "1" ]; then
      echo "existe"
    else
      branches+=("$nom")
    fi
  elif [ "$op" = "checkout" ]; then
    existe=0
    for b in "\${branches[@]}"; do
      [ "$b" = "$nom" ] && existe=1
    done
    if [ "$existe" = "1" ]; then
      courante="$nom"
    else
      echo "inconnue"
    fi
  elif [ "$op" = "branches" ]; then
    for b in "\${branches[@]}"; do
      if [ "$b" = "$courante" ]; then
        echo "* $b"
      else
        echo "  $b"
      fi
    done
  fi
done
`
  },
  {
    id: 'gt-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Commits par branche',
    goal: 'Chaque branche garde son propre historique : compter les commits par branche.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>branch nom</code> (crée, sans ' +
      'bascule), <code>checkout nom</code> (bascule), ou <code>commit</code> (ajoute un commit sur la ' +
      'branche courante). Puis il affiche, dans l’ordre de création des branches, ' +
      '<code>nom : K</code> pour chacune. Toute branche démarre avec le nombre de commits de la branche ' +
      'depuis laquelle elle est créée (checkout courant au moment du branch).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op nom
  # À compléter : hériter le compte à la création, incrémenter la courante.
done
# À compléter : afficher les comptes.
`,
    hints: [
      'Deux tableaux parallèles : noms des branches et leurs comptes de commits.',
      'À la création : le compte de la nouvelle branche est celui de la courante (historique hérité).'
    ],
    examples: [
      { stdin: '7\ncommit\ncommit\nbranch feature\ncheckout feature\ncommit\ncommit\nbilan\n', expected: 'main : 2\nfeature : 4', note: 'feature hérite des 2 commits de main à sa création, puis en gagne 2.' }
    ],
    tests: [
      { label: 'Sans branche', stdin: '2\ncommit\nbilan\n', expected: 'main : 1' },
      { label: 'Retour sur main', stdin: '7\ncommit\nbranch f\ncheckout f\ncommit\ncheckout main\ncommit\nbilan\n', expected: 'main : 2\nf : 2' },
      { label: 'Branche de branche', stdin: '7\ncommit\ncommit\nbranch a\ncheckout a\ncommit\nbranch b\nbilan\n', expected: 'main : 2\na : 3\nb : 3' }
    ],
    solution: `read -r n
noms=(main)
comptes=(0)
courante=0
for ((i=0; i<n; i++)); do
  read -r op nom
  if [ "$op" = "commit" ]; then
    comptes[$courante]=$(( \${comptes[$courante]} + 1 ))
  elif [ "$op" = "branch" ]; then
    noms+=("$nom")
    comptes+=("\${comptes[$courante]}")
  elif [ "$op" = "checkout" ]; then
    for idx in "\${!noms[@]}"; do
      [ "\${noms[$idx]}" = "$nom" ] && courante=$idx
    done
  elif [ "$op" = "bilan" ]; then
    for idx in "\${!noms[@]}"; do
      echo "\${noms[$idx]} : \${comptes[$idx]}"
    done
  fi
done
`
  },
  {
    id: 'gt-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'merge et conflit',
    goal: 'Simuler la fusion de deux branches et détecter le conflit sur fichier commun.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>branch nom</code> + bascule ' +
      'immédiate (comme checkout -b), <code>checkout nom</code>, <code>touch fichier</code> (modifie un ' +
      'fichier sur la branche courante), <code>commit</code> (valide les modifications de la branche ' +
      'courante), ou <code>merge nom</code>. La fusion réussit (<code>fast-forward</code>) si les deux ' +
      'branches n’ont modifié aucun fichier en commun depuis leur séparation ; elle échoue ' +
      '(<code>conflit</code>) si un même fichier a été modifié des deux côtés. La fusion ramène sur la ' +
      'branche cible. Une branche créée hérite des fichiers modifiés non commités ? Non : chaque ' +
      '<code>touch</code> ne concerne que la branche courante.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op a
  # À compléter : suivre par branche les fichiers touchés, puis comparer.
done
`,
    hints: [
      'Une clé composée branche:fichier dans un tableau associatif décrit qui a touché quoi.',
      'Au merge : parcourir les fichiers de la branche fusionnée ; si l’un existe aussi côté cible, conflit.'
    ],
    examples: [
      { stdin: '7\nbranch feature\ntouch taches.py\ncommit\ncheckout main\ntouch main.py\ncommit\nmerge feature\n', expected: 'fast-forward' }
    ],
    tests: [
      { label: 'Conflit sur main.py', stdin: '7\nbranch feature\ntouch main.py\ncommit\ncheckout main\ntouch main.py\ncommit\nmerge feature\n', expected: 'conflit' },
      { label: 'Fichiers distincts', stdin: '7\nbranch f\ntouch a\ncommit\ncheckout main\ntouch b\ncommit\nmerge f\n', expected: 'fast-forward' },
      { label: 'Merge sans rien', stdin: '3\nbranch vide\ncheckout main\nmerge vide\n', expected: 'fast-forward' }
    ],
    solution: `read -r n
branches=(main)
courante=main
declare -A touche
for ((i=0; i<n; i++)); do
  read -r op a
  if [ "$op" = "branch" ]; then
    branches+=("$a")
    courante="$a"
  elif [ "$op" = "checkout" ]; then
    courante="$a"
  elif [ "$op" = "touch" ]; then
    touche["$courante:$a"]=1
  elif [ "$op" = "commit" ]; then
    :
  elif [ "$op" = "merge" ]; then
    conflit=0
    for cle in "\${!touche[@]}"; do
      br="\${cle%%:*}"
      fic="\${cle#*:}"
      [ "$br" = "$a" ] && [ -n "\${touche[$courante:$fic]:-}" ] && conflit=1
    done
    if [ "$conflit" = "1" ]; then
      echo "conflit"
    else
      echo "fast-forward"
      courante="$a"
    fi
  fi
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Dépôt distant : clone, push, pull, fetch
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gt-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'push refusé : repartir du pull',
    goal: 'Rejouer le scénario du TP2 : un push sans pull préalable est rejeté par le dépôt distant.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>commit</code> (commit local), ' +
      '<code>pull</code> (récupère l’état du distant : le compteur local s’aligne sur le plus grand des ' +
      'deux compteurs), <code>push</code> — accepté seulement si le local contient tout le distant, ' +
      'c’est-à-dire si aucun commit distant n’a été « appris » après le dernier pull et qu’il y a au ' +
      'moins un commit local à envoyer. Simplification du TP : le push réussit si aucun autre ' +
      'développeur n’a poussé depuis (drapeau <code>distants</code> incrémenté par chaque ' +
      '<code>pull</code> d’un tiers, opération <code>tierce</code>) ; sinon il affiche ' +
      '<code>rejeté</code> et il faut pull puis recommencer. Après chaque push réussi ou refusé, ' +
      'afficher <code>local : K</code> et <code>distant : K</code> (K = commits du dépôt distant).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op
  # À compléter : deux compteurs, un drapeau de fraîcheur.
done
`,
    hints: [
      'Le push n’est jamais possible sans pull si un tiers a poussé entre-temps : le drapeau le retient.',
      'Après un push réussi, local et distant sont égaux : le drapeau de fraîcheur repart à zéro.'
    ],
    examples: [
      { stdin: '4\ncommit\ncommit\npush\ndistant\n', expected: 'local : 2\ndistant : 2\nlocal : 2\ndistant : 2', note: 'Le push affiche l\'état, puis l\'opération distant le redonne.' }
    ],
    tests: [
      { label: 'Push sans commit', stdin: '2\npush\ndistant\n', expected: 'rejeté\nlocal : 0\ndistant : 0\nlocal : 0\ndistant : 0' },
      { label: 'Tiers interposé', stdin: '6\ncommit\ntierce\npush\npull\ncommit\npush\n', expected: 'rejeté\nlocal : 1\ndistant : 1\nlocal : 2\ndistant : 2' },
      { label: 'Double push', stdin: '5\ncommit\npush\ncommit\npush\ndistant\n', expected: 'local : 1\ndistant : 1\nlocal : 2\ndistant : 2\nlocal : 2\ndistant : 2' }
    ],
    solution: `read -r n
local=0
distant=0
frais=1
for ((i=0; i<n; i++)); do
  read -r op
  if [ "$op" = "commit" ]; then
    local=$((local + 1))
  elif [ "$op" = "tierce" ]; then
    distant=$((distant + 1))
    frais=0
  elif [ "$op" = "pull" ]; then
    if [ "$distant" -gt "$local" ]; then
      local="$distant"
    fi
    frais=1
  elif [ "$op" = "push" ]; then
    if [ "$local" -gt "$distant" ] && [ "$frais" = "1" ]; then
      distant="$local"
      echo "local : $local"
      echo "distant : $distant"
    else
      echo "rejeté"
      echo "local : $local"
      echo "distant : $distant"
    fi
  elif [ "$op" = "distant" ]; then
    echo "local : $local"
    echo "distant : $distant"
  fi
done
`
  },
  {
    id: 'gt-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'clone et origin',
    goal: 'Simuler clone : le dépôt local démarre avec tout l’historique du distant.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>commit k</code> (k commits poussés ' +
      'sur le dépôt distant par d’autres), <code>clone</code> (crée le local avec tout le distant), ou ' +
      '<code>etat</code> (affiche <code>local : K</code> / <code>distant : K</code>, ou ' +
      '<code>local : aucun</code> si pas de clone). Un commit après clone reste local jusqu’au push ' +
      '(traité au chapitre 6 — ici, les commits d’un tiers s’ajoutent directement au distant).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op k
  # À compléter : le clone copie tout, les commits distants ne touchent pas le local.
done
`,
    hints: [
      'Un drapeau cloné vaut mieux qu’un test de nil : etat sait quoi répondre.',
      'commit k pendant le clone n’existe pas : k n’arrive qu’avec l’opération commit.'
    ],
    examples: [
      { stdin: '3\ncommit 5\nclone\netat\n', expected: 'local : 5\ndistant : 5' }
    ],
    tests: [
      { label: 'Etat sans clone', stdin: '1\netat\n', expected: 'local : aucun\ndistant : 0' },
      { label: 'Tiers pousse après', stdin: '4\ncommit 2\nclone\ncommit 3\netat\n', expected: 'local : 2\ndistant : 5' },
      { label: 'Clone tardif', stdin: '4\ncommit 1\ncommit 2\nclone\netat\n', expected: 'local : 3\ndistant : 3' }
    ],
    solution: `read -r n
local=""
distant=0
for ((i=0; i<n; i++)); do
  read -r op k
  if [ "$op" = "commit" ]; then
    distant=$((distant + k))
    if [ -n "$local" ]; then
      :
    fi
  elif [ "$op" = "clone" ]; then
    local="$distant"
  elif [ "$op" = "etat" ]; then
    if [ -z "$local" ]; then
      echo "local : aucun"
    else
      echo "local : $local"
    fi
    echo "distant : $distant"
  fi
done
`
  },
  {
    id: 'gt-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'fetch puis merge : le vrai pull',
    goal: 'Décomposer git pull en fetch + merge et montrer ce que chacun met à jour.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>commit</code> (commit local, la ' +
      'copie avance), <code>tierce branche</code> (un tiers pousse k=1 commit sur la branche distante ' +
      'nommée), <code>fetch</code> (copie l’état distant dans les références locales, sans toucher à la ' +
      'branche locale), ou <code>etat</code>. L’état affiche trois lignes : <code>local : K</code>, ' +
      '<code>remote-suivi : K</code> (dernière valeur vue par fetch), <code>distant : K</code>. Après ' +
      'un fetch, remote-suivi rattrape distant ; la branche locale, elle, ne bouge pas.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op a
  # À compléter : trois compteurs de trois espaces différents.
done
`,
    hints: [
      'fetch met à jour remote-suivi mais jamais local : c’est toute la différence avec pull.',
      'tierce fait avancer distant ; fetch rattrape ensuite remote-suivi sur distant.'
    ],
    examples: [
      { stdin: '5\ncommit\ntierce main\nfetch\netat\ncommit\n', expected: 'local : 1\nremote-suivi : 1\ndistant : 1' }
    ],
    tests: [
      { label: 'Sans fetch', stdin: '3\ncommit\ntierce main\netat\n', expected: 'local : 1\nremote-suivi : 0\ndistant : 1' },
      { label: 'Fetch deux fois', stdin: '5\ntierce main\ntierce main\nfetch\nfetch\netat\n', expected: 'local : 0\nremote-suivi : 2\ndistant : 2' },
      { label: 'Le local ne bouge pas', stdin: '5\ncommit\ncommit\ntierce main\nfetch\netat\n', expected: 'local : 2\nremote-suivi : 1\ndistant : 1' }
    ],
    solution: `read -r n
local=0
suivi=0
distant=0
for ((i=0; i<n; i++)); do
  read -r op a
  if [ "$op" = "commit" ]; then
    local=$((local + 1))
  elif [ "$op" = "tierce" ]; then
    distant=$((distant + 1))
  elif [ "$op" = "fetch" ]; then
    suivi="$distant"
  elif [ "$op" = "etat" ]; then
    echo "local : $local"
    echo "remote-suivi : $suivi"
    echo "distant : $distant"
  fi
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Stash, gitignore, archive
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'gt-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'stash : remiser et reprendre',
    goal: 'Simuler git stash / stash pop : les modifications partent en attente puis reviennent.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>modifie</code> (une modification de ' +
      'plus sur la copie), <code>stash</code> (empile toute la copie : elle devient propre), ' +
      '<code>pop</code> (dépile : les modifications remises reviennent ; si la pile est vide, affiche ' +
      '<code>rien à reprendre</code>), ou <code>etat</code> (affiche <code>copie : K</code> et ' +
      '<code>remises : K</code>).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op
  # À compléter : une pile de remises et un compteur de copie.
done
`,
    hints: [
      'stash transfère tout le compteur de copie dans la pile : la copie repart à zéro.',
      'pop rend ce qui était remisé : copie + remise dépilée.'
    ],
    examples: [
      { stdin: '5\nmodifie\nmodifie\nstash\netat\npop\n', expected: 'copie : 0\nremises : 1' }
    ],
    tests: [
      { label: 'Pop vide', stdin: '2\npop\netat\n', expected: 'rien à reprendre\ncopie : 0\nremises : 0' },
      { label: 'Deux remises', stdin: '6\nmodifie\nstash\nmodifie\nmodifie\nstash\netat\n', expected: 'copie : 0\nremises : 2' },
      { label: 'Aller-retour', stdin: '6\nmodifie\nstash\npop\netat\npop\n', expected: 'copie : 1\nremises : 0\nrien à reprendre' }
    ],
    solution: `read -r n
copie=0
remises=()
for ((i=0; i<n; i++)); do
  read -r op
  if [ "$op" = "modifie" ]; then
    copie=$((copie + 1))
  elif [ "$op" = "stash" ]; then
    remises+=("$copie")
    copie=0
  elif [ "$op" = "pop" ]; then
    total=\${#remises[@]}
    if [ "$total" = "0" ]; then
      echo "rien à reprendre"
    else
      dernier=$((total - 1))
      copie=$((copie + \${remises[$dernier]}))
      unset 'remises[dernier]'
      remises=("\${remises[@]}")
    fi
  elif [ "$op" = "etat" ]; then
    echo "copie : $copie"
    echo "remises : \${#remises[@]}"
  fi
done
`
  },
  {
    id: 'gt-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'gitignore : filtrer les adds',
    goal: 'Appliquer les motifs .gitignore aux fichiers ajoutés à l’index.',
    brief: '<p>Le script lit d’abord <strong>g motifs</strong> (un par ligne : un nom exact comme ' +
      '<code>build/</code> filtre le dossier build ; un suffixe comme <code>*.log</code> filtre tout ' +
      'fichier finissant par .log). Puis <strong>n opérations</strong> : <code>add fichier</code> ou ' +
      '<code>index</code>. Un add d’un fichier filtré est refusé avec <code>ignoré</code> ; l’index ' +
      'affiche ses fichiers, un par ligne, dans l’ordre.</p>',
    starter: `read -r g
for ((i=0; i<g; i++)); do
  read -r motif
  # À compléter : retenir les motifs.
done
read -r n
for ((i=0; i<n; i++)); do
  read -r op fichier
  # À compléter : filtrer puis indexer.
done
`,
    hints: [
      'Deux familles de motifs : ceux qui finissent par / (dossier : le fichier commence par ce nom) et ceux qui commencent par * (suffixe).',
      'Un motif exact sans * ni / filtre le fichier de ce nom exact.'
    ],
    examples: [
      { stdin: '2\n*.log\nbuild/\n3\nadd main.py\nadd debug.log\nindex\n', expected: 'ignoré\nmain.py', note: 'debug.log tombe sous le coup de *.log : l\'add est refusé.' }
    ],
    tests: [
      { label: 'Nom exact', stdin: '1\nsecret.txt\n3\nadd secret.txt\nadd code.py\nindex\n', expected: 'ignoré\ncode.py' },
      { label: 'Dossier', stdin: '1\nbuild/\n3\nadd build/output.o\nadd src/main.c\nindex\n', expected: 'ignoré\nsrc/main.c' },
      { label: 'Sans motif', stdin: '1\n0\n2\nadd a\nindex\n', expected: 'a' }
    ],
    solution: `read -r g
motifs=()
for ((i=0; i<g; i++)); do
  read -r motif
  motifs+=("$motif")
done
read -r n
index=()
for ((i=0; i<n; i++)); do
  read -r op fichier
  if [ "$op" = "add" ]; then
    ignore=0
    for motif in "\${motifs[@]}"; do
      case "$motif" in
        */) [ "\${fichier#"\${motif%/}"/}" != "$fichier" ] && ignore=1 ;;
        \\**) [ "\${fichier: -\${#motif} + 1}" = "\${motif:1}" ] && ignore=1 ;;
        *) [ "$fichier" = "$motif" ] && ignore=1 ;;
      esac
    done
    if [ "$ignore" = "1" ]; then
      echo "ignoré"
    else
      index+=("$fichier")
    fi
  elif [ "$op" = "index" ]; then
    for f in "\${index[@]}"; do
      echo "$f"
    done
  fi
done
`
  },
  {
    id: 'gt-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'archive : le rapport de version',
    goal: 'Produire le récapitulatif d’une version : fichiers versionnés, ignorés exclus, taille totale.',
    brief: '<p>Le script lit <strong>n lignes</strong> <code>taille nom</code> (taille en Ko, nom de ' +
      'fichier). Il affiche un rapport : <code>fichiers : K</code>, <code>taille : T</code> (somme des ' +
      'tailles, T en Ko), <code>plus gros : NOM</code> (premier fichier de taille maximale), puis la ' +
      'liste des fichiers de taille strictement supérieure à la moyenne entière (somme ÷ nombre, ' +
      'division entière), un par ligne, dans l’ordre d’entrée — ou rien si aucun.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r taille nom
  # À compléter : cumuler, chercher le max, retenir les fichiers.
done
# À compléter : le rapport complet.
`,
    hints: [
      'La moyenne entière se calcule après la boucle : division entière de la somme par n.',
      'Un tableau parallèle noms/tailles permet un second passage pour la liste.'
    ],
    examples: [
      { stdin: '4\n120 main.py\n30 README.md\n5 logo.png\n220 build.o\n', expected: 'fichiers : 4\ntaille : 375\nplus gros : build.o\nmain.py\nbuild.o' }
    ],
    tests: [
      { label: 'Seul fichier', stdin: '1\n42 seul\n', expected: 'fichiers : 1\ntaille : 42\nplus gros : seul' },
      { label: 'Aucun au-dessus', stdin: '3\n10 a\n10 b\n10 c\n', expected: 'fichiers : 3\ntaille : 30\nplus gros : a' },
      { label: 'Premier max garde', stdin: '3\n50 a\n50 b\n20 c\n', expected: 'fichiers : 3\ntaille : 120\nplus gros : a\na\nb' }
    ],
    solution: `read -r n
noms=()
tailles=()
somme=0
max=0
max_nom=""
for ((i=0; i<n; i++)); do
  read -r taille nom
  noms+=("$nom")
  tailles+=("$taille")
  somme=$((somme + taille))
  if [ "$taille" -gt "$max" ]; then
    max="$taille"
    max_nom="$nom"
  fi
done
echo "fichiers : $n"
echo "taille : $somme"
echo "plus gros : $max_nom"
if [ "$n" -gt 0 ]; then
  moyenne=$((somme / n))
  for idx in "\${!noms[@]}"; do
    [ "\${tailles[$idx]}" -gt "$moyenne" ] && echo "\${noms[$idx]}"
  done
fi
exit 0
`
  }
];
