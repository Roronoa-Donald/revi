import os, subprocess, re

root = '/home/rd/Desktop/proba'

def read_pdf_pages(rel_path):
    p = os.path.join(root, rel_path)
    if not os.path.exists(p) or os.path.getsize(p) == 0:
        return []
    res = subprocess.run(['pdftotext', '-layout', p, '-'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    pages = res.stdout.split('\x0c')
    return [pg.strip() for pg in pages if pg.strip()]

print("Extracting and writing source cards...")
