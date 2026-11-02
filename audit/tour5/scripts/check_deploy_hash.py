#!/usr/bin/env python3
"""À lancer depuis la racine du projet : compare le HTML local au HTML en ligne (SHA-256 du texte normalisé).
Usage : python audit/tour5/scripts/check_deploy_hash.py https://revi-mu.vercel.app"""
import sys,glob,hashlib,re,urllib.request
base=sys.argv[1].rstrip('/')
pages=['index.html']+[p for c in ('b1-algo','b1-c-cpp','b1-php','b1-python') for p in (f'{c}/sommaire.html',f'{c}/chapitres/chapitre1.html')]
norm=lambda s: hashlib.sha256(re.sub(r'\s+',' ',s).encode()).hexdigest()[:12]
for p in pages:
    local=open(p,encoding='utf-8').read()
    try: live=urllib.request.urlopen(f'{base}/{p}',timeout=20).read().decode('utf-8','replace')
    except Exception as e: print('ERREUR',p,e); continue
    print(('IDENTIQUE ' if norm(local)==norm(live) else 'DIFFÉRENT  ')+p)
