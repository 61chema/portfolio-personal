// Public address of the site, used for metadata, the share image, the sitemap and robots.txt
// (server only). Change PRODUCTION_URL when the site moves to its own domain; the SITE_URL
// environment variable overrides it without touching code.

const PRODUCTION_URL = 'https://61chema.vercel.app'

export const SITE_URL =
  process.env.SITE_URL ?? (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : PRODUCTION_URL)
