# Fiche de Conception — lx-c4-e3 : Rechercher des fichiers par nom avec find

- **Identifiant** : `lx-c4-e3`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 4
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:9`
- **Type d'exercice** : Commande de recherche arborescente
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Maintenance de serveur : localiser tous les fichiers journaux d'extension '.log' dans l'arborescence '/var/log'.

## 2. Énoncé Complet
Recherchez tous les fichiers ordinaires (de type fichier) dont le nom se termine par '.log' situés dans le répertoire '/var/log' ou ses sous-répertoires.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
find /var/log -type f -name '*.log'
```

**Étapes de raisonnement :**
1. La commande de recherche dans l'arborescence est 'find'.
2. Le répertoire de départ est '/var/log'.
3. L'option pour cibler uniquement les fichiers réguliers est '-type f'.
4. L'option de correspondance de nom est '-name "*.log"'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `find /var/log -type f -name '*.log'`
- `find /var/log -type f -name "*.log"`
- `find /var/log -name '*.log' -type f`
- `find /var/log -name "*.log" -type f`
- `find /var/log/ -type f -name '*.log'`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `find /var/log *.log` : Il manque l'option '-name' pour spécifier le motif de recherche du nom de fichier.
- `ls /var/log/*.log` : 'ls' ne cherche pas récursivement dans les sous-dossiers et échoue si aucun fichier n'est trouvé au premier niveau.
- `grep -r '*.log' /var/log` : 'grep' recherche du contenu à l'intérieur des fichiers, pas le nom des fichiers eux-mêmes.
- `find /var/log -type d -name '*.log'` : '-type d' recherche des répertoires, or la consigne demande des fichiers ordinaires ('-type f').
- `whereis *.log` : 'whereis' recherche les binaires système, pas les fichiers dans /var/log.
