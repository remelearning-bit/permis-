/* Étape 5 · écran témoin en scène 3D continue : la traversée d'une voie de circulation avion équipée de feux
   Sources : diapo 126 (feux rouges, traversée interdite) et sa note ; diapo 127 (détection automatique des mobiles,
   feu orange, orange clignotant, feu rouge, ligne d'effet) ; diapo 163 (traversée à l'intérieur des tiretets décalés
   blancs et noirs). Voix existantes c36, c37, c38. Vue à la première personne, comme « En panne sur la voie avion ». */
async function traversee(){step();head(H5+' · 5 h 58','Traverser une voie avion');if(innerWidth<700)headOff();
 const host=document.createElement('div');host.id='trav';host.innerHTML='<canvas></canvas><svg class="ld"></svg><div class="ui"></div>';document.body.appendChild(host);
 const cv=host.querySelector('canvas'),ldv=host.querySelector('.ld'),UI=host.querySelector('.ui');
 const R=new THREE.WebGLRenderer({canvas:cv,antialias:true,powerPreference:'high-performance'});R.setPixelRatio(Math.min(devicePixelRatio||1,1.75));
 const scene=new THREE.Scene();const CIEL=0xd3dde3;
 { // ciel : bleu franc en haut, clair à l'horizon
  const c=document.createElement('canvas');c.width=4;c.height=256;const x=c.getContext('2d');const gr=x.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#5f8fb8');gr.addColorStop(.42,'#a9c3d6');gr.addColorStop(.5,'#d3dde3');gr.addColorStop(1,'#d3dde3');x.fillStyle=gr;x.fillRect(0,0,4,256);
  const bt=new THREE.CanvasTexture(c);bt.colorSpace=THREE.SRGBColorSpace;bt.mapping=THREE.EquirectangularReflectionMapping;scene.background=bt}
 scene.fog=new THREE.Fog(CIEL,220,900);
 const cam=new THREE.PerspectiveCamera(55,1,.2,1500);scene.add(cam);
 scene.add(new THREE.HemisphereLight(0xffffff,0x7d8a6a,.85));const sun=new THREE.DirectionalLight(0xfff1dc,1.6);sun.position.set(60,100,50);scene.add(sun);
 { // reflets doux pour la peinture et le métal de l'avion : un ciel clair au-dessus, le sol en dessous
  const c=document.createElement('canvas');c.width=256;c.height=128;const x=c.getContext('2d');const gr=x.createLinearGradient(0,0,0,128);
  gr.addColorStop(0,'#f4f6f7');gr.addColorStop(.48,'#dfe4e6');gr.addColorStop(.52,'#8f978c');gr.addColorStop(1,'#6f756c');x.fillStyle=gr;x.fillRect(0,0,256,128);
  const et=new THREE.CanvasTexture(c);et.mapping=THREE.EquirectangularReflectionMapping;et.colorSpace=THREE.SRGBColorSpace;scene.environment=et}
 const MM={};const mat=c=>MM[c]||(MM[c]=new THREE.MeshLambertMaterial({color:c}));
 const box=(w,h,d,c,x=0,y=0,z=0,p)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(c));m.position.set(x,y,z);(p||scene).add(m);return m};
 const cyl=(r1,r2,h,c,x=0,y=0,z=0,p,seg=16)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg),mat(c));m.position.set(x,y,z);(p||scene).add(m);return m};
 const strip=(x1,z1,x2,z2,w,c,y=.02,p)=>{const L=Math.hypot(x2-x1,z2-z1);const m=new THREE.Mesh(new THREE.PlaneGeometry(L,w),mat(c));m.rotation.x=-Math.PI/2;m.rotation.z=-Math.atan2(z2-z1,x2-x1);m.position.set((x1+x2)/2,y,(z1+z2)/2);(p||scene).add(m);return m};
 const blobTex=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const r=g.createRadialGradient(64,64,4,64,64,62);r.addColorStop(0,'rgba(30,40,50,.42)');r.addColorStop(1,'rgba(30,40,50,0)');g.fillStyle=r;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})();
 const blobM=new THREE.MeshBasicMaterial({map:blobTex,transparent:true,depthWrite:false});
 const blob=(w,d,p,x=0,z=0)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),blobM);m.rotation.x=-Math.PI/2;m.position.set(x,.035,z);p.add(m);return m};
 const BETON=0xb4b6b2,VOIE=0x9a9ea0,BLANC=0xffffff,JAUNE=0xf2b200,MARINE=0x263C52,NOIR=0x16191d,HERBE=0x6e9443,ROUGE=0xd3241a;
 /* la voie de circulation avion, du nord au sud ; le cheminement véhicule qui la traverse, d'ouest en est */
 {const g=new THREE.Mesh(new THREE.PlaneGeometry(1600,1600,80,80),mat(HERBE));g.rotation.x=-Math.PI/2;g.position.y=-.15;scene.add(g)}
 {const t=new THREE.Mesh(new THREE.PlaneGeometry(38,1600,1,80),mat(BETON));t.rotation.x=-Math.PI/2;t.position.y=0;scene.add(t);
  const v=new THREE.Mesh(new THREE.PlaneGeometry(23,1600,1,80),mat(VOIE));v.rotation.x=-Math.PI/2;v.position.y=.02;scene.add(v)}
 strip(0,-800,0,800,.45,JAUNE,.06);strip(-11.6,-800,-11.6,800,.25,JAUNE,.06);strip(11.6,-800,11.6,800,.25,JAUNE,.06);
 for(let z=-780;z<=780;z+=30)if(Math.abs(z)>8)[-12.6,12.6].forEach(x=>{cyl(.12,.12,.35,0x6f7a84,x,.18,z,scene,8);const l=new THREE.Mesh(new THREE.SphereGeometry(.16,8,6),new THREE.MeshBasicMaterial({color:0x3a6fd0}));l.position.set(x,.42,z);scene.add(l)});
 {const r=new THREE.Mesh(new THREE.PlaneGeometry(1600,7,80,1),mat(0x86898c));r.rotation.x=-Math.PI/2;r.position.set(0,.04,0);scene.add(r)}
 // le cheminement hors de la voie : lignes blanches continues
 [[-800,-44.5],[44.5,800]].forEach(([a,b])=>{strip(a,-3.4,b,-3.4,.18,BLANC,.065);strip(a,3.4,b,3.4,.18,BLANC,.065)});
 // dans la traversée : les tiretets décalés, blancs et noirs (diapo 163)
 for(const zz of [-3.4,3.4]){strip(-44.5,zz,44.5,zz,.56,NOIR,.066);for(let x=-44.5;x<44.5;x+=1.5){strip(x,zz-.13,x+.75,zz-.13,.22,BLANC,.07);strip(x+.75,zz+.13,x+1.5,zz+.13,.22,BLANC,.07)}}
 // la ligne d'effet, et le STOP peint avant elle
  {const c=document.createElement('canvas');c.width=512;c.height=256;const g=c.getContext('2d');g.fillStyle=ROUGE_CSS;
  const o=[[150,8],[362,8],[504,70],[504,186],[362,248],[150,248],[8,186],[8,70]];g.beginPath();o.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fill();
  g.fillStyle='#fbfbf8';g.font='bold 150px Barlow, Arial, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('STOP',256,136);
  const tx=new THREE.CanvasTexture(c);tx.anisotropy=8;const sm=new THREE.MeshLambertMaterial({map:tx,transparent:true});
  for(const [x,rz] of [[-48.4,-Math.PI/2],[48.4,Math.PI/2]]){const m=new THREE.Mesh(new THREE.PlaneGeometry(3.6,1.8),sm);m.rotation.x=-Math.PI/2;m.rotation.z=rz;m.position.set(x,.075,0);scene.add(m)}}
 /* les feux de protection de traversée, encastrés dans la chaussée, sur la ligne d'effet */
 const FEUX=[],glowTex=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');const r=g.createRadialGradient(32,32,2,32,32,30);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.35,'rgba(255,255,255,.55)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
 for(const fx of [-44.5,44.5])for(const z of [-2.4,-1.2,0,1.2,2.4]){cyl(.2,.2,.02,0x8a9096,fx,.075,z,scene,20);const d=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,.025,20),new THREE.MeshBasicMaterial({color:0x5b6168}));d.position.set(fx,.085,z);scene.add(d);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xff2a1a,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0}));s.scale.set(1,1,1);s.position.set(fx,.25,z);scene.add(s);FEUX.push({d,s})}
 let feu='off',feuT=0;const COUL={rouge:0xff2a1a,orange:0xff8c1a};
 const setFeu=f=>{feu=f;feuT=performance.now()};
 // au loin : la tour, des bâtiments
 cyl(2.6,3.2,44,0xdedcd6,-260,22,-380);cyl(7,5,6,0x3f6584,-260,47,-380);cyl(7.4,7.4,1.2,0xdedcd6,-260,50.6,-380);
 box(320,16,30,0xe4e2dc,-330,8,160);box(320,5,.4,0x3f6584,-330,9,144.8);box(200,12,40,0xdcdad4,280,6,-220);box(60,22,260,0xe2e0da,340,11,40);box(.4,6,240,0x3f6584,309.8,12,40);
 /* l'avion qui roule sur la voie (même modèle que la démonstration de la panne) */
 const avion=makeAirliner(glowTex);scene.add(avion);blob(9,40,avion,0,-1);blob(36,9,avion,0,2);
 avion.position.set(0,0,-420);let planeV=0,planeOn=false;
 /* notre véhicule : on voit l'intérieur, à la première personne */
 const veh=new THREE.Group();scene.add(veh);veh.position.set(-95,0,0);
 blob(3,6,veh); // on est dans le véhicule : on n'en voit que le tableau de bord
 const IN=new THREE.Group();veh.add(IN);const DASH=0x8d97a0;
 const dash=box(.5,.12,1.9,DASH,1.55,1.0,0,IN);box(.05,.05,1.9,DASH,1.8,1.12,0,IN);
 const CAB=new THREE.Group();IN.add(CAB);box(.06,.06,1.9,DASH,1.3,2.03,0,CAB);[-.93,.93].forEach(z=>{const p=box(.05,.95,.05,DASH,1.57,1.6,z,CAB);p.rotation.z=.5});box(1.9,.45,.05,0x8a949d,.45,.92,-.97,CAB);
 const volant=new THREE.Mesh(new THREE.TorusGeometry(.17,.022,8,24),mat(0x3a434c));volant.position.set(1.22,1.0,-.45);volant.rotation.y=Math.PI/2;volant.rotation.x=.25;IN.add(volant);
 /* caméra à hauteur d'yeux */
 let seatOff=null;const seat=()=>seatOff?new THREE.Vector3(seatOff.x,seatOff.y,seatOff.z):new THREE.Vector3(veh.position.x+.42,1.62,-.45);const camT=new THREE.Vector3(40,.9,-.45);cam.position.copy(seat());
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;let move=null;
 const look=(t,D=1800)=>new Promise(r=>{move={t0:performance.now(),D:FAST?80:D,a:camT.clone(),b:new THREE.Vector3(...t),r}});
 const anims=new Set();const anim=(D,fn)=>new Promise(r=>anims.add({t0:performance.now(),D:FAST?Math.min(D,100):D,fn,r}));
 const ahead=()=>[veh.position.x+40,host.clientWidth<700?-1.4:.4,-.45];
 /* étiquettes accrochées à la scène, repères à cliquer */
 const tags=new Set(),tgts=new Set();
 const proj=v=>{const p=v.clone().project(cam);const r=host.getBoundingClientRect();return {x:(p.x+1)/2*r.width,y:(1-p.y)/2*r.height,ok:p.z<1}};
 function tag(anchor,o={}){const el=document.createElement('div');el.className='tlab';UI.appendChild(el);
  const T={el,a:new THREE.Vector3(...anchor),dy:o.dy??-70,dx:o.dx??-40,
   set(t,s,cls=''){const old=el.querySelector('.tc:not(.out)');if(old){old.classList.add('hid','out');setTimeout(()=>old.remove(),400)}
    const c=document.createElement('div');c.className='tc hid';c.innerHTML=(t?`<p class="t ${cls}">${t}</p>`:'')+(s?`<p class="s">${s}</p>`:'');el.appendChild(c);requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.remove('hid')));return T},
   dock(v=true){T.dk=v;return T},
   kill(){el.style.opacity=0;tags.delete(T);setTimeout(()=>el.remove(),420)}};tags.add(T);return T}
 // sur téléphone, les choix sont listés en bas de l'écran, numérotés comme les repères de la scène
 const CH=document.createElement('div');CH.className='tchs';UI.appendChild(CH);
 function target(p,txt,o={}){return new Promise(res=>{const mob=host.clientWidth<700;const el=document.createElement('button');el.className='ttg'+(o.left?' left':'');
  el.innerHTML=mob?`<i></i><b>${o.n||''}</b>`:`<i></i><span>${txt}</span>`;UI.appendChild(el);let cb=null;
  if(mob){cb=document.createElement('button');cb.className='tch';cb.innerHTML=`<b>${o.n||''}</b><span>${txt}</span>`;CH.appendChild(cb)}
  const T={el,a:new THREE.Vector3(...p),kill(c){const gone=()=>{el.remove();if(cb)cb.remove();tgts.delete(T)};if(c){el.classList.add(c);if(cb)cb.classList.add(c);setTimeout(gone,900)}else gone()}};tgts.add(T);if(o.ref)o.ref(T);
  setTimeout(()=>{el.classList.add('live');if(cb)cb.classList.add('live')},FAST?40:300);
  const hit=()=>{if(!T.d&&el.classList.contains('live')){T.d=1;res(T)}};el.onclick=hit;if(cb)cb.onclick=hit})}
 function layout(){const r=host.getBoundingClientRect(),W=r.width,H=r.height,mob=W<700;let svg='';
  for(const T of tags){const s=proj(T.a);const w=T.el.offsetWidth,h=T.el.offsetHeight;let x,y;
   if(mob){x=12;y=12}else if(T.dk){x=Math.max(16,W*.05);y=128}else{x=s.x+T.dx;y=s.y+T.dy-h}
   x=Math.max(12,Math.min(x,W-12-w));y=Math.max(mob?12:118,Math.min(y,H-90-h));T.el.style.transform=`translate(${x}px,${y}px)`;
   if(!mob&&!T.dk&&s.ok&&s.x>0&&s.x<W&&s.y>0&&s.y<H){const lx=Math.min(Math.max(s.x,x+8),x+Math.min(w,260)),ly=y+h+6;if(s.y>ly+10)svg+=`<line x1="${lx}" y1="${ly}" x2="${s.x}" y2="${s.y}"/>`;svg+=`<circle cx="${s.x}" cy="${s.y}" r="4"/>`}}
  ldv.innerHTML=svg;
  for(const T of tgts){const s=proj(T.a);T.el.style.transform=`translate(${s.x}px,${s.y}px)`;T.el.style.display=s.ok?'':'none';
   const sp=T.el.querySelector('span');if(!sp)continue;const sw=sp.offsetWidth,sh=sp.offsetHeight,w=sw+36;const rt=s.x+w<=W-8,lf=s.x-w>=8;const want=T.el.classList.contains('left')?(lf?'l':rt?'r':'b'):(rt?'r':lf?'l':'b');
   let lx,ly;if(want==='r'){lx=58;ly=30-sh/2}else if(want==='l'){lx=2-sw;ly=30-sh/2}else{lx=Math.max(8-s.x+30,Math.min(30-sw/2,W-8-s.x+30-sw));ly=62}sp.style.left=lx+'px';sp.style.top=ly+'px'}}
 /* boucle de rendu */
 let live=true,last=performance.now(),lastP=performance.now(),follow=null;
 function frame(now){if(!live)return;requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000)*(FAST?8:1);last=now;
  for(const A of [...anims]){const t=Math.min(1,(now-A.t0)/A.D);A.fn(t);if(t>=1){anims.delete(A);A.r()}}
  if(follow&&!move){camT.lerp(new THREE.Vector3(avion.position.x,3,avion.position.z+follow),Math.min(1,dt*3))}
  if(move){const t=Math.min(1,(now-move.t0)/move.D),e=ease(t);camT.lerpVectors(move.a,move.b,e);if(t>=1){const r=move.r;move=null;r()}}
  if(planeOn)avion.position.z+=10*Math.min(.25,(now-lastP)/1000)*(FAST?8:1);lastP=now;
  const bon=Math.floor(now/600)%2===0;avion.userData.beacons.forEach(b=>b.material.opacity=bon?1:.12);
  const blink=((now-feuT)%1000)<650;
  FEUX.forEach(({d,s})=>{let c=null;if(feu==='rouge')c=COUL.rouge;else if(feu==='orange')c=COUL.orange;else if(feu==='clignotant'&&blink)c=COUL.orange;
   if(c){d.material.color.setHex(c);s.material.color.setHex(c);s.material.opacity=1}else{d.material.color.setHex(0x5b6168);s.material.opacity=0}});
  cam.position.copy(seat());cam.lookAt(camT);layout();R.render(scene,cam)}
 function fit(){const r=host.getBoundingClientRect();R.setSize(r.width,r.height,false);const a=r.width/r.height;cam.fov=a<1?Math.min(72,2*Math.atan(Math.tan(27*Math.PI/180)/a)*180/Math.PI):55;cam.aspect=a;cam.updateProjectionMatrix();volant.visible=CAB.visible=a>=1;dash.position.y=a<1?.9:1.0}
 addEventListener('resize',fit);fit();requestAnimationFrame(frame);camT.set(...ahead());
 const drive=x1=>{const x0=veh.position.x,L=Math.abs(x1-x0),V=6.9,A=2.4;const T=L/V+A;const D=T*1000;// profil trapézoïdal : 2,4 s d'accélération et de freinage au total
  const pos=t=>{const tt=t*T,a=A/2,vm=L/(T-a);if(tt<a)return vm*tt*tt/(2*a);if(tt>T-a){const r=T-tt;return L-vm*r*r/(2*a)}return vm*a/2+vm*(tt-a)};
  return anim(D,t=>{veh.position.x=x0+Math.sign(x1-x0)*pos(t);camT.x=veh.position.x+40})};
 if(Q.has('avion')){ // réglage du modèle : vues fixes
  avion.position.set(0,0,0);IN.visible=false;window.__view=(px,py,pz,tx,ty,tz)=>{seatOff={x:px,y:py,z:pz};camT.set(tx,ty,tz)};await new Promise(()=>{})}
 /* ======== le déroulé ======== */
 const L=tag([-44.5,.1,0],{dx:-30,dy:-90});L.set('Le cheminement véhicule','Il croise une voie de circulation avion. On y va.');
 await contV('Rouler jusqu\'à la traversée');
 await drive(-51);
 L.set('Les feux de protection de traversée','Encastrés dans la chaussée, juste après le stop.');
 // la voix présente le dispositif ; chaque état s'allume quand elle le nomme ; un avion passe pendant le rouge
 await sayS('c36',[at('c36',.2,()=>L.set('Détection automatique des mobiles','Quatorze traversées en sont équipées.')),
  at('c36',.338,()=>{setFeu('rouge');L.set('Feu rouge','Traversée interdite. Arrêt obligatoire avant la ligne d\'effet.')}),
  at('c36',.597,()=>{setFeu('orange');L.set('Feu orange','Arrêt imminent : on ne s\'engage pas.')}),
  at('c36',.766,()=>{setFeu('clignotant');L.set('Orange clignotant','Stop, puis on traverse avec prudence, en cédant le passage.')})]);
 // et si les feux sont éteints ?
 setFeu('off');
 await sayS('c37',[at('c37',.02,()=>L.set('Et si les feux sont éteints ?',''))]);
 await sayS('c38',[at('c38',.02,()=>L.set('Feux éteints : ils sont en panne','On marque le stop, et on traverse avec prudence et vigilance.')),
  at('c38',.446,()=>{L.a.set(-12,.1,-30);L.set('Toujours prioritaires','Les avions et les véhicules qui circulent sur les voies avion.');look([0,1.5,-70],1800)})]);
 await look(ahead(),1500);L.a.set(-44.5,.1,0);
 // à vous : un avion arrive, la détection allume les feux
 L.dock().set('À vous','Restez attentif aux feux.');
 avion.visible=true;avion.position.z=-80;planeOn=true;await look([0,3,-60],1500);setFeu('orange');await wait(1300);setFeu('rouge');await look(ahead(),1200);
 L.dock().set('Les feux sont rouges','Un avion arrive sur la voie. Que faites-vous ?');
 const P1=[-45.5,.4,-1.4],P2=[-32,.6,1.2],P3=[-40,.5,2.8];
 // chaque choix : libellé, position dans la scène, bonne ou non, explication
 const ask=async(opts,okT)=>{for(;;){const Ts=[];const ps=opts.map((o,k)=>target(o.p,o.t,{ref:T=>Ts[k]=T,left:o.p===P1,n:k+1}).then(T=>k));
   const k=await Promise.race(ps);const o=opts[k];Ts.forEach((T,q)=>{if(q!==k)T.kill()});Ts[k].kill(o.ok?'ok':'ko');
   if(o.ok){L.set('Oui',okT,'ok');return}L.set('Non',o.fb,'ko');await wait(FAST?60:3200);L.set('À vous','Choisissez de nouveau.')}};
 await ask([{t:"J'attends avant la ligne d'effet",p:P1,ok:1},
  {t:"Je traverse : l'avion est encore loin",p:P2,fb:"Feu rouge : traversée interdite, même si l'avion paraît loin. Arrêt obligatoire avant la ligne d'effet."}],
  "Feu rouge : traversée interdite. Vous restez à l'arrêt, l'avion est prioritaire.");
 jlog('5 h 58','Traversée : arrêt au feu rouge');
 await look([avion.position.x,3,avion.position.z+6],1000);follow=6;await new Promise(r=>{const w=()=>avion.position.z>45||FAST?r():requestAnimationFrame(w);w()});follow=null;planeOn=false;avion.visible=false;avion.position.z=-420;await look(ahead(),1300);
 setFeu('clignotant');await wait(1500);
 L.set('Orange clignotant','Que faites-vous ?');
 await ask([{t:"Je traverse sans m'arrêter, le feu le permet",p:P2,fb:"À l'orange clignotant, on marque d'abord le stop. Puis on traverse avec prudence, en cédant le passage."},
  {t:"J'attends que les feux s'éteignent",p:P1,fb:"Éteints, les feux sont en panne : ce n'est pas un signal à attendre. À l'orange clignotant, stop, puis on traverse avec prudence."},
  {t:"Je marque le stop, puis je traverse avec prudence",p:P3,ok:1}],
  "Orange clignotant : stop, puis on traverse avec prudence, en cédant le passage.");
 // le stop est marqué : on regarde des deux côtés, puis on traverse entre les tiretets, au pas de la zone 30
 L.dock(false).set('Avant de vous engager','Un regard des deux côtés de la voie.');await look([0,2,-140],1500);await look([0,2,140],2000);await look(ahead(),1300);
 L.a.set(-20,.1,3.4);L.set('Entre les tiretets décalés','La traversée se fait à l\'intérieur du cheminement prévu.');
 await drive(30);
 L.dock().set('Traversée faite','Feu rouge : on attend. Orange clignotant : stop, puis traversée avec prudence. Feux éteints, en panne : stop, puis traversée avec vigilance.');
 jlog('5 h 59','Traversée à l\'orange clignotant, entre les tiretets');
 await contV();live=false;L.kill();host.remove();R.dispose();removeEventListener('resize',fit);return null}
const ROUGE_CSS='#c4161c';
document.head.insertAdjacentHTML('beforeend',`<style>
#trav{position:fixed;left:0;right:0;top:0;bottom:calc(46px + env(safe-area-inset-bottom));z-index:1}
#trav canvas{display:block;width:100%;height:100%;touch-action:none}
#trav .ld{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
#trav .ld line{stroke:var(--marine);stroke-width:1.5}#trav .ld circle{fill:var(--marine)}
#trav .ui{position:absolute;inset:0;pointer-events:none}
#trav .tlab{position:absolute;left:0;top:0;width:min(420px,calc(100vw - 24px));pointer-events:none;transition:opacity .4s}
#trav .tc{background:rgba(255,255,255,.94);border-radius:14px;padding:14px 18px;box-shadow:0 6px 24px rgba(38,60,82,.14);transition:opacity .4s,transform .4s}
#trav .tc.hid{opacity:0;transform:translateY(6px)}
#trav .tc.out{position:absolute;left:0;right:0;top:0}
#trav .t{font-weight:700;font-size:clamp(18px,1.5vw,22px);line-height:1.25;margin:0;color:var(--marine)}
#trav .t.ok{color:var(--vert,#2E8B57)}#trav .t.ko{color:var(--orangeV,#E94E1B)}
#trav .s{font-size:clamp(15px,1.25vw,18px);line-height:1.38;margin:4px 0 0;color:var(--marine)}
#trav .ttg{position:absolute;left:0;top:0;width:60px;height:60px;margin:-30px 0 0 -30px;border:0;background:none;padding:0;pointer-events:auto;cursor:pointer;font:inherit;opacity:0;transition:opacity .3s}
#trav .ttg.live{opacity:1}
#trav .ttg i{position:absolute;inset:13px;border-radius:50%;border:4px solid var(--orangeV,#E94E1B);background:rgba(255,255,255,.5)}
#trav .ttg.live i::after{content:"";position:absolute;inset:-4px;border-radius:50%;border:4px solid var(--orangeV,#E94E1B);animation:tpul 1.6s ease-out infinite}
#trav .ttg.ok i{border-color:var(--vert,#2E8B57);background:var(--vert,#2E8B57)}#trav .ttg.ko i{background:var(--orangeV,#E94E1B)}#trav .ttg.ok i::after,#trav .ttg.ko i::after{display:none}
#trav .ttg span{position:absolute;left:58px;top:12px;white-space:nowrap;font-weight:700;font-size:17px;color:#fff;background:var(--orangeV,#E94E1B);padding:8px 14px;border-radius:999px;box-shadow:0 4px 14px rgba(38,60,82,.2)}
#trav .ttg b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;color:var(--orangeV,#E94E1B)}
#trav .ttg.ok b,#trav .ttg.ko b{color:#fff}
#trav .tchs{position:absolute;left:12px;right:12px;bottom:14px;display:flex;flex-direction:column;gap:8px;pointer-events:none}
#trav .tch{pointer-events:auto;display:flex;align-items:center;gap:12px;text-align:left;border:2px solid var(--orangeV,#E94E1B);background:#fff;color:var(--marine);border-radius:14px;padding:10px 14px;font:600 16px/1.3 Barlow,system-ui,sans-serif;cursor:pointer;opacity:0;transition:opacity .3s}
#trav .tch.live{opacity:1}
#trav .tch b{flex:none;width:28px;height:28px;border-radius:50%;background:var(--orangeV,#E94E1B);color:#fff;display:flex;align-items:center;justify-content:center;font-size:15px}
#trav .tch.ok{border-color:var(--vert,#2E8B57)}#trav .tch.ok b{background:var(--vert,#2E8B57)}
@keyframes tpul{0%{transform:scale(.85);opacity:1}100%{transform:scale(1.8);opacity:0}}
@media (max-width:700px){#trav .tlab{width:calc(100vw - 24px)}#trav .ttg span{font-size:15px;white-space:normal;width:max-content;max-width:min(250px,calc(100vw - 40px));text-align:left}}
</style>`);
