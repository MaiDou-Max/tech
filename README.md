This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/index.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Deploy on GitHub Pages

This project is configured to deploy to GitHub Pages automatically. Follow these steps:

1. **Enable GitHub Pages in your repository settings:**
   - Go to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Push your code to the main branch:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **The deployment will run automatically** via GitHub Actions. You can monitor the progress in the "Actions" tab.

4. **Access your site** at: `https://[your-username].github.io/tech/`

### Local Build for Production

To test the production build locally:

```bash
pnpm build
# The output will be in the 'out' directory
```

### Configuration

- The project uses `basePath: '/tech'` in `next.config.mjs` for GitHub Pages deployment
- Images are configured with `unoptimized: true` for static export
- The `.nojekyll` file ensures GitHub Pages serves all files correctly

