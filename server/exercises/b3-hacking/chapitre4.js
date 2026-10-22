'use strict';

module.exports = [
  {
    "id": "hk3-c4-e1",
    "chapter": 4,
    "title": "Détecteur de Vecteurs d'Injection SQL (SQLi Pattern Analyzer)",
    "level": "n1",
    "language": "analyse",
    "goal": "Analyser une chaîne de paramètres HTTP pour détecter et classifier les signatures d'injection SQL.",
    "brief": "<p>L'injection SQL (A03:2021-Injection dans l'OWASP Top 10) survient lorsqu'une entrée utilisateur non nettoyée est concaténée dans une commande SQL.<br><br>\nTypes de motifs surveillés (insensibles à la casse) :<br>\n1. <code>SQLI_UNION</code> : contient <code>UNION SELECT</code> ou <code>UNION ALL SELECT</code>.<br>\n2. <code>SQLI_TAUTOLOGY</code> : contient <code>OR 1=1</code>, <code>OR '1'='1'</code>, <code>OR \"1\"=\"1\"</code> ou <code>OR \"\"=\"\"</code>.<br>\n3. <code>SQLI_STACKED</code> : contient <code>; DROP</code>, <code>; INSERT</code>, <code>; UPDATE</code>, <code>; DELETE</code> ou <code>; WAITFOR</code>.<br>\n4. <code>SQLI_COMMENT</code> : contient <code>--</code>, <code>/*</code> ou <code>#</code> en fin ou milieu de chaîne suspecte.<br><br>\nPriorité d'attribution : <code>SQLI_UNION</code> &gt; <code>SQLI_TAUTOLOGY</code> &gt; <code>SQLI_STACKED</code> &gt; <code>SQLI_COMMENT</code>.<br><br>\nDonnées du cas : <code>SQLI_CHECK param=&lt;valeur&gt;</code>.<br>\nRésultat d’analyse attendu :<br>\n- Si injection : <code>SQLI_ALERT: pattern=&lt;TYPE&gt; severity=CRITICAL status=INJECTION_DETECTED</code><br>\n- Si sain : <code>SQLI_ALERT: pattern=NONE severity=NONE status=CLEAN_PARAM</code></p>",
    "starter": "# Grille d'analyse (hk3-c4-e1) — Détecteur de Vecteurs d'Injection SQL (SQLi Pattern Analyzer)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Injection UNION pour extraction de données d'autres tables]\n# Données : SQLI_CHECK param=1 UNION SELECT null, username, password FROM users--\nA_COMPLETER\n\n[Cas 2 — Requêtes empilées (Stacked Queries) avec tentative de suppression de table]\n# Données : SQLI_CHECK param=10; DROP TABLE clients;\nA_COMPLETER\n\n[Cas 3 — Troncature de requête par commentaire seul]\n# Données : SQLI_CHECK param=admin/*comment*/\nA_COMPLETER\n\n[Cas 4 — Paramètre alphanumérique légitime]\n# Données : SQLI_CHECK param=alice_dupont_2026\nA_COMPLETER\n",
    "hints": [
      "Extrayez la valeur du paramètre avec l’extraction des champs[1] pour préserver les espaces.",
      "Convertissez la valeur en majuscules pour tester les mots-clés UNION SELECT, OR 1=1, etc.",
      "Vérifiez les motifs dans l'ordre de priorité spécifié."
    ],
    "examples": [
      {
        "stdin": "SQLI_CHECK param=admin' OR '1'='1' --",
        "expected": "SQLI_ALERT: pattern=SQLI_TAUTOLOGY severity=CRITICAL status=INJECTION_DETECTED",
        "note": "Tautologie booléenne classique permettant le contournement d'authentification."
      }
    ],
    "tests": [
      {
        "label": "Injection UNION pour extraction de données d'autres tables",
        "stdin": "cas:1",
        "expected": "SQLI_ALERT: pattern=SQLI_UNION severity=CRITICAL status=INJECTION_DETECTED"
      },
      {
        "label": "Requêtes empilées (Stacked Queries) avec tentative de suppression de table",
        "stdin": "cas:2",
        "expected": "SQLI_ALERT: pattern=SQLI_STACKED severity=CRITICAL status=INJECTION_DETECTED"
      },
      {
        "label": "Troncature de requête par commentaire seul",
        "stdin": "cas:3",
        "expected": "SQLI_ALERT: pattern=SQLI_COMMENT severity=CRITICAL status=INJECTION_DETECTED"
      },
      {
        "label": "Paramètre alphanumérique légitime",
        "stdin": "cas:4",
        "expected": "SQLI_ALERT: pattern=NONE severity=NONE status=CLEAN_PARAM"
      }
    ],
    "solution": "[Exemple]\nSQLI_ALERT: pattern=SQLI_TAUTOLOGY severity=CRITICAL status=INJECTION_DETECTED\n\n[Cas 1 — Injection UNION pour extraction de données d'autres tables]\nSQLI_ALERT: pattern=SQLI_UNION severity=CRITICAL status=INJECTION_DETECTED\n\n[Cas 2 — Requêtes empilées (Stacked Queries) avec tentative de suppression de table]\nSQLI_ALERT: pattern=SQLI_STACKED severity=CRITICAL status=INJECTION_DETECTED\n\n[Cas 3 — Troncature de requête par commentaire seul]\nSQLI_ALERT: pattern=SQLI_COMMENT severity=CRITICAL status=INJECTION_DETECTED\n\n[Cas 4 — Paramètre alphanumérique légitime]\nSQLI_ALERT: pattern=NONE severity=NONE status=CLEAN_PARAM"
  },
  {
    "id": "hk3-c4-e2",
    "chapter": 4,
    "title": "Simulateur d'Attaque par Injection SQL Aveugle Basée sur le Temps",
    "level": "n2",
    "language": "analyse",
    "goal": "Simuler l'inférence de données caractère par caractère via des sondes temporelles (Time-Based Blind SQLi).",
    "brief": "<p>Quand une application web ne renvoie aucune erreur ni donnée dans ses pages, l'attaquant exploite une commande de temporisation (ex: <code>IF(SUBSTRING(secret,1,1)='A', SLEEP(5), 0)</code>).<br><br>\nRègles de simulation :<br>\n- Un secret est stocké sur la cible : <code>actual_secret</code>.<br>\n- Chaque sonde teste un couple <code>pos:char</code> (position 1-indexée).<br>\n- Si <code>1 &lt;= pos &lt;= len(actual_secret)</code> et <code>actual_secret[pos - 1] == char</code> :<br>\n  - La condition est <code>TRUE</code>, le délai simulé vaut <code>5.0s</code>, caractère confirmé.<br>\n- Sinon :<br>\n  - La condition est <code>FALSE</code>, le délai vaut <code>0.0s</code>, caractère réfuté.<br><br>\nDonnées du cas : <code>TIME_INFER actual_secret=&lt;secret&gt; probes=&lt;pos1:c1,pos2:c2,...&gt;</code>.<br>\nRésultats d’analyse attendus :<br>\n- Pour chaque sonde : <code>PROBE: pos=&lt;p&gt; char=&lt;c&gt; match=&lt;TRUE|FALSE&gt; delay=&lt;5.0|0.0&gt;s</code><br>\n- Ligne récapitulative finale : <code>EXTRACTED: confirmed_chars=&lt;caractères_trouvés_dans_l_ordre|NONE&gt;</code> (chaîne des caractères validés concaténés dans l'ordre croissant de leur position unique).</p>",
    "starter": "# Grille d'analyse (hk3-c4-e2) — Simulateur d'Attaque par Injection SQL Aveugle Basée sur le Temps\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Recherche de mot de passe administrateur avec échecs et succès]\n# Données : TIME_INFER actual_secret=ROOT probes=1:A,1:R,2:O,3:O,4:T\nA_COMPLETER\n\n[Cas 2 — Aucune sonde ne devine le bon caractère]\n# Données : TIME_INFER actual_secret=SECRET probes=1:X,2:Y,3:Z\nA_COMPLETER\n\n[Cas 3 — Extraction partielle de jeton d'API]\n# Données : TIME_INFER actual_secret=TOK123 probes=1:T,2:O,5:2\nA_COMPLETER\n",
    "hints": [
      "Parcourez probes en découpant pos:char.",
      "Comparez char avec secret[pos - 1] si pos est dans les bornes.",
      "Conservez un dictionnaire {pos: char} des caractères validés pour reconstituer la chaîne finale."
    ],
    "examples": [
      {
        "stdin": "TIME_INFER actual_secret=FLAG probes=1:F,1:B,2:L,3:A,4:G",
        "expected": "PROBE: pos=1 char=F match=TRUE delay=5.0s\nPROBE: pos=1 char=B match=FALSE delay=0.0s\nPROBE: pos=2 char=L match=TRUE delay=5.0s\nPROBE: pos=3 char=A match=TRUE delay=5.0s\nPROBE: pos=4 char=G match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=FLAG",
        "note": "Extraction complète des 4 caractères du secret grâce au délai de 5 secondes."
      }
    ],
    "tests": [
      {
        "label": "Recherche de mot de passe administrateur avec échecs et succès",
        "stdin": "cas:1",
        "expected": "PROBE: pos=1 char=A match=FALSE delay=0.0s\nPROBE: pos=1 char=R match=TRUE delay=5.0s\nPROBE: pos=2 char=O match=TRUE delay=5.0s\nPROBE: pos=3 char=O match=TRUE delay=5.0s\nPROBE: pos=4 char=T match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=ROOT"
      },
      {
        "label": "Aucune sonde ne devine le bon caractère",
        "stdin": "cas:2",
        "expected": "PROBE: pos=1 char=X match=FALSE delay=0.0s\nPROBE: pos=2 char=Y match=FALSE delay=0.0s\nPROBE: pos=3 char=Z match=FALSE delay=0.0s\nEXTRACTED: confirmed_chars=NONE"
      },
      {
        "label": "Extraction partielle de jeton d'API",
        "stdin": "cas:3",
        "expected": "PROBE: pos=1 char=T match=TRUE delay=5.0s\nPROBE: pos=2 char=O match=TRUE delay=5.0s\nPROBE: pos=5 char=2 match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=TO2"
      }
    ],
    "solution": "[Exemple]\nPROBE: pos=1 char=F match=TRUE delay=5.0s\nPROBE: pos=1 char=B match=FALSE delay=0.0s\nPROBE: pos=2 char=L match=TRUE delay=5.0s\nPROBE: pos=3 char=A match=TRUE delay=5.0s\nPROBE: pos=4 char=G match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=FLAG\n\n[Cas 1 — Recherche de mot de passe administrateur avec échecs et succès]\nPROBE: pos=1 char=A match=FALSE delay=0.0s\nPROBE: pos=1 char=R match=TRUE delay=5.0s\nPROBE: pos=2 char=O match=TRUE delay=5.0s\nPROBE: pos=3 char=O match=TRUE delay=5.0s\nPROBE: pos=4 char=T match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=ROOT\n\n[Cas 2 — Aucune sonde ne devine le bon caractère]\nPROBE: pos=1 char=X match=FALSE delay=0.0s\nPROBE: pos=2 char=Y match=FALSE delay=0.0s\nPROBE: pos=3 char=Z match=FALSE delay=0.0s\nEXTRACTED: confirmed_chars=NONE\n\n[Cas 3 — Extraction partielle de jeton d'API]\nPROBE: pos=1 char=T match=TRUE delay=5.0s\nPROBE: pos=2 char=O match=TRUE delay=5.0s\nPROBE: pos=5 char=2 match=TRUE delay=5.0s\nEXTRACTED: confirmed_chars=TO2"
  },
  {
    "id": "hk3-c4-e3",
    "chapter": 4,
    "title": "Analyseur de Traversée de Répertoire et Inclusion de Fichiers (Path Traversal / LFI)",
    "level": "n3",
    "language": "analyse",
    "goal": "Détecter les tentatives de traversée de répertoire (Directory Traversal) et normaliser les chemins d'accès URI.",
    "brief": "<p>L'attaque par traversée de répertoire vise à accéder à des fichiers situés hors du dossier racine autorisé (ex: <code>/etc/passwd</code>, <code>win.ini</code>).<br><br>\nAlgorithme de normalisation et détection :<br>\n1. Décodage d'URL : remplacer <code>%2e%2e%2f</code> et <code>%2e%2e/</code> par <code>../</code>, <code>%2e%2e%5c</code> par <code>..\\</code>.<br>\n2. Remplacer les séparateurs Windows <code>\\</code> par <code>/</code>.<br>\n3. Tronquer la chaîne si un octet nul (<code>%00</code> ou <code>\\0</code>) est injecté.<br>\n4. Résolution de chemin virtuel :<br>\n   - Partir d'une liste vide de segments.<br>\n   - Pour chaque segment entre les slashes <code>/</code> :<br>\n     - Si <code>.</code> ou vide : ignorer.<br>\n     - Si <code>..</code> : dépiler le dernier segment s'il existe. Si la pile est déjà vide, marquer <code>ESCAPED_ROOT = True</code>.<br>\n     - Sinon : empiler le segment.<br>\n5. Décision de sécurité :<br>\n   - Si <code>ESCAPED_ROOT</code> est Vrai ou si le chemin résolu cible un fichier système sensible (<code>passwd</code>, <code>shadow</code>, <code>hosts</code>, <code>win.ini</code>) :<br>\n     <code>status=BLOCKED_TRAVERSAL</code>, <code>risk=CRITICAL</code>.<br>\n   - Sinon : <code>status=SAFE_ACCESS</code>, <code>risk=LOW</code>.<br><br>\nDonnées du cas : <code>LFI_CHECK path=&lt;chemin_brut&gt;</code>.<br>\nRésultat d’analyse attendu : <code>LFI_AUDIT: input=&lt;path&gt; resolved=&lt;/seg1/seg2|ROOT&gt; status=&lt;BLOCKED_TRAVERSAL|SAFE_ACCESS&gt; risk=&lt;CRITICAL|LOW&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c4-e3) — Analyseur de Traversée de Répertoire et Inclusion de Fichiers (Path Traversal / LFI)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Tentative d'évasion avec encodage URL pour contourner les filtres basiques]\n# Données : LFI_CHECK path=%2e%2e%2f%2e%2e%2fetc/shadow\nA_COMPLETER\n\n[Cas 2 — Chemin légitime restant confiné dans le sous-dossier autorisé]\n# Données : LFI_CHECK path=documents/2026/rapport.pdf\nA_COMPLETER\n\n[Cas 3 — Chemin avec retour relatif interne autorisé ne sortant pas de la racine]\n# Données : LFI_CHECK path=images/sub/../logo.png\nA_COMPLETER\n",
    "hints": [
      "Normalisez les encodages URL (%2e%2e%2f -> ../).",
      "Tronquez à %00 si présent.",
      "Gérez la pile de segments et détectez si une tentative de sortie de racine survient."
    ],
    "examples": [
      {
        "stdin": "LFI_CHECK path=../../../../etc/passwd",
        "expected": "LFI_AUDIT: input=../../../../etc/passwd resolved=/etc/passwd status=BLOCKED_TRAVERSAL risk=CRITICAL",
        "note": "Tentative d'évasion de racine pour lire le fichier système des comptes Linux."
      }
    ],
    "tests": [
      {
        "label": "Tentative d'évasion avec encodage URL pour contourner les filtres basiques",
        "stdin": "cas:1",
        "expected": "LFI_AUDIT: input=%2e%2e%2f%2e%2e%2fetc/shadow resolved=/etc/shadow status=BLOCKED_TRAVERSAL risk=CRITICAL"
      },
      {
        "label": "Chemin légitime restant confiné dans le sous-dossier autorisé",
        "stdin": "cas:2",
        "expected": "LFI_AUDIT: input=documents/2026/rapport.pdf resolved=/documents/2026/rapport.pdf status=SAFE_ACCESS risk=LOW"
      },
      {
        "label": "Chemin avec retour relatif interne autorisé ne sortant pas de la racine",
        "stdin": "cas:3",
        "expected": "LFI_AUDIT: input=images/sub/../logo.png resolved=/images/logo.png status=SAFE_ACCESS risk=LOW"
      }
    ],
    "solution": "[Exemple]\nLFI_AUDIT: input=../../../../etc/passwd resolved=/etc/passwd status=BLOCKED_TRAVERSAL risk=CRITICAL\n\n[Cas 1 — Tentative d'évasion avec encodage URL pour contourner les filtres basiques]\nLFI_AUDIT: input=%2e%2e%2f%2e%2e%2fetc/shadow resolved=/etc/shadow status=BLOCKED_TRAVERSAL risk=CRITICAL\n\n[Cas 2 — Chemin légitime restant confiné dans le sous-dossier autorisé]\nLFI_AUDIT: input=documents/2026/rapport.pdf resolved=/documents/2026/rapport.pdf status=SAFE_ACCESS risk=LOW\n\n[Cas 3 — Chemin avec retour relatif interne autorisé ne sortant pas de la racine]\nLFI_AUDIT: input=images/sub/../logo.png resolved=/images/logo.png status=SAFE_ACCESS risk=LOW"
  }
];
