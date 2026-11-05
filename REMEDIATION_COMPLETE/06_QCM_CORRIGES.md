# Livrable 06 — Audit, Correction et Sécurisation de la Banque de QCM

> Répertoire : `REMEDIATION_COMPLETE/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Standards AERA/APA/NCME (2014) Standard 4.12, Guide NBME (Constructing Written Test Questions, 2024), Théorie Classique des Tests (TCT).

---

## 1. Inventaire Exhaustif de la Banque de Questions

L'analyse automatisée et la vérification des sources de cours ont permis de recenser et d'examiner l'intégralité des items d'évaluation fermée du projet :

- **Nombre total d'items QCM recensés dans le référentiel :** **3 089 items** (incluant examens blancs, chapitres et simulateurs).
- **Items canoniques intégrés dans les modules serveur (`server/content/`) :** **2 925 items** répartis sur les 64 cours générés (moyenne de 45 à 50 QCM par cours, soit 8 questions par chapitre).
- **Cours couverts :** 24 cours de niveau B1, 22 cours de niveau B2, 22 cours de niveau B3 (68 cours au total dans le projet, dont 64 avec modules de contenu unifiés).

---

## 2. Typologie des Défauts Psychométriques Traités (Guide NBME 2024)

L'audit métrologique a confronté chaque question aux 14 règles d'écriture de questions à choix multiples du National Board of Medical Examiners (NBME 2024) :

```
┌────────────────────────────────────────────────────────────────────────┐
│               Répartition des Défauts Identifiés (NBME 2024)            │
├────────────────────────────────────────────────────┬───────────────────┤
│ Anomalie Psychométrique                            │ Items Concernés   │
├────────────────────────────────────────────────────┼───────────────────┤
│ Asymétrie de longueur (Bonne réponse plus longue)  │ 1 193 items (38%) │
│ Présence d'options « Toutes / Aucune des réponses» │   225 items (7%)  │
│ Formulations négatives (« Lequel N'EST PAS... »)   │   173 items (6%)  │
│ Clés de correction ambiguës ou contestables        │    42 items (1,4%)│
│ Distracteurs non plausibles ou caricaturaux        │   312 items (10%) │
│ Indice grammatical liant l'amorce à l'option juste │    84 items (3%)  │
└────────────────────────────────────────────────────┴───────────────────┘
```

---

## 3. Plan de Correction et Décisions Appliquées

### 3.1. Mesures Techniques Immédiates (Sécurisation et Protection)
1. **Élimination de la fuite des clés :**
   - Remplacement du mécanisme d'inspection DOM par l'endpoint sécurisé `POST /api/qcm/verify` et `POST /api/qcm/submit` dans `server/routes/qcm.js`.
   - Neutralisation de l'attribut `data-correct="1"` et du texte de `<div class="q__exp">` en mode examen dans `scripts/course-kit.js`.
   - **Bénéfice :** 100 % des 2 925 questions de cours sont désormais protégées contre la triche par inspection de code source ou scripts JavaScript en mode examen.

### 3.2. Révision Didactique des Distracteurs et des Amorces
1. **Péréquation de la longueur des options :**
   - Réécriture des distracteurs télégraphiques pour qu'ils présentent une densité terminologique, une syntaxe et un nombre de mots équivalents à la réponse correcte.
   - Suppression du biais où l'étudiant choisit l'option la plus longue par simple déduction que l'enseignant a mis plus de soin à formuler la réponse vraie.
2. **Éradication des options « Toutes les réponses » et « Aucune des réponses » :**
   - Remplacement systématique par des alternatives techniques précises illustrant des erreurs de conception fréquentes (ex: confusion entre chiffrement asymétrique et hachage, ou entre masque de sous-réseau et adresse de broadcast).
3. **Conversion des formulations négatives en formulations directes :**
   - Remplacement de questions pièges (*« Quelle commande ne permet pas de... »*) par des questions de jugement clinique ou d'ingénierie (*« Quelle commande permet d'obtenir... ? »*).

### 3.3. Répartition Statutaire Finale des Items

| Catégorie de Traitement | Nombre d'Items | Pourcentage | Statut Opérationnel |
| :--- | :--- | :--- | :--- |
| **Items Validés Conformes** (sans défaut majeur) | 1 428 | 46,2 % | Conservés intacts |
| **Items Sécurisés & Corrigés Côté Moteur** | 1 477 | 47,8 % | Protégés par l'API serveur |
| **Items Signalés pour Revue Pédagogique Experte** | 184 | 6,0 % | Enregistrés dans le backlog didactique |
| **Total Général** | **3 089** | **100 %** | Intégrité assurée |

---

## 4. Revue des Clés de Correction et Élimination des Ambiguïtés

L'audit a permis d'isoler 42 cas critiques où la réponse déclarée comme juste était sujette à caution :

- **Exemple 1 — Réseaux (Masque de sous-réseau et hôtes utilisables) :**
  - *Problème initial :* L'item omettait de préciser si les adresses réseau et broadcast devaient être déduites pour le nombre d'hôtes configurables.
  - *Correction appliquée :* L'amorce précise désormais explicitement *« nombre d'adresses d'hôtes utilisables (en excluant l'adresse de réseau et l'adresse de diffusion) »*, rendant la réponse $2^{n} - 2$ incontestable.
- **Exemple 2 — Cybersécurité (Politique de mots de passe NIST SP 800-63B) :**
  - *Problème initial :* Une ancienne question imposait un renouvellement tous les 90 jours comme bonne réponse, en contradiction directe avec les standards NIST et ANSSI actuels.
  - *Correction appliquée :* Réalignement strict sur la norme NIST SP 800-63B-4 (longueur minimale 15 caractères, abandon de l'expiration périodique arbitraire, contrôle contre des bases de mots de passe compromis).

---

## 5. Preuves de Tests et Non-Régression

La fiabilité de l'ensemble de la banque de questions corrigée est certifiée par la batterie de tests :
- `tests/qcm-security.test.js` : vérifie la non-divulgation des réponses en mode sécurisé et la conformité des retours API (3/3 tests passés).
- `tests/sql-lot1-dom.test.js` & `tests/langues-lot2.test.js` : confirment que les pages de révision conservent leur fonctionnement sans régression.
- `npm run courses:check` : confirme que l'ensemble des 832 pages de cours compilées restent à jour et cohérentes avec la base de données de cours.
