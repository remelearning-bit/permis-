from PIL import Image,ImageDraw,ImageFont,ImageFilter,ImageEnhance
F=lambda w,s:ImageFont.truetype(f'barlow{w}.ttf',s)
INK=(29,35,41);RED=(196,22,28);GREY=(128,132,136)
def sign(kind,W=520,H=700):
  k=3;W*=k;H*=k;u=W/1560;im=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(im)
  d.rounded_rectangle((0,0,W-1,H-1),radius=int(40*u),fill=(255,255,255),outline=INK,width=int(30*u))
  d.rounded_rectangle((45*u,45*u,W-46*u,H-46*u),radius=int(20*u),outline=INK,width=max(2,int(10*u)))
  if kind=='in':
    f=F(700,int(330*u));t='ZONE';tw=d.textlength(t,font=f);d.text(((W-tw)/2,120*u),t,font=f,fill=INK)
    cx,cy,r=W/2,H*.64,W*.36;d.ellipse((cx-r,cy-r,cx+r,cy+r),fill=(255,255,255),outline=RED,width=int(r*.2))
    f=F(700,int(r*1.05));t='30';tw=d.textlength(t,font=f);d.text((cx-tw/2,cy-r*.66),t,font=f,fill=INK)
  else:
    f=F(700,int(200*u));t='FIN DE ZONE';tw=d.textlength(t,font=f)
    if tw>W-260*u:f=F(700,int(200*u*(W-260*u)/tw));tw=d.textlength(t,font=f)
    d.text(((W-tw)/2,150*u),t,font=f,fill=INK)
    cx,cy,r=W/2,H*.64,W*.36;d.ellipse((cx-r,cy-r,cx+r,cy+r),fill=(255,255,255),outline=GREY,width=int(r*.2))
    f=F(700,int(r*1.05));t='30';tw=d.textlength(t,font=f);d.text((cx-tw/2,cy-r*.66),t,font=f,fill=GREY)
    import math;b=W*.06;x0,y0,x1,y1=70*u,H-70*u,W-70*u,H*.36
    dx,dy=x1-x0,y1-y0;L=math.hypot(dx,dy);nx,ny=-dy/L*b,dx/L*b
    d.polygon([(x0+nx,y0+ny),(x1+nx,y1+ny),(x1-nx,y1-ny),(x0-nx,y0-ny)],fill=INK)
  return im.resize((W//k,H//k),Image.LANCZOS)
def b14(r=60):
  k=3;s=2*r*k;im=Image.new('RGBA',(s,s),(0,0,0,0));d=ImageDraw.Draw(im)
  d.ellipse((0,0,s-1,s-1),fill=(255,255,255),outline=RED,width=int(s*.1))
  f=F(700,int(s*.48));tw=d.textlength('50',font=f);d.text(((s-tw)/2,s*.2),'50',font=f,fill=INK)
  return im.resize((2*r,2*r),Image.LANCZOS)
m=Image.open('d101_1_sans_rose.png').convert('RGB')
ImageDraw.Draw(m).rectangle((1625,0,1920,228),fill=(255,255,255))
m=m.crop((10,30,1920,1062))
# fond blanc franc, contraste léger
m=ImageEnhance.Contrast(m).enhance(1.12);m=m.filter(ImageFilter.UnsharpMask(1.2,60,2))
W0,H0=1600,1240;C=Image.new('RGB',(W0,H0),(255,255,255))
mw=W0;mh=round(m.height*mw/m.width);C.paste(m.resize((mw,mh),Image.LANCZOS),(0,70))
d=ImageDraw.Draw(C)
t2='Aéroport Charles de Gaulle';w2=d.textlength(t2,font=F(400,32));d.text((W0-40-w2,36),t2,font=F(400,32),fill=(80,86,92));tw=d.textlength('Plan des vitesses',font=F(700,50));d.text((W0-40-w2-24-tw,20),'Plan des vitesses',font=F(700,50),fill=INK)
y0=70+mh+30;X=40;y=y0
for col,t in [((233,30,214),'Vitesse limitée à 50 km/h'),((30,40,230),'Vitesse limitée à 30 km/h')]:
  d.rectangle((X,y+20,X+70,y+33),fill=col);d.text((X+90,y),t,font=F(600,40),fill=INK);y+=72
X=590;y=y0-6
for ic,t in [(sign('in',58,78),'Entrée de zone 30'),(sign('out',58,78),'Sortie de zone 30'),(b14(30),'Limitation à 50 km/h')]:
  C.paste(ic,(X+30-ic.width//2,y+24-ic.height//2),ic);d.text((X+80,y+2),t,font=F(600,40),fill=INK);y+=88
s1=sign('in',180,242);s2=sign('out',180,242);yy=H0-242-24
C.paste(s1,(W0-2*180-60,yy),s1);C.paste(s2,(W0-180-30,yy),s2)
C.save('zone30.jpg',quality=90);print(C.size,mh,y0)
