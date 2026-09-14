import culvertImg from '../assets/images/culvert_installation_1789406561129.jpg';
import housingImg from '../assets/images/housing_precast_fence_1789406578135.jpg';
import pavingImg from '../assets/images/commercial_cabro_paving_1789406591953.jpg';
import drainageImg from '../assets/images/highway_drainage_project_1789406605753.jpg';
import yardImg from '../assets/images/hero_precast_yard_1789404582389.jpg';

export type ProjectCategory = 'all' | 'culverts' | 'housing' | 'paving' | 'drainage';

export interface ProjectStat {
  label: string;
  value: string;
}

export interface CompletedProject {
  id: string;
  title: string;
  category: 'culverts' | 'housing' | 'paving' | 'drainage';
  categoryLabel: string;
  client: string;
  clientType: 'Civil Contractor' | 'Estate Developer' | 'Commercial Developer' | 'Municipal / County';
  location: string;
  completionDate: string;
  imageUrl: string;
  importedImage: string;
  scopeSummary: string;
  productsSupplied: string[];
  specsSummary: string;
  stats: ProjectStat[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string; count?: number }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'culverts', label: 'Culvert Installations' },
  { id: 'housing', label: 'Housing & Fencing' },
  { id: 'paving', label: 'Commercial Paving & Cabro' },
  { id: 'drainage', label: 'Civil Drainage Infrastructure' }
];

export const COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: 'namanga-corridor-culverts',
    title: 'A104 Namanga Corridor Highway Cross-Drainage',
    category: 'culverts',
    categoryLabel: 'Culvert Installations',
    client: 'Kenya Highway Civil Subcontractor',
    clientType: 'Civil Contractor',
    location: 'Namanga Road (A104), Isinya - Kajiado',
    completionDate: 'November 2025',
    imageUrl: '/projects/culvert_installation.jpg',
    importedImage: culvertImg,
    scopeSummary: 'Rapid-supply and precision crane placement of 180 meters of heavy-duty precast concrete culvert pipes across four major storm-water crossings to prevent seasonal roadway flooding.',
    productsSupplied: [
      '900mm Spigot & Socket Culvert Pipes (120 pcs)',
      '1200mm Heavy-Duty Ogee Culverts (60 pcs)',
      'Precast Concrete Wingwalls & Headwalls (8 sets)'
    ],
    specsSummary: 'KEBS KS 02-30 certified, Class C30 vibrated concrete, reinforced with B500 high-yield steel cages.',
    stats: [
      { label: 'Culvert Length', value: '180 Metres' },
      { label: 'Offloading', value: 'Crane Truck Included' },
      { label: 'Batch Curing', value: '28-Day Tank Cured' },
      { label: 'Dispatch', value: 'Same-Week Delivery' }
    ],
    testimonial: {
      quote: 'Isinya Precast supplied high-strength 900mm culverts right to the trench edge along Namanga Road. Zero breakage during crane lowering and immediate compaction approval by the resident road engineer.',
      author: 'Eng. Dennis Mwangi',
      role: 'Project Site Manager, Lead Civil Works'
    }
  },
  {
    id: 'isinya-ridge-housing-estate',
    title: 'Enkasiti Ridge Master-Planned Residential Estate',
    category: 'housing',
    categoryLabel: 'Housing & Fencing',
    client: 'Ridge Horizon Property Developers Ltd',
    clientType: 'Estate Developer',
    location: 'Enkasiti Plains, Isinya Sub-County',
    completionDate: 'January 2026',
    imageUrl: '/projects/housing_precast_fence.jpg',
    importedImage: housingImg,
    scopeSummary: 'Complete perimeter security boundary fencing and internal access road infrastructure for a 50-acre gated residential community overlooking the Ngong Hills.',
    productsSupplied: [
      '8ft Cranked Precast Fencing Posts (1,450 pcs)',
      '10ft Heavy Gate Straining Pillars (48 pcs)',
      '600mm Access Road Culverts for Estate Gates (24 pcs)'
    ],
    specsSummary: 'Class C25/30 dense mix with water-repellent admixtures, pre-cast holes for 8-strand high-tensile wire and razor wire brackets.',
    stats: [
      { label: 'Perimeter Length', value: '2.8 Kilometres' },
      { label: 'Posts Installed', value: '1,450 Units' },
      { label: 'Crush Strength', value: '28 MPa Tested' },
      { label: 'Turnaround', value: 'Phase Delivery in 14 Days' }
    ],
    testimonial: {
      quote: 'The 8ft cranked concrete posts have a smooth architectural finish that elevated our estate branding. The alignment was straight as an arrow with virtually zero wastage.',
      author: 'Arch. Florence Wanjiku',
      role: 'Lead Architect, Ridge Horizon Estates'
    }
  },
  {
    id: 'athi-river-logistics-plaza',
    title: 'Athi River Industrial Logistics Hub & Parking Forecourt',
    category: 'paving',
    categoryLabel: 'Commercial Paving & Cabro',
    client: 'Savannah Intermodal Logistics Ltd',
    clientType: 'Commercial Developer',
    location: 'Athi River EPZ Corridor, Machakos Border',
    completionDate: 'February 2026',
    imageUrl: '/projects/commercial_cabro_paving.jpg',
    importedImage: pavingImg,
    scopeSummary: 'Heavy-duty 80mm interlocking cabro block paving and extruded concrete kerbing for a high-traffic container terminal and articulated truck parking yard.',
    productsSupplied: [
      '80mm Heavy-Duty Interlocking Cabro Blocks (8,500 m²)',
      'Standard Road Kerbs 125x250x1000mm (1,200 pcs)',
      'Precast Concrete Shallow Invert Drains (450 pcs)'
    ],
    specsSummary: 'Class C35 high-load bearing concrete rated for 40-tonne axle container chassis loads and resistant to petroleum oil seepage.',
    stats: [
      { label: 'Paved Area', value: '8,500 m²' },
      { label: 'Block Thickness', value: '80mm Heavy-Duty' },
      { label: 'Axle Load Rating', value: '45+ Metric Tonnes' },
      { label: 'Supply Speed', value: 'Daily Batches on Schedule' }
    ],
    testimonial: {
      quote: 'Heavy 40-foot container trucks operate 24/7 on this forecourt. The 80mm cabro blocks have held up flawlessly with no rutting or surface chipping.',
      author: 'Kelvin Odhiambo',
      role: 'Director of Operations, Savannah Hub'
    }
  },
  {
    id: 'kitengela-bypass-storm-drainage',
    title: 'Kitengela - Kajiado Urban Storm Water Drainage Upgrade',
    category: 'drainage',
    categoryLabel: 'Civil Drainage Infrastructure',
    client: 'County Urban Infrastructure Contractor',
    clientType: 'Municipal / County',
    location: 'Kitengela Township & Link Bypass, Kajiado County',
    completionDate: 'October 2025',
    imageUrl: '/projects/highway_drainage_project.jpg',
    importedImage: drainageImg,
    scopeSummary: 'Installation of high-capacity open and covered precast storm water drainage channels along urban commercial road shoulders to mitigate flash flooding.',
    productsSupplied: [
      '600mm Precast Half-Round Invert Drains (1,600 pcs)',
      'Reinforced Heavy-Duty Drain Slabs 600x600x75mm (800 pcs)',
      '600mm Road Crossing Culverts (75 pcs)'
    ],
    specsSummary: 'Hydraulically smooth inner finish for high water velocity discharge, self-cleaning gradient profiles, C30 grade concrete.',
    stats: [
      { label: 'Channel Distance', value: '1.6 Kilometres' },
      { label: 'Drain Inverts', value: '1,600 Units' },
      { label: 'Hydraulic Flow', value: 'Rapid Runoff Discharged' },
      { label: 'Inspection Clearance', value: 'Passed County Audit' }
    ],
    testimonial: {
      quote: 'The half-round drains provided a clean, uniform gradient along the pedestrian walkway. We halved our cast in-situ timeline by opting for factory-cured precast units.',
      author: 'Patrick Njoroge',
      role: 'Site Civil Engineer'
    }
  },
  {
    id: 'kitengela-ranch-perimeter',
    title: 'Konza Plains 100-Acre Agricultural & Commercial Ranch Fencing',
    category: 'housing',
    categoryLabel: 'Housing & Fencing',
    client: 'Konza Agri-Holdings Ltd',
    clientType: 'Commercial Developer',
    location: 'Konza Techno City Buffer Zone, Kajiado County',
    completionDate: 'December 2025',
    imageUrl: '/projects/housing_precast_fence.jpg',
    importedImage: housingImg,
    scopeSummary: 'Rugged terrain perimeter boundary security installation using high-tensile reinforced 7ft and 8ft concrete posts to secure livestock paddocks and commercial boundary lines.',
    productsSupplied: [
      '7ft Heavy Straight Fencing Posts (2,800 pcs)',
      'Strut & Corner Support Posts (240 pcs)',
      '450mm Field Entrance Pipe Culverts (16 pcs)'
    ],
    specsSummary: 'Resistant to termite attacks, zero rot compared to timber, prestressed rebar reinforcement, high drought durability.',
    stats: [
      { label: 'Fenced Perimeter', value: '4.2 Kilometres' },
      { label: 'Posts Delivered', value: '2,800 Units' },
      { label: 'Durability', value: '50+ Year Life Expectancy' },
      { label: 'Haulage', value: 'Self-Offloading Flatbeds' }
    ]
  },
  {
    id: 'isinya-town-culvert-bridge',
    title: 'Isinya Quarry Access Road Multi-Cell Box & Pipe Culverts',
    category: 'culverts',
    categoryLabel: 'Culvert Installations',
    client: 'Building Aggregates Transporters Association',
    clientType: 'Civil Contractor',
    location: 'Isinya Quarry Belt, Off Namanga Highway',
    completionDate: 'August 2025',
    imageUrl: '/projects/culvert_installation.jpg',
    importedImage: culvertImg,
    scopeSummary: 'Heavy twin-line 1200mm culvert bridge installation designed to support continuous 60-tonne tipper trucks carrying quarry stones and river sand across seasonal dry riverbeds (lagas).',
    productsSupplied: [
      '1200mm Heavy-Duty Concrete Culverts (48 pcs)',
      'Precast Wingwall Panels & Aprons (4 sets)',
      'Bedding Concrete & Joint Mortar Packs'
    ],
    specsSummary: 'Class C35 high-compressive strength concrete, double welded cage reinforcement, tested for extreme dynamic axle pounding.',
    stats: [
      { label: 'Max Vehicle Weight', value: '60 Tonnes Daily' },
      { label: 'Pipe Diameter', value: '1,200mm (4ft)' },
      { label: 'Flooding Resistance', value: '100-Year Storm Design' },
      { label: 'Delivery', value: '24-Hour Express Logistics' }
    ]
  }
];
