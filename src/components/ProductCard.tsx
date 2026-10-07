import React from 'react';
import { Shield, ArrowRight, Check, Tag } from 'lucide-react';
import { Product, AppRoute } from '../types';

interface ProductCardProps {
  product: Product;
  onNavigate: (route: AppRoute) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const hasSale = product.salePrice !== undefined && product.salePrice < product.regularPrice;

  return (
    <div
      id={`product-card-${product.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-200/50"
    >
      <div>
        {/* Image Container with Badge */}
        <div className="relative mb-5 overflow-hidden rounded-xl bg-slate-100 aspect-video">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="rounded-md bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-white tracking-wide">
              {product.category}
            </span>
            {product.badge && (
              <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs">
                {product.badge}
              </span>
            )}
            {product.isSample && (
              <span className="rounded-md bg-amber-500/90 text-slate-950 font-bold px-2 py-0.5 text-[10px] uppercase tracking-wider">
                Demo
              </span>
            )}
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {product.shortDescription}
        </p>

        {/* Quick Features List */}
        {product.features && product.features.length > 0 && (
          <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
            {product.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer Area: Price & Learn More button */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
            One-Time Access
          </span>
          <div className="flex items-baseline gap-2">
            {hasSale ? (
              <>
                <span className="text-2xl font-extrabold text-slate-900">
                  {product.currency}{product.salePrice}
                </span>
                <span className="text-sm font-medium text-slate-400 line-through">
                  {product.currency}{product.regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-extrabold text-slate-900">
                {product.currency}{product.regularPrice}
              </span>
            )}
          </div>
        </div>

        {/* MANDATORY: Clicking Learn More must open that product's dedicated sales page! */}
        <button
          id={`btn-learn-more-${product.slug}`}
          onClick={() => onNavigate({ type: 'product-sales', slug: product.slug })}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-xs group-hover:shadow"
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
