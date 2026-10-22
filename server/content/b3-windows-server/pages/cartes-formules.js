/**
 * Pages « cartes » (flashcards) et « formules » (mémento) du cours « Windows Server B3 ».
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
    '  <h1>Cartes de Révision &amp; Mémorisation Active — Windows Server B3</h1>',
    '  <p class="lead">36 fiches synthétiques pour ancrer les concepts fondamentaux : Architecture Système NT, Rôles DHCP/DNS, Forêt Active Directory, Rôles FSMO, Modèle AGDLP, Ordre LSDOU des GPOs, Droits NTFS/SMB, Hyper-V et Clustering de Haute Disponibilité.</p>',
    '',
    cards(modules),
    '',
    chnav({ href: '../sommaire.html', label: 'Sommaire général' }, { href: 'formules.html', label: 'Consulter le mémento technique' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours Windows Server B3 : AD DS, FSMO, AGDLP, GPO LSDOU, NTFS/SMB et Hyper-V des ' + chapterList.length + ' chapitres.',
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
    '  <h1>Mémento Technique &amp; Guide Opérationnel — Windows Server B3</h1>',
    '  <p class="lead">Guide de référence des cmdlets PowerShell fondamentales, modèle AGDLP, matrice des permissions effectives NTFS/Partage, règles de licences par cœur et formules de quorum.</p>',
    '',
    '  <h2>1. Cmdlets PowerShell Essentielles d’Administration Système</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Cmdlet PowerShell</th><th>Module</th><th>Rôle &amp; Exemple d’Utilisation</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td><code>Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools</code></td><td>ServerManager</td><td>Installe les binaires d’un rôle ou fonctionnalité serveur avec outils RSAT.</td></tr>',
    '      <tr><td><code>Get-ADUser -Filter * -Properties MemberOf</code></td><td>ActiveDirectory</td><td>Interroge l’annuaire LDAP et extrait les comptes utilisateurs avec leurs attributs.</td></tr>',
    '      <tr><td><code>New-ADGroup -Name "GG_Sec" -GroupScope Global -GroupCategory Security</code></td><td>ActiveDirectory</td><td>Créez un nouveau groupe global de sécurité dans l’annuaire.</td></tr>',
    '      <tr><td><code>gpupdate /force /boot</code></td><td>GroupPolicy</td><td>Force la réévaluation immédiate des GPOs utilisateur et ordinateur.</td></tr>',
    '      <tr><td><code>Get-VM | Select Name, State, MemoryAssigned</code></td><td>Hyper-V</td><td>Liste l’état d’exécution et la mémoire vive consommée par les machines virtuelles.</td></tr>',
    '      <tr><td><code>Test-WSMan -ComputerName srv01.corp.lan</code></td><td>Microsoft.WSMan</td><td>Vérifiez la disponibilité du service WinRM pour l’administration distante.</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>2. Le Modèle Microsoft AGDLP / AGUDLP d’Organisation des Groupes</h2>',
    '  <div class="card">',
    '    <h4>Chaîne Canonique d’Attribution des Droits</h4>',
    '    <p>Pour garantir la maintenabilité et éviter l’explosion des listes de contrôle d’accès (ACL) :</p>',
    '    <ol>',
    '      <li><strong>A (Accounts) :</strong> Les utilisateurs individuels ou comptes de service.</li>',
    '      <li><strong>G (Global Groups) :</strong> Groupes globaux représentant un rôle métier ou une fonction (ex. <code>GG_Comptables</code>). Membres de DL ou UG.</li>',
    '      <li><strong>U (Universal Groups) :</strong> Groupes universels utilisés dans les forêts multi-domaines pour consolider les groupes globaux de plusieurs arbres.</li>',
    '      <li><strong>DL (Domain Local Groups) :</strong> Groupes locaux de domaine représentant une ressource et un niveau d’accès (ex. <code>DL_Factures_Lecture</code>, <code>DL_DossierRH_Modif</code>).</li>',
    '      <li><strong>P (Permissions) :</strong> L’ACL NTFS ou le droit de partage est attribué exclusivement au groupe <code>DL</code>.</li>',
    '    </ol>',
    '  </div>',
    '',
    '  <h2>3. Matrice des Droits Réseau Effectifs (Partage SMB vs NTFS)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Droit Partage SMB</th><th>Permission NTFS</th><th>Accès Réseau Effectif Résultant</th><th>Règle Appliquée</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>Full Control</td><td>Read</td><td><strong>Read (Lecture seule)</strong></td><td>NTFS restreint le partage</td></tr>',
    '      <tr><td>Read</td><td>Modify / Full Control</td><td><strong>Read (Lecture seule)</strong></td><td>Le partage restreint NTFS</td></tr>',
    '      <tr><td>Change</td><td>Modify</td><td><strong>Modify (Lecture + Écriture + Modif)</strong></td><td>Équilibre atteint</td></tr>',
    '      <tr><td>Change</td><td>Read</td><td><strong>Read (Lecture seule)</strong></td><td>NTFS plus restrictif</td></tr>',
    '      <tr><td>None</td><td>Full Control</td><td><strong>None (Accès interdit)</strong></td><td>Partage bloque tout accès</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    '  <h2>4. Règles Officielles de Licence Microsoft par Cœur Physique</h2>',
    '  <div class="card">',
    '    <h4>Règles de Calcul &amp; Virtualisation Windows Server</h4>',
    '    <ul>',
    '      <li><strong>Règle du Socket :</strong> Minimum 8 cœurs physiques par socket processeur (si $\\\\le 8$, compter 8).</li>',
    '      <li><strong>Règle du Serveur :</strong> Minimum 16 cœurs physiques par serveur complet.</li>',
    '      <li><strong>Packs de vente :</strong> Vendus par packs de 2 cœurs. $\\\\text{Packs de base} = \\lceil \\\\text{Cœurs totaux} / 2 \\rceil$.</li>',
    '      <li><strong>Édition Standard :</strong> Chaque couverture complète de l’hôte physique octroie le droit d’exécuter <strong>2 machines virtuelles</strong> Windows Server. Pour $V$ VMs : $\\\\text{Packs requis} = \\\\text{Packs base} \\\\times \\lceil V / 2 \\rceil$.</li>',
    '      <li><strong>Édition Datacenter :</strong> Une seule couverture de l’hôte physique octroie des <strong>VMs illimitées</strong>.</li>',
    '    </ul>',
    '  </div>',
    '',
    '  <h2>5. Architecture du Quorum de Cluster Failover (WSFC)</h2>',
    '  <table class="table">',
    '    <thead>',
    '      <tr><th>Topologie de Nœuds</th><th>Témoin Recommandé (Witness)</th><th>Total Voix</th><th>Majorité Requise</th><th>Pannes Tolérées</th></tr>',
    '    </thead>',
    '    <tbody>',
    '      <tr><td>2 nœuds physiques</td><td>Témoin Disque / Cloud / Partage (1 voix)</td><td>3 voix</td><td>2 voix</td><td>1 nœud</td></tr>',
    '      <tr><td>3 nœuds physiques</td><td>Sans témoin (ou Cloud Witness)</td><td>3 voix</td><td>2 voix</td><td>1 nœud</td></tr>',
    '      <tr><td>4 nœuds physiques</td><td>Témoin Cloud / Disque (1 voix)</td><td>5 voix</td><td>3 voix</td><td>2 nœuds</td></tr>',
    '      <tr><td>5 nœuds physiques</td><td>Sans témoin</td><td>5 voix</td><td>3 voix</td><td>2 nœuds</td></tr>',
    '    </tbody>',
    '  </table>',
    '',
    chnav({ href: 'cartes.html', label: 'Cartes flashcards' }, { href: 'examens.html', label: 'Passer les examens blancs' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/formules.html': {
      title: 'Mémento & Formules — ' + course.brand,
      description: 'Aide-mémoire technique officiel du cours Windows Server B3 : cmdlets PowerShell, AGDLP, permissions NTFS/SMB, licences cœurs et quorum WSFC.',
      active: 'formules',
      body
    }
  };
}

module.exports = { cartes, formules };
