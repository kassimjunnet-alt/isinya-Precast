import React from 'react';
import { 
  Factory, 
  Layers, 
  Droplets, 
  Truck, 
  CheckCircle2, 
  Award, 
  Hammer, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const YardShowcase: React.FC = () => {
  const processSteps = [
    {
      step: '01',
      title: 'Structural Steel Cage Weaving',
      desc: 'High-tensile B500B deformed steel rebars are machine-bent and arc-welded into cylindrical helical cages with precise concrete cover spacers.',
      highlight: 'B500B Ribbed Core'
    },
    {
      step: '02',
      title: 'Precision Heavy Steel Moulds',
      desc: 'Casting is conducted in heavy-gauge 6mm milled steel moulds fitted with machined tongue and groove joint formers for gap-free alignment.',
      highlight: 'CNC Machined Joints'
    },
    {
      step: '03',
      title: 'Controlled Batching & Vibro-Compacting',
      desc: 'Portland 42.5N cement and washed granite aggregate are batched by weight and consolidated on high-frequency pneumatic vibrating tables.',
      highlight: 'Zero Slump High Density'
    },
    {
      step: '04',
      title: '21-Day Water Saturated Curing',
      desc: 'De-moulded products are immediately submerged in our temperature-moderated curing basins for 21 continuous days to complete hydration.',
      highlight: 'Maximum Durability'
    },
    {
      step: '05',
      title: 'Laboratory Cube Compression Testing',
      desc: 'Representative concrete test cubes are crushed in a calibrated hydraulic compression rig to certify minimum 30 - 35 N/mm² strength.',
      highlight: 'Certified Lab Batches'
    },
    {
      step: '06',
      title: 'Crane-Mounted Fleet Dispatch',
      desc: 'Products are loaded using our yard gantry crane onto flatbed trucks equipped with hydraulic knuckle-boom cranes for on-site offloading.',
      highlight: 'Safe Direct Offload'
    }
  ];

  return (
    <section id="yard" className="py-16 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold font-mono">
            <Factory className="w-3.5 h-3.5 text-amber-600" />
            <span>5-ACRE INDUSTRIAL PRODUCTION YARD • ISINYA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight font-['Space_Grotesk']">
            Our Manufacturing Facility & Process
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Located along the Nairobi-Namanga development corridor in Kajiado County, 
            our specialized precast plant combines heavy mechanical molding machinery with 
            large-capacity water curing tanks for uncompromised structural reliability.
          </p>
        </div>

        {/* Production Yard Visual Showcase Banner */}
        <div className="mb-10 relative rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-900 aspect-[16/9] sm:aspect-[24/9] max-h-72">
          <img
            src="/hero_precast_yard.jpg"
            alt="Isinya Precast Limited heavy manufacturing yard and curing basins"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-stone-950/10"></div>
          <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
            <div>
              <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                Facility Overview
              </div>
              <h3 className="text-base sm:text-xl font-bold font-['Space_Grotesk']">
                Isinya Industrial Yard & Heavy Stockpiles • Namanga Highway
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900/80 backdrop-blur-md border border-white/20 text-xs text-stone-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>5-Acre Active Facility</span>
            </div>
          </div>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {processSteps.map((s) => (
            <div 
              key={s.step} 
              className="p-6 rounded-xl bg-white border border-stone-200 hover:border-amber-500/50 shadow-xs transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-amber-600 font-['Space_Grotesk']">
                    {s.step}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-900 font-mono border border-amber-200">
                    {s.highlight}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-950 group-hover:text-amber-800 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>KEBS Quality Checkpoint Passed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Facility Highlights Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2">
            <h4 className="text-base font-bold text-stone-950 font-['Space_Grotesk']">Contractor Direct Sourcing</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              We supply ongoing KeNHA, KURA, and county road tenders directly from our manufacturing inventory. 
              We offer trade credit terms for verified road construction firms.
            </p>
          </div>
          <div className="space-y-2 border-y md:border-y-0 md:border-x border-stone-200 py-4 md:py-0 md:px-6">
            <h4 className="text-base font-bold text-stone-950 font-['Space_Grotesk']">Custom Precast Moulding</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Have unique civil architectural drawings? We fabricate custom steel formwork for non-standard 
              headwalls, wingwalls, bridge beams, coping stones, and water channels.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold text-stone-950 font-['Space_Grotesk']">Sustainable Quarry Aggregates</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Aggregates sourced directly from certified hardstone basalt quarries in Kajiado, 
              sifted and washed to guarantee zero organic or clay silt contamination.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
