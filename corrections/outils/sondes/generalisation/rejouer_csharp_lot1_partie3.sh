#!/bin/sh
set -eu

PACKAGE=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd -P)
ROOT=${1:-"$PACKAGE/../../../.."}
ROOT=$(CDPATH= cd -- "$ROOT" && pwd -P)
for LOCATION in "$ROOT" "$PACKAGE"; do
  case "$LOCATION/" in
    /usr/*) printf '%s\n' 'Le dépôt et le banc doivent être hors /usr.' >&2; exit 2 ;;
  esac
done
NODE=${REVI_NODE:-}
if [ -z "$NODE" ]; then NODE=$(command -v node); fi
if [ -d "$NODE" ]; then NODE=$NODE/node; fi
NODE=$(readlink -f -- "$NODE")
if [ ! -f "$NODE" ] || [ ! -x "$NODE" ]; then
  printf '%s\n' 'Exécutable Node introuvable : définir REVI_NODE.' >&2
  exit 2
fi
OUTDIR=${REVI_OUTDIR:-/tmp}
OUTDIR=$(CDPATH= cd -- "$OUTDIR" && pwd -P)
case "$OUTDIR" in
  /tmp|/tmp/*) ;;
  *) printf '%s\n' 'REVI_OUTDIR doit être sous /tmp.' >&2; exit 2 ;;
esac
RUN=$(mktemp -d "$OUTDIR/revi-csharp-lot1p3-XXXXXX")
trap 'rm -rf -- "$RUN"' EXIT
HOST_NET=$(readlink /proc/self/ns/net)

set +e
bwrap --unshare-all --die-with-parent --new-session \
  --ro-bind /usr /usr --symlink usr/bin /bin --symlink usr/lib /lib --symlink usr/lib /lib64 \
  --ro-bind "$NODE" /usr/bin/node --proc /proc --dev /dev \
  --ro-bind "$ROOT" /source --bind "$RUN" /tmp \
  --chdir /tmp --clearenv --setenv HOME /nonexistent --setenv PATH /usr/share/dotnet:/usr/bin:/bin \
  --setenv TMPDIR /tmp --setenv PYTHONDONTWRITEBYTECODE 1 --setenv REVI_HOST_NET_NS "$HOST_NET" \
  /usr/bin/python3 -I /source/corrections/outils/sondes/generalisation/banc_csharp_lot1_partie3.py \
    --repo /source --output /tmp/rapport.json --jobs "${REVI_JOBS:-3}"
STATUS=$?
set -e
if [ -f "$RUN/rapport.json" ]; then
  cat "$RUN/rapport.json"
else
  printf '%s\n' 'Aucun rapport exploitable ; vérifier les diagnostics du lanceur.' >&2
  STATUS=2
fi
exit "$STATUS"
