# Sources de construction de la V2 (étapes 1, 2, 3)

Les pages v2/etape1.html, etape2.html et etape3.html sont construites à partir du préambule (v2/preambule.html), qui sert de modèle : moteur, panneau, voix, main orange, journal, navigation libre.

- build.py : étape 1 (e1.js + voix et images reprises de l'ancienne etape1.html, voir l'historique git).
- build2.py : étape 2 (e2.js + e2data.js : photographies IGN, photos des postes, données de la visite, extraites de navigation/permis-t-etape2-zonage-plongee.html).
- build3.py : étape 3 (e1.js pour les outils communs + e3.js + e3img/).
- patch.py : correctifs communs appliqués après chaque construction (son bloqué, apparition des cartes, bouton visible sur téléphone).
- run.js / run2.js : robots de test (rapide avec ?fast, ou en temps réel avec captures toutes les 2,5 s).

Les chemins des scripts pointent vers /home/claude/w : copier ce dossier là avant de reconstruire.

## ATTENTION : pages modifiées directement le 19 et le 20 novembre 2026

Les pages de `v2/` ont été retouchées à la main, sans passer par les scripts de ce dossier. Reconstruire une page depuis ces sources efface ces retouches. Avant toute reconstruction, les reporter dans les sources :

- Toutes les pages sauf l'étape 7 : bouton « Écran précédent » pour l'apprenant, reprise à l'écran `?s=N`.
- Étape 2, écran 5 : les cinq vues des postes sur le plan Groupe ADP (gris, marine, pastilles jaunes).
- Étape 3 : horaires 13 Papa (4 h à 17 h) et 29 India (5 h à 18 h), voix a11 coupée, « huit choses » dans les indices.
- Étape 5 : double stop (lignes stop, zone rouge), pelouse retirée, voie avion à gauche de la zone qui déborde.
- Étape 7 : zone d'attente rouge et blanc, lignes des postes raccordées à la voie avion, passerelle hors du cheminement.
- Étape 8 : ligne stop. Démonstration de la panne : balise bleue retirée de la route.
- Étape 10 : photos accentuées. Préambule : page entière de l'annexe 8.
