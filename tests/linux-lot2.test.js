'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const parse5 = require('parse5');
const firstB1 = require('../server/content/b1-linux/chapitres-1-3');
const secondB1 = require('../server/content/b1-linux/chapitres-4-6');
const firstB2 = require('../server/content/linux/chapitres-1-3');
const secondB2 = require('../server/content/linux/chapitres-4-6');
const exercisesB1 = require('../server/exercises/b1-linux');
const exercisesB2 = require('../server/exercises/linux');

const root = path.resolve(__dirname, '..');
const toolsAvailable = ['/usr/bin/ssh', '/usr/bin/find', '/usr/bin/mv', '/usr/bin/cp', '/usr/bin/chmod']
  .every(name => fs.existsSync(name));

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}

function text(node) {
  return descendants(node).filter(child => child.nodeName === '#text').map(child => child.value).join('').replace(/\s+/g, ' ');
}

function page(name) {
  return text(parse5.parse(fs.readFileSync(path.join(root, name), 'utf8')));
}

function assertOnlyIncorrectAnswers(name, expression) {
  const document = parse5.parse(fs.readFileSync(path.join(root, name), 'utf8'));
  for (const node of descendants(document).filter(child => child.nodeName === '#text' && expression.test(child.value))) {
    let ancestor = node.parentNode;
    while (ancestor && ancestor.tagName !== 'button') ancestor = ancestor.parentNode;
    assert.ok(ancestor, `${name} : commande incorrecte hors d’un distracteur`);
    assert.ok(!(ancestor.attrs || []).some(attribute => attribute.name === 'data-correct' && attribute.value === '1'),
      `${name} : commande incorrecte marquée correcte`);
  }
}

function section(chapter, expression) {
  const item = chapter.sections.find(candidate => expression.test(candidate.title));
  assert.ok(item, `Section absente : ${expression}`);
  return text(parse5.parseFragment(item.html));
}

function question(chapter, expression) {
  const item = chapter.questions.find(candidate => expression.test(candidate.stem || candidate.q));
  assert.ok(item, `Question absente : ${expression}`);
  assert.ok(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < item.opts.length);
  return item;
}

function card(chapter, expression) {
  const item = chapter.flashcards.find(candidate => expression.test(candidate.q));
  assert.ok(item, `Carte absente : ${expression}`);
  return item.a;
}

function exercise(catalogue, identifier) {
  const item = catalogue.find(candidate => candidate.id === identifier);
  assert.ok(item, `Exercice absent : ${identifier}`);
  return item;
}

function temporary(callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-linux-lot2-'));
  try {
    return callback(directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

test('F14 : syntaxe SSH explicite dans cours, QCM, carte et exercices', () => {
  const chapter = secondB2[0];
  const lesson = section(chapter, /Se connecter en SSH/);
  const item = question(chapter, /SSH.*port 2222/i);
  assert.match(lesson, /ssh -p 2222 sam@serveur/);
  assert.match(item.opts[item.correct], /ssh -p 2222 sam@serveur/);
  assert.match(card(chapter, /cible SSH/i), /ssh -p PORT utilisateur@hote/i);
  assert.match(exercise(exercisesB2, 'lx2-c4-e3').brief, /notation.*exercice.*(?:pas|n’est pas).*commande SSH/is);
  for (const name of ['linux/chapitres/chapitre4.html', 'linux/chapitres/cartes.html',
    'linux/chapitres/formules.html', 'linux/chapitres/simulateur-examen.html']) {
    assertOnlyIncorrectAnswers(name, /ssh sam@serveur:2222/i);
  }
});

test('F14 : OpenSSH interprète -p sans ouvrir de connexion', { skip: toolsAvailable ? false : 'outils GNU et OpenSSH requis' }, () => {
  temporary(directory => {
    const result = spawnSync('/usr/bin/ssh', ['-G', '-F', '/dev/null', '-p', '2222', 'sam@serveur.invalid'], {
      env: { HOME: directory, PATH: '/usr/bin:/bin', LANG: 'C' }, encoding: 'utf8', timeout: 5000
    });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /^user sam$/m);
    assert.match(result.stdout, /^hostname serveur\.invalid$/m);
    assert.match(result.stdout, /^port 2222$/m);
  });
});

test('F147 : cp -r et mv ne partagent pas l’option récursive', () => {
  const lesson = section(firstB2[1], /Copier, déplacer/);
  assert.match(lesson, /cp.{0,70}-r/is);
  assert.match(lesson, /mv.{0,90}(?:sans|ne prend pas).{0,30}-r/is);
  assert.doesNotMatch(lesson, /cp.{0,30}et.{0,30}mv.{0,100}acceptent.{0,30}-r/is);
  assert.match(page('linux/chapitres/chapitre2.html'), /mv.{0,90}(?:sans|ne prend pas).{0,30}-r/is);
});

test('F147 : sondes GNU cp et mv', { skip: toolsAvailable ? false : 'outils GNU et OpenSSH requis' }, () => {
  assert.equal(spawnSync('/usr/bin/cp', ['-r', '--help'], { encoding: 'utf8', timeout: 5000 }).status, 0);
  assert.notEqual(spawnSync('/usr/bin/mv', ['-r', '--help'], { encoding: 'utf8', timeout: 5000 }).status, 0);
  temporary(directory => {
    fs.mkdirSync(path.join(directory, 'source'));
    fs.writeFileSync(path.join(directory, 'source', 'fichier'), 'contenu');
    const result = spawnSync('/usr/bin/mv', ['source', 'destination'], { cwd: directory, encoding: 'utf8', timeout: 5000 });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(fs.readFileSync(path.join(directory, 'destination', 'fichier'), 'utf8'), 'contenu');
  });
});

test('F149 : sauvegarder /etc ne suffit pas à restaurer la machine', () => {
  const chapter = firstB2[0];
  const lesson = section(chapter, /arborescence FHS/);
  const item = question(chapter, /fichiers de configuration/i);
  assert.match(lesson, /sauvegard.{0,180}\/home.{0,180}(?:\/var|données)/is);
  assert.match(lesson, /restauration.{0,80}(?:testée|vérifiée)/i);
  assert.doesNotMatch(item.exp, /sauvegarder la machine/i);
  assert.match(card(chapter, /Rôle de \/etc/), /configuration/i);
  assert.match(page('linux/chapitres/simulateur-examen.html'), /restauration.{0,80}(?:testée|vérifiée)/i);
  const introductoryLesson = section(firstB1[1], /arbre unique/i);
  const introductoryQuestion = question(firstB1[1], /fichiers de configuration/i);
  assert.match(introductoryLesson, /restaurer la configuration.{0,100}données sauvegardées séparément/i);
  assert.match(introductoryQuestion.exp, /plan.{0,40}données/i);
});

test('F93 : /tmp est temporaire mais pas systématiquement vidé au démarrage', () => {
  for (const [chapter, filename] of [[firstB1[1], 'b1-linux/chapitres/chapitre2.html'],
    [firstB2[0], 'linux/chapitres/chapitre1.html']]) {
    const lesson = section(chapter, /(?:arbre unique|arborescence FHS)/i);
    assert.match(lesson, /(?:supprimés|effacés).{0,60}(?:possible|moment|politique|garanti)/i);
    assert.doesNotMatch(lesson, /effacés à chaque redémarrage/i);
    assert.doesNotMatch(page(filename), /(?:effacé|vidé|effacés) à chaque (?:reboot|redémarrage)/i);
  }
  assert.match(card(firstB1[1], /Rôle de \/etc/), /(?:pouvant|peuvent|risquent).{0,40}(?:supprim|effac)/i);
});

test('F94 : noms dans les répertoires, métadonnées dans l’inode', () => {
  const chapter = firstB1[1];
  const lesson = section(chapter, /Tout est fichier/);
  const item = question(chapter, /rôle de l’inode/i);
  assert.match(lesson, /nom.{0,120}répertoire.{0,100}inode/is);
  assert.match(lesson, /liens physiques.{0,100}(?:même|partagent).{0,40}inode/is);
  assert.match(item.exp, /nom.{0,80}répertoire/i);
  assert.match(page('b1-linux/chapitres/chapitre2.html'), /nom.{0,120}répertoire.{0,100}inode/is);
  temporary(directory => {
    const original = path.join(directory, 'premier');
    const alias = path.join(directory, 'second');
    fs.writeFileSync(original, 'données');
    fs.linkSync(original, alias);
    assert.equal(fs.statSync(original).ino, fs.statSync(alias).ino);
    assert.notEqual(path.basename(original), path.basename(alias));
    assert.equal(fs.readFileSync(alias, 'utf8'), 'données');
  });
});

test('F95 : le plafond de quatre entrées concerne MBR, pas GPT', () => {
  const chapter = firstB1[1];
  const lesson = section(chapter, /Partitions, montage/);
  const item = question(chapter, /partitions principales.*MBR/i);
  assert.match(lesson, /MBR.{0,200}(?:quatre|4)/is);
  assert.match(lesson, /étendue.{0,100}(?:occupe|utilise).{0,60}(?:entrée|emplacement)/is);
  assert.match(lesson, /GPT.{0,150}(?:autre|différent|plus de quatre)/is);
  assert.equal(item.opts[item.correct], 'Quatre');
  assert.match(page('b1-linux/chapitres/chapitre2.html'), /GPT.{0,150}(?:autre|différent|plus de quatre)/is);
});

test('F96 : ctime concerne l’état de l’inode, pas la création', () => {
  const lesson = section(firstB1[2], /find :/);
  assert.match(lesson, /-ctime.{0,80}(?:état|statut).{0,60}inode/is);
  assert.match(lesson, /chmod.{0,120}(?:ctime|état)/is);
  assert.doesNotMatch(lesson, /-ctime.{0,80}création\s*\//is);
  temporary(directory => {
    const filename = path.join(directory, 'donnee');
    fs.writeFileSync(filename, 'contenu');
    const before = fs.statSync(filename);
    fs.chmodSync(filename, 0o600);
    const after = fs.statSync(filename);
    assert.equal(after.mtimeMs, before.mtimeMs);
    assert.equal(after.mode & 0o777, 0o600);
    assert.ok(after.ctimeMs >= before.ctimeMs);
  });
});

test('F105 : syntaxe usuelle et chemin implicite de GNU find', { skip: toolsAvailable ? false : 'outils GNU et OpenSSH requis' }, () => {
  const chapter = firstB1[2];
  const syntax = section(chapter, /syntaxe d’une commande/i);
  const find = section(chapter, /find :/);
  const item = question(chapter, /forme.*fréquente.*commande/i);
  assert.match(syntax, /(?:forme|modèle).{0,50}(?:fréquent|courant)/i);
  assert.match(syntax, /(?:varie|dépend).{0,40}commande/i);
  assert.match(find, /sans.{0,40}chemin.{0,80}répertoire courant/i);
  assert.match(item.opts[item.correct], /COMMANDE OPTIONS ARGUMENTS/);
  temporary(directory => {
    const result = spawnSync('/usr/bin/find', ['-maxdepth', '0', '-print'], { cwd: directory, encoding: 'utf8', timeout: 5000 });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trim(), '.');
  });
});

test('F98 : le swap est initialisé et activé, non monté comme ext4', () => {
  const chapter = secondB1[0];
  const lesson = section(chapter, /Partitionner pour Debian/);
  assert.match(lesson, /swap.{0,120}(?:initialisé|initialisée).{0,60}activé/is);
  assert.match(lesson, /swap.{0,150}(?:pas|ne).{0,35}monté/is);
  assert.match(lesson, /swapon --show/i);
  assert.doesNotMatch(chapter.summary.join(' '), /chaque partition.{0,100}point de montage/i);
  assert.match(page('b1-linux/chapitres/chapitre4.html'), /swapon --show/i);
});

test('F99 : verrouillage du mot de passe distinct du compte', () => {
  for (const [chapter, title, filename] of [[secondB1[1], /fichier \/etc\/passwd/, 'b1-linux/chapitres/chapitre5.html'],
    [firstB2[2], /Comptes et groupes/, 'linux/chapitres/chapitre3.html']]) {
    const lesson = section(chapter, title);
    assert.match(lesson, /!|\*/);
    assert.match(lesson, /(?:mot de passe).{0,120}(?:autre|clé SSH)/is);
    assert.doesNotMatch(lesson, /\*.{0,50}(?:impossible de s’authentifier|interdit l’authentification)/is);
    assert.match(page(filename), /(?:autre|clé SSH).{0,100}(?:authentification|connexion)|(?:authentification|connexion).{0,100}(?:autre|clé SSH)/is);
  }
  assert.doesNotMatch(page('b1-linux/chapitres/simulateur-examen.html'), /!! désactive le compte/i);
  assert.doesNotMatch(page('linux/chapitres/formules.html'), /!! désactive/i);
});

test('F100 : seuil UID 1000 documenté comme convention configurable', () => {
  for (const chapter of [secondB1[1], firstB2[2]]) {
    const lesson = section(chapter, /(?:fichier \/etc\/passwd|Comptes et groupes)/);
    assert.match(lesson, /UID_MIN/i);
    assert.match(lesson, /1000.{0,140}(?:convention|configur|exemple)/is);
  }
  assert.match(exercise(exercisesB1, 'lx-c3-e3').brief, /(?:convention|simulation).{0,100}1000/is);
  assert.match(secondB1[1].objectives.join(' '), /plages UID.{0,30}configurables/i);
  assert.match(page('b1-linux/chapitres/formules.html'), /UID_MIN/);
  assert.match(page('linux/chapitres/formules.html'), /UID_MIN/);
});

test('F102 : la différence entre = et + dépend des droits initiaux', { skip: toolsAvailable ? false : 'outils GNU et OpenSSH requis' }, () => {
  const lesson = section(secondB1[2], /chmod : symbolique/);
  assert.match(lesson, /440.{0,160}770.{0,160}770/is);
  assert.match(lesson, /400.{0,160}770.{0,160}730/is);
  temporary(directory => {
    for (const initial of [0o440, 0o400]) {
      const expected = initial === 0o440 ? [0o770, 0o770] : [0o770, 0o730];
      for (const [index, action] of ['ug=rwx', 'ug+wx'].entries()) {
        const filename = path.join(directory, `${initial}-${index}`);
        fs.writeFileSync(filename, 'test');
        fs.chmodSync(filename, initial);
        const result = spawnSync('/usr/bin/chmod', [action, filename], { encoding: 'utf8', timeout: 5000 });
        assert.equal(result.status, 0, result.stderr);
        assert.equal(fs.statSync(filename).mode & 0o777, expected[index]);
      }
    }
  });
});

test('F106 : shadow contient des vérificateurs hachés, pas des mots de passe déchiffrables', () => {
  const first = section(secondB1[1], /shadow et \/etc\/group/i);
  const second = section(firstB2[2], /Comptes et groupes/i);
  for (const lesson of [first, second]) {
    assert.match(lesson, /hach(?:age|é)/i);
    assert.match(lesson, /sel/i);
    assert.doesNotMatch(lesson, /mots de passe chiffrés/i);
  }
  assert.match(card(secondB1[1], /(?:vérificateurs|empreintes)/i), /hach/i);
  assert.doesNotMatch(page('b1-linux/chapitres/formules.html'), /mots de passe chiffrés/i);
  assert.doesNotMatch(page('linux/chapitres/formules.html'), /mots de passe chiffrés/i);
});
