import re
from decimal import Decimal


def lignes(entree):
    return [ligne.strip() for ligne in entree.splitlines() if ligne.strip()]


def ressources(entree):
    donnees = entree.splitlines()
    if len(donnees) != 2 or len(donnees[0].split()) != 3 or len(donnees[1].split()) != 2:
        raise ValueError("trois entiers puis deux entiers requis")
    valeurs = [int(valeur) for ligne in donnees for valeur in ligne.split()]
    if min(valeurs) < 0:
        raise ValueError("entiers positifs ou nuls requis")
    instances, app_disque, app_ram, invite_disque, invite_ram = valeurs
    vm_disque = instances * (app_disque + invite_disque)
    vm_ram = instances * (app_ram + invite_ram)
    docker_disque = instances * app_disque
    docker_ram = instances * app_ram
    return "\n".join([
        f"ARCHITECTURE VM: Disque {vm_disque} Mo | RAM {vm_ram} Mo",
        f"ARCHITECTURE DOCKER: Disque {docker_disque} Mo | RAM {docker_ram} Mo",
        f"ECONOMIE DOCKER: Disque -{vm_disque - docker_disque} Mo | RAM -{vm_ram - docker_ram} Mo",
    ])


def composants(entree):
    catalogue = {
        "CLI": "docker (client) | Interprete les commandes utilisateur et communique via l'API REST (socket UNIX)",
        "DOCKERD": "dockerd (daemon) | Gestionnaire haut niveau des images, volumes, reseaux et authentification",
        "CONTAINERD": "containerd | Superviseur de conteneurs (cycle de vie, distribution d'images et snapshots)",
        "SHIM": "containerd-shim | Processus leger maintenant les E/S et l'etat sans dependre du daemon",
        "RUNC": "runc (OCI runtime) | Cree les namespaces et cgroups, puis execute le binaire conteneurise",
    }
    return "\n".join(f"{ligne} -> {catalogue.get(ligne, 'INCONNU')}" for ligne in lignes(entree))


def couches(entree):
    couches_uniques = {}
    sorties = []
    total_brut = 0
    for ligne in lignes(entree):
        image, separateur, description = ligne.partition(":")
        if not separateur or not image.strip():
            raise ValueError("image invalide")
        taille_image = 0
        for couche in description.split(","):
            identifiant, separateur, taille = couche.strip().partition(":")
            if not separateur or not identifiant or not taille.strip().isdigit():
                raise ValueError("couche invalide")
            taille = int(taille)
            if identifiant in couches_uniques and couches_uniques[identifiant] != taille:
                raise ValueError("taille incohérente pour une couche")
            couches_uniques[identifiant] = taille
            taille_image += taille
        total_brut += taille_image
        sorties.append(f"IMAGE: {image.strip()} -> TAILLE_APPARENTE: {taille_image} Mo")
    total_reel = sum(couches_uniques.values())
    sorties.append(f"TOTAL_BRUT: {total_brut} Mo | TOTAL_REEL: {total_reel} Mo | ECONOMIE_DEDUPLICATION: -{total_brut - total_reel} Mo")
    return "\n".join(sorties)


def references(entree):
    sorties = []
    for reference in lignes(entree):
        chemin, separateur, digest = reference.partition("@")
        if separateur and not digest.startswith("sha256:"):
            raise ValueError("digest non pris en charge")
        dernier = chemin.rsplit("/", 1)[-1]
        tag = dernier.rsplit(":", 1)[1] if ":" in dernier else "latest"
        if ":" in dernier:
            chemin = chemin[:-(len(tag) + 1)]
        segments = chemin.split("/")
        premier = segments[0]
        if len(segments) > 1 and ("." in premier or ":" in premier or premier == "localhost"):
            registre, nom = premier, "/".join(segments[1:])
        elif len(segments) == 1:
            registre, nom = "docker.io/library", chemin
        else:
            registre, nom = "docker.io", chemin
        sorties.append(f"REF: {reference} -> REGISTRE: {registre} | IMAGE: {nom} | TAG: {tag} | DIGEST: {digest if separateur else 'NONE'}")
    return "\n".join(sorties)


def copy_on_write(entree):
    donnees = entree.split("\n")
    image = {chemin.strip() for chemin in donnees[0].split(",") if chemin.strip()}
    couche = set()
    masques = set()
    sorties = []
    for ligne in donnees[1:]:
        if not ligne.strip():
            continue
        action, chemin = ligne.split()
        present = chemin in couche or (chemin in image and chemin not in masques)
        if action == "READ":
            resultat = ("ACCES: Container Layer (Version modifiee)" if chemin in couche else
                        "ACCES: Image Layer (Lecture directe RO sans duplication)" if present else
                        "ERREUR: Fichier introuvable (404 ENOENT)")
        elif action == "WRITE":
            if chemin in couche:
                resultat = "MECANISME: Ecriture directe dans Container Layer"
            elif present:
                couche.add(chemin)
                resultat = "MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)"
            else:
                resultat = "ERREUR: Fichier introuvable pour modification"
        elif action == "CREATE" and not present:
            couche.add(chemin)
            masques.discard(chemin)
            resultat = "MECANISME: Creation directe dans Container Layer"
        elif action == "DELETE" and present:
            couche.discard(chemin)
            if chemin in image:
                masques.add(chemin)
                resultat = "MECANISME: Whiteout (Creation d'un fichier masque dans Container Layer sans toucher a l'image RO)"
            else:
                resultat = "MECANISME: Suppression directe de Container Layer"
        else:
            raise ValueError("opération hors du domaine défini")
        sorties.append(f"{action} {chemin} -> {resultat}")
    return "\n".join(sorties)


def audit_dockerfile(entree):
    instructions = []
    accumulation = ""
    numero_debut = None
    for numero, ligne in enumerate(entree.splitlines(), 1):
        ligne = ligne.strip()
        if not ligne or ligne.startswith("#"):
            continue
        if numero_debut is None:
            numero_debut = numero
        suite = ligne.endswith("\\")
        accumulation += " " + (ligne[:-1].rstrip() if suite else ligne)
        if not suite:
            instructions.append((numero_debut, accumulation.strip()))
            accumulation, numero_debut = "", None
    if accumulation:
        raise ValueError("instruction Dockerfile inachevée")
    noms = [instruction.split(maxsplit=1)[0].upper() for _, instruction in instructions]
    if not noms or noms[0] not in {"ARG", "FROM"} or "FROM" not in noms:
        return "ERREUR_CRITIQUE: Dockerfile doit debuter par FROM"
    sorties = []
    for numero, instruction in instructions:
        mot, _, arguments = instruction.partition(" ")
        if mot.upper() == "ADD" and arguments:
            source = arguments.split()[0]
            if not source.lower().startswith(("http://", "https://")) and not re.search(r"\.(?:tar|gz|zip)(?:$|\.)", source, re.I):
                sorties.append(f"AVERTISSEMENT [Ligne {numero}]: Preferer COPY a ADD pour les fichiers locaux")
        if mot.upper() == "RUN" and re.search(r"\bapt-get\s+update\b", arguments) and not re.search(r"\bapt-get\s+install\b", arguments):
            sorties.append(f"AVERTISSEMENT [Ligne {numero}]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)")
    if not sorties:
        return "AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)"
    sorties.append(f"AUDIT_DOCKERFILE: NON_CONFORME ({len(sorties)} avertissement(s))")
    return "\n".join(sorties)


def commande_finale(entree):
    donnees = {}
    for ligne in lignes(entree):
        nom, separateur, valeur = ligne.partition(":")
        if not separateur or nom not in {"ENTRYPOINT", "CMD", "CLI_ARGS"} or nom in donnees:
            raise ValueError("liste de commande invalide")
        donnees[nom] = [] if valeur.strip() == "NONE" else [argument.strip() for argument in valeur.split(",")]
    if set(donnees) != {"ENTRYPOINT", "CMD", "CLI_ARGS"}:
        raise ValueError("trois listes requises")
    resultat = donnees["ENTRYPOINT"] + (donnees["CLI_ARGS"] or donnees["CMD"])
    return "COMMANDE_FINALE:" + (" " + " ".join(resultat) if resultat else "")


def multistage(entree):
    donnees = lignes(entree)
    if len(donnees) != 3:
        raise ValueError("trois lignes requises")
    mono = re.fullmatch(r"MONOLITHIC:\s+\S+\s+(\d+)\s*\+\s*(\d+)\s*\+\s*(\d+)\s*\+\s*(\d+)", donnees[0])
    build = re.fullmatch(r"STAGE_BUILD:\s+\S+\s+(\d+)\s*->\s*EXPORT:\s*(\d+)", donnees[1])
    final = re.fullmatch(r"STAGE_FINAL:\s+\S+\s+(\d+)\s*\+\s*IMPORT:\s*(\d+)", donnees[2])
    if not (mono and build and final):
        raise ValueError("format multistage invalide")
    total = sum(int(valeur) for valeur in mono.groups())
    taille_finale = int(final[1]) + int(final[2])
    if total <= 0 or taille_finale > total or int(build[2]) != int(final[2]) or int(mono[4]) != int(final[2]):
        raise ValueError("tailles multistage hors domaine")
    gain = total - taille_finale
    pourcentage = Decimal(gain) * 100 / Decimal(total)
    return "\n".join([
        f"IMAGE_MONOLITHIQUE: {total} Mo",
        f"IMAGE_MULTI_STAGE: {taille_finale} Mo",
        f"GAIN_SECURITE_ET_TAILLE: -{gain} Mo ({pourcentage:.1f}% economises)",
    ])


def cycle_conteneur(entree):
    transitions = {
        "ABSENT": {"create": "CREATED", "run": "RUNNING"},
        "CREATED": {"start": "RUNNING", "rm": "ABSENT"},
        "RUNNING": {"pause": "PAUSED", "stop": "STOPPED", "restart": "RUNNING", "kill": "STOPPED"},
        "PAUSED": {"unpause": "RUNNING"},
        "STOPPED": {"start": "RUNNING", "rm": "ABSENT"},
    }
    etat = "ABSENT"
    sorties = []
    for commande in lignes(entree):
        if commande in transitions[etat]:
            etat = transitions[etat][commande]
            sorties.append(f"{commande} -> NOUVEL_ETAT: {etat}")
        elif commande == "rm" and etat in {"RUNNING", "PAUSED"}:
            sorties.append(f"TRANSITION_INVALIDE: Impossible de supprimer un conteneur actif sans --force (Etat: {etat})")
        else:
            sorties.append(f"TRANSITION_INVALIDE: Action {commande} impossible depuis l'etat {etat}")
    return "\n".join(sorties)


def publications(entree):
    reservations = []
    sorties = []
    for ligne in lignes(entree):
        conteneur, publication = ligne.split()
        elements = publication.split(":")
        if len(elements) == 2:
            adresse, port, destination = "0.0.0.0", elements[0], elements[1]
        elif len(elements) == 3:
            adresse, port, destination = elements
        else:
            raise ValueError("publication invalide")
        if not (1 <= int(port) <= 65535 and 1 <= int(destination) <= 65535):
            raise ValueError("port hors limites")
        conflit = next((precedent for ip, numero, precedent in reservations
                        if numero == int(port) and (ip == adresse or ip == "0.0.0.0" or adresse == "0.0.0.0")), None)
        if conflit is None:
            reservations.append((adresse, int(port), conteneur))
            sorties.append(f"PUBLICATION: {conteneur} -> NAT: {adresse}:{port} => {destination}/tcp (SUCCES)")
        else:
            sorties.append(f"CONFLIT_PORT: {conteneur} -> Port hote {port} deja reserve par {conflit} (ECHEC)")
    return "\n".join(sorties)


def montages(entree):
    sorties = []
    for ligne in lignes(entree):
        readonly = False
        if ligne.startswith("--tmpfs "):
            genre = "tmpfs"
        elif ligne.startswith("-v "):
            elements = ligne[3:].split(":")
            if len(elements) not in {2, 3}:
                raise ValueError("volume invalide")
            genre = "bind" if elements[0].startswith(("/", "./", "../")) else "volume"
            readonly = len(elements) == 3 and "ro" in elements[2].split(",")
        elif ligne.startswith("--mount "):
            champs = ligne[8:].split(",")
            attributs = dict(champ.split("=", 1) for champ in champs if "=" in champ)
            genre = attributs.get("type")
            readonly = "readonly" in champs
        else:
            raise ValueError("montage non pris en charge")
        if genre == "tmpfs":
            detail = "TMPFS | Memoire vive RAM de l'hote | VOLATILE (detruit a l'arret du conteneur) | LECTURE_ECRITURE"
        elif genre in {"bind", "volume"}:
            type_montage = "BIND_MOUNT" if genre == "bind" else "VOLUME_NOMME"
            emplacement = "Repertoire specifique de la machine hote" if genre == "bind" else "Espace reserve du daemon (/var/lib/docker/volumes/)"
            droits = "LECTURE_SEULE" if readonly else "LECTURE_ECRITURE"
            detail = f"{type_montage} | {emplacement} | PERSISTANT (survit a docker rm) | {droits}"
        else:
            raise ValueError("type de montage inconnu")
        sorties.append(f"STOCKAGE: {ligne} -> TYPE: {detail}")
    return "\n".join(sorties)


def services(entree):
    sorties = []
    for ligne in lignes(entree):
        champs = {}
        for element in ligne.split("|"):
            cle, separateur, valeur = element.strip().partition(":")
            if not separateur:
                raise ValueError("champ Compose invalide")
            champs[cle.strip()] = valeur.strip()
        nom = champs.get("service", "")
        if not nom:
            raise ValueError("nom de service absent")
        image, build = champs.get("image", ""), champs.get("build", "")
        if not image and not build:
            sorties.append(f"SERVICE: {nom} -> INVALIDE (Directive image ou build obligatoire)")
            continue
        origine = f"image:{image}" if image else f"build:{build}"
        restart = champs.get("restart", "no")
        if restart not in {"no", "always", "unless-stopped", "on-failure"}:
            restart = "no"
        sorties.append(f"SERVICE: {nom} -> VALIDE [Origine: {origine} | Ports: {champs.get('ports') or 'aucun'} | Restart: {restart}]")
    return "\n".join(sorties)


def dependances(entree):
    graphe = {}
    for ligne in lignes(entree):
        service, separateur, dependances_ligne = ligne.partition("->")
        if not separateur or not service.strip():
            raise ValueError("dépendance invalide")
        service, dependances_ligne = service.strip(), dependances_ligne.strip()
        graphe.setdefault(service, set())
        if dependances_ligne != "NONE":
            for dependance in dependances_ligne.split(","):
                dependance = dependance.strip()
                if not dependance:
                    raise ValueError("dépendance vide")
                graphe[service].add(dependance)
                graphe.setdefault(dependance, set())
    ordre = []
    while graphe:
        disponibles = sorted(service for service, requis in graphe.items() if not requis)
        if not disponibles:
            return "ERREUR_COMPOSE: Dependance cyclique detectee"
        service = disponibles[0]
        ordre.append(service)
        del graphe[service]
        for requis in graphe.values():
            requis.discard(service)
    return "ORDRE_DEMARRAGE:" + (" " + " -> ".join(ordre) if ordre else "")


def interpolation(entree):
    donnees = entree.splitlines()
    if "---" not in donnees:
        raise ValueError("séparateur absent")
    separation = donnees.index("---")
    variables = {}
    for ligne in donnees[:separation]:
        nom, separateur, valeur = ligne.partition("=")
        if not separateur or not re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", nom):
            raise ValueError("affectation invalide")
        variables[nom] = valeur
    motif = re.compile(r"\$\{([A-Za-z_][A-Za-z0-9_]*)(?::-([^{}]*))?\}")

    def remplacer(correspondance):
        valeur = variables.get(correspondance[1], "")
        return valeur if valeur or correspondance[2] is None else correspondance[2]

    return "\n".join(f"RESOLU: {motif.sub(remplacer, ligne)}" for ligne in donnees[separation + 1:])


def utilisateur(entree):
    actif = None
    for ligne in lignes(entree):
        correspondance = re.fullmatch(r"USER\s+(\S+)", ligne, flags=re.I)
        if correspondance:
            actif = correspondance[1]
    utilisateur_actif = actif.split(":", 1)[0] if actif is not None else "root"
    if utilisateur_actif == "root" or (utilisateur_actif.isdigit() and int(utilisateur_actif) == 0):
        return "AUDIT_SECURITE: CRITIQUE (Le conteneur s'execute avec les privileges root - UID 0)"
    return f"AUDIT_SECURITE: CONFORME (Execution sous utilisateur non-privilegie: {actif})"


def quotas(entree):
    def memoire(valeur):
        correspondance = re.fullmatch(r"(\d+)([mg])", valeur)
        if not correspondance:
            raise ValueError("unité mémoire invalide")
        return int(correspondance[1]) * (1024 if correspondance[2] == "g" else 1)

    sorties = []
    for ligne in lignes(entree):
        champs = dict(element.split("=", 1) for element in ligne.split())
        if set(champs) != {"MEM", "SWAP", "CPUS"}:
            raise ValueError("limites incomplètes")
        ram = memoire(champs["MEM"])
        swap = max(0, memoire(champs["SWAP"]) - ram)
        coeurs = Decimal(champs["CPUS"])
        if coeurs < 0:
            raise ValueError("CPU négatif")
        quota = int(coeurs * 100000)
        sorties.append(f"CGROUPS: RAM: {ram} Mo | SWAP_ADDITIONNEL: {swap} Mo | CPU_QUOTA: {quota} us / 100000 us ({champs['CPUS']} cœurs)")
    return "\n".join(sorties)


def redemarrages(entree):
    sorties = []
    for ligne in lignes(entree):
        champs = dict(element.split("=", 1) for element in ligne.split())
        politique, code, manuel = champs["POLITIQUE"], int(champs["EXIT_CODE"]), champs["MANUEL"]
        if code < 0 or manuel not in {"OUI", "NON"} or politique not in {"no", "always", "unless-stopped", "on-failure"}:
            raise ValueError("événement hors domaine")
        if manuel == "OUI":
            decision = "ARRET_DEFINITIF (Arret volontaire par l'administrateur)"
        elif politique == "no":
            decision = 'ARRET_DEFINITIF (Politique "no")'
        elif politique in {"always", "unless-stopped"}:
            decision = "REDEMARRER (Relance automatique du conteneur)"
        elif code == 0:
            decision = "ARRET_DEFINITIF (Code sortie normal 0)"
        else:
            decision = f"REDEMARRER (Echec detecte: code {code})"
        sorties.append(f"EVENEMENT: {ligne} -> DECISION: {decision}")
    return "\n".join(sorties)


ORACLES = {
    "dk2-c1-e2": ressources,
    "dk2-c1-e3": composants,
    "dk2-c2-e1": couches,
    "dk2-c2-e2": references,
    "dk2-c2-e3": copy_on_write,
    "dk2-c3-e1": audit_dockerfile,
    "dk2-c3-e2": commande_finale,
    "dk2-c3-e3": multistage,
    "dk2-c4-e1": cycle_conteneur,
    "dk2-c4-e2": publications,
    "dk2-c4-e3": montages,
    "dk2-c5-e1": services,
    "dk2-c5-e2": dependances,
    "dk2-c5-e3": interpolation,
    "dk2-c6-e1": utilisateur,
    "dk2-c6-e2": quotas,
    "dk2-c6-e3": redemarrages,
}


def calculer(nom, entree):
    if nom not in ORACLES:
        raise ValueError("oracle Docker inconnu")
    return ORACLES[nom](entree)
