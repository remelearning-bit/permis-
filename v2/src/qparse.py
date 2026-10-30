import re,sys
def red(c): return '<<ROUGE' in c or any(x.startswith('FF0') or x.startswith('FE0') or x=='FF0000' for x in re.findall(r'[0-9A-F]{6}',c))
for f in sys.argv[1:]:
  print('########',f)
  L=open(f).read().split('\n');chap=0;q=None
  for l in L:
    m=re.search(r'chapitre (\d)',l)
    if m: chap=int(m.group(1));print('--- chapitre',chap);continue
    if chap>3: break
    t=re.sub(r'\s+[0-9A-F]{6}(,[0-9A-F]{6})*\s*$','',l).replace('<<ROUGE','').strip()
    if not t or t.startswith('Question N') or t in('[IMG]',) or re.fullmatch(r'\d+',t) or 'DIFFUSION' in t or 'GROUPE' in t or 'contenus pédagogiques' in t: continue
    if t.endswith('?') or t.endswith(':') or len(t)>60 and not red(l) and q is None:
      print('\nQ:',t);q=1;continue
    print('  ','✔' if red(l) else '·',t[:160])
