/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  env: {
    APIURL: "https://invify.azurewebsites.net/api",
    AUTHURL: "https://invify.azurewebsites.net/auth",  
    BING_COOKIE:"1vDNof-eXcKR7kuyvliL66fBZHPiQvxWUNNIYgJIOhZjOXrG0aYonQ-E8OFGCEuGEgY3SH4MWYTVNhznrM4L6Qe-vxrQO1b1VTO6t1Xyyr8NOxl4EKbFfJOZ_uihTHYDM1vkX9UeqZc227TZBOFTCPSUfEjTWvKyhGvGaH2IENPfApjmiegFAbl5MHZTEYASOe0QGF0CQN03RdZNr4HuGWwb6yjP41anTWnh-x7VtIdM"
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
