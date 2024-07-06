/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        // Будет доступно только на сервере
        domain: 'localhost',
        port: '3000',
        secretKey: 'fkhdkfhkdsjlfjsldhfksdfjklds',
        steamApiKey: 'steamApiKey'
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'avatars.steamstatic.com',
              port: '',
              pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.akamai.steamstatic.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            }
        ],
    },
};

module.exports = nextConfig;
