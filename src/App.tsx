import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteEstimator } from './components/QuoteEstimator';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { YardShowcase } from './components/YardShowcase';
import { CompletedProjectsGallery } from './components/CompletedProjectsGallery';
import { DeliveryCoverage } from './components/DeliveryCoverage';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { QuoteFloatingBar } from './components/QuoteFloatingBar';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, QuoteItem } from './types';
import { ProjectPreset } from './data/presets';
import { MessageCircle, Calculator } from 'lucide-react';
import { COMPANY_DETAILS } from './data/locations';

export default function App() {
  // State for project quotation items
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('isinya_precast_quote');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    // Default starter items for interactive demonstration
    return [
      { product: PRODUCTS[1], quantity: 12 }, // 600mm culvert
      { product: PRODUCTS[4], quantity: 60 }  // 7ft straight post
    ];
  });

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [selectedDeliveryTownId, setSelectedDeliveryTownId] = useState<string>('kitengela');

  // Sync quote items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('isinya_precast_quote', JSON.stringify(quoteItems));
    } catch {
      // ignore
    }
  }, [quoteItems]);

  const showToast = (title: string, description?: string, actionLabel?: string, onAction?: () => void) => {
    setToast({
      id: Date.now().toString(),
      title,
      description,
      actionLabel,
      onAction
    });
  };

  // Handler to add or increment item in quote
  const handleAddToQuote = (product: Product, quantity = 1) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast(
      `Added ${quantity}x ${product.name}`,
      `Bill of Quantities updated. Subtotal recalculated.`,
      'View BoQ',
      () => handleNavigate('quote')
    );
  };

  // Handler to load entire preset bundle
  const handleLoadPreset = (preset: ProjectPreset) => {
    setQuoteItems((prev) => {
      let next = [...prev];
      preset.items.forEach((presetItem) => {
        const product = PRODUCTS.find((p) => p.id === presetItem.productId);
        if (!product) return;
        const existingIdx = next.findIndex((i) => i.product.id === product.id);
        if (existingIdx >= 0) {
          next[existingIdx] = {
            ...next[existingIdx],
            quantity: next[existingIdx].quantity + presetItem.quantity
          };
        } else {
          next.push({ product, quantity: presetItem.quantity });
        }
      });
      return next;
    });

    showToast(
      `Loaded "${preset.title}"`,
      `Added all bundle materials (${preset.badge}) to your quotation.`,
      'Review BoQ',
      () => handleNavigate('quote')
    );
  };

  // Handler to update quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Handler to remove item
  const handleRemoveItem = (productId: string) => {
    const item = quoteItems.find(i => i.product.id === productId);
    setQuoteItems((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast('Item Removed', `Removed ${item.product.name} from quote.`);
    }
  };

  // Handler to clear quote
  const handleClearQuote = () => {
    setQuoteItems([]);
    showToast('Quote Cleared', 'All items have been removed from your BoQ.');
  };

  // Navigation smoothly to element
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromHero = (category: string) => {
    setSelectedCategory(category as ProductCategory);
    handleNavigate('products');
  };

  const handleSelectDeliveryTown = (townId?: string) => {
    if (townId) {
      setSelectedDeliveryTownId(townId);
    }
    handleNavigate('quote');
    showToast('Delivery Destination Updated', 'Freight calculation adjusted for your selected site.');
  };

  const totalQuoteCount = quoteItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-500 selection:text-stone-950 pb-20">
      {/* Top Main Navigation */}
      <Navbar
        quoteCount={totalQuoteCount}
        onOpenQuote={() => handleNavigate('quote')}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreProducts={() => handleNavigate('products')}
          onOpenEstimator={() => handleNavigate('quote')}
          onSelectCategory={handleSelectCategoryFromHero}
        />

        {/* Product Catalog Section */}
        <ProductCatalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToQuote={handleAddToQuote}
          onViewProductDetail={(p) => setSelectedDetailProduct(p)}
          onLoadPreset={handleLoadPreset}
        />

        {/* Completed Projects Gallery Section */}
        <CompletedProjectsGallery
          onNavigateToQuote={() => handleNavigate('quote')}
          onNavigateToProducts={() => handleNavigate('products')}
        />

        {/* Interactive Quote & Project Estimator */}
        <QuoteEstimator
          quoteItems={quoteItems}
          allProducts={PRODUCTS}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onAddItem={handleAddToQuote}
          onClearQuote={handleClearQuote}
          onNotify={(title, desc) => showToast(title, desc)}
          initialDestinationId={selectedDeliveryTownId}
        />

        {/* Technical Standards & KEBS Specs */}
        <TechnicalSpecs />

        {/* 5-Acre Production Yard & Curing Facilities */}
        <YardShowcase />

        {/* Logistics & Delivery Coverage with Live Freight Route Calculator */}
        <DeliveryCoverage onNavigateToQuote={handleSelectDeliveryTown} />

        {/* Physical Address, Map Directions & Contact Inquiries */}
        <ContactSection />
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedDetailProduct}
        isOpen={Boolean(selectedDetailProduct)}
        onClose={() => setSelectedDetailProduct(null)}
        onAddToQuote={handleAddToQuote}
      />

      {/* Persistent Bottom Summary Bar for BoQ (UX Enhancement) */}
      <QuoteFloatingBar
        quoteItems={quoteItems}
        onOpenQuote={() => handleNavigate('quote')}
        onClearQuote={handleClearQuote}
      />

      {/* Toast Notification System */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Site Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons for Immediate Conversion */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5">
        <a
          href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Isinya%20Precast,%20I%20have%20an%20inquiry%20regarding%20precast%20concrete%20products.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-stone-900/15 hover:scale-105 transition-all group cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pr-1">
            WhatsApp Sales
          </span>
        </a>

        <button
          onClick={() => handleNavigate('quote')}
          className="flex items-center gap-2 p-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-xl shadow-stone-900/15 hover:scale-105 transition-all group relative border border-amber-600/20 cursor-pointer"
          aria-label="View Project Quote"
        >
          <Calculator className="w-5 h-5 text-stone-950" />
          {totalQuoteCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-900 text-amber-400 font-black text-[10px] rounded-full flex items-center justify-center border border-amber-400">
              {totalQuoteCount}
            </span>
          )}
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pr-1">
            Project Estimate
          </span>
        </button>
      </div>
    </div>
  );
}
