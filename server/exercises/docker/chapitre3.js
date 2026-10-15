/**
 * Exercices du chapitre 3 — Docker B2.
 * Dockerfile, Directives &amp; Optimisation Multi-Stage.
 */
'use strict';

module.exports = [
  {
    id: 'dk2-c3-e1',
    chapter: 3,
    title: 'Validateur et linter de bonnes pratiques Dockerfile',
    level: 'n1',
    language: 'python',
    goal: 'Analyser statiquement les instructions d’un Dockerfile et détecter les anti-patterns courants.',
    brief: '<p>Le script lit sur l\'entrée standard les lignes d\'un Dockerfile.<br>\nRègles d\'audit et de conformité :<br>\n1. Première instruction non-commentaire : DOIT être <code>FROM</code> (ou <code>ARG</code>). Si absent : <code>ERREUR_CRITIQUE: Dockerfile doit debuter par FROM</code>.<br>\n2. <strong>Anti-pattern ADD</strong> : si une ligne commence par <code>ADD</code> avec un fichier local simple (.txt, .js, .py, etc. sans .tar/.gz/.zip ni URL http) : afficher <code>AVERTISSEMENT [Ligne N]: Preferer COPY a ADD pour les fichiers locaux</code>.<br>\n3. <strong>Anti-pattern Cache Apt</strong> : si <code>RUN apt-get update</code> est présent seul sans <code>apt-get install</code> sur la même instruction chaînée : afficher <code>AVERTISSEMENT [Ligne N]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)</code>.<br>\n4. Si aucun problème n\'est détecté : afficher <code>AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)</code>.<br>\nSinon, afficher <code>AUDIT_DOCKERFILE: NON_CONFORME (&lt;K&gt; avertissement(s))</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser et auditer le Dockerfile
`,
    hints: [
      'Ignorer les lignes commençant par # (commentaires).',
      'Identifier les chaînes locales dans ADD (absence de http/tar/gz).'
    ],
    examples: [
      {
        stdin: '# Mon Dockerfile de production\nFROM node:18-alpine\nADD package.json .\nRUN npm install\nCOPY . .\nCMD ["node", "server.js"]',
        expected: 'AVERTISSEMENT [Ligne 3]: Preferer COPY a ADD pour les fichiers locaux\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))',
        note: 'ADD est déconseillé pour copier de simples fichiers locaux.'
      }
    ],
    tests: [
      {
        label: 'Dockerfile parfaitement conforme',
        stdin: 'FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nUSER 1001\nCMD ["python", "app.py"]',
        expected: 'AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)'
      },
      {
        label: 'Anti-pattern apt-get update isolé',
        stdin: 'FROM debian:bullseye\nRUN apt-get update\nRUN apt-get install -y curl\nCMD ["bash"]',
        expected: 'AVERTISSEMENT [Ligne 2]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)\nAUDIT_DOCKERFILE: NON_CONFORME (1 avertissement(s))'
      },
      {
        label: 'Erreur critique absence de FROM initial',
        stdin: 'WORKDIR /app\nCOPY . .\nCMD ["sh"]',
        expected: 'ERREUR_CRITIQUE: Dockerfile doit debuter par FROM'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# Filtrer les commentaires pour trouver la premiere directive
premiere_directive = None
for l in lignes:
    if not l.startswith('#'):
        premiere_directive = l.split()[0].upper()
        break

if premiere_directive not in ('FROM', 'ARG'):
    print("ERREUR_CRITIQUE: Dockerfile doit debuter par FROM")
    sys.exit(0)

avertissements = []

for idx, l in enumerate(lignes, 1):
    if l.startswith('#'):
        continue
    tokens = l.split(None, 1)
    if not tokens:
        continue
    instr = tokens[0].upper()
    reste = tokens[1] if len(tokens) > 1 else ""

    if instr == 'ADD':
        # verifier si url ou archive
        lower_reste = reste.lower()
        if not (lower_reste.startswith('http://') or lower_reste.startswith('https://') or
                lower_reste.endswith('.tar') or lower_reste.endswith('.tar.gz') or
                lower_reste.endswith('.tgz') or lower_reste.endswith('.tar.bz2') or
                lower_reste.endswith('.zip')):
            avertissements.append(f"AVERTISSEMENT [Ligne {idx}]: Preferer COPY a ADD pour les fichiers locaux")

    elif instr == 'RUN':
        if 'apt-get update' in reste and 'apt-get install' not in reste:
            avertissements.append(f"AVERTISSEMENT [Ligne {idx}]: RUN apt-get update isole (fusionner avec install et rm -rf /var/lib/apt/lists/*)")

for a in avertissements:
    print(a)

if not avertissements:
    print("AUDIT_DOCKERFILE: CONFORME (Aucun anti-pattern detecte)")
else:
    print(f"AUDIT_DOCKERFILE: NON_CONFORME ({len(avertissements)} avertissement(s))")
`
  },
  {
    id: 'dk2-c3-e2',
    chapter: 3,
    title: 'Distributeur de commandes CMD vs ENTRYPOINT',
    level: 'n2',
    language: 'python',
    goal: 'Calculer la ligne de commande finale exacte exécutée dans le conteneur selon la présence de ENTRYPOINT, CMD et arguments CLI.',
    brief: '<p>Le script lit sur l\'entrée standard trois lignes :<br>\n1. <code>ENTRYPOINT: &lt;liste d\'arguments séparés par des virgules ou NONE&gt;</code><br>\n2. <code>CMD: &lt;liste d\'arguments séparés par des virgules ou NONE&gt;</code><br>\n3. <code>CLI_ARGS: &lt;arguments passés à docker run séparés par des virgules ou NONE&gt;</code><br>\nRègles d\'évaluation du runtime Docker :<br>\n- Si <code>CLI_ARGS</code> n\'est pas <code>NONE</code>, il écrase complètement <code>CMD</code>.<br>\n- Si <code>ENTRYPOINT</code> n\'est pas <code>NONE</code> : la commande finale est la concaténation de <code>ENTRYPOINT</code> + (<code>CLI_ARGS</code> s\'il existe, sinon <code>CMD</code> si présent).<br>\n- Si <code>ENTRYPOINT</code> est <code>NONE</code> : la commande finale est <code>CLI_ARGS</code> (s\'il existe) sinon <code>CMD</code>.<br>\nAfficher la commande résultante (arguments joints par des espaces) :<br>\n<code>COMMANDE_FINALE: &lt;cmd1&gt; &lt;cmd2&gt; ...</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : combiner ENTRYPOINT, CMD et arguments CLI
`,
    hints: [
      'Traiter la valeur spéciale NONE comme une liste vide.',
      'Les arguments passés en ligne de commande remplacent systématiquement l’instruction CMD.'
    ],
    examples: [
      {
        stdin: 'ENTRYPOINT: python, app.py\nCMD: --port, 8080\nCLI_ARGS: NONE',
        expected: 'COMMANDE_FINALE: python app.py --port 8080',
        note: 'ENTRYPOINT et CMD sont combinés par défaut.'
      },
      {
        stdin: 'ENTRYPOINT: python, app.py\nCMD: --port, 8080\nCLI_ARGS: --debug, --port, 9000',
        expected: 'COMMANDE_FINALE: python app.py --debug --port 9000',
        note: 'Les arguments CLI écrasent le CMD par défaut.'
      }
    ],
    tests: [
      {
        label: 'CMD seul sans ENTRYPOINT',
        stdin: 'ENTRYPOINT: NONE\nCMD: nginx, -g, daemon off;\nCLI_ARGS: NONE',
        expected: 'COMMANDE_FINALE: nginx -g daemon off;'
      },
      {
        label: 'CMD seul écrasé par commande CLI (ex: docker run ... bash)',
        stdin: 'ENTRYPOINT: NONE\nCMD: node, index.js\nCLI_ARGS: bash',
        expected: 'COMMANDE_FINALE: bash'
      },
      {
        label: 'ENTRYPOINT seul sans CMD',
        stdin: 'ENTRYPOINT: /entrypoint.sh\nCMD: NONE\nCLI_ARGS: NONE',
        expected: 'COMMANDE_FINALE: /entrypoint.sh'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

def parser_ligne(l):
    parties = l.split(':', 1)
    if len(parties) < 2:
        return []
    val = parties[1].strip()
    if val.upper() == 'NONE' or not val:
        return []
    return [x.strip() for x in val.split(',') if x.strip()]

entrypoint = parser_ligne(lignes[0]) if len(lignes) > 0 else []
cmd = parser_ligne(lignes[1]) if len(lignes) > 1 else []
cli = parser_ligne(lignes[2]) if len(lignes) > 2 else []

if cli:
    params = cli
else:
    params = cmd

if entrypoint:
    finale = entrypoint + params
else:
    finale = params

print("COMMANDE_FINALE: " + " ".join(finale))
`
  },
  {
    id: 'dk2-c3-e3',
    chapter: 3,
    title: 'Optimiseur de cache et build Multi-Stage',
    level: 'n3',
    language: 'python',
    goal: 'Quantifier l’allègement drastique d’image obtenu par le pattern Multi-Stage Build face à une construction monolithique.',
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- Ligne 1 : <code>MONOLITHIC: &lt;NomBase&gt; &lt;TailleBaseMo&gt; + &lt;OutilsDevMo&gt; + &lt;CodeMo&gt; + &lt;BinaireProduitMo&gt;</code>.<br>\n- Ligne 2 : <code>STAGE_BUILD: &lt;NomBaseBuild&gt; &lt;TailleTotalBuildMo&gt; -&gt; EXPORT: &lt;BinaireProduitMo&gt;</code>.<br>\n- Ligne 3 : <code>STAGE_FINAL: &lt;NomBaseLegere&gt; &lt;TailleBaseLegereMo&gt; + IMPORT: &lt;BinaireProduitMo&gt;</code>.<br>\nCalculer :<br>\n1. Taille totale de l\'image monolithique = <code>TailleBaseMo + OutilsDevMo + CodeMo + BinaireProduitMo</code>.<br>\n2. Taille de l\'image finale issue du multi-stage = <code>TailleBaseLegereMo + BinaireProduitMo</code>.<br>\n3. Réduction brute = <code>TailleMono - TailleMulti</code> (en Mo).<br>\n4. Pourcentage d\'économie = <code>(Reduction / TailleMono) * 100</code> (arrondi à 1 décimale).<br>\nAfficher :<br>\n<code>IMAGE_MONOLITHIQUE: &lt;Tmono&gt; Mo</code><br>\n<code>IMAGE_MULTI_STAGE: &lt;Tmulti&gt; Mo</code><br>\n<code>GAIN_SECURITE_ET_TAILLE: -&lt;Red&gt; Mo (&lt;Pct:.1f&gt;% economises)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : calculer les gains d'un build multi-stage
`,
    hints: [
      'Seule la dernière étape (STAGE_FINAL) est embarquée dans l’image finale distribuée.',
      'Les compilateurs et codes sources de build sont jetés.'
    ],
    examples: [
      {
        stdin: 'MONOLITHIC: golang:1.21 800 + 150 + 10 + 20\nSTAGE_BUILD: golang:1.21 980 -> EXPORT: 20\nSTAGE_FINAL: alpine:3.18 7 + IMPORT: 20',
        expected: 'IMAGE_MONOLITHIQUE: 980 Mo\nIMAGE_MULTI_STAGE: 27 Mo\nGAIN_SECURITE_ET_TAILLE: -953 Mo (97.2% economises)',
        note: 'Une application Go compilée passe de près de 1 Go à 27 Mo.'
      }
    ],
    tests: [
      {
        label: 'Application Java Quarkus / GraalVM vers distroless',
        stdin: 'MONOLITHIC: graalvm:jdk17 1200 + 300 + 50 + 40\nSTAGE_BUILD: graalvm:jdk17 1590 -> EXPORT: 40\nSTAGE_FINAL: gcr.io/distroless/static 2 + IMPORT: 40',
        expected: 'IMAGE_MONOLITHIQUE: 1590 Mo\nIMAGE_MULTI_STAGE: 42 Mo\nGAIN_SECURITE_ET_TAILLE: -1548 Mo (97.4% economises)'
      },
      {
        label: 'Application Node.js avec bundle frontend',
        stdin: 'MONOLITHIC: node:20 1000 + 250 + 30 + 10\nSTAGE_BUILD: node:20 1290 -> EXPORT: 10\nSTAGE_FINAL: nginx:alpine 25 + IMPORT: 10',
        expected: 'IMAGE_MONOLITHIQUE: 1290 Mo\nIMAGE_MULTI_STAGE: 35 Mo\nGAIN_SECURITE_ET_TAILLE: -1255 Mo (97.3% economises)'
      },
      {
        label: 'Build léger C Rust vers scratch',
        stdin: 'MONOLITHIC: rust:1.75 1400 + 200 + 20 + 8\nSTAGE_BUILD: rust:1.75 1628 -> EXPORT: 8\nSTAGE_FINAL: scratch 0 + IMPORT: 8',
        expected: 'IMAGE_MONOLITHIQUE: 1628 Mo\nIMAGE_MULTI_STAGE: 8 Mo\nGAIN_SECURITE_ET_TAILLE: -1620 Mo (99.5% economises)'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
if len(lignes) >= 3:
    # Ligne 1 : MONOLITHIC: golang:1.21 800 + 150 + 10 + 20
    p1 = lignes[0].split(':', 1)[1].strip()
    morceaux1 = p1.split(None, 1)[1]  # apres le nom d'image
    valeurs_mono = [int(x.strip()) for x in morceaux1.split('+')]
    t_mono = sum(valeurs_mono)

    # Ligne 3 : STAGE_FINAL: alpine:3.18 7 + IMPORT: 20
    p3 = lignes[2].split(':', 1)[1].strip()
    apres_img = p3.split(None, 1)[1]
    part_base, part_import = apres_img.split('+')
    t_base = int(part_base.strip())
    t_bin = int(part_import.split(':')[1].strip())
    t_multi = t_base + t_bin

    red = t_mono - t_multi
    pct = (red / t_mono) * 100.0

    print(f"IMAGE_MONOLITHIQUE: {t_mono} Mo")
    print(f"IMAGE_MULTI_STAGE: {t_multi} Mo")
    print(f"GAIN_SECURITE_ET_TAILLE: -{red} Mo ({pct:.1f}% economises)")
`
  }
];
