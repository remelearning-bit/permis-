/* ---------------- Étape 4 · L'inspection du véhicule avant utilisation (diapos 87 à 89) ----------------
   Sources : diapo 88 (les sept points), consigne d'exploitation n°12 (§ 3.2, 4.1, 4.2), test Groupe ADP V6 et QCM REM (chapitre 4).
   Voix v01 à v16 existantes. Les écrans tirés de la consigne n°12 n'ont pas encore de voix : l'apprenant clique pour avancer. */
const H4="Étape 4 · L'inspection du véhicule";
var CAPS={voiture:'Photo REM Formation',r3:'Illustration'};

// pictogrammes de l'étape, dans le style des autres
Object.assign(IC,{
 tire:'<svg class="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="7"/><path d="M24 7v10M24 31v10M7 24h10M31 24h10"/></svg>',
 bulb:'<svg class="ic" viewBox="0 0 48 48"><path d="M8 18c0-5 4-9 10-9h6v22h-6c-6 0-10-4-10-9z"/><path d="M30 14h10M30 20h12M30 26h10"/></svg>',
 brake:'<svg class="ic" viewBox="0 0 48 48"><circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="4"/><path d="M12 13a16 16 0 0 0 0 22"/></svg>',
 fuel:'<svg class="ic" viewBox="0 0 48 48"><rect x="10" y="8" width="18" height="32" rx="2"/><path d="M14 16h10M28 18l8 6v12a3 3 0 0 1-6 0v-6"/></svg>',
 tag:'<svg class="ic" viewBox="0 0 48 48"><path d="M8 10h18l14 14-16 16L8 26z"/><circle cx="16" cy="18" r="3"/></svg>',
 ext:'<svg class="ic" viewBox="0 0 48 48"><rect x="16" y="14" width="14" height="28" rx="5"/><path d="M20 14v-5h6v5M26 9h8l-4 5"/></svg>',
 check2:'<svg class="ic" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="6"/><path d="M16 24l6 6 11-12"/></svg>'});

/* 1. la couverture */
async function cover(){step();{const _p=photo('voiture',FAST?10:900);setCam({mode:'contain'});await _p;await wait(350)}
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 4 · 5 h 45').card("L'inspection du véhicule avant utilisation","Le véhicule est devant vous. Avant de monter, on en fait le tour.");
 await cont(L,"C'est parti");try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}
 await sayS('v01',[W('v01','Tout véhicule',()=>L.card('En bon état général','Tout véhicule ou engin qui circule sur les aires, et contrôlé régulièrement.'))]);
 await sayS('v02',[at('v02',.02,()=>L.card('« Même pour un trajet de dix minutes ? »','Xavier'))]);
 await sayS('v03',[at('v03',.02,()=>L.card('Même pour dix minutes','On fait le tour du véhicule.'))]);
 await cont(L,'Faire le tour du véhicule');L.kill();return null}

/*__TOUR__*/

/* 3. on récapitule */
const SEPT=[['tire','Les pneumatiques','pneumatiques'],['bulb','L\'éclairage','éclairage'],['brake','Le freinage','freinage'],['fuel','Le carburant ou la charge des batteries','carburant'],['stop','L\'arrêt d\'urgence, s\'il y en a un','arrêt'],['tag','Le balisage et le marquage','balisage'],['ext','Les équipements de sécurité','équipements']];
async function recap(){step();head(H4,'On récapitule');
 vue(`<div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:clamp(12px,2.4vh,24px)"><p class="cap it" id="rc0" style="margin:0">Un véhicule en bon état général, contrôlé régulièrement</p>
  <div class="tiles" style="grid-template-columns:repeat(4,1fr);max-width:1100px">${SEPT.map((f,i)=>`<div class="tile" id="rt${i}">${IC[f[0]]}<p class="lb">${nb(f[1])}</p></div>`).join('')}<div class="tile" id="rt7">${IC.doc}<p class="lb">${nb("L'entretien de la flotte, justifiable à tout moment")}</p></div></div></div>`);
 await sayS('v14',[at('v14',.02,()=>show('#rc0')),...SEPT.map((f,i)=>W('v14',f[2],()=>on('#rt'+i),.005)),W('v14',"Et l'entretien",()=>on('#rt7'))]);
 await contV();return null}

/* 4. la consigne n°12 : la vérification quotidienne, au minimum */
const N12=["Les indications de dysfonctionnement et d'avertissement","Le volant","Le système d'éclairage","Le système de freinage","Les systèmes de communication, transpondeur compris le cas échéant","L'état des pneus","Les rétroviseurs extérieurs","Les essuie-glaces, le cas échéant","Les objets à sécuriser sur le véhicule","Les fuites","Les nouveaux dommages extérieurs","Le plan de l'aire de mouvement, à bord","Le gilet haute visibilité, à bord"];
async function quotidien(){step();head(H4,'Chaque jour, avant de partir');
 vue(`<div class="hero"><p class="huge" style="font-size:clamp(60px,8vw,120px)">13</p><p class="cap">Points à vérifier chaque jour, avant d'utiliser le véhicule</p><p class="sub">${nb("Au minimum : c'est la consigne d'exploitation n°12, sur l'entretien des véhicules, § 4.2. Votre employeur l'intègre à son programme de vérification.")}</p></div>`);
 await contV('Voir la liste');
 vue(`<div class="n12"><ol>${N12.map((t,i)=>`<li class="it" id="q${i}"><b>${i+1}</b><span>${nb(t)}</span></li>`).join('')}</ol>
  <p class="sub it" id="q13" style="text-align:center;margin:clamp(10px,2vh,18px) auto 0">${nb("Le plan est disponible sur l'extranet opérationnel du Groupe ADP. Le gilet porte le logo de l'employeur, en classe 2 ou 3.")}</p></div>`);
 for(let i=0;i<N12.length;i++){show('#q'+i);await wait(FAST?0:260)}show('#q13');
 await contV();return null}

/* 5. si quelque chose ne va pas */
async function horsService(){step();head(H4,'Si quelque chose ne va pas');
 vue(`<div style="width:100%;display:flex;flex-direction:column;align-items:center"><div class="duo3">
  <div class="card2 it" id="k1">${IC.stop}<p class="lb">Un véhicule hors service</p><p class="tx">${nb("On ne l'exploite pas, on le signale, et il est évacué de la zone côté piste.")}</p></div>
  <div class="card2 it" id="k2">${IC.tag}<p class="lb">Identifié des deux côtés</p><p class="tx">${nb("Le nom ou la marque de l'entreprise, au moins 40 cm sur 20 cm, et des bandes réfléchissantes latérales.")}</p></div>
  <div class="card2 it" id="k3">${IC.doc}<p class="lb">Un programme d'entretien</p><p class="tx">${nb("Un programme pour chaque véhicule, établi par l'employeur. Les registres d'entretien sont conservés au moins quatre ans après le retrait du véhicule.")}</p></div></div>
  <p class="sub" style="text-align:center;margin-top:clamp(10px,2vh,20px)">${nb("Consigne d'exploitation n°12, § 3.2, 4.1 et 6.")}</p></div>`);
 for(const k of ['#k1','#k2','#k3']){show(k,true);await wait(FAST?0:500)}undim();
 await contV();return null}

/* 6. à vous : dans la vérification quotidienne, ou pas ? */
const V1=[{t:"L'état des pneus.",b:"o",ok:"Il fait partie de la vérification quotidienne : l'état des pneus."},
 {t:"Le système de freinage.",b:"o",ok:"Il fait partie de la vérification quotidienne, avant chaque utilisation."},
 {t:"Les papiers du véhicule.",b:"n",ok:"Les papiers, c'est pour le poste d'accès. Avant d'utiliser le véhicule, on vérifie son état."},
 {t:"Le plan de l'aire de mouvement, à bord.",b:"o",ok:"La consigne n°12 le demande : le plan doit être dans le véhicule."},
 {t:"Le gilet haute visibilité, à bord.",b:"o",ok:"La consigne n°12 le demande : le gilet, au logo de l'employeur, doit être dans le véhicule."},
 {t:"Mon titre de circulation aéroportuaire.",b:"n",ok:"C'est un titre personnel, présenté au poste d'accès. Il ne fait pas partie de la vérification du véhicule."}];
const V2=[{t:"Le volant.",b:"o",ok:"Il fait partie de la vérification quotidienne de la consigne n°12."},
 {t:"Les rétroviseurs extérieurs.",b:"o",ok:"Ils font partie de la vérification quotidienne de la consigne n°12."},
 {t:"Les fuites.",b:"o",ok:"On les cherche chaque jour, avant d'utiliser le véhicule."},
 {t:"Ma pièce d'identité.",b:"n",ok:"C'est un document personnel, présenté au poste d'accès. Il ne fait pas partie de la vérification du véhicule."},
 {t:"Les nouveaux dommages extérieurs.",b:"o",ok:"On fait le tour du véhicule pour les repérer, chaque jour."},
 {t:"Le laissez-passer véhicule.",b:"n",ok:"C'est le titre d'accès du véhicule, présenté au poste d'accès. Ce n'est pas un point de l'état du véhicule."}];
async function avant(){step();head(H4+' · 5 h 55','Avant de partir ? À vous');
 vue(`<div class="hero nph"><p class="cap">${nb("Je le vérifie avant d'utiliser le véhicule, ou pas ?")}</p><p class="sub">Cliquez sur la bonne colonne.</p></div>`);
 await contV('Commencer');
 const E=await sortV(alt('av',V1,V2),[['o','Je le vérifie','check2'],['n','Pas dans la vérification du véhicule','warn']],{label:'Élément',id:'av'});
 jlog('5 h 55',`Avant de partir : 6 éléments${errTxt(E)}`);return gate('av',E,6,[2,3],'Avant de partir',5)}

/* 7. la question du chapitre */
async function question(){step();head(H4+' · 5 h 58',"Une question d'entraînement");
 ALT.q4=1;const two=(TRY.q4||0)%2;
 const Z=two?{q:"Pendant le tour du véhicule, vous trouvez un défaut qui le rend hors service. Que faites-vous ?",bk:[4],
   o:[["Je ne l'utilise pas, je le signale, et il est évacué de la zone côté piste.",1,"La consigne n°12 est claire : un véhicule hors service n'est pas exploité ; il est signalé et évacué de la zone côté piste."],["Je pars quand même, et je le signale en rentrant.",0,"Hors service, il n'est pas exploité : il ne part pas."],["Je le gare sur un poste de stationnement libre.",0,"Hors service, il est évacué de la zone côté piste, pas laissé sur un poste."]]}
  :{line:'v15',q:"En tant que conducteur, quels sont les points à vérifier avant d'utiliser un véhicule côté piste ?",fixed:1,bk:[2,3],
   o:[["L'aspect extérieur du véhicule.",0,"L'aspect extérieur ne suffit pas : il faut aussi l'éclairage, les freins, et le niveau de la batterie ou du réservoir."],["Les papiers du véhicule.",0,"Les papiers, c'est pour le poste d'accès. Avant d'utiliser le véhicule, on vérifie son état."],["L'aspect extérieur, l'éclairage, l'état des freins, et le niveau de la batterie ou du réservoir du véhicule.",1,"Le tour du véhicule avant chaque utilisation. Il comprend notamment l'aspect extérieur, l'éclairage, les freins, la batterie ou le réservoir."]]};
 vue(`<div class="qc" id="qq" style="width:min(760px,100%)"><p class="n">Question 1 sur 1</p><p class="q">${nb(Z.q)}</p></div>`);
 if(Z.line)await sayS(Z.line);else await wait(FAST?0:400);
 const qc=$c('#qq');let o=Z.o.map((x,k)=>[String(k),x[0]]);if(!Z.fixed)for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
 const gk=String(Z.o.findIndex(x=>x[1]));const kot={};Z.o.forEach((x,k)=>{if(!x[1]&&x[2])kot[k]=x[2]});
 const E=await pick(null,o,gk,Z.o[+gk][2],kot,'Terminer',{once:true,x:true,host:qc});
 jlog('5 h 58',`Question d'entraînement${errTxt(E)}`);return gate('q4',E,1,Z.bk,"Question d'entraînement",6)}

/* 8. fin */
async function fin(){step();head('Étape 4 terminée · 6 h 00','Quatrième case cochée');
 const ET=['La réglementation','Le zonage et la cartographie',"L'accès au côté piste","L'inspection du véhicule",'La circulation des véhicules',"Les règles de sécurité sur l'aire de mouvement","La circulation autour de l'avion","L'aire de manœuvre","Les procédures d'urgence","L'amélioration continue de la sécurité"];
 vue(`<div class="hero"><div class="pmini" id="pmn"><b>T</b>${ET.map((e,i)=>`<i class="${i<3?'now':''}">${i<3?'✓':i+1}</i>`).join('')}</div>
  <p class="cap" id="fc1" style="margin-top:clamp(6px,1.6vh,14px);font-size:clamp(22px,2.2vw,32px)">Prochaine étape : la circulation des véhicules</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de l'étape</p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('v16',[at('v16',.02,()=>{const i=$c('#pmn i:nth-of-type(4)');i.classList.add('now');i.innerHTML='✓'})]);
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Étape 5 · La circulation des véhicules</a>`}
const NEXT='etape5.html';
document.head.insertAdjacentHTML('beforeend',`<style>
.n12 ol{list-style:none;margin:0 auto;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:8px 28px;max-width:1080px}
.n12 li{display:flex;gap:12px;align-items:center;font-size:clamp(17px,1.45vw,22px);font-weight:600;color:var(--marine);line-height:1.25}
.n12 li b{flex:none;width:30px;height:30px;border-radius:8px;background:var(--marine);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px}
.duo3{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(14px,2vw,26px);width:100%;max-width:1180px}
.duo3 .card2 .tx{max-width:none;margin:0}
@media (max-width:700px){.n12 ol{grid-template-columns:1fr;gap:6px}.n12 li{font-size:16px}.n12 li b{width:24px;height:24px;font-size:12px}.duo3{grid-template-columns:1fr;gap:8px}.duo3 .card2{padding:12px 14px}.duo3 .card2 svg{display:none}.duo3 .card2 .lb{margin:0 0 4px}.duo3 .card2 .tx{font-size:16px}}
</style>`);
runSeq([['Couverture',cover],['Le tour du véhicule',tour],['On récapitule',recap],['La vérification quotidienne',quotidien],['Si quelque chose ne va pas',horsService],['Avant de partir ? À vous',avant],['Question',question],["Fin de l'étape",fin]]);
