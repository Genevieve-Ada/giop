import React, {useState, useEffect, useRef} from 'react';
import {Search, X} from 'lucide-react';
import {Product} from '../data/catalog';
import {ImageWithFallback} from './ImageWithFallback';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function SearchOverlay({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const matches = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.brand.toLowerCase().includes(trimmed) ||
          p.colorway.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed),
      )
    : products.slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-16 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-stone-200 px-5 py-4">
          <Search className="h-5 w-5 text-stone-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sneakers, colorways, Converse, Puma, Nike..."
            className="flex-1 text-sm text-[#1C1917] placeholder:text-stone-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 hover:text-[#1C1917]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          <p className="mb-3 text-xs font-medium text-stone-500">
            {trimmed ? `${matches.length} Results` : 'Popular Silhouettes'}
          </p>
          {matches.length === 0 ? (
            <p className="py-10 text-center text-sm text-stone-500">
              No sneakers matched "{query}". Try searching "suede", "high", or "Converse".
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {matches.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-3.5 rounded-xl border border-stone-100 p-2.5 text-left transition-colors hover:bg-[#FAF8F5]"
                >
                  <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F6F4F0]">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-stone-500">
                      {product.brand} · {product.category}
                    </p>
                    <p className="truncate text-sm font-semibold text-[#1C1917]">
                      {product.name}
                    </p>
                    <p className="text-xs font-medium text-stone-700 tabular-nums">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
