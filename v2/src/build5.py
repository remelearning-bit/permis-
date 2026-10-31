import re,json,sys,base64,glob,os
from PIL import Image
T=open('/home/claude/permis-/v2/preambule.html',encoding='utf-8').read()
e1=open('/home/claude/w/e1.js',encoding='utf-8').read()
common=e1[:e1.index('/* 1. la couverture et les quatre parties */')]
e5src=open('/home/claude/w/e5.js',encoding='utf-8').read()
# la traversée à feux en scène 3D (écran témoin validé par Cat) remplace l'écran photo du dispositif lumineux
t5=(open('/home/claude/w/avion5.js',encoding='utf-8').read()+open('/home/claude/w/t5.js',encoding='utf-8').read()).replace("' · 5 h 58'","' · 6 h 12'").replace("jlog('5 h 58'","jlog('6 h 12'").replace("jlog('5 h 59'","jlog('6 h 13'")
k=e5src.index('runSeq([');assert "['Le dispositif lumineux',feux]" in e5src
e5src=e5src[:k]+t5+'\n'+e5src[k:].replace("['Le dispositif lumineux',feux]","['Le dispositif lumineux',()=>traversee('feux')]").replace("['Le marquage au sol : les couleurs',couleurs]","['Le marquage au sol : les couleurs',()=>traversee('couleurs')]").replace("['Les cheminements véhicules',chemins]","['Les cheminements véhicules',()=>traversee('chemins')]")
js=common+e5src
lines=open('/home/claude/w/e5lines.json',encoding='utf-8').read()
img={};dim={}
for k in sorted(os.path.splitext(os.path.basename(x))[0] for x in glob.glob('/home/claude/w/e5img/*')):
    f=glob.glob(f'/home/claude/w/e5img/{k}.*')[0];im=Image.open(f);dim[k]=list(im.size)
    mime='image/png' if f.endswith('.png') else 'image/jpeg'
    if mime=='image/jpeg' and max(im.size)>1600:
        im=im.convert('RGB');im.thumbnail((1600,1600));import io;b=io.BytesIO();im.save(b,'JPEG',quality=84);data=b.getvalue();dim[k]=list(im.size)
    else: data=open(f,'rb').read()
    img[k]=f'data:{mime};base64,'+base64.b64encode(data).decode()
def grab(src,name):return re.search(r'const '+name+r'=(\{.*?\});\n',src,re.S)
for name,val in [('LINES',lines),('IMG',json.dumps(img)),('DIM',json.dumps(dim))]:
    m=grab(T,name);T=T[:m.start(1)]+val+T[m.end(1):]
T=T.replace('<title>Permis T · Préambule et introduction</title>',"<title>Permis T · Étape 5 · La circulation des véhicules</title>")
T=T.replace('<span class="st">Préambule</span>',"<span class=\"st\">Étape 5 · La circulation des véhicules</span>")
T=T.replace("const ETAPE='p';","const ETAPE='e5';").replace("VO.src=AUDIO+'p01.mp3'","VO.src=AUDIO+'c01.mp3'")
T=T.replace('const NSTEP=13;','const NSTEP=34;')
a=T.index("const P=(k,t,x='')=>");b=T.index('\nwindow.V2=')
T=T[:a]+js+T[b:]
T=T.replace('/* ---------------- Préambule et introduction (diapos 1 à 18) ----------------','/* ---------------- styles communs des plans (repris du préambule) ----------------')
open(sys.argv[1],'w',encoding='utf-8').write(T);print(len(T))
import subprocess;subprocess.run(['python3','/home/claude/w/patch.py',sys.argv[1]],check=True)
