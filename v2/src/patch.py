import sys
p=sys.argv[1];s=open(p,encoding='utf-8').read()
old="const tick=()=>{if(done)return;const d=a.duration||0;const f=d?a.currentTime/d:0;showAt(f);"
new="let lt=-1,lw=performance.now();const tick=()=>{if(done)return;const d=a.duration||0;const f=d?a.currentTime/d:0;showAt(f);/* si le son reste bloqué (réseau), on relance, puis on n'attend pas indéfiniment */if(!FAST){const now=performance.now();if(a.currentTime!==lt){lt=a.currentTime;lw=now}else if(now-lw>7000&&!a.dataset.retry){a.dataset.retry=1;a.play().catch(()=>{})}else if(now-lw>15000){fin();return}}"
assert old in s
s=s.replace(old,new)
s=s.replace("a.onended=fin;a.onerror=","delete a.dataset.retry;a.onended=fin;a.onerror=")
s=s.replace('.card{animation:cin .4s ease}','.card{animation:cin .4s ease .28s both}')
s=s.replace("'.card:not([data-out]),.act,.opt,button'","'.card:not([data-out]),.act,.opt,button,.lst,.who2'")
s=s.replace("w.appendChild(nx);await new Promise(r=>nx.onclick=r)","w.appendChild(nx);try{nx.scrollIntoView({block:'nearest',behavior:'smooth'})}catch(e){}await new Promise(r=>nx.onclick=r)")
open(p,'w',encoding='utf-8').write(s)
