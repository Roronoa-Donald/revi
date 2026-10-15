/**
 * Pages « examens » et « exercices » du cours « UML B2 ».
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
    '  <h1>Examens Blancs &amp; Épreuves Corrigées UML B2</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences universitaires de niveau Licence 2 / Bachelor 2 en génie logiciel et modélisation orientée objet.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Use Cases, Diagramme de Classes &amp; Séquence', [
      '<h4>Partie 1 : Spécification des Besoins &amp; Cas d’Utilisation (6 points)</h4>',
      '<p>Un système de réservation de billetterie en ligne permet à un <em>Client</em> de rechercher des spectacles et de réserver des billets. Lors d’une réservation, le système doit impérativement vérifier la disponibilité des places et authentifier le client. Si le client possède un code promotionnel, une réduction peut être appliquée.</p>',
      '<ol>',
      '  <li>Identifiez les acteurs primaires et secondaires du système. (2 pts)</li>',
      '  <li>Quels sont les cas d’utilisation principaux ? Identifiez et justifiez les relations <code>&laquo;include&raquo;</code> et <code>&laquo;extend&raquo;</code> reliant ces cas. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Modélisation Statique &amp; Diagramme de Classes (8 points)</h4>',
      '<p>Dans cette même billetterie, une <em>Commande</em> contient une ou plusieurs <em>Lignes de Commande</em>. Chaque ligne référence un <em>Billet</em> pour une <em>Séance</em> donnée dans une <em>Salle</em>. Une séance appartient à exactement un <em>Spectacle</em>. Une salle possède plusieurs <em>Sièges</em>.</p>',
      '<ol>',
      '  <li>Dressez les classes avec leurs attributs essentiels et leurs visibilités standards (<code>+</code>, <code>-</code>, <code>#</code>). (3 pts)</li>',
      '  <li>Définissez les relations entre ces classes. Justifiez pourquoi la relation entre <em>Commande</em> et <em>LigneCommande</em> est une composition forte alors que celle entre <em>Salle</em> et <em>Siège</em> peut être discutée. (3 pts)</li>',
      '  <li>Indiquez les multiplicités complètes à chaque extrémité des associations. (2 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Modélisation Temporelle &amp; Diagramme de Séquence (6 points)</h4>',
      '<ol>',
      '  <li>Représentez la séquence temporelle de validation d’un paiement par carte bancaire entre les lignes de vie <code>:Client</code>, <code>:InterfaceWeb</code>, <code>:GestionnaireCommande</code> et <code>:PasserelleBancaire</code>. (3 pts)</li>',
      '  <li>Intégrez un fragment combiné <code>alt</code> pour traiter le cas nominal (paiement accepté) et le cas d’erreur (fonds insuffisants ou carte rejetée). Précisez les conditions de garde entre crochets. (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Acteurs (2 pts) :</strong> Acteur primaire : <em>Client</em> (humain qui déclenche l’action). Acteurs secondaires : <em>Système de Paiement Bancaire</em> (système externe automatisé notifié lors du règlement).</li>',
      '  <li><strong>Relations Use Cases (4 pts) :</strong><br>',
      '    - <code>Réserver Billet</code> &rarr; <code>&laquo;include&raquo;</code> &rarr; <code>Authentifier Utilisateur</code> : inclusion obligatoire car la réservation ne peut aboutir sans compte validé.<br>',
      '    - <code>Réserver Billet</code> &rarr; <code>&laquo;include&raquo;</code> &rarr; <code>Vérifier Disponibilité</code> : inclusion obligatoire préalable.<br>',
      '    - <code>Appliquer Code Promo</code> &rarr; <code>&laquo;extend&raquo;</code> &rarr; <code>Réserver Billet</code> : flèche dirigée de l’extension vers le cas de base avec point d’extension <em>Paiement</em>, exécuté sous condition <em>[si code promo fourni]</em>.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (8 points)</h4>',
      '<ul>',
      '  <li><strong>Classes &amp; Visibilités (3 pts) :</strong> <code>Commande (-id: str, -date: Date, +calculerTotal(): float)</code>, <code>LigneCommande (-quantite: int, -prixUnitaire: float)</code>, <code>Seance (-horaire: DateTime)</code>, <code>Spectacle (-titre: str, -duree: int)</code>.</li>',
      '  <li><strong>Relations &amp; Composition (3 pts) :</strong> <code>Commande 1 &loz;-- 1..* LigneCommande</code> (losange plein du côté Commande) car une ligne de commande n’a aucune existence autonome hors de sa commande parente (destruction en cascade). <code>Spectacle 1 -- 0..* Seance</code> (association simple).</li>',
      '  <li><strong>Multiplicités (2 pts) :</strong> <code>Commande (1) &mdash; (1..*) LigneCommande</code> ; <code>LigneCommande (*) &mdash; (1) Billet</code> ; <code>Seance (1) &mdash; (*) Billet</code>.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Séquence (3 pts) :</strong> Message synchrone <code>validerPanier()</code> de Client vers InterfaceWeb, puis <code>traiterPaiement(montant, carte)</code> vers GestionnaireCommande, puis appel externe <code>autoriserDebit(carte, montant)</code> vers PasserelleBancaire.</li>',
      '  <li><strong>Fragment alt (3 pts) :</strong> Cadre <code>alt</code> : premier opérande <code>[reponse == "ACCORD"]</code> &rarr; message de confirmation et émission du billet ; second opérande <code>[else]</code> &rarr; message de rejet et notification au client sans débit.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Conception Globale d’un Système Distribué', [
      '<h4>Exercice 1 : Cycle de vie &amp; Machine à États-Transitions (7 points)</h4>',
      '<p>Modélisez la machine à états finis du cycle de vie d’une <em>Commande</em> en ligne depuis sa création initiale jusqu’à son archivage.</p>',
      '<ol>',
      '  <li>Identifiez l’état initial, les états stables (<em>EnAttentePaiement</em>, <em>Payée</em>, <em>EnPréparation</em>, <em>Expédiée</em>, <em>Livrée</em>, <em>Annulée</em>) et les états finaux. (2 pts)</li>',
      '  <li>Définissez les transitions, leurs événements déclencheurs (triggers), leurs gardes entre crochets <code>[garde]</code> et leurs actions associées <code>/action</code>. (3 pts)</li>',
      '  <li>Expliquez la différence entre une action sur transition, une action <code>entry /</code> et une activité interne <code>do /</code>. (2 pts)</li>',
      '</ol>',
      '<h4>Exercice 2 : Flux Métier &amp; Diagramme d’Activités (6 points)</h4>',
      '<ol>',
      '  <li>Décrivez le processus d’expédition d’une commande via un diagramme d’activités avec couloirs de responsabilités (swimlanes) : <em>Système Informatique</em>, <em>Magasinier</em> et <em>Transporteur</em>. (3 pts)</li>',
      '  <li>Modélisez la préparation physique du colis et la génération de la facture en parallèle à l’aide d’une barre de synchronisation <em>Fork</em> et d’une barre <em>Join</em>. (3 pts)</li>',
      '</ol>',
      '<h4>Exercice 3 : Architecture Physique &amp; Déploiement (7 points)</h4>',
      '<ol>',
      '  <li>Dressez le diagramme de déploiement physique du système d’information : postes clients, serveur frontal Reverse Proxy / WAF, serveurs d’applications en cluster et serveur de base de données PostgreSQL. (4 pts)</li>',
      '  <li>Représentez les nœuds matériels <code>&laquo;device&raquo;</code>, les environnements d’exécution <code>&laquo;executionEnvironment&raquo;</code> et les artefacts logiciels déployés <code>&laquo;artifact&raquo;</code> (fichiers JAR/WAR, conteneurs Docker). (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Exercice 1 (7 points)</h4>',
      '<ul>',
      '  <li><strong>États (2 pts) :</strong> État initial &rarr; <em>PanierEnCours</em> &rarr; validation &rarr; <em>EnAttentePaiement</em>. Si paiement reçu &rarr; <em>Payee</em>. Si timeout ou refus &rarr; <em>Annulee</em> (état terminal). De <em>Payee</em> &rarr; <em>EnPreparation</em> &rarr; <em>Expediee</em> &rarr; <em>Livree</em> &rarr; État final.</li>',
      '  <li><strong>Transitions &amp; Gardes (3 pts) :</strong> De <em>EnAttentePaiement</em> vers <em>Payee</em> : événement <code>paiementConfirme [soldeSuffisant == true] / genererFacture()</code>. De <em>Payee</em> vers <em>Annulee</em> : événement <code>demandeRemboursement [delaiRetractation &lt;= 14j] / crediterCompte()</code>.</li>',
      '  <li><strong>Actions vs Activités (2 pts) :</strong> <code>entry /</code> s’exécute immédiatement dès l’entrée dans l’état de manière atomique ; <code>do /</code> représente un travail continu qui peut durer tant que l’on réside dans l’état et qui peut être interrompu par une transition sortante.</li>',
      '</ul>',
      '<h4>Corrigé Exercice 2 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Swimlanes (3 pts) :</strong> 3 couloirs horizontaux ou verticaux : Système (traite commande, débite stock), Magasinier (prélève articles, conditionne carton), Transporteur (prend en charge, livre).</li>',
      '  <li><strong>Fork / Join (3 pts) :</strong> Nœud de séparation (Fork) après confirmation de commande : branche 1 &rarr; Magasinier : <em>Préparer Colis</em> ; branche 2 &rarr; Système : <em>Générer Facture PDF &amp; Bordereau</em>. Nœud de synchronisation (Join) : attend que le colis soit prêt ET le bordereau imprimé avant de passer à l’action <em>Apposer Étiquette</em>.</li>',
      '</ul>',
      '<h4>Corrigé Exercice 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Nœuds &amp; Réseaux (4 pts) :</strong> Nœud <code>Client Device</code> relié via protocole HTTPS/TLS au nœud <code>Serveur DMZ (Reverse Proxy Nginx)</code>. Ce dernier est relié en réseau privé 10 Gbps au cluster de nœuds <code>Serveur App (Linux Docker)</code>, eux-mêmes reliés au nœud <code>Serveur SGBD (PostgreSQL Master/Replica)</code> via port TCP 5432.</li>',
      '  <li><strong>Artefacts (3 pts) :</strong> Sur Serveur App, artefact <code>api-backend.jar</code> déployé au sein de l’environnement d’exécution <code>JVM / OpenJDK 21</code> ou image <code>backend:v2.docker</code>.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento UML' }, { href: 'exercices.html', label: 'Accéder aux 18 exercices TP' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens Blancs &amp; Corrigés — ' + course.brand,
      description: 'Épreuves d’examen blanc de modélisation UML B2 avec corrigés intégraux et barèmes universitaires.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices de Code ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices pratiques' }
  ]);

  const items = chapterList.map(ch => [
    '    <section class="card" style="margin-bottom: var(--space-4);">',
    '      <div class="card__head">',
    '        <span class="badge">' + (ch.n === 1 ? 'Accès libre' : 'Réservé B2 et plus') + '</span>',
    '        <span class="card__num">Module ' + ch.n + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitre' + ch.n + '.html#exercices">Exercices du Module ' + ch.n + ' — ' + ch.title + '</a></h3>',
    '      <p class="card__desc">' + ch.toc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' 3 exercices interactifs en Python</span>',
    '        <span class="card__link"><a class="btn btn--sm" href="chapitre' + ch.n + '.html#exercices">Pratiquer sur le Chapitre ' + ch.n + ' ' + ic('arrow-right') + '</a></span>',
    '      </div>',
    '    </section>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices Pratiques UML B2</h1>',
    '  <p class="lead">Accédez aux 18 ateliers de programmation et de simulation exécutables directement dans le navigateur, vérifiés automatiquement par le moteur de tests.</p>',
    '',
    items,
    '',
    chnav({ href: 'simulateur-examen.html', label: 'Passer les examens blancs' }, { href: '../atelier.html', label: 'Ouvrir l’atelier libre de code' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Catalogue des Exercices Pratiques — ' + course.brand,
      description: 'Accès rapide aux 18 ateliers pratiques de simulation et modélisation UML B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };
