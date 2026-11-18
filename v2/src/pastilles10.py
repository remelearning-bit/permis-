# Étape 10 : écrans mis en page comme les maquettes validées (pastilles, blocs marine, tuiles, fin en deux moitiés)
s=open('/home/claude/w/e10-avant-pastilles.js',encoding='utf-8').read()
a=s.index("async function infoS(d){");b=s.index("const S=(ph,cap")
new=r'''/* Écran d'information, mis en page comme les maquettes validées : image (ou bloc marine) à gauche,
   pastilles numérotées et carte à droite. La voix fait avancer les pastilles ; les cartes sans voix se cliquent. */
async function infoS(d){step();
 if(d.ph){await goPh(d.ph,{mode:'contain'})}
 else{await vzOff();const g=d.big;vue(`<div class="hero nph">${g?`<p class="bigy">${nb(g[0])}</p><p class="sub">${nb(g[1])}</p>`:`<p class="cap">${nb(d.cap)}</p>`}</div>`)}
 if(typeof S3on==='function'&&S3on())head(H10+(d.tm?' · '+HH(d.tm):''),d.cap);
 const items=[...(d.cards||[]).map(c=>[c[2],c[3]||'']),...(d.more||[])];const nv=(d.cards||[]).length,N=items.length;
 const L=label([0,0,0],{lead:false}).title(d.cap);const id='stp'+Math.random().toString(36).slice(2,6);
 L.html(`<div class="stp" id="${id}"><div class="pls">${items.map((x,i)=>`<button class="opt pl off" data-i="${i}">${i+1}</button>`).join('')}</div><p class="hn"></p><div class="cd"><p class="t"></p><p class="s"></p></div><p class="nv"></p></div>`);
 const R=document.getElementById(id),pl=[...R.querySelectorAll('.pl')],seen=new Set();
 const paint=i=>{seen.add(i);pl.forEach((b,k)=>{b.classList.toggle('cur',k===i);b.classList.toggle('vu',seen.has(k)&&k!==i)});R.querySelector('.cd .t').innerHTML=nb(items[i][0]);R.querySelector('.cd .s').innerHTML=nb(items[i][1]);R.querySelector('.nv').textContent=seen.size+' sur '+N+' vus'};
 const quote=t=>{R.querySelector('.cd .t').innerHTML=nb(`« ${t} »`);R.querySelector('.cd .s').textContent='Xavier'};
 const idx=(d.cards||[]).map((c,i)=>[c,i]);
 for(const lid of d.lines){const hk=d.swap&&d.swap[0]===lid?[at(lid,d.swap[1],()=>photo(d.swap[2],FAST?10:700))]:[];
  if(LINES[lid].w==='X'){await sayS(lid,[...hk,at(lid,.02,()=>quote(LINES[lid].t))]);continue}
  await sayS(lid,[...hk,...idx.filter(x=>x[0][0]===lid).map(x=>at(lid,x[0][1],()=>paint(x[1])))])}
 for(let i=0;i<nv;i++)if(!seen.has(i))paint(i);
 pl.forEach((b,i)=>{b.onclick=()=>paint(i)});
 if(N>nv){R.querySelector('.hn').textContent='Cliquez sur chaque numéro';
  while(seen.size<N){pl.forEach((b,i)=>b.classList.toggle('off',seen.has(i)));await new Promise(r=>pl.forEach((b,i)=>b.onclick=()=>{paint(i);r()}))}}
 pl.forEach((b,i)=>{b.classList.add('off');b.onclick=()=>paint(i)});R.querySelector('.hn').textContent='';
 await cont(L);L.kill();return null}
/* La synthèse : conseils numérotés, qui s'affichent avec la voix (maquette validée) */
async function grille(d){step();await vzOff();head(H10+' · '+HH(d.tm),d.cap);
 const items=[...d.cards.map(c=>[c[2],c[3]]),...(d.more||[])];
 vue(`<div class="g6">${items.map((c,i)=>`<div class="gi" id="gi${i}"><b>${i+1}</b><div><p class="t">${nb(c[0])}</p><p class="s">${nb(c[1])}</p></div></div>`).join('')}</div>`);
 const on=i=>{const e=document.getElementById('gi'+i);if(e)e.classList.add('on')};
 for(const lid of d.lines)await sayS(lid,d.cards.map((c,i)=>[c,i]).filter(x=>x[0][0]===lid).map(x=>at(lid,x[0][1],()=>on(x[1]))));
 items.forEach((c,i)=>on(i));await contV();return null}
'''
s=s[:a]+new+s[b:]
def rep(a,b):
    global s
    assert s.count(a)==1,a;s=s.replace(a,b)
rep("const sgs=S(null,'Le système de gestion de la sécurité'","const sgs=S('sgs','Le système de gestion de la sécurité'")
rep("'Les notifications',{tm:'8 h 03',ic:'shield',more:","'Les notifications',{tm:'8 h 03',ic:'shield',big:['Notifier protège',\"Face à votre employeur comme à l'État.\"],more:")
rep("'Les notifications',{tm:'8 h 04',ic:'warn'}","'Les notifications',{tm:'8 h 04',ic:'warn',big:['72 heures','En tort ou sans tort : aucune sanction.']}")
rep("const synthese=S(null,'Facteurs humains : la synthèse',['s14'],[['s14',.03","const synthese=()=>grille({cap:'Facteurs humains : la synthèse',lines:['s14'],cards:[['s14',.03")
rep("]],'Les facteurs humains',{tm:'8 h 01',ic:'user2',more:","]],tm:'8 h 01',more:")
a=s.index(" vue(`<div class=\"flw\">");b=s.index(" await sayS('s13');")
s=s[:a]+r''' vue(`<div class="fh"><div class="flw">${C.map((c,i)=>`<button class="fl" id="fl${i}"><i>${i+1}</i><span class="n">${nb(c[1])}</span></button>`).join('')}</div><div class="fd"><div class="cd"><p class="t"></p><p class="s">Cliquez sur chaque carte.</p></div><p class="nv">0 sur 4 vus</p></div></div>`);
 await sayS('s08');
 const bs=[...VZ.querySelectorAll('.fl')],cd=VZ.querySelector('.fd .cd'),nvx=VZ.querySelector('.fd .nv');let nseen=0;
 const show=i=>{bs.forEach((b,k)=>b.classList.toggle('cur',k===i));cd.querySelector('.t').innerHTML=nb(C[i][1]);cd.querySelector('.s').innerHTML=nb(C[i][2])};
 for(;;){const left=bs.filter(b=>!b.classList.contains('on'));if(!left.length)break;hand(left[0]);
  const b=await new Promise(r=>left.forEach(x=>x.onclick=()=>r(x)));hand(null);bs.forEach(x=>x.onclick=null);b.classList.add('on');nseen++;show(bs.indexOf(b));nvx.textContent=nseen+' sur 4 vus';await sayS(C[bs.indexOf(b)][0])}
 bs.forEach((b,i)=>b.onclick=()=>show(i));
'''+s[b:]
a=s.index(" vue(`<div class=\"hero nph\"><p class=\"cap\">Votre permis est complet</p>");b=s.index(" cur().classList.add('vb');")
s=s[:a]+r''' vue(`<div class="fin2"><div class="pc"><div class="ph1"><span class="T">T</span><p>Votre permis<br>est complet</p></div><div class="cs">${[1,2,3,4,5,6,7,8,9,10].map(n=>`<b>${n}</b>`).join('')}</div></div>
  <div class="jcard"><p class="lb">Votre journal de la matinée</p><ul class="jl">${jhtml(true)}</ul></div></div>`);
'''+s[b:]
css=r'''
.hero.nph .bigy{font-weight:800;font-size:clamp(40px,6vw,92px);line-height:1;color:#FFC400;margin:0}
.g6{display:grid;grid-template-columns:1fr 1fr;gap:clamp(8px,1.4vh,16px) clamp(10px,1.4vw,18px);width:100%;max-width:1240px;align-self:flex-start}
.gi{display:flex;align-items:center;gap:16px;background:#fff;border:3px solid var(--marine);border-radius:20px;box-shadow:0 4px 0 rgba(15,30,70,.25);padding:clamp(6px,1.1vh,12px) 18px;opacity:.18;transition:opacity .5s;text-align:left}
.gi.on{opacity:1}.gi b{flex:none;width:44px;height:44px;border-radius:50%;background:#FFC400;border:3px solid var(--marine);display:flex;align-items:center;justify-content:center;font-size:20px}
.gi .t{margin:0;font-weight:700;font-size:clamp(16px,1.45vw,22px);line-height:1.15}.gi .s{margin:2px 0 0;font-size:clamp(14px,1.1vw,17px);line-height:1.3;color:#33405f}
.fh{display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,1.6vw,22px);width:100%;max-width:1240px;align-self:stretch;min-height:100%}
.fh .flw{grid-template-columns:1fr 1fr;gap:clamp(8px,1vw,14px)}
.fh .fl{min-height:0;flex-direction:column;align-items:flex-start;justify-content:center;gap:6px;padding:18px 22px;text-align:left}
.fh .fl i{font-style:normal;font-weight:800;font-size:clamp(28px,3vw,44px);line-height:1;color:#b9bfcc}
.fh .fl.cur{background:var(--marine);box-shadow:0 0 0 4px #FFC400}.fh .fl.cur .n{color:#fff}.fh .fl.cur i{color:#FFC400}
.fh .fl.on .n{display:block}
.fh .fd{display:flex;flex-direction:column}.fh .fd .cd{flex:1;background:#fff;border:4px solid #FFC400;border-radius:20px;padding:24px 28px;display:flex;flex-direction:column;justify-content:center;text-align:left}
.fh .cd .t{margin:0;font-weight:700;font-size:clamp(22px,2.3vw,34px);line-height:1.15}.fh .cd .t:empty{display:none}.fh .cd .s{margin:10px 0 0;font-size:clamp(16px,1.45vw,21px);line-height:1.4}
.fh .nv{margin:10px 4px 0;text-align:right;font-weight:700;color:var(--pierre)}
.fin2{display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,1.6vw,22px);width:100%;max-width:1240px;align-items:stretch}
.fin2 .pc{background:#fff;border:3px solid var(--marine);border-radius:22px;box-shadow:0 4px 0 rgba(15,30,70,.25);padding:26px 30px;text-align:left}
.fin2 .ph1{display:flex;align-items:center;gap:18px}.fin2 .T{width:78px;height:78px;border-radius:16px;border:6px solid var(--marine);display:flex;align-items:center;justify-content:center;font-size:52px;font-weight:800}
.fin2 .ph1 p{margin:0;font-weight:700;font-size:clamp(22px,2.4vw,34px);line-height:1.1}
.fin2 .cs{display:grid;grid-template-columns:repeat(5,minmax(0,78px));gap:12px;margin-top:26px}
.fin2 .cs b{aspect-ratio:1;border-radius:14px;background:var(--marine);color:#FFC400;display:flex;align-items:center;justify-content:center;font-size:clamp(20px,2.2vw,30px)}
.fin2 .jcard{margin:0;width:auto}
@media (max-width:700px){.g6,.fh,.fin2{grid-template-columns:1fr}.fh .fl{padding:10px 12px}.gi{padding:8px 12px;gap:10px}.gi b{width:34px;height:34px;font-size:16px}.fin2 .cs{grid-template-columns:repeat(5,1fr);gap:8px}.fin2 .T{width:54px;height:54px;font-size:36px}.hero.nph .bigy{font-size:40px;color:var(--marine)}}
'''
rep(".hero.nph .ic{width:clamp(70px,9vw,120px);height:auto;opacity:.9}",".hero.nph .ic{width:clamp(70px,9vw,120px);height:auto;opacity:.9}"+css)
open('/home/claude/w/e10.js','w',encoding='utf-8').write(s)
