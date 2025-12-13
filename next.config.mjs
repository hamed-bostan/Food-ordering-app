/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ourbsjovbidvokapxslo.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Explicitly enable Turbopack (Next 16 default)
  turbopack: {},
};

export default nextConfig;
