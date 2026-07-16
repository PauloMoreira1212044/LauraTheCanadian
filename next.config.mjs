/** @type {import('next').NextConfig} */

// GitHub Pages serves a *project* site under a sub-path (e.g. /LauraTheCanadian).
// The deploy workflow sets NEXT_PUBLIC_BASE_PATH to that sub-path so all links
// and assets are prefixed correctly. Locally the var is empty, so `npm run dev`
// and root hosts (like Vercel) keep working at "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export", // fully static export -> ./out (no server needed)
  basePath: basePath || undefined,
  images: { unoptimized: true }, // no Image Optimization server on static hosts
  trailingSlash: true, // GitHub Pages maps /path/ -> /path/index.html
  reactStrictMode: true,
};

export default nextConfig;
