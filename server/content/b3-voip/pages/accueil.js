/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Téléphonie VoIP B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('phone') + ' Niveau B3 • VoIP &amp; ToIP d\'Entreprise, Asterisk, SIP, SDP, RTP, Codecs G.711/G.729, Dialplan, QoS &amp; Sécurité</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable ToIP &amp; Python 3</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules d\'ingénierie</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens d\'architecture ToIP</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>La Téléphonie sur IP en Bachelor 3</h2>',
    box('standard', 'De la Numérisation du Signal Vocal aux Architectures IPBX Haute Disponibilité', [
      '<p>En troisième année de Bachelor en Ingénierie des Systèmes et Réseaux, la téléphonie sur IP (ToIP / VoIP) est une composante majeure de l\'infrastructure d\'entreprise. La convergence voix-données exige une maîtrise approfondie des protocoles temps réel, du dimensionnement réseau et de la sécurité des communications unifiées.</p>',
      '<p>Inspiré du support officiel de M. Pape Moussa SONKO (Ingénieur Systèmes et Réseaux) et des normes internationales (IETF, ITU-T), ce cours couvre l\'intégralité des savoir-faire d\'ingénierie : ' +
      'de la numérisation du signal (échantillonnage de Nyquist, lois A-law et µ-law, calcul de bande passante avec en-têtes IP/UDP/RTP et modèle E pour l\'estimation du score MOS), ' +
      'des protocoles de signalisation et de transport média (SIP RFC 3261, négociation de session SDP RFC 4566, paquets RTP/RTCP RFC 3550 et gigue inter-paquets), ' +
      'du déploiement et de l\'administration d\'un IPBX Asterisk (fichiers sip.conf / pjsip.conf, users.conf, boîtes vocales voicemail.conf, codecs, DTMF RFC 2833 et gestion des postes softphones/hardphones), ' +
      'de la programmation avancée du plan d\'appel (extensions.conf, pattern matching _X/_Z/_N, variables système, SVI/IVR interactif et messagerie vocale), ' +
      'de la qualité de service (formule récursive d\'Erlang B pour le dimensionnement de trunks, marquage DSCP EF 46 / CoS 5, Voice VLAN 802.1Q et traversée de NAT STUN/ICE), ' +
      'et enfin des fonctions d\'entreprise et du durcissement sécuritaire (files d\'attente ACD de centre de contacts, routage LCR au moindre coût, trunks IAX2/SIP inter-sites et défense active anti-bruteforce avec Fail2ban).'
    ]),
    '',
    '  <h2>Méthodologie &amp; Outils Pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Ateliers Python 3</span></div>',
    '      <h3>18 Ateliers de Programmation Pratique</h3>',
    '      <p>Chaque module propose 3 exercices interactifs pour coder et simuler en Python 3 : parseurs SIP et SDP, calcul de gigue RTP, dimensionnement Erlang B, matchers de masques Asterisk et routage LCR.</p>',
    '      <a class="btn btn--sm" href="chapitres/exercices.html">' + ic('code') + ' Voir les 18 ateliers</a>',
    '    </div>',
    '    <div class="card">',
    '      <div class="card__head"><span class="badge">Mémorisation Active</span></div>',
    '      <h3>36 Cartes Mémoire &amp; Formulaire</h3>',
    '      <p>Révisez les méthodes SIP, les codes d\'état, les structures de paquets, les formules Erlang B et les directives de configuration Asterisk grâce au système de révision espacée.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">' + ic('cards') + ' Consulter les flashcards</a>',
    '    </div>',
    '  </div>',
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — ' + course.title,
      description: course.lead,
      active: 'index',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const crumbs = crumb(course, [{ label: 'Accueil', href: 'index.html' }, { label: 'Sommaire' }]);

  const modulesHtml = chapterList.map(chapitre => [
    '    <section class="card">',
    '      <div class="card__head">',
    '        <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '        <span class="card__num">Module ' + chapitre.n + '</span>',
    '      </div>',
    '      <h2 class="card__title"><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h2>',
    '      <p class="card__desc">' + chapitre.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '        <a class="btn btn--sm" href="chapitres/chapitre' + chapitre.n + '.html">Accéder au cours ' + ic('arrow-right') + '</a>',
    '      </div>',
    '    </section>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <header class="section-head">',
    '    <h1>Sommaire Général du Cours — ' + course.brand + '</h1>',
    '    <p class="section-head__lead">Parcours complet en 6 modules d\'ingénierie pour maîtriser la ToIP, Asterisk, SIP et les architectures de communication unifiée d\'entreprise.</p>',
    '  </header>',
    '',
    '  <div class="grid">' + modulesHtml + '</div>',
    '',
    '  <h2>Ressources Pédagogiques &amp; Outils d\'Évaluation</h2>',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h3>' + ic('terminal') + ' Atelier de Code</h3>',
    '      <p>Console interactive intégrée avec éditeur Monaco pour tester vos algorithmes de traitement ToIP en Python 3.</p>',
    '      <a class="btn btn--sm" href="atelier.html">Ouvrir l\'atelier</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('cards') + ' Flashcards</h3>',
    '      <p>36 cartes de mémorisation active pour assimiler le vocabulaire, les RFCs, les codecs et les commandes Asterisk.</p>',
    '      <a class="btn btn--sm" href="chapitres/cartes.html">Réviser les cartes</a>',
    '    </div>',
    '    <div class="card">',
    '      <h3>' + ic('graduation') + ' Examens Blancs</h3>',
    '      <p>Contrôle Continu et Examen Final d\'architecture ToIP pour valider vos compétences avant les épreuves réelles.</p>',
    '      <a class="btn btn--sm" href="chapitres/examens.html">Consulter les examens</a>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'index.html', label: 'Retour à l\'accueil' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire du cours — ' + course.brand,
      description: 'Table des matières détaillée des 6 modules de téléphonie VoIP et Asterisk.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const crumbs = crumb(course, [{ label: 'Accueil', href: 'index.html' }, { label: 'Sommaire', href: 'sommaire.html' }, { label: 'Atelier de code' }]);

  const defaultCode = `# Zone libre : simulez vos architectures de téléphonie IP en Python 3
import sys

def simuler_telephonie_ip(commandes):
    """Simule des opérations ToIP : négociation SIP, calcul Erlang B, codecs."""
    resultats = []
    for cmd in commandes:
        cmd_clean = cmd.strip()
        if cmd_clean.startswith("INVITE"):
            resultats.append(f"SIP_RESPONSE: 100 Trying -> 180 Ringing -> 200 OK (Call Established)")
        elif cmd_clean.startswith("ERLANG_B"):
            # Calcul approximatif pour démo
            resultats.append(f"ERLANG_CALC: {cmd_clean} -> Grade of Service: 1.2% (Trunk OK)")
        elif cmd_clean.startswith("CODEC"):
            resultats.append(f"CODEC_INFO: {cmd_clean} -> Bitrate: 64kbps, Payload 20ms: 160B, Packet: 200B (80kbps)")
        else:
            resultats.append(f"VOIP_LOG: {cmd_clean} -> TRAITÉ")
    return resultats

if __name__ == "__main__":
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        lignes = ["INVITE sip:706438029@voip.lan", "CODEC G.711 PCMA", "ERLANG_B TRAFIC=6.0 CANAUX=10"]
    for r in simuler_telephonie_ip(lignes):
        print(r)
`;

  const body = [
    crumbs,
    '  <header class="section-head">',
    '    <h1>Atelier de Code Interactif — Téléphonie VoIP &amp; ToIP</h1>',
    '    <p class="section-head__lead">Expérimentez librement vos algorithmes de calcul de bande passante, d\'analyse de trames SIP/SDP/RTP et de dimensionnement Erlang B en Python 3.</p>',
    '  </header>',
    '',
    '  <div class="lab"',
    '       data-lab',
    '       data-exercise-id="atelier-vo3"',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="INVITE sip:706438029@voip.lan\nCODEC G.711 PCMA\nERLANG_B TRAFIC=6.0 CANAUX=10">',
    '    <script type="text/plain" data-lab-starter>' + defaultCode + '</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Calculateur de Débit &amp; En-têtes Réseau</h4>',
    '      <p>Vérifiez l\'impact de la durée de paquetisation (PTIME 10ms, 20ms, 30ms) sur le débit réseau global avec les en-têtes IP/UDP/RTP de 40 octets.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Parseur d\'En-têtes SIP RFC 3261</h4>',
    '      <p>Extrayez automatiquement Call-ID, CSeq, From, To et Contact à partir d\'un message d\'invitation ou de confirmation 200 OK.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Atelier de code interactif — ' + course.brand,
      description: 'Console interactive Python 3 pour concevoir et tester des algorithmes de téléphonie IP, Asterisk et traitement audio.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
