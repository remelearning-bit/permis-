# Préambule : photos à plat validées (pistes avec repères, vue aérienne avec le repère Roissy-CDG)
import base64
P='/home/claude/permis-/v2/preambule.html'
s=open(P,encoding='utf-8').read()
assert 'IMG.platP' not in s
b64=lambda f:'data:image/jpeg;base64,'+base64.b64encode(open('/home/claude/w/preimg/'+f,'rb').read()).decode()
i=s.index("function duo(");j=s.rfind('\n',0,i)  # avant le commentaire du bloc
k=s.rfind('/* deux moitiés',0,i)
s=s[:k]+f"IMG.platP='{b64('plat_pistes.jpg')}';IMG.platA='{b64('plat_aerien.jpg')}';\n"+s[k:]
a=s.index("async function pistes(){");b=s.index(" L.kill();head('Introduction','Avant de prendre le volant');",a)
new=r'''async function pistes(){step();await vzOff();head('Introduction','La configuration des pistes');
 const items=[['Quatre pistes parallèles','En deux doublets.'],['Le doublet nord','Pistes 3 et 1.'],['Le doublet sud','Pistes 2 et 4.'],['Vous les retrouverez au zonage','']],N=items.length;
 const ln=(x1,y1,x2,y2,k)=>`<g class="pl${k}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0F1E46" stroke-width="24" stroke-linecap="round"/><line class="da" x1="${x1+14}" y1="${y1}" x2="${x2-14}" y2="${y2}" stroke-width="5" stroke-dasharray="30 22"/></g>`;
 const tag=(x,y,w,t,k,fs=40)=>`<g class="tg${k}" transform="translate(${x},${y})"><rect width="${w}" height="50" rx="25" stroke="#0F1E46" stroke-width="5"/><text x="${w/2}" y="36" font-size="${fs}" font-weight="900" fill="#0F1E46" text-anchor="middle">${t}</text></g>`;
 vue(`<div class="platw" id="plw" data-k="0"><div class="stp"><div class="pls">${items.map((x,i)=>`<button class="opt pl off" data-i="${i}">${i+1}</button>`).join('')}</div></div>
  <svg viewBox="0 60 2000 900" preserveAspectRatio="xMidYMid slice"><image href="${IMG.platP}" x="0" y="0" width="2000" height="988"/>
  <g fill="#D9DDE4"><rect x="720" y="125" width="180" height="45"/><rect x="1060" y="30" width="420" height="45"/><rect x="915" y="250" width="125" height="45"/><rect x="1280" y="755" width="135" height="45"/><rect x="700" y="900" width="450" height="45"/><rect x="1355" y="925" width="140" height="45"/></g>
  ${ln(620,200,1160,157,'n')}${ln(500,288,1310,211,'n')}${ln(1035,872,1840,795,'s')}${ln(1170,935,1720,880,'s')}
  ${tag(700,100,202,'Piste 3','n')}${tag(960,330,202,'Piste 1','n')}${tag(1370,730,202,'Piste 2','s')}${tag(1760,890,202,'Piste 4','s')}${tag(1010,70,322,'Doublet nord','dn',30)}${tag(690,800,322,'Doublet sud','ds',30)}</svg>
  <div class="cd pcd"><p class="t"></p><p class="s"></p></div><p class="nv"></p></div>`);
 const R=cur(),pl=[...R.querySelectorAll('.pl')],seen=new Set(),W0=R.querySelector('#plw');
 const paint=i=>{seen.add(i);W0.dataset.k=i;pl.forEach((b,k)=>{b.classList.toggle('cur',k===i);b.classList.toggle('vu',seen.has(k)&&k!==i)});R.querySelector('.pcd .t').innerHTML=nb(items[i][0]);R.querySelector('.pcd .s').innerHTML=nb(items[i][1]);R.querySelector('.nv').textContent=seen.size+' sur '+N+' vus'};
 await sayS('i10',[at('i10',.02,()=>paint(0)),W('i10','Le doublet nord',()=>paint(1)),W('i10','Le doublet sud',()=>paint(2)),W('i10','Vous les',()=>paint(3))]);
 for(let i=0;i<N;i++)if(!seen.has(i))paint(i);
 pl.forEach((b,i)=>{b.style.pointerEvents='auto';b.onclick=()=>paint(i)});
 await contV();const L={kill(){}};
'''
s=s[:a]+new+s[b:]
a="`<div class=\"nvb\"><p class=\"bigy\">Roissy-CDG</p></div>`";assert a in s
s=s.replace(a,"`<div class=\"platc\"><svg viewBox=\"0 0 1600 900\" preserveAspectRatio=\"xMidYMid slice\"><image href=\"${IMG.platA}\" width=\"1600\" height=\"900\"/><g transform=\"translate(800,560)\"><circle r=\"46\" fill=\"#FFC400\" opacity=\".35\"/><circle r=\"26\" fill=\"#FFC400\" stroke=\"#0F1E46\" stroke-width=\"9\"/></g><g transform=\"translate(870,520)\"><rect width=\"330\" height=\"66\" rx=\"33\" fill=\"#0F1E46\"/><text x=\"165\" y=\"46\" font-size=\"38\" font-weight=\"900\" fill=\"#fff\" text-anchor=\"middle\">Roissy-CDG</text></g></svg></div>`")
open(P,'w',encoding='utf-8').write(s)
