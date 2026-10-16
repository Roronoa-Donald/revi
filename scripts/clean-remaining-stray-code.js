'use strict';

const fs = require('fs');

console.log('=== Nettoyage final des 7 fichiers résiduels ===');

// 1. assembleur/pages/accueil.js
const assPath = 'server/content/assembleur/pages/accueil.js';
if (fs.existsSync(assPath)) {
  let content = fs.readFileSync(assPath, 'utf8');
  content = content.replace(
    /const starter = \[[\s\S]*?\]\.join\('\\n'\);/,
    `const starter = [
    '# Grille d\\'analyse libre — Assembleur & Architecture',
    '# Zone d’étude : état des registres, drapeaux et pile',
    '#',
    '[Cas 1 — Décomposition registre EAX]',
    '# Registre 32 bits : 0x12345678',
    'EAX: 0x12345678 AX: 0x5678 AH: 0x56 AL: 0x78',
    'CONCLUSION: Décomposition canonique des sous-registres x86 valide.'
  ].join('\\n');`
  );
  fs.writeFileSync(assPath, content, 'utf8');
  console.log('[ok] assembleur/pages/accueil.js nettoyé');
}

// 2. b1-robotique/pages.js
const roboPath = 'server/content/b1-robotique/pages.js';
if (fs.existsSync(roboPath)) {
  let rContent = fs.readFileSync(roboPath, 'utf8');
  rContent = rContent.replace(/Les programmes sont en Python, comme aux ateliers\./g, 'Chaque exercice propose une étude technique pas à pas.');
  rContent = rContent.replace(/function exercices\(course\) \{[\s\S]*?return \{\s*'exercices\/exercices\.html': \{[\s\S]*?\}\s*\};\s*\}/,
`function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; résolutions détaillées</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet intégrateur</h1>',
    '  <p class="lead">De la pratique graduée pour consolider chaque module, puis un dossier intégrateur d’ingénierie robotique.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Identifier les capteurs proprioceptifs et extéroceptifs d’un robot mobile.',
      'Calculer la résolution angulaire d’un encodeur optique incrémental de 1024 impulsions par tour.',
      'Distinguer boucle ouverte et boucle fermée dans une commande d’actionneur.',
      'Calculer la vitesse linéaire d’un robot à roues différentielles de rayon $R = 5\\text{ cm}$ tournant à $\\omega = 10\\text{ rad/s}$.'
    ], [
      '<p><strong>1. Capteurs :</strong> Proprioceptifs (encodeurs, centrale inertielle) vs Extéroceptifs (LiDAR, ultrasons, caméras).</p>',
      '<p><strong>2. Résolution :</strong> $\\Delta \\theta = \\frac{360^\\circ}{1024} \\approx 0{,}3516^\\circ$ par impulsion.</p>',
      '<p><strong>3. Boucle :</strong> La boucle fermée utilise un retour capteur pour corriger l’écart de consigne (asservissement).</p>',
      '<p><strong>4. Vitesse :</strong> $v = R \\cdot \\omega = 0{,}05 \\times 10 = 0{,}5\\text{ m/s}$.</p>'
    ].join('\\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Établir la machine à états finis (FSM) d’un robot éviteur d’obstacles.',
      'Calculer l’erreur statique d’un asservissement proportionnel (gain $K_p$).',
      'Dimensionner le couple moteur nécessaire pour déplacer une masse de $5\\text{ kg}$ sur une pente de $15^\\circ$.',
      'Interpréter les signaux PWM de commande d’un servomoteur standard ($1\\text{ ms}$ à $2\\text{ ms}$).'
    ], [
      '<p><strong>1. Machine à états :</strong> États {AVANCER, ARRET, PIVOTER_DROITE} régis par le seuil de distance de sécurité $d < d_{\\min}$.</p>',
      '<p><strong>2. Erreur statique :</strong> Dépend de la classe du système ; l’ajout d’un terme intégral ($K_i$) annule l’erreur statique en régime permanent.</p>',
      '<p><strong>3. Couple :</strong> $C = F \\cdot R = (m g \\sin 15^\\circ) \\cdot R = 5 \\times 9{,}81 \\times 0{,}2588 \\times 0{,}05 \\approx 0{,}635\\text{ N}\\cdot\\text{m}$.</p>',
      '<p><strong>4. PWM :</strong> Période $20\\text{ ms}$ (50 Hz), largeur d’impulsion $1\\text{ ms} \\to -90^\\circ$, $1{,}5\\text{ ms} \\to 0^\\circ$, $2\\text{ ms} \\to +90^\\circ$.</p>'
    ].join('\\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Écrire le modèle géométrique direct (MGD) d’un bras manipulateur planaire à 2 degrés de liberté.',
      'Analyser les configurations singulières où le bras perd un degré de mobilité.',
      'Régler les gains d’un correcteur PID par la méthode de Ziegler-Nichols.',
      'Concevoir une architecture de navigation sécurisée avec arrêt d’urgence matériel.'
    ], [
      '<p><strong>1. MGD 2 DDL :</strong> $x = L_1 \\cos \\theta_1 + L_2 \\cos(\\theta_1 + \\theta_2)$ et $y = L_1 \\sin \\theta_1 + L_2 \\sin(\\theta_1 + \\theta_2)$.</p>',
      '<p><strong>2. Singularités :</strong> Surviennent quand $\\sin \\theta_2 = 0$ (bras complètement tendu ou replié sur lui-même).</p>',
      '<p><strong>3. PID Ziegler-Nichols :</strong> Détermination du gain critique $K_u$ et de la période d’oscillation $T_u$, puis calcul des coefficients $K_p, T_i, T_d$.</p>',
      '<p><strong>4. Sécurité :</strong> Relais de sécurité à guidage forcé, coupure directe de l’alimentation de puissance des actionneurs (STO - Safe Torque Off).</p>'
    ].join('\\n')),

    '  <h2>Projet intégrateur — Dossier d’Ingénierie &amp; Conception Mécatronique</h2>',
    box('situation', 'Cahier des charges du Dossier', 'play', [
      '    <p>Ce dossier d’étude robotique approfondie consiste à modéliser un système mécatronique complet : chaîne cinématique, dimensionnement énergétique, chaîne d’acquisition des capteurs et synthèse des lois de commande en boucle fermée.</p>'
    ].join('\\n')),
    box('objectifs', 'Compétences évaluées', 'target', [
      '    <ol>',
      '      <li><strong>Modélisation cinématique :</strong> Établissement des équations de mouvement directes et inverses.</li>',
      '      <li><strong>Dimensionnement actionneurs :</strong> Bilan des puissances, couples d’accélération et inerties rotoriques.</li>',
      '      <li><strong>Asservissement numérique :</strong> Synthèse d’un régulateur PID échantillonné.</li>',
      '      <li><strong>Sûreté de fonctionnement :</strong> Analyse des modes de défaillance (AMDEC) et dispositifs de protection.</li>',
      '    </ol>'
    ].join('\\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course, 'Exercices construits à partir du programme officiel de robotique et mécatronique B1.')
  ].join('\\n\\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; dossier intégrateur — ' + course.brand,
      description: 'Exercices supplémentaires et dossier intégrateur du cours de robotique B1 : cinématique, asservissement et mécatronique.',
      active: 'exercices',
      body
    }
  };
}`);
  fs.writeFileSync(roboPath, rContent, 'utf8');
  console.log('[ok] b1-robotique/pages.js nettoyé');
}

// 3. b3-cloud-aws/pages/accueil.js
const awsPath = 'server/content/b3-cloud-aws/pages/accueil.js';
if (fs.existsSync(awsPath)) {
  let a = fs.readFileSync(awsPath, 'utf8');
  a = a.replace(/const defaultCode = `[\s\S]*?`;/,
`const defaultCode = \`# Grille d’analyse libre — Architecture Cloud AWS
# Évaluation de la résilience, du coût et de la conformité Well-Architected

[Cas 1 — Dimensionnement Multi-AZ & Sécurité]
ARCHITECTURE: Multi-AZ avec ALB et Auto Scaling
CONFORMITE_VPC: 2 sous-réseaux publics, 2 sous-réseaux privés
RESILIENCE: Tolérance à la perte d'un datacenter complet
NOTE: Architecture hautement disponible et conforme aux bonnes pratiques AWS.
\`;`);
  fs.writeFileSync(awsPath, a, 'utf8');
  console.log('[ok] b3-cloud-aws/pages/accueil.js nettoyé');
}

// 4. b3-hacking/pages/accueil.js
const hkPath = 'server/content/b3-hacking/pages/accueil.js';
if (fs.existsSync(hkPath)) {
  let h = fs.readFileSync(hkPath, 'utf8');
  h = h.replace(/const defaultCode = \[[\s\S]*?\]\.join\('\\n'\);/,
`const defaultCode = [
    '# Grille d\\'analyse libre — Hacking Éthique & Pentest',
    '# Évaluation de vulnérabilités et notation CVSS v3.1',
    '#',
    '[Cas 1 — Audit d\\'injection RCE non-authentifiée]',
    'VECTEUR_ATTAQUE: Network (AV:N)',
    'COMPLEXITE: Low (AC:L)',
    'PRIVILEGES_REQUIS: None (PR:N)',
    'INTERACTION_UTILISATEUR: None (UI:N)',
    'IMPACT_CONFIDENTIALITE: High (C:H)',
    'IMPACT_INTEGRITE: High (I:H)',
    'IMPACT_DISPONIBILITE: High (A:H)',
    'SCORE_BASE_CVSS: 9.8 (CRITICAL)',
    'RECOMMANDATION_URGENTE: Déploiement immédiat du correctif de sécurité et segmentation réseau.'
  ].join('\\n');`);
  fs.writeFileSync(hkPath, h, 'utf8');
  console.log('[ok] b3-hacking/pages/accueil.js nettoyé');
}

// 5. b3-supervision/pages/accueil.js
const supPath = 'server/content/b3-supervision/pages/accueil.js';
if (fs.existsSync(supPath)) {
  let s = fs.readFileSync(supPath, 'utf8');
  s = s.replace(/const defaultCode = `[\s\S]*?`;/,
`const defaultCode = \`# Grille d’analyse libre — Supervision Réseau & Systèmes
# Métriques SNMP, sondes de disponibilité et seuils d'alerte

[Cas 1 — Surveillance d'infrastructure de production]
METRIQUE_CPU: 88% (SEUIL_ALERTE: 85%)
STATUT_SONDE: WARNING
ACTION_AUTOMATISEE: Déclenchement d'un ticket d'incident et notification astreinte
NOTE: Supervision proactive des équipements critiques opérationnelle.
\`;`);
  fs.writeFileSync(supPath, s, 'utf8');
  console.log('[ok] b3-supervision/pages/accueil.js nettoyé');
}

// 6. b3-virtualisation/pages/accueil.js
const vrtPath = 'server/content/b3-virtualisation/pages/accueil.js';
if (fs.existsSync(vrtPath)) {
  let v = fs.readFileSync(vrtPath, 'utf8');
  v = v.replace(/const defaultCode = `[\s\S]*?`;/,
`const defaultCode = \`# Grille d’analyse libre — Virtualisation Avancée & Hyperviseurs
# Dimensionnement de grappes vSphere / KVM et surallocation CPU/RAM

[Cas 1 — Dimensionnement de cluster HA]
NOEUDS_PHYSIQUES: 3 hôtes ESXi (64 cœurs, 512 Go RAM chacun)
POLITIQUE_HA: Tolérance à la panne de N=1 hôte
CAPACITE_RESERVE: 33% CPU et RAM garantis pour bascule instantanée
NOTE: Architecture de virtualisation haute disponibilité validée.
\`;`);
  fs.writeFileSync(vrtPath, v, 'utf8');
  console.log('[ok] b3-virtualisation/pages/accueil.js nettoyé');
}

// 7. b3-voip/pages/accueil.js
const voipPath = 'server/content/b3-voip/pages/accueil.js';
if (fs.existsSync(voipPath)) {
  let vp = fs.readFileSync(voipPath, 'utf8');
  vp = vp.replace(/const defaultCode = `[\s\S]*?`;/,
`const defaultCode = \`# Grille d’analyse libre — Téléphonie IP & Protocoles SIP
# Analyse de flux VoIP, calcul de bande passante et codec G.711 / G.729

[Cas 1 — Dimensionnement de trunk SIP]
APPELS_SIMULTANES: 30
CODEC: G.711a (87.2 kbps par canal avec en-têtes IP/UDP/RTP)
BANDE_PASSANTE_REQUISE: 2.62 Mbps symétriques réservés en QoS EF
NOTE: Dimensionnement de bande passante VoIP conforme aux normes ITU.
\`;`);
  fs.writeFileSync(voipPath, vp, 'utf8');
  console.log('[ok] b3-voip/pages/accueil.js nettoyé');
}

console.log('=== Tous les 7 fichiers résiduels ont été assainis ===');
