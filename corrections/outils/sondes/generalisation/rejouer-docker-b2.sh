#!/usr/bin/env bash
set -euo pipefail
umask 077

paquet=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
if (($# > 1)); then
  printf 'Usage : %s [RACINE_DU_DEPOT]\n' "$0" >&2
  exit 2
fi
racine=$(cd -- "${1:-$paquet/../../../..}" && pwd -P)
case "$racine/" in
  /usr/*) printf '%s\n' 'Le dépôt doit être hors /usr pour isoler les candidats.' >&2; exit 2 ;;
esac

node_bin=${REVI_NODE:-$(command -v node || true)}
[[ -n "$node_bin" ]] || { printf '%s\n' 'Node absent.' >&2; exit 2; }
if [[ -d "$node_bin" ]]; then node_bin="$node_bin/node"; fi
node_bin=$(readlink -f -- "$node_bin")
bwrap_bin=$(command -v bwrap || true)
[[ -x "$node_bin" && -n "$bwrap_bin" && -x /usr/bin/python3 && -x /usr/bin/prlimit ]] || {
  printf '%s\n' 'Node, Bubblewrap, Python ou prlimit indisponible.' >&2
  exit 2
}
bwrap_bin=$(readlink -f -- "$bwrap_bin")
base_temporaire=$(cd -- "${TMPDIR:-/tmp}" && pwd -P)
[[ "$base_temporaire" != "$racine" && "$base_temporaire" != "$racine/"* ]] || {
  printf '%s\n' 'TMPDIR ne peut pas être dans le dépôt.' >&2
  exit 2
}
temporaire=$(mktemp -d "$base_temporaire/revi-docker-b2.XXXXXXXX")
trap 'rm -rf -- "$temporaire"' EXIT
mkdir -p -- "$temporaire/trusted" "$temporaire/project/server/exercises" "$temporaire/project/tests" "$temporaire/toolchain" "$temporaire/etc"

originaux=()
copies=()
copier() {
  local original=$1 copie=$2
  [[ -f "$original" && ! -L "$original" ]] || { printf 'Fichier absent ou lié : %s\n' "$original" >&2; exit 2; }
  cp -- "$original" "$copie"
  cmp -s -- "$original" "$copie" || { printf 'Source modifiée pendant sa copie : %s\n' "$original" >&2; exit 2; }
  originaux+=("$original")
  copies+=("$copie")
}

for fichier in "$paquet"/*.py "$paquet"/*.json; do
  copier "$fichier" "$temporaire/trusted/$(basename -- "$fichier")"
done
copier "$paquet/export_docker_b2.js" "$temporaire/trusted/export_docker_b2.js"
copier "$paquet/verifier_docker_b2.js" "$temporaire/trusted/verifier_docker_b2.js"
copier "$paquet/rejouer-docker-b2.sh" "$temporaire/trusted/rejouer-docker-b2.sh"
copier "$racine/server/exercises/docker.js" "$temporaire/project/server/exercises/docker.js"
copier "$racine/server/exercises/grading-policy.js" "$temporaire/project/server/exercises/grading-policy.js"
copier "$racine/server/exercises/grading-evidence.json" "$temporaire/project/server/exercises/grading-evidence.json"
copier "$racine/server/exercises/grading-runtime-evidence.json" "$temporaire/project/server/exercises/grading-runtime-evidence.json"
copier "$racine/tests/docker-lot1.test.js" "$temporaire/project/tests/docker-lot1.test.js"
copier "$racine/corrections/outils/sondes/nouvelles-fixtures-suspendus/fixtures/docker.json" "$temporaire/trusted/ancien_temoin_docker.json"
copier "$racine/corrections/resultats/generalisation-lot1-partie2-complement.json" "$temporaire/trusted/precedent.json"
copier "$node_bin" "$temporaire/toolchain/node"

printf 'sandbox:x:%s:%s:Sandbox:/tmp:/bin/sh\n' "$(id -u)" "$(id -g)" > "$temporaire/etc/passwd"
printf 'sandbox:x:%s:\n' "$(id -g)" > "$temporaire/etc/group"
printf 'passwd: files\ngroup: files\n' > "$temporaire/etc/nsswitch.conf"
printf 'NAME=Sandbox\nID=linux\n' > "$temporaire/etc/os-release"

options=(--die-with-parent --unshare-all --new-session --clearenv --cap-drop ALL --ro-bind /usr /usr)
for chemin_systeme in /bin /lib /lib64; do
  if [[ -L "$chemin_systeme" ]]; then
    options+=(--symlink "$(readlink -- "$chemin_systeme")" "$chemin_systeme")
  elif [[ -d "$chemin_systeme" ]]; then
    options+=(--ro-bind "$chemin_systeme" "$chemin_systeme")
  fi
done
options+=(
  --dir /etc --ro-bind "$temporaire/etc/passwd" /etc/passwd
  --ro-bind "$temporaire/etc/group" /etc/group
  --ro-bind "$temporaire/etc/nsswitch.conf" /etc/nsswitch.conf
  --ro-bind "$temporaire/etc/os-release" /etc/os-release
  --proc /proc --dev /dev --size 268435456 --tmpfs /tmp
  --dir /toolchain --ro-bind "$temporaire/toolchain/node" /toolchain/node
  --ro-bind "$bwrap_bin" /toolchain/bwrap
  --ro-bind "$temporaire/trusted" /trusted --ro-bind "$temporaire/project" /project
  --dir /runtimes --chdir /tmp --setenv PATH /usr/bin:/bin --setenv LANG C.UTF-8
  --setenv TMPDIR /tmp --setenv PYTHONDONTWRITEBYTECODE 1
  --setenv AUDIT_HOST_NET_NS "$(readlink /proc/self/ns/net)"
  --setenv REVI_HEAD "$(git -C "$racine" rev-parse --verify HEAD 2>/dev/null || printf 'inconnu')"
)
if [[ -f /etc/ld.so.cache ]]; then options+=(--ro-bind /etc/ld.so.cache /etc/ld.so.cache); fi

set +e
"$bwrap_bin" "${options[@]}" /usr/bin/python3 -I /trusted/banc_docker_b2.py < /dev/null > "$temporaire/rapport.json"
statut=$?
set -e

for index_fichier in "${!originaux[@]}"; do
  if ! cmp -s -- "${originaux[$index_fichier]}" "${copies[$index_fichier]}"; then
    printf '%s\n' '{"etat":"erreur_infrastructure","raison":"source modifiée pendant le rejeu"}'
    exit 2
  fi
done

if ! /usr/bin/python3 -I - "$temporaire/rapport.json" "$statut" "$temporaire/trusted/rejouer-docker-b2.sh" <<'PY'
import hashlib
import json
import sys
from pathlib import Path

try:
    rapport = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    statut = int(sys.argv[2])
    if rapport.get("etat") == "erreur_infrastructure":
        if statut != 2:
            raise ValueError("code incohérent")
    elif rapport.get("code_sortie") != statut:
        raise ValueError("code incohérent")
    rapport["sources_stables_pendant_execution"] = True
    rapport["lanceur_sha256"] = hashlib.sha256(Path(sys.argv[3]).read_bytes()).hexdigest()
    print(json.dumps(rapport, ensure_ascii=False, indent=2))
except (OSError, ValueError, TypeError, KeyError):
    print(json.dumps({"etat": "erreur_infrastructure", "raison": "rapport invalide ou code incohérent"}))
    sys.exit(1)
PY
then
  exit 2
fi
exit "$statut"
