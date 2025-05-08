/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    // Enable HMR with correct WebSocket configuration
    if (!isServer && dev) {
      config.infrastructureLogging = {
        level: 'error',
      }
    }
    return config
  },
  webpackDevMiddleware: (config) => {
    // Improve WebSocket handling for development
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  // Add proper WebSocket configuration for containerized environments
  experimental: {
    webSocketSettings: {
      // Use more resilient connection settings
      pingInterval: 5000,
      pingTimeout: 30000,
    },
    // Force server components to make the connection more stable
    serverComponents: true,
  },
}

module.exports = nextConfig