'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const first = require('../server/content/b3-hacking/chapitre1');
const second = require('../server/content/b3-hacking/chapitre2');
const exercises = require('../server/exercises/b3-hacking');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const exercise = id => exercises.find(item => item.id === id);

test('F153 : le niveau CVSS 0.0 est NONE et LOW commence à 0.1', () => {
  const section = first.sections.find(item => /CVSS/.test(item.title)).html;
  assert.match(section, /0\.0[^.]*NONE/i);
  assert.match(section, /0\.1[^.]*3\.9[\s\S]{0,50}LOW/i);
});

test('F154 : la condition juridique et la limite de vérification sont explicites', () => {
  const section = first.sections.find(item => /Juridique/.test(item.title)).html;
  assert.match(section, /323-2[^.]*24 juillet 2015/i);
  assert.match(section, /données à caractère personnel mis en œuvre par l'État/i);
  assert.match(section, /référence directe n'a pas pu être contrôlée/i);
});

test('F73 : les journaux CT listent des certificats, pas tous les sous-domaines', () => {
  const question = second.questions.find(item => /Certificate Transparency/.test(item.stem));
  assert.match(question.exp, /wildcard/i);
  assert.match(question.exp, /(?:pas|n’)[^.]*tous/i);
  assert.match(question.opts[question.correct], /certificat/i);
});

test('F77 : une adresse IP identique au wildcard ne disqualifie pas un nom réel', () => {
  const card = second.flashcards.find(item => /wildcard/i.test(item.q));
  assert.match(card.a, /même[^.]*IP/i);
  assert.match(card.a, /(?:légitime|réel)/i);
  const item = exercise('hk3-c2-e3');
  assert.match(item.brief, /ne (?:prouve|permet)/i);
  assert.doesNotMatch(JSON.stringify(item), /wildcards_filtered|valid_found|faux positifs vers le wildcard/i);
});

test('Les cartes et le résumé distinguent zone transférée, délégations et sources DNS', () => {
  const transfer = second.flashcards.find(item => /dig.*AXFR/i.test(item.q));
  const passive = second.flashcards.find(item => /différence fondamentale entre reconnaissance passive/i.test(item.q));
  const definition = second.notions.find(item => /AXFR/i.test(item.term));
  assert.match(transfer.q, /example\.test/i);
  assert.match(transfer.a, /zone[^.]*transférée/i);
  assert.match(transfer.a, /(?:pas nécessairement|ne comprend pas nécessairement)[^.]*zones? enfants/i);
  assert.match(passive.a, /DNS[^.]*direct[^.]*active/i);
  assert.match(definition.def, /zone[^.]*transférée/i);
  assert.doesNotMatch(definition.def, /arborescence intégrale des sous-domaines/i);
  assert.doesNotMatch(second.summary.join(' '), /cartographie complète des sous-domaines/i);
  assert.doesNotMatch(second.objectives.join(' '), /filtrant systématiquement l.IP wildcard/i);
  assert.doesNotMatch(second.checklist.join(' '), /élimination des faux positifs DNS wildcard/i);
});

test('DNS wildcard et DMARC conservent les limites des modèles dans le cours et les QCM', () => {
  const dns = second.sections.find(item => /Cartographie DNS/.test(item.title)).html;
  const mail = second.sections.find(item => /Sécurité de Messagerie/.test(item.title)).html;
  const wildcard = second.questions.find(item => /brute-force de sous-domaines/.test(item.stem));
  const dmarc = second.questions.find(item => /politique DMARC/.test(item.stem));
  assert.doesNotMatch(dns, /cartographie complète des services|Asynchronous Full Transfer|ensemble de l'arborescence des sous-domaines/i);
  assert.match(dns, /zones enfants déléguées/i);
  assert.match(mail, /SPF ou DKIM[^.]*align/i);
  assert.match(mail, /récepteur[^.]*décid/i);
  assert.match(mail, /RFC 9989/i);
  assert.match(wildcard.opts[wildcard.correct], /(?:certains|peut)/i);
  assert.match(wildcard.exp, /(?:légitime|existant)[^.]*même adresse IP/i);
  assert.doesNotMatch(wildcard.opts[wildcard.correct], /Toutes les requêtes/i);
  assert.match(dmarc.exp, /align/i);
  assert.match(dmarc.exp, /(?:récepteur|destinataire)/i);
});

test('F189 : une recherche SNMP infructueuse ne prouve pas la sécurité', () => {
  const item = exercise('hk3-c3-e3');
  assert.match(item.brief, /ne (?:prouve|permet)/i);
  assert.doesNotMatch(JSON.stringify(item), /status=SECURE|risk=LOW/);
  assert.ok(item.tests.some(entry => /status=NON_TROUVEE/.test(entry.expected)));
});

test('F191 : l’absence de signature ne prouve pas l’innocuité', () => {
  const item = exercise('hk3-c6-e1');
  assert.match(item.brief, /ne (?:prouve|permet)/i);
  assert.doesNotMatch(JSON.stringify(item), /BENIGN_CODE|risk=LOW/);
  assert.ok(item.tests.some(entry => /status=AUCUN_INDICE/.test(entry.expected)));
});

test('les grilles corrigées concordent avec leurs copies et le sélecteur local', async () => {
  for (const id of ['hk3-c2-e3', 'hk3-c3-e3', 'hk3-c6-e1']) {
    const item = exercise(id);
    const copy = require(`../server/exercises/b3-hacking/chapitre${item.chapter}`).find(entry => entry.id === id);
    assert.deepEqual(copy, item);
    const report = await runTests(item, item.solution, { execute: async ({ code, stdin }) => {
      const result = await runAnalyse(code, stdin);
      return { ok: result.ok, stdout: result.data.stdout };
    } });
    assert.equal(report.passed, report.total, id);
    const example = await runAnalyse(item.solution, 'cas:exemple');
    assert.equal(example.data.stdout, item.examples[0].expected, id);
  }
});

test('les sorties des trois modèles sont recalculées indépendamment', () => {
  const fields = input => Object.fromEntries(input.split(' ').slice(1).map(field => {
    const equal = field.indexOf('=');
    return [field.slice(0, equal), field.slice(equal + 1)];
  }));
  const models = {
    'hk3-c2-e3': input => {
      const data = fields(input);
      const records = data.responses.split(',').map(record => record.split(':'));
      const same = records.filter(([, ip]) => data.wildcard_ip !== 'NONE' && ip === data.wildcard_ip).map(([name]) => `${name}.${data.domain}`).sort();
      const other = records.filter(([, ip]) => data.wildcard_ip === 'NONE' || ip !== data.wildcard_ip).map(([name]) => `${name}.${data.domain}`).sort();
      return `SUBDOMAIN_GROUP: domain=${data.domain} total=${records.length} meme_ip=${same.length} noms_meme=${same.join(',') || 'NONE'} autre_ip=${other.length} noms_autres=${other.join(',') || 'NONE'}`;
    },
    'hk3-c3-e3': input => {
      const data = fields(input);
      const candidates = data.wordlist.split(',');
      const index = candidates.indexOf(data.target_community);
      return index < 0 ? `SNMP_AUDIT: target=${data.target} status=NON_TROUVEE attempts=${candidates.length} risk=NON_EVALUE` :
        `SNMP_AUDIT: target=${data.target} status=TROUVEE matched_community=${data.target_community} perm=${data.target_perm} attempts=${index + 1} risk=NON_EVALUE sys_descr=${data.sys_descr}`;
    },
    'hk3-c6-e1': input => {
      const code = input.slice(input.indexOf('code=') + 'code='.length);
      const families = [
        [['system', 'passthru', 'shell_exec', 'popen'], 40],
        [['eval', 'assert'], 30],
        [['base64_decode', 'gzinflate', 'str_rot13'], 20],
        [['$_GET', '$_POST', '$_REQUEST'], 20]
      ];
      const score = families.reduce((total, [terms, weight]) => total + (terms.some(term => code.includes(term)) ? weight : 0), 0);
      const status = score >= 60 ? 'INDICES_FORTS' : score >= 20 ? 'INDICES' : 'AUCUN_INDICE';
      return `WEBSHELL_SCAN: score=${score} status=${status} risk=NON_EVALUE`;
    }
  };
  for (const [id, calculate] of Object.entries(models)) {
    const item = exercise(id);
    const inputs = [item.examples[0].stdin, ...item.starter.split(/(?=^\[Cas \d+ — )/m).slice(1).map(block =>
      block.split('\n').find(line => line.startsWith('# Données : ')).slice('# Données : '.length))];
    const expected = [item.examples[0].expected, ...item.tests.map(entry => entry.expected)];
    assert.equal(inputs.length, expected.length, id);
    inputs.forEach((input, index) => assert.equal(calculate(input), expected[index], `${id} cas ${index}`));
  }
});
