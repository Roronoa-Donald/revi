# python audit/tour4/scripts/check_notions.py MAIN NEW
import re,glob,os,sys,html
MAIN,NEW=sys.argv[1],sys.argv[2]
def notions(p):
    h=open(p,encoding='utf-8',errors='replace').read()
    out=[]
    for m in re.finditer(r'notions? à connaître.*?<(?:ol|ul)[^>]*>(.*?)</(?:ol|ul)>|aller plus loin.*?<(?:ol|ul)[^>]*>(.*?)</(?:ol|ul)>',h,flags=re.S|re.I):
        for g in m.groups():
            if g: out+= [html.unescape(re.sub(r'<[^>]+>','',x)).strip() for x in re.findall(r'<li[^>]*>(.*?)</li>',g,flags=re.S)]
    return out
manque=0
for p in sorted(glob.glob(NEW+'/*/chapitres/chapitre*.html')):
    rel=os.path.relpath(p,NEW); q=os.path.join(MAIN,rel)
    if not os.path.exists(q): continue
    old=notions(q); new=set(notions(p))
    lost=[x for x in old if x not in new]
    if lost: manque+=len(lost); print(rel,'notions perdues:',lost)
print('TOTAL notions perdues:',manque,'(attendu: 0)')
