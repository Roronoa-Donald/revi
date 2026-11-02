import re,glob,os
os.chdir('/home/claude/c2/revi-cours-html')
AN="Cyber securite B2 RD-RO assembleur b1-admin-windows b1-algebre b1-anglais b1-architecture b1-bureautique b1-ccna1 b1-cyber b1-droit b1-fr-pro b1-merise b1-projet b1-reseaux b1-robotique b1-stats b1-virtualisation b3-agile b3-anglais b3-cloud-aws b3-cloud-azure b3-cloud-computing b3-cryptographie b3-devops b3-document-technique b3-etude-quantitative b3-firewall b3-google-cloud b3-hacking b3-pfsense b3-reseau-lan b3-supervision b3-veille b3-virtualisation b3-voip b3-windows-server ccna droit erp-si infographie ingenierie-besoin masterclass-apprendre probabilites uiux uml".split()
SEP=r"(\s*'\s*\+\s*')"
R=[
 (r"à écrire et à exécuter"+SEP+r"dans la page : votre (?:script|programme|analyse) est réellement lancée?, puis corrigée? par des tests que vous ne voyez pas\.", r"à analyser\1dans la page : vous remplissez votre grille d’analyse, puis elle est vérifiée par des critères que vous ne voyez pas."),
 (r"à résoudre et à valider dans la page : votre (?:analyse|script) est réellement lancée?, puis corrigée? par des tests que vous ne voyez pas\.", r"à résoudre et à valider dans la page : vous remplissez votre grille d’analyse, puis elle est vérifiée par des critères que vous ne voyez pas."),
 (r"trois exercices de code</strong> : vous écrivez vraiment le"+SEP+r"script, il est réellement exécuté, puis corrigé par des tests que vous ne voyez pas\.", r"trois études de cas</strong> : vous remplissez vraiment votre\1grille d’analyse, elle est vérifiée par des critères que vous ne voyez pas."),
 (r"atelier de scripts", "atelier d’analyse"),(r"Atelier de scripts", "Atelier d’analyse"),
 (r"Atelier de scripts du cours", "Atelier d’analyse du cours"),
]
n=0;files=0
for c in AN:
    for f in glob.glob(f'server/content/{c}/pages*.js')+glob.glob(f'server/content/{c}/pages/*.js')+glob.glob(f'server/content/{c}.js'):
        t=open(f,encoding='utf-8').read();o=t
        for p,r in R:
            t,k=re.subn(p,r,t); n+=k
        if t!=o: open(f,'w',encoding='utf-8').write(t); files+=1
print(n,"remplacements dans",files,"fichiers")
