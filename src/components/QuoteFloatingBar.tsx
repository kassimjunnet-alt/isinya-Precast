import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  ArrowRight, 
  MessageCircle, 
  ChevronUp, 
  ChevronDown, 
  Weight,
  Sparkles
} from 'lucide-react';
import { QuoteItem } from '../types';
import { COMPANY_DETAILS } from '../data/locations';

interface QuoteFloatingBarProps {
  quoteItems: QuoteItem[];
  onOpenQuote: () => void;
}

export const QuoteFloatingBar: React.FC<QuoteFloatingBarProps> = ({
  quoteItems,
  onOpenQuote,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (quoteItems.length === 0) return null;

  const totalQuantity = quoteItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalSubtotal = quoteItems.reduce((acc, item) => acc + (item.product.basePriceKES * item.quantity), 0);
  const totalWeightKg = quoteItems.reduce((acc, item) => acc + (item.product.weightKg * item.quantity), 0);
  const totalWeightTonnes = Math.round((totalWeightKg / 1000) * 10) / 10;

  const buildWhatsAppUrl = () => {
    let msg = `*ISINYA PRECAST - FAST ORDER INQUIRY*\n`;
    msg += `Items in Schedule (${quoteItems.length} products, ${totalQuantity} units):\n`;
    quoteItems.forEach((it, i) => {
      msg += `${i + 1}. ${it.product.name} x ${it.quantity} ${it.product.unit}\n`;
    });
    msg += `*Est. Subtotal:* KES ${totalSubtotal.toLocaleString()}\n`;
    msg += `*Total Weight:* ~${totalWeightTonnes} Tonnes\n`;
    msg += `Please quote haulage and delivery availability to my site.`;
    return `https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  if (isMinimized) {
    return (
      <aside aria-label="Project Estimate Quick Bar" className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border border-stone-300 text-stone-900 shadow-xl hover:bg-stone-50 transition-all font-bold text-xs cursor-pointer group"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></div>
          <span className="font-['Space_Grotesk']">Active BoQ ({totalQuantity} items)</span>
          <span className="font-mono text-amber-800">KES {totalSubtotal.toLocaleString()}</span>
          <ChevronUp className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-900" />
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Project Estimate Quick Bar" className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-stone-300 rounded-2xl shadow-2xl p-3.5 sm:p-4 text-stone-900 pointer-events-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 ring-1 ring-stone-900/5">
        {/* Left Stats */}
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100/80 text-amber-900 shrink-0">
              <FileSpreadsheet className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-950 font-['Space_Grotesk']">
                  Your Bill of Quantities
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
                  {totalQuantity} Units ({quoteItems.length} Products)
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[11px] text-stone-600 font-mono mt-0.5">
                <span className="flex items-center gap-1 text-stone-500">
                  <Weight className="w-3 h-3 text-sky-600" />
                  ~{totalWeightTonnes} Tonnes
                </span>
                <span>•</span>
                <span className="font-bold text-stone-900 text-xs">
                  KES {totalSubtotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Minimize button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors sm:hidden"
            title="Minimize"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Right CTA buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            title="Send WhatsApp Order"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp Order</span>
            <span className="sm:hidden text-xs">WhatsApp</span>
          </a>

          <button
            onClick={onOpenQuote}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <span>Review BoQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors hidden sm:block"
            title="Minimize bar"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
