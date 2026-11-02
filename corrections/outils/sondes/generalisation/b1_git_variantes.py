"""Construit deux mutations de logique à partir d'une version du corrigé."""


def remplacer(source, ancien, nouveau):
    if source.count(ancien) != 1:
        raise ValueError(f"ancre de mutation absente ou multiple : {ancien!r}")
    return source.replace(ancien, nouveau, 1)


def construire(identifiant, solution):
    if identifiant == "gt-c1-e1":
        definitions = [
            ("identite_partielle", "Considère qu'une seule composante de l'identité suffit.", [('[ "$has_name" = "1" ] && [ "$has_email" = "1" ]', '[ "$has_name" = "1" ] || [ "$has_email" = "1" ]')]),
            ("configuration_indifferenciee", "Traite toute configuration comme un courriel configuré.", [('[ "$cle" = "user.email" ] && has_email=1', 'has_email=1')]),
        ]
    elif identifiant == "gt-c1-e2":
        definitions = [
            ("numero_constant", "Réutilise le numéro 0001 pour chaque commit accepté.", [('numero=$((numero + 1))', 'numero=1')]),
            ("refus_numerotes", "Incrémente le compteur même quand l'identité est absente.", [('  elif [ "$op" = "commit" ]; then\n    if [ "$has_name" = "1" ] && [ "$has_email" = "1" ]; then\n      numero=$((numero + 1))', '  elif [ "$op" = "commit" ]; then\n    numero=$((numero + 1))\n    if [ "$has_name" = "1" ] && [ "$has_email" = "1" ]; then')]),
        ]
    elif identifiant == "gt-c1-e3":
        definitions = [
            ("efface_toutes_modifications", "Réindexer un fichier annule à tort le compte des autres modifications.", [('modifies=$((modifies - 1))', 'modifies=0')]),
            ("compte_modifications_repetees", "Compte plusieurs fois les modifications d'un même fichier.", [('if [ "$courant" = "indexe" ] && [ "${modification[$fichier]:-0}" = "0" ]; then', 'if [ "$courant" = "indexe" ]; then')]),
        ]
    elif identifiant == "gt-c2-e1":
        definitions = [
            ("cumul_remplace", "Remplace le cumul par la taille du dernier index commité.", [('cumul=$((cumul + taille_index))', 'cumul=$taille_index')]),
            ("commit_vide_compte", "Compte un fichier fictif lors d'un commit avec un index vide.", [('cumul=$((cumul + taille_index))', 'cumul=$((cumul + taille_index + (taille_index == 0)))')]),
        ]
    elif identifiant == "gt-c2-e2":
        definitions = [
            ("reset_inconnu_vide_index", "Vide l'index après un reset sur un nom absent.", [('[ "$trouve" = "0" ] && echo "non indexé"', 'if [ "$trouve" = "0" ]; then echo "non indexé"; noms=(); vivant=(); fi')]),
            ("reajout_ancienne_place", "Replace un fichier réajouté à sa première position historique.", [('    noms+=("$fichier")\n    vivant+=(1)', '    deja=0\n    for idx in "${!noms[@]}"; do\n      if [ "${noms[$idx]}" = "$fichier" ]; then\n        vivant[$idx]=1\n        deja=1\n        break\n      fi\n    done\n    if [ "$deja" = "0" ]; then noms+=("$fichier"); vivant+=(1); fi')]),
        ]
    elif identifiant == "gt-c2-e3":
        definitions = [
            ("point_final_oublie", "Vérifie à tort le point d'exclamation au lieu du point final.", [('elif [ "$dernier" = "." ]; then', 'elif [ "$dernier" = "!" ]; then')]),
            ("limite_exclue", "Refuse à tort les messages de exactement cinquante caractères.", [('[ "${#ligne}" -gt 50 ]', '[ "${#ligne}" -ge 50 ]')]),
        ]
    elif identifiant == "gt-c3-e1":
        definitions = [
            ("log_destructif", "Efface l'historique après son affichage.", [('      echo "${shas[$k]} ${msgs[$k]}"\n    done\n', '      echo "${shas[$k]} ${msgs[$k]}"\n    done\n    shas=()\n    msgs=()\n')]),
            ("sha_un_chiffre", "Fait reboucler à tort le compteur SHA sur un seul chiffre.", [('numero=$((numero + 1))', 'numero=$(( (numero + 1) % 10 ))')]),
        ]
    elif identifiant == "gt-c3-e2":
        if 'if [ "$a" = "hard" ]; then' in solution:
            mixed = [('if [ "$a" = "hard" ]; then', 'if [ "$a" != "soft" ]; then')]
        else:
            mixed = [('if [ "$k" -gt 0 ] || [ "$index" = "plein" ]; then modifs=1; fi', 'modifs=0')]
        definitions = [
            ("annule_tout", "Annule tous les commits au lieu du nombre demandé.", [('k="$b"', 'k="$commits"')]),
            ("mixed_efface_copie", "Efface les modifications de la copie pour mixed comme pour hard.", mixed),
        ]
    elif identifiant == "gt-c3-e3":
        definitions = [
            ("revert_dernier", "Annule toujours le dernier commit quel que soit le rang demandé.", [('idx=$((total - reste))', 'idx=$((total - 1))')]),
            ("sha_revert_reutilise", "Réutilise le dernier SHA pour le commit de revert.", [('      cible="${msgs[$idx]}"\n      numero=$((numero + 1))', '      cible="${msgs[$idx]}"\n      numero=$((numero))')]),
        ]
    elif identifiant == "gt-c4-e1":
        definitions = [
            ("branch_bascule", "Bascule automatiquement lors de la création d'une branche.", [('branches+=("$nom")', 'branches+=("$nom")\n      courante="$nom"')]),
            ("checkout_inconnu_accepte", "Bascule sur une branche inconnue sans signaler l'erreur.", [('echo "inconnue"', 'courante="$nom"')]),
        ]
    elif identifiant == "gt-c4-e2":
        definitions = [
            ("sans_heritage", "Initialise chaque branche à zéro au lieu d'hériter du parent.", [('comptes+=("${comptes[$courante]}")', 'comptes+=(0)')]),
            ("branch_revient_main", "Revient à main après la création d'une branche.", [('comptes+=("${comptes[$courante]}")', 'comptes+=("${comptes[$courante]}")\n    courante=0')]),
        ]
    elif identifiant == "gt-c4-e3":
        if 'touche["$courante:$a"]=1' in solution:
            conflits_python = [('[ "$br" = "$a" ] && [ -n "${touche[$courante:$fic]:-}" ] && conflit=1', '[ "$br" = "$a" ] && [ -n "${touche[$courante:$fic]:-}" ] && [[ "$fic" = *.py ]] && conflit=1')]
            dernier_fichier = [('touche["$courante:$a"]=1', 'touche["$courante"]="$a"'), ('    conflit=0\n    for cle in "${!touche[@]}"; do\n      br="${cle%%:*}"\n      fic="${cle#*:}"\n      [ "$br" = "$a" ] && [ -n "${touche[$courante:$fic]:-}" ] && conflit=1\n    done', '    conflit=0\n    if [ -n "${touche[$a]:-}" ] && [ "${touche[$a]}" = "${touche[$courante]:-}" ]; then conflit=1; fi')]
        else:
            conflits_python = [('if [ -n "${modifications[$fichier]:-}" ]; then conflit=1; fi', 'if [ -n "${modifications[$fichier]:-}" ] && [[ "$fichier" = *.py ]]; then conflit=1; fi')]
            dernier_fichier = [('modifications["$fichier"]=1', 'modifications=()\n        modifications["$fichier"]=1')]
        definitions = [
            ("conflits_python_seulement", "Ne détecte que les conflits sur les fichiers .py.", conflits_python),
            ("dernier_fichier_seulement", "Ne retient que le dernier fichier modifié d'au moins un côté.", dernier_fichier),
        ]
    elif identifiant == "gt-c5-e1":
        definitions = [
            ("ignore_tierce", "Accepte un push sans vérifier si un tiers a poussé depuis le pull.", [('if [ "$local" -gt "$distant" ] && [ "$frais" = "1" ]; then', 'if [ "$local" -gt "$distant" ]; then')]),
            ("pull_remplace_local", "Remplace le compteur local par le distant même si le local est supérieur.", [('    if [ "$distant" -gt "$local" ]; then\n      local="$distant"\n    fi', '    local="$distant"')]),
        ]
    elif identifiant == "gt-c5-e2":
        definitions = [
            ("clone_synchronise", "Répercute automatiquement les commits distants dans le clone.", [('    if [ -n "$local" ]; then\n      :\n    fi', '    if [ -n "$local" ]; then\n      local="$distant"\n    fi')]),
            ("clone_vide", "Crée un clone vide au lieu de copier les commits distants.", [('    local="$distant"', '    local=0')]),
        ]
    elif identifiant == "gt-c5-e3":
        definitions = [
            ("fetch_incremental", "Incrémente le suivi d'une unité au lieu de recopier le distant.", [('suivi="$distant"', 'suivi=$((suivi + 1))')]),
            ("suivi_automatique", "Actualise le suivi automatiquement après le premier fetch.", [('distant=$((distant + 1))', 'distant=$((distant + 1))\n    if [ "$suivi" -gt 0 ]; then suivi="$distant"; fi')]),
        ]
    elif identifiant == "gt-c6-e1":
        definitions = [
            ("pile_fifo", "Dépile la plus ancienne remise au lieu de la plus récente.", [('dernier=$((total - 1))', 'dernier=0')]),
            ("pop_ecrase_copie", "Remplace les modifications locales au lieu d'y ajouter la remise.", [('copie=$((copie + ${remises[$dernier]}))', 'copie=${remises[$dernier]}')]),
        ]
    elif identifiant == "gt-c6-e2":
        definitions = [
            ("suffixes_ignores", "Ne traite pas les motifs de suffixe de type *.extension.", [(r'\**) [ "${fichier: -${#motif} + 1}" = "${motif:1}" ] && ignore=1 ;;', r'\**) : ;;')]),
            ("prefixe_trop_large", "Confond un dossier ignoré avec tout nom ayant le même préfixe.", [('[ "${fichier#"${motif%/}"/}" != "$fichier" ]', '[ "${fichier#"${motif%/}"}" != "$fichier" ]')]),
        ]
    elif identifiant == "gt-c6-e3":
        definitions = [
            ("dernier_maximum", "Retient le dernier fichier en cas d'égalité sur le maximum.", [('[ "$taille" -gt "$max" ]', '[ "$taille" -ge "$max" ]')]),
            ("moyenne_inclusive", "Inclut les fichiers égaux à la moyenne entière.", [('[ "${tailles[$idx]}" -gt "$moyenne" ]', '[ "${tailles[$idx]}" -ge "$moyenne" ]')]),
        ]
    else:
        raise ValueError("fiche hors du périmètre B1 Git")
    variantes = []
    for nom, description, substitutions in definitions:
        source = solution
        for ancien, nouveau in substitutions:
            source = remplacer(source, ancien, nouveau)
        if source == solution:
            raise ValueError("variante identique au corrigé")
        variantes.append({"nom": nom, "description": description, "source": source})
    return variantes
