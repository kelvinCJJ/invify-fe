/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APIURL: "https://localhost:7028/api",
    AUTHURL: "https://localhost:7028/auth"
  },
}

module.exports = nextConfig
