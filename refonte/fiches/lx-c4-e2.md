# Fiche de Conception — lx-c4-e2 : Rechercher une chaîne insensible à la casse avec grep

- **Identifiant** : `lx-c4-e2`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 4
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:8`
- **Type d'exercice** : Commande de filtrage de motifs
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Analyse d'incidents : repérer toutes les occurrences du mot 'failed' (quelle que soit sa casse : FAILED, Failed, failed) dans le fichier '/var/log/auth.log'.

## 2. Énoncé Complet
Recherchez toutes les lignes contenant le mot 'failed' dans le fichier '/var/log/auth.log' en ignorant la différence entre majuscules et minuscules.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
grep -i 'failed' /var/log/auth.log
```

**Étapes de raisonnement :**
1. La commande de recherche textuelle par motif est 'grep'.
2. L'option pour l'insensibilité à la casse est '-i' (--ignore-case).
3. La syntaxe est 'grep -i motif fichier'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `grep -i failed /var/log/auth.log`
- `grep -i 'failed' /var/log/auth.log`
- `grep -i "failed" /var/log/auth.log`
- `grep --ignore-case failed /var/log/auth.log`
- `grep -iE 'failed' /var/log/auth.log`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `grep failed /var/log/auth.log` : Sans l'option '-i', grep est sensible à la casse et manquera 'FAILED' ou 'Failed'.
- `find failed /var/log/auth.log` : 'find' cherche des fichiers dans l'arborescence, pour chercher du texte dans un fichier utilisez 'grep'.
- `cat /var/log/auth.log` : 'cat' affiche tout sans filtrer ; combinez avec 'grep -i' ou appliquez grep directement.
- `grep -v failed /var/log/auth.log` : '-v' inverse la recherche (affiche les lignes qui NE contiennent PAS le mot).
- `locate failed` : 'locate' recherche des noms de fichiers dans une base de données, pas du contenu de fichier.
