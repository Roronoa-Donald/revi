/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "ar-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "L'inventaire du labo du lycée technique",
    "exampleTitle": "Exemple résolu — l'inventaire du cybercafé du quartier",
    "goal": "Classer les éléments d'un poste entre matériel (hardware) et logiciel (software) et nommer les familles du système informatique.",
    "brief": "<p><strong>Énoncé.</strong> À la rentrée, la responsable du labo du lycée technique dresse l'inventaire du poste de la salle de travaux pratiques. Huit éléments y figurent :</p><p><code>écran — clavier — souris — barrette RAM — SSD — Windows 11 — navigateur — antivirus</code></p><p>Rappel du cours : le <strong>hardware</strong> regroupe les parties physiques, le <strong>software</strong> les programmes ; un système informatique réunit quatre familles (matériel, logiciels, données, utilisateurs). Répondez aux questions suivantes.</p><ol><li>Combien de ces éléments appartiennent au matériel (hardware) ?</li><li>Combien appartiennent au logiciel (software) ?</li><li>L'antivirus est-il du matériel ou du logiciel ? Répondez par un seul mot.</li><li>Le poste du secrétariat fonctionne encore sous MS-DOS : un seul utilisateur peut lancer un seul programme à la fois. Quelle est cette catégorie d'OS ? Répondez au format mono-utilisateur mono-tâche.</li><li>Les bulletins scannés et les fichiers texte manipulés par la machine forment quelle famille du système informatique ? Répondez par un seul mot.</li></ol>",
    "starter": "# Exercice — L'inventaire du labo du lycée technique\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 4 : format mono-utilisateur mono-tache ; questions 3 et 5 : un seul mot.\n\n[Question 1 — Nombre d'éléments matériels]\nA_COMPLETER\n\n[Question 2 — Nombre d'éléments logiciels]\nA_COMPLETER\n\n[Question 3 — Nature de l'antivirus]\nA_COMPLETER\n\n[Question 4 — Catégorie de l'OS MS-DOS]\nA_COMPLETER\n\n[Question 5 — Famille des fichiers et bulletins]\nA_COMPLETER\n",
    "hints": [
      "Le matériel se touche ; le logiciel s'exécute. Demandez-vous si l'élément peut être tenu en main.",
      "Comptez d'un côté les objets physiques, de l'autre les programmes installés sur le poste.",
      "Pour l'OS, comptez les utilisateurs ET les programmes simultanés ; pour la dernière question, relisez les quatre familles du système informatique."
    ],
    "examples": [
      {
        "stdin": "Un cybercafé du quartier dresse l'inventaire de son poste : écran, système Linux, barrette RAM, tableur, disque dur, jeu vidéo.\n\n1) Matériel : écran, barrette RAM, disque dur, soit 3 éléments. Logiciel : Linux, tableur, jeu vidéo, soit 3 éléments.\n2) Le jeu vidéo est un logiciel.\n3) Le serveur du cybercafé, sous Linux, accueille plusieurs comptes qui travaillent en même temps : OS multi-utilisateurs.\n4) Les fichiers des clients constituent la famille des données.",
        "expected": "3 matériels — 3 logiciels — le jeu vidéo : logiciel — OS multi-utilisateurs — les fichiers : données",
        "note": "Ce qui se touche est du matériel, ce qui s'exécute est du logiciel ; les fichiers restent une famille à part entière."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'éléments matériels",
        "stdin": "q:1",
        "expected": "5"
      },
      {
        "label": "Question 2 — Nombre d'éléments logiciels",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Nature de l'antivirus",
        "stdin": "q:3",
        "expected": "logiciel||un logiciel"
      },
      {
        "label": "Question 4 — Catégorie de l'OS MS-DOS",
        "stdin": "q:4",
        "expected": "mono-utilisateur mono-tache||monoutilisateur monotache||mono-utilisateur et mono-tache||monoutilisateur et monotache"
      },
      {
        "label": "Question 5 — Famille des fichiers et bulletins",
        "stdin": "q:5",
        "expected": "donnees||les donnees"
      }
    ],
    "solution": "[Question 1 — Nombre d'éléments matériels]\n5\n\n[Question 2 — Nombre d'éléments logiciels]\n3\n\n[Question 3 — Nature de l'antivirus]\nlogiciel\n\n[Question 4 — Catégorie de l'OS MS-DOS]\nmono-utilisateur mono-tache\n\n[Question 5 — Famille des fichiers et bulletins]\ndonnees",
    "takeaway": "1) Matériel (hardware) : écran, clavier, souris, barrette RAM, SSD, soit 5 éléments.\n2) Logiciel (software) : Windows 11, navigateur, antivirus, soit 3 éléments. Contrôle : 5 + 3 = 8, on retrouve les huit éléments de l'inventaire.\n3) L'antivirus est un programme : c'est un logiciel.\n4) MS-DOS n'accepte qu'un utilisateur et qu'un programme à la fois : OS mono-utilisateur mono-tâche.\n5) Les bulletins et fichiers texte sont la matière première traitée par la machine : la famille des données (avec le matériel, les logiciels et les utilisateurs)."
  },
  {
    "id": "ar-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Convertir Ko, Mo et Go",
    "goal": "Convertir des unités binaires par puissances de 2 avec les codes historiques de l’exercice.",
    "brief": "<p>Analysez chaque ligne proposée « valeur unite » : valeur est un entier naturel et unite est un code parmi <code>ko</code>, <code>mo</code> ou <code>go</code>. Dans cet exercice, ces codes historiques désignent respectivement les unités binaires Kio, Mio et Gio : 1 Mio = 1024 Kio et 1 Gio = 1024 Mio. Convertissez chaque taille dans l’unité représentée par <code>mo</code> et indiquez <code>valeur unite : X mo</code>, puis le bilan <code>conversions : n</code>. Un résultat peut être fractionnaire : donnez son écriture décimale exacte avec un point, sans arrondi ni zéros finaux inutiles ; par exemple 512 ko = <code>0.5</code> mo.</p><p>Attention : dans la notation normalisée, ko, Mo et Go sont décimaux ; par exemple 1 Mo = 1000 ko. Gardez les codes de l’exercice dans vos réponses.</p>",
    "starter": "# Grille d'analyse (ar-c1-e2) — Convertir Ko, Mo et Go\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les trois unités melangees]\n# Données : 4\n# Données : 1024 ko\n# Données : 768 mo\n# Données : 1 go\n# Données : 4096 ko\nA_COMPLETER\n\n[Cas 2 — Que des go]\n# Données : 3\n# Données : 3 go\n# Données : 1 go\n# Données : 5 go\nA_COMPLETER\n\n[Cas 3 — Que des ko]\n# Données : 4\n# Données : 512 ko\n# Données : 3072 ko\n# Données : 8192 ko\n# Données : 1 ko\nA_COMPLETER\n",
    "hints": [
      "Pour obtenir le code historique mo, qui désigne ici des Mio, divisez les ko par 1024, gardez les mo et multipliez les go par 1024.",
      "Conservez toutes les décimales nécessaires : 1 ko correspond à 0.0009765625 mo.",
      "Utilisez les puissances binaires exactes : 1 Mo = 1024 Ko et 1 Go = 1024 Mo ; conservez la fraction décimale complète pour 1 Ko en Mo."
    ],
    "examples": [
      {
        "stdin": "4\n2048 ko\n512 mo\n2 go\n512 ko\n",
        "expected": "2048 ko : 2 mo\n512 mo : 512 mo\n2 go : 2048 mo\n512 ko : 0.5 mo\nconversions : 4"
      }
    ],
    "tests": [
      {
        "label": "Les trois unités melangees",
        "stdin": "cas:1",
        "expected": "1024 ko : 1 mo\n768 mo : 768 mo\n1 go : 1024 mo\n4096 ko : 4 mo\nconversions : 4"
      },
      {
        "label": "Que des go",
        "stdin": "cas:2",
        "expected": "3 go : 3072 mo\n1 go : 1024 mo\n5 go : 5120 mo\nconversions : 3"
      },
      {
        "label": "Que des ko",
        "stdin": "cas:3",
        "expected": "512 ko : 0.5 mo\n3072 ko : 3 mo\n8192 ko : 8 mo\n1 ko : 0.0009765625 mo\nconversions : 4"
      }
    ],
    "solution": "[Exemple]\n2048 ko : 2 mo\n512 mo : 512 mo\n2 go : 2048 mo\n512 ko : 0.5 mo\nconversions : 4\n\n[Cas 1 — Les trois unités melangees]\n1024 ko : 1 mo\n768 mo : 768 mo\n1 go : 1024 mo\n4096 ko : 4 mo\nconversions : 4\n\n[Cas 2 — Que des go]\n3 go : 3072 mo\n1 go : 1024 mo\n5 go : 5120 mo\nconversions : 3\n\n[Cas 3 — Que des ko]\n512 ko : 0.5 mo\n3072 ko : 3 mo\n8192 ko : 8 mo\n1 ko : 0.0009765625 mo\nconversions : 4",
    "takeaway": "À retenir : Convertir des unités binaires par puissances de 2 avec les codes historiques de l’exercice."
  },
  {
    "id": "ar-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Le débit du lien fibre de l'internat",
    "exampleTitle": "Exemple résolu — la ligne du cybercafé voisin",
    "goal": "Convertir des débits entre Mo/s et Mbps avec le facteur 8 et calculer une durée de transfert.",
    "brief": "<p><strong>Énoncé.</strong> L'internat du lycée vient de faire installer la fibre. Le surveillant note les caractéristiques annoncées :</p><table><tr><th>Caractéristique</th><th>Lien fibre</th><th>Processeur</th><th>Écriture SSD</th><th>Fichier de sauvegarde</th></tr><tr><th>Valeur</th><td>80 Mbps</td><td>3,2 GHz</td><td>550 Mo/s</td><td>25 Mo</td></tr></table><p>Rappel du cours : Mo/s compte des octets par seconde, Mbps des bits par seconde, et <strong>1 Mo/s = 8 Mbps</strong> ; la fréquence en GHz compte les milliards de cycles par seconde. Répondez par le nombre seul.</p><ol><li>Quel facteur relie Mo/s et Mbps ?</li><li>Le lien fibre de 80 Mbps : quel est son débit maximal en Mo/s ?</li><li>Le fichier de 25 Mo part sur ce lien au débit maximal : quelle durée, en secondes ?</li><li>Le processeur à 3,2 GHz : combien de milliards de cycles par seconde ?</li><li>Le SSD écrit à 550 Mo/s : à combien de Mbps cela correspond-il ?</li></ol>",
    "starter": "# Exercice — Le débit du lien fibre de l'internat\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nombre seul ; la virgule française est acceptée (par exemple 2,5).\n\n[Question 1 — Facteur entre Mo/s et Mbps]\nA_COMPLETER\n\n[Question 2 — Lien de 80 Mbps en Mo/s]\nA_COMPLETER\n\n[Question 3 — Durée du transfert en secondes]\nA_COMPLETER\n\n[Question 4 — Cycles par seconde du processeur]\nA_COMPLETER\n\n[Question 5 — Écriture SSD en Mbps]\nA_COMPLETER\n",
    "hints": [
      "Mo/s compte des octets, Mbps des bits : un octet vaut 8 bits.",
      "Pour passer de Mbps à Mo/s on divise par 8 ; de Mo/s à Mbps on multiplie par 8.",
      "Pour une durée, divisez la taille par le débit dans des unités cohérentes ; en GHz, le nombre de GHz est le nombre de milliards de cycles."
    ],
    "examples": [
      {
        "stdin": "Le cybercafé voisin a un lien à 200 Mbps, un disque qui écrit à 40 Mo/s et un processeur 3 GHz.\n\n1) 200 Mbps = 200 ÷ 8 = 25 Mo/s.\n2) 40 Mo/s = 40 × 8 = 320 Mbps.\n3) Un film de 50 Mo sur le lien : 50 ÷ 25 = 2 s.\n4) 3 GHz = 3 milliards de cycles par seconde.",
        "expected": "200 Mbps = 25 Mo/s — 40 Mo/s = 320 Mbps — 50 Mo en 2 s — 3 GHz = 3 milliards de cycles",
        "note": "Mbps en bits, Mo/s en octets : le facteur 8 fait toujours la conversion, dans un sens comme dans l'autre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Facteur entre Mo/s et Mbps",
        "stdin": "q:1",
        "expected": "8"
      },
      {
        "label": "Question 2 — Lien de 80 Mbps en Mo/s",
        "stdin": "q:2",
        "expected": "10"
      },
      {
        "label": "Question 3 — Durée du transfert en secondes",
        "stdin": "q:3",
        "expected": "2,5||2.5"
      },
      {
        "label": "Question 4 — Cycles par seconde du processeur",
        "stdin": "q:4",
        "expected": "3,2||3.2"
      },
      {
        "label": "Question 5 — Écriture SSD en Mbps",
        "stdin": "q:5",
        "expected": "4400"
      }
    ],
    "solution": "[Question 1 — Facteur entre Mo/s et Mbps]\n8\n\n[Question 2 — Lien de 80 Mbps en Mo/s]\n10\n\n[Question 3 — Durée du transfert en secondes]\n2,5\n\n[Question 4 — Cycles par seconde du processeur]\n3,2\n\n[Question 5 — Écriture SSD en Mbps]\n4400",
    "takeaway": "1) Un octet vaut 8 bits : 1 Mo/s = 8 Mbps.\n2) 80 Mbps = 80 ÷ 8 = 10 Mo/s.\n3) 25 Mo ÷ 10 Mo/s = 2,5 s.\n4) 3,2 GHz = 3,2 milliards de cycles par seconde.\n5) 550 Mo/s = 550 × 8 = 4400 Mbps.\nContrôle : 80 ÷ 8 = 10 et 550 × 8 = 4400 — même facteur 8, utilisé dans les deux sens."
  },
  {
    "id": "ar-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Du binaire au decimal",
    "goal": "Convertir un nombre binaire en décimal en sommant les poids des bits à 1.",
    "brief": "<p>Analysez chaque ligne contenant un <strong>binaire</strong> de 1 à 10 bits. Pour une écriture de n bits, le bit de gauche a pour poids <code>2^(n-1)</code> et le bit de droite a pour poids <code>2^0</code>. Convertissez chaque binaire en décimal et indiquez <code>binaire : decimal=X</code>, puis le bilan <code>conversions : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c2-e1) — Du binaire au decimal\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Du plus petit au plus grand]\n# Données : 5\n# Données : 1\n# Données : 1011\n# Données : 10000\n# Données : 11111\n# Données : 11001100\nA_COMPLETER\n\n[Cas 2 — Mots courts]\n# Données : 4\n# Données : 10\n# Données : 110\n# Données : 111\n# Données : 1001\nA_COMPLETER\n\n[Cas 3 — Mots de six à dix bits]\n# Données : 4\n# Données : 101010\n# Données : 110000\n# Données : 11111110\n# Données : 1000000000\nA_COMPLETER\n",
    "hints": [
      "Chaque chiffre binaire (bit) de position k (en partant de 0 à droite) représente une puissance de 2 : 2^k.",
      "Additionnez les puissances de 2 correspondant aux bits valant 1 pour obtenir la valeur décimale.",
      "Partez du bit de poids faible (2^0 = 1) à droite et additionnez chaque puissance de 2 correspondant à un bit à 1."
    ],
    "examples": [
      {
        "stdin": "3\n1010\n11111111\n10000000\n",
        "expected": "1010 : decimal=10\n11111111 : decimal=255\n10000000 : decimal=128\nconversions : 3"
      }
    ],
    "tests": [
      {
        "label": "Du plus petit au plus grand",
        "stdin": "cas:1",
        "expected": "1 : decimal=1\n1011 : decimal=11\n10000 : decimal=16\n11111 : decimal=31\n11001100 : decimal=204\nconversions : 5"
      },
      {
        "label": "Mots courts",
        "stdin": "cas:2",
        "expected": "10 : decimal=2\n110 : decimal=6\n111 : decimal=7\n1001 : decimal=9\nconversions : 4"
      },
      {
        "label": "Mots de six à dix bits",
        "stdin": "cas:3",
        "expected": "101010 : decimal=42\n110000 : decimal=48\n11111110 : decimal=254\n1000000000 : decimal=512\nconversions : 4"
      }
    ],
    "solution": "[Exemple]\n1010 : decimal=10\n11111111 : decimal=255\n10000000 : decimal=128\nconversions : 3\n\n[Cas 1 — Du plus petit au plus grand]\n1 : decimal=1\n1011 : decimal=11\n10000 : decimal=16\n11111 : decimal=31\n11001100 : decimal=204\nconversions : 5\n\n[Cas 2 — Mots courts]\n10 : decimal=2\n110 : decimal=6\n111 : decimal=7\n1001 : decimal=9\nconversions : 4\n\n[Cas 3 — Mots de six à dix bits]\n101010 : decimal=42\n110000 : decimal=48\n11111110 : decimal=254\n1000000000 : decimal=512\nconversions : 4",
    "takeaway": "À retenir : Convertir un nombre binaire en décimal en sommant les poids des bits à 1."
  },
  {
    "id": "ar-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Les codes de l'automate de la chaîne d'embouteillage",
    "exampleTitle": "Exemple résolu — les codes de l'automate du silo",
    "goal": "Convertir par divisions successives et groupements (octal, hexadécimal) et coder en BCD et ASCII.",
    "brief": "<p><strong>Énoncé.</strong> À l'atelier d'embouteillage, l'automate affiche des codes que la technicienne doit traduire. Le pupitre indique :</p><table><tr><th>Donnée</th><th>Consigne de débit</th><th>Code d'erreur</th><th>Valeur lue à l'écran</th><th>Compteur à afficher</th><th>Badge d'accès</th></tr><tr><th>Valeur</th><td>77</td><td>156</td><td>2E</td><td>47</td><td>1000101</td></tr></table><p>Rappel du cours : octal par groupes de 3 bits, hexadécimal par groupes de 4 bits, toujours depuis la droite ; en BCD, chaque chiffre décimal occupe son quartet ; en ASCII, le « A » vaut 65. Répondez aux questions suivantes.</p><ol><li>Convertissez la consigne 77 en binaire sur 8 bits.</li><li>Convertissez la consigne 77 en octal.</li><li>Convertissez le code d'erreur 156 en hexadécimal (sans préfixe).</li><li>La valeur 2E lue à l'écran vaut combien en décimal ?</li><li>Écrivez le compteur 47 en code BCD.</li><li>Le badge porte le code ASCII 1000101 (sur 7 bits) : quel caractère désigne-t-il ? Répondez par la lettre seule.</li></ol><p>Mots binaires sur 8 bits avec ou sans espace entre les quartets ; hexadécimal sans préfixe ; BCD avec un espace entre les quartets.</p>",
    "starter": "# Exercice — Les codes de l'automate de la chaîne d'embouteillage\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Binaire sur 8 bits avec ou sans espace ; octal et décimal en chiffres ; hexa sans préfixe ; BCD par quartets.\n\n[Question 1 — Consigne 77 en binaire sur 8 bits]\nA_COMPLETER\n\n[Question 2 — Consigne 77 en octal]\nA_COMPLETER\n\n[Question 3 — Code d'erreur 156 en hexadécimal]\nA_COMPLETER\n\n[Question 4 — Valeur 2E en décimal]\nA_COMPLETER\n\n[Question 5 — Compteur 47 en BCD]\nA_COMPLETER\n\n[Question 6 — Caractère du code ASCII 1000101]\nA_COMPLETER\n",
    "hints": [
      "Décimal vers binaire : divisions successives, restes lus de bas en haut, ou décomposition en puissances de 2.",
      "Binaire vers octal : groupes de 3 bits ; binaire vers hexa : groupes de 4 bits — toujours depuis la droite, en complétant par des zéros à gauche.",
      "En hexa, chaque chiffre pèse sa valeur fois 16 (A = 10 … F = 15) ; en BCD, chaque chiffre décimal occupe son quartet ; en ASCII, partez de la valeur du A."
    ],
    "examples": [
      {
        "stdin": "L'automate du silo affiche : consigne 26, code d'erreur 200, écran 1F, compteur 58.\n\n1) 26 = 16 + 8 + 2, donc 00011010 sur 8 bits.\n2) 26 en octal : 011 010, donc 32 (contrôle : 3 × 8 + 2 = 26).\n3) 200 = 12 × 16 + 8, donc C8.\n4) 1F = 16 + 15 = 31.\n5) BCD de 58 : 5 donne 0101, 8 donne 1000, donc 0101 1000.\n6) ASCII 1000001 = 64 + 1 = 65 : la lettre A.",
        "expected": "26 → 00011010 — 26 → 32 en octal — 200 → C8 — 1F → 31 — BCD 58 : 0101 1000 — 1000001 → A",
        "note": "Trois bits par chiffre octal, quatre par chiffre hexa : les groupements partent toujours de la droite."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Consigne 77 en binaire sur 8 bits",
        "stdin": "q:1",
        "expected": "0100 1101||01001101"
      },
      {
        "label": "Question 2 — Consigne 77 en octal",
        "stdin": "q:2",
        "expected": "115"
      },
      {
        "label": "Question 3 — Code d'erreur 156 en hexadécimal",
        "stdin": "q:3",
        "expected": "9C||0x9C"
      },
      {
        "label": "Question 4 — Valeur 2E en décimal",
        "stdin": "q:4",
        "expected": "46"
      },
      {
        "label": "Question 5 — Compteur 47 en BCD",
        "stdin": "q:5",
        "expected": "0100 0111||01000111"
      },
      {
        "label": "Question 6 — Caractère du code ASCII 1000101",
        "stdin": "q:6",
        "expected": "E||la lettre E"
      }
    ],
    "solution": "[Question 1 — Consigne 77 en binaire sur 8 bits]\n0100 1101\n\n[Question 2 — Consigne 77 en octal]\n115\n\n[Question 3 — Code d'erreur 156 en hexadécimal]\n9C\n\n[Question 4 — Valeur 2E en décimal]\n46\n\n[Question 5 — Compteur 47 en BCD]\n0100 0111\n\n[Question 6 — Caractère du code ASCII 1000101]\nE",
    "takeaway": "1) 77 = 64 + 8 + 4 + 1, donc 0100 1101.\n2) Octal par groupes de 3 depuis la droite : 01 001 101 donne 1, 1, 5, donc 115. Contrôle : 1 × 64 + 1 × 8 + 5 = 77.\n3) 156 = 9 × 16 + 12, donc 9C. Contrôle : 9 × 16 + 12 = 156.\n4) 2E = 2 × 16 + 14 = 46.\n5) BCD de 47 : le chiffre 4 donne 0100, le chiffre 7 donne 0111, donc 0100 0111.\n6) 1000101 = 64 + 4 + 1 = 69 ; le A vaut 65, donc 69 = 65 + 4 : la cinquième lettre, E.\nContrôle : 0100 1101 se relit 64 + 8 + 4 + 1 = 77 ; 115 se relit 64 + 8 + 5 = 77."
  },
  {
    "id": "ar-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "La balance et le lecteur du laboratoire d'analyses",
    "exampleTitle": "Exemple résolu — le voltmètre connecté de l'atelier",
    "goal": "Convertir une partie fractionnaire, repérer le MSB et lire un mot binaire par quartets.",
    "brief": "<p><strong>Énoncé.</strong> Au laboratoire d'analyses, la balance connectée transmet la masse avec sa partie fractionnaire ; l'étiquette du flacon porte un octet et le lecteur de badge affiche un mot binaire. La fiche du matin indique :</p><table><tr><th>Source</th><th>Première pesée</th><th>Deuxième pesée</th><th>Étiquette du flacon</th><th>Lecteur de badge</th></tr><tr><th>Valeur</th><td>0,625</td><td>0,11</td><td>10110100</td><td>01011010</td></tr></table><p>Rappel du cours : après la virgule, les poids sont 2 puissance -1 = 0,5, puis 0,25, puis 0,125 ; le MSB est le bit de poids fort, à gauche ; un quartet code un chiffre hexadécimal. Répondez aux questions suivantes.</p><ol><li>Convertissez 0,625 en binaire (après la virgule).</li><li>Que vaut 0,11 en décimal ?</li><li>Quel est le bit de poids fort (MSB) de l'octet 10110100 de l'étiquette ?</li><li>Le mot 01011010 du lecteur, lu par quartets, donne quel nombre hexadécimal (sans préfixe) ?</li><li>Combien de valeurs différentes peut-on coder sur 7 bits, la taille du code ASCII ?</li></ol><p>Écrivez la virgule des nombres binaires fractionnaires (par exemple 0,101) ; répondez aux questions 3 et 5 par le nombre seul.</p>",
    "starter": "# Exercice — La balance et le lecteur du laboratoire d'analyses\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Fraction binaire avec la virgule (par exemple 0,101) ; hexa sans préfixe ; questions 3 et 5 : nombre seul.\n\n[Question 1 — 0,625 en binaire]\nA_COMPLETER\n\n[Question 2 — 0,11 en décimal]\nA_COMPLETER\n\n[Question 3 — MSB de l'octet 10110100]\nA_COMPLETER\n\n[Question 4 — Mot 01011010 en hexadécimal]\nA_COMPLETER\n\n[Question 5 — Valeurs codables sur 7 bits]\nA_COMPLETER\n",
    "hints": [
      "Après la virgule, les poids sont 0,5 puis 0,25 puis 0,125.",
      "Le MSB est le bit de poids fort, à gauche du mot ; un quartet correspond exactement à un chiffre hexadécimal.",
      "k bits offrent 2 puissance k combinaisons ; contrôlez la fraction en additionnant ses poids pour retrouver le décimal."
    ],
    "examples": [
      {
        "stdin": "Le voltmètre connecté de l'atelier affiche 0,75 puis 0,101 ; l'étiquette du boîtier porte 01100100 et le lecteur montre 10100100.\n\n1) 0,75 = 0,5 + 0,25, donc 0,11.\n2) 0,101 = 0,5 + 0,125 = 0,625.\n3) Le MSB de 01100100 vaut 0.\n4) 10100100 par quartets : 1010 0100, donc A4 (contrôle : 10 × 16 + 4 = 164).\n5) 7 bits offrent 128 valeurs.",
        "expected": "0,75 → 0,11 — 0,101 → 0,625 — MSB de 01100100 : 0 — 10100100 → A4 — 7 bits : 128 valeurs",
        "note": "Après la virgule, les poids sont 0,5 puis 0,25 puis 0,125 ; à gauche du mot, le bit tout à gauche est le MSB."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — 0,625 en binaire",
        "stdin": "q:1",
        "expected": "0,101||0.101"
      },
      {
        "label": "Question 2 — 0,11 en décimal",
        "stdin": "q:2",
        "expected": "0,75||0.75"
      },
      {
        "label": "Question 3 — MSB de l'octet 10110100",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Mot 01011010 en hexadécimal",
        "stdin": "q:4",
        "expected": "5A||0x5A"
      },
      {
        "label": "Question 5 — Valeurs codables sur 7 bits",
        "stdin": "q:5",
        "expected": "128"
      }
    ],
    "solution": "[Question 1 — 0,625 en binaire]\n0,101\n\n[Question 2 — 0,11 en décimal]\n0,75\n\n[Question 3 — MSB de l'octet 10110100]\n1\n\n[Question 4 — Mot 01011010 en hexadécimal]\n5A\n\n[Question 5 — Valeurs codables sur 7 bits]\n128",
    "takeaway": "1) 0,625 = 0,5 + 0,125, donc 0,101.\n2) 0,11 = 0,5 + 0,25 = 0,75.\n3) Dans 10110100, le bit de poids fort est celui de gauche : il vaut 1.\n4) 01011010 par quartets : 0101 1010 donne 5 et 10 (A), donc 5A. Contrôle : 5 × 16 + 10 = 90.\n5) 7 bits offrent 2 puissance 7 = 128 valeurs : l'ASCII code ainsi 128 caractères.\nContrôle : 0,101 se relit 0,5 + 0,125 = 0,625 ; 5A se relit 5 × 16 + 10 = 90."
  },
  {
    "id": "ar-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le régulateur d'humidité du magasin de semences",
    "exampleTitle": "Exemple résolu — le régulateur de la fromagerie",
    "goal": "Représenter des écarts négatifs en signe + valeur absolue et calculer des compléments à 1.",
    "brief": "<p><strong>Énoncé.</strong> Le magasin de semences installe un régulateur d'humidité. Les écarts par rapport à la consigne sont encodés sur un octet. Le registre du matin contenait : un écart de <code>−53</code> à représenter, la valeur <code>+53</code>, la valeur <code>+30</code>, et le mot <code>11100001</code> reçu en complément à 1. Rappel du cours : en signe + valeur absolue, le bit de poids fort est le bit de signe (0 = positif, 1 = négatif) et cette convention possède deux zéros ; le complément à 1 inverse tous les bits. Répondez aux questions suivantes.</p><ol><li>Représentez l'écart −53 en signe + valeur absolue sur 8 bits.</li><li>Combien de zéros possède la convention signe + valeur absolue ?</li><li>Calculez le complément à 1 de 00110101 (qui code +53).</li><li>Calculez le complément à 1 de 00011110 (qui code +30).</li><li>Le mot 11100001, reçu en complément à 1, représente quel écart décimal ?</li></ol><p>Mots binaires sur 8 bits, avec ou sans espace entre les quartets (par exemple 1011 0101 ou 10110101) ; l'écart de la question 5 s'écrit avec le signe moins (par exemple −30).</p>",
    "starter": "# Exercice — Le régulateur d'humidité du magasin de semences\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Mots binaires sur 8 bits avec ou sans espace ; question 5 : écart signé (par exemple -30).\n\n[Question 1 — Écart -53 en signe + valeur absolue]\nA_COMPLETER\n\n[Question 2 — Nombre de zéros de la convention]\nA_COMPLETER\n\n[Question 3 — Complément à 1 de 00110101]\nA_COMPLETER\n\n[Question 4 — Complément à 1 de 00011110]\nA_COMPLETER\n\n[Question 5 — Écart du mot 11100001]\nA_COMPLETER\n",
    "hints": [
      "En signe + valeur absolue, le bit de poids fort est le signe (1 = négatif), les sept autres codent la valeur absolue.",
      "Écrivez d'abord la valeur absolue sur 7 bits, puis posez le bit de signe ; pour le complément à 1, inversez chaque bit un à un.",
      "Pour lire un mot en complément à 1, inversez-le : vous retrouvez la valeur absolue ; le MSB à 1 annonce un écart négatif."
    ],
    "examples": [
      {
        "stdin": "La fromagerie encode ses écarts d'humidité : −20 à représenter, +20 reçu, et le mot 11101011 en complément à 1.\n\n1) +20 = 00010100 ; en signe + valeur absolue, −20 = 10010100.\n2) Deux zéros : 00000000 et 10000000.\n3) C1 de 00010100 : 11101011.\n4) 11101011, lu en complément à 1, représente −20.",
        "expected": "−20 → 10010100 — deux zéros — C1 de 00010100 : 11101011 — 11101011 : −20",
        "note": "En signe + valeur absolue le bit de gauche signe ; le complément à 1 inverse chaque bit, un à un."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Écart -53 en signe + valeur absolue",
        "stdin": "q:1",
        "expected": "1011 0101||10110101"
      },
      {
        "label": "Question 2 — Nombre de zéros de la convention",
        "stdin": "q:2",
        "expected": "2"
      },
      {
        "label": "Question 3 — Complément à 1 de 00110101",
        "stdin": "q:3",
        "expected": "1100 1010||11001010"
      },
      {
        "label": "Question 4 — Complément à 1 de 00011110",
        "stdin": "q:4",
        "expected": "1110 0001||11100001"
      },
      {
        "label": "Question 5 — Écart du mot 11100001",
        "stdin": "q:5",
        "expected": "-30||−30"
      }
    ],
    "solution": "[Question 1 — Écart -53 en signe + valeur absolue]\n1011 0101\n\n[Question 2 — Nombre de zéros de la convention]\n2\n\n[Question 3 — Complément à 1 de 00110101]\n1100 1010\n\n[Question 4 — Complément à 1 de 00011110]\n1110 0001\n\n[Question 5 — Écart du mot 11100001]\n-30",
    "takeaway": "1) +53 = 00110101 (32 + 16 + 4 + 1) ; bit de signe à 1 : −53 = 10110101.\n2) Deux zéros : 00000000 (+0) et 10000000 (−0) — c'est le défaut de la convention.\n3) C1 de 00110101 : on inverse chaque bit, ce qui donne 11001010.\n4) +30 = 00011110 ; son complément à 1 est 11100001.\n5) 11100001 inversé donne 00011110 = +30 : le mot représente l'écart −30 (MSB à 1, donc négatif).\nContrôle : le complément à 1 du complément à 1 redonne le mot de départ : C1(11100001) = 00011110."
  },
  {
    "id": "ar-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Les écarts de température du grossiste TogoFroid",
    "exampleTitle": "Exemple résolu — le convoi de produits surgelés",
    "goal": "Représenter des négatifs en complément à 2 sur 8 bits et lire un mot signé.",
    "brief": "<p><strong>Énoncé.</strong> Le régulateur du grossiste TogoFroid encode les écarts de température (en °C) sur un octet signé au format <strong>complément à 2</strong>. Sur 8 bits, l'intervalle représentable va de −128 à +127. Rappel du cours : complément à 1 = inversion de tous les bits ; complément à 2 = complément à 1 plus 1 ; en binaire, 1 + 1 = 0 retenue 1 et 1 + 1 + 1 = 1 retenue 1. La fiche du jour demande :</p><ol><li>Représentez l'écart −5 en complément à 2 sur 8 bits.</li><li>Représentez l'écart −12 en complément à 2 sur 8 bits.</li><li>Le mot 11010100 arrive du capteur : quel écart décimal représente-t-il ?</li><li>Représentez l'écart −128 sur 8 bits.</li><li>Quelles sont les deux bornes de l'intervalle représentable ? Écrivez-les séparées par une virgule, la plus petite d'abord.</li></ol><p>Mots binaires sur 8 bits, avec ou sans espace entre les quartets (par exemple 1111 1011 ou 11111011).</p>",
    "starter": "# Exercice — Les écarts de température du grossiste TogoFroid\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Mots binaires sur 8 bits avec ou sans espace ; question 3 : écart signé ; question 5 : bornes séparées par une virgule.\n\n[Question 1 — Écart -5 en complément à 2]\nA_COMPLETER\n\n[Question 2 — Écart -12 en complément à 2]\nA_COMPLETER\n\n[Question 3 — Écart du mot 11010100]\nA_COMPLETER\n\n[Question 4 — Écart -128 sur 8 bits]\nA_COMPLETER\n\n[Question 5 — Bornes de l'intervalle]\nA_COMPLETER\n",
    "hints": [
      "Complément à 2 = complément à 1 puis ajout de 1 ; ou, de la droite : recopiez jusqu'au premier 1 inclus, puis inversez tout ce qui suit.",
      "Pour lire un mot dont le MSB vaut 1, calculez sa valeur non signée puis retranchez 256.",
      "Contrôlez en additionnant : le mot obtenu, ajouté à la valeur de départ, doit redonner 0 (à la retenue sortante près)."
    ],
    "examples": [
      {
        "stdin": "Le convoi de produits surgelés encode ses écarts : −9 à représenter, le mot 10101100 reçu, et les bornes.\n\n1) +9 = 00001001 ; C1 = 11110110 ; C2 = 11110111.\n2) Vérification : (−9) + 9 = 11110111 + 00001001 = 00000000, avec une retenue sortante.\n3) 10101100 vaut 172 non signé ; 172 − 256 = −84.\n4) Bornes : de −128 à 127.",
        "expected": "−9 → 11110111 — (−9) + 9 = 0 — 10101100 → −84 — bornes : −128 à 127",
        "note": "Complément à 2 = complément à 1 plus 1 ; un mot de MSB 1 se lit en retranchant 256 de sa valeur non signée."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Écart -5 en complément à 2",
        "stdin": "q:1",
        "expected": "1111 1011||11111011"
      },
      {
        "label": "Question 2 — Écart -12 en complément à 2",
        "stdin": "q:2",
        "expected": "1111 0100||11110100"
      },
      {
        "label": "Question 3 — Écart du mot 11010100",
        "stdin": "q:3",
        "expected": "-44||−44"
      },
      {
        "label": "Question 4 — Écart -128 sur 8 bits",
        "stdin": "q:4",
        "expected": "1000 0000||10000000"
      },
      {
        "label": "Question 5 — Bornes de l'intervalle",
        "stdin": "q:5",
        "expected": "-128, 127||−128, 127"
      }
    ],
    "solution": "[Question 1 — Écart -5 en complément à 2]\n1111 1011\n\n[Question 2 — Écart -12 en complément à 2]\n1111 0100\n\n[Question 3 — Écart du mot 11010100]\n-44\n\n[Question 4 — Écart -128 sur 8 bits]\n1000 0000\n\n[Question 5 — Bornes de l'intervalle]\n-128, 127",
    "takeaway": "1) +5 = 00000101 ; C1 = 11111010 ; C2 = 11111010 + 1 = 11111011.\n2) +12 = 00001100 ; C1 = 11110011 ; C2 = 11110100. Contrôle : 256 − 12 = 244 = 11110100.\n3) 11010100 vaut 128 + 64 + 16 + 4 = 212 non signé ; 212 − 256 = −44.\n4) −128 est le cas limite : 10000000 (−128 n'a pas d'opposé représentable sur 8 bits).\n5) De −128 à 127 : 256 valeurs, un seul zéro.\nContrôle : 11111011 + 00000101 = 1 00000000 : sur 8 bits le résultat est 00000000 avec une retenue sortante — le complément à 2 de 5 additionné à 5 redonne bien 0."
  },
  {
    "id": "ar-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "La caisse électronique du marché de Kara",
    "exampleTitle": "Exemple résolu — la caisse du supermarché du centre",
    "goal": "Poser des additions binaires sur 8 bits et détecter un débordement signé.",
    "brief": "<p><strong>Énoncé.</strong> La caisse électronique du marché de Kara additionne les compteurs de deux étals en binaire sur 8 bits, en complément à 2. Trois opérations de la journée sont à poser :</p><table><tr><th>Opération</th><th>Opération 1</th><th>Opération 2</th><th>Opération 3</th></tr><tr><th>Calcul</th><td>51 + 27</td><td>83 + (−45)</td><td>96 + 64</td></tr></table><p>Rappel du cours : les retenues se propagent de droite à gauche (1 + 1 = 0 retenue 1 ; 1 + 1 + 1 = 1 retenue 1) ; soustraire revient à additionner le complément à 2 ; deux nombres de même signe dont le résultat porte le signe opposé signalent un débordement signé. Répondez aux questions suivantes.</p><ol><li>Posez 51 + 27 : quel est le résultat en binaire sur 8 bits ?</li><li>Quel est le résultat décimal de 51 + 27 ?</li><li>Posez 83 + (−45) en complément à 2 : quel est le résultat sur 8 bits ?</li><li>Posez 96 + 64 : quel mot de 8 bits obtient-on ?</li><li>Y a-t-il débordement signé dans 96 + 64 ? Répondez par oui ou non.</li><li>Comment se lit le mot 10100000 en complément à 2 (décimal signé) ?</li></ol><p>Mots binaires sur 8 bits, avec ou sans espace entre les quartets ; la question 6 s'écrit avec le signe moins.</p>",
    "starter": "# Exercice — La caisse électronique du marché de Kara\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Mots binaires sur 8 bits avec ou sans espace ; question 5 : oui ou non ; question 6 : décimal signé.\n\n[Question 1 — 51 + 27 en binaire]\nA_COMPLETER\n\n[Question 2 — Résultat décimal de 51 + 27]\nA_COMPLETER\n\n[Question 3 — 83 + (-45) en binaire]\nA_COMPLETER\n\n[Question 4 — Mot obtenu pour 96 + 64]\nA_COMPLETER\n\n[Question 5 — Débordement signé dans 96 + 64]\nA_COMPLETER\n\n[Question 6 — Lecture signée du mot 10100000]\nA_COMPLETER\n",
    "hints": [
      "Posez l'addition bit par bit de droite à gauche : 1 + 1 = 0 retenue 1 ; 1 + 1 + 1 = 1 retenue 1.",
      "Pour 83 + (−45), écrivez d'abord −45 en complément à 2 sur 8 bits, puis additionnez comme d'habitude.",
      "Deux nombres positifs dont le mot résultat commence par 1 : le résultat sort de l'intervalle, donc débordement signé."
    ],
    "examples": [
      {
        "stdin": "La caisse du supermarché du centre pose 41 + 26 puis 70 + 60.\n\n1) 41 = 00101001 ; 26 = 00011010 ; 41 + 26 = 67, donc 01000011.\n2) 70 + 60 = 130, donc 10000010 : deux positifs donnent un MSB à 1, il y a débordement signé.\n3) Le mot 10000010 se lit 130 − 256 = −126.",
        "expected": "41 + 26 → 01000011 (67) — 70 + 60 → 10000010 : débordement — lecture : −126",
        "note": "Deux nombres de même signe dont le résultat porte le signe opposé : voilà le débordement signé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — 51 + 27 en binaire",
        "stdin": "q:1",
        "expected": "0100 1110||01001110"
      },
      {
        "label": "Question 2 — Résultat décimal de 51 + 27",
        "stdin": "q:2",
        "expected": "78"
      },
      {
        "label": "Question 3 — 83 + (-45) en binaire",
        "stdin": "q:3",
        "expected": "0010 0110||00100110"
      },
      {
        "label": "Question 4 — Mot obtenu pour 96 + 64",
        "stdin": "q:4",
        "expected": "1010 0000||10100000"
      },
      {
        "label": "Question 5 — Débordement signé dans 96 + 64",
        "stdin": "q:5",
        "expected": "oui"
      },
      {
        "label": "Question 6 — Lecture signée du mot 10100000",
        "stdin": "q:6",
        "expected": "-96||−96"
      }
    ],
    "solution": "[Question 1 — 51 + 27 en binaire]\n0100 1110\n\n[Question 2 — Résultat décimal de 51 + 27]\n78\n\n[Question 3 — 83 + (-45) en binaire]\n0010 0110\n\n[Question 4 — Mot obtenu pour 96 + 64]\n1010 0000\n\n[Question 5 — Débordement signé dans 96 + 64]\noui\n\n[Question 6 — Lecture signée du mot 10100000]\n-96",
    "takeaway": "1) 51 = 00110011 ; 27 = 00011011 ; 51 + 27 = 78, donc 01001110.\n2) 78 : le mot 01001110 se relit 64 + 8 + 4 + 2 = 78.\n3) −45 en complément à 2 : +45 = 00101101, C1 = 11010010, C2 = 11010011. Avec 83 = 01010011 : 01010011 + 11010011 = 00100110, donc 38. Contrôle : 83 − 45 = 38 = 32 + 4 + 2.\n4) 96 = 01100000 ; 64 = 01000000 ; 96 + 64 = 160, donc 10100000.\n5) Oui : deux nombres positifs donnent un mot dont le MSB vaut 1 — 160 dépasse la borne 127.\n6) 10100000 vaut 160 non signé ; 160 − 256 = −96.\nContrôle : 83 + 211 (= −45) = 294 = 256 + 38 : retenue sortante 1, et le résultat lu sur 8 bits est bien 00100110."
  },
  {
    "id": "ar-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Les portes logiques du portail du lycée",
    "exampleTitle": "Exemple résolu — les portes du portail du parking souterrain",
    "goal": "Identifier les portes ET, XOR et NAND et évaluer leurs sorties sur des essais réels.",
    "brief": "<p><strong>Énoncé.</strong> Le portail coulissant du lycée s'ouvre si la badgeuse (signal A) et l'horaire (signal B) le permettent. Le câbleur teste les portes une à une au pupitre. Les essais du jour :</p><table><tr><th>Essai</th><th>Essai 1</th><th>Essai 2</th><th>Essai 3</th></tr><tr><th>Signal A</th><td>1</td><td>1</td><td>0</td></tr><tr><th>Signal B</th><td>1</td><td>0</td><td>0</td></tr></table><p>Rappel du cours : la porte ET (AND) donne 1 si toutes les entrées valent 1 ; la porte XOR (OU exclusif) donne 1 si les entrées diffèrent ; la NAND est le ET nié ; une table de vérité à k entrées compte 2 puissance k lignes. Répondez aux questions suivantes.</p><ol><li>Quelle porte donne 1 quand ses entrées diffèrent ? Répondez par un seul mot.</li><li>Quelle porte donne 1 seulement si toutes ses entrées valent 1 ? Répondez par un seul mot.</li><li>À l'essai 2 (A = 1, B = 0), que vaut la sortie d'une porte XOR ?</li><li>À l'essai 1 (A = 1, B = 1), que vaut la sortie d'une porte NAND ?</li><li>Combien de lignes compte la table de vérité d'un circuit à 3 variables d'entrée ?</li></ol>",
    "starter": "# Exercice — Les portes logiques du portail du lycée\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 et 2 : un seul mot ; questions 3 à 5 : la valeur ou le nombre seul.\n\n[Question 1 — Porte qui détecte la différence]\nA_COMPLETER\n\n[Question 2 — Porte qui exige toutes les entrées à 1]\nA_COMPLETER\n\n[Question 3 — Sortie XOR à l'essai 2]\nA_COMPLETER\n\n[Question 4 — Sortie NAND à l'essai 1]\nA_COMPLETER\n\n[Question 5 — Lignes d'une table à 3 entrées]\nA_COMPLETER\n",
    "hints": [
      "Relisez les caractères des portes : ET exige tout, OU se contente d'un, XOR aime la différence.",
      "NAND est le ET nié : sa sortie vaut 0 exactement là où celle du ET vaut 1.",
      "Une table de vérité à k entrées compte 2 puissance k lignes."
    ],
    "examples": [
      {
        "stdin": "Le portail du parking souterrain utilise un capteur de présence P et une horaire H. Essais : P = 1, H = 1 ; puis P = 1, H = 0.\n\n1) La porte qui détecte la différence : XOR.\n2) Celle qui exige tout : ET.\n3) XOR avec P = 1, H = 1 : entrées égales, sortie 0.\n4) NAND avec P = 1, H = 0 : le ET vaudrait 0, donc NAND sort 1.\n5) 3 variables d'entrée : 8 lignes.",
        "expected": "xor — et — xor(1,1) : 0 — nand(1,0) : 1 — 3 variables : 8 lignes",
        "note": "ET exige tout, OU se contente d'un, XOR aime la différence ; NAND est le ET nié."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Porte qui détecte la différence",
        "stdin": "q:1",
        "expected": "xor||ou exclusif||ou-exclusif"
      },
      {
        "label": "Question 2 — Porte qui exige toutes les entrées à 1",
        "stdin": "q:2",
        "expected": "et||and"
      },
      {
        "label": "Question 3 — Sortie XOR à l'essai 2",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Sortie NAND à l'essai 1",
        "stdin": "q:4",
        "expected": "0"
      },
      {
        "label": "Question 5 — Lignes d'une table à 3 entrées",
        "stdin": "q:5",
        "expected": "8"
      }
    ],
    "solution": "[Question 1 — Porte qui détecte la différence]\nxor\n\n[Question 2 — Porte qui exige toutes les entrées à 1]\net\n\n[Question 3 — Sortie XOR à l'essai 2]\n1\n\n[Question 4 — Sortie NAND à l'essai 1]\n0\n\n[Question 5 — Lignes d'une table à 3 entrées]\n8",
    "takeaway": "1) Le OU exclusif (XOR) sort 1 quand les entrées diffèrent.\n2) Le ET (AND) ne sort 1 que si toutes ses entrées valent 1.\n3) Essai 2 : A = 1, B = 0, entrées différentes : XOR = 1.\n4) Essai 1 : A = 1, B = 1, le ET vaut 1, donc NAND = 0.\n5) 3 variables : 2 puissance 3 = 8 combinaisons, donc 8 lignes dans la table."
  },
  {
    "id": "ar-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "L'additionneur complet du totalisateur de l'atelier",
    "exampleTitle": "Exemple résolu — le totalisateur de l'atelier de conditionnement",
    "goal": "Évaluer la somme et la retenue d'un additionneur complet 1 bit.",
    "brief": "<p><strong>Énoncé.</strong> Le totalisateur de l'atelier d'embouteillage additionne les bits des compteurs de bouteilles à l'aide d'additionneurs complets 1 bit : somme S = a ⊕ b ⊕ r et retenue sortante = ab + r(a ⊕ b), où r est la retenue entrante. Deux configurations sont à vérifier :</p><table><tr><th>Configuration</th><th>Config 1</th><th>Config 2</th></tr><tr><th>a</th><td>1</td><td>1</td></tr><tr><th>b</th><td>1</td><td>0</td></tr><tr><th>r (retenue entrante)</th><td>1</td><td>0</td></tr></table><ol><li>Configuration 1 : que vaut la somme S ?</li><li>Configuration 1 : que vaut la retenue sortante ?</li><li>Configuration 2 : que vaut la somme S ?</li><li>Configuration 2 : que vaut la retenue sortante ?</li><li>Combien d'additionneurs complets faut-il en cascade pour additionner deux mots de 8 bits ?</li></ol>",
    "starter": "# Exercice — L'additionneur complet du totalisateur de l'atelier\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par la valeur ou le nombre seul.\n\n[Question 1 — Somme S pour la configuration 1]\nA_COMPLETER\n\n[Question 2 — Retenue sortante pour la configuration 1]\nA_COMPLETER\n\n[Question 3 — Somme S pour la configuration 2]\nA_COMPLETER\n\n[Question 4 — Retenue sortante pour la configuration 2]\nA_COMPLETER\n\n[Question 5 — Additionneurs complets pour deux mots de 8 bits]\nA_COMPLETER\n",
    "hints": [
      "L'additionneur complet additionne trois bits : a, b et la retenue entrante r.",
      "Le total vaut 0, 1, 2 ou 3 : S est le reste du total modulo 2 ; la retenue sortante est le quotient entier du total par 2.",
      "Contrôlez avec les formules : S = a ⊕ b ⊕ r ; retenue = ab + r(a ⊕ b). Un mot de n bits exige n additionneurs."
    ],
    "examples": [
      {
        "stdin": "Le totalisateur de l'atelier de conditionnement vérifie (a, b, r) = (1, 0, 1) puis (0, 1, 1) puis (1, 1, 0).\n\n1) (1, 0, 1) : total 2, donc S = 0 et retenue sortante 1.\n2) (0, 1, 1) : total 2, donc S = 0 et retenue sortante 1.\n3) (1, 1, 0) : total 2, donc S = 0 et retenue sortante 1.\n4) Deux mots de 4 bits exigent 4 additionneurs complets.",
        "expected": "(1,0,1) : S=0, r=1 — (0,1,1) : S=0, r=1 — (1,1,0) : S=0, r=1 — 4 bits : 4 additionneurs",
        "note": "Le total des trois bits vaut 0, 1, 2 ou 3 : S est le reste modulo 2, la retenue le quotient."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Somme S pour la configuration 1",
        "stdin": "q:1",
        "expected": "1"
      },
      {
        "label": "Question 2 — Retenue sortante pour la configuration 1",
        "stdin": "q:2",
        "expected": "1"
      },
      {
        "label": "Question 3 — Somme S pour la configuration 2",
        "stdin": "q:3",
        "expected": "1"
      },
      {
        "label": "Question 4 — Retenue sortante pour la configuration 2",
        "stdin": "q:4",
        "expected": "0"
      },
      {
        "label": "Question 5 — Additionneurs complets pour deux mots de 8 bits",
        "stdin": "q:5",
        "expected": "8"
      }
    ],
    "solution": "[Question 1 — Somme S pour la configuration 1]\n1\n\n[Question 2 — Retenue sortante pour la configuration 1]\n1\n\n[Question 3 — Somme S pour la configuration 2]\n1\n\n[Question 4 — Retenue sortante pour la configuration 2]\n0\n\n[Question 5 — Additionneurs complets pour deux mots de 8 bits]\n8",
    "takeaway": "1) Config 1 (a=1, b=1, r=1) : total = 3, S = 3 modulo 2 = 1. Avec la formule : 1 ⊕ 1 = 0, puis 0 ⊕ 1 = 1.\n2) Retenue = ab + r(a ⊕ b) = 1 + 1 × 0 = 1. Contrôle : 3 divisé par 2 donne quotient 1.\n3) Config 2 (a=1, b=0, r=0) : total = 1, S = 1 ⊕ 0 ⊕ 0 = 1.\n4) Retenue = ab + r(a ⊕ b) = 0 + 0 = 0. Contrôle : 1 divisé par 2 donne quotient 0.\n5) Un additionneur par colonne de bits : 8 additionneurs complets en cascade."
  },
  {
    "id": "ar-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "Decodeur 2 vers 4",
    "goal": "Activer une seule sortie parmi quatre selon les deux bits d'entrée.",
    "brief": "<p>Analysez chaque ligne proposée « a b » : a est le bit de poids faible et b le bit de poids fort. Les données donnent d'abord a puis b, mais l'adresse binaire s'écrit b puis a. Le décodeur active Y0 pour <code>ba=00</code>, Y1 pour <code>ba=01</code>, Y2 pour <code>ba=10</code> et Y3 pour <code>ba=11</code> : l'indice de la sortie active vaut <code>indice=2*b+a</code>. Ainsi, a=1 et b=0 donnent l'adresse 01 et activent Y1. Pour chaque ligne, indiquez <code>a b : Y3Y2Y1Y0 = XXXX</code> où XXXX est le mot de sortie, puis le bilan <code>decodages : n</code>.</p>",
    "starter": "# Grille d'analyse (ar-c4-e3) — Decodeur 2 vers 4\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Les quatre adresses]\n# Données : 4\n# Données : 0 1\n# Données : 1 1\n# Données : 0 0\n# Données : 1 0\nA_COMPLETER\n\n[Cas 2 — Alternance]\n# Données : 2\n# Données : 1 0\n# Données : 0 1\nA_COMPLETER\n\n[Cas 3 — Adresse haute]\n# Données : 1\n# Données : 1 1\nA_COMPLETER\n",
    "hints": [
      "L'indice de la sortie active vaut 2 fois b plus a.",
      "Un if imbrique ou un case sur les deux bits donne le mot de 4 caractères.",
      "Convertissez les deux bits d entrée (A1 A0) en indice i de 0 à 3 : seul le bit Y_i vaut 1 dans le quartet Y3Y2Y1Y0."
    ],
    "examples": [
      {
        "stdin": "3\n0 0\n1 0\n1 1\n",
        "expected": "0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\n1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 3"
      }
    ],
    "tests": [
      {
        "label": "Les quatre adresses",
        "stdin": "cas:1",
        "expected": "0 1 : Y3Y2Y1Y0 = 0100\n1 1 : Y3Y2Y1Y0 = 1000\n0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\ndecodages : 4"
      },
      {
        "label": "Alternance",
        "stdin": "cas:2",
        "expected": "1 0 : Y3Y2Y1Y0 = 0010\n0 1 : Y3Y2Y1Y0 = 0100\ndecodages : 2"
      },
      {
        "label": "Adresse haute",
        "stdin": "cas:3",
        "expected": "1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 1"
      }
    ],
    "solution": "[Exemple]\n0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\n1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 3\n\n[Cas 1 — Les quatre adresses]\n0 1 : Y3Y2Y1Y0 = 0100\n1 1 : Y3Y2Y1Y0 = 1000\n0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\ndecodages : 4\n\n[Cas 2 — Alternance]\n1 0 : Y3Y2Y1Y0 = 0010\n0 1 : Y3Y2Y1Y0 = 0100\ndecodages : 2\n\n[Cas 3 — Adresse haute]\n1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 1",
    "takeaway": "À retenir : Activer une seule sortie parmi quatre selon les deux bits d'entrée."
  },
  {
    "id": "ar-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "La bascule D de la barrière du parking du lycée",
    "exampleTitle": "Exemple résolu — la bascule D de la barrière du stade",
    "goal": "Dérouler le chronogramme d'une bascule D front par front.",
    "brief": "<p><strong>Énoncé.</strong> La barrière du parking du lycée mémorise son ordre d'ouverture dans une bascule D synchrone : à chaque front montant de l'horloge, Q recopie D ; entre deux fronts, si aucune entrée asynchrone n'agit, l'état se fige. L'état initial est Q = 0. Le technicien relève le chronogramme :</p><table><tr><th>Front</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><th>D</th><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr></table><ol><li>Que vaut Q juste après le front 1 ?</li><li>Entre les fronts 2 et 3, D passe brièvement à 1 : Q change-t-elle ? Répondez par oui ou non.</li><li>Que vaut Q après le front 3 ?</li><li>Quelle est la valeur finale de Q, après le front 5 ?</li><li>Combien de bits une bascule mémorise-t-elle ?</li></ol>",
    "starter": "# Exercice — La bascule D de la barrière du parking du lycée\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : oui ou non ; les autres : la valeur ou le nombre seul.\n\n[Question 1 — Q après le front 1]\nA_COMPLETER\n\n[Question 2 — Changement de Q sans front]\nA_COMPLETER\n\n[Question 3 — Q après le front 3]\nA_COMPLETER\n\n[Question 4 — Valeur finale de Q]\nA_COMPLETER\n\n[Question 5 — Bits mémorisés par une bascule]\nA_COMPLETER\n",
    "hints": [
      "La bascule D recopie D sur Q à chaque front d'horloge actif.",
      "Remplissez le chronogramme front par front ; entre deux fronts, la valeur précédente se conserve.",
      "Une bascule mémorise un état : c'est l'unité de mémorisation d'un bit."
    ],
    "examples": [
      {
        "stdin": "La barrière du stade, Q initiale 0, reçoit D = 0, 1, 1, 0 aux fronts successifs.\n\n1) Front 1 : D = 0, donc Q = 0.\n2) Front 2 : D = 1, donc Q = 1.\n3) Entre les fronts 2 et 3, D retombe : sans front, Q garde 1.\n4) Front 4 : D = 0, donc Q = 0. Valeur finale : 0.",
        "expected": "Q : 0 puis 1 — pas de changement sans front — valeur finale 0",
        "note": "La bascule D n'écoute que les fronts : entre eux, tout est figé."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Q après le front 1",
        "stdin": "q:1",
        "expected": "1"
      },
      {
        "label": "Question 2 — Changement de Q sans front",
        "stdin": "q:2",
        "expected": "non"
      },
      {
        "label": "Question 3 — Q après le front 3",
        "stdin": "q:3",
        "expected": "0"
      },
      {
        "label": "Question 4 — Valeur finale de Q",
        "stdin": "q:4",
        "expected": "1"
      },
      {
        "label": "Question 5 — Bits mémorisés par une bascule",
        "stdin": "q:5",
        "expected": "1"
      }
    ],
    "solution": "[Question 1 — Q après le front 1]\n1\n\n[Question 2 — Changement de Q sans front]\nnon\n\n[Question 3 — Q après le front 3]\n0\n\n[Question 4 — Valeur finale de Q]\n1\n\n[Question 5 — Bits mémorisés par une bascule]\n1",
    "takeaway": "1) Front 1 : D = 1, la bascule recopie, donc Q = 1.\n2) Non : sans front d'horloge, la bascule D garde son état (elle est figée entre les fronts).\n3) Front 3 : D = 0, donc Q = 0.\n4) Front 5 : D = 1, donc Q = 1. Chronogramme complet de Q : 1, 0, 0, 1, 1.\n5) Une bascule mémorise un bit (0 ou 1) : c'est le constituant de base des registres et des mémoires."
  },
  {
    "id": "ar-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Bascule JK",
    "goal": "Appliquer les quatre modes de la bascule JK : mémoriser, mettre à 1, mettre à 0, basculer.",
    "brief": "<p>Pour chaque cas, les données sont le nombre de fronts <code>n</code>, l'état initial <code>Q_initial</code> (0 ou 1), puis n paires de bits <code>J K</code>, dans cet ordre. Rappel du support : J=0 et K=0 mémorise l'état, J=1 et K=0 met Q à 1 (set), J=0 et K=1 met Q à 0 (reset), J=1 et K=1 fait <strong>basculer</strong> Q (toggle). À partir de Q_initial, indiquez après chaque front <code>front i : Q=X</code>, puis <code>etat final : Q=X</code>.</p>",
    "starter": "# Grille d'analyse (ar-c5-e2) — Bascule JK\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Basculements en serie]\n# Données : 5\n# Données : 0\n# Données : 1 1\n# Données : 1 1\n# Données : 1 1\n# Données : 0 0\n# Données : 0 1\nA_COMPLETER\n\n[Cas 2 — Reset, set puis toggle]\n# Données : 3\n# Données : 1\n# Données : 0 1\n# Données : 1 0\n# Données : 1 1\nA_COMPLETER\n\n[Cas 3 — Bascule, memoire puis set]\n# Données : 4\n# Données : 1\n# Données : 1 1\n# Données : 0 0\n# Données : 0 0\n# Données : 1 0\nA_COMPLETER\n",
    "hints": [
      "Partez de Q_initial, puis appliquez la règle à chaque front.",
      "00 conserve Q, 10 met Q à 1, 01 met Q à 0 et 11 inverse Q.",
      "J=0,K=0 mémorise Q ; J=1,K=0 force Q=1 ; J=0,K=1 force Q=0 ; J=1,K=1 inverse l état précédent Q à chaque front d horloge."
    ],
    "examples": [
      {
        "stdin": "4\n0\n1 0\n0 0\n1 1\n0 1\n",
        "expected": "front 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=0\nfront 4 : Q=0\netat final : Q=0"
      }
    ],
    "tests": [
      {
        "label": "Basculements en serie",
        "stdin": "cas:1",
        "expected": "front 1 : Q=1\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=1\nfront 5 : Q=0\netat final : Q=0"
      },
      {
        "label": "Reset, set puis toggle",
        "stdin": "cas:2",
        "expected": "front 1 : Q=0\nfront 2 : Q=1\nfront 3 : Q=0\netat final : Q=0"
      },
      {
        "label": "Bascule, memoire puis set",
        "stdin": "cas:3",
        "expected": "front 1 : Q=0\nfront 2 : Q=0\nfront 3 : Q=0\nfront 4 : Q=1\netat final : Q=1"
      }
    ],
    "solution": "[Exemple]\nfront 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=0\nfront 4 : Q=0\netat final : Q=0\n\n[Cas 1 — Basculements en serie]\nfront 1 : Q=1\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=1\nfront 5 : Q=0\netat final : Q=0\n\n[Cas 2 — Reset, set puis toggle]\nfront 1 : Q=0\nfront 2 : Q=1\nfront 3 : Q=0\netat final : Q=0\n\n[Cas 3 — Bascule, memoire puis set]\nfront 1 : Q=0\nfront 2 : Q=0\nfront 3 : Q=0\nfront 4 : Q=1\netat final : Q=1",
    "takeaway": "À retenir : Appliquer les quatre modes de la bascule JK : mémoriser, mettre à 1, mettre à 0, basculer."
  },
  {
    "id": "ar-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le compteur modulo 8 de la banque de quartier",
    "exampleTitle": "Exemple résolu — le compteur modulo 8 de la poste",
    "goal": "Simuler un compteur modulo 8 et relier le câblage JK à la division de fréquence.",
    "brief": "<p><strong>Énoncé.</strong> La banque de quartier affiche le numéro du client suivant sur un compteur modulo 8 à 3 bits : il parcourt les valeurs 0 à 7 puis revient à 0 ; valeur = (départ + fronts) modulo 8. Le matin, le guichet démarre à 5. Les étages du compteur sont des bascules JK câblées en bascule (J = K = 1) : un étage ne change d'état qu'un front sur deux, ce qui divise la fréquence par 2. Répondez aux questions suivantes.</p><ol><li>Écrivez la valeur de départ 5 en binaire sur 3 bits.</li><li>Quelle valeur le compteur affiche-t-il après 4 fronts ?</li><li>Écrivez cette valeur en binaire sur 3 bits.</li><li>Combien de fronts faut-il depuis 5 pour revenir à 0 ?</li><li>Un étage câblé J = K = 1 divise la fréquence d'entrée par combien ?</li></ol>",
    "starter": "# Exercice — Le compteur modulo 8 de la banque de quartier\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par la valeur ou le nombre seul.\n\n[Question 1 — Départ 5 en binaire sur 3 bits]\nA_COMPLETER\n\n[Question 2 — Valeur après 4 fronts]\nA_COMPLETER\n\n[Question 3 — Cette valeur en binaire sur 3 bits]\nA_COMPLETER\n\n[Question 4 — Fronts pour revenir à 0 depuis 5]\nA_COMPLETER\n\n[Question 5 — Division de fréquence d'un étage J = K = 1]\nA_COMPLETER\n",
    "hints": [
      "Un compteur modulo 8 avance d'une unité par front : valeur = (départ + fronts) modulo 8.",
      "Pour écrire sur 3 bits, décomposez la valeur en 4, 2 et 1.",
      "Pour revenir à 0 depuis une valeur v, il faut 8 − v fronts ; un étage J = K = 1 ne change d'état qu'un front sur deux."
    ],
    "examples": [
      {
        "stdin": "Le compteur de la poste démarre à 2.\n\n1) 2 en binaire sur 3 bits : 010.\n2) Après 5 fronts : (2 + 5) modulo 8 = 7, donc 111.\n3) Depuis 2, retour à 0 en 8 − 2 = 6 fronts.\n4) Un étage J = K = 1 divise la fréquence par 2.",
        "expected": "2 → 010 — 5 fronts plus tard : 7 — retour à 0 : 6 fronts — J=K=1 : division par 2",
        "note": "Le compteur avance modulo 8 : valeur = (départ + fronts) modulo 8."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Départ 5 en binaire sur 3 bits",
        "stdin": "q:1",
        "expected": "101"
      },
      {
        "label": "Question 2 — Valeur après 4 fronts",
        "stdin": "q:2",
        "expected": "1"
      },
      {
        "label": "Question 3 — Cette valeur en binaire sur 3 bits",
        "stdin": "q:3",
        "expected": "001"
      },
      {
        "label": "Question 4 — Fronts pour revenir à 0 depuis 5",
        "stdin": "q:4",
        "expected": "3"
      },
      {
        "label": "Question 5 — Division de fréquence d'un étage J = K = 1",
        "stdin": "q:5",
        "expected": "2"
      }
    ],
    "solution": "[Question 1 — Départ 5 en binaire sur 3 bits]\n101\n\n[Question 2 — Valeur après 4 fronts]\n1\n\n[Question 3 — Cette valeur en binaire sur 3 bits]\n001\n\n[Question 4 — Fronts pour revenir à 0 depuis 5]\n3\n\n[Question 5 — Division de fréquence d'un étage J = K = 1]\n2",
    "takeaway": "1) 5 = 4 + 1, donc 101.\n2) (5 + 4) modulo 8 = 9 modulo 8 = 1 : le compteur passe par 6, 7, 0, puis 1.\n3) 1 sur 3 bits : 001.\n4) Depuis 5, le compteur passe par 6, 7 puis 0 : 3 fronts (8 − 5 = 3).\n5) Un front sur deux fait changer Q : la fréquence d'entrée est divisée par 2."
  },
  {
    "id": "ar-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Les périphériques du poste de la bibliothèque",
    "exampleTitle": "Exemple résolu — les périphériques de la salle de projection",
    "goal": "Classer des périphériques en entrée, sortie ou entrée-sortie.",
    "brief": "<p><strong>Énoncé.</strong> La bibliothèque a reçu un poste complet. Le bordereau de livraison mentionne :</p><p><code>clavier — souris — scanner — écran — imprimante — haut-parleurs — écran tactile — clé USB — modem</code></p><p>Rappel du cours : les périphériques d'entrée envoient des données vers l'unité centrale, ceux de sortie en reçoivent, et les périphériques d'entrée-sortie font les deux. Répondez aux questions suivantes.</p><ol><li>Combien de ces périphériques sont d'entrée ?</li><li>Combien sont de sortie ?</li><li>Combien sont d'entrée-sortie ?</li><li>À quelle famille appartient l'écran tactile ? Répondez par un seul mot.</li><li>À quelle famille appartient l'imprimante ? Répondez par un seul mot.</li></ol>",
    "starter": "# Exercice — Les périphériques du poste de la bibliothèque\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 : le nombre seul ; questions 4 et 5 : un seul mot.\n\n[Question 1 — Nombre de périphériques d'entrée]\nA_COMPLETER\n\n[Question 2 — Nombre de périphériques de sortie]\nA_COMPLETER\n\n[Question 3 — Nombre de périphériques d'entrée-sortie]\nA_COMPLETER\n\n[Question 4 — Famille de l'écran tactile]\nA_COMPLETER\n\n[Question 5 — Famille de l'imprimante]\nA_COMPLETER\n",
    "hints": [
      "Classez selon le sens du flux : vers l'unité centrale (entrée), depuis l'unité centrale (sortie).",
      "Comptez chaque famille séparément en parcourant le bordereau ; contrôle : le total doit redonner les neuf périphériques.",
      "Un écran tactile affiche ET reçoit le toucher : il cumule les deux sens."
    ],
    "examples": [
      {
        "stdin": "La salle de projection a reçu : micro, vidéoprojecteur, casque, écran tactile, imprimante 3D, lecteur de carte.\n\n1) Entrée : le micro, soit 1.\n2) Sortie : vidéoprojecteur, casque, imprimante 3D, soit 3.\n3) Entrée-sortie : écran tactile, lecteur de carte, soit 2.\n4) Le vidéoprojecteur est un périphérique de sortie.",
        "expected": "1 entrée — 3 sorties — 2 entrée-sortie — vidéoprojecteur : sortie",
        "note": "Vers l'unité centrale : entrée ; depuis l'unité centrale : sortie ; dans les deux sens : entrée-sortie."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre de périphériques d'entrée",
        "stdin": "q:1",
        "expected": "3"
      },
      {
        "label": "Question 2 — Nombre de périphériques de sortie",
        "stdin": "q:2",
        "expected": "3"
      },
      {
        "label": "Question 3 — Nombre de périphériques d'entrée-sortie",
        "stdin": "q:3",
        "expected": "3"
      },
      {
        "label": "Question 4 — Famille de l'écran tactile",
        "stdin": "q:4",
        "expected": "entrée-sortie||entree sortie||e/s||entrée/sortie||les deux"
      },
      {
        "label": "Question 5 — Famille de l'imprimante",
        "stdin": "q:5",
        "expected": "sortie"
      }
    ],
    "solution": "[Question 1 — Nombre de périphériques d'entrée]\n3\n\n[Question 2 — Nombre de périphériques de sortie]\n3\n\n[Question 3 — Nombre de périphériques d'entrée-sortie]\n3\n\n[Question 4 — Famille de l'écran tactile]\nentrée-sortie\n\n[Question 5 — Famille de l'imprimante]\nsortie",
    "takeaway": "1) Entrée : clavier, souris, scanner, soit 3.\n2) Sortie : écran, imprimante, haut-parleurs, soit 3.\n3) Entrée-sortie : écran tactile, clé USB, modem, soit 3. Contrôle : 3 + 3 + 3 = 9, le bordereau est complet.\n4) L'écran tactile affiche (sortie) et reçoit le toucher (entrée) : entrée-sortie.\n5) L'imprimante ne produit que des sorties vers le papier : sortie."
  },
  {
    "id": "ar-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Les blocs de von Neumann du poste de comptabilité",
    "exampleTitle": "Exemple résolu — les blocs du poste de la salle des professeurs",
    "goal": "Placer chaque composant dans les quatre blocs du modèle de von Neumann.",
    "brief": "<p><strong>Énoncé.</strong> La comptable du lycée veut comprendre sa machine. La fiche de maintenance résume le modèle de von Neumann :</p><table><tr><th>Bloc</th><th>Rôle</th></tr><tr><th>UAL</th><td>exécute les calculs et comparaisons</td></tr><tr><th>Unité de contrôle</th><td>décode les instructions et orchestre le tout</td></tr><tr><th>Mémoire</th><td>conserve programmes et données (RAM volatile, ROM et disque permanents)</td></tr><tr><th>Entrées-sorties</th><td>relient la machine au monde extérieur</td></tr></table><p>Rappel du cours : dans l'idée fondatrice de von Neumann, le programme est stocké dans la même mémoire que les données. Répondez aux questions suivantes.</p><ol><li>Quel bloc exécute les calculs ? Répondez par son sigle.</li><li>Quel bloc décode les instructions ? Répondez en un seul mot.</li><li>À quel bloc appartiennent le clavier et l'écran ? Répondez en un seul mot.</li><li>Le programme est stocké dans la même ... que les données : quel mot complète ? Répondez en un seul mot.</li><li>La RAM est-elle volatile ou permanente ? Répondez en un seul mot.</li></ol>",
    "starter": "# Exercice — Les blocs de von Neumann du poste de comptabilité\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en un seul mot ou par le sigle.\n\n[Question 1 — Bloc qui exécute les calculs]\nA_COMPLETER\n\n[Question 2 — Bloc qui décode les instructions]\nA_COMPLETER\n\n[Question 3 — Bloc du clavier et de l'écran]\nA_COMPLETER\n\n[Question 4 — Le programme est stocké dans la même ...]\nA_COMPLETER\n\n[Question 5 — RAM volatile ou permanente]\nA_COMPLETER\n",
    "hints": [
      "Quatre blocs, quatre verbes : l'UAL calcule, l'unité de contrôle commande, la mémoire se souvient, les E/S communiquent.",
      "L'idée fondatrice de von Neumann : le programme est stocké en mémoire, comme les données.",
      "La RAM s'efface hors tension ; la ROM et le disque sont permanents."
    ],
    "examples": [
      {
        "stdin": "Le poste de la salle des professeurs suit le même modèle.\n\n1) Les calculs et comparaisons : l'UAL.\n2) Le BIOS/UEFI initialise la machine au démarrage.\n3) La ROM est permanente.\n4) Le clavier et l'écran forment le bloc des entrées-sorties.",
        "expected": "calculs : ual — bios/uefi : initialisation — rom : permanente — clavier/ecran : es",
        "note": "Quatre verbes : calculer (UAL), commander (contrôle), se souvenir (mémoire), communiquer (E/S)."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Bloc qui exécute les calculs",
        "stdin": "q:1",
        "expected": "ual||l'ual||unite arithmetique et logique||l'unite arithmetique et logique"
      },
      {
        "label": "Question 2 — Bloc qui décode les instructions",
        "stdin": "q:2",
        "expected": "unite de controle||l'unite de controle||ucc||unite de commande"
      },
      {
        "label": "Question 3 — Bloc du clavier et de l'écran",
        "stdin": "q:3",
        "expected": "entrees-sorties||e/s||entree sortie||les entrees-sorties"
      },
      {
        "label": "Question 4 — Le programme est stocké dans la même ...",
        "stdin": "q:4",
        "expected": "memoire||la memoire"
      },
      {
        "label": "Question 5 — RAM volatile ou permanente",
        "stdin": "q:5",
        "expected": "volatile"
      }
    ],
    "solution": "[Question 1 — Bloc qui exécute les calculs]\nual\n\n[Question 2 — Bloc qui décode les instructions]\nunite de controle\n\n[Question 3 — Bloc du clavier et de l'écran]\nentrees-sorties\n\n[Question 4 — Le programme est stocké dans la même ...]\nmemoire\n\n[Question 5 — RAM volatile ou permanente]\nvolatile",
    "takeaway": "1) L'unité arithmétique et logique (UAL) exécute calculs et comparaisons.\n2) L'unité de contrôle décode les instructions et synchronise le tout.\n3) Le clavier et l'écran dialoguent avec l'extérieur : le bloc des entrées-sorties.\n4) Le programme est stocké dans la même mémoire que les données : d'où la machine universelle et programmable.\n5) La RAM est volatile : son contenu disparaît à la coupure de courant (la ROM et le disque sont permanents)."
  },
  {
    "id": "ar-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Qualifier les postes de la salle multimédia",
    "exampleTitle": "Exemple résolu — qualifier les postes de la salle de recherche",
    "goal": "Qualifier un poste selon les seuils fréquence/RAM et citer les critères de choix d'un processeur.",
    "brief": "<p><strong>Énoncé.</strong> La direction veut qualifier les postes de la salle multimédia. Rappel des seuils du cours : un poste <strong>multimédia</strong> exige une fréquence d'au moins 2000 MHz ET au moins 4096 Mo de RAM ; un poste <strong>bureautique</strong> exige au moins 1000 MHz ET au moins 2048 Mo ; en dessous, le poste est <strong>basique</strong>. Les trois postes :</p><table><tr><th>Poste</th><th>Poste A</th><th>Poste B</th><th>Poste C</th></tr><tr><th>Fréquence</th><td>2400 MHz</td><td>1800 MHz</td><td>900 MHz</td></tr><tr><th>RAM</th><td>4096 Mo</td><td>2048 Mo</td><td>2048 Mo</td></tr></table><p>Les quatre critères de choix d'un processeur : fréquence, nombre de cœurs, cache, socket. Répondez aux questions suivantes.</p><ol><li>Quel est le profil du poste A ? Répondez en un seul mot.</li><li>Quel est le profil du poste B ? Répondez en un seul mot.</li><li>Quel est le profil du poste C ? Répondez en un seul mot.</li><li>Après la fréquence, le nombre de cœurs et le cache, quel est le quatrième critère de choix d'un processeur ? Répondez en un seul mot.</li><li>Sur quel slot branche-t-on une carte graphique dédiée ? Répondez en un seul mot.</li></ol>",
    "starter": "# Exercice — Qualifier les postes de la salle multimédia\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez en un seul mot (le profil, le critère ou le slot).\n\n[Question 1 — Profil du poste A]\nA_COMPLETER\n\n[Question 2 — Profil du poste B]\nA_COMPLETER\n\n[Question 3 — Profil du poste C]\nA_COMPLETER\n\n[Question 4 — Quatrième critère de choix du processeur]\nA_COMPLETER\n\n[Question 5 — Slot de la carte graphique dédiée]\nA_COMPLETER\n",
    "hints": [
      "Testez d'abord le profil le plus exigeant : multimédia exige les deux critères à la fois.",
      "Si un seul des deux critères manque, le poste descend d'un cran : bureautique, puis basique.",
      "Le quatrième critère du processeur est la compatibilité avec le support de la carte mère ; la carte graphique dédiée se branche sur le slot haut débit."
    ],
    "examples": [
      {
        "stdin": "La salle de recherche possède : poste D (3200 MHz, 8192 Mo), poste E (1200 MHz, 1024 Mo), poste F (1600 MHz, 4096 Mo).\n\n1) Poste D : 3200 ≥ 2000 et 8192 ≥ 4096, donc multimédia.\n2) Poste E : fréquence suffisante mais 1024 < 2048, donc basique.\n3) Poste F : 1600 < 2000 (pas multimédia) ; 1600 ≥ 1000 et 4096 ≥ 2048, donc bureautique.",
        "expected": "D : multimédia — E : basique — F : bureautique",
        "note": "Testez le profil le plus exigeant d'abord, et exigez les deux critères à la fois."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Profil du poste A",
        "stdin": "q:1",
        "expected": "multimédia||multimedia"
      },
      {
        "label": "Question 2 — Profil du poste B",
        "stdin": "q:2",
        "expected": "bureautique"
      },
      {
        "label": "Question 3 — Profil du poste C",
        "stdin": "q:3",
        "expected": "basique"
      },
      {
        "label": "Question 4 — Quatrième critère de choix du processeur",
        "stdin": "q:4",
        "expected": "socket||compatibilite socket||la compatibilite socket"
      },
      {
        "label": "Question 5 — Slot de la carte graphique dédiée",
        "stdin": "q:5",
        "expected": "pcie||pci express||pci-express||pcie x16"
      }
    ],
    "solution": "[Question 1 — Profil du poste A]\nmultimédia\n\n[Question 2 — Profil du poste B]\nbureautique\n\n[Question 3 — Profil du poste C]\nbasique\n\n[Question 4 — Quatrième critère de choix du processeur]\nsocket\n\n[Question 5 — Slot de la carte graphique dédiée]\npcie",
    "takeaway": "1) Poste A : 2400 ≥ 2000 et 4096 ≥ 4096, donc multimédia.\n2) Poste B : 1800 < 2000 (pas multimédia) ; 1800 ≥ 1000 et 2048 ≥ 2048, donc bureautique.\n3) Poste C : 900 < 1000, donc basique (une RAM suffisante ne rattrape pas une fréquence trop faible).\n4) Le quatrième critère est le socket : la compatibilité processeur/carte mère — avec la fréquence, les cœurs et le cache.\n5) La carte graphique dédiée se branche sur un slot PCIe."
  }
];
