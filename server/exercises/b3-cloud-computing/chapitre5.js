'use strict';

module.exports = [
  {
    "id": "cc3-c5-e1",
    "chapter": 5,
    "title": "Matrice du modèle de responsabilité partagée (Shared Responsibility)",
    "level": "n1",
    "language": "analyse",
    "goal": "Identifier sans ambiguïté qui, du client ou du fournisseur Cloud (CSP), assume la responsabilité d’un périmètre opérationnel et sécuritaire.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br>\nDomaines répertoriés :<br>\n- <code>CENTRE_DONNEES</code>, <code>MATERIEL_PHYSIQUE</code>, <code>HYPERVISEUR</code>, <code>PATCH_OS_HOTE</code> : toujours à la charge du <code>CSP</code> dans tous les modèles.<br>\n- <code>PATCH_OS_INVITE</code>, <code>FIREWALL_RESEAU</code> : à la charge du <code>CLIENT</code> en IaaS, mais infogérés par le <code>CSP</code> en PaaS et SaaS.<br>\n- <code>IAM_UTILISATEURS</code>, <code>DONNEES_CLIENT</code> : relèvent toujours impérativement du <code>CLIENT</code> quel que soit le modèle (la gouvernance des données et le contrôle des accès sont incessibles).<br><br>\nAfficher :<br>\n<code>RESPONSABILITE: modele=&lt;modele&gt; domaine=&lt;domaine&gt; -&gt; RESPONSABLE=&lt;CSP|CLIENT&gt;</code></p>",
    "starter": "# Grille d'analyse (cc3-c5-e1) — Matrice du modèle de responsabilité partagée (Shared Responsibility)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Sécurité physique du datacenter en IaaS]\n# Données : RESP_CHECK modele=IaaS domaine=CENTRE_DONNEES\nA_COMPLETER\n\n[Cas 2 — Règles de pare-feu réseau en IaaS]\n# Données : RESP_CHECK modele=IaaS domaine=FIREWALL_RESEAU\nA_COMPLETER\n\n[Cas 3 — Contrôle des accès utilisateurs en SaaS]\n# Données : RESP_CHECK modele=SaaS domaine=IAM_UTILISATEURS\nA_COMPLETER\n",
    "hints": [
      "En IaaS, le patch de l’OS invité (ex: Ubuntu ou Windows dans la VM) est 100% de la responsabilité du client.",
      "Les données du client et leurs droits d’accès restent toujours sous la responsabilité juridique et technique du client."
    ],
    "examples": [
      {
        "stdin": "RESP_CHECK modele=IaaS domaine=PATCH_OS_INVITE\nRESP_CHECK modele=PaaS domaine=PATCH_OS_INVITE\nRESP_CHECK modele=SaaS domaine=DONNEES_CLIENT",
        "expected": "RESPONSABILITE: modele=IaaS domaine=PATCH_OS_INVITE -> RESPONSABLE=CLIENT\nRESPONSABILITE: modele=PaaS domaine=PATCH_OS_INVITE -> RESPONSABLE=CSP\nRESPONSABILITE: modele=SaaS domaine=DONNEES_CLIENT -> RESPONSABLE=CLIENT",
        "note": "En IaaS vous patchez vous-même l’OS invité. En PaaS le fournisseur le fait. En SaaS vos données restent sous votre responsabilité."
      }
    ],
    "tests": [
      {
        "label": "Sécurité physique du datacenter en IaaS",
        "stdin": "cas:1",
        "expected": "RESPONSABILITE: modele=IaaS domaine=CENTRE_DONNEES -> RESPONSABLE=CSP"
      },
      {
        "label": "Règles de pare-feu réseau en IaaS",
        "stdin": "cas:2",
        "expected": "RESPONSABILITE: modele=IaaS domaine=FIREWALL_RESEAU -> RESPONSABLE=CLIENT"
      },
      {
        "label": "Contrôle des accès utilisateurs en SaaS",
        "stdin": "cas:3",
        "expected": "RESPONSABILITE: modele=SaaS domaine=IAM_UTILISATEURS -> RESPONSABLE=CLIENT"
      }
    ],
    "solution": "[Exemple]\nRESPONSABILITE: modele=IaaS domaine=PATCH_OS_INVITE -> RESPONSABLE=CLIENT\nRESPONSABILITE: modele=PaaS domaine=PATCH_OS_INVITE -> RESPONSABLE=CSP\nRESPONSABILITE: modele=SaaS domaine=DONNEES_CLIENT -> RESPONSABLE=CLIENT\n\n[Cas 1 — Sécurité physique du datacenter en IaaS]\nRESPONSABILITE: modele=IaaS domaine=CENTRE_DONNEES -> RESPONSABLE=CSP\n\n[Cas 2 — Règles de pare-feu réseau en IaaS]\nRESPONSABILITE: modele=IaaS domaine=FIREWALL_RESEAU -> RESPONSABLE=CLIENT\n\n[Cas 3 — Contrôle des accès utilisateurs en SaaS]\nRESPONSABILITE: modele=SaaS domaine=IAM_UTILISATEURS -> RESPONSABLE=CLIENT"
  },
  {
    "id": "cc3-c5-e2",
    "chapter": 5,
    "title": "Auditeur de posture de sécurité du stockage Cloud (CSPM)",
    "level": "n2",
    "language": "analyse",
    "goal": "Détecter les erreurs courantes de configuration sur un espace de stockage objet Cloud (S3, Blob) et évaluer son score de sécurité.",
    "brief": "<p>Analysez les paramètres du problème pour chaque cas.<br><br>\nÉvaluation du score (base de départ : 100 points) et alertes ordonnées :<br>\n1. Si <code>public_read == OUI</code> : déduire 50 points, alerte <code>ACCES_PUBLIC_OUVERT</code><br>\n2. Si <code>encryption == NONE</code> : déduire 25 points, alerte <code>CHIFFREMENT_ABSENT</code><br>\n3. Si <code>versioning == NON</code> : déduire 15 points, alerte <code>VERSIONING_DESACTIVE</code><br>\n4. Si <code>logging == NON</code> : déduire 10 points, alerte <code>LOGGING_DESACTIVE</code><br><br>\nScore plancher : $0$.<br>\nStatut de sécurité :<br>\n- Si $score == 100$ : <code>STATUT=CONFORME</code>, alertes = <code>AUCUNE</code><br>\n- Sinon si $score \\ge 50$ : <code>STATUT=VULNERABLE</code><br>\n- Sinon : <code>STATUT=CRITIQUE</code><br><br>\nAfficher :<br>\n<code>AUDIT_STORAGE: &lt;nom&gt; | SCORE=&lt;score&gt;/100 | STATUT=&lt;STATUT&gt; | ALERTES=&lt;ALERTES&gt;</code></p>",
    "starter": "# Grille d'analyse (cc3-c5-e2) — Auditeur de posture de sécurité du stockage Cloud (CSPM)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Seul le chiffrement est manquant]\n# Données : BUCKET nom=archive_db public_read=NON encryption=NONE versioning=OUI logging=OUI\nA_COMPLETER\n\n[Cas 2 — Accès public et pas de logging]\n# Données : BUCKET nom=web_assets public_read=OUI encryption=SSE_S3 versioning=OUI logging=NON\nA_COMPLETER\n\n[Cas 3 — Chiffrement avec SSE_S3 valide]\n# Données : BUCKET nom=docs_rh public_read=NON encryption=SSE_S3 versioning=OUI logging=OUI\nA_COMPLETER\n",
    "hints": [
      "L’exposition publique d’un bucket est la première cause de fuite de données dans le Cloud.",
      "Garder l'ordre exact des alertes séparées par une virgule."
    ],
    "examples": [
      {
        "stdin": "BUCKET nom=data_prod public_read=NON encryption=SSE_KMS versioning=OUI logging=OUI\nBUCKET nom=bucket_leak public_read=OUI encryption=NONE versioning=NON logging=NON\nBUCKET nom=backup_dev public_read=NON encryption=SSE_S3 versioning=NON logging=OUI",
        "expected": "AUDIT_STORAGE: data_prod | SCORE=100/100 | STATUT=CONFORME | ALERTES=AUCUNE\nAUDIT_STORAGE: bucket_leak | SCORE=0/100 | STATUT=CRITIQUE | ALERTES=ACCES_PUBLIC_OUVERT,CHIFFREMENT_ABSENT,VERSIONING_DESACTIVE,LOGGING_DESACTIVE\nAUDIT_STORAGE: backup_dev | SCORE=85/100 | STATUT=VULNERABLE | ALERTES=VERSIONING_DESACTIVE",
        "note": "Le bucket data_prod coche toutes les bonnes pratiques de sécurité et de conformité."
      }
    ],
    "tests": [
      {
        "label": "Seul le chiffrement est manquant",
        "stdin": "cas:1",
        "expected": "AUDIT_STORAGE: archive_db | SCORE=75/100 | STATUT=VULNERABLE | ALERTES=CHIFFREMENT_ABSENT"
      },
      {
        "label": "Accès public et pas de logging",
        "stdin": "cas:2",
        "expected": "AUDIT_STORAGE: web_assets | SCORE=40/100 | STATUT=CRITIQUE | ALERTES=ACCES_PUBLIC_OUVERT,LOGGING_DESACTIVE"
      },
      {
        "label": "Chiffrement avec SSE_S3 valide",
        "stdin": "cas:3",
        "expected": "AUDIT_STORAGE: docs_rh | SCORE=100/100 | STATUT=CONFORME | ALERTES=AUCUNE"
      }
    ],
    "solution": "[Exemple]\nAUDIT_STORAGE: data_prod | SCORE=100/100 | STATUT=CONFORME | ALERTES=AUCUNE\nAUDIT_STORAGE: bucket_leak | SCORE=0/100 | STATUT=CRITIQUE | ALERTES=ACCES_PUBLIC_OUVERT,CHIFFREMENT_ABSENT,VERSIONING_DESACTIVE,LOGGING_DESACTIVE\nAUDIT_STORAGE: backup_dev | SCORE=85/100 | STATUT=VULNERABLE | ALERTES=VERSIONING_DESACTIVE\n\n[Cas 1 — Seul le chiffrement est manquant]\nAUDIT_STORAGE: archive_db | SCORE=75/100 | STATUT=VULNERABLE | ALERTES=CHIFFREMENT_ABSENT\n\n[Cas 2 — Accès public et pas de logging]\nAUDIT_STORAGE: web_assets | SCORE=40/100 | STATUT=CRITIQUE | ALERTES=ACCES_PUBLIC_OUVERT,LOGGING_DESACTIVE\n\n[Cas 3 — Chiffrement avec SSE_S3 valide]\nAUDIT_STORAGE: docs_rh | SCORE=100/100 | STATUT=CONFORME | ALERTES=AUCUNE"
  },
  {
    "id": "cc3-c5-e3",
    "chapter": 5,
    "title": "Inventaire préalable : données et qualification",
    "level": "n3",
    "language": "analyse",
    "goal": "Repérer les informations à vérifier sans prononcer un verdict de conformité ou d’immunité juridique.",
    "brief": "<p>Cette grille est un inventaire fictif, pas un avis juridique : elle ne vérifie ni les contrats, ni les destinataires, ni l’existence d’une qualification. Pour chaque ligne <code>ANALYSE org=... transfert_hors_eee=OUI|NON|INCONNU qualification=SECNUMCLOUD|ISO27001|AUCUNE</code>, indiquez <code>TRANSFERT=A_ETUDIER</code> si un transfert hors EEE est déclaré, <code>NON_DECLARE</code> si aucun n’est déclaré, ou <code>INCONNU</code> si l’information manque. Indiquez <code>QUALIFICATION=DECLARATION_A_VERIFIER</code> si une qualification ou certification est déclarée, sinon <code>NON_DECLAREE</code>. Dans tous les cas, indiquez <code>CONFORMITE=NON_EVALUEE</code>.</p><p>La conformité dépend notamment des traitements, des transferts, de leurs garanties et de leurs autres conditions ; une origine, une localisation ou une étiquette ne suffisent pas. Vérifiez séparément le périmètre et la validité d’une qualification SecNumCloud déclarée. Elle n’établit pas une immunité générale aux lois étrangères. Format : <code>ANALYSE: &lt;org&gt; | TRANSFERT=&lt;statut&gt; | QUALIFICATION=&lt;statut&gt; | CONFORMITE=NON_EVALUEE</code>.</p>",
    "starter": "# Grille d’analyse (cc3-c5-e3) — Inventaire préalable\n\n[Cas 1 — Transfert déclaré et qualification à vérifier]\n# Données : ANALYSE org=banque transfert_hors_eee=OUI qualification=SECNUMCLOUD\nA_COMPLETER\n\n[Cas 2 — Transfert non déclaré et autre qualification]\n# Données : ANALYSE org=industrie transfert_hors_eee=NON qualification=ISO27001\nA_COMPLETER\n\n[Cas 3 — Informations incomplètes]\n# Données : ANALYSE org=association transfert_hors_eee=INCONNU qualification=AUCUNE\nA_COMPLETER\n",
    "hints": [
      "Une déclaration de qualification n’est pas la vérification de son périmètre ni de sa validité.",
      "Une localisation seule ne permet pas de conclure à la conformité RGPD ou à une immunité juridique."
    ],
    "examples": [
      {
        "stdin": "ANALYSE org=ecole transfert_hors_eee=OUI qualification=AUCUNE",
        "expected": "ANALYSE: ecole | TRANSFERT=A_ETUDIER | QUALIFICATION=NON_DECLAREE | CONFORMITE=NON_EVALUEE"
      }
    ],
    "tests": [
      {
        "label": "Transfert déclaré et qualification à vérifier",
        "stdin": "cas:1",
        "expected": "ANALYSE: banque | TRANSFERT=A_ETUDIER | QUALIFICATION=DECLARATION_A_VERIFIER | CONFORMITE=NON_EVALUEE"
      },
      {
        "label": "Transfert non déclaré et autre qualification",
        "stdin": "cas:2",
        "expected": "ANALYSE: industrie | TRANSFERT=NON_DECLARE | QUALIFICATION=DECLARATION_A_VERIFIER | CONFORMITE=NON_EVALUEE"
      },
      {
        "label": "Informations incomplètes",
        "stdin": "cas:3",
        "expected": "ANALYSE: association | TRANSFERT=INCONNU | QUALIFICATION=NON_DECLAREE | CONFORMITE=NON_EVALUEE"
      }
    ],
    "solution": "[Exemple]\nANALYSE: ecole | TRANSFERT=A_ETUDIER | QUALIFICATION=NON_DECLAREE | CONFORMITE=NON_EVALUEE\n\n[Cas 1 — Transfert déclaré et qualification à vérifier]\nANALYSE: banque | TRANSFERT=A_ETUDIER | QUALIFICATION=DECLARATION_A_VERIFIER | CONFORMITE=NON_EVALUEE\n\n[Cas 2 — Transfert non déclaré et autre qualification]\nANALYSE: industrie | TRANSFERT=NON_DECLARE | QUALIFICATION=DECLARATION_A_VERIFIER | CONFORMITE=NON_EVALUEE\n\n[Cas 3 — Informations incomplètes]\nANALYSE: association | TRANSFERT=INCONNU | QUALIFICATION=NON_DECLAREE | CONFORMITE=NON_EVALUEE"
  }
];
