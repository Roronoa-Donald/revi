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
    "goal": "Appliquer la formule Risque = Menace × Vulnérabilité × Impact sur une liste d’actifs.",
    "brief": "<p>Analysez chaque ligne proposée « menace vulnérabilité » (deux entiers de 1 à 3). Pour chaque actif il calcule la somme et Indiquez <code>actif K : niveau</code>, où K est le numéro de la ligne (à partir de 1) et niveau vaut <code>Faible</code> (somme 2 ou 3), <code>Moyenne</code> (somme 4 ou 5) ou <code>Critique</code> (somme 6).</p>",
    "starter": "# Grille d'analyse (cy-c1-e1) — Calculateur de risque\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Faible et moyen]\n# Données : 2\n# Données : 1 1\n# Données : 2 3\nA_COMPLETER\n\n[Cas 2 — Quatre actifs mixtes]\n# Données : 4\n# Données : 2 2\n# Données : 1 3\n# Données : 3 3\n# Données : 1 1\nA_COMPLETER\n\n[Cas 3 — Cinq actifs]\n# Données : 5\n# Données : 3 2\n# Données : 2 2\n# Données : 1 1\n# Données : 2 3\n# Données : 3 3\nA_COMPLETER\n",
    "hints": [
      "Le numéro de l’actif est déjà la variable i de la boucle : inutile de le lire.",
      "Trois plages de somme : 2-3, 4-5, 6. Un if/elif/else suffit après avoir calculé somme=$((menace + vuln))."
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
    "solution": "[Exemple]\nactif 1 : Faible\nactif 2 : Critique\nactif 3 : Faible\n\n[Cas 1 — Faible et moyen]\nactif 1 : Faible\nactif 2 : Moyenne\n\n[Cas 2 — Quatre actifs mixtes]\nactif 1 : Moyenne\nactif 2 : Moyenne\nactif 3 : Critique\nactif 4 : Faible\n\n[Cas 3 — Cinq actifs]\nactif 1 : Moyenne\nactif 2 : Moyenne\nactif 3 : Faible\nactif 4 : Moyenne\nactif 5 : Critique"
  },
  {
    "id": "cy-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Police de la triade CIA",
    "goal": "Classer des menaces selon la composante de la triade CIA qu’elles violent, puis dresser le bilan.",
    "brief": "<p>Analysez chaque ligne proposée « lettre menace » : lettre vaut C (confidentialité), I (intégrité) ou D (disponibilité). Pour chaque ligne il Indiquez <code>lettre : menace</code>. Enfin il Indiquez <code>bilan : X/n protégées</code>, X étant le nombre de lettres <em>distinctes</em> rencontrées : une menace n’est contenue que si la composante visée est protégée.</p>",
    "starter": "# Grille d'analyse (cy-c1-e2) — Police de la triade CIA\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule menace]\n# Données : 1\n# Données : C ecoute\nA_COMPLETER\n\n[Cas 2 — Deux composantes]\n# Données : 3\n# Données : C vol\n# Données : C vol\n# Données : I altération\nA_COMPLETER\n\n[Cas 3 — Deux composantes, autre répartition]\n# Données : 4\n# Données : D panne\n# Données : D panne\n# Données : I fuite\n# Données : I fuite\nA_COMPLETER\n",
    "hints": [
      "Trois drapeaux (un par lettre) valent mieux qu’un tableau : ils passent à 1 quand la lettre apparaît.",
      "Le nombre de lettres distinctes est la somme des trois drapeaux à la fin."
    ],
    "examples": [
      {
        "stdin": "5\nC stockage\nI interception\nC divulgation\nD ransomware\nD coupure\n",
        "expected": "C : stockage\nI : interception\nC : divulgation\nD : ransomware\nD : coupure\nbilan : 3/5 protégées"
      }
    ],
    "tests": [
      {
        "label": "Une seule menace",
        "stdin": "cas:1",
        "expected": "C : ecoute\nbilan : 1/1 protégées"
      },
      {
        "label": "Deux composantes",
        "stdin": "cas:2",
        "expected": "C : vol\nC : vol\nI : altération\nbilan : 2/3 protégées"
      },
      {
        "label": "Deux composantes, autre répartition",
        "stdin": "cas:3",
        "expected": "D : panne\nD : panne\nI : fuite\nI : fuite\nbilan : 2/4 protégées"
      }
    ],
    "solution": "[Exemple]\nC : stockage\nI : interception\nC : divulgation\nD : ransomware\nD : coupure\nbilan : 3/5 protégées\n\n[Cas 1 — Une seule menace]\nC : ecoute\nbilan : 1/1 protégées\n\n[Cas 2 — Deux composantes]\nC : vol\nC : vol\nI : altération\nbilan : 2/3 protégées\n\n[Cas 3 — Deux composantes, autre répartition]\nD : panne\nD : panne\nI : fuite\nI : fuite\nbilan : 2/4 protégées"
  },
  {
    "id": "cy-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Historique des incidents",
    "goal": "Relire une chronologie d’incidents célèbres et en extraire les bornes, pour ancrer les dates du cours.",
    "brief": "<p>Analysez chaque ligne proposée « annee nom » (année <code>&lt;</code> 9999, nom sans espace). Il réIndiquez chaque ligne telle quelle, puis conclut par trois lignes : <code>plus ancien : annee nom</code>, <code>plus recent : annee nom</code> et <code>enseignement : les incidents s'enchaînent, la vigilance aussi</code>.</p>",
    "starter": "# Grille d'analyse (cy-c1-e3) — Historique des incidents\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux incidents]\n# Données : 2\n# Données : 2021 Log4Shell\n# Données : 2017 WannaCry\nA_COMPLETER\n\n[Cas 2 — Trois incidents]\n# Données : 3\n# Données : 1988 Morris\n# Données : 2024 XZ Utils\n# Données : 2013 CryptoLocker\nA_COMPLETER\n\n[Cas 3 — Quatre incidents du siècle]\n# Données : 4\n# Données : 2000 ILOVEYOU\n# Données : 2008 Conficker\n# Données : 2010 Stuxnet\n# Données : 2019 Emotet\nA_COMPLETER\n",
    "hints": [
      "Gardez la ligne complète (année et nom) dans une variable, pas seulement l’année : l’affichage final la réclame.",
      "Deux comparaisons par ligne : -lt pour le plus ancien, -gt pour le plus récent."
    ],
    "examples": [
      {
        "stdin": "5\n2017 WannaCry\n2013 CryptoLocker\n1988 Morris\n2021 Log4Shell\n2024 XZ Utils\n",
        "expected": "2017 WannaCry\n2013 CryptoLocker\n1988 Morris\n2021 Log4Shell\n2024 XZ Utils\nplus ancien : 1988 Morris\nplus recent : 2024 XZ Utils\nenseignement : les incidents s'enchaînent, la vigilance aussi"
      }
    ],
    "tests": [
      {
        "label": "Deux incidents",
        "stdin": "cas:1",
        "expected": "2021 Log4Shell\n2017 WannaCry\nplus ancien : 2017 WannaCry\nplus recent : 2021 Log4Shell\nenseignement : les incidents s'enchaînent, la vigilance aussi"
      },
      {
        "label": "Trois incidents",
        "stdin": "cas:2",
        "expected": "1988 Morris\n2024 XZ Utils\n2013 CryptoLocker\nplus ancien : 1988 Morris\nplus recent : 2024 XZ Utils\nenseignement : les incidents s'enchaînent, la vigilance aussi"
      },
      {
        "label": "Quatre incidents du siècle",
        "stdin": "cas:3",
        "expected": "2000 ILOVEYOU\n2008 Conficker\n2010 Stuxnet\n2019 Emotet\nplus ancien : 2000 ILOVEYOU\nplus recent : 2019 Emotet\nenseignement : les incidents s'enchaînent, la vigilance aussi"
      }
    ],
    "solution": "[Exemple]\n2017 WannaCry\n2013 CryptoLocker\n1988 Morris\n2021 Log4Shell\n2024 XZ Utils\nplus ancien : 1988 Morris\nplus recent : 2024 XZ Utils\nenseignement : les incidents s'enchaînent, la vigilance aussi\n\n[Cas 1 — Deux incidents]\n2021 Log4Shell\n2017 WannaCry\nplus ancien : 2017 WannaCry\nplus recent : 2021 Log4Shell\nenseignement : les incidents s'enchaînent, la vigilance aussi\n\n[Cas 2 — Trois incidents]\n1988 Morris\n2024 XZ Utils\n2013 CryptoLocker\nplus ancien : 1988 Morris\nplus recent : 2024 XZ Utils\nenseignement : les incidents s'enchaînent, la vigilance aussi\n\n[Cas 3 — Quatre incidents du siècle]\n2000 ILOVEYOU\n2008 Conficker\n2010 Stuxnet\n2019 Emotet\nplus ancien : 2000 ILOVEYOU\nplus recent : 2019 Emotet\nenseignement : les incidents s'enchaînent, la vigilance aussi"
  },
  {
    "id": "cy-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Diagnostic des malwares",
    "goal": "Associer à chaque famille de malware la première mesure qui s’impose.",
    "brief": "<p>Analysez chaque ligne proposée « famille cible » : famille vaut <code>ransomware</code>, <code>virus</code>, <code>ver</code> ou <code>spyware</code>. Pour chaque ligne il Indiquez <code>famille cible : mesure</code> avec : restaure une sauvegarde hors ligne (ransomware), supprime et re-scanne (virus), isole la machine du réseau (ver), change les mots de passe (spyware). Enfin <code>rapport : n malwares</code>.</p>",
    "starter": "# Grille d'analyse (cy-c2-e1) — Diagnostic des malwares\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Ver et virus]\n# Données : 2\n# Données : ver partage\n# Données : virus jeu.exe\nA_COMPLETER\n\n[Cas 2 — Ransomware et spyware]\n# Données : 3\n# Données : ransomware disque\n# Données : spyware tache\n# Données : ransomware sauvegarde\nA_COMPLETER\n\n[Cas 3 — Cinq familles mélangées]\n# Données : 5\n# Données : virus a.exe\n# Données : ver b\n# Données : spyware c\n# Données : ver d\n# Données : virus e.exe\nA_COMPLETER\n",
    "hints": [
      "Un case à quatre branches couvre exactement les quatre familles.",
      "Le rapport final affiche n : le compteur total existe déjà, il ne reste qu’à l’afficher après la boucle."
    ],
    "examples": [
      {
        "stdin": "6\nransomware rapport.pdf\nvirus photo.exe\nver cle_usb\nspyware navigateur\nvirus installateur.exe\nspyware clavier\n",
        "expected": "ransomware rapport.pdf : restaure une sauvegarde hors ligne\nvirus photo.exe : supprime et re-scanne\nver cle_usb : isole la machine du réseau\nspyware navigateur : change les mots de passe\nvirus installateur.exe : supprime et re-scanne\nspyware clavier : change les mots de passe\nrapport : 6 malwares"
      }
    ],
    "tests": [
      {
        "label": "Ver et virus",
        "stdin": "cas:1",
        "expected": "ver partage : isole la machine du réseau\nvirus jeu.exe : supprime et re-scanne\nrapport : 2 malwares"
      },
      {
        "label": "Ransomware et spyware",
        "stdin": "cas:2",
        "expected": "ransomware disque : restaure une sauvegarde hors ligne\nspyware tache : change les mots de passe\nransomware sauvegarde : restaure une sauvegarde hors ligne\nrapport : 3 malwares"
      },
      {
        "label": "Cinq familles mélangées",
        "stdin": "cas:3",
        "expected": "virus a.exe : supprime et re-scanne\nver b : isole la machine du réseau\nspyware c : change les mots de passe\nver d : isole la machine du réseau\nvirus e.exe : supprime et re-scanne\nrapport : 5 malwares"
      }
    ],
    "solution": "[Exemple]\nransomware rapport.pdf : restaure une sauvegarde hors ligne\nvirus photo.exe : supprime et re-scanne\nver cle_usb : isole la machine du réseau\nspyware navigateur : change les mots de passe\nvirus installateur.exe : supprime et re-scanne\nspyware clavier : change les mots de passe\nrapport : 6 malwares\n\n[Cas 1 — Ver et virus]\nver partage : isole la machine du réseau\nvirus jeu.exe : supprime et re-scanne\nrapport : 2 malwares\n\n[Cas 2 — Ransomware et spyware]\nransomware disque : restaure une sauvegarde hors ligne\nspyware tache : change les mots de passe\nransomware sauvegarde : restaure une sauvegarde hors ligne\nrapport : 3 malwares\n\n[Cas 3 — Cinq familles mélangées]\nvirus a.exe : supprime et re-scanne\nver b : isole la machine du réseau\nspyware c : change les mots de passe\nver d : isole la machine du réseau\nvirus e.exe : supprime et re-scanne\nrapport : 5 malwares"
  },
  {
    "id": "cy-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Score de mot de passe",
    "goal": "Implémenter une politique de mots de passe : liste noire, longueur minimale, verdict.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Pour chacun il Indiquez <code>mdp_minuscules : verdict</code> : <code>faible</code> s’il figure (en minuscules) dans la liste noire <code>123456 password motdepasse autruche azerty qwerty 2024 2025 ete</code> ou s’il fait moins de 8 caractères ; <code>fort</code> s’il en fait 12 ou plus ; <code>moyen</code> sinon. Le mot affiché est la version minuscules du mot de passe.</p>",
    "starter": "# Grille d'analyse (cy-c2-e2) — Score de mot de passe\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux mots de passe usuels]\n# Données : 2\n# Données : password\n# Données : MotDePasse1\nA_COMPLETER\n\n[Cas 2 — Un moyen au milieu]\n# Données : 3\n# Données : Bonjour2024\n# Données : chaton99xx\n# Données : Bonjour\nA_COMPLETER\n\n[Cas 3 — Fort, faible, court]\n# Données : 3\n# Données : Mot2PasseLong!\n# Données : Ete2024\n# Données : chat\nA_COMPLETER\n",
    "hints": [
      "minuscules=$(echo \"$mdp\" | tr '[:upper:]' '[:lower:]') puis parcourir la liste noire avec un case « *mot* ».",
      "La longueur s’obtient avec ${#mdp} : moins de 8 c’est faible, 12 ou plus c’est fort — teste la liste noire d’abord, la longueur ensuite."
    ],
    "examples": [
      {
        "stdin": "5\nAutruche2024\nkP9!v$2zR#mQ\n123456\nLeChatBleuMangeUnePomme!\nete2025!\n",
        "expected": "autruche2024 : faible\nkp9!v$2zr#mq : fort\n123456 : faible\nlechatbleumangeunepomme! : fort\nete2025! : faible"
      }
    ],
    "tests": [
      {
        "label": "Deux mots de passe usuels",
        "stdin": "cas:1",
        "expected": "password : faible\nmotdepasse1 : faible"
      },
      {
        "label": "Un moyen au milieu",
        "stdin": "cas:2",
        "expected": "bonjour2024 : faible\nchaton99xx : moyen\nbonjour : faible"
      },
      {
        "label": "Fort, faible, court",
        "stdin": "cas:3",
        "expected": "mot2passelong! : fort\nete2024 : faible\nchat : faible"
      }
    ],
    "solution": "[Exemple]\nautruche2024 : faible\nkp9!v$2zr#mq : fort\n123456 : faible\nlechatbleumangeunepomme! : fort\nete2025! : faible\n\n[Cas 1 — Deux mots de passe usuels]\npassword : faible\nmotdepasse1 : faible\n\n[Cas 2 — Un moyen au milieu]\nbonjour2024 : faible\nchaton99xx : moyen\nbonjour : faible\n\n[Cas 3 — Fort, faible, court]\nmot2passelong! : fort\nete2024 : faible\nchat : faible"
  },
  {
    "id": "cy-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "Détection de phishing",
    "goal": "Retrouver les indices d’hameçonnage d’une URL à partir de son type.",
    "brief": "<p>Analysez chaque ligne proposée « type url » : type vaut <code>https</code>, <code>http</code>, <code>ip</code> (URL en adresse IP) ou <code>domaine</code> (nom trompeur en .info/.tk). Pour chaque ligne il Indiquez <code>type url : etiquette</code> : <code>normal</code> (https), <code>nom trompeur</code> (http), <code>pas de nom</code> (ip), <code>domaine douteux</code> (domaine). Enfin <code>soupçons : X/n</code> où X compte les lignes non « normal ».</p>",
    "starter": "# Grille d'analyse (cy-c2-e3) — Détection de phishing\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une IP et un https]\n# Données : 2\n# Données : ip 10.0.0.2\n# Données : https adresse.gouv.fr\nA_COMPLETER\n\n[Cas 2 — Domaine douteux et http]\n# Données : 3\n# Données : domaine microsoft-securite.tk\n# Données : http portail.fr\n# Données : https ecli.bzh\nA_COMPLETER\n\n[Cas 3 — Cinq URL variées]\n# Données : 5\n# Données : https ssl.gouv.fr\n# Données : ip 172.16.0.9\n# Données : domaine compte-ameli.info\n# Données : http suivi-colis.fr\n# Données : https git.bzh\nA_COMPLETER\n",
    "hints": [
      "Le case doit tester https AVANT http : autrement le motif http matcherait aussi les URL https.",
      "Une étiquette différente de « normal » fait monter le compteur de soupçons d’un cran."
    ],
    "examples": [
      {
        "stdin": "5\nhttps banque-exemple.fr\nhttp banque-securite.fr\nip 192.168.12.7\ndomaine paypal-compte.info\nhttps impots.gouv.fr\n",
        "expected": "https banque-exemple.fr : normal\nhttp banque-securite.fr : nom trompeur\nip 192.168.12.7 : pas de nom\ndomaine paypal-compte.info : domaine douteux\nhttps impots.gouv.fr : normal\nsoupçons : 3/5"
      }
    ],
    "tests": [
      {
        "label": "Une IP et un https",
        "stdin": "cas:1",
        "expected": "ip 10.0.0.2 : pas de nom\nhttps adresse.gouv.fr : normal\nsoupçons : 1/2"
      },
      {
        "label": "Domaine douteux et http",
        "stdin": "cas:2",
        "expected": "domaine microsoft-securite.tk : domaine douteux\nhttp portail.fr : nom trompeur\nhttps ecli.bzh : normal\nsoupçons : 2/3"
      },
      {
        "label": "Cinq URL variées",
        "stdin": "cas:3",
        "expected": "https ssl.gouv.fr : normal\nip 172.16.0.9 : pas de nom\ndomaine compte-ameli.info : domaine douteux\nhttp suivi-colis.fr : nom trompeur\nhttps git.bzh : normal\nsoupçons : 3/5"
      }
    ],
    "solution": "[Exemple]\nhttps banque-exemple.fr : normal\nhttp banque-securite.fr : nom trompeur\nip 192.168.12.7 : pas de nom\ndomaine paypal-compte.info : domaine douteux\nhttps impots.gouv.fr : normal\nsoupçons : 3/5\n\n[Cas 1 — Une IP et un https]\nip 10.0.0.2 : pas de nom\nhttps adresse.gouv.fr : normal\nsoupçons : 1/2\n\n[Cas 2 — Domaine douteux et http]\ndomaine microsoft-securite.tk : domaine douteux\nhttp portail.fr : nom trompeur\nhttps ecli.bzh : normal\nsoupçons : 2/3\n\n[Cas 3 — Cinq URL variées]\nhttps ssl.gouv.fr : normal\nip 172.16.0.9 : pas de nom\ndomaine compte-ameli.info : domaine douteux\nhttp suivi-colis.fr : nom trompeur\nhttps git.bzh : normal\nsoupçons : 3/5"
  },
  {
    "id": "cy-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Compteur de clés",
    "goal": "Vérifier par le calcul pourquoi le chiffrement symétrique ne passe pas à l’échelle.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Il cumule le total, puis Indiquez le nombre de clés secrètes nécessaires : <code>symétrique : k(k-1)/2 clés</code> contre <code>asymétrique : 2×k(k-1)/2 clés</code> — soit une paire de clés par machine, avec k le total de machines.</p>",
    "starter": "# Grille d'analyse (cy-c3-e1) — Compteur de clés\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul groupe]\n# Données : 1\n# Données : 4\nA_COMPLETER\n\n[Cas 2 — Trois groupes]\n# Données : 3\n# Données : 2\n# Données : 10\n# Données : 6\nA_COMPLETER\n\n[Cas 3 — Deux gros groupes]\n# Données : 2\n# Données : 25\n# Données : 50\nA_COMPLETER\n",
    "hints": [
      "Pour un réseau de N machines en chiffrement symétrique, le nombre de clés partagées nécessaires vaut N × (N - 1) / 2.",
      "En chiffrement asymétrique, chaque machine dispose d’une paire de clés (publique et privée), soit 2 × N clés au total."
    ],
    "examples": [
      {
        "stdin": "5\n8\n3\n9\n2\n5\n",
        "expected": "symétrique : 351 clés\nasymétrique : 702 clés"
      }
    ],
    "tests": [
      {
        "label": "Un seul groupe",
        "stdin": "cas:1",
        "expected": "symétrique : 6 clés\nasymétrique : 12 clés"
      },
      {
        "label": "Trois groupes",
        "stdin": "cas:2",
        "expected": "symétrique : 153 clés\nasymétrique : 306 clés"
      },
      {
        "label": "Deux gros groupes",
        "stdin": "cas:3",
        "expected": "symétrique : 2775 clés\nasymétrique : 5550 clés"
      }
    ],
    "solution": "[Exemple]\nsymétrique : 351 clés\nasymétrique : 702 clés\n\n[Cas 1 — Un seul groupe]\nsymétrique : 6 clés\nasymétrique : 12 clés\n\n[Cas 2 — Trois groupes]\nsymétrique : 153 clés\nasymétrique : 306 clés\n\n[Cas 3 — Deux gros groupes]\nsymétrique : 2775 clés\nasymétrique : 5550 clés"
  },
  {
    "id": "cy-c3-e2",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "Vérificateur de 2FA",
    "goal": "Appliquer la règle des deux facteurs : deux catégories différentes, sinon refus.",
    "brief": "<p>Analysez chaque ligne proposée « preuve categorie » : preuve vaut <code>password</code>, <code>code_totp</code>, <code>code_sms</code> ou <code>empreinte</code> ; categorie vaut <code>connaissance</code>, <code>possession</code> ou <code>inherence</code>. Le verdict par ligne : <code>ok</code> (password+connaissance, code_totp+possession), <code>fragile</code> (code_sms+possession, SMS interceptable), <code>refusé</code> (toute autre combinaison). Enfin <code>bilan : a solides, b fragile, c refusés</code>.</p>",
    "starter": "# Grille d'analyse (cy-c3-e2) — Vérificateur de 2FA\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une preuve valide]\n# Données : 1\n# Données : password connaissance\nA_COMPLETER\n\n[Cas 2 — Refus puis réussite]\n# Données : 2\n# Données : empreinte inherence\n# Données : code_totp possession\nA_COMPLETER\n\n[Cas 3 — Quatre combinaisons]\n# Données : 4\n# Données : code_sms possession\n# Données : password connaissance\n# Données : code_sms possession\n# Données : empreinte inherence\nA_COMPLETER\n",
    "hints": [
      "Un case sur « $preuve $categorie » avec deux motifs exacts gagne : password\\ connaissance) et code_totp\\ possession).",
      "N’incrémente les compteurs qu’une fois, au moment où le verdict est posé."
    ],
    "examples": [
      {
        "stdin": "5\npassword connaissance\ncode_totp possession\npassword possession\ncode_sms possession\nempreinte inherence\n",
        "expected": "password connaissance : ok\ncode_totp possession : ok\npassword possession : refusé\ncode_sms possession : fragile\nempreinte inherence : refusé\nbilan : 2 solides, 1 fragile, 2 refusés"
      }
    ],
    "tests": [
      {
        "label": "Une preuve valide",
        "stdin": "cas:1",
        "expected": "password connaissance : ok\nbilan : 1 solides, 0 fragile, 0 refusés"
      },
      {
        "label": "Refus puis réussite",
        "stdin": "cas:2",
        "expected": "empreinte inherence : refusé\ncode_totp possession : ok\nbilan : 1 solides, 0 fragile, 1 refusés"
      },
      {
        "label": "Quatre combinaisons",
        "stdin": "cas:3",
        "expected": "code_sms possession : fragile\npassword connaissance : ok\ncode_sms possession : fragile\nempreinte inherence : refusé\nbilan : 1 solides, 2 fragile, 1 refusés"
      }
    ],
    "solution": "[Exemple]\npassword connaissance : ok\ncode_totp possession : ok\npassword possession : refusé\ncode_sms possession : fragile\nempreinte inherence : refusé\nbilan : 2 solides, 1 fragile, 2 refusés\n\n[Cas 1 — Une preuve valide]\npassword connaissance : ok\nbilan : 1 solides, 0 fragile, 0 refusés\n\n[Cas 2 — Refus puis réussite]\nempreinte inherence : refusé\ncode_totp possession : ok\nbilan : 1 solides, 0 fragile, 1 refusés\n\n[Cas 3 — Quatre combinaisons]\ncode_sms possession : fragile\npassword connaissance : ok\ncode_sms possession : fragile\nempreinte inherence : refusé\nbilan : 1 solides, 2 fragile, 1 refusés"
  },
  {
    "id": "cy-c3-e3",
    "chapter": 3,
    "level": "n3",
    "language": "analyse",
    "title": "Modèle de contrôle d’accès",
    "goal": "Relier chaque politique d’accès à son mécanisme de décision.",
    "brief": "<p>Analysez chaque ligne proposée « politique ressource ». Politique : <code>DAC</code> (le propriétaire décide → <code>propriétaire</code>), <code>MAC</code> (politique imposée par le système → <code>politique</code>), <code>RBAC</code> (permissions par rôle → <code>role</code>), <code>ABAC</code> (critères dynamiques → <code>attribut</code>), <code>ACL</code> (liste explicite → <code>liste</code>). Toute autre politique est affichée <code>inconnu</code>. Enfin <code>bilan : a modèles, b inconnus</code>.</p>",
    "starter": "# Grille d'analyse (cy-c3-e3) — Modèle de contrôle d’accès\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un rôle]\n# Données : 1\n# Données : RBAC paie\nA_COMPLETER\n\n[Cas 2 — Une politique inconnue]\n# Données : 2\n# Données : PEP inventaire\n# Données : ACL facture\nA_COMPLETER\n\n[Cas 3 — Quatre modèles]\n# Données : 4\n# Données : MAC projet\n# Données : ABAC archivage\n# Données : DAC messagerie\n# Données : ACL facture\nA_COMPLETER\n",
    "hints": [
      "Cinq motifs exacts dans le case, puis *) pour l’inconnu : l’étiquette se choisit en un seul case.",
      "Le bilan se calcule avec un if sur l’étiquette après le echo, pas dans chaque branche du case."
    ],
    "examples": [
      {
        "stdin": "6\nDAC messagerie\nRBAC paie\nACL facture\nMAC projet\nABAC archivage\nRBAC RH\n",
        "expected": "DAC messagerie : propriétaire\nRBAC paie : role\nACL facture : liste\nMAC projet : politique\nABAC archivage : attribut\nRBAC RH : role\nbilan : 6 modèles, 0 inconnus"
      }
    ],
    "tests": [
      {
        "label": "Un rôle",
        "stdin": "cas:1",
        "expected": "RBAC paie : role\nbilan : 1 modèles, 0 inconnus"
      },
      {
        "label": "Une politique inconnue",
        "stdin": "cas:2",
        "expected": "PEP inventaire : inconnu\nACL facture : liste\nbilan : 1 modèles, 1 inconnus"
      },
      {
        "label": "Quatre modèles",
        "stdin": "cas:3",
        "expected": "MAC projet : politique\nABAC archivage : attribut\nDAC messagerie : propriétaire\nACL facture : liste\nbilan : 4 modèles, 0 inconnus"
      }
    ],
    "solution": "[Exemple]\nDAC messagerie : propriétaire\nRBAC paie : role\nACL facture : liste\nMAC projet : politique\nABAC archivage : attribut\nRBAC RH : role\nbilan : 6 modèles, 0 inconnus\n\n[Cas 1 — Un rôle]\nRBAC paie : role\nbilan : 1 modèles, 0 inconnus\n\n[Cas 2 — Une politique inconnue]\nPEP inventaire : inconnu\nACL facture : liste\nbilan : 1 modèles, 1 inconnus\n\n[Cas 3 — Quatre modèles]\nMAC projet : politique\nABAC archivage : attribut\nDAC messagerie : propriétaire\nACL facture : liste\nbilan : 4 modèles, 0 inconnus"
  },
  {
    "id": "cy-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Guichet des correctifs",
    "goal": "Classer les produits selon l’âge de leur dernier correctif de sécurité.",
    "brief": "<p>Analysez chaque ligne proposée « produit jours » (jours = nombre de jours depuis le dernier correctif de sécurité). Verdict par ligne <code>produit : statut</code> : <code>dans les temps</code> (45 jours ou moins), <code>hors delai</code> (46 à 90), <code>critique</code> (plus de 90).</p>",
    "starter": "# Grille d'analyse (cy-c4-e1) — Guichet des correctifs\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — La frontière des 45 jours]\n# Données : 2\n# Données : serveur_web 46\n# Données : serveur_web 45\nA_COMPLETER\n\n[Cas 2 — Trois tranches]\n# Données : 3\n# Données : borne_acces 91\n# Données : base_donnees 20\n# Données : serveur_web 60\nA_COMPLETER\n\n[Cas 3 — Quatre produits]\n# Données : 4\n# Données : messagerie 1\n# Données : cluster_bdd 99\n# Données : poste_compta 5\n# Données : base_donnees 46\nA_COMPLETER\n",
    "hints": [
      "Deux comparaisons numériques suffisent : -le 45 puis -le 90, le reste tombe dans le else.",
      "Le statut est un simple texte : pas besoin de case, un if/elif/else sur $jours suffit."
    ],
    "examples": [
      {
        "stdin": "6\nserveur_web 46\nbase_donnees 12\nposte_compta 46\nborne_acces 90\nmessagerie 30\ncluster_bdd 3\n",
        "expected": "serveur_web : hors delai\nbase_donnees : dans les temps\nposte_compta : hors delai\nborne_acces : hors delai\nmessagerie : dans les temps\ncluster_bdd : dans les temps"
      }
    ],
    "tests": [
      {
        "label": "La frontière des 45 jours",
        "stdin": "cas:1",
        "expected": "serveur_web : hors delai\nserveur_web : dans les temps"
      },
      {
        "label": "Trois tranches",
        "stdin": "cas:2",
        "expected": "borne_acces : critique\nbase_donnees : dans les temps\nserveur_web : hors delai"
      },
      {
        "label": "Quatre produits",
        "stdin": "cas:3",
        "expected": "messagerie : dans les temps\ncluster_bdd : critique\nposte_compta : dans les temps\nbase_donnees : hors delai"
      }
    ],
    "solution": "[Exemple]\nserveur_web : hors delai\nbase_donnees : dans les temps\nposte_compta : hors delai\nborne_acces : hors delai\nmessagerie : dans les temps\ncluster_bdd : dans les temps\n\n[Cas 1 — La frontière des 45 jours]\nserveur_web : hors delai\nserveur_web : dans les temps\n\n[Cas 2 — Trois tranches]\nborne_acces : critique\nbase_donnees : dans les temps\nserveur_web : hors delai\n\n[Cas 3 — Quatre produits]\nmessagerie : dans les temps\ncluster_bdd : critique\nposte_compta : dans les temps\nbase_donnees : hors delai"
  },
  {
    "id": "cy-c4-e2",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Filtre d’entrées",
    "goal": "Coder le premier réflexe du développement sécurisé : refuser les payloads suspects.",
    "brief": "<p>Analysez les données fournies pour chaque cas. Une charge est refusée si elle contient une apostrophe (injection SQL), un chevron <code>&lt;</code> ou <code>&gt;</code> (XSS) ou un double tiret <code>--</code> (commentaire SQL) : Indiquez alors <code>charge : refuse</code>, sinon <code>charge : accepte</code>. Enfin <code>rapport : a acceptes, b refuses</code>.</p>",
    "starter": "# Grille d'analyse (cy-c4-e2) — Filtre d’entrées\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un nom honnête, une injection]\n# Données : 2\n# Données : nom_proprietaire\n# Données : Robert');--\nA_COMPLETER\n\n[Cas 2 — Chevron, texte sain, tirets simples]\n# Données : 3\n# Données : <img src=x>\n# Données : Pomme2026\n# Données : envoie-un-message\nA_COMPLETER\n\n[Cas 3 — Double tiret collé]\n# Données : 3\n# Données : id--commentaire\n# Données : alert(1)\n# Données : Pomme2026\nA_COMPLETER\n",
    "hints": [
      "Un case sur « $charge » avec des motifs du type *\"'\"* ou *\"--\"* sait détecter une sous-chaîne.",
      "Compte acceptés et refusés dans les deux branches du if, et affiche le rapport après la boucle."
    ],
    "examples": [
      {
        "stdin": "6\nadmin'--\n<script>alert(1)</script>\nRobert');--\nalert(1)\nPomme2026\nO'Brien\n",
        "expected": "admin'-- : refuse\n<script>alert(1)</script> : refuse\nRobert');-- : refuse\nalert(1) : accepte\nPomme2026 : accepte\nO'Brien : refuse\nrapport : 2 acceptes, 4 refuses"
      }
    ],
    "tests": [
      {
        "label": "Un nom honnête, une injection",
        "stdin": "cas:1",
        "expected": "nom_proprietaire : accepte\nRobert');-- : refuse\nrapport : 1 acceptes, 1 refuses"
      },
      {
        "label": "Chevron, texte sain, tirets simples",
        "stdin": "cas:2",
        "expected": "<img src=x> : refuse\nPomme2026 : accepte\nenvoie-un-message : accepte\nrapport : 2 acceptes, 1 refuses"
      },
      {
        "label": "Double tiret collé",
        "stdin": "cas:3",
        "expected": "id--commentaire : refuse\nalert(1) : accepte\nPomme2026 : accepte\nrapport : 2 acceptes, 1 refuses"
      }
    ],
    "solution": "[Exemple]\nadmin'-- : refuse\n<script>alert(1)</script> : refuse\nRobert');-- : refuse\nalert(1) : accepte\nPomme2026 : accepte\nO'Brien : refuse\nrapport : 2 acceptes, 4 refuses\n\n[Cas 1 — Un nom honnête, une injection]\nnom_proprietaire : accepte\nRobert');-- : refuse\nrapport : 1 acceptes, 1 refuses\n\n[Cas 2 — Chevron, texte sain, tirets simples]\n<img src=x> : refuse\nPomme2026 : accepte\nenvoie-un-message : accepte\nrapport : 2 acceptes, 1 refuses\n\n[Cas 3 — Double tiret collé]\nid--commentaire : refuse\nalert(1) : accepte\nPomme2026 : accepte\nrapport : 2 acceptes, 1 refuses"
  },
  {
    "id": "cy-c4-e3",
    "chapter": 4,
    "level": "n3",
    "language": "analyse",
    "title": "ACL du serveur de fichiers",
    "goal": "Simuler une liste de contrôle d’accès : ajouter, retirer, refuser le retrait d’une entrée absente.",
    "brief": "<p>Le script gère une ACL vide au départ et lit <strong>n lignes</strong> « action fichier » : <code>add fichier</code> l’ajoute et Indiquez <code>add fichier : ok</code> ; <code>remove fichier</code> la retire si présente (<code>remove fichier : ok</code>) ou échoue (<code>remove fichier : introuvable</code>). Enfin <code>bilan : K éléments</code> avec K le nombre d’entrées <em>distinctes</em> restantes — ajouter deux fois le même fichier ne le compte qu’une fois, et un add sur un nom présent est refusé.</p>",
    "starter": "# Grille d'analyse (cy-c4-e3) — ACL du serveur de fichiers\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Ajout puis retrait]\n# Données : 2\n# Données : add rapports\n# Données : remove rapports\nA_COMPLETER\n\n[Cas 2 — Retrait à vide, double ajout]\n# Données : 3\n# Données : remove archivage\n# Données : add factures\n# Données : add factures\nA_COMPLETER\n\n[Cas 3 — Quatre opérations]\n# Données : 4\n# Données : add notes.txt\n# Données : add notes.txt\n# Données : remove notes.txt\n# Données : add paie\nA_COMPLETER\n",
    "hints": [
      "Vérifiez la présence du fichier dans la liste des ressources sensibles avant de modifier les permissions.",
      "Mettez à jour le journal d’audit de sécurité pour consigner l’opération de retrait."
    ],
    "examples": [
      {
        "stdin": "6\nadd rapports\nadd photo_a.png\nadd rapports\nremove photo_a.png\nadd photo_a.png\nremove factures\n",
        "expected": "add rapports : ok\nadd photo_a.png : ok\nadd rapports : refuse\nremove photo_a.png : ok\nadd photo_a.png : ok\nremove factures : introuvable\nbilan : 2 éléments"
      }
    ],
    "tests": [
      {
        "label": "Ajout puis retrait",
        "stdin": "cas:1",
        "expected": "add rapports : ok\nremove rapports : ok\nbilan : 0 éléments"
      },
      {
        "label": "Retrait à vide, double ajout",
        "stdin": "cas:2",
        "expected": "remove archivage : introuvable\nadd factures : ok\nadd factures : refuse\nbilan : 1 éléments"
      },
      {
        "label": "Quatre opérations",
        "stdin": "cas:3",
        "expected": "add notes.txt : ok\nadd notes.txt : refuse\nremove notes.txt : ok\nadd paie : ok\nbilan : 1 éléments"
      }
    ],
    "solution": "[Exemple]\nadd rapports : ok\nadd photo_a.png : ok\nadd rapports : refuse\nremove photo_a.png : ok\nadd photo_a.png : ok\nremove factures : introuvable\nbilan : 2 éléments\n\n[Cas 1 — Ajout puis retrait]\nadd rapports : ok\nremove rapports : ok\nbilan : 0 éléments\n\n[Cas 2 — Retrait à vide, double ajout]\nremove archivage : introuvable\nadd factures : ok\nadd factures : refuse\nbilan : 1 éléments\n\n[Cas 3 — Quatre opérations]\nadd notes.txt : ok\nadd notes.txt : refuse\nremove notes.txt : ok\nadd paie : ok\nbilan : 1 éléments"
  },
  {
    "id": "cy-c5-e1",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Triage des alertes",
    "goal": "Router chaque alerte du SIEM vers le canal qui correspond à sa gravité.",
    "brief": "<p>Analysez chaque ligne proposée « niveau evenement ». Route par ligne <code>niveau evenement : canal</code> : <code>pager</code> (CRITIQUE), <code>ticket</code> (AVERTISSEMENT), <code>journal</code> (INFO). Enfin <code>pager : a, ticket : b, journal : c</code>.</p>",
    "starter": "# Grille d'analyse (cy-c5-e1) — Triage des alertes\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une info, une critique]\n# Données : 2\n# Données : INFO rotation_cles\n# Données : CRITIQUE intrusion\nA_COMPLETER\n\n[Cas 2 — Deux avertissements]\n# Données : 3\n# Données : AVERTISSEMENT trafic_sortant\n# Données : AVERTISSEMENT echecs_connexion\n# Données : INFO sauvegarde\nA_COMPLETER\n\n[Cas 3 — Cinq alertes]\n# Données : 5\n# Données : CRITIQUE ransomware\n# Données : CRITIQUE exfiltration\n# Données : INFO sauvegarde\n# Données : AVERTISSEMENT echecs_connexion\n# Données : INFO rotation_cles\nA_COMPLETER\n",
    "hints": [
      "Un case à trois branches exactes, un canal par niveau : l’aiguillage et le comptage vivent ensemble.",
      "Le récapitulatif s’affiche une seule fois, après la boucle — jamais à l’intérieur."
    ],
    "examples": [
      {
        "stdin": "6\nCRITIQUE exfiltration\nINFO rotation_cles\nAVERTISSEMENT echecs_connexion\nCRITIQUE ransomware\nINFO sauvegarde\nAVERTISSEMENT trafic_sortant\n",
        "expected": "CRITIQUE exfiltration : pager\nINFO rotation_cles : journal\nAVERTISSEMENT echecs_connexion : ticket\nCRITIQUE ransomware : pager\nINFO sauvegarde : journal\nAVERTISSEMENT trafic_sortant : ticket\npager : 2, ticket : 2, journal : 2"
      }
    ],
    "tests": [
      {
        "label": "Une info, une critique",
        "stdin": "cas:1",
        "expected": "INFO rotation_cles : journal\nCRITIQUE intrusion : pager\npager : 1, ticket : 0, journal : 1"
      },
      {
        "label": "Deux avertissements",
        "stdin": "cas:2",
        "expected": "AVERTISSEMENT trafic_sortant : ticket\nAVERTISSEMENT echecs_connexion : ticket\nINFO sauvegarde : journal\npager : 0, ticket : 2, journal : 1"
      },
      {
        "label": "Cinq alertes",
        "stdin": "cas:3",
        "expected": "CRITIQUE ransomware : pager\nCRITIQUE exfiltration : pager\nINFO sauvegarde : journal\nAVERTISSEMENT echecs_connexion : ticket\nINFO rotation_cles : journal\npager : 2, ticket : 1, journal : 2"
      }
    ],
    "solution": "[Exemple]\nCRITIQUE exfiltration : pager\nINFO rotation_cles : journal\nAVERTISSEMENT echecs_connexion : ticket\nCRITIQUE ransomware : pager\nINFO sauvegarde : journal\nAVERTISSEMENT trafic_sortant : ticket\npager : 2, ticket : 2, journal : 2\n\n[Cas 1 — Une info, une critique]\nINFO rotation_cles : journal\nCRITIQUE intrusion : pager\npager : 1, ticket : 0, journal : 1\n\n[Cas 2 — Deux avertissements]\nAVERTISSEMENT trafic_sortant : ticket\nAVERTISSEMENT echecs_connexion : ticket\nINFO sauvegarde : journal\npager : 0, ticket : 2, journal : 1\n\n[Cas 3 — Cinq alertes]\nCRITIQUE ransomware : pager\nCRITIQUE exfiltration : pager\nINFO sauvegarde : journal\nAVERTISSEMENT echecs_connexion : ticket\nINFO rotation_cles : journal\npager : 2, ticket : 1, journal : 2"
  },
  {
    "id": "cy-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Journal d’authentification",
    "goal": "Détecter une attaque par force brute dans un journal : compter les échecs par adresse IP.",
    "brief": "<p>Analysez chaque ligne proposée « resultat heure ip » (resultat = SUCCES ou ECHEC). Il réIndiquez chaque ligne au format <code>heure ip : resultat</code>, puis deux lignes finales : <code>bilan : X echecs sur IP</code> (IP la plus fautive, échecs cumulés) et <code>alerte : oui</code> si elle en totalise 3 ou plus, <code>alerte : non</code> sinon. Sans aucun échec, l’IP rapportée est celle de la première ligne.</p>",
    "starter": "# Grille d'analyse (cy-c5-e2) — Journal d’authentification\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul échec]\n# Données : 2\n# Données : SUCCES 08:00:01 10.0.4.15\n# Données : ECHEC 08:00:10 10.0.4.15\nA_COMPLETER\n\n[Cas 2 — Que des succès]\n# Données : 3\n# Données : SUCCES 08:00:01 10.0.4.15\n# Données : SUCCES 08:00:02 10.0.4.15\n# Données : SUCCES 08:00:03 10.0.4.15\nA_COMPLETER\n\n[Cas 3 — Deux IP concurrentes]\n# Données : 5\n# Données : ECHEC 23:59:01 198.51.100.7\n# Données : SUCCES 23:59:30 198.51.100.7\n# Données : ECHEC 23:59:45 198.51.100.7\n# Données : ECHEC 23:59:50 198.51.100.7\n# Données : SUCCES 00:00:10 10.0.4.15\nA_COMPLETER\n",
    "hints": [
      "Comptabilisez le nombre d’échecs d’authentification pour chaque adresse IP source.",
      "Identifiez l’adresse IP présentant le nombre maximal de tentatives infructueuses."
    ],
    "examples": [
      {
        "stdin": "6\nECHEC 03:02:11 45.61.10.9\nECHEC 03:02:15 45.61.10.9\nECHEC 03:02:20 45.61.10.9\nSUCCES 03:03:00 45.61.10.9\nSUCCES 09:14:32 10.0.4.15\nECHEC 09:15:01 10.0.4.15\n",
        "expected": "03:02:11 45.61.10.9 : ECHEC\n03:02:15 45.61.10.9 : ECHEC\n03:02:20 45.61.10.9 : ECHEC\n03:03:00 45.61.10.9 : SUCCES\n09:14:32 10.0.4.15 : SUCCES\n09:15:01 10.0.4.15 : ECHEC\nbilan : 3 echecs sur 45.61.10.9\nalerte : oui"
      }
    ],
    "tests": [
      {
        "label": "Un seul échec",
        "stdin": "cas:1",
        "expected": "08:00:01 10.0.4.15 : SUCCES\n08:00:10 10.0.4.15 : ECHEC\nbilan : 1 echecs sur 10.0.4.15\nalerte : non"
      },
      {
        "label": "Que des succès",
        "stdin": "cas:2",
        "expected": "08:00:01 10.0.4.15 : SUCCES\n08:00:02 10.0.4.15 : SUCCES\n08:00:03 10.0.4.15 : SUCCES\nbilan : 0 echecs sur 10.0.4.15\nalerte : non"
      },
      {
        "label": "Deux IP concurrentes",
        "stdin": "cas:3",
        "expected": "23:59:01 198.51.100.7 : ECHEC\n23:59:30 198.51.100.7 : SUCCES\n23:59:45 198.51.100.7 : ECHEC\n23:59:50 198.51.100.7 : ECHEC\n00:00:10 10.0.4.15 : SUCCES\nbilan : 3 echecs sur 198.51.100.7\nalerte : oui"
      }
    ],
    "solution": "[Exemple]\n03:02:11 45.61.10.9 : ECHEC\n03:02:15 45.61.10.9 : ECHEC\n03:02:20 45.61.10.9 : ECHEC\n03:03:00 45.61.10.9 : SUCCES\n09:14:32 10.0.4.15 : SUCCES\n09:15:01 10.0.4.15 : ECHEC\nbilan : 3 echecs sur 45.61.10.9\nalerte : oui\n\n[Cas 1 — Un seul échec]\n08:00:01 10.0.4.15 : SUCCES\n08:00:10 10.0.4.15 : ECHEC\nbilan : 1 echecs sur 10.0.4.15\nalerte : non\n\n[Cas 2 — Que des succès]\n08:00:01 10.0.4.15 : SUCCES\n08:00:02 10.0.4.15 : SUCCES\n08:00:03 10.0.4.15 : SUCCES\nbilan : 0 echecs sur 10.0.4.15\nalerte : non\n\n[Cas 3 — Deux IP concurrentes]\n23:59:01 198.51.100.7 : ECHEC\n23:59:30 198.51.100.7 : SUCCES\n23:59:45 198.51.100.7 : ECHEC\n23:59:50 198.51.100.7 : ECHEC\n00:00:10 10.0.4.15 : SUCCES\nbilan : 3 echecs sur 198.51.100.7\nalerte : oui"
  },
  {
    "id": "cy-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Les étapes de la réponse",
    "goal": "Dérouler la réponse à incident dans l’ordre, chronométrée, avec rejet des étapes inconnues.",
    "brief": "<p>Analysez chaque ligne proposée « motif duree ». Les motifs valides sont <code>identifier</code>, <code>contenir</code>, <code>eradiquer</code>, <code>retablir</code>. Pour la ligne K (à partir de 1) : <code>etape K : motif (duree h)</code> et cumul de la durée ; motif inconnu : <code>etape K : motif inconnu (identifier, contenir, eradiquer, retablir attendus)</code> sans cumul. La numérotation continue même après un rejet. Enfin <code>total : X h</code>.</p>",
    "starter": "# Grille d'analyse (cy-c5-e3) — Les étapes de la réponse\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un motif inconnu au passage]\n# Données : 4\n# Données : identifier 1\n# Données : cache 2\n# Données : contenir 3\n# Données : retablir 5\nA_COMPLETER\n\n[Cas 2 — Zéro minute et nuit blanche]\n# Données : 4\n# Données : identifier 0\n# Données : contenir 12\n# Données : eradiquer 9\n# Données : retablir 5\nA_COMPLETER\n\n[Cas 3 — Étapes dans le désordre]\n# Données : 4\n# Données : contenir 1\n# Données : identifier 1\n# Données : eradiquer 1\n# Données : retablir 1\nA_COMPLETER\n",
    "hints": [
      "Le numéro d’étape est l’index i de la boucle : un motif rejeté ne doit ni le reculer ni le faire sauter.",
      "Le case accepte quatre motifs : identifier|contenir|eradiquer|retablir) fait les quatre d’un coup, *) rejette."
    ],
    "examples": [
      {
        "stdin": "4\nidentifier 2\ncontenir 3\neradiquer 6\nretablir 13\n",
        "expected": "etape 1 : identifier (2 h)\netape 2 : contenir (3 h)\netape 3 : eradiquer (6 h)\netape 4 : retablir (13 h)\ntotal : 24 h"
      }
    ],
    "tests": [
      {
        "label": "Un motif inconnu au passage",
        "stdin": "cas:1",
        "expected": "etape 1 : identifier (1 h)\netape 2 : motif inconnu (identifier, contenir, eradiquer, retablir attendus)\netape 3 : contenir (3 h)\netape 4 : retablir (5 h)\ntotal : 9 h"
      },
      {
        "label": "Zéro minute et nuit blanche",
        "stdin": "cas:2",
        "expected": "etape 1 : identifier (0 h)\netape 2 : contenir (12 h)\netape 3 : eradiquer (9 h)\netape 4 : retablir (5 h)\ntotal : 26 h"
      },
      {
        "label": "Étapes dans le désordre",
        "stdin": "cas:3",
        "expected": "etape 1 : contenir (1 h)\netape 2 : identifier (1 h)\netape 3 : eradiquer (1 h)\netape 4 : retablir (1 h)\ntotal : 4 h"
      }
    ],
    "solution": "[Exemple]\netape 1 : identifier (2 h)\netape 2 : contenir (3 h)\netape 3 : eradiquer (6 h)\netape 4 : retablir (13 h)\ntotal : 24 h\n\n[Cas 1 — Un motif inconnu au passage]\netape 1 : identifier (1 h)\netape 2 : motif inconnu (identifier, contenir, eradiquer, retablir attendus)\netape 3 : contenir (3 h)\netape 4 : retablir (5 h)\ntotal : 9 h\n\n[Cas 2 — Zéro minute et nuit blanche]\netape 1 : identifier (0 h)\netape 2 : contenir (12 h)\netape 3 : eradiquer (9 h)\netape 4 : retablir (5 h)\ntotal : 26 h\n\n[Cas 3 — Étapes dans le désordre]\netape 1 : contenir (1 h)\netape 2 : identifier (1 h)\netape 3 : eradiquer (1 h)\netape 4 : retablir (1 h)\ntotal : 4 h"
  },
  {
    "id": "cy-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "Calculateur d’amende RGPD",
    "goal": "Comparer chaque amende envisagée au plafond du RGPD : 20 millions d’euros ou 4 % du CA mondial.",
    "brief": "<p>Analysez chaque ligne proposée « nombre unite » avec unite = <code>euros</code> (montant en euros) ou <code>percent</code> (part du chiffre d’affaires). Contexte : le CA de l’entreprise vaut 1 milliard d’euros, donc 1 % = 10 M€. Pour la ligne K il Indiquez <code>candidat K : X M€</code> (division entière pour les euros). Enfin <code>plafond : 20 M€ ou 4 %</code>.</p>",
    "starter": "# Grille d'analyse (cy-c6-e1) — Calculateur d’amende RGPD\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Un montant en euros]\n# Données : 1\n# Données : 10000000 euros\nA_COMPLETER\n\n[Cas 2 — Deux parts de CA]\n# Données : 2\n# Données : 9 percent\n# Données : 60 percent\nA_COMPLETER\n\n[Cas 3 — Trois candidats]\n# Données : 3\n# Données : 25 percent\n# Données : 19000000 euros\n# Données : 2 percent\nA_COMPLETER\n",
    "hints": [
      "Euros : me=$((valeur / 1000000)) — division entière. Pourcent : me=$((valeur * 10)) car 1 % de 1 Md€ vaut 10 M€.",
      "La ligne de plafond ne dépend d’aucune donnée : elle s’affiche une fois, après la boucle."
    ],
    "examples": [
      {
        "stdin": "5\n12000000 euros\n40 percent\n20 percent\n35000000 euros\n1 percent\n",
        "expected": "candidat 1 : 12 M€\ncandidat 2 : 400 M€\ncandidat 3 : 200 M€\ncandidat 4 : 35 M€\ncandidat 5 : 10 M€\nplafond : 20 M€ ou 4 %"
      }
    ],
    "tests": [
      {
        "label": "Un montant en euros",
        "stdin": "cas:1",
        "expected": "candidat 1 : 10 M€\nplafond : 20 M€ ou 4 %"
      },
      {
        "label": "Deux parts de CA",
        "stdin": "cas:2",
        "expected": "candidat 1 : 90 M€\ncandidat 2 : 600 M€\nplafond : 20 M€ ou 4 %"
      },
      {
        "label": "Trois candidats",
        "stdin": "cas:3",
        "expected": "candidat 1 : 250 M€\ncandidat 2 : 19 M€\ncandidat 3 : 20 M€\nplafond : 20 M€ ou 4 %"
      }
    ],
    "solution": "[Exemple]\ncandidat 1 : 12 M€\ncandidat 2 : 400 M€\ncandidat 3 : 200 M€\ncandidat 4 : 35 M€\ncandidat 5 : 10 M€\nplafond : 20 M€ ou 4 %\n\n[Cas 1 — Un montant en euros]\ncandidat 1 : 10 M€\nplafond : 20 M€ ou 4 %\n\n[Cas 2 — Deux parts de CA]\ncandidat 1 : 90 M€\ncandidat 2 : 600 M€\nplafond : 20 M€ ou 4 %\n\n[Cas 3 — Trois candidats]\ncandidat 1 : 250 M€\ncandidat 2 : 19 M€\ncandidat 3 : 20 M€\nplafond : 20 M€ ou 4 %"
  },
  {
    "id": "cy-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Conformité ISO 27001",
    "goal": "Relier chaque pratique de sécurité à la norme qui l’exige, puis mesurer la couverture.",
    "brief": "<p>Analysez chaque ligne proposée « pratique norme » avec norme = RGPD, NIS2, PCIDSS ou ISO27001. Pour chaque ligne il Indiquez <code>norme : pratique</code>. Enfin <code>couvert : X/n</code> où X compte les normes <em>distinctes</em> rencontrées : une norme n’est couverte qu’une fois, même si plusieurs pratiques la concernent.</p>",
    "starter": "# Grille d'analyse (cy-c6-e2) — Conformité ISO 27001\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Une norme]\n# Données : 1\n# Données : smsi ISO27001\nA_COMPLETER\n\n[Cas 2 — Deux pratiques, une norme]\n# Données : 2\n# Données : smsi ISO27001\n# Données : soc ISO27001\nA_COMPLETER\n\n[Cas 3 — Trois normes]\n# Données : 3\n# Données : jeton_banque PCIDSS\n# Données : plan_reponse NIS2\n# Données : chiffrement RGPD\nA_COMPLETER\n",
    "hints": [
      "Quatre drapeaux (RGPD, NIS2, PCIDSS, ISO27001) passent à 1 quand la norme apparaît.",
      "La couverture est la somme des drapeaux sur n : même mécanique que la triade CIA du chapitre 1."
    ],
    "examples": [
      {
        "stdin": "5\nchiffrement RGPD\nplan_reponse NIS2\njeton_banque PCIDSS\nsmsi ISO27001\njournalisation RGPD\n",
        "expected": "RGPD : chiffrement\nNIS2 : plan_reponse\nPCIDSS : jeton_banque\nISO27001 : smsi\nRGPD : journalisation\ncouvert : 4/5"
      }
    ],
    "tests": [
      {
        "label": "Une norme",
        "stdin": "cas:1",
        "expected": "ISO27001 : smsi\ncouvert : 1/1"
      },
      {
        "label": "Deux pratiques, une norme",
        "stdin": "cas:2",
        "expected": "ISO27001 : smsi\nISO27001 : soc\ncouvert : 1/2"
      },
      {
        "label": "Trois normes",
        "stdin": "cas:3",
        "expected": "PCIDSS : jeton_banque\nNIS2 : plan_reponse\nRGPD : chiffrement\ncouvert : 3/3"
      }
    ],
    "solution": "[Exemple]\nRGPD : chiffrement\nNIS2 : plan_reponse\nPCIDSS : jeton_banque\nISO27001 : smsi\nRGPD : journalisation\ncouvert : 4/5\n\n[Cas 1 — Une norme]\nISO27001 : smsi\ncouvert : 1/1\n\n[Cas 2 — Deux pratiques, une norme]\nISO27001 : smsi\nISO27001 : soc\ncouvert : 1/2\n\n[Cas 3 — Trois normes]\nPCIDSS : jeton_banque\nNIS2 : plan_reponse\nRGPD : chiffrement\ncouvert : 3/3"
  },
  {
    "id": "cy-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Coffre 3-2-1",
    "goal": "Auditer une stratégie de sauvegarde contre la règle 3-2-1 et son évolution immuable.",
    "brief": "<p>Analysez chaque ligne proposée « lettre description » : lettre = <code>C</code> (copie des données), <code>S</code> (support distinct), <code>H</code> (copie hors site) ou <code>I</code> (copie immuable). Pour chaque ligne il Indiquez <code>lettre description : libellé</code> avec copie, support, hors site, immuable. Le verdict final exige C, H et I présents — S aide mais ne suffit jamais : <code>verdict : conforme au 3-2-1</code>, sinon <code>verdict : 3-2-1 incomplet (manque X)</code> avec X la première lettre manquante parmi C, H, I.</p>",
    "starter": "# Grille d'analyse (cy-c6-e3) — Coffre 3-2-1\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Stratégie conforme]\n# Données : 4\n# Données : C copie_production\n# Données : S nas\n# Données : H bande_offsite\n# Données : I airgap\nA_COMPLETER\n\n[Cas 2 — Aucune copie hors site]\n# Données : 2\n# Données : C copie_production\n# Données : S nas\nA_COMPLETER\n\n[Cas 3 — Deux supports, pas d’immuable]\n# Données : 3\n# Données : C copie_production\n# Données : S nas\n# Données : S cloud\nA_COMPLETER\n",
    "hints": [
      "Quatre drapeaux comme d’habitude ; le verdict s’écrit après la boucle avec des if imbriqués.",
      "L’ordre de priorité du verdict est imposé : C d’abord, puis H, puis I — trois if/elif suffisent."
    ],
    "examples": [
      {
        "stdin": "4\nS nas\nC copie_production\nI airgap\nH bande_offsite\n",
        "expected": "S nas : support\nC copie_production : copie\nI airgap : immuable\nH bande_offsite : hors site\nverdict : conforme au 3-2-1"
      }
    ],
    "tests": [
      {
        "label": "Stratégie conforme",
        "stdin": "cas:1",
        "expected": "C copie_production : copie\nS nas : support\nH bande_offsite : hors site\nI airgap : immuable\nverdict : conforme au 3-2-1"
      },
      {
        "label": "Aucune copie hors site",
        "stdin": "cas:2",
        "expected": "C copie_production : copie\nS nas : support\nverdict : 3-2-1 incomplet (manque H)"
      },
      {
        "label": "Deux supports, pas d’immuable",
        "stdin": "cas:3",
        "expected": "C copie_production : copie\nS nas : support\nS cloud : support\nverdict : 3-2-1 incomplet (manque H)"
      }
    ],
    "solution": "[Exemple]\nS nas : support\nC copie_production : copie\nI airgap : immuable\nH bande_offsite : hors site\nverdict : conforme au 3-2-1\n\n[Cas 1 — Stratégie conforme]\nC copie_production : copie\nS nas : support\nH bande_offsite : hors site\nI airgap : immuable\nverdict : conforme au 3-2-1\n\n[Cas 2 — Aucune copie hors site]\nC copie_production : copie\nS nas : support\nverdict : 3-2-1 incomplet (manque H)\n\n[Cas 3 — Deux supports, pas d’immuable]\nC copie_production : copie\nS nas : support\nS cloud : support\nverdict : 3-2-1 incomplet (manque H)"
  }
];
