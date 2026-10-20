/**
 * Catalogue des 18 exercices shell du cours « Administration Windows » B1,
 * aligné sur les supports B1 du module (Dr Abasse KPEGOUNI, « cours B1 IT /
 * ADMIN_WINDOWS ») : administration système, Windows Server 2012 R2 (éditions,
 * Core/GUI, SAM), configuration initiale (Gestionnaire de serveur, pare-feu,
 * nom, IP statique, activation, accès à distance), Active Directory AD DS
 * (hiérarchie domaine/arbre/forêt, installation du rôle, objets AD DS).
 *
 * Chapitre 1 : l'administration système et l'administrateur.
 * Chapitre 2 : Windows Server 2012 R2 — éditions et installation.
 * Chapitre 3 : configuration initiale du serveur.
 * Chapitre 4 : Active Directory — notions (domaine, arbre, forêt).
 * Chapitre 5 : installer un contrôleur de domaine AD DS.
 * Chapitre 6 : gérer les objets AD DS (UO, utilisateurs, groupes).
 *
 * Conventions : language 'shell', ids 'aw-cN-eM', niveaux n1/n2/n3, entrées
 * stdin mono-mots terminées par \n, exemple distinct des tests cachés.
 */
'use strict';

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — L'administration système et l'administrateur
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'aw-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Les familles de tâches de l’administrateur',
    goal: 'Ranger chaque tâche du support dans sa famille : comptes, logiciels, matériel, sécurité.',
    brief: '<p>Le script lit <strong>n lignes</strong> « tache famille » : famille est un code parmi ' +
      '<code>comptes</code>, <code>logiciels</code>, <code>materiel</code> ou <code>securite</code>. ' +
      'Tâches du support : gérer les comptes utilisateurs → <code>comptes</code> ; installer, ' +
      'configurer, patcher → <code>logiciels</code> ; panne, remplacement, ajout → <code>materiel</code> ; ' +
      'sauvegardes fiables et contrôle d’accès → <code>securite</code>. Pour chaque ligne il affiche ' +
      '<code>tache : OK</code> ou <code>tache : ERREUR</code>, puis <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r tache famille
  # À compléter : la famille attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur la tâche : comptes → comptes, installer/configurer/patcher → logiciels, panne/remplacement/ajout → materiel, sauvegardes/acces → securite.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\ncomptes comptes\ninstaller logiciels\npanne materiel\n', expected: 'comptes : OK\ninstaller : OK\npanne : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Les quatre familles', stdin: '4\ncomptes comptes\npatcher logiciels\nremplacement materiel\nacces securite\n', expected: 'comptes : OK\npatcher : OK\nremplacement : OK\nacces : OK\ncorrectes : 4/4' },
      { label: 'Trois confusions', stdin: '4\ninstaller materiel\npanne securite\nsauvegardes comptes\nacces securite\n', expected: 'installer : ERREUR\npanne : ERREUR\nsauvegardes : ERREUR\nacces : OK\ncorrectes : 1/4' },
      { label: 'Journée d’admin', stdin: '5\nconfigurer logiciels\najout materiel\nsauvegardes securite\ncomptes comptes\npatcher logiciels\n', expected: 'configurer : OK\najout : OK\nsauvegardes : OK\ncomptes : OK\npatcher : OK\ncorrectes : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r tache famille
  case "$tache" in
    comptes) attendu="comptes" ;;
    installer|configurer|patcher) attendu="logiciels" ;;
    panne|remplacement|ajout) attendu="materiel" ;;
    sauvegardes|acces) attendu="securite" ;;
  esac
  if [ "$famille" = "$attendu" ]; then
    echo "$tache : OK"
    ok=$((ok + 1))
  else
    echo "$tache : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'aw-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Les trois types d’administration',
    goal: 'Décider à quel type d’administration répond chaque besoin.',
    brief: '<p>Le support distingue trois types d’administration : d’un <strong>poste</strong> (station de ' +
      'travail), des <strong>serveurs</strong>, et <strong>réseau</strong> (liaisons et accès distants). ' +
      'Le script lit <strong>n lignes</strong> « besoin type » : type est un code parmi <code>poste</code>, ' +
      '<code>serveurs</code> ou <code>reseau</code>. Besoins : mettre à jour le PC d’un stagiaire → ' +
      '<code>poste</code> ; installer un rôle sur un serveur → <code>serveurs</code> ; configurer l’accès ' +
      'distant d’un site → <code>reseau</code> ; remplacer le disque d’un portable → <code>poste</code> ; ' +
      'héberger le dossier partagé de l’entreprise → <code>serveurs</code>. Pour chaque ligne il affiche ' +
      '<code>besoin : OK</code> ou <code>besoin : ERREUR</code>, puis <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r besoin type
  # À compléter : le type attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le besoin : stagiaire/portable → poste, role/partage → serveurs, distant/site → reseau.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nstagiaire poste\nrole serveurs\ndistant reseau\n', expected: 'stagiaire : OK\nrole : OK\ndistant : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Parc mixte', stdin: '5\nportable poste\npartage serveurs\nsite reseau\nrole serveurs\nstagiaire poste\n', expected: 'portable : OK\npartage : OK\nsite : OK\nrole : OK\nstagiaire : OK\ncorrectes : 5/5' },
      { label: 'Trois erreurs', stdin: '4\nstagiaire serveurs\nrole poste\nsite serveurs\ndistant reseau\n', expected: 'stagiaire : ERREUR\nrole : ERREUR\nsite : ERREUR\ndistant : OK\ncorrectes : 1/4' },
      { label: 'Tour de service', stdin: '5\nsite reseau\npartage serveurs\nportable poste\ndistant reseau\nrole serveurs\n', expected: 'site : OK\npartage : OK\nportable : OK\ndistant : OK\nrole : OK\ncorrectes : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r besoin type
  case "$besoin" in
    stagiaire|portable) attendu="poste" ;;
    role|partage) attendu="serveurs" ;;
    distant|site) attendu="reseau" ;;
  esac
  if [ "$type" = "$attendu" ]; then
    echo "$besoin : OK"
    ok=$((ok + 1))
  else
    echo "$besoin : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'aw-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'La charge du jour : tâches normales et grosses',
    goal: 'Mesurer la charge quotidienne de l’administrateur : petites et grosses tâches.',
    brief: '<p>Le support rappelle que l’administrateur « gère quotidiennement de multiples tâches, ' +
      'petites ou grosses ». Le script lit <strong>n lignes</strong> « tache duree » (durée en minutes). ' +
      'Une tâche de <strong>30 minutes ou plus</strong> est grosse, sinon normale. Pour chaque ligne il ' +
      'affiche <code>tache : normale</code> ou <code>tache : grosse</code>, puis <code>charge : X min</code> ' +
      '(somme des durées) et <code>grosses : Y</code>.</p>',
    starter: `read -r n
total=0
grosses=0
for ((i=0; i<n; i++)); do
  read -r tache duree
  # À compléter : classement, somme des durées, compteur des grosses.
done
# À compléter : les deux bilans.
`,
    hints: [
      'Test de classement : duree -ge 30 → grosse, sinon normale ; la somme progresse dans les deux cas.',
      'Les deux bilans sortent une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\npatch 45\ncomptes 10\nsauvegarde 30\n', expected: 'patch : grosse\ncomptes : normale\nsauvegarde : grosse\ncharge : 85 min\ngrosses : 2' }
    ],
    tests: [
      { label: 'Journée chargée', stdin: '4\ncomptes 15\npanne 60\nmails 5\nupdate 30\n', expected: 'comptes : normale\npanne : grosse\nmails : normale\nupdate : grosse\ncharge : 110 min\ngrosses : 2' },
      { label: 'Que des petites', stdin: '3\nmails 5\ncomptes 10\ncheck 14\n', expected: 'mails : normale\ncomptes : normale\ncheck : normale\ncharge : 29 min\ngrosses : 0' },
      { label: 'Frontière exacte', stdin: '3\na 29\nb 30\nc 31\n', expected: 'a : normale\nb : grosse\nc : grosse\ncharge : 90 min\ngrosses : 2' }
    ],
    solution: `read -r n
total=0
grosses=0
for ((i=0; i<n; i++)); do
  read -r tache duree
  total=$((total + duree))
  if [ "$duree" -ge 30 ]; then
    echo "$tache : grosse"
    grosses=$((grosses + 1))
  else
    echo "$tache : normale"
  fi
done
echo "charge : $total min"
echo "grosses : $grosses"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Windows Server 2012 R2 : éditions et installation
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'aw-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Les quatre éditions de Windows Server 2012',
    goal: 'Associer chaque édition à sa limite : utilisateurs ou machines virtuelles.',
    brief: '<p>Le script lit <strong>n lignes</strong> « edition limite » : limite est un code parmi ' +
      '<code>u15</code>, <code>u25</code>, <code>vm2</code> ou <code>vmillimite</code>. Éditions du ' +
      'support : <strong>Foundation</strong> (15 utilisateurs, pas de virtualisation) → <code>u15</code> ; ' +
      '<strong>Essential</strong> (25 utilisateurs) → <code>u25</code> ; <strong>Standard</strong> ' +
      '(2 machines virtuelles couvertes) → <code>vm2</code> ; <strong>Datacenter</strong> (machines ' +
      'virtuelles illimitées) → <code>vmillimite</code>. Pour chaque ligne il affiche <code>edition : ' +
      'OK</code> ou <code>edition : ERREUR</code>, puis <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r edition limite
  # À compléter : la limite attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur l’édition : foundation → u15, essential → u25, standard → vm2, datacenter → vmillimite.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nfoundation u15\nessential u25\ndatacenter vmillimite\n', expected: 'foundation : OK\nessential : OK\ndatacenter : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Les quatre éditions', stdin: '4\nfoundation u15\nessential u25\nstandard vm2\ndatacenter vmillimite\n', expected: 'foundation : OK\nessential : OK\nstandard : OK\ndatacenter : OK\ncorrectes : 4/4' },
      { label: 'Trois confusions', stdin: '4\nstandard vmillimite\ndatacenter vm2\nfoundation u25\nessential u25\n', expected: 'standard : ERREUR\ndatacenter : ERREUR\nfoundation : ERREUR\nessential : OK\ncorrectes : 1/4' },
      { label: 'Fiche catalogue', stdin: '4\ndatacenter vmillimite\nstandard vm2\nessential u25\nfoundation u15\n', expected: 'datacenter : OK\nstandard : OK\nessential : OK\nfoundation : OK\ncorrectes : 4/4' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r edition limite
  case "$edition" in
    foundation) attendu="u15" ;;
    essential) attendu="u25" ;;
    standard) attendu="vm2" ;;
    datacenter) attendu="vmillimite" ;;
  esac
  if [ "$limite" = "$attendu" ]; then
    echo "$edition : OK"
    ok=$((ok + 1))
  else
    echo "$edition : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'aw-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Configuration requise : installable ou pas ?',
    goal: 'Vérifier la configuration requise de Windows Server 2012 R2 machine par machine.',
    brief: '<p>Configuration requise du support : 2 Go de RAM minimum (8 recommandés), 60 Go d’espace ' +
      'disque. Le script lit <strong>n lignes</strong> « poste ram disque » (ram et disque en Go). Pour ' +
      'chaque poste il affiche <code>poste : installable</code> si les deux minimums sont atteints, sinon ' +
      '<code>poste : a renforcer (motif)</code> avec motif = <code>ram</code>, <code>disque</code> ou ' +
      '<code>les-deux</code> (dans cet ordre de priorité), puis <code>installables : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r poste ram disque
  # À compléter : les deux contrôles, les trois motifs, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Test ram d’abord : ram -lt 2 → a renforcer (ram) ou (les-deux) selon le disque.',
      'Puis disque : disque -lt 60 → a renforcer (disque) ; sinon installable, compteur incrémenté.'
    ],
    examples: [
      { stdin: '3\nA 8 60\nB 1 100\nC 4 30\n', expected: 'A : installable\nB : a renforcer (ram)\nC : a renforcer (disque)\ninstallables : 1/3' }
    ],
    tests: [
      { label: 'Salle serveur', stdin: '4\nSRV1 8 120\nSRV2 2 60\nSRV3 1 30\nSRV4 2 59\n', expected: 'SRV1 : installable\nSRV2 : installable\nSRV3 : a renforcer (les-deux)\nSRV4 : a renforcer (disque)\ninstallables : 2/4' },
      { label: 'Que le disque manque', stdin: '3\nP1 8 50\nP2 4 59\nP3 16 60\n', expected: 'P1 : a renforcer (disque)\nP2 : a renforcer (disque)\nP3 : installable\ninstallables : 1/3' },
      { label: 'Juste aux minimums', stdin: '3\nMIN 2 60\nMOINS 1 60\nPLUS 8 100\n', expected: 'MIN : installable\nMOINS : a renforcer (ram)\nPLUS : installable\ninstallables : 2/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r poste ram disque
  if [ "$ram" -lt 2 ] && [ "$disque" -lt 60 ]; then
    echo "$poste : a renforcer (les-deux)"
  elif [ "$ram" -lt 2 ]; then
    echo "$poste : a renforcer (ram)"
  elif [ "$disque" -lt 60 ]; then
    echo "$poste : a renforcer (disque)"
  else
    echo "$poste : installable"
    ok=$((ok + 1))
  fi
done
echo "installables : $ok/$n"
`
  },
  {
    id: 'aw-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'SAM et ouverture de session',
    goal: 'Former la bonne syntaxe de session selon le contexte du support.',
    brief: '<p>Le script lit <strong>n lignes</strong> « contexte identite machine » où machine est le nom ' +
      'utilisé dans la syntaxe. Contextes du support : session <strong>locale</strong> (base SAM locale) → ' +
      '<code>machine\\utilisateur</code> ; session <strong>domaine-netbios</strong> → ' +
      '<code>NETBIOS\\identite</code> ; session <strong>domaine-upn</strong> → ' +
      '<code>identite@machine</code>. Pour chaque ligne il affiche la syntaxe formée ' +
      '<code>contexte : syntaxe</code>, puis <code>sessions : n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r contexte identite machine
  # À compléter : la syntaxe selon le contexte.
done
# À compléter : le bilan.
`,
    hints: [
      'Locale et domaine-netbios utilisent l’antislash : machine\\utilisateur, machine\\identite.',
      'Domaine-upn utilise l’arobase : identite@machine (forme adresse e-mail).'
    ],
    examples: [
      { stdin: '3\nlocale admin SRV2012\ndomaine-netbios admin CDP\ndomaine-upn admin cdp.org\n', expected: 'locale : SRV2012\\admin\ndomaine-netbios : CDP\\admin\ndomaine-upn : admin@cdp.org\nsessions : 3' }
    ],
    tests: [
      { label: 'Session locale', stdin: '2\nlocale admin VM2012R2TEST\nlocale root SERVEUR1\n', expected: 'locale : VM2012R2TEST\\admin\nlocale : SERVEUR1\\root\nsessions : 2' },
      { label: 'Deux formes de domaine', stdin: '4\ndomaine-netbios iziti NTIC\ndomaine-upn iziti ntic.ma\ndomaine-netbios ilham NTIC\ndomaine-upn ilham ntic.ma\n', expected: 'domaine-netbios : NTIC\\iziti\ndomaine-upn : iziti@ntic.ma\ndomaine-netbios : NTIC\\ilham\ndomaine-upn : ilham@ntic.ma\nsessions : 4' },
      { label: 'Contextes mélangés', stdin: '3\ndomaine-upn admin cdp.org\nlocale admin SRV-AD\ndomaine-netbios admin CDP\n', expected: 'domaine-upn : admin@cdp.org\nlocale : SRV-AD\\admin\ndomaine-netbios : CDP\\admin\nsessions : 3' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r contexte identite machine
  sep='\\'
  case "$contexte" in
    locale) echo "$contexte : $machine$sep$identite" ;;
    domaine-netbios) echo "$contexte : $machine$sep$identite" ;;
    domaine-upn) echo "$contexte : $identite@$machine" ;;
  esac
done
echo "sessions : $n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Configuration initiale du serveur
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'aw-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Le Gestionnaire de serveur : qui fait quoi ?',
    goal: 'Rattacher chaque action à l’onglet du Gestionnaire de serveur.',
    brief: '<p>Le script lit <strong>n lignes</strong> « action onglet » : onglet est un code parmi ' +
      '<code>tableaudebord</code>, <code>serveurlocal</code>, <code>notifications</code> ou ' +
      '<code>outils</code>. Actions du support : ajouter des rôles et fonctionnalités, créer un groupe de ' +
      'serveurs → <code>tableaudebord</code> ; renommer la machine, configurer la carte réseau, activer ' +
      'le bureau à distance → <code>serveurlocal</code> ; lire les messages d’erreur après l’installation ' +
      'd’un rôle → <code>notifications</code> ; ouvrir la console Pare-feu avec fonctions avancées → ' +
      '<code>outils</code>. Pour chaque ligne il affiche <code>action : OK</code> ou <code>action : ' +
      'ERREUR</code>, puis <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r action onglet
  # À compléter : l'onglet attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur l’action : roles/groupes → tableaudebord, renommer/carte/bureau → serveurlocal, erreurs → notifications, parefeu → outils.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nroles tableaudebord\nrenommer serveurlocal\nparefeu outils\n', expected: 'roles : OK\nrenommer : OK\nparefeu : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Visite guidée', stdin: '4\nroles tableaudebord\ngroupes tableaudebord\ncarte serveurlocal\nerreurs notifications\n', expected: 'roles : OK\ngroupes : OK\ncarte : OK\nerreurs : OK\ncorrectes : 4/4' },
      { label: 'Trois erreurs', stdin: '4\nroles outils\nerreurs tableaudebord\nrenommer notifications\nbureau serveurlocal\n', expected: 'roles : ERREUR\nerreurs : ERREUR\nrenommer : ERREUR\nbureau : OK\ncorrectes : 1/4' },
      { label: 'Prise en main', stdin: '5\nparefeu outils\nbureau serveurlocal\nerreurs notifications\nroles tableaudebord\ncarte serveurlocal\n', expected: 'parefeu : OK\nbureau : OK\nerreurs : OK\nroles : OK\ncarte : OK\ncorrectes : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r action onglet
  case "$action" in
    roles|groupes) attendu="tableaudebord" ;;
    renommer|carte|bureau) attendu="serveurlocal" ;;
    erreurs) attendu="notifications" ;;
    parefeu) attendu="outils" ;;
  esac
  if [ "$onglet" = "$attendu" ]; then
    echo "$action : OK"
    ok=$((ok + 1))
  else
    echo "$action : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'aw-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Pare-feu : les trois profils',
    goal: 'Vérifier que les trois profils du pare-feu sont traités comme l’exige le support.',
    brief: '<p>Le support est formel : « il faut bien penser à désactiver le pare-feu pour les 3 profils » ' +
      '(domaine, privé, public). Le script lit <strong>3 lignes</strong> « profil etat » dans cet ordre ' +
      '(domaine, prive, public) ; etat vaut <code>actif</code> ou <code>inactif</code>. Pour chaque profil ' +
      'il affiche <code>profil : a desactiver</code> s’il est actif, sinon <code>profil : ok</code>, puis ' +
      '<code>a desactiver : X/3</code> — et si les trois profils sont inactifs, une dernière ligne ' +
      '<code>pare-feu pret</code>.</p>',
    starter: `ok=0
for ((i=1; i<=3; i++)); do
  read -r profil etat
  # À compléter : verdict par profil, compteur des actifs.
done
# À compléter : bilan + verdict final si rien à désactiver.
`,
    hints: [
      'etat = actif → « a desactiver » et compteur incrémenté ; sinon « ok ».',
      'Après la boucle : si ok = 0, afficher « pare-feu pret ».'
    ],
    examples: [
      { stdin: 'domaine actif\nprive inactif\npublic actif\n', expected: 'domaine : a desactiver\nprive : ok\npublic : a desactiver\na desactiver : 2/3' }
    ],
    tests: [
      { label: 'Tout actif par défaut', stdin: 'domaine actif\nprive actif\npublic actif\n', expected: 'domaine : a desactiver\nprive : a desactiver\npublic : a desactiver\na desactiver : 3/3' },
      { label: 'RAS', stdin: 'domaine inactif\nprive inactif\npublic inactif\n', expected: 'domaine : ok\nprive : ok\npublic : ok\na desactiver : 0/3\npare-feu pret' },
      { label: 'Un profil oublié', stdin: 'domaine inactif\nprive actif\npublic inactif\n', expected: 'domaine : ok\nprive : a desactiver\npublic : ok\na desactiver : 1/3' }
    ],
    solution: `ok=0
for ((i=1; i<=3; i++)); do
  read -r profil etat
  if [ "$etat" = "actif" ]; then
    echo "$profil : a desactiver"
    ok=$((ok + 1))
  else
    echo "$profil : ok"
  fi
done
echo "a desactiver : $ok/3"
if [ "$ok" -eq 0 ]; then
  echo "pare-feu pret"
fi
`
  },
  {
    id: 'aw-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Adresse IP statique : valider avant d’appliquer',
    goal: 'Contrôler les adresses IPv4 et préfixes avant la commande New-NetIPAddress.',
    brief: '<p>Le script lit <strong>n lignes</strong> « index ip prefixe » : index est le numéro d’interface ' +
      '(ifIndex), ip une adresse IPv4 à quatre octets séparés par des points, prefixe la longueur du ' +
      'masque (0 à 32). Une adresse est valide si ses quatre octets sont numériques et compris entre 0 ' +
      'et 255, et si le préfixe est entre 0 et 32. Pour chaque ligne il affiche <code>index : valide</code> ' +
      'ou <code>index : refusee</code>, puis <code>adresses : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r index ip prefixe
  # À compléter : découper l'ip en 4 octets, contrôler, le préfixe, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Découpage : IFS="." read -r o1 o2 o3 o4 <<< "$ip" ; chaque octet doit matcher 0-9+ et valoir au plus 255.',
      'Une valeur non numérique ou > 255, un préfixe hors 0-32 : refusee.'
    ],
    examples: [
      { stdin: '3\n12 192.168.1.203 24\n13 192.168.999.1 24\n14 10.10.10.10 40\n', expected: '12 : valide\n13 : refusee\n14 : refusee\nadresses : 1/3' }
    ],
    tests: [
      { label: 'Lot du TP', stdin: '4\n12 192.168.1.203 24\n12 10.10.10.10 8\n13 300.1.1.1 24\n14 192.168.1.5 33\n', expected: '12 : valide\n12 : valide\n13 : refusee\n14 : refusee\nadresses : 2/4' },
      { label: 'Bornes des octets', stdin: '3\n20 0.0.0.0 0\n21 255.255.255.255 32\n22 256.0.0.1 24\n', expected: '20 : valide\n21 : valide\n22 : refusee\nadresses : 2/3' },
      { label: 'Serveur et DNS', stdin: '2\n12 192.168.1.203 24\n15 8.8.8.8 0\n', expected: '12 : valide\n15 : valide\nadresses : 2/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r index ip prefixe
  valide=1
  case "$prefixe" in
    -|*[!0-9]*) valide=0 ;;
    *) [ "$prefixe" -gt 32 ] && valide=0 ;;
  esac
  IFS="." read -r o1 o2 o3 o4 <<< "$ip"
  for octet in "$o1" "$o2" "$o3" "$o4"; do
    case "$octet" in
      ""|-|*[!0-9]*) valide=0 ;;
      *) [ "$octet" -gt 255 ] && valide=0 ;;
    esac
  done
  if [ "$valide" = "1" ]; then
    echo "$index : valide"
    ok=$((ok + 1))
  else
    echo "$index : refusee"
  fi
done
echo "adresses : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Active Directory : notions
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'aw-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Domaine, arbre, forêt : le vocabulaire',
    goal: 'Associer chaque notion AD DS à sa définition du support.',
    brief: '<p>Le script lit <strong>n lignes</strong> « notion definition » : definition est un code parmi ' +
      '<code>entite</code>, <code>contigu</code>, <code>arbres</code> ou <code>enfant</code>. Notions du ' +
      'support : le <strong>domaine</strong> est l’entité logique (administrative) qui héberge ' +
      'utilisateurs, ordinateurs et stratégies → <code>entite</code> ; un <strong>arbre</strong> regroupe ' +
      'des domaines partageant un espace de nom contigu → <code>contigu</code> ; une <strong>forêt</strong> ' +
      'est un regroupement d’arbres → <code>arbres</code> ; un <strong>sous-domaine</strong> dépend du ' +
      'domaine racine (domaine enfant) → <code>enfant</code>. Pour chaque ligne il affiche <code>notion : ' +
      'OK</code> ou <code>notion : ERREUR</code>, puis <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r notion definition
  # À compléter : la définition attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur la notion : domaine → entite, arbre → contigu, foret → arbres, sousdomaine → enfant.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\ndomaine entite\narbre contigu\nforet arbres\n', expected: 'domaine : OK\narbre : OK\nforet : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Les quatre notions', stdin: '4\ndomaine entite\narbre contigu\nforet arbres\nsousdomaine enfant\n', expected: 'domaine : OK\narbre : OK\nforet : OK\nsousdomaine : OK\ncorrectes : 4/4' },
      { label: 'Trois confusions', stdin: '4\nforet contigu\narbre entite\nsousdomaine arbres\ndomaine entite\n', expected: 'foret : ERREUR\narbre : ERREUR\nsousdomaine : ERREUR\ndomaine : OK\ncorrectes : 1/4' },
      { label: 'Interro écrite', stdin: '4\nsousdomaine enfant\nforet arbres\narbre contigu\ndomaine entite\n', expected: 'sousdomaine : OK\nforet : OK\narbre : OK\ndomaine : OK\ncorrectes : 4/4' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r notion definition
  case "$notion" in
    domaine) attendu="entite" ;;
    arbre) attendu="contigu" ;;
    foret) attendu="arbres" ;;
    sousdomaine) attendu="enfant" ;;
  esac
  if [ "$definition" = "$attendu" ]; then
    echo "$notion : OK"
    ok=$((ok + 1))
  else
    echo "$notion : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'aw-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'L’arborescence des succursales',
    goal: 'Classer racine et domaines enfants dans l’arborescence d’entreprise.',
    brief: '<p>Le support construit cdp.org avec les sous-domaines paris.cdp.org et lome.cdp.org. Le ' +
      'script lit <strong>n lignes</strong> « domaine parent » : parent vaut <code>-</code> si le domaine ' +
      'est racine, sinon le nom de son parent. Pour chaque domaine il affiche <code>domaine : racine</code> ' +
      'ou <code>domaine : enfant de parent</code>, puis <code>racines : X</code> et <code>enfants : Y</code>.</p>',
    starter: `read -r n
r=0
e=0
for ((i=0; i<n; i++)); do
  read -r domaine parent
  # À compléter : racine ou enfant, les deux compteurs.
done
# À compléter : les deux bilans.
`,
    hints: [
      'parent = "-" → racine (r incrémenté) ; sinon « enfant de $parent » (e incrémenté).',
      'Les deux bilans sortent une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\ncdp.org -\nparis.cdp.org cdp.org\nlome.cdp.org cdp.org\n', expected: 'cdp.org : racine\nparis.cdp.org : enfant de cdp.org\nlome.cdp.org : enfant de cdp.org\nracines : 1\nenfants : 2' }
    ],
    tests: [
      { label: 'Une forêt, un arbre', stdin: '4\ncdp.org -\nparis.cdp.org cdp.org\nlome.cdp.org cdp.org\ndev.paris.cdp.org paris.cdp.org\n', expected: 'cdp.org : racine\nparis.cdp.org : enfant de cdp.org\nlome.cdp.org : enfant de cdp.org\ndev.paris.cdp.org : enfant de paris.cdp.org\nracines : 1\nenfants : 3' },
      { label: 'Deux arbres (rachat)', stdin: '5\ncdp.org -\nparis.cdp.org cdp.org\ncollege-paris.local -\ncameroun.college-paris.local college-paris.local\ndev.cameroun.college-paris.local cameroun.college-paris.local\n', expected: 'cdp.org : racine\nparis.cdp.org : enfant de cdp.org\ncollege-paris.local : racine\ncameroun.college-paris.local : enfant de college-paris.local\ndev.cameroun.college-paris.local : enfant de cameroun.college-paris.local\nracines : 2\nenfants : 3' },
      { label: 'Racine seule', stdin: '1\ntest.local -\n', expected: 'test.local : racine\nracines : 1\nenfants : 0' }
    ],
    solution: `read -r n
r=0
e=0
for ((i=0; i<n; i++)); do
  read -r domaine parent
  if [ "$parent" = "-" ]; then
    echo "$domaine : racine"
    r=$((r + 1))
  else
    echo "$domaine : enfant de $parent"
    e=$((e + 1))
  fi
done
echo "racines : $r"
echo "enfants : $e"
`
  },
  {
    id: 'aw-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'Les objets par unité d’organisation',
    goal: 'Compter les objets AD DS logés dans chaque unité d’organisation.',
    brief: '<p>Le support décrit des unités d’organisation « remplies d’objets de différentes classes : ' +
      'utilisateurs, ordinateurs, groupes, contrôleurs de domaine ». Le script lit <strong>n ' +
      'lignes</strong> « objet uo » et affiche d’abord chaque ligne <code>objet : uo</code>, puis pour ' +
      'chaque unité d’organisation, <strong>dans l’ordre de première apparition</strong>, ' +
      '<code>uo : X objets</code>, et enfin <code>uos : Y</code>.</p>',
    starter: `read -r n
declare -A compte
declare -A ordre
g=0
for ((i=0; i<n; i++)); do
  read -r objet uo
  echo "$objet : $uo"
  # À compléter : nouvelle UO → enregistrer l'ordre ; compteur incrémenté.
done
# À compléter : bilans par UO dans l'ordre, puis nombre d'UO.
`,
    hints: [
      'Nouvelle UO : [ -z "\${compte[$uo]+x}" ] → ordre[$g]=$uo et g=$((g+1)).',
      'Les bilans sortent après la boucle : UO dans l’ordre du tableau ordre, puis g.'
    ],
    examples: [
      { stdin: '3\niziti TRI\nposte1 TRI\ngroupe-ventes VENTES\n', expected: 'iziti : TRI\nposte1 : TRI\ngroupe-ventes : VENTES\nTRI : 2 objets\nVENTES : 1 objets\nuos : 2' }
    ],
    tests: [
      { label: 'Deux unités', stdin: '4\niziti TRI\npc-iziti TRI\ncompta VENTES\nmgmt TRI\n', expected: 'iziti : TRI\npc-iziti : TRI\ncompta : VENTES\nmgmt : TRI\nTRI : 3 objets\nVENTES : 1 objets\nuos : 2' },
      { label: 'Une UO par classe', stdin: '4\nadmin DC\npc-admin DC\nimprimantes DC\ngroupes DC\n', expected: 'admin : DC\npc-admin : DC\nimprimantes : DC\ngroupes : DC\nDC : 4 objets\nuos : 1' },
      { label: 'Ordre d’apparition', stdin: '4\ncompta VENTES\niziti TRI\ndirection DG\nmgmt TRI\n', expected: 'compta : VENTES\niziti : TRI\ndirection : DG\nmgmt : TRI\nVENTES : 1 objets\nTRI : 2 objets\nDG : 1 objets\nuos : 3' }
    ],
    solution: `read -r n
declare -A compte
declare -A ordre
g=0
for ((i=0; i<n; i++)); do
  read -r objet uo
  echo "$objet : $uo"
  if [ -z "\${compte[$uo]+x}" ]; then
    ordre[$g]=$uo
    g=$((g + 1))
  fi
  compte[$uo]=$((\${compte[$uo]:-0} + 1))
done
for ((i=0; i<g; i++)); do
  uo=\${ordre[$i]}
  echo "$uo : \${compte[$uo]} objets"
done
echo "uos : $g"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Installer un contrôleur de domaine AD DS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'aw-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Le chemin d’un contrôleur de domaine',
    goal: 'Rattacher chaque jalon à sa phase : installation, configuration, vérification.',
    brief: '<p>Le script lit <strong>n lignes</strong> « jalon phase » : phase est un code parmi ' +
      '<code>installation</code>, <code>configuration</code>, <code>verification</code> ou ' +
      '<code>finalisation</code>. Jalons du support : rôle AD DS et fonctionnalités ajoutés → ' +
      '<code>installation</code> ; promotion en contrôleur de domaine (nouvelle forêt, niveaux, ' +
      'mots de passe) → <code>configuration</code> ; vérification des prérequis → ' +
      '<code>verification</code> ; redémarrage obligatoire du serveur → <code>finalisation</code>. Pour ' +
      'chaque ligne il affiche <code>jalon : OK</code> ou <code>jalon : ERREUR</code>, puis ' +
      '<code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r jalon phase
  # À compléter : la phase attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le jalon : role → installation, promotion → configuration, prerequis → verification, redemarrage → finalisation.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nrole installation\npromotion configuration\nredemarrage finalisation\n', expected: 'role : OK\npromotion : OK\nredemarrage : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Les quatre phases', stdin: '4\nrole installation\npromotion configuration\nprerequis verification\nredemarrage finalisation\n', expected: 'role : OK\npromotion : OK\nprerequis : OK\nredemarrage : OK\ncorrectes : 4/4' },
      { label: 'Trois confusions', stdin: '4\npromotion installation\nprerequis configuration\nredemarrage verification\nrole installation\n', expected: 'promotion : ERREUR\nprerequis : ERREUR\nredemarrage : ERREUR\nrole : OK\ncorrectes : 1/4' },
      { label: 'Déroulé complet', stdin: '4\nredemarrage finalisation\nprerequis verification\npromotion configuration\nrole installation\n', expected: 'redemarrage : OK\nprerequis : OK\npromotion : OK\nrole : OK\ncorrectes : 4/4' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r jalon phase
  case "$jalon" in
    role) attendu="installation" ;;
    promotion) attendu="configuration" ;;
    prerequis) attendu="verification" ;;
    redemarrage) attendu="finalisation" ;;
  esac
  if [ "$phase" = "$attendu" ]; then
    echo "$jalon : OK"
    ok=$((ok + 1))
  else
    echo "$jalon : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'aw-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Les informations à réunir avant la configuration',
    goal: 'Distinguer les informations requises de celles qu’on ignore.',
    brief: '<p>Avant de configurer AD DS, le support exige : le <strong>nom DNS</strong> du domaine, le ' +
      '<strong>nom NetBIOS</strong>, le niveau fonctionnel, le fait que le contrôleur sera aussi ' +
      '<strong>DNS</strong>, et l’emplacement de la base <strong>NTDS.DIT</strong> et de <strong>SYSVOL</strong> ' +
      '(+ le mot de passe de restauration). Le script lit <strong>n lignes</strong> « info statut » où ' +
      'statut vaut <code>fourni</code> ou <code>manquant</code>. Pour chaque info requise manquante il ' +
      'affiche <code>info : bloquante</code>, pour chaque info requise fournie <code>info : prete</code>, ' +
      'et pour toute autre ligne <code>info : ignoree</code> — puis <code>bloquantes : X</code> et, si ' +
      'X vaut 0, <code>configuration possible</code>.</p>',
    starter: `read -r n
bloquantes=0
for ((i=0; i<n; i++)); do
  read -r info statut
  # À compléter : requise ? fournie ? verdict, compteur des bloquantes.
done
# À compléter : bilans.
`,
    hints: [
      'Infos requises : dns, netbios, niveau, dnsrole, ntds, sysvol, restauration — tout le reste est ignoré.',
      'Requise + manquante → bloquante (compteur) ; requise + fournie → prete ; verdict final si 0 bloquante.'
    ],
    examples: [
      { stdin: '4\ndns fourni\nnetbios manquant\nfondEcran fourni\nntds fourni\n', expected: 'dns : prete\nnetbios : bloquante\nfondEcran : ignoree\nntds : prete\nbloquantes : 1' }
    ],
    tests: [
      { label: 'Dossier complet', stdin: '5\ndns fourni\nnetbios fourni\nniveau fourni\nrestauration fourni\nsysvol fourni\n', expected: 'dns : prete\nnetbios : prete\nniveau : prete\nrestauration : prete\nsysvol : prete\nbloquantes : 0\nconfiguration possible' },
      { label: 'Deux manques', stdin: '5\ndns manquant\nnetbios fourni\nntds fourni\nsysvol manquant\nproxy fourni\n', expected: 'dns : bloquante\nnetbios : prete\nntds : prete\nsysvol : bloquante\nproxy : ignoree\nbloquantes : 2' },
      { label: 'Que du superficiel', stdin: '3\nfondEcran fourni\nproxy fourni\ntheme fourni\n', expected: 'fondEcran : ignoree\nproxy : ignoree\ntheme : ignoree\nbloquantes : 0\nconfiguration possible' }
    ],
    solution: `read -r n
bloquantes=0
for ((i=0; i<n; i++)); do
  read -r info statut
  case "$info" in
    dns|netbios|niveau|dnsrole|ntds|sysvol|restauration)
      if [ "$statut" = "manquant" ]; then
        echo "$info : bloquante"
        bloquantes=$((bloquantes + 1))
      else
        echo "$info : prete"
      fi
      ;;
    *)
      echo "$info : ignoree"
      ;;
  esac
done
echo "bloquantes : $bloquantes"
if [ "$bloquantes" -eq 0 ]; then
  echo "configuration possible"
fi
`
  },
  {
    id: 'aw-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Niveau fonctionnel et mot de passe de restauration',
    goal: 'Contrôler le niveau fonctionnel choisi et la robustesse du mot de passe DSRM.',
    brief: '<p>Le support conseille « le niveau fonctionnel le plus haut » (2012 R2) et un mot de passe ' +
      'de restauration solide, utilisé seulement si l’AD DS devient inaccessible. Le script lit ' +
      '<strong>n lignes</strong> « domaine niveau longueur » : niveau est le niveau fonctionnel choisi, ' +
      'longueur la taille du mot de passe de restauration. Le domaine est conforme si le niveau vaut ' +
      '<code>2012R2</code> ET la longueur est au moins 12. Pour chaque ligne il affiche <code>domaine : ' +
      'conforme</code> ou <code>domaine : a revoir (motif)</code> avec motif = <code>niveau</code>, ' +
      '<code>mdp</code> ou <code>les-deux</code> (dans cet ordre de priorité), puis <code>conformes : ' +
      'X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r domaine niveau longueur
  # À compléter : les deux contrôles, les trois motifs, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Niveau d’abord : niveau != 2012R2 → a revoir (niveau) ou (les-deux) selon la longueur.',
      'Puis longueur : longueur -lt 12 → a revoir (mdp) ; sinon conforme, compteur incrémenté.'
    ],
    examples: [
      { stdin: '3\ncdp.org 2012R2 16\nfiliere 2008 20\nstage 2012R2 8\n', expected: 'cdp.org : conforme\nfiliere : a revoir (niveau)\nstage : a revoir (mdp)\nconformes : 1/3' }
    ],
    tests: [
      { label: 'Rattrapage', stdin: '4\na 2012R2 12\nb 2008 12\nc 2012R2 10\nd 2003 5\n', expected: 'a : conforme\nb : a revoir (niveau)\nc : a revoir (mdp)\nd : a revoir (les-deux)\nconformes : 1/4' },
      { label: 'Tout au plus haut', stdin: '3\ncdp.org 2012R2 20\nlome 2012R2 14\nparis 2012R2 12\n', expected: 'cdp.org : conforme\nlome : conforme\nparis : conforme\nconformes : 3/3' },
      { label: 'Que les mots de passe', stdin: '3\nx 2012R2 11\ny 2012R2 8\nz 2012R2 30\n', expected: 'x : a revoir (mdp)\ny : a revoir (mdp)\nz : conforme\nconformes : 1/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r domaine niveau longueur
  if [ "$niveau" != "2012R2" ] && [ "$longueur" -lt 12 ]; then
    echo "$domaine : a revoir (les-deux)"
  elif [ "$niveau" != "2012R2" ]; then
    echo "$domaine : a revoir (niveau)"
  elif [ "$longueur" -lt 12 ]; then
    echo "$domaine : a revoir (mdp)"
  else
    echo "$domaine : conforme"
    ok=$((ok + 1))
  fi
done
echo "conformes : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Gérer les objets AD DS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'aw-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Les classes d’objets AD DS',
    goal: 'Classer chaque objet dans sa classe : utilisateur, ordinateur, groupe, contrôleur.',
    brief: '<p>Le script lit <strong>n lignes</strong> « objet classe » : classe est un code parmi ' +
      '<code>utilisateur</code>, <code>ordinateur</code>, <code>groupe</code> ou ' +
      '<code>controleur</code>. Objets du support : iziti, ilham → <code>utilisateur</code> ; ' +
      'poste-compta, portable-dir → <code>ordinateur</code> ; grp-ventes, grp-info → <code>groupe</code> ; ' +
      'SRV-DC1, SRV-DC2 → <code>controleur</code>. Pour chaque ligne il affiche <code>objet : OK</code> ou ' +
      '<code>objet : ERREUR</code>, puis <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r objet classe
  # À compléter : la classe attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur l’objet : iziti/ilham → utilisateur, poste/portable → ordinateur, grp → groupe, SRV-DC → controleur.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\niziti utilisateur\nposte-compta ordinateur\ngrp-ventes groupe\n', expected: 'iziti : OK\nposte-compta : OK\ngrp-ventes : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Console complète', stdin: '6\niziti utilisateur\nilham utilisateur\nportable-dir ordinateur\ngrp-info groupe\nSRV-DC1 controleur\nSRV-DC2 controleur\n', expected: 'iziti : OK\nilham : OK\nportable-dir : OK\ngrp-info : OK\nSRV-DC1 : OK\nSRV-DC2 : OK\ncorrectes : 6/6' },
      { label: 'Trois erreurs', stdin: '4\niziti ordinateur\nportable-dir utilisateur\nSRV-DC1 groupe\ngrp-ventes groupe\n', expected: 'iziti : ERREUR\nportable-dir : ERREUR\nSRV-DC1 : ERREUR\ngrp-ventes : OK\ncorrectes : 1/4' },
      { label: 'Tri à la main', stdin: '6\nSRV-DC2 controleur\ngrp-ventes groupe\nportable-dir ordinateur\nilham utilisateur\nSRV-DC1 controleur\niziti utilisateur\n', expected: 'SRV-DC2 : OK\ngrp-ventes : OK\nportable-dir : OK\nilham : OK\nSRV-DC1 : OK\niziti : OK\ncorrectes : 6/6' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r objet classe
  case "$objet" in
    iziti|ilham) attendu="utilisateur" ;;
    poste-*)
      if [ "$objet" = "poste-compta" ]; then attendu="ordinateur" ; else attendu="groupe" ; fi
      ;;
    portable-*) attendu="ordinateur" ;;
    grp-*) attendu="groupe" ;;
    SRV-DC*) attendu="controleur" ;;
  esac
  if [ "$classe" = "$attendu" ]; then
    echo "$objet : OK"
    ok=$((ok + 1))
  else
    echo "$objet : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'aw-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Créer les utilisateurs : UPN et options de compte',
    goal: 'Valider l’UPN de chaque utilisateur et signaler l’option de mot de passe.',
    brief: '<p>Le support crée les utilisateurs dans l’unité puis distingue les deux formes de session : ' +
      '<strong>UPN</strong> (forme adresse e-mail, contient une arobase) et <code>DOMAINE\\login</code>. ' +
      'Le script lit <strong>n lignes</strong> « utilisateur upn changement » : upn est l’identifiant ' +
      'saisi, changement vaut <code>oui</code> (doit changer son mot de passe à la prochaine ouverture) ' +
      'ou <code>non</code>. Pour chaque utilisateur il affiche <code>utilisateur : upn-valide</code> si ' +
      'l’UPN contient une arobase, sinon <code>utilisateur : forme-domaine</code> ; et il note ' +
      '<code>utilisateur : init-mdp</code> en plus si changement vaut oui. Enfin <code>upn : X/n</code> ' +
      'et <code>a-initialiser : Y</code>.</p>',
    starter: `read -r n
upn=0
init=0
for ((i=0; i<n; i++)); do
  read -r utilisateur identifiant changement
  # À compléter : forme UPN ou domaine, l'option de changement, les compteurs.
done
# À compléter : les deux bilans.
`,
    hints: [
      'L’arobase dans une variable : case "$identifiant" in *@*) forme UPN ;; *) forme domaine ;;',
      'changement = oui → ligne init-mdp en plus et compteur ; les deux bilans après la boucle.'
    ],
    examples: [
      { stdin: '3\niziti iziti@ntic.ma oui\nilham NTIC\\\\ilham non\ndemo demo@ntic.ma non\n', expected: 'iziti : upn-valide\niziti : init-mdp\nilham : forme-domaine\ndemo : upn-valide\nupn : 2/3\na-initialiser : 1' }
    ],
    tests: [
      { label: 'Promotion 2026', stdin: '4\na.ade a.ade@ntic.ma oui\nb.ben NTIC\\\\b.ben oui\nc.cia c.cia@ntic.ma non\nd.dan NTIC\\\\d.dan non\n', expected: 'a.ade : upn-valide\na.ade : init-mdp\nb.ben : forme-domaine\nb.ben : init-mdp\nc.cia : upn-valide\nd.dan : forme-domaine\nupn : 2/4\na-initialiser : 2' },
      { label: 'Que des UPN', stdin: '3\nme me@cdp.org non\nyou you@cdp.org oui\nus us@cdp.org non\n', expected: 'me : upn-valide\nyou : upn-valide\nyou : init-mdp\nus : upn-valide\nupn : 3/3\na-initialiser : 1' },
      { label: 'Que du domaine', stdin: '3\na CD\\\\a non\nb CD\\\\b non\nc CD\\\\c oui\n', expected: 'a : forme-domaine\nb : forme-domaine\nc : forme-domaine\nc : init-mdp\nupn : 0/3\na-initialiser : 1' }
    ],
    solution: `read -r n
upn=0
init=0
for ((i=0; i<n; i++)); do
  read -r utilisateur identifiant changement
  case "$identifiant" in
    *@*)
      echo "$utilisateur : upn-valide"
      upn=$((upn + 1))
      ;;
    *)
      echo "$utilisateur : forme-domaine"
      ;;
  esac
  if [ "$changement" = "oui" ]; then
    echo "$utilisateur : init-mdp"
    init=$((init + 1))
  fi
done
echo "upn : $upn/$n"
echo "a-initialiser : $init"
`
  },
  {
    id: 'aw-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Groupes : droits, type et étendue',
    goal: 'Décider quels groupes peuvent recevoir des droits et compter les jointures au domaine.',
    brief: '<p>Le script lit d’abord <strong>g lignes</strong> « groupe type etendue » : type vaut ' +
      '<code>securite</code> (peut recevoir des droits sur fichiers, imprimantes, bases) ou ' +
      '<code>distribution</code> (diffusion seulement) ; etendue vaut <code>globale</code>, ' +
      '<code>locale</code> ou <code>universelle</code>. Puis il lit <strong>n lignes</strong> « poste ' +
      'dns » pour les jointures au domaine : un poste rejoint le domaine si son serveur DNS est celui du ' +
      'domaine (<code>ad-dns</code>). Il affiche pour chaque groupe <code>groupe : droits</code> ou ' +
      '<code>groupe : diffusion</code>, pour chaque poste <code>poste : joint</code> ou ' +
      '<code>poste : dns a corriger</code>, puis <code>groupes-droits : X</code> et ' +
      '<code>jointures : Y/n</code>.</p>',
    starter: `read -r g
droits=0
for ((i=0; i<g; i++)); do
  read -r groupe type etendue
  # À compléter : verdict selon le type, compteur des groupes à droits.
done
read -r n
j=0
for ((i=0; i<n; i++)); do
  read -r poste dns
  # À compléter : jointure selon le DNS, compteur.
done
# À compléter : les deux bilans.
`,
    hints: [
      'type = securite → « droits » et compteur ; distribution → « diffusion ».',
      'dns = ad-dns → « joint » et compteur ; sinon « dns a corriger » ; bilans après les deux boucles.'
    ],
    examples: [
      { stdin: '2\ngrp-ventes securite globale\nliste-clients distribution globale\n2\npc1 ad-dns\npc2 8.8.8.8\n', expected: 'grp-ventes : droits\nliste-clients : diffusion\npc1 : joint\npc2 : dns a corriger\ngroupes-droits : 1\njointures : 1/2' }
    ],
    tests: [
      { label: 'Annuaire du stage', stdin: '3\ngrp-info securite globale\ngrp-bureau securite locale\nannonce distribution universelle\n3\nstage1 ad-dns\nstage2 ad-dns\ninvite1 1.1.1.1\n', expected: 'grp-info : droits\ngrp-bureau : droits\nannonce : diffusion\nstage1 : joint\nstage2 : joint\ninvite1 : dns a corriger\ngroupes-droits : 2\njointures : 2/3' },
      { label: 'Que de la diffusion', stdin: '2\nnews distribution globale\nevents distribution locale\n1\npc9 ad-dns\n', expected: 'news : diffusion\nevents : diffusion\npc9 : joint\ngroupes-droits : 0\njointures : 1/1' },
      { label: 'DNS à corriger partout', stdin: '1\ngrp-admins securite globale\n2\npc-a 8.8.8.8\npc-b 1.0.0.1\n', expected: 'grp-admins : droits\npc-a : dns a corriger\npc-b : dns a corriger\ngroupes-droits : 1\njointures : 0/2' }
    ],
    solution: `read -r g
droits=0
for ((i=0; i<g; i++)); do
  read -r groupe type etendue
  if [ "$type" = "securite" ]; then
    echo "$groupe : droits"
    droits=$((droits + 1))
  else
    echo "$groupe : diffusion"
  fi
done
read -r n
j=0
for ((i=0; i<n; i++)); do
  read -r poste dns
  if [ "$dns" = "ad-dns" ]; then
    echo "$poste : joint"
    j=$((j + 1))
  else
    echo "$poste : dns a corriger"
  fi
done
echo "groupes-droits : $droits"
echo "jointures : $j/$n"
`
  }
];
