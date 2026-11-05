# Livrable 06 — Rapport d'Analyse Psychométrique et Protocole d'Étude Empirique

> Répertoire d'audit : `AUDIT_SCIENTIFIQUE_QUALITE/`  
> Projet audité : `revi-cours-html`  
> Cadre d'évaluation : **Théorie Classique des Tests (TCT)**, Standards AERA/APA/NCME (2014, Chapitre 2 — *Reliability and Precision*).

---

## 1. Inventaire des Données Empiriques et Déclaration d'Intégrité Scientifique

Conformément aux exigences non négociables de la section 10 du mandat d'audit, une inspection exhaustive de la persistance des données du projet a été réalisée :
1. **Base de données PostgreSQL (`server/db.js`, migrations `001` à `005`) :**
   - Tables existantes : `activation_keys`, `sessions`, `activity_logs`, `preparation_progress`, `users`, `ai_config`, `fedapay_webhook_events`.
   - **Constat formel :** Aucune table n'enregistre les soumissions unitaires d'exercices, le détail des réponses sélectionnées aux QCM, les temps de réponse, ou l'historique des tentatives d'étudiants.
2. **Fichiers de journalisation et caches :**
   - Le fichier `notes.json` à la racine ne contient qu'un stub non relié (`{"15": 15}`).
   - Le stockage client (`localStorage` via `assets/js/code-lab.js`) ne conserve que des brouillons locaux sur le navigateur de l'utilisateur.

### Déclaration Méthodologique Fondamentale
En l'absence totale de données de cohortes humaines réelles :
- **Aucun indice de difficulté empirique ($p$-value) n'a été fabriqué.**
- **Aucun indice de discrimination ($D$ ou $r_{\text{pbis}}$) n'a été simulé.**
- **Aucun coefficient de cohérence interne (KR-20, $\alpha$ de Cronbach, $\omega$ de McDonald) n'a été calculé artificiellement.**

Fabriquer de faux échantillons synthétiques d'étudiants pour présenter de faux coefficients psychométriques constituerait une fraude scientifique majeure. L'audit consigne l'état : **Absence de preuves suffisantes par carence d'instrumentation empirique**, et définit ci-dessous le protocole expérimental rigoureux à déployer lors de la phase pilote.

---

## 2. Protocole Psychométrique pour la Phase Pilote de Recueil de Données

Pour permettre à la plateforme d'établir scientifiquement la fiabilité et la discrimination de ses évaluations, l'infrastructure de collecte suivante doit être instrumentée :

### 2.1. Schéma d'Instrumentation de la Base de Données
Création obligatoire de la table de télémétrie psychométrique :
```sql
CREATE TABLE exercise_submissions (
  id BIGSERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES sessions(id),
  exercise_id VARCHAR(50) NOT NULL,
  course_id VARCHAR(50) NOT NULL,
  attempt_number INTEGER NOT NULL DEFAULT 1,
  submitted_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  score NUMERIC(5,2) NOT NULL,
  time_spent_seconds INTEGER,
  error_reason VARCHAR(100),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_sub_ex ON exercise_submissions(exercise_id);
```

---

### 2.2. Métriques Psychométriques et Seuils d'Acceptabilité Universitaires

Dès l'obtention d'un échantillon représentatif ($N \ge 30$ étudiants par cohorte de niveau B1, B2 ou B3, recommandé $N \ge 100$ pour stabilité asymptotique), les métriques suivantes devront être calculées pour chaque item :

#### A. Indice de Difficulté de l'Item ($p$-value)
$$p = \frac{N_{\text{correct}}}{N_{\text{total}}}$$
- **Plage cible d'interprétabilité :** $0,30 \le p \le 0,85$.
- **Items très faciles ($p > 0,90$) :** Légitimes uniquement en début de chapitre pour ancrer un prérequis essentiel (*mastery check*), mais non discriminants pour un examen classant.
- **Items très difficiles ($p < 0,20$) :** Doivent faire l'objet d'un audit qualitatif immédiat (recherche d'ambiguïté dans l'énoncé, corrigé erroné ou défaut du validateur).

#### B. Indice de Discrimination Classique ($D$)
Après tri des étudiants selon leur score total à l'évaluation, division en groupe supérieur ($U$, 27 % supérieurs) et groupe inférieur ($L$, 27 % inférieurs) :
$$D = p_U - p_L$$
- **$D \ge 0,40$ :** Excellente discrimination.
- **$0,30 \le D < 0,39$ :** Discrimination satisfaisante.
- **$0,20 \le D < 0,29$ :** Item marginal à réviser.
- **$D < 0,20$ :** Item défaillant à refondre.
- **$D < 0$ (Discrimination négative) :** Anomalie critique indiquant que les étudiants les plus compétents échouent plus souvent que les étudiants en difficulté (révèle typiquement un corrigé inversé ou un piège sémantique involontaire).

#### C. Corrélation Point-Bisériale ($r_{\text{pbis}}$)
$$r_{\text{pbis}} = \frac{\bar{X}_1 - \bar{X}_0}{S_X} \sqrt{p(1-p)}$$
où $\bar{X}_1$ est la moyenne au test total des étudiants ayant réussi l'item, $\bar{X}_0$ la moyenne de ceux ayant échoué, et $S_X$ l'écart-type global.
- **Seuil minimal acceptable :** $r_{\text{pbis}} \ge 0,25$.

#### D. Efficacité des Distracteurs (pour les QCM)
Pour chaque proposition d'un QCM :
- **Distracteur inopérant :** Choisi par moins de 5 % des étudiants en échec. Il doit être réécrit car il ne joue aucun rôle dans l'évaluation.
- **Distracteur attracteur anormal :** Choisi préférentiellement par les étudiants du groupe supérieur $U$. Révèle une formulation ambiguë où la mauvaise réponse paraît plus plausible ou scientifiquement sophistiquée que la clé officielle.

#### E. Consistance Interne du Test (Kuder-Richardson KR-20 & McDonald's $\omega$)
Pour une batterie d'items dichotomiques homogènes :
$$\text{KR-20} = \frac{k}{k-1} \left( 1 - \frac{\sum p_i (1-p_i)}{\sigma_X^2} \right)$$
- **Seuil attendu pour une évaluation sommative certificative :** $\text{KR-20} \ge 0,80$.
- **Pour une auto-évaluation formative :** $\text{KR-20} \ge 0,70$.

---

## 3. Calendrier Recommandé pour la Validation Psychométrique

1. **Jalon 1 (Mois 1) :** Déploiement de la table `exercise_submissions` et instrumentation du backend Fastify.
2. **Jalon 2 (Mois 2-3) :** Administration lors des premières sessions de cours auprès des promotions B1, B2, B3 ($N \approx 50$ par niveau).
3. **Jalon 3 (Mois 4) :** Extraction des matrices de réponses, calcul des indicateurs $p$, $D$, $r_{\text{pbis}}$ et identification des items à discrimination négative pour remédiation immédiate.
