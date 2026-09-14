import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Calculator, 
  Menu, 
  X, 
  Clock, 
  MapPin, 
  MessageCircle,
  FileSpreadsheet
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/locations';

interface NavbarProps {
  quoteCount: number;
  onOpenQuote: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  quoteCount,
  onOpenQuote,
  activeSection,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 text-stone-900 shadow-sm">
      {/* Top Banner with Contact & Yard Hours */}
      <div className="bg-stone-100 border-b border-stone-200 px-3 sm:px-4 py-1.5 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <span className="flex items-center gap-1 text-stone-700 font-medium text-[11px] sm:text-xs truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">Isinya Yard, Namanga Rd (A104), Kajiado</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-[11px] sm:text-xs shrink-0">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Mon-Sat 7:30 AM - 6:00 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs shrink-0 ml-auto">
            <a 
              href={`tel:${COMPANY_DETAILS.primaryPhone}`} 
              className="flex items-center gap-1 hover:text-amber-700 transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-amber-600 shrink-0" />
              <span className="hidden sm:inline">Hotline: </span>
              <span>{COMPANY_DETAILS.primaryPhone}</span>
            </a>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Isinya%20Precast,%20I%20would%20like%20to%20inquire%20about%20your%20precast%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 transition-colors font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Brand Logo & Name */}
          <button 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none group cursor-pointer min-w-0 shrink"
            id="brand-logo-btn"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-stone-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-stone-950" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="font-extrabold text-base sm:text-xl tracking-tight text-stone-950 flex items-center gap-1.5 font-['Space_Grotesk'] leading-tight sm:leading-none">
                <span className="whitespace-nowrap">ISINYA PRECAST</span>
                <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 font-mono font-bold leading-none shrink-0">LTD</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-500 tracking-wider uppercase font-semibold mt-0.5 sm:mt-1 leading-normal whitespace-nowrap truncate">
                Concrete Engineering • Kajiado
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'products', label: 'Products & Sizes' },
              { id: 'projects', label: 'Completed Projects' },
              { id: 'quote', label: 'Instant Quote' },
              { id: 'technical', label: 'KEBS Standards' },
              { id: 'yard', label: 'Factory Yard' },
              { id: 'delivery', label: 'Delivery Areas' },
              { id: 'contact', label: 'Contact Us' }
            ].map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-md text-sm transition-all cursor-pointer ${
                  activeSection === link.id
                    ? 'text-amber-900 bg-amber-50 font-bold border border-amber-200/80 shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100 font-medium'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Quote Drawer Trigger */}
            <button
              id="header-quote-trigger-btn"
              onClick={onOpenQuote}
              className="relative flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.02] cursor-pointer shrink-0"
              title="Calculate Instant Estimate"
            >
              <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden md:inline">Price Estimator</span>
              <span className="md:hidden">Estimate</span>
              {quoteCount > 0 && (
                <span className="ml-0.5 sm:ml-1 px-1.5 py-0.2 text-[10px] sm:text-xs rounded-full bg-stone-900 text-amber-300 font-black">
                  {quoteCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-100 focus:outline-none border border-stone-200 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {[
            { id: 'hero', label: 'Home Overview' },
            { id: 'products', label: 'Products & Price Catalog' },
            { id: 'projects', label: 'Completed Client Projects' },
            { id: 'quote', label: 'Interactive Project Estimator' },
            { id: 'technical', label: 'Technical Specifications & KEBS' },
            { id: 'yard', label: 'Production Yard & Curing Basins' },
            { id: 'delivery', label: 'Delivery Routes & Crane Fleet' },
            { id: 'contact', label: 'Contact & Inquiries' }
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="w-full text-left px-3 py-2.5 rounded-md text-base font-medium text-stone-700 hover:bg-stone-100 hover:text-amber-800 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-500 text-stone-950 font-bold shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Build Bill of Quantities (BoQ)
            </button>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Isinya%20Precast,%20I%20need%20a%20quotation%20for%20precast%20concrete%20products.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Directly on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
