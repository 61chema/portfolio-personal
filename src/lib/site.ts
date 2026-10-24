// Public address of the site, used for metadata, the sitemap and robots.txt (server only).
// On Vercel it comes from the project's production domain, which is the custom domain once
// one is added, or the free *.vercel.app one until then. SITE_URL overrides it anywhere else.

const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const SITE_URL =
  process.env.SITE_URL ?? (vercelDomain ? `https://${vercelDomain}` : 'http://localhost:3000')
