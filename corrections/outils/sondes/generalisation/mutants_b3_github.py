"""Mutations ciblées et explicites, sans modifier les fichiers du catalogue.

Elles reprennent les erreurs représentatives du test GitHub B3 existant, sauf
la seconde mutation de purge, qui omet toute propagation aux descendants. Une
transformation n'est applicable que si son motif apparaît exactement une fois.
"""


MUTANTS = {
    'gh3-c1-e1': [
        ('compter des caractères plutôt que les octets UTF-8', 'export LC_ALL=C', 'export LC_ALL=C.UTF-8'),
        ('ne pas décoder les sauts de ligne', r"  content=${content//\\n/$'\n'}", '  content=$content'),
    ],
    'gh3-c1-e2': [
        ('trier les noms en ordre inverse', "sort -t $'\\t' -k1,1", "sort -r -t $'\\t' -k1,1"),
        ('supprimer un espace final significatif du nom', '"$sha1" "$name"', '"$sha1" "${name% }"'),
    ],
    'gh3-c2-e1': [
        ('traiter deux têtes égales comme une avance rapide',
         'if [[ ${current_ancestors[$target]+present} ]]; then',
         'if [[ $target != "$base" && ${current_ancestors[$target]+present} ]]; then'),
        ('conserver les ancêtres communs non optimaux', 'is_best=0', 'is_best=1'),
    ],
    'gh3-c2-e2': [
        ('conserver un commit supprimé', 'drop) ;;', 'drop) ids+=("$commit"); messages+=("$message") ;;'),
        ('remplacer le message au lieu de le concaténer', 'messages[last]+=" + $message"', 'messages[last]="$message"'),
    ],
    'gh3-c2-e3': [
        ('qualifier deux modifications identiques de changement ours', 'status=RESOLVED_SAME', 'status=RESOLVED_OURS'),
        ('conserver ours lorsque seul theirs change', 'status=RESOLVED_THEIRS\n    value=$theirs',
         'status=RESOLVED_THEIRS\n    value=$ours'),
    ],
    'gh3-c3-e1': [
        ('oublier les ancêtres accessibles', 'reachable[$ancestor]=1', ':'),
        ('oublier les têtes accessibles', 'reachable[$tip]=1', ':'),
    ],
    'gh3-c3-e2': [
        ('réduire high trop loin après BAD', 'high=$middle', 'high=$((middle - 1))'),
        ('accepter une suite de statuts non monotone', '((seen_bad)) && invalid=1', ':'),
    ],
    'gh3-c3-e3': [
        ('supprimer une remise lors de apply', 'elif [[ $action == drop ]]; then',
         'elif [[ $action == drop || $action == apply ]]; then'),
        ('accepter un indice égal à la taille', '((10#$index >= count))', '((10#$index > count))'),
    ],
    'gh3-c4-e1': [
        ('omettre la protection de develop', '( $workflow == GIT_FLOW && $branch == develop )',
         '( $workflow == GIT_FLOW && $branch == development )'),
        ('faire partir les hotfix de develop',
         'if [[ $base != main ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN; fi',
         'if [[ $base != develop ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN; fi'),
    ],
    'gh3-c4-e2': [
        ('refuser exactement le minimum d’approbations', '((10#$approvals < 10#$minimum))',
         '((10#$approvals <= 10#$minimum))'),
        ('autoriser un merge commit avec historique linéaire',
         'elif [[ $linear_history == OUI && $merge_type == MERGE_COMMIT ]]; then',
         'elif [[ $linear_history == OUI && $merge_type == REBASE ]]; then'),
    ],
    'gh3-c4-e3': [
        ('ignorer le marqueur de rupture !',
         "if [[ $marker == '!' || $message == *'BREAKING CHANGE'* ]]; then",
         "if [[ $message == *'BREAKING CHANGE'* ]]; then"),
        ('accepter le type style hors du profil', 'feat|fix|docs|refactor|test|chore|perf|ci)',
         'feat|fix|docs|refactor|test|chore|perf|ci|style)'),
    ],
    'gh3-c5-e1': [
        ('ne pas imposer le nom du profil', 'if [[ ! $name =~ [^[:space:]] ]]; then', 'if false; then'),
        ('ignorer un runner manquant', 'if [[ $runner == NONE ]]; then', 'if [[ $runner == INVALID ]]; then'),
    ],
    'gh3-c5-e2': [
        ('parcourir les systèmes en ordre inverse', 'for operating_system in "${operating_systems[@]}"; do',
         'for ((os_index=${#operating_systems[@]}-1; os_index>=0; os_index-=1)); do\n'
         '  operating_system=${operating_systems[os_index]}'),
        ('ignorer les paires exclues', 'if [[ ${excluded_pairs[$key]+present} ]]; then',
         'if [[ ${excluded_pairs[unknown]+present} ]]; then'),
    ],
    'gh3-c5-e3': [
        ('donner priorité à l’injection plutôt qu’au secret',
         'if [[ $command =~ $output_pattern ]] && [[ $command == *secrets.* || $command == *GITHUB_TOKEN* ]]; then',
         'if [[ $command =~ $output_pattern && ! $command =~ $injection_pattern ]] && '
         '[[ $command == *secrets.* || $command == *GITHUB_TOKEN* ]]; then'),
        ('omettre github.head_ref', '|head_ref', ''),
    ],
    'gh3-c6-e1': [
        ('exclure la taille exactement égale au seuil', '>= 104857600', '> 104857600'),
        ('omettre les archives tar.gz', ' || $path == *.tar.gz', ''),
    ],
    'gh3-c6-e2': [
        ('exiger 17 caractères après AKIA', 'AKIA[0-9A-Z]{16,}', 'AKIA[0-9A-Z]{17,}'),
        ('exiger 21 caractères après ghp_', 'ghp_[0-9A-Za-z]{20,}', 'ghp_[0-9A-Za-z]{21,}'),
    ],
    'gh3-c6-e3': [
        ('ne considérer que le premier parent', 'for parent in "${parents[@]}"; do',
         'for parent in "${parents[0]}"; do'),
        ('ne pas propager la réécriture aux descendants',
         'if [[ ${rewritten[$parent]+present} ]]; then changed=1; fi', 'if false; then changed=1; fi'),
    ],
}


def appliquer(solution, mutation):
    description, avant, apres = mutation
    occurrences = solution.count(avant)
    if occurrences != 1:
        raise ValueError(f'Mutation ambiguë ou absente : {description} ({occurrences} occurrences)')
    resultat = solution.replace(avant, apres, 1)
    if resultat == solution:
        raise ValueError(f'Mutation sans effet : {description}')
    return resultat
