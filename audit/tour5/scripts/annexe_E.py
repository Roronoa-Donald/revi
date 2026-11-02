# python audit/tour4/scripts/check_latex.py NEW
import re,glob,sys
pat=re.compile(r'\t(imes|heta|ext\{|au\b|riangle|ilde)|\x08(eta|egin|oldsymbol)|\x0c(rac)|\r(ightarrow|ho\b)')
n=0
for p in glob.glob(sys.argv[1]+'/**/*.html',recursive=True):
    if '/audit' in p or 'design-audit' in p: continue
    c=len(pat.findall(open(p,encoding='utf-8',errors='replace').read()))
    if c: n+=c; print(p,c)
print('TOTAL séquences corrompues:',n,'(attendu: 0)')
