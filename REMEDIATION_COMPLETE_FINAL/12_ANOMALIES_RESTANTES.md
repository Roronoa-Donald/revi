# Livrable 12 — Registre des Anomalies Résiduelles et Backlog Pédagogique

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Transparence métrologique, Guide NBME (2024), Gestion de la dette technique logicielle.  
> Date de certification : 3 novembre 2026

---

## 1. Philosophie de Transparence et Refus du Maquillage

La certification métrologique d'une plateforme d'évaluation universitaire exige de consigner avec une sincérité absolue ce qui a été résolu et ce qui reste à parfaire.
L'équipe de remédiation refuse catégoriquement d'apposer une estampille *"100 % conforme"* sur des contenus qui nécessitent encore un travail d'expertise matière avec les enseignants responsables.

Le présent document détaille le registre des éléments en attente d'arbitrage pédagogique humain et les chantiers techniques programmés pour les prochains cycles.

---

## 2. Les 184 Questions QCM Signalées pour Revue Humaine Approfondie

Sur les **3 089 items QCM** que compte la plateforme, **184 items (6,0 %)** ont été isolés dans `03_REGISTRE_QCM_FINAL.csv` avec la mention `Revue_Humaine_Requise = OUI`.
Ces questions sont fonctionnelles et protégées techniquement contre la triche par l'API serveur, mais leur rédaction présente des défauts de conception psychométrique au regard des 14 règles du Guide NBME 2024 :

```
┌────────────────────────────────────────────────────────────────────────┐
│             TYPOLOGIE DES 184 ITEMS SIGNALÉS (NBME 2024)               │
├────────────────────────────────────────────────────┬───────────────────┤
│ Motif du Signalement                               │ Nombre d'Items    │
├────────────────────────────────────────────────────┼───────────────────┤
│ Règle 6 : Formulations négatives ("N'est pas...")  │ 78 items          │
│ Règle 8 : Options génériques ("Toutes / Aucune")   │ 46 items          │
│ Règle 11 : Distracteurs non plausibles ou pauvres  │ 32 items          │
│ Règle 3 : Asymétrie flagrante de longueur d'option │ 28 items          │
├────────────────────────────────────────────────────┼───────────────────┤
│ TOTAL DES ITEMS EN ATTENTE D'ARBITRAGE ENSEIGNANT  │ 184 items         │
└────────────────────────────────────────────────────┴───────────────────┘
```

### 2.1. Exemples Concrets et Plan d'Action Recommandé

#### Exemple 1 — Formulation Négative (Cybersécurité B1 / Réseaux B2)
- **Énoncé actuel** : *"Parmi les propositions suivantes, laquelle N'EST PAS une bonne pratique de configuration de pare-feu ?"*
- **Défaut psychométrique** : La négation perturbe le traitement cognitif de l'étudiant et évalue sa vigilance orthosyntaxique plutôt que sa compétence technique.
- **Action de remédiation** : Réécrire en cas d'analyse positive : *"Un administrateur réseau doit durcir la politique de filtrage d'un serveur web public. Quelle règle doit être appliquée en priorité selon le principe du moindre privilège ?"*

#### Exemple 2 — Options « Toutes les réponses » (Systèmes B1 / Cloud B3)
- **Énoncé actuel** : Option D = *"Toutes les réponses ci-dessus sont vraies."*
- **Défaut psychométrique** : Si l'étudiant sait que deux options sont vraies, il choisit immédiatement D par simple déduction logique sans même lire la troisième.
- **Action de remédiation** : Remplacer par un quatrième distracteur technique réaliste représentant une mauvaise interprétation fréquente des mécanismes d'équilibrage de charge.

---

## 3. Chantiers Techniques et Pôles Disciplinaires en Réserve

Les 354 exercices placés sous politique de suspension constituent la feuille de route prioritaire des futurs lots d'ingénierie didactique :

| Domaine Disciplinaire | Volume Suspendu | Raison Technique / Pédagogique | Solution Architecturale Cible |
| :--- | :--- | :--- | :--- |
| **SQL B1, B2, B3** | 54 exercices (3 cours x 18 ex) | Absence de moteur SQL avec flux `stdin` complet | Généralisation du banc client WebAssembly (`sql.js`) testé avec succès sur `b1-sql` |
| **C# B2** | 18 exercices | Typage fort et gestion des nombres à virgule fixe | Intégration d'un validateur AST Roslyn ou runner C# pré-compilé |
| **Docker B2** | 18 exercices | Risque de sécurité lié aux daemons conteneurisés | Évaluation par inspection statique de `Dockerfile` et `docker-compose.yml` |
| **Linux B3 & GitHub B3** | 36 exercices | Décalage entre flux textuels simples et compétences B3 | Migration vers des défis d'automatisation CI/CD et scripts durcis |
| **Catalogue Général** | 228 exercices | Preuves cryptographiques manquantes | Passage systématique sur le banc de certification de mutants |

---

## 4. Feuille de Route d'Intégration et Déploiement

1. **Sprint 1 (Semaines 1-2)** : Session de travail avec les enseignants coordinateurs pour arbitrer les 184 questions QCM signalées et injecter les réécritures validées.
2. **Sprint 2 (Semaines 3-4)** : Déploiement du moteur WebAssembly SQL sur les cours `sql` B2 et `b3-sql`.
3. **Sprint 3 (Semaines 5-8)** : Certification progressive des 228 fiches restantes lot par lot avec génération de leurs empreintes SHA-256 dans `grading-evidence.json`.
