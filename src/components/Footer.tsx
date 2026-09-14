import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUp,
  MessageCircle
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/locations';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-100 text-stone-600 border-t border-stone-200 text-xs">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-stone-950 font-black shadow-sm shrink-0">
                <Building2 className="w-5 h-5 text-stone-950" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-base text-stone-950 tracking-tight font-['Space_Grotesk'] leading-tight">
                  ISINYA PRECAST
                </span>
                <p className="text-[10px] text-stone-500 uppercase tracking-wider font-mono mt-0.5 leading-normal">Limited • Kenya</p>
              </div>
            </div>
            <p className="text-stone-600 leading-relaxed text-xs">
              Manufacturers of high-strength, KEBS-certified precast concrete culvert pipes, 
              reinforced fencing posts, paving slabs, cabro blocks, and civil drainage channels in Isinya, Kajiado County.
            </p>
            <div className="flex items-center gap-1.5 text-amber-800 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Standard: {COMPANY_DETAILS.kebsStandard}</span>
            </div>
            <div>
              <button
                onClick={() => onNavigate('projects')}
                className="text-amber-800 hover:text-amber-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <span>View Completed Projects Gallery →</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold uppercase tracking-wider font-mono text-xs">Precast Products</h4>
            <ul className="space-y-2 text-stone-600">
              {[
                { id: 'culverts', label: 'Reinforced Road Culverts (450 - 1200mm)' },
                { id: 'poles', label: 'Concrete Fencing Posts (7ft, 8ft, Cranked)' },
                { id: 'slabs', label: 'Paving Slabs (500x500 & 600x600mm)' },
                { id: 'slabs', label: 'Heavy Duty Cabro Blocks (60/80mm)' },
                { id: 'drains', label: 'Half-Round Drains & Shallow I-Drains' },
                { id: 'drains', label: 'Standard Road Kerbs (125x250x1000mm)' },
                { id: 'custom', label: 'Precast Septic Rings & Manholes' },
                { id: 'blocks', label: 'Precast Lintel Beams & Foundation Blocks' }
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => onNavigate('products')}
                    className="hover:text-amber-700 transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Haulage & Locations */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold uppercase tracking-wider font-mono text-xs">Delivery Areas</h4>
            <ul className="space-y-1.5 text-stone-600">
              <li>• Isinya & Pipeline Road (Same-Day)</li>
              <li>• Kitengela & Acacia Environs</li>
              <li>• Kajiado Central, Bissil & Namanga</li>
              <li>• Athi River & Mavoko Industrial Hub</li>
              <li>• Nairobi South & Industrial Area</li>
              <li>• Machakos Town & Kyumvi</li>
              <li>• Ongata Rongai & Kiserian</li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('delivery')}
                className="text-amber-700 hover:text-amber-800 font-semibold text-xs flex items-center gap-1 cursor-pointer"
              >
                <span>View Crane Truck Offloading Fleet →</span>
              </button>
            </div>
          </div>

          {/* Col 4: Corporate & Bank Accounts */}
          <div className="space-y-3">
            <h4 className="text-stone-900 font-bold uppercase tracking-wider font-mono text-xs">Official Remittance</h4>
            <div className="p-3 rounded-lg bg-white border border-stone-200 space-y-1 text-[11px] shadow-xs">
              <div>Bank: <strong className="text-stone-900">{COMPANY_DETAILS.bankName}</strong></div>
              <div>Branch: <strong className="text-stone-900">{COMPANY_DETAILS.bankBranch}</strong></div>
              <div>A/C: <strong className="font-mono text-amber-800">{COMPANY_DETAILS.accountNumber}</strong></div>
              <div>MPESA Paybill: <strong className="font-mono text-emerald-700">{COMPANY_DETAILS.mpesaPaybill}</strong></div>
              <div>Account: <strong className="font-mono text-stone-900">ISINYA PRECAST</strong></div>
            </div>
            <div className="text-[11px] text-stone-500">
              Direct Sales Email: <br />
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-amber-800 hover:underline">
                {COMPANY_DETAILS.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Copyright Strip */}
      <div className="border-t border-stone-200 bg-stone-200/50 py-4 px-4 text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.name}. All Rights Reserved. Reg: {COMPANY_DETAILS.legalRegistration}.
          </div>
          <div className="flex items-center gap-4">
            <span>Built for Infrastructure Contractors & Estate Developers</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
