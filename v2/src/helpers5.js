/* un écran sur photo : chaque carte arrive quand la voix en parle ; Xavier est cité */
/* Écran d'information mis en page comme les maquettes validées : photo encadrée à gauche, pastilles numérotées et carte à droite.
   La voix fait avancer les pastilles ; les cartes sans voix se cliquent ; à la fin, tout reste consultable. */
async function infoPills(d,kick){step();await goPh(d.ph,{mode:'contain'},500);
 if(typeof S3on==='function'&&S3on())head(kick+(d.tm?' · '+HH(d.tm):''),d.cap);else if(d.head)head(kick+(d.tm?' · '+HH(d.tm):''),d.head);
 const items=[...(d.cards||[]).map(c=>[c[2],c[3]||'']),...(d.more||[])];const nv=(d.cards||[]).length,N=items.length;
 const L=label([0,0,0],{lead:false}).title(d.cap);const id='stp'+Math.random().toString(36).slice(2,6);
 L.html(`<div class="stp" id="${id}"><div class="pls">${items.map((x,i)=>`<button class="opt pl off" data-i="${i}">${i+1}</button>`).join('')}</div><p class="hn"></p><div class="cd"><p class="t"></p><p class="s"></p></div><p class="nv"></p></div>`);
 const R=document.getElementById(id),pl=[...R.querySelectorAll('.pl')],seen=new Set();
 const paint=i=>{seen.add(i);pl.forEach((b,k)=>{b.classList.toggle('cur',k===i);b.classList.toggle('vu',seen.has(k)&&k!==i)});R.querySelector('.cd .t').innerHTML=nb(items[i][0]);R.querySelector('.cd .s').innerHTML=nb(items[i][1]);R.querySelector('.nv').textContent=N>1?seen.size+' sur '+N+' vus':''};
 const quote=t=>{R.querySelector('.cd .t').innerHTML=nb(`« ${t} »`);R.querySelector('.cd .s').textContent='Xavier'};
 const idx=(d.cards||[]).map((c,i)=>[c,i]);const SW=d.swaps||(d.swap?[d.swap]:[]);
 for(const lid of d.lines){const hk=SW.filter(x=>x[0]===lid).map(x=>at(lid,x[1],()=>photo(x[2],FAST?10:900)));
  if(LINES[lid].w==='X'){await sayS(lid,[...hk,at(lid,.02,()=>quote(LINES[lid].t))]);continue}
  await sayS(lid,[...hk,...idx.filter(x=>x[0][0]===lid).map(x=>at(lid,x[0][1],()=>paint(x[1])))])}
 for(let i=0;i<nv;i++)if(!seen.has(i))paint(i);
 pl.forEach((b,i)=>{b.onclick=()=>paint(i)});
 if(N>nv){R.querySelector('.hn').textContent='Cliquez sur chaque numéro';
  while(seen.size<N){pl.forEach((b,i)=>b.classList.toggle('off',seen.has(i)));await new Promise(r=>pl.forEach((b,i)=>b.onclick=()=>{paint(i);r()}))}}
 pl.forEach((b,i)=>{b.classList.add('off');b.onclick=()=>paint(i)});R.querySelector('.hn').textContent='';
 if(d.end)d.end(L);await cont(L);L.kill();return null}
const infoS=d=>infoPills(d,H5);
const S=(ph,cap,lines,cards,head,o={})=>()=>infoS({ph,cap,lines,cards,head,...o});

/* une série de questions à choix : une réponse, chaque réponse expliquée ; sous 80 %, retour ciblé */
async function quiz(id,Q,h,what,bk,ret,x){let E=0;const MISS=new Set();
 for(let i=0;i<Q.length;i++){const z=Q[i];
  vue(z.ph?`<div class="qimg"><figure class="fig"><img src="${IMG[z.ph]}" alt=""></figure><div class="qc" id="qq"><p class="n">Question ${i+1} sur ${Q.length}</p><p class="q">${nb(z.q)}</p></div></div>`:`<div class="qc" id="qq" style="width:min(760px,100%)"><p class="n">Question ${i+1} sur ${Q.length}</p><p class="q">${nb(z.q)}</p></div>`);
  if(z.line)await sayS(z.line);else await wait(FAST?0:400);
  const qc=$c('#qq');let o=z.o.map((y,k)=>[String(k),y[0]]);if(!z.fixed)for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
  const gk=String(z.o.findIndex(y=>y[1]));const kot={};z.o.forEach((y,k)=>{if(!y[1]&&y[2])kot[k]=y[2]});
  const e=await pick(null,o,gk,z.o[+gk][2],kot,i<Q.length-1?'Question suivante':'Terminer',{once:true,x:!!x,host:qc});E+=e;if(e)[].concat(z.bk||bk).forEach(k=>MISS.add(k))}
 jlog(h,`${what} : ${Q.length} question${Q.length>1?"s":""}${errTxt(E)}`);return gate(id,E,Q.length,[...MISS].sort((a,b)=>a-b),what,ret)}

document.head.insertAdjacentHTML('beforeend',`<style>
.qimg{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(20px,3vw,48px);align-items:center;width:100%;max-width:1220px}
.qimg .fig{margin:0;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(38,60,82,.16);background:#fff}
.qimg .fig img{display:block;width:100%}
@media (max-width:700px){.qimg{grid-template-columns:1fr;gap:12px}.qimg .fig img{max-height:20vh;width:auto;max-width:100%;margin:0 auto}#vz .stage>.qimg{margin-top:0}}
</style>`);
