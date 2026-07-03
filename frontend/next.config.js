/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
// const internalHost = process.env.TAURI_DEV_HOST || 'localhost';

const nextConfig = {
  reactStrictMode: true,
  output: isProd ? undefined : 'export',
  transpilePackages: ['remark', 'remark-html'],
}

module.exports = nextConfig
