# Préambule, écran « La configuration des pistes » : photo encadrée à gauche, quatre pastilles à droite (maquette validée)
P='/home/claude/permis-/v2/preambule.html'
s=open(P,encoding='utf-8').read()
a=s.index("async function pistes(){");b=s.index(" L.kill();head('Introduction','Avant de prendre le volant');",a)
new=r'''async function pistes(){step();await goPh('pistes',{mode:'contain'},400);
 if(S3on())head('Introduction','La configuration des pistes');
 const items=[['Quatre pistes parallèles','En deux doublets.'],['Le doublet nord','Pistes 3 et 1.'],['Le doublet sud','Pistes 2 et 4.'],['Vous les retrouverez au zonage','']];
 const VW=[null,[.53,.2,PORT()?2.2:1.7],[.72,.86,PORT()?2.2:1.8],null],N=items.length;
 const L=label([0,0,0],{lead:false}).title('La configuration des pistes');const id='stp'+Math.random().toString(36).slice(2,6);
 L.html(`<div class="stp" id="${id}"><div class="pls">${items.map((x,i)=>`<button class="opt pl off" data-i="${i}">${i+1}</button>`).join('')}</div><div class="cd"><p class="t"></p><p class="s"></p></div><p class="nv"></p></div>`);
 const R=document.getElementById(id),pl=[...R.querySelectorAll('.pl')],seen=new Set();
 const paint=(i,D=1600)=>{seen.add(i);pl.forEach((b,k)=>{b.classList.toggle('cur',k===i);b.classList.toggle('vu',seen.has(k)&&k!==i)});R.querySelector('.cd .t').innerHTML=nb(items[i][0]);R.querySelector('.cd .s').innerHTML=nb(items[i][1]);R.querySelector('.nv').textContent=seen.size+' sur '+N+' vus';
  const v=VW[i];if(v){const c=pt(v[0],v[1]);camTo({x:c[0],z:c[2],zoom:v[2],mode:'contain'},D)}else camTo({mode:'contain'},D)};
 await sayS('i10',[at('i10',.02,()=>paint(0)),W('i10','Le doublet nord',()=>paint(1)),W('i10','Le doublet sud',()=>paint(2)),W('i10','Vous les',()=>paint(3))]);
 for(let i=0;i<N;i++)if(!seen.has(i))paint(i,60);
 pl.forEach((b,i)=>{b.onclick=()=>paint(i,900)});
 await cont(L);
'''
s=s[:a]+new+s[b:]
open(P,'w',encoding='utf-8').write(s)
