# Lot 2 — rapport de correction et de contre-vérification

**État au 30 octobre 2026 : travaux effectués, porte du lot 2 non franchie.** Les quatre constats reportés, les contrôles SQL et d'intégrité rouges, ainsi que les vérifications partielles décrites ici interdisent de présenter le dossier comme publiable. Le travail s'arrête avant le lot 3 ; aucun déploiement n'a été réalisé.

Le périmètre est le **dossier local**, pas le site en ligne. Les comptes ci-dessous décrivent les preuves conservées, non une garantie d'exactitude de tous les cours. Les sorties brutes complètes sont dans `resultats/` ; les noms de fichiers sont précisés pour chaque contrôle. Les rapports de contre-vérification conservent aussi les anomalies observées avant leur correction : leurs dernières reprises font foi pour les points rejoués.

## Registre et décisions

Sur les **173 constats affectés au lot 2** dans `suivi.csv` :

| Gravité reclassée | Corrigés | Nuancés | Refusés | Reportés | Total |
|---|---:|---:|---:|---:|---:|
| S0 | 93 | 6 | 0 | 4 | 103 |
| S1 | 49 | 21 | 0 | 0 | 70 |
| Total | **142** | **27** | **0** | **4** | **173** |

Les quatre reports sont **F116, F117, F118 et F205**. Leur résultat numérique ou leur texte a été amélioré, mais un correcteur fondé seulement sur les sorties ne démontre pas que la méthode imposée ou interdite a été respectée. Les cinq exercices B1 algorithmique concernés restent suspendus ; une validation de méthode et une contre-vérification sont encore nécessaires. La suspension n'est pas une correction du défaut de fond.

Le registre détaille les localisations, changements, preuves et sources pour chaque identifiant. Chacune des 173 lignes comporte au moins une URL dans les champs de source ou de preuve, mais certaines sources sont héritées et n'ont pas toutes été revérifiées dans leur version actuelle. En particulier, l'accès direct à Légifrance pour F154 a renvoyé HTTP 403 : le contenu signale la version de 2015 et invite à vérifier le droit applicable ; les peines en vigueur ne sont pas certifiées. Les sources complémentaires consultées le 30 octobre 2026 et leurs empreintes sont dans `resultats/sources-complement-lot2.md`.

## Corrections significatives

| Constat | Avant → après | Preuve et portée |
|---|---|---|
| F12 | La formule usuelle d'hôtes était générale → le cours précise le cas usuel, `/31` point-à-point compatible et `/32`. | `resultats/reseaux-lot2-avant.txt`, `resultats/reseaux-lot2-final.txt` ; RFC 3021, consultée le 30 octobre 2026 : https://www.rfc-editor.org/rfc/rfc3021.html. |
| F188 | La suite TLS était utilisée seule pour déduire la confidentialité persistante ; un QCM promettait 1 RTT → le mode d'échange est distingué et le QCM exclut `HelloRetryRequest`. | `resultats/cryptographie-lot2-integration-tests.txt`, `resultats/lot2-contreverification-s0-independante.md` ; RFC 9846 consultée le 30 octobre 2026 : https://www.rfc-editor.org/rfc/rfc9846.html. Handshakes OpenSSL locaux, pas de service de production. |
| F156 | La redondance ou un SLA étaient présentés trop généralement → les zones ne garantissent pas seules la résilience et les objectifs de l'examen sont explicitement fictifs. | `resultats/lot2-reprise-independante-avant.txt` et `resultats/lot2-reprise-independante-apres.txt` ; conditions Google consultées le 30 octobre 2026 : https://cloud.google.com/compute/sla. Aucun déploiement GCP réel. |
| F191 | Une absence de signature conduisait à `CLEAN` et à un risque faible → les deux grilles concernées rapportent une correspondance textuelle sans conclure à l'innocuité. | `resultats/lot2-s1-grilles-avant.txt`, `resultats/lot2-s1-grilles-apres.txt` ; NIST SP 800-94 consulté le 30 octobre 2026 : https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-94.pdf. |
| F03, reprise du lot 1 | Les corrigés C# mémorisaient des entrées ; `.75` était ensuite lu comme `75` et un cumul pouvait déborder → corrigés généraux, notation décimale bornée, cumul en `BigInteger`, arrondi au centime défini et bornes `decimal` testées. | `resultats/lot2-csharp-bornes-avant.txt`, `resultats/lot2-csharp-borne-max-avant.txt`, `resultats/lot2-csharp-borne-max-apres.txt`, `resultats/lot2-csharp-bornes-independant.md`. Microsoft consulté le 30 octobre 2026 : https://learn.microsoft.com/en-us/dotnet/api/system.midpointrounding?view=net-9.0. F03 appartient au lot 1 et n'est pas ajouté aux 173. |

Autres reprises issues de la vérification : formulation juridique F154 sans qualification pénale automatique, limites de la migration à chaud F221, inactivité Cisco `exec-timeout 0 0` plutôt que promesse de session jamais interrompue, et suppression des attributs sur les balises `<br>` traitées par le gabarit. Les rejets et les limites d'exploitation sont documentés dans les journaux respectifs ; le scénario de rendu HTML est synthétique et ne prouve pas qu'un élève puisse modifier les contenus.

## Contestations et nuances

- **F12 :** la formule n'est pas fausse pour le cas ordinaire ; c'est sa portée universelle qui est contestée. La réserve `/31` a été ajoutée plutôt que de supprimer la formule.
- **F108 :** l'analogie entre les divisions et restes Pascal et Python est bornée selon les signes ; les exemples Python ont été exécutés, mais le compilateur Pascal n'a pas été rejoué lors de la contre-vérification indépendante. Références dans `suivi.csv`.
- **F127 :** une recommandation de catégorie 6A ne démontre pas que toute catégorie 6 est incompatible avec 10GBASE-T ; le chiffre de 55 m est limité au matériel Cisco cité et à son contexte, pas généralisé à tout équipement. Source consultée le 30 octobre 2026 : https://www.cisco.com/c/en/us/products/interfaces-modules/catalyst-6500-16-port-10-gigabit-ethernet-copper-module/index.html. Aucun câble réel n'a été testé.
- **F129 :** le vérificateur a montré qu'une réponse `cat5e`, compatible avec la consigne précédente, était refusée. La grille indique désormais sa convention de choix ; ce n'est pas une affirmation d'incompatibilité de `cat5e`. Le contre-exemple et sa reprise figurent dans `resultats/lot2-contreverification-s1-independante.md`.

Ces décisions ne sont pas des refus de traiter les constats : elles distinguent une règle générale, une convention d'exercice et une affirmation universelle.

## Contre-vérification indépendante

- **S0 :** les 103 fiches ont été examinées ; 85 ont un rejeu ciblé concluant et 18 restent partiellement vérifiées. Ce nombre n'est pas une preuve de conformité complète des 103 fiches. Les reprises A, B et C sont dans `resultats/lot2-contreverification-s0-a-independante.md`, `resultats/lot2-contreverification-s0-independante.md` et `resultats/lot2-contreverification-s0-c-independante.md`.
- **S1 :** 21 fiches sur 70, soit 30 %, tirées par `SHA-256("20261030:" + id)` : 18 rejeux ciblés concluants et 3 partiels, F119, F135 et F159. Le détail et les reprises figurent dans `resultats/lot2-contreverification-s1-independante.md`.
- **C# ciblé :** un oracle indépendant et le vrai moteur local acceptent le corrigé 7/7. Un mutant de troncature est rejeté pour `wrong_output` ; un autre, qui multiplie le prix par 100, est rejeté pour `runtime_error` à la borne. Les deux extrêmes sont vérifiés séparément pour le corrigé. Ce second rejet n'est pas une comparaison de sortie. La route simulée renvoie 503 sans appel au fournisseur. Rapport et journal : `resultats/lot2-csharp-bornes-independant.md` et `resultats/lot2-csharp-bornes-independant-journal.txt`.

Ces vérifications portent sur les contre-exemples énumérés et non sur tous les comportements possibles. Elles ne comprennent ni fournisseur distant, ni matériel Cisco, ni migration VMware réelle, ni validation générale du droit en vigueur.

## Couverture des évaluations et suspensions

Le tableau `tableau-cours-lot2.md` couvre **71 cours, 420 fiches de code et 830 grilles d'analyse**. L'état et les provenances par identifiant sont dans `resultats/etat-exercices-lot2.tsv` ; `resultats/lacunes-couverture-lot2.md` liste les fiches pour lesquelles les critères ne sont pas établis. « Non établi » ne signifie pas nécessairement que les cas ou variantes n'existent pas.

- Les **131 fiches suspendues** disposent chacune, dans les preuves retenues, de deux témoins cachés croisés et de deux variantes incorrectes rejetées : 126 fiches de sept cours et cinq exercices B1 d'algorithmique. La suspension reste maintenue : ces critères ne prouvent ni la méthode imposée ni la sûreté d'un fournisseur distant.
- Sur les 420 fiches de code, **405** disposent de deux cas nouveaux strictement établis, **131** de deux témoins cachés croisés et **196** de deux variantes incorrectes rejetées dans les preuves retenues. Pour respectivement 15, 289 et 224 fiches, le critère correspondant n'est pas établi par ce tableau ; ces groupes se recoupent. Une paire nominalement nouvelle n'est pas une preuve de généralisation universelle.
- Le banc isolé `resultats/lot2-matrice-suspendus-v13.json`, vérifié structurellement par `resultats/lot2-matrice-suspendus-v13-verifiee.txt`, couvre 90 fiches, 1 653 exécutions et 212 variantes rejetées pour mauvaise sortie. Le vérificateur de ce JSON contrôle sa cohérence, pas un oracle indépendant. Les 36 exercices SQL B2/B3 et les cinq fiches B1 d'algorithmique ont leurs bancs distincts indiqués dans le tableau.
- Le banc commun d'entrées nouvelles `resultats/lot2-finale-v13-generalisation.json` classe 393 fiches réussies, 0 en échec et 857 non évaluées, dont les 830 grilles. Un banc C# complémentaire, vérifié séparément, couvre 34 nouveaux cas et 34 mutants sur 17 fiches et confirme deux sondes de bornes : `resultats/lot2-csharp-bornes-generalisation-v13.json`, `resultats/lot2-csharp-bornes-verification-v13.txt`. Une tentative précédente conserve un cas C# interrompu avec le code 134, cause non qualifiée ; le même cas a ensuite réussi dans le banc courant. Cette interruption est conservée dans `resultats/lot2-finale-v12-generalisation-tentative.json` et ne doit pas être présentée comme une erreur du corrigé ni comme une cause diagnostiquée.
- Les 830 grilles portent la mention formative. Le contrôle des projections et des retours simulés ne trouve pas de champ dédié `expected` ; cela n'établit pas qu'aucun attendu ne figure dans le texte envoyé. Par exemple, `erp2-c4-e1` expose dans son énoncé la chaîne attendue pour l'exemple, et `cs2-c1-e2` affiche la chaîne du cas de repli. Les données de cas visibles ne sont pas toutes des réponses, et les 225 coïncidences littérales relevées dans la même grille ne sont pas toutes des fuites : leurs limites et l'instantané concerné sont détaillés dans `resultats/rapport-attendus-grilles-lot1-partie3.md`. L'exigence littérale « aucun attendu renvoyé » n'est donc pas démontrée.
- L'échantillon de **42 grilles sur 830** est `resultats/echantillon-grilles-5pourcent-lot1-partie3.md`. Il est prêt pour une relecture humaine ; aucune telle relecture n'est prétendue réalisée.

## Contrôles obligatoires — avant et après

La référence initiale est `lot-0.md`. Les populations ou gabarits ont parfois changé : les totaux ne sont alors pas des mesures strictement comparables. Un zéro est limité au champ examiné.

| N° | Contrôle | Avant → après et statut | Sorties brutes |
|---:|---|---|---|
| 1 | HTML | 716 diagnostics et 123 éléments inconnus → aucun diagnostic ni élément inconnu sur 944 pages ; `html5lib` ne relève pas d'erreur non plus. **Vert sur l'inventaire statique**, pas sur tout contenu dynamique. | `resultats/pages-avant.json`, `resultats/lot2-finale-v13-pages.json`, `resultats/lot2-finale-v13-html5lib.json`. |
| 2 | KaTeX | 11 erreurs sur 2 800 expressions examinées → 0 sur 2 676 formules ; 832 appels d'auto-rendu analysés. Les extractions ont changé, notamment pour exclure du code ; les totaux ne sont pas strictement comparables. **Vert sur ce périmètre statique.** | `resultats/pages-avant.json`, `resultats/lot2-finale-v13-pages.json`. |
| 3 | DOM/source | 55 éléments manquants et 3 différences → 0 sur les sélecteurs contrôlés ; 2 566 cartes, 3 443 questions, 11 813 options. **Vert limité aux gabarits couverts.** | `resultats/pages-avant.json`, `resultats/lot2-finale-v13-pages.json`. |
| 4 | SQL | 179 échecs bruts sur 255 extraits candidats → 176 sur 270, plus 36 fragments non qualifiés ; 250/250 cas des 54 exercices SQL réussissent séparément. **Rouge** : prose, dialectes et fragments sont mélangés, et toutes les requêtes ne sont pas qualifiées. | `resultats/sql-avant.json`, `resultats/lot2-finale-v13-sql.json`, `qualification-sql-lot1-partie2.md`. |
| 5 | Variantes | Banque historique de 360 : 16 acceptées, 343 rejetées, 1 non évaluée → après lot 1, 0 acceptée, 342 rejetées, 18 non évaluées ou à requalifier. Neuf variantes ont été adaptées ; comparaison imparfaite et banc non rejoué intégralement sur cet instantané. Le banc actuel ne démontre pas deux variantes pour chaque fiche. **Rouge/incomplet.** | `resultats/banc-360-avant.json`, `resultats/banque-lot1-final.txt`, `tableau-cours-lot2.md`, `resultats/lacunes-couverture-lot2.md`. |
| 6 | Intégrité | 18 fusions du motif connu → 0 ; `bash -n` : 108 corrigés contrôlés, 0 erreur. L'ancien repérage de mémorisation est remplacé par des exécutions sur des entrées nouvelles, mais il demeure des fiches non évaluées ; les grilles exposent des données et certains textes reproduisent des attendus. **Rouge.** | `resultats/integrite-avant.json`, `resultats/lot2-finale-v13-integrite-structure.json`, `resultats/lot2-finale-v13-generalisation.json`, `resultats/rapport-attendus-grilles-lot1-partie3.md`. |
| 7 | Langue | F29 et 42 candidats inconnus nouveaux étaient repérés → F29 reste repéré ; 8 407 mots inconnus et 11 049 composés non soumis au correcteur dans le balayage courant. Un mot inconnu n'est pas nécessairement une faute. La comparaison à `main` n'est pas reproductible dans ce dossier sans Git. **Rouge et partiel.** | `resultats/langue-avant.json`, `resultats/lot2-finale-v13-langue.json`. |
| 8 | Liens | 183 fragments manquants candidats → 0 fichier ou fragment manquant sur 19 883 liens locaux contrôlés. **Vert limité** : 132 liens externes ignorés et liens dynamiques non exhaustifs. | `resultats/pages-avant.json`, `resultats/lot2-finale-v13-pages.json`. |
| 9 | Exécution hostile | Repli local après panne simulée observé initialement → contrôles locaux de repli désactivé et sondes hostiles sans non-conformité dans les scénarios essayés. **Partiel** : fournisseurs externes et sécurité exhaustive non testés. | `resultats/sondes-execution-avant.json`, `resultats/lot2-finale-v13-sansgit-execution.txt`. |
| 10 | Suite et construction | Contrôles de synchronisation, suite et build relancés dans le dossier ou une copie isolée ; `dist/` local préservé. **Résultats exacts ci-dessous**, sans implication sur les audits rouges. | `resultats/lot2-finale-v13-courses-check.txt`, `resultats/lot2-finale-v13-labs-check.txt`, `resultats/lot2-finale-v13-sansgit-suite.txt`, `resultats/lot2-finale-v13-sansgit-build.txt`, `resultats/lot2-finale-v13-sansgit-politique.txt`. |

Les 139 occurrences SQL B2/B3 du relevé initial sont qualifiées une à une dans `qualification-sql-lot1-partie2.md`. Exemples de faux positifs documentés : prose, leurre de QCM, fragment volontaire, schéma absent ou dialecte non SQLite. Les défauts réellement corrigés sont distingués des cas restés non vérifiés sur leur moteur. Les 37 échecs bruts B1 actuels nécessitent eux aussi une qualification ; il ne faut assimiler ni les 176 échecs à des fautes, ni les considérer tous comme blanchis. Aucun SQL Server réel n'a été utilisé.

### Extraits des sorties finales

```text
[ok] cours à jour (832 pages, 64 cours)
[ok] ateliers à jour (1250 exercices, 68 cours)
# tests 8627
# pass 8624
# fail 0
# skipped 3
# tests 26
# pass 26
# fail 0
# skipped 0
1446 fichiers copiés, 936 HTML avec auth injectée
```

Les quatre premières lignes de décompte proviennent de la suite complète ; les quatre suivantes du contrôle de politique séparé. Les trois tests ignorés dans la suite y sont tous rejoués avec succès. La construction ne touche que le `dist/` de la copie isolée. Les sorties intégrales sont conservées dans les fichiers indiqués au tableau.

## F101, versions et relecture

Une course `EPIPE` distincte a été reproduite lorsque le processus fils ferme son entrée standard avant la fin d'une écriture. Le banc ne l'accepte que si un code de sortie existe et qu'aucun signal n'a terminé le processus ; les autres erreurs restent des échecs. `resultats/lot2-f101-epipe-avant.txt` échoue et `resultats/lot2-f101-epipe-apres.txt` passe les 15 sous-tests. Le journal final `resultats/lot2-f101-rejeux-finaux-v13.txt` conserve 50 exécutions isolées et 50 sous charge, toutes réussies, avec les TAP et l'empreinte de l'instantané dans `resultats/lot2-f101-rejeux-finaux-v13/`. **La cause du tout premier échec historique est inconnue**, car son erreur était masquée ; elle ne doit pas être attribuée a posteriori à `EPIPE`.

`package.json` et `package-lock.json` déclarent Node `22.x` ; `README.md` documente les configurations Render et Vercel. Les vérifications locales utilisent Node `22.23.2`. Ces déclarations ne prouvent pas la version effectivement déployée.

La relecture `relecture-novice-lot2.md` s'appuie sur 12 pages tirées parmi 236 pages nommées dans les journaux de génération, graine `20261030`. Elle est partielle, certaines pages ne sont lues que par extraits, la population peut omettre des modifications manuelles et aucun novice réel n'a été interrogé. La compréhension de chaque phrase à la première lecture n'est pas établie.

## Reste à faire avant validation

1. Traiter les quatre reports de méthode et les faire rejouer indépendamment avant toute levée de suspension.
2. Qualifier les extraits SQL restants par dialecte et contexte, traiter les éventuelles erreurs réelles, puis rejouer le contrôle sans supprimer les exemples pédagogiques.
3. Compléter les preuves de cas inédits et de variantes selon `resultats/lacunes-couverture-lot2.md`, et résoudre ou qualifier les réponses littérales présentes dans les grilles avant de revendiquer leur confidentialité.
4. Faire vérifier les sources encore partielles, notamment la version juridique applicable, et effectuer une réelle relecture novice sur une population complète et traçable.
5. Ne pas commencer le lot 3 sans l'accord explicite demandé ; ne rien déployer sans autorisation. Aucune branche ni aucun commit n'ont été créés : le dossier actuel n'est pas un dépôt Git selon les consignes du projet.
