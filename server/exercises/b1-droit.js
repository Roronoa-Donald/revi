/**
 * Catalogue des 18 études de cas du cours « b1-droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "dr-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Droit objectif et droits subjectifs",
    goal: "Trier des énoncés entre règles de droit (objectif) et prérogatives (subjectif), puis dresser le bilan.",
    brief: "<p>Pour chaque situation proposée : type vaut <code>o</code> (objectif) ou <code>s</code> (subjectif). Pour chaque situation, indiquez <code>libelle : categorie</code>, où categorie vaut <code>regle</code> (objectif) ou <code>prerogative</code> (subjectif). Enfin Indiquez <code>bilan : X regles / Y prerogatives</code>, X et Y étant les compteurs.</p>",
    starter: "# Grille d'analyse (dr-c1-e1) — Droit objectif et droits subjectifs\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule prérogative]\n# Données : s droit de vote\nA_COMPLETER\n\n[Cas 2 — Deux règles]\n# Données : o loi\n# Données : o decret\nA_COMPLETER\n\n[Cas 3 — Cinq éléments mixtes]\n# Données : o code penal\n# Données : s droit a l image\n# Données : o coutume\n# Données : s droit de propriete\n# Données : o arrrete\nA_COMPLETER\n",
    hints: [
          "Deux compteurs posés à 0 avant la boucle, incrémentés selon les cas prévus.",
          "Le bilan sort après la boucle, selon la syntaxe attendue « X regles / Y prerogatives »."
    ],
    examples: [
          {
                "stdin": "3\no code civil\ns droit de propriete\no reglement\n",
                "expected": "code civil : regle\ndroit de propriete : prerogative\nreglement : regle\nbilan : 2 regles / 1 prerogatives"
          }
    ],
    tests: [
          {
                "label": "Une seule prérogative",
                "stdin": "cas:1",
                "expected": "droit de vote : prerogative\nbilan : 0 regles / 1 prerogatives"
          },
          {
                "label": "Deux règles",
                "stdin": "cas:2",
                "expected": "loi : regle\ndecret : regle\nbilan : 2 regles / 0 prerogatives"
          },
          {
                "label": "Cinq éléments mixtes",
                "stdin": "cas:3",
                "expected": "code penal : regle\ndroit a l image : prerogative\ncoutume : regle\ndroit de propriete : prerogative\narrrete : regle\nbilan : 3 regles / 2 prerogatives"
          }
    ],
    solution: "[Exemple]\ncode civil : regle\ndroit de propriete : prerogative\nreglement : regle\nbilan : 2 regles / 1 prerogatives\n\n[Cas 1 — Une seule prérogative]\ndroit de vote : prerogative\nbilan : 0 regles / 1 prerogatives\n\n[Cas 2 — Deux règles]\nloi : regle\ndecret : regle\nbilan : 2 regles / 0 prerogatives\n\n[Cas 3 — Cinq éléments mixtes]\ncode penal : regle\ndroit a l image : prerogative\ncoutume : regle\ndroit de propriete : prerogative\narrrete : regle\nbilan : 3 regles / 2 prerogatives\n"
  },
  {
    id: "dr-c1-e2",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Les caractères de la règle de droit",
    goal: "Vérifier qu'un texte proposé remplit les deux caractères de la règle de droit : générale/abstraite et obligatoire/coercitive.",
    brief: "<p>Pour chaque situation proposée : general et obligatoire valent <code>oui</code> ou <code>non</code>. Le texte est une <code>regle de droit</code> si les deux valent oui ; <code>regle morale</code> si la règle est générale mais non coercitive ; <code>mesure individuelle</code> dans les autres cas. Pour chaque situation, indiquez <code>texte : qualification</code>. Concluez par <code>regles de droit : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr-c1-e2) — Les caractères de la règle de droit\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule règle]\n# Données : oui oui nul n ignore la loi\nA_COMPLETER\n\n[Cas 2 — Une mesure individuelle]\n# Données : non oui l entreprise X est fermee\nA_COMPLETER\n\n[Cas 3 — Quatre textes mixtes]\n# Données : oui oui la loi interdit le vol\n# Données : oui non la charite est recommandee\n# Données : non non avis interne\n# Données : oui oui la loi fixe la majorite\nA_COMPLETER\n",
    hints: [
          "Trois qualifications : oui/oui → règle de droit ; oui/non → règle morale ; le reste → mesure individuelle.",
          "Incrémentez seulement dans la qualification correspondante."
    ],
    examples: [
          {
                "stdin": "3\noui oui tout voleur sera puni\noui non il faut etre honnete\nnon oui le client Kossi payera 5000\n",
                "expected": "tout voleur sera puni : regle de droit\nil faut etre honnete : regle morale\nle client Kossi payera 5000 : mesure individuelle\nregles de droit : 1/3"
          }
    ],
    tests: [
          {
                "label": "Une seule règle",
                "stdin": "cas:1",
                "expected": "nul n ignore la loi : regle de droit\nregles de droit : 1/1"
          },
          {
                "label": "Une mesure individuelle",
                "stdin": "cas:2",
                "expected": "l entreprise X est fermee : mesure individuelle\nregles de droit : 0/1"
          },
          {
                "label": "Quatre textes mixtes",
                "stdin": "cas:3",
                "expected": "la loi interdit le vol : regle de droit\nla charite est recommandee : regle morale\navis interne : mesure individuelle\nla loi fixe la majorite : regle de droit\nregles de droit : 2/4"
          }
    ],
    solution: "[Exemple]\ntout voleur sera puni : regle de droit\nil faut etre honnete : regle morale\nle client Kossi payera 5000 : mesure individuelle\nregles de droit : 1/3\n\n[Cas 1 — Une seule règle]\nnul n ignore la loi : regle de droit\nregles de droit : 1/1\n\n[Cas 2 — Une mesure individuelle]\nl entreprise X est fermee : mesure individuelle\nregles de droit : 0/1\n\n[Cas 3 — Quatre textes mixtes]\nla loi interdit le vol : regle de droit\nla charite est recommandee : regle morale\navis interne : mesure individuelle\nla loi fixe la majorite : regle de droit\nregles de droit : 2/4\n"
  },
  {
    id: "dr-c1-e3",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Les sanctions de la règle de droit",
    goal: "Classer des sanctions par nature (pénale, civile, administrative, disciplinaire) et dresser la répartition.",
    brief: "<p>Pour chaque situation proposée : nature vaut <code>pen</code>, <code>civ</code>, <code>adm</code> ou <code>dis</code>. Pour chaque situation, indiquez <code>sanction : nature_complete</code>, où nature_complete vaut <code>penale</code>, <code>civile</code>, <code>administrative</code> ou <code>disciplinaire</code>. Concluez par quatre lignes de comptage, toujours dans cet ordre : <code>penales : X</code>, <code>civiles : X</code>, <code>administratives : X</code> et <code>disciplinaires : X</code>.</p>",
    starter: "# Grille d'analyse (dr-c1-e3) — Les sanctions de la règle de droit\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule sanction]\n# Données : emprisonnement pen\nA_COMPLETER\n\n[Cas 2 — Deux administratives]\n# Données : suspension adm\n# Données : retrait adm\nA_COMPLETER\n\n[Cas 3 — Cinq sanctions mixtes]\n# Données : amende pen\n# Données : blame dis\n# Données : retrait adm\n# Données : dommages civ\n# Données : emprisonnement pen\nA_COMPLETER\n",
    hints: [
          "Un case à quatre branches remplit les deux rôles : afficher et incrémenter.",
          "Les quatre totaux sortent après la boucle, dans l'ordre demandé, même quand le compteur vaut 0."
    ],
    examples: [
          {
                "stdin": "3\namende pen\ndommages civ\nlicenciement dis\n",
                "expected": "amende : penale\ndommages : civile\nlicenciement : disciplinaire\npenales : 1\nciviles : 1\nadministratives : 0\ndisciplinaires : 1"
          }
    ],
    tests: [
          {
                "label": "Une seule sanction",
                "stdin": "cas:1",
                "expected": "emprisonnement : penale\npenales : 1\nciviles : 0\nadministratives : 0\ndisciplinaires : 0"
          },
          {
                "label": "Deux administratives",
                "stdin": "cas:2",
                "expected": "suspension : administrative\nretrait : administrative\npenales : 0\nciviles : 0\nadministratives : 2\ndisciplinaires : 0"
          },
          {
                "label": "Cinq sanctions mixtes",
                "stdin": "cas:3",
                "expected": "amende : penale\nblame : disciplinaire\nretrait : administrative\ndommages : civile\nemprisonnement : penale\npenales : 2\nciviles : 1\nadministratives : 1\ndisciplinaires : 1"
          }
    ],
    solution: "[Exemple]\namende : penale\ndommages : civile\nlicenciement : disciplinaire\npenales : 1\nciviles : 1\nadministratives : 0\ndisciplinaires : 1\n\n[Cas 1 — Une seule sanction]\nemprisonnement : penale\npenales : 1\nciviles : 0\nadministratives : 0\ndisciplinaires : 0\n\n[Cas 2 — Deux administratives]\nsuspension : administrative\nretrait : administrative\npenales : 0\nciviles : 0\nadministratives : 2\ndisciplinaires : 0\n\n[Cas 3 — Cinq sanctions mixtes]\namende : penale\nblame : disciplinaire\nretrait : administrative\ndommages : civile\nemprisonnement : penale\npenales : 2\nciviles : 1\nadministratives : 1\ndisciplinaires : 1\n"
  },
  {
    id: "dr-c2-e1",
    chapter: 2,
    level: "n1",
    language: 'analyse',
    title: "Sources directes et indirectes",
    goal: "Classer les sources du droit entre directes (loi, coutume) et indirectes (jurisprudence, doctrine).",
    brief: "<p>Pour chaque situation proposée : categorie vaut <code>d</code> (directe) ou <code>i</code> (indirecte). Pour chaque situation, indiquez <code>source : poids</code>, où poids vaut <code>principale</code> (directe) ou <code>interpretative</code> (indirecte). Concluez par <code>sources directes : X/n</code>, X étant le nombre de sources directes.</p>",
    starter: "# Grille d'analyse (dr-c2-e1) — Sources directes et indirectes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule source]\n# Données : coutume d\nA_COMPLETER\n\n[Cas 2 — Deux indirectes]\n# Données : jurisprudence i\n# Données : doctrine i\nA_COMPLETER\n\n[Cas 3 — Cinq sources mixtes]\n# Données : loi d\n# Données : doctrine i\n# Données : coutume d\n# Données : arrets i\n# Données : reglement d\nA_COMPLETER\n",
    hints: [
          "Un if sur la catégorie suffit : d et i sont les deux seules valeurs.",
          "Le compteur suit exactement les lignes « principale »."
    ],
    examples: [
          {
                "stdin": "4\nloi d\ncoutume d\njurisprudence i\ndoctrine i\n",
                "expected": "loi : principale\ncoutume : principale\njurisprudence : interpretative\ndoctrine : interpretative\nsources directes : 2/4"
          }
    ],
    tests: [
          {
                "label": "Une seule source",
                "stdin": "cas:1",
                "expected": "coutume : principale\nsources directes : 1/1"
          },
          {
                "label": "Deux indirectes",
                "stdin": "cas:2",
                "expected": "jurisprudence : interpretative\ndoctrine : interpretative\nsources directes : 0/2"
          },
          {
                "label": "Cinq sources mixtes",
                "stdin": "cas:3",
                "expected": "loi : principale\ndoctrine : interpretative\ncoutume : principale\narrets : interpretative\nreglement : principale\nsources directes : 3/5"
          }
    ],
    solution: "[Exemple]\nloi : principale\ncoutume : principale\njurisprudence : interpretative\ndoctrine : interpretative\nsources directes : 2/4\n\n[Cas 1 — Une seule source]\ncoutume : principale\nsources directes : 1/1\n\n[Cas 2 — Deux indirectes]\njurisprudence : interpretative\ndoctrine : interpretative\nsources directes : 0/2\n\n[Cas 3 — Cinq sources mixtes]\nloi : principale\ndoctrine : interpretative\ncoutume : principale\narrets : interpretative\nreglement : principale\nsources directes : 3/5\n"
  },
  {
    id: "dr-c2-e2",
    chapter: 2,
    level: "n2",
    language: 'analyse',
    title: "Du vote à l'entrée en vigueur",
    goal: "Reconstituer la chronologie d'établissement d'une loi : adoption, promulgation, parution, jour franc, entrée en vigueur.",
    brief: "<p>Pour chaque situation proposée : jour est un entier croissant (numéro du jour) et l'étape appartient à la séquence <code>adoption</code> (1), <code>promulgation</code> (2), <code>parution</code> (3), <code>jourfranc</code> (4), <code>vigueur</code> (5). Le cas vérifie que les étapes arrivent dans cet ordre. Pour chaque situation, indiquez <code>etape : ok</code> ou <code>etape : hors sequence</code>. Concluez par <code>sequence : X/n valides</code>.</p>",
    starter: "# Grille d'analyse (dr-c2-e2) — Du vote à l'entrée en vigueur\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule étape]\n# Données : 1 adoption\nA_COMPLETER\n\n[Cas 2 — Jour franc oublié]\n# Données : 1 adoption\n# Données : 2 promulgation\n# Données : 3 parution\n# Données : 5 vigueur\nA_COMPLETER\n\n[Cas 3 — Promulgation répétée]\n# Données : 1 adoption\n# Données : 2 promulgation\n# Données : 2 promulgation\nA_COMPLETER\n",
    hints: [
          "La variable suivante contient le rang de l'étape attendue (1 à 5) : mappez chaque étape à son rang et comparez.",
          "Une étape hors séquence lève un drapeau : tout ce qui suit est hors séquence, même si l'étape redevient attendue."
    ],
    examples: [
          {
                "stdin": "5\n1 adoption\n2 promulgation\n3 parution\n4 jourfranc\n5 vigueur\n",
                "expected": "adoption : ok\npromulgation : ok\nparution : ok\njourfranc : ok\nvigueur : ok\nsequence : 5/5 valides"
          }
    ],
    tests: [
          {
                "label": "Une seule étape",
                "stdin": "cas:1",
                "expected": "adoption : ok\nsequence : 1/1 valides"
          },
          {
                "label": "Jour franc oublié",
                "stdin": "cas:2",
                "expected": "adoption : ok\npromulgation : ok\nparution : ok\nvigueur : hors sequence\nsequence : 3/4 valides"
          },
          {
                "label": "Promulgation répétée",
                "stdin": "cas:3",
                "expected": "adoption : ok\npromulgation : ok\npromulgation : hors sequence\nsequence : 2/3 valides"
          }
    ],
    solution: "[Exemple]\nadoption : ok\npromulgation : ok\nparution : ok\njourfranc : ok\nvigueur : ok\nsequence : 5/5 valides\n\n[Cas 1 — Une seule étape]\nadoption : ok\nsequence : 1/1 valides\n\n[Cas 2 — Jour franc oublié]\nadoption : ok\npromulgation : ok\nparution : ok\nvigueur : hors sequence\nsequence : 3/4 valides\n\n[Cas 3 — Promulgation répétée]\nadoption : ok\npromulgation : ok\npromulgation : hors sequence\nsequence : 2/3 valides\n"
  },
  {
    id: "dr-c2-e3",
    chapter: 2,
    level: "n3",
    language: 'analyse',
    title: "La pyramide des normes",
    goal: "Appliquer la hiérarchie des normes : contrôler la conformité de chaque norme à sa norme supérieure.",
    brief: "<p>Pour chaque situation proposée : niveau vaut <code>const</code> (constitution), <code>trait</code> (traité), <code>loi</code> ou <code>regl</code> (règlement). Il vérifie que les niveaux arrivent en ordre décroissant de la pyramide (const, puis trait, puis loi, puis regl — chaque niveau peut apparaître plusieurs fois). Pour chaque situation, indiquez <code>texte : conforme</code> si le niveau respecte l'ordre, <code>texte : viole la hierarchie</code> sinon. Concluez par <code>pyramide : X/n conformes</code>. La loi l'emporte sur le règlement en cas de conflit : toute inversion fait basculer les lignes suivantes.</p>",
    starter: "# Grille d'analyse (dr-c2-e3) — La pyramide des normes\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule constitution]\n# Données : const constitution\nA_COMPLETER\n\n[Cas 2 — Règlement avant la loi]\n# Données : regl arrete ministeriel\n# Données : loi code des impots\nA_COMPLETER\n\n[Cas 3 — Cinq normes mixtes]\n# Données : const constitution\n# Données : loi loi organique\n# Données : regl decret\n# Données : loi loi ordinaire\n# Données : regl arrrete\nA_COMPLETER\n",
    hints: [
          "Attribuez un rang : const = 4, trait = 3, loi = 2, regl = 1 ; l'ordre pyramidal impose rang ≤ rang_actuel.",
          "Mettez à jour rang_actuel à chaque ligne conforme ; une inversion rompt le reste."
    ],
    examples: [
          {
                "stdin": "4\nconst constitution 2024\ntrait traites OUA\nloi code du travail\nregl decret d application\n",
                "expected": "constitution 2024 : conforme\ntraites OUA : conforme\ncode du travail : conforme\ndecret d application : conforme\npyramide : 4/4 conformes"
          }
    ],
    tests: [
          {
                "label": "Une seule constitution",
                "stdin": "cas:1",
                "expected": "constitution : conforme\npyramide : 1/1 conformes"
          },
          {
                "label": "Règlement avant la loi",
                "stdin": "cas:2",
                "expected": "arrete ministeriel : conforme\ncode des impots : viole la hierarchie\npyramide : 1/2 conformes"
          },
          {
                "label": "Cinq normes mixtes",
                "stdin": "cas:3",
                "expected": "constitution : conforme\nloi organique : conforme\ndecret : conforme\nloi ordinaire : viole la hierarchie\narrrete : viole la hierarchie\npyramide : 3/5 conformes"
          }
    ],
    solution: "[Exemple]\nconstitution 2024 : conforme\ntraites OUA : conforme\ncode du travail : conforme\ndecret d application : conforme\npyramide : 4/4 conformes\n\n[Cas 1 — Une seule constitution]\nconstitution : conforme\npyramide : 1/1 conformes\n\n[Cas 2 — Règlement avant la loi]\narrete ministeriel : conforme\ncode des impots : viole la hierarchie\npyramide : 1/2 conformes\n\n[Cas 3 — Cinq normes mixtes]\nconstitution : conforme\nloi organique : conforme\ndecret : conforme\nloi ordinaire : viole la hierarchie\narrrete : viole la hierarchie\npyramide : 3/5 conformes\n"
  },
  {
    id: "dr-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Les juridictions de droit commun",
    goal: "Router un dossier vers la bonne juridiction : TPI, Cour d'Appel ou Cour Suprême.",
    brief: "<p>Pour chaque situation proposée : degre vaut <code>1</code> (première instance : TPI), <code>2</code> (appel) ou <code>3</code> (cassation). Pour chaque situation, indiquez <code>degre : juridiction</code>, où juridiction vaut <code>TPI</code>, <code>Cour d Appel</code> ou <code>Cour Supreme</code>. Concluez par <code>dossiers premier degre : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr-c3-e1) — Les juridictions de droit commun\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul pourvoi]\n# Données : 3 X\nA_COMPLETER\n\n[Cas 2 — Deux appels]\n# Données : 2 B\n# Données : 2 C\nA_COMPLETER\n\n[Cas 3 — Cinq dossiers mixtes]\n# Données : 1 A\n# Données : 2 B\n# Données : 1 C\n# Données : 3 D\n# Données : 2 E\nA_COMPLETER\n",
    hints: [
          "Un case à trois branches traduit le degré en juridiction.",
          "Comptez seulement les dossiers de premier degré (TPI)."
    ],
    examples: [
          {
                "stdin": "4\n1 D001\n2 D002\n3 D003\n1 D004\n",
                "expected": "D001 : TPI\nD002 : Cour d Appel\nD003 : Cour Supreme\nD004 : TPI\ndossiers premier degre : 2/4"
          }
    ],
    tests: [
          {
                "label": "Un seul pourvoi",
                "stdin": "cas:1",
                "expected": "X : Cour Supreme\ndossiers premier degre : 0/1"
          },
          {
                "label": "Deux appels",
                "stdin": "cas:2",
                "expected": "B : Cour d Appel\nC : Cour d Appel\ndossiers premier degre : 0/2"
          },
          {
                "label": "Cinq dossiers mixtes",
                "stdin": "cas:3",
                "expected": "A : TPI\nB : Cour d Appel\nC : TPI\nD : Cour Supreme\nE : Cour d Appel\ndossiers premier degre : 2/5"
          }
    ],
    solution: "[Exemple]\nD001 : TPI\nD002 : Cour d Appel\nD003 : Cour Supreme\nD004 : TPI\ndossiers premier degre : 2/4\n\n[Cas 1 — Un seul pourvoi]\nX : Cour Supreme\ndossiers premier degre : 0/1\n\n[Cas 2 — Deux appels]\nB : Cour d Appel\nC : Cour d Appel\ndossiers premier degre : 0/2\n\n[Cas 3 — Cinq dossiers mixtes]\nA : TPI\nB : Cour d Appel\nC : TPI\nD : Cour Supreme\nE : Cour d Appel\ndossiers premier degre : 2/5\n"
  },
  {
    id: "dr-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Le double degré de juridiction",
    goal: "Vérifier le principe du double degré : chaque appel doit correspondre à une affaire jugée en première instance.",
    brief: "<p>Pour chaque situation proposée : acte vaut <code>jugement</code> ou <code>appel</code>. Un appel est <code>recevable</code> si l'affaire a déjà fait l'objet d'un jugement (première instance), <code>irrecevable</code> sinon (rien à appeler). Pour chaque situation, indiquez <code>acte affaire : statut</code> ou <code>appel affaire : irrecevable</code>. Concluez par <code>appels recevables : X</code>. Un même affaire peut être jugée puis appelée, une seule fois chacune ; un appel sur affaire déjà appelée est irrecevable.</p>",
    starter: "# Grille d'analyse (dr-c3-e2) — Le double degré de juridiction\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un appel direct]\n# Données : appel A\nA_COMPLETER\n\n[Cas 2 — Deux jugements deux appels]\n# Données : jugement A\n# Données : jugement B\n# Données : appel A\n# Données : appel B\nA_COMPLETER\n\n[Cas 3 — Cinq actes mixtes]\n# Données : jugement A\n# Données : appel A\n# Données : jugement B\n# Données : appel B\n# Données : appel B\nA_COMPLETER\n",
    hints: [
          "Deux tableaux associatifs : juges[affaire]=1 à chaque jugement, appeles[affaire]=1 à chaque appel.",
          "Un appel est recevable si juges[affaire] existe et appeles[affaire] n'existe pas."
    ],
    examples: [
          {
                "stdin": "4\njugement A\nappel A\nappel B\nappel A\n",
                "expected": "jugement A : ok\nappel A : recevable\nappel B : irrecevable\nappel A : irrecevable\nappels recevables : 1"
          }
    ],
    tests: [
          {
                "label": "Un appel direct",
                "stdin": "cas:1",
                "expected": "appel A : irrecevable\nappels recevables : 0"
          },
          {
                "label": "Deux jugements deux appels",
                "stdin": "cas:2",
                "expected": "jugement A : ok\njugement B : ok\nappel A : recevable\nappel B : recevable\nappels recevables : 2"
          },
          {
                "label": "Cinq actes mixtes",
                "stdin": "cas:3",
                "expected": "jugement A : ok\nappel A : recevable\njugement B : ok\nappel B : recevable\nappel B : irrecevable\nappels recevables : 2"
          }
    ],
    solution: "[Exemple]\njugement A : ok\nappel A : recevable\nappel B : irrecevable\nappel A : irrecevable\nappels recevables : 1\n\n[Cas 1 — Un appel direct]\nappel A : irrecevable\nappels recevables : 0\n\n[Cas 2 — Deux jugements deux appels]\njugement A : ok\njugement B : ok\nappel A : recevable\nappel B : recevable\nappels recevables : 2\n\n[Cas 3 — Cinq actes mixtes]\njugement A : ok\nappel A : recevable\njugement B : ok\nappel B : recevable\nappel B : irrecevable\nappels recevables : 2\n"
  },
  {
    id: "dr-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Nul ne peut se faire justice",
    goal: "Traiter un registre de litiges : la justice revient à l'État, les vengeances privées sont sanctionnées.",
    brief: "<p>Pour chaque situation proposée : action vaut <code>plainte</code> (voie légale) ou <code>riposte</code> (justice privée). Une riposte produit <code>sanction : riposte</code> et une amende (lue en fin : <code>amende</code> entier). Une plainte produit <code>audience : victoire</code>. En fin de cas : une ligne par riposte <code>sanction : amende de X</code> (X = amende par riposte), puis <code>justice privee : X cas</code> et <code>voie legale : Y cas</code>.</p>",
    starter: "# Grille d'analyse (dr-c3-e3) — Nul ne peut se faire justice\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule plainte]\n# Données : Kossi plainte\n# Données : 1000\nA_COMPLETER\n\n[Cas 2 — Que des ripostes]\n# Données : Ama riposte\n# Données : Yao riposte\n# Données : 500\nA_COMPLETER\n\n[Cas 3 — Cinq lignes mixtes]\n# Données : A plainte\n# Données : B riposte\n# Données : C plainte\n# Données : D riposte\n# Données : E riposte\n# Données : 750\nA_COMPLETER\n",
    hints: [
          "Retenez les victoires qui ont riposté dans un tableau ; comptez aussi les deux catégories.",
          "Les amendes s'affichent après la lecture de l'amende, une ligne par riposte dans l'ordre d'apparition."
    ],
    examples: [
          {
                "stdin": "4\nKossi plainte\nAma riposte\nYao plainte\nKoffi riposte\n2000\n",
                "expected": "Kossi : audience\nAma : sanction\nYao : audience\nKoffi : sanction\namende de 2000\namende de 2000\njustice privee : 2 cas\nvoie legale : 2 cas"
          }
    ],
    tests: [
          {
                "label": "Une seule plainte",
                "stdin": "cas:1",
                "expected": "Kossi : audience\njustice privee : 0 cas\nvoie legale : 1 cas"
          },
          {
                "label": "Que des ripostes",
                "stdin": "cas:2",
                "expected": "Ama : sanction\nYao : sanction\namende de 500\namende de 500\njustice privee : 2 cas\nvoie legale : 0 cas"
          },
          {
                "label": "Cinq lignes mixtes",
                "stdin": "cas:3",
                "expected": "A : audience\nB : sanction\nC : audience\nD : sanction\nE : sanction\namende de 750\namende de 750\namende de 750\njustice privee : 3 cas\nvoie legale : 2 cas"
          }
    ],
    solution: "[Exemple]\nKossi : audience\nAma : sanction\nYao : audience\nKoffi : sanction\namende de 2000\namende de 2000\njustice privee : 2 cas\nvoie legale : 2 cas\n\n[Cas 1 — Une seule plainte]\nKossi : audience\njustice privee : 0 cas\nvoie legale : 1 cas\n\n[Cas 2 — Que des ripostes]\nAma : sanction\nYao : sanction\namende de 500\namende de 500\njustice privee : 2 cas\nvoie legale : 0 cas\n\n[Cas 3 — Cinq lignes mixtes]\nA : audience\nB : sanction\nC : audience\nD : sanction\nE : sanction\namende de 750\namende de 750\namende de 750\njustice privee : 3 cas\nvoie legale : 2 cas\n"
  },
  {
    id: "dr-c4-e1",
    chapter: 4,
    level: "n1",
    language: 'analyse',
    title: "Personnes physiques et morales",
    goal: "Classer les sujets de droit entre personnes physiques et morales, puis entre droit public et privé.",
    brief: "<p>Pour chaque situation proposée : type vaut <code>phys</code>, <code>morp</code> (morale de droit public) ou <code>morv</code> (morale de droit privé). Pour chaque situation, indiquez <code>sujet : categorie</code> où categorie vaut <code>personne physique</code>, <code>morale publique</code> ou <code>morale privee</code>. Concluez par <code>personnes : X/n</code>, X étant le nombre de personnes morales (publiques + privées).</p>",
    starter: "# Grille d'analyse (dr-c4-e1) — Personnes physiques et morales\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule personne]\n# Données : Ama phys\nA_COMPLETER\n\n[Cas 2 — Deux publiques]\n# Données : Etat morp\n# Données : Commune morp\nA_COMPLETER\n\n[Cas 3 — Cinq sujets mixtes]\n# Données : Kossi phys\n# Données : Universite morp\n# Données : SARL morv\n# Données : Fondation morv\n# Données : Ama phys\nA_COMPLETER\n",
    hints: [
          "Trois types, trois catégories : un case à trois branches.",
          "Les personnes morales = morp + morv, comptées ensemble."
    ],
    examples: [
          {
                "stdin": "4\nKossi phys\nEtat morp\nSARL morv\nAssociation morv\n",
                "expected": "Kossi : personne physique\nEtat : morale publique\nSARL : morale privee\nAssociation : morale privee\npersonnes : 3/4"
          }
    ],
    tests: [
          {
                "label": "Une seule personne",
                "stdin": "cas:1",
                "expected": "Ama : personne physique\npersonnes : 0/1"
          },
          {
                "label": "Deux publiques",
                "stdin": "cas:2",
                "expected": "Etat : morale publique\nCommune : morale publique\npersonnes : 2/2"
          },
          {
                "label": "Cinq sujets mixtes",
                "stdin": "cas:3",
                "expected": "Kossi : personne physique\nUniversite : morale publique\nSARL : morale privee\nFondation : morale privee\nAma : personne physique\npersonnes : 3/5"
          }
    ],
    solution: "[Exemple]\nKossi : personne physique\nEtat : morale publique\nSARL : morale privee\nAssociation : morale privee\npersonnes : 3/4\n\n[Cas 1 — Une seule personne]\nAma : personne physique\npersonnes : 0/1\n\n[Cas 2 — Deux publiques]\nEtat : morale publique\nCommune : morale publique\npersonnes : 2/2\n\n[Cas 3 — Cinq sujets mixtes]\nKossi : personne physique\nUniversite : morale publique\nSARL : morale privee\nFondation : morale privee\nAma : personne physique\npersonnes : 3/5\n"
  },
  {
    id: "dr-c4-e2",
    chapter: 4,
    level: "n2",
    language: 'analyse',
    title: "Naissance, décès, absence, disparition",
    goal: "Déterminer si une personne physique a la personnalité juridique selon son état civil.",
    brief: "<p>Pour chaque situation proposée : situation vaut <code>naissance</code>, <code>vivant</code>, <code>deces</code>, <code>absent</code> (sans nouvelles depuis 5 ans) ou <code>disparu</code> (corps introuvable, décès probable). La personnalité existe pour naissance, vivant et disparu (présomption de décès) ; elle est éteinte pour deces ; pour absent, elle subsiste jusqu'à la déclaration d'absence : le cas affiche <code>en instance</code>. Pour chaque situation, indiquez <code>nom : verdict</code> où verdict vaut <code>titulaire</code>, <code>en instance</code> ou <code>eteinte</code>. Concluez par <code>titulaires : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr-c4-e2) — Naissance, décès, absence, disparition\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un absent]\n# Données : Exile absent\nA_COMPLETER\n\n[Cas 2 — Un décès]\n# Données : Feu deces\nA_COMPLETER\n\n[Cas 3 — Cinq situations]\n# Données : A naissance\n# Données : B vivant\n# Données : C absent\n# Données : D deces\n# Données : E disparu\nA_COMPLETER\n",
    hints: [
          "Un case à cinq situations, trois verdicts : titulaire (naissance, vivant, disparu), en instance (absent), éteinte (deces).",
          "Comptez seulement les titulaires."
    ],
    examples: [
          {
                "stdin": "4\nbebe naissance\nKossi vivant\nTante deces\nVoyageur disparu\n",
                "expected": "bebe : titulaire\nKossi : titulaire\nTante : eteinte\nVoyageur : titulaire\ntitulaires : 3/4"
          }
    ],
    tests: [
          {
                "label": "Un absent",
                "stdin": "cas:1",
                "expected": "Exile : en instance\ntitulaires : 0/1"
          },
          {
                "label": "Un décès",
                "stdin": "cas:2",
                "expected": "Feu : eteinte\ntitulaires : 0/1"
          },
          {
                "label": "Cinq situations",
                "stdin": "cas:3",
                "expected": "A : titulaire\nB : titulaire\nC : en instance\nD : eteinte\nE : titulaire\ntitulaires : 3/5"
          }
    ],
    solution: "[Exemple]\nbebe : titulaire\nKossi : titulaire\nTante : eteinte\nVoyageur : titulaire\ntitulaires : 3/4\n\n[Cas 1 — Un absent]\nExile : en instance\ntitulaires : 0/1\n\n[Cas 2 — Un décès]\nFeu : eteinte\ntitulaires : 0/1\n\n[Cas 3 — Cinq situations]\nA : titulaire\nB : titulaire\nC : en instance\nD : eteinte\nE : titulaire\ntitulaires : 3/5\n"
  },
  {
    id: "dr-c4-e3",
    chapter: 4,
    level: "n3",
    language: 'analyse',
    title: "L'enfant conçu et la succession",
    goal: "Appliquer la règle de l'enfant simplement conçu : la personnalité peut remonter à la conception.",
    brief: "<p>Pour chaque situation proposée : condition vaut <code>ne</code> (né vivant et viable à l'ouverture de la succession) ou <code>concu</code> (simplement conçu). L'héritier recueille si : né (naissance ≤ décès) ou conçu avec naissance ≥ décès (l'enfant à naître). Pour chaque situation, indiquez <code>heritier : succede</code> ou <code>heritier : ecarte</code>. Concluez par <code>succession : X/n parts</code>, X étant le nombre d'héritiers qui succèdent.</p>",
    starter: "# Grille d'analyse (dr-c4-e3) — L'enfant conçu et la succession\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Héritier né après]\n# Données : tardif 2030 2024 ne\nA_COMPLETER\n\n[Cas 2 — Deux conçus]\n# Données : premier 2025 2024 concu\n# Données : second 2026 2024 concu\nA_COMPLETER\n\n[Cas 3 — Cinq héritiers mixtes]\n# Données : A 1980 2024 ne\n# Données : B 2030 2024 ne\n# Données : C 2025 2024 concu\n# Données : D 1990 2024 ne\n# Données : E 2040 2024 ne\nA_COMPLETER\n",
    hints: [
          "Né : la naissance est antérieure ou égale au décès. Conçu : la naissance vient après le décès (personnalité remontée à la conception).",
          "Comparez avec -le et -gt sur les années ; comptez les parts qui succèdent."
    ],
    examples: [
          {
                "stdin": "3\naine 1990 2024 ne\ncadet 2024 2024 ne\nconcu 2025 2024 concu\n",
                "expected": "aine : succede\ncadet : succede\nconcu : succede\nsuccession : 3/3 parts"
          }
    ],
    tests: [
          {
                "label": "Héritier né après",
                "stdin": "cas:1",
                "expected": "tardif : ecarte\nsuccession : 0/1 parts"
          },
          {
                "label": "Deux conçus",
                "stdin": "cas:2",
                "expected": "premier : succede\nsecond : succede\nsuccession : 2/2 parts"
          },
          {
                "label": "Cinq héritiers mixtes",
                "stdin": "cas:3",
                "expected": "A : succede\nB : ecarte\nC : succede\nD : succede\nE : ecarte\nsuccession : 3/5 parts"
          }
    ],
    solution: "[Exemple]\naine : succede\ncadet : succede\nconcu : succede\nsuccession : 3/3 parts\n\n[Cas 1 — Héritier né après]\ntardif : ecarte\nsuccession : 0/1 parts\n\n[Cas 2 — Deux conçus]\npremier : succede\nsecond : succede\nsuccession : 2/2 parts\n\n[Cas 3 — Cinq héritiers mixtes]\nA : succede\nB : ecarte\nC : succede\nD : succede\nE : ecarte\nsuccession : 3/5 parts\n"
  },
  {
    id: "dr-c5-e1",
    chapter: 5,
    level: "n1",
    language: 'analyse',
    title: "Le jour franc",
    goal: "Calculer la date d'entrée en vigueur d'une loi : parution au journal officiel, puis jour franc.",
    brief: "<p>Pour chaque situation proposée : jour de vigueur = jour_parution + 1. Pour chaque situation, indiquez <code>loi : vigueur au jour X</code>. Concluez par <code>lois en vigueur : X/n</code> avec X = nombre de lois dont le jour de parution est strictement positif (parution valide).</p>",
    starter: "# Grille d'analyse (dr-c5-e1) — Le jour franc\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule loi]\n# Données : loiA 1\nA_COMPLETER\n\n[Cas 2 — Deux parutions valides]\n# Données : loiB 10\n# Données : loiC 29\nA_COMPLETER\n\n[Cas 3 — Quatre lois mixtes]\n# Données : loiD 5\n# Données : loiE 0\n# Données : loiF 12\n# Données : loiG 1\nA_COMPLETER\n",
    hints: [
          "Le calcul est un simple jour + 1, affiché dans la phrase exacte.",
          "Validez la parution : jour > 0 (sinon la ligne ne compte pas comme loi parue)."
    ],
    examples: [
          {
                "stdin": "3\nloiA 3\nloiB 4\nloiC 0\n",
                "expected": "loiA : vigueur au jour 4\nloiB : vigueur au jour 5\nloiC : parution invalide\nlois en vigueur : 2/3"
          }
    ],
    tests: [
          {
                "label": "Une seule loi",
                "stdin": "cas:1",
                "expected": "loiA : vigueur au jour 2\nlois en vigueur : 1/1"
          },
          {
                "label": "Deux parutions valides",
                "stdin": "cas:2",
                "expected": "loiB : vigueur au jour 11\nloiC : vigueur au jour 30\nlois en vigueur : 2/2"
          },
          {
                "label": "Quatre lois mixtes",
                "stdin": "cas:3",
                "expected": "loiD : vigueur au jour 6\nloiE : parution invalide\nloiF : vigueur au jour 13\nloiG : vigueur au jour 2\nlois en vigueur : 3/4"
          }
    ],
    solution: "[Exemple]\nloiA : vigueur au jour 4\nloiB : vigueur au jour 5\nloiC : parution invalide\nlois en vigueur : 2/3\n\n[Cas 1 — Une seule loi]\nloiA : vigueur au jour 2\nlois en vigueur : 1/1\n\n[Cas 2 — Deux parutions valides]\nloiB : vigueur au jour 11\nloiC : vigueur au jour 30\nlois en vigueur : 2/2\n\n[Cas 3 — Quatre lois mixtes]\nloiD : vigueur au jour 6\nloiE : parution invalide\nloiF : vigueur au jour 13\nloiG : vigueur au jour 2\nlois en vigueur : 3/4\n"
  },
  {
    id: "dr-c5-e2",
    chapter: 5,
    level: "n2",
    language: 'analyse',
    title: "Non-rétroactivité et effet immédiat",
    goal: "Statuer sur des situations juridiques selon la loi applicable : ancienne, nouvelle, effet immédiat.",
    brief: "<p>L’analyse porte sur d'abord <code>vigueur</code> (jour d'entrée en vigueur de la loi nouvelle). Puis il lit <code>n</code>, puis <strong>n lignes</strong> « situation naissance fin » : la situation juridique est née au jour naissance et a fini de produire ses effets au jour fin (fin ≥ naissance). Si fin &lt; vigueur : situation éteinte avant la loi nouvelle → <code>loi ancienne</code> (non-rétroactivité). Sinon (née après, ou née avant et encore en cours) → <code>loi nouvelle</code> : la loi nouvelle s'applique immédiatement. Affichage : <code>situation : verdict</code>. Bilan : <code>situations sous loi nouvelle : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr-c5-e2) — Non-rétroactivité et effet immédiat\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule situation]\n# Données : 1\n# Données : X 2 2\nA_COMPLETER\n\n[Cas 2 — Situations en cours]\n# Données : 2\n# Données : S1 1 9\n# Données : S2 5 6\nA_COMPLETER\n\n[Cas 3 — Cinq situations]\n# Données : 5\n# Données : A 1 5\n# Données : B 2 6\n# Données : C 6 9\n# Données : D 4 4\n# Données : E 7 8\nA_COMPLETER\n",
    hints: [
          "Deux tests dans l'ordre : fin < vigueur → ancienne ; sinon → nouvelle (effet immédiat, y compris situations en cours).",
          "Le compteur suit exactement les verdicts « loi nouvelle »."
    ],
    examples: [
          {
                "stdin": "3\n5\nA 1 2\nB 6 9\nC 3 7\nD 2 2\nE 5 8\n",
                "expected": "A : loi ancienne\nB : loi nouvelle\nC : loi nouvelle\nD : loi ancienne\nE : loi nouvelle\nsituations sous loi nouvelle : 3/5"
          }
    ],
    tests: [
          {
                "label": "Une seule situation",
                "stdin": "cas:1",
                "expected": "X : loi ancienne\nsituations sous loi nouvelle : 0/1"
          },
          {
                "label": "Situations en cours",
                "stdin": "cas:2",
                "expected": "S1 : loi nouvelle\nS2 : loi nouvelle\nsituations sous loi nouvelle : 2/2"
          },
          {
                "label": "Cinq situations",
                "stdin": "cas:3",
                "expected": "A : loi ancienne\nB : loi nouvelle\nC : loi nouvelle\nD : loi ancienne\nE : loi nouvelle\nsituations sous loi nouvelle : 3/5"
          }
    ],
    solution: "[Exemple]\nA : loi ancienne\nB : loi nouvelle\nC : loi nouvelle\nD : loi ancienne\nE : loi nouvelle\nsituations sous loi nouvelle : 3/5\n\n[Cas 1 — Une seule situation]\nX : loi ancienne\nsituations sous loi nouvelle : 0/1\n\n[Cas 2 — Situations en cours]\nS1 : loi nouvelle\nS2 : loi nouvelle\nsituations sous loi nouvelle : 2/2\n\n[Cas 3 — Cinq situations]\nA : loi ancienne\nB : loi nouvelle\nC : loi nouvelle\nD : loi ancienne\nE : loi nouvelle\nsituations sous loi nouvelle : 3/5\n"
  },
  {
    id: "dr-c5-e3",
    chapter: 5,
    level: "n3",
    language: 'analyse',
    title: "Abrogation expresse et tacite",
    goal: "Détecter l'abrogation : expresse (texte nouveau qui le dit) ou tacite (incompatibilité).",
    brief: "<p>Pour chaque situation proposée : disposition vaut <code>compatible</code>, <code>incompatible</code> ou <code>abroge</code>. Un <code>abroge</code> marque l'abrogation expresse de la disposition ancienne. Une <code>incompatible</code> marque l'abrogation tacite. Pour chaque situation, indiquez <code>disposition : maintenue</code>, <code>disposition : abrogee tacitement</code> ou <code>disposition : abrogee expressément</code>. Une disposition déjà abrogée qui réapparaît affiche <code>disposition : deja abrogee</code>. Concluez par <code>abrogations : X/n</code> (expresses + tacites).</p>",
    starter: "# Grille d'analyse (dr-c5-e3) — Abrogation expresse et tacite\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une seule abrogation]\n# Données : artA abroge\nA_COMPLETER\n\n[Cas 2 — Répétition après expresse]\n# Données : artB abroge\n# Données : artB abroge\n# Données : artB incompatible\nA_COMPLETER\n\n[Cas 3 — Cinq lignes mixtes]\n# Données : art1 compatible\n# Données : art2 abroge\n# Données : art3 incompatible\n# Données : art3 compatible\n# Données : art2 incompatible\nA_COMPLETER\n",
    hints: [
          "Un tableau etat[texte] retient le statut : vide = maintenue, t = abrogée tacitement, e = abrogée expressément.",
          "Une ligne sur une disposition déjà abrogée (e ou t) affiche « deja abrogee », quel que soit l'événement."
    ],
    examples: [
          {
                "stdin": "5\nart1 compatible\nart2 incompatible\nart3 abroge\nart2 incompatible\nart1 compatible\n",
                "expected": "art1 : maintenue\nart2 : abrogee tacitement\nart3 : abrogee expressément\nart2 : deja abrogee\nart1 : maintenue\nabrogations : 2/5"
          }
    ],
    tests: [
          {
                "label": "Une seule abrogation",
                "stdin": "cas:1",
                "expected": "artA : abrogee expressément\nabrogations : 1/1"
          },
          {
                "label": "Répétition après expresse",
                "stdin": "cas:2",
                "expected": "artB : abrogee expressément\nartB : deja abrogee\nartB : deja abrogee\nabrogations : 1/3"
          },
          {
                "label": "Cinq lignes mixtes",
                "stdin": "cas:3",
                "expected": "art1 : maintenue\nart2 : abrogee expressément\nart3 : abrogee tacitement\nart3 : deja abrogee\nart2 : deja abrogee\nabrogations : 2/5"
          }
    ],
    solution: "[Exemple]\nart1 : maintenue\nart2 : abrogee tacitement\nart3 : abrogee expressément\nart2 : deja abrogee\nart1 : maintenue\nabrogations : 2/5\n\n[Cas 1 — Une seule abrogation]\nartA : abrogee expressément\nabrogations : 1/1\n\n[Cas 2 — Répétition après expresse]\nartB : abrogee expressément\nartB : deja abrogee\nartB : deja abrogee\nabrogations : 1/3\n\n[Cas 3 — Cinq lignes mixtes]\nart1 : maintenue\nart2 : abrogee expressément\nart3 : abrogee tacitement\nart3 : deja abrogee\nart2 : deja abrogee\nabrogations : 2/5\n"
  },
  {
    id: "dr-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Conditions de validité du contrat",
    goal: "Vérifier les quatre conditions de validité d'un contrat : capacité, consentement, objet, cause.",
    brief: "<p>Pour chaque situation proposée : chaque condition vaut <code>ok</code> ou <code>ko</code>. Le contrat est <code>valide</code> si les quatre conditions sont ok, sinon <code>nullite : X manquantes</code> où X est le nombre de conditions ko. Concluez par <code>contrats valides : X/n</code>.</p>",
    starter: "# Grille d'analyse (dr-c6-e1) — Conditions de validité du contrat\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un contrat parfait]\n# Données : A ok ok ok ok\nA_COMPLETER\n\n[Cas 2 — Deux manquantes]\n# Données : B ko ko ok ok\nA_COMPLETER\n\n[Cas 3 — Quatre contrats]\n# Données : C ok ok ok ok\n# Données : D ok ok ok ko\n# Données : E ok ok ko ko\n# Données : F ok ok ok ok\nA_COMPLETER\n",
    hints: [
          "Un compteur de conditions ko remis à 0 à chaque contrat : incrémentez pour chaque condition qui vaut ko.",
          "Quatre conditions ok = valide ; sinon affichez le nombre de manquantes."
    ],
    examples: [
          {
                "stdin": "2\nvente ok ok ok ok\nlocation ok ko ok ok\n",
                "expected": "vente : valide\nlocation : nullite : 1 manquantes\ncontrats valides : 1/2"
          }
    ],
    tests: [
          {
                "label": "Un contrat parfait",
                "stdin": "cas:1",
                "expected": "A : valide\ncontrats valides : 1/1"
          },
          {
                "label": "Deux manquantes",
                "stdin": "cas:2",
                "expected": "B : nullite : 2 manquantes\ncontrats valides : 0/1"
          },
          {
                "label": "Quatre contrats",
                "stdin": "cas:3",
                "expected": "C : valide\nD : nullite : 1 manquantes\nE : nullite : 2 manquantes\nF : valide\ncontrats valides : 2/4"
          }
    ],
    solution: "[Exemple]\nvente : valide\nlocation : nullite : 1 manquantes\ncontrats valides : 1/2\n\n[Cas 1 — Un contrat parfait]\nA : valide\ncontrats valides : 1/1\n\n[Cas 2 — Deux manquantes]\nB : nullite : 2 manquantes\ncontrats valides : 0/1\n\n[Cas 3 — Quatre contrats]\nC : valide\nD : nullite : 1 manquantes\nE : nullite : 2 manquantes\nF : valide\ncontrats valides : 2/4\n"
  },
  {
    id: "dr-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Vices du consentement",
    goal: "Détecter les vices du consentement (erreur, dol, violence) et leurs effets sur le contrat.",
    brief: "<p>Pour chaque situation proposée : vice vaut <code>aucun</code>, <code>erreur</code>, <code>dol</code> (manœuvre frauduleuse), <code>violence</code> ou <code>lesion</code>. Tout vice sauf aucun entraîne la <code>relativement nullite</code> (nullité relative, action de la victime) ; la lésion n'est sanctionnée que dans les cas prévus par la loi : elle produit <code>lesion : selon la loi</code> sans annuler. Affichage : <code>contrat : verdict</code> où verdict vaut <code>consentement libre</code>, <code>relativement nullite</code> ou <code>selon la loi</code>. Bilan : <code>contrats touches : X/n</code> (nullités relatives + lésions).</p>",
    starter: "# Grille d'analyse (dr-c6-e2) — Vices du consentement\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Une erreur]\n# Données : X erreur\nA_COMPLETER\n\n[Cas 2 — Que du libre]\n# Données : Y aucun\n# Données : Z aucun\nA_COMPLETER\n\n[Cas 3 — Cinq contrats]\n# Données : A erreur\n# Données : B aucun\n# Données : C dol\n# Données : D lesion\n# Données : E violence\nA_COMPLETER\n",
    hints: [
          "Trois verdicts : aucun → libre ; erreur/dol/violence → nullité relative ; lesion → selon la loi.",
          "Comptez ensemble les nullités relatives et les lésions."
    ],
    examples: [
          {
                "stdin": "4\nA aucun\nB dol\nC lesion\nD violence\n",
                "expected": "A : consentement libre\nB : relativement nullite\nC : selon la loi\nD : relativement nullite\ncontrats touches : 3/4"
          }
    ],
    tests: [
          {
                "label": "Une erreur",
                "stdin": "cas:1",
                "expected": "X : relativement nullite\ncontrats touches : 1/1"
          },
          {
                "label": "Que du libre",
                "stdin": "cas:2",
                "expected": "Y : consentement libre\nZ : consentement libre\ncontrats touches : 0/2"
          },
          {
                "label": "Cinq contrats",
                "stdin": "cas:3",
                "expected": "A : relativement nullite\nB : consentement libre\nC : relativement nullite\nD : selon la loi\nE : relativement nullite\ncontrats touches : 4/5"
          }
    ],
    solution: "[Exemple]\nA : consentement libre\nB : relativement nullite\nC : selon la loi\nD : relativement nullite\ncontrats touches : 3/4\n\n[Cas 1 — Une erreur]\nX : relativement nullite\ncontrats touches : 1/1\n\n[Cas 2 — Que du libre]\nY : consentement libre\nZ : consentement libre\ncontrats touches : 0/2\n\n[Cas 3 — Cinq contrats]\nA : relativement nullite\nB : consentement libre\nC : relativement nullite\nD : selon la loi\nE : relativement nullite\ncontrats touches : 4/5\n"
  },
  {
    id: "dr-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "La responsabilité contractuelle",
    goal: "Statuer sur des litiges : inexécution contractuelle, force majeure, ou responsabilité délictuelle.",
    brief: "<p>L’analyse porte sur d'abord <code>seuil</code> (montant du dommage au-delà duquel des dommages-intérêts sont dus, entier). Puis il lit <strong>n lignes</strong> « litige montant cause » : cause vaut <code>contractuel</code>, <code>forcemajeure</code> ou <code>delictuel</code>. Verdicts : forcemajeure → <code>dispense</code> (le débiteur est libéré) ; contractuel → <code>dommages</code> si montant ≥ seuil, sinon <code>exequatur</code> (exécution forcée) ; delictuel → <code>dommages</code> toujours (responsabilité délictuelle, pas de seuil). Affichage : <code>litige : verdict</code>. Bilan : <code>condamnations : X/n</code> et <code>total alloue : M</code> (somme des montants des condamnations).</p>",
    starter: "# Grille d'analyse (dr-c6-e3) — La responsabilité contractuelle\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Un seul litige]\n# Données : 1\n# Données : X 2000 delictuel\nA_COMPLETER\n\n[Cas 2 — Que des dispenses]\n# Données : 2\n# Données : Y 500 forcemajeure\n# Données : Z 9000 forcemajeure\nA_COMPLETER\n\n[Cas 3 — Cinq litiges]\n# Données : 5\n# Données : A 5000 contractuel\n# Données : B 3000 contractuel\n# Données : C 6000 forcemajeure\n# Données : D 2000 delictuel\n# Données : E 4000 contractuel\nA_COMPLETER\n",
    hints: [
          "Trois causes, quatre verdicts : forcemajeure → dispense ; contractuel → dommages ou exequatur selon le seuil ; delictuel → dommages.",
          "Le total ne cumule que les condamnations à dommages-intérêts."
    ],
    examples: [
          {
                "stdin": "5000\n4\nA 7000 contractuel\nB 3000 contractuel\nC 9000 forcemajeure\nD 4000 delictuel\n",
                "expected": "A : dommages\nB : exequatur\nC : dispense\nD : dommages\ncondamnations : 2/4\ntotal alloue : 11000"
          }
    ],
    tests: [
          {
                "label": "Un seul litige",
                "stdin": "cas:1",
                "expected": "X : dommages\ncondamnations : 1/1\ntotal alloue : 2000"
          },
          {
                "label": "Que des dispenses",
                "stdin": "cas:2",
                "expected": "Y : dispense\nZ : dispense\ncondamnations : 0/2\ntotal alloue : 0"
          },
          {
                "label": "Cinq litiges",
                "stdin": "cas:3",
                "expected": "A : dommages\nB : exequatur\nC : dispense\nD : dommages\nE : dommages\ncondamnations : 3/5\ntotal alloue : 11000"
          }
    ],
    solution: "[Exemple]\nA : dommages\nB : exequatur\nC : dispense\nD : dommages\ncondamnations : 2/4\ntotal alloue : 11000\n\n[Cas 1 — Un seul litige]\nX : dommages\ncondamnations : 1/1\ntotal alloue : 2000\n\n[Cas 2 — Que des dispenses]\nY : dispense\nZ : dispense\ncondamnations : 0/2\ntotal alloue : 0\n\n[Cas 3 — Cinq litiges]\nA : dommages\nB : exequatur\nC : dispense\nD : dommages\nE : dommages\ncondamnations : 3/5\ntotal alloue : 11000\n"
  }
];
