/**
 * Pages « accueil », « sommaire » et « atelier » du cours « Services Cloud AWS B3 ».
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
    '    <div class="hero__badge"><span class="badge badge--glow">' + ic('cloud') + ' Niveau B3 • Architectures AWS, IAM, EC2, VPC, S3, RDS, Lambda &amp; Well-Architected Framework</span></div>',
    '    <h1 class="hero__title">' + course.brand + '</h1>',
    '    <p class="hero__subtitle">' + course.lead + '</p>',
    '    <div class="hero__actions">',
    '      <a class="btn btn--primary btn--lg" href="chapitres/chapitre1.html">' + ic('play') + ' Démarrer le cours</a>',
    '      <a class="btn btn--lg" href="sommaire.html">' + ic('layers') + ' Voir le sommaire</a>',
    '      <a class="btn btn--lg" href="atelier.html">' + ic('terminal') + ' Bac à sable AWS CLI &amp; Python 3</a>',
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
    '  <h2>L\'Ingénierie Cloud AWS en Bachelor 3</h2>',
    box('standard', 'De l\'Infrastructure IaaS aux Architectures Serverless Résilientes et Managées', [
      '<p>En troisième année de Bachelor en Ingénierie des Systèmes et Réseaux Informatiques, la maîtrise d\'Amazon Web Services (AWS) est une compétence fondamentale. Pionnier et leader mondial incontesté du Cloud Computing, AWS héberge des millions d\'applications d\'entreprises, de startups et d\'institutions gouvernementales à travers une infrastructure mondiale hautement distribuée.</p>',
      '<p>Conçu en stricte conformité avec les supports de cours officiels de M. Caleb Benaja AGOUTOCO-POKO (L3-ASI) et les référentiels professionnels de certification AWS (Cloud Practitioner CLF-C02 et Solutions Architect Associate SAA-C03), ce cours propose une immersion complète et concrète : ' +
      'de l\'infrastructure globale et du modèle de responsabilité partagée (Régions, Zones de Disponibilité indépendantes, Edge Locations CloudFront, piliers du Well-Architected Framework et outils CLI), ' +
      'de la gestion rigoureuse des identités et de la sécurité (IAM, rôles, politiques JSON avec évaluation explicite Deny/Allow, rotation des clés et gouvernance multi-comptes avec AWS Organizations et SCPs), ' +
      'des moteurs de calcul et de stockage élastiques (instances EC2, modèles d\'achat On-Demand/Reserved/Spot, volumes EBS gp3/io2, équilibreurs de charge ELB/ALB et groupes Auto Scaling multi-AZ), ' +
      'des architectures réseau isolées (Amazon VPC, sous-réseaux publics et privés avec adresses réservées, tables de routage, passerelles Internet et NAT, et filtrage combiné Security Groups avec état et Network ACLs sans état), ' +
      'du stockage objet distribué et des bases de données managées (Amazon S3 avec politiques de cycle de vie et Block Public Access, EFS, bases relationnelles RDS multi-AZ avec répliques en lecture, Aurora et NoSQL DynamoDB avec RCU/WCU), ' +
      'et enfin de l\'écosystème serverless et de l\'observabilité (fonctions AWS Lambda pilotées par événements, découplage asynchrone avec files d\'attente SQS et notifications SNS, et surveillance centralisée avec Amazon CloudWatch et CloudTrail).'
    ]),
    '',
    '  <div class="card card--full" style="margin-top:28px">',
    '    <h3>' + ic('target') + ' Objectifs Pédagogiques &amp; Compétences Métier Visées</h3>',
    '    <div class="grid grid-3" style="margin-top:16px">',
    '      <div>',
    '        <h4>1. Architecture Cloud Résiliente</h4>',
    '        <p>Concevoir des architectures hautement disponibles réparties sur plusieurs zones de disponibilité (Multi-AZ) garantissant une continuité de service sans point unique de défaillance (SPOF).</p>',
    '      </div>',
    '      <div>',
    '        <h4>2. Réseau &amp; Sécurité Cloisonnée</h4>',
    '        <p>Isoler les charges de travail dans des VPC sur-mesure, configurer le routage privé via NAT Gateway et appliquer le principe du moindre privilège avec des politiques IAM et pare-feux stricts.</p>',
    '      </div>',
    '      <div>',
    '        <h4>3. FinOps &amp; Serverless Moderne</h4>',
    '        <p>Optimiser les coûts d\'exploitation en exploitant les modèles Spot/Reserved, les politiques de cycle de vie S3 et en concevant des microservices serverless avec AWS Lambda et DynamoDB.</p>',
    '      </div>',
    '    </div>',
    '  </div>',
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'index.html': {
      title: course.brand,
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
    '      <li>' + ic('terminal') + ' <strong>Exercices pratiques :</strong> 3 ateliers interactifs de code Python 3 corrigés</li>',
    '      <li>' + ic('check') + ' <strong>Auto-évaluation :</strong> 8 questions de QCM avec explications détaillées</li>',
    '    </ul>',
    '    <p><a class="btn btn--primary" href="chapitres/chapitre' + chapitre.n + '.html">Accéder au Module ' + chapitre.n + ' ' + ic('arrow-right') + '</a></p>',
    '  </section>'
  ].join('\n')).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Sommaire Général &amp; Plan d\'Études — ' + course.brand + '</h1>',
    '  <p class="lead">Programme officiel d\'ingénierie Cloud AWS pour le Bachelor 3, structuré en 6 modules d\'apprentissage approfondi, 18 exercices de programmation et 48 QCM d\'évaluation.</p>',
    '',
    '  <div class="grid grid-3">',
    '    <div class="card">',
    '      <h4>' + ic('terminal') + ' Bac à sable interactif</h4>',
    '      <p>Testez vos scripts Python de validation d\'architectures, de calcul de coûts EC2/S3 et d\'adressage VPC dans l\'éditeur Monaco AMD.</p>',
    '      <p><a class="btn" href="atelier.html">Ouvrir l\'atelier</a></p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('layers') + ' Cartes mémo interactives</h4>',
    '      <p>36 flashcards de mémorisation active sur les services AWS, les règles IAM, le modèle de responsabilité et les commandes CLI.</p>',
    '      <p><a class="btn" href="chapitres/cartes.html">Réviser les cartes</a></p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>' + ic('file-text') + ' Mémento &amp; Guide</h4>',
    '      <p>Syntaxe des ARN, politiques IAM JSON, formules de disponibilité multi-AZ, classes S3 et commandes AWS CLI essentielles.</p>',
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
      description: 'Plan d\'études détaillé du cours Services Cloud AWS B3 : 6 modules complets, ateliers de code, QCM et examens.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function atelier(course) {
  const crumbs = crumb(course, [{ label: 'Accueil', href: 'index.html' }, { label: 'Sommaire', href: 'sommaire.html' }, { label: 'Atelier de code' }]);

  const defaultCode = `# Zone libre : simulez vos architectures et calculs Cloud AWS en Python 3
import sys

def simuler_architecture_aws(commandes):
    """Simule des calculs d'architecture et de dimensionnement AWS."""
    resultats = []
    for cmd in commandes:
        cmd_clean = cmd.strip()
        if cmd_clean.startswith("aws"):
            resultats.append(f"AWS_CLI_EXEC: {cmd_clean} -> STATUS=SUCCESS (Region: eu-west-3)")
        elif cmd_clean.startswith("arn:"):
            parts = cmd_clean.split(":")
            svc = parts[2] if len(parts) > 2 else "unknown"
            resultats.append(f"ARN_RESOURCE: service={svc} -> VALID")
        else:
            resultats.append(f"AWS_LOG: {cmd_clean} -> PROCESSED")
    return resultats

if __name__ == "__main__":
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        lignes = ["aws ec2 describe-instances --region eu-west-3", "arn:aws:s3:::mon-bucket-demo"]
    for r in simuler_architecture_aws(lignes):
        print(r)
`;

  const body = [
    crumbs,
    '  <header class="section-head">',
    '    <h1>Atelier de Code Interactif — Services Cloud AWS</h1>',
    '    <p class="section-head__lead">Expérimentez librement vos algorithmes d\'adressage VPC, de calcul de coûts EC2/S3/Lambda, de validation d\'ARN et d\'évaluation de politiques IAM en Python 3.</p>',
    '  </header>',
    '',
    '  <div class="lab"',
    '       data-lab',
    '       data-exercise-id="atelier-aws3"',
    '       data-language="python"',
    '       data-height="420"',
    '       data-stdin="aws ec2 describe-instances --region eu-west-3\narn:aws:s3:::mon-bucket-demo\naws s3 ls">',
    '    <script type="text/plain" data-lab-starter>' + defaultCode + '</script>',
    '  </div>',
    '',
    '  <h2>Suggestions d’expérimentations pratiques</h2>',
    '  <div class="grid grid-2">',
    '    <div class="card">',
    '      <h4>Simulateur d\'Auto Scaling Multi-AZ</h4>',
    '      <p>Modélisez la répartition équilibrée d\'une flotte d\'instances EC2 entre plusieurs zones de disponibilité lors d\'un pic de trafic.</p>',
    '    </div>',
    '    <div class="card">',
    '      <h4>Calculateur d\'Adresses Réservées VPC</h4>',
    '      <p>Validez vos plans d\'adressage CIDR en calculant automatiquement les 5 adresses IP réservées par sous-réseau dans AWS.</p>',
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
      description: 'Console interactive Python 3 pour concevoir et tester des algorithmes de gestion Cloud AWS, dimensionnement et sécurité.',
      active: 'atelier',
      body
    }
  };
}

module.exports = { index, sommaire, atelier };
