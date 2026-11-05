import os
import hashlib
import json

ROOT = '/home/rd/Desktop/proba'
AG_DIR = os.path.join(ROOT, 'AUDIT_GLOBAL_FINAL', 'PREUVES')
CAF_DIR = os.path.join(ROOT, 'CONTRE_AUDIT_FINAL', 'PREUVES')
OUT_DIR = os.path.join(ROOT, 'CONTRE_AUDIT_AUDIT_GLOBAL', 'PREUVES')

def sha256_file(filepath):
    if not os.path.exists(filepath):
        return None
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

ag_files = os.listdir(AG_DIR) if os.path.exists(AG_DIR) else []
provenance_report = []

for filename in sorted(ag_files):
    ag_path = os.path.join(AG_DIR, filename)
    caf_path = os.path.join(CAF_DIR, filename)
    
    ag_hash = sha256_file(ag_path)
    caf_hash = sha256_file(caf_path)
    ag_size = os.path.getsize(ag_path)
    ag_mtime = os.path.getmtime(ag_path)
    
    provenance = 'INCONNUE'
    details = ''
    
    if caf_hash is not None and ag_hash == caf_hash:
        provenance = 'HERITEE_CONTRE_AUDIT'
        details = 'Identique octet par octet a CONTRE_AUDIT_FINAL/PREUVES/' + filename
    else:
        # Check if modified or newly generated
        provenance = 'FRAICHE_REEXECUTEE_OU_MODIFIEE'
        details = 'Different ou absent de CONTRE_AUDIT_FINAL/PREUVES/'

    provenance_report.append({
        'fichier': filename,
        'taille_octets': ag_size,
        'sha256_audit_global': ag_hash,
        'sha256_contre_audit': caf_hash,
        'provenance': provenance,
        'details': details
    })

print(f"Total fichiers de preuve dans AUDIT_GLOBAL_FINAL/PREUVES : {len(provenance_report)}")
for p in provenance_report:
    print(f"  - {p['fichier']:<30} : {p['provenance']} (ag={p['sha256_audit_global'][:12]}... caf={str(p['sha256_contre_audit'])[:12]}...)")

out_json = os.path.join(OUT_DIR, 'provenance_preuves_audit_global.json')
with open(out_json, 'w') as f:
    json.dump(provenance_report, f, indent=2)
print(f"Rapport de provenance ecrit : {out_json}")
