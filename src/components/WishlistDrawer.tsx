import React from 'react';
import {X, Heart} from 'lucide-react';
import {Product} from '../data/catalog';
import {ImageWithFallback} from './ImageWithFallback';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export function WishlistDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onSelectProduct,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Saved Wishlist"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <Heart className="h-5 w-5 text-[#1C1917]" />
            <h2 className="text-lg font-semibold text-[#1C1917]">
              Saved Items{' '}
              <span className="text-sm font-normal text-stone-500 tabular-nums">
                ({items.length})
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 hover:bg-stone-100 hover:text-[#1C1917]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <Heart className="mb-3 h-10 w-10 text-stone-300" />
            <p className="text-base font-medium text-[#1C1917]">
              No saved silhouettes yet
            </p>
            <p className="mt-1 text-sm text-stone-500">
              Tap the heart icon on any sneaker to save it for later.
            </p>
          </div>
        ) : (
          <div className="flex-1 divide-y divide-stone-100 overflow-y-auto px-6">
            {items.map((product) => (
              <div key={product.id} className="flex gap-4 py-5">
                <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F6F4F0]">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-xs text-stone-500">
                      {product.brand} · {product.colorway}
                    </p>
                    <h3 className="text-sm font-semibold text-[#1C1917]">
                      {product.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-[#1C1917] tabular-nums">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="text-xs font-semibold text-[#1C1917] underline hover:text-stone-600"
                    >
                      Select Size
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(product.id)}
                      className="text-xs text-stone-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}
