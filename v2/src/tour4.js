/* 2. le tour du véhicule : l'ID. Buzz de REM Formation, modélisé ; on tourne autour et on clique les sept points de la diapo 88 */
const VAN={L:4.71,W:1.98,H:1.94};
function clipY(pts,y0,y1){ // garde la partie du profil comprise entre y0 et y1 (Sutherland-Hodgman sur deux demi-plans)
 const cut=(P,keep,yc)=>{const o=[];for(let i=0;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length],ka=keep(a[1]),kb=keep(b[1]);
  if(ka)o.push(a);if(ka!==kb){const t=(yc-a[1])/(b[1]-a[1]);o.push([a[0]+t*(b[0]-a[0]),yc])}}return o};
 return cut(cut(pts,y=>y>=y0,y0),y=>y<=y1,y1)}
function buildVan(){
 // carrosserie d'un seul tenant, en « pilule » : section en super-ellipse, plan arrondi aux deux bouts (silhouette de l'ID. Buzz)
 const g=new THREE.Group(),L2=VAN.L/2,W2=VAN.W/2;
 const lerp=(P,x)=>{if(x<=P[0][0])return P[0][1];for(let i=1;i<P.length;i++)if(x<=P[i][0]){const a=P[i-1],b=P[i],t=(x-a[0])/(b[0]-a[0]),u=t*t*(3-2*t);return a[1]+(b[1]-a[1])*u}return P[P.length-1][1]};
 const TOP=[[-L2,1.62],[-2.22,1.86],[-1.95,1.94],[0.95,1.94],[1.30,1.86],[1.86,1.26],[2.10,1.16],[2.28,1.08],[L2,.98]];
 const BOT=[[-L2,.46],[-2.20,.36],[2.20,.36],[L2,.46]];
 const half=x=>W2*Math.pow(Math.max(0,1-Math.pow(Math.abs(x)/L2,4)),1/4);
 const NU=280,NV=180,pos=[],col=[],idx=[];const N=4.2;
 const lin=h=>{const c=new THREE.Color();c.setHex(h,THREE.SRGBColorSpace);return [c.r,c.g,c.b]};
 const C={navy:lin(0x1b2735),cream:lin(0xefe6d3),glass:lin(0x070a0d),light:lin(0xf3f6f9),red:lin(0xb3202a),dark:lin(0x111316),grey:lin(0x2c333a)};
 const colorAt=(x,y,z,t,hz)=>{const side=Math.abs(Math.cos(t))>.55,topf=Math.sin(t)>.45;
  if(y<.44)return C.grey;
  const xe=L2*Math.pow(Math.max(0,1-Math.pow(Math.min(1,Math.abs(z)/W2),4)),1/4)-.07,az=Math.abs(z);
  if(x>xe&&x>2.0){if(y>.87&&y<.93&&az<.52)return C.light;if(y>.75&&y<.86&&az>.42&&az<.78)return C.light}
  if(x<-xe&&x<-2.0&&y>1.06&&y<1.42&&az>.52&&az<.74)return C.red;
  for(const wx of [1.50,-1.50])if(Math.hypot(x-wx,y-.40)<.50&&Math.abs(z)>hz*.72)return C.dark;
  // vitrages
  if(side&&y>1.22&&y<1.80){const xa=1.86-(y-1.22)*.86;if((x>.70&&x<xa-.08)||(x>-.95&&x<.55)||(x>-2.12&&x<-1.10))return C.glass}
  if(topf&&x>1.34&&x<1.84&&Math.abs(z)<hz*.86)return C.glass;
  if(x<-2.22&&y>1.32&&y<1.78&&Math.abs(z)<hz*.78)return C.glass;
  // deux tons : crème au-dessus de la ceinture, avec le V à l'avant
  const belt=x>1.80?1.00:1.12;
  return y>belt?C.cream:C.navy};
 for(let i=0;i<=NU;i++){const u=i/NU,x=-L2*Math.cos(Math.PI*u);const yt=lerp(TOP,x),yb=lerp(BOT,x),yc=(yt+yb)/2,hy=(yt-yb)/2,hz=Math.max(.001,half(x));
  for(let j=0;j<NV;j++){const t=j/NV*Math.PI*2,c=Math.cos(t),sn=Math.sin(t);
   const z=hz*Math.sign(c)*Math.pow(Math.abs(c),2/N),y=yc+hy*Math.sign(sn)*Math.pow(Math.abs(sn),2/N);
   pos.push(x,y,z);col.push(...colorAt(x,y,z,t,hz))}}
 for(let i=0;i<NU;i++)for(let j=0;j<NV;j++){const a=i*NV+j,b=i*NV+(j+1)%NV,c2=(i+1)*NV+j,d=(i+1)*NV+(j+1)%NV;idx.push(a,c2,b,b,c2,d)}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));geo.setIndex(idx);geo.computeVertexNormals();
 const body=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.42,metalness:.05}));body.castShadow=true;g.add(body);
 // feux : bandeau avant, phares, feux arrière (posés sur la surface)
 const lum=(w,h,d,colr,em,x,y,z,ry=0)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:colr,emissive:em,emissiveIntensity:.9,roughness:.3}));m.position.set(x,y,z);m.rotation.y=ry;g.add(m);return m};
 const xf=z=>L2*Math.pow(Math.max(0,1-Math.pow(Math.abs(z)/W2,4)),1/4);
 // roues, grandes comme sur l'ID. Buzz
 const tyre=new THREE.MeshStandardMaterial({color:0x15181c,roughness:.95}),rim=new THREE.MeshStandardMaterial({color:0x2a2f35,roughness:.35,metalness:.6}),hub=new THREE.MeshStandardMaterial({color:0xd8dde2,roughness:.3,metalness:.7});
 const wheel=(x,z)=>{const w=new THREE.Group();const t=new THREE.Mesh(new THREE.CylinderGeometry(.40,.40,.27,40),tyre);t.rotation.x=Math.PI/2;t.castShadow=true;w.add(t);
  const r=new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.28,40),rim);r.rotation.x=Math.PI/2;w.add(r);
  for(let k=0;k<5;k++){const sp=new THREE.Mesh(new THREE.BoxGeometry(.06,.24,.02),hub);sp.geometry.translate(0,.12,0);sp.position.z=Math.sign(z)*.145;sp.rotation.z=k*Math.PI*2/5;w.add(sp)}
  w.position.set(x,.40,z);g.add(w)};
 [[1.50,.86],[1.50,-.86],[-1.50,.86],[-1.50,-.86]].forEach(([x,z])=>wheel(x,z));
 // logo REM Formation sur les deux côtés
 const tex=new THREE.TextureLoader().load(IMG.logo);tex.colorSpace=THREE.SRGBColorSpace;
 const lm=new THREE.MeshBasicMaterial({map:tex,transparent:true});const ar=(DIM.logo?DIM.logo[0]/DIM.logo[1]:.78);
 [[W2+.012,0],[-W2-.012,Math.PI]].forEach(([z,ry])=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(.58*ar,.58),lm);m.position.set(-.20,.76,z);m.rotation.y=ry;g.add(m)});
 // trappe de recharge, arrière droit
 const tr=new THREE.Mesh(new THREE.BoxGeometry(.18,.14,.01),new THREE.MeshStandardMaterial({color:0x0f1720,roughness:.4}));tr.position.set(-1.80,.98,-W2-.008);g.add(tr);
 return g}
async function tour(){step();head(H4,'Le tour du véhicule');const cp0=$('#cap');if(cp0)cp0.classList.remove('on');if(innerWidth<700)headOff();
 const host=document.createElement('div');host.id='van3d';document.body.appendChild(host);
 const rd=new THREE.WebGLRenderer({antialias:true});rd.setPixelRatio(Math.min(2,devicePixelRatio));rd.shadowMap.enabled=true;rd.shadowMap.type=THREE.PCFSoftShadowMap;rd.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(rd.domElement);
 const sc=new THREE.Scene();sc.background=new THREE.Color(0xdfe8ef);sc.fog=new THREE.Fog(0xdfe8ef,28,70);
 const cm=new THREE.PerspectiveCamera(40,1,.1,200);
 sc.add(new THREE.HemisphereLight(0xffffff,0x9aa3ab,1.15));const sun=new THREE.DirectionalLight(0xffffff,1.6);sun.position.set(6,10,5);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
 Object.assign(sun.shadow.camera,{left:-6,right:6,top:6,bottom:-6});sun.shadow.bias=-.0006;sun.shadow.normalBias=.03;sc.add(sun);
 // l'aire : enrobé clair, une ligne de cheminement
 const gr=new THREE.Mesh(new THREE.PlaneGeometry(140,140),new THREE.MeshStandardMaterial({color:0xb9c0c6,roughness:.95}));gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;sc.add(gr);
 const line=(x,z,w,d,col)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),new THREE.MeshStandardMaterial({color:col,roughness:.9}));m.rotation.x=-Math.PI/2;m.position.set(x,.005,z);sc.add(m)};
 line(0,2.6,60,.15,0xffffff);line(0,-2.6,60,.15,0xffffff);
 const van=buildVan();sc.add(van);
 const T=new THREE.Vector3(0,.95,0);let yaw=.75,pitch=.22,R=8.2,goal=null;
 const fit=()=>{const w=host.clientWidth,h=host.clientHeight;rd.setSize(w,h,false);cm.aspect=w/h;R=Math.max(8.2,2.9/(Math.tan(20*Math.PI/180)*cm.aspect));cm.updateProjectionMatrix()};fit();addEventListener('resize',fit);
 // on tourne autour en faisant glisser
 let drag=null;host.addEventListener('pointerdown',e=>{if(e.target.closest('.vpt'))return;drag={x:e.clientX,y:e.clientY,yaw,pitch};goal=null;host.setPointerCapture(e.pointerId)});
 host.addEventListener('pointermove',e=>{if(!drag)return;yaw=drag.yaw-(e.clientX-drag.x)*.008;pitch=Math.max(.05,Math.min(.6,drag.pitch+(e.clientY-drag.y)*.004))});
 host.addEventListener('pointerup',()=>drag=null);host.addEventListener('pointercancel',()=>drag=null);
 // les sept points
 const PTS=[{k:'pneus',p:[1.50,.40,1.02],yaw:.75,n:'Les pneumatiques',x:'Leur état.'},
  {k:'eclairage',p:[2.33,.80,.62],yaw:.25,n:"L'éclairage",x:"Le système d'éclairage."},
  {k:'freins',p:[-1.50,.40,1.02],yaw:2.30,n:'Le freinage',x:'On le vérifie avant toute utilisation.'},
  {k:'carburant',p:[-1.80,.95,-1.02],yaw:3.95,n:'Le carburant ou la charge des batteries',x:'Le niveau de carburant, ou la charge des batteries pour un véhicule électrique comme celui-ci.'},
  {k:'urgence',p:[1.55,1.30,.25],yaw:.05,n:"L'arrêt d'urgence",x:"Le fonctionnement du système d'arrêt d'urgence, pour les véhicules qui en sont équipés."},
  {k:'marquage',p:[-.20,.70,-1.02],yaw:4.71,n:'Le balisage et le marquage',x:'Le logo de la société et le numéro du véhicule.'},
  {k:'equipements',p:[-2.40,1.45,0],yaw:3.14,n:'Les équipements de sécurité',x:'Si besoin : extincteur, brise-vitre, coupe-sangle.'}];
 const tg=PTS.map((q,i)=>{const b=document.createElement('button');b.className='vpt';b.innerHTML=`<i>${i+1}</i><span>${nb(q.n)}</span>`;host.appendChild(b);return b});
 const v=new THREE.Vector3(),cp=new THREE.Vector3();let live=true;
 const loop=()=>{if(!live)return;requestAnimationFrame(loop);
  if(goal!==null){let d=((goal-yaw+Math.PI*3)%(Math.PI*2))-Math.PI;yaw+=d*(FAST?1:.06);if(Math.abs(d)<.002)goal=null}
  cm.position.set(T.x+R*Math.cos(yaw)*Math.cos(pitch),T.y+R*Math.sin(pitch),T.z+R*Math.sin(yaw)*Math.cos(pitch));cm.lookAt(T);rd.render(sc,cm);
  const r=host.getBoundingClientRect();
  PTS.forEach((q,i)=>{v.set(...q.p);cp.copy(cm.position).sub(v);const facing=cp.normalize().dot(new THREE.Vector3(q.p[0],0,q.p[2]).normalize())>-.15||q.k==='urgence';
   v.project(cm);const b=tg[i];b.style.left=((v.x+1)/2*r.width)+'px';b.style.top=((1-v.y)/2*r.height)+'px';b.classList.toggle('back',!facing)})};
 loop();
 const L=label([0,0,0],{lead:false,dock:true}).title('Le tour du véhicule').card('À vous','Le véhicule tourne jusqu\'à chaque point. Cliquez sur le point quand il devient orange. Vous pouvez aussi faire glisser pour tourner autour.',{a:null});
 await sayS('v04');
 for(let i=0;i<PTS.length;i++){const q=PTS[i],b=tg[i];goal=q.yaw;b.classList.add('on');await new Promise(r=>{const w=()=>goal===null?r():requestAnimationFrame(w);w()});b.classList.add('live');
  L.card(`Point ${i+1} sur 7`,`Cliquez sur le point ${i+1} : ${q.n.toLowerCase()}.`,{a:null});
  await new Promise(r=>b.onclick=r);b.onclick=null;b.classList.remove('live');b.classList.add('done');
  L.card(q.n,q.x,{a:null});await sayS('v'+String(5+i).padStart(2,'0'))}
 goal=.75;
 await sayS('v12',[at('v12',.02,()=>L.card('« Et si je trouve quelque chose qui ne va pas ? »','Xavier',{a:null}))]);
 await sayS('v13',[at('v13',.02,()=>L.card('Le véhicule ne part pas',"Et l'entreprise doit pouvoir justifier à tout moment de l'entretien périodique de sa flotte : consigne d'exploitation n°12.",{a:null}))]);
 jlog('5 h 50','Tour du véhicule : les sept points vérifiés');
 await contLab(L,'Continuer');live=false;L.kill();host.remove();rd.dispose();return null}
document.head.insertAdjacentHTML('beforeend',`<style>
#van3d{position:fixed;left:0;right:0;top:0;bottom:calc(46px + env(safe-area-inset-bottom));z-index:1;touch-action:none;cursor:grab}
#van3d:active{cursor:grabbing}
#van3d canvas{display:block;width:100%;height:100%}
.vpt{position:absolute;transform:translate(-50%,-50%);display:none;align-items:center;gap:8px;border:0;background:none;padding:0;cursor:pointer;font:inherit}
.vpt.on{display:flex}.vpt.back{display:none}.vpt.done span{display:none}.vpt.done i{width:26px;height:26px;font-size:13px}
.vpt i{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:800;color:#fff;background:var(--marine);box-shadow:0 0 0 4px rgba(255,255,255,.85)}
.vpt span{background:rgba(255,255,255,.94);color:var(--marine);font-weight:700;font-size:14px;padding:4px 10px;border-radius:999px;white-space:nowrap;box-shadow:0 2px 10px rgba(38,60,82,.18)}
.vpt.live i{background:var(--orangeV);animation:vpul 1.3s ease-in-out infinite}
.vpt.done i{background:var(--marine)}
@keyframes vpul{0%,100%{box-shadow:0 0 0 4px rgba(255,255,255,.85),0 0 0 0 rgba(232,93,4,.5)}50%{box-shadow:0 0 0 4px rgba(255,255,255,.85),0 0 0 14px rgba(232,93,4,0)}}
@media (max-width:700px){.vpt span{display:none}.vpt.live span{display:block;font-size:13px}}
</style>`);
