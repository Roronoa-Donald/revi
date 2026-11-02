'use strict';

module.exports = {
  'lx-c1-e2': [
    ['confond les répertoires variables et la configuration', '/var)  echo "donnees variables"', '/var)  echo "configuration"'],
    ['ne reconnaît pas les périphériques', '/dev)  echo "fichiers de peripheriques"', '/dev)  echo "inconnu"']
  ],
  'lx-c1-e3': [
    ['classe les répertoires comme fichiers', 'ordre+=("r:$chemin")', 'ordre+=("f:$chemin")'],
    ['classe les fichiers comme répertoires', 'ordre+=("f:$chemin")', 'ordre+=("r:$chemin")']
  ],
  'lx-c2-e1': [
    ['ne reconnaît pas les répertoires', 'type="repertoire"', 'type="fichier"'],
    ['copie les droits du propriétaire pour le groupe', 'g=${droits:4:3}', 'g=${droits:1:3}']
  ],
  'lx-c2-e2': [
    ['compte la lecture comme deux au lieu de quatre', 'valeur=$((valeur + 4))', 'valeur=$((valeur + 2))'],
    ['omet la valeur de l’exécution', 'valeur=$((valeur + 1))', 'valeur=$((valeur + 0))']
  ],
  'lx-c2-e3': [
    ['inverse le test du fichier final', '-n "${fichiers[$courant]+x}"', '-z "${fichiers[$courant]+x}"'],
    ['confond une boucle avec un lien cassé', 'echo "boucle"', 'echo "casse"']
  ],
  'lx-c3-e1': [
    ['recherche dans le chemin entier plutôt que le nom de base', 'base="${chemin##*/}"', 'base="$chemin"'],
    ['ne reconnaît pas le mode suffixe', '"$genre" = "suffixe"', '"$genre" = "prefixe"']
  ],
  'lx-c3-e2': [
    ['inclut à tort la taille égale au seuil', '"${tailles[$i]}" -gt "$seuil_octets"', '"${tailles[$i]}" -ge "$seuil_octets"'],
    ['trie les tailles de la plus petite à la plus grande', '"${retenus_taille[$j]}" -lt "$cle_taille"', '"${retenus_taille[$j]}" -gt "$cle_taille"']
  ],
  'lx-c3-e3': [
    ['classe UID 1000 parmi les systèmes', '"$uid" -lt 1000', '"$uid" -le 1000'],
    ['confond le nombre de comptes système et humains', 'echo "systeme : $systeme"', 'echo "systeme : $humains"']
  ],
  'lx-c4-e1': [
    ['oublie le droit de lecture pour le chiffre quatre', '"$chiffre" -ge 4', '"$chiffre" -gt 4'],
    ['oublie le droit d’écriture pour le chiffre deux', '"$chiffre" -ge 2', '"$chiffre" -gt 2']
  ],
  'lx-c4-e2': [
    ['applique la classe groupe aux autres', 'g) positions="$positions 3 4 5"', 'g) positions="$positions 6 7 8"'],
    ['applique la classe propriétaire aux autres', 'u) positions="$positions 0 1 2"', 'u) positions="$positions 6 7 8"']
  ],
  'lx-c4-e3': [
    ['lit les droits du groupe pour le propriétaire', 'u) base=0', 'u) base=3'],
    ['lit la position écriture pour exécution', 'x) decalage=2', 'x) decalage=1']
  ],
  'lx-c5-e1': [
    ['commence les UID à 999', 'uid_suivant=1000', 'uid_suivant=999'],
    ['confond compte existant et compte inconnu', 'echo "existe"', 'echo "inconnu"']
  ],
  'lx-c5-e2': [
    ['affiche les groupes dans l’ordre inverse de création', 'groupes+=("$arg1")', 'groupes=("$arg1" "${groupes[@]}")'],
    ['confond groupe inexistant et utilisateur sans groupe', 'echo "groupe inconnu"', 'echo "aucun"']
  ],
  'lx-c5-e3': [
    ['omet les champs commençant par ! sans être égaux à !', "'!'*|'*')", "'!'|'*')"],
    ['omet les champs vides dans le total', 'champs_vides=$((champs_vides + 1))', 'champs_vides=$((champs_vides + 0))']
  ],
  'lx-c6-e1': [
    ['utilise echo pour un mot pouvant être une option', 'printf \'%s\\n\' "$mot"', 'echo "$mot"'],
    ['convertit à tort les mots en minuscules', 'printf \'%s\\n\' "$mot"', 'printf \'%s\\n\' "${mot,,}"']
  ],
  'lx-c6-e2': [
    ['ne déclenche l’alarme qu’à partir de deux CRIT', '"$crit" -ge 1', '"$crit" -gt 1'],
    ['ne déclenche la surveillance qu’à partir de deux WARN', '"$warn" -ge 1', '"$warn" -gt 1']
  ],
  'lx-c6-e3': [
    ['remplace le premier maximum en cas d’égalité', '"$prix" -gt "$max_prix"', '"$prix" -ge "$max_prix"'],
    ['compte les voitures au lieu de sommer les prix', 'budget=$((budget + prix))', 'budget=$((budget + 1))']
  ]
};
