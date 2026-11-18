# Style validé sur maquettes (18/11/2026) : Nunito, marine #0F1E46, jaune #FFC400,
# titre souligné de jaune, cartes à contour marine, bouton marine, photo dans un cadre
# à gauche et contenu à droite (couverture : texte à gauche, photo à droite).
# S'applique à une page construite ; relancé par patch.py à chaque construction.
import sys,base64,re
p=sys.argv[1];s=open(p,encoding='utf-8').read()
# on retire une pose précédente
s=re.sub(r'<style id="style3">.*?</style>','',s,flags=re.S)
s=re.sub(r'<div id="s3f"></div>','',s)
F='/tmp/mk/node_modules/@fontsource/nunito/files/nunito-latin-%d-normal.woff2'
import os
if not os.path.exists(F%800):F='/home/claude/w/fonts/nunito-latin-%d-normal.woff2'
b=lambda w:base64.b64encode(open(F%w,'rb').read()).decode()
ff=''.join("@font-face{font-family:'Barlow';font-weight:%d;font-style:normal;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2')}"%(w,b(n)) for w,n in [(400,700),(500,800),(600,800),(700,900),(800,900)])
css=ff+open('/home/claude/w/style3.css',encoding='utf-8').read()
i=s.rfind('</body>');s=s[:i]+'<style id="style3">'+css+'</style>'+s[i:]
s=re.sub(r'(<body[^>]*>)',r'\1<div id="s3f"></div>',s,count=1)
s=s.replace('scene.background=new THREE.Color(0xe7eaea)','scene.background=new THREE.Color(0xf6f7f9)')
# moteur : cadrage et place du panneau
A="else cam.setViewOffset(W,H,-Math.round(W*.13),0,W,H);cam.updateProjectionMatrix()}"
B="const fw=PORT()?1:.96,fh=PORT()?.8:.96;"
C="function view(o={}){"
D="function label(anchor,opts={}){"
E="else{x=Math.max(24,Math.round(W*.035));y=Math.max(24,Math.min(bot-24-h,Math.round(H*.14)))}"
G="if(CUR)Object.assign(V,view({x:V.x,z:V.z}))"
VU='function vue(html){'
if 'function S3set' not in s and all(x in s for x in (A,B,C,D,E,G)):
    s=s.replace(A,"else{const m=window.S3M;if(m==='L')cam.setViewOffset(W,H,Math.round(W*.24),Math.round(H*.0175),W,H);else if(m==='R')cam.setViewOffset(W,H,-Math.round(W*.23),0,W,H);else cam.setViewOffset(W,H,-Math.round(W*.13),0,W,H)}cam.updateProjectionMatrix()}\n"
      "window.S3M=null;const S3on=()=>innerWidth>=700&&innerWidth>innerHeight;\n"
      "function S3set(m){if(!S3on())m=null;if(window.S3M===m)return;window.S3M=m;document.body.dataset.s3=m||'';setFov()}\n"
      "function S3R(){const P=CUR;const tv=Math.tan(cam.fov*Math.PI/360);return {x:0,z:0,d:Math.min(P.w/(2*tv*cam.aspect*.48),P.h/(2*tv*.56))*.93}}",1)
    s=s.replace(B,"const s3=window.S3M==='L';const fw=PORT()?1:s3?.445:.96,fh=PORT()?.8:s3?.615:.96;",1)
    s=s.replace(G,"if(CUR){if(!S3on())S3set(null);Object.assign(V,window.S3M==='R'?S3R():view({x:V.x,z:V.z,_k:1,mode:window.S3M==='L'?'contain':undefined}))}",1)
if 'function S3set' in s:
    for anc,add in [(C,"if(!o._k)S3set(o.mode==='contain'?'L':null);"),(D,"if(opts.big&&CUR&&S3on()){S3set('R');Object.assign(V,S3R());mv=null}"),(VU,"S3set(/hero nph/.test(html)?'L':null);")]:
        if anc in s and anc+add not in s:s=s.replace(anc,anc+add,1)
    E2="else if(window.S3M==='L'){x=Math.round(W*.515);y=Math.max(24,Math.min(bot-12-h,Math.round(H*.165)))}else if(window.S3M==='R'&&T.el.classList.contains('big')){x=Math.round(W*.05);y=Math.max(24,Math.round((bot-h)/2))}"
    if E in s and E2+E not in s:s=s.replace(E,E2+E,1)
    print('moteur OK',[x in s for x in ("S3set(o.mode","S3set('R')","S3set(/hero","window.S3M==='L'){x=")])
else:print('moteur : inchangé')
open(p,'w',encoding='utf-8').write(s)
