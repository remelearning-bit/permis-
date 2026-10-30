# Sources de construction de la V2 (étapes 1, 2, 3)

Les pages v2/etape1.html, etape2.html et etape3.html sont construites à partir du préambule (v2/preambule.html), qui sert de modèle : moteur, panneau, voix, main orange, journal, navigation libre.

- build.py : étape 1 (e1.js + voix et images reprises de l'ancienne etape1.html, voir l'historique git).
- build2.py : étape 2 (e2.js + e2data.js : photographies IGN, photos des postes, données de la visite, extraites de navigation/permis-t-etape2-zonage-plongee.html).
- build3.py : étape 3 (e1.js pour les outils communs + e3.js + e3img/).
- patch.py : correctifs communs appliqués après chaque construction (son bloqué, apparition des cartes, bouton visible sur téléphone).
- run.js / run2.js : robots de test (rapide avec ?fast, ou en temps réel avec captures toutes les 2,5 s).

Les chemins des scripts pointent vers /home/claude/w : copier ce dossier là avant de reconstruire.
