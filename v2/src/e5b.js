/* ---------------- Étape 5, suite · Les risques sur l'aire de mouvement et les bonnes attitudes (diapos 150 à 186) ----------------
   Voix k01 à k39 existantes (pas de k27). Photos du support et images du PowerPoint. */
const H5="Étape 5, suite · Les risques et les bonnes attitudes";
var CAPS={c5b:'Photo du support REM Formation'};
/*__HELPERS__*/

/* 1. la couverture */
async function cover(){step();await photo('c5b',FAST?10:1200);setCam({zoom:1.08});
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 5, suite · 6 h 25').card("Les risques sur l'aire de mouvement et les bonnes attitudes","");
 await cont(L,"C'est parti");try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}
 for(const id of ['k01','k02','k03']){if(LINES[id].w==='X')await sayS(id,[at(id,.02,()=>L.card(`« ${LINES[id].t} »`,'Xavier'))]);else await sayS(id)}
 await cont(L,'Reprendre la route');L.kill();return null}

/* 2. les règles à respecter (diapos 152 à 159) */
const cinq=S('c5b','Cinq règles à respecter',['k04'],[['k04',.2,'1 · La priorité aux avions','Toujours.'],['k04',.4,'2 · La distance de sécurité',"Avant et après le passage d'un avion."],['k04',.6,'3 · Anticiper',"Le temps de traversée d'une voie de circulation avion."],['k04',.8,'4 · Marquer les stops','Toujours.'],['k04',.95,'5 · Rester attentif aux bruits','Surtout en cas de mauvaise visibilité.']]);
const attente=S('staging',"Les zones d'attente",['k05','k06'],[['k05',.35,'Sur les aires traversantes de Roméo','R01, R02, R03, R39, R07, R08, R09 : postes à départ autonome, risque de souffle et de choc avion.'],['k05',.7,'Une ligne discontinue rouge',"Le matériel en attente de l'avion se gare de part et d'autre du poste, dans la zone d'attente."],['k06',.5,'Libérée avant tout départ',"La zone doit être intégralement libérée avant tout mouvement de départ de l'avion."],['k06',.9,'Le numéro des postes',"La zone d'attente porte toujours le numéro des postes avion qu'elle dessert."]]);
const priorite=S('priorite','La priorité',['k07','k08','k09'],[['k07',.2,'Priorité absolue','Aux aéronefs au roulage ou tractés.'],['k07',.7,'Priorité aussi',"Secours, police et contrôle des aires, interventions d'urgence, bus de passagers, véhicules sur les cheminements quand on quitte un poste, piétons."],['k08',.5,'Le guidage est prioritaire',"À l'arrivée d'un avion, l'agent qui le guide a priorité : la circulation s'interrompt jusqu'à la fin du guidage."],['k09',.5,'Un aéroport est conçu pour les avions','']]);
const anticol=S('anticol2','Feux anticollision allumés',['k10'],[['k10',.4,'Feux allumés = véhicule immobilisé','Immédiatement.'],['k10',.85,'400 mètres',"La distance de freinage d'un 777 tracté à 60 km/h."]]);

/* 3. la traversée de la voie avion (diapos 160 à 164) */
const traverse=S('traverse','Traverser une voie de circulation avion',['k11','k12'],[['k11',.3,"Seulement si la tâche l'exige","La circulation sur les aires de trafic est interdite en dehors des stricts besoins de l'exécution d'une tâche."],['k11',.7,'Dans les tiretets',"La traversée se fait à l'intérieur des cheminements prévus, matérialisés par les tiretets décalés blancs et noirs. Ils vont de stop à stop."],['k12',.5,'À pied aussi',"Les traversées piétonnes se font dans les cheminements piétons réservés. Les passagers ne vont à pied que de l'aérogare à l'avion, par les accès aménagés."],['k12',.9,'Les dangers','Le souffle, l\'aspiration, les hélices moteur tournant.']]);
const VOLANT=[
 {ph:'vc1',line:'k13',bk:[5],fixed:1,q:"Un stop devant la voie avion, rien en vue. Je fais quoi ?",o:[["Je marque le stop, je regarde des deux côtés, je traverse.",1,"Le stop se marque toujours, même quand rien ne vient. Puis on traverse sans traîner."],["Je ralentis et je passe, la voie est libre.",0,"Un stop se marque, toujours. Ralentir n'est pas s'arrêter."],["J'attends qu'un avion passe pour être sûr.",0,"Non : on marque le stop, on vérifie, et on traverse. Rester sur la traversée est un risque."]]},
 {ph:'vc2',line:'k14',bk:[3],fixed:1,q:"Un avion arrive sur la voie. Je fais quoi ?",o:[["Je m'arrête et j'attends qu'il soit passé, puis je garde mes distances.",1,"Priorité absolue à l'avion. Et derrière lui, trois longueurs d'appareil."],["Je passe vite, il est encore loin.",0,"Jamais. Priorité absolue aux aéronefs, et on anticipe le temps de traversée."],["Je passe au pas pour ne pas le gêner.",0,"Au pas ou vite, on ne s'engage pas devant un avion en mouvement."]]},
 {ph:'vc3',line:'k15',bk:[5],fixed:1,q:"Les feux rouges de la traversée sont allumés. Je fais quoi ?",o:[["Arrêt obligatoire avant la ligne d'effet, traversée interdite.",1,"Feu rouge : traversée interdite. On attend l'orange clignotant."],["Je marque le stop, puis je traverse avec vigilance.",0,"Ça, c'est pour l'orange clignotant, ou des feux éteints. Au rouge, on ne traverse pas."],["Je traverse, les feux sont là pour les piétons.",0,"Non : ces feux protègent la traversée de la voie avion. Rouge, on s'arrête."]]},
 {ph:'vc4',line:'k16',bk:[14],fixed:1,q:"Brouillard épais. Je fais quoi ?",o:[["Je diffère mon déplacement, sauf extrême nécessité.",1,"En faible visibilité, on ne circule qu'en cas d'extrême nécessité, et on adapte sa conduite."],["Je continue en allumant mes feux de route.",0,"Les feux de route sont interdits sur l'aire de trafic, et le brouillard impose de différer."],["Je continue au pas, en écoutant.",0,"Écouter est une bonne habitude. Mais la règle, c'est de différer, sauf extrême nécessité."]]},
 {ph:'vc5',line:'k17',bk:[5],fixed:1,q:"Route à accès restreint, et je n'y ai pas de mission. Je fais quoi ?",o:[["Je ne m'y engage pas.",1,"Sans mission, l'accès restreint vous est fermé, même avec le permis T."],["Je passe, j'ai le permis T.",0,"Le permis T ne suffit pas : il faut une mission qui justifie l'accès."],["Je passe doucement, c'est un raccourci.",0,"Ces routes sont restreintes pour éviter les incursions sur les pistes. Pas de raccourci."]]},
 {ph:'vc6',line:'k18',bk:[5],fixed:1,q:"Un triangle au sol. Il m'annonce quoi ?",o:[["Une traversée de voie avion, ou un cédez-le-passage.",1,"Le triangle annonce une traversée de voie de circulation avion, ou un cédez-le-passage derrière un poste."],["La fin de la zone 30.",0,"La fin de zone 30 est un panneau, pas un triangle au sol."],["Un emplacement de stationnement.",0,"Le stationnement se marque autrement. Le triangle, c'est une traversée ou un cédez-le-passage."]]},
 {ph:'vc7',line:'k19',bk:[3],fixed:1,q:"Dans cette situation, le véhicule blanc peut-il traverser la voie de circulation avion ?",o:[["Oui.",0,"Non : un avion arrive sur la voie. Priorité absolue."],["Non.",1,"Un avion arrive sur la voie : le véhicule attend qu'il soit passé."],["Oui, uniquement s'il accélère.",0,"On n'accélère jamais pour passer devant un avion."]]}];
async function volant(){step();head(H5+' · 6 h 32','Au volant : stop, ou je passe ? À vous');
 // les sept situations sont filmées et lues : en cas d'échec, elles reviennent dans un autre ordre
 return quiz('vol',mix('vol',VOLANT),'6 h 32','Au volant : sept situations',[5],6,true)}

/* 4. les points chauds (diapos 165 à 169) : l'apprenant clique chaque cercle rouge */
async function chaud(ph,cap,id,spots){step();await photo(ph,FAST?10:500);setCam({mode:'contain'});await vzOff();
 const L=label([0,0,0],{lead:false}).title('Les points chauds');L.card(cap,'',{a:null});
 await sayS(id);L.card(cap,`Cliquez sur chaque point chaud entouré de rouge (${spots.length}).`,{a:null});
 let n=0;const Ts=[];await Promise.all(spots.map(([x,y])=>target(pt(x/100,y/100),'',{delay:300,ref:T=>Ts.push(T)}).then(T=>{T.kill('ok');n++;L.card(cap,n<spots.length?`Encore ${spots.length-n}.`:'Les zones de vigilance de ce secteur.',{a:null})})));
 Ts.forEach(T=>T.kill());await cont(L);L.kill();return null}
const hot1=()=>chaud('hot1','Autour du terminal 1','k20',[[57,35],[22.5,75],[80.5,62],[73,76],[87.5,82]]);
const hot2=()=>chaud('hot2','Terminaux A et C','k21',[[54.5,76],[76.5,73]]);
const hot3=()=>chaud('hot3','Cargo sud','k22',[[55.5,57],[42.5,74.5]]);
const hot4=()=>chaud('hot4','Autour du BD et du 2E','k23',[[13.5,38],[27.5,26],[27.5,38.5],[81.5,67]]);

/* 5. les risques moteurs (diapos 170 à 172) */
const moteurs=S('moteurs','Les dangers moteurs',['k24'],[['k24',.3,'Aspiration : 15 mètres','Devant les réacteurs.'],['k24',.55,"Souffle : trois longueurs d'appareil",'Derrière les réacteurs au roulage.'],['k24',.9,'Les projectiles',"Derrière un avion moteurs tournants : d'où la vérification du poste, propre de tout objet, avant et après l'arrivée."]]);
const helices=S('helices','Les hélices',['k25','k26'],[['k25',.3,'4 mètres minimum','Devant les hélices.'],['k25',.6,"Attendre l'arrêt complet",'Avant de pénétrer sur le poste.'],['k25',.9,'Silencieuses, mais elles tournent encore',"Silencieuses surtout après l'arrêt des moteurs, elles tournent encore. Une hélice qui tourne ne se voit pas."],['k26',.6,'Les hélicoptères','Même vigilance.']]);

/* 6. les bonnes pratiques (diapos 173 à 185) */
const pratiques=S('brume','Les bonnes pratiques',['k28','k29'],[['k28',.15,'Stationnement','Freins serrés, moteur éteint.'],['k28',.3,'Feux','Feux de position ou de croisement.'],['k28',.4,'Gyrophares','Interdits.'],['k28',.5,'Météo','Adapter : nuit, neige, verglas.'],['k28',.6,'Convois','Respecter la longueur.'],['k28',.7,'Faible visibilité','Conscience de la situation.'],['k28',.8,'Recul','Les règles de la marche arrière.'],['k28',.9,'Chargement','Une conduite adaptée au chargement.'],['k29',.6,'Et toujours','Téléphoner ou conduire, il faut choisir. Ceinture attachée. Limitations respectées.']]);
const visib=S('vc4','En faible visibilité',['k30'],[['k30',.4,'Différer ses déplacements',"Ne circuler qu'en cas d'extrême nécessité."],['k30',.7,'Adapter sa conduite','Au risque météorologique : visibilité, nuit.'],['k30',.95,'30 km/h, au pas sur les postes','Les feux de route sont interdits en toute circonstance.']]);
const recul=S('recul','La marche arrière',['k31'],[['k31',.4,'Toujours guidée','Par une caméra véhicule ou un personnel qualifié.'],['k31',.8,'Sans visibilité, une vigie','Obligatoire pour guider la marche arrière.']]);
const accidents=S('accidents','Les accidents sur Roissy',['k32','k33'],[['k32',.3,'Août 2010, croisement voie Uniform','Respectez la priorité et la zone 30.'],['k32',.55,'Sortie de la caserne des pompiers de CDG2','Un stop face au C5 protège la sortie des véhicules d\'intervention.'],['k32',.8,'Avril 2009, croisement voie Alpha',"Respectez les véhicules d'intervention prioritaires en sortie de traversée."],['k33',.3,'Traversée de la voie E','Un tunnel a été créé.'],['k33',.8,'Collision bus et réacteur',"Sept blessés légers, 600 000 euros de dégâts. Quelques secondes d'inattention."]]);
const a380=S('a380',"Ça n'arrive pas qu'aux autres",['k34','k35'],[['k34',.3,'Juillet 2024','Collision entre un A380 et une passerelle au poste CFW.'],['k34',.7,"Ce qui s'est passé","L'A380 est entré sur le poste alors que les passerelles étaient en position de stationnement. Un moteur a heurté une passerelle."],['k35',.6,'La règle',"Certains postes demandent de prépositionner ou de dégager une passerelle avant l'arrivée. C'est écrit dans les consignes particulières d'exploitation du poste."]]);
async function info2(){step();head(H5,"L'information des conducteurs");
 vue(`<div class="duo2"><div class="card2 it" id="i1">${IC.radio}<p class="lb">Un correspondant par société</p><p class="tx" style="max-width:none;margin:0">${nb("Chaque société de la plateforme nomme un ou plusieurs correspondants, chargés de diffuser les nouvelles informations et procédures aux conducteurs.")}</p></div>
  <div class="card2 it" id="i2">${IC.doc}<p class="lb">Comment</p><p class="tx" style="max-width:none;margin:0">${nb("Affichage dynamique dans les salles de repos. Notes d'information remises en main propre, contre émargement. Formation théorique et pratique avec un formateur.")}</p></div></div>`);
 await sayS('k36',[at('k36',.05,()=>show('#i1',true)),at('k36',.6,()=>show('#i2',true))]);undim();
 await contV();return null}
const degivrage=S('degivrage','Dégivrage et chargement',['k37'],[['k37',.4,'Les baies de dégivrage','Connaître les règles de circulation sur les baies de dégivrage, et leurs voies d\'accès.'],['k37',.8,'Le chargement','Adapter votre conduite en fonction de votre chargement.']]);

/* 7. la question du chapitre (diapo 186) */
async function question(){step();head(H5+' · 6 h 46',"Une question d'entraînement");ALT.q5b=1;const two=(TRY.q5b||0)%2;
 const Q=two?[{bk:[11],q:"Quelle est la distance de sécurité à respecter en passant en voiture derrière un avion en mouvement ?",o:[["100 mètres.",0,"La distance se compte en longueurs d'appareil : trois, derrière un avion en mouvement."],["Trois fois la longueur de l'avion.",1,"Le souffle des réacteurs au roulage : trois longueurs d'appareil derrière l'avion."],["Aucune.",0,"Derrière un avion en mouvement, on garde toujours trois longueurs d'appareil."]]}]
  :[{ph:'feuxrouges',line:'k38',bk:[5],fixed:1,q:"Que dois-je faire lorsque j'aperçois ce type de feu sur un cheminement véhicule en traversant une voie de circulation avion ?",o:[["Je marque le stop, puis je traverse avec vigilance.",0,"Feux rouges allumés : la traversée est interdite. On attend l'orange clignotant."],["Je traverse avec vigilance.",0,"Non : au rouge, on s'arrête avant la ligne d'effet."],["Je marque le stop et j'attends que le feu passe à l'orange clignotant pour traverser avec vigilance.",1,"Rouge : arrêt. Orange clignotant : on traverse avec prudence, en cédant le passage."]]}];
 return quiz('q5b',Q,'6 h 46',"Question d'entraînement",[5],20,true)}

/* 8. fin */
async function fin(){step();head('Étape 5 terminée · 6 h 50','Cinquième case cochée');
 const ET=['La réglementation','Le zonage et la cartographie',"L'accès au côté piste","L'inspection du véhicule",'La circulation des véhicules',"Les règles de sécurité sur l'aire de mouvement","La circulation autour de l'avion","L'aire de manœuvre","Les procédures d'urgence","L'amélioration continue de la sécurité"];
 vue(`<div class="hero"><div class="pmini" id="pmn"><b>T</b>${ET.map((e,i)=>`<i class="${i<4?'now':''}">${i<4?'✓':i+1}</i>`).join('')}</div>
  <p class="cap" id="fc1" style="margin-top:clamp(6px,1.6vh,14px);font-size:clamp(22px,2.2vw,32px)">Prochaine étape : la sécurité sur l'aire de mouvement</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de l'étape</p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('k39',[at('k39',.02,()=>{const i=$c('#pmn i:nth-of-type(5)');i.classList.add('now');i.innerHTML='✓'})]);
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Étape 6 · La sécurité sur l'aire de mouvement</a>`}
const NEXT='etape6.html';
runSeq([['Couverture',cover],['Cinq règles à respecter',cinq],["Les zones d'attente",attente],['La priorité',priorite],['Feux anticollision allumés',anticol],
 ['Traverser une voie de circulation avion',traverse],['Au volant ? À vous',volant],
 ['Points chauds : terminal 1',hot1],['Points chauds : terminaux A et C',hot2],['Points chauds : cargo sud',hot3],['Points chauds : BD et 2E',hot4],
 ['Les dangers moteurs',moteurs],['Les hélices',helices],['Les bonnes pratiques',pratiques],['En faible visibilité',visib],['La marche arrière',recul],
 ['Les accidents sur Roissy',accidents],["Ça n'arrive pas qu'aux autres",a380],["L'information des conducteurs",info2],['Dégivrage et chargement',degivrage],
 ["Question d'entraînement",question],["Fin de l'étape",fin]]);
