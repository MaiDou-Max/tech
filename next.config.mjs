import createMDX from '@next/mdx';

const widthMdx = createMDX({
  extension: /\.(md|mdx)$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  experimental: {
    mdxRs: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: '/tech',
  assetPrefix: '/tech/',
};

export default widthMdx(nextConfig);
