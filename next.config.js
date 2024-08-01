/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { proxyTimeout: 120_000 },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 120,
  compiler: {
    removeConsole: false,
  },

  env: {
    LOG_LEVEL: process.env.LOG_LEVEL,
    LOG_CATEGORY: process.env.LOG_CATEGORY || '',
  },

  webpack: (config, options) => {
    // https://github.com/vercel/next.js/discussions/36981
    config.module.generator['asset/resource'] = config.module.generator['asset'];
    config.module.generator['asset/source'] = config.module.generator['asset'];
    delete config.module.generator['asset'];

    // only files in this folder are handled via svgo; it automatically inlines background svgs.
    config.module.rules.push({
      test: /icons\/.*\.svg$/,
      type: 'asset/inline',
      use: 'svgo-loader',
    });

    // other svgs are handled by svgr which let's us import them as React components
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  async headers() {
    const headers = [];
    if (process.env.NOINDEX === 'true') {
      headers.push({ key: 'x-robots-tag', value: 'noindex' });
    }
    if (headers.length) {
      return [
        {
          source: '/(.*)?',
          headers,
        },
      ];
    }
    return [];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
