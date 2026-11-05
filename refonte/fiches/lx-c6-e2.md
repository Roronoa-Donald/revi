# Fiche de Conception — lx-c6-e2 : Permissions symboliques pour restreindre l'accès

- **Identifiant** : `lx-c6-e2`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 6
- **Source académique exacte** : `cours B1 IT/LINUX/TP2_Droit_Acces_Fichier_Unix.pdf:1`
- **Type d'exercice** : Attribution de permissions symboliques
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Sécurisation d'un fichier sensible de clés de configuration : retrait immédiat des droits d'accès aux autres utilisateurs (others).

## 2. Énoncé Complet
En utilisant obligatoirement la notation symbolique de chmod, retirez le droit de lecture à la catégorie 'autres' (others) sur le fichier 'config.ini' sans toucher aux droits de l'utilisateur ni du groupe.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
chmod o-r config.ini
```

**Étapes de raisonnement :**
1. La catégorie 'autres' est représentée par 'o' (others).
2. Retirer un droit se fait avec le signe '-'.
3. Le droit de lecture est 'r'.
4. La commande est 'chmod o-r config.ini'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `chmod o-r config.ini`
- `chmod o-r ./config.ini`
- `chmod o-r "config.ini"`
- `chmod o= config.ini`
- `chmod o-rw config.ini`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `chmod g-r config.ini` : 'g' cible le groupe ; la consigne demande de retirer les droits aux autres ('o').
- `chmod u-r config.ini` : 'u' cible le propriétaire (user) ; utilisez 'o' pour les autres utilisateurs.
- `chmod 640 config.ini` : La consigne impose obligatoirement la notation symbolique (ex: o-r), pas la notation octale.
- `chmod -r config.ini` : '-r' sans préfixe retire la lecture à tout le monde (u, g, o), y compris le propriétaire !
- `chmod o+r config.ini` : Le signe '+' ajoute un droit ; pour retirer un droit, utilisez '-' (o-r).
