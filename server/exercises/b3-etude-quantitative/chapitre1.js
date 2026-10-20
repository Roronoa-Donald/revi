/**
 * chapitre1.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "eq3-c1-e1",
    chapter: 1,
    level: "n1",
    language: 'analyse',
    title: "Classificateur de paradigme et méthode de recherche",
    goal: "Qualifier la posture méthodologique d’un projet de recherche selon ses postulats, ses données et ses objectifs.",
    brief: "<p>Pour chaque cas d’application des lignes au format :<br>\n<code>METHODE nom=&lt;nom&gt; raisonnement=&lt;DEDUCTIF|INDUCTIF|ABDUCTIF&gt; donnees=&lt;NUMERIQUE|TEXTUELLE|HYBRIDE&gt; visee=&lt;MESURE|EXPLORATION|TRANSFORMATION&gt;</code>.<br><br>\nRègles de classification :<br>\n1. Si <code>raisonnement=DEDUCTIF</code> et <code>donnees=NUMERIQUE</code> et <code>visee=MESURE</code> :<br>\n   <code>PARADIGME=POSITIVISTE_QUANTITATIF</code>, <code>APPROCHE=STATISTIQUE_CONFIRMATOIRE</code>.<br>\n2. Si <code>raisonnement=INDUCTIF</code> et <code>donnees=TEXTUELLE</code> et <code>visee=EXPLORATION</code> :<br>\n   <code>PARADIGME=INTERPRETATIVISTE_QUALITATIF</code>, <code>APPROCHE=PHENOMENOLOGIQUE_EXPLORATOIRE</code>.<br>\n3. Si <code>donnees=HYBRIDE</code> ou (<code>raisonnement=ABDUCTIF</code>) :<br>\n   <code>PARADIGME=PRAGMATIQUE_MIXTE</code>, <code>APPROCHE=TRIANGULATION_SEQUENTIELLE</code>.<br>\n4. Pour toute autre combinaison :<br>\n   <code>PARADIGME=MIXTE_EMERGENT</code>, <code>APPROCHE=METHODES_COMBINEES</code>.<br><br>\nAfficher pour chaque ligne :<br>\n<code>CADRAGE: {nom} -> {PARADIGME} | {APPROCHE}</code></p>",
    starter: "# Grille d'analyse (eq3-c1-e1) — Classificateur de paradigme et méthode de recherche\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Étude exploratoire par entretiens]\n# Données : METHODE nom=EntretiensExperts raisonnement=INDUCTIF donnees=TEXTUELLE visee=EXPLORATION\nA_COMPLETER\n\n[Cas 2 — Méthodes mixtes avec données hybrides]\n# Données : METHODE nom=EtudeUsageWeb raisonnement=ABDUCTIF donnees=HYBRIDE visee=TRANSFORMATION\nA_COMPLETER\n\n[Cas 3 — Approche atypique combinée]\n# Données : METHODE nom=AuditProcessus raisonnement=DEDUCTIF donnees=TEXTUELLE visee=MESURE\nA_COMPLETER\n",
    hints: [
          "Extraire chaque clé par expression régulière ou découpage.",
          "Appliquer les conditions dans l’ordre indiqué."
    ],
    examples: [
          {
                "stdin": "METHODE nom=SondageSatisfaction raisonnement=DEDUCTIF donnees=NUMERIQUE visee=MESURE",
                "expected": "CADRAGE: SondageSatisfaction -> POSITIVISTE_QUANTITATIF | STATISTIQUE_CONFIRMATOIRE",
                "note": "Approche déductive chiffrée avec mesure : paradigme positiviste pur."
          }
    ],
    tests: [
          {
                "label": "Étude exploratoire par entretiens",
                "stdin": "cas:1",
                "expected": "CADRAGE: EntretiensExperts -> INTERPRETATIVISTE_QUALITATIF | PHENOMENOLOGIQUE_EXPLORATOIRE"
          },
          {
                "label": "Méthodes mixtes avec données hybrides",
                "stdin": "cas:2",
                "expected": "CADRAGE: EtudeUsageWeb -> PRAGMATIQUE_MIXTE | TRIANGULATION_SEQUENTIELLE"
          },
          {
                "label": "Approche atypique combinée",
                "stdin": "cas:3",
                "expected": "CADRAGE: AuditProcessus -> MIXTE_EMERGENT | METHODES_COMBINEES"
          }
    ],
    solution: "[Exemple]\nCADRAGE: SondageSatisfaction -> POSITIVISTE_QUANTITATIF | STATISTIQUE_CONFIRMATOIRE\n\n[Cas 1 — Étude exploratoire par entretiens]\nCADRAGE: EntretiensExperts -> INTERPRETATIVISTE_QUALITATIF | PHENOMENOLOGIQUE_EXPLORATOIRE\n\n[Cas 2 — Méthodes mixtes avec données hybrides]\nCADRAGE: EtudeUsageWeb -> PRAGMATIQUE_MIXTE | TRIANGULATION_SEQUENTIELLE\n\n[Cas 3 — Approche atypique combinée]\nCADRAGE: AuditProcessus -> MIXTE_EMERGENT | METHODES_COMBINEES\n"
  },
  {
    id: "eq3-c1-e2",
    chapter: 1,
    level: "n2",
    language: 'analyse',
    title: "Auditeur de complétude du cadre conceptuel d’enquête",
    goal: "Vérifier la rigueur de définition des piliers d’une enquête de recherche (Terrain, Population cible, Base de sondage, Unité).",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>ENQUETE id=&lt;id&gt; TERRAIN=&lt;v&gt; POPULATION_CIBLE=&lt;v&gt; BASE_SONDAGE=&lt;v&gt; UNITE_SONDAGE=&lt;v&gt; OBJECTIF=&lt;v&gt;</code>.<br><br>\nRègles de validation :<br>\n- Une composante est <strong>valide</strong> si sa valeur n'est ni <code>NON_DEFINI</code>, ni <code>INCONNU</code>, ni <code>VIDE</code> (insensible à la casse).<br>\n- Ordre officiel des 5 composantes : <code>TERRAIN</code>, <code>POPULATION_CIBLE</code>, <code>BASE_SONDAGE</code>, <code>UNITE_SONDAGE</code>, <code>OBJECTIF</code>.<br><br>\nCalculs :<br>\n- Compter le nombre de composantes valides $V \\in [0..5]$.<br>\n- Calculer le taux de complétude : $TC = (V / 5.0) \\times 100$ (1 décimale).<br>\n- Lister les composantes manquantes (ou <code>AUCUN</code> si $V=5$).<br>\n- Statut :<br>\n  - Si $V == 5$ : <code>STATUT=CADRE_ROBUSTE_VALIDE</code><br>\n  - Sinon si $V \\ge 3$ : <code>STATUT=CADRE_PARTIEL_A_PRECISER (MANQUES=[...])</code><br>\n  - Sinon : <code>STATUT=CADRE_INSUFFISANT_REJETE (MANQUES=[...])</code><br><br>\nAfficher :<br>\n<code>AUDIT_CADRE: {id} -> SCORE={V}/5 ({TC:.1f}%) | {STATUT}</code></p>",
    starter: "# Grille d'analyse (eq3-c1-e2) — Auditeur de complétude du cadre conceptuel d’enquête\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Cadre partiel manquant de base de sondage]\n# Données : ENQUETE id=EtudeEtudiants TERRAIN=Universites POPULATION_CIBLE=EtudiantsMaster BASE_SONDAGE=NON_DEFINI UNITE_SONDAGE=Etudiant OBJECTIF=StressExamens\nA_COMPLETER\n\n[Cas 2 — Cadre largement insuffisant]\n# Données : ENQUETE id=ProjetBrouillon TERRAIN=NON_DEFINI POPULATION_CIBLE=INCONNU BASE_SONDAGE=VIDE UNITE_SONDAGE=Client OBJECTIF=Satisfaction\nA_COMPLETER\n\n[Cas 3 — Cadre robuste avec sigles spécifiques]\n# Données : ENQUETE id=AuditCyber TERRAIN=HopitauxPublics POPULATION_CIBLE=RSSI_GHT BASE_SONDAGE=RegistreANSSI UNITE_SONDAGE=IngenieurSecurite OBJECTIF=MaturiteNIS2\nA_COMPLETER\n",
    hints: [
          "Garder l’ordre exact des 5 composantes pour lister les manques.",
          "Comparer en majuscules pour filtrer NON_DEFINI, INCONNU, VIDE."
    ],
    examples: [
          {
                "stdin": "ENQUETE id=SondageCloud TERRAIN=EntreprisesPME POPULATION_CIBLE=DSI_France BASE_SONDAGE=AnnuaireSyntec UNITE_SONDAGE=ResponsableIT OBJECTIF=AdoptionSaaS",
                "expected": "AUDIT_CADRE: SondageCloud -> SCORE=5/5 (100.0%) | STATUT=CADRE_ROBUSTE_VALIDE",
                "note": "Toutes les 5 composantes sont rigoureusement définies."
          }
    ],
    tests: [
          {
                "label": "Cadre partiel manquant de base de sondage",
                "stdin": "cas:1",
                "expected": "AUDIT_CADRE: EtudeEtudiants -> SCORE=4/5 (80.0%) | STATUT=CADRE_PARTIEL_A_PRECISER (MANQUES=[BASE_SONDAGE])"
          },
          {
                "label": "Cadre largement insuffisant",
                "stdin": "cas:2",
                "expected": "AUDIT_CADRE: ProjetBrouillon -> SCORE=2/5 (40.0%) | STATUT=CADRE_INSUFFISANT_REJETE (MANQUES=[TERRAIN, POPULATION_CIBLE, BASE_SONDAGE])"
          },
          {
                "label": "Cadre robuste avec sigles spécifiques",
                "stdin": "cas:3",
                "expected": "AUDIT_CADRE: AuditCyber -> SCORE=5/5 (100.0%) | STATUT=CADRE_ROBUSTE_VALIDE"
          }
    ],
    solution: "[Exemple]\nAUDIT_CADRE: SondageCloud -> SCORE=5/5 (100.0%) | STATUT=CADRE_ROBUSTE_VALIDE\n\n[Cas 1 — Cadre partiel manquant de base de sondage]\nAUDIT_CADRE: EtudeEtudiants -> SCORE=4/5 (80.0%) | STATUT=CADRE_PARTIEL_A_PRECISER (MANQUES=[BASE_SONDAGE])\n\n[Cas 2 — Cadre largement insuffisant]\nAUDIT_CADRE: ProjetBrouillon -> SCORE=2/5 (40.0%) | STATUT=CADRE_INSUFFISANT_REJETE (MANQUES=[TERRAIN, POPULATION_CIBLE, BASE_SONDAGE])\n\n[Cas 3 — Cadre robuste avec sigles spécifiques]\nAUDIT_CADRE: AuditCyber -> SCORE=5/5 (100.0%) | STATUT=CADRE_ROBUSTE_VALIDE\n"
  },
  {
    id: "eq3-c1-e3",
    chapter: 1,
    level: "n3",
    language: 'analyse',
    title: "Évaluateur de triangulation méthodologique et robustesse",
    goal: "Mesurer la diversité des sources de triangulation (Denzin : données, chercheurs, théories, méthodes) et qualifier la validité scientifique.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>TRIANGULATION etude=&lt;nom&gt; donnees=&lt;N1&gt; chercheurs=&lt;N2&gt; theories=&lt;N3&gt; methodes=&lt;N4&gt;</code>.<br>\nOù chaque entier représente le nombre de sources distinctes mobilisées pour chaque axe.<br><br>\nRègles de calcul de score par axe :<br>\n- <code>Données</code> : 1 source = 10 pts, 2 sources = 20 pts, $\\ge 3$ sources = 25 pts.<br>\n- <code>Chercheurs</code> : 1 chercheur = 10 pts, $\\ge 2$ chercheurs (relecture croisée) = 25 pts.<br>\n- <code>Théories</code> : 1 théorie = 10 pts, $\\ge 2$ théories (confrontation de modèles) = 25 pts.<br>\n- <code>Méthodes</code> : 1 méthode (mono-méthode) = 10 pts, $\\ge 2$ méthodes (mixte quanti/quali) = 25 pts.<br><br>\nScore global $= S_{donnees} + S_{chercheurs} + S_{theories} + S_{methodes}$ (sur 100 points).<br><br>\nQualification de la robustesse :<br>\n- Si Score $\\ge 85$ : <code>ROBUSTESSE=EXCELLENTE_TRIANGULATION_FORTE</code><br>\n- Sinon si Score $\\ge 60$ : <code>ROBUSTESSE=SATISFAISANTE_TRIANGULATION_MOYENNE</code><br>\n- Sinon : <code>ROBUSTESSE=FRAGILE_MONO_PERSPECTIVE (BIAIS_ELEVÉ)</code><br><br>\nAfficher :<br>\n<code>TRIANGULATION_SCORE: {etude} -> SCORE={Score}/100 | {ROBUSTESSE}</code></p>",
    starter: "# Grille d'analyse (eq3-c1-e3) — Évaluateur de triangulation méthodologique et robustesse\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Étude mono-méthode classique avec équipe]\n# Données : TRIANGULATION etude=SondageSimple donnees=1 chercheurs=2 theories=1 methodes=1\nA_COMPLETER\n\n[Cas 2 — Étude mixte avec sources multiples]\n# Données : TRIANGULATION etude=RechercheUsabilite donnees=2 chercheurs=1 theories=2 methodes=2\nA_COMPLETER\n\n[Cas 3 — Triangulation forte avec données massives]\n# Données : TRIANGULATION etude=ImpactIA donnees=4 chercheurs=3 theories=2 methodes=1\nA_COMPLETER\n",
    hints: [
          "Appliquer les seuils de barème pour chacun des 4 piliers.",
          "Faire la somme des 4 composantes pour obtenir la note sur 100."
    ],
    examples: [
          {
                "stdin": "TRIANGULATION etude=AuditSecurite donnees=3 chercheurs=2 theories=2 methodes=2",
                "expected": "TRIANGULATION_SCORE: AuditSecurite -> SCORE=100/100 | ROBUSTESSE=EXCELLENTE_TRIANGULATION_FORTE",
                "note": "Triangulation maximale sur les 4 axes de Denzin : 25x4 = 100 pts."
          }
    ],
    tests: [
          {
                "label": "Étude mono-méthode classique avec équipe",
                "stdin": "cas:1",
                "expected": "TRIANGULATION_SCORE: SondageSimple -> SCORE=55/100 | ROBUSTESSE=FRAGILE_MONO_PERSPECTIVE (BIAIS_ELEVÉ)"
          },
          {
                "label": "Étude mixte avec sources multiples",
                "stdin": "cas:2",
                "expected": "TRIANGULATION_SCORE: RechercheUsabilite -> SCORE=80/100 | ROBUSTESSE=SATISFAISANTE_TRIANGULATION_MOYENNE"
          },
          {
                "label": "Triangulation forte avec données massives",
                "stdin": "cas:3",
                "expected": "TRIANGULATION_SCORE: ImpactIA -> SCORE=85/100 | ROBUSTESSE=EXCELLENTE_TRIANGULATION_FORTE"
          }
    ],
    solution: "[Exemple]\nTRIANGULATION_SCORE: AuditSecurite -> SCORE=100/100 | ROBUSTESSE=EXCELLENTE_TRIANGULATION_FORTE\n\n[Cas 1 — Étude mono-méthode classique avec équipe]\nTRIANGULATION_SCORE: SondageSimple -> SCORE=55/100 | ROBUSTESSE=FRAGILE_MONO_PERSPECTIVE (BIAIS_ELEVÉ)\n\n[Cas 2 — Étude mixte avec sources multiples]\nTRIANGULATION_SCORE: RechercheUsabilite -> SCORE=80/100 | ROBUSTESSE=SATISFAISANTE_TRIANGULATION_MOYENNE\n\n[Cas 3 — Triangulation forte avec données massives]\nTRIANGULATION_SCORE: ImpactIA -> SCORE=85/100 | ROBUSTESSE=EXCELLENTE_TRIANGULATION_FORTE\n"
  }
];
