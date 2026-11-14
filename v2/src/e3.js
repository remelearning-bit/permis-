
/* ---------------- Étape 3 · L'accès au côté piste (diapos 78 à 86) ---------------- */
document.head.insertAdjacentHTML('beforeend',`<style>
.pmw{position:relative;width:100%;height:100%;overflow:hidden;border-radius:14px;background:#fff;box-shadow:0 8px 28px rgba(38,60,82,.14);pointer-events:auto}
.pmw .in{position:absolute;left:0;top:0;transform-origin:0 0;transition:transform 1.3s cubic-bezier(.3,.1,.2,1)}
.pmw img{display:block;width:100%;height:100%}
.pmw svg{position:absolute;inset:0;width:100%;height:100%}
.pmw .pg{opacity:0;transition:opacity .45s}.pmw .pg.on{opacity:1}
.pmw .pg circle.r{fill:none;stroke:#fff;stroke-width:6}.pmw .pg circle.d{fill:var(--marine);stroke:#fff;stroke-width:4}
.pmw .pg rect{fill:#fff;filter:drop-shadow(0 2px 6px rgba(0,0,0,.35))}.pmw .pg line{stroke:#fff;stroke-width:4}
.pmw .pg .pln{font:800 30px Barlow,system-ui,sans-serif;fill:var(--marine);text-anchor:middle}.pmw .pg .plh{font:600 22px Barlow,system-ui,sans-serif;fill:#5d6b78;text-anchor:middle}
.pmw .pg.cur rect{fill:var(--marine)}.pmw .pg.cur .pln{fill:#fff}.pmw .pg.cur .plh{fill:#dfe5e9}
.pmw .pte rect{fill:rgba(38,60,82,.88)}.pmw .pte text{font:700 22px Barlow,system-ui,sans-serif;fill:#fff;text-anchor:middle}
.pmw .src{position:absolute;right:8px;bottom:6px;font-size:12px;color:#33475b;background:rgba(255,255,255,.85);padding:2px 8px;border-radius:6px}
.hrs{width:100%;max-width:1100px;display:flex;flex-direction:column;gap:clamp(12px,2.2vh,22px)}
.hrs .row2{display:grid;grid-template-columns:clamp(110px,12vw,170px) 1fr;gap:16px;align-items:center;opacity:.25;transition:opacity .45s}
.hrs .row2.in{opacity:1}
.hrs .nm{font-weight:800;font-size:clamp(18px,1.7vw,26px)}.hrs .nm small{display:block;font-weight:600;font-size:15px;color:#5d6b78}
.hrs .tr2{position:relative;height:clamp(30px,4.4vh,42px);background:#dfe5e9;border-radius:10px}
.hrs .op{position:absolute;top:0;bottom:0;background:var(--marine);border-radius:10px;transform-origin:left center;transform:scaleX(0);transition:transform 1.1s ease}
.hrs .row2.in .op{transform:none}
.hrs .ax2{position:relative;height:22px;margin-left:calc(clamp(110px,12vw,170px) + 16px)}
.hrs .ax2 span{position:absolute;transform:translateX(-50%);font-weight:700;font-size:14px;color:#5d6b78}.ax2 span:last-child{transform:translateX(-100%)}
.hrs .now{position:absolute;top:-10px;bottom:-10px;width:5px;margin-left:-2px;background:var(--marine);border-radius:3px;z-index:2;transition:left .7s ease,opacity .4s;opacity:0}
.hrs .now.in{opacity:1}.hrs .now b{position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:var(--marine);color:#fff;font-size:14px;padding:2px 8px;border-radius:999px;white-space:nowrap;margin-bottom:4px}
.hrs .now.ok{background:var(--marine)}.hrs .now.ok b{background:var(--marine)}
.qimg{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(20px,3vw,48px);align-items:center;width:100%;max-width:1220px}.qimg .fig img{display:block;width:100%}
.hrs .nowc .now{top:-6px;bottom:-6px}
.oc{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:clamp(20px,3vw,46px);align-items:center;width:100%;max-width:1220px}
@media (max-width:700px){.qimg{grid-template-columns:1fr;gap:12px}.qimg .fig img{max-height:22vh;width:auto;max-width:100%;margin:0 auto}#vz .stage>.qimg{margin-top:0}.hrs .nowc{left:94px!important}.hrs .row2{grid-template-columns:86px 1fr;gap:8px}.hrs .nm{font-size:16px}.hrs .ax2{margin-left:94px}.oc{grid-template-columns:1fr;gap:14px}.pmw .pg .pln{font-size:40px}}
</style>`);
const H3="Étape 3 · L'accès au côté piste";
// un film du présentiel : il ne se lance pas tout seul, l'apprenant choisit de le regarder (consigne n°3, § 5.1.1.2)
async function film(src,cred){const vv=$('#vv'),vid=$('#vid');const c=$('#vcred');if(c)c.remove();if(cred)$('#vclose').insertAdjacentHTML('beforebegin',`<p id="vcred" style="margin:0;font-size:var(--B);color:var(--pierre)">${nb(cred)}</p>`);
 const open=async()=>{vv.src=src;vid.classList.add('on');VO.pause();
  try{await vv.play()}catch(e){if(!$('#vplay')){$('#vclose').insertAdjacentHTML('beforebegin','<button class="act" id="vplay">Lancer le film</button>');$('#vplay').onclick=()=>{vv.play().catch(()=>{});$('#vplay').remove()}}}
  await new Promise(r=>{$('#vclose').onclick=r;vv.onended=r});vv.pause();vid.classList.remove('on')};
 let seen=false;
 for(;;){VB.innerHTML=`<button class="act alt">${seen?'Revoir le film':'Regarder le film'}</button><button class="act">Continuer</button>`;VB.querySelectorAll('button').forEach(b=>b.style.pointerEvents='auto');
  const b=await new Promise(r=>VB.querySelectorAll('button').forEach(x=>x.onclick=()=>r(x)));VB.innerHTML='';if(!b.classList.contains('alt'))break;await open();seen=true}}

/* 1. la couverture */
var CAPS={aerien3:'Photo du support REM Formation'};
async function cover(){step();await photo('aerien3',FAST?10:1200);setCam({zoom:1.1});
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 3 · 5 h 30').card("L'accès au côté piste","Pour entrer côté piste, il faut des titres spéciaux et passer par un point de contrôle.");
 await cont(L,"C'est parti");try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}
 await sayS('a01',[W('a01','Il faut',()=>L.card('Des titres spéciaux, des points de passage précis','Les personnes et les véhicules y sont contrôlés.'))],{zoom:1.08});
 await sayS('a02',[at('a02',.02,()=>L.card('« Et au volant, on passe où ? »','Xavier'))]);
 await sayS('a03',[at('a03',.02,()=>L.card("Par un poste d'accès routier",'Avec inspection filtrage. On y va, et on prépare les papiers en route.'))]);
 await cont(L,"Rejoindre le poste d'accès");L.kill();return null}

/* 2. les points d'accès */
async function points(){step();head(H3,"Les points d'accès");
 vue(`<div class="hero nph"><p class="cap">Des titres spéciaux</p><p class="sub">L'accès au côté piste les nécessite.</p><p class="sub it" id="p1" style="font-weight:700;color:var(--marine)">Et il ne peut avoir lieu qu'en des points précis, où l'on contrôle les personnes et les véhicules : l'inspection filtrage.</p></div>`);
 const DUO=`<div class="duo2"><div class="card2 it" id="q1">${IC.user}<p class="lb">À pied</p><p class="big2" style="font-size:clamp(24px,2.6vw,40px)">Le poste d'inspection filtrage</p><p class="lb" style="margin:0">PIF</p><p class="tx" style="max-width:none;margin:0">Le contrôle des personnes.</p></div>
  <div class="card2 it" id="q2" style="position:relative">${IC.car}<p class="lb">En véhicule</p><p class="big2" style="font-size:clamp(24px,2.6vw,40px)">Le poste d'accès routier avec inspection filtrage</p><p class="lb" style="margin:0">PARIF</p><p class="tx" style="max-width:none;margin:0">Le contrôle du conducteur et du véhicule.</p><p class="tx it" id="q3" style="font-weight:700;color:var(--marine);margin:8px 0 0;max-width:none">C'est là que vous allez.</p></div></div>`;
 await sayS('a04',[W('a04','Il ne peut',()=>show('#p1')),W('a04','À pied',()=>{vue(DUO);show('#q1',true)}),W('a04','En véhicule',()=>show('#q2',true)),W('a04',"c'est là",()=>show('#q3'))]);
 undim();await pause();return null}

/* 3. les secteurs et les titres : les trois films du présentiel */
async function secteurs(){step();head(H3,'Les secteurs');
 vue(`<div class="side"><div style="display:flex;justify-content:center"><figure class="fig" style="width:auto"><img src="${IMG.secteurs}" alt="" style="display:block;max-height:54vh;width:auto"><figcaption>Image du support REM Formation</figcaption></figure></div><div><p class="cap" style="text-align:left;margin:0 0 12px">La plateforme découpée en secteurs</p>
  <ul class="conds"><li id="s1"><b>1</b><span>Les secteurs fonctionnels<small>Trafic (TRA) et manœuvre (MAN).</small></span></li><li id="s2"><b>2</b><span>Le secteur de sûreté F<small>Ceux de l'arrêté préfectoral.</small></span></li><li id="s3"><b>3</b><span>Le poste d'accès routier (PARIF)<small>La porte d'entrée de ces secteurs pour les véhicules.</small></span></li></ul></div></div>`);
 await sayS('a05',[W('a05','Les secteurs fonctionnels',()=>on('#s1')),W('a05','et le secteur',()=>on('#s2')),W('a05','Le poste',()=>on('#s3'))]);
 await film('../video/secteurs.mp4','Vidéo du support REM Formation : les secteurs.');
 await vite("Le poste d'accès routier avec inspection filtrage, c'est :",[["La porte d'entrée des secteurs côté piste pour les véhicules.",1,"Les personnes et les véhicules y sont contrôlés."],["Le point d'entrée des piétons.",0,"Non : à pied, on passe par un poste d'inspection filtrage."],["Un parking de l'aire de trafic.",0,"Non : c'est un point de contrôle, à l'entrée du côté piste."]],'5 h 33',"Question : le poste d'accès routier");return null}
/* une question entre deux films, pour garder l'apprenant actif ; la réponse est expliquée, on continue dans tous les cas */
async function vite(q,opts,h,j){vue(`<div class="qc" id="qq" style="width:min(820px,100%)"><p class="n">Avant la suite</p><p class="q">${nb(q)}</p></div>`);
 await wait(FAST?0:400);const qc=$c('#qq');const o=opts.map((x,k)=>[String(k),x[0]]);const gk=String(opts.findIndex(x=>x[1]));const kot={};opts.forEach((x,k)=>{if(!x[1])kot[k]=x[2]});
 const e=await pick(null,o,gk,opts[+gk][2],kot,'Continuer',{once:true,host:qc});jlog(h,j+(e?' (1 erreur)':''))}
async function titres(){step();head(H3,'Les titres d\'accès');
 vue(`<div class="duo2"><div class="card2 it" id="l1">${IC.car}<p class="lb">Pour le véhicule</p><p class="big2" style="font-size:clamp(26px,2.8vw,44px)">Le laissez-passer véhicule</p><p class="tx" style="max-width:none;margin:0">Un titre d'accès à part, propre au véhicule, en plus de vos titres personnels.</p></div>
  <div class="card2 it" id="l2">${IC.badge}<p class="lb">Pour vous</p><p class="big2" style="font-size:clamp(26px,2.8vw,44px)">Le titre de circulation aéroportuaire</p><p class="tx" style="max-width:none;margin:0">Le badge : permanent ou temporaire, ses couleurs, ce qu'il autorise.</p></div></div>`);
 await sayS('a06',[at('a06',.02,()=>show('#l1',true))]);
 await film('../video/laissez-passer.mp4','Vidéo du support REM Formation : le laissez-passer véhicule.');
 await vite("Le laissez-passer véhicule :",[["C'est le titre d'accès du véhicule, en plus de vos titres personnels.",1,"Un titre d'accès à part, propre au véhicule."],["Il remplace votre titre de circulation aéroportuaire.",0,"Non : il s'ajoute à vos titres personnels, il ne remplace rien."]],'5 h 35',"Question : le laissez-passer véhicule");
 vue(`<div class="duo2"><div class="card2 it in dim" id="l1">${IC.car}<p class="lb">Pour le véhicule</p><p class="big2" style="font-size:clamp(26px,2.8vw,44px)">Le laissez-passer véhicule</p><p class="tx" style="max-width:none;margin:0">Un titre d'accès à part, propre au véhicule, en plus de vos titres personnels.</p></div>
  <div class="card2 it" id="l2">${IC.badge}<p class="lb">Pour vous</p><p class="big2" style="font-size:clamp(26px,2.8vw,44px)">Le titre de circulation aéroportuaire</p><p class="tx" style="max-width:none;margin:0">Le badge : permanent ou temporaire, ses couleurs, ce qu'il autorise.</p></div></div>`);
 await sayS('a06b',[at('a06b',.02,()=>show('#l2',true))]);
 await film('../video/titres-circulation.mp4','Vidéo du support REM Formation : les titres de circulation.');undim();return null}

/* 4. ce que le conducteur doit avoir */
const KIT=[['badge','Son titre de circulation aéroportuaire','Son titre'],['card',"Une pièce d'identité",'Une pièce'],['card','Son permis de conduire','Son permis'],['key','Son autorisation de conduite','Son autorisation','Permis T, R, M ou P.'],['car','Le laissez-passer véhicule','Le laissez-passer'],['doc',"L'attestation d'autorisation pour le véhicule","L'attestation d'autorisation"],['doc',"L'attestation d'assurance et la carte grise","L'attestation d'assurance"],['car',"Un véhicule identifiable par le logo de l'entreprise",'Et le véhicule']];
const KIT2=[['vest','Le gilet haute visibilité','le gilet','Obligatoire, il se porte.'],['doc','La vignette de circulation','la vignette','Sur le véhicule.'],['badge',"Le badge d'accès à lecture magnétique",'et le badge','Sur le véhicule.']];
async function kit(){step();head(H3,'Ce que le conducteur doit avoir');
 vue(`<div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2vh,20px)"><p class="cap" style="margin:0;font-size:clamp(22px,2.2vw,34px)">Ce que tout conducteur doit posséder<span id="kn" hidden></span></p><div class="tiles" style="grid-template-columns:repeat(3,1fr)">${KIT.map((f,i)=>`<div class="tile" id="kt${i}">${i===3?p3dHTML('width:100%;height:clamp(70px,11vh,92px)'):IC[f[0]]}<p class="lb">${nb(f[1])}${f[3]?`<br><small style="font-weight:400">${nb(f[3])}</small>`:''}</p></div>`).join('')}</div></div>`);
 p3dMount();let prev=null,n=0;const lit=i=>{if(prev!==null)$c('#kt'+prev).classList.remove('now');$c('#kt'+i).classList.add('in','now');prev=i;$c('#kn').textContent=++n};
 await sayS('a07',KIT.map((f,i)=>W('a07',f[2],()=>lit(i),.005)));if(prev!==null)$c('#kt'+prev).classList.remove('now');
 vue(`<div class="tiles" style="grid-template-columns:repeat(3,1fr);max-width:960px">${KIT2.map((f,i)=>`<div class="tile" id="ku${i}">${IC[f[0]]}<p class="lb">${nb(f[1])}<br><small style="font-weight:400">${nb(f[3])}</small></p></div>`).join('')}</div>`);
 await sayS('a08',KIT2.map((f,i)=>W('a08',f[2],()=>on('#ku'+i),.005)));
 await pause(2000);return null}
async function boite(){step();head('Au poste d\'accès · 5 h 34','La boîte à gants');
 vue(`<div class="hero nph"><p class="cap">L'agent de contrôle demande les papiers</p><p class="sub">Pour chaque document : je le présente, ou il n'a rien à faire là ?</p></div>`);
 await sayS('a09');
 const E=await sortV([{t:"Mon titre de circulation aéroportuaire.",b:"p",ok:"Obligatoire : il fait partie de ce que tout conducteur doit avoir sur lui.",h:"Pas tout à fait. Repensez aux neuf choses à avoir sur soi."},
  {t:"Ma carte de carburant.",b:"n",ok:"Elle n'est pas un document de circulation.",h:"Pas tout à fait. Est-elle dans la liste des neuf ?"},
  {t:"Ma pièce d'identité.",b:"p",ok:"Obligatoire : elle fait partie de ce que tout conducteur doit avoir sur lui.",h:"Pas tout à fait. Repensez aux neuf choses à avoir sur soi."},
  {t:"Mon permis de conduire.",b:"p",ok:"Obligatoire, et en cours de validité : il fait partie de ce que tout conducteur doit avoir sur lui.",h:"Pas tout à fait. Repensez aux neuf choses à avoir sur soi."},
  {t:"Mon ticket de parking PH.",b:"n",ok:"Le parking PH sert pour le Bureau Local de Sûreté, pas pour entrer côté piste.",h:"Pas tout à fait. Un ticket de parking est-il un titre d'accès ?"},
  {t:"Mon autorisation de conduite, le permis T.",b:"p",ok:"Obligatoire : c'est l'autorisation de conduite, l'objet de cette formation.",h:"Pas tout à fait. Repensez aux neuf choses à avoir sur soi."},
  {t:"Le laissez-passer véhicule.",b:"p",ok:"Obligatoire : c'est le titre d'accès du véhicule.",h:"Pas tout à fait. Quel titre d'accès est propre au véhicule ?"},
  {t:"Ma carte Vitale.",b:"n",ok:"La carte Vitale n'est pas un document de circulation.",h:"Pas tout à fait. Est-elle dans la liste des neuf ?"},
  {t:"L'attestation d'autorisation pour le véhicule.",b:"p",ok:"Obligatoire : c'est l'un des documents du véhicule.",h:"Pas tout à fait. Repensez aux documents du véhicule."},
  {t:"L'attestation d'assurance du véhicule.",b:"p",ok:"Obligatoire : c'est l'un des documents du véhicule.",h:"Pas tout à fait. Repensez aux documents du véhicule."},
  {t:"La carte grise du véhicule.",b:"p",ok:"Obligatoire : c'est l'un des documents du véhicule.",h:"Pas tout à fait. Repensez aux documents du véhicule."}],
  [['p','Je le présente','doc'],['n','Pas demandé','warn']],{label:'Document',id:'bg'});
 jlog('5 h 34',`Au poste d'accès, la boîte à gants : 11 documents${errTxt(E)}`);return gate('bg',E,11,4,'La boîte à gants')}
async function exceptions(){step();head(H3,'Deux exceptions');
 vue(`<div class="duo2"><div class="card2 it" id="x1">${IC.car}<p class="big2" style="font-size:clamp(28px,3vw,48px)">Les véhicules captifs</p></div><div class="card2 it" id="x2">${IC.car}<p class="big2" style="font-size:clamp(28px,3vw,48px)">Les véhicules non immatriculés</p></div></div>`);
 await sayS('a10',[W('a10','les véhicules captifs',()=>show('#x1')),W('a10','et les véhicules',()=>show('#x2'))]);
 await pause();return null}

/* 5. les postes d'accès routiers : la carte, puis les horaires */
const PMW=1420,PHh=786;
const PS=[{n:"15 India",h:"24 h sur 24",c:[381,242],l:[381,96],box:[90,50,700,420],w:'Quinze India',o:0,f:24},{n:"29 India",h:"De 5 h à 22 h",c:[1364,290],l:[1290,140],box:[860,100,1420,460],w:'Vingt-neuf India',o:5,f:22},{n:"21 Mike",h:"24 h sur 24",c:[865,521],l:[865,375],box:[560,330,1170,700],w:'Vingt et un Mike',o:0,f:24},{n:"13 Papa",h:"De 4 h à 21 h",c:[212,687],l:[212,541],box:[0,470,600,786],w:'Treize Papa',o:4,f:21}];
const TE=[["Terminal 1",470,34],["Terminal 2",1190,412]];
function pmap(host){host.innerHTML=`<div class="pmw"><div class="in"><img src="${IMG.parifclean}" alt="Les quatre postes d'accès routiers sur la vue aérienne de la plateforme"><svg viewBox="0 0 ${PMW} ${PHh}" preserveAspectRatio="none">
  ${TE.map(t=>`<g class="pte"><rect x="${t[1]-92}" y="${t[2]-24}" width="184" height="44" rx="22"/><text x="${t[1]}" y="${t[2]+8}">${t[0]}</text></g>`).join('')}
  ${PS.map((p,i)=>`<g class="pg" id="pg${i}"><circle class="r" cx="${p.c[0]}" cy="${p.c[1]}" r="34"/><circle class="d" cx="${p.c[0]}" cy="${p.c[1]}" r="12"/><line x1="${p.c[0]}" y1="${p.c[1]-34}" x2="${p.l[0]}" y2="${p.l[1]+42}"/><rect x="${p.l[0]-118}" y="${p.l[1]-42}" width="236" height="84" rx="16"/><text class="pln" x="${p.l[0]}" y="${p.l[1]-2}">${p.n}</text><text class="plh" x="${p.l[0]}" y="${p.l[1]+28}">${p.h}</text></g>`).join('')}</svg></div><div class="src">Vue aérienne du support REM Formation</div></div>`;
 const w0=host.querySelector('.pmw'),inn=w0.querySelector('.in');let box={},Z=null;
 const fit=()=>{if(!w0.isConnected)return;const W=w0.clientWidth,H=w0.clientHeight;let w=W,h=W*PHh/PMW;if(h>H){h=H;w=H*PMW/PHh}box={w,h,W,H};inn.style.width=w+'px';inn.style.height=h+'px';zoomTo(Z)};
 const zoomTo=b=>{Z=b;const {w,h,W,H}=box;if(!W)return;if(!b){inn.style.transform=`translate(${(W-w)/2}px,${(H-h)/2}px) scale(1)`;return}
  const s=Math.min(W/((b[2]-b[0])*w/PMW),H/((b[3]-b[1])*h/PHh));const cx=(b[0]+b[2])/2*w/PMW,cy=(b[1]+b[3])/2*h/PHh;
  let X=W/2-s*cx,Y=H/2-s*cy;X=Math.min(0,Math.max(W-s*w,X));Y=Math.min(0,Math.max(H-s*h,Y));if(s*w<W)X=(W-s*w)/2;if(s*h<H)Y=(H-s*h)/2;inn.style.transform=`translate(${X}px,${Y}px) scale(${s})`};
 addEventListener('resize',()=>setTimeout(fit,60));requestAnimationFrame(fit);setTimeout(fit,400);
 return {zoomTo,show:i=>w0.querySelector('#pg'+i).classList.add('on'),cur:i=>{w0.querySelectorAll('.pg').forEach((g,k)=>g.classList.toggle('cur',k===i))}}}
const HRS=()=>`<div class="hrs" style="position:relative">${PS.map((p,i)=>`<div class="row2" id="h${i}"><div class="nm">${p.n}<small>${p.h}</small></div><div class="tr2"><div class="op" style="left:${p.o/24*100}%;width:${(p.f-p.o)/24*100}%"></div></div></div>`).join('')}<div class="ax2">${[0,6,12,18,24].map(h=>`<span style="left:${h/24*100}%">${h} h</span>`).join('')}</div><div class="nowc" style="position:absolute;top:0;bottom:22px;left:calc(clamp(110px,12vw,170px) + 16px);right:0;pointer-events:none"><div class="now" id="nw"><b>5 h 30</b></div></div></div>`;
// le repère « maintenant » : sur toutes les lignes, ou sur une seule
function nowAt(h,row,lbl){const st=cur(),nc=st.querySelector('.nowc'),nw=st.querySelector('#nw');if(row==null){nc.style.top='0px';nc.style.bottom='22px';nc.style.height=''}else{const r=st.querySelectorAll('.row2')[row];nc.style.top=r.offsetTop+'px';nc.style.height=r.offsetHeight+'px';nc.style.bottom='auto'}
 nw.style.left=h/24*100+'%';nw.querySelector('b').textContent=lbl;nw.classList.add('in');return nw}
async function postes(){step();head(H3,"Les postes d'accès routiers (PARIF)");
 const st=vue('<div class="pmh" style="width:100%;height:100%"></div>');st.classList.add('tall');const M=pmap(st.querySelector('.pmh'));
 await sayS('a11',[W('a11','Quatre postes',()=>{for(let i=0;i<4;i++)setTimeout(()=>M.show(i),FAST?0:i*180)}),...PS.map((p,i)=>W('a11',p.w,()=>{M.cur(i);M.zoomTo(p.box)},.005))]);
 M.cur(-1);M.zoomTo(null);await wait(1400);
 head(H3,'Les horaires, sur vingt-quatre heures');vue(HRS());
 [0,1,2,3].forEach(i=>setTimeout(()=>on('#h'+i),FAST?0:300+i*250));
 await sayS('a12',[at('a12',.3,()=>nowAt(5.5,null,'5 h 30'))]);
 await sayS('a13');await contV();return null}
async function ouvert(){step();head("Quel poste d'accès à cette heure-là ? · 5 h 38",'Ouvert ou fermé ? À vous');
 const OUV2=[["29 India, à 4 h 30.",1,4.5,'f',"Le 29 India ouvre à 5 h."],["13 Papa, à 4 h 30.",3,4.5,'o',"Le 13 Papa est ouvert de 4 h à 21 h."],["15 India, à 23 h.",0,23,'o',"Le 15 India est ouvert 24 h sur 24."],["21 Mike, à 22 h 30.",2,22.5,'o',"Le 21 Mike est ouvert 24 h sur 24."],["29 India, à 21 h 30.",1,21.5,'o',"Le 29 India est ouvert de 5 h à 22 h."],["13 Papa, à 22 h.",3,22,'f',"Le 13 Papa ferme à 21 h."]];
 const IT=alt('ouv',[["13 Papa, à 3 h 30 du matin.",3,3.5,'f',"Le 13 Papa ouvre à 4 h."],["21 Mike, à 2 h du matin.",2,2,'o',"Le 21 Mike est ouvert 24 h sur 24."],["29 India, à 23 h.",1,23,'f',"Le 29 India ferme à 22 h."],["15 India, à 5 h.",0,5,'o',"Le 15 India est ouvert 24 h sur 24."],["29 India, à 6 h.",1,6,'o',"Le 29 India est ouvert de 5 h à 22 h."],["13 Papa, à 21 h 30.",3,21.5,'f',"Le 13 Papa ferme à 21 h."]],OUV2);
 vue(`<div class="oc"><div>${HRS()}</div><div class="qc" id="oq"><p class="n">À vous</p><p class="q">Un poste d'accès et une heure : ouvert, ou fermé ?</p></div></div>`);
 on('.row2');
 await sayS('a14');const qc=$c('#oq');let E=0;
 const hh=h=>`${Math.floor(h)} h${h%1?' 30':''}`;
 for(let i=0;i<IT.length;i++){const [t,row,h,g,ok]=IT[i];qc.querySelector('.n').textContent=`Situation ${i+1} sur ${IT.length}`;qc.querySelector('.q').innerHTML=nb(t);
  cur().querySelectorAll('.row2').forEach((r,k)=>r.style.opacity=k===row?1:.3);
  const nw=nowAt(h,row,hh(h));nw.classList.remove('ok');
  E+=await pick(null,[['o','Ouvert'],['f','Fermé']],g,ok,"Pas tout à fait. Regardez la barre du poste : à cette heure-là, est-elle remplie ?",i<IT.length-1?'Suivant':'Continuer',{once:true,host:qc,onDone:()=>nw.classList.add('ok')})}
 cur().querySelectorAll('.row2').forEach(r=>r.style.opacity=1);
 jlog('5 h 38',`Quel poste d'accès à cette heure-là : 6 situations${errTxt(E)}`);return gate('ouv',E,IT.length,7,'Ouvert ou fermé')}

/* 6. les deux questions du chapitre */
async function questions(){step();head(H3+' · 5 h 42',"Deux questions d'entraînement");
 const Q=[{img:'qparif',line:'a15',bk:[7],q:"Quel est le nom du PARIF entouré de rouge ?",opts:[["21 Mike",0,"Pas celui-ci. Le poste entouré est au sud-ouest de la plateforme."],["13 Papa",1,"Le 13 Papa, au sud-ouest de la plateforme, ouvert de 4 h à 21 h."],["15 India",0,"Pas celui-ci. Le 15 India est au nord ; le poste entouré est au sud-ouest."]]},
  {line:'a16',bk:[3,4],q:"Quels documents sont nécessaires lors du passage d'un PARIF avec mon véhicule pour pénétrer côté piste ?",fixed:1,opts:[["Un titre de circulation aéroportuaire, un permis de conduire, une autorisation de conduite côté piste, une pièce d'identité, la carte grise du véhicule, l'assurance, l'attestation de laissez-passer du véhicule ainsi que le badge du véhicule.",1,"La liste complète : vos titres personnels, et ceux du véhicule."],["Un titre de circulation aéroportuaire et un permis de conduire.",0,"Il en manque. Repensez aux titres personnels et aux documents du véhicule."],["Un titre de circulation aéroportuaire.",0,"Il en manque beaucoup. Repensez aux titres personnels et aux documents du véhicule."]]}];
 // seconde série : questions du test Groupe ADP (sans voix)
 const Q2=[{img:'qparif2',bk:[7],q:"Quel est le nom du PARIF entouré de rouge ?",opts:[["15 India",0,""],["21 Mike",1,"Le 21 Mike, à l'ouest du terminal 2, ouvert 24 h sur 24."],["29 India",0,""]]},
  {bk:[7],q:"Quels sont les PARIF ouverts 24 h sur 24 ?",opts:[["Le 21 Mike et le 15 India",1,"Ils ne ferment jamais. Le 29 India ouvre de 5 h à 22 h, le 13 Papa de 4 h à 21 h."],["Tous",0,""],["Le 13 Papa et le 29 India",0,""]]}];
 ALT.q3=1;const QS=(TRY.q3||0)%2?Q2:Q;
 let E=0;const MISS=new Set();
 for(let i=0;i<QS.length;i++){const z=QS[i];
  vue(z.img?`<div class="qimg"><figure class="fig"><img src="${IMG[z.img]}" alt=""></figure><div class="qc" id="qq"><p class="n">Question ${i+1} sur ${QS.length}</p><p class="q">${nb(z.q)}</p></div></div>`:`<div class="qc" id="qq" style="width:min(820px,100%)"><p class="n">Question ${i+1} sur ${QS.length}</p><p class="q">${nb(z.q)}</p></div>`);
  if(z.line)await sayS(z.line);else await wait(FAST?0:400);const qc=$c('#qq');let o=z.opts.map((x,k)=>[String(k),x[0]]);if(!z.fixed)for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
  const gk=String(z.opts.findIndex(x=>x[1]));const kot={};z.opts.forEach((x,k)=>{if(!x[1])kot[k]=x[2]});
  const e=await pick(null,o,gk,z.opts[+gk][2],kot,i<QS.length-1?'Question suivante':'Terminer',{once:true,host:qc});E+=e;if(e)z.bk.forEach(k=>MISS.add(k))}
 jlog('5 h 42',`Questions d'entraînement : 2 questions${errTxt(E)}`);return gate('q3',E,QS.length,[...MISS].sort((a,b)=>a-b),"Questions d'entraînement",9)}
async function fin(){step();head('Étape 3 terminée · 5 h 45','Troisième case cochée');
 const ET=['La réglementation','Le zonage et la cartographie',"L'accès au côté piste","L'inspection du véhicule",'La circulation des véhicules',"Les règles de sécurité sur l'aire de mouvement","La circulation autour de l'avion","L'aire de manœuvre","Les procédures d'urgence","L'amélioration continue de la sécurité"];
 vue(`<div class="hero"><div class="pmini" id="pmn"><b>T</b>${ET.map((e,i)=>`<i class="${i<2?'now':''}">${i<2?'✓':i+1}</i>`).join('')}</div>
  <p class="cap" id="fc1" style="margin-top:clamp(6px,1.6vh,14px);font-size:clamp(22px,2.2vw,32px)">Prochaine étape : l'inspection du véhicule</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de l'étape</p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('a17',[at('a17',.02,()=>{const i=$c('#pmn i:nth-of-type(3)');i.classList.add('now');i.innerHTML='✓'})]);
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Étape 4 · L'inspection du véhicule</a>`}
const NEXT='etape4.html';
runSeq([['Couverture',cover],["Les points d'accès",points],['Les secteurs',secteurs],["Les titres d'accès",titres],['Ce que le conducteur doit avoir',kit],['La boîte à gants',boite],['Deux exceptions',exceptions],["Les postes d'accès routiers",postes],['Ouvert ou fermé ? À vous',ouvert],['Questions',questions],["Fin de l'étape",fin]]);
