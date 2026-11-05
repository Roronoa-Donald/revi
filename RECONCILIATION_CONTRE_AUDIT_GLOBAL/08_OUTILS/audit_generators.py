#!/usr/bin/env python3
"""
══════════════════════════════════════════════════════════════════════════════
OUTIL FORENSIQUE 06 : AUDIT STATIQUE ET SÉMANTIQUE DES GÉNÉRATEURS D'AUDIT
Analyse de scripts/build_audit_global_csvs.js et générateurs historiques
Recensement des 85+ patterns suspects, slice(), quotas en dur, fallbacks || 4
══════════════════════════════════════════════════════════════════════════════
"""

import os
import re
import json
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
TARGET_FILE = ROOT / "scripts" / "build_audit_global_csvs.js"
FINALISATION_FILE = ROOT / "scripts" / "build_finalisation_manifests.js"

OUT_MANIF = ROOT / "RECONCILIATION_CONTRE_AUDIT_GLOBAL" / "07_MANIFESTES"
OUT_PREUVES = ROOT / "RECONCILIATION_CONTRE_AUDIT_GLOBAL" / "05_PROVENANCE_PREUVES"
OUT_MANIF.mkdir(parents=True, exist_ok=True)
OUT_PREUVES.mkdir(parents=True, exist_ok=True)

print("=== [OUTIL 06] AUDIT SÉMANTIQUE DES GÉNÉRATEURS D'AUDIT ===")

patterns_to_detect = [
    ("SLICE_TRUNCATION", r"\.slice\s*\(\s*0\s*,\s*\d+\s*\)", "CRITIQUE", "Troncature artificielle d'effectifs pour forcer un quota prédéterminé"),
    ("FABRICATED_PROOF_STATUS", r"(TESTEE_RUNNER_OK|VERIFIEE_NON_REGRESSION|SPECIFIE_DANS_ENONCE|PROTEGE_SERVEUR_FASTIFY|CONFORME_VALIDATION_TECHNIQUE)", "CRITIQUE", "Attribution déclarative de statut de conformité ou de test sans exécution"),
    ("HARDCODED_RATIO", r"['\"]>\s*2\.0x['\"]", "MAJEURE", "Valeur de ratio docimologique codée en dur sans calcul mathématique"),
    ("SILENT_FALLBACK", r"\|\|\s*(4|0|1|['\"][^'\"]*['\"])", "MOYENNE", "Repli silencieux masquant des données manquantes ou corrompues"),
    ("CIRCULAR_CSV_DEPENDENCY", r"require\s*\([^)]*\.csv['\"]\)|readFileSync\s*\([^)]*\.csv['\"]\)", "MAJEURE", "Dépendance circulaire sur un livrable dérivé d'un audit antérieur au lieu des sources"),
    ("LOOSE_INCLUDES_CHECK", r"\.includes\s*\(['\"][^'\"]+['\"]\)", "FAIBLE", "Vérification par sous-chaîne lâche exposée aux faux positifs"),
    ("HARDCODED_PILOT_DEFINITION", r"pilotCourses\s*=\s*new\s*Set\s*\(\[[^\]]*\]\)", "MAJEURE", "Redéfinition arbitraire du périmètre pilote créant un artefact de population")
]

detected_anomalies = []

def scan_file(filepath: Path):
    if not filepath.exists():
        print(f"Fichier absent : {filepath}")
        return []
    
    findings = []
    lines = filepath.read_text(encoding="utf-8", errors="ignore").splitlines()
    for idx, line in enumerate(lines, start=1):
        for code, regex, severity, desc in patterns_to_detect:
            if re.search(regex, line):
                findings.append({
                    "fichier": str(filepath.relative_to(ROOT)),
                    "ligne": idx,
                    "code_pattern": code,
                    "severite": severity,
                    "description": desc,
                    "ligne_code": line.strip()
                })
    return findings

findings_target = scan_file(TARGET_FILE)
findings_final = scan_file(FINALISATION_FILE)

all_findings = findings_target + findings_final
print(f"Occurrences de patterns suspects détectées dans scripts/build_audit_global_csvs.js : {len(findings_target)}")
print(f"Occurrences de patterns suspects détectées dans scripts/build_finalisation_manifests.js : {len(findings_final)}")
print(f"Total général anomalies identifiées : {len(all_findings)}")

# Cartographie formelle des 10 anomalies structurelles majeures
formal_anomalies = [
    {
        "id_anomalie": "ANO-GEN-01",
        "composant": "scripts/build_audit_global_csvs.js",
        "ligne": 365,
        "severite": "CRITIQUE",
        "description": "activeNonPilot.slice(0, 814) : troncature aveugle des 44 exercices actifs B3 excédentaires pour forcer 814.",
        "donnees_affectees": "44 exercices de B3 (sup3, vo3, vrt3) supprimés du livrable d'audit.",
        "chiffre_fausse": "814 exercices certifiés (au lieu de 858 candidats non-pilotes du script).",
        "valeur_rectifiee": "814 historique légitime provient de 896 - 82 (55 pilotes réels + 27 complémentaires).",
        "statut": "EXPLIQUÉ_ET_RÉCONCILIÉ"
    },
    {
        "id_anomalie": "ANO-GEN-02",
        "composant": "scripts/build_finalisation_manifests.js",
        "ligne": 484,
        "severite": "CRITIQUE",
        "description": "rawChapterItems.slice(0, 2829) : troncature aveugle de 69 questions QCM pour forcer 3089 (2829 + 260).",
        "donnees_affectees": "69 questions authentiques de cours supprimées du registre QCM.",
        "chiffre_fausse": "3 089 QCM (au lieu de 3 158 réels).",
        "valeur_rectifiee": "3 185 QCM (2 925 cours dont Cyber sécurité B2 + 260 examens).",
        "statut": "EXPLIQUÉ_ET_RÉCONCILIÉ"
    },
    {
        "id_anomalie": "ANO-GEN-03",
        "composant": "scripts/build_audit_global_csvs.js",
        "ligne": "376-379",
        "severite": "CRITIQUE",
        "description": "Affectation en dur de TESTEE_RUNNER_OK, VERIFIEE_NON_REGRESSION, SPECIFIE_DANS_ENONCE sans exécution unitaire.",
        "donnees_affectees": "Colonnes de preuve de 06_AUDIT_814_EXERCICES.csv.",
        "chiffre_fausse": "Taux de validation runner unitaire déclaré à 100%.",
        "valeur_rectifiee": "Seul le banc global validateCatalogue() est exécuté ; les tests individuels runner sont partiels.",
        "statut": "RÉTROGRADÉ_EN_DÉCLARATIF"
    },
    {
        "id_anomalie": "ANO-GEN-04",
        "composant": "scripts/build_audit_global_csvs.js",
        "ligne": 483,
        "severite": "MAJEURE",
        "description": "Dépendance circulaire sur CONTRE_AUDIT_FINAL/02_AUDIT_3089_QCM.csv au lieu de parser server/content/.",
        "donnees_affectees": "Corpus entier de QCM audité dans l'audit global.",
        "chiffre_fausse": "Propagation du chiffre tronqué 3 089.",
        "valeur_rectifiee": "Extraction directe des modules JavaScript (3 185 questions).",
        "statut": "EXPLIQUÉ_ET_RÉCONCILIÉ"
    },
    {
        "id_anomalie": "ANO-GEN-05",
        "composant": "scripts/build_audit_global_csvs.js",
        "ligne": 569,
        "severite": "MAJEURE",
        "description": "Ratio d'asymétrie de longueur codé en dur à '> 2.0x' sans aucun calcul de longueur ou de ratio.",
        "donnees_affectees": "13_ASYMETRIE_701_QCM.csv.",
        "chiffre_fausse": "701 QCM asymétriques.",
        "valeur_rectifiee": "1 160 QCM asymétriques réels calculés (Méthode B) et 1 961 (Méthode A).",
        "statut": "CALCULÉ_ET_CERTIFIÉ"
    },
    {
        "id_anomalie": "ANO-GEN-06",
        "composant": "scripts/build_audit_global_csvs.js",
        "ligne": 268,
        "severite": "MAJEURE",
        "description": "Définition de pilotCourses avec ['linux', 'php', 'rd_java', 'probabilites', 'RD-RO'] au lieu de b1-linux.",
        "donnees_affectees": "Décompte des pilotes (74 fiches au lieu de 55/82) et non-pilotes (858 au lieu de 814).",
        "chiffre_fausse": "858 candidats non-pilotes, obligeant l'auteur à recourir à slice(0, 814).",
        "valeur_rectifiee": "55 pilotes actifs (b1-linux: 17, proba: 18, RD-RO: 20) + 27 complémentaires = 82.",
        "statut": "EXPLIQUÉ_ET_RÉCONCILIÉ"
    },
    {
        "id_anomalie": "ANO-GEN-07",
        "composant": "scripts/build_finalisation_manifests.js",
        "ligne": 354,
        "severite": "MAJEURE",
        "description": "Omission intégrale du dossier cyber-securite-b2 due à la casse du nom dans COURSES (Cyber securite B2).",
        "donnees_affectees": "27 questions QCM de Cyber sécurité B2 perdues.",
        "chiffre_fausse": "3 158 QCM au lieu de 3 185.",
        "valeur_rectifiee": "3 185 QCM (2 925 cours + 260 examens).",
        "statut": "EXPLIQUÉ_ET_RÉCONCILIÉ"
    },
    {
        "id_anomalie": "ANO-GEN-08",
        "composant": "scripts/build_audit_global_csvs.js",
        "ligne": "290-302",
        "severite": "MAJEURE",
        "description": "Détection lexicale superficielle sur description des tests (desc.includes('invalide'), etc.).",
        "donnees_affectees": "Classification des tests négatifs et limites.",
        "chiffre_fausse": "652 exercices sans tests (au lieu de 551 réels).",
        "valeur_rectifiee": "551 réels sans tests négatifs ou de limites (263 en possèdent : 135 négatifs, 138 limites, 10 les deux).",
        "statut": "EXPLIQUÉ_ET_RÉCONCILIÉ"
    },
    {
        "id_anomalie": "ANO-GEN-09",
        "composant": "scripts/build_audit_global_csvs.js",
        "ligne": "507-517",
        "severite": "MOYENNE",
        "description": "Replis silencieux systématiques via l'opérateur || (parseInt(cols[7], 10) || 4, etc.).",
        "donnees_affectees": "Valeurs par défaut substituées à des champs non parsés.",
        "chiffre_fausse": "Masquage d'erreurs de parsing CSV.",
        "valeur_rectifiee": "Extraction typée et validation stricte.",
        "statut": "CONTOURNÉ_PAR_PARSING_SOURCE"
    },
    {
        "id_anomalie": "ANO-GEN-10",
        "composant": "AUDIT_GLOBAL_FINAL/PREUVES",
        "ligne": "N/A",
        "severite": "MAJEURE",
        "description": "Copie de 5 fichiers de log de CONTRE_AUDIT_FINAL sans nouvelle exécution (SHA-256 identiques).",
        "donnees_affectees": "Preuves techniques HTTP, PostgreSQL, npm_test, checks.",
        "chiffre_fausse": "Prétention de ré-exécution indépendante et fraîche.",
        "valeur_rectifiee": "Rejeu effectif exécuté lors de la réconciliation forensique actuelle.",
        "statut": "RÉÉXÉCUTÉ_ET_CERTIFIÉ"
    }
]

# Sauvegarde des livrables
with open(OUT_MANIF / "manifest_anomalies_generateurs.json", "w", encoding="utf-8") as f:
    json.dump({
        "total_patterns_detectes": len(all_findings),
        "anomalies_structurelles": formal_anomalies,
        "details_occurrences": all_findings
    }, f, indent=2, ensure_ascii=False)

with open(OUT_MANIF / "manifest_anomalies_generateurs.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=[
        "id_anomalie", "composant", "ligne", "severite", "description",
        "donnees_affectees", "chiffre_fausse", "valeur_rectifiee", "statut"
    ], delimiter=";")
    writer.writeheader()
    writer.writerows(formal_anomalies)

with open(OUT_PREUVES / "scan_generateurs_exhaustif.json", "w", encoding="utf-8") as f:
    json.dump({
        "stats": {
            "build_audit_global_csvs": len(findings_target),
            "build_finalisation_manifests": len(findings_final),
            "total": len(all_findings)
        },
        "findings": all_findings
    }, f, indent=2, ensure_ascii=False)

print("Manifestes d'anomalies de générateurs écrits avec succès dans 07_MANIFESTES/.")
