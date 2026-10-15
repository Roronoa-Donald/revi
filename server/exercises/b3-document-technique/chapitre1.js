/**
 * Exercices du Chapitre 1 : Typologies, Cibles & Enjeux Stratégiques de la Documentation IT.
 * Préfixe : dt3-c1-e
 */
'use strict';

module.exports = [
  {
    id: 'dt3-c1-e1',
    chapter: 1,
    title: 'Classificateur de typologie documentaire et d’audience cible',
    level: 'n1',
    language: 'python',
    goal: 'Analyser les métadonnées et mots-clés d’un document IT pour déduire son type normalisé et son audience principale.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>DOC_TYPE nom=&lt;nom&gt; cible=&lt;cible&gt; mots=&lt;m1,m2,...&gt;</code>.<br><br>\nTypologies normalisées :<br>\n- Si <code>cible=UTILISATEUR_FINAL</code> et les mots contiennent au moins un terme parmi <code>guide</code>, <code>prise_en_main</code>, <code>faq</code>, <code>tutoriel</code> :<br>\n  <code>TYPE=USER_GUIDE | AUDIENCE=UTILISATEURS_METIER</code><br>\n- Si <code>cible=DEVELOPPEUR</code> et les mots contiennent au moins un terme parmi <code>endpoint</code>, <code>swagger</code>, <code>openapi</code>, <code>json</code>, <code>http</code> :<br>\n  <code>TYPE=API_DOC | AUDIENCE=DEVELOPPEURS_INTEGRATEURS</code><br>\n- Si <code>cible=ARCHITECTE</code> et les mots contiennent au moins un terme parmi <code>composants</code>, <code>reseau</code>, <code>haute_dispo</code>, <code>infrastructure</code>, <code>pra</code> :<br>\n  <code>TYPE=DAT | AUDIENCE=EQUIPES_INFRA_ET_SECURITE</code><br>\n- Si <code>cible=EXPLOITANT</code> et les mots contiennent au moins un terme parmi <code>sauvegarde</code>, <code>ordonnancement</code>, <code>runbook</code>, <code>astreinte</code>, <code>rto_rpo</code> :<br>\n  <code>TYPE=DEX | AUDIENCE=OPERATIONS_ET_SRE</code><br>\n- Si <code>cible=EQUIPE_METIER</code> et les mots contiennent au moins un terme parmi <code>regles_metier</code>, <code>use_case</code>, <code>parcours_client</code>, <code>ihm</code> :<br>\n  <code>TYPE=SFD | AUDIENCE=PRODUCT_OWNERS_ET_DEV</code><br>\n- Dans tous les autres cas :<br>\n  <code>TYPE=INDETERMINE | AUDIENCE=INCONNUE</code><br><br>\nAfficher :<br>\n<code>DOC_CLASSIFICATION: &lt;nom&gt; -&gt; TYPE=&lt;TYPE&gt; | AUDIENCE=&lt;AUDIENCE&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier chaque document selon sa cible et ses mots-clés
`,
    hints: [
      'Découper les mots-clés sur la virgule et convertir en minuscules.',
      'Tester les règles de correspondance dans l’ordre spécifié.'
    ],
    examples: [
      {
        stdin: 'DOC_TYPE nom=ManuelPortail cible=UTILISATEUR_FINAL mots=guide,faq,connexion',
        expected: 'DOC_CLASSIFICATION: ManuelPortail -> TYPE=USER_GUIDE | AUDIENCE=UTILISATEURS_METIER',
        note: 'Cible utilisateur final avec guide et faq : USER_GUIDE.'
      }
    ],
    tests: [
      {
        label: 'Documentation d’API REST OpenAPI pour développeurs',
        stdin: 'DOC_TYPE nom=ApiPaiement cible=DEVELOPPEUR mots=endpoint,json,http,swagger',
        expected: 'DOC_CLASSIFICATION: ApiPaiement -> TYPE=API_DOC | AUDIENCE=DEVELOPPEURS_INTEGRATEURS'
      },
      {
        label: 'Dossier d’Architecture Technique (DAT)',
        stdin: 'DOC_TYPE nom=ArchiCore cible=ARCHITECTE mots=infrastructure,reseau,composants',
        expected: 'DOC_CLASSIFICATION: ArchiCore -> TYPE=DAT | AUDIENCE=EQUIPES_INFRA_ET_SECURITE'
      },
      {
        label: 'Dossier d’Exploitation (DEX) et document indéterminé',
        stdin: 'DOC_TYPE nom=DEX_Batch cible=EXPLOITANT mots=sauvegarde,runbook,astreinte\nDOC_TYPE nom=NotesVrac cible=STAGIAIRE mots=pense_bete,divers',
        expected: 'DOC_CLASSIFICATION: DEX_Batch -> TYPE=DEX | AUDIENCE=OPERATIONS_ET_SRE\nDOC_CLASSIFICATION: NotesVrac -> TYPE=INDETERMINE | AUDIENCE=INCONNUE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m_nom = re.search(r'nom=([^\\s]+)', lig)
    m_cible = re.search(r'cible=([^\\s]+)', lig)
    m_mots = re.search(r'mots=([^\\s]+)', lig)
    if not (m_nom and m_cible and m_mots):
        continue
    nom = m_nom.group(1)
    cible = m_cible.group(1)
    mots = [x.strip().lower() for x in m_mots.group(1).split(',')]
    mots_set = set(mots)
    
    doc_type = 'INDETERMINE'
    audience = 'INCONNUE'
    
    if cible == 'UTILISATEUR_FINAL' and any(k in mots_set for k in ['guide', 'prise_en_main', 'faq', 'tutoriel']):
        doc_type = 'USER_GUIDE'
        audience = 'UTILISATEURS_METIER'
    elif cible == 'DEVELOPPEUR' and any(k in mots_set for k in ['endpoint', 'swagger', 'openapi', 'json', 'http']):
        doc_type = 'API_DOC'
        audience = 'DEVELOPPEURS_INTEGRATEURS'
    elif cible == 'ARCHITECTE' and any(k in mots_set for k in ['composants', 'reseau', 'haute_dispo', 'infrastructure', 'pra']):
        doc_type = 'DAT'
        audience = 'EQUIPES_INFRA_ET_SECURITE'
    elif cible == 'EXPLOITANT' and any(k in mots_set for k in ['sauvegarde', 'ordonnancement', 'runbook', 'astreinte', 'rto_rpo']):
        doc_type = 'DEX'
        audience = 'OPERATIONS_ET_SRE'
    elif cible == 'EQUIPE_METIER' and any(k in mots_set for k in ['regles_metier', 'use_case', 'parcours_client', 'ihm']):
        doc_type = 'SFD'
        audience = 'PRODUCT_OWNERS_ET_DEV'
        
    print(f"DOC_CLASSIFICATION: {nom} -> TYPE={doc_type} | AUDIENCE={audience}")
`
  },
  {
    id: 'dt3-c1-e2',
    chapter: 1,
    title: 'Auditeur de complétude du cadre 5W1H (QQOQCP)',
    level: 'n2',
    language: 'python',
    goal: 'Vérifier la présence et la qualité des 6 dimensions obligatoires dans l’en-tête d’un document technique.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>5W1H_AUDIT doc=&lt;nom&gt; QUI=&lt;v&gt; QUOI=&lt;v&gt; QUAND=&lt;v&gt; OU=&lt;v&gt; POURQUOI=&lt;v&gt; COMMENT=&lt;v&gt;</code>.<br><br>\nRègles de validation d\'une dimension :<br>\n- Une dimension est <strong>conforme</strong> si sa valeur n\'est ni vide, ni <code>NON_DEFINI</code>, ni <code>INCONNU</code> (insensible à la casse).<br>\n- Ordre d\'évaluation officiel : <code>QUI</code>, <code>QUOI</code>, <code>QUAND</code>, <code>OU</code>, <code>POURQUOI</code>, <code>COMMENT</code>.<br><br>\nCalculs :<br>\n- Nombre de dimensions conformes $N \\in [0..6]$.<br>\n- Pourcentage $= (N / 6.0) \\times 100$ (arrondi à 1 décimale).<br>\n- Manques : liste des dimensions non conformes (ou <code>AUCUN</code> si $N=6$).<br>\n- Statut d\'audit :<br>\n  - Si $N == 6$ : <code>STATUT=CONFORME_EXCELLENT</code><br>\n  - Sinon si $N \\ge 4$ : <code>STATUT=PARTIEL_A_COMPLETER (MANQUES=[&lt;manques&gt;])</code><br>\n  - Sinon : <code>STATUT=NON_CONFORME_REJETE (MANQUES=[&lt;manques&gt;])</code><br><br>\nAfficher :<br>\n<code>AUDIT_5W1H: &lt;doc&gt; -&gt; SCORE=&lt;N&gt;/6 (&lt;pct:.1f&gt;%) | STATUT=&lt;STATUT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer les 6 dimensions 5W1H
`,
    hints: [
      'Garder l’ordre exact QUI, QUOI, QUAND, OU, POURQUOI, COMMENT pour la liste des manques.',
      'Traiter NON_DEFINI et INCONNU comme invalides.'
    ],
    examples: [
      {
        stdin: '5W1H_AUDIT doc=DAT_V1 QUI=EquipeCloud QUOI=InfraAWS QUAND=2025-11-01 OU=VPC_Prod POURQUOI=Migration COMMENT=Terraform',
        expected: 'AUDIT_5W1H: DAT_V1 -> SCORE=6/6 (100.0%) | STATUT=CONFORME_EXCELLENT',
        note: 'Toutes les 6 dimensions sont renseignées : audit validé avec excellence.'
      }
    ],
    tests: [
      {
        label: 'En-tête incomplet nécessitant complétion',
        stdin: '5W1H_AUDIT doc=DEX_Backup QUI=OpsTeam QUOI=Sauvegarde QUAND=NON_DEFINI OU=Cluster_1 POURQUOI=PCA COMMENT=INCONNU',
        expected: 'AUDIT_5W1H: DEX_Backup -> SCORE=4/6 (66.7%) | STATUT=PARTIEL_A_COMPLETER (MANQUES=[QUAND, COMMENT])'
      },
      {
        label: 'En-tête largement déficient rejeté',
        stdin: '5W1H_AUDIT doc=Brouillon QUI=NON_DEFINI QUOI=INCONNU QUAND=NON_DEFINI OU=Local POURQUOI=Test COMMENT=INCONNU',
        expected: 'AUDIT_5W1H: Brouillon -> SCORE=2/6 (33.3%) | STATUT=NON_CONFORME_REJETE (MANQUES=[QUI, QUOI, QUAND, COMMENT])'
      },
      {
        label: 'En-tête parfait avec différentes valeurs',
        stdin: '5W1H_AUDIT doc=SFD_Auth QUI=PO_Jean QUOI=LoginOIDC QUAND=2025-Q4 OU=Portail POURQUOI=Securite COMMENT=Auth0',
        expected: 'AUDIT_5W1H: SFD_Auth -> SCORE=6/6 (100.0%) | STATUT=CONFORME_EXCELLENT'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

dim_keys = ['QUI', 'QUOI', 'QUAND', 'OU', 'POURQUOI', 'COMMENT']

for lig in lignes:
    m_doc = re.search(r'doc=([^\\s]+)', lig)
    if not m_doc:
        continue
    doc = m_doc.group(1)
    
    valides = 0
    manques = []
    
    for k in dim_keys:
        m_val = re.search(rf'\\b{k}=([^\\s]+)', lig)
        val = m_val.group(1) if m_val else ''
        val_upper = val.strip().upper()
        if val and val_upper not in ['NON_DEFINI', 'INCONNU', 'NONE', '']:
            valides += 1
        else:
            manques.append(k)
            
    pct = (valides / 6.0) * 100.0
    
    if valides == 6:
        statut = 'CONFORME_EXCELLENT'
    elif valides >= 4:
        statut = f"PARTIEL_A_COMPLETER (MANQUES=[{', '.join(manques)}])"
    else:
        statut = f"NON_CONFORME_REJETE (MANQUES=[{', '.join(manques)}])"
        
    print(f"AUDIT_5W1H: {doc} -> SCORE={valides}/6 ({pct:.1f}%) | STATUT={statut}")
`
  },
  {
    id: 'dt3-c1-e3',
    chapter: 1,
    title: 'Évaluateur d’adéquation du registre lexical selon l’audience cible',
    level: 'n3',
    language: 'python',
    goal: 'Mesurer la densité de jargon technique dans un extrait textuel pour valider son adéquation au public visé.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>LEXICAL_AUDIT cible=&lt;GRAND_PUBLIC|DEVELOPPEUR_EXPERT&gt; texte=&lt;phrase&gt;</code>.<br><br>\nTermes de jargon technique surveillés (insensible à la casse) :<br>\n<code>api</code>, <code>endpoint</code>, <code>json</code>, <code>thread</code>, <code>mutex</code>, <code>kernel</code>, <code>kubernetes</code>, <code>docker</code>, <code>sql</code>, <code>hash</code>, <code>ram</code>, <code>cpu</code>, <code>tcp</code>, <code>tls</code>, <code>token</code>, <code>binaire</code>, <code>cache</code>.<br><br>\nCalculs :<br>\n- Nettoyer le texte : ne garder que les lettres et chiffres (remplacer la ponctuation par des espaces), découper en mots.<br>\n- Compter le nombre total de mots $T$ (si $T=0$, densité = 0.0%).<br>\n- Compter les occurrences de mots correspondant au jargon technique ($J$).<br>\n- Taux de jargon : $TJ = (J / T) \\times 100$ (arrondi à 1 décimale).<br><br>\nVerdict selon la cible :<br>\n- Si <code>cible=GRAND_PUBLIC</code> :<br>\n  - Si $TJ &gt; 5.0\\%$ : <code>VERDICT=INADAPTE_TROP_TECHNIQUE (VULGARISATION_REQUISE)</code><br>\n  - Sinon : <code>VERDICT=VALIDE_ACCESSIBLE</code><br>\n- Si <code>cible=DEVELOPPEUR_EXPERT</code> :<br>\n  - Si $TJ &lt; 5.0\\%$ : <code>VERDICT=INADAPTE_TROP_VULGARISE (PRECISION_REQUISE)</code><br>\n  - Sinon : <code>VERDICT=VALIDE_EXPERT</code><br><br>\nAfficher :<br>\n<code>LEXICAL_DIAGNOSTIC: CIBLE=&lt;cible&gt; -&gt; JARGON=&lt;J&gt;/&lt;T&gt; (&lt;TJ:.1f&gt;%) | VERDICT=&lt;VERDICT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer la densité de jargon et émettre le verdict
`,
    hints: [
      'Remplacer les virgules, points et tirets par des espaces avant de faire split.',
      'Comparer en minuscules avec la liste de référence.'
    ],
    examples: [
      {
        stdin: 'LEXICAL_AUDIT cible=GRAND_PUBLIC texte=Pour vous connecter au portail web veuillez cliquer sur le lien bleu envoye par courrier electronique',
        expected: 'LEXICAL_DIAGNOSTIC: CIBLE=GRAND_PUBLIC -> JARGON=0/16 (0.0%) | VERDICT=VALIDE_ACCESSIBLE',
        note: 'Aucun terme de jargon : parfait pour le grand public.'
      }
    ],
    tests: [
      {
        label: 'Texte grand public trop technique rejeté',
        stdin: 'LEXICAL_AUDIT cible=GRAND_PUBLIC texte=Le client envoie un token json vers un endpoint api securise par tls',
        expected: 'LEXICAL_DIAGNOSTIC: CIBLE=GRAND_PUBLIC -> JARGON=5/13 (38.5%) | VERDICT=INADAPTE_TROP_TECHNIQUE (VULGARISATION_REQUISE)'
      },
      {
        label: 'Texte développeur expert avec vocabulaire précis validé',
        stdin: 'LEXICAL_AUDIT cible=DEVELOPPEUR_EXPERT texte=Le conteneur docker expose un endpoint tcp avec mise en cache redis',
        expected: 'LEXICAL_DIAGNOSTIC: CIBLE=DEVELOPPEUR_EXPERT -> JARGON=4/12 (33.3%) | VERDICT=VALIDE_EXPERT'
      },
      {
        label: 'Texte développeur trop vague nécessitant précision',
        stdin: 'LEXICAL_AUDIT cible=DEVELOPPEUR_EXPERT texte=Le programme fait des choses et enregistre les informations importantes sur le disque de la machine',
        expected: 'LEXICAL_DIAGNOSTIC: CIBLE=DEVELOPPEUR_EXPERT -> JARGON=0/16 (0.0%) | VERDICT=INADAPTE_TROP_VULGARISE (PRECISION_REQUISE)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

JARGON_REF = {
    'api', 'endpoint', 'json', 'thread', 'mutex', 'kernel',
    'kubernetes', 'docker', 'sql', 'hash', 'ram', 'cpu',
    'tcp', 'tls', 'token', 'binaire', 'cache'
}

for lig in lignes:
    m = re.search(r'cible=([^\\s]+)\\s+texte=(.*)', lig)
    if not m:
        continue
    cible = m.group(1)
    texte_brut = m.group(2)
    
    # Extraire les mots alphanumériques
    mots = [w.lower() for w in re.findall(r'[a-zA-Z0-9_]+', texte_brut)]
    total = len(mots)
    
    jargon_cnt = sum(1 for w in mots if w in JARGON_REF)
    pct = (jargon_cnt / total * 100.0) if total > 0 else 0.0
    
    if cible == 'GRAND_PUBLIC':
        if pct > 5.0:
            verdict = 'INADAPTE_TROP_TECHNIQUE (VULGARISATION_REQUISE)'
        else:
            verdict = 'VALIDE_ACCESSIBLE'
    else:  # DEVELOPPEUR_EXPERT
        if pct < 5.0:
            verdict = 'INADAPTE_TROP_VULGARISE (PRECISION_REQUISE)'
        else:
            verdict = 'VALIDE_EXPERT'
            
    print(f"LEXICAL_DIAGNOSTIC: CIBLE={cible} -> JARGON={jargon_cnt}/{total} ({pct:.1f}%) | VERDICT={verdict}")
`
  }
];
