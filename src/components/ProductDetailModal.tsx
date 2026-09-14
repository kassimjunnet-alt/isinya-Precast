import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Plus, 
  Minus, 
  ShieldCheck, 
  MessageCircle, 
  FileText, 
  Layers, 
  Ruler, 
  Weight, 
  CheckCircle2,
  HardHat
} from 'lucide-react';
import { Product } from '../types';
import { ProductIllustration } from './ProductIllustrations';
import { COMPANY_DETAILS } from '../data/locations';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToQuote: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToQuote
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !product) return null;

  const totalKES = product.basePriceKES * quantity;

  const handleAdd = () => {
    onAddToQuote(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-stone-200 text-stone-900 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-100 border border-amber-300 text-amber-900 font-mono text-xs uppercase font-bold">
              {product.category.toUpperCase()}
            </span>
            <span className="text-xs font-mono text-stone-500 font-medium">
              REF: IP-{product.id.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Main Visual & Title */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6">
              <ProductIllustration type={product.category} className="h-56 w-full rounded-xl border border-stone-200" />
            </div>
            <div className="md:col-span-6 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-['Space_Grotesk'] leading-tight">
                {product.name}
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                {product.description}
              </p>

              {/* Price Banner */}
              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 flex items-baseline justify-between">
                <span className="text-xs text-stone-600 font-semibold uppercase">Factory Direct Rate</span>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-800 font-mono">
                    KES {product.basePriceKES.toLocaleString()}
                  </span>
                  <span className="text-xs text-stone-500"> /{product.unit}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 font-mono">
              <HardHat className="w-4 h-4 text-amber-600" />
              <span>Civil & Structural Engineering Specifications</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-stone-600 font-medium">{spec.label}</span>
                  <span className="text-stone-900 font-mono font-bold text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Features & Quality Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono">Manufacture Highlights</h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono">Recommended Applications</h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {product.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer with Live Quantity Calculator & Add Action */}
        <div className="p-5 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-600 font-medium">Quantity ({product.unit}):</span>
            <div className="flex items-center border border-stone-300 rounded-lg bg-white shadow-xs">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-stone-600 hover:text-stone-950 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center bg-transparent text-sm font-bold font-mono text-stone-950 focus:outline-none"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-stone-600 hover:text-stone-950 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subtotal and Add to Quote */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-stone-500 uppercase font-mono">Item Total</div>
              <div className="text-lg font-bold text-amber-800 font-mono">
                KES {totalKES.toLocaleString()}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                justAdded 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Estimate</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Estimate ({quantity})</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Isinya%20Precast,%20I%20am%20inquiring%20about%20${encodeURIComponent(product.name)}%20(Quantity:%20${quantity}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
              title="Inquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
