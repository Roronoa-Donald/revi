"""Oracles indépendants pour les 17 fiches GitHub B3 du lot 1, partie 3.

Ces modèles suivent les énoncés et ne chargent ni les corrigés ni leurs tests.
Le domaine accepté est volontairement restreint aux formats documentés : pour
les graphes, les parents doivent notamment précéder leurs enfants. Les cas
mal formés ne sont pas assimilés à une sortie valide, sauf si l'énoncé prévoit
explicitement une réponse d'erreur. Les comparaisons d'identifiants et de
noms sont effectuées sur leurs octets UTF-8, comme en locale C.
"""

import hashlib
import re


def _match(pattern, line):
    match = re.fullmatch(pattern, line)
    if match is None:
        raise ValueError(f"Ligne hors du domaine de l'oracle : {line!r}")
    return match.groups()


def _lines(text):
    if '\r' in text or '\x00' in text:
        raise ValueError('Seules les lignes UTF-8 sans NUL ni CR sont acceptées')
    if not text:
        return []
    result = text.split('\n')
    if text.endswith('\n'):
        result.pop()
    return result


def _byte_order(text):
    return text.encode('utf-8')


def _objects(lines):
    output = []
    for line in lines:
        kind, content = _match(r'OBJECT type=(blob|tree|commit|tag) content=(.*)', line)
        raw = content.replace('\\n', '\n').encode('utf-8')
        digest = hashlib.sha1(f'{kind} {len(raw)}\0'.encode('ascii') + raw).hexdigest()
        output.append(f'GIT_HASH type={kind} size={len(raw)} sha1={digest}')
    return '\n'.join(output)


def _tree(lines):
    entries = []
    names = set()
    for line in lines:
        mode, kind, digest, name = _match(
            r'ENTRY mode=(100644|100755|120000|040000) type=(blob|tree) '
            r'sha1=([0-9a-f]{40}) name=([^\t]+)', line
        )
        if name in names or (mode == '040000') != (kind == 'tree'):
            raise ValueError('Nom répété ou type incompatible avec le mode')
        names.add(name)
        entries.append((name, mode, kind, digest))
    entries.sort(key=lambda entry: _byte_order(entry[0]))
    blobs = sum(kind == 'blob' for _, _, kind, _ in entries)
    trees = sum(kind == 'tree' for _, _, kind, _ in entries)
    executables = sum(mode == '100755' for _, mode, _, _ in entries)
    output = [f'{mode} {kind} {digest}\t{name}' for name, mode, kind, digest in entries]
    output.append(f'TREE_SUMMARY total={len(entries)} blobs={blobs} subtrees={trees} executables={executables}')
    return '\n'.join(output) + '\n'


def _ancestors(commit, parents):
    result = set()
    pending = [commit]
    while pending:
        current = pending.pop()
        if current not in result:
            result.add(current)
            pending.extend(parents[current])
    return result


def _merge_strategy(lines):
    parents = {}
    branches = {}
    requests = []
    phase = 'commit'
    for line in lines:
        if line.startswith('COMMIT ') and phase == 'commit':
            commit, parent_text = _match(r'COMMIT id=(\S+) parents=(\S+)', line)
            parent_ids = [] if parent_text == 'NONE' else parent_text.split(',')
            if (commit == 'NONE' or ',' in commit or commit in parents
                    or any(parent not in parents for parent in parent_ids)):
                raise ValueError('Graphe non topologique ou identifiant répété')
            parents[commit] = parent_ids
        elif line.startswith('BRANCH ') and phase in {'commit', 'branch'}:
            phase = 'branch'
            branch, commit = _match(r'BRANCH name=(\S+) commit=(\S+)', line)
            if branch in branches or commit not in parents:
                raise ValueError('Branche répétée ou commit absent')
            branches[branch] = commit
        elif line.startswith('MERGE_REQUEST '):
            phase = 'request'
            current, incoming = _match(r'MERGE_REQUEST current=(\S+) incoming=(\S+)', line)
            if current not in branches or incoming not in branches:
                raise ValueError('Branche demandée absente')
            requests.append((current, incoming))
        else:
            raise ValueError('Ordre ou déclaration de graphe invalide')
    if not requests:
        raise ValueError('Aucune requête de fusion')
    output = []
    for current, incoming in requests:
        head = branches[current]
        target = branches[incoming]
        current_ancestors = _ancestors(head, parents)
        incoming_ancestors = _ancestors(target, parents)
        shared = current_ancestors & incoming_ancestors
        best = sorted(
            (candidate for candidate in shared
             if not any(candidate != other and candidate in _ancestors(other, parents) for other in shared)),
            key=_byte_order,
        )
        if not best:
            strategy = 'NO_COMMON_ANCESTOR'
        elif target in current_ancestors:
            strategy = 'ALREADY_UP_TO_DATE'
        elif head in incoming_ancestors:
            strategy = 'FAST_FORWARD'
        else:
            strategy = 'THREE_WAY_MERGE'
        bases = ','.join(best) if best else 'NONE'
        output.append(f'MERGE_STRATEGY from={incoming} into={current} type={strategy} lca={bases}')
    return '\n'.join(output)


def _rebase(lines):
    commits = []
    for line in lines:
        action, commit, message = _match(
            r'TODO action=(pick|reword|drop|squash) commit=(\S+)(?: msg=([^\"]*))?', line
        )
        if (action == 'drop') != (message is None):
            raise ValueError('Message présent ou absent à tort')
        if action == 'drop':
            continue
        if action == 'squash':
            if not commits:
                return 'REBASE_ERROR reason=SQUASH_WITHOUT_PREVIOUS'
            commits[-1][1] += ' + ' + message
        else:
            commits.append([commit, message])
    output = [f'REBASED_COMMIT id={commit} msg="{message}"' for commit, message in commits]
    output.append(f'REBASE_SUMMARY total_commits={len(commits)}')
    return '\n'.join(output)


def _three_way(lines):
    output = []
    for line in lines:
        if line.count(' ours=') != 1 or line.count(' theirs=') != 1:
            raise ValueError('Délimiteur interdit dans une valeur')
        index, base, ours, theirs = _match(
            r'LINE idx=(\S+) base=([^\"]*?) ours=([^\"]*?) theirs=([^\"]*)', line
        )
        if base == ours == theirs:
            status, value = 'CLEAN', base
        elif ours == base:
            status, value = 'RESOLVED_THEIRS', theirs
        elif theirs == base:
            status, value = 'RESOLVED_OURS', ours
        elif ours == theirs:
            status, value = 'RESOLVED_SAME', ours
        else:
            output.append(f'MERGE idx={index} status=CONFLICT ours="{ours}" theirs="{theirs}"')
            continue
        output.append(f'MERGE idx={index} status={status} val="{value}"')
    return '\n'.join(output)


def _reflog(lines):
    reachable = set()
    entries = []
    reading_entries = False
    for line in lines:
        if line.startswith('ACTIVE_BRANCH ') and not reading_entries:
            _, tip, ancestors = _match(r'ACTIVE_BRANCH name=(\S+) tip=(\S+) ancestors=(\S+)', line)
            reachable.add(tip)
            if ancestors != 'NONE':
                reachable.update(ancestors.split(','))
        else:
            reading_entries = True
            entries.append(_match(r'REFLOG_ENTRY id=(\S+) commit=(\S+) action=(\S+) desc=([^\"]*)', line))
    output = [
        f'RESCUE_CANDIDATE reflog={identifier} commit={commit} action="{action}" desc="{description}" status=DANGLING'
        for identifier, commit, action, description in entries if commit not in reachable
    ]
    return '\n'.join(output) if output else 'RESCUE_SUMMARY: ALL_COMMITS_REFERENCED'


def _bisect(lines):
    if len(lines) != 2:
        raise ValueError('Deux lignes HISTORY et STATUSES sont requises')
    history, = _match(r'HISTORY commits=(\S*)', lines[0])
    status_text, = _match(r'STATUSES(?: (.*))?', lines[1])
    commits = history.split(',') if history else []
    if len(commits) < 2:
        return 'BISECT_ERROR reason=INVALID_HISTORY'
    if len(set(commits)) != len(commits):
        raise ValueError('Identifiants répétés hors domaine')
    statuses = {}
    for token in (status_text or '').split():
        identifier, status = _match(r'([^=,\s]+)=(GOOD|BAD)', token)
        if identifier in statuses:
            return 'BISECT_ERROR reason=INVALID_STATUSES'
        statuses[identifier] = status
    sequence = [statuses.get(identifier) for identifier in commits]
    if (set(statuses) != set(commits) or sequence[0] != 'GOOD' or sequence[-1] != 'BAD'
            or any(left == 'BAD' and right == 'GOOD' for left, right in zip(sequence, sequence[1:]))):
        return 'BISECT_ERROR reason=INVALID_STATUSES'
    low, high = 0, len(commits) - 1
    output = []
    while low < high:
        middle = (low + high) // 2
        verdict = sequence[middle]
        if verdict == 'BAD':
            high = middle
        else:
            low = middle + 1
        output.append(f'BISECT_STEP step={len(output) + 1} testing={commits[middle]} verdict={verdict} remaining={high - low + 1}')
    output.append(f'FIRST_BAD_COMMIT id={commits[low]}')
    return '\n'.join(output)


def _stash(lines):
    stack = []
    output = []
    for line in lines:
        action, argument = _match(r'STASH_CMD action=(push|pop|apply|drop)(?: arg=([^\"]*))?', line)
        if (action == 'pop') != (argument is None):
            raise ValueError('Argument de stash absent ou inattendu')
        result = 'OK'
        if action == 'push':
            stack.insert(0, argument)
        elif not stack:
            result = 'STACK_EMPTY'
        elif action == 'pop':
            stack.pop(0)
        elif not argument.isascii() or not argument.isdigit() or int(argument) >= len(stack):
            result = 'INDEX_OUT_OF_BOUNDS'
        elif action == 'drop':
            stack.pop(int(argument))
        top = stack[0] if stack else 'EMPTY'
        output.append(f'STASH_OP action={action} result={result} current_size={len(stack)} top="{top}"')
    return '\n'.join(output)


def _branch_flow(lines):
    output = []
    for line in lines:
        workflow, branch, base, push = _match(
            r'BRANCH_EVENT wf=(GIT_FLOW|GITHUB_FLOW) branch=(\S+) base=(\S+) direct_push=(OUI|NON)', line
        )
        protected = branch == 'main' or (workflow == 'GIT_FLOW' and branch == 'develop')
        if protected and push == 'OUI':
            status = 'VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH'
        elif protected:
            status = 'CONFORME'
        elif workflow == 'GITHUB_FLOW':
            status = 'CONFORME' if base == 'main' else 'BRANCHE_BASE_INVALIDE_ATTENDU_MAIN'
        elif branch.startswith(('feature/', 'release/')):
            status = 'CONFORME' if base == 'develop' else 'BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP'
        elif branch.startswith('hotfix/'):
            status = 'CONFORME' if base == 'main' else 'BRANCHE_BASE_INVALIDE_ATTENDU_MAIN'
        else:
            status = 'REGLE_NON_DEFINIE'
        output.append(f'AUDIT branch={branch} status={status}')
    return '\n'.join(output)


def _protection(lines):
    if not lines:
        raise ValueError('Configuration absente')
    minimum, signed, linear = _match(
        r'CONFIG min_approvals=(\d+) require_signed=(OUI|NON) linear_history=(OUI|NON)', lines[0]
    )
    output = []
    for line in lines[1:]:
        identifier, approvals, ci, signature, merge = _match(
            r'MERGE_REQ pr=(\S+) approvals=(\d+) ci_status=(PASS|FAIL|PENDING) '
            r'gpg_signed=(OUI|NON) merge_type=(MERGE_COMMIT|SQUASH|REBASE)', line
        )
        if max(int(minimum), int(approvals)) > 2147483647:
            raise ValueError('Nombre hors domaine')
        if int(approvals) < int(minimum):
            reason = 'APPROVALS_INSUFFISANTS'
        elif ci != 'PASS':
            reason = 'CI_CHECKS_FAILED'
        elif signed == 'OUI' and signature == 'NON':
            reason = 'SIGNATURE_GPG_REQUISE'
        elif linear == 'OUI' and merge == 'MERGE_COMMIT':
            reason = 'HISTORIQUE_LINEAIRE_EXIGE'
        else:
            reason = 'OK'
        status = 'AUTHORIZED' if reason == 'OK' else 'BLOCKED'
        output.append(f'PR_MERGE pr={identifier} status={status} reason={reason}')
    return '\n'.join(output)


def _conventional(lines):
    allowed = {'feat', 'fix', 'docs', 'refactor', 'test', 'chore', 'perf', 'ci'}
    output = []
    for line in lines:
        identifier, message = _match(r'COMMIT_MSG id=(\S+) msg=(.*)', line)
        match = re.fullmatch(r'([a-z]+)(?:\(([A-Za-z0-9_-]+)\))?(!)?: (.*)', message)
        if not match:
            error = 'FORMAT_INVALIDE'
        elif match.group(1) not in allowed:
            error = 'TYPE_INCONNU'
        elif not match.group(4).strip():
            error = 'DESCRIPTION_VIDE'
        else:
            kind, scope, marker, _ = match.groups()
            breaking = 'OUI' if marker or 'BREAKING CHANGE' in message else 'NON'
            output.append(f'CONVENTIONAL_AUDIT id={identifier} valid=OUI type={kind} scope={scope or "NONE"} breaking={breaking}')
            continue
        output.append(f'CONVENTIONAL_AUDIT id={identifier} valid=NON error={error}')
    return '\n'.join(output)


def _workflow(lines):
    if len(lines) < 2:
        raise ValueError('Nom et déclencheurs requis')
    name, = _match(r'NAME=([^\"]*)', lines[0])
    trigger_text, = _match(r'TRIGGERS=(\S*)', lines[1])
    triggers = trigger_text.split(',') if trigger_text else []
    if len(set(triggers)) != len(triggers):
        raise ValueError('Déclencheur répété')
    recognised = {'push', 'pull_request', 'workflow_dispatch', 'schedule'}
    jobs = []
    for line in lines[2:]:
        identifier, runner, steps = _match(r'JOB id=(\S+) runs_on=(\S+) steps_count=(\d+)', line)
        if int(steps) > 2147483647:
            raise ValueError('Nombre hors domaine')
        jobs.append((identifier, runner, int(steps)))
    if not name.strip():
        status = 'MISSING_NAME'
    elif not any(trigger in recognised for trigger in triggers):
        status = 'MISSING_TRIGGERS'
    elif not jobs:
        status = 'NO_JOBS'
    else:
        status = 'VALID'
        for _, runner, steps in jobs:
            if runner == 'NONE':
                status = 'JOB_MISSING_RUNS_ON'
                break
            if steps == 0:
                status = 'JOB_ZERO_STEPS'
                break
    count = sum(trigger in recognised for trigger in triggers)
    return f'WORKFLOW_AUDIT name="{name}" status={status} triggers_count={count} jobs_count={len(jobs)}'


def _matrix(lines):
    if not lines:
        raise ValueError('Définition de matrice absente')
    systems_text, versions_text = _match(r'MATRIX_DEF os=([A-Za-z0-9._,-]*) version=([A-Za-z0-9._,-]*)', lines[0])
    systems = systems_text.split(',') if systems_text else []
    versions = versions_text.split(',') if versions_text else []
    if (any(not item for item in systems + versions) or len(set(systems)) != len(systems)
            or len(set(versions)) != len(versions)):
        raise ValueError('Axe vide partiellement ou valeur répétée')
    excluded = {_match(r'EXCLUDE os=([A-Za-z0-9._-]+) version=([A-Za-z0-9._-]+)', line) for line in lines[1:]}
    pairs = [(system, version) for system in systems for version in versions]
    retained = [(system, version) for system, version in pairs if (system, version) not in excluded]
    output = [f'JOB_INSTANCE os={system} version={version} tag="{system}-{version}"' for system, version in retained]
    output.append(f'MATRIX_TOTAL instances={len(retained)} excluded={len(pairs) - len(retained)}')
    return '\n'.join(output)


def _actions(lines):
    output = []
    injection = re.compile(r'\$\{\{\s*github\.(?:event\.issue\.(?:title|body)|event\.comment\.body|head_ref)\s*\}\}')
    for line in lines:
        identifier, command = _match(r'STEP_INSPECT id=(\S+) cmd=(.*)', line)
        prints = re.search(r'(?<![A-Za-z0-9_])(?:echo|print)(?![A-Za-z0-9_])', command)
        if prints and ('secrets.' in command or 'GITHUB_TOKEN' in command):
            status = 'VULN_EXPOSED_SECRET'
        elif injection.search(command):
            status = 'VULN_COMMAND_INJECTION'
        else:
            status = 'SECURE'
        output.append(f'ACTION_AUDIT step={identifier} status={status}')
    return '\n'.join(output)


def _lfs(lines):
    output = []
    for line in lines:
        path, size, digest = _match(r'FILE path=([^\"]*?) size_bytes=(0|[1-9][0-9]*) sha256=([0-9a-f]{64})', line)
        if not path or int(size) > 9223372036854775807:
            raise ValueError('Chemin ou taille hors domaine')
        if path.endswith(('.iso', '.psd', '.zip', '.tar.gz', '.mp4')) or int(size) >= 104857600:
            output.extend([
                f'LFS_DECISION file="{path}" mode=LFS_POINTER oid="{digest}" size={size}',
                'version https://git-lfs.github.com/spec/v1',
                f'oid sha256:{digest}',
                f'size {size}',
            ])
        else:
            output.append(f'LFS_DECISION file="{path}" mode=GIT_BLOB')
    return '\n'.join(output)


def _hook(lines):
    output = []
    for line in lines:
        path, content = _match(r'INSPECT_FILE file=([^\"]*?) content=(.*)', line)
        if not path:
            raise ValueError('Chemin vide')
        if any(marker in content for marker in ('<<<<<<<', '=======', '>>>>>>>')):
            reason = 'MERGE_CONFLICT_MARKERS'
        elif re.search(r'AKIA[0-9A-Z]{16,}', content):
            reason = 'HARDCODED_AWS_KEY'
        elif re.search(r'ghp_[0-9A-Za-z]{20,}', content):
            reason = 'HARDCODED_GITHUB_TOKEN'
        else:
            reason = 'CLEAN'
        verdict = 'COMMIT_ACCEPTED' if reason == 'CLEAN' else 'COMMIT_REJECTED'
        output.append(f'HOOK_RESULT file="{path}" verdict={verdict} reason={reason}')
    return '\n'.join(output)


def _purge(lines):
    if not lines:
        raise ValueError('Fichier cible absent')
    target, = _match(r'PURGE_FILE target=([^,\s]+)', lines[-1])
    commits = []
    rewritten = set()
    seen = set()
    for line in lines[:-1]:
        identifier, file_text, parent_text = _match(r'COMMIT id=([^,\s]+) files=([^\s]*) parents=(\S+)', line)
        files = file_text.split(',') if file_text else []
        parents = parent_text.split(',') if parent_text != 'NONE' else []
        if (identifier in seen or any(parent not in seen for parent in parents)
                or len(files) != len(set(files)) or any(not item for item in files)):
            raise ValueError('Graphe ou liste de fichiers hors domaine')
        seen.add(identifier)
        if target in files or any(parent in rewritten for parent in parents):
            rewritten.add(identifier)
        commits.append((identifier, [item for item in files if item != target]))
    tip = commits[-1][0] if commits else 'NONE'
    if tip in rewritten:
        tip = 'r_' + tip
    output = [f'PURGE_RESULT target="{target}" impacted_count={len(rewritten)} new_tip_hash="{tip}"']
    output.extend(
        f'REWRITTEN_COMMIT old="{identifier}" new="r_{identifier}" remaining_files=[{",".join(files)}]'
        for identifier, files in commits if identifier in rewritten
    )
    return '\n'.join(output)


ORACLES = {
    'gh3-c1-e1': _objects,
    'gh3-c1-e2': _tree,
    'gh3-c2-e1': _merge_strategy,
    'gh3-c2-e2': _rebase,
    'gh3-c2-e3': _three_way,
    'gh3-c3-e1': _reflog,
    'gh3-c3-e2': _bisect,
    'gh3-c3-e3': _stash,
    'gh3-c4-e1': _branch_flow,
    'gh3-c4-e2': _protection,
    'gh3-c4-e3': _conventional,
    'gh3-c5-e1': _workflow,
    'gh3-c5-e2': _matrix,
    'gh3-c5-e3': _actions,
    'gh3-c6-e1': _lfs,
    'gh3-c6-e2': _hook,
    'gh3-c6-e3': _purge,
}


def calculer(identifier, text):
    if identifier not in ORACLES or not isinstance(text, str):
        raise ValueError('Identifiant ou entrée non pris en charge')
    return ORACLES[identifier](_lines(text))
