#!/usr/bin/env bash
set -euo pipefail
umask 077

paquet=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
racine=$(cd -- "$paquet/../../../.." && pwd -P)
for executable in bwrap node python3 prlimit; do
  command -v "$executable" >/dev/null || { printf 'Runtime absent : %s\n' "$executable" >&2; exit 2; }
done
bwrap_bin=$(readlink -f -- "$(command -v bwrap)")
node_bin=$(readlink -f -- "$(command -v node)")
[[ $("$node_bin" --version) == v22.* ]] || { printf 'Node 22 requis.\n' >&2; exit 2; }
[[ -f "$racine/server/exercises/index.js" && -f "$racine/server/exercises/runner.js" ]] || exit 2
[[ -z $(find "$racine/server/exercises" "$racine/server/services/execution" -type l -print -quit) ]] || exit 2

temporaire=$(mktemp -d /tmp/revi-react-b2-audit.XXXXXXXX)
trap 'python3 -c "import shutil, sys; shutil.rmtree(sys.argv[1])" "$temporaire"' EXIT
mkdir -p "$temporaire/trusted" "$temporaire/project/server/exercises" "$temporaire/project/server/services/execution" "$temporaire/etc"
for fichier in "$paquet"/*.py "$paquet"/cas*.json "$paquet"/b1_git_grader.js; do
  [[ -f "$fichier" && ! -L "$fichier" ]] || exit 2
  cp -- "$fichier" "$temporaire/trusted/"
  cmp -s -- "$fichier" "$temporaire/trusted/$(basename -- "$fichier")" || exit 2
done
cp -R -- "$racine/server/exercises/." "$temporaire/project/server/exercises/"
cp -R -- "$racine/server/services/execution/." "$temporaire/project/server/services/execution/"
printf 'sandbox:x:%s:%s:Sandbox:/tmp:/bin/sh\n' "$(id -u)" "$(id -g)" > "$temporaire/etc/passwd"
printf 'sandbox:x:%s:\n' "$(id -g)" > "$temporaire/etc/group"
printf 'passwd: files\ngroup: files\n' > "$temporaire/etc/nsswitch.conf"
printf 'NAME=Sandbox\nID=linux\n' > "$temporaire/etc/os-release"

options=(--die-with-parent --unshare-all --new-session --clearenv --cap-drop ALL --ro-bind /usr /usr)
for chemin in /bin /lib /lib64; do
  if [[ -L $chemin ]]; then
    options+=(--symlink "$(readlink -- "$chemin")" "$chemin")
  elif [[ -d $chemin ]]; then
    options+=(--ro-bind "$chemin" "$chemin")
  fi
done
options+=(
  --dir /etc --ro-bind "$temporaire/etc/passwd" /etc/passwd
  --ro-bind "$temporaire/etc/group" /etc/group
  --ro-bind "$temporaire/etc/nsswitch.conf" /etc/nsswitch.conf
  --ro-bind "$temporaire/etc/os-release" /etc/os-release
  --proc /proc --dev /dev --size 268435456 --tmpfs /tmp
  --dir /toolchain --ro-bind "$node_bin" /toolchain/node --ro-bind "$bwrap_bin" /toolchain/bwrap
  --ro-bind "$temporaire/trusted" /trusted --ro-bind "$temporaire/project" /project
  --chdir /tmp --setenv PATH /usr/bin:/bin --setenv LANG C.UTF-8 --setenv TMPDIR /tmp
  --setenv PYTHONDONTWRITEBYTECODE 1 --setenv AUDIT_HOST_NET_NS "$(readlink /proc/self/ns/net)"
)
if [[ -f /etc/ld.so.cache ]]; then options+=(--ro-bind /etc/ld.so.cache /etc/ld.so.cache); fi
"$bwrap_bin" "${options[@]}" /usr/bin/python3 -I /trusted/react_b2_banc.py
