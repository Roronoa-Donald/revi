import pymupdf

doc = pymupdf.open("UML 2.0.pdf")
total = len(doc)
print(f"Total pages: {total}")
all_text = []
for i in range(total):
    text = doc[i].get_text()
    if text.strip():
        all_text.append(f"=== PAGE {i+1} ===\n{text}")

output = "\n\n".join(all_text)
with open("uml_content.txt", "w", encoding="utf-8") as out:
    out.write(output)
print(f"Written {len(output)} chars to uml_content.txt")
