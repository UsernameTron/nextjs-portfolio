/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
      }
    ],
    formats: ['image/webp', 'image/avif']
  },
  async rewrites() {
    return [
      {
        source: '/case-studies/:path*',
        destination: '/case-studies/:path*'
      }
    ]
  }
}

module.exports = nextConfig 