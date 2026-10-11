# 004 — Adoucir l'entrée de la home au chargement

- **Status**: TODO
- **Commit**: a567741 (le code concerné n'est pas encore committé : `components/homeIndex.tsx` est non suivi, `styles/main.css` et `components/header/header.tsx` ont des modifications locales)
- **Severity**: MEDIUM
- **Category**: Easing & duration, Cohesion & tokens
- **Estimated scope**: 3 fichiers, environ 30 lignes

## Problem

Au rechargement de la home, l'entrée est ressentie comme « brute » (retour de Jean-Marc). Causes constatées dans le code, à confirmer à l'oeil (le ressenti ne se juge pas depuis le code seul) :

1. **Fondu d'opacité seul, avec une courbe très forte.** `cubic-bezier(0.23, 1, 0.32, 1)` fait faire environ 80 % du changement dans les premiers 100 ms : l'élément « claque » à l'écran au lieu de se poser. Sans déplacement, rien ne donne de sens d'arrivée.
2. **Décalage de 35 ms entre blocs.** C'est environ 2 images : la liste apparaît comme un seul clignotement légèrement décalé, pas comme une révélation ligne par ligne.
3. **Deux langages de mouvement qui se contredisent.** Le header utilise sa propre entrée (500 ms, `ease-in-out` très marqué, avec flou), qui démarre à l'hydratation, hors de phase avec la liste. Une entrée en `ease-in-out` démarre lentement, ce que l'audit signale comme un défaut pour une apparition.

Code actuel, verbatim :

```css
/* styles/main.css:120-136 — current */
/* Home : fondu d'entrée au chargement, décalé de 35 ms par bloc (variable --i).
   fill-mode backwards : l'opacité reprend ensuite sa valeur normale (survol compris). */
.home-in {
  animation: home-in 350ms cubic-bezier(0.23, 1, 0.32, 1) backwards;
  animation-delay: calc(var(--i, 0) * 35ms);
}
@keyframes home-in {
  from {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .home-in {
    animation-duration: 150ms;
    animation-delay: 0s;
  }
}
```

```tsx
// helpers/transitions.tsx:3-9 — current (la variante `fade` n'est utilisée que par le header)
export const fade: Variants = {
  initial: { opacity: 0, filter: "blur(2px)" },
  enter: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.83, 0, 0.17, 1] },
  },
```

Les éléments animés dans `components/homeIndex.tsx` portent déjà la classe `home-in` et la variable `--i` (une valeur par bloc : 0 à 6 pour les sept noms, 7 pour « À propos », 8 pour « Contact »). Ne pas y toucher.

## Target

Entrée de page : apparition rare, donc les durées de la catégorie « explicatif / marketing » sont autorisées. Valeurs tirées du brief de Jean-Marc (`/Users/jean-marc/Sites/portfolio-prototypes/CLAUDE.md`, section 5 : opacité plus léger déplacement de 4 à 12 px, easing doux `cubic-bezier(0.22, 1, 0.36, 1)`, révélation ligne par ligne) :

- Chaque bloc : `opacity: 0 → 1` et `transform: translateY(8px) → translateY(0)`, 500 ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Décalage entre blocs : **55 ms** (au lieu de 35 ms). Dernier bloc (indice 8) : démarre à 440 ms, fin à 940 ms. Les liens restent cliquables pendant l'animation (opacité et transform seulement, aucun `pointer-events` modifié).
- Header : même courbe, **opacité seule** (le header est un élément fixe de 14 px, il ne bouge pas), 500 ms, sans flou, sans `ease-in-out`.
- `prefers-reduced-motion: reduce` : plus de déplacement ni de décalage, fondu seul de 200 ms (plus doux, pas zéro).

```css
/* target — styles/main.css */
/* Home : entrée au chargement, révélation ligne par ligne (variable --i, 55 ms par bloc).
   fill-mode backwards : après l'animation, l'opacité reprend sa valeur normale (survol compris). */
.home-in {
  animation: home-in 500ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: calc(var(--i, 0) * 55ms);
}
@keyframes home-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .home-in {
    animation-name: home-in-fade;
    animation-duration: 200ms;
    animation-delay: 0s;
  }
  @keyframes home-in-fade {
    from {
      opacity: 0;
    }
  }
}
```

```tsx
// target — helpers/transitions.tsx (variante fade uniquement ; exit inchangé)
export const fade: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
```

## Repo conventions to follow

- Pas de fichier de tokens : les courbes sont écrites en littéral dans `styles/main.css` (voir `.home-in` actuel) et dans `helpers/transitions.tsx` (variantes `motion`). Ne pas créer de système de tokens pour cette modification.
- Exemplaire à imiter : la règle `.home-in` actuelle (`styles/main.css:122`), même structure, mêmes noms de classe et de variable `--i`. Le CSS est écrit avec indentation de 2 espaces (Prettier du projet).
- Les animations de `motion` (bibliothèque `motion/react`) vivent dans `helpers/transitions.tsx`.

## Steps

1. Dans `styles/main.css`, remplacer le bloc `/* Home : fondu d'entrée ... */` jusqu'à la fin du `@media (prefers-reduced-motion: reduce)` correspondant (lignes 120 à 136 au moment de ce plan) par le CSS « target » ci-dessus.
2. Dans `helpers/transitions.tsx`, modifier uniquement l'objet `fade` : `initial` devient `{ opacity: 0 }`, et `enter` devient `{ opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }`. Garder `exit` tel quel. Ne pas modifier `delayedFade` ni `stagger`.
3. Ne rien changer dans `components/header/header.tsx` (il importe déjà `fade`).

## Boundaries

- Ne PAS toucher `components/homeIndex.tsx` (les classes `home-in` et les valeurs `--i` y sont correctes).
- Ne PAS toucher `delayedFade` (utilisée par `components/socials.tsx`, pages projet) ni les transitions de survol de la home (200 ms, hors sujet).
- Ne PAS changer de balisage ni ajouter de dépendance.
- Ne PAS ajouter de flou ni de `transition: all`.
- Si le code trouvé ne correspond pas aux extraits ci-dessus (dérive depuis le commit), STOP et le signaler au lieu d'improviser.

## Verification

- **Mécanique** : `npm run type-check` doit passer sans erreur. `npm run build` doit réussir (arrêter d'abord le serveur de développement pour ne pas corrompre `.next`). `npm run lint` est cassé avant cette modification (options ESLint inconnues), ne pas le compter.
- **Feel check** : ouvrir `http://localhost:3000/`, recharger plusieurs fois, et confirmer :
  - les noms arrivent l'un après l'autre en montant de 8 px vers leur place, sans claquer ;
  - « À propos » puis « Contact » suivent dans la foulée ; tout est posé en moins d'une seconde ;
  - le header se fond dans le même rythme, sans flou ni démarrage lent ;
  - un survol pendant l'entrée ne bloque rien (les liens sont cliquables dès le début) et l'estompement des noms au survol fonctionne toujours après l'animation.
  - Dans les DevTools (panneau Animations), mettre la vitesse à 10 % et vérifier que chaque bloc se déplace de 8 px vers 0 en même temps qu'il apparaît, et que l'écart entre deux blocs est visible.
  - Activer `prefers-reduced-motion` (panneau Rendering) : plus de déplacement, plus de décalage, fondu seul de 200 ms.
  - Si 940 ms paraît encore trop long ou trop brusque, les deux réglages à ajuster sont la durée (500 ms) et le décalage (55 ms) : ne pas toucher à la courbe.
- **Done when** : la home se révèle ligne par ligne avec un léger déplacement, le header suit le même rythme, le mouvement réduit ne déplace rien, et `type-check` et `build` passent.
