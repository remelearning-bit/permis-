import glob,sys
from PIL import Image,ImageDraw
fs=sorted(glob.glob(sys.argv[1]))[int(sys.argv[4]) if len(sys.argv)>4 else 0:][:int(sys.argv[5]) if len(sys.argv)>5 else 999]
cols=int(sys.argv[3]);W=int(sys.argv[6]) if len(sys.argv)>6 else 340
im0=Image.open(fs[0]);H=int(W*im0.size[1]/im0.size[0])
S=Image.new('RGB',(cols*W,((len(fs)+cols-1)//cols)*(H+16)),'white');d=ImageDraw.Draw(S)
for i,f in enumerate(fs):
  im=Image.open(f).convert('RGB').resize((W-4,H-2));x=(i%cols)*W;y=(i//cols)*(H+16);S.paste(im,(x+2,y));d.text((x+4,y+H),f.split('/')[-1],fill='black')
S.save(sys.argv[2],quality=82)
