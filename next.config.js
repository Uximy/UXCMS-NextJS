/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        // Будет доступно только на сервере
        domain: 'localhost',
        port: '3000',
        secretKey: 'fkhdkfhkdsjlfjsldhfksdfjklds',
        steamApiKey: '527EE8406306B8922F49DE45C53DC3C8'
    },
    images: {
        domains: ['avatars.steamstatic.com'],
    },
};

module.exports = nextConfig;
