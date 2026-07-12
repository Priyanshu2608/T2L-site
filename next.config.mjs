/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/legal-services.html',
        destination: '/legal-services',
      },
      {
        source: '/docengine.html',
        destination: '/docengine',
      },
      {
        source: '/introspector.html',
        destination: '/introspector',
      },
      {
        source: '/resources.html',
        destination: '/resources',
      },
      {
        source: '/login.html',
        destination: '/login',
      },
      {
        source: '/signup.html',
        destination: '/signup',
      },
    ];
  },
};

export default nextConfig;
