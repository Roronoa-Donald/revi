'use strict';

module.exports = [
  {
    "id": "mr-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Donnée ou information",
    "goal": "Trier des éléments entre données et informations, puis dresser le bilan du tri.",
    "brief": "<p>Analysez chaque ligne proposée « type libelle » : type vaut <code>d</code> (donnée) ou <code>i</code> (information). Pour chaque ligne il Indiquez <code>libelle : categorie</code>, où categorie vaut <code>matiere premiere</code> (donnée) ou <code>interpretee</code> (information). Enfin il Indiquez <code>bilan : X donnees / Y informations</code>, X et Y étant les compteurs.</p>",
    "starter": "# Grille d'analyse (mr-c1-e1) — Donnée ou information\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule ligne]\n# Données : 1\n# Données : i facture 12000\nA_COMPLETER\n\n[Cas 2 — Deux données]\n# Données : 2\n# Données : d prix\n# Données : d quantite\nA_COMPLETER\n\n[Cas 3 — Quatre éléments mixtes]\n# Données : 4\n# Données : d 12000\n# Données : i chiffre d affaires\n# Données : d nom client\n# Données : i relance paiement\nA_COMPLETER\n",
    "hints": [
      "Distinguez les catégories méthodologiques requises.",
      "Deux compteurs posés à 0 avant la boucle, incrémentés dedans, affichés après."
    ],
    "examples": [
      {
        "stdin": "3\nd bleu\ni bleu du ciel\nd 30545454\n",
        "expected": "bleu : matiere premiere\nbleu du ciel : interpretee\n30545454 : matiere premiere\nbilan : 2 donnees / 1 informations"
      }
    ],
    "tests": [
      {
        "label": "Une seule ligne",
        "stdin": "cas:1",
        "expected": "facture 12000 : interpretee\nbilan : 0 donnees / 1 informations"
      },
      {
        "label": "Deux données",
        "stdin": "cas:2",
        "expected": "prix : matiere premiere\nquantite : matiere premiere\nbilan : 2 donnees / 0 informations"
      },
      {
        "label": "Quatre éléments mixtes",
        "stdin": "cas:3",
        "expected": "12000 : matiere premiere\nchiffre d affaires : interpretee\nnom client : matiere premiere\nrelance paiement : interpretee\nbilan : 2 donnees / 2 informations"
      }
    ],
    "solution": "[Exemple]\nbleu : matiere premiere\nbleu du ciel : interpretee\n30545454 : matiere premiere\nbilan : 2 donnees / 1 informations\n\n[Cas 1 — Une seule ligne]\nfacture 12000 : interpretee\nbilan : 0 donnees / 1 informations\n\n[Cas 2 — Deux données]\nprix : matiere premiere\nquantite : matiere premiere\nbilan : 2 donnees / 0 informations\n\n[Cas 3 — Quatre éléments mixtes]\n12000 : matiere premiere\nchiffre d affaires : interpretee\nnom client : matiere premiere\nrelance paiement : interpretee\nbilan : 2 donnees / 2 informations"
  },
  {
    "id": "mr-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les trois sous-systèmes",
    "goal": "Router les flux de l'entreprise vers le bon sous-système : décision, opérant ou information.",
    "brief": "<p>Analysez chaque ligne proposée « flux sous_systeme » : sous_systeme vaut <code>d</code> (décision), <code>o</code> (opérant) ou <code>si</code> (information). Pour chaque ligne il Indiquez <code>flux : role</code>, où role vaut <code>piloter</code> (décision), <code>produire</code> (opérant) ou <code>memoriser</code> (information). Il termine par <code>flux si : X/n</code>, X étant le nombre de lignes dirigées vers le système d'information.</p>",
    "starter": "# Grille d'analyse (mr-c1-e2) — Les trois sous-systèmes\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul flux opérant]\n# Données : 1\n# Données : production o\nA_COMPLETER\n\n[Cas 2 — Deux flux SI]\n# Données : 2\n# Données : commandes si\n# Données : livraisons si\nA_COMPLETER\n\n[Cas 3 — Cinq flux mixtes]\n# Données : 5\n# Données : budget d\n# Données : fabrication o\n# Données : factures si\n# Données : inventaire si\n# Données : recrutement d\nA_COMPLETER\n",
    "hints": [
      "Un case avec trois branches couvre d, o et si ; ajoutez une branche *) par sécurité.",
      "Le compteur du système d'information s'incrémente seulement dans la branche si."
    ],
    "examples": [
      {
        "stdin": "4\nobjectifs d\nassemblage o\nstockage si\ncontroles d\n",
        "expected": "objectifs : piloter\nassemblage : produire\nstockage : memoriser\ncontroles : piloter\nflux si : 1/4"
      }
    ],
    "tests": [
      {
        "label": "Un seul flux opérant",
        "stdin": "cas:1",
        "expected": "production : produire\nflux si : 0/1"
      },
      {
        "label": "Deux flux SI",
        "stdin": "cas:2",
        "expected": "commandes : memoriser\nlivraisons : memoriser\nflux si : 2/2"
      },
      {
        "label": "Cinq flux mixtes",
        "stdin": "cas:3",
        "expected": "budget : piloter\nfabrication : produire\nfactures : memoriser\ninventaire : memoriser\nrecrutement : piloter\nflux si : 2/5"
      }
    ],
    "solution": "[Exemple]\nobjectifs : piloter\nassemblage : produire\nstockage : memoriser\ncontroles : piloter\nflux si : 1/4\n\n[Cas 1 — Un seul flux opérant]\nproduction : produire\nflux si : 0/1\n\n[Cas 2 — Deux flux SI]\ncommandes : memoriser\nlivraisons : memoriser\nflux si : 2/2\n\n[Cas 3 — Cinq flux mixtes]\nbudget : piloter\nfabrication : produire\nfactures : memoriser\ninventaire : memoriser\nrecrutement : piloter\nflux si : 2/5"
  },
  {
    "id": "mr-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Domaine de la gestion",
    "goal": "Classer des informations par domaine (économique, juridique, technique, commercial) et dresser la répartition.",
    "brief": "<p>Analysez chaque ligne proposée « info domaine » : domaine vaut <code>eco</code>, <code>jur</code>, <code>tech</code> ou <code>com</code>. Pour chaque ligne il Indiquez <code>info : domaine_complet</code>, où domaine_complet vaut <code>economique</code>, <code>juridique</code>, <code>technique</code> ou <code>commercial</code>. Il termine par quatre lignes de comptage, toujours dans cet ordre : <code>economique : X</code>, <code>juridique : X</code>, <code>technique : X</code> et <code>commercial : X</code>.</p>",
    "starter": "# Grille d'analyse (mr-c1-e3) — Domaine de la gestion\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul domaine]\n# Données : 1\n# Données : materiel tech\nA_COMPLETER\n\n[Cas 2 — Deux techniques]\n# Données : 2\n# Données : processus tech\n# Données : serveur tech\nA_COMPLETER\n\n[Cas 3 — Quatre domaines]\n# Données : 4\n# Données : marche eco\n# Données : directive jur\n# Données : modes com\n# Données : clientele com\nA_COMPLETER\n",
    "hints": [
      "Un case à quatre branches remplit les deux rôles : afficher et incrémenter.",
      "Les quatre lignes finales sortent après la boucle, dans l'ordre demandé, même quand le compteur vaut 0."
    ],
    "examples": [
      {
        "stdin": "3\nconjoncture eco\nloi jur\nconcurrence com\n",
        "expected": "conjoncture : economique\nloi : juridique\nconcurrence : commercial\neconomique : 1\njuridique : 1\ntechnique : 0\ncommercial : 1"
      }
    ],
    "tests": [
      {
        "label": "Un seul domaine",
        "stdin": "cas:1",
        "expected": "materiel : technique\neconomique : 0\njuridique : 0\ntechnique : 1\ncommercial : 0"
      },
      {
        "label": "Deux techniques",
        "stdin": "cas:2",
        "expected": "processus : technique\nserveur : technique\neconomique : 0\njuridique : 0\ntechnique : 2\ncommercial : 0"
      },
      {
        "label": "Quatre domaines",
        "stdin": "cas:3",
        "expected": "marche : economique\ndirective : juridique\nmodes : commercial\nclientele : commercial\neconomique : 1\njuridique : 1\ntechnique : 0\ncommercial : 2"
      }
    ],
    "solution": "[Exemple]\nconjoncture : economique\nloi : juridique\nconcurrence : commercial\neconomique : 1\njuridique : 1\ntechnique : 0\ncommercial : 1\n\n[Cas 1 — Un seul domaine]\nmateriel : technique\neconomique : 0\njuridique : 0\ntechnique : 1\ncommercial : 0\n\n[Cas 2 — Deux techniques]\nprocessus : technique\nserveur : technique\neconomique : 0\njuridique : 0\ntechnique : 2\ncommercial : 0\n\n[Cas 3 — Quatre domaines]\nmarche : economique\ndirective : juridique\nmodes : commercial\nclientele : commercial\neconomique : 1\njuridique : 1\ntechnique : 0\ncommercial : 2"
  },
  {
    "id": "mr-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Les trois niveaux",
    "goal": "Associer des modèles MERISE à leur niveau : conceptuel, logique/organisationnel ou physique.",
    "brief": "<p>Analysez chaque ligne proposée « modele niveau » : niveau vaut <code>c</code> (conceptuel), <code>l</code> (logique/organisationnel) ou <code>p</code> (physique). Pour chaque ligne il Indiquez <code>modele : question</code>, où question vaut <code>quoi</code> (conceptuel), <code>comment organiser</code> (logique/organisationnel) ou <code>comment realiser</code> (physique). Il termine par <code>conceptuel : X/n</code>, X étant le nombre de modèles conceptuels.</p>",
    "starter": "# Grille d'analyse (mr-c2-e1) — Les trois niveaux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul modèle physique]\n# Données : 1\n# Données : programmes p\nA_COMPLETER\n\n[Cas 2 — Deux logiques]\n# Données : 2\n# Données : MOD l\n# Données : MLD l\nA_COMPLETER\n\n[Cas 3 — Cinq modèles mixtes]\n# Données : 5\n# Données : MCD c\n# Données : MOT l\n# Données : MOpT p\n# Données : MLD l\n# Données : MCT c\nA_COMPLETER\n",
    "hints": [
      "Un case à trois branches traduit la lettre en question.",
      "Comptez seulement la branche c ; le format final est « conceptuel : X/n »."
    ],
    "examples": [
      {
        "stdin": "4\nMCD c\nMLD l\nMPD p\nMCT c\n",
        "expected": "MCD : quoi\nMLD : comment organiser\nMPD : comment realiser\nMCT : quoi\nconceptuel : 2/4"
      }
    ],
    "tests": [
      {
        "label": "Un seul modèle physique",
        "stdin": "cas:1",
        "expected": "programmes : comment realiser\nconceptuel : 0/1"
      },
      {
        "label": "Deux logiques",
        "stdin": "cas:2",
        "expected": "MOD : comment organiser\nMLD : comment organiser\nconceptuel : 0/2"
      },
      {
        "label": "Cinq modèles mixtes",
        "stdin": "cas:3",
        "expected": "MCD : quoi\nMOT : comment organiser\nMOpT : comment realiser\nMLD : comment organiser\nMCT : quoi\nconceptuel : 2/5"
      }
    ],
    "solution": "[Exemple]\nMCD : quoi\nMLD : comment organiser\nMPD : comment realiser\nMCT : quoi\nconceptuel : 2/4\n\n[Cas 1 — Un seul modèle physique]\nprogrammes : comment realiser\nconceptuel : 0/1\n\n[Cas 2 — Deux logiques]\nMOD : comment organiser\nMLD : comment organiser\nconceptuel : 0/2\n\n[Cas 3 — Cinq modèles mixtes]\nMCD : quoi\nMOT : comment organiser\nMOpT : comment realiser\nMLD : comment organiser\nMCT : quoi\nconceptuel : 2/5"
  },
  {
    "id": "mr-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Ordre des étapes du projet",
    "goal": "Vérifier qu'une liste d'étapes suit l'ordre canonique du cycle MERISE et localiser la première inversion.",
    "brief": "<p>Analysez chaque ligne proposée « rang etape » : rang est un entier 1 à 5 et l'étape appartient à la séquence <code>etude existant</code> (1), <code>conception</code> (2), <code>organisation</code> (3), <code>realisation</code> (4), <code>maintenance</code> (5). Le script vérifie que les rangs arrivent en ordre strictement croissant. Pour chaque ligne il Indiquez <code>etape : ok</code> ou <code>etape : hors ordre</code> (première ligne qui rompt la croissance et toutes les suivantes). Il termine par <code>verdict : X/n valides</code>.</p>",
    "starter": "# Grille d'analyse (mr-c2-e2) — Ordre des étapes du projet\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule étape]\n# Données : 1\n# Données : 1 etude existant\nA_COMPLETER\n\n[Cas 2 — Inversion au milieu]\n# Données : 4\n# Données : 1 etude existant\n# Données : 3 organisation\n# Données : 2 conception\n# Données : 4 realisation\nA_COMPLETER\n\n[Cas 3 — Rang répété]\n# Données : 3\n# Données : 1 etude existant\n# Données : 1 redite\n# Données : 2 conception\nA_COMPLETER\n",
    "hints": [
      "Un drapeau « rompu » passé à 1 à la première inversion : les lignes suivantes sont toutes hors ordre, même si leur rang repart à la hausse.",
      "Comparez chaque rang au précédent avec -gt ; mettez à jour precedent seulement tant que la séquence est encore valide."
    ],
    "examples": [
      {
        "stdin": "5\n1 etude existant\n2 conception\n3 organisation\n4 realisation\n5 maintenance\n",
        "expected": "etude existant : ok\nconception : ok\norganisation : ok\nrealisation : ok\nmaintenance : ok\nverdict : 5/5 valides"
      }
    ],
    "tests": [
      {
        "label": "Une seule étape",
        "stdin": "cas:1",
        "expected": "etude existant : ok\nverdict : 1/1 valides"
      },
      {
        "label": "Inversion au milieu",
        "stdin": "cas:2",
        "expected": "etude existant : ok\norganisation : ok\nconception : hors ordre\nrealisation : hors ordre\nverdict : 2/4 valides"
      },
      {
        "label": "Rang répété",
        "stdin": "cas:3",
        "expected": "etude existant : ok\nredite : hors ordre\nconception : hors ordre\nverdict : 1/3 valides"
      }
    ],
    "solution": "[Exemple]\netude existant : ok\nconception : ok\norganisation : ok\nrealisation : ok\nmaintenance : ok\nverdict : 5/5 valides\n\n[Cas 1 — Une seule étape]\netude existant : ok\nverdict : 1/1 valides\n\n[Cas 2 — Inversion au milieu]\netude existant : ok\norganisation : ok\nconception : hors ordre\nrealisation : hors ordre\nverdict : 2/4 valides\n\n[Cas 3 — Rang répété]\netude existant : ok\nredite : hors ordre\nconception : hors ordre\nverdict : 1/3 valides"
  },
  {
    "id": "mr-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "TVA : donnée ou traitement",
    "goal": "Illustrer la séparation données/traitements : mémoriser un taux, recalculer, vérifier la pérennité.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Puis il lit <strong>n lignes</strong> « montant » (entiers). Pour chaque montant il Indiquez <code>montant HT → TTC X</code> où X = montant + montant × taux / 100 (division entière). Il termine par <code>nouveau taux ?</code> puis lit <code>taux2</code> et Indiquez à nouveau le TTC du <strong>premier</strong> montant avec taux2 : la donnée a changé, aucun programme à réécrire.</p>",
    "starter": "# Grille d'analyse (mr-c2-e3) — TVA : donnée ou traitement\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Zéro pour cent]\n# Données : 0\n# Données : 1\n# Données : 500\n# Données : 19\nA_COMPLETER\n\n[Cas 2 — Un seul montant]\n# Données : 7\n# Données : 1\n# Données : 300\n# Données : 0\nA_COMPLETER\n\n[Cas 3 — Trois montants, taux élevé]\n# Données : 25\n# Données : 3\n# Données : 200\n# Données : 80\n# Données : 1000\n# Données : 10\nA_COMPLETER\n",
    "hints": [
      "Retenez le premier montant dans une variable au premier tour de boucle (test sur la variable vide).",
      "Le calcul est ttc = montant + montant * taux / 100 en une seule expression $(( ))."
    ],
    "examples": [
      {
        "stdin": "18\n2\n1000\n2500\n20\n",
        "expected": "1000 HT → TTC 1180\n2500 HT → TTC 2950\nnouveau taux ?\n1000 HT → TTC 1200"
      }
    ],
    "tests": [
      {
        "label": "Zéro pour cent",
        "stdin": "cas:1",
        "expected": "500 HT → TTC 500\nnouveau taux ?\n500 HT → TTC 595"
      },
      {
        "label": "Un seul montant",
        "stdin": "cas:2",
        "expected": "300 HT → TTC 321\nnouveau taux ?\n300 HT → TTC 300"
      },
      {
        "label": "Trois montants, taux élevé",
        "stdin": "cas:3",
        "expected": "200 HT → TTC 250\n80 HT → TTC 100\n1000 HT → TTC 1250\nnouveau taux ?\n200 HT → TTC 220"
      }
    ],
    "solution": "[Exemple]\n1000 HT → TTC 1180\n2500 HT → TTC 2950\nnouveau taux ?\n1000 HT → TTC 1200\n\n[Cas 1 — Zéro pour cent]\n500 HT → TTC 500\nnouveau taux ?\n500 HT → TTC 595\n\n[Cas 2 — Un seul montant]\n300 HT → TTC 321\nnouveau taux ?\n300 HT → TTC 300\n\n[Cas 3 — Trois montants, taux élevé]\n200 HT → TTC 250\n80 HT → TTC 100\n1000 HT → TTC 1250\nnouveau taux ?\n200 HT → TTC 220"
  },
  {
    "id": "mr-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le dictionnaire de données",
    "goal": "Construire un dictionnaire de données : filtrer les propriétés élémentaires et repérer les calculées.",
    "brief": "<p>Analysez chaque ligne proposée « nom type » : type vaut <code>el</code> (élémentaire), <code>co</code> (composée) ou <code>ca</code> (calculée). Le dictionnaire ne retient que les propriétés <strong>élémentaires et composées</strong>. Pour chaque ligne retenue il Indiquez <code>nom : conservee</code>, pour les autres <code>nom : ecartee</code>. Il termine par <code>dictionnaire : X proprietes</code>, X étant le nombre de propriétés retenues.</p>",
    "starter": "# Grille d'analyse (mr-c3-e1) — Le dictionnaire de données\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule calculée]\n# Données : 1\n# Données : Age ca\nA_COMPLETER\n\n[Cas 2 — Deux élémentaires]\n# Données : 2\n# Données : NumPrdt el\n# Données : PrixPrdt el\nA_COMPLETER\n\n[Cas 3 — Cinq propriétés mixtes]\n# Données : 5\n# Données : NumCde el\n# Données : DateCde el\n# Données : NomClient co\n# Données : TotalCde ca\n# Données : QteCdée el\nA_COMPLETER\n",
    "hints": [
      "Seul le type « ca » écarte une propriété : les deux autres passent.",
      "Le compteur suit exactement les lignes affichées « conservee »."
    ],
    "examples": [
      {
        "stdin": "4\nNumClt el\nNomClt el\nAdresseClt co\nMontantTTC ca\n",
        "expected": "NumClt : conservee\nNomClt : conservee\nAdresseClt : conservee\nMontantTTC : ecartee\ndictionnaire : 3 proprietes"
      }
    ],
    "tests": [
      {
        "label": "Une seule calculée",
        "stdin": "cas:1",
        "expected": "Age : ecartee\ndictionnaire : 0 proprietes"
      },
      {
        "label": "Deux élémentaires",
        "stdin": "cas:2",
        "expected": "NumPrdt : conservee\nPrixPrdt : conservee\ndictionnaire : 2 proprietes"
      },
      {
        "label": "Cinq propriétés mixtes",
        "stdin": "cas:3",
        "expected": "NumCde : conservee\nDateCde : conservee\nNomClient : conservee\nTotalCde : ecartee\nQteCdée : conservee\ndictionnaire : 4 proprietes"
      }
    ],
    "solution": "[Exemple]\nNumClt : conservee\nNomClt : conservee\nAdresseClt : conservee\nMontantTTC : ecartee\ndictionnaire : 3 proprietes\n\n[Cas 1 — Une seule calculée]\nAge : ecartee\ndictionnaire : 0 proprietes\n\n[Cas 2 — Deux élémentaires]\nNumPrdt : conservee\nPrixPrdt : conservee\ndictionnaire : 2 proprietes\n\n[Cas 3 — Cinq propriétés mixtes]\nNumCde : conservee\nDateCde : conservee\nNomClient : conservee\nTotalCde : ecartee\nQteCdée : conservee\ndictionnaire : 4 proprietes"
  },
  {
    "id": "mr-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les règles de gestion",
    "goal": "Extraire les dépendances fonctionnelles des règles de gestion et éliminer les règles redondantes.",
    "brief": "<p>Analysez chaque ligne proposée « source cible » décrivant une règle de gestion « source détermine cible ». Pour chaque ligne il Indiquez <code>source → cible</code> si le couple n'a jamais été énoncé, sinon <code>source → cible : redondante</code> (règle répétée). Il termine par <code>df elementaires : X/n</code>, X étant le nombre de couples distincts.</p>",
    "starter": "# Grille d'analyse (mr-c3-e2) — Les règles de gestion\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule DF]\n# Données : 1\n# Données : NumPrdt PrixPrdt\nA_COMPLETER\n\n[Cas 2 — Source multi-cible sans redondance]\n# Données : 3\n# Données : NumClt NomClt\n# Données : NumClt AdrClt\n# Données : NumCde DateCde\nA_COMPLETER\n\n[Cas 3 — Deux redondances]\n# Données : 4\n# Données : NumFou NomFou\n# Données : NumFou NomFou\n# Données : NumPrdt PrixPrdt\n# Données : NumFou NomFou\nA_COMPLETER\n",
    "hints": [
      "La clé du tableau associatif est le couple complet : vues[source|cible].",
      "Un couple nouveau s'affiche et se compte ; un couple déjà vu s'affiche « : redondante » et ne se compte pas."
    ],
    "examples": [
      {
        "stdin": "4\nNumClt NomClt\nNumClt AdrClt\nNumCde DateCde\nNumClt NomClt\n",
        "expected": "NumClt → NomClt\nNumClt → AdrClt\nNumCde → DateCde\nNumClt → NomClt : redondante\ndf elementaires : 3/4"
      }
    ],
    "tests": [
      {
        "label": "Une seule DF",
        "stdin": "cas:1",
        "expected": "NumPrdt → PrixPrdt\ndf elementaires : 1/1"
      },
      {
        "label": "Source multi-cible sans redondance",
        "stdin": "cas:2",
        "expected": "NumClt → NomClt\nNumClt → AdrClt\nNumCde → DateCde\ndf elementaires : 3/3"
      },
      {
        "label": "Deux redondances",
        "stdin": "cas:3",
        "expected": "NumFou → NomFou\nNumFou → NomFou : redondante\nNumPrdt → PrixPrdt\nNumFou → NomFou : redondante\ndf elementaires : 2/4"
      }
    ],
    "solution": "[Exemple]\nNumClt → NomClt\nNumClt → AdrClt\nNumCde → DateCde\nNumClt → NomClt : redondante\ndf elementaires : 3/4\n\n[Cas 1 — Une seule DF]\nNumPrdt → PrixPrdt\ndf elementaires : 1/1\n\n[Cas 2 — Source multi-cible sans redondance]\nNumClt → NomClt\nNumClt → AdrClt\nNumCde → DateCde\ndf elementaires : 3/3\n\n[Cas 3 — Deux redondances]\nNumFou → NomFou\nNumFou → NomFou : redondante\nNumPrdt → PrixPrdt\nNumFou → NomFou : redondante\ndf elementaires : 2/4"
  },
  {
    "id": "mr-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La matrice des dépendances",
    "goal": "Construire la matrice des dépendances fonctionnelles et déduire l'identifiant de l'entité.",
    "brief": "<p>Analysez chaque ligne proposée « source cible » (DF élémentaires, sans doublon de couple). Il dénombre pour chaque source le nombre de cibles qu'elle détermine, puis désigne l'identifiant candidat : la source qui détermine le plus de propriétés (une seule gagnante garantie par les données). Affichage : une ligne <code>source : X cibles</code> par source distincte, triée par ordre d'apparition, puis <code>identifiant candidat : source</code> et <code>propriete : cible</code> pour chaque cible de l'identifiant, dans l'ordre d'apparition.</p>",
    "starter": "# Grille d'analyse (mr-c3-e3) — La matrice des dépendances\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule source]\n# Données : 2\n# Données : NumPrdt PrixPrdt\n# Données : NumPrdt NomPrdt\nA_COMPLETER\n\n[Cas 2 — Deux sources équilibrées en apparence]\n# Données : 3\n# Données : NumCde DateCde\n# Données : NumCde NumClt\n# Données : NumClt NomClt\nA_COMPLETER\n\n[Cas 3 — Trois sources]\n# Données : 5\n# Données : NumFou NomFou\n# Données : NumFou AdrFou\n# Données : NumPrdt PrixPrdt\n# Données : NumPrdt NomPrdt\n# Données : NumCde DateCde\nA_COMPLETER\n",
    "hints": [
      "Deux structures : un compteur par source et, par source, la liste des cibles (concaténées avec un séparateur).",
      "Un second passage sur les sources distinctes (tableau des clés) trouve le maximum ; l'ordre d'apparition se conserve avec un tableau indexé des sources à leur première apparition."
    ],
    "examples": [
      {
        "stdin": "4\nNumClt NomClt\nNumClt AdrClt\nNumClt TelClt\nNumCde NumClt\n",
        "expected": "NumClt : 3 cibles\nNumCde : 1 cibles\nidentifiant candidat : NumClt\npropriete : NomClt\npropriete : AdrClt\npropriete : TelClt"
      }
    ],
    "tests": [
      {
        "label": "Une seule source",
        "stdin": "cas:1",
        "expected": "NumPrdt : 2 cibles\nidentifiant candidat : NumPrdt\npropriete : PrixPrdt\npropriete : NomPrdt"
      },
      {
        "label": "Deux sources équilibrées en apparence",
        "stdin": "cas:2",
        "expected": "NumCde : 2 cibles\nNumClt : 1 cibles\nidentifiant candidat : NumCde\npropriete : DateCde\npropriete : NumClt"
      },
      {
        "label": "Trois sources",
        "stdin": "cas:3",
        "expected": "NumFou : 2 cibles\nNumPrdt : 2 cibles\nNumCde : 1 cibles\nidentifiant candidat : NumFou\npropriete : NomFou\npropriete : AdrFou"
      }
    ],
    "solution": "[Exemple]\nNumClt : 3 cibles\nNumCde : 1 cibles\nidentifiant candidat : NumClt\npropriete : NomClt\npropriete : AdrClt\npropriete : TelClt\n\n[Cas 1 — Une seule source]\nNumPrdt : 2 cibles\nidentifiant candidat : NumPrdt\npropriete : PrixPrdt\npropriete : NomPrdt\n\n[Cas 2 — Deux sources équilibrées en apparence]\nNumCde : 2 cibles\nNumClt : 1 cibles\nidentifiant candidat : NumCde\npropriete : DateCde\npropriete : NumClt\n\n[Cas 3 — Trois sources]\nNumFou : 2 cibles\nNumPrdt : 2 cibles\nNumCde : 1 cibles\nidentifiant candidat : NumFou\npropriete : NomFou\npropriete : AdrFou"
  },
  {
    "id": "mr-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Lecture des cardinalités",
    "goal": "Vérifier des couples de cardinalités (min,max) et classer les associations.",
    "brief": "<p>Analysez chaque ligne proposée « min max association » : min et max valent 0 ou 1, ou max vaut n. Un couple valide exige min ≤ max (0 ≤ 0, 0 ≤ 1, 0 ≤ n, 1 ≤ 1, 1 ≤ n). Pour chaque ligne il Indiquez <code>association : valide</code> ou <code>association : invalide</code>. Il termine par <code>un-à-plusieurs : X</code>, X étant le nombre de couples valides de la forme (0,n) ou (1,n) avec l'autre extrémité de l'association comptée ici.</p>",
    "starter": "# Grille d'analyse (mr-c4-e1) — Lecture des cardinalités\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul couple invalide]\n# Données : 1\n# Données : 1 0 Tordu\nA_COMPLETER\n\n[Cas 2 — Tous valides sans n]\n# Données : 3\n# Données : 0 0 Vivre\n# Données : 1 1 Habiter\n# Données : 0 1 Louer\nA_COMPLETER\n\n[Cas 3 — Cinq couples mixtes]\n# Données : 5\n# Données : 0 n Commander\n# Données : 0 n Fournir\n# Données : 1 1 Diriger\n# Données : 1 0 Inverse\n# Données : n n Bizarre\nA_COMPLETER\n",
    "hints": [
      "Il n'y a que cinq couples valides : testez-les explicitement plutôt que de comparer des lettres.",
      "« un-à-plusieurs » : chaque ligne valide dont le max vaut n."
    ],
    "examples": [
      {
        "stdin": "4\n0 n Commander\n1 1 Fournir\n1 n Appartenir\n1 0 Erreur\n",
        "expected": "Commander : valide\nFournir : valide\nAppartenir : valide\nErreur : invalide\nun-à-plusieurs : 2"
      }
    ],
    "tests": [
      {
        "label": "Un seul couple invalide",
        "stdin": "cas:1",
        "expected": "Tordu : invalide\nun-à-plusieurs : 0"
      },
      {
        "label": "Tous valides sans n",
        "stdin": "cas:2",
        "expected": "Vivre : valide\nHabiter : valide\nLouer : valide\nun-à-plusieurs : 0"
      },
      {
        "label": "Cinq couples mixtes",
        "stdin": "cas:3",
        "expected": "Commander : valide\nFournir : valide\nDiriger : valide\nInverse : invalide\nBizarre : invalide\nun-à-plusieurs : 2"
      }
    ],
    "solution": "[Exemple]\nCommander : valide\nFournir : valide\nAppartenir : valide\nErreur : invalide\nun-à-plusieurs : 2\n\n[Cas 1 — Un seul couple invalide]\nTordu : invalide\nun-à-plusieurs : 0\n\n[Cas 2 — Tous valides sans n]\nVivre : valide\nHabiter : valide\nLouer : valide\nun-à-plusieurs : 0\n\n[Cas 3 — Cinq couples mixtes]\nCommander : valide\nFournir : valide\nDiriger : valide\nInverse : invalide\nBizarre : invalide\nun-à-plusieurs : 2"
  },
  {
    "id": "mr-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Association porteuse ou non",
    "goal": "Distinguer associations hiérarchiques (sans donnée portée) et non hiérarchiques (porteuses).",
    "brief": "<p>Analysez chaque ligne proposée « association k » : k est le nombre de données portées par l'association (entier ≥ 0). Une association est <code>hierarchique</code> si k vaut 0, sinon <code>portuese</code>. Pour chaque ligne il Indiquez <code>association : type</code>. Il termine par <code>tables en MLD : X</code>, X étant le nombre d'entités (non lu ici, réglé à 2) plus le nombre d'associations porteuses : chaque association porteuse deviendra une table au niveau logique.</p>",
    "starter": "# Grille d'analyse (mr-c4-e2) — Association porteuse ou non\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule hiérarchique]\n# Données : 1\n# Données : Diriger 0\nA_COMPLETER\n\n[Cas 2 — Deux porteuses]\n# Données : 2\n# Données : Louer 3\n# Données : Payer 1\nA_COMPLETER\n\n[Cas 3 — Cinq associations mixtes]\n# Données : 5\n# Données : Commander 2\n# Données : Vivre 0\n# Données : Habiter 0\n# Données : Louer 3\n# Données : Signer 1\nA_COMPLETER\n",
    "hints": [
      "Le test est un simple [ \"$k\" -eq 0 ] : classez, incrémentez.",
      "La table de départ vaut entites = 2 ; chaque association porteuse ajoute une table."
    ],
    "examples": [
      {
        "stdin": "3\nCommander 2\nFournir 1\nAppartenir 0\n",
        "expected": "Commander : portuese\nFournir : portuese\nAppartenir : hierarchique\ntables en MLD : 4"
      }
    ],
    "tests": [
      {
        "label": "Une seule hiérarchique",
        "stdin": "cas:1",
        "expected": "Diriger : hierarchique\ntables en MLD : 2"
      },
      {
        "label": "Deux porteuses",
        "stdin": "cas:2",
        "expected": "Louer : portuese\nPayer : portuese\ntables en MLD : 4"
      },
      {
        "label": "Cinq associations mixtes",
        "stdin": "cas:3",
        "expected": "Commander : portuese\nVivre : hierarchique\nHabiter : hierarchique\nLouer : portuese\nSigner : portuese\ntables en MLD : 5"
      }
    ],
    "solution": "[Exemple]\nCommander : portuese\nFournir : portuese\nAppartenir : hierarchique\ntables en MLD : 4\n\n[Cas 1 — Une seule hiérarchique]\nDiriger : hierarchique\ntables en MLD : 2\n\n[Cas 2 — Deux porteuses]\nLouer : portuese\nPayer : portuese\ntables en MLD : 4\n\n[Cas 3 — Cinq associations mixtes]\nCommander : portuese\nVivre : hierarchique\nHabiter : hierarchique\nLouer : portuese\nSigner : portuese\ntables en MLD : 5"
  },
  {
    "id": "mr-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "La facture TogoMall",
    "goal": "Traduire l'application facture du support : vérifier les règles de gestion entre clients et factures.",
    "brief": "<p>Analysez chaque ligne proposée « client facture » (noms sans espace). Règles du sujet : un client existe dès sa première facture (il apparaît côté client au moins une fois) ; une facture concerne un et un seul client (une même facture ne peut pas être liée à deux clients différents). Pour chaque ligne il Indiquez <code>client facture : ok</code> si la règle est respectée, sinon <code>facture : conflit client1/client2</code> (premier client lié à cette facture / client de la ligne courante). Il termine par <code>clients : X</code> et <code>factures : Y</code>, X et Y étant les nombres d'occurrences distinctes.</p>",
    "starter": "# Grille d'analyse (mr-c4-e3) — La facture TogoMall\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule facture]\n# Données : 1\n# Données : Ama F100\nA_COMPLETER\n\n[Cas 2 — Conflit de propriétaire]\n# Données : 3\n# Données : Kossi F001\n# Données : Ama F001\n# Données : Ama F002\nA_COMPLETER\n\n[Cas 3 — Cinq lignes mixtes]\n# Données : 5\n# Données : Kossi F001\n# Données : Ama F002\n# Données : Kossi F001\n# Données : Kossi F003\n# Données : Ama F002\nA_COMPLETER\n",
    "hints": [
      "Un tableau associatif proprietaire[facture] retient le premier client lié ; s'il est déjà pris par un autre client, conflit.",
      "Deux autres tableaux comptent les clients et factures distincts (incrémentés à la première apparition seulement)."
    ],
    "examples": [
      {
        "stdin": "4\nKossi F001\nKossi F002\nAma F003\nKossi F001\n",
        "expected": "Kossi F001 : ok\nKossi F002 : ok\nAma F003 : ok\nKossi F001 : ok\nclients : 2\nfactures : 3"
      }
    ],
    "tests": [
      {
        "label": "Une seule facture",
        "stdin": "cas:1",
        "expected": "Ama F100 : ok\nclients : 1\nfactures : 1"
      },
      {
        "label": "Conflit de propriétaire",
        "stdin": "cas:2",
        "expected": "Kossi F001 : ok\nF001 : conflit Kossi/Ama\nAma F002 : ok\nclients : 2\nfactures : 2"
      },
      {
        "label": "Cinq lignes mixtes",
        "stdin": "cas:3",
        "expected": "Kossi F001 : ok\nAma F002 : ok\nKossi F001 : ok\nKossi F003 : ok\nAma F002 : ok\nclients : 2\nfactures : 3"
      }
    ],
    "solution": "[Exemple]\nKossi F001 : ok\nKossi F002 : ok\nAma F003 : ok\nKossi F001 : ok\nclients : 2\nfactures : 3\n\n[Cas 1 — Une seule facture]\nAma F100 : ok\nclients : 1\nfactures : 1\n\n[Cas 2 — Conflit de propriétaire]\nKossi F001 : ok\nF001 : conflit Kossi/Ama\nAma F002 : ok\nclients : 2\nfactures : 2\n\n[Cas 3 — Cinq lignes mixtes]\nKossi F001 : ok\nAma F002 : ok\nKossi F001 : ok\nKossi F003 : ok\nAma F002 : ok\nclients : 2\nfactures : 3"
  },
  {
    "id": "mr-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les règles de passage MCD vers MLD",
    "goal": "Appliquer les règles de passage : entités et associations porteuses deviennent des tables.",
    "brief": "<p>Analysez chaque ligne proposée « nom nature » : nature vaut <code>entite</code> ou <code>assoc</code> (association). Une association avec des données portées (toute ligne <code>assoc</code> de ce sujet) devient une table ; une association sans données portées (nature <code>assoc0</code>) n'en devient pas. Pour chaque ligne il Indiquez <code>nom : table</code> ou <code>nom : ignoree</code>. Il termine par <code>MLD : X tables</code>.</p>",
    "starter": "# Grille d'analyse (mr-c5-e1) — Les règles de passage MCD vers MLD\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule entité]\n# Données : 1\n# Données : CLIENT entite\nA_COMPLETER\n\n[Cas 2 — Deux associations hiérarchiques]\n# Données : 2\n# Données : VIVRE assoc0\n# Données : HABITER assoc0\nA_COMPLETER\n\n[Cas 3 — Cinq éléments mixtes]\n# Données : 5\n# Données : CLIENT entite\n# Données : COMMANDE entite\n# Données : CONCERNER assoc\n# Données : PRODUIT entite\n# Données : DIRIGER assoc0\nA_COMPLETER\n",
    "hints": [
      "Trois natures, trois comportements : entite et assoc créent une table, assoc0 non.",
      "Incrémentez le compteur dans chaque branche qui crée une table."
    ],
    "examples": [
      {
        "stdin": "4\nCLIENT entite\nPRODUIT entite\nFOURNIR assoc\nAPPARTENIR assoc0\n",
        "expected": "CLIENT : table\nPRODUIT : table\nFOURNIR : table\nAPPARTENIR : ignoree\nMLD : 3 tables"
      }
    ],
    "tests": [
      {
        "label": "Une seule entité",
        "stdin": "cas:1",
        "expected": "CLIENT : table\nMLD : 1 tables"
      },
      {
        "label": "Deux associations hiérarchiques",
        "stdin": "cas:2",
        "expected": "VIVRE : ignoree\nHABITER : ignoree\nMLD : 0 tables"
      },
      {
        "label": "Cinq éléments mixtes",
        "stdin": "cas:3",
        "expected": "CLIENT : table\nCOMMANDE : table\nCONCERNER : table\nPRODUIT : table\nDIRIGER : ignoree\nMLD : 4 tables"
      }
    ],
    "solution": "[Exemple]\nCLIENT : table\nPRODUIT : table\nFOURNIR : table\nAPPARTENIR : ignoree\nMLD : 3 tables\n\n[Cas 1 — Une seule entité]\nCLIENT : table\nMLD : 1 tables\n\n[Cas 2 — Deux associations hiérarchiques]\nVIVRE : ignoree\nHABITER : ignoree\nMLD : 0 tables\n\n[Cas 3 — Cinq éléments mixtes]\nCLIENT : table\nCOMMANDE : table\nCONCERNER : table\nPRODUIT : table\nDIRIGER : ignoree\nMLD : 4 tables"
  },
  {
    "id": "mr-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "La clé primaire et les étrangères",
    "goal": "Valider les clés : unicité des primaires, références des étrangères (intégrité référentielle).",
    "brief": "<p>Analysez chaque ligne proposée « table cle type » : type vaut <code>pk</code> (clé primaire à déclarer) ou <code>fk:REF</code> (clé étrangère référençant la table REF). Pour chaque ligne il Indiquez <code>table : cle ok</code>, ou <code>table : doublon</code> si la même clé primaire est déclarée deux fois, ou <code>table : REF inconnue</code> si la table référencée n'a pas (encore ou jamais) de clé primaire déclarée. Il termine par <code>lignes valides : X/n</code>.</p>",
    "starter": "# Grille d'analyse (mr-c5-e2) — La clé primaire et les étrangères\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule pk]\n# Données : 1\n# Données : PRODUIT NumPrdt pk\nA_COMPLETER\n\n[Cas 2 — Doublon de pk]\n# Données : 2\n# Données : CLIENT NumClt pk\n# Données : CLIENT NumClt pk\nA_COMPLETER\n\n[Cas 3 — Cinq lignes mixtes]\n# Données : 5\n# Données : CLIENT NumClt pk\n# Données : CLIENT NumClt pk\n# Données : COMMANDE NumCde pk\n# Données : COMMANDE NumClt fk:CLIENT\n# Données : PAIEMENT NumCde fk:ORDER\nA_COMPLETER\n",
    "hints": [
      "Un tableau associatif primaires[REF] est rempli par les lignes pk ; les fk consultent ce même tableau.",
      "L'ordre compte : une fk qui référence une table dont la pk arrive plus tard est « inconnue » à cette ligne."
    ],
    "examples": [
      {
        "stdin": "4\nCLIENT NumClt pk\nCOMMANDE NumCde pk\nCOMMANDE NumClt fk:CLIENT\nLIVRAISON NumClt fk:FOURNISSEUR\n",
        "expected": "CLIENT : NumClt ok\nCOMMANDE : NumCde ok\nCOMMANDE : NumClt ok\nLIVRAISON : FOURNISSEUR inconnue\nlignes valides : 3/4"
      }
    ],
    "tests": [
      {
        "label": "Une seule pk",
        "stdin": "cas:1",
        "expected": "PRODUIT : NumPrdt ok\nlignes valides : 1/1"
      },
      {
        "label": "Doublon de pk",
        "stdin": "cas:2",
        "expected": "CLIENT : NumClt ok\nCLIENT : doublon\nlignes valides : 1/2"
      },
      {
        "label": "Cinq lignes mixtes",
        "stdin": "cas:3",
        "expected": "CLIENT : NumClt ok\nCLIENT : doublon\nCOMMANDE : NumCde ok\nCOMMANDE : NumClt ok\nPAIEMENT : ORDER inconnue\nlignes valides : 3/5"
      }
    ],
    "solution": "[Exemple]\nCLIENT : NumClt ok\nCOMMANDE : NumCde ok\nCOMMANDE : NumClt ok\nLIVRAISON : FOURNISSEUR inconnue\nlignes valides : 3/4\n\n[Cas 1 — Une seule pk]\nPRODUIT : NumPrdt ok\nlignes valides : 1/1\n\n[Cas 2 — Doublon de pk]\nCLIENT : NumClt ok\nCLIENT : doublon\nlignes valides : 1/2\n\n[Cas 3 — Cinq lignes mixtes]\nCLIENT : NumClt ok\nCLIENT : doublon\nCOMMANDE : NumCde ok\nCOMMANDE : NumClt ok\nPAIEMENT : ORDER inconnue\nlignes valides : 3/5"
  },
  {
    "id": "mr-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le schéma relationnel complet",
    "goal": "Assembler un schéma relationnel : table (cle, attributs..., fk#) vérifiée champ par champ.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Puis il lit <code>n_attrs</code> lignes « table champ » où champ est soit la clé de la table (il devient <code>#pk</code> dans l'affichage), soit une clé étrangère référençant une table déclarée (affichée <code>champ#</code>), soit un attribut simple (affiché tel quel). Chaque champ connu est affiché <code>table : champ_role</code> où role vaut <code>pk</code>, <code>fk</code> ou <code>attr</code>. Un champ appartenant à une table non déclarée produit <code>champ : table inconnue</code>.</p>",
    "starter": "# Grille d'analyse (mr-c5-e3) — Le schéma relationnel complet\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Table inconnue]\n# Données : 1\n# Données : CLIENT NumClt\n# Données : 2\n# Données : FOURNISSEUR NumFou\n# Données : CLIENT NomClt\nA_COMPLETER\n\n[Cas 2 — Une seule table, que sa clé]\n# Données : 1\n# Données : PRODUIT NumPrdt\n# Données : 1\n# Données : PRODUIT NumPrdt\nA_COMPLETER\n\n[Cas 3 — Trois tables et quatre champs]\n# Données : 3\n# Données : CLIENT NumClt\n# Données : COMMANDE NumCde\n# Données : PRODUIT NumPrdt\n# Données : 4\n# Données : COMMANDE NumCde\n# Données : COMMANDE NumClt\n# Données : PRODUIT PrixPrdt\n# Données : PRODUIT NumPrdt\nA_COMPLETER\n",
    "hints": [
      "Premier test : la table est-elle déclarée ? Deuxième : le champ est-il la clé de sa table ? Troisième : le champ est-il la clé d'une autre table (donc fk) ? Sinon attribut.",
      "Parcourez le tableau des clés déclarées pour savoir si le champ en est une."
    ],
    "examples": [
      {
        "stdin": "2\nCLIENT NumClt\nCOMMANDE NumCde\n4\nCLIENT NomClt\nCOMMANDE NumCde\nCOMMANDE NumClt\nCOMMANDE DateCde\n",
        "expected": "CLIENT : NomClt attr\nCOMMANDE : NumCde pk\nCOMMANDE : NumClt fk\nCOMMANDE : DateCde attr"
      }
    ],
    "tests": [
      {
        "label": "Table inconnue",
        "stdin": "cas:1",
        "expected": "NumFou : table inconnue\nCLIENT : NomClt attr"
      },
      {
        "label": "Une seule table, que sa clé",
        "stdin": "cas:2",
        "expected": "PRODUIT : NumPrdt pk"
      },
      {
        "label": "Trois tables et quatre champs",
        "stdin": "cas:3",
        "expected": "COMMANDE : NumCde pk\nCOMMANDE : NumClt fk\nPRODUIT : PrixPrdt attr\nPRODUIT : NumPrdt pk"
      }
    ],
    "solution": "[Exemple]\nCLIENT : NomClt attr\nCOMMANDE : NumCde pk\nCOMMANDE : NumClt fk\nCOMMANDE : DateCde attr\n\n[Cas 1 — Table inconnue]\nNumFou : table inconnue\nCLIENT : NomClt attr\n\n[Cas 2 — Une seule table, que sa clé]\nPRODUIT : NumPrdt pk\n\n[Cas 3 — Trois tables et quatre champs]\nCOMMANDE : NumCde pk\nCOMMANDE : NumClt fk\nPRODUIT : PrixPrdt attr\nPRODUIT : NumPrdt pk"
  },
  {
    "id": "mr-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Première forme normale",
    "goal": "Vérifier la 1FN : chaque attribut doit être monovalué et non décomposable.",
    "brief": "<p>Analysez chaque ligne proposée « attribut k » : k est le nombre de valeurs prises par l'attribut sur une ligne (1 = monovalué). Un attribut est <code>1FN ok</code> si k vaut exactement 1, sinon <code>multivalue</code>. Il termine par <code>1FN : verdict</code> où verdict vaut <code>respectee</code> si tous les attributs sont ok, <code>violee</code> sinon.</p>",
    "starter": "# Grille d'analyse (mr-c6-e1) — Première forme normale\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul attribut]\n# Données : 1\n# Données : Enfants 2\nA_COMPLETER\n\n[Cas 2 — Tous monovalués]\n# Données : 2\n# Données : Nom 1\n# Données : Ville 1\nA_COMPLETER\n\n[Cas 3 — Quatre attributs mixtes]\n# Données : 4\n# Données : Nom 1\n# Données : Telephones 2\n# Données : Adresse 1\n# Données : Enfants 3\nA_COMPLETER\n",
    "hints": [
      "Un drapeau violee=0 posé avant la boucle, passé à 1 au premier attribut multivalué.",
      "Le verdict se décide après la boucle, sur l'état du drapeau."
    ],
    "examples": [
      {
        "stdin": "3\nNom 1\nPrenom 1\nDiplomes 3\n",
        "expected": "Nom : 1FN ok\nPrenom : 1FN ok\nDiplomes : multivalue\n1FN : violee"
      }
    ],
    "tests": [
      {
        "label": "Un seul attribut",
        "stdin": "cas:1",
        "expected": "Enfants : multivalue\n1FN : violee"
      },
      {
        "label": "Tous monovalués",
        "stdin": "cas:2",
        "expected": "Nom : 1FN ok\nVille : 1FN ok\n1FN : respectee"
      },
      {
        "label": "Quatre attributs mixtes",
        "stdin": "cas:3",
        "expected": "Nom : 1FN ok\nTelephones : multivalue\nAdresse : 1FN ok\nEnfants : multivalue\n1FN : violee"
      }
    ],
    "solution": "[Exemple]\nNom : 1FN ok\nPrenom : 1FN ok\nDiplomes : multivalue\n1FN : violee\n\n[Cas 1 — Un seul attribut]\nEnfants : multivalue\n1FN : violee\n\n[Cas 2 — Tous monovalués]\nNom : 1FN ok\nVille : 1FN ok\n1FN : respectee\n\n[Cas 3 — Quatre attributs mixtes]\nNom : 1FN ok\nTelephones : multivalue\nAdresse : 1FN ok\nEnfants : multivalue\n1FN : violee"
  },
  {
    "id": "mr-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Dépendance partielle : la 2FN",
    "goal": "Détecter les dépendances partielles sur clé composée : un attribut qui ne dépend que d'une partie.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Puis il lit <strong>n lignes</strong> « attribut partie » : partie vaut <code>c1</code>, <code>c2</code> ou <code>cle</code>. Une dépendance sur <code>cle</code> (toute la clé) est <code>totale</code> ; une dépendance sur <code>c1</code> ou <code>c2</code> seule est <code>partielle</code>. Pour chaque ligne il Indiquez <code>attribut : type</code>. Il termine par <code>2FN : verdict</code> où verdict vaut <code>respectee</code> si aucune dépendance partielle, <code>violee</code> sinon.</p>",
    "starter": "# Grille d'analyse (mr-c6-e2) — Dépendance partielle : la 2FN\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toute la clé]\n# Données : NumCde RefPdt\n# Données : 1\n# Données : Quantite cle\nA_COMPLETER\n\n[Cas 2 — Deuxièmes parties]\n# Données : NumCde RefPdt\n# Données : 2\n# Données : PrixPrdt c2\n# Données : Quantite cle\nA_COMPLETER\n\n[Cas 3 — Quatre dépendances mixtes]\n# Données : NumCde RefPdt\n# Données : 4\n# Données : Quantite cle\n# Données : DateCde c1\n# Données : Remise cle\n# Données : DesignationPdt c2\nA_COMPLETER\n",
    "hints": [
      "Seule la ligne entière « cle » déclenche « totale » : c1 et c2 seules sont partielles.",
      "Même mécanique de drapeau que la 1FN : violee passe à 1 au premier attribut partiel."
    ],
    "examples": [
      {
        "stdin": "NumCde RefPdt\n3\nQuantite cle\nDesignationPdt c1\nRemise cle\n",
        "expected": "Quantite : totale\nDesignationPdt : partielle\nRemise : totale\n2FN : violee"
      }
    ],
    "tests": [
      {
        "label": "Toute la clé",
        "stdin": "cas:1",
        "expected": "Quantite : totale\n2FN : respectee"
      },
      {
        "label": "Deuxièmes parties",
        "stdin": "cas:2",
        "expected": "PrixPrdt : partielle\nQuantite : totale\n2FN : violee"
      },
      {
        "label": "Quatre dépendances mixtes",
        "stdin": "cas:3",
        "expected": "Quantite : totale\nDateCde : partielle\nRemise : totale\nDesignationPdt : partielle\n2FN : violee"
      }
    ],
    "solution": "[Exemple]\nQuantite : totale\nDesignationPdt : partielle\nRemise : totale\n2FN : violee\n\n[Cas 1 — Toute la clé]\nQuantite : totale\n2FN : respectee\n\n[Cas 2 — Deuxièmes parties]\nPrixPrdt : partielle\nQuantite : totale\n2FN : violee\n\n[Cas 3 — Quatre dépendances mixtes]\nQuantite : totale\nDateCde : partielle\nRemise : totale\nDesignationPdt : partielle\n2FN : violee"
  },
  {
    "id": "mr-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Dépendance transitive : la 3FN",
    "goal": "Détecter la dépendance transitive : un attribut non clé qui en détermine un autre.",
    "brief": "<p>Analysez chaque ligne proposée « source cible » où la source est un attribut non clé. Une même source qui détermine deux cibles différentes crée une dépendance transitive (l'attribut source joue le rôle d'une seconde clé cachée). Pour chaque ligne il Indiquez <code>source → cible</code>. À la première transitive il Indiquez en plus <code>3FN : transitive par source</code>. Il termine par <code>3FN : verdict</code> où verdict vaut <code>respectee</code> (aucune transitive) ou <code>violee</code>.</p>",
    "starter": "# Grille d'analyse (mr-c6-e3) — Dépendance transitive : la 3FN\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sources uniques]\n# Données : 2\n# Données : NumClt NomClt\n# Données : CodeCateg Remise\nA_COMPLETER\n\n[Cas 2 — Même cible répétée]\n# Données : 3\n# Données : NumClt NomClt\n# Données : NumClt NomClt\n# Données : CodeCateg Remise\nA_COMPLETER\n\n[Cas 3 — Deux transitives]\n# Données : 5\n# Données : NumClt NomClt\n# Données : CodeCateg LibCateg\n# Données : CodeCateg Remise\n# Données : NumClt AdrClt\n# Données : CodeCateg Plafond\nA_COMPLETER\n",
    "hints": [
      "Même détection que les DF élémentaires du chapitre 3 : un tableau vues[source] retient la première cible.",
      "Le message « transitive par source » n'apparaît qu'une fois (drapeau) ; le verdict final tient compte du drapeau."
    ],
    "examples": [
      {
        "stdin": "4\nNumClt NomClt\nNumClt AdrClt\nCodeCateg LibCateg\nCodeCateg Remise\n",
        "expected": "NumClt → NomClt\nNumClt → AdrClt\n3FN : transitive par NumClt\nCodeCateg → LibCateg\nCodeCateg → Remise\n3FN : violee"
      }
    ],
    "tests": [
      {
        "label": "Sources uniques",
        "stdin": "cas:1",
        "expected": "NumClt → NomClt\nCodeCateg → Remise\n3FN : respectee"
      },
      {
        "label": "Même cible répétée",
        "stdin": "cas:2",
        "expected": "NumClt → NomClt\nNumClt → NomClt\nCodeCateg → Remise\n3FN : respectee"
      },
      {
        "label": "Deux transitives",
        "stdin": "cas:3",
        "expected": "NumClt → NomClt\nCodeCateg → LibCateg\nCodeCateg → Remise\n3FN : transitive par CodeCateg\nNumClt → AdrClt\nCodeCateg → Plafond\n3FN : violee"
      }
    ],
    "solution": "[Exemple]\nNumClt → NomClt\nNumClt → AdrClt\n3FN : transitive par NumClt\nCodeCateg → LibCateg\nCodeCateg → Remise\n3FN : violee\n\n[Cas 1 — Sources uniques]\nNumClt → NomClt\nCodeCateg → Remise\n3FN : respectee\n\n[Cas 2 — Même cible répétée]\nNumClt → NomClt\nNumClt → NomClt\nCodeCateg → Remise\n3FN : respectee\n\n[Cas 3 — Deux transitives]\nNumClt → NomClt\nCodeCateg → LibCateg\nCodeCateg → Remise\n3FN : transitive par CodeCateg\nNumClt → AdrClt\nCodeCateg → Plafond\n3FN : violee"
  }
];
