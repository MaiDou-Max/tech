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
};

export default widthMdx(nextConfig);
