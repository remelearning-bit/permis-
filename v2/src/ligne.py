import cv2,numpy as np
im=cv2.imread('/home/claude/rev/ppimg/d112_1.jpg');H,W=im.shape[:2]
hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
m=np.zeros((H,W),np.uint8)
R=lambda a,b,c,d:cv2.rectangle(m,(a,b),(c,d),255,-1)
R(1112,0,1820,88)
# flèche orange du haut : couleur orange dans la bande
band=np.zeros_like(m);band[80:345,1430:1510]=255
org=cv2.inRange(hsv,(5,120,150),(22,255,255));m|=org&band
R(340,360,720,603);R(355,612,710,676)
R(1308,362,1700,608);R(1320,612,1695,676)
red=cv2.inRange(hsv,(0,150,150),(6,255,255))|cv2.inRange(hsv,(172,150,150),(180,255,255))
band=np.zeros_like(m);cv2.fillConvexPoly(band,np.array([[990,505],[1060,505],[1160,860],[1100,860]]),255);m|=red&band
m=cv2.dilate(m,np.ones((9,9),np.uint8))
cv2.imwrite('mask.png',m)
out=np.zeros_like(im)
cv2.xphoto.inpaint(im,255-m,out,cv2.xphoto.INPAINT_FSR_FAST)
cv2.imwrite('ligne_raw.png',out)
