/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "vt-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le rapport d’inactivité du serveur",
    "goal": "Classer les heures du serveur : inactif ou utile, selon le seuil des 80 % de l’histoire.",
    "brief": "<p>Dans l’histoire, « le serveur passait 80 % de son temps à ne rien faire ». Analysez chaque ligne proposée « heure inactif » (heures de la journée, inactif en minutes sur l’heure). Une heure est <code>perdue</code> si au moins 48 minutes (80 %) sont inactives, sinon <code>utile</code>. Pour chaque ligne il Indiquez <code>heure : verdict</code>, puis <code>heures perdues : X/n</code> et <code>inactivite : Y min</code> (somme des minutes d’inactivité).</p>",
    "starter": "# Grille d'analyse (vt-c1-e1) — Le rapport d’inactivité du serveur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Journée du paresseux]\n# Données : 4\n# Données : 08h 55\n# Données : 09h 40\n# Données : 10h 48\n# Données : 11h 12\nA_COMPLETER\n\n[Cas 2 — Serveur très fainéant]\n# Données : 3\n# Données : 22h 60\n# Données : 23h 59\n# Données : 00h 48\nA_COMPLETER\n\n[Cas 3 — Frontière exacte]\n# Données : 3\n# Données : a 47\n# Données : b 48\n# Données : c 49\nA_COMPLETER\n",
    "hints": [
      "80 % d’une heure = 48 minutes : inactif -ge 48 → perdue, sinon utile.",
      "La somme des minutes progresse dans les deux cas ; les bilans sortent après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\n00h 50\n01h 30\n02h 48\n",
        "expected": "00h : perdue\n01h : utile\n02h : perdue\nheures perdues : 2/3\ninactivite : 128 min"
      }
    ],
    "tests": [
      {
        "label": "Journée du paresseux",
        "stdin": "cas:1",
        "expected": "08h : perdue\n09h : utile\n10h : perdue\n11h : utile\nheures perdues : 2/4\ninactivite : 155 min"
      },
      {
        "label": "Serveur très fainéant",
        "stdin": "cas:2",
        "expected": "22h : perdue\n23h : perdue\n00h : perdue\nheures perdues : 3/3\ninactivite : 167 min"
      },
      {
        "label": "Frontière exacte",
        "stdin": "cas:3",
        "expected": "a : utile\nb : perdue\nc : perdue\nheures perdues : 2/3\ninactivite : 144 min"
      }
    ],
    "solution": "[Exemple]\n00h : perdue\n01h : utile\n02h : perdue\nheures perdues : 2/3\ninactivite : 128 min\n\n[Cas 1 — Journée du paresseux]\n08h : perdue\n09h : utile\n10h : perdue\n11h : utile\nheures perdues : 2/4\ninactivite : 155 min\n\n[Cas 2 — Serveur très fainéant]\n22h : perdue\n23h : perdue\n00h : perdue\nheures perdues : 3/3\ninactivite : 167 min\n\n[Cas 3 — Frontière exacte]\na : utile\nb : perdue\nc : perdue\nheures perdues : 2/3\ninactivite : 144 min"
  },
  {
    "id": "vt-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Un service par serveur : le constat",
    "goal": "Compter les serveurs mono-service et calculer le coût du gaspillage.",
    "brief": "<p>Dans l’histoire, le serveur fainéant « n’héberge qu’un seul système et un seul service ». Analysez chaque ligne proposée « serveur services cout » (services hébergés, coût mensuel en francs). Un serveur est <code>faineant</code> s’il héberge moins de 2 services. Pour chaque ligne il Indiquez <code>serveur : verdict</code> (faineant ou sature si plus de 4 services, sinon <code>equilibre</code>), puis <code>faineants : X</code> et <code>gaspillage : Y FCFA</code> (80 % du coût de chaque fainéant, arrondi à l’entier inférieur).</p>",
    "starter": "# Grille d'analyse (vt-c1-e2) — Un service par serveur : le constat\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Salle serveur]\n# Données : 4\n# Données : srv1 1 80000\n# Données : srv2 5 300000\n# Données : srv3 3 150000\n# Données : srv4 1 100000\nA_COMPLETER\n\n[Cas 2 — Que du farniente]\n# Données : 3\n# Données : a 1 50000\n# Données : b 1 50000\n# Données : c 1 50000\nA_COMPLETER\n\n[Cas 3 — Frontières]\n# Données : 4\n# Données : a 0 100000\n# Données : b 1 100000\n# Données : c 4 100000\n# Données : d 5 100000\nA_COMPLETER\n",
    "hints": [
      "Qualifiez l’état du serveur : sous-utilisé (< 2 services), saturé (> 4 services) ou équilibré.",
      "Pour un serveur sous-utilisé, évaluez le coût de gaspillage des ressources allouées non consommées."
    ],
    "examples": [
      {
        "stdin": "3\nweb1 1 100000\nbd1 3 200000\ntest1 1 50000\n",
        "expected": "web1 : faineant\nbd1 : equilibre\ntest1 : faineant\nfaineants : 2\ngaspillage : 120000 FCFA"
      }
    ],
    "tests": [
      {
        "label": "Salle serveur",
        "stdin": "cas:1",
        "expected": "srv1 : faineant\nsrv2 : sature\nsrv3 : equilibre\nsrv4 : faineant\nfaineants : 2\ngaspillage : 144000 FCFA"
      },
      {
        "label": "Que du farniente",
        "stdin": "cas:2",
        "expected": "a : faineant\nb : faineant\nc : faineant\nfaineants : 3\ngaspillage : 120000 FCFA"
      },
      {
        "label": "Frontières",
        "stdin": "cas:3",
        "expected": "a : faineant\nb : faineant\nc : equilibre\nd : sature\nfaineants : 2\ngaspillage : 160000 FCFA"
      }
    ],
    "solution": "[Exemple]\nweb1 : faineant\nbd1 : equilibre\ntest1 : faineant\nfaineants : 2\ngaspillage : 120000 FCFA\n\n[Cas 1 — Salle serveur]\nsrv1 : faineant\nsrv2 : sature\nsrv3 : equilibre\nsrv4 : faineant\nfaineants : 2\ngaspillage : 144000 FCFA\n\n[Cas 2 — Que du farniente]\na : faineant\nb : faineant\nc : faineant\nfaineants : 3\ngaspillage : 120000 FCFA\n\n[Cas 3 — Frontières]\na : faineant\nb : faineant\nc : equilibre\nd : sature\nfaineants : 2\ngaspillage : 160000 FCFA"
  },
  {
    "id": "vt-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le serveur se plaint : facture d’électricité",
    "goal": "Relier l’inactivité à la facture : « il mangeait de l’électricité pour rien ».",
    "brief": "<p>L’histoire dit du serveur qu’il « mangeait de l’électricité pour rien ». Analysez chaque ligne proposée « serveur watt heures » : consommation en watts, heures de marche du mois. L’énergie consommée vaut watt × heures / 1000 (kWh) ; à 100 francs le kWh, Indiquez pour chaque serveur <code>serveur : X kWh — Y FCFA</code> (nombres entiers), puis <code>facture : Z FCFA</code> (somme) et <code>gaspille : W FCFA</code> (part des serveurs à plus de 700 kWh, 80 % de leur facture).</p>",
    "starter": "# Grille d'analyse (vt-c1-e3) — Le serveur se plaint : facture d’électricité\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois serveurs]\n# Données : 3\n# Données : a 1000 500\n# Données : b 500 800\n# Données : c 750 1000\nA_COMPLETER\n\n[Cas 2 — Aucun gros consommateur]\n# Données : 2\n# Données : a 300 720\n# Données : b 200 720\nA_COMPLETER\n\n[Cas 3 — Seuil exact]\n# Données : 2\n# Données : a 700 1000\n# Données : b 701 1000\nA_COMPLETER\n",
    "hints": [
      "kWh = watt * heures / 1000 (division entière) ; coût = kWh * 100.",
      "Serveur à plus de 700 kWh : sa part gaspillée vaut cout * 80 / 100, à ajouter au total."
    ],
    "examples": [
      {
        "stdin": "2\nparesseux 500 720\nactif 400 600\n",
        "expected": "paresseux : 360 kWh — 36000 FCFA\nactif : 240 kWh — 24000 FCFA\nfacture : 60000 FCFA\ngaspille : 0 FCFA"
      }
    ],
    "tests": [
      {
        "label": "Trois serveurs",
        "stdin": "cas:1",
        "expected": "a : 500 kWh — 50000 FCFA\nb : 400 kWh — 40000 FCFA\nc : 750 kWh — 75000 FCFA\nfacture : 165000 FCFA\ngaspille : 60000 FCFA"
      },
      {
        "label": "Aucun gros consommateur",
        "stdin": "cas:2",
        "expected": "a : 216 kWh — 21600 FCFA\nb : 144 kWh — 14400 FCFA\nfacture : 36000 FCFA\ngaspille : 0 FCFA"
      },
      {
        "label": "Seuil exact",
        "stdin": "cas:3",
        "expected": "a : 700 kWh — 70000 FCFA\nb : 701 kWh — 70100 FCFA\nfacture : 140100 FCFA\ngaspille : 56080 FCFA"
      }
    ],
    "solution": "[Exemple]\nparesseux : 360 kWh — 36000 FCFA\nactif : 240 kWh — 24000 FCFA\nfacture : 60000 FCFA\ngaspille : 0 FCFA\n\n[Cas 1 — Trois serveurs]\na : 500 kWh — 50000 FCFA\nb : 400 kWh — 40000 FCFA\nc : 750 kWh — 75000 FCFA\nfacture : 165000 FCFA\ngaspille : 60000 FCFA\n\n[Cas 2 — Aucun gros consommateur]\na : 216 kWh — 21600 FCFA\nb : 144 kWh — 14400 FCFA\nfacture : 36000 FCFA\ngaspille : 0 FCFA\n\n[Cas 3 — Seuil exact]\na : 700 kWh — 70000 FCFA\nb : 701 kWh — 70100 FCFA\nfacture : 140100 FCFA\ngaspille : 56080 FCFA"
  },
  {
    "id": "vt-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Ce que partagent les machines virtuelles",
    "goal": "Associer chaque ressource de l’histoire à sa mise en commun.",
    "brief": "<p>Les VM de l’histoire promettent : « on va se partager votre mémoire, votre processeur et même votre disque dur ». Analysez chaque ligne proposée « ressource partage » : partage est un code parmi <code>vive</code> (mémoire), <code>calcul</code> (processeur), <code>stockage</code> (disque) ou <code>pas-partage</code> (ressource qui reste propre à chaque machine, comme la carte réseau dédiée d’une VM configurée ainsi). Pour chaque ligne il Indiquez <code>ressource : OK</code> ou <code>ressource : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (vt-c2-e1) — Ce que partagent les machines virtuelles\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les trois ressources]\n# Données : 4\n# Données : memoire vive\n# Données : processeur calcul\n# Données : disque stockage\n# Données : reseau-dediee pas-partage\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : memoire calcul\n# Données : disque vive\n# Données : processeur stockage\n# Données : reseau-dediee pas-partage\nA_COMPLETER\n\n[Cas 3 — Fiche de révision]\n# Données : 4\n# Données : disque stockage\n# Données : processeur calcul\n# Données : reseau-dediee pas-partage\n# Données : memoire vive\nA_COMPLETER\n",
    "hints": [
      "Un case sur la ressource : memoire → vive, processeur → calcul, disque → stockage, reseau-dediee → pas-partage.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nmemoire vive\nprocesseur calcul\ndisque stockage\n",
        "expected": "memoire : OK\nprocesseur : OK\ndisque : OK\ncorrectes : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les trois ressources",
        "stdin": "cas:1",
        "expected": "memoire : OK\nprocesseur : OK\ndisque : OK\nreseau-dediee : OK\ncorrectes : 4/4"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "memoire : ERREUR\ndisque : ERREUR\nprocesseur : ERREUR\nreseau-dediee : OK\ncorrectes : 1/4"
      },
      {
        "label": "Fiche de révision",
        "stdin": "cas:3",
        "expected": "disque : OK\nprocesseur : OK\nreseau-dediee : OK\nmemoire : OK\ncorrectes : 4/4"
      }
    ],
    "solution": "[Exemple]\nmemoire : OK\nprocesseur : OK\ndisque : OK\ncorrectes : 3/3\n\n[Cas 1 — Les trois ressources]\nmemoire : OK\nprocesseur : OK\ndisque : OK\nreseau-dediee : OK\ncorrectes : 4/4\n\n[Cas 2 — Trois confusions]\nmemoire : ERREUR\ndisque : ERREUR\nprocesseur : ERREUR\nreseau-dediee : OK\ncorrectes : 1/4\n\n[Cas 3 — Fiche de révision]\ndisque : OK\nprocesseur : OK\nreseau-dediee : OK\nmemoire : OK\ncorrectes : 4/4"
  },
  {
    "id": "vt-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "« On ne prendra que ce dont on a besoin »",
    "goal": "Allouer les ressources demandées sans dépasser la capacité du serveur.",
    "brief": "<p>La promesse des VM : « on ne prendra chacun que ce dont on a besoin ». Analysez les données fournies pour chaque cas. Puis <strong>n lignes</strong> « vm ram disque » : les demandes. Pour chaque VM il Indiquez <code>vm : allouee</code> si la demande tient dans le <strong>reste</strong> disponible, sinon <code>vm : refusee</code> — et la ressource refusée n’est pas consommée. Enfin <code>allouees : X/n</code> et <code>reste : R ram D disque</code>.</p>",
    "starter": "# Grille d'analyse (vt-c2-e2) — « On ne prendra que ce dont on a besoin »\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Parc réaliste]\n# Données : 4\n# Données : 128 1000\n# Données : web 16 50\n# Données : bd 64 300\n# Données : feu 8 20\n# Données : test 64 700\nA_COMPLETER\n\n[Cas 2 — Serveur petit]\n# Données : 3\n# Données : 16 100\n# Données : a 16 50\n# Données : b 1 60\n# Données : c 1 1\nA_COMPLETER\n\n[Cas 3 — Demandes exactes]\n# Données : 2\n# Données : 32 100\n# Données : a 32 100\n# Données : b 0 0\nA_COMPLETER\n",
    "hints": [
      "Lire n AVANT la capacité : l’ordre du format est n, puis « ram disque », puis les VM.",
      "Deux conditions en ET : r <= reste_ram et d <= reste_disque ; sinon refusee sans toucher aux restes."
    ],
    "examples": [
      {
        "stdin": "3\n64 500\nweb 16 50\nbd 32 200\ntest 32 400\n",
        "expected": "web : allouee\nbd : allouee\ntest : refusee\nallouees : 2/3\nreste : 16 ram 250 disque"
      }
    ],
    "tests": [
      {
        "label": "Parc réaliste",
        "stdin": "cas:1",
        "expected": "web : allouee\nbd : allouee\nfeu : allouee\ntest : refusee\nallouees : 3/4\nreste : 40 ram 630 disque"
      },
      {
        "label": "Serveur petit",
        "stdin": "cas:2",
        "expected": "a : allouee\nb : refusee\nc : refusee\nallouees : 1/3\nreste : 0 ram 50 disque"
      },
      {
        "label": "Demandes exactes",
        "stdin": "cas:3",
        "expected": "a : allouee\nb : allouee\nallouees : 2/2\nreste : 0 ram 0 disque"
      }
    ],
    "solution": "[Exemple]\nweb : allouee\nbd : allouee\ntest : refusee\nallouees : 2/3\nreste : 16 ram 250 disque\n\n[Cas 1 — Parc réaliste]\nweb : allouee\nbd : allouee\nfeu : allouee\ntest : refusee\nallouees : 3/4\nreste : 40 ram 630 disque\n\n[Cas 2 — Serveur petit]\na : allouee\nb : refusee\nc : refusee\nallouees : 1/3\nreste : 0 ram 50 disque\n\n[Cas 3 — Demandes exactes]\na : allouee\nb : allouee\nallouees : 2/2\nreste : 0 ram 0 disque"
  },
  {
    "id": "vt-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Le réveil du serveur : la conversation",
    "goal": "Rejouer la conversation de l’histoire entre l’ingénieur, le serveur et les VM.",
    "brief": "<p>Analysez chaque ligne proposée « acteur replique » : acteur est un code parmi <code>ingenieur</code>, <code>serveur</code> ou <code>vms</code> ; replique est un code parmi <code>idee</code> (proposer la virtualisation), <code>colere</code> (refuser, « c’est de la folie ! »), <code>partage</code> (proposer le partage des ressources) ou <code>accepte</code>. Le scénario de l’histoire fixe l’ordre : ingenieur → idee, serveur → colere, vms → partage, serveur → accepte. Pour chaque ligne il Indiquez <code>acteur : OK</code> si la réplique est celle de l’histoire à cette étape, sinon <code>acteur : NON</code>, puis <code>fidele : X/n</code>.</p>",
    "starter": "# Grille d'analyse (vt-c2-e3) — Le réveil du serveur : la conversation\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Colère inversée]\n# Données : ingenieur idee\n# Données : serveur accepte\n# Données : vms partage\n# Données : serveur colere\nA_COMPLETER\n\n[Cas 2 — Repliques échangées]\n# Données : ingenieur idee\n# Données : serveur colere\n# Données : vms idee\n# Données : serveur accepte\nA_COMPLETER\n\n[Cas 3 — Scénario mélangé]\n# Données : vms partage\n# Données : ingenieur idee\n# Données : serveur colere\n# Données : serveur accepte\nA_COMPLETER\n",
    "hints": [
      "Un case sur l’étape : 1 → ingenieur/idee, 2 → serveur/colere, 3 → vms/partage, 4 → serveur/accepte.",
      "Acteur ET réplique doivent être justes en même temps pour un OK."
    ],
    "examples": [
      {
        "stdin": "ingenieur idee\nserveur colere\nvms partage\nserveur accepte\n",
        "expected": "ingenieur : OK\nserveur : OK\nvms : OK\nserveur : OK\nfidele : 4/4"
      }
    ],
    "tests": [
      {
        "label": "Colère inversée",
        "stdin": "cas:1",
        "expected": "ingenieur : OK\nserveur : NON\nvms : OK\nserveur : NON\nfidele : 2/4"
      },
      {
        "label": "Repliques échangées",
        "stdin": "cas:2",
        "expected": "ingenieur : OK\nserveur : OK\nvms : NON\nserveur : OK\nfidele : 3/4"
      },
      {
        "label": "Scénario mélangé",
        "stdin": "cas:3",
        "expected": "vms : NON\ningenieur : NON\nserveur : NON\nserveur : OK\nfidele : 1/4"
      }
    ],
    "solution": "[Exemple]\ningenieur : OK\nserveur : OK\nvms : OK\nserveur : OK\nfidele : 4/4\n\n[Cas 1 — Colère inversée]\ningenieur : OK\nserveur : NON\nvms : OK\nserveur : NON\nfidele : 2/4\n\n[Cas 2 — Repliques échangées]\ningenieur : OK\nserveur : OK\nvms : NON\nserveur : OK\nfidele : 3/4\n\n[Cas 3 — Scénario mélangé]\nvms : NON\ningenieur : NON\nserveur : NON\nserveur : OK\nfidele : 1/4"
  },
  {
    "id": "vt-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Les services de l’histoire",
    "goal": "Valider les quatre services virtualisés : base, site, pare-feu, test.",
    "brief": "<p>L’histoire se termine : le serveur « hébergeait maintenant une base de données, un site web, un pare-feu virtuel et même un serveur de test ». Analysez chaque ligne proposée « service categorie » : categorie est un code parmi <code>donnees</code> (base de données), <code>publication</code> (site web), <code>protection</code> (pare-feu) ou <code>recette</code> (serveur de test). Pour chaque ligne il Indiquez <code>service : OK</code> ou <code>service : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (vt-c3-e1) — Les services de l’histoire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Le parc complet]\n# Données : 4\n# Données : base donnees\n# Données : site publication\n# Données : pare-feu protection\n# Données : test recette\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : base publication\n# Données : site protection\n# Données : pare-feu recette\n# Données : test recette\nA_COMPLETER\n\n[Cas 3 — Ordre mélangé]\n# Données : 4\n# Données : test recette\n# Données : pare-feu protection\n# Données : site publication\n# Données : base donnees\nA_COMPLETER\n",
    "hints": [
      "Un case sur le service : base → donnees, site → publication, pare-feu → protection, test → recette.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nbase donnees\nsite publication\npare-feu protection\n",
        "expected": "base : OK\nsite : OK\npare-feu : OK\ncorrectes : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Le parc complet",
        "stdin": "cas:1",
        "expected": "base : OK\nsite : OK\npare-feu : OK\ntest : OK\ncorrectes : 4/4"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "base : ERREUR\nsite : ERREUR\npare-feu : ERREUR\ntest : OK\ncorrectes : 1/4"
      },
      {
        "label": "Ordre mélangé",
        "stdin": "cas:3",
        "expected": "test : OK\npare-feu : OK\nsite : OK\nbase : OK\ncorrectes : 4/4"
      }
    ],
    "solution": "[Exemple]\nbase : OK\nsite : OK\npare-feu : OK\ncorrectes : 3/3\n\n[Cas 1 — Le parc complet]\nbase : OK\nsite : OK\npare-feu : OK\ntest : OK\ncorrectes : 4/4\n\n[Cas 2 — Trois confusions]\nbase : ERREUR\nsite : ERREUR\npare-feu : ERREUR\ntest : OK\ncorrectes : 1/4\n\n[Cas 3 — Ordre mélangé]\ntest : OK\npare-feu : OK\nsite : OK\nbase : OK\ncorrectes : 4/4"
  },
  {
    "id": "vt-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Une machine par service : l’inventaire",
    "goal": "Dresser l’inventaire des VM par type de service et compter les catégories.",
    "brief": "<p>Analysez chaque ligne proposée « vm service » puis Indiquez chaque ligne <code>vm : service</code>. Ensuite, pour chaque service <strong>dans l’ordre de première apparition</strong>, il Indiquez <code>service : X vm</code>, et enfin <code>services : Y</code> — l’inventaire de ce que le serveur héberge maintenant, comme à la fin de l’histoire.</p>",
    "starter": "# Grille d'analyse (vt-c3-e2) — Une machine par service : l’inventaire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Le parc de la fin]\n# Données : 4\n# Données : vm1 base\n# Données : vm2 site\n# Données : vm3 pare-feu\n# Données : vm4 test\nA_COMPLETER\n\n[Cas 2 — Fermes de VM]\n# Données : 5\n# Données : web1 site\n# Données : web2 site\n# Données : bd1 base\n# Données : bd2 base\n# Données : bd3 base\nA_COMPLETER\n\n[Cas 3 — Ordre d’apparition]\n# Données : 4\n# Données : a test\n# Données : b site\n# Données : c test\n# Données : d pare-feu\nA_COMPLETER\n",
    "hints": [
      "Nouveau service : [ -z \"${compte[$service]+x}\" ] → ordre[$g]=$service et g=$((g+1)).",
      "Les bilans sortent après la boucle, dans l’ordre du tableau ordre, puis g."
    ],
    "examples": [
      {
        "stdin": "3\nvm-bd base\nvm-web site\nvm-bd2 base\n",
        "expected": "vm-bd : base\nvm-web : site\nvm-bd2 : base\nbase : 2 vm\nsite : 1 vm\nservices : 2"
      }
    ],
    "tests": [
      {
        "label": "Le parc de la fin",
        "stdin": "cas:1",
        "expected": "vm1 : base\nvm2 : site\nvm3 : pare-feu\nvm4 : test\nbase : 1 vm\nsite : 1 vm\npare-feu : 1 vm\ntest : 1 vm\nservices : 4"
      },
      {
        "label": "Fermes de VM",
        "stdin": "cas:2",
        "expected": "web1 : site\nweb2 : site\nbd1 : base\nbd2 : base\nbd3 : base\nsite : 2 vm\nbase : 3 vm\nservices : 2"
      },
      {
        "label": "Ordre d’apparition",
        "stdin": "cas:3",
        "expected": "a : test\nb : site\nc : test\nd : pare-feu\ntest : 2 vm\nsite : 1 vm\npare-feu : 1 vm\nservices : 3"
      }
    ],
    "solution": "[Exemple]\nvm-bd : base\nvm-web : site\nvm-bd2 : base\nbase : 2 vm\nsite : 1 vm\nservices : 2\n\n[Cas 1 — Le parc de la fin]\nvm1 : base\nvm2 : site\nvm3 : pare-feu\nvm4 : test\nbase : 1 vm\nsite : 1 vm\npare-feu : 1 vm\ntest : 1 vm\nservices : 4\n\n[Cas 2 — Fermes de VM]\nweb1 : site\nweb2 : site\nbd1 : base\nbd2 : base\nbd3 : base\nsite : 2 vm\nbase : 3 vm\nservices : 2\n\n[Cas 3 — Ordre d’apparition]\na : test\nb : site\nc : test\nd : pare-feu\ntest : 2 vm\nsite : 1 vm\npare-feu : 1 vm\nservices : 3"
  },
  {
    "id": "vt-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La charge de chaque service",
    "goal": "Calculer la charge par service et repérer celui qui consomme le plus.",
    "brief": "<p>Analysez chaque ligne proposée « vm service charge » (charge en % CPU), puis Indiquez pour chaque service <strong>dans l’ordre de première apparition</strong> <code>service : X% de charge</code> (somme des charges), puis <code>service le plus charge : NOM (Y%)</code> — le premier atteignant le maximum gagne, comme au support « on ne prendra chacun que ce dont on a besoin » : au-delà de 70 % cumulés, le service est <code>service : X% de charge (a surveiller)</code>.</p>",
    "starter": "# Grille d'analyse (vt-c3-e3) — La charge de chaque service\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Pare-feu chargé]\n# Données : 4\n# Données : vm1 site 50\n# Données : vm2 pare-feu 45\n# Données : vm3 site 20\n# Données : vm4 base 10\nA_COMPLETER\n\n[Cas 2 — Égalité de charge]\n# Données : 3\n# Données : vm1 base 35\n# Données : vm2 site 35\n# Données : vm3 test 10\nA_COMPLETER\n\n[Cas 3 — Un seul service]\n# Données : 2\n# Données : vm1 base 50\n# Données : vm2 base 30\nA_COMPLETER\n",
    "hints": [
      "Somme par service dans un tableau ; nouveau service → enregistrer l’ordre (g).",
      "Maximum au sens strict : charge > max → max=charge, max_nom=service (le premier atteignant le max gagne)."
    ],
    "examples": [
      {
        "stdin": "4\nvm1 base 40\nvm2 site 30\nvm3 base 20\nvm4 test 5\n",
        "expected": "base : 60% de charge\nsite : 30% de charge\ntest : 5% de charge\nservice le plus charge : base (60%)"
      }
    ],
    "tests": [
      {
        "label": "Pare-feu chargé",
        "stdin": "cas:1",
        "expected": "site : 70% de charge\npare-feu : 45% de charge\nbase : 10% de charge\nservice le plus charge : site (70%)"
      },
      {
        "label": "Égalité de charge",
        "stdin": "cas:2",
        "expected": "base : 35% de charge\nsite : 35% de charge\ntest : 10% de charge\nservice le plus charge : base (35%)"
      },
      {
        "label": "Un seul service",
        "stdin": "cas:3",
        "expected": "base : 80% de charge (a surveiller)\nservice le plus charge : base (80%)"
      }
    ],
    "solution": "[Exemple]\nbase : 60% de charge\nsite : 30% de charge\ntest : 5% de charge\nservice le plus charge : base (60%)\n\n[Cas 1 — Pare-feu chargé]\nsite : 70% de charge\npare-feu : 45% de charge\nbase : 10% de charge\nservice le plus charge : site (70%)\n\n[Cas 2 — Égalité de charge]\nbase : 35% de charge\nsite : 35% de charge\ntest : 10% de charge\nservice le plus charge : base (35%)\n\n[Cas 3 — Un seul service]\nbase : 80% de charge (a surveiller)\nservice le plus charge : base (80%)"
  },
  {
    "id": "vt-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "De 80 % à 100 % : le taux de rentabilisation",
    "goal": "Calculer le taux de rentabilisation de chaque serveur avant/après virtualisation.",
    "brief": "<p>Le serveur de l’histoire « se retrouva rentabilisé à 100 % ». Analysez chaque ligne proposée « serveur avant apres » (taux d’utilisation en %). Un serveur est <code>reveille</code> si le taux passe sous 30 % avant à 80 % ou plus après ; <code>en progres</code> si le taux augmente sans atteindre 80 % ; sinon <code>insuffisant</code>. Pour chaque ligne il Indiquez <code>serveur : verdict</code>, puis <code>reveilles : X/n</code>.</p>",
    "starter": "# Grille d'analyse (vt-c4-e1) — De 80 % à 100 % : le taux de rentabilisation\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Parc virtualisé]\n# Données : 4\n# Données : a 10 95\n# Données : b 15 80\n# Données : c 35 90\n# Données : d 20 30\nA_COMPLETER\n\n[Cas 2 — Déjà occupé]\n# Données : 3\n# Données : a 50 85\n# Données : b 60 90\n# Données : c 45 50\nA_COMPLETER\n\n[Cas 3 — Frontières exactes]\n# Données : 3\n# Données : a 29 80\n# Données : b 30 80\n# Données : c 29 79\nA_COMPLETER\n",
    "hints": [
      "Trois cas : avant -lt 30 ET apres -ge 80 → reveille ; apres -gt avant → en progres ; sinon insuffisant.",
      "Le compteur ne progresse que pour les reveilles ; bilan après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nsrv1 20 90\nsrv2 40 60\nsrv3 25 50\n",
        "expected": "srv1 : reveille\nsrv2 : en progres\nsrv3 : en progres\nreveilles : 1/3"
      }
    ],
    "tests": [
      {
        "label": "Parc virtualisé",
        "stdin": "cas:1",
        "expected": "a : reveille\nb : reveille\nc : en progres\nd : en progres\nreveilles : 2/4"
      },
      {
        "label": "Déjà occupé",
        "stdin": "cas:2",
        "expected": "a : en progres\nb : en progres\nc : en progres\nreveilles : 0/3"
      },
      {
        "label": "Frontières exactes",
        "stdin": "cas:3",
        "expected": "a : reveille\nb : en progres\nc : en progres\nreveilles : 1/3"
      }
    ],
    "solution": "[Exemple]\nsrv1 : reveille\nsrv2 : en progres\nsrv3 : en progres\nreveilles : 1/3\n\n[Cas 1 — Parc virtualisé]\na : reveille\nb : reveille\nc : en progres\nd : en progres\nreveilles : 2/4\n\n[Cas 2 — Déjà occupé]\na : en progres\nb : en progres\nc : en progres\nreveilles : 0/3\n\n[Cas 3 — Frontières exactes]\na : reveille\nb : en progres\nc : en progres\nreveilles : 1/3"
  },
  {
    "id": "vt-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Combien de serveurs économisés ?",
    "goal": "Comparer le parc physique avant et le parc virtualisé après.",
    "brief": "<p>Analysez les données fournies pour chaque cas. La consolidation regroupe tous les services sur des VM : le nombre de VM nécessaires est le plafond de (total des coûts / cout_vm) — division entière plus 1 si le reste est non nul. Indiquez <code>parc actuel : n serveurs — X FCFA</code>, <code>parc virtualise : Y vm — Z FCFA</code> (Y × cout_vm) et <code>economie : W FCFA (T%)</code> où T est la part économisée (0 à 100).</p>",
    "starter": "# Grille d'analyse (vt-c4-e2) — Combien de serveurs économisés ?\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Consolidation rentable]\n# Données : 4\n# Données : a 200000\n# Données : b 150000\n# Données : c 180000\n# Données : d 120000\n# Données : 50000\nA_COMPLETER\n\n[Cas 2 — Petites VM]\n# Données : 3\n# Données : a 100000\n# Données : b 100000\n# Données : c 100000\n# Données : 60000\nA_COMPLETER\n\n[Cas 3 — Vraie économie]\n# Données : 2\n# Données : a 100000\n# Données : b 100000\n# Données : 80000\nA_COMPLETER\n",
    "hints": [
      "Plafond : vm = total / cout_vm ; si total % cout_vm != 0 alors vm = vm + 1.",
      "Pourcentage : economie * 100 / total (division entière)."
    ],
    "examples": [
      {
        "stdin": "3\nsrv1 100000\nsrv2 80000\nsrv3 60000\n40000\n",
        "expected": "parc actuel : 3 serveurs — 240000 FCFA\nparc virtualise : 6 vm — 240000 FCFA\neconomie : 0 FCFA (0%)"
      }
    ],
    "tests": [
      {
        "label": "Consolidation rentable",
        "stdin": "cas:1",
        "expected": "parc actuel : 4 serveurs — 650000 FCFA\nparc virtualise : 13 vm — 650000 FCFA\neconomie : 0 FCFA (0%)"
      },
      {
        "label": "Petites VM",
        "stdin": "cas:2",
        "expected": "parc actuel : 3 serveurs — 300000 FCFA\nparc virtualise : 5 vm — 300000 FCFA\neconomie : 0 FCFA (0%)"
      },
      {
        "label": "Vraie économie",
        "stdin": "cas:3",
        "expected": "parc actuel : 2 serveurs — 200000 FCFA\nparc virtualise : 3 vm — 240000 FCFA\neconomie : -40000 FCFA (-20%)"
      }
    ],
    "solution": "[Exemple]\nparc actuel : 3 serveurs — 240000 FCFA\nparc virtualise : 6 vm — 240000 FCFA\neconomie : 0 FCFA (0%)\n\n[Cas 1 — Consolidation rentable]\nparc actuel : 4 serveurs — 650000 FCFA\nparc virtualise : 13 vm — 650000 FCFA\neconomie : 0 FCFA (0%)\n\n[Cas 2 — Petites VM]\nparc actuel : 3 serveurs — 300000 FCFA\nparc virtualise : 5 vm — 300000 FCFA\neconomie : 0 FCFA (0%)\n\n[Cas 3 — Vraie économie]\nparc actuel : 2 serveurs — 200000 FCFA\nparc virtualise : 3 vm — 240000 FCFA\neconomie : -40000 FCFA (-20%)"
  },
  {
    "id": "vt-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan de consolidation",
    "goal": "Décider quel serveur physique héberger chaque VM selon la capacité restante.",
    "brief": "<p>Analysez les données fournies pour chaque cas. On place chaque VM sur le <strong>premier hôte</strong> dont la capacité restante suffit (l’ordre du fichier fait foi). Pour chaque VM il Indiquez <code>vm : hote</code> ou <code>vm : sans-place</code>, décrémente la capacité de l’hôte choisi, et à la fin Indiquez une ligne <code>hote : reste</code> par hôte puis <code>orinelles : X/n</code> — pardon, <code>non-placees : X/n</code>.</p>",
    "starter": "# Grille d'analyse (vt-c4-e3) — Le plan de consolidation\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trois VM, deux hôtes]\n# Données : 2\n# Données : srv1 100\n# Données : srv2 100\n# Données : 3\n# Données : vm-a 60\n# Données : vm-b 60\n# Données : vm-c 60\nA_COMPLETER\n\n[Cas 2 — Remplissage optimal]\n# Données : 2\n# Données : srv1 100\n# Données : srv2 50\n# Données : 4\n# Données : vm-a 50\n# Données : vm-b 50\n# Données : vm-c 50\n# Données : vm-d 50\nA_COMPLETER\n\n[Cas 3 — Un seul hôte généreux]\n# Données : 1\n# Données : fainéant 200\n# Données : 3\n# Données : vm-bd 80\n# Données : vm-web 40\n# Données : vm-feu 80\nA_COMPLETER\n",
    "hints": [
      "Premier hôte suffisant : parcourir ordre, prendre le premier avec capacite[hote] -ge besoin.",
      "Une VM non placée ne décrémente rien ; les bilans sortent dans l’ordre des hôtes."
    ],
    "examples": [
      {
        "stdin": "2\nsrv1 100\nsrv2 100\n2\nvm-a 60\nvm-b 60\n",
        "expected": "vm-a : srv1\nvm-b : srv2\nsrv1 : 40\nsrv2 : 40\nnon-placees : 0/2"
      }
    ],
    "tests": [
      {
        "label": "Trois VM, deux hôtes",
        "stdin": "cas:1",
        "expected": "vm-a : srv1\nvm-b : srv2\nvm-c : sans-place\nsrv1 : 40\nsrv2 : 40\nnon-placees : 1/3"
      },
      {
        "label": "Remplissage optimal",
        "stdin": "cas:2",
        "expected": "vm-a : srv1\nvm-b : srv1\nvm-c : srv2\nvm-d : sans-place\nsrv1 : 0\nsrv2 : 0\nnon-placees : 1/4"
      },
      {
        "label": "Un seul hôte généreux",
        "stdin": "cas:3",
        "expected": "vm-bd : fainéant\nvm-web : fainéant\nvm-feu : fainéant\nfainéant : 0\nnon-placees : 0/3"
      }
    ],
    "solution": "[Exemple]\nvm-a : srv1\nvm-b : srv2\nsrv1 : 40\nsrv2 : 40\nnon-placees : 0/2\n\n[Cas 1 — Trois VM, deux hôtes]\nvm-a : srv1\nvm-b : srv2\nvm-c : sans-place\nsrv1 : 40\nsrv2 : 40\nnon-placees : 1/3\n\n[Cas 2 — Remplissage optimal]\nvm-a : srv1\nvm-b : srv1\nvm-c : srv2\nvm-d : sans-place\nsrv1 : 0\nsrv2 : 0\nnon-placees : 1/4\n\n[Cas 3 — Un seul hôte généreux]\nvm-bd : fainéant\nvm-web : fainéant\nvm-feu : fainéant\nfainéant : 0\nnon-placees : 0/3"
  },
  {
    "id": "vt-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les questions techniques de l’histoire",
    "goal": "Associer chaque concept de la question technique à sa définition.",
    "brief": "<p>L’histoire pose trois questions techniques : le concept illustré, les avantages, et les risques. Analysez chaque ligne proposée « concept role » : role est un code parmi <code>partage</code> (plusieurs VM sur un même serveur physique), <code>avantage</code> (rentabilisation, moins de machines) ou <code>risque</code> (surcharge, saturation des ressources). Pour chaque ligne il Indiquez <code>concept : OK</code> ou <code>concept : ERREUR</code>, puis <code>correctes : X/n</code>.</p>",
    "starter": "# Grille d'analyse (vt-c5-e1) — Les questions techniques de l’histoire\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les trois concepts]\n# Données : 3\n# Données : mutualisation partage\n# Données : rentabilisation avantage\n# Données : surcharge risque\nA_COMPLETER\n\n[Cas 2 — Trois confusions]\n# Données : 4\n# Données : mutualisation risque\n# Données : surcharge avantage\n# Données : rentabilisation partage\n# Données : mutualisation partage\nA_COMPLETER\n\n[Cas 3 — Interro écrite]\n# Données : 3\n# Données : surcharge risque\n# Données : mutualisation partage\n# Données : rentabilisation avantage\nA_COMPLETER\n",
    "hints": [
      "Un case sur le concept : mutualisation → partage, rentabilisation → avantage, surcharge → risque.",
      "Le bilan sort une seule fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "3\nrentabilisation avantage\nmutualisation partage\nsurcharge risque\n",
        "expected": "rentabilisation : OK\nmutualisation : OK\nsurcharge : OK\ncorrectes : 3/3"
      }
    ],
    "tests": [
      {
        "label": "Les trois concepts",
        "stdin": "cas:1",
        "expected": "mutualisation : OK\nrentabilisation : OK\nsurcharge : OK\ncorrectes : 3/3"
      },
      {
        "label": "Trois confusions",
        "stdin": "cas:2",
        "expected": "mutualisation : ERREUR\nsurcharge : ERREUR\nrentabilisation : ERREUR\nmutualisation : OK\ncorrectes : 1/4"
      },
      {
        "label": "Interro écrite",
        "stdin": "cas:3",
        "expected": "surcharge : OK\nmutualisation : OK\nrentabilisation : OK\ncorrectes : 3/3"
      }
    ],
    "solution": "[Exemple]\nrentabilisation : OK\nmutualisation : OK\nsurcharge : OK\ncorrectes : 3/3\n\n[Cas 1 — Les trois concepts]\nmutualisation : OK\nrentabilisation : OK\nsurcharge : OK\ncorrectes : 3/3\n\n[Cas 2 — Trois confusions]\nmutualisation : ERREUR\nsurcharge : ERREUR\nrentabilisation : ERREUR\nmutualisation : OK\ncorrectes : 1/4\n\n[Cas 3 — Interro écrite]\nsurcharge : OK\nmutualisation : OK\nrentabilisation : OK\ncorrectes : 3/3"
  },
  {
    "id": "vt-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le seuil de saturation du serveur",
    "goal": "Surveiller la charge totale et refuser les VM quand le serveur menace de saturer.",
    "brief": "<p>La dernière question de l’histoire : « que se passerait-il si trop de machines virtuelles étaient créées sur un seul serveur ? ». Analysez les données fournies pour chaque cas. La charge totale s’accumule : si elle reste <= capacité, la VM est <code>vm : hebergee</code> ; si elle la dépasse, <code>vm : refusee (saturation)</code> et la charge n’est pas ajoutée. À la fin : <code>charge : X/capacite</code> et <code>hebergees : Y/n</code> — et si X atteint exactement la capacité, une dernière ligne <code>serveur plein</code>.</p>",
    "starter": "# Grille d'analyse (vt-c5-e2) — Le seuil de saturation du serveur\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Trop de machines ambitieuses]\n# Données : 100\n# Données : 4\n# Données : a 30\n# Données : b 30\n# Données : c 30\n# Données : d 30\nA_COMPLETER\n\n[Cas 2 — Capacité réduite]\n# Données : 50\n# Données : 3\n# Données : a 25\n# Données : b 25\n# Données : c 25\nA_COMPLETER\n\n[Cas 3 — Rien à signaler]\n# Données : -\n# Données : 2\n# Données : a 10\n# Données : b 20\nA_COMPLETER\n",
    "hints": [
      "Tester avant d’ajouter : si total + charge <= capacite → hebergee et total augmente, sinon refusee.",
      "Après la boucle : total -eq capacite → afficher « serveur plein »."
    ],
    "examples": [
      {
        "stdin": "-\n3\nvm1 40\nvm2 40\nvm3 30\n",
        "expected": "vm1 : hebergee\nvm2 : hebergee\nvm3 : refusee (saturation)\ncharge : 80/100\nhebergees : 2/3"
      }
    ],
    "tests": [
      {
        "label": "Trop de machines ambitieuses",
        "stdin": "cas:1",
        "expected": "a : hebergee\nb : hebergee\nc : hebergee\nd : refusee (saturation)\ncharge : 90/100\nhebergees : 3/4"
      },
      {
        "label": "Capacité réduite",
        "stdin": "cas:2",
        "expected": "a : hebergee\nb : hebergee\nc : refusee (saturation)\ncharge : 50/50\nhebergees : 2/3\nserveur plein"
      },
      {
        "label": "Rien à signaler",
        "stdin": "cas:3",
        "expected": "a : hebergee\nb : hebergee\ncharge : 30/100\nhebergees : 2/2"
      }
    ],
    "solution": "[Exemple]\nvm1 : hebergee\nvm2 : hebergee\nvm3 : refusee (saturation)\ncharge : 80/100\nhebergees : 2/3\n\n[Cas 1 — Trop de machines ambitieuses]\na : hebergee\nb : hebergee\nc : hebergee\nd : refusee (saturation)\ncharge : 90/100\nhebergees : 3/4\n\n[Cas 2 — Capacité réduite]\na : hebergee\nb : hebergee\nc : refusee (saturation)\ncharge : 50/50\nhebergees : 2/3\nserveur plein\n\n[Cas 3 — Rien à signaler]\na : hebergee\nb : hebergee\ncharge : 30/100\nhebergees : 2/2"
  },
  {
    "id": "vt-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Les symptômes de la surcharge",
    "goal": "Détecter les symptômes de surcharge et conseiller l’action du support.",
    "brief": "<p>Analysez chaque ligne proposée « serveur cpu ram reponses » : cpu et ram en %, reponses = temps de réponse en ms des services hébergés. Symptômes : cpu > 90 OU ram > 90 OU reponses > 500 → le serveur est <code>serveur : surcharge (symptome)</code> avec symptome = <code>cpu</code>, <code>ram</code>, <code>reponses</code> ou <code>multiple</code> (dans cet ordre de détection) ; l’action conseillée est alors <code>serveur : action = deplacer une VM</code>. Sinon <code>serveur : sain</code>. Enfin <code>surcharges : X/n</code> et <code>deplacements : X</code>.</p>",
    "starter": "# Grille d'analyse (vt-c5-e3) — Les symptômes de la surcharge\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Serveur sain]\n# Données : 2\n# Données : a 50 60 100\n# Données : b 80 85 300\nA_COMPLETER\n\n[Cas 2 — Symptôme multiple]\n# Données : 2\n# Données : a 95 95 100\n# Données : b 99 99 999\nA_COMPLETER\n\n[Cas 3 — Mixte]\n# Données : 4\n# Données : a 95 60 100\n# Données : b 60 95 200\n# Données : c 60 60 600\n# Données : d 60 60 100\nA_COMPLETER\n",
    "hints": [
      "Compter les symptômes : c=0 ; cpu -gt 90 → c+1 et nom cpu ; ram -gt 90 → idem ; reponses -gt 500 → idem.",
      "c = 0 → sain ; c = 1 → le nom du symptôme ; c >= 2 → multiple ; dans tous les cas de surcharge, action = deplacer une VM."
    ],
    "examples": [
      {
        "stdin": "3\na 95 50 100\nb 60 95 200\nc 50 50 600\n",
        "expected": "a : surcharge (cpu)\na : action = deplacer une VM\nb : surcharge (ram)\nb : action = deplacer une VM\nc : surcharge (reponses)\nc : action = deplacer une VM\nsurcharges : 3/3\ndeplacements : 3"
      }
    ],
    "tests": [
      {
        "label": "Serveur sain",
        "stdin": "cas:1",
        "expected": "a : sain\nb : sain\nsurcharges : 0/2\ndeplacements : 0"
      },
      {
        "label": "Symptôme multiple",
        "stdin": "cas:2",
        "expected": "a : surcharge (multiple)\na : action = deplacer une VM\nb : surcharge (multiple)\nb : action = deplacer une VM\nsurcharges : 2/2\ndeplacements : 2"
      },
      {
        "label": "Mixte",
        "stdin": "cas:3",
        "expected": "a : surcharge (cpu)\na : action = deplacer une VM\nb : surcharge (ram)\nb : action = deplacer une VM\nc : surcharge (reponses)\nc : action = deplacer une VM\nd : sain\nsurcharges : 3/4\ndeplacements : 3"
      }
    ],
    "solution": "[Exemple]\na : surcharge (cpu)\na : action = deplacer une VM\nb : surcharge (ram)\nb : action = deplacer une VM\nc : surcharge (reponses)\nc : action = deplacer une VM\nsurcharges : 3/3\ndeplacements : 3\n\n[Cas 1 — Serveur sain]\na : sain\nb : sain\nsurcharges : 0/2\ndeplacements : 0\n\n[Cas 2 — Symptôme multiple]\na : surcharge (multiple)\na : action = deplacer une VM\nb : surcharge (multiple)\nb : action = deplacer une VM\nsurcharges : 2/2\ndeplacements : 2\n\n[Cas 3 — Mixte]\na : surcharge (cpu)\na : action = deplacer une VM\nb : surcharge (ram)\nb : action = deplacer une VM\nc : surcharge (reponses)\nc : action = deplacer une VM\nd : sain\nsurcharges : 3/4\ndeplacements : 3"
  },
  {
    "id": "vt-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "L’argumentaire en trois arguments",
    "goal": "Valider l’ordre de l’argumentaire : constat, solution, bénéfice.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Pour chaque ligne il Indiquez <code>etape N : OK</code> quand l’étape ET son argument sont justes, sinon <code>etape N : NON</code>, puis <code>etapes correctes : X/4</code>.</p>",
    "starter": "# Grille d'analyse (vt-c6-e1) — L’argumentaire en trois arguments\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux dernières inversées]\n# Données : constat gaspillage\n# Données : idee virtualisation\n# Données : verdict plein\n# Données : preuve rentabilisation\nA_COMPLETER\n\n[Cas 2 — Arguments échangés]\n# Données : constat virtualisation\n# Données : idee gaspillage\n# Données : preuve rentabilisation\n# Données : verdict plein\nA_COMPLETER\n\n[Cas 3 — Pitch mélangé]\n# Données : idee virtualisation\n# Données : constat gaspillage\n# Données : preuve rentabilisation\n# Données : verdict plein\nA_COMPLETER\n",
    "hints": [
      "Un case sur le numéro : 1 → constat/gaspillage, 2 → idee/virtualisation, 3 → preuve/rentabilisation, 4 → verdict/plein.",
      "Étape ET argument doivent être justes en même temps."
    ],
    "examples": [
      {
        "stdin": "constat gaspillage\nidee virtualisation\npreuve rentabilisation\nverdict plein\n",
        "expected": "etape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netapes correctes : 4/4"
      }
    ],
    "tests": [
      {
        "label": "Deux dernières inversées",
        "stdin": "cas:1",
        "expected": "etape 1 : OK\netape 2 : OK\netape 3 : NON\netape 4 : NON\netapes correctes : 2/4"
      },
      {
        "label": "Arguments échangés",
        "stdin": "cas:2",
        "expected": "etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4"
      },
      {
        "label": "Pitch mélangé",
        "stdin": "cas:3",
        "expected": "etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4"
      }
    ],
    "solution": "[Exemple]\netape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netapes correctes : 4/4\n\n[Cas 1 — Deux dernières inversées]\netape 1 : OK\netape 2 : OK\netape 3 : NON\netape 4 : NON\netapes correctes : 2/4\n\n[Cas 2 — Arguments échangés]\netape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4\n\n[Cas 3 — Pitch mélangé]\netape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4"
  },
  {
    "id": "vt-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Le bilan avant/après du parc",
    "goal": "Produire le tableau de bord de l’argumentaire : gaspillage avant, rente après.",
    "brief": "<p>Analysez chaque ligne proposée « serveur avant apres » (taux d’utilisation %). Il Indiquez pour chaque serveur <code>serveur : avant=A% apres=B%</code>, puis trois bilans : <code>reveilles : X</code> (passés de moins de 30 % à 80 % ou plus), <code>moyenne avant : Y%</code> et <code>moyenne apres : Z%</code> (moyennes arrondies à l’entier inférieur).</p>",
    "starter": "# Grille d'analyse (vt-c6-e2) — Le bilan avant/après du parc\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Parc du support]\n# Données : 4\n# Données : a 10 95\n# Données : b 20 80\n# Données : c 40 45\n# Données : d 50 55\nA_COMPLETER\n\n[Cas 2 — Tout réveillé]\n# Données : 3\n# Données : a 5 90\n# Données : b 10 85\n# Données : c 0 100\nA_COMPLETER\n\n[Cas 3 — Rien ne bouge]\n# Données : 2\n# Données : a 60 60\n# Données : b 70 65\nA_COMPLETER\n",
    "hints": [
      "Identifiez les machines virtuelles réveillées dont la charge passe d’un niveau faible (< 30%) à un niveau actif (>= 80%).",
      "Comparez la moyenne de consommation avant et après réallocation dynamique des vCPU."
    ],
    "examples": [
      {
        "stdin": "3\nsrv1 20 90\nsrv2 30 50\nsrv3 10 85\n",
        "expected": "srv1 : avant=20% apres=90%\nsrv2 : avant=30% apres=50%\nsrv3 : avant=10% apres=85%\nreveilles : 2\nmoyenne avant : 20%\nmoyenne apres : 75%"
      }
    ],
    "tests": [
      {
        "label": "Parc du support",
        "stdin": "cas:1",
        "expected": "a : avant=10% apres=95%\nb : avant=20% apres=80%\nc : avant=40% apres=45%\nd : avant=50% apres=55%\nreveilles : 2\nmoyenne avant : 30%\nmoyenne apres : 68%"
      },
      {
        "label": "Tout réveillé",
        "stdin": "cas:2",
        "expected": "a : avant=5% apres=90%\nb : avant=10% apres=85%\nc : avant=0% apres=100%\nreveilles : 3\nmoyenne avant : 5%\nmoyenne apres : 91%"
      },
      {
        "label": "Rien ne bouge",
        "stdin": "cas:3",
        "expected": "a : avant=60% apres=60%\nb : avant=70% apres=65%\nreveilles : 0\nmoyenne avant : 65%\nmoyenne apres : 62%"
      }
    ],
    "solution": "[Exemple]\nsrv1 : avant=20% apres=90%\nsrv2 : avant=30% apres=50%\nsrv3 : avant=10% apres=85%\nreveilles : 2\nmoyenne avant : 20%\nmoyenne apres : 75%\n\n[Cas 1 — Parc du support]\na : avant=10% apres=95%\nb : avant=20% apres=80%\nc : avant=40% apres=45%\nd : avant=50% apres=55%\nreveilles : 2\nmoyenne avant : 30%\nmoyenne apres : 68%\n\n[Cas 2 — Tout réveillé]\na : avant=5% apres=90%\nb : avant=10% apres=85%\nc : avant=0% apres=100%\nreveilles : 3\nmoyenne avant : 5%\nmoyenne apres : 91%\n\n[Cas 3 — Rien ne bouge]\na : avant=60% apres=60%\nb : avant=70% apres=65%\nreveilles : 0\nmoyenne avant : 65%\nmoyenne apres : 62%"
  },
  {
    "id": "vt-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan de « réveil » des vieux serveurs",
    "goal": "Élaborer le plan final : quoi virtualiser, quoi garder, verdict du projet.",
    "brief": "<p>Dernière question de l’histoire : « comment réveiller les vieux serveurs pour être efficace mais pas surchargé ? ». Analysez les données fournies pour chaque cas. Puis <strong>m lignes</strong> « vm charge » de la charge des VM prévues. Pour chaque serveur : <code>serveur : a virtualiser</code> si les trois lettres sont présentes, sinon <code>serveur : a etudier (manque X)</code> (première lettre manquante dans l’ordre v, e, s). Pour les VM : <code>vm : charge=X</code>. Verdict final : <code>plan pret</code> si tous les serveurs sont virtualisables ET que la charge totale des VM est de 200 au plus, <code>plan a ajuster</code> si les serveurs sont prêts mais la charge dépasse 200, <code>plan impossible</code> sinon.</p>",
    "starter": "# Grille d'analyse (vt-c6-e3) — Le plan de « réveil » des vieux serveurs\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Plan idéal]\n# Données : 2\n# Données : srv1 ves\n# Données : srv2 vse\n# Données : 2\n# Données : vm1 120\n# Données : vm2 80\nA_COMPLETER\n\n[Cas 2 — Charge trop forte]\n# Données : 1\n# Données : srv1 ves\n# Données : 3\n# Données : vm1 100\n# Données : vm2 100\n# Données : vm3 100\nA_COMPLETER\n\n[Cas 3 — Rien de virtualisable]\n# Données : 2\n# Données : srv1 -\n# Données : srv2 e\n# Données : 1\n# Données : vm1 50\nA_COMPLETER\n",
    "hints": [
      "Parsing : boucle sur les caractères de config comme dans le projet b1-projet ; config = \"-\" → tout manquant.",
      "Verdict : tous_prets=1 ET total <= 200 → plan pret ; tous_prets=1 → plan a ajuster ; sinon plan impossible."
    ],
    "examples": [
      {
        "stdin": "2\nsrv1 ves\nsrv2 ve\n2\nvm1 100\nvm2 80\n",
        "expected": "srv1 : a virtualiser\nsrv2 : a etudier (manque s)\nvm1 : charge=100\nvm2 : charge=80\nverdict : plan impossible"
      }
    ],
    "tests": [
      {
        "label": "Plan idéal",
        "stdin": "cas:1",
        "expected": "srv1 : a virtualiser\nsrv2 : a virtualiser\nvm1 : charge=120\nvm2 : charge=80\nverdict : plan pret"
      },
      {
        "label": "Charge trop forte",
        "stdin": "cas:2",
        "expected": "srv1 : a virtualiser\nvm1 : charge=100\nvm2 : charge=100\nvm3 : charge=100\nverdict : plan a ajuster"
      },
      {
        "label": "Rien de virtualisable",
        "stdin": "cas:3",
        "expected": "srv1 : a etudier (manque v)\nsrv2 : a etudier (manque v)\nvm1 : charge=50\nverdict : plan impossible"
      }
    ],
    "solution": "[Exemple]\nsrv1 : a virtualiser\nsrv2 : a etudier (manque s)\nvm1 : charge=100\nvm2 : charge=80\nverdict : plan impossible\n\n[Cas 1 — Plan idéal]\nsrv1 : a virtualiser\nsrv2 : a virtualiser\nvm1 : charge=120\nvm2 : charge=80\nverdict : plan pret\n\n[Cas 2 — Charge trop forte]\nsrv1 : a virtualiser\nvm1 : charge=100\nvm2 : charge=100\nvm3 : charge=100\nverdict : plan a ajuster\n\n[Cas 3 — Rien de virtualisable]\nsrv1 : a etudier (manque v)\nsrv2 : a etudier (manque v)\nvm1 : charge=50\nverdict : plan impossible"
  }
];
