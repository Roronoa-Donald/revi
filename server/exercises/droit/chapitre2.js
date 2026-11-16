/**
 * chapitre2.js — Études de cas du cours « droit ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "dr2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le formulaire d'inscription du site Kiféco",
    "exampleTitle": "Exemple résolu — le formulaire de la plateforme LivraisonRapide",
    "goal": "Repérer les données personnelles d'un formulaire réel et distinguer identification directe et indirecte.",
    "brief": "<p><strong>Énoncé.</strong> Kiféco, boutique en ligne de kits solaires établie à Lomé, fait remplir à ses clients un formulaire d'inscription de huit champs :</p><table><tr><th>N°</th><th>Champ</th></tr><tr><th>1</th><td>Nom du client</td></tr><tr><th>2</th><td>Prénom du client</td></tr><tr><th>3</th><td>Numéro de téléphone</td></tr><tr><th>4</th><td>Adresse de livraison</td></tr><tr><th>5</th><td>Courriel personnel</td></tr><tr><th>6</th><td>Numéro de client attribué par Kiféco</td></tr><tr><th>7</th><td>Raison sociale de l'entreprise (commandes professionnelles)</td></tr><tr><th>8</th><td>Courriel générique de l'entreprise (contact@)</td></tr></table><p>Rappel du cours : une donnée personnelle est toute information relative à une personne physique identifiée ou identifiable ; l'identification peut être directe (nom) ou indirecte (numéro, adresse). Les coordonnées d'une entreprise, rattachant une personne morale, ne sont pas en principe des données personnelles.</p><p>Répondez par le nombre seul pour la question 1 ; par le mot exact attendu pour les autres questions.</p><ol><li>Combien de ces huit champs recueillent-ils une donnée personnelle ?</li><li>L'identification par le nom et le prénom est-elle directe ou indirecte ?</li><li>Le numéro de téléphone, sans le nom, permet-il d'identifier une personne ?</li><li>Le courriel générique de l'entreprise (contact@) est-il une donnée personnelle ?</li><li>Quelle donnée de ce formulaire permet une identification indirecte : le numéro de client ou la raison sociale ?</li></ol>",
    "starter": "# Exercice — Le formulaire d'inscription du site Kiféco\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nombre seul. Autres questions : le mot exact attendu.\n\n[Question 1 — Champs recueillant une donnée personnelle]\nA_COMPLETER\n\n[Question 2 — Identification par le nom et le prénom]\nA_COMPLETER\n\n[Question 3 — Le téléphone sans le nom]\nA_COMPLETER\n\n[Question 4 — Le courriel générique de l'entreprise]\nA_COMPLETER\n\n[Question 5 — Identification indirecte]\nA_COMPLETER\n",
    "hints": [
      "Une donnée personnelle rattache une personne physique : dès qu'un champ désigne un être humain identifié ou identifiable, il en est une ; les coordonnées d'une société n'y suffisent pas.",
      "L'identification est directe quand le champ nomme la personne ; elle est indirecte quand il faut recouper ou interroger un fichier pour remonter jusqu'à elle.",
      "1. Parcourez les huit champs et écartez ceux qui désignent la société. 2. Le nom et le prénom désignent la personne. 3. Un numéro suffit à joindre une personne identifiée dans un fichier. 4. Un courriel générique de service rattache une personne morale. 5. Comparez le numéro de client et la raison sociale."
    ],
    "examples": [
      {
        "stdin": "La plateforme LivraisonRapide recueille cinq champs : nom, prénom, numéro de téléphone, courriel générique du service client (contact@), matricule interne du livreur.\n\n1) Données personnelles : nom, prénom, téléphone, matricule = 4.\n2) Nom et prénom : identification directe.\n3) Le téléphone sans le nom : oui, identification indirecte.\n4) Le courriel générique : non.\n5) L'identification indirecte : le matricule.",
        "expected": "4 données personnelles — identification directe par le nom — téléphone : oui — courriel générique : non — le matricule pour l'identification indirecte",
        "note": "Dès qu'un champ rattache une personne physique, même sans la nommer, il devient une donnée personnelle : c'est le critère de l'identifiabilité."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Champs recueillant une donnée personnelle",
        "stdin": "q:1",
        "expected": "6||six"
      },
      {
        "label": "Question 2 — Identification par le nom et le prénom",
        "stdin": "q:2",
        "expected": "directe||identification directe"
      },
      {
        "label": "Question 3 — Le téléphone sans le nom",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Le courriel générique de l'entreprise",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Identification indirecte",
        "stdin": "q:5",
        "expected": "le numéro de client||numéro de client||le numéro de client attribué par Kiféco"
      }
    ],
    "solution": "[Question 1 — Champs recueillant une donnée personnelle]\n6\n\n[Question 2 — Identification par le nom et le prénom]\ndirecte\n\n[Question 3 — Le téléphone sans le nom]\noui\n\n[Question 4 — Le courriel générique de l'entreprise]\nnon\n\n[Question 5 — Identification indirecte]\nle numéro de client",
    "takeaway": "1) Six champs recueillent une donnée personnelle : nom, prénom, téléphone, adresse de livraison, courriel personnel, numéro de client. La raison sociale et le courriel générique (contact@) rattachent une personne morale : ils ne sont pas, en principe, des données personnelles.\n2) Le nom et le prénom désignent la personne sans détour : identification directe.\n3) Oui : un numéro de téléphone permet de joindre, donc d'identifier, une personne physique, même sans connaître son nom — c'est le chapitre 2 du cours (identification indirecte).\n4) Non : le courriel générique de service rattache l'entreprise, personne morale.\n5) Le numéro de client attribué par Kiféco identifie la personne par recoupement dans le fichier : c'est lui qui permet l'identification indirecte, pas la raison sociale.\nContrôle : 6 + 2 = 8 champs ; les deux écartés (7 et 8) sont les seuls à ne désigner aucune personne physique."
  },
  {
    "id": "dr2-c2-e2",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "La fiche d'adhésion du club Athlé Santé",
    "exampleTitle": "Exemple résolu — le questionnaire de la mutuelle Solidarité",
    "goal": "Isoler les données sensibles d'une fiche réelle et rappeler la formalité exigée pour leur traitement.",
    "brief": "<p><strong>Énoncé.</strong> Le club de remise en forme Athlé Santé, ouvert à Lomé, fait remplir à chaque nouvel adhérent une fiche de dix champs :</p><table><tr><th>N°</th><th>Champ</th></tr><tr><th>1</th><td>Nom</td></tr><tr><th>2</th><td>Prénom</td></tr><tr><th>3</th><td>Courriel</td></tr><tr><th>4</th><td>Adresse</td></tr><tr><th>5</th><td>Tension artérielle relevée au premier cours</td></tr><tr><th>6</th><td>Régime alimentaire demandé au snack, motif religieux</td></tr><tr><th>7</th><td>Appartenance à un syndicat (réduction « adhérents syndiqués »)</td></tr><tr><th>8</th><td>Traitement médical en cours, noté par l'entraîneur</td></tr><tr><th>9</th><td>Origine ethnique renseignée « pour des statistiques d'audience »</td></tr><tr><th>10</th><td>Créneau horaire préféré</td></tr></table><p>Rappel du cours : les données sensibles touchent l'origine, les opinions (religieuses, syndicales, politiques), la santé et la vie sexuelle ; leur traitement exige le <strong>consentement exprès</strong> et un encadrement strict.</p><p>Répondez par le nombre seul pour la question 1 ; par le mot exact attendu pour les autres questions.</p><ol><li>Combien de champs portent-ils sur des données sensibles ?</li><li>La tension artérielle relève de quelle catégorie de données sensibles ?</li><li>L'appartenance syndicale est-elle une donnée sensible ?</li><li>Le courriel est-il une donnée sensible ?</li><li>Quelle formalité renforcée le traitement de ces données exige-t-il ?</li></ol>",
    "starter": "# Exercice — La fiche d'adhésion du club Athlé Santé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : le nombre seul. Autres questions : le mot exact attendu.\n\n[Question 1 — Champs portant sur des données sensibles]\nA_COMPLETER\n\n[Question 2 — Catégorie de la tension artérielle]\nA_COMPLETER\n\n[Question 3 — L'appartenance syndicale]\nA_COMPLETER\n\n[Question 4 — Le courriel]\nA_COMPLETER\n\n[Question 5 — Formalité renforcée exigée]\nA_COMPLETER\n",
    "hints": [
      "Les données sensibles touchent l'intimité de la personne : origine, opinions, santé, vie sexuelle. Un simple moyen de contact n'en est pas une.",
      "Comptez les champs qui révèlent l'état de santé, une conviction ou une origine ; ne retenez pas les coordonnées de contact.",
      "1. Passez les dix champs en revue et retenez ceux de l'intimité. 2. La tension est une donnée du corps. 3. Une opinion est sensible même si elle est déclarée volontairement. 4. Un courriel est une donnée personnelle, pas intime. 5. Relisez la formalité attachée aux données sensibles dans le rappel du cours."
    ],
    "examples": [
      {
        "stdin": "La mutuelle Solidarité collecte : nom, courriel, état de santé déclaré, opinions politiques d'un adhérent élu, régime alimentaire prescrit pour raisons de santé.\n\n1) Données sensibles : état de santé, opinions politiques, régime prescrit (santé) = 3.\n2) L'état de santé : catégorie santé.\n3) Les opinions politiques : oui, sensibles.\n4) Le courriel : non (personnelle, mais pas intime).\n5) Formalité : le consentement exprès.",
        "expected": "3 champs sensibles — catégorie santé — opinions politiques : oui — courriel : non — consentement exprès",
        "note": "Une donnée personnelle n'est pas forcément sensible : le courriel identifie, la santé ou l'opinion révèlent l'intimité — c'est cette révélation qui exige le consentement exprès."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Champs portant sur des données sensibles",
        "stdin": "q:1",
        "expected": "5||cinq"
      },
      {
        "label": "Question 2 — Catégorie de la tension artérielle",
        "stdin": "q:2",
        "expected": "la santé||santé||données de santé||les données de santé"
      },
      {
        "label": "Question 3 — L'appartenance syndicale",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Le courriel",
        "stdin": "q:4",
        "expected": "non"
      },
      {
        "label": "Question 5 — Formalité renforcée exigée",
        "stdin": "q:5",
        "expected": "consentement exprès||le consentement exprès"
      }
    ],
    "solution": "[Question 1 — Champs portant sur des données sensibles]\n5\n\n[Question 2 — Catégorie de la tension artérielle]\nla santé\n\n[Question 3 — L'appartenance syndicale]\noui\n\n[Question 4 — Le courriel]\nnon\n\n[Question 5 — Formalité renforcée exigée]\nconsentement exprès",
    "takeaway": "1) Cinq champs portent sur des données sensibles : la tension artérielle (santé), le régime alimentaire religieux (opinions religieuses), l'appartenance syndicale (opinions syndicales), le traitement médical (santé), l'origine ethnique.\n2) La tension artérielle relève de la catégorie santé.\n3) Oui : l'appartenance syndicale est une opinion, donc une donnée sensible, même déclarée pour une réduction.\n4) Non : le courriel est une donnée personnelle, mais il ne révèle rien d'intime.\n5) Le traitement de ces données exige le consentement exprès et un encadrement strict.\nContrôle : 5 sensibles + 5 non sensibles (nom, prénom, courriel, adresse, créneau) = 10 champs."
  },
  {
    "id": "dr2-c2-e3",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Le fichier clients de l'imprimeure Mosaïque",
    "exampleTitle": "Exemple résolu — le fichier du garage AutoPropre",
    "goal": "Nommer chaque opération constitutive d'un traitement au fil de la vie d'un fichier réel.",
    "brief": "<p><strong>Énoncé.</strong> Mosaïque, imprimerie de Kara, gère son fichier clients de la façon suivante : Léa, la gérante, <strong>réceptionne les bons de commande papier au comptoir</strong> ; elle les <strong>saisit dans le logiciel de gestion</strong> ; elle <strong>classe les fiches par quartier de livraison</strong> ; elle <strong>archive les fiches pendant trois ans</strong> ; elle <strong>corrige les adresses quand un client déménage</strong> ; chaque samedi, elle <strong>transmet la liste des livraisons à la société de transport partenaire</strong> ; au bout de trois ans, elle <strong>broie les papiers</strong>.</p><p>Rappel du cours : un traitement est toute opération portant sur des données personnelles — collecte et enregistrement, organisation et conservation, adaptation et modification, utilisation et cession. Dès la première opération, le régime de protection s'applique.</p><p>Répondez par le mot exact attendu, en deux mots au plus (par exemple « collecte »).</p><ol><li>La réception des bons au comptoir correspond à quelle opération ?</li><li>La saisie dans le logiciel correspond à quelle opération ?</li><li>La transmission hebdomadaire au transporteur correspond à quelle opération ?</li><li>L'archivage pendant trois ans correspond à quelle opération ?</li><li>Dès la première opération (la réception des bons), le régime de protection s'applique-t-il ?</li></ol>",
    "starter": "# Exercice — Le fichier clients de l'imprimeure Mosaïque\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le mot exact de la liste du cours, en deux mots au plus.\n\n[Question 1 — Réception des bons au comptoir]\nA_COMPLETER\n\n[Question 2 — Saisie dans le logiciel]\nA_COMPLETER\n\n[Question 3 — Transmission au transporteur]\nA_COMPLETER\n\n[Question 4 — Archivage pendant trois ans]\nA_COMPLETER\n\n[Question 5 — Régime applicable dès la première opération]\nA_COMPLETER\n",
    "hints": [
      "Le traitement est le cycle de vie de la donnée : collecter, ranger, garder, transformer, transmettre — chaque étape a son nom dans le cours.",
      "Chaque geste de Léa correspond à un terme de la liste : réceptionner, saisir, transmettre, archiver.",
      "1. La réception des papiers est le premier geste du cycle. 2. La saisie inscrit la donnée dans un fichier. 3. La transmission fait sortir la donnée vers un tiers. 4. L'archivage maintient la donnée dans le temps. 5. Relisez la dernière phrase du rappel."
    ],
    "examples": [
      {
        "stdin": "Le garage AutoPropre gère son fichier : réception des fiches au comptoir, saisie dans le logiciel, tri des fiches par marque de véhicule, garde des fiches deux ans, envoi des plaques au loueur partenaire.\n\n1) Comptoir : collecte.\n2) Logiciel : enregistrement.\n3) Envoi au loueur : cession.\n4) Garde deux ans : conservation.\n5) Dès la collecte : oui, le régime s'applique.",
        "expected": "collecte — enregistrement — cession — conservation — régime applicable dès la collecte",
        "note": "Collecter, ranger, garder, transmettre : chaque étape du parcours d'une donnée est un traitement ; dès la première opération, le régime de protection s'applique."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Réception des bons au comptoir",
        "stdin": "q:1",
        "expected": "collecte||la collecte"
      },
      {
        "label": "Question 2 — Saisie dans le logiciel",
        "stdin": "q:2",
        "expected": "enregistrement||l'enregistrement"
      },
      {
        "label": "Question 3 — Transmission au transporteur",
        "stdin": "q:3",
        "expected": "cession||la cession||utilisation et cession"
      },
      {
        "label": "Question 4 — Archivage pendant trois ans",
        "stdin": "q:4",
        "expected": "conservation||la conservation"
      },
      {
        "label": "Question 5 — Régime applicable dès la première opération",
        "stdin": "q:5",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Réception des bons au comptoir]\ncollecte\n\n[Question 2 — Saisie dans le logiciel]\nenregistrement\n\n[Question 3 — Transmission au transporteur]\ncession\n\n[Question 4 — Archivage pendant trois ans]\nconservation\n\n[Question 5 — Régime applicable dès la première opération]\noui",
    "takeaway": "1) Réceptionner les bons au comptoir, c'est la collecte : la donnée entre dans le fichier.\n2) La saisie dans le logiciel est l'enregistrement.\n3) Transmettre la liste au transporteur est une cession : la donnée sort vers un tiers.\n4) Archiver trois ans est la conservation.\n5) Oui : dès la première opération (la collecte au comptoir), le régime de protection s'applique — le broyage, fin de cycle, n'y fait pas exception.\nContrôle : les quatre opérations nommées (collecte, enregistrement, cession, conservation) figurent toutes dans la liste du cours, avec l'organisation (tri par quartier) et l'adaptation (correction des adresses)."
  }
];
