import base64
import copy
import datetime
import importlib.util
import json
import os
import re
import sys
import tempfile
from collections import Counter
from pathlib import Path


ROOT = Path("/trusted")
HISTORIQUE = Path("/history")
SOURCE = Path("/project/server/exercises")
PROFIL_TESTS = "2a20c54a724e5bde1b44ba79e405a34e9e392df13479c67ea70592d249d3504a"


def charger_module(nom, chemin):
    specification = importlib.util.spec_from_file_location(nom, chemin)
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


banc = charger_module("banc_generalisation_existant", ROOT / "banc.py")
oracle = charger_module("oracle_b3_linux_independant", ROOT / "linux_b3.py")
banc.oracles_supplementaires["linux_b3.py"] = oracle


def json_fichier(chemin):
    return json.loads(chemin.read_text(encoding="utf-8"))


def empreinte_fichier(chemin):
    return banc.digest(chemin.read_bytes())


def espaces(texte):
    return " ".join(texte.replace("\r\n", "\n").replace("\r", "\n").split())


def sortie_stricte(texte):
    return texte.replace("\r\n", "\n").rstrip("\n")


def extraire_historique():
    script = r'''
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
const source = fs.readFileSync('/project/tests/b3-linux-lot1.test.js', 'utf8');
const declarations = [...source.matchAll(/\bconst\s+independent\s*=\s*\{/g)];
if (declarations.length !== 1) throw new Error('bloc de témoins ambigu');
const start = declarations[0].index;
const endMatch = /\n[ \t]*};[ \t]*(?:\n|$)/.exec(source.slice(start));
if (!endMatch) throw new Error('fin des témoins absente');
const end = start + endMatch.index + endMatch[0].length;
const profile = crypto.createHash('sha256').update(source.slice(0, start) + '\n<bloc_dynamique>\n' + source.slice(end)).digest('hex');
const witnesses = JSON.parse(new vm.Script(source.slice(start, end) + '\nJSON.stringify(independent);').runInNewContext(Object.create(null), {timeout: 2000}));
const literals = [];
const context = vm.createContext(Object.create(null));
const pattern = /'(?:\\[\s\S]|[^'\\\r\n])*'|"(?:\\[\s\S]|[^"\\\r\n])*"|`(?:\\[\s\S]|[^`\\])*`/g;
for (const match of source.matchAll(pattern)) {
  if (match[0][0] === '`' && match[0].includes('${')) continue;
  try {
    const value = new vm.Script(match[0]).runInContext(context, {timeout: 50});
    if (typeof value === 'string') literals.push(value);
  } catch {}
}
const archives = [];
for (let chapter = 1; chapter <= 6; chapter++) {
  const filename = `/project/server/exercises/b3-linux/chapitre${chapter}.js`;
  const entries = require(filename);
  if (!Array.isArray(entries)) throw new Error('ancien module invalide');
  for (const item of entries) archives.push({id: item.id, examples: item.examples, tests: item.tests, solution: item.solution, source: filename});
}
process.stdout.write(JSON.stringify({profile, witnesses, literals, archives}));
'''
    options = banc.base_bwrap() + [
        "--dir", "/project", "--dir", "/project/server",
        "--ro-bind", str(SOURCE), "/project/server/exercises",
        "--dir", "/project/tests",
        "--ro-bind", str(HISTORIQUE / "b3-linux-lot1.test.js"), "/project/tests/b3-linux-lot1.test.js",
    ]
    commande = banc.commande_bornee(options, ["/toolchain/node", "--max-old-space-size=128", "-e", script], "javascript", export=True)
    resultat = banc.executer_commande(commande, "", timeout=30, max_output=4 * 1024 * 1024, inclure_stderr=True)
    if resultat["code"] != 0 or resultat["expiration"] or resultat["sortie_trop_longue"]:
        raise RuntimeError("extraction isolée des anciens témoins impossible : " + resultat.get("stderr", "")[:1000])
    historique = json.loads(resultat["stdout"])
    if historique.get("profile") != PROFIL_TESTS:
        raise RuntimeError("profil des anciens tests modifié : nouveauté non démontrée")
    return historique


def controles_autonomes(exercice, definition):
    controles = {}
    invalide = copy.deepcopy(definition)
    invalide["cas"][0]["attendu"] += " attendu volontairement incorrect"
    try:
        banc.controler_attendus(invalide)
    except (ValueError, KeyError, TypeError):
        controles["attendu_errone_rejete"] = True
    else:
        controles["attendu_errone_rejete"] = False
    invalide = copy.deepcopy(definition)
    invalide["oracle"] = "oracle-inexistant"
    try:
        banc.controler_attendus(invalide)
    except (ValueError, KeyError, TypeError):
        controles["oracle_absent_rejete"] = True
    else:
        controles["oracle_absent_rejete"] = False
    invalide = copy.deepcopy(definition)
    invalide["cas"][0]["entree"] = exercice["examples"][0]["stdin"]
    try:
        banc.verifier_nouveaute(exercice, invalide, banc.verifier_source(exercice, definition))
    except ValueError:
        controles["exemple_existant_rejete"] = True
    else:
        controles["exemple_existant_rejete"] = False
    controles["comparaison_respecte_les_espaces_finaux"] = sortie_stricte("valeur \n") != sortie_stricte("valeur\n")
    return controles


def verifier_isolation_supplementaire():
    script = (
        "import json,os;"
        "print(json.dumps({'historique_absent':not os.path.exists('/history'),"
        "'projet_absent':not os.path.exists('/project'),"
        "'trusted_absent':not os.path.exists('/trusted'),"
        "'home_absent':not os.path.exists('/home') and 'HOME' not in os.environ}))"
    )
    commande = banc.commande_bornee(banc.base_bwrap(), ["/usr/bin/python3", "-I", "-c", script], "python")
    resultat = banc.executer_commande(commande, "", timeout=15)
    if resultat["code"] != 0 or resultat["expiration"] or resultat["sortie_trop_longue"]:
        raise RuntimeError("sonde d'isolation complémentaire impossible")
    controles = json.loads(resultat["stdout"])
    if not all(controles.values()):
        raise RuntimeError("isolation complémentaire non conforme")
    return controles


def preparer_anterieurs(catalogue, historique, fixture, ancien_rapport):
    connus = []

    def ajouter(identifiant, origine, entree):
        if not isinstance(entree, str) or not entree.strip():
            raise ValueError("entrée historique vide ou invalide")
        connus.append({"id": identifiant, "origine": origine, "entree": entree})

    exercices = [exercice for exercice in catalogue if exercice.get("course") == "b3-linux"]
    identifiants = {exercice["id"] for exercice in exercices}
    if len(exercices) != 18 or len(identifiants) != 18 or set(historique["witnesses"]) != identifiants or set(fixture) != identifiants:
        raise ValueError("inventaire des 18 fiches ou témoins incohérent")
    archives = historique["archives"]
    if len(archives) != 18 or {element["id"] for element in archives} != identifiants:
        raise ValueError("inventaire des six anciens modules incohérent")
    for exercice in exercices:
        for origine in ("examples", "tests"):
            for exemple in exercice[origine]:
                ajouter(exercice["id"], "catalogue_actif_" + origine, exemple["stdin"])
        ajouter(exercice["id"], "temoin_preexistant", historique["witnesses"][exercice["id"]]["stdin"])
        ajouter(exercice["id"], "fixture_manuelle_precedente", fixture[exercice["id"]]["stdin"])
    for exercice in archives:
        for origine in ("examples", "tests"):
            for exemple in exercice[origine]:
                ajouter(exercice["id"], "module_ancien_" + origine, exemple["stdin"])
    for definition in json_fichier(ROOT / "cas.json")["exercices"]:
        if str(definition.get("id", "")).startswith("lx3-"):
            for cas in definition["cas"]:
                ajouter(definition["id"], "cas_generalisation_precedent", cas["entree"])
    for exercice in ancien_rapport["programmes"]["exercices"]:
        if exercice.get("course") == "b3-linux":
            for cas in exercice.get("cas", []):
                if isinstance(cas.get("entree"), str) and cas["entree"].strip():
                    ajouter(exercice["id"], "rapport_generalisation_precedent", cas["entree"])
    return connus, exercices


def verifier_nouveaute_etendue(exercice, definition, anterieurs, textes, litteraux, nouvelles):
    source = banc.verifier_source(exercice, definition)
    banc.verifier_nouveaute(exercice, definition, source)
    indices = {}
    lignes_anciennes = set()
    for item in anterieurs:
        indices.setdefault(espaces(item["entree"]), []).append({"id": item["id"], "origine": item["origine"]})
        lignes_anciennes.update(espaces(ligne) for ligne in item["entree"].splitlines() if ligne.strip())
    litteraux_normalises = {espaces(texte) for texte in litteraux}
    resultats = []
    for numero, cas in enumerate(definition["cas"], 1):
        entree = cas["entree"]
        normalisee = espaces(entree)
        if not normalisee or normalisee in nouvelles:
            raise ValueError("entrée vide ou répétée parmi les nouvelles fixtures")
        collisions = indices.get(normalisee, [])
        if normalisee in litteraux_normalises:
            collisions = collisions + [{"origine": "litteral_ancien_test"}]
        tronquee = entree.replace("\r\n", "\n").replace("\r", "\n").rstrip("\n")
        variantes = {
            tronquee,
            json.dumps(tronquee, ensure_ascii=False)[1:-1],
            json.dumps(tronquee, ensure_ascii=True)[1:-1],
            base64.b64encode(tronquee.encode("utf-8")).decode("ascii"),
        }
        sources = sorted(nom for nom, contenu in textes.items() if any(variante and variante in contenu for variante in variantes))
        if collisions or sources:
            raise ValueError(f"entrée {numero} déjà présente dans des sources historiques : {collisions} {sources}")
        reprises = [ligne for ligne in entree.splitlines() if ligne.strip() and espaces(ligne) in lignes_anciennes]
        if reprises:
            raise ValueError(f"enregistrement antérieur réutilisé dans l'entrée {numero} : {reprises}")
        nouvelles.add(normalisee)
        resultats.append({
            "numero": numero,
            "valide": True,
            "entree_sha256": banc.digest(entree),
            "collision_entree_integrale": [],
            "entree_integrale_presente_dans_sources": [],
            "lignes_anciennes_reutilisees": reprises,
        })
    return resultats


def controles_nouveaute_etendue(exercice, definition, anterieurs, textes, litteraux):
    controles = {}

    def rejete(definition_test, textes_test):
        try:
            verifier_nouveaute_etendue(exercice, definition_test, anterieurs, textes_test, litteraux, set())
        except ValueError:
            return True
        return False

    temoin = next(item for item in anterieurs if item["id"] == exercice["id"] and item["origine"] == "fixture_manuelle_precedente")
    invalide = copy.deepcopy(definition)
    invalide["cas"][0]["entree"] = temoin["entree"]
    controles["fixture_precedente_rejetee"] = rejete(invalide, textes)

    invalide = copy.deepcopy(definition)
    ancien_enregistrement = exercice["examples"][0]["stdin"].splitlines()[0]
    invalide["cas"][0]["entree"] += ancien_enregistrement + "\n"
    controles["ancien_enregistrement_rejete"] = rejete(invalide, textes)

    invalide = copy.deepcopy(definition)
    invalide["cas"][1]["entree"] = invalide["cas"][0]["entree"]
    controles["paire_dupliquee_rejetee"] = rejete(invalide, textes)

    encodage = base64.b64encode(definition["cas"][0]["entree"].rstrip("\n").encode("utf-8")).decode("ascii")
    controles["entree_base64_dans_source_rejetee"] = rejete(definition, {**textes, "source_test_base64": encodage})
    return controles


def executer(programme, entree, attendu):
    with tempfile.TemporaryDirectory(prefix="b3-linux-candidat-") as dossier:
        fichier = Path(dossier) / "source"
        fichier.write_text(programme, encoding="utf-8")
        options = banc.options_solution("shell", fichier)
        commande = banc.commande_bornee(options, banc.commande_solution("shell"), "shell")
        resultat = banc.executer_commande(commande, entree, timeout=20, inclure_stderr=True)
    compare = sortie_stricte(resultat["stdout"])
    if resultat["expiration"] or resultat["sortie_trop_longue"] or resultat["code"] != 0:
        etat = "non évalué"
    else:
        etat = "réussi" if compare == sortie_stricte(attendu) else "échoué"
    return {
        "etat": etat,
        "code_sortie": resultat["code"],
        "expiration": resultat["expiration"],
        "sortie_trop_longue": resultat["sortie_trop_longue"],
        "stdout": resultat["stdout"],
        "stdout_sha256": banc.digest(resultat["stdout"]),
        "stderr_sha256": resultat["stderr_sha256"],
        "stderr_extrait": resultat["stderr"][:2000] if etat == "non évalué" else "",
    }


def etat_exercice(corriges, mutants):
    etats = [cas["execution"]["etat"] for cas in corriges]
    etats.extend(mutant["etat"] for mutant in mutants)
    if any(etat == "échoué" or etat == "survivant" for etat in etats):
        return "échoué"
    if len(corriges) != 2 or len(mutants) != 2 or any(etat not in {"réussi", "rejeté"} for etat in etats):
        return "non évalué"
    return "réussi"


def main():
    debut = datetime.datetime.now(datetime.timezone.utc).isoformat()
    banc.controler_enveloppe()
    banc.initialiser_nss()
    isolation = banc.verification_isolation()
    isolation.update(verifier_isolation_supplementaire())
    catalogue = banc.charger_catalogue()
    historique = extraire_historique()
    fixture = json_fichier(HISTORIQUE / "fixture-b3-linux.json")
    ancien_rapport = json_fichier(HISTORIQUE / "generalisation-lot1-partie2-complement.json")
    anterieurs, exercices = preparer_anterieurs(catalogue, historique, fixture, ancien_rapport)
    par_id = {exercice["id"]: exercice for exercice in exercices}
    archives_par_id = {exercice["id"]: exercice for exercice in historique["archives"]}
    suspendus = []
    for exercice in ancien_rapport["exercices"]:
        if exercice.get("course") != "b3-linux" or exercice.get("etat") != "non évalué":
            continue
        temoin = exercice.get("controles", {}).get("temoin_manuel", {})
        if temoin.get("nombre") != 1 or temoin.get("execute") is not True or temoin.get("nouveaute_litterale") is not True:
            raise RuntimeError("suspension sans témoin inédit unique démontré")
        suspendus.append(exercice["id"])
    definitions = json_fichier(ROOT / "cas_b3_linux.json")["exercices"]
    definitions_par_id = {definition["id"]: definition for definition in definitions}
    mutations = json_fichier(ROOT / "mutants_b3_linux.json")["exercices"]
    if len(suspendus) != 17 or len(set(suspendus)) != 17 or len(definitions) != 17 or len(definitions_par_id) != 17:
        raise RuntimeError("le périmètre ne contient pas exactement 17 fiches distinctes")
    if set(suspendus) != set(definitions_par_id) or set(suspendus) != set(mutations) or set(suspendus) != set(oracle.ORACLES):
        raise RuntimeError("désaccord entre suspensions, cas, mutants et oracles")
    textes = {
        "catalogue_actif": (SOURCE / "b3-linux.js").read_text(encoding="utf-8"),
        "anciens_tests": (HISTORIQUE / "b3-linux-lot1.test.js").read_text(encoding="utf-8"),
        "fixture_manuelle_precedente": (HISTORIQUE / "fixture-b3-linux.json").read_text(encoding="utf-8"),
        "cas_generalisation_precedent": (ROOT / "cas.json").read_text(encoding="utf-8"),
        "rapport_generalisation_precedent": (HISTORIQUE / "generalisation-lot1-partie2-complement.json").read_text(encoding="utf-8"),
    }
    for chapitre in range(1, 7):
        chemin = SOURCE / "b3-linux" / f"chapitre{chapitre}.js"
        textes[f"ancien_chapitre_{chapitre}"] = chemin.read_text(encoding="utf-8")
    nouvelles = set()
    resultats = []
    autocontroles = None
    for identifiant in suspendus:
        exercice = par_id[identifiant]
        definition = {**definitions_par_id[identifiant], "paquet_oracle": "linux_b3.py"}
        ligne = {"id": identifiant, "titre": exercice["title"], "etat_precedent": "non évalué", "corrige_sha256": banc.digest(exercice["solution"])}
        try:
            if exercice["language"] != "shell" or len(definition["cas"]) != 2 or len(mutations[identifiant]) != 2:
                raise ValueError("langage ou nombre de cas et de variantes incorrect")
            if definition["oracle"] != identifiant or definition["source"] != "b3-linux.js" or definition["codec"] != "lignes":
                raise ValueError("association au catalogue ou à l'oracle invalide")
            nouveaute = verifier_nouveaute_etendue(exercice, definition, anterieurs, textes, historique["literals"], nouvelles)
            banc.controler_attendus(definition)
            if autocontroles is None:
                autocontroles = controles_autonomes(exercice, definition)
                autocontroles.update(controles_nouveaute_etendue(exercice, definition, anterieurs, textes, historique["literals"]))
                if not all(autocontroles.values()):
                    raise ValueError("autocontrôle du banc non concluant")
            cas = []
            for numero, (donnee, constat) in enumerate(zip(definition["cas"], nouveaute), 1):
                cas.append({
                    "numero": numero,
                    "entree": donnee["entree"],
                    "attendu_manuel": donnee["attendu"],
                    "justification": donnee["justification"],
                    "attendu_oracle": oracle.calculer(identifiant, donnee["entree"]),
                    "nouveaute": constat,
                    "execution": executer(exercice["solution"], donnee["entree"], donnee["attendu"]),
                })
            variantes = []
            empreintes_mutants = set()
            for mutation in mutations[identifiant]:
                avant, apres = mutation["avant"], mutation["apres"]
                if not avant or avant == apres or exercice["solution"].count(avant) != 1:
                    raise ValueError("mutation ambiguë ou identique au corrigé")
                programme = exercice["solution"].replace(avant, apres, 1)
                empreinte = banc.digest(programme)
                if empreinte in empreintes_mutants or empreinte == ligne["corrige_sha256"]:
                    raise ValueError("variantes identiques")
                empreintes_mutants.add(empreinte)
                observations = [
                    {"cas": numero, **executer(programme, donnee["entree"], donnee["attendu"])}
                    for numero, donnee in enumerate(definition["cas"], 1)
                ]
                if any(observation["etat"] == "non évalué" for observation in observations):
                    etat = "non évalué"
                elif any(observation["etat"] == "échoué" for observation in observations):
                    etat = "rejeté"
                else:
                    etat = "survivant"
                variantes.append({**mutation, "programme_sha256": empreinte, "etat": etat, "executions": observations})
            ancienne_copie = archives_par_id[identifiant]
            execution_archive = executer(ancienne_copie["solution"], definition["cas"][0]["entree"], definition["cas"][0]["attendu"])
            ligne.update({
                "etat": etat_exercice(cas, variantes),
                "cas": cas,
                "mutants": variantes,
                "archive_hors_registre": {
                    "source": ancienne_copie["source"].replace("/project/", ""),
                    "programme_sha256": banc.digest(ancienne_copie["solution"]),
                    "cas": 1,
                    "execution": execution_archive,
                },
            })
        except (ValueError, KeyError, TypeError, OSError) as erreur:
            ligne.update({"etat": "non évalué", "raison": str(erreur), "cas": [], "mutants": []})
        resultats.append(ligne)
    if autocontroles is None or not all(autocontroles.values()):
        raise RuntimeError("aucun autocontrôle du banc n'a été validé")
    etats = Counter(ligne["etat"] for ligne in resultats)
    cas_corriges = [cas for ligne in resultats for cas in ligne["cas"]]
    mutants = [mutant for ligne in resultats for mutant in ligne["mutants"]]
    executions_mutants = [execution for mutant in mutants for execution in mutant["executions"]]
    executions_archives = [ligne["archive_hors_registre"]["execution"] for ligne in resultats if "archive_hors_registre" in ligne]
    reussi = len(cas_corriges) == 34 and len(mutants) == 34 and etats == {"réussi": 17}
    sources = {
        "server/exercises/b3-linux.js": empreinte_fichier(SOURCE / "b3-linux.js"),
        "tests/b3-linux-lot1.test.js": empreinte_fichier(HISTORIQUE / "b3-linux-lot1.test.js"),
        "fixtures/b3-linux.json": empreinte_fichier(HISTORIQUE / "fixture-b3-linux.json"),
        "generalisation-lot1-partie2-complement.json": empreinte_fichier(HISTORIQUE / "generalisation-lot1-partie2-complement.json"),
        "b3-linux/chapitres/chapitre2.html": empreinte_fichier(HISTORIQUE / "b3-linux-chapitre2.html"),
    }
    for nom in ("banc.py", "banc_b3_linux.py", "linux_b3.py", "cas_b3_linux.json", "mutants_b3_linux.json", "cas.json", "rejouer_b3_linux.sh"):
        sources["generalisation/" + nom] = empreinte_fichier(ROOT / nom)
    for chapitre in range(1, 7):
        nom = f"server/exercises/b3-linux/chapitre{chapitre}.js"
        sources[nom] = empreinte_fichier(SOURCE / "b3-linux" / f"chapitre{chapitre}.js")
    archives_memorisees = [item["id"] for item in historique["archives"] if 'case "$in_b64"' in item.get("solution", "")]
    formats_non_explicites = []
    for definition in definitions:
        exercice = par_id[definition["id"]]
        etiquette = definition["cas"][0]["entree"].split()[0]
        if not re.search(r"(?<![A-Za-z0-9_])" + re.escape(etiquette) + r"(?![A-Za-z0-9_])", exercice["brief"]):
            formats_non_explicites.append({
                "id": exercice["id"],
                "etiquette_absente_du_brief": etiquette,
                "presente_dans_exemple": etiquette in exercice["examples"][0]["stdin"],
            })
    journald = par_id["lx3-c2-e3"]["brief"]
    page_journald = (HISTORIQUE / "b3-linux-chapitre2.html").read_text(encoding="utf-8")
    rapport = {
        "schema": "generalisation-lot1-partie3-b3-linux-v1",
        "commence_utc": debut,
        "termine_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "head": os.environ.get("AUDIT_HEAD", "indisponible"),
        "perimetre": "17 exercices B3 Linux non évalués avec un témoin manuel inédit unique ; lx3-c1-e3 déjà évalué est exclu.",
        "code_sortie": 0 if reussi else 1,
        "isolation": isolation,
        "autocontroles": autocontroles,
        "historique": {
            "profil_tests": historique["profile"],
            "entrees_examinees": len(anterieurs),
            "par_origine": dict(Counter(item["origine"] for item in anterieurs)),
            "regle_nouveaute": "Entrées complètes et lignes individuelles comparées après normalisation des espaces ; recherche brute, échappée JSON et base64 dans les sources, et recherche parmi les littéraux des anciens tests.",
        },
        "constat_archives": {
            "fichier_actif": "server/exercises/b3-linux.js",
            "modules": 6,
            "corriges_avec_table_base64": len(archives_memorisees),
            "ids": archives_memorisees,
            "portee": "Les anciens modules de chapitre sont distincts du module résolu par le registre ; leur présence ne démontre pas leur utilisation par une autre voie.",
        },
        "constat_enonces": {
            "source": "server/exercises/b3-linux.js",
            "formats_entree_non_explicites_dans_brief": formats_non_explicites,
            "precision": "Les exemples affichés illustrent les formats ; cette observation ne signifie pas qu'aucune entrée ne soit montrée.",
            "journald": {
                "id": "lx3-c2-e3",
                "fragment_altere_present": "(stdin)..7&gt; unit=&lt;service&gt; msg=&lt;message&gt;</code>" in journald,
                "balises_code_ouvrantes": journald.count("<code>"),
                "balises_code_fermantes": journald.count("</code>"),
                "page_generee": "b3-linux/chapitres/chapitre2.html",
                "fragment_altere_dans_page": "(stdin)..7&gt; unit=&lt;service&gt; msg=&lt;message&gt;&lt;/code&gt;" in page_journald,
            },
        },
        "empreintes_sha256": sources,
        "resume": {
            "exercices": dict(etats),
            "corriges_executes": len(cas_corriges),
            "corriges_conformes": sum(cas["execution"]["etat"] == "réussi" for cas in cas_corriges),
            "mutants_construits": len(mutants),
            "mutants_rejetes": sum(mutant["etat"] == "rejeté" for mutant in mutants),
            "mutants_survivants": sum(mutant["etat"] == "survivant" for mutant in mutants),
            "mutants_non_evalues": sum(mutant["etat"] == "non évalué" for mutant in mutants),
            "executions_mutants": len(executions_mutants),
            "executions_mutants_code_zero": sum(execution["code_sortie"] == 0 and not execution["expiration"] and not execution["sortie_trop_longue"] for execution in executions_mutants),
            "archives_executees": len(executions_archives),
            "archives_sortie_incorrecte": sum(execution["etat"] == "échoué" for execution in executions_archives),
            "archives_non_evaluees": sum(execution["etat"] == "non évalué" for execution in executions_archives),
            "archives_sortie_vide_code_zero": sum(execution["etat"] == "échoué" and execution["code_sortie"] == 0 and execution["stdout"] == "" for execution in executions_archives),
        },
        "limites": [
            "La nouveauté établie est littérale selon les sources inventoriées, pas une preuve d'absence d'équivalence sémantique ni de cas antérieur dans un autre fichier.",
            "Deux entrées et deux mutants par fiche ne démontrent pas une correction universelle ; les mutants sont construits à partir des vrais corrigés et ne constituent pas des implémentations indépendantes.",
            "Les attendus manuels et l'oracle sont déduits des mêmes énoncés ; ils peuvent partager une erreur d'interprétation.",
            "La sonde NSS utilise files, dns et mdns ; le routage teste l'égalité de priorité selon l'ordre d'entrée ; le simulateur systemd ne vérifie que les auto-cycles et les cycles directs.",
            "Les cas réseau ne tranchent pas la priorité d'erreurs simultanées, non explicitée dans l'énoncé ; les cas PAM ne concluent pas sur toutes les piles sans succès.",
            "Chaque programme et chaque cas disposent d'un bubblewrap distinct sans réseau, HOME, dépôt, catalogue ni oracle ; les limites prlimit ne remplacent pas un cgroup ou un profil seccomp pour du code hostile.",
            "Les sources sont copiées puis comparées avant et après le lancement ; la copie de plusieurs fichiers n'est pas un instantané atomique.",
            "Le banc spécifique ne modifie ni le rapport agrégé existant ni la suspension de la correction automatique.",
        ],
        "exercices": resultats,
    }
    print(json.dumps(rapport, ensure_ascii=False, indent=2))
    return rapport["code_sortie"]


if __name__ == "__main__":
    sys.exit(main())
