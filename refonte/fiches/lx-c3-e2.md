# Fiche de Conception — lx-c3-e2 : Copier récursivement un répertoire entier

- **Identifiant** : `lx-c3-e2`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 3
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:6`
- **Type d'exercice** : Commande de copie de répertoire
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Sauvegarde à chaud d'un dossier de code source avant une mise à jour délicate.

## 2. Énoncé Complet
Copiez l'intégralité du répertoire 'site_web' ainsi que tout son contenu (fichiers et sous-dossiers) vers un nouveau répertoire nommé 'site_web_backup'.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
cp -r site_web site_web_backup
```

**Étapes de raisonnement :**
1. La commande de copie est 'cp'.
2. Pour copier récursivement un répertoire, l'option '-r' (ou '-R') est obligatoire.
3. La syntaxe est 'cp -r source destination'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `cp -r site_web site_web_backup`
- `cp -R site_web site_web_backup`
- `cp -r ./site_web ./site_web_backup`
- `cp -a site_web site_web_backup`
- `cp --recursive site_web site_web_backup`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `cp site_web site_web_backup` : 'cp' sans option récursive refuse de copier un répertoire et renvoie l'erreur 'cp: -r not specified'.
- `mv site_web site_web_backup` : 'mv' déplace ou renomme le répertoire, il ne conserve pas l'original ; la consigne demande de copier.
- `copy site_web site_web_backup` : La commande Linux est 'cp', pas 'copy'.
- `cp -d site_web site_web_backup` : L'option '-d' préserve les liens ; pour copier un dossier entier, utilisez '-r' ou '-a'.
- `cp -p site_web site_web_backup` : '-p' préserve les attributs, mais ne permet pas la copie récursive sans '-r'.
