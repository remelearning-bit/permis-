import cv2,numpy as np,sys,json
from PIL import Image,ImageFilter,ImageEnhance
def trim(a):
  g=cv2.cvtColor(a,cv2.COLOR_BGR2GRAY);bg=(g>243)|(g<14)
  rows=np.where(bg.mean(1)<.9)[0];cols=np.where(bg.mean(0)<.9)[0]
  return a[rows[0]:rows[-1]+1,cols[0]:cols[-1]+1]
def proc(name,inset=.035,box=None,dn=3,sh=1.6,out=None,maxw=1600):
  a=cv2.imread('orig/'+name)
  if box: a=a[box[1]:box[3],box[0]:box[2]]
  a=trim(a);h,w=a.shape[:2];r=int(inset*min(w,h));a=a[r:h-r,r:w-r]
  if dn:a=cv2.fastNlMeansDenoisingColored(a,None,dn,dn,7,21)
  p=Image.fromarray(a[:,:,::-1])
  if p.width>maxw:p=p.resize((maxw,round(p.height*maxw/p.width)),Image.LANCZOS)
  elif p.width<1200:p=p.resize((1200,round(p.height*1200/p.width)),Image.LANCZOS)
  p=p.filter(ImageFilter.UnsharpMask(sh,70,2));p=ImageEnhance.Contrast(p).enhance(1.05)
  p.save('e5/'+(out or name),quality=90);return p.size
J=json.loads(sys.argv[1])
for n,o in J.items():print(n,proc(n,**o))
