'use strict';

module.exports = [
  {
    "id": "aw-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les familles de tâches de l’administrateur",
    "goal": "Ranger chaque tâche du support dans sa famille : comptes, logiciels, matériel, sécurité.",
    "brief": "<p>Analysez chaque ligne proposée « tache famille » : famille est un code parmi <code>comptes</code>, <code>logiciels</code>, <code>materiel</code> ou <code>securite</code>. Tâches du support : gérer les comptes utilisateurs → <code>comptes</code> ; installer, configurer, patcher → <code>logiciels</code> ; panne, remplacement, ajout → <code>materiel</code> ; sauvegardes fiables et contrôle d’accès → <code>securite</code>. Pour chaque ligne indiquez <code>tache : OK</code> ou <code>tache : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c1-e1) — Les familles de tâches de l’administrateur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre familles]\n# Données : 4\n# Données : comptes comptes\n# Données : patcher logiciels\n# Données : remplacement materiel\n# Données : acces securite\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : installer materiel\n# Données : panne securite\n# Données : sauvegardes comptes\n# Données : acces securite\nA_COMPLETER\n\n[Cas 3 — Journée d’admin]\n# Données : 5\n# Données : configurer logiciels\n# Données : ajout materiel\n# Données : sauvegardes securite\n# Données : comptes comptes\n# Données : patcher logiciels\nA_COMPLETER\n",
    "hints": [
      "Un case sur la tâche : comptes → comptes, installer/configurer/patcher → logiciels, panne/remplacement/ajout → materiel, sauvegardes/acces → securite.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\ncomptes comptes\ninstaller logiciels\npanne materiel\n",
        "expected": "comptes : OK\ninstaller : OK\npanne : OK\ncorrectes : 3/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Les quatre familles",
        "stdin": "cas:1",
        "expected": "comptes : OK\npatcher : OK\nremplacement : OK\nacces : OK\ncorrectes : 4/4"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "installer : ERREUR\npanne : ERREUR\nsauvegardes : ERREUR\nacces : OK\ncorrectes : 1/4"
      },
      {
        "label": "Journée d’admin",
        "stdin": "cas:3",
        "expected": "configurer : OK\najout : OK\nsauvegardes : OK\ncomptes : OK\npatcher : OK\ncorrectes : 5/5"
      }
    ],
    "solution": "[Exemple]\ncomptes : OK\ninstaller : OK\npanne : OK\ncorrectes : 3/3\n\n[Cas 1 — Les quatre familles]\ncomptes : OK\npatcher : OK\nremplacement : OK\nacces : OK\ncorrectes : 4/4\n\n[Cas 2 — Trois confusions]\ninstaller : ERREUR\npanne : ERREUR\nsauvegardes : ERREUR\nacces : OK\ncorrectes : 1/4\n\n[Cas 3 — Journée d’admin]\nconfigurer : OK\najout : OK\nsauvegardes : OK\ncomptes : OK\npatcher : OK\ncorrectes : 5/5"
  },
  {
    "id": "aw-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les trois types d’administration",
    "goal": "Décider à quel type d’administration répond chaque besoin.",
    "brief": "<p>Le support distingue trois types d’administration : d’un <strong>poste</strong> (station de travail), des <strong>serveurs</strong>, et <strong>réseau</strong> (liaisons et accès distants). Analysez chaque ligne proposée « besoin type » : type est un code parmi <code>poste</code>, <code>serveurs</code> ou <code>reseau</code>. Besoins : mettre à jour le PC d’un stagiaire → <code>poste</code> ; installer un rôle sur un serveur → <code>serveurs</code> ; configurer l’accès distant d’un site → <code>reseau</code> ; remplacer le disque d’un portable → <code>poste</code> ; héberger le dossier partagé de l’entreprise → <code>serveurs</code>. Pour chaque ligne indiquez <code>besoin : OK</code> ou <code>besoin : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c1-e2) — Les trois types d’administration\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Parc mixte]\n# Données : 5\n# Données : portable poste\n# Données : partage serveurs\n# Données : site reseau\n# Données : role serveurs\n# Données : stagiaire poste\nA_COMPLETER\n\n[Cas 2 — Trois erreurs]\n# Données : 4\n# Données : stagiaire serveurs\n# Données : role poste\n# Données : site serveurs\n# Données : distant reseau\nA_COMPLETER\n\n[Cas 3 — Tour de service]\n# Données : 5\n# Données : site reseau\n# Données : partage serveurs\n# Données : portable poste\n# Données : distant reseau\n# Données : role serveurs\nA_COMPLETER\n",
    "hints": [
      "Un case sur le besoin : stagiaire/portable → poste, role/partage → serveurs, distant/site → reseau.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nstagiaire poste\nrole serveurs\ndistant reseau\n",
        "expected": "stagiaire : OK\nrole : OK\ndistant : OK\ncorrectes : 3/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Parc mixte",
        "stdin": "cas:1",
        "expected": "portable : OK\npartage : OK\nsite : OK\nrole : OK\nstagiaire : OK\ncorrectes : 5/5"
      },
      {
        "label": "Trois erreurs",
        "stdin": "cas:2",
        "expected": "stagiaire : ERREUR\nrole : ERREUR\nsite : ERREUR\ndistant : OK\ncorrectes : 1/4"
      },
      {
        "label": "Tour de service",
        "stdin": "cas:3",
        "expected": "site : OK\npartage : OK\nportable : OK\ndistant : OK\nrole : OK\ncorrectes : 5/5"
      }
    ],
    "solution": "[Exemple]\nstagiaire : OK\nrole : OK\ndistant : OK\ncorrectes : 3/3\n\n[Cas 1 — Parc mixte]\nportable : OK\npartage : OK\nsite : OK\nrole : OK\nstagiaire : OK\ncorrectes : 5/5\n\n[Cas 2 — Trois erreurs]\nstagiaire : ERREUR\nrole : ERREUR\nsite : ERREUR\ndistant : OK\ncorrectes : 1/4\n\n[Cas 3 — Tour de service]\nsite : OK\npartage : OK\nportable : OK\ndistant : OK\nrole : OK\ncorrectes : 5/5"
  },
  {
    "id": "aw-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "La charge du jour : tâches normales et grosses",
    "goal": "Mesurer la charge quotidienne de l’administrateur : petites et grosses tâches.",
    "brief": "<p>Le support rappelle que l’administrateur « gère quotidiennement de multiples tâches, petites ou grosses ». Analysez chaque ligne proposée « tache duree » (durée en minutes). Une tâche de <strong>30 minutes ou plus</strong> est grosse, sinon normale. Pour chaque ligne indiquez <code>tache : normale</code> ou <code>tache : grosse</code>, puis <code>charge : X min</code> (somme des durées) et <code>grosses : Y</code>.</p>",
    "starter": "# Grille d'analyse (aw-c1-e3) — La charge du jour : tâches normales et grosses\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Journée chargée]\n# Données : 4\n# Données : comptes 15\n# Données : panne 60\n# Données : mails 5\n# Données : update 30\nA_COMPLETER\n\n[Cas 2 — Que des petites]\n# Données : 3\n# Données : mails 5\n# Données : comptes 10\n# Données : check 14\nA_COMPLETER\n\n[Cas 3 — Frontière exacte]\n# Données : 3\n# Données : a 29\n# Données : b 30\n# Données : c 31\nA_COMPLETER\n",
    "hints": [
      "Test de classement : duree -ge 30 → grosse, sinon normale ; la somme progresse dans les deux cas.",
      "Les deux bilans sortent une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\npatch 45\ncomptes 10\nsauvegarde 30\n",
        "expected": "patch : grosse\ncomptes : normale\nsauvegarde : grosse\ncharge : 85 min\ngrosses : 2",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Journée chargée",
        "stdin": "cas:1",
        "expected": "comptes : normale\npanne : grosse\nmails : normale\nupdate : grosse\ncharge : 110 min\ngrosses : 2"
      },
      {
        "label": "Que des petites",
        "stdin": "cas:2",
        "expected": "mails : normale\ncomptes : normale\ncheck : normale\ncharge : 29 min\ngrosses : 0"
      },
      {
        "label": "Frontière exacte",
        "stdin": "cas:3",
        "expected": "a : normale\nb : grosse\nc : grosse\ncharge : 90 min\ngrosses : 2"
      }
    ],
    "solution": "[Exemple]\npatch : grosse\ncomptes : normale\nsauvegarde : grosse\ncharge : 85 min\ngrosses : 2\n\n[Cas 1 — Journée chargée]\ncomptes : normale\npanne : grosse\nmails : normale\nupdate : grosse\ncharge : 110 min\ngrosses : 2\n\n[Cas 2 — Que des petites]\nmails : normale\ncomptes : normale\ncheck : normale\ncharge : 29 min\ngrosses : 0\n\n[Cas 3 — Frontière exacte]\na : normale\nb : grosse\nc : grosse\ncharge : 90 min\ngrosses : 2"
  },
  {
    "id": "aw-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Les quatre éditions de Windows Server 2012",
    "goal": "Associer chaque édition à sa limite : utilisateurs ou machines virtuelles.",
    "brief": "<p>Analysez chaque ligne proposée « edition limite » : limite est un code parmi <code>u15</code>, <code>u25</code>, <code>vm2</code> ou <code>vmillimite</code>. Éditions du support : <strong>Foundation</strong> (15 utilisateurs, pas de virtualisation) → <code>u15</code> ; <strong>Essential</strong> (25 utilisateurs) → <code>u25</code> ; <strong>Standard</strong> (2 machines virtuelles couvertes) → <code>vm2</code> ; <strong>Datacenter</strong> (machines virtuelles illimitées) → <code>vmillimite</code>. Pour chaque ligne indiquez <code>edition : OK</code> ou <code>edition : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c2-e1) — Les quatre éditions de Windows Server 2012\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre éditions]\n# Données : 4\n# Données : foundation u15\n# Données : essential u25\n# Données : standard vm2\n# Données : datacenter vmillimite\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : standard vmillimite\n# Données : datacenter vm2\n# Données : foundation u25\n# Données : essential u25\nA_COMPLETER\n\n[Cas 3 — Fiche catalogue]\n# Données : 4\n# Données : datacenter vmillimite\n# Données : standard vm2\n# Données : essential u25\n# Données : foundation u15\nA_COMPLETER\n",
    "hints": [
      "Un case sur l’édition : foundation → u15, essential → u25, standard → vm2, datacenter → vmillimite.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nfoundation u15\nessential u25\ndatacenter vmillimite\n",
        "expected": "foundation : OK\nessential : OK\ndatacenter : OK\ncorrectes : 3/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Les quatre éditions",
        "stdin": "cas:1",
        "expected": "foundation : OK\nessential : OK\nstandard : OK\ndatacenter : OK\ncorrectes : 4/4"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "standard : ERREUR\ndatacenter : ERREUR\nfoundation : ERREUR\nessential : OK\ncorrectes : 1/4"
      },
      {
        "label": "Fiche catalogue",
        "stdin": "cas:3",
        "expected": "datacenter : OK\nstandard : OK\nessential : OK\nfoundation : OK\ncorrectes : 4/4"
      }
    ],
    "solution": "[Exemple]\nfoundation : OK\nessential : OK\ndatacenter : OK\ncorrectes : 3/3\n\n[Cas 1 — Les quatre éditions]\nfoundation : OK\nessential : OK\nstandard : OK\ndatacenter : OK\ncorrectes : 4/4\n\n[Cas 2 — Trois confusions]\nstandard : ERREUR\ndatacenter : ERREUR\nfoundation : ERREUR\nessential : OK\ncorrectes : 1/4\n\n[Cas 3 — Fiche catalogue]\ndatacenter : OK\nstandard : OK\nessential : OK\nfoundation : OK\ncorrectes : 4/4"
  },
  {
    "id": "aw-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Configuration requise : installable ou pas ?",
    "goal": "Vérifier la configuration requise de Windows Server 2012 R2 machine par machine.",
    "brief": "<p>Configuration requise du support : 2 Go de RAM minimum (8 recommandés), 60 Go d’espace disque. Analysez chaque ligne proposée « poste ram disque » (ram et disque en Go). Pour chaque poste indiquez <code>poste : installable</code> si les deux minimums sont atteints, sinon <code>poste : a renforcer (motif)</code> avec motif = <code>ram</code>, <code>disque</code> ou <code>les-deux</code> (dans cet ordre de priorité), puis <code>installables : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c2-e2) — Configuration requise : installable ou pas ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Salle serveur]\n# Données : 4\n# Données : SRV1 8 120\n# Données : SRV2 2 60\n# Données : SRV3 1 30\n# Données : SRV4 2 59\nA_COMPLETER\n\n[Cas 2 — Que le disque manque]\n# Données : 3\n# Données : P1 8 50\n# Données : P2 4 59\n# Données : P3 16 60\nA_COMPLETER\n\n[Cas 3 — Juste aux minimums]\n# Données : 3\n# Données : MIN 2 60\n# Données : MOINS 1 60\n# Données : PLUS 8 100\nA_COMPLETER\n",
    "hints": [
      "Test ram d’abord : ram -lt 2 → a renforcer (ram) ou (les-deux) selon le disque.",
      "Puis disque : disque -lt 60 → a renforcer (disque) ; sinon installable, compteur incrémenté."
    ],
    "examples": [
      {
        "stdin": "3\nA 8 60\nB 1 100\nC 4 30\n",
        "expected": "A : installable\nB : a renforcer (ram)\nC : a renforcer (disque)\ninstallables : 1/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Salle serveur",
        "stdin": "cas:1",
        "expected": "SRV1 : installable\nSRV2 : installable\nSRV3 : a renforcer (les-deux)\nSRV4 : a renforcer (disque)\ninstallables : 2/4"
      },
      {
        "label": "Que le disque manque",
        "stdin": "cas:2",
        "expected": "P1 : a renforcer (disque)\nP2 : a renforcer (disque)\nP3 : installable\ninstallables : 1/3"
      },
      {
        "label": "Juste aux minimums",
        "stdin": "cas:3",
        "expected": "MIN : installable\nMOINS : a renforcer (ram)\nPLUS : installable\ninstallables : 2/3"
      }
    ],
    "solution": "[Exemple]\nA : installable\nB : a renforcer (ram)\nC : a renforcer (disque)\ninstallables : 1/3\n\n[Cas 1 — Salle serveur]\nSRV1 : installable\nSRV2 : installable\nSRV3 : a renforcer (les-deux)\nSRV4 : a renforcer (disque)\ninstallables : 2/4\n\n[Cas 2 — Que le disque manque]\nP1 : a renforcer (disque)\nP2 : a renforcer (disque)\nP3 : installable\ninstallables : 1/3\n\n[Cas 3 — Juste aux minimums]\nMIN : installable\nMOINS : a renforcer (ram)\nPLUS : installable\ninstallables : 2/3"
  },
  {
    "id": "aw-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "SAM et ouverture de session",
    "goal": "Former la bonne syntaxe de session selon le contexte du support.",
    "brief": "<p>Analysez chaque ligne proposée « contexte identite machine » où machine est le nom utilisé dans la syntaxe. Contextes du support : session <strong>locale</strong> (base SAM locale) → <code>machine\\utilisateur</code> ; session <strong>domaine-netbios</strong> → <code>NETBIOS\\identite</code> ; session <strong>domaine-upn</strong> → <code>identite@machine</code>. Pour chaque ligne indiquez la syntaxe formée <code>contexte : syntaxe</code>, puis <code>sessions : n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c2-e3) — SAM et ouverture de session\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Session locale]\n# Données : 2\n# Données : locale admin VM2012R2TEST\n# Données : locale root SERVEUR1\nA_COMPLETER\n\n[Cas 2 — Deux formes de domaine]\n# Données : 4\n# Données : domaine-netbios iziti NTIC\n# Données : domaine-upn iziti ntic.ma\n# Données : domaine-netbios ilham NTIC\n# Données : domaine-upn ilham ntic.ma\nA_COMPLETER\n\n[Cas 3 — Contextes mélangés]\n# Données : 3\n# Données : domaine-upn admin cdp.org\n# Données : locale admin SRV-AD\n# Données : domaine-netbios admin CDP\nA_COMPLETER\n",
    "hints": [
      "Locale et domaine-netbios utilisent l’antislash : machine\\utilisateur, machine\\identite.",
      "Domaine-upn utilise l’arobase : identite@machine (forme adresse e-mail)."
    ],
    "examples": [
      {
        "stdin": "3\nlocale admin SRV2012\ndomaine-netbios admin CDP\ndomaine-upn admin cdp.org\n",
        "expected": "locale : SRV2012\\admin\ndomaine-netbios : CDP\\admin\ndomaine-upn : admin@cdp.org\nsessions : 3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Session locale",
        "stdin": "cas:1",
        "expected": "locale : VM2012R2TEST\\admin\nlocale : SERVEUR1\\root\nsessions : 2"
      },
      {
        "label": "Deux formes de domaine",
        "stdin": "cas:2",
        "expected": "domaine-netbios : NTIC\\iziti\ndomaine-upn : iziti@ntic.ma\ndomaine-netbios : NTIC\\ilham\ndomaine-upn : ilham@ntic.ma\nsessions : 4"
      },
      {
        "label": "Contextes mélangés",
        "stdin": "cas:3",
        "expected": "domaine-upn : admin@cdp.org\nlocale : SRV-AD\\admin\ndomaine-netbios : CDP\\admin\nsessions : 3"
      }
    ],
    "solution": "[Exemple]\nlocale : SRV2012\\admin\ndomaine-netbios : CDP\\admin\ndomaine-upn : admin@cdp.org\nsessions : 3\n\n[Cas 1 — Session locale]\nlocale : VM2012R2TEST\\admin\nlocale : SERVEUR1\\root\nsessions : 2\n\n[Cas 2 — Deux formes de domaine]\ndomaine-netbios : NTIC\\iziti\ndomaine-upn : iziti@ntic.ma\ndomaine-netbios : NTIC\\ilham\ndomaine-upn : ilham@ntic.ma\nsessions : 4\n\n[Cas 3 — Contextes mélangés]\ndomaine-upn : admin@cdp.org\nlocale : SRV-AD\\admin\ndomaine-netbios : CDP\\admin\nsessions : 3"
  },
  {
    "id": "aw-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le Gestionnaire de serveur : qui fait quoi ?",
    "goal": "Rattacher chaque action à l’onglet du Gestionnaire de serveur.",
    "brief": "<p>Analysez chaque ligne proposée « action onglet » : onglet est un code parmi <code>tableaudebord</code>, <code>serveurlocal</code>, <code>notifications</code> ou <code>outils</code>. Actions du support : ajouter des rôles et fonctionnalités, créer un groupe de serveurs → <code>tableaudebord</code> ; renommer la machine, configurer la carte réseau, activer le bureau à distance → <code>serveurlocal</code> ; lire les messages d’erreur après l’installation d’un rôle → <code>notifications</code> ; ouvrir la console Pare-feu avec fonctions avancées → <code>outils</code>. Pour chaque ligne indiquez <code>action : OK</code> ou <code>action : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c3-e1) — Le Gestionnaire de serveur : qui fait quoi ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Visite guidée]\n# Données : 4\n# Données : roles tableaudebord\n# Données : groupes tableaudebord\n# Données : carte serveurlocal\n# Données : erreurs notifications\nA_COMPLETER\n\n[Cas 2 — Trois erreurs]\n# Données : 4\n# Données : roles outils\n# Données : erreurs tableaudebord\n# Données : renommer notifications\n# Données : bureau serveurlocal\nA_COMPLETER\n\n[Cas 3 — Prise en main]\n# Données : 5\n# Données : parefeu outils\n# Données : bureau serveurlocal\n# Données : erreurs notifications\n# Données : roles tableaudebord\n# Données : carte serveurlocal\nA_COMPLETER\n",
    "hints": [
      "Un case sur l’action : roles/groupes → tableaudebord, renommer/carte/bureau → serveurlocal, erreurs → notifications, parefeu → outils.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nroles tableaudebord\nrenommer serveurlocal\nparefeu outils\n",
        "expected": "roles : OK\nrenommer : OK\nparefeu : OK\ncorrectes : 3/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Visite guidée",
        "stdin": "cas:1",
        "expected": "roles : OK\ngroupes : OK\ncarte : OK\nerreurs : OK\ncorrectes : 4/4"
      },
      {
        "label": "Trois erreurs",
        "stdin": "cas:2",
        "expected": "roles : ERREUR\nerreurs : ERREUR\nrenommer : ERREUR\nbureau : OK\ncorrectes : 1/4"
      },
      {
        "label": "Prise en main",
        "stdin": "cas:3",
        "expected": "parefeu : OK\nbureau : OK\nerreurs : OK\nroles : OK\ncarte : OK\ncorrectes : 5/5"
      }
    ],
    "solution": "[Exemple]\nroles : OK\nrenommer : OK\nparefeu : OK\ncorrectes : 3/3\n\n[Cas 1 — Visite guidée]\nroles : OK\ngroupes : OK\ncarte : OK\nerreurs : OK\ncorrectes : 4/4\n\n[Cas 2 — Trois erreurs]\nroles : ERREUR\nerreurs : ERREUR\nrenommer : ERREUR\nbureau : OK\ncorrectes : 1/4\n\n[Cas 3 — Prise en main]\nparefeu : OK\nbureau : OK\nerreurs : OK\nroles : OK\ncarte : OK\ncorrectes : 5/5"
  },
  {
    "id": "aw-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Pare-feu : les trois profils",
    "goal": "Vérifier que les trois profils du pare-feu sont traités comme l’exige le support.",
    "brief": "<p>Le support est formel : « il faut bien penser à désactiver le pare-feu pour les 3 profils » (domaine, privé, public). Analysez les paramètres Windows Server fournis pour chaque cas. Pour chaque profil indiquez <code>profil : a desactiver</code> s’il est actif, sinon <code>profil : ok</code>, puis <code>a desactiver : X/3</code> — et si les trois profils sont inactifs, une dernière ligne <code>pare-feu pret</code>.</p>",
    "starter": "# Grille d'analyse (aw-c3-e2) — Pare-feu : les trois profils\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tout actif par défaut]\n# Données : domaine actif\n# Données : prive actif\n# Données : public actif\nA_COMPLETER\n\n[Cas 2 — RAS]\n# Données : domaine inactif\n# Données : prive inactif\n# Données : public inactif\nA_COMPLETER\n\n[Cas 3 — Un profil oublié]\n# Données : domaine inactif\n# Données : prive actif\n# Données : public inactif\nA_COMPLETER\n",
    "hints": [
      "etat = actif → « a desactiver » et compteur incrémenté ; sinon « ok ».",
      "Après la boucle : si ok = 0, afficher « pare-feu pret »."
    ],
    "examples": [
      {
        "stdin": "domaine actif\nprive inactif\npublic actif\n",
        "expected": "domaine : a desactiver\nprive : ok\npublic : a desactiver\na desactiver : 2/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Tout actif par défaut",
        "stdin": "cas:1",
        "expected": "domaine : a desactiver\nprive : a desactiver\npublic : a desactiver\na desactiver : 3/3"
      },
      {
        "label": "RAS",
        "stdin": "cas:2",
        "expected": "domaine : ok\nprive : ok\npublic : ok\na desactiver : 0/3\npare-feu pret"
      },
      {
        "label": "Un profil oublié",
        "stdin": "cas:3",
        "expected": "domaine : ok\nprive : a desactiver\npublic : ok\na desactiver : 1/3"
      }
    ],
    "solution": "[Exemple]\ndomaine : a desactiver\nprive : ok\npublic : a desactiver\na desactiver : 2/3\n\n[Cas 1 — Tout actif par défaut]\ndomaine : a desactiver\nprive : a desactiver\npublic : a desactiver\na desactiver : 3/3\n\n[Cas 2 — RAS]\ndomaine : ok\nprive : ok\npublic : ok\na desactiver : 0/3\npare-feu pret\n\n[Cas 3 — Un profil oublié]\ndomaine : ok\nprive : a desactiver\npublic : ok\na desactiver : 1/3"
  },
  {
    "id": "aw-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Adresse IP statique : valider avant d’appliquer",
    "goal": "Contrôler les adresses IPv4 et préfixes avant la commande New-NetIPAddress (PowerShell).",
    "brief": "<p>Analysez chaque ligne proposée « index ip prefixe » : index est le numéro d’interface (ifIndex), ip une adresse IPv4 à quatre octets séparés par des points, prefixe la longueur du masque (0 à 32). Une adresse est valide si ses quatre octets sont numériques et compris entre 0 et 255, et si le préfixe est entre 0 et 32. Pour chaque ligne indiquez <code>index : valide</code> ou <code>index : refusee</code>, puis <code>adresses : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c3-e3) — Adresse IP statique : valider avant d’appliquer\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Lot du TP]\n# Données : 4\n# Données : 12 192.168.1.203 24\n# Données : 12 10.10.10.10 8\n# Données : 13 300.1.1.1 24\n# Données : 14 192.168.1.5 33\nA_COMPLETER\n\n[Cas 2 — Bornes des octets]\n# Données : 3\n# Données : 20 0.0.0.0 0\n# Données : 21 255.255.255.255 32\n# Données : 22 256.0.0.1 24\nA_COMPLETER\n\n[Cas 3 — Serveur et DNS]\n# Données : 2\n# Données : 12 192.168.1.203 24\n# Données : 15 8.8.8.8 0\nA_COMPLETER\n",
    "hints": [
      "Découpage : IFS=\".\" Analysez chaque ligne de paramètres Windows Server.",
      "Une valeur non numérique ou > 255, un préfixe hors 0-32 : refusee."
    ],
    "examples": [
      {
        "stdin": "3\n12 192.168.1.203 24\n13 192.168.999.1 24\n14 10.10.10.10 40\n",
        "expected": "12 : valide\n13 : refusee\n14 : refusee\nadresses : 1/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Lot du TP",
        "stdin": "cas:1",
        "expected": "12 : valide\n12 : valide\n13 : refusee\n14 : refusee\nadresses : 2/4"
      },
      {
        "label": "Bornes des octets",
        "stdin": "cas:2",
        "expected": "20 : valide\n21 : valide\n22 : refusee\nadresses : 2/3"
      },
      {
        "label": "Serveur et DNS",
        "stdin": "cas:3",
        "expected": "12 : valide\n15 : valide\nadresses : 2/2"
      }
    ],
    "solution": "[Exemple]\n12 : valide\n13 : refusee\n14 : refusee\nadresses : 1/3\n\n[Cas 1 — Lot du TP]\n12 : valide\n12 : valide\n13 : refusee\n14 : refusee\nadresses : 2/4\n\n[Cas 2 — Bornes des octets]\n20 : valide\n21 : valide\n22 : refusee\nadresses : 2/3\n\n[Cas 3 — Serveur et DNS]\n12 : valide\n15 : valide\nadresses : 2/2"
  },
  {
    "id": "aw-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Domaine, arbre, forêt : le vocabulaire",
    "goal": "Associer chaque notion AD DS à sa définition du support.",
    "brief": "<p>Analysez chaque ligne proposée « notion definition » : definition est un code parmi <code>entite</code>, <code>contigu</code>, <code>arbres</code> ou <code>enfant</code>. Notions du support : le <strong>domaine</strong> est l’entité logique (administrative) qui héberge utilisateurs, ordinateurs et stratégies → <code>entite</code> ; un <strong>arbre</strong> regroupe des domaines partageant un espace de nom contigu → <code>contigu</code> ; une <strong>forêt</strong> est un regroupement d’arbres → <code>arbres</code> ; un <strong>sous-domaine</strong> dépend du domaine racine (domaine enfant) → <code>enfant</code>. Pour chaque ligne indiquez <code>notion : OK</code> ou <code>notion : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c4-e1) — Domaine, arbre, forêt : le vocabulaire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre notions]\n# Données : 4\n# Données : domaine entite\n# Données : arbre contigu\n# Données : foret arbres\n# Données : sousdomaine enfant\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : foret contigu\n# Données : arbre entite\n# Données : sousdomaine arbres\n# Données : domaine entite\nA_COMPLETER\n\n[Cas 3 — Interro écrite]\n# Données : 4\n# Données : sousdomaine enfant\n# Données : foret arbres\n# Données : arbre contigu\n# Données : domaine entite\nA_COMPLETER\n",
    "hints": [
      "Un case sur la notion : domaine → entite, arbre → contigu, foret → arbres, sousdomaine → enfant.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\ndomaine entite\narbre contigu\nforet arbres\n",
        "expected": "domaine : OK\narbre : OK\nforet : OK\ncorrectes : 3/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Les quatre notions",
        "stdin": "cas:1",
        "expected": "domaine : OK\narbre : OK\nforet : OK\nsousdomaine : OK\ncorrectes : 4/4"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "foret : ERREUR\narbre : ERREUR\nsousdomaine : ERREUR\ndomaine : OK\ncorrectes : 1/4"
      },
      {
        "label": "Interro écrite",
        "stdin": "cas:3",
        "expected": "sousdomaine : OK\nforet : OK\narbre : OK\ndomaine : OK\ncorrectes : 4/4"
      }
    ],
    "solution": "[Exemple]\ndomaine : OK\narbre : OK\nforet : OK\ncorrectes : 3/3\n\n[Cas 1 — Les quatre notions]\ndomaine : OK\narbre : OK\nforet : OK\nsousdomaine : OK\ncorrectes : 4/4\n\n[Cas 2 — Trois confusions]\nforet : ERREUR\narbre : ERREUR\nsousdomaine : ERREUR\ndomaine : OK\ncorrectes : 1/4\n\n[Cas 3 — Interro écrite]\nsousdomaine : OK\nforet : OK\narbre : OK\ndomaine : OK\ncorrectes : 4/4"
  },
  {
    "id": "aw-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "L’arborescence des succursales",
    "goal": "Classer racine et domaines enfants dans l’arborescence d’entreprise.",
    "brief": "<p>Le support construit cdp.org avec les sous-domaines paris.cdp.org et lome.cdp.org. Analysez chaque ligne proposée « domaine parent » : parent vaut <code>-</code> si le domaine est racine, sinon le nom de son parent. Pour chaque domaine indiquez <code>domaine : racine</code> ou <code>domaine : enfant de parent</code>, puis <code>racines : X</code> et <code>enfants : Y</code>.</p>",
    "starter": "# Grille d'analyse (aw-c4-e2) — L’arborescence des succursales\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une forêt, un arbre]\n# Données : 4\n# Données : cdp.org -\n# Données : paris.cdp.org cdp.org\n# Données : lome.cdp.org cdp.org\n# Données : dev.paris.cdp.org paris.cdp.org\nA_COMPLETER\n\n[Cas 2 — Deux arbres (rachat)]\n# Données : 5\n# Données : cdp.org -\n# Données : paris.cdp.org cdp.org\n# Données : college-paris.local -\n# Données : cameroun.college-paris.local college-paris.local\n# Données : dev.cameroun.college-paris.local cameroun.college-paris.local\nA_COMPLETER\n\n[Cas 3 — Racine seule]\n# Données : 1\n# Données : test.local -\nA_COMPLETER\n",
    "hints": [
      "parent = \"-\" → racine (r incrémenté) ; sinon « enfant de $parent » (e incrémenté).",
      "Les deux bilans sortent une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\ncdp.org -\nparis.cdp.org cdp.org\nlome.cdp.org cdp.org\n",
        "expected": "cdp.org : racine\nparis.cdp.org : enfant de cdp.org\nlome.cdp.org : enfant de cdp.org\nracines : 1\nenfants : 2",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Une forêt, un arbre",
        "stdin": "cas:1",
        "expected": "cdp.org : racine\nparis.cdp.org : enfant de cdp.org\nlome.cdp.org : enfant de cdp.org\ndev.paris.cdp.org : enfant de paris.cdp.org\nracines : 1\nenfants : 3"
      },
      {
        "label": "Deux arbres (rachat)",
        "stdin": "cas:2",
        "expected": "cdp.org : racine\nparis.cdp.org : enfant de cdp.org\ncollege-paris.local : racine\ncameroun.college-paris.local : enfant de college-paris.local\ndev.cameroun.college-paris.local : enfant de cameroun.college-paris.local\nracines : 2\nenfants : 3"
      },
      {
        "label": "Racine seule",
        "stdin": "cas:3",
        "expected": "test.local : racine\nracines : 1\nenfants : 0"
      }
    ],
    "solution": "[Exemple]\ncdp.org : racine\nparis.cdp.org : enfant de cdp.org\nlome.cdp.org : enfant de cdp.org\nracines : 1\nenfants : 2\n\n[Cas 1 — Une forêt, un arbre]\ncdp.org : racine\nparis.cdp.org : enfant de cdp.org\nlome.cdp.org : enfant de cdp.org\ndev.paris.cdp.org : enfant de paris.cdp.org\nracines : 1\nenfants : 3\n\n[Cas 2 — Deux arbres (rachat)]\ncdp.org : racine\nparis.cdp.org : enfant de cdp.org\ncollege-paris.local : racine\ncameroun.college-paris.local : enfant de college-paris.local\ndev.cameroun.college-paris.local : enfant de cameroun.college-paris.local\nracines : 2\nenfants : 3\n\n[Cas 3 — Racine seule]\ntest.local : racine\nracines : 1\nenfants : 0"
  },
  {
    "id": "aw-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Les objets par unité d’organisation",
    "goal": "Compter les objets AD DS logés dans chaque unité d’organisation.",
    "brief": "<p>Le support décrit des unités d’organisation « remplies d’objets de différentes classes : utilisateurs, ordinateurs, groupes, contrôleurs de domaine ». Analysez chaque ligne proposée « objet uo » et Indiquez d’abord chaque ligne <code>objet : uo</code>, puis pour chaque unité d’organisation, <strong>dans l’ordre de première apparition</strong>, <code>uo : X objets</code>, et enfin <code>uos : Y</code>.</p>",
    "starter": "# Grille d'analyse (aw-c4-e3) — Les objets par unité d’organisation\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux unités]\n# Données : 4\n# Données : iziti TRI\n# Données : pc-iziti TRI\n# Données : compta VENTES\n# Données : mgmt TRI\nA_COMPLETER\n\n[Cas 2 — Une UO par classe]\n# Données : 4\n# Données : admin DC\n# Données : pc-admin DC\n# Données : imprimantes DC\n# Données : groupes DC\nA_COMPLETER\n\n[Cas 3 — Ordre d’apparition]\n# Données : 4\n# Données : compta VENTES\n# Données : iziti TRI\n# Données : direction DG\n# Données : mgmt TRI\nA_COMPLETER\n",
    "hints": [
      "Nouvelle UO : [ -z \"${compte[$uo]+x}\" ] → ordre[$g]=$uo et g=$((g+1)).",
      "Les bilans sortent après la boucle : UO dans l’ordre du tableau ordre, puis g."
    ],
    "examples": [
      {
        "stdin": "3\niziti TRI\nposte1 TRI\ngroupe-ventes VENTES\n",
        "expected": "iziti : TRI\nposte1 : TRI\ngroupe-ventes : VENTES\nTRI : 2 objets\nVENTES : 1 objets\nuos : 2",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Deux unités",
        "stdin": "cas:1",
        "expected": "iziti : TRI\npc-iziti : TRI\ncompta : VENTES\nmgmt : TRI\nTRI : 3 objets\nVENTES : 1 objets\nuos : 2"
      },
      {
        "label": "Une UO par classe",
        "stdin": "cas:2",
        "expected": "admin : DC\npc-admin : DC\nimprimantes : DC\ngroupes : DC\nDC : 4 objets\nuos : 1"
      },
      {
        "label": "Ordre d’apparition",
        "stdin": "cas:3",
        "expected": "compta : VENTES\niziti : TRI\ndirection : DG\nmgmt : TRI\nVENTES : 1 objets\nTRI : 2 objets\nDG : 1 objets\nuos : 3"
      }
    ],
    "solution": "[Exemple]\niziti : TRI\nposte1 : TRI\ngroupe-ventes : VENTES\nTRI : 2 objets\nVENTES : 1 objets\nuos : 2\n\n[Cas 1 — Deux unités]\niziti : TRI\npc-iziti : TRI\ncompta : VENTES\nmgmt : TRI\nTRI : 3 objets\nVENTES : 1 objets\nuos : 2\n\n[Cas 2 — Une UO par classe]\nadmin : DC\npc-admin : DC\nimprimantes : DC\ngroupes : DC\nDC : 4 objets\nuos : 1\n\n[Cas 3 — Ordre d’apparition]\ncompta : VENTES\niziti : TRI\ndirection : DG\nmgmt : TRI\nVENTES : 1 objets\nTRI : 2 objets\nDG : 1 objets\nuos : 3"
  },
  {
    "id": "aw-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Le chemin d’un contrôleur de domaine",
    "goal": "Rattacher chaque jalon à sa phase : installation, configuration, vérification.",
    "brief": "<p>Analysez chaque ligne proposée « jalon phase » : phase est un code parmi <code>installation</code>, <code>configuration</code>, <code>verification</code> ou <code>finalisation</code>. Jalons du support : rôle AD DS et fonctionnalités ajoutés → <code>installation</code> ; promotion en contrôleur de domaine (nouvelle forêt, niveaux, mots de passe) → <code>configuration</code> ; vérification des prérequis → <code>verification</code> ; redémarrage obligatoire du serveur → <code>finalisation</code>. Pour chaque ligne indiquez <code>jalon : OK</code> ou <code>jalon : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c5-e1) — Le chemin d’un contrôleur de domaine\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre phases]\n# Données : 4\n# Données : role installation\n# Données : promotion configuration\n# Données : prerequis verification\n# Données : redemarrage finalisation\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : promotion installation\n# Données : prerequis configuration\n# Données : redemarrage verification\n# Données : role installation\nA_COMPLETER\n\n[Cas 3 — Déroulé complet]\n# Données : 4\n# Données : redemarrage finalisation\n# Données : prerequis verification\n# Données : promotion configuration\n# Données : role installation\nA_COMPLETER\n",
    "hints": [
      "Un case sur le jalon : role → installation, promotion → configuration, prerequis → verification, redemarrage → finalisation.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nrole installation\npromotion configuration\nredemarrage finalisation\n",
        "expected": "role : OK\npromotion : OK\nredemarrage : OK\ncorrectes : 3/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Les quatre phases",
        "stdin": "cas:1",
        "expected": "role : OK\npromotion : OK\nprerequis : OK\nredemarrage : OK\ncorrectes : 4/4"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "promotion : ERREUR\nprerequis : ERREUR\nredemarrage : ERREUR\nrole : OK\ncorrectes : 1/4"
      },
      {
        "label": "Déroulé complet",
        "stdin": "cas:3",
        "expected": "redemarrage : OK\nprerequis : OK\npromotion : OK\nrole : OK\ncorrectes : 4/4"
      }
    ],
    "solution": "[Exemple]\nrole : OK\npromotion : OK\nredemarrage : OK\ncorrectes : 3/3\n\n[Cas 1 — Les quatre phases]\nrole : OK\npromotion : OK\nprerequis : OK\nredemarrage : OK\ncorrectes : 4/4\n\n[Cas 2 — Trois confusions]\npromotion : ERREUR\nprerequis : ERREUR\nredemarrage : ERREUR\nrole : OK\ncorrectes : 1/4\n\n[Cas 3 — Déroulé complet]\nredemarrage : OK\nprerequis : OK\npromotion : OK\nrole : OK\ncorrectes : 4/4"
  },
  {
    "id": "aw-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Les informations à réunir avant la configuration",
    "goal": "Distinguer les informations requises de celles qu’on ignore.",
    "brief": "<p>Avant de configurer AD DS, le support exige : le <strong>nom DNS</strong> du domaine, le <strong>nom NetBIOS</strong>, le niveau fonctionnel, le fait que le contrôleur sera aussi <strong>DNS</strong>, et l’emplacement de la base <strong>NTDS.DIT</strong> et de <strong>SYSVOL</strong> (+ le mot de passe de restauration). Analysez chaque ligne proposée « info statut » où statut vaut <code>fourni</code> ou <code>manquant</code>. Pour chaque info requise manquante indiquez <code>info : bloquante</code>, pour chaque info requise fournie <code>info : prete</code>, et pour toute autre ligne <code>info : ignoree</code> — puis <code>bloquantes : X</code> et, si X vaut 0, <code>configuration possible</code>.</p>",
    "starter": "# Grille d'analyse (aw-c5-e2) — Les informations à réunir avant la configuration\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dossier complet]\n# Données : 5\n# Données : dns fourni\n# Données : netbios fourni\n# Données : niveau fourni\n# Données : restauration fourni\n# Données : sysvol fourni\nA_COMPLETER\n\n[Cas 2 — Deux manques]\n# Données : 5\n# Données : dns manquant\n# Données : netbios fourni\n# Données : ntds fourni\n# Données : sysvol manquant\n# Données : proxy fourni\nA_COMPLETER\n\n[Cas 3 — Que du superficiel]\n# Données : 3\n# Données : fondEcran fourni\n# Données : proxy fourni\n# Données : theme fourni\nA_COMPLETER\n",
    "hints": [
      "Infos requises : dns, netbios, niveau, dnsrole, ntds, sysvol, restauration — tout le reste est ignoré.",
      "Requise + manquante → bloquante (compteur) ; requise + fournie → prete ; verdict final si 0 bloquante."
    ],
    "examples": [
      {
        "stdin": "4\ndns fourni\nnetbios manquant\nfondEcran fourni\nntds fourni\n",
        "expected": "dns : prete\nnetbios : bloquante\nfondEcran : ignoree\nntds : prete\nbloquantes : 1",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Dossier complet",
        "stdin": "cas:1",
        "expected": "dns : prete\nnetbios : prete\nniveau : prete\nrestauration : prete\nsysvol : prete\nbloquantes : 0\nconfiguration possible"
      },
      {
        "label": "Deux manques",
        "stdin": "cas:2",
        "expected": "dns : bloquante\nnetbios : prete\nntds : prete\nsysvol : bloquante\nproxy : ignoree\nbloquantes : 2"
      },
      {
        "label": "Que du superficiel",
        "stdin": "cas:3",
        "expected": "fondEcran : ignoree\nproxy : ignoree\ntheme : ignoree\nbloquantes : 0\nconfiguration possible"
      }
    ],
    "solution": "[Exemple]\ndns : prete\nnetbios : bloquante\nfondEcran : ignoree\nntds : prete\nbloquantes : 1\n\n[Cas 1 — Dossier complet]\ndns : prete\nnetbios : prete\nniveau : prete\nrestauration : prete\nsysvol : prete\nbloquantes : 0\nconfiguration possible\n\n[Cas 2 — Deux manques]\ndns : bloquante\nnetbios : prete\nntds : prete\nsysvol : bloquante\nproxy : ignoree\nbloquantes : 2\n\n[Cas 3 — Que du superficiel]\nfondEcran : ignoree\nproxy : ignoree\ntheme : ignoree\nbloquantes : 0\nconfiguration possible"
  },
  {
    "id": "aw-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Niveau fonctionnel et mot de passe de restauration",
    "goal": "Contrôler le niveau fonctionnel choisi et la robustesse du mot de passe DSRM.",
    "brief": "<p>Le support conseille « le niveau fonctionnel le plus haut » (2012 R2) et un mot de passe de restauration solide, utilisé seulement si l’AD DS devient inaccessible. Analysez chaque ligne proposée « domaine niveau longueur » : niveau est le niveau fonctionnel choisi, longueur la taille du mot de passe de restauration. Le domaine est conforme si le niveau vaut <code>2012R2</code> ET la longueur est au moins 12. Pour chaque ligne indiquez <code>domaine : conforme</code> ou <code>domaine : a revoir (motif)</code> avec motif = <code>niveau</code>, <code>mdp</code> ou <code>les-deux</code> (dans cet ordre de priorité), puis <code>conformes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c5-e3) — Niveau fonctionnel et mot de passe de restauration\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Rattrapage]\n# Données : 4\n# Données : a 2012R2 12\n# Données : b 2008 12\n# Données : c 2012R2 10\n# Données : d 2003 5\nA_COMPLETER\n\n[Cas 2 — Tout au plus haut]\n# Données : 3\n# Données : cdp.org 2012R2 20\n# Données : lome 2012R2 14\n# Données : paris 2012R2 12\nA_COMPLETER\n\n[Cas 3 — Que les mots de passe]\n# Données : 3\n# Données : x 2012R2 11\n# Données : y 2012R2 8\n# Données : z 2012R2 30\nA_COMPLETER\n",
    "hints": [
      "Niveau d’abord : niveau != 2012R2 → a revoir (niveau) ou (les-deux) selon la longueur.",
      "Puis longueur : longueur -lt 12 → a revoir (mdp) ; sinon conforme, compteur incrémenté."
    ],
    "examples": [
      {
        "stdin": "3\ncdp.org 2012R2 16\nfiliere 2008 20\nstage 2012R2 8\n",
        "expected": "cdp.org : conforme\nfiliere : a revoir (niveau)\nstage : a revoir (mdp)\nconformes : 1/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Rattrapage",
        "stdin": "cas:1",
        "expected": "a : conforme\nb : a revoir (niveau)\nc : a revoir (mdp)\nd : a revoir (les-deux)\nconformes : 1/4"
      },
      {
        "label": "Tout au plus haut",
        "stdin": "cas:2",
        "expected": "cdp.org : conforme\nlome : conforme\nparis : conforme\nconformes : 3/3"
      },
      {
        "label": "Que les mots de passe",
        "stdin": "cas:3",
        "expected": "x : a revoir (mdp)\ny : a revoir (mdp)\nz : conforme\nconformes : 1/3"
      }
    ],
    "solution": "[Exemple]\ncdp.org : conforme\nfiliere : a revoir (niveau)\nstage : a revoir (mdp)\nconformes : 1/3\n\n[Cas 1 — Rattrapage]\na : conforme\nb : a revoir (niveau)\nc : a revoir (mdp)\nd : a revoir (les-deux)\nconformes : 1/4\n\n[Cas 2 — Tout au plus haut]\ncdp.org : conforme\nlome : conforme\nparis : conforme\nconformes : 3/3\n\n[Cas 3 — Que les mots de passe]\nx : a revoir (mdp)\ny : a revoir (mdp)\nz : conforme\nconformes : 1/3"
  },
  {
    "id": "aw-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Les classes d’objets AD DS",
    "goal": "Classer chaque objet dans sa classe : utilisateur, ordinateur, groupe, contrôleur.",
    "brief": "<p>Analysez chaque ligne proposée « objet classe » : classe est un code parmi <code>utilisateur</code>, <code>ordinateur</code>, <code>groupe</code> ou <code>controleur</code>. Objets du support : iziti, ilham → <code>utilisateur</code> ; poste-compta, portable-dir → <code>ordinateur</code> ; grp-ventes, grp-info → <code>groupe</code> ; SRV-DC1, SRV-DC2 → <code>controleur</code>. Pour chaque ligne indiquez <code>objet : OK</code> ou <code>objet : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c6-e1) — Les classes d’objets AD DS\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Console complète]\n# Données : 6\n# Données : iziti utilisateur\n# Données : ilham utilisateur\n# Données : portable-dir ordinateur\n# Données : grp-info groupe\n# Données : SRV-DC1 controleur\n# Données : SRV-DC2 controleur\nA_COMPLETER\n\n[Cas 2 — Trois erreurs]\n# Données : 4\n# Données : iziti ordinateur\n# Données : portable-dir utilisateur\n# Données : SRV-DC1 groupe\n# Données : grp-ventes groupe\nA_COMPLETER\n\n[Cas 3 — Tri à la main]\n# Données : 6\n# Données : SRV-DC2 controleur\n# Données : grp-ventes groupe\n# Données : portable-dir ordinateur\n# Données : ilham utilisateur\n# Données : SRV-DC1 controleur\n# Données : iziti utilisateur\nA_COMPLETER\n",
    "hints": [
      "Un case sur l’objet : iziti/ilham → utilisateur, poste/portable → ordinateur, grp → groupe, SRV-DC → controleur.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\niziti utilisateur\nposte-compta ordinateur\ngrp-ventes groupe\n",
        "expected": "iziti : OK\nposte-compta : OK\ngrp-ventes : OK\ncorrectes : 3/3",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Console complète",
        "stdin": "cas:1",
        "expected": "iziti : OK\nilham : OK\nportable-dir : OK\ngrp-info : OK\nSRV-DC1 : OK\nSRV-DC2 : OK\ncorrectes : 6/6"
      },
      {
        "label": "Trois erreurs",
        "stdin": "cas:2",
        "expected": "iziti : ERREUR\nportable-dir : ERREUR\nSRV-DC1 : ERREUR\ngrp-ventes : OK\ncorrectes : 1/4"
      },
      {
        "label": "Tri à la main",
        "stdin": "cas:3",
        "expected": "SRV-DC2 : OK\ngrp-ventes : OK\nportable-dir : OK\nilham : OK\nSRV-DC1 : OK\niziti : OK\ncorrectes : 6/6"
      }
    ],
    "solution": "[Exemple]\niziti : OK\nposte-compta : OK\ngrp-ventes : OK\ncorrectes : 3/3\n\n[Cas 1 — Console complète]\niziti : OK\nilham : OK\nportable-dir : OK\ngrp-info : OK\nSRV-DC1 : OK\nSRV-DC2 : OK\ncorrectes : 6/6\n\n[Cas 2 — Trois erreurs]\niziti : ERREUR\nportable-dir : ERREUR\nSRV-DC1 : ERREUR\ngrp-ventes : OK\ncorrectes : 1/4\n\n[Cas 3 — Tri à la main]\nSRV-DC2 : OK\ngrp-ventes : OK\nportable-dir : OK\nilham : OK\nSRV-DC1 : OK\niziti : OK\ncorrectes : 6/6"
  },
  {
    "id": "aw-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Créer les utilisateurs : UPN et options de compte",
    "goal": "Valider l’UPN de chaque utilisateur et signaler l’option de mot de passe.",
    "brief": "<p>Le support crée les utilisateurs dans l’unité puis distingue les deux formes de session : <strong>UPN</strong> (forme adresse e-mail, contient une arobase) et <code>DOMAINE\\login</code>. Analysez chaque ligne proposée « utilisateur upn changement » : upn est l’identifiant saisi, changement vaut <code>oui</code> (doit changer son mot de passe à la prochaine ouverture) ou <code>non</code>. Pour chaque utilisateur indiquez <code>utilisateur : upn-valide</code> si l’UPN contient une arobase, sinon <code>utilisateur : forme-domaine</code> ; et il note <code>utilisateur : init-mdp</code> en plus si changement vaut oui. Enfin <code>upn : X/n</code> et <code>a-initialiser : Y</code>.</p>",
    "starter": "# Grille d'analyse (aw-c6-e2) — Créer les utilisateurs : UPN et options de compte\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Promotion 2026]\n# Données : 4\n# Données : a.ade a.ade@ntic.ma oui\n# Données : b.ben NTIC\\\\b.ben oui\n# Données : c.cia c.cia@ntic.ma non\n# Données : d.dan NTIC\\\\d.dan non\nA_COMPLETER\n\n[Cas 2 — Que des UPN]\n# Données : 3\n# Données : me me@cdp.org non\n# Données : you you@cdp.org oui\n# Données : us us@cdp.org non\nA_COMPLETER\n\n[Cas 3 — Que du domaine]\n# Données : 3\n# Données : a CD\\\\a non\n# Données : b CD\\\\b non\n# Données : c CD\\\\c oui\nA_COMPLETER\n",
    "hints": [
      "L’arobase dans une variable : case \"$identifiant\" in *@*) forme UPN ;; *) forme domaine ;;",
      "changement = oui → ligne init-mdp en plus et compteur ; les deux bilans après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\niziti iziti@ntic.ma oui\nilham NTIC\\\\ilham non\ndemo demo@ntic.ma non\n",
        "expected": "iziti : upn-valide\niziti : init-mdp\nilham : forme-domaine\ndemo : upn-valide\nupn : 2/3\na-initialiser : 1",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Promotion 2026",
        "stdin": "cas:1",
        "expected": "a.ade : upn-valide\na.ade : init-mdp\nb.ben : forme-domaine\nb.ben : init-mdp\nc.cia : upn-valide\nd.dan : forme-domaine\nupn : 2/4\na-initialiser : 2"
      },
      {
        "label": "Que des UPN",
        "stdin": "cas:2",
        "expected": "me : upn-valide\nyou : upn-valide\nyou : init-mdp\nus : upn-valide\nupn : 3/3\na-initialiser : 1"
      },
      {
        "label": "Que du domaine",
        "stdin": "cas:3",
        "expected": "a : forme-domaine\nb : forme-domaine\nc : forme-domaine\nc : init-mdp\nupn : 0/3\na-initialiser : 1"
      }
    ],
    "solution": "[Exemple]\niziti : upn-valide\niziti : init-mdp\nilham : forme-domaine\ndemo : upn-valide\nupn : 2/3\na-initialiser : 1\n\n[Cas 1 — Promotion 2026]\na.ade : upn-valide\na.ade : init-mdp\nb.ben : forme-domaine\nb.ben : init-mdp\nc.cia : upn-valide\nd.dan : forme-domaine\nupn : 2/4\na-initialiser : 2\n\n[Cas 2 — Que des UPN]\nme : upn-valide\nyou : upn-valide\nyou : init-mdp\nus : upn-valide\nupn : 3/3\na-initialiser : 1\n\n[Cas 3 — Que du domaine]\na : forme-domaine\nb : forme-domaine\nc : forme-domaine\nc : init-mdp\nupn : 0/3\na-initialiser : 1"
  },
  {
    "id": "aw-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Groupes : droits, type et étendue",
    "goal": "Décider quels groupes peuvent recevoir des droits et compter les jointures au domaine.",
    "brief": "<p>Analysez les paramètres Windows Server fournis pour chaque cas. Puis il lit <strong>n lignes</strong> « poste dns » pour les jointures au domaine : un poste rejoint le domaine si son serveur DNS est celui du domaine (<code>ad-dns</code>). indiquez pour chaque groupe <code>groupe : droits</code> ou <code>groupe : diffusion</code>, pour chaque poste <code>poste : joint</code> ou <code>poste : dns a corriger</code>, puis <code>groupes-droits : X</code> et <code>jointures : Y/n</code>.</p>",
    "starter": "# Grille d'analyse (aw-c6-e3) — Groupes : droits, type et étendue\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Annuaire du stage]\n# Données : 3\n# Données : grp-info securite globale\n# Données : grp-bureau securite locale\n# Données : annonce distribution universelle\n# Données : 3\n# Données : stage1 ad-dns\n# Données : stage2 ad-dns\n# Données : invite1 1.1.1.1\nA_COMPLETER\n\n[Cas 2 — Que de la diffusion]\n# Données : 2\n# Données : news distribution globale\n# Données : events distribution locale\n# Données : 1\n# Données : pc9 ad-dns\nA_COMPLETER\n\n[Cas 3 — DNS à corriger partout]\n# Données : 1\n# Données : grp-admins securite globale\n# Données : 2\n# Données : pc-a 8.8.8.8\n# Données : pc-b 1.0.0.1\nA_COMPLETER\n",
    "hints": [
      "type = securite → « droits » et compteur ; distribution → « diffusion ».",
      "dns = ad-dns → « joint » et compteur ; sinon « dns a corriger » ; bilans après les deux boucles."
    ],
    "examples": [
      {
        "stdin": "2\ngrp-ventes securite globale\nliste-clients distribution globale\n2\npc1 ad-dns\npc2 8.8.8.8\n",
        "expected": "grp-ventes : droits\nliste-clients : diffusion\npc1 : joint\npc2 : dns a corriger\ngroupes-droits : 1\njointures : 1/2",
        "note": "Cas d’illustration Windows Server"
      }
    ],
    "tests": [
      {
        "label": "Annuaire du stage",
        "stdin": "cas:1",
        "expected": "grp-info : droits\ngrp-bureau : droits\nannonce : diffusion\nstage1 : joint\nstage2 : joint\ninvite1 : dns a corriger\ngroupes-droits : 2\njointures : 2/3"
      },
      {
        "label": "Que de la diffusion",
        "stdin": "cas:2",
        "expected": "news : diffusion\nevents : diffusion\npc9 : joint\ngroupes-droits : 0\njointures : 1/1"
      },
      {
        "label": "DNS à corriger partout",
        "stdin": "cas:3",
        "expected": "grp-admins : droits\npc-a : dns a corriger\npc-b : dns a corriger\ngroupes-droits : 1\njointures : 0/2"
      }
    ],
    "solution": "[Exemple]\ngrp-ventes : droits\nliste-clients : diffusion\npc1 : joint\npc2 : dns a corriger\ngroupes-droits : 1\njointures : 1/2\n\n[Cas 1 — Annuaire du stage]\ngrp-info : droits\ngrp-bureau : droits\nannonce : diffusion\nstage1 : joint\nstage2 : joint\ninvite1 : dns a corriger\ngroupes-droits : 2\njointures : 2/3\n\n[Cas 2 — Que de la diffusion]\nnews : diffusion\nevents : diffusion\npc9 : joint\ngroupes-droits : 0\njointures : 1/1\n\n[Cas 3 — DNS à corriger partout]\ngrp-admins : droits\npc-a : dns a corriger\npc-b : dns a corriger\ngroupes-droits : 1\njointures : 0/2"
  }
];
