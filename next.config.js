/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  env: {
    APIURL: "https://localhost:7028/api",
    AUTHURL: "https://localhost:7028/auth",    
    BING_COOKIE:"1DmUDupUND3Z0BIcsaWK4NUgbmdjwY4c6ipUUWN1Cxf_tRO4wiHdmjpoaw-FhSgJQsitlpm-CHdQZPbFdxL2nMgWlmqYnTYrA_YqBBtZXFrZkOJ-p-gDMNkJ9ky08i0fsUnkTsvMpB0mRflM1MWXeZBuyny2Hx1JF34VnosLpy_puh6dCIUpcue3bE971a4JeGQppbX5gTGMNJI6qXZXgG02TbTZoPpMgcRUmGazRnLQ"
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig