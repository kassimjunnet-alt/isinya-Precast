import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { QuoteItem, QuoteCustomerInfo, DeliveryDestination } from '../types';
import { COMPANY_DETAILS } from '../data/locations';

export interface BoQPDFData {
  quoteItems: QuoteItem[];
  customerInfo: QuoteCustomerInfo;
  destination: DeliveryDestination;
  distanceKm: number;
  truckType: string;
  itemsSubtotalKES: number;
  discountPercent: number;
  discountAmountKES: number;
  discountedSubtotalKES: number;
  transportCostKES: number;
  offloadingCostKES: number;
  subtotalBeforeTax: number;
  vatAmountKES: number;
  grandTotalKES: number;
  totalWeightTonnes: number;
  totalItemsCount: number;
  referenceNumber?: string;
}

export function generateBoQPDF(data: BoQPDFData): jsPDF {
  const {
    quoteItems,
    customerInfo,
    destination,
    distanceKm,
    truckType,
    itemsSubtotalKES,
    discountPercent,
    discountAmountKES,
    transportCostKES,
    offloadingCostKES,
    subtotalBeforeTax,
    vatAmountKES,
    grandTotalKES,
    totalWeightTonnes,
    totalItemsCount,
    referenceNumber = `IPL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  } = data;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner Background Bar
  doc.setFillColor(28, 25, 23); // Dark stone (#1c1917)
  doc.rect(margin, 12, contentWidth, 24, 'F');

  // Decorative Amber stripe
  doc.setFillColor(217, 119, 6); // Amber-600 (#d97706)
  doc.rect(margin, 36, contentWidth, 1.8, 'F');

  // Logo emblem badge
  doc.setFillColor(245, 158, 11); // Amber-500 (#f59e0b)
  doc.roundedRect(margin + 4, 15.5, 17, 17, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(28, 25, 23);
  doc.text('IP', margin + 9.5, 26.5);

  // Company Name in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('ISINYA PRECAST LIMITED', margin + 25, 22);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(214, 211, 209);
  doc.text('Civil Concrete Engineering • Heavy Infrastructure & Perimeter Systems', margin + 25, 27.5);
  doc.text('Isinya Industrial Yard, Namanga Highway, Kajiado County • www.isinyaprecast.co.ke', margin + 25, 32);

  // Right Header badge
  doc.setFillColor(41, 37, 36);
  doc.roundedRect(pageWidth - margin - 52, 15.5, 48, 17, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(251, 191, 36); // amber-400
  doc.text('BILL OF QUANTITIES', pageWidth - margin - 28, 21, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('PROFORMA INVOICE', pageWidth - margin - 28, 25.5, { align: 'center' });
  doc.setTextColor(168, 162, 158);
  doc.text(`REF: ${referenceNumber}`, pageWidth - margin - 28, 30, { align: 'center' });

  // Document metadata row
  let currentY = 43;

  doc.setFontSize(8);
  doc.setTextColor(87, 83, 78); // stone-600
  doc.setFont('helvetica', 'normal');
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text(`Issue Date: ${dateStr}`, margin, currentY);
  doc.text(`Validity: 30 Calendar Days`, margin + 65, currentY);
  doc.text(`KRA PIN: P051934281X (E-TIMS)`, margin + 120, currentY);

  currentY += 4.5;

  // Customer & Delivery Details Cards (Two columns)
  const cardWidth = (contentWidth - 6) / 2;
  const cardHeight = 31;

  // Left card: Client
  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(margin, currentY, cardWidth, cardHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9); // amber-700
  doc.text('ISSUED TO / CLIENT DETAILS', margin + 3.5, currentY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(28, 25, 23);
  doc.text(customerInfo.fullName || 'Valued Client / Engineering Contractor', margin + 3.5, currentY + 10.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(87, 83, 78);
  if (customerInfo.companyName) {
    doc.text(`Company: ${customerInfo.companyName}`, margin + 3.5, currentY + 15);
  } else {
    doc.text(`Account: Direct Private / Commercial Client`, margin + 3.5, currentY + 15);
  }
  doc.text(`Phone: ${customerInfo.phone || 'Upon inquiry verification'}`, margin + 3.5, currentY + 19.5);
  if (customerInfo.email) {
    doc.text(`Email: ${customerInfo.email}`, margin + 3.5, currentY + 24);
  } else {
    doc.text(`Tel Support: ${COMPANY_DETAILS.primaryPhone}`, margin + 3.5, currentY + 24);
  }
  if (customerInfo.notes) {
    doc.text(`Notes: ${customerInfo.notes.substring(0, 42)}`, margin + 3.5, currentY + 28.5);
  }

  // Right card: Delivery & Site Logistics
  const rightCardX = margin + cardWidth + 6;
  doc.setFillColor(250, 250, 249);
  doc.roundedRect(rightCardX, currentY, cardWidth, cardHeight, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9);
  doc.text('DELIVERY & SITE LOGISTICS', rightCardX + 3.5, currentY + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(28, 25, 23);
  doc.text(`${destination.town}`, rightCardX + 3.5, currentY + 10.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(87, 83, 78);
  doc.text(`Haulage Distance: ${distanceKm} km from Isinya Plant`, rightCardX + 3.5, currentY + 15);
  doc.text(`Assigned Vehicle: ${truckType}`, rightCardX + 3.5, currentY + 19.5);
  doc.text(`Estimated Net Weight: ~${totalWeightTonnes} Tonnes (${totalItemsCount} units)`, rightCardX + 3.5, currentY + 24);
  if (customerInfo.siteLocation) {
    doc.text(`Site Landmark: ${customerInfo.siteLocation.substring(0, 38)}`, rightCardX + 3.5, currentY + 28.5);
  } else {
    doc.text(`Offload: ${customerInfo.includeOffloading ? 'Crane Offload Included' : 'Customer Offloading'}`, rightCardX + 3.5, currentY + 28.5);
  }

  currentY += cardHeight + 5;

  // Build Table Rows
  const tableData = quoteItems.map((item, index) => {
    const lineTotal = item.product.basePriceKES * item.quantity;
    const itemWeightTons = Math.round((item.product.weightKg * item.quantity / 1000) * 10) / 10;
    
    return [
      (index + 1).toString(),
      {
        content: `${item.product.name}\nSpecs: ${item.product.dimensions} | Grade: ${item.product.concreteGrade} | Rebar: ${item.product.reinforcement} (~${itemWeightTons}T)`
      },
      item.product.category.toUpperCase(),
      item.quantity.toString(),
      item.product.unit,
      item.product.basePriceKES.toLocaleString(),
      lineTotal.toLocaleString()
    ];
  });

  // Call AutoTable
  autoTable(doc, {
    startY: currentY,
    margin: { left: margin, right: margin },
    head: [['#', 'Item Description & Technical Specifications', 'Category', 'Qty', 'Unit', 'Rate (KES)', 'Amount (KES)']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [28, 25, 23],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 2.5
    },
    styles: {
      fontSize: 7.5,
      textColor: [41, 37, 36],
      cellPadding: 2.5,
      lineColor: [229, 231, 235],
      lineWidth: 0.2
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
      3: { cellWidth: 12, halign: 'center', fontStyle: 'bold' },
      4: { cellWidth: 13, halign: 'center' },
      5: { cellWidth: 24, halign: 'right' },
      6: { cellWidth: 28, halign: 'right', fontStyle: 'bold' }
    },
    alternateRowStyles: {
      fillColor: [250, 250, 249]
    },
    didParseCell: (data) => {
      if (data.section === 'head') {
        if (data.column.index === 0 || data.column.index === 2 || data.column.index === 3 || data.column.index === 4) {
          data.cell.styles.halign = 'center';
        } else if (data.column.index === 5 || data.column.index === 6) {
          data.cell.styles.halign = 'right';
        }
      }
    }
  });

  // Position after table
  let finalY = (doc as any).lastAutoTable?.finalY || currentY + 50;

  // If table went too close to bottom, add a new page for summary and terms
  if (finalY > pageHeight - 85) {
    doc.addPage();
    finalY = 16;
  } else {
    finalY += 6;
  }

  // Two columns for bottom: Left = Payment & Quality Stamp, Right = Financial Totals
  const bottomColWidth = (contentWidth - 8) / 2;

  // RIGHT: Financial Totals Box
  const totalsX = margin + bottomColWidth + 8;
  const totalsBoxHeight = customerInfo.includeVAT ? 50 : 44;

  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(214, 211, 209);
  doc.roundedRect(totalsX, finalY, bottomColWidth, totalsBoxHeight, 2, 2, 'FD');

  let totalsY = finalY + 5.5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(87, 83, 78);

  // Materials Subtotal
  doc.text('Materials Subtotal:', totalsX + 4, totalsY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
  doc.text(`KES ${itemsSubtotalKES.toLocaleString()}`, totalsX + bottomColWidth - 4, totalsY, { align: 'right' });

  // Volume discount if applicable
  if (discountPercent > 0) {
    totalsY += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(5, 150, 105); // emerald-600
    doc.text(`Volume Discount (${discountPercent}%):`, totalsX + 4, totalsY);
    doc.setFont('helvetica', 'bold');
    doc.text(`- KES ${discountAmountKES.toLocaleString()}`, totalsX + bottomColWidth - 4, totalsY, { align: 'right' });
  }

  // Haulage / Transport
  totalsY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(87, 83, 78);
  doc.text(`Transport (${distanceKm} km):`, totalsX + 4, totalsY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
  const freightText = transportCostKES === 0 ? 'FREE / YARD PICKUP' : `KES ${transportCostKES.toLocaleString()}`;
  doc.text(freightText, totalsX + bottomColWidth - 4, totalsY, { align: 'right' });

  // Crane Offloading
  if (customerInfo.includeOffloading) {
    totalsY += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(87, 83, 78);
    doc.text('Hydraulic Crane Offloading:', totalsX + 4, totalsY);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(28, 25, 23);
    const offloadText = offloadingCostKES === 0 ? 'COMPLIMENTARY' : `KES ${offloadingCostKES.toLocaleString()}`;
    doc.text(offloadText, totalsX + bottomColWidth - 4, totalsY, { align: 'right' });
  }

  // VAT if selected
  if (customerInfo.includeVAT) {
    totalsY += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(87, 83, 78);
    doc.text('16% Value Added Tax (VAT):', totalsX + 4, totalsY);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(28, 25, 23);
    doc.text(`KES ${vatAmountKES.toLocaleString()}`, totalsX + bottomColWidth - 4, totalsY, { align: 'right' });
  }

  // Grand Total Highlight Banner
  totalsY += 6;
  doc.setFillColor(28, 25, 23);
  doc.roundedRect(totalsX + 2, totalsY - 3.5, bottomColWidth - 4, 11, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL ESTIMATE:', totalsX + 5, totalsY + 3.5);

  doc.setFontSize(10.5);
  doc.setTextColor(251, 191, 36); // amber-400
  doc.text(`KES ${grandTotalKES.toLocaleString()}`, totalsX + bottomColWidth - 5, totalsY + 3.5, { align: 'right' });

  // LEFT: Bank Details & Stamp Seal
  const bankX = margin;
  doc.setFillColor(250, 250, 249);
  doc.setDrawColor(214, 211, 209);
  doc.roundedRect(bankX, finalY, bottomColWidth, 31, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 83, 9);
  doc.text('PAYMENT & REMITTANCE DETAILS', bankX + 3.5, finalY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(68, 64, 60);
  doc.text(`Bank: ${COMPANY_DETAILS.bankName} (${COMPANY_DETAILS.bankBranch})`, bankX + 3.5, finalY + 9.5);
  doc.text(`Account Name: ${COMPANY_DETAILS.name}`, bankX + 3.5, finalY + 13.5);
  doc.text(`Account Number: ${COMPANY_DETAILS.accountNumber} | Swift: ${COMPANY_DETAILS.swiftCode}`, bankX + 3.5, finalY + 17.5);
  doc.text(`M-PESA Paybill: ${COMPANY_DETAILS.mpesaPaybill} • Account No: ${COMPANY_DETAILS.mpesaAccount}`, bankX + 3.5, finalY + 21.5);
  doc.setTextColor(120, 113, 108);
  doc.text('Official E-TIMS commercial tax receipt issued immediately upon settlement.', bankX + 3.5, finalY + 26.5);

  // Quality Seal Badge below bank
  const sealY = finalY + 34;
  doc.setDrawColor(217, 119, 6);
  doc.setLineDashPattern([1.5, 1.5], 0);
  doc.setFillColor(254, 243, 199); // amber-100/50
  doc.roundedRect(bankX, sealY, bottomColWidth, 16, 2, 2, 'FD');
  doc.setLineDashPattern([], 0); // reset line dash

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(146, 64, 14); // amber-800
  doc.text('★ ISINYA PRECAST WORKS • QUALITY ASSURANCE VERIFIED ★', bankX + bottomColWidth / 2, sealY + 5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 53, 15);
  doc.text('Manufactured under KEBS KS 829-1:2018 Standards • Minimum C30 Cube Strength', bankX + bottomColWidth / 2, sealY + 9.5, { align: 'center' });
  doc.text('21-Day Saturated Submersion Curing Guaranteed • Ready for Heavy Civil Loading', bankX + bottomColWidth / 2, sealY + 13, { align: 'center' });

  // Standard Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Bottom border rule
    doc.setDrawColor(214, 211, 209);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(120, 113, 108);
    doc.text(
      'Isinya Precast Limited • Namanga Road Highway, Isinya, Kajiado County • Inquiries: 0712 345 678',
      margin,
      pageHeight - 8
    );
    doc.text(
      `Generated: ${new Date().toLocaleDateString('en-GB')} | Page ${i} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 8,
      { align: 'right' }
    );
  }

  return doc;
}

export function downloadBoQPDF(data: BoQPDFData, customFilename?: string): void {
  const doc = generateBoQPDF(data);
  const refClean = (data.referenceNumber || 'IPL-BOQ').replace(/[^a-zA-Z0-9-_]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = customFilename || `Isinya_Precast_BoQ_${refClean}_${dateStr}.pdf`;
  doc.save(filename);
}
