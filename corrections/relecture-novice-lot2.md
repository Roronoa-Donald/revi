# Lot 2 — relecture d’un échantillon de pages

Date : 30 octobre 2026. Cette relecture est une **aide à la détection**, pas une validation par des débutants réels. La porte « chaque phrase comprise à la première lecture » n’est pas démontrée.

## Tirage et limites

Le tirage classe les chemins par `SHA-256("20261030:" + chemin)` et retient les 5 % premiers, arrondis au supérieur : **12 pages sur 236**. La liste, la graine, les journaux utilisés et l’empreinte actuelle de chaque page sont dans `resultats/lot2-echantillon-pages-v13.json` ; le programme est `outils/echantillon-pages-lot2.js`. Par rapport au tirage v10, les douze pages et leurs empreintes sont inchangées. Le tirage d'origine, conservé dans `resultats/lot2-echantillon-pages.json`, portait sur 234 pages et sélectionnait les mêmes douze, mais l'empreinte du chapitre 6 CCNA a changé après la correction ci-dessous.

La population est constituée des pages nommées par les journaux de génération du lot 2. Les modifications manuelles et celles sans journal peuvent manquer : ce n’est donc **pas** un tirage de toutes les pages modifiées. Plusieurs pages n’ont été lues que par extraits, notamment leurs sections de cours, cartes ou ateliers pertinentes ; aucun chronométrage, questionnaire ni entretien avec un novice n’a été réalisé.

## Pages tirées

| Page | Observation et état de la relecture |
|---|---|
| `b3-reseau-lan/chapitres/chapitre5.html` | Passages DAI/IP Source Guard examinés : les liaisons statiques et ACL sont précisées ; une discordance n’est plus présentée comme une attaque prouvée. Tests et limites : `resultats/lot2-dai-novice-{avant,apres}.txt`. |
| `b3-hacking/chapitres/cartes.html` | Les passages juridiques ont été examinés ; une carte ne donne plus une fourchette de peines sans circonstances. Légifrance n’a pas pu être consulté directement ; le droit en vigueur reste à vérifier. |
| `b1-ccna1/chapitres/chapitre6.html` | Le délai Cisco IOS et l’affichage `logging synchronous` sont contextualisés ; l’atelier indique ses hypothèses. La dernière reprise précise que `exec-timeout 0 0` désactive le seul délai EXEC d’inactivité, sans exclure d’autres déconnexions. Référence Cisco datée de 2019, sans matériel réel : `resultats/lot2-ccna-console-{avant,apres}.txt`, `resultats/lot2-ccna-timeout-{avant,apres}.txt`. |
| `b1-stats/atelier.html` | Une corrélation proche de zéro n’est plus présentée comme prouvant l’absence d’influence. `resultats/lot2-stats-novice-{avant,apres}.txt`. |
| `uiux/chapitres/cartes.html` | Page tirée ; relecture phrase par phrase non établie. |
| `b3-sql/index.html` | Quelques passages introductifs examinés ; relecture phrase par phrase non établie. |
| `b3-hacking/sommaire.html` | Quelques passages de navigation examinés ; relecture phrase par phrase non établie. |
| `b3-devops/chapitres/chapitre5.html` | Page tirée ; relecture phrase par phrase non établie. |
| `uiux/index.html` | Quelques passages d’introduction examinés ; relecture phrase par phrase non établie. |
| `b3-supervision/chapitres/chapitre1.html` | L’atelier SLO distingue objectif et contrat, et exclut explicitement le cas où le pourcentage suppose une division par zéro. `resultats/lot2-novice-legal-slo-{avant,apres}.txt`. |
| `b1-stats/chapitres/cartes.html` | Les intervalles de révision sont présentés comme un exemple adaptable, sans garantie universelle de mémorisation. `resultats/lot2-stats-novice-{avant,apres}.txt`. |
| `b3-cloud-aws/atelier.html` | Page tirée ; relecture phrase par phrase non établie. |

Les modifications sont contrôlées par des tests et des sources explicités dans `resultats/sources-complement-lot2.md`. Ces contrôles ne prouvent pas que tous les termes sont définis ni que les douze pages sont compréhensibles au premier passage.

L’échantillon distinct de **42 grilles sur 830** demandé au lot 1 est conservé dans `resultats/echantillon-grilles-5pourcent-lot1-partie3.md` ; sa relecture humaine reste également à faire.
