/**
 * Exercices Chapitre 1 — Étude Quantitative & Qualitative B3.
 * Fondements Épistémologiques & Cadrage Méthodologique.
 */
'use strict';

module.exports = [
  {
    id: 'eq3-c1-e1',
    chapter: 1,
    title: 'Classificateur de paradigme et méthode de recherche',
    level: 'n1',
    language: 'python',
    goal: 'Qualifier la posture méthodologique d’un projet de recherche selon ses postulats, ses données et ses objectifs.',
    brief: '<p>Le script lit sur l\'entrée standard des lignes au format :<br>\n<code>METHODE nom=&lt;nom&gt; raisonnement=&lt;DEDUCTIF|INDUCTIF|ABDUCTIF&gt; donnees=&lt;NUMERIQUE|TEXTUELLE|HYBRIDE&gt; visee=&lt;MESURE|EXPLORATION|TRANSFORMATION&gt;</code>.<br><br>\nRègles de classification :<br>\n1. Si <code>raisonnement=DEDUCTIF</code> et <code>donnees=NUMERIQUE</code> et <code>visee=MESURE</code> :<br>\n   <code>PARADIGME=POSITIVISTE_QUANTITATIF</code>, <code>APPROCHE=STATISTIQUE_CONFIRMATOIRE</code>.<br>\n2. Si <code>raisonnement=INDUCTIF</code> et <code>donnees=TEXTUELLE</code> et <code>visee=EXPLORATION</code> :<br>\n   <code>PARADIGME=INTERPRETATIVISTE_QUALITATIF</code>, <code>APPROCHE=PHENOMENOLOGIQUE_EXPLORATOIRE</code>.<br>\n3. Si <code>donnees=HYBRIDE</code> ou (<code>raisonnement=ABDUCTIF</code>) :<br>\n   <code>PARADIGME=PRAGMATIQUE_MIXTE</code>, <code>APPROCHE=TRIANGULATION_SEQUENTIELLE</code>.<br>\n4. Pour toute autre combinaison :<br>\n   <code>PARADIGME=MIXTE_EMERGENT</code>, <code>APPROCHE=METHODES_COMBINEES</code>.<br><br>\nAfficher pour chaque ligne :<br>\n<code>CADRAGE: {nom} -> {PARADIGME} | {APPROCHE}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier le cadrage épistémologique et méthodologique
`,
    hints: [
      'Extraire chaque clé par expression régulière ou découpage.',
      'Appliquer les conditions dans l’ordre indiqué.'
    ],
    examples: [
      {
        stdin: 'METHODE nom=SondageSatisfaction raisonnement=DEDUCTIF donnees=NUMERIQUE visee=MESURE',
        expected: 'CADRAGE: SondageSatisfaction -> POSITIVISTE_QUANTITATIF | STATISTIQUE_CONFIRMATOIRE',
        note: 'Approche déductive chiffrée avec mesure : paradigme positiviste pur.'
      }
    ],
    tests: [
      {
        label: 'Étude exploratoire par entretiens',
        stdin: 'METHODE nom=EntretiensExperts raisonnement=INDUCTIF donnees=TEXTUELLE visee=EXPLORATION',
        expected: 'CADRAGE: EntretiensExperts -> INTERPRETATIVISTE_QUALITATIF | PHENOMENOLOGIQUE_EXPLORATOIRE'
      },
      {
        label: 'Méthodes mixtes avec données hybrides',
        stdin: 'METHODE nom=EtudeUsageWeb raisonnement=ABDUCTIF donnees=HYBRIDE visee=TRANSFORMATION',
        expected: 'CADRAGE: EtudeUsageWeb -> PRAGMATIQUE_MIXTE | TRIANGULATION_SEQUENTIELLE'
      },
      {
        label: 'Approche atypique combinée',
        stdin: 'METHODE nom=AuditProcessus raisonnement=DEDUCTIF donnees=TEXTUELLE visee=MESURE',
        expected: 'CADRAGE: AuditProcessus -> MIXTE_EMERGENT | METHODES_COMBINEES'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'nom=([^\\s]+)\\s+raisonnement=([^\\s]+)\\s+donnees=([^\\s]+)\\s+visee=([^\\s]+)', lig)
    if not m:
        continue
    nom, rais, don, vis = m.groups()
    
    if rais == 'DEDUCTIF' and don == 'NUMERIQUE' and vis == 'MESURE':
        paradigme = 'POSITIVISTE_QUANTITATIF'
        approche = 'STATISTIQUE_CONFIRMATOIRE'
    elif rais == 'INDUCTIF' and don == 'TEXTUELLE' and vis == 'EXPLORATION':
        paradigme = 'INTERPRETATIVISTE_QUALITATIF'
        approche = 'PHENOMENOLOGIQUE_EXPLORATOIRE'
    elif don == 'HYBRIDE' or rais == 'ABDUCTIF':
        paradigme = 'PRAGMATIQUE_MIXTE'
        approche = 'TRIANGULATION_SEQUENTIELLE'
    else:
        paradigme = 'MIXTE_EMERGENT'
        approche = 'METHODES_COMBINEES'
        
    print(f"CADRAGE: {nom} -> {paradigme} | {approche}")
`
  },
  {
    id: 'eq3-c1-e2',
    chapter: 1,
    title: 'Auditeur de complétude du cadre conceptuel d’enquête',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la rigueur de définition des piliers d’une enquête de recherche (Terrain, Population cible, Base de sondage, Unité).',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>ENQUETE id=&lt;id&gt; TERRAIN=&lt;v&gt; POPULATION_CIBLE=&lt;v&gt; BASE_SONDAGE=&lt;v&gt; UNITE_SONDAGE=&lt;v&gt; OBJECTIF=&lt;v&gt;</code>.<br><br>\nRègles de validation :<br>\n- Une composante est <strong>valide</strong> si sa valeur n\'est ni <code>NON_DEFINI</code>, ni <code>INCONNU</code>, ni <code>VIDE</code> (insensible à la casse).<br>\n- Ordre officiel des 5 composantes : <code>TERRAIN</code>, <code>POPULATION_CIBLE</code>, <code>BASE_SONDAGE</code>, <code>UNITE_SONDAGE</code>, <code>OBJECTIF</code>.<br><br>\nCalculs :<br>\n- Compter le nombre de composantes valides $V \\in [0..5]$.<br>\n- Calculer le taux de complétude : $TC = (V / 5.0) \\times 100$ (1 décimale).<br>\n- Lister les composantes manquantes (ou <code>AUCUN</code> si $V=5$).<br>\n- Statut :<br>\n  - Si $V == 5$ : <code>STATUT=CADRE_ROBUSTE_VALIDE</code><br>\n  - Sinon si $V \\ge 3$ : <code>STATUT=CADRE_PARTIEL_A_PRECISER (MANQUES=[...])</code><br>\n  - Sinon : <code>STATUT=CADRE_INSUFFISANT_REJETE (MANQUES=[...])</code><br><br>\nAfficher :<br>\n<code>AUDIT_CADRE: {id} -> SCORE={V}/5 ({TC:.1f}%) | {STATUT}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la rigueur du cadrage d'enquête
`,
    hints: [
      'Garder l’ordre exact des 5 composantes pour lister les manques.',
      'Comparer en majuscules pour filtrer NON_DEFINI, INCONNU, VIDE.'
    ],
    examples: [
      {
        stdin: 'ENQUETE id=SondageCloud TERRAIN=EntreprisesPME POPULATION_CIBLE=DSI_France BASE_SONDAGE=AnnuaireSyntec UNITE_SONDAGE=ResponsableIT OBJECTIF=AdoptionSaaS',
        expected: 'AUDIT_CADRE: SondageCloud -> SCORE=5/5 (100.0%) | STATUT=CADRE_ROBUSTE_VALIDE',
        note: 'Toutes les 5 composantes sont rigoureusement définies.'
      }
    ],
    tests: [
      {
        label: 'Cadre partiel manquant de base de sondage',
        stdin: 'ENQUETE id=EtudeEtudiants TERRAIN=Universites POPULATION_CIBLE=EtudiantsMaster BASE_SONDAGE=NON_DEFINI UNITE_SONDAGE=Etudiant OBJECTIF=StressExamens',
        expected: 'AUDIT_CADRE: EtudeEtudiants -> SCORE=4/5 (80.0%) | STATUT=CADRE_PARTIEL_A_PRECISER (MANQUES=[BASE_SONDAGE])'
      },
      {
        label: 'Cadre largement insuffisant',
        stdin: 'ENQUETE id=ProjetBrouillon TERRAIN=NON_DEFINI POPULATION_CIBLE=INCONNU BASE_SONDAGE=VIDE UNITE_SONDAGE=Client OBJECTIF=Satisfaction',
        expected: 'AUDIT_CADRE: ProjetBrouillon -> SCORE=2/5 (40.0%) | STATUT=CADRE_INSUFFISANT_REJETE (MANQUES=[TERRAIN, POPULATION_CIBLE, BASE_SONDAGE])'
      },
      {
        label: 'Cadre robuste avec sigles spécifiques',
        stdin: 'ENQUETE id=AuditCyber TERRAIN=HopitauxPublics POPULATION_CIBLE=RSSI_GHT BASE_SONDAGE=RegistreANSSI UNITE_SONDAGE=IngenieurSecurite OBJECTIF=MaturiteNIS2',
        expected: 'AUDIT_CADRE: AuditCyber -> SCORE=5/5 (100.0%) | STATUT=CADRE_ROBUSTE_VALIDE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

COMPOSANTES = ['TERRAIN', 'POPULATION_CIBLE', 'BASE_SONDAGE', 'UNITE_SONDAGE', 'OBJECTIF']

for lig in lignes:
    m_id = re.search(r'id=([^\\s]+)', lig)
    if not m_id:
        continue
    eid = m_id.group(1)
    
    valides = 0
    manques = []
    
    for comp in COMPOSANTES:
        m_val = re.search(rf'\\b{comp}=([^\\s]+)', lig)
        val = m_val.group(1) if m_val else ''
        val_up = val.strip().upper()
        if val and val_up not in ['NON_DEFINI', 'INCONNU', 'VIDE', 'NONE']:
            valides += 1
        else:
            manques.append(comp)
            
    tc = (valides / 5.0) * 100.0
    
    if valides == 5:
        statut = 'STATUT=CADRE_ROBUSTE_VALIDE'
    elif valides >= 3:
        statut = f"STATUT=CADRE_PARTIEL_A_PRECISER (MANQUES=[{', '.join(manques)}])"
    else:
        statut = f"STATUT=CADRE_INSUFFISANT_REJETE (MANQUES=[{', '.join(manques)}])"
        
    print(f"AUDIT_CADRE: {eid} -> SCORE={valides}/5 ({tc:.1f}%) | {statut}")
`
  },
  {
    id: 'eq3-c1-e3',
    chapter: 1,
    title: 'Évaluateur de triangulation méthodologique et robustesse',
    level: 'n3',
    language: 'python',
    goal: 'Mesurer la diversité des sources de triangulation (Denzin : données, chercheurs, théories, méthodes) et qualifier la validité scientifique.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>TRIANGULATION etude=&lt;nom&gt; donnees=&lt;N1&gt; chercheurs=&lt;N2&gt; theories=&lt;N3&gt; methodes=&lt;N4&gt;</code>.<br>\nOù chaque entier représente le nombre de sources distinctes mobilisées pour chaque axe.<br><br>\nRègles de calcul de score par axe :<br>\n- <code>Données</code> : 1 source = 10 pts, 2 sources = 20 pts, $\\ge 3$ sources = 25 pts.<br>\n- <code>Chercheurs</code> : 1 chercheur = 10 pts, $\\ge 2$ chercheurs (relecture croisée) = 25 pts.<br>\n- <code>Théories</code> : 1 théorie = 10 pts, $\\ge 2$ théories (confrontation de modèles) = 25 pts.<br>\n- <code>Méthodes</code> : 1 méthode (mono-méthode) = 10 pts, $\\ge 2$ méthodes (mixte quanti/quali) = 25 pts.<br><br>\nScore global $= S_{donnees} + S_{chercheurs} + S_{theories} + S_{methodes}$ (sur 100 points).<br><br>\nQualification de la robustesse :<br>\n- Si Score $\\ge 85$ : <code>ROBUSTESSE=EXCELLENTE_TRIANGULATION_FORTE</code><br>\n- Sinon si Score $\\ge 60$ : <code>ROBUSTESSE=SATISFAISANTE_TRIANGULATION_MOYENNE</code><br>\n- Sinon : <code>ROBUSTESSE=FRAGILE_MONO_PERSPECTIVE (BIAIS_ELEVÉ)</code><br><br>\nAfficher :<br>\n<code>TRIANGULATION_SCORE: {etude} -> SCORE={Score}/100 | {ROBUSTESSE}</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le score de triangulation Denzin et la robustesse
`,
    hints: [
      'Appliquer les seuils de barème pour chacun des 4 piliers.',
      'Faire la somme des 4 composantes pour obtenir la note sur 100.'
    ],
    examples: [
      {
        stdin: 'TRIANGULATION etude=AuditSecurite donnees=3 chercheurs=2 theories=2 methodes=2',
        expected: 'TRIANGULATION_SCORE: AuditSecurite -> SCORE=100/100 | ROBUSTESSE=EXCELLENTE_TRIANGULATION_FORTE',
        note: 'Triangulation maximale sur les 4 axes de Denzin : 25x4 = 100 pts.'
      }
    ],
    tests: [
      {
        label: 'Étude mono-méthode classique avec équipe',
        stdin: 'TRIANGULATION etude=SondageSimple donnees=1 chercheurs=2 theories=1 methodes=1',
        expected: 'TRIANGULATION_SCORE: SondageSimple -> SCORE=55/100 | ROBUSTESSE=FRAGILE_MONO_PERSPECTIVE (BIAIS_ELEVÉ)'
      },
      {
        label: 'Étude mixte avec sources multiples',
        stdin: 'TRIANGULATION etude=RechercheUsabilite donnees=2 chercheurs=1 theories=2 methodes=2',
        expected: 'TRIANGULATION_SCORE: RechercheUsabilite -> SCORE=80/100 | ROBUSTESSE=SATISFAISANTE_TRIANGULATION_MOYENNE'
      },
      {
        label: 'Triangulation forte avec données massives',
        stdin: 'TRIANGULATION etude=ImpactIA donnees=4 chercheurs=3 theories=2 methodes=1',
        expected: 'TRIANGULATION_SCORE: ImpactIA -> SCORE=85/100 | ROBUSTESSE=EXCELLENTE_TRIANGULATION_FORTE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'etude=([^\\s]+)\\s+donnees=(\\d+)\\s+chercheurs=(\\d+)\\s+theories=(\\d+)\\s+methodes=(\\d+)', lig)
    if not m:
        continue
    etude = m.group(1)
    d, c, t, met = map(int, m.groups()[1:])
    
    # Données
    if d >= 3:
        sd = 25
    elif d == 2:
        sd = 20
    else:
        sd = 10
        
    # Chercheurs
    sc = 25 if c >= 2 else 10
    
    # Théories
    st = 25 if t >= 2 else 10
    
    # Méthodes
    sm = 25 if met >= 2 else 10
    
    score = sd + sc + st + sm
    
    if score >= 85:
        rob = 'ROBUSTESSE=EXCELLENTE_TRIANGULATION_FORTE'
    elif score >= 60:
        rob = 'ROBUSTESSE=SATISFAISANTE_TRIANGULATION_MOYENNE'
    else:
        rob = 'ROBUSTESSE=FRAGILE_MONO_PERSPECTIVE (BIAIS_ELEVÉ)'
        
    print(f"TRIANGULATION_SCORE: {etude} -> SCORE={score}/100 | {rob}")
`
  }
];
