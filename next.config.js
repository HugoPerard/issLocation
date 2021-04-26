module.exports = {
  async redirects() {
    return [
      {
        source: '/storybook',
        destination: '/storybook/index.html',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Do not rewrite API routes
      {
        source: '/api/:any*',
        destination: '/api/:any*',
      },
      // Rewrite everything else to use `pages/app`
      {
        source: '/app/:any*',
        destination: '/app/',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
            key: 'Content-Security-Policy',
            value:
              "default-src [iss-location.vercel.app] 'self' data: font-src 'self' data:",
          },
        ],
      },
    ];
  },
};
