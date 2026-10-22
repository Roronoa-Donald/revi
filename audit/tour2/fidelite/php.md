# Fidélité aux Sources (Mission A) — `php` (PHP · B2)

- **Cours** : `php` (PHP) — Niveau **B2** (6 chapitres)
- **Documents sources rattachés (2 fichiers, 55 pages)** :
- `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt` (53 pages, statut `ok`)
- `textes/B2/php/TP3 PHP OBJET CDP B2 IT 2026.txt` (2 pages, statut `ok`)
- **Niveau de confiance** : **Élevé**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Diagnostic d'alignement séquentiel** : **Progression globalement alignée sur les supports sources**
- **Jalons extraits des sources (`PLANS.md` & `textes/`)** :
- `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt#PAGE 1` : *COURS DÉVELOPPEMENT PHP ORIENTÉ OBJET*
- `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt#PAGE 9` : *while (condition réalisée) {*
- `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt#PAGE 17` : *echo $obj2->private; // Indéfini*
- `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt#PAGE 25` : *public function __construct($n, $p, $r){*
- `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt#PAGE 33` : *const VILLE = 'Lyon';*
- `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt#PAGE 41` : *mysqli_free_result($resultat);*
- `textes/B2/php/TP3 PHP OBJET CDP B2 IT 2026.txt#PAGE 1` : *TP3 PHP Objet*
- `textes/B2/php/TP3 PHP OBJET CDP B2 IT 2026.txt#PAGE 2` : *return $this->X/$this->Y ."</br>";*
- **Progression des chapitres sur le site** :
- `php/chapitres/chapitre1.html` : **Chapitre 1 — Objets et classes** — 1. Pourquoi passer à l’objet (`L80`), 2. Déclarer une classe et son constructeur (`L89`), 3. Méthodes et état (`L108`), 4. Instancier et utiliser un objet (`L116`)
- `php/chapitres/chapitre2.html` : **Chapitre 2 — Encapsulation, constantes et membres statiques** — 1. Encapsulation et visibilité (`L80`), 2. Getters et setters qui valident (`L95`), 3. Constantes de classe (`L106`), 4. Membres statiques (`L121`)
- `php/chapitres/chapitre3.html` : **Chapitre 3 — Héritage, classes abstraites et interfaces** — 1. Hériter d’une classe (`L80`), 2. Redéfinir et appeler le parent (`L102`), 3. Classes abstraites (`L115`), 4. Polymorphisme et interfaces (`L127`)
- `php/chapitres/chapitre4.html` : **Chapitre 4 — Traits, namespaces et chargement des classes** — 1. Les traits : réutiliser sans hériter (`L80`), 2. Résoudre un conflit de traits (`L94`), 3. Les namespaces (`L108`), 4. Importer et charger les classes (`L119`)
- `php/chapitres/chapitre5.html` : **Chapitre 5 — Erreurs et exceptions** — 1. Erreur et exception (`L80`), 2. Lancer et attraper (`L89`), 3. Exceptions personnalisées (`L106`), 4. finally et multi-catch (`L122`)
- `php/chapitres/chapitre6.html` : **Chapitre 6 — PDO, dépôt de données et architecture** — 1. Se connecter avec PDO (`L80`), 2. Requêtes préparées contre l’injection SQL (`L91`), 3. Le patron dépôt (repository) (`L102`), 4. Architecture en couches et projet (`L119`)

## 2. Couverture (Lacunes & Ajouts)
- Les 6 chapitres du site couvrent les notions des 2 document(s) source(s) (55 pages).

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — classe
- **Source PDF** : `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt#PAGE 1` : « 1) Le concept d’objet et de classe............................................................................................................. 12 2) Le principe d’encapsula on ..... »
- **Site web** : `php/chapitres/chapitre1.html:L82` : « **classe** : décrit la forme d’une donnée : quelles propriétés elle possède et quelles opérations ont le droit de la modifier. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 2 — propriétés
- **Source PDF** : `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt#PAGE 1` : « .... 14 3) Accéder aux propriétés d'un objet ................................................................................................... 14 4) Accéder aux méthodes d'un »
- **Site web** : `php/chapitres/chapitre1.html:L86` : « **propriétés** : (variables) décrivent l’état ; les »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

### Définition 3 — Écrire le constructeur
- **Source PDF** : `textes/B2/php/COURS PHP OBJET CDP B2 IT 2026_part3.txt#PAGE 21` : « ent Il arrive que vous ayez à écrire du code qui fait référence aux attributs et méthodes des classes mères. C'est encore vrai puisque la classe fille est une spécialisation de la classe »
- **Site web** : `php/chapitres/chapitre1.html:L358` : « **Écrire le constructeur** : qui range ces propriétés à partir d’arguments typés. »
- **Diagnostic** : Définition du site fidèle au sens de la source et reformulée de façon synthétique pour la révision.

## 4. Alignement des Exercices avec les TD/TP des Sources
- Langage des ateliers sur le site : `php`.
