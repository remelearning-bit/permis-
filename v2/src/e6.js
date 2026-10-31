/* ---------------- Étape 6 · Les règles générales de sécurité sur l'aire de mouvement (diapos 187 à 196) ----------------
   Voix g01 à g18 existantes. Photos du support (diapos 191 à 195), illustrations au trait pour les équipements et la cabine.
   Questions : seuil de 80 %, seconde série après un échec. */
const H6='Étape 6 · La sécurité sur l\'aire de mouvement';
Object.assign(IC,{check2:'<svg class="ic" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="6"/><path d="M16 24l6 6 11-12"/></svg>'});
var CAPS={c6:'Image du parcours REM Formation'};

/* les écrans sur photo : chaque carte arrive quand la voix en parle */
const HH=t=>t.replace(/ /g,'\u00a0');
async function infoS(d){step();if(d.head)head(H6+(d.tm?' · '+HH(d.tm):''),d.head);await photo(d.ph,FAST?10:500);setCam({mode:'contain'});await vzOff();
 const L=label([0,0,0],{lead:false}).title(d.cap);
 for(const id of d.lines){if(LINES[id].w==='X'){await sayS(id,[at(id,.02,()=>L.card(`« ${LINES[id].t} »`,'Xavier',{a:null}))]);continue}
  if(d.swap&&d.swap[0]===id)await sayS(id,[...(d.cards||[]).filter(c=>c[0]===id).map(c=>at(id,c[1],()=>L.card(c[2],c[3]||'',{a:null}))),at(id,d.swap[1],()=>photo(d.swap[2],FAST?10:900))]);
  else await info(L,id,(d.cards||[]).filter(c=>c[0]===id).map(c=>[c[1],c[2],c[3]||'',{a:null}]))}
 if(d.end)d.end(L);await cont(L);L.kill();return null}
const S=(ph,cap,lines,cards,head,o={})=>()=>infoS({ph,cap,lines,cards,head,...o});

/* les illustrations au trait (pas de photo de Roissy pour un objet) */
const ART={
 gilet:`<svg viewBox="0 0 200 200"><path d="M62 30l22 10c4 18 28 18 32 0l22-10 22 26-14 16v104H54V72L40 56z" fill="#F2C200" stroke="#263C52" stroke-width="5" stroke-linejoin="round"/>
  <path d="M100 52v124" stroke="#263C52" stroke-width="4"/><rect x="56" y="112" width="88" height="13" fill="#cfd4d8" stroke="#263C52" stroke-width="3"/><rect x="56" y="140" width="88" height="13" fill="#cfd4d8" stroke="#263C52" stroke-width="3"/>
  <rect x="112" y="76" width="22" height="16" rx="3" fill="#263C52"/></svg>`,
 casque:`<svg viewBox="0 0 200 200"><path d="M50 112c0-44 22-72 50-72s50 28 50 72" fill="none" stroke="#263C52" stroke-width="14" stroke-linecap="round"/>
  <rect x="30" y="100" width="40" height="64" rx="18" fill="#263C52"/><rect x="130" y="100" width="40" height="64" rx="18" fill="#263C52"/><rect x="40" y="112" width="20" height="40" rx="9" fill="#5d6f80"/><rect x="140" y="112" width="20" height="40" rx="9" fill="#5d6f80"/></svg>`,
 chaussures:`<svg viewBox="0 0 200 200"><path d="M46 60h46v52c18 4 40 10 56 22 10 8 12 20 10 30H40c-4-30 0-70 6-104z" fill="#3a434c" stroke="#1d2329" stroke-width="5" stroke-linejoin="round"/>
  <path d="M38 164h124v12H38z" fill="#1d2329"/><path d="M118 124c14 4 26 12 32 22" fill="none" stroke="#8a949d" stroke-width="5" stroke-linecap="round"/><path d="M58 76h26M58 92h26" stroke="#8a949d" stroke-width="4" stroke-linecap="round"/></svg>`,
 autres:`<svg viewBox="0 0 200 200"><path d="M40 74c10-14 40-14 50 0M110 74c10-14 40-14 50 0" fill="none" stroke="#263C52" stroke-width="5"/>
  <rect x="30" y="74" width="62" height="34" rx="14" fill="#dfe4e7" stroke="#263C52" stroke-width="5"/><rect x="108" y="74" width="62" height="34" rx="14" fill="#dfe4e7" stroke="#263C52" stroke-width="5"/><path d="M92 88h16" stroke="#263C52" stroke-width="5"/>
  <path d="M74 186v-50c0-6 10-6 10 0v-12c0-6 10-6 10 0v-4c0-6 10-6 10 0v6c0-6 10-6 10 0v40c8-8 18-6 18 0l-14 20H74z" fill="#5d6f80" stroke="#263C52" stroke-width="4" stroke-linejoin="round"/></svg>`,
 radio:`<svg viewBox="0 0 200 200"><rect x="22" y="62" width="156" height="76" rx="10" fill="#3a434c" stroke="#1d2329" stroke-width="5"/><rect class="scr" x="44" y="80" width="78" height="26" rx="4"/>
  <circle cx="150" cy="100" r="16" fill="#5d6f80" stroke="#1d2329" stroke-width="4"/><path d="M44 120h20M72 120h20M100 120h20" stroke="#8a949d" stroke-width="6" stroke-linecap="round"/></svg>`,
 storno:`<svg viewBox="0 0 200 200"><path d="M118 20v44" stroke="#3a434c" stroke-width="8" stroke-linecap="round"/><rect x="70" y="60" width="64" height="120" rx="14" fill="#3a434c" stroke="#1d2329" stroke-width="5"/>
  <rect class="scr" x="82" y="74" width="40" height="22" rx="3"/><path d="M84 112h36M84 126h36M84 140h36M84 154h36" stroke="#8a949d" stroke-width="5" stroke-linecap="round"/></svg>`,
 tel:`<svg viewBox="0 0 200 200"><rect x="64" y="24" width="72" height="152" rx="14" fill="#3a434c" stroke="#1d2329" stroke-width="5"/><rect class="scr" x="74" y="40" width="52" height="112" rx="4"/><circle cx="100" cy="164" r="5" fill="#8a949d"/></svg>`};

/* 1. la couverture */
async function cover(){step();await photo('c6',FAST?10:1200);setCam({zoom:1.08});
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 6 · 6 h 50').card('Avant de descendre du véhicule','Les règles générales de sécurité sur l\'aire de mouvement.');
 await cont(L,"C'est parti");try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}
 await sayS('g01');
 await sayS('g02',[at('g02',.02,()=>L.card('« Le gilet, je l\'ai. »','Xavier'))]);
 await sayS('g03',[at('g03',.02,()=>L.card('C\'est un début','Les équipements, le badge, la cabine, les interdictions, les passagers, les piétons.'))]);
 await cont(L,'Démarrer');L.kill();return null}

/* 2. les équipements de protection individuelle (diapos 189, 190) */
async function epi(){step();head(H6+' · '+HH('6 h 52'),'Les équipements de protection individuelle');
 const T=(k,t,s)=>`<div class="it ep" id="ep-${k}"><div class="art">${ART[k]}</div><p class="t">${nb(t)}</p><p class="s">${nb(s)}</p></div>`;
 vue(`<div class="epw">${T('gilet','Gilet haute visibilité','Jaune ou orange, au logo de l\'entreprise. Obligatoire en permanence sur l\'aire de mouvement.')}
  ${T('casque','Casque antibruit','Obligatoire dans les zones exposées à des bruits intensifs.')}
  ${T('chaussures','Chaussures de sécurité','Obligatoires en zone d\'évolution contrôlée.')}
  ${T('autres','Et selon vos missions','D\'autres équipements peuvent être requis par vos règles internes.')}</div>`);
 await sayS('g04',[W('g04','gilet',()=>show('#ep-gilet',true)),W('g04','casque',()=>show('#ep-casque',true)),W('g04','chaussures',()=>show('#ep-chaussures',true))]);
 await sayS('g05',[at('g05',.05,()=>show('#ep-autres',true))]);undim();
 jlog('6 h 52','Les équipements de protection individuelle');await contV();return null}

/* 3. à vous : je le porte quand ? */
const EPI1=[{t:"Le gilet haute visibilité au logo de l'entreprise.",b:"t",ok:"En permanence sur l'aire de mouvement."},
 {t:"Le casque antibruit.",b:"z",ok:"Dans les zones exposées à des bruits intensifs."},
 {t:"Les chaussures de sécurité.",b:"z",ok:"Obligatoires en zone d'évolution contrôlée."},
 {t:"Mon badge, apparent.",b:"t",ok:"Toujours apparent : sinon, 150 € d'amende et/ou 6 jours de retrait du titre."},
 {t:"Les lunettes de protection.",b:"z",ok:"Selon vos missions et les règles internes."}];
const EPI2=[{t:"Le gilet, jaune ou orange.",b:"t",ok:"Obligatoire en permanence sur l'aire de mouvement."},
 {t:"Le titre de circulation, porté bien visible.",b:"t",ok:"Toujours apparent sur l'aire de mouvement."},
 {t:"Les gants.",b:"z",ok:"Selon vos missions et les règles internes."},
 {t:"Le casque antibruit.",b:"z",ok:"Obligatoire dans les zones exposées à des bruits intensifs."},
 {t:"Les chaussures de sécurité.",b:"z",ok:"Obligatoires en zone d'évolution contrôlée."}];
async function trier(){step();head(H6+' · '+HH('6 h 55'),'Avant de descendre : je porte ? Cliquez sur la bonne colonne');
 vue(`<div class="hero">${bigIc('quiz')}<p class="cap">${nb("Cet équipement, je le porte :")}</p><p class="sub">Cliquez sur la bonne colonne.</p></div>`);
 await sayS('g06');
 const E=await sortV(alt('epi',EPI1,EPI2),[['t',"Toujours, sur l'aire de mouvement",'check2'],['z','Selon la zone ou la mission','pin']],{label:'Élément',id:'epi'});
 jlog('6 h 55',`Avant de descendre : 5 éléments${errTxt(E)}`);return gate('epi',E,5,[1,2],'Avant de descendre',3)}

/* 4. le badge (diapo 191) */
const badge=S('badge','Le badge',['g07'],[['g07',.25,'Le titre de circulation aéroportuaire','Votre badge, porté apparent.'],['g07',.6,'Absent ou caché','150 € d\'amende et/ou 6 jours de retrait du titre.']],'Le badge',{tm:'6 h 54'});

/* 5. la stérilité de la cabine (diapo 192) : à vous de rendre la cabine silencieuse */
async function cabine(){step();head(H6+' · '+HH('6 h 56'),'La stérilité de la cabine');
 const T=(k,t)=>`<div class="it cb on" id="cb-${k}"><div class="art">${ART[k]}</div><p class="t">${nb(t)}</p><p class="st">Allumé</p><button class="act off">Éteindre</button></div>`;
 vue(`<div class="cbw"><div class="cbs">${T('radio','La radio, la musique')}${T('storno','Le storno, le talkie-walkie')}${T('tel','Le téléphone portable')}</div><div class="cbm it" id="cbm"></div></div>`);
 await sayS('g08',[W('g08','radio',()=>show('#cb-radio',true)),W('g08','talkie',()=>show('#cb-storno',true)),W('g08','portable',()=>show('#cb-tel',true))]);undim();
 const m=$c('#cbm');m.textContent='À vous : éteignez tout ce qui peut vous distraire.';show('#cbm');
 const bs=[...VZ.querySelectorAll('.cb .act')];bs.forEach(b=>b.classList.remove('off'));
 await new Promise(r=>{let n=0;const upd=()=>{const left=bs.filter(b=>!b.disabled);hand(left[0]||null);if(!left.length)r()};
  bs.forEach(b=>b.onclick=()=>{const c=b.closest('.cb');c.classList.remove('on');c.querySelector('.st').textContent='Éteint';b.disabled=true;b.classList.add('off');upd()});upd()});
 hand(null);m.innerHTML='<b class="okc">Cabine silencieuse.</b> Rien pour vous distraire au volant.';await wait(FAST?50:1400);
 m.innerHTML='<div class="qc" id="cbq" style="width:min(640px,100%);margin:0 auto"><p class="q">Un message arrive pendant que vous roulez. Vous répondez :</p></div>';
 await pick(null,[['0','Tout de suite, en roulant'],['1','Une fois le véhicule à l\'arrêt']],'1','Une fois le véhicule à l\'arrêt : on ne répond jamais en roulant.',{0:'Non : en roulant, vous ne répondez pas. Vous répondez une fois le véhicule à l\'arrêt.'},'Continuer',{once:false,retry:true,host:$c('#cbq')});
 await sayS('g09',[at('g09',.02,()=>{m.innerHTML='« Et si la régulation m\'appelle ? » <span class="who">Xavier</span>'})]);
 await sayS('g10',[at('g10',.05,()=>{m.innerHTML='<b>Vous répondez une fois le véhicule à l\'arrêt.</b>'})]);
 jlog('6 h 56','Cabine silencieuse : radio, talkie-walkie, téléphone éteints');await contV();return null}

/* 6. les interdictions (diapo 193) */
const interdit=S('interdit','Les interdictions',['g11','g12'],[['g11',.12,'Interdiction absolue de fumer','Sur les aires de mouvement, chapitre 3, article 43. Fumer ou vapoter seulement aux endroits réservés à cet effet.'],
 ['g11',.62,'Ni alcool','Campagne de sécurité routière, novembre 2021 : 25 % des personnes contrôlées en écart, une alcoolémie de 1,45 mg/L.'],['g11',.8,'Ni sous l\'influence de médicaments ou de substances psychoactives','Qui agissent sur la vigilance. Substances illicites comprises.'],['g12',.3,'Un contrôle positif au volant','Alcool ou substance : retrait immédiat du titre de circulation.']],'Les interdictions',{tm:'6 h 58'});

/* 7. le déplacement des passagers (diapo 194) */
const passagers=S('pass1','Le déplacement des passagers',['g13'],[['g13',.03,'Les cheminements des passagers','Indiqués par l\'agent de la zone d\'évolution contrôlée ou l\'agent d\'embarquement.'],['g13',.3,'Sur l\'aire de trafic','Des lignes blanches continues et un hologramme. Ils croisent les voies avion ou longent les postes, comme au terminal 2G.'],
 ['g13',.68,'À l\'embarquement ou au débarquement au large','À distance suffisante de l\'avion. Les cônes de Lübeck, s\'il y en a, se contournent : ils signalent des ailes à moins de 3,10 m. Les passagers suivent l\'agent de la zone d\'évolution contrôlée ou l\'agent de la compagnie.']],'Les passagers',{swap:['g13',.66,'pass2'],tm:'7 h 00'});

/* 8. les cheminements piétons (diapo 195) */
const pietons=S('piet1','Les cheminements piétons',['g14','g15'],[['g14',.05,'Traverser une voie avion à pied','Dans le cheminement piéton : bande blanche continue de part et d\'autre, avec hologramme, ou zébras blancs.'],
 ['g14',.43,'Traverser un cheminement véhicule','Sur les passages piétons.'],['g14',.55,'Toujours','Le gilet haute visibilité et les équipements de protection.'],['g14',.72,'Sur une touchée','Loin d\'un avion moteurs en fonctionnement : le régime peut augmenter d\'un coup.'],
 ['g15',.3,'Interdit à pied sur une voie avion','Sauf sous la surveillance et l\'accompagnement d\'un véhicule autorisé, à l\'arrivée ou au départ de l\'avion.']],'Les piétons',{swap:['g14',.42,'piet2'],tm:'7 h 01'});

/* 9. les questions d'entraînement (diapo 196) */
async function questions(){step();head(H6+' · '+HH('7 h 02'),"Questions d'entraînement");ALT.q6=1;const two=(TRY.q6||0)%2;
 const Q=two?[{bk:[5],fixed:1,q:"Où peut-on fumer ou vapoter ?",o:[["Seulement aux endroits réservés à cet effet.",1,"Fumer ou vapoter, seulement aux endroits réservés à cet effet."],["Sur l'aire de trafic, loin des avions.",0,"Non : interdiction absolue de fumer sur les aires de mouvement."],["Partout, s'il n'y a pas d'avion à proximité.",0,"Non : interdiction absolue de fumer sur les aires de mouvement."]]},
   {bk:[7],fixed:1,q:"Un piéton peut-il circuler sur une voie de circulation avion ?",o:[["Oui, s'il porte son gilet haute visibilité.",0,"Le gilet ne suffit pas : à pied, la circulation sur la voie avion est interdite."],["Oui, de jour seulement.",0,"Le jour ne change rien : à pied, la circulation sur la voie avion est interdite, sauf accompagnement."],["Non, sauf sous la surveillance et l'accompagnement d'un véhicule autorisé.",1,"Pour sécuriser l'avion à l'arrivée ou au départ de son poste."]]}]
    :[{line:'g16',bk:[5],fixed:1,q:"Peut-on fumer sur l'aire de trafic ?",o:[["Oui.",0,"Non : interdiction absolue, chapitre 3, article 43."],["Non.",1,"Interdiction absolue sur les aires de mouvement. Fumer ou vapoter, seulement aux endroits réservés à cet effet."]]},
   {line:'g17',bk:[7],fixed:1,q:"La circulation des piétons sur l'aire de mouvement est :",o:[["Strictement interdite.",0,"Non : elle est autorisée, sous conditions, dans les cheminements piétons et avec les équipements."],["Autorisée sous certaines conditions.",1,"Dans les cheminements piétons, avec le gilet et les équipements ; jamais sur une voie avion sans accompagnement."],["Autorisée, de jour seulement, avec port d'un vêtement haute visibilité.",0,"Le gilet est nécessaire, mais la condition n'est pas le jour : ce sont les cheminements et les règles de sécurité."]]}];
 return quiz('q6',Q,'7 h 02',"Questions d'entraînement",[1],8,true)}

/* une série de questions à choix : une réponse, chaque réponse expliquée ; sous 80 %, retour ciblé */
async function quiz(id,Q,h,what,bk,ret,x){let E=0;const MISS=new Set();
 for(let i=0;i<Q.length;i++){const z=Q[i];
  vue(`<div class="qc" id="qq" style="width:min(760px,100%)"><p class="n">Question ${i+1} sur ${Q.length}</p><p class="q">${nb(z.q)}</p></div>`);
  if(z.line)await sayS(z.line);else await wait(FAST?0:400);
  const qc=$c('#qq');let o=z.o.map((y,k)=>[String(k),y[0]]);if(!z.fixed)for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
  const gk=String(z.o.findIndex(y=>y[1]));const kot={};z.o.forEach((y,k)=>{if(!y[1]&&y[2])kot[k]=y[2]});
  const e=await pick(null,o,gk,z.o[+gk][2],kot,i<Q.length-1?'Question suivante':'Terminer',{once:true,x:!!x,host:qc});E+=e;if(e)[].concat(z.bk||bk).forEach(k=>MISS.add(k))}
 jlog(h,`${what} : ${Q.length} question${Q.length>1?"s":""}${errTxt(E)}`);return gate(id,E,Q.length,[...MISS].sort((a,b)=>a-b),what,ret)}

/* 10. fin de l'étape */
async function fin(){step();head('Étape 6 terminée · 7 h 05','Sixième case cochée');
 vue(`<div class="hero">${bigIc('shield')}<p class="cap">Prêt à approcher de l'avion</p><p class="sub">Les équipements, le badge apparent, la cabine silencieuse, les interdictions, les passagers, les piétons.</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de l'étape</p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('g18');
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Étape 7 · Autour de l'avion</a>`}
const NEXT='etape7.html';
document.head.insertAdjacentHTML('beforeend',`<style>
.epw{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,2vw,28px);width:100%;max-width:1240px}
.ep,.cb{background:#fff;border-radius:16px;padding:clamp(12px,2vh,22px);box-shadow:0 6px 22px rgba(38,60,82,.10);align-items:center;text-align:center}
.ep .art,.cb .art{width:min(100%,160px);aspect-ratio:1;margin:0 auto}.ep .art svg,.cb .art svg{width:100%;height:100%;display:block}
.ep .t,.cb .t{font-weight:700;font-size:clamp(18px,1.6vw,24px);color:var(--marine);margin:0}
.ep .s{font-size:clamp(15px,1.2vw,18px);color:#3d4d5c;margin:0;line-height:1.35}
.it.dim{opacity:.38}
.cbw{display:flex;flex-direction:column;align-items:center;gap:clamp(12px,2.4vh,24px);width:100%;max-width:1100px}
.cbs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(12px,2vw,28px);width:100%}
.cb .scr{fill:#5b6168;transition:fill .4s}.cb.on .scr{fill:#F2C200}
.cb .st{margin:0;font-weight:700;font-size:15px;color:#5d6f80}.cb.on .st{color:var(--marine)}
.cb .act{pointer-events:auto}.cb .act.off{visibility:hidden}
.cbm{font-size:clamp(18px,1.6vw,24px);font-weight:600;color:var(--marine);text-align:center;margin:0;min-height:1.4em}
.cbm .okc{color:var(--vert,#2E8B57)}.cbm .who{font-weight:500;color:#5d6f80;font-size:.8em;margin-left:6px}
@media (max-width:700px){.epw{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.ep{padding:8px;gap:4px}.ep .art{width:min(100%,92px)}.ep .t{font-size:15px}.ep .s{font-size:14px}
 .cbs{grid-template-columns:1fr;gap:8px}.cb{display:grid;grid-template-columns:64px 1fr auto;grid-template-rows:auto auto;column-gap:12px;row-gap:0;text-align:left;padding:8px 12px}
 .cb .art{grid-row:1/3;width:64px}.cb .t{font-size:16px;align-self:end}.cb .st{align-self:start}.cb .act{grid-row:1/3;grid-column:3;align-self:center;font-size:15px;padding:9px 14px}.cbm{font-size:16px}}
</style>`);
runSeq([['Couverture',cover],['Les équipements de protection individuelle',epi],['Le badge',badge],['Avant de descendre : je porte ? À vous',trier],
 ['La stérilité de la cabine',cabine],['Les interdictions',interdit],['Le déplacement des passagers',passagers],['Les cheminements piétons',pietons],
 ["Questions d'entraînement",questions],['Fin de l\'étape 6',fin]]);
