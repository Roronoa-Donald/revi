
import os

base_dir = r"c:\Users\donald\Documents\proba\probabilites\chapitres"
chapters = [f"chapitre{i}.html" for i in range(1, 9)]

target_str = '<div style="display:flex; justify-content:space-between; margin-top:60px;">'
replacement_str = '<div id="exercises-container" style="margin-top:50px;"></div>\n            <div style="display:flex; justify-content:space-between; margin-top:60px;">'

script_tag = '<script src="../assets/js/exercises.js"></script>'

for chap in chapters:
    file_path = os.path.join(base_dir, chap)
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Inject Container
        if 'id="exercises-container"' not in content:
            if target_str in content:
                content = content.replace(target_str, replacement_str)
            else:
                print(f"Warning: Target string not found in {chap}")

        # Inject Script
        if 'exercises.js' not in content:
            content = content.replace('</body>', f'{script_tag}\n</body>')
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {chap}")
    else:
        print(f"File not found: {chap}")
