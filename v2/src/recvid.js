// film d'une page à vitesse réelle (vidéo sans son + journal des voix pour remonter le son ensuite)
// node recvid.js url outdir w h "bonne réponse 1|bonne réponse 2|..." [mauvaise réponse à montrer d'abord]
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [,,url,out,w,h,goods,showBad]=process.argv;fs.mkdirSync(out,{recursive:true});
const G=(goods||'').split('|').filter(Boolean);let badShown=false;
const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required','--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const mob=+w<700;const T0=Date.now();
const ctx=await b.newContext({viewport:{width:+w,height:+h},deviceScaleFactor:mob?2:1,isMobile:mob,hasTouch:mob,recordVideo:{dir:out,size:{width:+w,height:+h}}});
const p=await ctx.newPage();const TP=Date.now();
await p.addInitScript(()=>{const pl=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(this.tagName==='AUDIO')window.__aud=this;return pl.apply(this,arguments)}});
const log=[];const T=()=>(Date.now()-TP)/1000;
await p.goto(url);await p.waitForTimeout(2500);let last='',idle=0;
for(let i=0;i<2000;i++){
 const st=await p.evaluate(()=>{const A=window.__aud;return A&&!A.paused&&!A.ended?A.src:''});
 if(st&&st!==last){log.push({t:T(),src:st.startsWith('data:')?'emb':st.split('/').pop()})}last=st;
 const c=await p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).opacity>.5};
  const ch=[...document.querySelectorAll(innerWidth<700?'#trav .tch.live:not(.ok):not(.ko)':'#trav .ttg.live:not(.ok):not(.ko)')].filter(vis);
  if(ch.length)return {kind:'choice',items:ch.map(e=>{const r=e.getBoundingClientRect();return {t:e.textContent.trim(),x:r.left+r.width/2,y:r.top+r.height/2}})};
  const a=[...document.querySelectorAll('#vbtn .act, #vbtn a.act')].filter(vis)[0];if(a){const r=a.getBoundingClientRect();return {kind:'btn',t:a.textContent.trim(),href:a.getAttribute('href'),x:r.left+r.width/2,y:r.top+r.height/2}}
  return null});
 if(!c){idle++;if(idle>2400)break;await p.waitForTimeout(100);continue}idle=0;
 if(c.kind==='btn'&&c.href){await p.waitForTimeout(2500);break}
 await p.waitForTimeout(c.kind==='choice'?2600:1500);
 let tgt=c;if(c.kind==='choice'){let pick=c.items.find(x=>G.some(g=>x.t.includes(g)));const bad=c.items.find(x=>showBad&&x.t.includes(showBad));if(bad&&!badShown){pick=bad;badShown=true}tgt=pick||c.items[0]}
 await p.mouse.click(tgt.x,tgt.y);await p.waitForTimeout(400)}
const v=p.video();await ctx.close();const vp=await v.path();fs.writeFileSync(out+'/audio.json',JSON.stringify(log));fs.renameSync(vp,out+'/film.webm');await b.close();console.log('ok',JSON.stringify(log))})();
