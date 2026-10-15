/**
 * Exercices du Chapitre 6 : Qualité Documentaire, Tests Automatisés & Maintenance Continue.
 * Préfixe : dt3-c6-e
 */
'use strict';

module.exports = [
  {
    id: 'dt3-c6-e1',
    chapter: 6,
    title: 'Calculateur de longueur moyenne de phrase et de clarté documentaire',
    level: 'n1',
    language: 'python',
    goal: 'Mesurer la longueur moyenne des phrases d’un texte pour alerter sur la complexité cognitive excessive.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>READABILITY_INPUT texte=&lt;texte_sur_une_ligne&gt;</code>.<br><br>\nCalculs :<br>\n- Phrases : séparer le texte selon la ponctuation forte (<code>.</code>, <code>!</code>, <code>?</code>). Ne conserver que les phrases contenant au moins un mot.<br>\n- Nombre de phrases : $S$. Si $S = 0$, $S = 1$.<br>\n- Mots : découper l\'ensemble du texte nettoyé en mots alphanumériques. Nombre total de mots : $W$.<br>\n- Longueur moyenne de phrase (Average Sentence Length) :<br>\n  $ASL = W / S$ (arrondie à 1 décimale).<br><br>\nVerdict de clarté technique :<br>\n- Si $ASL \\le 15.0$ : <code>VERDICT=EXCELLENTE_CONCISE</code><br>\n- Sinon si $ASL \\le 25.0$ : <code>VERDICT=ACCEPTABLE_STANDARD</code><br>\n- Sinon : <code>VERDICT=TROP_COMPLEXE_PHRASES_TROP_LONGUES (SCINDER_REQUIS)</code><br><br>\nAfficher :<br>\n<code>READABILITY_METRIC: MOTS=&lt;W&gt; PHRASES=&lt;S&gt; -&gt; ASL=&lt;ASL:.1f&gt; mots/phrase | VERDICT=&lt;VERDICT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'ASL et classifier la lisibilité
`,
    hints: [
      'Utiliser re.split(r"[.!?]+", texte) pour découper les phrases.',
      'Ne compter que les segments de phrase contenant des mots.'
    ],
    examples: [
      {
        stdin: 'READABILITY_INPUT texte=Cliquez sur le bouton. Saisissez votre mot de passe. Validez.',
        expected: 'READABILITY_METRIC: MOTS=10 PHRASES=3 -> ASL=3.3 mots/phrase | VERDICT=EXCELLENTE_CONCISE',
        note: 'Phrases très courtes et directes : lisibilité excellente.'
      }
    ],
    tests: [
      {
        label: 'Phrases standards de documentation technique',
        stdin: 'READABILITY_INPUT texte=Ce guide presente les etapes de configuration du cluster Kubernetes pour la production. Veillez a verifier les certificats TLS avant tout deploiement.',
        expected: 'READABILITY_METRIC: MOTS=22 PHRASES=2 -> ASL=11.0 mots/phrase | VERDICT=EXCELLENTE_CONCISE'
      },
      {
        label: 'Texte acceptable légèrement verbeux',
        stdin: 'READABILITY_INPUT texte=Dans le cadre de l installation du serveur d application vous devez telecharger l archive puis decompresser le binaire dans le dossier cible. Ensuite executez le script de demarrage avec les droits administrateur requis.',
        expected: 'READABILITY_METRIC: MOTS=34 PHRASES=2 -> ASL=17.0 mots/phrase | VERDICT=ACCEPTABLE_STANDARD'
      },
      {
        label: 'Phrase pachydermique trop complexe nécessitant scission',
        stdin: 'READABILITY_INPUT texte=Afin de permettre une communication fluide et ininterrompue entre les modules il est imperatif que l administrateur configure les regles de routage tout en s assurant que les sondes de surveillance ne generent pas de saturation excessive sur la base de donnees transactionnelle.',
        expected: 'READABILITY_METRIC: MOTS=43 PHRASES=1 -> ASL=43.0 mots/phrase | VERDICT=TROP_COMPLEXE_PHRASES_TROP_LONGUES (SCINDER_REQUIS)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'texte=(.*)', lig)
    if not m:
        continue
    texte = m.group(1).strip()
    
    # Extraire les phrases terminées par . ! ?
    raw_sentences = re.split(r'[.!?]+', texte)
    sentences = [s.strip() for s in raw_sentences if re.search(r'[a-zA-Z0-9]', s)]
    s_cnt = len(sentences) if len(sentences) > 0 else 1
    
    words = re.findall(r'[a-zA-Z0-9_]+', texte)
    w_cnt = len(words)
    
    asl = (w_cnt / s_cnt) if s_cnt > 0 else 0.0
    
    if asl <= 15.0:
        verdict = 'EXCELLENTE_CONCISE'
    elif asl <= 25.0:
        verdict = 'ACCEPTABLE_STANDARD'
    else:
        verdict = 'TROP_COMPLEXE_PHRASES_TROP_LONGUES (SCINDER_REQUIS)'
        
    print(f"READABILITY_METRIC: MOTS={w_cnt} PHRASES={s_cnt} -> ASL={asl:.1f} mots/phrase | VERDICT={verdict}")
`
  },
  {
    id: 'dt3-c6-e2',
    chapter: 6,
    title: 'Vérificateur automatisé de liens et d’ancres Markdown (Link Checker)',
    level: 'n2',
    language: 'python',
    goal: 'Auditer les liens hypertextes d’un document Markdown et détecter les protocoles non sécurisés ou les ancres internes inexistantes.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>LINK_AUDIT ancres_dispos=&lt;a1,a2,...&gt; lien=[&lt;texte&gt;](&lt;cible&gt;)</code>.<br><br>\nRègles de validation selon <code>cible</code> :<br>\n- Si <code>cible</code> commence par <code>http://</code> :<br>\n  <code>VERDICT=ALERTE_INSECURISE_HTTP (MIGRER_VERS_HTTPS)</code><br>\n- Si <code>cible</code> commence par <code>https://</code> :<br>\n  <code>VERDICT=LIEN_EXTERNE_SECURISE</code><br>\n- Si <code>cible</code> commence par <code>#</code> (ancre interne, ex. <code>#section-1</code>) :<br>\n  Retirer le <code>#</code> initial. Vérifier si l\'ancre figure dans la liste <code>ancres_dispos</code> (insensible à la casse) :<br>\n  - Si présente : <code>VERDICT=ANCRE_INTERNE_VALIDE</code><br>\n  - Si absente : <code>VERDICT=ERREUR_ANCRE_CASSEE_INTROUVABLE</code><br>\n- Si <code>cible</code> se termine par <code>.md</code> ou commence par <code>/</code> :<br>\n  <code>VERDICT=LIEN_DOCUMENTAIRE_RELATIF</code><br>\n- Sinon : <code>VERDICT=CIBLE_NON_RECONNUE</code><br><br>\nAfficher :<br>\n<code>LINK_CHECK: [&lt;texte&gt;](&lt;cible&gt;) -&gt; VERDICT=&lt;VERDICT&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : auditer chaque lien face aux ancres disponibles
`,
    hints: [
      'Extraire le texte et la cible entre crochets et parenthèses.',
      'Comparer les ancres internes en minuscules.'
    ],
    examples: [
      {
        stdin: 'LINK_AUDIT ancres_dispos=intro,archi,install lien=[Installation](#install)',
        expected: 'LINK_CHECK: [Installation](#install) -> VERDICT=ANCRE_INTERNE_VALIDE',
        note: 'L’ancre #install existe dans ancres_dispos.'
      }
    ],
    tests: [
      {
        label: 'Lien externe non sécurisé en HTTP',
        stdin: 'LINK_AUDIT ancres_dispos=intro lien=[Site Officiel](http://example.com)',
        expected: 'LINK_CHECK: [Site Officiel](http://example.com) -> VERDICT=ALERTE_INSECURISE_HTTP (MIGRER_VERS_HTTPS)'
      },
      {
        label: 'Ancre interne inexistante cassée',
        stdin: 'LINK_AUDIT ancres_dispos=section1,section2 lien=[Voir FAQ](#section-faq)',
        expected: 'LINK_CHECK: [Voir FAQ](#section-faq) -> VERDICT=ERREUR_ANCRE_CASSEE_INTROUVABLE'
      },
      {
        label: 'Lien HTTPS externe sécurisé et lien relatif .md',
        stdin: 'LINK_AUDIT ancres_dispos=base lien=[Doc Securisee](https://docs.org)\nLINK_AUDIT ancres_dispos=base lien=[Runbook](guide/runbook.md)',
        expected: 'LINK_CHECK: [Doc Securisee](https://docs.org) -> VERDICT=LIEN_EXTERNE_SECURISE\nLINK_CHECK: [Runbook](guide/runbook.md) -> VERDICT=LIEN_DOCUMENTAIRE_RELATIF'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'ancres_dispos=([^\\s]+)\\s+lien=\\[(.*?)\\]\\((.*?)\\)', lig)
    if not m:
        continue
    ancres_str = m.group(1)
    texte = m.group(2)
    cible = m.group(3)
    
    ancres = {a.strip().lower() for a in ancres_str.split(',') if a.strip()}
    
    if cible.startswith('http://'):
        verdict = 'ALERTE_INSECURISE_HTTP (MIGRER_VERS_HTTPS)'
    elif cible.startswith('https://'):
        verdict = 'LIEN_EXTERNE_SECURISE'
    elif cible.startswith('#'):
        ancre_nom = cible[1:].strip().lower()
        if ancre_nom in ancres:
            verdict = 'ANCRE_INTERNE_VALIDE'
        else:
            verdict = 'ERREUR_ANCRE_CASSEE_INTROUVABLE'
    elif cible.endswith('.md') or cible.startswith('/'):
        verdict = 'LIEN_DOCUMENTAIRE_RELATIF'
    else:
        verdict = 'CIBLE_NON_RECONNUE'
        
    print(f"LINK_CHECK: [{texte}]({cible}) -> VERDICT={verdict}")
`
  },
  {
    id: 'dt3-c6-e3',
    chapter: 6,
    title: 'Détecteur de dette documentaire et de désynchronisation (Stale Docs)',
    level: 'n3',
    language: 'python',
    goal: 'Comparer l’horodatage de modification du code à celui de la documentation pour détecter l’obsolescence documentaire.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n<code>STALE_CHECK doc=&lt;nom&gt; code_jours=&lt;J_code&gt; doc_jours=&lt;J_doc&gt;</code>.<br>\nOù <code>code_jours</code> représente le nombre de jours écoulés depuis le dernier commit de code source, et <code>doc_jours</code> le nombre de jours écoulés depuis la dernière mise à jour de la documentation correspondante.<br><br>\nCalcul du retard documentaire :<br>\n$\\Delta = doc\\_jours - code\\_jours$ (en jours).<br>\n(Plus $\\Delta$ est grand, plus la documentation a accumulé de retard par rapport à l\'évolution du code).<br><br>\nQualification de la dette :<br>\n- Si $\\Delta \\le 7$ jours (ou $\\Delta \\le 0$) :<br>\n  <code>STATUT=A_JOUR (SYNCHRONISE)</code><br>\n- Sinon si $\\Delta \\le 30$ jours :<br>\n  <code>STATUT=ATTENTION_RETARD_MODERE (DELTA=+&lt;\\Delta&gt;j)</code><br>\n- Sinon :<br>\n  <code>STATUT=CRITIQUE_DOCUMENTATION_OBSOLETE (DELTA=+&lt;\\Delta&gt;j, REVISION_URGENTE)</code><br><br>\nAfficher :<br>\n<code>STALE_DOC_DIAGNOSTIC: &lt;doc&gt; -&gt; ECART=+&lt;\\Delta&gt;j | STATUT=&lt;STATUT&gt;</code><br>\n(Si $\\Delta &lt; 0$, afficher <code>ECART=&lt;\\Delta&gt;j</code>).</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer l'écart en jours et qualifier la dette
`,
    hints: [
      'Calculer delta = doc_jours - code_jours.',
      'Formater avec un + devant delta si >= 0.'
    ],
    examples: [
      {
        stdin: 'STALE_CHECK doc=api.md code_jours=2 doc_jours=5',
        expected: 'STALE_DOC_DIAGNOSTIC: api.md -> ECART=+3j | STATUT=A_JOUR (SYNCHRONISE)',
        note: 'Écart de 3 jours : documentation synchronisée.'
      }
    ],
    tests: [
      {
        label: 'Retard modéré nécessitant mise à jour prochaine',
        stdin: 'STALE_CHECK doc=runbook.md code_jours=5 doc_jours=25',
        expected: 'STALE_DOC_DIAGNOSTIC: runbook.md -> ECART=+20j | STATUT=ATTENTION_RETARD_MODERE (DELTA=+20j)'
      },
      {
        label: 'Documentation obsolète critique avec retard supérieur à 30 jours',
        stdin: 'STALE_CHECK doc=dat_architecture.md code_jours=10 doc_jours=80',
        expected: 'STALE_DOC_DIAGNOSTIC: dat_architecture.md -> ECART=+70j | STATUT=CRITIQUE_DOCUMENTATION_OBSOLETE (DELTA=+70j, REVISION_URGENTE)'
      },
      {
        label: 'Documentation mise à jour plus récemment que le code',
        stdin: 'STALE_CHECK doc=faq.md code_jours=15 doc_jours=10',
        expected: 'STALE_DOC_DIAGNOSTIC: faq.md -> ECART=-5j | STATUT=A_JOUR (SYNCHRONISE)'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for lig in lignes:
    m = re.search(r'doc=([^\\s]+)\\s+code_jours=(\\d+)\\s+doc_jours=(\\d+)', lig)
    if not m:
        continue
    doc = m.group(1)
    c_j = int(m.group(2))
    d_j = int(m.group(3))
    
    delta = d_j - c_j
    
    if delta <= 7:
        statut = 'A_JOUR (SYNCHRONISE)'
    elif delta <= 30:
        statut = f"ATTENTION_RETARD_MODERE (DELTA=+{delta}j)"
    else:
        statut = f"CRITIQUE_DOCUMENTATION_OBSOLETE (DELTA=+{delta}j, REVISION_URGENTE)"
        
    prefix = '+' if delta >= 0 else ''
    print(f"STALE_DOC_DIAGNOSTIC: {doc} -> ECART={prefix}{delta}j | STATUT={statut}")
`
  }
];
