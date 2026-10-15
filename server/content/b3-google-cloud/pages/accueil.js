/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Google Cloud Platform B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('cloud') + ' Niveau B3 • Architecture GCP, IAM, Compute Engine, VPC, Cloud Storage, Cloud Run &amp; Terraform</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable CLI gcloud &amp; Python 3</a>',
    '    </div>',
    '  </header>',
    '',
    '  <section class="statbar">',
    '    <div class="stat"><span class="stat__val">6</span><span class="stat__lbl">Modules d\'ingénierie</span></div>',
    '    <div class="stat"><span class="stat__val">18</span><span class="stat__lbl">Exercices de code exécutables</span></div>',
    '    <div class="stat"><span class="stat__val">48</span><span class="stat__lbl">Questions de QCM corrigées</span></div>',
    '    <div class="stat"><span class="stat__val">2</span><span class="stat__lbl">Examens blancs d\'architecture</span></div>',
    '  </section>',
    '',
    '  <h2>Parcours d’apprentissage</h2>',
    '  <div class="grid">' + cardsHtml + '</div>',
    '',
    '  <h2>L\'Ingénierie Cloud Google en Bachelor 3</h2>',
    box('standard', 'De l\'Infrastructure IaaS aux Architectures Serverless et Conteneurs Managés', [
      '<p>En troisième année de Bachelor en Ingénierie Réseaux et Systèmes d’Information, la maîtrise de Google Cloud Platform (GCP) est une compétence stratégique majeure. GCP propulse les infrastructures planétaires de Google (Search, YouTube, Gmail) et propose aux entreprises des services d\'excellence pour le calcul distribué, le réseau logiciel mondial et le Big Data temps réel.</p>',
      '<p>Conçu en conformité avec les supports de cours officiels de M. Caleb Benaja AGOUTOCO-POKO et les référentiels professionnels de certification Google Cloud (Associate Cloud Engineer / Professional Cloud Architect), ce cours propose une immersion complète et concrète : ' +
      'de la hiérarchie organisationnelle et des outils d\'administration (organisations, dossiers, projets, quotas, SDK gcloud CLI et Cloud Shell), ' +
      'de la gestion rigoureuse des identités et des accès (IAM, principe du moindre privilège, rôles prédéfinis et personnalisés, gouvernance des comptes de service et Workload Identity sans clé), ' +
      'des moteurs de calcul et de conteneurisation (Compute Engine, groupes d\'instances gérés MIG avec autoscaling et autohealing, Google Kubernetes Engine GKE, et serverless moderne avec Cloud Run), ' +
      'des architectures réseau logicielles (VPC mondial et régional, sous-réseaux personnalisés avec adresses réservées, règles de pare-feu avec état, interconnexions VPN/Peering et répartiteurs de charge mondiaux Anycast Cloud Load Balancing), ' +
      'du stockage distribué et des bases de données managées (Cloud Storage avec politiques de cycle de vie automatique, Cloud SQL, Cloud Spanner à cohérence stricte globale, Firestore, Bigtable et messagerie asynchrone Pub/Sub), ' +
      'et enfin de l\'observabilité, du FinOps et de l\'automatisation déclarative (Google Cloud Operations Suite avec Monitoring et Logging, optimisation budgétaire CUD et SUD, et Infrastructure as Code avec Terraform et le provider Google).'
    ]),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand + ' — Accueil',
      description: course.description,
      active: 'index',
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const listItems = chapterList.map(chapitre => [
    '    <li class="summary-item">',
    '      <div class="summary-item__num">' + chapitre.n + '</div>',
    '      <div class="summary-item__content">',
    '        <h3><a href="chapitres/chapitre' + chapitre.n + '.html">' + chapitre.title + '</a></h3>',
    '        <p>' + chapitre.toc + '</p>',
    '        <div class="summary-item__meta">',
    '          <span>' + ic('clock') + ' ' + (chapitre.time || '≈ 2 h 45') + '</span>',
    '          <span class="badge">' + (chapitre.n === 1 ? 'Accès libre' : 'Réservé B3 et plus') + '</span>',
    '          <a href="chapitres/chapitre' + chapitre.n + '.html" class="summary-item__cta">Accéder au cours ' + ic('arrow-right') + '</a>',
    '        </div>',
    '      </div>',
    '    </li>'
  ].join('\n')).join('\n');

  const body = [
    crumb(course, [
      { label: 'Accueil', href: 'index.html' },
      { label: 'Sommaire' }
    ]),
    '  <header class="section-head">',
    '    <h1 class="section-head__title">Sommaire général du cours</h1>',
    '    <p class="section-head__lead">Parcours complet en 6 modules d\'ingénierie Cloud, 18 ateliers de programmation Python 3 et 48 QCM interactifs.</p>',
    '  </header>',
    '',
    '  <ul class="summary-list">' + listItems + '</ul>',
    '',
    '  <h2>Ressources transverses d’évaluation</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>' + ic('layers') + ' <a href="chapitres/cartes.html">Cartes Mémo (Flashcards)</a></h4>',
    '      <p>36 cartes de révision interactive pour mémoriser les commandes gcloud, concepts IAM, services managés et formules réseau.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('file') + ' <a href="chapitres/formules.html">Mémento Opérationnel &amp; CLI</a></h4>',
    '      <p>Synthèse condensée des commandes du SDK gcloud, syntaxes Terraform, métriques de SLA et comparatifs de stockage.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('terminal') + ' <a href="chapitres/exercices.html">Catalogue des 18 Exercices</a></h4>',
    '      <p>Accès direct aux 18 exercices de code lab avec filtres de progression et validation automatisée.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('award') + ' <a href="chapitres/examens.html">Examens Blancs Corrigés</a></h4>',
    '      <p>Contrôle Continu et Examen Terminal basés sur des cas réels d\'architecture Google Cloud en entreprise.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'index.html', label: 'Retour à l\'accueil' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire complet des modules et ressources d\'ingénierie Google Cloud Platform B3.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const body = [
    crumb(course, [
      { label: 'Accueil', href: 'index.html' },
      { label: 'Sommaire', href: 'sommaire.html' },
      { label: 'Atelier de code' }
    ]),
    '  <header class="section-head">',
    '    <h1 class="section-head__title">Atelier de Code — Bac à Sable Google Cloud</h1>',
    '    <p class="section-head__lead">Expérimentez librement vos algorithmes d\'allocation de ressources, de validation de politiques IAM et de modélisation réseau GCP en Python 3.</p>',
    '  </header>',
    '',
    '  <div class="lab"',
    '       data-lab',
    '       data-exercise-id="atelier-gcp3"',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="gcloud compute instances list\ngcloud iam service-accounts list\ngcloud storage buckets list">',
    '    <script type="text/plain" data-lab-starter># Zone libre : simulez vos architectures et automatisations Google Cloud en Python 3\nimport sys\nimport re\n\ndef simuler_architecture_gcp(commandes):\n    """Simule l\'exécution de commandes d\'infrastructure et d\'audit Google Cloud."""\n    resultats = []\n    for cmd in commandes:\n        cmd_clean = cmd.strip()\n        if cmd_clean.startswith("gcloud"):\n            resultats.append(f"GCP_CLI_EXEC: {cmd_clean} -> STATUS=SUCCESS (executed in active project)")\n        else:\n            resultats.append(f"GCP_LOG: {cmd_clean} -> PROCESSED")\n    return resultats\n\nif __name__ == "__main__":\n    lignes = [l.strip() for l in sys.stdin if l.strip()]\n    for r in simuler_architecture_gcp(lignes):\n        print(r)\n</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulateur d\'Auto-scaling MIG (Target CPU)</h4>',
    '      <p>Modélisez l\'élasticité d\'un groupe d\'instances géré sous différentes charges CPU pour anticiper les temps de réaction et les coûts.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Calculateur de Sous-réseaux et Règles VPC</h4>',
    '      <p>Testez vos plans d\'adressage CIDR en excluant automatiquement les 4 adresses IP réservées par Google dans chaque sous-réseau.</p>',
    '    </div>',
    '  </div>',
    '',
    chnav({ href: 'sommaire.html', label: 'Sommaire du cours' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le Chapitre 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'atelier.html': {
      title: 'Bac à sable Google Cloud Platform — ' + course.brand,
      description: 'Bac à sable interactif en Python pour tester vos implémentations et automatisations Google Cloud Platform.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
