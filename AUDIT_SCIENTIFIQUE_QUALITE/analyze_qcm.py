import os, re, json

qcm_list = []

for root, dirs, files in os.walk('server/content'):
    for f in files:
        if f.endswith('.js'):
            fpath = os.path.join(root, f)
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as fp:
                txt = fp.read()
            
            # Extract qcm definitions
            matches = re.finditer(r'\{\s*(?:stem|q)\s*:\s*[\'"`](.*?)[\'"`]\s*,\s*(?:opts|choices|options)\s*:\s*\[(.*?)\]\s*,\s*(?:correct|answer)\s*:\s*(\d+)', txt, re.DOTALL)
            
            course = fpath.split('server/content/')[1].split('/')[0]
            for m in matches:
                stem = m.group(1).strip()
                opts_raw = m.group(2).strip()
                correct_idx = int(m.group(3))
                
                # Split options
                opts_extracted = re.findall(r'[\'"`](.*?)[\'"`]', opts_raw)
                if opts_extracted:
                    qcm_list.append({
                        'course': course,
                        'file': fpath,
                        'stem': stem,
                        'opts': opts_extracted,
                        'correct': correct_idx
                    })

print(f'Parsed {len(qcm_list)} structured QCM questions.')

neg_stems = 0
none_all_opts = 0
longer_correct = 0
clang_clues = 0

for q in qcm_list:
    stem = q['stem']
    opts = q['opts']
    c_idx = q['correct']
    
    # 1. Negative stem
    if re.search(r'\b(pas|sauf|non|faux|incorrect|jamais)\b', stem, re.IGNORECASE):
        neg_stems += 1
        
    # 2. None / All of the above
    if any(re.search(r'\b(toutes|aucune|les deux|aucun)\b', o, re.IGNORECASE) for o in opts):
        none_all_opts += 1
        
    # 3. Longest option clue
    if 0 <= c_idx < len(opts):
        c_len = len(opts[c_idx])
        other_lens = [len(opts[i]) for i in range(len(opts)) if i != c_idx]
        if other_lens and c_len > 1.4 * (sum(other_lens) / len(other_lens)) and c_len > 30:
            longer_correct += 1
            
        # 4. Clang clue: significant word in stem repeated ONLY in correct option
        stem_words = [w.lower() for w in re.findall(r'\b\w{6,}\b', stem)]
        c_words = set(re.findall(r'\b\w{6,}\b', opts[c_idx].lower()))
        distractor_words = set()
        for i in range(len(opts)):
            if i != c_idx:
                distractor_words.update(re.findall(r'\b\w{6,}\b', opts[i].lower()))
        shared = [w for w in stem_words if w in c_words and w not in distractor_words]
        if shared:
            clang_clues += 1

print('QCM Analysis results:')
print(f'  Total analyzed: {len(qcm_list)}')
print(f'  Negative stems: {neg_stems} ({neg_stems/len(qcm_list)*100:.1f}%)')
print(f'  "Toutes/Aucune des réponses" in options: {none_all_opts} ({none_all_opts/len(qcm_list)*100:.1f}%)')
print(f'  Longer correct option clue: {longer_correct} ({longer_correct/len(qcm_list)*100:.1f}%)')
print(f'  Clang association clue: {clang_clues} ({clang_clues/len(qcm_list)*100:.1f}%)')

with open('AUDIT_SCIENTIFIQUE_QUALITE/qcm_stats.json', 'w', encoding='utf-8') as f:
    json.dump({
        'total': len(qcm_list),
        'negative_stems': neg_stems,
        'none_all_opts': none_all_opts,
        'longer_correct': longer_correct,
        'clang_clues': clang_clues,
        'sample': qcm_list[:10]
    }, f, indent=2)
