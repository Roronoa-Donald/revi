# Livrable 07 — Ingénierie du Feedback et Ergonomie Cognitive

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre théorique : Modèle de feedback formatif (Hattie & Timperley, 2007), Théorie de la charge cognitive (Sweller, 1988), Feedback d'échafaudage (Wood, Bruner & Ross, 1976).  
> Date de certification : 3 novembre 2026

---

## 1. Principes Psychologiques du Feedback Formatif

Selon la méta-analyse de John Hattie (2007), le feedback pédagogique constitue l'un des leviers les plus puissants sur la réussite de l'apprentissage (taille d'effet $d = 0.79$), à condition de respecter des règles strictes :
1. **Ne pas donner la réponse toute faite** : révéler directement la solution anéantit l'effort de recherche cognitive (*effet de désengagement*).
2. **Fournir un indice de guidage plutôt qu'un constat d'échec sec** : un message rouge *"Faux"* sans explication génère frustration et anxiété de performance.
3. **Réduire la charge cognitive extrinsèque** : les messages d'erreur doivent être formulés en langage clair et concis, sans acronymes obscurs ni détails techniques internes au banc de test.

---

## 2. Architecture du Feedback à Trois Niveaux

Le système d'évaluation implémente une progression d'échafaudage (*scaffolding*) en 3 paliers successifs :

```
                  SOUMISSION D'UNE RÉPONSE ÉTUDIANTE
                                  │
                                  ▼
      ┌─────────────────────────────────────────────────────────┐
      │   Palier 1 : Diagnostic immédiat d'exécution / syntaxe   │
      │   - Indication de la nature de l'erreur (syntaxe,       │
      │     valeur numérique, commande non adaptée)             │
      └───────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
      ┌─────────────────────────────────────────────────────────┐
      │   Palier 2 : Indice conceptuel ciblé (Hint 1)           │
      │   - Rappel de la règle ou de la formule sans donner     │
      │     le résultat final (ex: "Quelle fonction calcule...") │
      └───────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
      ┌─────────────────────────────────────────────────────────┐
      │   Palier 3 : Indice opératoire avancé (Hint 2)          │
      │   - Précision sur les pièges fréquents ou conversions   │
      │     d'unités (ex: "Attention aux unités : Go vs Gio")   │
      └─────────────────────────────────────────────────────────┘
```

---

## 3. Typologie des Retours d'Erreur dans les Exercices

### 3.1. Rejet Explicite de Quasi-Erreurs Fréquentes
Grâce à `server/exercises/command-validator.js`, lorsqu'un étudiant tape une commande proche mais comportant un défaut professionnel sérieux, le système ne renvoie pas un simple *"Échec du test"*, mais un diagnostic constructif :

| Saisie Étudiante | Diagnostic Retourné à l'Écran | Intérêt Pédagogique |
| :--- | :--- | :--- |
| `chmod 777 fichier.sh` | *"Permissions trop permissives : 777 accorde tous les droits à tout le monde. Utilisez les permissions recommandées (755)."* | Enseignement de la sécurité par défaut (moindre privilège) |
| `rm -rf *` | *"Commande trop risquée sans ciblage précis. Spécifiez explicitement le sous-dossier à nettoyer."* | Prévention des destructions accidentelles en environnement de production |
| `ls -la /` | *"La commande examine la racine globale au lieu du dossier courant demandé dans le scénario."* | Recadrage contextuel sur la consigne |

### 3.2. Diagnostic d'Écart Numérique (Probabilités & Recherche Opérationnelle)
Dans les exercices d'analyse et de calcul :
- **Si l'écart est mineur (arrondi incorrect)** : *"Votre calcul est proche mais l'arrondi ne respecte pas la précision demandée (4 décimales requises)."*
- **Si l'erreur provient de la formule** : *"Le résultat obtenu correspond à une loi binomiale au lieu d'une loi de Poisson. Vérifiez si les conditions d'approximation $n \ge 30$ et $p \le 0.1$ sont satisfaites."*

---

## 4. Politique de Feedback Différenciée (Formatif vs Sommatif)

L'architecture sépare hermétiquement le comportement du feedback selon le contexte pédagogique :

### 4.1. En Mode Entraînement Libre (Chapitres de cours)
- **Instantanéité** : validation question par question dès la sélection.
- **Richesse explicative** : affichage du bloc `<div class="q__exp">` expliquant pourquoi la bonne réponse est vraie et pourquoi les distracteurs sont faux.
- **Droit à l'erreur sans sanction** : possibilité de relire et retenter immédiatement.

### 4.2. En Mode Évaluation Sommative (Sessions d'Examen)
- **Rétention des explications** : interdiction absolue de divulguer les explications ou les clés des questions échouées pendant ou immédiatement après la session sommative.
- **Score global sécurisé** : communication du total des points obtenus et du pourcentage de réussite, sans indication de la position des erreurs pour éviter la rétro-ingénierie par comparaison croisée entre étudiants.
- **Verrouillage post-session** : une session validée ne peut plus être relancée afin de préserver la validité psychométrique des résultats.
