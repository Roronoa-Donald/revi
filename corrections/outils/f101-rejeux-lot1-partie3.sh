#!/usr/bin/env bash
set -euo pipefail

racine=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../.." && pwd -P)
destination=${1:-"$racine/corrections/resultats/f101-rejeux-lot1-partie3"}
node_bin=$(command -v node)
if [[ -e "$destination" ]]; then
  printf 'Destination déjà existante : %s\n' "$destination" >&2
  exit 2
fi
if ! command -v bwrap >/dev/null || [[ ! -x "$node_bin" ]]; then
  printf 'Node et bubblewrap sont requis.\n' >&2
  exit 2
fi

temporaire=$(mktemp -d /tmp/revi-f101-partie3-XXXXXXXX)
trap 'find "$temporaire" -depth -delete' EXIT
mkdir -p "$temporaire/project/server/services" "$temporaire/project/tests" \
  "$temporaire/project/linux/chapitres" "$temporaire/resultats"
cp -a "$racine/server/exercises" "$temporaire/project/server/exercises"
cp -a "$racine/server/services/execution" "$temporaire/project/server/services/execution"
cp "$racine/tests/linux-cas-lot1.test.js" "$racine/tests/lot1-sandbox.js" "$temporaire/project/tests/"
cp "$racine/linux/chapitres/chapitre5.html" "$temporaire/project/linux/chapitres/"
cp "$racine/corrections/outils/f101-rejeux-lot1-partie3.sh" "$temporaire/project/rejeux.sh"
if ! diff -qr "$racine/server/exercises" "$temporaire/project/server/exercises" >/dev/null || \
   ! diff -qr "$racine/server/services/execution" "$temporaire/project/server/services/execution" >/dev/null || \
   ! cmp -s "$racine/tests/linux-cas-lot1.test.js" "$temporaire/project/tests/linux-cas-lot1.test.js" || \
   ! cmp -s "$racine/tests/lot1-sandbox.js" "$temporaire/project/tests/lot1-sandbox.js" || \
   ! cmp -s "$racine/linux/chapitres/chapitre5.html" "$temporaire/project/linux/chapitres/chapitre5.html"; then
  printf 'Les fichiers ont changé pendant la copie ; relancer.\n' >&2
  exit 2
fi

if [[ ${F101_TRAVAILLEUR:-} == 1 ]]; then
  printf 'Le mode interne ne doit pas être invoqué directement.\n' >&2
  exit 2
fi

node_version=$($node_bin --version)
network_host=$(readlink /proc/self/ns/net)
snapshot_hash=$(cd "$temporaire/project" && find server tests linux -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum | cut -d' ' -f1)

cat > "$temporaire/project/travailleur.sh" <<'WORKER'
#!/usr/bin/env bash
set -uo pipefail

executer() {
  local mode=$1 numero=$2 sortie debut fin code cible tests
  sortie="/resultats/${mode}-${numero}.tap"
  debut=$(date +%s%N)
  if [[ "$mode" == isole ]]; then
    /usr/bin/node --test --test-name-pattern='^F101 : le shebang fonctionne à l’exécution directe et ne suffit pas à valider la sortie$' /project/tests/linux-cas-lot1.test.js >"$sortie" 2>&1
    code=$?
    tests=1
  else
    /usr/bin/node --test /project/tests/linux-cas-lot1.test.js >"$sortie" 2>&1
    code=$?
    tests=15
  fi
  fin=$(date +%s%N)
  cible=$(grep -Ec '^ok [0-9]+ - F101 : le shebang fonctionne à l’exécution directe et ne suffit pas à valider la sortie$' "$sortie" || true)
  if [[ "$code" == 0 && "$cible" == 1 ]] && grep -qx "# tests $tests" "$sortie" && \
     grep -qx '# fail 0' "$sortie" && grep -qx '# skipped 0' "$sortie"; then
    printf '%s\t%s\t%d\t%d\t%d\t%s\n' "$mode" "$numero" "$code" "$cible" "$(((fin-debut)/1000000))" ok >"/resultats/${mode}-${numero}.tsv"
    return 0
  fi
  printf '%s\t%s\t%d\t%d\t%d\t%s\n' "$mode" "$numero" "$code" "$cible" "$(((fin-debut)/1000000))" echec >"/resultats/${mode}-${numero}.tsv"
  return 1
}
export -f executer

for numero in $(seq -w 1 50); do
  executer isole "$numero" || true
done
seq -w 1 50 | xargs -n 1 -P 8 /bin/bash -c 'executer charge "$1"' _ || true
WORKER

bwrap --die-with-parent --unshare-net --unshare-pid --clearenv \
  --ro-bind /usr /usr --symlink usr/bin /bin --symlink usr/lib /lib --symlink usr/lib /lib64 \
  --proc /proc --dev /dev --tmpfs /tmp --ro-bind "$node_bin" /usr/bin/node \
  --ro-bind "$temporaire/project" /project --ro-bind "$temporaire/project" /work \
  --bind "$temporaire/resultats" /resultats --chdir /project \
  --setenv PATH /usr/bin:/bin --setenv LANG C.UTF-8 --setenv REVI_LOT1_ISOLATED 1 \
  --setenv REVI_AUDIT_NET_NS_HOTE "$network_host" /bin/bash /project/travailleur.sh

mkdir -p "$destination"
printf 'mode\tnumero\tcode_sortie\tpassages_f101\tduree_ms\tverdict\n' > "$destination/rejeux.tsv"
for mode in isole charge; do
  for numero in $(seq -w 1 50); do
    if [[ -f "$temporaire/resultats/${mode}-${numero}.tsv" ]]; then
      cat "$temporaire/resultats/${mode}-${numero}.tsv" >> "$destination/rejeux.tsv"
    else
      printf '%s\t%s\t%s\t%s\t%s\t%s\n' "$mode" "$numero" absent 0 0 echec >> "$destination/rejeux.tsv"
    fi
  done
done
cp "$temporaire"/resultats/*.tap "$destination/"
printf 'node\t%s\ninstantane_sha256\t%s\ncharge_processus_simultanes\t8\n' "$node_version" "$snapshot_hash" > "$destination/environnement.tsv"
printf 'Rejeux enregistrés dans %s\n' "$destination"
if awk -F '\t' 'NR > 1 && $6 != "ok" { echec = 1 } END { exit echec }' "$destination/rejeux.tsv"; then
  printf '50 rejeux isolés et 50 rejeux sous charge : aucun échec observé.\n'
else
  printf 'Au moins un rejeu a échoué ; consulter les journaux TAP.\n' >&2
  exit 1
fi
