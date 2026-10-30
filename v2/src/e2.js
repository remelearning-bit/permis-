const P=(k,t,x='')=>`<p class="lb">${nb(t)}</p>${x?`<p class="tx">${nb(x)}</p>`:''}`;
const bub=(who,t)=>`<div class="bub"><small>${who}</small>${nb(t)}</div>`;
const K=(id,w,d=.02)=>{const t=LINES[id].t;const i=t.indexOf(w);if(i<0){console.error('mot absent',id,w);return .5}return Math.max(.01,i/t.length-d)};
const W=(id,w,fn,d)=>[K(id,w,d),fn];
function vue(html){html=html.replace(/([^\s=<>"]) ([?!;:»])/g,'$1\u00a0$2').replace(/« /g,'«\u00a0').replace(/(\d) (h|km|m|€|jours|mois|ans)\b/g,'$1\u00a0$2');const cp=document.getElementById('cap');if(cp)cp.classList.remove('on');const old=[...VZ.querySelectorAll('.stage')];const st=document.createElement('div');st.className='stage fr';st.innerHTML=html;VZ.appendChild(st);VZ.classList.add('on');
 requestAnimationFrame(()=>requestAnimationFrame(()=>st.classList.add('in')));old.forEach(o=>{o.classList.remove('in');o.style.transition='opacity .25s';o.style.opacity=0;setTimeout(()=>o.remove(),300)});return st}
const cur=()=>VZ.querySelector('.stage:last-child')||VZ;
const on=(sel,cls='in')=>cur().querySelectorAll(sel).forEach(e=>e.classList.add(cls));
const $c=sel=>cur().querySelector(sel);
const CHECK='<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const CROSS='<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const bigIc=k=>IC[k].replace('class="ic"','class="ic hic"');
async function contLab(L,txt){const id='c'+Math.random().toString(36).slice(2,7);L.html(`<button class="act" id="${id}">${txt}</button>`);const b=$('#'+id);await new Promise(r=>b.onclick=r);b.remove()}

/* ---------------- Étape 2 · Le zonage et la cartographie (diapos 46 à 77) ----------------
   La plateforme vue du ciel (photographies IGN) : on plonge, on visite chaque zone, l'apprenant place lui-même six endroits,
   on descend jusqu'à un poste ; puis les postes de stationnement sur les photos du support, et les questions du chapitre. */
document.head.insertAdjacentHTML('beforeend',`<style>
#mapv{position:fixed;left:0;right:0;top:0;bottom:calc(46px + env(safe-area-inset-bottom));z-index:1;overflow:hidden;background:#eef0ef;perspective:900px;perspective-origin:50% 0%;opacity:0;transition:opacity .7s}
#mapv.on{opacity:1}
#map{position:absolute;left:50%;bottom:0;transform-origin:50% 100%}
#haze{position:fixed;left:0;right:0;top:0;height:58%;z-index:1;background:linear-gradient(#eef0ef 0%,#eef0ef 22%,rgba(238,240,239,0) 100%);pointer-events:none;opacity:0}
#credit{position:fixed;right:10px;bottom:calc(52px + env(safe-area-inset-bottom));z-index:3;font-size:12px;color:#33475b;background:rgba(255,255,255,.85);padding:3px 8px;border-radius:6px;pointer-events:none;opacity:0;transition:opacity .4s}
#credit.on{opacity:1}
#alt{position:fixed;right:max(16px,2vw);top:max(18px,3vh);z-index:3;background:#fff;border-radius:14px;box-shadow:0 6px 24px rgba(38,60,82,.16);padding:10px 16px;text-align:right;opacity:0;transition:opacity .4s;pointer-events:none}
#alt.on{opacity:1}#alt b{display:block;font-weight:800;font-size:clamp(24px,2.4vw,36px);line-height:1;font-variant-numeric:tabular-nums}#alt span{font-size:14px;color:var(--pierre);font-weight:600}
#flycap{position:fixed;left:50%;top:44%;transform:translate(-50%,-50%);z-index:3;background:rgba(255,255,255,.9);border-radius:16px;padding:14px 26px;font-weight:800;font-size:clamp(24px,3vw,46px);line-height:1.1;color:var(--marine);box-shadow:0 6px 24px rgba(38,60,82,.18);opacity:0;transition:opacity .45s;pointer-events:none;text-align:center;max-width:90vw}
#flycap.on{opacity:1}
.zt{position:fixed;left:0;top:0;z-index:4;pointer-events:none;opacity:0;transition:opacity .45s}
.zt.in{opacity:1}
.zt i{position:absolute;left:-10px;top:-10px;width:20px;height:20px;border-radius:50%;background:var(--marine);border:3px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.35)}
.zt span{position:absolute;left:18px;top:-20px;white-space:nowrap;font-weight:700;font-size:var(--B);background:#fff;color:var(--marine);padding:7px 14px;border-radius:999px;box-shadow:0 2px 10px rgba(38,60,82,.28);border:3px solid #fff}
.zt.l span{left:auto;right:18px}
.zt.ville i{background:#F4F1EA;border-color:var(--marine)}.zt.trafic i{background:#3C7DC4}.zt.manoeuvre i{background:var(--marine)}
.zt.trafic span{border-color:#3C7DC4}.zt.manoeuvre span{border-color:var(--marine)}.zt.ville span{border-color:#d9d2c3}
.mk2{position:fixed;left:0;top:0;z-index:8;pointer-events:none}
.mk2 b{position:absolute;left:-22px;top:-22px;width:44px;height:44px;border-radius:50%;background:#fff;border:4px solid #9aa5ae;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:19px;color:#5d6b78;box-shadow:0 2px 8px rgba(0,0,0,.3);transition:all .35s}
.mk2 span{position:absolute;left:28px;top:-15px;white-space:nowrap;font-weight:700;font-size:15px;background:rgba(255,255,255,.94);color:var(--marine);padding:5px 11px;border-radius:999px;box-shadow:0 2px 8px rgba(38,60,82,.2)}
.mk2.l span{left:auto;right:28px}
.mk2.live{z-index:9}.mk2.live b{pointer-events:auto;cursor:pointer;border-color:var(--orangeV);color:var(--orange);animation:pul .7s ease-out 2}
.mk2.done b{color:#fff;border-color:#fff}.mk2.done.ville b{background:#F4F1EA;border-color:var(--marine);color:var(--marine)}.mk2.done.trafic b{background:#3C7DC4}.mk2.done.manoeuvre b{background:var(--marine)}
.legend2{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;font-weight:600;font-size:15px}
.legend2 i{display:inline-block;width:15px;height:15px;border-radius:50%;vertical-align:-2px;margin-right:6px;border:2px solid var(--marine)}
.legend2 span{font-size:15px!important;font-weight:600!important;margin:0!important}.legend2 .lv i{background:#F4F1EA}.legend2 .lt i{background:#3C7DC4;border-color:#3C7DC4}.legend2 .lm i{background:var(--marine)}
#ring{position:fixed;z-index:1;border:5px solid #fff;border-radius:26px;opacity:0;transform:translate(-50%,-50%) scale(.7);transition:opacity .6s,transform .7s cubic-bezier(.2,.8,.2,1.1),border-color .4s;box-shadow:0 0 0 3000px rgba(28,43,58,0);pointer-events:none}
#ring.on{opacity:1;transform:translate(-50%,-50%) scale(1);box-shadow:0 0 0 3000px rgba(28,43,58,.32)}
#ring.ok{border-color:var(--vert)}
#ring i{position:absolute;left:-5px;bottom:100%;margin-bottom:8px;background:#fff;color:var(--marine);font-style:normal;font-weight:700;font-size:var(--A);padding:4px 14px;border-radius:10px;white-space:nowrap}
#ring.ok i{color:var(--vert)}
.lab .lst li{color:#9aa5ae}.lab .lst li.on{color:var(--marine)}.lab .lst li.past{color:#5d6b78;font-weight:400}
.lab .lst li em{display:block;font-style:normal;font-weight:400;font-size:.92em;color:#5d6b78}
.lab .lst li i{position:absolute;left:0;top:4px;width:22px;height:22px;border-radius:50%;border:2px solid #c9d1d7;display:flex;align-items:center;justify-content:center}
.lab .lst li i svg{width:14px;stroke:#fff;stroke-width:3.4;fill:none;opacity:0}
.lab .lst li.on i,.lab .lst li.past i{background:var(--marine);border-color:var(--marine)}.lab .lst li.on i svg,.lab .lst li.past i svg{opacity:1}
.lab .lst li.no.on i,.lab .lst li.no.past i{background:var(--marine);border-color:var(--marine)}
.lab .lst li.l1{margin-left:0}.lab .lst li.l2{margin-left:22px}
.lab .who2{display:flex;gap:10px;align-items:flex-start;margin:6px 0 0;font-size:var(--B);line-height:1.35}
.lab .who2 b{flex:none;width:30px;height:30px;border-radius:50%;background:var(--marine);color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px}
/* les photos des postes de stationnement */
#sx{position:absolute;inset:0;overflow:hidden;border-radius:14px;background:#fff;box-shadow:0 8px 28px rgba(38,60,82,.14);pointer-events:auto}
#sx .in{position:absolute;transform-origin:0 0;transition:transform 1.2s cubic-bezier(.3,.1,.2,1)}
#sx img{display:block;width:100%;height:100%}
#sx svg{position:absolute;inset:0;width:100%;height:100%}
#sx path{fill:rgba(38,60,82,.0);stroke:#fff;stroke-width:0;transition:all .45s;vector-effect:non-scaling-stroke}
#sx path.on{fill:rgba(60,125,196,.22);stroke:#3C7DC4;stroke-width:3}
#sx path.cur{fill:rgba(60,125,196,.38);stroke:#fff;stroke-width:4}
#sx .tg{position:absolute;transform:translate(-50%,-50%);white-space:nowrap;font-weight:700;font-size:1em;background:#fff;color:var(--marine);padding:.25em .65em;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,.3);opacity:0;transition:opacity .4s,background .3s,color .3s;border:2px solid #3C7DC4}
#sx .tg.k{background:var(--marine);color:#fff;border-color:var(--marine)}
#sx .tg.sm{font-size:.82em}
#sx .tg.on{opacity:1}#sx .tg.cur{background:#3C7DC4;color:#fff;border-color:#fff;z-index:2}
#sx .src{position:absolute;right:8px;bottom:6px;font-size:12px;color:#33475b;background:rgba(255,255,255,.85);padding:2px 8px;border-radius:6px}
.sxw{position:relative;width:100%;height:100%}
.qimg{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(20px,3vw,48px);align-items:center;width:100%;max-width:1220px}
.qimg .fig{margin:0;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(38,60,82,.16);background:#fff}.qimg .fig img{display:block;width:100%}
.qfb2{font-weight:700;font-size:var(--B);line-height:1.38;margin:10px 0 0}.qfb2.ok{color:var(--vert)}.qfb2.ko{color:var(--orange)}.qfb2:empty{display:none}
@media (max-width:700px){
 .qimg{grid-template-columns:1fr;gap:12px}.qimg .fig{max-height:24vh}.qimg .fig img{max-height:24vh;width:auto;margin:0 auto}
 #flycap{top:auto;bottom:90px;transform:translateX(-50%);font-size:22px}
 .mk2 span{display:none}.mk2.done span,.mk2.live span{display:block;font-size:13px}
 #alt{top:auto;bottom:calc(84px + env(safe-area-inset-bottom));right:10px;padding:6px 10px}#alt b{font-size:20px}
 .zt span{font-size:14px;padding:5px 10px}
}
</style>`);
const H2='Étape 2 · Le zonage et la cartographie';

/* ---------------- la carte : les photographies IGN, du plus loin au plus près ---------------- */
const LV=[12,14,16,18,19].map(z=>({z,c:null}));
const MV=document.createElement('div');MV.id='mapv';const MCV=document.createElement('canvas');MCV.id='map';MV.appendChild(MCV);const MG=MCV.getContext('2d');
const HZ=document.createElement('div');HZ.id='haze';
document.body.insertBefore(MV,$('#ui'));document.body.insertBefore(HZ,$('#ui'));
document.body.insertAdjacentHTML('beforeend','<div id="credit">Photographies © IGN, BD ORTHO, licence ouverte Etalab 2.0</div><div id="alt"><b id="altv">12 km</b><span>au-dessus de Roissy</span></div><div id="flycap"></div><div id="ring"><i id="ringl">Un avion au poste</i></div>');
let ready=0,dirty=true,MW=0,MH=0,CW=0,CH=0;
function feather(im,z){const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);
 const fx=im.width*(z===12?.22:.06),fy=im.height*(z===12?.22:.06);x.globalCompositeOperation='destination-in';
 let gr=x.createLinearGradient(0,0,im.width,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(fx/im.width,'#000');gr.addColorStop(1-fx/im.width,'#000');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(0,0,im.width,im.height);
 gr=x.createLinearGradient(0,0,0,im.height);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(fy/im.height,'#000');gr.addColorStop(1-fy/im.height,'#000');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(0,0,im.width,im.height);
 return c}
const mapReady=new Promise(res=>LV.forEach(L=>{const im=new Image();im.onload=()=>{L.c=feather(im,L.z);ready++;dirty=true;if(ready===LV.length)res()};im.src=IGN['z'+L.z]}));
// la caméra : le point c de la carte s'affiche au point (sx, sy) de l'écran
const Z0=12.6,T0=58;
let mc={Z:Z0,c:A.slice(),tilt:T0,sx:0,sy:0};
function mlayout(){MW=MV.clientWidth;MH=MV.clientHeight;CW=Math.ceil(MW*1.9);CH=Math.ceil(MH*2.1);MCV.width=CW;MCV.height=CH;MCV.style.width=CW+'px';MCV.style.height=CH+'px';MCV.style.marginLeft=(-CW/2)+'px';dirty=true}
addEventListener('resize',()=>{mlayout();if(mc.fit)Object.assign(mc,frameFor(mc.fit))});mlayout();
// le cadrage : où poser le point visé, selon la place laissée par le panneau
function focus(){const mob=innerWidth<700;if(mob){const top=PANEL?PANEL.y+PANEL.h:MH*.3;return [MW/2,Math.min(MH-80,top+(MH-top)/2)]}
 const left=PANEL?PANEL.x+PANEL.w:0;return [left+(MW-left)/2,MH/2]}
function frameFor(o){const [sx,sy]=focus();if(o.Z!=null)return {Z:o.Z,c:o.c,tilt:0,sx,sy};
 // une boîte de points à faire tenir dans la partie libre
 const xs=o.pts.map(p=>p[0]),ys=o.pts.map(p=>p[1]);const bx=[Math.min(...xs),Math.max(...xs)],by=[Math.min(...ys),Math.max(...ys)];
 const mob=innerWidth<700;const left=!mob&&PANEL?PANEL.x+PANEL.w:0,top=mob&&PANEL?PANEL.y+PANEL.h:0;
 const fw=(MW-left)*.78,fh=(MH-top)*.72;const Z=Math.min(Math.log2(fw/(bx[1]-bx[0])/256),Math.log2(fh/(by[1]-by[0])/256));
 return {Z,c:[(bx[0]+bx[1])/2,(by[0]+by[1])/2],tilt:0,sx,sy}}
function mrender(){MG.fillStyle='#eef0ef';MG.fillRect(0,0,CW,CH);
 const fx=CW/2+(mc.sx-MW/2),fy=CH-MH+mc.sy;const R=[];
 for(const Lv of LV){if(!Lv.c)continue;const s=2**(mc.Z-Lv.z);if(s<.06)continue;
  const dx=(mc.c[0]-C0[0])*PX(Lv.z),dy=(mc.c[1]-C0[1])*PX(Lv.z);
  const w=1600*s,h=1000*s,x=fx-(dx+800)*s,y=fy-(dy+500)*s;R.push({L:Lv,x,y,w,h})}
 let k=0;for(let i=R.length-1;i>=0;i--){const r=R[i],m=.12;if(r.x+r.w*m<=0&&r.y+r.h*m<=0&&r.x+r.w*(1-m)>=CW&&r.y+r.h*(1-m)>=CH){k=i;break}}
 for(let i=k;i<R.length;i++){const r=R[i];MG.drawImage(r.L.c,r.x,r.y,r.w,r.h)}
 MCV.style.transform=`rotateX(${mc.tilt}deg)`;HZ.style.opacity=MV.classList.contains('on')?Math.min(1,mc.tilt/T0*1.1):0}
const toS=m=>{const k=PX(mc.Z);return [mc.sx+(m[0]-mc.c[0])*k,mc.sy+(m[1]-mc.c[1])*k]};
// les étiquettes et les repères posés sur la carte
const MO=new Set();
function placeMO(){const flat=mc.tilt<.5;for(const o of MO){if(!flat){o.el.style.visibility='hidden';continue}const [x,y]=toS(o.m);o.el.style.visibility=(x<4||x>innerWidth-4||y<4||y>MH-4)?'hidden':'';o.el.style.transform=`translate(${x}px,${y}px)`;
  const sp=o.el.querySelector('span');if(sp&&!o.side)o.el.classList.toggle('l',x+30+sp.offsetWidth>innerWidth-8)}}
(function mloop(){requestAnimationFrame(mloop);if(dirty&&ready&&MV.classList.contains('on')){mrender();dirty=false}if(MO.size)placeMO();
 const r=$('#ring');if(r.classList.contains('on')&&RING){const [x,y]=toS(RING.m);const k=PX(mc.Z)/PX(19);r.style.left=x+'px';r.style.top=y+'px';r.style.width=RING.w*k+'px';r.style.height=RING.h*k+'px'}})();
let RING=null;
function ztag(m,txt,cls='',side){const el=document.createElement('div');el.className='zt '+cls+(side==='left'?' l':'');el.innerHTML=`<i></i><span>${nb(txt)}</span>`;document.body.appendChild(el);const o={el,m,side,kill(){el.classList.remove('in');MO.delete(o);setTimeout(()=>el.remove(),450)}};MO.add(o);placeMO();requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('in')));return o}
function clearMO(){[...MO].forEach(o=>o.kill?o.kill():(o.el.remove(),MO.delete(o)))}
function altText(Z){const m=12000/2**(Z-Z0);return m>=1000?(m/1000).toFixed(m>=3000?0:1).replace('.',',')+' km':Math.round(m/10)*10+' m'}
const ease3=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
let fanim=0,FCT=0;
// un vol : zoom, déplacement et redressement ; des légendes s'affichent pendant le vol
function flyTo(o,D,caps=[]){return new Promise(res=>{const T=frameFor(o);mc.fit=o;const F={...mc,c:mc.c.slice()};const t0=performance.now();let ci=-1;cancelAnimationFrame(fanim);if(FAST)D=80;
 const al=$('#alt'),fc=$('#flycap');al.classList.add('on');
 const f=now=>{const t=Math.min(1,(now-t0)/D),e=ease3(t),w=ease3(Math.min(1,t*1.15));
  mc.Z=F.Z+e*(T.Z-F.Z);mc.c=[F.c[0]+(T.c[0]-F.c[0])*w,F.c[1]+(T.c[1]-F.c[1])*w];mc.tilt=F.tilt+(T.tilt-F.tilt)*(1-Math.pow(1-e,1.25));
  mc.sx=F.sx+(T.sx-F.sx)*e;mc.sy=F.sy+(T.sy-F.sy)*e;dirty=true;$('#altv').textContent=altText(mc.Z);
  let k=-1;caps.forEach((c,i)=>{if(t>=c[0])k=i});
  if(k!==ci){ci=k;fc.classList.remove('on');clearTimeout(FCT);if(k>=0)FCT=setTimeout(()=>{fc.textContent=caps[k][1];fc.classList.add('on')},160)}
  if(t<1)fanim=requestAnimationFrame(f);else{Object.assign(mc,T,{fit:o});dirty=true;clearTimeout(FCT);fc.classList.remove('on');al.classList.remove('on');res()}};
 fanim=requestAnimationFrame(f)})}
function mapOn(){MV.classList.add('on');$('#credit').classList.add('on');VZ.classList.remove('on');headOff();dirty=true}
function mapOff(){MV.classList.remove('on');$('#credit').classList.remove('on');$('#alt').classList.remove('on');clearMO();$('#ring').className=''}

/* ---------------- le panneau : une fiche dont chaque ligne s'allume quand la voix la dit ---------------- */
// FC[id] = [titre, [[texte, mot de la voix, 1 oui / -1 non, précision, niveau]]]
function fiche(L,id){const [t,its]=FC[id];L.title(t);L.card('','',{a:null});
 const ul=document.createElement('ul');ul.className='lst';ul.innerHTML=its.map(x=>`<li class="${x[2]===-1?'no ':''}l${x[4]||0}"><i>${x[2]===-1?CROSS:CHECK}</i>${nb(x[0])}${x[3]?`<em>${nb(x[3])}</em>`:''}</li>`).join('');
 L.el.querySelectorAll('.lst,.who2').forEach(e=>e.remove());L.el.appendChild(ul);L.show();
 const lis=[...ul.children];return its.map((x,i)=>W(id,x[1],()=>{lis.forEach((l,k)=>{if(k===i)l.classList.add('on');else if(l.classList.contains('on')){l.classList.remove('on');l.classList.add('past')}})},.005))}
function quote(L,id){L.el.querySelectorAll('.lst,.who2').forEach(e=>e.remove());L.card('','',{a:null});const w=LINES[id].w==='X';L.html(`<div class="who2"><b>${w?'X':'D'}</b><span>${nb(LINES[id].t)}</span></div>`)}
function clearLab(L){L.el.querySelectorAll('.lst,.who2,.legend2').forEach(e=>e.remove())}
const at2=(id,frac,fn)=>[frac,fn];

/* 1. l'ouverture, à douze kilomètres, et la plongée */
async function ouverture(){step();await mapReady;mapOn();
 // vue inclinée, à douze kilomètres : le centre de l'aéroport est loin devant
 Object.assign(mc,{Z:Z0,c:A.slice(),tilt:T0,sx:MW/2,sy:CH*.62-CH+MH});dirty=true;
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 2 · 5 h 20').card('3 250 hectares. Où passe la frontière ?',"À cheval sur trois départements : le Val-d'Oise, la Seine-et-Marne et la Seine-Saint-Denis.");
 try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}
 await cont(L,"C'est parti");
 await sayS('r1');
 await cont(L,'Plonger sur la plateforme');L.kill();
 await flyTo({pts:SPOTS.map(s=>s.m)},FAST?80:6000,[[.1,'Roissy-Charles de Gaulle'],[.55,'3 250 hectares, trois départements']]);
 return null}

/* 2. côté ville, côté piste : la visite, zone par zone */
const ZCLS={ville:'ville',trafic:'trafic',manoeuvre:'manoeuvre'};
async function deuxMondes(){step();if(!MV.classList.contains('on')){await mapReady;mapOn();Object.assign(mc,frameFor({pts:SPOTS.map(s=>s.m)}))}
 const L=label([0,0,0],{lead:false,dock:true}).title('La frontière');
 quote(L,'r2');await sayS('r2');
 const h=fiche(L,'r3a');await sayS('r3a',h);
 await contLab(L,'Voir de près');
 for(let i=0;i<TOUR.length;i++){const z=TOUR[i];clearMO();clearLab(L);L.title(z.cap).card(z.pin,'',{a:null});
  await flyTo({Z:z.Z,c:z.v||z.m},2000);
  ztag(z.m,z.pin,z.cls||'',z.side);
  for(const id of z.lines){if(FC[id]){const hk=fiche(L,id);await sayS(id,hk)}else{quote(L,id);await sayS(id)}}
  await contLab(L,i<TOUR.length-1?'Zone suivante':'Remonter')}
 clearMO();clearLab(L);L.kill();return null}

/* 3. à vous : six endroits à placer */
async function sixEndroits(){step();if(!MV.classList.contains('on')){await mapReady;mapOn()}
 const L=label([0,0,0],{lead:false,dock:true}).title('Côté ville, aire de trafic ou aire de manœuvre ?');L.card('À vous','Six endroits sur la plateforme.',{a:null});
 L.html('<div class="legend2"><span class="lv"><i></i>Côté ville</span><span class="lt"><i></i>Aire de trafic</span><span class="lm"><i></i>Aire de manœuvre</span></div>');
 const ALL={pts:SPOTS.map(s=>s.m)};await flyTo(ALL,1800,[[.05,'On remonte']]);
 const mks=SPOTS.map((s,i)=>{const el=document.createElement('div');el.className='mk2'+(s.side==='left'?' l':'');el.innerHTML=`<b>${i+1}</b><span>${nb(s.nom)}</span>`;document.body.appendChild(el);const o={el,m:s.m,side:s.side||'r'};MO.add(o);return o});
 placeMO();
 await sayS('r7');let E=0;
 for(let i=0;i<SPOTS.length;i++){const s=SPOTS[i],mk=mks[i];L.card(`Endroit ${i+1} sur ${SPOTS.length}`,`Cliquez sur le repère numéro ${i+1}.`,{a:null});mk.el.classList.add('live');
  await new Promise(r=>mk.el.querySelector('b').onclick=r);mk.el.classList.remove('live');mk.el.querySelector('b').onclick=null;
  L.card(s.nom,'',{a:null});await flyTo({Z:s.Z,c:s.v||s.m},1700,[[.05,s.nom]]);
  L.card(s.nom,'Où sommes-nous ?',{a:null});
  const ks=Object.keys(ZN);for(let a=ks.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[ks[a],ks[b]]=[ks[b],ks[a]]}
  const kot={};ks.forEach(k=>{if(k!==s.zone)kot[k]=s.fb[k]});
  E+=await pick(L,ks.map(k=>[k,ZN[k]]),s.zone,s.fb[s.zone],kot,i<SPOTS.length-1?'Repère suivant':"Vue d'ensemble",{once:true,x:true});
  mk.el.classList.add('done',s.zone);mk.el.querySelector('span').textContent=ZN[s.zone];
  await flyTo(ALL,1500)}
 jlog('5 h 24',`Six endroits placés sur la plateforme${errTxt(E)}`);
 if(Q.has('pass')?false:SPOTS.length-E<needOf(SPOTS.length)){mks.forEach(o=>{o.el.remove();MO.delete(o)});L.kill();mapOff();return gate('six',E,SPOTS.length,1,'Six endroits')}
 await gate('six',E,SPOTS.length,1,'Six endroits');
 L.card('Six endroits placés','',{a:null});await sayS('r8');await contLab(L,'Rejoindre le poste');
 mks.forEach(o=>{o.el.remove();MO.delete(o)});L.kill();return null}

/* 4. au poste : dans quelle aire sommes-nous ? */
const VQ={ville:"Un avion au contact d'une passerelle, c'est déjà côté piste. Côté ville, aucun avion ne stationne.",
 piste:"C'est juste, mais pas assez précis : côté piste, un poste de stationnement, c'est l'aire de trafic.",
 manoeuvre:"Les avions ne décollent pas d'ici : ils y stationnent, on les charge, on les avitaille. Ce n'est pas l'aire de manœuvre.",
 trafic:"Un poste de stationnement, c'est l'aire de trafic. Le permis T vous y autorise."};
async function auPoste(){step();if(!MV.classList.contains('on')){await mapReady;mapOn();Object.assign(mc,frameFor({pts:SPOTS.map(s=>s.m)}))}
 const L=label([0,0,0],{lead:false,dock:true}).title('Au poste').card('On descend jusqu\'à un poste','',{a:null});
 const mob=innerWidth<700;const plane=Math.max(200,Math.min(innerWidth*.6,520));
 await flyTo({Z:19+Math.log2(plane/400),c:PP},FAST?80:7000,[[.08,'Le terminal 2'],[.5,'Les postes au contact'],[.85,'Un avion au poste']]);
 RING={m:PP,w:488,h:380};$('#ring').classList.add('on');
 const hk=fiche(L,'r9');await sayS('r9',hk);clearLab(L);L.card('À vous','Dans quelle aire sommes-nous ?',{a:null});
 const ks=['ville','piste','manoeuvre','trafic'];for(let a=ks.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[ks[a],ks[b]]=[ks[b],ks[a]]}
 const NM={ville:'Côté ville',piste:'Côté piste',manoeuvre:'Aire de manœuvre',trafic:'Aire de trafic'};const kot={};ks.forEach(k=>{if(k!=='trafic')kot[k]=VQ[k]});
 const E=await pick(L,ks.map(k=>[k,NM[k]]),'trafic',VQ.trafic,kot,'Suivant',{once:true,x:true,onDone:()=>{$('#ring').classList.add('ok');$('#ringl').textContent='Aire de trafic'}});
 jlog('5 h 28',`Au poste : l'aire de trafic${errTxt(E)}`);L.kill();mapOff();RING=null;return gate('poste',E,1,3,'Au poste')}

/* 5. les postes de stationnement, sur les photos du support */
const SECT=[['vue','Les postes de stationnement','r11'],['t1','Terminal 1 et terminal 3','r12'],['t2','Terminal 2','r13'],['fn','Zone de fret nord','r14'],['fs','Zone de fret sud','r15']];
function stageFor(k,host){const g=G[k];host.innerHTML=`<div id="sx"><div class="in"><img src="${PHO[k]}" alt=""><svg viewBox="0 0 1600 900" preserveAspectRatio="none">${g.polys.map(([id,i])=>{const p=(POLY[k]||{})[i];return p?`<path data-id="${id}" d="M${p.map(q=>q.join(' ')).join(' L')} Z"/>`:''}).join('')}</svg>${g.tags.map(t=>`<span class="tg ${t[4]||''}" data-id="${t[0]}" style="left:${t[2]/16}%;top:${t[3]/9}%">${t[1]}</span>`).join('')}</div><div class="src">Photo du support REM Formation</div></div>`;
 const sx=host.querySelector('#sx'),inn=sx.querySelector('.in');let box={},Z=[800,450,1];
 const fit=()=>{if(!sx.isConnected)return;const W=sx.clientWidth,H=sx.clientHeight;let w=W,h=W*9/16;if(h>H){h=H;w=H*16/9}if(W<700){w=Math.min(W*1.6,H*16/9);h=w*9/16}box={w,h,W,H};inn.style.width=w+'px';inn.style.height=h+'px';inn.style.fontSize=Math.max(11,(W<700?w*1.25:w)/1600*22)+'px';zoom(...Z)};
 const zoom=(fx,fy,s)=>{Z=[fx,fy,s];const {w,h,W,H}=box;if(!W)return;const sw=s*w,sh=s*h;
  const X=sw>=W?Math.min(0,Math.max(W-sw,W/2-s*fx*w/1600)):(W-sw)/2,Y=sh>=H?Math.min(0,Math.max(H-sh,H/2-s*fy*h/900)):(H-sh)/2;inn.style.transform=`translate(${X}px,${Y}px) scale(${s})`};
 const el=id=>[...sx.querySelectorAll(`[data-id="${id}"]`)];
 const S={zoom,show:ids=>ids.forEach(id=>el(id).forEach(e=>e.classList.add('on'))),showAll:(ids,gap=90)=>ids.forEach((id,i)=>setTimeout(()=>S.show([id]),FAST?0:i*gap)),
  cur:ids=>{sx.querySelectorAll('.cur').forEach(e=>e.classList.remove('cur'));S.show(ids);ids.forEach(id=>el(id).forEach(e=>e.classList.add('cur')))},clear:()=>sx.querySelectorAll('.cur').forEach(e=>e.classList.remove('cur')),fit};
 addEventListener('resize',()=>setTimeout(fit,60));requestAnimationFrame(fit);setTimeout(fit,500);return S}
async function postes(){step();mapOff();
 for(let i=0;i<SECT.length;i++){const [k,ttl,id]=SECT[i];head(H2,ttl);
  const st=vue('<div class="sxw" style="height:100%"></div>');st.classList.add('tall');const S=stageFor(k,st.querySelector('.sxw'));const g=G[k];
  const hk=(g.hooks[id]||[]).map(([w,f])=>[typeof w==='number'?w:K(id,w,.005),()=>f(S)]);
  await sayS(id,hk);S.clear();S.zoom(800,450,1);g.tags.forEach(t=>S.show([t[0]]));
  await contV(i<SECT.length-1?'Suivant':'Continuer')}
 return null}

/* 6. les trois questions du chapitre */
// seconde série : questions des QCM REM et du test Groupe ADP (sans voix)
const QUIZ2=[
 {q:"Qu'appelle-t-on l'aire de mouvement ?",opts:[["Les postes de stationnement avion.",0,"Les postes ne sont qu'une partie de l'aire de trafic."],["Les voies de circulation avion.",0,"Les voies de circulation avion n'en sont qu'une partie."],["L'aire de trafic et l'aire de manœuvre.",1,"Côté piste, la zone où les avions se déplacent : l'aire de manœuvre et l'aire de trafic, ensemble."]]},
 {q:"Comment nomme-t-on la voie où circule un avion, la voie de circulation avion ?",opts:[["Une taxiway ou une taxilane.",1,"La taxiway conduit aux pistes, la taxilane fait entrer l'avion sur son poste."],["Une route de service.",0,"Une route de service, c'est pour les véhicules."],["Une piste.",0,"La piste sert au décollage et à l'atterrissage."]]},
 {q:"Où se trouve la zone de fret de FedEx ?",opts:[["Dans la zone de fret nord.",1,"FedEx occupe la zone de fret nord, aux postes India."],["Dans la zone de fret sud.",0,"La zone de fret sud regroupe les postes Mike, November et Papa."],["Au terminal 1.",0,"Le terminal 1 accueille des passagers, pas le hub de FedEx."]]}];
async function questions(){step();head(H2,"Trois questions d'entraînement");
 let E=0;ALT.q2=1;const QZ=(TRY.q2||0)%2?QUIZ2:QUIZ;
 for(let i=0;i<QZ.length;i++){const z=QZ[i];
  vue(z.ph?`<div class="qimg"><figure class="fig"><img src="${PHO[z.ph]}" alt=""></figure><div class="qc" id="qq"><p class="n">Question ${i+1} sur ${QZ.length}</p><p class="q">${nb(z.q)}</p></div></div>`:`<div class="qc" id="qq" style="width:min(720px,100%)"><p class="n">Question ${i+1} sur ${QZ.length}</p><p class="q">${nb(z.q)}</p></div>`);
  if(z.line)await sayS(z.line);else await wait(FAST?0:400);const qc=$c('#qq');let o=z.opts.map((x,k)=>[String(k),x[0]]);for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
  const gk=String(z.opts.findIndex(x=>x[1]));const kot={};z.opts.forEach((x,k)=>{if(!x[1])kot[k]=x[2]});
  E+=await pick(null,o,gk,z.opts[+gk][2],kot,i<QZ.length-1?'Question suivante':'Terminer',{once:true,x:true,host:qc})}
 jlog('5 h 30',`Questions d'entraînement : 3 questions${errTxt(E)}`);return gate('q2',E,QZ.length,1,"Questions d'entraînement")}
async function fin(){step();mapOff();head('Étape 2 terminée · 5 h 30','Deuxième case cochée');
 const ET=['La réglementation','Le zonage et la cartographie',"L'accès au côté piste","L'inspection du véhicule",'La circulation des véhicules',"Les règles de sécurité sur l'aire de mouvement","La circulation autour de l'avion","L'aire de manœuvre","Les procédures d'urgence","L'amélioration continue de la sécurité"];
 vue(`<div class="hero"><div class="pmini" id="pmn"><b>T</b>${ET.map((e,i)=>`<i class="${i<1?'now':''}">${i<1?'✓':i+1}</i>`).join('')}</div>
  <p class="cap" id="fc1" style="margin-top:clamp(6px,1.6vh,14px);font-size:clamp(22px,2.2vw,32px)">Prochaine étape : l'accès au côté piste</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de l'étape</p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('r10',[at2('r10',.02,()=>{const i=$c('#pmn i:nth-of-type(2)');i.classList.add('now');i.innerHTML='✓'})]);
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Étape 3 · L'accès au côté piste</a>`}
const NEXT='etape3.html';
runSeq([['La plongée',ouverture],['Côté ville, côté piste : les zones',deuxMondes],['À vous : six endroits',sixEndroits],['Au poste',auPoste],['Les postes de stationnement',postes],['Questions',questions],["Fin de l'étape",fin]]);
