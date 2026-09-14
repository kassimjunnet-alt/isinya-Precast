import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- CULVERTS ---
  {
    id: 'culvert-450',
    slug: 'reinforced-concrete-culvert-450mm',
    name: '450mm (18") Reinforced Road Culvert',
    category: 'culverts',
    tagline: 'Standard roadside access and residential farm driveway drainage',
    description: 'Vibrated, high-density reinforced precast concrete pipe designed for highway side drains, agricultural property access crossings, and medium storm water runoff. Features tongue & groove interlocking joints for leak-free culvert alignment.',
    basePriceKES: 3100,
    unit: '1.0m length',
    dimensions: 'Internal Dia: 450mm | Wall: 55mm | Length: 1000mm',
    weightKg: 210,
    concreteGrade: 'C30/37 (30 N/mm² at 28 days)',
    reinforcement: 'High-tensile B500B ribbed steel helical cage (6mm/8mm)',
    standard: 'KEBS KS 829-1:2018 Road Standard',
    popular: true,
    minOrder: 1,
    features: [
      'Engineered for light to medium vehicular axle loads',
      'Hydraulically smooth internal bore minimizing debris siltation',
      'Reinforced with welded steel helical cage and longitudinal rebar',
      'Water-cured for 21 days in controlled steam/submersion yard tanks',
      'Precision machined interlocking spigot & socket end profile'
    ],
    applications: [
      'Estate and home driveway access crossings',
      'Feeder roads & county access route drainages (KeRRA)',
      'Farm ditch conduits & agricultural irrigation canals',
      'Sub-surface perimeter storm drainage networks'
    ],
    specs: [
      { label: 'Internal Diameter', value: '450 mm (17.7 in)' },
      { label: 'External Diameter', value: '560 mm' },
      { label: 'Effective Length', value: '1,000 mm' },
      { label: 'Wall Thickness', value: '55 mm' },
      { label: 'Nominal Weight', value: '210 kg per piece' },
      { label: 'Concrete Strength', value: '30 N/mm² (Grade 30)' },
      { label: 'Joint Type', value: 'Interlocking Tongue & Groove' },
      { label: 'Load Rating', value: 'Class B / Road Crossing (15-tonne axle)' }
    ]
  },
  {
    id: 'culvert-600',
    slug: 'reinforced-concrete-culvert-600mm',
    name: '600mm (24") Heavy Duty Road Culvert',
    category: 'culverts',
    tagline: 'Highway standard road cross-culvert for KeNHA/KURA urban and trunk roads',
    description: 'Heavy-gauge reinforced concrete culvert pipe manufactured to KeNHA and KURA civil specifications. Built for heavy commercial vehicle traffic, trunk drainage lines, and highway river crossings.',
    basePriceKES: 4800,
    unit: '1.0m length',
    dimensions: 'Internal Dia: 600mm | Wall: 65mm | Length: 1000mm',
    weightKg: 340,
    concreteGrade: 'C30/37 (30 N/mm²)',
    reinforcement: 'Dual circumferential cage with 8mm ribbed high-tensile steel',
    standard: 'KEBS KS 829 Class C Highway Load',
    popular: true,
    minOrder: 1,
    features: [
      'Withstands high axle loads exceeding 25-tonne heavy commercial vehicles',
      'Hydrostatic pressure resistant with zero structural permeability',
      'Vibrated on high-frequency pneumatic casting tables',
      'Heavy chamfered lip prevents edge chipping during installation'
    ],
    applications: [
      'Main road crossings & trunk road civil contracts',
      'Commercial industrial park entrances with semi-trailer access',
      'Bridge approaches, embankment drains & river diversions',
      'Urban storm water collector networks'
    ],
    specs: [
      { label: 'Internal Diameter', value: '600 mm (23.6 in)' },
      { label: 'External Diameter', value: '730 mm' },
      { label: 'Effective Length', value: '1,000 mm' },
      { label: 'Wall Thickness', value: '65 mm' },
      { label: 'Nominal Weight', value: '340 kg per piece' },
      { label: 'Concrete Strength', value: '30 N/mm² (Grade 30)' },
      { label: 'Joint Type', value: 'Precision Spigot & Socket' },
      { label: 'Load Rating', value: 'Class C Heavy Highway (25-tonne axle)' }
    ]
  },
  {
    id: 'culvert-900',
    slug: 'reinforced-concrete-culvert-900mm',
    name: '900mm (36") Extra Heavy Trunk Culvert',
    category: 'culverts',
    tagline: 'High-volume storm water discharge and natural watercourse road conduits',
    description: 'Engineered for major drainage catchment basins, flood management channels, and severe hydrological runoff zones. High compressive strength with dual rebar cage.',
    basePriceKES: 9200,
    unit: '1.0m length',
    dimensions: 'Internal Dia: 900mm | Wall: 85mm | Length: 1000mm',
    weightKg: 650,
    concreteGrade: 'C35/45 (35 N/mm²)',
    reinforcement: 'Double welded rebar cage (10mm + 8mm high yield)',
    standard: 'KEBS KS 829 Class C Heavy Highway',
    features: [
      'High hydraulic flow capacity of over 1.8 m³/sec at standard gradient',
      'Crane-assisted lifting hook embedment loops available on request',
      'Resistance to corrosive soil sulfates and brackish water tables'
    ],
    applications: [
      'Major river diversions and storm water master lines',
      'KeNHA Class A International Trunk Corridors',
      'Railway embankment water tunnels & airport perimeter canals'
    ],
    specs: [
      { label: 'Internal Diameter', value: '900 mm (35.4 in)' },
      { label: 'External Diameter', value: '1,070 mm' },
      { label: 'Effective Length', value: '1,000 mm' },
      { label: 'Wall Thickness', value: '85 mm' },
      { label: 'Nominal Weight', value: '650 kg per piece' },
      { label: 'Concrete Strength', value: '35 N/mm² (Grade 35)' },
      { label: 'Joint Type', value: 'Self-Centering Spigot & Socket' },
      { label: 'Load Rating', value: 'Heavy Civil & Mining Route Rated' }
    ]
  },
  {
    id: 'culvert-1200',
    slug: 'reinforced-concrete-culvert-1200mm',
    name: '1200mm (48") Mega Civil Storm Culvert',
    category: 'culverts',
    tagline: 'Maximum discharge precast pipe for seasonal rivers and arterial highway bridges',
    description: 'Our largest standard diameter precast culvert, built for municipal civil drainage and natural stream crossings. Eliminates costly on-site box culvert formwork.',
    basePriceKES: 16800,
    unit: '1.0m length',
    dimensions: 'Internal Dia: 1200mm | Wall: 110mm | Length: 1000mm',
    weightKg: 1120,
    concreteGrade: 'C35/45 (35 N/mm²)',
    reinforcement: 'Heavy structural dual B500B steel cage (12mm + 10mm)',
    standard: 'KEBS KS 829-1 Class C',
    features: [
      'Eliminates weeks of in-situ box culvert timber shuttering',
      'Built-in internal lifting cast anchors for crane rigging',
      'Extreme crush-strength rating exceeding 65 kN/m'
    ],
    applications: [
      'Heavy civil infrastructure & highway stream bypasses',
      'Industrial wastewater containment trunk collectors',
      'Flood prevention infrastructure in low-lying riparian basins'
    ],
    specs: [
      { label: 'Internal Diameter', value: '1,200 mm (47.2 in)' },
      { label: 'External Diameter', value: '1,420 mm' },
      { label: 'Effective Length', value: '1,000 mm' },
      { label: 'Wall Thickness', value: '110 mm' },
      { label: 'Nominal Weight', value: '1,120 kg per piece' },
      { label: 'Concrete Strength', value: '35 N/mm²' },
      { label: 'Installation', value: 'Crane-assisted offload required' }
    ]
  },

  // --- FENCING POLES ---
  {
    id: 'pole-7ft-straight',
    slug: 'concrete-fencing-post-7ft-straight',
    name: '7ft Straight Concrete Fencing Post (4" x 4")',
    category: 'poles',
    tagline: 'Permanent perimeter fencing for farms, residential plots, and commercial paddocks',
    description: 'Termite-proof, rot-proof, and fire-resistant reinforced concrete fencing post. Pre-formed with 6 precise wire pass-through holes for tensioned chainlink, barbed wire, or game wire.',
    basePriceKES: 780,
    unit: 'piece',
    dimensions: '100mm x 100mm (4" x 4") x 2100mm (7ft)',
    weightKg: 46,
    concreteGrade: 'C25/30 (25 N/mm²)',
    reinforcement: '4 x 6mm high-tensile rebar with 4mm steel stirrup ties',
    standard: 'KEBS KS 02-106 Precast Fencing Posts',
    popular: true,
    minOrder: 10,
    features: [
      '100% impervious to termite attacks, wild fires, and soil moisture rot',
      'Pre-formed with 6 galvanized eyelet holes for easy wire tensioning',
      'Chamfered safety corners prevent livestock scratching cuts',
      'Life expectancy exceeds 50+ years with zero maintenance'
    ],
    applications: [
      'Residential boundary and farm perimeter fencing',
      'Commercial plots in Kajiado, Isinya, Kitengela & Machakos',
      'Solar farm & telecommunication mast security enclosures',
      'Pasture and cattle ranch fencing lines'
    ],
    specs: [
      { label: 'Cross Section', value: '100 mm x 100 mm (4" x 4")' },
      { label: 'Total Length', value: '2,130 mm (7.0 ft)' },
      { label: 'Embedment Depth', value: '600 mm (2 ft) recommended' },
      { label: 'Above Ground Height', value: '1,530 mm (5 ft)' },
      { label: 'Reinforcing Core', value: '4 x 6mm ribbed tensile wires' },
      { label: 'Weight', value: '46 kg per post' },
      { label: 'Hole Count', value: '6 pre-cast pass-through holes' }
    ]
  },
  {
    id: 'pole-8ft-straight',
    slug: 'concrete-fencing-post-8ft-straight',
    name: '8ft Straight Concrete Fencing Post (4" x 4")',
    category: 'poles',
    tagline: 'Taller perimeter security for 6-foot chainlink and security mesh installations',
    description: 'Extra tall reinforced concrete post allowing for 6ft clear fence height above ground. Fitted with 7 wire pass-through apertures and heavy steel cage.',
    basePriceKES: 920,
    unit: 'piece',
    dimensions: '100mm x 100mm (4" x 4") x 2440mm (8ft)',
    weightKg: 54,
    concreteGrade: 'C25/30 (25 N/mm²)',
    reinforcement: '4 x 6mm / 8mm high-tensile longitudinal rebars',
    standard: 'KEBS KS 02-106',
    popular: true,
    minOrder: 10,
    features: [
      'Accommodates full 1.8m (6ft) high chainlink rolls with bottom ground skirt',
      '7 pre-cast pass-through holes spaced at 250mm centers',
      'High cement-to-aggregate ratio for enhanced impact toughness'
    ],
    applications: [
      'High-security residential compound perimeters',
      'School, church, and institution boundary security',
      'Factory & warehouse security perimeters',
      'Airport buffer zones and highway reserve demarcation'
    ],
    specs: [
      { label: 'Cross Section', value: '100 mm x 100 mm (4" x 4")' },
      { label: 'Total Length', value: '2,440 mm (8.0 ft)' },
      { label: 'Embedment Depth', value: '600 mm - 750 mm (2 - 2.5 ft)' },
      { label: 'Clear Height', value: '1,830 mm (6 ft)' },
      { label: 'Weight', value: '54 kg' },
      { label: 'Hole Count', value: '7 pre-formed holes' }
    ]
  },
  {
    id: 'pole-8.5ft-cranked',
    slug: 'concrete-fencing-post-8.5ft-cranked',
    name: '8.5ft Cranked Concrete Security Post',
    category: 'poles',
    tagline: 'High-security post with 45° overhang for razor wire and concertina coils',
    description: 'Heavy duty security fencing post featuring an angled 450mm (1.5ft) cranked arm at the top. Designed to carry 3-4 strands of high-tensile barbed wire plus razor wire coils for anti-intrusion security.',
    basePriceKES: 1250,
    unit: 'piece',
    dimensions: '100x100mm base x 2600mm total length (with 45° crank)',
    weightKg: 62,
    concreteGrade: 'C30/37 (30 N/mm²)',
    reinforcement: '4 x 8mm structural rebar continuous into cranked arm',
    standard: 'KEBS KS 02-106 High Security Grade',
    popular: true,
    minOrder: 5,
    features: [
      'Integrated 45° overhang arm prevents intruder climbing leverage',
      'Cranked head includes 3 top wire notches + coil tie wire clips',
      'Reinforcement bent continuously into the arm to eliminate junction fracture',
      'Immune to cut-and-burn attacks unlike metal angle lines'
    ],
    applications: [
      'Commercial logistics yards, factories, and bonded warehouses',
      'Government facilities, substations, and water treatment reservoirs',
      'Gated residential communities and embassies',
      'Agricultural facilities requiring anti-theft security'
    ],
    specs: [
      { label: 'Base Length', value: '2,150 mm (7 ft straight)' },
      { label: 'Overhang Arm', value: '450 mm at 45° incline' },
      { label: 'Cross Section', value: '100 mm x 100 mm' },
      { label: 'Total Weight', value: '62 kg per post' },
      { label: 'Security Provision', value: 'Accepts concertina razor wire & 3 barbed strands' }
    ]
  },
  {
    id: 'pole-corner-strut',
    slug: 'concrete-corner-straining-strut',
    name: '8ft Corner Straining Post & Support Strut Kit',
    category: 'poles',
    tagline: 'Heavy corner anchor and diagonal bracing post for high wire tensioning',
    description: 'Extra-reinforced 5"x5" square straining post coupled with a 4"x4" diagonal support strut. Prevents perimeter fence sag at corner and gate change-of-direction points.',
    basePriceKES: 1650,
    unit: 'set (post + strut)',
    dimensions: 'Corner: 125x125x2400mm | Strut: 100x100x2100mm',
    weightKg: 95,
    concreteGrade: 'C30/37',
    reinforcement: '4 x 10mm high yield rebar in straining post',
    standard: 'KEBS KS 02-106',
    features: [
      'Includes interlocking notch for snug diagonal strut placement',
      'Rated for heavy chainlink winch tensioning',
      'Prevents fence collapse at gates and 90-degree corners'
    ],
    applications: [
      'Every corner junction, end gate post, and 50m straining interval',
      'Heavy game-fence and electric fence foundation posts'
    ],
    specs: [
      { label: 'Straining Post', value: '125 mm x 125 mm x 2,400 mm' },
      { label: 'Support Strut', value: '100 mm x 100 mm x 2,100 mm' },
      { label: 'Weight (Set)', value: '95 kg' },
      { label: 'Rebar Core', value: '4 x 10mm High-Yield Deformed Steel' }
    ]
  },

  // --- PAVING SLABS & CABRO ---
  {
    id: 'slab-500',
    slug: 'precast-concrete-paving-slab-500x500',
    name: '500x500x50mm Heavy Duty Paving Slab',
    category: 'slabs',
    tagline: 'Non-slip textured surface slabs for pedestrian walkways, patios, and estate paths',
    description: 'High-density hydraulic pressed paving slabs manufactured with crushed granite aggregate and textured non-slip diamond/checkerboard finish. Quick to lay, durable, and clean.',
    basePriceKES: 340,
    unit: 'piece (4 pcs = 1 m²)',
    dimensions: '500mm x 500mm x 50mm thick',
    weightKg: 28,
    concreteGrade: 'C30/37 (30 N/mm²)',
    reinforcement: 'High modulus micro-polypropylene crack-control fibers',
    standard: 'KEBS KS 02-105 Precast Concrete Paving Slabs',
    popular: true,
    minOrder: 20,
    features: [
      'Non-skid safety surface texture for all-weather wet slip resistance',
      'Uniform 50mm thickness enables rapid laser-level laying',
      'Resistant to thermal cracking under intense African sunshine',
      'Easily lifted for under-pavement pipe or cable maintenance'
    ],
    applications: [
      'Walkways, verandahs, and compound walkways',
      'Swimming pool surrounds, church compounds, and school plazas',
      'Rooftop terrace paving and garden stepping stones',
      'Public pedestrian sidewalks and retail shopping plazas'
    ],
    specs: [
      { label: 'Dimensions', value: '500 mm x 500 mm' },
      { label: 'Thickness', value: '50 mm' },
      { label: 'Coverage', value: '4 slabs per 1.0 m²' },
      { label: 'Weight per Slab', value: '28 kg (112 kg/m²)' },
      { label: 'Compressive Strength', value: '30 N/mm²' },
      { label: 'Surface Finish', value: 'Diamond textured / Smooth chamfered' }
    ]
  },
  {
    id: 'slab-600',
    slug: 'precast-concrete-paving-slab-600x600',
    name: '600x600x50mm Architectural Paving Slab',
    category: 'slabs',
    tagline: 'Large-format clean aesthetic slabs for commercial courtyards and open plazas',
    description: 'Large-format precast concrete flagstones creating fewer joints and a seamless modern architectural appearance. Ideal for expansive outdoor landscape areas.',
    basePriceKES: 490,
    unit: 'piece (2.78 pcs = 1 m²)',
    dimensions: '600mm x 600mm x 50mm thick',
    weightKg: 40,
    concreteGrade: 'C30/37',
    reinforcement: 'Synthetic fiber matrix reinforcement',
    standard: 'KEBS KS 02-105',
    features: [
      'Modern minimalist large-format visual design',
      'Precision bevelled edges preventing edge spalling',
      'Low porosity aggregate mix resistant to moss and oil stains'
    ],
    applications: [
      'Corporate office forecourts, hotels, and luxury safari lodges',
      'Civic squares, town halls, and hospital pedestrian grounds',
      'Private residential garden courtyards'
    ],
    specs: [
      { label: 'Dimensions', value: '600 mm x 600 mm' },
      { label: 'Thickness', value: '50 mm' },
      { label: 'Coverage', value: '2.78 slabs per m²' },
      { label: 'Weight', value: '40 kg per piece' },
      { label: 'Flexural Strength', value: '> 4.5 MPa' }
    ]
  },
  {
    id: 'cabro-60mm',
    slug: 'interlocking-paving-blocks-cabro-60mm',
    name: '60mm Heavy Duty Interlocking Pavers (Cabro)',
    category: 'slabs',
    tagline: 'Domestic driveways, residential estate roads, and car parking lots',
    description: 'Machine-vibrated interlocking concrete pavers (Uni-block and Tri-hex shapes) capable of carrying personal cars, SUVs, delivery vans, and light service vehicles without rutting.',
    basePriceKES: 980,
    unit: 'm² (approx. 40 pcs/m²)',
    dimensions: '200x100x60mm (Rectangular) or 60mm Zig-zag',
    weightKg: 135,
    concreteGrade: 'C35 (35 N/mm²)',
    reinforcement: 'Hydraulically compacted zero-slump dense mix',
    standard: 'KEBS KS 02-827 Concrete Paving Blocks',
    popular: true,
    minOrder: 50,
    features: [
      'Interlocking geometric profile distributes point axle loads laterally',
      'Colors available: Natural Concrete Grey, Brick Red, Charcoal Black',
      'Permits rainwater seepage between fine-sand joints',
      'Easy modular repairs: individual blocks can be replaced seamlessly'
    ],
    applications: [
      'Residential driveways, garage aprons, and perimeter parking',
      'Residential gated estate internal lanes',
      'Church, mosque, and commercial retail parking bays'
    ],
    specs: [
      { label: 'Thickness', value: '60 mm' },
      { label: 'Compressive Strength', value: '35 N/mm²' },
      { label: 'Blocks per m²', value: '40 to 50 pcs (depending on shape)' },
      { label: 'Vehicle Rating', value: 'Cars, SUVs, Light trucks up to 10T' }
    ]
  },
  {
    id: 'cabro-80mm',
    slug: 'industrial-interlocking-paving-blocks-80mm',
    name: '80mm Industrial Interlocking Pavers (Cabro)',
    category: 'slabs',
    tagline: 'Extreme-duty commercial road blocks for fuel stations, container yards, and truck depots',
    description: 'High-density 80mm industrial paving blocks engineered to withstand turning loads of 40-tonne articulated trucks, container reach-stackers, and fuel tankers with zero block displacement.',
    basePriceKES: 1250,
    unit: 'm² (approx. 40 pcs/m²)',
    dimensions: '200x100x80mm or 80mm Interlocking Uni-paver',
    weightKg: 180,
    concreteGrade: 'C40/50 (45 N/mm²)',
    reinforcement: 'Heavy industrial pneumatic press compaction',
    standard: 'KEBS KS 02-827 Industrial Heavy Axle Rating',
    minOrder: 50,
    features: [
      'Rated for axle weights exceeding 45 tonnes',
      'High resistance to diesel, motor oil, and hydraulic fluid penetration',
      'Enhanced abrasive resistance for heavy steering torque'
    ],
    applications: [
      'Petrol filling station forecourts and tanker offload bays',
      'Inland container terminals & logistics warehouses (Athi River / Mombasa Rd)',
      'Heavy industrial manufacturing yards and grain silo terminals'
    ],
    specs: [
      { label: 'Thickness', value: '80 mm' },
      { label: 'Compressive Strength', value: '45 N/mm² minimum' },
      { label: 'Weight per m²', value: '180 kg/m²' },
      { label: 'Traffic Category', value: 'Super-Heavy Highway / Container Yard' }
    ]
  },

  // --- DRAINAGE & KERBS ---
  {
    id: 'drain-half-round-300',
    slug: 'half-round-concrete-drain-300mm',
    name: '300mm (12") Half-Round Drainage Channel',
    category: 'drains',
    tagline: 'Self-cleaning open storm runoff channel for estate roads and plot verges',
    description: 'Precast semicircular concrete drain section delivering optimal hydraulic flow radius. Effectively channels surface rainwater runoff away from building foundations and road shoulders.',
    basePriceKES: 680,
    unit: '1.0m section',
    dimensions: 'Width: 300mm | Depth: 150mm | Length: 1000mm',
    weightKg: 38,
    concreteGrade: 'C25/30',
    reinforcement: 'Woven steel wire mesh reinforcement',
    standard: 'KEBS KS 02-106 Precast Drainage Units',
    popular: true,
    minOrder: 5,
    features: [
      'Semicircular invert ensures high velocity runoff even at shallow slope',
      'Prevents soil scour and perimeter foundation erosion',
      'Smooth inner casting reduces weed growth and silt build-up'
    ],
    applications: [
      'Roadside surface drains in residential estates',
      'Rainwater drainage around commercial building perimeters',
      'Terrace retaining wall drainage canals'
    ],
    specs: [
      { label: 'Channel Width', value: '300 mm' },
      { label: 'Invert Depth', value: '150 mm' },
      { label: 'Length', value: '1,000 mm' },
      { label: 'Weight', value: '38 kg' }
    ]
  },
  {
    id: 'drain-half-round-450',
    slug: 'half-round-concrete-drain-450mm',
    name: '450mm (18") Half-Round Drainage Channel',
    category: 'drains',
    tagline: 'High-capacity open side drain for sloping terrain and storm runoff',
    description: 'Wider half-round profile for large acreage surface stormwater collection, road runoff interception, and agricultural soil conservation projects in Kajiado County.',
    basePriceKES: 1050,
    unit: '1.0m section',
    dimensions: 'Width: 450mm | Depth: 225mm | Length: 1000mm',
    weightKg: 58,
    concreteGrade: 'C25/30',
    reinforcement: 'Ribbed steel mesh structural matrix',
    standard: 'KEBS KS 02-106',
    minOrder: 5,
    features: [
      'Carries more than double the volume of 300mm channels',
      'Sturdy precast walls prevent earth bank slip during heavy downpours',
      'Simple interlocking overlapping lip joints'
    ],
    applications: [
      'Steep sloping terrain drainages & erosion-prone hillside roads',
      'Agricultural rainwater diversion lines',
      'Main estate collector drains'
    ],
    specs: [
      { label: 'Channel Width', value: '450 mm' },
      { label: 'Invert Depth', value: '225 mm' },
      { label: 'Length', value: '1,000 mm' },
      { label: 'Weight', value: '58 kg' }
    ]
  },
  {
    id: 'drain-i-drain-600',
    slug: 'precast-shallow-invert-i-drain',
    name: '600x300mm Shallow Invert Drain (I-Drain)',
    category: 'drains',
    tagline: 'Pedestrian-friendly trapezoidal drain for urban commercial roadsides',
    description: 'Shallow inverted trapezoidal concrete drainage channel. Can be crossed safely by pedestrians and vehicles with low profile kerb edges, often covered with precast drainage slabs.',
    basePriceKES: 1350,
    unit: '1.0m section',
    dimensions: 'Top: 600mm | Base: 300mm | Depth: 200mm | Length: 1000mm',
    weightKg: 78,
    concreteGrade: 'C30/37',
    reinforcement: '6mm high-tensile structural grid',
    standard: 'KeNHA Urban Drain Specification',
    features: [
      'Low vertical depth ideal for areas with rock outcrops or shallow bedrock',
      'Compatible with our precast perforated drain cover slabs',
      'Easy manual shovel cleaning access'
    ],
    applications: [
      'Urban streetscapes, town centers, and shopping strips',
      'Driveway perimeter drainage where deep trenches are hazard',
      'Car wash drainage trenches and vehicle workshops'
    ],
    specs: [
      { label: 'Top Width', value: '600 mm' },
      { label: 'Base Width', value: '300 mm' },
      { label: 'Depth', value: '200 mm' },
      { label: 'Length', value: '1,000 mm' },
      { label: 'Weight', value: '78 kg' }
    ]
  },
  {
    id: 'kerb-125-250',
    slug: 'road-kerb-125x250x1000mm',
    name: 'Road Kerb 125x250x1000mm (Standard Road Kerb)',
    category: 'drains',
    tagline: 'Standard road edge restraint and carriageway border demarcation',
    description: 'Heavy duty road kerb with standard 45-degree chamfer. Restrains cabro paving edges, demarcates pedestrian footpaths from vehicular lanes, and directs stormwater into side drains.',
    basePriceKES: 880,
    unit: 'piece (1.0m)',
    dimensions: 'Width: 125mm | Height: 250mm | Length: 1000mm',
    weightKg: 72,
    concreteGrade: 'C30/37',
    reinforcement: 'Dense unreinforced / fiber-reinforced high-compaction concrete',
    standard: 'KEBS KS 02-107 Precast Concrete Kerbs',
    popular: true,
    minOrder: 10,
    features: [
      '45-degree top chamfer prevents vehicle tire damage',
      'Essential boundary restraint for all interlocking paver installations',
      'Precision cast for straight, gap-free curb lines'
    ],
    applications: [
      'Highway and urban street carriageway margins',
      'Roundabouts, traffic islands, and road medians',
      'Cabro driveway perimeter containment'
    ],
    specs: [
      { label: 'Width', value: '125 mm' },
      { label: 'Height', value: '250 mm' },
      { label: 'Length', value: '1,000 mm' },
      { label: 'Weight', value: '72 kg' },
      { label: 'Profile', value: 'Standard 45° Chamfered Face' }
    ]
  },

  // --- PRECAST CONSTRUCTION ELEMENTS & BLOCKS ---
  {
    id: 'septic-ring-1200',
    slug: 'precast-septic-tank-manhole-ring-1200mm',
    name: '1200mm (4ft) Precast Septic Tank / Well Ring',
    category: 'custom',
    tagline: 'Interlocking concrete rings for rapid septic tanks, soak pits, and water wells',
    description: 'Heavy-duty precast cylindrical concrete rings that drop down into excavated pits to create instant, permanent septic tanks, cesspools, borehole caissons, and stormwater soakaway pits without masonry work.',
    basePriceKES: 4600,
    unit: 'ring (0.6m height)',
    dimensions: 'Internal Dia: 1200mm (4ft) | Height: 600mm | Wall: 75mm',
    weightKg: 290,
    concreteGrade: 'C30/37 Impermeable Mix',
    reinforcement: 'Welded steel mesh cage with stepped interlocking joint',
    standard: 'KEBS KS 02-106 Sanitary Precast Units',
    popular: true,
    minOrder: 2,
    features: [
      'Saves 70% of construction time compared to quarry stone septic building',
      'Stepped tongue & groove interlocking lip seals securely with mortar',
      'Also available perforated / weep-hole style for soakaway infiltration pits',
      'Heavy-duty matching concrete top cover slabs available'
    ],
    applications: [
      'Residential and commercial bio-digestor and septic tanks',
      'Rainwater collection wells, caissons & borehole heads',
      'Percolation soakaway pits in Kajiado, Kitengela & Machakos',
      'Municipal storm manhole inspection shafts'
    ],
    specs: [
      { label: 'Internal Diameter', value: '1,200 mm (4.0 ft)' },
      { label: 'Ring Height', value: '600 mm (2.0 ft)' },
      { label: 'Wall Thickness', value: '75 mm' },
      { label: 'Weight', value: '290 kg per ring' },
      { label: 'Reinforcement', value: 'B500B Steel Mesh Cage' }
    ]
  },
  {
    id: 'septic-cover-slab-1200',
    slug: 'heavy-duty-septic-cover-slab-1200mm',
    name: '1200mm Heavy Duty Septic Tank Cover Slab',
    category: 'custom',
    tagline: 'Reinforced concrete circular lid with inspection access opening',
    description: 'Reinforced capping slab designed to sit securely on top of 1200mm septic rings. Features a central 450mm opening with fitted concrete plug for suction tanker pump-out access.',
    basePriceKES: 3800,
    unit: 'piece',
    dimensions: 'Outer Dia: 1380mm | Thickness: 100mm with 450mm access plug',
    weightKg: 280,
    concreteGrade: 'C30/37',
    reinforcement: 'Dual grid 10mm high-tensile rebar',
    standard: 'KEBS Sanitary Load Rating',
    features: [
      'Rated for pedestrian and light garden vehicle load',
      'Fitted with recessed galvanized lifting handles',
      'Hermetically seated inspection plug prevents foul odor escape'
    ],
    applications: [
      'Septic tank top cover and inspection manhole cap',
      'Shallow well and borehole protective child-proof lid'
    ],
    specs: [
      { label: 'Diameter', value: '1,380 mm' },
      { label: 'Thickness', value: '100 mm' },
      { label: 'Weight', value: '280 kg' },
      { label: 'Access Hole', value: '450 mm diameter with cast plug' }
    ]
  },
  {
    id: 'lintel-beam-1500',
    slug: 'precast-concrete-lintel-beam-1500mm',
    name: '1.5m Reinforced Precast Window/Door Lintel',
    category: 'blocks',
    tagline: 'Load-bearing lintel beam for door and window openings, ready to install',
    description: 'Precast prestressed concrete lintel beam providing immediate structural bridge over masonry window and door spans. Cured in factory conditions to prevent sagging and eliminate on-site shuttering.',
    basePriceKES: 1350,
    unit: 'piece (1.5m length)',
    dimensions: '150mm x 200mm x 1500mm length',
    weightKg: 105,
    concreteGrade: 'C35/45 (35 N/mm²)',
    reinforcement: '4 x 10mm deformed high yield steel with 6mm stirrups',
    standard: 'Structural Building Code BS 8110 / KS 02-106',
    minOrder: 2,
    features: [
      'Immediate masonry loading with zero drying downtime',
      'Zero formwork, props, or timber waste on building site',
      'Uniform dimensions match standard 6" or 9" stone masonry courses'
    ],
    applications: [
      'Door and window structural spanning in residential and commercial blocks',
      'Verandah and balcony post lintels'
    ],
    specs: [
      { label: 'Span Length', value: '1,500 mm (Clear span up to 1,200mm)' },
      { label: 'Cross Section', value: '150 mm x 200 mm' },
      { label: 'Weight', value: '105 kg' },
      { label: 'Rebar Core', value: '4 x Y10 high tensile' }
    ]
  },
  {
    id: 'block-solid-9inch',
    slug: 'precast-solid-concrete-foundation-blocks-9inch',
    name: '9" Heavy Duty Solid Concrete Foundation Blocks',
    category: 'blocks',
    tagline: 'High-strength foundation and perimeter walling blocks',
    description: 'Machine-molded dense concrete masonry units engineered for substructure foundations, damp-proof base courses, and retaining wall structures in black cotton soil zones.',
    basePriceKES: 145,
    unit: 'piece (390 x 190 x 190mm)',
    dimensions: '390mm x 190mm x 190mm (Standard 9-inch)',
    weightKg: 24,
    concreteGrade: 'C20 (20 N/mm²)',
    reinforcement: 'Vibro-compacted dense aggregate mix',
    standard: 'KEBS KS 02-95 Concrete Walling Blocks',
    minOrder: 100,
    features: [
      'Superior compressive strength compared to quarry natural stones',
      'Precise right-angled edges reduce mortar plastering thickness by 40%',
      'High resistance to moisture absorption in wet ground conditions'
    ],
    applications: [
      'Foundations below ground level in Kajiado black cotton soils',
      'Perimeter boundary walls and commercial godowns',
      'Load-bearing multi-story columns and retaining piers'
    ],
    specs: [
      { label: 'Dimensions', value: '390 mm x 190 mm x 190 mm (9")' },
      { label: 'Unit Weight', value: '24 kg' },
      { label: 'Compressive Strength', value: '7.5 - 10.0 MPa (Walling Grade)' },
      { label: 'Fire Rating', value: '4 hours continuous' }
    ]
  }
];
