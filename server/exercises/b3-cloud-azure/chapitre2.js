'use strict';

module.exports = [
  {
    "id": "az3-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Les affectations RBAC de Delcourt Logistique",
    "exampleTitle": "Exemple résolu — les affectations RBAC du cabinet Sorgia",
    "goal": "Lire un tableau d'affectations RBAC (rôle, étendue) et raisonner sur l'héritage des permissions.",
    "brief": "<p><strong>Énoncé.</strong> Delcourt Logistique, PME de transport de 90 salariés, vient de déployer son environnement Azure. L'administratrice cloud dresse la liste des affectations de rôles RBAC :</p><table><tr><th>Utilisateur</th><th>Rôle</th><th>Étendue</th></tr><tr><th>Amélie (administratrice cloud)</th><td>Propriétaire</td><td>abonnement sub-prod-01</td></tr><tr><th>Karim (développeur)</th><td>Contributeur</td><td>groupe de ressources rg-web-prod-frc-01</td></tr><tr><th>Sofia (contrôleuse de gestion)</th><td>Lecteur</td><td>abonnement sub-prod-01</td></tr><tr><th>Lucas (stagiaire)</th><td>Lecteur</td><td>groupe de ressources rg-web-prod-frc-01</td></tr></table><p>Rappel du cours : une affectation RBAC accorde un rôle à une identité sur une étendue (abonnement, groupe de ressources ou ressource) ; les permissions descendent dans la hiérarchie, du haut vers le bas.</p><ol><li>Combien d'affectations de rôles le tableau comporte-t-il ?</li><li>Quel rôle permet de créer et de modifier des ressources, mais pas de gérer les accès des autres utilisateurs ?</li><li>Le rôle Lecteur de Sofia, attribué sur l'abonnement, s'applique-t-il aussi au groupe de ressources rg-web-prod-frc-01 ?</li><li>Qui, dans ce tableau, peut attribuer des rôles aux autres utilisateurs sur l'abonnement sub-prod-01 ?</li><li>Le rôle Contributeur de Karim s'applique-t-il aux ressources contenues dans rg-web-prod-frc-01 ?</li></ol>",
    "starter": "# Exercice — Les affectations RBAC de Delcourt Logistique\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le nom du rôle. Questions 3 et 5 : oui ou non.\n\n[Question 1 — Nombre d'affectations de rôles]\nA_COMPLETER\n\n[Question 2 — Rôle permettant de créer et modifier sans gérer les accès]\nA_COMPLETER\n\n[Question 3 — Le Lecteur de Sofia s'applique-t-il au groupe de ressources]\nA_COMPLETER\n\n[Question 4 — Qui peut attribuer des rôles sur l'abonnement]\nA_COMPLETER\n\n[Question 5 — Le Contributeur de Karim s'applique-t-il aux ressources du groupe]\nA_COMPLETER\n",
    "hints": [
      "Chaque ligne du tableau correspond à une affectation : une identité, un rôle, une étendue.",
      "Hiérarchie des rôles du cours : Lecteur (consulter), Contributeur (créer et modifier), Propriétaire (tout, y compris la gestion des accès).",
      "1. Comptez les lignes. 2. Cherchez le rôle « sans gestion des accès ». 3. Suivez le sens de l'héritage, du haut vers le bas. 4. Cherchez le rôle qui inclut la gestion des accès au niveau de l'abonnement. 5. Une ressource appartient à son groupe de ressources."
    ],
    "examples": [
      {
        "stdin": "Le cabinet Sorgia liste ses affectations RBAC :\n- Nadia, Propriétaire, sur le groupe de ressources rg-crm-prod-frc-01 ;\n- Paul, Contributeur, sur l'abonnement sub-cabinet-01 ;\n- Inès, Lecteur, sur le groupe de ressources rg-crm-prod-frc-01.\n\n1) Le tableau comporte 3 affectations.\n2) Le rôle Contributeur permet de créer et modifier sans gérer les accès.\n3) Paul, Contributeur sur l'abonnement, peut agir sur rg-crm-prod-frc-01 par héritage.\n4) Seule Nadia, Propriétaire, peut gérer les accès sur son étendue.",
        "expected": "3 affectations — Contributeur pour créer et modifier — héritage de l'abonnement vers le groupe de ressources — le Propriétaire gère les accès",
        "note": "Les permissions RBAC descendent de l'abonnement vers les groupes de ressources puis les ressources : une étendue large couvre automatiquement les étendues inférieures."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'affectations de rôles",
        "stdin": "q:1",
        "expected": "4||quatre"
      },
      {
        "label": "Question 2 — Rôle permettant de créer et modifier sans gérer les accès",
        "stdin": "q:2",
        "expected": "contributeur||contributor"
      },
      {
        "label": "Question 3 — Le Lecteur de Sofia s'applique-t-il au groupe de ressources",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Qui peut attribuer des rôles sur l'abonnement",
        "stdin": "q:4",
        "expected": "amélie||amelie||amélie (propriétaire)||le propriétaire||propriétaire"
      },
      {
        "label": "Question 5 — Le Contributeur de Karim s'applique-t-il aux ressources du groupe",
        "stdin": "q:5",
        "expected": "oui"
      }
    ],
    "solution": "[Question 1 — Nombre d'affectations de rôles]\n4\n\n[Question 2 — Rôle permettant de créer et modifier sans gérer les accès]\ncontributeur\n\n[Question 3 — Le Lecteur de Sofia s'applique-t-il au groupe de ressources]\noui\n\n[Question 4 — Qui peut attribuer des rôles sur l'abonnement]\namélie\n\n[Question 5 — Le Contributeur de Karim s'applique-t-il aux ressources du groupe]\noui",
    "takeaway": "1) Le tableau comporte 4 affectations : Amélie, Karim, Sofia et Lucas.\n2) Le rôle Contributeur permet de créer et de modifier des ressources, mais pas d'attribuer des rôles : la gestion des accès appartient au Propriétaire.\n3) Oui : le rôle attribué sur l'abonnement descend par héritage vers tous les groupes de ressources qu'il contient, dont rg-web-prod-frc-01.\n4) Amélie : son rôle Propriétaire sur l'abonnement inclut la gestion des accès (attribution de rôles).\n5) Oui : les permissions du groupe de ressources s'appliquent aux ressources qu'il contient.\nContrôle : sur une même étendue, l'ordre des rôles du plus puissant au moins puissant est Propriétaire > Contributeur > Lecteur."
  },
  {
    "id": "az3-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "L'audit Azure Policy de Brume Diffusion",
    "exampleTitle": "Exemple résolu — l'audit Azure Policy du serrurier Voltige",
    "goal": "Évaluer la conformité de ressources face à des stratégies Azure Policy (effets Refuser et Audit) et choisir l'étendue d'application.",
    "brief": "<p><strong>Énoncé.</strong> Brume Diffusion, PME de distribution de produits d'entretien, applique deux stratégies Azure Policy à son abonnement :</p><ul><li><strong>Stratégie « emplacements autorisés » (effet Refuser)</strong> : toute nouvelle ressource doit être déployée dans francecentral ou northeurope ; tout déploiement hors de ces régions est refusé ;</li><li><strong>Stratégie « balise propriétaire obligatoire » (effet Audit)</strong> : tout groupe de ressources doit porter une balise (tag) <code>propriétaire</code> ; les groupes sans balise sont signalés comme non conformes, sans être bloqués.</li></ul><p>L'audit du jour dresse l'état suivant :</p><table><tr><th>Ressource</th><th>Région</th><th>Observation</th></tr><tr><th>rg-compta-prod-frc-01</th><td>francecentral</td><td>balise propriétaire : oui</td></tr><tr><th>rg-marketing-prod-frc-01</th><td>francecentral</td><td>balise propriétaire : non</td></tr><tr><th>vm-facturation-01</th><td>francecentral</td><td>—</td></tr><tr><th>st-archives-01 (compte de stockage)</th><td>uksouth</td><td>créé avant la stratégie</td></tr></table><ol><li>Combien de ressources du tableau sont non conformes à la stratégie « emplacements autorisés » ?</li><li>Un développeur tente de créer une machine virtuelle dans uksouth : que fait la stratégie d'effet Refuser ?</li><li>La stratégie « balise propriétaire » (effet Audit) bloque-t-elle la création d'un groupe de ressources sans balise ?</li><li>Combien de groupes de ressources sont signalés comme non conformes à la stratégie de balise ?</li><li>Sur quelle étendue faut-il affecter une stratégie pour qu'elle s'applique à plusieurs abonnements à la fois ?</li></ol>",
    "starter": "# Exercice — L'audit Azure Policy de Brume Diffusion\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 3 et 5 : répondez de façon courte.\n\n[Question 1 — Ressources non conformes à la stratégie d'emplacements]\nA_COMPLETER\n\n[Question 2 — Action de la stratégie d'effet Refuser sur un déploiement dans uksouth]\nA_COMPLETER\n\n[Question 3 — La stratégie d'effet Audit bloque-t-elle la création]\nA_COMPLETER\n\n[Question 4 — Groupes de ressources signalés sans balise]\nA_COMPLETER\n\n[Question 5 — Étendue pour appliquer une stratégie à plusieurs abonnements]\nA_COMPLETER\n",
    "hints": [
      "Pour chaque ressource, vérifiez d'abord la région (stratégie d'emplacements), puis la balise (stratégie de balisage) : ce sont deux contrôles indépendants.",
      "Effet Refuser : le déploiement est rejeté. Effet Audit : la ressource existe mais est signalée non conforme.",
      "1. Comptez les ressources hors de francecentral et northeurope. 2. Appliquez l'effet Refuser. 3. Relisez ce que fait l'effet Audit. 4. Comptez les groupes de ressources sans balise. 5. Cherchez l'étendue située au-dessus des abonnements."
    ],
    "examples": [
      {
        "stdin": "Le serrurier Voltige applique une stratégie « emplacements autorisés » (effet Refuser,\nfrancecentral uniquement) et une stratégie « balise service obligatoire » (effet Audit).\nAudit : rg-atelier-frc-01 (francecentral, balise absente), rg-boutique-frc-01\n(francecentral, balise présente), st-voltige-01 (westeurope, créé avant la stratégie).\n\n1) 1 ressource est hors région autorisée : st-voltige-01.\n2) Un déploiement dans westeurope serait refusé (effet Refuser).\n3) La stratégie de balise (Audit) signale sans bloquer.\n4) 1 groupe de ressources est signalé sans balise : rg-atelier-frc-01.\n5) Pour viser plusieurs abonnements, on affecte la stratégie à un groupe de gestion.",
        "expected": "1 ressource hors région — déploiement refusé — Audit signale sans bloquer — 1 groupe signalé — étendue : le groupe de gestion",
        "note": "L'effet Refuser protège l'avenir en empêchant les déploiements non conformes ; l'effet Audit mesure l'existant sans l'empêcher."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Ressources non conformes à la stratégie d'emplacements",
        "stdin": "q:1",
        "expected": "1||une"
      },
      {
        "label": "Question 2 — Action de la stratégie d'effet Refuser sur un déploiement dans uksouth",
        "stdin": "q:2",
        "expected": "refusé||refuse||le déploiement est refusé||bloqué||bloque le déploiement||deny"
      },
      {
        "label": "Question 3 — La stratégie d'effet Audit bloque-t-elle la création",
        "stdin": "q:3",
        "expected": "non"
      },
      {
        "label": "Question 4 — Groupes de ressources signalés sans balise",
        "stdin": "q:4",
        "expected": "1||une"
      },
      {
        "label": "Question 5 — Étendue pour appliquer une stratégie à plusieurs abonnements",
        "stdin": "q:5",
        "expected": "le groupe de gestion||groupe de gestion||au groupe de gestion||management group||un groupe de gestion"
      }
    ],
    "solution": "[Question 1 — Ressources non conformes à la stratégie d'emplacements]\n1\n\n[Question 2 — Action de la stratégie d'effet Refuser sur un déploiement dans uksouth]\nrefusé\n\n[Question 3 — La stratégie d'effet Audit bloque-t-elle la création]\nnon\n\n[Question 4 — Groupes de ressources signalés sans balise]\n1\n\n[Question 5 — Étendue pour appliquer une stratégie à plusieurs abonnements]\nle groupe de gestion",
    "takeaway": "1) Une seule ressource est non conforme à la stratégie d'emplacements : st-archives-01, déployée dans uksouth.\n2) La stratégie d'effet Refuser rejette le déploiement : la machine virtuelle n'est pas créée.\n3) Non : l'effet Audit se contente de signaler le groupe de ressources comme non conforme ; il ne bloque rien.\n4) Un seul groupe de ressources est signalé : rg-marketing-prod-frc-01, dépourvu de balise propriétaire.\n5) Il faut affecter la stratégie à un groupe de gestion : cette étendue couvre plusieurs abonnements à la fois.\nContrôle : rg-compta-prod-frc-01 et vm-facturation-01 sont dans une région autorisée et ne violent aucune des deux stratégies."
  },
  {
    "id": "az3-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "L'expiration des secrets du coffre Fortis Finance",
    "exampleTitle": "Exemple résolu — l'audit du coffre de la mutuelle Prévia",
    "goal": "Suivre la date d'expiration des secrets d'un coffre Azure Key Vault, calculer les délais de rotation et identifier le rôle de lecture adapté.",
    "brief": "<p><strong>Énoncé.</strong> Fortis Finance, cabinet de conseil en gestion de patrimoine, stocke ses secrets d'application dans le coffre Azure Key Vault <code>kv-fortis-prod</code>. La politique interne impose de renouveler chaque secret avant sa date d'expiration. Voici l'état du coffre lors de l'audit du <strong>1er mai 2025</strong> :</p><table><tr><th>Secret</th><th>Date d'expiration</th></tr><tr><th>mot-de-passe-bdd</th><td>12 mars 2025</td></tr><tr><th>cle-api-banque</th><td>30 avril 2025</td></tr><tr><th>jeton-partenaires</th><td>15 juin 2025</td></tr><tr><th>certificat-signature</th><td>9 août 2025</td></tr></table><p>Rappels du cours : un secret expiré ne peut plus être lu par les applications ; le rôle RBAC « Utilisateur des secrets du coffre de clés » (Key Vault Secrets User) autorise la lecture des secrets sans autoriser leur modification. Le mois de mai compte 31 jours.</p><ol><li>Combien de secrets sont déjà expirés au 1er mai 2025 ?</li><li>Combien de jours reste-t-il avant l'expiration de jeton-partenaires ?</li><li>Quel est le prochain secret à renouveler parmi ceux encore valides ?</li><li>Une application tente de lire le secret mot-de-passe-bdd : que se passe-t-il ?</li><li>Quel rôle RBAC faut-il donner à une application pour qu'elle puisse lire les secrets sans les modifier ?</li></ol>",
    "starter": "# Exercice — L'expiration des secrets du coffre Fortis Finance\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 2 : le nombre de jours. Question 4 : répondez de façon courte.\n\n[Question 1 — Secrets déjà expirés au 1er mai 2025]\nA_COMPLETER\n\n[Question 2 — Jours restants avant l'expiration de jeton-partenaires]\nA_COMPLETER\n\n[Question 3 — Prochain secret à renouveler]\nA_COMPLETER\n\n[Question 4 — Lecture du secret mot-de-passe-bdd]\nA_COMPLETER\n\n[Question 5 — Rôle RBAC de lecture seule des secrets]\nA_COMPLETER\n",
    "hints": [
      "Classez les secrets en deux colonnes : ceux dont la date d'expiration est antérieure au 1er mai 2025 (expirés) et les autres.",
      "Pour le délai, comptez d'abord les jours restants en mai (du 1er au 31), puis ajoutez les jours de juin.",
      "1. Comparez chaque date au 1er mai. 2. Mai compte 31 jours. 3. Le prochain à renouveler est celui dont l'expiration est la plus proche de l'audit. 4. Rappelez-vous du comportement d'un secret expiré. 5. Le rôle de lecture porte le mot « secrets » dans son nom."
    ],
    "examples": [
      {
        "stdin": "La mutuelle Prévia audite son coffre kv-previa-prod le 1er mars 2025 :\n- secret-ldap : expiré le 8 février 2025 ;\n- cle-paiement : expire le 20 mars 2025 ;\n- jeton-api : expire le 30 avril 2025.\n\n1) 1 secret est déjà expiré : secret-ldap.\n2) Du 1er mars au 20 mars : 19 jours avant expiration de cle-paiement.\n3) Le prochain à renouveler est cle-paiement.\n4) Lire secret-ldap échoue : un secret expiré n'est plus lisible.\n5) Le rôle « Utilisateur des secrets du coffre de clés » autorise la lecture seule.",
        "expected": "1 secret expiré — 19 jours restants — prochain : cle-paiement — lecture refusée — rôle : Utilisateur des secrets du coffre de clés",
        "note": "L'expiration d'un secret est une protection : mieux vaut une application en échec qu'un secret périmé encore utilisé en production."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Secrets déjà expirés au 1er mai 2025",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Jours restants avant l'expiration de jeton-partenaires",
        "stdin": "q:2",
        "expected": "45||45 jours"
      },
      {
        "label": "Question 3 — Prochain secret à renouveler",
        "stdin": "q:3",
        "expected": "jeton-partenaires||jeton partenaires"
      },
      {
        "label": "Question 4 — Lecture du secret mot-de-passe-bdd",
        "stdin": "q:4",
        "expected": "la lecture échoue||la lecture est refusée||échec||echec||refusée||refusee||refusé||erreur"
      },
      {
        "label": "Question 5 — Rôle RBAC de lecture seule des secrets",
        "stdin": "q:5",
        "expected": "utilisateur des secrets du coffre de clés||key vault secrets user||utilisateur des secrets key vault||utilisateur de secrets du coffre de clés"
      }
    ],
    "solution": "[Question 1 — Secrets déjà expirés au 1er mai 2025]\n2\n\n[Question 2 — Jours restants avant l'expiration de jeton-partenaires]\n45\n\n[Question 3 — Prochain secret à renouveler]\njeton-partenaires\n\n[Question 4 — Lecture du secret mot-de-passe-bdd]\nla lecture échoue\n\n[Question 5 — Rôle RBAC de lecture seule des secrets]\nutilisateur des secrets du coffre de clés",
    "takeaway": "1) Deux secrets sont expirés : mot-de-passe-bdd (12 mars 2025) et cle-api-banque (30 avril 2025), deux dates antérieures au 1er mai 2025.\n2) Du 1er mai au 31 mai : 30 jours ; du 31 mai au 15 juin : 15 jours ; soit 45 jours avant l'expiration de jeton-partenaires.\n3) Parmi les secrets encore valides, jeton-partenaires (15 juin) expire avant certificat-signature (9 août) : c'est le prochain à renouveler.\n4) La lecture échoue : un secret expiré n'est plus retourné par le coffre ; l'application doit récupérer la version renouvelée.\n5) Le rôle « Utilisateur des secrets du coffre de clés » (Key Vault Secrets User) donne la lecture des secrets sans droit de modification.\nContrôle : au 1er mai, les quatre secrets se répartissent en 2 expirés, 1 secret encore valable 45 jours et 1 secret encore valable 100 jours (30 jours en mai + 30 en juin + 31 en juillet + 9 en août)."
  }
];
