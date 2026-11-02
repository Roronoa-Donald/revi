'use strict';

const brand = (code, name, country = 'FRANCE') => [code, name, country];
const car = (plate, code, km, price = 10000000, date = '2020-01-01', engine = 'ESSENCE') =>
  [plate, code, km, price, date, engine];
const model = (brands, cars, equipment = [], links = []) => ({ brands, cars, equipment, links });
const test = (label, data, note) => ({ label, data, note });

const alpha = brand('ALP', 'ALPHA');
const beta = brand('BET', 'BETA');
const emptyFirst = model([alpha, beta], [car('P-A', 'BET', 1)]);
const reversedBrands = model([alpha, beta], [car('P-A', 'BET', 1), car('P-B', 'ALP', 1)]);

const plans = {
  'sq-c1-e1': {
    errors: [
      ['Tri sur le kilométrage au lieu de l’immatriculation', 'SELECT * FROM Voiture ORDER BY km DESC, immat ASC;'],
      ['Exclusion injustifiée des dates NULL', 'SELECT * FROM Voiture WHERE datecirc IS NOT NULL ORDER BY immat ASC;']
    ],
    cases: [
      test('Tri différent, dates présentes', model([alpha, beta], [car('P-A', 'ALP', 1), car('P-B', 'BET', 9)])),
      test('Kilométrages égaux et date absente', model([alpha, beta], [car('P-B', 'BET', 0), car('P-A', 'ALP', 0, 10000000, null)]))
    ]
  },
  'sq-c1-e2': {
    errors: [
      ['Exclusion injustifiée des dates NULL', 'SELECT immat, marque FROM Voiture WHERE datecirc IS NOT NULL ORDER BY immat ASC;'],
      ['Tri par marque au lieu de l’immatriculation', 'SELECT immat, marque FROM Voiture ORDER BY marque ASC, immat ASC;']
    ],
    cases: [
      test('Date absente, tris concordants', model([alpha, beta], [car('P-A', 'ALP', 1, 10000000, null), car('P-B', 'BET', 1)])),
      test('Dates présentes, tris opposés', reversedBrands)
    ]
  },
  'sq-c1-e3': {
    errors: [
      ['Oubli de DISTINCT', 'SELECT moteur FROM Voiture ORDER BY moteur ASC;'],
      ['Exclusion injustifiée des dates NULL', 'SELECT DISTINCT moteur FROM Voiture WHERE datecirc IS NOT NULL ORDER BY moteur ASC;']
    ],
    cases: [
      test('Motorisation répétée, dates présentes', model([alpha], [car('P-A', 'ALP', 1), car('P-B', 'ALP', 2)])),
      test('Motorisations distinctes, date absente', model([alpha], [car('P-A', 'ALP', 1, 10000000, null, 'ESSENCE'), car('P-B', 'ALP', 1, 10000000, '2020-01-01', 'DIESEL')]))
    ]
  },
  'sq-c2-e1': {
    errors: [
      ['NOT NULL omis sur la clé primaire texte', "CREATE TABLE Marque (codemarque TEXT PRIMARY KEY, nommarque TEXT NOT NULL UNIQUE, paysmarque TEXT NOT NULL, UNIQUE (codemarque, nommarque)); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('BMW', 'BMW', 'ALLEMAGNE');"],
      ['Unicité individuelle du nom omise', "CREATE TABLE Marque (codemarque TEXT NOT NULL PRIMARY KEY, nommarque TEXT NOT NULL, paysmarque TEXT NOT NULL, UNIQUE (codemarque, nommarque)); INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES ('BMW', 'BMW', 'ALLEMAGNE');"]
    ],
    cases: [
      { label: 'Clé texte explicitement NOT NULL', probe: 'marque_notnull' },
      { label: 'Unicité individuelle du nom', probe: 'marque_unique' }
    ]
  },
  'sq-c2-e2': {
    errors: [
      ['Unicité individuelle du nom omise', "CREATE TABLE Equipement (codeequipement TEXT NOT NULL PRIMARY KEY, nomequipement TEXT NOT NULL, prix INTEGER DEFAULT 0); INSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AIR', 'Climatisation');"],
      ['NOT NULL omis sur le nom', "CREATE TABLE Equipement (codeequipement TEXT NOT NULL PRIMARY KEY, nomequipement TEXT UNIQUE, prix INTEGER DEFAULT 0); INSERT INTO Equipement (codeequipement, nomequipement) VALUES ('AIR', 'Climatisation');"]
    ],
    cases: [
      { label: 'Unicité individuelle du nom', probe: 'equipement_unique' },
      { label: 'Nom explicitement NOT NULL', probe: 'equipement_notnull' }
    ]
  },
  'sq-c2-e3': {
    errors: [
      ['Colonne prix déclarée en texte plutôt qu’en entier', 'ALTER TABLE Equipement ADD COLUMN prix TEXT DEFAULT 0;'],
      ['Valeur par défaut erronée', 'ALTER TABLE Equipement ADD COLUMN prix INTEGER DEFAULT 1;']
    ],
    cases: [
      { label: 'Type entier de prix après ALTER', probe: 'prix_type' },
      { label: 'Prix par défaut égal à zéro', probe: 'prix_defaut' }
    ]
  },
  'sq-c3-e1': {
    errors: [
      ['Borne 5 exclue', 'SELECT immat, km FROM Voiture WHERE km > 5 ORDER BY km DESC, immat ASC;'],
      ['Kilométrage trié croissant', 'SELECT immat, km FROM Voiture WHERE km >= 5 ORDER BY km ASC, immat ASC;']
    ],
    cases: [
      test('Seuil inclus et kilométrages égaux', model([alpha], [car('P-B', 'ALP', 5), car('P-A', 'ALP', 5)])),
      test('Kilométrages distincts au-dessus du seuil', model([alpha], [car('P-A', 'ALP', 6), car('P-B', 'ALP', 9)]))
    ]
  },
  'sq-c3-e2': {
    errors: [
      ['Bornes de prix exclues', "SELECT immat, marque, pxachat FROM Voiture WHERE pxachat > 6000000 AND pxachat < 50000000 AND marque LIKE 'M%' ORDER BY pxachat ASC, immat ASC;"],
      ['M n’importe où plutôt qu’en première position', "SELECT immat, marque, pxachat FROM Voiture WHERE pxachat BETWEEN 6000000 AND 50000000 AND marque LIKE '%M%' ORDER BY pxachat ASC, immat ASC;"]
    ],
    cases: [
      test('Bornes présentes, marques commençant par M', model([brand('MAZ', 'MAZDA'), brand('MER', 'MERCEDES')], [car('P-A', 'MAZ', 1, 6000000), car('P-B', 'MER', 1, 50000000)])),
      test('Prix intérieurs et M au milieu', model([brand('MAZ', 'MAZDA'), brand('BMW', 'BMW')], [car('P-A', 'MAZ', 1, 10000000), car('P-B', 'BMW', 1, 20000000)]))
    ]
  },
  'sq-c3-e3': {
    errors: [
      ['Limite de trois lignes oubliée', 'SELECT immat, marque FROM Voiture WHERE datecirc IS NULL ORDER BY immat ASC;'],
      ['Chaîne vide traitée comme NULL', "SELECT immat, marque FROM Voiture WHERE datecirc IS NULL OR datecirc = '' ORDER BY immat ASC LIMIT 3;"]
    ],
    cases: [
      test('Quatre dates NULL sans chaîne vide', model([alpha], [car('P-A', 'ALP', 1, 10000000, null), car('P-B', 'ALP', 1, 10000000, null), car('P-C', 'ALP', 1, 10000000, null), car('P-D', 'ALP', 1, 10000000, null)])),
      test('Une date NULL et une chaîne vide', model([alpha], [car('P-A', 'ALP', 1, 10000000, null), car('P-B', 'ALP', 1, 10000000, '')]))
    ]
  },
  'sq-c4-e1': {
    errors: [
      ['LEFT JOIN au lieu de INNER JOIN', 'SELECT M.nommarque, V.immat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;'],
      ['Immatriculation avant marque dans le tri', 'SELECT M.nommarque, V.immat FROM Marque M INNER JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY V.immat ASC, M.nommarque ASC;']
    ],
    cases: [test('Marque sans voiture', emptyFirst), test('Toutes les marques présentes, tris opposés', reversedBrands)]
  },
  'sq-c4-e2': {
    errors: [
      ['INNER JOIN au lieu de LEFT JOIN', 'SELECT M.nommarque, V.immat FROM Marque M INNER JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY M.nommarque ASC, V.immat ASC;'],
      ['Immatriculation avant marque dans le tri', 'SELECT M.nommarque, V.immat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque ORDER BY V.immat ASC, M.nommarque ASC;']
    ],
    cases: [test('Marque initiale sans voiture', emptyFirst), test('Toutes les marques présentes, tris opposés', reversedBrands)]
  },
  'sq-c4-e3': {
    errors: [
      ['Équipements gratuits exclus', 'SELECT V.immat, E.nomequipement FROM Voiture V INNER JOIN VoitureEquipement VE ON V.immat = VE.immat INNER JOIN Equipement E ON VE.codeequipement = E.codeequipement WHERE E.prix > 0 ORDER BY V.immat ASC, E.nomequipement ASC;'],
      ['Nom d’équipement avant immatriculation dans le tri', 'SELECT V.immat, E.nomequipement FROM Voiture V INNER JOIN VoitureEquipement VE ON V.immat = VE.immat INNER JOIN Equipement E ON VE.codeequipement = E.codeequipement ORDER BY E.nomequipement ASC, V.immat ASC;']
    ],
    cases: [
      test('Une voiture et un équipement gratuit', model([alpha], [car('P-A', 'ALP', 1)], [['AIR', 'Clim', 0], ['GPS', 'GPS', 100]], [['P-A', 'AIR'], ['P-A', 'GPS']])),
      test('Équipements payants, tris opposés', model([alpha], [car('P-A', 'ALP', 1), car('P-B', 'ALP', 1)], [['CAM', 'Camera', 100], ['RAD', 'Radio', 200]], [['P-A', 'RAD'], ['P-B', 'CAM']]))
    ]
  },
  'sq-c5-e1': {
    errors: [
      ['COUNT(prix) au lieu de COUNT(*)', 'SELECT M.paysmarque, COUNT(V.pxachat) AS nb_lignes, COUNT(V.immat) AS nb_voitures, SUM(V.pxachat) AS total_achat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque GROUP BY M.paysmarque ORDER BY M.paysmarque ASC;'],
      ['SUM(DISTINCT prix) au lieu de SUM(prix)', 'SELECT M.paysmarque, COUNT(*) AS nb_lignes, COUNT(V.immat) AS nb_voitures, SUM(DISTINCT V.pxachat) AS total_achat FROM Marque M LEFT JOIN Voiture V ON M.codemarque = V.codemarque GROUP BY M.paysmarque ORDER BY M.paysmarque ASC;']
    ],
    cases: [
      test('Marque sans voiture, prix sans répétition', model([alpha, beta], [car('P-A', 'ALP', 1, 100)])),
      test('Toutes les marques représentées, prix répété', model([alpha, beta], [car('P-A', 'ALP', 1, 100), car('P-B', 'BET', 1, 100)]))
    ]
  },
  'sq-c5-e2': {
    errors: [
      ['Seuil d’agrégat strict au lieu d’inclus', 'SELECT marque, SUM(pxachat) AS total FROM Voiture GROUP BY marque HAVING SUM(pxachat) > 50000000 ORDER BY total DESC, marque ASC;'],
      ['HAVING oublié', 'SELECT marque, SUM(pxachat) AS total FROM Voiture GROUP BY marque ORDER BY total DESC, marque ASC;']
    ],
    cases: [
      test('Un total égal au seuil, aucun inférieur', model([alpha, beta], [car('P-A', 'ALP', 1, 50000000), car('P-B', 'BET', 1, 60000000)])),
      test('Un total inférieur, aucun égal au seuil', model([alpha, beta], [car('P-A', 'ALP', 1, 1000000), car('P-B', 'BET', 1, 60000000)]))
    ]
  },
  'sq-c5-e3': {
    errors: [
      ['COUNT(DISTINCT km) au lieu de COUNT(*)', 'SELECT marque, COUNT(DISTINCT km) AS effectif, MIN(km) AS km_min, MAX(km) AS km_max FROM Voiture GROUP BY marque ORDER BY marque ASC;'],
      ['MAX utilisé à la place de MIN', 'SELECT marque, COUNT(*) AS effectif, MAX(km) AS km_min, MAX(km) AS km_max FROM Voiture GROUP BY marque ORDER BY marque ASC;']
    ],
    cases: [
      test('Kilométrages identiques', model([alpha], [car('P-A', 'ALP', 4), car('P-B', 'ALP', 4)])),
      test('Kilométrages distincts', model([alpha], [car('P-A', 'ALP', 2), car('P-B', 'ALP', 9)]))
    ]
  },
  'sq-c6-e1': {
    errors: [
      ['Seuil 5 inclus à tort', 'UPDATE Voiture SET km = km + 10 WHERE km <= 5;'],
      ['Affectation de 10 au lieu d’ajouter 10', 'UPDATE Voiture SET km = 10 WHERE km < 5;']
    ],
    cases: [
      test('Kilométrages 0 et 5', model([alpha], [car('P-A', 'ALP', 0), car('P-B', 'ALP', 5)])),
      test('Kilométrages 4 et 6', model([alpha], [car('P-A', 'ALP', 4), car('P-B', 'ALP', 6)]))
    ]
  },
  'sq-c6-e2': {
    errors: [
      ['Chaîne vide supprimée comme si elle était NULL', "DELETE FROM Voiture WHERE datecirc IS NULL OR datecirc = '';"],
      ['Suppression limitée à tort aux voitures à zéro kilomètre', 'DELETE FROM Voiture WHERE datecirc IS NULL AND km = 0;']
    ],
    cases: [
      test('NULL à zéro kilomètre et chaîne vide', model([alpha], [car('P-A', 'ALP', 0, 10000000, null), car('P-B', 'ALP', 1, 10000000, ''), car('P-C', 'ALP', 2)], [['GPS', 'GPS', 100]], [['P-A', 'GPS'], ['P-B', 'GPS']])),
      test('NULL à kilométrage non nul, aucune chaîne vide', model([alpha], [car('P-A', 'ALP', 4, 10000000, null), car('P-B', 'ALP', 1)], [['GPS', 'GPS', 100]], [['P-A', 'GPS'], ['P-B', 'GPS']]))
    ]
  },
  'sq-c6-e3': {
    errors: [
      ['Filtre sur le pays oublié', 'SELECT immat, marque FROM Voiture WHERE codemarque IN (SELECT codemarque FROM Marque) ORDER BY immat ASC;'],
      ['Sous-requête scalaire utilisée au lieu de IN', "SELECT immat, marque FROM Voiture WHERE codemarque = (SELECT codemarque FROM Marque WHERE paysmarque = 'JAPON') ORDER BY immat ASC;"]
    ],
    cases: [
      test('Une marque japonaise et une marque étrangère représentées', model([brand('TOY', 'TOYOTA', 'JAPON'), brand('REN', 'RENAULT')], [car('P-A', 'TOY', 1), car('P-B', 'REN', 1)])),
      test('Deux marques japonaises représentées, aucune voiture étrangère', model([brand('TOY', 'TOYOTA', 'JAPON'), brand('MAZ', 'MAZDA', 'JAPON'), brand('REN', 'RENAULT')], [car('P-A', 'TOY', 1), car('P-B', 'MAZ', 1)]), 'La sous-requête scalaire sans ORDER BY ne garantit pas quelle marque est retenue ; une seule des deux suffit à prouver le rejet.')
    ]
  }
};

module.exports = plans;
