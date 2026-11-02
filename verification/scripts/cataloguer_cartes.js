const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const dossier = path.resolve(__dirname, '..');
const echantillons = JSON.parse(fs.readFileSync(path.join(dossier, 'echantillons.json'), 'utf8'));
const cartes = echantillons.cards_100;
const empreinte = crypto.createHash('sha256').update(JSON.stringify(cartes)).digest('hex');

if (echantillons.seed !== 20261029 || cartes.length !== 100 || empreinte !== 'ca83c26f62b88e1ffbc20f9a138baf0da30cca4d7f678ce47e33ea2fb38fb1d6') {
  throw new Error('L’échantillon a changé : les appréciations manuelles ne sont pas transférables automatiquement.');
}

const defauts = {
  22: 'F55', 24: 'F17', 29: 'F68', 30: 'F56', 44: 'F57', 57: 'F32',
  61: 'F09', 63: 'F62', 70: 'F58', 72: 'F63', 74: 'F64', 75: 'F33',
  76: 'F59', 78: 'F60', 80: 'F70', 81: 'F65', 83: 'F69', 85: 'F66',
  88: 'F19', 96: 'F67', 98: 'F61', 100: 'F12',
};

const precisions = {
  6: 'Préciser les responsabilités contractuelles et les capacités de restauration du SaaS.',
  7: 'Vérifier le sens de Hold et distinguer évitement et retrait systématique.',
  8: 'Présenter le fonctionnement comme celui du pilote de stockage envisagé.',
  10: 'Nuancer la protection anti-hameçonnage selon le gestionnaire et la configuration.',
  12: 'Préciser les tarifs, préfixes et politiques qui peuvent conditionner le routage.',
  13: 'Préciser qu’un conteneur peut faire fonctionner plusieurs processus.',
  15: 'Distinguer l’événement enregistré de sa gravité selon le contexte SOC.',
  17: 'Préciser le logiciel et sa méthode de comptage des mots.',
  19: 'Distinguer règle de lisibilité et obligation syntaxique de Markdown.',
  23: 'Préciser le contexte SIP, les supports et le transport des médias.',
  31: 'Expliciter les conditions de prise en charge VSS et les limites de cohérence.',
  32: 'Préciser le dialecte SQL et le caractère optionnel des clauses.',
  36: 'Mentionner les évolutions telles que le Client Hello chiffré.',
  40: 'Préciser le texte juridique et les limites applicables à ces droits.',
  41: 'La question isolée manque de référent ; la rattacher à une situation explicite.',
  49: 'Préciser que to_dict est défini par le modèle du cours et non par SQLAlchemy en général.',
  52: 'Préciser le périmètre du rôle et préférer le moindre privilège.',
  55: 'Préciser les types et les cas admis selon le langage étudié.',
  59: 'Préciser qu’une sortie anticipée peut interrompre une boucle malgré sa condition.',
  60: 'Préciser le sens de parcours des bits pour la seconde méthode.',
  62: 'Préciser les domaines de n et k et les conventions utilisées.',
  65: 'Définir aussi les bornes et le rôle précis du compteur.',
  66: 'Présenter la responsabilité selon le service et le contrat cloud.',
  67: 'Identifier les données et l’exemple visés par la formule.',
  73: 'Mentionner le routage inter-VLAN lorsqu’un commutateur de couche 3 le prend en charge.',
  77: 'Distinguer couleur d’un fragment et résultat final après les étapes ultérieures.',
  79: 'Préciser ε positif et l’existence d’une variance finie.',
  89: 'Nuancer : un utilisateur IAM peut ne pas avoir de mot de passe ou de clé active.',
  92: 'La centralisation facilite l’administration sans garantir à elle seule la sécurité.',
  93: 'Préciser que l’identifiant peut se trouver ailleurs que dans une URL.',
  94: 'Préciser les hypothèses et les conventions de la formule.',
  95: 'Présenter les bénéfices comme une réduction de surface, sans garantie absolue.',
  99: 'Préciser la convention graphique et le sens de lecture utilisés dans le cours.',
};

function cellule(valeur) {
  return `"${String(valeur).replace(/"/g, '""')}"`;
}

const lignes = [['numero', 'localisation', 'question_extrait_15_mots_max', 'appreciation', 'details']];
for (const [index, carte] of cartes.entries()) {
  const numero = index + 1;
  const question = carte.question.trim().split(/\s+/).slice(0, 15).join(' ');
  const appreciation = defauts[numero] ? 'défaut confirmé' : precisions[numero] ? 'à préciser ou vérifier' : 'aucun défaut manifeste à cette lecture';
  const details = defauts[numero] ? `Voir ${defauts[numero]} dans le registre des erreurs.` : precisions[numero] || 'Lecture isolée, sans validation exhaustive du cours.';
  lignes.push([numero, `${carte.file}:${carte.line}`, question, appreciation, details]);
}

fs.writeFileSync(path.join(dossier, '06-relecture-cartes.csv'), `${lignes.map(ligne => ligne.map(cellule).join(';')).join('\n')}\n`, 'utf8');
console.log(JSON.stringify({ cartes: cartes.length, defauts: Object.keys(defauts).length, precisions: Object.keys(precisions).length, sans_defaut_manifeste: cartes.length - Object.keys(defauts).length - Object.keys(precisions).length }));
