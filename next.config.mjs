/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        instrumentationHook: true,
    },
    cacheMaxMemorySize: 0
};

export default nextConfig;
