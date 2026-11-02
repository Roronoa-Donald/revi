import shlex


def lire_entree(entree, etiquettes):
    enregistrements = []
    for ligne in entree.splitlines():
        if not ligne.strip():
            continue
        elements = shlex.split(ligne)
        if not elements or elements[0] not in etiquettes:
            raise ValueError("type de ligne inadmissible")
        champs = {}
        for element in elements[1:]:
            cle, separateur, valeur = element.partition("=")
            if not separateur or not cle or cle in champs:
                raise ValueError("champ absent ou dupliqué")
            champs[cle] = valeur
        enregistrements.append((elements[0], champs))
    if not enregistrements:
        raise ValueError("entrée vide")
    return enregistrements


def verifier_champs(champs, requis):
    if set(champs) != set(requis):
        raise ValueError("ensemble de champs inadmissible")


def entier(champs, nom, minimum=0):
    texte = champs[nom]
    if not texte or texte.lstrip("-").isdigit() is False:
        raise ValueError("entier inadmissible")
    valeur = int(texte, 10)
    if valeur < minimum:
        raise ValueError("entier hors domaine")
    return valeur


def verifier_choix(valeur, choix):
    if valeur not in choix:
        raise ValueError("valeur hors domaine")
    return valeur


def proc_stat(entree):
    labels = {"R": "RUNNING", "S": "SLEEPING", "D": "UNINTERRUPTIBLE_DISK", "Z": "ZOMBIE", "T": "STOPPED"}
    sorties = []
    for _, champs in lire_entree(entree, {"PROC_STAT"}):
        verifier_champs(champs, {"pid", "comm", "state", "ppid", "utime", "stime", "rss"})
        verifier_choix(champs["state"], labels)
        total = entier(champs, "utime") + entier(champs, "stime")
        memoire = entier(champs, "rss") * 4
        sorties.append(f'STAT_AUDIT pid={champs["pid"]} comm={champs["comm"]} state_label={labels[champs["state"]]} total_ticks={total} mem_kb={memoire}')
    return "\n".join(sorties)


def vmmap(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"VMMAP"}):
        verifier_champs(champs, {"pid", "start", "end", "perms", "pathname"})
        debut, fin = int(champs["start"], 16), int(champs["end"], 16)
        if debut < 0 or fin < debut:
            raise ValueError("plage mémoire inadmissible")
        taille = (fin - debut) // 1024
        violation = "OUI" if "w" in champs["perms"] and "x" in champs["perms"] else "NON"
        sorties.append(f'MAP_AUDIT pid={champs["pid"]} path={champs["pathname"]} size_kb={taille} wx_violation={violation}')
    return "\n".join(sorties)


def service(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"SERVICE_DEF"}):
        verifier_champs(champs, {"name", "desc", "exec_start", "wanted_by"})
        erreur = "OK"
        if champs["desc"] in {"", "NONE"}:
            erreur = "DESCRIPTION_MANQUANTE"
        elif not champs["exec_start"].startswith("/"):
            erreur = "EXECSTART_RELATIF"
        elif champs["wanted_by"] in {"", "NONE"}:
            erreur = "WANTEDBY_MANQUANT"
        valide = "OUI" if erreur == "OK" else "NON"
        sorties.append(f'SERVICE_VALIDATION name={champs["name"]} valid={valide} error={erreur}')
    return "\n".join(sorties)


def dependances(entree):
    donnees = lire_entree(entree, {"UNIT_DEP"})
    dependance = {}
    for _, champs in donnees:
        verifier_champs(champs, {"name", "requires"})
        if not champs["name"] or champs["name"] in dependance:
            raise ValueError("nom d'unité vide ou dupliqué")
        dependance[champs["name"]] = champs["requires"]
    sorties = []
    for _, champs in donnees:
        nom, cible = champs["name"], champs["requires"]
        if cible != "NONE" and cible == nom:
            raison = "AUTO_DEPENDANCE"
        elif cible != "NONE" and dependance.get(cible) == nom:
            raison = "CYCLE_DIRECT"
        else:
            raison = "OK"
        cycle = "NON" if raison == "OK" else "OUI"
        sorties.append(f"DEP_CHECK unit={nom} cycle={cycle} reason={raison}")
    return "\n".join(sorties)


def journal(entree):
    labels = ("EMERGENCY", "ALERT", "CRITICAL", "ERROR", "WARNING", "NOTICE", "INFO", "DEBUG")
    sorties = []
    for _, champs in lire_entree(entree, {"JOURNAL"}):
        verifier_champs(champs, {"id", "priority", "unit", "msg"})
        priorite = entier(champs, "priority")
        if priorite >= len(labels):
            raise ValueError("priorité hors domaine")
        alerte = "OUI" if priorite <= 3 else "NON"
        sorties.append(f'JOURNAL_AUDIT id={champs["id"]} unit={champs["unit"]} level={labels[priorite]} alert={alerte}')
    return "\n".join(sorties)


def lvm(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"LVM_REQ"}):
        verifier_champs(champs, {"vg", "pe_size_mb", "total_pv_gb", "lv_target_gb"})
        taille = entier(champs, "pe_size_mb", 1)
        total = entier(champs, "total_pv_gb") * 1024 // taille
        necessaires = (entier(champs, "lv_target_gb") * 1024 + taille - 1) // taille
        statut = "ALLOCATED" if necessaires <= total else "INSUFFICIENT_SPACE"
        ecart = abs(total - necessaires)
        sorties.append(f'LVM_AUDIT vg={champs["vg"]} status={statut} pe_used={necessaires} pe_free_or_deficit={ecart}')
    return "\n".join(sorties)


def raid(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"RAID_CONF"}):
        verifier_champs(champs, {"device", "level", "total", "active", "failed", "spares"})
        niveau = verifier_choix(champs["level"], {"RAID1", "RAID5", "RAID6"})
        total = entier(champs, "total", 1)
        actifs = entier(champs, "active")
        pannes = entier(champs, "failed")
        reserves = entier(champs, "spares")
        if actifs + pannes != total:
            raise ValueError("inventaire RAID incohérent")
        if niveau == "RAID1":
            etat = "FAILED" if actifs == 0 else "DEGRADED" if pannes else "OPTIMAL"
        else:
            tolerance = 1 if niveau == "RAID5" else 2
            etat = "FAILED" if pannes > tolerance else "DEGRADED" if pannes else "OPTIMAL"
        if etat == "FAILED":
            action = "CRITICAL_DATA_LOSS"
        elif etat == "DEGRADED":
            action = "REBUILD_SPARE" if reserves else "WARNING_NO_SPARE"
        else:
            action = "NONE"
        sorties.append(f'RAID_DIAG dev={champs["device"]} level={niveau} state={etat} action={action}')
    return "\n".join(sorties)


def filesystem(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"FS_METRICS"}):
        verifier_champs(champs, {"mount", "blocks_total", "blocks_used", "inodes_total", "inodes_used"})
        total_blocs, blocs_utilises = entier(champs, "blocks_total", 1), entier(champs, "blocks_used")
        total_inodes, inodes_utilises = entier(champs, "inodes_total", 1), entier(champs, "inodes_used")
        if blocs_utilises > total_blocs or inodes_utilises > total_inodes:
            raise ValueError("utilisation supérieure à la capacité")
        blocs = blocs_utilises * 100 // total_blocs
        inodes = inodes_utilises * 100 // total_inodes
        if blocs >= 90 and inodes >= 90:
            statut, diagnostic = "CRITICAL", "TOTAL_EXHAUSTION"
        elif inodes >= 90 and blocs < 60:
            statut, diagnostic = "ALERT", "INODE_EXHAUSTION"
        elif blocs >= 90 and inodes < 90:
            statut, diagnostic = "ALERT", "DISK_SPACE_FULL"
        else:
            statut, diagnostic = "HEALTHY", "NORMAL"
        sorties.append(f'FS_STATUS mount={champs["mount"]} block_pct={blocs}% inode_pct={inodes}% status={statut} diag={diagnostic}')
    return "\n".join(sorties)


def namespaces(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"NS_CHECK"}):
        verifier_champs(champs, {"pid", "ns_pid", "ns_net", "ns_mnt", "host_pid", "host_net", "host_mnt"})
        differences = sum(entier(champs, f"ns_{nom}") != entier(champs, f"host_{nom}") for nom in ("pid", "net", "mnt"))
        isole = "OUI" if differences else "NON"
        sorties.append(f'NS_STATUS pid={champs["pid"]} isolated={isole} isolated_count={differences}')
    return "\n".join(sorties)


def cgroup(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"CGROUP"}):
        verifier_champs(champs, {"group", "cpu_quota", "cpu_period", "mem_curr_mb", "mem_max_mb"})
        periode = entier(champs, "cpu_period", 1)
        if champs["cpu_quota"] == "max":
            coeurs = "UNLIMITED"
        else:
            quota = entier(champs, "cpu_quota")
            dixiemes = (quota * 20 + periode) // (2 * periode)
            coeurs = f"{dixiemes // 10}.{dixiemes % 10}"
        memoire = "SATURATED" if entier(champs, "mem_curr_mb") >= entier(champs, "mem_max_mb") else "OK"
        sorties.append(f'CGROUP_AUDIT group={champs["group"]} cpu_cores={coeurs} mem_status={memoire}')
    return "\n".join(sorties)


def oom(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"OOM_PROC"}):
        verifier_champs(champs, {"pid", "comm", "mem_mb", "oom_score_adj"})
        memoire, ajustement = entier(champs, "mem_mb"), entier(champs, "oom_score_adj", -1000)
        if ajustement > 1000:
            raise ValueError("ajustement OOM hors domaine")
        if ajustement == -1000:
            score, risque = "IMMUNE", "NONE"
        else:
            score = memoire + ajustement
            risque = "HIGH" if score > 1000 else "LOW"
        sorties.append(f'OOM_TARGET pid={champs["pid"]} comm={champs["comm"]} score={score} risk={risque}')
    return "\n".join(sorties)


def interfaces(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"NET_IFACE"}):
        verifier_champs(champs, {"name", "type", "master", "ip", "state"})
        verifier_choix(champs["type"], {"bridge", "veth"})
        verifier_choix(champs["state"], {"UP", "DOWN"})
        if champs["state"] == "DOWN":
            erreur = "INTERFACE_DOWN"
        elif champs["type"] == "bridge" and champs["master"] != "NONE":
            erreur = "BRIDGE_CANNOT_HAVE_MASTER"
        elif champs["type"] == "veth" and champs["master"] == champs["ip"] == "NONE":
            erreur = "VETH_UNATTACHED"
        else:
            erreur = "OK"
        valide = "OUI" if erreur == "OK" else "NON"
        sorties.append(f'NET_AUDIT iface={champs["name"]} valid={valide} error={erreur}')
    return "\n".join(sorties)


def routage(entree):
    regles, sorties = [], []
    for etiquette, champs in lire_entree(entree, {"RULE", "PACKET"}):
        if etiquette == "RULE":
            verifier_champs(champs, {"prio", "src", "dport", "table"})
            regles.append((entier(champs, "prio"), len(regles), champs))
            continue
        verifier_champs(champs, {"id", "src", "dport"})
        candidates = [
            (priorite, ordre, regle) for priorite, ordre, regle in regles
            if regle["src"] in {"ANY", champs["src"]} and regle["dport"] in {"ANY", champs["dport"]}
        ]
        if candidates:
            priorite, _, selection = min(candidates, key=lambda item: (item[0], item[1]))
            table = selection["table"]
        else:
            priorite, table = "NONE", "NONE"
        sorties.append(f'ROUTE_MATCH packet={champs["id"]} matched_prio={priorite} table={table}')
    return "\n".join(sorties)


def nsswitch(entree):
    ordre, sorties = None, []
    for etiquette, champs in lire_entree(entree, {"CONF_NSSWITCH", "QUERY_HOST"}):
        if etiquette == "CONF_NSSWITCH":
            verifier_champs(champs, {"order"})
            ordre = champs["order"].split(",")
            if not ordre or any(source not in {"files", "dns", "mdns"} for source in ordre):
                raise ValueError("ordre NSS inadmissible")
            continue
        verifier_champs(champs, {"name", "in_files", "in_dns", "in_mdns"})
        if ordre is None:
            raise ValueError("configuration NSS absente")
        for source in ("files", "dns", "mdns"):
            verifier_choix(champs[f"in_{source}"], {"OUI", "NON"})
        trouve = next((source for source in ordre if champs[f"in_{source}"] == "OUI"), "NONE")
        statut = "NOT_FOUND" if trouve == "NONE" else "SUCCESS"
        sorties.append(f'RESOLV_RESULT host={champs["name"]} resolved_by={trouve} status={statut}')
    return "\n".join(sorties)


def sysctl(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"SYSCTL_CHECK"}):
        verifier_champs(champs, {"key", "current", "recommended"})
        statut = "COMPLIANT" if champs["current"] == champs["recommended"] else "HARDENING_REQUIRED"
        sorties.append(f'SYSCTL_AUDIT key={champs["key"]} current={champs["current"]} target={champs["recommended"]} status={statut}')
    return "\n".join(sorties)


def pam(entree):
    donnees = lire_entree(entree, {"PAM_STEP"})
    echec, succes, sorties = False, False, []
    for _, champs in donnees:
        verifier_champs(champs, {"module", "control", "res"})
        controle = verifier_choix(champs["control"], {"required", "requisite", "sufficient"})
        resultat = verifier_choix(champs["res"], {"SUCCESS", "FAIL"})
        action = "CONTINUE"
        if controle == "required" and resultat == "FAIL":
            echec = True
        elif controle == "requisite" and resultat == "FAIL":
            echec, action = True, "ABORT_FAIL"
        elif resultat == "SUCCESS":
            succes = True
            if controle == "sufficient" and not echec:
                action = "STOP_SUCCESS"
        sorties.append(f'PAM_TRACE module={champs["module"]} control={controle} res={resultat} action={action}')
        if action != "CONTINUE":
            break
    decision = "GRANTED" if succes and not echec else "DENIED"
    sorties.append(f"PAM_FINAL decision={decision}")
    return "\n".join(sorties)


def auditd(entree):
    sorties = []
    for _, champs in lire_entree(entree, {"AUDIT_LOG"}):
        verifier_champs(champs, {"id", "uid", "euid", "exe", "res"})
        uid, euid = entier(champs, "uid"), entier(champs, "euid")
        verifier_choix(champs["res"], {"success", "failed"})
        if uid != 0 and euid == 0:
            alerte = "CRITICAL_ROOT_ELEVATION" if champs["res"] == "success" else "BLOCKED_PRIVILEGE_ATTEMPT"
        elif uid == 0 and euid == 0:
            alerte = "ROOT_NATIVE"
        else:
            alerte = "STANDARD_USER"
        sorties.append(f'AUDIT_REPORT id={champs["id"]} exe={champs["exe"]} uid={champs["uid"]} euid={champs["euid"]} alert={alerte}')
    return "\n".join(sorties)


ORACLES = {
    "lx3-c1-e1": proc_stat,
    "lx3-c1-e2": vmmap,
    "lx3-c2-e1": service,
    "lx3-c2-e2": dependances,
    "lx3-c2-e3": journal,
    "lx3-c3-e1": lvm,
    "lx3-c3-e2": raid,
    "lx3-c3-e3": filesystem,
    "lx3-c4-e1": namespaces,
    "lx3-c4-e2": cgroup,
    "lx3-c4-e3": oom,
    "lx3-c5-e1": interfaces,
    "lx3-c5-e2": routage,
    "lx3-c5-e3": nsswitch,
    "lx3-c6-e1": sysctl,
    "lx3-c6-e2": pam,
    "lx3-c6-e3": auditd,
}


def calculer(identifiant, entree):
    if identifiant not in ORACLES:
        raise ValueError("oracle B3 Linux absent")
    return ORACLES[identifiant](entree)
