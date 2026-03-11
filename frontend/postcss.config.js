module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    process.env.NODE_ENV === 'production'
      ? [
          '@fullhuman/postcss-purgecss',
          {
            content: [
              './app/**/*.{js,jsx,ts,tsx}',
              './components/**/*.{js,jsx,ts,tsx}',
              './integrations/**/*.{js,jsx,ts,tsx}',
              './public/**/*.html',
            ],
            defaultExtractor: (content) => {
              const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
              const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
              return broadMatches.concat(innerMatches);
            },
            safelist: {
              standard: [
                'html',
                'body',
                /^nav-/,
                /^navbar-/,
                /^btn-/,
                /^col-/,
                /^row/,
                /^container/,
                /^gap-/,
                /^p-/,
                /^m-/,
                /^text-/,
                /^bg-/,
                /^d-/,
                /^justify-/,
                /^align-/,
                /^border-/,
                /^rounded-/,
                /^fs-/,
                /^fw-/,
                /^lh-/,
                /^z-/,
                /^position-/,
                /^top-/,
                /^bottom-/,
                /^start-/,
                /^end-/,
                /^w-/,
                /^h-/,
                /^swiper/,
                /^animate__/,
                /^wow/,
                /^ri-/,
                'active',
                'show',
                'fade',
                'collapsing',
                'sticky',
                'fixed',
                'open',
                'closed',
                'mobile-menu-active',
                'burger-icon-active',
                'offCanvas__info',
                'offCanvas__overly',
                'hover-up',
                'icon_hover',
              ],
              deep: [/^swiper-/, /^pb-/, /^pt-/, /^my-/, /^mx-/, /^px-/, /^py-/, /^mt-/, /^mb-/, /^ms-/, /^me-/, /^gy-/, /^gx-/],
              greedy: [/^swiper/, /^animate__/],
            },
          },
        ]
      : undefined,
  ].filter(Boolean),
};
