/**
 * Production-ready CDN Image Assets for PCSecure Agency.
 * Hosted on ultra-fast high-availability Unsplash CDN (HTTP/2, SSL, Edge Caching).
 * Resolves images via direct public HTTPS links for deployment on Vercel, Netlify, Cloudflare, etc.
 */

export const APP_IMAGES = {
  heroWebDesign:
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
  portfolioSaas:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
  portfolioEcommerce:
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=80',
  portfolioFintech:
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80',
  agencyProcess:
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80',
  digitalMarketing:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
  graphicsDesign:
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1600&q=80',
  agencyShowcase:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
} as const;

/**
 * Normalizes any legacy local file path or empty image reference to a robust public HTTPS link.
 */
export function resolveImageUrl(src?: string): string {
  if (!src) return APP_IMAGES.heroWebDesign;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;

  const lower = src.toLowerCase();
  if (lower.includes('saas') || lower.includes('platform')) return APP_IMAGES.portfolioSaas;
  if (lower.includes('ecommerce') || lower.includes('luxury') || lower.includes('store'))
    return APP_IMAGES.portfolioEcommerce;
  if (lower.includes('fintech') || lower.includes('portal') || lower.includes('banking'))
    return APP_IMAGES.portfolioFintech;
  if (
    lower.includes('process') ||
    lower.includes('sprint') ||
    lower.includes('wireframe') ||
    lower.includes('workflow')
  )
    return APP_IMAGES.agencyProcess;
  if (lower.includes('marketing') || lower.includes('ppc') || lower.includes('ads'))
    return APP_IMAGES.digitalMarketing;
  if (lower.includes('graphics') || lower.includes('branding') || lower.includes('design'))
    return APP_IMAGES.graphicsDesign;
  if (lower.includes('showcase')) return APP_IMAGES.agencyShowcase;

  return APP_IMAGES.heroWebDesign;
}
