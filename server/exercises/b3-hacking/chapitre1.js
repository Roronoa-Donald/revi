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
  }
];
