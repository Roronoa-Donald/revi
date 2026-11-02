"""Oracles B1 Git fondés sur les contrats des fiches, pas sur leurs corrigés."""


def operations(entree, regles):
    lignes = entree.splitlines()
    if not lignes or not lignes[0].isdigit():
        raise ValueError("nombre d'opérations absent")
    nombre = int(lignes[0])
    if len(lignes) != nombre + 1:
        raise ValueError("nombre d'opérations incohérent")
    resultat = []
    for ligne in lignes[1:]:
        nom, separateur, argument = ligne.partition(" ")
        if nom not in regles or bool(separateur and argument) != regles[nom]:
            raise ValueError("opération ou argument invalide")
        resultat.append((nom, argument))
    return resultat


def journal(entree):
    depot = None
    identite = set()
    sortie = []
    for operation, argument in operations(entree, {"init": True, "config": True, "status": False}):
        if operation == "init":
            depot = argument
            sortie.append(f"dépôt {depot} créé")
        elif operation == "config":
            cle, separateur, valeur = argument.partition(" ")
            if not separateur or not valeur:
                raise ValueError("configuration incomplète")
            identite.add(cle)
        else:
            sortie.extend([f"dépôt : {depot or 'aucun'}", "config : " + (
                "ok" if {"user.name", "user.email"} <= identite else "manquant"
            )])
    return "\n".join(sortie)


def identite_commits(entree):
    identite = set()
    nombre = 0
    sortie = []
    for operation, argument in operations(entree, {"config": True, "commit": True}):
        if operation == "config":
            cle, separateur, valeur = argument.partition(" ")
            if not separateur or not valeur:
                raise ValueError("configuration incomplète")
            identite.add(cle)
        elif {"user.name", "user.email"} <= identite:
            nombre += 1
            sortie.append(f"[main {nombre:04d}] {argument}")
        else:
            sortie.append("erreur : identité manquante")
    return "\n".join(sortie)


def statut_fichiers(entree):
    connus = set()
    indexes = set()
    modifies = set()
    sortie = []
    for operation, argument in operations(entree, {"cree": True, "modifie": True, "add": True, "status": False}):
        if operation == "cree":
            connus.add(argument)
        elif operation == "modifie" and argument in indexes:
            modifies.add(argument)
        elif operation == "add" and argument in connus:
            indexes.add(argument)
            modifies.discard(argument)
        elif operation == "status":
            sortie.extend([f"non suivis : {len(connus - indexes)}", f"modifies : {len(modifies)}", f"indexes : {len(indexes)}"])
    return "\n".join(sortie)


def cycle_index(entree):
    index = set()
    total = 0
    sortie = []
    for operation, argument in operations(entree, {"add": True, "commit": False, "compte": False}):
        if operation == "add":
            if argument in index:
                raise ValueError("doublon d'add non tranché par cet oracle")
            index.add(argument)
        elif operation == "commit":
            total += len(index)
            index.clear()
        else:
            sortie.extend([f"index : {len(index)}", f"commits : {total}"])
    return "\n".join(sortie)


def reset_index(entree):
    index = []
    sortie = []
    for operation, argument in operations(entree, {"add": True, "reset": True, "index": False}):
        if operation == "add":
            if argument in index:
                raise ValueError("doublon d'add non tranché par cet oracle")
            index.append(argument)
        elif operation == "reset":
            if argument in index:
                index.remove(argument)
            else:
                sortie.append("non indexé")
        else:
            sortie.extend(index)
    return "\n".join(sortie)


def messages(entree):
    lignes = entree.splitlines()
    if not lignes or not lignes[0].isdigit() or len(lignes) != int(lignes[0]) + 1:
        raise ValueError("messages incomplets")
    sortie = []
    for message in lignes[1:]:
        if not message or not message[0].isupper():
            sortie.append("majuscule")
        elif len(message) > 50:
            sortie.append("longueur")
        elif message.endswith("."):
            sortie.append("point final")
        else:
            sortie.append("ok")
    return "\n".join(sortie)


def historique(entree, retour=False):
    regles = {"commit": True, "log": False}
    if retour:
        regles["revert"] = True
    commits = []
    sortie = []
    for operation, argument in operations(entree, regles):
        if operation == "commit":
            commits.append(argument)
        elif operation == "revert":
            if not argument.isdigit() or int(argument) < 1:
                raise ValueError("rang de revert non positif")
            rang = int(argument)
            if rang > len(commits):
                sortie.append("inaccessible")
            else:
                commits.append("Revert: " + commits[-rang])
        else:
            sortie.extend(f"a{numero} {commits[numero - 1]}" for numero in range(len(commits), 0, -1))
    return "\n".join(sortie)


def reset_commits(entree):
    nombre = 0
    index = False
    copie = False
    sortie = []
    for operation, argument in operations(entree, {"commit": False, "fichier": False, "reset": True, "etat": False}):
        if operation == "commit":
            nombre += 1
            index = False
            copie = False
        elif operation == "fichier":
            copie = True
        elif operation == "reset":
            morceaux = argument.split()
            if len(morceaux) != 2 or morceaux[0] not in {"soft", "mixed", "hard"} or not morceaux[1].isdigit():
                raise ValueError("reset invalide")
            mode, quantite = morceaux[0], int(morceaux[1])
            annules = min(nombre, quantite)
            nombre -= annules
            if mode == "soft":
                index = index or annules > 0
            elif mode == "mixed":
                copie = copie or index or annules > 0
                index = False
            else:
                index = False
                copie = False
        else:
            sortie.extend([f"commits : {nombre}", f"index : {'plein' if index else 'vide'}", f"copie : {'modifiée' if copie else 'propre'}"])
    return "\n".join(sortie)


def branches(entree):
    noms = ["main"]
    courante = "main"
    sortie = []
    for operation, argument in operations(entree, {"branch": True, "checkout": True, "branches": False}):
        if operation == "branch":
            if argument in noms:
                sortie.append("existe")
            else:
                noms.append(argument)
        elif operation == "checkout":
            if argument in noms:
                courante = argument
            else:
                sortie.append("inconnue")
        else:
            sortie.extend(("* " if nom == courante else "  ") + nom for nom in noms)
    return "\n".join(sortie)


def commits_par_branche(entree):
    comptes = {"main": 0}
    courante = "main"
    sequence = operations(entree, {"branch": True, "checkout": True, "commit": False, "bilan": False})
    for position, (operation, argument) in enumerate(sequence):
        if operation == "branch":
            if argument in comptes:
                raise ValueError("branche dupliquée non précisée")
            comptes[argument] = comptes[courante]
        elif operation == "checkout":
            if argument not in comptes:
                raise ValueError("checkout inconnu non précisé")
            courante = argument
        elif operation == "commit":
            comptes[courante] += 1
        elif position != len(sequence) - 1:
            raise ValueError("bilan intermédiaire non précisé")
    return "\n".join(f"{nom} : {compte}" for nom, compte in comptes.items())


def fusion(entree):
    historiques = {"main": []}
    courante = "main"
    compteur = 0
    nombre_fusions = 0
    sortie = []
    for operation, argument in operations(entree, {"branch": True, "checkout": True, "touch": True, "commit": False, "merge": True}):
        if operation == "branch":
            if argument in historiques or nombre_fusions:
                raise ValueError("branche ou historique après fusion non précisé")
            historiques[argument] = list(historiques[courante])
            courante = argument
        elif operation == "checkout":
            if argument not in historiques:
                raise ValueError("branche inconnue")
            courante = argument
        elif operation == "touch":
            compteur += 1
            historiques[courante].append((compteur, argument))
        elif operation == "merge":
            nombre_fusions += 1
            if nombre_fusions > 1 or argument not in historiques or argument == courante:
                raise ValueError("fusion répétée ou cible non précisée")
            gauche, droite = historiques[courante], historiques[argument]
            commun = 0
            while commun < min(len(gauche), len(droite)) and gauche[commun] == droite[commun]:
                commun += 1
            fichiers_gauche = {fichier for _, fichier in gauche[commun:]}
            fichiers_droite = {fichier for _, fichier in droite[commun:]}
            sortie.append("conflit" if fichiers_gauche & fichiers_droite else "fast-forward")
            if not fichiers_gauche & fichiers_droite:
                courante = argument
    return "\n".join(sortie)


def push(entree):
    local = 0
    distant = 0
    actualise = True
    sortie = []
    for operation, _ in operations(entree, {"commit": False, "tierce": False, "pull": False, "push": False, "distant": False}):
        if operation == "commit":
            local += 1
        elif operation == "tierce":
            distant += 1
            actualise = False
        elif operation == "pull":
            local = max(local, distant)
            actualise = True
        elif operation == "push":
            if actualise and local > distant:
                distant = local
            else:
                sortie.append("rejeté")
            sortie.extend([f"local : {local}", f"distant : {distant}"])
        else:
            sortie.extend([f"local : {local}", f"distant : {distant}"])
    return "\n".join(sortie)


def clone(entree):
    local = None
    distant = 0
    sortie = []
    for operation, argument in operations(entree, {"commit": True, "clone": False, "etat": False}):
        if operation == "commit":
            if not argument.isdigit() or int(argument) < 1:
                raise ValueError("nombre de commits tiers invalide")
            distant += int(argument)
        elif operation == "clone":
            if local is not None:
                raise ValueError("clone répété non précisé")
            local = distant
        else:
            sortie.extend([f"local : {'aucun' if local is None else local}", f"distant : {distant}"])
    return "\n".join(sortie)


def fetch(entree):
    local = 0
    suivi = 0
    distant = 0
    sortie = []
    for operation, argument in operations(entree, {"commit": False, "tierce": True, "fetch": False, "etat": False}):
        if operation == "commit":
            local += 1
        elif operation == "tierce":
            if argument != "main":
                raise ValueError("suivi multibranche non précisé")
            distant += 1
        elif operation == "fetch":
            suivi = distant
        else:
            sortie.extend([f"local : {local}", f"remote-suivi : {suivi}", f"distant : {distant}"])
    return "\n".join(sortie)


def stash(entree):
    copie = 0
    remises = []
    sortie = []
    for operation, _ in operations(entree, {"modifie": False, "stash": False, "pop": False, "etat": False}):
        if operation == "modifie":
            copie += 1
        elif operation == "stash":
            if copie == 0:
                raise ValueError("stash vide non nécessaire aux témoins")
            remises.append(copie)
            copie = 0
        elif operation == "pop":
            if remises:
                copie += remises.pop()
            else:
                sortie.append("rien à reprendre")
        else:
            sortie.extend([f"copie : {copie}", f"remises : {len(remises)}"])
    return "\n".join(sortie)


def ignore(entree):
    lignes = entree.splitlines()
    if not lignes or not lignes[0].isdigit():
        raise ValueError("nombre de motifs absent")
    nombre = int(lignes[0])
    if len(lignes) <= nombre + 1:
        raise ValueError("motifs incomplets")
    motifs = lignes[1:nombre + 1]
    index = []
    sortie = []
    for operation, argument in operations("\n".join(lignes[nombre + 1:]), {"add": True, "index": False}):
        if operation == "index":
            sortie.extend(index)
            continue
        filtre = any(
            argument.startswith(motif) if motif.endswith("/") else
            argument.endswith(motif[1:]) if motif.startswith("*.") else
            argument == motif
            for motif in motifs
        )
        if filtre:
            sortie.append("ignoré")
        else:
            index.append(argument)
    return "\n".join(sortie)


def archive(entree):
    lignes = entree.splitlines()
    if not lignes or not lignes[0].isdigit() or len(lignes) != int(lignes[0]) + 1 or int(lignes[0]) < 1:
        raise ValueError("archive vide ou nombre incohérent")
    fichiers = []
    for ligne in lignes[1:]:
        taille, separateur, nom = ligne.partition(" ")
        if not separateur or not nom or not taille.isdigit():
            raise ValueError("taille ou nom invalide")
        fichiers.append((nom, int(taille)))
    total = sum(taille for _, taille in fichiers)
    plus_gros = max(fichiers, key=lambda fichier: fichier[1])[0]
    moyenne = total // len(fichiers)
    sortie = [f"fichiers : {len(fichiers)}", f"taille : {total}", f"plus gros : {plus_gros}"]
    sortie.extend(nom for nom, taille in fichiers if taille > moyenne)
    return "\n".join(sortie)


ORACLES = {
    "gt-c1-e1": journal,
    "gt-c1-e2": identite_commits,
    "gt-c1-e3": statut_fichiers,
    "gt-c2-e1": cycle_index,
    "gt-c2-e2": reset_index,
    "gt-c2-e3": messages,
    "gt-c3-e1": historique,
    "gt-c3-e2": reset_commits,
    "gt-c3-e3": lambda entree: historique(entree, retour=True),
    "gt-c4-e1": branches,
    "gt-c4-e2": commits_par_branche,
    "gt-c4-e3": fusion,
    "gt-c5-e1": push,
    "gt-c5-e2": clone,
    "gt-c5-e3": fetch,
    "gt-c6-e1": stash,
    "gt-c6-e2": ignore,
    "gt-c6-e3": archive,
}


def calculer(identifiant, entree):
    if identifiant not in ORACLES:
        raise ValueError("oracle B1 Git inconnu")
    return ORACLES[identifiant](entree)
