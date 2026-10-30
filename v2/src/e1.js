const P=(k,t,x='')=>`<p class="lb">${nb(t)}</p>${x?`<p class="tx">${nb(x)}</p>`:''}`;
const bub=(who,t)=>`<div class="bub"><small>${who}</small>${nb(t)}</div>`;
// le moment où la voix prononce un mot : sa place dans la réplique
const K=(id,w,d=.02)=>{const t=LINES[id].t;const i=t.indexOf(w);if(i<0){console.error('mot absent',id,w);return .5}return Math.max(.01,i/t.length-d)};
const W=(id,w,fn,d)=>[K(id,w,d),fn];
// un nouveau plan, en fondu enchaîné sur le précédent
function vue(html){html=html.replace(/([^\s=<>"]) ([?!;:»])/g,'$1\u00a0$2').replace(/« /g,'«\u00a0').replace(/(\d) (h|km|m|€|jours|mois|ans)\b/g,'$1\u00a0$2');const cp=document.getElementById('cap');if(cp)cp.classList.remove('on');const old=[...VZ.querySelectorAll('.stage')];const st=document.createElement('div');st.className='stage fr';st.innerHTML=html;VZ.appendChild(st);VZ.classList.add('on');
 requestAnimationFrame(()=>requestAnimationFrame(()=>st.classList.add('in')));old.forEach(o=>{o.classList.remove('in');o.style.transition='opacity .25s';o.style.opacity=0;setTimeout(()=>o.remove(),300)});return st}
const cur=()=>VZ.querySelector('.stage:last-child')||VZ;
const on=(sel,cls='in')=>cur().querySelectorAll(sel).forEach(e=>e.classList.add(cls));
const $c=sel=>cur().querySelector(sel);
const CHECK='<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const bigIc=k=>IC[k].replace('class="ic"','class="ic hic"');
async function contLab(L,txt){const id='c'+Math.random().toString(36).slice(2,7);L.html(`<button class="act" id="${id}">${txt}</button>`);const b=$('#'+id);await new Promise(r=>b.onclick=r);b.remove()}
// un repère posé juste au-dessus d'un bouton de la barre du bas
function barTarget(btn,txt){return new Promise(res=>{const el=document.createElement('div');el.className='tgt above';el.innerHTML=`<i></i><span>${txt}</span>`;document.body.appendChild(el);
 const place=()=>{if(!el.isConnected)return;const r=btn.getBoundingClientRect();el.style.transform=`translate(${r.left+r.width/2}px,${r.top-24}px)`;requestAnimationFrame(place)};place();
 let done=false;const fin=()=>{if(done)return;done=true;el.remove();btn.removeEventListener('click',direct);res()};const direct=()=>fin();btn.addEventListener('click',direct);
 setTimeout(()=>el.classList.add('live','first'),FAST?60:500);el.onclick=()=>{if(!el.classList.contains('live'))return;fin();btn.click()}})}

/* ---------------- Étape 1 · La réglementation (diapos 19 à 45) ----------------
   Une idée par plan, en plein cadre ; ce que la voix nomme s'allume, le reste s'estompe.
   Les activités se font sur le visuel : on clique sur la photo, on range dans des colonnes, on clique sur le permis. */
Object.assign(IC,{
 book:'<svg class="ic" viewBox="0 0 48 48"><path d="M7 9h13a4 4 0 014 4v29a3 3 0 00-3-3H7zM41 9H28a4 4 0 00-4 4v29a3 3 0 013-3h14z"/></svg>',
 doc:'<svg class="ic" viewBox="0 0 48 48"><path d="M12 5h18l8 8v30H12z"/><path d="M30 5v8h8M18 21h14M18 28h14M18 35h9"/></svg>',
 car:'<svg class="ic" viewBox="0 0 48 48"><path d="M6 30l4-11a4 4 0 014-3h20a4 4 0 014 3l4 11v8H6z"/><path d="M6 30h36"/><circle cx="14" cy="38" r="3.5"/><circle cx="34" cy="38" r="3.5"/></svg>',
 user:'<svg class="ic" viewBox="0 0 48 48"><circle cx="24" cy="15" r="7"/><path d="M10 42c1-10 6-15 14-15s13 5 14 15"/></svg>',
 tie:'<svg class="ic" viewBox="0 0 48 48"><circle cx="24" cy="13" r="7"/><path d="M9 43c1-10 6-16 15-16s14 6 15 16"/><path d="M24 27l-3 4 3 9 3-9z"/></svg>',
 radio:'<svg class="ic" viewBox="0 0 48 48"><rect x="15" y="9" width="18" height="32" rx="4"/><path d="M21 35h6M38 16a10 10 0 010 14M42 12a16 16 0 010 22"/></svg>',
 belt:'<svg class="ic" viewBox="0 0 48 48"><circle cx="24" cy="10" r="5"/><path d="M13 43V25a11 11 0 0122 0v18"/><path d="M14 21l20 18"/></svg>',
 test:'<svg class="ic" viewBox="0 0 48 48"><rect x="17" y="4" width="14" height="27" rx="4"/><path d="M20 31v11h8V31M22 12h4"/></svg>',
 stop:'<svg class="ic" viewBox="0 0 48 48"><path d="M17 5h14l12 12v14L31 43H17L5 31V17z"/><path d="M15 24h18"/></svg>',
 yield:'<svg class="ic" viewBox="0 0 48 48"><path d="M5 8h38L24 41z"/><path d="M13 13h22L24 32z"/></svg>',
 speed:'<svg class="ic" viewBox="0 0 48 48"><path d="M7 35a17 17 0 1134 0"/><path d="M24 35l10-12"/><circle cx="24" cy="35" r="2.5"/></svg>',
 vest:'<svg class="ic" viewBox="0 0 48 48"><path d="M17 6l-8 6v30h12V19M31 6l8 6v30H27V19M17 6c2 6 12 6 14 0"/><path d="M9 29h12M27 29h12"/></svg>',
 badge:'<svg class="ic" viewBox="0 0 48 48"><rect x="12" y="11" width="24" height="32" rx="3"/><path d="M20 5h8v7h-8z"/><circle cx="24" cy="23" r="5"/><path d="M17 37c1-4 4-6 7-6s6 2 7 6"/></svg>',
 build:'<svg class="ic" viewBox="0 0 48 48"><path d="M5 42h38M9 42V20h30v22M7 20l17-12 17 12M16 26v10M24 26v10M32 26v10"/></svg>',
 eye:'<svg class="ic" viewBox="0 0 48 48"><path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24z"/><circle cx="24" cy="24" r="6"/></svg>',
 globe:'<svg class="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="18"/><path d="M6 24h36M24 6c7 6 7 30 0 36M24 6c-7 6-7 30 0 36"/></svg>',
 euro:'<svg class="ic" viewBox="0 0 48 48"><path d="M35 12a14 14 0 100 24M8 21h21M8 28h19"/></svg>',
 plane:'<svg class="ic" viewBox="0 0 48 48"><path d="M24 4c2 0 3 2 3 5v10l15 9v4l-15-5v9l5 4v3l-8-2-8 2v-3l5-4v-9L6 32v-4l15-9V9c0-3 1-5 3-5z"/></svg>',
 key:'<svg class="ic" viewBox="0 0 48 48"><circle cx="15" cy="24" r="8"/><path d="M23 24h20M37 24v7M31 24v5"/></svg>'});
document.head.insertAdjacentHTML('beforeend',`<style>
.hd1 .k{color:var(--pierre)}
.parts{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(14px,2vw,30px);width:100%;max-width:1100px}
.parts .pt{background:#fff;border-radius:18px;box-shadow:0 8px 28px rgba(38,60,82,.12);padding:clamp(18px,2.2vw,30px) clamp(12px,1.4vw,20px);display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px}
.parts .pt .no{font-weight:800;font-size:clamp(30px,3.2vw,50px);line-height:1}
.parts .pt .lb{margin:4px 0 0;font-size:clamp(18px,1.6vw,25px)}
.refs{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,30px);width:100%;max-width:1150px}
.ref{pointer-events:auto;cursor:pointer;background:#fff;border:3px solid var(--orangeV);border-radius:18px;box-shadow:0 8px 28px rgba(38,60,82,.12);padding:clamp(18px,2vw,28px);text-align:left;font:inherit;color:var(--marine);display:flex;flex-direction:column;gap:10px;transition:all .4s}
.ref .no{font-weight:800;font-size:clamp(40px,4.4vw,70px);line-height:.9}
.ref .lb{margin:0;font-size:clamp(19px,1.7vw,26px)}
.ref .tx{max-width:none;margin:0;max-height:0;overflow:hidden;opacity:0;transition:all .6s}
.ref.open .tx{max-height:400px;opacity:1}
.ref.seen{border-color:var(--marine);cursor:default}.ref.off{pointer-events:none}
.ref.dim{opacity:.3}
.zmap{background:#fff;border-radius:18px;box-shadow:0 8px 28px rgba(38,60,82,.14);padding:clamp(12px,1.6vw,20px);width:min(820px,100%)}
.zmap svg{display:block;width:100%;height:auto}
.zmap .z{transition:all .8s}.zmap .zp{display:none}
.duo2{display:grid;grid-template-columns:1fr 1fr;gap:clamp(18px,3vw,44px);width:100%;max-width:1100px;align-items:stretch}
.duo2 .card2{display:flex;flex-direction:column;gap:6px;transition:opacity .45s}
.duo2 .card2 .ic{margin-bottom:6px}
.big2{font-weight:800;font-size:clamp(46px,6vw,96px);line-height:.95;letter-spacing:-.01em;margin:4px 0;font-variant-numeric:tabular-nums}
.who3{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2.4vw,36px);width:100%;max-width:1150px;align-items:start}
.who3 .w{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px}
.who3 .av{width:clamp(84px,9vw,130px);height:clamp(84px,9vw,130px);border-radius:50%;background:#fff;box-shadow:0 8px 28px rgba(38,60,82,.14);display:flex;align-items:center;justify-content:center;transition:box-shadow .4s}
.who3 .w.it.in:not(.dim) .av{box-shadow:0 0 0 6px var(--marine),0 8px 28px rgba(38,60,82,.14)}
.who3 .tx{max-width:34ch;font-size:clamp(15px,1.25vw,19px)}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(10px,1.4vw,20px);width:100%;max-width:1060px}
.tile{background:#fff;border-radius:16px;box-shadow:0 6px 22px rgba(38,60,82,.1);padding:clamp(12px,1.4vw,20px);display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;position:relative;opacity:.18;transition:opacity .45s,box-shadow .45s}
.tile.in{opacity:1}.tile.now{box-shadow:0 0 0 4px var(--marine),0 6px 22px rgba(38,60,82,.1)}
.tile .lb{margin:0;font-size:clamp(15px,1.3vw,20px)}
.tile .tag{position:absolute;top:-12px;right:10px;background:var(--marine);color:#fff;font-weight:700;font-size:14px;padding:3px 10px;border-radius:999px;opacity:0;transition:opacity .4s}.tile .tag.in{opacity:1}
.fig{margin:0;border-radius:16px;overflow:hidden;box-shadow:0 8px 28px rgba(38,60,82,.16);background:#fff;flex:none}
.fig img{display:block;width:100%;height:auto}
.fig figcaption{font-size:13px;color:var(--pierre);padding:6px 10px}
.side>*{min-width:0}.conds li span{min-width:0;overflow-wrap:break-word}
/* rien ne reste figé : le plan avance très lentement pendant la voix */
@keyframes kb{from{transform:scale(1)}to{transform:scale(1.045)}}
.stage.fr.in>.hero,.stage.fr.in>.duo2,.stage.fr.in>.parts,.stage.fr.in>.side,.stage.fr.in>.ladder,.stage.fr.in>.ph4,.stage.fr.in>.tiles,.stage.fr.in>.who3,.stage.fr.in>.amt{animation:kb 26s ease-out both}
.side{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(22px,3.4vw,56px);align-items:center;width:100%;max-width:1200px}
.side .conds li{font-size:clamp(17px,1.5vw,23px)}
.side .conds li{opacity:.25;transition:opacity .45s}.side .conds li.in{opacity:1}
.amt{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,30px);width:100%;max-width:1100px}
.amt .card2{text-align:center}
.amt .big2{font-size:clamp(40px,4.6vw,76px)}
.ladder{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:880px}
.ladder .rg{width:100%;background:#fff;border-radius:16px;box-shadow:0 6px 22px rgba(38,60,82,.1);padding:14px 22px;display:grid;grid-template-columns:clamp(150px,16vw,220px) 1fr;gap:16px;align-items:center;text-align:left}
.ladder .rg .k{font-weight:800;font-size:clamp(17px,1.5vw,23px)}
.ladder .rg .tx{max-width:none;margin:0}
.ladder .dn{width:3px;height:16px;background:var(--marine)}
.ladder .you{background:var(--marine);color:#fff;border-radius:999px;padding:10px 24px;font-weight:700;font-size:clamp(17px,1.5vw,23px)}
.ph4{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(12px,1.6vw,24px);width:100%;max-width:1200px;align-items:start}
.ph4 .it{display:flex;flex-direction:column;gap:10px}
.ph4 .fig{height:clamp(120px,19vh,210px);display:flex;align-items:center;justify-content:center;background:#fff}
.ph4 .fig img{height:100%;width:auto;max-width:100%}
.ph4 .lb{margin:0;font-size:clamp(16px,1.35vw,21px)}
.ph4 .tx{max-width:none;margin:0;font-size:clamp(14px,1.15vw,18px)}
/* ranger : chaque élément tombe dans sa colonne */
.sortw{display:flex;flex-direction:column;gap:clamp(14px,2.6vh,28px);width:100%;max-width:1180px}
.sortw .qc{width:min(760px,100%);margin:0 auto}
.bks{display:grid;gap:clamp(10px,1.4vw,20px);width:100%}
.bk{pointer-events:auto;cursor:pointer;background:#fff;border:3px solid var(--orangeV);border-radius:16px;padding:12px 14px;font:inherit;color:var(--marine);display:flex;flex-direction:column;align-items:center;gap:6px;min-height:110px;transition:all .3s;text-align:center}
.bk .lb{margin:0;font-size:clamp(16px,1.35vw,21px)}
.bk .ic{width:40px;height:40px}
.bk ul{list-style:none;margin:4px 0 0;padding:0;display:flex;flex-direction:column;gap:5px;width:100%}
.bk li{font-size:15px;line-height:1.25;font-weight:600;background:#fff;border:2px solid var(--marine);border-radius:8px;padding:5px 8px;text-align:left;animation:cin .45s ease both}
.bk.ko{border-color:var(--orangeV);border-width:4px;background:#fff;opacity:.6}
.bk.ok{border-color:var(--vert);border-width:4px;background:#fff}
.bks.lock .bk{pointer-events:none;border-color:#c9d1d7}
.bks.lock .bk.ok{border-color:var(--vert)}.bks.lock .bk.ko{opacity:1}
.bk .cnt2{display:none;font-weight:700;font-size:14px;color:var(--pierre)}
/* le permis à cliquer */
.pz{position:relative;width:min(760px,100%);margin:0 auto}
.pz img{display:block;width:100%;border-radius:12px;box-shadow:0 8px 28px rgba(38,60,82,.16)}
.pz button{position:absolute;pointer-events:auto;cursor:pointer;border:4px solid transparent;border-radius:14px;background:transparent;transition:all .3s}
.pz.live button{border-color:var(--orangeV)}
.pz button.ko{border-color:var(--orangeV);background:rgba(233,78,27,.22)}
.pz button.ok{border-color:var(--vert);background:rgba(34,120,74,.16)}
.pzw{display:grid;grid-template-columns:1.25fr 1fr;gap:clamp(20px,3vw,48px);align-items:center;width:100%;max-width:1220px}
.qfb2{font-weight:700;font-size:var(--B);line-height:1.38;margin:10px 0 0}.qfb2.ok{color:var(--vert)}.qfb2.ko{color:var(--orange)}.qfb2:empty{display:none}
.bg{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.22;border-radius:0}
@media (max-width:700px){
 .parts{grid-template-columns:1fr 1fr;gap:10px}.parts .pt{padding:12px}.parts .pt .ic{width:36px;height:36px}
 .refs{grid-template-columns:1fr;gap:10px}.ref{padding:12px 14px;flex-direction:row;flex-wrap:wrap;align-items:center;gap:6px 12px}.ref .no{font-size:34px}.ref .lb{font-size:17px;flex:1;min-width:60%}.ref .tx{flex-basis:100%}
 .duo2,.who3,.amt,.side,.pzw{grid-template-columns:1fr;gap:12px}
 .who3 .w{flex-direction:row;text-align:left;align-items:flex-start;gap:12px}.who3 .av{width:56px;height:56px;flex:none}.who3 .av .ic{width:32px;height:32px}.who3 .lb{margin:0 0 2px}
 .tiles{grid-template-columns:1fr 1fr;gap:8px}.tile{flex-direction:row;text-align:left;padding:8px 10px;gap:10px}.tile .ic{width:30px;height:30px;flex:none}.tile .lb{font-size:15px}
 .ladder .rg{grid-template-columns:1fr;gap:4px;padding:10px 14px}
 .ph4{grid-template-columns:1fr 1fr;gap:10px}.ph4 .fig{height:96px}.ph4 .tx{display:none}
 .bk{min-height:0;padding:8px 6px}.bk ul{display:none}.bk .cnt2{display:block}.bk .ic{width:28px;height:28px}.bk .lb{font-size:15px}
 .bks{grid-template-columns:1fr 1fr!important}
 .stage.fr.in>*{animation:none!important}
 .tiles{grid-template-columns:1fr 1fr!important}
 .zmap .zl{display:none}.zmap .zp{display:block;max-height:52vh;width:auto;margin:0 auto}.zmap{width:auto}
 .big2{font-size:52px}.amt .big2{font-size:44px}
 .side{margin-top:10px}.side .fig{max-height:22vh}.side .fig img{max-height:22vh;width:auto;margin:0 auto}
}
</style>`);
const pause=(ms=1600)=>wait(FAST?0:ms); // pas de bouton quand il n'y a rien à faire : l'écran suivant arrive seul
const H1='Étape 1 · La réglementation';
const img=(k,cap='')=>`<figure class="fig"><img src="${IMG[k]}" alt="">${cap?`<figcaption>${nb(cap)}</figcaption>`:''}</figure>`;
// le moment où un hook arrive : on lance le suivant

// ranger des éléments dans des colonnes ; une erreur reste marquée, on réessaie ; chaque bonne réponse tombe dans sa colonne
async function sortV(items,buckets,o={}){const lbl=o.label||'Élément';
 vue(`<div class="sortw"><div class="qc" id="sq"><p class="n"></p><p class="q"></p><p class="qfb2" id="sfb"></p></div>
  <div class="bks" id="bks" style="grid-template-columns:repeat(${buckets.length},1fr)">${buckets.map(([k,t,ic])=>`<button class="bk" data-k="${k}">${ic?IC[ic]:''}<p class="lb">${nb(t)}</p><span class="cnt2"></span><ul></ul></button>`).join('')}</div></div>`);
 const st=cur(),bks=[...st.querySelectorAll('.bk')],fb=st.querySelector('#sfb'),bw=st.querySelector('#bks');let E=0;
 for(let i=0;i<items.length;i++){const it=items[i];st.querySelector('.n').textContent=`${lbl} ${i+1} sur ${items.length}`;st.querySelector('.q').innerHTML=nb(it.t);fb.className='qfb2';fb.innerHTML='';
  bw.classList.remove('lock');bks.forEach(b=>b.classList.remove('ko','ok'));
  for(;;){const b=await new Promise(r=>bks.forEach(x=>x.onclick=()=>{if(!x.classList.contains('ko'))r(x)}));
   if(b.dataset.k===it.b){bks.forEach(x=>x.onclick=null);b.classList.add('ok');bw.classList.add('lock');b.querySelector('ul').insertAdjacentHTML('beforeend',`<li>${nb(it.s||it.t)}</li>`);
    const c=b.querySelector('.cnt2');c.textContent=`${b.querySelectorAll('li').length} rangé${b.querySelectorAll('li').length>1?'s':''}`;fb.className='qfb2 ok';fb.innerHTML=nb(it.ok);break}
   E++;b.classList.add('ko');fb.className='qfb2 ko';fb.innerHTML=nb(it.h)}
  const nx=document.createElement('button');nx.className='act';nx.textContent=i<items.length-1?'Suivant':'Continuer';st.querySelector('#sq').appendChild(nx);try{nx.scrollIntoView({block:'nearest',behavior:'smooth'})}catch(e){}await new Promise(r=>nx.onclick=r);nx.remove()}
 return E}

/* 1. la couverture et les quatre parties */
async function cover(){step();await photo('aerien',FAST?10:1200);setCam({zoom:1.08});
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 1 · 5 h 00').card('La réglementation et les règles à respecter sur Roissy','Cinq heures, prise de service. Avant de toucher un volant : ce qui encadre tout le reste.');
 await cont(L,"C'est parti");try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}L.kill();return null}
const PARTS=[['1','Le contexte réglementaire et les consignes','book'],['2','Les sanctions','euro'],['3','Les acteurs du contrôle','eye'],['4',"L'obtention de l'autorisation de conduite",'card']];
async function quatre(){step();head(H1,'Prise de service');
 vue(`<div class="hero"><p class="huge" id="h5">5 h 00</p><p class="cap">Prise de service</p><p class="sub">Avant de toucher un volant : ce qui encadre tout le reste.</p></div>`);
 const pv=`<div class="parts">${PARTS.map((p,i)=>`<div class="pt it" id="pp${i}">${IC[p[2]]}<div class="no">${p[0]}</div><p class="lb">${nb(p[1])}</p></div>`).join('')}</div>`;
 await sayS('e01',[W('e01','Quatre parties',()=>{head(H1,'Quatre parties');vue(pv)}),W('e01','Le contexte',()=>show('#pp0',true)),W('e01','Les sanctions',()=>show('#pp1',true)),W('e01','Les acteurs',()=>show('#pp2',true)),W('e01','Et comment',()=>show('#pp3',true))]);undim();
 vue(`<div class="hero">${pv.replace(/class="pt it"/g,'class="pt it in"')}<p class="sub it" id="xs" style="font-weight:700;color:var(--marine);margin-top:clamp(12px,3vh,26px)">Le terrain, oui. Mais tout en découle, les sanctions en premier.</p><div class="xb it" id="xq">${bub('Xavier','Dense. Et si je m\'en passe ? Au volant, ce qui compte, c\'est le terrain.')}</div></div>`);
 await sayS('e02',[at('e02',.02,()=>show('#xq'))]);
 await sayS('e03',[at('e03',.02,()=>{$c('#xq').style.display='none';show('#xs');show('#pp1',true)})]);undim();
 await contV('Commencer');return null}

/* 2. les trois référentiels : l'apprenant ouvre chaque carte */
const REF=[['1',"Les mesures particulières d'application de l'arrêté préfectoral","Arrêté préfectoral 2026-00286 du 13 mars 2026.",'e05'],['2',"La consigne d'exploitation n°3","Version 7 du 25 septembre 2024. Elle fixe les mesures applicables aux entreprises et aux services de l'État qui emploient des conducteurs, aux conducteurs eux-mêmes, et aux centres de formation et à leurs formateurs.",'e06'],['3','Le code de la route','Avec un permis de conduire français, ou étranger valable en France.','e07']];
async function referentiels(){step();head('1 · Le contexte réglementaire','Trois référentiels s\'imposent à vous');
 vue(`<div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(14px,3vh,28px)"><div class="refs">${REF.map((r,i)=>`<button class="ref it" id="rf${i}"><span class="no">${r[0]}</span><p class="lb">${nb(r[1])}</p><p class="tx">${nb(r[2])}</p></button>`).join('')}</div><p class="sub it" id="rfc" style="font-weight:700;margin:0">Cliquez sur chaque carte pour la découvrir.</p></div>`);
 await sayS('e04',[at('e04',.02,()=>on('.ref')),W('e04','Cliquez',()=>show('#rfc'))]);
 const bs=[...cur().querySelectorAll('.ref')];const seen=new Set();
 while(seen.size<3){const i=await new Promise(r=>bs.forEach((b,k)=>b.onclick=()=>{if(!b.classList.contains('seen')&&!b.classList.contains('off'))r(k)}));
  bs.forEach((b,k)=>{b.classList.add('off');b.classList.toggle('dim',k!==i)});bs[i].classList.add('open');$c('#rfc').classList.remove('in');
  await sayS(REF[i][3]);seen.add(i);bs[i].classList.add('seen');bs.forEach(b=>b.classList.remove('off','dim'));
  if(seen.size<3){$c('#rfc').textContent='Cliquez sur une autre carte.';show('#rfc')}}
 $c('#rfc').classList.remove('in');
 vue(`<div class="hero">${bub('Xavier','Trois textes. Je dois tous les connaître pour l\'évaluation ?')}<p class="cap it" id="r9" style="margin-top:clamp(14px,3vh,30px)">C'est une question qui revient à l'évaluation</p><p class="sub it" id="r9b">L'arrêté et ses mesures particulières d'application, la consigne d'exploitation n°3, le code de la route. On regarde les deux premiers de plus près.</p></div>`);
 await sayS('e08');await sayS('e09',[at('e09',.02,()=>show('#r9')),W('e09','On regarde',()=>show('#r9b'))]);
 await pause();return null}

/* 3. l'arrêté préfectoral : le périmètre qui s'étend, puis les absences */
const ZMAP=`<div class="parts" style="grid-template-columns:repeat(3,1fr);max-width:1000px"><div class="pt it in" id="za1"><p class="lb">Les secteurs fonctionnels trafic et manœuvre</p></div><div class="pt it in" id="za2"><p class="lb">Ou le secteur de sûreté F</p></div><div class="pt it in" id="za3"><p class="lb">En dehors des bâtiments et des cours</p></div></div><div class="hero it" id="zall" style="margin-top:clamp(14px,3vh,30px)"><p class="cap">Étendu à toute la zone côté piste</p></div>`;
async function arrete(){step();head('1 · Le contexte réglementaire',"L'arrêté préfectoral");
 vue(`<div class="hero"><p class="huge tel">2026-00286</p><p class="cap">L'arrêté préfectoral du 13 mars 2026</p><p class="sub it" id="a1">Il modifie l'arrêté de 2018. C'est le texte de base.</p></div>`);
 await sayS('e10',[W('e10','modifie',()=>show('#a1')),
  W('e10','Il oblige',()=>vue(`<div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(10px,2vh,20px)"><p class="cap it" id="a2" style="font-weight:700;font-size:clamp(22px,2.2vw,34px);margin:0;text-align:center">${nb('Une autorisation de conduite spécifique, obligatoire pour tout conducteur')}</p>${ZMAP}<p class="sub it" id="a3" style="text-align:center"></p></div>`)),
  W('e10','Il oblige',()=>show('#a2'),-.01),
  W('e10','en dehors',()=>show('#a3')),
  W('e10','Pour simplifier',()=>{show('#zall');const t=$c('#a3');if(t)t.innerHTML=nb("Pour simplifier, et faciliter le contrôle aux postes d'accès routiers.")})]);
 vue(`<div class="hero">${bigIc('build')}<p class="cap">Le Groupe ADP est désigné</p><p class="sub">Pour définir le dispositif de délivrance de l'autorisation de conduite.</p><p class="sub it" id="a4">Et les conditions de sa suspension et de son retrait, si les règles de circulation ne sont pas respectées.</p></div>`);
 const ABS=`<div class="axes" style="max-width:1040px"><div class="ax" id="xb"><p class="tl">Absence de la plateforme</p><div class="tr">
  <div class="sg" id="xb1" style="left:16.7%;width:50%;background:var(--pierre)"></div><div class="sg" id="xb2" style="left:66.7%;width:33.3%;background:var(--marine)"></div>
  <span class="fl c" id="xbf1" style="left:41.7%"><span class="lg">Une formation pratique (annexe 7)</span><span class="sh">Formation pratique (annexe 7)</span></span><span class="fl c" id="xbf2" style="left:83.3%">Le permis se repasse</span>
  <span class="tk" id="xbt1" style="left:16.7%">3 mois</span><span class="tk" id="xbt2" style="left:66.7%">12 mois</span></div></div></div>`;
 await sayS('e11',[W('e11','Il prévoit',()=>show('#a4')),W('e11','On retrouve',()=>{head('1 · Le contexte réglementaire','La règle des absences');vue(`<div style="width:100%">${ABS}</div>`)}),
  W('e11','De trois',()=>{on('#xbt1');on('#xbt2');on('#xb1');on('#xbf1')}),W('e11','Plus de douze',()=>{on('#xb2');on('#xbf2')})]);
 await pause(2200);return null}

/* 4. les mesures particulières d'application */
const ZON=["La zone d'évolution contrôlée","Le périmètre de sécurité collision","Le périmètre de sécurité incendie","La zone particulièrement dangereuse","La zone d'évolution de passerelle télescopique","Les couloirs hors gabarit d'aire de trafic"];
async function mpa(){step();head('1 · Le contexte réglementaire',"Les mesures particulières d'application");
 vue(`<div class="duo2"><div class="card2 it" id="m1">${IC.user}<p class="lb">Qui les prend ?</p><p class="big2" style="font-size:clamp(30px,3.4vw,52px)">Le directeur d'aéroport</p><p class="tx" style="max-width:none;margin:0">Il complète l'arrêté, quand c'est nécessaire. Ces mesures collent au terrain.</p></div>
  <div class="card2 it" id="m2">${IC.car}<p class="lb">Sur quoi ?</p><p class="tx" style="max-width:none;margin:0;font-size:clamp(18px,1.6vw,25px);font-weight:600;color:var(--marine)">Les règles de sécurité de circulation et de stationnement sur l'aire de mouvement.</p></div></div>`);
 const ZL=`<div class="hero"><p class="cap" style="margin-bottom:clamp(8px,2vh,20px)">Elles portent aussi sur :</p><ul class="chk">${ZON.map((z,i)=>`<li id="zz${i}"><b>${CHECK}</b>${nb(z)}</li>`).join('')}</ul></div>`;
 await sayS('e12',[W('e12','le directeur',()=>show('#m1',true)),W('e12','Elles portent',()=>show('#m2',true)),W('e12','La zone',()=>vue(ZL)),
  ...['La zone','Le périmètre de sécurité collision','Le périmètre de sécurité incendie','La zone particulièrement','La zone d\'évolution de passerelle','Et les couloirs'].map((w,i)=>W('e12',w,()=>on('#zz'+i,'on'),.005))]);
 await pause(2200);return null}

/* 5. véhicule, engin, matériel : sur la photo, puis à vous */
const PV=[.12,.45],PE=[.43,.48],PM=[.78,.46];
var CAPS={hd3:'Illustration',permis4:'',panneau:''};
async function definitions(){step();await photo('hd3',FAST?10:500);setCam(PORT()?{mode:'contain'}:{zoom:1.08});await vzOff();
 const L=label([0,0,0],{lead:false}).title('Trois mots à connaître');
 await sayS('e13',[at('e13',.02,()=>L.card('De quoi on parle','Les mesures particulières définissent trois mots.')),
  W('e13','Un véhicule',()=>L.card('Un véhicule','Un mobile autotracté immatriculé, conformément au code de la route.',{a:pt(...PV)})),
  W('e13','Un engin',()=>L.card('Un engin',"Un mobile autotracté non immatriculé, présent côté piste pour le transport aérien, l'entretien ou le fonctionnement de l'aérodrome.",{a:pt(...PE)})),
  W('e13','Les aéronefs',()=>L.card('Les aéronefs n\'en font pas partie','Même tractés.',{a:null})),
  W('e13','Un matériel',()=>L.card('Un matériel','Un objet non autotracté utilisé côté piste : conteneurs, palettes, chariots à bagages.',{a:pt(...PM)}))],PORT()?null:{zoom:1.06});
 await cont(L);return L}
// une question sur la photo : on clique sur l'objet ; une erreur reste marquée, on réessaie
async function photoPick(pts,good){const Ts={},ps={};for(const [k,p] of Object.entries(pts))ps[k]=target(p,'',{delay:400,ref:T=>Ts[k]=T}).then(()=>k);
 const left=new Set(Object.keys(pts));let E=0;
 for(;;){const k=await Promise.race([...left].map(x=>ps[x]));left.delete(k);if(k===good){Ts[k].kill('ok');break}E++;Ts[k].el.classList.add('ko');if(onKo)onKo(k)}
 Object.values(Ts).forEach(T=>{if(T!==Ts[good])T.kill()});return E}
let onKo=null;
async function vem(L){L.title('Véhicule, engin ou matériel ?');
 await sayS('e14',[at('e14',.02,()=>L.card('À vous','Pour chaque chose : un véhicule, un engin, un matériel, ou aucun des trois ?',{a:null}))]);
 const PTS={v:pt(...PV),e:pt(...PE),m:pt(...PM)};let E=0;
 const Qs=[['e',"Cliquez sur l'engin.","Autotracté, mais pas immatriculé : un engin.","Pas celui-ci. L'engin avance tout seul, mais il n'a pas de plaque d'immatriculation."],
  ['m','Cliquez sur le matériel.',"Il n'avance pas tout seul : un matériel, comme les conteneurs et les palettes.","Pas celui-ci. Le matériel n'est pas autotracté."],
  ['v','Cliquez sur le véhicule.','Autotracté et immatriculé selon le code de la route : un véhicule.',"Pas celui-ci. Cherchez celui qui porte une plaque d'immatriculation."]];
 for(let i=0;i<Qs.length;i++){const [g,q,ok,ko]=Qs[i];L.card(`Sur la photo · ${i+1} sur 5`,q,{a:null});onKo=()=>L.card('Essayez encore',`${q} ${ko}`,{ko:1,a:null});
  E+=await photoPick(PTS,g);onKo=null;const lb={v:'Véhicule',e:'Engin',m:'Matériel'}[g];const sm=small(PTS[g],lb);
  L.card('Oui',ok,{ok:1,a:PTS[g]});await contLab(L,'Suivant');sm.kill();[...tgts].forEach(T=>T.kill())}
 // deux cas sans photo
 const T2=[{t:"Un avion tracté vers son poste.",b:'a',ok:"Les aéronefs ne sont ni des véhicules, ni des engins, même tractés.",h:{_:"Pas tout à fait. Relisez les définitions : que disent-elles des aéronefs ?"}},
  {t:"Une palette.",b:'m',ok:"Non autotractée : un matériel.",h:{_:"Pas tout à fait. Une palette avance-t-elle toute seule ?"}}];
 for(let i=0;i<T2.length;i++){const it=T2[i];L.card(`Et sans photo · ${i+4} sur 5`,it.t,{a:null});
  E+=await pick(L,[['v','Un véhicule'],['e','Un engin'],['m','Un matériel'],['a','Aucun des trois']],it.b,it.ok,it.h,i<T2.length-1?'Suivant':'Continuer',{retry:true})}
 jlog('5 h 05',`Véhicule, engin ou matériel : 5 cas${errTxt(E)}`);L.kill();return null}

/* 6. les consignes d'exploitation : qui pilote */
async function consignes(){step();head('1 · Le contexte réglementaire',"Les consignes d'exploitation");
 vue(`<div style="width:100%"><div class="chain">
  <div class="nd it" id="c1">${IC.build}<div>${P('','Le Groupe ADP pilote',"La formation, l'évaluation et la délivrance des autorisations de conduite. Il en définit les principes, identifie les parties prenantes et en assure le suivi.")}</div></div>${ARR('ca1')}
  <div class="nd it" id="c2">${IC.check2||IC.shield}<div>${P('','Il agrée les centres',"Il évalue les formateurs pour les habiliter, et tient à jour la liste des centres agréés et des formateurs habilités.")}</div></div>${ARR('ca2')}
  <div class="nd it" id="c3">${IC.doc}<div>${P('',"Les consignes d'exploitation","Elles précisent les modalités pour les entreprises qui opèrent sur l'aérodrome.")}</div></div></div>
  <p class="sub it" id="c4" style="text-align:center;margin:clamp(16px,3vh,30px) auto 0;font-weight:700;color:var(--marine)">${nb("Consignes d'exploitation et mesures particulières d'application se consultent sur l'extranet.")}</p></div>`);
 await sayS('e15',[W('e15',"L'exploitant",()=>show('#c1',true)),W('e15','Il prononce',()=>{show('#ca1');show('#c2',true)}),W('e15','Les consignes',()=>{show('#ca2');show('#c3',true)}),W('e15','Consignes et',()=>{undim();show('#c4')})]);
 await pause(2200);
 vue(`<div class="duo2"><div class="card2 it in">${IC.shield}<p class="lb">Le système de gestion de la sécurité</p><p class="tx" style="max-width:none;margin:0">C'est par lui que le Groupe ADP délivre les permis T.</p></div>
  <div class="card2 it in">${IC.eye}<p class="lb">Contrôles et audits</p><p class="tx" style="max-width:none;margin:0">En cas d'événement majeur ou de problème récurrent touchant la sécurité, le Groupe ADP peut contrôler un centre de formation. Le centre et ses formateurs doivent répondre à toute sollicitation. Et il mène un programme d'audits des centres et de leurs formateurs.</p></div></div>`);
 await contV();return null}
const ARR=id=>`<div class="ar it" id="${id}"><svg viewBox="0 0 60 28"><path d="M4 14h48M40 4l12 10-12 10"/></svg></div>`;

/* 7. la consigne n°3 : qui fait quoi */
async function roles(){step();head('1 · Le contexte réglementaire',"La consigne d'exploitation n°3 : qui fait quoi");
 vue(`<div class="who3"><div class="w it" id="w1"><div class="av">${IC.tie}</div><div>${P('',"L'employeur","Il atteste que l'activité du salarié nécessite l'autorisation de conduite. Il s'assure de sa formation, théorique et pratique. Il désigne un ou plusieurs référents.")}</div></div>
  <div class="w it" id="w2"><div class="av">${IC.user2}</div><div>${P('','Le référent « autorisation de conduite »',"Il assure la formation pratique, en initiale et en renouvellement. Il répond aux critères de compétence et d'expérience de la consigne (alinéa 5.1.2.1). Il n'est pas déclaré.")}</div></div>
  <div class="w it" id="w3"><div class="av">${IC.radio}</div><div>${P('','Le correspondant sécurité',"L'interface avec le Groupe ADP sur ce qui change les conditions de circulation : évolutions d'infrastructures, consignes provisoires, points d'attention. Il s'assure qu'un plan routier à jour est présent dans chaque véhicule qui circule côté piste, et diffuse ces informations aux conducteurs.")}</div></div></div>`);
 await sayS('e16',[at('e16',.02,()=>show('#w1',true)),W('e16','Le référent assure',()=>show('#w2',true))]);
 await sayS('e17',[at('e17',.02,()=>show('#w3',true))]);undim();
 vue(`<div class="hero">${bub('Xavier','Et un intérimaire, qui s\'occupe de sa pratique ?')}</div>`);
 await sayS('e18');
 vue(`<div class="duo2"><div class="card2 it" id="i1">${IC.user}<p class="lb">L'intérimaire</p><p class="tx" style="max-width:none;margin:0">La société utilisatrice assure sa formation pratique.</p></div>
  <div class="card2 it" id="i2">${IC.build}<p class="lb">Le sous-traitant sans activité aéronautique</p><p class="tx" style="max-width:none;margin:0">Le donneur d'ordres vérifie que ses conducteurs ont suivi une formation pratique adaptée.</p></div></div>`);
 await sayS('e19',[at('e19',.02,()=>show('#i1',true)),W('e19','Même logique',()=>show('#i2',true))]);undim();
 await pause();return null}
async function quiFait(){step();head('1 · Le contexte réglementaire','Qui fait quoi ? À vous');
 vue(`<div class="hero">${bigIc('quiz')}<p class="cap">Une mission : qui s'en charge ?</p><p class="sub">Cliquez sur la bonne colonne. La mission s'y range.</p></div>`);
 await sayS('e20');
 const E=await sortV([{t:"Agréer les centres de formation et habiliter les formateurs.",s:'Agréer les centres, habiliter les formateurs',b:"adp",ok:"Le Groupe ADP pilote le dispositif.",h:"Pas celui-ci. Qui pilote tout le dispositif ?"},
  {t:"Attester que l'activité du salarié nécessite l'autorisation de conduite.",s:'Attester le besoin',b:"emp",ok:"L'employeur l'atteste, et s'assure de la formation du salarié.",h:"Pas celui-ci. Qui connaît l'activité du salarié ?"},
  {t:"Assurer la formation pratique, en initiale et en renouvellement.",s:'La formation pratique',b:"ref",ok:"Le référent « autorisation de conduite », désigné par l'employeur.",h:"Pas celui-ci. Qui est désigné pour la pratique ?"},
  {t:"Vérifier qu'un plan routier à jour se trouve dans chaque véhicule.",s:'Le plan routier à jour',b:"cs",ok:"Le correspondant sécurité.",h:"Pas celui-ci. Qui fait l'interface avec le Groupe ADP sur les conditions de circulation ?"},
  {t:"Diffuser aux conducteurs les consignes provisoires et les points d'attention.",s:'Diffuser les consignes provisoires',b:"cs",ok:"Le correspondant sécurité, interface avec le Groupe ADP.",h:"Pas celui-ci. Qui reçoit ces informations du Groupe ADP pour les transmettre ?"},
  {t:"Désigner un ou plusieurs référents.",s:'Désigner les référents',b:"emp",ok:"L'employeur désigne les référents.",h:"Pas celui-ci. Le référent est désigné par qui ?"}],
  [['adp','Le Groupe ADP','build'],['emp',"L'employeur",'tie'],['ref','Le référent','user2'],['cs','Le correspondant sécurité','radio']],{label:'Mission'});
 jlog('5 h 08',`Qui fait quoi, consigne n°3 : 6 missions${errTxt(E)}`);return null}

/* 8. les sanctions */
const INF=[['belt','La ceinture non attachée','La ceinture'],['radio','La cabine non stérile : radio allumée ou téléphone','La cabine'],['test','Un éthylotest ou un dépistage positif','Un éthylotest'],['stop','Un stop non respecté','Un stop'],['yield','Un refus de priorité','Un refus'],['speed','Un excès de vitesse','Un excès'],['vest','Le gilet haute visibilité non porté','Le gilet'],['badge','Le badge non apparent en zone de sûreté à accès réglementé','Et le badge']];
async function sanctions(){step();head('2 · Les sanctions','Trois registres');
 vue(`<div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(16px,3vh,30px)"><div class="parts" style="grid-template-columns:repeat(3,1fr);max-width:960px">
  <div class="pt it" id="s1">${IC.doc}<p class="lb">Les sanctions administratives</p></div><div class="pt it" id="s2">${IC.quiz}<p class="lb">Les procès-verbaux</p></div><div class="pt it" id="s3">${IC.build}<p class="lb">Les sanctions pénales</p></div></div>
  <p class="cap it" id="s4" style="font-size:clamp(20px,2vw,30px);text-align:center;margin:0">Ils coexistent, ils ne s'excluent pas.</p></div>`);
 await sayS('e21',[W('e21','sanctions administratives',()=>show('#s1')),W('e21','des procès',()=>show('#s2')),W('e21','et des sanctions',()=>show('#s3')),W('e21','Les trois',()=>show('#s4')),
  W('e21',"C'est la Gendarmerie",()=>vue(`<div class="side"><div>${img('gta')}</div><div><p class="cap" style="text-align:left;margin:0 0 10px">La Gendarmerie des transports aériens</p><p class="sub" style="text-align:left">Les infractions commises peuvent être sanctionnées par elle.</p></div></div>`))]);
 head('2 · Les sanctions','Les infractions relevées');
 vue(`<div class="tiles">${INF.map((f,i)=>`<div class="tile" id="tf${i}">${IC[f[0]]}<p class="lb">${nb(f[1])}</p>${i===2?'<span class="tag" id="dl">Un délit</span>':''}</div>`).join('')}</div>`);
 let prev=null;const lit=i=>{if(prev!==null)$c('#tf'+prev).classList.remove('now');const t=$c('#tf'+i);t.classList.add('in','now');prev=i};
 await sayS('e22',[...INF.map((f,i)=>W('e22',f[2],()=>lit(i),.005)),W('e22','là, c\'est',()=>on('#dl')),
  W('e22','Cent cinquante',()=>vue(`<div class="hero">${bigIc('badge')}<p class="huge" id="m150">0 €</p><p class="cap">Et/ou 6 jours de suspension</p><p class="sub">Pour le badge non apparent en zone de sûreté à accès réglementé.</p></div>`)),
  W('e22','Cent cinquante',()=>countTo('#m150',150,1400,v=>Math.round(v)+' €'),-.01)]);
 head('2 · Les sanctions','Le rappel affiché sur la plateforme');
 vue(`<div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(16px,3vh,30px)"><div class="parts">
  <div class="pt it" id="r1">${IC.card}<p class="lb">Retrait des permis</p><p class="tx" style="margin:0">Le permis de conduire comme le permis T.</p></div><div class="pt it" id="r2">${IC.badge}<p class="lb">Retrait du badge</p></div><div class="pt it" id="r3">${IC.euro}<p class="lb">Amende</p></div><div class="pt it" id="r4">${IC.build}<p class="lb">Poursuite judiciaire</p></div></div></div>`);
 const AMT=`<div class="amt"><div class="card2 it" id="p1"><p class="lb">Personne physique</p><p class="big2" id="v1">750 €</p></div><div class="card2 it" id="p2"><p class="lb">En cas de récidive</p><p class="big2" id="v2">1 500 €</p><p class="tx" style="margin:0">Personne physique.</p></div><div class="card2 it" id="p3"><p class="lb">Personne morale</p><p class="big2" id="v3">7 500 €</p></div></div>`;
 const fmt=v=>Math.round(v).toLocaleString('fr-FR').replace(/ | /g,' ')+' €';
 await sayS('e22b',[W('e22b','retrait du permis',()=>show('#r1')),W('e22b','retrait du badge',()=>show('#r2')),W('e22b','amende',()=>show('#r3')),W('e22b','poursuite',()=>show('#r4')),
  W('e22b','Et pour un',()=>{head('2 · Les sanctions','Un procès-verbal pour manquement à la sécurité');vue(AMT)}),
  W('e22b','Sept cent',()=>{show('#p1',true);countTo('#v1',750,1200,fmt)}),W('e22b','mille cinq',()=>{show('#p2',true);countTo('#v2',1500,1200,fmt)}),W('e22b','Sept mille',()=>{show('#p3',true);countTo('#v3',7500,1400,fmt)})]);
 undim();await pause(2200);return null}

/* 9. suspension et retrait de l'autorisation */
const CAS=[['Vous cessez de conduire',"Dans les conditions définies par l'autorisation.",'Si vous cessez'],['Votre permis de conduire est retiré ou suspendu','','Si votre permis'],['Des manquements graves ou répétés','Aux règles de circulation.','En cas de manquements'],["La conduite sous l'emprise de l'alcool ou de stupéfiants",'','Ou en cas de conduite']];
async function retrait(){step();head('2 · Les sanctions',"L'autorisation de conduite suspendue ou retirée");
 vue(`<div class="duo2"><div class="card2 it" id="t1">${IC.cal}<p class="big2" style="font-size:clamp(34px,3.8vw,60px)">Suspendue</p></div><div class="card2 it" id="t2">${IC.key}<p class="big2" style="font-size:clamp(34px,3.8vw,60px)">Retirée</p><p class="tx" style="max-width:none;margin:0">Temporairement ou définitivement.</p></div></div><p class="sub it" id="t3" style="position:absolute;left:0;right:0;bottom:0;text-align:center;max-width:none">${nb("Le Groupe ADP décide, dans le cadre de son système de gestion de la sécurité, selon l'arrêté préfectoral 2026-00286.")}</p>`);
 const CV=`<div class="side" style="grid-template-columns:1fr"><div><p class="cap" style="text-align:left;margin:0 0 clamp(10px,2vh,22px)">Dans quels cas ?</p><ul class="conds">${CAS.map((c,i)=>`<li id="k${i}"><b>${i+1}</b><span>${nb(c[0])}${c[1]?`<small>${nb(c[1])}</small>`:''}</span></li>`).join('')}</ul></div></div>`;
 await sayS('e23',[at('e23',.02,()=>show('#t1')),W('e23','Ou retirée',()=>show('#t2')),W('e23',"C'est le Groupe",()=>show('#t3')),W('e23','Dans quels',()=>vue(CV)),...CAS.map((c,i)=>W('e23',c[2],()=>on('#k'+i),.005))]);
 vue(`<div class="hero">${bigIc('doc')}<p class="cap">Une décision motivée</p><p class="sub">Avec les délais et les voies de recours. Le Groupe ADP en assure la traçabilité et l'archivage, dans le respect des règles de confidentialité et de protection des données personnelles.</p><div class="xb it" id="xr">${bub('Xavier','Et on me retire le permis du jour au lendemain, sans pouvoir m\'expliquer ?')}</div></div>`);
 await sayS('e24');await sayS('e24c',[at('e24c',.02,()=>show('#xr'))]);
 vue(`<div class="duo2"><div class="card2 it" id="u1"><p class="lb">Sauf urgence</p><p class="big2">15 jours</p><p class="tx" style="max-width:none;margin:0">Vous êtes avisé des mesures envisagées, et vous disposez de quinze jours pour faire part de vos observations, écrites ou orales.</p></div>
  <div class="card2 it" id="u2"><p class="lb">En cas d'urgence</p><p class="big2">1 mois</p><p class="tx" style="max-width:none;margin:0">Suspension immédiate, un mois au maximum, reconductible si les circonstances l'exigent.</p></div></div>`);
 await sayS('e24b',[at('e24b',.02,()=>show('#u1',true)),W('e24b',"En cas d'urgence",()=>show('#u2',true)),
  W('e24b','Et le Groupe',()=>vue(`<div class="hero">${bigIc('eye')}<p class="cap">La Direction de la sécurité de l'aviation civile Nord est informée</p><p class="sub">Le Groupe ADP lui transmet toute information susceptible de conduire à une sanction.</p></div>`))]);
 await pause(2000);
 vue(`<div class="hero">${bigIc('shield')}<p class="cap">Le système de gestion de la sécurité</p><p class="sub">Il ne sert pas qu'à notifier : il a aussi un volet sanction. Vous le retrouverez à l'étape 10.</p></div>`);
 await contV();return null}
async function infraction(){step();head('2 · Les sanctions','Infraction ou pas ? À vous');
 vue(`<div class="hero">${bigIc('quiz')}<p class="cap">Six situations : infraction, ou pas ?</p></div>`);
 await sayS('e25');
 const E=await sortV([{t:"Je roule avec la radio allumée.",b:"i",ok:"Cabine non stérile : radio allumée ou téléphone, c'est une infraction.",h:"Pas tout à fait. Comment doit rester la cabine ?"},
  {t:"Mon badge est dans ma poche, en zone de sûreté à accès réglementé.",b:"i",ok:"Badge non apparent : 150 € d'amende et/ou 6 jours de suspension.",h:"Pas tout à fait. Dans la poche, le badge est-il apparent ?"},
  {t:"Je porte mon gilet haute visibilité.",b:"n",ok:"C'est l'obligation. L'infraction, c'est de ne pas le porter.",h:"Pas tout à fait. Relisez : je le porte."},
  {t:"Je passe un stop sans m'arrêter.",b:"i",ok:"Le non-respect d'un stop est une infraction relevée.",h:"Pas tout à fait. Que demande un stop ?"},
  {t:"Mon dépistage de substances illicites est positif.",b:"i",ok:"Et ce n'est pas une simple infraction : c'est un délit au code de la route.",h:"Pas tout à fait. Repensez à la liste des infractions relevées."},
  {t:"Je m'arrête au stop, je regarde, je repars.",b:"n",ok:"C'est ce qu'on attend d'un conducteur.",h:"Pas tout à fait. Relisez : je m'arrête."}],
  [['i','Infraction','warn'],['n','Pas une infraction','shield']],{label:'Situation'});
 jlog('5 h 11',`Infraction ou pas : 6 situations${errTxt(E)}`);return null}

/* 10. les acteurs du contrôle */
async function prefet(){step();head('3 · Les acteurs du contrôle','Qui contrôle ?');
 vue(`<div class="hero">${bigIc('route')}<p class="cap">Les acteurs sur la piste</p><p class="sub">Ceux de l'État, vous les connaissez par la formation sûreté du badge. Ici, vous découvrez les acteurs sur la piste.</p></div>`);
 const FAM=`<div class="duo2"><div class="card2 it" id="f1">${IC.build}<p class="lb">Les services de l'État</p></div><div class="card2 it" id="f2">${IC.plane}<p class="lb">Le personnel du Groupe ADP</p></div></div>`;
 await sayS('e26',[W('e26','Deux familles',()=>{head('3 · Les acteurs du contrôle',"Deux familles d'acteurs");vue(FAM)}),W('e26','les services',()=>show('#f1')),W('e26','et le personnel',()=>show('#f2')),W('e26',"D'abord l'État",()=>show('#f1',true)),
  W('e26','Le préfet',()=>vue(`<div class="hero">${bigIc('build')}<p class="cap">Le préfet délégué à la sécurité et à la sûreté des plateformes aéroportuaires</p><p class="sub">Il a autorité en matière de circulation sur l'aire de mouvement.</p><p class="sub it" id="pf">Il en fixe les modalités par arrêté préfectoral : elles sont opposables à tout intervenant. C'est de lui que vient l'arrêté du début.</p></div>`)),
  W('e26','Il en fixe',()=>show('#pf'))]);
 await pause();return null}
const MIS=[['Renseigner',"Prévenir les troubles à l'ordre public, lutter contre le terrorisme."],['Protéger',"Les aéronefs d'État à l'arrivée et au départ : garde, contrôle des personnes, des bagages, du fret et de l'avitaillement."],['Contrôler',"Les personnes et les véhicules admis côté piste, et leurs titres d'accès."],['Sanctionner',"Saisie et retrait des autorisations de circuler, en cas d'infraction au code de la route ou de manquement à l'arrêté préfectoral."]];
async function gta(){step();head('3 · Les acteurs du contrôle','La Gendarmerie des transports aériens');
 vue(`<div class="side"><div>${img('gta')}</div><div><p class="sub it" id="g0" style="text-align:left;margin:0 0 clamp(10px,2vh,20px);font-weight:600;color:var(--marine)">Elle surveille le respect de l'ensemble des règles applicables sur l'aire de mouvement.</p><ul class="conds">${MIS.map((m,i)=>`<li id="g${i+1}"><b>${i+1}</b><span>${m[0]}<small>${nb(m[1])}</small></span></li>`).join('')}</ul></div></div>`);
 await sayS('e27',[at('e27',.02,()=>show('#g0')),W('e27','Renseigner',()=>on('#g1')),W('e27','Protéger',()=>on('#g2')),W('e27','Contrôler',()=>on('#g3')),W('e27','Sanctionner',()=>on('#g4'))]);
 await pause(2000);
 vue(`<div class="duo2"><div class="card2 it in">${IC.shield}<p class="lb">Ses autres missions</p><p class="tx" style="max-width:none;margin:0">Police militaire et administrative, police judiciaire pour les infractions pénales constatées sur les plateformes. Et des missions aéronautiques : protection des installations sensibles, police de la navigation aérienne, constat d'incident et d'accident, participation aux enquêtes du Bureau d'enquêtes et d'analyses.</p></div>
  <div class="card2 it in">${IC.card}<p class="lb">Un permis retenu</p><p class="big2" style="font-size:clamp(34px,3.6vw,56px)">72 heures</p><p class="tx" style="max-width:none;margin:0">Dans les 72 heures, il est transmis à l'exploitant, le Groupe ADP, qui le restitue à l'employeur, ou à l'agence d'intérim s'il s'agit d'un intérimaire.</p></div></div>`);
 await contV();return null}
async function dsac(){step();head('3 · Les acteurs du contrôle',"La Direction de la sécurité de l'aviation civile Nord");
 vue(`<div class="hero">${bigIc('eye')}<p class="cap">L'autorité de surveillance</p><p class="sub">Elle mène des audits réglementaires.</p><p class="sub it" id="d1">Elle s'assure que le Groupe ADP et toutes les parties prenantes de la formation respectent la réglementation et le dispositif en place.</p></div>`);
 await sayS('e28',[W('e28','Elle s\'assure',()=>show('#d1')),
  W('e28','À retenir',()=>vue(`<div class="duo2"><div class="card2 it in">${IC.shield}<p class="lb">La gendarmerie</p><p class="big2" style="font-size:clamp(28px,3vw,46px)">Contrôle sur le terrain</p></div><div class="card2 it in">${IC.eye}<p class="lb">La Direction de la sécurité de l'aviation civile Nord</p><p class="big2" style="font-size:clamp(28px,3vw,46px)">Surveille le système</p></div></div>`))]);
 head('3 · Les acteurs du contrôle','Les échelons');
 vue(`<div class="ladder"><div class="rg it" id="l1"><span class="k">International</span><p class="tx">L'Organisation de l'aviation civile internationale, l'Association internationale du transport aérien.</p></div><div class="dn it" id="ld1"></div>
  <div class="rg it" id="l2"><span class="k">Européen</span><p class="tx">L'Agence européenne pour la sécurité aérienne.</p></div><div class="dn it" id="ld2"></div>
  <div class="rg it" id="l3"><span class="k">National et local</span><p class="tx">Le ministère des Transports, la préfecture, la Direction de la sécurité de l'aviation civile Nord, le Groupe ADP.</p></div><div class="dn it" id="ld3"></div>
  <div class="you it" id="l4">Pour vous : les règles locales descendent de ces échelons</div></div>`);
 await sayS('e29',[W('e29',"L'Organisation",()=>show('#l1',true)),W('e29',"L'Agence",()=>{show('#ld1');show('#l2',true)}),W('e29','Puis le ministère',()=>{show('#ld2');show('#l3',true)}),W('e29','Ce qui compte',()=>{undim();show('#ld3');show('#l4')})]);
 await pause();return null}
const PERS=[['s_csa','Le contrôle de la sécurité des aires de trafic','Vous le croiserez au volant.','Le service du contrôle'],['s_flyco','Les Flyco','Vous les croiserez au volant aussi.','et les Flyco'],['s_fire',"Le service de sauvetage et de lutte contre l'incendie des aéronefs",'Les secours du Groupe ADP.','Le service de sauvetage'],['s_smu',"Le service d'aide médicale urgente","Vous les retrouverez aux procédures d'urgence.",'et le service d\'aide']];
async function adp(){step();head('3 · Les acteurs du contrôle','Le personnel du Groupe ADP sur la piste');
 vue(`<div class="ph4">${PERS.map((p,i)=>`<div class="it" id="ap${i}">${img(p[0])}<p class="lb">${nb(p[1])}</p><p class="tx">${nb(p[2])}</p></div>`).join('')}</div>`);
 await sayS('e30',PERS.map((p,i)=>W('e30',p[3],()=>show('#ap'+i,true),.005)));undim();
 await pause(2200);return null}
async function acteurs(){step();head('3 · Les acteurs du contrôle','Qui fait quoi côté piste ? À vous');
 vue(`<div class="hero">${bigIc('quiz')}<p class="cap">Une mission : quel acteur la porte ?</p></div>`);
 await sayS('e31');
 const E=await sortV([{t:"Fixer par arrêté les modalités de circulation sur l'aire de mouvement.",s:'Fixer les modalités par arrêté',b:"pre",ok:"Le préfet délégué à la sécurité et à la sûreté des plateformes aéroportuaires.",h:"Pas celui-ci. D'où vient l'arrêté du début ?"},
  {t:"Contrôler les personnes et les véhicules admis côté piste.",s:'Contrôler sur le terrain',b:"gta",ok:"La Gendarmerie des transports aériens contrôle sur le terrain.",h:"Pas celui-ci. Qui contrôle sur le terrain ?"},
  {t:"Mener des audits réglementaires sur le dispositif de formation.",s:'Mener des audits',b:"dsac",ok:"La Direction de la sécurité de l'aviation civile Nord, autorité de surveillance.",h:"Pas celui-ci. Qui surveille le système ?"},
  {t:"Suspendre ou retirer une autorisation de conduite dans le cadre du système de gestion de la sécurité.",s:"Suspendre ou retirer l'autorisation",b:"adp",ok:"Le Groupe ADP, selon l'arrêté préfectoral.",h:"Pas celui-ci. Qui délivre l'autorisation, par son système de gestion de la sécurité ?"},
  {t:"Saisir et retirer les autorisations de circuler, en cas d'infraction au code de la route ou de manquement à l'arrêté préfectoral.",s:'Saisir et retirer les autorisations de circuler',b:"gta",ok:"La Gendarmerie des transports aériens sanctionne.",h:"Pas celui-ci. Repensez aux quatre missions : renseigner, protéger, contrôler, sanctionner."}],
  [['pre','Le préfet','build'],['gta','La Gendarmerie des transports aériens','shield'],['dsac',"La Direction de la sécurité de l'aviation civile Nord",'eye'],['adp','Le Groupe ADP','plane']],{label:'Mission'});
 jlog('5 h 14',`Qui fait quoi côté piste : 5 missions${errTxt(E)}`);return null}

/* 11. obtenir l'autorisation */
async function dispositif(){step();head("4 · L'autorisation de conduite",'Le texte européen');
 vue(`<div class="hero"><p class="huge tel">n°139/2014</p><p class="cap">Le règlement européen du 12 février 2014</p><p class="sub it" id="o1">Il impose à l'exploitant de l'aérodrome de mettre en place et de piloter un dispositif de formation à la circulation sur l'aire de mouvement.</p></div>`);
 await sayS('e32',[W('e32','Il impose',()=>show('#o1')),W('e32','Depuis le premier',()=>vue(`<div class="hero">${bigIc('cal')}<p class="huge tel">1er décembre 2018</p><p class="cap">Le dispositif est entièrement piloté par le Groupe ADP</p></div>`))]);
 await pause();return null}
async function autorisations(){step();await photo('permis4',FAST?10:400);setCam({mode:'contain'});await vzOff();
 const L=label([0,0,0],{lead:false}).title('Les autorisations de conduite');
 const Z=(fx,fy,zoom)=>{const c=pt(fx,fy);return camTo({mode:'contain',x:c[0],z:c[2],zoom},1500)};
 await sayS('e33',[at('e33',.02,()=>L.card('Quatre autorisations','')),W('e33','T :',()=>{L.card('T','Les cheminements routiers autorisés, exclusivement.',{a:pt(.17,.28)});Z(.25,.25,1.6)}),W('e33','M :',()=>{L.card('M','Les cheminements routiers autorisés, plus les voies avions sous écoute de fréquence.',{a:pt(.64,.28)});Z(.75,.25,1.6)}),
  W('e33','R :',()=>{L.card('R','Les cheminements routiers autorisés, plus les voies avions sous clairance du contrôle.',{a:pt(.17,.75)});Z(.25,.75,1.6)}),W('e33','P :',()=>{L.card('P','Toutes zones.',{a:pt(.64,.75)});Z(.75,.75,1.6)})]);
 camTo({mode:'contain'},1200);
 await sayS('e34',[at('e34',.02,()=>L.card('Xavier','« Moi, c\'est le T. Si je dois traverser une voie avion pour rejoindre un poste, je fais comment ? »',{a:pt(.17,.28)}))]);
 L.kill();
 vue(`<div class="hero"><p class="huge" style="font-size:clamp(70px,9vw,140px)">T</p><p class="cap">Le T, c'est l'aire de trafic</p><ul class="chk" style="margin-top:clamp(8px,2vh,20px)"><li id="tt1"><b>${CHECK}</b>${nb('Les cheminements véhicules et les routes de service autorisés au permis T')}</li><li id="tt2"><b>${CHECK}</b>${nb('Les traversées de voies de circulation avion délimitées par des marquages au sol')}</li><li id="tt3"><b>${CHECK}</b>${nb('Les postes de stationnement avion, dans le cadre de vos activités')}</li></ul></div>`);
 head("4 · L'autorisation de conduite",'Ce que permet le T');
 await sayS('e35',[W('e35','Il vous permet',()=>on('#tt1','on')),W('e35','Sur les traversées',()=>on('#tt2','on')),W('e35','Et sur les postes',()=>on('#tt3','on')),
  W('e35',"L'autorisation est",()=>vue(`<div class="side"><div>${img('hd5','Illustration')}</div><div><p class="cap" style="text-align:left;margin:0 0 10px">Délivrée par le Groupe ADP</p><p class="sub" style="text-align:left">Elle reste liée à votre activité : si vous changez de poste, le besoin est réexaminé.</p></div></div>`))]);
 await pause(2000);return null}
// le permis à cliquer : quatre zones sur la photo des quatre permis
const PZ={t:[2,2,47,47],m:[51,2,47,47],r:[2,51,47,47],p:[51,51,47,47]};
async function quelleAut(){step();head("4 · L'autorisation de conduite",'Quelle autorisation ? À vous');
 vue(`<div class="pzw"><div class="pz" id="pz"><img src="${IMG.permis4}" alt="Les quatre permis T, M, R et P">${Object.entries(PZ).map(([k,[x,y,w,h]])=>`<button data-k="${k}" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%" aria-label="${k.toUpperCase()}"></button>`).join('')}</div>
  <div class="qc" id="pq"><p class="n">À vous</p><p class="q">Pour chaque périmètre, cliquez sur le bon permis.</p><p class="qfb2" id="pfb"></p></div></div>`);
 await sayS('e36');
 const IT=[["Les cheminements routiers autorisés, et rien d'autre.",'t',"Le T : cheminements routiers exclusivement.","Pas celui-ci. Lequel s'en tient aux cheminements routiers autorisés, exclusivement ?"],
  ["Les cheminements routiers, plus les voies avions sous écoute de fréquence.",'m',"Le M.","Pas celui-ci. Écoute de fréquence : cherchez la lettre qui suit le T."],
  ["Les cheminements routiers, plus les voies avions sous clairance du contrôle.",'r',"Le R.","Pas celui-ci. Clairance du contrôle : ce n'est ni le T, ni le M, ni toutes zones."],
  ["Toutes zones.",'p',"Le P.","Pas celui-ci. Lequel ouvre toutes les zones ?"]];
 const pz=$c('#pz'),bs=[...pz.querySelectorAll('button')],q=$c('#pq'),fb=$c('#pfb');let E=0;
 for(let i=0;i<IT.length;i++){const [t,g,ok,ko]=IT[i];q.querySelector('.n').textContent=`Périmètre ${i+1} sur ${IT.length}`;q.querySelector('.q').innerHTML=nb(t);fb.className='qfb2';fb.innerHTML='';bs.forEach(b=>b.classList.remove('ok','ko'));pz.classList.add('live');
  for(;;){const b=await new Promise(r=>bs.forEach(x=>x.onclick=()=>{if(!x.classList.contains('ko'))r(x)}));if(b.dataset.k===g){b.classList.add('ok');break}E++;b.classList.add('ko');fb.className='qfb2 ko';fb.innerHTML=nb(ko)}
  bs.forEach(x=>x.onclick=null);pz.classList.remove('live');fb.className='qfb2 ok';fb.innerHTML=nb(ok);
  const nx=document.createElement('button');nx.className='act';nx.textContent=i<IT.length-1?'Suivant':'Continuer';q.appendChild(nx);try{nx.scrollIntoView({block:'nearest',behavior:'smooth'})}catch(e){}await new Promise(r=>nx.onclick=r);nx.remove()}
 jlog('5 h 16',`Quelle autorisation : 4 périmètres${errTxt(E)}`);return null}
async function panneaux(){step();await photo('panneau',FAST?10:400);setCam({zoom:1.08});await vzOff();
 const L=label([0,0,0],{lead:false}).title('La signalisation');
 await info(L,'e37',[[.03,"Un panneau vous l'indique","Partout où votre autorisation de conduite n'est pas admise.",{a:pt(.53,.34)}],[K('e37','Avant les'),'Avant, sur fond blanc',"Aujourd'hui, le code couleur des permis se retrouve sur les panneaux.",{a:pt(.53,.34)}],[K('e37','Le message'),'Si le panneau est là, on ne passe pas','Même si on passait avant.',{a:pt(.53,.34)}]],{x:pt(.53,.4)[0],z:pt(.53,.4)[2],zoom:1.5});
 await photo('interdite');setCam({mode:'contain'});
 await info(L,'e38',[[.03,'Zone interdite','Le panneau barre les autorisations qui ne passent pas.',{a:null}],[K('e38','Ici,'),'Ici, ni le T, ni le M, ni le R','',{a:pt(.5,.42)}],[K('e38','En bas'),'En bas, le numéro du centre des opérations côté piste',"L'AOC, à appeler en cas d'urgence uniquement : 01 48 16 47 55.",{a:pt(.2,.94)}]]);
 await cont(L);L.kill();return null}
const BLS=[['Où','Bâtiment Pluton, 6 place de Berlin, Paris-Charles de Gaulle. Il a déménagé en mars 2026.','Il a déménagé'],['Quand','Du lundi au vendredi, selon les horaires en vigueur. Fermé les jours fériés.','Ouvert'],['Stationnement','Parking PH, gratuit deux heures.','Le parking'],["L'accueil des professionnels","C'est là aussi qu'on va en cas de perte du permis.",'On s\'adresse']];
async function bls(){step();head("4 · L'autorisation de conduite",'Le Bureau Local de Sûreté');
 vue(`<div class="side"><div>${img('hd7','Illustration')}</div><div><p class="sub it" id="b0" style="text-align:left;margin:0 0 clamp(10px,2vh,20px);font-weight:600;color:var(--marine)">Les demandes, pour la théorie comme pour la pratique, s'y déposent.</p><ul class="conds">${BLS.map((m,i)=>`<li id="b${i+1}"><b>${i+1}</b><span>${m[0]}<small>${nb(m[1])}</small></span></li>`).join('')}</ul></div></div>`);
 await sayS('e39',[at('e39',.02,()=>show('#b0')),...BLS.map((m,i)=>W('e39',m[2],()=>on('#b'+(i+1)),.005))]);
 await pause(2200);return null}
async function annexes(){step();await photo('annexe8',FAST?10:400);setCam({mode:'contain'});await vzOff();
 const L=label([0,0,0],{lead:false}).title('Les demandes à déposer');
 const z=(fy,zoom)=>camTo({mode:'contain',x:pt(.45,fy)[0],z:pt(.45,fy)[2],zoom},1600);
 L.card("Pour la théorie : l'annexe 8","La demande d'autorisation de conduite, permis T. Version 8 du 6 novembre 2025.",{a:pt(.5,.06)});await cont(L,'Suivant');
 z(.27,1.9);L.card('Partie 2 · Formation théorique','À remplir par le centre de formation agréé.',{a:pt(.4,.235)});await cont(L,'Suivant');
 z(.45,1.9);L.card('Partie 3 · Partie pratique',"À remplir par le représentant de l'employeur ou le centre de formation agréé. Elle doit être réalisée dans les 40 jours qui suivent la réussite de la formation théorique.",{a:pt(.4,.345)});await cont(L,'Suivant');
 z(.72,1.7);L.card('Parties 4 et 5 · Aptitude et engagement',"L'employeur atteste l'aptitude du demandeur à la conduite en zone côté piste. Le demandeur atteste être titulaire d'un permis de conduire en cours de validité, et s'engage à respecter les règles de conduite et de stationnement.",{a:pt(.4,.58)});await cont(L,'Suivant');
 z(.45,2.2);L.card("Jusqu'à 3 mois","Dûment rempli et signé dans sa totalité, ce formulaire permet au demandeur de conduire dans la zone considérée jusqu'à 3 mois à compter de la validation de la formation théorique, en attendant l'autorisation délivrée par le Groupe ADP.",{a:pt(.92,.5)});await cont(L,'Suivant');
 await photo('annexe8p2');setCam({mode:'contain'});L.card('Page 2 · Les objectifs de sécurité','À atteindre par les conducteurs : avant la conduite, en conduite, et pour la circulation et le stationnement au poste avion.',{a:null});await cont(L,'Suivant');
 await photo('annexe7a');setCam({mode:'contain'});L.card("Pour la pratique : l'annexe 7","La grille de passage de la formation pratique. Pour chaque thème, on coche : atteint, non atteint, ou non applicable.",{a:null});await cont(L,'Suivant');
 await photo('annexe7b');setCam({mode:'contain'});L.card('Un avis','Favorable ou défavorable. La grille est signée par le référent ou le formateur habilité, et par le demandeur.',{a:null});
 await cont(L);L.kill();return null}
/* 12. au Bureau Local de Sûreté : cinq questions, autant d'essais que voulu */
async function quizBLS(){step();head('Au Bureau Local de Sûreté · 5 h 19','Cinq questions, celles du chapitre');
 const Q=[{id:'e40',q:"La circulation sur les aires de trafic de l'aéroport Paris-Charles de Gaulle est réglementée par :",o:[["L'arrêté préfectoral et les mesures particulières d'application de l'arrêté préfectoral en vigueur à Paris-Charles de Gaulle, le code de la route",1,"L'arrêté préfectoral et ses mesures particulières d'application, et le code de la route."],["Le code de l'aviation civile",0,"Pas celui-ci. Repensez aux trois référentiels qui s'imposent au volant."],["La sécurité aéroportuaire",0,"Pas celle-ci : ce n'est pas un texte. Repensez aux trois référentiels."]]},
  {id:'e41',q:"Le permis de conduire civil est-il obligatoire pour se présenter à la formation autorisation de conduite permis T ?",o:[["Oui",1,"C'est un prérequis : permis français en cours de validité, ou permis étranger valable en France, dans la catégorie du véhicule utilisé."],["Non",0,"Pas tout à fait. Rappelez-vous le préambule : un prérequis, pas une option."]]},
  {id:'e42',q:"Quelle est la sanction en cas de carte d'identification aéroportuaire non apparente ?",fixed:1,o:[["Une amende de 150 €",0,"Oui, mais pas seulement. Il y a une autre sanction possible."],["Une suspension de 6 jours",0,"Oui, mais pas seulement. Il y a une autre sanction possible."],["Réponse A et/ou B",1,"Les deux peuvent tomber : 150 € d'amende et/ou 6 jours de suspension. Un badge dans la poche ne suffit pas."]]},
  {id:'e43',q:"Quelle est l'autorité chargée de la surveillance et du respect des règles de circulation « côté piste » ?",o:[["La police aux frontières",0,"Erreur classique. Repensez à qui contrôle sur le terrain."],["La Gendarmerie des transports aériens",1,"La Gendarmerie des transports aériens surveille, contrôle et sanctionne sur l'aire de mouvement. La Direction de la sécurité de l'aviation civile Nord, elle, surveille le système."],["La douane",0,"Pas celle-ci. Repensez aux quatre missions : renseigner, protéger, contrôler, sanctionner."]]},
  {id:'e44',q:"Lorsque je réussis mon permis T, où dois-je le récupérer ?",o:[["Au Bureau Local de Sûreté",1,"Bâtiment Pluton, 6 place de Berlin, à l'accueil des professionnels."],["À la gendarmerie",0,"Pas là. Repensez à l'endroit où l'on dépose les demandes."],["Au bureau de piste",0,"Pas là. Repensez à l'endroit où l'on dépose les demandes."]]}];
 vue(`<div style="position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center"><div class="qc" id="bq" style="width:min(680px,100%)"><p class="n"></p><p class="q"></p></div></div>`);
 VZ.insertAdjacentHTML('afterbegin',`<div class="bg" id="bgb" style="background-image:url(${IMG.hd7})"></div>`);
 const qc=$c('#bq');let E=0;
 for(let i=0;i<Q.length;i++){const q=Q[i];qc.querySelector('.n').textContent=`Question ${i+1} sur ${Q.length}`;qc.querySelector('.q').innerHTML=nb(q.q);
  await sayS(q.id);let o=q.o.map((x,k)=>[String(k),x[0]]);if(!q.fixed)for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
  const gk=String(q.o.findIndex(x=>x[1]));const kot={};q.o.forEach((x,k)=>{if(!x[1])kot[k]=x[2]});
  E+=await pick(null,o,gk,q.o[+gk][2],kot,i<Q.length-1?'Question suivante':'Terminer',{retry:true,host:qc})}
 const bg=$('#bgb');if(bg)bg.remove();
 jlog('5 h 19',`Au Bureau Local de Sûreté : 5 questions${errTxt(E)}`);return null}
async function fin(){step();head('Étape 1 terminée · 5 h 20','Première case cochée');
 const ET=['La réglementation','Le zonage et la cartographie',"L'accès au côté piste","L'inspection du véhicule",'La circulation des véhicules',"Les règles de sécurité sur l'aire de mouvement","La circulation autour de l'avion","L'aire de manœuvre","Les procédures d'urgence","L'amélioration continue de la sécurité"];
 vue(`<div class="hero"><div class="pmini" id="pmn"><b>T</b>${ET.map((e,i)=>`<i>${i+1}</i>`).join('')}</div>
  <p class="cap" id="fc1" style="margin-top:clamp(6px,1.6vh,14px);font-size:clamp(22px,2.2vw,32px)">Prochaine étape : le zonage et la cartographie</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de l'étape</p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('e45',[at('e45',.02,()=>{const i=$c('#pmn i');i.classList.add('now');i.innerHTML='✓'}),W('e45','on prend',()=>{const j=$c('#pmn i:nth-of-type(2)');if(j)j.style.borderColor='var(--marine)'})]);
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Étape 2 · Le zonage et la cartographie</a>`}
const NEXT='etape2.html';
runSeq([['Couverture',cover],['Quatre parties',quatre],['Les trois référentiels',referentiels],["L'arrêté préfectoral",arrete],["Les mesures particulières d'application",mpa],['Véhicule, engin, matériel',async()=>{const L=await definitions();return vem(L)}],["Les consignes d'exploitation",consignes],['Qui fait quoi : la consigne n°3',roles],['Qui fait quoi ? À vous',quiFait],['Les sanctions',sanctions],['Suspension et retrait',retrait],['Infraction ou pas ? À vous',infraction],['Les acteurs du contrôle',prefet],['La Gendarmerie des transports aériens',gta],["La Direction de la sécurité de l'aviation civile Nord",dsac],['Le personnel du Groupe ADP',adp],['Qui fait quoi côté piste ? À vous',acteurs],['Le texte européen',dispositif],['Les autorisations T, M, R, P',autorisations],['Quelle autorisation ? À vous',quelleAut],['La signalisation',panneaux],['Le Bureau Local de Sûreté',bls],['Les annexes 7 et 8',annexes],['Au Bureau Local de Sûreté',quizBLS],["Fin de l'étape",fin]]);
