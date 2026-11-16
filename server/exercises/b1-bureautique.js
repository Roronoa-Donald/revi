/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
  {
    "id": "bu-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le ruban du rapport de stage",
    "exampleTitle": "Exemple résolu — le ruban du stagiaire comptable",
    "goal": "Situer les groupes de commandes du ruban de Word dans leurs onglets : Accueil, Insertion, Mise en page, Références, Révision, Affichage.",
    "brief": "<p><strong>Énoncé.</strong> Aïcha vient de commencer son stage au service commercial de la société Togo Textiles, à Lomé. Sa tutrice lui demande de finaliser le rapport de stage sous Word et lui liste les commandes à maîtriser :</p><table><tr><th>À faire dans le rapport</th><th>Groupe de commandes</th></tr><tr><td>Changer la police et la taille des titres</td><td>groupe Police</td></tr><tr><td>Insérer le tableau des ventes mensuelles</td><td>groupe Tableaux</td></tr><tr><td>Poser le filigrane « Brouillon » derrière le texte</td><td>groupe Arrière-plan de page</td></tr><tr><td>Régler le zoom de la fenêtre à 100 %</td><td>groupe Zoom</td></tr><tr><td>Suivre les corrections envoyées par la tutrice</td><td>groupe Suivi</td></tr><tr><td>Construire la table des matières du rapport de 30 pages</td><td>table des matières</td></tr></table><p>Rappel du cours : le ruban de Word compte sept onglets — Accueil, Insertion, Mise en page, Références, Publipostage, Révision, Affichage — chacun subdivisé en groupes.</p><ol><li>Dans quel onglet du ruban Aïcha trouve-t-elle le groupe Police ?</li><li>Dans quel onglet trouve-t-elle le groupe Tableaux pour insérer le tableau des ventes ?</li><li>Le groupe Arrière-plan de page, qui porte le filigrane, dépend de quel onglet ?</li><li>Le groupe Zoom, qui règle l'affichage à 100 %, dépend de quel onglet ?</li><li>Le groupe Suivi, qui garde la trace des corrections, dépend de quel onglet ?</li><li>La table des matières du rapport de 30 pages se construit dans quel onglet ?</li></ol><p>Répondez par le nom de l'onglet seul, sans phrase (par exemple : accueil).</p>",
    "starter": "# Exercice — Le ruban du rapport de stage\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nom de l'onglet, sans phrase.\n\n[Question 1 — Onglet du groupe Police]\nA_COMPLETER\n\n[Question 2 — Onglet du groupe Tableaux]\nA_COMPLETER\n\n[Question 3 — Onglet du groupe Arrière-plan de page]\nA_COMPLETER\n\n[Question 4 — Onglet du groupe Zoom]\nA_COMPLETER\n\n[Question 5 — Onglet du groupe Suivi]\nA_COMPLETER\n\n[Question 6 — Onglet de la table des matières]\nA_COMPLETER\n",
    "hints": [
      "Le mnémo du cours : « Accueil des habitudes, Insertion des objets, Affichage des vues » — la commande du quotidien vit dans Accueil, ce qu'on ajoute au document dans Insertion.",
      "Demandez-vous si la commande habille la page (thèmes, arrière-plan), corrige un texte relu (commentaires, suivi) ou change la façon de voir la fenêtre (modes, zoom).",
      "La table des matières d'un long document ne s'insère pas comme un objet ni comme une correction : cherchez l'onglet qui gère aussi les notes de bas de page et les citations."
    ],
    "examples": [
      {
        "stdin": "Kossi effectue son stage au service comptable de la société Agro Sahel. Son rapport exige :\n- groupe Paragraphe (retrait du texte) ;\n- groupe Illustrations (logo de la société) ;\n- groupe Thèmes (habillage du document) ;\n- groupe Macros (automatisation).\n\n1) Paragraphe : onglet Accueil (avec Presse-papiers, Police, Style, Modification).\n2) Illustrations : onglet Insertion.\n3) Thèmes : onglet Mise en page.\n4) Macros : onglet Affichage.",
        "expected": "paragraphe : accueil — illustrations : insertion — themes : mise en page — macros : affichage",
        "note": "Chaque commande révèle son onglet : les habitudes dans Accueil, les objets ajoutés dans Insertion, l'habillage dans Mise en page, les vues dans Affichage."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Onglet du groupe Police",
        "stdin": "q:1",
        "expected": "accueil||onglet accueil||l'onglet accueil"
      },
      {
        "label": "Question 2 — Onglet du groupe Tableaux",
        "stdin": "q:2",
        "expected": "insertion||onglet insertion||l'onglet insertion"
      },
      {
        "label": "Question 3 — Onglet du groupe Arrière-plan de page",
        "stdin": "q:3",
        "expected": "mise en page||onglet mise en page||l'onglet mise en page||miseenpage"
      },
      {
        "label": "Question 4 — Onglet du groupe Zoom",
        "stdin": "q:4",
        "expected": "affichage||onglet affichage||l'onglet affichage"
      },
      {
        "label": "Question 5 — Onglet du groupe Suivi",
        "stdin": "q:5",
        "expected": "révision||onglet révision||l'onglet révision"
      },
      {
        "label": "Question 6 — Onglet de la table des matières",
        "stdin": "q:6",
        "expected": "références||onglet références||l'onglet références"
      }
    ],
    "solution": "[Question 1 — Onglet du groupe Police]\naccueil\n\n[Question 2 — Onglet du groupe Tableaux]\ninsertion\n\n[Question 3 — Onglet du groupe Arrière-plan de page]\nmise en page\n\n[Question 4 — Onglet du groupe Zoom]\naffichage\n\n[Question 5 — Onglet du groupe Suivi]\nrévision\n\n[Question 6 — Onglet de la table des matières]\nréférences",
    "takeaway": "1) Le groupe Police vit dans l'onglet Accueil, avec Presse-papiers, Paragraphe, Style et Modification.\n2) Le groupe Tableaux vit dans l'onglet Insertion, avec Pages, Illustrations, Liens, En-tête et pied, Texte et Symbole.\n3) Le filigrane se pose par le groupe Arrière-plan de page de l'onglet Mise en page.\n4) Le groupe Zoom dépend de l'onglet Affichage, qui porte aussi les modes d'affichage, la fenêtre et les macros.\n5) Le groupe Suivi fait partie de l'onglet Révision, qui couvre vérification, commentaires, suivi et protection.\n6) La table des matières se construit dans l'onglet Références, avec les notes de bas de page, les citations et les légendes.\nContrôle : « Accueil des habitudes, Insertion des objets, Affichage des vues » — les six réponses suivent la carte des onglets du support."
  },
  {
    "id": "bu-c1-e2",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Les modes d'affichage du mémoire",
    "exampleTitle": "Exemple résolu — la relecture de la notice technique",
    "goal": "Choisir le bon mode d'affichage de Word selon la tâche et connaître le comptage approximatif des mots.",
    "brief": "<p><strong>Énoncé.</strong> Koffi achève son mémoire de fin de formation : <strong>45 pages</strong> de texte, des titres, des tableaux. Avant de le remettre, il relit le document sous Word et doit choisir, pour chaque tâche, le bon mode d'affichage. Le cours en liste cinq : <strong>Page</strong> (actif par défaut, montre les quatre marges de 2,5 cm), <strong>Lecture plein écran</strong> (le ruban disparaît), <strong>Web</strong> (pour créer des pages HTML), <strong>Plan</strong> (l'enchaînement des titres d'un long document) et <strong>Brouillon</strong> (défilement rapide, images masquées).</p><p>Rappel du cours : l'option <strong>Statistiques</strong> de la barre d'état compte les mots « approximativement » — tout caractère précédé et suivi d'un espace compte pour un mot.</p><ol><li>Quel mode d'affichage est actif par défaut à l'ouverture d'un document Word ?</li><li>Pour vérifier d'un coup d'œil l'enchaînement des titres et sous-titres du mémoire, quel mode Koffi choisit-il ?</li><li>Pour relire confortablement à l'écran, sans le ruban, quel mode choisit-il ?</li><li>Le compteur approximatif de la barre d'état : combien de mots vaut « Ah ! » ?</li><li>Koffi veut publier une version du mémoire en page Web : quel mode d'affichage est conçu pour créer des pages HTML ?</li></ol><p>Pour les questions 1 à 3 et 5, répondez par le nom du mode (un à trois mots) ; pour la question 4, répondez par un nombre.</p>",
    "starter": "# Exercice — Les modes d'affichage du mémoire\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 3 et 5 : le nom du mode. Question 4 : un nombre.\n\n[Question 1 — Mode actif par défaut]\nA_COMPLETER\n\n[Question 2 — Mode des titres du mémoire]\nA_COMPLETER\n\n[Question 3 — Mode de relecture sans le ruban]\nA_COMPLETER\n\n[Question 4 — Nombre de mots dans « Ah ! »]\nA_COMPLETER\n\n[Question 5 — Mode des pages HTML]\nA_COMPLETER\n",
    "hints": [
      "Cinq modes, cinq vocations : Page par défaut, Lecture plein écran sans ruban, Web pour le HTML, Plan pour les titres, Brouillon pour défiler vite.",
      "Pour la relecture, éliminez d'abord les modes d'édition rapide (Brouillon) et de structure (Plan) : il reste celui qui fait disparaître le ruban.",
      "« Ah ! » : le mot et le signe sont chacun précédés et suivis d'un espace — comptez-les séparément ; pour la page Web, relisez la vocation du mode du même nom."
    ],
    "examples": [
      {
        "stdin": "Ama relit une notice technique de 20 pages.\n1) Mode par défaut à l'ouverture : Page (marges de 2,5 cm visibles).\n2) Défilement rapide, images masquées : Brouillon.\n3) « Bravo ! » compté par les Statistiques : le mot et le signe isolé font 2 mots.",
        "expected": "page — brouillon — 2 mots",
        "note": "Le mode Brouillon masque les images pour défiler vite ; le compteur de mots reste approximatif, signes isolés compris."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mode actif par défaut",
        "stdin": "q:1",
        "expected": "page||mode page||le mode page"
      },
      {
        "label": "Question 2 — Mode des titres du mémoire",
        "stdin": "q:2",
        "expected": "plan||mode plan||le mode plan"
      },
      {
        "label": "Question 3 — Mode de relecture sans le ruban",
        "stdin": "q:3",
        "expected": "lecture plein écran||plein écran||lecture en plein écran||mode lecture plein écran||le mode lecture plein écran"
      },
      {
        "label": "Question 4 — Nombre de mots dans « Ah ! »",
        "stdin": "q:4",
        "expected": "2||deux"
      },
      {
        "label": "Question 5 — Mode des pages HTML",
        "stdin": "q:5",
        "expected": "web||mode web||le mode web"
      }
    ],
    "solution": "[Question 1 — Mode actif par défaut]\npage\n\n[Question 2 — Mode des titres du mémoire]\nplan\n\n[Question 3 — Mode de relecture sans le ruban]\nlecture plein écran\n\n[Question 4 — Nombre de mots dans « Ah ! »]\n2\n\n[Question 5 — Mode des pages HTML]\nweb",
    "takeaway": "1) Le mode Page est le mode par défaut : le plus utilisé, il montre les quatre marges de 2,5 cm.\n2) Le mode Plan révèle l'enchaînement des titres et sous-titres d'un long document : c'est l'outil de relecture de la structure du mémoire.\n3) Le mode Lecture plein écran fait disparaître le ruban : c'est le mode de relecture confortable.\n4) « Ah ! » vaut 2 mots : tout caractère précédé et suivi d'un espace compte pour un mot, le signe isolé compris.\n5) Le mode Web sert à créer des pages HTML.\nContrôle : les cinq modes du cours — Page, Lecture plein écran, Web, Plan, Brouillon — apparaissent chacun une fois dans l'exercice."
  },
  {
    "id": "bu-c1-e3",
    "chapter": 1,
    "level": "n2",
    "language": "analyse",
    "title": "Sélectionner et enregistrer le compte rendu",
    "exampleTitle": "Exemple résolu — l'article du secrétaire de rédaction",
    "goal": "Choisir le geste de sélection (clavier ou souris) adapté à chaque portion de texte et dérouler les trois méthodes d'enregistrement.",
    "brief": "<p><strong>Énoncé.</strong> Amivi, assistante au siège de la société Sahel Transport, dactylographie le compte rendu de la réunion hebdomadaire. Le document compte déjà trois pages ; elle doit corriger des portions de texte sans perdre une minute — ni perdre son travail. Le cours distingue la sélection au clavier (Shift + flèches, F8 successifs, Ctrl+A), la sélection à la souris (double-clic sur un mot, Ctrl+clic dans une phrase, triple-clic ou double-clic en marge sur un paragraphe, clic dans la marge pour une ligne) et les trois méthodes d'enregistrement (bouton Office puis Enregistrer sous, Ctrl+S, disquette de la barre d'accès rapide).</p><ol><li>Quel raccourci clavier sélectionne tout le document d'un coup ?</li><li>À la souris, quel geste sélectionne exactement un mot ?</li><li>À la souris, quel geste sélectionne une phrase entière ?</li><li>Quelle touche de fonction lance la sélection croissante : mot, puis phrase, puis paragraphe, jusqu'au document ?</li><li>Quel raccourci clavier enregistre le document régulièrement, pendant la saisie ?</li><li>À la fermeture du document, Amivi clique « Non » : que deviennent les modifications saisies depuis la dernière sauvegarde ? Répondez par un seul mot.</li></ol><p>Pour les questions 1 à 5, répondez par le raccourci ou le geste, sans phrase (par exemple : ctrl+z) ; pour la question 6, un seul mot.</p>",
    "starter": "# Exercice — Sélectionner et enregistrer le compte rendu\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 1 à 5 : le raccourci ou le geste. Question 6 : un seul mot.\n\n[Question 1 — Sélectionner tout le document]\nA_COMPLETER\n\n[Question 2 — Sélectionner un mot à la souris]\nA_COMPLETER\n\n[Question 3 — Sélectionner une phrase à la souris]\nA_COMPLETER\n\n[Question 4 — Touche de la sélection croissante]\nA_COMPLETER\n\n[Question 5 — Raccourci d'enregistrement]\nA_COMPLETER\n\n[Question 6 — Effet du bouton Non à la fermeture]\nA_COMPLETER\n",
    "hints": [
      "Le clavier de Word réserve deux combinaisons proches : celle qui prend tout le texte et celle qui écrit sur le disque ; relisez la liste du cours avant de répondre.",
      "À la souris : un geste simple sur un mot, la touche Ctrl enfoncée pour la phrase, trois clics pour le paragraphe, la marge pour la ligne.",
      "La sélection croissante du cours se quitte par la touche ESC : cette précision vous met sur la bonne touche de fonction ; pour la question 6, relisez le rôle des trois boutons de la fermeture."
    ],
    "examples": [
      {
        "stdin": "Un secrétaire de rédaction met au point un article de presse.\n1) Triple-clic (ou double-clic en marge) : sélection du paragraphe.\n2) Clic dans la marge : sélection de la ligne.\n3) Ctrl+A : tout le document.\n4) À la fermeture, il choisit Oui : les modifications depuis la dernière sauvegarde sont enregistrées.",
        "expected": "triple-clic : paragraphe — clic en marge : ligne — ctrl+a : tout le document — oui : enregistre",
        "note": "Oui enregistre, Non perd, Annuler reste : le trio de la fermeture complète les trois méthodes d'enregistrement."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Sélectionner tout le document",
        "stdin": "q:1",
        "expected": "ctrl+a||ctrl a||ctrla||ctrl + a"
      },
      {
        "label": "Question 2 — Sélectionner un mot à la souris",
        "stdin": "q:2",
        "expected": "double-clic||double clic||doubleclic||un double-clic"
      },
      {
        "label": "Question 3 — Sélectionner une phrase à la souris",
        "stdin": "q:3",
        "expected": "ctrl+clic||ctrl clic||ctrlclic||ctrl + clic"
      },
      {
        "label": "Question 4 — Touche de la sélection croissante",
        "stdin": "q:4",
        "expected": "f8||la touche f8||touche f8"
      },
      {
        "label": "Question 5 — Raccourci d'enregistrement",
        "stdin": "q:5",
        "expected": "ctrl+s||ctrl s||ctrls||ctrl + s"
      },
      {
        "label": "Question 6 — Effet du bouton Non à la fermeture",
        "stdin": "q:6",
        "expected": "perdues||perdus||elles sont perdues"
      }
    ],
    "solution": "[Question 1 — Sélectionner tout le document]\nctrl+a\n\n[Question 2 — Sélectionner un mot à la souris]\ndouble-clic\n\n[Question 3 — Sélectionner une phrase à la souris]\nctrl+clic\n\n[Question 4 — Touche de la sélection croissante]\nf8\n\n[Question 5 — Raccourci d'enregistrement]\nctrl+s\n\n[Question 6 — Effet du bouton Non à la fermeture]\nperdues",
    "takeaway": "1) Ctrl+A sélectionne tout le document.\n2) Le double-clic sur un mot le sélectionne exactement.\n3) Ctrl+clic dans une phrase la sélectionne en entier.\n4) La touche F8 lance la sélection croissante : mot, phrase, paragraphe, section, document ; ESC sort du mode de sélection.\n5) Ctrl+S enregistre le document régulièrement — ou la disquette de la barre d'accès rapide.\n6) À la fermeture, « Non » ferme le document sans enregistrer : les modifications depuis la dernière sauvegarde sont perdues.\nContrôle : Ctrl+A prend le texte, Ctrl+S le sauvegarde — enregistrer reste « la chose la plus importante » du support."
  },
  {
    "id": "bu-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Le devis du menuisier à mettre en forme",
    "exampleTitle": "Exemple résolu — le courrier de relance client",
    "goal": "Appliquer la règle « sélectionner d'abord » et choisir l'alignement, l'interligne et le groupe de commandes adaptés à chaque partie d'un devis.",
    "brief": "<p><strong>Énoncé.</strong> Sémévo, secrétaire de l'atelier de menuiserie Bois d'Or, met en forme le <strong>devis n° 2024-118</strong> destiné au client Hôtel du Lac : un titre, un tableau de prestations, des conditions de paiement. Règle d'or du support : on <strong>sélectionne d'abord</strong> le texte, on met en forme ensuite. Les quatre alignements du groupe Paragraphe sont : à gauche (bord gauche aligné sur la marge), à droite (bord droit aligné), centrer (au milieu de la page) et justifier (les deux bords alignés à la fois).</p><ol><li>Avant d'appliquer gras, taille ou couleur à une partie du devis, que doit faire Sémévo ? Répondez en deux mots.</li><li>Le titre « DEVIS N° 2024-118 » doit se placer au milieu de la largeur de la page : quel alignement applique-t-elle ?</li><li>Les montants du devis doivent s'aligner proprement sur la marge droite : quel alignement ?</li><li>Le corps du devis doit avoir les bords gauche ET droit alignés en même temps, comme un courrier officiel : quel alignement ?</li><li>Pour aérer le paragraphe « Conditions de paiement », quel réglage du groupe Paragraphe augmente l'espace entre les lignes ?</li><li>Police, taille, gras, italique, souligné et couleur sont regroupés dans un groupe de l'onglet Accueil : lequel ?</li></ol><p>Répondez par des réponses très courtes : le geste (deux mots), un nom d'alignement (un mot), le réglage (un mot), le groupe (un mot).</p>",
    "starter": "# Exercice — Le devis du menuisier à mettre en forme\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses très courtes, sans phrase.\n\n[Question 1 — Le geste avant la mise en forme]\nA_COMPLETER\n\n[Question 2 — Alignement du titre]\nA_COMPLETER\n\n[Question 3 — Alignement des montants]\nA_COMPLETER\n\n[Question 4 — Alignement des deux bords]\nA_COMPLETER\n\n[Question 5 — Réglage de l'espace entre les lignes]\nA_COMPLETER\n\n[Question 6 — Groupe des commandes de caractères]\nA_COMPLETER\n",
    "hints": [
      "Le support l'écrit en règle absolue : rien ne se met en forme sans que la portion de texte soit d'abord prise en compte.",
      "Reliez chaque besoin au bon bord : le titre vise le milieu de la page, les montants la marge droite, le corps du devis les deux bords à la fois.",
      "L'espace entre les lignes porte un nom précis du groupe Paragraphe ; pour la dernière question, relisez la carte des groupes de l'onglet Accueil — celui qui porte taille et couleur a un nom évocateur."
    ],
    "examples": [
      {
        "stdin": "Un courrier de relance client se met en forme.\n1) Bloc expéditeur collé à la marge gauche : aligner à gauche.\n2) Objet du courrier en gras : sélectionner l'objet, puis groupe Police.\n3) Espace autour d'un paragraphe (et non entre ses lignes) : espacements Avant et Après.",
        "expected": "gauche — sélectionner puis groupe police — espacements avant et après",
        "note": "L'interligne travaille entre les lignes ; les espacements Avant/Après travaillent autour du paragraphe : deux réglages à ne pas confondre."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Le geste avant la mise en forme",
        "stdin": "q:1",
        "expected": "le sélectionner||sélectionner||sélectionner le texte||le sélectionner d'abord"
      },
      {
        "label": "Question 2 — Alignement du titre",
        "stdin": "q:2",
        "expected": "centrer||centré||centre"
      },
      {
        "label": "Question 3 — Alignement des montants",
        "stdin": "q:3",
        "expected": "à droite||droite||aligné à droite"
      },
      {
        "label": "Question 4 — Alignement des deux bords",
        "stdin": "q:4",
        "expected": "justifier||justifié"
      },
      {
        "label": "Question 5 — Réglage de l'espace entre les lignes",
        "stdin": "q:5",
        "expected": "interligne||l'interligne"
      },
      {
        "label": "Question 6 — Groupe des commandes de caractères",
        "stdin": "q:6",
        "expected": "police||groupe police||le groupe police"
      }
    ],
    "solution": "[Question 1 — Le geste avant la mise en forme]\nle sélectionner\n\n[Question 2 — Alignement du titre]\ncentrer\n\n[Question 3 — Alignement des montants]\nà droite\n\n[Question 4 — Alignement des deux bords]\njustifier\n\n[Question 5 — Réglage de l'espace entre les lignes]\ninterligne\n\n[Question 6 — Groupe des commandes de caractères]\npolice",
    "takeaway": "1) Sélectionner d'abord : la règle absolue du support — on ne met en forme qu'une portion de texte sélectionnée.\n2) Le titre se place au milieu de la page : alignement centrer.\n3) Les montants s'alignent sur la marge droite : alignement à droite.\n4) Le corps du devis, comme tout courrier officiel, aligne les deux bords à la fois : justifier — le seul alignement qui touche deux bords.\n5) L'interligne augmente ou diminue l'espace entre les lignes du paragraphe « Conditions de paiement ».\n6) Police, taille, gras, italique, souligné et couleur vivent dans le groupe Police de l'onglet Accueil (la mini barre d'outils de la sélection y donne aussi accès).\nContrôle : un seul alignement touche deux bords — le justifié ; les trois autres (gauche, droite, centrer) n'en touchent qu'un ou aucun."
  },
  {
    "id": "bu-c2-e2",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Portrait ou paysage au dossier locatif",
    "exampleTitle": "Exemple résolu — le dossier d'inscription au concours",
    "goal": "Régler marges, orientation et numérotation des pages d'un dossier Word, puis dérouler l'impression contrôlée.",
    "brief": "<p><strong>Énoncé.</strong> L'agence immobilière Horizon prépare le dossier locatif d'un immeuble : un courrier de proposition commerciale, un grand tableau comparatif des loyers à <strong>7 colonnes</strong>, et le tout doit partir à l'impression ce soir. La secrétaire du dossier applique la mise en page du chapitre : Marges, Orientation, Taille à l'onglet Mise en page ; numérotation des pages par Insertion ; aperçu avant impression puis impression.</p><ol><li>Quelles sont les marges par défaut de Word, identiques sur les quatre côtés de la page ?</li><li>Le courrier se présente dans le sens de la longueur : comment s'appelle cette orientation ?</li><li>Le tableau comparatif des loyers, large de 7 colonnes, exige de la largeur : quelle orientation choisir ?</li><li>Les pages du dossier doivent être numérotées : depuis quel onglet insère-t-on les numéros de page ?</li><li>Quel raccourci clavier lance l'impression ?</li><li>Avant d'imprimer, le support impose un passage obligé pour les dernières retouches : lequel ?</li></ol><p>Répondez court : la valeur des marges avec son unité (par exemple 3 cm), les orientations (un mot), l'onglet (un mot), le raccourci (par exemple ctrl+z), puis le passage obligé avant impression.</p>",
    "starter": "# Exercice — Portrait ou paysage au dossier locatif\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses courtes : valeur avec unité, un mot, un mot, raccourci, passage obligé.\n\n[Question 1 — Marges par défaut]\nA_COMPLETER\n\n[Question 2 — Orientation du courrier]\nA_COMPLETER\n\n[Question 3 — Orientation du grand tableau]\nA_COMPLETER\n\n[Question 4 — Onglet des numéros de page]\nA_COMPLETER\n\n[Question 5 — Raccourci d'impression]\nA_COMPLETER\n\n[Question 6 — Passage obligé avant impression]\nA_COMPLETER\n",
    "hints": [
      "Le mode Page du cours montre les quatre marges par défaut du document neuf : relisez leur valeur dans le paragraphe du chapitre.",
      "Portrait ou paysage ? Le sens de la page suit la forme du contenu : la longueur pour le courrier, la largeur pour le grand tableau.",
      "La numérotation des pages se règle comme tout ce qu'on ajoute au document ; l'impression, elle, se lance par un raccourci célèbre — mais seulement après le contrôle visuel du support."
    ],
    "examples": [
      {
        "stdin": "Un lycée prépare son dossier d'inscription au concours.\n1) Marges par défaut : 2,5 cm de chaque côté.\n2) Liste officielle des admis, page étroite : portrait.\n3) Emploi du temps hebdomadaire, très large : paysage.\n4) Numérotation des pages : onglet Insertion, Numéros de page.\n5) Impression contrôlée : aperçu avant impression, puis Ctrl+P.",
        "expected": "2,5 cm — portrait — paysage — insertion, numéros de page — aperçu puis ctrl+p",
        "note": "Portrait pour la longueur, paysage pour la largeur : l'orientation suit la forme du contenu, et l'aperçu précède toujours l'impression."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Marges par défaut",
        "stdin": "q:1",
        "expected": "2,5 cm||2,5||2.5||2,5cm"
      },
      {
        "label": "Question 2 — Orientation du courrier",
        "stdin": "q:2",
        "expected": "portrait"
      },
      {
        "label": "Question 3 — Orientation du grand tableau",
        "stdin": "q:3",
        "expected": "paysage"
      },
      {
        "label": "Question 4 — Onglet des numéros de page",
        "stdin": "q:4",
        "expected": "insertion||onglet insertion||l'onglet insertion"
      },
      {
        "label": "Question 5 — Raccourci d'impression",
        "stdin": "q:5",
        "expected": "ctrl+p||ctrl p||ctrlp||ctrl + p"
      },
      {
        "label": "Question 6 — Passage obligé avant impression",
        "stdin": "q:6",
        "expected": "l'aperçu avant impression||aperçu avant impression||l aperçu avant impression"
      }
    ],
    "solution": "[Question 1 — Marges par défaut]\n2,5 cm\n\n[Question 2 — Orientation du courrier]\nportrait\n\n[Question 3 — Orientation du grand tableau]\npaysage\n\n[Question 4 — Onglet des numéros de page]\ninsertion\n\n[Question 5 — Raccourci d'impression]\nctrl+p\n\n[Question 6 — Passage obligé avant impression]\nl'aperçu avant impression",
    "takeaway": "1) Les marges par défaut de Word font 2,5 cm des quatre côtés.\n2) Le courrier, présenté dans le sens de la longueur, est en orientation portrait.\n3) Le tableau comparatif de 7 colonnes exige la largeur : orientation paysage.\n4) La numérotation des pages se place par l'onglet Insertion, commande Numéros de page (avec choix de la position et de l'alignement).\n5) Ctrl+P lance l'impression.\n6) Avant d'imprimer, le support impose l'aperçu avant impression (bouton Office, Imprimer sans cliquer, Aperçu) pour les dernières retouches.\nContrôle : portrait = longueur, paysage = largeur ; l'aperçu précède toujours Ctrl+P."
  },
  {
    "id": "bu-c2-e3",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "La facture alignée aux taquets de tabulation",
    "exampleTitle": "Exemple résolu — le bon de commande aux taquets",
    "goal": "Poser, déplacer et supprimer des taquets de tabulation, régler le retrait de première ligne et poser un filigrane.",
    "brief": "<p><strong>Énoncé.</strong> Chez Togo Net Informatique, les factures clients se préparent sous Word. Le comptable aligne chaque ligne « désignation — quantité — prix unitaire » à l'aide des <strong>taquets de tabulation</strong> de la règle horizontale, ajoute un retrait de première ligne aux mentions légales, et doit faire apparaître le mot « Brouillon » derrière le texte des factures non validées. Rappel du cours : clic sur la règle pour poser un taquet, glisser pour le déplacer, glisser hors de la règle pour le supprimer ; le retrait de première ligne se règle dans la boîte de dialogue Paragraphe, liste « De 1ère ligne » ; le filigrane (Brouillon, Urgent, personnalisé) s'affiche derrière le texte.</p><ol><li>Comment pose-t-on un taquet de tabulation sur la règle horizontale ? (le geste, en trois mots)</li><li>Que fait-on d'un taquet déjà posé pour le déplacer ? (deux mots)</li><li>Que fait-on d'un taquet pour le supprimer ? (glisser… où ?)</li><li>Chaque augmentation du retrait décale le bord gauche du paragraphe de quelle unité ? (quatre mots)</li><li>Le retrait de la première ligne d'un paragraphe se règle dans la boîte de dialogue Paragraphe : dans quelle liste déroulante ?</li><li>Comment s'appelle le texte « Brouillon » affiché derrière le contenu de la page ?</li></ol><p>Répondez par des gestes et des noms courts, sans phrase.</p>",
    "starter": "# Exercice — La facture alignée aux taquets de tabulation\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par des gestes et des noms courts, sans phrase.\n\n[Question 1 — Poser un taquet]\nA_COMPLETER\n\n[Question 2 — Déplacer un taquet]\nA_COMPLETER\n\n[Question 3 — Supprimer un taquet]\nA_COMPLETER\n\n[Question 4 — Unité de décalage du retrait]\nA_COMPLETER\n\n[Question 5 — Liste du retrait de première ligne]\nA_COMPLETER\n\n[Question 6 — Texte derrière le contenu de la page]\nA_COMPLETER\n",
    "hints": [
      "Les taquets sont ces petits traits de la règle horizontale : le cours décrit trois gestes — poser, déplacer, supprimer.",
      "Poser se fait d'un clic simple ; déplacer et supprimer se font en glissant — la différence tient à l'endroit où l'on lâche le taquet.",
      "Le retrait de première ligne ne se règle pas sur la règle mais dans la boîte de dialogue Paragraphe ; le fond de page « Brouillon » ou « Urgent » porte le nom exact du cours."
    ],
    "examples": [
      {
        "stdin": "Un bon de commande s'aligne sur trois taquets.\n1) Poser un taquet à 8 cm : clic sur la règle, à cet endroit.\n2) Le déplacer : on le glisse le long de la règle.\n3) Le supprimer : on le glisse hors de la règle.\n4) Le mot « Urgent » derrière le texte : un filigrane personnalisé.",
        "expected": "clic sur la règle — on le glisse — hors de la règle — filigrane urgent",
        "note": "Un taquet vit sur la règle : clic pour le poser, glissement pour le déplacer, sortie de la règle pour le supprimer."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Poser un taquet",
        "stdin": "q:1",
        "expected": "clic sur la règle||un clic sur la règle||cliquer sur la règle"
      },
      {
        "label": "Question 2 — Déplacer un taquet",
        "stdin": "q:2",
        "expected": "le glisser||glisser||on le glisse||le faire glisser"
      },
      {
        "label": "Question 3 — Supprimer un taquet",
        "stdin": "q:3",
        "expected": "le glisser hors de la règle||glisser hors de la règle||le tirer hors de la règle||le faire glisser hors de la règle"
      },
      {
        "label": "Question 4 — Unité de décalage du retrait",
        "stdin": "q:4",
        "expected": "une valeur de tabulation||valeur de tabulation||une tabulation"
      },
      {
        "label": "Question 5 — Liste du retrait de première ligne",
        "stdin": "q:5",
        "expected": "de 1ère ligne||première ligne||de première ligne||1ère ligne"
      },
      {
        "label": "Question 6 — Texte derrière le contenu de la page",
        "stdin": "q:6",
        "expected": "filigrane||un filigrane||le filigrane"
      }
    ],
    "solution": "[Question 1 — Poser un taquet]\nclic sur la règle\n\n[Question 2 — Déplacer un taquet]\nle glisser\n\n[Question 3 — Supprimer un taquet]\nle glisser hors de la règle\n\n[Question 4 — Unité de décalage du retrait]\nune valeur de tabulation\n\n[Question 5 — Liste du retrait de première ligne]\nde 1ère ligne\n\n[Question 6 — Texte derrière le contenu de la page]\nfiligrane",
    "takeaway": "1) On pose un taquet par un clic sur la règle horizontale, à l'endroit voulu.\n2) Pour le déplacer, on le glisse le long de la règle.\n3) Pour le supprimer, on le glisse hors de la règle.\n4) Chaque augmentation du retrait décale le bord gauche du paragraphe d'une valeur de tabulation.\n5) Le retrait de la première ligne se règle dans la boîte de dialogue Paragraphe, liste « De 1ère ligne », avec la quantité d'espace voulue.\n6) Le mot « Brouillon » affiché derrière le texte est un filigrane, réglé depuis le groupe Arrière-plan de page de l'onglet Mise en page.\nContrôle : les trois gestes du taquet (clic, glisser, glisser hors de la règle) et les deux retraits (bord gauche par tabulation, première ligne par la boîte Paragraphe) se complètent sans se confondre."
  },
  {
    "id": "bu-c3-e1",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le tableau de suivi des ventes du magasin",
    "exampleTitle": "Exemple résolu — l'inventaire du dépôt",
    "goal": "Lire une feuille Excel : alignement par défaut texte/chiffres, insertion de ligne, cellule active et fusion de cellules.",
    "brief": "<p><strong>Énoncé.</strong> Le responsable du magasin d'électronique Électronia saisit dans Excel le suivi des ventes de la semaine. La feuille « Semaine 12 » contient :</p><table><tr><th> </th><th>A</th><th>B</th></tr><tr><th>1</th><td>Produit</td><td>Quantité vendue</td></tr><tr><th>2</th><td>Clavier USB</td><td>25</td></tr><tr><th>3</th><td>Souris sans fil</td><td>40</td></tr><tr><th>4</th><td>Écran 22 pouces</td><td>rupture</td></tr><tr><th>5</th><td>Webcam HD</td><td>18</td></tr><tr><th>6</th><td>Clé USB 32 Go</td><td>30</td></tr></table><p>Rappel du cours : à la saisie, la donnée s'affiche à la fois dans la cellule et dans la barre de formule ; par défaut <strong>le texte s'aligne à gauche et les chiffres à droite</strong> ; la ligne insérée se place au-dessus de la sélection, la colonne à sa gauche ; la commande « Fusionner et centrer » vit dans le groupe Accueil.</p><ol><li>Par défaut, Excel aligne le texte (comme « Clavier USB ») de quel côté de la cellule ?</li><li>Par défaut, les nombres (comme 25 ou 40) s'alignent de quel côté ?</li><li>Le responsable clique droit sur le numéro de la ligne 4 et choisit Insertion : de quel côté de la ligne 4 la nouvelle ligne s'insère-t-elle ?</li><li>Quelle cellule de la colonne B contient du texte au lieu d'un nombre ? Répondez par son adresse.</li><li>Pour corriger la valeur de B3 sans tout retaper, quel geste ouvre la modification directement dans la cellule (autre que la barre de formule) ?</li><li>Le titre « SUIVI DES VENTES » doit occuper une seule grande cellule couvrant A1 et B1 : quelle commande du groupe Accueil ?</li></ol><p>Répondez par des réponses très courtes : le côté (un ou deux mots), l'adresse de cellule, le geste, le nom de la commande.</p>",
    "starter": "# Exercice — Le tableau de suivi des ventes du magasin\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses très courtes : côté, adresse, geste, commande.\n\n[Question 1 — Côté du texte par défaut]\nA_COMPLETER\n\n[Question 2 — Côté des nombres par défaut]\nA_COMPLETER\n\n[Question 3 — Côté d'insertion de la nouvelle ligne]\nA_COMPLETER\n\n[Question 4 — Adresse de la cellule contenant du texte]\nA_COMPLETER\n\n[Question 5 — Geste de modification dans la cellule]\nA_COMPLETER\n\n[Question 6 — Commande pour une grande cellule sur A1:B1]\nA_COMPLETER\n",
    "hints": [
      "À la saisie, Excel affiche la donnée à la fois dans la cellule et dans la barre de formule ; son alignement par défaut dépend de sa nature.",
      "Parcourez la colonne B : la valeur qui n'est pas un nombre ne s'alignera pas du même côté que les autres ; pour l'insertion, relisez la règle des côtés — la ligne et la colonne ne s'insèrent pas du même bord.",
      "Le geste de modification ressemble à celui qui sélectionne un mot dans Word ; pour le titre, cherchez dans le groupe Accueil la commande qui réunit plusieurs cellules sélectionnées."
    ],
    "examples": [
      {
        "stdin": "L'inventaire du dépôt se saisit dans une feuille Excel.\n1) « Carton standard » en A2 : du texte, aligné à gauche par défaut.\n2) 350 en B2 : un nombre, aligné à droite.\n3) Clic droit sur la colonne C, Insertion : la colonne s'insère à gauche de C.\n4) « rupture » tapé en C7 : cette cellule reste du texte.",
        "expected": "texte à gauche — nombre à droite — colonne à gauche — c7 : texte",
        "note": "L'alignement par défaut est le détecteur de type : une valeur numérique mal alignée signale tout de suite une donnée mal saisie."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Côté du texte par défaut",
        "stdin": "q:1",
        "expected": "à gauche||gauche||aligné à gauche"
      },
      {
        "label": "Question 2 — Côté des nombres par défaut",
        "stdin": "q:2",
        "expected": "à droite||droite||aligné à droite"
      },
      {
        "label": "Question 3 — Côté d'insertion de la nouvelle ligne",
        "stdin": "q:3",
        "expected": "au-dessus||au dessus"
      },
      {
        "label": "Question 4 — Adresse de la cellule contenant du texte",
        "stdin": "q:4",
        "expected": "b4||la cellule b4"
      },
      {
        "label": "Question 5 — Geste de modification dans la cellule",
        "stdin": "q:5",
        "expected": "double-clic||double clic||doubleclic||un double-clic"
      },
      {
        "label": "Question 6 — Commande pour une grande cellule sur A1:B1",
        "stdin": "q:6",
        "expected": "fusionner et centrer||fusionner & centrer"
      }
    ],
    "solution": "[Question 1 — Côté du texte par défaut]\nà gauche\n\n[Question 2 — Côté des nombres par défaut]\nà droite\n\n[Question 3 — Côté d'insertion de la nouvelle ligne]\nau-dessus\n\n[Question 4 — Adresse de la cellule contenant du texte]\nb4\n\n[Question 5 — Geste de modification dans la cellule]\ndouble-clic\n\n[Question 6 — Commande pour une grande cellule sur A1:B1]\nfusionner et centrer",
    "takeaway": "1) Par défaut, Excel aligne le texte à gauche de la cellule.\n2) Par défaut, les nombres s'alignent à droite : 25, 40, 18 et 30 se rangent côté droit.\n3) La nouvelle ligne s'insère au-dessus de la ligne sélectionnée (la colonne, elle, s'insère à gauche).\n4) La cellule B4 contient « rupture », du texte : elle s'aligne à gauche, au contraire des quantités de la colonne.\n5) Le double-clic sur la cellule (ou la barre de formule) ouvre la modification directement.\n6) La commande Fusionner et centrer du groupe Accueil assemble A1 et B1 en une seule grande cellule pour le titre.\nContrôle : l'alignement de B4 (gauche) trahit son type — c'est le repère immédiat du chapitre pour repérer une donnée mal typée."
  },
  {
    "id": "bu-c3-e2",
    "chapter": 3,
    "level": "n1",
    "language": "analyse",
    "title": "Le classeur du planning d'équipe de la clinique",
    "exampleTitle": "Exemple résolu — le carnet de la bibliothèque",
    "goal": "Nommer les barres de la fenêtre Excel, compter les onglets du ruban et gérer les feuilles d'un classeur par clic droit.",
    "brief": "<p><strong>Énoncé.</strong> Akouvi, coordinatrice de la clinique Saint-Joseph, organise le planning des équipes de soins dans le classeur <code>planning_equipe.xlsx</code>. Le classeur contient une feuille par semaine : « Semaine 1 », « Semaine 2 », « Semaine 3 », « Semaine 4 ». Rappel du cours : la fenêtre d'Excel porte ses barres (accès rapide, titre, formule, défilement, état) ; le ruban compte sept onglets par défaut ; les feuilles se gèrent par clic droit sur leur onglet : Renommer, Insérer, Déplacer ou copier (case « Créer une copie »), Supprimer.</p><ol><li>Comment s'appelle la barre, sous le ruban, où Akouvi voit et modifie le contenu de la cellule active ?</li><li>Quelle barre affiche le nom de l'application et du document en cours ?</li><li>Quelle barre, en bas de l'écran, affiche les options activées ?</li><li>Combien d'onglets le ruban d'Excel compte-t-il par défaut ?</li><li>Pour préparer une « Semaine 5 » identique à la « Semaine 1 », Akouvi fait un clic droit sur l'onglet de la feuille : quelle commande ouvre la case « Créer une copie » ?</li><li>Le classeur est le fichier Excel ; comment s'appelle chaque grille de cellules qu'il contient ?</li></ol><p>Répondez par des noms courts : la barre (trois mots au plus), un nombre, la commande, la grille.</p>",
    "starter": "# Exercice — Le classeur du planning d'équipe de la clinique\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses par des noms courts, sans phrase.\n\n[Question 1 — Barre du contenu de la cellule active]\nA_COMPLETER\n\n[Question 2 — Barre de l'application et du document]\nA_COMPLETER\n\n[Question 3 — Barre des options activées]\nA_COMPLETER\n\n[Question 4 — Nombre d'onglets du ruban]\nA_COMPLETER\n\n[Question 5 — Commande de copie d'une feuille]\nA_COMPLETER\n\n[Question 6 — Nom de chaque grille de cellules]\nA_COMPLETER\n",
    "hints": [
      "La fenêtre d'Excel porte cinq barres : accès rapide, titre, formule, défilement, état.",
      "Le mnémo du cours : « la formule voit la cellule, le titre voit le nom » — la troisième barre cherchée se lit en bas de l'écran.",
      "La gestion des feuilles passe entièrement par le clic droit sur leur onglet ; la commande cherchée précise le déplacement ET la duplication."
    ],
    "examples": [
      {
        "stdin": "La bibliothécaire gère le carnet des prêts dans un classeur.\n1) Contenu de la cellule active, visible et modifiable : barre de formule.\n2) Application et document en cours : barre de titre.\n3) Options activées, bas de l'écran : barre d'état.\n4) Commandes en un clic, en haut de la fenêtre : barre d'accès rapide.\n5) Onglets du ruban par défaut : 7.",
        "expected": "formule — titre — état — accès rapide — 7 onglets",
        "note": "La formule voit la cellule, le titre voit le nom, l'état voit les options : chaque barre a son rôle, et le ruban en compte sept par défaut."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Barre du contenu de la cellule active",
        "stdin": "q:1",
        "expected": "barre de formule||la barre de formule"
      },
      {
        "label": "Question 2 — Barre de l'application et du document",
        "stdin": "q:2",
        "expected": "barre de titre||la barre de titre||titre"
      },
      {
        "label": "Question 3 — Barre des options activées",
        "stdin": "q:3",
        "expected": "barre d'état||la barre d'état||état"
      },
      {
        "label": "Question 4 — Nombre d'onglets du ruban",
        "stdin": "q:4",
        "expected": "7||sept"
      },
      {
        "label": "Question 5 — Commande de copie d'une feuille",
        "stdin": "q:5",
        "expected": "déplacer ou copier||déplacer/copier||deplacer ou copier"
      },
      {
        "label": "Question 6 — Nom de chaque grille de cellules",
        "stdin": "q:6",
        "expected": "feuille||feuille de calcul||une feuille de calcul"
      }
    ],
    "solution": "[Question 1 — Barre du contenu de la cellule active]\nbarre de formule\n\n[Question 2 — Barre de l'application et du document]\nbarre de titre\n\n[Question 3 — Barre des options activées]\nbarre d'état\n\n[Question 4 — Nombre d'onglets du ruban]\n7\n\n[Question 5 — Commande de copie d'une feuille]\ndéplacer ou copier\n\n[Question 6 — Nom de chaque grille de cellules]\nfeuille",
    "takeaway": "1) La barre de formule montre le contenu de la cellule active et permet de le modifier.\n2) La barre de titre affiche l'application et le document en cours (Excel et planning_equipe.xlsx).\n3) La barre d'état, en bas de l'écran, affiche les options activées.\n4) Le ruban d'Excel compte 7 onglets par défaut : Accueil, Insertion, Mise en page, Formules, Données, Révision, Affichage — l'onglet d'un objet sélectionné (graphique, tableau) s'ajoute temporairement.\n5) La commande Déplacer ou copier, avec la case « Créer une copie », duplique la feuille « Semaine 1 » pour devenir « Semaine 5 ».\n6) Chaque grille de cellules du classeur s'appelle une feuille (de calcul).\nContrôle : classeur = fichier ; feuilles = grilles gérées par clic droit sur leur onglet."
  },
  {
    "id": "bu-c3-e3",
    "chapter": 3,
    "level": "n2",
    "language": "analyse",
    "title": "La trame de facture du garage",
    "exampleTitle": "Exemple résolu — le devis du garage concurrent",
    "goal": "Appliquer les formats du groupe Nombre (Nombre, Pourcentage, Texte), insérer une colonne du bon côté et centrer un en-tête.",
    "brief": "<p><strong>Énoncé.</strong> Le garage Mécanique Plus prépare sa trame de facture dans Excel. La feuille « Facture » commence ainsi :</p><table><tr><th> </th><th>A</th><th>B</th></tr><tr><th>1</th><td>Désignation</td><td>Prix unitaire (F CFA)</td></tr><tr><th>2</th><td>Vidange complète</td><td>15000</td></tr><tr><th>3</th><td>Plaquettes de frein</td><td>28000</td></tr><tr><th>4</th><td>Balais d'essuie-glace</td><td>6000</td></tr><tr><th>5</th><td>Main-d'œuvre (1 heure)</td><td>5000</td></tr></table><p>Rappel du cours : le groupe Nombre formate les cellules — <em>Nombre</em> (deux décimales), <em>Pourcentage</em>, <em>Texte</em> (interprète tout littéralement), <em>Date</em> (courte ou longue) ; la colonne insérée se place à gauche de la sélection ; le groupe Alignement règle haut/centre/bas et gauche/centre/droite.</p><ol><li>Les prix doivent s'afficher avec deux décimales (par exemple 15000,00) : quel format du groupe Nombre applique-t-on aux cellules B2 à B5 ?</li><li>La remise fournisseur de 5 % doit s'afficher avec le symbole % : quel format applique-t-on à la cellule qui la contient ?</li><li>Le numéro de facture 2024-137 doit rester du texte littéral, sans qu'Excel l'interprète autrement : quel format applique-t-on à sa cellule ?</li><li>Le chef d'atelier veut une colonne « Référence » juste avant la colonne B : de quel côté de la colonne sélectionnée la nouvelle colonne s'insère-t-elle ?</li><li>L'en-tête « Prix unitaire » doit être centré dans sa cellule : quel groupe de l'onglet Accueil règle les alignements ?</li><li>Quel est le prix unitaire le plus élevé de la plage B2:B5 ? Répondez par le nombre seul.</li></ol><p>Répondez par des noms de format, de groupe et des nombres, sans phrase.</p>",
    "starter": "# Exercice — La trame de facture du garage\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses par des noms de format, de groupe et des nombres.\n\n[Question 1 — Format des deux décimales]\nA_COMPLETER\n\n[Question 2 — Format du symbole %]\nA_COMPLETER\n\n[Question 3 — Format du contenu littéral]\nA_COMPLETER\n\n[Question 4 — Côté d'insertion de la colonne]\nA_COMPLETER\n\n[Question 5 — Groupe des alignements]\nA_COMPLETER\n\n[Question 6 — Prix unitaire le plus élevé]\nA_COMPLETER\n",
    "hints": [
      "Le groupe Nombre propose les quatre formats cités par le cours : Nombre, Pourcentage, Texte, Date.",
      "Chaque format a son effet : décimales affichées, symbole en bout de cellule, interprétation bloquée — reliez l'effet demandé au format.",
      "La colonne s'insère du bord rappelé par le cours (le contraire de la ligne) ; le centrage d'une cellule relève du groupe voisin de Police dans l'onglet Accueil."
    ],
    "examples": [
      {
        "stdin": "Le devis d'un garage concurrent se prépare.\n1) Prix 9000 affiché 9000,00 : format Nombre (deux décimales).\n2) TVA 18 % : format Pourcentage.\n3) Référence « DEV-2024-07 » jamais interprétée : format Texte.\n4) Date du devis : format Date, courte (jj/mm/aa) ou longue (jour et mois en toutes lettres).\n5) Prix le plus élevé d'une liste courte : lecture directe de la colonne.",
        "expected": "nombre — pourcentage — texte — date courte ou longue — lecture directe",
        "note": "Le format Texte interprète tout littéralement : même une saisie qui ressemble à un nombre ou à une date reste du texte."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Format des deux décimales",
        "stdin": "q:1",
        "expected": "nombre||format nombre||le format nombre"
      },
      {
        "label": "Question 2 — Format du symbole %",
        "stdin": "q:2",
        "expected": "pourcentage||format pourcentage||le format pourcentage"
      },
      {
        "label": "Question 3 — Format du contenu littéral",
        "stdin": "q:3",
        "expected": "texte||format texte||le format texte"
      },
      {
        "label": "Question 4 — Côté d'insertion de la colonne",
        "stdin": "q:4",
        "expected": "à gauche||gauche"
      },
      {
        "label": "Question 5 — Groupe des alignements",
        "stdin": "q:5",
        "expected": "alignement||groupe alignement||le groupe alignement"
      },
      {
        "label": "Question 6 — Prix unitaire le plus élevé",
        "stdin": "q:6",
        "expected": "28000||28 000"
      }
    ],
    "solution": "[Question 1 — Format des deux décimales]\nnombre\n\n[Question 2 — Format du symbole %]\npourcentage\n\n[Question 3 — Format du contenu littéral]\ntexte\n\n[Question 4 — Côté d'insertion de la colonne]\nà gauche\n\n[Question 5 — Groupe des alignements]\nalignement\n\n[Question 6 — Prix unitaire le plus élevé]\n28000",
    "takeaway": "1) Deux décimales affichées (15000,00) : format Nombre.\n2) Le symbole % (5 %) : format Pourcentage.\n3) Le numéro 2024-137 doit rester littéral : format Texte, qui interprète tout au premier degré, même une saisie qui ressemble à un nombre ou à une date.\n4) La nouvelle colonne s'insère à gauche de la colonne sélectionnée (la ligne s'insère, elle, au-dessus).\n5) Le centrage de l'en-tête relève du groupe Alignement de l'onglet Accueil (haut, centre, bas — gauche, centre, droite).\n6) Le prix unitaire le plus élevé de B2:B5 est 28000 F CFA (plaquettes de frein).\nContrôle : les quatre formats du groupe Nombre — Nombre, Pourcentage, Texte, Date — se retrouvent chacun une fois dans les questions 1 à 3 et dans l'exemple."
  },
  {
    "id": "bu-c4-e1",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "La facture du fournisseur à totaliser",
    "exampleTitle": "Exemple résolu — la commande de fournitures de bureau",
    "goal": "Écrire une formule correcte (signe =, opérateur de plage), prévoir son résultat et connaître l'opérateur de concaténation.",
    "brief": "<p><strong>Énoncé.</strong> Ridge, comptable de la société Agro Distribution, règle sous Excel la facture de la commande passée chez le fournisseur Papeterie Centrale :</p><table><tr><th> </th><th>A</th><th>B</th></tr><tr><th>1</th><td>Article</td><td>Montant (F CFA)</td></tr><tr><th>2</th><td>Ramettes A4 (carton)</td><td>12000</td></tr><tr><th>3</th><td>Cartouches d'encre</td><td>35000</td></tr><tr><th>4</th><td>Classeurs</td><td>8000</td></tr><tr><th>5</th><td>Agrafes</td><td>1500</td></tr><tr><th>6</th><td>Enveloppes</td><td>2500</td></tr></table><p>Il veut afficher le total de la commande dans la cellule B7, puis composer la référence « FACTURE2024 » à partir de deux textes. Rappel du cours : toute formule commence par le signe <strong>=</strong> ; les deux-points désignent une plage (B5:B15) ; l'opérateur <strong>&amp;</strong> joint des textes (« Nord » &amp; « Sud » donne NordSud).</p><ol><li>Par quel signe commence toute formule de calcul dans Excel ?</li><li>Ridge tape <code>SOMME(B2:B6)</code> dans B7 sans ce signe : le contenu devient-il un nombre, du texte, ou une erreur ? Répondez en deux mots.</li><li>Écrivez la formule exacte qui additionne les montants de B2 à B6.</li><li>Que renvoie cette formule ? Répondez par le nombre seul.</li><li>Dans l'écriture <code>B2:B6</code>, les deux-points sont un opérateur de quelle famille ? Répondez en un seul mot.</li><li>Quel opérateur joint deux textes pour n'en faire qu'un (« FACTURE » et « 2024 ») ? Répondez par le caractère seul.</li></ol><p>Pour les formules, écrivez sans espaces superflues, comme dans le cours : =SOMME(A2:A10).</p>",
    "starter": "# Exercice — La facture du fournisseur à totaliser\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Formules sans espaces superflues : =SOMME(A2:A10).\n\n[Question 1 — Signe de début de formule]\nA_COMPLETER\n\n[Question 2 — Nature du contenu sans ce signe]\nA_COMPLETER\n\n[Question 3 — Formule du total de B2 à B6]\nA_COMPLETER\n\n[Question 4 — Résultat de la formule]\nA_COMPLETER\n\n[Question 5 — Famille de l'opérateur deux-points]\nA_COMPLETER\n\n[Question 6 — Opérateur qui joint deux textes]\nA_COMPLETER\n",
    "hints": [
      "Le premier caractère d'une formule décide de tout : sans lui, la saisie ne calcule pas et s'aligne comme un texte.",
      "Additionner une plage entière relève d'une fonction du cours ; vérifiez le total à la main : 12000 + 35000 + 8000 + 1500 + 2500.",
      "Les deux-points parcourent toutes les cellules entre deux bornes, bornes comprises ; pour joindre deux textes, le cours cite l'exemple « Nord » puis « Sud » qui donnent NordSud — l'opérateur tient en un seul caractère."
    ],
    "examples": [
      {
        "stdin": "Une commande de fournitures de bureau chez un autre fournisseur.\nMontants en B2:B5 : 6000 — 4000 — 3000 — 2000.\n1) Toute formule commence par =.\n2) Sans le =, la saisie SOMME(B2:B5) reste du texte, aligné à gauche.\n3) Total : =SOMME(B2:B5).\n4) Résultat : 6000 + 4000 + 3000 + 2000 = 15000.\n5) B2:B5 : les deux-points forment un opérateur de plage.\n6) « Nord » & « Sud » : l'opérateur & (concaténation) donne NordSud.",
        "expected": "= — du texte — =SOMME(B2:B5) — 15000 — plage — &",
        "note": "Sans le signe =, rien ne calcule : la formule reste un texte aligné à gauche — le signal d'alerte immédiat du tableur."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Signe de début de formule",
        "stdin": "q:1",
        "expected": "=||le signe =||signe =||égal||egal"
      },
      {
        "label": "Question 2 — Nature du contenu sans ce signe",
        "stdin": "q:2",
        "expected": "du texte||texte||un texte"
      },
      {
        "label": "Question 3 — Formule du total de B2 à B6",
        "stdin": "q:3",
        "expected": "=SOMME(B2:B6)||SOMME(B2:B6)||= SOMME(B2:B6)||=SOMME(B2 : B6)||= SOMME(B2 : B6)||SOMME(B2 : B6)"
      },
      {
        "label": "Question 4 — Résultat de la formule",
        "stdin": "q:4",
        "expected": "59000||59 000"
      },
      {
        "label": "Question 5 — Famille de l'opérateur deux-points",
        "stdin": "q:5",
        "expected": "plage||une plage"
      },
      {
        "label": "Question 6 — Opérateur qui joint deux textes",
        "stdin": "q:6",
        "expected": "&||et commercial||esperluette"
      }
    ],
    "solution": "[Question 1 — Signe de début de formule]\n=\n\n[Question 2 — Nature du contenu sans ce signe]\ndu texte\n\n[Question 3 — Formule du total de B2 à B6]\n=SOMME(B2:B6)\n\n[Question 4 — Résultat de la formule]\n59000\n\n[Question 5 — Famille de l'opérateur deux-points]\nplage\n\n[Question 6 — Opérateur qui joint deux textes]\n&",
    "takeaway": "1) Toute formule de calcul dans Excel commence par le signe =.\n2) Sans le =, SOMME(B2:B6) n'est pas une formule : le contenu reste du texte, aligné à gauche dans la cellule.\n3) La formule du total est =SOMME(B2:B6).\n4) 12000 + 35000 + 8000 + 1500 + 2500 = 59000 F CFA.\n5) Les deux-points de B2:B6 sont un opérateur de plage : ils désignent toutes les cellules comprises entre les deux bornes.\n6) L'opérateur & (concaténation) joint les textes : « FACTURE » & « 2024 » donne FACTURE2024.\nContrôle : la somme des cinq montants se vérifie colonne par colonne — 47000 après les cartouches, 56500 après les agrafes, 59000 au total."
  },
  {
    "id": "bu-c4-e2",
    "chapter": 4,
    "level": "n1",
    "language": "analyse",
    "title": "Le bulletin de notes du module Bureautique",
    "exampleTitle": "Exemple résolu — les notes du module Word",
    "goal": "Écrire les formules SOMME, MOYENNE, MAX et MIN sur une plage de notes et prévoir leurs résultats.",
    "brief": "<p><strong>Énoncé.</strong> L'assistante pédagogique du centre de formation Avenir Plus saisit les notes du module Bureautique, noté sur 20 :</p><table><tr><th> </th><th>A</th><th>B</th></tr><tr><th>1</th><td>Étudiant</td><td>Note /20</td></tr><tr><th>2</th><td>Awa</td><td>12</td></tr><tr><th>3</th><td>Boris</td><td>15</td></tr><tr><th>4</th><td>Chantal</td><td>9</td></tr><tr><th>5</th><td>Damas</td><td>16</td></tr><tr><th>6</th><td>Éric</td><td>8</td></tr><tr><th>7</th><td>Fifi</td><td>14</td></tr><tr><th>8</th><td>Gilbert</td><td>10</td></tr></table><p>Elle prépare le tableau de synthèse du module à l'aide des fonctions statistiques du cours : SOMME, MOYENNE, MAX et MIN, de syntaxe commune =SOMME(A2:A10).</p><ol><li>Écrivez la formule qui additionne les notes de B2 à B8.</li><li>Que renvoie =SOMME(B2:B8) ? Répondez par le nombre seul.</li><li>Écrivez la formule qui calcule la moyenne des notes de B2 à B8.</li><li>Que renvoie =MOYENNE(B2:B8) ? Répondez par le nombre seul.</li><li>Que renvoie =MAX(B2:B8) ? Répondez par le nombre seul.</li><li>Que renvoie =MIN(B2:B8) ? Répondez par le nombre seul.</li></ol><p>Écrivez les formules sans espaces superflues, comme dans le cours : =SOMME(A2:A10).</p>",
    "starter": "# Exercice — Le bulletin de notes du module Bureautique\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Formules sans espaces superflues : =SOMME(A2:A10).\n\n[Question 1 — Formule de la somme des notes]\nA_COMPLETER\n\n[Question 2 — Résultat de la somme]\nA_COMPLETER\n\n[Question 3 — Formule de la moyenne des notes]\nA_COMPLETER\n\n[Question 4 — Résultat de la moyenne]\nA_COMPLETER\n\n[Question 5 — Résultat de MAX]\nA_COMPLETER\n\n[Question 6 — Résultat de MIN]\nA_COMPLETER\n",
    "hints": [
      "Quatre fonctions travaillent ici sur la même plage : SOMME additionne, MOYENNE fait la moyenne, MAX et MIN extraient les extrêmes.",
      "Calculez la somme à la main : 12 + 15 + 9 + 16 + 8 + 14 + 10, puis divisez par le nombre de notes pour la moyenne.",
      "MAX et MIN se lisent directement dans la colonne des notes : cherchez la meilleure et la moins bonne ; contrôle : la moyenne doit rester comprise entre les deux."
    ],
    "examples": [
      {
        "stdin": "Notes du module Word d'une autre promotion, saisies en B2:B6 :\n10 — 12 — 15 — 19 — 9\n1) Somme : =SOMME(B2:B6) → 10+12+15+19+9 = 65.\n2) Moyenne : =MOYENNE(B2:B6) → 65/5 = 13.\n3) =MAX(B2:B6) → 19 (meilleure note).\n4) =MIN(B2:B6) → 9 (note la plus basse).",
        "expected": "somme 65 — moyenne 13 — max 19 — min 9",
        "note": "La moyenne se vérifie toujours : somme divisée par effectif — ici 65/5 = 13 tombe juste."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Formule de la somme des notes",
        "stdin": "q:1",
        "expected": "=SOMME(B2:B8)||SOMME(B2:B8)||= SOMME(B2:B8)||=SOMME(B2 : B8)||= SOMME(B2 : B8)||SOMME(B2 : B8)"
      },
      {
        "label": "Question 2 — Résultat de la somme",
        "stdin": "q:2",
        "expected": "84"
      },
      {
        "label": "Question 3 — Formule de la moyenne des notes",
        "stdin": "q:3",
        "expected": "=MOYENNE(B2:B8)||MOYENNE(B2:B8)||= MOYENNE(B2:B8)||=MOYENNE(B2 : B8)||= MOYENNE(B2 : B8)||MOYENNE(B2 : B8)"
      },
      {
        "label": "Question 4 — Résultat de la moyenne",
        "stdin": "q:4",
        "expected": "12"
      },
      {
        "label": "Question 5 — Résultat de MAX",
        "stdin": "q:5",
        "expected": "16"
      },
      {
        "label": "Question 6 — Résultat de MIN",
        "stdin": "q:6",
        "expected": "8"
      }
    ],
    "solution": "[Question 1 — Formule de la somme des notes]\n=SOMME(B2:B8)\n\n[Question 2 — Résultat de la somme]\n84\n\n[Question 3 — Formule de la moyenne des notes]\n=MOYENNE(B2:B8)\n\n[Question 4 — Résultat de la moyenne]\n12\n\n[Question 5 — Résultat de MAX]\n16\n\n[Question 6 — Résultat de MIN]\n8",
    "takeaway": "1) La formule de la somme est =SOMME(B2:B8).\n2) 12 + 15 + 9 + 16 + 8 + 14 + 10 = 84.\n3) La formule de la moyenne est =MOYENNE(B2:B8).\n4) 84/7 = 12 : la moyenne de la classe vaut 12 sur 20.\n5) =MAX(B2:B8) renvoie 16, la meilleure note (Damas).\n6) =MIN(B2:B8) renvoie 8, la note la plus basse (Éric).\nContrôle : la moyenne 12 est bien comprise entre le minimum 8 et le maximum 16, et 7 notes × 12 = 84 retrouve la somme."
  },
  {
    "id": "bu-c4-e3",
    "chapter": 4,
    "level": "n2",
    "language": "analyse",
    "title": "Le relevé d'absences du lycée technique",
    "exampleTitle": "Exemple résolu — le relevé de la classe de seconde",
    "goal": "Distinguer NB (cellules numériques) et NBVAL (cellules non vides) sur un mélange de contenus, et extraire du texte avec Gauche et STXT.",
    "brief": "<p><strong>Énoncé.</strong> Le conseiller principal d'éducation (CPE) du lycée technique dresse le relevé d'absences du trimestre. Dans la feuille « Absences », la plage B2:B8 mélange des nombres (jours d'absence), des mots (motifs) et une cellule vide :</p><table><tr><th> </th><th>A</th><th>B</th></tr><tr><th>1</th><td>Élève</td><td>Jours d'absence</td></tr><tr><th>2</th><td>Kossi</td><td>3</td></tr><tr><th>3</th><td>Abla</td><td>maladie</td></tr><tr><th>4</th><td>Yao</td><td>8</td></tr><tr><th>5</th><td>Djamila</td><td></td></tr><tr><th>6</th><td>Mawuli</td><td>0</td></tr><tr><th>7</th><td>Sena</td><td>5</td></tr><tr><th>8</th><td>Komi</td><td>stage</td></tr></table><p>La cellule D2 contient quant à elle le mot <strong>SECRETAIRE</strong>. Rappel du cours : <strong>NB</strong> compte les cellules numériques d'une plage, <strong>NBVAL</strong> les cellules non vides ; <strong>Gauche(Ad;n)</strong> extrait les n premiers caractères, <strong>Droite(Ad;n)</strong> les n derniers, <strong>STXT(Ad;n1;n2)</strong> extrait n2 caractères à partir de la position n1 (la première lettre est à la position 1).</p><ol><li>Écrivez la formule qui compte les cellules contenant des nombres dans la plage B2:B8.</li><li>Que renvoie =NB(B2:B8) ? Répondez par le nombre seul.</li><li>Écrivez la formule qui compte les cellules non vides de la plage B2:B8.</li><li>Que renvoie =NBVAL(B2:B8) ? Répondez par le nombre seul.</li><li>Que renvoie =Gauche(D2;4) ? Répondez par le mot extrait.</li><li>Que renvoie =STXT(D2;3;4) ? Répondez par le mot extrait.</li></ol><p>Écrivez les formules sans espaces superflues, comme dans le cours : =NB(A2:A10).</p>",
    "starter": "# Exercice — Le relevé d'absences du lycée technique\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Formules sans espaces superflues : =NB(A2:A10).\n\n[Question 1 — Formule du comptage des nombres]\nA_COMPLETER\n\n[Question 2 — Résultat de NB]\nA_COMPLETER\n\n[Question 3 — Formule du comptage des non vides]\nA_COMPLETER\n\n[Question 4 — Résultat de NBVAL]\nA_COMPLETER\n\n[Question 5 — Résultat de Gauche(D2;4)]\nA_COMPLETER\n\n[Question 6 — Résultat de STXT(D2;3;4)]\nA_COMPLETER\n",
    "hints": [
      "Deux compteurs à ne pas confondre : l'un ne voit que les nombres, l'autre voit tout ce qui n'est pas vide.",
      "Parcourez la colonne B ligne à ligne : comptez d'abord les valeurs numériques (attention au zéro, c'est un nombre), puis tout ce qui n'est pas vide ; le mot « maladie » n'est pas un nombre mais remplit sa cellule.",
      "Pour SECRETAIRE, épelez lettre par lettre : S-E-C-R-E-T-A-I-R-E ; Gauche part du début, STXT part de la position 3 et prend 4 caractères."
    ],
    "examples": [
      {
        "stdin": "Relevé d'une classe de seconde, plage B2:B7 :\n2 — excusé — 6 — (vide) — 4 — (vide)\n1) Nombres : 2, 6 et 4 → =NB(B2:B7) renvoie 3.\n2) Non vides : 2, excusé, 6 et 4 → =NBVAL(B2:B7) renvoie 4.\n3) La cellule D2 contient informatique : Gauche(D2;3) = inf, Droite(D2;5) = tique, STXT(D2;2;3) = nfo.",
        "expected": "nb 3 — nbval 4 — inf — tique — nfo",
        "note": "NB filtre les nombres, NBVAL tout ce qui n'est pas vide : deux compteurs, deux lectures du même tableau."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Formule du comptage des nombres",
        "stdin": "q:1",
        "expected": "=NB(B2:B8)||NB(B2:B8)||= NB(B2:B8)||=NB(B2 : B8)||= NB(B2 : B8)||NB(B2 : B8)"
      },
      {
        "label": "Question 2 — Résultat de NB",
        "stdin": "q:2",
        "expected": "4||quatre"
      },
      {
        "label": "Question 3 — Formule du comptage des non vides",
        "stdin": "q:3",
        "expected": "=NBVAL(B2:B8)||NBVAL(B2:B8)||= NBVAL(B2:B8)||=NBVAL(B2 : B8)||= NBVAL(B2 : B8)||NBVAL(B2 : B8)"
      },
      {
        "label": "Question 4 — Résultat de NBVAL",
        "stdin": "q:4",
        "expected": "6||six"
      },
      {
        "label": "Question 5 — Résultat de Gauche(D2;4)",
        "stdin": "q:5",
        "expected": "secr"
      },
      {
        "label": "Question 6 — Résultat de STXT(D2;3;4)",
        "stdin": "q:6",
        "expected": "cret"
      }
    ],
    "solution": "[Question 1 — Formule du comptage des nombres]\n=NB(B2:B8)\n\n[Question 2 — Résultat de NB]\n4\n\n[Question 3 — Formule du comptage des non vides]\n=NBVAL(B2:B8)\n\n[Question 4 — Résultat de NBVAL]\n6\n\n[Question 5 — Résultat de Gauche(D2;4)]\nsecr\n\n[Question 6 — Résultat de STXT(D2;3;4)]\ncret",
    "takeaway": "1) La formule du comptage des nombres est =NB(B2:B8).\n2) Les cellules numériques de B2:B8 sont 3, 8, 0 et 5 : =NB(B2:B8) renvoie 4 — le zéro de Mawuli est bien un nombre.\n3) La formule du comptage des non vides est =NBVAL(B2:B8).\n4) Les cellules non vides sont 3, « maladie », 8, 0, 5 et « stage » : =NBVAL(B2:B8) renvoie 6 — la cellule de Djamila, vide, ne compte pas.\n5) SECRETAIRE : S-E-C-R-E-T-A-I-R-E ; Gauche(D2;4) extrait les 4 premiers caractères : SECR.\n6) STXT(D2;3;4) extrait 4 caractères à partir de la position 3 : CRET.\nContrôle : NBVAL (6) = NB (4) + les deux mots « maladie » et « stage » ; la cellule vide n'est comptée par aucun des deux."
  },
  {
    "id": "bu-c5-e1",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Le jury du module Excel : admis ou refusé",
    "exampleTitle": "Exemple résolu — le concours d'entrée de l'école",
    "goal": "Écrire la fonction SI d'un verdict (test, valeur si vrai, valeur si faux), lire ses résultats aux bornes et calculer la moyenne de classe.",
    "brief": "<p><strong>Énoncé.</strong> Le jury du centre de formation Compétences Plus délibère sur le module Excel. Règle du jury : <strong>« Admis »</strong> si la note atteint au moins 10 sur 20, <strong>« Refusé »</strong> sinon. Les notes sont saisies dans la feuille « Résultats » :</p><table><tr><th> </th><th>A</th><th>B</th></tr><tr><th>1</th><td>Étudiant</td><td>Note /20</td></tr><tr><th>2</th><td>Awa</td><td>12</td></tr><tr><th>3</th><td>Boris</td><td>9</td></tr><tr><th>4</th><td>Chantal</td><td>10</td></tr><tr><th>5</th><td>Damas</td><td>14</td></tr><tr><th>6</th><td>Éric</td><td>7</td></tr><tr><th>7</th><td>Fifi</td><td>11</td></tr></table><p>La secrétaire du centre veut afficher le verdict de chaque étudiant dans la colonne C à l'aide de la fonction <strong>SI(Test; Valeur_si_Test_vrai; Valeur_si_Test_faux)</strong>.</p><ol><li>Écrivez la formule de la cellule C2 qui affiche « Admis » si la note de B2 atteint au moins 10, « Refusé » sinon.</li><li>Que renvoie cette formule pour Awa, dont la note vaut 12 ? Répondez par un seul mot.</li><li>Que renvoie-t-elle pour Boris, dont la note vaut 9 ? Répondez par un seul mot.</li><li>Que renvoie-t-elle pour Chantal, qui a exactement 10 ? Répondez par un seul mot.</li><li>Combien d'étudiants le jury admettra-t-il au total ? Répondez par le nombre seul.</li><li>Calculez à la main la moyenne de la classe : somme des notes divisée par le nombre d'étudiants.</li></ol><p>Écrivez la formule sans espaces superflues, arguments séparés par des points-virgules, textes entre guillemets doubles, comme dans le cours : =SI(A2&gt;=50;\"Oui\";\"Non\").</p>",
    "starter": "# Exercice — Le jury du module Excel : admis ou refusé\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Formule sans espaces superflues : =SI(A2>=50;\"Oui\";\"Non\").\n\n[Question 1 — Formule du verdict en C2]\nA_COMPLETER\n\n[Question 2 — Verdict pour Awa (12)]\nA_COMPLETER\n\n[Question 3 — Verdict pour Boris (9)]\nA_COMPLETER\n\n[Question 4 — Verdict pour Chantal (10 exactement)]\nA_COMPLETER\n\n[Question 5 — Nombre d'admis au total]\nA_COMPLETER\n\n[Question 6 — Moyenne de la classe]\nA_COMPLETER\n",
    "hints": [
      "La syntaxe du cours : SI(Test; Valeur_si_Test_vrai; Valeur_si_Test_faux) — le test est une expression logique, ici une comparaison à 10.",
      "Le test demandé est « supérieur OU égal » : la note 10 passe ; comptez ensuite, dans le tableau, les notes qui satisfont ce test.",
      "Pour la moyenne, additionnez les six notes et divisez par 6 ; contrôle : la moyenne doit rester sous la meilleure note du tableau."
    ],
    "examples": [
      {
        "stdin": "Concours d'entrée d'une école : « Retenu » si le score atteint 50, « Ajourné » sinon.\nScores des candidats : 62 — 48 — 50 — 55.\n1) Formule en C2 : =SI(B2>=50;\"Retenu\";\"Ajourné\").\n2) Score 62 : Retenu.\n3) Score 48 : Ajourné.\n4) Score 50, exactement le seuil : Retenu (le test est « supérieur ou égal »).\n5) Retenus : 3 candidats sur 4.",
        "expected": "=SI(B2>=50;\"Retenu\";\"Ajourné\") — 62 retenu — 48 ajourné — 50 retenu — 3 retenus",
        "note": "La borne appartient au test >= : 50 est retenu, 49 ne l'est pas — lisez le sens du signe avant de conclure."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Formule du verdict en C2",
        "stdin": "q:1",
        "expected": "=SI(B2>=10;\"Admis\";\"Refusé\")||= SI(B2>=10;\"Admis\";\"Refusé\")||SI(B2>=10;\"Admis\";\"Refusé\")||=SI(B2>=10;Admis;Refusé)||= SI(B2>=10;Admis;Refusé)||SI(B2>=10;Admis;Refusé)"
      },
      {
        "label": "Question 2 — Verdict pour Awa (12)",
        "stdin": "q:2",
        "expected": "admis"
      },
      {
        "label": "Question 3 — Verdict pour Boris (9)",
        "stdin": "q:3",
        "expected": "refusé"
      },
      {
        "label": "Question 4 — Verdict pour Chantal (10 exactement)",
        "stdin": "q:4",
        "expected": "admis"
      },
      {
        "label": "Question 5 — Nombre d'admis au total",
        "stdin": "q:5",
        "expected": "4||quatre"
      },
      {
        "label": "Question 6 — Moyenne de la classe",
        "stdin": "q:6",
        "expected": "10,5||10.5"
      }
    ],
    "solution": "[Question 1 — Formule du verdict en C2]\n=SI(B2>=10;\"Admis\";\"Refusé\")\n\n[Question 2 — Verdict pour Awa (12)]\nadmis\n\n[Question 3 — Verdict pour Boris (9)]\nrefusé\n\n[Question 4 — Verdict pour Chantal (10 exactement)]\nadmis\n\n[Question 5 — Nombre d'admis au total]\n4\n\n[Question 6 — Moyenne de la classe]\n10,5",
    "takeaway": "1) La formule du verdict est =SI(B2>=10;\"Admis\";\"Refusé\") — recopiée vers le bas pour chaque étudiant.\n2) Awa a 12 : le test 12 >= 10 est vrai, la formule renvoie Admis.\n3) Boris a 9 : le test est faux, la formule renvoie Refusé.\n4) Chantal a exactement 10 : le test 10 >= 10 est VRAI (supérieur OU égal), la formule renvoie Admis.\n5) Les admis sont Awa (12), Chantal (10), Damas (14) et Fifi (11) : 4 admis sur 6.\n6) (12 + 9 + 10 + 14 + 7 + 11)/6 = 63/6 = 10,5 : la moyenne de la classe vaut 10,5 sur 20.\nContrôle : la moyenne 10,5 est cohérente — deux étudiants sous la barre de 10 (Boris 9, Éric 7) pour quatre au-dessus ou égaux."
  },
  {
    "id": "bu-c5-e2",
    "chapter": 5,
    "level": "n2",
    "language": "analyse",
    "title": "Les ventes de la Librairie des Nations",
    "exampleTitle": "Exemple résolu — les ventes de la boulangerie du quartier",
    "goal": "Compter, additionner et moyenner sous condition avec NB.SI, SOMME.SI et MOYENNE.SI sur un tableau de ventes.",
    "brief": "<p><strong>Énoncé.</strong> La gérante de la Librairie des Nations suit ses ventes de fournitures de la semaine dans une feuille Excel :</p><table><tr><th> </th><th>A</th><th>B</th></tr><tr><th>1</th><td>Article</td><td>Quantité vendue</td></tr><tr><th>2</th><td>Cahiers</td><td>120</td></tr><tr><th>3</th><td>Stylos</td><td>85</td></tr><tr><th>4</th><td>Cahiers</td><td>60</td></tr><tr><th>5</th><td>Agendas</td><td>25</td></tr><tr><th>6</th><td>Cahiers</td><td>95</td></tr><tr><th>7</th><td>Stylos</td><td>40</td></tr></table><p>Elle veut résumer ces ventes avec les compteurs conditionnels du cours : <strong>NB.SI(plage;critère)</strong> compte les cellules répondant au critère, <strong>SOMME.SI(plage;critère;plage_somme)</strong> additionne la plage_somme des cellules remplissant le critère, <strong>MOYENNE.SI(plage;critère;plage_moyenne)</strong> en fait la moyenne.</p><ol><li>Écrivez la formule qui compte les lignes de l'article « Cahiers » dans la plage A2:A7.</li><li>Que renvoie =NB.SI(A2:A7;\"Cahiers\") ? Répondez par le nombre seul.</li><li>Écrivez la formule qui additionne les quantités vendues des seules lignes « Cahiers » (critère sur A2:A7, somme sur B2:B7).</li><li>Que renvoie cette formule SOMME.SI ? Répondez par le nombre seul.</li><li>Que renvoie =NB.SI(B2:B7;\">=80\") ? Répondez par le nombre seul.</li><li>Écrivez la formule qui calcule la moyenne des quantités vendues des seules lignes « Stylos ».</li></ol><p>Écrivez les formules sans espaces superflues, arguments séparés par des points-virgules : =NB.SI(D4:D9;\"Agendas\").</p>",
    "starter": "# Exercice — Les ventes de la Librairie des Nations\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Formules sans espaces superflues : =NB.SI(D4:D9;\"Agendas\").\n\n[Question 1 — Formule du comptage des Cahiers]\nA_COMPLETER\n\n[Question 2 — Résultat du comptage]\nA_COMPLETER\n\n[Question 3 — Formule de la somme des Cahiers]\nA_COMPLETER\n\n[Question 4 — Résultat de la somme conditionnelle]\nA_COMPLETER\n\n[Question 5 — Résultat de NB.SI(B2:B7;\">=80\")]\nA_COMPLETER\n\n[Question 6 — Formule de la moyenne des Stylos]\nA_COMPLETER\n",
    "hints": [
      "Trois usages d'un même critère : NB.SI compte, SOMME.SI additionne, MOYENNE.SI moyenne — la plage du critère et la plage à sommer sont distinctes.",
      "Pour « Cahiers », parcourez les lignes concernées du tableau : comptez-les, puis additionnez leurs quantités.",
      "Pour la question 5, le critère porte sur les quantités elles-mêmes : ne retenez que celles qui valent 80 ou plus."
    ],
    "examples": [
      {
        "stdin": "La boulangerie du quartier suit ses ventes de la journée :\nPains : 45 — Croissants : 30 — Pains : 25 — Croissants : 20 — Pains : 50\n1) Lignes « Pains » : =NB.SI(A2:A6;\"Pains\") → 3.\n2) Quantités de « Pains » : =SOMME.SI(A2:A6;\"Pains\";B2:B6) → 45 + 25 + 50 = 120.\n3) Ventes supérieures ou égales à 30 : =NB.SI(B2:B6;\">=30\") → 45, 30 et 50 → 3.",
        "expected": "nb.si pains 3 — somme.si pains 120 — nb.si >=30 : 3",
        "note": "SOMME.SI additionne la plage de somme, jamais la plage du critère : les croissants restent hors du total des pains."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Formule du comptage des Cahiers",
        "stdin": "q:1",
        "expected": "=NB.SI(A2:A7;\"Cahiers\")||= NB.SI(A2:A7;\"Cahiers\")||NB.SI(A2:A7;\"Cahiers\")||=NB.SI(A2:A7;Cahiers)||= NB.SI(A2:A7;Cahiers)||NB.SI(A2:A7;Cahiers)"
      },
      {
        "label": "Question 2 — Résultat du comptage",
        "stdin": "q:2",
        "expected": "3||trois"
      },
      {
        "label": "Question 3 — Formule de la somme des Cahiers",
        "stdin": "q:3",
        "expected": "=SOMME.SI(A2:A7;\"Cahiers\";B2:B7)||= SOMME.SI(A2:A7;\"Cahiers\";B2:B7)||SOMME.SI(A2:A7;\"Cahiers\";B2:B7)||=SOMME.SI(A2:A7;Cahiers;B2:B7)||= SOMME.SI(A2:A7;Cahiers;B2:B7)||SOMME.SI(A2:A7;Cahiers;B2:B7)"
      },
      {
        "label": "Question 4 — Résultat de la somme conditionnelle",
        "stdin": "q:4",
        "expected": "275"
      },
      {
        "label": "Question 5 — Résultat de NB.SI(B2:B7;\">=80\")",
        "stdin": "q:5",
        "expected": "3||trois"
      },
      {
        "label": "Question 6 — Formule de la moyenne des Stylos",
        "stdin": "q:6",
        "expected": "=MOYENNE.SI(A2:A7;\"Stylos\";B2:B7)||= MOYENNE.SI(A2:A7;\"Stylos\";B2:B7)||MOYENNE.SI(A2:A7;\"Stylos\";B2:B7)||=MOYENNE.SI(A2:A7;Stylos;B2:B7)||= MOYENNE.SI(A2:A7;Stylos;B2:B7)||MOYENNE.SI(A2:A7;Stylos;B2:B7)"
      }
    ],
    "solution": "[Question 1 — Formule du comptage des Cahiers]\n=NB.SI(A2:A7;\"Cahiers\")\n\n[Question 2 — Résultat du comptage]\n3\n\n[Question 3 — Formule de la somme des Cahiers]\n=SOMME.SI(A2:A7;\"Cahiers\";B2:B7)\n\n[Question 4 — Résultat de la somme conditionnelle]\n275\n\n[Question 5 — Résultat de NB.SI(B2:B7;\">=80\")]\n3\n\n[Question 6 — Formule de la moyenne des Stylos]\n=MOYENNE.SI(A2:A7;\"Stylos\";B2:B7)",
    "takeaway": "1) La formule du comptage est =NB.SI(A2:A7;\"Cahiers\").\n2) Les lignes « Cahiers » sont les lignes 2, 4 et 6 : =NB.SI(A2:A7;\"Cahiers\") renvoie 3.\n3) La formule de la somme conditionnelle est =SOMME.SI(A2:A7;\"Cahiers\";B2:B7).\n4) 120 + 60 + 95 = 275 : la somme des quantités de cahiers vendus vaut 275.\n5) Les quantités supérieures ou égales à 80 sont 120, 85 et 95 : =NB.SI(B2:B7;\">=80\") renvoie 3.\n6) La formule de la moyenne des stylos est =MOYENNE.SI(A2:A7;\"Stylos\";B2:B7) — elle vaudrait (85 + 40)/2 = 62,5.\nContrôle : les trois cahiers totalisent 275 pour une moyenne de 91,7, et le total général des ventes (120+85+60+25+95+40 = 425) englobe bien les 275 des cahiers."
  },
  {
    "id": "bu-c5-e3",
    "chapter": 5,
    "level": "n3",
    "language": "analyse",
    "title": "Le SI imbriqué",
    "goal": "Reproduire la fonction SI imbriquée : mention selon la note, avec messages composés.",
    "brief": "<p>L’analyse porte sur d'abord <strong>n</strong>, puis <strong>n lignes</strong> « eleve note ». Il applique la fonction SI imbriquée du support : note &gt;= 16 → <code>eleve : tres bien</code> ; note &gt;= 14 → <code>eleve : bien</code> ; note &gt;= 10 → <code>eleve : passe</code> ; sinon <code>eleve : rattrapage</code>. Concluez par <code>recales : X</code> (notes sous 10).</p>",
    "starter": "# Grille d'analyse (bu-c5-e3) — Le SI imbriqué\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Frontières]\n# Données : ana 16\n# Données : ben 15\n# Données : cleo 14\nA_COMPLETER\n\n[Cas 2 — Tous recales]\n# Données : ana 9\n# Données : ben 0\nA_COMPLETER\n\n[Cas 3 — Classe complète]\n# Données : a 18\n# Données : b 13\n# Données : c 10\n# Données : d 9\n# Données : e 16\nA_COMPLETER\n",
    "hints": [
      "Le SI imbriqué teste du plus strict au plus large : 16, 14, 10, sinon rattrapage.",
      "Compte un recale pour chaque note strictement sous 10.",
      "Suivez la cascade de seuils exacts du SI imbriqué (>=16 tres bien, >=10 passe, etc.) sans espace superflu ni accent."
    ],
    "examples": [
      {
        "stdin": "4\nana 17\nben 14\ncleo 10\ndan 8\n",
        "expected": "ana : tres bien\nben : bien\ncleo : passe\ndan : rattrapage\nrecales : 1"
      }
    ],
    "tests": [
      {
        "label": "Frontières",
        "stdin": "cas:1",
        "expected": "ana : tres bien\nben : bien\ncleo : bien\nrecales : 0"
      },
      {
        "label": "Tous recales",
        "stdin": "cas:2",
        "expected": "ana : rattrapage\nben : rattrapage\nrecales : 2"
      },
      {
        "label": "Classe complète",
        "stdin": "cas:3",
        "expected": "a : tres bien\nb : passe\nc : passe\nd : rattrapage\ne : tres bien\nrecales : 1"
      }
    ],
    "solution": "[Exemple]\nana : tres bien\nben : bien\ncleo : passe\ndan : rattrapage\nrecales : 1\n\n[Cas 1 — Frontières]\nana : tres bien\nben : bien\ncleo : bien\nrecales : 0\n\n[Cas 2 — Tous recales]\nana : rattrapage\nben : rattrapage\nrecales : 2\n\n[Cas 3 — Classe complète]\na : tres bien\nb : passe\nc : passe\nd : rattrapage\ne : tres bien\nrecales : 1\n",
    "takeaway": "À retenir : Reproduire la fonction SI imbriquée : mention selon la note, avec messages composés."
  },
  {
    "id": "bu-c6-e1",
    "chapter": 6,
    "level": "n1",
    "language": "analyse",
    "title": "L'écran du briefing trimestriel des ventes",
    "exampleTitle": "Exemple résolu — l'assemblée générale de l'association",
    "goal": "Retrouver les zones de l'écran de PowerPoint et choisir le mode d'affichage adapté à chaque tâche.",
    "brief": "<p><strong>Énoncé.</strong> Inès, cheffe du service commercial, prépare le briefing trimestriel des ventes : une présentation PowerPoint de <strong>12 diapositives</strong>. Avant de se lancer, elle répère les zones de l'écran et les quatre modes d'affichage du cours : <strong>Normal</strong> (une diapositive à la fois, édition du contenu), <strong>Trieuse de diapositives</strong> (miniatures de toutes les diapositives : vue globale, réorganisation, masquage, transitions, minutage), <strong>Diaporama</strong> (présentation visualisée sur l'écran ou projetée) et <strong>Page de commentaire</strong> (diapositive en haut, commentaires en dessous).</p><ol><li>Quel mode d'affichage montre une diapositive à la fois et sert à éditer son contenu ?</li><li>Quel mode affiche toutes les diapositives en miniatures, pour les réorganiser ou en masquer ?</li><li>Quel mode projette la présentation sur l'écran, avec passage automatique ou manuel ?</li><li>Quel mode associe des notes à chaque diapositive : la diapositive en haut, les commentaires dessous ?</li><li>Quel bouton de la fenêtre remplace le menu Fichier des versions antérieures ?</li><li>Le passage à la diapositive suivante se fait automatiquement après un délai, ou bien… comment ? Répondez par un seul mot.</li></ol><p>Répondez par le nom du mode ou de l'élément, en un à trois mots.</p>",
    "starter": "# Exercice — L'écran du briefing trimestriel des ventes\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Répondez par le nom du mode ou de l'élément (un à trois mots).\n\n[Question 1 — Mode d'édition d'une diapositive]\nA_COMPLETER\n\n[Question 2 — Mode des miniatures]\nA_COMPLETER\n\n[Question 3 — Mode de projection]\nA_COMPLETER\n\n[Question 4 — Mode des notes par diapositive]\nA_COMPLETER\n\n[Question 5 — Bouton qui remplace le menu Fichier]\nA_COMPLETER\n\n[Question 6 — Passage non automatique (un mot)]\nA_COMPLETER\n",
    "hints": [
      "Quatre modes, quatre verbes : éditer, organiser, projeter, annoter.",
      "Les miniatures appartiennent au mode qui montre tout le diaporama d'un coup d'œil ; l'édition d'une seule diapositive reste dans le mode du volet Plan/Diapositives.",
      "Pour les deux dernières questions, relisez la description de la fenêtre : un bouton bien connu des versions récentes remplace le menu Fichier, et le passage des diapositives connaît deux régimes."
    ],
    "examples": [
      {
        "stdin": "L'assemblée générale d'une association se prépare.\n1) Écrire le contenu d'une diapositive : mode Normal.\n2) Réordonner 30 diapositives : Trieuse de diapositives.\n3) Projeter en salle : Diaporama.\n4) Imprimer un guide pour l'orateur : Page de commentaire.\n5) La fenêtre : le bouton Office remplace le menu Fichier des versions antérieures.",
        "expected": "normal — trieuse de diapositives — diaporama — page de commentaire — bouton office",
        "note": "Un verbe par mode : Normal édite, la Trieuse organise, le Diaporama projette, la Page commente."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mode d'édition d'une diapositive",
        "stdin": "q:1",
        "expected": "normal||mode normal||le mode normal"
      },
      {
        "label": "Question 2 — Mode des miniatures",
        "stdin": "q:2",
        "expected": "trieuse de diapositives||trieuse||mode trieuse||la trieuse de diapositives"
      },
      {
        "label": "Question 3 — Mode de projection",
        "stdin": "q:3",
        "expected": "diaporama||mode diaporama||le mode diaporama"
      },
      {
        "label": "Question 4 — Mode des notes par diapositive",
        "stdin": "q:4",
        "expected": "page de commentaire||page commentaire||mode page de commentaire||commentaire"
      },
      {
        "label": "Question 5 — Bouton qui remplace le menu Fichier",
        "stdin": "q:5",
        "expected": "bouton office||office||le bouton office"
      },
      {
        "label": "Question 6 — Passage non automatique (un mot)",
        "stdin": "q:6",
        "expected": "manuel||manuellement"
      }
    ],
    "solution": "[Question 1 — Mode d'édition d'une diapositive]\nnormal\n\n[Question 2 — Mode des miniatures]\ntrieuse de diapositives\n\n[Question 3 — Mode de projection]\ndiaporama\n\n[Question 4 — Mode des notes par diapositive]\npage de commentaire\n\n[Question 5 — Bouton qui remplace le menu Fichier]\nbouton office\n\n[Question 6 — Passage non automatique (un mot)]\nmanuel",
    "takeaway": "1) Le mode Normal affiche une diapositive à la fois, avec le volet Plan/Diapositives à gauche pour naviguer : c'est le mode d'édition.\n2) La Trieuse de diapositives affiche toutes les diapositives en miniatures : on y réorganise, masque, règle transitions et minutage.\n3) Le mode Diaporama projette la présentation sur l'écran, avec passage automatique (après un délai) ou manuel.\n4) La Page de commentaire associe les notes à chaque diapositive : diapositive en haut, commentaires dessous — imprimée, elle sert de guide au présentateur ou de support distribué.\n5) Le bouton Office remplace le menu Fichier des versions antérieures (Nouveau, Ouvrir, Enregistrer, Quitter).\n6) Le passage non automatique est manuel : un clic du présentateur fait avancer le diaporama.\nContrôle : « Normal édite, la Trieuse organise, le Diaporama projette, la Page commente » — les six réponses suivent la carte de l'écran du support."
  },
  {
    "id": "bu-c6-e2",
    "chapter": 6,
    "level": "n2",
    "language": "analyse",
    "title": "Monter la présentation des résultats trimestriels",
    "exampleTitle": "Exemple résolu — la présentation de vœux de l'entreprise",
    "goal": "Créer une présentation à partir d'un modèle ou d'un document vierge, choisir et adapter un thème, planifier le nombre de diapositives.",
    "brief": "<p><strong>Énoncé.</strong> La direction demande à Inès de monter la présentation des résultats trimestriels du service commercial. Elle partira d'un modèle ou d'un document vierge, choisira un thème, adaptera les couleurs, et terminera par la répétition. La direction prévoit un exposé de <strong>15 minutes</strong> et recommande le rythme d'une diapositive par minute. Rappel du cours : un <strong>modèle</strong> est un document prédéfini avec styles et diapositives d'exemple à remplacer (téléchargé depuis Office Online, connexion requise) ; les <strong>thèmes</strong> se choisissent à l'onglet Création, leur survol affiche un aperçu avant clic, et le menu Couleurs du groupe Thèmes adapte les couleurs.</p><ol><li>Comment appelle-t-on un document PowerPoint prédéfini, avec styles et diapositives d'exemple à remplacer ?</li><li>Quel onglet porte le choix des thèmes ?</li><li>Que produit le survol d'un thème, avant même de cliquer ?</li><li>Par quel menu du groupe Thèmes adapte-t-on les couleurs d'un thème ?</li><li>Combien de diapositives Inès doit-elle prévoir pour 15 minutes à raison d'une par minute ? Répondez par le nombre seul.</li><li>Le fichier récupéré d'une clé USB refuse de s'ouvrir après une déconnexion brutale : quelle commande, cachée derrière la petite flèche du bouton Ouvrir, secourt un document corrompu ?</li></ol><p>Répondez par des noms courts : le document, l'onglet, le résultat du survol, le menu, le nombre, la commande.</p>",
    "starter": "# Exercice — Monter la présentation des résultats trimestriels\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Réponses par des noms courts, sans phrase.\n\n[Question 1 — Document prédéfini à personnaliser]\nA_COMPLETER\n\n[Question 2 — Onglet des thèmes]\nA_COMPLETER\n\n[Question 3 — Effet du survol d'un thème]\nA_COMPLETER\n\n[Question 4 — Menu des couleurs du thème]\nA_COMPLETER\n\n[Question 5 — Nombre de diapositives pour 15 minutes]\nA_COMPLETER\n\n[Question 6 — Commande de secours d'un document corrompu]\nA_COMPLETER\n",
    "hints": [
      "Deux points de départ existent : le document vierge, sans rien, et le document prédéfini qui installe styles et diapositives d'exemple.",
      "L'habillage d'une présentation se choisit dans un onglet à part, celui de la conception ; le support recommande de ne pas garder les couleurs d'origine.",
      "Le rythme d'une diapositive par minute transforme la durée de l'exposé en nombre de diapositives ; pour le document corrompu, relisez les secours cachés derrière le bouton Ouvrir."
    ],
    "examples": [
      {
        "stdin": "La directrice prépare la présentation de vœux de l'entreprise.\n1) Partir d'un document prédéfini à personnaliser : un modèle, téléchargé depuis Office Online (connexion requise).\n2) Choisir l'habillage : onglet Création, groupe Thèmes.\n3) Effet du survol d'un thème : un aperçu, avant le clic.\n4) Exposé de 10 minutes, une diapositive par minute : 10 diapositives.",
        "expected": "modèle — création — aperçu au survol — 10 diapositives",
        "note": "Un modèle s'adapte : les diapositives d'exemple se remplacent, et les couleurs du thème se changent par le menu Couleurs."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Document prédéfini à personnaliser",
        "stdin": "q:1",
        "expected": "modèle||un modèle||le modèle"
      },
      {
        "label": "Question 2 — Onglet des thèmes",
        "stdin": "q:2",
        "expected": "création||onglet création||l'onglet création"
      },
      {
        "label": "Question 3 — Effet du survol d'un thème",
        "stdin": "q:3",
        "expected": "un aperçu||aperçu||l'aperçu"
      },
      {
        "label": "Question 4 — Menu des couleurs du thème",
        "stdin": "q:4",
        "expected": "couleurs||menu couleurs||le menu couleurs"
      },
      {
        "label": "Question 5 — Nombre de diapositives pour 15 minutes",
        "stdin": "q:5",
        "expected": "15||quinze"
      },
      {
        "label": "Question 6 — Commande de secours d'un document corrompu",
        "stdin": "q:6",
        "expected": "ouvrir et réparer||ouvrir/réparer||ouvrir et reparer"
      }
    ],
    "solution": "[Question 1 — Document prédéfini à personnaliser]\nmodèle\n\n[Question 2 — Onglet des thèmes]\ncréation\n\n[Question 3 — Effet du survol d'un thème]\nun aperçu\n\n[Question 4 — Menu des couleurs du thème]\ncouleurs\n\n[Question 5 — Nombre de diapositives pour 15 minutes]\n15\n\n[Question 6 — Commande de secours d'un document corrompu]\nouvrir et réparer",
    "takeaway": "1) Un modèle : document prédéfini avec styles et diapositives d'exemple à remplacer, téléchargé depuis Office Online (connexion requise) — le document vierge, lui, ne contient rien.\n2) Les thèmes se choisissent à l'onglet Création.\n3) Le survol d'un thème produit un aperçu avant le clic.\n4) Le menu Couleurs du groupe Thèmes adapte les couleurs du thème — le support invite à ne pas s'arrêter aux couleurs du modèle.\n5) 15 minutes à raison d'une diapositive par minute : 15 diapositives.\n6) La commande Ouvrir et réparer, cachée derrière la petite flèche du bouton Ouvrir, secourt un document corrompu (déconnexion USB, panne de courant).\nContrôle : la règle d'or de l'enregistrement vaut aussi ici — Enregistrer sous la première fois, disquette ensuite."
  },
  {
    "id": "bu-c6-e3",
    "chapter": 6,
    "level": "n3",
    "language": "analyse",
    "title": "Le minutage du diaporama du salon",
    "exampleTitle": "Exemple résolu — le diaporama de la vitrine du magasin",
    "goal": "Régler le minutage d'un diaporama automatique : durée totale, conversion en minutes, délai par diapositive et délai moyen.",
    "brief": "<p><strong>Énoncé.</strong> Le stand de Togo Distribution au salon de Lomé doit tourner toute la journée en boucle, sans personne pour cliquer : Inès prépare donc un <strong>diaporama à passage automatique</strong> et règle le délai d'affichage de chaque diapositive. Voici sa maquette :</p><table><tr><th>Diapositive</th><th>Contenu</th><th>Délai (secondes)</th></tr><tr><td>1</td><td>Accueil de la marque</td><td>10</td></tr><tr><td>2</td><td>Chiffre d'affaires du trimestre</td><td>40</td></tr><tr><td>3</td><td>Meilleures ventes</td><td>30</td></tr><tr><td>4</td><td>Nouveautés</td><td>50</td></tr><tr><td>5</td><td>Conclusion</td><td>20</td></tr></table><p>Rappel du cours : le minutage du diaporama automatique, comme l'ordre et les transitions, se règle en mode Trieuse de diapositives ; chaque diapositive s'affiche automatiquement après son délai.</p><ol><li>Dans quel mode d'affichage règle-t-on l'ordre des diapositives, les transitions et le minutage du diaporama automatique ?</li><li>Quelle est la durée totale d'un tour complet du diaporama, en secondes ? Répondez par le nombre seul.</li><li>Exprimez cette durée totale en minutes, sous forme décimale (par exemple 1,5 pour 90 secondes).</li><li>La direction veut un diaporama d'exactement 3 minutes en 6 diapositives, toutes au même délai : quel délai par diapositive, en secondes ?</li><li>La diapositive 4 passe de 50 à 65 secondes : de combien de secondes faut-il raccourcir l'ensemble des autres diapositives pour conserver 150 secondes au total ?</li><li>À la répétition générale, le diaporama complet dure 100 secondes pour 5 diapositives : quel est le délai moyen par diapositive, en secondes ?</li></ol><p>Répondez par le nom du mode et par des nombres seuls (la question 3 en minutes décimales).</p>",
    "starter": "# Exercice — Le minutage du diaporama du salon\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Le nom du mode, puis des nombres seuls (question 3 : minutes décimales).\n\n[Question 1 — Mode du minutage]\nA_COMPLETER\n\n[Question 2 — Durée totale en secondes]\nA_COMPLETER\n\n[Question 3 — Durée totale en minutes]\nA_COMPLETER\n\n[Question 4 — Délai par diapositive pour 3 minutes]\nA_COMPLETER\n\n[Question 5 — Raccourcissement nécessaire]\nA_COMPLETER\n\n[Question 6 — Délai moyen à la répétition]\nA_COMPLETER\n",
    "hints": [
      "Le minutage du diaporama automatique se règle dans le mode des miniatures, celui qui montre toutes les diapositives d'un coup d'œil.",
      "Additionnez les cinq délais pour le tour complet ; pour passer des secondes aux minutes, divisez par 60 — une demi-minute s'écrit 0,5.",
      "Pour les deux dernières questions, posez les opérations : l'augmentation de la diapositive 4 doit être compensée à due concurrence, et le délai moyen est le total divisé par le nombre de diapositives."
    ],
    "examples": [
      {
        "stdin": "Le diaporama de la vitrine d'un magasin tourne en boucle.\nDélais : 30 — 30 — 30 (3 diapositives).\n1) Réglage de l'ordre, des transitions et du minutage : Trieuse de diapositives.\n2) Durée totale : 30 + 30 + 30 = 90 secondes.\n3) En minutes : 90/60 = 1,5.\n4) 2 minutes en 4 diapositives au même délai : 120/4 = 30 secondes.\n5) Délai moyen : 90/3 = 30 secondes.",
        "expected": "trieuse — total 90 s — 1,5 min — 30 s par diapo — moyenne 30 s",
        "note": "Minutage automatique : la somme des délais donne le tour complet, et la division par le nombre de diapositives donne le délai moyen."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Mode du minutage",
        "stdin": "q:1",
        "expected": "trieuse de diapositives||trieuse||mode trieuse||la trieuse"
      },
      {
        "label": "Question 2 — Durée totale en secondes",
        "stdin": "q:2",
        "expected": "150"
      },
      {
        "label": "Question 3 — Durée totale en minutes",
        "stdin": "q:3",
        "expected": "2,5||2.5"
      },
      {
        "label": "Question 4 — Délai par diapositive pour 3 minutes",
        "stdin": "q:4",
        "expected": "30"
      },
      {
        "label": "Question 5 — Raccourcissement nécessaire",
        "stdin": "q:5",
        "expected": "15"
      },
      {
        "label": "Question 6 — Délai moyen à la répétition",
        "stdin": "q:6",
        "expected": "20"
      }
    ],
    "solution": "[Question 1 — Mode du minutage]\ntrieuse de diapositives\n\n[Question 2 — Durée totale en secondes]\n150\n\n[Question 3 — Durée totale en minutes]\n2,5\n\n[Question 4 — Délai par diapositive pour 3 minutes]\n30\n\n[Question 5 — Raccourcissement nécessaire]\n15\n\n[Question 6 — Délai moyen à la répétition]\n20",
    "takeaway": "1) L'ordre, les transitions et le minutage du diaporama automatique se règlent en mode Trieuse de diapositives.\n2) 10 + 40 + 30 + 50 + 20 = 150 : un tour complet dure 150 secondes.\n3) 150/60 = 2,5 : le tour complet dure 2,5 minutes (2 minutes et demie).\n4) 3 minutes = 180 secondes ; 180/6 = 30 : chaque diapositive doit durer 30 secondes.\n5) La diapositive 4 gagne 65 − 50 = 15 secondes : il faut raccourcir les autres de 15 secondes au total pour rester à 150.\n6) 100/5 = 20 : le délai moyen constaté à la répétition est de 20 secondes par diapositive.\nContrôle : le tour complet (150 s) reste la référence des questions 3 et 5 ; les délais moyens se vérifient en multipliant par le nombre de diapositives (5 × 20 = 100)."
  }
];
