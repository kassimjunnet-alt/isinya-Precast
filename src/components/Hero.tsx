import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Award, 
  ArrowRight, 
  Calculator, 
  CheckCircle2, 
  ChevronRight,
  PhoneCall,
  Layers,
  Sparkles,
  ZoomIn,
  X,
  Building2,
  MapPin
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/locations';
import heroImageUrl from '../assets/images/hero_precast_yard_1789404582389.jpg';

interface HeroProps {
  onExploreProducts: () => void;
  onOpenEstimator: () => void;
  onSelectCategory: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onOpenEstimator,
  onSelectCategory
}) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <section id="hero" className="relative bg-stone-50 text-stone-900 overflow-hidden border-b border-stone-200">
      {/* Subtle Construction Mesh / Architectural Backdrop */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#a8a29e_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-stone-200/60 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Location & Certification Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>KEBS Certified Precast Plant • Isinya, Kajiado County</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 leading-[1.1] font-['Space_Grotesk']">
              Strength in Precision. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 bg-clip-text text-transparent">
                Precast Built for Generations.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              We manufacture certified reinforced concrete culverts, heavy-duty fencing poles, 
              non-slip paving slabs, cabro paving blocks, and stormwater channels. 
              Supplied directly from our 5-acre Isinya production yard with flatbed crane offloading 
              across Kajiado, Nairobi, Athi River, and East Africa.
            </p>

            {/* Mobile Hero Visual Showcase Card (Visible on mobile/tablet, hidden on desktop lg:hidden) */}
            <div className="block lg:hidden pt-1 pb-2">
              <div 
                id="hero-mobile-yard-image-container"
                className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-lg aspect-[16/10] sm:aspect-[16/9] group cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
                title="Tap to view full-resolution 5-acre Isinya manufacturing yard"
              >
                <img
                  src="/hero_precast_yard.jpg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== heroImageUrl) {
                      target.src = heroImageUrl;
                    }
                  }}
                  alt="Isinya Precast concrete manufacturing yard, culvert stockpiles, and crane truck in Kajiado County"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-stone-950/15"></div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950/85 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-mono font-bold tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ISINYA PRODUCTION YARD</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold font-mono">
                    5-ACRE PLANT
                  </span>
                </div>

                {/* Bottom Overlay Info & Zoom Button */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
                  <div>
                    <div className="text-[10px] font-mono text-amber-300 font-semibold tracking-wider uppercase">
                      Live Manufacturing Yard
                    </div>
                    <div className="text-sm font-bold font-['Space_Grotesk'] leading-tight drop-shadow-md">
                      C30 Culverts & Heavy Crane Fleet
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur-md text-amber-300 text-xs font-semibold border border-white/20 pointer-events-auto">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>Zoom</span>
                  </div>
                </div>
              </div>

              {/* Mobile Stock Status Strip */}
              <div className="mt-2.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200 flex items-center justify-between text-xs shadow-2xs">
                <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Namanga Rd Highway, Isinya</span>
                </span>
                <span className="font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                  Ready for Dispatch
                </span>
              </div>
            </div>

            {/* Core Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">C30 / C35 Concrete</div>
                  <div className="text-xs text-stone-600">High early strength Portland 42.5N</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">21-Day Tank Cured</div>
                  <div className="text-xs text-stone-600">Zero micro-cracking guarantee</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200 shadow-xs">
                <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">Crane Offloading</div>
                  <div className="text-xs text-stone-600">Delivered directly onto your site</div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Optimized for Mobile touch & Desktop */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-3">
              <button
                id="hero-explore-products-btn"
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-extrabold text-base shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>View Products & Prices</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-open-estimator-btn"
                onClick={onOpenEstimator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 active:bg-stone-200 border border-stone-300 text-stone-800 font-bold text-base transition-all shadow-xs cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-600" />
                <span>Calculate Instant Quote</span>
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.primaryPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-stone-100 text-sm font-semibold transition-colors border border-stone-200 sm:border-transparent"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Call Sales Desk</span>
              </a>
            </div>
          </div>

          {/* Right Visual Column: Production Yard Photo & Fast Action Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-stone-200 shadow-xl overflow-hidden">
              {/* Featured Precast Yard Hero Image */}
              <div 
                id="hero-yard-image-container"
                className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-900 group cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
                title="Click to view full 5-acre Isinya precast facility"
              >
                <img
                  src="/hero_precast_yard.jpg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== heroImageUrl) {
                      target.src = heroImageUrl;
                    }
                  }}
                  alt="Isinya Precast concrete manufacturing yard and culvert stock in Kajiado County"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-stone-950/15 group-hover:from-stone-950/75 transition-colors"></div>

                {/* Top Badges on Image */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold tracking-wide shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>ISINYA PRODUCTION YARD</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold tracking-wider font-mono shadow-sm">
                    5-ACRE PLANT
                  </span>
                </div>

                {/* Bottom Image Overlay Caption & Zoom Icon */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white pointer-events-none">
                  <div>
                    <div className="text-[11px] font-mono text-amber-300 font-semibold tracking-wider uppercase drop-shadow-sm">
                      Live Manufacturing Yard
                    </div>
                    <div className="text-sm sm:text-base font-bold font-['Space_Grotesk'] leading-tight drop-shadow-md">
                      C30 Culverts & Heavy Crane Fleet
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-950/70 backdrop-blur-md text-white text-xs font-medium border border-white/25 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:border-amber-500 transition-colors shadow-sm pointer-events-auto">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">Expand</span>
                  </div>
                </div>
              </div>

              {/* Status Bar Beneath Image */}
              <div className="px-5 py-2.5 bg-stone-50 border-y border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-800 font-bold">
                    Stock Status: Ready for Dispatch
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                  Same-Day Loading
                </span>
              </div>

              {/* Fast Category Filter Cards */}
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  <div className="text-xs uppercase font-mono tracking-wider text-stone-500 flex items-center justify-between">
                    <span>Fast Catalog Jump</span>
                    <span>Direct Prices (KES)</span>
                  </div>

                  {[
                    {
                      category: 'culverts',
                      name: 'Reinforced Road Culverts',
                      spec: '450mm, 600mm, 900mm, 1200mm',
                      price: 'From KES 3,100 /m',
                      tag: 'Road Drainage'
                    },
                    {
                      category: 'poles',
                      name: 'Concrete Fencing Posts',
                      spec: '7ft Straight, 8ft Straight, 8.5ft Cranked',
                      price: 'From KES 780 /pc',
                      tag: 'Perimeter Security'
                    },
                    {
                      category: 'slabs',
                      name: 'Paving Slabs & Cabro Blocks',
                      spec: '500x500mm, 600x600mm, 60/80mm Cabro',
                      price: 'From KES 340 /pc',
                      tag: 'Walkways & Yards'
                    },
                    {
                      category: 'drains',
                      name: 'Drainage Channels & Kerbs',
                      spec: 'Half-Round Drains, I-Drains, Road Kerbs',
                      price: 'From KES 680 /m',
                      tag: 'Civil Drainage'
                    },
                    {
                      category: 'custom',
                      name: 'Precast Septic Rings & Slabs',
                      spec: '1.2m Diameter Rings & Heavy Covers',
                      price: 'From KES 4,600 /ring',
                      tag: 'Rapid Bio-Septic'
                    }
                  ].map((item) => (
                    <button
                      key={item.category}
                      onClick={() => onSelectCategory(item.category)}
                      className="w-full text-left p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50/70 border border-stone-200 hover:border-amber-300 transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-200/80 text-stone-700 border border-stone-300 font-medium">
                            {item.tag}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500">{item.spec}</div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div className="text-xs font-mono font-bold text-amber-800">{item.price}</div>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Instant Quotation Banner Inside Card */}
                <div className="pt-1">
                  <button
                    id="hero-quick-boq-btn"
                    onClick={onOpenEstimator}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-extrabold text-sm shadow-sm transition-all hover:scale-[1.01]"
                  >
                    <Sparkles className="w-4 h-4 text-stone-950" />
                    <span>Build BoQ & Transport Estimate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistical Banner */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-stone-950 font-['Space_Grotesk']">200+</div>
            <div className="text-xs sm:text-sm text-stone-600 font-medium">Daily Culvert Capacity</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-stone-950 font-['Space_Grotesk']">500+</div>
            <div className="text-xs sm:text-sm text-stone-600 font-medium">Daily Fencing Posts Cast</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-stone-950 font-['Space_Grotesk']">50+ Yrs</div>
            <div className="text-xs sm:text-sm text-stone-600 font-medium">Engineered Concrete Lifespan</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-stone-950 font-['Space_Grotesk']">100%</div>
            <div className="text-xs sm:text-sm text-stone-600 font-medium">KeNHA / KEBS Standard Assured</div>
          </div>
        </div>
      </div>

      {/* High-Resolution Yard Photo Lightbox Modal */}
      {isImageModalOpen && (
        <div 
          id="hero-yard-image-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                    Isinya Precast Limited • 5-Acre Manufacturing Yard
                  </h3>
                  <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>Namanga Road Highway, Isinya, Kajiado County, Kenya</span>
                  </p>
                </div>
              </div>
              <button
                id="close-yard-modal-btn"
                onClick={() => setIsImageModalOpen(false)}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Large Image */}
            <div className="relative aspect-video w-full bg-stone-950">
              <img
                src="/hero_precast_yard.jpg"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== heroImageUrl) {
                    target.src = heroImageUrl;
                  }
                }}
                alt="High-resolution view of Isinya Precast production yard and concrete stocks"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Footer Notes */}
            <div className="p-6 bg-stone-900 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-stone-300 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-amber-400 uppercase font-bold text-[11px]">Production Capacity</span>
                <p>Over 200 high-strength reinforced culverts and 500 fencing poles cast and vibrated daily.</p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-amber-400 uppercase font-bold text-[11px]">Curing Basins</span>
                <p>21 continuous days of water-saturated curing ensuring full hydration and zero micro-cracking.</p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-amber-400 uppercase font-bold text-[11px]">Crane Logistics</span>
                <p>Equipped with heavy gantry loading cranes and flatbed trucks with articulated knuckle booms.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
