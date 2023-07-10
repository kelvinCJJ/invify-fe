/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  env: {
    APIURL: "https://invify.azurewebsites.net/",
    AUTHURL: "https://invify.azurewebsites.net/"
  },
}

module.exports = nextConfig
