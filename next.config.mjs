import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'top-silver.ua',
        pathname: '/storage/**',
      }
    ],
  },
}

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
