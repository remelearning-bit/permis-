/* un biréacteur moyen-courrier générique, aux proportions d'un A320 (37,6 m de long, 35,8 m d'envergure, fuselage de 3,95 m),
   sans livrée de compagnie ; nez vers +z. Feux anticollision rouges dessus et dessous, feux de navigation, feux de roulage. */
function makeAirliner(glowTex){
 const g=new THREE.Group();
 const paint=new THREE.MeshStandardMaterial({color:0xf4f5f3,roughness:.38,metalness:.05});
 const belly=new THREE.MeshStandardMaterial({color:0xc9ced2,roughness:.45,metalness:.08});
 const metal=new THREE.MeshStandardMaterial({color:0xb7bdc2,roughness:.3,metalness:.55});
 const dark=new THREE.MeshStandardMaterial({color:0x1a2129,roughness:.35,metalness:.2});
 const glass=new THREE.MeshStandardMaterial({color:0x16202a,roughness:.12,metalness:.3});
 const tyre=new THREE.MeshStandardMaterial({color:0x15181b,roughness:.95});
 const paint2=new THREE.MeshStandardMaterial({color:0xf4f5f3,roughness:.38,metalness:.05,side:THREE.DoubleSide});
 const fin=new THREE.MeshStandardMaterial({color:0x263C52,roughness:.4,metalness:.05});
 const add=(geo,m,x=0,y=0,z=0)=>{const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);g.add(o);return o};
 /* fuselage : sections elliptiques le long de l'axe, nez arrondi, cône arrière relevé */
 const L0=-18.8,L1=18.8,R=1.98;
 const prof=z=>{ // demi-largeur, demi-hauteur, centre vertical (hauteur de l'axe 3.9 m au sol)
  if(z>14.2){const u=(z-14.2)/(L1-14.2);return [R*Math.sqrt(Math.max(0,1-Math.pow(u,2.3))),R*Math.sqrt(Math.max(0,1-Math.pow(u,2.1))),3.9-u*u*.6]}
  if(z<-8){const u=(-8-z)/(-8-L0);const k=1-u*.86;return [R*k*(1-u*u*.25),R*(1-u*.83),3.9+u*u*1.15]}
  return [R,R,3.9]};
 {const NU=120,NV=56,pos=[],idx=[],grp=[];
  for(let i=0;i<=NU;i++){const z=L0+(L1-L0)*i/NU;const [rx,ry,cy]=prof(z);
   for(let j=0;j<=NV;j++){const t=j/NV*Math.PI*2;pos.push(Math.sin(t)*rx,cy+Math.cos(t)*ry,z)}}
  const top=[],bot=[];for(let i=0;i<NU;i++)for(let j=0;j<NV;j++){const a=i*(NV+1)+j,b=a+1,c=a+NV+1,d=c+1;const tm=(j+.5)/NV*Math.PI*2;(Math.cos(tm)<-.3?bot:top).push(a,c,b,b,c,d)}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setIndex([...top,...bot]);geo.computeVertexNormals();
  // deux matériaux : peinture blanche au-dessus, ventre gris sous la ceinture
  geo.addGroup(0,top.length,0);geo.addGroup(top.length,bot.length,1);
  add(geo,[paint,belly])}
 /* vitres du poste de pilotage : un bandeau à hauteur constante autour du nez, découpé en vitres (pare-brise, latérales, arrière) ;
    chaque point est trouvé en partant de l'axe et en avançant jusqu'à la peau du fuselage */
 const inside=(x,y,z)=>{if(z>L1||z<L0)return false;const [rx,ry,cy]=prof(z);return rx>0&&ry>0&&(x/rx)**2+((y-cy)/ry)**2<=1};
 const surf=(y,ph)=>{const dx=Math.sin(ph),dz=Math.cos(ph);let d=0;while(d<8&&inside(dx*d,y,14.2+dz*d))d+=.01;d+=.012;return [dx*d,y,14.2+dz*d]};
 const glassM=new THREE.MeshStandardMaterial({color:0x0e1720,roughness:.08,metalness:.5,side:THREE.DoubleSide});
 const frameM=new THREE.MeshStandardMaterial({color:0x2a333c,roughness:.5,side:THREE.DoubleSide});
 const pane=(y0,y1,p0,p1,m,off=0)=>{const N=10,pos=[],idx=[];for(let i=0;i<=N;i++){const y=y0+(y1-y0)*i/N;for(let j=0;j<=N;j++){const q=surf(y,p0+(p1-p0)*j/N);const k=1+off;pos.push(q[0]*k,q[1],14.2+(q[2]-14.2)*k)}}
  for(let i=0;i<N;i++)for(let j=0;j<N;j++){const a=i*(N+1)+j,b=a+1,c=a+N+1,d=c+1;idx.push(a,c,b,b,c,d)}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setIndex(idx);geo.computeVertexNormals();g.add(new THREE.Mesh(geo,m))};
 // cadre sombre continu, puis les vitres posées dessus
 pane(4.5,5.12,-1.12,1.12,frameM,0);
 for(const s of [1,-1]){
  pane(4.56,5.07,s*.03,s*.33,glassM,.002);   // pare-brise
  pane(4.56,5.07,s*.38,s*.7,glassM,.002);    // vitre latérale (ouvrante)
  pane(4.62,5.02,s*.76,s*1.06,glassM,.002)}  // vitre arrière
 /* hublots, portes */
 {const wg=new THREE.BoxGeometry(.06,.3,.22);const n=31;const wins=new THREE.InstancedMesh(wg,glass,n*2);let k=0;const M=new THREE.Matrix4();
  for(let i=0;i<n;i++){const z=11.0-i*.53-(i>13?.6:0);for(const s of [1,-1]){M.makeTranslation(s*(R-.005),4.35,z);wins.setMatrixAt(k++,M)}}g.add(wins)}
 for(const s of [1,-1])for(const [z,h] of [[12.3,1.85],[-7.4,1.85],[3.9,1.0],[2.95,1.0]]){
  const fr=new THREE.Group();const tb=(w,hh,x,y)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.03,hh,w),belly);m.position.set(0,y,x);fr.add(m)};
  const w=h>1.5?.82:.55;tb(.04,h,-w/2,0);tb(.04,h,w/2,0);tb(w,.04,0,h/2);tb(w,.04,0,-h/2);fr.position.set(s*(R-.0),h>1.5?3.95:4.05,z);g.add(fr)}
 /* aile : profil épais à l'emplanture, flèche de 25°, dièdre de 5°, sharklet en bout */
 const wingGeo=(span,rootC,tipC,sweep,dih,tr,tt)=>{const pos=[],idx=[];const sec=(y,c,t,x0,z0)=>[[0,0],[.08,.55],[.3,1],[.65,.7],[1,.08],[1,-.05],[.6,-.32],[.25,-.42],[.05,-.3]].map(([u,v])=>[x0,z0+v*t,-u*c]);
  const S=[sec(0,rootC,tr,0,0),sec(1,tipC,tt,span,span*Math.tan(dih))];
  S[1].forEach(p=>p[2]-=span*Math.tan(sweep));const n=S[0].length;S.forEach(s=>s.forEach(p=>pos.push(...p)));
  for(let j=0;j<n;j++){const a=j,b=(j+1)%n,c=j+n,d=(j+1)%n+n;idx.push(a,b,c,b,d,c)}
  const c0=pos.length/3;pos.push(0,0,-rootC*.4);for(let j=0;j<n;j++)idx.push(c0,(j+1)%n,j);
  const c1=pos.length/3;pos.push(span,span*Math.tan(dih),-span*Math.tan(sweep)-tipC*.4);for(let j=0;j<n;j++)idx.push(c1,j+n,(j+1)%n+n);
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setIndex(idx);geo.computeVertexNormals();return geo};
 for(const s of [1,-1]){
  const w=add(wingGeo(15.9,6.3,1.6,.44,.087,.62,.16),paint2,s*1.85,3.0,6.2);if(s<0)w.scale.x=-1;
  const tipX=s*(1.85+15.9),tipY=3.0+15.9*Math.tan(.087),tipZ=6.2-15.9*Math.tan(.44);
  {const sg=new THREE.Group();const sk=new THREE.Mesh(wingGeo(2.2,1.5,.45,.75,0,.14,.05),paint2);sk.rotation.z=Math.PI/2-.32;sg.add(sk);sg.position.set(tipX,tipY,tipZ+.05);if(s<0)sg.scale.x=-1;g.add(sg)}
  // feux de navigation : rouge à gauche (s=1 côté gauche vu du pilote, x>0), vert à droite
  const nav=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:s>0?0xff2a1a:0x22dd55,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));nav.scale.set(.7,.7,1);nav.position.set(tipX,tipY+.1,tipZ-.2);g.add(nav);
  // volets et ailerons : liserés foncés au bord de fuite
  const fl=add(new THREE.BoxGeometry(11.5,.04,.05),belly,s*(1.85+8.3),3.36+8.3*Math.tan(.087)*.8,6.2-8.3*Math.tan(.44)-3.9);fl.rotation.y=s*.33;fl.rotation.z=s*.087;
  /* réacteur : nacelle (lèvre d'entrée, corps, tuyère), soufflante sombre et cône, mât */
  const ex=s*5.75,ey=2.05,ez=5.0;
  const nac=new THREE.LatheGeometry([[0,-2.2],[.62,-2.2],[.78,-1.4],[.95,-.2],[1.0,.9],[1.02,1.6],[.98,1.95],[.86,2.05],[.82,1.9]].map(([r,y])=>new THREE.Vector2(r,y)),40);
  const n1=add(nac,paint,ex,ey,ez);n1.rotation.x=Math.PI/2;
  const lip=add(new THREE.TorusGeometry(.86,.09,12,40),metal,ex,ey,ez+2.0);
  const fan=add(new THREE.CircleGeometry(.82,40),dark,ex,ey,ez+1.75);
  {const bl=new THREE.InstancedMesh(new THREE.BoxGeometry(.05,.6,.03),metal,22);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),E=new THREE.Euler();
   for(let k=0;k<22;k++){const an=k/22*Math.PI*2;E.set(0,.5,an);Q.setFromEuler(E);M.compose(new THREE.Vector3(Math.sin(-an)*.5+ex,Math.cos(an)*.5+ey,ez+1.77),Q,new THREE.Vector3(1,1,1));bl.setMatrixAt(k,M)}g.add(bl)}
  const sp=add(new THREE.ConeGeometry(.24,.5,24),metal,ex,ey,ez+1.95);sp.rotation.x=Math.PI/2;
  const noz=add(new THREE.CylinderGeometry(.45,.6,1.1,32),metal,ex,ey,ez-2.6);noz.rotation.x=Math.PI/2;
  const cone=add(new THREE.ConeGeometry(.42,1.1,24),dark,ex,ey,ez-3.6);cone.rotation.x=-Math.PI/2;
  add(new THREE.BoxGeometry(.32,1.2,3.8),paint,ex,ey+1.05,ez-.7);
 }
 /* carénage ventral sous l'emplanture des ailes, sortie du groupe auxiliaire au bout du cône arrière */
 {const f=add(new THREE.SphereGeometry(1,32,16),belly,0,2.35,3.0);f.scale.set(2.05,.75,7.2)}
 {const ap=add(new THREE.CylinderGeometry(.16,.2,.4,16),dark,0,5.05,-18.75);ap.rotation.x=Math.PI/2}
 /* empennage : plan horizontal et dérive (marine, sans logo) */
 for(const s of [1,-1]){const h=add(wingGeo(5.9,3.4,1.3,.52,.1,.28,.08),paint2,s*.55,4.95,-13.7);if(s<0)h.scale.x=-1}
 {const sh=new THREE.Shape();sh.moveTo(0,0);sh.lineTo(-5.2,0);sh.lineTo(-7.7,6.2);sh.lineTo(-5.9,6.2);sh.closePath();
  const fg=new THREE.ExtrudeGeometry(sh,{depth:.32,bevelEnabled:true,bevelThickness:.08,bevelSize:.08,bevelSegments:2});fg.translate(0,0,-.16);
  const f=add(fg,fin,0,5.3,-11.0);f.rotation.y=-Math.PI/2;
  const st=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xffffff,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.9}));st.scale.set(1,1,1);st.position.set(0,4.6,-18.9);g.add(st)}
 /* train d'atterrissage : avant (deux roues), principal sous l'aile (deux roues de chaque côté) */
 const wheel=(x,y,z,r,w)=>{const t=add(new THREE.CylinderGeometry(r,r,w,28),tyre,x,y,z);t.rotation.z=Math.PI/2;const h=add(new THREE.CylinderGeometry(r*.55,r*.55,w+.02,20),metal,x,y,z);h.rotation.z=Math.PI/2};
 add(new THREE.CylinderGeometry(.09,.09,2.0,10),metal,0,1.4,12.6);wheel(.22,.38,12.6,.38,.22);wheel(-.22,.38,12.6,.38,.22);
 for(const s of [1,-1]){add(new THREE.CylinderGeometry(.13,.13,2.3,10),metal,s*3.8,1.65,-.4);wheel(s*3.8+.35,.58,-.4,.58,.36);wheel(s*3.8-.35,.58,-.4,.58,.36);
  const brace=add(new THREE.BoxGeometry(.08,1.8,.08),metal,s*3.3,1.9,-.4);brace.rotation.z=s*.5}
 /* feux de roulage (blancs, sur le train avant) */
 {const tl=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xfff6e0,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.95}));tl.scale.set(1.2,1.2,1);tl.position.set(0,1.75,12.85);g.add(tl)}
 /* feux anticollision rouges, dessus et dessous du fuselage : l'avion roule */
 g.userData.beacons=[[0,5.98,1.5],[0,1.82,1.5]].map(p=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:0xff2a1a,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));s.scale.set(2.4,2.4,1);s.position.set(...p);g.add(s);return s});
 return g}
