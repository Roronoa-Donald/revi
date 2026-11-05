#!/usr/bin/env bash
set -euo pipefail

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd -P)
mode=${1:-}
if [[ "$mode" != banque && "$mode" != solutions && "$mode" != execution && "$mode" != politique && "$mode" != catalogue && "$mode" != sql && "$mode" != sql-variantes && "$mode" != sql-generalisation && "$mode" != sql-audit && "$mode" != integrite && "$mode" != suite && "$mode" != build ]]; then
  printf 'Usage : %s banque|solutions|execution|politique|catalogue|sql|sql-variantes|sql-generalisation|sql-audit|integrite|suite|build [test]\n' "$0" >&2
  exit 2
fi
if [[ "$mode" == sql ]]; then
  case "${2:-}" in
    sql-lot1.test.js|sql-lot1-examples.test.js|sql-lot1-variants.test.js|sql-lot1-dom.test.js|sql-lot1-browser.test.js|sql-lot1-fresh.test.js|sql-lot1-b2-ddl.test.js|sql-lot1-index.test.js|sql-lot1-b2-course.test.js|sql-lot1-b3-wal.test.js|sql-lot1-b1-oracle.test.js|sql-lot1-b2b3-oracle.test.js) ;;
    *) printf 'Test SQL non pris en charge.\n' >&2; exit 2 ;;
  esac
fi
if [[ "$mode" == catalogue ]]; then
  case "${2:-}" in
    docker|b3-linux|b3-github|b1-algo|linux-cas|git-novice|analyses|code-lab-analyse|suspendus-oracles) ;;
    *) printf 'Catalogue non pris en charge.\n' >&2; exit 2 ;;
  esac
fi
for executable in bwrap git node tar timeout; do
  command -v "$executable" >/dev/null || { printf 'Dépendance absente : %s\n' "$executable" >&2; exit 2; }
done
[[ -d "$root/node_modules" ]] || { printf 'Installer les dépendances npm avant le rejeu.\n' >&2; exit 2; }

if [[ "$mode" == banque || "$mode" == solutions ]]; then
  [[ -n "${JAVA_HOME:-}" && -x "$JAVA_HOME/bin/java" && -x "$JAVA_HOME/bin/javac" ]] || { printf 'Renseigner JAVA_HOME vers un JDK complet.\n' >&2; exit 2; }
  [[ -n "${POWERSHELL_DIR:-}" && -x "$POWERSHELL_DIR/pwsh" ]] || { printf 'Renseigner POWERSHELL_DIR vers le dossier contenant pwsh.\n' >&2; exit 2; }
  [[ -f /usr/share/dotnet/sdk/10.0.401/Roslyn/bincore/csc.dll && -d /usr/share/dotnet/packs/Microsoft.NETCore.App.Ref/10.0.12 ]] || { printf 'Le banc historique exige le SDK .NET 10.0.401 et les références 10.0.12.\n' >&2; exit 2; }
fi

temp_dir=$(mktemp -d "${TMPDIR:-/tmp}/revi-banc.XXXXXXXX")
trap 'rm -rf -- "$temp_dir"' EXIT
mkdir -p "$temp_dir/project" "$temp_dir/etc" "$temp_dir/results"
git -C "$root" ls-files -z -- . ':!corrections/**' ':!verification/**' \
  ':(exclude,glob)**/.env*' ':(exclude,glob)**/.npmrc' ':(exclude,glob)**/.pypirc' \
  ':(exclude,glob)**/.ssh/**' ':(exclude,glob)**/.gnupg/**' \
  ':(exclude,glob)**/*.pem' ':(exclude,glob)**/*.key' ':(exclude,glob)**/*.p12' ':(exclude,glob)**/*.pfx' |
  tar -C "$root" --null -T - -cf - | tar -C "$temp_dir/project" -xf -
if [[ "$mode" == suite ]]; then
  untracked_tests=0
  while IFS= read -r -d '' test_file; do
    if [[ -f "$root/$test_file" && ! -L "$root/$test_file" ]]; then
      mkdir -p -- "$temp_dir/project/$(dirname "$test_file")"
      cp -- "$root/$test_file" "$temp_dir/project/$test_file"
      untracked_tests=$((untracked_tests + 1))
    fi
  done < <(git -C "$root" ls-files --others --exclude-standard -z -- 'tests/*.test.js')
  printf 'Tests locaux non suivis ajoutés au rejeu isolé : %s\n' "$untracked_tests" >&2
fi
mkdir -p "$temp_dir/project/node_modules" "$temp_dir/project/corrections/outils" "$temp_dir/project/corrections/fixtures"
if [[ "$mode" == catalogue && "$2" == code-lab-analyse ]]; then
  mkdir -p "$temp_dir/project/tests"
  cp -- "$root/tests/code-lab-analyse-lot1.test.js" "$temp_dir/project/tests/code-lab-analyse-lot1.test.js"
fi
if [[ -f "$root/server/routes/qcm.js" && ! -f "$temp_dir/project/server/routes/qcm.js" ]]; then
  mkdir -p "$temp_dir/project/server/routes"
  cp -- "$root/server/routes/qcm.js" "$temp_dir/project/server/routes/qcm.js"
fi
if [[ -f "$root/server/exercises/command-validator.js" && ! -f "$temp_dir/project/server/exercises/command-validator.js" ]]; then
  mkdir -p "$temp_dir/project/server/exercises"
  cp -- "$root/server/exercises/command-validator.js" "$temp_dir/project/server/exercises/command-validator.js"
fi
if [[ "$mode" == sql-audit ]]; then
  if [[ $# -eq 1 ]]; then
    git -C "$root" ls-files -z > "$temp_dir/results/sql-tracked"
  elif [[ $# -eq 3 && "$2" == --reference ]]; then
    git -C "$root" rev-parse --verify --quiet --end-of-options "$3^{commit}" >/dev/null
    git -C "$root" ls-tree -rz --name-only "$3" > "$temp_dir/results/sql-tracked"
    mkdir -p "$temp_dir/reference"
    git -C "$root" archive "$3" -- b1-sql sql b3-sql | tar -C "$temp_dir/reference" -xf -
  else
    printf 'Usage SQL : %s sql-audit [--reference <révision>]\n' "$0" >&2
    exit 2
  fi
fi
printf 'sandbox:x:%s:%s:Sandbox:/tmp:/bin/sh\n' "$(id -u)" "$(id -g)" > "$temp_dir/etc/passwd"
printf 'sandbox:x:%s:\n' "$(id -g)" > "$temp_dir/etc/group"
printf 'passwd: files\ngroup: files\n' > "$temp_dir/etc/nsswitch.conf"
printf 'NAME=Sandbox\nID=linux\n' > "$temp_dir/etc/os-release"

options=(
  --die-with-parent --unshare-net --unshare-pid --clearenv
  --ro-bind /usr /usr --symlink usr/bin /bin --symlink usr/lib /lib --symlink usr/lib /lib64
  --dir /etc --ro-bind /etc/ld.so.cache /etc/ld.so.cache
  --ro-bind "$temp_dir/etc/passwd" /etc/passwd --ro-bind "$temp_dir/etc/group" /etc/group
  --ro-bind "$temp_dir/etc/nsswitch.conf" /etc/nsswitch.conf --ro-bind "$temp_dir/etc/os-release" /etc/os-release
  --proc /proc --dev /dev --tmpfs /tmp
  --ro-bind "$(command -v node)" /usr/bin/node
  --chdir /project --setenv PATH /usr/bin:/bin --setenv LANG C.UTF-8
  --setenv REVI_AUDIT_ISOLE 1 --setenv REVI_AUDIT_NET_NS_HOTE "$(readlink /proc/self/ns/net)"
)
if [[ "$mode" == suite || "$mode" == build ]]; then
  options+=(--bind "$temp_dir/project" /project)
else
  options+=(--ro-bind "$temp_dir/project" /project)
fi
options+=(--ro-bind "$root/node_modules" /project/node_modules
  --ro-bind "$root/corrections/outils" /project/corrections/outils
  --ro-bind "$root/corrections/fixtures" /project/corrections/fixtures
  --bind "$temp_dir/results" /resultats)
if [[ "$mode" == catalogue || "$mode" == suite ]]; then
  options+=(--ro-bind "$temp_dir/project" /work)
fi
if [[ "$mode" != politique && "$mode" != catalogue && "$mode" != sql ]]; then
  options+=(--setenv HOME /tmp)
fi
if [[ "$mode" == banque || "$mode" == solutions ]]; then
  options+=(--dir /runtimes --ro-bind "$JAVA_HOME" /runtimes/jdk --ro-bind "$POWERSHELL_DIR" /runtimes/powershell)
  if [[ "$mode" == banque ]]; then
    script=/project/corrections/outils/sondes/rejouer-banc.js
  else
    script=/project/corrections/outils/sondes/verifier-solutions-restantes.js
  fi
elif [[ "$mode" == execution ]]; then
  script=/project/corrections/outils/sondes/sondes-execution.js
elif [[ "$mode" == integrite ]]; then
  script=/project/corrections/outils/integrite-exercices.js
elif [[ "$mode" == sql-variantes ]]; then
  script=/project/corrections/outils/sondes/sql-variantes/lancer-sql.js
elif [[ "$mode" == sql-generalisation ]]; then
  script=/project/corrections/outils/sondes/sql-generalisation/run.js
elif [[ "$mode" == catalogue ]]; then
  options+=(--setenv REVI_ISOLE 1 --setenv REVI_LOT1_ISOLATED 1)
  if [[ "$2" == code-lab-analyse ]]; then
    options+=(--setenv HOME /tmp --setenv CHROME_BIN /usr/bin/chromium)
    if [[ -d /etc/fonts ]]; then options+=(--ro-bind /etc/fonts /etc/fonts); fi
  fi
  script="/project/tests/$2-lot1.test.js"
elif [[ "$mode" == sql ]]; then
  options+=(--setenv REVI_ISOLE 1 --setenv REVI_LOT1_ISOLATED 1 --setenv CHROME_BIN /usr/bin/chromium)
  script="/project/tests/$2"
elif [[ "$mode" == sql-audit ]]; then
  options+=(--setenv REVI_SQL_TRACKED_FILE /resultats/sql-tracked)
  if [[ $# -eq 3 ]]; then
    options+=(--ro-bind "$temp_dir/reference" /reference --setenv REVI_SQL_REFERENCE_DIR /reference)
  fi
  script=/project/corrections/outils/verifier-sql.js
elif [[ "$mode" == suite || "$mode" == build ]]; then
  options+=(--setenv REVI_ISOLE 1 --setenv REVI_LOT1_ISOLATED 1 --setenv CHROME_BIN /usr/bin/chromium
    --setenv CSHARP_LOT1_ISOLATED 1 --setenv CSHARP_HOST_NET_NS "$(readlink /proc/self/ns/net)")
  if [[ "$mode" == suite && -n "${POWERSHELL_DIR:-}" ]]; then
    [[ -x "$POWERSHELL_DIR/pwsh" ]] || { printf 'POWERSHELL_DIR ne contient pas pwsh.\n' >&2; exit 2; }
    options+=(--dir /runtimes --ro-bind "$POWERSHELL_DIR" /runtimes/powershell
      --setenv INTEGRITE_CAS_LOT1_PWSH /runtimes/powershell/pwsh)
  fi
else
  options+=(--setenv F39_ISOLATED_PROBES 1 --setenv F39_HOST_NET_NS "$(readlink /proc/self/ns/net)")
  script=/project/tests/execution-policy.test.js
fi
if [[ "$mode" == politique ]]; then
  timeout --kill-after=5s 900s bwrap "${options[@]}" /usr/bin/node --test "$script" \
    /project/tests/no-local-shell.test.js /project/tests/security-remediation.test.js
elif [[ "$mode" == catalogue || "$mode" == sql ]]; then
  timeout --kill-after=5s 900s bwrap "${options[@]}" /usr/bin/node --test "$script"
elif [[ "$mode" == suite ]]; then
  timeout --kill-after=5s 1200s bwrap "${options[@]}" /usr/bin/npm test
elif [[ "$mode" == build ]]; then
  timeout --kill-after=5s 900s bwrap "${options[@]}" /usr/bin/npm run build
elif [[ "$mode" == sql-audit ]]; then
  timeout --kill-after=5s 900s bwrap "${options[@]}" /usr/bin/node "$script" "${@:2}"
else
  timeout --kill-after=5s 900s bwrap "${options[@]}" /usr/bin/node "$script"
fi
