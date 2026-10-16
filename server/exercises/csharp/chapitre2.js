'use strict';

module.exports = [
  {
    "id": "csb2-c2-e1",
    "chapter": 2,
    "title": "Propriétés auto-implémentées et validation get / set",
    "level": "n1",
    "language": "analyse",
    "goal": "Simuler l'encapsulation d'un compte bancaire C# avec validation stricte sur les accesseurs de propriété.",
    "brief": "<p>Analysez les données fournies pour chaque cas.<br>\nLe script doit afficher le résumé initial, chaque opération avec son issue, et le solde final.</p>\n<p>Format de sortie :<br><code>Compte: &lt;Titulaire&gt; | Solde initial: &lt;Montant2Dec&gt;</code><br><code>DEPOT &lt;Montant2Dec&gt; =&gt; Succes | Nouveau solde: &lt;Montant2Dec&gt;</code><br><code>RETRAIT &lt;Montant2Dec&gt; =&gt; Rejet: &lt;TypeException&gt; (&lt;Motif&gt;)</code><br><code>SOLDE_FINAL: &lt;Montant2Dec&gt;</code></p>",
    "starter": "# Grille d'analyse (csb2-c2-e1) — Propriétés auto-implémentées et validation get / set\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Dépôt négatif rejeté]\n# Données : INIT Titulaire=\"Bob\" Solde=250.0\n# Données : DEPOT -20.0\n# Données : RETRAIT 50.0\nA_COMPLETER\n\n[Cas 2 — Retrait du montant exact ramenant le solde à zéro]\n# Données : INIT Titulaire=\"Charlie\" Solde=80.0\n# Données : RETRAIT 80.0\nA_COMPLETER\n\n[Cas 3 — Retrait sur compte vide]\n# Données : INIT Titulaire=\"David\" Solde=0.0\n# Données : RETRAIT 10.0\nA_COMPLETER\n",
    "hints": [
      "Garde une trace du titulaire et du solde courant.",
      "Vérifie que les montants de dépôt et retrait sont strictement positifs.",
      "Formate les montants monétaires avec deux décimales (ex: 100.00)."
    ],
    "examples": [
      {
        "stdin": "INIT Titulaire=\"Alice\" Solde=100.0\nDEPOT 50.0\nRETRAIT 30.0\nRETRAIT 200.0",
        "expected": "Compte: Alice | Solde initial: 100.00\nDEPOT 50.00 => Succes | Nouveau solde: 150.00\nRETRAIT 30.00 => Succes | Nouveau solde: 120.00\nRETRAIT 200.00 => Rejet: InvalidOperationException (Solde insuffisant)\nSOLDE_FINAL: 120.00",
        "note": "Dépôt validé, premier retrait validé, second retrait rejeté car découvert non autorisé."
      }
    ],
    "tests": [
      {
        "label": "Dépôt négatif rejeté",
        "stdin": "cas:1",
        "expected": "Compte: Bob | Solde initial: 250.00\nDEPOT -20.00 => Rejet: ArgumentException (Montant invalide)\nRETRAIT 50.00 => Succes | Nouveau solde: 200.00\nSOLDE_FINAL: 200.00"
      },
      {
        "label": "Retrait du montant exact ramenant le solde à zéro",
        "stdin": "cas:2",
        "expected": "Compte: Charlie | Solde initial: 80.00\nRETRAIT 80.00 => Succes | Nouveau solde: 0.00\nSOLDE_FINAL: 0.00"
      },
      {
        "label": "Retrait sur compte vide",
        "stdin": "cas:3",
        "expected": "Compte: David | Solde initial: 0.00\nRETRAIT 10.00 => Rejet: InvalidOperationException (Solde insuffisant)\nSOLDE_FINAL: 0.00"
      }
    ],
    "solution": "[Exemple]\nCompte: Alice | Solde initial: 100.00\nDEPOT 50.00 => Succes | Nouveau solde: 150.00\nRETRAIT 30.00 => Succes | Nouveau solde: 120.00\nRETRAIT 200.00 => Rejet: InvalidOperationException (Solde insuffisant)\nSOLDE_FINAL: 120.00\n\n[Cas 1 — Dépôt négatif rejeté]\nCompte: Bob | Solde initial: 250.00\nDEPOT -20.00 => Rejet: ArgumentException (Montant invalide)\nRETRAIT 50.00 => Succes | Nouveau solde: 200.00\nSOLDE_FINAL: 200.00\n\n[Cas 2 — Retrait du montant exact ramenant le solde à zéro]\nCompte: Charlie | Solde initial: 80.00\nRETRAIT 80.00 => Succes | Nouveau solde: 0.00\nSOLDE_FINAL: 0.00\n\n[Cas 3 — Retrait sur compte vide]\nCompte: David | Solde initial: 0.00\nRETRAIT 10.00 => Rejet: InvalidOperationException (Solde insuffisant)\nSOLDE_FINAL: 0.00"
  },
  {
    "id": "csb2-c2-e2",
    "chapter": 2,
    "title": "Chaînage de constructeurs C# avec constructeur primaire et : this()",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le chaînage d'appels de constructeurs C# surchargés via l'initialiseur : this().",
    "brief": "<p>Analysez les données fournies pour chaque cas.0)</code> ;<br>\n- <code>NEW Article(\"&lt;Ref&gt;\", \"&lt;Nom&gt;\")</code> =&gt; délègue à <code>this(r, nom, 0.0)</code> ;<br>\n- <code>NEW Article(\"&lt;Ref&gt;\", \"&lt;Nom&gt;\", &lt;Prix&gt;)</code> =&gt; constructeur principal finalisant l'objet.<br>\nPour chaque commande, le script Indiquez la chaîne exacte des constructeurs traversés et l'objet résultant.</p>\n<p>Format de sortie :<br><code>Article(...) =&gt; Chaine: &lt;Constructeur1&gt; -&gt; &lt;Constructeur2&gt;... | Objet: [Ref=&lt;Ref&gt;, Nom=&lt;Nom&gt;, Prix=&lt;Prix2Dec&gt;]</code></p>",
    "starter": "# Grille d'analyse (csb2-c2-e2) — Chaînage de constructeurs C# avec constructeur primaire et : this()\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Appels uniques avec valeurs par défaut]\n# Données : NEW Article(\"A001\")\nA_COMPLETER\n\n[Cas 2 — Constructeur complet direct]\n# Données : NEW Article(\"ECR4K\", \"Ecran 4K\", 299.50)\nA_COMPLETER\n\n[Cas 3 — Constructeur intermédiaire avec nom personnalisé]\n# Données : NEW Article(\"CASQ\", \"Casque Bluetooth\")\nA_COMPLETER\n",
    "hints": [
      "Identifie le nombre d'arguments passés pour déterminer quel constructeur est appelé en premier.",
      "Le constructeur à 1 paramètre appelle celui à 2 paramètres, qui lui-même appelle celui à 3 paramètres.",
      "Formate le prix avec deux décimales."
    ],
    "examples": [
      {
        "stdin": "NEW Article(\"REF01\")\nNEW Article(\"REF02\", \"Souris\")\nNEW Article(\"REF03\", \"Clavier\", 49.99)",
        "expected": "Article(\"REF01\") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF01, Nom=Sans nom, Prix=0.00]\nArticle(\"REF02\", \"Souris\") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF02, Nom=Souris, Prix=0.00]\nArticle(\"REF03\", \"Clavier\", 49.99) => Chaine: ctor(r, nom, prix) | Objet: [Ref=REF03, Nom=Clavier, Prix=49.99]",
        "note": "Démonstration du chaînage de constructeurs C# via : this()."
      }
    ],
    "tests": [
      {
        "label": "Appels uniques avec valeurs par défaut",
        "stdin": "cas:1",
        "expected": "Article(\"A001\") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=A001, Nom=Sans nom, Prix=0.00]"
      },
      {
        "label": "Constructeur complet direct",
        "stdin": "cas:2",
        "expected": "Article(\"ECR4K\", \"Ecran 4K\", 299.50) => Chaine: ctor(r, nom, prix) | Objet: [Ref=ECR4K, Nom=Ecran 4K, Prix=299.50]"
      },
      {
        "label": "Constructeur intermédiaire avec nom personnalisé",
        "stdin": "cas:3",
        "expected": "Article(\"CASQ\", \"Casque Bluetooth\") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=CASQ, Nom=Casque Bluetooth, Prix=0.00]"
      }
    ],
    "solution": "[Exemple]\nArticle(\"REF01\") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF01, Nom=Sans nom, Prix=0.00]\nArticle(\"REF02\", \"Souris\") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF02, Nom=Souris, Prix=0.00]\nArticle(\"REF03\", \"Clavier\", 49.99) => Chaine: ctor(r, nom, prix) | Objet: [Ref=REF03, Nom=Clavier, Prix=49.99]\n\n[Cas 1 — Appels uniques avec valeurs par défaut]\nArticle(\"A001\") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=A001, Nom=Sans nom, Prix=0.00]\n\n[Cas 2 — Constructeur complet direct]\nArticle(\"ECR4K\", \"Ecran 4K\", 299.50) => Chaine: ctor(r, nom, prix) | Objet: [Ref=ECR4K, Nom=Ecran 4K, Prix=299.50]\n\n[Cas 3 — Constructeur intermédiaire avec nom personnalisé]\nArticle(\"CASQ\", \"Casque Bluetooth\") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=CASQ, Nom=Casque Bluetooth, Prix=0.00]"
  },
  {
    "id": "csb2-c2-e3",
    "chapter": 2,
    "title": "Records C# 9+ et mutabilité non destructive (with)",
    "level": "n3",
    "language": "analyse",
    "goal": "Simuler le comportement des records immuables C# et la création de copies via l'expression with.",
    "brief": "<p>Analysez les données fournies pour chaque cas...</code> : création d'un record immuable ;<br>\n- <code>WITH &lt;nouveau_nom&gt; FROM &lt;nom_source&gt; &lt;propModif&gt;=&lt;valModif&gt;...</code> : clonage non destructif avec l'expression C# <code>with { ... }</code> ;<br>\n- <code>COMPARE &lt;record1&gt; &lt;record2&gt;</code> : comparaison d'égalité structurelle (value-based equality native des records C#).<br>\nLe script Indiquez la création, la copie non destructive et le résultat des comparaisons.</p>\n<p>Format de sortie :<br><code>CREATE: &lt;nom&gt; =&gt; Record { &lt;k1&gt; = &lt;v1&gt;, ... }</code><br><code>WITH: &lt;nom&gt; =&gt; Record { &lt;k1&gt; = &lt;v1&gt;, ... }</code><br><code>EQUALS: &lt;r1&gt; == &lt;r2&gt; =&gt; True|False [ (Egalite structurelle)]</code></p>",
    "starter": "# Grille d'analyse (csb2-c2-e3) — Records C# 9+ et mutabilité non destructive (with)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Modification de plusieurs propriétés avec with]\n# Données : RECORD p1 Ville=Paris CodePostal=75001 Pays=France\n# Données : WITH p2 FROM p1 Ville=Lyon CodePostal=69001\n# Données : COMPARE p1 p2\nA_COMPLETER\n\n[Cas 2 — Clonage identique avec with vide]\n# Données : RECORD dev1 Nom=Bob Langage=CSharp\n# Données : WITH dev2 FROM dev1\n# Données : COMPARE dev1 dev2\nA_COMPLETER\n\n[Cas 3 — Création de deux records identiques directement]\n# Données : RECORD rA X=10 Y=20\n# Données : RECORD rB X=10 Y=20\n# Données : COMPARE rA rB\nA_COMPLETER\n",
    "hints": [
      "Un record C# possède une égalité par valeur automatique (égalité structurelle de toutes les propriétés).",
      "L'expression with copie toutes les propriétés du record source puis écrase celles spécifiées.",
      "Affiche \"(Egalite structurelle)\" lorsque deux records distincts possèdent les mêmes valeurs."
    ],
    "examples": [
      {
        "stdin": "RECORD u1 Id=U101 Email=alice@corp.com Role=Lecteur\nWITH u2 FROM u1 Role=Admin\nRECORD u3 Id=U101 Email=alice@corp.com Role=Lecteur\nCOMPARE u1 u2\nCOMPARE u1 u3",
        "expected": "CREATE: u1 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }\nWITH: u2 => Record { Id = U101, Email = alice@corp.com, Role = Admin }\nCREATE: u3 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }\nEQUALS: u1 == u2 => False\nEQUALS: u1 == u3 => True (Egalite structurelle)",
        "note": "Clonage avec with préservant l'immuabilité et égalité structurelle entre u1 et u3."
      }
    ],
    "tests": [
      {
        "label": "Modification de plusieurs propriétés avec with",
        "stdin": "cas:1",
        "expected": "CREATE: p1 => Record { Ville = Paris, CodePostal = 75001, Pays = France }\nWITH: p2 => Record { Ville = Lyon, CodePostal = 69001, Pays = France }\nEQUALS: p1 == p2 => False"
      },
      {
        "label": "Clonage identique avec with vide",
        "stdin": "cas:2",
        "expected": "CREATE: dev1 => Record { Nom = Bob, Langage = CSharp }\nWITH: dev2 => Record { Nom = Bob, Langage = CSharp }\nEQUALS: dev1 == dev2 => True (Egalite structurelle)"
      },
      {
        "label": "Création de deux records identiques directement",
        "stdin": "cas:3",
        "expected": "CREATE: rA => Record { X = 10, Y = 20 }\nCREATE: rB => Record { X = 10, Y = 20 }\nEQUALS: rA == rB => True (Egalite structurelle)"
      }
    ],
    "solution": "[Exemple]\nCREATE: u1 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }\nWITH: u2 => Record { Id = U101, Email = alice@corp.com, Role = Admin }\nCREATE: u3 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }\nEQUALS: u1 == u2 => False\nEQUALS: u1 == u3 => True (Egalite structurelle)\n\n[Cas 1 — Modification de plusieurs propriétés avec with]\nCREATE: p1 => Record { Ville = Paris, CodePostal = 75001, Pays = France }\nWITH: p2 => Record { Ville = Lyon, CodePostal = 69001, Pays = France }\nEQUALS: p1 == p2 => False\n\n[Cas 2 — Clonage identique avec with vide]\nCREATE: dev1 => Record { Nom = Bob, Langage = CSharp }\nWITH: dev2 => Record { Nom = Bob, Langage = CSharp }\nEQUALS: dev1 == dev2 => True (Egalite structurelle)\n\n[Cas 3 — Création de deux records identiques directement]\nCREATE: rA => Record { X = 10, Y = 20 }\nCREATE: rB => Record { X = 10, Y = 20 }\nEQUALS: rA == rB => True (Egalite structurelle)"
  }
];
