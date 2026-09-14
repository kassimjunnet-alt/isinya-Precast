import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  FlaskConical, 
  Droplet, 
  CheckCircle2, 
  FileCheck, 
  Download,
  AlertTriangle,
  Layers,
  Scale,
  Gauge,
  Sparkles
} from 'lucide-react';

export const TechnicalSpecs: React.FC = () => {
  const [curingDays, setCuringDays] = useState<number>(21);

  // Strength curve data based on standard Portland 42.5N water curing
  const getStrengthData = (days: number) => {
    switch (days) {
      case 3:
        return { strength: 18.5, kebsRatio: 62, status: 'Initial Set & De-moulding' };
      case 7:
        return { strength: 24.2, kebsRatio: 81, status: 'Early Structural Strength' };
      case 14:
        return { strength: 29.0, kebsRatio: 97, status: 'Meets Base Standard' };
      case 21:
        return { strength: 33.4, kebsRatio: 111, status: 'Full Submersion Tank Cured (Factory Dispatch Standard)' };
      case 28:
        return { strength: 36.8, kebsRatio: 123, status: 'Ultimate Compressive Design Capacity' };
      default:
        return { strength: 33.4, kebsRatio: 111, status: 'Factory Standard' };
    }
  };

  const currentStrength = getStrengthData(curingDays);

  return (
    <section id="technical" className="py-16 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>KENYA BUREAU OF STANDARDS (KEBS) ALIGNED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight font-['Space_Grotesk']">
            Engineering Standards & Mix Design
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every precast element leaving our Isinya production plant conforms to the strict 
            standards required by KeNHA, KURA, and KeRRA highway authorities.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-950 font-['Space_Grotesk']">Controlled Mix Design</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Formulated with Type 42.5N rapid-hardening Portland cement, 10-14mm basalt aggregates, 
              and silt-free washed river sand at an exact 0.38 water-to-cement ratio.
            </p>
            <div className="text-[11px] font-mono text-amber-800 font-semibold pt-1">
              Class C25 to C45
            </div>
          </div>

          <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-700">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-950 font-['Space_Grotesk']">21-Day Tank Curing</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Unlike roadside casts cured under dry sun, all our culverts and posts undergo complete 
              submersion curing in saturated water basins to reach maximum hydration strength.
            </p>
            <div className="text-[11px] font-mono text-sky-800 font-semibold pt-1">
              Zero Micro-Cracking
            </div>
          </div>

          <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-950 font-['Space_Grotesk']">B500B Ribbed Steel</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Reinforced with full welded cylindrical helical cages. Precast posts feature continuous 
              deformed high-yield steel rods with closed stirrup links every 200mm.
            </p>
            <div className="text-[11px] font-mono text-emerald-800 font-semibold pt-1">
              500 MPa Yield Strength
            </div>
          </div>

          <div className="p-6 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-950 font-['Space_Grotesk']">Pneumatic Vibro-Molding</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              High-frequency industrial vibrating casting tables remove 99.8% of entrapped air pockets, 
              resulting in impermeable, glass-smooth concrete surfaces that repel water and frost.
            </p>
            <div className="text-[11px] font-mono text-purple-800 font-semibold pt-1">
              Density: 2,450 kg/m³
            </div>
          </div>
        </div>

        {/* INTERACTIVE COMPRESSIVE STRENGTH CUBE TEST VISUALIZER */}
        <div className="p-6 sm:p-8 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Gauge className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-950 font-['Space_Grotesk']">
                  Hydration & Cube Crush Strength Simulator
                </h3>
                <p className="text-xs text-stone-600">
                  Observe how controlled continuous water-curing yields 30+ N/mm² concrete vs. makeshift roadside dry casting.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-stone-600 bg-stone-200/60 px-2.5 py-1 rounded">
              BS EN 12390-3 Lab Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-800 uppercase font-mono">
                    Select Submersion Curing Duration:
                  </label>
                  <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                    Day {curingDays}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {[3, 7, 14, 21, 28].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setCuringDays(day)}
                      className={`py-2 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        curingDays === day
                          ? 'bg-amber-500 text-stone-950 shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {day} Days
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="text-xs font-bold text-stone-900 font-['Space_Grotesk']">
                  Stage Status: {currentStrength.status}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {curingDays >= 21 ? (
                    <>
                      At <strong>21 continuous days of water immersion</strong>, silica gel hydration crystals fully interlock, 
                      permanently sealing capillary pores. This prevents premature salt efflorescence and water permeability under highway culverts.
                    </>
                  ) : (
                    <>
                      Hydration is underway. Concrete has reached {currentStrength.kebsRatio}% of standard highway load requirement.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Right Gauge & Benchmark comparison */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-xl bg-white border border-stone-200 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-stone-500 uppercase">Tested Compressive Strength</span>
                  <div className="text-right">
                    <span className="text-3xl font-black font-mono text-stone-950">{currentStrength.strength}</span>
                    <span className="text-xs font-mono text-stone-500 ml-1">N/mm² (MPa)</span>
                  </div>
                </div>

                {/* Progress bar vs benchmarks */}
                <div className="space-y-1">
                  <div className="w-full bg-stone-200 h-3.5 rounded-full overflow-hidden relative">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (currentStrength.strength / 40) * 100)}%` }}
                    ></div>
                    {/* KeNHA target marker at 30 N/mm² (75%) */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-stone-900 z-10" 
                      style={{ left: '75%' }} 
                      title="KeNHA/KEBS Class C Target (30 N/mm²)"
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>0 N/mm²</span>
                    <span className="font-bold text-stone-700">30 N/mm² (KEBS Highway Standard)</span>
                    <span>40 N/mm²</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{currentStrength.kebsRatio >= 100 ? 'Exceeds KeNHA Highway Standard' : 'In Production Stage'}</span>
                  </span>
                  <span className="font-mono text-stone-500">
                    C30/37 Grade Assured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Comparison Table */}
        <div className="rounded-2xl bg-stone-50 border border-stone-200 overflow-hidden shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-stone-950 font-['Space_Grotesk']">
                Technical Benchmark: Isinya Precast vs. Roadside Casts
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Why infrastructure engineers and serious plot owners specify factory precast over makeshift roadside casting.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Certified Engineering Benchmark</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-stone-200">
              <thead className="bg-stone-100 text-stone-700 uppercase text-[11px] border-b border-stone-200">
                <tr>
                  <th className="p-3">Specification Parameter</th>
                  <th className="p-3 bg-amber-100/60 text-amber-950 font-bold border-x border-amber-200">
                    Isinya Precast Ltd (Factory Standard)
                  </th>
                  <th className="p-3 text-stone-500">
                    Informal Roadside / Jua Kali Casts
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-stone-700">
                <tr>
                  <td className="p-3 font-semibold text-stone-950">Concrete Compressive Strength</td>
                  <td className="p-3 bg-amber-50/70 font-mono text-amber-900 font-bold border-x border-amber-200/60">
                    C30/37 (30 - 35 N/mm²) Tested
                  </td>
                  <td className="p-3 text-stone-500">Uncontrolled (often &lt; 15 N/mm²)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-950">Curing Method</td>
                  <td className="p-3 bg-amber-50/70 font-mono text-amber-900 font-bold border-x border-amber-200/60">
                    21-Day Submerged Water Tank Curing
                  </td>
                  <td className="p-3 text-stone-500">Occasional sprinkling, dried in hot sun</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-950">Steel Reinforcement</td>
                  <td className="p-3 bg-amber-50/70 font-mono text-amber-900 font-bold border-x border-amber-200/60">
                    B500B Ribbed High-Yield Steel Helical Cage
                  </td>
                  <td className="p-3 text-stone-500">Plain scrap round wire or zero rebar</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-950">Axle Load Carrying Capacity</td>
                  <td className="p-3 bg-amber-50/70 font-mono text-amber-900 font-bold border-x border-amber-200/60">
                    Class C Road Rated (Up to 25 Tonne Axle)
                  </td>
                  <td className="p-3 text-stone-500">Cracks under loaded sand tippers</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-950">Expected Lifespan</td>
                  <td className="p-3 bg-amber-50/70 font-mono text-amber-900 font-bold border-x border-amber-200/60">
                    50+ Years (Zero Maintenance)
                  </td>
                  <td className="p-3 text-stone-500">3 - 7 Years before spalling and crumble</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-950">Compliance Standard</td>
                  <td className="p-3 bg-amber-50/70 font-mono text-amber-900 font-bold border-x border-amber-200/60">
                    KEBS KS 829-1:2018 / KS 02-106
                  </td>
                  <td className="p-3 text-stone-500">No laboratory test certificate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
