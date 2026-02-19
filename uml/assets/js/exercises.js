/* ============================================
   RD UML — Exercise Engine
   5 chapitres × 18 exercices = 90 exercices
   (5 guidés + 10 quiz + 3 glisser-déposer)
   ============================================ */
const ExerciseEngine = (() => {

/* ---------- BASE DE DONNÉES ---------- */
const DB = {

/* ===== CHAPITRE 1 : Introduction à UML ===== */
chapitre1: {
  title: "Introduction à UML",
  guided: [
    {q:"Citez les trois auteurs principaux d'UML (les \"Amigos\").",hint:"Grady B..., James R..., Ivar J...",a:"Grady Booch, James Rumbaugh, Ivar Jacobson"},
    {q:"En quelle année UML a-t-il été normalisé par l'OMG ?",hint:"Fin des années 90",a:"1997"},
    {q:"Combien de diagrammes comporte UML 2.0 ?",hint:"Plus de 10, moins de 15",a:"13"},
    {q:"Donnez les deux grandes catégories de diagrammes UML.",hint:"Structure et ...",a:"Diagrammes de structure et diagrammes de comportement"},
    {q:"Quel organisme international standardise UML ?",hint:"O... M... G...",a:"OMG (Object Management Group)"}
  ],
  quiz: [
    {q:"UML signifie :",options:["Unified Modeling Language","Universal Modeling Language","Unified Method Language","Universal Method Language"],answer:0},
    {q:"UML est avant tout :",options:["Un langage de programmation","Un langage de modélisation","Un système d'exploitation","Un framework de développement"],answer:1},
    {q:"Combien de diagrammes structurels en UML 2.0 ?",options:["4","6","7","9"],answer:2},
    {q:"Combien de diagrammes comportementaux en UML 2.0 ?",options:["4","6","7","9"],answer:1},
    {q:"Lequel n'est PAS un diagramme UML ?",options:["Diagramme de classes","Diagramme de Gantt","Diagramme de séquence","Diagramme d'activités"],answer:1},
    {q:"Le diagramme de classes est un diagramme de :",options:["Comportement","Interaction","Structure","Déploiement"],answer:2},
    {q:"Le diagramme de séquence est un diagramme de :",options:["Structure","Comportement / Interaction","Déploiement","Composants"],answer:1},
    {q:"Qui a créé la méthode OMT ?",options:["Grady Booch","Ivar Jacobson","James Rumbaugh","Bertrand Meyer"],answer:2},
    {q:"Qui est l'inventeur des cas d'utilisation ?",options:["Grady Booch","Ivar Jacobson","James Rumbaugh","Martin Fowler"],answer:1},
    {q:"UML 2.0 a été publié en :",options:["1997","2000","2004","2010"],answer:2}
  ],
  drag: [
    {q:"Classez chaque diagramme : Structure ou Comportement",pairs:[["Classes","Structure"],["Séquence","Comportement"],["Composants","Structure"],["Activités","Comportement"]]},
    {q:"Associez chaque auteur à sa méthode d'origine",pairs:[["Booch","Méthode Booch"],["Rumbaugh","OMT"],["Jacobson","OOSE / Use Cases"]]},
    {q:"Mettez dans l'ordre chronologique",pairs:[["1","Méthodes OO séparées (avant 1994)"],["2","Méthode Unifiée (1995)"],["3","UML 1.0 / OMG (1997)"],["4","UML 2.0 (2004)"]]}
  ]
},

/* ===== CHAPITRE 2 : Diagramme de Classes ===== */
chapitre2: {
  title: "Diagramme de Classes",
  guided: [
    {q:"Comment représente-t-on la visibilité publique d'un attribut en UML ?",hint:"Un symbole + ou - ou # ?",a:"+ (plus)"},
    {q:"Quelle est la multiplicité pour « zéro ou plusieurs » ?",hint:"Un symbole étoile",a:"0..* ou *"},
    {q:"Comment note-t-on une composition en UML ?",hint:"Losange noir ou blanc ?",a:"Losange noir (plein) du côté du composite"},
    {q:"Comment note-t-on l'héritage en UML ?",hint:"Quel type de flèche ?",a:"Flèche avec triangle vide pointant vers la classe parente"},
    {q:"Écrivez en UML : un attribut privé nom de type String.",hint:"visibilité nom : type",a:"- nom : String"}
  ],
  quiz: [
    {q:"Le symbole + signifie :",options:["private","protected","public","package"],answer:2},
    {q:"Le symbole # signifie :",options:["private","protected","public","package"],answer:1},
    {q:"Le symbole - signifie :",options:["private","protected","public","package"],answer:0},
    {q:"Le symbole ~ signifie :",options:["private","protected","public","package"],answer:3},
    {q:"La multiplicité 1..* signifie :",options:["Zéro ou un","Exactement un","Un ou plusieurs","Zéro ou plusieurs"],answer:2},
    {q:"Le losange noir représente :",options:["L'agrégation","La composition","L'héritage","La dépendance"],answer:1},
    {q:"Le losange blanc représente :",options:["L'agrégation","La composition","L'héritage","L'association"],answer:0},
    {q:"En composition, si le composite est détruit :",options:["Les composants survivent","Les composants sont détruits aussi","Rien ne se passe","Erreur de modélisation"],answer:1},
    {q:"Un attribut souligné en UML signifie :",options:["Il est abstrait","Il est statique (de classe)","Il est constant","Il est privé"],answer:1},
    {q:"Une classe abstraite s'écrit en :",options:["Gras","Italique","Souligné","Entre crochets"],answer:1}
  ],
  drag: [
    {q:"Associez le symbole de visibilité à sa signification",pairs:[["+","public"],["-","private"],["#","protected"],["~","package"]]},
    {q:"Associez le type de relation à son symbole",pairs:[["Héritage","Triangle vide"],["Composition","Losange noir"],["Agrégation","Losange blanc"],["Association","Ligne simple"]]},
    {q:"Associez la multiplicité à sa signification",pairs:[["1","Exactement un"],["0..1","Zéro ou un"],["*","Zéro ou plusieurs"],["1..*","Un ou plusieurs"]]}
  ]
},

/* ===== CHAPITRE 3 : Cas d'utilisation ===== */
chapitre3: {
  title: "Cas d'utilisation",
  guided: [
    {q:"Comment représente-t-on un acteur en UML ?",hint:"Un petit personnage ou un rectangle avec stéréotype",a:"Un bonhomme bâton (stick figure) avec son nom en dessous"},
    {q:"Comment représente-t-on un cas d'utilisation en UML ?",hint:"Forme géométrique ovale",a:"Une ellipse contenant le nom du cas d'utilisation"},
    {q:"Quelle est la différence entre «include» et «extend» ?",hint:"L'un est obligatoire, l'autre optionnel",a:"Include = relation obligatoire (toujours exécuté). Extend = relation optionnelle (exécuté sous condition)."},
    {q:"Comment s'appelle la zone rectangulaire qui entoure les cas d'utilisation ?",hint:"Elle représente le système",a:"Le cadre du système (system boundary)"},
    {q:"Citez les 3 types de relations entre cas d'utilisation.",hint:"include, extend et...",a:"Include, extend et généralisation"}
  ],
  quiz: [
    {q:"Un acteur représente :",options:["Toujours une personne humaine","Un rôle joué par une entité externe au système","Un composant interne du système","Une base de données"],answer:1},
    {q:"La relation «include» signifie :",options:["Le cas de base inclut TOUJOURS le cas inclus","Le cas de base inclut PARFOIS le cas inclus","Les deux cas sont indépendants","Le cas inclus remplace le cas de base"],answer:0},
    {q:"La relation «extend» signifie :",options:["Extension obligatoire","Extension optionnelle sous condition","Héritage entre cas","Suppression d'un cas"],answer:1},
    {q:"Le sens de la flèche «include» va :",options:["Du cas de base vers le cas inclus","Du cas inclus vers le cas de base","Dans les deux sens","Il n'y a pas de flèche"],answer:0},
    {q:"Le sens de la flèche «extend» va :",options:["Du cas de base vers l'extension","De l'extension vers le cas de base","Dans les deux sens","Il n'y a pas de flèche"],answer:1},
    {q:"Un acteur principal :",options:["Déclenche le cas d'utilisation","Reçoit passivement le résultat","Est toujours un humain","N'interagit pas directement"],answer:0},
    {q:"Le scénario nominal décrit :",options:["Le cas d'erreur","Le cas alternatif","Le déroulement normal et optimal","Le cas exceptionnel"],answer:2},
    {q:"Combien de champs minimum dans une description textuelle de CU ?",options:["3","5","8","10"],answer:2},
    {q:"La généralisation entre acteurs signifie :",options:["Un acteur hérite des CU d'un autre","Un acteur supprime un autre","Deux acteurs fusionnent","Les acteurs n'ont aucun lien"],answer:0},
    {q:"Un acteur peut être :",options:["Un humain uniquement","Un système externe uniquement","Un humain, un système externe ou un timer","Seulement l'administrateur"],answer:2}
  ],
  drag: [
    {q:"Associez la relation à sa caractéristique",pairs:[["«include»","Obligatoire / toujours exécuté"],["«extend»","Optionnel / sous condition"],["Généralisation","Héritage entre cas d'utilisation"]]},
    {q:"Associez chaque élément à sa représentation graphique",pairs:[["Acteur","Bonhomme bâton"],["Cas d'utilisation","Ellipse"],["Système","Rectangle englobant"],["Association","Ligne simple"]]},
    {q:"Associez le champ à son contenu",pairs:[["Préconditions","État du système AVANT le CU"],["Scénario nominal","Déroulement normal"],["Scénario alternatif","Variante possible"],["Postconditions","État du système APRÈS le CU"]]}
  ]
},

/* ===== CHAPITRE 4 : Diagramme d'Activités ===== */
chapitre4: {
  title: "Diagramme d'Activités",
  guided: [
    {q:"Quel symbole représente le début d'un diagramme d'activités ?",hint:"Un point de couleur...",a:"Un cercle noir plein (nœud initial)"},
    {q:"Quel symbole représente une décision dans un diagramme d'activités ?",hint:"La même forme qu'en algorithmique",a:"Un losange (diamond)"},
    {q:"Comment appelle-t-on la barre qui sépare un flux en plusieurs flux parallèles ?",hint:"Fork ou ...",a:"Fork (barre de synchronisation / bifurcation)"},
    {q:"Comment appelle-t-on les colonnes qui organisent les activités par responsable ?",hint:"Swim...",a:"Swimlanes (couloirs d'activités)"},
    {q:"Quelle est la différence entre fin de flux et nœud final ?",hint:"L'un termine un flux, l'autre termine TOUS les flux",a:"Fin de flux = termine un seul flux. Nœud final = termine tous les flux de l'activité."}
  ],
  quiz: [
    {q:"Le nœud initial est représenté par :",options:["Un cercle vide","Un cercle noir plein","Un losange","Un rectangle"],answer:1},
    {q:"Le nœud de décision utilise :",options:["Un cercle","Un losange","Un rectangle","Une barre"],answer:1},
    {q:"Les conditions sur les branches de décision sont écrites :",options:["Sans crochets","Entre parenthèses ()","Entre crochets []","Entre accolades {}"],answer:2},
    {q:"Un fork a :",options:["1 entrée, N sorties","N entrées, 1 sortie","1 entrée, 1 sortie","N entrées, N sorties"],answer:0},
    {q:"Un join a :",options:["1 entrée, N sorties","N entrées, 1 sortie","1 entrée, 1 sortie","N entrées, N sorties"],answer:1},
    {q:"On ne franchit un join qu'après :",options:["Qu'une seule activité soit terminée","Que toutes les activités soient terminées","Un timeout","L'intervention de l'utilisateur"],answer:1},
    {q:"Les swimlanes permettent de montrer :",options:["Le temps d'exécution","QUI fait QUOI","Les erreurs possibles","La mémoire utilisée"],answer:1},
    {q:"Les transitions dans un diagramme d'activités sont :",options:["Manuelles (clic utilisateur)","Automatiques (fin d'activité → suite)","Périodiques","Aléatoires"],answer:1},
    {q:"Une action est représentée par :",options:["Un cercle","Un losange","Un rectangle aux coins arrondis","Un triangle"],answer:2},
    {q:"Les conditions de décision doivent être :",options:["Mutuellement exclusives et complètes","Seulement mutuellement exclusives","Seulement complètes","Ni l'un ni l'autre"],answer:0}
  ],
  drag: [
    {q:"Associez le symbole à sa signification",pairs:[["Cercle noir plein","Nœud initial"],["Losange","Décision / Fusion"],["Barre épaisse","Fork / Join"],["Cercle avec point","Nœud final"]]},
    {q:"Associez le concept à sa définition",pairs:[["Fork","Paralléliser les flux"],["Join","Synchroniser les flux"],["Swimlane","Responsable de l'action"],["Transition","Passage automatique"]]},
    {q:"Ordonnez les étapes d'un diagramme d'activité type",pairs:[["1","Nœud initial"],["2","Actions et décisions"],["3","Fork / Join si parallélisme"],["4","Nœud final"]]}
  ]
},

/* ===== CHAPITRE 5 : Diagramme de Séquence ===== */
chapitre5: {
  title: "Diagramme de Séquence",
  guided: [
    {q:"Comment s'appelle la ligne verticale en pointillé sous chaque objet ?",hint:"Ligne de ...",a:"Ligne de vie (lifeline)"},
    {q:"Quel type de flèche représente un message synchrone ?",hint:"Pleine ou ouverte ?",a:"Une flèche pleine (pointe remplie)"},
    {q:"Quel type de flèche représente un message de retour ?",hint:"Le style de la ligne...",a:"Une flèche en pointillé (ligne pointillée)"},
    {q:"Quel fragment combiné modélise un if/else ?",hint:"Il commence par les lettres 'al'",a:"alt (alternative)"},
    {q:"Quelle est la syntaxe d'un message en UML ?",hint:"nom(params) : retour",a:"nomMessage(paramètres) : typeRetour"}
  ],
  quiz: [
    {q:"Le temps dans un diagramme de séquence s'écoule :",options:["De gauche à droite","De droite à gauche","De haut en bas","De bas en haut"],answer:2},
    {q:"Un message synchrone signifie que l'émetteur :",options:["Continue sans attendre","Attend la réponse avant de continuer","S'arrête définitivement","Envoie un signal"],answer:1},
    {q:"Un message asynchrone signifie que l'émetteur :",options:["Attend la réponse","Continue sans attendre","Est détruit","Se bloque"],answer:1},
    {q:"Le rectangle d'activation indique :",options:["La destruction de l'objet","La période où l'objet est actif","Le nom de la classe","Un message de retour"],answer:1},
    {q:"Le fragment « opt » correspond à :",options:["Un if/else","Un if sans else","Une boucle","Un parallélisme"],answer:1},
    {q:"Le fragment « loop » correspond à :",options:["Un if/else","Un if sans else","Une boucle","Un parallélisme"],answer:2},
    {q:"Le fragment « par » correspond à :",options:["Un if/else","Un if sans else","Une boucle","Du parallélisme"],answer:3},
    {q:"La destruction d'un objet est marquée par :",options:["Un cercle","Un triangle","Une croix (×)","Un losange"],answer:2},
    {q:"Si A envoie un message m() à B, la méthode m() doit être dans :",options:["La classe de A","La classe de B","Les deux classes","Aucune classe"],answer:1},
    {q:"Le fragment « ref » sert à :",options:["Refuser un message","Référencer un sous-diagramme","Réinitialiser l'objet","Retourner une valeur"],answer:1}
  ],
  drag: [
    {q:"Associez le type de message à sa flèche",pairs:[["Synchrone","Flèche pleine"],["Asynchrone","Flèche ouverte"],["Retour","Flèche pointillée"],["Création","Flèche vers rectangle"]]},
    {q:"Associez le fragment à son équivalent algorithmique",pairs:[["alt","if / else"],["opt","if (sans else)"],["loop","while / for"],["par","Parallèle (threads)"]]},
    {q:"Associez chaque élément à son rôle",pairs:[["Ligne de vie","Existence de l'objet dans le temps"],["Rectangle d'activation","Période d'exécution"],["Message","Appel de méthode"],["Fragment combiné","Contrôle de flux"]]}
  ]
}

};/* end DB */

/* ---------- MOTEUR ---------- */
function getChapterFromPath() {
    const m = window.location.pathname.match(/chapitre(\d+)/);
    return m ? 'chapitre' + m[1] : null;
}

function renderGuided(exercises, container) {
    container.innerHTML = exercises.map((ex, i) => `
        <div class="guided-exercise">
            <h4><span>📝</span> Exercice ${i + 1}</h4>
            <p>${ex.q}</p>
            <button class="hint-btn" onclick="ExerciseEngine.showGuidedAnswer(this)">💡 Voir l'indice</button>
            <div class="hint-content">${ex.hint}</div>
            <input class="exercise-input" placeholder="Votre réponse..." data-answer="${ex.a}">
            <button class="hint-btn" style="margin-top:0.5rem" onclick="ExerciseEngine.checkGuided(this)">✅ Vérifier</button>
        </div>
    `).join('');
}

function renderQuiz(exercises, container) {
    container.innerHTML = exercises.map((ex, i) => `
        <div class="quiz-exercise" data-answer="${ex.answer}">
            <h4><span>❓</span> Question ${i + 1}</h4>
            <p>${ex.q}</p>
            <div class="quiz-options">
                ${ex.options.map((opt, j) => `<div class="quiz-option" onclick="ExerciseEngine.selectQuiz(this, ${j})">${opt}</div>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderDrag(exercises, container) {
    container.innerHTML = exercises.map((ex, i) => `
        <div class="dragdrop-exercise">
            <h4><span>🔗</span> Glisser-déposer ${i + 1}</h4>
            <p>${ex.q}</p>
            <div class="drag-bank" style="display:flex;flex-wrap:wrap;gap:0.4rem;margin:0.75rem 0;">
                ${shuffle(ex.pairs.map(p => p[1])).map(v => `<div class="drag-item" draggable="true" ondragstart="ExerciseEngine.handleDragStart(event)" ondragend="ExerciseEngine.handleDragEnd(event)">${v}</div>`).join('')}
            </div>
            <div class="drag-targets">
                ${ex.pairs.map(p => `
                    <div style="display:flex;align-items:center;gap:0.5rem;margin:0.35rem 0;">
                        <strong style="min-width:120px;font-size:0.85rem;">${p[0]}</strong>
                        <div class="drop-zone" data-answer="${p[1]}" ondragover="ExerciseEngine.handleDragOver(event)" ondrop="ExerciseEngine.handleDrop(event)" ondragleave="ExerciseEngine.handleDragLeave(event)"></div>
                    </div>
                `).join('')}
            </div>
            <button class="hint-btn" style="margin-top:0.75rem" onclick="ExerciseEngine.checkDrag(this)">✅ Vérifier</button>
        </div>
    `).join('');
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function init() {
    const chapter = getChapterFromPath();
    if (!chapter || !DB[chapter]) return;
    const data = DB[chapter];

    const container = document.getElementById('interactive-exercises');
    if (!container) return;

    container.innerHTML = `
        <h2 style="font-size:1.4rem;font-weight:800;margin-bottom:1rem;">🎯 ${data.title} — Exercices interactifs</h2>
        <div class="exercise-tabs">
            <button class="active" onclick="ExerciseEngine.switchTab('guided', event)">📝 Guidés</button>
            <button onclick="ExerciseEngine.switchTab('quiz', event)">❓ Quiz</button>
            <button onclick="ExerciseEngine.switchTab('drag', event)">🔗 Glisser-déposer</button>
        </div>
        <div id="tab-guided" class="exercise-block active"></div>
        <div id="tab-quiz" class="exercise-block"></div>
        <div id="tab-drag" class="exercise-block"></div>
    `;

    renderGuided(data.guided, document.getElementById('tab-guided'));
    renderQuiz(data.quiz, document.getElementById('tab-quiz'));
    renderDrag(data.drag, document.getElementById('tab-drag'));
}

document.addEventListener('DOMContentLoaded', init);

/* ---------- API PUBLIQUE ---------- */
return {
    switchTab(tab, evt) {
        document.querySelectorAll('.exercise-block').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.exercise-tabs button').forEach(b => b.classList.remove('active'));
        document.getElementById('tab-' + tab)?.classList.add('active');
        if (evt && evt.target) evt.target.classList.add('active');
    },
    showGuidedAnswer(btn) {
        const hint = btn.nextElementSibling;
        hint.classList.toggle('visible');
        btn.textContent = hint.classList.contains('visible') ? '🙈 Masquer' : '💡 Voir l\'indice';
    },
    checkGuided(btn) {
        const input = btn.previousElementSibling;
        const normalize = s => s.trim().toLowerCase().replace(/\s+/g, '');
        const correct = normalize(input.dataset.answer);
        const userVal = normalize(input.value);
        const altAnswers = input.dataset.alt ? input.dataset.alt.split('|').map(normalize) : [];
        const isCorrect = userVal === correct || altAnswers.includes(userVal);
        input.classList.remove('correct', 'wrong');
        input.classList.add(isCorrect ? 'correct' : 'wrong');
        if (typeof GameEngine !== 'undefined') GameEngine.exerciseCompleted(isCorrect);
    },
    selectQuiz(option, index) {
        const parent = option.closest('.quiz-exercise');
        const answer = parseInt(parent.dataset.answer);
        const isCorrect = index === answer;
        parent.querySelectorAll('.quiz-option').forEach((o, i) => {
            o.classList.remove('selected', 'correct', 'wrong');
            if (i === answer) o.classList.add('correct');
            else if (i === index && i !== answer) o.classList.add('wrong');
        });
        if (typeof GameEngine !== 'undefined') GameEngine.exerciseCompleted(isCorrect);
    },
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        e.target.classList.add('placed');
    },
    handleDragEnd(e) {
        e.target.classList.remove('placed');
    },
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('over');
    },
    handleDragLeave(e) {
        e.currentTarget.classList.remove('over');
    },
    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('over');
        const val = e.dataTransfer.getData('text/plain');
        const item = document.createElement('div');
        item.className = 'drag-item';
        item.textContent = val;
        item.draggable = true;
        item.ondragstart = ExerciseEngine.handleDragStart;
        item.ondragend = ExerciseEngine.handleDragEnd;
        e.currentTarget.appendChild(item);
        const bank = e.currentTarget.closest('.dragdrop-exercise').querySelector('.drag-bank');
        bank.querySelectorAll('.drag-item').forEach(d => {
            if (d.textContent === val && !d.parentElement.classList.contains('drop-zone')) d.remove();
        });
    },
    checkDrag(btn) {
        const parent = btn.closest('.dragdrop-exercise');
        parent.querySelectorAll('.drop-zone').forEach(zone => {
            const expected = zone.dataset.answer;
            const items = zone.querySelectorAll('.drag-item');
            const val = items.length ? items[items.length - 1].textContent : '';
            zone.classList.remove('correct', 'wrong');
            zone.classList.add(val === expected ? 'correct' : 'wrong');
        });
    }
};

})();
