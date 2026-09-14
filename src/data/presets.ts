export interface ProjectPreset {
  id: string;
  title: string;
  tagline: string;
  category: 'culvert' | 'fence' | 'paving' | 'drain';
  badge: string;
  description: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export const PROJECT_PRESETS: ProjectPreset[] = [
  {
    id: 'standard-gate-culvert',
    title: 'Standard Gate Entrance Culvert',
    tagline: 'Ideal for 4m - 6m farm or home gateway crossing over roadside ditch',
    category: 'culvert',
    badge: 'Most Popular for Plot Owners',
    description: '6 meters of 600mm heavy road culvert with 2 matching precast headwalls to prevent roadside erosion.',
    items: [
      { productId: 'culvert-600', quantity: 6 },
      { productId: 'drain-headwall-600', quantity: 2 }
    ]
  },
  {
    id: 'commercial-truck-culvert',
    title: 'Commercial Heavy Truck Entrance',
    tagline: 'Engineered for industrial yards, godowns, and heavy tipper access',
    category: 'culvert',
    badge: 'Heavy Industrial / 25T Axle',
    description: '8 meters of 900mm Class C high-volume storm culverts with twin heavy headwalls.',
    items: [
      { productId: 'culvert-900', quantity: 8 },
      { productId: 'drain-headwall-600', quantity: 2 }
    ]
  },
  {
    id: 'one-acre-security-fence',
    title: '1-Acre Perimeter Security Fence',
    tagline: 'Full boundary fencing bundle for standard 260m perimeter',
    category: 'fence',
    badge: 'Farm & Plot Security',
    description: '120 reinforced 7ft concrete posts (spaced 2m - 2.5m) plus 8 diagonal corner support struts.',
    items: [
      { productId: 'pole-7ft-straight', quantity: 120 },
      { productId: 'pole-corner-strut', quantity: 8 }
    ]
  },
  {
    id: 'anti-intrusion-cranked-fence',
    title: 'High-Security Cranked Razor Fence',
    tagline: 'Equipped for razor wire overhang on 1-acre commercial site',
    category: 'fence',
    badge: 'Anti-Climb 45° Arm',
    description: '110 cranked 8.5ft concrete posts with 8 heavy corner straining assemblies.',
    items: [
      { productId: 'pole-8.5ft-cranked', quantity: 110 },
      { productId: 'pole-corner-strut', quantity: 8 }
    ]
  },
  {
    id: 'residential-driveway-cabro',
    title: 'Residential Driveway Cabro Paving',
    tagline: 'Complete package for 100 m² parking and driveway apron',
    category: 'paving',
    badge: 'Driveways & Car Parking',
    description: '100 m² of 60mm heavy-duty interlocking cabro pavers plus 35 meters of edge restraint road kerbs.',
    items: [
      { productId: 'cabro-60mm', quantity: 100 },
      { productId: 'drain-road-kerb-125', quantity: 35 }
    ]
  },
  {
    id: 'stormwater-drainage-line',
    title: 'Compound Stormwater Ditch Channel',
    tagline: 'Prevents black cotton soil waterlogging around houses and roads',
    category: 'drain',
    badge: 'Flood Mitigation',
    description: '30 meters of 300mm precast half-round drainage channels with 15 non-slip slab covers.',
    items: [
      { productId: 'drain-half-round-300', quantity: 30 },
      { productId: 'slab-500', quantity: 15 }
    ]
  }
];
