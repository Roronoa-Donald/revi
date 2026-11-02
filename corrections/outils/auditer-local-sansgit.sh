#!/usr/bin/env bash
set -euo pipefail
umask 077

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -P)
mode=${1:-}
case "$mode" in
  sql|sql-variantes|integrite) ;;
  *) printf 'Usage : %s sql|sql-variantes|integrite\n' "$0" >&2; exit 2 ;;
esac

for executable in bwrap node rg timeout; do
  command -v "$executable" >/dev/null || { printf 'Dépendance absente : %s\n' "$executable" >&2; exit 2; }
done
[[ -d "$root/node_modules" ]] || { printf 'Dépendances npm absentes.\n' >&2; exit 2; }
temporary=$(mktemp -d /tmp/revi-audit-local.XXXXXXXX)
trap 'rm -rf -- "$temporary"' EXIT
mkdir -p "$temporary/project/server/services" "$temporary/project/assets/js/engines" "$temporary/project/node_modules" "$temporary/project/corrections/outils" "$temporary/etc" "$temporary/results"
cp -a -- "$root/server/exercises" "$temporary/project/server/exercises"
cp -a -- "$root/server/services/execution" "$temporary/project/server/services/execution"

if [[ "$mode" == sql || "$mode" == sql-variantes ]]; then
  files=(b1-sql/assets/vendor/sqljs/sql-wasm.js b1-sql/assets/vendor/sqljs/sql-wasm.wasm assets/js/engines/engine-interface.js assets/js/engines/sql-wasm-engine.js)
  if [[ "$mode" == sql ]]; then
    cd "$root"
    mapfile -d '' -t pages < <(rg --files --null b1-sql sql b3-sql -g '*.html')
    [[ ${#pages[@]} -gt 0 ]] || { printf 'Aucune page SQL trouvée.\n' >&2; exit 2; }
    printf '%s\0' "${pages[@]}" > "$temporary/results/sql-tracked"
    files+=("${pages[@]}" b1-sql/assets/js/sql-simulator.js)
  fi
  for relative in "${files[@]}"; do
    source="$root/$relative"
    [[ -f "$source" && ! -L "$source" ]] || { printf 'Fichier requis absent ou lien : %s\n' "$relative" >&2; exit 2; }
    mkdir -p -- "$(dirname -- "$temporary/project/$relative")"
    cp -- "$source" "$temporary/project/$relative"
  done
  if [[ "$mode" == sql ]]; then
    script=/project/corrections/outils/verifier-sql.js
  else
    script=/project/corrections/outils/sondes/sql-variantes/lancer-sql.js
  fi
else
  script=/project/corrections/outils/integrite-exercices.js
fi

printf 'sandbox:x:%s:%s:Sandbox:/tmp:/bin/sh\n' "$(id -u)" "$(id -g)" > "$temporary/etc/passwd"
printf 'sandbox:x:%s:\n' "$(id -g)" > "$temporary/etc/group"
options=(
  --die-with-parent --unshare-all --new-session --clearenv --cap-drop ALL
  --ro-bind /usr /usr --symlink usr/bin /bin --symlink usr/lib /lib --symlink usr/lib /lib64
  --dir /etc --ro-bind "$temporary/etc/passwd" /etc/passwd --ro-bind "$temporary/etc/group" /etc/group
  --proc /proc --dev /dev --size 268435456 --tmpfs /tmp
  --ro-bind "$temporary/project" /project
  --ro-bind "$root/node_modules" /project/node_modules
  --ro-bind "$root/corrections/outils" /project/corrections/outils
  --ro-bind "$temporary/results" /resultats
  --ro-bind "$(readlink -f -- "$(command -v node)")" /usr/bin/node
  --chdir /project --setenv PATH /usr/bin:/bin --setenv HOME /tmp --setenv LANG C.UTF-8
  --setenv REVI_AUDIT_ISOLE 1 --setenv REVI_AUDIT_NET_NS_HOTE "$(readlink /proc/self/ns/net)"
)
if [[ -f /etc/ld.so.cache ]]; then options+=(--ro-bind /etc/ld.so.cache /etc/ld.so.cache); fi
if [[ "$mode" == sql ]]; then options+=(--setenv REVI_SQL_TRACKED_FILE /resultats/sql-tracked); fi
timeout --kill-after=5s 900s bwrap "${options[@]}" /usr/bin/node "$script"
