'use strict';

module.exports = [
  {
    "id": "um2-c2-e1",
    "chapter": 2,
    "title": "Validateur de relations <<include>> vs <<extend>>",
    "level": "n1",
    "language": "analyse",
    "goal": "Vérifier la sémantique et l'orientation des dépendances <<include>> (inclusion obligatoire) et <<extend>> (extension conditionnelle).",
    "brief": "<p>Analysez les données fournies pour chaque cas. <strong>Relation &lt;&lt;include&gt;&gt; :</strong> Le cas de base inclut obligatoirement le cas inclus.<br>\n   Sémantique : <code>Source (base) -&gt; Cible (inclus) &lt;&lt;include&gt;&gt;</code>. Pas de condition requise.<br>\n2. <strong>Relation &lt;&lt;extend&gt;&gt; :</strong> Le cas étendant enrichit optionnellement le cas de base sous condition.<br>\n   Sémantique : <strong>La flèche part du cas étendant VERS le cas de base</strong> : <code>Source (extension) -&gt; Cible (base) &lt;&lt;extend&gt;&gt;</code>. Une condition doit être renseignée.<br>\nPour chaque relation, afficher :<br>\n<code>[CONFORME|ANOMALIE] &lt;Source&gt; -&gt; &lt;Cible&gt; &lt;&lt;&lt;TYPE&gt;&gt;&gt; : &lt;motif&gt;</code></p>",
    "starter": "# Grille d'analyse (um2-c2-e1) — Validateur de relations <<include>> vs <<extend>>\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Extension sans condition spécifiée]\n# Données : UC Payer OBLIGATOIRE\n# Données : UC PayerEnCryptomonnaie OPTIONNEL\n# Données : RELATION PayerEnCryptomonnaie -> Payer <<extend>>\nA_COMPLETER\n\n[Cas 2 — Inversion de flèche sur extend]\n# Données : UC ConsulterCompte OBLIGATOIRE\n# Données : UC ExporterPDF OPTIONNEL\n# Données : RELATION ConsulterCompte -> ExporterPDF <<extend>> CONDITION=\"Clic sur export\"\nA_COMPLETER\n\n[Cas 3 — Inclusion valide de plusieurs cas partagés]\n# Données : UC CreerCompte OBLIGATOIRE\n# Données : UC ReserverVol OBLIGATOIRE\n# Données : UC VerifierIdentite OBLIGATOIRE\n# Données : RELATION CreerCompte -> VerifierIdentite <<include>>\n# Données : RELATION ReserverVol -> VerifierIdentite <<include>>\nA_COMPLETER\n",
    "hints": [
      "Dans une relation <<extend>>, la flèche part TOUJOURS du cas optionnel vers le cas de base.",
      "Une relation <<extend>> sans condition constitue une mauvaise pratique UML."
    ],
    "examples": [
      {
        "stdin": "UC Authentifier OBLIGATOIRE\nUC Virement OBLIGATOIRE\nUC NotifierSMS OPTIONNEL\nRELATION Virement -> Authentifier <<include>>\nRELATION NotifierSMS -> Virement <<extend>> CONDITION=\"Option cochee\"",
        "expected": "[CONFORME] Virement -> Authentifier <<include>> : Inclusion obligatoire du sous-processus\n[CONFORME] NotifierSMS -> Virement <<extend>> : Extension conditionnelle valide avec garde",
        "note": "Virement inclut Authentifier, et NotifierSMS étend Virement si option cochée."
      }
    ],
    "tests": [
      {
        "label": "Extension sans condition spécifiée",
        "stdin": "cas:1",
        "expected": "[ANOMALIE] PayerEnCryptomonnaie -> Payer <<extend>> : Extension sans condition ni point d'extension"
      },
      {
        "label": "Inversion de flèche sur extend",
        "stdin": "cas:2",
        "expected": "[ANOMALIE] ConsulterCompte -> ExporterPDF <<extend>> : Sens de fleche inverse (le cas optionnel doit pointer vers la base)"
      },
      {
        "label": "Inclusion valide de plusieurs cas partagés",
        "stdin": "cas:3",
        "expected": "[CONFORME] CreerCompte -> VerifierIdentite <<include>> : Inclusion obligatoire du sous-processus\n[CONFORME] ReserverVol -> VerifierIdentite <<include>> : Inclusion obligatoire du sous-processus"
      }
    ],
    "solution": "[Exemple]\n[CONFORME] Virement -> Authentifier <<include>> : Inclusion obligatoire du sous-processus\n[CONFORME] NotifierSMS -> Virement <<extend>> : Extension conditionnelle valide avec garde\n\n[Cas 1 — Extension sans condition spécifiée]\n[ANOMALIE] PayerEnCryptomonnaie -> Payer <<extend>> : Extension sans condition ni point d'extension\n\n[Cas 2 — Inversion de flèche sur extend]\n[ANOMALIE] ConsulterCompte -> ExporterPDF <<extend>> : Sens de fleche inverse (le cas optionnel doit pointer vers la base)\n\n[Cas 3 — Inclusion valide de plusieurs cas partagés]\n[CONFORME] CreerCompte -> VerifierIdentite <<include>> : Inclusion obligatoire du sous-processus\n[CONFORME] ReserverVol -> VerifierIdentite <<include>> : Inclusion obligatoire du sous-processus"
  },
  {
    "id": "um2-c2-e2",
    "chapter": 2,
    "title": "Décomposeur d'héritage d'acteurs",
    "level": "n2",
    "language": "analyse",
    "goal": "Calculer par propagation d'héritage l'ensemble des cas d'utilisation accessibles par chaque acteur du système.",
    "brief": "<p>Dans un diagramme de cas d'utilisation, un acteur spécialisé hérite de tous les cas d'utilisation des acteurs qu'il généralise.<br>\nLe script lit :<br>\n- Les héritages d'acteurs : <code>HERITE &lt;ActeurSpecialise&gt; &lt;ActeurParent&gt;</code> (ex: <code>HERITE Admin Utilisateur</code>)<br>\n- Les associations directes acteur -&gt; UC : <code>ACCES &lt;Acteur&gt; &lt;NomUC&gt;</code><br>\nLe script doit afficher pour chaque acteur (trié par ordre alphabétique) :<br>\n<code>&lt;Acteur&gt; (Directs: &lt;nbD&gt;, Total: &lt;nbT&gt;) -&gt; &lt;Liste_UC_Triee_Separee_Virgule&gt;</code></p>",
    "starter": "# Grille d'analyse (um2-c2-e2) — Décomposeur d'héritage d'acteurs\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Deux branches d héritage parallèles]\n# Données : HERITE Medecin PersonnelSante\n# Données : HERITE Infirmier PersonnelSante\n# Données : ACCES PersonnelSante ConsulterDossier\n# Données : ACCES Medecin PrescrireTraitement\n# Données : ACCES Infirmier AdministrerSoin\nA_COMPLETER\n\n[Cas 2 — Acteurs indépendants sans héritage]\n# Données : ACCES Client PasserCommande\n# Données : ACCES Fournisseur LivrerColis\nA_COMPLETER\n\n[Cas 3 — Héritage sur 3 niveaux profonds]\n# Données : HERITE B A\n# Données : HERITE C B\n# Données : HERITE D C\n# Données : ACCES A UC_A\n# Données : ACCES B UC_B\n# Données : ACCES C UC_C\n# Données : ACCES D UC_D\nA_COMPLETER\n",
    "hints": [
      "Construire l'arbre d'héritage et utiliser une fonction récursive ou fermeture transitive pour collecter tous les parents d'un acteur.",
      "Un acteur possède ses cas directs + l'union des cas de tous ses ancêtres."
    ],
    "examples": [
      {
        "stdin": "HERITE Admin Utilisateur\nHERITE SuperAdmin Admin\nACCES Utilisateur SeConnecter\nACCES Utilisateur ModifierProfil\nACCES Admin GererUtilisateurs\nACCES SuperAdmin PurgerDonnees",
        "expected": "Admin (Directs: 1, Total: 3) -> GererUtilisateurs, ModifierProfil, SeConnecter\nSuperAdmin (Directs: 1, Total: 4) -> GererUtilisateurs, ModifierProfil, PurgerDonnees, SeConnecter\nUtilisateur (Directs: 2, Total: 2) -> ModifierProfil, SeConnecter",
        "note": "SuperAdmin hérite d'Admin et d'Utilisateur."
      }
    ],
    "tests": [
      {
        "label": "Deux branches d héritage parallèles",
        "stdin": "cas:1",
        "expected": "Infirmier (Directs: 1, Total: 2) -> AdministrerSoin, ConsulterDossier\nMedecin (Directs: 1, Total: 2) -> ConsulterDossier, PrescrireTraitement\nPersonnelSante (Directs: 1, Total: 1) -> ConsulterDossier"
      },
      {
        "label": "Acteurs indépendants sans héritage",
        "stdin": "cas:2",
        "expected": "Client (Directs: 1, Total: 1) -> PasserCommande\nFournisseur (Directs: 1, Total: 1) -> LivrerColis"
      },
      {
        "label": "Héritage sur 3 niveaux profonds",
        "stdin": "cas:3",
        "expected": "A (Directs: 1, Total: 1) -> UC_A\nB (Directs: 1, Total: 2) -> UC_A, UC_B\nC (Directs: 1, Total: 3) -> UC_A, UC_B, UC_C\nD (Directs: 1, Total: 4) -> UC_A, UC_B, UC_C, UC_D"
      }
    ],
    "solution": "[Exemple]\nAdmin (Directs: 1, Total: 3) -> GererUtilisateurs, ModifierProfil, SeConnecter\nSuperAdmin (Directs: 1, Total: 4) -> GererUtilisateurs, ModifierProfil, PurgerDonnees, SeConnecter\nUtilisateur (Directs: 2, Total: 2) -> ModifierProfil, SeConnecter\n\n[Cas 1 — Deux branches d héritage parallèles]\nInfirmier (Directs: 1, Total: 2) -> AdministrerSoin, ConsulterDossier\nMedecin (Directs: 1, Total: 2) -> ConsulterDossier, PrescrireTraitement\nPersonnelSante (Directs: 1, Total: 1) -> ConsulterDossier\n\n[Cas 2 — Acteurs indépendants sans héritage]\nClient (Directs: 1, Total: 1) -> PasserCommande\nFournisseur (Directs: 1, Total: 1) -> LivrerColis\n\n[Cas 3 — Héritage sur 3 niveaux profonds]\nA (Directs: 1, Total: 1) -> UC_A\nB (Directs: 1, Total: 2) -> UC_A, UC_B\nC (Directs: 1, Total: 3) -> UC_A, UC_B, UC_C\nD (Directs: 1, Total: 4) -> UC_A, UC_B, UC_C, UC_D"
  },
  {
    "id": "um2-c2-e3",
    "chapter": 2,
    "title": "Vérificateur de frontière de système et complétude Use Case",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecter les anomalies structurelles dans un diagramme de cas d'utilisation : acteurs placés dans le système, cas orphelins et sous-systèmes.",
    "brief": "<p>Analysez les données fournies pour chaque cas. <strong>Règle Acteur Externe :</strong> Un acteur représente impérativement une entité <em>externe</em> au système modélisé. Si un acteur est déclaré <code>INTERNE</code> : <code>ANOMALIE: Acteur interne dans le systeme -&gt; &lt;Nom&gt;</code>.<br>\n2. <strong>Règle Cas Orphelin :</strong> Tout cas d'utilisation doit être relié à au moins un acteur (directement ou indirectement). S'il n'a aucun lien : <code>ANOMALIE: Cas d utilisation orphelin sans acteur -&gt; &lt;NomUC&gt;</code>.<br>\n3. <strong>Couverture :</strong> Calculer le pourcentage de cas d'utilisation raccordés : <code>COUVERTURE: &lt;N&gt;%</code>.<br>\nSi aucune anomalie : <code>DIAGRAMME USE CASE VALIDE</code>.</p>",
    "starter": "# Grille d'analyse (um2-c2-e3) — Vérificateur de frontière de système et complétude Use Case\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Diagramme Use Case parfait]\n# Données : SYSTEM Guichet\n# Données : ACTOR Client EXTERNE\n# Données : ACTOR BanqueCentrale EXTERNE\n# Données : UC RetirerArgent\n# Données : UC ConsulterSolde\n# Données : LINK Client -> RetirerArgent\n# Données : LINK Client -> ConsulterSolde\n# Données : LINK BanqueCentrale -> RetirerArgent\nA_COMPLETER\n\n[Cas 2 — Deux cas orphelins sur trois]\n# Données : SYSTEM App\n# Données : ACTOR User EXTERNE\n# Données : UC UC1\n# Données : UC UC2\n# Données : UC UC3\n# Données : LINK User -> UC1\nA_COMPLETER\n\n[Cas 3 — Acteur interne unique avec couverture totale]\n# Données : SYSTEM Core\n# Données : ACTOR ServiceAuth INTERNE\n# Données : UC Login\n# Données : LINK ServiceAuth -> Login\nA_COMPLETER\n",
    "hints": [
      "Un acteur ne peut jamais être un composant interne du système informatique (règle OMG fondamentale).",
      "Identifier l'ensemble des cas d'utilisation qui ne figurent dans aucun LINK."
    ],
    "examples": [
      {
        "stdin": "SYSTEM E-Commerce\nACTOR Client EXTERNE\nACTOR BaseDeDonnees INTERNE\nUC PasserCommande\nUC Payer\nLINK Client -> PasserCommande",
        "expected": "ANOMALIE: Acteur interne dans le systeme -> BaseDeDonnees\nANOMALIE: Cas d utilisation orphelin sans acteur -> Payer\nCOUVERTURE: 50%\nBILAN: 2 anomalies detectees",
        "note": "La base de données interne n'est pas un acteur, et Payer est orphelin."
      }
    ],
    "tests": [
      {
        "label": "Diagramme Use Case parfait",
        "stdin": "cas:1",
        "expected": "DIAGRAMME USE CASE VALIDE\nCOUVERTURE: 100%\nBILAN: 0 anomalie detectee"
      },
      {
        "label": "Deux cas orphelins sur trois",
        "stdin": "cas:2",
        "expected": "ANOMALIE: Cas d utilisation orphelin sans acteur -> UC2\nANOMALIE: Cas d utilisation orphelin sans acteur -> UC3\nCOUVERTURE: 33%\nBILAN: 2 anomalies detectees"
      },
      {
        "label": "Acteur interne unique avec couverture totale",
        "stdin": "cas:3",
        "expected": "ANOMALIE: Acteur interne dans le systeme -> ServiceAuth\nCOUVERTURE: 100%\nBILAN: 1 anomalie detectee"
      }
    ],
    "solution": "[Exemple]\nANOMALIE: Acteur interne dans le systeme -> BaseDeDonnees\nANOMALIE: Cas d utilisation orphelin sans acteur -> Payer\nCOUVERTURE: 50%\nBILAN: 2 anomalies detectees\n\n[Cas 1 — Diagramme Use Case parfait]\nDIAGRAMME USE CASE VALIDE\nCOUVERTURE: 100%\nBILAN: 0 anomalie detectee\n\n[Cas 2 — Deux cas orphelins sur trois]\nANOMALIE: Cas d utilisation orphelin sans acteur -> UC2\nANOMALIE: Cas d utilisation orphelin sans acteur -> UC3\nCOUVERTURE: 33%\nBILAN: 2 anomalies detectees\n\n[Cas 3 — Acteur interne unique avec couverture totale]\nANOMALIE: Acteur interne dans le systeme -> ServiceAuth\nCOUVERTURE: 100%\nBILAN: 1 anomalie detectee"
  }
];
