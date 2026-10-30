/* Étape 5 · écran témoin : la traversée d'une voie avion, en scène 3D continue à la première personne */
const H5="Étape 5 · La circulation des véhicules";
var CAPS={};
/*__T5__*/
async function finT(){step();head(H5,'Fin de l\'écran témoin');
 vue(`<div class="qc" style="width:min(760px,100%)"><p class="q">Fin de l'écran témoin</p><p style="margin:10px 0 0;font-size:18px;line-height:1.45">Votre journal de l'écran</p><ul class="jl">${jhtml(false)}</ul></div>`);
 VB.innerHTML=`<a class="act" style="text-decoration:none;pointer-events:auto" href="?">Rejouer</a>`}
runSeq([['Traverser une voie avion',traversee],['Fin',finT]]);
