/**
 * Exercices du Chapitre 2 : Spécifications Fonctionnelles (SFD) & Techniques (STD).
 * Préfixe : dt3-c2-e
 */
'use strict';

module.exports = [
  {
    id: 'dt3-c2-e1',
    chapter: 2,
    title: 'Validateur formel de cas d’utilisation (Use Case) en SFD',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la complétude et la rigueur structurelle d’une fiche de cas d’utilisation dans une spécification fonctionnelle détaillée.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>USE_CASE_AUDIT id=&lt;id&gt; acteur=&lt;v&gt; declencheur=&lt;v&gt; pre=&lt;v&gt; nominal=&lt;etapes&gt; post=&lt;v&gt;</code>.<br><br>\nCritères de conformité (5 critères évalués) :<br>\n1. <code>ACTEUR</code> : la valeur n\'est ni vide ni <code>AUCUN</code> ni <code>NON_DEFINI</code>.<br>\n2. <code>DECLENCHEUR</code> : la valeur n\'est ni vide ni <code>AUCUN</code>.<br>\n3. <code>PRECONDITIONS</code> : la valeur n\'est ni vide ni <code>AUCUN</code>.<br>\n4. <code>SCENARIO_NOMINAL</code> : contient au moins 2 étapes séparées par <code>-&gt;</code>.<br>\n5. <code>POSTCONDITIONS</code> : la valeur n\'est ni vide ni <code>AUCUN</code>.<br><br>\nStatut :<br>\n- Si 5/5 : <code>STATUT=CONFORME_SFD_VALIDEE</code><br>\n- Sinon : <code>STATUT=NON_CONFORME (ANOMALIES=[&lt;champs_en_erreur&gt;])</code><br>\n(L\'ordre des anomalies : <code>ACTEUR</code>, <code>DECLENCHEUR</code>, <code>PRECONDITIONS</code>, <code>SCENARIO_NOMINAL</code>, <code>POSTCONDITIONS</code>).<br><br>\nAfficher :<br>\n<code>USE_CASE: &lt;id&gt; -&gt; SCORE=&lt;N&gt;/5 | STATUT=&lt;STATUT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer chaque cas d'utilisation SFD
`,
    hints: [
      'Pour le scénario nominal, compter le nombre d’étapes via split("->").',
      'Identifier les champs vides ou valant AUCUN / NON_DEFINI.'
    ],
    examples: [
      {
        stdin: 'USE_CASE_AUDIT id=UC-01 acteur=Client declencheur=ClicConnexion pre=CompteActif nominal=SaisieIdentifiants->ValidationToken post=SessionOuverte',
        expected: 'USE_CASE: UC-01 -> SCORE=5/5 | STATUT=CONFORME_SFD_VALIDEE',
        note: 'Les 5 critères sont parfaitement remplis.'
      }
    ],
    tests: [
      {
        label: 'Cas d’utilisation avec scénario trop court et acteur manquant',
        stdin: 'USE_CASE_AUDIT id=UC-02 acteur=AUCUN declencheur=ClicPaiement pre=PanierValide nominal=PaiementDirect post=FactureGeneree',
        expected: 'USE_CASE: UC-02 -> SCORE=3/5 | STATUT=NON_CONFORME (ANOMALIES=[ACTEUR, SCENARIO_NOMINAL])'
      },
      {
        label: 'Préconditions et postconditions absentes',
        stdin: 'USE_CASE_AUDIT id=UC-03 acteur=Admin declencheur=RequeteReset pre=AUCUN nominal=SelectionUtilisateur->ClicReset->EmailEnvoye post=AUCUN',
        expected: 'USE_CASE: UC-03 -> SCORE=3/5 | STATUT=NON_CONFORME (ANOMALIES=[PRECONDITIONS, POSTCONDITIONS])'
      },
      {
        label: 'Tous critères validés avec étapes complexes',
        stdin: 'USE_CASE_AUDIT id=UC-04 acteur=Gestionnaire declencheur=UploadFichier pre=DroitEcriture nominal=ScanAntivirus->ExtractionDonnees->EnregistrementBDD post=FichierArchive',
        expected: 'USE_CASE: UC-04 -> SCORE=5/5 | STATUT=CONFORME_SFD_VALIDEE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m_id = re.search(r'id=([^\\s]+)', lig)
    m_act = re.search(r'acteur=([^\\s]+)', lig)
    m_dec = re.search(r'declencheur=([^\\s]+)', lig)
    m_pre = re.search(r'pre=([^\\s]+)', lig)
    m_nom = re.search(r'nominal=([^\\s]+)', lig)
    m_post = re.search(r'post=([^\\s]+)', lig)
    if not m_id:
        continue
    uid = m_id.group(1)
    
    score = 0
    anomalies = []
    
    # 1. Acteur
    act = m_act.group(1).strip() if m_act else ''
    if act and act.upper() not in ['AUCUN', 'NON_DEFINI', '']:
        score += 1
    else:
        anomalies.append('ACTEUR')
        
    # 2. Declencheur
    dec = m_dec.group(1).strip() if m_dec else ''
    if dec and dec.upper() not in ['AUCUN', '']:
        score += 1
    else:
        anomalies.append('DECLENCHEUR')
        
    # 3. Preconditions
    pre = m_pre.group(1).strip() if m_pre else ''
    if pre and pre.upper() not in ['AUCUN', '']:
        score += 1
    else:
        anomalies.append('PRECONDITIONS')
        
    # 4. Scenario nominal
    nom = m_nom.group(1).strip() if m_nom else ''
    etapes = [e for e in nom.split('->') if e.strip()]
    if len(etapes) >= 2:
        score += 1
    else:
        anomalies.append('SCENARIO_NOMINAL')
        
    # 5. Postconditions
    post = m_post.group(1).strip() if m_post else ''
    if post and post.upper() not in ['AUCUN', '']:
        score += 1
    else:
        anomalies.append('POSTCONDITIONS')
        
    if score == 5:
        statut = 'CONFORME_SFD_VALIDEE'
    else:
        statut = f"NON_CONFORME (ANOMALIES=[{', '.join(anomalies)}])"
        
    print(f"USE_CASE: {uid} -> SCORE={score}/5 | STATUT={statut}")
`
  },
  {
    id: 'dt3-c2-e2',
    chapter: 2,
    title: 'Matrice de traçabilité des exigences (Requirements Traceability Matrix - RTM)',
    level: 'n2',
    language: 'python',
    goal: 'Auditer la couverture bidirectionnelle entre une exigence métier, sa spécification détaillée et son cas de test de recette.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>RTM_ENTRY req=&lt;REQ_ID&gt; sfd=&lt;SFD_ID&gt; test=&lt;TEST_ID&gt;</code>.<br><br>\nRègles d\'évaluation de couverture :<br>\n- <code>sfd</code> est valide si différente de <code>AUCUN</code> et <code>NON_COUVERT</code>.<br>\n- <code>test</code> est valide si différent de <code>AUCUN</code> et <code>NON_COUVERT</code>.<br><br>\nStatut de couverture :<br>\n- Si les deux sont valides :<br>\n  <code>COUVERTURE=COMPLETE (SPEC_ET_TEST)</code><br>\n- Si <code>sfd</code> valide mais <code>test</code> invalide :<br>\n  <code>COUVERTURE=PARTIELLE (TEST_MANQUANT)</code><br>\n- Si <code>sfd</code> invalide mais <code>test</code> valide :<br>\n  <code>COUVERTURE=PARTIELLE (SFD_MANQUANTE)</code><br>\n- Si les deux sont invalides :<br>\n  <code>COUVERTURE=ORPHELINE_NON_COUVERTE (CRITIQUE)</code><br><br>\nAfficher :<br>\n<code>RTM_AUDIT: &lt;req&gt; -&gt; COUVERTURE=&lt;COUVERTURE&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer la couverture RTM de chaque exigence
`,
    hints: [
      'Tester la présence de valeurs invalides AUCUN ou NON_COUVERT.',
      'Distinguer les couvertures partielles selon la composante absente.'
    ],
    examples: [
      {
        stdin: 'RTM_ENTRY req=REQ-101 sfd=SFD-AUTH-01 test=TEST-AUTH-E2E',
        expected: 'RTM_AUDIT: REQ-101 -> COUVERTURE=COMPLETE (SPEC_ET_TEST)',
        note: 'Exigence spécifiée et testée : couverture complète.'
      }
    ],
    tests: [
      {
        label: 'Exigence spécifiée mais sans cas de test associé',
        stdin: 'RTM_ENTRY req=REQ-102 sfd=SFD-PAY-02 test=AUCUN',
        expected: 'RTM_AUDIT: REQ-102 -> COUVERTURE=PARTIELLE (TEST_MANQUANT)'
      },
      {
        label: 'Exigence testée sans spécification formelle',
        stdin: 'RTM_ENTRY req=REQ-103 sfd=NON_COUVERT test=TEST-EXPORT-01',
        expected: 'RTM_AUDIT: REQ-103 -> COUVERTURE=PARTIELLE (SFD_MANQUANTE)'
      },
      {
        label: 'Exigence totalement orpheline critique',
        stdin: 'RTM_ENTRY req=REQ-104 sfd=AUCUN test=NON_COUVERT',
        expected: 'RTM_AUDIT: REQ-104 -> COUVERTURE=ORPHELINE_NON_COUVERTE (CRITIQUE)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

INVALIDES = {'AUCUN', 'NON_COUVERT', ''}

for lig in lignes:
    m_req = re.search(r'req=([^\\s]+)', lig)
    m_sfd = re.search(r'sfd=([^\\s]+)', lig)
    m_test = re.search(r'test=([^\\s]+)', lig)
    if not m_req:
        continue
    req = m_req.group(1)
    sfd = m_sfd.group(1).strip() if m_sfd else ''
    test = m_test.group(1).strip() if m_test else ''
    
    sfd_ok = (sfd.upper() not in INVALIDES)
    test_ok = (test.upper() not in INVALIDES)
    
    if sfd_ok and test_ok:
        couv = 'COMPLETE (SPEC_ET_TEST)'
    elif sfd_ok and not test_ok:
        couv = 'PARTIELLE (TEST_MANQUANT)'
    elif not sfd_ok and test_ok:
        couv = 'PARTIELLE (SFD_MANQUANTE)'
    else:
        couv = 'ORPHELINE_NON_COUVERTE (CRITIQUE)'
        
    print(f"RTM_AUDIT: {req} -> COUVERTURE={couv}")
`
  },
  {
    id: 'dt3-c2-e3',
    chapter: 2,
    title: 'Validateur de matrice de flux réseau pour Spécification Technique Détaillée (STD)',
    level: 'n3',
    language: 'python',
    goal: 'Analyser une matrice de flux d’ouverture de pare-feu et alerter sur les règles permissives dangereuses.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>FLUX_ENTRY src=&lt;src&gt; dst=&lt;dst&gt; proto=&lt;proto&gt; port=&lt;port&gt;</code>.<br><br>\nRègles de validation et de sécurité :<br>\n- Protocole : doit valoir soit <code>TCP</code> soit <code>UDP</code> (insensible à la casse). Si différent :<br>\n  <code>VERDICT=PROTOCOLE_INVALIDE</code><br>\n- Port tout ouvert : si <code>port == ALL</code> ou <code>port == *</code> ou <code>port == 0</code> :<br>\n  <code>VERDICT=ALERTE_SECURITE_PORT_TOUT_OUVERT (PORT_RESTREINT_REQUIS)</code><br>\n- Source ou destination universelle : si <code>src == ANY</code> ou <code>dst == ANY</code> ou <code>0.0.0.0/0</code> :<br>\n  <code>VERDICT=ALERTE_SECURITE_REGLE_TROP_PERMISSIVE (IP_EXPLICITE_REQUISE)</code><br>\n- Port standard valide : le port doit être un entier numérique valide compris entre 1 et 65535.<br>\n- Si tous les contrôles sont sains :<br>\n  <code>VERDICT=REGLE_STD_VALIDE</code><br><br>\nAfficher :<br>\n<code>FLUX_AUDIT: &lt;src&gt; -&gt; &lt;dst&gt; (&lt;PROTO&gt;/&lt;port&gt;) | VERDICT=&lt;VERDICT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer chaque règle de matrice de flux STD
`,
    hints: [
      'Tester les alertes de sécurité dans l’ordre de priorité.',
      'Valider que le port est un entier compris entre 1 et 65535.'
    ],
    examples: [
      {
        stdin: 'FLUX_ENTRY src=10.0.1.10 dst=10.0.2.20 proto=TCP port=443',
        expected: 'FLUX_AUDIT: 10.0.1.10 -> 10.0.2.20 (TCP/443) | VERDICT=REGLE_STD_VALIDE',
        note: 'Flux HTTPS restreint entre deux adresses internes : règle valide.'
      }
    ],
    tests: [
      {
        label: 'Ouverture de port universelle interdite',
        stdin: 'FLUX_ENTRY src=10.0.1.10 dst=10.0.2.20 proto=TCP port=ALL',
        expected: 'FLUX_AUDIT: 10.0.1.10 -> 10.0.2.20 (TCP/ALL) | VERDICT=ALERTE_SECURITE_PORT_TOUT_OUVERT (PORT_RESTREINT_REQUIS)'
      },
      {
        label: 'Source ou destination ANY interdite',
        stdin: 'FLUX_ENTRY src=ANY dst=10.0.2.20 proto=TCP port=22',
        expected: 'FLUX_AUDIT: ANY -> 10.0.2.20 (TCP/22) | VERDICT=ALERTE_SECURITE_REGLE_TROP_PERMISSIVE (IP_EXPLICITE_REQUISE)'
      },
      {
        label: 'Protocole inconnu ou invalide',
        stdin: 'FLUX_ENTRY src=10.0.1.5 dst=10.0.2.5 proto=ICMP port=80',
        expected: 'FLUX_AUDIT: 10.0.1.5 -> 10.0.2.5 (ICMP/80) | VERDICT=PROTOCOLE_INVALIDE'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m_src = re.search(r'src=([^\\s]+)', lig)
    m_dst = re.search(r'dst=([^\\s]+)', lig)
    m_proto = re.search(r'proto=([^\\s]+)', lig)
    m_port = re.search(r'port=([^\\s]+)', lig)
    if not (m_src and m_dst and m_proto and m_port):
        continue
    src = m_src.group(1)
    dst = m_dst.group(1)
    proto_raw = m_proto.group(1).upper()
    port_raw = m_port.group(1)
    
    if proto_raw not in ['TCP', 'UDP']:
        verdict = 'PROTOCOLE_INVALIDE'
    elif port_raw.upper() in ['ALL', '*', '0']:
        verdict = 'ALERTE_SECURITE_PORT_TOUT_OUVERT (PORT_RESTREINT_REQUIS)'
    elif src.upper() in ['ANY', '0.0.0.0/0'] or dst.upper() in ['ANY', '0.0.0.0/0']:
        verdict = 'ALERTE_SECURITE_REGLE_TROP_PERMISSIVE (IP_EXPLICITE_REQUISE)'
    else:
        try:
            p_val = int(port_raw)
            if 1 <= p_val <= 65535:
                verdict = 'REGLE_STD_VALIDE'
            else:
                verdict = 'PORT_HORS_LIMITES'
        except ValueError:
            verdict = 'PORT_INVALIDE'
            
    print(f"FLUX_AUDIT: {src} -> {dst} ({proto_raw}/{port_raw}) | VERDICT={verdict}")
`
  }
];
