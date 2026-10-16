/**
 * Catalogue des 18 études de cas du cours « b1-fr-pro ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "fr-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Les trois canaux de Mehrabian",
    goal: "Classer chaque élément d'une prise de parole selon la théorie de Mehrabian : verbal, para-verbal, non-verbal.",
    brief: "<p>Pour chaque situation proposée : canal vaut <code>mot</code> (les mots prononcés), <code>voix</code> (rythme, intonation, volume) ou <code>corps</code> (gestuelle, regard, tenue). Pour chaque situation, indiquez <code>element : canal</code>, où canal vaut <code>verbal</code>, <code>para-verbal</code> ou <code>non-verbal</code>. Concluez par <code>para-verbal : X/n</code>.</p>",
    starter: "# Grille d'analyse (fr-c1-e1) — Les trois canaux de Mehrabian\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul element corporel]\n# Données : posture corps\nA_COMPLETER\n\n[Cas 2 — Deux elements mixtes]\n# Données : intonation voix\n# Données : vocabulaire mot\nA_COMPLETER\n\n[Cas 3 — Cinq elements]\n# Données : mots mot\n# Données : volume voix\n# Données : expressions corps\n# Données : articulation voix\n# Données : vestimentaire corps\nA_COMPLETER\n",
    hints: [
          "Un case à trois canaux : mot, voix, corps — chacun traduit son nom complet.",
          "Le compteur suit exactement les lignes « voix » ; le bilan sort après la boucle."
    ],
    examples: [
          {
                "stdin": "3\nlexical mot\nrythme voix\ngestuelle corps\n",
                "expected": "lexical : verbal\nrythme : para-verbal\ngestuelle : non-verbal\npara-verbal : 1/3"
          }
    ],
    tests: [
          {
                "label": "Un seul element corporel",
                "stdin": "cas:1",
                "expected": "posture : non-verbal\npara-verbal : 0/1"
          },
          {
                "label": "Deux elements mixtes",
                "stdin": "cas:2",
                "expected": "intonation : para-verbal\nvocabulaire : verbal\npara-verbal : 1/2"
          },
          {
                "label": "Cinq elements",
                "stdin": "cas:3",
                "expected": "mots : verbal\nvolume : para-verbal\nexpressions : non-verbal\narticulation : para-verbal\nvestimentaire : non-verbal\npara-verbal : 2/5"
          }
    ],
    solution: "[Exemple]\nlexical : verbal\nrythme : para-verbal\ngestuelle : non-verbal\npara-verbal : 1/3\n\n[Cas 1 — Un seul element corporel]\nposture : non-verbal\npara-verbal : 0/1\n\n[Cas 2 — Deux elements mixtes]\nintonation : para-verbal\nvocabulaire : verbal\npara-verbal : 1/2\n\n[Cas 3 — Cinq elements]\nmots : verbal\nvolume : para-verbal\nexpressions : non-verbal\narticulation : para-verbal\nvestimentaire : non-verbal\npara-verbal : 2/5\n"
  },
  {
    id: "fr-c1-e2",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Logos, pathos, ethos",
    goal: "Appliquer la grille d'Aristote : un discours n'est équilibré que si la raison, l'émotion et la crédibilité parlent toutes trois.",
    brief: "<p>Pour chaque situation proposée : famille vaut <code>raison</code> (logos), <code>emotion</code> (pathos) ou <code>confiance</code> (éthos). Pour chaque situation, indiquez <code>argument : nom_grec</code>, où nom_grec vaut <code>logos</code>, <code>pathos</code> ou <code>ethos</code>. Concluez par <code>discours : equilibre</code> si les trois ressorts sont présents au moins une fois, <code>discours : incomplet</code> sinon.</p>",
    starter: "# Grille d'analyse (fr-c1-e2) — Logos, pathos, ethos\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Que des chiffres]\n# Données : chiffres raison\n# Données : donnees raison\nA_COMPLETER\n\n[Cas 2 — Pathos dominant]\n# Données : plaidoyer emotion\n# Données : histoire emotion\n# Données : references confiance\nA_COMPLETER\n\n[Cas 3 — Cinq arguments]\n# Données : stats raison\n# Données : exemples raison\n# Données : recit emotion\n# Données : assurance confiance\n# Données : exprience confiance\nA_COMPLETER\n",
    hints: [
          "Un case traduit la famille en nom grec ; un tableau vues[nom]=1 marque le passage.",
          "Le verdict final teste les trois clés logos, pathos, ethos."
    ],
    examples: [
          {
                "stdin": "3\nchiffres raison\ntemoignage emotion\ndiplomes confiance\n",
                "expected": "chiffres : logos\ntemoignage : pathos\ndiplomes : ethos\ndiscours : equilibre"
          }
    ],
    tests: [
          {
                "label": "Que des chiffres",
                "stdin": "cas:1",
                "expected": "chiffres : logos\ndonnees : logos\ndiscours : incomplet"
          },
          {
                "label": "Pathos dominant",
                "stdin": "cas:2",
                "expected": "plaidoyer : pathos\nhistoire : pathos\nreferences : ethos\ndiscours : incomplet"
          },
          {
                "label": "Cinq arguments",
                "stdin": "cas:3",
                "expected": "stats : logos\nexemples : logos\nrecit : pathos\nassurance : ethos\nexprience : ethos\ndiscours : equilibre"
          }
    ],
    solution: "[Exemple]\nchiffres : logos\ntemoignage : pathos\ndiplomes : ethos\ndiscours : equilibre\n\n[Cas 1 — Que des chiffres]\nchiffres : logos\ndonnees : logos\ndiscours : incomplet\n\n[Cas 2 — Pathos dominant]\nplaidoyer : pathos\nhistoire : pathos\nreferences : ethos\ndiscours : incomplet\n\n[Cas 3 — Cinq arguments]\nstats : logos\nexemples : logos\nrecit : pathos\nassurance : ethos\nexprience : ethos\ndiscours : equilibre\n"
  },
  {
    id: "fr-c1-e3",
    chapter: 1,
    level: "n3",
    language: 'analyse',
    title: "Explicite et implicite",
    goal: "Séparer ce qui est dit de ce qui est voulu : « Il fait chaud dans ta chambre » est une demande déguisée.",
    brief: "<p>Pour chaque situation proposée : sens vaut <code>mot</code> (explicite : ce que la personne dit) ou <code>voile</code> (implicite : ce qu'elle veut dire). Pour chaque situation, indiquez <code>message : explicite</code> ou <code>message : implicite</code>. Concluez par <code>implicites : X/n</code>, puis <code>communication : a decoder</code> si les implicites sont strictement majoritaires, <code>communication : directe</code> sinon.</p>",
    starter: "# Grille d'analyse (fr-c1-e3) — Explicite et implicite\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule sous-entendu]\n# Données : m1 voile\nA_COMPLETER\n\n[Cas 2 — Que du litteral]\n# Données : m1 mot\n# Données : m2 mot\nA_COMPLETER\n\n[Cas 3 — Cinq messages]\n# Données : m1 voile\n# Données : m2 mot\n# Données : m3 mot\n# Données : m4 mot\n# Données : m5 voile\nA_COMPLETER\n",
    hints: [
          "Seule la valeur voile donne « implicite » : mot donne « explicite ».",
          "Strictement majoritaires : le nombre d'implicites doit dépasser celui des explicites (n - implicites)."
    ],
    examples: [
          {
                "stdin": "4\nm1 voile\nm2 mot\nm3 voile\nm4 mot\n",
                "expected": "m1 : implicite\nm2 : explicite\nm3 : implicite\nm4 : explicite\nimplicites : 2/4\ncommunication : directe"
          }
    ],
    tests: [
          {
                "label": "Une seule sous-entendu",
                "stdin": "cas:1",
                "expected": "m1 : implicite\nimplicites : 1/1\ncommunication : a decoder"
          },
          {
                "label": "Que du litteral",
                "stdin": "cas:2",
                "expected": "m1 : explicite\nm2 : explicite\nimplicites : 0/2\ncommunication : directe"
          },
          {
                "label": "Cinq messages",
                "stdin": "cas:3",
                "expected": "m1 : implicite\nm2 : explicite\nm3 : explicite\nm4 : explicite\nm5 : implicite\nimplicites : 2/5\ncommunication : directe"
          }
    ],
    solution: "[Exemple]\nm1 : implicite\nm2 : explicite\nm3 : implicite\nm4 : explicite\nimplicites : 2/4\ncommunication : directe\n\n[Cas 1 — Une seule sous-entendu]\nm1 : implicite\nimplicites : 1/1\ncommunication : a decoder\n\n[Cas 2 — Que du litteral]\nm1 : explicite\nm2 : explicite\nimplicites : 0/2\ncommunication : directe\n\n[Cas 3 — Cinq messages]\nm1 : implicite\nm2 : explicite\nm3 : explicite\nm4 : explicite\nm5 : implicite\nimplicites : 2/5\ncommunication : directe\n"
  },
  {
    id: "fr-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Familier, courant, soutenu",
    goal: "Ranger chaque mot dans son niveau de langue : cailler, avoir très froid, être mort de froid.",
    brief: "<p>Pour chaque situation proposée : registre vaut <code>fam</code> (familier), <code>cour</code> (courant) ou <code>sout</code> (soutenu). Pour chaque situation, indiquez <code>mot : niveau</code>, où niveau vaut <code>familier</code>, <code>courant</code> ou <code>soutenu</code>. Concluez par trois lignes de comptage dans cet ordre : <code>familier : X</code>, <code>courant : Y</code>, <code>soutenu : Z</code>.</p>",
    starter: "# Grille d'analyse (fr-c2-e1) — Familier, courant, soutenu\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul familier]\n# Données : cailler fam\nA_COMPLETER\n\n[Cas 2 — Deux niveaux]\n# Données : zyeuter fam\n# Données : regarder cour\nA_COMPLETER\n\n[Cas 3 — Cinq mots]\n# Données : bagnole fam\n# Données : voiture cour\n# Données : automobile sout\n# Données : degoter fam\n# Données : decouvrir sout\nA_COMPLETER\n",
    hints: [
          "Un case à trois registres : fam, cour, sout.",
          "Les trois totaux sortent après la boucle, dans l'ordre familier, courant, soutenu."
    ],
    examples: [
          {
                "stdin": "3\nbouffer fam\nmanger cour\nsustenter sout\n",
                "expected": "bouffer : familier\nmanger : courant\nsustenter : soutenu\nfamilier : 1\ncourant : 1\nsoutenu : 1"
          }
    ],
    tests: [
          {
                "label": "Un seul familier",
                "stdin": "cas:1",
                "expected": "cailler : familier\nfamilier : 1\ncourant : 0\nsoutenu : 0"
          },
          {
                "label": "Deux niveaux",
                "stdin": "cas:2",
                "expected": "zyeuter : familier\nregarder : courant\nfamilier : 1\ncourant : 1\nsoutenu : 0"
          },
          {
                "label": "Cinq mots",
                "stdin": "cas:3",
                "expected": "bagnole : familier\nvoiture : courant\nautomobile : soutenu\ndegoter : familier\ndecouvrir : soutenu\nfamilier : 2\ncourant : 1\nsoutenu : 2"
          }
    ],
    solution: "[Exemple]\nbouffer : familier\nmanger : courant\nsustenter : soutenu\nfamilier : 1\ncourant : 1\nsoutenu : 1\n\n[Cas 1 — Un seul familier]\ncailler : familier\nfamilier : 1\ncourant : 0\nsoutenu : 0\n\n[Cas 2 — Deux niveaux]\nzyeuter : familier\nregarder : courant\nfamilier : 1\ncourant : 1\nsoutenu : 0\n\n[Cas 3 — Cinq mots]\nbagnole : familier\nvoiture : courant\nautomobile : soutenu\ndegoter : familier\ndecouvrir : soutenu\nfamilier : 2\ncourant : 1\nsoutenu : 2\n"
  },
  {
    id: "fr-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Le trio des trois registres",
    goal: "Vérifier qu'une notion est couverte par les trois niveaux : bouffer, manger, se sustenter.",
    brief: "<p>Pour chaque situation proposée : notion vaut <code>manger</code>, <code>regarder</code> ou <code>dormir</code> ; registre vaut <code>fam</code>, <code>cour</code> ou <code>sout</code>. Pour chaque situation, indiquez <code>mot : niveau</code> (familier, courant ou soutenu). Concluez par une ligne par notion, dans l'ordre manger, regarder, dormir : <code>notion : complete</code> (les trois registres vus), <code>notion : partielle</code> (au moins un) ou <code>notion : absente</code>. Puis <code>trios : X/3</code>.</p>",
    starter: "# Grille d'analyse (fr-c2-e2) — Le trio des trois registres\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un trio complet seulement]\n# Données : bouffer manger fam\n# Données : manger manger cour\n# Données : sustenter manger sout\nA_COMPLETER\n\n[Cas 2 — Trio incomplet]\n# Données : roupiller dormir fam\n# Données : assoupir dormir sout\nA_COMPLETER\n\n[Cas 3 — Deux notions melangees]\n# Données : zyeuter regarder fam\n# Données : regarder regarder cour\n# Données : considere regarder sout\n# Données : bouffer manger fam\n# Données : manger manger cour\nA_COMPLETER\n",
    hints: [
          "Trois tableaux associatifs : vf[notion]=1 pour fam, vc pour cour, vs pour sout.",
          "Une notion est complete seulement si les trois tableaux la connaissent ; partielle si un seul au moins."
    ],
    examples: [
          {
                "stdin": "6\nbouffer manger fam\nmanger manger cour\nsustenter manger sout\nzyeuter regarder fam\nregarder regarder cour\nconsidere regarder sout\n",
                "expected": "bouffer : familier\nmanger : courant\nsustenter : soutenu\nzyeuter : familier\nregarder : courant\nconsidere : soutenu\nmanger : complete\nregarder : complete\ndormir : absente\ntrios : 2/3"
          }
    ],
    tests: [
          {
                "label": "Un trio complet seulement",
                "stdin": "cas:1",
                "expected": "bouffer : familier\nmanger : courant\nsustenter : soutenu\nmanger : complete\nregarder : absente\ndormir : absente\ntrios : 1/3"
          },
          {
                "label": "Trio incomplet",
                "stdin": "cas:2",
                "expected": "roupiller : familier\nassoupir : soutenu\nmanger : absente\nregarder : absente\ndormir : partielle\ntrios : 0/3"
          },
          {
                "label": "Deux notions melangees",
                "stdin": "cas:3",
                "expected": "zyeuter : familier\nregarder : courant\nconsidere : soutenu\nbouffer : familier\nmanger : courant\nmanger : partielle\nregarder : complete\ndormir : absente\ntrios : 1/3"
          }
    ],
    solution: "[Exemple]\nbouffer : familier\nmanger : courant\nsustenter : soutenu\nzyeuter : familier\nregarder : courant\nconsidere : soutenu\nmanger : complete\nregarder : complete\ndormir : absente\ntrios : 2/3\n\n[Cas 1 — Un trio complet seulement]\nbouffer : familier\nmanger : courant\nsustenter : soutenu\nmanger : complete\nregarder : absente\ndormir : absente\ntrios : 1/3\n\n[Cas 2 — Trio incomplet]\nroupiller : familier\nassoupir : soutenu\nmanger : absente\nregarder : absente\ndormir : partielle\ntrios : 0/3\n\n[Cas 3 — Deux notions melangees]\nzyeuter : familier\nregarder : courant\nconsidere : soutenu\nbouffer : familier\nmanger : courant\nmanger : partielle\nregarder : complete\ndormir : absente\ntrios : 1/3\n"
  },
  {
    id: "fr-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "Verbes passe-partout",
    goal: "Traquer donner, faire et avoir au profit de verbes précis : prodiguer, commettre, détenir.",
    brief: "<p>Pour chaque situation proposée : verbe vaut <code>donner</code>, <code>faire</code> ou <code>avoir</code> (passe-partout à remplacer) ou <code>precis</code> (verbe précis déjà employé). Pour chaque situation, indiquez <code>mot : verbe passe-partout (donner)</code> (ou faire, ou avoir) ou <code>mot : precise</code>. Concluez par <code>passe-partout : X/n</code>, puis <code>texte : a enrichir</code> si les passe-partout sont strictement majoritaires, <code>texte : acceptable</code> sinon.</p>",
    starter: "# Grille d'analyse (fr-c2-e3) — Verbes passe-partout\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul faire]\n# Données : faire faire\nA_COMPLETER\n\n[Cas 2 — Que des verbes precis]\n# Données : commettre precis\n# Données : intenter precis\nA_COMPLETER\n\n[Cas 3 — Cinq verbes]\n# Données : donner donner\n# Données : conferer precis\n# Données : faire faire\n# Données : etablir precis\n# Données : avoir avoir\nA_COMPLETER\n",
    hints: [
          "Un case à quatre valeurs : donner, faire, avoir, tout le reste tombant dans precis.",
          "Strictement majoritaires : le double du compteur doit dépasser n."
    ],
    examples: [
          {
                "stdin": "4\nprodiguer precis\nconseils donner\nenquete faire\ndetient precis\n",
                "expected": "prodiguer : precise\nconseils : verbe passe-partout (donner)\nenquete : verbe passe-partout (faire)\ndetient : precise\npasse-partout : 2/4\ntexte : acceptable"
          }
    ],
    tests: [
          {
                "label": "Un seul faire",
                "stdin": "cas:1",
                "expected": "faire : verbe passe-partout (faire)\npasse-partout : 1/1\ntexte : a enrichir"
          },
          {
                "label": "Que des verbes precis",
                "stdin": "cas:2",
                "expected": "commettre : precise\nintenter : precise\npasse-partout : 0/2\ntexte : acceptable"
          },
          {
                "label": "Cinq verbes",
                "stdin": "cas:3",
                "expected": "donner : verbe passe-partout (donner)\nconferer : precise\nfaire : verbe passe-partout (faire)\netablir : precise\navoir : verbe passe-partout (avoir)\npasse-partout : 3/5\ntexte : a enrichir"
          }
    ],
    solution: "[Exemple]\nprodiguer : precise\nconseils : verbe passe-partout (donner)\nenquete : verbe passe-partout (faire)\ndetient : precise\npasse-partout : 2/4\ntexte : acceptable\n\n[Cas 1 — Un seul faire]\nfaire : verbe passe-partout (faire)\npasse-partout : 1/1\ntexte : a enrichir\n\n[Cas 2 — Que des verbes precis]\ncommettre : precise\nintenter : precise\npasse-partout : 0/2\ntexte : acceptable\n\n[Cas 3 — Cinq verbes]\ndonner : verbe passe-partout (donner)\nconferer : precise\nfaire : verbe passe-partout (faire)\netablir : precise\navoir : verbe passe-partout (avoir)\npasse-partout : 3/5\ntexte : a enrichir\n"
  },
  {
    id: "fr-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Jours et mois sans majuscule",
    goal: "Corriger la date professionnelle : lundi et juillet sont des noms communs, et les pluriels se marquent.",
    brief: "<p>Pour chaque situation proposée : casse vaut <code>ok</code> (écriture correcte), <code>maj</code> (majuscule fautive sur un jour ou un mois) ou <code>sing</code> (pluriel manquant). Pour chaque situation, indiquez <code>mot : correct</code>, <code>mot : majuscule a enlever</code> ou <code>mot : mettre au pluriel</code>. Concluez par <code>fautes : X/n</code>.</p>",
    starter: "# Grille d'analyse (fr-c3-e1) — Jours et mois sans majuscule\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un pluriel manquant]\n# Données : samedi sing\nA_COMPLETER\n\n[Cas 2 — Deux majuscules]\n# Données : Mars maj\n# Données : Aout maj\nA_COMPLETER\n\n[Cas 3 — Cinq mots]\n# Données : lundi ok\n# Données : Mardi maj\n# Données : janvier ok\n# Données : octobre ok\n# Données : mercredi sing\nA_COMPLETER\n",
    hints: [
          "Un case à trois cas : ok, maj, sing — les deux derniers comptent pour une faute.",
          "Le compteur suit exactement les lignes fautives ; le bilan sort après la boucle."
    ],
    examples: [
          {
                "stdin": "4\ndimanche ok\nJuin maj\njeudi sing\nvendredi ok\n",
                "expected": "dimanche : correct\nJuin : majuscule a enlever\njeudi : mettre au pluriel\nvendredi : correct\nfautes : 2/4"
          }
    ],
    tests: [
          {
                "label": "Un pluriel manquant",
                "stdin": "cas:1",
                "expected": "samedi : mettre au pluriel\nfautes : 1/1"
          },
          {
                "label": "Deux majuscules",
                "stdin": "cas:2",
                "expected": "Mars : majuscule a enlever\nAout : majuscule a enlever\nfautes : 2/2"
          },
          {
                "label": "Cinq mots",
                "stdin": "cas:3",
                "expected": "lundi : correct\nMardi : majuscule a enlever\njanvier : correct\noctobre : correct\nmercredi : mettre au pluriel\nfautes : 2/5"
          }
    ],
    solution: "[Exemple]\ndimanche : correct\nJuin : majuscule a enlever\njeudi : mettre au pluriel\nvendredi : correct\nfautes : 2/4\n\n[Cas 1 — Un pluriel manquant]\nsamedi : mettre au pluriel\nfautes : 1/1\n\n[Cas 2 — Deux majuscules]\nMars : majuscule a enlever\nAout : majuscule a enlever\nfautes : 2/2\n\n[Cas 3 — Cinq mots]\nlundi : correct\nMardi : majuscule a enlever\njanvier : correct\noctobre : correct\nmercredi : mettre au pluriel\nfautes : 2/5\n"
  },
  {
    id: "fr-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Ci-joint, veuillez, de toute façon",
    goal: "Arbitrer les pièges du courrier : ci-joint invariable ou accordé, veuillez contre veillez, de toute façon au singulier.",
    brief: "<p>Pour chaque situation proposée : regle vaut <code>ok</code> (phrase correcte), <code>invariable</code> (ci-joint en tête de phrase, correct), <code>accord</code> (ci-joint qui devrait s'accorder), <code>veillez</code> (veuillez attendu) ou <code>facons</code> (\"de toutes les façons\" fautive). Pour chaque situation, indiquez <code>phrase : correcte</code> ou <code>phrase : a corriger : accord</code> (ou <code>veuillez</code>, ou <code>singulier</code>). Concluez par <code>corrections : X/n</code>.</p>",
    starter: "# Grille d'analyse (fr-c3-e2) — Ci-joint, veuillez, de toute façon\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une facon fautive]\n# Données : p1 facons\nA_COMPLETER\n\n[Cas 2 — Tout est correct]\n# Données : p1 ok\n# Données : p2 invariable\nA_COMPLETER\n\n[Cas 3 — Cinq phrases]\n# Données : p1 veillez\n# Données : p2 invariable\n# Données : p3 accord\n# Données : p4 ok\n# Données : p5 facons\nA_COMPLETER\n",
    hints: [
          "ok et invariable donnent « correcte » ; accord, veillez et facons donnent « a corriger » suivi du remède.",
          "Le remède est nommé en minuscules : accord, veuillez, singulier."
    ],
    examples: [
          {
                "stdin": "4\np1 invariable\np2 accord\np3 ok\np4 veillez\n",
                "expected": "p1 : correcte\np2 : a corriger : accord\np3 : correcte\np4 : a corriger : veuillez\ncorrections : 2/4"
          }
    ],
    tests: [
          {
                "label": "Une facon fautive",
                "stdin": "cas:1",
                "expected": "p1 : a corriger : singulier\ncorrections : 1/1"
          },
          {
                "label": "Tout est correct",
                "stdin": "cas:2",
                "expected": "p1 : correcte\np2 : correcte\ncorrections : 0/2"
          },
          {
                "label": "Cinq phrases",
                "stdin": "cas:3",
                "expected": "p1 : a corriger : veuillez\np2 : correcte\np3 : a corriger : accord\np4 : correcte\np5 : a corriger : singulier\ncorrections : 3/5"
          }
    ],
    solution: "[Exemple]\np1 : correcte\np2 : a corriger : accord\np3 : correcte\np4 : a corriger : veuillez\ncorrections : 2/4\n\n[Cas 1 — Une facon fautive]\np1 : a corriger : singulier\ncorrections : 1/1\n\n[Cas 2 — Tout est correct]\np1 : correcte\np2 : correcte\ncorrections : 0/2\n\n[Cas 3 — Cinq phrases]\np1 : a corriger : veuillez\np2 : correcte\np3 : a corriger : accord\np4 : correcte\np5 : a corriger : singulier\ncorrections : 3/5\n"
  },
  {
    id: "fr-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "L'audit du courrier",
    goal: "Croiser trois règles du bureau — article de profession, majuscule de mois, abréviation M. — et décider de la relecture.",
    brief: "<p>Pour chaque situation proposée : regle vaut <code>ok</code>, <code>art</code> (« Je suis un chercheur » : article superflu), <code>maj</code> (majuscule sur un jour ou un mois) ou <code>abrev</code> (« Mr » au lieu de « M. »). Pour chaque situation, indiquez <code>phrase : correcte</code>, <code>phrase : article a enlever</code>, <code>phrase : majuscule a enlever</code> ou <code>phrase : abreviation a corriger</code>. Concluez par trois lignes <code>article : X</code>, <code>majuscule : Y</code>, <code>abreviation : Z</code>, puis <code>total : T/n</code> et <code>relecture : urgente</code> si les fautes sont strictement majoritaires, <code>relecture : legere</code> sinon.</p>",
    starter: "# Grille d'analyse (fr-c3-e3) — L'audit du courrier\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Tout est fautif]\n# Données : p1 art\n# Données : p2 art\n# Données : p3 maj\nA_COMPLETER\n\n[Cas 2 — Courier propre]\n# Données : p1 ok\n# Données : p2 ok\nA_COMPLETER\n\n[Cas 3 — Six phrases]\n# Données : p1 art\n# Données : p2 abrev\n# Données : p3 abrev\n# Données : p4 ok\n# Données : p5 maj\n# Données : p6 ok\nA_COMPLETER\n",
    hints: [
          "Trois compteurs distincts : art, maj, abrev — un case les tient à jour.",
          "Strictement majoritaires : le total doit dépasser n/2 (division entière)."
    ],
    examples: [
          {
                "stdin": "5\np1 art\np2 maj\np3 ok\np4 abrev\np5 ok\n",
                "expected": "p1 : article a enlever\np2 : majuscule a enlever\np3 : correcte\np4 : abreviation a corriger\np5 : correcte\narticle : 1\nmajuscule : 1\nabreviation : 1\ntotal : 3/5\nrelecture : urgente"
          }
    ],
    tests: [
          {
                "label": "Tout est fautif",
                "stdin": "cas:1",
                "expected": "p1 : article a enlever\np2 : article a enlever\np3 : majuscule a enlever\narticle : 2\nmajuscule : 1\nabreviation : 0\ntotal : 3/3\nrelecture : urgente"
          },
          {
                "label": "Courier propre",
                "stdin": "cas:2",
                "expected": "p1 : correcte\np2 : correcte\narticle : 0\nmajuscule : 0\nabreviation : 0\ntotal : 0/2\nrelecture : legere"
          },
          {
                "label": "Six phrases",
                "stdin": "cas:3",
                "expected": "p1 : article a enlever\np2 : abreviation a corriger\np3 : abreviation a corriger\np4 : correcte\np5 : majuscule a enlever\np6 : correcte\narticle : 1\nmajuscule : 1\nabreviation : 2\ntotal : 4/6\nrelecture : urgente"
          }
    ],
    solution: "[Exemple]\np1 : article a enlever\np2 : majuscule a enlever\np3 : correcte\np4 : abreviation a corriger\np5 : correcte\narticle : 1\nmajuscule : 1\nabreviation : 1\ntotal : 3/5\nrelecture : urgente\n\n[Cas 1 — Tout est fautif]\np1 : article a enlever\np2 : article a enlever\np3 : majuscule a enlever\narticle : 2\nmajuscule : 1\nabreviation : 0\ntotal : 3/3\nrelecture : urgente\n\n[Cas 2 — Courier propre]\np1 : correcte\np2 : correcte\narticle : 0\nmajuscule : 0\nabreviation : 0\ntotal : 0/2\nrelecture : legere\n\n[Cas 3 — Six phrases]\np1 : article a enlever\np2 : abreviation a corriger\np3 : abreviation a corriger\np4 : correcte\np5 : majuscule a enlever\np6 : correcte\narticle : 1\nmajuscule : 1\nabreviation : 2\ntotal : 4/6\nrelecture : urgente\n"
  },
  {
    id: "fr-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Repérer les pléonasmes",
    goal: "Signaler le double emploi : allumer la lumière, au jour d'aujourd'hui, assez suffisantes.",
    brief: "<p>Pour chaque situation proposée : type vaut <code>pleonasme</code> (double emploi) ou <code>bon</code> (tour correct). Pour chaque situation, indiquez <code>expression : pleonasme (un mot de trop)</code> ou <code>expression : correcte</code>. Concluez par <code>pleonasmes : X/n</code>.</p>",
    starter: "# Grille d'analyse (fr-c4-e1) — Repérer les pléonasmes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul pléonasme]\n# Données : suffisantes pleonasme\nA_COMPLETER\n\n[Cas 2 — Tout est correct]\n# Données : exterieure bon\n# Données : selection bon\nA_COMPLETER\n\n[Cas 3 — Cinq expressions]\n# Données : lumiere pleonasme\n# Données : exterieure bon\n# Données : unanimite pleonasme\n# Données : cauchemar bon\n# Données : suffisantes pleonasme\nA_COMPLETER\n",
    hints: [
          "Seule la valeur pleonasme déclenche le signalement.",
          "Le compteur suit exactement les lignes signalées."
    ],
    examples: [
          {
                "stdin": "3\nlumiere pleonasme\ncauchemar bon\nunanimite pleonasme\n",
                "expected": "lumiere : pleonasme (un mot de trop)\ncauchemar : correcte\nunanimite : pleonasme (un mot de trop)\npleonasmes : 2/3"
          }
    ],
    tests: [
          {
                "label": "Un seul pléonasme",
                "stdin": "cas:1",
                "expected": "suffisantes : pleonasme (un mot de trop)\npleonasmes : 1/1"
          },
          {
                "label": "Tout est correct",
                "stdin": "cas:2",
                "expected": "exterieure : correcte\nselection : correcte\npleonasmes : 0/2"
          },
          {
                "label": "Cinq expressions",
                "stdin": "cas:3",
                "expected": "lumiere : pleonasme (un mot de trop)\nexterieure : correcte\nunanimite : pleonasme (un mot de trop)\ncauchemar : correcte\nsuffisantes : pleonasme (un mot de trop)\npleonasmes : 3/5"
          }
    ],
    solution: "[Exemple]\nlumiere : pleonasme (un mot de trop)\ncauchemar : correcte\nunanimite : pleonasme (un mot de trop)\npleonasmes : 2/3\n\n[Cas 1 — Un seul pléonasme]\nsuffisantes : pleonasme (un mot de trop)\npleonasmes : 1/1\n\n[Cas 2 — Tout est correct]\nexterieure : correcte\nselection : correcte\npleonasmes : 0/2\n\n[Cas 3 — Cinq expressions]\nlumiere : pleonasme (un mot de trop)\nexterieure : correcte\nunanimite : pleonasme (un mot de trop)\ncauchemar : correcte\nsuffisantes : pleonasme (un mot de trop)\npleonasmes : 3/5\n"
  },
  {
    id: "fr-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Corriger les barbarismes",
    goal: "Rendre à chaque mot sa vraie forme : pécuniaire, maligne, dilemme, empreintes.",
    brief: "<p>L’analyse porte sur <strong>n mots</strong>, un par ligne, sans autre champ. Chaque mot est soit un barbarisme connu, soit une forme correcte. Les barbarismes connus du cours : <code>pecuniers</code>, <code>maline</code>, <code>benine</code>, <code>disez</code>, <code>empruntes</code>, <code>dilemne</code>, <code>contreverse</code>, <code>renumere</code>, <code>rabattent</code>, <code>indemmes</code>, <code>dilettant</code>, <code>definitif</code>. Pour chaque mot le cas affiche <code>mot : forme_corrigee</code> (par exemple <code>maline : maligne</code>) ou <code>mot : correct</code> si le mot est bien formé. Concluez par <code>barbarismes : X/n</code>.</p>",
    starter: "# Grille d'analyse (fr-c4-e2) — Corriger les barbarismes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul dilemne]\n# Données : dilemne\nA_COMPLETER\n\n[Cas 2 — Formes correctes]\n# Données : dites\n# Données : maligne\nA_COMPLETER\n\n[Cas 3 — Six mots]\n# Données : empruntes\n# Données : definitif\n# Données : benine\n# Données : dilettant\n# Données : dilemme\n# Données : recouvre\nA_COMPLETER\n",
    hints: [
          "Un case sur le mot lui-même : chaque barbarisme connu donne sa forme corrigée.",
          "Le cas par défaut (*) approuve ; il n'incrémente pas le compteur."
    ],
    examples: [
          {
                "stdin": "4\npecuniers\nmaline\ndilemme\ncontreverse\n",
                "expected": "pecuniers : pecuniaires\nmaline : maligne\ndilemme : correct\ncontreverse : controverse\nbarbarismes : 3/4"
          }
    ],
    tests: [
          {
                "label": "Un seul dilemne",
                "stdin": "cas:1",
                "expected": "dilemne : dilemme\nbarbarismes : 1/1"
          },
          {
                "label": "Formes correctes",
                "stdin": "cas:2",
                "expected": "dites : correct\nmaligne : correct\nbarbarismes : 0/2"
          },
          {
                "label": "Six mots",
                "stdin": "cas:3",
                "expected": "empruntes : empreintes\ndefinitif : definitive\nbenine : benigne\ndilettant : dilettante\ndilemme : correct\nrecouvre : correct\nbarbarismes : 4/6"
          }
    ],
    solution: "[Exemple]\npecuniers : pecuniaires\nmaline : maligne\ndilemme : correct\ncontreverse : controverse\nbarbarismes : 3/4\n\n[Cas 1 — Un seul dilemne]\ndilemne : dilemme\nbarbarismes : 1/1\n\n[Cas 2 — Formes correctes]\ndites : correct\nmaligne : correct\nbarbarismes : 0/2\n\n[Cas 3 — Six mots]\nempruntes : empreintes\ndefinitif : definitive\nbenine : benigne\ndilettant : dilettante\ndilemme : correct\nrecouvre : correct\nbarbarismes : 4/6\n"
  },
  {
    id: "fr-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "La construction des verbes",
    goal: "Éviter le solécisme : on pallie quelque chose, on se rappelle quelque chose, on téléphone à quelqu'un.",
    brief: "<p>Pour chaque situation proposée : verbe vaut <code>rappeler</code>, <code>pallier</code> ou <code>enfreindre</code> (ces trois verbes exigent un complément direct) ou <code>telephoner</code> (qui exige un complément en à) ; construction vaut <code>direct</code> ou <code>a</code>. Pour chaque situation, indiquez <code>verbe : construction correcte</code> ou <code>verbe : construction fautive</code>. Concluez par <code>solecismes : X/n</code>.</p>",
    starter: "# Grille d'analyse (fr-c4-e3) — La construction des verbes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Pallier bien construit]\n# Données : pallier direct\nA_COMPLETER\n\n[Cas 2 — Deux solécismes]\n# Données : telephoner direct\n# Données : rappeler a\nA_COMPLETER\n\n[Cas 3 — Cinq verbes]\n# Données : enfreindre direct\n# Données : telephoner a\n# Données : pallier a\n# Données : rappeler direct\n# Données : telephoner direct\nA_COMPLETER\n",
    hints: [
          "Le case sur le verbe pose la construction attendue (direct ou a) ; un simple test compare ensuite.",
          "Le compteur suit exactement les constructions fautives."
    ],
    examples: [
          {
                "stdin": "4\nrappeler direct\npallier a\ntelephoner a\nenfreindre a\n",
                "expected": "rappeler : construction correcte\npallier : construction fautive\ntelephoner : construction correcte\nenfreindre : construction fautive\nsolecismes : 2/4"
          }
    ],
    tests: [
          {
                "label": "Pallier bien construit",
                "stdin": "cas:1",
                "expected": "pallier : construction correcte\nsolecismes : 0/1"
          },
          {
                "label": "Deux solécismes",
                "stdin": "cas:2",
                "expected": "telephoner : construction fautive\nrappeler : construction fautive\nsolecismes : 2/2"
          },
          {
                "label": "Cinq verbes",
                "stdin": "cas:3",
                "expected": "enfreindre : construction correcte\ntelephoner : construction correcte\npallier : construction fautive\nrappeler : construction correcte\ntelephoner : construction fautive\nsolecismes : 2/5"
          }
    ],
    solution: "[Exemple]\nrappeler : construction correcte\npallier : construction fautive\ntelephoner : construction correcte\nenfreindre : construction fautive\nsolecismes : 2/4\n\n[Cas 1 — Pallier bien construit]\npallier : construction correcte\nsolecismes : 0/1\n\n[Cas 2 — Deux solécismes]\ntelephoner : construction fautive\nrappeler : construction fautive\nsolecismes : 2/2\n\n[Cas 3 — Cinq verbes]\nenfreindre : construction correcte\ntelephoner : construction correcte\npallier : construction fautive\nrappeler : construction correcte\ntelephoner : construction fautive\nsolecismes : 2/5\n"
  },
  {
    id: "fr-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Les neuf blocs de la lettre",
    goal: "Vérifier que chaque bloc de la lettre de motivation est à sa place : coordonnées, destinataire, date, objet, appel, corps, rendez-vous, politesse, signature.",
    brief: "<p>Pour chaque situation proposée : element vaut <code>coordonnees</code>, <code>destinataire</code>, <code>date</code>, <code>objet</code>, <code>appel</code>, <code>corps</code>, <code>rendezvous</code>, <code>politesse</code> ou <code>signature</code> ; ordre est le numéro de bloc annoncé (1 à 9). Pour chaque situation, indiquez <code>element : bloc N</code> si le numéro est le bon, <code>element : hors place</code> sinon. Concluez par <code>lettres valides : ok</code> si aucun bloc n'est hors place, <code>lettres valides : a revoir</code> sinon.</p>",
    starter: "# Grille d'analyse (fr-c5-e1) — Les neuf blocs de la lettre\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Deux blocs en place]\n# Données : objet 4\n# Données : politesse 8\nA_COMPLETER\n\n[Cas 2 — Appel et objet inverses]\n# Données : appel 4\n# Données : objet 5\nA_COMPLETER\n\n[Cas 3 — Six blocs melanges]\n# Données : coordonnees 1\n# Données : destinataire 2\n# Données : date 3\n# Données : appel 5\n# Données : corps 6\n# Données : signature 9\nA_COMPLETER\n",
    hints: [
          "Un case sur l'element pose le numéro attendu (coordonnees 1 … signature 9).",
          "Un drapeau passe à 0 au premier « hors place » ; le verdict le teste après la boucle."
    ],
    examples: [
          {
                "stdin": "5\ncoordonnees 1\ndestinataire 2\ndate 3\nobjet 4\nappel 5\n",
                "expected": "coordonnees : bloc 1\ndestinataire : bloc 2\ndate : bloc 3\nobjet : bloc 4\nappel : bloc 5\nlettres valides : ok"
          }
    ],
    tests: [
          {
                "label": "Deux blocs en place",
                "stdin": "cas:1",
                "expected": "objet : bloc 4\npolitesse : bloc 8\nlettres valides : ok"
          },
          {
                "label": "Appel et objet inverses",
                "stdin": "cas:2",
                "expected": "appel : hors place\nobjet : hors place\nlettres valides : a revoir"
          },
          {
                "label": "Six blocs melanges",
                "stdin": "cas:3",
                "expected": "coordonnees : bloc 1\ndestinataire : bloc 2\ndate : bloc 3\nappel : bloc 5\ncorps : bloc 6\nsignature : bloc 9\nlettres valides : ok"
          }
    ],
    solution: "[Exemple]\ncoordonnees : bloc 1\ndestinataire : bloc 2\ndate : bloc 3\nobjet : bloc 4\nappel : bloc 5\nlettres valides : ok\n\n[Cas 1 — Deux blocs en place]\nobjet : bloc 4\npolitesse : bloc 8\nlettres valides : ok\n\n[Cas 2 — Appel et objet inverses]\nappel : hors place\nobjet : hors place\nlettres valides : a revoir\n\n[Cas 3 — Six blocs melanges]\ncoordonnees : bloc 1\ndestinataire : bloc 2\ndate : bloc 3\nappel : bloc 5\ncorps : bloc 6\nsignature : bloc 9\nlettres valides : ok\n"
  },
  {
    id: "fr-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Appel et politesse",
    goal: "Valider les formules : « Madame, Monsieur, » pour l'appel, « Cordialement, » pour le courriel — jamais « Bonjour Madame ».",
    brief: "<p>Pour chaque situation proposée : formule vaut <code>madame</code>, <code>monsieur</code>, <code>madamemonsieur</code>, <code>madamedirectrice</code> (appels), <code>cordialement</code>, <code>bienavous</code>, <code>sinceres</code>, <code>salutations</code> (politesse), ou autre chose ; type vaut <code>appel</code> ou <code>politesse</code>. Pour chaque situation, indiquez <code>formule : valide</code> si la formule appartient au type annoncé, <code>formule : inadaptee</code> si elle appartient à l'autre type, <code>formule : inconnue</code> sinon (par exemple « Bonjour Madame »). Concluez par <code>valides : X/n</code>.</p>",
    starter: "# Grille d'analyse (fr-c5-e2) — Appel et politesse\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Appel collectif]\n# Données : madamemonsieur appel\nA_COMPLETER\n\n[Cas 2 — Politesse bien placee]\n# Données : cordialement politesse\n# Données : sinceres politesse\nA_COMPLETER\n\n[Cas 3 — Cinq formules]\n# Données : monsieur appel\n# Données : madame appel\n# Données : salutations appel\n# Données : bienavous politesse\n# Données : chere appel\nA_COMPLETER\n",
    hints: [
          "Un case sur la formule détermine sa famille réelle : appel, politesse ou inconnue.",
          "Famille égale au type annoncé : valide ; famille différente : inadaptee ; famille inconnue : inconnue."
    ],
    examples: [
          {
                "stdin": "4\nmadame appel\nsalutations politesse\ncordialement appel\nbonjour appel\n",
                "expected": "madame : valide\nsalutations : valide\ncordialement : inadaptee\nbonjour : inconnue\nvalides : 2/4"
          }
    ],
    tests: [
          {
                "label": "Appel collectif",
                "stdin": "cas:1",
                "expected": "madamemonsieur : valide\nvalides : 1/1"
          },
          {
                "label": "Politesse bien placee",
                "stdin": "cas:2",
                "expected": "cordialement : valide\nsinceres : valide\nvalides : 2/2"
          },
          {
                "label": "Cinq formules",
                "stdin": "cas:3",
                "expected": "monsieur : valide\nmadame : valide\nsalutations : inadaptee\nbienavous : valide\nchere : inconnue\nvalides : 3/5"
          }
    ],
    solution: "[Exemple]\nmadame : valide\nsalutations : valide\ncordialement : inadaptee\nbonjour : inconnue\nvalides : 2/4\n\n[Cas 1 — Appel collectif]\nmadamemonsieur : valide\nvalides : 1/1\n\n[Cas 2 — Politesse bien placee]\ncordialement : valide\nsinceres : valide\nvalides : 2/2\n\n[Cas 3 — Cinq formules]\nmonsieur : valide\nmadame : valide\nsalutations : inadaptee\nbienavous : valide\nchere : inconnue\nvalides : 3/5\n"
  },
  {
    id: "fr-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Le corps en trois paragraphes",
    goal: "Contrôler la structure imposée : paragraphe 1 l'entreprise, paragraphe 2 les compétences, paragraphe 3 les motivations personnelles.",
    brief: "<p>Pour chaque situation proposée : paragraphe vaut <code>p1</code>, <code>p2</code> ou <code>p3</code> ; contenu vaut <code>entreprise</code>, <code>competences</code> ou <code>personnel</code>. Le contenu attendu est entreprise pour p1, competences pour p2, personnel pour p3. Pour chaque situation, indiquez <code>paragraphe : conforme</code> ou <code>paragraphe : hors sujet (attendu X)</code>. Concluez par <code>corps : conforme</code> si toutes les lignes sont conformes et les trois paragraphes présents, <code>corps : a revoir</code> sinon ; puis <code>paragraphes : X/3</code> (paragraphes distincts conformes).</p>",
    starter: "# Grille d'analyse (fr-c5-e3) — Le corps en trois paragraphes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Tout est inverse]\n# Données : p1 competences\n# Données : p2 entreprise\nA_COMPLETER\n\n[Cas 2 — Le p3 decroche]\n# Données : p1 entreprise\n# Données : p1 entreprise\n# Données : p2 competences\n# Données : p3 competences\nA_COMPLETER\n\n[Cas 3 — Cinq lignes dans le desordre]\n# Données : p3 personnel\n# Données : p1 entreprise\n# Données : p2 competences\n# Données : p2 competences\n# Données : p1 entreprise\nA_COMPLETER\n",
    hints: [
          "Le case sur le paragraphe donne le contenu attendu ; conformes[p1]=1 marque le passage.",
          "Deux conditions pour « conforme » : trois paragraphes distincts marqués, et aucune ligne hors sujet."
    ],
    examples: [
          {
                "stdin": "3\np1 entreprise\np2 competences\np3 personnel\n",
                "expected": "p1 : conforme\np2 : conforme\np3 : conforme\ncorps : conforme\nparagraphes : 3/3"
          }
    ],
    tests: [
          {
                "label": "Tout est inverse",
                "stdin": "cas:1",
                "expected": "p1 : hors sujet (attendu entreprise)\np2 : hors sujet (attendu competences)\ncorps : a revoir\nparagraphes : 0/3"
          },
          {
                "label": "Le p3 decroche",
                "stdin": "cas:2",
                "expected": "p1 : conforme\np1 : conforme\np2 : conforme\np3 : hors sujet (attendu personnel)\ncorps : a revoir\nparagraphes : 2/3"
          },
          {
                "label": "Cinq lignes dans le desordre",
                "stdin": "cas:3",
                "expected": "p3 : conforme\np1 : conforme\np2 : conforme\np2 : conforme\np1 : conforme\ncorps : conforme\nparagraphes : 3/3"
          }
    ],
    solution: "[Exemple]\np1 : conforme\np2 : conforme\np3 : conforme\ncorps : conforme\nparagraphes : 3/3\n\n[Cas 1 — Tout est inverse]\np1 : hors sujet (attendu entreprise)\np2 : hors sujet (attendu competences)\ncorps : a revoir\nparagraphes : 0/3\n\n[Cas 2 — Le p3 decroche]\np1 : conforme\np1 : conforme\np2 : conforme\np3 : hors sujet (attendu personnel)\ncorps : a revoir\nparagraphes : 2/3\n\n[Cas 3 — Cinq lignes dans le desordre]\np3 : conforme\np1 : conforme\np2 : conforme\np2 : conforme\np1 : conforme\ncorps : conforme\nparagraphes : 3/3\n"
  },
  {
    id: "fr-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Avoir ou être",
    goal: "Choisir l'auxiliaire du passé composé : les verbes de mouvement prennent être, les autres avoir.",
    brief: "<p>Pour chaque situation proposée : verbe vaut <code>aller</code>, <code>partir</code>, <code>arriver</code>, <code>sortir</code>, <code>venir</code>, <code>naitre</code>, <code>mourir</code>, <code>rester</code>, <code>descendre</code> ou <code>coucher</code> (être, comme les verbes pronominaux) ou <code>acheter</code>, <code>parler</code>, <code>finir</code>, <code>travailler</code>, <code>manger</code>, <code>faire</code>, <code>telephoner</code> (avoir) ; auxiliaire vaut <code>avoir</code> ou <code>etre</code>. Pour chaque situation, indiquez <code>verbe : auxiliaire correct</code> ou <code>verbe : auxiliaire fautif</code>. Concluez par <code>erreurs : X/n</code>.</p>",
    starter: "# Grille d'analyse (fr-c6-e1) — Avoir ou être\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Naitre avec etre]\n# Données : naitre etre\nA_COMPLETER\n\n[Cas 2 — Deux auxiliaires inverses]\n# Données : finir etre\n# Données : sortir avoir\nA_COMPLETER\n\n[Cas 3 — Cinq verbes]\n# Données : venir etre\n# Données : descendre avoir\n# Données : manger avoir\n# Données : coucher etre\n# Données : telephoner etre\nA_COMPLETER\n",
    hints: [
          "Le case sur le verbe pose l'auxiliaire attendu : être pour les verbes de mouvement et pronominaux, avoir pour les autres.",
          "Le compteur suit exactement les auxiliaires fautifs."
    ],
    examples: [
          {
                "stdin": "4\naller etre\nacheter avoir\npartir avoir\nparler avoir\n",
                "expected": "aller : auxiliaire correct\nacheter : auxiliaire correct\npartir : auxiliaire fautif\nparler : auxiliaire correct\nerreurs : 1/4"
          }
    ],
    tests: [
          {
                "label": "Naitre avec etre",
                "stdin": "cas:1",
                "expected": "naitre : auxiliaire correct\nerreurs : 0/1"
          },
          {
                "label": "Deux auxiliaires inverses",
                "stdin": "cas:2",
                "expected": "finir : auxiliaire fautif\nsortir : auxiliaire fautif\nerreurs : 2/2"
          },
          {
                "label": "Cinq verbes",
                "stdin": "cas:3",
                "expected": "venir : auxiliaire correct\ndescendre : auxiliaire fautif\nmanger : auxiliaire correct\ncoucher : auxiliaire correct\ntelephoner : auxiliaire fautif\nerreurs : 2/5"
          }
    ],
    solution: "[Exemple]\naller : auxiliaire correct\nacheter : auxiliaire correct\npartir : auxiliaire fautif\nparler : auxiliaire correct\nerreurs : 1/4\n\n[Cas 1 — Naitre avec etre]\nnaitre : auxiliaire correct\nerreurs : 0/1\n\n[Cas 2 — Deux auxiliaires inverses]\nfinir : auxiliaire fautif\nsortir : auxiliaire fautif\nerreurs : 2/2\n\n[Cas 3 — Cinq verbes]\nvenir : auxiliaire correct\ndescendre : auxiliaire fautif\nmanger : auxiliaire correct\ncoucher : auxiliaire correct\ntelephoner : auxiliaire fautif\nerreurs : 2/5\n"
  },
  {
    id: "fr-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Accorder le participe passé",
    goal: "Faire accorder le participe passé avec être comme un adjectif : allé, allée, allés, allées.",
    brief: "<p>Pour chaque situation proposée : famille vaut <code>aller</code> (participe masculin <code>alle</code>) ou <code>sortir</code> (participe masculin <code>sorti</code>) ; forme est le participe proposé (sans accents codés) ; sujet vaut <code>il</code>, <code>elle</code>, <code>ils</code> ou <code>elles</code>. Le participe attendu est la forme masculine suivie de rien (il), e (elle), s (ils) ou es (elles). Pour chaque situation, indiquez <code>forme : conforme</code> ou <code>forme : accord fautif (attendu X)</code>. Concluez par <code>accords : X/n</code>.</p>",
    starter: "# Grille d'analyse (fr-c6-e2) — Accorder le participe passé\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Ils au masculin pluriel]\n# Données : aller alles ils\nA_COMPLETER\n\n[Cas 2 — Deux accords manques]\n# Données : sortir sorti elle\n# Données : aller allee il\nA_COMPLETER\n\n[Cas 3 — Cinq formes]\n# Données : aller allee elle\n# Données : aller allees elles\n# Données : sortir sorti il\n# Données : aller alle elles\n# Données : sortir sortie elle\nA_COMPLETER\n",
    hints: [
          "Deux case : le premier donne la forme masculine (alle ou sorti), le second le marqueur du sujet (vide, e, s, es).",
          "La forme attendue se concatène : attendu=\"$radical$terminaison\"."
    ],
    examples: [
          {
                "stdin": "4\naller allee elle\naller alle il\nsortir sorties elles\nsortir sortie ils\n",
                "expected": "allee : conforme\nalle : conforme\nsorties : conforme\nsortie : accord fautif (attendu sortis)\naccords : 3/4"
          }
    ],
    tests: [
          {
                "label": "Ils au masculin pluriel",
                "stdin": "cas:1",
                "expected": "alles : conforme\naccords : 1/1"
          },
          {
                "label": "Deux accords manques",
                "stdin": "cas:2",
                "expected": "sorti : accord fautif (attendu sortie)\nallee : accord fautif (attendu alle)\naccords : 0/2"
          },
          {
                "label": "Cinq formes",
                "stdin": "cas:3",
                "expected": "allee : conforme\nallees : conforme\nsorti : conforme\nalle : accord fautif (attendu allees)\nsortie : conforme\naccords : 4/5"
          }
    ],
    solution: "[Exemple]\nallee : conforme\nalle : conforme\nsorties : conforme\nsortie : accord fautif (attendu sortis)\naccords : 3/4\n\n[Cas 1 — Ils au masculin pluriel]\nalles : conforme\naccords : 1/1\n\n[Cas 2 — Deux accords manques]\nsorti : accord fautif (attendu sortie)\nallee : accord fautif (attendu alle)\naccords : 0/2\n\n[Cas 3 — Cinq formes]\nallee : conforme\nallees : conforme\nsorti : conforme\nalle : accord fautif (attendu allees)\nsortie : conforme\naccords : 4/5\n"
  },
  {
    id: "fr-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "L'évaluation finale du cours",
    goal: "Noter les cinq compétences du français professionnel et rendre le verdict : admis ou reprise.",
    brief: "<p>L’analyse porte sur d'abord <code>seuil</code> (score minimal, entier). Puis il lit <strong>n lignes</strong> « competence score » (score entier) parmi communication, registres, orthographe, lettre, grammaire. Pour chaque situation, indiquez <code>competence : score X</code>. Concluez par <code>moyenne : M</code> (moyenne entière arrondie vers le bas) et <code>verdict : admis</code> si M ≥ seuil, <code>verdict : reprise</code> sinon. Si n = 0, afficher <code>moyenne : 0</code>.</p>",
    starter: "# Grille d'analyse (fr-c6-e3) — L'évaluation finale du cours\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Sous le seuil]\n# Données : 2\n# Données : communication 70\n# Données : registres 85\nA_COMPLETER\n\n[Cas 2 — Aucune competence]\n# Données : 0\nA_COMPLETER\n\n[Cas 3 — Cinq competences]\n# Données : 5\n# Données : communication 80\n# Données : registres 70\n# Données : orthographe 90\n# Données : lettre 65\n# Données : grammaire 75\nA_COMPLETER\n",
    hints: [
          "Cumulez les scores puis divisez : la division entière de Bash arrondit vers le bas naturellement.",
          "Protégez le cas n = 0 pour éviter une division par zéro."
    ],
    examples: [
          {
                "stdin": "70\n5\ncommunication 80\nregistres 75\northographe 65\nlettre 90\ngrammaire 70\n",
                "expected": "communication : score 80\nregistres : score 75\northographe : score 65\nlettre : score 90\ngrammaire : score 70\nmoyenne : 76\nverdict : admis"
          }
    ],
    tests: [
          {
                "label": "Sous le seuil",
                "stdin": "cas:1",
                "expected": "communication : score 70\nregistres : score 85\nmoyenne : 77\nverdict : reprise"
          },
          {
                "label": "Aucune competence",
                "stdin": "cas:2",
                "expected": "moyenne : 0\nverdict : reprise"
          },
          {
                "label": "Cinq competences",
                "stdin": "cas:3",
                "expected": "communication : score 80\nregistres : score 70\northographe : score 90\nlettre : score 65\ngrammaire : score 75\nmoyenne : 76\nverdict : admis"
          }
    ],
    solution: "[Exemple]\ncommunication : score 80\nregistres : score 75\northographe : score 65\nlettre : score 90\ngrammaire : score 70\nmoyenne : 76\nverdict : admis\n\n[Cas 1 — Sous le seuil]\ncommunication : score 70\nregistres : score 85\nmoyenne : 77\nverdict : reprise\n\n[Cas 2 — Aucune competence]\nmoyenne : 0\nverdict : reprise\n\n[Cas 3 — Cinq competences]\ncommunication : score 80\nregistres : score 70\northographe : score 90\nlettre : score 65\ngrammaire : score 75\nmoyenne : 76\nverdict : admis\n"
  }
];
