#!/usr/bin/env bash
set -euo pipefail
umask 077

paquet=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
racine=$(cd -- "$paquet/../../../.." && pwd -P)
if [[ $# -gt 0 ]]; then
  if [[ $# -ne 2 || $1 != --repo ]]; then
    printf 'Usage : %s [--repo RACINE]\n' "$0" >&2
    exit 2
  fi
  racine=$(cd -- "$2" && pwd -P)
fi

erreur() {
  printf 'Banc B3 Linux : %s\n' "$1" >&2
  exit 2
}

[[ -f "$racine/server/exercises/index.js" && -f "$racine/server/exercises/b3-linux.js" ]] || erreur 'Catalogue introuvable.'
[[ -x /usr/bin/python3 && -x /usr/bin/prlimit && -x /bin/bash ]] || erreur 'Python, prlimit ou Bash absent.'
bwrap_bin=$(command -v bwrap || true)
node_bin=$(command -v node || true)
[[ -n "$bwrap_bin" && -n "$node_bin" ]] || erreur 'Bubblewrap ou Node absent.'
bwrap_bin=$(readlink -f -- "$bwrap_bin")
node_bin=$(readlink -f -- "$node_bin")
[[ -x "$bwrap_bin" && -x "$node_bin" ]] || erreur 'Exécutables requis inaccessibles.'

base=${TMPDIR:-/tmp}
base=$(cd -- "$base" && pwd -P)
[[ "$base" != "$racine" && "$base" != "$racine/"* ]] || erreur 'TMPDIR dans le dépôt interdit.'
temporaire=$(mktemp -d "$base/revi-b3-linux.XXXXXXXX")
trap 'rm -rf -- "$temporaire"' EXIT
mkdir -p "$temporaire/trusted" "$temporaire/project/server/exercises" "$temporaire/history" "$temporaire/toolchain" "$temporaire/etc"

copier() {
  local source=$1 destination=$2
  [[ -f "$source" && ! -L "$source" ]] || erreur "Source absente ou liée : $source"
  mkdir -p -- "$(dirname -- "$destination")"
  cp -- "$source" "$destination"
  cmp -s -- "$source" "$destination" || erreur "Source modifiée pendant la copie : $source"
}

fichiers_paquet=(
  banc.py oracles.py algo_b1.py algo_b3_1.py algo_b3_2.py linux_b2.py b1_linux.py b1_git.py
  docker_b2.py linux_b3.py b3_github.py react_b2.py rd_winserver.py admin_vm.py flask_b2.py java_b2.py
  cas_b3_linux.json mutants_b3_linux.json banc_b3_linux.py cas.json rejouer_b3_linux.sh
)
for fichier in "${fichiers_paquet[@]}"; do
  copier "$paquet/$fichier" "$temporaire/trusted/$fichier"
done
copier "$node_bin" "$temporaire/toolchain/node"
copier "$racine/tests/b3-linux-lot1.test.js" "$temporaire/history/b3-linux-lot1.test.js"
copier "$racine/corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/b3-linux.json" "$temporaire/history/fixture-b3-linux.json"
copier "$racine/corrections/resultats/generalisation-lot1-partie2-complement.json" "$temporaire/history/generalisation-lot1-partie2-complement.json"
copier "$racine/b3-linux/chapitres/chapitre2.html" "$temporaire/history/b3-linux-chapitre2.html"

catalogue="$racine/server/exercises"
[[ ! -L "$catalogue" ]] || erreur 'Catalogue lié refusé.'
find "$catalogue" -type l -print -quit > "$temporaire/liens"
[[ ! -s "$temporaire/liens" ]] || erreur 'Lien symbolique dans le catalogue refusé.'
find "$catalogue" -type f \( -name '*.js' -o -name '*.json' \) -printf '%P\0' | sort -z > "$temporaire/inventaire"
while IFS= read -r -d '' relatif; do
  copier "$catalogue/$relatif" "$temporaire/project/server/exercises/$relatif"
done < "$temporaire/inventaire"

printf 'sandbox:x:%s:%s:Sandbox:/tmp:/bin/sh\n' "$(id -u)" "$(id -g)" > "$temporaire/etc/passwd"
printf 'sandbox:x:%s:\n' "$(id -g)" > "$temporaire/etc/group"
printf 'passwd: files\ngroup: files\n' > "$temporaire/etc/nsswitch.conf"
printf 'NAME=Sandbox\nID=linux\n' > "$temporaire/etc/os-release"

options=(--die-with-parent --unshare-all --new-session --clearenv --cap-drop ALL --ro-bind /usr /usr)
for chemin in /bin /lib /lib64; do
  if [[ -L "$chemin" ]]; then
    options+=(--symlink "$(readlink -- "$chemin")" "$chemin")
  elif [[ -d "$chemin" ]]; then
    options+=(--ro-bind "$chemin" "$chemin")
  fi
done
head_courant=$(git -C "$racine" rev-parse --verify HEAD 2>/dev/null || printf 'indisponible')
options+=(
  --dir /etc --ro-bind "$temporaire/etc/passwd" /etc/passwd
  --ro-bind "$temporaire/etc/group" /etc/group
  --ro-bind "$temporaire/etc/nsswitch.conf" /etc/nsswitch.conf
  --ro-bind "$temporaire/etc/os-release" /etc/os-release
  --proc /proc --dev /dev --size 268435456 --tmpfs /tmp
  --dir /toolchain --ro-bind "$temporaire/toolchain/node" /toolchain/node
  --ro-bind "$bwrap_bin" /toolchain/bwrap
  --ro-bind "$temporaire/trusted" /trusted
  --ro-bind "$temporaire/project" /project
  --ro-bind "$temporaire/history" /history
  --chdir /tmp --setenv PATH /usr/bin:/bin --setenv LANG C.UTF-8
  --setenv TMPDIR /tmp --setenv PYTHONDONTWRITEBYTECODE 1
  --setenv AUDIT_HOST_NET_NS "$(readlink /proc/self/ns/net)"
  --setenv AUDIT_HEAD "$head_courant"
)
if [[ -f /etc/ld.so.cache ]]; then
  options+=(--ro-bind /etc/ld.so.cache /etc/ld.so.cache)
fi

printf 'Banc B3 Linux : exécution isolée des corrigés et des variantes.\n' >&2
if "$bwrap_bin" "${options[@]}" /usr/bin/python3 -I /trusted/banc_b3_linux.py < /dev/null > "$temporaire/rapport.json"; then
  statut=0
else
  statut=$?
fi

for fichier in "${fichiers_paquet[@]}"; do
  cmp -s -- "$paquet/$fichier" "$temporaire/trusted/$fichier" || erreur "Fichier du banc modifié pendant le lancement : $fichier"
done
cmp -s -- "$node_bin" "$temporaire/toolchain/node" || erreur 'Node modifié pendant le lancement.'
cmp -s -- "$racine/tests/b3-linux-lot1.test.js" "$temporaire/history/b3-linux-lot1.test.js" || erreur 'Anciens tests modifiés pendant le lancement.'
cmp -s -- "$racine/corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/b3-linux.json" "$temporaire/history/fixture-b3-linux.json" || erreur 'Fixture précédente modifiée pendant le lancement.'
cmp -s -- "$racine/corrections/resultats/generalisation-lot1-partie2-complement.json" "$temporaire/history/generalisation-lot1-partie2-complement.json" || erreur 'Rapport précédent modifié pendant le lancement.'
cmp -s -- "$racine/b3-linux/chapitres/chapitre2.html" "$temporaire/history/b3-linux-chapitre2.html" || erreur 'Page générée modifiée pendant le lancement.'
find "$catalogue" -type l -print -quit > "$temporaire/liens-apres"
[[ ! -s "$temporaire/liens-apres" ]] || erreur 'Lien symbolique apparu pendant le lancement.'
find "$catalogue" -type f \( -name '*.js' -o -name '*.json' \) -printf '%P\0' | sort -z > "$temporaire/inventaire-apres"
cmp -s -- "$temporaire/inventaire" "$temporaire/inventaire-apres" || erreur 'Inventaire du catalogue modifié pendant le lancement.'
while IFS= read -r -d '' relatif; do
  cmp -s -- "$catalogue/$relatif" "$temporaire/project/server/exercises/$relatif" || erreur "Catalogue modifié pendant le lancement : $relatif"
done < "$temporaire/inventaire"

[[ -s "$temporaire/rapport.json" ]] || erreur "Aucun rapport produit ; code du processus $statut."
/usr/bin/python3 -I - "$temporaire/rapport.json" "$statut" <<'PY'
import json, sys
with open(sys.argv[1], encoding="utf-8") as source:
    rapport = json.load(source)
statut = int(sys.argv[2])
if statut not in (0, 1) or rapport.get("code_sortie") != statut:
    raise SystemExit("Banc B3 Linux : code de sortie incohérent avec le rapport.")
rapport["integrite_copie"] = {"sources_comparees_avant_et_apres": True, "instantane_atomique": False}
print(json.dumps(rapport, ensure_ascii=False, indent=2))
PY
exit "$statut"
