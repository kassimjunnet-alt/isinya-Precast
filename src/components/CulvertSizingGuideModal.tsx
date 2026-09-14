import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Truck, 
  Car, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Product } from '../types';

interface CulvertSizingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddRecommended: (product: Product, quantity: number, headwallProduct?: Product) => void;
}

export const CulvertSizingGuideModal: React.FC<CulvertSizingGuideModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddRecommended,
}) => {
  const [vehicleUsage, setVehicleUsage] = useState<'residential' | 'light_commercial' | 'heavy_trucks'>('residential');
  const [crossingWidth, setCrossingWidth] = useState<'4m' | '6m' | '8m'>('6m');
  const [waterFlow, setWaterFlow] = useState<'low' | 'moderate' | 'torrent'>('moderate');

  if (!isOpen) return null;

  // Compute recommendation
  let recommendedCulvertId = 'culvert-450';
  let recommendedLength = 6;
  let reason = '';

  if (crossingWidth === '4m') recommendedLength = 4;
  if (crossingWidth === '6m') recommendedLength = 6;
  if (crossingWidth === '8m') recommendedLength = 8;

  if (vehicleUsage === 'residential' && waterFlow === 'low') {
    recommendedCulvertId = 'culvert-450';
    reason = '450mm (18") pipe delivers ample flow capacity for shallow roadside storm trenches while comfortably bearing passenger SUVs, personal pickups, and water bowsers.';
  } else if (vehicleUsage === 'heavy_trucks' || waterFlow === 'torrent') {
    recommendedCulvertId = 'culvert-900';
    reason = '900mm (36") Extra Heavy Trunk Culverts feature high wall thickness (85mm) and dual B500B steel cages rated for fully laden 40-tonne commercial trucks and severe runoff.';
  } else {
    // light commercial or moderate flow
    recommendedCulvertId = 'culvert-600';
    reason = '600mm (24") Heavy Duty Road Culvert is the KeNHA and KURA benchmark specification for highway access crossings. It supports 25-tonne axle loads and ensures continuous, clog-free discharge.';
  }

  const recommendedProduct = products.find((p) => p.id === recommendedCulvertId) || products[1];
  const headwallProduct = products.find((p) => p.id === 'drain-headwall-600');

  const handleApply = () => {
    onAddRecommended(recommendedProduct, recommendedLength, headwallProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-stone-300 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-stone-900 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <HelpCircle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-950 font-['Space_Grotesk']">
                Culvert Sizing & Specification Assistant
              </h3>
              <p className="text-xs text-stone-600">
                Identify the right KEBS-certified concrete pipe for your plot gate or roadway crossing
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Options */}
        <div className="py-5 space-y-5">
          {/* Step 1: Vehicle Traffic */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase font-mono mb-2">
              1. Expected Vehicle & Traffic Load
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setVehicleUsage('residential')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  vehicleUsage === 'residential'
                    ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-500/20'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <Car className="w-4 h-4 text-amber-700 mb-1" />
                <div className="text-xs font-bold font-['Space_Grotesk']">Private & Domestic</div>
                <div className="text-[10px] text-stone-500 mt-0.5">SUVs, Saloons, Pickups</div>
              </button>

              <button
                type="button"
                onClick={() => setVehicleUsage('light_commercial')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  vehicleUsage === 'light_commercial'
                    ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-500/20'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <Truck className="w-4 h-4 text-amber-700 mb-1" />
                <div className="text-xs font-bold font-['Space_Grotesk']">Mixed Farm & Lorries</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Water Bowsers, Canters, 10T</div>
              </button>

              <button
                type="button"
                onClick={() => setVehicleUsage('heavy_trucks')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  vehicleUsage === 'heavy_trucks'
                    ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-500/20'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-700 mb-1" />
                <div className="text-xs font-bold font-['Space_Grotesk']">Heavy Articulated</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Semi-Trailers, 30T Tippers</div>
              </button>
            </div>
          </div>

          {/* Step 2: Gateway / Crossing Width */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase font-mono mb-2">
              2. Driveway or Road Entrance Width
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: '4m', label: '4 Meters (4 Pcs)', sub: 'Tight personal gate' },
                { id: '6m', label: '6 Meters (6 Pcs)', sub: 'Standard entrance (Recommended)' },
                { id: '8m', label: '8 Meters (8 Pcs)', sub: 'Dual lorry turn-in / Commercial' }
              ].map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setCrossingWidth(w.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    crossingWidth === w.id
                      ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-500/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{w.label}</div>
                  <div className="text-[10px] text-stone-500">{w.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Stormwater Drainage Flow */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase font-mono mb-2">
              3. Rainy Season Stormwater Flow Volume
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'low', label: 'Low Flow', sub: 'Gentle roadside ditch' },
                { id: 'moderate', label: 'Moderate Flow', sub: 'Typical road runoff' },
                { id: 'torrent', label: 'Heavy Torrent', sub: 'Seasonal river / gully' }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setWaterFlow(f.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    waterFlow === f.id
                      ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-500/20'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <div className="text-xs font-bold font-['Space_Grotesk']">{f.label}</div>
                  <div className="text-[10px] text-stone-500">{f.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>Engineered Recommendation:</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded">
                KES {(recommendedProduct.basePriceKES * recommendedLength).toLocaleString()} Subtotal
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-base font-bold text-stone-950 font-['Space_Grotesk']">
                  {recommendedLength}m x {recommendedProduct.name}
                </h4>
                <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                  {reason}
                </p>
              </div>
            </div>

            <div className="text-[11px] text-amber-950/80 flex items-center gap-1.5 pt-1 border-t border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Includes recommendation for 2 Precast Headwalls to protect road embankments.</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-medium cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <span>Load Recommendation into BoQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
