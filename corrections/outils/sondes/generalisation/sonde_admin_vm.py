import concurrent.futures
import importlib.util
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path


ROOT = Path("/trusted")
SOURCE_ROOT = Path("/project/server/exercises")


def charger_module(nom, chemin):
    specification = importlib.util.spec_from_file_location(nom, chemin)
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


banc = charger_module("banc_generalisation", ROOT / "banc.py")
oracle = charger_module("oracle_admin_vm", ROOT / "admin_vm.py")


def empreinte_catalogue():
    fichiers = [path for path in SOURCE_ROOT.rglob("*") if path.is_file() and path.suffix in {".js", ".json"}]
    instantane = [(str(path.relative_to(SOURCE_ROOT)), banc.digest(path.read_bytes())) for path in sorted(fichiers)]
    return banc.digest(json.dumps(instantane, ensure_ascii=False)), len(instantane)


def executer_code(code, entree):
    with tempfile.TemporaryDirectory(prefix="admin-vm-code-") as repertoire:
        source = Path(repertoire) / "source"
        source.write_text(code, encoding="utf-8")
        options = banc.options_solution("powershell", source)
        commande = banc.commande_bornee(options, banc.commande_solution("powershell"), "powershell")
        resultat = banc.executer_commande(commande, entree, timeout=20, inclure_stderr=True)
    base = {
        "code": resultat["code"], "expiration": resultat["expiration"],
        "sortie_trop_longue": resultat["sortie_trop_longue"],
        "sortie": resultat["stdout"], "stderr": resultat["stderr"],
        "stderr_sha256": resultat["stderr_sha256"],
    }
    if resultat["code"] != 0 or resultat["expiration"] or resultat["sortie_trop_longue"] or resultat["stderr"].strip():
        return {"etat": "non évalué", "raison": "exécution interrompue ou diagnostic sur stderr", **base}
    return {"etat": "exécuté", **base}


def preparer_definition(exercice, definition):
    if exercice["language"] != "powershell" or exercice["id"] != definition["id"] or definition.get("oracle") != exercice["id"]:
        raise ValueError("fiche ou langage incompatible")
    source = banc.verifier_source(exercice, definition)
    if len(definition["cas"]) != 2 or len(definition["variantes"]) < 2:
        raise ValueError("paire de témoins ou de variantes absente")
    for cas in definition["cas"] + definition.get("cas_complementaires", []):
        if oracle.calculer(definition["oracle"], cas["entree"]) != cas["attendu"]:
            raise ValueError(f"attendu non confirmé par l'oracle : {exercice['id']}")
    oracle_tests_actifs = []
    for test in exercice["tests"][:7]:
        try:
            attendu = oracle.calculer(definition["oracle"], test["stdin"])
        except ValueError as erreur:
            oracle_tests_actifs.append({"label": test.get("label"), "etat": "hors domaine de l'oracle", "raison": str(erreur)})
            continue
        if attendu != test["expected"]:
            raise ValueError(f"test actif incompatible avec l'oracle : {exercice['id']} {test.get('label')}")
        oracle_tests_actifs.append({"label": test.get("label"), "etat": "conforme"})
    domaine = definition.get("domaine_fini")
    if domaine:
        definition["cas_domaine"] = [{"entree": valeur, "attendu": oracle.calculer(definition["oracle"], valeur)} for valeur in domaine]
        anciens = exercice.get("examples", []) + exercice.get("tests", [])
        anciens_canon = {banc.canonique(cas["stdin"], definition["codec"]) for cas in anciens}
        domaine_canon = {banc.canonique(valeur, definition["codec"]) for valeur in domaine}
        if not domaine_canon.issubset(anciens_canon):
            raise ValueError("le domaine déclaré n'est pas épuisé par les exemples et tests")
        try:
            banc.verifier_nouveaute(exercice, definition, source)
        except ValueError as erreur:
            nouveaute = {"etat": "impossible dans le domaine énoncé", "raison": str(erreur), "domaine": domaine}
        else:
            raise ValueError("les témoins du domaine fini sont déclarés à tort nouveaux")
    else:
        banc.verifier_nouveaute(exercice, definition, source)
        nouveaute = {"etat": "deux entrées non retrouvées", "codec": definition["codec"]}
    candidats = [{
        "nom": "corrige", "nature": "corrige", "code": exercice["solution"],
        "code_sha256": banc.digest(exercice["solution"]), "executions": {},
    }]
    for variante in definition["variantes"]:
        ancien = variante["avant"]
        if exercice["solution"].count(ancien) != 1:
            raise ValueError(f"mutation non unique : {exercice['id']} {variante['nom']}")
        code = exercice["solution"].replace(ancien, variante["apres"], 1)
        if any(candidat["code"] == code for candidat in candidats):
            raise ValueError("variante identique à un candidat précédent")
        candidats.append({
            "nom": variante["nom"], "erreur": variante["erreur"],
            "nature": "variante",
            "complementaire": variante.get("complementaire", False),
            "code": code, "code_sha256": banc.digest(code), "executions": {},
        })
    if any(candidat.get("complementaire") for candidat in candidats[1:3]):
        raise ValueError("les deux premières variantes doivent être principales")
    for alternative in definition.get("alternatives_conformes", []):
        if not domaine or exercice["solution"].count(alternative["avant"]) != 1:
            raise ValueError("alternative conforme sans domaine fini ou mutation unique")
        code = exercice["solution"].replace(alternative["avant"], alternative["apres"], 1)
        if any(candidat["code"] == code for candidat in candidats):
            raise ValueError("alternative identique à un candidat précédent")
        candidats.append({
            "nom": alternative["nom"], "nature": "alternative_conforme", "erreur": alternative["explication"],
            "code": code, "code_sha256": banc.digest(code), "executions": {},
        })
    return {
        "exercice": exercice, "definition": definition, "candidats": candidats,
        "nouveaute": nouveaute, "source_sha256": banc.digest(source),
        "origines": sorted(set(exercice.get("__sources") or [])), "oracle_tests_actifs": oracle_tests_actifs,
    }


def inputs(exercice, definition):
    actifs = exercice["tests"][:7]
    if exercice.get("verifyFirstExample") is True:
        actifs = actifs + [exercice["examples"][0]]
    entrees = [cas.get("stdin", "") for cas in actifs]
    entrees.extend(cas["entree"] for cas in definition["cas"] + definition.get("cas_complementaires", []) + definition.get("cas_domaine", []))
    return list(dict.fromkeys(entrees))


def lancer_executions(entrees):
    travaux = []
    for paquet in entrees:
        for candidat in paquet["candidats"]:
            for entree in inputs(paquet["exercice"], paquet["definition"]):
                travaux.append((paquet["exercice"]["id"], candidat, entree))
    total = len(travaux)
    travailleurs = int(os.environ.get("ADMIN_VM_WORKERS", "4"))
    if not 1 <= travailleurs <= 8:
        raise ValueError("nombre de travailleurs hors limite")
    with concurrent.futures.ThreadPoolExecutor(max_workers=travailleurs) as pool:
        futurs = {pool.submit(executer_code, candidat["code"], entree): (identifiant, candidat, entree)
                  for identifiant, candidat, entree in travaux}
        for nombre, futur in enumerate(concurrent.futures.as_completed(futurs), 1):
            _, candidat, entree = futurs[futur]
            candidat["executions"][entree] = futur.result()
            if nombre % 50 == 0 or nombre == total:
                print(f"Exécutions PowerShell isolées : {nombre}/{total}", file=sys.stderr, flush=True)
    return total


def comparer(paquets):
    document = {"exercices": [{cle: paquet[cle] for cle in ("exercice", "definition", "candidats")} for paquet in paquets]}
    resultat = banc.executer_commande(
        ["/toolchain/node", "/trusted/comparer_admin_vm.js"], json.dumps(document, ensure_ascii=False),
        timeout=120, max_output=33554432, inclure_stderr=True,
    )
    if resultat["code"] != 0 or resultat["expiration"] or resultat["sortie_trop_longue"]:
        raise RuntimeError("comparateur du correcteur indisponible : " + resultat["stderr"][:1000])
    return json.loads(resultat["stdout"])


def analyser(paquets, comparaisons):
    resultats = []
    par_id = {ligne["id"]: ligne for ligne in comparaisons["exercices"]}
    for paquet in paquets:
        exercice = paquet["exercice"]
        ligne = par_id[exercice["id"]]
        candidats = ligne["candidats"]
        matrice = [[cas["etat"] for cas in candidat["temoins"]] for candidat in candidats[1:3]]
        independance = matrice == [["rejeté", "accepté"], ["accepté", "rejeté"]]
        corrige = candidats[0]
        resultats.append({
            "id": exercice["id"], "titre": exercice["title"], "source": paquet["definition"]["source"],
            "origines": paquet["origines"], "source_sha256": paquet["source_sha256"],
            "nouveaute": paquet["nouveaute"], "attendus_oracle": "conformes",
            "oracle_tests_actifs": paquet["oracle_tests_actifs"],
            "temoins_differentiels": {"etabli": independance, "matrice_variantes_par_temoin": matrice},
            "corrige_accepte_temoins_et_actifs": corrige["actifs"]["etat"] == "accepté" and all(cas["etat"] == "accepté" for cas in corrige["temoins"]),
            "candidats": candidats,
        })
    return resultats


def main():
    banc.controler_enveloppe()
    banc.initialiser_nss()
    isolation = banc.verification_isolation()
    if not banc.runtime_disponible("powershell"):
        raise RuntimeError("PowerShell indisponible dans l'enveloppe")
    runtime = subprocess.run(
        ["/runtimes/powershell/pwsh", "-NoLogo", "-NoProfile", "-NonInteractive", "-Command", "$PSVersionTable.PSVersion.ToString()"],
        capture_output=True, text=True, timeout=20, check=True,
    )
    catalogue_avant, nombre_fichiers = empreinte_catalogue()
    definitions = json.loads((ROOT / "cas_admin_vm.json").read_text(encoding="utf-8"))["exercices"]
    catalogue = {exercice["id"]: exercice for exercice in banc.charger_catalogue() if exercice["id"].startswith("vm2-")}
    if len(definitions) != 18 or len(catalogue) != 18 or set(catalogue) != {definition["id"] for definition in definitions}:
        raise ValueError("les 18 fiches admin-vm ne correspondent pas aux définitions")
    paquets = [preparer_definition(catalogue[definition["id"]], definition) for definition in definitions]
    nombre_executions = lancer_executions(paquets)
    comparaisons = comparer(paquets)
    if comparaisons["max_tests"] != 7:
        raise ValueError("la limite du correcteur a changé")
    exercices = analyser(paquets, comparaisons)
    catalogue_apres, _ = empreinte_catalogue()
    if catalogue_avant != catalogue_apres:
        raise RuntimeError("catalogue modifié pendant le rejeu")
    tous = [candidat for exercice in exercices for candidat in exercice["candidats"]]
    variantes = [candidat for candidat in tous if candidat["nature"] == "variante"]
    alternatives = [candidat for candidat in tous if candidat["nature"] == "alternative_conforme"]
    non_evaluees = sum(cas["etat"] == "non évalué" for candidat in tous for cas in candidat["actifs"]["cas"] + candidat["temoins"] + candidat["cas_complementaires"] + candidat["cas_domaine"])
    bilan = {
        "fiches": len(exercices),
        "corriges_acceptes_actifs_et_temoins": sum(exercice["corrige_accepte_temoins_et_actifs"] for exercice in exercices),
        "paires_differentielles_etablies": sum(exercice["temoins_differentiels"]["etabli"] for exercice in exercices),
        "paires_deux_entrees_nouvelles": sum(exercice["nouveaute"]["etat"] == "deux entrées non retrouvées" for exercice in exercices),
        "domaines_finis_epuises": sum(exercice["nouveaute"]["etat"] == "impossible dans le domaine énoncé" for exercice in exercices),
        "variantes_principales": sum(not candidat["complementaire"] for candidat in variantes),
        "variantes_complementaires": sum(candidat["complementaire"] for candidat in variantes),
        "variantes_rejetees_actifs": sum(candidat["actifs"]["etat"] == "rejeté" for candidat in variantes),
        "variantes_acceptees_actifs": sum(candidat["actifs"]["etat"] == "accepté" for candidat in variantes),
        "variantes_non_evaluees_actifs": sum(candidat["actifs"]["etat"] == "non évalué" for candidat in variantes),
        "alternatives_conformes": len(alternatives),
        "alternatives_acceptent_tout_domaine": sum(bool(candidat["cas_domaine"]) and all(cas["etat"] == "accepté" for cas in candidat["cas_domaine"]) for candidat in alternatives),
        "alternatives_rejetees_actifs": sum(candidat["actifs"]["etat"] == "rejeté" for candidat in alternatives),
        "alternatives_acceptees_actifs": sum(candidat["actifs"]["etat"] == "accepté" for candidat in alternatives),
        "comparaisons_non_evaluees": non_evaluees,
        "executions_isolees": nombre_executions,
        "attendus_actifs_confirmes_par_oracle": sum(test["etat"] == "conforme" for exercice in exercices for test in exercice["oracle_tests_actifs"]),
        "attendus_actifs_hors_domaine_oracle": sum(test["etat"] != "conforme" for exercice in exercices for test in exercice["oracle_tests_actifs"]),
    }
    fichiers = ["banc.py", "rejouer.sh", "cas_admin_vm.json", "admin_vm.py", "sonde_admin_vm.py", "comparer_admin_vm.js", "rejouer_admin_vm.sh"]
    rapport = {
        "perimetre": "lot 1 partie 3 : admin-vm seulement",
        "runtime": {"version": runtime.stdout.strip(), "pwsh_sha256": banc.digest(Path("/runtimes/powershell/pwsh").read_bytes()), "node": isolation["node_actif"]},
        "isolation": isolation,
        "versions": {"catalogue_sha256": catalogue_avant, "catalogue_fichiers": nombre_fichiers,
                     "fichiers": {nom: banc.digest((ROOT / nom).read_bytes()) for nom in fichiers}},
        "bilan": bilan,
        "limites": [
            "L'indépendance différentielle concerne uniquement les deux variantes principales choisies, et non toutes les fautes possibles.",
            "La nouveauté compare les exemples et tests actifs et recherche quelques représentations littérales dans les sources détectées ; elle ne démontre ni secret ni nouveauté universelle.",
            "Cinq domaines admissibles sont finis et entièrement connus : leurs témoins sont réutilisés, non présentés comme inédits.",
            "Les témoins et l'oracle sont élaborés par le même intervenant à partir des énoncés : ce n'est pas une validation par un expert indépendant.",
            "Les candidats sont confinés par Bubblewrap sans réseau hôte, données du catalogue ou oracle ; sans cgroup ni seccomp dédié, ce n'est pas une isolation de production pour du code hostile.",
            "Les montages sont en lecture seule, mais le contrôle par empreinte avant/après n'est pas un instantané atomique en cas de modifications concurrentes.",
            "Aucun fournisseur distant n'est exécuté et ces résultats ne sont pas automatiquement intégrés au bilan global de généralisation.",
        ],
        "exercices": exercices,
    }
    print(json.dumps(rapport, ensure_ascii=False, indent=2))
    return 1 if non_evaluees or bilan["corriges_acceptes_actifs_et_temoins"] != 18 or bilan["paires_differentielles_etablies"] != 18 or bilan["alternatives_acceptent_tout_domaine"] != len(alternatives) else 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as erreur:
        print(json.dumps({"etat": "erreur_infrastructure", "raison": f"{type(erreur).__name__}: {erreur}"}, ensure_ascii=False))
        sys.exit(2)
