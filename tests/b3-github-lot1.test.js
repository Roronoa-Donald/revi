'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const exercises = require('../server/exercises/b3-github');
const gradingPolicy = require('../server/exercises/grading-policy');
const { runTests, MAX_TESTS } = require('../server/exercises/runner');

const hashContent = 'nœud Ω';
const objectHash = createHash('sha1')
  .update(Buffer.concat([Buffer.from(`blob ${Buffer.byteLength(hashContent)}\0`), Buffer.from(hashContent)]))
  .digest('hex');
const objectA = 'a'.repeat(40);
const objectB = 'b'.repeat(40);
const objectId = '0123456789abcdef'.repeat(4);
const awsShort = `AKIA${'A'.repeat(15)}`;
const awsLong = `AKIA${'A'.repeat(16)}`;
const githubShort = `ghp_${'a'.repeat(19)}`;
const githubLong = `ghp_${'a'.repeat(20)}`;

const independent = {
  'gh3-c1-e1': {
    stdin: `OBJECT type=blob content=${hashContent}`,
    expected: `GIT_HASH type=blob size=${Buffer.byteLength(hashContent)} sha1=${objectHash}`
  },
  'gh3-c1-e2': {
    stdin: `ENTRY mode=100755 type=blob sha1=${objectB} name=zeta.sh\nENTRY mode=120000 type=blob sha1=${objectA} name=Alpha notes`,
    expected: `120000 blob ${objectA}\tAlpha notes\n100755 blob ${objectB}\tzeta.sh\nTREE_SUMMARY total=2 blobs=2 subtrees=0 executables=1`
  },
  'gh3-c1-e3': {
    stdin: 'REF name=HEAD target=ref: refs/heads/topic\nREF name=refs/heads/topic target=ref: refs/aliases/current\nREF name=refs/aliases/current target=0123456789abcdef0123456789abcdef01234567\nRESOLVE name=HEAD',
    expected: 'RESOLVED name=HEAD commit=0123456789abcdef0123456789abcdef01234567 state=BRANCH_REF path=HEAD -> refs/heads/topic -> refs/aliases/current'
  },
  'gh3-c2-e1': {
    stdin: 'COMMIT id=root parents=NONE\nCOMMIT id=left parents=root\nCOMMIT id=right parents=root\nCOMMIT id=joined parents=left,right\nBRANCH name=main commit=right\nBRANCH name=topic commit=joined\nMERGE_REQUEST current=main incoming=topic',
    expected: 'MERGE_STRATEGY from=topic into=main type=FAST_FORWARD lca=right'
  },
  'gh3-c2-e2': {
    stdin: 'TODO action=pick commit=Q1 msg=Base\nTODO action=drop commit=Q2\nTODO action=squash commit=Q3 msg=Suite\nTODO action=reword commit=Q4 msg=Renommé',
    expected: 'REBASED_COMMIT id=Q1 msg="Base + Suite"\nREBASED_COMMIT id=Q4 msg="Renommé"\nREBASE_SUMMARY total_commits=2'
  },
  'gh3-c2-e3': {
    stdin: 'LINE idx=7 base= ours=plus theirs=\nLINE idx=8 base=1 ours=2 theirs=3',
    expected: 'MERGE idx=7 status=RESOLVED_OURS val="plus"\nMERGE idx=8 status=CONFLICT ours="2" theirs="3"'
  },
  'gh3-c3-e1': {
    stdin: 'ACTIVE_BRANCH name=main tip=T ancestors=A,B\nREFLOG_ENTRY id=HEAD@{0} commit=B action=reset desc=un ancêtre\nREFLOG_ENTRY id=HEAD@{1} commit=Z action=commit desc=perdu ailleurs',
    expected: 'RESCUE_CANDIDATE reflog=HEAD@{1} commit=Z action="commit" desc="perdu ailleurs" status=DANGLING'
  },
  'gh3-c3-e2': {
    stdin: 'HISTORY commits=x1,x2,x3,x4,x5,x6\nSTATUSES x1=GOOD x2=GOOD x3=GOOD x4=GOOD x5=BAD x6=BAD',
    expected: 'BISECT_STEP step=1 testing=x3 verdict=GOOD remaining=3\nBISECT_STEP step=2 testing=x5 verdict=BAD remaining=2\nBISECT_STEP step=3 testing=x4 verdict=GOOD remaining=1\nFIRST_BAD_COMMIT id=x5'
  },
  'gh3-c3-e3': {
    stdin: 'STASH_CMD action=push arg=ancien\nSTASH_CMD action=push arg=récent\nSTASH_CMD action=drop arg=1\nSTASH_CMD action=apply arg=1\nSTASH_CMD action=pop\nSTASH_CMD action=pop',
    expected: 'STASH_OP action=push result=OK current_size=1 top="ancien"\nSTASH_OP action=push result=OK current_size=2 top="récent"\nSTASH_OP action=drop result=OK current_size=1 top="récent"\nSTASH_OP action=apply result=INDEX_OUT_OF_BOUNDS current_size=1 top="récent"\nSTASH_OP action=pop result=OK current_size=0 top="EMPTY"\nSTASH_OP action=pop result=STACK_EMPTY current_size=0 top="EMPTY"'
  },
  'gh3-c4-e1': {
    stdin: 'BRANCH_EVENT wf=GIT_FLOW branch=feature/docs base=develop direct_push=NON\nBRANCH_EVENT wf=GIT_FLOW branch=develop base=develop direct_push=OUI\nBRANCH_EVENT wf=GIT_FLOW branch=support/v1 base=main direct_push=NON',
    expected: 'AUDIT branch=feature/docs status=CONFORME\nAUDIT branch=develop status=VIOLATION_DIRECT_PUSH_PROTECTED_BRANCH\nAUDIT branch=support/v1 status=REGLE_NON_DEFINIE'
  },
  'gh3-c4-e2': {
    stdin: 'CONFIG min_approvals=3 require_signed=OUI linear_history=OUI\nMERGE_REQ pr=1 approvals=2 ci_status=FAIL gpg_signed=NON merge_type=MERGE_COMMIT\nMERGE_REQ pr=2 approvals=3 ci_status=PASS gpg_signed=NON merge_type=SQUASH\nMERGE_REQ pr=3 approvals=3 ci_status=PASS gpg_signed=OUI merge_type=MERGE_COMMIT\nMERGE_REQ pr=4 approvals=3 ci_status=PASS gpg_signed=OUI merge_type=REBASE',
    expected: 'PR_MERGE pr=1 status=BLOCKED reason=APPROVALS_INSUFFISANTS\nPR_MERGE pr=2 status=BLOCKED reason=SIGNATURE_GPG_REQUISE\nPR_MERGE pr=3 status=BLOCKED reason=HISTORIQUE_LINEAIRE_EXIGE\nPR_MERGE pr=4 status=AUTHORIZED reason=OK'
  },
  'gh3-c4-e3': {
    stdin: 'COMMIT_MSG id=71 msg=feat(api)!: rupture\nCOMMIT_MSG id=72 msg=style: ajustement\nCOMMIT_MSG id=73 msg=fix: ',
    expected: 'CONVENTIONAL_AUDIT id=71 valid=OUI type=feat scope=api breaking=OUI\nCONVENTIONAL_AUDIT id=72 valid=NON error=TYPE_INCONNU\nCONVENTIONAL_AUDIT id=73 valid=NON error=DESCRIPTION_VIDE'
  },
  'gh3-c5-e1': {
    stdin: 'NAME=Pipeline neuf\nTRIGGERS=push,schedule\nJOB id=unit runs_on=linux steps_count=1\nJOB id=lint runs_on=NONE steps_count=0',
    expected: 'WORKFLOW_AUDIT name="Pipeline neuf" status=JOB_MISSING_RUNS_ON triggers_count=2 jobs_count=2'
  },
  'gh3-c5-e2': {
    stdin: 'MATRIX_DEF os=zulu,alpha version=2,1\nEXCLUDE os=zulu version=1',
    expected: 'JOB_INSTANCE os=zulu version=2 tag="zulu-2"\nJOB_INSTANCE os=alpha version=2 tag="alpha-2"\nJOB_INSTANCE os=alpha version=1 tag="alpha-1"\nMATRIX_TOTAL instances=3 excluded=1'
  },
  'gh3-c5-e3': {
    stdin: 'STEP_INSPECT id=A cmd=echo ${{github.event.issue.body}}\nSTEP_INSPECT id=B cmd=print(${{ secrets.TEST }})\nSTEP_INSPECT id=C cmd=printf "rien"',
    expected: 'ACTION_AUDIT step=A status=VULN_COMMAND_INJECTION\nACTION_AUDIT step=B status=VULN_EXPOSED_SECRET\nACTION_AUDIT step=C status=SECURE'
  },
  'gh3-c6-e1': {
    stdin: `FILE path=raw.bin size_bytes=104857599 sha256=${objectId}\nFILE path=large.bin size_bytes=104857600 sha256=${objectId}`,
    expected: `LFS_DECISION file="raw.bin" mode=GIT_BLOB\nLFS_DECISION file="large.bin" mode=LFS_POINTER oid="${objectId}" size=104857600\nversion https://git-lfs.github.com/spec/v1\noid sha256:${objectId}\nsize 104857600`
  },
  'gh3-c6-e2': {
    stdin: `INSPECT_FILE file=short-aws content=${awsShort}\nINSPECT_FILE file=long-aws content=${awsLong}\nINSPECT_FILE file=short-gh content=${githubShort}\nINSPECT_FILE file=long-gh content=${githubLong}`,
    expected: 'HOOK_RESULT file="short-aws" verdict=COMMIT_ACCEPTED reason=CLEAN\nHOOK_RESULT file="long-aws" verdict=COMMIT_REJECTED reason=HARDCODED_AWS_KEY\nHOOK_RESULT file="short-gh" verdict=COMMIT_ACCEPTED reason=CLEAN\nHOOK_RESULT file="long-gh" verdict=COMMIT_REJECTED reason=HARDCODED_GITHUB_TOKEN'
  },
  'gh3-c6-e3': {
    stdin: 'COMMIT id=A files=app,.secret parents=NONE\nCOMMIT id=B files=app parents=A\nCOMMIT id=C files=notes parents=NONE\nCOMMIT id=D files=app,notes parents=B,C\nPURGE_FILE target=.secret',
    expected: 'PURGE_RESULT target=".secret" impacted_count=3 new_tip_hash="r_D"\nREWRITTEN_COMMIT old="A" new="r_A" remaining_files=[app]\nREWRITTEN_COMMIT old="B" new="r_B" remaining_files=[app]\nREWRITTEN_COMMIT old="D" new="r_D" remaining_files=[app,notes]'
  }
};

function runSolution(solution, stdin) {
  const result = spawnSync('/bin/bash', ['-c', solution], {
    input: stdin,
    encoding: 'utf8',
    timeout: 5000,
    maxBuffer: 1024 * 1024
  });
  assert.equal(result.error, undefined, result.error && result.error.message);
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.replace(/\r\n/g, '\n').replace(/\n+$/, '');
}

test('la notation GitHub reste suspendue', () => {
  assert.equal(gradingPolicy.isGradingSuspended('b3-github'), true);
});

test('les 18 exercices sont présents et possèdent chacun une entrée indépendante', () => {
  assert.equal(exercises.length, 18);
  assert.deepEqual(exercises.map(exercise => exercise.id).sort(), Object.keys(independent).sort());
});

for (const exercise of exercises) {
  test(`${exercise.id} : entrée indépendante, exemples et tests cachés`, () => {
    const novel = independent[exercise.id];
    assert.ok(![...exercise.examples, ...exercise.tests].some(item => item.stdin === novel.stdin), exercise.id);
    assert.equal(runSolution(exercise.solution, novel.stdin), novel.expected, 'entrée indépendante');
    assert.ok(exercise.tests.length >= 4, 'au moins quatre tests cachés');
    for (const example of exercise.examples) {
      assert.equal(runSolution(exercise.solution, example.stdin), example.expected, 'exemple');
    }
    for (const hidden of exercise.tests) {
      const expected = hidden.mode === 'exact' ? hidden.expected.replace(/\n+$/, '') : hidden.expected;
      assert.equal(runSolution(exercise.solution, hidden.stdin), expected, hidden.label);
    }
  });
}

const mutations = {
  'gh3-c1-e1': [
    ['compter des caractères au lieu des octets UTF-8', 'export LC_ALL=C', 'export LC_ALL=C.UTF-8'],
    ['ne pas décoder les sauts de ligne', "  content=${content//\\\\n/$'\\n'}", '  content=$content']
  ],
  'gh3-c1-e2': [
    ['trier les noms en ordre inverse', "sort -t $'\\t' -k1,1", "sort -r -t $'\\t' -k1,1"],
    ['compter les fichiers ordinaires comme exécutables', '[[ $mode == 100755 ]] && ((executables += 1))', '[[ $mode == 100644 ]] && ((executables += 1))'],
    ['supprimer un espace final significatif du nom', '"$sha1" "$name"', '"$sha1" "${name% }"']
  ],
  'gh3-c1-e3': [
    ['confondre HEAD détaché avec une branche', 'state=DETACHED_HEAD', 'state=BRANCH_REF'],
    ['confondre un cycle avec une référence absente', 'status=CYCLE', 'status=NOT_FOUND']
  ],
  'gh3-c2-e1': [
    ['confondre égalité des têtes et avance rapide', 'if [[ ${current_ancestors[$target]+present} ]]; then', 'if [[ $target != "$base" && ${current_ancestors[$target]+present} ]]; then'],
    ['conserver aussi les ancêtres communs moins récents', 'is_best=0', 'is_best=1']
  ],
  'gh3-c2-e2': [
    ['conserver un commit supprimé', 'drop) ;;', 'drop) ids+=("$commit"); messages+=("$message") ;;'],
    ['remplacer au lieu de concaténer le message squashé', 'messages[last]+=" + $message"', 'messages[last]="$message"']
  ],
  'gh3-c2-e3': [
    ['confondre deux modifications identiques avec ours', 'status=RESOLVED_SAME', 'status=RESOLVED_OURS'],
    ["Conserver ours au lieu de theirs dans une modification unilatérale","status=RESOLVED_THEIRS\n    value=$theirs","status=RESOLVED_THEIRS\n    value=$ours"]
  ],
  'gh3-c3-e1': [
    ['ignorer les ancêtres des branches', 'reachable[$ancestor]=1', ':'],
    ["Omettre les têtes des branches accessibles","reachable[$tip]=1",":"]
  ],
  'gh3-c3-e2': [
    ['réduire high trop loin après BAD', 'high=$middle', 'high=$((middle - 1))'],
    ['accepter des statuts non monotones', '((seen_bad)) && invalid=1', ':']
  ],
  'gh3-c3-e3': [
    ['supprimer une remise pendant apply', 'elif [[ $action == drop ]]; then', 'elif [[ $action == drop || $action == apply ]]; then'],
    ['accepter un indice égal à la taille', '((10#$index >= count))', '((10#$index > count))']
  ],
  'gh3-c4-e1': [
    ['ne pas protéger develop', '( $workflow == GIT_FLOW && $branch == develop )', '( $workflow == GIT_FLOW && $branch == development )'],
    ['faire partir les hotfix de develop', 'if [[ $base != main ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN; fi', 'if [[ $base != develop ]]; then status=BRANCHE_BASE_INVALIDE_ATTENDU_MAIN; fi']
  ],
  'gh3-c4-e2': [
    ['refuser le nombre exact d’approbations', '((10#$approvals < 10#$minimum))', '((10#$approvals <= 10#$minimum))'],
    ['autoriser un merge commit malgré un historique linéaire', 'elif [[ $linear_history == OUI && $merge_type == MERGE_COMMIT ]]; then', 'elif [[ $linear_history == OUI && $merge_type == REBASE ]]; then']
  ],
  'gh3-c4-e3': [
    ['ignorer le marqueur de rupture !', "if [[ $marker == '!' || $message == *'BREAKING CHANGE'* ]]; then", "if [[ $message == *'BREAKING CHANGE'* ]]; then"],
    ['autoriser le type style hors du profil', 'feat|fix|docs|refactor|test|chore|perf|ci)', 'feat|fix|docs|refactor|test|chore|perf|ci|style)']
  ],
  'gh3-c5-e1': [
    ['ne pas appliquer le nom requis par le profil', 'if [[ ! $name =~ [^[:space:]] ]]; then', 'if false; then'],
    ['ne pas détecter le runner absent', 'if [[ $runner == NONE ]]; then', 'if [[ $runner == INVALID ]]; then']
  ],
  'gh3-c5-e2': [
    ['inverser l’ordre des systèmes déclarés', 'for operating_system in "${operating_systems[@]}"; do', 'for ((os_index=${#operating_systems[@]}-1; os_index>=0; os_index-=1)); do\n  operating_system=${operating_systems[os_index]}'],
    ['ignorer les paires exclues', 'if [[ ${excluded_pairs[$key]+present} ]]; then', 'if [[ ${excluded_pairs[unknown]+present} ]]; then']
  ],
  'gh3-c5-e3': [
    ['donner priorité à l’injection plutôt qu’au secret', 'if [[ $command =~ $output_pattern ]] && [[ $command == *secrets.* || $command == *GITHUB_TOKEN* ]]; then', 'if [[ $command =~ $output_pattern && ! $command =~ $injection_pattern ]] && [[ $command == *secrets.* || $command == *GITHUB_TOKEN* ]]; then'],
    ['ne pas reconnaître github.head_ref', '|head_ref', '']
  ],
  'gh3-c6-e1': [
    ['exclure la taille exactement égale au seuil LFS', '>= 104857600', '> 104857600'],
    ['oublier les archives tar.gz surveillées', ' || $path == *.tar.gz', '']
  ],
  'gh3-c6-e2': [
    ['exiger 17 caractères après AKIA', 'AKIA[0-9A-Z]{16,}', 'AKIA[0-9A-Z]{17,}'],
    ['exiger 21 caractères après ghp_', 'ghp_[0-9A-Za-z]{20,}', 'ghp_[0-9A-Za-z]{21,}']
  ],
  'gh3-c6-e3': [
    ['ne suivre que le premier parent', 'for parent in "${parents[@]}"; do', 'for parent in "${parents[0]}"; do'],
    ["Utiliser une mauvaise tête sentinelle pour l’historique vide","tip=NONE","tip=EMPTY"]
  ]
};

test('deux cas cachés distincts précèdent les autres pour chaque exercice', () => {
  assert.deepEqual(Object.keys(mutations).sort(), exercises.map(exercise => exercise.id).sort());
  for (const exercise of exercises) {
    assert.ok(exercise.tests.length >= 4, exercise.id);
    assert.notEqual(exercise.tests[0].stdin, exercise.tests[1].stdin, exercise.id);
    for (const hidden of exercise.tests.slice(0, 2)) {
      assert.ok(!exercise.examples.some(example => example.stdin === hidden.stdin), exercise.id);
    }
    assert.doesNotMatch(exercise.solution, /\bbase64\b/, exercise.id);
  }
});

for (const exercise of exercises) {
  for (const [label, before, after] of mutations[exercise.id]) {
    test(`${exercise.id} : rejette la variante « ${label} »`, async () => {
      const position = exercise.solution.indexOf(before);
      assert.notEqual(position, -1, `mutation introuvable : ${label}`);
      assert.equal(position, exercise.solution.lastIndexOf(before), `mutation ambiguë : ${label}`);
      const mutated = exercise.solution.replace(before, () => after);
      const report = await runTests(exercise, mutated, {
        execute: async ({ code, stdin }) => {
          const result = spawnSync('/bin/bash', ['-c', code], { input: stdin, encoding: 'utf8', timeout: 5000 });
          assert.equal(result.error, undefined, result.error && result.error.message);
          assert.equal(result.status, 0, result.stderr);
          return { ok: true, stdout: result.stdout };
        }
      });
      assert.equal(report.ok, true, JSON.stringify(report));
      assert.equal(report.total, Math.min(MAX_TESTS, exercise.tests.length));
      assert.equal(report.stop && report.stop.reason, 'wrong_output', `variante acceptée : ${label}`);
    });
  }
}

test('le moteur interne accepte les quatre cas actifs de chaque corrigé', async () => {
  for (const exercise of exercises) {
    const report = await runTests(exercise, exercise.solution, {
      execute: async ({ code, stdin }) => {
        const result = spawnSync('/bin/bash', ['-c', code], { input: stdin, encoding: 'utf8', timeout: 5000 });
        assert.equal(result.error, undefined, result.error && result.error.message);
        assert.equal(result.status, 0, result.stderr);
        return { ok: true, stdout: result.stdout };
      }
    });
    assert.equal(report.ok, true, exercise.id);
    assert.equal(report.passed, Math.min(MAX_TESTS, exercise.tests.length), exercise.id);
    assert.equal(report.stop, null, exercise.id);
  }
});

test('les énoncés restent lisibles et la projection client ne divulgue rien de caché', () => {
  const registry = require('../server/exercises');
  const objectExercise = exercises.find(exercise => exercise.id === 'gh3-c1-e1');
  const actionExercise = exercises.find(exercise => exercise.id === 'gh3-c5-e3');
  assert.ok(objectExercise.brief.includes('\\0'));
  assert.ok(objectExercise.brief.includes('\\n'));
  assert.ok(actionExercise.brief.includes('${{ github.head_ref }}'));
  for (const exercise of exercises) {
    assert.equal(exercise.brief.includes('\0'), false, exercise.id);
    const client = registry.toClient(registry.getExercise(exercise.id));
    assert.equal(Object.hasOwn(client, 'solution'), false, exercise.id);
    assert.equal(Object.hasOwn(client, 'tests'), false, exercise.id);
  }
});

function randomGenerator(seed) {
  let state = seed >>> 0;
  return limit => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state % limit;
  };
}

function randomParents(count, random) {
  const candidates = Array.from({ length: count }, (_, index) => `C${index}`);
  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const other = random(index + 1);
    [candidates[index], candidates[other]] = [candidates[other], candidates[index]];
  }
  return candidates.slice(0, random(Math.min(2, count) + 1));
}

function ancestorSet(start, parents) {
  const visited = new Set();
  const pending = [start];
  while (pending.length) {
    const current = pending.pop();
    if (visited.has(current)) continue;
    visited.add(current);
    pending.push(...parents.get(current));
  }
  return visited;
}

test('hachage : 40 contenus UTF-8 comparés à node:crypto', () => {
  const exercise = exercises.find(item => item.id === 'gh3-c1-e1');
  const random = randomGenerator(0x204214);
  const alphabet = ['a', 'Z', ' ', 'é', 'Ω', '\n'];
  const types = ['blob', 'commit', 'tag'];
  const input = [];
  const output = [];
  for (let index = 0; index < 40; index += 1) {
    const length = random(20);
    let content = '';
    for (let position = 0; position < length; position += 1) content += alphabet[random(alphabet.length)];
    const type = types[index % types.length];
    const bytes = Buffer.from(content);
    const digest = createHash('sha1').update(Buffer.concat([Buffer.from(`${type} ${bytes.length}\0`), bytes])).digest('hex');
    input.push(`OBJECT type=${type} content=${content.replaceAll('\n', '\\n')}`);
    output.push(`GIT_HASH type=${type} size=${bytes.length} sha1=${digest}`);
  }
  assert.equal(runSolution(exercise.solution, input.join('\n')), output.join('\n'));
});

test('fusion : 40 graphes comparés à un oracle de parcours indépendant', () => {
  const exercise = exercises.find(item => item.id === 'gh3-c2-e1');
  const random = randomGenerator(0x204215);
  for (let scenario = 0; scenario < 40; scenario += 1) {
    const count = 2 + random(10);
    const parents = new Map();
    const lines = [];
    for (let index = 0; index < count; index += 1) {
      const id = `C${index}`;
      const ancestors = randomParents(index, random);
      parents.set(id, ancestors);
      lines.push(`COMMIT id=${id} parents=${ancestors.length ? ancestors.join(',') : 'NONE'}`);
    }
    const current = `C${random(count)}`;
    const incoming = `C${random(count)}`;
    lines.push(`BRANCH name=base commit=${current}`, `BRANCH name=topic commit=${incoming}`, 'MERGE_REQUEST current=base incoming=topic');
    const baseAncestors = ancestorSet(current, parents);
    const incomingAncestors = ancestorSet(incoming, parents);
    const common = [...baseAncestors].filter(id => incomingAncestors.has(id));
    const best = common.filter(candidate => !common.some(other => other !== candidate && ancestorSet(other, parents).has(candidate))).sort();
    const strategy = !best.length ? 'NO_COMMON_ANCESTOR' : baseAncestors.has(incoming) ? 'ALREADY_UP_TO_DATE' : incomingAncestors.has(current) ? 'FAST_FORWARD' : 'THREE_WAY_MERGE';
    const expected = `MERGE_STRATEGY from=topic into=base type=${strategy} lca=${best.length ? best.join(',') : 'NONE'}`;
    assert.equal(runSolution(exercise.solution, lines.join('\n')), expected, `graphe ${scenario}`);
  }
});

test('bisect : 66 historiques linéaires et positions de rupture', () => {
  const exercise = exercises.find(item => item.id === 'gh3-c3-e2');
  let checked = 0;
  for (let count = 2; count <= 12; count += 1) {
    for (let firstBad = 1; firstBad < count; firstBad += 1) {
      const ids = Array.from({ length: count }, (_, index) => `C${index}`);
      const statuses = ids.map((id, index) => `${id}=${index < firstBad ? 'GOOD' : 'BAD'}`);
      const output = [];
      let low = 0;
      let high = count - 1;
      let step = 0;
      while (low < high) {
        const middle = Math.floor((low + high) / 2);
        const verdict = middle < firstBad ? 'GOOD' : 'BAD';
        if (verdict === 'GOOD') low = middle + 1;
        else high = middle;
        output.push(`BISECT_STEP step=${++step} testing=${ids[middle]} verdict=${verdict} remaining=${high - low + 1}`);
      }
      output.push(`FIRST_BAD_COMMIT id=${ids[low]}`);
      assert.equal(runSolution(exercise.solution, `HISTORY commits=${ids.join(',')}\nSTATUSES ${statuses.join(' ')}`), output.join('\n'));
      checked += 1;
    }
  }
  assert.equal(checked, 66);
});

test('stash : 100 opérations comparées à une pile indépendante', () => {
  const exercise = exercises.find(item => item.id === 'gh3-c3-e3');
  const random = randomGenerator(0x204212);
  const stack = [];
  const input = [];
  const output = [];
  const actions = ['push', 'pop', 'apply', 'drop'];
  for (let index = 0; index < 100; index += 1) {
    const action = actions[random(actions.length)];
    let result = 'OK';
    if (action === 'push') {
      const message = `message-${index}`;
      input.push(`STASH_CMD action=push arg=${message}`);
      stack.unshift(message);
    } else if (action === 'pop') {
      input.push('STASH_CMD action=pop');
      if (!stack.length) result = 'STACK_EMPTY';
      else stack.shift();
    } else {
      const selected = random(stack.length + 3);
      input.push(`STASH_CMD action=${action} arg=${selected}`);
      if (!stack.length) result = 'STACK_EMPTY';
      else if (selected >= stack.length) result = 'INDEX_OUT_OF_BOUNDS';
      else if (action === 'drop') stack.splice(selected, 1);
    }
    output.push(`STASH_OP action=${action} result=${result} current_size=${stack.length} top="${stack.length ? stack[0] : 'EMPTY'}"`);
  }
  assert.equal(runSolution(exercise.solution, input.join('\n')), output.join('\n'));
});

test('commits conventionnels : types, scopes et marqueurs combinés', () => {
  const exercise = exercises.find(item => item.id === 'gh3-c4-e3');
  const types = ['feat', 'fix', 'docs', 'refactor', 'test', 'chore', 'perf', 'ci'];
  const scopes = ['', '(api)', '(mod_2)'];
  const input = [];
  const output = [];
  for (const type of types) {
    for (const scope of scopes) {
      for (const marker of ['', '!']) {
        const id = input.length;
        input.push(`COMMIT_MSG id=${id} msg=${type}${scope}${marker}: texte`);
        output.push(`CONVENTIONAL_AUDIT id=${id} valid=OUI type=${type} scope=${scope ? scope.slice(1, -1) : 'NONE'} breaking=${marker ? 'OUI' : 'NON'}`);
      }
    }
  }
  input.push('COMMIT_MSG id=style msg=style: hors profil', 'COMMIT_MSG id=empty msg=fix: ', 'COMMIT_MSG id=bad msg=feat:sans espace');
  output.push('CONVENTIONAL_AUDIT id=style valid=NON error=TYPE_INCONNU', 'CONVENTIONAL_AUDIT id=empty valid=NON error=DESCRIPTION_VIDE', 'CONVENTIONAL_AUDIT id=bad valid=NON error=FORMAT_INVALIDE');
  assert.equal(runSolution(exercise.solution, input.join('\n')), output.join('\n'));
});

test('LFS : 30 combinaisons de taille, extension et casse', () => {
  const exercise = exercises.find(item => item.id === 'gh3-c6-e1');
  const sizes = ['0', '1', '104857599', '104857600', '104857601'];
  const extensions = ['.iso', '.psd', '.zip', '.tar.gz', '.mp4', '.ISO'];
  const input = [];
  const output = [];
  for (const extension of extensions) {
    for (const size of sizes) {
      const path = `file-${input.length}${extension}`;
      input.push(`FILE path=${path} size_bytes=${size} sha256=${objectId}`);
      const tracked = extension !== '.ISO' || BigInt(size) >= 104857600n;
      if (tracked) output.push(`LFS_DECISION file="${path}" mode=LFS_POINTER oid="${objectId}" size=${size}\nversion https://git-lfs.github.com/spec/v1\noid sha256:${objectId}\nsize ${size}`);
      else output.push(`LFS_DECISION file="${path}" mode=GIT_BLOB`);
    }
  }
  assert.equal(runSolution(exercise.solution, input.join('\n')), output.join('\n'));
});

test('purge : 40 graphes et instantanés comparés à un oracle indépendant', () => {
  const exercise = exercises.find(item => item.id === 'gh3-c6-e3');
  const random = randomGenerator(0x204213);
  for (let scenario = 0; scenario < 40; scenario += 1) {
    const count = 1 + random(10);
    const lines = [];
    const rewritten = new Set();
    const records = [];
    const target = random(3) ? 'secret.dat' : 'absent.dat';
    for (let index = 0; index < count; index += 1) {
      const id = `C${index}`;
      const parents = randomParents(index, random);
      const files = ['app.py', 'notes.md', 'secret.dat'].filter(() => random(5) < 3);
      lines.push(`COMMIT id=${id} files=${files.join(',')} parents=${parents.length ? parents.join(',') : 'NONE'}`);
      if (files.includes(target) || parents.some(parent => rewritten.has(parent))) {
        rewritten.add(id);
        records.push(`REWRITTEN_COMMIT old="${id}" new="r_${id}" remaining_files=[${files.filter(file => file !== target).join(',')}]`);
      }
    }
    lines.push(`PURGE_FILE target=${target}`);
    const tip = `C${count - 1}`;
    const header = `PURGE_RESULT target="${target}" impacted_count=${rewritten.size} new_tip_hash="${rewritten.has(tip) ? `r_${tip}` : tip}"`;
    assert.equal(runSolution(exercise.solution, lines.join('\n')), [header, ...records].join('\n'), `graphe ${scenario}`);
  }
});

test('la route refuse les 18 soumissions suspendues sans quota ni exécution', async () => {
  const authPath = require.resolve('../server/utils/auth');
  const routePath = require.resolve('../server/routes/exercises');
  const priorAuth = require.cache[authPath];
  const priorRoute = require.cache[routePath];
  const execution = require('../server/services/execution');
  const budget = require('../server/services/execution/budget');
  const priorExecute = execution.execute;
  const priorCanExecute = budget.canExecute;
  const priorConsume = budget.consume;
  const handlers = new Map();
  let forbiddenCalls = 0;
  require.cache[authPath] = {
    id: authPath,
    filename: authPath,
    loaded: true,
    exports: { getUser: () => ({ userId: 'utilisateur-test' }), requireUser: () => null, quotaKey: () => 'test' }
  };
  delete require.cache[routePath];
  execution.execute = () => { forbiddenCalls += 1; throw new Error('exécution interdite'); };
  budget.canExecute = () => { forbiddenCalls += 1; throw new Error('quota interdit'); };
  budget.consume = () => { forbiddenCalls += 1; throw new Error('quota interdit'); };
  try {
    const register = require(routePath);
    await register({ post: (path, options, handler) => handlers.set(path, handler), log: { error() {} } });
    const handler = handlers.get('/exercise/submit');
    assert.equal(typeof handler, 'function');
    for (const exercise of exercises) {
      const reply = {
        code(status) { this.statusCode = status; return this; },
        send(payload) { this.payload = payload; return payload; }
      };
      await handler({ body: { exerciseId: exercise.id, code: 'echo test' }, ip: '127.0.0.1' }, reply);
      assert.equal(reply.statusCode, 503, exercise.id);
      assert.equal(reply.payload.status, 'grading_suspended', exercise.id);
    }
    assert.equal(forbiddenCalls, 0);
  } finally {
    execution.execute = priorExecute;
    budget.canExecute = priorCanExecute;
    budget.consume = priorConsume;
    if (priorAuth) require.cache[authPath] = priorAuth;
    else delete require.cache[authPath];
    if (priorRoute) require.cache[routePath] = priorRoute;
    else delete require.cache[routePath];
  }
});

}
