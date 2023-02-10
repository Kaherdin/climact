const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true" || false,
});
module.exports = withBundleAnalyzer({
  images: {
    domains: ["localhost", "res.cloudinary.com"],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
});
