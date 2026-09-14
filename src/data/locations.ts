import { DeliveryDestination } from '../types';

export const DELIVERY_LOCATIONS: DeliveryDestination[] = [
  {
    id: 'isinya-yard',
    town: 'Isinya Yard (Self Pickup / Ex-Factory)',
    county: 'Kajiado',
    distanceKm: 0,
    baseHaulageKES: 0,
    ratePerKmOverBase: 0
  },
  {
    id: 'isinya-environs',
    town: 'Isinya Environs & Pipeline Road',
    county: 'Kajiado',
    distanceKm: 8,
    baseHaulageKES: 3500,
    ratePerKmOverBase: 120
  },
  {
    id: 'kitengela',
    town: 'Kitengela Town & Environs',
    county: 'Kajiado',
    distanceKm: 22,
    baseHaulageKES: 5500,
    ratePerKmOverBase: 140
  },
  {
    id: 'kajiado-town',
    town: 'Kajiado Central & Town',
    county: 'Kajiado',
    distanceKm: 34,
    baseHaulageKES: 7500,
    ratePerKmOverBase: 150
  },
  {
    id: 'athi-river',
    town: 'Athi River / Mavoko Industrial Hub',
    county: 'Machakos',
    distanceKm: 38,
    baseHaulageKES: 8000,
    ratePerKmOverBase: 150
  },
  {
    id: 'ongata-rongai',
    town: 'Ongata Rongai / Kiserian',
    county: 'Kajiado',
    distanceKm: 42,
    baseHaulageKES: 9500,
    ratePerKmOverBase: 160
  },
  {
    id: 'nairobi-south',
    town: 'Nairobi South (Industrial Area / Embakasi / Syokimau)',
    county: 'Nairobi',
    distanceKm: 48,
    baseHaulageKES: 10500,
    ratePerKmOverBase: 170
  },
  {
    id: 'nairobi-cbd-west',
    town: 'Nairobi CBD / Westlands / Karen',
    county: 'Nairobi',
    distanceKm: 58,
    baseHaulageKES: 12500,
    ratePerKmOverBase: 180
  },
  {
    id: 'machakos-town',
    town: 'Machakos Town & Kyumvi Junction',
    county: 'Machakos',
    distanceKm: 65,
    baseHaulageKES: 13500,
    ratePerKmOverBase: 180
  },
  {
    id: 'namanga-border',
    town: 'Namanga Border (Tanzania Highway)',
    county: 'Kajiado',
    distanceKm: 105,
    baseHaulageKES: 22000,
    ratePerKmOverBase: 190
  }
];

export const COMPANY_DETAILS = {
  name: 'Isinya Precast Limited',
  legalRegistration: 'CPR/2019/14983',
  kebsStandard: 'KS 829-1:2018 | KS 02-106',
  email: 'kassimjunnet@gmail.com',
  salesEmail: 'sales@isinyaprecast.co.ke',
  primaryPhone: '+254 712 345 678',
  secondaryPhone: '+254 722 987 654',
  whatsapp: '+254712345678',
  physicalAddress: 'Isinya Precast Works Yard, Plot 42, Off Nairobi-Namanga Highway (A104), Next to Isinya Sub-County Offices, Kajiado County, Kenya',
  postalAddress: 'P.O. Box 112 - 01100, Kajiado, Kenya',
  openingHours: 'Mon - Sat: 7:30 AM - 6:00 PM | Sun: Closed (Emergency Road Works on Call)',
  mpesaPaybill: '522522',
  mpesaAccount: '1284920192',
  bankName: 'Kenya Commercial Bank (KCB)',
  bankBranch: 'Isinya Branch',
  accountNumber: '1284920192',
  swiftCode: 'KCBLKENX'
};
