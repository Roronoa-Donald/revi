/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "cy-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Calculateur de risque",
    "goal": "Appliquer à des actifs un barème fictif fondé sur la somme de deux indices.",
    "brief": "<p>La première donnée donne le nombre d’actifs. Pour chacun, deux entiers de 1 à 3 représentent des indices de menace et de vulnérabilité. Dans ce barème fictif, additionnez les deux indices : une somme de 2 ou 3 donne <code>Faible</code>, de 4 ou 5 <code>Moyenne</code>, et 6 <code>Critique</code>. Ce score ne tient pas compte de l’impact et ne constitue pas une évaluation complète du risque.</p><p>Pour chaque ligne, indiquez <code>actif K : niveau</code>, K étant le numéro de l’actif à partir de 1.</p>",
    "starter": "# Grille d'analyse (cy-c1-e1) — Calculateur de risque\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Série A]\n# Données : 2\n# Données : 1 1\n# Données : 2 3\nA_COMPLETER\n\n[Cas 2 — Quatre actifs mixtes]\n# Données : 4\n# Données : 2 2\n# Données : 1 3\n# Données : 3 3\n# Données : 1 1\nA_COMPLETER\n\n[Cas 3 — Cinq actifs]\n# Données : 5\n# Données : 3 2\n# Données : 2 2\n# Données : 1 1\n# Données : 2 3\n# Données : 3 3\nA_COMPLETER\n",
    "hints": [
      "Pour chaque actif, quelles sont les deux valeurs à combiner ?",
      "Comparez la somme au barème fictif, puis numérotez les actifs dans l’ordre.",
      "Additionnez les deux indices de gravité et probabilité pour chaque actif, puis appliquez le seuil <=3 Faible, <=5 Moyenne, >5 Critique."
    ],
    "examples": [
      {
        "stdin": "3\n1 2\n3 3\n2 1\n",
        "expected": "actif 1 : Faible\nactif 2 : Critique\nactif 3 : Faible"
      }
    ],
    "tests": [
      {
        "label": "Faible et moyen",
        "stdin": "cas:1",
        "expected": "actif 1 : Faible\nactif 2 : Moyenne"
      },
      {
        "label": "Quatre actifs mixtes",
        "stdin": "cas:2",
        "expected": "actif 1 : Moyenne\nactif 2 : Moyenne\nactif 3 : Critique\nactif 4 : Faible"
      },
      {
        "label": "Cinq actifs",
        "stdin": "cas:3",
        "expected": "actif 1 : Moyenne\nactif 2 : Moyenne\nactif 3 : Faible\nactif 4 : Moyenne\nactif 5 : Critique"
      }
    ],
    "solution": "[Exemple]\nactif 1 : Faible\nactif 2 : Critique\nactif 3 : Faible\n\n[Cas 1 — Faible et moyen]\nactif 1 : Faible\nactif 2 : Moyenne\n\n[Cas 2 — Quatre actifs mixtes]\nactif 1 : Moyenne\nactif 2 : Moyenne\nactif 3 : Critique\nactif 4 : Faible\n\n[Cas 3 — Cinq actifs]\nactif 1 : Moyenne\nactif 2 : Moyenne\nactif 3 : Faible\nactif 4 : Moyenne\nactif 5 : Critique",
    "takeaway": "À retenir : Appliquer à des actifs un barème fictif fondé sur la somme de deux indices."
  },
  {
    "id": "cy-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Police de la triade CIA",
    "goal": "Recenser les composantes CIA menacées par des incidents bruts (sans étiquette préalable), sans en déduire leur protection.",
    "brief": "<p>La première ligne indique le nombre d’incidents. Chaque ligne suivante donne uniquement l’intitulé brut de la menace : identifiez vous-même le pilier CIA principalement visé — <code>C</code> (confidentialité), <code>I</code> (intégrité) ou <code>D</code> (disponibilité) — puis écrivez <code>lettre : menace</code>.</p><p>Terminez par <code>bilan : composantes=&lt;nombre de composantes distinctes&gt; incidents=&lt;nombre d’incidents&gt;</code>. Ce décompte ne démontre pas qu’une composante est protégée ou qu’une menace est contenue.</p>",
    "starter": "# Grille d'analyse (cy-c1-e2) — Police de la triade CIA\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule menace]\n# Données : 1\n# Données : ecoute\nA_COMPLETER\n\n[Cas 2 — Série B]\n# Données : 3\n# Données : vol\n# Données : vol\n# Données : altération\nA_COMPLETER\n\n[Cas 3 — Série C]\n# Données : 4\n# Données : panne\n# Données : panne\n# Données : modification\n# Données : modification\nA_COMPLETER\n",
    "hints": [
      "Posez-vous la question : l’incident divulgue-t-il un secret (C), fausse-t-il une donnée (I) ou coupe-t-il un service (D) ?",
      "Comptez séparément les composantes distinctes touchées et le nombre total d’incidents ; cela ne prouve aucune protection.",
      "Respectez exactement la syntaxe « C|I|D : intitule » pour chaque ligne puis « bilan : composantes=X incidents=Y »."
    ],
    "examples": [
      {
        "stdin": "5\necoute\nmodification\ndivulgation\nransomware\ncoupure\n",
        "expected": "C : ecoute\nI : modification\nC : divulgation\nD : ransomware\nD : coupure\nbilan : composantes=3 incidents=5"
      }
    ],
    "tests": [
      {
        "label": "Une seule menace",
        "stdin": "cas:1",
        "expected": "C : ecoute\nbilan : composantes=1 incidents=1"
      },
      {
        "label": "Deux composantes",
        "stdin": "cas:2",
        "expected": "C : vol\nC : vol\nI : altération\nbilan : composantes=2 incidents=3"
      },
      {
        "label": "Deux composantes, autre répartition",
        "stdin": "cas:3",
        "expected": "D : panne\nD : panne\nI : modification\nI : modification\nbilan : composantes=2 incidents=4"
      }
    ],
    "solution": "[Exemple]\nC : ecoute\nI : modification\nC : divulgation\nD : ransomware\nD : coupure\nbilan : composantes=3 incidents=5\n\n[Cas 1 — Une seule menace]\nC : ecoute\nbilan : composantes=1 incidents=1\n\n[Cas 2 — Deux composantes]\nC : vol\nC : vol\nI : altération\nbilan : composantes=2 incidents=3\n\n[Cas 3 — Deux composantes, autre répartition]\nD : panne\nD : panne\nI : modification\nI : modification\nbilan : composantes=2 incidents=4",
    "takeaway": "À retenir : Recenser les composantes CIA mentionnées dans une liste d’incidents, sans en déduire leur protection."
  },
  {
    "id": "cy-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le quiz « L'histoire apprend » de la ville de Saint-Amont",
    "exampleTitle": "Exemple résolu — le quiz d'ouverture de la semaine de sensibilisation",
    "goal": "Relier les incidents célèbres (Morris, ILOVEYOU, CryptoLocker, WannaCry, Log4Shell) à leurs mécanismes et à leurs leçons.",
    "brief": "<p><strong>Énoncé.</strong> Pour sa semaine de sensibilisation, la ville de Saint-Amont diffuse le quiz « L'histoire apprend », construit sur le tableau des incidents célèbres du cours. Chaque question porte sur un incident et sur la leçon qu'il a laissée.</p><ol><li>Quel incident de 1988 est considéré comme le premier ver d'Internet ?</li><li>ILOVEYOU (2000) a révélé la véritable « porte d'entrée » des attaques : qui ? Répondez par un seul mot.</li><li>Quel type de malware est WannaCry (2017) ? Répondez par deux mots.</li><li>En quelle année le ransomware CryptoLocker est-il apparu ?</li><li>La faille Log4Shell (2021) se cachait dans quoi ? Répondez par un seul mot.</li><li>La sécurité informatique est un ___ de la cybersécurité. Complétez.</li></ol>",
    "starter": "# Exercice — Le quiz « L'histoire apprend » de la ville de Saint-Amont\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Premier ver d'Internet (1988)]\nA_COMPLETER\n\n[Question 2 — La porte d'entrée révélée par ILOVEYOU]\nA_COMPLETER\n\n[Question 3 — Type de malware de WannaCry]\nA_COMPLETER\n\n[Question 4 — Année d'apparition de CryptoLocker]\nA_COMPLETER\n\n[Question 5 — Où se cachait la faille Log4Shell]\nA_COMPLETER\n\n[Question 6 — La sécurité informatique est un ___ de la cybersécurité]\nA_COMPLETER\n",
    "hints": [
      "Le tableau du cours associe à chaque incident son mécanisme et sa leçon : ver Morris, ILOVEYOU, CryptoLocker, WannaCry, Log4Shell — relisez-le avant de répondre.",
      "Pour chaque question, situez l'incident : année, mode de propagation, famille de malware — sans confondre virus (attend un humain) et ver (voyage seul).",
      "La dernière question est une question de périmètre : lequel des deux termes, sécurité informatique ou cybersécurité, contient l'autre ?"
    ],
    "examples": [
      {
        "stdin": "Quiz d'ouverture de la semaine de sensibilisation :\n1) En quelle année le ver Morris a-t-il infecté Internet ? Réponse : 1988.\n2) Quel incident de 2017 a exploité une faille Windows non corrigée ? Réponse : WannaCry.\n3) Quelle leçon retenir de WannaCry ? Réponse : le patch management sauve des hôpitaux.",
        "expected": "1988 — WannaCry — leçon : corriger sans tarder (patch management)",
        "note": "Chaque incident célèbre est une faille connue et non traitée : la date situe, la leçon fait agir."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Premier ver d'Internet (1988)",
        "stdin": "q:1",
        "expected": "le ver morris||ver morris||morris"
      },
      {
        "label": "Question 2 — La porte d'entrée révélée par ILOVEYOU",
        "stdin": "q:2",
        "expected": "l'humain||l’humain||humain||l'utilisateur||l’utilisateur"
      },
      {
        "label": "Question 3 — Type de malware de WannaCry",
        "stdin": "q:3",
        "expected": "ver ransomware||un ver ransomware||ransomware"
      },
      {
        "label": "Question 4 — Année d'apparition de CryptoLocker",
        "stdin": "q:4",
        "expected": "2013"
      },
      {
        "label": "Question 5 — Où se cachait la faille Log4Shell",
        "stdin": "q:5",
        "expected": "bibliotheque||une bibliotheque||bibliotheque logicielle||une bibliotheque logicielle"
      },
      {
        "label": "Question 6 — La sécurité informatique est un ___ de la cybersécurité",
        "stdin": "q:6",
        "expected": "sous-ensemble||sous ensemble||un sous-ensemble"
      }
    ],
    "solution": "[Question 1 — Premier ver d'Internet (1988)]\nle ver morris\n\n[Question 2 — La porte d'entrée révélée par ILOVEYOU]\nl'humain\n\n[Question 3 — Type de malware de WannaCry]\nver ransomware\n\n[Question 4 — Année d'apparition de CryptoLocker]\n2013\n\n[Question 5 — Où se cachait la faille Log4Shell]\nbibliotheque\n\n[Question 6 — La sécurité informatique est un ___ de la cybersécurité]\nsous-ensemble",
    "takeaway": "1) Le ver Morris (1988) est le premier ver d'Internet : il a montré que le réseau propage à la vitesse des failles.\n2) ILOVEYOU s'est propagé par pièce jointe de courriel exécutée par les destinataires : la porte d'entrée, c'est l'humain.\n3) WannaCry (2017) combine la propagation autonome d'un ver et le chiffrement à rançon d'un ransomware : c'est un ver ransomware.\n4) CryptoLocker est apparu en 2013.\n5) Log4Shell (2021) se cachait dans une bibliothèque logicielle omniprésente : la chaîne logicielle est une surface d'attaque.\n6) La sécurité informatique (systèmes, réseaux, applications) est le volet technique : c'est un sous-ensemble de la cybersécurité, qui englobe en plus l'organisationnel et l'humain.\nContrôle : chaque leçon du tableau est reprise par une mesure du cours — sauvegardes hors ligne, patch management, sensibilisation."
  },
  {
    "id": "cy-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Trois tickets pour un lundi matin chez Mediafiche",
    "exampleTitle": "Exemple résolu — les tickets du garage Outil Plus",
    "goal": "Qualifier des infections réelles dans la bonne famille de malwares et choisir la parade de référence.",
    "brief": "<p><strong>Énoncé.</strong> Mediafiche, PME de 40 salariés, édite des fiches techniques. À 8 h, le servicedesk ouvre trois tickets :</p><table><tr><th>Ticket</th><th>Signalement</th></tr><tr><td>101</td><td>La comptable a exécuté <code>facture_avril.exe</code> reçu par courriel ; le fichier corrompt peu à peu ses documents</td></tr><tr><td>102</td><td>Les maquettes du studio sont devenues illisibles ; un message exige 500 euros en cartes cadeaux</td></tr><tr><td>103</td><td>Le poste d'une commerciale rame ; un enregistreur de frappes a transmis ses mots de passe à l'extérieur</td></tr></table><p>Le cours distingue quatre familles de malwares : <strong>virus</strong> (attend une action humaine), <strong>ver</strong> (se propage seul), <strong>ransomware</strong> (chiffre puis exige une rançon), <strong>spyware</strong> (espionne).</p><ol><li>À quelle famille de malwares appartient l'infection du ticket 101 ?</li><li>À quelle famille appartient celle du ticket 102 ?</li><li>À quelle famille appartient celle du ticket 103 ?</li><li>Quel malware se propage seul de machine en machine, sans aucune action humaine ?</li><li>Quelle est la réponse de référence du cours contre le ransomware du ticket 102 ? Répondez en trois mots.</li></ol><p>Questions 1 à 4 : répondez par un seul mot.</p>",
    "starter": "# Exercice — Trois tickets pour un lundi matin chez Mediafiche\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : un seul mot. Question 5 : trois mots.\n\n[Question 1 — Famille du malware du ticket 101]\nA_COMPLETER\n\n[Question 2 — Famille du malware du ticket 102]\nA_COMPLETER\n\n[Question 3 — Famille du malware du ticket 103]\nA_COMPLETER\n\n[Question 4 — Le malware qui se propage seul]\nA_COMPLETER\n\n[Question 5 — Réponse de référence contre le ransomware]\nA_COMPLETER\n",
    "hints": [
      "Quatre familles dominent le cours : le virus attend une action humaine, le ver voyage seul, le ransomware chiffre, le spyware espionne.",
      "Pour chaque ticket, identifiez ce que fait le malware — corrompre des fichiers après exécution, chiffrer contre rançon, enregistrer en secret : la famille suit l'action.",
      "Pour la dernière question, suivez le tableau du cours : la réponse de référence d'une famille n'est jamais celle d'une autre, et payer n'y figure pas."
    ],
    "examples": [
      {
        "stdin": "Le garage Outil Plus ouvre deux tickets :\nticket 7 : le logiciel de gestion ralentit et corrompt les fichiers après l'ouverture de « mise_a_jour.exe » ;\nticket 8 : les devis sont chiffrés, 1 000 euros sont exigés.\n\n1) Ticket 7 : le malware attend l'exécution d'un fichier infecté, c'est un virus.\n2) Ticket 8 : il chiffre puis exige une rançon, c'est un ransomware.\n3) Parade de référence pour le ticket 8 : restaurer une sauvegarde hors ligne.",
        "expected": "ticket 7 : virus — ticket 8 : ransomware — parade : sauvegarde hors ligne",
        "note": "Le virus attend un humain, le ver voyage seul, le ransomware chiffre, le spyware espionne : la parade suit la famille, pas l'instinct."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Famille du malware du ticket 101",
        "stdin": "q:1",
        "expected": "virus||un virus"
      },
      {
        "label": "Question 2 — Famille du malware du ticket 102",
        "stdin": "q:2",
        "expected": "ransomware||rancongiciel||un ransomware"
      },
      {
        "label": "Question 3 — Famille du malware du ticket 103",
        "stdin": "q:3",
        "expected": "spyware||un spyware||logiciel espion"
      },
      {
        "label": "Question 4 — Le malware qui se propage seul",
        "stdin": "q:4",
        "expected": "ver||un ver"
      },
      {
        "label": "Question 5 — Réponse de référence contre le ransomware",
        "stdin": "q:5",
        "expected": "sauvegarde hors ligne||restaurer une sauvegarde hors ligne||une sauvegarde hors ligne||restaurer une sauvegarde"
      }
    ],
    "solution": "[Question 1 — Famille du malware du ticket 101]\nvirus\n\n[Question 2 — Famille du malware du ticket 102]\nransomware\n\n[Question 3 — Famille du malware du ticket 103]\nspyware\n\n[Question 4 — Le malware qui se propage seul]\nver\n\n[Question 5 — Réponse de référence contre le ransomware]\nsauvegarde hors ligne",
    "takeaway": "1) Ticket 101 : le fichier exécutable devait être lancé par la comptable pour agir et il corrompt les documents — c'est un virus.\n2) Ticket 102 : les fichiers sont chiffrés et une rançon est exigée — c'est un ransomware.\n3) Ticket 103 : un enregistreur de frappes transmet secrètement les mots de passe — c'est un spyware.\n4) Le ver (worm) se réplique seul par le réseau, sans action humaine ; la parade du cours est d'isoler la machine.\n5) La réponse de référence contre un ransomware : restaurer une sauvegarde hors ligne (testée). Payer la rançon n'est jamais la parade : aucune garantie n'accompagne le paiement.\nContrôle : chaque ticket relie propagation et action — c'est le tableau des familles du chapitre."
  },
  {
    "id": "cy-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le courriel de la banque qui n'en était pas une",
    "exampleTitle": "Exemple résolu — le SMS du colis absent",
    "goal": "Reconnaître les indices d'un phishing, nommer l'ingénierie sociale et choisir le bon réflexe.",
    "brief": "<p><strong>Énoncé.</strong> Agrifournil, PME de 15 salariés, vend des fournitures agricoles. La comptable reçoit ce courriel :</p><pre>De : service.client@banque-securite.info\nObjet : DERNIER AVERTISSEMENT — clôture de votre compte sous 24 h\n\nCher client, votre compte bancaire a été suspendu par notre\nservice de sécurité. Vous avez 24 heures pour confirmer vos\nidentifiants via le lien suivant : http://185.34.12.7/verification\nPassé ce délai, votre compte sera définitivement clôturé.</pre><p>Le lien ouvre une page qui imite le portail de la banque et réclame le mot de passe.</p><ol><li>Qualifiez l'attaque : de quel type d'attaque ce courriel est-il l'instrument ? Répondez par un seul mot.</li><li>Comment s'appelle la technique générale qui manipule l'humain plutôt que la machine ? Répondez par deux mots.</li><li>Quel sentiment le message exploite-t-il pour empêcher toute vérification ? Répondez par un seul mot.</li><li>Le lien commence par <code>http://</code> : quel protocole sécurisé manque-t-il sur cette page qui réclame un mot de passe ?</li><li>Quel est le bon réflexe de la comptable : cliquer pour vérifier, répondre au courriel, ou signaler au service informatique ? Répondez par un seul mot.</li><li>L'expéditeur est hors du périmètre de l'entreprise : l'attaque est-elle interne ou externe ?</li></ol>",
    "starter": "# Exercice — Le courriel de la banque qui n'en était pas une\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par des réponses très courtes (un ou deux mots).\n\n[Question 1 — Type d'attaque]\nA_COMPLETER\n\n[Question 2 — Technique qui manipule l'humain]\nA_COMPLETER\n\n[Question 3 — Sentiment exploité]\nA_COMPLETER\n\n[Question 4 — Protocole sécurisé absent]\nA_COMPLETER\n\n[Question 5 — Le bon réflexe]\nA_COMPLETER\n\n[Question 6 — Attaque interne ou externe]\nA_COMPLETER\n",
    "hints": [
      "Le phishing (hameçonnage) imite un service de confiance pour voler des identifiants ; le cours en liste les indices : expéditeur presque correct, URL suspecte, absence de HTTPS, urgence, ton générique.",
      "Relisez le courriel : le domaine de l'expéditeur, le lien en adresse IP, le délai de 24 h, le « Cher client » — chaque question pointe un de ces indices.",
      "Pour la fin, la parade est un réflexe et non une intuition : vérifier par un canal connu et signaler ; et jugez la position de l'attaquant par rapport au périmètre de l'entreprise."
    ],
    "examples": [
      {
        "stdin": "Un stagiaire reçoit un SMS : « Votre colis sera renvoyé sous 48 h. Confirmez votre adresse et vos coordonnées bancaires sur colis-suivi.tk ».\n\n1) Le message imite un service de confiance pour voler des données : c'est du phishing.\n2) La technique générale qui manipule l'humain : l'ingénierie sociale.\n3) Le sentiment exploité : l'urgence (« sous 48 h »).\n4) L'indice du domaine : .tk, un domaine exotique.\n5) Le bon réflexe : signaler, sans cliquer.",
        "expected": "phishing — ingénierie sociale — urgence — domaine exotique — signaler",
        "note": "Courriel ou SMS, les indices sont les mêmes : urgence artificielle, expéditeur presque correct, domaine suspect — et le réflexe est toujours de signaler sans cliquer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Type d'attaque",
        "stdin": "q:1",
        "expected": "phishing||le phishing||hameconnage||hameçonnage||l'hameconnage||l’hameçonnage"
      },
      {
        "label": "Question 2 — Technique qui manipule l'humain",
        "stdin": "q:2",
        "expected": "ingenierie sociale||l'ingenierie sociale||l’ingénierie sociale||une ingenierie sociale"
      },
      {
        "label": "Question 3 — Sentiment exploité",
        "stdin": "q:3",
        "expected": "urgence||l'urgence||l’urgence||le sentiment d'urgence"
      },
      {
        "label": "Question 4 — Protocole sécurisé absent",
        "stdin": "q:4",
        "expected": "https||le https"
      },
      {
        "label": "Question 5 — Le bon réflexe",
        "stdin": "q:5",
        "expected": "signaler||signaler au service informatique||le signaler"
      },
      {
        "label": "Question 6 — Attaque interne ou externe",
        "stdin": "q:6",
        "expected": "externe||une attaque externe||attaque externe"
      }
    ],
    "solution": "[Question 1 — Type d'attaque]\nphishing\n\n[Question 2 — Technique qui manipule l'humain]\ningenierie sociale\n\n[Question 3 — Sentiment exploité]\nurgence\n\n[Question 4 — Protocole sécurisé absent]\nhttps\n\n[Question 5 — Le bon réflexe]\nsignaler\n\n[Question 6 — Attaque interne ou externe]\nexterne",
    "takeaway": "1) Le courriel imite la banque pour voler les identifiants : c'est du phishing (hameçonnage).\n2) La technique générale qui manipule l'humain plutôt que la machine est l'ingénierie sociale.\n3) « Sous 24 h », « dernier avertissement », « définitivement clôturé » : le message exploite l'urgence, qui a pour but d'empêcher la vérification.\n4) Le lien est en http:// : le HTTPS manque — une page qui réclame un mot de passe sans cadenas est un indice de phishing.\n5) Le bon réflexe : signaler au service informatique, sans cliquer ni répondre — vérifier, si besoin, en joignant la banque par un canal connu.\n6) L'expéditeur est hors du périmètre d'Agrifournil : l'attaque est externe.\nContrôle : cinq indices du cours sont réunis — expéditeur au domaine presque correct (.info), URL en adresse IP, absence de HTTPS, urgence, ton générique (« Cher client »)."
  },
  {
    "id": "cy-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "La nuit noire de Kabiloo, marchand en ligne",
    "exampleTitle": "Exemple résolu — le site du journal La Dépêche du Val",
    "goal": "Qualifier des attaques réseau (DDoS, rogue AP, man-in-the-middle) et identifier la source de menaces.",
    "brief": "<p><strong>Énoncé.</strong> Kabiloo vend des vêtements en ligne. Dans la nuit du 12 au 13, la supervision reconstitue trois faits :</p><table><tr><th>Heure</th><th>Fait observé</th></tr><tr><td>22 h 10</td><td>Le site marchand est injoignable : le trafic arrive de milliers d'adresses IP différentes et coordonnées (un botnet)</td></tr><tr><td>22 h 40</td><td>Sur le Wi-Fi de l'entrepôt, un point d'accès inconnu diffuse le même nom que le réseau de l'entreprise</td></tr><tr><td>23 h 15</td><td>Un flux suspect relaie les échanges entre le terminal de paiement et la banque</td></tr></table><ol><li>Qualifiez l'attaque de 22 h 10 : donnez son sigle de quatre lettres.</li><li>Quelle composante de la triade CIA l'attaque de 22 h 10 vise-t-elle ? Répondez par un seul mot.</li><li>Comment appelle-t-on un point d'accès non autorisé branché dans le réseau de confiance ? Répondez en anglais, deux mots.</li><li>Comment s'appelle l'attaque qui s'intercale entre deux parties qui croient dialoguer en direct ? Donnez son nom anglais ou son sigle.</li><li>Une simple écoute du trafic, sans rien modifier, est une attaque active ou passive ?</li><li>Les attaquants ont loué leur botnet par appât du gain : à quelle source de menaces appartiennent-ils ? Répondez par un seul mot.</li></ol>",
    "starter": "# Exercice — La nuit noire de Kabiloo, marchand en ligne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par des réponses très courtes (un mot, un sigle ou deux mots).\n\n[Question 1 — Sigle de l'attaque de 22 h 10]\nA_COMPLETER\n\n[Question 2 — Composante CIA visée par cette attaque]\nA_COMPLETER\n\n[Question 3 — Nom du point d'accès non autorisé]\nA_COMPLETER\n\n[Question 4 — Nom de l'attaque qui s'intercale]\nA_COMPLETER\n\n[Question 5 — Écoute simple : active ou passive]\nA_COMPLETER\n\n[Question 6 — Source de menaces motivée par le gain]\nA_COMPLETER\n",
    "hints": [
      "Le chapitre cite le déni de service (DoS, DDoS) et trois classiques du réseau sans fil : rogue AP, MAC spoofing, man-in-the-middle.",
      "Pour qualifier chaque fait, demandez-vous ce que fait l'attaquant : saturer un service, s'installer dans le réseau, s'intercale entre deux interlocuteurs, ou juste écouter.",
      "La source de menace se lit dans la motivation : idéologie (hacktivistes), argent (une autre famille), espionnage (États), accès légitimes détournés (interne)."
    ],
    "examples": [
      {
        "stdin": "Le site du journal La Dépêche du Val tombe le soir d'une élection : le trafic arrive de milliers de machines coordonnées.\nUn faux point d'accès est aussi détecté dans les locaux.\n\n1) Le site sature depuis un botnet : attaque par déni de service distribué (DDoS).\n2) Composante visée : la disponibilité.\n3) Le faux point d'accès non autorisé : un rogue AP.\n4) Motivation des attaquants, idéologique : des hacktivistes.",
        "expected": "DDoS — disponibilité — rogue AP — hacktivistes",
        "note": "Même attaque, motivations différentes : l'appât du gain signe les cybercriminels, l'idéologie signe les hacktivistes."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Sigle de l'attaque de 22 h 10",
        "stdin": "q:1",
        "expected": "ddos||un ddos||attaque ddos||deni de service distribue||déni de service distribué"
      },
      {
        "label": "Question 2 — Composante CIA visée par cette attaque",
        "stdin": "q:2",
        "expected": "disponibilite||la disponibilite"
      },
      {
        "label": "Question 3 — Nom du point d'accès non autorisé",
        "stdin": "q:3",
        "expected": "rogue ap||ap rogue||point d'acces rogue||point d’accès rogue||point d acces rogue"
      },
      {
        "label": "Question 4 — Nom de l'attaque qui s'intercale",
        "stdin": "q:4",
        "expected": "man-in-the-middle||man in the middle||mitm||l'homme du milieu||l’homme du milieu||homme du milieu"
      },
      {
        "label": "Question 5 — Écoute simple : active ou passive",
        "stdin": "q:5",
        "expected": "passive||une attaque passive||attaque passive"
      },
      {
        "label": "Question 6 — Source de menaces motivée par le gain",
        "stdin": "q:6",
        "expected": "cybercriminels||les cybercriminels||des cybercriminels||cybercriminalite"
      }
    ],
    "solution": "[Question 1 — Sigle de l'attaque de 22 h 10]\nddos\n\n[Question 2 — Composante CIA visée par cette attaque]\ndisponibilite\n\n[Question 3 — Nom du point d'accès non autorisé]\nrogue ap\n\n[Question 4 — Nom de l'attaque qui s'intercale]\nman-in-the-middle\n\n[Question 5 — Écoute simple : active ou passive]\npassive\n\n[Question 6 — Source de menaces motivée par le gain]\ncybercriminels",
    "takeaway": "1) 22 h 10 : le service est saturé depuis des milliers de machines coordonnées (un botnet) — c'est un déni de service distribué, DDoS.\n2) Saturer le service le rend indisponible : le DDoS vise la disponibilité.\n3) Un point d'accès non autorisé qui imite le réseau de confiance est un rogue AP — une porte dérobée ouverte, à repérer avec un système WIPS.\n4) Le flux qui relaie les échanges entre le terminal et la banque est un man-in-the-middle (MITM) : l'attaquant s'intercale entre deux parties qui croient dialoguer en direct.\n5) L'écoute observe et apprend sans toucher aux ressources : c'est une attaque passive (l'attaque active modifie ou perturbe).\n6) Motivation financière (location de botnet, extorsion) : les attaquants sont des cybercriminels — les hacktivistes agissent par idéologie, les États-nations pour l'espionnage, les menaces internes abusent d'accès autorisés.\nContrôle : chaque fait se qualifie par son action — saturer, s'installer, s'intercaler — puis par la composante CIA atteinte."
  },
  {
    "id": "cy-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Les codes promo chiffrés à la César de la librairie Page 17",
    "exampleTitle": "Exemple résolu — le décalage 4 du club d'échecs",
    "goal": "Calculer des chiffrements de César (décalage) lettre par lettre et qualifier ce chiffrement.",
    "brief": "<p><strong>Énoncé.</strong> La librairie en ligne Page 17 offre des codes promo à ses abonnés. Le stagiaire les « protège » avec un <strong>chiffre de César</strong> : chaque lettre est décalée d'un nombre fixe <code>d</code> dans l'alphabet. L'auditeur junior doit montrer la faiblesse du procédé.</p><p>Convention : l'alphabet <code>A B C … Z</code> est numéroté de 0 (A) à 25 (Z). <strong>Chiffrer</strong>, c'est avancer de <code>d</code> rangs en revenant au début après Z ; <strong>déchiffrer</strong>, c'est reculer de <code>d</code> rangs.</p><ol><li>Avec d = 3, chiffrez la lettre B.</li><li>Avec d = 3, chiffrez la lettre Y (attention au retour au début de l'alphabet).</li><li>Avec d = 5, chiffrez la lettre K.</li><li>Un code promo est arrivé chiffré <code>NDG</code> avec d = 3 : donnez la première lettre du code en clair.</li><li>Un attaquant ne connaît pas d : combien de décalages différents doit-il essayer au maximum pour tout casser (alphabet de 26 lettres, décalage nul exclu) ?</li><li>La même clé sert à chiffrer et à déchiffrer : de quel type de chiffrement s'agit-il ? Répondez par un seul adjectif.</li></ol><p>Questions 1 à 4 : répondez par une seule lettre majuscule.</p>",
    "starter": "# Exercice — Les codes promo chiffrés à la César de la librairie Page 17\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : une seule lettre majuscule. Question 5 : un nombre.\n\n[Question 1 — Chiffrer B avec d = 3]\nA_COMPLETER\n\n[Question 2 — Chiffrer Y avec d = 3]\nA_COMPLETER\n\n[Question 3 — Chiffrer K avec d = 5]\nA_COMPLETER\n\n[Question 4 — Première lettre en clair de NDG]\nA_COMPLETER\n\n[Question 5 — Nombre de décalages à essayer]\nA_COMPLETER\n\n[Question 6 — Type de chiffrement (un adjectif)]\nA_COMPLETER\n",
    "hints": [
      "Numérotez l'alphabet : A vaut 0, B vaut 1, …, Z vaut 25. Chiffrer, c'est ajouter le décalage au rang ; déchiffrer, c'est le retrancher.",
      "Après Z (rang 25), on repart à A (rang 0) : si la somme dépasse 25, retirez 26 au résultat.",
      "Pour l'entropie, comptez les décalages utilisables de 1 à 25 ; pour la dernière question, rappelez-vous combien de clés distinctes ce chiffrement manipule."
    ],
    "examples": [
      {
        "stdin": "Le coffre du club d'échecs est protégé par un chiffre de César de clé d = 4.\n\n1) Chiffrer D : D a le rang 3 ; 3 + 4 = 7 ; le rang 7 est H.\n2) Chiffrer W : rang 22 ; 22 + 4 = 26 ; 26 − 26 = 0 ; le rang 0 est A.\n3) Déchiffrer la première lettre de « HANO » : H a le rang 7 ; 7 − 4 = 3 ; le rang 3 est D.\n4) La même clé sert aux deux sens : chiffrement symétrique.",
        "expected": "D donne H — W donne A — première lettre de HANO : D — chiffrement symétrique",
        "note": "Après Z (rang 25), on repart à A (rang 0) : le rang chiffré est (rang + d) moins 26 si le total dépasse 25."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Chiffrer B avec d = 3",
        "stdin": "q:1",
        "expected": "E"
      },
      {
        "label": "Question 2 — Chiffrer Y avec d = 3",
        "stdin": "q:2",
        "expected": "B"
      },
      {
        "label": "Question 3 — Chiffrer K avec d = 5",
        "stdin": "q:3",
        "expected": "P"
      },
      {
        "label": "Question 4 — Première lettre en clair de NDG",
        "stdin": "q:4",
        "expected": "K"
      },
      {
        "label": "Question 5 — Nombre de décalages à essayer",
        "stdin": "q:5",
        "expected": "25||vingt-cinq"
      },
      {
        "label": "Question 6 — Type de chiffrement (un adjectif)",
        "stdin": "q:6",
        "expected": "symetrique||chiffrement symetrique||le chiffrement symetrique"
      }
    ],
    "solution": "[Question 1 — Chiffrer B avec d = 3]\nE\n\n[Question 2 — Chiffrer Y avec d = 3]\nB\n\n[Question 3 — Chiffrer K avec d = 5]\nP\n\n[Question 4 — Première lettre en clair de NDG]\nK\n\n[Question 5 — Nombre de décalages à essayer]\n25\n\n[Question 6 — Type de chiffrement (un adjectif)]\nsymetrique",
    "takeaway": "1) B a le rang 1 ; 1 + 3 = 4 ; le rang 4 est E.\n2) Y a le rang 24 ; 24 + 3 = 27 ; 27 − 26 = 1 ; le rang 1 est B : le décalage boucle après Z.\n3) K a le rang 10 ; 10 + 5 = 15 ; le rang 15 est P.\n4) N a le rang 13 ; 13 − 3 = 10 ; le rang 10 est K : la première lettre du code en clair est K.\n5) Avec 26 lettres et un décalage nul exclu, l'attaquant n'a que 25 décalages à essayer : une recherche exhaustive est immédiate — voilà pourquoi la « protection » du stagiaire est nulle.\n6) Une seule et même clé sert à chiffrer et à déchiffrer : le chiffrement est symétrique (comme AES, mais sans sa robustesse).\nContrôle : chiffrer K avec d = 5 donne P, et déchiffrer P avec d = 5 redonne bien K — la même clé opère dans les deux sens."
  },
  {
    "id": "cy-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "L'entropie des mots de passe du service comptable de Bâtiplus",
    "exampleTitle": "Exemple résolu — les accès du trésorier du club d'aviron",
    "goal": "Compter des combinaisons de mots de passe et vérifier la validité d'une 2FA selon les catégories de facteurs.",
    "brief": "<p><strong>Énoncé.</strong> Bâtiplus, entreprise de matériaux de 22 salariés, audite les preuves d'identité du service comptable :</p><table><tr><th>Salarié</th><th>Première preuve</th><th>Deuxième preuve</th></tr><tr><td>Nadia, comptable</td><td>code PIN à 4 chiffres</td><td>aucune</td></tr><tr><td>Marc, gérant</td><td>mot de passe</td><td>empreinte digitale</td></tr><tr><td>Leïla, assistante</td><td>mot de passe</td><td>code PIN mémorisé</td></tr></table><p>Rappel du cours : les facteurs se classent en <strong>connaissance</strong> (ce que l'on sait), <strong>possession</strong> (ce que l'on possède), <strong>inhérence</strong> (ce que l'on est) ; la 2FA exige deux facteurs de catégories <em>différentes</em>.</p><ol><li>Combien de combinaisons un attaquant doit-il essayer au maximum pour casser le code PIN à 4 chiffres de Nadia ?</li><li>Un mot de passe formé de 3 lettres minuscules (sans chiffres ni majuscules) offre combien de combinaisons ?</li><li>Marc combine un mot de passe et une empreinte digitale : a-t-il une vraie 2FA ? Répondez par oui ou non.</li><li>Leïla combine un mot de passe et un code PIN : a-t-elle une vraie 2FA ? Répondez par oui ou non.</li><li>L'empreinte digitale est un facteur de quelle catégorie ? Répondez par un seul mot.</li><li>Le code de l'application d'authentification TOTP change toutes les combien de secondes ?</li></ol><p>Questions 1, 2 et 6 : répondez par un nombre.</p>",
    "starter": "# Exercice — L'entropie des mots de passe du service comptable de Bâtiplus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 6 : un nombre. Questions 3 et 4 : oui ou non.\n\n[Question 1 — Combinaisons du code PIN à 4 chiffres]\nA_COMPLETER\n\n[Question 2 — Combinaisons d'un mot de passe de 3 lettres minuscules]\nA_COMPLETER\n\n[Question 3 — Marc a-t-il une vraie 2FA (oui/non)]\nA_COMPLETER\n\n[Question 4 — Leïla a-t-elle une vraie 2FA (oui/non)]\nA_COMPLETER\n\n[Question 5 — Catégorie du facteur empreinte digitale]\nA_COMPLETER\n\n[Question 6 — Période du code TOTP en secondes]\nA_COMPLETER\n",
    "hints": [
      "Chaque position multiplie le nombre de combinaisons : un chiffre offre 10 valeurs possibles, une lettre minuscule 26.",
      "Pour un code de n positions, les combinaisons se comptent en « valeurs possibles puissance n » ; pour la 2FA, classez chaque preuve dans sa catégorie avant de conclure.",
      "Deux preuves de la même catégorie ne font pas une 2FA ; l'empreinte relève de ce que l'on est, et le code TOTP des applications tourne à intervalle fixe, très court."
    ],
    "examples": [
      {
        "stdin": "Le trésorier du club d'aviron vérifie ses accès :\n1) Sa carte d'accès au club est protégée par un code à 6 chiffres : 10 puissance 6 = 1 000 000 combinaisons.\n2) Un mot de passe de 2 lettres minuscules offre 26 × 26 = 676 combinaisons.\n3) Carte à puce (possession) + code PIN (connaissance) : deux catégories différentes, la 2FA est valide.",
        "expected": "code à 6 chiffres : 1 000 000 — mot de passe 2 lettres : 676 — 2FA valide",
        "note": "Deux secrets ne font pas une 2FA : il faut deux catégories différentes — savoir, avoir, être."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Combinaisons du code PIN à 4 chiffres",
        "stdin": "q:1",
        "expected": "10000||10 000||10000 combinaisons||10^4"
      },
      {
        "label": "Question 2 — Combinaisons d'un mot de passe de 3 lettres minuscules",
        "stdin": "q:2",
        "expected": "17576||17 576||26^3"
      },
      {
        "label": "Question 3 — Marc a-t-il une vraie 2FA (oui/non)",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Leïla a-t-elle une vraie 2FA (oui/non)",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Catégorie du facteur empreinte digitale",
        "stdin": "q:5",
        "expected": "inherence||l'inherence||l’inhérence"
      },
      {
        "label": "Question 6 — Période du code TOTP en secondes",
        "stdin": "q:6",
        "expected": "30||30 secondes"
      }
    ],
    "solution": "[Question 1 — Combinaisons du code PIN à 4 chiffres]\n10000\n\n[Question 2 — Combinaisons d'un mot de passe de 3 lettres minuscules]\n17576\n\n[Question 3 — Marc a-t-il une vraie 2FA (oui/non)]\noui\n\n[Question 4 — Leïla a-t-elle une vraie 2FA (oui/non)]\nnon\n\n[Question 5 — Catégorie du facteur empreinte digitale]\ninherence\n\n[Question 6 — Période du code TOTP en secondes]\n30",
    "takeaway": "1) Un code PIN à 4 chiffres : chaque position offre 10 valeurs, donc 10⁴ = 10 000 combinaisons.\n2) Trois lettres minuscules : chaque position offre 26 valeurs, donc 26³ = 26 × 26 × 26 = 17 576 combinaisons.\n3) Marc : mot de passe (connaissance) + empreinte digitale (inhérence) — deux catégories différentes : oui, c'est une vraie 2FA.\n4) Leïla : mot de passe (connaissance) + code PIN (connaissance) — deux preuves de la même catégorie : non, ce n'est pas une 2FA.\n5) L'empreinte digitale est ce que l'on est : un facteur d'inhérence.\n6) Le code TOTP (Time-based One-Time Password) change toutes les 30 secondes.\nContrôle : 17 576 se vérifie par étapes — 26² = 676, puis 676 × 26 = 17 576. Un code PIN à 4 chiffres (10 000 combinaisons) est plus faible qu'un mot de passe de 3 lettres (17 576), et les deux cèdent en quelques essais automatiques : d'où la 2FA."
  },
  {
    "id": "cy-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Les règles du pare-feu du lycée des Fontaines",
    "exampleTitle": "Exemple résolu — le pare-feu de la médiathèque",
    "goal": "Décider accepter ou refuser des flux à partir d'une table de règles de pare-feu et la règle par défaut.",
    "brief": "<p><strong>Énoncé.</strong> Le lycée des Fontaines sépare son réseau en zones : <em>réseau élèves</em>, <em>réseau professeurs</em>, <em>serveur d'administration</em> et <em>Internet</em>. Son pare-feu applique les règles suivantes, dans l'ordre : <strong>le premier flux dont les critères correspondent est décidé, les règles suivantes ne sont pas consultées</strong>.</p><table><tr><th>Règle</th><th>Source</th><th>Destination</th><th>Port</th><th>Décision</th></tr><tr><td>R1</td><td>réseau élèves</td><td>Internet</td><td>443 (HTTPS)</td><td>accepter</td></tr><tr><td>R2</td><td>réseau élèves</td><td>Internet</td><td>23 (Telnet)</td><td>refuser</td></tr><tr><td>R3</td><td>réseau professeurs</td><td>serveur d'administration</td><td>22 (SSH)</td><td>accepter</td></tr><tr><td>R4</td><td>réseau élèves</td><td>serveur d'administration</td><td>22 (SSH)</td><td>refuser</td></tr><tr><td>R5 (par défaut)</td><td>toute source</td><td>toute destination</td><td>tout port</td><td>refuser</td></tr></table><ol><li>Un élève consulte un site sécurisé (port 443) depuis le réseau élèves : quelle est la décision du pare-feu ?</li><li>Un élève tente une session Telnet (port 23) vers un serveur Internet : quelle est la décision ?</li><li>Une professeure ouvre une session SSH (port 22) vers le serveur d'administration : quelle est la décision ?</li><li>Un élève tente une session SSH (port 22) vers le serveur d'administration : quelle est la décision ?</li><li>Un élève envoie un flux vers le port 8080 d'un serveur de jeu externe : aucune règle R1 à R4 ne correspond, quelle est la décision ?</li><li>Telnet circule en clair et reste interdit : quel protocole sécurisé le cours donne-t-il pour l'administration distante à la place ?</li></ol><p>Questions 1 à 5 : répondez par accepter ou refuser. Question 6 : un seul mot.</p>",
    "starter": "# Exercice — Les règles du pare-feu du lycée des Fontaines\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : accepter ou refuser. Question 6 : un seul mot.\n\n[Question 1 — Élève vers un site en HTTPS (443)]\nA_COMPLETER\n\n[Question 2 — Élève vers Telnet (23)]\nA_COMPLETER\n\n[Question 3 — Professeure en SSH (22) vers le serveur d'administration]\nA_COMPLETER\n\n[Question 4 — Élève en SSH (22) vers le serveur d'administration]\nA_COMPLETER\n\n[Question 5 — Élève vers le port 8080 d'un serveur externe]\nA_COMPLETER\n\n[Question 6 — Protocole sécurisé pour l'administration distante]\nA_COMPLETER\n",
    "hints": [
      "Un pare-feu filtre les flux selon des règles (source, destination, port) : lisez le tableau ligne par ligne et cherchez la première règle qui correspond.",
      "Pour chaque flux, confrontez la zone de départ, la destination et le port aux règles R1 à R4 ; si aucune ne correspond, c'est la règle par défaut qui tranche.",
      "Pour la dernière question, rappelez-vous les protocoles sécurisés du cours : HTTPS pour le Web, et celui de l'administration distante qui remplace Telnet."
    ],
    "examples": [
      {
        "stdin": "Le pare-feu de la médiathèque applique trois règles :\nR1 : postes de consultation → catalogue en ligne, port 443 : accepter ;\nR2 : poste du personnel → serveur de gestion, port 22 : accepter ;\nR3 (par défaut) : tout le reste : refuser.\n\n1) Un usager consulte le catalogue (443) : accepter (R1).\n2) Un usager lance un flux vers le port 3306 : aucune règle ne correspond, la règle par défaut s'applique : refuser.\n3) Pour transférer des fichiers en sécurité, on remplace FTP par SFTP.",
        "expected": "catalogue (443) : accepter — port 3306 : refuser — FTP remplacé par SFTP",
        "note": "Le pare-feu applique la première règle qui correspond ; sans correspondance, la règle par défaut tranche — ici, elle refuse."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Élève vers un site en HTTPS (443)",
        "stdin": "q:1",
        "expected": "accepter||accepte||autoriser"
      },
      {
        "label": "Question 2 — Élève vers Telnet (23)",
        "stdin": "q:2",
        "expected": "refuser||refuse||rejeter||bloquer"
      },
      {
        "label": "Question 3 — Professeure en SSH (22) vers le serveur d'administration",
        "stdin": "q:3",
        "expected": "accepter||accepte||autoriser"
      },
      {
        "label": "Question 4 — Élève en SSH (22) vers le serveur d'administration",
        "stdin": "q:4",
        "expected": "refuser||refuse||rejeter||bloquer"
      },
      {
        "label": "Question 5 — Élève vers le port 8080 d'un serveur externe",
        "stdin": "q:5",
        "expected": "refuser||refuse||rejeter||bloquer"
      },
      {
        "label": "Question 6 — Protocole sécurisé pour l'administration distante",
        "stdin": "q:6",
        "expected": "ssh||le ssh||le protocole ssh"
      }
    ],
    "solution": "[Question 1 — Élève vers un site en HTTPS (443)]\naccepter\n\n[Question 2 — Élève vers Telnet (23)]\nrefuser\n\n[Question 3 — Professeure en SSH (22) vers le serveur d'administration]\naccepter\n\n[Question 4 — Élève en SSH (22) vers le serveur d'administration]\nrefuser\n\n[Question 5 — Élève vers le port 8080 d'un serveur externe]\nrefuser\n\n[Question 6 — Protocole sécurisé pour l'administration distante]\nssh",
    "takeaway": "1) Réseau élèves → Internet en 443 : la règle R1 correspond — accepter.\n2) Réseau élèves → Internet en 23 : la règle R2 correspond — refuser. Telnet circule en clair, la règle est volontaire.\n3) Réseau professeurs → serveur d'administration en 22 : la règle R3 correspond — accepter.\n4) Réseau élèves → serveur d'administration en 22 : la règle R4 correspond — refuser. La même destination, une autre zone : une autre décision.\n5) Port 8080 vers un serveur externe : aucune règle R1 à R4 ne correspond — c'est la règle par défaut R5 qui s'applique : refuser.\n6) Pour l'administration distante, le cours impose SSH, chiffré de bout en bout, à la place de Telnet qui circule en clair.\nContrôle : chaque flux est décidé par la PREMIÈRE règle correspondante ; la règle par défaut attrape tout le reste — c'est le sens de « frontière » du pare-feu."
  },
  {
    "id": "cy-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Les correctifs en retard au garage Relais 7",
    "exampleTitle": "Exemple résolu — le parc du cabinet d'architectes",
    "goal": "Statuer sur le retard de correctifs avec la grille du cours et connaître les failles célèbres.",
    "brief": "<p><strong>Énoncé.</strong> Le garage Relais 7 (18 machines) fait son premier bilan de <strong>gestion des correctifs</strong>. Le tableau indique, pour chaque équipement, l'ancienneté du dernier correctif de sécurité appliqué :</p><table><tr><th>Équipement</th><th>Dernier correctif de sécurité</th></tr><tr><td>Serveur de facturation</td><td>il y a 120 jours</td></tr><tr><td>Postes de l'atelier (8 machines)</td><td>il y a 46 jours</td></tr><tr><td>Borne de paiement</td><td>il y a 12 jours</td></tr></table><p>Grille du cours : <strong>jusqu'à 30 jours</strong> de retard, la machine est <code>conforme</code> ; <strong>de 31 à 90 jours</strong>, elle est <code>vulnérable</code> ; <strong>au-delà de 90 jours</strong>, la situation est <code>critique</code>.</p><ol><li>Quel est le statut du serveur de facturation ?</li><li>Quel est le statut des postes de l'atelier ?</li><li>Quel est le statut de la borne de paiement ?</li><li>WannaCry a frappé en mai 2017 des machines dépourvues du correctif publié en mars 2017 : combien de jours de retard ont suffi ?</li><li>EternalBlue, la faille exploitée par WannaCry, visait quel protocole de partage Windows ? Répondez par son sigle de trois lettres.</li><li>Le cycle professionnel de gestion des correctifs commence par une étape : laquelle ? Répondez par un seul mot.</li></ol><p>Questions 1 à 3 : répondez par conforme, vulnérable ou critique.</p>",
    "starter": "# Exercice — Les correctifs en retard au garage Relais 7\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : conforme, vulnérable ou critique. Question 4 : un nombre de jours.\n\n[Question 1 — Statut du serveur de facturation]\nA_COMPLETER\n\n[Question 2 — Statut des postes de l'atelier]\nA_COMPLETER\n\n[Question 3 — Statut de la borne de paiement]\nA_COMPLETER\n\n[Question 4 — Jours de retard qui ont suffi à WannaCry]\nA_COMPLETER\n\n[Question 5 — Protocole visé par EternalBlue]\nA_COMPLETER\n\n[Question 6 — Première étape du cycle de correctifs]\nA_COMPLETER\n",
    "hints": [
      "La grille du cours se lit en jours de retard : 30 ou moins, de 31 à 90, plus de 90 — trois zones, trois statuts.",
      "Comparez chaque retard du tableau aux bornes de la grille ; pour WannaCry, comptez les mois écoulés entre le correctif et l'attaque.",
      "Pour la faille de WannaCry, cherchez le sigle du protocole de partage de fichiers et d'imprimantes de Windows ; pour la dernière question, le cycle de correctifs commence par connaître ce que l'on doit corriger."
    ],
    "examples": [
      {
        "stdin": "Le cabinet d'architectes passe ses 9 postes au crible :\nserveur de plans : correctif vieux de 105 jours ;\npostes des associés : correctif vieux de 70 jours ;\nimprimante 3D : correctif vieux de 20 jours.\n\nGrille : jusqu'à 30 jours conforme ; de 31 à 90 jours vulnérable ; au-delà de 90 jours critique.\n1) Serveur de plans : 105 jours, au-delà de 90 : critique.\n2) Postes des associés : 70 jours, entre 31 et 90 : vulnérable.\n3) Imprimante 3D : 20 jours, 30 ou moins : conforme.",
        "expected": "serveur : critique — postes : vulnérable — imprimante : conforme",
        "note": "Au-delà de 90 jours sans correctif de sécurité, la situation est critique : c'est la grille du cours, et 60 jours ont suffi à WannaCry."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Statut du serveur de facturation",
        "stdin": "q:1",
        "expected": "critique||situation critique"
      },
      {
        "label": "Question 2 — Statut des postes de l'atelier",
        "stdin": "q:2",
        "expected": "vulnerable||vulnérable"
      },
      {
        "label": "Question 3 — Statut de la borne de paiement",
        "stdin": "q:3",
        "expected": "conforme||dans les temps"
      },
      {
        "label": "Question 4 — Jours de retard qui ont suffi à WannaCry",
        "stdin": "q:4",
        "expected": "60||60 jours"
      },
      {
        "label": "Question 5 — Protocole visé par EternalBlue",
        "stdin": "q:5",
        "expected": "smb||le smb||smb windows||windows"
      },
      {
        "label": "Question 6 — Première étape du cycle de correctifs",
        "stdin": "q:6",
        "expected": "inventaire||inventorier||l'inventaire||l’inventaire"
      }
    ],
    "solution": "[Question 1 — Statut du serveur de facturation]\ncritique\n\n[Question 2 — Statut des postes de l'atelier]\nvulnerable\n\n[Question 3 — Statut de la borne de paiement]\nconforme\n\n[Question 4 — Jours de retard qui ont suffi à WannaCry]\n60\n\n[Question 5 — Protocole visé par EternalBlue]\nsmb\n\n[Question 6 — Première étape du cycle de correctifs]\ninventaire",
    "takeaway": "1) Serveur de facturation : 120 jours de retard, au-delà de 90 — situation critique. Un correctif de sécurité ne suit pas le calendrier de maintenance, il le devance.\n2) Postes de l'atelier : 46 jours, entre 31 et 90 — vulnérables. Les attaques connues ciblent exactement ces machines.\n3) Borne de paiement : 12 jours, 30 ou moins — conforme.\n4) Correctif publié en mars 2017, attaque en mai 2017 : 2 mois, soit environ 60 jours de retard ont suffi à WannaCry pour frapper des hôpitaux entiers.\n5) EternalBlue visait SMB, le protocole de partage Windows (Heartbleed visait OpenSSL, Shellshock visait Bash).\n6) Le cycle professionnel commence par inventorier les produits : sans inventaire, on ne sait ni quoi suivre, ni quoi déployer — viennent ensuite suivre les bulletins, qualifier, tester, déployer par vagues, vérifier.\nContrôle : 120 &gt; 90, 31 ≤ 46 ≤ 90 et 12 ≤ 30 — chaque statut découle directement d'une borne de la grille."
  },
  {
    "id": "cy-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le formulaire piégé du site de l'école de musique",
    "exampleTitle": "Exemple résolu — l'inscription au club d'escalade",
    "goal": "Reconnaître une injection SQL et une XSS sur un formulaire, puis citer les parades du secure coding.",
    "brief": "<p><strong>Énoncé.</strong> L'école de musique municipale L'Allegro possède un site avec un <strong>formulaire de recherche d'élève</strong> et un <strong>livre d'or des concerts</strong>. Un test d'intrusion (pentest) y soumet deux saisies :</p><table><tr><th>Saisie testée</th><th>Champ visé</th><th>Effet observé</th></tr><tr><td><code>Robert');--</code></td><td>recherche d'élève</td><td>la requête renvoie la table complète des élèves</td></tr><tr><td><code>&lt;b&gt;Bravo&lt;/b&gt;</code></td><td>livre d'or</td><td>le mot apparaît en gras sur la page de tous les visiteurs</td></tr></table><ol><li>La saisie <code>Robert');--</code> est une attaque par ___ : complétez (deux mots).</li><li>La seconde saisie révèle une faille dont le sigle est trois lettres : lequel ?</li><li>La parade de référence contre cette première attaque : écrire des requêtes ___. Complétez.</li><li>Contre la seconde faille, on valide à l'entrée et on ___ les sorties à l'affichage. Complétez.</li><li>« Toute entrée est ___ tant qu'elle n'est pas validée » : complétez (un mot).</li><li>Quel référentiel tient la liste des risques applicatifs les plus courants ? Répondez par son sigle.</li></ol>",
    "starter": "# Exercice — Le formulaire piégé du site de l'école de musique\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par des réponses très courtes (un mot, un sigle ou deux mots).\n\n[Question 1 — Attaque visée par Robert');--]\nA_COMPLETER\n\n[Question 2 — Sigle de la seconde faille]\nA_COMPLETER\n\n[Question 3 — Type de requêtes à écrire]\nA_COMPLETER\n\n[Question 4 — Que fait-on des sorties à l'affichage]\nA_COMPLETER\n\n[Question 5 — Toute entrée est ___ tant qu'elle n'est pas validée]\nA_COMPLETER\n\n[Question 6 — Référentiel des risques applicatifs]\nA_COMPLETER\n",
    "hints": [
      "Deux attaques dominent le Web : l'injection SQL détourne la requête de base de données, la XSS fait exécuter du code dans le navigateur d'un autre visiteur.",
      "La saisie qui ferme la chaîne et commente la fin de la requête vise la base ; celle qui s'affiche en gras chez les visiteurs vise leur navigateur.",
      "Les parades sont symétriques : côté entrée (requêtes préparées, validation) et côté sortie (échappement des chevrons) ; le référentiel des risques applicatifs tient en cinq lettres."
    ],
    "examples": [
      {
        "stdin": "Le formulaire d'inscription du club d'escalade subit deux tests de pentest :\nsaisie `';--` : la requête renvoie toute la table des adhérents ;\nsaisie `<i>Test</i>` : le mot s'affiche en italique sur la page publique.\n\n1) La saisie qui dérègle la requête SQL : une injection SQL.\n2) Le code injecté qui s'exécute chez les visiteurs : une XSS.\n3) Parades : requêtes paramétrées à l'entrée, échappement des sorties à l'affichage.",
        "expected": "injection SQL — XSS — parades : requêtes paramétrées et échappement des sorties",
        "note": "Valider à l'entrée, échapper à la sortie : deux portes pour la même maison, jamais une seule."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Attaque visée par Robert');--",
        "stdin": "q:1",
        "expected": "injection sql||une injection sql||injection"
      },
      {
        "label": "Question 2 — Sigle de la seconde faille",
        "stdin": "q:2",
        "expected": "xss||une xss||cross-site scripting||cross site scripting"
      },
      {
        "label": "Question 3 — Type de requêtes à écrire",
        "stdin": "q:3",
        "expected": "parametrees||requetes parametrees||requete parametree||paramétrées"
      },
      {
        "label": "Question 4 — Que fait-on des sorties à l'affichage",
        "stdin": "q:4",
        "expected": "echapper||echappe||echappees||echapper les sorties"
      },
      {
        "label": "Question 5 — Toute entrée est ___ tant qu'elle n'est pas validée",
        "stdin": "q:5",
        "expected": "suspecte||douteuse"
      },
      {
        "label": "Question 6 — Référentiel des risques applicatifs",
        "stdin": "q:6",
        "expected": "owasp||l'owasp||l’owasp||le referentiel owasp"
      }
    ],
    "solution": "[Question 1 — Attaque visée par Robert');--]\ninjection sql\n\n[Question 2 — Sigle de la seconde faille]\nxss\n\n[Question 3 — Type de requêtes à écrire]\nparametrees\n\n[Question 4 — Que fait-on des sorties à l'affichage]\nechapper\n\n[Question 5 — Toute entrée est ___ tant qu'elle n'est pas validée]\nsuspecte\n\n[Question 6 — Référentiel des risques applicatifs]\nowasp",
    "takeaway": "1) La saisie « Robert');-- » ferme la chaîne de caractères et commente la fin de la requête construite par concaténation : c'est une injection SQL.\n2) Le code « Bravo » encadré de balises de gras s'exécute dans le navigateur des visiteurs : c'est une XSS (cross-site scripting).\n3) La parade : des requêtes paramétrées, où les données saisies ne se concatènent jamais au code SQL.\n4) Contre la XSS : échapper les sorties à l'affichage (les chevrons deviennent des entités), après avoir validé les entrées.\n5) Le principe du secure coding : toute entrée est suspecte tant qu'elle n'est pas validée.\n6) Le référentiel OWASP tient la liste des risques applicatifs les plus courants.\nContrôle : les deux parades du cours se lisent en miroir — valider à l'entrée (injection), échapper à la sortie (XSS) ; oublier une seule porte suffit à l'attaque."
  },
  {
    "id": "cy-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "L'inventaire des accès de la mairie de Villefroid",
    "exampleTitle": "Exemple résolu — les accès de la scierie du Pont-Neuf",
    "goal": "Rattacher des décisions d'accès observées aux cinq modèles de contrôle d'accès (DAC, MAC, RBAC, ABAC, ACL).",
    "brief": "<p><strong>Énoncé.</strong> La mairie de Villefroid audite le serveur de fichiers du service urbanisme. L'auditeur relève l'inventaire suivant :</p><table><tr><th>Ligne</th><th>Décision observée</th></tr><tr><td>1</td><td>Chaque agent attribue lui-même les droits sur ses propres dossiers</td></tr><tr><td>2</td><td>SELinux impose des étiquettes obligatoires aux dossiers des permis sensibles</td></tr><tr><td>3</td><td>Le rôle « instructeur de permis » porte toujours exactement les mêmes droits</td></tr><tr><td>4</td><td>Le dossier des marchés publics n'est accessible que depuis le réseau interne, de 8 h à 18 h</td></tr><tr><td>5</td><td>Les partages Windows listent, utilisateur par utilisateur, qui peut ouvrir chaque dossier</td></tr></table><p>Les cinq modèles du cours : <strong>DAC</strong> (le propriétaire décide), <strong>MAC</strong> (une politique centrale imposée), <strong>RBAC</strong> (le rôle porte les droits), <strong>ABAC</strong> (des attributs dynamiques : heure, lieu, appareil), <strong>ACL</strong> (une liste explicite d'entrées, comme NTFS).</p><ol><li>La ligne 1 illustre quel modèle ? Répondez par le sigle.</li><li>La ligne 2 (politique imposée par le système) illustre quel modèle ?</li><li>La ligne 3 (les droits portés par le rôle) illustre quel modèle ?</li><li>La ligne 4 (critères dynamiques : heure, réseau) illustre quel modèle ?</li><li>La ligne 5 (liste explicite d'entrées, comme NTFS) illustre quel modèle ?</li><li>Quel principe exige de ne donner à chaque compte que les accès strictement nécessaires à sa mission ? Répondez par deux mots.</li></ol>",
    "starter": "# Exercice — L'inventaire des accès de la mairie de Villefroid\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : un sigle (DAC, MAC, RBAC, ABAC ou ACL). Question 6 : deux mots.\n\n[Question 1 — Modèle de la ligne 1]\nA_COMPLETER\n\n[Question 2 — Modèle de la ligne 2]\nA_COMPLETER\n\n[Question 3 — Modèle de la ligne 3]\nA_COMPLETER\n\n[Question 4 — Modèle de la ligne 4]\nA_COMPLETER\n\n[Question 5 — Modèle de la ligne 5]\nA_COMPLETER\n\n[Question 6 — Principe des accès strictement nécessaires]\nA_COMPLETER\n",
    "hints": [
      "Cinq modèles, cinq mots-clés : propriétaire (DAC), politique imposée (MAC), rôle (RBAC), attribut dynamique (ABAC), liste explicite (ACL).",
      "Pour chaque ligne, demandez-vous QUI décide ou QUOI tranche : le propriétaire du dossier, le système, le rôle attribué, des critères comme l'heure, ou une liste d'entrées.",
      "Pour la dernière question, cherchez le principe directeur de l'IAM du cours : chacun ne reçoit que le strict nécessaire, jamais de droits « au cas où »."
    ],
    "examples": [
      {
        "stdin": "La scierie du Pont-Neuf inventorie ses accès :\n1) Le patron attribue lui-même les droits sur la machine à commande numérique : le propriétaire décide, c'est du DAC.\n2) Le rôle « conducteur de ligne » porte toujours les mêmes droits : c'est du RBAC.\n3) Chaque compte ne garde que les accès strictement nécessaires : le principe du moindre privilège.",
        "expected": "DAC — RBAC — moindre privilège",
        "note": "Propriétaire, politique, rôle, attribut, liste : cinq mots-clés pour les cinq modèles de contrôle d'accès."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Modèle de la ligne 1",
        "stdin": "q:1",
        "expected": "dac||le dac"
      },
      {
        "label": "Question 2 — Modèle de la ligne 2",
        "stdin": "q:2",
        "expected": "mac||le mac"
      },
      {
        "label": "Question 3 — Modèle de la ligne 3",
        "stdin": "q:3",
        "expected": "rbac||le rbac"
      },
      {
        "label": "Question 4 — Modèle de la ligne 4",
        "stdin": "q:4",
        "expected": "abac||l'abac||l’abac"
      },
      {
        "label": "Question 5 — Modèle de la ligne 5",
        "stdin": "q:5",
        "expected": "acl||l'acl||l’acl"
      },
      {
        "label": "Question 6 — Principe des accès strictement nécessaires",
        "stdin": "q:6",
        "expected": "moindre privilege||le moindre privilege||principe du moindre privilege||polp"
      }
    ],
    "solution": "[Question 1 — Modèle de la ligne 1]\ndac\n\n[Question 2 — Modèle de la ligne 2]\nmac\n\n[Question 3 — Modèle de la ligne 3]\nrbac\n\n[Question 4 — Modèle de la ligne 4]\nabac\n\n[Question 5 — Modèle de la ligne 5]\nacl\n\n[Question 6 — Principe des accès strictement nécessaires]\nmoindre privilege",
    "takeaway": "1) Ligne 1 : chaque agent décide des accès à ses dossiers — le propriétaire de la ressource décide : DAC (contrôle discrétionnaire, comme les permissions POSIX).\n2) Ligne 2 : SELinux impose une politique centrale que personne ne contourne : MAC (contrôle obligatoire).\n3) Ligne 3 : les droits voyagent avec le rôle « instructeur de permis » : RBAC (contrôle par rôles).\n4) Ligne 4 : l'accès dépend de critères dynamiques — l'heure (8 h à 18 h) et le réseau : ABAC (contrôle par attributs).\n5) Ligne 5 : une liste explicite d'entrées, utilisateur par utilisateur, comme NTFS : ACL.\n6) Chaque compte ne reçoit que les accès strictement nécessaires à sa mission : le principe du moindre privilège (PoLP) — l'attaquant qui compromet un compte entre dans une pièce, pas dans le bâtiment.\nContrôle : les cinq lignes couvrent les cinq modèles — aucune ne sert deux fois, chaque mot-clé (propriétaire, politique, rôle, attribut, liste) apparaît une seule fois."
  },
  {
    "id": "cy-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Le journal de la nuit chez Transport Lemoine",
    "exampleTitle": "Exemple résolu — la nuit de l'hôtel Beauregard",
    "goal": "Détecter une force brute dans un journal d'authentification et choisir le bon premier geste.",
    "brief": "<p><strong>Énoncé.</strong> Transport Lemoine (60 chauffeurs) consulte le <strong>journal d'authentification</strong> de son serveur de gestion des tournées. Voici les lignes de la nuit du 3 au 4 :</p><table><tr><th>Heure</th><th>Événement</th><th>Adresse source</th></tr><tr><td>02:14:03</td><td>échec de connexion</td><td>45.61.10.9</td></tr><tr><td>02:14:07</td><td>échec de connexion</td><td>45.61.10.9</td></tr><tr><td>02:14:12</td><td>échec de connexion</td><td>45.61.10.9</td></tr><tr><td>02:14:15</td><td>connexion réussie</td><td>45.61.10.9</td></tr><tr><td>02:20:00</td><td>échec de connexion</td><td>192.168.1.24</td></tr></table><p>Le seuil d'alerte du cours est de <strong>3 échecs ou plus pour une même IP</strong> ; 192.168.1.24 est le poste interne du dispatcheur.</p><ol><li>Combien d'échecs de connexion l'adresse 45.61.10.9 a-t-elle accumulés avant de réussir ?</li><li>Quelle attaque la séquence « échecs en rafale puis un succès » révèle-t-elle ? Répondez par deux mots.</li><li>L'adresse 192.168.1.24 (un poste interne, un seul échec) doit-elle déclencher une réponse à incident ? Répondez par oui ou non.</li><li>Après confirmation de la compromission, faut-il éteindre la machine ou l'isoler du réseau ? Répondez par un seul mot.</li><li>Qu'est-ce que la coupure électrique effacerait, détruisant ainsi une preuve ? Répondez par deux mots.</li></ol>",
    "starter": "# Exercice — Le journal de la nuit chez Transport Lemoine\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : un nombre. Questions 3 : oui ou non. Questions 2 et 5 : deux mots.\n\n[Question 1 — Échecs accumulés par 45.61.10.9]\nA_COMPLETER\n\n[Question 2 — Attaque révélée par la séquence]\nA_COMPLETER\n\n[Question 3 — Faut-il répondre au seul échec de 192.168.1.24 (oui/non)]\nA_COMPLETER\n\n[Question 4 — Éteindre ou isoler]\nA_COMPLETER\n\n[Question 5 — Ce que la coupure effacerait]\nA_COMPLETER\n",
    "hints": [
      "Un journal se lit ligne par ligne : résultat (échec ou succès), horodatage, source — puis on corrèle les lignes voisines d'une même adresse.",
      "Comptez les échecs de l'adresse externe et regardez ce qui les suit : la rafale d'échecs n'est pas l'incident, c'est le succès qui la suit qu'il faut qualifier.",
      "Pour la réponse, la règle du cours est de stopper la propagation sans détruire les preuves — et la mémoire vive n'aime pas les coupures."
    ],
    "examples": [
      {
        "stdin": "Hôtel Beauregard, journal de la nuit :\n23:01:10 échec — 88.12.44.9\n23:01:14 échec — 88.12.44.9\n23:01:19 échec — 88.12.44.9\n23:01:22 échec — 88.12.44.9\n23:01:25 échec — 88.12.44.9\n23:01:31 succès — 88.12.44.9\n23:15:00 échec — 192.168.0.10 (poste interne)\n\n1) Cinq échecs puis un succès depuis la même IP : force brute aboutie.\n2) Le poste interne 192.168.0.10 avec un seul échec : rien à déclarer.\n3) Le poste compromis est isolé du réseau, sans être éteint.",
        "expected": "force brute — poste interne : rien à déclarer — isoler sans éteindre",
        "note": "La rafale d'échecs n'est pas l'incident ; le succès qui suit l'est peut-être. Et on isole sans éteindre : la mémoire vive est une preuve."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Échecs accumulés par 45.61.10.9",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Attaque révélée par la séquence",
        "stdin": "q:2",
        "expected": "force brute||une force brute||brute force"
      },
      {
        "label": "Question 3 — Faut-il répondre au seul échec de 192.168.1.24 (oui/non)",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Éteindre ou isoler",
        "stdin": "q:4",
        "expected": "isoler||l'isoler||l’isoler||isoler du reseau"
      },
      {
        "label": "Question 5 — Ce que la coupure effacerait",
        "stdin": "q:5",
        "expected": "memoire vive||la memoire vive||ram||la ram"
      }
    ],
    "solution": "[Question 1 — Échecs accumulés par 45.61.10.9]\n3\n\n[Question 2 — Attaque révélée par la séquence]\nforce brute\n\n[Question 3 — Faut-il répondre au seul échec de 192.168.1.24 (oui/non)]\nnon\n\n[Question 4 — Éteindre ou isoler]\nisoler\n\n[Question 5 — Ce que la coupure effacerait]\nmemoire vive",
    "takeaway": "1) L'adresse 45.61.10.9 cumule 3 échecs de connexion (02:14:03, 02:14:07, 02:14:12) avant son succès à 02:14:15.\n2) Des échecs en rafale depuis une même adresse, suivis d'un succès : la signature d'une force brute — probablement aboutie.\n3) Non : un seul échec depuis un poste interne connu, sous le seuil d'alerte du cours (3 échecs pour une même IP) — on surveille, on ne déclenche pas une réponse à incident.\n4) On isole la machine du réseau : stopper la propagation sans détruire les preuves.\n5) La coupure électrique effacerait la mémoire vive — une preuve forensique ; c'est pourquoi on isole au lieu d'éteindre.\nContrôle : le seuil du cours (3 échecs même IP) est exactement atteint à 02:14:12 ; l'alerte se déclenche avant même le succès de 02:14:15."
  },
  {
    "id": "cy-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le SIEM sonne à trois heures du matin",
    "exampleTitle": "Exemple résolu — la panne de l'hebdomadaire Le Val libre",
    "goal": "Ordonner les étapes de la réponse à incident (ICER) sur un cas concret et citer les acteurs de la détection.",
    "brief": "<p><strong>Énoncé.</strong> La boutique en ligne Sablon vend des cosmétiques. À 3 h 02, son <strong>SIEM</strong> alerte : 300 échecs de connexion depuis une même adresse IP, puis un succès, puis la création d'un compte administrateur inconnu. L'équipe de garde applique la méthode du cours :</p><ol><li>Quelle est la première étape de la réponse à incident ? Répondez par un seul mot.</li><li>L'équipe coupe le poste compromis du réseau, sans l'éteindre : de quelle étape s'agit-il ?</li><li>Le re-imageage du poste et la réinitialisation de tous les identifiants volés : de quelle étape s'agit-il ?</li><li>La restauration depuis une sauvegarde saine, puis la remise en service sous surveillance renforcée : de quelle étape s'agit-il ?</li><li>Quel type d'outil a agrégé les journaux, les a normalisés et les a corrélés pour détecter l'attaque ? Répondez par son sigle de quatre lettres.</li><li>La forensique exige des images disque, des journaux horodatés et une chaîne de ___ : complétez (un mot).</li></ol>",
    "starter": "# Exercice — Le SIEM sonne à trois heures du matin\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : un seul mot (une étape). Questions 5 et 6 : un sigle ou un mot.\n\n[Question 1 — Première étape de la réponse]\nA_COMPLETER\n\n[Question 2 — Étape : couper le poste du réseau]\nA_COMPLETER\n\n[Question 3 — Étape : réinstaller et réinitialiser]\nA_COMPLETER\n\n[Question 4 — Étape : restaurer et remettre en service]\nA_COMPLETER\n\n[Question 5 — Sigle de l'outil qui corrèle les journaux]\nA_COMPLETER\n\n[Question 6 — Chaîne de ___ (forensique)]\nA_COMPLETER\n",
    "hints": [
      "La réponse à incident suit un ordre qui ne se discute pas : identifier, contenir, éradiquer, rétablir — ICER.",
      "Pour chaque action de l'équipe, demandez-vous si elle confirme l'incident, stoppe la propagation, supprime la cause, ou remet le service en production.",
      "L'outil qui collecte, normalise et corrèle les journaux porte un sigle de quatre lettres ; la forensique, elle, exige que chaque preuve soit documentée du prélèvement au tribunal."
    ],
    "examples": [
      {
        "stdin": "L'hebdomadaire Le Val libre subit un vol d'identifiants :\n1) L'équipe confirme le vol et son étendue : étape identifier.\n2) Le poste compromis est coupé du réseau : étape contenir.\n3) Le poste est réinstallé, les identifiants réinitialisés : étape éradiquer.\n4) Le service repart sous surveillance renforcée : étape rétablir.",
        "expected": "identifier — contenir — éradiquer — rétablir",
        "note": "ICER dans cet ordre, toujours : contenir avant d'éradiquer, éradiquer avant de rétablir."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Première étape de la réponse",
        "stdin": "q:1",
        "expected": "identifier"
      },
      {
        "label": "Question 2 — Étape : couper le poste du réseau",
        "stdin": "q:2",
        "expected": "contenir"
      },
      {
        "label": "Question 3 — Étape : réinstaller et réinitialiser",
        "stdin": "q:3",
        "expected": "eradiquer"
      },
      {
        "label": "Question 4 — Étape : restaurer et remettre en service",
        "stdin": "q:4",
        "expected": "retablir"
      },
      {
        "label": "Question 5 — Sigle de l'outil qui corrèle les journaux",
        "stdin": "q:5",
        "expected": "siem||le siem||un siem"
      },
      {
        "label": "Question 6 — Chaîne de ___ (forensique)",
        "stdin": "q:6",
        "expected": "conservation||la conservation||de conservation"
      }
    ],
    "solution": "[Question 1 — Première étape de la réponse]\nidentifier\n\n[Question 2 — Étape : couper le poste du réseau]\ncontenir\n\n[Question 3 — Étape : réinstaller et réinitialiser]\neradiquer\n\n[Question 4 — Étape : restaurer et remettre en service]\nretablir\n\n[Question 5 — Sigle de l'outil qui corrèle les journaux]\nsiem\n\n[Question 6 — Chaîne de ___ (forensique)]\nconservation",
    "takeaway": "1) On confirme d'abord l'incident, son étendue et sa chronologie : identifier.\n2) Couper le poste du réseau sans l'éteindre, pour stopper la propagation en préservant les preuves : contenir.\n3) Re-imageage du poste, réinitialisation des identifiants, suppression des comptes pirates : éradiquer (supprimer la cause).\n4) Restauration depuis une sauvegarde saine puis surveillance renforcée : rétablir.\n5) L'outil qui agrège les sources, normalise et corrèle les événements en temps réel : le SIEM (Security Information and Event Management) — c'est la corrélation « échecs en rafale + création d'un compte » qui a réveillé l'équipe.\n6) La forensique exige une chaîne de conservation : images disque, journaux horodatés, traçabilité de chaque preuve.\nContrôle : l'ordre ICER est strict — contenir avant d'éradiquer (sinon la propagation continue), éradiquer avant de rétablir (sinon on remet un système infecté en production)."
  },
  {
    "id": "cy-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le plan de reprise de la chocolaterie Aubry",
    "exampleTitle": "Exemple résolu — la haute saison du camping Les Pins",
    "goal": "Distinguer PCA et PRA, relier RTO et RPO à la fréquence des sauvegardes et calculer une perte réelle.",
    "brief": "<p><strong>Énoncé.</strong> La chocolaterie Aubry réalise le tiers de son chiffre d'affaires en décembre, sur son site de vente en ligne. Sa direction de la sécurité documente la reprise :</p><ul><li>le service client estime que <strong>4 heures</strong> d'arrêt maximum sont supportables en pleine saison ;</li><li>les sauvegardes de la base de commandes sont <strong>automatiques, toutes les 2 heures</strong> ;</li><li>le 14 décembre à <strong>14 h 45</strong>, une panne bloque toute prise de commande ; l'équipe restaure la dernière sauvegarde exploitable, celle de <strong>14 h 00</strong>.</li></ul><ol><li>Comment s'appelle le plan qui décrit comment l'activité essentielle continue pendant la crise ? Répondez par son sigle.</li><li>Comment s'appelle le plan qui décrit comment les systèmes reviennent à la normale ? Répondez par son sigle.</li><li>La durée d'interruption maximale tolérée — 4 heures ici — porte quel sigle ?</li><li>La quantité de données que l'on peut se permettre de perdre porte quel sigle ?</li><li>Avec des sauvegardes toutes les 2 heures, quelle est la perte maximale de données possible, en heures ?</li><li>Combien de minutes de commandes la panne du 14 décembre a-t-elle fait perdre ?</li></ol>",
    "starter": "# Exercice — Le plan de reprise de la chocolaterie Aubry\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : un sigle (PCA, PRA, RTO ou RPO). Questions 5 et 6 : un nombre.\n\n[Question 1 — Plan de continuité pendant la crise]\nA_COMPLETER\n\n[Question 2 — Plan de retour à la normale]\nA_COMPLETER\n\n[Question 3 — Sigle de la durée d'arrêt maximale]\nA_COMPLETER\n\n[Question 4 — Sigle de la perte de données maximale]\nA_COMPLETER\n\n[Question 5 — Perte maximale possible en heures]\nA_COMPLETER\n\n[Question 6 — Minutes de commandes perdues le 14 décembre]\nA_COMPLETER\n",
    "hints": [
      "Deux sigles gouvernent la reprise : le temps d'arrêt maximal d'un côté, la perte de données maximale de l'autre ; deux plans : continuité pendant la crise, reprise après.",
      "Reliez la fréquence des sauvegardes à la perte maximale possible, puis soustrayez l'heure de la sauvegarde restaurée de l'heure de la panne.",
      "Le PCA fait tourner l'essentiel pendant la crise, le PRA rétablit ensuite ; ne les inversez pas, et rappelez-vous qu'un plan non testé vaut zéro."
    ],
    "examples": [
      {
        "stdin": "Le camping Les Pins sauvegarde sa base de réservations toutes les 4 heures.\nEn haute saison, 6 heures d'arrêt maximum sont supportables.\nUne panne tombe à 10 h 20 ; l'équipe restaure la sauvegarde de 8 h 00.\n\n1) Six heures d'arrêt maximum : c'est le RTO.\n2) Avec des sauvegardes toutes les 4 heures, la perte maximale est de 4 heures : c'est le RPO.\n3) 10 h 20 − 8 h 00 = 2 h 20, soit 140 minutes de réservations perdues.",
        "expected": "RTO : 6 heures — RPO : 4 heures — 140 minutes perdues",
        "note": "Le RPO fixe la fréquence des sauvegardes, le RTO fixe l'architecture de reprise : le PRA aligne toujours les deux."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Plan de continuité pendant la crise",
        "stdin": "q:1",
        "expected": "pca||le pca"
      },
      {
        "label": "Question 2 — Plan de retour à la normale",
        "stdin": "q:2",
        "expected": "pra||le pra"
      },
      {
        "label": "Question 3 — Sigle de la durée d'arrêt maximale",
        "stdin": "q:3",
        "expected": "rto||le rto"
      },
      {
        "label": "Question 4 — Sigle de la perte de données maximale",
        "stdin": "q:4",
        "expected": "rpo||le rpo"
      },
      {
        "label": "Question 5 — Perte maximale possible en heures",
        "stdin": "q:5",
        "expected": "2||2 heures||deux"
      },
      {
        "label": "Question 6 — Minutes de commandes perdues le 14 décembre",
        "stdin": "q:6",
        "expected": "45||45 minutes"
      }
    ],
    "solution": "[Question 1 — Plan de continuité pendant la crise]\npca\n\n[Question 2 — Plan de retour à la normale]\npra\n\n[Question 3 — Sigle de la durée d'arrêt maximale]\nrto\n\n[Question 4 — Sigle de la perte de données maximale]\nrpo\n\n[Question 5 — Perte maximale possible en heures]\n2\n\n[Question 6 — Minutes de commandes perdues le 14 décembre]\n45",
    "takeaway": "1) Le plan qui décrit comment l'activité essentielle continue pendant la crise : le PCA (plan de continuité d'activité).\n2) Le plan qui décrit comment les systèmes reviennent à la normale : le PRA (plan de reprise d'activité).\n3) La durée d'interruption maximale tolérée — 4 heures pour la chocolaterie — est le RTO (Recovery Time Objective).\n4) La quantité de données que l'on peut se permettre de perdre est le RPO (Recovery Point Objective).\n5) Avec des sauvegardes toutes les 2 heures, la perte maximale possible est de 2 heures : le RPO vaut 2 heures.\n6) Panne à 14 h 45, sauvegarde restaurée de 14 h 00 : 14 h 45 − 14 h 00 = 45 minutes de commandes perdues.\nContrôle : la perte réelle (45 minutes) reste inférieure à la perte maximale (2 heures) — la stratégie de sauvegarde est cohérente avec le RPO ; et le temps de restauration doit rester sous le RTO de 4 heures."
  },
  {
    "id": "cy-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Le plafond d'amende RGPD de la marketplace Artizan",
    "exampleTitle": "Exemple résolu — la marketplace de l'atelier de céramique",
    "goal": "Calculer un plafond d'amende RGPD (20 millions d'euros ou 4 % du CA mondial) et citer les principes du règlement.",
    "brief": "<p><strong>Énoncé.</strong> Artizan est une marketplace qui revend les créations d'artisans. La CNIL ouvre une enquête pour défaut de conformité RGPD. Rappel du cours : la sanction maximale est le <strong>plus élevé</strong> des deux montants entre <strong>20 millions d'euros</strong> et <strong>4 % du chiffre d'affaires annuel mondial</strong>.</p><ol><li>Artizan réalise un chiffre d'affaires annuel mondial de 300 millions d'euros : quel est son plafond d'amende encouru, en millions d'euros ?</li><li>Sa maison mère réalise un chiffre d'affaires annuel mondial de 1,2 milliard d'euros : quel est son plafond, en millions d'euros ?</li><li>Depuis quelle année le RGPD est-il en vigueur ?</li><li>Combien de principes gouvernent le traitement des données selon le cours ?</li><li>Quel principe exige de ne collecter que les données strictement nécessaires ? Répondez par un seul mot.</li><li>Quelle norme sectorielle impose 12 exigences pour protéger les données de cartes bancaires ? Répondez par son sigle.</li></ol><p>Questions 1 et 2 : un nombre de millions d'euros.</p>",
    "starter": "# Exercice — Le plafond d'amende RGPD de la marketplace Artizan\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : un nombre (en millions d'euros). Question 3 : une année.\n\n[Question 1 — Plafond pour un CA mondial de 300 millions]\nA_COMPLETER\n\n[Question 2 — Plafond pour un CA mondial de 1,2 milliard]\nA_COMPLETER\n\n[Question 3 — Année d'entrée en vigueur du RGPD]\nA_COMPLETER\n\n[Question 4 — Nombre de principes du traitement]\nA_COMPLETER\n\n[Question 5 — Principe de collecte minimale]\nA_COMPLETER\n\n[Question 6 — Norme sectorielle des paiements par carte]\nA_COMPLETER\n",
    "hints": [
      "Le plafond RGPD est le plus élevé des deux montants : 20 millions d'euros ou 4 % du chiffre d'affaires annuel mondial — calculez, puis comparez.",
      "Pour chaque entreprise, calculez d'abord 4 % du chiffre d'affaires, puis retenez le plus grand des deux montants.",
      "Pour le reste : le règlement est entré en vigueur en mai d'une année récente ; comptez les principes du cours ; la norme des paiements par carte se dit en cinq lettres et un sigle."
    ],
    "examples": [
      {
        "stdin": "La marketplace de l'atelier de céramique réalise un chiffre d'affaires annuel mondial de 800 millions d'euros.\n1) 4 % de 800 millions = 32 millions.\n2) 32 millions > 20 millions : le plafond d'amende RGPD est de 32 millions d'euros.",
        "expected": "4 % = 32 millions — plafond : 32 millions",
        "note": "Le plafond est le plus élevé des deux montants : toujours comparer 20 millions et 4 % du chiffre d'affaires mondial avant de conclure."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Plafond pour un CA mondial de 300 millions",
        "stdin": "q:1",
        "expected": "20||20 millions||20 m€||20 millions d'euros"
      },
      {
        "label": "Question 2 — Plafond pour un CA mondial de 1,2 milliard",
        "stdin": "q:2",
        "expected": "48||48 millions||48 m€||48 millions d'euros"
      },
      {
        "label": "Question 3 — Année d'entrée en vigueur du RGPD",
        "stdin": "q:3",
        "expected": "2018"
      },
      {
        "label": "Question 4 — Nombre de principes du traitement",
        "stdin": "q:4",
        "expected": "6||six"
      },
      {
        "label": "Question 5 — Principe de collecte minimale",
        "stdin": "q:5",
        "expected": "minimisation||la minimisation||minimisation des donnees"
      },
      {
        "label": "Question 6 — Norme sectorielle des paiements par carte",
        "stdin": "q:6",
        "expected": "pci dss||pcidss||pci-dss||le pci dss"
      }
    ],
    "solution": "[Question 1 — Plafond pour un CA mondial de 300 millions]\n20\n\n[Question 2 — Plafond pour un CA mondial de 1,2 milliard]\n48\n\n[Question 3 — Année d'entrée en vigueur du RGPD]\n2018\n\n[Question 4 — Nombre de principes du traitement]\n6\n\n[Question 5 — Principe de collecte minimale]\nminimisation\n\n[Question 6 — Norme sectorielle des paiements par carte]\npci dss",
    "takeaway": "1) Artizan : 4 % de 300 millions = 12 millions d'euros. Comme 12 &lt; 20, le plafond est le plus élevé des deux : 20 millions d'euros.\n2) Maison mère : 4 % de 1 200 millions = 48 millions d'euros. Comme 48 &gt; 20, le plafond est 48 millions d'euros.\n3) Le RGPD, adopté en 2016, est en vigueur depuis le 25 mai 2018.\n4) Six principes gouvernent le traitement : légalité/loyauté/transparence, limitation des finalités, minimisation, exactitude, limitation de la conservation, intégrité et confidentialité.\n5) Ne collecter que les données strictement nécessaires : c'est la minimisation des données.\n6) Les données de cartes bancaires relèvent de PCI DSS (12 exigences de l'industrie des paiements).\nContrôle : dans les deux cas, on compare 4 % du CA à 20 millions et l'on retient le maximum — 12 &lt; 20 donne 20 ; 48 &gt; 20 donne 48."
  },
  {
    "id": "cy-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit de conformité de la mairie de Beauvoir-sur-Marne",
    "exampleTitle": "Exemple résolu — l'audit de la clinique du Beffroi",
    "goal": "Rattacher chaque exigence d'un audit au référentiel qui l'impose (RGPD, NIS2, PCI DSS, ISO 27001, HIPAA).",
    "brief": "<p><strong>Énoncé.</strong> L'adjoint au maire de Beauvoir-sur-Marne prépare l'audit annuel de conformité. Le tableau liste les demandes de l'auditeur et le domaine visé :</p><table><tr><th>Demande de l'auditeur</th><th>Domaine visé</th></tr><tr><td>« Présentez le registre des traitements des données des administrés. »</td><td>données personnelles (UE)</td></tr><tr><td>« La mairie est un opérateur essentiel : prouvez votre niveau de sécurité. »</td><td>directive européenne de 2022</td></tr><tr><td>« Les paiements par carte au service des sports respecteront les 12 exigences. »</td><td>industrie des paiements</td></tr><tr><td>« Le système de management de la sécurité de l'information doit être certifié. »</td><td>certification du SMSI</td></tr><tr><td>« Le centre de santé scolaire applique la norme santé américaine. »</td><td>santé (États-Unis)</td></tr></table><ol><li>Les données personnelles des administrés relèvent de quel référentiel ? Répondez par son sigle.</li><li>La directive européenne de 2022 pour les infrastructures et opérateurs essentiels porte quel nom ?</li><li>La norme de l'industrie des paiements s'appelle comment ?</li><li>La certification du SMSI relève de quelle norme internationale ?</li><li>La norme santé américaine s'appelle comment ?</li><li>NIS2 a renforcé la responsabilité de qui, nommément ? Répondez par un seul mot.</li></ol><p>Questions 1 à 5 : répondez par le sigle ou le nom du référentiel.</p>",
    "starter": "# Exercice — L'audit de conformité de la mairie de Beauvoir-sur-Marne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : un sigle ou un nom de référentiel. Question 6 : un seul mot.\n\n[Question 1 — Référentiel des données personnelles]\nA_COMPLETER\n\n[Question 2 — Directive européenne de 2022]\nA_COMPLETER\n\n[Question 3 — Norme de l'industrie des paiements]\nA_COMPLETER\n\n[Question 4 — Norme qui certifie le SMSI]\nA_COMPLETER\n\n[Question 5 — Norme santé américaine]\nA_COMPLETER\n\n[Question 6 — NIS2 responsabilise qui]\nA_COMPLETER\n",
    "hints": [
      "Chaque référentiel a son domaine : données personnelles, infrastructures essentielles, paiements par carte, management de la sécurité, santé.",
      "Pour chaque demande de l'auditeur, identifiez CE QUI est protégé avant de nommer le référentiel correspondant.",
      "Pour la dernière question, la directive de 2022 a élargi les secteurs et surtout mis une catégorie de personnes en première ligne : celles qui dirigent."
    ],
    "examples": [
      {
        "stdin": "La clinique du Beffroi prépare son audit :\n1) Les dossiers des patients européens : le RGPD.\n2) Les paiements par carte à la cafétéria : PCI DSS.\n3) Les antennes américaines de la clinique suivent la norme santé américaine : HIPAA.",
        "expected": "dossiers patients : RGPD — paiements carte : PCI DSS — santé américaine : HIPAA",
        "note": "À chaque secteur son référentiel : données personnelles, paiements, santé — et l'ISO 27001 pour certifier le SMSI."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Référentiel des données personnelles",
        "stdin": "q:1",
        "expected": "rgpd||le rgpd"
      },
      {
        "label": "Question 2 — Directive européenne de 2022",
        "stdin": "q:2",
        "expected": "nis2||nis 2||la nis2||directive nis2||la directive nis2"
      },
      {
        "label": "Question 3 — Norme de l'industrie des paiements",
        "stdin": "q:3",
        "expected": "pci dss||pcidss||pci-dss||le pci dss"
      },
      {
        "label": "Question 4 — Norme qui certifie le SMSI",
        "stdin": "q:4",
        "expected": "iso 27001||iso27001||iso/iec 27001||iso-27001||l'iso 27001||l’iso 27001"
      },
      {
        "label": "Question 5 — Norme santé américaine",
        "stdin": "q:5",
        "expected": "hipaa||la hipaa||le hipaa"
      },
      {
        "label": "Question 6 — NIS2 responsabilise qui",
        "stdin": "q:6",
        "expected": "dirigeants||les dirigeants||des dirigeants||la direction"
      }
    ],
    "solution": "[Question 1 — Référentiel des données personnelles]\nrgpd\n\n[Question 2 — Directive européenne de 2022]\nnis2\n\n[Question 3 — Norme de l'industrie des paiements]\npci dss\n\n[Question 4 — Norme qui certifie le SMSI]\niso 27001\n\n[Question 5 — Norme santé américaine]\nhipaa\n\n[Question 6 — NIS2 responsabilise qui]\ndirigeants",
    "takeaway": "1) Le traitement des données personnelles des résidents de l'UE relève du RGPD (registre des traitements, minimisation, notification des violations).\n2) La directive européenne de décembre 2022 qui élargit les secteurs (administration publique, déchets, chimie…) et responsabilise les dirigeants : NIS2.\n3) La norme de l'industrie des paiements, 12 exigences pour les données de cartes : PCI DSS.\n4) La certification du SMSI (système de management de la sécurité de l'information) relève de l'ISO/IEC 27001.\n5) La norme santé des États-Unis : HIPAA.\n6) NIS2 a renforcé la responsabilité des dirigeants : gouvernance et sanctions tombent désormais sur eux.\nContrôle : la table « qui exige quoi » du cours — RGPD = données personnelles, NIS2 = infrastructures essentielles, PCI DSS = cartes bancaires, HIPAA = santé (US), ISO 27001 = SMSI — chaque domaine apparaît une seule fois."
  },
  {
    "id": "cy-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La sauvegarde 3-2-1 de l'étude notariale Maret et Filles",
    "exampleTitle": "Exemple résolu — le coffre du photographe indépendant",
    "goal": "Auditer une stratégie de sauvegarde contre la règle 3-2-1 et sa version étendue 3-2-1-1-0.",
    "brief": "<p><strong>Énoncé.</strong> L'étude notariale Maret et Filles conserve tous ses dossiers de clients sous forme numérique. État actuel de la sauvegarde :</p><ul><li>les données de production vivent sur le <strong>NAS du bureau</strong> ;</li><li>une copie synchronisée existe <strong>sur un second disque, à l'intérieur du même NAS</strong> ;</li><li><strong>aucune copie ne quitte les locaux</strong>.</li></ul><p>Rappel du cours — la règle <strong>3-2-1</strong> : <strong>3</strong> copies des données (production comprise), sur <strong>2</strong> supports différents, dont <strong>1</strong> hors site. Son évolution <strong>3-2-1-1-0</strong> ajoute 1 copie <strong>immuable</strong> (hors ligne, inatteignable) et <strong>0 erreur</strong> vérifiée lors des tests de restauration.</p><ol><li>Combien de copies la règle 3-2-1 exige-t-elle, production comprise ?</li><li>Sur combien de supports différents ces copies doivent-elles vivre ?</li><li>Combien de copies doivent être hors site ?</li><li>L'étude n'a que deux copies dans le même boîtier : la règle 3-2-1 est-elle respectée ? Répondez par oui ou non.</li><li>La règle 3-2-1-1-0 exige, en plus de la copie immuable, combien d'erreurs au test de restauration ?</li><li>La copie immuable, hors ligne ou en air-gap, protège surtout contre quel type de malware ? Répondez par un seul mot.</li></ol>",
    "starter": "# Exercice — La sauvegarde 3-2-1 de l'étude notariale Maret et Filles\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 et 5 : un nombre. Question 4 : oui ou non. Question 6 : un seul mot.\n\n[Question 1 — Nombre de copies exigées]\nA_COMPLETER\n\n[Question 2 — Nombre de supports différents]\nA_COMPLETER\n\n[Question 3 — Nombre de copies hors site]\nA_COMPLETER\n\n[Question 4 — La règle est-elle respectée (oui/non)]\nA_COMPLETER\n\n[Question 5 — Erreurs tolérées au test de restauration]\nA_COMPLETER\n\n[Question 6 — Contre quel malware la copie immuable protège]\nA_COMPLETER\n",
    "hints": [
      "La règle 3-2-1 se lit chiffre par chiffre : 3 copies, 2 supports différents, 1 copie hors site — trois critères indépendants.",
      "Comptez séparément les copies, les supports et les copies hors site de l'étude : aucun critère n'en compense un autre, un second disque dans le même boîtier reste un seul support au même endroit.",
      "Pour la fin, la copie immuable est la seule qu'un chiffrement malveillant ne peut pas atteindre ; le dernier chiffre de la règle étendue se lit en erreurs tolérées."
    ],
    "examples": [
      {
        "stdin": "Un photographe indépendant travaille sur son ordinateur (production).\nIl synchronise une copie sur un disque externe rangé au coffre de sa banque (hors site).\n\n1) Copies : production + 1 copie = 2 copies — la règle en exige 3.\n2) Supports : ordinateur et disque externe = 2 supports.\n3) Hors site : le disque rangé à la banque = 1 copie hors site.\nIl lui manque une copie pour respecter la règle.",
        "expected": "2 copies au lieu de 3 — 2 supports — 1 hors site",
        "note": "3 copies, 2 supports, 1 hors site : compter les trois critères séparément, l'un ne compense jamais l'autre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de copies exigées",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Nombre de supports différents",
        "stdin": "q:2",
        "expected": "2||deux"
      },
      {
        "label": "Question 3 — Nombre de copies hors site",
        "stdin": "q:3",
        "expected": "1||une"
      },
      {
        "label": "Question 4 — La règle est-elle respectée (oui/non)",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Erreurs tolérées au test de restauration",
        "stdin": "q:5",
        "expected": "0||zero||aucune||aucune erreur"
      },
      {
        "label": "Question 6 — Contre quel malware la copie immuable protège",
        "stdin": "q:6",
        "expected": "ransomware||rancongiciel||le ransomware||un ransomware"
      }
    ],
    "solution": "[Question 1 — Nombre de copies exigées]\n3\n\n[Question 2 — Nombre de supports différents]\n2\n\n[Question 3 — Nombre de copies hors site]\n1\n\n[Question 4 — La règle est-elle respectée (oui/non)]\nnon\n\n[Question 5 — Erreurs tolérées au test de restauration]\n0\n\n[Question 6 — Contre quel malware la copie immuable protège]\nransomware",
    "takeaway": "1) La règle exige 3 copies des données : la production plus deux sauvegardes.\n2) Ces copies doivent vivre sur 2 supports différents (par exemple NAS local et cloud ou bande).\n3) Une copie sur les trois doit être hors site.\n4) Non : l'étude n'a que 2 copies (production + 1), sur un seul et même support (le NAS), et aucune copie hors site — les trois critères échouent. Un second disque dans le même boîtier ne crée ni un support distinct ni un site distant.\n5) La règle 3-2-1-1-0 exige 0 erreur vérifiée : une sauvegarde jamais restaurée n'existe pas, les tests se font en granulaire et en complet.\n6) La copie immuable, hors ligne ou en air-gap, est celle que le ransomware ne peut ni atteindre ni chiffrer : c'est la parade de référence.\nContrôle : 2 copies &lt; 3, 1 support &lt; 2, 0 copie hors site &lt; 1 — chaque critère de la règle est séparément en échec ; ajouter une sauvegarde cloud immuable corrigerait les trois d'un coup."
  }
];
