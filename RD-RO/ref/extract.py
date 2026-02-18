from PyPDF2 import PdfReader
import os

pdfs = sorted([f for f in os.listdir('.') if f.endswith('.pdf')])
for p in pdfs:
    try:
        reader = PdfReader(p)
        txt = ''
        for pg in reader.pages:
            try:
                t = pg.extract_text()
                if t:
                    txt += t
            except:
                pass
        n = len(txt.strip())
        status = 'TEXT' if n > 10 else 'SCAN'
        print(f'{p} | {len(reader.pages)}pg | chars={n} | {status}')
        if n > 100:
            print(txt[:600])
            print('---END PREVIEW---\n')
    except Exception as e:
        print(f'{p} | ERR: {e}')
