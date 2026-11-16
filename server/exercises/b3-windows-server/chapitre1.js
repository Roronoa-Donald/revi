'use strict';

module.exports = [
  {
    "id": "ws3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "L'étendue DHCP du nouveau siège de Verdier SA",
    "exampleTitle": "Exemple résolu — l'étendue DHCP de la filiale de Nantes",
    "goal": "Dimensionner une étendue DHCP : plage d'attribution, exclusions, réservations et bail.",
    "brief": "<p><strong>Énoncé.</strong> Verdier SA, distributeur de pièces détachées installé à Lyon, ouvre un nouveau siège de 120 salariés. La responsable informatique, Amina, déploie un serveur DHCP Windows Server sur le réseau des postes de travail <strong>10.10.70.0/24</strong> (domaine verdier.local). Elle configure l'étendue suivante :</p><ul><li>plage d'attribution : de <strong>10.10.70.60</strong> à <strong>10.10.70.180</strong>, bornes incluses ;</li><li>exclusion : <strong>10.10.70.60</strong> à <strong>10.10.70.79</strong>, vingt adresses réservées aux imprimantes réseau et au pare-feu ;</li><li>réservations DHCP : la borne Wi-Fi du rez-de-chaussée à <strong>10.10.70.90</strong> et le multifonction du deuxième étage à <strong>10.10.70.91</strong> ;</li><li>bail : <strong>8 jours</strong>.</li></ul><p>Rappel : les adresses couvertes par l'exclusion et les réservations ne sont jamais attribuées dynamiquement. Répondez par le nombre seul, sans unité, sauf pour la question 5 qui appelle une adresse IP.</p><ol><li>Combien d'adresses l'étendue couvre-t-elle avant toute exclusion ?</li><li>Combien d'adresses l'exclusion retire-t-elle du pool dynamique ?</li><li>Combien d'adresses les réservations retirent-elles en plus du pool dynamique ?</li><li>Combien d'adresses le serveur peut-il attribuer dynamiquement aux postes ?</li><li>Quelle est la première adresse qu'un poste peut réellement obtenir ?</li><li>Combien de jours au maximum un poste conserve-t-il son adresse sans renouveler son bail ?</li></ol>",
    "starter": "# Exercice — L'étendue DHCP du nouveau siège de Verdier SA\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 et 6 : le nombre seul. Question 5 : l'adresse IP complète.\n\n[Question 1 — Taille de l'étendue avant exclusion]\nA_COMPLETER\n\n[Question 2 — Adresses retirées par l'exclusion]\nA_COMPLETER\n\n[Question 3 — Adresses retirées par les réservations]\nA_COMPLETER\n\n[Question 4 — Adresses attribuables dynamiquement]\nA_COMPLETER\n\n[Question 5 — Première adresse attribuable]\nA_COMPLETER\n\n[Question 6 — Durée du bail en jours]\nA_COMPLETER\n",
    "hints": [
      "La plage d'attribution est inclusive aux deux bornes : le nombre d'adresses vaut (dernière − première) + 1.",
      "Retirez de l'étendue les adresses de l'exclusion, puis celles des réservations : ce qui reste forme le pool dynamique.",
      "Pour la question 5, parcourez la plage à partir de 10.10.70.60 : la première adresse hors exclusion et hors réservation est 10.10.70.80 ; le bail se lit dans la configuration de l'étendue."
    ],
    "examples": [
      {
        "stdin": "La filiale de Nantes ouvre son réseau sur 172.24.5.0/24. Étendue : 172.24.5.100 à 172.24.5.200.\nExclusion : 172.24.5.100 à 172.24.5.119 (visioconférence et afficheurs). Réservation : 172.24.5.150 (régisseur des salles). Bail : 4 jours.\n\n1) Étendue : 200 − 100 + 1 = 101 adresses.\n2) Exclusion : 119 − 100 + 1 = 20 adresses.\n3) Réservations : 1 adresse.\n4) Pool dynamique : 101 − 20 − 1 = 80 adresses.\n5) Première adresse attribuable : 172.24.5.120 (l'exclusion s'arrête à .119, la réservation porte sur .150).\n6) Bail : 4 jours.",
        "expected": "101 — 20 — 1 — 80 — première adresse 172.24.5.120 — bail 4 jours",
        "note": "Le pool dynamique se calcule en trois retranchements successifs : exclusions, puis réservations ; le bail n'influence pas la taille du pool."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Taille de l'étendue avant exclusion",
        "stdin": "q:1",
        "expected": "121||121 adresses"
      },
      {
        "label": "Question 2 — Adresses retirées par l'exclusion",
        "stdin": "q:2",
        "expected": "20||20 adresses"
      },
      {
        "label": "Question 3 — Adresses retirées par les réservations",
        "stdin": "q:3",
        "expected": "2||2 adresses"
      },
      {
        "label": "Question 4 — Adresses attribuables dynamiquement",
        "stdin": "q:4",
        "expected": "99||99 adresses"
      },
      {
        "label": "Question 5 — Première adresse attribuable",
        "stdin": "q:5",
        "expected": "10.10.70.80"
      },
      {
        "label": "Question 6 — Durée du bail en jours",
        "stdin": "q:6",
        "expected": "8||8 jours"
      }
    ],
    "solution": "[Question 1 — Taille de l'étendue avant exclusion]\n121\n\n[Question 2 — Adresses retirées par l'exclusion]\n20\n\n[Question 3 — Adresses retirées par les réservations]\n2\n\n[Question 4 — Adresses attribuables dynamiquement]\n99\n\n[Question 5 — Première adresse attribuable]\n10.10.70.80\n\n[Question 6 — Durée du bail en jours]\n8",
    "takeaway": "1) Étendue : 180 − 60 + 1 = 121 adresses.\n2) Exclusion : 79 − 60 + 1 = 20 adresses retirées du pool.\n3) Réservations : 2 adresses (borne Wi-Fi et multifonction), prises sur la plage dynamique.\n4) Pool dynamique : 121 − 20 − 2 = 99 adresses.\n5) L'exclusion s'arrête à 10.10.70.79 ; les réservations portent sur .90 et .91 : la première adresse attribuable est 10.10.70.80.\n6) Le bail est de 8 jours : un poste conserve son adresse au maximum 8 jours sans renouvellement.\nContrôle : 99 + 20 + 2 = 121, on retrouve la taille de l'étendue ; 99 + 2 = 101, la première adresse attribuable est bien .80, suivie de .81."
  },
  {
    "id": "ws3-c1-e2",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "La zone DNS du domaine verdier.local",
    "exampleTitle": "Exemple résolu — la zone DNS de fil-nord.fr",
    "goal": "Lire une zone DNS : enregistrements A, CNAME et MX, et repérer un alias orphelin.",
    "brief": "<p><strong>Énoncé.</strong> Le domaine <strong>verdier.local</strong> est hébergé sur le DNS intégré à Active Directory. Amina exporte la zone et obtient les enregistrements suivants :</p><table><tr><th>Nom</th><th>Type</th><th>Cible / donnée</th></tr><tr><th>srv-web.verdier.local</th><td>A</td><td>10.10.70.20</td></tr><tr><th>www.verdier.local</th><td>CNAME</td><td>srv-web.verdier.local</td></tr><tr><th>intranet.verdier.local</th><td>CNAME</td><td>srv-web.verdier.local</td></tr><tr><th>mx.verdier.local</th><td>A</td><td>10.10.70.25</td></tr><tr><th>verdier.local</th><td>MX (préférence 10)</td><td>mx.verdier.local</td></tr><tr><th>ftp.verdier.local</th><td>CNAME</td><td>ancien-srv.verdier.local</td></tr></table><p>L'enregistrement A de ancien-srv.verdier.local a été supprimé le mois dernier : le serveur de fichiers historique a été retiré du service. Répondez de façon courte ; la question 1 appelle une adresse IP.</p><ol><li>À quelle adresse IP www.verdier.local se résout-il ?</li><li>Quel type d'enregistrement associe www.verdier.local à srv-web.verdier.local ?</li><li>Quel est le serveur de messagerie du domaine verdier.local ?</li><li>Quelle est la valeur de préférence de l'enregistrement MX ?</li><li>La résolution du nom ftp.verdier.local aboutit-elle ?</li><li>Que doit faire Amina pour assainir la zone ?</li></ol>",
    "starter": "# Exercice — La zone DNS du domaine verdier.local\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Question 1 : l'adresse IP. Questions 2 à 6 : réponses courtes.\n\n[Question 1 — Adresse IP de www.verdier.local]\nA_COMPLETER\n\n[Question 2 — Type d'enregistrement www vers srv-web]\nA_COMPLETER\n\n[Question 3 — Serveur de messagerie du domaine]\nA_COMPLETER\n\n[Question 4 — Préférence de l'enregistrement MX]\nA_COMPLETER\n\n[Question 5 — ftp.verdier.local se résout-il ?]\nA_COMPLETER\n\n[Question 6 — Action d'assainissement]\nA_COMPLETER\n",
    "hints": [
      "Un CNAME est un alias : la résolution suit la chaîne CNAME puis l'enregistrement A de la cible.",
      "L'enregistrement MX désigne le serveur qui reçoit le courrier du domaine, avec une valeur de préférence (plus elle est faible, plus le serveur est prioritaire).",
      "Pour la question 5, cherchez l'enregistrement A de ancien-srv.verdier.local : un CNAME dont la cible n'existe plus ne se résout pas ; il faut alors nettoyer la zone."
    ],
    "examples": [
      {
        "stdin": "La zone de fil-nord.fr contient :\nweb01.fil-nord.fr A 172.24.5.10 ; boutique.fil-nord.fr CNAME web01.fil-nord.fr ;\nmail01.fil-nord.fr A 172.24.5.15 ; fil-nord.fr MX (préférence 20) mail01.fil-nord.fr ;\nvpn.fil-nord.fr CNAME routeur-retire.fil-nord.fr (l'enregistrement A de la cible a été supprimé).\n\n1) boutique.fil-nord.fr se résout en 172.24.5.10 (CNAME vers web01).\n2) Type : CNAME.\n3) Serveur de messagerie : mail01.fil-nord.fr.\n4) Préférence MX : 20.\n5) vpn.fil-nord.fr ne se résout pas (cible sans enregistrement A).\n6) Action : supprimer l'enregistrement vpn.",
        "expected": "boutique fil-nord.fr 172.24.5.10 — CNAME — mail01.fil-nord.fr — préférence 20 — vpn ne se résout pas — supprimer l'enregistrement vpn",
        "note": "Un alias ne vaut que par sa cible : dès que l'enregistrement A de la cible disparaît, l'alias devient orphelin et la résolution échoue."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Adresse IP de www.verdier.local",
        "stdin": "q:1",
        "expected": "10.10.70.20"
      },
      {
        "label": "Question 2 — Type d'enregistrement www vers srv-web",
        "stdin": "q:2",
        "expected": "CNAME||un CNAME||alias||un alias"
      },
      {
        "label": "Question 3 — Serveur de messagerie du domaine",
        "stdin": "q:3",
        "expected": "mx.verdier.local||mx.verdier.local.||le serveur mx.verdier.local"
      },
      {
        "label": "Question 4 — Préférence de l'enregistrement MX",
        "stdin": "q:4",
        "expected": "10||préférence 10"
      },
      {
        "label": "Question 5 — ftp.verdier.local se résout-il ?",
        "stdin": "q:5",
        "expected": "Non||non||elle échoue"
      },
      {
        "label": "Question 6 — Action d'assainissement",
        "stdin": "q:6",
        "expected": "supprimer l'enregistrement ftp||supprimer le CNAME ftp||supprimer le CNAME obsolète||supprimer l'enregistrement ftp.verdier.local"
      }
    ],
    "solution": "[Question 1 — Adresse IP de www.verdier.local]\n10.10.70.20\n\n[Question 2 — Type d'enregistrement www vers srv-web]\nCNAME\n\n[Question 3 — Serveur de messagerie du domaine]\nmx.verdier.local\n\n[Question 4 — Préférence de l'enregistrement MX]\n10\n\n[Question 5 — ftp.verdier.local se résout-il ?]\nNon\n\n[Question 6 — Action d'assainissement]\nsupprimer l'enregistrement ftp",
    "takeaway": "1) www.verdier.local est un CNAME vers srv-web.verdier.local, qui porte l'enregistrement A 10.10.70.20 : la résolution donne 10.10.70.20.\n2) Le type est CNAME : un alias pointant vers un nom existant.\n3) Le courrier du domaine est remis à mx.verdier.local (enregistrement MX de la racine).\n4) La préférence MX vaut 10.\n5) Non : ftp.verdier.local est un CNAME vers ancien-srv.verdier.local, dont l'enregistrement A a été supprimé ; l'alias est orphelin, la résolution échoue.\n6) Amina doit supprimer l'enregistrement ftp (le CNAME obsolète) pour assainir la zone.\nContrôle : intranet.verdier.local, alias de la même cible, se résout encore en 10.10.70.20 ; seul ftp est orphelin."
  },
  {
    "id": "ws3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Le dimensionnement des licences de l'hôte HYP-01",
    "exampleTitle": "Exemple résolu — les licences du serveur EDGE-02",
    "goal": "Appliquer le modèle de licences par cœur de Windows Server et arbitrer entre éditions Standard et Datacenter.",
    "brief": "<p><strong>Énoncé.</strong> Verdier SA consolide ses serveurs sur un hôte Hyper-V, <strong>HYP-01</strong>, équipé de <strong>2 sockets de 10 cœurs</strong> chacun. Amina doit choisir l'édition de Windows Server pour l'hôte, selon les règles du cours :</p><ul><li>minimum <strong>8 cœurs par socket</strong> et <strong>16 cœurs par serveur</strong> à licencier ;</li><li>licences vendues par <strong>packs de 2 cœurs</strong> : <strong>Standard</strong> à 120 € le pack, chaque passage complet de licence de l'hôte couvre <strong>2 VM</strong> ;</li><li><strong>Datacenter</strong> à 750 € le pack : un seul passage complet de l'hôte couvre un nombre <strong>illimité</strong> de VM.</li></ul><p>Rappel : pour V machines virtuelles en édition Standard, le nombre de passages vaut ceil(V / 2). Répondez par le nombre seul en euros (par exemple 4800), sauf les questions 5 et 6 qui appellent une édition.</p><ol><li>Combien de cœurs physiques doivent être licenciés sur HYP-01 ?</li><li>Combien de packs de 2 cœurs faut-il pour couvrir l'hôte ?</li><li>Quel est le coût de la licence Datacenter de l'hôte ?</li><li>Quel est le coût de la licence Standard si l'hôte doit héberger 8 VM ?</li><li>Quelle édition retenir pour 8 VM ?</li><li>Quelle édition retenir pour 16 VM ?</li></ol>",
    "starter": "# Exercice — Le dimensionnement des licences de l'hôte HYP-01\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 4 : le nombre seul. Questions 5 et 6 : Standard ou Datacenter.\n\n[Question 1 — Cœurs à licencier]\nA_COMPLETER\n\n[Question 2 — Packs de 2 cœurs]\nA_COMPLETER\n\n[Question 3 — Coût Datacenter (en €)]\nA_COMPLETER\n\n[Question 4 — Coût Standard pour 8 VM (en €)]\nA_COMPLETER\n\n[Question 5 — Édition recommandée pour 8 VM]\nA_COMPLETER\n\n[Question 6 — Édition recommandée pour 16 VM]\nA_COMPLETER\n",
    "hints": [
      "Vérifiez d'abord les deux minimums : 10 cœurs par socket dépasse 8, et 20 cœurs au total dépasse 16 ; les cœurs réels suffisent donc.",
      "Un passage de licence Standard couvre 2 VM : pour 8 VM, il faut ceil(8/2) = 4 passages ; pour 16 VM, 8 passages.",
      "Comparez toujours le coût Standard total (packs de base × passages × 120 €) au coût Datacenter (packs de base × 750 €, unique)."
    ],
    "examples": [
      {
        "stdin": "Le serveur EDGE-02 comporte 1 socket de 6 cœurs et hébergera 4 VM.\n\n1) Par socket : max(8, 6) = 8 cœurs ; au total 8 < 16, donc 16 cœurs à licencier.\n2) Packs : 16 / 2 = 8 packs.\n3) Datacenter : 8 × 750 = 6000 €.\n4) Standard pour 4 VM : 2 passages, soit 8 × 2 × 120 = 1920 €.\n5) Pour 4 VM : Standard (1920 < 6000).\n6) Pour 16 VM : 8 passages, 8 × 8 × 120 = 7680 € > 6000 €, donc Datacenter.",
        "expected": "16 cœurs — 8 packs — Datacenter 6000 € — Standard 1920 € pour 4 VM — Standard pour 4 VM — Datacenter pour 16 VM",
        "note": "Les minimums 8 et 16 se vérifient avant tout calcul : un petit serveur paie au moins 16 cœurs, soit 8 packs."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Cœurs à licencier",
        "stdin": "q:1",
        "expected": "20||20 cœurs"
      },
      {
        "label": "Question 2 — Packs de 2 cœurs",
        "stdin": "q:2",
        "expected": "10||10 packs"
      },
      {
        "label": "Question 3 — Coût Datacenter (en €)",
        "stdin": "q:3",
        "expected": "7500||7500 €||7500€"
      },
      {
        "label": "Question 4 — Coût Standard pour 8 VM (en €)",
        "stdin": "q:4",
        "expected": "4800||4800 €||4800€"
      },
      {
        "label": "Question 5 — Édition recommandée pour 8 VM",
        "stdin": "q:5",
        "expected": "Standard||l'édition Standard||édition Standard"
      },
      {
        "label": "Question 6 — Édition recommandée pour 16 VM",
        "stdin": "q:6",
        "expected": "Datacenter||l'édition Datacenter||édition Datacenter"
      }
    ],
    "solution": "[Question 1 — Cœurs à licencier]\n20\n\n[Question 2 — Packs de 2 cœurs]\n10\n\n[Question 3 — Coût Datacenter (en €)]\n7500\n\n[Question 4 — Coût Standard pour 8 VM (en €)]\n4800\n\n[Question 5 — Édition recommandée pour 8 VM]\nStandard\n\n[Question 6 — Édition recommandée pour 16 VM]\nDatacenter",
    "takeaway": "1) 2 sockets × 10 cœurs = 20 cœurs ; chaque socket dépasse 8 cœurs et le total dépasse 16 : on licencie 20 cœurs.\n2) Packs de base : 20 / 2 = 10 packs.\n3) Datacenter : 10 × 750 = 7500 € (VM illimitées).\n4) Standard pour 8 VM : ceil(8/2) = 4 passages, soit 10 × 4 × 120 = 4800 €.\n5) Pour 8 VM : 4800 € < 7500 €, on retient Standard.\n6) Pour 16 VM : ceil(16/2) = 8 passages, soit 10 × 8 × 120 = 9600 € > 7500 € : on retient Datacenter.\nContrôle : le seuil de bascule se situe à 13 VM (6 passages coûtent 7200 €, 7 passages 8400 €)."
  }
];
