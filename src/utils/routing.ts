import { AppRoute } from '../types';

export function parseCurrentRoute(): AppRoute {
  try {
    const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    const searchParams = new URLSearchParams(window.location.search);

    // Support query parameter override (?route=thank-you&slug=...)
    const queryRoute = searchParams.get('route');
    const querySlug = searchParams.get('slug');

    if (queryRoute === 'thank-you') {
      return { type: 'thank-you', slug: querySlug || undefined };
    }
    if (queryRoute === 'sales' && querySlug) {
      return { type: 'product-sales', slug: querySlug };
    }
    if (queryRoute === 'admin') {
      return { type: 'admin' };
    }

    // Support hash fallback (#/products/slug or #/thank-you/slug)
    const effectivePath = hash ? `/${hash}` : pathname;

    if (effectivePath.startsWith('/thank-you/')) {
      const slug = effectivePath.replace('/thank-you/', '').split('/')[0];
      if (slug) return { type: 'thank-you', slug };
    }

    if (
      effectivePath === '/thank-you' ||
      effectivePath === '/thankyou' ||
      effectivePath === '/order-confirmation' ||
      effectivePath === '/order-completed'
    ) {
      return { type: 'thank-you' };
    }

    if (effectivePath.startsWith('/products/') && effectivePath !== '/products') {
      const slug = effectivePath.replace('/products/', '').split('/')[0];
      if (slug) return { type: 'product-sales', slug };
    }

    if (effectivePath === '/products') {
      return { type: 'products' };
    }

    if (effectivePath === '/services') {
      return { type: 'services' };
    }

    if (effectivePath === '/pricing' || effectivePath === '/plans' || effectivePath === '/rates') {
      return { type: 'pricing' };
    }

    if (effectivePath === '/portfolio' || effectivePath === '/work') {
      return { type: 'portfolio' };
    }

    if (effectivePath === '/process' || effectivePath === '/methodology') {
      return { type: 'process' };
    }

    if (effectivePath === '/testimonials' || effectivePath === '/reviews') {
      return { type: 'testimonials' };
    }

    if (effectivePath.startsWith('/blog/') && effectivePath !== '/blog') {
      const slug = effectivePath.replace('/blog/', '').split('/')[0];
      return { type: 'blog', slug };
    }

    if (effectivePath === '/blog' || effectivePath === '/insights') {
      return { type: 'blog' };
    }

    if (effectivePath === '/admin' || effectivePath.startsWith('/admin/')) {
      const parts = effectivePath.replace('/admin', '').split('/').filter(Boolean);
      return {
        type: 'admin',
        subview: (parts[0] as any) || 'products',
        productId: parts[1],
      };
    }

    if (effectivePath === '/about' || effectivePath === '/about-us') {
      return { type: 'about' };
    }

    if (effectivePath === '/contact' || effectivePath === '/contact-us') {
      return { type: 'contact' };
    }

    if (effectivePath === '/refund-policy' || effectivePath === '/refunds') {
      return { type: 'refund-policy' };
    }

    if (effectivePath === '/privacy-policy' || effectivePath === '/privacy') {
      return { type: 'privacy-policy' };
    }

    if (effectivePath === '/terms-and-conditions' || effectivePath === '/terms') {
      return { type: 'terms' };
    }

    if (effectivePath === '/disclaimer') {
      return { type: 'disclaimer' };
    }

    if (
      effectivePath === '/sms-consent' ||
      effectivePath === '/sms' ||
      effectivePath === '/sms-communications-consent' ||
      effectivePath === '/sms-communication-consent'
    ) {
      return { type: 'sms-consent' };
    }

    return { type: 'home' };
  } catch {
    return { type: 'home' };
  }
}

export function getRoutePath(route: AppRoute): string {
  switch (route.type) {
    case 'home':
      return '/';
    case 'services':
      return '/services';
    case 'pricing':
      return '/pricing';
    case 'portfolio':
      return '/portfolio';
    case 'process':
      return '/process';
    case 'testimonials':
      return '/testimonials';
    case 'blog':
      return route.slug ? `/blog/${route.slug}` : '/blog';
    case 'products':
      return '/products';
    case 'product-sales':
      return `/products/${route.slug}`;
    case 'thank-you':
      return route.slug ? `/thank-you/${route.slug}` : '/thank-you';
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    case 'refund-policy':
      return '/refund-policy';
    case 'privacy-policy':
      return '/privacy-policy';
    case 'terms':
      return '/terms-and-conditions';
    case 'disclaimer':
      return '/disclaimer';
    case 'sms-consent':
      return '/sms-consent';
    case 'admin':
      return route.subview ? `/admin/${route.subview}${route.productId ? `/${route.productId}` : ''}` : '/admin';
    default:
      return '/';
  }
}

export function getFullUrl(route: AppRoute): string {
  const path = getRoutePath(route);
  if (typeof window === 'undefined') return path;
  return `${window.location.origin}${path}`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  } else {
    // Fallback for non-secure contexts or iframes
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      return Promise.resolve(true);
    } catch (e) {
      console.error('Copy fallback failed', e);
      textArea.remove();
      return Promise.resolve(false);
    }
  }
}
