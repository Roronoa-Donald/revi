/**
 * Chapitres 4 à 6 du cours « Windows Server » B2 :
 * - Chapitre 4 : Maintenance préventive, corrective et évolutive de Windows Server.
 * - Chapitre 5 : Stratégies de groupe avancées (GPO, héritage LSDOU, application forcée Enforced,
 *   filtrage de sécurité et filtres WMI), Réplication Active Directory multi-sites (KCC, sites, liens),
 *   les 5 rôles FSMO (Schema Master, Domain Naming Master, RID Master, PDC Emulator, Infrastructure Master),
 *   gestion Hyper-V sous Windows Server (VHDX, vSwitch) et virtualisation VMware.
 * - Chapitre 6 : Sauvegarde et restauration Windows Server Backup (wbadmin, Bare-Metal Recovery BMR,
 *   System State, clichés instantanés VSS / Volume Shadow Copy Service), Gestionnaire de ressources
 *   du serveur de fichiers (FSRM : quotas stricts/souples et filtrage de fichiers File Screening),
 *   WSUS (Windows Server Update Services), surveillance d’événements (Event Viewer / Get-WinEvent)
 *   et de performances (Performance Monitor / PerfMon), snapshots, clones, templates, vMotion et Veeam.
 */
'use strict';

module.exports = [
  require('./chapitre4'),
  require('./chapitre5'),
  require('./chapitre6')
];
