import re,json,sys,base64,glob,os
from PIL import Image
T=open('/home/claude/permis-/v2/preambule.html',encoding='utf-8').read()
e1=open('/home/claude/w/e1.js',encoding='utf-8').read()
common=e1[:e1.index('/* 1. la couverture et les quatre parties */')]
js=common+open('/home/claude/w/e3.js',encoding='utf-8').read()
lines=open('/home/claude/w/e3lines.json',encoding='utf-8').read()
img={};dim={}
for k in ['aerien3','secteurs','parifclean','qparif','qparif2']:
    f=glob.glob(f'/home/claude/w/e3img/{k}.*')[0];im=Image.open(f);dim[k]=list(im.size)
    img[k]='data:image/jpeg;base64,'+base64.b64encode(open(f,'rb').read()).decode()
def grab(src,name):return re.search(r'const '+name+r'=(\{.*?\});\n',src,re.S)
for name,val in [('LINES',lines),('IMG',json.dumps(img)),('DIM',json.dumps(dim))]:
    m=grab(T,name);T=T[:m.start(1)]+val+T[m.end(1):]
T=T.replace('<title>Permis T · Préambule et introduction</title>',"<title>Permis T · Étape 3 · L'accès au côté piste</title>")
T=T.replace('<span class="st">Préambule</span>',"<span class=\"st\">Étape 3 · L'accès au côté piste</span>")
T=T.replace("const ETAPE='p';","const ETAPE='e3';").replace("VO.src=AUDIO+'p01.mp3'","VO.src=AUDIO+'a01.mp3'")
T=T.replace('const NSTEP=13;','const NSTEP=11;')
a=T.index("const P=(k,t,x='')=>");b=T.index('\nwindow.V2=')
T=T[:a]+js+T[b:]
T=T.replace('/* ---------------- Préambule et introduction (diapos 1 à 18) ----------------','/* ---------------- styles communs des plans (repris du préambule) ----------------')
open(sys.argv[1],'w',encoding='utf-8').write(T);print(len(T))
import subprocess;subprocess.run(['python3','/home/claude/w/patch.py',sys.argv[1]],check=True)
