import sys
from PIL import Image,ImageDraw
fs=sys.argv[2:];W=330;H=240
S=Image.new('RGB',(2*W*3,((len(fs)+2)//3)*(H+18)),(200,204,208));d=ImageDraw.Draw(S)
for i,f in enumerate(fs):
  x=(i%3)*2*W;y=(i//3)*(H+18)
  for j,p in enumerate(['orig/','e5/']):
    im=Image.open(p+f).convert('RGB');im.thumbnail((W-6,H-6));S.paste(im,(x+j*W+3,y+3))
  d.text((x+5,y+H+2),f,fill='black')
S.save(sys.argv[1],quality=82)
