// parcours à vitesse réelle : capture à chaque clic et toutes les 4 s, journal des voix jouées
const {chromium}=require('playwright');
(async()=>{const [,,url,out,w,h]=process.argv;const fs=require('fs');fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:+w,height:+h},deviceScaleFactor:1,isMobile:+w<700,hasTouch:+w<700});
await p.addInitScript(()=>{const pl=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(this.tagName==='AUDIO')window.__aud=this;return pl.apply(this,arguments)}});const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push('CON '+m.text())});
await p.goto(url);await p.waitForTimeout(2000);const t0=Date.now();const T=()=>((Date.now()-t0)/1000).toFixed(1);
const log=s=>{fs.appendFileSync(out+'/log.txt',s+'\n')};
let lastAud='',k=0,n=0,idle=0,lastShot=0;
const SEL=[".mk2.live b",'#navgo .act','#vbtn a.act','#vbtn .act:not(.alt)','#vz .qc .act','.lab .act','#jrn.on .act','.ref:not(.seen):not(.off)','.bk:not(.ko)','.pz.live button:not(.ko)','#vz .qc .ans:not(.off)','.permis li.ans','.vpt.live','.tgt:not(.ok):not(.done)','.lab .ans:not(.off)','.tgt.live:not(.ok):not(.ko)','#trav .ttg.live:not(.ok):not(.ko)','#trav .tch.live:not(.ok):not(.ko)'];
while(true){
 const st=await p.evaluate(()=>{let r='';try{const A=window.__aud;if(A&&!A.paused&&!A.ended)r=decodeURIComponent(A.src.split('/').pop())}catch(e){}const v=[...document.querySelectorAll('video')].find(x=>!x.paused&&!x.ended);if(v)r+=' +film';return r});
 if(st!==lastAud){log(`${T()}s AUDIO ${st||'(silence)'}`);lastAud=st}
 if(Date.now()-lastShot>4000){lastShot=Date.now();k++;await p.screenshot({path:`${out}/t${String(k).padStart(4,'0')}_${T()}s.jpg`,type:'jpeg',quality:55})}
 const c=await p.evaluate((SEL)=>{for(const s of SEL){const els=[...document.querySelectorAll(s)].filter(e=>{const r=e.getBoundingClientRect();const st=getComputedStyle(e);return r.width>0&&r.height>0&&st.visibility!=='hidden'&&+st.opacity>.3&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth});
  if(els.length){const e=els[Math.floor(Math.random()*els.length)];const r=e.getBoundingClientRect();return {s,x:r.left+r.width/2,y:r.top+r.height/2,t:(e.textContent||'').trim().slice(0,50),href:e.getAttribute&&e.getAttribute('href')}}}return null},SEL);
 if(!c){idle++;if(idle>900)break;await p.waitForTimeout(250);continue}
 if(c.href&&!c.href.startsWith('#')){log(`${T()}s END ${c.href}`);break}
 idle=0;n++;await p.waitForTimeout(1200);await p.screenshot({path:`${out}/c${String(n).padStart(3,'0')}_${T()}s.jpg`,type:'jpeg',quality:60});
 log(`${T()}s CLIC ${n} ${c.s} | ${c.t}`);await p.mouse.click(c.x,c.y);await p.waitForTimeout(500);if(n>400)break}
await p.screenshot({path:`${out}/zz-end.jpg`,type:'jpeg',quality:60});log('ERRS '+JSON.stringify(errs));log('TIME '+T());await b.close()})();
