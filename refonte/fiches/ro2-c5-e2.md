# Fiche de Conception — ro2-c5-e2 : Théorème de dualité forte : égalité des valeurs optimales

- **Identifiant** : `ro2-c5-e2`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 5
- **Source académique exacte** : `RD-RO/ref/Examen Final RO.pdf:2 (Partie C)`
- **Type d'exercice** : Application du théorème fondamental de la dualité
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Contrôle d'intégrité de la résolution : si le primal admet une solution optimale finie Z*, alors le dual admet une solution optimale finie W* et Z* = W*.

## 2. Énoncé Complet
La résolution du programme primal de maximisation a fourni une valeur optimale de profit Z* = 1 800 €.
1. D'après le théorème de dualité forte, quelle est la valeur optimale W* du programme dual de minimisation ?
2. Si une contrainte primale dispose d'une marge d'écart strictement positive à l'optimum (s1* = 15 > 0), que vaut la variable duale associée y1* selon le théorème des écarts complémentaires ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
W* = 1800 ; y1* = 0

[Cas 1 — Valeur optimale duale W*]
W* = 1800

[Cas 2 — Variable duale associee a ecart positif s1>0]
y1* = 0
```

**Étapes de raisonnement & calculs vérifiés :**
1. Par le théorème de dualité forte : Z* = W*, donc W* = 1 800 €.
2. Par le théorème des écarts complémentaires : s1* · y1* = 0. Comme s1* = 15 > 0, on a obligatoirement y1* = 0.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `W* = 1800`
- `1800`
- `y1* = 0`
- `y1 = 0`
- `W = 1800`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `y1* = 15` : Par le théorème des écarts complémentaires, s1* et y1* ne peuvent pas être simultanément non nuls : si s1* > 0, alors y1* = 0.
- `W* > 1800` : À l'optimum, le saut de dualité est nul : Z* = W* = 1800.
- `W* = 0` : La valeur optimale du dual est égale à celle du primal : 1800 €.
- `y1* > 0` : Une ressource non saturée (avec marge inemployée s1 > 0) a une valeur marginale nulle : son prix d'ombre est 0.
- `-1800` : Le profit optimal est positif : 1800.
