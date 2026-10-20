'use strict';

module.exports = [
  {
    "id": "csb2-c4-e1",
    "chapter": 4,
    "title": "Collections génériques C# et recherche sécurisée TryGetValue",
    "level": "n1",
    "language": "analyse",
    "goal": "Manipuler un Dictionary<TKey, TValue> C# et comparer l'indexeur direct avec la méthode TryGetValue.",
    "brief": "<p>Le script gère un dictionnaire générique C# <code>Dictionary&lt;string, int&gt;</code>.<br>\nIl lit dans l’énoncé du cas des instructions :<br>\n- <code>ADD &lt;Cle&gt; &lt;Valeur&gt;</code> : insère ou met à jour la valeur et Indiquez la nouvelle taille ;<br>\n- <code>GET &lt;Cle&gt;</code> : accès par indexeur direct <code>dict[cle]</code>. Si la clé existe, Indiquez sa valeur ; sinon, lève une exception <code>CRASH KeyNotFoundException (Cle absente du dictionnaire)</code> ;<br>\n- <code>TRYGET &lt;Cle&gt;</code> : accès sécurisé via <code>dict.TryGetValue(cle, out int val)</code>. Indiquez <code>Trouve: &lt;val&gt;</code> ou <code>NonTrouve (out val=0)</code> sans lever d'exception.</p>\n<p>Format de sortie :<br><code>ADD: &lt;Cle&gt; =&gt; &lt;Valeur&gt; (Taille=&lt;N&gt;)</code><br><code>GET: &lt;Cle&gt; =&gt; &lt;Valeur&gt;</code> ou <code>GET: &lt;Cle&gt; =&gt; CRASH KeyNotFoundException (Cle absente du dictionnaire)</code><br><code>TRYGET: &lt;Cle&gt; =&gt; Trouve: &lt;Valeur&gt;</code> ou <code>TRYGET: &lt;Cle&gt; =&gt; NonTrouve (out val=0)</code></p>",
    "starter": "# Grille d'analyse (csb2-c4-e1) — Collections génériques C# et recherche sécurisée TryGetValue\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Ajouts simples et récupérations valides]\n# Données : ADD PortHTTP 80\n# Données : GET PortHTTP\n# Données : TRYGET PortHTTP\nA_COMPLETER\n\n[Cas 2 — Mise à jour d une clé existante]\n# Données : ADD MaxThreads 4\n# Données : ADD MaxThreads 8\n# Données : GET MaxThreads\nA_COMPLETER\n\n[Cas 3 — Multiples TryGet sur clés manquantes]\n# Données : TRYGET Inconnu1\n# Données : TRYGET Inconnu2\nA_COMPLETER\n",
    "hints": [
      "L'indexeur C# dictionnaire[cle] lève KeyNotFoundException si la clé est absente.",
      "La méthode TryGetValue renvoie false et initialise la variable out à sa valeur par défaut (0 pour int).",
      "ADD met à jour la valeur si la clé existe déjà, tout en incrémentant la taille seulement si c'est une nouvelle clé."
    ],
    "examples": [
      {
        "stdin": "ADD ServeurWeb 80\nADD ServeurSSH 22\nGET ServeurWeb\nTRYGET ServeurBD\nGET ServeurBD",
        "expected": "ADD: ServeurWeb => 80 (Taille=1)\nADD: ServeurSSH => 22 (Taille=2)\nGET: ServeurWeb => 80\nTRYGET: ServeurBD => NonTrouve (out val=0)\nGET: ServeurBD => CRASH KeyNotFoundException (Cle absente du dictionnaire)",
        "note": "Démonstration de TryGetValue qui protège contre le crash de l'indexeur sur une clé absente."
      }
    ],
    "tests": [
      {
        "label": "Ajouts simples et récupérations valides",
        "stdin": "cas:1",
        "expected": "ADD: PortHTTP => 80 (Taille=1)\nGET: PortHTTP => 80\nTRYGET: PortHTTP => Trouve: 80"
      },
      {
        "label": "Mise à jour d une clé existante",
        "stdin": "cas:2",
        "expected": "ADD: MaxThreads => 4 (Taille=1)\nADD: MaxThreads => 8 (Taille=1)\nGET: MaxThreads => 8"
      },
      {
        "label": "Multiples TryGet sur clés manquantes",
        "stdin": "cas:3",
        "expected": "TRYGET: Inconnu1 => NonTrouve (out val=0)\nTRYGET: Inconnu2 => NonTrouve (out val=0)"
      }
    ],
    "solution": "[Exemple]\nADD: ServeurWeb => 80 (Taille=1)\nADD: ServeurSSH => 22 (Taille=2)\nGET: ServeurWeb => 80\nTRYGET: ServeurBD => NonTrouve (out val=0)\nGET: ServeurBD => CRASH KeyNotFoundException (Cle absente du dictionnaire)\n\n[Cas 1 — Ajouts simples et récupérations valides]\nADD: PortHTTP => 80 (Taille=1)\nGET: PortHTTP => 80\nTRYGET: PortHTTP => Trouve: 80\n\n[Cas 2 — Mise à jour d une clé existante]\nADD: MaxThreads => 4 (Taille=1)\nADD: MaxThreads => 8 (Taille=1)\nGET: MaxThreads => 8\n\n[Cas 3 — Multiples TryGet sur clés manquantes]\nTRYGET: Inconnu1 => NonTrouve (out val=0)\nTRYGET: Inconnu2 => NonTrouve (out val=0)"
  },
  {
    "id": "csb2-c4-e2",
    "chapter": 4,
    "title": "Gestion des exceptions avec filtres catch ... when",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler le routage d'exceptions C# grâce aux filtres de clause catch when et garantir l'exécution de finally.",
    "brief": "<p>En C# 6+, les blocs <code>catch</code> peuvent être filtrés avec une clause <code>when (condition)</code> :<br>\n1. <code>catch (HttpException ex) when (ex.StatusCode == 404)</code> =&gt; <code>[ClientError]</code> ;<br>\n2. <code>catch (HttpException ex) when (ex.StatusCode &gt;= 500)</code> =&gt; <code>[ServerError]</code> ;<br>\n3. <code>catch (TimeoutException)</code> =&gt; <code>[DelaiDepasse]</code> ;<br>\n4. <code>catch (Exception)</code> =&gt; <code>[FallbackGlobal]</code>.<br>\nDans tous les cas, le bloc <code>finally</code> est inconditionnellement exécuté (<code>| FINALLY execute</code>).<br>\nAnalysez les données fournies pour chaque cas.</p>\n<p>Format de sortie :<br><code>Exception: &lt;Type&gt; (&lt;Code&gt;) =&gt; Intercepte par: &lt;ClauseCatch&gt; &lt;Tag&gt; | FINALLY execute</code></p>",
    "starter": "# Grille d'analyse (csb2-c4-e2) — Gestion des exceptions avec filtres catch ... when\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Erreur 500 serveur interceptée]\n# Données : THROW HttpException StatusCode=500\nA_COMPLETER\n\n[Cas 2 — Timeout sans code http spécifique]\n# Données : THROW TimeoutException StatusCode=0\nA_COMPLETER\n\n[Cas 3 — Erreur 400 tombant dans le fallback global]\n# Données : THROW HttpException StatusCode=400\nA_COMPLETER\n",
    "hints": [
      "Évalue les conditions dans l'ordre d'apparition des blocs catch.",
      "Les clauses when permettent de capturer sélectivement selon l'état interne de l'exception (ex: StatusCode).",
      "Le bloc finally s'exécute toujours, que l'exception ait été levée, interceptée ou non."
    ],
    "examples": [
      {
        "stdin": "THROW HttpException StatusCode=404\nTHROW HttpException StatusCode=503\nTHROW TimeoutException StatusCode=408\nTHROW HttpException StatusCode=401",
        "expected": "Exception: HttpException (404) => Intercepte par: catch when (StatusCode == 404) [ClientError] | FINALLY execute\nException: HttpException (503) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute\nException: TimeoutException (408) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute\nException: HttpException (401) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute",
        "note": "Démonstration du routage conditionnel d'exceptions en C# via when."
      }
    ],
    "tests": [
      {
        "label": "Erreur 500 serveur interceptée",
        "stdin": "cas:1",
        "expected": "Exception: HttpException (500) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute"
      },
      {
        "label": "Timeout sans code http spécifique",
        "stdin": "cas:2",
        "expected": "Exception: TimeoutException (0) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute"
      },
      {
        "label": "Erreur 400 tombant dans le fallback global",
        "stdin": "cas:3",
        "expected": "Exception: HttpException (400) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute"
      }
    ],
    "solution": "[Exemple]\nException: HttpException (404) => Intercepte par: catch when (StatusCode == 404) [ClientError] | FINALLY execute\nException: HttpException (503) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute\nException: TimeoutException (408) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute\nException: HttpException (401) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute\n\n[Cas 1 — Erreur 500 serveur interceptée]\nException: HttpException (500) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute\n\n[Cas 2 — Timeout sans code http spécifique]\nException: TimeoutException (0) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute\n\n[Cas 3 — Erreur 400 tombant dans le fallback global]\nException: HttpException (400) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute"
  },
  {
    "id": "csb2-c4-e3",
    "chapter": 4,
    "title": "Validateur de contraintes génériques (where T : ...)",
    "level": "n3",
    "language": "analyse",
    "goal": "Vérifier la conformité de types candidats aux contraintes génériques d'une classe ou méthode C#.",
    "brief": "<p>En C#, les contraintes génériques (<code>where T : ...</code>) restreignent les types pouvant instancier une classe ou méthode :<br>\n- <code>class</code> : le type doit être un type référence (<code>IsClass=True</code>) ;<br>\n- <code>struct</code> : le type doit être un type valeur non nullable (<code>IsClass=False</code>) ;<br>\n- <code>new()</code> : le type doit avoir un constructeur public sans paramètre (<code>HasDefaultCtor=True</code>) ;<br>\n- <code>IComparable</code> : le type doit implémenter l'interface de comparaison (<code>ImplementsComparable=True</code>).<br>\nAnalysez les données fournies pour chaque cas.<br>\nIl doit évaluer chaque type et afficher sa validation ou la liste des violations constatées.</p>\n<p>Format de sortie :<br><code>Type &lt;Nom&gt;: VALIDE (Toutes contraintes respectees)</code><br><code>Type &lt;Nom&gt;: REJETE [Violation: &lt;Motif1&gt;, ...]</code></p>",
    "starter": "# Grille d'analyse (csb2-c4-e3) — Validateur de contraintes génériques (where T : ...)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Contrainte struct seule]\n# Données : CONSTRAINT where T : struct\n# Données : Candidate Nom=Point IsClass=False HasDefaultCtor=True ImplementsComparable=False\n# Données : Candidate Nom=Fenetre IsClass=True HasDefaultCtor=True ImplementsComparable=False\nA_COMPLETER\n\n[Cas 2 — Contrainte IComparable seule]\n# Données : CONSTRAINT where T : IComparable\n# Données : Candidate Nom=Chaine IsClass=True HasDefaultCtor=True ImplementsComparable=True\n# Données : Candidate Nom=Stream IsClass=True HasDefaultCtor=False ImplementsComparable=False\nA_COMPLETER\n\n[Cas 3 — Contraintes combinées avec double violation]\n# Données : CONSTRAINT where T : class, IComparable\n# Données : Candidate Nom=Entier IsClass=False HasDefaultCtor=True ImplementsComparable=False\nA_COMPLETER\n",
    "hints": [
      "Parse la première ligne pour extraire les mots-clés de contrainte (class, struct, new(), IComparable).",
      "Pour chaque type candidat, teste chaque contrainte déclarée.",
      "Si aucune violation n'est relevée, le type est VALIDE."
    ],
    "examples": [
      {
        "stdin": "CONSTRAINT where T : class, new(), IComparable\nCandidate Nom=Client IsClass=True HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Int32 IsClass=False HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Singleton IsClass=True HasDefaultCtor=False ImplementsComparable=True",
        "expected": "Type Client: VALIDE (Toutes contraintes respectees)\nType Int32: REJETE [Violation: non-class (struct)]\nType Singleton: REJETE [Violation: pas de constructeur sans argument new()]",
        "note": "Client satisfait les trois contraintes, Int32 est un type valeur, et Singleton n'a pas de constructeur sans argument public."
      }
    ],
    "tests": [
      {
        "label": "Contrainte struct seule",
        "stdin": "cas:1",
        "expected": "Type Point: VALIDE (Toutes contraintes respectees)\nType Fenetre: REJETE [Violation: non-struct (class)]"
      },
      {
        "label": "Contrainte IComparable seule",
        "stdin": "cas:2",
        "expected": "Type Chaine: VALIDE (Toutes contraintes respectees)\nType Stream: REJETE [Violation: n implemente pas IComparable]"
      },
      {
        "label": "Contraintes combinées avec double violation",
        "stdin": "cas:3",
        "expected": "Type Entier: REJETE [Violation: non-class (struct), n implemente pas IComparable]"
      }
    ],
    "solution": "[Exemple]\nType Client: VALIDE (Toutes contraintes respectees)\nType Int32: REJETE [Violation: non-class (struct)]\nType Singleton: REJETE [Violation: pas de constructeur sans argument new()]\n\n[Cas 1 — Contrainte struct seule]\nType Point: VALIDE (Toutes contraintes respectees)\nType Fenetre: REJETE [Violation: non-struct (class)]\n\n[Cas 2 — Contrainte IComparable seule]\nType Chaine: VALIDE (Toutes contraintes respectees)\nType Stream: REJETE [Violation: n implemente pas IComparable]\n\n[Cas 3 — Contraintes combinées avec double violation]\nType Entier: REJETE [Violation: non-class (struct), n implemente pas IComparable]"
  }
];
