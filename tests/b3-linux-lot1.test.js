'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const exercises = require('../server/exercises/b3-linux');
const { runTests, MAX_TESTS } = require('../server/exercises/runner');

if (process.env.REVI_ISOLE !== '1' || process.env.HOME !== undefined && process.env.HOME !== '/tmp') {
  throw new Error('Exécutez ce banc dans bubblewrap, sans réseau ni HOME, avec REVI_ISOLE=1.');
}

const independent = {
  'lx3-c1-e1': {
    stdin: 'PROC_STAT pid=7 comm=daemon state=T ppid=1 utime=1 stime=2 rss=3',
    expected: 'STAT_AUDIT pid=7 comm=daemon state_label=STOPPED total_ticks=3 mem_kb=12'
  },
  'lx3-c1-e2': {
    stdin: 'VMMAP pid=6 start=ffffffffff600000 end=ffffffffff601000 perms=rwxp pathname=[other]',
    expected: 'MAP_AUDIT pid=6 path=[other] size_kb=4 wx_violation=OUI'
  },
  'lx3-c1-e3': {
    stdin: 'SYSCALL pid=8 name=unlink args="/tmp/locked" ret=EPERM time_us=5001',
    expected: 'SYSCALL_PROFILE pid=8 name=unlink status=ERROR err=EPERM duration_us=5001 slow=OUI'
  },
  'lx3-c2-e1': {
    stdin: 'SERVICE_DEF name=batch.service desc="Batch worker" exec_start=/usr/bin/env wanted_by=night.target',
    expected: 'SERVICE_VALIDATION name=batch.service valid=OUI error=OK'
  },
  'lx3-c2-e2': {
    stdin: 'UNIT_DEP name=first.service requires=second.service\nUNIT_DEP name=second.service requires=first.service\nUNIT_DEP name=client.service requires=first.service',
    expected: 'DEP_CHECK unit=first.service cycle=OUI reason=CYCLE_DIRECT\nDEP_CHECK unit=second.service cycle=OUI reason=CYCLE_DIRECT\nDEP_CHECK unit=client.service cycle=NON reason=OK'
  },
  'lx3-c2-e3': {
    stdin: 'JOURNAL id=42 priority=2 unit=sshd.service msg="Out of capacity"',
    expected: 'JOURNAL_AUDIT id=42 unit=sshd.service level=CRITICAL alert=OUI'
  },
  'lx3-c3-e1': {
    stdin: 'LVM_REQ vg=odd pe_size_mb=3 total_pv_gb=2 lv_target_gb=1',
    expected: 'LVM_AUDIT vg=odd status=ALLOCATED pe_used=342 pe_free_or_deficit=340'
  },
  'lx3-c3-e2': {
    stdin: 'RAID_CONF device=md9 level=RAID6 total=6 active=3 failed=3 spares=1',
    expected: 'RAID_DIAG dev=md9 level=RAID6 state=FAILED action=CRITICAL_DATA_LOSS'
  },
  'lx3-c3-e3': {
    stdin: 'FS_METRICS mount=/cache blocks_total=100 blocks_used=59 inodes_total=100 inodes_used=90',
    expected: 'FS_STATUS mount=/cache block_pct=59% inode_pct=90% status=ALERT diag=INODE_EXHAUSTION'
  },
  'lx3-c4-e1': {
    stdin: 'NS_CHECK pid=51 ns_pid=1 ns_net=2 ns_mnt=3 host_pid=9 host_net=2 host_mnt=7',
    expected: 'NS_STATUS pid=51 isolated=OUI isolated_count=2'
  },
  'lx3-c4-e2': {
    stdin: 'CGROUP group=rounding cpu_quota=125000 cpu_period=100000 mem_curr_mb=31 mem_max_mb=32',
    expected: 'CGROUP_AUDIT group=rounding cpu_cores=1.3 mem_status=OK'
  },
  'lx3-c4-e3': {
    stdin: 'OOM_PROC pid=14 comm=threshold mem_mb=900 oom_score_adj=100',
    expected: 'OOM_TARGET pid=14 comm=threshold score=1000 risk=LOW'
  },
  'lx3-c5-e1': {
    stdin: 'NET_IFACE name=brx type=bridge master=br0 ip=NONE state=DOWN',
    expected: 'NET_AUDIT iface=brx valid=NON error=INTERFACE_DOWN'
  },
  'lx3-c5-e2': {
    stdin: 'RULE prio=500 src=ANY dport=ANY table=main\nRULE prio=10 src=203.0.113.7 dport=ANY table=private\nPACKET id=42 src=203.0.113.7 dport=22',
    expected: 'ROUTE_MATCH packet=42 matched_prio=10 table=private'
  },
  'lx3-c5-e3': {
    stdin: 'CONF_NSSWITCH order=mdns,files,dns\nQUERY_HOST name=printer.local in_files=OUI in_dns=OUI in_mdns=OUI',
    expected: 'RESOLV_RESULT host=printer.local resolved_by=mdns status=SUCCESS'
  },
  'lx3-c6-e1': {
    stdin: 'SYSCTL_CHECK key=kernel.example current=01 recommended=1',
    expected: 'SYSCTL_AUDIT key=kernel.example current=01 target=1 status=HARDENING_REQUIRED'
  },
  'lx3-c6-e2': {
    stdin: 'PAM_STEP module=one.so control=required res=FAIL\nPAM_STEP module=two.so control=sufficient res=SUCCESS',
    expected: 'PAM_TRACE module=one.so control=required res=FAIL action=CONTINUE\nPAM_TRACE module=two.so control=sufficient res=SUCCESS action=CONTINUE\nPAM_FINAL decision=DENIED'
  },
  'lx3-c6-e3': {
    stdin: 'AUDIT_LOG id=77 uid=1002 euid=0 exe=/usr/bin/su res=failed',
    expected: 'AUDIT_REPORT id=77 exe=/usr/bin/su uid=1002 euid=0 alert=BLOCKED_PRIVILEGE_ATTEMPT'
  }
};

const mutations = {
  'lx3-c1-e1': [
    ['fields["utime"] + fields["stime"]', 'fields["utime"]'],
    ['fields["rss"] * 4', 'fields["rss"]']
  ],
  'lx3-c1-e2': [
    ['index(fields["perms"], "w") && index(fields["perms"], "x")', 'index(fields["perms"], "w") || index(fields["perms"], "x")'],
    ["quotient = int(remainder / 1024)","quotient = int(remainder / 1024) + (position == width && remainder % 1024 > 0)"]
  ],
  'lx3-c1-e3': [
    ['fields["time_us"] + 0 > 5000', 'fields["time_us"] + 0 >= 5000'],
    ['fields["ret"] ~ /^-/ || fields["ret"] ~ /^E[A-Z0-9_]+$/', 'fields["ret"] ~ /^-/']
  ],
  'lx3-c2-e1': [
    ["fields[\"desc\"] == \"\" || fields[\"desc\"] == \"NONE\"","fields[\"desc\"] == \"\""],
    ['fields["wanted_by"] == "" || fields["wanted_by"] == "NONE"', 'fields["wanted_by"] == ""']
  ],
  'lx3-c2-e2': [
    ["target == name","0"],
    ['dependency[target] == name', 'dependency[target] != name']
  ],
  'lx3-c2-e3': [
    ['priority <= 3', 'priority < 3'],
    ['labels[4] = "WARNING"', 'labels[4] = "ERROR"']
  ],
  'lx3-c3-e1': [
    ['status = needed <= total', 'status = needed < total'],
    ['fields["lv_target_gb"] * 1024 + size - 1', 'fields["lv_target_gb"] * 1024 + size']
  ],
  'lx3-c3-e2': [
    ['failed > tolerance', 'failed >= tolerance'],
    ['fields["spares"] + 0 > 0', 'fields["spares"] + 0 >= 0']
  ],
  'lx3-c3-e3': [
    ['blocks >= 90 && inodes >= 90', 'blocks > 90 && inodes >= 90'],
    ['inodes >= 90 && blocks < 60', 'inodes >= 90 && blocks <= 60']
  ],
  'lx3-c4-e1': [
    ["fields[\"ns_pid\"] + 0 != fields[\"host_pid\"] + 0","0"],
    ['count > 0 ? "OUI"', 'count > 1 ? "OUI"']
  ],
  'lx3-c4-e2': [
    ['fields["mem_curr_mb"] + 0 >= fields["mem_max_mb"] + 0', 'fields["mem_curr_mb"] + 0 > fields["mem_max_mb"] + 0'],
    ['fields["cpu_quota"] * 10 + fields["cpu_period"] / 2', 'fields["cpu_quota"] * 10']
  ],
  'lx3-c4-e3': [
    ['adjustment == -1000', 'adjustment == -999'],
    ['score > 1000', 'score >= 1000']
  ],
  'lx3-c5-e1': [
    ["fields[\"state\"] != \"UP\"","0"],
    ['fields["type"] == "bridge" && fields["master"] != "NONE"', 'fields["type"] == "bridge" && fields["master"] == "NONE"']
  ],
  'lx3-c5-e2': [
    ['priority[position] < priority[best]', 'priority[position] > priority[best]'],
    ['source[position] == "ANY" || source[position] == fields["src"]', 'source[position] == fields["src"]']
  ],
  'lx3-c5-e3': [
    ['resolved = source; status = "SUCCESS"; break', 'resolved = source; status = "SUCCESS"; continue'],
    ["fields[\"in_\" source] == \"OUI\"","fields[\"in_\" source] == \"OUI\" && source != \"mdns\""]
  ],
  'lx3-c6-e1': [
    ["\"value:\" fields[\"current\"] == \"value:\" fields[\"recommended\"]","(fields[\"current\"] ~ /^[0-9]+$/ && fields[\"recommended\"] ~ /^[0-9]+$/ ? fields[\"current\"] + 0 == fields[\"recommended\"] + 0 : \"value:\" fields[\"current\"] == \"value:\" fields[\"recommended\"])"],
    ['"value:" fields["current"] == "value:" fields["recommended"]', 'tolower(fields["current"]) == tolower(fields["recommended"])']
  ],
  'lx3-c6-e2': [
    ['control == "sufficient" && !failed', 'control == "sufficient"'],
    ["control == \"requisite\" && result == \"FAIL\"","0"]
  ],
  'lx3-c6-e3': [
    ["uid == 0 && euid == 0","uid == 0 && euid != 0"],
    ['fields["res"] == "success"', 'fields["res"] != "success"']
  ]
};

function run(solution, stdin) {
  const result = spawnSync('/bin/bash', ['-c', solution], {
    input: stdin,
    encoding: 'utf8',
    timeout: 3000,
    maxBuffer: 1024 * 1024,
    env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8', LC_ALL: 'C' }
  });
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.replace(/\r\n/g, '\n').replace(/\n+$/, '');
}

test('les 18 exercices et leurs données indépendantes sont présents', () => {
  assert.equal(exercises.length, 18);
  assert.deepEqual(exercises.map(exercise => exercise.id).sort(), Object.keys(independent).sort());
});

for (const exercise of exercises) {
  test(`${exercise.id} : exemples et tests existants`, () => {
    for (const scenario of [...exercise.examples, ...exercise.tests]) {
      assert.equal(run(exercise.solution, scenario.stdin), scenario.expected, scenario.label || 'exemple');
    }
  });

  test(`${exercise.id} : entrée indépendante`, () => {
    const scenario = independent[exercise.id];
    assert.ok(![...exercise.examples, ...exercise.tests].some(item => item.stdin === scenario.stdin));
    assert.equal(run(exercise.solution, scenario.stdin), scenario.expected);
  });

  test(`${exercise.id} : deux variantes plausibles rejetées par le correcteur`, async () => {
    assert.equal(mutations[exercise.id].length, 2);
    for (const [original, replacement] of mutations[exercise.id]) {
      assert.ok(exercise.solution.includes(original), `${exercise.id} : mutation introuvable`);
      const variant = exercise.solution.replace(original, replacement);
      const report = await runTests(exercise, variant, {
        maxTests: MAX_TESTS,
        execute: async payload => ({ ok: true, status: 'success', stdout: run(variant, payload.stdin), exitCode: 0 })
      });
      assert.equal(report.stop && report.stop.reason, 'wrong_output', `${exercise.id} : variante acceptée`);
    }
  });
}

}
