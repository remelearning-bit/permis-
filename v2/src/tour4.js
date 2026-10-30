/* 2. le tour du véhicule : l'ID. Buzz de REM Formation, modélisé ; on tourne autour et on clique les sept points de la diapo 88 */
const VAN={L:4.71,W:1.98,H:1.94};
function clipY(pts,y0,y1){ // garde la partie du profil comprise entre y0 et y1 (Sutherland-Hodgman sur deux demi-plans)
 const cut=(P,keep,yc)=>{const o=[];for(let i=0;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length],ka=keep(a[1]),kb=keep(b[1]);
  if(ka)o.push(a);if(ka!==kb){const t=(yc-a[1])/(b[1]-a[1]);o.push([a[0]+t*(b[0]-a[0]),yc])}}return o};
 return cut(cut(pts,y=>y>=y0,y0),y=>y<=y1,y1)}
function buildVan(){
 const g=new THREE.Group();
 // profil latéral (x vers l'avant, y vers le haut), en mètres
 const P=[[-2.33,.34],[2.30,.34],[2.36,.62],[2.34,.98],[2.22,1.10],[1.80,1.18],[1.30,1.84],[1.05,1.93],[-2.10,1.93],[-2.30,1.84],[-2.36,1.20],[-2.36,.50]];
 const W=VAN.W-.30,bev=.15;
 const soft=(Q,n=3)=>{let A=Q;for(let k=0;k<n;k++){const B=[];for(let i=0;i<A.length;i++){const a=A[i],b=A[(i+1)%A.length];B.push([.75*a[0]+.25*b[0],.75*a[1]+.25*b[1]],[.25*a[0]+.75*b[0],.25*a[1]+.75*b[1]])}A=B}return A};
 const ext=(pts,col,rough=.45)=>{const s=new THREE.Shape();pts.forEach((p,i)=>i?s.lineTo(p[0],p[1]):s.moveTo(p[0],p[1]));
  const geo=new THREE.ExtrudeGeometry(s,{depth:W,bevelEnabled:true,bevelSize:bev,bevelThickness:bev,bevelSegments:8,curveSegments:8});geo.translate(0,0,-W/2);
  const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:col,roughness:rough,metalness:.15}));m.castShadow=true;m.receiveShadow=true;return m};
 const PS=soft(P);
 g.add(ext(clipY(PS,0,1.12),0x1b2735,.38));            // bas de caisse bleu marine très sombre
 g.add(ext(clipY(PS,1.12,2.2),0xefe6d3,.5));           // haut et toit crème
 // vitrages, posés juste devant la carrosserie
 const glass=new THREE.MeshStandardMaterial({color:0x223241,roughness:.08,metalness:.5,side:THREE.DoubleSide});
 const side=(poly,z)=>{const s=new THREE.Shape();poly.forEach((p,i)=>i?s.lineTo(p[0],p[1]):s.moveTo(p[0],p[1]));const m=new THREE.Mesh(new THREE.ShapeGeometry(s),glass);m.position.z=z;return m};
 const zs=W/2+bev+.006;
 const WIN=[[[1.70,1.20],[1.22,1.80],[0.70,1.80],[0.70,1.20]],[[0.55,1.20],[0.55,1.80],[-0.95,1.80],[-0.95,1.20]],[[-1.10,1.20],[-1.10,1.80],[-2.05,1.80],[-2.15,1.25]]];
 WIN.forEach(w=>{g.add(side(w,zs));g.add(side(w,-zs))});
 const quad=(a,b,c,d)=>{const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute([...a,...b,...c,...a,...c,...d],3));geo.computeVertexNormals();return new THREE.Mesh(geo,glass)};
 const ws=W/2+bev*.5,o=bev+.02;g.add(quad([1.84+.8*o,1.20+.6*o,ws],[1.84+.8*o,1.20+.6*o,-ws],[1.34+.8*o,1.82+.6*o,-ws],[1.34+.8*o,1.82+.6*o,ws]));   // pare-brise
 const wr=quad([-2.36-o,1.30,-ws*.9],[-2.36-o,1.30,ws*.9],[-2.32-o,1.78,ws*.9],[-2.32-o,1.78,-ws*.9]);g.add(wr);        // lunette arrière
 // phares (bandeau avant), feux arrière
 const lum=(w,h,d,col,em,x,y,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:col,emissive:em,emissiveIntensity:.9,roughness:.3}));m.position.set(x,y,z);g.add(m);return m};
 lum(.03,.03,1.10,0xffffff,0xeaf2ff,2.36+o,1.00,0);[.70,-.70].forEach(z=>lum(.04,.09,.24,0xf4f6f8,0xdfe9ff,2.35+o,.92,z));
 [.80,-.80].forEach(z=>lum(.04,.36,.08,0xb3202a,0x7a0d14,-2.36-o,1.22,z));
 lum(.03,.03,1.30,0xb3202a,0x7a0d14,-2.36-o,1.10,0);
 // pare-chocs gris
 [[2.36+o,.44],[-2.36-o,.44]].forEach(([x,y])=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.10,.22,VAN.W-.06),new THREE.MeshStandardMaterial({color:0x2b3540,roughness:.8}));m.position.set(x,y,0);g.add(m)});
 // roues
 const tyre=new THREE.MeshStandardMaterial({color:0x15181c,roughness:.95}),rim=new THREE.MeshStandardMaterial({color:0x2a2f35,roughness:.35,metalness:.6}),hub=new THREE.MeshStandardMaterial({color:0xd8dde2,roughness:.3,metalness:.7});
 const wheel=(x,z)=>{const w=new THREE.Group();const t=new THREE.Mesh(new THREE.CylinderGeometry(.37,.37,.26,36),tyre);t.rotation.x=Math.PI/2;t.castShadow=true;w.add(t);
  const r=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.27,36),rim);r.rotation.x=Math.PI/2;w.add(r);
  for(let k=0;k<5;k++){const s=new THREE.Mesh(new THREE.BoxGeometry(.05,.22,.02),hub);s.position.z=Math.sign(z)*.14;s.rotation.z=k*Math.PI*2/5;s.geometry.translate(0,.11,0);w.add(s)}
  w.position.set(x,.37,z);g.add(w)};
 [[1.50,.88],[1.50,-.88],[-1.50,.88],[-1.50,-.88]].forEach(([x,z])=>wheel(x,z));
 // logo REM Formation sur les deux côtés (identification de l'entreprise)
 const tex=new THREE.TextureLoader().load(IMG.logo);tex.colorSpace=THREE.SRGBColorSpace;
 const lm=new THREE.MeshBasicMaterial({map:tex,transparent:true});const ar=(DIM.logo?DIM.logo[0]/DIM.logo[1]:.78);
 [[zs+.002,0],[-zs-.002,Math.PI]].forEach(([z,ry])=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(.62*ar,.62),lm);m.position.set(-.20,.70,z);m.rotation.y=ry;g.add(m)});
 // trappe de recharge, arrière droit
 const tr=new THREE.Mesh(new THREE.BoxGeometry(.18,.14,.01),new THREE.MeshStandardMaterial({color:0x0f1720,roughness:.4}));tr.position.set(-1.80,.95,-zs-.004);g.add(tr);
 return g}
async function tour(){step();head(H4,'Le tour du véhicule');const cp0=$('#cap');if(cp0)cp0.classList.remove('on');if(innerWidth<700)headOff();
 const host=document.createElement('div');host.id='van3d';document.body.appendChild(host);
 const rd=new THREE.WebGLRenderer({antialias:true});rd.setPixelRatio(Math.min(2,devicePixelRatio));rd.shadowMap.enabled=true;rd.shadowMap.type=THREE.PCFSoftShadowMap;rd.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(rd.domElement);
 const sc=new THREE.Scene();sc.background=new THREE.Color(0xdfe8ef);sc.fog=new THREE.Fog(0xdfe8ef,28,70);
 const cm=new THREE.PerspectiveCamera(40,1,.1,200);
 sc.add(new THREE.HemisphereLight(0xffffff,0x9aa3ab,1.15));const sun=new THREE.DirectionalLight(0xffffff,1.6);sun.position.set(6,10,5);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
 Object.assign(sun.shadow.camera,{left:-6,right:6,top:6,bottom:-6});sc.add(sun);
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
 const PTS=[{k:'pneus',p:[1.50,.37,1.02],yaw:.75,n:'Les pneumatiques',x:'Leur état, et leur pression.'},
  {k:'eclairage',p:[2.53,.92,.72],yaw:.25,n:"L'éclairage",x:'Phares, feux, clignotants.'},
  {k:'freins',p:[-1.50,.37,1.02],yaw:2.30,n:'Le freinage',x:'On le vérifie avant toute utilisation.'},
  {k:'carburant',p:[-1.80,.95,-1.02],yaw:3.95,n:'Le carburant ou la charge des batteries',x:'Le niveau de carburant, ou la charge des batteries pour un véhicule électrique comme celui-ci.'},
  {k:'urgence',p:[1.55,1.30,.25],yaw:.05,n:"L'arrêt d'urgence",x:"Le fonctionnement du système d'arrêt d'urgence, pour les véhicules qui en sont équipés."},
  {k:'marquage',p:[-.20,.70,-1.02],yaw:4.71,n:'Le balisage et le marquage',x:'Le logo de la société et le numéro du véhicule.'},
  {k:'equipements',p:[-2.55,1.40,0],yaw:3.14,n:'Les équipements de sécurité',x:'Si besoin : extincteur, brise-vitre, coupe-sangle.'}];
 const tg=PTS.map((q,i)=>{const b=document.createElement('button');b.className='vpt';b.innerHTML=`<i>${i+1}</i><span>${nb(q.n)}</span>`;host.appendChild(b);return b});
 const v=new THREE.Vector3(),cp=new THREE.Vector3();let live=true;
 const loop=()=>{if(!live)return;requestAnimationFrame(loop);
  if(goal!==null){let d=((goal-yaw+Math.PI*3)%(Math.PI*2))-Math.PI;yaw+=d*(FAST?1:.06);if(Math.abs(d)<.002)goal=null}
  cm.position.set(T.x+R*Math.cos(yaw)*Math.cos(pitch),T.y+R*Math.sin(pitch),T.z+R*Math.sin(yaw)*Math.cos(pitch));cm.lookAt(T);rd.render(sc,cm);
  const r=host.getBoundingClientRect();
  PTS.forEach((q,i)=>{v.set(...q.p);cp.copy(cm.position).sub(v);const facing=cp.normalize().dot(new THREE.Vector3(q.p[0],0,q.p[2]).normalize())>-.15||q.k==='urgence';
   v.project(cm);const b=tg[i];b.style.left=((v.x+1)/2*r.width)+'px';b.style.top=((1-v.y)/2*r.height)+'px';b.classList.toggle('back',!facing)})};
 loop();
 const L=label([0,0,0],{lead:false,dock:true}).title('Le tour du véhicule').card('À vous','Faites glisser pour tourner autour du véhicule. Puis cliquez sur chaque point quand il apparaît.',{a:null});
 await sayS('v04');
 for(let i=0;i<PTS.length;i++){const q=PTS[i],b=tg[i];goal=q.yaw;b.classList.add('on','live');
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
