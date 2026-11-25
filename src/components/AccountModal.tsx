import React, {useState} from 'react';
import {X, User, Package} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({isOpen, onClose}: AccountModalProps) {
  const [preferredSize, setPreferredSize] = useState('US 9.5');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Member Account"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6F4F0] text-[#1C1917]">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#1C1917]">
                Alex Rivera
              </h2>
              <p className="text-xs text-stone-500">
                Converse Member · Los Angeles, CA
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close account modal"
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 hover:text-[#1C1917]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-stone-700">
              Saved Footwear Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['US 8.5', 'US 9', 'US 9.5', 'US 10'].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setPreferredSize(size)}
                  className={`h-9 rounded-lg border text-xs font-medium transition-colors ${
                    preferredSize === size
                      ? 'border-[#1C1917] bg-[#1C1917] text-white'
                      : 'border-stone-200 text-[#1C1917] hover:border-stone-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-[#FAF8F5] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
              <Package className="h-4 w-4 text-[#6B5742]" />
              <span>Recent Order · #CV-3910</span>
            </div>
            <p className="mt-1.5 text-xs text-stone-600">
              Chuck 70 Heritage High (Vintage Bone, {preferredSize}) — Delivered Nov 18
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#1C1917] py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
        >
          Done
        </button>
      </div>
    </div>
  );
}
