/* ---------------- Étape 10 · L'amélioration continue de la sécurité (diapos 249 à 270) ----------------
   Voix s01 à s24 existantes. Film du support (diapo 259). Photos du support et images du parcours.
   Questions : seuil de 50 %, seconde série après un échec. */
const H10='Étape 10 · L\'amélioration continue';
const HH=t=>t.replace(/ /g,' ');
Object.assign(IC,{check2:'<svg class="ic" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="6"/><path d="M16 24l6 6 11-12"/></svg>'});
var CAPS={c10:'Image du parcours REM Formation'};

async function infoS(d){step();if(d.head)head(H10+(d.tm?' · '+HH(d.tm):''),d.head);
 if(d.ph){await goPh(d.ph,{mode:'contain'})}
 else{await vzOff();vue(`<div class="hero nph"><p class="cap">${nb(d.cap)}</p></div>`)}
 const L=label([0,0,0],{lead:false}).title(d.cap);
 for(const id of d.lines){const hk=d.swap&&d.swap[0]===id?[at(id,d.swap[1],()=>photo(d.swap[2],FAST?10:700))]:[];
  if(LINES[id].w==='X'){await sayS(id,[...hk,at(id,.02,()=>L.card(`« ${LINES[id].t} »`,'Xavier',{a:null}))]);continue}
  await sayS(id,[...hk,...(d.cards||[]).filter(c=>c[0]===id).map(c=>at(id,c[1],()=>L.card(c[2],c[3]||'',{a:null})))])}
 for(const m of d.more||[]){await cont(L);L.card(m[0],m[1])}
 await cont(L);L.kill();return null}
const S=(ph,cap,lines,cards,head,o={})=>()=>infoS({ph,cap,lines,cards,head,...o});

/* 1. la couverture */
async function cover(){step();{const _p=photo('c10',FAST?10:900);setCam({zoom:1.08});await _p;await wait(350)}
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 10 · 7 h 55').card('L\'amélioration continue de la sécurité','Comment on apprend de ce qui s\'est passé.');
 await cont(L,"C'est parti");try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}
 await sayS('s01',[at('s01',.3,()=>L.card('Le programme de l\'étape 10','Le système de gestion de la sécurité, les facteurs humains, les notifications.'))]);
 await sayS('s02',[at('s02',.02,()=>L.card('« Et si c\'est moi qui ai fait l\'erreur ? »','Xavier'))]);
 await sayS('s03',[at('s03',.02,()=>L.card('C\'est le sujet de l\'étape','Notifier protège, sauf manquement délibéré.'))]);
 await cont(L,'Dernière étape');L.kill();return null}

/* 2. le système de gestion de la sécurité (diapos 250 à 255) */
const sgs=S(null,'Le système de gestion de la sécurité',['s04'],[['s04',.05,'Une obligation pour être certifié','Compagnies, assistants en escale, aéroport : tous mettent en place un système de gestion de la sécurité.'],['s04',.6,'Un objectif commun','Limiter à tout prix les sources d\'incidents, avec les aéronefs, les passagers, ou les personnels de la plateforme.']],'Le système de gestion de la sécurité',{tm:'7 h 56',ic:'shield'});
/* Situations des diapos 251 (à risque) et 253 (ce qui est attendu). Retours tirés des mêmes diapos. */
const RISK1=[{t:"Un conteneur mal fixé sur le chariot.",b:"r",ok:"C'est une situation à risque."},
 {t:"Un chariot à bagages dont le frein n'a pas été enclenché.",b:"r",ok:"C'est une situation à risque."},
 {t:"Un engin pas rangé dans les emplacements réservés.",b:"r",ok:"C'est une situation à risque."},
 {t:"Un véhicule stationné sans frein de parc.",b:"r",ok:"C'est une situation à risque."},
 {t:"Des conteneurs entreposés sur les racks prévus à cet effet.",b:"c",ok:"Conteneurs : sur les emplacements prévus, racks ou chariots porte-conteneurs. Interdits au sol."},
 {t:"Des objets transportés chargés de façon à ne pas tomber.",b:"c",ok:"C'est la règle : chargés de façon à ne pas tomber pendant le transport."}];
const RISK2=[{t:"Un conteneur posé au sol, hors des racks.",b:"r",ok:"Les conteneurs sont interdits au sol : racks ou chariots porte-conteneurs."},
 {t:"Des bagages posés sans arrimage, qui peuvent tomber en route.",b:"r",ok:"Les objets transportés se chargent de façon à ne pas tomber pendant le transport."},
 {t:"Un véhicule qui entre dans la zone d'évolution contrôlée sans marquer le stop.",b:"r",ok:"Stop en entrée de zone d'évolution contrôlée."},
 {t:"Un véhicule qui laisse passer ceux qui sortent de la zone d'évolution contrôlée.",b:"c",ok:"Priorité aux véhicules en sortie de zone d'évolution contrôlée."},
 {t:"Un chariot à bagages dont le frein n'a pas été enclenché.",b:"r",ok:"C'est une situation à risque."},
 {t:"Des conteneurs entreposés sur un chariot porte-conteneurs.",b:"c",ok:"Un emplacement prévu à cet effet."}];
async function risque(){step();head(H10+' · '+HH('7 h 57'),'Situation à risque ? Cliquez sur la bonne colonne');
 vue(`<div class="hero nph"><p class="cap">${nb("Cette situation est :")}</p><p class="sub">Cliquez sur la bonne colonne.</p></div>`);
 await sayS('s05');
 const E=await sortV(alt('risk',RISK1,RISK2),[['r','À risque','warn'],['c','Correcte','check2']],{label:'Situation',id:'risk'});
 jlog('7 h 57',`Situation à risque : 6 situations${errTxt(E)}`);return gate('risk',E,6,[1],'Situation à risque',2)}
const culture=S('sgs2','Un outil de culture juste',['s06','s07'],[['s06','Je suis témoin','Je suis témoin ou impliqué : je notifie','Par la fiche de notification d\'événement.'],['s06','Ensuite','Ensuite','Une analyse, des actions correctives, un retour d\'expérience.'],
 ['s07','Quelques exemples','Vos remontées comptent','Sur Roissy : un tunnel pour la traversée du GE3, des procédures d\'avitaillement modifiées, des lignes de sécurité banalisées derrière les postes, un cédez-le-passage autour de LISA, un stop déplacé à la sortie de la route du S4.']],'Le système de gestion de la sécurité',{tm:'7 h 58',swap:['s07',.02,'remontees']});

/* 3. les facteurs humains (diapos 256 à 258) : quatre cartes à retourner */
async function facteurs(){step();await goPh('c10',{mode:'contain'},500);head(H10+' · '+HH('8 h 00'),'Les facteurs humains : cliquez sur chaque carte');
 const C=[['s09','L\'addiction','Alcool, médicaments, drogues : somnolence, manque de vigilance, agressivité. Contrôle au volant sous l\'emprise d\'alcool ou de drogue : retrait immédiat du permis T, du badge et du permis de conduire.'],
  ['s10','La fatigue','Plus d\'erreurs, plus d\'omissions, une perception dégradée, de l\'irritabilité. Le cerveau n\'est pas le même à 15 h qu\'à 3 h du matin.'],
  ['s11','Le stress','Le déséquilibre entre ce qu\'on vous demande et vos ressources. Le premier sens perdu : l\'ouïe.'],
  ['s12','Le burn-out','L\'épuisement professionnel : physique, émotionnel et mental.']];
 vue(`<div class="flw">${C.map((c,i)=>`<button class="fl" id="fl${i}"><span class="n">${nb(c[1])}</span><span class="b"><b>${nb(c[1])}</b><span>${nb(c[2])}</span></span></button>`).join('')}</div>`);
 await sayS('s08');
 const bs=[...VZ.querySelectorAll('.fl')];
 for(;;){const left=bs.filter(b=>!b.classList.contains('on'));if(!left.length)break;hand(left[0]);
  const b=await new Promise(r=>left.forEach(x=>x.onclick=()=>r(x)));hand(null);left.forEach(x=>x.onclick=null);b.classList.add('on');await sayS(C[bs.indexOf(b)][0])}
 await sayS('s13');jlog('8 h 00','Les facteurs humains : addiction, fatigue, stress, burn-out');await contV();return null}
const synthese=S(null,'Facteurs humains : la synthèse',['s14'],[['s14',.03,'Reconnaître les symptômes','Endormissement, lenteur à communiquer : faites une pause.'],['s14',.22,'Respecter les procédures','Attention aux aménagements non formels, aux raccourcis et aux détournements.'],['s14',.42,'Ne créez pas de pression excessive','Demandez de l\'assistance.'],
 ['s14',.58,'Analysez','Parlez-en à quelqu\'un, reposez-vous, faites du sport.'],['s14',.75,'Ne travaillez pas seul','Communiquez avec vos collègues.'],['s14',.88,'Remédiez aux doutes','Posez des questions, vérifiez.']],'Les facteurs humains',{tm:'8 h 01',ic:'user2'});

/* 4. les notifications (diapos 259 à 267) */
async function film(src,title,credit,tm){step();head(H10+' · '+HH(tm),title);
 vue(`<div class="filmw"><video id="fv" src="../video/${src}.mp4" poster="../video/${src}.jpg" controls playsinline preload="auto"></video><p class="cr">${nb(credit)}</p></div>`);
 const v=$c('#fv');try{await v.play()}catch(e){}
 if(!FAST)await new Promise(r=>{v.onended=r;if(Q.has('pass'))setTimeout(r,2500)});
 jlog(tm,'Film : '+title);await contV();return null}
const filmNotif=()=>film('film-notification','Le film : la notification des événements','Film du support de formation','8 h 02');
const protection=S(null,'Notifier : un régime de protection',['s15'],[['s15',.03,'Le règlement européen 376/2014 et le code des transports','Ils protègent ceux qui notifient, face à leur employeur comme à l\'État.'],['s15',.35,'Pas de mesure sur la seule notification','Aucune mesure ne peut être prise sur des informations connues uniquement par une notification.'],
 ['s15',.62,'Sauf','Manquement délibéré, méconnaissance grave d\'un risque évident, ou manquement très grave à l\'obligation d\'agir.'],['s15',.85,'7 500 €','L\'amende administrative par événement, doublée en cas de récidive.']],'Les notifications',{tm:'8 h 03',ic:'shield',more:[['Un exemple','Un agent d\'assistance en escale percute un avion avec son engin. Il alerte le coordinateur avion, puis notifie à sa hiérarchie. Son employeur ne peut pas le sanctionner pour ce choc s\'il l\'a appris par la notification.']]});
const obligation=S(null,'L\'obligation de rendre compte',['s16','s17'],[['s16',.03,'Sans délai','Le code de l\'aviation civile oblige toute personne à rendre compte de tout incident ou accident dont elle a connaissance.'],['s16','En tort','Dans les 72 heures','En tort ou sans tort : aucune sanction.'],['s16','Ne pas rendre','Ne pas rendre compte','Un an d\'emprisonnement et 15 000 € d\'amende.'],
 ['s17','Une fuite','À notifier','Fuite importante à l\'avitaillement. Point de stationnement bus ou camion dangereux. Choc contre un avion. Problème de dégivrage. Chargement incorrect. Matériel renversé par le souffle. Franchissement non autorisé de la piste.']],'Les notifications',{tm:'8 h 04',ic:'warn'});
const comment=S('fiche','Comment notifier',['s18'],[['s18',.03,'La fiche de notification d\'événement','La notification d\'accident ou d\'incident, en quatre volets.'],['s18',.4,'Ou le Safety Portal','safety-portal.fr/CDG, ouvert à tous les partenaires sur demande d\'ouverture de compte.'],['s18',.75,'L\'extranet opérationnel du Groupe ADP','Les références réglementaires de l\'aéroport, accessible à tout titulaire d\'un badge rouge.']],'Les notifications',{tm:'8 h 05',more:[['72 heures','Le délai pour notifier au service de gestion de la sécurité, à compter de la connaissance de l\'événement.'],['Le signalement volontaire','On peut notifier tout événement, même s\'il n\'est pas dans la liste réglementaire.'],['Si l\'outil est en panne','Le formulaire CRESEA, à transmettre par mail : airsidesafety.CDG@adp.fr.']]});

/* 5. les questions d'entraînement */
async function questions(){step();await goPh('c10',{mode:'contain'},500);head(H10+' · '+HH('8 h 06'),"Questions d'entraînement");ALT.q10=1;const two=(TRY.q10||0)%2;
 const Q=two?[{bk:[8],fixed:1,q:"J'ai causé un incident, sans le vouloir, et je le déclare dans les 72 heures :",o:[["Je suis sanctionné, puisque je suis en tort.",0,"Non : en tort ou sans tort, déclaré dans les 72 heures, aucune sanction."],["Aucune sanction : je suis protégé par la notification.",1,"Le code de l'aviation civile : déclaré dans les 72 heures, aucune sanction."],["Je dois attendre que quelqu'un d'autre le déclare.",0,"Non : toute personne qui en a connaissance doit rendre compte, sans délai."]]},
   {bk:[4],fixed:1,q:"Un contrôle au volant sous l'emprise d'alcool ou de drogue, c'est :",o:[["Un simple avertissement la première fois.",0,"Non : le retrait est immédiat."],["Le retrait immédiat du permis T et du badge, et du permis de conduire.",1,"Alcool ou drogue au volant : retrait immédiat du permis T et du badge, et retrait du permis de conduire."],["Le retrait du permis T seulement.",0,"Non : le badge et le permis de conduire sont aussi retirés."]]}]
  :[{line:'s19',bk:[3,7],fixed:1,q:"La culture juste pardonne les fautes intentionnelles ?",o:[["Vrai.",0,"Faux : la protection tombe en cas de manquement délibéré."],["Faux.",1,"La culture juste protège celui qui notifie une erreur, pas celui qui enfreint les règles délibérément."]]},
   {line:'s20',bk:[4,5],fixed:1,q:"La part des facteurs humains dans les événements de sécurité est :",o:[["Négligeable.",0,"Non : significative. Addiction, fatigue, stress, burn-out pèsent sur la vigilance."],["Modérée.",0,"Non : significative. Addiction, fatigue, stress, burn-out pèsent sur la vigilance."],["Significative.",1,"Addiction, fatigue, stress, burn-out : les facteurs humains pèsent lourd sur la sécurité."]]}];
 return quiz('q10',Q,'8 h 06',"Questions d'entraînement",[1],10,true)}
async function quiz(id,Q,h,what,bk,ret,x){let E=0;const MISS=new Set();
 for(let i=0;i<Q.length;i++){const z=Q[i];
  vue(`<div class="qc" id="qq" style="width:min(760px,100%)"><p class="n">Question ${i+1} sur ${Q.length}</p><p class="q">${nb(z.q)}</p></div>`);
  if(z.line)await sayS(z.line);else await wait(FAST?0:400);
  const qc=$c('#qq');let o=z.o.map((y,k)=>[String(k),y[0]]);if(!z.fixed)for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
  const gk=String(z.o.findIndex(y=>y[1]));const kot={};z.o.forEach((y,k)=>{if(!y[1]&&y[2])kot[k]=y[2]});
  const e=await pick(null,o,gk,z.o[+gk][2],kot,i<Q.length-1?'Question suivante':'Terminer',{once:true,x:!!x,host:qc});E+=e;if(e)[].concat(z.bk||bk).forEach(k=>MISS.add(k))}
 jlog(h,`${what} : ${Q.length} question${Q.length>1?"s":""}${errTxt(E)}`);return gate(id,E,Q.length,[...MISS].sort((a,b)=>a-b),what,ret)}

/* 6. pour obtenir le permis, et la fin du parcours */
const permis=S('permis10','Pour obtenir le permis',['s21'],[['s21',.05,'Au Bureau Local de Sûreté','Les attestations de formation permis T, théorique et pratique, pour obtenir le titre définitif.'],['s21',.6,'L\'Annexe 8','La demande d\'autorisation de conduite.'],['s21',.82,'L\'Annexe 7','La grille de la formation pratique.']],'Pour obtenir le permis',{tm:'8 h 08'});
async function fin(){step();head('Étape 10 terminée · 8 h 10','Dixième case cochée');
 vue(`<div class="hero nph"><p class="cap">Votre permis est complet</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de la matinée</p><ul class="jl">${jhtml(true)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('s22');await sayS('s23');await sayS('s24');
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Revoir le parcours depuis le début</a>`}
const NEXT='preambule.html';
document.head.insertAdjacentHTML('beforeend',`<style>
.filmw{width:100%;max-width:1100px;display:flex;flex-direction:column;align-items:center;gap:8px;padding-bottom:64px}
.filmw video{width:100%;max-height:68vh;border-radius:14px;background:#1d2329;box-shadow:0 8px 28px rgba(38,60,82,.18)}
.filmw .cr{margin:0;font-size:14px;color:#5d6f80}
.flw{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(10px,1.8vw,24px);width:100%;max-width:1200px}
.fl{pointer-events:auto;border:0;background:#fff;border-radius:16px;min-height:clamp(180px,34vh,320px);padding:18px;box-shadow:0 6px 22px rgba(38,60,82,.10);cursor:pointer;display:flex;align-items:center;justify-content:center;font:inherit;color:var(--marine)}
.fl .n{font-weight:800;font-size:clamp(20px,2vw,30px);color:var(--marine)}
.fl .b{display:none;flex-direction:column;gap:10px;text-align:left}.fl .b b{font-size:clamp(19px,1.7vw,26px)}.fl .b span{font-size:clamp(15px,1.25vw,18px);color:#3d4d5c;line-height:1.35}
.fl.on{cursor:default}.fl.on .n{display:none}.fl.on .b{display:flex}
@media (max-width:700px){.flw{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.fl{min-height:130px;padding:10px}.fl .n{font-size:18px}.fl .b b{font-size:16px}.fl .b span{font-size:14px;line-height:1.3}}
.hero.nph .ic{width:clamp(70px,9vw,120px);height:auto;opacity:.9}
</style>`);
runSeq([['Couverture',cover],['Le système de gestion de la sécurité',sgs],['Situation à risque ? À vous',risque],['Un outil de culture juste',culture],
 ['Les facteurs humains',facteurs],['Facteurs humains : la synthèse',synthese],['Le film : la notification',filmNotif],['Notifier : un régime de protection',protection],
 ["L'obligation de rendre compte",obligation],['Comment notifier',comment],["Questions d'entraînement",questions],['Pour obtenir le permis',permis],['Fin du parcours',fin]]);
