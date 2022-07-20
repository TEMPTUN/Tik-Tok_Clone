/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors:true,
  },
  reactStrictMode: true,
  images:{
    domains: ['pixy.org',
    'lh3.googleusercontent.com'
    ],
  }
}

module.exports = nextConfig
