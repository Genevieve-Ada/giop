import React, {useState} from 'react';
import {X, Minus, Plus, Trash2, ShoppingBag, CheckCircle2} from 'lucide-react';
import {CartItem} from '../data/catalog';
import {ImageWithFallback} from './ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'form' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 12;
  const total = subtotal + shippingFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(`CV-${randomCode}`);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  const handleClose = () => {
    if (checkoutStep === 'confirmed') {
      setCheckoutStep('bag');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div className="fixed inset-0" onClick={handleClose} aria-hidden="true" />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#1C1917]" />
            <h2 className="text-lg font-semibold text-[#1C1917]">
              Shopping Bag{' '}
              <span className="text-sm font-normal text-stone-500 tabular-nums">
                ({totalCount})
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close bag"
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-[#1C1917] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {checkoutStep === 'confirmed' ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <CheckCircle2 className="mb-4 h-12 w-12 text-[#5D4937]" />
            <h3 className="font-display text-2xl font-bold text-[#1C1917]">
              Order #{orderNumber} Confirmed
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Preparing shipment for {customerName || 'you'}. A confirmation receipt has
              been sent to {customerEmail || 'your email'}.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-8 rounded-xl bg-[#1C1917] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800 whitespace-nowrap"
            >
              Continue Shopping
            </button>
          </div>
        ) : checkoutStep === 'form' ? (
          <form
            onSubmit={handleCheckoutSubmit}
            className="flex flex-1 flex-col justify-between overflow-y-auto px-6 py-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Shipping Details
                </h3>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('bag')}
                  className="text-xs font-medium text-stone-600 underline hover:text-[#1C1917]"
                >
                  Edit Bag
                </button>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-stone-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm text-[#1C1917] focus:border-[#1C1917] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-stone-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm text-[#1C1917] focus:border-[#1C1917] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-stone-700">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="742 Abbot Kinney Blvd, Venice, CA 90291"
                  className="w-full rounded-lg border border-stone-300 px-3.5 py-2.5 text-sm text-[#1C1917] focus:border-[#1C1917] focus:outline-none"
                />
              </div>
              <div className="rounded-xl bg-[#F6F4F0] p-4 text-xs text-stone-600">
                <div className="flex justify-between py-1">
                  <span>Items ({totalCount})</span>
                  <span className="tabular-nums font-medium text-[#1C1917]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Express Shipping</span>
                  <span className="tabular-nums font-medium text-[#1C1917]">
                    {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="mt-2 flex justify-between border-t border-stone-200 pt-2 text-sm font-semibold text-[#1C1917]">
                  <span>Total Due</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#1C1917] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
            >
              Place Order · ${total.toFixed(2)}
            </button>
          </form>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="mb-3 h-10 w-10 text-stone-300" />
            <p className="text-base font-medium text-[#1C1917]">
              Your shopping bag is empty
            </p>
            <p className="mt-1 text-sm text-stone-500">
              Explore our seasonal silhouettes to add pairs to your bag.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 rounded-xl bg-[#1C1917] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
            >
              Browse Sneakers
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-stone-100 bg-[#FAF8F5] px-6 py-3 text-xs text-stone-600">
              {remainingForFreeShipping === 0
                ? 'Complimentary express shipping unlocked on your order.'
                : `Add $${remainingForFreeShipping.toFixed(2)} more for complimentary express shipping.`}
            </div>
            <div className="flex-1 divide-y divide-stone-100 overflow-y-auto px-6">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 py-5"
                >
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F6F4F0]">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-stone-500">
                          {item.product.brand} · {item.size}
                        </p>
                        <h3 className="text-sm font-semibold text-[#1C1917]">
                          {item.product.name}
                        </h3>
                      </div>
                      <p className="text-sm font-semibold text-[#1C1917] tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-stone-200">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.size, -1)
                          }
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          className="flex h-8 w-8 items-center justify-center text-stone-600 hover:text-[#1C1917]"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.size, 1)
                          }
                          aria-label={`Increase quantity of ${item.product.name}`}
                          className="flex h-8 w-8 items-center justify-center text-stone-600 hover:text-[#1C1917]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        aria-label={`Remove ${item.product.name}`}
                        className="inline-flex items-center gap-1 text-xs text-stone-500 transition-colors hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 bg-white px-6 py-5">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#1C1917]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className="tabular-nums font-medium text-[#1C1917]">
                    {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 text-base font-semibold text-[#1C1917]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutStep('form')}
                className="mt-4 w-full rounded-xl bg-[#1C1917] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917] focus-visible:ring-offset-2"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
