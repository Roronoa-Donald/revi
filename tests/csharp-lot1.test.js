'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

if (process.env.CSHARP_LOT1_ISOLATED !== '1') {
  const root = path.resolve(__dirname, '..');
  const dotnet = '/usr/share/dotnet/dotnet';
  const available = process.platform === 'linux' && fs.existsSync('/usr/bin/bwrap') &&
    fs.existsSync(dotnet) && fs.existsSync('/usr/share/dotnet/sdk') &&
    fs.existsSync('/usr/share/dotnet/packs/Microsoft.NETCore.App.Ref') &&
    fs.existsSync(path.join(root, 'node_modules/parse5')) &&
    fs.existsSync(path.join(root, 'node_modules/entities'));

  test('banc C# lot 1 exécuté sans réseau ni accès au HOME', {
    skip: available ? false : 'bubblewrap, SDK .NET et parse5 sont requis'
  }, context => {
    const arguments_ = [
      '--die-with-parent', '--unshare-net', '--unshare-pid', '--clearenv',
      '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin',
      '--symlink', 'usr/lib', '/lib', '--symlink', 'usr/lib', '/lib64',
      '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
      '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp',
      '--dir', '/project', '--dir', '/project/tests', '--dir', '/project/server',
      '--dir', '/project/server/exercises', '--dir', '/project/server/services',
      '--dir', '/dependencies',
      '--ro-bind', path.join(root, 'server/exercises/csharp.js'), '/project/server/exercises/csharp.js',
      '--ro-bind', path.join(root, 'server/exercises/grading-evidence.json'), '/project/server/exercises/grading-evidence.json',
      '--ro-bind', path.join(root, 'server/exercises/grading-runtime-evidence.json'), '/project/server/exercises/grading-runtime-evidence.json',
      '--ro-bind', path.join(root, 'server/exercises/grading-policy.js'), '/project/server/exercises/grading-policy.js',
      '--ro-bind', path.join(root, 'server/exercises/runner.js'), '/project/server/exercises/runner.js',
      '--ro-bind', path.join(root, 'server/services/execution'), '/project/server/services/execution',
      '--ro-bind', __filename, '/project/tests/csharp-lot1.test.js',
      '--ro-bind', fs.realpathSync(path.join(root, 'node_modules/parse5')), '/dependencies/parse5',
      '--ro-bind', fs.realpathSync(path.join(root, 'node_modules/entities')), '/dependencies/entities',
      '--ro-bind', fs.realpathSync(process.execPath), '/usr/bin/node',
      '--chdir', '/project', '--setenv', 'PATH', '/usr/bin:/bin',
      '--setenv', 'HOME', '/tmp', '--setenv', 'LANG', 'C.UTF-8',
      '--setenv', 'NODE_PATH', '/dependencies', '--setenv', 'CSHARP_LOT1_ISOLATED', '1',
      '--setenv', 'CSHARP_HOST_NET_NS', fs.readlinkSync('/proc/self/ns/net'),
      '--setenv', 'DOTNET_CLI_HOME', '/tmp', '--setenv', 'DOTNET_SKIP_FIRST_TIME_EXPERIENCE', '1',
      '--setenv', 'DOTNET_CLI_TELEMETRY_OPTOUT', '1', '--setenv', 'DOTNET_NOLOGO', '1',
      '/usr/bin/node', '--test', '/project/tests/csharp-lot1.test.js'
    ];
    const result = spawnSync('/usr/bin/bwrap', arguments_, { encoding: 'utf8', timeout: 180000, maxBuffer: 4 * 1024 * 1024 });
    assert.equal(result.status, 0, `${result.error || ''}\n${result.stdout}\n${result.stderr}`);
    context.diagnostic(result.stdout.trim());
  });
} else {
  assert.ok(process.env.CSHARP_HOST_NET_NS, 'Espace réseau de référence absent');
  assert.notEqual(fs.readlinkSync('/proc/self/ns/net'), process.env.CSHARP_HOST_NET_NS, 'Réseau non isolé');
  assert.equal(fs.readFileSync('/proc/1/comm', 'utf8').trim(), 'bwrap');
  assert.equal(process.env.HOME, '/tmp');
  assert.equal(fs.existsSync('/home'), false);
  const parse5 = require('parse5');
  const catalogue = require('../server/exercises/csharp');
  const { isGradingSuspended } = require('../server/exercises/grading-policy');
  const { runTests, MAX_TESTS } = require('../server/exercises/runner');

  const witnesses = {
    'csb2-c1-e1': {
      stdin: 'long debut = 0; object boite = debut; long fin = (long)boite; string texte = "z"; object reference = texte;',
      expected: 'debut: Type=long | Mem=Stack | Op=ALLOCATION\nboite: Type=object | Mem=Heap | Op=BOXING\nfin: Type=long | Mem=Stack | Op=UNBOXING\ntexte: Type=string | Mem=Heap | Op=ALLOCATION\nreference: Type=object | Mem=Heap | Op=COPIE_REF'
    },
    'csb2-c1-e2': {
      stdin: 'INIT z=9, a=4, b=1\nMETHOD M(val premier, ref second, out resultat)\nBODY second=(second+premier)*2; resultat=second%7; premier=999\nCALL M(a, ref z, out b)',
      expected: 'ETAT_INITIAL: a=4, b=1, z=9\nMETHODE: M\nETAT_FINAL: a=4, b=5, z=26'
    },
    'csb2-c1-e3': {
      stdin: 'Circle Radius=0\nCircle Radius=10.1\nRectangle Width=0 Height=7\nRhombus Side=4',
      expected: 'Circle (r=0) => PetitCercle | Aire=0.00\nCircle (r=10.1) => GrandCercle | Aire=320.31\nRectangle (0x7) => Rectangle | Aire=0.00\nRhombus => FormeNonSupportee | Aire=0.00'
    },
    'csb2-c2-e1': {
      stdin: 'INIT Titulaire="Zoé Martin" Solde=12.50\nDEPOT 0\nRETRAIT 12.50\nDEPOT 1.25',
      expected: 'Compte: Zoé Martin | Solde initial: 12.50\nDEPOT 0.00 => Rejet: ArgumentException (Montant invalide)\nRETRAIT 12.50 => Succes | Nouveau solde: 0.00\nDEPOT 1.25 => Succes | Nouveau solde: 1.25\nSOLDE_FINAL: 1.25'
    },
    'csb2-c2-e2': {
      stdin: 'NEW Article("Neuf", "Grand écran, X", 73.25)\nNEW Article("Autre")',
      expected: 'Article("Neuf", "Grand écran, X", 73.25) => Chaine: ctor(r, nom, prix) | Objet: [Ref=Neuf, Nom=Grand écran, X, Prix=73.25]\nArticle("Autre") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=Autre, Nom=Sans nom, Prix=0.00]'
    },
    'csb2-c2-e3': {
      stdin: 'RECORD initial Prenom=Kim Role=Lecteur\nWITH copie FROM initial\nWITH admin FROM copie Role=Admin\nCOMPARE initial copie\nCOMPARE copie admin',
      expected: 'CREATE: initial => Record { Prenom = Kim, Role = Lecteur }\nWITH: copie => Record { Prenom = Kim, Role = Lecteur }\nWITH: admin => Record { Prenom = Kim, Role = Admin }\nEQUALS: initial == copie => True (Egalite structurelle)\nEQUALS: copie == admin => False'
    },
    'csb2-c3-e1': {
      stdin: 'REF Derived OBJ Derived CALL Identifier\nREF Base OBJ Base CALL Identifier\nREF Base OBJ Derived CALL Afficher\nREF Base OBJ Derived CALL Afficher',
      expected: 'Derived->Derived: Identifier() => Derived.Identifier [new]\nBase->Base: Identifier() => Base.Identifier [direct]\nBase->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\nBase->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]'
    },
    'csb2-c3-e2': {
      stdin: 'CAST IExportable CALL Traiter\nCAST IAuditable CALL Traiter\nDIRECT CALL Traiter\nDIRECT CALL Traiter',
      expected: 'IExportable.Traiter => Export JSON genere avec succes\nIAuditable.Traiter => Audit journalise dans le registre de conformite\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)'
    },
    'csb2-c3-e3': {
      stdin: 'PIPELINE Inscription\nPIPELINE Inscription\nPIPELINE Virement',
      expected: 'Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]\nPipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]\nPipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]'
    },
    'csb2-c4-e1': {
      stdin: 'TRYGET Cle\nADD Cle 0\nADD CLE -1\nTRYGET Cle\nTRYGET cle\nGET CLE',
      expected: 'TRYGET: Cle => NonTrouve (out val=0)\nADD: Cle => 0 (Taille=1)\nADD: CLE => -1 (Taille=2)\nTRYGET: Cle => Trouve: 0\nTRYGET: cle => NonTrouve (out val=0)\nGET: CLE => -1'
    },
    'csb2-c4-e2': {
      stdin: 'THROW HttpException StatusCode=404\nTHROW HttpException StatusCode=405\nTHROW HttpException StatusCode=500\nTHROW AutreException StatusCode=503',
      expected: 'Exception: HttpException (404) => Intercepte par: catch when (StatusCode == 404) [ClientError] | FINALLY execute\nException: HttpException (405) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute\nException: HttpException (500) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute\nException: AutreException (503) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute'
    },
    'csb2-c4-e3': {
      stdin: 'CONSTRAINT where T : class, IComparable, new()\nCandidate Nom=Flux IsClass=True HasDefaultCtor=False ImplementsComparable=False\nCandidate Nom=Date IsClass=False HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Objet IsClass=True HasDefaultCtor=True ImplementsComparable=True',
      expected: 'Type Flux: REJETE [Violation: pas de constructeur sans argument new(), n implemente pas IComparable]\nType Date: REJETE [Violation: non-class (struct)]\nType Objet: VALIDE (Toutes contraintes respectees)'
    },
    'csb2-c5-e1': {
      stdin: 'FILTER Prix >= -1.00\nArticle Nom=M Prix=-1.00\nArticle Nom=N Prix=-2\nArticle Nom=O Prix=2\nArticle Nom=P Prix=2',
      expected: 'LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: O - 2.00\nResultat: P - 2.00\nResultat: M - -1.00\nTOTAL_ELEMENTS: 3'
    },
    'csb2-c5-e2': {
      stdin: 'X Zoo 0\nY Alpha 2\nZ Alpha 4\nW Zoo 2',
      expected: 'Groupe: Alpha | NbAchats: 2 | Total: 6.00 | Moyenne: 3.00\nGroupe: Zoo | NbAchats: 2 | Total: 2.00 | Moyenne: 1.00'
    },
    'csb2-c5-e3': {
      stdin: 'SUBSCRIBE X\nSUBSCRIBE Y\nSUBSCRIBE X\nUNSUBSCRIBE X\nEMIT "Nouveau"\nUNSUBSCRIBE X\nEMIT "Final"',
      expected: 'EVENT "Nouveau" => X recoit la notification\nEVENT "Nouveau" => Y recoit la notification\nEVENT "Final" => Y recoit la notification'
    },
    'csb2-c6-e1': {
      stdin: 'TASK A Duree=0ms\nTASK B Duree=3ms\nTASK C Duree=0ms',
      expected: '[T=0ms] Demarrage A -> Await (trace simulee)\n[T=0ms] Reprise contexte -> Demarrage B -> Await\n[T=3ms] Reprise contexte -> Demarrage C -> Await\n[T=3ms] Tache completee avec succes. Duree totale=3ms'
    },
    'csb2-c6-e2': {
      stdin: 'TASK A Status=FAIL Error="Premier"\nTASK B Status=OK\nTASK C Status=FAIL Error="Deuxieme"\nTASK D Status=FAIL Error="Troisieme"',
      expected: 'WHENALL: 1 succes, 3 echecs\nAggregateException observee (3 erreurs):\n- Erreur 1: Premier\n- Erreur 2: Deuxieme\n- Erreur 3: Troisieme'
    },
    'csb2-c6-e3': {
      stdin: 'RESOURCE Temp ALLOCATE=H3\nOP Lire "a b"\nTHROW Echec\nOP Ecrire "ignoree"',
      expected: '[ALLOC] Temp alloue (Handle=H3)\n[EXEC] Op Lire "a b"\n[CRASH] Exception Echec intercepte\n[DISPOSE] Temp libere via IDisposable'
    }
  };

  const mutations = {
    'csb2-c1-e1': [
      ['valueTypes.Contains(sourceType)', 'false'],
      ['operation = "UNBOXING";', 'operation = "COPIE_VALEUR";']
    ],
    'csb2-c1-e2': [
      ['caller[target] = value;', 'locals[name] = value;'],
      ['result /= Atom();', 'result %= Atom();']
    ],
    'csb2-c1-e3': [
      ['radius > 10m', 'radius >= 10m'],
      ['width == height', 'width != height']
    ],
    'csb2-c2-e1': [
      ['amount <= 0m', 'amount < 0m'],
      ['amount > balance', 'amount >= balance']
    ],
    'csb2-c2-e2': [
      ["string name = \"Sans nom\";", "string name = \"Inconnu\";"],
      ["chain = \"ctor(r, nom, prix)\";", "chain = \"ctor(r, nom) -> ctor(r, nom, prix)\";"]
    ],
    'csb2-c2-e3': [
      ['new Dictionary<string, string>(records[fields[3]], StringComparer.Ordinal)', 'records[fields[3]]'],
      ['left.Count == right.Count', 'ReferenceEquals(left, right)']
    ],
    'csb2-c3-e1': [
      ['executingClass = instance;', 'executingClass = reference;'],
      ['executingClass = reference;', 'executingClass = instance;']
    ],
    'csb2-c3-e2': [
      ['Export JSON genere avec succes', 'Audit journalise dans le registre de conformite'],
      ['Audit journalise dans le registre de conformite', 'Export JSON genere avec succes']
    ],
    'csb2-c3-e3': [
      ["[1. Valider IBAN et solde]", "[1. Valider IBAN]"],
      ["[2. Calculer totaux et generer PDF]", "[2. Calculer totaux]"]
    ],
    'csb2-c4-e1': [
      ['values[key] = value;', 'if (!values.ContainsKey(key)) values[key] = value;'],
      ['StringComparer.Ordinal', 'StringComparer.OrdinalIgnoreCase']
    ],
    'csb2-c4-e2': [
      ['status == 404', 'status == 405'],
      ['status >= 500', 'status > 500']
    ],
    'csb2-c4-e3': [
      ['constraints.Contains("class") && !isClass', 'constraints.Contains("class") && isClass'],
      ['constraints.Contains("new()") && !hasDefault', 'constraints.Contains("new()") && hasDefault']
    ],
    'csb2-c5-e1': [
      ['article.Price >= threshold', 'article.Price > threshold'],
      ['.OrderByDescending(article => article.Price)', '.OrderBy(article => article.Price)']
    ],
    'csb2-c5-e2': [
      ['group.Average(purchase => purchase.Amount)', 'group.Sum(purchase => purchase.Amount)'],
      ['.OrderBy(group => group.Key, StringComparer.CurrentCulture)', '.OrderByDescending(group => group.Key, StringComparer.CurrentCulture)']
    ],
    'csb2-c5-e3': [
      ["subscribers.LastIndexOf(name)", "subscribers.IndexOf(name)"],
      ["subscribers.LastIndexOf(name)", "subscribers.FindLastIndex(subscriber => subscriber.StartsWith(name, StringComparison.Ordinal))"]
    ],
    'csb2-c6-e1': [
      ['time += duration;', 'time = duration;'],
      ['time += duration;', 'time += 1;']
    ],
    'csb2-c6-e2': [
      ['errors.Add(match.Groups[2].Value);', 'errors.Insert(0, match.Groups[2].Value);'],
      ['successes++;', 'successes += 2;']
    ],
    'csb2-c6-e3': [
      ['Console.WriteLine("[CRASH] Exception " + line.Substring(6) + " intercepte");\n                break;', 'Console.WriteLine("[CRASH] Exception " + line.Substring(6) + " intercepte");\n                return;'],
      ['else if (line == "EXIT") break;', 'else if (line == "EXIT") continue;']
    ]
  };

  const independenceWitnesses = {
    "csb2-c1-e1": [
      "Boxing d'une variable sans déballage",
      "Boîtes littérales et références copiées"
    ],
    "csb2-c1-e2": [
      "Echange de deux entiers par référence ref",
      "Quotient déjà présent dans la variable out"
    ],
    "csb2-c1-e3": [
      "Rayons voisins de la borne et égalité",
      "Rectangle nul, côtés égaux ou distincts et forme inconnue"
    ],
    "csb2-c2-e1": [
      "Dépôt nul sans retrait",
      "Retrait du montant exact ramenant le solde à zéro"
    ],
    "csb2-c2-e2": [
      "Appels uniques avec valeurs par défaut",
      "Constructeur complet direct"
    ],
    "csb2-c2-e3": [
      "Modification de plusieurs propriétés avec with",
      "Propriétés égales présentées dans un ordre différent"
    ],
    "csb2-c3-e1": [
      "Dispatch virtuel répété sur référence Base",
      "Référence dérivée puis masquage via Base"
    ],
    "csb2-c3-e2": [
      "Export puis accès direct sans cast",
      "Accès direct puis cast auditable"
    ],
    "csb2-c3-e3": [
      "Virement puis inscription",
      "Inscription puis facture"
    ],
    "csb2-c4-e1": [
      "Mise à jour d une clé existante",
      "Recherche avec une autre casse sans mise à jour"
    ],
    "csb2-c4-e2": [
      "Filtre client 404 puis repli 401",
      "Filtre serveur au seuil 500 puis 503"
    ],
    "csb2-c4-e3": [
      "Contraintes combinées avec double violation",
      "new() seul sans constructeur par défaut"
    ],
    "csb2-c5-e1": [
      "Un seul article exactement au seuil",
      "Tous les éléments acceptés"
    ],
    "csb2-c5-e2": [
      "Plusieurs achats dans un seul groupe",
      "Deux catégories d'un seul achat chacune"
    ],
    "csb2-c5-e3": [
      "Abonnements répétés et retrait de la dernière occurrence",
      "Désinscription d'un nom qui n'est qu'un préfixe"
    ],
    "csb2-c6-e1": [
      "Deux durées unitaires à cumuler",
      "Tâche asynchrone unique"
    ],
    "csb2-c6-e2": [
      "Tous les appels en échec",
      "Toutes les tâches réussies"
    ],
    "csb2-c6-e3": [
      "Exception puis instruction non exécutée",
      "Sortie immédiate puis instruction non exécutée"
    ]
  };

  const orderVersions = (first, second) => second.localeCompare(first, 'en', { numeric: true });
  const dotnetRoot = '/usr/share/dotnet';
  const sdk = fs.readdirSync(path.join(dotnetRoot, 'sdk')).sort(orderVersions)
    .find(version => fs.existsSync(path.join(dotnetRoot, 'sdk', version, 'Roslyn/bincore/csc.dll')));
  const referenceRoot = path.join(dotnetRoot, 'packs/Microsoft.NETCore.App.Ref');
  const runtimeRoot = path.join(dotnetRoot, 'shared/Microsoft.NETCore.App');
  const referenceVersion = fs.readdirSync(referenceRoot).sort(orderVersions)
    .find(version => fs.existsSync(path.join(runtimeRoot, version)));
  assert.ok(sdk && referenceVersion, 'SDK Roslyn et références correspondant au runtime requis');
  const referenceVersions = path.join(referenceRoot, referenceVersion, 'ref');
  const framework = fs.readdirSync(referenceVersions).sort(orderVersions).find(name => /^net\d+\.\d+$/.test(name));
  assert.ok(framework, 'références .NET introuvables');
  const references = path.join(referenceVersions, framework);
  const temporary = fs.mkdtempSync('/tmp/csharp-lot1-');
  const responseFile = path.join(temporary, 'references.rsp');
  fs.writeFileSync(responseFile, fs.readdirSync(references).filter(name => name.endsWith('.dll'))
    .map(name => '-r:' + path.join(references, name)).join('\n'));
  const runtimeConfig = JSON.stringify({
    runtimeOptions: { tfm: framework, framework: { name: 'Microsoft.NETCore.App', version: referenceVersion } }
  });
  const dotnet = path.join(dotnetRoot, 'dotnet');
  const compiler = path.join(dotnetRoot, 'sdk', sdk, 'Roslyn/bincore/csc.dll');

  function compile(id, suffix, source) {
    const base = path.join(temporary, id + '-' + suffix);
    fs.writeFileSync(base + '.cs', source);
    fs.writeFileSync(base + '.runtimeconfig.json', runtimeConfig);
    const result = spawnSync(dotnet, [compiler, '-nologo', '-nostdlib+', '-target:exe',
      '-out:' + base + '.dll', '@' + responseFile, base + '.cs'],
    { encoding: 'utf8', timeout: 30000, maxBuffer: 1024 * 1024 });
    assert.equal(result.status, 0, `${id} ${suffix} : compilation impossible\n${result.stdout}\n${result.stderr}\n${result.error || ''}`);
    return base + '.dll';
  }

  function execute(binary, input) {
    const result = spawnSync(dotnet, [binary], { input, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024 });
    return {
      ok: result.status === 0 && !result.error,
      status: result.status === 0 && !result.error ? 'success' : 'runtime_error',
      stdout: result.stdout || '', stderr: result.stderr || String(result.error || ''), exitCode: result.status
    };
  }

  function normalized(text) {
    return text.replace(/\r\n?/g, '\n').replace(/\n+$/, '');
  }

  function htmlText(node) {
    return (node.value || '') + (node.childNodes || []).map(htmlText).join('');
  }

  function validateHtml(source) {
    const stack = [];
    const problems = [];
    const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    const handler = {
      onStartTag(token) { if (!voidElements.has(token.tagName) && !token.selfClosing) stack.push(token.tagName); },
      onEndTag(token) { const previous = stack.pop(); if (previous !== token.tagName) problems.push(`fin ${token.tagName}, ouverture ${previous || 'absente'}`); },
      onComment() {}, onDoctype() {}, onEof() {}, onCharacter() {}, onNullCharacter() {}, onWhitespaceCharacter() {},
      onParseError(error) { problems.push(error.code); }
    };
    const tokenizer = new parse5.Tokenizer({ sourceCodeLocationInfo: true }, handler);
    tokenizer.write(source, true);
    assert.deepEqual(stack, [], 'balises non refermées');
    assert.deepEqual(problems, [], 'structure HTML incorrecte');
    const parseErrors = [];
    const fragment = parse5.parseFragment(source, { onParseError: error => parseErrors.push(error.code) });
    assert.deepEqual(parseErrors, [], 'erreurs du parseur HTML');
    return htmlText(fragment);
  }

  test('confinement et suspension de la notation conservée', () => {
    assert.equal(process.env.HOME, '/tmp');
    assert.equal(fs.existsSync('/home'), false);
    const interfaces = fs.readFileSync('/proc/net/dev', 'utf8').split('\n').slice(2)
      .map(line => line.trim().split(':')[0]).filter(Boolean);
    assert.deepEqual(interfaces, ['lo']);
    for (const course of ['csharp', 'docker', 'b3-linux', 'b3-github']) assert.ok(isGradingSuspended(course));
    assert.ok(MAX_TESTS >= 5);
  });

  test('F04 : les quatre énoncés sont complets et leur HTML est équilibré', () => {
    const expectedText = {
      'csb2-c1-e2': ['INIT <nom>=<valeur>', 'METHOD <Nom>', 'BODY <instr1>', 'CALL <Nom>'],
      'csb2-c2-e2': ['NEW Article("<Ref>")', 'this(r, "Sans nom")', 'NEW Article("<Ref>", "<Nom>"'],
      'csb2-c2-e3': ['RECORD <nom> <propriete>=<valeur>', 'WITH <nouveau_nom>', 'COMPARE <record1>'],
      'csb2-c5-e1': ['FILTER Prix >= <seuil>', 'Article Nom=<Nom> Prix=<Prix>', 'OrderByDescending']
    };
    for (const [id, fragments] of Object.entries(expectedText)) {
      const exercise = catalogue.find(item => item.id === id);
      assert.ok(exercise, id);
      const rendered = validateHtml(exercise.brief);
      for (const fragment of fragments) assert.ok(rendered.includes(fragment), `${id} : texte absent du DOM : ${fragment}`);
    }
  });

  test('18 corrigés traités et entrées indépendantes distinctes', () => {
    assert.equal(catalogue.length, 18);
    assert.equal(Object.keys(witnesses).length, 18);
    assert.deepEqual(catalogue.filter(exercise => !Object.hasOwn(witnesses, exercise.id)).map(exercise => exercise.id), []);
    for (const exercise of catalogue.filter(item => Object.hasOwn(witnesses, item.id))) {
      assert.ok(exercise.tests.length >= 5 && exercise.tests.length <= MAX_TESTS, exercise.id);
      assert.equal(new Set(exercise.tests.map(item => item.stdin)).size, exercise.tests.length, exercise.id);
      assert.ok(exercise.tests.every(item => !exercise.examples.some(example => example.stdin === item.stdin)), exercise.id);
      assert.ok(!exercise.tests.some(item => item.stdin === witnesses[exercise.id].stdin), exercise.id);
      assert.ok(!exercise.examples.some(item => item.stdin === witnesses[exercise.id].stdin), exercise.id);
      assert.doesNotMatch(exercise.solution, /if\s*\(\s*input\s*==/, exercise.id);
    }
  });

  test('constructeur : un prix décimal sans zéro initial conserve sa valeur', () => {
    const exercise = catalogue.find(item => item.id === 'csb2-c2-e2');
    const binary = compile(exercise.id, 'prix-sans-zero', exercise.solution);
    const result = execute(binary, 'NEW Article("P-1", "Carte", .75)');
    assert.ok(result.ok, result.stderr);
    assert.equal(normalized(result.stdout), 'Article("P-1", "Carte", .75) => Chaine: ctor(r, nom, prix) | Objet: [Ref=P-1, Nom=Carte, Prix=0.75]');
  });

  test('durées : le cumul ne déborde pas à la limite Int64', () => {
    const exercise = catalogue.find(item => item.id === 'csb2-c6-e1');
    const binary = compile(exercise.id, 'cumul-int64', exercise.solution);
    const result = execute(binary, 'TASK Maximum Duree=9223372036854775807ms\nTASK Suite Duree=1ms');
    assert.ok(result.ok, result.stderr);
    assert.equal(normalized(result.stdout), '[T=0ms] Demarrage Maximum -> Await (trace simulee)\n[T=9223372036854775807ms] Reprise contexte -> Demarrage Suite -> Await\n[T=9223372036854775808ms] Tache completee avec succes. Duree totale=9223372036854775808ms');
  });

  for (const [id, witness] of Object.entries(witnesses)) {
    test(`${id} : exemple, cas cachés actifs, témoin inédit et deux variantes`, async context => {
      const exercise = catalogue.find(item => item.id === id);
      const correct = compile(id, 'correct', exercise.solution);
      for (const example of exercise.examples) {
        const result = execute(correct, example.stdin);
        assert.ok(result.ok, `${id} exemple : ${result.stderr}`);
        assert.equal(normalized(result.stdout), normalized(example.expected), `${id} exemple`);
      }
      const report = await runTests(exercise, exercise.solution, {
        maxTests: MAX_TESTS,
        execute: async payload => execute(correct, payload.stdin)
      });
      assert.equal(report.stop, null, `${id} : ${JSON.stringify(report.stop)}`);
      assert.equal(report.passed, exercise.tests.length, id);
      const result = execute(correct, witness.stdin);
      assert.ok(result.ok, `${id} témoin : ${result.stderr}`);
      assert.equal(normalized(result.stdout), normalized(witness.expected), `${id} témoin inédit`);

      assert.equal(mutations[id].length, 2, id);
      const variantBinaries = [];
      for (const [index, [original, replacement]] of mutations[id].entries()) {
        assert.ok(exercise.solution.includes(original), `${id} mutation ${index + 1} absente`);
        const incorrect = exercise.solution.replace(original, replacement);
        const binary = compile(id, 'variante-' + index, incorrect);
        variantBinaries.push({ source: incorrect, binary });
        const mutantReport = await runTests(exercise, incorrect, {
          maxTests: MAX_TESTS,
          execute: async payload => execute(binary, payload.stdin)
        });
        assert.equal(mutantReport.stop && mutantReport.stop.reason, 'wrong_output',
          `${id} variante ${index + 1} : ${JSON.stringify(mutantReport)}`);
      }
      const activeCases = exercise.tests.slice(0, MAX_TESTS);
      const labels = independenceWitnesses[id];
      assert.equal(labels.length, 2, id);
      for (const [witnessIndex, label] of labels.entries()) {
        const sample = activeCases.find(item => item.label === label);
        assert.ok(sample, `${id} : témoin actif absent : ${label}`);
        for (const [variantIndex, candidate] of variantBinaries.entries()) {
          const single = { ...exercise, tests: [sample], verifyFirstExample: false };
          const crossReport = await runTests(single, candidate.source, {
            execute: async payload => execute(candidate.binary, payload.stdin)
          });
          assert.equal(crossReport.ok, true, `${id} : correcteur indisponible`);
          if (variantIndex === witnessIndex) {
            assert.equal(crossReport.stop?.reason, 'wrong_output', `${id} : ${label} doit rejeter la variante ${variantIndex + 1}`);
          } else {
            assert.equal(crossReport.stop, null, `${id} : ${label} doit accepter la variante ${variantIndex + 1}`);
            assert.equal(crossReport.passed, 1, id);
          }
        }
      }
      context.diagnostic(`1 exemple, ${exercise.tests.length} tests cachés actifs, 1 entrée inédite, 2 variantes rejetées et témoins croisés`);
    });
  }
}
