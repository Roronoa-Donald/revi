'use strict';

module.exports = [
  {
    "id": "um2-c3-e1",
    "chapter": 3,
    "title": "Décodeur de signatures UML (attributs et méthodes)",
    "level": "n1",
    "language": "analyse",
    "goal": "Parser la syntaxe formelle d'un membre de classe UML : visibilité, nom, type de retour, paramètres et valeur par défaut.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nSymboles de visibilité standard :<br>\n- <code>+</code> : Public<br>\n- <code>-</code> : Private<br>\n- <code>#</code> : Protected<br>\n- <code>~</code> : Package<br>\nDeux formats possibles :<br>\n1. <strong>Attribut :</strong> <code>&lt;visibilite&gt; &lt;nom&gt; : &lt;type&gt; [= &lt;valeur_defaut&gt;]</code><br>\n   Exemple : <code>- solde : Decimal = 0.0</code><br>\n   Sortie : <code>[ATTRIBUT] &lt;nom&gt; | Visibilite: &lt;Vis&gt; | Type: &lt;type&gt; [| Defaut: &lt;val&gt;]</code><br>\n2. <strong>Opération / Méthode :</strong> <code>&lt;visibilite&gt; &lt;nom&gt;(&lt;param1&gt;: &lt;t1&gt;, ...): &lt;type_retour&gt;</code><br>\n   Exemple : <code>+ crediter(montant: Decimal): Void</code><br>\n   Sortie : <code>[METHODE] &lt;nom&gt; | Visibilite: &lt;Vis&gt; | Params: &lt;nb&gt; | Retour: &lt;type_retour&gt;</code></p>",
    "starter": "# Grille d'analyse (um2-c3-e1) — Décodeur de signatures UML (attributs et méthodes)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Méthode sans paramètre et visibilité package]\n# Données : ~ getDetails(): String\n# Données : + calculerTotal(): Double\nA_COMPLETER\n\n[Cas 2 — Méthode avec plusieurs paramètres]\n# Données : + transferer(src: Compte, dst: Compte, montant: Decimal): Void\nA_COMPLETER\n\n[Cas 3 — Attributs sans valeur par défaut]\n# Données : - email : String\n# Données : # dateCreation : DateTime\nA_COMPLETER\n",
    "hints": [
      "La présence de parenthèses ( ) distingue une méthode d'un attribut.",
      "Les symboles +, -, #, ~ déterminent la visibilité."
    ],
    "examples": [
      {
        "stdin": "+ id : Integer\n- solde : Decimal = 0.0\n# verifierPlafond(m: Decimal): Boolean",
        "expected": "[ATTRIBUT] id | Visibilite: Public | Type: Integer\n[ATTRIBUT] solde | Visibilite: Private | Type: Decimal | Defaut: 0.0\n[METHODE] verifierPlafond | Visibilite: Protected | Params: 1 | Retour: Boolean",
        "note": "Attribut simple, attribut avec valeur initiale et méthode à 1 paramètre."
      }
    ],
    "tests": [
      {
        "label": "Méthode sans paramètre et visibilité package",
        "stdin": "cas:1",
        "expected": "[METHODE] getDetails | Visibilite: Package | Params: 0 | Retour: String\n[METHODE] calculerTotal | Visibilite: Public | Params: 0 | Retour: Double"
      },
      {
        "label": "Méthode avec plusieurs paramètres",
        "stdin": "cas:2",
        "expected": "[METHODE] transferer | Visibilite: Public | Params: 3 | Retour: Void"
      },
      {
        "label": "Attributs sans valeur par défaut",
        "stdin": "cas:3",
        "expected": "[ATTRIBUT] email | Visibilite: Private | Type: String\n[ATTRIBUT] dateCreation | Visibilite: Protected | Type: DateTime"
      }
    ],
    "solution": "[Exemple]\n[ATTRIBUT] id | Visibilite: Public | Type: Integer\n[ATTRIBUT] solde | Visibilite: Private | Type: Decimal | Defaut: 0.0\n[METHODE] verifierPlafond | Visibilite: Protected | Params: 1 | Retour: Boolean\n\n[Cas 1 — Méthode sans paramètre et visibilité package]\n[METHODE] getDetails | Visibilite: Package | Params: 0 | Retour: String\n[METHODE] calculerTotal | Visibilite: Public | Params: 0 | Retour: Double\n\n[Cas 2 — Méthode avec plusieurs paramètres]\n[METHODE] transferer | Visibilite: Public | Params: 3 | Retour: Void\n\n[Cas 3 — Attributs sans valeur par défaut]\n[ATTRIBUT] email | Visibilite: Private | Type: String\n[ATTRIBUT] dateCreation | Visibilite: Protected | Type: DateTime"
  },
  {
    "id": "um2-c3-e2",
    "chapter": 3,
    "title": "Analyseur de multiplicités et cardinalités d'associations",
    "level": "n2",
    "language": "analyse",
    "goal": "Vérifier la validité d'une association binaire entre deux classes selon leurs contraintes de multiplicité (0..1, 1..1, 0..*, 1..*).",
    "brief": "<p>Analysez les données fournies pour chaque cas..1</code>), <code>0..1</code>, <code>*</code> (ou <code>0..*</code>), <code>1..*</code>, ou borne exacte <code>min..max</code>.<br>\nLes lignes suivantes décrivent les liens réels instanciés :<br>\n<code>LINK &lt;InstanceA&gt; &lt;InstanceB&gt;</code>.<br>\nLe script doit vérifier pour chaque instance si le nombre d'objets associés respecte sa borne autorisée :<br>\n- Si une instance viole sa multiplicité :<br>\n  <code>[VIOLATION] &lt;Instance&gt; (&lt;Classe&gt;) associee a &lt;N&gt; &lt;Cible&gt; (attendu &lt;Mult&gt;)</code><br>\nSi toutes les instances respectent leurs contraintes :<br>\n<code>CARDINALITES CONFORMES</code>.<br>\nTerminer par le nombre d'instances en anomalie : <code>ANOMALIES: &lt;X&gt;</code>.</p>",
    "starter": "# Grille d'analyse (um2-c3-e2) — Analyseur de multiplicités et cardinalités d'associations\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Toutes multiplicités respectées]\n# Données : ASSOC Auteur 1 ---- 0..* Livre\n# Données : LINK a1 l1\n# Données : LINK a1 l2\n# Données : LINK a2 l3\nA_COMPLETER\n\n[Cas 2 — Violation 1..* avec aucune cible associée]\n# Données : ASSOC Dossier 1 ---- 1..* Fichier\n# Données : LINK d1 f1\n# Données : LINK d1 f2\n# Données : LINK d2\nA_COMPLETER\n\n[Cas 3 — Association 0..1 violée par 2 liaisons]\n# Données : ASSOC Employe 1 ---- 0..1 Bureau\n# Données : LINK e1 b1\n# Données : LINK e1 b2\nA_COMPLETER\n",
    "hints": [
      "Attention à la lecture de la multiplicité : la multiplicité MultB située côté ClasseB indique combien d'instances de B sont liées à UNE instance de A.",
      "La multiplicité MultA située côté ClasseA indique combien d'instances de A sont liées à UNE instance de B."
    ],
    "examples": [
      {
        "stdin": "ASSOC Client 1 ---- 1..* Commande\nLINK c1 cmd1\nLINK c1 cmd2\nLINK c2 cmd3\nLINK c3 cmd3",
        "expected": "[VIOLATION] cmd3 (Commande) associee a 2 Client (attendu 1)\nANOMALIES: 1",
        "note": "Une commande est raccordée à 2 clients alors que la multiplicité côté Client est 1."
      }
    ],
    "tests": [
      {
        "label": "Toutes multiplicités respectées",
        "stdin": "cas:1",
        "expected": "CARDINALITES CONFORMES\nANOMALIES: 0"
      },
      {
        "label": "Violation 1..* avec aucune cible associée",
        "stdin": "cas:2",
        "expected": "[VIOLATION] d2 (Dossier) associee a 0 Fichier (attendu 1..*)\nANOMALIES: 1"
      },
      {
        "label": "Association 0..1 violée par 2 liaisons",
        "stdin": "cas:3",
        "expected": "[VIOLATION] e1 (Employe) associee a 2 Bureau (attendu 0..1)\nANOMALIES: 1"
      }
    ],
    "solution": "[Exemple]\n[VIOLATION] cmd3 (Commande) associee a 2 Client (attendu 1)\nANOMALIES: 1\n\n[Cas 1 — Toutes multiplicités respectées]\nCARDINALITES CONFORMES\nANOMALIES: 0\n\n[Cas 2 — Violation 1..* avec aucune cible associée]\n[VIOLATION] d2 (Dossier) associee a 0 Fichier (attendu 1..*)\nANOMALIES: 1\n\n[Cas 3 — Association 0..1 violée par 2 liaisons]\n[VIOLATION] e1 (Employe) associee a 2 Bureau (attendu 0..1)\nANOMALIES: 1"
  },
  {
    "id": "um2-c3-e3",
    "chapter": 3,
    "title": "Différenciateur d'agrégation faible vs composition forte",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler la gestion du cycle de vie des objets : survie des composants en agrégation faible (losange blanc) vs destruction en cascade en composition forte (losange noir).",
    "brief": "<p>Analysez les données fournies pour chaque cas...</code><br>\n- L'ordre de suppression : <code>DELETE &lt;Conteneur&gt;</code>.<br>\nPour chaque suppression, le script détermine l'impact :<br>\n- Si <code>COMPOSITION</code> : Le conteneur et tous ses composants enfants sont détruits.<br>\n  Afficher : <code>[CASCADE] Destruction de &lt;Conteneur&gt; et de ses composants : &lt;liste_enfants&gt;</code>.<br>\n- Si <code>AGREGATION</code> : Seul le conteneur est détruit, ses éléments composants survivent dans le système.<br>\n  Afficher : <code>[SURVIE] Destruction de &lt;Conteneur&gt; seule ; les composants survivent : &lt;liste_enfants&gt;</code>.<br>\nÀ la commande finale <code>STATUT</code>, afficher la liste des objets encore vivants triés :<br>\n<code>OBJETS VIVANTS: &lt;liste_triee&gt;</code>.</p>",
    "starter": "# Grille d'analyse (um2-c3-e3) — Différenciateur d'agrégation faible vs composition forte\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Agrégation faible avec survie des composants]\n# Données : AGREGATION Departement o-- Enseignant\n# Données : INSTANCE depInfo E1,E2\n# Données : DELETE depInfo\n# Données : STATUT\nA_COMPLETER\n\n[Cas 2 — Suppression partielle sur deux conteneurs]\n# Données : COMPOSITION Livre *-- Chapitre\n# Données : INSTANCE l1 ch1,ch2\n# Données : INSTANCE l2 ch3,ch4\n# Données : DELETE l1\n# Données : STATUT\nA_COMPLETER\n\n[Cas 3 — Suppression d agrégat sans enfant]\n# Données : AGREGATION Equipe o-- Joueur\n# Données : INSTANCE teamA \n# Données : DELETE teamA\n# Données : STATUT\nA_COMPLETER\n",
    "hints": [
      "En composition forte, un composant ne peut appartenir qu'à un seul composite à la fois et disparaît avec lui.",
      "En agrégation, les éléments peuvent exister indépendamment de l'agrégat."
    ],
    "examples": [
      {
        "stdin": "COMPOSITION Facture *-- LigneFacture\nINSTANCE fact1 L1,L2\nDELETE fact1\nSTATUT",
        "expected": "[CASCADE] Destruction de fact1 et de ses composants : L1, L2\nOBJETS VIVANTS: AUCUN",
        "note": "Composition : la suppression de la facture supprime toutes ses lignes en cascade."
      }
    ],
    "tests": [
      {
        "label": "Agrégation faible avec survie des composants",
        "stdin": "cas:1",
        "expected": "[SURVIE] Destruction de depInfo seule ; les composants survivent : E1, E2\nOBJETS VIVANTS: E1, E2"
      },
      {
        "label": "Suppression partielle sur deux conteneurs",
        "stdin": "cas:2",
        "expected": "[CASCADE] Destruction de l1 et de ses composants : ch1, ch2\nOBJETS VIVANTS: ch3, ch4, l2"
      },
      {
        "label": "Suppression d agrégat sans enfant",
        "stdin": "cas:3",
        "expected": "[SURVIE] Destruction de teamA seule ; les composants survivent : AUCUN\nOBJETS VIVANTS: AUCUN"
      }
    ],
    "solution": "[Exemple]\n[CASCADE] Destruction de fact1 et de ses composants : L1, L2\nOBJETS VIVANTS: AUCUN\n\n[Cas 1 — Agrégation faible avec survie des composants]\n[SURVIE] Destruction de depInfo seule ; les composants survivent : E1, E2\nOBJETS VIVANTS: E1, E2\n\n[Cas 2 — Suppression partielle sur deux conteneurs]\n[CASCADE] Destruction de l1 et de ses composants : ch1, ch2\nOBJETS VIVANTS: ch3, ch4, l2\n\n[Cas 3 — Suppression d agrégat sans enfant]\n[SURVIE] Destruction de teamA seule ; les composants survivent : AUCUN\nOBJETS VIVANTS: AUCUN"
  }
];
