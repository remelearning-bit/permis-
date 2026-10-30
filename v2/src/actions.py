import re,json,sys
ACT=re.compile(r"contV\(|\bcont\(|contLab\(|\bpick\(|sortV\(|photoPick\(|\.onclick|barTarget\(|fp\.next|film\(|target\(|quelTerminal\(|return vem\(|gate\(")
def analyze(src,lines,seq_re=r"\nrunSeq\(\[(.*)\]\);"):
  seq=re.search(seq_re,src,re.S).group(1)
  items=re.findall(r"\[(['\"])(.*?)\1,(.*?)\](?=,\[|$)",seq)
  out=[]
  for _,name,fn in items:
    fn=fn.strip()
    body=fn
    m=re.match(r"[A-Za-z_]\w*$",fn)
    if m:
      mm=re.search(r"async function "+fn+r"\(.*?(?=\nasync function |\n/\*|\nconst [A-Z]|\nfunction |\nrunSeq)",src,re.S)
      body=mm.group(0) if mm else ''
    ids=set(re.findall(r"sayS?\('([a-z]\w*)'",body))|set(re.findall(r"info\(L,'(\w+)'",body))
    chars=sum(len(lines.get(i,{}).get('t','')) for i in ids)
    out.append((name,bool(ACT.search(body)),round(chars/14)))
  return out
f=sys.argv[1];lf=sys.argv[2] if len(sys.argv)>2 else None
src=open(f).read()
if lf: lines=json.load(open(lf))
else: lines=json.loads(re.search(r'const LINES=(\{.*?\});\n',src).group(1))
run=0
for i,(n,a,sec) in enumerate(analyze(src,lines)):
  run=0 if a else run+1
  print(f"{i:2} {'clic' if a else '----'} ~{sec:3}s {n}{'   <== '+str(run)+' écrans sans clic' if run>=2 else ''}")
