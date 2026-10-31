import cv2,numpy as np
def colmask(a,ranges):
  h=cv2.cvtColor(a,cv2.COLOR_BGR2HSV);m=np.zeros(a.shape[:2],np.uint8)
  for lo,hi in ranges:m|=cv2.inRange(h,lo,hi)
  return m
# feux anticollision : textes et flèches jaunes
a=cv2.imread('orig/anticoll.jpg')
m=colmask(a,[((20,90,150),(38,255,255))])
cv2.rectangle(m,(180,215,),(800,272),255,-1) if False else None;cv2.rectangle(m,(180,215),(800,272),255,-1);m=cv2.dilate(m,np.ones((7,7),np.uint8))
cv2.imwrite('m_anticoll.png',m)
o=cv2.inpaint(a,m,6,cv2.INPAINT_TELEA);cv2.imwrite('sp_anticoll.png',o)
# T1 : titre, étiquettes, flèches, ellipses
a=cv2.imread('orig/t1cdg.jpg')
m=colmask(a,[((4,110,140),(22,255,255)),((0,120,120),(4,255,255)),((170,120,120),(180,255,255)),((0,50,140),(12,255,255)),((165,50,140),(180,255,255))])
for x0,y0,x1,y1 in [(1360,400,1600,495),(285,525,565,615),(1150,660,1545,732)]:cv2.rectangle(m,(x0,y0),(x1,y1),255,-1)
m=cv2.dilate(m,np.ones((7,7),np.uint8));cv2.imwrite('m_t1.png',m)
o=cv2.inpaint(a,m,6,cv2.INPAINT_TELEA);cv2.imwrite('sp_t1cdg.png',o)
