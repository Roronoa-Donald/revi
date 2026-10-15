/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Hacking Éthique & Pentest B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const cardsHtml = chapterList.map(chapitre => [
    '    <article class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '        <span class="card__num">Module ' + chapitre.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        <span class="card__link">Étudier le module ' + ic('arrow-right') + '</span>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    '  <header class="hero">',
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('shield') + ' Niveau B3 • Hacking Éthique, Tests d\'Intrusion, Reconnaissance OSINT, OWASP Top 10, Exploitation Système &amp; Post-Exploitation</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable Pentest &amp; Python 3</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules d\'ingénierie</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d\'intrusion</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>La Sécurité Offensive et le Pentest en Bachelor 3</h2>',
    box('standard', 'De la Reconnaissance Initiale au Rapport Managérial : La Méthodologie Offensive Professionnelle', [
      '<p>En troisième année de Bachelor en Cybersécurité et Systèmes d’Information, le hacking éthique et les tests d’intrusion (Penetration Testing) constituent un pilier central de l\'expertise technique. Connaître les méthodes, outils et réflexes des attaquants est l\'unique moyen de concevoir des défenses robustes, d\'anticiper les compromissions et d\'évaluer la résilience réelle d\'un système d\'information d\'entreprise.</p>',
      '<p>Conçu en conformité avec le programme académique officiel CEH (Certified Ethical Hacker) et les standards professionnels de l\'industrie (PTES, OWASP WSTG, NIST SP 800-115, MITRE ATT&amp;CK), ce cours propose une formation rigoureuse, méthodique et 100% éthique : ' +
      'du cadre juridique français et international (Code Pénal art. 323-1, directive NIS2, lettre de mission et Rules of Engagement) et de la formalisation des attaques (Cyber Kill Chain, scoring CVSS v3.1/v4.0), ' +
      'des techniques de reconnaissance passive OSINT et active DNS (Shodan, Google Dorking, SPF/DKIM/DMARC, transferts de zone AXFR, fuzzing de sous-domaines et filtrage des wildcards), ' +
      'du balayage réseau et de l\'énumération des services (analyse des sondes TCP SYN/FIN/Null/Xmas selon la RFC 793, fingerprinting Nmap, analyse des bannières réseau et audit de protocoles SMB/SNMP), ' +
      'de l\'exploitation des failles web critiques de l\'OWASP Top 10 (Injections SQL in-band et aveugles basées sur le temps, XSS, CSRF, SSRF, et traversées de répertoires Path Traversal / LFI avec bypass de filtres), ' +
      'de l\'exploitation système et de l\'élévation de privilèges (buffer overflows x86/x64, Metasploit, détection de binaires SUID malveillants GTFOBins, mauvaises configurations sudoers NOPASSWD et pivoting réseau via tunnels SSH et proxies SOCKS), ' +
      'et enfin des mécanismes de post-exploitation, persistance et rédaction professionnelle (détection de web shells obfusqués, reverse shells persistants, analyse anti-forensics, détection SIEM/Sigma et rédaction du rapport d\'intrusion avec synthèse managériale et remédiations priorisées).'
    ]),
    '',
    '  <h2>Ressources et Références Pédagogiques</h2>',
    '  <p class="sources-note">' + ic('book') + ' <strong>Sources de référence :</strong> ' + course.sources + '</p>'
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Accueil & Portail de Formation',
      description: course.description,
      active: 'accueil',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const crumbs = crumb(course, [{ label: 'Accueil', href: 'index.html' }, { label: 'Sommaire' }]);

  const modulesHtml = chapterList.map(chapitre => [
    '  <section class="section">',
    '    <div class="section__head">',
    '      <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '      <span class="badge badge--dark">Module ' + chapitre.n + '</span>',
    '      <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '    </div>',
    '    <h2><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h2>',
    '    <p class="lead">' + chapitre.toc + '</p>',
    '    <ul class="clean-list">',
    '      <li>' + ic('target') + ' <strong>Objectif clé :</strong> ' + chapitre.objectives[0] + '</li>',
    '      <li>' + ic('terminal') + ' <strong>Exercices pratiques :</strong> 3 exercices interactifs de programmation Python 3 corrigés</li>',
    '      <li>' + ic('check') + ' <strong>Auto-évaluation :</strong> 8 questions de QCM avec explications détaillées</li>',
    '    </ul>',
    '    <p><a class="btn btn--primary" href="chapitres/chapitre' + chapitre.n + '.html">Accéder au Module ' + chapitre.n + ' ' + ic('arrow-right') + '</a></p>',
    '  </section>'
  ].join('\n')).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Sommaire Général &amp; Plan d\'Études — ' + course.brand + '</h1>',
    '  <p class="lead">Programme complet du cours d\'Hacking Éthique &amp; Tests d\'Intrusion B3 structuré en 6 modules d\'apprentissage intensif, 18 exercices de code interactifs et 48 QCM d\'évaluation.</p>',
    '',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h4>' + ic('terminal') + ' Bac à sable interactif</h4>',
    '      <p>Testez vos scripts Python de sécurité et vos calculs CVSS/ports dans un éditeur Monaco AMD intégré.</p>',
    '      <p><a class="btn" href="atelier.html">Ouvrir l\'atelier</a></p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('layers') + ' Cartes mémo interactives</h4>',
    '      <p>36 flashcards de mémorisation active sur les commandes, outils, failles et méthodologies offensives.</p>',
    '      <p><a class="btn" href="chapitres/cartes.html">Réviser les cartes</a></p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('file-text') + ' Mémento &amp; Guide</h4>',
    '      <p>Commandes Nmap, formules CVSS v3.1, syntaxes SQLi/LFI, GTFOBins et structure de rapport de pentest.</p>',
    '      <p><a class="btn" href="chapitres/formules.html">Consulter le mémento</a></p>',
    '    </div>',
    '  </div>',
    '',
    modulesHtml,
    '',
    chnav({ href: 'index.html', label: 'Retour à l\'accueil' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire général — ' + course.brand,
      description: 'Plan d\'études détaillé du cours Hacking Éthique & Pentest B3 : 6 modules complets, ateliers de code, QCM et examens.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const crumbs = crumb(course, [{ label: 'Accueil', href: 'index.html' }, { label: 'Sommaire', href: 'sommaire.html' }, { label: 'Atelier de code' }]);

  const defaultCode = [
    '# Atelier de Code Interactif — Hacking Éthique & Pentest B3',
    '# Simulation d\'audit automatisé de sécurité et calcul de score CVSS v3.1',
    '',
    'def calculer_cvss_v31(av, ac, pr, ui, c, i, a):',
    '    av_map = {"N": 0.85, "A": 0.62, "L": 0.55, "P": 0.20}',
    '    ac_map = {"L": 0.77, "H": 0.44}',
    '    pr_map = {"N": 0.85, "L": 0.62, "H": 0.27}',
    '    ui_map = {"N": 0.85, "R": 0.62}',
    '    cia_map = {"N": 0.0, "L": 0.22, "H": 0.56}',
    '',
    '    exploitability = 8.22 * av_map[av] * ac_map[ac] * pr_map[pr] * ui_map[ui]',
    '    iss = 1.0 - ((1.0 - cia_map[c]) * (1.0 - cia_map[i]) * (1.0 - cia_map[a]))',
    '    impact = 6.42 * iss',
    '',
    '    if impact <= 0.0:',
    '        base_score = 0.0',
    '    else:',
    '        import math',
    '        base_score = min(10.0, math.ceil(round(impact + exploitability, 4) * 10.0) / 10.0)',
    '',
    '    sev = "CRITICAL" if base_score >= 9.0 else ("HIGH" if base_score >= 7.0 else ("MEDIUM" if base_score >= 4.0 else "LOW"))',
    '    return exploitability, impact, base_score, sev',
    '',
    '# Test avec une faille RCE critique à distance non-authentifiée (ex: Log4Shell)',
    'exp, imp, score, severity = calculer_cvss_v31("N", "L", "N", "N", "H", "H", "H")',
    'print(f"=== Évaluation CVSS v3.1 ===")',
    'print(f"Sous-score Exploitabilité : {exp:.2f}")',
    'print(f"Sous-score Impact          : {imp:.2f}")',
    'print(f"Base Score CVSS v3.1       : {score:.1f} / 10.0")',
    'print(f"Niveau de sévérité         : {severity}")',
    ''
  ].join('\n');

  const body = [
    crumbs,
    '  <h1>Atelier de Code Interactif — Hacking Éthique &amp; Pentest B3</h1>',
    '  <p class="lead">Bac à sable d\'expérimentation en Python 3 pour prototyper vos outils offensifs et défensifs : analyseurs d\'en-têtes HTTP, calculateurs de scores CVSS v3.1, filtres de sous-domaines, parsers de paquets TCP et détecteurs de vulnérabilités OWASP.</p>',
    '',
    '  <div class="lab"',
    '       data-lab',
    '       data-exercise-id="atelier-hk3"',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="CVSS_CALC AV=N AC=L PR=N UI=N C=H I=H A=H">',
    '    <script type="text/plain" data-lab-starter>' + defaultCode + '</script>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Consulter le sommaire' }, { href: 'chapitres/chapitre1.html', label: 'Accéder au Module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code interactif — ' + course.brand,
      description: 'Console interactive Python 3 pour concevoir et tester des scripts de sécurité offensive, audit de vulnérabilités et parsing réseau.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
