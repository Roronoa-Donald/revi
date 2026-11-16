/**
 * Chapitre 6 du cours « Windows Server » B2 — Sauvegarde Windows Server Backup
 * (wbadmin, BMR, VSS), FSRM, WSUS, surveillance et snapshots/clones VM.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Windows Server Backup (wbadmin, VSS), FSRM, WSUS, Surveillance &amp; Snapshots VM',
  short: 'WBAdmin, FSRM, WSUS &amp; Snapshots',
  toc: 'Windows Server Backup (wbadmin, Bare-Metal Recovery, clichés instantanés VSS), FSRM (quotas et filtrage de fichiers), WSUS, surveillance d’événements/performances, snapshots, clones, templates, vMotion et Veeam.',
  time: '≈ 2 h 45 de travail',
  lockLabel: 'Réservé B2 et plus',

  situation:
    'En production sous Windows Server B2, la continuité opérationnelle repose sur des outils natifs ' +
    'incontournables : sauvegarder l’état du système et le serveur nu avec Windows Server Backup (wbadmin) ' +
    'et les clichés instantanés VSS, maîtriser la volumétrie et bloquer les extensions dangereuses avec ' +
    'le Gestionnaire de ressources du serveur de fichiers (FSRM), orchestrer les correctifs via WSUS, ' +
    'corréler les événements et compteurs de performance, et encadrer les snapshots et migrations de VM.',

  objectives: [
    'mettre en œuvre Windows Server Backup (wbadmin, System State, Bare-Metal Recovery et clichés instantanés VSS) ;',
    'configurer le Gestionnaire de ressources du serveur de fichiers (FSRM : quotas stricts/souples et filtrage de fichiers actif/passif) ;',
    'administrer le déploiement de correctifs avec WSUS et surveiller les événements (Event Viewer / Get-WinEvent) et performances (Performance Monitor) ;',
    'définir un snapshot (checkpoint Hyper-V standard vs production) et le distinguer d’une sauvegarde ;',
    'comparer clone complet et clone lié, expliquer l’usage d’un template et situer vMotion, le cluster HA et la sauvegarde Veeam.'
  ],

  sections: [
    {
      title: 'Sauvegarde et restauration Windows Server Backup (wbadmin, Bare-Metal Recovery et clichés instantanés VSS)',
      html: [
        '<p>La fonctionnalité native <strong>Windows Server Backup</strong> (installée via <code>Install-WindowsFeature Windows-Server-Backup</code>) s’appuie sur le service <strong>VSS (Volume Shadow Copy Service)</strong> pour réaliser des sauvegardes à chaud cohérentes sans interrompre Active Directory ni les bases de données :</p>',
        '<ul>',
        '  <li><strong>Architecture des clichés instantanés VSS :</strong> le <em>VSS Requestor</em> (<code>wbadmin</code> ou agent tiers) interroge les <em>VSS Writers</em> applicatifs (NTDS pour Active Directory, SQL Server, Hyper-V) afin de purger les tampons en mémoire et de geler brièvement les écritures pendant que le <em>VSS Provider</em> prend un cliché instantané (<em>Shadow Copy</em>) en lecture seule du volume. Sur les partages de fichiers, les clichés VSS permettent aussi aux utilisateurs de restaurer leurs <strong>Versions précédentes (Previous Versions)</strong> en autonomie.</li>',
        '  <li><strong>Sauvegarde System State (État du système) :</strong> <code>wbadmin start systemstatebackup -backupTarget:E: -quiet</code> sauvegarde la base Active Directory (<code>ntds.dit</code>), le dossier <code>SYSVOL</code>, le Registre, les fichiers système protégés et la base de certificats AD CS. En cas de suppression accidentelle d’une OU, on redémarre en mode <strong>DSRM (Directory Services Restore Mode)</strong> pour exécuter une restauration <em>non-autoritative</em> suivie d’un marquage <strong>autoritatif</strong> via <code>ntdsutil</code>.</li>',
        '  <li><strong>Bare-Metal Recovery (BMR — Restauration sur matériel vierge) :</strong> <code>wbadmin start backup -backupTarget:\\\\nas\\backups -allCritical -systemState -vssFull -quiet</code> capture l’intégralité des volumes critiques, la partition EFI/boot et l’état système pour reconstruire le serveur à l’identique sur un nouveau serveur physique ou virtuel depuis l’environnement de récupération Windows RE.</li>',
        '</ul>',
        box('tech', 'Commandes clés wbadmin et vssadmin en production', 'terminal',
          '    <p>Lister les sauvegardes disponibles : <code>wbadmin get versions</code> ; consulter les éléments d’un jeu : <code>wbadmin get items -version:11/15/2026-02:00</code> ; inspecter les clichés instantanés VSS actifs : <code>vssadmin list shadows</code> et redimensionner l’espace réservé aux clichés : <code>vssadmin resize shadowstorage /for=D: /on=D: /maxsize=20%</code>.</p>')
      ].join('\n')
    },
    {
      title: 'Gestionnaire de ressources du serveur de fichiers (FSRM), WSUS et surveillance d’événements / performances',
      html: [
        '<p>Le rôle <strong>FSRM (File Server Resource Manager — Gestionnaire de ressources du serveur de fichiers)</strong> protège les serveurs de fichiers SMB contre la saturation disque et les dépôts illicites ou malveillants :</p>',
        '<table><thead><tr><th>Brique d’administration</th><th>Mécanisme sous Windows Server</th><th>Commandes PowerShell &amp; bonnes pratiques</th></tr></thead><tbody>',
        '<tr><td><strong>Quotas FSRM</strong></td><td>Un quota <strong>strict (Hard Quota)</strong> bloque toute écriture dès la limite atteinte (ex. 10 Go par dossier de service) ; un quota <strong>souple (Soft Quota)</strong> laisse écrire mais déclenche des alertes e-mail, journaux d’événements ou scripts à 85 %, 95 % et 100 %.</td><td><code>New-FsrmQuotaTemplate</code>, <code>New-FsrmQuota -Path "D:\\Partages\\Compta" -Size 10GB</code></td></tr>',
        '<tr><td><strong>Filtrage de fichiers FSRM</strong> (<em>File Screening</em>)</td><td>Bloque des groupes d’extensions (exécutables <code>.exe/.ps1</code>, multimédias <code>.mp4/.iso</code>, ou extensions connues de rançongiciels). Le filtrage <strong>actif</strong> refuse l’écriture ; le filtrage <strong>passif</strong> autorise mais journalise pour audit.</td><td><code>New-FsrmFileGroup</code>, <code>New-FsrmFileScreen -Path "D:\\Partages" -IncludeGroup @("Exécutables") -Active</code></td></tr>',
        '<tr><td><strong>WSUS</strong> (<em>Windows Server Update Services</em>)</td><td>Centralise le téléchargement des correctifs Microsoft, segmente les machines en <strong>groupes d’ordinateurs</strong> (<em>Anneau Pilote / Test</em> puis <em>Production</em>) pilotés par GPO et contrôle l’<strong>approbation</strong> (<em>Approve / Decline</em>) et les rapports de conformité.</td><td>GPO <code>Specify intranet Microsoft update service location</code>, <code>Get-WsusServer</code>, <code>Approve-WsusUpdate</code></td></tr>',
        '<tr><td><strong>Surveillance d’événements &amp; performances</strong></td><td>Corrélation des journaux dans l’<strong>observateur d’événements (Event Viewer)</strong> (IDs sécurité <code>4624</code> connexion, <code>4625</code> échec, <code>4720</code> création de compte, <code>4740</code> verrouillage, <code>1102</code> purge d’audit) et suivi des compteurs <strong>Performance Monitor (PerfMon)</strong> (CPU, <code>Available MBytes</code>, latence disque <code>Avg. Disk sec/Read</code> &lt; 15 ms).</td><td><code>Get-WinEvent -FilterHashtable @{LogName=\'Security\'; Id=4625}</code>, <code>Get-Counter</code>, abonnements WEF.</td></tr>',
        '</tbody></table>'
      ].join('\n')
    },
    {
      title: 'Le snapshot',
      html: [
        '<p>Un <strong>snapshot</strong> (instantané) permet un retour à un état antérieur de la VM, ' +
        'mais son contenu dépend du produit et du type choisi. Dans Hyper-V, un checkpoint ' +
        '<strong>standard</strong> capture aussi la mémoire ; un checkpoint de <strong>production</strong> ' +
        'est créé sans capture de la mémoire, avec VSS ou le gel du système de fichiers invité.</p>',
        '<p>Source : <a href="https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/checkpoints">documentation Microsoft des checkpoints Hyper-V</a>, consultée le 30 octobre 2026.</p>',
        '<p>Deux précautions : les snapshots <strong>consomment de l’espace disque</strong> au fil du ' +
        'temps, et il ne faut <strong>pas les conserver longtemps</strong> en production.</p>',
        '<table><thead><tr><th>Critère</th><th>Snapshot</th><th>Sauvegarde</th></tr></thead><tbody>',
        '<tr><td>Conservation</td><td>Temporaire (court terme)</td><td>Long terme</td></tr>',
        '<tr><td>Utilité</td><td>Revenir avant/après un changement</td><td>Restaurer après une perte</td></tr>',
        '<tr><td>Espace disque</td><td>Consomme de plus en plus</td><td>Planifié</td></tr>',
        '</tbody></table>',
        box('pitfall', 'Snapshot n’est pas sauvegarde', 'warning',
          '    <p>Un snapshot vit sur le même stockage que la VM : si le stockage disparaît, le ' +
          'snapshot aussi. Il ne remplace jamais une sauvegarde hors site.</p>')
      ].join('\n')
    },
    {
      title: 'Clones complet et lié',
      html: [
        '<p>Un <strong>clone</strong> est une copie d’une VM existante. Deux variantes :</p>',
        '<ul>',
        '  <li><strong>Clone complet</strong> : copie indépendante (fichiers disque et configuration). ' +
        'Il fonctionne même si la VM d’origine est supprimée.</li>',
        '  <li><strong>Clone lié</strong> (linked clone) : la nouvelle VM partage une partie de ses ' +
        'fichiers disque avec l’originale. Moins gourmand en espace, mais <strong>dépendant de la ' +
        'source</strong> : si elle est supprimée, le clone lié ne fonctionne plus.</li>',
        '</ul>',
        '<table><thead><tr><th>Critère</th><th>Clone complet</th><th>Clone lié</th></tr></thead><tbody>',
        '<tr><td>Indépendance</td><td>Totale</td><td>Dépend de la source</td></tr>',
        '<tr><td>Espace disque</td><td>Plus volumineux</td><td>Moins gourmand</td></tr>',
        '<tr><td>Si la source est supprimée</td><td>Continue de fonctionner</td><td>Ne fonctionne plus</td></tr>',
        '</tbody></table>'
      ].join('\n')
    },
    {
      title: 'Templates et vMotion',
      html: [
        '<p>Un <strong>template</strong> est une VM préconfigurée et souvent figée en lecture seule : ' +
        'système installé, outils de base, paramètres réseau et sécurité prédéfinis. Il sert de ' +
        '<strong>modèle</strong> pour créer de nouvelles VM, ce qui standardise les déploiements, fait ' +
        'gagner du temps et garantit la cohérence.</p>',
        '<p><strong>vMotion</strong> migre une VM <strong>en cours d’exécution</strong> d’un hôte ' +
        'physique vers un autre en cherchant à limiter l’interruption. Une courte <strong>pause</strong> ' +
        'de bascule subsiste et peut perturber certaines applications sensibles ; le résultat dépend de ' +
        'la charge, du réseau et de la configuration.</p>',
        box('tech', 'Un template, des déploiements', 'layers',
          '    <p>Un template bien tenu contient les mises à jour et les bases de sécurité à jour. ' +
          'Chaque VM créée en hérite : le déploiement devient reproductible plutôt qu’artisanal.</p>')
      ].join('\n')
    },
    {
      title: 'Cluster HA et sauvegarde Veeam',
      html: [
        '<p>La fonctionnalité essentielle pour la haute disponibilité des VM est le <strong>cluster de ' +
        'virtualisation</strong>. Avec un <strong>cluster HA</strong>, les VM redémarrent ' +
        'automatiquement sur un autre hôte disponible en cas de panne, ce qui minimise l’impact des ' +
        'défaillances matérielles.</p>',
        '<p><strong>Veeam</strong> est un outil de <strong>sauvegarde automatique</strong> des VM. Il ' +
        'configure des sauvegardes quotidiennes et permet de restaurer rapidement une VM supprimée par ' +
        'erreur.</p>',
        '<p>Bonnes pratiques : documenter chaque action, surveiller les performances avec vCenter, ' +
        'prendre un snapshot avant chaque mise à jour majeure, configurer des sauvegardes automatiques ' +
        'et activer la HA.</p>',
        box('intuition', 'Plusieurs filets, pas un seul', 'lightbulb',
          '    <p>Snapshot pour un retour immédiat, sauvegarde Veeam pour la perte durable, cluster HA ' +
          'pour la panne matérielle : trois protections pour trois menaces différentes. En cumuler ' +
          'plusieurs, c’est couvrir tous les scénarios.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Que capture un checkpoint Hyper-V de production ?', opts: ['Un état cohérent sans mémoire de la VM', 'Toujours la mémoire de la VM', 'Seulement le réseau'], correct: 0, exp: 'La capture de mémoire caractérise le checkpoint standard, pas le checkpoint de production.' },
    { stem: 'Durée de conservation d’un snapshot ?', opts: ['Permanente', 'Long terme', 'Temporaire'], correct: 2, exp: 'Il ne doit pas rester longtemps en production.' },
    { stem: 'Que fait un clone complet ?', opts: ['Supprime la source', 'Partage les disques', 'Copie indépendante de la VM'], correct: 2, exp: 'Il fonctionne même si la source est supprimée.' },
    { stem: 'Faiblesse d’un clone lié ?', opts: ['Il dépend de la VM source', 'Il est trop gros', 'Il est trop lent'], correct: 0, exp: 'Si la source est supprimée, il cesse de fonctionner.' },
    { stem: 'À quoi sert un template ?', opts: ['Sauvegarder les données', 'Standardiser les déploiements', 'Migrer à chaud'], correct: 1, exp: "Un template est un modèle de VM préconfigurée : il standardise les déploiements et garantit des machines identiques. Il ne sauvegarde rien et ne migre rien à chaud." },
    { stem: 'Que fait vMotion ?', opts: ["Migrer une VM à chaud avec une pause de bascule","Éteindre un hôte pour vider sa mémoire","Cloner un template vers un nouvel hôte"], correct: 0, exp: "vMotion déplace la VM vers un autre hôte en limitant l’interruption — une courte pause de bascule, sans extinction d’hôte ni clonage." },
    { stem: 'En cas de panne, que fait un cluster HA ?', opts: ['Réinstalle ESXi', 'Efface les snapshots', 'Redémarre les VM sur un autre hôte'], correct: 2, exp: 'Les VM redémarrent automatiquement ailleurs.' },
    { stem: 'Que permet Veeam ?', opts: ["Compiler du code sur les machines virtuelles","Sauvegarde automatique et restauration rapide","Créer des réseaux virtuels entre machines"], correct: 1, exp: "Veeam sauvegarde automatiquement les VM et restaure rapidement — restauration instantanée incluse. Il ne compile aucun code et ne crée aucun réseau." },
    { stem: 'Quel service Windows Server coordonne les Writers applicatifs (AD DS, SQL) pour capturer une sauvegarde wbadmin cohérente à chaud ?', opts: ['VSS (Volume Shadow Copy Service)', 'DHCP Relay Agent', 'Routing and Remote Access'], correct: 0, exp: 'Le service VSS (Volume Shadow Copy Service) orchestre les Writers applicatifs pour geler proprement les écritures et créer un cliché instantané cohérent.' },
    { stem: 'Dans FSRM, quelle est la différence entre un quota strict (Hard) et un quota souple (Soft) ?', opts: ['Aucune différence fonctionnelle', 'Le quota strict bloque l’écriture au seuil ; le quota souple autorise le dépassement et alerte', 'Le quota souple supprime automatiquement les fichiers anciens'], correct: 1, exp: 'Dans FSRM, un quota strict (Hard Quota) empêche immédiatement d’écrire au-delà de la limite, tandis qu’un quota souple (Soft Quota) laisse l’écriture aboutir mais génère des alertes et événements.' }
  ],

  pitfalls: [
    'Oublier d’inclure l’état du système (System State) et l’option Bare-Metal Recovery dans la sauvegarde wbadmin des contrôleurs de domaine.',
    'Appliquer un filtrage de fichiers FSRM actif en production sans l’avoir d’abord validé en mode passif (audit).',
    'Confondre snapshot et sauvegarde : le snapshot ne protège pas d’une perte du stockage.',
    'Conserver des snapshots pendant des semaines en production.',
    'Supprimer la VM source d’un clone lié, qui cesse alors de fonctionner.'
  ],

  methodTitle: 'Sauvegarder, gouverner les ressources (FSRM / WSUS) et protéger les VM',
  method: [
    '<strong>Sauvegarder</strong> l’état du système et le serveur nu avec Windows Server Backup (<code>wbadmin</code>) et les clichés instantanés VSS.',
    '<strong>Encadrer</strong> les partages SMB via FSRM (quotas stricts/souples et filtrage d’extensions actif/passif) et piloter les correctifs par anneaux dans WSUS.',
    '<strong>Surveiller</strong> proactivement les journaux Event Viewer (<code>Get-WinEvent</code>) et les compteurs Performance Monitor (<code>Get-Counter</code>).',
    '<strong>Prendre</strong> un snapshot court terme avant tout changement critique, puis le purger après validation.',
    '<strong>Protéger</strong> durablement les machines virtuelles par les templates, le cluster HA et la sauvegarde Veeam.'
  ],

  summary: [
    'Windows Server Backup (wbadmin) : sauvegarde System State, Bare-Metal Recovery (BMR) et clichés instantanés VSS cohérents à chaud.',
    'FSRM : quotas stricts (Hard) ou souples (Soft) et filtrage de fichiers (File Screening) actif ou passif sur les partages SMB.',
    'WSUS et surveillance : groupes d’ordinateurs et approbation de correctifs ; Event Viewer (4624, 4625, 4740) et Performance Monitor.',
    'Checkpoint Hyper-V : standard avec mémoire ; production sans mémoire ; aucun ne remplace une sauvegarde.',
    'Clone complet vs lié, Template, vMotion (migration à chaud avec courte pause), Cluster HA et Veeam.'
  ],

  checklist: [
    'Je sais sauvegarder et restaurer un serveur avec Windows Server Backup (wbadmin, BMR, System State et VSS).',
    'Je configure des quotas et un filtrage de fichiers dans FSRM ainsi que les groupes d’approbation WSUS.',
    'J’exploite Event Viewer (Get-WinEvent) et Performance Monitor pour diagnostiquer un serveur.',
    'Je distingue snapshot et sauvegarde et je situe clone complet/lié, template, vMotion, cluster HA et Veeam.'
  ],

  notions: ['Windows Server Backup', 'wbadmin', 'Bare-Metal Recovery', 'BMR', 'System State', 'VSS', 'Volume Shadow Copy Service', 'FSRM', 'quotas', 'filtrage de fichiers', 'File Screening', 'WSUS', 'Event Viewer', 'Get-WinEvent', 'Performance Monitor', 'PerfMon', 'snapshot', 'instantané', 'clone complet', 'clone lié', 'linked clone', 'template', 'vMotion', 'cluster HA', 'Veeam', 'restauration', 'bonnes pratiques'],
  mastery: [
    { cls: 'low', text: '&lt; 50 % — Reprenez le rôle de VSS/wbadmin, les quotas FSRM et la différence snapshot / sauvegarde.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur FSRM, WSUS et les clones complet / lié.' },
    { cls: 'good', text: '70–94 % — Solide : vous administrez wbadmin, FSRM, WSUS et la protection des VM.' },
    { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est bouclé, place aux examens blancs.' }
  ],

  flashcards: [
    { q: 'Rôle de wbadmin, BMR et VSS sous Windows Server ?', a: 'wbadmin pilote Windows Server Backup (System State et Bare-Metal Recovery BMR) en s’appuyant sur les clichés instantanés VSS cohérents à chaud.' },
    { q: 'Quelles sont les deux fonctions majeures de FSRM ?', a: 'Les quotas d’espace disque (stricts Hard ou souples Soft) et le filtrage de fichiers par extension (File Screening actif ou passif).' },
    { q: 'Checkpoint Hyper-V de production ou standard ?', a: 'Production : état cohérent sans mémoire ; standard : capture aussi la mémoire.' },
    { q: 'Snapshot vs sauvegarde ?', a: 'Snapshot : court terme ; sauvegarde : long terme.' },
    { q: 'Clone complet ?', a: 'Copie indépendante, fonctionne même si la source est supprimée.' },
    { q: 'Clone lié ?', a: 'Partage des disques avec la source : moins d’espace mais dépendant.' },
    { q: 'À quoi sert vMotion ?', a: 'Migrer une VM en cours d’exécution avec une courte pause de bascule possible.' },
    { q: 'Que protège un cluster HA ?', a: 'Il redémarre automatiquement les VM sur un autre hôte.' }
  ]
};
