MUTATIONS = {
    "dk2-c1-e2": [
        ("ne pas multiplier la RAM invitée", 'guest_ram = multiply_decimal(instances, $2)', 'guest_ram = normalize_decimal($2)'),
        ("oublier les instances du disque applicatif", 'docker_disk = multiply_decimal(instances, app_disk)', 'docker_disk = normalize_decimal(app_disk)'),
    ],
    "dk2-c1-e3": [
        ("confondre containerd et le démon", 'component["CONTAINERD"] = "containerd"', 'component["CONTAINERD"] = "dockerd (daemon)"'),
        ("attribuer à runc la gestion des volumes", 'role["RUNC"] = "Cree les namespaces et cgroups, puis execute le binaire conteneurise"', 'role["RUNC"] = "Gestionnaire des volumes"'),
    ],
    "dk2-c2-e1": [
        ("compter les couches uniques au lieu de leur taille", 'real += size', 'real += 1'),
        ("perdre les tailles brutes précédentes", 'total += apparent', 'total = apparent'),
    ],
    "dk2-c2-e2": [
        ("ne pas conserver le digest fourni", 'digest = substr(name, at + 1)', 'digest = "NONE"'),
        ("oublier library pour les images officielles", 'if (count == 1) registry = "docker.io/library"', 'if (count == 1) registry = "docker.io"'),
    ],
    "dk2-c2-e3": [
        ("oublier la copie après une première écriture", 'result = "MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)"\n      active[file] = 1', 'result = "MECANISME: Copy-On-Write (Copie du fichier vers la Container Layer puis ecriture)"\n      active[file] = 0'),
        ("assimiler toute suppression active à un whiteout", 'if (image[file]) {', 'if (active[file]) {'),
    ],
    "dk2-c3-e1": [
        ("ignorer les continuations Dockerfile", r'continued = sub(/\\[[:space:]]*$/, "", line)', 'continued = 0'),
        ("appliquer la règle ADD à COPY", 'if (command == "ADD") {', 'if (command == "COPY") {'),
    ],
    "dk2-c3-e2": [
        ("omettre ENTRYPOINT", 'result = values["ENTRYPOINT"]', 'result = ""'),
        ("perdre CMD lorsque CLI_ARGS est absent", 'suffix = values["CLI_ARGS"] != "" ? values["CLI_ARGS"] : values["CMD"]', 'suffix = values["CLI_ARGS"] != "" ? values["CLI_ARGS"] : ""'),
    ],
    "dk2-c3-e3": [
        ("écraser au lieu de sommer les couches monolithiques", 'monolithic += fields[index_field] + 0', 'monolithic = fields[index_field] + 0'),
        ("confondre la réduction et la taille finale", 'reduction = monolithic - final_size', 'reduction = final_size'),
    ],
    "dk2-c4-e1": [
        ("arrêter le conteneur au lieu de le redémarrer", 'transition["RUNNING", "restart"] = "RUNNING"', 'transition["RUNNING", "restart"] = "STOPPED"'),
        ("supprimer le conteneur lors de stop", 'transition["RUNNING", "stop"] = "STOPPED"', 'transition["RUNNING", "stop"] = "ABSENT"'),
    ],
    "dk2-c4-e2": [
        ("ignorer une réservation générique antérieure", 'addresses[index_rule] == "0.0.0.0"', '0'),
        ("ignorer une demande générique ultérieure", '|| address == "0.0.0.0"', '|| 0'),
    ],
    "dk2-c4-e3": [
        ("ne pas reconnaître les chemins relatifs parents", r'source ~ /^(\/|\.\/|\.\.\/)/', r'source ~ /^(\/|\.\/)/'),
        ("ignorer readonly dans --mount", 'readonly = 1\n    }\n    if (mount_type == "bind")', 'readonly = 0\n    }\n    if (mount_type == "bind")'),
    ],
    "dk2-c5-e1": [
        ("accepter un service sans origine", 'else { printf "SERVICE: %s -> INVALIDE (Directive image ou build obligatoire)\\n", name; next }', 'else { origin = "image:" }'),
        ("conserver une politique restart inconnue", 'if (restart != "no" && restart != "always" && restart != "unless-stopped" && restart != "on-failure") restart = "no"', 'if (restart == "") restart = "no"'),
    ],
    "dk2-c5-e2": [
        ("démarrer avec une dépendance encore non satisfaite", 'degree[service] == 0', 'degree[service] <= 1'),
        ("accepter un ordre partiel en présence de cycle", 'if (choice == "") { print "ERREUR_COMPOSE: Dependance cyclique detectee"; exit }', 'if (choice == "") break'),
    ],
    "dk2-c5-e3": [
        ("tronquer une valeur contenant un signe égal", 'if (equals) values[substr($0, 1, equals - 1)] = substr($0, equals + 1)', 'if (equals) { split($0, parts, "="); values[parts[1]] = parts[2] }'),
        ("traiter la valeur littérale zéro comme vide", 'replacement = values[name] != "" ? values[name] : fallback', 'replacement = values[name] != "" && values[name] != "0" ? values[name] : fallback'),
    ],
    "dk2-c6-e1": [
        ("ne garder que le premier USER", 'if (toupper(fields[1]) == "USER" && count >= 2) user = fields[2]', 'if (toupper(fields[1]) == "USER" && count >= 2 && !user_seen++) user = fields[2]'),
        ("comparer le groupe avec le nom root", 'split(user, parts, ":")', 'parts[1] = user'),
    ],
    "dk2-c6-e2": [
        ("interpréter le swap total comme swap additionnel", 'swap = memory_megabytes(values["SWAP"]) - ram', 'swap = memory_megabytes(values["SWAP"])'),
        ("ignorer la fraction du quota CPU", 'return whole * 100000 + fraction', 'return whole * 100000'),
    ],
    "dk2-c6-e3": [
        ("ne pas traiter unless-stopped", 'policy == "always" || policy == "unless-stopped"', 'policy == "always"'),
        ("inverser la condition de succès on-failure", 'policy == "on-failure" && code + 0 == 0', 'policy == "on-failure" && code + 0 != 0'),
    ],
}


def construire(identifiant, solution):
    variantes = []
    for description, original, remplacement in MUTATIONS[identifiant]:
        if solution.count(original) != 1 or original == remplacement:
            raise ValueError(f"mutation non unique : {identifiant} — {description}")
        variantes.append({
            "description": description,
            "original": original,
            "remplacement": remplacement,
            "code": solution.replace(original, remplacement, 1),
        })
    if len(variantes) != 2 or variantes[0]["code"] == variantes[1]["code"]:
        raise ValueError(f"deux variantes distinctes requises : {identifiant}")
    return variantes
