import React, { useState, useEffect } from 'react';
import {
  Product,
  CompanySettings,
  AppRoute,
} from './types';
import {
  loadProducts,
  saveProducts,
  loadCompanySettings,
  saveCompanySettings,
} from './services/storage';
import { parseCurrentRoute, getRoutePath } from './utils/routing';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ServicesPage } from './components/ServicesPage';
import { PricingPage } from './components/PricingPage';
import { PortfolioPage } from './components/PortfolioPage';
import { ProcessPage } from './components/ProcessPage';
import { BlogPage } from './components/BlogPage';
import { ProductsPage } from './components/ProductsPage';
import { ProductSalesPage } from './components/ProductSalesPage';
import { ThankYouPage } from './components/ThankYouPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { LegalPage } from './components/LegalPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => loadProducts());
  const [settings, setSettings] = useState<CompanySettings>(() =>
    loadCompanySettings()
  );
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() =>
    parseCurrentRoute()
  );
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Sync route on popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parseCurrentRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (newRoute: AppRoute) => {
    setCurrentRoute(newRoute);
    const path = getRoutePath(newRoute);
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      window.location.hash = path;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProjectModal = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setProjectModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setProjectModalOpen(false);
    setPreselectedService(undefined);
  };

  const handleUpdateProducts = (updated: Product[]) => {
    setProducts(updated);
    saveProducts(updated);
  };

  const handleUpdateSettings = (updated: CompanySettings) => {
    setSettings(updated);
    saveCompanySettings(updated);
  };

  // Render view based on route
  const renderContent = () => {
    switch (currentRoute.type) {
      case 'home':
        return (
          <HomePage
            products={products}
            settings={settings}
            onNavigate={handleNavigate}
            onOpenProjectModal={handleOpenProjectModal}
          />
        );

      case 'services':
        return (
          <ServicesPage
            products={products}
            settings={settings}
            onNavigate={handleNavigate}
            onOpenProjectModal={handleOpenProjectModal}
          />
        );

      case 'pricing':
        return (
          <PricingPage
            products={products}
            settings={settings}
            onNavigate={handleNavigate}
            onOpenProjectModal={handleOpenProjectModal}
          />
        );

      case 'portfolio':
      case 'testimonials':
        return (
          <PortfolioPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenProjectModal={handleOpenProjectModal}
          />
        );

      case 'process':
        return (
          <ProcessPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenProjectModal={handleOpenProjectModal}
          />
        );

      case 'blog':
        return (
          <BlogPage
            currentSlug={currentRoute.slug}
            settings={settings}
            onNavigate={handleNavigate}
            onOpenProjectModal={handleOpenProjectModal}
          />
        );

      case 'products':
        return (
          <ProductsPage
            products={products}
            onNavigate={handleNavigate}
          />
        );

      case 'product-sales': {
        const product = products.find((p) => p.slug === currentRoute.slug);
        if (!product) {
          return (
            <div className="max-w-xl mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
              <p className="text-sm text-slate-600">
                The product sales page for slug <code className="font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{currentRoute.slug}</code> does not exist or has been modified.
              </p>
              <button
                onClick={() => handleNavigate({ type: 'products' })}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm"
              >
                Browse All Products
              </button>
            </div>
          );
        }
        return (
          <ProductSalesPage
            product={product}
            settings={settings}
            onNavigate={handleNavigate}
          />
        );
      }

      case 'thank-you': {
        const product = currentRoute.slug
          ? products.find((p) => p.slug === currentRoute.slug)
          : undefined;

        if (currentRoute.slug && !product) {
          return (
            <div className="max-w-xl mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-900">Thank-You Page Not Found</h2>
              <p className="text-sm text-slate-600">
                The product associated with slug <code className="font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{currentRoute.slug}</code> could not be located.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handleNavigate({ type: 'thank-you' })}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm"
                >
                  View Sample Thank-You Page
                </button>
                <button
                  onClick={() => handleNavigate({ type: 'products' })}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm"
                >
                  Return to Products
                </button>
              </div>
            </div>
          );
        }

        return (
          <ThankYouPage
            product={product}
            allProducts={products}
            settings={settings}
            onNavigate={handleNavigate}
          />
        );
      }

      case 'about':
        return (
          <AboutPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenProjectModal={handleOpenProjectModal}
          />
        );

      case 'contact':
        return (
          <ContactPage
            settings={settings}
            onNavigate={handleNavigate}
            onOpenProjectModal={handleOpenProjectModal}
          />
        );

      case 'refund-policy':
      case 'privacy-policy':
      case 'terms':
      case 'disclaimer':
        return (
          <LegalPage
            type={currentRoute.type}
            settings={settings}
            onNavigate={handleNavigate}
          />
        );

      case 'admin':
        return (
          <AdminDashboard
            products={products}
            settings={settings}
            onUpdateProducts={handleUpdateProducts}
            onUpdateSettings={handleUpdateSettings}
            onNavigate={handleNavigate}
            initialProductId={currentRoute.productId}
            initialSubview={currentRoute.subview}
          />
        );

      default:
        return (
          <HomePage
            products={products}
            settings={settings}
            onNavigate={handleNavigate}
            onOpenProjectModal={handleOpenProjectModal}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900 antialiased font-sans">
      {/* Global Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        settings={settings}
        onOpenProjectModal={() => handleOpenProjectModal()}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        settings={settings}
        onOpenProjectModal={() => handleOpenProjectModal()}
      />

      {/* Global Interactive "Start a Project" Modal */}
      <ProjectInquiryModal
        isOpen={projectModalOpen}
        onClose={handleCloseProjectModal}
        settings={settings}
        onNavigate={handleNavigate}
        preselectedService={preselectedService}
      />
    </div>
  );
}
