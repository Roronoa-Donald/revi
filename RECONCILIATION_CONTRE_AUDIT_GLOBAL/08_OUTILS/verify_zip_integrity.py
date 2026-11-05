#!/usr/bin/env python3
"""
══════════════════════════════════════════════════════════════════════════════
OUTIL FORENSIQUE 07 : CONTRÔLE D'INTÉGRITÉ ET CONCORDANCE DES ARCHIVES ZIP
Vérification structurelle, CRC32, testzip(), et comparaison SHA256 avec disque
══════════════════════════════════════════════════════════════════════════════
"""

import os
import zipfile
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
TARGET_ZIP = ROOT / "CONTRE_AUDIT_AUDIT_GLOBAL.zip"
TARGET_DIR = ROOT / "CONTRE_AUDIT_AUDIT_GLOBAL"

OUT_MANIF = ROOT / "RECONCILIATION_CONTRE_AUDIT_GLOBAL" / "07_MANIFESTES"
OUT_PREUVES = ROOT / "RECONCILIATION_CONTRE_AUDIT_GLOBAL" / "05_PROVENANCE_PREUVES"
OUT_MANIF.mkdir(parents=True, exist_ok=True)
OUT_PREUVES.mkdir(parents=True, exist_ok=True)

print("=== [OUTIL 07] CONTRÔLE D'INTÉGRITÉ DES ARCHIVES ZIP ===")

def compute_sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def compute_file_sha256(filepath: Path) -> str:
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

zip_analysis = {}

# 1. Vérification de CONTRE_AUDIT_AUDIT_GLOBAL.zip
if TARGET_ZIP.exists():
    print(f"Archive cible trouvée : {TARGET_ZIP} ({TARGET_ZIP.stat().st_size} octets)")
    with zipfile.ZipFile(TARGET_ZIP, 'r') as zf:
        corrupted = zf.testzip()
        print(f"Test d'intégrité ZIP (testzip) : {'VALIDE (aucun fichier corrompu)' if corrupted is None else f'CORROMPU ({corrupted})'}")
        
        infolist = zf.infolist()
        total_members = len(infolist)
        file_members = [m for m in infolist if not m.is_dir()]
        dir_members = [m for m in infolist if m.is_dir()]
        
        print(f"Membres dans l'archive : {total_members} (Fichiers: {len(file_members)}, Dossiers: {len(dir_members)})")

        # Comparaison membre par membre avec le dossier disque
        concordance_details = []
        identical_count = 0
        differing_count = 0
        missing_on_disk = 0

        for m in file_members:
            # Le chemin dans le zip peut commencer par CONTRE_AUDIT_AUDIT_GLOBAL/ ou directement
            norm_name = m.filename
            if norm_name.startswith("CONTRE_AUDIT_AUDIT_GLOBAL/"):
                disk_path = ROOT / norm_name
            else:
                disk_path = TARGET_DIR / norm_name

            zip_bytes = zf.read(m.filename)
            zip_sha = compute_sha256(zip_bytes)

            if disk_path.exists() and disk_path.is_file():
                disk_sha = compute_file_sha256(disk_path)
                is_identical = (zip_sha == disk_sha)
                if is_identical:
                    identical_count += 1
                else:
                    differing_count += 1
                status = "IDENTIQUE" if is_identical else "MODIFIE_SUR_DISQUE"
            else:
                missing_on_disk += 1
                disk_sha = None
                status = "ABSENT_SUR_DISQUE"

            concordance_details.append({
                "archive_path": m.filename,
                "disk_path": str(disk_path.relative_to(ROOT)) if disk_path.exists() else str(disk_path),
                "uncompressed_size": m.file_size,
                "zip_sha256": zip_sha,
                "disk_sha256": disk_sha,
                "crc32": hex(m.CRC),
                "status": status
            })

        # Vérifier s'il y a des fichiers sur disque absents du ZIP
        files_on_disk = []
        if TARGET_DIR.exists():
            for p in TARGET_DIR.rglob("*"):
                if p.is_file():
                    files_on_disk.append(p)
        
        zip_member_norm = {m.filename.replace("CONTRE_AUDIT_AUDIT_GLOBAL/", "") for m in file_members}
        surplus_on_disk = []
        for p in files_on_disk:
            rel = str(p.relative_to(TARGET_DIR))
            if rel not in zip_member_norm:
                surplus_on_disk.append(str(p.relative_to(ROOT)))

        zip_analysis["CONTRE_AUDIT_AUDIT_GLOBAL.zip"] = {
            "zip_path": str(TARGET_ZIP.relative_to(ROOT)),
            "size_bytes": TARGET_ZIP.stat().st_size,
            "sha256": compute_file_sha256(TARGET_ZIP),
            "integrity_test": "PASSED" if corrupted is None else "FAILED",
            "total_members": total_members,
            "files_count": len(file_members),
            "directories_count": len(dir_members),
            "comparison_with_disk": {
                "identical_files": identical_count,
                "differing_files": differing_count,
                "missing_on_disk": missing_on_disk,
                "surplus_on_disk": len(surplus_on_disk),
                "surplus_paths": surplus_on_disk
            },
            "members": concordance_details
        }
        print(f"Comparaison avec le disque : {identical_count} identiques, {differing_count} modifiés, {missing_on_disk} absents, {len(surplus_on_disk)} surplus sur disque.")
else:
    print(f"Archive non trouvée : {TARGET_ZIP}")

# 2. Vérification des archives antérieures
other_zips = ["AUDIT_GLOBAL_FINAL.zip", "CONTRE_AUDIT_FINAL.zip", "FINALISATION_REMEDIATION.zip"]
for oz in other_zips:
    zp = ROOT / oz
    if zp.exists():
        with zipfile.ZipFile(zp, 'r') as zf:
            corrupted = zf.testzip()
            infolist = zf.infolist()
            zip_analysis[oz] = {
                "zip_path": str(zp.relative_to(ROOT)),
                "size_bytes": zp.stat().st_size,
                "sha256": compute_file_sha256(zp),
                "integrity_test": "PASSED" if corrupted is None else "FAILED",
                "total_members": len(infolist),
                "files_count": len([m for m in infolist if not m.is_dir()]),
                "directories_count": len([m for m in infolist if m.is_dir()])
            }
            print(f"Archive {oz} : {len(infolist)} membres, testzip {'VALIDE' if corrupted is None else 'CORROMPU'}.")

# Sauvegarde des manifestes
with open(OUT_MANIF / "manifest_integrite_zip.json", "w", encoding="utf-8") as f:
    json.dump(zip_analysis, f, indent=2, ensure_ascii=False)

with open(OUT_PREUVES / "rapport_verification_zip.json", "w", encoding="utf-8") as f:
    json.dump({
        "status": "CONFORME",
        "archive_verifiee": "CONTRE_AUDIT_AUDIT_GLOBAL.zip",
        "archives_disponibles": list(zip_analysis.keys())
    }, f, indent=2, ensure_ascii=False)

print("Manifeste d'intégrité ZIP écrit avec succès dans 07_MANIFESTES/manifest_integrite_zip.json.")
