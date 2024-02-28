// import NextBundleAnalyzer from "@next/bundle-analyzer";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

// const withBundleAnalyzer = NextBundleAnalyzer({
//   enabled: process.env.ANALYZE_BUNDLE === "true",
// });

export default config;
// export default withBundleAnalyzer(config);
