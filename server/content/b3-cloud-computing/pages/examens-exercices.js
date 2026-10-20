/**
 * Pages « examens » et « exercices » du cours « Cloud Computing B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées de Cloud Computing B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences professionnelles et académiques de niveau Bachelor 3 / Licence 3.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Modèles NIST, Typologies de Services, SLA &amp; Virtualisation', [
      '<h4>Partie 1 : Définition NIST &amp; Modèles de Service (6 points)</h4>',
      '<ol>',
      '  <li>Énoncez les 5 caractéristiques essentielles du Cloud Computing selon le standard NIST SP 800-145 et expliquez pourquoi un simple hébergement dédié sur Internet ne constitue pas du Cloud. (3 pts)</li>',
      '  <li>Comparez les modèles IaaS, PaaS et SaaS du point de vue de la maintenance du système d’exploitation (patching de sécurité de l’OS) et de la gouvernance des données. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Haute Disponibilité &amp; Calcul de SLA Composé (7 points)</h4>',
      '<p>Une entreprise conçoit une architecture e-commerce sur un cloud public composée de :</p>',
      '<ul>',
      '  <li>Un équilibreur de charge réseau certifié à un SLA de 99.99% ;</li>',
      '  <li>Un groupe de 2 serveurs web déployés en parallèle sur deux zones de disponibilité distinctes (AZ), chacun ayant un SLA unitaire de 99.9% ;</li>',
      '  <li>Une base de données relationnelle managée multi-AZ certifiée à un SLA de 99.95%.</li>',
      '</ul>',
      '<ol>',
      '  <li>Calculez la disponibilité globale résultante ($SLA_{total}$) de l’ensemble de la chaîne applicative. (4 pts)</li>',
      '  <li>Convertissez ce résultat en temps d’indisponibilité annuel maximal prévisionnel en minutes (sur une base de 365 jours = 525 600 minutes). (3 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Virtualisation, Hyperviseurs &amp; Sur-Allocation (7 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément un hyperviseur de Type 1 (Bare-Metal) d’un hyperviseur de Type 2 (Hosted). Pourquoi les centres de données de production utilisent-ils exclusivement le Type 1 ? (3 pts)</li>',
      '  <li>Un serveur physique dispose de 32 cœurs CPU et 128 Go de RAM. Vous devez héberger 12 machines virtuelles consommant chacune 4 vCPU et 12 Go de RAM. Calculez les ratios de sur-allocation vCPU:pCPU et RAM. Cette configuration est-elle admissible selon les règles de l’art ? Justifiez. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Caractéristiques NIST (3 pts) :</strong> Les 5 critères obligatoires sont : On-Demand Self-Service, Broad Network Access, Resource Pooling, Rapid Elasticity, Measured Service. Un hébergement dédié traditionnel ne dispose généralement pas d’APIs de provisionnement automatique en libre-service à la seconde, ni d’élasticité dynamique instantanée, ni de mutualisation de ressources sous-jacente.</li>',
      '  <li><strong>Modèles de service &amp; Patching (3 pts) :</strong> En IaaS, le client a la responsabilité exclusive de patcher l’OS invité. En PaaS et SaaS, le CSP prend en charge le patch de l’OS et de l’infrastructure sous-jacente. Pour les données, le client en reste légalement et techniquement responsable dans TOUS les modèles sans exception.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Disponibilité globale (4 pts) :</strong><br>' +
      '    - Les 2 serveurs web en parallèle ont une disponibilité : $SLA_{web} = 1 - (1 - 0.999)^2 = 1 - 0.001^2 = 1 - 0.000001 = 0.999999$ (99.9999%).<br>' +
      '    - La chaîne complète est en série : $SLA_{total} = SLA_{lb} \\times SLA_{web} \\times SLA_{db} = 0.9999 \\times 0.999999 \\times 0.9995 \\approx 0.999399$ (soit 99.9399%).</li>',
      '  <li><strong>Indisponibilité annuelle (3 pts) :</strong><br>' +
      '    $Downtime = 525\\,600 \\times (1 - 0.999399) = 525\\,600 \\times 0.000601 = 315.89$ minutes par an (environ 5 heures 16 minutes d’interruption admissible).</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Hyperviseurs Type 1 vs Type 2 (3 pts) :</strong> Le Type 1 s’exécute directement sur le matériel nu (bare-metal) sans couche OS hôte intermédiaire, ce qui élimine la dégradation de performances (overhead &lt; 2%) et optimise la sécurité. Le Type 2 s’exécute au-dessus d’un OS hôte (Windows/Linux grand public), subissant un double niveau d’arbitrage d’ordonnancement inacceptable en production.</li>',
      '  <li><strong>Ratios de sur-allocation (4 pts) :</strong><br>' +
      '    - vCPU total = $12 \\times 4 = 48$ vCPU. Ratio vCPU:pCPU = $48 / 32 = 1.50:1$. Ce ratio est parfaitement raisonnable (la norme admise est de 2:1 à 4:1).<br>' +
      '    - RAM totale = $12 \\times 12 = 144$ Go. Ratio RAM = $144 / 128 = 1.125:1$ (112.5%). Sur-allocation modérée admissible uniquement avec mécanisme de ballonnement de mémoire (memory ballooning) actif, mais à surveiller pour éviter les swaps disques violents.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Final (EF) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Final — Green IT, Souveraineté Réglementaire &amp; Stratégies FinOps', [
      '<h4>Partie 1 : Green IT &amp; Efficacité Énergétique (6 points)</h4>',
      '<ol>',
      '  <li>Définissez le PUE (Power Usage Effectiveness) et le DCiE (Data Center Infrastructure Efficiency). Quel est le PUE théorique parfait ? (2 pts)</li>',
      '  <li>Une salle serveur d’entreprise absorbe 300 000 kWh d’énergie totale annuelle, dont 120 000 kWh pour les serveurs et le stockage. Calculez son PUE et son DCiE. Si l’on migre cette charge vers un datacenter hyperscale affichant un PUE de 1.12, calculez l’économie d’énergie annuelle en kWh. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Sécurité, Responsabilité Partagée &amp; Souveraineté (7 points)</h4>',
      '<ol>',
      '  <li>Exposez les risques juridiques pesant sur une entreprise européenne hébergeant des données de santé chez un fournisseur soumis au CLOUD Act américain, même si les datacenters sont physiquement situés à Paris ou Francfort. (3 pts)</li>',
      '  <li>Quelles exigences techniques et organisationnelles le label français SecNumCloud de l’ANSSI impose-t-il pour garantir la souveraineté ? (2 pts)</li>',
      '  <li>Citez 3 configurations critiques à auditer sur un stockage d’objets (bucket) pour prévenir les fuites de données. (2 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Migration Applicative 6R &amp; FinOps (7 points)</h4>',
      '<p>Une entreprise possède un parc applicatif de 10 serveurs nécessitant 87 600 heures cumulées de calcul par an. Le tarif On-Demand est de 1.20 $ / heure.</p>',
      '<p>L’audit FinOps montre que la charge se décompose en :</p>',
      '<ul>',
      '  <li>50 000 heures de charge de base permanente stable (éligibles aux Instances Réservées avec 40% de remise) ;</li>',
      '  <li>25 000 heures de calculs de traitement par lots nocturnes (éligibles aux Instances Spot avec 70% de remise) ;</li>',
      '  <li>12 600 heures de pics de trafic imprévisibles (laissées en On-Demand).</li>',
      '</ul>',
      '<ol>',
      '  <li>Calculez la facture annuelle sans optimisation (100% On-Demand). (2 pts)</li>',
      '  <li>Calculez la facture annuelle optimisée selon les principes FinOps. Quel est le montant de l’économie réalisée et le pourcentage de réduction de la facture ? (4 pts)</li>',
      '  <li>À quelle stratégie des 6 R correspond le remplacement d’un logiciel RH vieillissant par une solution SaaS clé en main ? (1 pt)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Final', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Définitions PUE &amp; DCiE (2 pts) :</strong> $PUE = E_{totale} / E_{IT}$ et $DCiE = 1 / PUE \\times 100\\%$. Le PUE idéal est 1.0 (100% de l’électricité consommée va au calcul utile des serveurs, zéro perte en climatisation).</li>',
      '  <li><strong>Calcul d’énergie (4 pts) :</strong><br>' +
      '    - Salle actuelle : $PUE = 300\\,000 / 120\\,000 = 2.50$. $DCiE = 120\\,000 / 300\\,000 = 40.0\\%$.<br>' +
      '    - Avec hyperscaler ($PUE = 1.12$) : $E_{totale} = 120\\,000 \\times 1.12 = 134\\,400$ kWh.<br>' +
      '    - Économie nette : $300\\,000 - 134\\,400 = 165\\,600$ kWh par an (plus de 55% d’économie d’énergie globale).</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Risques CLOUD Act (3 pts) :</strong> Le CLOUD Act (Clarifying Lawful Overseas Use of Data Act) confère à la justice américaine le pouvoir d’exiger la transmission de données hébergées par toute société de droit américain, quelle que soit la localisation géographique physique des serveurs (principe d’extraterritorialité). Cela entre en conflit direct avec le RGPD qui interdit le transfert de données sensibles hors du cadre européen sans garanties d’équivalence.</li>',
      '  <li><strong>SecNumCloud (2 pts) :</strong> Qualification délivrée par l’ANSSI exigeant : immunité juridique totale aux législations extraterritoriales, actionnariat européen, datacenters et support technique situés exclusivement dans l’Union européenne, et haut niveau de sécurité opérationnelle ISO 27001 renforcée.</li>',
      '  <li><strong>Audit du bucket (2 pts) :</strong> Blocage absolu des accès publics en lecture, chiffrement obligatoire au repos (SSE-KMS avec rotation de clés), et activation du versioning + logging d’accès pour l’imputabilité.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Coût naïf (2 pts) :</strong> $87\\,600 \\times 1.20 = 105\\,120$ $ par an.</li>',
      '  <li><strong>Coût FinOps optimisé (4 pts) :</strong><br>' +
      '    - Base (RI, remise 40% $\\Rightarrow$ tarif 0.72 $) : $50\\,000 \\times 0.72 = 36\\,000$ $<br>' +
      '    - Batch (Spot, remise 70% $\\Rightarrow$ tarif 0.36 $) : $25\\,000 \\times 0.36 = 9\\,000$ $<br>' +
      '    - Pic (On-Demand, tarif plein 1.20 $) : $12\\,600 \\times 1.20 = 15\\,120$ $<br>' +
      '    - Coût total optimisé = $36\\,000 + 9\\,000 + 15\\,120 = 60\\,120$ $<br>' +
      '    - Économie nette = $105\\,120 - 60\\,120 = 45\\,000$ $ d’économie annuelle (soit 42.8% de réduction).</li>',
      '  <li><strong>Stratégie 6R (1 pt) :</strong> Il s’agit de la stratégie <strong>Repurchase</strong> (aussi appelée « Drop and Shop »), consistant à abandonner l’application développée sur mesure pour adopter un logiciel en tant que service (SaaS).</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'chapitre6.html', label: 'Chapitre 6' }, { href: 'exercices.html', label: 'Catalogue des exercices' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs complets et corrigés détaillés du cours de Cloud Computing B3 : contrôle continu et examen final.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Pratiques ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices pratiques' }
  ]);

  const rawExos = require('../../../exercises/b3-cloud-computing');

  const chaptersHtml = chapterList.map(ch => {
    const list = rawExos.filter(e => e.chapter === ch.n);
    const items = list.map(e => [
      '    <div class="card card--compact">',
      '      <div class="card__head">',
      '        <span class="badge badge--dark">' + e.id + '</span>',
      '        <span class="badge">' + e.level.toUpperCase() + '</span>',
      '      </div>',
      '      <h4 class="card__title">' + e.title + '</h4>',
      '      <p class="card__desc">' + e.goal + '</p>',
      '      <div class="card__foot">',
      '        <a class="btn btn--sm" href="chapitre' + ch.n + '.html#exo-' + e.id + '">' + ic('play') + ' Résoudre dans le cours</a>',
      '      </div>',
      '    </div>'
    ].join('\n')).join('\n');

    return [
      '  <h3>Module ' + ch.n + ' — ' + ch.title + '</h3>',
      '  <div class="grid grid-3">' + items + '</div>'
    ].join('\n');
  }).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices de Code en Cloud Computing B3</h1>',
    '  <p class="lead">Tous les ateliers pratiques de programmation Python 3 intégrés au cours, classés par niveau de difficulté progressive (Niveau 1 Fondamental, Niveau 2 Intermédiaire, Niveau 3 Avancé).</p>',
    '',
    chaptersHtml,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens blancs' }, { href: 'chapitre1.html', label: 'Commencer par le premier exercice' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Exercices pratiques — ' + course.brand,
      description: 'Catalogue des 18 exercices de code du cours de Cloud Computing B3 avec objectifs et liens directs vers l’éditeur.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
