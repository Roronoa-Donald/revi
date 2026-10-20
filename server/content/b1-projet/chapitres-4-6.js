/**
 * Chapitres 4 à 6 du cours « Projet tutoré : application de gestion de stock » B1.
 *
 * Chapitre 4 : le cycle de vie d'un produit (ajout, modification, suppression,
 *               mouvements de stock).
 * Chapitre 5 : la logique métier (alertes de seuil, valeur du stock,
 *               recherche par catégorie, sélection du maximum).
 * Chapitre 6 : fiabiliser et livrer (dépannage, export CSV, améliorations,
 *               tableau de bord de soutenance).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun
 * titre <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code
 * (trois exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-projet.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Cycle de vie d\'un produit',
    short: 'Cycle de vie',
    toc: 'Ajouter (validation puis INSERT) ; modifier (sélection puis UPDATE WHERE id) ; supprimer (askyesno puis DELETE WHERE id) ; mouvements de stock : entrées et sorties contrôlées.',
    time: '≈ 2 h de travail',

    situation:
      'Le produit entre, change, sort : le trio ajouter / modifier / supprimer est le cœur du projet. ' +
      'Chaque action suit le même chemin — valider, appeler la base, rafraîchir l\'écran — et la ' +
      'suppression ne passe jamais sans confirmation. Les mouvements de stock transforment la table ' +
      'statique en véritable gestion.',

    objectives: [
      'ajouter un produit : validation des champs puis INSERT via la classe Database ;',
      'modifier : sélection dans le Treeview, remplissage du formulaire, UPDATE WHERE id ;',
      'supprimer : askyesno de confirmation, DELETE WHERE id, refus motivé si introuvable ;',
      'simuler des mouvements : entrées qui augmentent, sorties contrôlées qui ne rendent jamais le stock négatif.'
    ],

    sections: [
      {
        title: 'Ajouter et modifier',
        html: [
          '<p><strong>Ajouter</strong> : lire les quatre champs, valider (obligatoires non vides, ' +
          'quantite entière et prix numérique), puis <code>db.ajouter_produit(nom, categorie, quantite, ' +
          'prix)</code>. Succès → showinfo, <code>effacer_champs()</code>, ' +
          '<code>actualiser_tableau()</code>. Échec → showerror. <strong>Modifier</strong> : exiger une ' +
          'sélection dans le Treeview (sinon showwarning), remplir le formulaire au clic, puis ' +
          '<code>db.modifier_produit(id, …)</code> qui exécute <code>UPDATE … WHERE id=%s</code>.</p>',
          box('mnemo', 'Mnémotechnique — « valider, appeler, rafraîchir »', 'pin',
            '    <p>Trois verbes, les trois mêmes à chaque action : c\'est le squelette de toutes les ' +
            'méthodes d\'action du tutoriel.</p>')
        ].join('\n')
      },
      {
        title: 'Supprimer avec confirmation',
        html: [
          '<p><strong>Supprimer</strong> : sélection obligatoire, puis ' +
          '<code>messagebox.askyesno("Confirmation", "Voulez-vous vraiment supprimer \'…\' ?")</code>. ' +
          'Oui → <code>db.supprimer_produit(id)</code> (DELETE WHERE id), showinfo, rafraîchir. Non → rien. ' +
          'Cette double garde — sélection puis confirmation — sépare la suppression réfléchie du clic ' +
          'malheureux. Si le produit n\'existe plus en base (supprimé par ailleurs), l\'opération se ' +
          'rapporte : introuvable n\'est pas supprimé.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Modifier et supprimer exigent une sélection : sinon showwarning, pas d\'appel SQL.</li>\n' +
            '      <li>askyesno renvoie True/False : la suppression vit dans le if.</li>\n' +
            '      <li>Après chaque action : effacer_champs puis actualiser_tableau.</li>\n' +
            '      <li>DELETE sans WHERE vide la table entière : le WHERE id=%s est vital.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Mouvements de stock',
        html: [
          '<p>Un <strong>mouvement</strong> est une entrée (+) ou une sortie (−) sur un produit. La règle ' +
          'métier : une sortie supérieure au stock disponible est refusée — le stock ne devient jamais ' +
          'négatif. En SQL, le mouvement se traduit par <code>UPDATE produits SET quantite = quantite + X ' +
          'WHERE id = %s</code> (ou − X après vérification). L\'atelier rejoue ces mouvements : entrées ' +
          'cumulées, sorties contrôlées, refus explicites « stock insuffisant ».</p>',
          box('tech', 'Vérifier en Bash', 'terminal',
            '    <ul>\n' +
            '      <li>L\'ajout : quantité vide ou non positive → refuse, compteur d\'ajouts à la fin.</li>\n' +
            '      <li>Le mouvement : un tableau associatif par produit, sortie refusée si stock < quantité.</li>\n' +
            '      <li>La suppression : trois motifs (confirme/annule/absent), deux compteurs de bilan.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Modifier un produit exige…', opts: ['une sélection dans le tableau', 'un nouveau formulaire', 'un export'], correct: 0, exp: 'Sans sélection : showwarning, pas d\'UPDATE.' },
      { q: 'La suppression réelle ne suit que si…', opts: ['askyesno renvoie oui', 'le champ est vide', 'le stock est nul'], correct: 0, exp: 'Confirmation obligatoire avant DELETE.' },
      { q: 'La requête de modification :', opts: ['UPDATE … WHERE id=%s', 'UPDATE tout', 'INSERT id'], correct: 0, exp: 'Le WHERE id cible une seule ligne.' },
      { q: 'Une sortie de stock supérieure au disponible :', opts: ['refusée', 'acceptée en négatif', 'convertie'], correct: 0, exp: 'Le stock ne devient jamais négatif : refus motivé.' },
      { q: 'Après un ajout réussi, l\'application…', opts: ['efface les champs et actualise le tableau', 'ferme la fenêtre', 'recrée la table'], correct: 0, exp: 'effacer_champs() + actualiser_tableau().' },
      { q: 'Un produit déjà parti de la table :', opts: ['introuvable', 'supprimé', 'modifié'], correct: 0, exp: 'Le refus est rapporté, pas compté en suppression.' },
      { q: 'La mise à jour d\'un stock de +X s\'écrit…', opts: ['SET quantite = quantite + X WHERE id', 'SET quantite = X sans WHERE', 'INSERT quantite'], correct: 0, exp: 'Incrément relatif, ciblé par id.' },
      { q: 'Le squelette de chaque action :', opts: ['valider, appeler, rafraîchir', 'connecter, créer, fermer', 'lire, écrire, exporter'], correct: 0, exp: 'Le même chemin trois fois dans le tutoriel.' }
    ],

    pitfalls: [
      'Exécuter UPDATE ou DELETE sans sélection préalable.',
      'Confirmer la suppression par showinfo : c\'est askyesno qui demande.',
      'Laisser passer une sortie qui rend le stock négatif.',
      'Oublier actualiser_tableau : l\'écran continue d\'afficher l\'ancien état.'
    ],

    methodTitle: 'Méthode — coder un mouvement en trois gestes',
    method: [
      'Lire le stock actuel du produit (0 au départ).',
      'Entrée : ajouter ; sortie : refuser si le disponible est insuffisant.',
      'Afficher le nouveau stock et poursuivre la boucle sans planter.'
    ],

    summary: [
      'Ajout : validation → INSERT → showinfo → champs et tableau rafraîchis.',
      'Modification : sélection obligatoire → UPDATE WHERE id.',
      'Suppression : askyesno → DELETE WHERE id ; introuvable rapporté à part.',
      'Mouvements : entrées cumulées, sorties refusées si stock insuffisant.'
    ],

    checklist: [
      'Je déroule le trio valider, appeler, rafraîchir.',
      'J\'explique la double garde de la suppression.',
      'J\'écris UPDATE et DELETE ciblés par id.',
      'Je contrôle des entrées/sorties sans stock négatif.'
    ],

    notions: [
      '<strong>Sélection Treeview</strong> : prérequis de toute modification.',
      '<strong>askyesno</strong> : dialogue oui/non avant suppression.',
      '<strong>UPDATE WHERE id</strong> : modification ciblée d\'une ligne.',
      '<strong>DELETE WHERE id</strong> : suppression ciblée, jamais sans WHERE.',
      '<strong>Mouvement</strong> : entrée (+) ou sortie (−) de stock.',
      '<strong>Stock insuffisant</strong> : sortie refusée, mouvement ignoré.',
      '<strong>effacer_champs</strong> : formulaire vidé après action.',
      '<strong>actualiser_tableau</strong> : rechargement depuis la base.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les trois actions du CRUD côté interface.' },
      { cls: 'mid', text: '50–69 % — refais la suppression confirmée.' },
      { cls: 'good', text: '70–89 % — cible les mouvements et leur refus.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les trois verbes de toute action ?', a: 'Valider (champs, sélection), appeler la base, rafraîchir (effacer_champs + actualiser_tableau).' },
      { q: 'Le chemin complet de la suppression ?', a: 'Sélection → askyesno → DELETE WHERE id → showinfo → rafraîchir ; non = rien.' },
      { q: 'Règle des mouvements de stock ?', a: 'Entrées cumulées ; sortie refusée si elle dépasse le disponible : le stock ne devient jamais négatif.' },
      { q: 'Que se passe-t-il si le produit n\'existe plus ?', a: 'Le résultat est rapporté comme introuvable : ce n\'est pas une suppression réussie.' },
      { q: 'Pourquoi WHERE id=%s est-il vital ?', a: 'Sans WHERE, UPDATE et DELETE s\'appliquent à toute la table.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Logique métier du stock',
    short: 'Logique métier',
    toc: 'Alertes de stock bas (seuil, rupture) ; valeur du stock (quantite × prix, total) ; recherche par catégorie ; désigner le plus cher : boucle de maximum.',
    time: '≈ 2 h de travail',

    situation:
      'Au-delà du CRUD, le stock parle : quels produits passent sous leur seuil ? Que vaut le magasin ' +
      'entier ? Quels articles d\'une catégorie proposer, et lequel mettre en vitrine ? Les ' +
      'améliorations du tutoriel deviennent ici des algorithmes — seuils, sommes, filtres et maximum.',

    objectives: [
      'signaler chaque produit : rupture (stock 0), alerte (stock < seuil), ok ;',
      'calculer la valeur d\'une ligne (quantite × prix) et la valeur totale du stock ;',
      'filtrer les produits d\'une catégorie cible ;',
      'trouver le maximum : plus cher de la catégorie, plus grande valeur de ligne.'
    ],

    sections: [
      {
        title: 'Alertes de seuil',
        html: [
          '<p>L\'amélioration 2 du tutoriel : « afficher un avertissement si quantité &lt; seuil ». Trois ' +
          'états, évalués dans l\'ordre : <strong>rupture</strong> — stock à 0, plus rien à vendre ; ' +
          '<strong>alerte</strong> — stock strictement sous le seuil, à recommander vite ; <strong>ok</strong> — ' +
          'au seuil ou au-dessus (un stock exactement égal au seuil n\'alerte pas). Le bilan compte ' +
          'ruptures et alertes séparément : deux lignes qui pilotent les commandes.</p>',
          box('mnemo', 'Mnémotechnique — « zéro c\'est rompu, sous le seuil c\'est l\'alerte »', 'pin',
            '    <p>Rupture = 0 ; alerte = 0 < stock < seuil ; ok = stock ≥ seuil. La cascade if / elif / else.</p>')
        ].join('\n')
      },
      {
        title: 'Valeur du stock',
        html: [
          '<p>La <strong>valeur d\'une ligne</strong> : quantite × prix. La <strong>valeur totale</strong> : ' +
          'la somme accumulée dans une variable initialisée à 0 avant la boucle, affichée une seule fois ' +
          'après. Ce motif — accumulateur hors boucle, affichage après — est le même que pour les ' +
          'compteurs des chapitres précédents. Attention au piège : afficher le total dans la boucle ' +
          'donne n sous-totaux, pas un total.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Stock égal au seuil : ok, pas alerte (le test est strictement inférieur).</li>\n' +
            '      <li>Le total s\'affiche après la boucle : jamais dans la boucle.</li>\n' +
            '      <li>Valeur de ligne = quantite × prix : ne pas additionner les prix seuls.</li>\n' +
            '      <li>Deux compteurs (ruptures, alertes) : deux bilans distincts.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Recherche et maximum',
        html: [
          '<p>La <strong>recherche par catégorie</strong> (amélioration 1) filtre les produits dont la ' +
          'catégorie égale la cible : afficher chaque correspondance, compter les trouvailles. Le ' +
          '<strong>maximum</strong> se cherche avec deux variables — meilleur et son prix — initialisées à ' +
          '« rien » et 0 : à chaque produit mieux placé (prix strictement supérieur), on met à jour les ' +
          'deux. À prix égal, le premier rencontré gagne : c\'est le sens du test strict. Si rien n\'est ' +
          'trouvé, le bilan le dit : trouves : 0, meilleur resté « - ».</p>',
          box('tech', 'Vérifier en Bash', 'terminal',
            '    <ul>\n' +
            '      <li>La cascade : -eq 0 → rupture, -lt seuil → alerte, sinon ok.</li>\n' +
            '      <li>La valeur : ligne = quantite * prix, total accumulé, affiché après.</li>\n' +
            '      <li>Le filtre : comparer la catégorie à la cible, compteur trouves.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Un produit à 0 en stock est en…', opts: ['rupture', 'alerte', 'ok'], correct: 0, exp: 'Rupture : plus rien à vendre.' },
      { q: 'Un stock exactement égal au seuil est…', opts: ['ok', 'en alerte', 'en rupture'], correct: 0, exp: 'L\'alerte exige un stock strictement inférieur.' },
      { q: 'La valeur d\'une ligne vaut…', opts: ['quantite × prix', 'quantite + prix', 'prix seul'], correct: 0, exp: 'Le produit des deux, accumulé au total.' },
      { q: 'Le total du stock s\'affiche…', opts: ['après la boucle', 'dans la boucle', 'avant la lecture'], correct: 0, exp: 'Accumulateur hors boucle, affichage unique à la fin.' },
      { q: 'Le maximum se met à jour quand le prix est…', opts: ['strictement supérieur', 'supérieur ou égal', 'différent'], correct: 0, exp: 'À égalité, le premier rencontré garde la place.' },
      { q: 'Si la catégorie cible ne contient rien :', opts: ['trouves : 0', 'une erreur', 'tout le catalogue'], correct: 0, exp: 'Le bilan l\'annonce : trouves : 0, meilleur « - ».' },
      { q: 'Deux ruptures et trois alertes produisent…', opts: ['deux bilans distincts', 'un seul total', 'une erreur'], correct: 0, exp: 'ruptures : R puis alertes : A, sur deux lignes.' },
      { q: 'Le filtre par catégorie compare…', opts: ['la catégorie du produit à la cible', 'le prix au seuil', 'l\'id au nom'], correct: 0, exp: 'Seules les correspondances s\'affichent et comptent.' }
    ],

    pitfalls: [
      'Déclarer en alerte un stock égal au seuil : le test est strict.',
      'Afficher le total à chaque ligne : sous-totaux, pas total.',
      'Initialiser le maximum à un produit existant : le premier de la liste gagnerait à tort.',
      'Oublier le compteur trouves : le bilan ne sait plus dire 0.'
    ],

    methodTitle: 'Méthode — calculer un tableau de bord en trois gestes',
    method: [
      'Initialiser hors boucle : total à 0, compteurs à 0, maximum à « rien ».',
      'Traiter chaque ligne : valeur, alertes, filtre, mise à jour du maximum.',
      'Afficher après la boucle : total, bilans séparés, vitrine.'
    ],

    summary: [
      'Trois états : rupture (0), alerte (stock < seuil), ok (stock ≥ seuil).',
      'Valeur de ligne = quantite × prix ; total accumulé, affiché après.',
      'Recherche : filtre par catégorie, compteur de trouvailles.',
      'Maximum : prix strictement supérieur, premier rencontré en cas d\'égalité.'
    ],

    checklist: [
      'Je classe un produit en rupture, alerte ou ok.',
      'Je calcule valeur de ligne et valeur totale.',
      'Je filtre une catégorie et je compte les trouvailles.',
      'Je code une boucle de maximum sans biais d\'initialisation.'
    ],

    notions: [
      '<strong>Seuil</strong> : quantité minimale avant recommandation.',
      '<strong>Rupture</strong> : stock à 0.',
      '<strong>Valeur de ligne</strong> : quantite × prix.',
      '<strong>Accumulateur</strong> : total initialisé hors boucle.',
      '<strong>Filtre</strong> : sélection par catégorie égale à la cible.',
      '<strong>Boucle de maximum</strong> : meilleur + sa valeur, test strict.',
      '<strong>Bilan</strong> : compteurs affichés une seule fois, après.',
      '<strong>Vitrine</strong> : produit de plus grande valeur de ligne.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis la cascade rupture / alerte / ok.' },
      { cls: 'mid', text: '50–69 % — refais le calcul de valeur totale.' },
      { cls: 'good', text: '70–89 % — cible la recherche et le maximum.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'La cascade des trois états ?', a: 'stock = 0 → rupture ; stock < seuil → alerte ; sinon ok (stock égal au seuil : ok).' },
      { q: 'Comment calculer la valeur totale ?', a: 'Valeur de ligne = quantite × prix, accumulée dans un total initialisé à 0, affichée après la boucle.' },
      { q: 'Le motif du maximum ?', a: 'Deux variables (meilleur, valeur) à « rien »/0 ; mise à jour si strictement supérieur ; le premier gagne à égalité.' },
      { q: 'Que rapporte une recherche sans résultat ?', a: 'trouves : 0 et un meilleur resté « - » : c\'est un bilan valide, pas une erreur.' },
      { q: 'Pourquoi les bilans sortent-ils après la boucle ?', a: 'Sinon chaque ligne produit un sous-bilan : le rapport devient illisible et faux.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Fiabiliser et livrer',
    short: 'Fiabiliser &amp; livrer',
    toc: 'Dépannage : connexion, psycopg2, tkinter, encodage ; export CSV des données ; améliorations possibles (recherche, alertes, statistiques, authentification) ; tableau de bord de soutenance.',
    time: '≈ 2 h de travail',

    situation:
      'Le projet tourne, il reste à le livrer : anticiper les quatre pannes classiques, exporter les ' +
      'données pour preuve, cartographier les améliorations pour le rapport — et préparer le tableau de ' +
      'bord qui fera la soutenance : total, alertes, produit en vitrine.',

    objectives: [
      'diagnostiquer les quatre problèmes courants du tutoriel et leur solution ;',
      'exporter le catalogue en CSV (en-tête, point-virgule, bilan) ;',
      'présenter les améliorations possibles et leurs exercices ;',
      'produire un tableau de bord : lignes, total, alertes, produit en vitrine.'
    ],

    sections: [
      {
        title: 'Le dépannage du tutoriel',
        html: [
          '<p>Quatre symptômes, quatre remèdes : « impossible de se connecter » → vérifier le service ' +
          '(<code>sudo service postgresql status</code>), le mot de passe, l\'existence de la base ; ' +
          '« No module named psycopg2 » → <code>pip install psycopg2-binary</code> ; « No module named ' +
          'tkinter » → <code>sudo apt install python3-tk</code> ; « SyntaxError: Non-ASCII character » → ' +
          'en-tête <code># -*- coding: utf-8 -*-</code> en première ligne. La démarche vaut plus que la ' +
          'liste : lire le symptôme, isoler la couche (service, module, encodage), appliquer le remède.</p>',
          box('mnemo', 'Mnémotechnique — « service, module, module, encodage »', 'pin',
            '    <p>Les quatre pannes couvrent les quatre couches : serveur, dépendance Python, ' +
            'bibliothèque graphique, fichier source.</p>')
        ].join('\n')
      },
      {
        title: 'Exporter et améliorer',
        html: [
          '<p>L\'<strong>export CSV</strong> (amélioration 3) : une ligne par produit au format ' +
          '<code>nom;categorie;quantite;prix</code> — point-virgule par convention francophone — précédée ' +
          'de l\'en-tête, suivie du bilan « lignes exportees ». L\'en-tête se génère AVANT la boucle : il ' +
          'sort même pour un catalogue vide, et le bilan dit 0.</p>',
          '<p>Le tutoriel liste les <strong>améliorations</strong> : recherche et filtrage, alertes de ' +
          'stock et valeur totale (faites au chapitre 5), export CSV et rapports (fait ici), ' +
          'statistiques graphiques avec matplotlib, authentification et droits. Cinq exercices pratiques ' +
          'clôturent : champ date d\'ajout, recherche par nom, bouton export, validation avant insertion, ' +
          'fenêtre de statistiques — autant de pistes à citer dans le rapport.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>psycopg2 manquant se règle par pip ; tkinter par apt : les deux remèdes ne s\'échangent pas.</li>\n' +
            '      <li>L\'en-tête CSV sort avant la boucle : même pour 0 ligne.</li>\n' +
            '      <li>Le bilan « lignes exportees » compte les produits, pas l\'en-tête.</li>\n' +
            '      <li>La vitrine se choisit sur la valeur de ligne, pas sur le prix unitaire.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Le tableau de bord de soutenance',
        html: [
          '<p>Le livrable final : pour chaque produit <code>stock=X valeur=V</code>, puis le total en ' +
          'FCFA, le nombre d\'alertes, et la <strong>vitrine</strong> — le produit de plus grande valeur ' +
          'de ligne. Quatre lignes de synthèse qui résument le projet : la base est cohérente (stocks), ' +
          'elle vaut quelque chose (total), elle réclame des commandes (alertes), et elle a une vitrine ' +
          '(maximum). C\'est exactement le récit d\'une soutenance.</p>',
          box('tech', 'Vérifier en Bash', 'terminal',
            '    <ul>\n' +
            '      <li>Le diagnostic : connexion → service, psycopg2 → pip, tkinter → apt, ascii → utf8.</li>\n' +
            '      <li>Le CSV : en-tête avant la boucle, une ligne par produit, bilan après.</li>\n' +
            '      <li>Le tableau de bord : total + alertes + maximum, trois accumulateurs hors boucle.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: '« No module named psycopg2 » se corrige par…', opts: ['pip install psycopg2-binary', 'apt install postgresql', 'un redémarrage'], correct: 0, exp: 'Dépendance Python : pip, pas apt.' },
      { q: '« No module named tkinter » se corrige par…', opts: ['sudo apt install python3-tk', 'pip install tkinter', 'un import raté'], correct: 0, exp: 'Bibliothèque système : apt.' },
      { q: '« SyntaxError: Non-ASCII character » exige…', opts: ['l\'en-tête coding utf-8', 'des variables anglaises', 'un autre éditeur'], correct: 0, exp: 'Première ligne du fichier : # -*- coding: utf-8 -*-.' },
      { q: 'Impossible de se connecter : vérifier d\'abord…', opts: ['le service PostgreSQL', 'le prix du stock', 'le CSV'], correct: 0, exp: 'Service, mot de passe, existence de la base.' },
      { q: 'L\'en-tête CSV est généré…', opts: ['avant la boucle', 'après la boucle', 'par produit'], correct: 0, exp: 'Il sort même pour un catalogue vide.' },
      { q: 'Le séparateur CSV du tutoriel :', opts: ['le point-virgule', 'la virgule', 'la tabulation'], correct: 0, exp: 'Convention francophone : nom;categorie;quantite;prix.' },
      { q: 'La vitrine du tableau de bord se choisit sur…', opts: ['la valeur de ligne', 'le prix unitaire', 'le nom'], correct: 0, exp: 'quantite × prix, pas le prix seul.' },
      { q: 'L\'améliorations qui reste ouverte (non traitée dans le cours) :', opts: ['l\'authentification et les droits', 'les alertes de seuil', 'l\'export CSV'], correct: 0, exp: 'Alertes, valeur et export sont faites ; auth et statistiques restent des pistes.' }
    ],

    pitfalls: [
      'Régler tkinter par pip : c\'est un paquet système, apt.',
      'Générer l\'en-tête CSV dans la boucle : il se répéterait.',
      'Choisir la vitrine sur le prix unitaire : un article unique très cher peut perdre.',
      'Livrer sans tableau de bord : la soutenance perd son récit.'
    ],

    methodTitle: 'Méthode — préparer la soutenance en trois gestes',
    method: [
      'Dérouler les quatre pannes et leurs remèdes : service, pip, apt, utf-8.',
      'Produire l\'export CSV : en-tête, lignes, bilan — la preuve des données.',
      'Afficher le tableau de bord : total, alertes, vitrine — le récit du projet.'
    ],

    summary: [
      'Quatre pannes : service PostgreSQL, pip psycopg2, apt tkinter, utf-8.',
      'Export CSV : en-tête avant boucle, lignes produit, bilan final.',
      'Améliorations restantes : statistiques matplotlib, authentification.',
      'Tableau de bord : total FCFA, alertes, vitrine par valeur de ligne.'
    ],

    checklist: [
      'Je diagnostique les quatre problèmes courants.',
      'Je produis un CSV complet, en-tête comprise.',
      'Je cite les améliorations faites et celles qui restent.',
      'Je génère le tableau de bord de soutenance.'
    ],

    notions: [
      '<strong>systemctl status</strong> : premier réflexe de diagnostic du service.',
      '<strong>psycopg2-binary</strong> : l\'installation pip qui manque.',
      '<strong>python3-tk</strong> : le paquet apt qui manque.',
      '<strong>coding utf-8</strong> : en-tête contre le Non-ASCII.',
      '<strong>CSV</strong> : export lignes par point-virgules avec en-tête.',
      '<strong>Bilan d\'export</strong> : lignes exportees, en-tête non comptée.',
      '<strong>Tableau de bord</strong> : total, alertes, vitrine.',
      '<strong>Vitrine</strong> : produit de plus grande valeur de ligne.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — relis les quatre pannes et leurs remèdes.' },
      { cls: 'mid', text: '50–69 % — refais l\'export CSV avec en-tête.' },
      { cls: 'good', text: '70–89 % — cible le tableau de bord complet.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les quatre pannes et leurs remèdes ?', a: 'Connexion → service PostgreSQL ; psycopg2 → pip install psycopg2-binary ; tkinter → apt install python3-tk ; Non-ASCII → en-tête coding utf-8.' },
      { q: 'Le format de l\'export CSV ?', a: 'En-tête nom;categorie;quantite;prix, une ligne par produit, bilan « lignes exportees : n » après.' },
      { q: 'Que contient le tableau de bord ?', a: 'Par produit stock et valeur, puis total en FCFA, nombre d\'alertes, vitrine (plus grande valeur de ligne).' },
      { q: 'Quelles améliorations restent ouvertes ?', a: 'Statistiques graphiques (matplotlib) et authentification avec droits d\'accès.' },
      { q: 'Pourquoi l\'en-tête CSV sort-il avant la boucle ?', a: 'Pour apparaître même sur un catalogue vide, et une seule fois.' }
    ]
  }
];
