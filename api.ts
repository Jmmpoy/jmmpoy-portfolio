const data = [
  {
    id: "LeCann",
    name: "Le Cann",
    year: "2026",
    role: "Développement",
    tags: ["Architecture", "Design d'Intérieur", "Développement Front-End"],
    description: {
      firstPart:
        "Pour Le Cann, studio parisien d'architecture d'intérieur fondé par Raphaëlle Robert et Guillaume Fantin, je développe le site présentant leurs intérieurs et leurs mobiliers, de l'hôtellerie au résidentiel en passant par le retail et les bureaux. L'enjeu est de laisser toute la place aux photographies et à l'atmosphère du studio, dans une navigation sobre et élégante.",
      secondPart:
        "Le site est développé avec Next.js et le CMS Sanity, qui permet au studio de gérer ses projets et ses contenus en toute autonomie.",
    },
    color: "bg-yellow-500",
    link: "https://www.studiolecann.fr/le-cann-i-interieurs",
    coverImage: "/assets/Projects/LeCann/lecann-1.webp",
    secondaryImage: "/assets/Projects/LeCann/lecann-2.webp",
    inProgress: true,
  },
  {
    id: "AgatheMarimbert",
    name: "Agathe Marimbert",
    year: "2026",
    tags: ["Architecture", "Design d'Intérieur", "Objets"],
    link: "https://www.marimbert.fr",
    coverImage: "https://cdn.sanity.io/images/idcklk40/production/6e2f8494aa0f4c4110321d295e939bad4a9507b2-5370x8047.jpg?w=1200&q=90&fit=crop&auto=format",
    description: {
      firstPart:
        "Pour Agathe Marimbert, architecte d'intérieur basée à Paris, j'ai développé son portfolio numérique présentant son expertise en architecture résidentielle, bureaux et design retail. Le défi était de créer une plateforme qui incarne sa philosophie de design — épurée, intemporelle, orientée vers la qualité des matériaux et des proportions — tout en mettant en avant ses collaborations avec clients institutionnels et entreprises.",
      secondPart:
        "Le site a été construit avec Next.js et Tailwind CSS, créant un environnement numérique qui reflète l'expertise d'Agathe. La présentation des projets résidentiels, des aménagements commerciaux aux espaces de travail, en passant par sa collection d'objets architecturaux, offre une immersion dans son univers de design épuré et fonctionnel.",
    },
    secondaryImage: "https://cdn.sanity.io/images/idcklk40/production/591381aa0313d116fb7707c072c2ea39463fd86b-928x1160.png?w=1200&q=90&fit=crop&auto=format",
    thirdImage: "https://cdn.sanity.io/images/idcklk40/production/f72292303d91fde1cea1ce4dd5d64785358ae1fc-4330x6494.jpg?w=1200&q=90&fit=crop&auto=format",
    fourthImage: "https://cdn.sanity.io/images/idcklk40/production/d99c8b4bc03e6a55dee506b8726299ed29e6b2f6-4394x6591.jpg?w=1200&q=90&fit=crop&auto=format",
    fifthImage: "https://cdn.sanity.io/images/idcklk40/production/fa57df670589ef15830228e3afcf54f8375b5dfe-5417x8117.png?w=1200&q=90&fit=crop&auto=format",
    sixthImage: "https://cdn.sanity.io/images/idcklk40/production/97acd627ddde10c6f63bd6bb2f5c6f0d7fbf5e32-6000x4000.jpg?w=1200&q=90&fit=crop&auto=format",
    seventhImage: "https://cdn.sanity.io/images/idcklk40/production/8f4d7e2c1b3a5f9e6c2d8a1f4b7c9e3d-4000x6000.jpg?w=1200&q=90&fit=crop&auto=format",
    eighthImage: "https://cdn.sanity.io/images/idcklk40/production/5e1f8c3b9d2a7f4e6b1c9a3d8f5b2e7c-5000x3333.jpg?w=1200&q=90&fit=crop&auto=format",
    ninthImage: "https://cdn.sanity.io/images/idcklk40/production/3a2b8e1f5c7d9a4e6f3c1b8d2e5a9f7c-4500x6750.jpg?w=1200&q=90&fit=crop&auto=format",
  },
  {
    id: "AntoninSaurat",
    name: "Antonin Saurat",
    year: "2026",
    tags: ["Direction Artistique", "Design de Marque", "UI Design"],
    link: "https://www.antoninsaurat.work/",
    coverImage: "https://framerusercontent.com/images/1M0d5YjIfANDmWpB9JoPEGIlCk.jpg?width=1200",
    description: {
      firstPart:
        "Pour Antonin Saurat, designer indépendant et directeur artistique, j'ai développé son portfolio numérique présentant ses compétences en direction de marque, design d'identité visuelle et direction artistique. Le défi était de créer une vitrine qui incarne sa philosophie de design — épurée, réfléchie, orientée vers l'impact visuel — tout en mettant en avant ses collaborations avec startups, agences et marques établies.",
      secondPart:
        "Le site a été construit avec Next.js et Tailwind CSS, créant un environnement numérique qui reflète l'expertise d'Antonin. La présentation des projets, de l'identité logotype au design multichannel en passant par la direction artistique, offre une immersion dans son univers créatif et professionnel.",
    },
    secondaryImage: "https://framerusercontent.com/images/9dWJtEYsiX7oGkGHBrxKZfyVyQE.png?width=1200",
    thirdImage: "https://framerusercontent.com/images/M5otmogB8Ul8hOgv9DKYKlKJbWU.webp?width=1200",
    fourthImage: "https://framerusercontent.com/images/fjsFuk14swVqnSxORuHbayZxztc.png?width=1200",
    fifthImage: "https://framerusercontent.com/images/RqxYheayB8injENYYEqGkjwpzg.jpg?width=1200",
    sixthImage: "https://framerusercontent.com/images/yFRWWNgP3F9ZThvCiAXdTxEQgE.webp?width=1200",
    seventhImage: "https://framerusercontent.com/images/4K8m2vJfAfXpQ9wB1nR5eT7dH3sL6kJ8.jpg?width=1200",
    eighthImage: "https://framerusercontent.com/images/7Z2nP5gE9x1fD4mV8wR3yL6bJ9kS2pN5.png?width=1200",
    ninthImage: "https://framerusercontent.com/images/3X6jW1aQ8sF4cL7rK2vM9bN5tE3hZ8pJ.webp?width=1200",
    tenthImage: "https://framerusercontent.com/images/5G4hT8kN1pE6sD9wB2vZ7mL3jF4aR8qX.jpg?width=1200",
  },
  {
    id: "Beaumonde",
    name: "Beaumonde",
    year: "2026",
    tags: ["Développement Front-End"],
    description: {
      firstPart:
        "Pour Beaumonde, agence de talents et de production basée à Paris, j'ai développé le site vitrine présentant leurs photographes, réalisateurs et set designers. L'enjeu était de restituer fidèlement l'identité éditoriale de l'agence — grille d'images, typographie et mise en page épurée — dans une navigation fluide entre les portfolios de chaque talent.",
      secondPart:
        "Le site a été développé sur Next.js avec une intégration Tailwind CSS sur mesure, garantissant des performances optimales et une navigation fluide entre les différentes pages talents.",
    },
    color: "bg-orange-500",
    link: "https://beaumonde.paris/",
    coverImage: "/assets/Projects/Beaumonde/beaumonde-2.webp",
    secondaryImage: "/assets/Projects/Beaumonde/beaumonde-1.webp",
    thirdImage: "/assets/Projects/Beaumonde/beaumonde-5.webp",
    fourthImage: "/assets/Projects/Beaumonde/beaumonde-6.webp",
    fifthImage: "/assets/Projects/Beaumonde/beaumonde-7.webp",
    sixthImage: "/assets/Projects/Beaumonde/beaumonde-8.webp",
    seventhImage: "/assets/Projects/Beaumonde/beaumonde-9.webp",
    eighthImage: "/assets/Projects/Beaumonde/beaumonde-10.webp",
  },
  {
    id: "LeaZeroil",
    name: "Léa Zeroil",
    year: "2026",
    tags: ["Développement Front-End"],
    description: {
      firstPart:
        "Pour Léa Zeroil, designer de mobilier basée à Paris, j'ai développé le site e-commerce présentant ses collections de pièces sculpturales. L'objectif était de mettre en valeur chaque objet — luminaires, assises, tables — dans une expérience d'achat sobre et élégante, fidèle à l'univers de la marque.",
      secondPart:
        "Le site a été développé sur Next.js, avec une gestion du catalogue et du tunnel d'achat pensée pour une navigation fluide sur l'ensemble des collections.",
    },
    color: "bg-pink-500",
    link: "https://www.leazeroil.com/",
    coverImage: "/assets/Projects/LeaZeroil/leazeroil-5.webp",
    secondaryImage: "/assets/Projects/LeaZeroil/leazeroil-1.webp",
    thirdImage: "/assets/Projects/LeaZeroil/leazeroil-3.webp",
    fourthImage: "/assets/Projects/LeaZeroil/leazeroil-8.webp",
    fifthImage: "/assets/Projects/LeaZeroil/leazeroil-2.webp",
    sixthImage: "/assets/Projects/LeaZeroil/leazeroil-6.webp",
    seventhImage: "/assets/Projects/LeaZeroil/leazeroil-7.webp",
  },
  {
    id: "Maison90",
    name: "Maison90",
    year: "2023 - 2024",
    tags: ["Développement Front-End", "Direction Artistique", "UI Design"],
    description: {
      firstPart:
        "Pour accompagner la nouvelle identité de Maison90, j'ai assuré la refonte globale de leur site, en intervenant à la fois sur le design et le développement. J'ai contribué à la direction artistique — choix typographiques, palette, rythme visuel — afin d'incarner leur univers créatif dans une expérience digitale cohérente et performante.",
      secondPart:
        "Développé avec Next.js et Tailwind CSS, le site offre une navigation fluide et un référencement optimisé, tandis que le CMS Sanity permet au client de gérer son contenu en toute autonomie. Le projet a été conduit selon une méthodologie agile, favorisant échanges et itérations continues.",
    },
    color: "bg-purple-500",
    link: "https://www.maison90.com/",
    coverImage: "/assets/Projects/Maison90/Home.webp",
    secondaryImage: "/assets/Projects/Maison90/gd-go.mp4",
    thirdImage: "/assets/Projects/Maison90/Projcets.webp",
    fourthImage: "/assets/Projects/Maison90/gysis.mp4",
    fifthImage: "/assets/Projects/Maison90/InspirationHub.webp",
    sixthImage: "/assets/Projects/Maison90/gidm.mp4",
    seventhImage: "/assets/Projects/Maison90/Homepage.webp",
    eighthImage: "/assets/Projects/Maison90/projet.mp4",
  },
  {
    id: "myCanal",
    name: "MyCanal",
    year: "2020 - 2023",
    tags: ["Développement Front-End"],
    description: {
      firstPart:
        "Au sein de l’équipe Front-End de myCanal, j’ai contribué à faire évoluer une expérience de divertissement premium utilisée par des millions d’utilisateurs sur Windows et Xbox. J’ai participé à la conception et au développement de nouvelles fonctionnalités, tout en optimisant les performances et la fluidité de navigation, notamment pour les interactions spécifiques à la manette et au clavier.",
      secondPart:
        "Ce travail, mené en méthodologie Agile, m’a permis d’allier exigence technique et souci du détail UX, afin d’offrir une interface fluide, robuste et fidèle à l’univers Canal+.",
    },
    color: "bg-red-500",
    link: "https://www.canalplus.com/",
    coverVideo: "/assets/Projects/myCanal/landing.mp4",
    coverImage: "/assets/Projects/myCanal/kawasi-2.webp",
    secondaryImage: "/assets/Projects/myCanal/the wire .webp",
    thirdImage: "/assets/Projects/myCanal/sopranos.webp",
    fourthImage: "/assets/Projects/myCanal/canal-3.webp",
  },
  {
    id: "Filmo",
    name: "Filmo Tv",
    year: "2020-2023",
    tags: ["Développement Mobile"],
    description: {
      firstPart:
        "J’ai participé à la refonte complète de l’application mobile FilmoTV pour iOS et Android, avec pour objectif de moderniser l’expérience de visionnage et de simplifier le parcours utilisateur. En collaboration étroite avec les designers et les équipes back-end, j’ai développé des composants clés de l’application en React Native, notamment le catalogue de films, la page de lecture et le parcours de souscription.",
      secondPart:
        "Ce projet m’a permis de concilier design d’interface et développement mobile, au service d’une expérience fluide, intuitive et adaptée aux usages de la plateforme.",
    },
    color: "bg-green-500",
    link: "https://www.filmotv.fr/",
    coverVideo: "/assets/Projects/Filmo/landing.mp4",
    coverImage: "/assets/Projects/Filmo/filmo.webp",
    secondaryImage: "/assets/Projects/Filmo/filmo2.webp",
    thirdImage: "/assets/Projects/Filmo/filmo3.webp",
  },
];

export default data;
