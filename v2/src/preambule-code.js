<script type="module">
import * as THREE from 'three';
const LINES={"p01": {"w": "D", "t": "Bonjour. Je m'appelle Damienne, et voici Xavier. On va passer la matinée ensemble sur Roissy-Charles de Gaulle, et à la fin, vous aurez votre permis T."}, "p02": {"w": "X", "t": "Moi, je le passe avec vous. Je connais un peu la plateforme, mais pas encore ses règles au volant."}, "p03": {"w": "D", "t": "La règle est la même pour tout le monde, quel que soit votre métier. Cliquez pour commencer."}, "p04": {"w": "D", "t": "Trois choses à savoir avant de partir. La partie théorique dure trois heures trente, c'est la durée obligatoire. Elle se fait en dix étapes, dans l'ordre : on ne passe à la suivante qu'après avoir terminé la précédente. Et vous nous entendrez tous les deux, Xavier et moi, deux collègues qui échangent."}, "p05": {"w": "D", "t": "À l'écran, une main orange vous montre où cliquer. Tout au long de la matinée, vous aurez des questions d'entraînement. Elles ne sont jamais notées. Vous avez autant d'essais que vous voulez, et chaque réponse est expliquée. Un journal note chaque décision, avec l'heure."}, "p06": {"w": "D", "t": "Si quelque chose bloque, l'équipe de REM Formation répond au téléphone. Le numéro : zéro un, quarante-neuf, dix-neuf, quatre-vingt-un, soixante-dix-neuf. L'évaluation finale, elle, se passe en ligne, sur votre espace stagiaire, à la fin du parcours."}, "p07": {"w": "D", "t": "Le permis T, c'est une formation obligatoire en deux parties. La théorie, trois heures trente : c'est ce que vous faites maintenant. La pratique, chez REM Formation ou chez votre employeur, selon les cas. Et un recyclage tous les deux ans."}, "p08": {"w": "X", "t": "Et si je n'ai pas le permis voiture ?"}, "p09": {"w": "D", "t": "Alors pas de permis T. Le permis de conduire est un prérequis, pas une option. Il faut un permis français en cours de validité. Ou un permis étranger dont les droits à conduire restent valables en France. Et sa catégorie doit correspondre au véhicule ou à l'engin que vous conduirez. Pour la théorie, l'évaluation finale compte vingt et une questions. Il faut au moins quatre-vingts pour cent de bonnes réponses pour obtenir l'attestation."}, "p10": {"w": "D", "t": "Quand vous réussissez la théorie, vous recevez une attestation de réussite. Elle vaut autorisation de conduite pendant quarante jours. Mais seulement en présence d'un référent accompagnateur : c'est la phase de formation pratique. Vous avez ensuite trois mois pour récupérer le permis."}, "p11": {"w": "X", "t": "Donc avec l'attestation, je peux rouler seul ?"}, "p12": {"w": "D", "t": "Non. Ce n'est pas un permis provisoire : on ne roule jamais seul avec. Et attention aux absences. Entre trois et douze mois sans venir sur la plateforme, une formation pratique sera exigée. Plus de douze mois, et vous repassez le permis T en entier."}, "p10b": {"w": "D", "t": "Voici le document qui vous sera remis à la fin de la théorie : l'attestation de réussite de la formation. C'est elle qui vaut autorisation de conduite, avec un référent, pendant quarante jours."}, "p13": {"w": "D", "t": "À vous. Quatre affirmations : dites-moi si elles sont vraies ou fausses."}, "p14": {"w": "D", "t": "Quatre objectifs pour cette matinée. Un : se repérer et s'orienter sur l'aire de mouvement et les aires de trafic de Paris-Charles de Gaulle. Deux : savoir identifier les risques liés à la circulation sur l'aire de mouvement. Particulièrement sur les aires de trafic. Trois : adopter les bonnes pratiques, les réflexes et les bonnes attitudes quand on circule. Quatre : comprendre les risques et les procédures de notification."}, "p15": {"w": "D", "t": "À la fin, vous savez vous repérer sur Roissy. Vous avez perçu les situations qui créent le risque. Et vous avez les réflexes pour vous protéger et protéger les autres."}, "p16": {"w": "D", "t": "Voici votre permis. Dix étapes, dans l'ordre. La réglementation. Le zonage et la cartographie. L'accès au côté piste. L'inspection du véhicule. La circulation des véhicules. Les règles de sécurité sur l'aire de mouvement. La circulation autour de l'avion. L'aire de manœuvre. Les procédures d'urgence. Et l'amélioration continue de la sécurité. À chaque étape terminée, une case se coche. À la fin, le permis est à vous."}, "i01": {"w": "X", "t": "Pourquoi une formation spéciale pour Roissy ? Un aéroport, c'est un aéroport, non ?"}, "i02": {"w": "D", "t": "Non. Chaque aéroport a ses particularités : ses contraintes géographiques, son architecture, ses caractéristiques propres. Il faut prendre en compte l'environnement. Roissy-Charles de Gaulle est à vingt-cinq kilomètres au nord de Paris. Il a accueilli soixante-seize millions deux cent mille passagers en deux mille dix-neuf. C'est le premier aéroport de France. La vidéo vous le montre, si vous voulez la regarder avant de continuer."}, "i03": {"w": "D", "t": "Trois aérogares, trois logiques de circulation. Charles-de-Gaulle un, le terminal un. Charles-de-Gaulle deux, le terminal deux. Charles-de-Gaulle trois, le terminal trois. On les regarde l'un après l'autre."}, "i04": {"w": "D", "t": "Le terminal un. Le plus ancien, et le plus contraint pour la circulation. Un bâtiment central circulaire, couplé à des satellites d'embarquement et de débarquement. Le bâtiment central, dédié à l'accueil des visiteurs et des passagers, s'étend sur sept niveaux. Il a beaucoup changé depuis deux mille dix-neuf : de huit à seize postes avion. On y reviendra au volant."}, "i05": {"w": "D", "t": "Le terminal deux, le plus étendu. Ses halls vont de deux A à deux G, en deux rangées face à face."}, "i06": {"w": "D", "t": "Sur le plan : une rangée deux B, deux D, deux F. En face, deux A, deux C, deux E. Et, à part, deux G."}, "i07": {"w": "D", "t": "Le terminal trois, dédié aux vols charter et à bas coût. Moins de volume, mais une forte coactivité sur des surfaces réduites."}, "i08": {"w": "D", "t": "À vous. Je vous décris une aérogare, vous me dites laquelle."}, "i09": {"w": "D", "t": "Un mot sur l'avenir. Le Groupe Aéroports de Paris s'engage dans un projet de transformation de la plateforme. Ce projet favorise la transition écologique. Le onze février deux mille vingt et un, le Gouvernement lui a demandé un nouveau projet d'aménagement. C'était après l'arrêt du projet de Terminal quatre, conséquence de la crise du Covid. Ce qui compte pour vous : un chantier modifie les cheminements, donc les habitudes."}, "i10": {"w": "D", "t": "Et les pistes. Quatre pistes parallèles, en deux doublets. Le doublet nord, pistes trois et un. Le doublet sud, pistes deux et quatre. Vous les retrouverez au zonage."}, "i11": {"w": "X", "t": "Si je connais déjà la plateforme, je peux sauter la réglementation et passer au volant ?"}, "i12": {"w": "D", "t": "Non. Avant, il faut savoir qui fixe les règles, et ce qui arrive quand on ne les suit pas. Il est cinq heures : direction la réglementation."}, "p17": {"w": "D", "t": "Votre permis est encore vide. Première case à cocher : la réglementation."}};
const IMG={/*images*/};
const DIM={/*images*/};
const Q=new URLSearchParams(location.search);const FAST=Q.has('fast');
const MUET=Q.has('muet');const AUDIO=MUET?'sans-voix/':(Q.get('audio')||'../audio/');if(MUET){document.body.classList.add('subs');document.getElementById('brep').style.display='none'}
const $=s=>document.querySelector(s);const ui=$('#ui');const lead=$('#lead');
const wait=ms=>new Promise(r=>setTimeout(r,FAST?Math.min(ms,ms/12):ms));
/* ---------------- rendu : la photo posée à plat, la caméra au-dessus ---------------- */
const cv=$('#c');
const R=new THREE.WebGLRenderer({canvas:cv,antialias:true});R.setPixelRatio(Math.min(devicePixelRatio||1,2));R.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();scene.background=new THREE.Color(0xe7eaea);
const cam=new THREE.PerspectiveCamera(48,1,1,4000);cam.up.set(0,0,-1);
const PW=160; // largeur de chaque photo dans la scène
const LOADER=new THREE.TextureLoader();const PH={};
function plane(k){if(PH[k])return PH[k];const [w,h]=DIM[k];const H=PW*h/w;const tex=LOADER.load(IMG[k]);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=8;
 const m=new THREE.Mesh(new THREE.PlaneGeometry(PW,H),new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:0,depthWrite:false}));m.rotation.x=-Math.PI/2;m.visible=false;scene.add(m);
 return PH[k]={k,m,w:PW,h:H}}
let CUR=null;let ord=1;
/* une photo remplace l'autre en fondu enchaîné */
function photo(k,D=900){const P=plane(k);if(CUR===P)return Promise.resolve();const old=CUR;CUR=P;P.m.visible=true;P.m.renderOrder=++ord;P.m.position.y=ord*.001;
 const caption=(typeof CAPS!=='undefined'&&CAPS[k])||'';const cp=$('#cap');cp.textContent=caption;cp.classList.toggle('on',!!caption);
 return anim(D,t=>{P.m.material.opacity=t;if(old&&t>=1){old.m.visible=false;old.m.material.opacity=0}})}
/* un point de la photo affichée, en fractions de sa largeur et de sa hauteur */
const pt=(fx,fy,k)=>{const P=k?plane(k):CUR;return [(fx-.5)*P.w,0,(fy-.5)*P.h]};
/* la caméra : un point visé sur la photo et un recul ; le cadrage laisse la place au panneau */
const PORT=()=>innerWidth<innerHeight;
function setFov(){const W=innerWidth,H=innerHeight,a=W/H;cam.fov=a<1?Math.min(74,2*Math.atan(Math.tan(25*Math.PI/180)/a)*180/Math.PI):48;cam.aspect=a;
 if(a<1)cam.setViewOffset(W,H,0,-Math.round(H*.15),W,H);else cam.setViewOffset(W,H,-Math.round(W*.13),0,W,H);cam.updateProjectionMatrix()}
const V={x:0,z:0,d:120};
function fitD(k,mode){const P=plane(k);const tv=Math.tan(cam.fov*Math.PI/360),asp=cam.aspect;
 if(mode==='contain'){ // la photo entière, dans la partie libre de l'écran
  const fw=PORT()?.92:.6,fh=PORT()?.6:.84;return Math.max(P.w/(2*tv*asp*fw),P.h/(2*tv*fh))}
 const sx=PORT()?1:1.26,sy=PORT()?1.3:1;return Math.min(P.w/(2*tv*asp*sx),P.h/(2*tv*sy))*.985}
function view(o={}){const k=CUR.k;const d=fitD(k,o.mode)/(o.zoom||1);let x=o.x??0,z=o.z??0;
 if(o.mode!=='contain'){const tv=Math.tan(cam.fov*Math.PI/360);const hw=d*tv*cam.aspect,hv=d*tv;const P=CUR;
  const sx=PORT()?0:.26*hw,sy=PORT()?.3*hv:0; // le décalage du cadrage
  x=Math.max(-P.w/2+hw+sx,Math.min(P.w/2-hw+sx,x));z=Math.max(-P.h/2+hv+sy,Math.min(P.h/2-hv-sy*0,z))}
 return {x,z,d}}
let mv=null;
function camTo(o,D=1600){drift=null;const a={...V},b=view(o);if(FAST)D=60;return new Promise(r=>{mv={t0:performance.now(),D,a,b,r}})}
function setCam(o){Object.assign(V,view(o))}
/* pendant la voix, la photo glisse lentement : léger rapprochement vers le point nommé */
let drift=null;
function slow(o,D){const a={...V},b=view(o);drift={t0:performance.now(),D:FAST?60:D,a,b}}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const anims=new Set();
function anim(D,fn){return new Promise(r=>{anims.add({t0:performance.now(),D:FAST?Math.min(D,150):D,fn,r})})}
/* ---------------- le panneau et les étiquettes accrochées aux objets ---------------- */
const tags=new Set();const BARH=()=>46+(parseFloat(getComputedStyle(document.body).getPropertyValue('--sab'))||0);
function anchorScreen(v){const p=v.clone().project(cam);return {x:(p.x+1)/2*innerWidth,y:(1-p.y)/2*innerHeight,ok:p.z<1}}
let PANEL=null,SMALLS=[]; // rectangle du panneau affiché, pour que rien ne passe dessous
const nb=t=>String(t||'').replace(/ ([:;?!»])/g,'\u00a0$1').replace(/« /g,'«\u00a0');
function label(anchor,opts={}){const el=document.createElement('div');el.className='lab'+(opts.big?' big':'')+(opts.dock?' dock':'');el.innerHTML='<div class="h"></div><div class="cards"></div>';ui.appendChild(el);
 const T={el,a:new THREE.Vector3(...anchor),lead:opts.lead!==false,y:null,
  title(h){el.querySelector('.h').textContent=h;return T},
  card(t,s,o={}){const box=el.querySelector('.cards');box.querySelectorAll('.card').forEach(o=>{if(o.dataset.out)return;o.dataset.out=1;o.classList.add('hid');setTimeout(()=>o.remove(),420)});
   if('a' in o){if(o.a){T.a.set(...o.a);T.lead=true}else T.lead=false}T.obj=o.obj||null;if(o.obj)T.lead=true;if(!t&&!s)return T;const c=document.createElement('div');c.className='card'+(o.ko?' ko':o.ok?' ok':'');c.innerHTML=`<p class="t">${nb(t)}</p>`+(s?`<p class="s">${nb(s)}</p>`:'');box.appendChild(c);T.show();return T},
  show(){if(!T.shown){T.shown=1;requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('on')))}return T},
  html(h){el.insertAdjacentHTML('beforeend',h);T.show();return T},
  kill(){el.classList.remove('on');tags.delete(T);setTimeout(()=>el.remove(),460)}};
 tags.add(T);return T}
function small(anchor,txt,opts={}){const el=document.createElement('div');el.className='sml hid';el.textContent=txt;ui.appendChild(el);const T={el,a:new THREE.Vector3(...anchor),dx:opts.dx??14,dy:opts.dy??-40,small:1,kill(){el.classList.add('hid');tags.delete(T);setTimeout(()=>el.remove(),420)}};tags.add(T);requestAnimationFrame(()=>el.classList.remove('hid'));return T}
const hit=(a,b,m=6)=>a.x<b.x+b.w+m&&a.x+a.w+m>b.x&&a.y<b.y+b.h+m&&a.y+a.h+m>b.y;
function layoutTags(){let svg='';const W=innerWidth,H=innerHeight,mob=W<700,bot=H-BARH();PANEL=null;
 // 1. le panneau : toujours au même endroit (colonne de gauche sur ordinateur, haut de l'écran sur téléphone)
 for(const T of tags){if(T.small)continue;if(T.obj)T.obj.getWorldPosition(T.a);if(T.shown){const has=!!T.el.querySelector('.card:not([data-out]),.act,.opt,button');T.el.classList.toggle('on',has)}const w=T.el.offsetWidth,h=T.el.offsetHeight;let x,y;
  if(mob){x=16;y=16}else if(T.el.classList.contains('dock')){x=Math.max(24,Math.round(W*.025));const sb=document.body.classList.contains('subs')?document.getElementById('sub').offsetHeight+20:0;y=bot-24-h-sb}else{x=Math.max(24,Math.round(W*.035));y=Math.max(24,Math.min(bot-24-h,Math.round(H*.14)))}T.el.style.transform=`translate(${x}px,${y}px)`;const r={x,y,w,h};PANEL=r;
  const s=anchorScreen(T.a);
  if(T.lead&&s.ok&&s.x>8&&s.x<W-8&&s.y>8&&s.y<bot-8&&!hit({x:s.x,y:s.y,w:0,h:0},r,10)){
   let lx,ly;if(mob){lx=Math.max(x+24,Math.min(s.x,x+w-24));ly=y+h}else{lx=x+w;ly=Math.max(y+24,Math.min(s.y,y+h-24))}
   svg+=`<line x1="${lx}" y1="${ly}" x2="${s.x}" y2="${s.y}"/><circle cx="${s.x}" cy="${s.y}" r="5"/>`}}
 // 2. les petites étiquettes : à côté de l'objet, jamais l'une sur l'autre, jamais sous le panneau
 const placed=[];SMALLS=placed;
 for(const T of tags){if(!T.small)continue;const s=anchorScreen(T.a);const w=T.el.offsetWidth,h=T.el.offsetHeight;let x=s.x+T.dx-(T.dx<0?w:0),y=s.y+T.dy-h/2;
  x=Math.max(12,Math.min(x,W-12-w));y=Math.max(12,Math.min(y,bot-12-h));let r={x,y,w,h};
  if(PANEL&&hit(r,PANEL)){if(mob)r.y=PANEL.y+PANEL.h+10;else r.x=PANEL.x+PANEL.w+14}
  for(let k=0;k<8&&placed.some(p=>hit(r,p));k++)r.y+=h+6;
  if(r.y+h>bot-8)r.y=bot-8-h;placed.push(r);T.el.style.transform=`translate(${r.x}px,${r.y}px)`;
  T.el.style.visibility=s.ok?'':'hidden';
  if(s.ok){const lx=s.x<r.x?r.x:s.x>r.x+r.w?r.x+r.w:s.x,ly=s.y<r.y?r.y:s.y>r.y+r.h?r.y+r.h:r.y+r.h/2;
   if(Math.hypot(lx-s.x,ly-s.y)>10)svg+=`<line x1="${lx}" y1="${ly}" x2="${s.x}" y2="${s.y}"/>`;svg+=`<circle cx="${s.x}" cy="${s.y}" r="4"/>`}}
 lead.innerHTML=svg}
/* ---------------- repères à cliquer, posés dans la scène ---------------- */
const tgts=new Set();
/* le repère apparaît une fois la consigne lue à l'écran ; s'il est hors champ, il se pose au bord de l'écran avec une flèche vers l'objet */
function target(p,txt,opts={}){return new Promise(res=>{const el=document.createElement('div');el.className='tgt';el.innerHTML='<i></i>'+(txt?`<span>${txt}</span>`:'');ui.appendChild(el);
 const T={el,a:new THREE.Vector3(...p),side:opts.side};tgts.add(T);el.onclick=()=>{if(T.done||!el.classList.contains('live'))return;T.done=1;res(T)};
 setTimeout(()=>el.classList.add('live','first'),FAST?60:(opts.delay??700));
 T.kill=(cls)=>{if(cls){el.classList.add(cls);setTimeout(()=>{el.remove();tgts.delete(T)},900)}else{el.remove();tgts.delete(T)}};if(opts.ref)opts.ref(T)})}
function layoutTgts(){const W=innerWidth,H=innerHeight,bot=H-BARH(),m=52;const placed=SMALLS.slice();
 const list=[...tgts].map(T=>{const v=T.a.clone().project(cam);let x=(v.x+1)/2*W,y=(1-v.y)/2*H;const behind=v.z>1;let edge=null;
  if(behind||x<m||x>W-m||y<m||y>bot-m){const cx=W/2,cy=bot/2;let dx=x-cx,dy=y-cy;if(behind){dx=-dx;dy=-dy}if(Math.abs(dx)+Math.abs(dy)<1)dy=1;
   const s=Math.min((W/2-m)/Math.max(1e-6,Math.abs(dx)),(bot/2-m)/Math.max(1e-6,Math.abs(dy)));x=cx+dx*s;y=cy+dy*s;edge=Math.atan2(dy,dx)}
  placed.push({x:x-28,y:y-28,w:56,h:56,own:T});return {T,x,y,edge}});
 // chaque étiquette prend le premier côté libre : dans l'écran, sans toucher un autre repère ni une autre étiquette
 for(const o of list){const {T,x,y,edge}=o;T.el.style.transform=`translate(${x}px,${y}px)`;T.el.classList.toggle('edge',edge!==null);const ar=T.el.querySelector('i');if(edge!==null)ar.style.transform=`rotate(${edge}rad)`;
  const sp=T.el.querySelector('span');if(!sp)continue;const w=sp.offsetWidth,h=sp.offsetHeight;
  const R={right:{x:x+28,y:y-h/2},left:{x:x-28-w,y:y-h/2},below:{x:x-w/2,y:y+34},above:{x:x-w/2,y:y-34-h}};
  let pref=[];if(edge!==null)pref.push(x>W-m-2?'left':x<m+2?'right':y>bot-m-2?'above':'below');if(T.side)pref.push(T.side);pref.push('right','left','below','above');
  const fits=k=>{const r={...R[k],w,h};if(r.x<6||r.x+w>W-6||r.y<6||r.y+h>bot-4)return false;return !placed.some(p=>p.own!==T&&hit(r,p,4))};
  let k=pref.find(fits);if(!k){const cl=q=>{const r={...R[q],w,h};if(q==='above'||q==='below')r.x+=Math.max(6-r.x,Math.min(0,W-6-(r.x+w)));return r};
   const ok=q=>{const r=cl(q);if(r.y<6||r.y+h>bot-4)return false;return !placed.some(p=>p.own!==T&&hit(r,p,4))};
   k=[T.side,'below','above'].filter(Boolean).find(q=>(q==='above'||q==='below')&&ok(q))||T.side||'below'}const r={...R[k],w,h,own:T};let sh=0;if(k==='above'||k==='below'){sh=Math.max(6-r.x,Math.min(0,W-6-(r.x+w)));r.x+=sh}sp.style.marginLeft=sh?sh+'px':'';placed.push(r);
  T.el.classList.toggle('left',k==='left');T.el.classList.toggle('below',k==='below');T.el.classList.toggle('above',k==='above')}}

/* ---------------- la voix ---------------- */
let curAudio=null;const sub=$('#sub');
// une seule voix réutilisée : sur iPhone et iPad, le son n'est autorisé que sur un lecteur déverrouillé par un clic
const VO=new Audio();VO.preload='auto';let voUnlocked=false;
let unlockPend=false;
const unlock=()=>{if(voUnlocked||FAST||MUET)return;voUnlocked=true;unlockPend=true;try{VO.muted=true;VO.src=AUDIO+'p01.mp3';const p=VO.play();const end=()=>{if(unlockPend){VO.pause();unlockPend=false}VO.muted=false};if(p)p.then(end,end);else end()}catch(e){VO.muted=false}};
addEventListener('pointerdown',unlock,true);addEventListener('click',unlock,true);addEventListener('touchend',unlock,true);
function say(id,hooks=[]){return new Promise(res=>{const L=LINES[id];
 // le sous-titre montre la phrase en cours, pas toute la réplique : il reste court et ne cache pas l'écran
 const who=`<b>${L.w==='X'?'Xavier':'Damienne'}</b> · `,parts=[];{const re=/[^.!?]+[.!?]*\s*/g;let m;while((m=re.exec(L.t)))parts.push([m.index,m[0].trim()])}
 let pi=-1;const showAt=f=>{const c=f*L.t.length;let i=0;while(i+1<parts.length&&parts[i+1][0]<=c)i++;if(i!==pi){pi=i;sub.innerHTML=who+(parts[i]?parts[i][1]:L.t)}};showAt(0);
 const a=FAST?new Audio(AUDIO+id+'.mp3'):VO;if(!FAST){unlockPend=false;a.onended=a.onerror=null;a.pause();a.muted=false;a.src=AUDIO+id+'.mp3';a.playbackRate=1}curAudio=a;if(FAST)a.playbackRate=16;a.muted=FAST;const hs=hooks.slice().sort((x,y)=>x[0]-y[0]);let k=0,done=false;
 const tick=()=>{if(done)return;const d=a.duration||0;const f=d?a.currentTime/d:0;showAt(f);while(k<hs.length&&f>=hs[k][0]){hs[k][1]();k++}requestAnimationFrame(tick)};
 const fin=()=>{if(done)return;done=true;while(k<hs.length){hs[k][1]();k++}setTimeout(res,FAST?20:350);const me=sub.innerHTML;setTimeout(()=>{if(sub.innerHTML===me)sub.innerHTML=''},FAST?50:2500)};
 a.onended=fin;a.onerror=()=>{a.onerror=null;if(!MUET&&!FAST)document.body.classList.add('subs');const ms=Math.max(2500,L.t.length*62);let t0=performance.now();const fake=()=>{const f=(performance.now()-t0)/(FAST?ms/16:ms);showAt(Math.min(f,.999));while(k<hs.length&&f>=hs[k][0]){hs[k][1]();k++}if(f>=1)fin();else requestAnimationFrame(fake)};fake()};
 a.play().then(()=>tick()).catch(()=>{if(a.onerror)a.onerror()})})}
$('#brep').onclick=()=>{if(curAudio){curAudio.currentTime=0;curAudio.play().catch(()=>{})}};

$('#bsub').onclick=()=>document.body.classList.toggle('subs');
{const st=$('#bar .st'),full=st.textContent;const fit=()=>{st.textContent=innerWidth<520&&full.includes(' · ')?full.split(' · ')[0]:full};fit();addEventListener('resize',fit)}
const ETAPE='p';
const hand=()=>{};
/* ---------------- la main orange et le journal, communs à toutes les étapes ---------------- */
// la main se pose sur ce qu'il faut cliquer, seulement quand il n'y a qu'une seule chose à cliquer :
// devant un choix, elle ne montre rien, pour ne pas souffler la réponse
const HAND=document.getElementById('hand');
const CLICK='#navgo .act,#navl.on .act,.tgt.live:not(.ok):not(.ko),#vbtn .act,#vz .qc .act,#vz .qc .ans:not(.off),.lab .act,.lab a.act,.qz .act,.qz .opt:not(.off),.lab .opt:not(.off),.lab .ans:not(.off),#vid .act,#jrn.on .act';
function placeHand(){if(document.getElementById('jrn').classList.contains('on')){const r=document.getElementById('jclose').getBoundingClientRect();HAND.style.transform=`translate(${r.right-16}px,${r.bottom-14}px)`;HAND.classList.add('on');return}
 const W=innerWidth,H=innerHeight;const els=[...document.querySelectorAll(CLICK)].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.bottom>0&&r.top<H&&r.right>0&&r.left<W&&+getComputedStyle(e).opacity>.5&&(!e.closest('#vid')||e.closest('#vid.on'))});
 if(els.length!==1){HAND.classList.remove('on');return}
 const e=els[0],r=e.getBoundingClientRect();let x,y;if(e.classList.contains('tgt')){x=r.left+r.width*.62;y=r.top+r.height*.62}else{x=r.right-16;y=r.bottom-14}
 x=Math.min(x,W-44);y=Math.min(y,H-44);HAND.style.transform=`translate(${x}px,${y}px)`;HAND.classList.add('on')}
// le journal : gardé dans le navigateur pour suivre toute la matinée, d'une étape à l'autre
const JK='permisT-journal',ORD=['p','e1','e2','e3','e4','e5','e5b','e6','e7','e8','e9','e10'];
const JRN=[];
function jload(){try{return JSON.parse(localStorage.getItem(JK)||'{}')}catch(e){return {}}}
function jlog(h,t){JRN.push([h,t]);try{const a=jload();a[ETAPE]=JRN;localStorage.setItem(JK,JSON.stringify(a))}catch(e){}}
const errTxt=n=>n?` (${n} erreur${n>1?'s':''})`:' (sans erreur)';
function jhtml(all=true){const a=all?jload():{};a[ETAPE]=JRN;const rows=[];ORD.forEach(k=>(a[k]||[]).forEach(e=>rows.push(e)));
 return rows.length?rows.map(e=>`<li><b>${e[0]}</b>${nb(e[1])}</li>`).join(''):'<li class="e">Rien pour l\'instant : chaque décision de la matinée s\'inscrira ici, avec l\'heure.</li>'}
(()=>{const b=document.createElement('button');b.id='bjrn';b.textContent='Journal';const bar=document.getElementById('bar');bar.insertBefore(b,document.getElementById('bsub'));
 b.onclick=()=>{document.getElementById('jlist').innerHTML=jhtml();document.getElementById('jrn').classList.add('on')};
 document.getElementById('jclose').onclick=()=>document.getElementById('jrn').classList.remove('on')})();

function resize(){R.setSize(innerWidth,innerHeight,false);setFov();if(CUR)Object.assign(V,view({x:V.x,z:V.z}))}
addEventListener('resize',resize);resize();
function frame(now){requestAnimationFrame(frame);
 if(mv){const t=Math.max(0,Math.min(1,(now-mv.t0)/mv.D)),e=ease(t);V.x=mv.a.x+(mv.b.x-mv.a.x)*e;V.z=mv.a.z+(mv.b.z-mv.a.z)*e;V.d=mv.a.d*Math.pow(mv.b.d/mv.a.d,e);if(t>=1){const r=mv.r;mv=null;r()}}
 else if(drift){const t=Math.max(0,Math.min(1,(now-drift.t0)/drift.D));const e=t*t*(3-2*t);V.x=drift.a.x+(drift.b.x-drift.a.x)*e;V.z=drift.a.z+(drift.b.z-drift.a.z)*e;V.d=drift.a.d*Math.pow(drift.b.d/drift.a.d,e);if(t>=1)drift=null}
 for(const A of [...anims]){const t=Math.max(0,Math.min(1,(now-A.t0)/A.D));A.fn(t);if(t>=1){anims.delete(A);A.r()}}
 cam.position.set(V.x,V.d,V.z);cam.lookAt(V.x,0,V.z);
 layoutTags();layoutTgts();placeHand();
 // la scène 3D n'est redessinée que si on la voit (sinon les animations de l'écran ralentissent sur les postes lents)
 if(!(VZ.classList.contains('on')&&!VZ.classList.contains('clear')))R.render(scene,cam)}
requestAnimationFrame(frame);
/* ---------------- outils des écrans ---------------- */
const at=(id,frac,fn)=>[frac,fn];
const dur=id=>Math.max(5000,LINES[id].t.length*62);
// une voix avec la photo qui glisse doucement vers un point
async function sayS(id,hooks=[],o=null){if(o)slow(o,dur(id));else if(!mv&&CUR){const D=FAST?60:dur(id);drift={t0:performance.now(),D,a:{...V},b:{x:V.x,z:V.z,d:V.d/1.05}}}await say(id,hooks);drift=null}
// le bouton qui fait avancer : la voix s'est tue, c'est à l'apprenant
async function cont(L,txt='Continuer'){const id='c'+Math.random().toString(36).slice(2,7);L.html(`<button class="act" id="${id}">${txt}</button>`);const b=$('#'+id);hand(b);await new Promise(r=>b.onclick=r);hand(null);b.remove()}
let prog=0;const NSTEP=13;function step(){prog++;$('#prog').style.width=(prog/NSTEP*100)+'%'}
/* ---------------- les visuels ---------------- */
const VZ=$('#vz'),HD=$('#hd'),VB=$('#vbtn');
function head(k,t){HD.innerHTML=`<p class="k">${nb(k)}</p><p class="t">${nb(t)}</p>`;HD.classList.add('on')}
function headOff(){HD.classList.remove('on')}
function vz(html){VZ.innerHTML=`<div class="stage">${html}</div>`;VZ.classList.add('on')}
async function vzOff(){VZ.classList.remove('on');headOff();await wait(FAST?0:500);VZ.innerHTML=''}
// montre ce que la voix nomme ; avec focus, le reste s'estompe (le projecteur)
function show(sel,focus=false){const els=[...VZ.querySelectorAll(sel)];els.forEach(e=>e.classList.add('in'));if(focus)VZ.querySelectorAll('.it.in').forEach(e=>e.classList.toggle('dim',!els.includes(e)))}
function undim(){VZ.querySelectorAll('.it').forEach(e=>e.classList.remove('dim'))}
function countTo(sel,to,D,fmt){const el=VZ.querySelector(sel);if(!el)return;const t0=performance.now();const D2=FAST?50:D;const f=()=>{const u=Math.min(1,(performance.now()-t0)/D2);el.textContent=fmt(to*(1-Math.pow(1-u,3)));if(u<1)requestAnimationFrame(f)};f()}
function lightSeq(sel,D){const els=[...VZ.querySelectorAll(sel)];els.forEach((e,i)=>setTimeout(()=>e.classList.add('on'),FAST?0:i*D/els.length))}
async function contV(txt='Continuer'){VB.innerHTML=`<button class="act">${txt}</button>`;const b=VB.querySelector('button');b.style.pointerEvents='auto';await new Promise(r=>b.onclick=r);VB.innerHTML=''}
const IC={
 clock:'<svg class="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><path d="M24 13v11l8 5"/></svg>',
 voices:'<svg class="ic" viewBox="0 0 48 48"><circle cx="16" cy="17" r="6"/><circle cx="33" cy="17" r="6"/><path d="M5 38c1-7 5-11 11-11s10 4 11 11M23 38c1-7 4-11 10-11s9 4 10 11"/></svg>',
 phone:'<svg class="ic" viewBox="0 0 48 48"><path d="M15 6l6 9-4 4c2 5 6 9 11 11l4-4 9 6-3 7c-17 0-31-14-31-31z"/></svg>',
 laptop:'<svg class="ic" viewBox="0 0 48 48"><rect x="9" y="10" width="30" height="20" rx="2"/><path d="M4 36h40l-3 4H7z"/><path d="M19 20l4 4 7-7"/></svg>',
 quiz:'<svg class="ic" viewBox="0 0 48 48"><rect x="8" y="7" width="32" height="34" rx="4"/><path d="M15 17h18M15 25h18M15 33h10"/><path d="M33 31l3 3 6-7"/></svg>',
 journal:'<svg class="ic" viewBox="0 0 48 48"><path d="M11 6h24a3 3 0 013 3v33H14a3 3 0 01-3-3z"/><path d="M17 15h14M17 22h14M17 29h9"/><circle cx="36" cy="36" r="7"/><path d="M36 32v4l3 2"/></svg>',
 hand:'<svg class="ic" viewBox="0 0 48 48" style="stroke:#fff;stroke-width:2.4;fill:#E94E1B"><path d="M19 4c2 0 3.5 1.6 3.5 3.6V20l1.6-.4c2-.4 3.8.9 4.1 2.8l.1.6 1.4-.3c1.9-.3 3.6.9 4 2.7l.1.5 1-.2c2-.3 3.8 1.1 4 3.1l.6 7.4c.4 4.6-2.6 8.8-7 10l-3.8 1c-4.2 1.1-8.6-.5-11.1-4L9 33.6c-1-1.5-.7-3.5.7-4.6 1.4-1.1 3.4-.9 4.6.4l1.2 1.3V7.6C15.5 5.6 17 4 19 4z"/></svg>',
 card:'<svg class="ic" viewBox="0 0 48 48"><rect x="5" y="11" width="38" height="26" rx="3"/><circle cx="16" cy="22" r="4"/><path d="M10 31c1-3 3-4 6-4s5 1 6 4M27 19h11M27 25h11M27 31h7"/></svg>',
 loop:'<svg class="ic" viewBox="0 0 48 48"><path d="M38 20A15 15 0 0011 15M10 28a15 15 0 0027 5"/><path d="M11 7v8h8M37 41v-8h-8"/></svg>',
 pin:'<svg class="ic" viewBox="0 0 48 48"><path d="M24 43s13-12 13-23a13 13 0 00-26 0c0 11 13 23 13 23z"/><circle cx="24" cy="20" r="5"/></svg>',
 warn:'<svg class="ic" viewBox="0 0 48 48"><path d="M24 6l20 35H4z"/><path d="M24 19v10M24 35v1"/></svg>',
 shield:'<svg class="ic" viewBox="0 0 48 48"><path d="M24 5l16 6v12c0 10-7 17-16 20C15 40 8 33 8 23V11z"/><path d="M17 24l5 5 9-10"/></svg>',
 bell:'<svg class="ic" viewBox="0 0 48 48"><path d="M12 34h24l-3-5V20a9 9 0 00-18 0v9z"/><path d="M20 38a4 4 0 008 0"/></svg>',
 leaf:'<svg class="ic" viewBox="0 0 48 48"><path d="M9 39C9 18 22 8 40 8c0 19-10 31-31 31z"/><path d="M9 39l17-17"/></svg>',
 cal:'<svg class="ic" viewBox="0 0 48 48"><rect x="7" y="10" width="34" height="30" rx="3"/><path d="M7 19h34M16 6v8M32 6v8"/></svg>',
 cone:'<svg class="ic" viewBox="0 0 48 48"><path d="M20 7h8l9 32H11z"/><path d="M15 25h18M17 17h14M6 41h36"/></svg>',
 route:'<svg class="ic" viewBox="0 0 48 48"><circle cx="10" cy="36" r="4"/><circle cx="38" cy="12" r="4"/><path d="M14 36h12a6 6 0 000-12h-4a6 6 0 010-12h12"/></svg>',
 user2:'<svg class="ic" viewBox="0 0 48 48"><circle cx="17" cy="15" r="6"/><path d="M6 40c1-8 5-12 11-12s10 4 11 12"/><circle cx="34" cy="17" r="5"/><path d="M30 28c6 0 10 4 11 11"/></svg>'};
/* ---------------- activités communes ---------------- */
// une voix avec ses cartes : chaque carte arrive quand la voix en parle
async function info(L,id,cards=[],o=null){await sayS(id,cards.map(c=>at(id,c[0],()=>L.card(c[1],c[2]||'',c[3]||{}))),o)}
// les réponses arrivent l'une après l'autre ; la mauvaise reste marquée, la bonne est montrée ; un retour explique
async function pick(L,opts,goodKey,okT,koT,nextTxt,o={}){const w=document.createElement('div');w.style.pointerEvents='auto';(o.host||L.el).appendChild(w);
 const bs=opts.map(([k,t])=>{const b=document.createElement('button');b.className='ans';b.dataset.b=k;b.innerHTML=nb(t);b.style.opacity=0;w.appendChild(b);return b});
 for(const b of bs){await wait(FAST?0:260);b.style.transition='opacity .35s';b.style.opacity=1}
 let errs=0;const fb=document.createElement('p');fb.className='fb';w.appendChild(fb);
 for(;;){const p=await new Promise(r=>bs.forEach(x=>{if(!x.classList.contains('off'))x.onclick=()=>r(x)}));const good=p.dataset.b===goodKey;
  if(good||!o.retry){bs.forEach(x=>{x.classList.add('off');x.onclick=null;if(x.dataset.b===goodKey)x.classList.add('ok');else if(x===p)x.classList.add('ko')});
   if(!good)errs++;fb.className='fb '+(good?'ok':'ko');
   fb.innerHTML=good?nb(okT):(o.once?(o.x&&typeof koT==='object'&&koT[p.dataset.b]?`<b>${nb('Réponse attendue : '+lbOf(opts,goodKey)+'.')}</b> <span class="xp">${nb(xclean(koT[p.dataset.b]))}</span>`:xko(lbOf(opts,goodKey),okT)):nb(typeof koT==='object'?(koT[p.dataset.b]||koT._):koT));
   if(o.onDone)o.onDone(good,errs);break}
  errs++;p.classList.add('off','ko');p.onclick=null;fb.className='fb ko';fb.innerHTML=nb(typeof koT==='object'?(koT[p.dataset.b]||koT._):koT);if(o.onErr)o.onErr(p.dataset.b)}
 const nx=document.createElement('button');nx.className='act';nx.textContent=nextTxt;w.appendChild(nx);await new Promise(r=>nx.onclick=r);w.remove();return (o.retry||o.once)?errs:errs===0}
// classer : chaque élément, puis le choix parmi les catégories
async function sortAct(L,items,buckets,label='Élément'){let n=0;
 for(let i=0;i<items.length;i++){const it=items[i];L.card(`${label} ${i+1} sur ${items.length}`,it.t);
  if(await pick(L,buckets,it.b,it.ok,it.ko,i<items.length-1?'Suivant':'Continuer'))n++}
 return n}
const nbr=(n,t)=>`${n} bonne${n>1?'s':''} réponse${n>1?'s':''} sur ${t}`;

/* ---------------- questions intermédiaires (consigne d'exploitation n°3, §5.1.1.2) ----------------
   Une seule réponse par question, et chaque réponse est expliquée, juste ou fausse.
   Une série conditionne la suite : sous le seuil, on revoit la partie concernée, puis la série revient, dans un autre ordre. */
// ?serie2 : tester la seconde série
const SEUIL=0.8,TRY=Q.has('serie2')?new Proxy({},{get:(t,k)=>k in t?t[k]:1}):{};const needOf=n=>Math.ceil(n*80/100); // 80 % au moins : le seuil de la consigne d'exploitation n°3
const lbOf=(opts,k)=>{const o=opts.find(x=>x[0]===k);return o?String(o[1]).replace(/[.\s]+$/,''):''};
const xclean=t=>String(t||'').replace(/^(Oui|Exactement|Bien vu|C'est ça|Bonne réponse|Juste|Bravo|Vrai|Faux|Pas celui-ci|Pas celle-ci|Pas là|Pas tout à fait)\s*[.,:!]?\s*/i,'').replace(/^./,c=>c.toUpperCase());
const xko=(lbl,ok)=>{let t=xclean(ok);const l=String(lbl).toLowerCase();if(t.toLowerCase().startsWith(l)&&/^\s*[:.]/.test(t.slice(l.length)))t=xclean(t.slice(l.length).replace(/^\s*[:.]\s*/,''));return `<b>${nb('Réponse attendue : '+lbl+'.')}</b>${t?` <span class="xp">${nb(t)}</span>`:''}`};
const ALT={};const alt=(id,a,b)=>{if(b)ALT[id]=1;return mix(id,b&&(TRY[id]||0)%2?b:a)};
function mix(id,a){if(!TRY[id])return a;const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
async function gate(id,E,n,back,what){const ok=Math.max(0,n-E),need=needOf(n);TRY[id]=(TRY[id]||0)+1;
 const h=(JRN[JRN.length-1]||[''])[0];
 if(ok>=need||Q.has('pass')){jlog(h,`${what} : série validée, ${ok} sur ${n}`);return null}
 jlog(h,`${what} : ${ok} sur ${n}, il en faut ${need}. Partie revue, puis série reposée`);
 vue(`<div class="hero">${typeof bigIc==='function'?bigIc('quiz'):''}<p class="cap">${nb(`${ok} bonne${ok>1?'s':''} réponse${ok>1?'s':''} sur ${n}`)}</p><p class="sub">${nb(`Il en faut au moins ${need} pour passer à la suite : 80 %, le seuil de la consigne d'exploitation n°3. Vous revoyez la partie, puis ${ALT[id]?'une nouvelle série vous attend':'la série revient, dans un autre ordre'}.`)}</p></div>`);
 await contV('Revoir la partie');return {goto:back}}
/* ---------------- navigation libre : ?nav ouvre la liste des écrans, ?nav&s=N démarre à l'écran N ---------------- */
const NAV=Q.has('nav');let NAVI=0;
function navUrl(i){const q=new URLSearchParams(location.search);q.set('nav','');q.set('s',i);return location.pathname+'?'+q.toString().replace('nav=&','nav&').replace(/nav=$/,'nav')}
async function runSeq(seq){let start=0;
 if(NAV){document.body.classList.add('nav');start=Math.max(0,Math.min(seq.length-1,+(Q.get('s')||0)));
  const b=document.createElement('button');b.textContent='Écrans';const bar=document.getElementById('bar');bar.insertBefore(b,bar.querySelector('.sp').nextSibling);
  const nl=document.createElement('div');nl.id='navl';document.body.appendChild(nl);
  b.onclick=()=>{nl.innerHTML=`<div class="box"><p class="n" style="font-weight:600;color:var(--pierre);margin:0">Navigation libre</p><p style="font-weight:700;font-size:var(--A);margin:4px 0 0">Les écrans de la page</p><ol>${seq.map((x,i)=>`<li class="${i===NAVI?'cur':''}"><a href="${navUrl(i)}">${nb(x[0])}</a></li>`).join('')}</ol><button class="act" id="navx">Fermer</button></div>`;nl.classList.add('on');document.getElementById('navx').onclick=()=>nl.classList.remove('on')};
  const nx=document.createElement('button');nx.textContent=innerWidth<560?'Suivant ›':'Écran suivant ›';bar.insertBefore(nx,b.nextSibling);nx.onclick=()=>{if(NAVI<seq.length-1)location.href=navUrl(NAVI+1)};
  if(start>0){const g=document.createElement('div');g.id='navgo';g.innerHTML=`<div class="box"><p style="font-weight:600;color:var(--pierre);margin:0">Écran ${start+1} sur ${seq.length}</p><p style="font-weight:700;font-size:var(--A);margin:6px 0 0">${nb(seq[start][0])}</p><button class="act">Lancer l'écran</button></div>`;document.body.appendChild(g);
   await new Promise(r=>g.querySelector('button').onclick=r);g.remove()}}
 let r=null;for(let i=start;i<seq.length;i++){NAVI=i;r=await seq[i][1](r);if(r&&r.goto!=null){i=r.goto-1;r=null}}}
/* ---------------- Préambule et introduction (diapos 1 à 18) ----------------
   Une idée par plan, en plein cadre ; le plan suivant arrive en fondu quand la voix passe à l'idée suivante.
   Les questions se posent sur le visuel lui-même : les frises du candidat, le film des aérogares. */
document.head.insertAdjacentHTML('beforeend',`<style>
#vz .stage.fr{opacity:0;transition:opacity .6s ease}#vz .stage.fr.in{opacity:1}
#vz.clear{background:transparent}
.hero{display:flex;flex-direction:column;align-items:center;text-align:center;gap:clamp(8px,1.8vh,20px);width:100%;max-width:1100px}
.hero .cap{font-weight:700;font-size:clamp(26px,2.8vw,44px);line-height:1.12;margin:0;max-width:26ch}
.hero .sub{font-size:clamp(17px,1.5vw,23px);line-height:1.42;max-width:46ch;color:#33475b;margin:0}
.hic{width:clamp(96px,11vw,170px)!important;height:clamp(96px,11vw,170px)!important;stroke-width:1.6}
.huge{font-weight:800;font-size:clamp(84px,14vw,220px);line-height:.9;letter-spacing:-.02em;color:var(--marine);font-variant-numeric:tabular-nums;margin:0}
.huge.tel{font-size:clamp(44px,8vw,124px);letter-spacing:0}
.road{display:flex;align-items:center;justify-content:center;width:min(1000px,100%)}
.road i{flex:none;width:clamp(28px,5.4vw,70px);height:clamp(28px,5.4vw,70px);border-radius:50%;border:3px solid #b9c3cb;background:#fff;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:700;font-size:clamp(13px,1.5vw,22px);color:#8a96a0;opacity:0;transform:scale(.6);transition:all .45s}
.road i.in{opacity:1;transform:none}.road i.done{background:var(--marine);border-color:var(--marine);color:#fff}
.road i.open{border-color:var(--marine);color:var(--marine);box-shadow:0 0 0 6px rgba(38,60,82,.16)}.road i.lock{border-style:dashed;opacity:.55}
.road b{flex:1;height:3px;background:#b9c3cb;min-width:2px;transition:background .4s}.road b.done{background:var(--marine)}
.duo{display:flex;gap:clamp(28px,6vw,96px);justify-content:center}
.duo .pp{display:flex;flex-direction:column;align-items:center;gap:12px}
.duo .av{width:clamp(110px,13vw,190px);height:clamp(110px,13vw,190px);border-radius:50%;background:#fff;box-shadow:0 8px 28px rgba(38,60,82,.14);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:clamp(46px,6vw,84px);color:var(--marine);transition:box-shadow .4s}
.duo .pp.talk .av{box-shadow:0 0 0 7px var(--marine),0 8px 28px rgba(38,60,82,.14)}
.duo .nm{font-weight:700;font-size:var(--A)}
.dwrap{position:relative;display:inline-block;margin:clamp(10px,3vh,30px) 0}
.demo{display:inline-flex;align-items:center;padding:clamp(14px,1.6vw,20px) clamp(26px,3vw,40px);border-radius:999px;background:var(--orangeV);color:#fff;font:700 clamp(20px,2vw,30px)/1 Barlow,system-ui,sans-serif}
.dwrap svg{position:absolute;right:-30px;bottom:-34px;width:clamp(58px,6vw,84px);height:auto;animation:hd 1.1s ease-in-out infinite}
.qpic{background:#fff;border-radius:18px;box-shadow:0 8px 28px rgba(38,60,82,.14);padding:clamp(18px,2vw,28px);width:min(540px,100%);display:flex;flex-direction:column;gap:12px;text-align:left}
.qpic .qq{height:14px;border-radius:7px;background:#c9d1d7;width:78%;margin-bottom:6px}
.qpic .op{display:flex;align-items:center;gap:14px;padding:13px 16px;border:2px solid var(--orangeV);border-radius:12px;font-weight:700;font-size:var(--B);color:var(--marine);transition:all .35s;min-height:52px}
.qpic .op span{flex:1;height:10px;border-radius:5px;background:#d5dce1}.qpic .op em{font-style:normal}
.qpic .op.ko{background:var(--orangeV);border-color:var(--orangeV);color:#fff}.qpic .op.ok{background:var(--vert);border-color:var(--vert);color:#fff}
.qpic .op.ko span,.qpic .op.ok span{background:rgba(255,255,255,.45)}
.qpic .msg{font-weight:600;font-size:var(--B);min-height:1.4em;margin:2px 0 0}
.chain{display:flex;align-items:stretch;justify-content:center;width:100%;max-width:1120px}
.chain .nd{flex:1;background:#fff;border-radius:18px;box-shadow:0 8px 28px rgba(38,60,82,.12);padding:clamp(22px,2.4vw,32px) clamp(14px,1.6vw,24px);text-align:center;position:relative;display:flex;flex-direction:column;align-items:center;gap:6px}
.chain .nd .k{font-weight:800;font-size:clamp(30px,3.4vw,54px);line-height:1;margin:4px 0}
.chain .nd .lb{margin:4px 0 2px}
.chain .ar{flex:none;width:clamp(30px,4vw,64px);display:flex;align-items:center;justify-content:center}
.chain .ar svg{width:100%;height:28px;stroke:var(--marine);stroke-width:3;fill:none}
.pin{position:absolute;top:-15px;left:50%;transform:translateX(-50%);background:var(--marine);color:#fff;font-weight:700;padding:5px 14px;border-radius:999px;white-space:nowrap;font-size:var(--B)}
.xb{text-align:center;margin-top:clamp(18px,4vh,40px)}
.two{display:flex;gap:clamp(26px,4vw,70px);align-items:center;justify-content:center;width:100%}
.lic{flex:none;width:clamp(230px,26vw,360px);aspect-ratio:1.586;border-radius:16px;border:3px solid var(--marine);background:#fff;box-shadow:0 8px 28px rgba(38,60,82,.14);padding:14px 16px;display:grid;grid-template-columns:34% 1fr;grid-template-rows:auto 1fr;gap:10px 14px}
.lic .tt{grid-column:1/3;margin:-14px -16px 0;padding:10px 16px;border-radius:13px 13px 0 0;background:var(--marine);color:#fff;font-weight:800;letter-spacing:.08em;font-size:clamp(12px,1.1vw,16px)}.lic .cat{align-self:flex-start;border:2px solid var(--marine);border-radius:6px;padding:2px 8px;font-weight:700;font-size:13px;color:var(--marine)}
.lic .ph{border-radius:8px;background:#e7eaea;border:2px solid var(--marine);display:flex;align-items:flex-end;justify-content:center;overflow:hidden}
.lic .ph svg{width:80%;fill:var(--marine)}
.lic .ls{display:flex;flex-direction:column;justify-content:center;gap:10px}.lic .ls i{height:3px;border-radius:2px;background:var(--marine);opacity:.55}
.conds{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:clamp(12px,2vh,22px);max-width:560px;text-align:left}
.conds li{display:flex;gap:16px;align-items:flex-start;font-size:clamp(18px,1.6vw,25px);font-weight:600;line-height:1.25}
.conds li b{flex:none;width:clamp(34px,3vw,44px);height:clamp(34px,3vw,44px);border-radius:50%;background:var(--marine);color:#fff;display:flex;align-items:center;justify-content:center;font-size:.8em}
.conds li small{display:block;font-weight:400;font-size:.78em;color:#33475b;margin-top:3px}
.ttl{font-weight:700;font-size:clamp(24px,2.4vw,38px);line-height:1.12;margin:0 0 clamp(14px,3vh,28px);text-align:left}
.sq21{display:grid;grid-template-columns:repeat(7,1fr);gap:clamp(6px,.8vw,10px);width:min(430px,78vw)}
.sq21 i{aspect-ratio:1;border-radius:8px;border:2px solid #b9c3cb;background:#fff;transition:all .3s}.sq21 i.on{background:var(--marine);border-color:var(--marine)}
.axes{display:flex;flex-direction:column;gap:clamp(30px,6vh,60px);width:100%;max-width:1040px;margin:0 auto}
.ax{position:relative;width:100%}
.ax .tl{font-weight:700;font-size:var(--B);color:var(--pierre);margin:0 0 clamp(44px,6.4vh,60px)}
.ax .tr{position:relative;height:clamp(30px,4.6vh,44px);background:#dfe5e9;border-radius:10px}
.ax .sg{position:absolute;top:0;bottom:0;border-radius:10px;transform-origin:left center;transform:scaleX(0);transition:transform 1.3s ease,box-shadow .4s;display:flex;align-items:center;padding:0 14px;overflow:hidden}
.ax .sg.in{transform:none}.ax .sg.hl{box-shadow:0 0 0 5px rgba(38,60,82,.3)}
.ax .sg span{color:#fff;font-weight:700;font-size:var(--B);white-space:nowrap}.ax .sg .sh{display:none}.ax br.ph{display:none}.ax .sg.js span:after{content:" · jamais seul"}
.ax .fl{position:absolute;bottom:calc(100% + 8px);font-weight:700;font-size:var(--B);line-height:1.2;white-space:nowrap;opacity:0;transition:opacity .5s}
.ax .fl.in{opacity:1}.ax .fl.r{transform:translateX(-100%);text-align:right}.ax .fl.c{transform:translateX(-50%);text-align:center;white-space:normal;width:max-content;max-width:46%}
.ax .tk{position:absolute;top:calc(100% + 8px);transform:translateX(-50%);font-weight:800;font-size:clamp(17px,1.6vw,24px);white-space:nowrap;opacity:0;transition:opacity .5s}
.ax .tk.in{opacity:1}.ax .tk:before{content:"";position:absolute;left:50%;top:-9px;width:2px;height:8px;background:var(--marine)}
.ax .nt{margin:clamp(42px,6vh,54px) 0 0;font-size:var(--B);line-height:1.4;color:#33475b;opacity:0;transition:opacity .5s}.ax .nt.in{opacity:1}
.ax .chip{position:absolute;top:50%;transform:translate(-50%,-50%);background:#fff;color:var(--marine);font-weight:800;font-size:var(--B);padding:4px 12px;border-radius:999px;box-shadow:0 2px 10px rgba(38,60,82,.2);opacity:0;transition:opacity .4s;white-space:nowrap}
.ax .chip.in{opacity:1}
.mk{position:absolute;top:0;bottom:0;width:5px;margin-left:-2px;border-radius:3px;background:var(--orangeV);z-index:2;transition:left .6s ease,background .3s}
.mk.ok{background:var(--marine)}
.vfw .nt{display:none}.vfw{display:grid;grid-template-columns:1.35fr 1fr;gap:clamp(28px,3.5vw,56px);align-items:center;width:100%}
.qc{background:#fff;border-radius:16px;box-shadow:0 8px 28px rgba(38,60,82,.14);padding:clamp(18px,2vw,26px);pointer-events:auto;text-align:left}
.qc .n{font-weight:600;font-size:var(--B);color:var(--pierre);margin:0 0 6px}.qc .q{font-weight:700;font-size:var(--A);line-height:1.18;margin:0}
.qc .ans{pointer-events:auto;display:block;width:100%;text-align:left;margin-top:10px;padding:12px 16px;border:2px solid var(--orangeV);border-radius:12px;background:#fff;color:var(--marine);font:600 var(--B)/1.25 Barlow,system-ui,sans-serif;cursor:pointer}
.qc .ans.ok{border-color:var(--vert);background:var(--vert);color:#fff}.qc .ans.ko{border-color:var(--orangeV);background:var(--orangeV);color:#fff}
.qc .ans.off{cursor:default;opacity:.55}.qc .ans.off.ok,.qc .ans.off.ko{opacity:1}.qc .fb{margin:10px 0 0}.qc .fb:empty{display:none}.qc .act{margin-top:14px}
.obj{display:grid;grid-template-columns:auto 1fr;gap:clamp(22px,3.4vw,56px);align-items:center;width:100%;max-width:1000px;text-align:left;margin:0 auto}
.obj .no{width:clamp(110px,13vw,190px);height:clamp(110px,13vw,190px);border-radius:50%;background:var(--marine);color:#fff;font-weight:800;font-size:clamp(64px,8vw,116px);display:flex;align-items:center;justify-content:center}
.obj .cap{font-weight:700;font-size:clamp(28px,3vw,46px);line-height:1.1;margin:0 0 12px}.obj .sub{font-size:clamp(18px,1.6vw,25px);line-height:1.42;color:#33475b;margin:0;max-width:40ch}
.pips{display:flex;gap:12px;justify-content:center;margin-top:clamp(26px,5vh,50px)}.pips i{width:14px;height:14px;border-radius:50%;background:#b9c3cb}.pips i.on{background:var(--marine)}
.chk{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:clamp(14px,2.6vh,26px);max-width:900px;text-align:left}
.chk li{display:flex;gap:18px;align-items:center;font-size:clamp(20px,2vw,31px);font-weight:600;line-height:1.2}
.chk li b{flex:none;width:clamp(40px,3.6vw,54px);height:clamp(40px,3.6vw,54px);border-radius:50%;border:3px solid #c9d1d7;display:flex;align-items:center;justify-content:center;transition:background .4s}
.chk li b svg{width:60%;stroke:#fff;stroke-width:3.4;fill:none;opacity:0;transition:opacity .3s}.chk li.on b{background:var(--marine);border-color:var(--marine)}.chk li.on b svg{opacity:1}
.chk li.last{font-weight:400;color:#33475b}
.permis{width:min(980px,100%)}.permis ol{grid-auto-flow:column;grid-template-rows:repeat(5,auto)}.permis li{font-size:clamp(16px,1.45vw,21px)}.permis li.pk{pointer-events:auto;cursor:pointer;border-radius:8px;padding:3px 6px;margin:-3px -6px}.permis li.ko{color:var(--orange)}.permis li.ko b{border-color:var(--orangeV);color:var(--orange)}.permis li.ok{color:var(--vert);font-weight:700}.permis li.ok b{background:var(--vert);border-color:var(--vert);color:#fff}.permis li{color:#5d6b78}.permis li b{color:#5d6b78;border-color:#9aa5ae}
.permis li.now b,.permis li.tick b{background:var(--marine);border-color:var(--marine);color:#fff}
.permis li.tick b{font-size:0}.permis li.tick b:after{content:"";width:7px;height:13px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg) translate(-1px,-2px)}
.permis .T{transition:box-shadow .5s}.permis .T.lit{box-shadow:0 0 0 8px rgba(38,60,82,.18)}
.demo2{font-weight:700;font-size:var(--B);color:var(--pierre);text-align:center;margin:12px 0 0;opacity:0;transition:opacity .4s}.demo2.in{opacity:1}
.mapc{background:#fff;border-radius:18px;box-shadow:0 8px 28px rgba(38,60,82,.14);padding:clamp(10px,1.4vw,18px);width:min(560px,100%)}
.mapc svg{width:100%;height:auto;display:block}
.chips{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;max-width:900px}
.chips span{background:rgba(255,255,255,.82);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);border-radius:999px;padding:12px 22px;font-weight:700;font-size:clamp(18px,1.7vw,26px);box-shadow:0 6px 20px rgba(38,60,82,.2)}
.capw{background:rgba(255,255,255,.8);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);border-radius:16px;padding:14px 26px;box-shadow:0 6px 24px rgba(38,60,82,.16)}
#vid video{width:min(760px,100%)!important}#vbtn .act.alt{background:#fff;color:var(--orange);box-shadow:inset 0 0 0 2px var(--orangeV);margin-right:12px}
.jcard{background:#fff;border-radius:16px;box-shadow:0 8px 28px rgba(38,60,82,.12);padding:18px 22px;width:min(760px,100%);text-align:left;margin:clamp(14px,3vh,26px) auto 0}
.jcard .lb{margin:0 0 4px}.jcard .tx{max-width:none;margin:0 0 6px}
.clock{display:inline-block;background:var(--marine);color:#fff;font-weight:800;font-size:var(--A);padding:8px 18px;border-radius:999px}
/* le film : sur ordinateur en plein cadre, sur téléphone en bas de l'écran, sous le panneau */
#film{position:fixed;left:0;top:0;z-index:2;object-fit:cover;opacity:0;transition:opacity .7s;background:var(--ciel);pointer-events:none}
.ftag{position:fixed;left:0;top:0;z-index:4;pointer-events:none;opacity:0;transition:opacity .45s}
.ftag.in{opacity:1}
.ftag i{position:absolute;left:-8px;top:-8px;width:16px;height:16px;border-radius:50%;background:var(--marine);border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3)}
.ftag span{position:absolute;left:16px;top:-18px;white-space:nowrap;font-weight:700;font-size:var(--B);background:#fff;color:var(--marine);padding:6px 12px;border-radius:999px;box-shadow:0 2px 10px rgba(38,60,82,.25);transition:background .35s,color .35s}
.ftag.lit span{background:var(--marine);color:#fff}
.ftag.l span{left:auto;right:16px}
body>.tgt{position:fixed;z-index:8}body>.tgt.ko{opacity:.75}body>.tgt.ko::after{content:"✕";inset:14px;background:none;color:#fff;font:800 18px/28px Barlow,system-ui,sans-serif;text-align:center}
#t2p{position:fixed;left:0;right:0;top:0;bottom:calc(46px + env(safe-area-inset-bottom));z-index:2;display:flex;justify-content:center;align-items:flex-start;padding:max(40px,8vh) 24px 0;background:rgba(231,234,234,.96);opacity:0;transition:opacity .5s;pointer-events:none}
#t2p.on{opacity:1}
#t2p .win{width:min(1240px,100%);overflow:hidden;padding:clamp(34px,4vw,56px) clamp(20px,3vw,44px);border-radius:14px;box-shadow:0 8px 28px rgba(38,60,82,.16);background:#fff}
#t2p .pan{position:relative;width:100%;transition:transform 1.4s ease}#t2p img{display:block;width:100%}
#t2p .ring{position:absolute;width:8.6%;aspect-ratio:1;border-radius:50%;border:5px solid var(--marine);transform:translate(-50%,-50%) scale(.6);opacity:0;transition:all .45s}
#t2p .ring.on{opacity:1;transform:translate(-50%,-50%)}#t2p .ring.past{border-width:3px;border-color:var(--pierre)}
.lab.dock{width:min(430px,34vw)}
#vz .stage{align-items:flex-start}#vz .stage>*{margin-top:auto;margin-bottom:auto}
#vz .stage.vb{bottom:clamp(118px,17vh,140px)}
body.subs #vz .stage,body.subs #vz .stage.vb{bottom:150px}
.vfw .ax .fl .lg,.vfw .ax .sg .lg{display:none}.vfw .ax .fl .sh,.vfw .ax .sg .sh{display:inline}.vfw .ax .tl{margin-bottom:64px}.vfw #xbf1{max-width:48%}.vfw #xbf2{left:100%!important;transform:translateX(-100%);text-align:right;max-width:30%}
.permis li.pk{border:2px solid var(--orangeV)!important;padding:6px 8px!important;margin:0!important;background:#fff}
@media (hover:hover){.permis li.pk:hover{background:#eef1f2}}
@media (max-height:680px) and (min-width:701px){#vz .stage{top:104px}.jcard{padding:12px 18px}.jcard .jl li{padding:1px 0}#fc1{font-size:22px!important}}
.pmini{display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center}.pmini b{font-weight:800;font-size:34px;line-height:1;border:4px solid var(--marine);border-radius:10px;padding:4px 12px;margin-right:8px;color:var(--marine)}.pmini i{width:38px;height:38px;border-radius:8px;border:2px solid #9aa5ae;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:700;color:#5d6b78;background:#fff;transition:all .4s}.pmini i.now{background:var(--marine);color:#fff;border-color:var(--marine)}
.ax .fl .sh{display:none}
.qfb{font-weight:700;font-size:var(--B);margin:12px 0 0;min-height:1.4em;text-align:center}.qfb.ok{color:var(--vert)}.qfb.ko{color:var(--orange)}
@media (max-width:700px){
 #vz .stage{overflow-y:auto;pointer-events:auto}#vz .stage>*{margin-top:auto;margin-bottom:auto}.chain{margin-top:16px}.permis ol{grid-auto-flow:row;grid-template-rows:none}.permis .T{display:block!important;font-size:40px;border-width:4px;padding:4px 10px;justify-self:start}.pmini{gap:5px;flex-wrap:nowrap}.pmini i{width:24px;height:24px;font-size:12px;border-radius:6px}.pmini b{font-size:22px;padding:3px 8px;margin-right:4px}#fc1{font-size:20px!important}.lgx{display:none}.jcard{padding:14px 16px}.jcard .jl li{font-size:15px;padding:2px 0}.ax .fl .lg{display:none}.ax .fl .sh{display:inline}#vz .stage.tall{bottom:12px}
 .road i{width:28px;height:28px;font-size:13px;border-width:2px}.road b{min-width:3px}
 .chain{flex-direction:column}.chain .ar{width:100%;height:30px}.chain .ar svg{transform:rotate(90deg);width:30px}
 .chain .nd{flex-direction:row;text-align:left;gap:14px;padding:16px}.chain .nd .ic{width:44px;height:44px;flex:none}.chain .nd .k{font-size:30px}.pin{left:auto;right:12px;transform:none;top:-13px;font-size:14px}
 .two{flex-direction:column;gap:20px}.lic{width:200px}.conds li{font-size:17px}.ttl{font-size:23px}
 .vfw{grid-template-columns:1fr;gap:18px}.vfw.qa #xb,.vfw.qb #xa{display:none}
 .axes{gap:26px}.ax .tl{margin-bottom:48px;font-size:15px}.ax .fl,.ax .sg span,.ax .chip{font-size:14px}.ax .tk{font-size:15px}.ax .nt{margin-top:34px;font-size:14px}
 .ax .fl.c{font-size:14px}#xaf0,#xaf2{font-size:14px}#xb .tl{margin-bottom:68px}#xbf1{max-width:48%}#xbf2{left:100%!important;transform:translateX(-100%);text-align:right;max-width:32%}.ax br.ph{display:inline}.ax .sg span.lg{display:none}.ax .sg .sh{display:inline;font-size:12px}.ax .sg{padding:0 8px}
 .obj{grid-template-columns:1fr;justify-items:center;text-align:center;gap:16px}.obj .no{width:90px;height:90px;font-size:54px}.obj .cap{font-size:26px}.obj .sub{font-size:17px}
 .chk li{font-size:19px;gap:14px}.duo .av{width:104px;height:104px;font-size:44px}
 .hero .cap{font-size:25px}.hero .sub{font-size:16px}.hic{width:84px!important;height:84px!important}
 .huge{font-size:78px}.huge.tel{font-size:40px}
 #t2p{padding:0;align-items:flex-start}#t2p .win{width:100%;border-radius:0;padding:30px 0}#t2p .pan{width:190%}#t2p .ring{border-width:3px}
 .lab.dock{width:calc(100vw - 32px)}
}
body.subs #vz .stage.tall{bottom:150px}
@media (max-width:700px){body.subs #vz .stage,body.subs #vz .stage.vb,body.subs #vz .stage.tall{bottom:190px}}
</style>`);
const P=(k,t,x='')=>`<p class="lb">${nb(t)}</p>${x?`<p class="tx">${nb(x)}</p>`:''}`;
const bub=(who,t)=>`<div class="bub"><small>${who}</small>${nb(t)}</div>`;
// le moment où la voix prononce un mot : sa place dans la réplique
const K=(id,w,d=.02)=>{const t=LINES[id].t;const i=t.indexOf(w);if(i<0){console.error('mot absent',id,w);return .5}return Math.max(.01,i/t.length-d)};
const W=(id,w,fn,d)=>[K(id,w,d),fn];
// un nouveau plan, en fondu enchaîné sur le précédent
function vue(html){const old=[...VZ.querySelectorAll('.stage')];const st=document.createElement('div');st.className='stage fr';st.innerHTML=html;VZ.appendChild(st);VZ.classList.add('on');
 requestAnimationFrame(()=>requestAnimationFrame(()=>st.classList.add('in')));old.forEach(o=>{o.classList.remove('in');o.style.opacity=0;o.style.transition='opacity .5s';setTimeout(()=>o.remove(),600)});return st}
const cur=()=>VZ.querySelector('.stage:last-child')||VZ;
const on=(sel,cls='in')=>cur().querySelectorAll(sel).forEach(e=>e.classList.add(cls));
const $c=sel=>cur().querySelector(sel);
const CHECK='<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const HANDSVG=document.getElementById('hand').outerHTML.replace('id="hand"','');
const bigIc=k=>IC[k].replace('class="ic"','class="ic hic"');

/* 1. la couverture */
async function cover(){await photo('cov',FAST?10:1200);if(PORT()){const c=pt(.3,.5);setCam({mode:'contain',zoom:1.5,x:c[0],z:c[2]})}else setCam({zoom:1});
 const L=label([0,0,0],{big:1,lead:false}).title('Permis T · Paris-Charles de Gaulle').card('Autorisation de conduite en zone côté piste','Préambule et introduction.');
 await cont(L,'Démarrer');step();try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){} // on recommence le préambule : son journal repart de zéro, les autres étapes restent
 await sayS('p01',[at('p01',.02,()=>L.card('Damienne et Xavier','Ils passent la matinée avec vous sur Roissy-Charles de Gaulle. À la fin, vous aurez votre permis T.'))],{zoom:1.08});
 await sayS('p02',[at('p02',.02,()=>L.card('Xavier passe le permis avec vous','Il connaît un peu la plateforme, mais pas encore ses règles au volant.'))]);
 await sayS('p03',[at('p03',.02,()=>L.card('Une règle pour tout le monde','Quel que soit votre métier.'))]);
 await cont(L,'Commencer');L.kill();return null}

/* 2. comment ça marche : un plan par idée */
async function marche(){step();head('Préambule','Comment ça marche');
 vue(`<div class="hero"><p class="huge" id="h330">0 h 00</p><p class="cap">La durée obligatoire</p><p class="sub">De la partie théorique.</p></div>`);
 const road=`<div class="hero"><div class="road">${[...Array(10)].map((_,i)=>`${i?'<b></b>':''}<i>${i+1}</i>`).join('')}</div><p class="cap" style="margin-top:clamp(18px,4vh,40px)">Dix étapes, dans l'ordre</p><p class="sub it" id="rd2">On ne passe à la suivante qu'après avoir terminé la précédente.</p></div>`;
 await sayS('p04',[at('p04',.02,()=>countTo('#h330',210,2600,v=>{const m=Math.round(v);return `${Math.floor(m/60)} h ${String(m%60).padStart(2,'0')}`})),
  W('p04','Elle se fait',()=>{vue(road);[...cur().querySelectorAll('.road i')].forEach((e,i)=>setTimeout(()=>e.classList.add('in'),FAST?0:i*160))}),
  W('p04',"qu'après avoir",()=>{const is=[...cur().querySelectorAll('.road i')],bs=[...cur().querySelectorAll('.road b')];show('#rd2');
   is[0].classList.add('done');is.slice(2).forEach(e=>e.classList.add('lock'));setTimeout(()=>{bs[0].classList.add('done');is[1].classList.add('open')},FAST?0:700)}),
  W('p04','Et vous nous',()=>vue(`<div class="hero"><div class="duo"><div class="pp talk" id="pd"><div class="av">D</div><div class="nm">Damienne</div></div><div class="pp" id="px"><div class="av">X</div><div class="nm">Xavier</div></div></div><p class="cap" style="margin-top:clamp(14px,3vh,30px)">Deux voix</p><p class="sub">Deux collègues qui échangent.</p></div>`)),
  W('p04','Xavier et moi',()=>{const a=$c('#pd'),b=$c('#px');if(a&&b){a.classList.remove('talk');b.classList.add('talk');setTimeout(()=>{b.classList.remove('talk');a.classList.add('talk')},FAST?0:900)}})]);
 // la main, les questions, le journal
 vue(`<div class="hero">${bigIc('hand')}<p class="cap">La main orange</p><p class="sub">Elle vous montre où cliquer.</p></div>`);
 const qfr=`<div class="hero">${bigIc('quiz')}<p class="cap">Des questions d'entraînement</p><ul class="chk" style="margin-top:clamp(6px,2vh,18px)"><li id="q1"><b>${CHECK}</b>${nb("Au moins la moitié de bonnes réponses")}</li><li id="q2"><b>${CHECK}</b>${nb("Sinon, on revoit la partie, puis une nouvelle série")}</li><li id="q3"><b>${CHECK}</b>Chaque réponse est expliquée</li></ul></div>`;
 await sayS('p05',[W('p05','Entre les étapes',()=>vue(qfr)),W('p05','Il faut au moins',()=>on('#q1','on')),W('p05','Sinon',()=>on('#q2','on')),W('p05','Chaque réponse',()=>on('#q3','on')),
  W('p05','Un journal',()=>vue(`<div class="hero">${bigIc('journal')}<p class="cap">Le journal</p><p class="sub">Il note chaque décision de la matinée, avec l'heure.</p></div>`))]);
 // un premier essai, pour de vrai
 vue(`<div class="hero"><div class="qc" id="qe" style="width:min(600px,100%)"><p class="n">À vous d'essayer</p><p class="q">${nb("Une série de questions n'est pas réussie. Que se passe-t-il ?")}</p></div></div>`);
 const E0=await pick(null,[['suite','On passe quand même à la suite'],['revoir','On revoit la partie, puis la série revient'],['stop','La formation s\'arrête']],'revoir',"Exactement. En dessous du seuil, vous revoyez la partie concernée, puis la série revient. C'est la règle de la consigne d'exploitation n°3. Et chaque réponse est expliquée, comme celle-ci.",{_:"Non. En dessous du seuil, vous revoyez la partie concernée, puis la série revient. C'est la règle de la consigne d'exploitation n°3. Et chaque réponse est expliquée, comme celle-ci."},'Continuer',{once:true,host:$c('#qe')});
 jlog('4 h 45',`Premier essai de question${errTxt(E0)}`);
 // l'apprenant ouvre lui-même le journal
 vue(`<div class="hero">${bigIc('journal')}<p class="cap">Votre réponse est inscrite au journal</p><p class="sub it in" id="jc" style="font-weight:700;color:var(--marine)">${nb("Cliquez sur « Journal », en bas de l'écran, pour la voir.")}</p><p class="sub" style="font-size:var(--B)">Les heures du journal sont celles de l'histoire, pas la durée de la formation.</p></div>`);
 await barTarget($('#bjrn'),'Journal');const jc=$c('#jc');if(jc)jc.classList.remove('in');
 await new Promise(r=>{const t=setInterval(()=>{if(!$('#jrn').classList.contains('on')){clearInterval(t);r()}},200)});
 vue(`<div class="hero">${bigIc('phone')}<p class="huge tel">01 49 19 81 79</p><p class="cap">Si quelque chose bloque</p><p class="sub">L'équipe de REM Formation répond au téléphone.</p></div>`);
 await sayS('p06',[W('p06',"L'évaluation",()=>vue(`<div class="hero">${bigIc('laptop')}<p class="cap">L'évaluation finale</p><p class="sub">En ligne, sur votre espace stagiaire, à la fin du parcours.</p></div>`))]);
 await wait(1500);return null}
// un repère posé juste au-dessus d'un bouton de la barre du bas ; cliquer le repère ou le bouton lui-même, c'est pareil
function barTarget(btn,txt){return new Promise(res=>{const el=document.createElement('div');el.className='tgt above';el.innerHTML=`<i></i><span>${txt}</span>`;document.body.appendChild(el);
 const place=()=>{if(!el.isConnected)return;const r=btn.getBoundingClientRect();el.style.transform=`translate(${r.left+r.width/2}px,${r.top-24}px)`;requestAnimationFrame(place)};place();
 let done=false;const fin=()=>{if(done)return;done=true;el.remove();btn.removeEventListener('click',direct);res()};const direct=()=>fin();btn.addEventListener('click',direct);
 setTimeout(()=>el.classList.add('live','first'),FAST?60:500);el.onclick=()=>{if(!el.classList.contains('live'))return;fin();btn.click()}})}

/* 3. la formation obligatoire */
const ARR=id=>`<div class="ar it" id="${id}"><svg viewBox="0 0 60 28"><path d="M4 14h48M40 4l12 10-12 10"/></svg></div>`;
async function obligatoire(){step();head('Préambule','La formation obligatoire');
 vue(`<div style="width:100%"><div class="chain">
  <div class="nd it" id="d1"><span class="pin it" id="d1p">Vous êtes ici</span>${IC.laptop}<div><div class="k">3 h 30</div>${P('','La théorie')}</div></div>${ARR('a1')}
  <div class="nd it" id="d2">${IC.route}<div>${P('','La pratique','Chez REM Formation ou chez votre employeur, selon les cas.')}</div></div>${ARR('a2')}
  <div class="nd it" id="d3">${IC.loop}<div><div class="k">2 ans</div>${P('','Le recyclage','Tous les deux ans.')}</div></div></div>
  <div class="xb it" id="d4">${bub('Xavier',"Et si je n'ai pas le permis voiture ?")}</div></div>`);
 await sayS('p07',[at('p07',.01,()=>show('#d1,#a1,#d2,#a2,#d3')),W('p07','La théorie',()=>show('#d1',true)),W('p07',"c'est ce que",()=>show('#d1p')),W('p07','La pratique',()=>show('#d2',true)),W('p07','Et un recyclage',()=>show('#d3',true))]);undim();
 await sayS('p08',[at('p08',.02,()=>show('#d4'))]);
 vue(`<div class="two"><div class="lic it" id="e0"><div class="tt">PERMIS DE CONDUIRE</div><div class="ph"><svg viewBox="0 0 40 40"><circle cx="20" cy="15" r="8"/><path d="M4 40c1-10 7-15 16-15s15 5 16 15z"/></svg></div><div class="ls"><i></i><i style="width:78%"></i><i style="width:62%"></i><span class="cat">Catégorie</span></div></div>
  <div><p class="ttl it" id="e00">Un prérequis, pas une option</p><ul class="conds">
  <li class="it" id="e1"><b>1</b><span>Un permis français en cours de validité</span></li>
  <li class="it" id="e2"><b>2</b><span>Ou un permis étranger<small>Dont les droits à conduire restent valables en France, selon les conditions de reconnaissance et d'échange des permis de conduire.</small></span></li>
  <li class="it" id="e3"><b>3</b><span>De la bonne catégorie<small>Celle du type de véhicule immatriculé ou de l'engin utilisé.</small></span></li></ul></div></div>`);
 await sayS('p09',[at('p09',.02,()=>show('#e0')),W('p09','Le permis de conduire',()=>show('#e00')),W('p09','Il faut un permis français',()=>show('#e1')),W('p09','Ou un permis',()=>show('#e2')),W('p09','Et sa catégorie',()=>show('#e3')),
  W('p09','Pour la théorie',()=>vue(`<div class="hero"><div class="sq21">${[...Array(21)].map(()=>'<i></i>').join('')}</div><p class="cap">L'évaluation finale : 21 questions</p><p class="sub it" id="e5">80 % de bonnes réponses au minimum pour obtenir l'attestation.</p></div>`)),
  W('p09','Il faut au moins',()=>{show('#e5');[...cur().querySelectorAll('.sq21 i')].slice(0,17).forEach((e,i)=>setTimeout(()=>e.classList.add('on'),FAST?0:i*110))})]);
 await contV();return null}

/* 4. le candidat : deux frises à l'échelle, l'attestation puis les absences */
const AXES=`<div class="axes">
 <div class="ax" id="xa"><p class="tl">Après la réussite de la théorie</p><div class="tr">
  <div class="sg" id="xa1" style="left:0;width:40%;background:var(--marine)"><span class="lg">Avec un référent accompagnateur</span><span class="sh">Référent</span></div>
  <span class="fl" id="xaf0" style="left:0">L'attestation de réussite</span><span class="fl r" id="xaf2" style="left:90%">Au plus tard :<br class="ph"> le permis récupéré</span>
  <span class="tk" id="xat1" style="left:40%">40 jours</span><span class="tk" id="xat2" style="left:90%">3 mois</span></div>
  <p class="nt" id="xan">L'attestation vaut autorisation de conduite pendant la formation pratique, en présence d'un référent accompagnateur. Passé les 40 jours sans partie pratique validée, tout est à refaire. Une fois la demande d'autorisation déposée, vous circulez au plus 3 mois à compter de la validation de votre permis, avec la copie de la demande, en attendant de le récupérer.</p></div>
 <div class="ax" id="xb"><p class="tl">Cessation d'activité : sans circuler sur l'aire de mouvement</p><div class="tr">
  <div class="sg" id="xb1" style="left:16.7%;width:50%;background:var(--pierre)"></div><div class="sg" id="xb2" style="left:66.7%;width:33.3%;background:var(--marine)"></div>
  <span class="fl c" id="xbf1" style="left:41.7%"><span class="lg">Une remise à niveau est exigée, tracée sur la grille de formation pratique (annexe 7)</span><span class="sh">Remise à niveau (annexe 7)</span></span><span class="fl c" id="xbf2" style="left:83.3%">Une nouvelle formation initiale</span>
  <span class="tk" id="xbt1" style="left:16.7%">3 mois</span><span class="tk" id="xbt2" style="left:66.7%">12 mois</span></div></div></div>`;
async function candidat(){step();head('Préambule','Le candidat');
 vue(`<div style="width:100%;position:relative">${AXES.replace('<div class="ax" id="xb">','<div class="ax it" id="xb">')}<div class="xb it" id="f4" style="position:absolute;left:0;right:0;bottom:0">${bub('Xavier',"Donc avec l'attestation, je peux rouler seul ?")}</div></div>`);
 await sayS('p10',[at('p10',.02,()=>on('#xaf0')),W('p10','Elle vaut',()=>{on('#xa1');on('#xat1')}),W('p10','Mais seulement',()=>on('#xa1','hl')),
  W('p10','Vous avez ensuite',()=>{on('#xat2');on('#xaf2');const s=$c('#xa1');if(s)s.classList.remove('hl')})]);on('#xan');
 await sayS('p11',[at('p11',.02,()=>show('#f4'))]);
 await sayS('p12',[at('p12',.02,()=>{$c('#f4').classList.remove('in');on('#xa1','js')}),W('p12','Et attention',()=>show('#xb')),
  W('p12','Entre trois',()=>{on('#xbt1');on('#xbt2');on('#xb1');on('#xbf1')}),W('p12','Au-delà de douze',()=>{on('#xb2');on('#xbf2')})]);
 await wait(2500);return null}

/* 5. l'attestation : la photo de l'Annexe 8, parcourue partie par partie */
async function attestation(){step();await photo('annexe',FAST?10:400);setCam({mode:'contain'});await vzOff();
 const L=label(pt(.42,.03,'annexe')).title("L'attestation de réussite").card('Annexe 8',"Le document « Demande d'autorisation de conduite, permis T ». Ici, un exemple fictif.",{a:pt(.42,.03)});
 const Z=(fx,fy,zoom,D)=>{const c=pt(fx,fy);return camTo({x:c[0],z:c[2],zoom,mode:'contain'},D)};
 await sayS('p10b',[W('p10b',"l'attestation",()=>{L.card('Partie 2 · Formation théorique','Remplie par le centre de formation agréé : il atteste que vous avez réussi la théorie.',{a:pt(.5,.21)});Z(.46,.27,PORT()?1.6:2.6,2200)}),
  W('p10b',"C'est elle",()=>L.card('Elle vaut autorisation de conduite','Avec un référent.',{a:pt(.5,.25)})),
  W('p10b','pendant',()=>{L.card('40 jours','La partie pratique doit être réalisée dans les 40 jours suivant la réussite de la formation théorique.',{a:pt(.91,.352)});Z(PORT()?.8:.74,.37,PORT()?2.4:2.6,2000)})]);
 await cont(L);await camTo({mode:'contain'},1200);L.kill();return null}

/* 6. vrai ou faux : la question se pose sur les deux frises */
async function vraiFaux(){step();VZ.classList.remove('clear');head('Préambule','Vrai ou faux ?');
 vue(`<div class="vfw" id="vfw"><div>${AXES}</div><div class="qc" id="qc"><p class="n">À vous</p><p class="q">Quatre affirmations : vraies ou fausses ?</p></div></div>`);
 ['#xaf0','#xa1','#xat1','#xat2','#xaf2','#xb1','#xb2','#xbf1','#xbf2','#xbt1','#xbt2'].forEach(s=>on(s));
 await sayS('p13');
 const mk=document.createElement('div');mk.className='mk';
 const VF2=[["Pendant la formation pratique, l'attestation de réussite me permet de conduire, accompagné d'un référent.",'v','a',20,"Vrai : l'attestation vaut autorisation de conduite pendant la formation pratique, en présence d'un référent accompagnateur.","",'#xa1','JS'],
  ["Je peux faire ma formation pratique deux mois après avoir réussi la théorie.",'f','a',60,"Faux : la formation pratique doit être faite dans les 40 jours qui suivent la réussite de la théorie. Passé ce délai, tout est à refaire.","",'#xa1'],
  ["Deux mois sans circuler sur l'aire de mouvement : une remise à niveau est exigée.",'f','b',11.1,"Faux : la remise à niveau n'est exigée qu'entre 3 et 12 mois de cessation d'activité.","",'#xb1'],
  ["Huit mois sans circuler sur l'aire de mouvement : une remise à niveau m'attend avant de reprendre le volant.",'v','b',44.4,"Vrai : entre 3 et 12 mois de cessation d'activité, une remise à niveau est exigée, tracée sur la grille de formation pratique.","",'#xb1']];
 const IT=alt('vf',[["L'attestation de réussite théorique est valable quarante jours.",'v','a',40,"Vrai : quarante jours, le temps de la formation pratique avec le référent. Passé ce délai sans partie pratique validée, tout est à refaire.","Regardez la frise : jusqu'où va la conduite avec le référent ?",'#xa1'],
  ["Avec l'attestation de réussite théorique, je peux conduire seul côté piste.",'f','a',6,"Faux : l'attestation vaut autorisation de conduite seulement en présence d'un référent accompagnateur.","Regardez la frise : pendant ces quarante jours, qui est à côté de vous ?",'#xa1','JS'],
  ["Six mois sans circuler sur l'aire de mouvement : je repasse le permis T en entier.",'f','b',33.3,"Faux : entre trois et douze mois de cessation d'activité, c'est une remise à niveau qui est exigée, tracée sur la grille de formation pratique. Pas le permis T en entier.","Regardez où tombe le repère sur la frise.",'#xb1'],
  ["Quatorze mois sans circuler sur l'aire de mouvement : je repasse le permis T en entier.",'v','b',77.8,"Vrai : au-delà de douze mois de cessation d'activité, il faut suivre à nouveau une formation initiale.","Regardez où tombe le repère sur la frise.",'#xb2']],VF2);
 let E=0;const qc=$c('#qc'),vf=$c('#vfw');cur().classList.add('tall');
 for(let i=0;i<IT.length;i++){const [t,b,ax,x,okT,koT,seg,extra]=IT[i];qc.querySelector('.n').textContent=`Affirmation ${i+1} sur ${IT.length}`;qc.querySelector('.q').innerHTML=nb(t);
  vf.classList.toggle('qa',ax==='a');vf.classList.toggle('qb',ax==='b');mk.classList.remove('ok');$c(`#x${ax} .tr`).appendChild(mk);mk.style.left=x+'%';
  E+=await pick(null,[['v','Vrai'],['f','Faux']],b,okT,koT,i<IT.length-1?'Affirmation suivante':'Continuer',{once:true,host:qc,
   onDone:()=>{mk.classList.add('ok');if(extra==='JS')on('#xa1','js');const s=$c(seg);if(s){s.classList.add('hl');setTimeout(()=>s.classList.remove('hl'),FAST?10:2600)}}})}
 mk.remove();jlog('4 h 50',`Vrai ou faux sur le candidat : 4 affirmations${errTxt(E)}`);return gate('vf',E,IT.length,3,'Vrai ou faux')}

/* 7. les objectifs : un plan pour chacun */
const OBJ=[['Se repérer',"Se repérer et s'orienter sur l'aire de mouvement et les aires de trafic de Paris-Charles de Gaulle.",'Un :'],
 ['Identifier les risques',"Liés à la circulation sur l'aire de mouvement, et particulièrement sur les aires de trafic.",'Deux :'],
 ['Adopter les bonnes pratiques',"Les réflexes et les bonnes attitudes lors de la circulation sur l'aire de mouvement, et particulièrement sur les aires de trafic.",'Trois :'],
 ['Comprendre','Les risques et les procédures de notification.','Quatre :']];
async function objectifs(){step();head('Préambule','Les objectifs de la formation');
 const of=i=>`<div style="width:100%;display:flex;flex-direction:column;align-items:center"><div class="obj" style="width:auto"><div class="no">${i+1}</div><div><p class="cap">${nb(OBJ[i][0])}</p><p class="sub">${nb(OBJ[i][1])}</p></div></div><div class="pips">${OBJ.map((_,k)=>`<i class="${k<=i?'on':''}"></i>`).join('')}</div></div>`;
 vue(`<div class="hero"><p class="huge">4</p><p class="cap">Objectifs pour cette matinée</p></div>`);
 await sayS('p14',OBJ.map((o,i)=>W('p14',o[2],()=>vue(of(i)))));
 vue(`<div class="hero"><p class="cap" style="margin-bottom:clamp(12px,3vh,30px)">À la fin de la formation</p><ul class="chk">
  <li id="k1"><b>${CHECK}</b>Vous savez vous repérer sur Roissy.</li><li id="k2"><b>${CHECK}</b>Vous avez perçu les situations qui créent le risque.</li>
  <li id="k3"><b>${CHECK}</b>Vous avez les réflexes pour vous protéger et protéger les autres.</li><li id="k4" class="last it" style="padding-left:clamp(58px,5.2vw,72px)">Et vous savez mettre en œuvre des pratiques de sécurité.</li></ul></div>`);
 await sayS('p15',[W('p15','vous savez',()=>on('#k1','on')),W('p15','Vous avez perçu',()=>on('#k2','on')),W('p15','Et vous avez',()=>on('#k3','on'))]);
 show('#k4');await contV();return null}

/* 8. le plan de la matinée : le permis et ses dix cases */
const ET=['La réglementation','Le zonage et la cartographie',"L'accès au côté piste","L'inspection du véhicule",'La circulation des véhicules',"Les règles de sécurité sur l'aire de mouvement","La circulation autour de l'avion","L'aire de manœuvre","Les procédures d'urgence","L'amélioration continue de la sécurité"];
const SAY=['La réglementation','Le zonage',"L'accès","L'inspection",'La circulation des',"Les règles",'La circulation autour',"L'aire de manœuvre","Les procédures","Et l'amélioration"];
const PERMIS=(demo=true)=>`<div style="width:100%;display:flex;flex-direction:column;align-items:center"><div class="permis" id="pm"><div class="T">T</div><ol>${ET.map((e,i)=>`<li><b>${i+1}</b>${nb(e)}</li>`).join('')}</ol></div>${demo?`<p class="demo2" id="dm">${nb("Exemple : l'étape 1 terminée, sa case est cochée.")}</p>`:''}</div>`;
async function plan(){step();head('Préambule','Le plan de la matinée');vue(PERMIS());
 const li=i=>cur().querySelectorAll('.permis li')[i];
 await sayS('p16',[...SAY.map((w,i)=>W('p16',w,()=>li(i).classList.add('on'),.01)),
  W('p16','À chaque étape',()=>{li(0).classList.add('tick');on('#dm')}),W('p16','À la fin',()=>{li(0).classList.remove('tick');$c('#dm').classList.remove('in');$c('.permis .T').classList.add('lit')})]);
 // à vous : par où commence la matinée ?
 const dm=$c('#dm');dm.textContent="À vous : cliquez sur l'étape par laquelle la matinée commence.";dm.style.color='var(--marine)';dm.classList.add('in');
 const fb=document.createElement('p');fb.className='qfb';dm.after(fb);const lis=[...cur().querySelectorAll('.permis li')];lis.forEach(x=>x.classList.add('pk','ans'));
 const k=await new Promise(r=>lis.forEach((x,i)=>x.onclick=()=>r(i)));let E=0;
 lis.forEach(x=>{x.onclick=null;x.classList.remove('pk','ans')});lis[0].classList.add('ok');
 const X="La réglementation, l'étape 1. Les autres suivent, dans l'ordre : on ne passe à la suivante qu'après avoir terminé la précédente.";
 if(k===0){fb.className='qfb ok';fb.textContent=X}else{E=1;lis[k].classList.add('ko');fb.className='qfb ko';fb.innerHTML=xko("l'étape 1",X)}
 jlog('4 h 52',`Le plan de la matinée${errTxt(E)}`);
 await contV();return gate('plan',E,1,7,'Le plan de la matinée')}

/* 9. pourquoi Roissy : le contexte, la carte, les chiffres, le film */
async function roissy(){step();headOff();await photo('terminaux',FAST?10:900);setCam({zoom:1});VZ.classList.add('clear');
 vue(`<div class="hero">${bub('Xavier',"Pourquoi une formation spéciale pour Roissy ? Un aéroport, c'est un aéroport, non ?")}</div>`);
 await sayS('i01',[],{zoom:1.04});
 vue(`<div class="hero"><p class="cap capw">Chaque aéroport a ses particularités</p><div class="chips"><span class="it" id="r1">Ses contraintes géographiques</span><span class="it" id="r2">Son architecture</span><span class="it" id="r3">Ses caractéristiques propres</span></div></div>`);
 const MAP=`<div class="hero"><div class="mapc"><svg viewBox="0 0 560 400" font-family="Barlow,system-ui,sans-serif">
  <g stroke="#263C52" stroke-width="2.5" fill="none"><path d="M44 92V40M34 54l10-14 10 14"/></g><text x="44" y="116" text-anchor="middle" font-weight="700" font-size="20" fill="#263C52">N</text>
  <ellipse cx="250" cy="318" rx="74" ry="52" fill="#e7eaea" stroke="#263C52" stroke-width="3"/><text x="250" y="326" text-anchor="middle" font-weight="700" font-size="26" fill="#263C52">Paris</text>
  <path id="mrt" d="M262 264L300 96" stroke="#263C52" stroke-width="4" fill="none"/>
  <g id="mcdg"><circle cx="302" cy="84" r="15" fill="#263C52"/><circle cx="302" cy="84" r="6" fill="#fff"/><text x="302" y="50" text-anchor="middle" font-weight="700" font-size="24" fill="#263C52">Roissy-Charles de Gaulle</text></g>
  <g id="mkm" style="opacity:0;transition:opacity .6s"><rect x="300" y="160" width="96" height="40" rx="20" fill="#263C52"/><text x="348" y="187" text-anchor="middle" font-weight="800" font-size="22" fill="#fff">25 km</text></g></svg></div>
  <p class="cap">À 25 kilomètres au nord de Paris</p></div>`;
 await sayS('i02',[W('i02','ses contraintes',()=>show('#r1')),W('i02','son architecture',()=>show('#r2')),W('i02','ses caractéristiques',()=>show('#r3')),
  W('i02','Roissy-Charles',()=>{VZ.classList.remove('clear');vue(MAP);const p=$c('#mrt');const L0=p.getTotalLength();p.style.strokeDasharray=L0;p.style.strokeDashoffset=L0;p.getBoundingClientRect();
   const g1=$c('#mcdg'),g2=$c('#mkm');p.style.transition=`stroke-dashoffset ${FAST?.05:1.2}s ease`;p.style.strokeDashoffset=0;setTimeout(()=>{p.style.strokeDasharray='6 7';g2.style.opacity=1},FAST?50:1300)}),
  W('i02','Il a accueilli',()=>{vue(`<div class="hero"><p class="huge" id="mp">0,0</p><p class="cap">Millions de passagers en 2019</p><p class="sub it" id="mp2" style="font-weight:700;color:var(--marine)">Le premier aéroport de France.</p><p class="sub it" id="mp3">Et 72,0 millions en 2025.</p></div>`);countTo('#mp',76.2,2400,v=>v.toFixed(1).replace('.',','));setTimeout(()=>show('#mp3'),FAST?0:2600)}),
  W('i02',"C'est le premier",()=>show('#mp2')),W('i02','La vidéo',()=>{})]);
 const vv=$('#vv'),vid=$('#vid');const openFilm=async()=>{vv.src='../video/intro.mp4';vid.classList.add('on');VO.pause();
  try{await vv.play()}catch(e){if(!$('#vplay')){$('#vclose').insertAdjacentHTML('beforebegin','<button class="act" id="vplay">Lancer le film</button>');$('#vplay').onclick=()=>{vv.play().catch(()=>{});$('#vplay').remove()}}}
  await new Promise(r=>{$('#vclose').onclick=r;vv.onended=r});vv.pause();vid.classList.remove('on')};
 // le film se lance tout seul quand la voix a fini ; on peut le revoir ensuite
 if(!$('#vcred'))$('#vclose').insertAdjacentHTML('beforebegin','<p id="vcred" style="margin:0;font-size:var(--B);color:var(--pierre)">Extrait : Europe 1, La Matinale.</p>');
 let seen=false;if(!FAST){await openFilm();seen=true}
 for(;;){VB.innerHTML=`<button class="act alt">${seen?'Revoir le film':'Regarder le film'}</button><button class="act">Continuer</button>`;VB.querySelectorAll('button').forEach(b=>b.style.pointerEvents='auto');
  const b=await new Promise(r=>VB.querySelectorAll('button').forEach(x=>x.onclick=()=>r(x)));VB.innerHTML='';if(!b.classList.contains('alt'))break;await openFilm();seen=true}
 return null}

/* 10. le survol : un film de la plateforme ; il descend sur chaque terminal, s'arrête pendant la voix, puis remonte */
const FILM=document.createElement('video');FILM.id='film';FILM.muted=true;FILM.playsInline=true;FILM.setAttribute('playsinline','');FILM.preload='auto';FILM.src='../video/survol-roissy.mp4';
document.body.insertBefore(FILM,$('#ui'));
// sur téléphone, on montre une partie de la largeur du film, centrée sur ce qui compte
const FV={cx:.47,fill:.74};let FON=false;const FO=new Set();
function layFilm(){const Wd=innerWidth,bot=innerHeight-BARH()-(document.body.classList.contains('subs')?(PORT()?130:90):0);let w=Wd,h=bot,y=0;
 if(PORT()){const top=PANEL?Math.round(PANEL.y+PANEL.h+12):16;h=Math.min(Wd/(1280*FV.fill)*720,bot-top-8);y=top+Math.max(0,Math.round((bot-top-8-h)/2))}
 const s=Math.max(w/1280,h/720),dw=1280*s,dh=720*s;let ox=w/2-FV.cx*dw;ox=Math.min(0,Math.max(w-dw,ox));const oy=(h-dh)/2;
 const k=`${w}|${h}|${y}|${ox}`;if(FILM._k!==k){FILM._k=k;Object.assign(FILM.style,{left:'0px',top:y+'px',width:w+'px',height:h+'px',objectPosition:`${dw>w?ox/(w-dw)*100:50}% 50%`})}
 FILM._m={x:ox,y:y+oy,dw,dh,top:y,bot:y+h}}
function placeFO(){if(!FILM._m)layFilm();const m=FILM._m;
 for(const o of FO){const x=m.x+o.fx*m.dw,y=m.y+o.fy*m.dh;o.el.style.transform=`translate(${x}px,${y}px)`;o.el.style.visibility=(x<4||x>innerWidth-4||y<m.top+4||y>m.bot-4)?'hidden':'';if(o.el.classList.contains('ftag')){const sp=o.el.querySelector('span');o.el.classList.toggle('l',x+20+sp.offsetWidth>innerWidth-8)}}}
(function filmLoop(){requestAnimationFrame(filmLoop);if(!FON&&!FO.size)return;if(FON)layFilm();placeFO()})();
function filmOn(){FON=true;layFilm();FILM.style.opacity=1;VZ.innerHTML='';VZ.classList.add('on');headOff()}
function filmOff(){FILM.style.opacity=0;FON=false;FO.forEach(o=>o.el.remove());FO.clear()}
function playTo(t){return new Promise(r=>{if(FAST){FILM.currentTime=t;return r()}FILM.play().catch(()=>{FILM.currentTime=t;r()});const f=()=>{if(FILM.currentTime>=t-.05||FILM.ended){FILM.pause();r()}else requestAnimationFrame(f)};f()})}
// une étiquette posée sur le film (elle ne se clique pas)
function ftag(fx,fy,txt){const el=document.createElement('div');el.className='ftag';el.innerHTML=`<i></i><span>${nb(txt)}</span>`;document.body.appendChild(el);const o={el,fx,fy,kill(){el.classList.remove('in');FO.delete(o);setTimeout(()=>el.remove(),450)}};FO.add(o);placeFO();requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')));return o}
function clearTags(){[...FO].forEach(o=>o.kill&&o.kill())}
// des repères à cliquer posés sur le film ; next() attend le prochain clic
function fpick(pts,labels={}){const gs={};let res=null;Object.entries(pts).forEach(([k,[fx,fy]])=>{const el=document.createElement('div');el.className='tgt';el.innerHTML=`<i></i>${labels[k]?`<span>${nb(labels[k])}</span>`:''}`;document.body.appendChild(el);
  const o={el,fx,fy};FO.add(o);gs[k]=o;placeFO();setTimeout(()=>el.classList.add('live','first'),FAST?60:600);
  el.onclick=()=>{if(!el.classList.contains('live')||el.classList.contains('ko')||!res)return;const r=res;res=null;r(k)}});
 return {gs,next:()=>new Promise(r=>res=r),kill(){Object.values(gs).forEach(o=>{o.el.remove();FO.delete(o)})}}}
const T1=[.182,.509],T3=[.46,.36],T2=[.73,.54];
async function survol(){step();await vzOff();FILM.currentTime=0;FV.cx=.47;FV.fill=.74;filmOn();
 const L=label([0,0,0],{lead:false,dock:true}).title('Les aérogares, vues du ciel');
 await playTo(5.8);let t1,t2,t3;
 await sayS('i03',[at('i03',.02,()=>L.card('Trois aérogares','Trois logiques de circulation.')),
  W('i03','Charles-de-Gaulle un',()=>{t1=ftag(...T1,'Terminal 1');t1.el.classList.add('lit')}),W('i03','Charles-de-Gaulle deux',()=>{t1.el.classList.remove('lit');t2=ftag(...T2,'Terminal 2');t2.el.classList.add('lit')}),
  W('i03','Charles-de-Gaulle trois',()=>{t2.el.classList.remove('lit');t3=ftag(...T3,'Terminal 3');t3.el.classList.add('lit')}),W('i03','On les regarde',()=>t3.el.classList.remove('lit'))]);
 // terminal 1
 L.card('À vous','Cliquez sur le terminal 1 pour descendre dessus.');t1.kill();const g=fpick({t1:T1},{t1:'Terminal 1'});await g.next();g.kill();clearTags();
 L.card('Le terminal 1','On descend dessus.');FV.cx=.52;FV.fill=.5;await playTo(20.5);
 let a,b;
 await sayS('i04',[at('i04',.02,()=>L.card('Terminal 1 · CDG 1','Le plus ancien, et le plus contraint pour la circulation.')),
  W('i04','Un bâtiment central',()=>{L.card('Un bâtiment central circulaire',"Couplé à des satellites d'embarquement et de débarquement.");a=ftag(.58,.47,'Le bâtiment central');a.el.classList.add('lit')}),
  W('i04','couplé',()=>{b=ftag(.37,.69,'Un satellite')}),
  W('i04','Le bâtiment central, dédié',()=>{L.card('Sept niveaux',"Le bâtiment central, dédié à l'accueil des visiteurs et des passagers.");if(b)b.kill()}),
  W('i04','Il a beaucoup',()=>{L.card('De 8 à 16 postes avion','Depuis 2019.');if(a)a.el.classList.remove('lit')})]);
 // terminal 3
 L.card('Le terminal 3','Cliquez pour y aller.');await contLab(L,'Vers le terminal 3');clearTags();L.card('Vers le terminal 3','');FV.cx=.58;FV.fill=.5;await playTo(25.2);
 let t3t;await sayS('i07',[at('i07',.02,()=>{L.card('Terminal 3 · CDG 3','Dédié aux vols charter et à bas coût.');t3t=ftag(.66,.46,'Le terminal 3');t3t.el.classList.add('lit')}),W('i07','Moins de volume',()=>L.card('Moins de volume','Mais une forte coactivité sur des surfaces réduites.'))]);if(t3t)t3t.kill();
 // terminal 2
 L.card('Le terminal 2','Le plus étendu. Cliquez pour y aller.');await contLab(L,'Vers le terminal 2');L.card('Vers le terminal 2','');FV.cx=.5;FV.fill=.5;await playTo(44.5);
 let t2t;await sayS('i05',[at('i05',.02,()=>{L.card('Terminal 2 · CDG 2','Le plus étendu. Ses halls vont de 2A à 2G : deux rangées face à face, et 2G à part.');t2t=ftag(.55,.45,'Le terminal 2');t2t.el.classList.add('lit')})]);if(t2t)t2t.kill();
 // le plan des halls du terminal 2, par-dessus le film
 const H={B:[.29,.22],D:[.39,.22],F:[.55,.22],A:[.29,.81],C:[.39,.81],E:[.55,.81],G:[.89,.38]};
 const ov=document.createElement('div');ov.id='t2p';ov.innerHTML=`<div class="win"><div class="pan"><img src="${IMG.t2plan}" alt="Plan des halls du terminal 2">${Object.entries(H).map(([k,[x,y]])=>`<i class="ring" data-h="${k}" style="left:${x*100}%;top:${y*100}%"></i>`).join('')}</div></div>`;FILM.after(ov);
 const pan=c=>{const p=ov.querySelector('.pan');if(!PORT()){p.style.transform='';return}if(PANEL)ov.style.paddingTop=Math.round(PANEL.y+PANEL.h+12)+'px';const w=p.offsetWidth,vw=ov.querySelector('.win').offsetWidth;p.style.transform=`translateX(${-Math.max(0,Math.min(w-vw,c*w-vw/2))}px)`};
 let PC=.34;requestAnimationFrame(()=>{ov.classList.add('on');pan(PC)});(function keep(){if(!ov.isConnected)return;if(PORT()&&PANEL)ov.style.paddingTop=Math.round(PANEL.y+PANEL.h+12)+'px';requestAnimationFrame(keep)})();
 const ring=k=>ov.querySelector(`[data-h="${k}"]`).classList.add('on');const past=ks=>ks.forEach(k=>ov.querySelector(`[data-h="${k}"]`).classList.add('past'));
 await sayS('i06',[at('i06',.02,()=>L.card('Le plan des halls','')),W('i06','une rangée',()=>L.card('Une rangée','2B, 2D, 2F.')),W('i06','deux B',()=>ring('B'),.005),W('i06','deux D',()=>ring('D'),.005),W('i06','deux F',()=>ring('F'),.005),
  W('i06','En face',()=>{past(['B','D','F']);L.card('En face','2A, 2C, 2E.')}),W('i06','deux A',()=>ring('A'),.005),W('i06','deux C',()=>ring('C'),.005),W('i06','deux E',()=>ring('E'),.005),
  W('i06','Et, à part',()=>{past(['A','C','E']);L.card('À part','2G.');PC=.8;pan(PC)}),W('i06','deux G',()=>ring('G'),.005)]);
 L.card('Les trois aérogares','Cliquez sur « Remonter » pour revenir au-dessus de la plateforme.');await contLab(L,'Remonter');ov.classList.remove('on');setTimeout(()=>ov.remove(),600);
 L.card('On remonte','');FV.cx=.47;FV.fill=.74;await playTo(59.9);
 jlog('4 h 55','Survol des trois aérogares');return L}
async function contLab(L,txt){const id='c'+Math.random().toString(36).slice(2,7);L.html(`<button class="act" id="${id}">${txt}</button>`);const b=$('#'+id);await new Promise(r=>b.onclick=r);b.remove()}

/* 11. quel terminal ? on répond en cliquant sur le film */
async function quelTerminal(L){L.title('Quel terminal ?');
 // retour à la vue du début, où l'on voit les trois aérogares
 FILM.style.opacity=0;await wait(700);FILM.currentTime=5.8;await wait(250);FILM.style.opacity=1;
 await sayS('i08',[at('i08',.02,()=>L.card('À vous','Je vous décris une aérogare : cliquez dessus, sur le film.'))]);
 const IT=mix('qt',[["Un bâtiment circulaire, des satellites tout autour, la circulation la plus contrainte.",'t1',"Le terminal 1, le plus ancien : le bâtiment circulaire, avec ses satellites tout autour, et la circulation la plus contrainte.","Pas celle-ci. Cherchez le bâtiment rond, entouré de ses satellites."],
  ["Des vols charter et à bas coût, peu de volume mais beaucoup de coactivité sur peu de surface.",'t3',"Le terminal 3 : des vols charter et à bas coût, peu de volume, mais beaucoup de coactivité sur peu de surface.","Pas celle-ci. Relisez : peu de volume, beaucoup de coactivité sur peu de surface."],
  ["Des halls de 2A à 2G : deux rangées face à face, et 2G à part.",'t2',"Le terminal 2, le plus étendu : les halls 2A à 2G, en deux rangées face à face, et 2G à part.","Pas celle-ci. Cherchez les grands halls en deux rangées face à face."]]);
 const POS={t1:T1,t2:T2,t3:T3},NAME={t1:'Terminal 1',t2:'Terminal 2',t3:'Terminal 3'};let E=0;
 for(let i=0;i<IT.length;i++){const [t,good,okT,koT]=IT[i];L.card(`Description ${i+1} sur ${IT.length}`,t);
  const fp=fpick(POS);
  const k=await fp.next();const bad=k!==good;if(bad){E++;fp.gs[k].el.classList.add('ko')}
  fp.kill();const tg=ftag(...POS[good],NAME[good]);tg.el.classList.add('lit');
  if(bad)L.card(`Réponse attendue : ${NAME[good].toLowerCase()}`,okT,{ko:1});else L.card('Oui',okT,{ok:1});await contLab(L,i<IT.length-1?'Description suivante':'Continuer');tg.kill()}
 jlog('4 h 58',`Quel terminal : 3 descriptions${errTxt(E)}`);L.kill();filmOff();return gate('qt',E,IT.length,9,'Quel terminal')}

/* 12. un mot sur l'avenir */
async function terminal4(){step();head('Introduction',"Un mot sur l'avenir");
 vue(`<div class="hero">${bigIc('leaf')}<p class="cap">Un projet de transformation de la plateforme</p><p class="sub it" id="t1">Le Groupe ADP s'y engage. Ce projet favorise la transition écologique.</p></div>`);
 await sayS('i09',[W('i09','Ce projet',()=>show('#t1')),
  W('i09','Le onze',()=>vue(`<div class="hero"><p class="huge tel">11 février 2021</p><p class="cap">Un nouveau projet d'aménagement</p><p class="sub it" id="t2">Demandé par le Gouvernement au Groupe ADP après l'arrêt du projet de Terminal 4. Cette demande est l'une des conséquences de la crise du Covid-19.</p></div>`)),
  W('i09',"C'était après",()=>show('#t2')),
  W('i09','Ce qui compte',()=>vue(`<div class="hero">${bigIc('cone')}<p class="cap">Pour vous</p><p class="sub">Un chantier modifie les cheminements, donc les habitudes.</p></div>`))]);
 await contV();return null}

/* 13. les pistes : la photo du support, zoom sur chaque doublet ; puis le permis et sa première case */
async function pistes(){step();await photo('pistes',FAST?10:400);const PM=PORT()?{mode:'contain'}:{};setCam({zoom:1,...PM});await vzOff();
 const L=label([0,0,0],{lead:false}).title('La configuration des pistes');
 const Z=(fx,fy,zoom,D)=>{const c=pt(fx,fy);return camTo({x:c[0],z:c[2],zoom,...PM},D)};
 await sayS('i10',[at('i10',.02,()=>L.card('Quatre pistes parallèles','En deux doublets.')),
  W('i10','Le doublet nord',()=>{L.card('Le doublet nord','Pistes 3 et 1.',{a:pt(.45,.25)});Z(.53,.2,PORT()?2.2:1.3,1800)}),
  W('i10','Le doublet sud',()=>{L.card('Le doublet sud','Pistes 2 et 4.',{a:pt(.72,.88)});Z(.72,.86,PORT()?2.2:1.5,2000)}),
  W('i10','Vous les',()=>{L.card('Vous les retrouverez au zonage','',{a:null});camTo({zoom:1,...PM},1800)})]);
 L.kill();head('Introduction','Avant de prendre le volant');
 vue(`<div class="hero" id="pw"><div class="pmini" id="pmn"><b>T</b>${ET.map((e,i)=>`<i>${i+1}</i>`).join('')}</div><p class="sub">${nb('Dix étapes, dans l\'ordre.')}</p><div class="xb it" id="sk">${bub('Xavier','Si je connais déjà la plateforme, je peux sauter la réglementation et passer au volant ?')}</div></div>`);
 await sayS('i11',[at('i11',.02,()=>show('#sk'))]);
 await sayS('i12',[at('i12',.02,()=>$c('#sk').classList.remove('in')),W('i12','qui fixe',()=>$c('#pmn i').classList.add('now')),
  W('i12','Il est cinq',()=>{const s=$c('#sk');s.innerHTML='<span class="clock">Il est 5 h 00</span><p class="tx" style="margin:10px auto 0;max-width:none">C\'est l\'heure de l\'histoire, pas la durée de la formation.</p>';s.classList.add('in')})]);
 return null}
async function fin(){step();head('Préambule terminé · 5 h 00','Votre permis est encore vide');
 vue(`<div class="hero"><div class="pmini" id="pmn"><b>T</b>${ET.map((e,i)=>`<i>${i+1}</i>`).join('')}</div>
  <p class="cap" id="fc1" style="margin-top:clamp(6px,1.6vh,14px);font-size:clamp(22px,2.2vw,32px)">Première case à cocher : la réglementation</p>
  <div class="jcard" id="jr" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal</p><p class="tx" style="font-size:var(--B)">${nb("Les heures sont celles de l'histoire, pas la durée de la formation.")}<span class="lgx">${nb(" Pour relire le journal à tout moment : « Journal », en bas de l'écran.")}</span></p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('p17',[W('p17','Première case',()=>$c('#pmn i').classList.add('now'))]);
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="etape1.html">Étape 1 · La réglementation</a>`}
// l'ordre des écrans ; en navigation libre (?nav), chacun peut se lancer seul
async function quelTerminalSeul(L){if(!L){FILM.currentTime=5.8;FV.cx=.47;FV.fill=.74;filmOn();L=label([0,0,0],{lead:false,dock:true})}return quelTerminal(L)}
runSeq([['Couverture',cover],['Comment ça marche',marche],['La formation obligatoire',obligatoire],['Le candidat',candidat],["L'attestation de réussite (Annexe 8)",attestation],['Vrai ou faux',vraiFaux],['Les objectifs',objectifs],['Le plan de la matinée',plan],['Pourquoi Roissy',roissy],['Les aérogares, vues du ciel',survol],['Quel terminal ?',quelTerminalSeul],["Un mot sur l'avenir",terminal4],['Les pistes',pistes],['Fin du préambule',fin]]);

window.V2={get here(){return CUR&&CUR.k},tgts};
</script></body></html>
