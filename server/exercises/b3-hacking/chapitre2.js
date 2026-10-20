'use strict';

module.exports = [
  {
    "id": "hk3-c2-e1",
    "chapter": 2,
    "title": "Analyseur d'En-têtes HTTP de Sécurité et Détection de Fuite d'Information",
    "level": "n1",
    "language": "analyse",
    "goal": "Auditer les en-têtes HTTP de sécurité d'un serveur et détecter la divulgation de bannières technologiques.",
    "brief": "<p>La reconnaissance passive d'une cible web commence par l'analyse des en-têtes HTTP renvoyés.<br><br>\nRègles d'évaluation (Score initial = 100) :<br>\n- <code>Strict-Transport-Security</code> (HSTS) : requis. Si absent : -30 points et problème <code>MISSING_HSTS</code>.<br>\n- <code>Content-Security-Policy</code> (CSP) : requis. Si absent : -35 points et problème <code>MISSING_CSP</code>.<br>\n- <code>X-Frame-Options</code> : requis (valeur <code>DENY</code> ou <code>SAMEORIGIN</code>). Si absent ou valeur incorrecte : -20 points et problème <code>MISSING_X_FRAME_OPTIONS</code>.<br>\n- <code>Server</code> ou <code>X-Powered-By</code> : divulguent la pile technologique. Si au moins l'un est présent : -15 points et problème <code>INFO_DISCLOSURE</code>.<br><br>\nAttribution du grade :<br>\n- Score 100 : Grade <code>A</code><br>\n- Score 70 à 99 : Grade <code>B</code><br>\n- Score 50 à 69 : Grade <code>C</code><br>\n- Score &lt; 50 : Grade <code>F</code><br><br>\nEntrée STDIN : <code>AUDIT_HEADERS headers=&lt;H1:V1;H2:V2;...&gt;</code>.<br>\nSortie : <code>HTTP_AUDIT: score=&lt;score&gt;/100 grade=&lt;grade&gt; issues=&lt;issue1,issue2,...|NONE&gt;</code> (problèmes séparés par des virgules dans l'ordre HSTS, CSP, XFO, INFO).</p>",
    "starter": "# Grille d'analyse (hk3-c2-e1) — Analyseur d'En-têtes HTTP de Sécurité et Détection de Fuite d'Information\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Serveur exposant sa version Apache sans CSP ni HSTS]\n# Données : AUDIT_HEADERS headers=Server:Apache/2.4.41 (Ubuntu);X-Frame-Options:SAMEORIGIN\nA_COMPLETER\n\n[Cas 2 — Serveur moderne sécurisé avec fuite d'en-tête PHP X-Powered-By]\n# Données : AUDIT_HEADERS headers=Strict-Transport-Security:max-age=63072000;Content-Security-Policy:default-src self;X-Frame-Options:DENY;X-Powered-By:PHP/8.2.1\nA_COMPLETER\n\n[Cas 3 — En-têtes quasi vides révélant vulnérabilité au Clickjacking]\n# Données : AUDIT_HEADERS headers=Content-Type:text/html\nA_COMPLETER\n",
    "hints": [
      "Normalisez les noms d'en-têtes en minuscules pour faciliter les comparaisons insensibles à la casse.",
      "Vérifiez la présence de strict-transport-security, content-security-policy et x-frame-options.",
      "Si server ou x-powered-by est dans les en-têtes, ajoutez INFO_DISCLOSURE."
    ],
    "examples": [
      {
        "stdin": "AUDIT_HEADERS headers=Strict-Transport-Security:max-age=31536000;Content-Security-Policy:default-src https:;X-Frame-Options:DENY",
        "expected": "HTTP_AUDIT: score=100/100 grade=A issues=NONE",
        "note": "Tous les en-têtes de sécurité recommandés sont présents sans fuite de version."
      }
    ],
    "tests": [
      {
        "label": "Serveur exposant sa version Apache sans CSP ni HSTS",
        "stdin": "cas:1",
        "expected": "HTTP_AUDIT: score=20/100 grade=F issues=MISSING_HSTS,MISSING_CSP,INFO_DISCLOSURE"
      },
      {
        "label": "Serveur moderne sécurisé avec fuite d'en-tête PHP X-Powered-By",
        "stdin": "cas:2",
        "expected": "HTTP_AUDIT: score=85/100 grade=B issues=INFO_DISCLOSURE"
      },
      {
        "label": "En-têtes quasi vides révélant vulnérabilité au Clickjacking",
        "stdin": "cas:3",
        "expected": "HTTP_AUDIT: score=15/100 grade=F issues=MISSING_HSTS,MISSING_CSP,MISSING_X_FRAME_OPTIONS"
      }
    ],
    "solution": "[Exemple]\nHTTP_AUDIT: score=100/100 grade=A issues=NONE\n\n[Cas 1 — Serveur exposant sa version Apache sans CSP ni HSTS]\nHTTP_AUDIT: score=20/100 grade=F issues=MISSING_HSTS,MISSING_CSP,INFO_DISCLOSURE\n\n[Cas 2 — Serveur moderne sécurisé avec fuite d'en-tête PHP X-Powered-By]\nHTTP_AUDIT: score=85/100 grade=B issues=INFO_DISCLOSURE\n\n[Cas 3 — En-têtes quasi vides révélant vulnérabilité au Clickjacking]\nHTTP_AUDIT: score=15/100 grade=F issues=MISSING_HSTS,MISSING_CSP,MISSING_X_FRAME_OPTIONS"
  },
  {
    "id": "hk3-c2-e2",
    "chapter": 2,
    "title": "Extracteur et Filtre d'Empreintes DNS (SPF, DMARC & AXFR)",
    "level": "n2",
    "language": "analyse",
    "goal": "Analyser les enregistrements DNS d'un domaine pour détecter les risques d'usurpation d'email et de fuite par transfert de zone.",
    "brief": "<p>L'énumération DNS révèle les mécanismes de protection contre l'usurpation (Spoofing) et les mauvaises configurations de serveurs de noms.<br><br>\nRègles d'audit :<br>\n1. <code>AXFR (Zone Transfer)</code> :<br>\n   - Si <code>axfr_status == ALLOWED</code> : <code>axfr=VULNERABLE_LEAK</code>, risque immédiat <code>CRITICAL</code>.<br>\n   - Si <code>axfr_status == REFUSED</code> : <code>axfr=SECURE</code>.<br>\n2. <code>SPF (Sender Policy Framework)</code> :<br>\n   - Chercher un enregistrement TXT débutant par <code>v=spf1</code>.<br>\n   - Si absent : <code>spf=MISSING</code>.<br>\n   - Si se termine par <code>+all</code> ou <code>?all</code> : <code>spf=PERMISSIVE</code>.<br>\n   - Si se termine par <code>~all</code> : <code>spf=SOFTFAIL</code>.<br>\n   - Si se termine par <code>-all</code> : <code>spf=HARDFAIL_SECURE</code>.<br>\n3. <code>DMARC</code> :<br>\n   - Chercher un enregistrement TXT débutant par <code>v=DMARC1</code>.<br>\n   - Si absent : <code>dmarc=MISSING</code>.<br>\n   - Si contient <code>p=none</code> : <code>dmarc=POLICY_NONE</code>.<br>\n   - Si contient <code>p=quarantine</code> ou <code>p=reject</code> : <code>dmarc=ENFORCED_SECURE</code>.<br><br>\nÉvaluation du niveau de risque global :<br>\n- <code>CRITICAL</code> : si <code>axfr == VULNERABLE_LEAK</code>.<br>\n- <code>HIGH</code> : sinon, si <code>spf in ('MISSING', 'PERMISSIVE')</code> et <code>dmarc in ('MISSING', 'POLICY_NONE')</code>.<br>\n- <code>MEDIUM</code> : sinon, si <code>spf == 'SOFTFAIL'</code> ou <code>dmarc in ('MISSING', 'POLICY_NONE')</code>.<br>\n- <code>LOW</code> : sinon (SPF HARDFAIL_SECURE et DMARC ENFORCED_SECURE avec AXFR SECURE).<br><br>\nEntrée STDIN : <code>DNS_AUDIT domain=&lt;dom&gt; axfr=&lt;ALLOWED|REFUSED&gt; records=&lt;r1;r2;...&gt;</code>.<br>\nSortie : <code>DNS_REPORT: domain=&lt;dom&gt; spf=&lt;s&gt; dmarc=&lt;d&gt; axfr=&lt;a&gt; risk=&lt;r&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c2-e2) — Extracteur et Filtre d'Empreintes DNS (SPF, DMARC & AXFR)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Fuite critique de l'ensemble de la zone DNS via AXFR autorisé]\n# Données : DNS_AUDIT domain=vuln-bank.com axfr=ALLOWED records=v=spf1 -all;v=DMARC1; p=reject\nA_COMPLETER\n\n[Cas 2 — Risque élevé d'usurpation avec absence totale de SPF et DMARC]\n# Données : DNS_AUDIT domain=legacy-shop.org axfr=REFUSED records=google-site-verification=xyz\nA_COMPLETER\n\n[Cas 3 — Risque moyen avec politique DMARC en simple surveillance (p=none)]\n# Données : DNS_AUDIT domain=startup.io axfr=REFUSED records=v=spf1 include:_spf.google.com ~all;v=DMARC1; p=none; rua=mailto:reports@startup.io\nA_COMPLETER\n",
    "hints": [
      "Isolez les enregistrements contenant v=spf1 et v=DMARC1.",
      "Vérifiez la terminaison du SPF (+all, ?all, ~all, -all).",
      "Appliquez la hiérarchie de risque CRITICAL -> HIGH -> MEDIUM -> LOW."
    ],
    "examples": [
      {
        "stdin": "DNS_AUDIT domain=target-corp.fr axfr=REFUSED records=v=spf1 mx ip4:192.168.1.1 -all;v=DMARC1; p=reject; rua=mailto:dmarc@target-corp.fr",
        "expected": "DNS_REPORT: domain=target-corp.fr spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=SECURE risk=LOW",
        "note": "Domaine parfaitement protégé contre l'usurpation et le transfert de zone."
      }
    ],
    "tests": [
      {
        "label": "Fuite critique de l'ensemble de la zone DNS via AXFR autorisé",
        "stdin": "cas:1",
        "expected": "DNS_REPORT: domain=vuln-bank.com spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=VULNERABLE_LEAK risk=CRITICAL"
      },
      {
        "label": "Risque élevé d'usurpation avec absence totale de SPF et DMARC",
        "stdin": "cas:2",
        "expected": "DNS_REPORT: domain=legacy-shop.org spf=MISSING dmarc=MISSING axfr=SECURE risk=HIGH"
      },
      {
        "label": "Risque moyen avec politique DMARC en simple surveillance (p=none)",
        "stdin": "cas:3",
        "expected": "DNS_REPORT: domain=startup.io spf=SOFTFAIL dmarc=POLICY_NONE axfr=SECURE risk=MEDIUM"
      }
    ],
    "solution": "[Exemple]\nDNS_REPORT: domain=target-corp.fr spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=SECURE risk=LOW\n\n[Cas 1 — Fuite critique de l'ensemble de la zone DNS via AXFR autorisé]\nDNS_REPORT: domain=vuln-bank.com spf=HARDFAIL_SECURE dmarc=ENFORCED_SECURE axfr=VULNERABLE_LEAK risk=CRITICAL\n\n[Cas 2 — Risque élevé d'usurpation avec absence totale de SPF et DMARC]\nDNS_REPORT: domain=legacy-shop.org spf=MISSING dmarc=MISSING axfr=SECURE risk=HIGH\n\n[Cas 3 — Risque moyen avec politique DMARC en simple surveillance (p=none)]\nDNS_REPORT: domain=startup.io spf=SOFTFAIL dmarc=POLICY_NONE axfr=SECURE risk=MEDIUM"
  },
  {
    "id": "hk3-c2-e3",
    "chapter": 2,
    "title": "Moteur de Découverte de Sous-Domaines par Fuzzing et Filtrage Wildcard",
    "level": "n3",
    "language": "analyse",
    "goal": "Identifier les sous-domaines légitimes actifs en éliminant les faux positifs causés par les DNS wildcards.",
    "brief": "<p>Lors de l'énumération par dictionnaire (subdomain brute-forcing), une réponse wildcard DNS redirige tous les sous-domaines inexistants vers une IP par défaut, générant des milliers de faux positifs.<br><br>\nAlgorithme de filtrage :<br>\n1. Si <code>wildcard_ip != 'NONE'</code>, toute entrée dont l'IP correspond à <code>wildcard_ip</code> est classée comme faux positif wildcard.<br>\n2. Les entrées dont l'IP diffère de <code>wildcard_ip</code> sont des sous-domaines actifs validés.<br>\n3. Les sous-domaines valides sont ordonnés alphabétiquement sous la forme <code>&lt;sub&gt;.&lt;domain&gt;</code>.<br><br>\nEntrée STDIN : <code>SUBDOMAIN_FUZZ domain=&lt;dom&gt; wildcard_ip=&lt;ip|NONE&gt; responses=&lt;sub1:ip1,sub2:ip2,...&gt;</code>.<br>\nSortie :<br>\n<code>SUBDOMAINS: domain=&lt;dom&gt; total_scanned=&lt;N&gt; wildcards_filtered=&lt;W&gt; valid_found=&lt;V&gt; active=&lt;s1.dom,s2.dom|NONE&gt;</code>.</p>",
    "starter": "# Grille d'analyse (hk3-c2-e3) — Moteur de Découverte de Sous-Domaines par Fuzzing et Filtrage Wildcard\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Aucun wildcard configuré sur le domaine cible]\n# Données : SUBDOMAIN_FUZZ domain=corp.org wildcard_ip=NONE responses=vpn:10.0.0.1,api:10.0.0.2\nA_COMPLETER\n\n[Cas 2 — Toutes les réponses sont des faux positifs vers le wildcard]\n# Données : SUBDOMAIN_FUZZ domain=wildcard-all.net wildcard_ip=172.16.0.50 responses=a:172.16.0.50,b:172.16.0.50,c:172.16.0.50\nA_COMPLETER\n\n[Cas 3 — Multiples sous-domaines valides ordonnés alphabétiquement]\n# Données : SUBDOMAIN_FUZZ domain=cloud.dev wildcard_ip=1.1.1.1 responses=gitlab:10.1.1.5,bogus:1.1.1.1,auth:10.1.1.2,monitor:10.1.1.9\nA_COMPLETER\n",
    "hints": [
      "Parcourez chaque couple sub:ip dans responses.",
      "Si wildcard_ip != \"NONE\" et ip == wildcard_ip, incrémentez wildcards_filtered.",
      "Triez la liste des sous-domaines valides alphabétiquement avant l'affichage."
    ],
    "examples": [
      {
        "stdin": "SUBDOMAIN_FUZZ domain=example.com wildcard_ip=192.168.1.100 responses=admin:192.168.1.5,fake99:192.168.1.100,mail:192.168.1.6,testabc:192.168.1.100",
        "expected": "SUBDOMAINS: domain=example.com total_scanned=4 wildcards_filtered=2 valid_found=2 active=admin.example.com,mail.example.com",
        "note": "Les deux sous-domaines aléatoires pointant vers l'IP wildcard sont éliminés."
      }
    ],
    "tests": [
      {
        "label": "Aucun wildcard configuré sur le domaine cible",
        "stdin": "cas:1",
        "expected": "SUBDOMAINS: domain=corp.org total_scanned=2 wildcards_filtered=0 valid_found=2 active=api.corp.org,vpn.corp.org"
      },
      {
        "label": "Toutes les réponses sont des faux positifs vers le wildcard",
        "stdin": "cas:2",
        "expected": "SUBDOMAINS: domain=wildcard-all.net total_scanned=3 wildcards_filtered=3 valid_found=0 active=NONE"
      },
      {
        "label": "Multiples sous-domaines valides ordonnés alphabétiquement",
        "stdin": "cas:3",
        "expected": "SUBDOMAINS: domain=cloud.dev total_scanned=4 wildcards_filtered=1 valid_found=3 active=auth.cloud.dev,gitlab.cloud.dev,monitor.cloud.dev"
      }
    ],
    "solution": "[Exemple]\nSUBDOMAINS: domain=example.com total_scanned=4 wildcards_filtered=2 valid_found=2 active=admin.example.com,mail.example.com\n\n[Cas 1 — Aucun wildcard configuré sur le domaine cible]\nSUBDOMAINS: domain=corp.org total_scanned=2 wildcards_filtered=0 valid_found=2 active=api.corp.org,vpn.corp.org\n\n[Cas 2 — Toutes les réponses sont des faux positifs vers le wildcard]\nSUBDOMAINS: domain=wildcard-all.net total_scanned=3 wildcards_filtered=3 valid_found=0 active=NONE\n\n[Cas 3 — Multiples sous-domaines valides ordonnés alphabétiquement]\nSUBDOMAINS: domain=cloud.dev total_scanned=4 wildcards_filtered=1 valid_found=3 active=auth.cloud.dev,gitlab.cloud.dev,monitor.cloud.dev"
  }
];
