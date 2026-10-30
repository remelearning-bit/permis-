const {chromium}=require('playwright');
(async()=>{const [,,url,out,w,h,...ts]=process.argv;const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage({viewport:{width:+w,height:+h},isMobile:+w<700,hasTouch:+w<700});await p.goto(url);await p.waitForTimeout(1500);
const g=await p.$('#navgo .act');if(g)await g.click();let t0=0;for(const t of ts){await p.waitForTimeout((+t-t0)*1000);t0=+t;await p.screenshot({path:`${out}-${t}.png`})}await b.close()})();
