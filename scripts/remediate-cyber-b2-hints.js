'use strict';

const fs = require('fs');
const path = require('path');

const csHints = {
  'cs2-c1-e1': [
    'Appliquez la formule de calcul de risque brut : Score = M × V × I (produit des trois facteurs de 1 à 5).',
    'Comparez le score aux seuils ISO 27005 : Faible (< 20), Moyen (20 à 49), Élevé (50 à 79) ou Critique (>= 80).'
  ],
  'cs2-c1-e2': [
    'Identifiez quel pilier (Confidentialité, Intégrité ou Disponibilité) est directement compromis par l’incident.',
    'Associez la conséquence opérationnelle exacte : fuite de données, chiffrement malveillant ou altération.'
  ],
  'cs2-c1-e3': [
    'Vérifiez les critères ANSSI/NIST : longueur minimale, diversité des classes de caractères et absence de motifs triviaux.',
    'Un mot de passe non conforme sur l’un des critères obligatoires doit être rejeté immédiatement.'
  ],
  'cs2-c2-e1': [
    'Le masque jetable (chiffre de Vernam) applique un OU exclusif (XOR) bit à bit entre le message clair et la clé.',
    'L’opération XOR est involutive : le chiffrement et le déchiffrement utilisent exactement la même opération.'
  ],
  'cs2-c2-e2': [
    'La moindre altération d’un octet produit une empreinte de hachage radicalement différente (effet avalanche).',
    'Comparez l’empreinte calculée avec l’empreinte de référence certifiée pour attester de l’intégrité.'
  ],
  'cs2-c2-e3': [
    'La signature numérique garantit l’authenticité de l’émetteur et la non-répudiation du message.',
    'La signature se vérifie avec la clé publique de l’émetteur sur l’empreinte cryptographique du document.'
  ],
  'cs2-c3-e1': [
    'Les règles de pare-feu sont ordonnées : la première règle correspondante (First-Match) détermine le sort du paquet.',
    'En l’absence de règle explicite correspondante, appliquez la politique par défaut de filtrage.'
  ],
  'cs2-c3-e2': [
    'Repérez les protocoles non chiffrés vulnérables à l’écoute réseau : Telnet (23), FTP (21) ou HTTP (80).',
    'Préconisez la migration systématique vers leurs alternatives chiffrées sécurisées (SSH, SFTP, HTTPS).'
  ],
  'cs2-c3-e3': [
    'L’usurpation ARP (ARP Spoofing) détourne le trafic en associant frauduleusement une IP à une fausse adresse MAC.',
    'Détectez les réponses ARP incohérentes ou les conflits d’adresses MAC pour une même passerelle.'
  ],
  'cs2-c4-e1': [
    'Identifiez les caractères syntaxiques d’échappement SQL (guillemets, double tiret de commentaire, clauses OR 1=1).',
    'La parade absolue contre l’injection SQL est l’utilisation exclusive de requêtes préparées paramétrées.'
  ],
  'cs2-c4-e2': [
    'La faille XSS injecte des balises de script ou des attributs d’événements dynamiques dans le code HTML affiché.',
    'L’assainissement convertit les chevrons et caractères réservés en entités HTML inoffensives.'
  ],
  'cs2-c4-e3': [
    'La vulnérabilité IDOR survient lorsqu’un contrôle d’autorisation omet de vérifier le propriétaire légitime de l’objet.',
    'Validez que le jeton de session de l’utilisateur correspond formellement au compte propriétaire de la ressource.'
  ],
  'cs2-c5-e1': [
    'Le sel (salt) empêche les attaques par dictionnaires précalculés et tables arc-en-ciel.',
    'L’étirement de clé (key stretching) augmente le coût de calcul par force brute via des itérations successives.'
  ],
  'cs2-c5-e2': [
    'Un jeton JWT authentique doit obligatoirement comporter une signature cryptographique valide.',
    'Rejetez catégoriquement l’algorithme "none" qui tente de contourner la vérification de signature.'
  ],
  'cs2-c5-e3': [
    'Dans le modèle RBAC, l’accès est déterminé par la matrice d’habilitation liant les rôles aux permissions.',
    'Contrôlez que l’opération demandée fait expressément partie des privilèges accordés au rôle de l’utilisateur.'
  ],
  'cs2-c6-e1': [
    'Une signature NIDS inspecte simultanément l’en-tête IP/port et le motif binaire ou textuel du payload.',
    'Déclenchez l’alerte de sécurité dès que tous les prédicats de la règle de détection sont satisfaits.'
  ],
  'cs2-c6-e2': [
    'Analysez la fréquence temporelle des échecs d’authentification provenant d’une même source IP.',
    'Dépassement du seuil de tentatives infructueuses = suspicion avérée d’attaque par force brute ou dictionnaire.'
  ],
  'cs2-c6-e3': [
    'Un IoC (Indicateur de Compromission) fournit la preuve technique d’une infection ou intrusion sur le système.',
    'Confrontez les empreintes collectées aux signatures connues de menaces pour qualifier la compromission.'
  ]
};

const csDir = path.join(process.cwd(), 'server/exercises/cyber-securite-b2');
for (let ch = 1; ch <= 6; ch++) {
  const filePath = path.join(csDir, `chapitre${ch}.js`);
  const mod = require(filePath);
  let changed = false;
  for (const ex of mod) {
    if (csHints[ex.id]) {
      ex.hints = csHints[ex.id];
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, "'use strict';\n\nmodule.exports = " + JSON.stringify(mod, null, 2) + ";\n", 'utf8');
    console.log('Updated Cyber securite B2 chapter:', ch);
  }
}
