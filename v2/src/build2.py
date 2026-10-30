import re,json,sys
T=open('/home/claude/permis-/v2/preambule.html',encoding='utf-8').read()
js=open('/home/claude/w/e2.js',encoding='utf-8').read()
data=open('/home/claude/w/e2data.js',encoding='utf-8').read()
lines=open('/home/claude/w/e2lines.json',encoding='utf-8').read()
def grab(src,name):return re.search(r'const '+name+r'=(\{.*?\});\n',src,re.S)
for name,val in [('LINES',lines),('IMG','{}'),('DIM','{}')]:
    m=grab(T,name);T=T[:m.start(1)]+val+T[m.end(1):]
T=T.replace('<title>Permis T · Préambule et introduction</title>','<title>Permis T · Étape 2 · Le zonage et la cartographie</title>')
T=T.replace('<span class="st">Préambule</span>','<span class="st">Étape 2 · Le zonage et la cartographie</span>')
T=T.replace("const ETAPE='p';","const ETAPE='e2';").replace("VO.src=AUDIO+'p01.mp3'","VO.src=AUDIO+'r1.mp3'")
T=T.replace('const NSTEP=13;','const NSTEP=7;')
T=T.replace("const CLICK='#navgo .act,","const CLICK='#navgo .act,.mk2.live b,")
a=T.index("const P=(k,t,x='')=>");b=T.index('\nwindow.V2=')
i=data.index('\n');data=data[:i+1]+open('/home/claude/w/e2helpers.js',encoding='utf-8').read()+data[i+1:]
T=T[:a]+data+'\n'+js+T[b:]
T=T.replace('/* ---------------- Préambule et introduction (diapos 1 à 18) ----------------','/* ---------------- styles communs des plans (repris du préambule) ----------------')
open(sys.argv[1],'w',encoding='utf-8').write(T);print(len(T))

import subprocess;subprocess.run(['python3','/home/claude/w/patch.py',sys.argv[1]],check=True)
