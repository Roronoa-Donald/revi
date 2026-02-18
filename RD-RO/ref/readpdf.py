from PyPDF2 import PdfReader
import os, sys

target = sys.argv[1]
reader = PdfReader(target)
for i, pg in enumerate(reader.pages):
    try:
        t = pg.extract_text()
        if t:
            print(f'--- PAGE {i+1} ---')
            print(t)
    except:
        print(f'--- PAGE {i+1} (extract error) ---')
