const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const dossier = path.resolve(__dirname, '..');
const echantillons = JSON.parse(fs.readFileSync(path.join(dossier, 'echantillons.json'), 'utf8'));
const familles = echantillons.families;
const extraits = Object.fromEntries(Object.entries(familles).map(([nom, famille]) => [nom, {
  questions_10: famille.questions_10,
  cards_10: famille.cards_10,
}]));
const empreinte = crypto.createHash('sha256').update(JSON.stringify(extraits)).digest('hex');

if (echantillons.seed !== 20261029 || empreinte !== 'd9eaf01e0f9a2c6fac77f39849d192e672b2b02babde999f10e90ced65f5936a') {
  throw new Error('L’échantillon a changé : la lecture manuelle doit être refaite.');
}

const defauts = {
  'programmation:qcm:4': 'F44', 'programmation:qcm:5': 'F46',
  'programmation:carte:4': 'F32', 'programmation:carte:5': 'F74', 'programmation:carte:10': 'F32',
  'bases-donnees:qcm:5': 'F20', 'bases-donnees:qcm:8': 'F21',
  'bases-donnees:carte:1': 'F11', 'bases-donnees:carte:2': 'F49', 'bases-donnees:carte:3': 'F78',
  'systemes:qcm:6': 'F71', 'systemes:carte:2': 'F14',
  'reseaux:carte:2': 'F13',
  'securite:qcm:3': 'F73', 'securite:qcm:8': 'F47',
  'securite:carte:1': 'F53',
  'cloud-devops:qcm:6': 'F52', 'cloud-devops:qcm:8': 'F72',
  'cloud-devops:carte:1': 'F15', 'cloud-devops:carte:8': 'F76',
  'cloud-devops:carte:9': 'F75', 'cloud-devops:carte:10': 'F58',
  'genie-logiciel:qcm:7': 'F50', 'genie-logiciel:carte:1': 'F48',
  'mathematiques:qcm:1': 'F08',
  'droit-langues-professionnel:qcm:4': 'F54', 'droit-langues-professionnel:qcm:7': 'F38', 'droit-langues-professionnel:qcm:10': 'F51',
  'droit-langues-professionnel:carte:1': 'F01', 'droit-langues-professionnel:carte:3': 'F01',
};

const precisions = {
  'programmation:qcm:9': 'Préciser le contexte HTML visé par htmlspecialchars et les autres contextes sensibles.',
  'programmation:qcm:10': 'Préciser l’architecture, la fréquence et le sens du temps d’accès annoncé.',
  'programmation:carte:2': 'Préciser le cas du pointeur nul et distinguer adresse et valeur pointée.',
  'bases-donnees:qcm:3': 'Préciser l’ordre de la fenêtre et le sens de lignes physiques.',
  'bases-donnees:qcm:4': 'Distinguer les niveaux normalisés de leur implémentation par chaque SGBD.',
  'bases-donnees:carte:7': 'Préciser le dialecte et le caractère optionnel des clauses.',
  'bases-donnees:carte:8': 'Préciser le fonctionnement et les modalités de rafraîchissement du SGBD.',
  'systemes:qcm:7': 'Remplacer la référence à un lien physique par une explication du lien virtuel.',
  'systemes:carte:9': 'Préciser les mécanismes selon l’invité et les conditions de cohérence.',
  'systemes:carte:10': 'Éviter de garantir sans conditions la latence et la résilience.',
  'reseaux:qcm:6': 'Préciser qu’il s’agit de l’emplacement de configuration standard.',
  'reseaux:qcm:10': 'Préciser le type et l’ordre des règles pfSense concernées.',
  'reseaux:carte:1': 'Vérifier l’attribution précise des seuils de latence, gigue et perte aux référentiels cités.',
  'reseaux:carte:7': 'Préciser la version, le mode et la configuration de Snort/pfSense.',
  'securite:qcm:7': 'Nuancer la généralisation sur le trafic 443 et les raisons de son usage.',
  'securite:carte:2': 'Distinguer valeurs fréquentes de communauté, configuration effective et périmètre des MIB.',
  'securite:carte:3': 'F77 : un nom légitime peut partager l’adresse wildcard ; faux négatif déduit à confirmer sur une zone de test.',
  'securite:carte:4': 'Préciser que l’énumération dépend de la configuration et des autorisations.',
  'securite:carte:7': 'Préciser que les contextes sortant/entrant sont des exemples et que le port peut varier.',
  'securite:carte:8': 'Présenter la formule comme un modèle simplifié et définir ses facteurs.',
  'cloud-devops:qcm:1': 'Les économies dépendent de la tarification, du produit et de la période.',
  'cloud-devops:qcm:3': 'Nuancer l’implémentation réseau selon la plateforme et le backend Docker.',
  'cloud-devops:qcm:5': 'Préciser les liens entre abonnement, facturation et quotas selon le contrat.',
  'cloud-devops:qcm:10': 'Éviter une garantie de performance et sécurité optimale sans hypothèses.',
  'cloud-devops:carte:3': 'Préciser les séries et SKU car les ratios ne valent pas nécessairement pour chaque VM.',
  'cloud-devops:carte:5': 'Vérifier périodiquement les limites et conditions du service.',
  'genie-logiciel:qcm:1': 'Présenter le panier en haut à droite comme convention fréquente, non universelle.',
  'genie-logiciel:qcm:3': 'Distinguer exécution non assistée et fonctionnement continu 24 h sur 24.',
  'genie-logiciel:qcm:5': 'Préciser qu’un conflit Git ne se limite pas à ce cas.',
  'genie-logiciel:qcm:8': 'La gravité d’une bascule Big Bang dépend du périmètre et des mesures de repli.',
  'genie-logiciel:qcm:9': 'Présenter l’unicité du rôle A comme une convention de gouvernance.',
  'genie-logiciel:carte:6': 'Une modification des interfaces ne casse pas systématiquement toutes les connexions.',
  'genie-logiciel:carte:7': 'Préciser les clés et les hypothèses de la dépendance transitive.',
  'genie-logiciel:carte:8': 'Distinguer le mode suivi par Git des permissions Unix complètes.',
  'mathematiques:qcm:4': 'Nuancer le seuil et ne pas assimiler un focus group à un échantillon représentatif.',
  'mathematiques:qcm:5': 'Préciser hypothèses d’échantillonnage et marge d’erreur du calcul de Cochran.',
  'mathematiques:qcm:7': 'Préciser la distribution et ce que désigne sa plus petite valeur.',
  'mathematiques:carte:3': 'Préciser les hypothèses de faisabilité et d’existence d’un optimum fini.',
  'mathematiques:carte:8': 'Présenter la taille comme une recommandation dépendant du contexte.',
  'droit-langues-professionnel:carte:6': 'Nuancer les effets des écrans et les conditions de consolidation.',
  'droit-langues-professionnel:carte:10': 'Préciser la juridiction et les compétences de chaque juridiction citée.',
};

function cellule(valeur) {
  return `"${String(valeur).replace(/"/g, '""')}"`;
}

const lignes = [['famille', 'type', 'numero', 'localisation', 'question_extrait_15_mots_max', 'appreciation', 'details']];
const totaux = { defauts: 0, precisions: 0, sans_defaut_manifeste: 0 };
for (const [nom, famille] of Object.entries(familles)) {
  for (const [type, liste] of [['qcm', famille.questions_10], ['carte', famille.cards_10]]) {
    if (liste.length !== 10) throw new Error(`Taille d’échantillon inattendue : ${nom} ${type}`);
    for (const [index, item] of liste.entries()) {
      const numero = index + 1;
      const identifiant = `${nom}:${type}:${numero}`;
      const question = (item.stem || item.question).trim().split(/\s+/).slice(0, 15).join(' ');
      let appreciation = 'aucun défaut manifeste à cette lecture';
      let details = 'Lecture isolée, sans validation exhaustive du cours.';
      if (defauts[identifiant]) {
        appreciation = 'défaut confirmé';
        details = `Voir ${defauts[identifiant]} dans le registre des erreurs.`;
        totaux.defauts += 1;
      } else if (precisions[identifiant]) {
        appreciation = 'à préciser ou vérifier';
        details = precisions[identifiant];
        totaux.precisions += 1;
      } else {
        totaux.sans_defaut_manifeste += 1;
      }
      lignes.push([nom, type, numero, `${item.file}:${item.line}`, question, appreciation, details]);
    }
  }
}

fs.writeFileSync(path.join(dossier, '07-relecture-familles.csv'), `${lignes.map(ligne => ligne.map(cellule).join(';')).join('\n')}\n`, 'utf8');
console.log(JSON.stringify({ nombre: lignes.length - 1, ...totaux }));
