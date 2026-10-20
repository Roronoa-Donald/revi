'use strict';

/**
 * Script de nettoyage systématique des 34 exercices résiduels contenant
 * des allusions Python ou Bash dans des cours non informatiques ou analytiques.
 */

const fs = require('fs');
const path = require('path');

const cleanHints = {
  // b1-fr-pro
  'fr1-c5-e2': [
    'Additionnez les scores d’évaluation obtenus sur chaque critère professionnel.',
    'Divisez le total par le nombre d’évaluations pour déterminer la moyenne générale du candidat.'
  ],

  // b1-reseaux
  're-c6-e1': [
    'Le nombre d’adresses IP d’un bloc CIDR de préfixe /p vaut 2^(32 - p).',
    'Le nombre d’adresses utilisables pour les hôtes retire l’adresse réseau (première) et l’adresse de diffusion (dernière) : N_hôtes = 2^k - 2.'
  ],

  // b1-bureautique
  'bu-c4-e1': [
    'La fonction MOYENNE() calcule la moyenne arithmétique des cellules sélectionnées.',
    'L’étendue statistique correspond à la différence entre la valeur maximale et la valeur minimale (MAX - MIN).'
  ],
  'bu-c5-e2': [
    'La fonction GAUCHE(texte; n) extrait les n premiers caractères depuis le début de la chaîne.',
    'La fonction DROITE(texte; n) extrait les n derniers caractères, et STXT(texte; départ; longueur) extrait une sous-chaîne intermédiaire.'
  ],

  // b1-architecture
  'ar-c2-e1': [
    'Chaque chiffre binaire (bit) de position k (en partant de 0 à droite) représente une puissance de 2 : 2^k.',
    'Additionnez les puissances de 2 correspondant aux bits valant 1 pour obtenir la valeur décimale.'
  ],
  'ar-c2-e3': [
    'Chaque chiffre hexadécimal (0 à F) correspond exactement à un groupe de 4 bits (un quartet).',
    'Un chiffre octal (0 à 7) correspond à un groupe de 3 bits.'
  ],
  'ar-c3-e3': [
    'L’addition binaire s’effectue de droite à gauche avec propagation de la retenue (1 + 1 = 0 avec retenue 1).',
    'Convertissez les valeurs en décimal pour vérifier la cohérence du résultat final.'
  ],

  // b1-virtualisation
  'vt-c1-e2': [
    'Qualifiez l’état du serveur : sous-utilisé (< 2 services), saturé (> 4 services) ou équilibré.',
    'Pour un serveur sous-utilisé, évaluez le coût de gaspillage des ressources allouées non consommées.'
  ],
  'vt-c6-e2': [
    'Identifiez les machines virtuelles réveillées dont la charge passe d’un niveau faible (< 30%) à un niveau actif (>= 80%).',
    'Comparez la moyenne de consommation avant et après réallocation dynamique des vCPU.'
  ],

  // b1-sql
  'sq-c5-e3': [
    'La clause GROUP BY regroupe les enregistrements partageant la même modalité.',
    'La clause HAVING filtre les groupes formés en évaluant une condition sur une fonction d’agrégation (SUM, AVG, COUNT).'
  ],

  // erp-si
  'erp2-c1-e2': [
    'Identifiez les entités clientes présentes simultanément dans le module CRM et le module Comptabilité.',
    'Comparez les montants enregistrés pour détecter les discordances d’encours client entre les deux modules.'
  ],

  // ingenierie-besoin
  'ib2-c3-e2': [
    'Recensez l’ensemble des évaluations attribuées par les parties prenantes pour chaque exigence.',
    'Calculez la note moyenne de priorité et classez les exigences par ordre d’importance décroissant.'
  ],

  // masterclass-apprendre
  'mc2-c1-e3': [
    'Appliquez la stratégie de chunking : regroupez les items mémorisables en blocs homogènes de 3 ou 4 éléments.',
    'Respectez la capacité limite de la mémoire de travail (loi de Miller : 7 ± 2 éléments).'
  ],
  'mc2-c2-e3': [
    'Isolez les mots-clés conceptuels porteurs de sens dans le texte en écartant les mots de liaison.',
    'Qualifiez les termes techniques nécessitant un ancrage en mémoire à long terme.'
  ],
  'mc2-c5-e1': [
    'Organisez l’apprentissage distribué en intercalant les sessions de révision selon le modèle d’Ebbinghaus.',
    'Alternez les différentes matières de manière cyclique pour favoriser la consolidation synaptique.'
  ],

  // RD-RO
  'ro2-c5-e1': [
    'La méthode du coin Nord-Ouest initialise la matrice de transport en saturant d’abord la case (1, 1).',
    'À chaque étape, allouez min(offre restante, demande restante) et déplacez-vous vers la droite ou vers le bas selon la saturation.'
  ],

  // assembleur
  'asm2-c3-e3': [
    'En mode réel x86, l’adresse physique 20 bits se calcule par la formule : Adresse_Physique = (Segment × 16) + Déplacement.',
    'Multiplier un nombre hexadécimal par 16 équivaut à lui ajouter un zéro à droite (décalage de 4 bits).'
  ],
  'asm2-c4-e2': [
    'L’adresse virtuelle (VA) d’un symbole correspond à l’addition de l’adresse de base de la section et de son déplacement relatif.',
    'Vérifiez la concordance entre la valeur décimale et la notation hexadécimale sur 32 bits.'
  ],
  'asm2-c4-e3': [
    'Pour aligner une adresse A sur une frontière de N octets, calculez le padding requis : (N - (A mod N)) mod N.',
    'La nouvelle adresse alignée est égale à A + padding et doit être strictement divisible par N.'
  ],
  'asm2-c5-e2': [
    'L’instruction LEA applique la formule d’adressage x86 : Adresse = Base + (Index × Facteur_Echelle) + Déplacement.',
    'L’instruction LEA calcule uniquement l’adresse arithmétique sans jamais lire le contenu de la mémoire.'
  ],
  'asm2-c5-e3': [
    'Sur un registre 32 bits, conservez les calculs modulo 2^32 (plage 0 à 0xFFFFFFFF).',
    'Pour interpréter la valeur signée, si le bit de poids fort vaut 1, appliquez la convention du complément à 2.'
  ],
  'asm2-c6-e1': [
    'La pile x86 grandit vers le bas : chaque PUSH décrémente ESP de 4 octets et écrit au sommet.',
    'Chaque POP lit la valeur au sommet et incrémente ESP de 4 octets.'
  ],

  // b3-firewall
  'fw3-c5-e2': [
    'Maintenez l’historique horodaté des requêtes acceptées pour chaque adresse IP source.',
    'Rejetez toute requête excédant le seuil de débit maximal autorisé dans la fenêtre glissante d’observation.'
  ],

  // b3-github
  'gh3-c1-e1': [
    'L’en-tête d’un objet Git se compose du type d’objet, d’un espace, de la taille en octets et d’un octet nul.',
    'L’empreinte SHA-1 de 40 caractères hexadécimaux est calculée sur la concaténation de l’en-tête et du contenu brut.'
  ],
  'gh3-c3-e2': [
    'L’outil git bisect utilise la recherche dichotomique pour identifier le commit responsable d’une régression en log2(N) étapes.',
    'À chaque itération, examinez le commit médian situé à mi-chemin entre la bonne version connue et la mauvaise version.'
  ],

  // b3-reseau-lan
  'lan3-c2-e2': [
    'Dans une agrégation de liens (LACP / EtherChannel), la distribution de charge s’appuie sur une fonction de hachage des adresses MAC ou IP.',
    'Appliquez l’opération de hachage pour déterminer sur quel port physique de l’équipe de cartes la trame est transmise.'
  ],
  'lan3-c5-e1': [
    'Le mécanisme de sécurité Port Security surveille le nombre d’adresses MAC distinctes autorisées sur un port de commutateur.',
    'Si une trame avec une adresse MAC inconnue arrive alors que le seuil maximal est atteint, le port bascule en violation (err-disable).'
  ],

  // b3-sql
  'sql3-c4-e2': [
    'Une fonction de fenêtrage (OVER (...)) applique un calcul d’agrégation sur une partition sans regrouper les lignes.',
    'Définissez la fenêtre glissante (ROWS BETWEEN ... PRECEDING AND CURRENT ROW) pour calculer la moyenne mobile.'
  ],

  // b3-veille
  'vt3-c3-e2': [
    'Normalisez les URLs collectées en supprimant les paramètres de traçage superflus et les ancres.',
    'L’indice de similarité de Jaccard mesure la proximité sémantique de deux sources par le quotient de l’intersection des mots par leur union.'
  ],

  // b3-cloud-azure
  'az3-c1-e2': [
    'Consultez la cartographie des régions Azure pour identifier les zones de disponibilité (Availability Zones) et régions appairées.',
    'Vérifiez la conformité du contrat de niveau de service (SLA) avec les exigences de redondance géographique.'
  ],

  // b3-cryptographie
  'cr3-c2-e2': [
    'Le bourrage PKCS#7 complète un bloc de taille B en ajoutant P octets valant chacun la valeur numérique P.',
    'Pour valider le débourrage, vérifiez que tous les P derniers octets correspondent bien à la valeur P.'
  ],
  'cr3-c5-e3': [
    'Contrôlez en premier lieu l’état de révocation du certificat en consultant la liste de révocation (CRL) ou le protocole OCSP.',
    'Validez l’ensemble de la chaîne de confiance en vérifiant que chaque certificat intermédiaire est signé par l’autorité supérieure.'
  ],

  // b3-google-cloud
  'gcp3-c3-e3': [
    'La répartition de trafic Cloud Run Traffic Split affecte des pourcentages stricts entre les différentes révisions du conteneur.',
    'Vérifiez que la somme des quotas de trafic alloués aux révisions déployées atteint exactement 100%.'
  ],

  // b3-hacking
  'hk3-c1-e3': [
    'Le modèle Cyber Kill Chain de Lockheed Martin décompose une cyberattaque en 7 phases séquentielles strictes.',
    'Analysez les preuves d’activité pour déterminer la phase la plus avancée atteinte par l’attaquant et évaluer la couverture de l’attaque.'
  ]
};

// Find and update each exercise across server/exercises
const exDir = path.join(process.cwd(), 'server/exercises');

function scanAndUpdate(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanAndUpdate(fullPath);
    } else if (item.endsWith('.js') && item !== 'index.js' && item !== 'runner.js' && item !== 'course-config.js') {
      try {
        const mod = require(fullPath);
        if (Array.isArray(mod)) {
          let modified = false;
          for (const ex of mod) {
            if (ex && ex.id && cleanHints[ex.id]) {
              ex.hints = cleanHints[ex.id];
              modified = true;
              console.log(`Updated hints for ${ex.id} in ${path.relative(process.cwd(), fullPath)}`);
            }
          }
          if (modified) {
            const header = fullPath.includes('assembleur') || fullPath.includes('RD-RO') || fullPath.includes('b3-')
              ? "'use strict';\n\nmodule.exports = "
              : "/**\n * Exercices mis à jour — remédiation pédagogique\n */\n'use strict';\n\nmodule.exports = ";
            fs.writeFileSync(fullPath, header + JSON.stringify(mod, null, 2) + ';\n', 'utf8');
          }
        }
      } catch (e) {
        console.error(`Error processing ${fullPath}:`, e.message);
      }
    }
  }
}

scanAndUpdate(exDir);
console.log('Finished updating all residual hints!');
