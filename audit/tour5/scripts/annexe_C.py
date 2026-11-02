# python audit/tour4/scripts/check_cartes.py NEW
import re,glob,sys,html,collections
NEW=sys.argv[1]; dup=0
for p in glob.glob(NEW+'/*/chapitres/cartes.html'):
    h=open(p,encoding='utf-8',errors='replace').read()
    qs=[html.unescape(re.sub(r'<[^>]+>','',m)).strip() for m in re.findall(r'<b>Question</b>(.*?)</div>',h,flags=re.S)]
    base=[re.sub(r'^Synthèse\s*[—-]\s*','',q) for q in qs]
    c=collections.Counter(base)
    d=sum(v-1 for v in c.values() if v>1)
    if d: dup+=d; print(p,'doublons:',d)
print('TOTAL questions en double:',dup,'(attendu: 0)')
