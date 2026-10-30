const merc=(lat,lon)=>{const r=lat*Math.PI/180;return [(lon+180)/360,(1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2]};
const C0=merc(IGN.lat,IGN.lon);const PX=z=>2**z*256;
const A=merc(49.0097,2.5479);
const PP=[C0[0]+80/PX(19),C0[1]-105/PX(19)]; // l'avion visé, sur la photo la plus proche
const px14=(x,y)=>[C0[0]+(x-800)/PX(14),C0[1]+(y-500)/PX(14)];
