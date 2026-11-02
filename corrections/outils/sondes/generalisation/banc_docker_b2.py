import base64
import copy
import importlib.util
import json
import os
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


TRUSTED = Path("/trusted")
PROJECT = Path("/project")


def charger_module(nom, chemin):
    specification = importlib.util.spec_from_file_location(nom, chemin)
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


banc = charger_module("banc_generalisation", TRUSTED / "banc.py")
oracle = charger_module("oracle_docker_b2", TRUSTED / "docker_b2.py")
mutations = charger_module("mutants_docker_b2", TRUSTED / "mutants_docker_b2.py")


def date_utc():
    return datetime.now(timezone.utc).isoformat()


def normaliser_entree(entree):
    return " ".join(entree.replace("\r\n", "\n").replace("\r", "\n").split())


def extraire_catalogue():
    options = banc.base_bwrap() + [
        "--dir", "/project", "--dir", "/project/server",
        "--ro-bind", str(PROJECT / "server/exercises"), "/project/server/exercises",
        "--dir", "/project/tests",
        "--ro-bind", str(PROJECT / "tests/docker-lot1.test.js"), "/project/tests/docker-lot1.test.js",
        "--dir", "/adapter", "--ro-bind", str(TRUSTED / "export_docker_b2.js"), "/adapter/export.js",
    ]
    commande = banc.commande_bornee(options, ["/toolchain/node", "--max-old-space-size=256", "/adapter/export.js"], "javascript", export=True)
    resultat = banc.executer_commande(commande, "", timeout=45, max_output=8388608, inclure_stderr=True)
    if resultat["code"] != 0 or resultat["expiration"] or resultat["sortie_trop_longue"]:
        raise RuntimeError("extraction confinée impossible : " + resultat["stderr"][:500])
    return json.loads(resultat["stdout"])


def verifier_precedent(precedent, definitions, ancien_temoin, export):
    lignes = [ligne for ligne in precedent["exercices"] if ligne["course"] == "docker"]
    suspendus = {
        ligne["id"] for ligne in lignes
        if ligne["etat"] == "non évalué"
        and ligne["controles"]["programmes"]["etat"] == "non évalué"
        and ligne["controles"]["temoin_manuel"]["execute"] is True
        and ligne["controles"]["temoin_manuel"]["nombre"] == 1
    }
    if len(lignes) != 18 or len(suspendus) != 17 or suspendus != set(definitions):
        raise ValueError("périmètre des 17 suspendus différent du rapport précédent")
    if not export["suspension"]:
        raise ValueError("la suspension Docker n'est plus active")
    manuel = precedent["manuels"]
    transitions_revisees = {
        "server/exercises/docker.js": ("23d31c9836a49cfc07612579d83be05d943bdbd91f41510c4dea52c63bfd2c5a", "ac0ce74c55f2bb9b45eabec673dba8a7e9e1bfa628c43969da8722993a054112"),
        "tests/docker-lot1.test.js": ("9df374543d072970200d40f125ad2ee9ca43eb5c0824ea4b2e622dbcdc308561", "dc7949361c00516679012be8542471d03c4c03310f79647c36f9fa44ded9c126"),
    }
    for nom, (empreinte_precedente, empreinte_courante) in transitions_revisees.items():
        chemin = PROJECT / nom
        if manuel["sources_sha256"][nom] != empreinte_precedente or banc.digest(chemin.read_bytes()) != empreinte_courante:
            raise ValueError("transition de source non revue : " + nom)
    if banc.digest((TRUSTED / "ancien_temoin_docker.json").read_bytes()) != manuel["banc_sha256"]["fixtures/docker.json"]:
        raise ValueError("fixtures historiques différentes du rapport précédent")
    if len(ancien_temoin) != 18 or set(ancien_temoin) != {ligne["id"] for ligne in lignes}:
        raise ValueError("témoins précédents incomplets")
    ancien_nombre = sum(test["count"] for test in export["tests_generes"] if test["name"] != "dk2-c1-e2 : grands entiers décimaux exacts")
    precision = [test for test in export["tests_generes"] if test["name"] == "dk2-c1-e2 : grands entiers décimaux exacts"]
    if ancien_nombre != manuel["sources_tests_generes"]["docker"]["nombre"] or len(precision) != 1 or precision[0]["count"] != 38:
        raise ValueError("inventaire des entrées générées différent du rapport précédent")
    return suspendus


def verifier_attendus(definition):
    if len(definition["cas"]) != 2:
        raise ValueError("deux cas par exercice requis")
    for cas in definition["cas"]:
        if not cas.get("raison") or oracle.calculer(definition["oracle"], cas["entree"]) != cas["attendu"]:
            raise ValueError("attendu manuel non confirmé par l'oracle indépendant")


def verifier_nouveaute(exercice, definition, export, historique, autres_cas):
    source = banc.verifier_source(exercice, definition)
    banc.verifier_nouveaute(exercice, definition, source)
    normalises = {normaliser_entree(item["stdin"]) for item in historique}
    sources_tests = normaliser_entree(export["source_tests"])
    litteraux = {normaliser_entree(valeur) for valeur in export["litteraux_tests"]}
    solutions = [normaliser_entree(element["solution"]) for element in export["exercices"]]
    for cas in definition["cas"]:
        entree = cas["entree"]
        normalisee = normaliser_entree(entree)
        if not normalisee or normalisee in normalises:
            raise ValueError("entrée identique à une entrée historique Docker après normalisation")
        if sum(normaliser_entree(autre) == normalisee for autre in autres_cas) != 1:
            raise ValueError("collision entre les nouvelles entrées")
        representations = {
            entree.rstrip("\n"),
            json.dumps(entree.rstrip("\n"), ensure_ascii=False)[1:-1],
            json.dumps(entree.rstrip("\n"), ensure_ascii=True)[1:-1],
            base64.b64encode(entree.rstrip("\n").encode()).decode(),
        }
        if (normalisee in sources_tests or normalisee in litteraux or
                any(normalisee in solution for solution in solutions) or
                any(valeur and valeur in export["source_tests"] for valeur in representations)):
            raise ValueError("entrée littérale ou encodée déjà présente dans les sources Docker")


def comparer(exercice, cas, remplacement=None):
    try:
        resultat = banc.executer_solution(exercice, cas["entree"], replacement=remplacement)
    except Exception as erreur:
        return {"etat": "non évalué", "raison": type(erreur).__name__ + ": " + str(erreur)}
    if resultat["etat"] != "exécuté":
        return resultat
    sortie = banc.normaliser(resultat["sortie"])
    attendu = banc.normaliser(cas["attendu"])
    return {
        "etat": "conforme" if sortie == attendu else "différent",
        "code_sortie": 0,
        "sortie_normalisee": sortie,
        "sortie_brute_sha256": banc.digest(resultat["sortie"]),
        "attendu_normalise_sha256": banc.digest(attendu),
    }


def auditer(exercice, definition, export, historique, autres_cas):
    identifiant = exercice["id"]
    try:
        verifier_nouveaute(exercice, definition, export, historique, autres_cas)
        verifier_attendus(definition)
        variantes = mutations.construire(identifiant, exercice["solution"])
    except (ValueError, KeyError, TypeError, OSError) as erreur:
        return {"id": identifiant, "etat": "non évalué", "raison": str(erreur), "cas": [], "mutants": []}
    cas_resultats = []
    for numero, cas in enumerate(definition["cas"], 1):
        cas_resultats.append({
            "numero": numero,
            "entree": cas["entree"],
            "entree_sha256": banc.digest(cas["entree"]),
            "attendu": cas["attendu"],
            "raison": cas["raison"],
            "nouveaute_verifiee": True,
            "attendu_oracle_verifie": True,
            "corrige": comparer(exercice, cas),
        })
    mutants_resultats = []
    indices_corrige_conforme = {cas["numero"] for cas in cas_resultats if cas["corrige"]["etat"] == "conforme"}
    for numero, variante in enumerate(variantes, 1):
        comparaisons = [comparer(exercice, cas, variante["code"]) for cas in definition["cas"]]
        etats = [comparaison["etat"] for comparaison in comparaisons]
        temoins = [index for index, comparaison in enumerate(comparaisons, 1)
                   if index in indices_corrige_conforme and comparaison["etat"] == "différent"]
        if all(etat in {"conforme", "différent"} for etat in etats):
            verdict = "rejeté" if temoins else "survivant"
        else:
            verdict = "non évalué"
        mutants_resultats.append({
            "numero": numero,
            "description": variante["description"],
            "original": variante["original"],
            "remplacement": variante["remplacement"],
            "code_sha256": banc.digest(variante["code"]),
            "etat": verdict,
            "cas_rejet_sur_corrige_conforme": temoins,
            "cas": [{"numero": index, **comparaison} for index, comparaison in enumerate(comparaisons, 1)],
        })
    etats_corrige = [cas["corrige"]["etat"] for cas in cas_resultats]
    if "différent" in etats_corrige:
        etat = "échoué"
    elif "non évalué" in etats_corrige:
        etat = "non évalué"
    elif any(mutant["etat"] != "rejeté" for mutant in mutants_resultats):
        etat = "mutants insuffisamment rejetés"
    else:
        etat = "réussi"
    return {
        "id": identifiant,
        "etat": etat,
        "source": definition["source"],
        "oracle": definition["oracle"],
        "corrige_sha256": banc.digest(exercice["solution"]),
        "cas": cas_resultats,
        "mutants": mutants_resultats,
    }


def autocontroles(definitions, export, historique, autres_cas):
    identifiant = "dk2-c1-e2"
    exercice = next(element for element in export["exercices"] if element["id"] == identifiant)
    reference = definitions[identifiant]
    attendu_faux = copy.deepcopy(reference)
    attendu_faux["cas"][0]["attendu"] += " ERREUR"
    try:
        verifier_attendus(attendu_faux)
        attendu_rejete = False
    except ValueError:
        attendu_rejete = True
    try:
        oracle.calculer("oracle_absent", "entree")
        oracle_absent_rejete = False
    except ValueError:
        oracle_absent_rejete = True
    doublon = copy.deepcopy(reference)
    doublon["cas"][0]["entree"] = next(item["stdin"] for item in historique if item["id"] == identifiant and item["stdin"])
    try:
        verifier_nouveaute(exercice, doublon, export, historique, autres_cas)
        doublon_rejete = False
    except ValueError:
        doublon_rejete = True
    controles = {
        "attendu_errone_rejete": attendu_rejete,
        "oracle_absent_rejete": oracle_absent_rejete,
        "ancienne_entree_rejetee": doublon_rejete,
    }
    if not all(controles.values()):
        raise RuntimeError("autocontrôle du banc Docker non concluant")
    return controles


def main():
    debut = date_utc()
    banc.controler_enveloppe()
    banc.initialiser_nss()
    isolation = banc.verification_isolation()
    awk = banc.executer_commande(
        banc.commande_bornee(banc.base_bwrap(), ["/usr/bin/awk", "--version"], "shell"),
        "", timeout=5, inclure_stderr=True,
    )
    lignes_awk = (awk["stdout"] or awk["stderr"]).splitlines()
    version_awk = lignes_awk[0] if lignes_awk else "version non fournie"
    export = extraire_catalogue()
    precedent = json.loads((TRUSTED / "precedent.json").read_text(encoding="utf-8"))
    ancien_temoin = json.loads((TRUSTED / "ancien_temoin_docker.json").read_text(encoding="utf-8"))
    manifeste = json.loads((TRUSTED / "cas_docker_b2.json").read_text(encoding="utf-8"))
    definitions = {element["id"]: element for element in manifeste["exercices"]}
    if len(definitions) != len(manifeste["exercices"]) or set(definitions) != set(oracle.ORACLES) or set(definitions) != set(mutations.MUTATIONS):
        raise ValueError("inventaires des cas, oracles et mutations différents")
    suspendus = verifier_precedent(precedent, definitions, ancien_temoin, export)
    historique = list(export["historique"])
    historique.extend({"id": identifiant, "origin": "fixture_lot1_partie2", "index": 1, "stdin": fixture["stdin"]}
                      for identifiant, fixture in ancien_temoin.items())
    for precedent_exercice in precedent["programmes"]["exercices"]:
        if precedent_exercice.get("course") == "docker":
            historique.extend({"id": precedent_exercice["id"], "origin": "generalisation_precedente",
                               "index": numero, "stdin": cas["entree"]}
                              for numero, cas in enumerate(precedent_exercice.get("cas", []), 1))
    autres_cas = [cas["entree"] for definition in definitions.values() for cas in definition["cas"]]
    controles = autocontroles(definitions, export, historique, autres_cas)
    par_id = {element["id"]: element for element in export["exercices"]}
    resultats = [auditer(par_id[identifiant], definitions[identifiant], export, historique, autres_cas)
                 for identifiant in sorted(suspendus)]
    etats = Counter(resultat["etat"] for resultat in resultats)
    etats_mutants = Counter(mutant["etat"] for resultat in resultats for mutant in resultat["mutants"])
    etats_corriges = Counter(cas["corrige"]["etat"] for resultat in resultats for cas in resultat["cas"])
    reussi = len(resultats) == 17 and etats == {"réussi": 17} and etats_mutants == {"rejeté": 34} and etats_corriges == {"conforme": 34}
    sources = {
        "server/exercises/docker.js": PROJECT / "server/exercises/docker.js",
        "server/exercises/grading-policy.js": PROJECT / "server/exercises/grading-policy.js",
        "server/exercises/grading-evidence.json": PROJECT / "server/exercises/grading-evidence.json",
        "server/exercises/grading-runtime-evidence.json": PROJECT / "server/exercises/grading-runtime-evidence.json",
        "tests/docker-lot1.test.js": PROJECT / "tests/docker-lot1.test.js",
        "corrections/resultats/generalisation-lot1-partie2-complement.json": TRUSTED / "precedent.json",
        "corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/docker.json": TRUSTED / "ancien_temoin_docker.json",
    }
    for chemin in sorted(TRUSTED.glob("*.py")):
        sources["corrections/outils/sondes/generalisation/" + chemin.name] = chemin
    for nom in ("cas_docker_b2.json", "export_docker_b2.js", "verifier_docker_b2.js"):
        sources["corrections/outils/sondes/generalisation/" + nom] = TRUSTED / nom
    return {
        "schema": "revi-generalisation-docker-lot1-partie3-v1",
        "commence_utc": debut,
        "termine_utc": date_utc(),
        "head": os.environ.get("REVI_HEAD", "inconnu"),
        "etat": "réussi" if reussi else "incomplet ou défaut détecté",
        "code_sortie": 0 if reussi else 1,
        "perimetre": {"exercices": 17, "exclu_deja_evalue": "dk2-c1-e1", "suspension_docker_maintenue": export["suspension"]},
        "resume": {
            "etats_exercices": dict(etats),
            "cas_corriges": dict(etats_corriges),
            "mutants": dict(etats_mutants),
            "cas_nouveaux": sum(len(resultat["cas"]) for resultat in resultats),
            "executions_prevues": 102,
            "executions_terminees": sum(cas["corrige"]["etat"] in {"conforme", "différent"} for resultat in resultats for cas in resultat["cas"]) +
                                   sum(cas["etat"] in {"conforme", "différent"} for resultat in resultats for mutant in resultat["mutants"] for cas in mutant["cas"]),
        },
        "nouveaute": {
            "methode": "Égalité après normalisation des espaces, recherche littérale et encodée ; comparaison entre tous les nouveaux cas et aux sources Docker listées.",
            "entrees_historiques_comparees": len(historique),
            "tests_generes": export["tests_generes"],
            "profil_tests_sha256": export["profile"],
            "limite": "La nouveauté sémantique et les entrées situées hors des sources Docker recensées ne sont pas démontrées.",
        },
        "oracle": "Attendus manuels issus des énoncés, recoupés par un oracle Python séparé avant toute exécution de corrigé ; pas de calcul par les corrigés.",
        "comparaison": "Normalisation des fins de lignes et espaces finaux comme normalizeOutput ; code de sortie nul requis.",
        "isolation": isolation,
        "autocontroles": controles,
        "versions": {"node": export["node"], "python": sys.version.split()[0], "awk": version_awk,
                     "binaires_sha256": {nom: banc.digest(Path(chemin).read_bytes()) for nom, chemin in
                                         {"node": "/toolchain/node", "bash": "/bin/bash", "awk": "/usr/bin/awk", "bwrap": "/toolchain/bwrap"}.items()},
                     "sources_sha256": {nom: banc.digest(chemin.read_bytes()) for nom, chemin in sources.items()}},
        "limites": [
            "Deux cas par exercice et deux mutants ne prouvent pas la correction générale ni l'absence de mémorisation.",
            "Les mutants sont des substitutions ciblées du corrigé réel ; leur rejet exige au moins un cas où le corrigé est conforme, mais ils ne représentent pas toutes les erreurs d'élèves.",
            "Le banc teste les modèles des énoncés, pas un daemon Docker ni les comportements Docker réels.",
            "La suspension de la correction automatique n'est ni levée ni modifiée ; aucun fichier commun du banc n'est édité.",
        ],
        "exercices": resultats,
    }


if __name__ == "__main__":
    try:
        rapport = main()
        print(json.dumps(rapport, ensure_ascii=False, indent=2))
        sys.exit(rapport["code_sortie"])
    except Exception as erreur:
        print(json.dumps({"etat": "erreur_infrastructure", "raison": type(erreur).__name__ + ": " + str(erreur)}, ensure_ascii=False))
        sys.exit(2)
