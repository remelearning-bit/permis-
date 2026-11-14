/* ---------------- Étape 8 · L'aire de manœuvre (diapos 226 à 232) ----------------
   Voix m01 à m16 existantes. Scène 3D du croisement (t5.js, lieu « man »), deux films du support (diapos 229 et 231),
   photos du support. Questions : seuil de 50 %, seconde série après un échec. */
const H8='Étape 8 · L\'aire de manœuvre';const H5=H8;
const HH=t=>t.replace(/ /g,' ');
Object.assign(IC,{check2:'<svg class="ic" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="6"/><path d="M16 24l6 6 11-12"/></svg>'});
var CAPS={c8:'Photo du support REM Formation'};

async function infoS(d){step();if(d.head)head(H8+(d.tm?' · '+HH(d.tm):''),d.head);await goPh(d.ph,{mode:'contain'},500);
 const L=label([0,0,0],{lead:false}).title(d.cap);
 for(const id of d.lines){if(LINES[id].w==='X'){await sayS(id,[at(id,.02,()=>L.card(`« ${LINES[id].t} »`,'Xavier',{a:null}))]);continue}
  await info(L,id,(d.cards||[]).filter(c=>c[0]===id).map(c=>[c[1],c[2],c[3]||'',{a:null}]))}
 await cont(L);L.kill();return null}
const S=(ph,cap,lines,cards,head,o={})=>()=>infoS({ph,cap,lines,cards,head,...o});

/* 1. la couverture */
async function cover(){step();{const _p=photo('c8',FAST?10:900);setCam({zoom:1.08});await _p;await wait(350)}
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 8 · 7 h 30').card('L\'aire de manœuvre','Elle vous est interdite.');
 await cont(L,"C'est parti");try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}
 await sayS('m01',[at('m01',.4,()=>L.card('Pistes : permis P. Voies avion : permis M, R et P','Le permis T s\'arrête à la ligne de sécurité.'))]);
 await sayS('m02',[at('m02',.02,()=>L.card('« Et si je la franchis sans le vouloir ? »','Xavier'))]);
 await sayS('m03',[at('m03',.02,()=>L.card('C\'est une incursion','Vous allez voir où passe la ligne.'))]);
 await cont(L,'Voir la frontière');L.kill();return null}

/* 3. un film du support, en plein écran ; on continue quand il est fini */
async function film(src,poster,title,credit,tm){step();head(H8+' · '+HH(tm),title);
 vue(`<div class="filmw"><video id="fv" src="../video/${src}.mp4" poster="../video/${poster}.jpg" controls playsinline preload="auto"></video><p class="cr">${nb(credit)}</p></div>`);
 const v=$c('#fv');try{await v.play()}catch(e){}
 if(!FAST)await new Promise(r=>{v.onended=r;if(Q.has('pass'))setTimeout(r,2500)});
 jlog(tm,'Film : '+title);await contV();return null}
const servitudes=()=>film('film-servitudes','film-servitudes','Le film : les servitudes de la voie avion','Film du support de formation','7 h 34');
const balisage=()=>film('film-balisage','film-balisage','Voie avion ou cheminement véhicule ?','Film du support de formation','7 h 37');

/* 4 à 6. les écrans sur photo */
const prevenir=S('zoneint','Prévenir les incursions',['m11'],[['m11','La zone est','Sur piste et sur voie de circulation avion','Interdite au permis T. Les pistes sont réservées au permis P, les voies de circulation avion aux permis M, R et P.'],['m11','En cas de doute','En cas de doute','Le numéro en bas à gauche de votre permis : le centre opérationnel côté piste, 01 48 16 47 55.']],'Prévenir les incursions',{tm:'7 h 35'});
const ligne=S('ligne8','Rappel : la ligne de sécurité',['m12'],[['m12',.05,'Une ligne blanche continue','Derrière les postes de stationnement avion.'],['m12',.45,'Elle sépare deux zones','L\'aire de trafic et l\'aire de manœuvre. Avec un permis T, on ne la franchit pas.']],'La ligne de sécurité',{tm:'7 h 35'});
const bandes=S('stopadp','Les bandes dégagées d\'obstacles',['m13'],[['m13',.03,'Les bandes aéronautiques','Ou bandes dégagées d\'obstacles, de part et d\'autre de la voie de circulation avion.'],['m13',.3,'Le stop routier','Sur la route de service : un repère visuel pour savoir si votre véhicule est hors de la bande.'],['m13',.7,'Après le stop','Tout ce qui s\'y trouve est dans la bande, et constitue un obstacle.']],'Les bandes dégagées d\'obstacles',{tm:'7 h 36'});

/* 7. les questions d'entraînement (diapo 232) */
async function questions(){step();head(H8+' · '+HH('7 h 38'),"Questions d'entraînement");ALT.q8=1;const two=(TRY.q8||0)%2;
 const Q=two?[{bk:[1,5],fixed:1,q:"Vous êtes arrêté sur la route de service, après le stop routier. Pour l'avion qui roule sur la voie :",o:[["Je suis un obstacle : je suis dans la bande dégagée d'obstacles.",1,"Après le stop, tout ce qui se trouve dans la bande est un obstacle. On s'arrête avant le stop."],["Je ne gêne pas, je suis sur la route de service.",0,"Si : après le stop, la route de service est dans la bande dégagée d'obstacles. Vous êtes un obstacle."]]},
   {bk:[1,4],fixed:1,q:"La ligne de sécurité sépare :",o:[["Deux postes de stationnement avion.",0,"Non : elle sépare l'aire de trafic de l'aire de manœuvre."],["L'aire de trafic de l'aire de manœuvre.",1,"Une ligne blanche continue, derrière les postes. Avec un permis T, on ne la franchit pas."],["Le cheminement véhicule du cheminement piéton.",0,"Non : elle sépare l'aire de trafic de l'aire de manœuvre."]]}]
  :[{line:'m14',bk:[1,5],fixed:1,ph:'q8a380',q:"Le véhicule jaune arrêté sur le cheminement véhicule constitue-t-il un obstacle pour cet A380 ?",o:[["Non.",0,"Si : il est dans la bande dégagée d'obstacles de la voie. Pour l'avion, c'est un obstacle."],["Oui.",1,"Arrêté après le stop, dans la bande dégagée d'obstacles : c'est un obstacle pour l'avion."]]},
   {line:'m15',bk:[5],fixed:1,q:"À quoi servent les bandes aéronautiques, ou bandes de voie de circulation avion ?",o:[["Elles sont destinées à assurer la protection d'un aéronef contre les obstacles.",1,"La bande dégagée d'obstacles protège l'aéronef qui roule."],["Elles permettent de mesurer la distance entre un point de stationnement avion et une piste.",0,"Non : elles ne mesurent rien, elles protègent l'avion des obstacles."],["Elles permettent d'assurer la livraison du catering à bord des avions.",0,"Rien à voir : les bandes aéronautiques protègent l'aéronef contre les obstacles."]]}];
 return quiz('q8',Q,'7 h 38',"Questions d'entraînement",[1],7,true)}
async function quiz(id,Q,h,what,bk,ret,x){let E=0;const MISS=new Set();
 for(let i=0;i<Q.length;i++){const z=Q[i];
  vue(z.ph?`<div class="qimg"><figure class="fig"><img src="${IMG[z.ph]}" alt=""></figure><div class="qc" id="qq"><p class="n">Question ${i+1} sur ${Q.length}</p><p class="q">${nb(z.q)}</p></div></div>`:`<div class="qc" id="qq" style="width:min(760px,100%)"><p class="n">Question ${i+1} sur ${Q.length}</p><p class="q">${nb(z.q)}</p></div>`);
  if(z.line)await sayS(z.line);else await wait(FAST?0:400);
  const qc=$c('#qq');let o=z.o.map((y,k)=>[String(k),y[0]]);if(!z.fixed)for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
  const gk=String(z.o.findIndex(y=>y[1]));const kot={};z.o.forEach((y,k)=>{if(!y[1]&&y[2])kot[k]=y[2]});
  const e=await pick(null,o,gk,z.o[+gk][2],kot,i<Q.length-1?'Question suivante':'Terminer',{once:true,x:!!x,host:qc});E+=e;if(e)[].concat(z.bk||bk).forEach(k=>MISS.add(k))}
 jlog(h,`${what} : ${Q.length} question${Q.length>1?"s":""}${errTxt(E)}`);return gate(id,E,Q.length,[...MISS].sort((a,b)=>a-b),what,ret)}

/* 8. fin de l'étape */
async function fin(){step();head('Étape 8 terminée · 7 h 40','Huitième case cochée');
 vue(`<div class="hero nph"><p class="cap">Vous savez où vous arrêter</p><p class="sub">Avant le stop routier, jamais après. La ligne de sécurité ne se franchit pas.</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de l'étape</p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('m16');
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Étape 9 · Les procédures d'urgence</a>`}
const NEXT='etape9.html';
document.head.insertAdjacentHTML('beforeend',`<style>
.filmw{width:100%;max-width:1100px;display:flex;flex-direction:column;align-items:center;gap:8px;padding-bottom:64px}
.filmw video{width:100%;max-height:68vh;border-radius:14px;background:#1d2329;box-shadow:0 8px 28px rgba(38,60,82,.18)}
.filmw .cr{margin:0;font-size:14px;color:#5d6f80}
.qimg{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(20px,3vw,48px);align-items:center;width:100%;max-width:1220px}
.qimg .fig{margin:0;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(38,60,82,.16);background:#fff}
.qimg .fig img{display:block;width:100%}
@media (max-width:700px){.qimg{grid-template-columns:1fr;gap:12px}.qimg .fig img{max-height:22vh;width:auto;max-width:100%;margin:0 auto}}
</style>`);
runSeq([['Couverture',cover],['La frontière, en trois dimensions',()=>{const c=document.getElementById('cap');if(c)c.classList.remove('on');return traversee('man')}],['Le film : les servitudes',servitudes],['Prévenir les incursions',prevenir],
 ['Rappel : la ligne de sécurité',ligne],['Les bandes dégagées d\'obstacles',bandes],['Voie avion ou cheminement véhicule ?',balisage],["Questions d'entraînement",questions],['Fin de l\'étape 8',fin]]);
