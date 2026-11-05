# Livrable 05 — Spécification et Architecture des Validateurs

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : IEEE 829 (Test Documentation), POSIX.1-2017 (Shell & Utilities), Standards psychométriques d'évaluation assistée par ordinateur.  
> Date de certification : 3 novembre 2026

---

## 1. Principes Directeurs des Nouveaux Validateurs

L'évaluation automatisée de code et de réponses techniques doit concilier deux impératifs souvent contradictoires :
1. **Éviter les faux négatifs** : ne pas pénaliser un étudiant dont le raisonnement et la réponse sont techniquement justes mais dont la formulation varie légèrement (espaces superflus, ordre des drapeaux, virgule décimale vs point, etc.).
2. **Éviter les faux positifs** : ne pas accepter une réponse erronée, incomplète ou issue d'une méthode interdite par simple laxisme de comparaison.

Pour garantir cette rigueur, le système d'évaluation s'appuie sur une suite de validateurs modulaires et déterministes.

---

## 2. Le Validateur Déterministe de Commandes Shell (`server/exercises/command-validator.js`)

Pour les cours d'administration système (Linux B1, Cisco CCNA, Windows Server), l'exécution de conteneurs pour de simples commandes de manipulation de fichiers ou d'interrogation était une source de lenteur, d'instabilité réseau et de risques sécuritaires.

Le module `command-validator.js` offre une validation déterministe en mémoire avec les garanties suivantes :

### 2.1. Règles de Normalisation Syntaxique
La fonction `normalizeCommand(cmd)` applique une réduction canonique :
- **Espaces blancs** : réduction des espaces multiples, tabulations et retours à un espace simple, et élimination des espaces de bord (`trim`).
- **Chemins relatifs redondants** : suppression des préfixes `./` non signifiants (`cat ./mon_fichier.txt` -> `cat mon_fichier.txt`) et des slashs finaux sur les répertoires (`cd dossier/` -> `cd dossier`).
- **Permutation et combinaison des drapeaux courts (Commande `ls`)** :
  - Les drapeaux courts sont découpés en caractères uniques, dédoublonnés et triés par ordre alphabétique.
  - Ainsi, les commandes suivantes sont toutes canonisées en `ls -al` :
    - `ls -la`
    - `ls -al`
    - `ls -l -a`
    - `ls -a -l`
    - `ls   -a   -l`
- **Sémantique rigoureuse des guillemets Shell** :
  - Les guillemets simples (`'...'`) neutralisent l'expansion de variables : `'echo $HOME'` n'est pas confondu avec `"echo $HOME"`. Si une variable shell (`$`) est présente, le type de guillemet est rigoureusement préservé.

### 2.2. Détection Ciblée des Quasi-Erreurs Fréquentes
Le validateur intègre une liste prioritaire d'expressions régulières de rejet (`rejected`) pour intercepter les erreurs d'inattention ou de mauvaises pratiques professionnelles et fournir un feedback immédiat avant même la comparaison :
- **Permissions excessives** : rejet de `chmod 777` avec le message *"Permissions trop permissives : 777 accorde tous les droits à tout le monde. Utilisez des permissions adaptées."*
- **Suppression récursive dangereuse** : rejet de `rm -rf /` ou `rm -rf *` non ciblé.
- **Drapeau manquant ou incompatible** : indication de l'option spécifique attendue.

### 2.3. Protection contre les Attaques par Déni de Service (ReDoS)
- La constante `MAX_COMMAND_LENGTH = 512` borne strictement la longueur de toute commande analysée.
- Les motifs d'expression régulière sont non récursifs et compilés avec des drapeaux bornés.

---

## 3. Typologie des Comparateurs du Moteur d'Évaluation

Le moteur de test supporte les modes de comparaison suivants, configurables par exercice ou par cas de test :

| Mode / Comparateur | Domaine Disciplinaire | Fonctionnement et Tolérances | Exemple de Cas Traité |
| :--- | :--- | :--- | :--- |
| **`exact`** | Algorithmique pure, chaînes formatées | Comparaison binaire stricte (`actual === expected`), sans tolérance | Formatage exact de chaînes de caractères |
| **`command_challenge`**| Linux B1, Shell, Commandes réseau | Validation par automates, motifs regex et normalisation déterministe | `ls -la` vs `ls -al` |
| **`fraction_reduite`** | Probabilités, Mathématiques B1/B2 | Parsing du numérateur et dénominateur entiers après réduction | `1/4` accepté pour `2/8` si fraction réduite demandée |
| **`approximate`** / `opts.tolerance` | Modélisation, Statistiques, RO | Formule mixte : $\|a - b\| \le \max(\varepsilon_{abs}, \varepsilon_{rel} \cdot \|b\|)$ | Flottants proches au millionième (`0.333333` vs `1/3`) |
| **`analyse`** | Études de cas, Gestion, Droit, SI | Nettoyage diacritique, casse insensible, espaces normalisés | `valide : oui` == `Valide: Oui` |
| **`structured_json`** | API REST, Flask, Microservices | Comparaison de graphes d'objets avec tolérance de format de clé | JSON ordonné différemment mais équivalent |

---

## 4. Validateurs de Méthodes et d'Arbres Syntaxiques (AST)

Pour les exercices d'algorithmique et de programmation structurée où l'étudiant doit impérativement utiliser une méthode précise (par exemple récursion vs itération, ou tri par fusion vs tri à bulles), le moteur dispose de sondes d'inspection de code :

### 4.1. Inspection Statique AST (`method-check.js`)
- Analyse le code source soumis à l'aide d'un parseur AST (Esprima / Acorn pour JavaScript, ast module pour Python).
- Vérifie la présence de structures imposées :
  - Détection de récursion : appel d'une fonction à elle-même dans son propre corps.
  - Détection de boucles : présence de `while` ou `for` pour les exercices itératifs.
  - Interdiction de built-ins : rejet de l'utilisation de `sorted()` ou `.sort()` lorsque l'étudiant doit implémenter un algorithme de tri à la main.

### 4.2. Diagnostic d'Isolation des Variables
Pour éviter les effets de bord indésirables :
- Vérification que les variables internes ne polluent pas l'espace global.
- Confinement strict des flux d'entrées/sorties via wrappers d'exécution.

---

## 5. Synthèse des Garanties Métrologiques

Les validateurs révisés éliminent l'ensemble des causes historiques de contestation des notes :
1. **Élimination des faux échecs par invites textuelles** : le filtrage des préfixes interactifs (`stripPromptPollution`) permet à l'étudiant d'écrire un script convivial sans être sanctionné.
2. **Préservation des notations scientifiques** : aucune confusion entre unités (`4g`, `10h`) et variables mathématiques (`4x1`).
3. **Traçabilité totale** : chaque test échoué fournit un motif précis, l'entrée ayant provoqué l'échec et l'écart observé.
