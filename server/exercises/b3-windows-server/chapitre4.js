'use strict';

module.exports = [
  {
    "id": "ws3-c4-e1",
    "chapter": 4,
    "title": "Calculateur de permissions effectives (Partage SMB vs NTFS)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la permission réseau résultante selon la règle universelle Windows du plus restrictif entre le partage et le système de fichiers.",
    "brief": "Dans un accès distant à travers le protocole SMB, Windows Server applique l’intersection la plus restrictive entre les permissions de partage et les permissions NTFS :\n- Permissions Partage (Share) : `NONE` < `READ` < `CHANGE` < `FULL_CONTROL`\n- Permissions NTFS : `NONE` < `READ` < `WRITE` < `MODIFY` < `FULL_CONTROL`\n\nRègles d’évaluation des droits effectifs distants :\n- `FULL_CONTROL` effectif : requiert `share == FULL_CONTROL` ET `ntfs == FULL_CONTROL`.\n- `MODIFY` effectif : requiert `share >= CHANGE` ET `ntfs >= MODIFY`.\n- `WRITE` effectif : requiert `share >= CHANGE` ET `ntfs >= WRITE`.\n- `READ` effectif : requiert `share >= READ` ET `ntfs >= READ`.\n- Sinon : `NONE` (aucun accès).\n\nEntrée :\n`ACCESS user=<NOM> share=<NONE|READ|CHANGE|FULL_CONTROL> ntfs=<NONE|READ|WRITE|MODIFY|FULL_CONTROL>`\n\nSortie :\n- Pour chaque utilisateur :\n  `EFFECTIVE_ACCESS user=<NOM> share=<S> ntfs=<N> effective=<EFF>`\n- Bilan :\n  `SUMMARY total_users=<U> acces_ecriture=<W> lecture_seule=<R> aucun_acces=<Z>`\n  (acces_ecriture = WRITE, MODIFY, FULL_CONTROL ; lecture_seule = READ ; aucun_acces = NONE).",
    "starter": "# Grille d'analyse (ws3-c4-e1) — Calculateur de permissions effectives (Partage SMB vs NTFS)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Accès totalement refusé par le partage ou NTFS]\n# Données : ACCESS user=David share=NONE ntfs=FULL_CONTROL\n# Données : ACCESS user=Emma share=FULL_CONTROL ntfs=NONE\nA_COMPLETER\n\n[Cas 2 — Accès maximal Full Control des deux côtés]\n# Données : ACCESS user=Admin share=FULL_CONTROL ntfs=FULL_CONTROL\nA_COMPLETER\n\n[Cas 3 — Profils mixtes avec lecture seule et écriture]\n# Données : ACCESS user=User1 share=READ ntfs=READ\n# Données : ACCESS user=User2 share=CHANGE ntfs=READ\n# Données : ACCESS user=User3 share=CHANGE ntfs=MODIFY\nA_COMPLETER\n",
    "hints": [
      "Créer des échelles numériques ou fonctions booléennes pour chaque droit.",
      "Tester du plus haut au plus bas (FULL_CONTROL -> MODIFY -> WRITE -> READ -> NONE).",
      "Comptabiliser les types d’accès pour le résumé final."
    ],
    "examples": [
      {
        "stdin": "ACCESS user=Alice share=READ ntfs=FULL_CONTROL\nACCESS user=Bob share=FULL_CONTROL ntfs=MODIFY\nACCESS user=Charlie share=CHANGE ntfs=WRITE",
        "expected": "EFFECTIVE_ACCESS user=Alice share=READ ntfs=FULL_CONTROL effective=READ\nEFFECTIVE_ACCESS user=Bob share=FULL_CONTROL ntfs=MODIFY effective=MODIFY\nEFFECTIVE_ACCESS user=Charlie share=CHANGE ntfs=WRITE effective=WRITE\nSUMMARY total_users=3 acces_ecriture=2 lecture_seule=1 aucun_acces=0",
        "note": "Alice est bloquée en READ car son partage limite les droits malgré son NTFS Full Control. Bob obtient MODIFY (le partage autorise, NTFS bride)."
      }
    ],
    "tests": [
      {
        "label": "Accès totalement refusé par le partage ou NTFS",
        "stdin": "cas:1",
        "expected": "EFFECTIVE_ACCESS user=David share=NONE ntfs=FULL_CONTROL effective=NONE\nEFFECTIVE_ACCESS user=Emma share=FULL_CONTROL ntfs=NONE effective=NONE\nSUMMARY total_users=2 acces_ecriture=0 lecture_seule=0 aucun_acces=2"
      },
      {
        "label": "Accès maximal Full Control des deux côtés",
        "stdin": "cas:2",
        "expected": "EFFECTIVE_ACCESS user=Admin share=FULL_CONTROL ntfs=FULL_CONTROL effective=FULL_CONTROL\nSUMMARY total_users=1 acces_ecriture=1 lecture_seule=0 aucun_acces=0"
      },
      {
        "label": "Profils mixtes avec lecture seule et écriture",
        "stdin": "cas:3",
        "expected": "EFFECTIVE_ACCESS user=User1 share=READ ntfs=READ effective=READ\nEFFECTIVE_ACCESS user=User2 share=CHANGE ntfs=READ effective=READ\nEFFECTIVE_ACCESS user=User3 share=CHANGE ntfs=MODIFY effective=MODIFY\nSUMMARY total_users=3 acces_ecriture=1 lecture_seule=2 aucun_acces=0"
      }
    ],
    "solution": "[Exemple]\nEFFECTIVE_ACCESS user=Alice share=READ ntfs=FULL_CONTROL effective=READ\nEFFECTIVE_ACCESS user=Bob share=FULL_CONTROL ntfs=MODIFY effective=MODIFY\nEFFECTIVE_ACCESS user=Charlie share=CHANGE ntfs=WRITE effective=WRITE\nSUMMARY total_users=3 acces_ecriture=2 lecture_seule=1 aucun_acces=0\n\n[Cas 1 — Accès totalement refusé par le partage ou NTFS]\nEFFECTIVE_ACCESS user=David share=NONE ntfs=FULL_CONTROL effective=NONE\nEFFECTIVE_ACCESS user=Emma share=FULL_CONTROL ntfs=NONE effective=NONE\nSUMMARY total_users=2 acces_ecriture=0 lecture_seule=0 aucun_acces=2\n\n[Cas 2 — Accès maximal Full Control des deux côtés]\nEFFECTIVE_ACCESS user=Admin share=FULL_CONTROL ntfs=FULL_CONTROL effective=FULL_CONTROL\nSUMMARY total_users=1 acces_ecriture=1 lecture_seule=0 aucun_acces=0\n\n[Cas 3 — Profils mixtes avec lecture seule et écriture]\nEFFECTIVE_ACCESS user=User1 share=READ ntfs=READ effective=READ\nEFFECTIVE_ACCESS user=User2 share=CHANGE ntfs=READ effective=READ\nEFFECTIVE_ACCESS user=User3 share=CHANGE ntfs=MODIFY effective=MODIFY\nSUMMARY total_users=3 acces_ecriture=1 lecture_seule=2 aucun_acces=0"
  },
  {
    "id": "ws3-c4-e2",
    "chapter": 4,
    "title": "Moteur de résolution des conflits NTFS : Héritage, Allow et Deny explicite",
    "level": "n2",
    "language": "analyse",
    "goal": "Résoudre les permissions NTFS cumulatives pour chaque opération selon la hiérarchie : Explicit Deny > Explicit Allow > Inherited Deny > Inherited Allow.",
    "brief": "Dans le modèle de contrôle d’accès Windows NTFS (DACL), la priorité d’arbitrage pour chaque droit (`READ`, `WRITE`, `DELETE`) est ordonnée ainsi :\n1. `EXPLICIT_DENY` (Priorité absolue 4) -> Accordé : NON\n2. `EXPLICIT_ALLOW` (Priorité 3) -> Accordé : OUI (surpasse les refus hérités)\n3. `INHERITED_DENY` (Priorité 2) -> Accordé : NON\n4. `INHERITED_ALLOW` (Priorité 1) -> Accordé : OUI\n5. Défaut (`IMPLICIT_DENY`, Priorité 0) -> Accordé : NON\n\nEntrée :\n`USER name=<NOM> groups=<G1,G2,...>`\n`ACE target=<NOM_OU_GROUPE> type=<EXPLICIT|INHERITED> perm=<READ|WRITE|DELETE> action=<ALLOW|DENY>` (1 ou plusieurs)\n\nSortie :\n- Pour les trois droits `READ`, `WRITE`, `DELETE` (dans cet ordre) :\n  `PERM_RESULT perm=<P> status=<ACCORDE|REFUSE> decision_level=<NIVEAU>`\n- Bilan :\n  `SUMMARY user=<NOM> accordees=<A> refusees=<R>`",
    "starter": "# Grille d'analyse (ws3-c4-e2) — Moteur de résolution des conflits NTFS : Héritage, Allow et Deny explicite\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Explicit Deny direct verrouillant un droit]\n# Données : USER name=Bob groups=GG_Devs\n# Données : ACE target=GG_Devs type=EXPLICIT perm=READ action=ALLOW\n# Données : ACE target=Bob type=EXPLICIT perm=READ action=DENY\nA_COMPLETER\n\n[Cas 2 — Toutes les permissions accordées par héritage]\n# Données : USER name=Claire groups=GG_Admins\n# Données : ACE target=GG_Admins type=INHERITED perm=READ action=ALLOW\n# Données : ACE target=GG_Admins type=INHERITED perm=WRITE action=ALLOW\n# Données : ACE target=GG_Admins type=INHERITED perm=DELETE action=ALLOW\nA_COMPLETER\n\n[Cas 3 — Aucune ACE applicable (tout en refus implicite)]\n# Données : USER name=Inconnu groups=GG_Visiteurs\nA_COMPLETER\n",
    "hints": [
      "Filtrer les ACEs qui ciblent l’utilisateur ou l’un de ses groupes.",
      "Pour chaque droit, chercher la règle ayant le niveau de priorité le plus élevé.",
      "Déduire ACCORDE si action==ALLOW, REFUSE sinon."
    ],
    "examples": [
      {
        "stdin": "USER name=Alice groups=GG_Compta,GG_Employes\nACE target=GG_Employes type=INHERITED perm=DELETE action=DENY\nACE target=Alice type=EXPLICIT perm=DELETE action=ALLOW\nACE target=GG_Compta type=INHERITED perm=READ action=ALLOW",
        "expected": "PERM_RESULT perm=READ status=ACCORDE decision_level=INHERITED_ALLOW\nPERM_RESULT perm=WRITE status=REFUSE decision_level=IMPLICIT_DENY\nPERM_RESULT perm=DELETE status=ACCORDE decision_level=EXPLICIT_ALLOW\nSUMMARY user=Alice accordees=2 refusees=1",
        "note": "DELETE : Explicit Allow d’Alice bat le Inherited Deny du groupe GG_Employes. READ : accordé par héritage. WRITE : refus implicite."
      }
    ],
    "tests": [
      {
        "label": "Explicit Deny direct verrouillant un droit",
        "stdin": "cas:1",
        "expected": "PERM_RESULT perm=READ status=REFUSE decision_level=EXPLICIT_DENY\nPERM_RESULT perm=WRITE status=REFUSE decision_level=IMPLICIT_DENY\nPERM_RESULT perm=DELETE status=REFUSE decision_level=IMPLICIT_DENY\nSUMMARY user=Bob accordees=0 refusees=3"
      },
      {
        "label": "Toutes les permissions accordées par héritage",
        "stdin": "cas:2",
        "expected": "PERM_RESULT perm=READ status=ACCORDE decision_level=INHERITED_ALLOW\nPERM_RESULT perm=WRITE status=ACCORDE decision_level=INHERITED_ALLOW\nPERM_RESULT perm=DELETE status=ACCORDE decision_level=INHERITED_ALLOW\nSUMMARY user=Claire accordees=3 refusees=0"
      },
      {
        "label": "Aucune ACE applicable (tout en refus implicite)",
        "stdin": "cas:3",
        "expected": "PERM_RESULT perm=READ status=REFUSE decision_level=IMPLICIT_DENY\nPERM_RESULT perm=WRITE status=REFUSE decision_level=IMPLICIT_DENY\nPERM_RESULT perm=DELETE status=REFUSE decision_level=IMPLICIT_DENY\nSUMMARY user=Inconnu accordees=0 refusees=3"
      }
    ],
    "solution": "[Exemple]\nPERM_RESULT perm=READ status=ACCORDE decision_level=INHERITED_ALLOW\nPERM_RESULT perm=WRITE status=REFUSE decision_level=IMPLICIT_DENY\nPERM_RESULT perm=DELETE status=ACCORDE decision_level=EXPLICIT_ALLOW\nSUMMARY user=Alice accordees=2 refusees=1\n\n[Cas 1 — Explicit Deny direct verrouillant un droit]\nPERM_RESULT perm=READ status=REFUSE decision_level=EXPLICIT_DENY\nPERM_RESULT perm=WRITE status=REFUSE decision_level=IMPLICIT_DENY\nPERM_RESULT perm=DELETE status=REFUSE decision_level=IMPLICIT_DENY\nSUMMARY user=Bob accordees=0 refusees=3\n\n[Cas 2 — Toutes les permissions accordées par héritage]\nPERM_RESULT perm=READ status=ACCORDE decision_level=INHERITED_ALLOW\nPERM_RESULT perm=WRITE status=ACCORDE decision_level=INHERITED_ALLOW\nPERM_RESULT perm=DELETE status=ACCORDE decision_level=INHERITED_ALLOW\nSUMMARY user=Claire accordees=3 refusees=0\n\n[Cas 3 — Aucune ACE applicable (tout en refus implicite)]\nPERM_RESULT perm=READ status=REFUSE decision_level=IMPLICIT_DENY\nPERM_RESULT perm=WRITE status=REFUSE decision_level=IMPLICIT_DENY\nPERM_RESULT perm=DELETE status=REFUSE decision_level=IMPLICIT_DENY\nSUMMARY user=Inconnu accordees=0 refusees=3"
  },
  {
    "id": "ws3-c4-e3",
    "chapter": 4,
    "title": "Simulateur d’espaces de stockage et résilience Storage Spaces",
    "level": "n3",
    "language": "analyse",
    "goal": "Calculer la capacité utile, le taux d’efficacité et la tolérance aux pannes d’un pool de stockage Windows Server.",
    "brief": "La fonctionnalité Storage Spaces agrège des disques durs physiques en pools pour créer des espaces virtuels résilients :\n- `SIMPLE` (agrégation par bandes sans tolérance de panne) :\n  - Min disques : 1 | Pannes tolérées : 0 | Capacité utile = Somme brute | Efficacité = 100.0%\n- `TWO_WAY_MIRROR` (miroir double bidirectionnel) :\n  - Min disques : 2 | Pannes tolérées : 1 | Capacité utile = round(Somme brute / 2, 1) | Efficacité = 50.0%\n- `THREE_WAY_MIRROR` (miroir triple pour haute résilience) :\n  - Min disques : 5 | Pannes tolérées : 2 | Capacité utile = round(Somme brute / 3, 1) | Efficacité = 33.3%\n- `PARITY` (parité distribuée style RAID-5) :\n  - Min disques : 3 | Pannes tolérées : 1 | Capacité utile = round(Somme brute * (N - 1) / N, 1) | Efficacité = round(((N - 1) / N) * 100, 1)%\n\nEntrée :\n`POOL nom=<NOM> resiliency=<SIMPLE|TWO_WAY_MIRROR|THREE_WAY_MIRROR|PARITY>`\n`DISK id=<ID> size_gb=<N>` (1 ou plusieurs disques)\n\nSortie :\n- Si le nombre de disques est suffisant pour le mode choisi :\n  `POOL_RESULT nom=<P> disks=<N> raw_gb=<RAW> usable_gb=<USABLE> efficiency=<EFF>% fault_tolerance=<FT>_disks`\n  `SUMMARY status=VALIDE mode=<MODE>`\n- Si disques insuffisants :\n  `POOL_ERROR nom=<P> disques_fournis=<N> disques_requis=<MIN>`\n  `SUMMARY status=ERREUR_CAPACITE_MIN mode=<MODE>`",
    "starter": "# Grille d'analyse (ws3-c4-e3) — Simulateur d’espaces de stockage et résilience Storage Spaces\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Mode Parité avec 4 disques de 500 Go]\n# Données : POOL nom=Pool-Archives resiliency=PARITY\n# Données : DISK id=D1 size_gb=500\n# Données : DISK id=D2 size_gb=500\n# Données : DISK id=D3 size_gb=500\n# Données : DISK id=D4 size_gb=500\nA_COMPLETER\n\n[Cas 2 — Erreur : disques insuffisants pour Three-Way Mirror]\n# Données : POOL nom=Pool-Critique resiliency=THREE_WAY_MIRROR\n# Données : DISK id=D1 size_gb=2000\n# Données : DISK id=D2 size_gb=2000\n# Données : DISK id=D3 size_gb=2000\nA_COMPLETER\n\n[Cas 3 — Mode Simple mono-disque]\n# Données : POOL nom=Pool-Temp resiliency=SIMPLE\n# Données : DISK id=D1 size_gb=512\nA_COMPLETER\n",
    "hints": [
      "Vérifier N >= min_disks selon le mode de résilience.",
      "Calculer la somme totale des capacités brutes.",
      "Appliquer les formules de capacité utile et d’efficacité."
    ],
    "examples": [
      {
        "stdin": "POOL nom=Pool-Compta resiliency=TWO_WAY_MIRROR\nDISK id=D1 size_gb=1000\nDISK id=D2 size_gb=1000",
        "expected": "POOL_RESULT nom=Pool-Compta disks=2 raw_gb=2000 usable_gb=1000.0 efficiency=50.0% fault_tolerance=1_disks\nSUMMARY status=VALIDE mode=TWO_WAY_MIRROR",
        "note": "2 disques de 1 To = 2000 Go bruts. Miroir double = 1000.0 Go utiles, 1 panne tolérée, efficacité 50.0%."
      }
    ],
    "tests": [
      {
        "label": "Mode Parité avec 4 disques de 500 Go",
        "stdin": "cas:1",
        "expected": "POOL_RESULT nom=Pool-Archives disks=4 raw_gb=2000 usable_gb=1500.0 efficiency=75.0% fault_tolerance=1_disks\nSUMMARY status=VALIDE mode=PARITY"
      },
      {
        "label": "Erreur : disques insuffisants pour Three-Way Mirror",
        "stdin": "cas:2",
        "expected": "POOL_ERROR nom=Pool-Critique disques_fournis=3 disques_requis=5\nSUMMARY status=ERREUR_CAPACITE_MIN mode=THREE_WAY_MIRROR"
      },
      {
        "label": "Mode Simple mono-disque",
        "stdin": "cas:3",
        "expected": "POOL_RESULT nom=Pool-Temp disks=1 raw_gb=512 usable_gb=512.0 efficiency=100.0% fault_tolerance=0_disks\nSUMMARY status=VALIDE mode=SIMPLE"
      }
    ],
    "solution": "[Exemple]\nPOOL_RESULT nom=Pool-Compta disks=2 raw_gb=2000 usable_gb=1000.0 efficiency=50.0% fault_tolerance=1_disks\nSUMMARY status=VALIDE mode=TWO_WAY_MIRROR\n\n[Cas 1 — Mode Parité avec 4 disques de 500 Go]\nPOOL_RESULT nom=Pool-Archives disks=4 raw_gb=2000 usable_gb=1500.0 efficiency=75.0% fault_tolerance=1_disks\nSUMMARY status=VALIDE mode=PARITY\n\n[Cas 2 — Erreur : disques insuffisants pour Three-Way Mirror]\nPOOL_ERROR nom=Pool-Critique disques_fournis=3 disques_requis=5\nSUMMARY status=ERREUR_CAPACITE_MIN mode=THREE_WAY_MIRROR\n\n[Cas 3 — Mode Simple mono-disque]\nPOOL_RESULT nom=Pool-Temp disks=1 raw_gb=512 usable_gb=512.0 efficiency=100.0% fault_tolerance=0_disks\nSUMMARY status=VALIDE mode=SIMPLE"
  }
];
