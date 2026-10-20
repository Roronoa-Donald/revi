/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « DevOps B3 ».
 */
'use strict';

const { crumb, cards } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Cartes Flashcards ======================== */

function cartes(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Cartes de révision' }
  ]);

  const modules = chapterList.map(ch => ({
    title: 'Module ' + ch.n + ' — ' + ch.short,
    items: ch.flashcards || []
  }));

  const body = [
    crumbs,
    '  <h1>Cartes de Révision &amp; Mémorisation Active en DevOps B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts clés : Origines Lean &amp; CALMS, Intégration Continue &amp; SemVer, Dockerfile &amp; IaC, Stratégies de Déploiement, Métriques DORA &amp; Résilience, Pratiques SRE &amp; Observabilité.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento des formules' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de DevOps B3 : notions clés et définitions des ' + chapterList.length + ' chapitres.',
      active: 'cartes',
      body
    }
  };
}

/* ======================== Formules & Mémento ======================== */

function formules(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Formules &amp; Mémento' }
  ]);

  const body = [
    crumbs,
    '  <h1>Mémento des Formules, Invariants &amp; Métriques DevOps</h1>',
    '  <p class="lead">Guide de référence opérationnelle : formules d’efficience Lean, calcul des métriques DORA, équations de disponibilité MTBF/MTTR, budgets d’erreur SRE et invariants Docker.</p>',
    '',
    '  <h2>1. Métriques Lean &amp; Efficience de Flux (Flow Efficiency)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:25%">Grandeur</th>',
    '        <th style="width:40%">Formule canonique</th>',
    '        <th style="width:35%">Interprétation opérationnelle</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Lead Time ($LT$)</strong></td>',
    '        <td>$$LT = T_{livraison} - T_{demande}$$</td>',
    '        <td>Temps total écoulé entre l’expression initiale du besoin et sa disponibilité effective en production.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Process Time ($PT$)</strong></td>',
    '        <td>$$PT = \\sum T_{travail\\_actif}$$</td>',
    '        <td>Temps effectif durant lequel de la valeur est activement produite (hors temps d’attente et files de blocage).</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Flow Efficiency ($FE$)</strong></td>',
    '        <td>$$FE = \\frac{PT}{LT} \\times 100\\,\\%$$</td>',
    '        <td>Part du temps utile dans le cycle complet. Dans les organisations traditionnelles en silos, $FE$ est souvent inférieur à 5%.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Loi de Little</strong></td>',
    '        <td>$$WIP = TH \\times CT$$</td>',
    '        <td>Le travail en cours ($WIP$) est égal au débit ($TH$) multiplié par le temps de cycle ($CT$). Réduire le $WIP$ accélère le flux.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Les 4 Métriques DORA (DevOps Research and Assessment)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:25%">Métrique DORA</th>',
    '        <th style="width:25%">Définition / Mesure</th>',
    '        <th style="width:25%">Équipe Élite (High)</th>',
    '        <th style="width:25%">Équipe Faible (Low)</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>Deployment Frequency (DF)</strong></td>',
    '        <td>Fréquence des mises en production réussies</td>',
    '        <td>Multiples déploiements par jour</td>',
    '        <td>Moins d’une fois par mois ou par semestre</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Lead Time for Changes (LTTC)</strong></td>',
    '        <td>Délai entre le commit Git et le déploiement en prod</td>',
    '        <td>Moins d’une heure</td>',
    '        <td>Entre un mois et six mois</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Change Failure Rate (CFR)</strong></td>',
    '        <td>$$\\frac{N_{incidents}}{N_{deploiements}} \\times 100\\,\\%$$</td>',
    '        <td>0% à 5%</td>',
    '        <td>Supérieur à 15% (jusqu’à 45%)</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Mean Time to Restore (MTTR)</strong></td>',
    '        <td>Temps moyen de résolution d’un incident en prod</td>',
    '        <td>Moins d’une heure</td>',
    '        <td>Plusieurs jours ou semaines</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>3. Fiabilité Opérationnelle : MTBF, MTTF &amp; MTTR</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:25%">Indicateur</th>',
    '        <th style="width:40%">Formule mathématique</th>',
    '        <th style="width:35%">Signification</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>MTBF</strong> (Mean Time Between Failures)</td>',
    '        <td>$$MTBF = MTTF + MTTR$$</td>',
    '        <td>Temps moyen moyen entre deux pannes consécutives sur un système réparable.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>MTTF</strong> (Mean Time To Failure)</td>',
    '        <td>$$MTTF = \\frac{T_{total\\_operationnel}}{N_{pannes}}$$</td>',
    '        <td>Temps moyen de fonctionnement continu sans panne du système.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>MTTR</strong> (Mean Time To Repair)</td>',
    '        <td>$$MTTR = \\frac{T_{total\\_indisponibilite}}{N_{pannes}}$$</td>',
    '        <td>Délai moyen nécessaire pour diagnostiquer, corriger et rétablir le service.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Disponibilité intrinsèque ($A$)</strong></td>',
    '        <td>$$A = \\frac{MTBF - MTTR}{MTBF} = \\frac{MTTF}{MTTF + MTTR}$$</td>',
    '        <td>Pourcentage du temps où le système assure son service nominal.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Principes SRE : SLI, SLO &amp; Error Budget</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr>',
    '        <th style="width:25%">Concept SRE</th>',
    '        <th style="width:40%">Formule / Règle</th>',
    '        <th style="width:35%">Exemple pratique</th>',
    '      </tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr>',
    '        <td><strong>SLI</strong> (Service Level Indicator)</td>',
    '        <td>$$SLI = \\frac{\\text{Événements conformes}}{\\text{Total événements}} \\times 100\\,\\%$$</td>',
    '        <td>Taux de requêtes HTTP avec code 2xx/3xx et latence &lt; 200 ms.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>SLO</strong> (Service Level Objective)</td>',
    '        <td>$$SLI \\ge SLO_{\\text{cible}}$$</td>',
    '        <td>Objectif interne : 99.9% de requêtes conformes sur 30 jours glissants.</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Error Budget ($EB$)</strong></td>',
    '        <td>$$EB = 100\\,\\% - SLO$$ (ou en durée : $T_{fenetre} \\times (1 - SLO)$)</td>',
    '        <td>Pour un SLO de 99.9% sur 30 jours (2 592 000 s), le budget vaut 2 592 s (43 min 12 s).</td>',
    '      </tr>',
    '      <tr>',
    '        <td><strong>Burn Rate ($BR$)</strong></td>',
    '        <td>$$BR = \\frac{\\text{Taux de consommation effectif}}{\\text{Taux de consommation nominal}}$$</td>',
    '        <td>$BR = 1$ consomme 100% du budget sur la période. $BR = 14.4$ épuise le budget mensuel en 2 jours.</td>',
    '      </tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>5. Invariants Docker &amp; Ordonnancement des Couches (Layer Caching)</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Règle d’Or de Mise en Cache Docker</h4>',
    '      <p>Ordonner les instructions de la <strong>moins changeante à la plus changeante</strong> :</p>',
    '      <ol>',
    '        <li><code>FROM &lt;base-minimale:tag-fige&gt;</code></li>',
    '        <li><code>RUN apt-get update &amp;&amp; apt-get install -y --no-install-recommends &lt;paquets&gt;</code></li>',
    '        <li><code>COPY package*.json ./</code> ou <code>requirements.txt ./</code></li>',
    '        <li><code>RUN npm ci</code> ou <code>pip install -r requirements.txt</code></li>',
    '        <li><code>COPY . .</code> (code source qui change à chaque commit)</li>',
    '        <li><code>USER nonroot</code> (sécurité moindre privilège)</li>',
    '        <li><code>CMD ["node", "server.js"]</code></li>',
    '      </ol>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Multi-Stage Builds &amp; Surface d’Attaque</h4>',
    '      <p>Séparer l’étape de compilation de l’étape de production :</p>',
    '      <ul>',
    '        <li><strong>Stage 1 (Builder) :</strong> Image lourde avec compilateurs (gcc, node-dev, go, maven). Génère l’artéfact binaire ou minifié.</li>',
    '        <li><strong>Stage 2 (Runtime) :</strong> Image ultra-légère (Alpine, Distroless). Copie uniquement le binaire compilé via <code>COPY --from=builder</code>.</li>',
    '        <li><strong>Bénéfice :</strong> Réduction de la taille de 90% (ex. 1.2 Go &rarr; 45 Mo) et élimination totale des failles CVE liées aux outils de développement.</li>',
    '      </ul>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'cartes.html', label: 'Flashcards de révision' }, { href: 'examens.html', label: 'Passer aux examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento &amp; Formules — ' + course.brand,
      description: 'Mémento opérationnel des métriques et formules du cours DevOps B3 : Lean Flow Efficiency, DORA, MTBF, MTTR, SRE et Docker.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
