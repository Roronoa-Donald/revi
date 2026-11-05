# Fiche de Conception — ro2-c1-e2 : Contraintes d'atelier M1/M2, marges résiduelles et saturation

- **Identifiant** : `ro2-c1-e2`
- **Matière** : Recherche Opérationnelle B2 (`RD-RO`)
- **Chapitre** : 1
- **Source académique exacte** : `RD-RO/ref/DS-B2A-IT.pdf:1 & DS-B2B-IT.pdf:1 (Partie B)`
- **Type d'exercice** : Vérification de faisabilité et calcul d'écarts (slacks)
- **Composant d'interface** : Grille d'analyse CodeLab

## 1. Contexte Métier & Académique
Capacités machines : M1 dispose de 120h (requiert 3h/P1 et 4h/P2), M2 dispose de 60h (requiert 2h/P1 et 1h/P2). Calcul de consommation et d'écarts résiduels.

## 2. Énoncé Complet
Les contraintes machines sont :
- Machine M1 : 3·x1 + 4·x2 <= 120 heures
- Machine M2 : 2·x1 + 1·x2 <= 60 heures
Pour le plan candidat (x1 = 20, x2 = 10), vérifiez la faisabilité et calculez les marges inemployées s1 et s2.

## 3. Solution Rédigée & Étapes Pédagogiques
**Résolution mathématique canonique :**
```text
[Exemple]
REALISABLE s1=20 s2=10

[Cas 1 — Plan x1=20, x2=10]
REALISABLE s1=20 s2=10

[Cas 2 — Plan x1=24, x2=12]
REALISABLE s1=0 s2=0

[Cas 3 — Plan x1=35, x2=5]
IRREALISABLE VIOLATION_M2
```

**Étapes de raisonnement & calculs vérifiés :**
1. M1 : 3(20) + 4(10) = 60 + 40 = 100 <= 120. Écart s1 = 120 - 100 = 20h.
2. M2 : 2(20) + 1(10) = 40 + 10 = 50 <= 60. Écart s2 = 60 - 50 = 10h.
3. Les deux capacités sont respectées avec marge : REALISABLE s1=20 s2=10.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `REALISABLE s1=20 s2=10`
- `REALISABLE s1 = 20 s2 = 10`
- `s1=20 s2=10`
- `REALISABLE (20, 10)`
- `REALISABLE s1=20, s2=10`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `IRREALISABLE` : Conso M1 = 100h <= 120h et Conso M2 = 50h <= 60h : toutes les contraintes sont respectées.
- `s1=0 s2=0` : Le plan (20, 10) ne sature pas les machines, il reste 20h sur M1 et 10h sur M2.
- `s1=100 s2=50` : 100 et 50 sont les heures CONSOMMÉES ; l'écart s_i est la capacité restante inemployée (b_i - conso).
- `VIOLATION_SIGNE` : x1=20 et x2=10 sont positives, aucune violation de non-négativité.
- `VIOLATION_M1` : La machine M1 consomme 100h sur 120h disponibles : aucune violation sur M1.
