/**
 * Exercices du Chapitre 6 : Technical Presentations, Pitching & International Career.
 * Préfixe : an3-c6-e
 */
'use strict';

module.exports = [
  {
    id: 'an3-c6-e1',
    chapter: 6,
    title: 'Validateur de structure de réponse d’entretien STAR',
    level: 'n1',
    language: 'python',
    goal: 'Vérifier la complétude et l’impact d’une réponse d’entretien technique en anglais selon la méthode STAR (Situation, Task, Action, Result).',
    brief: `<p>Dans les entretiens d'embauche internationaux (FAANG, scale-ups tech), les recruteurs évaluent les compétences comportementales via la méthode <b>STAR</b>.<br>
Le script lit sur l'entrée standard les composantes d'une réponse :<br>
<code>CANDIDATE name=&lt;nom&gt;</code><br>
<code>SITUATION: &lt;texte&gt;</code><br>
<code>TASK: &lt;texte&gt;</code><br>
<code>ACTION: &lt;texte&gt;</code><br>
<code>RESULT: &lt;texte&gt;</code><br><br>
Règles d'évaluation :<br>
1. <b>Complétude</b> : Les 4 rubriques doivent comporter chacune au moins 5 mots. Si une rubrique a moins de 5 mots, ajouter <code>INCOMPLETE_SECTION</code>.<br>
2. <b>Prise de responsabilité (Action)</b> : La section <code>ACTION</code> doit employer des verbes d'action à la première personne (<i>"I designed"</i>, <i>"I implemented"</i>, <i>"I optimized"</i>, <i>"I led"</i>, <i>"I configured"</i>, <i>"I resolved"</i>). La détection recherche la présence de <code>I </code> suivi d'un verbe d'action au passé (insensible à la casse). Si absent : ajouter <code>ACTION_LACKS_FIRST_PERSON_OWNERSHIP</code>.<br>
3. <b>Impact mesurable (Result)</b> : La section <code>RESULT</code> doit contenir au moins une métrique chiffrée ou mot-clé d'impact quantifié (ex: signe <code>%</code>, chiffre avec unité, mots <code>reduced</code>, <code>increased</code>, <code>improved</code>, <code>saved</code>, <code>latency</code>, <code>uptime</code>). Si absent : ajouter <code>RESULT_LACKS_QUANTIFIABLE_METRIC</code>.<br><br>
Afficher :<br>
- Si conforme (0 anomalie) :<br>
  <code>STAR_EVAL: &lt;nom&gt; -&gt; STATUS=PASS | FEEDBACK="Exemplary STAR answer with quantified outcome"</code><br>
- Si non conforme :<br>
  <code>STAR_EVAL: &lt;nom&gt; -&gt; STATUS=NEEDS_IMPROVEMENT | ISSUES=&lt;issue1,issue2,...&gt;</code> (triées alphabétiquement).</p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : évaluer la réponse du candidat selon les critères STAR
`,
    hints: [
      'Stocker les 4 rubriques dans un dictionnaire.',
      'Tester la présence de "I <action>" dans la section ACTION et les mots de métrique dans RESULT.'
    ],
    examples: [
      {
        stdin: 'CANDIDATE name=JohnDoe\nSITUATION: Our microservices architecture experienced heavy latency spikes during Black Friday.\nTASK: My task was to identify the bottleneck and stabilize the checkout database cluster.\nACTION: I implemented connection pooling and configured Redis caching for user sessions.\nRESULT: We reduced database latency by 45% and maintained 99.99% uptime throughout the peak.',
        expected: 'STAR_EVAL: JohnDoe -> STATUS=PASS | FEEDBACK="Exemplary STAR answer with quantified outcome"',
        note: 'Réponse modèle avec appropriation personnelle et impact chiffré (-45% de latence).'
      }
    ],
    tests: [
      {
        label: 'Action sans prise de responsabilité personnelle (utilisation exclusive du passif ou we)',
        stdin: 'CANDIDATE name=AliceSmith\nSITUATION: The legacy monolithic backend was difficult to deploy and scale reliably.\nTASK: The engineering roadmap required migrating the auth module to Docker containers.\nACTION: The team worked together and containers were deployed to the Kubernetes cluster.\nRESULT: We increased deployment frequency by 30% without incident.',
        expected: 'STAR_EVAL: AliceSmith -> STATUS=NEEDS_IMPROVEMENT | ISSUES=ACTION_LACKS_FIRST_PERSON_OWNERSHIP'
      },
      {
        label: 'Résultat vague sans aucune métrique mesurable',
        stdin: 'CANDIDATE name=BobMartin\nSITUATION: Users reported intermittent disconnections during high volume live streaming events.\nTASK: I was assigned to rewrite the WebSocket connection handshake handler.\nACTION: I redesigned the handshake protocol using lightweight binary payloads.\nRESULT: Everyone was much happier and the service felt much better overall.',
        expected: 'STAR_EVAL: BobMartin -> STATUS=NEEDS_IMPROVEMENT | ISSUES=RESULT_LACKS_QUANTIFIABLE_METRIC'
      },
      {
        label: 'Section trop courte et résultat non quantifié',
        stdin: 'CANDIDATE name=ClaraO\nSITUATION: Server broke down.\nTASK: Fix it quickly.\nACTION: I rebooted it.\nRESULT: It worked fine.',
        expected: 'STAR_EVAL: ClaraO -> STATUS=NEEDS_IMPROVEMENT | ISSUES=INCOMPLETE_SECTION,RESULT_LACKS_QUANTIFIABLE_METRIC'
      },
      {
        label: 'Candidat avec impact chiffré en temps d’exécution',
        stdin: 'CANDIDATE name=DavidLee\nSITUATION: Automated end-to-end integration test runs took forty-five minutes on each commit.\nTASK: I was tasked with accelerating feedback loops for the thirty developers on staff.\nACTION: I parallelized the test suite across eight ephemeral runner nodes.\nRESULT: The build pipeline finished in 6 minutes saving over fifty engineering hours weekly.',
        expected: 'STAR_EVAL: DavidLee -> STATUS=PASS | FEEDBACK="Exemplary STAR answer with quantified outcome"'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

cand_name = 'Candidate'
sections = {}

for lig in lignes:
    if lig.startswith('CANDIDATE '):
        m = re.search(r'name=([^\\s]+)', lig)
        if m:
            cand_name = m.group(1)
    else:
        m = re.match(r'^([A-Z]+):\\s*(.*)', lig)
        if m:
            sections[m.group(1)] = m.group(2).strip()

issues = []

# 1. Incomplete section check
req_sections = ['SITUATION', 'TASK', 'ACTION', 'RESULT']
incomplete = False
for s in req_sections:
    text = sections.get(s, '')
    if len(text.split()) < 5:
        incomplete = True
if incomplete:
    issues.append('INCOMPLETE_SECTION')

# 2. Action ownership check
action_text = sections.get('ACTION', '')
action_verbs = r'\\bI\\s+(designed|implemented|optimized|led|configured|resolved|redesigned|parallelized|wrote|engineered|deployed|rebooted)\\b'
if not re.search(action_verbs, action_text, re.I):
    issues.append('ACTION_LACKS_FIRST_PERSON_OWNERSHIP')

# 3. Result metrics check
result_text = sections.get('RESULT', '')
metric_patterns = [
    r'%',
    r'\\d+\\s*(minutes|seconds|hours|ms)',
    r'\\b(reduced|increased|improved|saved|latency|uptime)\\b'
]
has_metric = any(re.search(p, result_text, re.I) for p in metric_patterns)
if not has_metric:
    issues.append('RESULT_LACKS_QUANTIFIABLE_METRIC')

if not issues:
    print(f'STAR_EVAL: {cand_name} -> STATUS=PASS | FEEDBACK="Exemplary STAR answer with quantified outcome"')
else:
    issues.sort()
    print(f'STAR_EVAL: {cand_name} -> STATUS=NEEDS_IMPROVEMENT | ISSUES={",".join(issues)}')
`
  },
  {
    id: 'an3-c6-e2',
    chapter: 6,
    title: 'Analyseur de balisage verbal de présentation technique',
    level: 'n2',
    language: 'python',
    goal: 'Détecter les marqueurs de transition et de balisage verbal (Signposting) dans le script d’une présentation technique en anglais et évaluer la fluidité de la structure.',
    brief: `<p>Dans une présentation technique internationale (conférence, soutenance ou démo client), l'orateur doit baliser son discours avec des locutions de transition (<i>Signposts</i>) pour guider son auditoire.<br>
Le script lit sur l'entrée standard le texte intégral de la transcription d'une présentation.<br><br>
Catégories de balises verbales (recherche insensible à la casse) :<br>
1. <code>STARTING</code> : contient au moins une expression parmi <code>today i'd like to talk about</code>, <code>today i will present</code>, <code>the purpose of this talk is</code>, <code>welcome everyone</code>.<br>
2. <code>OUTLINING</code> : contient au moins une expression parmi <code>i have divided my talk into</code>, <code>to begin with</code>, <code>first we will look at</code>, <code>firstly</code>.<br>
3. <code>TRANSITION</code> : contient au moins une expression parmi <code>moving on to</code>, <code>turning now to</code>, <code>let's pivot to</code>, <code>next let's examine</code>.<br>
4. <code>CONCLUDING</code> : contient au moins une expression parmi <code>in conclusion</code>, <code>to sum up</code>, <code>to wrap up</code>, <code>finally</code>.<br>
5. <code>QA_SESSION</code> : contient au moins une expression parmi <code>thank you for your attention</code>, <code>i'd be happy to take questions</code>, <code>any questions</code>.<br><br>
Règles d'évaluation :<br>
- Recenser la liste des catégories identifiées (triées dans l'ordre de la liste ci-dessus : <code>STARTING</code>, <code>OUTLINING</code>, <code>TRANSITION</code>, <code>CONCLUDING</code>, <code>QA_SESSION</code>).<br>
- Calculer le score (nombre de catégories présentes sur 5).<br>
- Qualification :<br>
  * Si score &gt;= 4 : <code>QUALITY=EXCELLENT_FLOW</code><br>
  * Si score == 3 : <code>QUALITY=GOOD_FLOW</code><br>
  * Si score &lt;= 2 : <code>QUALITY=POOR_TRANSITIONS</code><br><br>
Afficher :<br>
<code>SIGNPOST_EVAL: DETECTED=&lt;cat1,cat2,...&gt; | SCORE=&lt;score&gt;/5 | QUALITY=&lt;QUALITY&gt;</code> (ou <code>DETECTED=NONE</code> si 0 catégorie).</p>`,
    starter: `import sys
import re

discours = sys.stdin.read().strip()

# À compléter : repérer les marqueurs de balisage verbal et évaluer le discours
`,
    hints: [
      'Normaliser le texte d\'entrée en minuscules pour faciliter les recherches de sous-chaînes.',
      'Conserver l\'ordre prédéfini des 5 catégories lors de l\'affichage.'
    ],
    examples: [
      {
        stdin: 'Welcome everyone. Today I will present our new API gateway. Firstly, we examine the problem. Moving on to our architecture. In conclusion, performance improved by 50%. Thank you for your attention, any questions?',
        expected: 'SIGNPOST_EVAL: DETECTED=STARTING,OUTLINING,TRANSITION,CONCLUDING,QA_SESSION | SCORE=5/5 | QUALITY=EXCELLENT_FLOW',
        note: 'Les 5 catégories de signposts sont toutes représentées : structure exemplaire.'
      }
    ],
    tests: [
      {
        label: 'Présentation avec 3 catégories (Good flow)',
        stdin: "Today I'd like to talk about cloud cost reduction. Moving on to our reserved instances strategy. To sum up, we saved thirty thousand dollars.",
        expected: 'SIGNPOST_EVAL: DETECTED=STARTING,TRANSITION,CONCLUDING | SCORE=3/5 | QUALITY=GOOD_FLOW'
      },
      {
        label: 'Discours informel sans transitions verbales explicites (Poor transitions)',
        stdin: 'Here is the code. Look at line 40. Now look at the chart. That is all.',
        expected: 'SIGNPOST_EVAL: DETECTED=NONE | SCORE=0/5 | QUALITY=POOR_TRANSITIONS'
      },
      {
        label: 'Présentation avec amorce, plan et questions sans transition',
        stdin: "Welcome everyone! To begin with, we inspect the microservice topology. I'd be happy to take questions now.",
        expected: 'SIGNPOST_EVAL: DETECTED=STARTING,OUTLINING,QA_SESSION | SCORE=3/5 | QUALITY=GOOD_FLOW'
      },
      {
        label: 'Excellente présentation avec 4 catégories sur 5',
        stdin: "The purpose of this talk is to review zero trust security. I have divided my talk into three sections. Next let's examine identity verification. Finally, automated policy engines enforce access.",
        expected: 'SIGNPOST_EVAL: DETECTED=STARTING,OUTLINING,TRANSITION,CONCLUDING | SCORE=4/5 | QUALITY=EXCELLENT_FLOW'
      }
    ],
    solution: `import sys

text = sys.stdin.read().lower()

CATEGORIES = [
    ('STARTING', ["today i'd like to talk about", "today i will present", "the purpose of this talk is", "welcome everyone"]),
    ('OUTLINING', ["i have divided my talk into", "to begin with", "first we will look at", "firstly"]),
    ('TRANSITION', ["moving on to", "turning now to", "let's pivot to", "next let's examine"]),
    ('CONCLUDING', ["in conclusion", "to sum up", "to wrap up", "finally"]),
    ('QA_SESSION', ["thank you for your attention", "i'd be happy to take questions", "any questions"])
]

detected = []
for cat_name, phrases in CATEGORIES:
    if any(p in text for p in phrases):
        detected.append(cat_name)

score = len(detected)
if score >= 4:
    quality = 'EXCELLENT_FLOW'
elif score == 3:
    quality = 'GOOD_FLOW'
else:
    quality = 'POOR_TRANSITIONS'

det_str = ','.join(detected) if detected else 'NONE'
print(f'SIGNPOST_EVAL: DETECTED={det_str} | SCORE={score}/5 | QUALITY={quality}')
`
  },
  {
    id: 'an3-c6-e3',
    chapter: 6,
    title: 'Évaluateur de CV technique : Verbes d’action et mots-clés ATS',
    level: 'n3',
    language: 'python',
    goal: 'Analyser le contenu d’un CV technique anglophone, mesurer le taux d’adéquation aux mots-clés de l’offre d’emploi et évaluer la force des verbes d’action pour les filtres ATS.',
    brief: `<p>Les systèmes de tri automatisé de CV (<i>Applicant Tracking Systems - ATS</i>) pénalisent les verbes passifs ou faibles (<i>"worked on"</i>, <i>"helped with"</i>) et favorisent les verbes d'action à fort impact (<i>"engineered"</i>, <i>"architected"</i>, <i>"optimized"</i>) ainsi que la présence des mots-clés requis par le poste.<br>
Le script lit sur l'entrée standard :<br>
<code>JOB_ROLE: &lt;intitulé du poste&gt;</code><br>
<code>KEYWORDS: &lt;kw1,kw2,...&gt;</code><br>
<code>EXPERIENCE_BULLETS:</code><br>
suivi d'une ou plusieurs lignes débutant par <code>- </code>.<br><br>
Règles d'évaluation :<br>
1. <b>Adéquation des mots-clés (Keywords Match)</b> : Compter combien de mots-clés de la liste <code>KEYWORDS</code> apparaissent dans le texte des puces d'expérience (insensible à la casse).<br>
   Calculer le pourcentage de correspondance : <code>match_pct = round(nb_trouves / total_mots_cles * 100)</code>.<br>
2. <b>Audit des verbes d'action en tête de puce</b> : Extraire le premier mot de chaque puce (après le tiret et l'espace) :<br>
   - <b>Verbes d'action forts (STRONG)</b> : <code>engineered</code>, <code>architected</code>, <code>deployed</code>, <code>spearheaded</code>, <code>optimized</code>, <code>automated</code>, <code>implemented</code>, <code>designed</code>, <code>scaled</code>.<br>
   - <b>Verbes faibles / passifs (WEAK)</b> : <code>worked</code>, <code>helped</code>, <code>assisted</code>, <code>responsible</code>, <code>did</code>, <code>tried</code>.<br>
3. <b>Classement ATS (ATS_RATING)</b> :<br>
   - <code>HIGH</code> : Si <code>match_pct &gt;= 75</code> et <code>nb_weak == 0</code> et <code>nb_strong &gt;= 2</code>.<br>
   - <code>LOW</code> : Si <code>match_pct &lt; 50</code> ou <code>nb_weak &gt;= 2</code>.<br>
   - <code>MEDIUM</code> : Dans les autres cas.<br><br>
Afficher :<br>
<code>ATS_AUDIT: ROLE=&lt;JOB_ROLE&gt; | MATCH=&lt;match_pct&gt;% (&lt;nb_trouves&gt;/&lt;total&gt;) | STRONG_VERBS=&lt;nb_strong&gt; | WEAK_VERBS=&lt;nb_weak&gt; | RATING=&lt;RATING&gt;</code></p>`,
    starter: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer le taux de match des mots-clés et qualifier les verbes d'action
`,
    hints: [
      'Extraire le premier mot de chaque puce avec line.split()[1] après le tiret.',
      'Rechercher chaque mot-clé dans l\'ensemble du texte d\'expérience converti en minuscules.'
    ],
    examples: [
      {
        stdin: 'JOB_ROLE: Senior Cloud Architect\nKEYWORDS: kubernetes,terraform,aws,docker\nEXPERIENCE_BULLETS:\n- Architected multi-region AWS cloud infrastructure with Terraform\n- Engineered Kubernetes deployment pipelines and Docker container security\n- Optimized database query caching reducing memory consumption by 30%',
        expected: 'ATS_AUDIT: ROLE=Senior Cloud Architect | MATCH=100% (4/4) | STRONG_VERBS=3 | WEAK_VERBS=0 | RATING=HIGH',
        note: '100% des mots-clés trouvés et 3 verbes d\'action à fort impact : note ATS maximale (HIGH).'
      }
    ],
    tests: [
      {
        label: 'CV avec verbes faibles pénalisant la note ATS',
        stdin: 'JOB_ROLE: DevOps Engineer\nKEYWORDS: docker,ci/cd,ansible,linux\nEXPERIENCE_BULLETS:\n- Worked with Docker containers and Linux systems\n- Helped with CI/CD setup for testing\n- Assisted senior developers on Ansible playbooks',
        expected: 'ATS_AUDIT: ROLE=DevOps Engineer | MATCH=100% (4/4) | STRONG_VERBS=0 | WEAK_VERBS=3 | RATING=LOW'
      },
      {
        label: 'Taux de mots-clés insuffisant inférieur à 50%',
        stdin: 'JOB_ROLE: Security Engineer\nKEYWORDS: cryptography,siem,soc,penetration,pki\nEXPERIENCE_BULLETS:\n- Implemented security awareness training program\n- Designed corporate password policy handbook',
        expected: 'ATS_AUDIT: ROLE=Security Engineer | MATCH=0% (0/5) | STRONG_VERBS=2 | WEAK_VERBS=0 | RATING=LOW'
      },
      {
        label: 'CV équilibré avec notation moyenne (MEDIUM)',
        stdin: 'JOB_ROLE: Backend Developer\nKEYWORDS: python,fastapi,postgresql,redis\nEXPERIENCE_BULLETS:\n- Engineered RESTful microservices using Python and FastAPI\n- Worked on PostgreSQL database query optimization',
        expected: 'ATS_AUDIT: ROLE=Backend Developer | MATCH=75% (3/4) | STRONG_VERBS=1 | WEAK_VERBS=1 | RATING=MEDIUM'
      },
      {
        label: 'Verbes forts multiples atteignant le palier HIGH',
        stdin: 'JOB_ROLE: SRE Lead\nKEYWORDS: prometheus,grafana,alertmanager\nEXPERIENCE_BULLETS:\n- Automated telemetry collection using Prometheus and Alertmanager\n- Spearheaded observability dashboards in Grafana for platform reliability',
        expected: 'ATS_AUDIT: ROLE=SRE Lead | MATCH=100% (3/3) | STRONG_VERBS=2 | WEAK_VERBS=0 | RATING=HIGH'
      }
    ],
    solution: `import sys
import re

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

role = 'Developer'
keywords = []
bullets = []

in_bullets = False
for lig in lignes:
    if lig.startswith('JOB_ROLE:'):
        role = lig[len('JOB_ROLE:'):].strip()
    elif lig.startswith('KEYWORDS:'):
        raw_kw = lig[len('KEYWORDS:'):].strip()
        keywords = [k.strip().lower() for k in raw_kw.split(',') if k.strip()]
    elif lig.startswith('EXPERIENCE_BULLETS:'):
        in_bullets = True
    elif in_bullets and lig.startswith('-'):
        bullets.append(lig)

exp_text = ' '.join(bullets).lower()

# 1. Keyword match
kw_found = 0
for kw in keywords:
    if kw in exp_text:
        kw_found += 1

total_kw = len(keywords) if keywords else 1
match_pct = round((kw_found / total_kw) * 100)

# 2. Action verbs
STRONG = {'engineered', 'architected', 'deployed', 'spearheaded', 'optimized', 'automated', 'implemented', 'designed', 'scaled'}
WEAK = {'worked', 'helped', 'assisted', 'responsible', 'did', 'tried'}

strong_count = 0
weak_count = 0

for b in bullets:
    # Remove leading '-' and whitespace
    content = b.lstrip('-').strip()
    if not content:
        continue
    first_word = content.split()[0].lower().rstrip(':,.-')
    if first_word in STRONG:
        strong_count += 1
    elif first_word in WEAK:
        weak_count += 1

# 3. Rating
if match_pct >= 75 and weak_count == 0 and strong_count >= 2:
    rating = 'HIGH'
elif match_pct < 50 or weak_count >= 2:
    rating = 'LOW'
else:
    rating = 'MEDIUM'

print(f'ATS_AUDIT: ROLE={role} | MATCH={match_pct}% ({kw_found}/{total_kw}) | STRONG_VERBS={strong_count} | WEAK_VERBS={weak_count} | RATING={rating}')
`
  }
];
