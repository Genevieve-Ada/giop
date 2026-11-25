import React, {useState} from 'react';
import {X, Heart, Check} from 'lucide-react';
import {Product} from '../data/catalog';
import {ImageWithFallback} from './ImageWithFallback';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export function ProductModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const activeSize =
    selectedSize && product.sizes.includes(selectedSize)
      ? selectedSize
      : product.sizes[Math.min(2, product.sizes.length - 1)];

  const handleAdd = () => {
    onAddToCart(product, activeSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 grid w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#1C1917] shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917]"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="aspect-[4/3] w-full bg-[#F6F4F0] md:aspect-auto md:h-full">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between p-6 lg:p-8">
          <div>
            <p className="text-xs font-medium tracking-wide text-stone-500">
              {product.brand} · {product.category} · {product.colorway}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#1C1917]">
              {product.name}
            </h2>
            <p className="mt-2 text-lg font-semibold text-[#1C1917] tabular-nums">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              {product.description}
            </p>
            <p className="mt-3 text-xs text-stone-500">
              Materials: {product.materials}
            </p>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1C1917]">Select Size</span>
                <span className="text-stone-500">True to size</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap ${
                      activeSize === size
                        ? 'border-[#1C1917] bg-[#1C1917] text-white'
                        : 'border-stone-200 bg-white text-[#1C1917] hover:border-stone-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1C1917] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917] focus-visible:ring-offset-2"
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <span>Add to Bag · ${product.price.toFixed(2)}</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                isWishlisted
                  ? 'border-[#1C1917] bg-[#F6F4F0] text-[#1C1917]'
                  : 'border-stone-200 text-stone-600 hover:border-stone-400'
              }`}
            >
              <Heart
                className="h-5 w-5"
                fill={isWishlisted ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
