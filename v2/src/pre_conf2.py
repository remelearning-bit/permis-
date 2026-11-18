# Préambule, écran 8 (et frise de l'écran 10) : libellés dans les segments, note sous la seconde frise (planche validée)
P='/home/claude/permis-/v2/preambule.html'
s=open(P,encoding='utf-8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(a[:70],s.count(a));s=s.replace(a,b)
rep("""<span class="lg">Avec un référent accompagnateur</span><span class="sh">Référent</span></div>""","""<span class="lg">Avec un référent accompagnateur</span><span class="sh">Référent</span></div><span class="sl" style="left:40%;width:50%">La copie de la demande</span>""")
rep("""<div class="sg" id="xb1" style="left:16.7%;width:50%;background:var(--pierre)"></div><div class="sg" id="xb2" style="left:66.7%;width:33.3%;background:var(--marine)"></div>""","""<div class="sg" id="xb1" style="left:16.7%;width:50%;background:var(--pierre)"><span class="sl">Remise à niveau</span></div><div class="sg" id="xb2" style="left:66.7%;width:33.3%;background:var(--marine)"><span class="sl w">Nouvelle formation initiale</span></div>""")
rep("""<span class="tk" id="xbt2" style="left:66.7%">12 mois</span></div></div></div>`;""","""<span class="tk" id="xbt2" style="left:66.7%">12 mois</span></div><p class="nt" id="xbn">Entre 3 et 12 mois : une remise à niveau est exigée, tracée sur la grille de formation pratique (annexe 7). Au-delà de 12 mois : une nouvelle formation initiale.</p></div></div>`;""")
rep("""W('p12','Au-delà de douze',()=>{on('#xb2');on('#xbf2')})]);
 await contV();return null}""","""W('p12','Au-delà de douze',()=>{on('#xb2');on('#xbf2')})]);
 on('#xbn');await contV();return null}""")
open(P,'w',encoding='utf-8').write(s)
