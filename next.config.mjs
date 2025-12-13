import path from "path";
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        "fs/promises": false,
        child_process: false,
        dns: false,
        "timers/promises": false,
        util: false,
        crypto: false,
        stream: false,
      };
    }
    // Add alias for '@' to resolve to 'src' directory
    config.resolve.alias["@"] = path.resolve("./src");
    return config;
  },
};
export default nextConfig;
