import React, { useState } from 'react';
import { ShieldCheck, Search, Filter } from 'lucide-react';
import { Product, AppRoute } from '../types';
import { ProductCard } from './ProductCard';

interface ProductsPageProps {
  products: Product[];
  onNavigate: (route: AppRoute) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ products, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const publishedProducts = products.filter((p) => p.published !== false);

  const categories: string[] = [
    'All',
    ...Array.from<string>(new Set(publishedProducts.map((p) => p.category))),
  ];

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return publishedProducts.length;
    return publishedProducts.filter((p) => p.category === cat).length;
  };

  const filteredProducts = publishedProducts.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="products-catalog-page" className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Products & Services Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Digital Products, Software & Online Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Explore our vetted software diagnostic toolkits, compliance blueprints, and expert services across Website Design, Web Development, Digital Marketing, SEO, and Custom App Development.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    selectedCategory === cat
                      ? 'bg-blue-800 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {getCategoryCount(cat)}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or services..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Products Grid (Cards meeting Requirement 11) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <p className="text-slate-500 text-sm">
              No products found matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Guarantee Banner in Catalog */}
        <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Every Product Backed by Our 60-Day Money-Back Guarantee
              </h4>
              <p className="text-xs text-slate-600">
                Your satisfaction is 100% risk-free. If not satisfied, request a full refund within 60 days of purchase.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate({ type: 'refund-policy' })}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0"
          >
            View Refund Policy
          </button>
        </div>
      </div>
    </div>
  );
};
