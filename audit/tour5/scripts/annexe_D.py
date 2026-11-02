# python audit/tour4/scripts/check_analyse.py NEW
import re,glob,html,collections,sys
pat=re.compile(r'ipaddress|iface_obj|num_addresses|\.split\(|\bstdin\b|\bSTDIN\b|Python 3|input\(\)|print\(|\bsubprocess\b|2#du-bash',re.I)
tot=0;by=collections.Counter()
for p in glob.glob(sys.argv[1]+'/*/chapitres/chapitre*.html'):
    h=open(p,encoding='utf-8',errors='replace').read()
    if 'data-language="analyse"' not in h: continue
    b=re.sub(r'<script.*?</script>|<pre.*?</pre>|<textarea.*?</textarea>','',h,flags=re.S)
    n=len(pat.findall(html.unescape(re.sub(r'<[^>]+>',' ',b))))
    if n: tot+=n; by[p.split('/')[-3]]+=n
print('occurrences résiduelles:',tot,'(attendu: 0 hors exceptions justifiées)'); print(by.most_common(10))
