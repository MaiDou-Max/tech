import createMDX from '@next/mdx';

const widthMdx = createMDX({
  extension: /\.(md|mdx)$/,
  options: {},
});

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  experimental: {
    mdxRs: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: isProd ? '/tech' : '',
  assetPrefix: isProd ? '/tech' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default widthMdx(nextConfig);
