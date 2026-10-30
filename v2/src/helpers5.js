/* un écran sur photo : chaque carte arrive quand la voix en parle ; Xavier est cité */
async function infoS(d){step();if(d.head)head(H5,d.head);await photo(d.ph,FAST?10:500);setCam({mode:'contain'});await vzOff();
 const L=label([0,0,0],{lead:false}).title(d.cap);
 for(const id of d.lines){if(LINES[id].w==='X'){await sayS(id,[at(id,.02,()=>L.card(`« ${LINES[id].t} »`,'Xavier',{a:null}))]);continue}
  await info(L,id,(d.cards||[]).filter(c=>c[0]===id).map(c=>[c[1],c[2],c[3]||'',{a:null}]))}
 await cont(L);L.kill();return null}
const S=(ph,cap,lines,cards,head)=>()=>infoS({ph,cap,lines,cards,head});

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
