# Fiche de Conception — lx-c2-e2 : Identification du rôle des répertoires FHS

- **Identifiant** : `lx-c2-e2`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 2
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.2_Systeme_Fichier.pdf:8`
- **Type d'exercice** : Navigation et repérage FHS
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Modification de la configuration d'un service réseau (ex: SSH, Apache). L'administrateur doit savoir dans quel répertoire se trouvent tous les fichiers de configuration système.

## 2. Énoncé Complet
Déplacez-vous dans le répertoire système standard qui héberge les fichiers de configuration de l'ensemble du système d'exploitation et des services installés.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
cd /etc
```

**Étapes de raisonnement :**
1. Selon la norme FHS enseignée au Chapitre 2 (p. 8), /etc contient tous les fichiers de configuration système textuels.
2. La commande est 'cd /etc'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `cd /etc`
- `cd /etc/`
- `cd "/etc"`
- `cd '/etc'`
- `cd //etc`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `cd /bin` : /bin contient les binaires exécutables indispensables, pas les fichiers de configuration.
- `cd /var` : /var contient les données variables (logs, spools, caches), pas la configuration.
- `cd /home` : /home contient les répertoires personnels des utilisateurs ordinaires.
- `cd /dev` : /dev contient les fichiers spéciaux représentant les périphériques matériels.
- `cd etc` : Utilisez le chemin absolu '/etc' pour être certain de cibler la configuration système.
