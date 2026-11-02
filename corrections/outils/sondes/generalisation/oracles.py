import json
import math
import re
import sqlite3
import subprocess
from collections import Counter
from decimal import Decimal, ROUND_HALF_EVEN
from fractions import Fraction
from functools import lru_cache


ORACLES_B1_PROGRAMMES = frozenset({
    "b1_admission", "b1_ajout_fichier", "b1_chiffres", "b1_division", "b1_echanger_c",
    "b1_entrees_robustes", "b1_etudiant_c", "b1_extremites", "b1_factorielle_c", "b1_fahrenheit_c",
    "b1_frequences", "b1_inverse_c", "b1_maximum_c", "b1_moyenne_c", "b1_moyennes_noms",
    "b1_nom_age", "b1_notes_fichier", "b1_notes_json", "b1_pairs", "b1_parite_c", "b1_point_c",
    "b1_premier", "b1_racine", "b1_rectangle", "b1_somme_c", "b1_somme_max_c", "b1_somme_produit_c",
    "b1_somme_python", "b1_stats", "b1_table_c", "b1_tableau_somme_c", "b1_voyelles",
})


def require(condition, message):
    if not condition:
        raise ValueError(message)


def nombres(texte, count):
    values = texte.split()
    require(len(values) == count, "nombre de valeurs inattendu")
    return [int(value) for value in values]


def base_memoire(script, tables):
    require(len(script.encode("utf-8")) <= 8192, "entrée SQL trop longue")
    database = sqlite3.connect(":memory:")
    allowed_tables = set(tables) | {"sqlite_master", "sqlite_schema"}
    allowed_actions = {
        sqlite3.SQLITE_CREATE_TABLE,
        sqlite3.SQLITE_INSERT,
        sqlite3.SQLITE_READ,
        sqlite3.SQLITE_SELECT,
        sqlite3.SQLITE_TRANSACTION,
        sqlite3.SQLITE_UPDATE,
    }

    def authorizer(action, name, detail, database_name, trigger):
        if action not in allowed_actions:
            return sqlite3.SQLITE_DENY
        if action in {sqlite3.SQLITE_CREATE_TABLE, sqlite3.SQLITE_INSERT, sqlite3.SQLITE_READ, sqlite3.SQLITE_UPDATE}:
            if name not in allowed_tables:
                return sqlite3.SQLITE_DENY
        return sqlite3.SQLITE_OK

    database.set_authorizer(authorizer)
    counter = [0]

    def progress():
        counter[0] += 1
        return int(counter[0] > 5000)

    database.set_progress_handler(progress, 100)
    database.executescript(script.split("-- VERIFY:", 1)[0])
    return database


def instantane_sql(texte, codec):
    if codec == "sql_factures":
        with base_memoire(texte, ["factures"]) as database:
            rows = database.execute("SELECT id, montant_ht, remise FROM factures ORDER BY id, montant_ht, remise").fetchall()
            return json.dumps(rows, ensure_ascii=False, separators=(",", ":"))
    if codec == "sql_clients":
        with base_memoire(texte, ["clients", "commandes"]) as database:
            clients = database.execute("SELECT id, nom FROM clients ORDER BY id, nom").fetchall()
            orders = database.execute("SELECT id, client_id FROM commandes ORDER BY id, client_id").fetchall()
            return json.dumps([clients, orders], ensure_ascii=False, separators=(",", ":"))
    raise ValueError("codec SQL inconnu")


def b1_lignes_comptees(texte):
    lignes = texte.splitlines()
    require(bool(lignes), "compte absent")
    nombre = int(lignes[0])
    require(1 <= nombre <= 100 and len(lignes) == nombre + 1, "nombre de lignes hors domaine")
    return lignes[1:]


def b1_notes(texte):
    notes = [int(ligne) for ligne in b1_lignes_comptees(texte)]
    require(all(0 <= note <= 20 for note in notes), "note hors domaine")
    return notes


def b1_moyenne(notes):
    require(bool(notes) and all(0 <= note <= 20 for note in notes), "notes hors domaine")
    total = sum(notes)
    require(2 * ((total * 100) % len(notes)) != len(notes), "arrondi médian non couvert")
    moyenne = Decimal(total) / Decimal(len(notes))
    return format(moyenne.quantize(Decimal("0.01"), rounding=ROUND_HALF_EVEN), "f")


def b1_etudiants(texte, nombre_notes):
    resultats = []
    for ligne in b1_lignes_comptees(texte):
        champs = ligne.split()
        require(len(champs) == nombre_notes + 1, "ligne d'étudiant invalide")
        nom, notes = champs[0], [int(champ) for champ in champs[1:]]
        require(bool(re.fullmatch(r"[A-Za-z][A-Za-z0-9_-]{0,62}", nom)), "nom hors domaine")
        require(all(0 <= note <= 20 for note in notes), "note hors domaine")
        resultats.append((nom, notes))
    return resultats


def b1_tableau(texte):
    champs = texte.split()
    require(bool(champs), "taille absente")
    taille = int(champs[0])
    require(1 <= taille <= 100 and len(champs) == taille + 1, "tableau hors domaine")
    valeurs = [int(champ) for champ in champs[1:]]
    require(all(abs(valeur) <= 1000000 for valeur in valeurs), "entier hors domaine")
    return valeurs


def b1_entiers_bornes(texte, nombre):
    valeurs = nombres(texte, nombre)
    require(all(abs(valeur) <= 1000000 for valeur in valeurs), "entier hors domaine")
    return valeurs


def calculer_php_b1(nom, entree):
    if nom == "php_b1_article":
        champs = entree.splitlines()
        require(len(champs) == 2 and re.fullmatch(r"[A-Za-z]{1,30}", champs[0]), "article invalide")
        prix = int(champs[1])
        require(0 <= prix <= 100000, "prix hors domaine")
        return f"Article : {champs[0]}\nPrix : {prix} EUR"

    if nom in {"php_b1_chaine", "php_b1_bienvenue"}:
        require(re.fullmatch(r"[A-Za-z]{1,30}", entree) is not None, "mot hors domaine")
        if nom == "php_b1_chaine":
            return f"Longueur : {len(entree)}\nMajuscules : {entree.upper()}"
        return f"Bienvenue {entree}"

    if nom == "php_b1_cabine":
        visiteurs, capacite = b1_entiers_bornes(entree, 2)
        require(visiteurs >= 0 and capacite > 0, "valeurs hors domaine")
        trajets, reste = divmod(visiteurs, capacite)
        return f"Trajets : {trajets}\nReste : {reste}"

    if nom in {"php_b1_mention", "php_b1_livraison", "php_b1_tram", "php_b1_ticket", "php_b1_compte", "php_b1_somme", "php_b1_puissances", "php_b1_mention_dix"}:
        valeur = b1_entiers_bornes(entree, 1)[0]
        if nom == "php_b1_mention":
            require(0 <= valeur <= 20, "note hors domaine")
            return next(mention for seuil, mention in ((16, "Tres bien"), (14, "Bien"), (12, "Assez bien"), (10, "Passable"), (0, "Ajourne")) if valeur >= seuil)
        if nom == "php_b1_livraison":
            require(valeur >= 0, "montant négatif")
            frais = 0 if valeur >= 50 else 5
            libelle = "offerte" if frais == 0 else "5 EUR"
            return f"Livraison : {libelle}\nTotal : {valeur + frais} EUR"
        if nom in {"php_b1_tram", "php_b1_ticket"}:
            require(0 <= valeur <= 120, "âge hors domaine")
            tranche = "Gratuit" if valeur < 12 or valeur >= 65 else "Reduit" if valeur < 18 else "Plein"
            return tranche if nom == "php_b1_tram" else {"Gratuit": "0", "Reduit": "5", "Plein": "8"}[tranche]
        if nom == "php_b1_compte":
            require(1 <= valeur <= 100, "décompte hors domaine")
            return "\n".join([*(str(nombre) for nombre in range(valeur, 0, -1)), "Decollage"])
        if nom == "php_b1_somme":
            require(0 <= valeur <= 10000, "borne hors domaine")
            return str(valeur * (valeur + 1) // 2)
        if nom == "php_b1_puissances":
            require(1 <= valeur <= 20, "nombre de puissances hors domaine")
            return "\n".join(str(2 ** exposant) for exposant in range(1, valeur + 1))
        require(1 <= valeur <= 10, "note hors domaine")
        return "Excellent" if valeur >= 9 else "Tres bien" if valeur >= 7 else "Bien" if valeur >= 5 else "Insuffisant"

    if nom in {"php_b1_notes", "php_b1_stats"}:
        notes = b1_notes(entree)
        moyenne = b1_moyenne(notes)
        return f"Somme : {sum(notes)}\nMoyenne : {moyenne}" if nom == "php_b1_notes" else f"{moyenne} {max(notes)}"

    if nom == "php_b1_recherche":
        champs = entree.split()
        require(bool(champs), "taille absente")
        taille = int(champs[0])
        require(1 <= taille <= 100 and len(champs) == taille + 2, "tableau hors domaine")
        valeurs = [int(champ) for champ in champs[1:-1]]
        cible = int(champs[-1])
        return str(valeurs.index(cible) + 1) if cible in valeurs else "absent"

    if nom == "php_b1_tri":
        return " ".join(str(valeur) for valeur in sorted(b1_tableau(entree)))

    if nom in {"php_b1_inventaire", "php_b1_plus_age", "php_b1_validation"}:
        lignes = b1_lignes_comptees(entree)
        paires = []
        for ligne in lignes:
            champs = ligne.split()
            require(len(champs) == 2 and re.fullmatch(r"[A-Za-z]{1,30}", champs[0]), "ligne invalide")
            paires.append((champs[0], int(champs[1])))
        if nom == "php_b1_inventaire":
            require(len({cle for cle, _ in paires}) == len(paires) and all(valeur >= 0 for _, valeur in paires), "inventaire hors domaine")
            return str(sum(valeur for _, valeur in paires))
        if nom == "php_b1_plus_age":
            require(all(0 <= valeur <= 120 for _, valeur in paires), "âge hors domaine")
            maximum = max(valeur for _, valeur in paires)
            require(sum(valeur == maximum for _, valeur in paires) == 1, "égalité non couverte")
            personne = next(cle for cle, valeur in paires if valeur == maximum)
            return f"{personne} {maximum}"
        return "Valide" if all(0 <= valeur <= 20 for _, valeur in paires) else "Invalide"

    if nom == "php_b1_mot_frequent":
        mots = b1_lignes_comptees(entree)
        require(all(re.fullmatch(r"[A-Za-z]{1,30}", mot) for mot in mots), "mot hors domaine")
        comptes = Counter(mots)
        maximum = max(comptes.values())
        gagnants = [mot for mot, compte in comptes.items() if compte == maximum]
        require(len(gagnants) == 1, "égalité non couverte")
        return f"{gagnants[0]} {maximum}"

    if nom == "php_b1_formulaire":
        champs = entree.splitlines()
        require(len(champs) == 2 and all(champs), "formulaire hors domaine")
        return "OK" if "@" in champs[0] and len(champs[1]) >= 6 else "Refuse"

    raise ValueError("oracle PHP B1 non disponible")


def calculer_php_b2(nom, entree):
    if nom == "php_b2_point":
        abscisse, ordonnee = b1_entiers_bornes(entree, 2)
        return f"({abscisse}, {ordonnee})"

    if nom in {"php_b2_panier", "php_b2_compte", "php_b2_depot"}:
        valeurs = b1_tableau(entree)
        if nom == "php_b2_panier":
            require(all(valeur >= 0 for valeur in valeurs), "prix négatif")
            return f"total : {sum(valeurs)}"
        if nom == "php_b2_compte":
            return f"solde : {sum(valeur for valeur in valeurs if valeur > 0)}"
        return f"somme : {sum(valeurs)}"

    if nom in {"php_b2_age", "php_b2_ttc", "php_b2_pair", "php_b2_aire", "php_b2_double"}:
        valeur = b1_entiers_bornes(entree, 1)[0]
        if nom == "php_b2_age":
            return f"age : {max(0, valeur)}"
        if nom == "php_b2_ttc":
            require(valeur >= 0, "prix négatif")
            return f"ttc : {valeur * 118 // 100}"
        if nom == "php_b2_pair":
            return f"pair : {'oui' if valeur % 2 == 0 else 'non'}"
        if nom == "php_b2_aire":
            require(valeur >= 0, "côté négatif")
            return f"aire : {valeur * valeur}"
        return f"double : {2 * valeur}"

    if nom == "php_b2_formes":
        total = 0
        for ligne in b1_lignes_comptees(entree):
            champs = ligne.split()
            require(champs and champs[0] in {"carre", "rectangle"}, "forme inconnue")
            require(len(champs) == (2 if champs[0] == "carre" else 3), "dimensions manquantes")
            dimensions = [int(champ) for champ in champs[1:]]
            require(all(0 <= dimension <= 1000 for dimension in dimensions), "dimension hors domaine")
            total += dimensions[0] * dimensions[-1]
        return f"total : {total}"

    if nom == "php_b2_produit":
        champs = entree.splitlines()
        require(len(champs) == 2 and re.fullmatch(r"[A-Za-z]{1,30}", champs[0]), "produit invalide")
        prix = int(champs[1])
        require(0 <= prix <= 100000, "prix hors domaine")
        return f"{champs[0]} ({prix} EUR)"

    if nom in {"php_b2_salutation", "php_b2_utilisateur", "php_b2_contact"}:
        require(re.fullmatch(r"[A-Za-z0-9]{1,30}", entree) is not None, "nom hors domaine")
        prefixe = {"php_b2_salutation": "Bonjour ", "php_b2_utilisateur": "utilisateur : ", "php_b2_contact": "contact : "}[nom]
        return prefixe + entree

    if nom in {"php_b2_division", "php_b2_retrait"}:
        premier, second = b1_entiers_bornes(entree, 2)
        require(premier >= 0 and second >= 0, "valeurs négatives hors domaine")
        if nom == "php_b2_division":
            return f"resultat : {premier // second}" if second else "erreur : division par zéro"
        return f"reste : {premier - second}" if second <= premier else "erreur : solde insuffisant"

    if nom == "php_b2_saisie":
        if re.fullmatch(r"[0-9]+", entree):
            return f"valeur : {entree}\ncontrole termine"
        require(re.fullmatch(r"[A-Za-z]+", entree) is not None, "saisie hors domaine")
        return "saisie invalide\ncontrole termine"

    if nom == "php_b2_taches":
        taches = b1_lignes_comptees(entree)
        require(all(tache.strip() == tache and tache for tache in taches), "tâche vide ou mal formée")
        return "\n".join(f"{index}. {tache}" for index, tache in enumerate(taches, 1))

    raise ValueError("oracle PHP B2 non disponible")


def calculer_web_b1(nom, entree):
    if nom == "web_b1_url":
        correspondance = re.fullmatch(r"(https?)://([^/?#]+)(/[^?#]*)?(?:\?([^#]+))?", entree)
        require(correspondance is not None, "URL hors domaine")
        protocole, hote, chemin, requete = correspondance.groups()
        return "\n".join((protocole, hote, chemin or "/", requete or "-"))

    if nom == "web_b1_status":
        codes = b1_tableau(entree)
        require(all(100 <= code <= 599 for code in codes), "code hors domaine")
        familles = {1: "information", 2: "succès", 3: "redirection", 4: "erreur client", 5: "erreur serveur"}
        return "\n".join(f"{code} {familles[code // 100]}" for code in codes)

    if nom == "web_b1_methodes":
        methodes = b1_lignes_comptees(entree)
        idempotentes = {"GET", "HEAD", "PUT", "DELETE", "OPTIONS", "TRACE"}
        require(all(methode in idempotentes | {"POST", "PATCH"} for methode in methodes), "méthode hors domaine")
        return "\n".join(f"{methode} {'oui' if methode in idempotentes else 'non'}" for methode in methodes)

    if nom == "web_b1_titre":
        correspondance = re.search(r"<title>(.*?)</title>", entree, re.DOTALL)
        return correspondance.group(1).strip() if correspondance else "-"

    if nom == "web_b1_liens":
        return "\n".join(re.findall(r'<a\b[^>]*?\bhref="([^"]*)"', entree))

    if nom == "web_b1_hierarchie":
        titres = b1_lignes_comptees(entree)
        require(all(re.fullmatch(r"h[1-6]", titre) for titre in titres), "titre hors domaine")
        niveaux = [int(titre[1]) for titre in titres]
        return "conforme" if niveaux[0] == 1 and all(suivant <= precedent + 1 for precedent, suivant in zip(niveaux, niveaux[1:])) else "non conforme"

    if nom == "web_b1_email":
        if entree.count("@") != 1 or " " in entree:
            return "invalide"
        local, domaine = entree.split("@")
        return "valide" if local and "." in domaine[1:-1] else "invalide"

    if nom == "web_b1_motdepasse":
        require(entree.isascii(), "seuls les caractères ASCII sont couverts")
        score = sum((len(entree) >= 8, bool(re.search(r"[A-Z]", entree)), bool(re.search(r"[a-z]", entree)), bool(re.search(r"[0-9]", entree)), bool(re.search(r"[^A-Za-z0-9]", entree))))
        return f"{score} {'faible' if score <= 2 else 'moyen' if score < 5 else 'fort'}"

    if nom == "web_b1_echapper":
        substitutions = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}
        return "".join(substitutions.get(caractere, caractere) for caractere in entree)

    if nom == "web_b1_selecteur":
        parties = entree.split()
        require(parties and all(re.fullmatch(r"(?:\*|[A-Za-z][\w-]*)?(?:[.#][\w-]+)*", partie) for partie in parties), "sélecteur hors domaine")
        identifiants = sum(len(re.findall(r"#[\w-]+", partie)) for partie in parties)
        classes = sum(len(re.findall(r"\.[\w-]+", partie)) for partie in parties)
        types = sum(bool(re.match(r"^[A-Za-z]", partie)) for partie in parties)
        return f"{identifiants} {classes} {types}"

    if nom == "web_b1_boite":
        largeur, padding, bordure, marge = b1_entiers_bornes(entree, 4)
        require(min(largeur, padding, bordure, marge) >= 0 and largeur >= 2 * (padding + bordure), "dimensions hors domaine")
        return f"{largeur + 2 * (padding + bordure)}\n{largeur + 2 * marge}\n{largeur - 2 * (padding + bordure)}"

    if nom == "web_b1_unites":
        lignes = entree.splitlines()
        require(len(lignes) >= 3, "déclarations absentes")
        reference, nombre = Decimal(lignes[0]), int(lignes[1])
        require(reference > 0 and 1 <= nombre <= 100 and len(lignes) == nombre + 2, "dimensions hors domaine")
        resultats = []
        for ligne in lignes[2:]:
            champs = ligne.split()
            require(len(champs) == 2 and champs[1] in {"px", "rem", "em"}, "unité inconnue")
            valeur = Decimal(champs[0])
            require(valeur >= 0, "valeur négative")
            resultats.append(format(valeur * (Decimal(1) if champs[1] == "px" else reference), ".2f"))
        return "\n".join(resultats)

    if nom == "web_b1_flex":
        largeur, espacement, nombre = b1_entiers_bornes(entree, 3)
        require(largeur >= 0 and espacement >= 0 and nombre > 0 and largeur >= (nombre - 1) * espacement, "dimensions hors domaine")
        return format(Decimal(largeur - (nombre - 1) * espacement) / Decimal(nombre), ".2f")

    if nom == "web_b1_colonnes":
        largeurs = b1_tableau(entree)
        require(all(0 <= largeur <= 10000 for largeur in largeurs), "largeur hors domaine")
        return "\n".join(f"{largeur} {1 if largeur < 600 else 2 if largeur < 900 else 3}" for largeur in largeurs)

    if nom == "web_b1_position":
        colonnes, position = b1_entiers_bornes(entree, 2)
        require(colonnes > 0 and position > 0, "position hors domaine")
        ligne, colonne = divmod(position - 1, colonnes)
        return f"{ligne + 1} {colonne + 1}"

    if nom in {"web_b1_liste", "web_b1_filtrer"}:
        personnes = b1_etudiants(entree, 1)
        if nom == "web_b1_liste":
            lignes = [f"<li>{personne} : {notes[0]}</li>" for personne, notes in personnes]
            return "\n".join(["<ul>", *lignes, "</ul>"])
        admis = sorted(((personne, notes[0]) for personne, notes in personnes if notes[0] >= 10), key=lambda item: (-item[1], item[0]))
        return "\n".join(personne for personne, _ in admis)

    if nom == "web_b1_evenements":
        evenements = b1_lignes_comptees(entree)
        require(all(evenement in {"click", "reset"} for evenement in evenements), "événement hors domaine")
        total, compteur = 0, 0
        for evenement in evenements:
            if evenement == "click":
                total += 1
                compteur += 1
            else:
                compteur = 0
        return f"{total}\n{compteur}"

    raise ValueError("oracle Web B1 non disponible")


@lru_cache(maxsize=1)
def b1_limite_long_c():
    try:
        resultat = subprocess.run(
            ["/usr/bin/gcc", "-std=c11", "-dM", "-E", "-x", "c", "-"],
            input="", text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=5, check=True,
        )
    except (OSError, subprocess.SubprocessError) as erreur:
        raise ValueError("limite de long du compilateur indisponible") from erreur
    correspondance = re.search(r"^#define __LONG_MAX__\s+(0[xX][0-9a-fA-F]+|[0-9]+)[uUlL]*$", resultat.stdout, re.MULTILINE)
    require(correspondance is not None, "limite de long du compilateur inconnue")
    return int(correspondance.group(1), 0)


def calculer_b1(nom, entree):
    if nom in {"b1_somme_python", "b1_somme_c"}:
        nombre = b1_entiers_bornes(entree, 1)[0]
        require(0 <= nombre <= 10000, "borne hors domaine")
        resultat = nombre * (nombre + 1) // 2
        return f"Somme : {resultat}" if nom == "b1_somme_c" else str(resultat)

    if nom == "b1_admission":
        notes = b1_notes(entree)
        etiquettes = ("Ajourné", "Rattrapage", "Admis")
        return "\n".join(etiquettes[sum(note >= seuil for seuil in (8, 10))] for note in notes)

    if nom == "b1_chiffres":
        nombre = b1_entiers_bornes(entree, 1)[0]
        require(nombre >= 0, "entier négatif")
        frequences = Counter(str(nombre))
        return str(sum(int(chiffre) * effectif for chiffre, effectif in frequences.items()))

    if nom == "b1_stats":
        notes = b1_notes(entree)
        return f"{b1_moyenne(notes)} {max(notes)}"

    if nom == "b1_division":
        numerateur, denominateur = b1_entiers_bornes(entree, 2)
        if denominateur == 0:
            return "erreur"
        quotient = float(Fraction(abs(numerateur), abs(denominateur)))
        if (numerateur < 0) != (denominateur < 0):
            quotient = -quotient
        return str(quotient)

    if nom == "b1_premier":
        nombre = b1_entiers_bornes(entree, 1)[0]
        premier = nombre >= 2 and not any(nombre % diviseur == 0 for diviseur in range(2, math.isqrt(nombre) + 1))
        return "oui" if premier else "non"

    if nom == "b1_pairs":
        nombre = b1_entiers_bornes(entree, 1)[0]
        require(0 <= nombre <= 1000, "borne hors domaine")
        valeurs = tuple(2 * indice for indice in range(1, nombre // 2 + 1))
        return f"{len(valeurs)}\n{valeurs}"

    if nom == "b1_moyennes_noms":
        return "\n".join(f"{nom_etudiant} {b1_moyenne(notes)}" for nom_etudiant, notes in b1_etudiants(entree, 3))

    if nom == "b1_frequences":
        require("\n" not in entree and "\r" not in entree, "une seule ligne attendue")
        mots = entree.lower().split()
        require(bool(mots) and all(re.fullmatch(r"[a-z]+", mot) for mot in mots), "mots hors domaine")
        frequences = Counter(mots)
        return "\n".join(f"{mot} {frequences[mot]}" for mot in dict.fromkeys(mots))

    if nom == "b1_notes_fichier":
        etudiants = b1_etudiants(entree, 1)
        return f"{len(etudiants)}\n{b1_moyenne([notes[0] for _, notes in etudiants])}"

    if nom == "b1_ajout_fichier":
        lignes = entree.splitlines()
        require(bool(lignes), "premier compte absent")
        nombre_initial = int(lignes[0])
        require(0 <= nombre_initial <= 100 and len(lignes) > nombre_initial + 1, "premier compte invalide")
        position = nombre_initial + 1
        nombre_ajoute = int(lignes[position])
        require(0 <= nombre_ajoute <= 100 and len(lignes) == position + nombre_ajoute + 1, "second compte invalide")
        contenu = lignes[1:position] + lignes[position + 1:]
        require(bool(contenu) and all(ligne for ligne in contenu), "journal vide ou ligne vide")
        return f"{len(contenu)}\n{contenu[-1]}"

    if nom == "b1_notes_json":
        etudiants = b1_etudiants(entree, 1)
        notes_par_nom = {nom_etudiant: notes[0] for nom_etudiant, notes in etudiants}
        return f"{len(notes_par_nom)}\n{max(notes_par_nom.values())}"

    if nom == "b1_extremites":
        notes = b1_notes(entree)
        return f"{notes[0]} - {notes[-1]}"

    if nom == "b1_entrees_robustes":
        lignes = b1_lignes_comptees(entree)
        valeurs = []
        for ligne in lignes:
            try:
                valeurs.append(int(ligne))
            except ValueError:
                continue
        return f"{sum(valeurs)}\n{len(lignes) - len(valeurs)}"

    if nom == "b1_racine":
        nombre = b1_entiers_bornes(entree, 1)[0]
        if nombre < 0:
            return "erreur"
        racine = Decimal(nombre).sqrt()
        return format(racine.quantize(Decimal("0.01"), rounding=ROUND_HALF_EVEN), "f")

    if nom == "b1_nom_age":
        champs = entree.split()
        require(len(champs) == 2 and re.fullmatch(r"[A-Za-z]{1,63}", champs[0]), "nom et âge attendus")
        age = int(champs[1])
        require(0 <= age <= 120, "âge hors domaine")
        return f"Nom : {champs[0]}, age : {age}"

    if nom == "b1_fahrenheit_c":
        champs = entree.split()
        require(len(champs) == 1, "température attendue")
        temperature = Decimal(champs[0])
        require(temperature.is_finite() and -1000 <= temperature <= 1000, "température hors domaine")
        require(temperature * 2 == (temperature * 2).to_integral_value(), "pas de demi-degré requis")
        resultat = temperature * Decimal(9) / Decimal(5) + Decimal(32)
        return f"F = {resultat.quantize(Decimal('0.01'), rounding=ROUND_HALF_EVEN):.2f}"

    if nom in {"b1_rectangle", "b1_somme_produit_c", "b1_echanger_c", "b1_point_c"}:
        premier, second = b1_entiers_bornes(entree, 2)
        if nom == "b1_rectangle":
            require(premier > 0 and second > 0 and premier * second < 2 ** 31, "rectangle hors domaine")
            return f"Aire : {premier * second}\nPerimetre : {2 * (premier + second)}"
        if nom == "b1_somme_produit_c":
            require(-(2 ** 31) <= premier * second < 2 ** 31, "produit hors domaine")
            return f"Somme : {premier + second}\nProduit : {premier * second}"
        if nom == "b1_echanger_c":
            return f"a = {second}, b = {premier}"
        return f"Point({premier}, {second})"

    if nom == "b1_moyenne_c":
        return f"Moyenne : {b1_moyenne(b1_entiers_bornes(entree, 3))}"

    if nom == "b1_maximum_c":
        return f"Max : {sorted(b1_entiers_bornes(entree, 3))[-1]}"

    if nom == "b1_table_c":
        nombre = b1_entiers_bornes(entree, 1)[0]
        return "\n".join(f"{nombre} x {indice} = {nombre * indice}" for indice in range(1, 11))

    if nom in {"b1_somme_max_c", "b1_inverse_c", "b1_tableau_somme_c"}:
        valeurs = b1_tableau(entree)
        if nom == "b1_somme_max_c":
            return f"Somme : {sum(valeurs)}\nMax : {max(valeurs)}"
        if nom == "b1_inverse_c":
            return " ".join(str(valeur) for valeur in reversed(valeurs))
        return f"Somme : {sum(valeurs)}"

    if nom == "b1_voyelles":
        champs = entree.split()
        require(len(champs) == 1 and re.fullmatch(r"[A-Za-z]{1,127}", champs[0]), "mot hors domaine")
        mot = champs[0].lower()
        return f"Voyelles : {sum(mot.count(voyelle) for voyelle in 'aeiouy')}"

    if nom == "b1_parite_c":
        nombre = b1_entiers_bornes(entree, 1)[0]
        return "Impair" if nombre & 1 else "Pair"

    if nom == "b1_factorielle_c":
        nombre = b1_entiers_bornes(entree, 1)[0]
        require(0 <= nombre <= 20, "factorielle hors domaine")
        resultat = math.factorial(nombre)
        require(resultat <= b1_limite_long_c(), "factorielle non représentable en long pour ce compilateur")
        return f"Factorielle : {resultat}"

    if nom == "b1_etudiant_c":
        champs = entree.split()
        require(len(champs) == 2 and re.fullmatch(r"[A-Za-z]{1,63}", champs[0]), "étudiant invalide")
        note = Decimal(champs[1])
        require(note.is_finite() and 0 <= note <= 20, "note hors domaine")
        require(note * 4 == (note * 4).to_integral_value(), "seuls les quarts de point sont couverts")
        return f"Nom : {champs[0]}\nNote : {note:.2f}"

    raise ValueError("oracle B1 non disponible")


def calculer(nom, entree):
    if nom.startswith("web_b1_"):
        return calculer_web_b1(nom, entree)
    if nom.startswith("php_b1_"):
        return calculer_php_b1(nom, entree)
    if nom.startswith("php_b2_"):
        return calculer_php_b2(nom, entree)
    if nom in ORACLES_B1_PROGRAMMES:
        return calculer_b1(nom, entree)

    if nom in {"fahrenheit_python", "fahrenheit_java"}:
        values = entree.split()
        require(len(values) == 1, "une température est attendue")
        temperature = Decimal(values[0])
        result = temperature * Decimal(9) / Decimal(5) + Decimal(32)
        return format(result.quantize(Decimal("0.1"), rounding=ROUND_HALF_EVEN), "f")

    if nom == "moyenne_trois":
        values = nombres(entree, 3)
        require(all(0 <= value <= 20 for value in values), "note hors plage")
        result = Decimal(sum(values)) / Decimal(3)
        return format(result.quantize(Decimal("0.01"), rounding=ROUND_HALF_EVEN), "f")

    if nom == "duree":
        total = nombres(entree, 1)[0]
        require(total >= 0, "durée négative")
        hours, remaining = divmod(total, 3600)
        minutes, seconds = divmod(remaining, 60)
        return f"{hours} h {minutes} min {seconds} s"

    if nom == "requete_http":
        fields = entree.split()
        require(len(fields) == 3 and fields[1].startswith("/") and fields[2].startswith("HTTP/"), "ligne HTTP hors contrat")
        return f"Methode: {fields[0]}\nChemin: {fields[1]}\nVersion: {fields[2]}"

    if nom in {"bonjour_c", "bonjour_php"}:
        words = entree.split()
        require(len(words) == 1 and len(words[0]) <= 63, "prénom hors contrat")
        return (f"Bonjour, {words[0]} !" if nom == "bonjour_c" else f"Bonjour {words[0]} !")

    if nom in {"somme_c", "somme_java"}:
        values = nombres(entree, 2)
        result = sum(values)
        require(-(2 ** 31) <= result < 2 ** 31 and all(-(2 ** 31) <= value < 2 ** 31 for value in values), "entier hors plage")
        return f"{'Somme' if nom == 'somme_c' else 'somme'} : {result}"

    if nom == "carre_cpp":
        number = nombres(entree, 1)[0]
        require(number * number < 2 ** 31, "carré hors plage")
        return f"Carre : {number * number}"

    if nom == "aire_cpp":
        width, height = nombres(entree, 2)
        require(0 <= width * height < 2 ** 31 and width > 0 and height > 0, "dimensions hors contrat")
        return f"Aire : {width * height}"

    if nom == "total_php":
        price, quantity = nombres(entree, 2)
        require(price >= 0 and quantity >= 0, "commande négative")
        return f"Total : {price * quantity} EUR"

    if nom == "element_react":
        parts = entree.strip().split(" ")
        require(len(parts) >= 2 and parts[0], "élément React incomplet")
        result = {"type": parts[0], "props": {"children": " ".join(parts[1:])}}
        return json.dumps(result, ensure_ascii=False, separators=(",", ":"))

    if nom == "statut_react":
        parts = entree.split()
        require(len(parts) == 2 and parts[0] in {"0", "1"}, "statut hors contrat")
        return f'<Dashboard user="{parts[1]}" />' if parts[0] == "1" else '<LoginForm redirect="/login" />'

    if nom == "chemins":
        lines = entree.splitlines()
        require(len(lines) >= 2 and lines[0].startswith("/"), "répertoire courant invalide")
        count = int(lines[1])
        require(count >= 0 and len(lines) == count + 2, "nombre de chemins incohérent")
        return "\n".join("absolu" if path.startswith("/") else f"relatif → {lines[0]}/{path}" for path in lines[2:])

    if nom == "isolation_linux":
        dictionary = {
            "PID": ("NAMESPACE", "Arborescence des processus isolée (le conteneur voit son propre PID 1)"),
            "NET": ("NAMESPACE", "Interfaces reseau, tables de routage et ports isoles"),
            "MNT": ("NAMESPACE", "Points de montage de systeme de fichiers et arborescence racine"),
            "CPU_LIMIT": ("CGROUP", "Plafond de temps de calcul CPU (quotas CFS)"),
        }
        lines = entree.splitlines()
        require(bool(lines) and all(line and not line.isspace() for line in lines), "codes vides")
        output = []
        for code in lines:
            value = dictionary.get(code.upper())
            if value is None:
                require(code.upper() not in {"IPC", "UTS", "USER", "MEM_LIMIT", "IO_THROTTLE"}, "code non implémenté dans cet oracle")
                output.append(f"{code} -> INCONNU")
            else:
                output.append(f"{code} -> PRIMITIVE: {value[0]} | {value[1]}")
        return "\n".join(output)

    if nom == "profil_syscall":
        output = []
        for line in entree.splitlines():
            require(line.startswith("SYSCALL "), "ligne syscall invalide")
            fields = {}
            for field in ("pid", "name", "ret", "time_us"):
                found = re.search(r"(?:^|\s)" + field + r"=([^\s]+)", line)
                require(found is not None, f"champ {field} absent")
                fields[field] = found.group(1)
            duration = int(fields["time_us"])
            require(duration >= 0, "durée invalide")
            failed = fields["ret"].startswith("-") or fields["ret"] in {"ENOENT", "EACCES", "EPERM", "EBADF"}
            status = "ERROR" if failed else "SUCCESS"
            error = fields["ret"] if failed else "NONE"
            slow = "OUI" if duration > 5000 else "NON"
            output.append(f'SYSCALL_PROFILE pid={fields["pid"]} name={fields["name"]} status={status} err={error} duration_us={duration} slow={slow}')
        return "\n".join(output)

    if nom == "references_git_modele":
        references = {}
        output = []
        for line in entree.splitlines():
            reference = re.fullmatch(r"REF name=(\S+) target=(.+)", line)
            request = re.fullmatch(r"RESOLVE name=(\S+)", line)
            if reference:
                references[reference.group(1)] = reference.group(2)
                continue
            require(request is not None, "ligne de référence invalide")
            name = request.group(1)
            path = []
            current = name
            while current in references and current not in path:
                path.append(current)
                target = references[current]
                if not target.startswith("ref: "):
                    require(re.fullmatch(r"[0-9a-f]{40}", target) is not None, "hash invalide")
                    if name == "HEAD":
                        state = "DETACHED_HEAD" if len(path) == 1 else ("BRANCH_REF" if path[1].startswith("refs/heads/") else "SYMBOLIC_REF")
                    else:
                        state = "DIRECT_REF" if len(path) == 1 else "SYMBOLIC_REF"
                    output.append(f"RESOLVED name={name} commit={target} state={state} path={' -> '.join(path)}")
                    break
                current = target[5:]
            else:
                output.append(f"RESOLVED name={name} status={'CYCLE' if current in path else 'NOT_FOUND'}")
        return "\n".join(output)

    if nom == "types_csharp":
        known = {}
        output = []
        value_types = {"int", "double", "bool", "char", "float", "long"}
        for declaration in (item.strip() for item in entree.split(";") if item.strip()):
            match = re.fullmatch(r"(int|double|bool|char|float|long|string|object)\s+(\w+)\s*=\s*(.+)", declaration)
            require(match is not None, "déclaration non couverte")
            kind, name, value = match.groups()
            cast = re.fullmatch(r"\((\w+)\)(\w+)", value)
            if cast:
                require(cast.group(1) == kind and known.get(cast.group(2)) == "object" and kind in value_types, "cast non couvert")
                operation = "UNBOXING"
            elif value in known:
                if kind == "object" and known[value] in value_types:
                    operation = "BOXING"
                else:
                    require(kind == known[value], "copie de type non couverte")
                    operation = "COPIE_VALEUR" if kind in value_types else "COPIE_REF"
            else:
                require(kind in value_types or (kind == "string" and value.startswith('"') and value.endswith('"')), "littéral non couvert")
                operation = "ALLOCATION"
            known[name] = kind
            memory = "Stack" if kind in value_types else "Heap"
            output.append(f"{name}: Type={kind} | Mem={memory} | Op={operation}")
        require(bool(output), "aucune déclaration")
        return "\n".join(output)

    if nom == "factures":
        with base_memoire(entree, ["factures"]) as database:
            rows = database.execute("SELECT id, montant_ht, remise FROM factures").fetchall()
        rows = sorted(rows, key=lambda row: row[0])
        return {"colonnes": ["id", "montant_net"], "lignes": [[str(identifier), str(amount - (discount if discount is not None else 0))] for identifier, amount, discount in rows]}

    if nom == "clients_sans_commandes":
        with base_memoire(entree, ["clients", "commandes"]) as database:
            clients = database.execute("SELECT id, nom FROM clients").fetchall()
            orders = database.execute("SELECT id, client_id FROM commandes").fetchall()
        ordered_ids = {client_id for _, client_id in orders if client_id is not None}
        rows = sorted((identifier, name) for identifier, name in clients if identifier not in ordered_ids)
        return {"colonnes": ["id", "nom"], "lignes": [[str(identifier), name] for identifier, name in rows]}

    if nom == "frequence_windows":
        table = {
            "hebdomadaire": "analyse des logs",
            "mensuelle": "test de sauvegarde",
            "trimestrielle": "test PRA",
            "annuelle": "audit securite",
        }
        require("\n" not in entree and "\r" not in entree, "une seule ligne attendue")
        return "action : " + table.get(entree.casefold(), "inconnue")

    if nom == "scenario_flask":
        table = {
            "creation": "201 Created", "lecture": "200 OK", "succes": "200 OK",
            "suppression": "204 No Content", "introuvable": "404 Not Found",
            "invalide": "400 Bad Request", "non_autorise": "401 Unauthorized", "interdit": "403 Forbidden",
        }
        require(entree in table, "scénario hors domaine spécifié")
        return table[entree]

    raise ValueError("oracle non disponible")
