import { Product, CompanySettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COMPANY_SETTINGS } from '../data/initialData';
import { resolveImageUrl } from '../data/imageAssets';

const PRODUCTS_STORAGE_KEY = 'pcsecure_products_v1';
const SETTINGS_STORAGE_KEY = 'pcsecure_settings_v1';
const ADMIN_AUTH_KEY = 'pcsecure_admin_session';

export function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) {
      saveProducts(INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure any newly introduced official products or services from INITIAL_PRODUCTS are merged in
      const existingSlugs = new Set(parsed.map((p: Product) => p.slug));
      const missingProducts = INITIAL_PRODUCTS.filter((p) => !existingSlugs.has(p.slug));
      let merged = missingProducts.length > 0 ? [...parsed, ...missingProducts] : [...parsed];
      // Normalize support email to support@pcsecure.tech and image URLs to online CDN
      let needsProductSave = false;
      merged = merged.map((p) => {
        let updated = { ...p };
        if (p.supportEmail?.includes('pcsecure.online') || p.supportEmail?.includes('pcsecurellc.com')) {
          needsProductSave = true;
          updated.supportEmail = 'support@pcsecure.tech';
        }
        if (p.imageUrl?.includes('/src/assets/images')) {
          needsProductSave = true;
          updated.imageUrl = resolveImageUrl(p.imageUrl);
        }
        return updated;
      });
      if (missingProducts.length > 0 || needsProductSave) {
        saveProducts(merged);
      }
      return merged;
    }
    saveProducts(INITIAL_PRODUCTS);
    return INITIAL_PRODUCTS;
  } catch (err) {
    console.error('Failed to load products from storage', err);
    return INITIAL_PRODUCTS;
  }
}

export function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to storage', err);
  }
}

export function loadCompanySettings(): CompanySettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      saveCompanySettings(INITIAL_COMPANY_SETTINGS);
      return INITIAL_COMPANY_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    // Migrate outdated placeholder values to official PCSecure agency data
    if (
      parsed.businessAddress?.includes('Wilmington') ||
      parsed.supportEmail?.includes('pcsecurellc.com') ||
      parsed.supportEmail?.includes('pcsecure.online') ||
      parsed.businessEmail?.includes('pcsecure.online') ||
      parsed.phoneNumber?.includes('555-0199') ||
      !parsed.paypalEmail ||
      parsed.paypalEmail === 'payments@pcsecure.online' ||
      parsed.paypalEmail === 'rgcrider@gmail.com'
    ) {
      const updated: CompanySettings = {
        ...INITIAL_COMPANY_SETTINGS,
        ...parsed,
        supportEmail: 'support@pcsecure.tech',
        businessEmail: 'support@pcsecure.tech',
        paypalEmail:
          parsed.paypalEmail &&
          parsed.paypalEmail !== 'payments@pcsecure.online' &&
          parsed.paypalEmail !== 'rgcrider@gmail.com'
            ? parsed.paypalEmail
            : 'john@pcsecure.tech',
      };
      saveCompanySettings(updated);
      return updated;
    }
    return { ...INITIAL_COMPANY_SETTINGS, ...parsed };
  } catch (err) {
    console.error('Failed to load settings from storage', err);
    return INITIAL_COMPANY_SETTINGS;
  }
}

export function saveCompanySettings(settings: CompanySettings): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings to storage', err);
  }
}

export function resetToDefaults(): void {
  localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  localStorage.removeItem(SETTINGS_STORAGE_KEY);
  saveProducts(INITIAL_PRODUCTS);
  saveCompanySettings(INITIAL_COMPANY_SETTINGS);
}

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(val: boolean): void {
  try {
    if (val) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch (e) {
    console.error('Session storage error', e);
  }
}

export function verifyAdminPin(pin: string, settings: CompanySettings): boolean {
  const expectedPin = settings.adminPin || 'admin123';
  return pin.trim() === expectedPin.trim();
}

export interface ReadinessCheck {
  id: string;
  label: string;
  passed: boolean;
  tip?: string;
}

export function checkDigistoreReadiness(
  product: Product,
  settings: CompanySettings
): { isReady: boolean; checks: ReadinessCheck[]; score: number } {
  const checks: ReadinessCheck[] = [
    {
      id: 'sales_page',
      label: 'Product has a public sales page',
      passed: Boolean(product.slug && product.published !== false),
      tip: `Public route: /products/${product.slug}`,
    },
    {
      id: 'thank_you_page',
      label: 'Product has a public thank-you page',
      passed: Boolean(product.slug),
      tip: `Public route: /thank-you/${product.slug} (No login required)`,
    },
    {
      id: 'guarantee',
      label: '60-day money-back guarantee is displayed',
      passed: Boolean(
        product.guaranteeHeading &&
        product.guaranteeHeading.toLowerCase().includes('60-day') &&
        product.guaranteeText &&
        product.guaranteeText.length > 20
      ),
      tip: 'Must prominently state 60-Day Money-Back Guarantee',
    },
    {
      id: 'refund_policy',
      label: 'Refund Policy exists & is linked',
      passed: true, // System includes public /refund-policy page
      tip: 'Publicly linked in header & footer at /refund-policy',
    },
    {
      id: 'price',
      label: 'Product price is entered',
      passed: Boolean(product.regularPrice && product.regularPrice > 0),
      tip: `Current price: ${product.currency}${product.salePrice ?? product.regularPrice}`,
    },
    {
      id: 'description',
      label: 'Product description is entered',
      passed: Boolean(product.description && product.description.trim().length >= 40),
      tip: 'Needs detailed description for customer review',
    },
    {
      id: 'checkout_url',
      label: 'Digistore24 checkout URL is entered',
      passed: Boolean(
        product.checkoutUrl &&
        product.checkoutUrl.trim().length > 10 &&
        !product.checkoutUrl.includes('SAMPLE_VENDOR')
      ),
      tip: product.checkoutUrl.includes('SAMPLE_VENDOR')
        ? 'Sample URL detected: Update with your real Digistore24 buy link'
        : 'Must point to active Digistore24 product order form',
    },
    {
      id: 'statement_descriptor',
      label: 'Debit/statement descriptor is entered',
      passed: Boolean(
        (product.statementDescriptor || settings.defaultStatementDescriptor) &&
        (product.statementDescriptor || settings.defaultStatementDescriptor).trim().length > 0
      ),
      tip: `Configured: ${product.statementDescriptor || settings.defaultStatementDescriptor || 'None'}`,
    },
    {
      id: 'support_info',
      label: 'Customer support information is entered',
      passed: Boolean(
        (product.supportEmail || settings.supportEmail) &&
        (product.supportEmail || settings.supportEmail).includes('@')
      ),
      tip: `Support: ${product.supportEmail || settings.supportEmail}`,
    },
    {
      id: 'delivery_instructions',
      label: 'Product delivery instructions are entered',
      passed: Boolean(
        product.deliveryInstructions && product.deliveryInstructions.trim().length >= 30
      ),
      tip: `Delivery method: ${product.deliveryMethod}`,
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const isReady = passedCount === checks.length;
  const score = Math.round((passedCount / checks.length) * 100);

  return { isReady, checks, score };
}
