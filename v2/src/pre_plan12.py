# Préambule, écran 12 : le permis à gauche, les dix étapes à droite (planche validée, accord de Cat le 18/11)
P='/home/claude/permis-/v2/preambule.html'
s=open(P,encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(a[:60],s.count(a));s=s.replace(a,b)
rep("async function plan(){step();head('Préambule','Le plan de la matinée');vue(PERMIS());",
 """async function plan(){step();head('Préambule','Le plan de la matinée');
 vue(`<div class="duoS"><div class="dl"><div class="pc pcp"><div class="ph1"><span class="T">T</span><p>Votre permis</p></div><div class="cs" id="pcs">${ET.map((e,i)=>`<i>${i+1}</i>`).join('')}</div><p class="demo2" id="dm">${nb("Exemple : l'étape 1 terminée, sa case est cochée.")}</p></div></div>
  <div class="dr"><div class="permis lst2" id="pm"><ol>${ET.map((e,i)=>`<li><b>${i+1}</b>${nb(e)}</li>`).join('')}</ol></div></div></div>`);""")
rep("W('p16','À chaque étape',()=>{li(0).classList.add('tick');on('#dm')}),W('p16','À la fin',()=>{li(0).classList.remove('tick');$c('#dm').classList.remove('in');$c('.permis .T').classList.add('lit')})]);",
    "W('p16','À chaque étape',()=>{li(0).classList.add('tick');$c('#pcs i').classList.add('now');on('#dm')}),W('p16','À la fin',()=>{li(0).classList.remove('tick');$c('#pcs i').classList.remove('now');$c('#dm').classList.remove('in');$c('.pcp .T').classList.add('lit')})]);")
open(P,'w',encoding='utf-8').write(s)
a=s.index("function duo(");b=s.index("\nwindow.V2=");open('/tmp/o/pre.js','w').write(s[a:b])
