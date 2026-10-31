/* ---------------- Étape 5 · La circulation des véhicules, première partie : les principes généraux (diapos 90 à 149) ----------------
   Voix c01 à c64 existantes. Photos du support et images du PowerPoint. Questions : seuil de 50 %, retour ciblé, seconde série (QCM REM et test Groupe ADP). */
const H5='Étape 5 · La circulation des véhicules';
Object.assign(IC,{check2:'<svg class="ic" viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="32" rx="6"/><path d="M16 24l6 6 11-12"/></svg>'});
var CAPS={c5a:'Photo du support REM Formation'};

/* 1. la couverture */
async function cover(){step();await photo('c5a',FAST?10:1200);setCam({zoom:1.08});
 const L=label([0,0,0],{big:1,lead:false}).title('Étape 5 · 6 h 00').card('Je prends le volant','La circulation des véhicules côté piste. Le chapitre le plus long de la formation.');
 await cont(L,"C'est parti");try{const a=jload();delete a[ETAPE];localStorage.setItem(JK,JSON.stringify(a))}catch(e){}
 await sayS('c01');
 await sayS('c02',[at('c02',.02,()=>L.card('« Le code de la route, je le connais déjà. »','Xavier'))]);
 await sayS('c03',[at('c03',.02,()=>L.card("Il s'applique ici aussi","Et l'arrêté préfectoral ajoute ses règles : chapitre 3, article 27, adapter sa conduite aux risques et aux points sensibles.")),
  W('c03','Deux parties',()=>L.card('Le programme de l\'étape 5','Les principes généraux, puis les risques sur l\'aire de mouvement et les bonnes attitudes.'))]);
 await cont(L,'Démarrer');L.kill();return null}

/* un écran sur photo : chaque carte arrive quand la voix en parle ; Xavier est cité */
async function infoS(d){step();if(d.head)head(H5,d.head);await photo(d.ph,FAST?10:500);setCam({mode:'contain'});await vzOff();
 const L=label([0,0,0],{lead:false}).title(d.cap);
 for(const id of d.lines){if(LINES[id].w==='X'){await sayS(id,[at(id,.02,()=>L.card(`« ${LINES[id].t} »`,'Xavier',{a:null}))]);continue}
  await info(L,id,(d.cards||[]).filter(c=>c[0]===id).map(c=>[c[1],c[2],c[3]||'',{a:null}]))}
 await cont(L);L.kill();return null}
const S=(ph,cap,lines,cards,head)=>()=>infoS({ph,cap,lines,cards,head});

/* 2. l'alphabet aéronautique (diapo 93) */
const ALPHA=[["A","Alfa"],["B","Bravo"],["C","Charlie"],["D","Delta"],["E","Echo"],["F","Foxtrot"],["G","Golf"],["H","Hotel"],["I","India"],["J","Juliett"],["K","Kilo"],["L","Lima"],["M","Mike"],["N","November"],["O","Oscar"],["P","Papa"],["Q","Quebec"],["R","Romeo"],["S","Sierra"],["T","Tango"],["U","Uniform"],["V","Victor"],["W","Whiskey"],["X","X-ray"],["Y","Yankee"],["Z","Zulu"]];
async function alphabet(){step();head(H5,"L'alphabet aéronautique international");
 vue(`<div class="alw"><div class="alpha">${ALPHA.map(([l,m])=>`<div><b>${l}</b><span>${m}</span></div>`).join('')}</div>
  <div class="alex"><span class="it" id="ax1">Poste S31 = <b>Sierra Trois Unité</b></span><span class="it" id="ax2">Immatriculation SPT = <b>Sierra Papa Tango</b></span></div></div>`);
 await sayS('c04',[W('c04','Le poste',()=>show('#ax1')),W('c04',"L'immatriculation",()=>show('#ax2'))]);
 await sayS('c05');await sayS('c06');
 await contV();return null}
async function epeler(){step();head(H5+' · 6 h 03',"À vous d'épeler");ALT.ep=1;const two=(TRY.ep||0)%2;
 const Q=two?[{q:"Le poste S31, je l'annonce :",o:[["Sierra Trois Unité",1,"Sierra pour S, puis Trois, puis Unité pour le un."],["Esse Trente et Un",0,"La lettre se dit avec son mot, Sierra, et les chiffres un par un : Trois Unité."],["Sierra Trente et Un",0,"Sierra, c'est juste. Les chiffres se donnent un par un : Trois Unité."]]},
   {q:"L'immatriculation SPT, je l'annonce :",o:[["Sierra Papa Tango",1,"Une lettre, un mot : Sierra, Papa, Tango."],["Esse Pé Té",0,"Chaque lettre se dit avec son mot : Sierra, Papa, Tango."],["Sierra Peter Tango",0,"Le mot de la lettre P est Papa."]]}]
  :[{line:'c07',q:"Le poste D24, je l'annonce :",o:[["Delta Deux Quatre",1,"Delta pour D, puis les chiffres un par un."],["Dé Vingt-Quatre",0,"La lettre se dit avec son mot : Delta. Et les chiffres se donnent un par un."],["Delta Vingt-Quatre",0,"Delta, c'est juste. Mais les chiffres se donnent un par un : Deux Quatre."]]},
   {line:'c08',q:"Le poste K52, je l'annonce :",o:[["Kilo Cinq Deux",1,"Kilo pour K, Cinq, Deux."],["Kilomètre Cinq Deux",0,"Le mot de la lettre K est Kilo, pas kilomètre."],["Charlie Cinq Deux",0,"Charlie, c'est la lettre C. Pour K, on dit Kilo."]]}];
 return quiz('ep',Q,'6 h 03',"À vous d'épeler",[1],2,true)}

/* une série de questions à choix : une réponse, chaque réponse expliquée ; sous 50 %, retour ciblé */
async function quiz(id,Q,h,what,bk,ret,x){let E=0;const MISS=new Set();
 for(let i=0;i<Q.length;i++){const z=Q[i];
  vue(z.ph?`<div class="qimg"><figure class="fig"><img src="${IMG[z.ph]}" alt=""></figure><div class="qc" id="qq"><p class="n">Question ${i+1} sur ${Q.length}</p><p class="q">${nb(z.q)}</p></div></div>`:`<div class="qc" id="qq" style="width:min(760px,100%)"><p class="n">Question ${i+1} sur ${Q.length}</p><p class="q">${nb(z.q)}</p></div>`);
  if(z.line)await sayS(z.line);else await wait(FAST?0:400);
  const qc=$c('#qq');let o=z.o.map((y,k)=>[String(k),y[0]]);if(!z.fixed)for(let a=o.length-1;a>0;a--){const b=Math.floor(Math.random()*(a+1));[o[a],o[b]]=[o[b],o[a]]}
  const gk=String(z.o.findIndex(y=>y[1]));const kot={};z.o.forEach((y,k)=>{if(!y[1]&&y[2])kot[k]=y[2]});
  const e=await pick(null,o,gk,z.o[+gk][2],kot,i<Q.length-1?'Question suivante':'Terminer',{once:true,x:!!x,host:qc});E+=e;if(e)[].concat(z.bk||bk).forEach(k=>MISS.add(k))}
 jlog(h,`${what} : ${Q.length} question${Q.length>1?"s":""}${errTxt(E)}`);return gate(id,E,Q.length,[...MISS].sort((a,b)=>a-b),what,ret)}

/* 3. signalétiques et cheminements (diapos 96 à 115) */
const rds=S('rds','Les routes de service à accès restreint',['c09','c10','c11'],[['c09',.3,'Routes périphériques','Certaines routes de service sont à accès restreint, réservées aux seuls ayants droit.'],['c09',.8,'Exemples','CDG1 vers CDG2, le tunnel vers le terminal 2G depuis le 29 India, les routes de service du Fret Sud au large des aires Mike, November et Papa.'],['c10',.5,'Les ayants droit',"Groupe ADP, les services compétents de l'État, le SNA-RP, et leurs sous-traitants avec une mission qui justifie cet accès."],['c11',.6,'En faible visibilité',"La gendarmerie des transports aériens, les pompiers, le service médical d'urgence, le risque animalier, les Flyco, les balayeuses, la sûreté, les services techniques, et les chantiers autorisés."]],'Les routes et les cheminements');
const carte=S('planpoint','Lire la carte',['c12','c13'],[['c12',.35,'Ligne pointillée','Route de service permis T à accès restreint.'],['c12',.7,'Ligne continue','Route de service permis T.'],['c13',.6,'Les cheminements','Les cheminements permis T sont en lignes continues.']],'Les routes et les cheminements');
const pourquoi=S('planrestreint','Pourquoi un accès restreint',['c14'],[['c14',.4,'Éviter les incursions','Le permis T à accès restreint a été mis en place pour éviter les incursions sur les pistes.'],['c14',.8,'Personnes missionnées','Seules les personnes missionnées sont autorisées à y accéder.']],'Les routes et les cheminements');
const rds2025=S('rds2025','Nouvelle route de service, juin 2025',['c15'],[['c15',.3,'Juin 2025',"Mise en service d'une nouvelle route de service à accès restreint."],['c15',.8,'Elle traverse les voies Bravo et Québec','Deux voies de circulation avion coupées par cette route : vigilance.']],'Les routes et les cheminements');
const zone30=S('zone30','Zone 30',['c16','c17','c18','c19'],[['c16',.4,'Toute la plateforme en zone 30','Seule la route de la ferme, entre le cargo sud et CDG1, est limitée à 50 km/h.'],['c17',.5,'Gyrophares interdits',"L'usage des gyrophares et feux à éclats, de couleur orange, est interdit dans le secteur trafic, sauf engins autorisés."],['c19',.5,'Deux-roues interdits',"Les deux-roues, trottinettes et rollers sont interdits sur l'aire de mouvement."]],'Les routes et les cheminements');
const couleurs=S('chem','Le marquage au sol : les couleurs',['c20'],[['c20',.4,'Blanc','La sécurité de la circulation des véhicules.'],['c20',.65,'Jaune','En rapport avec la sécurité de la circulation des aéronefs.'],['c20',.9,'Rouge','En rapport avec le danger.']],'Le marquage au sol');
const chemins=S('chemin','Les cheminements véhicules',['c21','c22'],[['c21',.3,'Lignes blanches',"Continues ou pointillées, de part et d'autre du cheminement quand il dessert les postes avion."],['c21',.6,'La flèche','Le marquage indique par une flèche le sens de circulation.'],['c22',.5,'Tiretets décalés blancs et noirs',"Vous êtes dans la bande dégagée d'obstacles d'une voie de circulation avion."]],'Le marquage au sol');
const ligne=S('ligne','La ligne de sécurité',['c23','c24'],[['c23',.4,'Une bande blanche continue',"Elle sépare l'aire de trafic de l'aire de manœuvre."],['c23',.8,'Interdiction absolue','Ne jamais franchir la ligne de sécurité avec un permis T.'],['c24',.6,'Ni voie avion, ni aire de manœuvre','Le permis T ne vous y autorise pas, sauf accompagné par un Flyco. Les voies avion se traversent seulement par les traversées marquées.']],'Le marquage au sol');
const PASSE1=[{t:"Un cheminement véhicule en lignes blanches continues.",b:"o",ok:"C'est votre route.",x:"Les lignes blanches continues matérialisent un cheminement permis T : vous passez."},
 {t:"La ligne de sécurité, bande blanche continue, l'aire de manœuvre derrière.",b:"n",ok:"Interdiction absolue de la franchir avec un permis T."},
 {t:"Une route de service en pointillé sur la carte, et je n'ai pas de mission là-bas.",b:"n",ok:"Le pointillé, c'est l'accès restreint : sans mission, on n'y va pas."},
 {t:"Une voie de circulation avion, pour couper au plus court.",b:"n",ok:"Jamais : le permis T n'autorise pas la circulation sur les voies de circulation avion."},
 {t:"Des tiretets décalés blancs et noirs sur mon cheminement.",b:"o",ok:"Vous passez, mais vous êtes dans la bande dégagée d'obstacles : vigilance.",x:"Les tiretets ne sont pas une interdiction : ils signalent la bande dégagée d'obstacles. Vous passez, avec attention."}];
const PASSE2=[{t:"Une route de service en ligne continue sur la carte.",b:"o",ok:"Ligne continue : une route de service permis T. Vous passez."},
 {t:"Une surface herbeuse entre l'aire de trafic et l'aire de manœuvre, pour gagner du temps.",b:"n",ok:"Les surfaces encloses ne sont pas des voies : on n'y roule pas."},
 {t:"Un cheminement permis T autour d'une aérogare, en lignes continues.",b:"o",ok:"Les cheminements permis T sont en lignes continues : c'est votre route."},
 {t:"Une traversée de voie avion dont le feu est rouge.",b:"n",ok:"Feu rouge : traversée interdite, arrêt obligatoire avant la ligne d'effet."},
 {t:"Le tunnel GE, avec un engin de 4,50 m de haut.",b:"n",ok:"La hauteur y est limitée à 4,30 m : vous ne passez pas."},
 {t:"Un cheminement en zone 30, à 30 km/h.",b:"o",ok:"Toute la plateforme est en zone 30 : à cette vitesse, vous passez."}];
async function passe(){step();head(H5+' · 6 h 09','Je passe, ou je ne passe pas ? À vous');
 vue(`<div class="hero nph"><p class="cap">${nb("Avec mon permis T, je passe ?")}</p><p class="sub">Cliquez sur la bonne colonne.</p></div>`);
 await sayS('c25');
 const E=await sortV(alt('pas',PASSE1,PASSE2),[['o','Je passe','check2'],['n','Je ne passe pas','warn']],{label:'Situation',id:'pas'});
 jlog('6 h 09',`Je passe ou je ne passe pas : 6 situations${errTxt(E)}`);return gate('pas',E,6,[4,7,9,10],'Je passe ou je ne passe pas',11)}

/* 4. la sécurité : signalisation, vitesse, stationnement (diapos 115 à 125) */
const signal=S('prioritepanneau','La signalisation',['c26'],[['c26',.4,'Priorité absolue aux avions',"Circulation interdite en présence d'un avion en déplacement."],['c26',.8,'Le stop','Les stops se marquent, toujours.']],'La signalisation');
const vitesse=S('tunnelge','La vitesse',['c27','c28','c29'],[['c27',.4,'Tunnel GE','Vitesse limitée à 30 km/h, hauteur à 4,30 m, largeur à 4,50 m.'],['c28',.4,'Zone 30 sur toute la plateforme','Seule la route de la ferme est à 50 km/h. Zone 30 aussi sur les cheminements autour du terminal 1.'],['c29',.4,'Le code de la route s\'applique',"La vitesse est fixée pour l'aire de trafic et l'aire de manœuvre par l'arrêté préfectoral et la signalisation."],['c29',.85,'Sauf les secours',"Les limitations ne s'appliquent pas aux véhicules incendie et de sauvetage en mission ou à l'entraînement."]],'La sécurité');
const zblanc=S('zblanc','Le stationnement : les zébras blancs',['c30'],[['c30',.5,'Zébras blancs',"Le long de certains cheminements : zone de collision possible avec les aéronefs, compte tenu de leur envergure. Ils font partie des bandes aéronautiques."],['c30',.9,'Ni circuler, ni stationner','On ne circule pas et on ne stationne pas sur ces marquages.']],'La sécurité');
const zbleu=S('zbleu','Le stationnement : où c\'est interdit',['c31','c32'],[['c31',.25,'Hors des emplacements désignés',"Interdit en dehors des emplacements désignés par le gestionnaire de l'aéroport."],['c31',.55,'Devant le poste avion, sur les passages piétons','Pour ne pas gêner le camion avitailleur, ni les piétons.'],['c31',.9,"Devant les équipements d'urgence","Arrêts d'urgence, sorties d'hydrant, téléphones de piste, et les opérations d'escale."],['c32',.6,'Zébras bleus sur fond blanc','La zone de transfert des personnes à mobilité réduite. Ni stationner, ni déposer de matériel.']],'La sécurité');
const zrouge=S('zrouge','Le stationnement : jaune, rouge, et le carré',['c33','c34'],[['c33',.3,'Zébras jaunes',"Les points d'arrêt des bus de transfert des passagers. Ni stationner, ni déposer de matériel."],['c33',.7,'Emplacements réservés',"Le matériel non utilisé pendant la touchée se gare hors de la zone d'évolution contrôlée, sur les emplacements réservés."],['c34',.4,'Zébras rouges',"La zone d'évolution des passerelles télescopiques. On n'y circule pas pendant le déplacement, on n'y stationne pas."],['c34',.8,'Carré blanc rayé noir',"L'emplacement de stationnement de la passerelle."]],'La sécurité');
const ZEB=[['aero','Bandes aéronautiques'],['pmr','Transfert des personnes à mobilité réduite'],['bus','Arrêt des bus passagers'],['pass','Passerelles télescopiques']];
const ZB1=[{t:"Des zébras blancs le long du cheminement.",b:"aero",ok:"Ils font partie des bandes aéronautiques : collision possible avec les ailes."},
 {t:"Des zébras bleus sur fond blanc, au pied de l'aérogare.",b:"pmr",ok:"La zone de transfert des personnes à mobilité réduite."},
 {t:"Des zébras rouges devant une passerelle.",b:"pass",ok:"La zone d'évolution de la passerelle télescopique."},
 {t:"Des zébras jaunes au bord du cheminement.",b:"bus",ok:"Le point d'arrêt des bus qui transfèrent les passagers."},
 {t:"Un carré blanc rayé de noir.",b:"pass",ok:"L'emplacement où la passerelle se gare."}];
const ZB2=[{t:"On n'y circule pas pendant que la passerelle se déplace.",b:"pass",ok:"Les zébras rouges : la zone d'évolution des passerelles télescopiques."},
 {t:"Collision possible avec l'aile d'un aéronef, compte tenu de son envergure.",b:"aero",ok:"Les zébras blancs, qui font partie des bandes aéronautiques."},
 {t:"Le bus de transfert des passagers s'y arrête.",b:"bus",ok:"Les zébras jaunes : les points d'arrêt des bus."},
 {t:"On y accompagne les personnes à mobilité réduite.",b:"pmr",ok:"Les zébras bleus sur fond blanc, au niveau des aérogares."},
 {t:"La passerelle s'y gare.",b:"pass",ok:"Le carré blanc rayé de noir : l'emplacement de stationnement de la passerelle."}];
async function zebras(){step();head(H5+' · 6 h 13','Les zébras : qui est quoi ? À vous');
 vue(`<div class="hero nph"><p class="cap">${nb("Ce marquage signale…")}</p><p class="sub">Cliquez sur la bonne colonne.</p></div>`);
 await sayS('c35');
 const E=await sortV(alt('zb',ZB1,ZB2),ZEB,{label:'Marquage',id:'zb'});
 jlog('6 h 13',`Les zébras et leurs couleurs${errTxt(E)}`);return gate('zb',E,5,[14,15,16],'Les zébras',17)}

/* 5. dispositif lumineux, traversées, circulation (diapos 126 à 149) */
const feux=S('feuxrouges','Le dispositif lumineux',['c36','c37','c38'],[['c36',.35,'Feu rouge',"Traversée interdite : arrêt obligatoire avant la ligne d'effet."],['c36',.6,'Feu orange',"Arrêt imminent, ne pas s'engager."],['c36',.85,'Orange clignotant','Traverser avec prudence, céder le passage.'],['c38',.3,'Éteint','En panne : on marque le stop, et on traverse avec prudence et vigilance.']],'La sécurité');
const croise=S('croisement','Feux de croisement, priorité, convois',['c39','c40'],[['c39',.3,'Feux de croisement seulement',"De jour comme de nuit sur l'aire de trafic."],['c39',.7,'La priorité','En toutes circonstances aux avions en mouvement, aux piétons, et aux véhicules de secours ou de sauvetage en intervention.'],['c40',.6,'Convoi : 22 m ou 4 chariots',"Tracteur compris. Attention aux déviations de trajectoire de l'attelage."]],'La sécurité');
const dstop=S('dstop','Le double stop',['c41','c42','c43'],[['c41',.2,'Deux stops consécutifs','Pour traverser une voie de circulation avion.'],['c41',.5,'Le premier stop','Il protège l\'arrivée et le départ des aéronefs sur les postes voisins.'],['c41',.75,'Le second stop','Il protège la voie de circulation avion.'],['c42',.6,'Pas de petit train','On attend que le véhicule devant ait fini sa traversée.'],['c43',.7,'Où ?','A04, A01, A09, C14, C02, B24, D24.']],'La traversée des voies avion');
const zecdeb=S('zec',"Quand la zone d'évolution contrôlée déborde",['c44'],[['c44',.4,'Zone active','Feux anticollision allumés, avion non calé, ou moteurs tournants : circulation des véhicules interdite.'],['c44',.75,'Le cédez-le-passage avion','Vous devez obligatoirement marquer un arrêt au niveau de ce marquage.'],['c44',.95,'Zone inactive','Circulation autorisée.']],'La traversée des voies avion');
const triangle=S('triangle','Le triangle',['c45'],[['c45',.35,'Une traversée de voie avion',"Le triangle indique la présence d'une traversée d'une voie de circulation avion."],['c45',.8,'Ou un cédez-le-passage',"Au croisement d'un cheminement véhicule derrière un poste avion, comme le cheminement extérieur de CDG1."]],'La traversée des voies avion');
const vcv=S('vcv','La voie derrière les postes avion',['c46','c47'],[['c46',.35,'Pendant la touchée seulement','Cette voie sert au moment de la touchée, pour la coactivité autour du poste.'],['c46',.7,"De la droite vers la gauche de l'avion","On y circule autour de l'avion, de sa droite vers sa gauche."],['c47',.6,'La mire',"Les mires guident l'avion jusqu'à son point de parking. Évitez de vous garer face à la mire."]],'La traversée des voies avion');
const gabarit=S('gabarit','Les voies hors gabarit',['c48','c49'],[['c48',.5,'Hors gabarit','Plus de 4,30 m de hauteur, plus de 4,50 m de largeur, ou plus de 50 tonnes.'],['c48',.85,'Des voies dédiées',"Au-delà de 50 tonnes, ils ne peuvent pas emprunter les ponts. Ils suivent les voies hors gabarit."],['c49',.6,'Les surfaces encloses',"Entre les aires de trafic et de manœuvre, surtout des surfaces herbeuses. On n'y roule pas."]],'La circulation');
const t1=S('t1cdg','Autour du terminal 1',['c50','c51','c52'],[['c50',.4,'Deux voies avion','Une voie extérieure et une voie intérieure. Le satellite reste toujours à la gauche du commandant de bord.'],['c51',.45,'Les cheminements','Extérieur : sens unique, dans le sens horaire. Intérieur : double sens.'],['c51',.85,'Autour des satellites','Sens unique, dans le sens antihoraire. Hauteur limitée à 3,50 m.'],['c52',.6,'Attention au poste 5',"S'il est libre, un avion peut venir y stationner : regardez la balise avant de poursuivre vers le stop."]],'La circulation');
const satel=S('t1','Les satellites et la jetée Uniform',['c53'],[['c53',.5,'Huit postes par satellite','Sauf la jetée Uniform, entre le satellite 1 et le satellite 3 : douze postes à l\'extérieur, U06 à U17, et trois à l\'intérieur, U03 à U05.'],['c53',.9,'Deux accès','Par le cheminement intérieur, et par le cheminement extérieur entre U10 et U11.']],'La circulation');
const s3s4=S('s3s4','Autour des satellites A, S3 et S4',['c54'],[['c54',.25,'Satellite A','Sens unique, antihoraire.'],['c54',.6,'S3','Sens unique pour les postes E01 à E29, K71 à K53 et F01 à F15. Double sens de K21 à K01.'],['c54',.9,'S4','Double sens, sauf sous la péninsule de correspondance, de K44 à K52.']],'La circulation');
const autour=S('autour',"Autour de l'avion",['c55'],[['c55',.3,'Dans le sens horaire','Avant droite, avant gauche, arrière droite, arrière gauche.'],['c55',.55,'Au pas','Les véhicules avancent en position basse.'],['c55',.75,"Avant l'élévation",'Le véhicule doit être freiné, les béquilles baissées.'],['c55',.95,'Marche arrière guidée','Par un personnel ou par une caméra.']],'La circulation');
const anticoll=S('anticoll','Les feux anticollision',['c56','c57','c58'],[['c56',.3,'Feux allumés','Mise en route imminente des moteurs : circuler à pied ou en véhicule devient dangereux.'],['c56',.6,"Trois longueurs d'appareil",'La distance minimale derrière un aéronef en mouvement.'],['c56',.8,'Une longueur',"Avion arrêté, à la mise en route : la zone d'évolution contrôlée doit être dégagée de tout matériel."],['c58',.6,'15 mètres',"La violence de l'aspiration est un grand danger jusqu'à 15 mètres devant le réacteur."]],'La circulation');
const avant=S('avant','Avant de pénétrer sur le poste',['c59'],[['c59',.3,'Avion calé et feux éteints',''],['c59',.6,'Attendre le signe','Le pouce levé du responsable de zone avion.'],['c59',.85,'Circulation dans le sens horaire','']],'La circulation');
const vigie=S('vigie','La vigie',['c60'],[['c60',.4,"À l'arrivée","Sécuriser le poste avion pour faciliter le placement de l'aéronef à son point de parking."],['c60',.8,'Au départ',"Sécuriser le poste avion pour faciliter le repoussage de l'aéronef sur la voie."]],'La circulation');

/* 6. les questions d'entraînement (diapo 186 et test Groupe ADP) */
async function questions(){step();head(H5+' · 6 h 22',"Questions d'entraînement");ALT.q5=1;const two=(TRY.q5||0)%2;
 const Q=two?[{bk:[18,20],q:"Quels sont les mobiles qui ont une priorité absolue sur une voie de circulation avion, taxiway ou taxilane ?",o:[["Les avions.",0,"Pas seulement : les véhicules et engins qui circulent sur la voie avion sont prioritaires eux aussi."],["Les avions, ainsi que tous les véhicules et engins autorisés à circuler sur une taxiway ou une taxilane.",1,"Les avions et les véhicules qui circulent sur la voie sont toujours prioritaires."],["Les tracteurs avions.",0,"Pas seulement : les avions et tous les véhicules et engins qui circulent sur la voie avion sont prioritaires."]]},
   {bk:[13],q:"Quelle est la vitesse maximale sur la plateforme, en dehors de la route de la ferme ?",o:[["30 km/h",1,"Toute la plateforme est en zone 30. Seule la route de la ferme est à 50."],["40 km/h",0,"Toute la plateforme est en zone 30 : 40 km/h, c'est trop."],["50 km/h",0,"50 km/h, c'est seulement la route de la ferme. Partout ailleurs, zone 30."]],fixed:1},
   {bk:[25],q:"Quel est le sens de circulation des véhicules sur les cheminements intérieurs du terminal 1 ?",o:[["Le sens des aiguilles d'une montre.",0,"Ça, c'est le cheminement extérieur. L'intérieur est à double sens."],["À double sens.",1,"Le cheminement intérieur de CDG1 est à double sens ; l'extérieur est à sens unique, dans le sens horaire."],["Le sens inverse des aiguilles d'une montre.",0,"L'intérieur est à double sens ; l'extérieur tourne dans le sens horaire."]],fixed:1}]
  :[{line:'c61',bk:[18,20],fixed:1,q:"Lorsque je traverse une voie de circulation avion (taxiway ou taxilane) par un cheminement véhicule, je dois :",o:[["Accélérer pour ne pas perdre de temps.",0,"Jamais. On marque les stops et on laisse la priorité."],["Obligatoirement laisser la priorité aux avions et aux véhicules de service.",1,"La priorité est absolue aux avions, et aux véhicules de service qui circulent sur la voie."],["Ralentir pour ne pas gêner les avions.",0,"Ralentir ne suffit pas : on s'arrête aux stops et on laisse la priorité."]]},
   {line:'c62',bk:[8,9],fixed:1,q:"Comment sont matérialisés les cheminements véhicules et les routes de service autour des terminaux ?",o:[["Par des bandes jaunes et noires.",0,"Le jaune concerne la circulation des aéronefs, pas la vôtre."],["Par des pointillés bleus sur une ligne blanche continue.",0,"Le bleu, ce sont les zébras de transfert des personnes à mobilité réduite."],["Par des bandes blanches continues.",1,"Le blanc, c'est la sécurité de la circulation des véhicules : lignes blanches continues."]]},
   {line:'c63',bk:[25],fixed:1,ph:'q5t1',q:"Quel est le sens de circulation des véhicules et engins sur les cheminements routiers extérieurs du terminal 1 (en rouge sur le visuel) ?",o:[["Le sens des aiguilles d'une montre.",1,"Le cheminement extérieur de CDG1 est à sens unique, dans le sens horaire."],["À double sens.",0,"C'est le cheminement intérieur qui est à double sens."],["Le sens inverse des aiguilles d'une montre.",0,"L'antihoraire, c'est autour des satellites. L'extérieur est dans le sens horaire."]]}];
 return quiz('q5',Q,'6 h 22',"Questions d'entraînement",[19],32,true)}

/* 7. fin de la première partie */
async function fin(){step();head('Étape 5 · 6 h 25','Les principes sont posés');
 vue(`<div class="hero nph"><p class="cap">La case cinq n'est pas encore cochée</p><p class="sub">Il reste la seconde partie : les risques sur l'aire de mouvement et les bonnes attitudes.</p>
  <div class="jcard" style="margin-top:clamp(6px,1.6vh,14px)"><p class="lb">Votre journal de l'étape</p><ul class="jl">${jhtml(false)}</ul></div></div>`);
 cur().classList.add('vb');
 await sayS('c64');
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="${NEXT}">Étape 5, suite · Les risques sur l'aire de mouvement</a>`}
const NEXT='etape5b.html';
document.head.insertAdjacentHTML('beforeend',`<style>
.qimg{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:clamp(20px,3vw,48px);align-items:center;width:100%;max-width:1220px}
.qimg .fig{margin:0;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(38,60,82,.16);background:#fff}
.qimg .fig img{display:block;width:100%}
@media (max-width:700px){.qimg{grid-template-columns:1fr;gap:12px}.qimg .fig img{max-height:20vh;width:auto;max-width:100%;margin:0 auto}#vz .stage>.qimg{margin-top:0}}
.alw{width:100%;max-width:1120px;display:flex;flex-direction:column;align-items:center;gap:clamp(12px,2.4vh,22px)}
.alpha{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;width:100%}
.alpha div{background:#fff;border-radius:10px;padding:clamp(8px,1.4vh,14px) 12px;display:flex;gap:10px;align-items:baseline;box-shadow:0 2px 10px rgba(38,60,82,.08)}
.alpha b{font-size:clamp(22px,2.2vw,36px);color:var(--marine);width:1.1em}
.alpha span{font-weight:600;color:#3d4d5c;font-size:clamp(15px,1.4vw,22px)}
.alex{display:flex;gap:clamp(16px,3vw,40px);flex-wrap:wrap;justify-content:center;font-size:var(--B);color:#3d4d5c}
.alex b{color:var(--marine)}
@media (max-width:700px){.alpha{grid-template-columns:repeat(3,1fr);gap:5px}.alpha div{padding:5px 7px;gap:6px}.alpha b{font-size:17px}.alpha span{font-size:13px}.alex{flex-direction:column;gap:6px;align-items:center;font-size:15px}}
</style>`);
runSeq([['Couverture',cover],["L'alphabet aéronautique",alphabet],["À vous d'épeler",epeler],
 ['Les routes de service à accès restreint',rds],['Lire la carte',carte],['Pourquoi un accès restreint',pourquoi],['Nouvelle route de service, juin 2025',rds2025],['Zone 30',zone30],
 ['Le marquage au sol : les couleurs',couleurs],['Les cheminements véhicules',chemins],['La ligne de sécurité',ligne],['Je passe, ou je ne passe pas ? À vous',passe],
 ['La signalisation',signal],['La vitesse',vitesse],['Les zébras blancs',zblanc],["Le stationnement : où c'est interdit",zbleu],['Jaune, rouge, et le carré',zrouge],['Les zébras ? À vous',zebras],
 ['Le dispositif lumineux',feux],['Feux de croisement, priorité, convois',croise],['Le double stop',dstop],["Quand la zone d'évolution contrôlée déborde",zecdeb],['Le triangle',triangle],['La voie derrière les postes avion',vcv],
 ['Les voies hors gabarit',gabarit],['Autour du terminal 1',t1],['Les satellites et la jetée Uniform',satel],['Autour des satellites A, S3 et S4',s3s4],["Autour de l'avion",autour],['Les feux anticollision',anticoll],['Avant de pénétrer sur le poste',avant],['La vigie',vigie],
 ["Questions d'entraînement",questions],["Fin de la première partie",fin]]);
