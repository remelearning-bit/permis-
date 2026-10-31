/* ---------------- Étape 9 · Les procédures d'urgence (diapos 233 à 248) ----------------
   Voix u01 à u23 existantes. La panne sur la voie avion se vit en 3D (panne.html, voix u06 et u07). Film du support (diapo 242).
   Photos du support. Questions : seuil de 50 %, seconde série après un échec. */
const H9='Étape 9 · Les procédures d\'urgence';
const HH=t=>t.replace(/ /g,' ');
Object.assign(IC,{check2:'<svg class="ic" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="6"/><path d="M16 24l6 6 11-12"/></svg>'});
var CAPS={c9:'Image du parcours REM Formation',uld:'Le bac de récupération des objets intrus Air France',fodbin:'Le bac de récupération de l\'huile de frein des aéronefs'};

async function infoS(d){step();if(d.head)head(H9+(d.tm?' · '+HH(d.tm):''),d.head);await photo(d.ph,FAST?10:500);setCam({mode:'contain'});await vzOff();
 const L=label([0,0,0],{lead:false}).title(d.cap);
 for(const id of d.lines){if(LINES[id].w==='X'){await sayS(id,[at(id,.02,()=>L.card(`« ${LINES[id].t} »`,'Xavier',{a:null}))]);continue}
  await info(L,id,(d.cards||[]).filter(c=>c[0]===id).map(c=>[c[1],c[2],c[3]||'',{a:null}]))}
 await cont(L);L.kill();return null}
const S=(ph,cap,lines,cards,head,o={})=>()=>infoS({ph,cap,lines,cards,head,...o});

/* 1. la couverture */
async function cover(){step();await photo('c9',FAST?10:1200);setCam({zoom:1.08});
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 9 · 7 h 40').card('Les procédures d\'urgence','Collision, panne, incendie, objets intrus, drones, conducteur perdu.');
 await cont(L,"C'est parti");try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}
 await sayS('u01',[at('u01',.35,()=>L.card('Ce qui peut arriver','Une collision, une panne sur la voie avion, un incendie, un blessé. Les objets intrus, les drones. Un conducteur perdu.'))]);
 await sayS('u02',[at('u02',.02,()=>L.card('« Qui j\'appelle, en premier ? »','Xavier'))]);
 await sayS('u03',[at('u03',.02,()=>L.card('C\'est toute la question','Vous saurez répondre à la fin.'))]);
 await cont(L,'Commencer');L.kill();return null}

/* 2. la collision (diapo 235) */
const collision=S('csa','La collision',['u04','u05'],[['u04',.05,'Véhicule contre véhicule','Le code de la route s\'applique intégralement.'],['u04',.3,'Véhicule contre avion','Le plus souvent par inattention et non-respect des procédures, sur les postes, à l\'arrêt. En mouvement, les dommages sont bien plus lourds.'],
 ['u04',.8,'Votre témoignage peut être déterminant','Témoin d\'une collision : vous vous faites connaître immédiatement auprès des services de l\'État.'],
 ['u05',.05,'Collision avec un avion','Avertir le centre opérationnel côté piste, 01 48 16 47 55, le numéro en bas à gauche du permis. Position exacte, claire et précise.'],['u05',.5,'Il prévient','Les contrôleurs, la gendarmerie des transports aériens, les pompiers si besoin.'],
 ['u05',.75,'Et vous','Vous prévenez votre agent de maîtrise, et vous remplissez la notification d\'accident ou d\'incident, quatre volets, ou le Safety Portal.']],'La collision',{tm:'7 h 41'});

/* 3. en panne sur la voie avion (diapo 236) : la démonstration en 3D, vécue à la première personne */
async function panne(){step();head(H9+' · '+HH('7 h 42'),'En panne sur la voie avion');await vzOff();
 const f=document.createElement('iframe');f.src='panne.html';f.id='pf';f.allow='autoplay';document.body.appendChild(f);
 await new Promise(r=>{const h=e=>{if(e.data==='panne-fin'){removeEventListener('message',h);r()}};addEventListener('message',h)});
 f.remove();jlog('7 h 42','Panne sur la voie avion : prévenir, feux de détresse, sortir et croiser les bras');
 vue(`<div class="hero">${bigIc('warn')}<p class="cap">En panne sur la voie avion</p><div class="p9">
  <p><b>Avertir</b> le centre opérationnel côté piste, position exacte : il fait stopper les avions dans la zone.</p>
  <p><b>Rester sur place</b> si on ne peut pas pousser le véhicule hors des bandes aéronautiques : on attend le dépannage ou le Flyco, feux de détresse allumés.</p>
  <p><b>Si un avion arrive</b> : sortir du véhicule avec ses équipements, et croiser les bras en direction du pilote.</p></div></div>`);
 await contV();return null}

/* 4. l'incendie (diapos 237, 238) ; avitaillement : d'abord l'arrêt d'urgence, puis le 18 (décision de Cat, 28/10) */
const incendie=S('incendie','En cas d\'incendie',['u08','u09'],[['u08',.1,'Protéger','Évacuer la zone : le périmètre de sécurité incendie, trois mètres.'],['u08',.4,'Alerter','Les pompiers au 18. Le centre opérationnel côté piste au 01 48 16 47 55.'],['u08',.75,'Secourir','Les extincteurs, si vous avez suivi une formation incendie.'],
 ['u09',.05,'Pendant un avitaillement','D\'abord l\'arrêt d\'urgence : actionner l\'arrêt hydrant, ou tirer sur le câble équipotentiel, selon le cas. Puis les pompiers au 18, en donnant le point avion. L\'extincteur, seulement si vous êtes formé.']],'L\'incendie',{tm:'7 h 44'});

/* 5. les objets intrus (diapos 239 à 244) */
const fod=S('fodpiste','Les objets intrus',['u10'],[['u10',.05,'Un objet intrus, un FOD','Un objet inanimé sur l\'aire de mouvement, sans fonction opérationnelle ou aéronautique, qui peut constituer un danger pour l\'exploitation des aéronefs.'],
 ['u10',.45,'Aéronautiques','Écrous, boulons, bouchons de réservoir, fragments de train ou de pneu, jauge à huile, feuille de métal.'],['u10',.72,'Non aéronautiques','Outils, fournitures de restauration, badges, stylos, étiquettes bagages, plastique, bois, béton, caoutchouc des joints.']],'Les objets intrus',{tm:'7 h 45'});
const responsable=S('uld','Le responsable d\'un objet intrus',['u11'],[['u11',.03,'Celui qui le génère, et celui qui ne le ramasse pas',''],['u11',.38,'1 · Vérifier','L\'absence de débris sur son véhicule.'],['u11',.55,'2 · Ramasser','Tous les objets et déchets rencontrés.'],['u11',.7,'3 · Jeter','Dans les poubelles dédiées.'],['u11',.85,'4 · Arrimer','Ne jamais laisser de conteneur non arrimé au sol.']],'Les objets intrus',{tm:'7 h 46'});
const concorde=S('concorde','Ce que coûte un objet intrus',['u12'],[['u12',.1,'Gonesse, 25 juillet 2000','Au décollage, le Concorde roule sur une lamelle métallique perdue par un DC-10 de Continental Airlines. Il s\'écrase une minute vingt plus tard.'],['u12',.7,'113 morts','109 à bord, 4 au sol.']],'Les objets intrus',{tm:'7 h 46'});
async function film(src,title,credit,tm){step();head(H9+' · '+HH(tm),title);
 vue(`<div class="filmw"><video id="fv" src="../video/${src}.mp4" poster="../video/${src}.jpg" controls playsinline preload="auto"></video><p class="cr">${nb(credit)}</p></div>`);
 const v=$c('#fv');try{await v.play()}catch(e){}
 if(!FAST)await new Promise(r=>{v.onended=r;if(Q.has('pass'))setTimeout(r,2500)});
 jlog(tm,'Film : '+title);await contV();return null}
const filmFod=()=>film('film-objets-intrus','Le film : les objets intrus','Film du support de formation','7 h 47');
const nettoyer=S('fodbin','Nettoyer lorsque vous partez',['u13'],[['u13',.05,'Chaque intervenant est responsable de ses déchets','« Clean as you go » : on nettoie sa zone de travail avant de partir.'],['u13',.25,'Deux bacs de récupération','L\'un pour l\'huile de frein des aéronefs, l\'autre pour les objets intrus Air France.'],['u13',.4,'Si on ne peut pas le ramasser','Une bâche, un épandage : on fait remonter l\'information, position exacte et type d\'objet.'],['u13',.8,'On alerte','Le centre opérationnel côté piste, ou les pompiers de l\'aéroport.']],'Les objets intrus',{tm:'7 h 48'});
const poste=S('poste9','Sur le poste avion',['u14','u15'],[['u14',.05,'Je range','Tout le matériel d\'entretien ou de maintenance retourne dans ses rangements.'],['u14',.25,'Je compte mes outils','Pour être sûr de n\'avoir rien oublié.'],['u14',.45,'J\'inspecte ma zone','Et mes objets personnels : un gant posé sur la charlatte.'],['u14',.65,'Je vérifie mon matériel','Un crochet qui ne tient pas sur le chariot devient un projectile à la mise en route des moteurs.'],
 ['u15',.1,'Le permis T vaut formation','Un permis T valide, ou une attestation de formation piéton, vaut attestation de réussite à la formation sur les objets intrus, consigne n°11.']],'Les objets intrus',{tm:'7 h 49'});

/* 6. les drones (diapo 245) */
const drones=S('drone','Les drones',['u16','u17'],[['u16',.05,'Un appareil sans pilote à bord','Piloté à distance, avec plus ou moins d\'autonomie.'],['u16',.35,'Si vous en voyez un','Notez l\'heure de début et de fin du vol, le sens du vol, les couleurs.'],['u16',.7,'Drone en visuel','Signalement immédiat au centre opérationnel côté piste, puis notification sur le Safety Portal.'],
 ['u17',.05,'Une menace qui monte','Au Royaume-Uni, environ 330 collisions évitées de justesse entre drones et avions en 8 ans, près de 130 en 2018.'],['u17',.7,'Un vol de drone sur Roissy','Se demande à la direction de l\'aéroport, au moins 35 jours avant.']],'Les drones',{tm:'7 h 50'});

/* 7. conducteur perdu, et les numéros (diapos 246, 247) */
const perdu=S('numeros','Conducteur perdu, et les numéros',['u18','u19'],[['u18',.05,'Perdu ou incertain de sa position','J\'appelle ma régulation ou mon agent de maîtrise, avec les indices autour de moi : numéros de bâtiments, de postes avion. La plupart des véhicules sont géolocalisés.'],['u18',.8,'Ou','Le centre opérationnel côté piste, le numéro du permis.'],
 ['u19',.05,'Pompiers','18 ou 112.'],['u19',.2,'Urgences médicales','15 ou 112.'],['u19',.4,'Gendarmerie des transports aériens','01 48 62 17 00.'],['u19',.65,'Centre opérationnel côté piste','01 48 16 47 55, ou la fréquence 71,675.']],'Les numéros',{tm:'7 h 51'});

/* 8. à vous : qui j'appelle ? */
const QUI=[['p','Les pompiers, 18','bell'],['s','Les urgences médicales, 15','warn'],['a','Le centre opérationnel côté piste','phone'],['r','Ma régulation','voices']];
const QA1=[{t:"Un départ de feu sur un poste avion.",b:"p",ok:"Le 18, en donnant le point avion."},
 {t:"Mon véhicule a touché un avion au poste.",b:"a",ok:"Il prévient les contrôleurs, la gendarmerie, les pompiers si besoin."},
 {t:"Mon véhicule tombe en panne dans la bande d'une voie avion.",b:"a",ok:"Position exacte : il fait stopper les avions dans la zone."},
 {t:"Un collègue est blessé.",b:"s",ok:"Les urgences médicales, 15 ou 112."},
 {t:"Une bâche s'est envolée sur une voie avion, impossible à ramasser.",b:"a|p",ok:"Position exacte et type d'objet, pour organiser le nettoyage."},
 {t:"Je vois un drone au-dessus de la plateforme.",b:"a",ok:"Signalement immédiat, puis notification sur le Safety Portal."},
 {t:"Je ne sais plus où je suis.",b:"r|a",ok:"Ma régulation ou mon agent de maîtrise, avec les indices autour de moi. Ou le centre opérationnel côté piste, au 01 48 16 47 55."}];
const QA2=[{t:"De la fumée sort d'un engin garé près de l'avion.",b:"p",ok:"Un feu : les pompiers au 18."},
 {t:"Un collègue est blessé sur le poste avion.",b:"s",ok:"Les urgences médicales, 15 ou 112."},
 {t:"J'ai heurté l'aile d'un avion en manœuvrant.",b:"a",ok:"Collision avec un avion : le centre opérationnel côté piste."},
 {t:"Mon véhicule ne redémarre plus, dans la bande d'une voie avion.",b:"a",ok:"Panne dans la bande : il fait stopper les avions."},
 {t:"Je ne reconnais plus les bâtiments autour de moi.",b:"r|a",ok:"Perdu : ma régulation ou mon agent de maîtrise, ou le centre opérationnel côté piste."},
 {t:"Un drone survole les postes avion.",b:"a",ok:"Signalement immédiat au centre opérationnel côté piste."},
 {t:"Un épandage d'huile sur le cheminement, impossible à ramasser.",b:"a|p",ok:"Position exacte et type d'objet, pour qu'un nettoyage soit organisé."}];
async function qui(){step();head(H9+' · '+HH('7 h 52'),'Qui j\'appelle d\'abord ? Cliquez sur la bonne colonne');
 vue(`<div class="hero">${bigIc('phone')}<p class="cap">${nb("Dans cette situation, j'appelle d'abord :")}</p><p class="sub">Cliquez sur la bonne colonne.</p></div>`);
 await sayS('u20');
 const E=await sortV(alt('qui',QA1,QA2),QUI,{label:'Situation',id:'qui'});
 jlog('7 h 52',`Qui j'appelle : 7 situations${errTxt(E)}`);return gate('qui',E,7,[1,2,3,8,10,11],"Qui j'appelle",12)}

/* 9. les questions d'entraînement (diapo 248) */
async function questions(){step();head(H9+' · '+HH('7 h 53'),"Questions d'entraînement");ALT.q9=1;const two=(TRY.q9||0)%2;
 const Q=two?[{bk:[4,5],fixed:1,q:"Un écrou trouvé par terre sur le poste avion, c'est :",o:[["Un objet intrus aéronautique : je le ramasse et je le jette dans une poubelle dédiée.",1,"Écrous et boulons sont des objets intrus aéronautiques. Celui qui ne le ramasse pas en est aussi responsable."],["Rien de grave, il n'a aucune fonction.",0,"Justement : sans fonction et sur l'aire de mouvement, c'est un objet intrus, un danger pour l'avion."],["L'affaire du mécanicien de l'avion.",0,"Le responsable, c'est autant celui qui le génère que celui qui ne le ramasse pas."]]},
   {bk:[2],fixed:1,q:"En panne dans la bande d'une voie avion, un avion arrive malgré tout. Vous :",o:[["Restez au volant, feux de détresse allumés.",0,"Non : vous sortez du véhicule, avec vos équipements, et vous croisez les bras en direction du pilote."],["Poussez le véhicule hors de la bande, quoi qu'il arrive.",0,"Si vous ne pouvez pas le pousser, vous restez sur place ; si un avion arrive, vous sortez et croisez les bras."],["Sortez du véhicule avec vos équipements et croisez les bras en direction du pilote.",1,"C'est le signal qui dit au pilote que vous êtes là."]]}]
  :[{line:'u21',bk:[4],fixed:1,q:"Qu'est-ce qu'un objet intrus, un FOD ?",o:[["C'est un débris ou un objet étranger présent sur l'aire de mouvement.",1,"Sans fonction aéronautique, et qui peut causer un dommage."],["Un véhicule non identifié sur l'aire de mouvement.",0,"Non : un objet intrus est un objet ou un débris, pas un véhicule."]]},
   {line:'u22',bk:[2],fixed:1,q:"En cas de panne de votre véhicule dans les bandes aéronautiques de voie de circulation avion, vous devez :",o:[["Abandonner le véhicule sur place.",0,"Jamais : on reste sur place, feux de détresse allumés, après avoir prévenu."],["Prévenir le centre opérationnel côté piste et rester auprès du véhicule.",1,"Position exacte, puis on attend le dépannage ou le Flyco."],["Réparer sur place.",0,"Non : on prévient, on reste, et on attend le dépannage."]]}];
 return quiz('q9',Q,'7 h 53',"Questions d'entraînement",[1],13,true)}
async function quiz(id,Q,h,what,bk,ret,x){let E=0;const MISS=new Set();
 for(let i=0;i<Q.length;i++){const z=Q[i];
  vue(`<div class="qc" id="qq" style="width:min(760px,100%)"><p class="n">Question ${i+1} sur ${Q.length}</p><p class="q">${nb(z.q)}</p></div>`);
  if(z.line)await sayS(z.line);else await wait(FAST?0:400);
  const qc=$c('#qq');let o=z.o.map((y,k)=>[String(k),y[0]]);if(!z.fixed)for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
  const gk=String(z.o.findIndex(y=>y[1]));const kot={};z.o.forEach((y,k)=>{if(!y[1]&&y[2])kot[k]=y[2]});
  const e=await pick(null,o,gk,z.o[+gk][2],kot,i<Q.length-1?'Question suivante':'Terminer',{once:true,x:!!x,host:qc});E+=e;if(e)[].concat(z.bk||bk).forEach(k=>MISS.add(k))}
 jlog(h,`${what} : ${Q.length} question${Q.length>1?"s":""}${errTxt(E)}`);return gate(id,E,Q.length,[...MISS].sort((a,b)=>a-b),what,ret)}

/* 10. fin de l'étape */
async function fin(){step();head('Étape 9 terminée · 7 h 55','Neuvième case cochée');
 vue(`<div class="hero">${bigIc('phone')}<p class="cap">Vous savez qui appeler</p><p class="sub">Le centre opérationnel côté piste : 01 48 16 47 55, le numéro en bas à gauche du permis.</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de l'étape</p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('u23');
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Étape 10 · L'amélioration continue</a>`}
const NEXT='etape10.html';
document.head.insertAdjacentHTML('beforeend',`<style>
#pf{position:fixed;left:0;right:0;top:0;bottom:calc(46px + env(safe-area-inset-bottom));width:100%;height:calc(100% - 46px - env(safe-area-inset-bottom));border:0;z-index:5;background:#e8ebed}
.p9{display:flex;flex-direction:column;gap:10px;max-width:760px;text-align:left}.p9 p{margin:0;background:#fff;border-radius:12px;padding:12px 16px;font-size:clamp(16px,1.4vw,20px);color:#3d4d5c;box-shadow:0 4px 16px rgba(38,60,82,.08)}.p9 b{color:var(--marine)}
.filmw{width:100%;max-width:1100px;display:flex;flex-direction:column;align-items:center;gap:8px;padding-bottom:64px}
.filmw video{width:100%;max-height:68vh;border-radius:14px;background:#1d2329;box-shadow:0 8px 28px rgba(38,60,82,.18)}
.filmw .cr{margin:0;font-size:14px;color:#5d6f80}
</style>`);
runSeq([['Couverture',cover],['La collision',collision],['En panne sur la voie avion',panne],["En cas d'incendie",incendie],['Les objets intrus',fod],["Le responsable d'un objet intrus",responsable],
 ['Ce que coûte un objet intrus',concorde],['Le film : les objets intrus',filmFod],['Nettoyer lorsque vous partez',nettoyer],['Sur le poste avion',poste],['Les drones',drones],
 ['Conducteur perdu, et les numéros',perdu],["Qui j'appelle ? À vous",qui],["Questions d'entraînement",questions],["Fin de l'étape 9",fin]]);
