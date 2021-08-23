const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "steamcdn-a.akamaihd.net",
      "cdn.akamai.steamstatic.com",
      "cheapshark.com",
    ],
  },
  productionBrowserSourceMaps: true,
});
