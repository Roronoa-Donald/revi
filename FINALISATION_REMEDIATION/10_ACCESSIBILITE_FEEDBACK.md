# Livrable 10 — Rétroaction Didactique, Accessibilité Numérique et Règle Zéro Émoji

> Répertoire de livraison : `FINALISATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Référentiels : WCAG 2.2 niveau AA, ISO 9241-11, Modèle d'étayage de Bruner (1976)  
> Date de certification : 3 novembre 2026  

---

## 1. Système de Rétroaction Didactique Échelonnée (*Scaffolding*)

Dans un environnement d'apprentissage technique, les messages d'erreur ne doivent être ni des sanctions binaires brutales ni des divulgations anticipées de la solution. Le système de feedback de `revi-cours-html` est articulé en trois paliers didactiques progressifs :

```
                        SOUMISSION DE L'APPRENANT
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
[ÉVALUATION FORMATIVE (LAB)]                        [ÉVALUATION SOMMATIVE (EXAMEN)]
          │                                                   │
          ├─► Palier 1 : Diagnostic d'Intention               ├─► En cours d'épreuve :
          │   (quasi-erreur shell, casse, syntaxe)            │   Aucun feedback divulgué
          │                                                   │   (verrouillage anti-oracle HTTP 403)
          ├─► Palier 2 : Étayage Didactique                   │
          │   (rappel de la règle de cours ou du principe)    └─► Après soumission et clôture :
          │                                                       Palier 3 : Consultation complète
          └─► Exercice suspendu conservatoirement :               via GET /api/qcm/exam/review/:id
              Message explicatif clair sur le blocage
```

### 1.1. Les Trois Paliers de Feedback
1. **Palier 1 — Diagnostic d'Intention** : identification immédiate des quasi-erreurs fréquentes (ex: oubli du drapeau récursif `-r` dans `rm`, inversion des arguments de `tar`, omission du point-virgule) sans gaspiller de ressources serveur.
2. **Palier 2 — Étayage Didactique** : orientation de l'étudiant vers la notion théorique ou la formule pertinente (ex: « *Vérifiez que la somme des probabilités de votre loi conjointe est égale à 1* ») sans donner le résultat numérique.
3. **Palier 3 — Explication Rétrospective Post-Clôture** : restitution intégrale des justifications pédagogiques après la clôture définitive de l'évaluation sur l'endpoint dédié `GET /api/qcm/exam/review/:sessionId`.

---

## 2. Conformité aux Standards d'Accessibilité Numérique (WCAG 2.2 AA)

L'audit technique d'accessibilité a porté sur la structure des gabarits HTML générés et sur les interactions dynamiques du Code Lab :

### 2.1. Navigation Clavier et Visibilité du Focus
- **Lien d'évitement (*Skip Link*)** : chaque page propose en premier élément interactif un lien d'évitement `<a href="#main-content" class="skip-link">Passer au contenu</a>`, activable au clavier pour franchir les menus de navigation redondants.
- **Indicateurs de focus contrastés** : aucun contour n'est désactivé (`outline: none` proscrit). Tous les éléments interactifs (boutons radio QCM, liens, boutons d'exécution, éditeur Monaco) disposent d'un anneau de focus renforcé (`outline: 2px solid #2563eb; outline-offset: 2px`).
- **Pièges clavier neutralisés dans Monaco Editor** : l'éditeur de code est configuré pour autoriser la sortie du focus clavier via la touche `F1` ou la combinaison `Tab`/`Shift+Tab` sans bloquer la navigation séquentielle de l'utilisateur.

### 2.2. Structure Sémantique et Lecteurs d'Écran
- **Points de repère régionaux (Landmarks ARIA)** : hiérarchie stricte des conteneurs `<header>`, `<nav role="navigation">`, `<main id="main-content">` et `<footer>`.
- **Formulaires QCM accessibles** :
  * Chaque question forme un conteneur `<fieldset>` dont le libellé constitue la `<legend>`, garantissant la restitution du contexte de la question lors de la vocalisation.
  * Chaque option radio `<input type="radio">` est associée de manière univoque à son `<label for="...">`.
- **Hiérarchie des titres** : un unique titre de premier niveau `<h1>` par page, suivi d'un découpage ordonné `<h2>` à `<h4>` sans saut arbitraire de niveau.

### 2.3. Ratios de Contraste Visuel et Ergonomie Tactile
- **Contraste textuel** : respect strict du seuil minimal de **4,5:1** pour le texte courant et de **3:1** pour les éléments d'interface actifs et les textes de grand corps (vérifié selon l'algorithme WCAG 2.2).
- **Cibles tactiles mobiles** : les boutons et zones de sélection tactile respectent une dimension minimale de **44 × 44 pixels** avec un espacement suffisant pour prévenir les erreurs de saisie sur tablette ou smartphone.

---

## 3. Règle Absolue : Politique Zéro Émoji

Dans le cadre d'une formation supérieure d'ingénieurs et d'administrateurs d'infrastructures informatiques, l'usage d'émojis graphiques ou décoratifs est banni de l'ensemble du projet.

### 3.1. Rationale Déontologique et Technique
1. **Sobriété et rigueur universitaire** : l'interface d'évaluation doit refléter les standards des outils professionnels d'entreprise (terminaux d'administration, consoles cloud, portails d'évaluation certifiante).
2. **Accessibilité et clarté vocale** : les émojis sont vocalisés de manière perturbante ou verbeuse par les lecteurs d'écran lors des examens chronométrés.
3. **Intégrité d'encodage multi-environnements** : les glyphes Unicode sur 4 octets provoquent fréquemment des corruptions d'affichage sur les consoles Linux minimales, terminaux PowerShell Windows ou pipelines CI/CD.

### 3.2. Métaphores Vectorielles et Notations Formelles
- **Icônes graphiques** : toutes les métaphores fonctionnelles proviennent du fichier vectoriel centralisé `/assets/img/ui-icons.svg`.
- **Notations admises** : les symboles mathématiques (`∈`, `∑`, `≤`, `≥`, `≠`), logiques (`∧`, `∨`, `¬`) et les flèches d'orientation typographiques (`→`, `←`) sont seuls admis au titre de notation formelle internationale.

### 3.3. Preuve Automatisée de Conformité
Le script de contrôle [scripts/verifier_finalisation.js](file:///home/rd/Desktop/proba/scripts/verifier_finalisation.js) scanne l'intégralité des fichiers textuels du dossier de livraison :
- **Résultat de l'analyse** : **0 émoji détecté** sur la totalité des 16 livrables et registres de données.
