'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const exercises = require('../server/exercises/docker');
const { MAX_TESTS, runTests } = require('../server/exercises/runner');
const { isGradingSuspended } = require('../server/exercises/grading-policy');
const { LIMITS, normalizeOutput } = require('../server/services/execution');

const independentCases = {
  'dk2-c1-e1': {
    stdin: 'mem_limit\nPID\nunknown_Thing\nMEM_LIMIT',
    expected: [
      "mem_limit -> PRIMITIVE: CGROUP | Plafond de memoire vive RAM et gestion de l'OOM-Killer",
      'PID -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)',
      'unknown_Thing -> INCONNU',
      "MEM_LIMIT -> PRIMITIVE: CGROUP | Plafond de memoire vive RAM et gestion de l'OOM-Killer"
    ].join('\n')
  },
  'dk2-c1-e2': {
    stdin: '3 33 51\n1200 300',
    expected: [
      'ARCHITECTURE VM: Disque 3699 Mo | RAM 1053 Mo',
      'ARCHITECTURE DOCKER: Disque 99 Mo | RAM 153 Mo',
      'ECONOMIE DOCKER: Disque -3600 Mo | RAM -900 Mo'
    ].join('\n')
  },
  'dk2-c1-e3': {
    stdin: 'RUNC\nCLI\nRUNC\nORCHESTRATOR',
    expected: [
      'RUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise',
      "CLI -> docker (client) | Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)",
      'RUNC -> runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise',
      'ORCHESTRATOR -> INCONNU'
    ].join('\n')
  },
  'dk2-c2-e1': {
    stdin: 'First : x:9, y:2\nSecond : y:2, z:7\nThird : x:9, z:7',
    expected: [
      'IMAGE: First -> TAILLE_APPARENTE: 11 Mo',
      'IMAGE: Second -> TAILLE_APPARENTE: 9 Mo',
      'IMAGE: Third -> TAILLE_APPARENTE: 16 Mo',
      'TOTAL_BRUT: 36 Mo | TOTAL_REEL: 18 Mo | ECONOMIE_DEDUPLICATION: -18 Mo'
    ].join('\n')
  },
  'dk2-c2-e2': {
    stdin: 'localhost:5000/my/api:edge\nregistry.example.com:5001/tools/app@sha256:eeee1111',
    expected: [
      'REF: localhost:5000/my/api:edge -> REGISTRE: localhost:5000 | IMAGE: my/api | TAG: edge | DIGEST: NONE',
      'REF: registry.example.com:5001/tools/app@sha256:eeee1111 -> REGISTRE: registry.example.com:5001 | IMAGE: tools/app | TAG: latest | DIGEST: sha256:eeee1111'
    ].join('\n')
  },
  'dk2-c2-e3': {
    stdin: [
      '/app/config, /usr/share/base',
      'WRITE /app/config',
      'DELETE /app/config',
      'READ /app/config',
      'CREATE /app/config',
      'READ /app/config',
      'WRITE /app/config',
      'DELETE /app/config',
      'READ /app/config'
    ].join('\n'),
    expected: [
      'WRITE /app/config -> MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)',
      "DELETE /app/config -> MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)",
      'READ /app/config -> ERREUR: Fichier introuvable (404 ENOENT)',
      'CREATE /app/config -> MECANISME: Creation directe dans Container Layer',
      'READ /app/config -> ACCES: Container Layer (Version modifiee)',
      'WRITE /app/config -> MECANISME: Ecriture directe dans Container Layer',
      "DELETE /app/config -> MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)",
      'READ /app/config -> ERREUR: Fichier introuvable (404 ENOENT)'
    ].join('\n')
  },
  'dk2-c3-e1': {
    stdin: [
      '# Exemple inédit',
      'ARG BASE=debian',
      'FROM $BASE',
      'RUN apt-get update && apt-get install -y ca-certificates',
      'ADD config.yml /tmp/',
      'ADD https://example.org/file.tar /tmp/'
    ].join('\n'),
    expected: [
      'AVERTISSEMENT [Ligne 5]: Preferer COPY a ADD pour les fichiers locaux',
      'AUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))'
    ].join('\n')
  },
  'dk2-c3-e2': {
    stdin: 'ENTRYPOINT: /bin/tool, --mode\nCMD: auto, old\nCLI_ARGS: --dry-run, --count=2',
    expected: 'COMMANDE_FINALE: /bin/tool --mode --dry-run --count=2'
  },
  'dk2-c3-e3': {
    stdin: 'MONOLITHIC: build 100 + 30 + 5 + 4\nSTAGE_BUILD: build 139 -> EXPORT: 4\nSTAGE_FINAL: tiny 11 + IMPORT: 4',
    expected: [
      'IMAGE_MONOLITHIQUE: 139 Mo',
      'IMAGE_MULTI_STAGE: 15 Mo',
      'GAIN_SECURITE_ET_TAILLE: -124 Mo (89.2% economises)'
    ].join('\n')
  },
  'dk2-c4-e1': {
    stdin: 'create\nstart\npause\nunpause\nrestart\npause\nrm\nunpause\nkill\nrm\nstart',
    expected: [
      'create -> NOUVEL_ETAT: CREATED',
      'start -> NOUVEL_ETAT: RUNNING',
      'pause -> NOUVEL_ETAT: PAUSED',
      'unpause -> NOUVEL_ETAT: RUNNING',
      'restart -> NOUVEL_ETAT: RUNNING',
      'pause -> NOUVEL_ETAT: PAUSED',
      'TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: PAUSED)',
      'unpause -> NOUVEL_ETAT: RUNNING',
      'kill -> NOUVEL_ETAT: STOPPED',
      'rm -> NOUVEL_ETAT: ABSENT',
      "TRANSITION_INVALIDE: Action start impossible depuis l'etat ABSENT"
    ].join('\n')
  },
  'dk2-c4-e2': {
    stdin: [
      'local 127.0.0.1:15000:90',
      'second 192.0.2.5:15000:90',
      'all 15000:80',
      'local2 127.0.0.1:15000:443',
      'ok 15001:80'
    ].join('\n'),
    expected: [
      'PUBLICATION: local -> NAT: 127.0.0.1:15000 => 90/tcp (SUCCES)',
      'PUBLICATION: second -> NAT: 192.0.2.5:15000 => 90/tcp (SUCCES)',
      'CONFLIT_PORT: all -> Port hote 15000 deja reserve par local (ECHEC)',
      'CONFLIT_PORT: local2 -> Port hote 15000 deja reserve par local (ECHEC)',
      'PUBLICATION: ok -> NAT: 0.0.0.0:15001 => 80/tcp (SUCCES)'
    ].join('\n')
  },
  'dk2-c4-e3': {
    stdin: '-v ./src:/app:ro\n-v named:/data:rw\n--mount type=bind,source=/srv/conf,target=/etc/conf,readonly\n--tmpfs /run/cache',
    expected: [
      'STOCKAGE: -v ./src:/app:ro -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_SEULE',
      'STOCKAGE: -v named:/data:rw -> TYPE: VOLUME_NOMME | Espace reserve du daemon (/var/lib/docker/volumes/) | PERSISTANT (survit a docker rm) | LECTURE_ECRITURE',
      'STOCKAGE: --mount type=bind,source=/srv/conf,target=/etc/conf,readonly -> TYPE: BIND_MOUNT | Repertoire specifique de la machine hote | PERSISTANT (survit a docker rm) | LECTURE_SEULE',
      'STOCKAGE: --tmpfs /run/cache -> TYPE: TMPFS | Memoire vive RAM de l\'hote | VOLATILE (detruit a l\'arret du conteneur) | LECTURE_ECRITURE'
    ].join('\n')
  },
  'dk2-c5-e1': {
    stdin: [
      'service: svcA | build: ./backend | ports: 8081:80 | restart: on-failure',
      'service: missing | restart: no',
      'service: cache | image: redis:alpine | restart: mystery'
    ].join('\n'),
    expected: [
      'SERVICE: svcA -> VALIDE [Origine: build:./backend | Ports: 8081:80 | Restart: on-failure]',
      'SERVICE: missing -> INVALIDE (Directive image ou build obligatoire)',
      'SERVICE: cache -> VALIDE [Origine: image:redis:alpine | Ports: aucun | Restart: no]'
    ].join('\n')
  },
  'dk2-c5-e2': {
    stdin: 'ui -> api, assets\napi -> storage\nassets -> NONE\nstorage -> NONE\nzeta -> NONE',
    expected: 'ORDRE_DEMARRAGE: assets -> storage -> api -> ui -> zeta'
  },
  'dk2-c5-e3': {
    stdin: 'P=7000\nBLANK=\nESC=1=2\n---\nx: ${P}-${NO:-fallback}-${BLANK:-default}\ny: ${ESC}/${BLANK}/${MISSING}',
    expected: 'RESOLU: x: 7000-fallback-default\nRESOLU: y: 1=2//'
  },
  'dk2-c6-e1': {
    stdin: 'FROM alpine\nUSER 3001\nRUN echo hi\nUSER 1500',
    expected: 'AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: 1500)'
  },
  'dk2-c6-e2': {
    stdin: 'MEM=3g SWAP=4g CPUS=0.333333\nMEM=16m SWAP=16m CPUS=1.00000',
    expected: [
      'CGROUPS: RAM: 3072 Mo | SWAP_ADDITIONNEL: 1024 Mo | CPU_QUOTA: 33333 us / 100000 us (0.333333 cœurs)',
      'CGROUPS: RAM: 16 Mo | SWAP_ADDITIONNEL: 0 Mo | CPU_QUOTA: 100000 us / 100000 us (1.00000 cœurs)'
    ].join('\n')
  },
  'dk2-c6-e3': {
    stdin: 'POLITIQUE=on-failure EXIT_CODE=2 MANUEL=OUI\nPOLITIQUE=on-failure EXIT_CODE=0 MANUEL=NON\nPOLITIQUE=always EXIT_CODE=0 MANUEL=NON',
    expected: [
      "EVENEMENT: POLITIQUE=on-failure EXIT_CODE=2 MANUEL=OUI -> DECISION: ARRET_DEFINITIF (Arret volontaire par l'administrateur)",
      'EVENEMENT: POLITIQUE=on-failure EXIT_CODE=0 MANUEL=NON -> DECISION: ARRET_DEFINITIF (Code sortie normal 0)',
      'EVENEMENT: POLITIQUE=always EXIT_CODE=0 MANUEL=NON -> DECISION: REDEMARRER (Relance automatique du conteneur)'
    ].join('\n')
  }
};

const mutants = {
  'dk2-c1-e1': [
    ['ignorer la casse', 'code = toupper($0)', 'code = $0'],
    ['confondre les cgroups avec les namespaces', 'type["CPU_LIMIT"] = type["MEM_LIMIT"] = type["IO_THROTTLE"] = "CGROUP"', 'type["CPU_LIMIT"] = type["MEM_LIMIT"] = type["IO_THROTTLE"] = "NAMESPACE"']
  ],
  'dk2-c1-e2': [
    ['ne pas multiplier le disque invité', 'guest_disk = multiply_decimal(instances, $1)', 'guest_disk = normalize_decimal($1)'],
    ['oublier les instances pour la RAM Docker', 'docker_ram = multiply_decimal(instances, app_ram)', 'docker_ram = normalize_decimal(app_ram)']
  ],
  'dk2-c1-e3': [
    ['omettre le shim', 'if ($0 in component)', 'if ($0 in component && $0 != "SHIM")'],
    ['confondre dockerd et containerd', 'component["DOCKERD"] = "dockerd (daemon)"', 'component["DOCKERD"] = "containerd"']
  ],
  'dk2-c2-e1': [
    ["ne pas dédupliquer les couches", "if (!(id in seen))", "if (1)"],
    ["Écraser la taille apparente au lieu d'accumuler les couches", "apparent += size", "apparent = size"]
  ],
  'dk2-c2-e2': [
    ['ignorer les registres avec port', 'segments[1] ~ /[.:]/ || segments[1] == "localhost"', 'segments[1] ~ /[.]/'],
    ['omettre le tag par défaut', 'tag = "latest"', 'tag = "NONE"']
  ],
  'dk2-c2-e3': [
    ['ignorer les fichiers de la couche conteneur', 'if (active[file]) result = "ACCES: Container Layer (Version modifiee)"', 'if (0) result = "ACCES: Container Layer (Version modifiee)"'],
    ['oublier le whiteout', 'deleted[file] = 1', 'deleted[file] = 0']
  ],
  'dk2-c3-e1': [
    ['ignorer ADD local', 'if (local_file) warnings', 'if (0) warnings'],
    ['inverser la condition de chaînage apt', 'body !~ /apt-get[[:space:]]+install/', 'body ~ /apt-get[[:space:]]+install/']
  ],
  'dk2-c3-e2': [
    ['laisser CMD écraser les arguments CLI', 'suffix = values["CLI_ARGS"] != "" ? values["CLI_ARGS"] : values["CMD"]', 'suffix = values["CMD"]'],
    ['traiter NONE comme un argument', 'if (value == "NONE") return ""', 'if (0) return ""']
  ],
  'dk2-c3-e3': [
    ['oublier le binaire importé', 'final_size = fields[2] + fields[5]', 'final_size = fields[2]'],
    ['calculer le pourcentage à partir de la taille finale', '100 * reduction / monolithic', '100 * final_size / monolithic']
  ],
  'dk2-c4-e1': [
    ['unpause retourne STOPPED', 'transition["PAUSED", "unpause"] = "RUNNING"', 'transition["PAUSED", "unpause"] = "STOPPED"'],
    ['kill laisse le conteneur actif', 'transition["RUNNING", "kill"] = "STOPPED"', 'transition["RUNNING", "kill"] = "RUNNING"']
  ],
  'dk2-c4-e2': [
    ["ignorer le conflit avec une adresse générique", "(addresses[index_rule] == address || addresses[index_rule] == \"0.0.0.0\" || address == \"0.0.0.0\")", "(addresses[index_rule] == address)"],
    ["Considérer tout port identique occupé même sur deux adresses spécifiques distinctes", "(addresses[index_rule] == address || addresses[index_rule] == \"0.0.0.0\" || address == \"0.0.0.0\")", "(1)"]
  ],
  'dk2-c4-e3': [
    ['ignorer le mode ro de -v', 'if (options[index_option] == "ro") readonly = 1', 'if (0) readonly = 1'],
    ['confondre tmpfs et volume nommé', 'else if (mount_type == "tmpfs") type = "TMPFS"', 'else if (mount_type == "tmpfs") type = "VOLUME_NOMME"']
  ],
  'dk2-c5-e1': [
    ["Donner priorité à build lorsque image et build sont tous deux présents", "if (values[\"image\"] != \"\")", "if (values[\"image\"] != \"\" && values[\"build\"] == \"\")"],
    ["exclure unless-stopped", "restart != \"unless-stopped\"", "restart != \"unless_stopped\""]
  ],
  'dk2-c5-e2': [
    ['augmenter au lieu de diminuer les dépendances restantes', 'degree[service]--', 'degree[service]++'],
    ['choisir le dernier service disponible', 'service < choice', 'service > choice']
  ],
  'dk2-c5-e3': [
    ['ne pas appliquer le défaut à une variable vide', 'values[name] != "" ? values[name] : fallback', '(name in values) ? values[name] : fallback'],
    ['ignorer les variables simples', 'replacement = values[token]', 'replacement = "?"']
  ],
  'dk2-c6-e1': [
    ['ignorer USER', 'user = fields[2]', 'user = "root"'],
    ['ne reconnaître que root et pas UID 0', 'parts[1] == "root" || (parts[1] ~ /^[0-9]+$/ && parts[1] + 0 == 0)', 'parts[1] == "root"']
  ],
  'dk2-c6-e2': [
    ['convertir un Go en 1000 Mo', 'amount * 1024', 'amount * 1000'],
    ['décaler la partie fractionnaire du quota', 'substr(parts[2] "00000", 1, 5)', 'substr(parts[2] "00000", 1, 4)']
  ],
  'dk2-c6-e3': [
    ["considérer le code 1 comme un succès", "code + 0 == 0", "code + 0 <= 1"],
    ["Oublier la priorité de l'arrêt manuel", "if (values[\"MANUEL\"] == \"OUI\") decision = \"ARRET_DEFINITIF (Arret volontaire par l\\047administrateur)\"\n  else if (policy == \"no\")", "if (policy == \"no\")"]
  ]
};

const newHiddenLabels = {
  'dk2-c1-e1': ['Casse mixte et code inconnu', 'Doublons conservés dans leur ordre'],
  'dk2-c1-e2': ['Aucune instance', 'Une ressource applicative et une ressource invitée nulles', 'Entiers décimaux au-delà de 2^53'],
  'dk2-c1-e3': ['Composants répétés et inconnu', 'Chaîne de composants dans un nouvel ordre'],
  'dk2-c2-e1': ['Couche partagée de taille nulle', 'Couche partagée trois fois'],
  'dk2-c2-e2': ['Registre local, espace de noms et registre distant', 'Tag et digest associés ; port sans tag'],
  'dk2-c2-e3': ['Whiteout puis recréation', 'Création et suppression sans toucher à l’image'],
  'dk2-c3-e1': ['ARG initial et commande apt chaînée sur plusieurs lignes', 'Plusieurs avertissements et archive distante'],
  'dk2-c3-e2': ['Arguments CLI ajoutés à ENTRYPOINT à la place de CMD', 'Trois listes vides'],
  'dk2-c3-e3': ['Aucune économie', 'Image finale vide dans le modèle'],
  'dk2-c4-e1': ['Unpause restaure RUNNING et rm reste interdit', 'Commandes invalides et suppression avant démarrage'],
  'dk2-c4-e2': ['Adresse générique demandée après une adresse précise', 'Bornes de ports et conflit générique'],
  'dk2-c4-e3': ['Chemin relatif et volume nommés en lecture seule', 'Montages explicites volume, tmpfs et bind'],
  'dk2-c5-e1': ['Image et build ensemble, ports et restart', 'Origine vide et build valide avec champs réordonnés'],
  'dk2-c5-e2': ['Priorité alphabétique réévaluée et dépendance répétée', 'Cycle partiel malgré un service indépendant'],
  'dk2-c5-e3': ['Variable vide, valeur zéro et valeur absente', 'Valeur avec signe égal et interpolations répétées'],
  'dk2-c6-e1': ['Absence de USER hors commentaires', 'Dernier utilisateur et groupe explicites'],
  'dk2-c6-e2': ['Différence négative ramenée à zéro dans le modèle', 'Unité minimale et troncature décimale'],
  'dk2-c6-e3': ['Arrêt manuel prioritaire et échec non nul', 'Code zéro et un selon la politique']
};

const independenceWitnesses = {
  "dk2-c1-e1": [
    "Namespace en minuscules sans cgroup",
    "Tous les cgroups essentiels"
  ],
  "dk2-c1-e2": [
    "Disque invité positif et RAM applicative nulle",
    "Disque invité nul et RAM applicative positive"
  ],
  "dk2-c1-e3": [
    "Chaîne de composants dans un nouvel ordre",
    "Composants répétés et inconnu"
  ],
  "dk2-c2-e1": [
    "Deux images avec une seule couche partagée",
    "Image unique sans déduplication"
  ],
  "dk2-c2-e2": [
    "Registre à port et tag explicite",
    "Images officielles simples"
  ],
  "dk2-c2-e3": [
    "Création et suppression sans toucher à l’image",
    "Whiteout puis recréation"
  ],
  "dk2-c3-e1": [
    "ADD local sans commande apt",
    "Anti-pattern apt-get update isolé"
  ],
  "dk2-c3-e2": [
    "Arguments CLI ajoutés à ENTRYPOINT à la place de CMD",
    "Trois listes vides"
  ],
  "dk2-c3-e3": [
    "Image finale égale à la moitié du monolithique",
    "Aucune économie"
  ],
  "dk2-c4-e1": [
    "Unpause restaure RUNNING et rm reste interdit",
    "Commandes invalides et suppression avant démarrage"
  ],
  "dk2-c4-e2": [
    "Conflit 0.0.0.0 avec IP spécifique",
    "Publications sur interfaces IP distinctes"
  ],
  "dk2-c4-e3": [
    "Chemin relatif et volume nommés en lecture seule",
    "Montages explicites volume, tmpfs et bind"
  ],
  "dk2-c5-e1": [
    "Image et build ensemble, ports et restart",
    "Restart unless-stopped conservé"
  ],
  "dk2-c5-e2": [
    "Chaîne unique de dépendances",
    "Trois services indépendants sans dépendance"
  ],
  "dk2-c5-e3": [
    "Défaut pour une variable déclarée vide",
    "Variables simples existantes"
  ],
  "dk2-c6-e1": [
    "Dernier utilisateur et groupe explicites",
    "UID 0 explicite"
  ],
  "dk2-c6-e2": [
    "Conteneur CPU pur sans swap",
    "Différence négative ramenée à zéro dans le modèle"
  ],
  "dk2-c6-e3": [
    "Code zéro et un selon la politique",
    "Politique unless-stopped"
  ]
};

function runSolution(solution, stdin) {
  const result = spawnSync('/bin/bash', ['-c', solution], {
    input: stdin,
    encoding: 'utf8',
    timeout: 3000,
    maxBuffer: 1024 * 1024
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  return normalizeOutput(result.stdout);
}

test('les 18 exercices Docker conservent un cas indépendant distinct', () => {
  assert.equal(exercises.length, 18);
  assert.deepEqual(new Set(exercises.map(exercise => exercise.id)), new Set(Object.keys(independentCases)));
  assert.equal(isGradingSuspended('docker'), true);
  assert.ok(MAX_TESTS >= 2);
});

for (const exercise of exercises) {
  test(`${exercise.id} : cas inédit, exemples et tests cachés`, () => {
    const independent = independentCases[exercise.id];
    assert.ok(independent);
    assert.ok(!exercise.examples.some(example => example.stdin === independent.stdin));
    assert.ok(!exercise.tests.some(hidden => hidden.stdin === independent.stdin));
    assert.equal(runSolution(exercise.solution, independent.stdin), normalizeOutput(independent.expected));
    assert.ok(exercise.tests.length >= 5, 'au moins deux nouveaux cas cachés');
    const scheduled = new Set(exercise.tests.slice(0, MAX_TESTS).map(item => item.label));
    for (const label of newHiddenLabels[exercise.id]) assert.ok(scheduled.has(label), `cas hors plafond du moteur : ${label}`);
    assert.doesNotMatch(exercise.solution, /in_b64|base64\s+-d/);
    for (const item of [...exercise.examples, ...exercise.tests]) {
      assert.equal(runSolution(exercise.solution, item.stdin), normalizeOutput(item.expected), item.label || 'exemple');
    }
  });
}

for (const exercise of exercises) {
  test(`${exercise.id} : deux variantes incorrectes rejetées par les tests cachés`, () => {
    assert.equal(mutants[exercise.id].length, 2);
    for (const [label, original, replacement] of mutants[exercise.id]) {
      assert.equal(exercise.solution.split(original).length, 2, `mutation unique : ${label}`);
      const variant = exercise.solution.replace(original, replacement);
      const rejected = exercise.tests.slice(0, MAX_TESTS).some(item => runSolution(variant, item.stdin) !== normalizeOutput(item.expected));
      assert.ok(rejected, `variante acceptée : ${label}`);
    }
  });
}

test('le moteur réel accepte chaque corrigé et refuse les 36 variantes', async () => {
  const execute = async ({ code, stdin }) => ({
    ok: true,
    stdout: runSolution(code, stdin),
    stderr: '',
    exitCode: 0
  });
  for (const exercise of exercises) {
    const correct = await runTests(exercise, exercise.solution, { execute });
    assert.equal(correct.total, Math.min(MAX_TESTS, exercise.tests.length), exercise.id);
    assert.equal(correct.passed, Math.min(MAX_TESTS, exercise.tests.length), exercise.id);
    assert.equal(correct.stop, null, exercise.id);
    for (const [label, original, replacement] of mutants[exercise.id]) {
      const variant = exercise.solution.replace(original, replacement);
      const report = await runTests(exercise, variant, { execute });
      assert.equal(report.stop?.reason, 'wrong_output', `${exercise.id} : ${label}`);
      assert.ok(report.passed < report.total, `${exercise.id} : ${label}`);
    }
  }
});

test('chaque paire de variantes Docker possède deux témoins croisés actifs', async () => {
  const execute = async ({ code, stdin }) => ({ ok: true, stdout: runSolution(code, stdin), stderr: '', exitCode: 0 });
  for (const exercise of exercises) {
    const labels = independenceWitnesses[exercise.id];
    assert.equal(labels.length, 2, exercise.id);
    const activeCases = exercise.tests.slice(0, MAX_TESTS);
    for (const [witnessIndex, label] of labels.entries()) {
      const sample = activeCases.find(item => item.label === label);
      assert.ok(sample, `${exercise.id} : témoin actif absent : ${label}`);
      for (const [variantIndex, [, original, replacement]] of mutants[exercise.id].entries()) {
        const variant = exercise.solution.replace(original, replacement);
        const single = { ...exercise, tests: [sample], verifyFirstExample: false };
        const report = await runTests(single, variant, { execute });
        assert.equal(report.ok, true, `${exercise.id} : correcteur indisponible`);
        if (variantIndex === witnessIndex) {
          assert.equal(report.stop?.reason, 'wrong_output', `${exercise.id} : ${label} doit rejeter la variante ${variantIndex + 1}`);
        } else {
          assert.equal(report.stop, null, `${exercise.id} : ${label} doit accepter la variante ${variantIndex + 1}`);
          assert.equal(report.passed, 1, exercise.id);
        }
      }
    }
  }
});

function solutionFor(id) {
  return exercises.find(exercise => exercise.id === id).solution;
}

function seededRandom(seed) {
  let state = seed >>> 0;
  return maximum => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return Math.floor((state / 0x100000000) * maximum);
  };
}

test('dk2-c1-e2 : grands entiers décimaux exacts', () => {
  const exercise = exercises.find(item => item.id === 'dk2-c1-e2');
  assert.ok(exercise.tests.length <= MAX_TESTS);
  assert.ok(exercise.tests.slice(0, MAX_TESTS).some(item => item.label === 'Entiers décimaux au-delà de 2^53'));

  const cases = [
    ['1', '9007199254740999', '29', '17', '0'],
    ['2', '9007199254740993', '9007199254740991', '17', '9007199254740995'],
    ['9007199254740993', '9007199254740997', '18446744073709551617', '99999999999999999999', '12345678901234567890'],
    ['00000002', '0009007199254740993', '000000000', '00000017', '00000003'],
    ['00000000', '99999999999999999999', '99999999999999999999', '1', '1'],
    ['+0001', '+00009', '+0', '+0001', '+0'],
    ['1', '99999999999999999999999999999999', '99999999999999999999999999999999', '1', '1'],
    ['9'.repeat(4000), '9'.repeat(1000), '8'.repeat(1000), '7'.repeat(1000), '6'.repeat(1000)]
  ];
  const random = seededRandom(20261030);
  for (let iteration = 0; iteration < 30; iteration++) {
    cases.push(Array.from({ length: 5 }, () => {
      const length = 1 + random(60);
      return Array.from({ length }, () => String(random(10))).join('');
    }));
  }

  for (const values of cases) {
    const [instances, appDisk, appRam, guestDisk, guestRam] = values.map(value => BigInt(value));
    const stdin = `${values[0]} ${values[1]} ${values[2]}\n${values[3]} ${values[4]}`;
    assert.ok(Buffer.byteLength(stdin) <= LIMITS.stdin);
    const expected = [
      `ARCHITECTURE VM: Disque ${instances * (appDisk + guestDisk)} Mo | RAM ${instances * (appRam + guestRam)} Mo`,
      `ARCHITECTURE DOCKER: Disque ${instances * appDisk} Mo | RAM ${instances * appRam} Mo`,
      `ECONOMIE DOCKER: Disque -${instances * guestDisk} Mo | RAM -${instances * guestRam} Mo`
    ].join('\n');
    assert.equal(runSolution(exercise.solution, stdin), expected, `entrée de ${Buffer.byteLength(stdin)} octets`);
  }
});

test('cycle de vie : toutes les actions depuis chacun des cinq états', () => {
  const transitions = {
    ABSENT: { create: 'CREATED', run: 'RUNNING' },
    CREATED: { start: 'RUNNING', rm: 'ABSENT' },
    RUNNING: { pause: 'PAUSED', stop: 'STOPPED', restart: 'RUNNING', kill: 'STOPPED' },
    PAUSED: { unpause: 'RUNNING' },
    STOPPED: { start: 'RUNNING', rm: 'ABSENT' }
  };
  const prefixes = {
    ABSENT: [],
    CREATED: ['create'],
    RUNNING: ['run'],
    PAUSED: ['run', 'pause'],
    STOPPED: ['run', 'stop']
  };
  const actions = ['create', 'run', 'start', 'rm', 'pause', 'unpause', 'stop', 'restart', 'kill', 'inconnue'];
  for (const prefix of Object.values(prefixes)) {
    for (const action of actions) {
      let state = 'ABSENT';
      const expected = [];
      const input = [...prefix, action, 'verifier_etat'];
      for (const command of input) {
        if (command === 'rm' && ['RUNNING', 'PAUSED'].includes(state)) {
          expected.push(`TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: ${state})`);
        } else if (transitions[state][command]) {
          state = transitions[state][command];
          expected.push(`${command} -> NOUVEL_ETAT: ${state}`);
        } else {
          expected.push(`TRANSITION_INVALIDE: Action ${command} impossible depuis l'etat ${state}`);
        }
      }
      assert.equal(runSolution(solutionFor('dk2-c4-e1'), input.join('\n')), expected.join('\n'), input.join(', '));
    }
  }
});

test('arithmétique VM et déduplication : jeux déterministes indépendants', () => {
  const random = seededRandom(20261029);
  for (let iteration = 0; iteration < 30; iteration++) {
    const instances = random(15);
    const appDisk = random(300);
    const appRam = random(300);
    const guestDisk = random(4000);
    const guestRam = random(1500);
    const stdin = `${instances} ${appDisk} ${appRam}\n${guestDisk} ${guestRam}`;
    const expected = [
      `ARCHITECTURE VM: Disque ${instances * (appDisk + guestDisk)} Mo | RAM ${instances * (appRam + guestRam)} Mo`,
      `ARCHITECTURE DOCKER: Disque ${instances * appDisk} Mo | RAM ${instances * appRam} Mo`,
      `ECONOMIE DOCKER: Disque -${instances * guestDisk} Mo | RAM -${instances * guestRam} Mo`
    ].join('\n');
    assert.equal(runSolution(solutionFor('dk2-c1-e2'), stdin), expected, stdin);
  }
  for (let iteration = 0; iteration < 20; iteration++) {
    const sizes = Array.from({ length: 5 }, () => random(21));
    const images = [];
    const expected = [];
    const used = new Set();
    let gross = 0;
    for (let imageIndex = 0; imageIndex < 4; imageIndex++) {
      const selected = sizes.map((_, index) => index).filter(() => random(2) === 0);
      if (!selected.length) selected.push(random(sizes.length));
      const apparent = selected.reduce((sum, index) => sum + sizes[index], 0);
      gross += apparent;
      selected.forEach(index => used.add(index));
      images.push(`image${imageIndex} : ${selected.map(index => `layer${index}:${sizes[index]}`).join(', ')}`);
      expected.push(`IMAGE: image${imageIndex} -> TAILLE_APPARENTE: ${apparent} Mo`);
    }
    const real = [...used].reduce((sum, index) => sum + sizes[index], 0);
    expected.push(`TOTAL_BRUT: ${gross} Mo | TOTAL_REEL: ${real} Mo | ECONOMIE_DEDUPLICATION: -${gross - real} Mo`);
    assert.equal(runSolution(solutionFor('dk2-c2-e1'), images.join('\n')), expected.join('\n'), images.join('\n'));
  }
});

test('copy-on-write : séquences déterministes avec suppressions et recréations', () => {
  const random = seededRandom(810245);
  const paths = ['/lowerA', '/lowerB', '/freshA', '/freshB'];
  for (let iteration = 0; iteration < 12; iteration++) {
    const files = new Map(paths.map((path, index) => [path, { base: index < 2, visible: index < 2, upper: false }]));
    const input = ['/lowerA, /lowerB'];
    const expected = [];
    for (let step = 0; step < 24; step++) {
      const path = paths[random(paths.length)];
      const file = files.get(path);
      let action = ['READ', 'WRITE', 'CREATE', 'DELETE'][random(4)];
      if ((action === 'CREATE' && file.visible) || (action === 'DELETE' && !file.visible)) action = 'READ';
      let result;
      if (action === 'READ') {
        result = !file.visible ? 'ERREUR: Fichier introuvable (404 ENOENT)' : file.upper
          ? 'ACCES: Container Layer (Version modifiee)' : 'ACCES: Image Layer (Lecture directe RO sans duplication)';
      } else if (action === 'WRITE') {
        result = !file.visible ? 'ERREUR: Fichier introuvable pour modification' : file.upper
          ? 'MECANISME: Ecriture directe dans Container Layer'
          : 'MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)';
        if (file.visible) file.upper = true;
      } else if (action === 'CREATE') {
        result = 'MECANISME: Creation directe dans Container Layer';
        file.visible = true;
        file.upper = true;
      } else {
        result = file.base
          ? "MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)"
          : 'MECANISME: Suppression directe de Container Layer';
        file.visible = false;
        file.upper = false;
      }
      input.push(`${action} ${path}`);
      expected.push(`${action} ${path} -> ${result}`);
    }
    assert.equal(runSolution(solutionFor('dk2-c2-e3'), input.join('\n')), expected.join('\n'), input.join('\n'));
  }
});

test('ports : allocations successives et conflits dans les deux sens', () => {
  const random = seededRandom(66771);
  const addresses = ['0.0.0.0', '127.0.0.1', '192.0.2.10', '192.0.2.11'];
  const ports = [1, 53, 8080, 65535];
  for (let iteration = 0; iteration < 8; iteration++) {
    const allocations = [];
    const input = [];
    const expected = [];
    for (let index = 0; index < 35; index++) {
      const address = addresses[random(addresses.length)];
      const port = ports[random(ports.length)];
      const destination = ports[random(ports.length)];
      const name = `service${index}`;
      const conflict = allocations.find(item => item.port === port &&
        (item.address === address || item.address === '0.0.0.0' || address === '0.0.0.0'));
      input.push(address === '0.0.0.0' ? `${name} ${port}:${destination}` : `${name} ${address}:${port}:${destination}`);
      if (conflict) expected.push(`CONFLIT_PORT: ${name} -> Port hote ${port} deja reserve par ${conflict.name} (ECHEC)`);
      else {
        allocations.push({ address, port, name });
        expected.push(`PUBLICATION: ${name} -> NAT: ${address}:${port} => ${destination}/tcp (SUCCES)`);
      }
    }
    assert.equal(runSolution(solutionFor('dk2-c4-e2'), input.join('\n')), expected.join('\n'), input.join('\n'));
  }
});

test('dépendances : graphes acycliques et cycles déterministes', () => {
  const random = seededRandom(420061);
  for (let iteration = 0; iteration < 30; iteration++) {
    const names = Array.from({ length: 6 }, (_, index) => `svc${index}`);
    const dependencies = new Map();
    for (let index = 0; index < names.length; index++) {
      dependencies.set(names[index], names.slice(0, index).filter(() => random(3) === 0));
    }
    const cyclic = iteration % 5 === 0;
    if (cyclic) dependencies.get(names[0]).push(names[0]);
    const input = names.slice().reverse().map(name => `${name} -> ${dependencies.get(name).join(', ') || 'NONE'}`);
    const remaining = new Set(names);
    const order = [];
    while (remaining.size) {
      const available = [...remaining].filter(name => dependencies.get(name).every(dependency => !remaining.has(dependency))).sort();
      if (!available.length) break;
      order.push(available[0]);
      remaining.delete(available[0]);
    }
    const expected = remaining.size ? 'ERREUR_COMPOSE: Dependance cyclique detectee' : `ORDRE_DEMARRAGE: ${order.join(' -> ')}`;
    assert.equal(runSolution(solutionFor('dk2-c5-e2'), input.join('\n')), expected, input.join('\n'));
  }
});

test('interpolation : valeurs littérales, absentes et non réinterprétées', () => {
  const input = [
    'A=', 'B=a/b&c', 'C=0', 'D=x=y', 'E=${AUTRE}', '---',
    '${A:-secours}', '${A}|${C:-autre}', '${B}-${D}', '${E}', '${ABSENT}', '${ABSENT:-}', '${ABSENT:-a:b}'
  ].join('\n');
  const expected = [
    'RESOLU: secours', 'RESOLU: |0', 'RESOLU: a/b&c-x=y', 'RESOLU: ${AUTRE}', 'RESOLU:', 'RESOLU:', 'RESOLU: a:b'
  ].join('\n');
  assert.equal(runSolution(solutionFor('dk2-c5-e3'), input), expected);
});

test('quotas : troncature décimale et seuils de mémoire', () => {
  const random = seededRandom(900101);
  const fractions = ['0', '1', '01', '100009', '333333', '000009', '999999'];
  const input = [];
  const expected = [];
  for (let index = 0; index < 60; index++) {
    const ram = random(1000);
    const total = random(1000);
    const whole = random(5);
    const fraction = fractions[random(fractions.length)];
    const cpu = `${whole}.${fraction}`;
    const quota = BigInt(whole) * 100000n + BigInt((fraction + '00000').slice(0, 5));
    input.push(`MEM=${ram}m SWAP=${total}m CPUS=${cpu}`);
    expected.push(`CGROUPS: RAM: ${ram} Mo | SWAP_ADDITIONNEL: ${Math.max(0, total - ram)} Mo | CPU_QUOTA: ${quota} us / 100000 us (${cpu} cœurs)`);
  }
  assert.equal(runSolution(solutionFor('dk2-c6-e2'), input.join('\n')), expected.join('\n'));
});

test('redémarrage : produit complet des politiques, codes et arrêts manuels', () => {
  const input = [];
  const expected = [];
  for (const policy of ['no', 'always', 'unless-stopped', 'on-failure']) {
    for (const manual of ['OUI', 'NON']) {
      for (const code of [0, 1, 125]) {
        const event = `POLITIQUE=${policy} EXIT_CODE=${code} MANUEL=${manual}`;
        let decision;
        if (manual === 'OUI') decision = "ARRET_DEFINITIF (Arret volontaire par l'administrateur)";
        else if (policy === 'no') decision = 'ARRET_DEFINITIF (Politique "no")';
        else if (policy !== 'on-failure') decision = 'REDEMARRER (Relance automatique du conteneur)';
        else if (code === 0) decision = 'ARRET_DEFINITIF (Code sortie normal 0)';
        else decision = `REDEMARRER (Echec detecte: code ${code})`;
        input.push(event);
        expected.push(`EVENEMENT: ${event} -> DECISION: ${decision}`);
      }
    }
  }
  assert.equal(runSolution(solutionFor('dk2-c6-e3'), input.join('\n')), expected.join('\n'));
});

}
