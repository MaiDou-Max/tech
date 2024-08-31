import createMDX from "@next/mdx";

const widthMdx = createMDX({
  extension: /\.mdx?$/,
  options: {}
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
};

export default widthMdx(nextConfig);
