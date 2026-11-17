/* ---------------- le pas à pas numéroté (validé sur maquette) : pastilles 1 à N, une carte, compteur « n sur N vus » ---------------- */
async function stepper(d){step();if(d.head)head(d.head,d.sub||'');
 if(d.ph){await goPh(d.ph,{mode:'contain'},500)}else{await vzOff();vue(`<div class="hero nph"><p class="cap">${nb(d.cap)}</p></div>`)}
 const L=label([0,0,0],{lead:false}).title(d.cap);const id='stp'+Math.random().toString(36).slice(2,6),N=d.items.length;
 L.html(`<div class="stp" id="${id}"><div class="pls">${d.items.map((x,i)=>`<button class="opt pl" data-i="${i}">${i+1}</button>`).join('')}</div><p class="hn">Cliquez sur chaque numéro</p><div class="cd"><p class="t"></p><p class="s"></p></div><p class="nv"></p></div>`);
 const R=document.getElementById(id),pl=[...R.querySelectorAll('.pl')],seen=new Set();
 const paint=i=>{pl.forEach((b,k)=>{b.classList.toggle('cur',k===i);b.classList.toggle('vu',seen.has(k)&&k!==i)});const it=d.items[i];R.querySelector('.cd .t').innerHTML=nb(it[1]);R.querySelector('.cd .s').innerHTML=nb(it[2]);R.querySelector(".nv").textContent=seen.size+' sur '+N+' vus'};
 while(seen.size<N){const left=pl.filter((b,k)=>!seen.has(k));
  const b=await new Promise(r=>pl.forEach(x=>x.onclick=()=>r(x)));const i=+b.dataset.i;const first=!seen.has(i);seen.add(i);paint(i);
  if(first&&d.items[i][0])await sayS(d.items[i][0])}
 if(d.log)jlog(d.log[0],d.log[1]);
 await cont(L);L.kill();return null}
document.head.insertAdjacentHTML('beforeend',`<style>
.stp .pl.opt::before,.stp .pl.opt::after{content:none;display:none}
.stp .pls{display:flex;gap:8px;flex-wrap:wrap;margin:2px 0 6px}
.stp .pl{pointer-events:auto;display:inline-flex;align-items:center;justify-content:center;padding:0;position:relative;width:44px;height:44px;border-radius:50%;border:2px solid var(--marine);background:#fff;color:var(--marine);font:800 20px/1 Barlow,system-ui,sans-serif;cursor:pointer}
.stp .pl.cur{background:#FFC400;border-color:#FFC400;color:var(--marine)}
.stp .pl.vu{background:var(--marine);color:#fff}
.stp .hn{margin:0 0 10px;font-weight:700;font-size:var(--B);color:var(--pierre)}
.stp .cd{min-height:6.2em}.stp .cd .t:empty,.stp .cd .s:empty{display:none}
.stp .nv{margin:12px 0 0;font-weight:700;font-size:var(--B);color:var(--pierre)}
</style>`);
