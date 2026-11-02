#!/usr/bin/env bash
set -euo pipefail
umask 077

sortie='-'
destination=''
destination_validee=0

erreur() {
  printf 'Banc : %s\n' "$1" >&2
  local document
  document=$(printf '{"etat":"erreur_infrastructure","raison":"%s"}\n' "$2")
  if [[ "$destination_validee" == 1 && "$sortie" != '-' ]]; then
    local provisoire
    if provisoire=$(mktemp "${destination%/*}/.revi-json.XXXXXXXX"); then
      if printf '%s\n' "$document" > "$provisoire" && mv -fT -- "$provisoire" "$destination"; then
        exit 2
      fi
      rm -f -- "$provisoire"
    fi
  fi
  printf '%s\n' "$document"
  exit 2
}

usage() {
  printf 'Usage : %s [--repo RACINE] [--output CHEMIN|-]\n' "$0"
  printf 'Racine recherchée depuis le lanceur puis le répertoire courant ; JSON sur stdout par défaut.\n'
}

racine_demandee=''
while (($#)); do
  case "$1" in
    --repo)
      (($# >= 2)) || erreur 'Argument manquant après --repo.' 'arguments_invalides'
      racine_demandee=$2
      shift 2
      ;;
    --output)
      (($# >= 2)) || erreur 'Argument manquant après --output.' 'arguments_invalides'
      sortie=$2
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *) erreur 'Argument inconnu.' 'arguments_invalides' ;;
  esac
done

paquet=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P) || erreur 'Paquet introuvable.' 'paquet_introuvable'
chercher_racine() {
  local repertoire=$1
  while :; do
    if [[ -f "$repertoire/server/exercises/index.js" && -f "$repertoire/server/exercises/runner.js" ]]; then
      printf '%s\n' "$repertoire"
      return 0
    fi
    [[ "$repertoire" == / ]] && return 1
    repertoire=${repertoire%/*}
    [[ -n "$repertoire" ]] || repertoire=/
  done
}

if [[ -n "$racine_demandee" ]]; then
  racine=$(cd -- "$racine_demandee" 2>/dev/null && pwd -P) || erreur 'Racine demandée inaccessible.' 'depot_introuvable'
  [[ -f "$racine/server/exercises/index.js" && -f "$racine/server/exercises/runner.js" ]] || erreur 'Racine sans catalogue reconnu.' 'depot_introuvable'
else
  courant=$(pwd -P)
  racine=$(chercher_racine "$paquet" || chercher_racine "$courant") || erreur 'Racine introuvable ; passer --repo.' 'depot_introuvable'
fi
[[ "$racine" != / ]] || erreur 'La racine système ne peut pas être le dépôt.' 'depot_invalide'

if [[ "$sortie" != '-' ]]; then
  repertoire_sortie=$(cd -- "$(dirname -- "$sortie")" 2>/dev/null && pwd -P) || erreur 'Répertoire de sortie inaccessible.' 'sortie_invalide'
  nom_sortie=$(basename -- "$sortie")
  [[ "$nom_sortie" != '.' && "$nom_sortie" != '..' && -n "$nom_sortie" ]] || erreur 'Nom de sortie invalide.' 'sortie_invalide'
  destination="$repertoire_sortie/$nom_sortie"
  [[ "$destination" != "$racine" && "$destination" != "$racine/"* ]] || erreur 'Sortie dans le dépôt interdite.' 'sortie_dans_depot'
  [[ ! -L "$destination" && ( ! -e "$destination" || -f "$destination" ) ]] || erreur 'Sortie spéciale ou lien symbolique refusé.' 'sortie_invalide'
  case "$destination" in
    "$paquet/rejouer.sh"|"$paquet/banc.py"|"$paquet/cas.json"|"$paquet/cas_algo.json"|"$paquet/oracles.py"|"$paquet/algo_b1.py"|"$paquet/sql-worker.js")
      erreur 'Écrasement d’un fichier du banc interdit.' 'sortie_invalide' ;;
  esac
  destination_validee=1
fi
trap 'erreur "Préparation ou publication interrompue." "preparation_interrompue"' ERR

base_temporaire=${TMPDIR:-/tmp}
base_temporaire=$(cd -- "$base_temporaire" 2>/dev/null && pwd -P) || erreur 'TMPDIR inaccessible.' 'tmp_inaccessible'
[[ "$base_temporaire" != "$racine" && "$base_temporaire" != "$racine/"* ]] || erreur 'TMPDIR dans le dépôt interdit.' 'tmp_dans_depot'
repertoire_temporaire=$(mktemp -d "$base_temporaire/revi-banc.XXXXXXXX") || erreur 'Création temporaire impossible.' 'tmp_inaccessible'
trap 'rm -rf -- "$repertoire_temporaire"' EXIT

for utilitaire in bwrap node; do
  executable=$(command -v "$utilitaire" || true)
  [[ -n "$executable" && -x "$executable" ]] || erreur 'Bubblewrap ou Node actif absent.' 'runtime_requis_absent'
  case "$utilitaire" in
    bwrap) bwrap_bin=$(readlink -f -- "$executable") ;;
    node) node_bin=$(readlink -f -- "$executable") ;;
  esac
done
[[ -x /usr/bin/python3 && -x /usr/bin/prlimit && -x /bin/sh ]] || erreur 'Python, prlimit ou shell système absent.' 'runtime_requis_absent'
fichiers_paquet=(
  banc.py oracles.py cas.json algo_b1.py cas_algo.json sql-worker.js
  algo_b3_1.py cas_algo_b3_1.json algo_b3_2.py cas_algo_b3_2.json
  linux_b2.py cas_linux_b2.json b1_linux.py cas_b1_linux.json b1_git.py cas_b1_git.json
  flask_b2.py cas_flask_b2.json java_b2.py cas_java_b2.json
  docker_b2.py cas_docker_b2.json linux_b3.py cas_b3_linux.json b3_github.py cas_b3_github.json react_b2.py cas_react_b2.json
  rd_winserver.py cas_rd_winserver_complement.json admin_vm.py cas_admin_vm_complement.json
)
for fichier in "${fichiers_paquet[@]}"; do
  [[ -f "$paquet/$fichier" && ! -L "$paquet/$fichier" ]] || erreur 'Fichier du banc absent ou lié.' 'paquet_incomplet'
done

source_catalogue="$racine/server/exercises"
[[ ! -L "$source_catalogue" ]] || erreur 'Catalogue lié refusé.' 'lien_catalogue_interdit'
catalogue_reel=$(readlink -f -- "$source_catalogue") || erreur 'Catalogue inaccessible.' 'depot_introuvable'
[[ "$catalogue_reel" == "$racine/"* ]] || erreur 'Catalogue extérieur au dépôt refusé.' 'lien_catalogue_interdit'
find "$source_catalogue" -type l -print -quit > "$repertoire_temporaire/liens" || erreur 'Inventaire impossible.' 'copie_impossible'
[[ ! -s "$repertoire_temporaire/liens" ]] || erreur 'Liens dans le catalogue refusés.' 'lien_catalogue_interdit'
find "$source_catalogue" -type f \( -name '*.js' -o -name '*.json' \) -print0 > "$repertoire_temporaire/fichiers-bruts" || erreur 'Inventaire impossible.' 'copie_impossible'
sort -z "$repertoire_temporaire/fichiers-bruts" > "$repertoire_temporaire/fichiers"

mkdir -p "$repertoire_temporaire/trusted" "$repertoire_temporaire/project/server/exercises" "$repertoire_temporaire/toolchain" "$repertoire_temporaire/etc"
for fichier in "${fichiers_paquet[@]}"; do
  cp -- "$paquet/$fichier" "$repertoire_temporaire/trusted/$fichier"
done
cp -- "$node_bin" "$repertoire_temporaire/toolchain/node"
for fichier in "${fichiers_paquet[@]}"; do
  cmp -s -- "$paquet/$fichier" "$repertoire_temporaire/trusted/$fichier" || erreur 'Paquet modifié pendant sa copie.' 'paquet_modifie'
done
cmp -s -- "$node_bin" "$repertoire_temporaire/toolchain/node" || erreur 'Node modifié pendant sa copie.' 'node_modifie'
while IFS= read -r -d '' fichier; do
  relatif=${fichier#"$source_catalogue/"}
  cible="$repertoire_temporaire/project/server/exercises/$relatif"
  mkdir -p -- "$(dirname -- "$cible")"
  cp -- "$fichier" "$cible"
done < "$repertoire_temporaire/fichiers"
find "$source_catalogue" -type l -print -quit > "$repertoire_temporaire/liens-apres" || erreur 'Inventaire impossible.' 'copie_impossible'
[[ ! -s "$repertoire_temporaire/liens-apres" ]] || erreur 'Lien apparu dans le catalogue.' 'lien_catalogue_interdit'
find "$source_catalogue" -type f \( -name '*.js' -o -name '*.json' \) -print0 > "$repertoire_temporaire/fichiers-apres-bruts" || erreur 'Inventaire impossible.' 'copie_impossible'
sort -z "$repertoire_temporaire/fichiers-apres-bruts" > "$repertoire_temporaire/fichiers-apres"
cmp -s -- "$repertoire_temporaire/fichiers" "$repertoire_temporaire/fichiers-apres" || erreur 'Catalogue modifié pendant sa copie ; relancer.' 'catalogue_modifie'
while IFS= read -r -d '' fichier; do
  relatif=${fichier#"$source_catalogue/"}
  cmp -s -- "$fichier" "$repertoire_temporaire/project/server/exercises/$relatif" || erreur 'Catalogue modifié pendant sa copie ; relancer.' 'catalogue_modifie'
done < "$repertoire_temporaire/fichiers"

for relatif in assets/js/engines/sql-wasm-engine.js assets/js/engines/engine-interface.js b1-sql/assets/vendor/sqljs/sql-wasm.js b1-sql/assets/vendor/sqljs/sql-wasm.wasm tools/php-cli/php; do
  fichier="$racine/$relatif"
  if [[ -e "$fichier" ]]; then
    [[ -f "$fichier" && ! -L "$fichier" ]] || erreur 'Fichier auxiliaire lié ou non régulier refusé.' 'lien_auxiliaire_interdit'
    fichier_reel=$(readlink -f -- "$fichier") || erreur 'Fichier auxiliaire inaccessible.' 'copie_impossible'
    [[ "$fichier_reel" == "$racine/"* ]] || erreur 'Fichier auxiliaire hors dépôt refusé.' 'lien_auxiliaire_interdit'
    cible="$repertoire_temporaire/project/$relatif"
    mkdir -p -- "$(dirname -- "$cible")"
    cp -- "$fichier" "$cible"
    cmp -s -- "$fichier" "$cible" || erreur 'Fichier auxiliaire modifié pendant sa copie.' 'auxiliaire_modifie'
  fi
done

printf 'sandbox:x:%s:%s:Sandbox:/tmp:/bin/sh\n' "$(id -u)" "$(id -g)" > "$repertoire_temporaire/etc/passwd"
printf 'sandbox:x:%s:\n' "$(id -g)" > "$repertoire_temporaire/etc/group"
printf 'passwd: files\ngroup: files\n' > "$repertoire_temporaire/etc/nsswitch.conf"
printf 'NAME=Sandbox\nID=linux\n' > "$repertoire_temporaire/etc/os-release"

options=(
  --die-with-parent --unshare-all --new-session --clearenv --cap-drop ALL
  --ro-bind /usr /usr
)
for system_path in /bin /lib /lib64; do
  if [[ -L "$system_path" ]]; then
    options+=(--symlink "$(readlink -- "$system_path")" "$system_path")
  elif [[ -d "$system_path" ]]; then
    options+=(--ro-bind "$system_path" "$system_path")
  fi
done
options+=(
  --dir /etc --ro-bind "$repertoire_temporaire/etc/passwd" /etc/passwd
  --ro-bind "$repertoire_temporaire/etc/group" /etc/group
  --ro-bind "$repertoire_temporaire/etc/nsswitch.conf" /etc/nsswitch.conf
  --ro-bind "$repertoire_temporaire/etc/os-release" /etc/os-release
  --proc /proc --dev /dev --size 268435456 --tmpfs /tmp
  --dir /toolchain --ro-bind "$repertoire_temporaire/toolchain/node" /toolchain/node
  --ro-bind "$bwrap_bin" /toolchain/bwrap
  --ro-bind "$repertoire_temporaire/trusted" /trusted
  --ro-bind "$repertoire_temporaire/project" /project
  --dir /runtimes --chdir /tmp --setenv PATH /usr/bin:/bin --setenv LANG C.UTF-8
  --setenv TMPDIR /tmp --setenv PYTHONDONTWRITEBYTECODE 1
  --setenv AUDIT_HOST_NET_NS "$(readlink /proc/self/ns/net)"
)
if [[ -f /etc/ld.so.cache ]]; then
  options+=(--ro-bind /etc/ld.so.cache /etc/ld.so.cache)
fi
if [[ -x "$repertoire_temporaire/project/tools/php-cli/php" ]]; then
  options+=(--ro-bind "$repertoire_temporaire/project/tools/php-cli/php" /runtimes/php)
fi

maison=''
if [[ -n "${HOME:-}" && -d "$HOME" ]]; then
  maison=$(cd -- "$HOME" && pwd -P)
fi
runtime_autorise() {
  local repertoire=$1
  [[ "$repertoire" != / && "$racine/" != "$repertoire/"* ]] || return 1
  [[ -z "$maison" || "$maison/" != "$repertoire/"* ]]
}

java_dir=''
if [[ -n "${JAVA_HOME:-}" && -x "$JAVA_HOME/bin/javac" ]]; then
  java_dir=$(readlink -f -- "$JAVA_HOME")
else
  javac=$(command -v javac || true)
  if [[ -n "$javac" && -x "$javac" ]]; then
    javac=$(readlink -f -- "$javac")
    java_dir=$(dirname -- "$(dirname -- "$javac")")
  fi
fi
if [[ -n "$java_dir" && -x "$java_dir/bin/javac" && -x "$java_dir/bin/java" ]] && runtime_autorise "$java_dir"; then
  options+=(--ro-bind "$java_dir" /runtimes/jdk)
fi

dotnet_dir=''
if [[ -n "${DOTNET_ROOT:-}" && -x "$DOTNET_ROOT/dotnet" ]]; then
  dotnet_dir=$(readlink -f -- "$DOTNET_ROOT")
else
  dotnet=$(command -v dotnet || true)
  if [[ -n "$dotnet" && -x "$dotnet" ]]; then
    dotnet=$(readlink -f -- "$dotnet")
    dotnet_dir=$(dirname -- "$dotnet")
  fi
fi
if [[ -n "$dotnet_dir" && -x "$dotnet_dir/dotnet" ]] && runtime_autorise "$dotnet_dir"; then
  options+=(--ro-bind "$dotnet_dir" /runtimes/dotnet)
fi

powershell_dir=''
if [[ -n "${POWERSHELL_DIR:-}" ]]; then
  if [[ -x "$POWERSHELL_DIR/pwsh" ]]; then
    powershell_dir=$(readlink -f -- "$POWERSHELL_DIR")
  else
    printf 'Banc : PowerShell indisponible ; les fiches concernées restent non évaluées.\n' >&2
  fi
else
  powershell=$(command -v pwsh || true)
  if [[ -n "$powershell" && -x "$powershell" ]]; then
    powershell=$(readlink -f -- "$powershell")
    powershell_dir=$(dirname -- "$powershell")
  fi
fi
if [[ -n "$powershell_dir" && -x "$powershell_dir/pwsh" ]] && runtime_autorise "$powershell_dir"; then
  options+=(--ro-bind "$powershell_dir" /runtimes/powershell)
fi

rapport="$repertoire_temporaire/rapport.json"
if "$bwrap_bin" "${options[@]}" /usr/bin/python3 -I /trusted/banc.py < /dev/null > "$rapport"; then
  statut=0
else
  statut=$?
fi

if ! /usr/bin/python3 -I -c '
import collections, json, sys
try:
    with open(sys.argv[1], encoding="utf-8") as stream:
        report = json.load(stream)
    status = int(sys.argv[2])
    if report.get("etat") == "erreur_infrastructure":
        assert status == 2
    else:
        rows = report["exercices"]
        counts = collections.Counter(row["etat"] for row in rows)
        allowed = {"réussi", "échoué", "non évalué"}
        required_controls = {
            "ancienne_valeur_reformatee_rejetee", "entree_encodee_dans_source_rejetee",
            "attendu_manuel_errone_rejete", "oracle_absent_non_evalue", "code_echec_non_nul",
            "code_non_evalue_non_nul", "code_reussite_nul", "echec_complementaire_prioritaire",
            "controle_complementaire_absent_non_evalue",
        }
        assert len(rows) == report["catalogue"] == len({row["id"] for row in rows})
        assert set(counts) <= allowed and set(report["etats"]) == allowed
        assert all(report["etats"][key] == counts[key] for key in allowed)
        assert set(report["autocontroles"]) == required_controls and all(value is True for value in report["autocontroles"].values())
        package_controls = report["autocontroles_paquets"]
        assert set(package_controls) == {
            "algo_b3_1.py", "algo_b3_2.py", "linux_b2.py", "b1_linux.py", "b1_git.py",
            "docker_b2.py", "linux_b3.py", "b3_github.py", "react_b2.py", "rd_winserver.py", "admin_vm.py", "flask_b2.py", "java_b2.py",
        }
        assert all(set(checks) == {"reference_disponible", "attendu_errone_rejete", "oracle_absent_rejete"} and all(value is True for value in checks.values()) for checks in package_controls.values())
        assert report["controle_mutant"]["verification_reussie"] is True
        isolation = report["isolation"]
        assert isolation["pid1"] == "bwrap" and all(isolation[key] is True for key in ("reseau_separe", "home_absent", "variable_home_absente", "oracle_absent", "catalogue_absent"))
        assert isolation["node_actif"].startswith("22.")
        assert status == report["code_sortie"] == (1 if counts["échoué"] or counts["non évalué"] else 0)
except Exception:
    sys.exit(1)
' "$rapport" "$statut"; then
  printf '{"etat":"erreur_infrastructure","raison":"rapport_isole_invalide"}\n' > "$rapport"
  statut=2
fi

if [[ "$sortie" == '-' ]]; then
  cat -- "$rapport"
else
  provisoire=$(mktemp "${destination%/*}/.revi-json.XXXXXXXX") || erreur 'Création de la sortie impossible.' 'sortie_inaccessible'
  if ! cat -- "$rapport" > "$provisoire" || ! mv -fT -- "$provisoire" "$destination"; then
    rm -f -- "$provisoire"
    erreur 'Publication de la sortie impossible.' 'sortie_inaccessible'
  fi
fi
exit "$statut"
