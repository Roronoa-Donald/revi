#!/usr/bin/env bash
set -euo pipefail
umask 077

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -P)
mode=${1:-}
case "$mode" in
  sql-generalisation|sql-b1-fresh) ;;
  *) printf 'Usage : %s sql-generalisation|sql-b1-fresh\n' "$0" >&2; exit 2 ;;
esac

for executable in bwrap node timeout; do
  command -v "$executable" >/dev/null || { printf 'Dépendance absente : %s\n' "$executable" >&2; exit 2; }
done
node_bin=$(readlink -f -- "$(command -v node)")
base=$(cd -- "${TMPDIR:-/tmp}" && pwd -P)
[[ "$base/" != "$root/"* ]] || { printf 'TMPDIR dans le dépôt interdit.\n' >&2; exit 2; }
temporary=$(mktemp -d "$base/revi-sql-isole.XXXXXXXX") || exit 2
trap 'rm -rf -- "$temporary"' EXIT
trap 'printf "Préparation du banc SQL impossible.\n" >&2; exit 2' ERR
mkdir -p "$temporary/project" "$temporary/etc"
cp -- "$node_bin" "$temporary/node"
cmp -s -- "$node_bin" "$temporary/node"

files=(
  b1-sql/assets/vendor/sqljs/sql-wasm.js
  b1-sql/assets/vendor/sqljs/sql-wasm.wasm
)
if [[ "$mode" == sql-b1-fresh ]]; then
  files+=(
    tests/lot1-sandbox.js
    tests/sql-lot1-fresh.test.js
    server/exercises/b1-sql.js
    assets/js/engines/engine-interface.js
    assets/js/engines/sql-wasm-engine.js
    b1-sql/assets/js/sql-simulator.js
    corrections/outils/sondes/sql-b1-generalisation/rapporteur.js
  )
else
  files+=(
    server/exercises/sql.js
    server/exercises/b3-sql.js
    corrections/outils/sondes/sql-generalisation/run.js
    corrections/outils/sondes/sql-generalisation/fixtures.js
    corrections/outils/sondes/sql-generalisation/oracles.js
  )
fi
for relative in "${files[@]}"; do
  source="$root/$relative"
  [[ -f "$source" && ! -L "$source" ]]
  real=$(readlink -f -- "$source")
  [[ "$real" == "$root/"* ]]
  mkdir -p -- "$(dirname -- "$temporary/project/$relative")"
  cp -- "$source" "$temporary/project/$relative"
done
for relative in "${files[@]}"; do
  cmp -s -- "$root/$relative" "$temporary/project/$relative"
done

printf 'sandbox:x:%s:%s:Sandbox:/tmp:/bin/sh\n' "$(id -u)" "$(id -g)" > "$temporary/etc/passwd"
printf 'sandbox:x:%s:\n' "$(id -g)" > "$temporary/etc/group"
printf 'passwd: files\ngroup: files\n' > "$temporary/etc/nsswitch.conf"
printf 'NAME=Sandbox\nID=linux\n' > "$temporary/etc/os-release"

options=(--die-with-parent --unshare-all --new-session --clearenv --cap-drop ALL --ro-bind /usr /usr)
for system_path in /bin /lib /lib64; do
  if [[ -L "$system_path" ]]; then
    options+=(--symlink "$(readlink -- "$system_path")" "$system_path")
  elif [[ -d "$system_path" ]]; then
    options+=(--ro-bind "$system_path" "$system_path")
  fi
done
options+=(
  --dir /etc --ro-bind "$temporary/etc/passwd" /etc/passwd
  --ro-bind "$temporary/etc/group" /etc/group
  --ro-bind "$temporary/etc/nsswitch.conf" /etc/nsswitch.conf
  --ro-bind "$temporary/etc/os-release" /etc/os-release
  --proc /proc --dev /dev --size 268435456 --tmpfs /tmp
  --ro-bind "$temporary/project" /project --ro-bind "$temporary/node" /usr/bin/node
  --chdir /project --setenv PATH /usr/bin:/bin --setenv LANG C.UTF-8
  --setenv REVI_AUDIT_ISOLE 1 --setenv REVI_AUDIT_NET_NS_HOTE "$(readlink /proc/self/ns/net)"
)
if [[ -f /etc/ld.so.cache ]]; then options+=(--ro-bind /etc/ld.so.cache /etc/ld.so.cache); fi
if [[ "$mode" == sql-b1-fresh ]]; then
  options+=(--setenv REVI_LOT1_ISOLATED 1)
  arguments=(--test --test-reporter=/project/corrections/outils/sondes/sql-b1-generalisation/rapporteur.js /project/tests/sql-lot1-fresh.test.js)
else
  options+=(--setenv HOME /tmp)
  arguments=(/project/corrections/outils/sondes/sql-generalisation/run.js)
fi

if timeout --kill-after=5s 900s bwrap "${options[@]}" /usr/bin/node "${arguments[@]}"; then
  exit 0
else
  status=$?
  if [[ "$status" == 1 ]]; then exit 1; fi
  exit 2
fi
