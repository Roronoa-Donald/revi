/**
 * server/exercises/b1-git.js — catalogue d'exercices du cours « Git B1 ».
 *
 * Chapitre 1 conserve les fiches d'introduction et de statut classé (`gt-c1-e1`,
 * `gt-c1-e3`), tandis que `gt-c1-e2` et tous les chapitres 2 à 6 exécutent de
 * véritables commandes Git (`git init`, `config`, `add`, `commit`, `reset`,
 * `log`, `revert`, `branch`, `checkout`, `merge`, `clone`, `push`, `pull`,
 * `fetch`, `stash`, `.gitignore`, `archive`) dans un dépôt temporaire isolé.
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
      "Couper l’opération et son argument : read -r op reste lit le premier mot puis tout le reste de la ligne.",
      "Deux drapeaux suffisent pour la config : un pour user.name, un pour user.email.",
      "init mémorise le nom et annonce la création ; config lève le drapeau de sa clé ; status affiche le dépôt (aucun sans init) puis config : ok si les deux drapeaux sont levés, sinon manquant."
    ],
    takeaway: 'Avant tout commit, un dépôt Git doit être initialisé et disposer de user.name et user.email.',
    examples: [
      { stdin: '4\ninit gestion_taches\nconfig user.name Alice\nstatus\nconfig user.email a@x.fr\n', expected: 'dépôt gestion_taches créé\ndépôt : gestion_taches\nconfig : manquant' }
    ],
    tests: [
      { label: 'Status avant init', stdin: '1\nstatus\n', expected: 'dépôt : aucun\nconfig : manquant' },
      { label: 'Config complète', stdin: '4\ninit projet\nconfig user.name Bob\nconfig user.email b@x.fr\nstatus\n', expected: 'dépôt projet créé\ndépôt : projet\nconfig : ok' },
      { label: 'Status répété', stdin: '3\ninit depot\nstatus\nstatus\n', expected: 'dépôt depot créé\ndépôt : depot\nconfig : manquant\ndépôt : depot\nconfig : manquant' },
      { label: 'Identité partielle puis complète', stdin: '5\ninit atelier\nconfig user.name Nora\nstatus\nconfig user.email n@x\nstatus\n', expected: 'dépôt atelier créé\ndépôt : atelier\nconfig : manquant\ndépôt : atelier\nconfig : ok' },
      { label: 'Configuration inconnue en dernier', stdin: '2\ninit autre\nconfig core.editor vim\n', expected: 'dépôt autre créé' }
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
exit 0
`
  },
  {
    id: 'gt-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Identité git config et refus de commit',
    goal: 'Exécuter de vraies commandes git config et git commit pour vérifier le blocage sans identité.',
    brief: '<p>Dans un vrai dépôt Git temporaire initialisé avec <code>user.useConfigOnly=true</code>, ' +
      'le script lit <strong>n opérations</strong> : <code>config cle valeur</code> (exécute ' +
      '<code>git config</code>), ou <code>commit msg</code> (ajoute une ligne à <code>journal.txt</code>, ' +
      'l’indexe puis tente <code>git commit -q -m ...</code>). Si <code>git commit</code> réussit, ' +
      'affichez <code>[main SHA] msg</code> avec le rang du commit réel sur 4 chiffres (0001, 0002…) ; ' +
      'sinon affichez <code>erreur : identité manquante</code>.</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.useConfigOnly true

read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  # À compléter : git config cle valeur ; ou echo/git add/git commit -q -m "$reste"
done
`,
    hints: [
      "Pour configurer avec git config, séparez la clé (reste%% *) et la valeur (reste#* ).",
      "Avant chaque git commit, modifiez et indexez un fichier (echo \"$i\" >> journal.txt && git add journal.txt) pour qu’il y ait un changement à valider.",
      "Récupérez le nombre réel de commits créés avec git rev-list --count HEAD après un git commit réussi."
    ],
    takeaway: 'Sans user.name et user.email configurés via git config, la commande git commit refuse de signer l’auteur et échoue.',
    examples: [
      { stdin: '4\nconfig user.name Alice\nconfig user.email a@x.fr\ncommit init\ncommit second\n', expected: '[main 0001] init\n[main 0002] second' }
    ],
    tests: [
      { label: 'Sans identité', stdin: '1\ncommit premier\n', expected: 'erreur : identité manquante' },
      { label: 'Nom seul', stdin: '3\nconfig user.name Bob\ncommit un\nconfig user.email b@x.fr\n', expected: 'erreur : identité manquante' },
      { label: 'Trois commits', stdin: '5\nconfig user.name A\nconfig user.email a@x\ncommit un\ncommit deux\ncommit trois\n', expected: '[main 0001] un\n[main 0002] deux\n[main 0003] trois' },
      { label: 'Refus sans consommation du numéro', stdin: '4\ncommit avant\nconfig user.name C\nconfig user.email c@x\ncommit apres\n', expected: 'erreur : identité manquante\n[main 0001] apres' },
      { label: 'Nom configuré en dernier', stdin: '2\nconfig user.email p@x\nconfig user.name Paul\n', expected: '' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.useConfigOnly true

read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  if [ "$op" = "config" ]; then
    cle="\${reste%% *}"
    val="\${reste#* }"
    git config "$cle" "$val"
  elif [ "$op" = "commit" ]; then
    echo "$i:$reste" >> journal.txt
    git add journal.txt
    if git commit -q -m "$reste" >/dev/null 2>&1; then
      numero=$(git rev-list --count HEAD)
      printf '[main %04d] %s\\n' "$numero" "$reste"
    else
      git reset -q -- journal.txt >/dev/null 2>&1 || true
      echo "erreur : identité manquante"
    fi
  fi
done
exit 0
`
  },
  {
    id: 'gt-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'git status classé',
    goal: 'Simuler des compteurs de fichiers non suivis, modifiés et indexés inspirés de git status.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>cree fichier</code> (fichier non ' +
      'suivi), <code>modifie fichier</code>, ' +
      '<code>add fichier</code>, ou <code>status</code>. Le status affiche trois lignes : ' +
      '<code>non suivis : K</code>, <code>modifies : K</code>, <code>indexes : K</code> — K étant le ' +
      'nombre de fichiers de chaque catégorie. Une modification d’un fichier non suivi ne change pas ' +
      'sa catégorie ; un fichier inconnu est ignoré. Après <code>add</code>, une nouvelle modification ' +
      'laisse le fichier indexé et le compte aussi parmi les modifiés ; un nouvel <code>add</code> ' +
      'efface cette modification. Les catégories indexé et modifié peuvent donc se recouper. ' +
      'Ce modèle ne représente ni les commits ni les suppressions.</p>',
    starter: `read -r nombre
declare -A etat modification
non_suivis=0
modifies=0
indexes=0
for ((numero=0; numero<nombre; numero++)); do
  read -r op fichier
  # À compléter : suivre l'état de chaque fichier et les trois comptes.
done
`,
    hints: [
      "Un fichier peut avoir une version indexée et, en même temps, une modification dans la copie de travail.",
      "Une modification sur un fichier non suivi le laisse non suivi ; un nouvel add actualise sa version indexée.",
      "cree rend le fichier non suivi ; add le fait passer à indexé ; modifie ne compte un modifié que si le fichier est déjà indexé ; status imprime les trois compteurs dans l’ordre."
    ],
    takeaway: 'Un même fichier peut être à la fois indexé pour le prochain commit et modifié à nouveau dans le répertoire de travail.',
    examples: [
      { stdin: '6\ncree main.py\ncree README.md\nadd main.py\nmodifie main.py\nstatus\nadd README.md\n', expected: 'non suivis : 1\nmodifies : 1\nindexes : 1', note: 'main.py reste indexé et possède aussi une modification ; README.md reste non suivi au status.' }
    ],
    tests: [
      { label: 'Tout indexé', stdin: '4\ncree a\ncree b\nadd a\nstatus\n', expected: 'non suivis : 1\nmodifies : 0\nindexes : 1' },
      { label: 'Modifie ignoré', stdin: '3\nmodifie fantome\ncree x\nstatus\n', expected: 'non suivis : 1\nmodifies : 0\nindexes : 0' },
      { label: 'Add double ignoré', stdin: '4\ncree a\nadd a\nadd a\nstatus\n', expected: 'non suivis : 0\nmodifies : 0\nindexes : 1' },
      { label: 'Indexé et modifié', stdin: '4\ncree a\nadd a\nmodifie a\nstatus\n', expected: 'non suivis : 0\nmodifies : 1\nindexes : 1' },
      { label: 'Modification avant et après add', stdin: '6\ncree a\nmodifie a\nstatus\nadd a\nmodifie a\nstatus\n', expected: 'non suivis : 1\nmodifies : 0\nindexes : 0\nnon suivis : 0\nmodifies : 1\nindexes : 1' },
      { label: 'Réindexation et fichier inconnu', stdin: '7\ncree a\nadd a\nmodifie a\nadd a\nstatus\nadd fantome\nstatus\n', expected: 'non suivis : 0\nmodifies : 0\nindexes : 1\nnon suivis : 0\nmodifies : 0\nindexes : 1' },
      { label: 'Modifications distinctes et répétées', stdin: '11\ncree doc\ncree note\nadd doc\nadd note\nmodifie doc\nmodifie note\nmodifie note\nadd doc\nstatus\nadd note\nstatus\n', expected: 'non suivis : 0\nmodifies : 1\nindexes : 2\nnon suivis : 0\nmodifies : 0\nindexes : 2' }
    ],
    solution: `read -r nombre
declare -A etat modification
non_suivis=0
modifies=0
indexes=0
for ((numero=0; numero<nombre; numero++)); do
  read -r op fichier
  if [ "$op" = "status" ]; then
    echo "non suivis : $non_suivis"
    echo "modifies : $modifies"
    echo "indexes : $indexes"
    continue
  fi
  if [ -z "$fichier" ]; then continue; fi
  courant="\${etat[$fichier]:-}"
  if [ "$op" = "cree" ]; then
    if [ -z "$courant" ]; then
      etat[$fichier]="non_suivi"
      non_suivis=$((non_suivis + 1))
    fi
  elif [ "$op" = "modifie" ]; then
    if [ "$courant" = "indexe" ] && [ "\${modification[$fichier]:-0}" = "0" ]; then
      modification[$fichier]=1
      modifies=$((modifies + 1))
    fi
  elif [ "$op" = "add" ]; then
    if [ "$courant" = "non_suivi" ]; then
      non_suivis=$((non_suivis - 1))
      etat[$fichier]="indexe"
      modification[$fichier]=0
      indexes=$((indexes + 1))
    elif [ "$courant" = "indexe" ] && [ "\${modification[$fichier]:-0}" = "1" ]; then
      modification[$fichier]=0
      modifies=$((modifies - 1))
    fi
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
    title: 'Cycle réel git add / git commit',
    goal: 'Exécuter git add et git commit sur un vrai dépôt et observer l’index avec git diff --cached.',
    brief: '<p>Dans un vrai dépôt Git temporaire avec identité configurée, le script lit <strong>n opérations</strong> : ' +
      '<code>add fichier</code> (crée/modifie le fichier puis exécute <code>git add</code>), ' +
      '<code>commit</code> (valide l’index avec <code>git commit -q -m "maj"</code> s’il n’est pas vide), ' +
      'ou <code>compte</code>. Le compte affiche <code>index : K</code> (fichiers actuellement en zone d’index via ' +
      '<code>git diff --cached --name-only</code>) et <code>commits : C</code> (nombre de commits dans l’historique via ' +
      '<code>git rev-list --count HEAD</code>, ou <code>0</code> avant le premier commit).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r op fichier
  # À compléter : créer & git add, git commit si index non vide, afficher index et commits.
done
`,
    hints: [
      "Avant git add \"$fichier\", assurez-vous que le fichier existe et contient du texte (echo \"$i\" > \"$fichier\").",
      "Un git commit sans --allow-empty échoue quand l’index est vide : testez git diff --cached --quiet avant d’exécuter git commit -q -m \"maj\".",
      "git diff --cached --name-only | wc -l donne le nombre exact de fichiers actuellement dans l’index."
    ],
    takeaway: 'git add place les modifications dans la zone d’index (staging), puis git commit enregistre cet index en un commit et le vide.',
    examples: [
      { stdin: '6\nadd a\nadd b\ncommit\nadd c\ncompte\ncommit\n', expected: 'index : 1\ncommits : 1', note: 'Premier commit créé (commits=1) puis c est mis en index (index=1).' }
    ],
    tests: [
      { label: 'Rien de commité', stdin: '3\nadd a\nadd b\ncompte\n', expected: 'index : 2\ncommits : 0' },
      { label: 'Deux commits', stdin: '5\nadd a\ncommit\nadd b\ncommit\ncompte\n', expected: 'index : 0\ncommits : 2' },
      { label: 'Index vidé après commit', stdin: '4\nadd a\nadd b\ncommit\ncompte\n', expected: 'index : 0\ncommits : 1' },
      { label: 'Commit avec index vide ignoré', stdin: '4\ncommit\nadd plan\ncommit\ncompte\n', expected: 'index : 0\ncommits : 1' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r op fichier
  if [ "$op" = "add" ]; then
    echo "$i" > "$fichier"
    git add "$fichier"
  elif [ "$op" = "commit" ]; then
    git diff --cached --quiet || git commit -q -m "maj-$i"
  elif [ "$op" = "compte" ]; then
    idx=$(git diff --cached --name-only | wc -l | tr -d ' ')
    c=$(git rev-list --count HEAD 2>/dev/null || echo 0)
    echo "index : $idx"
    echo "commits : $c"
  fi
done
exit 0
`
  },
  {
    id: 'gt-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Retirer de l’index avec git reset HEAD',
    goal: 'Utiliser git reset -q HEAD -- <fichier> sur un vrai dépôt pour désindexer un fichier sans perdre son contenu.',
    brief: '<p>Dans un vrai dépôt initialisé avec un commit racine <code>init</code>, le script lit <strong>n opérations</strong> : ' +
      '<code>add fichier</code> (crée/modifie le fichier et exécute <code>git add</code>), ' +
      '<code>reset fichier</code> (retire le fichier de l’index avec <code>git reset -q HEAD -- fichier</code> ; s’il n’est pas dans l’index, ' +
      'affiche <code>non indexé</code>), ou <code>index</code> (affiche <code>git diff --cached --name-only</code>, trié par chemin comme l’index Git réel).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
git commit --allow-empty -q -m "init"

read -r n
for ((i=0; i<n; i++)); do
  read -r op fichier
  # À compléter : git add, test de présence + git reset -q HEAD --, git diff --cached --name-only.
done
`,
    hints: [
      "Vérifiez si fichier figure dans la zone d’index avec git diff --cached --name-only | grep -Fxq \"$fichier\".",
      "Exécutez git reset -q HEAD -- \"$fichier\" uniquement s’il est indexé ; sinon affichez « non indexé ».",
      "L’index Git trie naturellement les chemins par ordre lexicographique : git diff --cached --name-only suffit pour l’opération index."
    ],
    takeaway: 'git reset HEAD -- <fichier> retire le fichier de la zone d’index tout en conservant sa version dans le répertoire de travail.',
    examples: [
      { stdin: '6\nadd b\nadd a\nreset a\nindex\nadd c\nindex\n', expected: 'b\nb\nc', note: 'Premier index : b ; second index trié : b puis c.' }
    ],
    tests: [
      { label: 'Reset fichier absent', stdin: '2\nreset x\nindex\n', expected: 'non indexé' },
      { label: 'Reset puis ré-add', stdin: '5\nadd a\nreset a\nadd a\nindex\nreset a\n', expected: 'a' },
      { label: 'Retrait au milieu de trois fichiers', stdin: '5\nadd a\nadd b\nadd c\nreset b\nindex\n', expected: 'a\nc' },
      { label: 'Réajout et reset inconnu', stdin: '7\nadd src\nadd doc\nreset doc\nadd doc\nindex\nreset absent\nindex\n', expected: 'doc\nsrc\nnon indexé\ndoc\nsrc' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
git commit --allow-empty -q -m "init"

read -r n
for ((i=0; i<n; i++)); do
  read -r op fichier
  if [ "$op" = "add" ]; then
    echo "$i" > "$fichier"
    git add "$fichier"
  elif [ "$op" = "reset" ]; then
    if git diff --cached --name-only | grep -Fxq "$fichier"; then
      git reset -q HEAD -- "$fichier"
    else
      echo "non indexé"
    fi
  elif [ "$op" = "index" ]; then
    git diff --cached --name-only
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
    title: 'Messages de commit disciplinés et commit réel',
    goal: 'Contrôler la convention d’un message avant de l’enregistrer avec git commit --allow-empty.',
    brief: '<p>Le script lit <strong>n lignes</strong> de messages proposés. Pour chacun il affiche <code>ok</code> ' +
      '(et exécute <code>git commit --allow-empty -q -m "$ligne"</code> dans un dépôt Git temporaire) si : ' +
      'le message commence par une majuscule, fait au plus 50 caractères et ne finit pas par un point. ' +
      'Sinon il refuse le commit et affiche le premier motif fautif : <code>majuscule</code>, ' +
      '<code>longueur</code> ou <code>point final</code>. Après la boucle, affichez ' +
      '<code>commits : K</code> en lisant le compte réel via <code>git rev-list --count HEAD</code>.</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r ligne
  # À compléter : valider selon majuscule, <=50, sans point final ; commiter si ok.
done
# À compléter : afficher commits : K via git rev-list --count HEAD.
`,
    hints: [
      "Premier caractère : ${ligne:0:1} testé contre [[:upper:]] ; longueur : ${#ligne} ; dernier caractère : ${ligne: -1}.",
      "En cas de succès, créez réellement le commit avec git commit --allow-empty -q -m \"$ligne\".",
      "Attention si aucun commit n’a réussi : git rev-list --count HEAD échoue sans HEAD, utilisez || echo 0."
    ],
    takeaway: 'Un hook commit-msg applique les règles de qualité (majuscule, ≤ 50 caractères, pas de point final) avant d’autoriser git commit.',
    examples: [
      { stdin: '3\nInitialisation du projet\najout du point d entrée\nAjout du point d entrée.\n', expected: 'ok\nmajuscule\npoint final\ncommits : 1' }
    ],
    tests: [
      { label: 'Trop long', stdin: '1\nUn message de commit beaucoup trop long pour la convention des cinquante\n', expected: 'longueur\ncommits : 0' },
      { label: 'Juste à la limite', stdin: '1\nAjout du fichier gitignore pour les caches python\n', expected: 'ok\ncommits : 1' },
      { label: 'Priorité majuscule', stdin: '2\npremier commit beaucoup trop long pour passer dans les cinquante caractères\ncorrect.\n', expected: 'majuscule\nmajuscule\ncommits : 0' },
      { label: 'Majuscule, point et 50 caractères exacts', stdin: '4\n4 titres\nAjout.\n' + 'B' + 'y'.repeat(49) + '\nEcrit\n', expected: 'majuscule\npoint final\nok\nok\ncommits : 2' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r ligne
  premiere="\${ligne:0:1}"
  dernier="\${ligne: -1}"
  if [[ "$premiere" != [[:upper:]] ]]; then
    echo "majuscule"
  elif [ "\${#ligne}" -gt 50 ]; then
    echo "longueur"
  elif [ "$dernier" = "." ]; then
    echo "point final"
  else
    echo "ok"
    git commit --allow-empty -q -m "$ligne"
  fi
done
echo "commits : $(git rev-list --count HEAD 2>/dev/null || echo 0)"
exit 0
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
    title: 'git log --format=%s réel',
    goal: 'Construire un vrai historique de commits avec git commit et le lire avec git log.',
    brief: '<p>Dans un vrai dépôt Git temporaire, le script lit <strong>n opérations</strong> : ' +
      '<code>commit msg</code> (enregistre <code>git commit --allow-empty -q -m "$msg"</code>), ' +
      'ou <code>log</code> (affiche l’historique du plus récent au plus ancien avec <code>git log --format="%s"</code>, ' +
      'un message par ligne ; rien si le dépôt ne contient encore aucun commit).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  # À compléter : git commit --allow-empty et git log --format="%s".
done
`,
    hints: [
      "Utilisez git commit --allow-empty -q -m \"$reste\" pour créer des commits sans modifier de fichiers.",
      "git log --format=\"%s\" affiche les titres de commits du plus récent au plus ancien.",
      "Avant le premier commit, HEAD n’existe pas : protégez git log avec 2>/dev/null || true."
    ],
    takeaway: 'git log parcourt l’historique du commit le plus récent (HEAD) vers le commit racine ; --format permet d’en extraire les sujets.',
    examples: [
      { stdin: '5\ncommit init\ncommit ajout\nlog\ncommit fix\nlog\n', expected: 'ajout\ninit\nfix\najout\ninit' }
    ],
    tests: [
      { label: 'Historique vide', stdin: '1\nlog\n', expected: '' },
      { label: 'Un seul commit', stdin: '2\ncommit seul\nlog\n', expected: 'seul' },
      { label: 'Quatre commits', stdin: '5\ncommit un\ncommit deux\ncommit trois\ncommit quatre\nlog\n', expected: 'quatre\ntrois\ndeux\nun' },
      { label: 'Dix commits et log non destructif', stdin: '12\ncommit x1\ncommit x2\ncommit x3\ncommit x4\ncommit x5\ncommit x6\ncommit x7\ncommit x8\ncommit x9\ncommit x10\nlog\nlog\n', expected: 'x10\nx9\nx8\nx7\nx6\nx5\nx4\nx3\nx2\nx1\nx10\nx9\nx8\nx7\nx6\nx5\nx4\nx3\nx2\nx1' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  if [ "$op" = "commit" ]; then
    git commit --allow-empty -q -m "$reste"
  elif [ "$op" = "log" ]; then
    git log --format="%s" 2>/dev/null || true
  fi
done
exit 0
`
  },
  {
    id: 'gt-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'git reset --soft / --mixed / --hard réel',
    goal: 'Observer directement sur un vrai dépôt les effets de --soft, --mixed et --hard sur HEAD, l’index et la copie.',
    brief: '<p>Dans un vrai dépôt initialisé avec un commit racine <code>base</code>, le script lit <strong>n opérations</strong> : ' +
      '<code>commit</code> (ajoute un fichier <code>fK.txt</code> suivi et commité), ' +
      '<code>fichier</code> (modifie le fichier suivi <code>base.txt</code> sans l’indexer), ' +
      '<code>reset option k</code> (<code>option</code> ∈ <code>soft|mixed|hard</code>, recule de <code>k</code> commits utilisateur avec <code>git reset --$option HEAD~$k</code>, borné au nombre de commits utilisateur existants), ' +
      'ou <code>etat</code> (affiche <code>commits : C</code> [commits hors base], <code>index : vide|plein</code> selon <code>git diff --cached --name-only</code>, et <code>copie : propre|modifiée</code> selon <code>git diff --name-only</code> ou fichiers non suivis).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
echo "base" > base.txt
git add base.txt
git commit -q -m "base"

read -r n
for ((i=0; i<n; i++)); do
  read -r op a b
  # À compléter : commit, fichier, git reset --$a HEAD~$k, etat.
done
`,
    hints: [
      "Comptez le nombre réel de commits utilisateur avec $(( $(git rev-list --count HEAD) - 1 )) pour borner k.",
      "git reset --soft garde les différences dans l’index (git diff --cached --name-only non vide) ; --mixed les remet en copie de travail ; --hard les supprime.",
      "Un fichier nouvellement ramené dans la copie de travail par reset --mixed peut apparaître en non suivi (??) dans git status --porcelain : testez aussi les fichiers non suivis pour copie : modifiée."
    ],
    takeaway: '--soft ne recule que HEAD (index conservé), --mixed vide aussi l’index vers la copie, --hard remet aussi la copie au niveau du commit cible.',
    examples: [
      { stdin: '4\ncommit\ncommit\nreset soft 1\netat\n', expected: 'commits : 1\nindex : plein\ncopie : propre' }
    ],
    tests: [
      { label: 'Hard efface la copie', stdin: '4\ncommit\nfichier\nreset hard 0\netat\n', expected: 'commits : 1\nindex : vide\ncopie : propre' },
      { label: 'Mixed vide l index', stdin: '3\ncommit\nreset mixed 1\netat\n', expected: 'commits : 0\nindex : vide\ncopie : modifiée' },
      { label: 'Borne sur trop de commits', stdin: '3\ncommit\nreset soft 5\netat\n', expected: 'commits : 0\nindex : plein\ncopie : propre' },
      { label: 'Mixed sur commit puis fichier', stdin: '4\ncommit\nfichier\nreset mixed 0\netat\n', expected: 'commits : 1\nindex : vide\ncopie : modifiée' },
      { label: 'Soft zéro puis soft 1', stdin: '5\ncommit\nreset soft 0\netat\nreset soft 1\netat\n', expected: 'commits : 1\nindex : vide\ncopie : propre\ncommits : 0\nindex : plein\ncopie : propre' },
      { label: 'Mixed désindexe un soft', stdin: '4\ncommit\nreset soft 1\nreset mixed 0\netat\n', expected: 'commits : 0\nindex : vide\ncopie : modifiée' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
echo "base" > base.txt
git add base.txt
git commit -q -m "base"

step=0
read -r n
for ((i=0; i<n; i++)); do
  read -r op a b
  if [ "$op" = "commit" ]; then
    step=$((step + 1))
    echo "contenu-$step" > "f_$step.txt"
    git add "f_$step.txt"
    git commit -q -m "c$step"
  elif [ "$op" = "fichier" ]; then
    echo "modif-$i" >> base.txt
  elif [ "$op" = "reset" ]; then
    user_commits=$(( $(git rev-list --count HEAD) - 1 ))
    k="$b"
    [ "$k" -gt "$user_commits" ] && k="$user_commits"
    git reset -q "--$a" "HEAD~$k"
  elif [ "$op" = "etat" ]; then
    user_commits=$(( $(git rev-list --count HEAD) - 1 ))
    echo "commits : $user_commits"
    if [ -n "$(git diff --cached --name-only)" ]; then
      echo "index : plein"
    else
      echo "index : vide"
    fi
    if [ -n "$(git status --porcelain | grep -E '^.[MADRCU]|^\\?\\?')" ]; then
      echo "copie : modifiée"
    else
      echo "copie : propre"
    fi
  fi
done
exit 0
`
  },
  {
    id: 'gt-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'git revert --no-edit : annuler avec trace',
    goal: 'Exécuter git revert sur un commit donné pour empiler un vrai commit d’annulation dans l’historique.',
    brief: '<p>Dans un vrai dépôt Git temporaire, le script lit <strong>n opérations</strong> : ' +
      '<code>commit msg</code> (crée un fichier unique <code>f_i.txt</code>, l’indexe et le commite avec <code>$msg</code>), ' +
      '<code>revert k</code> (annule le k-ième commit le plus récent via <code>git revert --no-edit HEAD~$((k - 1))</code> ; si l’historique a moins de k commits, affiche <code>inaccessible</code>), ' +
      'ou <code>log</code> (affiche <code>git log --format="%s"</code>).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  # À compléter : commit sur un fichier distinct, git revert --no-edit HEAD~$((reste - 1)), git log --format="%s".
done
`,
    hints: [
      "Utilisez un nom de fichier différent par commit (doc_$i.txt) pour que git revert sur un commit ancien ne crée pas de conflit.",
      "Si k=1 vise le dernier commit, sa référence Git est HEAD~0 (soit HEAD~$((reste - 1))).",
      "Vérifiez d’abord total=$(git rev-list --count HEAD 2>/dev/null || echo 0) avant d’appeler git revert --no-edit."
    ],
    takeaway: 'git revert crée un nouveau commit qui inverse exactement les changements d’un commit passé sans réécrire l’historique partagé.',
    examples: [
      { stdin: '4\ncommit init\ncommit ajout\nrevert 1\nlog\n', expected: 'Revert "ajout"\najout\ninit', note: 'git revert ajoute un commit Revert "ajout" sans effacer ajout.' }
    ],
    tests: [
      { label: 'Revert inaccessible', stdin: '2\nrevert 3\nlog\n', expected: 'inaccessible' },
      { label: 'Revert du milieu', stdin: '5\ncommit un\ncommit deux\ncommit trois\nrevert 2\nlog\n', expected: 'Revert "deux"\ntrois\ndeux\nun' },
      { label: 'Deux reverts successifs', stdin: '5\ncommit un\ncommit deux\nrevert 1\nrevert 1\nlog\n', expected: 'Reapply "deux"\nRevert "deux"\ndeux\nun' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r op reste
  if [ "$op" = "commit" ]; then
    echo "$reste" > "doc_$i.txt"
    git add "doc_$i.txt"
    git commit -q -m "$reste"
  elif [ "$op" = "revert" ]; then
    total=$(git rev-list --count HEAD 2>/dev/null || echo 0)
    if [ "$reste" -lt 1 ] || [ "$reste" -gt "$total" ]; then
      echo "inaccessible"
    else
      git revert --no-edit "HEAD~$((reste - 1))" >/dev/null 2>&1
    fi
  elif [ "$op" = "log" ]; then
    git log --format="%s" 2>/dev/null || true
  fi
done
exit 0
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
    title: 'git branch et git checkout réels',
    goal: 'Créer des branches, changer de branche courante et lister avec l’étoile réelle de git branch.',
    brief: '<p>Dans un vrai dépôt initialisé avec un commit racine sur <code>main</code>, le script lit <strong>n opérations</strong> : ' +
      '<code>branch nom</code> (exécute <code>git branch "$nom"</code> ; si la branche existe déjà, affiche <code>existe</code>), ' +
      '<code>checkout nom</code> (bascule avec <code>git checkout -q "$nom"</code> ; si inconnue, affiche <code>inconnue</code>), ' +
      'ou <code>branches</code> (exécute directement <code>git branch</code>).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
git commit --allow-empty -q -m "init"

read -r n
for ((i=0; i<n; i++)); do
  read -r op nom
  # À compléter : git branch, git checkout -q, et affichage git branch.
done
`,
    hints: [
      "git branch \"$nom\" retourne un code de sortie non nul si la branche existe déjà : redirigez stderr vers /dev/null et testez son retour.",
      "De même, git checkout -q \"$nom\" >/dev/null 2>&1 échoue si la branche n’existe pas.",
      "git branch sans argument marque automatiquement la branche active avec un astérisque (* ) et trie les autres par ordre alphabétique."
    ],
    takeaway: 'git branch crée et liste les pointeurs de branches ; git checkout (ou switch) déplace HEAD vers la branche choisie.',
    examples: [
      { stdin: '4\nbranch feature\ncheckout feature\nbranches\ncheckout main\n', expected: '* feature\n  main' }
    ],
    tests: [
      { label: 'Branche doublon', stdin: '2\nbranch main\nbranches\n', expected: 'existe\n* main' },
      { label: 'Checkout inconnu', stdin: '2\ncheckout ghost\nbranches\n', expected: 'inconnue\n* main' },
      { label: 'Trois branches', stdin: '5\nbranch alpha\nbranch beta\ncheckout alpha\nbranches\ncheckout beta\n', expected: '* alpha\n  beta\n  main' },
      { label: 'Créer sans basculer', stdin: '4\ncheckout main\nbranch topic\nbranches\ncheckout topic\n', expected: '* main\n  topic' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
git commit --allow-empty -q -m "init"

read -r n
for ((i=0; i<n; i++)); do
  read -r op nom
  if [ "$op" = "branch" ]; then
    git branch "$nom" >/dev/null 2>&1 || echo "existe"
  elif [ "$op" = "checkout" ]; then
    git checkout -q "$nom" >/dev/null 2>&1 || echo "inconnue"
  elif [ "$op" = "branches" ]; then
    git branch
  fi
done
exit 0
`
  },
  {
    id: 'gt-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Commits par branche avec git rev-list',
    goal: 'Vérifier avec de vrais commits sur plusieurs branches que chaque branche hérite de son point de départ.',
    brief: '<p>Dans un vrai dépôt initialisé avec un commit racine <code>init</code> sur <code>main</code>, ' +
      'le script lit <strong>n opérations</strong> : <code>branch nom</code> (<code>git branch "$nom"</code>), ' +
      '<code>checkout nom</code> (<code>git checkout -q "$nom"</code>), <code>commit</code> ' +
      '(<code>git commit --allow-empty -q -m "msg"</code>), ou <code>bilan</code>. À la fin des opérations, affichez ' +
      'pour chaque branche (dans l’ordre de création, en commençant par <code>main</code>) <code>nom : K</code> ' +
      'où K est le nombre de commits hors racine : <code>$(( $(git rev-list --count "$nom") - 1 ))</code>.</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
git commit --allow-empty -q -m "init"

branches=(main)
read -r n
for ((i=0; i<n; i++)); do
  read -r op nom
  # À compléter : branch, checkout, commit.
done
# À compléter : afficher nom : $(( $(git rev-list --count "$b") - 1 )) pour chaque branche.
`,
    hints: [
      "Mémorisez l’ordre de création dans le tableau branches=() chaque fois que branch crée une nouvelle branche.",
      "commit s’exécute directement via git commit --allow-empty -q -m \"c-$i\" sur la branche active.",
      "git rev-list --count \"$b\" compte les commits accessibles depuis la pointe de la branche b, racine incluse."
    ],
    takeaway: 'Une nouvelle branche part du commit courant (historique hérité), puis seuls les commits créés sur elle font avancer son propre historique.',
    examples: [
      { stdin: '7\ncommit\ncommit\nbranch feature\ncheckout feature\ncommit\ncommit\nbilan\n', expected: 'main : 2\nfeature : 4', note: 'feature hérite des 2 commits de main puis en reçoit 2 propres.' }
    ],
    tests: [
      { label: 'Sans branche', stdin: '2\ncommit\nbilan\n', expected: 'main : 1' },
      { label: 'Retour sur main', stdin: '7\ncommit\nbranch f\ncheckout f\ncommit\ncheckout main\ncommit\nbilan\n', expected: 'main : 2\nf : 2' },
      { label: 'Branche de branche', stdin: '7\ncommit\ncommit\nbranch a\ncheckout a\ncommit\nbranch b\nbilan\n', expected: 'main : 2\na : 3\nb : 3' },
      { label: 'Branch sans bascule', stdin: '6\ncommit\nbranch alpha\ncheckout alpha\nbranch beta\ncommit\nbilan\n', expected: 'main : 1\nalpha : 2\nbeta : 1' },
      { label: 'Bilan final implicite', stdin: '3\ncommit\nbranch autre\ncommit\n', expected: 'main : 2\nautre : 1' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
git commit --allow-empty -q -m "init"

branches=(main)
read -r n
for ((i=0; i<n; i++)); do
  read -r op nom
  if [ "$op" = "commit" ]; then
    git commit --allow-empty -q -m "c-$i"
  elif [ "$op" = "branch" ]; then
    git branch "$nom"
    branches+=("$nom")
  elif [ "$op" = "checkout" ]; then
    git checkout -q "$nom"
  fi
done
for b in "\${branches[@]}"; do
  count=$(( $(git rev-list --count "$b") - 1 ))
  echo "$b : $count"
done
exit 0
`
  },
  {
    id: 'gt-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'git merge réel et détection de conflit',
    goal: 'Exécuter un vrai git merge entre deux branches divergentes et observer fast-forward, fusion à 3 voies ou conflit.',
    brief: '<p>Dans un vrai dépôt initialisé avec un commit racine contenant <code>main.py</code>, le script lit <strong>n opérations</strong> : ' +
      '<code>branch nom</code> (<code>git checkout -q -b "$nom"</code>), ' +
      '<code>checkout nom</code> (<code>git checkout -q "$nom"</code>), ' +
      '<code>modifie fichier valeur</code> (remplace le contenu de <code>fichier</code> par <code>valeur</code> et le prépare), ' +
      '<code>commit</code> (<code>git add -A &amp;&amp; git commit -q -m "maj"</code>), ' +
      'ou <code>merge nom</code> (exécute <code>git merge -q --no-edit "$nom"</code>). Si la fusion échoue par conflit, ' +
      'annulez avec <code>git merge --abort</code> et affichez <code>conflit</code> ; sinon affichez <code>fusion réussie</code>.</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
echo "base" > main.py
git add main.py
git commit -q -m "init"

read -r n
for ((i=0; i<n; i++)); do
  read -r op arg1 arg2
  # À compléter : branch (-b), checkout, modifie, commit, et git merge --no-edit.
done
`,
    hints: [
      "modifie ecrit simplement echo \"$arg2\" > \"$arg1\" ; commit fait git add -A && git diff --cached --quiet || git commit -q -m \"maj-$i\".",
      "Pour détecter le conflit réel : if git merge -q --no-edit \"$arg1\" >/dev/null 2>&1; then echo \"fusion réussie\"; else echo \"conflit\"; git merge --abort >/dev/null 2>&1 || true; fi.",
      "Un même fichier modifié avec des valeurs différentes sur deux branches divergentes déclenche un vrai conflit de fusion Git."
    ],
    takeaway: 'git merge réussit automatiquement quand les branches modifient des fichiers ou zones distinctes, mais s’arrête sur conflit quand deux commits changent différemment une même ligne.',
    examples: [
      { stdin: '7\nbranch feature\nmodifie taches.py v1\ncommit\ncheckout main\nmodifie autre.py v2\ncommit\nmerge feature\n', expected: 'fusion réussie' }
    ],
    tests: [
      { label: 'Conflit réel sur main.py', stdin: '7\nbranch feature\nmodifie main.py feat\ncommit\ncheckout main\nmodifie main.py main\ncommit\nmerge feature\n', expected: 'conflit' },
      { label: 'Fichiers distincts', stdin: '7\nbranch f\nmodifie a.txt un\ncommit\ncheckout main\nmodifie b.txt deux\ncommit\nmerge f\n', expected: 'fusion réussie' },
      { label: 'Fast-forward sans commit sur main', stdin: '4\nbranch f\nmodifie app.txt ok\ncommit\ncheckout main\nmerge f\n'.replace(/^4/, '5'), expected: 'fusion réussie' },
      { label: 'Changements identiques sans conflit', stdin: '7\nbranch s\nmodifie main.py meme\ncommit\ncheckout main\nmodifie main.py meme\ncommit\nmerge s\n', expected: 'fusion réussie' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
echo "base" > main.py
git add main.py
git commit -q -m "init"

read -r n
for ((i=0; i<n; i++)); do
  read -r op arg1 arg2
  if [ "$op" = "branch" ]; then
    git checkout -q -b "$arg1"
  elif [ "$op" = "checkout" ]; then
    git checkout -q "$arg1"
  elif [ "$op" = "modifie" ]; then
    echo "$arg2" > "$arg1"
  elif [ "$op" = "commit" ]; then
    git add -A
    git diff --cached --quiet || git commit -q -m "maj-$i"
  elif [ "$op" = "merge" ]; then
    if git merge -q --no-edit "$arg1" >/dev/null 2>&1; then
      echo "fusion réussie"
    else
      echo "conflit"
      git merge --abort >/dev/null 2>&1 || true
    fi
  fi
done
exit 0
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
    title: 'git push refusé puis git pull sur un vrai distant',
    goal: 'Expérimenter un rejet réel de git push lorsque un collègue a poussé sur le dépôt nu, puis synchroniser via git pull.',
    brief: '<p>Deux clones réels (<code>local</code> et <code>tiers</code>) pointent vers un vrai dépôt distant nu (<code>--bare</code>) ' +
      'initialisé avec 1 commit racine. Le script lit <strong>n opérations</strong> : ' +
      '<code>commit</code> (commit local dans <code>local</code>), ' +
      '<code>tierce</code> (un collègue commite et pousse dans <code>tiers</code>), ' +
      '<code>pull</code> (<code>git -C local pull -q --no-rebase --no-edit origin main</code>), ' +
      '<code>push</code> (tente <code>git -C local push -q origin main</code> ; affiche <code>rejeté</code> si le distant refuse puis l’état), ' +
      'ou <code>distant</code>. Chaque affichage imprime <code>local : C</code> et <code>distant : D</code> via <code>git rev-list --count main</code>.</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
git init -q --bare -b main "$WORK/remote.git"
git clone -q "$WORK/remote.git" "$WORK/seed"
git -C "$WORK/seed" config user.name "Seed"
git -C "$WORK/seed" config user.email "seed@campus.fr"
echo "init" > "$WORK/seed/README.md"
git -C "$WORK/seed" add README.md
git -C "$WORK/seed" commit -q -m "init"
git -C "$WORK/seed" push -q origin main

git clone -q "$WORK/remote.git" "$WORK/local"
git -C "$WORK/local" config user.name "Alice"
git -C "$WORK/local" config user.email "alice@campus.fr"
git clone -q "$WORK/remote.git" "$WORK/tiers"
git -C "$WORK/tiers" config user.name "Bob"
git -C "$WORK/tiers" config user.email "bob@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r op
  # À compléter : commit dans local, tierce commit+push dans tiers, pull, push et etat.
done
`,
    hints: [
      "Créez des fichiers différents dans local (local_$i.txt) et tiers (tiers_$i.txt) pour éviter tout conflit durant pull.",
      "git -C \"$WORK/local\" push -q origin main >/dev/null 2>&1 échoue naturellement quand $WORK/remote.git a reçu un commit de $WORK/tiers.",
      "Les comptes réels hors racine valent $(( $(git -C \"$WORK/local\" rev-list --count main) - 1 )) et $(( $(git --git-dir=\"$WORK/remote.git\" rev-list --count main) - 1 ))."
    ],
    takeaway: 'Un git push non fast-forward est rejeté par le serveur distant ; il faut d’abord intégrer les commits distants avec git pull avant de pousser.',
    examples: [
      { stdin: '4\ncommit\ncommit\npush\ndistant\n', expected: 'local : 2\ndistant : 2\nlocal : 2\ndistant : 2', note: 'Les deux commits locaux sont acceptés par le dépôt nu distant.' }
    ],
    tests: [
      { label: 'Push sans avance locale', stdin: '2\npush\ndistant\n', expected: 'local : 0\ndistant : 0\nlocal : 0\ndistant : 0' },
      { label: 'Tiers interposé puis pull', stdin: '6\ncommit\ntierce\npush\npull\npush\ndistant\n', expected: 'rejeté\nlocal : 1\ndistant : 1\nlocal : 3\ndistant : 3\nlocal : 3\ndistant : 3' },
      { label: 'Double push', stdin: '5\ncommit\npush\ncommit\npush\ndistant\n', expected: 'local : 1\ndistant : 1\nlocal : 2\ndistant : 2\nlocal : 2\ndistant : 2' },
      { label: 'Tiers malgré une avance de 2 commits', stdin: '6\ncommit\ncommit\ntierce\npush\npull\npush\n', expected: 'rejeté\nlocal : 2\ndistant : 1\nlocal : 4\ndistant : 4' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
git init -q --bare -b main "$WORK/remote.git"
git clone -q "$WORK/remote.git" "$WORK/seed"
git -C "$WORK/seed" config user.name "Seed"
git -C "$WORK/seed" config user.email "seed@campus.fr"
echo "init" > "$WORK/seed/README.md"
git -C "$WORK/seed" add README.md
git -C "$WORK/seed" commit -q -m "init"
git -C "$WORK/seed" push -q origin main

git clone -q "$WORK/remote.git" "$WORK/local"
git -C "$WORK/local" config user.name "Alice"
git -C "$WORK/local" config user.email "alice@campus.fr"
git clone -q "$WORK/remote.git" "$WORK/tiers"
git -C "$WORK/tiers" config user.name "Bob"
git -C "$WORK/tiers" config user.email "bob@campus.fr"

show_state() {
  local loc rem
  loc=$(( $(git -C "$WORK/local" rev-list --count main) - 1 ))
  rem=$(( $(git --git-dir="$WORK/remote.git" rev-list --count main) - 1 ))
  echo "local : $loc"
  echo "distant : $rem"
}

read -r n
for ((i=0; i<n; i++)); do
  read -r op
  if [ "$op" = "commit" ]; then
    echo "$i" > "$WORK/local/l_$i.txt"
    git -C "$WORK/local" add "l_$i.txt"
    git -C "$WORK/local" commit -q -m "local-$i"
  elif [ "$op" = "tierce" ]; then
    echo "$i" > "$WORK/tiers/t_$i.txt"
    git -C "$WORK/tiers" add "t_$i.txt"
    git -C "$WORK/tiers" commit -q -m "tiers-$i"
    git -C "$WORK/tiers" push -q origin main
  elif [ "$op" = "pull" ]; then
    git -C "$WORK/local" pull -q --no-rebase --no-edit origin main
  elif [ "$op" = "push" ]; then
    if ! git -C "$WORK/local" push -q origin main >/dev/null 2>&1; then
      echo "rejeté"
    fi
    show_state
  elif [ "$op" = "distant" ]; then
    show_state
  fi
done
exit 0
`
  },
  {
    id: 'gt-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'git clone d’un vrai dépôt distant',
    goal: 'Exécuter git clone sur un vrai dépôt distant et constater l’indépendance ultérieure des deux historiques.',
    brief: '<p>Un dépôt distant nu (<code>remote.git</code>) démarre vide (ou avec des commits). Le script lit <strong>n opérations</strong> : ' +
      '<code>commit k</code> (pousse <code>k</code> commits supplémentaires sur le dépôt distant depuis un autre poste), ' +
      '<code>clone</code> (exécute <code>git clone -q remote.git local</code> et configure l’identité), ' +
      'ou <code>etat</code> (affiche <code>local : C</code> ou <code>local : aucun</code> si non cloné, et <code>distant : D</code>).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
git init -q --bare -b main "$WORK/remote.git"
git init -q -b main "$WORK/other"
git -C "$WORK/other" config user.name "Bob"
git -C "$WORK/other" config user.email "bob@campus.fr"
git -C "$WORK/other" remote add origin "$WORK/remote.git"

read -r n
for ((i=0; i<n; i++)); do
  read -r op k
  # À compléter : commit k sur remote via other, git clone vers local, etat via git rev-list.
done
`,
    hints: [
      "Avant le tout premier push depuis other, passez -u origin main pour définir la branche distante.",
      "git clone \"$WORK/remote.git\" \"$WORK/local\" crée un dépôt local séparé dont l’historique n’évolue plus automatiquement quand other pousse.",
      "Si remote.git ou local n’a pas encore de commits, git rev-list --count main || echo 0 retourne 0 sans erreur."
    ],
    takeaway: 'git clone copie l’intégralité de l’historique distant au moment du clonage ; les commits ultérieurs restent séparés jusqu’au prochain fetch ou pull.',
    examples: [
      { stdin: '4\ncommit 3\nclone\ncommit 2\netat\n', expected: 'local : 3\ndistant : 5', note: 'Le clone a figé les 3 commits initiaux ; les 2 suivants n’affectent que le distant.' }
    ],
    tests: [
      { label: 'État avant clone', stdin: '2\ncommit 4\netat\n', expected: 'local : aucun\ndistant : 4' },
      { label: 'Clone immédiat sur 5 commits', stdin: '2\ncommit 5\nclone\n', expected: '' },
      { label: 'Clone puis commits distants', stdin: '4\ncommit 1\nclone\ncommit 3\netat\n', expected: 'local : 1\ndistant : 4' },
      { label: 'Dépôt initial vide', stdin: '2\ncommit 0\netat\n', expected: 'local : aucun\ndistant : 0' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
git init -q --bare -b main "$WORK/remote.git"
git init -q -b main "$WORK/other"
git -C "$WORK/other" config user.name "Bob"
git -C "$WORK/other" config user.email "bob@campus.fr"
git -C "$WORK/other" remote add origin "$WORK/remote.git"

cloned=0
read -r n
for ((i=0; i<n; i++)); do
  read -r op k
  if [ "$op" = "commit" ]; then
    if [ "\${k:-0}" -gt 0 ]; then
      for ((j=0; j<k; j++)); do
        git -C "$WORK/other" commit --allow-empty -q -m "c-$i-$j"
      done
      git -C "$WORK/other" push -q -u origin main
    fi
  elif [ "$op" = "clone" ]; then
    git clone -q "$WORK/remote.git" "$WORK/local"
    cloned=1
  elif [ "$op" = "etat" ]; then
    if [ "$cloned" = "0" ]; then
      echo "local : aucun"
    else
      loc=$(git -C "$WORK/local" rev-list --count HEAD 2>/dev/null || echo 0)
      echo "local : $loc"
    fi
    rem=$(git --git-dir="$WORK/remote.git" rev-list --count main 2>/dev/null || echo 0)
    echo "distant : $rem"
  fi
done
exit 0
`
  },
  {
    id: 'gt-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'git fetch origin vs origin/main vs main',
    goal: 'Observer avec un vrai dépôt que git fetch met à jour origin/main sans modifier la branche locale main.',
    brief: '<p>Un dépôt distant <code>remote.git</code> et deux clones <code>local</code> et <code>tiers</code> démarrent ' +
      'synchronisés à 1 commit racine. Le script lit <strong>n opérations</strong> : <code>commit</code> (commit local dans <code>local</code>), ' +
      '<code>tierce main</code> (commit et push depuis <code>tiers</code>), <code>fetch</code> (exécute ' +
      '<code>git -C local fetch -q origin</code>), ou <code>etat</code>. L’état affiche trois lignes (compteurs hors racine) : ' +
      '<code>local : K</code> (<code>main</code>), <code>remote-suivi : K</code> (<code>origin/main</code>), ' +
      'et <code>distant : K</code> (<code>remote.git</code>).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
git init -q --bare -b main "$WORK/remote.git"
git clone -q "$WORK/remote.git" "$WORK/seed"
git -C "$WORK/seed" config user.name "Seed"
git -C "$WORK/seed" config user.email "seed@campus.fr"
git -C "$WORK/seed" commit --allow-empty -q -m "init"
git -C "$WORK/seed" push -q origin main

git clone -q "$WORK/remote.git" "$WORK/local"
git -C "$WORK/local" config user.name "Alice"
git -C "$WORK/local" config user.email "alice@campus.fr"
git clone -q "$WORK/remote.git" "$WORK/tiers"
git -C "$WORK/tiers" config user.name "Bob"
git -C "$WORK/tiers" config user.email "bob@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r op a
  # À compléter : commit, tierce, git fetch -q origin, et etat sur main / origin/main / remote.git.
done
`,
    hints: [
      "git fetch origin télécharge les objets et met à jour la branche de suivi origin/main, jamais main.",
      "Comparez les comptes de git -C local rev-list --count main et origin/main pour visualiser la divergence.",
      "Soustrayez 1 (le commit racine) à chaque rev-list --count pour obtenir le nombre d’ajouts."
    ],
    takeaway: 'git fetch met à jour les références de suivi (origin/main) sans toucher au travail local, là où git pull enchaîne fetch puis merge.',
    examples: [
      { stdin: '5\ncommit\ntierce main\nfetch\netat\ncommit\n', expected: 'local : 1\nremote-suivi : 1\ndistant : 1' }
    ],
    tests: [
      { label: 'Sans fetch préalable', stdin: '3\ncommit\ntierce main\netat\n', expected: 'local : 1\nremote-suivi : 0\ndistant : 1' },
      { label: 'Double fetch idempotent', stdin: '5\ntierce main\ntierce main\nfetch\nfetch\netat\n', expected: 'local : 0\nremote-suivi : 2\ndistant : 2' },
      { label: 'Le local reste intact après fetch', stdin: '5\ncommit\ncommit\ntierce main\nfetch\netat\n', expected: 'local : 2\nremote-suivi : 1\ndistant : 1' },
      { label: 'Suivi figé entre deux fetch', stdin: '5\ntierce main\ntierce main\nfetch\ntierce main\netat\n', expected: 'local : 0\nremote-suivi : 2\ndistant : 3' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
git init -q --bare -b main "$WORK/remote.git"
git clone -q "$WORK/remote.git" "$WORK/seed"
git -C "$WORK/seed" config user.name "Seed"
git -C "$WORK/seed" config user.email "seed@campus.fr"
git -C "$WORK/seed" commit --allow-empty -q -m "init"
git -C "$WORK/seed" push -q origin main

git clone -q "$WORK/remote.git" "$WORK/local"
git -C "$WORK/local" config user.name "Alice"
git -C "$WORK/local" config user.email "alice@campus.fr"
git clone -q "$WORK/remote.git" "$WORK/tiers"
git -C "$WORK/tiers" config user.name "Bob"
git -C "$WORK/tiers" config user.email "bob@campus.fr"

read -r n
for ((i=0; i<n; i++)); do
  read -r op a
  if [ "$op" = "commit" ]; then
    git -C "$WORK/local" commit --allow-empty -q -m "l-$i"
  elif [ "$op" = "tierce" ]; then
    git -C "$WORK/tiers" commit --allow-empty -q -m "t-$i"
    git -C "$WORK/tiers" push -q origin main
  elif [ "$op" = "fetch" ]; then
    git -C "$WORK/local" fetch -q origin
  elif [ "$op" = "etat" ]; then
    echo "local : $(( $(git -C "$WORK/local" rev-list --count main) - 1 ))"
    echo "remote-suivi : $(( $(git -C "$WORK/local" rev-list --count origin/main) - 1 ))"
    echo "distant : $(( $(git --git-dir="$WORK/remote.git" rev-list --count main) - 1 ))"
  fi
done
exit 0
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
    title: 'git stash push et git stash pop réels',
    goal: 'Utiliser git stash et git stash pop sur des fichiers suivis pour mettre de côté des modifications en cours.',
    brief: '<p>Dans un vrai dépôt où <code>app.txt</code> et <code>doc.txt</code> sont déjà suivis et commités, le script lit <strong>n opérations</strong> : ' +
      '<code>modifie fichier texte</code> (ajoute <code>texte</code> à <code>fichier</code>), ' +
      '<code>stash</code> (exécute <code>git stash push -q</code>), ' +
      '<code>pop</code> (exécute <code>git stash pop -q</code> ; si la pile est vide, affiche <code>rien à reprendre</code>), ' +
      'ou <code>etat</code> (affiche <code>copie : propre|modifiée</code> selon <code>git status --porcelain</code> et <code>remises : K</code> selon <code>git stash list | wc -l</code>).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
echo "v0" > app.txt
echo "d0" > doc.txt
git add app.txt doc.txt
git commit -q -m "init"

read -r n
for ((i=0; i<n; i++)); do
  read -r op arg1 arg2
  # À compléter : modifie, git stash push -q, git stash pop -q, etat.
done
`,
    hints: [
      "git stash ne remise que des fichiers suivis (déjà présents dans app.txt ou doc.txt) sauf avec l’option -u.",
      "git stash list | wc -l donne le nombre exact de remises empilées.",
      "Si git stash pop -q >/dev/null 2>&1 échoue sur une pile vide, affichez « rien à reprendre »."
    ],
    takeaway: 'git stash sauvegarde les modifications non commitées dans une pile LIFO et rend la copie de travail propre pour changer de tâche sans commiter.',
    examples: [
      { stdin: '5\nmodifie app.txt brouillon\nstash\netat\npop\netat\n', expected: 'copie : propre\nremises : 1\ncopie : modifiée\nremises : 0', note: 'Le stash nettoie la copie ; pop la restaure et vide la pile.' }
    ],
    tests: [
      { label: 'Pop sur pile vide', stdin: '2\npop\netat\n', expected: 'rien à reprendre\ncopie : propre\nremises : 0' },
      { label: 'Deux remises empilées', stdin: '5\nmodifie app.txt wip1\nstash\nmodifie doc.txt wip2\nstash\netat\n', expected: 'copie : propre\nremises : 2' },
      { label: 'Aller-retour complet', stdin: '5\nmodifie app.txt a\nstash\npop\netat\npop\n', expected: 'copie : modifiée\nremises : 0\nrien à reprendre' },
      { label: 'Dépilement en LIFO sur deux fichiers', stdin: '7\nmodifie app.txt un\nstash\nmodifie doc.txt deux\nstash\npop\npop\netat\n', expected: 'copie : modifiée\nremises : 0' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
echo "v0" > app.txt
echo "d0" > doc.txt
git add app.txt doc.txt
git commit -q -m "init"

read -r n
for ((i=0; i<n; i++)); do
  read -r op arg1 arg2
  if [ "$op" = "modifie" ]; then
    echo "$arg2" >> "$arg1"
  elif [ "$op" = "stash" ]; then
    git stash push -q >/dev/null 2>&1 || true
  elif [ "$op" = "pop" ]; then
    git stash pop -q >/dev/null 2>&1 || echo "rien à reprendre"
  elif [ "$op" = "etat" ]; then
    if [ -n "$(git status --porcelain)" ]; then
      echo "copie : modifiée"
    else
      echo "copie : propre"
    fi
    echo "remises : $(git stash list | wc -l | tr -d ' ')"
  fi
done
exit 0
`
  },
  {
    id: 'gt-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: '.gitignore réel et filtrage de git add',
    goal: 'Écrire un vrai fichier .gitignore et laisser Git refuser automatiquement l’ajout des fichiers ignorés.',
    brief: '<p>Dans un vrai dépôt Git temporaire, le script lit d’abord <strong>g motifs</strong> à écrire dans <code>.gitignore</code> ' +
      '(ex. <code>*.log</code>, <code>build/</code>, <code>secret.txt</code>). Puis il lit <strong>n opérations</strong> : ' +
      '<code>add fichier</code> (crée le fichier et ses dossiers parents puis tente <code>git add "$fichier"</code> ; si Git ' +
      'le refuse car il correspond à <code>.gitignore</code>, affiche <code>ignoré</code>), ou <code>index</code> ' +
      '(affiche <code>git diff --cached --name-only</code>).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r g
: > .gitignore
for ((i=0; i<g; i++)); do
  read -r motif
  echo "$motif" >> .gitignore
done
read -r n
for ((i=0; i<n; i++)); do
  read -r op fichier
  # À compléter : mkdir -p, créer fichier, git add "$fichier" >/dev/null 2>&1 || echo "ignoré", et index.
done
`,
    hints: [
      "Pour un chemin imbriqué comme build/output.o, créez d’abord les dossiers avec mkdir -p \"$(dirname \"$fichier\")\" avant touch \"$fichier\".",
      "Sans -f, git add échoue avec un code non nul dès qu’un fichier correspond à une règle de .gitignore.",
      "git diff --cached --name-only liste tous les fichiers effectivement acceptés dans l’index."
    ],
    takeaway: 'Un .gitignore bien configuré empêche git add (sans -f) d’indexer les artefacts de compilation, journaux et secrets locaux.',
    examples: [
      { stdin: '2\n*.log\nbuild/\n3\nadd main.py\nadd debug.log\nindex\n', expected: 'ignoré\nmain.py', note: 'debug.log correspond à *.log : git add le refuse.' }
    ],
    tests: [
      { label: 'Nom exact', stdin: '1\nsecret.txt\n3\nadd secret.txt\nadd code.py\nindex\n', expected: 'ignoré\ncode.py' },
      { label: 'Dossier complet', stdin: '1\nbuild/\n3\nadd build/output.o\nadd src/main.c\nindex\n', expected: 'ignoré\nsrc/main.c' },
      { label: 'Sans motif', stdin: '0\n2\nadd a.txt\nindex\n', expected: 'a.txt' },
      { label: 'Suffixe, dossier et préfixe proche', stdin: '2\n*.tmp\nbin/\n5\nadd a.tmp\nadd bin/object\nadd binard\nindex\nadd a.c\n', expected: 'ignoré\nignoré\nbinard' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
REPO=$(mktemp -d)
trap 'rm -rf "$REPO"' EXIT
cd "$REPO" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"

read -r g
: > .gitignore
for ((i=0; i<g; i++)); do
  read -r motif
  echo "$motif" >> .gitignore
done
read -r n
for ((i=0; i<n; i++)); do
  read -r op fichier
  if [ "$op" = "add" ]; then
    mkdir -p "$(dirname "$fichier")"
    echo "ok" > "$fichier"
    git add "$fichier" >/dev/null 2>&1 || echo "ignoré"
  elif [ "$op" = "index" ]; then
    git diff --cached --name-only
  fi
done
exit 0
`
  },
  {
    id: 'gt-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'git archive : exporter une livraison propre',
    goal: 'Construire un dépôt avec .gitignore, commiter les sources et générer une archive tar avec git archive.',
    brief: '<p>Le script lit <strong>n lignes</strong> <code>taille nom</code> (taille en octets, chemin de fichier). ' +
      'Dans un vrai dépôt configuré avec un <code>.gitignore</code> excluant <code>*.o</code> et <code>build/</code>, ' +
      'créez chaque fichier avec la taille exacte demandée (<code>dd</code> ou <code>truncate</code>), tentez <code>git add "$nom"</code> ' +
      '(les fichiers ignorés sont rejetés automatiquement par Git), puis commitez et exportez une archive avec ' +
      '<code>git archive --format=tar -o release.tar HEAD</code>. Affichez les fichiers réellement inclus dans ' +
      '<code>release.tar</code> (<code>tar -tf release.tar | sort</code>), suivis de <code>fichiers : K</code> et <code>taille : T</code> (octets archivés).</p>',
    starter: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
mkdir -p "$WORK/repo"
cd "$WORK/repo" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
printf '*.o\\nbuild/\\n' > .gitignore

read -r n
for ((i=0; i<n; i++)); do
  read -r taille nom
  # À compléter : créer le fichier à la taille exacte, tenter git add "$nom" 2>/dev/null || true.
done
# À compléter : commiter, exécuter git archive --format=tar -o "$WORK/release.tar" HEAD, lister et sommer les tailles.
`,
    hints: [
      "Pour créer un fichier d’exactement $taille octets sans zéro binaire superflu dans Git, printf '%*s' \"$taille\" '' > \"$nom\" ou head -c \"$taille\" /dev/zero > \"$nom\" fonctionne.",
      "Exécutez git add \"$nom\" >/dev/null 2>&1 || true : Git n’ajoutera que les fichiers non couverts par .gitignore.",
      "Après git commit et git archive --format=tar -o \"$WORK/release.tar\" HEAD, parcourez tar -tf \"$WORK/release.tar\" | sort (en ignorant les répertoires terminant par /) et additionnez wc -c < \"$f\"."
    ],
    takeaway: 'git archive exporte uniquement les fichiers versionnés dans un instantané (sans le dossier .git ni les fichiers ignorés par .gitignore).',
    examples: [
      { stdin: '4\n120 main.py\n30 README.md\n220 build/app.o\n50 notes.txt\n', expected: 'README.md\nmain.py\nnotes.txt\nfichiers : 3\ntaille : 200', note: 'build/app.o est exclu par .gitignore et ne figure pas dans release.tar.' }
    ],
    tests: [
      { label: 'Un seul fichier suivi', stdin: '1\n42 app.py\n', expected: 'app.py\nfichiers : 1\ntaille : 42' },
      { label: 'Tout ignoré sauf un', stdin: '3\n100 out.o\n200 build/tmp\n15 index.html\n', expected: 'index.html\nfichiers : 1\ntaille : 15' },
      { label: 'Fichiers imbriqués suivis', stdin: '3\n10 src/a.js\n25 src/b.js\n90 dist.o\n', expected: 'src/a.js\nsrc/b.js\nfichiers : 2\ntaille : 35' }
    ],
    solution: `export GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_SYSTEM=/dev/null LC_ALL=C
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT
mkdir -p "$WORK/repo"
cd "$WORK/repo" || exit 1
git init -q -b main
git config user.name "Alice"
git config user.email "alice@campus.fr"
printf '*.o\\nbuild/\\n' > .gitignore

read -r n
for ((i=0; i<n; i++)); do
  read -r taille nom
  mkdir -p "$(dirname "$nom")"
  head -c "$taille" /dev/zero > "$nom"
  git add "$nom" >/dev/null 2>&1 || true
done

if [ -n "$(git diff --cached --name-only)" ]; then
  git commit -q -m "release"
  git archive --format=tar -o "$WORK/release.tar" HEAD
  count=0
  total=0
  while IFS= read -r entry; do
    case "$entry" in
      */) continue ;;
    esac
    echo "$entry"
    count=$((count + 1))
    sz=$(wc -c < "$entry" | tr -d ' ')
    total=$((total + sz))
  done < <(tar -tf "$WORK/release.tar" | sort)
  echo "fichiers : $count"
  echo "taille : $total"
else
  echo "fichiers : 0"
  echo "taille : 0"
fi
exit 0
`
  }
];
