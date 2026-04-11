import zipfile, xml.etree.ElementTree as ET

z = zipfile.ZipFile('snapshot vm.pptx', 'r')
for i in range(1, 12):
    name = f'ppt/slides/slide{i}.xml'
    try:
        root = ET.fromstring(z.read(name))
        texts = [t.text for t in root.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t') if t.text]
        if texts:
            print(f'--- SLIDE {i} ---')
            print(' '.join(texts))
            print()
    except:
        pass
z.close()
