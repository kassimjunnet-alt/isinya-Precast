import React from 'react';

interface IllustrationProps {
  type: 'culverts' | 'poles' | 'slabs' | 'drains' | 'blocks' | 'custom' | string;
  className?: string;
}

export const ProductIllustration: React.FC<IllustrationProps> = ({ type, className = 'w-full h-48' }) => {
  switch (type) {
    case 'culverts':
      return (
        <div className={`relative flex items-center justify-center bg-stone-100 overflow-hidden rounded-lg ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 p-3" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Engineering Grid Background */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.3" />
              </pattern>
              <linearGradient id="concOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="pipeBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="30%" stopColor="#cbd5e1" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#grid)" />

            {/* 3D Culvert Pipe Body */}
            <path d="M 120 50 L 320 50 A 30 70 0 0 1 320 190 L 120 190 Z" fill="url(#pipeBody)" />
            
            {/* Far End Rim */}
            <ellipse cx="320" cy="120" rx="20" ry="70" fill="#475569" />
            <ellipse cx="320" cy="120" rx="14" ry="54" fill="#334155" stroke="#ea580c" strokeWidth="1" strokeDasharray="3 3" />

            {/* Near End Mouth Face */}
            <ellipse cx="120" cy="120" rx="36" ry="70" fill="url(#concOuter)" stroke="#475569" strokeWidth="1.5" />
            {/* Pipe Wall Rim */}
            <ellipse cx="120" cy="120" rx="26" ry="54" fill="#1e293b" stroke="#f97316" strokeWidth="1.5" />
            
            {/* Embedded Steel Rebar Indicators (Points inside wall) */}
            <circle cx="120" cy="56" r="3" fill="#ea580c" />
            <circle cx="120" cy="184" r="3" fill="#ea580c" />
            <circle cx="90" cy="120" r="3" fill="#ea580c" />
            <circle cx="150" cy="120" r="3" fill="#ea580c" />
            <circle cx="100" cy="74" r="2.5" fill="#ea580c" />
            <circle cx="140" cy="74" r="2.5" fill="#ea580c" />
            <circle cx="100" cy="166" r="2.5" fill="#ea580c" />
            <circle cx="140" cy="166" r="2.5" fill="#ea580c" />

            {/* Longitudinal Reinforcement Ribs (Hidden lines) */}
            <line x1="120" y1="56" x2="320" y2="56" stroke="#ea580c" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.7" />
            <line x1="120" y1="184" x2="320" y2="184" stroke="#ea580c" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.7" />

            {/* Technical Dimension Callouts */}
            <line x1="120" y1="205" x2="320" y2="205" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 120 200 L 120 210 M 320 200 L 320 210" stroke="#0284c7" strokeWidth="1.5" />
            <text x="220" y="222" fill="#0369a1" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">L = 1000mm (Standard)</text>

            <line x1="50" y1="66" x2="50" y2="174" stroke="#c2410c" strokeWidth="1.5" />
            <path d="M 45 66 L 55 66 M 45 174 L 55 174" stroke="#c2410c" strokeWidth="1.5" />
            <text x="42" y="123" fill="#c2410c" fontSize="11" fontFamily="monospace" textAnchor="end" fontWeight="bold">Ø 450 - 1200mm</text>

            {/* Badge */}
            <rect x="270" y="15" width="115" height="24" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
            <text x="327" y="31" fill="#0284c7" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">KS 829 CLASS C</text>
          </svg>
        </div>
      );

    case 'poles':
      return (
        <div className={`relative flex items-center justify-center bg-stone-100 overflow-hidden rounded-lg ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 p-3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="postBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="35%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            {/* Ground Level Line */}
            <line x1="40" y1="180" x2="360" y2="180" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />
            <text x="350" y="174" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="end">GROUND LEVEL</text>
            <rect x="40" y="180" width="320" height="45" fill="#e2e8f0" fillOpacity="0.8" />

            {/* Left Post: 7ft Straight */}
            <g transform="translate(110, 20)">
              {/* Post Body */}
              <rect x="0" y="10" width="30" height="190" rx="2" fill="url(#postBody)" stroke="#475569" strokeWidth="1" />
              {/* Chamfered top */}
              <polygon points="0,10 15,0 30,10" fill="#94a3b8" />
              {/* Wire Eyelet Holes */}
              {[35, 60, 85, 110, 135, 160].map((y, i) => (
                <g key={i}>
                  <circle cx="15" cy={y} r="3" fill="#1e293b" stroke="#ea580c" strokeWidth="1" />
                  <line x1="-15" y1={y} x2="45" y2={y} stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="3 3" />
                </g>
              ))}
              {/* Internal rebars (ghost) */}
              <line x1="6" y1="5" x2="6" y2="195" stroke="#ea580c" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="24" y1="5" x2="24" y2="195" stroke="#ea580c" strokeWidth="1" strokeOpacity="0.5" />
              <text x="15" y="212" fill="#1e293b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">7ft Straight</text>
            </g>

            {/* Right Post: 8.5ft Cranked Security Post */}
            <g transform="translate(230, 20)">
              {/* Cranked Top Overhang Arm */}
              <polygon points="0,40 30,40 55,2 30,2" fill="#64748b" stroke="#334155" strokeWidth="1" />
              {/* Razor wire / Barbed wire notches */}
              <circle cx="34" cy="12" r="2.5" fill="#1e293b" stroke="#ea580c" strokeWidth="1" />
              <circle cx="43" cy="22" r="2.5" fill="#1e293b" stroke="#ea580c" strokeWidth="1" />
              <circle cx="51" cy="32" r="2.5" fill="#1e293b" stroke="#ea580c" strokeWidth="1" />
              {/* Post Main Stem */}
              <rect x="0" y="40" width="30" height="160" rx="1" fill="url(#postBody)" stroke="#475569" strokeWidth="1" />
              {/* Wire Holes */}
              {[60, 85, 110, 135, 160].map((y, i) => (
                <circle key={i} cx="15" cy={y} r="3" fill="#1e293b" stroke="#ea580c" strokeWidth="1" />
              ))}
              <text x="15" y="212" fill="#1e293b" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">8.5ft Cranked</text>
            </g>

            {/* Spec callout */}
            <rect x="20" y="20" width="70" height="42" rx="4" fill="#ffffff" stroke="#ea580c" strokeWidth="1" />
            <text x="55" y="36" fill="#c2410c" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">4" x 4"</text>
            <text x="55" y="52" fill="#64748b" fontSize="9" fontFamily="sans-serif" textAnchor="middle">C25 Rebar Core</text>
          </svg>
        </div>
      );

    case 'slabs':
      return (
        <div className={`relative flex items-center justify-center bg-stone-100 overflow-hidden rounded-lg ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 p-3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="slabTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="slabEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            {/* 3D Isometric Precast Paving Slab (500x500x50mm) */}
            <g transform="translate(180, 50)">
              {/* Isometric Slab Top Face */}
              <polygon points="0,0 120,45 0,90 -120,45" fill="url(#slabTop)" stroke="#94a3b8" strokeWidth="1.5" />
              
              {/* Diamond textured lines on top surface */}
              {[-60, -30, 0, 30, 60].map((offset, i) => (
                <line key={`d1-${i}`} x1={-90 + offset} y1={56 + offset*0.3} x2={30 + offset} y2={11 + offset*0.3} stroke="#94a3b8" strokeWidth="0.75" strokeOpacity="0.8" />
              ))}
              {[-60, -30, 0, 30, 60].map((offset, i) => (
                <line key={`d2-${i}`} x1={-30 + offset} y1={11 + offset*0.3} x2={90 + offset} y2={56 + offset*0.3} stroke="#94a3b8" strokeWidth="0.75" strokeOpacity="0.8" />
              ))}

              {/* Front Right Thickness Edge */}
              <polygon points="0,90 120,45 120,68 0,113" fill="url(#slabEdge)" stroke="#475569" strokeWidth="1" />
              {/* Front Left Thickness Edge */}
              <polygon points="0,90 -120,45 -120,68 0,113" fill="#64748b" stroke="#475569" strokeWidth="1" />

              {/* Interlocking Cabro Block Accents in foreground */}
              <g transform="translate(-100, 110)">
                <polygon points="0,0 35,14 35,32 0,18" fill="#c2410c" stroke="#9a3412" strokeWidth="1" />
                <polygon points="35,14 70,0 70,18 35,32" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
                <polygon points="0,0 35,-14 70,0 35,14" fill="#fb923c" stroke="#ea580c" strokeWidth="1" />
              </g>
              <g transform="translate(-30, 122)">
                <polygon points="0,0 35,14 35,32 0,18" fill="#475569" stroke="#334155" strokeWidth="1" />
                <polygon points="35,14 70,0 70,18 35,32" fill="#64748b" stroke="#334155" strokeWidth="1" />
                <polygon points="0,0 35,-14 70,0 35,14" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
              </g>
            </g>

            {/* Technical Annotations */}
            <text x="60" y="55" fill="#0284c7" fontSize="12" fontFamily="monospace" fontWeight="bold">500 x 500 mm</text>
            <text x="60" y="72" fill="#475569" fontSize="10" fontFamily="sans-serif">Thickness: 50mm</text>
            <text x="60" y="87" fill="#c2410c" fontSize="10" fontFamily="sans-serif" fontWeight="semibold">Non-Slip Textured</text>

            <rect x="260" y="175" width="120" height="38" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
            <text x="320" y="191" fill="#0f172a" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Cabro Blocks: 60/80mm</text>
            <text x="320" y="205" fill="#0284c7" fontSize="9" fontFamily="monospace" textAnchor="middle">C35 - C45 Super Duty</text>
          </svg>
        </div>
      );

    case 'drains':
      return (
        <div className={`relative flex items-center justify-center bg-stone-100 overflow-hidden rounded-lg ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 p-3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="drainConcrete" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>

            {/* Half Round Channel Section Isometric */}
            <g transform="translate(60, 60)">
              {/* Outer Shell */}
              <path d="M 0,30 L 150,-10 L 150,0 Q 220,110 290,0 L 290,-10 L 140,30 Q 70,140 0,30 Z" fill="url(#drainConcrete)" stroke="#64748b" strokeWidth="1" />
              {/* Front Cross-Section Face */}
              <path d="M 0,30 C 0,110 140,110 140,30 L 125,30 C 125,95 15,95 15,30 Z" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
              {/* Water flow arrow */}
              <path d="M 70,75 L 190,40" stroke="#0284c7" strokeWidth="3" strokeDasharray="6 4" />
            </g>

            {/* Standard Road Kerb 125x250x1000mm adjacent */}
            <g transform="translate(280, 50)">
              {/* 3D Kerb Block with 45 degree top chamfer */}
              <polygon points="0,25 25,0 70,0 70,140 0,140" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
              <polygon points="70,0 90,-15 90,125 70,140" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
              <polygon points="25,0 45,-15 90,-15 70,0" fill="#e2e8f0" />
              <text x="35" y="75" fill="#0f172a" fontSize="10" fontFamily="monospace" fontWeight="bold" transform="rotate(-90 35,75)">KERB 125x250</text>
            </g>

            {/* Dimension Callouts */}
            <text x="80" y="195" fill="#0284c7" fontSize="11" fontFamily="monospace" fontWeight="bold">Half-Round 300 / 450mm</text>
            <text x="80" y="210" fill="#64748b" fontSize="10" fontFamily="sans-serif">Self-cleaning hydraulic invert</text>
            <text x="290" y="210" fill="#c2410c" fontSize="10" fontFamily="monospace" fontWeight="bold">1000mm Kerb</text>
          </svg>
        </div>
      );

    case 'custom':
      return (
        <div className={`relative flex items-center justify-center bg-stone-100 overflow-hidden rounded-lg ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 p-3" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Septic Tank / Well Ring Isometric Illustration */}
            <g transform="translate(140, 50)">
              {/* Outer Cylinder Wall */}
              <path d="M 0,50 L 0,130 A 100 40 0 0 0 200,130 L 200,50 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
              {/* Bottom Rim */}
              <ellipse cx="100" cy="130" rx="100" ry="40" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 3" />
              {/* Top Surface Lip (Interlocking Rim) */}
              <ellipse cx="100" cy="50" rx="100" ry="40" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Inner Hole */}
              <ellipse cx="100" cy="50" rx="84" ry="32" fill="#334155" stroke="#475569" strokeWidth="1" />
              <path d="M 16,50 A 84 32 0 0 0 184,50 L 184,130 A 84 32 0 0 1 16,130 Z" fill="#475569" />
            </g>

            {/* Matching Cover Slab floating on left */}
            <g transform="translate(30, 80)">
              <ellipse cx="50" cy="40" rx="45" ry="18" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
              <path d="M 5,40 L 5,50 A 45 18 0 0 0 95,50 L 95,40 Z" fill="#94a3b8" stroke="#64748b" />
              {/* Access Manhole Plug */}
              <ellipse cx="50" cy="40" rx="15" ry="6" fill="#334155" stroke="#ea580c" strokeWidth="1" />
              <text x="50" y="80" fill="#1e293b" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Heavy Cover Slab</text>
            </g>

            <text x="240" y="200" fill="#0284c7" fontSize="12" fontFamily="monospace" fontWeight="bold">1200mm Septic Rings</text>
            <text x="240" y="215" fill="#64748b" fontSize="10" fontFamily="sans-serif">Rapid Interlocking Soak Pits</text>
          </svg>
        </div>
      );

    case 'blocks':
    default:
      return (
        <div className={`relative flex items-center justify-center bg-stone-100 overflow-hidden rounded-lg ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full max-h-56 p-3" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Lintel Beam + 9" Solid Foundation Block */}
            <g transform="translate(40, 50)">
              {/* 1.5m Lintel Beam */}
              <polygon points="0,20 180,20 220,0 40,0" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
              <polygon points="180,20 220,0 220,40 180,60" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
              <polygon points="0,20 180,20 180,60 0,60" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
              <text x="80" y="45" fill="#0f172a" fontSize="10" fontFamily="monospace" fontWeight="bold">LINTEL BEAM 1.5M</text>
            </g>

            {/* 9" Solid Foundation Masonry Block */}
            <g transform="translate(180, 110)">
              <polygon points="0,30 110,30 150,0 40,0" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
              <polygon points="110,30 150,0 150,60 110,90" fill="#64748b" stroke="#475569" strokeWidth="1" />
              <polygon points="0,30 110,30 110,90 0,90" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
              <text x="50" y="65" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold">9" SOLID BLOCK</text>
            </g>

            <text x="50" y="200" fill="#0284c7" fontSize="11" fontFamily="monospace" fontWeight="bold">C20-C35 Dense Precast Units</text>
            <text x="50" y="215" fill="#64748b" fontSize="10" fontFamily="sans-serif">Zero on-site timber formwork</text>
          </svg>
        </div>
      );
  }
};
