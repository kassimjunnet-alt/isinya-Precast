import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  PhoneCall,
  Navigation,
  Calculator,
  Weight
} from 'lucide-react';
import { DELIVERY_LOCATIONS, COMPANY_DETAILS } from '../data/locations';

interface DeliveryCoverageProps {
  onNavigateToQuote?: (townId?: string) => void;
}

export const DeliveryCoverage: React.FC<DeliveryCoverageProps> = ({ onNavigateToQuote }) => {
  const [selectedTownId, setSelectedTownId] = useState<string>('kitengela');
  const [payloadTonnes, setPayloadTonnes] = useState<number>(6);

  const selectedLocation = DELIVERY_LOCATIONS.find(l => l.id === selectedTownId) || DELIVERY_LOCATIONS[2];

  // Calculate haulage estimate
  const distance = selectedLocation.distanceKm;
  let truckType = '4-Tonne Light Canter';
  let baseFreight = selectedLocation.baseHaulageKES;

  if (payloadTonnes > 14) {
    truckType = '28-Tonne Semi-Trailer (with Crane)';
    baseFreight = Math.round(baseFreight * 1.8);
  } else if (payloadTonnes > 6) {
    truckType = '14-Tonne 6x4 Rigid Fleet (with Crane)';
    baseFreight = Math.round(baseFreight * 1.35);
  } else {
    truckType = '7-Tonne Flatbed (with Offload)';
  }

  // Estimated travel duration
  let estDuration = '30 - 45 mins';
  if (distance === 0) estDuration = 'Instant (Yard Loading)';
  else if (distance < 25) estDuration = '35 - 55 mins';
  else if (distance < 50) estDuration = '1.0 - 1.5 hrs';
  else if (distance < 80) estDuration = '1.5 - 2.5 hrs';
  else estDuration = '3.0 - 4.5 hrs';

  const handleApplyToEstimator = () => {
    if (onNavigateToQuote) {
      onNavigateToQuote(selectedLocation.id);
    } else {
      const el = document.getElementById('quote');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="delivery" className="py-16 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold font-mono">
            <Truck className="w-3.5 h-3.5 text-amber-600" />
            <span>FLEET LOGISTICS & CRANE OFFLOADING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight font-['Space_Grotesk']">
            Delivery Coverage & Live Route Calculator
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Precast concrete is heavy and fragile when mishandled. We maintain our own fleet of 
            crane-mounted trucks to ensure your culverts, poles, and slabs arrive safely and are 
            mechanically placed right on your job site across Kajiado, Nairobi, Machakos, and the border.
          </p>
        </div>

        {/* Coverage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Core Kajiado Hub */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">
                Zone 1 • Fast Track
              </span>
              <span className="text-xs text-stone-500 font-mono">0 - 45 km</span>
            </div>
            <h3 className="text-lg font-bold text-stone-950 font-['Space_Grotesk']">Kajiado County Heartland</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Same-day to next-day delivery with flexible site placement along access roads and farm gateways.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-700 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Isinya Town & Pipeline Road</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Kitengela, Acacia, Yukos & Environs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Kajiado Central, Dalalekutuk & Bissil</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ongata Rongai, Kiserian & Rimpa</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Nairobi & Metropolitan */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-900 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded">
                Zone 2 • Metropolis
              </span>
              <span className="text-xs text-stone-500 font-mono">40 - 75 km</span>
            </div>
            <h3 className="text-lg font-bold text-stone-950 font-['Space_Grotesk']">Nairobi & Machakos Corridor</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Serving industrial contractors, commercial godowns, road contractors, and estate developments.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-700 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Athi River & Mavoko Industrial Hub</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Syokimau, Embakasi & Mombasa Road</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Nairobi Industrial Area & Commercial CBD</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Machakos Town, Kyumvi & Mua Hills</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Transit Highway & Cross-Border */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-900 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded">
                Zone 3 • Regional
              </span>
              <span className="text-xs text-stone-500 font-mono">75 - 150+ km</span>
            </div>
            <h3 className="text-lg font-bold text-stone-950 font-['Space_Grotesk']">Namanga Border & Regional</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Full 28-tonne semi-trailer convoys dispatched directly to commercial farms, mines, and cross-border projects.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-700 font-medium">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Namanga One-Stop Border Post</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Amboseli & Mashuru road networks</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Emali & Sultan Hamud (Mombasa Highway)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Magadi Soda road civil contractors</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Live Trip & Freight Route Calculator (INTERACTIVE UX ENHANCEMENT) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Calculator className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-950 font-['Space_Grotesk']">
                  Interactive Site Freight & ETA Calculator
                </h3>
                <p className="text-xs text-stone-600">
                  Select your destination site from Isinya yard to calculate real-time transit distance, vehicle suitability, and haulage cost.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded border border-amber-200 shrink-0">
              Direct Plant Departure
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 uppercase font-mono mb-1.5">
                  Select Delivery Destination:
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedTownId}
                    onChange={(e) => setSelectedTownId(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-2xs cursor-pointer"
                  >
                    {DELIVERY_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.town} — {loc.distanceKm} km ({loc.county} County)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-stone-800 uppercase font-mono">
                    Estimated Project Payload Weight:
                  </label>
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    {payloadTonnes} Tonnes
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="28"
                  step="1"
                  value={payloadTonnes}
                  onChange={(e) => setPayloadTonnes(parseInt(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                  <span>1T (Light Canter)</span>
                  <span>10T (Rigid)</span>
                  <span>20T (Heavy Tipper)</span>
                  <span>28T (Semi-Trailer)</span>
                </div>
              </div>
            </div>

            {/* Right Live Results Display */}
            <div className="lg:col-span-6 bg-white border border-stone-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="text-[10px] uppercase font-mono text-stone-500 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-stone-400" />
                    <span>Road Distance</span>
                  </div>
                  <div className="text-base font-extrabold font-mono text-stone-950 mt-1">
                    {distance} km
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">Ex-Isinya Plant (A104)</div>
                </div>

                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                  <div className="text-[10px] uppercase font-mono text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>Est. Transit Time</span>
                  </div>
                  <div className="text-base font-extrabold font-mono text-stone-950 mt-1">
                    {estDuration}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">Under standard traffic</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-stone-500">Recommended Fleet Class</div>
                  <div className="text-xs font-bold text-stone-900 mt-0.5 font-['Space_Grotesk']">{truckType}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-mono text-stone-500">Estimated Freight</div>
                  <div className="text-base font-black font-mono text-amber-800">
                    {baseFreight === 0 ? 'FREE / YARD PICKUP' : `KES ${baseFreight.toLocaleString()}`}
                  </div>
                </div>
              </div>

              <button
                onClick={handleApplyToEstimator}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <span>Calculate Total with Precast Items in BoQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Fleet & Offloading Assistance Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h4 className="text-lg font-bold text-stone-950 font-['Space_Grotesk']">
                Why Mechanical Crane Offloading Matters
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Dropping or rolling heavy concrete culverts off conventional tipper lorries causes internal hairline 
              cracks that fail KeNHA hydraulic pressure tests months later. Our specialized knuckle-boom cranes gently 
              hoist and lower each pipe directly into your pre-excavated trench or road verge.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_DETAILS.primaryPhone}`}
              className="px-5 py-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Direct Logistics Line: {COMPANY_DETAILS.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
