# Fiche de Conception — lx-c6-e1 : Permissions octales standard pour script exécutable

- **Identifiant** : `lx-c6-e1`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 6
- **Source académique exacte** : `cours B1 IT/LINUX/TP2_Droit_Acces_Fichier_Unix.pdf:1`
- **Type d'exercice** : Attribution de permissions octales
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Déploiement d'un script système : le propriétaire doit pouvoir lire, modifier et exécuter le script (rwx = 7), tandis que le groupe et les autres utilisateurs ne doivent pouvoir que le lire et l'exécuter (r-x = 5).

## 2. Énoncé Complet
Quelle commande en notation octale permet d'attribuer au fichier 'sauvegarde.sh' les droits suivants : lecture, écriture et exécution pour le propriétaire (rwx), lecture et exécution pour le groupe (r-x), et lecture et exécution pour les autres (r-x) ?

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
chmod 755 sauvegarde.sh
```

**Étapes de raisonnement :**
1. Propriétaire : r=4, w=2, x=1 -> 4+2+1 = 7.
2. Groupe : r=4, w=0, x=1 -> 4+1 = 5.
3. Autres : r=4, w=0, x=1 -> 4+1 = 5.
4. La valeur octale est donc 755 : 'chmod 755 sauvegarde.sh'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `chmod 755 sauvegarde.sh`
- `chmod 755 ./sauvegarde.sh`
- `chmod 0755 sauvegarde.sh`
- `chmod 755 "sauvegarde.sh"`
- `chmod 755 'sauvegarde.sh'`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `chmod 775 sauvegarde.sh` : 775 donnerait le droit d'écriture (w) au groupe, ce qui viole la consigne (r-x = 5).
- `chmod 777 sauvegarde.sh` : 777 donne tous les droits à tout le monde, ce qui est une faute grave de sécurité.
- `chmod 644 sauvegarde.sh` : 644 ne donne aucun droit d'exécution (x), le script ne pourrait pas être exécuté.
- `chown 755 sauvegarde.sh` : 'chown' modifie le propriétaire d'un fichier, pour modifier les permissions utilisez 'chmod'.
- `chmod +x sauvegarde.sh` : La consigne demande la notation octale exacte (755).
