# Fiche de Conception — lx-c6-e3 : Changement récursif de propriétaire et de groupe

- **Identifiant** : `lx-c6-e3`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 6
- **Source académique exacte** : `cours B1 IT/LINUX/TP2_Droit_Acces_Fichier_Unix.pdf:1`
- **Type d'exercice** : Commande d'attribution de propriété récursive
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Transfert de maintenance d'une application : affectation de tout le dossier web à l'utilisateur 'www-data' et au groupe 'www-data'.

## 2. Énoncé Complet
Attribuez récursivement la propriété du dossier '/var/www/html' ainsi que de tous ses sous-fichiers et sous-dossiers à l'utilisateur 'www-data' et au groupe 'www-data'.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
chown -R www-data:www-data /var/www/html
```

**Étapes de raisonnement :**
1. La commande de changement de propriétaire est 'chown'.
2. L'option récursive est '-R'.
3. La syntaxe combinée utilisateur:groupe est 'www-data:www-data'.
4. La cible est '/var/www/html'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `chown -R www-data:www-data /var/www/html`
- `chown -R www-data.www-data /var/www/html`
- `chown -R www-data:www-data /var/www/html/`
- `chown --recursive www-data:www-data /var/www/html`
- `chown -R 'www-data:www-data' /var/www/html`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `chown www-data:www-data /var/www/html` : Sans l'option récursive '-R', seuls les droits du dossier racine changent, pas ceux des sous-fichiers.
- `chmod -R www-data:www-data /var/www/html` : 'chmod' modifie les permissions (rwx), pas le propriétaire ; utilisez 'chown'.
- `chgrp -R www-data /var/www/html` : 'chgrp' ne change que le groupe, la consigne demande de changer à la fois le propriétaire et le groupe.
- `chown -r www-data:www-data /var/www/html` : Pour 'chown', l'option récursive s'écrit en majuscule : '-R'.
- `chown -R www-data /var/www/html` : Cette commande oublie de modifier le groupe ; spécifiez 'www-data:www-data'.
