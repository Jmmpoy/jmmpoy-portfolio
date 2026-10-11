# Plans d'animation

| # | Titre | Sévérité | Statut |
| --- | --- | --- | --- |
| 001 | Header logo press feedback | LOW | Périmé : l'effet de survol du logo a été retiré volontairement (décision de Jean-Marc). Ne pas réappliquer. |
| 002 | Project thumbnail feedback | n/a | À réconcilier : concerne la grille de projets supprimée avec l'ancienne home. |
| 003 | In-progress card state | n/a | À réconcilier : même cause (cartes de l'ancienne grille). Le tag « En cours » existe maintenant dans `components/homeIndex.tsx`. |
| 004 | Adoucir l'entrée de la home au chargement | MEDIUM | TODO |

## Ordre recommandé

1. 004 (seul plan actif). Il n'a aucune dépendance.

Les plans 001 à 003 ont été écrits sur une version antérieure du site (commit `d97774e`). Lancer `improve-animations reconcile` pour les retirer ou les mettre à jour proprement ; je n'y ai pas touché.
