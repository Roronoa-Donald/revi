# 17 — Règles métier ayant un impact sur les interfaces

> Chaque règle est reliée à son effet visible. Source : `server.js`, `server/middleware/access-control.js`, `middleware.js`, `server/db.js`, `server/routes/*`, `server/preparation-content.js`.

## 1. Niveaux

| Règle | Effet UI |
|---|---|
| Trois niveaux : B1 < B2 < B3 | trois onglets au portail, trois cartes à l'inscription |
| Un niveau inclut les précédents | texte explicite sous la grille d'inscription |
| Un compte ne peut pas changer de niveau | aucun contrôle dans l'interface |
| Le niveau conditionne l'accès au contenu | `?level=denied` |
| `b1` est le niveau par défaut d'un visiteur | onglet B1 actif au premier chargement |

## 2. Accès au contenu

| Règle | Effet UI |
|---|---|
| Index et sommaire publics | accessibles sans compte |
| Chapitre 1 public | badge « Accès libre » |
| Chapitre 2+ protégé | cadenas sur le sommaire, redirection login |
| QCM protégé (données) | jamais servi en JSON public |
| `epreuves/` intégralement protégé | même l'index demande un compte |
| `preparation-web/` : abonnement + mot de passe | double barrière |
| Assets de `preparation-web/` libres | les fichiers statiques ne sont pas protégés |

## 3. Abonnement

| Règle | Effet UI |
|---|---|
| Deux formules : 5 000 FCFA/mois, 45 000 FCFA/an | deux boutons sur la page compte |
| Paiement via FedaPay | widget externe |
| Abonnement actif = date future ou nulle | badge « Actif » |
| Expiration = retour au gratuit | badge « Gratuit » |
| Renouvellement = +1 mois ou +1 an | bouton « Renouveler » |
| Paiement désactivable | bouton grisé + message |
| L'admin peut abonner manuellement (0/1/3/6/12 mois) | formulaire de création |

## 4. Comptes et sessions

| Règle | Effet UI |
|---|---|
| Email unique | erreur 409 à l'inscription |
| Mot de passe ≥ 8 caractères | validation client + serveur |
| 3 sessions maximum | la plus ancienne est révoquée silencieusement |
| Cookie 30 jours | reconnexion rare |
| Compte désactivable | login refusé |
| Suppression définitive | sessions et données liées supprimées |
| Réinitialisation de sessions | déconnexion de tous les appareils |
| Admin en cookie séparé (8 h) | deux sessions indépendantes |

## 5. Rôles

| Règle | Effet UI |
|---|---|
| L'admin ne voit pas les cours avec un cookie admin | deux univers séparés |
| Un abonné n'est pas admin | pas de lien admin dans l'interface publique |
| Aucun lien vers `/_auth/admin` depuis le site | accès par URL directe |

## 6. Code lab

| Règle | Effet UI |
|---|---|
| Une exécution par clic, jamais à la frappe | bouton unique |
| Quota quotidien par utilisateur (40) et global (900) | message « Trop de demandes d'exécution » |
| Délai maximal 20 s | message « Délai d'exécution dépassé » |
| Tests et solutions jamais côté client | pas de test visible, pas de solution |
| Validation suspendue sur 354 exercices | bouton désactivé + avis |
| Tuteur : explications seulement, jamais de code | notice explicite |
| SQL non exécutable côté serveur | simulateur WebAssembly local |
| Piston prioritaire, Oanor en secours | badge de provenance (serveur) |
| Sans fournisseur configuré | 503, message d'indisponibilité |

## 7. QCM et examens

| Règle | Effet UI |
|---|---|
| Correction immédiate sur les pages statiques | explication révélée au clic |
| Une seule réponse par question | options désactivées après le clic |
| Seuil de réussite 70 % | `passed` dans l'API examen |
| Session d'examen 30 s de tolérance | expiration |
| Anti-oracle : pas de correction avant clôture | 403 |
| Soumission idempotente | même score si rejeu |
| Chronomètre sur le simulateur | `mm:ss`, arrêt à 0 |

## 8. Preparation Web

| Règle | Effet UI |
|---|---|
| Abonnement obligatoire | 403 `subscription` |
| Mot de passe de section | formulaire dédié |
| Cookie 365 jours, invalidé si mot de passe changé | reverrouillage |
| Projets séquentiels | verrouillage des suivants |
| Solution après 2 échecs | bouton masqué avant |
| Indice et solution coûtent de l'XP | malus |
| Quiz après validation | sinon 403 |
| 12 projets | rail et progression « n/12 » |

## 9. Administration

| Règle | Effet UI |
|---|---|
| Admin désactivé sans variables d'environnement | 503 au login |
| Cookie 8 h | expiration rapide |
| Filtres : tous, abonnés, gratuits, désactivés | 4 boutons |
| Recherche email/nom | champ avec debounce |
| Journal paginé | navigation par offset |
| Clés IA avec cooldown | colonnes dédiées |
| Test de clé avant ajout | bouton « Tester » |

## 10. Contenus et génération

| Règle | Effet UI |
|---|---|
| Les pages générées ne se modifient pas à la main | cohérence des 13 pages |
| Un cours sans lab n'a pas de section exercices | pas de trou de numérotation |
| Les exercices suspendus gardent leur énoncé | contenu lisible, validation coupée |
| Le registre `COURSES` est la source unique | 71 cours, 70 cartes |
| `b1-vb-excel` archivé | absent du portail, présent dans l'API |
| Pas d'emoji | 3 pages servies à corriger |

## 11. Règles implicites observées (à confirmer produit)

- L'ordre des cartes suit l'ordre du registre, pas l'alphabet.
- Le niveau du compte est appliqué au portail **seulement** si aucun niveau n'est mémorisé : un utilisateur B3 qui a choisi B1 reste en B1.
- La carte « Reprendre » se base sur la progression locale du navigateur, pas sur le compte : elle ne suit pas l'utilisateur d'un appareil à l'autre.
- Les scores QCM ne sont pas enregistrés côté serveur sur les pages statiques.
- Les 3 sessions maximum sont comptées par utilisateur, tous appareils confondus.
- Un cours B1 est accessible à un compte B2/B3 (niveau supérieur), mais l'inverse est faux.
