import base64
import copy
import hashlib
import importlib.util
import json
import os
import re
import shlex
import signal
import subprocess
import sys
import tempfile
from collections import Counter
from decimal import Decimal
from pathlib import Path


ROOT = Path("/trusted")
SOURCE_ROOT = Path("/project/server/exercises")
NSS = None
PAQUETS_SUPPLEMENTAIRES = (
    ("cas_algo_b3_1.json", "algo_b3_1.py", "al3-"),
    ("cas_algo_b3_2.json", "algo_b3_2.py", "al3-"),
    ("cas_linux_b2.json", "linux_b2.py", "lx2-"),
    ("cas_b1_linux.json", "b1_linux.py", "lx-"),
    ("cas_b1_git.json", "b1_git.py", "gt-"),
    ("cas_docker_b2.json", "docker_b2.py", "dk2-"),
    ("cas_b3_linux.json", "linux_b3.py", "lx3-"),
    ("cas_b3_github.json", "b3_github.py", "gh3-"),
    ("cas_react_b2.json", "react_b2.py", "rx2-"),
    ("cas_rd_winserver_complement.json", "rd_winserver.py", "ws2-"),
    ("cas_admin_vm_complement.json", "admin_vm.py", "vm2-"),
    ("cas_flask_b2.json", "flask_b2.py", "fl2-"),
    ("cas_java_b2.json", "java_b2.py", "java2-"),
)
specification = importlib.util.spec_from_file_location("oracles_independants", ROOT / "oracles.py")
oracles = importlib.util.module_from_spec(specification)
specification.loader.exec_module(oracles)
algo_specification = importlib.util.spec_from_file_location("oracles_algo_b1", ROOT / "algo_b1.py")
algo_b1 = importlib.util.module_from_spec(algo_specification)
algo_specification.loader.exec_module(algo_b1)
oracles_supplementaires = {}
for _, nom_module, _ in PAQUETS_SUPPLEMENTAIRES:
    paquet_specification = importlib.util.spec_from_file_location(nom_module[:-3], ROOT / nom_module)
    paquet = importlib.util.module_from_spec(paquet_specification)
    paquet_specification.loader.exec_module(paquet)
    if not callable(getattr(paquet, "calculer", None)):
        raise RuntimeError("Fonction d’oracle absente dans un paquet supplémentaire")
    oracles_supplementaires[nom_module] = paquet


def digest(value):
    if isinstance(value, str):
        value = value.encode("utf-8")
    return hashlib.sha256(value).hexdigest()


def controler_enveloppe():
    host_namespace = os.environ.get("AUDIT_HOST_NET_NS", "")
    if not re.fullmatch(r"net:\[\d+\]", host_namespace) or host_namespace == os.readlink("/proc/self/ns/net"):
        raise RuntimeError("Le contrôleur partage le réseau de l’hôte")
    if Path("/proc/1/comm").read_text().strip() != "bwrap" or Path("/home").exists() or "HOME" in os.environ:
        raise RuntimeError("Le contrôleur n’est pas confiné comme attendu")


def initialiser_nss():
    global NSS
    NSS = Path(tempfile.mkdtemp(prefix="nss-"))
    (NSS / "passwd").write_text(f"sandbox:x:{os.getuid()}:{os.getgid()}:Sandbox:/tmp:/bin/sh\n", encoding="utf-8")
    (NSS / "group").write_text(f"sandbox:x:{os.getgid()}:\n", encoding="utf-8")
    (NSS / "nsswitch.conf").write_text("passwd: files\ngroup: files\n", encoding="utf-8")
    (NSS / "os-release").write_text("NAME=Sandbox\nID=linux\n", encoding="utf-8")


def base_bwrap():
    if NSS is None:
        raise RuntimeError("Configuration NSS minimale absente")
    system_paths = []
    for directory in ("/bin", "/lib", "/lib64"):
        if Path(directory).is_symlink():
            system_paths += ["--symlink", os.readlink(directory), directory]
        elif Path(directory).is_dir():
            system_paths += ["--ro-bind", directory, directory]
    options = [
        "/toolchain/bwrap", "--die-with-parent", "--unshare-all", "--new-session",
        "--clearenv", "--cap-drop", "ALL", "--ro-bind", "/usr", "/usr", *system_paths,
        "--dir", "/etc",
        "--dir", "/toolchain", "--ro-bind", "/toolchain/node", "/toolchain/node",
        "--ro-bind", str(NSS / "passwd"), "/etc/passwd",
        "--ro-bind", str(NSS / "group"), "/etc/group", "--ro-bind", str(NSS / "nsswitch.conf"), "/etc/nsswitch.conf",
        "--ro-bind", str(NSS / "os-release"), "/etc/os-release", "--proc", "/proc", "--dev", "/dev",
        "--size", "67108864", "--tmpfs", "/tmp", "--chdir", "/tmp", "--setenv", "PATH", "/usr/bin:/bin",
        "--setenv", "LANG", "C.UTF-8", "--setenv", "TMPDIR", "/tmp",
        "--setenv", "XDG_CONFIG_HOME", "/tmp/.config", "--setenv", "XDG_CACHE_HOME", "/tmp/.cache",
        "--setenv", "XDG_DATA_HOME", "/tmp/.local/share", "--setenv", "XDG_STATE_HOME", "/tmp/.local/state",
        "--setenv", "PYTHONDONTWRITEBYTECODE", "1", "--setenv", "AUDIT_OUTER_NET",
        os.readlink("/proc/self/ns/net"), "--setenv", "DOTNET_CLI_HOME", "/tmp",
        "--setenv", "DOTNET_CLI_TELEMETRY_OPTOUT", "1", "--setenv", "DOTNET_SKIP_FIRST_TIME_EXPERIENCE", "1",
        "--setenv", "DOTNET_EnableDiagnostics", "0", "--setenv", "POWERSHELL_TELEMETRY_OPTOUT", "1",
    ]
    if Path("/etc/ld.so.cache").is_file():
        options += ["--ro-bind", "/etc/ld.so.cache", "/etc/ld.so.cache"]
    return options


def commande_bornee(options, command, language, export=False):
    arguments_execution = command
    address = 17179869184 if language == "sql" else 8589934592 if language in {"java", "powershell"} else 4294967296
    data = 1073741824 if language == "java" else 805306368
    open_files = 1024 if language in {"powershell", "csharp"} else 128
    output_size = 33554432 if export else 67108864 if language in {"php", "powershell", "csharp"} else 16777216
    command = [
        "/usr/bin/prlimit", f"--as={address}:{address}", "--cpu=18:18",
        f"--fsize={output_size}:{output_size}", f"--nofile={open_files}:{open_files}", "--core=0:0",
        "--nproc=256:256",
    ]
    if language not in {"powershell", "csharp", "sql"}:
        command.append(f"--data={data}:{data}")
    command += ["--", *arguments_execution]
    guard = 'test ! -e /home && test -z "${HOME+x}" && test ! -e /trusted && '
    if not export:
        guard += 'test ! -e /project/server/exercises && '
    guard += 'test "$(cat /proc/1/comm)" = bwrap && test "$(readlink /proc/self/ns/net)" != "$AUDIT_OUTER_NET" && exec "$@"'
    return options + ["/bin/sh", "-eu", "-c", guard, "audit", *command]


def executer_commande(command, entree, timeout=30, max_output=131072, inclure_stderr=False):
    with tempfile.TemporaryFile() as stdout_file, tempfile.TemporaryFile() as stderr_file:
        process = subprocess.Popen(
            command, stdin=subprocess.PIPE, stdout=stdout_file, stderr=stderr_file,
            start_new_session=True, close_fds=True,
        )
        timed_out = False
        try:
            process.communicate(entree.encode("utf-8"), timeout=timeout)
        except subprocess.TimeoutExpired:
            timed_out = True
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
            process.communicate()
        stdout_size = stdout_file.tell()
        stderr_size = stderr_file.tell()
        stdout_file.seek(0)
        stderr_file.seek(0)
        stdout = stdout_file.read(max_output + 1)
        stderr = stderr_file.read(max_output + 1)
        excessive = stdout_size > max_output or stderr_size > max_output
        result = {
            "code": process.returncode,
            "expiration": timed_out,
            "sortie_trop_longue": excessive,
            "stdout": stdout.decode("utf-8", errors="replace"),
            "stderr_sha256": digest(stderr),
        }
        if inclure_stderr:
            result["stderr"] = stderr.decode("utf-8", errors="replace")
        return result


def charger_catalogue():
    options = base_bwrap() + [
        "--dir", "/project", "--dir", "/project/server", "--ro-bind",
        str(SOURCE_ROOT), "/project/server/exercises",
    ]
    script = (
        "const path=require('node:path');const base='/project/server/exercises/';"
        "const all=require('/project/server/exercises').listExercises();"
        "const byId=new Map(all.map(item=>[item.id,item]));const origins=new Map();"
        "for(const [file,entry] of Object.entries(require.cache)){"
        "if(!file.startsWith(base)||!Array.isArray(entry.exports))continue;"
        "for(const item of entry.exports){const actual=item&&byId.get(item.id);"
        "if(!actual||item.solution!==actual.solution||JSON.stringify(item.tests)!==JSON.stringify(actual.tests)"
        "||JSON.stringify(item.examples)!==JSON.stringify(actual.examples))continue;"
        "if(!origins.has(item.id))origins.set(item.id,[]);origins.get(item.id).push(path.relative(base,file));}}"
        "process.stdout.write(JSON.stringify(all.map(item=>({...item,__sources:origins.get(item.id)||[]}))));"
    )
    command = commande_bornee(options, ["/toolchain/node", "--max-old-space-size=256", "-e", script], "javascript", export=True)
    outcome = executer_commande(command, "", timeout=45, max_output=33554432)
    if outcome["code"] != 0 or outcome["expiration"] or outcome["sortie_trop_longue"]:
        raise RuntimeError("Export isolé du catalogue impossible")
    result = json.loads(outcome["stdout"])
    if not isinstance(result, list) or len({item["id"] for item in result}) != len(result):
        raise RuntimeError("Catalogue illisible ou identifiants dupliqués")
    return result


def verification_isolation():
    script = (
        "import json,os;"
        "print(json.dumps({'pid1':open('/proc/1/comm').read().strip(),"
        "'reseau_separe':os.readlink('/proc/self/ns/net')!=os.environ['AUDIT_OUTER_NET'],"
        "'home_absent':not os.path.exists('/home'),'variable_home_absente':'HOME' not in os.environ,"
        "'oracle_absent':not os.path.exists('/trusted'),"
        "'catalogue_absent':not os.path.exists('/project/server/exercises')}))"
    )
    outcome = executer_commande(commande_bornee(base_bwrap(), ["/usr/bin/python3", "-I", "-c", script], "python"), "")
    if outcome["code"] != 0 or outcome["expiration"] or outcome["sortie_trop_longue"]:
        raise RuntimeError("Sonde d’isolation impossible")
    result = json.loads(outcome["stdout"])
    if result != {"pid1": "bwrap", "reseau_separe": True, "home_absent": True, "variable_home_absente": True, "oracle_absent": True, "catalogue_absent": True}:
        raise RuntimeError("Sonde d’isolation non conforme")
    node = executer_commande(commande_bornee(base_bwrap(), ["/toolchain/node", "-p", "process.versions.node"], "javascript"), "")
    version = node["stdout"].strip()
    if node["code"] != 0 or node["expiration"] or not re.fullmatch(r"22\.\d+\.\d+", version):
        raise RuntimeError("Node actif absent ou de version différente de 22")
    result["node_actif"] = version
    return result


def options_solution(language, source_file):
    extensions = {
        "python": "solution.py", "c": "solution.c", "cpp": "solution.cpp", "php": "solution.php",
        "javascript": "solution.js", "shell": "solution.sh", "sql": "solution.sql", "java": "Main.java",
        "powershell": "solution.ps1", "csharp": "solution.cs",
    }
    if language not in extensions:
        raise ValueError("langage non pris en charge par ce prototype")
    options = base_bwrap() + ["--dir", "/code", "--ro-bind", str(source_file), "/code/" + extensions[language]]
    if language in {"php", "java", "powershell", "csharp"}:
        options += ["--dir", "/runtimes"]
        if language == "php":
            options += ["--ro-bind", "/runtimes/php", "/runtimes/php"]
        elif language == "java":
            options += ["--ro-bind", "/runtimes/jdk", "/runtimes/jdk"]
        elif language == "powershell":
            options += ["--ro-bind", "/runtimes/powershell", "/runtimes/powershell"]
        else:
            options += ["--ro-bind", "/runtimes/dotnet", "/runtimes/dotnet"]
    if language == "sql":
        options += [
            "--dir", "/adapter", "--ro-bind", str(ROOT / "sql-worker.js"), "/adapter/sql-worker.js",
            "--dir", "/project", "--dir", "/project/assets", "--dir", "/project/assets/js",
            "--ro-bind", "/project/assets/js/engines", "/project/assets/js/engines",
            "--dir", "/project/b1-sql", "--dir", "/project/b1-sql/assets",
            "--dir", "/project/b1-sql/assets/vendor", "--ro-bind",
            "/project/b1-sql/assets/vendor/sqljs", "/project/b1-sql/assets/vendor/sqljs",
        ]
    return options


def commande_solution(language):
    if language == "python":
        return ["/usr/bin/python3", "-I", "/code/solution.py"]
    if language == "javascript":
        return ["/toolchain/node", "--max-old-space-size=96", "/code/solution.js"]
    if language == "shell":
        return ["/bin/bash", "/code/solution.sh"]
    if language == "php":
        return ["/runtimes/php", "-n", "-d", "display_errors=stderr", "/code/solution.php"]
    if language == "sql":
        return ["/toolchain/node", "--max-old-space-size=128", "/adapter/sql-worker.js"]
    if language in {"c", "cpp"}:
        compiler = "/usr/bin/gcc" if language == "c" else "/usr/bin/g++"
        standard = "c11" if language == "c" else "c++17"
        source = "/code/solution.c" if language == "c" else "/code/solution.cpp"
        return ["/bin/sh", "-c", f"{compiler} -std={standard} -O0 -o /tmp/programme {source} -lm && exec /tmp/programme"]
    if language == "java":
        script = (
            "/runtimes/jdk/bin/javac -J-Xms16m -J-Xmx128m -J-XX:ReservedCodeCacheSize=64m "
            "-J-XX:CompressedClassSpaceSize=32m -proc:none -encoding UTF-8 -d /tmp /code/Main.java "
            "&& exec /runtimes/jdk/bin/java -Xms8m -Xmx128m -XX:ReservedCodeCacheSize=64m "
            "-XX:CompressedClassSpaceSize=32m -cp /tmp Main"
        )
        return ["/bin/sh", "-c", script]
    if language == "powershell":
        return ["/runtimes/powershell/pwsh", "-NoLogo", "-NoProfile", "-NonInteractive", "-File", "/code/solution.ps1"]
    if language == "csharp":
        configuration = configuration_dotnet()
        if configuration is None:
            raise ValueError("SDK et runtime .NET compatibles absents")
        refs = shlex.quote(str(configuration["refs"]))
        compiler = shlex.quote(str(configuration["compiler"]))
        config = shlex.quote(json.dumps({"runtimeOptions": {"tfm": configuration["tfm"], "framework": {"name": "Microsoft.NETCore.App", "version": configuration["version"]}}}))
        script = (
            f"printf '%s' {config} > /tmp/Audit.runtimeconfig.json; "
            f"for reference in {refs}/*.dll; do printf '%s\\n' \"-r:$reference\"; done > /tmp/refs.rsp; "
            f"/runtimes/dotnet/dotnet {compiler} -nologo -nostdlib+ -target:exe -out:/tmp/Audit.dll @/tmp/refs.rsp /code/solution.cs "
            "&& exec /runtimes/dotnet/dotnet /tmp/Audit.dll"
        )
        return ["/bin/sh", "-c", script]
    raise ValueError("runtime non disponible")


def configuration_dotnet():
    root = Path("/runtimes/dotnet")
    if not (root / "dotnet").is_file():
        return None
    def versions(directory):
        if not directory.is_dir():
            return []
        return sorted((entry for entry in directory.iterdir() if entry.is_dir() and re.fullmatch(r"\d+\.\d+\.\d+", entry.name)), key=lambda entry: tuple(map(int, entry.name.split("."))), reverse=True)
    for reference in versions(root / "packs/Microsoft.NETCore.App.Ref"):
        major = reference.name.split(".")[0]
        tfm = "net" + major + ".0"
        refs = reference / "ref" / tfm
        runtime = root / "shared/Microsoft.NETCore.App" / reference.name
        if not refs.is_dir() or not any(refs.glob("*.dll")) or not runtime.is_dir():
            continue
        for sdk in versions(root / "sdk"):
            compiler = sdk / "Roslyn/bincore/csc.dll"
            if sdk.name.split(".")[0] == major and compiler.is_file():
                return {"refs": refs, "compiler": compiler, "tfm": tfm, "version": reference.name}
    return None


def runtime_disponible(language):
    paths = {
        "python": "/usr/bin/python3", "javascript": "/toolchain/node", "shell": "/bin/bash",
        "php": "/runtimes/php", "sql": "/toolchain/node", "c": "/usr/bin/gcc", "cpp": "/usr/bin/g++",
        "java": "/runtimes/jdk/bin/javac", "powershell": "/runtimes/powershell/pwsh",
    }
    if language == "csharp":
        return configuration_dotnet() is not None
    if language == "sql":
        required = [
            "/project/assets/js/engines/sql-wasm-engine.js",
            "/project/assets/js/engines/engine-interface.js",
            "/project/b1-sql/assets/vendor/sqljs/sql-wasm.js",
            "/project/b1-sql/assets/vendor/sqljs/sql-wasm.wasm",
        ]
        return os.access(paths[language], os.X_OK) and all(Path(path).is_file() for path in required)
    return language in paths and os.access(paths[language], os.X_OK)


def executer_solution(exercise, entree, replacement=None):
    language = exercise["language"]
    if not runtime_disponible(language):
        return {"etat": "non évalué", "raison": "runtime absent"}
    with tempfile.TemporaryDirectory(prefix="solution-") as directory:
        source_file = Path(directory) / "source"
        source_file.write_text(exercise["solution"] if replacement is None else replacement, encoding="utf-8")
        options = options_solution(language, source_file)
        command = commande_bornee(options, commande_solution(language), language)
        result = executer_commande(command, entree, timeout=45 if language in {"csharp", "java"} else 20, inclure_stderr=True)
    if result["expiration"] or result["sortie_trop_longue"]:
        return {"etat": "non évalué", "raison": "limite de temps ou de sortie", "code": result["code"]}
    if result["code"] != 0:
        signatures = {
            "memoire": ("out of memory", "allocation failed", "cannot allocate", "WebAssembly.Memory", "heap"),
            "module_absent": ("MODULE_NOT_FOUND", "Cannot find module"),
            "erreur_systeme": ("EACCES", "EPERM", "EMFILE", "bwrap:"),
            "erreur_node": ("node:internal", "FATAL ERROR", "bad option", "AbortError"),
            "erreur_sql": ("SQLITE_", "sql-wasm", "lanceur SQL isolé"),
        }
        categories = [name for name, markers in signatures.items() if any(marker.casefold() in result["stderr"].casefold() for marker in markers)]
        return {"etat": "non évalué", "raison": "compilation ou exécution interrompue, cause non qualifiée", "code": result["code"], "stderr_sha256": result["stderr_sha256"], "signatures_stderr": categories}
    stdout = result["stdout"]
    if language == "sql":
        try:
            sql_result = json.loads(stdout)
        except json.JSONDecodeError:
            return {"etat": "non évalué", "raison": "réponse SQL non exploitable"}
        if sql_result.get("status") != "success":
            return {"etat": "non évalué", "raison": "moteur SQL en erreur, cause non qualifiée"}
        stdout = sql_result.get("stdout", "")
    return {"etat": "exécuté", "sortie": stdout}


def normaliser(value):
    lines = str(value).replace("\r\n", "\n").replace("\r", "\n").split("\n")
    return "\n".join(line.rstrip() for line in lines).strip("\n")


def table_ascii(expected):
    columns = expected["colonnes"]
    rows = expected["lignes"]
    if not columns or not rows:
        raise ValueError("table vide non couverte par ce prototype")
    widths = [max(len(str(value)) for value in [column] + [row[index] for row in rows]) for index, column in enumerate(columns)]
    border = "+" + "+".join("-" * (width + 2) for width in widths) + "+"
    def line(values):
        return "| " + " | ".join(str(value).ljust(widths[index]) for index, value in enumerate(values)) + " |"
    summary = f"({len(rows)} {'ligne retournée' if len(rows) == 1 else 'lignes retournées'})"
    return "\n".join([border, line(columns), border, *[line(row) for row in rows], border, summary])


def canonique(value, codec):
    value = str(value or "").replace("\r\n", "\n").replace("\r", "\n")
    if codec.startswith("sql_"):
        return oracles.instantane_sql(value, codec)
    if codec == "nombres":
        return tuple(str(Decimal(item).normalize()) for item in value.split())
    if codec == "mots":
        return tuple(value.split())
    if codec == "lignes_casse_ignoree":
        return tuple(line.strip().casefold() for line in value.splitlines() if line.strip())
    if codec == "lignes":
        return tuple(line.rstrip() for line in value.splitlines())
    if codec == "ligne":
        return " ".join(value.split())
    raise ValueError("codec de nouveauté absent")


def verifier_nouveaute(exercise, definition, source):
    anciens = list(exercise.get("examples") or []) + list(exercise.get("tests") or [])
    codec = definition["codec"]
    anciens_canon = {canonique(entry.get("stdin", ""), codec) for entry in anciens}
    nouveaux_canon = set()
    corpora = [source, exercise.get("solution", ""), exercise.get("starter", ""), exercise.get("brief", "")]
    if len(definition["cas"]) != 2:
        raise ValueError("deux cas exactement sont requis")
    for case in definition["cas"]:
        entree = case["entree"]
        stripped = entree.replace("\r\n", "\n").replace("\r", "\n").rstrip("\n")
        if not stripped or len(stripped) < 3:
            raise ValueError("entrée trop courte pour un contrôle textuel utile")
        key = canonique(entree, codec)
        if key in anciens_canon or key in nouveaux_canon:
            raise ValueError("entrée identique à un exemple, un test ou un autre cas après canonicalisation")
        nouveaux_canon.add(key)
        variants = {
            stripped,
            json.dumps(stripped, ensure_ascii=False)[1:-1],
            json.dumps(stripped, ensure_ascii=True)[1:-1],
            base64.b64encode(stripped.encode("utf-8")).decode("ascii"),
        }
        if any(variant and variant in corpus for variant in variants for corpus in corpora):
            raise ValueError("entrée ou représentation littérale présente dans la source")


def verifier_source(exercise, definition):
    origins = exercise.get("__sources") or []
    if definition["source"] not in origins:
        raise ValueError("la fiche ne provient pas du module source déclaré")
    source = (SOURCE_ROOT / definition["source"]).resolve()
    if SOURCE_ROOT not in source.parents or source.suffix != ".js":
        raise ValueError("source non autorisée")
    text = source.read_text(encoding="utf-8")
    pattern = r"[\"']?id[\"']?\s*:\s*[\"']" + re.escape(exercise["id"]) + r"[\"']"
    if not re.search(pattern, text):
        raise ValueError("identifiant absent de la source déclarée")
    contents = []
    for origin in sorted(set(origins)):
        path = (SOURCE_ROOT / origin).resolve()
        if SOURCE_ROOT not in path.parents or path.suffix != ".js":
            raise ValueError("origine de module non autorisée")
        contents.append(path.read_text(encoding="utf-8"))
    return "\n".join(contents)


def controler_attendus(definition):
    for case in definition["cas"]:
        paquet = definition.get("paquet_oracle")
        if paquet is not None:
            computed = oracles_supplementaires[paquet].calculer(definition["oracle"], case["entree"])
        elif definition["oracle"].startswith("algo-"):
            computed = algo_b1.calculer(definition["oracle"], case["entree"])
        else:
            computed = oracles.calculer(definition["oracle"], case["entree"])
        if computed != case["attendu"]:
            raise ValueError("attendu manuel différent de l’oracle indépendant")


def etat_sortie(exercise, case):
    outcome = executer_solution(exercise, case["entree"])
    if outcome["etat"] != "exécuté":
        return outcome
    expected = case["attendu"]
    if isinstance(expected, dict):
        expected = table_ascii(expected)
    mode = case.get("mode", "normalise")
    if mode not in {"normalise", "exact"}:
        raise ValueError("mode de comparaison non reconnu")
    actual = outcome["sortie"] if mode == "exact" else normaliser(outcome["sortie"])
    expected = str(expected) if mode == "exact" else normaliser(expected)
    return {
        "etat": "réussi" if actual == expected else "échoué",
        "sortie_normalisee": actual[:4096],
        "attendu_normalise": expected,
        "mode_comparaison": mode,
    }


def etat_combine(states):
    if not states or any(state not in {"réussi", "échoué", "non évalué"} for state in states):
        return "non évalué"
    if "échoué" in states:
        return "échoué"
    if "non évalué" in states:
        return "non évalué"
    return "réussi"


def code_rapport(counts):
    return 1 if counts.get("échoué", 0) or counts.get("non évalué", 0) else 0


def auditer_exercice(exercise, definition):
    try:
        source = verifier_source(exercise, definition)
        verifier_nouveaute(exercise, definition, source)
        controler_attendus(definition)
    except (ValueError, OSError, TypeError, KeyError) as error:
        return {"etat": "non évalué", "raison": f"admissibilité non démontrée : {error}"}
    results = []
    for index, case in enumerate(definition["cas"], start=1):
        outcome = etat_sortie(exercise, case)
        results.append({"numero": index, "entree": case["entree"], "attendu": case["attendu"], "oracle_verifie": True, **outcome})
    states = [item["etat"] for item in results]
    state = etat_combine(states)
    raisons = {
        "réussi": "deux cas admissibles comparés aux attendus de l’oracle indépendant ; cela ne prouve pas une correction générale",
        "échoué": "au moins une sortie comparée diffère de l’attendu indépendant ; les autres cas peuvent rester non évalués",
        "non évalué": "au moins une exécution n’a pas pu être comparée ; consulter les raisons de chaque cas",
    }
    return {
        "etat": state,
        "raison": raisons[state],
        "source": definition["source"],
        "modules_source": sorted(set(exercise.get("__sources") or [])),
        "empreinte_source": digest(source),
        "empreinte_corrige": digest(exercise["solution"]),
        "oracle": definition["oracle"],
        "codec": definition["codec"],
        "precision": definition.get("precision"),
        "cas": results,
    }


def controler_domaine_fini(exercise, definition):
    cases = []
    for value in definition["valeurs"]:
        expected = oracles.calculer(definition["oracle"], value)
        outcome = etat_sortie(exercise, {"entree": value, "attendu": expected})
        cases.append({"valeur": value, "attendu": expected, **outcome})
    return {
        "nature": "contrôle supplémentaire de valeurs déjà publiées ou déjà testées ; ne compte pas comme nouveau cas",
        "raison": definition["raison"],
        "etat": etat_combine([case["etat"] for case in cases]),
        "cas": cases,
    }


def tester_rejet_memorisation(exercise, definition):
    known = {}
    for case in (exercise.get("examples") or []) + (exercise.get("tests") or []):
        known[str(case.get("stdin", "")).strip()] = case["expected"]
    program = "import json,sys\nvalues=json.loads(" + repr(json.dumps(known, ensure_ascii=False)) + ")\nprint(values.get(sys.stdin.read().strip(),''))\n"
    old_states = []
    for entry, expected in known.items():
        outcome = executer_solution(exercise, entry, replacement=program)
        old_states.append(outcome.get("etat") == "exécuté" and normaliser(outcome["sortie"]) == normaliser(expected))
    new_states = []
    for case in definition["cas"]:
        outcome = executer_solution(exercise, case["entree"], replacement=program)
        new_states.append(outcome.get("etat") == "exécuté" and normaliser(outcome["sortie"]) != normaliser(case["attendu"]))
    simulated = dict(exercise)
    simulated["solution"] = program
    verdict = auditer_exercice(simulated, definition)["etat"]
    return {
        "nature": "programme artificiel table-de-correspondance, jamais un verdict sur un corrigé réel",
        "anciens_cas_reussis": sum(old_states), "anciens_cas_total": len(old_states),
        "nouveaux_cas_rejetes": sum(new_states), "nouveaux_cas_total": len(new_states),
        "verdict_du_banc": verdict,
        "verification_reussie": all(old_states) and all(new_states) and verdict == "échoué",
    }


def tester_garde(exercise, definition):
    source = verifier_source(exercise, definition)
    duplicate = copy.deepcopy(definition)
    duplicate["cas"][0]["entree"] = "000"
    duplicate_rejected = False
    try:
        verifier_nouveaute(exercise, duplicate, source)
    except ValueError as error:
        duplicate_rejected = "après canonicalisation" in str(error)
    encoded = base64.b64encode(definition["cas"][0]["entree"].encode("utf-8")).decode("ascii")
    encoded_rejected = False
    try:
        verifier_nouveaute(exercise, definition, source + "\n" + encoded)
    except ValueError as error:
        encoded_rejected = "représentation littérale" in str(error)
    wrong_expected = copy.deepcopy(definition)
    wrong_expected["cas"][0]["attendu"] = "attendu volontairement faux"
    wrong_expected_rejected = False
    try:
        controler_attendus(wrong_expected)
    except ValueError:
        wrong_expected_rejected = True
    absent_oracle = copy.deepcopy(definition)
    absent_oracle["oracle"] = "oracle_non_disponible"
    absent_oracle_state = auditer_exercice(exercise, absent_oracle)["etat"]
    return {
        "ancienne_valeur_reformatee_rejetee": duplicate_rejected,
        "entree_encodee_dans_source_rejetee": encoded_rejected,
        "attendu_manuel_errone_rejete": wrong_expected_rejected,
        "oracle_absent_non_evalue": absent_oracle_state == "non évalué",
        "code_echec_non_nul": code_rapport({"échoué": 1, "non évalué": 0}) == 1,
        "code_non_evalue_non_nul": code_rapport({"échoué": 0, "non évalué": 1}) == 1,
        "code_reussite_nul": code_rapport({"échoué": 0, "non évalué": 0}) == 0,
        "echec_complementaire_prioritaire": etat_combine(["réussi", "échoué"]) == "échoué",
        "controle_complementaire_absent_non_evalue": etat_combine(["réussi", "non évalué"]) == "non évalué",
    }


def tester_garde_paquets(definitions):
    resultats = {}
    for _, nom_module, _ in PAQUETS_SUPPLEMENTAIRES:
        candidates = [item for item in definitions.values() if item.get("paquet_oracle") == nom_module]
        reference = None
        for candidate in candidates:
            try:
                controler_attendus(candidate)
                reference = candidate
                break
            except (ValueError, KeyError, TypeError):
                continue
        if reference is None:
            resultats[nom_module] = {"reference_disponible": False, "attendu_errone_rejete": False, "oracle_absent_rejete": False}
            continue
        faux_attendu = copy.deepcopy(reference)
        faux_attendu["cas"][0]["attendu"] = "attendu volontairement faux pour le controle"
        attendu_rejete = False
        try:
            controler_attendus(faux_attendu)
        except (ValueError, KeyError, TypeError):
            attendu_rejete = True
        oracle_absent = copy.deepcopy(reference)
        oracle_absent["oracle"] = "oracle_non_disponible"
        oracle_rejete = False
        try:
            controler_attendus(oracle_absent)
        except (ValueError, KeyError, TypeError):
            oracle_rejete = True
        resultats[nom_module] = {"reference_disponible": True, "attendu_errone_rejete": attendu_rejete, "oracle_absent_rejete": oracle_rejete}
    return resultats


def main():
    controler_enveloppe()
    initialiser_nss()
    isolation = verification_isolation()
    manifest = json.loads((ROOT / "cas.json").read_text(encoding="utf-8"))
    manifest["exercices"].extend(json.loads((ROOT / "cas_algo.json").read_text(encoding="utf-8"))["exercices"])
    for nom_cas, nom_module, prefixe in PAQUETS_SUPPLEMENTAIRES:
        supplement = json.loads((ROOT / nom_cas).read_text(encoding="utf-8"))
        if not isinstance(supplement.get("exercices"), list):
            raise RuntimeError("Liste de cas supplémentaire invalide")
        for definition in supplement["exercices"]:
            if not isinstance(definition, dict) or not str(definition.get("id", "")).startswith(prefixe):
                raise RuntimeError("Identifiant hors du périmètre du paquet")
            if definition.get("oracle") != definition["id"] or "paquet_oracle" in definition:
                raise RuntimeError("Association à l’oracle supplémentaire invalide")
            manifest["exercices"].append({**definition, "paquet_oracle": nom_module})
    definitions = {item["id"]: item for item in manifest["exercices"]}
    if len(definitions) != len(manifest["exercices"]):
        raise RuntimeError("Identifiant dupliqué dans les cas")
    catalogue = charger_catalogue()
    by_id = {exercise["id"]: exercise for exercise in catalogue}
    if set(definitions) - set(by_id):
        raise RuntimeError("Des cas désignent des exercices absents")
    results = []
    for exercise in catalogue:
        identifier = exercise["id"]
        row = {"id": identifier, "course": exercise["course"], "language": exercise["language"]}
        try:
            if identifier in definitions:
                row.update(auditer_exercice(exercise, definitions[identifier]))
            elif identifier == "fl2-c4-e1":
                row.update({"etat": "non évalué", "raison": manifest["domaines_finis"][identifier]["raison"]})
            elif exercise["language"] == "analyse":
                row.update({"etat": "non évalué", "raison": "corrigé texte/grille indexé par cas ; aucun algorithme à généraliser ni oracle paramétrique disponible"})
            elif exercise["language"] == "sql":
                row.update({"etat": "non évalué", "raison": "aucune paire de bases nouvelles et d’attendus indépendants définie ici"})
            else:
                row.update({"etat": "non évalué", "raison": "aucune paire d’entrées admissibles et d’attendus indépendants définie ici"})
        except Exception as error:
            row.update({"etat": "non évalué", "raison": "incident du prototype : " + type(error).__name__})
        results.append(row)
    for identifier, definition in manifest["domaines_finis"].items():
        row = next(item for item in results if item["id"] == identifier)
        try:
            row["couverture_finie_complementaire"] = controler_domaine_fini(by_id[identifier], definition)
        except Exception as error:
            row["couverture_finie_complementaire"] = {
                "nature": "contrôle supplémentaire, indépendant du statut principal",
                "etat": "non évalué",
                "raison": "incident du prototype : " + type(error).__name__,
                "cas": [],
            }
        row["etat_avant_controle_fini"] = row["etat"]
        row["etat"] = etat_combine([row["etat"], row["couverture_finie_complementaire"]["etat"]])
        if row["etat"] != row["etat_avant_controle_fini"]:
            row["raison"] += " ; le contrôle fini complémentaire est " + row["couverture_finie_complementaire"]["etat"]
    mutant = tester_rejet_memorisation(by_id["py-c1-e1"], definitions["py-c1-e1"])
    guards = tester_garde(by_id["py-c1-e1"], definitions["py-c1-e1"])
    package_guards = tester_garde_paquets(definitions)
    if not mutant["verification_reussie"] or not all(guards.values()) or not all(all(checks.values()) for checks in package_guards.values()):
        raise RuntimeError("Autocontrôle du banc non concluant : aucun rapport de succès n’est produit")
    counts = Counter(row["etat"] for row in results)
    if sum(counts.values()) != len(catalogue) or set(counts) - {"réussi", "échoué", "non évalué"}:
        raise RuntimeError("Rapport non exhaustif ou état inconnu")
    languages = Counter(row["language"] for row in results)
    snapshot = [(str(path.relative_to(SOURCE_ROOT)), digest(path.read_bytes())) for path in sorted(SOURCE_ROOT.rglob("*")) if path.is_file() and path.suffix in {".js", ".json"}]
    report = {
        "catalogue": len(catalogue),
        "versions": {
            "cas_sha256": digest((ROOT / "cas.json").read_bytes()),
            "cas_algo_sha256": digest((ROOT / "cas_algo.json").read_bytes()),
            "oracle_algo_sha256": digest((ROOT / "algo_b1.py").read_bytes()),
            "oracles_sha256": digest((ROOT / "oracles.py").read_bytes()),
            "banc_sha256": digest((ROOT / "banc.py").read_bytes()),
            "moteur_sql_worker_sha256": digest((ROOT / "sql-worker.js").read_bytes()),
            "paquets_supplementaires": {
                nom_cas: {"cas_sha256": digest((ROOT / nom_cas).read_bytes()),
                          "oracle": nom_module, "oracle_sha256": digest((ROOT / nom_module).read_bytes())}
                for nom_cas, nom_module, _ in PAQUETS_SUPPLEMENTAIRES
            },
            "catalogue_fichiers": len(snapshot),
            "catalogue_sha256": digest(json.dumps(snapshot, ensure_ascii=False)),
        },
        "langages": dict(languages),
        "etats": {state: counts[state] for state in ("réussi", "échoué", "non évalué")},
        "isolation": isolation,
        "controle_mutant": mutant,
        "autocontroles": guards,
        "autocontroles_paquets": package_guards,
        "code_sortie": code_rapport(counts),
        "limites": [
            f"Les {languages['analyse']} grilles d’analyse indexées par cas ne calculent pas de nouvelle réponse : il faut revoir le format ou fournir un oracle paramétrique externe ; leur statut ne démontre rien sur la généralisation.",
            "La nouveauté est contrôlée par canonicalisation spécifique, comparaison à tous les exemples/tests et recherche littérale/échappée/base64 dans les modules identifiés et champs résolus ; les dépendances dynamiques, encodages et calculs arbitraires ne sont pas tous démontrablement couverts.",
            "Un succès signifie seulement que deux cas admissibles, aux attendus revérifiés indépendamment de la solution, concordent ; cela ne prouve ni correction générale ni absence de mémorisation.",
            "Les contrôles des domaines finis sont séparés et ne prétendent pas ajouter des scénarios nominaux inédits.",
            "Les cas SQL de ce prototype concernent uniquement B2 ; aucun banc SQL B1 n’est produit ni intégré.",
            "Les fichiers sont copiés séquentiellement et revérifiés ; ce n’est pas un instantané atomique en présence d’écritures concurrentes. Le condensat identifie la copie utilisée.",
            "Bubblewrap isole namespaces, réseau et montages ; les limites de processus/ressources sont locales, sans cgroup ni profil seccomp dédié. SQL/Node 22 dispose de 16 Gio d’espace virtuel pour WebAssembly ; cela ne limite pas la mémoire physique comme un cgroup. Un durcissement est nécessaire pour du code hostile en production.",
        ],
        "exercices": results,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return report["code_sortie"]


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as error:
        raisons = {
            "Le contrôleur partage le réseau de l’hôte": "reseau_non_isole",
            "Le contrôleur n’est pas confiné comme attendu": "confinement_invalide",
            "Configuration NSS minimale absente": "nss_absent",
            "Export isolé du catalogue impossible": "export_catalogue_impossible",
            "Catalogue illisible ou identifiants dupliqués": "catalogue_invalide",
            "Sonde d’isolation impossible": "sonde_isolation_impossible",
            "Sonde d’isolation non conforme": "sonde_isolation_non_conforme",
            "Node actif absent ou de version différente de 22": "node_22_requis",
            "Identifiant dupliqué dans les cas": "cas_dupliques",
            "Des cas désignent des exercices absents": "exercice_manquant",
            "Autocontrôle du banc non concluant : aucun rapport de succès n’est produit": "autocontrole_echoue",
            "Rapport non exhaustif ou état inconnu": "rapport_non_exhaustif",
        }
        print(json.dumps({"etat": "erreur_infrastructure", "raison": raisons.get(str(error), "incident_non_qualifie"), "type": type(error).__name__}, ensure_ascii=False))
        sys.exit(2)
