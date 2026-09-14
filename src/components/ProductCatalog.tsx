import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Check, 
  Info, 
  Layers, 
  ShieldCheck, 
  Sparkles,
  Weight,
  Ruler,
  LayoutGrid,
  ListFilter,
  HelpCircle,
  PackageCheck,
  ArrowRight,
  Minus
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductIllustration } from './ProductIllustrations';
import { PROJECT_PRESETS, ProjectPreset } from '../data/presets';
import { CulvertSizingGuideModal } from './CulvertSizingGuideModal';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onAddToQuote: (product: Product, quantity?: number) => void;
  onViewProductDetail: (product: Product) => void;
  onLoadPreset?: (preset: ProjectPreset) => void;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Precast' },
  { id: 'culverts', label: 'Culverts (Pipes)' },
  { id: 'poles', label: 'Fencing Posts' },
  { id: 'slabs', label: 'Paving Slabs & Cabro' },
  { id: 'drains', label: 'Drainage & Kerbs' },
  { id: 'custom', label: 'Septic Rings & Wells' },
  { id: 'blocks', label: 'Lintels & Blocks' }
];

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'weight-desc' | 'name-asc';

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToQuote,
  onViewProductDetail,
  onLoadPreset
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [isSizingGuideOpen, setIsSizingGuideOpen] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.dimensions.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.concreteGrade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.applications.some(app => app.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.basePriceKES - b.basePriceKES;
    if (sortBy === 'price-desc') return b.basePriceKES - a.basePriceKES;
    if (sortBy === 'weight-desc') return b.weightKg - a.weightKg;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    // default recommended: popular first
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  const getQty = (id: string) => quantities[id] || 1;

  const setQty = (id: string, val: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, val)
    }));
  };

  const handleAddWithQty = (product: Product) => {
    const q = getQty(product.id);
    onAddToQuote(product, q);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  const handleApplyPreset = (preset: ProjectPreset) => {
    setActivePresetId(preset.id);
    if (onLoadPreset) {
      onLoadPreset(preset);
    } else {
      preset.items.forEach(it => {
        const prod = products.find(p => p.id === it.productId);
        if (prod) onAddToQuote(prod, it.quantity);
      });
    }
    setTimeout(() => setActivePresetId(null), 1500);
  };

  return (
    <section id="products" className="py-16 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-2 font-mono">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>OFFICIAL FACTORY PRICE LIST • KAJIADO YARD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight font-['Space_Grotesk']">
              Precast Concrete Catalog
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
              Manufactured with high early-strength Portland cement, washed basalt aggregates, and B500B high-yield steel cages. 
              Click on any item to view engineering specs or configure quantities for your project estimate.
            </p>
          </div>

          {/* Sizing Assistant CTA */}
          <button
            onClick={() => setIsSizingGuideOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-300 text-stone-800 text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Culvert Sizing Assistant</span>
          </button>
        </div>

        {/* 1-Click Project Packages Strip */}
        <div className="mb-10 p-5 rounded-2xl bg-stone-50 border border-stone-200">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-stone-900 uppercase font-mono tracking-wider">
                1-Click Project Packages & Common Bundles
              </span>
            </div>
            <span className="text-[11px] text-stone-500 hidden sm:inline font-mono">
              Instantly configure whole bills of quantities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROJECT_PRESETS.slice(0, 3).map((preset) => {
              const isLoaded = activePresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  className="p-3.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 transition-all flex flex-col justify-between space-y-2 shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100/70 border border-amber-200 px-1.5 py-0.5 rounded">
                        {preset.badge}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {preset.items.reduce((s, i) => s + i.quantity, 0)} Units
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-stone-950 font-['Space_Grotesk'] leading-snug">
                      {preset.title}
                    </h4>
                    <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2">
                      {preset.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleApplyPreset(preset)}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isLoaded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-100 hover:bg-amber-500 hover:text-stone-950 text-stone-800 border border-stone-300'
                    }`}
                  >
                    {isLoaded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Package Loaded!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-amber-600" />
                        <span>Load Bundle into BoQ</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filter, Search & View Controls Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 shadow-xs font-bold'
                    : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700 border border-stone-200'
                }`}
              >
                <span>{cat.label}</span>
                {cat.id !== 'all' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? 'bg-stone-950/15 text-stone-950 font-bold' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {products.filter(p => p.category === cat.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search, Sort & View Mode controls */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-[160px] sm:w-60">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 sm:py-1.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="py-2 sm:py-1.5 px-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            >
              <option value="recommended">Sort: Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="weight-desc">Weight: Heaviest</option>
              <option value="name-asc">Name: A to Z</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-stone-300 rounded-lg p-0.5 bg-stone-50 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-400 hover:text-stone-800'
                }`}
                title="Card Grid View"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'table' ? 'bg-white text-stone-950 shadow-xs' : 'text-stone-400 hover:text-stone-800'
                }`}
                title="Procurement Table View"
                aria-label="Table view"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-xl border border-stone-200 bg-stone-50">
            <Filter className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <p className="text-lg font-bold text-stone-800">No precast products match your search</p>
            <p className="text-sm text-stone-500 mt-1">Try resetting the search bar or choosing another category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* TABLE VIEW: High-density engineering procurement view */
          <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] border-b border-stone-200">
                <tr>
                  <th className="p-3">Product & Specification</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Concrete Grade</th>
                  <th className="p-3">Unit Weight</th>
                  <th className="p-3 text-right">Unit Price (KES)</th>
                  <th className="p-3 text-center">Order Qty</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {sortedProducts.map((product) => {
                  const isJustAdded = addedProductId === product.id;
                  const qty = getQty(product.id);

                  return (
                    <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-stone-950 font-['Space_Grotesk'] text-sm">
                          {product.name}
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                          {product.dimensions}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-stone-100 border border-stone-200 text-stone-700 uppercase">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-stone-600">
                        {product.concreteGrade.split(' ')[0]}
                      </td>
                      <td className="p-3 font-mono text-stone-600">
                        {product.weightKg} kg
                      </td>
                      <td className="p-3 text-right">
                        <div className="font-mono font-bold text-stone-950 text-sm">
                          KES {product.basePriceKES.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-stone-500">/{product.unit}</div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="inline-flex items-center border border-stone-300 rounded-lg bg-stone-50">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={qty}
                            onChange={(e) => setQty(product.id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center text-xs font-mono font-bold text-stone-900 bg-transparent focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onViewProductDetail(product)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 cursor-pointer"
                            title="View full specs"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleAddWithQty(product)}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-2xs'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Add ({qty})</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* GRID VIEW: Visual product cards with inline quantity picker */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => {
              const isJustAdded = addedProductId === product.id;
              const qty = getQty(product.id);

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="rounded-xl bg-white border border-stone-200 hover:border-amber-400/80 transition-all duration-200 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-md"
                >
                  {/* Card Visual / Illustration */}
                  <div className="relative border-b border-stone-200 bg-stone-100">
                    <ProductIllustration type={product.category} className="h-44 w-full" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {product.popular && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-stone-950 flex items-center gap-1 shadow-xs">
                          <Sparkles className="w-3 h-3" />
                          <span>HIGH DEMAND</span>
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/90 text-stone-800 border border-stone-200 shadow-xs backdrop-blur-sm">
                        {product.concreteGrade.split(' ')[0]}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                        In Stock
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-stone-950 group-hover:text-amber-800 transition-colors leading-snug font-['Space_Grotesk']">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {product.tagline}
                      </p>

                      {/* Technical Dimension Pill */}
                      <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-stone-700">
                        <div className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded border border-stone-200">
                          <Ruler className="w-3.5 h-3.5 text-amber-600" />
                          <span className="font-mono">{product.dimensions}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded border border-stone-200">
                          <Weight className="w-3.5 h-3.5 text-sky-600" />
                          <span>{product.weightKg} kg</span>
                        </div>
                      </div>

                      {/* Standard compliance tag */}
                      <div className="flex items-center gap-1 text-[11px] text-stone-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{product.standard}</span>
                      </div>
                    </div>

                    {/* Price & Action Footer with Quantity Stepper */}
                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-stone-500 uppercase font-mono tracking-wider">Unit Price</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-extrabold text-stone-950 font-mono">
                            KES {product.basePriceKES.toLocaleString()}
                          </span>
                          <span className="text-[11px] text-stone-500">/{product.unit}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty - 1)}
                            className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={qty}
                            onChange={(e) => setQty(product.id, parseInt(e.target.value) || 1)}
                            className="w-10 text-center text-xs font-mono font-bold text-stone-900 bg-transparent focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setQty(product.id, qty + 1)}
                            className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Details Modal Trigger */}
                        <button
                          onClick={() => onViewProductDetail(product)}
                          className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                          title="View Engineering Specifications"
                          aria-label={`View specs for ${product.name}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        {/* Add to Estimate Button */}
                        <button
                          onClick={() => handleAddWithQty(product)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                            isJustAdded
                              ? 'bg-emerald-600 text-white scale-105'
                              : 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>Add ({qty})</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Culvert Sizing Assistant Modal */}
      <CulvertSizingGuideModal
        isOpen={isSizingGuideOpen}
        onClose={() => setIsSizingGuideOpen(false)}
        products={products}
        onAddRecommended={(product, quantity, headwallProduct) => {
          onAddToQuote(product, quantity);
          if (headwallProduct) {
            onAddToQuote(headwallProduct, 2);
          }
        }}
      />
    </section>
  );
};
