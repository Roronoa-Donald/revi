#!/usr/bin/env bash
set -euo pipefail
umask 077

if [[ $# -ne 0 ]]; then
  printf 'Usage : bash %s\n' "$0" >&2
  exit 2
fi

paquet=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
racine=$(cd -- "$paquet/../../../.." && pwd -P)
runtime=${POWERSHELL_DIR:-/tmp/revi-lot0.zFUSif/runtimes/powershell}
runtime=$(cd -- "$runtime" && pwd -P)
node=$(readlink -f -- "$(command -v node)")
bwrap=$(readlink -f -- "$(command -v bwrap)")
[[ -x "$runtime/pwsh" && -x "$node" && -x "$bwrap" ]] || {
  printf 'PowerShell, Node ou bubblewrap est indisponible.\n' >&2
  exit 2
}
[[ "$runtime" != "$racine" && "$runtime" != "$racine/"* && "$runtime" != /home/* ]] || {
  printf 'Le runtime doit se trouver hors du dépôt et des répertoires personnels.\n' >&2
  exit 2
}
avant="$racine/corrections/resultats/rd_winserver-lot1-partie3-avant.json"
apres="$racine/corrections/resultats/rd_winserver-lot1-partie3-apres.json"
[[ -f "$avant" && ! -L "$avant" && -f "$apres" && ! -L "$apres" ]] || {
  printf 'Les rapports avant et après sont requis pour contrôler les tests et le catalogue.\n' >&2
  exit 2
}

temporaire=$(mktemp -d /tmp/revi-winserver-complement.XXXXXXXX)
trap 'rm -rf -- "$temporaire"' EXIT
mkdir -p -- "$temporaire/etc"
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
options+=(
  --dir /etc
  --ro-bind "$temporaire/etc/passwd" /etc/passwd
  --ro-bind "$temporaire/etc/group" /etc/group
  --ro-bind "$temporaire/etc/nsswitch.conf" /etc/nsswitch.conf
  --ro-bind "$temporaire/etc/os-release" /etc/os-release
  --proc /proc --dev /dev --size 268435456 --tmpfs /tmp
  --dir /toolchain --ro-bind "$node" /toolchain/node --ro-bind "$bwrap" /toolchain/bwrap
  --ro-bind "$paquet" /trusted
  --dir /project --dir /project/server
  --ro-bind "$racine/server/exercises" /project/server/exercises
  --dir /project/server/services
  --ro-bind "$racine/server/services/execution" /project/server/services/execution
  --dir /reference
  --ro-bind "$racine/corrections/resultats/generalisation-non-evalues-lot1-partie2.tsv" /reference/partie2.tsv
  --ro-bind "$avant" /reference/avant.json
  --ro-bind "$apres" /reference/apres.json
  --dir /runtimes --ro-bind "$runtime" /runtimes/powershell
  --chdir /tmp --setenv PATH /usr/bin:/bin --setenv LANG C.UTF-8
  --setenv TMPDIR /tmp --setenv PYTHONDONTWRITEBYTECODE 1
  --setenv AUDIT_HOST_NET_NS "$(readlink /proc/self/ns/net)"
)
if [[ -f /etc/ld.so.cache ]]; then
  options+=(--ro-bind /etc/ld.so.cache /etc/ld.so.cache)
fi

"$bwrap" "${options[@]}" /usr/bin/python3 -I /trusted/rd_winserver_complement_banc.py
