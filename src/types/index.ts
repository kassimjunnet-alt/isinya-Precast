export type ProductCategory = 
  | 'all'
  | 'culverts'
  | 'poles'
  | 'slabs'
  | 'drains'
  | 'blocks'
  | 'custom';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'culverts' | 'poles' | 'slabs' | 'drains' | 'blocks' | 'custom';
  tagline: string;
  description: string;
  basePriceKES: number;
  unit: string;
  dimensions: string;
  weightKg: number;
  concreteGrade: string;
  reinforcement: string;
  standard: string;
  popular?: boolean;
  minOrder?: number;
  features: string[];
  applications: string[];
  specs: ProductSpec[];
}

export interface QuoteItem {
  product: Product;
  quantity: number;
}

export interface DeliveryDestination {
  id: string;
  town: string;
  county: string;
  distanceKm: number;
  baseHaulageKES: number;
  ratePerKmOverBase: number;
}

export interface QuoteCustomerInfo {
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  siteLocation: string;
  notes?: string;
  includeVAT: boolean;
  includeOffloading: boolean;
}
