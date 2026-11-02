// Pour chaque exercice du chapitre 1 d'un cours à exécution réelle : mots-clés de la solution absents du texte du chapitre.
const fs=require('fs'),path=require('path'),html=require('fs');
const LEX={
 sql:['SELECT','WHERE','ORDER BY','GROUP BY','JOIN','INSERT','UPDATE','DELETE','CREATE TABLE','DISTINCT','LIMIT','COUNT','SUM','AVG','HAVING','LIKE','BETWEEN','UNION','CASE'],
 shell:['read','echo','case','for','while','grep','sed','awk','cut','sort','uniq','wc','cat','test','printf','export','declare'],
 python:['def','for','while','elif','input','int(','print','len','range','split','join','open','import','return','class','try','except','lambda','sum','sorted','enumerate','append','dict','set(','format','max','min','float'],
 javascript:['function','const','let','for','while','map','filter','reduce','split','join','JSON','Math','forEach','=>','class','try'],
 php:['function','foreach','for','while','array','explode','implode','count','strlen','isset','preg','class','try','sort'],
 c:['printf','scanf','for','while','if','struct','malloc','return','switch','sizeof','strlen','#include'],
 cpp:['cout','cin','vector','string','for','while','class','struct','return','auto','sort'],
 java:['class','public','static','for','while','String','ArrayList','Scanner','return','switch','try'],
 csharp:['class','static','Console','foreach','for','while','List','string','return','switch','try','using']
};
const root=process.cwd();
const chapTxt=(c)=>{const f=path.join(root,c,'chapitres','chapitre1.html'); if(!fs.existsSync(f))return null;
  return fs.readFileSync(f,'utf8').replace(/<script[\s\S]*?<\/script>/g,' ').replace(/<div class="lab[\s\S]*?(?=<div class="lab|<h2|<section|$)/g,' ').replace(/<[^>]+>/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').toLowerCase();};
const rows=[];
for(const f of fs.readdirSync(path.join(root,'server/exercises'))){
  if(!f.endsWith('.js'))continue; const course=f.replace(/\.js$/,'');
  let mod; try{mod=require(path.join(root,'server/exercises',f));}catch(e){continue;}
  const list=Array.isArray(mod)?mod:(mod.exercises||Object.values(mod).flat());
  const txt=chapTxt(course); if(!txt)continue;
  for(const e of list){
    if(!/-c1-/.test(e.id||'')) continue;
    const lang=(e.language||'').toLowerCase(); if(!LEX[lang]) continue;
    const sol=String(e.solution||'');
    const missing=LEX[lang].filter(k=>{
      const re=new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/^([a-z]+)$/i,'\\b$1\\b'), lang==='sql'?'i':'');
      return re.test(sol) && !re.test(String(e.starter||'')) && !txt.includes(k.toLowerCase());
    });
    if(missing.length) rows.push({course,id:e.id,lang,missing});
  }
}
console.log('exercices de ch.1 (exécution réelle) dont la solution utilise des notions absentes du chapitre :',rows.length);
for(const r of rows) console.log(r.course.padEnd(16),r.id.padEnd(12),r.lang.padEnd(10),r.missing.join(', '));
