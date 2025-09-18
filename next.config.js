/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'm.media-amazon.com',
      'images-eu.ssl-images-amazon.com',
      'n4.sdlcdn.com',
      'n1.sdlcdn.com',
      'n2.sdlcdn.com',
      'img-ik.cars.co.za',
      'media.solvay.com',
      'www.luxurylifestylemag.co.uk',
      'blog.bindy.com',
      'di-uploads-pod14.dealerinspire.com',
      'www.progressive.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
