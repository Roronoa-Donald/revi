'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const childProcess = require('child_process');
const catalogue = require('/project/server/exercises');
const { runTests } = require('/project/server/exercises/runner');

const dollar = '$';
const env = {
  PATH: '/usr/bin:/bin', HOME: '/tmp', LANG: 'C.UTF-8',
  DOTNET_CLI_HOME: '/tmp', DOTNET_SKIP_FIRST_TIME_EXPERIENCE: '1',
  DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_NOLOGO: '1'
};

function command(file, args, input, timeout = 10000) {
  const result = childProcess.spawnSync(file, args, {
    input, encoding: 'utf8', timeout, maxBuffer: 1024 * 1024, cwd: '/tmp', env
  });
  return {
    ok: result.status === 0 && !result.error,
    stdout: result.stdout || '',
    stderr: result.stderr || (result.error ? result.error.message : ''),
    exitCode: result.status,
    status: result.status === 0 && !result.error ? 'success' : 'runtime_error'
  };
}

function prepare(language, code) {
  if (language === 'shell') return { file: '/bin/bash', args: ['-c', code] };
  if (language !== 'csharp') return { error: 'langage non pris en charge' };
  const dir = '/tmp/csharp-' + crypto.createHash('sha256').update(code).digest('hex').slice(0, 20);
  fs.mkdirSync(dir, { recursive: true });
  const source = path.join(dir, 'Programme.cs');
  const output = path.join(dir, 'Audit.dll');
  const refs = '/usr/share/dotnet/packs/Microsoft.NETCore.App.Ref/10.0.12/ref/net10.0';
  fs.writeFileSync(source, code);
  fs.writeFileSync(path.join(dir, 'refs.rsp'), fs.readdirSync(refs)
    .filter(file => file.endsWith('.dll')).map(file => '-r:' + path.join(refs, file)).join('\n'));
  fs.writeFileSync(path.join(dir, 'Audit.runtimeconfig.json'), JSON.stringify({
    runtimeOptions: { tfm: 'net10.0', framework: { name: 'Microsoft.NETCore.App', version: '10.0.12' } }
  }));
  const result = command('/usr/share/dotnet/dotnet', [
    '/usr/share/dotnet/sdk/10.0.401/Roslyn/bincore/csc.dll', '-nologo', '-nostdlib+',
    '-target:exe', '-out:' + output, '@' + path.join(dir, 'refs.rsp'), source
  ], '', 30000);
  return result.ok ? { file: '/usr/share/dotnet/dotnet', args: [output] } : { error: 'compilation C# impossible' };
}

async function evaluate(exercise, program) {
  const prepared = prepare(exercise.language, program);
  if (prepared.error) return { executed: false, accepted: false, reason: prepared.error };
  const result = await runTests(exercise, program, {
    execute: async payload => command(prepared.file, prepared.args, payload.stdin || '')
  });
  return {
    executed: !result.error && (!result.stop || result.stop.reason === 'wrong_output'),
    accepted: result.ok && result.passed === result.total && !result.stop,
    passed: result.passed, total: result.total,
    reason: result.error ? result.error.code : (result.stop ? result.stop.reason : null)
  };
}

function witness(language, program, input, expected) {
  const prepared = prepare(language, program);
  if (prepared.error) return { executed: false, matches: false };
  const result = command(prepared.file, prepared.args, input);
  const normalized = text => text.replace(/\r\n/g, '\n').trim();
  return { executed: result.ok, matches: result.ok && normalized(result.stdout) === normalized(expected) };
}

function linq(comparison, ordering) {
  return `using System;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;
using System.Text.RegularExpressions;
class Program {
  static void Main() {
    var filter = Console.ReadLine() ?? "";
    var threshold = double.Parse(Regex.Match(filter, @"[-+]?[0-9]+(?:\\.[0-9]+)?").Value, CultureInfo.InvariantCulture);
    var articles = new List<(string Nom, double Prix)>();
    string line;
    while ((line = Console.ReadLine()) != null) {
      if (string.IsNullOrWhiteSpace(line)) continue;
      var fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
      var name = fields.First(field => field.StartsWith("Nom=")).Substring(4);
      var price = double.Parse(fields.First(field => field.StartsWith("Prix=")).Substring(5), CultureInfo.InvariantCulture);
      articles.Add((name, price));
    }
    var chosen = articles.Where(article => article.Prix ${comparison} threshold).${ordering}(article => article.Prix).ToList();
    Console.WriteLine("LINQ: Declenchement ToList() (Evaluation differee terminee)");
    foreach (var article in chosen) Console.WriteLine("Resultat: " + article.Nom + " - " + article.Prix.ToString("F2", CultureInfo.InvariantCulture));
    Console.WriteLine("TOTAL_ELEMENTS: " + chosen.Count);
  }
}`;
}

function maps(operator, denominator) {
  return String.raw`while IFS= read -r line || [ -n "$line" ]; do
  [ -z "$line" ] && continue
  read -r tag pidpart startpart endpart permspart pathpart <<< "$line"
  pid=$(printf '%s' "$pidpart" | cut -d= -f2-)
  start=$(printf '%s' "$startpart" | cut -d= -f2-)
  end=$(printf '%s' "$endpart" | cut -d= -f2-)
  perms=$(printf '%s' "$permspart" | cut -d= -f2-)
  pathname=$(printf '%s' "$pathpart" | cut -d= -f2-)
  size=$(( (16#$end - 16#$start) / ${denominator} ))
  violation=NON
  if [[ "$perms" == *w* ${operator} "$perms" == *x* ]]; then violation=OUI; fi
  printf 'MAP_AUDIT pid=%s path=%s size_kb=%s wx_violation=%s\n' "$pid" "$pathname" "$size" "$violation"
done`;
}

function lifecycle(activeRemoval, unpause) {
  return String.raw`state=ABSENT
while IFS= read -r action || [ -n "$action" ]; do
  [ -z "$action" ] && continue
  next=''
  case "$state:$action" in
    ABSENT:create) next=CREATED ;;
    ABSENT:run) next=RUNNING ;;
    CREATED:start|STOPPED:start) next=RUNNING ;;
    CREATED:rm|STOPPED:rm) next=ABSENT ;;
    RUNNING:pause) next=PAUSED ;;
    RUNNING:stop|RUNNING:kill) next=STOPPED ;;
    RUNNING:restart) next=RUNNING ;;
    PAUSED:unpause) next=${unpause} ;;
    RUNNING:rm) ${activeRemoval} ;;
    PAUSED:rm) printf 'TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: %s)\n' "$state"; continue ;;
  esac
  if [ -z "$next" ]; then
    printf "TRANSITION_INVALIDE: Action %s impossible depuis l'etat %s\n" "$action" "$state"
  else
    state=$next
    printf '%s -> NOUVEL_ETAT: %s\n' "$action" "$state"
  fi
done`;
}

function namespaces(pidRole, cpuRole) {
  return String.raw`while IFS= read -r input || [ -n "$input" ]; do
  [ -z "$input" ] && continue
  case "$input" in
    PID) primitive=${pidRole}; description='Arborescence des processus isolée (le conteneur voit son propre PID 1)' ;;
    NET) primitive=NAMESPACE; description='Interfaces reseau, tables de routage et ports isoles' ;;
    MNT) primitive=NAMESPACE; description='Points de montage de systeme de fichiers et arborescence racine' ;;
    IPC) primitive=NAMESPACE; description='Communications inter-processus (memoire partagee, files de messages)' ;;
    UTS) primitive=NAMESPACE; description="Nom d'hote (hostname) et nom de domaine NIS" ;;
    USER) primitive=NAMESPACE; description="Mappage des identifiants UID et GID (root dans le conteneur vs utilisateur standard sur l'hote)" ;;
    CPU_LIMIT) primitive=${cpuRole}; description='Plafond de temps de calcul CPU (quotas CFS)' ;;
    MEM_LIMIT) primitive=CGROUP; description="Plafond de memoire vive RAM et gestion de l'OOM-Killer" ;;
    IO_THROTTLE) primitive=CGROUP; description='Debit maximal en lecture et ecriture sur les disques blocs' ;;
    *) printf '%s -> INCONNU\n' "$input"; continue ;;
  esac
  printf '%s -> PRIMITIVE: %s | %s\n' "$input" "$primitive" "$description"
done`;
}

function dockerArchitecture(clientRole, runtimeRole) {
  return String.raw`while IFS= read -r input || [ -n "$input" ]; do
  [ -z "$input" ] && continue
  case "$input" in
    CLI) component='docker (client)'; role="${clientRole}" ;;
    DOCKERD) component='dockerd (daemon)'; role='Gestionnaire haut niveau des images, volumes, reseaux et authentification' ;;
    CONTAINERD) component='containerd'; role="Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)" ;;
    SHIM) component='containerd-shim'; role="Processus leger maintenant les E/S et l'etat sans dependre du daemon" ;;
    RUNC) component='runc (OCI runtime)'; role="${runtimeRole}" ;;
    *) printf '%s -> INCONNU\n' "$input"; continue ;;
  esac
  printf '%s -> %s | %s\n' "$input" "$component" "$role"
done`;
}

function conventional(checkMark, addType) {
  return String.raw`pattern='^([a-z]+)(\(([^()]*)\))?(!)?: (.*)$'
while IFS= read -r line || [ -n "$line" ]; do
  [ -z "$line" ] && continue
  id=$(printf '%s' "$line" | sed -E 's/^COMMIT_MSG id=([^ ]+).*$/\1/')
  msg=$(printf '%s' "$line" | sed -E 's/^COMMIT_MSG id=[^ ]+ msg=//')
  if [[ ! "$msg" =~ $pattern ]]; then
    printf 'CONVENTIONAL_AUDIT id=%s valid=NON error=FORMAT_INVALIDE\n' "$id"
    continue
  fi
  type="${dollar}{BASH_REMATCH[1]}"
  scope="${dollar}{BASH_REMATCH[3]}"
  mark="${dollar}{BASH_REMATCH[4]}"
  description="${dollar}{BASH_REMATCH[5]}"
  case "$type" in feat|fix|docs|refactor|test|chore|perf|ci${addType}) ;; *) printf 'CONVENTIONAL_AUDIT id=%s valid=NON error=TYPE_INCONNU\n' "$id"; continue ;; esac
  if [ -z "$description" ]; then printf 'CONVENTIONAL_AUDIT id=%s valid=NON error=DESCRIPTION_VIDE\n' "$id"; continue; fi
  [ -z "$scope" ] && scope=NONE
  breaking=NON
  if [[ ${checkMark} "$msg" == *'BREAKING CHANGE'* ]]; then breaking=OUI; fi
  printf 'CONVENTIONAL_AUDIT id=%s valid=OUI type=%s scope=%s breaking=%s\n' "$id" "$type" "$scope" "$breaking"
done`;
}

function lfs(operator, comparison) {
  return String.raw`while IFS= read -r line || [ -n "$line" ]; do
  [ -z "$line" ] && continue
  read -r tag pathpart sizepart hashpart <<< "$line"
  filepath=$(printf '%s' "$pathpart" | cut -d= -f2-)
  size=$(printf '%s' "$sizepart" | cut -d= -f2-)
  hash=$(printf '%s' "$hashpart" | cut -d= -f2-)
  watched=0
  case "$filepath" in *.iso|*.psd|*.zip|*.tar.gz|*.mp4) watched=1 ;; esac
  if [[ "$watched" -eq 1 ${operator} "$size" ${comparison} 104857600 ]]; then
    printf 'LFS_DECISION file="%s" mode=LFS_POINTER oid="%s" size=%s\n' "$filepath" "$hash" "$size"
  else
    printf 'LFS_DECISION file="%s" mode=GIT_BLOB\n' "$filepath"
  fi
done`;
}

const inactiveRemoval = 'printf "TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: %s)\\n" "$state"; continue';
const clientRole = "Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)";
const runtimeRole = 'Cree les namespaces et cgroups, puis execute le binaire conteneurise';
const digest = 'abcdef0123456789'.repeat(4);
const fixtures = [
  {
    family: 'programmation', id: 'csb2-c5-e1',
    baseline: linq('>=', 'OrderByDescending'),
    variants: [
      { description: 'Exclure les articles dont le prix est exactement égal au seuil', code: linq('>', 'OrderByDescending'), input: 'FILTER Prix >= 20.0\nArticle Nom=Clavier Prix=20.0\n', expected: 'LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Clavier - 20.00\nTOTAL_ELEMENTS: 1' },
      { description: 'Trier les prix dans le sens croissant au lieu de décroissant', code: linq('>=', 'OrderBy'), input: 'FILTER Prix >= 20.0\nArticle Nom=Clavier Prix=25.0\nArticle Nom=Ecran Prix=40.0\n', expected: 'LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Ecran - 40.00\nResultat: Clavier - 25.00\nTOTAL_ELEMENTS: 2' }
    ]
  },
  {
    family: 'systemes', id: 'lx3-c1-e2', baseline: maps('&&', 1024),
    variants: [
      { description: 'Déclarer une violation si une seule permission w ou x est présente', code: maps('||', 1024), input: 'VMMAP pid=17 start=00400000 end=00401000 perms=r-xp pathname=/app\n', expected: 'MAP_AUDIT pid=17 path=/app size_kb=4 wx_violation=NON' },
      { description: 'Convertir les octets en Ko décimaux plutôt qu’en unités de 1 024', code: maps('&&', 1000), input: 'VMMAP pid=17 start=00400000 end=00450000 perms=rw-p pathname=[heap]\n', expected: 'MAP_AUDIT pid=17 path=[heap] size_kb=320 wx_violation=NON' }
    ]
  },
  {
    family: 'cloud-devops', id: 'dk2-c4-e1', baseline: lifecycle(inactiveRemoval, 'RUNNING'),
    variants: [
      { description: 'Supprimer sans force un conteneur encore en cours d’exécution', code: lifecycle('next=ABSENT', 'RUNNING'), input: 'run\nrm\n', expected: 'run -> NOUVEL_ETAT: RUNNING\nTRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: RUNNING)' },
      { description: 'Remettre un conteneur arrêté au lieu de le relancer après une pause', code: lifecycle(inactiveRemoval, 'STOPPED'), input: 'run\npause\nunpause\n', expected: 'run -> NOUVEL_ETAT: RUNNING\npause -> NOUVEL_ETAT: PAUSED\nunpause -> NOUVEL_ETAT: RUNNING' }
    ]
  },
  {
    family: 'cloud-devops', id: 'dk2-c1-e1', baseline: namespaces('NAMESPACE', 'CGROUP'),
    variants: [
      { description: 'Ranger l’isolation des processus PID parmi les cgroups', code: namespaces('CGROUP', 'CGROUP'), input: 'PID\n', expected: 'PID -> PRIMITIVE: NAMESPACE | Arborescence des processus isolée (le conteneur voit son propre PID 1)' },
      { description: 'Confondre le quota CPU avec un namespace', code: namespaces('NAMESPACE', 'NAMESPACE'), input: 'CPU_LIMIT\n', expected: 'CPU_LIMIT -> PRIMITIVE: CGROUP | Plafond de temps de calcul CPU (quotas CFS)' }
    ]
  },
  {
    family: 'cloud-devops', id: 'dk2-c1-e3', baseline: dockerArchitecture(clientRole, runtimeRole),
    variants: [
      { description: 'Attribuer au client Docker le rôle de gestion des images du daemon', code: dockerArchitecture('Gestionnaire haut niveau des images, volumes, reseaux et authentification', runtimeRole), input: 'CLI\n', expected: "CLI -> docker (client) | " + clientRole },
      { description: 'Attribuer à runc le rôle de maintien des E/S du shim', code: dockerArchitecture(clientRole, "Processus leger maintenant les E/S et l'etat sans dependre du daemon"), input: 'RUNC\n', expected: 'RUNC -> runc (OCI runtime) | ' + runtimeRole }
    ]
  },
  {
    family: 'genie-logiciel', id: 'gh3-c4-e3', baseline: conventional('-n "$mark" ||', ''),
    variants: [
      { description: 'Ignorer le marqueur de rupture ! avant les deux-points', code: conventional('', ''), input: 'COMMIT_MSG id=72 msg=fix!: correction majeure\n', expected: 'CONVENTIONAL_AUDIT id=72 valid=OUI type=fix scope=NONE breaking=OUI' },
      { description: 'Autoriser le type style alors que l’exercice ne le prévoit pas', code: conventional('-n "$mark" ||', '|style'), input: 'COMMIT_MSG id=73 msg=style: nettoyage\n', expected: 'CONVENTIONAL_AUDIT id=73 valid=NON error=TYPE_INCONNU' }
    ]
  },
  {
    family: 'genie-logiciel', id: 'gh3-c6-e1', baseline: lfs('||', '-ge'),
    variants: [
      { description: 'Exiger à tort que l’extension et la taille vérifient simultanément les deux critères LFS', code: lfs('&&', '-ge'), input: 'FILE path=videos/demo.mp4 size_bytes=10 sha256=' + digest + '\n', expected: 'LFS_DECISION file="videos/demo.mp4" mode=LFS_POINTER oid="' + digest + '" size=10' },
      { description: 'Omettre la taille exactement égale au seuil de 100 Mio', code: lfs('||', '-gt'), input: 'FILE path=donnees.txt size_bytes=104857600 sha256=' + digest + '\n', expected: 'LFS_DECISION file="donnees.txt" mode=LFS_POINTER oid="' + digest + '" size=104857600' }
    ]
  }
];

async function main() {
  const findings = [];
  for (const fixture of fixtures) {
    const exercise = catalogue.getExercise(fixture.id);
    const baseline = await evaluate(exercise, fixture.baseline);
    const variants = [];
    for (const variant of fixture.variants) {
      const checkBaseline = witness(exercise.language, fixture.baseline, variant.input, variant.expected);
      const checkVariant = witness(exercise.language, variant.code, variant.input, variant.expected);
      variants.push({
        description: variant.description,
        ...(await evaluate(exercise, variant.code)),
        contreExempleSynthétique: {
          referenceConforme: checkBaseline.executed && checkBaseline.matches,
          varianteFauteConstatee: checkVariant.executed && !checkVariant.matches,
          executionReussie: checkBaseline.executed && checkVariant.executed
        }
      });
    }
    findings.push({ family: fixture.family, id: fixture.id, language: exercise.language, baselineIndependante: baseline, variants });
  }
  process.stdout.write(JSON.stringify({ selection: 'sept exercices restants ; programmes indépendants et contre-exemples synthétiques', findings }, null, 2) + '\n');
}

if (require.main === module) {
  main().catch(error => { process.stderr.write(error.message + '\n'); process.exitCode = 1; });
}

module.exports = { fixtures, evaluate, witness };
