# Préambule : écrans mis en page comme les maquettes validées (deux moitiés, pastilles, blocs marine)
import re
P='/home/claude/permis-/v2/preambule.html'
s=open(P,encoding='utf-8').read()
assert 'function duo(' not in s
def cut(a,b,new):
    global s
    i=s.index(a);j=s.index(b,i);s=s[:i]+new+s[j:]
DUO=r'''/* deux moitiés (maquettes validées) : un bloc à gauche, pastilles numérotées et carte à droite ; la voix fait avancer les pastilles */
function duo(left,items){const N=items.length;
 vue(`<div class="duoS"><div class="dl">${left}</div><div class="dr"><div class="stp"><div class="pls">${items.map((x,i)=>`<button class="opt pl off" data-i="${i}">${i+1}</button>`).join('')}</div><div class="cd"><p class="t"></p><p class="s"></p></div><p class="nv"></p></div></div></div>`);
 const R=cur(),pl=[...R.querySelectorAll('.pl')],seen=new Set();
 const paint=i=>{seen.add(i);pl.forEach((b,k)=>{b.classList.toggle('cur',k===i);b.classList.toggle('vu',seen.has(k)&&k!==i)});R.querySelector('.cd .t').innerHTML=nb(items[i][0]);R.querySelector('.cd .s').innerHTML=nb(items[i][1]||'');R.querySelector('.nv').textContent=N>1?seen.size+' sur '+N+' vus':''};
 return {R,paint,end(){for(let i=0;i<N;i++)if(!seen.has(i))paint(i);pl.forEach((b,i)=>{b.style.pointerEvents='auto';b.onclick=()=>paint(i)})}}}
'''
i=s.index("async function cover(){");s=s[:i]+DUO+s[i:]
# 2. comment ça marche : début
cut("async function marche(){"," // un premier essai, pour de vrai",r'''async function marche(){step();head('Préambule','Comment ça marche');
 const D=duo(`<div class="nvb"><p class="bigy" id="h330">0 h 00</p><p class="sub">3 h de formation et 30 minutes d'évaluation.</p></div>`,[
  ['La partie théorique',"3 h de formation et 30 minutes d'évaluation."],
  ["Dix étapes, dans l'ordre","On ne passe à la suivante qu'après avoir terminé la précédente."],
  ['Deux voix','Deux collègues qui échangent.'],
  ['La main','Elle vous montre où cliquer.'],
  ["Des questions d'entraînement",'Au moins la moitié de bonnes réponses. Sinon, on revoit la partie, puis une nouvelle série. Chaque réponse est expliquée.'],
  ['Le journal',"Il note chaque décision de la matinée, avec l'heure."]]);
 await sayS('p04',[at('p04',.02,()=>{D.paint(0);countTo('#h330',210,2600,v=>{const m=Math.round(v);return `${Math.floor(m/60)} h ${String(m%60).padStart(2,'0')}`})}),
  W('p04','Elle se fait',()=>D.paint(1)),W('p04','Et vous nous',()=>D.paint(2))]);
 D.paint(3);
 await sayS('p05',[W('p05','Entre les étapes',()=>D.paint(4)),W('p05','Un journal',()=>D.paint(5))]);
 D.end();await contV();
''')
# fin de l'écran : le téléphone et l'évaluation finale
cut(" vue(`<div class=\"hero\">${bigIc('phone')}<p class=\"huge tel\">01 49 19 81 79</p>"," await contV();return null}\n// un repère",r''' vue(`<div class="duoS"><div class="dl"><div class="nvb"><p class="bigy tel">01 49 19 81 79</p><p class="sub">Si quelque chose bloque, l'équipe de REM Formation répond au téléphone.</p></div></div><div class="dr"><div class="cdn it" id="evf"><p class="t">L'évaluation finale</p><p class="s">En ligne, sur votre espace stagiaire, à la fin du parcours.</p></div></div></div>`);
 await sayS('p06',[W('p06',"L'évaluation",()=>show('#evf'))]);show('#evf');
''')
# 3. le permis de conduire : bloc marine à gauche
cut('<div class="lic it" id="e0">','<ul class="conds">','<div class="nvb it" id="e0"><p class="bigy">Permis de conduire</p><p class="sub it" id="e00">Un prérequis, pas une option.</p></div>\n  <div>')
cut("vue(`<div class=\"hero\"><div class=\"sq21\">","`)),\n  W('p09','Il faut au moins'","vue(`<div class=\"duoS\"><div class=\"dl\"><div class=\"cardw\"><div class=\"sq21\">${[...Array(21)].map(()=>'<i></i>').join('')}</div></div></div><div class=\"dr\"><div class=\"cdy\"><p class=\"t\">L'évaluation finale : 21 questions</p><p class=\"s it\" id=\"e5\">80 % de bonnes réponses au minimum pour obtenir l'attestation.</p></div></div></div>")
# 7. les objectifs
cut("async function objectifs(){","/* 8. le plan de la matinée",r'''async function objectifs(){step();head('Préambule','Les objectifs de la formation');
 const FINS=['Vous savez vous repérer sur Roissy.','Vous avez perçu les situations qui créent le risque.','Vous avez les réflexes pour vous protéger et protéger les autres.','Et vous savez mettre en œuvre des pratiques de sécurité.'];
 vue(`<div class="duoS"><div class="dl cl2"><p class="colh">4 objectifs pour cette matinée</p>${OBJ.map((o,i)=>`<div class="gi" id="ob${i}"><b>${i+1}</b><div><p class="t">${nb(o[0])}</p><p class="s">${nb(o[1])}</p></div></div>`).join('')}</div>
  <div class="dr cl2"><p class="colh">À la fin de la formation</p>${FINS.map((t,i)=>`<div class="gi ck" id="k${i+1}"><b>${CHECK}</b><div><p class="t">${nb(t)}</p></div></div>`).join('')}</div></div>`);
 await sayS('p14',OBJ.map((o,i)=>W('p14',o[2],()=>on('#ob'+i,'on'))));OBJ.forEach((o,i)=>on('#ob'+i,'on'));
 await sayS('p15',[W('p15','vous savez',()=>on('#k1','on')),W('p15','Vous avez perçu',()=>on('#k2','on')),W('p15','Et vous avez',()=>on('#k3','on'))]);
 ['#k1','#k2','#k3','#k4'].forEach(k=>on(k,'on'));await contV();return null}

''')
# 9. Roissy : le chiffre à gauche, les particularités à droite
cut(" vue(`<div class=\"hero\"><p class=\"cap capw\">Chaque aéroport a ses particularités</p>"," const vv=$('#vv'),vid=$('#vid');",r''' VZ.classList.remove('clear');
 const PART=['Ses contraintes géographiques','Son architecture','Ses caractéristiques propres','À 25 kilomètres au nord de Paris'];
 vue(`<div class="duoS"><div class="dl"><div class="nvb"><p class="bigy" id="mp" style="visibility:hidden">0,0</p><p class="sub" id="mps">Chaque aéroport a ses particularités.</p></div></div>
  <div class="dr cl2"><p class="colh">Chaque aéroport a ses particularités</p>${PART.map((t,i)=>`<div class="gi" id="r${i+1}"><b>${i+1}</b><div><p class="t">${nb(t)}</p></div></div>`).join('')}</div></div>`);
 const chiffre=()=>{const m=$c('#mp');if(!m||m.style.visibility!=='hidden')return;m.style.visibility='';$c('#mps').textContent='Millions de passagers en 2019.';countTo('#mp',76.2,2400,v=>v.toFixed(1).replace('.',','))};
 const suite=()=>{const e=$c('#mps');if(e)e.innerHTML=nb('Millions de passagers en 2019. Le premier aéroport de France. Et 72,0 millions en 2025.')};
 await sayS('i02',[W('i02','ses contraintes',()=>on('#r1','on')),W('i02','son architecture',()=>on('#r2','on')),W('i02','ses caractéristiques',()=>on('#r3','on')),
  W('i02','Roissy-Charles',()=>on('#r4','on')),W('i02','Il a accueilli',chiffre),W('i02',"C'est le premier",suite),W('i02','La vidéo',()=>{})]);
 ['#r1','#r2','#r3','#r4'].forEach(k=>on(k,'on'));chiffre();suite();
''')
# 12. un mot sur l'avenir : pastilles
cut("async function terminal4(){","/* 13. les pistes",r'''async function terminal4(){step();head('Introduction',"Un mot sur l'avenir");
 const D=duo(`<div class="nvb"><p class="bigy">Roissy-CDG</p></div>`,[
  ['Un projet de transformation de la plateforme',"Le Groupe ADP s'y engage. Ce projet favorise la transition écologique."],
  ["11 février 2021 : un nouveau projet d'aménagement","Demandé par le Gouvernement au Groupe ADP après l'arrêt du projet de Terminal 4. Cette demande est l'une des conséquences de la crise du Covid-19."],
  ['Pour vous','Un chantier modifie les cheminements, donc les habitudes.']]);
 await sayS('i09',[at('i09',.02,()=>D.paint(0)),W('i09','Le onze',()=>D.paint(1)),W('i09','Ce qui compte',()=>D.paint(2))]);
 D.end();await contV();return null}

''')
# fin : le permis à gauche, le journal à droite
cut(" vue(`<div class=\"hero\"><div class=\"pmini\" id=\"pmn\"><b>T</b>${ET.map((e,i)=>`<i>${i+1}</i>`).join('')}</div>\n  <p class=\"cap\" id=\"fc1\""," cur().classList.add('vb');\n await sayS('p17'",r''' vue(`<div class="fin2"><div class="pc"><div class="ph1"><span class="T">T</span><p id="fc1">Première case à cocher :<br>la réglementation</p></div><div class="cs" id="pmn">${ET.map((e,i)=>`<i>${i+1}</i>`).join('')}</div></div>
  <div class="jcard" id="jr"><p class="lb">Votre journal</p><p class="tx" style="font-size:var(--B)">${nb("Les heures sont celles de l'histoire, pas la durée de la formation.")}<span class="lgx">${nb(" Pour relire le journal à tout moment : « Journal », en bas de l'écran.")}</span></p><ul class="jl">${jhtml(false)}</ul></div></div>`);
''')
open(P,'w',encoding='utf-8').write(s)
