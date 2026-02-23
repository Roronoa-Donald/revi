/**
 * exercise-solutions-svg.js
 * Diagrammes graphiques haute qualité pour les corrections d'exercices UML.
 * - Diagrammes de classes : SVG inline avec multiplicités, composition, agrégation, héritage
 * - Cas d'utilisation : SVG inline avec acteurs, ellipses, include/extend/généralisation
 * - Activités : Mermaid flowchart
 * - Séquence : Mermaid sequence
 */

const ExerciseDiagrams = {};

/* ═══════════════════════════════════════════════════════════════════════
   DEFS PARTAGÉES — palette conforme aux chapitres du cours
   ═══════════════════════════════════════════════════════════════════════ */
const SHARED_DEFS = `
  <linearGradient id="cG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#6366f1" stop-opacity="0.15"/>
    <stop offset="100%" stop-color="#6366f1" stop-opacity="0.05"/>
  </linearGradient>
  <linearGradient id="cGreen" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#10b981" stop-opacity="0.15"/>
    <stop offset="100%" stop-color="#10b981" stop-opacity="0.05"/>
  </linearGradient>
  <filter id="sh"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#6366f1" flood-opacity="0.2"/></filter>
`;

/* Helper : dessiner une boîte de classe UML — retourne {svg, height} */
function classBox(x, y, w, name, attrs, methods, opts) {
    opts = opts || {};
    var hdrH = 32;
    var lineH = 18;
    var padBot = 6;
    var attrH = Math.max(attrs.length, 0) * lineH + 10;
    if (!attrs.length) attrH = 8;
    var methH = methods.length ? methods.length * lineH + 10 : 0;
    var totalH = hdrH + attrH + methH + padBot;
    var hdrFill = opts.headerFill || '#6366f1';
    var hdrOp = opts.headerOpacity || '0.25';
    var bodyGrad = opts.bodyGrad || 'url(#cG)';
    var strokeC = opts.stroke || '#818cf8';
    var nameStyle = opts.abstract ? ' font-style="italic"' : '';
    var stereotype = opts.stereotype || '';

    var s = '<g filter="url(#sh)">';
    s += '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+totalH+'" rx="8" fill="'+bodyGrad+'" stroke="'+strokeC+'" stroke-width="2"/>';
    s += '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+hdrH+'" rx="8" fill="'+hdrFill+'" fill-opacity="'+hdrOp+'"/>';
    s += '<rect x="'+x+'" y="'+(y+hdrH-8)+'" width="'+w+'" height="8" fill="'+hdrFill+'" fill-opacity="'+hdrOp+'"/>';
    if (stereotype) {
        s += '<text x="'+(x+w/2)+'" y="'+(y+13)+'" text-anchor="middle" fill="#c4b5fd" font-size="9.5" font-weight="500">'+stereotype+'</text>';
        s += '<text x="'+(x+w/2)+'" y="'+(y+27)+'" text-anchor="middle" fill="#e0e7ff" font-size="13" font-weight="700"'+nameStyle+'>'+name+'</text>';
    } else {
        s += '<text x="'+(x+w/2)+'" y="'+(y+21)+'" text-anchor="middle" fill="#e0e7ff" font-size="14" font-weight="700"'+nameStyle+'>'+name+'</text>';
    }
    s += '<line x1="'+x+'" y1="'+(y+hdrH)+'" x2="'+(x+w)+'" y2="'+(y+hdrH)+'" stroke="'+strokeC+'" stroke-width="1"/>';
    for (var i = 0; i < attrs.length; i++) {
        s += '<text x="'+(x+10)+'" y="'+(y+hdrH+16+i*lineH)+'" fill="#c4b5fd" font-size="11.5">'+attrs[i]+'</text>';
    }
    if (methods.length) {
        var sepY = y + hdrH + attrH;
        s += '<line x1="'+x+'" y1="'+sepY+'" x2="'+(x+w)+'" y2="'+sepY+'" stroke="'+strokeC+'" stroke-width="1"/>';
        for (var j = 0; j < methods.length; j++) {
            s += '<text x="'+(x+10)+'" y="'+(sepY+16+j*lineH)+'" fill="#a5b4fc" font-size="11.5">'+methods[j]+'</text>';
        }
    }
    s += '</g>';
    return { svg: s, height: totalH };
}

/* Helper : multiplicité bien visible — fond + texte gras */
function multLabel(x, y, text, anchor) {
    anchor = anchor || 'start';
    var tw = text.length * 7 + 8;
    var rx = anchor === 'end' ? x - tw : (anchor === 'middle' ? x - tw/2 : x);
    var s = '<rect x="'+rx+'" y="'+(y-11)+'" width="'+tw+'" height="16" rx="4" fill="rgba(99,102,241,0.12)"/>';
    s += '<text x="'+(anchor==="end"?x-3:anchor==="middle"?x:x+4)+'" y="'+(y)+'" text-anchor="'+anchor+'" fill="#6366f1" font-size="11.5" font-weight="700">'+text+'</text>';
    return s;
}

/* Helper : multiplicité côté agrégation (vert) */
function multLabelGreen(x, y, text, anchor) {
    anchor = anchor || 'start';
    var tw = text.length * 7 + 8;
    var rx = anchor === 'end' ? x - tw : (anchor === 'middle' ? x - tw/2 : x);
    var s = '<rect x="'+rx+'" y="'+(y-11)+'" width="'+tw+'" height="16" rx="4" fill="rgba(52,211,153,0.12)"/>';
    s += '<text x="'+(anchor==="end"?x-3:anchor==="middle"?x:x+4)+'" y="'+(y)+'" text-anchor="'+anchor+'" fill="#10b981" font-size="11.5" font-weight="700">'+text+'</text>';
    return s;
}

/* ═══════════════════════════════════════════════════════════════════════
   EXERCICE 7 — Bibliothèque (diagramme de classes)
   Membre 0..1──── emprunt ──── 0..5 Livre
                     │
                 Emprunt (classe-association)
   ═══════════════════════════════════════════════════════════════════════ */
ExerciseDiagrams[7] = { type: 'svg', html: (function(){
    var w = 820, h = 400;
    var svg = '<svg viewBox="0 0 '+w+' '+h+'" style="max-width:'+w+'px;margin:0 auto;display:block;font-family:\'Segoe UI\',sans-serif;" xmlns="http://www.w3.org/2000/svg"><defs>'+SHARED_DEFS+'</defs>';

    svg += '<text x="'+w/2+'" y="22" text-anchor="middle" font-size="15" fill="#6366f1" font-weight="700">Diagramme de classes — Bibliothèque</text>';

    var m = classBox(30, 55, 210, 'Membre', ['- nom : String', '- numCarte : int'], ['+ emprunter()', '+ retourner()']);
    svg += m.svg;

    var l = classBox(560, 55, 220, 'Livre', ['- titre : String', '- ISBN : String', '- auteur : String'], ['+ estDispo() : bool']);
    svg += l.svg;

    var e = classBox(290, 265, 210, 'Emprunt', ['- dateEmprunt : Date', '- dateRetour : Date'], []);
    svg += e.svg;

    // Relation Membre ──── Livre
    var lineY = 100;
    svg += '<line x1="240" y1="'+lineY+'" x2="560" y2="'+lineY+'" stroke="#a78bfa" stroke-width="2.5"/>';
    // Multiplicités sur fond
    svg += multLabel(255, lineY-10, '0..1');
    svg += multLabel(522, lineY-10, '0..5', 'end');
    // Label
    svg += '<text x="400" y="'+(lineY-12)+'" text-anchor="middle" fill="#e0e7ff" font-size="12" font-style="italic">emprunte</text>';

    // Ligne pointillée vers Emprunt
    svg += '<line x1="395" y1="'+lineY+'" x2="395" y2="265" stroke="#a78bfa" stroke-width="1.8" stroke-dasharray="7,4"/>';
    svg += '<rect x="355" y="195" width="120" height="18" rx="4" fill="rgba(167,139,250,0.1)"/>';
    svg += '<text x="415" y="208" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="500">classe-association</text>';

    // Légende
    svg += '<rect x="20" y="'+(h-42)+'" width="'+(w-40)+'" height="32" rx="8" fill="rgba(99,102,241,0.04)"/>';
    svg += '<text x="'+w/2+'" y="'+(h-22)+'" text-anchor="middle" fill="#94a3b8" font-size="11">Un Membre peut emprunter 0 à 5 Livres — Un Livre est emprunté par 0 ou 1 Membre — Emprunt est une classe-association</text>';

    svg += '</svg>';
    return svg;
})()};

/* ═══════════════════════════════════════════════════════════════════════
   EXERCICE 8 — Composition vs Agrégation (4 exemples)
   ═══════════════════════════════════════════════════════════════════════ */
ExerciseDiagrams[8] = { type: 'svg', html: (function(){
    var w = 800, h = 490;
    var svg = '<svg viewBox="0 0 '+w+' '+h+'" style="max-width:'+w+'px;margin:0 auto;display:block;font-family:\'Segoe UI\',sans-serif;" xmlns="http://www.w3.org/2000/svg"><defs>'+SHARED_DEFS+'</defs>';

    svg += '<text x="'+w/2+'" y="25" text-anchor="middle" font-size="15" fill="#6366f1" font-weight="700">Composition ◆ vs Agrégation ◇</text>';

    var pairs = [
        { left: 'Maison', right: 'Pièce', type: 'comp', label: 'COMPOSITION ◆', desc: 'Vie liée — une pièce n\'existe pas sans sa maison', mult: ['1','1..*'] },
        { left: 'Équipe', right: 'Joueur', type: 'aggr', label: 'AGRÉGATION ◇', desc: 'Vie indépendante — un joueur existe sans l\'équipe', mult: ['1','1..*'] },
        { left: 'Commande', right: 'LigneCommande', type: 'comp', label: 'COMPOSITION ◆', desc: 'Vie liée — une ligne disparaît avec la commande', mult: ['1','1..*'] },
        { left: 'Université', right: 'Professeur', type: 'aggr', label: 'AGRÉGATION ◇', desc: 'Vie indépendante — un prof existe sans l\'université', mult: ['1','0..*'] }
    ];

    for (var i = 0; i < pairs.length; i++) {
        var baseY = 50 + i * 108;
        var p = pairs[i];
        var isComp = p.type === 'comp';
        var col = isComp ? '#a78bfa' : '#34d399';
        var fillD = isComp ? col : 'none';
        var bgC = isComp ? 'rgba(167,139,250,0.06)' : 'rgba(52,211,153,0.06)';

        svg += '<rect x="10" y="'+baseY+'" width="'+(w-20)+'" height="98" rx="10" fill="'+bgC+'" stroke="'+col+'" stroke-width="1" stroke-opacity="0.3"/>';
        svg += '<text x="28" y="'+(baseY+22)+'" font-size="14" fill="'+col+'" font-weight="800">'+(i+1)+'.</text>';

        // Left box
        svg += '<g filter="url(#sh)"><rect x="55" y="'+(baseY+16)+'" width="145" height="38" rx="8" fill="url(#cG)" stroke="#818cf8" stroke-width="1.8"/>';
        svg += '<text x="127" y="'+(baseY+40)+'" text-anchor="middle" fill="#e0e7ff" font-size="13" font-weight="700">'+p.left+'</text></g>';

        // Diamond
        var dx = 214, dy = baseY + 35;
        svg += '<polygon points="'+dx+','+dy+' '+(dx+11)+','+(dy-9)+' '+(dx+22)+','+dy+' '+(dx+11)+','+(dy+9)+'" fill="'+fillD+'" stroke="'+col+'" stroke-width="2.2"/>';

        // Line
        svg += '<line x1="'+(dx+22)+'" y1="'+dy+'" x2="380" y2="'+dy+'" stroke="'+col+'" stroke-width="2.2"/>';

        // Multiplicities — bien visibles
        if (isComp) {
            svg += multLabel(242, dy-12, p.mult[0]);
            svg += multLabel(348, dy-12, p.mult[1], 'end');
        } else {
            svg += multLabelGreen(242, dy-12, p.mult[0]);
            svg += multLabelGreen(348, dy-12, p.mult[1], 'end');
        }

        // Right box
        svg += '<g filter="url(#sh)"><rect x="385" y="'+(baseY+16)+'" width="165" height="38" rx="8" fill="url(#cG)" stroke="#818cf8" stroke-width="1.8"/>';
        svg += '<text x="467" y="'+(baseY+40)+'" text-anchor="middle" fill="#e0e7ff" font-size="13" font-weight="700">'+p.right+'</text></g>';

        // Label + description
        svg += '<text x="575" y="'+(baseY+34)+'" fill="'+col+'" font-size="12.5" font-weight="700">'+p.label+'</text>';
        svg += '<text x="575" y="'+(baseY+54)+'" fill="#94a3b8" font-size="10.5">'+p.desc+'</text>';
    }

    // Légende
    svg += '<rect x="20" y="'+(h-38)+'" width="'+(w-40)+'" height="28" rx="6" fill="rgba(99,102,241,0.05)"/>';
    svg += '<text x="'+w/2+'" y="'+(h-19)+'" text-anchor="middle" fill="#94a3b8" font-size="11.5">◆ Losange NOIR (rempli) = Composition  •  ◇ Losange BLANC (vide) = Agrégation</text>';

    svg += '</svg>';
    return svg;
})()};

/* ═══════════════════════════════════════════════════════════════════════
   EXERCICE 9 — Pizzeria
   Client ──0..*── Commande ──1..*── Pizza ◇──1..*── Ingrédient
   ═══════════════════════════════════════════════════════════════════════ */
ExerciseDiagrams[9] = { type: 'svg', html: (function(){
    var w = 920, h = 380;
    var svg = '<svg viewBox="0 0 '+w+' '+h+'" style="max-width:'+w+'px;margin:0 auto;display:block;font-family:\'Segoe UI\',sans-serif;" xmlns="http://www.w3.org/2000/svg"><defs>'+SHARED_DEFS+'</defs>';

    svg += '<text x="'+w/2+'" y="22" text-anchor="middle" font-size="15" fill="#6366f1" font-weight="700">Diagramme de classes — Pizzeria</text>';

    var c1 = classBox(10, 55, 180, 'Client', ['- nom : String', '- tel : String'], ['+ commander()']);
    svg += c1.svg;

    var c2 = classBox(250, 55, 190, 'Commande', ['- numero : int', '- date : Date', '- total : double'], ['+ calculerTotal()']);
    svg += c2.svg;

    var c3 = classBox(510, 55, 175, 'Pizza', ['- nom : String', '- taille : String', '- prix : double'], ['+ getPrix()']);
    svg += c3.svg;

    var c4 = classBox(745, 55, 165, 'Ingrédient', ['- nom : String', '- cout : double'], []);
    svg += c4.svg;

    // Client → Commande
    var ly = 105;
    svg += '<line x1="190" y1="'+ly+'" x2="250" y2="'+ly+'" stroke="#a78bfa" stroke-width="2.2"/>';
    svg += multLabel(195, ly-12, '1');
    svg += multLabel(223, ly-12, '0..*', 'end');
    svg += '<text x="220" y="'+(ly+16)+'" text-anchor="middle" fill="#c4b5fd" font-size="10" font-style="italic">passe</text>';

    // Commande → Pizza
    svg += '<line x1="440" y1="'+ly+'" x2="510" y2="'+ly+'" stroke="#a78bfa" stroke-width="2.2"/>';
    svg += multLabel(446, ly-12, '1');
    svg += multLabel(484, ly-12, '1..*', 'end');
    svg += '<text x="475" y="'+(ly+16)+'" text-anchor="middle" fill="#c4b5fd" font-size="10" font-style="italic">contient</text>';

    // Pizza ◇── Ingrédient (agrégation = losange vide)
    var dx = 685, dy = ly;
    svg += '<polygon points="'+dx+','+dy+' '+(dx+11)+','+(dy-9)+' '+(dx+22)+','+dy+' '+(dx+11)+','+(dy+9)+'" fill="none" stroke="#34d399" stroke-width="2.2"/>';
    svg += '<line x1="'+(dx+22)+'" y1="'+dy+'" x2="745" y2="'+dy+'" stroke="#34d399" stroke-width="2.2"/>';
    svg += multLabelGreen(710, dy-14, '1', 'end');
    svg += multLabelGreen(748, dy-14, '1..*');
    svg += '<text x="725" y="'+(dy+18)+'" text-anchor="middle" fill="#34d399" font-size="10" font-style="italic">composée de</text>';

    // Légende
    svg += '<rect x="20" y="'+(h-48)+'" width="'+(w-40)+'" height="38" rx="8" fill="rgba(99,102,241,0.04)"/>';
    svg += '<line x1="40" y1="'+(h-29)+'" x2="75" y2="'+(h-29)+'" stroke="#a78bfa" stroke-width="2.5"/>';
    svg += '<text x="82" y="'+(h-25)+'" fill="#94a3b8" font-size="10.5">Association simple</text>';
    svg += '<polygon points="250,'+(h-29)+' 261,'+(h-38)+' 272,'+(h-29)+' 261,'+(h-20)+'" fill="none" stroke="#34d399" stroke-width="2"/>';
    svg += '<line x1="272" y1="'+(h-29)+'" x2="300" y2="'+(h-29)+'" stroke="#34d399" stroke-width="2"/>';
    svg += '<text x="308" y="'+(h-25)+'" fill="#94a3b8" font-size="10.5">Agrégation (un ingrédient peut servir dans plusieurs pizzas)</text>';

    svg += '</svg>';
    return svg;
})()};

/* ═══════════════════════════════════════════════════════════════════════
   EXERCICE 10 — Formes géométriques (héritage + interface)
   ═══════════════════════════════════════════════════════════════════════ */
ExerciseDiagrams[10] = { type: 'svg', html: (function(){
    var w = 820, h = 460;
    var svg = '<svg viewBox="0 0 '+w+' '+h+'" style="max-width:'+w+'px;margin:0 auto;display:block;font-family:\'Segoe UI\',sans-serif;" xmlns="http://www.w3.org/2000/svg"><defs>'+SHARED_DEFS+`
    <linearGradient id="ifGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.04"/>
    </linearGradient>
    </defs>`;

    svg += '<text x="'+w/2+'" y="22" text-anchor="middle" font-size="15" fill="#6366f1" font-weight="700">Héritage et Interface — Formes géométriques</text>';

    // Interface Dessinable
    var ifX = 50, ifY = 55, ifW = 180;
    svg += '<g filter="url(#sh)">';
    svg += '<rect x="'+ifX+'" y="'+ifY+'" width="'+ifW+'" height="70" rx="8" fill="url(#ifGrad)" stroke="#f59e0b" stroke-width="2"/>';
    svg += '<rect x="'+ifX+'" y="'+ifY+'" width="'+ifW+'" height="34" rx="8" fill="#f59e0b" fill-opacity="0.2"/>';
    svg += '<rect x="'+ifX+'" y="'+(ifY+26)+'" width="'+ifW+'" height="8" fill="#f59e0b" fill-opacity="0.2"/>';
    svg += '<text x="'+(ifX+ifW/2)+'" y="'+(ifY+14)+'" text-anchor="middle" fill="#fbbf24" font-size="9.5" font-weight="500">«interface»</text>';
    svg += '<text x="'+(ifX+ifW/2)+'" y="'+(ifY+29)+'" text-anchor="middle" fill="#fef3c7" font-size="13" font-weight="700">Dessinable</text>';
    svg += '<line x1="'+ifX+'" y1="'+(ifY+34)+'" x2="'+(ifX+ifW)+'" y2="'+(ifY+34)+'" stroke="#f59e0b" stroke-width="1"/>';
    svg += '<text x="'+(ifX+10)+'" y="'+(ifY+54)+'" fill="#fcd34d" font-size="11.5">+ dessiner()</text>';
    svg += '</g>';

    // Classe abstraite Forme
    var fX = 320, fY = 48;
    var fb = classBox(fX, fY, 195, 'Forme', ['# couleur : String'], ['+ aire() : double'], { abstract: true, stereotype: '«abstract»' });
    svg += fb.svg;

    // Réalisation Forme ←···· Dessinable (flèche pointillée triangle vide)
    svg += '<line x1="'+(ifX+ifW)+'" y1="'+(ifY+35)+'" x2="'+(fX-14)+'" y2="'+(fY+42)+'" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8,5"/>';
    svg += '<polygon points="'+fX+','+(fY+42)+' '+(fX-14)+','+(fY+34)+' '+(fX-14)+','+(fY+50)+'" fill="none" stroke="#f59e0b" stroke-width="2"/>';
    svg += '<rect x="246" y="'+(fY+18)+'" width="65" height="16" rx="4" fill="rgba(245,158,11,0.1)"/>';
    svg += '<text x="278" y="'+(fY+30)+'" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="500">réalise</text>';

    // Sous-classes
    var subY = 265;
    var cercle = classBox(30, subY, 200, 'Cercle', ['- rayon : double'], ['+ aire() : double']);
    svg += cercle.svg;
    var rect = classBox(295, subY, 220, 'Rectangle', ['- largeur : double', '- hauteur : double'], ['+ aire() : double']);
    svg += rect.svg;
    var tri = classBox(580, subY, 210, 'Triangle', ['- base : double', '- hauteur : double'], ['+ aire() : double']);
    svg += tri.svg;

    // Héritage — ligne commune
    var parentCx = fX + 97;
    var parentBot = fY + fb.height;
    svg += '<line x1="'+parentCx+'" y1="'+(parentBot)+'" x2="'+parentCx+'" y2="220" stroke="#a78bfa" stroke-width="2.2"/>';
    // Triangle d'héritage (vide)
    svg += '<polygon points="'+(parentCx-9)+','+(parentBot)+' '+parentCx+','+(parentBot-1)+' '+(parentCx+9)+','+(parentBot)+'" fill="none" stroke="#a78bfa" stroke-width="2.2"/>';
    // Barre horizontale
    svg += '<line x1="130" y1="220" x2="685" y2="220" stroke="#a78bfa" stroke-width="2.2"/>';
    // Verticales
    svg += '<line x1="130" y1="220" x2="130" y2="'+subY+'" stroke="#a78bfa" stroke-width="2.2"/>';
    svg += '<line x1="405" y1="220" x2="405" y2="'+subY+'" stroke="#a78bfa" stroke-width="2.2"/>';
    svg += '<line x1="685" y1="220" x2="685" y2="'+subY+'" stroke="#a78bfa" stroke-width="2.2"/>';

    svg += '<rect x="'+(parentCx-25)+'" y="'+(parentBot+4)+'" width="58" height="16" rx="4" fill="rgba(167,139,250,0.1)"/>';
    svg += '<text x="'+parentCx+'" y="'+(parentBot+16)+'" text-anchor="middle" fill="#a78bfa" font-size="10" font-weight="500">héritage</text>';

    // Légende
    svg += '<rect x="20" y="'+(h-48)+'" width="'+(w-40)+'" height="38" rx="8" fill="rgba(99,102,241,0.04)"/>';
    svg += '<line x1="40" y1="'+(h-29)+'" x2="80" y2="'+(h-29)+'" stroke="#f59e0b" stroke-width="2" stroke-dasharray="7,4"/>';
    svg += '<polygon points="80,'+(h-29)+' 70,'+(h-36)+' 70,'+(h-22)+'" fill="none" stroke="#f59e0b" stroke-width="2"/>';
    svg += '<text x="88" y="'+(h-25)+'" fill="#94a3b8" font-size="10.5">Réalisation (pointillé, △ vide)</text>';
    svg += '<line x1="320" y1="'+(h-29)+'" x2="360" y2="'+(h-29)+'" stroke="#a78bfa" stroke-width="2"/>';
    svg += '<polygon points="360,'+(h-29)+' 350,'+(h-36)+' 350,'+(h-22)+'" fill="none" stroke="#a78bfa" stroke-width="2"/>';
    svg += '<text x="368" y="'+(h-25)+'" fill="#94a3b8" font-size="10.5">Héritage (plein, △ vide)</text>';
    svg += '<text x="600" y="'+(h-25)+'" fill="#94a3b8" font-size="10.5" font-style="italic">Nom en italique = abstrait</text>';

    svg += '</svg>';
    return svg;
})()};

/* ═══════════════════════════════════════════════════════════════════════
   EXERCICE 11 — Réservation de billets de train (cas d'utilisation)
   ═══════════════════════════════════════════════════════════════════════ */
ExerciseDiagrams[11] = { type: 'svg', html: (function(){
    var w = 840, h = 520;
    var svg = '<svg viewBox="0 0 '+w+' '+h+'" style="max-width:'+w+'px;margin:0 auto;display:block;font-family:\'Segoe UI\',sans-serif;" xmlns="http://www.w3.org/2000/svg"><defs>'+SHARED_DEFS+`
    <linearGradient id="ucG11" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ede9fe"/><stop offset="100%" stop-color="#ddd6fe"/></linearGradient>
    <filter id="ucSh11"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.10"/></filter>
    <marker id="ucAr11" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="10" markerHeight="10" orient="auto"><path d="M0,1 L12,6 L0,11" fill="none" stroke="#6366f1" stroke-width="1.5"/></marker>
    </defs>`;

    svg += '<rect x="195" y="20" width="430" height="480" rx="12" fill="rgba(99,102,241,0.03)" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6,3"/>';
    svg += '<text x="410" y="48" text-anchor="middle" font-size="14" fill="#6366f1" font-weight="700">Système de Réservation — Billets de Train</text>';

    function actor11(cx, cy, name, color) {
        color = color || '#475569';
        var s = '<circle cx="'+cx+'" cy="'+cy+'" r="12" fill="none" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+cx+'" y1="'+(cy+12)+'" x2="'+cx+'" y2="'+(cy+40)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+(cx-16)+'" y1="'+(cy+24)+'" x2="'+(cx+16)+'" y2="'+(cy+24)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+cx+'" y1="'+(cy+40)+'" x2="'+(cx-13)+'" y2="'+(cy+58)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+cx+'" y1="'+(cy+40)+'" x2="'+(cx+13)+'" y2="'+(cy+58)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<text x="'+cx+'" y="'+(cy+74)+'" text-anchor="middle" font-size="11.5" fill="#1e293b" font-weight="600">'+name+'</text>';
        return s;
    }
    function uc11(cx, cy, label, rx) {
        rx = rx || 108;
        var s = '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="25" fill="url(#ucG11)" stroke="#6366f1" stroke-width="1.8" filter="url(#ucSh11)"/>';
        s += '<text x="'+cx+'" y="'+(cy+5)+'" text-anchor="middle" font-size="12" fill="#1e293b" font-weight="600">'+label+'</text>';
        return s;
    }

    svg += actor11(72, 110, 'Voyageur', '#e91e8c');
    svg += actor11(72, 340, 'Guichetier','#475569');
    svg += '<rect x="705" y="120" width="105" height="42" rx="6" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>';
    svg += '<text x="757" y="136" text-anchor="middle" font-size="9" fill="#64748b">«système»</text>';
    svg += '<text x="757" y="152" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="600">Paiement</text>';
    svg += actor11(757, 360, 'Admin','#475569');

    svg += uc11(370, 90, 'Rechercher un trajet');
    svg += uc11(370, 155, 'Réserver un billet');
    svg += uc11(370, 220, 'Payer le billet', 95);
    svg += uc11(370, 285, 'Annuler une réservation', 118);
    svg += uc11(370, 350, 'Consulter réservations', 112);
    svg += uc11(370, 415, 'Imprimer un billet', 100);
    svg += uc11(370, 470, 'Gérer les trains', 95);

    // Voyageur associations
    svg += '<line x1="100" y1="140" x2="262" y2="90" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="100" y1="145" x2="262" y2="155" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="100" y1="160" x2="252" y2="285" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="100" y1="165" x2="258" y2="350" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="100" y1="170" x2="270" y2="415" stroke="#94a3b8" stroke-width="1.5"/>';

    // Guichetier
    svg += '<line x1="100" y1="374" x2="252" y2="285" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="100" y1="374" x2="258" y2="350" stroke="#94a3b8" stroke-width="1.5"/>';

    // include: Réserver → Payer
    svg += '<line x1="390" y1="178" x2="382" y2="197" stroke="#6366f1" stroke-width="1.8" stroke-dasharray="7,4" marker-end="url(#ucAr11)"/>';
    svg += '<text x="420" y="192" fill="#6366f1" font-size="10" font-weight="700" font-style="italic">«include»</text>';

    // Payer → Système paiement
    svg += '<line x1="465" y1="220" x2="703" y2="150" stroke="#94a3b8" stroke-width="1.5"/>';

    // Admin → Gérer trains
    svg += '<line x1="730" y1="395" x2="465" y2="470" stroke="#94a3b8" stroke-width="1.5"/>';

    svg += '</svg>';
    return svg;
})()};

/* ═══════════════════════════════════════════════════════════════════════
   EXERCICE 12 — Include vs Extend (cas d'utilisation bancaire)
   ═══════════════════════════════════════════════════════════════════════ */
ExerciseDiagrams[12] = { type: 'svg', html: (function(){
    var w = 780, h = 420;
    var svg = '<svg viewBox="0 0 '+w+' '+h+'" style="max-width:'+w+'px;margin:0 auto;display:block;font-family:\'Segoe UI\',sans-serif;" xmlns="http://www.w3.org/2000/svg"><defs>'+SHARED_DEFS+`
    <linearGradient id="ucG12" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ede9fe"/><stop offset="100%" stop-color="#ddd6fe"/></linearGradient>
    <filter id="ucSh12"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.10"/></filter>
    <marker id="incA12" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="10" markerHeight="10" orient="auto"><path d="M0,1 L12,6 L0,11" fill="none" stroke="#6366f1" stroke-width="1.5"/></marker>
    <marker id="extA12" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="10" markerHeight="10" orient="auto"><path d="M0,1 L12,6 L0,11" fill="none" stroke="#e91e8c" stroke-width="1.5"/></marker>
    </defs>`;

    svg += '<text x="'+w/2+'" y="22" text-anchor="middle" font-size="15" fill="#6366f1" font-weight="700">Include vs Extend — Système bancaire en ligne</text>';

    var rows = [
        { num:'1', left:'Effectuer un virement', right:"S'authentifier", rel:'include', color:'#6366f1', desc:'OBLIGATOIRE : toujours s\'authentifier avant un virement' },
        { num:'2', left:'Imprimer un relevé', right:'Consulter le solde', rel:'extend', color:'#e91e8c', desc:'OPTIONNEL : on peut consulter SANS imprimer • Flèche : de l\'extension → cas de base' },
        { num:'3', left:"Retirer de l'argent", right:'Vérifier le solde', rel:'include', color:'#6366f1', desc:'OBLIGATOIRE : toujours vérifier le solde avant de retirer' }
    ];

    for (var i = 0; i < rows.length; i++) {
        var r = rows[i];
        var by = 50 + i * 120;
        var isInc = r.rel === 'include';
        var mark = isInc ? 'url(#incA12)' : 'url(#extA12)';
        var bgFill = isInc ? 'rgba(99,102,241,0.04)' : 'rgba(233,30,140,0.04)';

        svg += '<rect x="15" y="'+by+'" width="'+(w-30)+'" height="108" rx="10" fill="'+bgFill+'" stroke="'+r.color+'" stroke-width="1" stroke-opacity="0.25"/>';
        svg += '<text x="32" y="'+(by+24)+'" font-size="14" fill="'+r.color+'" font-weight="800">'+r.num+'.</text>';

        svg += '<ellipse cx="190" cy="'+(by+48)+'" rx="125" ry="28" fill="url(#ucG12)" stroke="'+r.color+'" stroke-width="2" filter="url(#ucSh12)"/>';
        svg += '<text x="190" y="'+(by+53)+'" text-anchor="middle" font-size="12" fill="#1e293b" font-weight="600">'+r.left+'</text>';

        svg += '<line x1="315" y1="'+(by+48)+'" x2="450" y2="'+(by+48)+'" stroke="'+r.color+'" stroke-width="2" stroke-dasharray="8,4" marker-end="'+mark+'"/>';
        // Label avec fond
        var lbl = '«'+r.rel+'»';
        svg += '<rect x="350" y="'+(by+30)+'" width="55" height="16" rx="4" fill="'+r.color+'" fill-opacity="0.12"/>';
        svg += '<text x="377" y="'+(by+42)+'" text-anchor="middle" font-size="11" fill="'+r.color+'" font-weight="700" font-style="italic">'+lbl+'</text>';

        svg += '<ellipse cx="575" cy="'+(by+48)+'" rx="115" ry="28" fill="url(#ucG12)" stroke="'+r.color+'" stroke-width="2" filter="url(#ucSh12)"/>';
        svg += '<text x="575" y="'+(by+53)+'" text-anchor="middle" font-size="12" fill="#1e293b" font-weight="600">'+r.right+'</text>';

        svg += '<text x="190" y="'+(by+94)+'" fill="#94a3b8" font-size="10.5">'+r.desc+'</text>';
    }

    svg += '</svg>';
    return svg;
})()};

/* ═══════════════════════════════════════════════════════════════════════
   EXERCICE 14 — Diagramme CU complet — E-commerce
   ═══════════════════════════════════════════════════════════════════════ */
ExerciseDiagrams[14] = { type: 'svg', html: (function(){
    var w = 840, h = 570;
    var svg = '<svg viewBox="0 0 '+w+' '+h+'" style="max-width:'+w+'px;margin:0 auto;display:block;font-family:\'Segoe UI\',sans-serif;" xmlns="http://www.w3.org/2000/svg"><defs>'+SHARED_DEFS+`
    <linearGradient id="ucGE2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ede9fe"/><stop offset="100%" stop-color="#ddd6fe"/></linearGradient>
    <filter id="ucShE2"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.10"/></filter>
    <marker id="incAE2" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="10" markerHeight="10" orient="auto"><path d="M0,1 L12,6 L0,11" fill="none" stroke="#6366f1" stroke-width="1.5"/></marker>
    <marker id="extAE2" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="10" markerHeight="10" orient="auto"><path d="M0,1 L12,6 L0,11" fill="none" stroke="#e91e8c" stroke-width="1.5"/></marker>
    <marker id="genAE2" viewBox="0 0 14 14" refX="14" refY="7" markerWidth="12" markerHeight="12" orient="auto"><path d="M0,0 L14,7 L0,14 Z" fill="#fff" stroke="#475569" stroke-width="1.5"/></marker>
    </defs>`;

    svg += '<rect x="200" y="20" width="410" height="530" rx="12" fill="rgba(99,102,241,0.03)" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6,3"/>';
    svg += '<text x="405" y="48" text-anchor="middle" font-size="14" fill="#6366f1" font-weight="700">Système E-Commerce</text>';

    function a14(cx, cy, name, color) {
        color = color || '#475569';
        var s = '<circle cx="'+cx+'" cy="'+cy+'" r="12" fill="none" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+cx+'" y1="'+(cy+12)+'" x2="'+cx+'" y2="'+(cy+38)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+(cx-16)+'" y1="'+(cy+23)+'" x2="'+(cx+16)+'" y2="'+(cy+23)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+cx+'" y1="'+(cy+38)+'" x2="'+(cx-12)+'" y2="'+(cy+56)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+cx+'" y1="'+(cy+38)+'" x2="'+(cx+12)+'" y2="'+(cy+56)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<text x="'+cx+'" y="'+(cy+72)+'" text-anchor="middle" font-size="11.5" fill="#1e293b" font-weight="600">'+name+'</text>';
        return s;
    }
    function u14(cx, cy, label, rx) {
        rx = rx || 108;
        var s = '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="26" fill="url(#ucGE2)" stroke="#6366f1" stroke-width="1.8" filter="url(#ucShE2)"/>';
        s += '<text x="'+cx+'" y="'+(cy+5)+'" text-anchor="middle" font-size="12" fill="#1e293b" font-weight="600">'+label+'</text>';
        return s;
    }

    svg += a14(68, 110, 'Visiteur');
    svg += a14(68, 320, 'Client', '#e91e8c');
    svg += '<rect x="708" y="190" width="105" height="42" rx="6" fill="#f1f5f9" stroke="#475569" stroke-width="1.5"/>';
    svg += '<text x="760" y="206" text-anchor="middle" font-size="9" fill="#64748b">«système»</text>';
    svg += '<text x="760" y="222" text-anchor="middle" font-size="11" fill="#1e293b" font-weight="600">Paiement</text>';
    svg += a14(760, 448, 'Admin');

    // Généralisation Client → Visiteur
    svg += '<line x1="68" y1="307" x2="68" y2="198" stroke="#475569" stroke-width="1.8" marker-end="url(#genAE2)"/>';
    svg += '<rect x="76" y="245" width="42" height="16" rx="4" fill="rgba(71,85,105,0.08)"/>';
    svg += '<text x="97" y="257" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">hérite</text>';

    svg += u14(380, 90, "S'inscrire", 90);
    svg += u14(380, 160, 'Rechercher produit', 110);
    svg += u14(380, 235, 'Se connecter', 90);
    svg += u14(380, 315, 'Ajouter au panier', 112);
    svg += u14(380, 395, 'Passer commande', 110);
    svg += u14(550, 210, 'Payer', 65);
    svg += u14(380, 485, 'Gérer catalogue', 100);
    svg += u14(250, 475, 'Appliquer code promo', 114);

    // Visiteur assocs
    svg += '<line x1="98" y1="140" x2="290" y2="90" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="98" y1="148" x2="270" y2="160" stroke="#94a3b8" stroke-width="1.5"/>';

    // Client assocs
    svg += '<line x1="98" y1="340" x2="290" y2="235" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="98" y1="348" x2="268" y2="315" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="98" y1="358" x2="270" y2="395" stroke="#94a3b8" stroke-width="1.5"/>';

    // include Passer commande → Payer
    svg += '<line x1="470" y1="380" x2="510" y2="234" stroke="#6366f1" stroke-width="1.8" stroke-dasharray="7,4" marker-end="url(#incAE2)"/>';
    svg += '<rect x="490" y="305" width="60" height="16" rx="4" fill="rgba(99,102,241,0.12)"/>';
    svg += '<text x="520" y="317" text-anchor="middle" fill="#6366f1" font-size="10" font-weight="700" font-style="italic">«include»</text>';

    // Payer → Système paiement
    svg += '<line x1="615" y1="210" x2="706" y2="210" stroke="#94a3b8" stroke-width="1.5"/>';

    // Admin
    svg += '<line x1="735" y1="476" x2="480" y2="485" stroke="#94a3b8" stroke-width="1.5"/>';

    // extend Code promo → Passer commande
    svg += '<path d="M295,458 Q340,425 338,420" fill="none" stroke="#e91e8c" stroke-width="1.5" stroke-dasharray="7,4" marker-end="url(#extAE2)"/>';
    svg += '<rect x="210" y="438" width="55" height="16" rx="4" fill="rgba(233,30,140,0.12)"/>';
    svg += '<text x="237" y="450" text-anchor="middle" fill="#e91e8c" font-size="10" font-weight="700" font-style="italic">«extend»</text>';

    svg += '</svg>';
    return svg;
})()};

/* ═══════════════════════════════════════════════════════════════════════
   EXERCICE 15 — Réservation de salles
   ═══════════════════════════════════════════════════════════════════════ */
ExerciseDiagrams[15] = { type: 'svg', html: (function(){
    var w = 820, h = 500;
    var svg = '<svg viewBox="0 0 '+w+' '+h+'" style="max-width:'+w+'px;margin:0 auto;display:block;font-family:\'Segoe UI\',sans-serif;" xmlns="http://www.w3.org/2000/svg"><defs>'+SHARED_DEFS+`
    <linearGradient id="ucGS2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ede9fe"/><stop offset="100%" stop-color="#ddd6fe"/></linearGradient>
    <filter id="ucShS2"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.10"/></filter>
    <marker id="incAS2" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="10" markerHeight="10" orient="auto"><path d="M0,1 L12,6 L0,11" fill="none" stroke="#6366f1" stroke-width="1.5"/></marker>
    <marker id="extAS2" viewBox="0 0 12 12" refX="12" refY="6" markerWidth="10" markerHeight="10" orient="auto"><path d="M0,1 L12,6 L0,11" fill="none" stroke="#e91e8c" stroke-width="1.5"/></marker>
    <marker id="genAS2" viewBox="0 0 14 14" refX="14" refY="7" markerWidth="12" markerHeight="12" orient="auto"><path d="M0,0 L14,7 L0,14 Z" fill="#fff" stroke="#475569" stroke-width="1.5"/></marker>
    </defs>`;

    svg += '<rect x="205" y="20" width="390" height="460" rx="12" fill="rgba(99,102,241,0.03)" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6,3"/>';
    svg += '<text x="400" y="48" text-anchor="middle" font-size="14" fill="#6366f1" font-weight="700">Système de Réservation de Salles</text>';

    function a15(cx, cy, name, color) {
        color = color || '#475569';
        var s = '<circle cx="'+cx+'" cy="'+cy+'" r="12" fill="none" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+cx+'" y1="'+(cy+12)+'" x2="'+cx+'" y2="'+(cy+38)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+(cx-16)+'" y1="'+(cy+23)+'" x2="'+(cx+16)+'" y2="'+(cy+23)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+cx+'" y1="'+(cy+38)+'" x2="'+(cx-12)+'" y2="'+(cy+56)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<line x1="'+cx+'" y1="'+(cy+38)+'" x2="'+(cx+12)+'" y2="'+(cy+56)+'" stroke="'+color+'" stroke-width="2"/>';
        s += '<text x="'+cx+'" y="'+(cy+72)+'" text-anchor="middle" font-size="11.5" fill="#1e293b" font-weight="600">'+name+'</text>';
        return s;
    }
    function u15(cx, cy, label, rx) {
        rx = rx || 110;
        var s = '<ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="25" fill="url(#ucGS2)" stroke="#6366f1" stroke-width="1.8" filter="url(#ucShS2)"/>';
        s += '<text x="'+cx+'" y="'+(cy+5)+'" text-anchor="middle" font-size="12" fill="#1e293b" font-weight="600">'+label+'</text>';
        return s;
    }

    svg += a15(68, 115, 'Enseignant');
    svg += a15(68, 325, 'Secrétariat', '#e91e8c');
    svg += a15(748, 290, 'Admin');

    // Généralisation Secrétariat → Enseignant
    svg += '<line x1="68" y1="312" x2="68" y2="203" stroke="#475569" stroke-width="1.8" marker-end="url(#genAS2)"/>';
    svg += '<rect x="76" y="250" width="42" height="16" rx="4" fill="rgba(71,85,105,0.08)"/>';
    svg += '<text x="97" y="262" text-anchor="middle" fill="#64748b" font-size="10" font-style="italic">hérite</text>';

    svg += u15(375, 95, 'Réserver une salle');
    svg += u15(375, 165, 'Annuler réservation');
    svg += u15(375, 235, 'Consulter réservations', 118);
    svg += u15(460, 325, 'Gérer les salles', 98);
    svg += u15(460, 395, 'Consulter statistiques', 112);
    svg += u15(580, 80, 'Vérifier disponibilité', 108);
    svg += u15(290, 440, 'Envoyer notification', 108);

    // Enseignant assocs
    svg += '<line x1="98" y1="140" x2="265" y2="95" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="98" y1="150" x2="265" y2="165" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="98" y1="160" x2="257" y2="235" stroke="#94a3b8" stroke-width="1.5"/>';

    // Include
    svg += '<line x1="465" y1="82" x2="474" y2="80" stroke="#6366f1" stroke-width="1.8" stroke-dasharray="7,4" marker-end="url(#incAS2)"/>';
    svg += '<rect x="470" y="62" width="60" height="16" rx="4" fill="rgba(99,102,241,0.12)"/>';
    svg += '<text x="500" y="74" text-anchor="middle" fill="#6366f1" font-size="10" font-weight="700" font-style="italic">«include»</text>';

    // Admin
    svg += '<line x1="725" y1="318" x2="558" y2="325" stroke="#94a3b8" stroke-width="1.5"/>';
    svg += '<line x1="725" y1="330" x2="572" y2="395" stroke="#94a3b8" stroke-width="1.5"/>';

    // Extend
    svg += '<path d="M320,418 Q340,300 342,120" fill="none" stroke="#e91e8c" stroke-width="1.5" stroke-dasharray="7,4" marker-end="url(#extAS2)"/>';
    svg += '<rect x="232" y="418" width="55" height="16" rx="4" fill="rgba(233,30,140,0.12)"/>';
    svg += '<text x="259" y="430" text-anchor="middle" fill="#e91e8c" font-size="10" font-weight="700" font-style="italic">«extend»</text>';

    svg += '</svg>';
    return svg;
})()};

/* ═══════════════════════════════════════════════════════════════════════
   MODULE 4 : DIAGRAMMES D'ACTIVITÉS (Mermaid flowchart)
   ═══════════════════════════════════════════════════════════════════════ */

ExerciseDiagrams[16] = {
    type: 'mermaid',
    code: `flowchart TD
    A(("● Début")) --> B["Choisir un produit"]
    B --> C["Ajouter au panier"]
    C --> D["Passer à la caisse"]
    D --> E["Payer"]
    E --> F["Recevoir confirmation"]
    F --> G(("⊕ Fin"))
    style A fill:#1e293b,stroke:#1e293b,color:#fff
    style G fill:#1e293b,stroke:#1e293b,color:#fff`
};

ExerciseDiagrams[17] = {
    type: 'mermaid',
    code: `flowchart TD
    A(("● Début")) --> B["Saisir login / mot de passe"]
    B --> C["Vérifier identifiants"]
    C --> D{"Identifiants corrects ?"}
    D -->|"✅ Oui"| E["Accès accordé"]
    E --> Z(("⊕ Fin"))
    D -->|"❌ Non"| F{"Essais < 3 ?"}
    F -->|"Oui"| B
    F -->|"Non, = 3"| G["🔒 Bloquer le compte"]
    G --> Z
    style A fill:#1e293b,stroke:#1e293b,color:#fff
    style Z fill:#1e293b,stroke:#1e293b,color:#fff
    style D fill:#fef3c7,stroke:#f59e0b,color:#92400e
    style F fill:#fef3c7,stroke:#f59e0b,color:#92400e`
};

ExerciseDiagrams[18] = {
    type: 'mermaid',
    code: `flowchart TD
    A(("● Début")) --> B["Valider commande"]
    B --> FK["━━━━ FORK ━━━━"]
    FK --> C["📦 Préparer le colis"]
    FK --> D["📄 Envoyer la facture"]
    FK --> E["📊 Mettre à jour le stock"]
    C --> JN["━━━━ JOIN ━━━━"]
    D --> JN
    E --> JN
    JN --> F["🚚 Expédier commande"]
    F --> G(("⊕ Fin"))
    style A fill:#1e293b,stroke:#1e293b,color:#fff
    style G fill:#1e293b,stroke:#1e293b,color:#fff
    style FK fill:#475569,stroke:#475569,color:#fff
    style JN fill:#475569,stroke:#475569,color:#fff`
};

ExerciseDiagrams[19] = {
    type: 'mermaid',
    code: `flowchart TD
    subgraph "👤 Candidat"
        A["📄 Envoyer CV"]
        L["Accepter ou Refuser"]
        Z(("⊕ Fin"))
    end
    subgraph "🏢 Ressources Humaines"
        B["Trier candidatures"]
        C{"Retenu ?"}
        E["📅 Planifier entretien"]
        I["✉️ Envoyer offre"]
        X1(("⊗ Refus"))
    end
    subgraph "👔 Manager"
        F["🗣️ Mener entretien"]
        G{"Accepté ?"}
        X2(("⊗ Refus"))
    end
    A --> B
    B --> C
    C -->|"✅ Oui"| E
    C -->|"❌ Non"| X1
    E --> F
    F --> G
    G -->|"✅ Oui"| I
    G -->|"❌ Non"| X2
    I --> L
    L --> Z
    style C fill:#fef3c7,stroke:#f59e0b,color:#92400e
    style G fill:#fef3c7,stroke:#f59e0b,color:#92400e`
};

ExerciseDiagrams[20] = {
    type: 'mermaid',
    code: `flowchart TD
    A(("● Début")) --> B["Saisir critères de recherche"]
    B --> C["Afficher liste voitures"]
    C --> D{"Voiture existe ?"}
    D -->|"✅ Oui"| E["Sélectionner voiture"]
    D -->|"❌ Non"| F["Saisir nouveau véhicule"]
    E --> G{"Sous garantie ?"}
    G -->|"Oui"| H["Saisir date demande réparation"]
    G -->|"Non"| J["Saisir dates réception / restitution"]
    F --> J
    H --> J
    J --> K{"Assurance ?"}
    K -->|"Oui"| L["Sélectionner assurance"]
    K -->|"Non"| N["✅ Enregistrer fiche"]
    L --> N
    N --> O(("⊕ Fin"))
    style A fill:#1e293b,stroke:#1e293b,color:#fff
    style O fill:#1e293b,stroke:#1e293b,color:#fff
    style D fill:#fef3c7,stroke:#f59e0b,color:#92400e
    style G fill:#fef3c7,stroke:#f59e0b,color:#92400e
    style K fill:#fef3c7,stroke:#f59e0b,color:#92400e`
};

/* ═══════════════════════════════════════════════════════════════════════
   MODULE 5 : DIAGRAMMES DE SÉQUENCE (Mermaid)
   ═══════════════════════════════════════════════════════════════════════ */

ExerciseDiagrams[21] = {
    type: 'mermaid',
    code: `sequenceDiagram
    participant C as 🧑 Client
    participant D as 🏧 DAB
    participant B as 🏦 Banque
    C->>D: insérerCarte()
    activate D
    D-->>C: demanderCode()
    C->>D: saisirCode(code)
    D->>B: vérifierCode(code)
    activate B
    B-->>D: OK ✅
    deactivate B
    D-->>C: distribuerBillets()
    deactivate D`
};

ExerciseDiagrams[22] = {
    type: 'mermaid',
    code: `sequenceDiagram
    participant U as 🧑 Utilisateur
    participant S as 🖥️ Serveur
    participant B as 🗄️ BDD
    U->>S: login(id, mdp)
    activate S
    S->>B: vérifier(id, mdp)
    activate B
    B-->>S: résultat
    deactivate B
    alt résultat = valide ✅
        S-->>U: afficherAccueil()
    else résultat = invalide ❌
        S-->>U: afficherErreur()
    end
    deactivate S`
};

ExerciseDiagrams[23] = {
    type: 'mermaid',
    code: `sequenceDiagram
    participant C as 🧑 Client
    participant S as 🖥️ Système
    participant P as 💳 Paiement
    loop Tant que articles à ajouter 🔄
        C->>S: ajouterArticle(art)
        activate S
        S-->>C: confirmation ✅
        deactivate S
    end
    C->>S: passerCommande()
    activate S
    S->>S: calculerTotal()
    S->>P: débiter(total)
    activate P
    P-->>S: OK ✅
    deactivate P
    S-->>C: confirmation()
    deactivate S`
};

ExerciseDiagrams[24] = {
    type: 'mermaid',
    code: `sequenceDiagram
    participant R as 🤖 Robot
    participant B as 🦾 BrasArticulé
    R->>B: saisirPièce(pos)
    activate B
    B->>B: déplacerPince(pos)
    B->>B: fermerPince()
    B-->>R: pièceSaisie ✅
    deactivate B
    R->>B: déplacer(zoneDépôt)
    activate B
    B->>B: déplacerVers(zoneDépôt)
    B-->>R: positionAtteinte ✅
    deactivate B
    R->>B: relâcher()
    activate B
    B->>B: ouvrirPince()
    B-->>R: pièceRelâchée ✅
    deactivate B
    R->>B: retourPosition()
    activate B
    B->>B: retourInitiale()
    B-->>R: prêt ✅
    deactivate B`
};

ExerciseDiagrams[25] = {
    type: 'mermaid',
    code: `sequenceDiagram
    participant C as 🧑 Client
    participant S as 🖥️ Serveur
    participant B as 🗄️ BDD
    participant P as 💳 Paiement
    loop Pour chaque article 🔄
        C->>S: ajouterArticle(id)
        activate S
        S->>B: getStock(id)
        activate B
        B-->>S: stock
        deactivate B
        alt stock > 0 ✅
            S-->>C: article ajouté
        else stock = 0 ❌
            S-->>C: rupture de stock
        end
        deactivate S
    end
    opt Code promo disponible 🏷️
        C->>S: appliquerCode(code)
        activate S
        S-->>C: remise appliquée
        deactivate S
    end
    C->>S: payer(total)
    activate S
    S->>P: débiter(total)
    activate P
    P-->>S: OK ✅
    deactivate P
    S-->>C: confirmation()
    deactivate S`
};
