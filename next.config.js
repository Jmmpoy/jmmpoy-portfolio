module.exports = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'framerusercontent.com' },
    ],
  },

  // Configuration pour éviter les erreurs GSAP côté serveur
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ne pas traiter GSAP côté serveur
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Exclure GSAP du rendu serveur
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        {
          gsap: "gsap",
          "gsap/ScrollTrigger": "gsap/ScrollTrigger",
          "gsap/SplitText": "gsap/SplitText",
          "@gsap/react": "@gsap/react",
        },
      ];
    }

    return config;
  },

  // Transpiler GSAP correctement
  transpilePackages: ["gsap"],
};
