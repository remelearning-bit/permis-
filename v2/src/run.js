const {chromium}=require('playwright');
(async()=>{const [,,url,out,w,h,maxs]=process.argv;const fs=require('fs');fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const p=await b.newPage({viewport:{width:+w,height:+h},deviceScaleFactor:1,isMobile:+w<700,hasTouch:+w<700});
const errs=[];p.on('pageerror',e=>errs.push('PAGEERR '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push('CON '+m.text())});
await p.goto(url);await p.waitForTimeout(1500);let n=0,idle=0;const t0=Date.now();
const SEL=[".mk2.live b",'#navgo .act','#vbtn a.act','#vbtn .act:not(.alt)','#vz .qc .act','.lab .act','#jrn.on .act','.ref:not(.seen):not(.off)','.bk:not(.ko)','.pz.live button:not(.ko)','#vz .qc .ans:not(.off)','.permis li.ans','.vpt.live','.lab .ans:not(.off)','.tgt.live:not(.ok):not(.ko)'];
for(let i=0;i<+maxs;i++){
 const c=await p.evaluate((SEL)=>{for(const s of SEL){const els=[...document.querySelectorAll(s)].filter(e=>{const r=e.getBoundingClientRect();const st=getComputedStyle(e);return r.width>0&&r.height>0&&st.visibility!=='hidden'&&+st.opacity>.3&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth});
  if(els.length){const e=els[Math.floor(Math.random()*els.length)];const r=e.getBoundingClientRect();return {s,x:r.left+r.width/2,y:r.top+r.height/2,t:(e.textContent||'').trim().slice(0,40),href:e.getAttribute('href')}}}return null},SEL);
 if(!c){idle++;if(idle>120)break;await p.waitForTimeout(250);continue}
 if(c.href){console.log('END link',c.href);break}
 idle=0;n++;await p.screenshot({path:`${out}/${String(n).padStart(3,'0')}.png`});
 console.log(n,((Date.now()-t0)/1000).toFixed(0)+'s',c.s,'|',c.t);
 await p.mouse.click(c.x,c.y);await p.waitForTimeout(400)}
await p.screenshot({path:`${out}/zz-end.png`});console.log('ERRS',JSON.stringify(errs));console.log('TIME',((Date.now()-t0)/1000).toFixed(0));await b.close()})();
