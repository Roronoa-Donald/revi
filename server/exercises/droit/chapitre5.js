/**
 * chapitre5.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "dr2-c5-e1",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le licenciement de M. Kodjo chez NovaData",
    "exampleTitle": "Exemple résolu — le licenciement de M. Diallo, technicien",
    "goal": "Qualifier une faute grave, en chiffrer les conséquences sur le préavis et les indemnités.",
    "brief": "<p><strong>Énoncé.</strong> M. Kodjo est cadre commercial chez NovaData, éditeur de logiciels, depuis <strong>six ans</strong> ; son salaire brut mensuel est de <strong>2 400 €</strong>. Le <strong>3 mars 2025</strong>, il copie sur une clé USB personnelle le fichier de <strong>12 000 clients</strong> — autant de données personnelles — pour rejoindre un concurrent. Le journal des accès révèle l'exfiltration le <strong>10 mars</strong> ; le licenciement est notifié le <strong>28 mars 2025</strong>.</p><p>Rappels donnés par la convention collective et le droit du travail : le préavis du cadre est de <strong>deux mois</strong> ; en cas de <strong>faute simple</strong>, le préavis est dû (exécuté ou indemnisé) et l'indemnité légale de licenciement vaut <strong>un quart du salaire mensuel par année d'ancienneté</strong> ; en cas de <strong>faute grave</strong>, la rupture est immédiate : ni préavis, ni indemnité de licenciement.</p><p>Rappel du cours : les opérations constitutives d'un traitement comprennent l'utilisation et la cession de données.</p><p>Répondez par le nombre seul, sans unité ni symbole (par exemple 4800), sauf pour les questions 1 et 6 qui appellent un mot.</p><ol><li>Le fait de copier le fichier pour un concurrent constitue-t-il une faute simple ou une faute grave ?</li><li>Combien de mois de préavis M. Kodjo peut-il exécuter ?</li><li>Si le préavis était dû, sa rémunération se monterait à combien, en euros ?</li><li>Quelle indemnité de licenciement M. Kodjo aurait-il perçue en cas de faute simple, en euros ?</li><li>Quelle indemnité de licenciement perçoit-il in fine, en euros ?</li><li>En copiant le fichier vers un tiers, quelle opération constitutive d'un traitement a-t-il réalisée ?</li></ol>",
    "starter": "# Exercice — Le licenciement de M. Kodjo chez NovaData\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions chiffrées : le nombre seul, sans unité ni symbole.\n\n[Question 1 — Qualification de la faute]\nA_COMPLETER\n\n[Question 2 — Mois de préavis exécutables]\nA_COMPLETER\n\n[Question 3 — Rémunération du préavis si elle était due (en €)]\nA_COMPLETER\n\n[Question 4 — Indemnité de licenciement en cas de faute simple (en €)]\nA_COMPLETER\n\n[Question 5 — Indemnité de licenciement perçue (en €)]\nA_COMPLETER\n\n[Question 6 — Opération réalisée en copiant vers un tiers]\nA_COMPLETER\n",
    "hints": [
      "La faute grave rend impossible le maintien du salarié dans l'entreprise : un détournement de fichier clients au profit d'un concurrent la caractérise.",
      "Comparez les deux colonnes : en faute simple, préavis indemnisé et indemnité légale ; en faute grave, l'un et l'autre disparaissent — c'est ce que le chiffrage met en évidence.",
      "1. Qualifiez le détournement. 2. En faute grave, la rupture est immédiate. 3. Deux mois × 2 400. 4. Un quart du salaire mensuel (600 €) × six années. 5. Relisez l'effet de la faute grave. 6. Faire sortir les données vers un tiers porte le nom d'une opération du cours."
    ],
    "examples": [
      {
        "stdin": "M. Diallo, technicien depuis 4 ans (salaire 2 000 €), copie la base de 5 000 prospects pour un concurrent. La convention collective prévoit un préavis d'un mois ; l'indemnité légale vaut un quart du salaire mensuel par année d'ancienneté.\n\n1) Qualification : faute grave.\n2) Préavis exécutable : 0 mois.\n3) Rémunération du préavis si due : 1 × 2 000 = 2 000 €.\n4) Indemnité en cas de faute simple : 4 × 500 = 2 000 €.\n5) Indemnité perçue in fine : 0 €.\n6) Opération réalisée : la cession des données.",
        "expected": "faute grave — 0 mois de préavis — préavis de 2 000 € — indemnité hypothétique de 2 000 € — perçue : 0 € — cession",
        "note": "La faute grave efface préavis et indemnités : la comparaison chiffrée avec la faute simple montre ce que le manquement coûte au salarié."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Qualification de la faute",
        "stdin": "q:1",
        "expected": "faute grave||une faute grave||la faute grave"
      },
      {
        "label": "Question 2 — Mois de préavis exécutables",
        "stdin": "q:2",
        "expected": "0||aucun||aucun mois"
      },
      {
        "label": "Question 3 — Rémunération du préavis si elle était due (en €)",
        "stdin": "q:3",
        "expected": "4800||4 800||4800 €||4 800 €"
      },
      {
        "label": "Question 4 — Indemnité de licenciement en cas de faute simple (en €)",
        "stdin": "q:4",
        "expected": "3600||3 600||3600 €||3 600 €"
      },
      {
        "label": "Question 5 — Indemnité de licenciement perçue (en €)",
        "stdin": "q:5",
        "expected": "0||aucune||0 €"
      },
      {
        "label": "Question 6 — Opération réalisée en copiant vers un tiers",
        "stdin": "q:6",
        "expected": "cession||la cession||cession des données||la cession des données"
      }
    ],
    "solution": "[Question 1 — Qualification de la faute]\nfaute grave\n\n[Question 2 — Mois de préavis exécutables]\n0\n\n[Question 3 — Rémunération du préavis si elle était due (en €)]\n4800\n\n[Question 4 — Indemnité de licenciement en cas de faute simple (en €)]\n3600\n\n[Question 5 — Indemnité de licenciement perçue (en €)]\n0\n\n[Question 6 — Opération réalisée en copiant vers un tiers]\ncession",
    "takeaway": "1) Détourner le fichier clients au profit d'un concurrent rend tout maintien impossible : c'est une faute grave.\n2) En cas de faute grave, la rupture est immédiate : 0 mois de préavis.\n3) Le préavis de deux mois vaudrait 2 × 2 400 = 4 800 €.\n4) En cas de faute simple, l'indemnité légale vaudrait un quart du salaire mensuel par année d'ancienneté : 600 € × 6 = 3 600 €.\n5) La faute grave supprime l'indemnité de licenciement : il perçoit 0 €.\n6) Copier le fichier pour le transmettre à un tiers est une cession de données.\nContrôle : la faute grave fait perdre au salarié 4 800 € de préavis et 3 600 € d'indemnité, soit 8 400 € par rapport à la faute simple."
  },
  {
    "id": "dr2-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "L'amende de la société VegaData",
    "exampleTitle": "Exemple résolu — l'amende de la société Ovale",
    "goal": "Calculer l'amende encourue (20 millions d'euros ou 4 % du chiffre d'affaires) et le seuil où les deux plafonds coïncident.",
    "brief": "<p><strong>Énoncé.</strong> VegaData, éditeur de logiciels européen, réalise un chiffre d'affaires mondial de <strong>750 000 000 €</strong>. Une faille de sécurité a exposé les données de <strong>2 millions d'utilisateurs</strong> ; l'autorité de contrôle décide de sanctionner au maximum. Par ailleurs, l'inscription au forum exige la date de naissance, sans aucune utilité, et la politique de confidentialité ne dit rien des durées de conservation.</p><p>Rappel du cours : une entreprise non conforme risque une amende pouvant atteindre <strong>20 millions d'euros</strong> ou <strong>4 % du chiffre d'affaires mondial</strong> ; la plus lourde des deux sanctions est retenue.</p><p>Répondez par le nombre seul, sans unité ni symbole (par exemple 30000000), sauf pour la question 5 qui appelle un mot.</p><ol><li>À combien s'élèvent 4 % du chiffre d'affaires, en euros ?</li><li>Quelle amende l'autorité retiendra-t-elle, en euros ?</li><li>Pour quel chiffre d'affaires, en euros, les deux plafonds coïncident-ils ?</li><li>Si le chiffre d'affaires était de 400 000 000 €, quelle amende serait retenue, en euros ?</li><li>Exiger la date de naissance pour un forum va à l'encontre de quel principe ?</li></ol>",
    "starter": "# Exercice — L'amende de la société VegaData\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul, sans unité ni symbole. Question 5 : un mot.\n\n[Question 1 — 4 % du chiffre d'affaires (en €)]\nA_COMPLETER\n\n[Question 2 — Amende retenue (en €)]\nA_COMPLETER\n\n[Question 3 — Chiffre d'affaires où les plafonds coïncident (en €)]\nA_COMPLETER\n\n[Question 4 — Amende avec un CA de 400 000 000 € (en €)]\nA_COMPLETER\n\n[Question 5 — Principe bafoué par la collecte de la date de naissance]\nA_COMPLETER\n",
    "hints": [
      "La sanction est un plafond, pas un forfait : l'autorité retient le plus lourd des deux montants, 20 millions d'euros ou 4 % du chiffre d'affaires mondial.",
      "Les deux plafonds coïncident quand 4 % du chiffre d'affaires valent exactement 20 millions d'euros : divisez 20 millions par 4 %.",
      "1. Multipliez 750 000 000 par 4 %. 2. Comparez le résultat à 20 millions. 3. Cherchez le chiffre d'affaires X tel que X × 4 % = 20 000 000. 4. Calculez 4 % de 400 000 000 puis comparez. 5. Demander une donnée sans utilité contredit le principe qui limite la collecte au nécessaire."
    ],
    "examples": [
      {
        "stdin": "La société Ovale, éditrice européenne, réalise 900 000 000 € de chiffre d'affaires mondial ; l'autorité sanctionne au maximum.\n\n1) 4 % du CA : 900 000 000 × 4 % = 36 000 000 €.\n2) Amende retenue : 36 000 000 € (supérieure à 20 M€).\n3) Seuil de coïncidence : 20 000 000 / 4 % = 500 000 000 €.\n4) Avec 300 000 000 € de CA : 4 % = 12 000 000 €, inférieur à 20 000 000 € ; retenue : 20 000 000 €.\n5) Collecter la pointure pour un forum : minimisation bafouée.",
        "expected": "4 % = 36 000 000 € — retenue : 36 000 000 € — seuil : 500 000 000 € — à 300 M€ de CA : 20 000 000 € — pointure inutile : minimisation",
        "note": "La plus lourde des deux sanctions est retenue : en dessous de 500 000 000 € de chiffre d'affaires, le plafond de 20 millions d'euros l'emporte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — 4 % du chiffre d'affaires (en €)",
        "stdin": "q:1",
        "expected": "30000000||30 000 000||30 millions||30 millions d'euros"
      },
      {
        "label": "Question 2 — Amende retenue (en €)",
        "stdin": "q:2",
        "expected": "30000000||30 000 000||30 millions||30 millions d'euros"
      },
      {
        "label": "Question 3 — Chiffre d'affaires où les plafonds coïncident (en €)",
        "stdin": "q:3",
        "expected": "500000000||500 000 000||500 millions"
      },
      {
        "label": "Question 4 — Amende avec un CA de 400 000 000 € (en €)",
        "stdin": "q:4",
        "expected": "20000000||20 000 000||20 millions||20 millions d'euros"
      },
      {
        "label": "Question 5 — Principe bafoué par la collecte de la date de naissance",
        "stdin": "q:5",
        "expected": "minimisation||la minimisation"
      }
    ],
    "solution": "[Question 1 — 4 % du chiffre d'affaires (en €)]\n30000000\n\n[Question 2 — Amende retenue (en €)]\n30000000\n\n[Question 3 — Chiffre d'affaires où les plafonds coïncident (en €)]\n500000000\n\n[Question 4 — Amende avec un CA de 400 000 000 € (en €)]\n20000000\n\n[Question 5 — Principe bafoué par la collecte de la date de naissance]\nminimisation",
    "takeaway": "1) 4 % de 750 000 000 = 30 000 000 €.\n2) 30 millions dépassent le plafond de 20 millions : l'amende retenue est 30 000 000 €.\n3) Les deux plafonds coïncident quand 4 % du chiffre d'affaires valent 20 000 000 €, soit un chiffre d'affaires de 500 000 000 €.\n4) Avec 400 000 000 € de chiffre d'affaires, 4 % ne valent que 16 000 000 € : le plafond de 20 000 000 € l'emporte.\n5) Exiger une donnée sans utilité — la date de naissance pour un forum — bafoue la minimisation.\nContrôle : à 750 M€, 30 M€ > 20 M€ ; à 400 M€, 16 M€ < 20 M€ ; à 500 M€, les deux valent 20 M€."
  },
  {
    "id": "dr2-c5-e3",
    "chapter": 5,
    "level": "n1",
    "language": "analyse",
    "title": "Les demandes de Mme Tchandana",
    "exampleTitle": "Exemple résolu — les demandes M. Bakary",
    "goal": "Exercer les droits d'accès, de rectification et de suppression et connaître le délai de réponse.",
    "brief": "<p><strong>Énoncé.</strong> Le <strong>4 avril 2025</strong>, Mme Tchandana écrit au service client de la librairie en ligne Kolibrier : son nom y est mal orthographié depuis son inscription. Elle demande dans le même courriel : (a) une copie de toutes les données la concernant ; (b) la correction de l'orthographe de son nom ; (c) la suppression de son compte client, qu'elle n'utilise plus.</p><p>Rappel du cours : le RGPD garantit le droit d'accès, le droit de rectification et le droit de suppression ; la réponse doit intervenir dans un délai d'un mois. La transparence impose de dire clairement ce que l'on fera des données.</p><p>Répondez par le mot exact attendu, en trois mots au plus.</p><ol><li>Demander une copie de ses données exerce quel droit ?</li><li>Demander la correction de l'orthographe exerce quel droit ?</li><li>Demander la suppression du compte exerce quel droit ?</li><li>Dans quel délai la librairie doit-elle répondre ?</li><li>Si la librairie dit clairement ce qu'elle fera des données, quel principe applique-t-elle ?</li></ol>",
    "starter": "# Exercice — Les demandes de Mme Tchandana\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot exact attendu, en trois mots au plus.\n\n[Question 1 — Demander une copie de ses données]\nA_COMPLETER\n\n[Question 2 — Corriger l'orthographe de son nom]\nA_COMPLETER\n\n[Question 3 — Supprimer son compte client]\nA_COMPLETER\n\n[Question 4 — Délai de réponse]\nA_COMPLETER\n\n[Question 5 — Dire ce que l'on fera des données]\nA_COMPLETER\n",
    "hints": [
      "Les droits des personnes sont la clef du règlement : consulter, corriger, faire disparaître — chaque demande de Mme Tchandana en exerce un.",
      "Le délai de réponse n'est pas laissé au bon vouloir du service client : le règlement le fixe, sanction comprise.",
      "1. Une copie des données relève du premier droit. 2. Corriger une erreur relève du deuxième. 3. Faire disparaître un compte relève du troisième. 4. Relisez la durée donnée dans le rappel. 5. Dire clairement l'usage des données est le principe qui fonde la confiance."
    ],
    "examples": [
      {
        "stdin": "M. Bakary écrit à un site de billetterie : il demande une copie de ses données, la modification de son adresse, puis la suppression de son compte.\n\n1) Copie : droit d'accès.\n2) Modification : droit de rectification.\n3) Suppression : droit de suppression (effacement).\n4) Délai de réponse : un mois.\n5) Dire ce que le site fait des données : transparence.",
        "expected": "accès — rectification — suppression — délai d'un mois — transparence",
        "note": "Les droits des personnes sont le cœur du règlement : accès, rectification, suppression, avec une réponse sous un mois."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Demander une copie de ses données",
        "stdin": "q:1",
        "expected": "droit d'accès||le droit d'accès||accès||l'accès"
      },
      {
        "label": "Question 2 — Corriger l'orthographe de son nom",
        "stdin": "q:2",
        "expected": "droit de rectification||le droit de rectification||rectification"
      },
      {
        "label": "Question 3 — Supprimer son compte client",
        "stdin": "q:3",
        "expected": "droit de suppression||le droit de suppression||droit à l'effacement||le droit à l'effacement||suppression||l'effacement"
      },
      {
        "label": "Question 4 — Délai de réponse",
        "stdin": "q:4",
        "expected": "1 mois||un mois||1"
      },
      {
        "label": "Question 5 — Dire ce que l'on fera des données",
        "stdin": "q:5",
        "expected": "transparence||la transparence"
      }
    ],
    "solution": "[Question 1 — Demander une copie de ses données]\ndroit d'accès\n\n[Question 2 — Corriger l'orthographe de son nom]\ndroit de rectification\n\n[Question 3 — Supprimer son compte client]\ndroit de suppression\n\n[Question 4 — Délai de réponse]\n1 mois\n\n[Question 5 — Dire ce que l'on fera des données]\ntransparence",
    "takeaway": "1) Demander une copie de ses données exerce le droit d'accès.\n2) Demander la correction de l'orthographe exerce le droit de rectification.\n3) Demander la suppression du compte exerce le droit de suppression (effacement).\n4) La librairie doit répondre dans un délai d'un mois.\n5) Dire clairement ce que l'on fera des données, c'est appliquer la transparence.\nContrôle : les trois demandes du courriel du 4 avril couvrent les trois droits du rappel — aucune n'en exige deux."
  }
];
