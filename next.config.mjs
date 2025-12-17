/** @type {import('next').NextConfig} */
const repoName = '';

const nextConfig = {
  output: 'export',
  basePath: repoName ? `/${repoName}` : '',
  assetPrefix: repoName ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
