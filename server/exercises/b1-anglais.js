/**
 * Catalogue des 18 études de cas du cours « b1-anglais ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "en-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Business or not",
    goal: "Trier les mots entre registre professionnel et registre familier, puis dresser le bilan.",
    brief: "<p>Pour chaque situation proposée : type vaut <code>b</code> (business) ou <code>c</code> (casual). Pour chaque situation, indiquez <code>mot : categorie</code>, où categorie vaut <code>professionnel</code> (business) ou <code>familier</code> (casual). Enfin Indiquez <code>bilan : X business / Y casual</code>.</p>",
    starter: "# Grille d'analyse (en-c1-e1) — Business or not\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul mot familier]\n# Données : c hey\nA_COMPLETER\n\n[Cas 2 — Deux mots business]\n# Données : b stakeholder\n# Données : b deadline\nA_COMPLETER\n\n[Cas 3 — Cinq mots mixtes]\n# Données : b budget\n# Données : c yo\n# Données : b quarterly\n# Données : c gotta\n# Données : b sprint\nA_COMPLETER\n",
    hints: [
          "Deux compteurs posés à 0 avant la boucle : b et c incrémentent chacun le sien.",
          "Le bilan sort après la boucle, selon la syntaxe attendue « X business / Y casual »."
    ],
    examples: [
          {
                "stdin": "4\nb invoice\nc gonna\nb report\nc wanna\n",
                "expected": "invoice : professionnel\ngonna : familier\nreport : professionnel\nwanna : familier\nbilan : 2 business / 2 casual"
          }
    ],
    tests: [
          {
                "label": "Un seul mot familier",
                "stdin": "cas:1",
                "expected": "hey : familier\nbilan : 0 business / 1 casual"
          },
          {
                "label": "Deux mots business",
                "stdin": "cas:2",
                "expected": "stakeholder : professionnel\ndeadline : professionnel\nbilan : 2 business / 0 casual"
          },
          {
                "label": "Cinq mots mixtes",
                "stdin": "cas:3",
                "expected": "budget : professionnel\nyo : familier\nquarterly : professionnel\ngotta : familier\nsprint : professionnel\nbilan : 3 business / 2 casual"
          }
    ],
    solution: "[Exemple]\ninvoice : professionnel\ngonna : familier\nreport : professionnel\nwanna : familier\nbilan : 2 business / 2 casual\n\n[Cas 1 — Un seul mot familier]\nhey : familier\nbilan : 0 business / 1 casual\n\n[Cas 2 — Deux mots business]\nstakeholder : professionnel\ndeadline : professionnel\nbilan : 2 business / 0 casual\n\n[Cas 3 — Cinq mots mixtes]\nbudget : professionnel\nyo : familier\nquarterly : professionnel\ngotta : familier\nsprint : professionnel\nbilan : 3 business / 2 casual\n"
  },
  {
    id: "en-c1-e2",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Client or customer",
    goal: "Appliquer la distinction clé du support : le client (relation longue) contre le customer (achat ponctuel).",
    brief: "<p>Pour chaque situation proposée : relation vaut <code>long</code> (relation suivie) ou <code>once</code> (achat ponctuel). Pour chaque situation, indiquez <code>personne : statut</code>, où statut vaut <code>client</code> (long) ou <code>customer</code> (once). Concluez par <code>clients fideles : X/n</code>.</p>",
    starter: "# Grille d'analyse (en-c1-e2) — Client or customer\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul achat]\n# Données : Smith once\nA_COMPLETER\n\n[Cas 2 — Deux relations longues]\n# Données : Dialou long\n# Données : Kossi long\nA_COMPLETER\n\n[Cas 3 — Cinq personnes mixtes]\n# Données : A long\n# Données : B once\n# Données : C long\n# Données : D once\n# Données : E long\nA_COMPLETER\n",
    hints: [
          "Un if sur la relation suffit : long et once sont les deux seules valeurs.",
          "Le compteur suit exactement les statuts « client »."
    ],
    examples: [
          {
                "stdin": "3\nTanaka long\nWalker once\nRivera long\n",
                "expected": "Tanaka : client\nWalker : customer\nRivera : client\nclients fideles : 2/3"
          }
    ],
    tests: [
          {
                "label": "Un seul achat",
                "stdin": "cas:1",
                "expected": "Smith : customer\nclients fideles : 0/1"
          },
          {
                "label": "Deux relations longues",
                "stdin": "cas:2",
                "expected": "Dialou : client\nKossi : client\nclients fideles : 2/2"
          },
          {
                "label": "Cinq personnes mixtes",
                "stdin": "cas:3",
                "expected": "A : client\nB : customer\nC : client\nD : customer\nE : client\nclients fideles : 3/5"
          }
    ],
    solution: "[Exemple]\nTanaka : client\nWalker : customer\nRivera : client\nclients fideles : 2/3\n\n[Cas 1 — Un seul achat]\nSmith : customer\nclients fideles : 0/1\n\n[Cas 2 — Deux relations longues]\nDialou : client\nKossi : client\nclients fideles : 2/2\n\n[Cas 3 — Cinq personnes mixtes]\nA : client\nB : customer\nC : client\nD : customer\nE : client\nclients fideles : 3/5\n"
  },
  {
    id: "en-c1-e3",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "False friends",
    goal: "Repérer les faux amis français-anglais : actually, eventually, library — et corriger la phrase.",
    brief: "<p>Pour chaque situation proposée : sens vaut <code>now</code> (en fait, pour actually), <code>finally</code> (finalement, pour eventually), <code>bookshop</code> (librairie) ou <code>ok</code> (faux ami absent). Le cas signale chaque piège : pour now Indiquez <code>mot : signifie en fait</code>, pour finally <code>mot : signifie finalement</code>, pour bookshop <code>mot : signifie bibliotheque</code>, pour ok <code>mot : sans piege</code>. Concluez par <code>faux amis : X/n</code> (les trois premiers sens).</p>",
    starter: "# Grille d'analyse (en-c1-e3) — False friends\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul piège]\n# Données : actually now\nA_COMPLETER\n\n[Cas 2 — Que des mots sûrs]\n# Données : sprint ok\n# Données : budget ok\nA_COMPLETER\n\n[Cas 3 — Cinq lignes mixtes]\n# Données : library bookshop\n# Données : deployment ok\n# Données : eventually finally\n# Données : UAT ok\n# Données : actually now\nA_COMPLETER\n",
    hints: [
          "Un case à quatre sens couvre toutes les lignes.",
          "Comptez ensemble now, finally et bookshop : ce sont les trois faux amis du support."
    ],
    examples: [
          {
                "stdin": "4\nactually now\neventually finally\nlibrary bookshop\nmeeting ok\n",
                "expected": "actually : signifie en fait\neventually : signifie finalement\nlibrary : signifie bibliotheque\nmeeting : sans piege\nfaux amis : 3/4"
          }
    ],
    tests: [
          {
                "label": "Un seul piège",
                "stdin": "cas:1",
                "expected": "actually : signifie en fait\nfaux amis : 1/1"
          },
          {
                "label": "Que des mots sûrs",
                "stdin": "cas:2",
                "expected": "sprint : sans piege\nbudget : sans piege\nfaux amis : 0/2"
          },
          {
                "label": "Cinq lignes mixtes",
                "stdin": "cas:3",
                "expected": "library : signifie bibliotheque\ndeployment : sans piege\neventually : signifie finalement\nUAT : sans piege\nactually : signifie en fait\nfaux amis : 3/5"
          }
    ],
    solution: "[Exemple]\nactually : signifie en fait\neventually : signifie finalement\nlibrary : signifie bibliotheque\nmeeting : sans piege\nfaux amis : 3/4\n\n[Cas 1 — Un seul piège]\nactually : signifie en fait\nfaux amis : 1/1\n\n[Cas 2 — Que des mots sûrs]\nsprint : sans piege\nbudget : sans piege\nfaux amis : 0/2\n\n[Cas 3 — Cinq lignes mixtes]\nlibrary : signifie bibliotheque\ndeployment : sans piege\neventually : signifie finalement\nUAT : sans piege\nactually : signifie en fait\nfaux amis : 3/5\n"
  },
  {
    id: "en-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "The CLEAR method",
    goal: "Classer les phrases d'un email selon la méthode CLEAR : Context, Logistics, Expectation, Action, Respect.",
    brief: "<p>Pour chaque situation proposée : partie vaut <code>C</code>, <code>L</code>, <code>E</code>, <code>A</code> ou <code>R</code>. Pour chaque situation, indiquez <code>phrase : nom_complet</code>, où nom_complet vaut <code>context</code>, <code>logistics</code>, <code>expectation</code>, <code>action</code> ou <code>respect</code>. Concluez par <code>emails complets : ok</code> si les cinq parties sont présentes au moins une fois, <code>emails complets : manquant</code> sinon.</p>",
    starter: "# Grille d'analyse (en-c2-e1) — The CLEAR method\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Respect manquant]\n# Données : p1 C\n# Données : p2 L\n# Données : p3 E\n# Données : p4 A\nA_COMPLETER\n\n[Cas 2 — Deux contexts]\n# Données : p1 C\n# Données : p2 C\n# Données : p3 L\n# Données : p4 A\n# Données : p5 R\nA_COMPLETER\n\n[Cas 3 — Six phrases]\n# Données : p1 R\n# Données : p2 L\n# Données : p3 C\n# Données : p4 A\n# Données : p5 E\n# Données : p6 C\nA_COMPLETER\n",
    hints: [
          "Un case traduit la lettre en nom complet ; un tableau vues[partie]=1 marque le passage.",
          "Le verdict final vérifie les cinq clés : C, L, E, A, R."
    ],
    examples: [
          {
                "stdin": "5\np1 C\np2 L\np3 E\np4 A\np5 R\n",
                "expected": "p1 : context\np2 : logistics\np3 : expectation\np4 : action\np5 : respect\nemails complets : ok"
          }
    ],
    tests: [
          {
                "label": "Respect manquant",
                "stdin": "cas:1",
                "expected": "p1 : context\np2 : logistics\np3 : expectation\np4 : action\nemails complets : manquant"
          },
          {
                "label": "Deux contexts",
                "stdin": "cas:2",
                "expected": "p1 : context\np2 : context\np3 : logistics\np4 : action\np5 : respect\nemails complets : manquant"
          },
          {
                "label": "Six phrases",
                "stdin": "cas:3",
                "expected": "p1 : respect\np2 : logistics\np3 : context\np4 : action\np5 : expectation\np6 : context\nemails complets : ok"
          }
    ],
    solution: "[Exemple]\np1 : context\np2 : logistics\np3 : expectation\np4 : action\np5 : respect\nemails complets : ok\n\n[Cas 1 — Respect manquant]\np1 : context\np2 : logistics\np3 : expectation\np4 : action\nemails complets : manquant\n\n[Cas 2 — Deux contexts]\np1 : context\np2 : context\np3 : logistics\np4 : action\np5 : respect\nemails complets : manquant\n\n[Cas 3 — Six phrases]\np1 : respect\np2 : logistics\np3 : context\np4 : action\np5 : expectation\np6 : context\nemails complets : ok\n"
  },
  {
    id: "en-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Formal or semi-formal",
    goal: "Choisir le ton de l'email selon le destinataire : formel (nouveau client, direction), semi-formel (collègue), jamais familier.",
    brief: "<p>Pour chaque situation proposée : audience vaut <code>formal</code> (nouveau client, direction), <code>semi</code> (collègue, client régulier) ou <code>casual</code> (jamais en entreprise). Pour chaque situation, indiquez <code>destinataire : salutation</code>, où salutation vaut <code>Dear Mr Smith</code> (formal), <code>Hello Sarah</code> (semi) ou <code>jamais en entreprise</code> (casual). Concluez par <code>emails formels : X/n</code>.</p>",
    starter: "# Grille d'analyse (en-c2-e2) — Formal or semi-formal\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul semi-formel]\n# Données : John semi\nA_COMPLETER\n\n[Cas 2 — Deux formels]\n# Données : Rivera formal\n# Données : Tanaka formal\nA_COMPLETER\n\n[Cas 3 — Cinq destinataires]\n# Données : A formal\n# Données : B semi\n# Données : C casual\n# Données : D formal\n# Données : E semi\nA_COMPLETER\n",
    hints: [
          "Un case à trois audiences, trois salutations.",
          "Comptez seulement les salutations formelles."
    ],
    examples: [
          {
                "stdin": "3\nCEO formal\nSarah semi\nMike casual\n",
                "expected": "CEO : Dear Mr Smith\nSarah : Hello Sarah\nMike : jamais en entreprise\nemails formels : 1/3"
          }
    ],
    tests: [
          {
                "label": "Un seul semi-formel",
                "stdin": "cas:1",
                "expected": "John : Hello Sarah\nemails formels : 0/1"
          },
          {
                "label": "Deux formels",
                "stdin": "cas:2",
                "expected": "Rivera : Dear Mr Smith\nTanaka : Dear Mr Smith\nemails formels : 2/2"
          },
          {
                "label": "Cinq destinataires",
                "stdin": "cas:3",
                "expected": "A : Dear Mr Smith\nB : Hello Sarah\nC : jamais en entreprise\nD : Dear Mr Smith\nE : Hello Sarah\nemails formels : 2/5"
          }
    ],
    solution: "[Exemple]\nCEO : Dear Mr Smith\nSarah : Hello Sarah\nMike : jamais en entreprise\nemails formels : 1/3\n\n[Cas 1 — Un seul semi-formel]\nJohn : Hello Sarah\nemails formels : 0/1\n\n[Cas 2 — Deux formels]\nRivera : Dear Mr Smith\nTanaka : Dear Mr Smith\nemails formels : 2/2\n\n[Cas 3 — Cinq destinataires]\nA : Dear Mr Smith\nB : Hello Sarah\nC : jamais en entreprise\nD : Dear Mr Smith\nE : Hello Sarah\nemails formels : 2/5\n"
  },
  {
    id: "en-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "The reply all disaster",
    goal: "Simuler la catastrophe du Reply All : suivre les destinataires, éviter la tempête d'emails.",
    brief: "<p>Pour chaque situation proposée : action vaut <code>envoi</code> (nouvel email à la boite), <code>replyall</code> (réponse à tous) ou <code>desabonne</code> (retirer la boite de la liste). La liste commence avec 0 boites ; chaque envoi ou replyall ajoute toutes les boites manquantes présentes sur la ligne (une seule boite par ligne). Les réponses à tous multiplient le trafic : chaque replyall sur une liste de X boites produit X messages. Affichage ligne par ligne : <code>action boite : trafic total T</code>. Final : <code>boites : X</code> et <code>trafic total : T</code>.</p>",
    starter: "# Grille d'analyse (en-c2-e3) — The reply all disaster\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un envoi seul]\n# Données : envoi a\nA_COMPLETER\n\n[Cas 2 — Replyall sur boite absente]\n# Données : envoi a\n# Données : replyall a\nA_COMPLETER\n\n[Cas 3 — Cinq actions]\n# Données : envoi a\n# Données : envoi b\n# Données : envoi c\n# Données : replyall a\n# Données : replyall b\nA_COMPLETER\n",
    hints: [
          "liste[boite]=1 marque la présence ; un envoi sur une boite absente l'ajoute (trafic +1) ; sur une boite présente, rien.",
          "Un replyall sur une boite déjà présente éclate : trafic += nombre de boites dans la liste."
    ],
    examples: [
          {
                "stdin": "4\nenvoi a\nenvoi b\nreplyall a\ndesabonne b\n",
                "expected": "envoi a : trafic total 1\nenvoi b : trafic total 2\nreplyall a : trafic total 4\ndesabonne b : trafic total 4\nboites : 1\ntrafic total : 4"
          }
    ],
    tests: [
          {
                "label": "Un envoi seul",
                "stdin": "cas:1",
                "expected": "envoi a : trafic total 1\nboites : 1\ntrafic total : 1"
          },
          {
                "label": "Replyall sur boite absente",
                "stdin": "cas:2",
                "expected": "envoi a : trafic total 1\nreplyall a : trafic total 2\nboites : 1\ntrafic total : 2"
          },
          {
                "label": "Cinq actions",
                "stdin": "cas:3",
                "expected": "envoi a : trafic total 1\nenvoi b : trafic total 2\nenvoi c : trafic total 3\nreplyall a : trafic total 6\nreplyall b : trafic total 9\nboites : 3\ntrafic total : 9"
          }
    ],
    solution: "[Exemple]\nenvoi a : trafic total 1\nenvoi b : trafic total 2\nreplyall a : trafic total 4\ndesabonne b : trafic total 4\nboites : 1\ntrafic total : 4\n\n[Cas 1 — Un envoi seul]\nenvoi a : trafic total 1\nboites : 1\ntrafic total : 1\n\n[Cas 2 — Replyall sur boite absente]\nenvoi a : trafic total 1\nreplyall a : trafic total 2\nboites : 1\ntrafic total : 2\n\n[Cas 3 — Cinq actions]\nenvoi a : trafic total 1\nenvoi b : trafic total 2\nenvoi c : trafic total 3\nreplyall a : trafic total 6\nreplyall b : trafic total 9\nboites : 3\ntrafic total : 9\n"
  },
  {
    id: "en-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "The three-part structure",
    goal: "Vérifier la structure Opening / Body / Closing d'une présentation : dire, dire, dire.",
    brief: "<p>Pour chaque situation proposée : partie vaut <code>open</code> (0-30 s), <code>body</code> (1,5-2 min) ou <code>close</code> (30 s). La présentation est <code>valide</code> si les parties arrivent dans l'ordre open, puis body, puis close (body peut apparaître plusieurs fois). Pour chaque situation, indiquez <code>partie : ok</code> ou <code>partie : hors structure</code>. Final : <code>presentation : valide</code> ou <code>presentation : a revoir</code>.</p>",
    starter: "# Grille d'analyse (en-c3-e1) — The three-part structure\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Close sans open]\n# Données : 1 close\nA_COMPLETER\n\n[Cas 2 — Ouverture double]\n# Données : 1 open\n# Données : 2 open\nA_COMPLETER\n\n[Cas 3 — Cinq minutes]\n# Données : 1 open\n# Données : 2 body\n# Données : 3 body\n# Données : 4 close\n# Données : 5 close\nA_COMPLETER\n",
    hints: [
          "Trois étapes numérotées : open avance à 1, body avance à 2 (ou reste 2), close avance à 3.",
          "Un drapeau rompu : toute sortie d'ordre casse la présentation pour la suite."
    ],
    examples: [
          {
                "stdin": "4\n1 open\n2 body\n3 body\n4 close\n",
                "expected": "open : ok\nbody : ok\nbody : ok\nclose : ok\npresentation : valide"
          }
    ],
    tests: [
          {
                "label": "Close sans open",
                "stdin": "cas:1",
                "expected": "close : hors structure\npresentation : a revoir"
          },
          {
                "label": "Ouverture double",
                "stdin": "cas:2",
                "expected": "open : ok\nopen : hors structure\npresentation : a revoir"
          },
          {
                "label": "Cinq minutes",
                "stdin": "cas:3",
                "expected": "open : ok\nbody : ok\nbody : ok\nclose : ok\nclose : hors structure\npresentation : a revoir"
          }
    ],
    solution: "[Exemple]\nopen : ok\nbody : ok\nbody : ok\nclose : ok\npresentation : valide\n\n[Cas 1 — Close sans open]\nclose : hors structure\npresentation : a revoir\n\n[Cas 2 — Ouverture double]\nopen : ok\nopen : hors structure\npresentation : a revoir\n\n[Cas 3 — Cinq minutes]\nopen : ok\nbody : ok\nbody : ok\nclose : ok\nclose : hors structure\npresentation : a revoir\n"
  },
  {
    id: "en-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "The Grandma Rule",
    goal: "Simplifier le jargon technique pour un public non technique : compter les termes complexes restants.",
    brief: "<p>Pour chaque situation proposée : famille vaut <code>tech</code> (jargon) ou <code>simple</code>. Chaque terme tech porte une pénalité de 2 points, chaque mot simple 0 point. Affichage ligne par ligne : <code>mot : penalite P</code>. Final : <code>score clarte : S/10</code> où S = 10 − somme des pénalités (jamais en dessous de 0), et <code>grandma : comprend</code> si S ≥ 6, <code>grandma : perdu</code> sinon.</p>",
    starter: "# Grille d'analyse (en-c3-e2) — The Grandma Rule\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Que des mots simples]\n# Données : server simple\n# Données : crash simple\nA_COMPLETER\n\n[Cas 2 — Que du jargon]\n# Données : API tech\n# Données : endpoint tech\n# Données : exception tech\nA_COMPLETER\n\n[Cas 3 — Cinq mots]\n# Données : pipeline tech\n# Données : mismatch tech\n# Données : setup simple\n# Données : wire simple\n# Données : fix simple\nA_COMPLETER\n",
    hints: [
          "tech = 2 points de pénalité, simple = 0 : un if suffit.",
          "Le score est borné : si 10 − pénalités est négatif, on affiche 0."
    ],
    examples: [
          {
                "stdin": "4\ndeployment tech\nrelease simple\nsettings simple\nfailure tech\n",
                "expected": "deployment : penalite 2\nrelease : penalite 0\nsettings : penalite 0\nfailure : penalite 2\nscore clarte : 6/10\ngrandma : comprend"
          }
    ],
    tests: [
          {
                "label": "Que des mots simples",
                "stdin": "cas:1",
                "expected": "server : penalite 0\ncrash : penalite 0\nscore clarte : 10/10\ngrandma : comprend"
          },
          {
                "label": "Que du jargon",
                "stdin": "cas:2",
                "expected": "API : penalite 2\nendpoint : penalite 2\nexception : penalite 2\nscore clarte : 4/10\ngrandma : perdu"
          },
          {
                "label": "Cinq mots",
                "stdin": "cas:3",
                "expected": "pipeline : penalite 2\nmismatch : penalite 2\nsetup : penalite 0\nwire : penalite 0\nfix : penalite 0\nscore clarte : 6/10\ngrandma : comprend"
          }
    ],
    solution: "[Exemple]\ndeployment : penalite 2\nrelease : penalite 0\nsettings : penalite 0\nfailure : penalite 2\nscore clarte : 6/10\ngrandma : comprend\n\n[Cas 1 — Que des mots simples]\nserver : penalite 0\ncrash : penalite 0\nscore clarte : 10/10\ngrandma : comprend\n\n[Cas 2 — Que du jargon]\nAPI : penalite 2\nendpoint : penalite 2\nexception : penalite 2\nscore clarte : 4/10\ngrandma : perdu\n\n[Cas 3 — Cinq mots]\npipeline : penalite 2\nmismatch : penalite 2\nsetup : penalite 0\nwire : penalite 0\nfix : penalite 0\nscore clarte : 6/10\ngrandma : comprend\n"
  },
  {
    id: "en-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Transition phrases",
    goal: "Compter les transitions et vérifier qu'aucune ne manque : First, Next, Then, Finally, To summarize.",
    brief: "<p>Pour chaque situation proposée : transition vaut <code>first</code>, <code>next</code>, <code>then</code>, <code>finally</code> ou <code>summary</code>. Pour chaque situation, indiquez <code>position : transition</code>. Final : une ligne par transition attendue, dans l'ordre First, Next, Then, Finally, Summary : <code>Transition : presente</code> ou <code>Transition : absente</code>. Puis <code>transitions : X/5</code>.</p>",
    starter: "# Grille d'analyse (en-c3-e3) — Transition phrases\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Summary oubliée]\n# Données : 1 first\n# Données : 2 next\n# Données : 3 then\n# Données : 4 finally\nA_COMPLETER\n\n[Cas 2 — Deux répetitions]\n# Données : 1 first\n# Données : 2 first\n# Données : 3 next\n# Données : 4 then\nA_COMPLETER\n\n[Cas 3 — Sept positions]\n# Données : 1 summary\n# Données : 2 first\n# Données : 3 next\n# Données : 4 then\n# Données : 5 finally\n# Données : 6 summary\n# Données : 7 first\nA_COMPLETER\n",
    hints: [
          "Un tableau vues[transition]=1 marque le passage ; la liste d'audit est fixe.",
          "L'audit parcourt les cinq transitions dans l'ordre demandé et compte les présentes."
    ],
    examples: [
          {
                "stdin": "5\n1 first\n2 next\n3 then\n4 finally\n5 summary\n",
                "expected": "1 : first\n2 : next\n3 : then\n4 : finally\n5 : summary\nFirst : presente\nNext : presente\nThen : presente\nFinally : presente\nSummary : presente\ntransitions : 5/5"
          }
    ],
    tests: [
          {
                "label": "Summary oubliée",
                "stdin": "cas:1",
                "expected": "1 : first\n2 : next\n3 : then\n4 : finally\nFirst : presente\nNext : presente\nThen : presente\nFinally : presente\nSummary : absente\ntransitions : 4/5"
          },
          {
                "label": "Deux répetitions",
                "stdin": "cas:2",
                "expected": "1 : first\n2 : first\n3 : next\n4 : then\nFirst : presente\nNext : presente\nThen : presente\nFinally : absente\nSummary : absente\ntransitions : 3/5"
          },
          {
                "label": "Sept positions",
                "stdin": "cas:3",
                "expected": "1 : summary\n2 : first\n3 : next\n4 : then\n5 : finally\n6 : summary\n7 : first\nFirst : presente\nNext : presente\nThen : presente\nFinally : presente\nSummary : presente\ntransitions : 5/5"
          }
    ],
    solution: "[Exemple]\n1 : first\n2 : next\n3 : then\n4 : finally\n5 : summary\nFirst : presente\nNext : presente\nThen : presente\nFinally : presente\nSummary : presente\ntransitions : 5/5\n\n[Cas 1 — Summary oubliée]\n1 : first\n2 : next\n3 : then\n4 : finally\nFirst : presente\nNext : presente\nThen : presente\nFinally : presente\nSummary : absente\ntransitions : 4/5\n\n[Cas 2 — Deux répetitions]\n1 : first\n2 : first\n3 : next\n4 : then\nFirst : presente\nNext : presente\nThen : presente\nFinally : absente\nSummary : absente\ntransitions : 3/5\n\n[Cas 3 — Sept positions]\n1 : summary\n2 : first\n3 : next\n4 : then\n5 : finally\n6 : summary\n7 : first\nFirst : presente\nNext : presente\nThen : presente\nFinally : presente\nSummary : presente\ntransitions : 5/5\n"
  },
  {
    id: "en-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "The three -ed endings",
    goal: "Classer les verbes au prétérit selon la prononciation du -ed : /t/, /d/ ou /ɪd/.",
    brief: "<p>Pour chaque situation proposée : son vaut <code>t</code> (walked), <code>d</code> (played) ou <code>id</code> (wanted). Pour chaque situation, indiquez <code>verbe : /X/</code> où X est t, d ou ɪd. Concluez par trois lignes de comptage dans cet ordre : <code>son-t : X</code>, <code>son-d : X</code>, <code>son-id : X</code>.</p>",
    starter: "# Grille d'analyse (en-c4-e1) — The three -ed endings\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul son]\n# Données : needed id\nA_COMPLETER\n\n[Cas 2 — Deux son t]\n# Données : fixed t\n# Données : missed t\nA_COMPLETER\n\n[Cas 3 — Cinq verbes]\n# Données : laughed t\n# Données : called d\n# Données : started id\n# Données : deployed d\n# Données : ended id\nA_COMPLETER\n",
    hints: [
          "Un case à trois sons : t, d, id.",
          "Les trois totaux sortent après la boucle, dans l'ordre demandé."
    ],
    examples: [
          {
                "stdin": "3\nwalked t\nplayed d\nwanted id\n",
                "expected": "walked : /t/\nplayed : /d/\nwanted : /ɪd/\nson-t : 1\nson-d : 1\nson-id : 1"
          }
    ],
    tests: [
          {
                "label": "Un seul son",
                "stdin": "cas:1",
                "expected": "needed : /ɪd/\nson-t : 0\nson-d : 0\nson-id : 1"
          },
          {
                "label": "Deux son t",
                "stdin": "cas:2",
                "expected": "fixed : /t/\nmissed : /t/\nson-t : 2\nson-d : 0\nson-id : 0"
          },
          {
                "label": "Cinq verbes",
                "stdin": "cas:3",
                "expected": "laughed : /t/\ncalled : /d/\nstarted : /ɪd/\ndeployed : /d/\nended : /ɪd/\nson-t : 1\nson-d : 2\nson-id : 2"
          }
    ],
    solution: "[Exemple]\nwalked : /t/\nplayed : /d/\nwanted : /ɪd/\nson-t : 1\nson-d : 1\nson-id : 1\n\n[Cas 1 — Un seul son]\nneeded : /ɪd/\nson-t : 0\nson-d : 0\nson-id : 1\n\n[Cas 2 — Deux son t]\nfixed : /t/\nmissed : /t/\nson-t : 2\nson-d : 0\nson-id : 0\n\n[Cas 3 — Cinq verbes]\nlaughed : /t/\ncalled : /d/\nstarted : /ɪd/\ndeployed : /d/\nended : /ɪd/\nson-t : 1\nson-d : 2\nson-id : 2\n"
  },
  {
    id: "en-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Word stress pairs",
    goal: "Distinguer les paires d'accentuation : REcord (nom) / reCORD (verbe) — le sens change avec l'accent.",
    brief: "<p>Pour chaque situation proposée : classe vaut <code>noun</code> ou <code>verb</code>. Pour chaque situation, indiquez <code>mot : forme</code>, où forme vaut <code>REcord</code> (noun) ou <code>reCORD</code> (verb). Concluez par <code>noms : X/n</code>.</p>",
    starter: "# Grille d'analyse (en-c4-e2) — Word stress pairs\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul verbe]\n# Données : conduct verb\nA_COMPLETER\n\n[Cas 2 — Deux noms]\n# Données : object noun\n# Données : subject noun\nA_COMPLETER\n\n[Cas 3 — Cinq mots]\n# Données : record noun\n# Données : record verb\n# Données : object verb\n# Données : object noun\n# Données : conduct verb\nA_COMPLETER\n",
    hints: [
          "Un if sur la classe suffit : noun et verb sont les deux seules valeurs.",
          "Comptez seulement les noms (accent en tête)."
    ],
    examples: [
          {
                "stdin": "4\nrecord noun\nrecord verb\npresent noun\npresent verb\n",
                "expected": "record : REcord\nrecord : reCORD\npresent : PREsent\npresent : preSENT\nnoms : 2/4"
          }
    ],
    tests: [
          {
                "label": "Un seul verbe",
                "stdin": "cas:1",
                "expected": "conduct : conDUCT\nnoms : 0/1"
          },
          {
                "label": "Deux noms",
                "stdin": "cas:2",
                "expected": "object : OBject\nsubject : SUBject\nnoms : 2/2"
          },
          {
                "label": "Cinq mots",
                "stdin": "cas:3",
                "expected": "record : REcord\nrecord : reCORD\nobject : obJECT\nobject : OBject\nconduct : conDUCT\nnoms : 2/5"
          }
    ],
    solution: "[Exemple]\nrecord : REcord\nrecord : reCORD\npresent : PREsent\npresent : preSENT\nnoms : 2/4\n\n[Cas 1 — Un seul verbe]\nconduct : conDUCT\nnoms : 0/1\n\n[Cas 2 — Deux noms]\nobject : OBject\nsubject : SUBject\nnoms : 2/2\n\n[Cas 3 — Cinq mots]\nrecord : REcord\nrecord : reCORD\nobject : obJECT\nobject : OBject\nconduct : conDUCT\nnoms : 2/5\n"
  },
  {
    id: "en-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "Thought groups and pausing",
    goal: "Simuler les groupes de souffle : couper la phrase aux bons endroits pour ne plus sonner comme un robot.",
    brief: "<p>Pour chaque situation proposée : position est un entier et groupe vaut <code>pause</code> ou <code>run</code>. Le cas mesure la longueur des séquences consecutives de run séparées par des pause : une séquence de plus de 4 mots sonne robot. Pour chaque situation, indiquez <code>position groupe : compteur</code> où compteur est la longueur de la séquence courante de run (0 si pause). Final : <code>sequences robot : X</code> (nombre de séquences de run de longueur strictement supérieure à 4).</p>",
    starter: "# Grille d'analyse (en-c4-e3) — Thought groups and pausing\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule longue séquence]\n# Données : 1 run\n# Données : 2 run\n# Données : 3 run\n# Données : 4 run\n# Données : 5 run\n# Données : 6 pause\nA_COMPLETER\n\n[Cas 2 — Séquence non clôturée]\n# Données : 1 run\n# Données : 2 run\n# Données : 3 run\n# Données : 4 run\n# Données : 5 run\nA_COMPLETER\n\n[Cas 3 — Huit positions]\n# Données : 1 run\n# Données : 2 run\n# Données : 3 run\n# Données : 4 run\n# Données : 5 run\n# Données : 6 pause\n# Données : 7 run\n# Données : 8 pause\nA_COMPLETER\n",
    hints: [
          "run incrémente le compteur courant ; pause clôture la séquence : si courant > 4, robots++ puis courant = 0.",
          "Ne pas oublier la dernière séquence si elle se termine sans pause finale."
    ],
    examples: [
          {
                "stdin": "5\n1 run\n2 run\n3 pause\n4 run\n5 pause\n",
                "expected": "1 run : compteur 1\n2 run : compteur 2\n3 pause : compteur 0\n4 run : compteur 1\n5 pause : compteur 0\nsequences robot : 0"
          }
    ],
    tests: [
          {
                "label": "Une seule longue séquence",
                "stdin": "cas:1",
                "expected": "1 run : compteur 1\n2 run : compteur 2\n3 run : compteur 3\n4 run : compteur 4\n5 run : compteur 5\n6 pause : compteur 0\nsequences robot : 1"
          },
          {
                "label": "Séquence non clôturée",
                "stdin": "cas:2",
                "expected": "1 run : compteur 1\n2 run : compteur 2\n3 run : compteur 3\n4 run : compteur 4\n5 run : compteur 5\nsequences robot : 1"
          },
          {
                "label": "Huit positions",
                "stdin": "cas:3",
                "expected": "1 run : compteur 1\n2 run : compteur 2\n3 run : compteur 3\n4 run : compteur 4\n5 run : compteur 5\n6 pause : compteur 0\n7 run : compteur 1\n8 pause : compteur 0\nsequences robot : 1"
          }
    ],
    solution: "[Exemple]\n1 run : compteur 1\n2 run : compteur 2\n3 pause : compteur 0\n4 run : compteur 1\n5 pause : compteur 0\nsequences robot : 0\n\n[Cas 1 — Une seule longue séquence]\n1 run : compteur 1\n2 run : compteur 2\n3 run : compteur 3\n4 run : compteur 4\n5 run : compteur 5\n6 pause : compteur 0\nsequences robot : 1\n\n[Cas 2 — Séquence non clôturée]\n1 run : compteur 1\n2 run : compteur 2\n3 run : compteur 3\n4 run : compteur 4\n5 run : compteur 5\nsequences robot : 1\n\n[Cas 3 — Huit positions]\n1 run : compteur 1\n2 run : compteur 2\n3 run : compteur 3\n4 run : compteur 4\n5 run : compteur 5\n6 pause : compteur 0\n7 run : compteur 1\n8 pause : compteur 0\nsequences robot : 1\n"
  },
  {
    id: "en-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Gonna, wanna, gotta",
    goal: "Remplacer les réductions familières par leur forme formelle, et compter les corrections.",
    brief: "<p>Pour chaque situation proposée : registre vaut <code>form</code> (déjà formel) ou <code>reduce</code> (réduction familière). Pour chaque situation, indiquez <code>mot : forme</code>, où forme vaut <code>formel</code> (form) ou <code>correction : going to</code> (reduce). Concluez par <code>corrections : X/n</code>.</p>",
    starter: "# Grille d'analyse (en-c5-e1) — Gonna, wanna, gotta\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule correction]\n# Données : reduce gotta\nA_COMPLETER\n\n[Cas 2 — Que du formel]\n# Données : form review\n# Données : form attach\nA_COMPLETER\n\n[Cas 3 — Cinq lignes]\n# Données : reduce gonna\n# Données : form budget\n# Données : reduce wanna\n# Données : form sprint\n# Données : reduce gotta\nA_COMPLETER\n",
    hints: [
          "Un if sur le registre suffit : form et reduce sont les deux seules valeurs.",
          "Le compteur suit exactement les lignes « correction »."
    ],
    examples: [
          {
                "stdin": "4\nform deploy\nreduce gonna\nform send\nreduce wanna\n",
                "expected": "deploy : formel\ngonna : correction : going to\nsend : formel\nwanna : correction : want to\ncorrections : 2/4"
          }
    ],
    tests: [
          {
                "label": "Une seule correction",
                "stdin": "cas:1",
                "expected": "gotta : correction : got to\ncorrections : 1/1"
          },
          {
                "label": "Que du formel",
                "stdin": "cas:2",
                "expected": "review : formel\nattach : formel\ncorrections : 0/2"
          },
          {
                "label": "Cinq lignes",
                "stdin": "cas:3",
                "expected": "gonna : correction : going to\nbudget : formel\nwanna : correction : want to\nsprint : formel\ngotta : correction : got to\ncorrections : 3/5"
          }
    ],
    solution: "[Exemple]\ndeploy : formel\ngonna : correction : going to\nsend : formel\nwanna : correction : want to\ncorrections : 2/4\n\n[Cas 1 — Une seule correction]\ngotta : correction : got to\ncorrections : 1/1\n\n[Cas 2 — Que du formel]\nreview : formel\nattach : formel\ncorrections : 0/2\n\n[Cas 3 — Cinq lignes]\ngonna : correction : going to\nbudget : formel\nwanna : correction : want to\nsprint : formel\ngotta : correction : got to\ncorrections : 3/5\n"
  },
  {
    id: "en-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Intonation rising or falling",
    goal: "Choisir l'intonation : montante (questions oui/non), descendante (déclarations, questions WH).",
    brief: "<p>Pour chaque situation proposée : type vaut <code>yesno</code> (question oui/non), <code>wh</code> (question WH) ou <code>statement</code> (déclaration). Pour chaque situation, indiquez <code>phrase : intonation</code>, où intonation vaut <code>montante</code> (yesno) ou <code>descendante</code> (wh et statement). Concluez par <code>questions montantes : X/n</code>.</p>",
    starter: "# Grille d'analyse (en-c5-e2) — Intonation rising or falling\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule question WH]\n# Données : q wh\nA_COMPLETER\n\n[Cas 2 — Deux yesno]\n# Données : q1 yesno\n# Données : q2 yesno\nA_COMPLETER\n\n[Cas 3 — Cinq lignes]\n# Données : q1 yesno\n# Données : s1 statement\n# Données : q2 wh\n# Données : q3 yesno\n# Données : s2 statement\nA_COMPLETER\n",
    hints: [
          "Seules les questions oui/non montent : wh et statement descendent.",
          "Le compteur suit exactement les intonations montantes."
    ],
    examples: [
          {
                "stdin": "3\nq1 yesno\nq2 wh\ns1 statement\n",
                "expected": "q1 : montante\nq2 : descendante\ns1 : descendante\nquestions montantes : 1/3"
          }
    ],
    tests: [
          {
                "label": "Une seule question WH",
                "stdin": "cas:1",
                "expected": "q : descendante\nquestions montantes : 0/1"
          },
          {
                "label": "Deux yesno",
                "stdin": "cas:2",
                "expected": "q1 : montante\nq2 : montante\nquestions montantes : 2/2"
          },
          {
                "label": "Cinq lignes",
                "stdin": "cas:3",
                "expected": "q1 : montante\ns1 : descendante\nq2 : descendante\nq3 : montante\ns2 : descendante\nquestions montantes : 2/5"
          }
    ],
    solution: "[Exemple]\nq1 : montante\nq2 : descendante\ns1 : descendante\nquestions montantes : 1/3\n\n[Cas 1 — Une seule question WH]\nq : descendante\nquestions montantes : 0/1\n\n[Cas 2 — Deux yesno]\nq1 : montante\nq2 : montante\nquestions montantes : 2/2\n\n[Cas 3 — Cinq lignes]\nq1 : montante\ns1 : descendante\nq2 : descendante\nq3 : montante\ns2 : descendante\nquestions montantes : 2/5\n"
  },
  {
    id: "en-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "The fluency tracker",
    goal: "Suivre une semaine d'entraînement : enregistrer, écouter, corriger — et décider si la fluidité progresse.",
    brief: "<p>Pour chaque situation proposée : defauts X</code>. Le cas compte ensuite les jours d'amélioration (moins de défauts que le jour précédent) et affiche <code>ameliorations : X/n-1</code> (0 si n = 1), puis <code>verdict : progresse</code> si les améliorations sont majoritaires, <code>verdict : stagne</code> sinon.</p>",
    starter: "# Grille d'analyse (en-c5-e3) — The fluency tracker\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul jour]\n# Données : lun 5\nA_COMPLETER\n\n[Cas 2 — Que des hausses]\n# Données : lun 2\n# Données : mar 4\n# Données : mer 6\nA_COMPLETER\n\n[Cas 3 — Cinq jours]\n# Données : lun 9\n# Données : mar 7\n# Données : mer 8\n# Données : jeu 5\n# Données : ven 6\nA_COMPLETER\n",
    hints: [
          "Retenez la valeur du jour précédent ; comparez seulement quand elle existe.",
          "Le décompte des comparaisons est n - 1 ; le verdict est un test de majorité."
    ],
    examples: [
          {
                "stdin": "4\nlun 8\nmar 6\nmer 7\njeu 5\n",
                "expected": "lun : defauts 8\nmar : defauts 6\nmer : defauts 7\njeu : defauts 5\nameliorations : 2/3\nverdict : progresse"
          }
    ],
    tests: [
          {
                "label": "Un seul jour",
                "stdin": "cas:1",
                "expected": "lun : defauts 5\nameliorations : 0/0\nverdict : stagne"
          },
          {
                "label": "Que des hausses",
                "stdin": "cas:2",
                "expected": "lun : defauts 2\nmar : defauts 4\nmer : defauts 6\nameliorations : 0/2\nverdict : stagne"
          },
          {
                "label": "Cinq jours",
                "stdin": "cas:3",
                "expected": "lun : defauts 9\nmar : defauts 7\nmer : defauts 8\njeu : defauts 5\nven : defauts 6\nameliorations : 2/4\nverdict : stagne"
          }
    ],
    solution: "[Exemple]\nlun : defauts 8\nmar : defauts 6\nmer : defauts 7\njeu : defauts 5\nameliorations : 2/3\nverdict : progresse\n\n[Cas 1 — Un seul jour]\nlun : defauts 5\nameliorations : 0/0\nverdict : stagne\n\n[Cas 2 — Que des hausses]\nlun : defauts 2\nmar : defauts 4\nmer : defauts 6\nameliorations : 0/2\nverdict : stagne\n\n[Cas 3 — Cinq jours]\nlun : defauts 9\nmar : defauts 7\nmer : defauts 8\njeu : defauts 5\nven : defauts 6\nameliorations : 2/4\nverdict : stagne\n"
  },
  {
    id: "en-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Polite requests",
    goal: "Corriger les phrases télégraphiques en requêtes polies : sujet + verbe conjugué + formule.",
    brief: "<p>Pour chaque situation proposée : problème vaut <code>sujet</code> (sujet manquant), <code>verbe</code> (verbe non conjugué) ou <code>politesse</code> (formule polie absente). Une phrase correcte vaut <code>aucun</code>. Pour chaque situation, indiquez <code>phrase : probleme</code> ou <code>phrase : correcte</code>. Final : <code>phrases correctes : X/n</code>.</p>",
    starter: "# Grille d'analyse (en-c6-e1) — Polite requests\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule correcte]\n# Données : p aucun\nA_COMPLETER\n\n[Cas 2 — Que des défauts]\n# Données : p1 verbe\n# Données : p2 sujet\nA_COMPLETER\n\n[Cas 3 — Cinq phrases]\n# Données : p1 aucun\n# Données : p2 verbe\n# Données : p3 aucun\n# Données : p4 politesse\n# Données : p5 aucun\nA_COMPLETER\n",
    hints: [
          "Seule la valeur aucun donne « correcte » : sujet, verbe et politesse sont des défauts.",
          "Le compteur suit exactement les phrases correctes."
    ],
    examples: [
          {
                "stdin": "3\np1 sujet\np2 aucun\np3 politesse\n",
                "expected": "p1 : probleme\np2 : correcte\np3 : probleme\nphrases correctes : 1/3"
          }
    ],
    tests: [
          {
                "label": "Une seule correcte",
                "stdin": "cas:1",
                "expected": "p : correcte\nphrases correctes : 1/1"
          },
          {
                "label": "Que des défauts",
                "stdin": "cas:2",
                "expected": "p1 : probleme\np2 : probleme\nphrases correctes : 0/2"
          },
          {
                "label": "Cinq phrases",
                "stdin": "cas:3",
                "expected": "p1 : correcte\np2 : probleme\np3 : correcte\np4 : probleme\np5 : correcte\nphrases correctes : 3/5"
          }
    ],
    solution: "[Exemple]\np1 : probleme\np2 : correcte\np3 : probleme\nphrases correctes : 1/3\n\n[Cas 1 — Une seule correcte]\np : correcte\nphrases correctes : 1/1\n\n[Cas 2 — Que des défauts]\np1 : probleme\np2 : probleme\nphrases correctes : 0/2\n\n[Cas 3 — Cinq phrases]\np1 : correcte\np2 : probleme\np3 : correcte\np4 : probleme\np5 : correcte\nphrases correctes : 3/5\n"
  },
  {
    id: "en-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Subject verb agreement",
    goal: "Vérifier l'accord sujet-verbe : la phrase est correcte quand le verbe correspond au sujet.",
    brief: "<p>Pour chaque situation proposée : accord vaut <code>ok</code> (accord correct), <code>singular</code> (sujet singulier, verbe pluriel) ou <code>plural</code> (sujet pluriel, verbe singulier). Pour chaque situation, indiquez <code>phrase : verdict</code> où verdict vaut <code>correcte</code> (ok) ou <code>accorder</code> (à corriger). Final : <code>erreurs : X</code> et <code>taux : Y/n</code> avec Y = nombre de phrases correctes.</p>",
    starter: "# Grille d'analyse (en-c6-e2) — Subject verb agreement\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule erreur]\n# Données : p singular\nA_COMPLETER\n\n[Cas 2 — Que des accords]\n# Données : p1 ok\n# Données : p2 ok\nA_COMPLETER\n\n[Cas 3 — Cinq phrases]\n# Données : p1 ok\n# Données : p2 plural\n# Données : p3 ok\n# Données : p4 singular\n# Données : p5 ok\nA_COMPLETER\n",
    hints: [
          "Seul ok donne « correcte » : singular et plural sont des erreurs d'accord.",
          "Deux compteurs suffisent : erreurs, et le taux se déduit (n - erreurs)."
    ],
    examples: [
          {
                "stdin": "4\np1 ok\np2 singular\np3 plural\np4 ok\n",
                "expected": "p1 : correcte\np2 : accorder\np3 : accorder\np4 : correcte\nerreurs : 2\ntaux : 2/4"
          }
    ],
    tests: [
          {
                "label": "Une seule erreur",
                "stdin": "cas:1",
                "expected": "p : accorder\nerreurs : 1\ntaux : 0/1"
          },
          {
                "label": "Que des accords",
                "stdin": "cas:2",
                "expected": "p1 : correcte\np2 : correcte\nerreurs : 0\ntaux : 2/2"
          },
          {
                "label": "Cinq phrases",
                "stdin": "cas:3",
                "expected": "p1 : correcte\np2 : accorder\np3 : correcte\np4 : accorder\np5 : correcte\nerreurs : 2\ntaux : 3/5"
          }
    ],
    solution: "[Exemple]\np1 : correcte\np2 : accorder\np3 : accorder\np4 : correcte\nerreurs : 2\ntaux : 2/4\n\n[Cas 1 — Une seule erreur]\np : accorder\nerreurs : 1\ntaux : 0/1\n\n[Cas 2 — Que des accords]\np1 : correcte\np2 : correcte\nerreurs : 0\ntaux : 2/2\n\n[Cas 3 — Cinq phrases]\np1 : correcte\np2 : accorder\np3 : correcte\np4 : accorder\np5 : correcte\nerreurs : 2\ntaux : 3/5\n"
  },
  {
    id: "en-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "The final assessment",
    goal: "Évaluer le parcours complet (le test final du support) : quatre compétences notées, verdict de passage.",
    brief: "<p>L’analyse porte sur d'abord <code>seuil</code> (score minimal, entier). Puis il lit <strong>n lignes</strong> « competence score » (score entier). Pour chaque situation, indiquez <code>competence : score X</code>. Final : <code>moyenne : M</code> (moyenne entière arrondie vers le bas) et <code>verdict : admis</code> si M ≥ seuil, <code>verdict : entrainement</code> sinon. Si n = 0, afficher <code>moyenne : 0</code>.</p>",
    starter: "# Grille d'analyse (en-c6-e3) — The final assessment\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Sous le seuil]\n# Données : 2\n# Données : vocabulaire 70\n# Données : emails 75\nA_COMPLETER\n\n[Cas 2 — Aucune competence]\n# Données : 0\nA_COMPLETER\n\n[Cas 3 — Cinq competences]\n# Données : 5\n# Données : a 80\n# Données : b 70\n# Données : c 90\n# Données : d 65\n# Données : e 75\nA_COMPLETER\n",
    hints: [
          "Cumulez les scores puis divisez : la division entière bash arrondit vers le bas naturellement.",
          "Protégez le cas n = 0 pour éviter une division par zéro."
    ],
    examples: [
          {
                "stdin": "70\n4\nvocabulaire 80\nemails 90\npresentations 60\nprononciation 75\n",
                "expected": "vocabulaire : score 80\nemails : score 90\npresentations : score 60\nprononciation : score 75\nmoyenne : 76\nverdict : admis"
          }
    ],
    tests: [
          {
                "label": "Sous le seuil",
                "stdin": "cas:1",
                "expected": "vocabulaire : score 70\nemails : score 75\nmoyenne : 72\nverdict : entrainement"
          },
          {
                "label": "Aucune competence",
                "stdin": "cas:2",
                "expected": "moyenne : 0\nverdict : entrainement"
          },
          {
                "label": "Cinq competences",
                "stdin": "cas:3",
                "expected": "a : score 80\nb : score 70\nc : score 90\nd : score 65\ne : score 75\nmoyenne : 76\nverdict : admis"
          }
    ],
    solution: "[Exemple]\nvocabulaire : score 80\nemails : score 90\npresentations : score 60\nprononciation : score 75\nmoyenne : 76\nverdict : admis\n\n[Cas 1 — Sous le seuil]\nvocabulaire : score 70\nemails : score 75\nmoyenne : 72\nverdict : entrainement\n\n[Cas 2 — Aucune competence]\nmoyenne : 0\nverdict : entrainement\n\n[Cas 3 — Cinq competences]\na : score 80\nb : score 70\nc : score 90\nd : score 65\ne : score 75\nmoyenne : 76\nverdict : admis\n"
  }
];
