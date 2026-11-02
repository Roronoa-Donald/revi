#!/usr/bin/env python3
import hashlib
import json
import os
import re
import shlex
import subprocess
import sys
from decimal import Decimal, ROUND_HALF_UP


def fields(line):
    return dict(token.split('=', 1) for token in shlex.split(line)[1:] if '=' in token)


def process_stats(lines):
    states = {'R': 'RUNNING', 'S': 'SLEEPING', 'D': 'UNINTERRUPTIBLE_DISK', 'Z': 'ZOMBIE', 'T': 'STOPPED'}
    result = []
    for line in lines:
        record = fields(line)
        result.append(f"STAT_AUDIT pid={record['pid']} comm={record['comm']} state_label={states[record['state']]} total_ticks={int(record['utime']) + int(record['stime'])} mem_kb={int(record['rss']) * 4}")
    return result


def memory_maps(lines):
    result = []
    for line in lines:
        record = fields(line)
        size = (int(record['end'], 16) - int(record['start'], 16)) // 1024
        violation = 'OUI' if 'w' in record['perms'] and 'x' in record['perms'] else 'NON'
        result.append(f"MAP_AUDIT pid={record['pid']} path={record['pathname']} size_kb={size} wx_violation={violation}")
    return result


def services(lines):
    result = []
    for line in lines:
        record = fields(line)
        if record.get('desc', '') in ('', 'NONE'):
            error = 'DESCRIPTION_MANQUANTE'
        elif not record.get('exec_start', '').startswith('/'):
            error = 'EXECSTART_RELATIF'
        elif record.get('wanted_by', '') in ('', 'NONE'):
            error = 'WANTEDBY_MANQUANT'
        else:
            error = 'OK'
        valid = 'OUI' if error == 'OK' else 'NON'
        result.append(f"SERVICE_VALIDATION name={record['name']} valid={valid} error={error}")
    return result


def dependencies(lines):
    records = [fields(line) for line in lines]
    required = {record['name']: record['requires'] for record in records}
    result = []
    for record in records:
        name, target = record['name'], record['requires']
        if target == name:
            reason = 'AUTO_DEPENDANCE'
        elif target != 'NONE' and required.get(target) == name:
            reason = 'CYCLE_DIRECT'
        else:
            reason = 'OK'
        cycle = 'NON' if reason == 'OK' else 'OUI'
        result.append(f'DEP_CHECK unit={name} cycle={cycle} reason={reason}')
    return result


def lvm(lines):
    result = []
    for line in lines:
        record = fields(line)
        size = int(record['pe_size_mb'])
        total = int(record['total_pv_gb']) * 1024 // size
        needed = -(-(int(record['lv_target_gb']) * 1024) // size)
        status = 'ALLOCATED' if needed <= total else 'INSUFFICIENT_SPACE'
        difference = abs(total - needed)
        result.append(f"LVM_AUDIT vg={record['vg']} status={status} pe_used={needed} pe_free_or_deficit={difference}")
    return result


def raid(lines):
    result = []
    for line in lines:
        record = fields(line)
        failed = int(record['failed'])
        if failed == 0:
            state = 'OPTIMAL'
        elif record['level'] == 'RAID1':
            state = 'FAILED' if int(record['active']) == 0 else 'DEGRADED'
        else:
            tolerance = {'RAID5': 1, 'RAID6': 2}[record['level']]
            state = 'FAILED' if failed > tolerance else 'DEGRADED'
        if state == 'FAILED':
            action = 'CRITICAL_DATA_LOSS'
        elif state == 'OPTIMAL':
            action = 'NONE'
        else:
            action = 'REBUILD_SPARE' if int(record['spares']) > 0 else 'WARNING_NO_SPARE'
        result.append(f"RAID_DIAG dev={record['device']} level={record['level']} state={state} action={action}")
    return result


def namespaces(lines):
    result = []
    for line in lines:
        record = fields(line)
        count = sum(int(record[f'ns_{name}']) != int(record[f'host_{name}']) for name in ('pid', 'net', 'mnt'))
        result.append(f"NS_STATUS pid={record['pid']} isolated={'OUI' if count else 'NON'} isolated_count={count}")
    return result


def cgroups(lines):
    result = []
    for line in lines:
        record = fields(line)
        if record['cpu_quota'] == 'max':
            cores = 'UNLIMITED'
        else:
            ratio = Decimal(record['cpu_quota']) / Decimal(record['cpu_period'])
            cores = str(ratio.quantize(Decimal('0.1'), rounding=ROUND_HALF_UP))
        memory = 'SATURATED' if int(record['mem_curr_mb']) >= int(record['mem_max_mb']) else 'OK'
        result.append(f"CGROUP_AUDIT group={record['group']} cpu_cores={cores} mem_status={memory}")
    return result


def interfaces(lines):
    result = []
    for line in lines:
        record = fields(line)
        if record['state'] != 'UP':
            error = 'INTERFACE_DOWN'
        elif record['type'] == 'bridge' and record['master'] != 'NONE':
            error = 'BRIDGE_CANNOT_HAVE_MASTER'
        elif record['type'] == 'veth' and record['master'] == 'NONE' and record['ip'] == 'NONE':
            error = 'VETH_UNATTACHED'
        else:
            error = 'OK'
        result.append(f"NET_AUDIT iface={record['name']} valid={'OUI' if error == 'OK' else 'NON'} error={error}")
    return result


def routing(lines):
    rules = []
    result = []
    for line in lines:
        record = fields(line)
        if line.startswith('RULE '):
            rules.append(record)
            continue
        matches = [rule for rule in rules if rule['src'] in ('ANY', record['src']) and rule['dport'] in ('ANY', record['dport'])]
        match = min(matches, key=lambda rule: int(rule['prio'])) if matches else None
        priority, table = (match['prio'], match['table']) if match else ('NONE', 'NONE')
        result.append(f"ROUTE_MATCH packet={record['id']} matched_prio={priority} table={table}")
    return result


def nsswitch(lines):
    order = fields(lines[0])['order'].split(',')
    result = []
    for line in lines[1:]:
        record = fields(line)
        source = next((name for name in order if record[f'in_{name}'] == 'OUI'), 'NONE')
        status = 'NOT_FOUND' if source == 'NONE' else 'SUCCESS'
        result.append(f"RESOLV_RESULT host={record['name']} resolved_by={source} status={status}")
    return result


def sysctl(lines):
    result = []
    for line in lines:
        record = fields(line)
        status = 'COMPLIANT' if record['current'] == record['recommended'] else 'HARDENING_REQUIRED'
        result.append(f"SYSCTL_AUDIT key={record['key']} current={record['current']} target={record['recommended']} status={status}")
    return result


def pam(lines):
    result = []
    failed = False
    succeeded = False
    for line in lines:
        record = fields(line)
        control, outcome = record['control'], record['res']
        action = 'CONTINUE'
        if control == 'required' and outcome == 'FAIL':
            failed = True
        if control == 'requisite' and outcome == 'FAIL':
            failed = True
            action = 'ABORT_FAIL'
        if outcome == 'SUCCESS':
            succeeded = True
            if control == 'sufficient' and not failed:
                action = 'STOP_SUCCESS'
        result.append(f"PAM_TRACE module={record['module']} control={control} res={outcome} action={action}")
        if action != 'CONTINUE':
            break
    result.append(f"PAM_FINAL decision={'DENIED' if failed or not succeeded else 'GRANTED'}")
    return result


def auditd(lines):
    result = []
    for line in lines:
        record = fields(line)
        uid, euid = int(record['uid']), int(record['euid'])
        if uid != 0 and euid == 0:
            alert = 'CRITICAL_ROOT_ELEVATION' if record['res'] == 'success' else 'BLOCKED_PRIVILEGE_ATTEMPT'
        elif uid == 0 and euid == 0:
            alert = 'ROOT_NATIVE'
        else:
            alert = 'STANDARD_USER'
        result.append(f"AUDIT_REPORT id={record['id']} exe={record['exe']} uid={uid} euid={euid} alert={alert}")
    return result


def git_objects(lines):
    result = []
    for line in lines:
        match = re.fullmatch(r'OBJECT type=(\S+) content=(.*)', line)
        kind, text = match.groups()
        content = text.replace('\\n', '\n').encode('utf-8')
        header = f'{kind} {len(content)}'.encode('ascii') + b'\0'
        digest = hashlib.sha1(header + content).hexdigest()
        result.append(f'GIT_HASH type={kind} size={len(content)} sha1={digest}')
    return result


def git_trees(lines):
    entries = []
    for line in lines:
        match = re.fullmatch(r'ENTRY mode=(\S+) type=(\S+) sha1=(\S+) name=(.*)', line)
        entries.append(match.groups())
    entries.sort(key=lambda entry: entry[3].encode('utf-8'))
    result = [f'{mode} {kind} {digest}\t{name}' for mode, kind, digest, name in entries]
    blobs = sum(kind == 'blob' for _, kind, _, _ in entries)
    trees = sum(kind == 'tree' for _, kind, _, _ in entries)
    executable = sum(mode == '100755' for mode, _, _, _ in entries)
    result.append(f'TREE_SUMMARY total={len(entries)} blobs={blobs} subtrees={trees} executables={executable}')
    return result


def merge_strategy(lines):
    parents = {}
    branches = {}
    requests = []
    for line in lines:
        record = fields(line)
        if line.startswith('COMMIT '):
            parents[record['id']] = [] if record['parents'] == 'NONE' else record['parents'].split(',')
        elif line.startswith('BRANCH '):
            branches[record['name']] = record['commit']
        else:
            requests.append(record)

    def ancestors(commit):
        seen = set()
        pending = [commit]
        while pending:
            item = pending.pop()
            if item not in seen:
                seen.add(item)
                pending.extend(parents[item])
        return seen

    result = []
    for request in requests:
        current = branches[request['current']]
        incoming = branches[request['incoming']]
        from_current = ancestors(current)
        from_incoming = ancestors(incoming)
        common = from_current & from_incoming
        best = sorted((item for item in common if not any(item != other and item in ancestors(other) for other in common)), key=lambda value: value.encode())
        if incoming in from_current:
            strategy = 'ALREADY_UP_TO_DATE'
        elif current in from_incoming:
            strategy = 'FAST_FORWARD'
        elif common:
            strategy = 'THREE_WAY_MERGE'
        else:
            strategy = 'NO_COMMON_ANCESTOR'
        bases = ','.join(best) if best else 'NONE'
        result.append(f"MERGE_STRATEGY from={request['incoming']} into={request['current']} type={strategy} lca={bases}")
    return result


def merge_lines(lines):
    result = []
    for line in lines:
        match = re.fullmatch(r'LINE idx=(.*?) base=(.*?) ours=(.*?) theirs=(.*)', line)
        index, base, ours, theirs = match.groups()
        if ours == base and theirs == base:
            status, value = 'CLEAN', base
        elif theirs == base:
            status, value = 'RESOLVED_OURS', ours
        elif ours == base:
            status, value = 'RESOLVED_THEIRS', theirs
        elif ours == theirs:
            status, value = 'RESOLVED_SAME', ours
        else:
            result.append(f'MERGE idx={index} status=CONFLICT ours="{ours}" theirs="{theirs}"')
            continue
        result.append(f'MERGE idx={index} status={status} val="{value}"')
    return result


def reflog(lines):
    reachable = set()
    records = []
    for line in lines:
        if line.startswith('ACTIVE_BRANCH '):
            record = fields(line)
            reachable.add(record['tip'])
            if record['ancestors'] != 'NONE':
                reachable.update(record['ancestors'].split(','))
        else:
            match = re.fullmatch(r'REFLOG_ENTRY id=(\S+) commit=(\S+) action=(\S+) desc=(.*)', line)
            records.append(match.groups())
    result = [f'RESCUE_CANDIDATE reflog={entry} commit={commit} action="{action}" desc="{description}" status=DANGLING' for entry, commit, action, description in records if commit not in reachable]
    return result or ['RESCUE_SUMMARY: ALL_COMMITS_REFERENCED']


def stash(lines):
    stack = []
    result = []
    for line in lines:
        match = re.fullmatch(r'STASH_CMD action=(\S+)(?: arg=(.*))?', line)
        action, argument = match.groups()
        outcome = 'OK'
        if action == 'push':
            stack.insert(0, argument or '')
        elif not stack:
            outcome = 'STACK_EMPTY'
        elif action == 'pop':
            stack.pop(0)
        elif argument is None or not argument.isdecimal() or int(argument) >= len(stack):
            outcome = 'INDEX_OUT_OF_BOUNDS'
        elif action == 'drop':
            stack.pop(int(argument))
        top = stack[0] if stack else 'EMPTY'
        result.append(f'STASH_OP action={action} result={outcome} current_size={len(stack)} top="{top}"')
    return result


def protections(lines):
    config = fields(lines[0])
    result = []
    for line in lines[1:]:
        record = fields(line)
        if int(record['approvals']) < int(config['min_approvals']):
            reason = 'APPROVALS_INSUFFISANTS'
        elif record['ci_status'] != 'PASS':
            reason = 'CI_CHECKS_FAILED'
        elif config['require_signed'] == 'OUI' and record['gpg_signed'] != 'OUI':
            reason = 'SIGNATURE_GPG_REQUISE'
        elif config['linear_history'] == 'OUI' and record['merge_type'] == 'MERGE_COMMIT':
            reason = 'HISTORIQUE_LINEAIRE_EXIGE'
        else:
            reason = 'OK'
        status = 'AUTHORIZED' if reason == 'OK' else 'BLOCKED'
        result.append(f"PR_MERGE pr={record['pr']} status={status} reason={reason}")
    return result


def hooks(lines):
    result = []
    for line in lines:
        filename, content = line[len('INSPECT_FILE file='):].split(' content=', 1)
        if any(marker in content for marker in ('<<<<<<<', '=======', '>>>>>>>')):
            reason = 'MERGE_CONFLICT_MARKERS'
        elif re.search(r'AKIA[0-9A-Z]{16,}', content):
            reason = 'HARDCODED_AWS_KEY'
        elif re.search(r'ghp_[0-9A-Za-z]{20,}', content):
            reason = 'HARDCODED_GITHUB_TOKEN'
        else:
            reason = 'CLEAN'
        verdict = 'COMMIT_ACCEPTED' if reason == 'CLEAN' else 'COMMIT_REJECTED'
        result.append(f'HOOK_RESULT file="{filename}" verdict={verdict} reason={reason}')
    return result


def purge(lines):
    commits = [fields(line) for line in lines if line.startswith('COMMIT ')]
    target = fields(next(line for line in lines if line.startswith('PURGE_FILE ')))['target']
    rewritten = set()
    entries = []
    for commit in commits:
        files = commit['files'].split(',') if commit['files'] else []
        parents = commit['parents'].split(',') if commit['parents'] != 'NONE' else []
        if target in files or any(parent in rewritten for parent in parents):
            rewritten.add(commit['id'])
            remaining = ','.join(name for name in files if name != target)
            entries.append(f"REWRITTEN_COMMIT old=\"{commit['id']}\" new=\"r_{commit['id']}\" remaining_files=[{remaining}]")
    tip = commits[-1]['id'] if commits else 'NONE'
    if tip in rewritten:
        tip = 'r_' + tip
    return [f'PURGE_RESULT target="{target}" impacted_count={len(rewritten)} new_tip_hash="{tip}"', *entries]


def syscalls(lines):
    result = []
    for line in lines:
        record = fields(line)
        error = record['ret'].startswith('-') or re.fullmatch(r'E[A-Z0-9_]+', record['ret']) is not None
        status = 'ERROR' if error else 'SUCCESS'
        code = record['ret'] if error else 'NONE'
        slow = 'OUI' if int(record['time_us']) > 5000 else 'NON'
        result.append(f"SYSCALL_PROFILE pid={record['pid']} name={record['name']} status={status} err={code} duration_us={record['time_us']} slow={slow}")
    return result


def journals(lines):
    levels = ['EMERGENCY', 'ALERT', 'CRITICAL', 'ERROR', 'WARNING', 'NOTICE', 'INFO', 'DEBUG']
    result = []
    for line in lines:
        record = fields(line)
        priority = int(record['priority'])
        result.append(f"JOURNAL_AUDIT id={record['id']} unit={record['unit']} level={levels[priority]} alert={'OUI' if priority <= 3 else 'NON'}")
    return result


def filesystems(lines):
    result = []
    for line in lines:
        record = fields(line)
        blocks = int(record['blocks_used']) * 100 // int(record['blocks_total'])
        inodes = int(record['inodes_used']) * 100 // int(record['inodes_total'])
        if blocks >= 90 and inodes >= 90:
            status, diagnosis = 'CRITICAL', 'TOTAL_EXHAUSTION'
        elif blocks >= 90:
            status, diagnosis = 'ALERT', 'DISK_SPACE_FULL'
        elif inodes >= 90 and blocks < 60:
            status, diagnosis = 'ALERT', 'INODE_EXHAUSTION'
        else:
            status, diagnosis = 'HEALTHY', 'NORMAL'
        result.append(f"FS_STATUS mount={record['mount']} block_pct={blocks}% inode_pct={inodes}% status={status} diag={diagnosis}")
    return result


def oom(lines):
    result = []
    for line in lines:
        record = fields(line)
        adjustment = int(record['oom_score_adj'])
        if adjustment == -1000:
            score, risk = 'IMMUNE', 'NONE'
        else:
            score = int(record['mem_mb']) + adjustment
            risk = 'HIGH' if score > 1000 else 'LOW'
        result.append(f"OOM_TARGET pid={record['pid']} comm={record['comm']} score={score} risk={risk}")
    return result


def git_references(lines):
    references = {}
    requests = []
    for line in lines:
        if line.startswith('REF '):
            name, target = line[9:].split(' target=', 1)
            references[name] = target
        else:
            requests.append(fields(line)['name'])
    result = []
    for name in requests:
        first = references.get(name)
        if first is None:
            result.append(f'RESOLVED name={name} status=NOT_FOUND')
            continue
        if name == 'HEAD':
            state = 'BRANCH_REF' if first.startswith('ref: refs/heads/') else ('SYMBOLIC_REF' if first.startswith('ref: ') else 'DETACHED_HEAD')
        else:
            state = 'SYMBOLIC_REF' if first.startswith('ref: ') else 'DIRECT_REF'
        chain = []
        current = name
        while current not in chain and current in references:
            chain.append(current)
            target = references[current]
            if not target.startswith('ref: '):
                result.append(f"RESOLVED name={name} commit={target} state={state} path={'->'.join(chain)}")
                break
            current = target[5:]
        else:
            status = 'CYCLE' if current in chain else 'NOT_FOUND'
            result.append(f'RESOLVED name={name} status={status}')
    return result


def rebase(lines):
    commits = []
    for line in lines:
        match = re.fullmatch(r'TODO action=(\S+) commit=(\S+)(?: msg=(.*))?', line)
        action, identifier, message = match.groups()
        if action in ('pick', 'reword'):
            commits.append([identifier, message])
        elif action == 'squash':
            if not commits:
                return ['REBASE_ERROR reason=SQUASH_WITHOUT_PREVIOUS']
            commits[-1][1] += ' + ' + message
    return [*(f'REBASED_COMMIT id={identifier} msg="{message}"' for identifier, message in commits), f'REBASE_SUMMARY total_commits={len(commits)}']


def bisect(lines):
    commits = fields(lines[0])['commits'].split(',')
    if len(commits) < 2:
        return ['BISECT_ERROR reason=INVALID_HISTORY']
    statuses = fields(lines[1])
    values = [statuses.get(commit) for commit in commits]
    if values[0] != 'GOOD' or values[-1] != 'BAD' or any(value not in ('GOOD', 'BAD') for value in values) or any(values[index] == 'BAD' and values[index + 1] == 'GOOD' for index in range(len(values) - 1)):
        return ['BISECT_ERROR reason=INVALID_STATUSES']
    lower, upper = 0, len(commits) - 1
    result = []
    while lower < upper:
        middle = (lower + upper) // 2
        if values[middle] == 'BAD':
            upper = middle
        else:
            lower = middle + 1
        result.append(f'BISECT_STEP step={len(result) + 1} testing={commits[middle]} verdict={values[middle]} remaining={upper - lower + 1}')
    result.append(f'FIRST_BAD_COMMIT id={commits[lower]}')
    return result


def branch_workflows(lines):
    result = []
    for line in lines:
        record = fields(line)
        branch, base, workflow = record['branch'], record['base'], record['wf']
        if record['direct_push'] == 'OUI' and (branch == 'main' or (workflow == 'GIT_FLOW' and branch == 'develop')):
            status = 'VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH'
        elif workflow == 'GIT_FLOW' and (branch.startswith('feature/') or branch.startswith('release/')) and base != 'develop':
            status = 'BRANCHE_BASE_INVALIDE_ATTENDU_DEVELOP'
        elif workflow == 'GIT_FLOW' and branch.startswith('hotfix/') and base != 'main':
            status = 'BRANCHE_BASE_INVALIDE_ATTENDU_MAIN'
        elif workflow == 'GIT_FLOW' and branch not in ('main', 'develop') and not branch.startswith(('feature/', 'release/', 'hotfix/')):
            status = 'REGLE_NON_DEFINIE'
        elif workflow == 'GITHUB_FLOW' and branch != 'main' and base != 'main':
            status = 'BRANCHE_BASE_INVALIDE_ATTENDU_MAIN'
        else:
            status = 'CONFORME'
        result.append(f'AUDIT branch={branch} status={status}')
    return result


def conventional_commits(lines):
    result = []
    allowed = {'feat', 'fix', 'docs', 'refactor', 'test', 'chore', 'perf', 'ci'}
    for line in lines:
        identifier, message = line[len('COMMIT_MSG id='):].split(' msg=', 1)
        match = re.fullmatch(r'([a-z]+)(?:\(([A-Za-z0-9_-]+)\))?(!?): (.*)', message)
        if not match:
            detail = 'valid=NON error=FORMAT_INVALIDE'
        else:
            kind, scope, marker, description = match.groups()
            if kind not in allowed:
                detail = 'valid=NON error=TYPE_INCONNU'
            elif not description.strip():
                detail = 'valid=NON error=DESCRIPTION_VIDE'
            else:
                breaking = 'OUI' if marker or 'BREAKING CHANGE' in message else 'NON'
                detail = f'valid=OUI type={kind} scope={scope or "NONE"} breaking={breaking}'
        result.append(f'CONVENTIONAL_AUDIT id={identifier} {detail}')
    return result


def workflow_structure(lines):
    name = lines[0][len('NAME='):]
    triggers = lines[1][len('TRIGGERS='):].split(',')
    recognized = {'push', 'pull_request', 'workflow_dispatch', 'schedule'}
    count = sum(trigger in recognized for trigger in triggers)
    jobs = [fields(line) for line in lines[2:]]
    if not name.strip():
        status = 'MISSING_NAME'
    elif count == 0:
        status = 'MISSING_TRIGGERS'
    elif not jobs:
        status = 'NO_JOBS'
    else:
        status = 'VALID'
        for job in jobs:
            if job['runs_on'] == 'NONE':
                status = 'JOB_MISSING_RUNS_ON'
                break
            if int(job['steps_count']) == 0:
                status = 'JOB_ZERO_STEPS'
                break
    return [f'WORKFLOW_AUDIT name="{name}" status={status} triggers_count={count} jobs_count={len(jobs)}']


def build_matrix(lines):
    definition = fields(lines[0])
    systems = definition['os'].split(',') if definition['os'] else []
    versions = definition['version'].split(',') if definition['version'] else []
    excluded = {(record['os'], record['version']) for record in map(fields, lines[1:])}
    pairs = [(system, version) for system in systems for version in versions]
    active = [pair for pair in pairs if pair not in excluded]
    result = [f'JOB_INSTANCE os={system} version={version} tag="{system}-{version}"' for system, version in active]
    result.append(f'MATRIX_TOTAL instances={len(active)} excluded={len(pairs) - len(active)}')
    return result


def action_inspection(lines):
    result = []
    expression = re.compile(r'\$\{\{\s*(?:github\.event\.issue\.(?:title|body)|github\.event\.comment\.body|github\.head_ref)\s*\}\}')
    for line in lines:
        identifier, command = line[len('STEP_INSPECT id='):].split(' cmd=', 1)
        if re.search(r'\b(?:echo|print)\b', command) and ('secrets.' in command or 'GITHUB_TOKEN' in command):
            status = 'VULN_EXPOSED_SECRET'
        elif expression.search(command):
            status = 'VULN_COMMAND_INJECTION'
        else:
            status = 'SECURE'
        result.append(f'ACTION_AUDIT step={identifier} status={status}')
    return result


def lfs(lines):
    result = []
    for line in lines:
        match = re.fullmatch(r'FILE path=(.*) size_bytes=(\d+) sha256=([0-9a-f]{64})', line)
        filename, size, digest_value = match.groups()
        use_lfs = int(size) >= 104857600 or filename.endswith(('.iso', '.psd', '.zip', '.tar.gz', '.mp4'))
        if not use_lfs:
            result.append(f'LFS_DECISION file="{filename}" mode=GIT_BLOB')
        else:
            result.extend([f'LFS_DECISION file="{filename}" mode=LFS_POINTER oid="{digest_value}" size={size}', 'version https://git-lfs.github.com/spec/v1', f'oid sha256:{digest_value}', f'size {size}'])
    return result


ORACLES = {
    'lx3-c1-e1': process_stats, 'lx3-c1-e2': memory_maps,
    'lx3-c1-e3': syscalls,
    'lx3-c2-e1': services, 'lx3-c2-e2': dependencies,
    'lx3-c2-e3': journals,
    'lx3-c3-e1': lvm, 'lx3-c3-e2': raid,
    'lx3-c3-e3': filesystems,
    'lx3-c4-e1': namespaces, 'lx3-c4-e2': cgroups,
    'lx3-c4-e3': oom,
    'lx3-c5-e1': interfaces, 'lx3-c5-e2': routing, 'lx3-c5-e3': nsswitch,
    'lx3-c6-e1': sysctl, 'lx3-c6-e2': pam, 'lx3-c6-e3': auditd,
    'gh3-c1-e1': git_objects, 'gh3-c1-e2': git_trees,
    'gh3-c1-e3': git_references,
    'gh3-c2-e1': merge_strategy, 'gh3-c2-e3': merge_lines,
    'gh3-c2-e2': rebase,
    'gh3-c3-e1': reflog, 'gh3-c3-e3': stash,
    'gh3-c3-e2': bisect,
    'gh3-c4-e2': protections, 'gh3-c6-e2': hooks, 'gh3-c6-e3': purge,
    'gh3-c4-e1': branch_workflows, 'gh3-c4-e3': conventional_commits,
    'gh3-c5-e1': workflow_structure, 'gh3-c5-e2': build_matrix,
    'gh3-c5-e3': action_inspection, 'gh3-c6-e1': lfs,
}


def normalise(value):
    text = value.replace('\r\n', '\n').replace('\r', '\n')
    return '\n'.join(line.rstrip() for line in text.split('\n')).strip('\n')


def digest(value):
    return hashlib.sha256(value.encode('utf-8')).hexdigest()


def main():
    if 'HOME' in os.environ or os.path.exists('/home') or os.path.exists('/root'):
        raise RuntimeError('HOME exposé')
    host_network = os.environ.get('REVI_AUDIT_NET_NS_HOTE')
    if not host_network or os.readlink('/proc/self/ns/net') == host_network:
        raise RuntimeError('Espace réseau non isolé')
    network = open('/proc/net/dev', encoding='utf-8').read().splitlines()[2:]
    if [line.split(':', 1)[0].strip() for line in network if line.strip()] != ['lo']:
        raise RuntimeError('Interface réseau inattendue')
    link = subprocess.check_output(['/usr/bin/ip', '-o', 'link', 'show'], text=True)
    if '<LOOPBACK' not in link:
        raise RuntimeError('Boucle locale absente')
    loopback_down = 'state DOWN' in link
    routes = subprocess.check_output(['/usr/bin/ip', 'route', 'show'], text=True)
    if routes.strip():
        raise RuntimeError('Route réseau inattendue')
    cases = json.load(sys.stdin)
    results = []
    for case in cases:
        sample = case['test']
        try:
            lines = sample['stdin'].splitlines()
            oracle = '\n'.join(ORACLES[case['id']](lines)) + '\n'
            exact = sample.get('mode') == 'exact' or sample.get('comparator') == 'exact'
            matches = oracle == sample['expected'] if exact else normalise(oracle) == normalise(sample['expected'])
            results.append({'id': case['id'], 'indice': case['index'], 'type': case['origin'], 'mode': 'exact' if exact else 'normalise', 'oracle': oracle, 'oracleSha256': digest(oracle), 'expectedSha256': digest(sample['expected']), 'identique_apres_comparaison': matches})
        except Exception as error:
            results.append({'id': case['id'], 'indice': case['index'], 'identique_apres_comparaison': False, 'erreur': f'{type(error).__name__}: {error}'})
    print(json.dumps({'schema': 'revi.oracles-independants.v1', 'python': sys.version.split()[0], 'confinement': {'homeAbsent': True, 'reseauIsole': True, 'loopbackDown': loopback_down, 'catalogueAbsent': not os.path.exists('/project/server/exercises')}, 'resultats': results}, ensure_ascii=False, indent=2))
    if not all(result['identique_apres_comparaison'] for result in results):
        sys.exit(1)


if __name__ == '__main__':
    main()
