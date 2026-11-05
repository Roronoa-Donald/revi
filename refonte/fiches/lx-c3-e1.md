# Fiche de Conception — lx-c3-e1 : Créer une arborescence complète avec répertoires parents

- **Identifiant** : `lx-c3-e1`
- **Matière** : Linux B1 (`b1-linux`)
- **Chapitre** : 3
- **Source académique exacte** : `cours B1 IT/LINUX/Chap.4_Commandes_de_Base_Unix.pdf:6`
- **Type d'exercice** : Commande de création de répertoires
- **Composant d'interface** : Console interactive CodeLab

## 1. Contexte Métier & Académique
Initialisation de la structure d'un nouveau projet de développement logiciel sur un serveur.

## 2. Énoncé Complet
Créez en une seule commande l'arborescence complète 'projet/src/modeles' dans le répertoire courant, en créant automatiquement tous les répertoires parents intermédiaires manquants s'ils n'existent pas déjà.

## 3. Solution Rédigée & Étapes Pédagogiques
**Commande canonique attendue :**
```bash
mkdir -p projet/src/modeles
```

**Étapes de raisonnement :**
1. La commande de création de répertoire est 'mkdir'.
2. L'option pour créer récursivement les répertoires parents manquants sans lever d'erreur est '-p' (--parents).
3. L'argument est 'projet/src/modeles'.

## 4. Jeu de Tests : Variantes Acceptées & Erreurs Rejetées

### Variantes acceptées (au moins 5 testées) :
- `mkdir -p projet/src/modeles`
- `mkdir -p ./projet/src/modeles`
- `mkdir -p "projet/src/modeles"`
- `mkdir --parents projet/src/modeles`
- `mkdir -p projet/src/modeles/`

### Quasi-erreurs et erreurs classiques rejetées (avec retour ciblé) :
- `mkdir projet/src/modeles` : Sans l'option '-p', 'mkdir' échoue dès qu'un répertoire parent ('projet' ou 'src') n'existe pas.
- `touch -p projet/src/modeles` : 'touch' crée des fichiers vides, pas des répertoires ; utilisez 'mkdir -p'.
- `md -p projet/src/modeles` : La commande standard Linux est 'mkdir', pas 'md'.
- `mkdir -r projet/src/modeles` : L'option pour les répertoires parents de 'mkdir' est '-p', pas '-r'.
- `mkdir -m projet/src/modeles` : '-m' configure les permissions ; pour créer les parents manquants, utilisez '-p'.
