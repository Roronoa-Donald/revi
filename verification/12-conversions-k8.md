# Recoupement des 426 conversions historiques K8

**Périmètre :** `audit/tour5/k8-conversions-a-relire.csv` est une liste historique de candidats, pas une liste de défauts avérés. Le 29 octobre 2026, `scripts/recouper-conversions.py` a recherché dans les sources locales les contextes de chacune des 426 lignes, en utilisant au plus 35 caractères de contexte de chaque côté et en résolvant les anciens chemins `content/` vers `server/content/`. Les quatre variantes historiques des chemins Windows sont rapprochées des dossiers actuels. Toutes les sources correspondantes existent.

| Résultat du seul repérage lexical | Lignes |
|---|---:|
| Ancienne forme retrouvée dans un contexte unique | 125 |
| Forme K8 retrouvée dans un contexte unique | 267 |
| Forme K8 retrouvée dans plusieurs contextes | 2 |
| Contexte non retrouvé à l'identique | 24 |
| Mot absent du fragment historique fourni | 8 |
| Total | 426 |

Ces chiffres ne sont **ni des fautes, ni des restaurations validées**. Une même phrase peut avoir subi plusieurs modifications : les 35 caractères autour d'un mot ne correspondent alors plus, même si la phrase existe. Le tout premier cas est un booléen `false`/`true`, pas une phrase. Une source modifiée ou non retrouvée ne garantit ni présence ni absence de la phrase affichée. La colonne `qualification_linguistique` de `12-conversions-k8.csv` distingue 21 lignes lues du reste, encore marqué « à relire ».

## Points relus

- Les deux options historiques `Filtre` et `Réserve` sont revenues à des descriptions dans `server/content/admin-vm/chapitre5.js:100` et `server/content/admin-vm/chapitre6.js:97`. La première est bien affichée ainsi dans `admin-vm/chapitres/chapitre5.html:270`.
- Trois autres options descriptives aux fragments historiques tronqués ont été retrouvées dans les sources `server/content/b1-git/chapitres-1-3.js:126`, `server/content/b1-linux/chapitres-4-6.js:304` et `server/content/b1-linux/pages.js:455` ; leur rendu n'a pas été revérifié ici.
- Les trois lignes historiques étiquetées `QCM` portant `Définis` sont en réalité des cartes de révision : `server/content/b1-algebre/chapitres-1-3.js:185`, `server/content/b1-sql/chapitres-1-3.js:235` et `server/content/b1-stats/chapitres-1-3.js:188`. L'impératif pluriel constitue ici une consigne cohérente, non une option descriptive déformée.
- **F226 :** la ligne historique 265 et le journal `audit/tour5/repair_k8_log.csv:57` concernent une cellule descriptive de `server/content/b3-firewall/chapitre1.js:85`. Le journal annonce sa restauration, mais la source actuelle et la page publique `b3-firewall/chapitres/chapitre1.html:137` affichent encore « Identifiez le service cible ». Harmoniser cette cellule avec la description de l'utilisation d'un champ, par exemple à l'infinitif. Ce contre-exemple infirme la réparation générale revendiquée pour les conversions de ce type, sans annuler les réparations réellement constatées.
- **F227 :** les lignes historiques 174–177 se retrouvent dans `b1-prog-web/chapitres/chapitre6.html:436` à `:440` : trois instructions au singulier précèdent deux instructions au pluriel. Les quatre conversions au pluriel ne sont pas fautives isolément ; c'est l'absence d'harmonisation de la liste entière qui pose problème. Les trois premières lignes historiques sont non retrouvées par le contexte automatique parce que plusieurs mots ont changé simultanément. Même mélange dans `b1-sql/atelier.html:196`, pour les lignes historiques 229–230.
- Les lignes 77–78, 305 et 344/350/365 ont été retrouvées manuellement dans leurs sources : leurs formulations observées sont cohérentes dans les contextes examinés ; leurs pages générées n'ont pas été vérifiées pour cette passe.

La vérification automatique couvre les **426 lignes de la liste**, pas l'ensemble des changements linguistiques du dépôt. La relecture grammaticale exhaustive des contextes et le rendu effectif de chaque source n'ont pas été réalisés ; aucun pourcentage de conversions correctes ne peut donc être déduit. Le contrôle des 60 pages publiques et des impératifs reste incomplet. L'état local, et non le site en ligne, est l'objet de ce constat.
