'use strict';

const CS2_SOLUTIONS = {
  'csb2-c1-e1': String.raw`using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        var types = new Dictionary<string, string>(StringComparer.Ordinal);
        var valueTypes = new HashSet<string> { "int", "double", "bool", "char", "float", "long" };
        foreach (string instruction in Console.In.ReadToEnd().Split(';', StringSplitOptions.RemoveEmptyEntries))
        {
            Match declaration = Regex.Match(instruction.Trim(), @"^(int|double|bool|char|float|long|string|object)\s+([A-Za-z_]\w*)\s*=\s*(.+)$");
            if (!declaration.Success) throw new ArgumentException("Declaration invalide");
            string type = declaration.Groups[1].Value;
            string variable = declaration.Groups[2].Value;
            string expression = declaration.Groups[3].Value.Trim();
            string memory = valueTypes.Contains(type) ? "Stack" : "Heap";
            string operation = "ALLOCATION";
            Match cast = Regex.Match(expression, @"^\((int|double|bool|char|float|long)\)\s*([A-Za-z_]\w*)$");
            if (cast.Success && types.TryGetValue(cast.Groups[2].Value, out string castSource) && castSource == "object")
                operation = "UNBOXING";
            else if (types.TryGetValue(expression, out string sourceType))
            {
                if (type == "object" && valueTypes.Contains(sourceType)) operation = "BOXING";
                else operation = valueTypes.Contains(type) ? "COPIE_VALEUR" : "COPIE_REF";
            }
            else if (type == "object" && Regex.IsMatch(expression, @"^(?:[-+]?\d+(?:\.\d+)?[dDfFlL]?|true|false|'[^']')$"))
                operation = "BOXING";
            types[variable] = type;
            Console.WriteLine(variable + ": Type=" + type + " | Mem=" + memory + " | Op=" + operation);
        }
    }
}`,
  'csb2-c1-e2': String.raw`using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

class ExpressionParser
{
    readonly string expression;
    readonly Func<string, int> read;
    int position;

    public ExpressionParser(string expression, Func<string, int> read)
    {
        this.expression = expression;
        this.read = read;
    }

    void SkipSpaces()
    {
        while (position < expression.Length && char.IsWhiteSpace(expression[position])) position++;
    }

    bool Consume(char symbol)
    {
        SkipSpaces();
        if (position >= expression.Length || expression[position] != symbol) return false;
        position++;
        return true;
    }

    int Atom()
    {
        SkipSpaces();
        if (Consume('+')) return Atom();
        if (Consume('-'))
        {
            SkipSpaces();
            if (position < expression.Length && char.IsDigit(expression[position]))
            {
                int numberStart = position;
                while (position < expression.Length && char.IsDigit(expression[position])) position++;
                return int.Parse("-" + expression.Substring(numberStart, position - numberStart), NumberStyles.AllowLeadingSign, CultureInfo.InvariantCulture);
            }
            return -Atom();
        }
        if (Consume('('))
        {
            int result = Sum();
            if (!Consume(')')) throw new ArgumentException("Parenthese manquante");
            return result;
        }
        int start = position;
        while (position < expression.Length && (char.IsLetterOrDigit(expression[position]) || expression[position] == '_')) position++;
        if (position == start) throw new ArgumentException("Operande manquant");
        string token = expression.Substring(start, position - start);
        return int.TryParse(token, NumberStyles.None, CultureInfo.InvariantCulture, out int number) ? number : read(token);
    }

    int Product()
    {
        int result = Atom();
        while (true)
        {
            if (Consume('*')) result *= Atom();
            else if (Consume('/')) result /= Atom();
            else if (Consume('%')) result %= Atom();
            else return result;
        }
    }

    int Sum()
    {
        int result = Product();
        while (true)
        {
            if (Consume('+')) result += Product();
            else if (Consume('-')) result -= Product();
            else return result;
        }
    }

    public int Parse()
    {
        int result = Sum();
        SkipSpaces();
        if (position != expression.Length) throw new ArgumentException("Expression invalide");
        return result;
    }
}

class Program
{
    static string Show(SortedDictionary<string, int> values)
    {
        return string.Join(", ", values.Select(item => item.Key + "=" + item.Value.ToString(CultureInfo.InvariantCulture)));
    }

    static void Main()
    {
        string[] lines = Console.In.ReadToEnd().Replace("\r\n", "\n").Trim().Split('\n');
        var caller = new SortedDictionary<string, int>(StringComparer.Ordinal);
        foreach (string item in lines[0].Substring("INIT ".Length).Split(','))
        {
            string[] parts = item.Trim().Split('=');
            caller[parts[0].Trim()] = int.Parse(parts[1].Trim(), CultureInfo.InvariantCulture);
        }
        Console.WriteLine("ETAT_INITIAL: " + Show(caller));
        Match signature = Regex.Match(lines[1], @"^METHOD\s+(\w+)\((.*)\)$");
        Match call = Regex.Match(lines[3], @"^CALL\s+(\w+)\((.*)\)$");
        if (!signature.Success || !call.Success || signature.Groups[1].Value != call.Groups[1].Value)
            throw new ArgumentException("Appel invalide");
        Console.WriteLine("METHODE: " + signature.Groups[1].Value);
        string[] parameters = signature.Groups[2].Value.Split(',', StringSplitOptions.RemoveEmptyEntries);
        string[] arguments = call.Groups[2].Value.Split(',', StringSplitOptions.RemoveEmptyEntries);
        if (parameters.Length != arguments.Length) throw new ArgumentException("Nombre d'arguments invalide");
        var locals = new Dictionary<string, int>(StringComparer.Ordinal);
        var references = new Dictionary<string, string>(StringComparer.Ordinal);
        for (int index = 0; index < parameters.Length; index++)
        {
            string[] parameter = parameters[index].Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            string[] argument = arguments[index].Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            string argumentName = argument[argument.Length - 1];
            if (parameter[0] == "val") locals[parameter[1]] = caller[argumentName];
            else references[parameter[1]] = argumentName;
        }
        int Read(string name)
        {
            return references.TryGetValue(name, out string target) ? caller[target] : locals[name];
        }
        void Write(string name, int value)
        {
            if (references.TryGetValue(name, out string target)) caller[target] = value;
            else locals[name] = value;
        }
        foreach (string statement in lines[2].Substring("BODY ".Length).Split(';', StringSplitOptions.RemoveEmptyEntries))
        {
            string[] assignment = statement.Split('=', 2);
            int value = new ExpressionParser(assignment[1], Read).Parse();
            Write(assignment[0].Trim(), value);
        }
        Console.WriteLine("ETAT_FINAL: " + Show(caller));
    }
}`,
  'csb2-c2-e3': String.raw`using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static Dictionary<string, string> Properties(string[] fields, int start)
    {
        var properties = new Dictionary<string, string>(StringComparer.Ordinal);
        for (int index = start; index < fields.Length; index++)
        {
            string[] assignment = fields[index].Split('=', 2);
            properties.Add(assignment[0], assignment[1]);
        }
        return properties;
    }

    static string Show(Dictionary<string, string> properties)
    {
        return "Record { " + string.Join(", ", properties.Select(item => item.Key + " = " + item.Value)) + " }";
    }

    static void Main()
    {
        var records = new Dictionary<string, Dictionary<string, string>>(StringComparer.Ordinal);
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            if (fields[0] == "RECORD")
            {
                records[fields[1]] = Properties(fields, 2);
                Console.WriteLine("CREATE: " + fields[1] + " => " + Show(records[fields[1]]));
            }
            else if (fields[0] == "WITH")
            {
                var copy = new Dictionary<string, string>(records[fields[3]], StringComparer.Ordinal);
                foreach (var change in Properties(fields, 4)) copy[change.Key] = change.Value;
                records[fields[1]] = copy;
                Console.WriteLine("WITH: " + fields[1] + " => " + Show(copy));
            }
            else if (fields[0] == "COMPARE")
            {
                var left = records[fields[1]];
                var right = records[fields[2]];
                bool equal = left.Count == right.Count && left.All(item => right.TryGetValue(item.Key, out string value) && value == item.Value);
                string suffix = equal && fields[1] != fields[2] ? " (Egalite structurelle)" : "";
                Console.WriteLine("EQUALS: " + fields[1] + " == " + fields[2] + " => " + equal + suffix);
            }
        }
    }
}`,
  'csb2-c4-e3': String.raw`using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        string first = Console.ReadLine();
        var constraints = new HashSet<string>(first.Substring(first.IndexOf(':') + 1).Split(',').Select(item => item.Trim()), StringComparer.Ordinal);
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            var candidate = fields.Skip(1).Select(item => item.Split('=', 2)).ToDictionary(item => item[0], item => item[1], StringComparer.Ordinal);
            bool isClass = bool.Parse(candidate["IsClass"]);
            bool hasDefault = bool.Parse(candidate["HasDefaultCtor"]);
            bool comparable = bool.Parse(candidate["ImplementsComparable"]);
            var violations = new List<string>();
            if (constraints.Contains("class") && !isClass) violations.Add("non-class (struct)");
            if (constraints.Contains("struct") && isClass) violations.Add("non-struct (class)");
            if (constraints.Contains("new()") && !hasDefault) violations.Add("pas de constructeur sans argument new()");
            if (constraints.Contains("IComparable") && !comparable) violations.Add("n implemente pas IComparable");
            string result = violations.Count == 0 ? "VALIDE (Toutes contraintes respectees)" : "REJETE [Violation: " + string.Join(", ", violations) + "]";
            Console.WriteLine("Type " + candidate["Nom"] + ": " + result);
        }
    }
}`,
  'csb2-c1-e3': String.raw`using System;
using System.Globalization;

class Program
{
    static string Field(string[] fields, string name)
    {
        foreach (string field in fields)
            if (field.StartsWith(name + "=", StringComparison.Ordinal))
                return field.Substring(name.Length + 1);
        throw new ArgumentException("Propriete manquante : " + name);
    }

    static void Main()
    {
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            if (fields[0] == "Circle")
            {
                string radiusText = Field(fields, "Radius");
                decimal radius = decimal.Parse(radiusText, CultureInfo.InvariantCulture);
                string category = radius > 10m ? "GrandCercle" : "PetitCercle";
                decimal area = 3.14m * radius * radius;
                Console.WriteLine("Circle (r=" + radiusText + ") => " + category + " | Aire=" + area.ToString("F2", CultureInfo.InvariantCulture));
            }
            else if (fields[0] == "Rectangle")
            {
                string widthText = Field(fields, "Width");
                string heightText = Field(fields, "Height");
                decimal width = decimal.Parse(widthText, CultureInfo.InvariantCulture);
                decimal height = decimal.Parse(heightText, CultureInfo.InvariantCulture);
                string category = width == height ? "Carre" : "Rectangle";
                Console.WriteLine("Rectangle (" + widthText + "x" + heightText + ") => " + category + " | Aire=" + (width * height).ToString("F2", CultureInfo.InvariantCulture));
            }
            else
            {
                Console.WriteLine(fields[0] + " => FormeNonSupportee | Aire=0.00");
            }
        }
    }
}`,
  'csb2-c2-e1': String.raw`using System;
using System.Globalization;
using System.Text.RegularExpressions;

class Program
{
    static string Money(decimal value)
    {
        return value.ToString("F2", CultureInfo.InvariantCulture);
    }

    static void Main()
    {
        string first = Console.ReadLine();
        Match initial = Regex.Match(first, @"^INIT\s+Titulaire=""([^""]*)""\s+Solde=(\S+)\s*$");
        string holder = initial.Groups[1].Value;
        decimal balance = decimal.Parse(initial.Groups[2].Value, CultureInfo.InvariantCulture);
        Console.WriteLine("Compte: " + holder + " | Solde initial: " + Money(balance));
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            string operation = fields[0];
            decimal amount = decimal.Parse(fields[1], CultureInfo.InvariantCulture);
            string prefix = operation + " " + Money(amount) + " => ";
            if (amount <= 0m)
                Console.WriteLine(prefix + "Rejet: ArgumentException (Montant invalide)");
            else if (operation == "RETRAIT" && amount > balance)
                Console.WriteLine(prefix + "Rejet: InvalidOperationException (Solde insuffisant)");
            else
            {
                balance += operation == "DEPOT" ? amount : -amount;
                Console.WriteLine(prefix + "Succes | Nouveau solde: " + Money(balance));
            }
        }
        Console.WriteLine("SOLDE_FINAL: " + Money(balance));
    }
}`,
  'csb2-c2-e2': String.raw`using System;
using System.Globalization;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            if (string.IsNullOrWhiteSpace(line)) continue;
            string call = line.Trim().Substring("NEW ".Length);
            MatchCollection arguments = Regex.Matches(call, @"""(?<text>[^""]*)""|(?<number>[-+]?(?:\d+(?:\.\d+)?|\.\d+))");
            string reference = arguments[0].Groups["text"].Value;
            string name = "Sans nom";
            decimal price = 0m;
            string chain = "ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix)";
            if (arguments.Count >= 2)
            {
                name = arguments[1].Groups["text"].Value;
                chain = "ctor(r, nom) -> ctor(r, nom, prix)";
            }
            if (arguments.Count == 3)
            {
                price = decimal.Parse(arguments[2].Groups["number"].Value, CultureInfo.InvariantCulture);
                chain = "ctor(r, nom, prix)";
            }
            Console.WriteLine(call + " => Chaine: " + chain + " | Objet: [Ref=" + reference + ", Nom=" + name + ", Prix=" + decimal.Round(price, 2, MidpointRounding.AwayFromZero).ToString("F2", CultureInfo.InvariantCulture) + "]");
        }
    }
}`,
  'csb2-c3-e1': String.raw`using System;

class Program
{
    static void Main()
    {
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            string reference = fields[1];
            string instance = fields[3];
            string method = fields[5];
            string executingClass;
            string tag;
            if (method == "Afficher")
            {
                executingClass = instance;
                tag = instance == "Base" ? "[virtual]" : reference == "Base" ? "[virtual/override dynamique]" : "[override]";
            }
            else
            {
                executingClass = reference;
                tag = reference == "Base" && instance == "Derived" ? "[new masqueur statique]" : reference == "Derived" ? "[new]" : "[direct]";
            }
            Console.WriteLine(reference + "->" + instance + ": " + method + "() => " + executingClass + "." + method + " " + tag);
        }
    }
}`,
  'csb2-c3-e2': String.raw`using System;

class Program
{
    static void Main()
    {
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            if (fields[0] == "DIRECT")
                Console.WriteLine("DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)");
            else if (fields[1] == "IExportable")
                Console.WriteLine("IExportable.Traiter => Export JSON genere avec succes");
            else if (fields[1] == "IAuditable")
                Console.WriteLine("IAuditable.Traiter => Audit journalise dans le registre de conformite");
        }
    }
}`,
  'csb2-c3-e3': String.raw`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var steps = new Dictionary<string, (string First, string Second)>
        {
            ["Virement"] = ("[1. Valider IBAN et solde]", "[2. Debiter compte et crediter tiers]"),
            ["Facture"] = ("[1. Valider TVA et lignes]", "[2. Calculer totaux et generer PDF]"),
            ["Inscription"] = ("[1. Valider unicite email]", "[2. Creer compte utilisateur en base]")
        };
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            var selected = steps[fields[1]];
            Console.WriteLine("Pipeline " + fields[1] + ": " + selected.First + " -> " + selected.Second + " -> [3. Notification globale envoyee]");
        }
    }
}`,
  'csb2-c4-e1': String.raw`using System;
using System.Collections.Generic;
using System.Globalization;

class Program
{
    static void Main()
    {
        var values = new Dictionary<string, int>(StringComparer.Ordinal);
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            string key = fields[1];
            if (fields[0] == "ADD")
            {
                int value = int.Parse(fields[2], CultureInfo.InvariantCulture);
                values[key] = value;
                Console.WriteLine("ADD: " + key + " => " + value + " (Taille=" + values.Count + ")");
            }
            else if (fields[0] == "GET")
            {
                if (!values.TryGetValue(key, out int value))
                {
                    Console.WriteLine("GET: " + key + " => CRASH KeyNotFoundException (Cle absente du dictionnaire)");
                    break;
                }
                Console.WriteLine("GET: " + key + " => " + value);
            }
            else if (fields[0] == "TRYGET")
            {
                if (values.TryGetValue(key, out int value))
                    Console.WriteLine("TRYGET: " + key + " => Trouve: " + value);
                else
                    Console.WriteLine("TRYGET: " + key + " => NonTrouve (out val=0)");
            }
        }
    }
}`,
  'csb2-c4-e2': String.raw`using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            string type = fields[1];
            int status = int.Parse(fields[2].Substring("StatusCode=".Length), CultureInfo.InvariantCulture);
            string handler;
            if (type == "HttpException" && status == 404)
                handler = "catch when (StatusCode == 404) [ClientError]";
            else if (type == "HttpException" && status >= 500)
                handler = "catch when (StatusCode >= 500) [ServerError]";
            else if (type == "TimeoutException")
                handler = "catch (TimeoutException) [DelaiDepasse]";
            else
                handler = "catch (Exception) [FallbackGlobal]";
            Console.WriteLine("Exception: " + type + " (" + status + ") => Intercepte par: " + handler + " | FINALLY execute");
        }
    }
}`,
  'csb2-c5-e1': String.raw`using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

class Program
{
    static void Main()
    {
        string first = Console.ReadLine();
        string[] filter = first.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        decimal threshold = decimal.Parse(filter[filter.Length - 1], CultureInfo.InvariantCulture);
        var articles = new List<(string Name, decimal Price)>();
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            string name = fields[1].Substring("Nom=".Length);
            decimal price = decimal.Parse(fields[2].Substring("Prix=".Length), CultureInfo.InvariantCulture);
            articles.Add((name, price));
        }
        var results = articles.Where(article => article.Price >= threshold)
            .OrderByDescending(article => article.Price).ToList();
        Console.WriteLine("LINQ: Declenchement ToList() (Evaluation differee terminee)");
        foreach (var article in results)
            Console.WriteLine("Resultat: " + article.Name + " - " + article.Price.ToString("F2", CultureInfo.InvariantCulture));
        Console.WriteLine("TOTAL_ELEMENTS: " + results.Count);
    }
}`,
  'csb2-c5-e2': String.raw`using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

class Program
{
    static void Main()
    {
        var purchases = new List<(string Category, decimal Amount)>();
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            purchases.Add((fields[1], decimal.Parse(fields[2], CultureInfo.InvariantCulture)));
        }
        var groups = purchases.GroupBy(purchase => purchase.Category)
            .OrderBy(group => group.Key, StringComparer.CurrentCulture);
        foreach (var group in groups)
        {
            decimal total = group.Sum(purchase => purchase.Amount);
            decimal average = group.Average(purchase => purchase.Amount);
            Console.WriteLine("Groupe: " + group.Key + " | NbAchats: " + group.Count() + " | Total: " + total.ToString("F2", CultureInfo.InvariantCulture) + " | Moyenne: " + average.ToString("F2", CultureInfo.InvariantCulture));
        }
    }
}`,
  'csb2-c5-e3': String.raw`using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        var subscribers = new List<string>();
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            if (line.StartsWith("SUBSCRIBE ", StringComparison.Ordinal))
            {
                string name = line.Substring("SUBSCRIBE ".Length).Trim();
                subscribers.Add(name);
            }
            else if (line.StartsWith("UNSUBSCRIBE ", StringComparison.Ordinal))
            {
                string name = line.Substring("UNSUBSCRIBE ".Length).Trim();
                int index = subscribers.LastIndexOf(name);
                if (index >= 0) subscribers.RemoveAt(index);
            }
            else if (line.StartsWith("EMIT ", StringComparison.Ordinal))
            {
                string message = line.Substring("EMIT ".Length);
                foreach (string subscriber in subscribers)
                    Console.WriteLine("EVENT " + message + " => " + subscriber + " recoit la notification");
            }
        }
    }
}`,
  'csb2-c6-e1': String.raw`using System;
using System.Globalization;
using System.Numerics;

class Program
{
    static void Main()
    {
        BigInteger time = BigInteger.Zero;
        bool first = true;
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            string[] fields = line.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (fields.Length == 0) continue;
            string name = fields[1];
            string durationText = fields[2].Substring("Duree=".Length);
            BigInteger duration = BigInteger.Parse(durationText.Substring(0, durationText.Length - 2), CultureInfo.InvariantCulture);
            if (first)
                Console.WriteLine("[T=" + time + "ms] Demarrage " + name + " -> Await (trace simulee)");
            else
                Console.WriteLine("[T=" + time + "ms] Reprise contexte -> Demarrage " + name + " -> Await");
            first = false;
            time += duration;
        }
        Console.WriteLine("[T=" + time + "ms] Tache completee avec succes. Duree totale=" + time + "ms");
    }
}`,
  'csb2-c6-e2': String.raw`using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        int successes = 0;
        var errors = new List<string>();
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            if (string.IsNullOrWhiteSpace(line)) continue;
            Match match = Regex.Match(line, @"^TASK\s+\S+\s+Status=(OK|FAIL)(?:\s+Error=""(.*)"")?\s*$");
            if (match.Groups[1].Value == "OK")
                successes++;
            else
                errors.Add(match.Groups[2].Value);
        }
        Console.WriteLine("WHENALL: " + successes + " succes, " + errors.Count + " echecs");
        if (errors.Count == 0)
            Console.WriteLine("Execution terminee sans exception");
        else
        {
            Console.WriteLine("AggregateException observee (" + errors.Count + " erreurs):");
            for (int index = 0; index < errors.Count; index++)
                Console.WriteLine("- Erreur " + (index + 1) + ": " + errors[index]);
        }
    }
}`,
  'csb2-c6-e3': String.raw`using System;

class Program
{
    static void Main()
    {
        string[] resource = Console.ReadLine().Split(' ', StringSplitOptions.RemoveEmptyEntries);
        string name = resource[1];
        string handle = resource[2].Substring("ALLOCATE=".Length);
        Console.WriteLine("[ALLOC] " + name + " alloue (Handle=" + handle + ")");
        string line;
        while ((line = Console.ReadLine()) != null)
        {
            if (line.StartsWith("OP ", StringComparison.Ordinal))
                Console.WriteLine("[EXEC] Op " + line.Substring(3));
            else if (line.StartsWith("THROW ", StringComparison.Ordinal))
            {
                Console.WriteLine("[CRASH] Exception " + line.Substring(6) + " intercepte");
                break;
            }
            else if (line == "EXIT") break;
        }
        Console.WriteLine("[DISPOSE] " + name + " libere via IDisposable");
    }
}`
};

const CS2_EXERCISES = [
  {
    "id": "csb2-c1-e1",
    "chapter": 1,
    "title": "Détecteur de Boxing/Unboxing et allocation Stack vs Heap",
    "level": "n1",
    "language": "csharp",
    "goal": "Analyser une suite d'instructions C# pour détecter les opérations de boxing/unboxing et localiser les données en mémoire.",
    "brief": "<p>Dans cet atelier, simulez un classement simplifié des déclarations C#. Les instructions sont séparées par des points-virgules ; chacune affecte à une variable un littéral, une variable déjà déclarée ou un cast explicite depuis <code>object</code>. Les noms utilisent des lettres, chiffres et traits de soulignement. Les littéraux sont des entiers ou décimaux sans exposant, des booléens, des caractères simples ou des chaînes sans point-virgule ; les suffixes numériques admis sont f, d et l.<br>Pour chaque déclaration, indiquez le nom et le type, puis l'opération : <code>ALLOCATION</code>, <code>BOXING</code>, <code>UNBOXING</code>, <code>COPIE_VALEUR</code> ou <code>COPIE_REF</code>.<br>Pour les besoins de cette simulation uniquement, affichez <code>Stack</code> pour les types valeur <code>int</code>, <code>double</code>, <code>bool</code>, <code>char</code>, <code>float</code> et <code>long</code>, et <code>Heap</code> pour <code>string</code> et <code>object</code>. Ce classement n'est pas une règle générale de stockage : une valeur peut aussi se trouver dans un objet sur le tas.</p><p>Format de sortie :<br><code>&lt;variable&gt;: Type=&lt;type&gt; | Mem=&lt;Stack|Heap&gt; | Op=&lt;Operation&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c1-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Un cast de type (int)obj vers un type valeur constitue un UNBOXING.",
      "L'assignation d'une variable de type valeur à une variable de type object déclenche un BOXING.",
      "Dans le modèle simplifié de cet atelier, les types valeur sont étiquetés Stack et les types référence Heap."
    ],
    "examples": [
      {
        "stdin": "int a = 42; object o = a; int b = (int)o; string s = \"test\";",
        "expected": "a: Type=int | Mem=Stack | Op=ALLOCATION\no: Type=object | Mem=Heap | Op=BOXING\nb: Type=int | Mem=Stack | Op=UNBOXING\ns: Type=string | Mem=Heap | Op=ALLOCATION",
        "note": "Allocation primitive, puis boxing vers object, unboxing vers int, et chaîne sur le Heap."
      }
    ],
    "tests": [
      {
        "label": "Boxing et unboxing successifs",
        "stdin": "int x = 100; object box = x; int y = (int)box;",
        "expected": "x: Type=int | Mem=Stack | Op=ALLOCATION\nbox: Type=object | Mem=Heap | Op=BOXING\ny: Type=int | Mem=Stack | Op=UNBOXING"
      },
      {
        "label": "Copie de types valeur et référence",
        "stdin": "int n1 = 10; int n2 = n1; string s1 = \"hello\"; string s2 = s1;",
        "expected": "n1: Type=int | Mem=Stack | Op=ALLOCATION\nn2: Type=int | Mem=Stack | Op=COPIE_VALEUR\ns1: Type=string | Mem=Heap | Op=ALLOCATION\ns2: Type=string | Mem=Heap | Op=COPIE_REF"
      },
      {
        "label": "Types mixtes avec double et boolean",
        "stdin": "double pi = 3.14; bool actif = true; object o = actif; bool verif = (bool)o;",
        "expected": "pi: Type=double | Mem=Stack | Op=ALLOCATION\nactif: Type=bool | Mem=Stack | Op=ALLOCATION\no: Type=object | Mem=Heap | Op=BOXING\nverif: Type=bool | Mem=Stack | Op=UNBOXING"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c1-e1"]
  },
  {
    "id": "csb2-c1-e2",
    "chapter": 1,
    "title": "Passage d'arguments par valeur, référence (ref) et sortie (out)",
    "level": "n2",
    "language": "csharp",
    "goal": "Simuler l'exécution d'une méthode C# recevant des paramètres par valeur, ref et out.",
    "brief": "<p>Votre programme C# lit un cas sur quatre lignes :<br>- <code>INIT &lt;nom&gt;=&lt;valeur&gt;, ...</code> : variables entières de l'appelant ;<br>- <code>METHOD &lt;Nom&gt;(&lt;mod1&gt; &lt;p1&gt;, &lt;mod2&gt; &lt;p2&gt;...)</code> : signature, avec les modes <code>val</code>, <code>ref</code> ou <code>out</code> ;<br>- <code>BODY &lt;instr1&gt;; &lt;instr2&gt;...</code> : affectations dans l'ordre ;<br>- <code>CALL &lt;Nom&gt;(&lt;arg1&gt;, [ref|out] &lt;arg2&gt;...)</code> : variables passées à la méthode.<br>Les expressions entières acceptent les variables, les parenthèses et les opérateurs <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code> avec les priorités de C#. La division entière tronque vers zéro. Les diviseurs sont non nuls et les calculs tiennent dans un entier 32 bits. Une variable temporaire peut être créée par une affectation. Un paramètre <code>out</code> est affecté avant d'être lu.<br>Les paramètres <code>ref</code> et <code>out</code> désignent les variables de l'appelant : deux paramètres peuvent désigner la même variable. Un paramètre <code>val</code> reçoit une copie.</p><p>Affichez les variables de l'appelant triées alphabétiquement :<br><code>ETAT_INITIAL: a=&lt;val&gt;, b=&lt;val&gt;...</code><br><code>METHODE: &lt;Nom&gt;</code><br><code>ETAT_FINAL: a=&lt;val&gt;, b=&lt;val&gt;...</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c1-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Les paramètres \"val\" reçoivent une copie locale qui ne modifie pas l'appelant.",
      "Les paramètres \"ref\" et \"out\" pointent vers la variable de l'appelant : toute modification locale doit être répercutée.",
      "Affichez les variables triées par ordre alphabétique sous le format nom=valeur."
    ],
    "examples": [
      {
        "stdin": "INIT a=10, b=20, c=0\nMETHOD Modifier(val x, ref y, out z)\nBODY x=x*2; y=y+50; z=x+y\nCALL Modifier(a, ref b, out c)",
        "expected": "ETAT_INITIAL: a=10, b=20, c=0\nMETHODE: Modifier\nETAT_FINAL: a=10, b=70, c=90",
        "note": "x reste local (a inchangé), b est modifié par ref, et c reçoit la valeur de sortie z."
      }
    ],
    "tests": [
      {
        "label": "Echange de deux entiers par référence ref",
        "stdin": "INIT x=5, y=99\nMETHOD Swap(ref a, ref b)\nBODY temp=a; a=b; b=temp\nCALL Swap(ref x, ref y)",
        "expected": "ETAT_INITIAL: x=5, y=99\nMETHODE: Swap\nETAT_FINAL: x=99, y=5"
      },
      {
        "label": "Division euclidienne avec quotient et reste en out",
        "stdin": "INIT dividende=17, diviseur=5, q=0, r=0\nMETHOD DivRem(val d, val s, out quot, out rem)\nBODY quot=d/s; rem=d%s\nCALL DivRem(dividende, diviseur, out q, out r)",
        "expected": "ETAT_INITIAL: dividende=17, diviseur=5, q=0, r=0\nMETHODE: DivRem\nETAT_FINAL: dividende=17, diviseur=5, q=3, r=2"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c1-e2"]
  },
  {
    "id": "csb2-c1-e3",
    "chapter": 1,
    "title": "Moteur de Pattern Matching et Switch Expressions C#",
    "level": "n3",
    "language": "csharp",
    "goal": "Évaluer une suite d'objets géométriques via une switch expression C# avec filtres conditionnels when.",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In).<br>\nIl doit simuler l'évaluation d'une expression <code>switch</code> C# moderne :<br>\n- <code>Circle c when c.Radius &gt; 10</code> =&gt; <code>GrandCercle</code> (Aire = <code>3.14 * r * r</code>) ;<br>\n- <code>Circle c</code> =&gt; <code>PetitCercle</code> (Aire = <code>3.14 * r * r</code>) ;<br>\n- <code>Rectangle r when r.Width == r.Height</code> =&gt; <code>Carre</code> (Aire = <code>w * h</code>) ;<br>\n- <code>Rectangle r</code> =&gt; <code>Rectangle</code> (Aire = <code>w * h</code>) ;<br>\n- Discard <code>_</code> =&gt; <code>FormeNonSupportee</code> (Aire = 0.00).</p>\n<p>Format de sortie :<br><code>&lt;DescriptionInitiale&gt; =&gt; &lt;Categorie&gt; | Aire=&lt;Valeur2Dec&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c1-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Extrayez le type et les propriétés clés-valeurs de chaque forme.",
      "Dans une switch expression C#, l'ordre des branches est crucial : les gardes \"when\" plus spécifiques doivent précéder les cas généraux.",
      "Formatez les aires avec deux décimales, par exemple avec le format C# F2 et la culture invariante."
    ],
    "examples": [
      {
        "stdin": "Circle Radius=12\nCircle Radius=4\nRectangle Width=5 Height=5\nRectangle Width=8 Height=3\nTriangle Base=4 Height=6",
        "expected": "Circle (r=12) => GrandCercle | Aire=452.16\nCircle (r=4) => PetitCercle | Aire=50.24\nRectangle (5x5) => Carre | Aire=25.00\nRectangle (8x3) => Rectangle | Aire=24.00\nTriangle => FormeNonSupportee | Aire=0.00",
        "note": "Switch pattern matching avec filtre conditionnel when sur le rayon et égalité largeur/hauteur."
      }
    ],
    "tests": [
      {
        "label": "Cercles frontière de rayon 10",
        "stdin": "Circle Radius=10\nCircle Radius=11",
        "expected": "Circle (r=10) => PetitCercle | Aire=314.00\nCircle (r=11) => GrandCercle | Aire=379.94"
      },
      {
        "label": "Carré parfait et rectangle allongé",
        "stdin": "Rectangle Width=10 Height=10\nRectangle Width=2 Height=20",
        "expected": "Rectangle (10x10) => Carre | Aire=100.00\nRectangle (2x20) => Rectangle | Aire=40.00"
      },
      {
        "label": "Formes non supportées capturées par discard _",
        "stdin": "Polygon Sides=6\nHexagon Length=5",
        "expected": "Polygon => FormeNonSupportee | Aire=0.00\nHexagon => FormeNonSupportee | Aire=0.00"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c1-e3"]
  },
  {
    "id": "csb2-c2-e1",
    "chapter": 2,
    "title": "Propriétés auto-implémentées et validation get / set",
    "level": "n1",
    "language": "csharp",
    "goal": "Simuler l'encapsulation d'un compte bancaire C# avec validation stricte sur les accesseurs de propriété.",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In). La première ligne est <code>INIT Titulaire=\"&lt;Nom&gt;\" Solde=&lt;Montant&gt;</code>. Chaque ligne suivante est une opération <code>DEPOT &lt;Montant&gt;</code> ou <code>RETRAIT &lt;Montant&gt;</code>.<br>\nLes montants des opérations doivent être strictement positifs : sinon, l'opération est rejetée avec <code>ArgumentException (Montant invalide)</code>. Un retrait supérieur au solde est rejeté avec <code>InvalidOperationException (Solde insuffisant)</code> ; un retrait égal au solde est accepté.<br>\nAffichez le résumé initial, chaque opération avec son issue, puis le solde final.</p>\n<p>Format de sortie :<br><code>Compte: &lt;Titulaire&gt; | Solde initial: &lt;Montant2Dec&gt;</code><br><code>DEPOT &lt;Montant2Dec&gt; =&gt; Succes | Nouveau solde: &lt;Montant2Dec&gt;</code><br><code>RETRAIT &lt;Montant2Dec&gt; =&gt; Rejet: &lt;TypeException&gt; (&lt;Motif&gt;)</code><br><code>SOLDE_FINAL: &lt;Montant2Dec&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c2-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Gardez une trace du titulaire et du solde courant.",
      "Vérifiez que les montants de dépôt et retrait sont strictement positifs.",
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
        "stdin": "INIT Titulaire=\"Bob\" Solde=250.0\nDEPOT -20.0\nRETRAIT 50.0",
        "expected": "Compte: Bob | Solde initial: 250.00\nDEPOT -20.00 => Rejet: ArgumentException (Montant invalide)\nRETRAIT 50.00 => Succes | Nouveau solde: 200.00\nSOLDE_FINAL: 200.00"
      },
      {
        "label": "Retrait du montant exact ramenant le solde à zéro",
        "stdin": "INIT Titulaire=\"Charlie\" Solde=80.0\nRETRAIT 80.0",
        "expected": "Compte: Charlie | Solde initial: 80.00\nRETRAIT 80.00 => Succes | Nouveau solde: 0.00\nSOLDE_FINAL: 0.00"
      },
      {
        "label": "Retrait sur compte vide",
        "stdin": "INIT Titulaire=\"David\" Solde=0.0\nRETRAIT 10.0",
        "expected": "Compte: David | Solde initial: 0.00\nRETRAIT 10.00 => Rejet: InvalidOperationException (Solde insuffisant)\nSOLDE_FINAL: 0.00"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c2-e1"]
  },
  {
    "id": "csb2-c2-e2",
    "chapter": 2,
    "title": "Chaînage de constructeurs C# avec constructeur primaire et : this()",
    "level": "n2",
    "language": "csharp",
    "goal": "Simuler le chaînage d'appels de constructeurs C# surchargés via l'initialiseur : this().",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In). Chaque ligne appelle un constructeur :<br>\n- <code>NEW Article(\"&lt;Ref&gt;\")</code> délègue à <code>this(r, \"Sans nom\")</code> ;<br>\n- <code>NEW Article(\"&lt;Ref&gt;\", \"&lt;Nom&gt;\")</code> délègue à <code>this(r, nom, 0.0)</code> ;<br>\n- <code>NEW Article(\"&lt;Ref&gt;\", \"&lt;Nom&gt;\", &lt;Prix&gt;)</code> appelle le constructeur finalisant l'objet.<br>\nLe prix est en notation décimale simple, sans exposant ni séparateur de milliers, et représentable par <code>decimal</code>. Le point sépare la partie fractionnaire éventuelle ; le zéro initial est facultatif, par exemple <code>.75</code>. Arrondissez le prix au centime le plus proche ; en cas d'égalité, en s'éloignant de zéro.<br>\nPour chaque commande, indiquez la chaîne des constructeurs traversés et l'objet résultant.</p>\n<p>Format de sortie :<br><code>Article(...) =&gt; Chaine: &lt;Constructeur1&gt; -&gt; &lt;Constructeur2&gt;... | Objet: [Ref=&lt;Ref&gt;, Nom=&lt;Nom&gt;, Prix=&lt;Prix2Dec&gt;]</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c2-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Identifiez le nombre d'arguments passés pour déterminer quel constructeur est appelé en premier.",
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
        "stdin": "NEW Article(\"A001\")",
        "expected": "Article(\"A001\") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=A001, Nom=Sans nom, Prix=0.00]"
      },
      {
        "label": "Constructeur complet direct",
        "stdin": "NEW Article(\"ECR4K\", \"Ecran 4K\", 299.50)",
        "expected": "Article(\"ECR4K\", \"Ecran 4K\", 299.50) => Chaine: ctor(r, nom, prix) | Objet: [Ref=ECR4K, Nom=Ecran 4K, Prix=299.50]"
      },
      {
        "label": "Constructeur intermédiaire et bornes du prix",
        "stdin": "NEW Article(\"CASQ\", \"Casque Bluetooth\")\nNEW Article(\"MAX-DEC\", \"Borne\", 79228162514264337593543950335)\nNEW Article(\"MIN-DEC\", \"Borne\", -79228162514264337593543950335)",
        "expected": "Article(\"CASQ\", \"Casque Bluetooth\") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=CASQ, Nom=Casque Bluetooth, Prix=0.00]\nArticle(\"MAX-DEC\", \"Borne\", 79228162514264337593543950335) => Chaine: ctor(r, nom, prix) | Objet: [Ref=MAX-DEC, Nom=Borne, Prix=79228162514264337593543950335.00]\nArticle(\"MIN-DEC\", \"Borne\", -79228162514264337593543950335) => Chaine: ctor(r, nom, prix) | Objet: [Ref=MIN-DEC, Nom=Borne, Prix=-79228162514264337593543950335.00]"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c2-e2"]
  },
  {
    "id": "csb2-c2-e3",
    "chapter": 2,
    "title": "Records C# 9+ et mutabilité non destructive (with)",
    "level": "n3",
    "language": "csharp",
    "goal": "Simuler le comportement des records immuables C# et la création de copies via l'expression with.",
    "brief": "<p>Votre programme C# simule des records d'un même type fictif, dont les propriétés sont des valeurs textuelles sans espaces. Les commandes sont :<br>- <code>RECORD &lt;nom&gt; &lt;propriete&gt;=&lt;valeur&gt; ...</code> : création ;<br>- <code>WITH &lt;nouveau_nom&gt; FROM &lt;nom_source&gt; &lt;propModif&gt;=&lt;valModif&gt;...</code> : copie puis modification de propriétés existantes ;<br>- <code>COMPARE &lt;record1&gt; &lt;record2&gt;</code> : comparaison de toutes les propriétés, indépendamment de leur ordre.<br>Conservez l'ordre des propriétés pour l'affichage. Ici, <code>with</code> ne modifie pas le record source. Les records réels peuvent contenir des références : une copie <code>with</code> n'effectue pas nécessairement une copie profonde.</p><p>Format de sortie :<br><code>CREATE: &lt;nom&gt; =&gt; Record { &lt;k1&gt; = &lt;v1&gt;, ... }</code><br><code>WITH: &lt;nom&gt; =&gt; Record { &lt;k1&gt; = &lt;v1&gt;, ... }</code><br><code>EQUALS: &lt;r1&gt; == &lt;r2&gt; =&gt; True|False [ (Egalite structurelle)]</code> ; ajoutez la mention entre parenthèses pour deux records distincts égaux.</p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c2-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Un record C# possède une égalité par valeur automatique (égalité structurelle de toutes les propriétés).",
      "L'expression with copie toutes les propriétés du record source puis écrase celles spécifiées.",
      "Affichez \"(Egalite structurelle)\" lorsque deux records distincts possèdent les mêmes valeurs."
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
        "stdin": "RECORD p1 Ville=Paris CodePostal=75001 Pays=France\nWITH p2 FROM p1 Ville=Lyon CodePostal=69001\nCOMPARE p1 p2",
        "expected": "CREATE: p1 => Record { Ville = Paris, CodePostal = 75001, Pays = France }\nWITH: p2 => Record { Ville = Lyon, CodePostal = 69001, Pays = France }\nEQUALS: p1 == p2 => False"
      },
      {
        "label": "Clonage identique avec with vide",
        "stdin": "RECORD dev1 Nom=Bob Langage=CSharp\nWITH dev2 FROM dev1\nCOMPARE dev1 dev2",
        "expected": "CREATE: dev1 => Record { Nom = Bob, Langage = CSharp }\nWITH: dev2 => Record { Nom = Bob, Langage = CSharp }\nEQUALS: dev1 == dev2 => True (Egalite structurelle)"
      },
      {
        "label": "Création de deux records identiques directement",
        "stdin": "RECORD rA X=10 Y=20\nRECORD rB X=10 Y=20\nCOMPARE rA rB",
        "expected": "CREATE: rA => Record { X = 10, Y = 20 }\nCREATE: rB => Record { X = 10, Y = 20 }\nEQUALS: rA == rB => True (Egalite structurelle)"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c2-e3"]
  },
  {
    "id": "csb2-c3-e1",
    "chapter": 3,
    "title": "Polymorphisme dynamique (virtual/override) vs masquage (new)",
    "level": "n1",
    "language": "csharp",
    "goal": "Démontrer la différence d'appel entre une méthode polymorphique virtual/override et un masquage statique new.",
    "brief": "<p>En C#, une classe <code>Base</code> expose une méthode polymorphique <code>virtual void Afficher()</code> et une méthode non virtuelle <code>void Identifier()</code>.<br>\nUne classe dérivée <code>Derived</code> surcharge la première avec <code>override void Afficher()</code> et masque la seconde avec <code>new void Identifier()</code>.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In). Chaque ligne valide suit le format <code>REF &lt;TypeReference&gt; OBJ &lt;TypeInstance&gt; CALL &lt;Methode&gt;</code>.<br>\nIl doit déterminer quelle implémentation est exécutée selon la table des méthodes virtuelles (vtable dispatch) ou la liaison statique du compilateur.</p>\n<p>Format de sortie :<br><code>&lt;TypeReference&gt;-&gt;&lt;TypeInstance&gt;: &lt;NomMethode&gt;() =&gt; &lt;ClasseExecutant&gt;.&lt;NomMethode&gt; &lt;Tag&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c3-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Avec virtual/override, la méthode appelée dépend du type réel de l'objet à l'exécution (TypeInstance).",
      "Avec new (masquage statique), la méthode appelée dépend du type de la référence au moment de la compilation (TypeReference).",
      "Ajoutez le tag [virtual/override dynamique] ou [new masqueur statique] lorsque la référence est différente de l'instance."
    ],
    "examples": [
      {
        "stdin": "REF Base OBJ Derived CALL Afficher\nREF Base OBJ Derived CALL Identifier\nREF Derived OBJ Derived CALL Afficher\nREF Derived OBJ Derived CALL Identifier",
        "expected": "Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\nBase->Derived: Identifier() => Base.Identifier [new masqueur statique]\nDerived->Derived: Afficher() => Derived.Afficher [override]\nDerived->Derived: Identifier() => Derived.Identifier [new]",
        "note": "Afficher() résout vers Derived via vtable, tandis que Identifier() résout vers Base à cause du type de référence."
      }
    ],
    "tests": [
      {
        "label": "Appels sur instance Base pure",
        "stdin": "REF Base OBJ Base CALL Afficher\nREF Base OBJ Base CALL Identifier",
        "expected": "Base->Base: Afficher() => Base.Afficher [virtual]\nBase->Base: Identifier() => Base.Identifier [direct]"
      },
      {
        "label": "Appel masqué new avec référence Base",
        "stdin": "REF Base OBJ Derived CALL Identifier",
        "expected": "Base->Derived: Identifier() => Base.Identifier [new masqueur statique]"
      },
      {
        "label": "Appel polymorphique override avec référence Base",
        "stdin": "REF Base OBJ Derived CALL Afficher",
        "expected": "Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c3-e1"]
  },
  {
    "id": "csb2-c3-e2",
    "chapter": 3,
    "title": "Implémentation explicite d'interfaces multiples homonymes",
    "level": "n2",
    "language": "csharp",
    "goal": "Gérer la collision de noms de méthodes d'interfaces via l'implémentation explicite en C#.",
    "brief": "<p>Une classe C# implémente deux interfaces <code>IExportable</code> et <code>IAuditable</code>, qui définissent toutes deux une méthode <code>void Traiter()</code>.<br>\nElle utilise l'implémentation explicite :<br>\n- <code>void IExportable.Traiter()</code> génère un export de données JSON ;<br>\n- <code>void IAuditable.Traiter()</code> inscrit un enregistrement d'audit de sécurité.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In). Chaque ligne est <code>CAST IExportable CALL Traiter</code>, <code>CAST IAuditable CALL Traiter</code> ou <code>DIRECT CALL Traiter</code>.<br>\nLe script doit simuler l'exécution et détecter l'erreur de compilation <code>CS1061</code> en cas d'accès direct sans cast.</p>\n<p>Format de sortie :<br><code>&lt;Interface&gt;.Traiter =&gt; &lt;MessageSucces&gt;</code><br><code>DIRECT Traiter =&gt; ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c3-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "En C#, les méthodes d'interface implémentées explicitement ne sont pas publiques dans la classe : elles sont invisibles sans cast.",
      "Un cast vers IExportable déclenche le traitement d'export JSON.",
      "Un cast vers IAuditable déclenche le journal d'audit de conformité."
    ],
    "examples": [
      {
        "stdin": "CAST IExportable CALL Traiter\nCAST IAuditable CALL Traiter\nDIRECT CALL Traiter",
        "expected": "IExportable.Traiter => Export JSON genere avec succes\nIAuditable.Traiter => Audit journalise dans le registre de conformite\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)",
        "note": "L'accès direct échoue car les méthodes explicites ne sont accessibles que par référence d'interface."
      }
    ],
    "tests": [
      {
        "label": "Cast IExportable uniquement",
        "stdin": "CAST IExportable CALL Traiter",
        "expected": "IExportable.Traiter => Export JSON genere avec succes"
      },
      {
        "label": "Cast IAuditable uniquement",
        "stdin": "CAST IAuditable CALL Traiter",
        "expected": "IAuditable.Traiter => Audit journalise dans le registre de conformite"
      },
      {
        "label": "Tentative directe sans cast",
        "stdin": "DIRECT CALL Traiter",
        "expected": "DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c3-e2"]
  },
  {
    "id": "csb2-c3-e3",
    "chapter": 3,
    "title": "Classes abstraites et patron de conception Template Method",
    "level": "n3",
    "language": "csharp",
    "goal": "Implémenter un patron Template Method en C# avec étapes communes fixes et étapes abstraites spécialisées.",
    "brief": "<p>Une classe abstraite <code>PipelineTraitement</code> orchestre le traitement séquentiel d'une opération métier :<br>\n1. Étape abstraite <code>Valider()</code> (spécifique au type métier) ;<br>\n2. Étape abstraite <code>Executer()</code> (spécifique au type métier) ;<br>\n3. Étape concrète <code>Journaliser()</code> (partagée par tous les pipelines : <code>[3. Notification globale envoyee]</code>).<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In). Chaque ligne est <code>PIPELINE &lt;Type&gt;</code>.<br>\nTypes supportés :<br>\n- <code>Virement</code> : <code>[1. Valider IBAN et solde] -&gt; [2. Debiter compte et crediter tiers] -&gt; [3. Notification globale envoyee]</code> ;<br>\n- <code>Facture</code> : <code>[1. Valider TVA et lignes] -&gt; [2. Calculer totaux et generer PDF] -&gt; [3. Notification globale envoyee]</code> ;<br>\n- <code>Inscription</code> : <code>[1. Valider unicite email] -&gt; [2. Creer compte utilisateur en base] -&gt; [3. Notification globale envoyee]</code>.</p>\n<p>Format de sortie :<br><code>Pipeline &lt;Type&gt;: &lt;Etape1&gt; -&gt; &lt;Etape2&gt; -&gt; &lt;Etape3&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c3-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "La méthode Template Method définit le squelette de l'algorithme dans la classe de base.",
      "Les classes dérivées redéfinissent obligatoirement les étapes marquées abstract.",
      "Respecte la syntaxe exacte des étapes pour chaque type d'opération."
    ],
    "examples": [
      {
        "stdin": "PIPELINE Virement\nPIPELINE Facture\nPIPELINE Inscription",
        "expected": "Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\nPipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]\nPipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]",
        "note": "Chaque sous-classe spécialise les deux premières étapes abstraites, l'étape 3 étant héritée de la classe abstraite."
      }
    ],
    "tests": [
      {
        "label": "Pipeline Virement unique",
        "stdin": "PIPELINE Virement",
        "expected": "Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]"
      },
      {
        "label": "Pipeline Facture unique",
        "stdin": "PIPELINE Facture",
        "expected": "Pipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]"
      },
      {
        "label": "Pipeline Inscription unique",
        "stdin": "PIPELINE Inscription",
        "expected": "Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c3-e3"]
  },
  {
    "id": "csb2-c4-e1",
    "chapter": 4,
    "title": "Collections génériques C# et recherche sécurisée TryGetValue",
    "level": "n1",
    "language": "csharp",
    "goal": "Manipuler un Dictionary<TKey, TValue> C# et comparer l'indexeur direct avec la méthode TryGetValue.",
    "brief": "<p>Le script gère un dictionnaire générique C# <code>Dictionary&lt;string, int&gt;</code>.<br>\nIl lit dans l’énoncé du cas des instructions :<br>\n- <code>ADD &lt;Cle&gt; &lt;Valeur&gt;</code> : insère ou met à jour la valeur et Indiquez la nouvelle taille ;<br>\n- <code>GET &lt;Cle&gt;</code> : accès par indexeur direct <code>dict[cle]</code>. Si la clé existe, Indiquez sa valeur ; sinon, affiche <code>CRASH KeyNotFoundException (Cle absente du dictionnaire)</code> et arrête le traitement des commandes suivantes ;<br>\n- <code>TRYGET &lt;Cle&gt;</code> : accès sécurisé via <code>dict.TryGetValue(cle, out int val)</code>. Indiquez <code>Trouve: &lt;val&gt;</code> ou <code>NonTrouve (out val=0)</code> sans lever d'exception.</p>\n<p>Format de sortie :<br><code>ADD: &lt;Cle&gt; =&gt; &lt;Valeur&gt; (Taille=&lt;N&gt;)</code><br><code>GET: &lt;Cle&gt; =&gt; &lt;Valeur&gt;</code> ou <code>GET: &lt;Cle&gt; =&gt; CRASH KeyNotFoundException (Cle absente du dictionnaire)</code><br><code>TRYGET: &lt;Cle&gt; =&gt; Trouve: &lt;Valeur&gt;</code> ou <code>TRYGET: &lt;Cle&gt; =&gt; NonTrouve (out val=0)</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c4-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
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
        "stdin": "ADD PortHTTP 80\nGET PortHTTP\nTRYGET PortHTTP",
        "expected": "ADD: PortHTTP => 80 (Taille=1)\nGET: PortHTTP => 80\nTRYGET: PortHTTP => Trouve: 80"
      },
      {
        "label": "Mise à jour d une clé existante",
        "stdin": "ADD MaxThreads 4\nADD MaxThreads 8\nGET MaxThreads",
        "expected": "ADD: MaxThreads => 4 (Taille=1)\nADD: MaxThreads => 8 (Taille=1)\nGET: MaxThreads => 8"
      },
      {
        "label": "Multiples TryGet sur clés manquantes",
        "stdin": "TRYGET Inconnu1\nTRYGET Inconnu2",
        "expected": "TRYGET: Inconnu1 => NonTrouve (out val=0)\nTRYGET: Inconnu2 => NonTrouve (out val=0)"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c4-e1"]
  },
  {
    "id": "csb2-c4-e2",
    "chapter": 4,
    "title": "Gestion des exceptions avec filtres catch ... when",
    "level": "n2",
    "language": "csharp",
    "goal": "Simuler le routage d'exceptions C# grâce aux filtres de clause catch when et garantir l'exécution de finally.",
    "brief": "<p>En C# 6+, les blocs <code>catch</code> peuvent être filtrés avec une clause <code>when (condition)</code> :<br>\n1. <code>catch (HttpException ex) when (ex.StatusCode == 404)</code> =&gt; <code>[ClientError]</code> ;<br>\n2. <code>catch (HttpException ex) when (ex.StatusCode &gt;= 500)</code> =&gt; <code>[ServerError]</code> ;<br>\n3. <code>catch (TimeoutException)</code> =&gt; <code>[DelaiDepasse]</code> ;<br>\n4. <code>catch (Exception)</code> =&gt; <code>[FallbackGlobal]</code>.<br>\nDans tous les cas, le bloc <code>finally</code> est inconditionnellement exécuté (<code>| FINALLY execute</code>).<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In). Chaque ligne est <code>THROW &lt;Type&gt; StatusCode=&lt;Code&gt;</code>.</p>\n<p>Format de sortie :<br><code>Exception: &lt;Type&gt; (&lt;Code&gt;) =&gt; Intercepte par: &lt;ClauseCatch&gt; &lt;Tag&gt; | FINALLY execute</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c4-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
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
        "stdin": "THROW HttpException StatusCode=500",
        "expected": "Exception: HttpException (500) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute"
      },
      {
        "label": "Timeout sans code http spécifique",
        "stdin": "THROW TimeoutException StatusCode=0",
        "expected": "Exception: TimeoutException (0) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute"
      },
      {
        "label": "Erreur 400 tombant dans le fallback global",
        "stdin": "THROW HttpException StatusCode=400",
        "expected": "Exception: HttpException (400) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c4-e2"]
  },
  {
    "id": "csb2-c4-e3",
    "chapter": 4,
    "title": "Validateur de contraintes génériques (where T : ...)",
    "level": "n3",
    "language": "csharp",
    "goal": "Vérifier la conformité de types candidats aux contraintes génériques d'une classe ou méthode C#.",
    "brief": "<p>Simulez un contrôle de contraintes génériques C# avec les lignes <code>CONSTRAINT where T : ...</code>, puis <code>Candidate Nom=&lt;nom&gt; IsClass=&lt;True|False&gt; HasDefaultCtor=&lt;True|False&gt; ImplementsComparable=&lt;True|False&gt;</code>.<br>Dans cet atelier limité, chaque candidat est soit une classe, soit un type valeur non nullable. <code>class</code> exige une classe, <code>struct</code> un type valeur, <code>new()</code> un constructeur public sans paramètre, et <code>IComparable</code> l'interface correspondante. Les combinaisons fournies respectent les règles C#, notamment <code>struct</code> n'est pas combiné avec <code>new()</code>. Pour un type valeur non nullable, <code>HasDefaultCtor</code> vaut <code>True</code>.<br>Contrôlez toutes les contraintes. Signalez les violations dans l'ordre <code>class</code>, <code>struct</code>, <code>new()</code>, <code>IComparable</code>.</p><p>Format de sortie :<br><code>Type &lt;Nom&gt;: VALIDE (Toutes contraintes respectees)</code><br><code>Type &lt;Nom&gt;: REJETE [Violation: &lt;Motif1&gt;, ...]</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c4-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Parse la première ligne pour extraire les mots-clés de contrainte (class, struct, new(), IComparable).",
      "Pour chaque type candidat, teste chaque contrainte déclarée.",
      "Si aucune violation n'est relevée, le type est VALIDE."
    ],
    "examples": [
      {
        "stdin": "CONSTRAINT where T : class, IComparable, new()\nCandidate Nom=Client IsClass=True HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Int32 IsClass=False HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Singleton IsClass=True HasDefaultCtor=False ImplementsComparable=True",
        "expected": "Type Client: VALIDE (Toutes contraintes respectees)\nType Int32: REJETE [Violation: non-class (struct)]\nType Singleton: REJETE [Violation: pas de constructeur sans argument new()]",
        "note": "Client satisfait les trois contraintes, Int32 est un type valeur, et Singleton n'a pas de constructeur sans argument public."
      }
    ],
    "tests": [
      {
        "label": "Contrainte struct seule",
        "stdin": "CONSTRAINT where T : struct\nCandidate Nom=Point IsClass=False HasDefaultCtor=True ImplementsComparable=False\nCandidate Nom=Fenetre IsClass=True HasDefaultCtor=True ImplementsComparable=False",
        "expected": "Type Point: VALIDE (Toutes contraintes respectees)\nType Fenetre: REJETE [Violation: non-struct (class)]"
      },
      {
        "label": "Contrainte IComparable seule",
        "stdin": "CONSTRAINT where T : IComparable\nCandidate Nom=Chaine IsClass=True HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Stream IsClass=True HasDefaultCtor=False ImplementsComparable=False",
        "expected": "Type Chaine: VALIDE (Toutes contraintes respectees)\nType Stream: REJETE [Violation: n implemente pas IComparable]"
      },
      {
        "label": "Contraintes combinées avec double violation",
        "stdin": "CONSTRAINT where T : class, IComparable\nCandidate Nom=Entier IsClass=False HasDefaultCtor=True ImplementsComparable=False",
        "expected": "Type Entier: REJETE [Violation: non-class (struct), n implemente pas IComparable]"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c4-e3"]
  },
  {
    "id": "csb2-c5-e1",
    "chapter": 5,
    "title": "Moteur LINQ de base : Where, Select, OrderBy et exécution différée",
    "level": "n1",
    "language": "csharp",
    "goal": "Simuler une requête LINQ avec Where, OrderBy, Select et matérialisation terminale ToList().",
    "brief": "<p>Dans ce pipeline LINQ, l'énumération est différée jusqu'à l'appel de <code>ToList()</code>.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In). La première ligne est <code>FILTER Prix &gt;= &lt;seuil&gt;</code> ; les lignes suivantes décrivent des articles sous la forme <code>Article Nom=&lt;Nom&gt; Prix=&lt;Prix&gt;</code>.<br>\nSimulez le pipeline LINQ suivant :<br>\n1. <code>.Where(a =&gt; a.Prix &gt;= seuil)</code> ;<br>\n2. <code>.OrderByDescending(a =&gt; a.Prix)</code> ;<br>\n3. <code>.Select(a =&gt; $\"{a.Nom} - {a.Prix:F2}\")</code>.<br>\nIndiquez la matérialisation et chaque élément sélectionné. À prix égal, conservez l’ordre d’entrée.</p>\n<p>Format de sortie :<br><code>LINQ: Declenchement ToList() (Evaluation differee terminee)</code><br><code>Resultat: &lt;Nom&gt; - &lt;Prix2Dec&gt;</code><br><code>TOTAL_ELEMENTS: &lt;N&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c5-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Extrayez le seuil de prix de la première ligne.",
      "Filtrez les articles dont le prix est supérieur ou égal au seuil.",
      "Triez les articles filtrés par ordre décroissant de prix avant l'affichage."
    ],
    "examples": [
      {
        "stdin": "FILTER Prix >= 20.0\nArticle Nom=Clavier Prix=45.0\nArticle Nom=Souris Prix=15.0\nArticle Nom=Ecran Prix=180.0\nArticle Nom=Tapis Prix=10.0",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Ecran - 180.00\nResultat: Clavier - 45.00\nTOTAL_ELEMENTS: 2",
        "note": "Seuls Ecran et Clavier dépassent le seuil de 20.0 et sont triés par ordre décroissant."
      }
    ],
    "tests": [
      {
        "label": "Tous les éléments filtrés",
        "stdin": "FILTER Prix >= 200.0\nArticle Nom=Souris Prix=15.0\nArticle Nom=Tapis Prix=10.0",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nTOTAL_ELEMENTS: 0"
      },
      {
        "label": "Tous les éléments acceptés",
        "stdin": "FILTER Prix >= 5.0\nArticle Nom=Cable Prix=7.50\nArticle Nom=Adaptateur Prix=12.00",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Adaptateur - 12.00\nResultat: Cable - 7.50\nTOTAL_ELEMENTS: 2"
      },
      {
        "label": "Articles avec prix identiques triés de façon stable",
        "stdin": "FILTER Prix >= 30.0\nArticle Nom=Casque Prix=50.0\nArticle Nom=Micro Prix=50.0\nArticle Nom=Webcam Prix=70.0",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Webcam - 70.00\nResultat: Casque - 50.00\nResultat: Micro - 50.00\nTOTAL_ELEMENTS: 3"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c5-e1"]
  },
  {
    "id": "csb2-c5-e2",
    "chapter": 5,
    "title": "Pipeline LINQ de regroupement GroupBy et agrégations",
    "level": "n2",
    "language": "csharp",
    "goal": "Regrouper un jeu de données avec LINQ GroupBy et calculer le total et la moyenne par groupe.",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In). Chaque ligne contient <code>&lt;Personne&gt; &lt;Categorie&gt; &lt;Montant&gt;</code>, avec un point décimal pour le montant.<br>\nIl doit simuler l'opérateur LINQ <code>GroupBy(a =&gt; a.Categorie)</code> et calculer pour chaque catégorie :\n- Le nombre total d'achats (<code>Count()</code>) ;\n- La somme totale dépensée (<code>Sum(a =&gt; a.Montant)</code>) ;\n- La moyenne par achat (<code>Average(a =&gt; a.Montant)</code>).<br>\nLes catégories doivent être présentées par ordre alphabétique croissant selon la culture courante .NET.</p>\n<p>Format de sortie :<br><code>Groupe: &lt;Categorie&gt; | NbAchats: &lt;N&gt; | Total: &lt;Total2Dec&gt; | Moyenne: &lt;Moyenne2Dec&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c5-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Stocke les montants dans une liste associée à chaque catégorie.",
      "Calculez la somme et divise par le nombre d'éléments pour obtenir la moyenne.",
      "Triez les noms de catégories par ordre alphabétique croissant."
    ],
    "examples": [
      {
        "stdin": "Alice Informatique 120.0\nBob Mobilier 300.0\nAlice Informatique 80.0\nCharlie Informatique 50.0\nBob Mobilier 150.0",
        "expected": "Groupe: Informatique | NbAchats: 3 | Total: 250.00 | Moyenne: 83.33\nGroupe: Mobilier | NbAchats: 2 | Total: 450.00 | Moyenne: 225.00",
        "note": "Regroupement en deux catégories avec calculs d'agrégation exacts."
      }
    ],
    "tests": [
      {
        "label": "Une seule catégorie avec un seul élément",
        "stdin": "David Livres 24.50",
        "expected": "Groupe: Livres | NbAchats: 1 | Total: 24.50 | Moyenne: 24.50"
      },
      {
        "label": "Trois catégories variées",
        "stdin": "Alice Bureau 100.0\nBob Tech 200.0\nCharlie Alimentation 50.0\nAlice Tech 300.0",
        "expected": "Groupe: Alimentation | NbAchats: 1 | Total: 50.00 | Moyenne: 50.00\nGroupe: Bureau | NbAchats: 1 | Total: 100.00 | Moyenne: 100.00\nGroupe: Tech | NbAchats: 2 | Total: 500.00 | Moyenne: 250.00"
      },
      {
        "label": "Valeurs identiques dans une même catégorie",
        "stdin": "A Audio 40.0\nB Audio 40.0\nC Audio 40.0",
        "expected": "Groupe: Audio | NbAchats: 3 | Total: 120.00 | Moyenne: 40.00"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c5-e2"]
  },
  {
    "id": "csb2-c5-e3",
    "chapter": 5,
    "title": "Système Événementiel C# (event Action<string>, +=, -= multicast)",
    "level": "n3",
    "language": "csharp",
    "goal": "Simuler un délégué multicast C# avec inscription +=, désinscription -= et diffusion d'événement.",
    "brief": "<p>En C#, un événement <code>public event Action&lt;string&gt; OnNotification;</code> permet à plusieurs gestionnaires de s'abonner avec l'opérateur <code>+=</code> et de se désabonner avec <code>-=</code>.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In) : <code>SUBSCRIBE &lt;Nom&gt;</code>, <code>UNSUBSCRIBE &lt;Nom&gt;</code> et <code>EMIT \"&lt;Message&gt;\"</code>. Plusieurs inscriptions identiques sont possibles ; chaque désinscription retire uniquement la dernière occurrence correspondante.</p>\n<p>Format de sortie pour chaque émission :<br><code>EVENT \"&lt;Message&gt;\" =&gt; &lt;NomAbonne&gt; recoit la notification</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c5-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Maintiens une liste d'abonnés actifs dans l'ordre d'ajout.",
      "Lors d'un UNSUBSCRIBE, retirez la dernière occurrence de ce nom, si elle existe.",
      "Lors d'un EMIT, itère sur tous les abonnés actifs pour afficher la notification."
    ],
    "examples": [
      {
        "stdin": "SUBSCRIBE Logger\nSUBSCRIBE EmailService\nEMIT \"Incident Detecte\"\nUNSUBSCRIBE EmailService\nSUBSCRIBE SmsAlerte\nEMIT \"Serveur Redemarre\"",
        "expected": "EVENT \"Incident Detecte\" => Logger recoit la notification\nEVENT \"Incident Detecte\" => EmailService recoit la notification\nEVENT \"Serveur Redemarre\" => Logger recoit la notification\nEVENT \"Serveur Redemarre\" => SmsAlerte recoit la notification",
        "note": "EmailService reçoit la première alerte mais pas la seconde après désinscription."
      }
    ],
    "tests": [
      {
        "label": "Souscription initiale et émission",
        "stdin": "SUBSCRIBE ServiceAudit\nEMIT \"Signal Initial\"",
        "expected": "EVENT \"Signal Initial\" => ServiceAudit recoit la notification"
      },
      {
        "label": "Abonnement unique et émission",
        "stdin": "SUBSCRIBE ConsoleLog\nEMIT \"Hello C#\"",
        "expected": "EVENT \"Hello C#\" => ConsoleLog recoit la notification"
      },
      {
        "label": "Désinscription puis réinscription",
        "stdin": "SUBSCRIBE ServiceA\nUNSUBSCRIBE ServiceA\nEMIT \"Msg1\"\nSUBSCRIBE ServiceA\nEMIT \"Msg2\"",
        "expected": "EVENT \"Msg2\" => ServiceA recoit la notification"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c5-e3"]
  },
  {
    "id": "csb2-c6-e1",
    "chapter": 6,
    "title": "Simulateur de Machine à États Async/Await (TAP Pattern)",
    "level": "n1",
    "language": "csharp",
    "goal": "Tracer l'exécution d'un workflow asynchrone C# modélisé par la machine à états de Roslyn.",
    "brief": "<p>En C#, <code>await</code> suspend la méthode si l'opération attendue n'est pas encore terminée ; le thread peut alors effectuer d'autres travaux. La continuation ne reprend pas nécessairement sur le même contexte.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In). Chaque ligne <code>TASK &lt;Nom&gt; Duree=&lt;Duree&gt;ms</code> décrit une étape séquentielle et sa durée.<br>\nDans cette simulation, les durées sont des entiers naturels en millisecondes et leur cumul est mathématique, sans limite Int64, dans les limites de l'environnement d'exécution ; cela ne définit pas les valeurs acceptées par une API réelle.<br>\nSimulez la progression à partir de <code>T=0ms</code>, les démarrages et les reprises, puis affichez la durée cumulée. Les mentions « Await » et « Reprise contexte » sont des libellés de cette simulation ; elles ne prédisent pas les threads réellement utilisés.</p>\n<p>Format de sortie :<br><code>[T=&lt;T&gt;ms] Demarrage &lt;Nom&gt; -&gt; Await (trace simulee)</code><br><code>[T=&lt;T&gt;ms] Reprise contexte -&gt; Demarrage &lt;NomSuivant&gt; -&gt; Await</code><br>...<br><code>[T=&lt;Total&gt;ms] Tache completee avec succes. Duree totale=&lt;Total&gt;ms</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c6-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "La première tâche démarre à T=0ms.",
      "Chaque reprise de contexte se produit au temps T cumulé des tâches précédentes.",
      "La durée totale est la somme exacte des durées de chaque étape."
    ],
    "examples": [
      {
        "stdin": "TASK TelechargerFichier Duree=30ms\nTASK TraiterDonnees Duree=20ms\nTASK SauvegarderBD Duree=15ms",
        "expected": "[T=0ms] Demarrage TelechargerFichier -> Await (trace simulee)\n[T=30ms] Reprise contexte -> Demarrage TraiterDonnees -> Await\n[T=50ms] Reprise contexte -> Demarrage SauvegarderBD -> Await\n[T=65ms] Tache completee avec succes. Duree totale=65ms",
        "note": "Tracé temporel précis des suspensions et reprises de la machine à états C#."
      }
    ],
    "tests": [
      {
        "label": "Tâche asynchrone unique",
        "stdin": "TASK PingServeur Duree=10ms",
        "expected": "[T=0ms] Demarrage PingServeur -> Await (trace simulee)\n[T=10ms] Tache completee avec succes. Duree totale=10ms"
      },
      {
        "label": "Deux tâches avec durées courtes",
        "stdin": "TASK Authentification Duree=5ms\nTASK RecuperationProfil Duree=12ms",
        "expected": "[T=0ms] Demarrage Authentification -> Await (trace simulee)\n[T=5ms] Reprise contexte -> Demarrage RecuperationProfil -> Await\n[T=17ms] Tache completee avec succes. Duree totale=17ms"
      },
      {
        "label": "Chaîne de 4 tâches longues",
        "stdin": "TASK LireDisque Duree=40ms\nTASK Decompresser Duree=25ms\nTASK Indexer Duree=35ms\nTASK EnvoyerEmail Duree=10ms",
        "expected": "[T=0ms] Demarrage LireDisque -> Await (trace simulee)\n[T=40ms] Reprise contexte -> Demarrage Decompresser -> Await\n[T=65ms] Reprise contexte -> Demarrage Indexer -> Await\n[T=100ms] Reprise contexte -> Demarrage EnvoyerEmail -> Await\n[T=110ms] Tache completee avec succes. Duree totale=110ms"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c6-e1"]
  },
  {
    "id": "csb2-c6-e2",
    "chapter": 6,
    "title": "Orchestrateur concurrent avec Task.WhenAll et AggregateException",
    "level": "n2",
    "language": "csharp",
    "goal": "Simuler la synchronisation de tâches concurrentes via Task.WhenAll et la capture d'erreurs groupées.",
    "brief": "<p>En C#, <code>Task.WhenAll(t1, t2, ...)</code> renvoie une tâche qui se termine lorsque toutes les tâches fournies sont terminées. En cas d'échec, la propriété <code>Exception</code> de cette tâche contient une <code>AggregateException</code> regroupant les exceptions. Lors d'un <code>await</code>, une exception est propagée directement : l'exercice simule ici l'inspection de la propriété <code>Exception</code>, pas l'exception propagée par <code>await</code>.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In). Chaque ligne est <code>TASK &lt;Nom&gt; Status=OK</code> ou <code>TASK &lt;Nom&gt; Status=FAIL Error=\"&lt;Message&gt;\"</code>.<br>\nComptez les succès et les échecs, puis affichez les messages des erreurs dans l'ordre de lecture.</p>\n<p>Format de sortie :<br><code>WHENALL: &lt;NbreSucces&gt; succes, &lt;NbreEchecs&gt; echecs</code><br>Si échecs &gt; 0 :<br><code>AggregateException observee (&lt;N&gt; erreurs):</code><br><code>- Erreur 1: &lt;Message&gt;</code><br>...<br>Sinon :<br><code>Execution terminee sans exception</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c6-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Compte les statuts OK et extrait les messages d'erreur des statuts FAIL.",
      "Si le nombre d'échecs est supérieur à zéro, affiche le bloc AggregateException.",
      "Numérote les erreurs de 1 à N dans l'ordre de lecture."
    ],
    "examples": [
      {
        "stdin": "TASK T1 Status=OK\nTASK T2 Status=FAIL Error=\"SocketException: Connexion refusee\"\nTASK T3 Status=OK\nTASK T4 Status=FAIL Error=\"SqlException: Timeout expire\"",
        "expected": "WHENALL: 2 succes, 2 echecs\nAggregateException observee (2 erreurs):\n- Erreur 1: SocketException: Connexion refusee\n- Erreur 2: SqlException: Timeout expire",
        "note": "Task.WhenAll agrège les deux exceptions sans perdre la seconde."
      }
    ],
    "tests": [
      {
        "label": "Toutes les tâches réussies",
        "stdin": "TASK T1 Status=OK\nTASK T2 Status=OK\nTASK T3 Status=OK",
        "expected": "WHENALL: 3 succes, 0 echecs\nExecution terminee sans exception"
      },
      {
        "label": "Un seul échec isolé",
        "stdin": "TASK T1 Status=OK\nTASK T2 Status=FAIL Error=\"HttpRequestException: 404 Not Found\"",
        "expected": "WHENALL: 1 succes, 1 echecs\nAggregateException observee (1 erreurs):\n- Erreur 1: HttpRequestException: 404 Not Found"
      },
      {
        "label": "Tous les appels en échec",
        "stdin": "TASK A Status=FAIL Error=\"IOException: Disque plein\"\nTASK B Status=FAIL Error=\"UnauthorizedAccessException: Droit refuse\"",
        "expected": "WHENALL: 0 succes, 2 echecs\nAggregateException observee (2 erreurs):\n- Erreur 1: IOException: Disque plein\n- Erreur 2: UnauthorizedAccessException: Droit refuse"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c6-e2"]
  },
  {
    "id": "csb2-c6-e3",
    "chapter": 6,
    "title": "Gestion déterministe des ressources non managées (IDisposable et using)",
    "level": "n3",
    "language": "csharp",
    "goal": "Simuler le pattern IDisposable et la libération d'une ressource à la sortie normale d'un bloc ou lors d'une exception interceptée.",
    "brief": "<p>En C#, une instruction <code>using (var res = new Ressource()) { ... }</code> organise l'appel de <code>res.Dispose()</code> à la sortie du bloc, notamment lors d'une exception dont la pile est déroulée. Une terminaison brutale du processus ne garantit pas l'exécution du nettoyage.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In). La première ligne est <code>RESOURCE &lt;Nom&gt; ALLOCATE=&lt;Handle&gt;</code>. Les lignes suivantes sont des opérations <code>OP &lt;NomOp&gt; &lt;Params&gt;</code>, une sortie <code>EXIT</code> ou une exception <code>THROW &lt;Type&gt;</code>.<br>\nSimulez l'interception de l'exception, arrêtez les opérations après <code>THROW</code> ou <code>EXIT</code>, et affichez la libération de la ressource.</p>\n<p>Format de sortie :<br><code>[ALLOC] &lt;Nom&gt; alloue (Handle=&lt;Handle&gt;)</code><br><code>[EXEC] Op &lt;NomOp&gt; &lt;Params&gt;</code><br><code>[CRASH] Exception &lt;Type&gt; intercepte</code> (si applicable)<br><code>[DISPOSE] &lt;Nom&gt; libere via IDisposable</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c6-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Gardez une référence vers la ressource allouée au début.",
      "Affichez chaque opération OP exécutée.",
      "Si une exception THROW survient, intercepte-la et appelle quand même le bloc finally [DISPOSE]."
    ],
    "examples": [
      {
        "stdin": "RESOURCE FichierLogs ALLOCATE=Handle0x10A\nOP EcritureLigne \"Demarrage\"\nTHROW DiskFullException",
        "expected": "[ALLOC] FichierLogs alloue (Handle=Handle0x10A)\n[EXEC] Op EcritureLigne \"Demarrage\"\n[CRASH] Exception DiskFullException intercepte\n[DISPOSE] FichierLogs libere via IDisposable",
        "note": "Malgré le crash DiskFullException, la ressource est immédiatement libérée via le finally de using."
      }
    ],
    "tests": [
      {
        "label": "Sortie normale sans exception",
        "stdin": "RESOURCE BddConnection ALLOCATE=Sock0x99\nOP Requete \"SELECT * FROM Users\"\nEXIT",
        "expected": "[ALLOC] BddConnection alloue (Handle=Sock0x99)\n[EXEC] Op Requete \"SELECT * FROM Users\"\n[DISPOSE] BddConnection libere via IDisposable"
      },
      {
        "label": "Plusieurs opérations avant crash",
        "stdin": "RESOURCE ImageRenderer ALLOCATE=Gpu0xAA\nOP ChargerTexture \"background.png\"\nOP AppliquerFiltre \"Blur\"\nTHROW OutOfMemoryException",
        "expected": "[ALLOC] ImageRenderer alloue (Handle=Gpu0xAA)\n[EXEC] Op ChargerTexture \"background.png\"\n[EXEC] Op AppliquerFiltre \"Blur\"\n[CRASH] Exception OutOfMemoryException intercepte\n[DISPOSE] ImageRenderer libere via IDisposable"
      },
      {
        "label": "Crash immédiat juste après allocation",
        "stdin": "RESOURCE PortSerie ALLOCATE=COM3\nTHROW TimeoutException",
        "expected": "[ALLOC] PortSerie alloue (Handle=COM3)\n[CRASH] Exception TimeoutException intercepte\n[DISPOSE] PortSerie libere via IDisposable"
      }
    ],
    "solution": CS2_SOLUTIONS["csb2-c6-e3"]
  }
];

const CS2_LOT1_TESTS = {
  'csb2-c1-e1': [
    {
      label: 'Boîtes littérales et références copiées',
      stdin: 'object boite = 5; int nombre = (int)boite; string texte = "bonjour"; object reference = texte;',
      expected: 'boite: Type=object | Mem=Heap | Op=BOXING\nnombre: Type=int | Mem=Stack | Op=UNBOXING\ntexte: Type=string | Mem=Heap | Op=ALLOCATION\nreference: Type=object | Mem=Heap | Op=COPIE_REF'
    },
    {
      label: 'Copie de valeurs et de références',
      stdin: 'bool actif = true; bool copie = actif; object enveloppe = copie; bool resultat = (bool)enveloppe;',
      expected: 'actif: Type=bool | Mem=Stack | Op=ALLOCATION\ncopie: Type=bool | Mem=Stack | Op=COPIE_VALEUR\nenveloppe: Type=object | Mem=Heap | Op=BOXING\nresultat: Type=bool | Mem=Stack | Op=UNBOXING'
    }
  ],
  'csb2-c1-e2': [
    {
      label: 'Deux paramètres désignent la même variable',
      stdin: 'INIT x=2, y=10\nMETHOD Ensemble(ref a, ref b, val c)\nBODY a=a+1; b=b+a; c=c*2\nCALL Ensemble(ref x, ref x, y)',
      expected: 'ETAT_INITIAL: x=2, y=10\nMETHODE: Ensemble\nETAT_FINAL: x=6, y=10'
    },
    {
      label: 'Priorités, parenthèses et division négative',
      stdin: 'INIT alpha=3, beta=8, gamma=0\nMETHOD Calcul(val premier, ref second, out resultat)\nBODY second=second+(premier*2); resultat=second/(-2)+1; premier=-2147483648\nCALL Calcul(alpha, ref beta, out gamma)',
      expected: 'ETAT_INITIAL: alpha=3, beta=8, gamma=0\nMETHODE: Calcul\nETAT_FINAL: alpha=3, beta=14, gamma=-6'
    },
    {
      label: 'Reste signé et modification du diviseur par référence',
      stdin: 'INIT alpha=-23, beta=5, quotient=0, reste=0\nMETHOD DivRef(val nombre, ref diviseur, out q, out r)\nBODY q=nombre/diviseur; r=nombre%diviseur; diviseur=diviseur+3\nCALL DivRef(alpha, ref beta, out quotient, out reste)',
      expected: 'ETAT_INITIAL: alpha=-23, beta=5, quotient=0, reste=0\nMETHODE: DivRef\nETAT_FINAL: alpha=-23, beta=8, quotient=-4, reste=-3'
    },
    {
      label: 'Les paramètres ref et out partagent la même variable',
      stdin: 'INIT a=5, b=7\nMETHOD Relais(ref gauche, out droite, val copie)\nBODY droite=gauche+copie; gauche=gauche+1; copie=copie*10\nCALL Relais(ref a, out a, b)',
      expected: 'ETAT_INITIAL: a=5, b=7\nMETHODE: Relais\nETAT_FINAL: a=13, b=7'
    }
  ],
  'csb2-c2-e3': [
    {
      label: 'La copie modifiée ne change pas la source',
      stdin: 'RECORD premier X=1 Y=2\nWITH modifie FROM premier X=9\nCOMPARE premier modifie\nWITH copie FROM premier\nCOMPARE premier copie\nCOMPARE premier premier',
      expected: 'CREATE: premier => Record { X = 1, Y = 2 }\nWITH: modifie => Record { X = 9, Y = 2 }\nEQUALS: premier == modifie => False\nWITH: copie => Record { X = 1, Y = 2 }\nEQUALS: premier == copie => True (Egalite structurelle)\nEQUALS: premier == premier => True'
    },
    {
      label: 'Propriétés égales présentées dans un ordre différent',
      stdin: 'RECORD premier A=1 B=2\nRECORD second B=2 A=1\nCOMPARE premier second',
      expected: 'CREATE: premier => Record { A = 1, B = 2 }\nCREATE: second => Record { B = 2, A = 1 }\nEQUALS: premier == second => True (Egalite structurelle)'
    }
  ],
  'csb2-c4-e3': [
    {
      label: 'Violations combinées et classe conforme',
      stdin: 'CONSTRAINT where T : class, IComparable, new()\nCandidate Nom=Valeur IsClass=False HasDefaultCtor=True ImplementsComparable=False\nCandidate Nom=Singleton IsClass=True HasDefaultCtor=False ImplementsComparable=True\nCandidate Nom=Conforme IsClass=True HasDefaultCtor=True ImplementsComparable=True',
      expected: 'Type Valeur: REJETE [Violation: non-class (struct), n implemente pas IComparable]\nType Singleton: REJETE [Violation: pas de constructeur sans argument new()]\nType Conforme: VALIDE (Toutes contraintes respectees)'
    },
    {
      label: 'Valeur comparable et classe non comparable',
      stdin: 'CONSTRAINT where T : struct, IComparable\nCandidate Nom=Point IsClass=False HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Fenetre IsClass=True HasDefaultCtor=True ImplementsComparable=False',
      expected: 'Type Point: VALIDE (Toutes contraintes respectees)\nType Fenetre: REJETE [Violation: non-struct (class), n implemente pas IComparable]'
    },
    {
      label: 'Ordre des motifs pour deux violations',
      stdin: 'CONSTRAINT where T : class, IComparable, new()\nCandidate Nom=Solo IsClass=True HasDefaultCtor=False ImplementsComparable=False',
      expected: 'Type Solo: REJETE [Violation: pas de constructeur sans argument new(), n implemente pas IComparable]'
    }
  ],
  'csb2-c1-e3': [
    {
      label: 'Rayons voisins de la borne et égalité',
      stdin: 'Circle Radius=9\nCircle Radius=10\nCircle Radius=11',
      expected: 'Circle (r=9) => PetitCercle | Aire=254.34\nCircle (r=10) => PetitCercle | Aire=314.00\nCircle (r=11) => GrandCercle | Aire=379.94'
    },
    {
      label: 'Rectangle nul, côtés égaux ou distincts et forme inconnue',
      stdin: 'Rectangle Width=0 Height=0\nRectangle Width=3 Height=4\nRectangle Width=4 Height=3\nEllipse Radius=2',
      expected: 'Rectangle (0x0) => Carre | Aire=0.00\nRectangle (3x4) => Rectangle | Aire=12.00\nRectangle (4x3) => Rectangle | Aire=12.00\nEllipse => FormeNonSupportee | Aire=0.00'
    },
    {
      label: 'Côtés égaux avec des écritures décimales différentes',
      stdin: 'Rectangle Width=3.5 Height=3.50',
      expected: 'Rectangle (3.5x3.50) => Carre | Aire=12.25'
    }
  ],
  'csb2-c2-e1': [
    {
      label: 'Opérations nulles rejetées et retrait exact',
      stdin: 'INIT Titulaire="Noa" Solde=1.00\nDEPOT 0\nRETRAIT 0\nRETRAIT 1',
      expected: 'Compte: Noa | Solde initial: 1.00\nDEPOT 0.00 => Rejet: ArgumentException (Montant invalide)\nRETRAIT 0.00 => Rejet: ArgumentException (Montant invalide)\nRETRAIT 1.00 => Succes | Nouveau solde: 0.00\nSOLDE_FINAL: 0.00'
    },
    {
      label: 'Dépassement d’un centime puis retrait du nouveau solde',
      stdin: 'INIT Titulaire="Lea" Solde=4.00\nRETRAIT 4.01\nDEPOT 2.50\nRETRAIT 6.50',
      expected: 'Compte: Lea | Solde initial: 4.00\nRETRAIT 4.01 => Rejet: InvalidOperationException (Solde insuffisant)\nDEPOT 2.50 => Succes | Nouveau solde: 6.50\nRETRAIT 6.50 => Succes | Nouveau solde: 0.00\nSOLDE_FINAL: 0.00'
    }
  ],
  'csb2-c2-e2': [
    {
      label: 'Valeurs par défaut pour les deux surcharges',
      stdin: 'NEW Article("R-Zero")\nNEW Article("RefTwo", "Connecteur")',
      expected: 'Article("R-Zero") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=R-Zero, Nom=Sans nom, Prix=0.00]\nArticle("RefTwo", "Connecteur") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=RefTwo, Nom=Connecteur, Prix=0.00]'
    },
    {
      label: 'Nom avec virgule et prix explicite nul',
      stdin: 'NEW Article("A-10", "USB, C", 12.30)\nNEW Article("B-5", "Chargeur", 0)',
      expected: 'Article("A-10", "USB, C", 12.30) => Chaine: ctor(r, nom, prix) | Objet: [Ref=A-10, Nom=USB, C, Prix=12.30]\nArticle("B-5", "Chargeur", 0) => Chaine: ctor(r, nom, prix) | Objet: [Ref=B-5, Nom=Chargeur, Prix=0.00]'
    },
    {
      label: 'Prix décimal sans zéro initial',
      stdin: 'NEW Article("DECI", "Puce", .09)',
      expected: 'Article("DECI", "Puce", .09) => Chaine: ctor(r, nom, prix) | Objet: [Ref=DECI, Nom=Puce, Prix=0.09]'
    },
    {
      label: 'Arrondi au centime et demi-centimes signés',
      stdin: 'NEW Article("ARR-P", "Millieme", 0.126)\nNEW Article("ARR-E", "Demi", 0.125)\nNEW Article("ARR-N", "Demi", -0.125)',
      expected: 'Article("ARR-P", "Millieme", 0.126) => Chaine: ctor(r, nom, prix) | Objet: [Ref=ARR-P, Nom=Millieme, Prix=0.13]\nArticle("ARR-E", "Demi", 0.125) => Chaine: ctor(r, nom, prix) | Objet: [Ref=ARR-E, Nom=Demi, Prix=0.13]\nArticle("ARR-N", "Demi", -0.125) => Chaine: ctor(r, nom, prix) | Objet: [Ref=ARR-N, Nom=Demi, Prix=-0.13]'
    }
  ],
  'csb2-c3-e1': [
    {
      label: 'Liaison virtuelle et masquage sur référence Base',
      stdin: 'REF Base OBJ Derived CALL Afficher\nREF Base OBJ Base CALL Afficher\nREF Base OBJ Derived CALL Identifier',
      expected: 'Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\nBase->Base: Afficher() => Base.Afficher [virtual]\nBase->Derived: Identifier() => Base.Identifier [new masqueur statique]'
    },
    {
      label: 'Référence dérivée puis masquage via Base',
      stdin: 'REF Derived OBJ Derived CALL Identifier\nREF Derived OBJ Derived CALL Afficher\nREF Base OBJ Derived CALL Identifier',
      expected: 'Derived->Derived: Identifier() => Derived.Identifier [new]\nDerived->Derived: Afficher() => Derived.Afficher [override]\nBase->Derived: Identifier() => Base.Identifier [new masqueur statique]'
    }
  ],
  'csb2-c3-e2': [
    {
      label: 'Casts répétés et accès direct mélangés',
      stdin: 'CAST IAuditable CALL Traiter\nDIRECT CALL Traiter\nCAST IExportable CALL Traiter\nCAST IAuditable CALL Traiter',
      expected: 'IAuditable.Traiter => Audit journalise dans le registre de conformite\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)\nIExportable.Traiter => Export JSON genere avec succes\nIAuditable.Traiter => Audit journalise dans le registre de conformite'
    },
    { label: 'Aucune commande', stdin: '   ', expected: '' }
  ],
  'csb2-c3-e3': [
    {
      label: 'Ordre arbitraire et pipeline répété',
      stdin: 'PIPELINE Facture\nPIPELINE Virement\nPIPELINE Inscription\nPIPELINE Facture',
      expected: 'Pipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]\nPipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\nPipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]\nPipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]'
    },
    { label: 'Aucun pipeline', stdin: '   ', expected: '' }
  ],
  'csb2-c4-e1': [
    {
      label: 'Mise à jour et clés distinctes selon la casse',
      stdin: 'ADD a 1\nADD A 2\nADD a 3\nTRYGET a\nTRYGET A\nTRYGET Aa',
      expected: 'ADD: a => 1 (Taille=1)\nADD: A => 2 (Taille=2)\nADD: a => 3 (Taille=2)\nTRYGET: a => Trouve: 3\nTRYGET: A => Trouve: 2\nTRYGET: Aa => NonTrouve (out val=0)'
    },
    {
      label: 'Arrêt après accès direct à une clé absente',
      stdin: 'ADD Port 0\nGET Absent\nADD Apres 7\nTRYGET Port',
      expected: 'ADD: Port => 0 (Taille=1)\nGET: Absent => CRASH KeyNotFoundException (Cle absente du dictionnaire)'
    }
  ],
  'csb2-c4-e2': [
    {
      label: 'Voisins des filtres 404 et 500',
      stdin: 'THROW HttpException StatusCode=403\nTHROW HttpException StatusCode=404\nTHROW HttpException StatusCode=405\nTHROW HttpException StatusCode=499\nTHROW HttpException StatusCode=500\nTHROW HttpException StatusCode=501',
      expected: 'Exception: HttpException (403) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute\nException: HttpException (404) => Intercepte par: catch when (StatusCode == 404) [ClientError] | FINALLY execute\nException: HttpException (405) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute\nException: HttpException (499) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute\nException: HttpException (500) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute\nException: HttpException (501) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute'
    },
    {
      label: 'Le type d’exception prime sur le code',
      stdin: 'THROW TimeoutException StatusCode=500\nTHROW AutreException StatusCode=404',
      expected: 'Exception: TimeoutException (500) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute\nException: AutreException (404) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute'
    }
  ],
  'csb2-c5-e1': [
    {
      label: 'Seuil inclus et ses deux voisins',
      stdin: 'FILTER Prix >= 20.0\nArticle Nom=Sous Prix=19.99\nArticle Nom=Egal Prix=20.00\nArticle Nom=Dessus Prix=20.01',
      expected: 'LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Dessus - 20.01\nResultat: Egal - 20.00\nTOTAL_ELEMENTS: 2'
    },
    {
      label: 'Seuil nul, ordre stable et prix inférieur',
      stdin: 'FILTER Prix >= 0\nArticle Nom=A Prix=0\nArticle Nom=B Prix=0\nArticle Nom=C Prix=1\nArticle Nom=D Prix=-1',
      expected: 'LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: C - 1.00\nResultat: A - 0.00\nResultat: B - 0.00\nTOTAL_ELEMENTS: 3'
    }
  ],
  'csb2-c5-e2': [
    {
      label: 'Groupes non triés, montant nul et moyenne',
      stdin: 'A Bureau 0\nB Audio 2\nC Audio 4',
      expected: 'Groupe: Audio | NbAchats: 2 | Total: 6.00 | Moyenne: 3.00\nGroupe: Bureau | NbAchats: 1 | Total: 0.00 | Moyenne: 0.00'
    },
    {
      label: 'Plusieurs achats dans un seul groupe',
      stdin: 'U Jeux 1\nV Jeux 3\nW Jeux 5',
      expected: 'Groupe: Jeux | NbAchats: 3 | Total: 9.00 | Moyenne: 3.00'
    }
  ],
  'csb2-c5-e3': [
    {
      label: 'Abonnements répétés et retrait de la dernière occurrence',
      stdin: 'SUBSCRIBE Ada\nSUBSCRIBE Bob\nSUBSCRIBE Ada\nEMIT "Avant"\nUNSUBSCRIBE Ada\nEMIT "Apres"',
      expected: 'EVENT "Avant" => Ada recoit la notification\nEVENT "Avant" => Bob recoit la notification\nEVENT "Avant" => Ada recoit la notification\nEVENT "Apres" => Ada recoit la notification\nEVENT "Apres" => Bob recoit la notification'
    },
    {
      label: 'Émissions sans abonné et désinscription absente',
      stdin: 'UNSUBSCRIBE Ghost\nEMIT "Personne"\nSUBSCRIBE C\nUNSUBSCRIBE C\nEMIT "Fini"',
      expected: ''
    }
  ],
  'csb2-c6-e1': [
    {
      label: 'Durée nulle puis cumul sur plusieurs étapes',
      stdin: 'TASK A Duree=0ms\nTASK B Duree=1ms\nTASK C Duree=2ms',
      expected: '[T=0ms] Demarrage A -> Await (trace simulee)\n[T=0ms] Reprise contexte -> Demarrage B -> Await\n[T=1ms] Reprise contexte -> Demarrage C -> Await\n[T=3ms] Tache completee avec succes. Duree totale=3ms'
    },
    {
      label: 'Une étape de durée nulle',
      stdin: 'TASK Unique Duree=0ms',
      expected: '[T=0ms] Demarrage Unique -> Await (trace simulee)\n[T=0ms] Tache completee avec succes. Duree totale=0ms'
    },
    {
      label: 'Cumul supérieur à Int64',
      stdin: 'TASK Limite Duree=9223372036854775807ms\nTASK Plus Duree=2ms',
      expected: '[T=0ms] Demarrage Limite -> Await (trace simulee)\n[T=9223372036854775807ms] Reprise contexte -> Demarrage Plus -> Await\n[T=9223372036854775809ms] Tache completee avec succes. Duree totale=9223372036854775809ms'
    }
  ],
  'csb2-c6-e2': [
    {
      label: 'Deux échecs dans l’ordre autour d’un succès',
      stdin: 'TASK A Status=FAIL Error="Erreur A"\nTASK B Status=OK\nTASK C Status=FAIL Error="Erreur C"',
      expected: 'WHENALL: 1 succes, 2 echecs\nAggregateException observee (2 erreurs):\n- Erreur 1: Erreur A\n- Erreur 2: Erreur C'
    },
    {
      label: 'Aucune tâche',
      stdin: '   ',
      expected: 'WHENALL: 0 succes, 0 echecs\nExecution terminee sans exception'
    }
  ],
  'csb2-c6-e3': [
    {
      label: 'Exception puis instruction non exécutée',
      stdin: 'RESOURCE Systeme ALLOCATE=H1\nOP Lire "ok"\nTHROW UnauthorizedAccessException\nOP Ecrire "ignore"',
      expected: '[ALLOC] Systeme alloue (Handle=H1)\n[EXEC] Op Lire "ok"\n[CRASH] Exception UnauthorizedAccessException intercepte\n[DISPOSE] Systeme libere via IDisposable'
    },
    {
      label: 'Sortie immédiate puis instruction non exécutée',
      stdin: 'RESOURCE Ressource ALLOCATE=H2\nEXIT\nOP NePasExecuter "x"',
      expected: '[ALLOC] Ressource alloue (Handle=H2)\n[DISPOSE] Ressource libere via IDisposable'
    }
  ]
};

const CS2_INDEPENDENCE_TESTS = {
  "csb2-c1-e1": [
    {
      "label": "Boxing d'une variable sans déballage",
      "stdin": "int n = 9; object box = n;",
      "expected": "n: Type=int | Mem=Stack | Op=ALLOCATION\nbox: Type=object | Mem=Heap | Op=BOXING"
    }
  ],
  "csb2-c1-e2": [
    {
      "label": "Quotient déjà présent dans la variable out",
      "stdin": "INIT value=17, quotient=3\nMETHOD Div(val n, out q)\nBODY q=n/5\nCALL Div(value, out quotient)",
      "expected": "ETAT_INITIAL: quotient=3, value=17\nMETHODE: Div\nETAT_FINAL: quotient=3, value=17"
    }
  ],
  "csb2-c2-e1": [
    {
      "label": "Dépôt nul sans retrait",
      "stdin": "INIT Titulaire=\"Mina\" Solde=4.00\nDEPOT 0",
      "expected": "Compte: Mina | Solde initial: 4.00\nDEPOT 0.00 => Rejet: ArgumentException (Montant invalide)\nSOLDE_FINAL: 4.00"
    }
  ],
  "csb2-c3-e1": [
    {
      "label": "Dispatch virtuel répété sur référence Base",
      "stdin": "REF Base OBJ Derived CALL Afficher\nREF Base OBJ Derived CALL Afficher",
      "expected": "Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\nBase->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]"
    }
  ],
  "csb2-c3-e2": [
    {
      "label": "Export puis accès direct sans cast",
      "stdin": "CAST IExportable CALL Traiter\nDIRECT CALL Traiter",
      "expected": "IExportable.Traiter => Export JSON genere avec succes\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)"
    },
    {
      "label": "Accès direct puis cast auditable",
      "stdin": "DIRECT CALL Traiter\nCAST IAuditable CALL Traiter",
      "expected": "DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)\nIAuditable.Traiter => Audit journalise dans le registre de conformite"
    }
  ],
  "csb2-c3-e3": [
    {
      "label": "Virement puis inscription",
      "stdin": "PIPELINE Virement\nPIPELINE Inscription",
      "expected": "Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\nPipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]"
    },
    {
      "label": "Inscription puis facture",
      "stdin": "PIPELINE Inscription\nPIPELINE Facture",
      "expected": "Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]\nPipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]"
    }
  ],
  "csb2-c4-e1": [
    {
      "label": "Recherche avec une autre casse sans mise à jour",
      "stdin": "ADD a 1\nTRYGET A",
      "expected": "ADD: a => 1 (Taille=1)\nTRYGET: A => NonTrouve (out val=0)"
    }
  ],
  "csb2-c4-e2": [
    {
      "label": "Filtre client 404 puis repli 401",
      "stdin": "THROW HttpException StatusCode=404\nTHROW HttpException StatusCode=401",
      "expected": "Exception: HttpException (404) => Intercepte par: catch when (StatusCode == 404) [ClientError] | FINALLY execute\nException: HttpException (401) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute"
    },
    {
      "label": "Filtre serveur au seuil 500 puis 503",
      "stdin": "THROW HttpException StatusCode=500\nTHROW HttpException StatusCode=503",
      "expected": "Exception: HttpException (500) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute\nException: HttpException (503) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute"
    }
  ],
  "csb2-c4-e3": [
    {
      "label": "new() seul sans constructeur par défaut",
      "stdin": "CONSTRAINT where T : new()\nCandidate Nom=Flux IsClass=True HasDefaultCtor=False ImplementsComparable=False",
      "expected": "Type Flux: REJETE [Violation: pas de constructeur sans argument new()]"
    }
  ],
  "csb2-c5-e1": [
    {
      "label": "Un seul article exactement au seuil",
      "stdin": "FILTER Prix >= 10\nArticle Nom=Exact Prix=10",
      "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Exact - 10.00\nTOTAL_ELEMENTS: 1"
    }
  ],
  "csb2-c5-e2": [
    {
      "label": "Deux catégories d'un seul achat chacune",
      "stdin": "Ada Alpha 4\nBob Beta 6",
      "expected": "Groupe: Alpha | NbAchats: 1 | Total: 4.00 | Moyenne: 4.00\nGroupe: Beta | NbAchats: 1 | Total: 6.00 | Moyenne: 6.00"
    }
  ],
  "csb2-c5-e3": [
    {
      "label": "Désinscription d'un nom qui n'est qu'un préfixe",
      "stdin": "SUBSCRIBE Anne\nUNSUBSCRIBE Ann\nEMIT \"Signal\"",
      "expected": "EVENT \"Signal\" => Anne recoit la notification"
    }
  ],
  "csb2-c6-e1": [
    {
      "label": "Deux durées unitaires à cumuler",
      "stdin": "TASK A Duree=1ms\nTASK B Duree=1ms",
      "expected": "[T=0ms] Demarrage A -> Await (trace simulee)\n[T=1ms] Reprise contexte -> Demarrage B -> Await\n[T=2ms] Tache completee avec succes. Duree totale=2ms"
    }
  ]
};

for (const exercise of CS2_EXERCISES) {
  if (CS2_LOT1_TESTS[exercise.id]) exercise.tests.unshift(...CS2_LOT1_TESTS[exercise.id]);
  if (CS2_INDEPENDENCE_TESTS[exercise.id]) exercise.tests.push(...CS2_INDEPENDENCE_TESTS[exercise.id]);
}

module.exports = CS2_EXERCISES;
