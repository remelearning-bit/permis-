# Préambule : mise en conformité avec les planches validées (écrans 3, 8, 9, 10, 12, 13) — PROPOSITION, non publiée
P='/home/claude/permis-/v2/preambule.html'
s=open(P,encoding='utf-8').read()
assert 'o.valid' not in s
def rep(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:60],s.count(a));s=s.replace(a,b)
# --- réponse choisie puis « Valider » (option valid de pick)
i=s.index("async function pick(");j=s.index("// classer",i);pk=s[i:j]
a="const p=await new Promise(r=>bs.forEach(x=>{if(!x.classList.contains('off'))x.onclick=()=>r(x)}));"
assert a in pk
pk=pk.replace(a,"""const p=await new Promise(r=>{if(!o.valid){bs.forEach(x=>{if(!x.classList.contains('off'))x.onclick=()=>r(x)});return}
  let sel=null;VB.innerHTML='<button class="vld">Valider</button>';const vb=VB.querySelector('button');
  bs.forEach(x=>{if(!x.classList.contains('off'))x.onclick=()=>{sel=x;bs.forEach(y=>y.classList.toggle('sel',y===x));vb.className='act';vb.style.pointerEvents='auto'}});
  vb.onclick=()=>{if(!sel)return;VB.innerHTML='';bs.forEach(y=>{y.classList.remove('sel');y.onclick=null});r(sel)}});""")
a="w.appendChild(nx);await new Promise(r=>nx.onclick=r);w.remove();";assert a in pk
pk=pk.replace(a,"(o.valid?(VB.innerHTML='',nx.style.pointerEvents='auto',VB):w).appendChild(nx);await new Promise(r=>nx.onclick=r);if(o.valid)VB.innerHTML='';w.remove();")
s=s[:i]+pk+s[j:]
# --- écran 3 : la question à gauche, les trois réponses à droite
rep("""vue(`<div class="hero"><div class="qc" id="qe" style="width:min(600px,100%)"><p class="n">À vous d'essayer</p><p class="q">${nb("Une série de questions n'est pas réussie. Que se passe-t-il ?")}</p></div></div>`);""",
    """head('Préambule · Cliquez sur la bonne réponse','Comment ça marche');vue(`<div class="duoS"><div class="dl"><div class="cdy"><p class="k">À vous d'essayer</p><p class="t">${nb("Une série de questions n'est pas réussie. Que se passe-t-il ?")}</p></div></div><div class="dr qans" id="qe"></div></div>`);""")
rep("'Continuer',{once:true,host:$c('#qe')});","'Continuer',{once:true,valid:true,host:$c('#qe')});head('Préambule','Comment ça marche');")
# --- écran 9 : l'attestation, quatre pastilles
i=s.index("async function attestation(){");j=s.index("/* 6. vrai ou faux",i)
s=s[:i]+r'''async function attestation(){step();await goPh('annexe',{mode:'contain'},400);
 if(S3on())head('Préambule',"L'attestation de réussite");
 const items=[['Annexe 8',"Le document « Demande d'autorisation de conduite, permis T ». Ici, un exemple fictif."],['Partie 2 · Formation théorique','Remplie par le centre de formation agréé : il atteste que vous avez réussi la théorie.'],['Elle vaut autorisation de conduite','Avec un référent.'],['40 jours','La partie pratique doit être réalisée dans les 40 jours suivant la réussite de la formation théorique.']],N=items.length;
 const VW=[null,[.46,.27,PORT()?1.6:2.6],[.46,.27,PORT()?1.6:2.6],[PORT()?.8:.74,.37,PORT()?2.4:2.6]];
 const L=label([0,0,0],{lead:false}).title("L'attestation de réussite");const id='stp'+Math.random().toString(36).slice(2,6);
 L.html(`<div class="stp" id="${id}"><div class="pls">${items.map((x,i)=>`<button class="opt pl off" data-i="${i}">${i+1}</button>`).join('')}</div><div class="cd"><p class="t"></p><p class="s"></p></div><p class="nv"></p></div>`);
 const R=document.getElementById(id),pl=[...R.querySelectorAll('.pl')],seen=new Set();
 const paint=(i,D=2000)=>{seen.add(i);pl.forEach((b,k)=>{b.classList.toggle('cur',k===i);b.classList.toggle('vu',seen.has(k)&&k!==i)});R.querySelector('.cd .t').innerHTML=nb(items[i][0]);R.querySelector('.cd .s').innerHTML=nb(items[i][1]);R.querySelector('.nv').textContent=seen.size+' sur '+N+' vus';
  const v=VW[i];if(v){const c=pt(v[0],v[1]);camTo({x:c[0],z:c[2],zoom:v[2],mode:'contain'},D)}else camTo({mode:'contain'},D)};
 paint(0,60);
 await sayS('p10b',[W('p10b',"l'attestation",()=>paint(1)),W('p10b',"C'est elle",()=>paint(2)),W('p10b','pendant',()=>paint(3))]);
 for(let i=0;i<N;i++)if(!seen.has(i))paint(i,60);
 pl.forEach((b,i)=>{b.onclick=()=>paint(i,900)});
 await cont(L);await camTo({mode:'contain'},1200);L.kill();return null}

'''+s[j:]
# --- écran 10 : vrai ou faux
rep("""<div class="qc" id="qc"><p class="n">À vous</p><p class="q">Quatre affirmations : vraies ou fausses ?</p></div></div>`);""","""<div class="qc" id="qc"><div class="cdy"><p class="n">À vous</p><p class="q">Quatre affirmations : vraies ou fausses ?</p></div></div></div>`);""")
rep("i<IT.length-1?'Affirmation suivante':'Continuer',{once:true,host:qc,","i<IT.length-1?'Affirmation suivante':'Continuer',{once:true,valid:true,host:qc,")
rep("head('Préambule','Vrai ou faux ?');","head('Préambule · Cliquez sur la bonne réponse','Vrai ou faux ?');")
# --- écran 12 : le permis à gauche, les dix étapes à droite
rep("async function plan(){step();head('Préambule','Le plan de la matinée');vue(PERMIS());",
 """async function plan(){step();head('Préambule','Le plan de la matinée');
 vue(`<div class="duoS"><div class="dl"><div class="pc pcp"><div class="ph1"><span class="T">T</span><p>Votre permis</p></div><div class="cs" id="pcs">${ET.map((e,i)=>`<i>${i+1}</i>`).join('')}</div><p class="demo2" id="dm">${nb("Exemple : l'étape 1 terminée, sa case est cochée.")}</p></div></div>
  <div class="dr"><div class="permis lst2" id="pm"><ol>${ET.map((e,i)=>`<li><b>${i+1}</b>${nb(e)}</li>`).join('')}</ol></div></div></div>`);""")
rep("W('p16','À chaque étape',()=>{li(0).classList.add('tick');on('#dm')}),W('p16','À la fin',()=>{li(0).classList.remove('tick');$c('#dm').classList.remove('in');$c('.permis .T').classList.add('lit')})]);",
    "W('p16','À chaque étape',()=>{li(0).classList.add('tick');$c('#pcs i').classList.add('now');on('#dm')}),W('p16','À la fin',()=>{li(0).classList.remove('tick');$c('#pcs i').classList.remove('now');$c('#dm').classList.remove('in');$c('.pcp .T').classList.add('lit')})]);")
# --- écran 13 : le titre et la mention de l'extrait
rep(""" VZ.classList.remove('clear');
 const PART=""",""" VZ.classList.remove('clear');head('Introduction','Pourquoi une formation spéciale pour Roissy ?');
 const PART=""")
rep("""<p class="sub" id="mps">Chaque aéroport a ses particularités.</p></div></div>""","""<p class="sub" id="mps">Chaque aéroport a ses particularités.</p></div><p class="colh" style="margin-top:8px">Extrait : Europe 1, La Matinale.</p></div>""")
open(P,'w',encoding='utf-8').write(s)
