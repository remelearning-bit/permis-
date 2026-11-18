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
