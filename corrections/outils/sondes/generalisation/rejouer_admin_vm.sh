#!/usr/bin/env bash
set -euo pipefail
umask 077

paquet=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
racine=$(cd -- "$paquet/../../../.." && pwd -P)
pilote=sonde_admin_vm.py
if [[ $# -eq 1 && $1 == --complement ]]; then
  pilote=admin_vm_complement_banc.py
elif [[ $# -ne 0 ]]; then
  printf 'Usage : bash %s [--complement]\n' "$0" >&2
  exit 2
fi
runtime=$(cd -- "${POWERSHELL_DIR:-/tmp/revi-lot0.zFUSif/runtimes/powershell}" && pwd -P)
node=$(readlink -f -- "$(command -v node)")
bwrap=$(readlink -f -- "$(command -v bwrap)")

[[ -x "$runtime/pwsh" && -x "$node" && -x "$bwrap" && -x /usr/bin/python3 && -x /usr/bin/prlimit ]]
[[ -f "$racine/server/exercises/admin-vm.js" && -f "$racine/server/exercises/runner.js" ]]
[[ "$runtime/" != "$racine/"* && "$runtime/" != "${HOME:-/nonexistent}/"* ]]

temporaire=$(mktemp -d /tmp/revi-admin-vm-banc.XXXXXXXX)
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
  --dir /etc --ro-bind "$temporaire/etc/passwd" /etc/passwd
  --ro-bind "$temporaire/etc/group" /etc/group
  --ro-bind "$temporaire/etc/nsswitch.conf" /etc/nsswitch.conf
  --ro-bind "$temporaire/etc/os-release" /etc/os-release
  --proc /proc --dev /dev --size 268435456 --tmpfs /tmp
  --dir /toolchain --ro-bind "$node" /toolchain/node --ro-bind "$bwrap" /toolchain/bwrap
  --ro-bind "$paquet" /trusted
  --dir /project --dir /project/server
  --ro-bind "$racine/server/exercises" /project/server/exercises
  --ro-bind "$racine/server/services" /project/server/services
  --dir /runtimes --ro-bind "$runtime" /runtimes/powershell
  --chdir /tmp --setenv PATH /usr/bin:/bin --setenv LANG C.UTF-8 --setenv TMPDIR /tmp
  --setenv XDG_CONFIG_HOME /tmp/.config --setenv XDG_CACHE_HOME /tmp/.cache
  --setenv XDG_DATA_HOME /tmp/.local/share --setenv XDG_STATE_HOME /tmp/.local/state
  --setenv DOTNET_CLI_HOME /tmp --setenv DOTNET_CLI_TELEMETRY_OPTOUT 1
  --setenv DOTNET_SKIP_FIRST_TIME_EXPERIENCE 1 --setenv DOTNET_EnableDiagnostics 0
  --setenv POWERSHELL_TELEMETRY_OPTOUT 1 --setenv ADMIN_VM_WORKERS "${ADMIN_VM_WORKERS:-4}"
  --setenv AUDIT_HOST_NET_NS "$(readlink /proc/self/ns/net)"
)
if [[ -f /etc/ld.so.cache ]]; then
  options+=(--ro-bind /etc/ld.so.cache /etc/ld.so.cache)
fi
"$bwrap" "${options[@]}" /usr/bin/python3 -I -B "/trusted/$pilote"
