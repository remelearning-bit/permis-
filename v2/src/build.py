import re,json,sys
T=open('/home/claude/permis-/v2/preambule.html',encoding='utf-8').read()
E1=open('/home/claude/permis-/v2/etape1.html',encoding='utf-8').read()
js=open('/home/claude/w/e1.js',encoding='utf-8').read()
def grab(src,name):
    m=re.search(r'const '+name+r'=(\{.*?\});\n',src,re.S);return m
lines=grab(E1,'LINES').group(1)
img=json.loads(grab(E1,'IMG').group(1));dim=json.loads(grab(E1,'DIM').group(1))
used=[k for k in img if ("'"+k+"'" in js or 'IMG.'+k in js or '"'+k+'"' in js)]
img={k:img[k] for k in used};dim={k:dim[k] for k in used}
print('images',used)
for name,val in [('LINES',lines),('IMG',json.dumps(img)),('DIM',json.dumps(dim))]:
    m=grab(T,name);T=T[:m.start(1)]+val+T[m.end(1):]
T=T.replace('<title>Permis T · Préambule et introduction</title>','<title>Permis T · Étape 1 · La réglementation</title>')
T=T.replace('<span class="st">Préambule</span>','<span class="st">Étape 1 · La réglementation</span>')
T=T.replace("const ETAPE='p';","const ETAPE='e1';").replace("VO.src=AUDIO+'p01.mp3'","VO.src=AUDIO+'e01.mp3'")
T=T.replace('const NSTEP=13;','const NSTEP=25;')
a=T.index("const P=(k,t,x='')=>");b=T.index('\nwindow.V2=')
T=T[:a]+js+T[b:]
T=T.replace('/* ---------------- Préambule et introduction (diapos 1 à 18) ----------------','/* ---------------- styles communs des plans (repris du préambule) ----------------')
open(sys.argv[1],'w',encoding='utf-8').write(T)
print(len(T))

import subprocess;subprocess.run(['python3','/home/claude/w/patch.py',sys.argv[1]],check=True)
