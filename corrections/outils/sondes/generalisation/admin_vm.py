import re


def lignes(entree, nombre):
    valeurs = entree.replace("\r\n", "\n").replace("\r", "\n").splitlines()
    if len(valeurs) != nombre or any(not valeur for valeur in valeurs):
        raise ValueError("nombre de lignes ou valeur vide hors domaine de la sonde")
    return valeurs


def entier(texte):
    if not re.fullmatch(r"[0-9]+", texte):
        raise ValueError("entier non négatif attendu")
    nombre = int(texte)
    if nombre > 100000:
        raise ValueError("valeur hors domaine borné de la sonde")
    return nombre


def calculer(identifiant, entree):
    if identifiant == "vm2-c1-e1":
        serveurs, par_serveur = map(entier, lignes(entree, 2))
        return f"vms : {serveurs * par_serveur}"
    if identifiant == "vm2-c1-e2":
        type_texte, nom = lignes(entree, 2)
        type_hyperviseur = entier(type_texte)
        if type_hyperviseur not in (1, 2):
            raise ValueError("type hors énoncé")
        usage = "production" if type_hyperviseur == 1 else "test"
        return f"solution : {nom} ({usage})"
    if identifiant == "vm2-c1-e3":
        domaine, = lignes(entree, 1)
        valeurs = {"serveur": "Proxmox", "poste": "VMware Horizon", "stockage": "NAS/SAN", "reseau": "pfSense"}
        if domaine not in valeurs:
            raise ValueError("domaine non indiqué dans l'énoncé")
        return f"exemple : {valeurs[domaine]}"
    if identifiant == "vm2-c2-e1":
        extensions, ram_texte = lignes(entree, 2)
        ram = entier(ram_texte)
        if extensions not in ("oui", "non"):
            raise ValueError("extension hors énoncé")
        if extensions == "non":
            return "virtualisation : impossible"
        return "virtualisation : possible" if ram >= 8 else "ram insuffisante"
    if identifiant == "vm2-c2-e2":
        ram_hote, ram_vm = map(entier, lignes(entree, 2))
        if ram_vm == 0:
            raise ValueError("division par zéro exclue")
        return f"vms possibles : {ram_hote // ram_vm}"
    if identifiant == "vm2-c2-e3":
        composant, = lignes(entree, 1)
        valeurs = {"noyau": "extensions CPU", "qemu": "execution des VM", "libvirt": "pilotage et API"}
        if composant not in valeurs:
            raise ValueError("composant non indiqué dans l'énoncé")
        return f"role : {valeurs[composant]}"
    if identifiant == "vm2-c3-e1":
        vcpu, coeurs = map(entier, lignes(entree, 2))
        excessif = vcpu > coeurs
        return f"surallocation : {'oui' if excessif else 'non'}\nexces : {max(0, vcpu - coeurs)}"
    if identifiant == "vm2-c3-e2":
        phase, = lignes(entree, 1)
        valeurs = {"conception": "definir les besoins", "provisioning": "allouer les ressources", "exploitation": "superviser et sauvegarder", "retrait": "archiver et nettoyer"}
        return f"tache : {valeurs.get(phase, 'inconnue')}"
    if identifiant == "vm2-c3-e3":
        ram_hote, ram_systeme, ram_vm = map(entier, lignes(entree, 3))
        if ram_vm == 0 or ram_systeme > ram_hote:
            raise ValueError("mémoire hors domaine physique de la sonde")
        return f"capacite : {(ram_hote - ram_systeme) // ram_vm}"
    if identifiant == "vm2-c4-e1":
        element, = lignes(entree, 1)
        valeurs = {"pv": "disque physique", "vg": "groupe de volumes", "lv": "volume logique"}
        if element not in valeurs:
            raise ValueError("élément non indiqué dans l'énoncé")
        return f"{element} : {valeurs[element]}"
    if identifiant == "vm2-c4-e2":
        capacite, utilise = map(entier, lignes(entree, 2))
        if utilise > capacite:
            raise ValueError("volume utilisé supérieur à sa capacité")
        libre = capacite - utilise
        return f"libre : {libre} Go" + ("\nalerte : espace faible" if libre < 10 else "")
    if identifiant == "vm2-c4-e3":
        frequence, = lignes(entree, 1)
        valeurs = {"quotidien": "7 jours", "hebdo": "4 semaines", "mensuel": "6 a 12 mois"}
        if frequence not in valeurs:
            raise ValueError("fréquence non indiquée dans l'énoncé")
        return f"retention : {valeurs[frequence]}"
    if identifiant == "vm2-c5-e1":
        brique, = lignes(entree, 1)
        valeurs = {"bridge": "switch virtuel", "nat": "acces Internet", "vlan": "segmentation logique", "firewall": "filtrage du trafic"}
        if brique not in valeurs:
            raise ValueError("brique non indiquée dans l'énoncé")
        return f"role : {valeurs[brique]}"
    if identifiant == "vm2-c5-e2":
        vlan = entier(lignes(entree, 1)[0])
        valeurs = {10: "vlan 10 : utilisateurs", 20: "vlan 20 : serveurs", 30: "vlan 30 : DMZ"}
        return valeurs.get(vlan, "vlan : inconnu")
    if identifiant == "vm2-c5-e3":
        source, destination, port_texte = lignes(entree, 3)
        port = entier(port_texte)
        if source not in ("lan", "dmz", "autre") or destination not in ("lan", "dmz", "autre") or not 1 <= port <= 65535:
            raise ValueError("zone ou port hors domaine de la sonde")
        autorise = source == destination or (set((source, destination)) == {"lan", "dmz"} and port == 443)
        return "flux : autorise" if autorise else "flux : filtre"
    if identifiant == "vm2-c6-e1":
        total, en_ligne = map(entier, lignes(entree, 2))
        if total == 0 or en_ligne > total:
            raise ValueError("cluster hors domaine physique de la sonde")
        return "quorum : atteint" if 2 * en_ligne > total else "quorum : perdu"
    if identifiant == "vm2-c6-e2":
        valeur, seuil = map(entier, lignes(entree, 2))
        return "etat : alerte" if valeur >= seuil else "etat : normal"
    if identifiant == "vm2-c6-e3":
        brut, taux = map(entier, lignes(entree, 2))
        if taux > 100:
            raise ValueError("taux de déduplication hors domaine")
        return f"apres dedup : {brut * (100 - taux) // 100} Go"
    raise ValueError("identifiant admin-vm inconnu")
