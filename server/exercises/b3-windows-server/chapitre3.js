'use strict';

module.exports = [
  {
    "id": "ws3-c3-e1",
    "chapter": 3,
    "title": "Calculateur de précédence de stratégies de groupe (Modèle LSDOU)",
    "level": "n1",
    "language": "analyse",
    "goal": "Calculer la valeur effective d’un paramètre selon l’ordre strict de traitement LSDOU (Local -> Site -> Domaine -> OU) et les liens de liaison.",
    "brief": "Le moteur Group Policy applique les stratégies selon la hiérarchie stricte LSDOU :\n- `LOCAL` (Priorité niveau 1)\n- `SITE` (Priorité niveau 2)\n- `DOMAIN` (Priorité niveau 3)\n- `OU` (Priorité niveau 4)\n\nRègles de précédence :\n1. Les niveaux s’appliquent dans l’ordre 1 -> 2 -> 3 -> 4. Un niveau supérieur (ex: OU) écrase toujours les niveaux inférieurs (ex: DOMAIN).\n2. Au sein d’un même niveau, les GPOs ont un numéro de liaison `link_order=1, 2, ...` : le link_order 1 est le plus prioritaire (il est traité en dernier dans le niveau et gagne face au link_order 2).\n\nEntrée :\n`GPO name=<NOM> level=<LOCAL|SITE|DOMAIN|OU> link_order=<N> param=<P> value=<V>`\n\nRésultat d’analyse attendu :\n- Pour chaque paramètre unique (trié par nom alphabétique) :\n  `EFFECTIVE_SETTING param=<P> value=<V> source_gpo=<NOM> level=<LEVEL>`\n- Bilan :\n  `SUMMARY params_evalues=<P> gpos_total=<G>`",
    "starter": "# Grille d'analyse (ws3-c3-e1) — Calculateur de précédence de stratégies de groupe (Modèle LSDOU)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux GPOs sur le même niveau DOMAIN départagées par link_order]\n# Données : GPO name=GPO_Base level=DOMAIN link_order=2 param=ScreenSaverTimeout value=900\n# Données : GPO name=GPO_Override level=DOMAIN link_order=1 param=ScreenSaverTimeout value=300\nA_COMPLETER\n\n[Cas 2 — Multiples paramètres distincts sur différents niveaux]\n# Données : GPO name=GPO_Site level=SITE link_order=1 param=ProxyServer value=proxy.site.lan\n# Données : GPO name=GPO_Domain level=DOMAIN link_order=1 param=Wallpaper value=corp.jpg\n# Données : GPO name=GPO_OU level=OU link_order=1 param=ProxyServer value=proxy.ou.lan\nA_COMPLETER\n\n[Cas 3 — Paramètre unique défini uniquement au niveau LOCAL]\n# Données : GPO name=LocalMachine level=LOCAL link_order=1 param=AuditLogon value=Success\nA_COMPLETER\n",
    "hints": [
      "Attribuer un poids numérique à chaque niveau (LOCAL:1, SITE:2, DOMAIN:3, OU:4).",
      "Pour le link_order, un ordre plus petit (1) doit avoir une priorité plus élevée que 2 (ex: utiliser -link_order).",
      "Trier par (poids_niveau, -link_order) pour déterminer la GPO gagnante."
    ],
    "examples": [
      {
        "stdin": "GPO name=DefaultDomainPolicy level=DOMAIN link_order=1 param=MaxPasswordAge value=42\nGPO name=LocalSecurity level=LOCAL link_order=1 param=MaxPasswordAge value=90\nGPO name=OUPolicy level=OU link_order=1 param=MaxPasswordAge value=30",
        "expected": "EFFECTIVE_SETTING param=MaxPasswordAge value=30 source_gpo=OUPolicy level=OU\nSUMMARY params_evalues=1 gpos_total=3",
        "note": "La GPO liée à l’OU a la plus forte précédence (niveau OU > DOMAIN > LOCAL) : 30 jours s’appliquent."
      }
    ],
    "tests": [
      {
        "label": "Deux GPOs sur le même niveau DOMAIN départagées par link_order",
        "stdin": "cas:1",
        "expected": "EFFECTIVE_SETTING param=ScreenSaverTimeout value=300 source_gpo=GPO_Override level=DOMAIN\nSUMMARY params_evalues=1 gpos_total=2"
      },
      {
        "label": "Multiples paramètres distincts sur différents niveaux",
        "stdin": "cas:2",
        "expected": "EFFECTIVE_SETTING param=ProxyServer value=proxy.ou.lan source_gpo=GPO_OU level=OU\nEFFECTIVE_SETTING param=Wallpaper value=corp.jpg source_gpo=GPO_Domain level=DOMAIN\nSUMMARY params_evalues=2 gpos_total=3"
      },
      {
        "label": "Paramètre unique défini uniquement au niveau LOCAL",
        "stdin": "cas:3",
        "expected": "EFFECTIVE_SETTING param=AuditLogon value=Success source_gpo=LocalMachine level=LOCAL\nSUMMARY params_evalues=1 gpos_total=1"
      }
    ],
    "solution": "[Exemple]\nEFFECTIVE_SETTING param=MaxPasswordAge value=30 source_gpo=OUPolicy level=OU\nSUMMARY params_evalues=1 gpos_total=3\n\n[Cas 1 — Deux GPOs sur le même niveau DOMAIN départagées par link_order]\nEFFECTIVE_SETTING param=ScreenSaverTimeout value=300 source_gpo=GPO_Override level=DOMAIN\nSUMMARY params_evalues=1 gpos_total=2\n\n[Cas 2 — Multiples paramètres distincts sur différents niveaux]\nEFFECTIVE_SETTING param=ProxyServer value=proxy.ou.lan source_gpo=GPO_OU level=OU\nEFFECTIVE_SETTING param=Wallpaper value=corp.jpg source_gpo=GPO_Domain level=DOMAIN\nSUMMARY params_evalues=2 gpos_total=3\n\n[Cas 3 — Paramètre unique défini uniquement au niveau LOCAL]\nEFFECTIVE_SETTING param=AuditLogon value=Success source_gpo=LocalMachine level=LOCAL\nSUMMARY params_evalues=1 gpos_total=1"
  },
  {
    "id": "ws3-c3-e2",
    "chapter": 3,
    "title": "Moteur d’arbitrage GPO : Enforced (No Override) vs Block Inheritance",
    "level": "n2",
    "language": "analyse",
    "goal": "Résoudre les conflits d’héritage entre une Unité Organisationnelle avec blocage et des GPOs parentes forcées (Enforced).",
    "brief": "Dans Active Directory, les règles avancées d’héritage de stratégies modifient le flux LSDOU :\n- `OU_SETTING ou=<OU> block_inheritance=<ENABLED|DISABLED>` : si ENABLED, toutes les GPOs des niveaux parents (Site, Domaine) sont bloquées.\n- `GPO name=<NOM> level=<DOMAIN|OU> enforced=<ENABLED|DISABLED> param=<P> value=<V>`\n\nRègle d’or Microsoft :\n1. Si une GPO parente (DOMAIN) a `enforced=ENABLED`, elle traverse TOUS les blocages d’héritage et NE PEUT PAS être écrasée par une GPO de l’OU enfant (sa valeur prévaut sur tout).\n2. Si `block_inheritance=ENABLED` sur l’OU, toutes les GPOs DOMAIN avec `enforced=DISABLED` sont purement et simplement IGNORÉES.\n3. Si `block_inheritance=DISABLED`, les GPOs DOMAIN (enforced=DISABLED) s’appliquent mais peuvent être écrasées par les GPOs de l’OU.\n\nRésultat d’analyse attendu :\n- Pour chaque paramètre (trié par nom alphabétique) :\n  `EFFECTIVE_SETTING param=<P> value=<V> source_gpo=<NOM>`\n- Bilan :\n  `SUMMARY block_applied=<TRUE|FALSE> enforced_count=<E> params_count=<P>`",
    "starter": "# Grille d'analyse (ws3-c3-e2) — Moteur d’arbitrage GPO : Enforced (No Override) vs Block Inheritance\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Blocage actif sans aucune GPO forcée]\n# Données : OU_SETTING ou=OU_Filiale block_inheritance=ENABLED\n# Données : GPO name=GPO_Domaine level=DOMAIN enforced=DISABLED param=WallPaper value=corporate.png\n# Données : GPO name=GPO_Filiale level=OU enforced=DISABLED param=WallPaper value=local.png\nA_COMPLETER\n\n[Cas 2 — Aucun blocage d’héritage (héritage normal écrasé par l’OU)]\n# Données : OU_SETTING ou=OU_Dev block_inheritance=DISABLED\n# Données : GPO name=GPO_Global level=DOMAIN enforced=DISABLED param=MaxLogSize value=2048\n# Données : GPO name=GPO_Local level=OU enforced=DISABLED param=MaxLogSize value=8192\nA_COMPLETER\n\n[Cas 3 — GPO Enforced sans aucune concurrence dans l’OU]\n# Données : OU_SETTING ou=OU_Standard block_inheritance=ENABLED\n# Données : GPO name=GPO_Audit level=DOMAIN enforced=ENABLED param=AuditPrivilege value=Enabled\nA_COMPLETER\n",
    "hints": [
      "Garder la valeur Enforced en priorité absolue (indétrônable).",
      "Si block_inheritance=ENABLED, éliminer les GPOs DOMAIN non forcées.",
      "Les GPOs de niveau OU s’appliquent ensuite si aucun Enforced ne verrouille le paramètre."
    ],
    "examples": [
      {
        "stdin": "OU_SETTING ou=OU_Finance block_inheritance=ENABLED\nGPO name=GPO_Securite level=DOMAIN enforced=ENABLED param=MinPasswordLength value=14\nGPO name=GPO_Domaine level=DOMAIN enforced=DISABLED param=ScreenTimeout value=15\nGPO name=GPO_Finance level=OU enforced=DISABLED param=MinPasswordLength value=8\nGPO name=GPO_Finance level=OU enforced=DISABLED param=ScreenTimeout value=60",
        "expected": "EFFECTIVE_SETTING param=MinPasswordLength value=14 source_gpo=GPO_Securite\nEFFECTIVE_SETTING param=ScreenTimeout value=60 source_gpo=GPO_Finance\nSUMMARY block_applied=TRUE enforced_count=1 params_count=2",
        "note": "MinPasswordLength est Enforced par le Domaine : il bat la tentative de réduction à 8 de l’OU. ScreenTimeout du Domaine est bloqué par l’OU, donc la valeur 60 de l’OU s’applique."
      }
    ],
    "tests": [
      {
        "label": "Blocage actif sans aucune GPO forcée",
        "stdin": "cas:1",
        "expected": "EFFECTIVE_SETTING param=WallPaper value=local.png source_gpo=GPO_Filiale\nSUMMARY block_applied=TRUE enforced_count=0 params_count=1"
      },
      {
        "label": "Aucun blocage d’héritage (héritage normal écrasé par l’OU)",
        "stdin": "cas:2",
        "expected": "EFFECTIVE_SETTING param=MaxLogSize value=8192 source_gpo=GPO_Local\nSUMMARY block_applied=FALSE enforced_count=0 params_count=1"
      },
      {
        "label": "GPO Enforced sans aucune concurrence dans l’OU",
        "stdin": "cas:3",
        "expected": "EFFECTIVE_SETTING param=AuditPrivilege value=Enabled source_gpo=GPO_Audit\nSUMMARY block_applied=TRUE enforced_count=1 params_count=1"
      }
    ],
    "solution": "[Exemple]\nEFFECTIVE_SETTING param=MinPasswordLength value=14 source_gpo=GPO_Securite\nEFFECTIVE_SETTING param=ScreenTimeout value=60 source_gpo=GPO_Finance\nSUMMARY block_applied=TRUE enforced_count=1 params_count=2\n\n[Cas 1 — Blocage actif sans aucune GPO forcée]\nEFFECTIVE_SETTING param=WallPaper value=local.png source_gpo=GPO_Filiale\nSUMMARY block_applied=TRUE enforced_count=0 params_count=1\n\n[Cas 2 — Aucun blocage d’héritage (héritage normal écrasé par l’OU)]\nEFFECTIVE_SETTING param=MaxLogSize value=8192 source_gpo=GPO_Local\nSUMMARY block_applied=FALSE enforced_count=0 params_count=1\n\n[Cas 3 — GPO Enforced sans aucune concurrence dans l’OU]\nEFFECTIVE_SETTING param=AuditPrivilege value=Enabled source_gpo=GPO_Audit\nSUMMARY block_applied=TRUE enforced_count=1 params_count=1"
  },
  {
    "id": "ws3-c3-e3",
    "chapter": 3,
    "title": "Évaluateur de filtres WMI et filtrage de sécurité (Security Filtering)",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier si une GPO est applicable à un poste client en évaluant l’appartenance aux groupes de sécurité et les critères matériels/OS du filtre WMI.",
    "brief": "Une stratégie de groupe n’est traitée par un ordinateur client que si elle satisfait deux filtres simultanés :\n1. Filtrage de sécurité : l’ordinateur doit appartenir à au moins un des groupes listés dans `security_groups`.\n2. Filtrez WMI : les spécifications de l’ordinateur doivent vérifier tous les critères techniques :\n   - `min_os_build` : `client.os_build >= gpo.min_os_build`\n   - `arch` : `gpo.arch == ANY` ou `client.arch == gpo.arch`\n   - `min_ram_gb` : `client.ram_gb >= gpo.min_ram_gb`\n\nEntrée :\n`CLIENT name=<NOM> os_build=<N> arch=<64BIT|32BIT> ram_gb=<N> groups=<G1,G2,...>`\n`GPO name=<NOM> security_groups=<G1,G2,...> min_os_build=<N> arch=<64BIT|32BIT|ANY> min_ram_gb=<N>` (1 ou plusieurs)\n\nRésultat d’analyse attendu :\n- Pour chaque GPO (triée par nom alphabétique) :\n  `GPO_EVAL gpo=<NOM> statut=<APPLIQUE|IGNORE> motif=<OK|REFUS_SECURITE|REFUS_WMI>`\n  (Priorité de motif : si la sécurité échoue -> `REFUS_SECURITE` ; si la sécurité passe mais WMI échoue -> `REFUS_WMI` ; si tout passe -> `OK`).\n- Bilan :\n  `SUMMARY total_gpos=<N> appliquees=<A> ignorees=<I>`",
    "starter": "# Grille d'analyse (ws3-c3-e3) — Évaluateur de filtres WMI et filtrage de sécurité (Security Filtering)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Refus WMI sur la quantité de RAM disponible]\n# Données : CLIENT name=PC-LITE os_build=22000 arch=64BIT ram_gb=8 groups=Domain_Computers\n# Données : GPO name=GPO_HyperV security_groups=Domain_Computers min_os_build=20000 arch=64BIT min_ram_gb=16\nA_COMPLETER\n\n[Cas 2 — Refus WMI sur l’architecture 32-bit]\n# Données : CLIENT name=PC-OLD os_build=17763 arch=32BIT ram_gb=4 groups=Domain_Computers\n# Données : GPO name=GPO_x64Only security_groups=Domain_Computers min_os_build=10000 arch=64BIT min_ram_gb=2\nA_COMPLETER\n\n[Cas 3 — Toutes les GPOs appliquées avec succès]\n# Données : CLIENT name=SRV-APP os_build=20348 arch=64BIT ram_gb=64 groups=Domain_Controllers,Servers\n# Données : GPO name=GPO_Hardening security_groups=Servers min_os_build=19000 arch=64BIT min_ram_gb=16\n# Données : GPO name=GPO_NTP security_groups=Servers min_os_build=10000 arch=ANY min_ram_gb=1\nA_COMPLETER\n",
    "hints": [
      "Comparer les ensembles de groupes avec set.intersection().",
      "Vérifier os_build, arch et ram_gb si la sécurité est validée.",
      "Classer le motif en REFUS_SECURITE, REFUS_WMI ou OK."
    ],
    "examples": [
      {
        "stdin": "CLIENT name=PC-DEV-01 os_build=19045 arch=64BIT ram_gb=16 groups=Domain_Computers,DevWorkstations\nGPO name=GPO_BitLocker security_groups=Domain_Computers min_os_build=19041 arch=ANY min_ram_gb=4\nGPO name=GPO_CADSoftware security_groups=Engineers min_os_build=19041 arch=64BIT min_ram_gb=32",
        "expected": "GPO_EVAL gpo=GPO_BitLocker statut=APPLIQUE motif=OK\nGPO_EVAL gpo=GPO_CADSoftware statut=IGNORE motif=REFUS_SECURITE\nSUMMARY total_gpos=2 appliquees=1 ignorees=1",
        "note": "GPO_BitLocker satisfait la sécurité et WMI (16 >= 4, build OK). GPO_CADSoftware est rejetée pour sécurité car le client n’est pas dans Engineers."
      }
    ],
    "tests": [
      {
        "label": "Refus WMI sur la quantité de RAM disponible",
        "stdin": "cas:1",
        "expected": "GPO_EVAL gpo=GPO_HyperV statut=IGNORE motif=REFUS_WMI\nSUMMARY total_gpos=1 appliquees=0 ignorees=1"
      },
      {
        "label": "Refus WMI sur l’architecture 32-bit",
        "stdin": "cas:2",
        "expected": "GPO_EVAL gpo=GPO_x64Only statut=IGNORE motif=REFUS_WMI\nSUMMARY total_gpos=1 appliquees=0 ignorees=1"
      },
      {
        "label": "Toutes les GPOs appliquées avec succès",
        "stdin": "cas:3",
        "expected": "GPO_EVAL gpo=GPO_Hardening statut=APPLIQUE motif=OK\nGPO_EVAL gpo=GPO_NTP statut=APPLIQUE motif=OK\nSUMMARY total_gpos=2 appliquees=2 ignorees=0"
      }
    ],
    "solution": "[Exemple]\nGPO_EVAL gpo=GPO_BitLocker statut=APPLIQUE motif=OK\nGPO_EVAL gpo=GPO_CADSoftware statut=IGNORE motif=REFUS_SECURITE\nSUMMARY total_gpos=2 appliquees=1 ignorees=1\n\n[Cas 1 — Refus WMI sur la quantité de RAM disponible]\nGPO_EVAL gpo=GPO_HyperV statut=IGNORE motif=REFUS_WMI\nSUMMARY total_gpos=1 appliquees=0 ignorees=1\n\n[Cas 2 — Refus WMI sur l’architecture 32-bit]\nGPO_EVAL gpo=GPO_x64Only statut=IGNORE motif=REFUS_WMI\nSUMMARY total_gpos=1 appliquees=0 ignorees=1\n\n[Cas 3 — Toutes les GPOs appliquées avec succès]\nGPO_EVAL gpo=GPO_Hardening statut=APPLIQUE motif=OK\nGPO_EVAL gpo=GPO_NTP statut=APPLIQUE motif=OK\nSUMMARY total_gpos=2 appliquees=2 ignorees=0"
  }
];
