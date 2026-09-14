import React, { useState } from 'react';
import { 
  Calculator, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  Percent, 
  Receipt, 
  Download, 
  Printer, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2, 
  AlertCircle,
  FileSpreadsheet,
  Weight,
  HelpCircle,
  Clock,
  X,
  ShieldCheck,
  Copy,
  PackageCheck,
  Sparkles,
  FileText,
  Loader2
} from 'lucide-react';
import { Product, QuoteItem, DeliveryDestination, QuoteCustomerInfo } from '../types';
import { DELIVERY_LOCATIONS, COMPANY_DETAILS } from '../data/locations';
import { PROJECT_PRESETS, ProjectPreset } from '../data/presets';
import { downloadBoQPDF } from '../utils/pdfGenerator';

interface QuoteEstimatorProps {
  quoteItems: QuoteItem[];
  allProducts: Product[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddItem: (product: Product, quantity: number) => void;
  onClearQuote: () => void;
  onNotify?: (title: string, desc?: string) => void;
  initialDestinationId?: string;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({
  quoteItems,
  allProducts,
  onUpdateQuantity,
  onRemoveItem,
  onAddItem,
  onClearQuote,
  onNotify,
  initialDestinationId = 'kitengela'
}) => {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(initialDestinationId);
  const [customDistanceKm, setCustomDistanceKm] = useState<number>(25);
  const [selectedProductToAdd, setSelectedProductToAdd] = useState<string>(allProducts[0]?.id || '');
  const [addQuantity, setAddQuantity] = useState<number>(10);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedSchedule, setCopiedSchedule] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  
  // Customer & Options Form State
  const [customerInfo, setCustomerInfo] = useState<QuoteCustomerInfo>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    siteLocation: '',
    notes: '',
    includeVAT: true,
    includeOffloading: true
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [showProformaModal, setShowProformaModal] = useState<boolean>(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);

  // Selected Location
  const destination = DELIVERY_LOCATIONS.find(loc => loc.id === selectedDestinationId) || DELIVERY_LOCATIONS[0];
  const distanceKm = selectedDestinationId === 'custom' ? customDistanceKm : destination.distanceKm;

  // Weight Calculation
  const totalWeightKg = quoteItems.reduce((acc, item) => acc + (item.product.weightKg * item.quantity), 0);
  const totalWeightTonnes = Math.round((totalWeightKg / 1000) * 10) / 10;
  const totalItemsCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  // Truck logistics recommendation
  let truckType = 'Self Pickup (Customer Vehicle)';
  let truckWeightMultiplier = 1;
  if (distanceKm > 0) {
    if (totalWeightTonnes <= 4) {
      truckType = '4-Tonne Light Canter';
      truckWeightMultiplier = 1.0;
    } else if (totalWeightTonnes <= 8) {
      truckType = '8-Tonne Medium Hauler';
      truckWeightMultiplier = 1.35;
    } else if (totalWeightTonnes <= 16) {
      truckType = '16-Tonne Heavy Multi-Axle Tipper / Flatbed';
      truckWeightMultiplier = 2.0;
    } else {
      const trips = Math.ceil(totalWeightTonnes / 16);
      truckType = `Heavy Flatbed Fleet (${trips} full trips / Articulated 28T)`;
      truckWeightMultiplier = trips * 1.8;
    }
  }

  // Items Subtotal
  const itemsSubtotalKES = quoteItems.reduce((acc, item) => acc + (item.product.basePriceKES * item.quantity), 0);

  // Bulk Discount Percentage
  let discountPercent = 0;
  if (totalItemsCount >= 500) {
    discountPercent = 12;
  } else if (totalItemsCount >= 200) {
    discountPercent = 8;
  } else if (totalItemsCount >= 50) {
    discountPercent = 5;
  }

  const discountAmountKES = Math.round((itemsSubtotalKES * discountPercent) / 100);
  const discountedSubtotalKES = itemsSubtotalKES - discountAmountKES;

  // Haulage / Transport Cost
  let transportCostKES = 0;
  if (distanceKm > 0 && destination.id !== 'isinya-yard') {
    transportCostKES = Math.round((destination.baseHaulageKES + (Math.max(0, distanceKm - 10) * destination.ratePerKmOverBase)) * truckWeightMultiplier);
  }

  // Crane Offloading Assistance (Flat KES 3,000 or free if order > KES 150,000)
  const offloadingCostKES = customerInfo.includeOffloading 
    ? (discountedSubtotalKES > 150000 || distanceKm === 0 ? 0 : 3000) 
    : 0;

  // Subtotal before tax
  const subtotalBeforeTax = discountedSubtotalKES + transportCostKES + offloadingCostKES;

  // 16% VAT
  const vatAmountKES = customerInfo.includeVAT ? Math.round(subtotalBeforeTax * 0.16) : 0;
  const grandTotalKES = subtotalBeforeTax + vatAmountKES;

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const product = allProducts.find(p => p.id === selectedProductToAdd);
    if (product && addQuantity > 0) {
      onAddItem(product, addQuantity);
      if (onNotify) {
        onNotify(`Added ${addQuantity}x ${product.name}`, `Bill of Quantities updated.`);
      }
    }
  };

  const handleApplyPreset = (preset: ProjectPreset) => {
    setActivePresetId(preset.id);
    preset.items.forEach(it => {
      const prod = allProducts.find(p => p.id === it.productId);
      if (prod) onAddItem(prod, it.quantity);
    });
    if (onNotify) {
      onNotify(`Loaded ${preset.title}`, 'All package items added to your schedule.');
    }
    setTimeout(() => setActivePresetId(null), 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.fullName || !customerInfo.phone) {
      setFormError('Please enter at least your Full Name and Phone Number to submit inquiry.');
      return;
    }
    setFormError(null);
    const refCode = `IPL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refCode);
    if (onNotify) {
      onNotify('Quotation Registered!', `Reference: ${refCode}. Our Isinya sales desk has been notified.`);
    }
  };

  // WhatsApp Message Composer
  const buildWhatsAppMessage = () => {
    let msg = `*NEW QUOTE REQUEST - ISINYA PRECAST LIMITED*\n`;
    if (customerInfo.fullName) msg += `*Client:* ${customerInfo.fullName}\n`;
    if (customerInfo.companyName) msg += `*Company:* ${customerInfo.companyName}\n`;
    if (customerInfo.phone) msg += `*Phone:* ${customerInfo.phone}\n`;
    msg += `*Delivery Site:* ${destination.town} (${distanceKm} km from Isinya)\n`;
    msg += `------------------------------------\n`;
    msg += `*ITEMIZED SCHEDULE:*\n`;
    quoteItems.forEach((item, i) => {
      msg += `${i + 1}. ${item.product.name} x ${item.quantity} ${item.product.unit} @ KES ${item.product.basePriceKES.toLocaleString()} = KES ${(item.product.basePriceKES * item.quantity).toLocaleString()}\n`;
    });
    msg += `------------------------------------\n`;
    msg += `*Items Subtotal:* KES ${itemsSubtotalKES.toLocaleString()}\n`;
    if (discountPercent > 0) msg += `*Volume Discount (${discountPercent}%):* -KES ${discountAmountKES.toLocaleString()}\n`;
    msg += `*Estimated Freight & Logistics:* KES ${transportCostKES.toLocaleString()} (${truckType})\n`;
    if (customerInfo.includeOffloading) msg += `*Crane Offload:* ${offloadingCostKES === 0 ? 'COMPLIMENTARY' : `KES ${offloadingCostKES.toLocaleString()}`}\n`;
    if (customerInfo.includeVAT) msg += `*VAT (16%):* KES ${vatAmountKES.toLocaleString()}\n`;
    msg += `*TOTAL ESTIMATE:* KES ${grandTotalKES.toLocaleString()}\n`;
    if (customerInfo.notes) msg += `*Notes:* ${customerInfo.notes}\n`;

    return encodeURIComponent(msg);
  };

  // Copy schedule summary text
  const handleCopySchedule = () => {
    let text = `ISINYA PRECAST LIMITED - BILL OF QUANTITIES\n`;
    text += `Date: ${new Date().toLocaleDateString('en-GB')}\n`;
    text += `Site: ${destination.town} (${distanceKm} km)\n\n`;
    quoteItems.forEach((item, idx) => {
      text += `${idx + 1}. ${item.product.name} - Qty: ${item.quantity} ${item.product.unit} @ KES ${item.product.basePriceKES} = KES ${item.product.basePriceKES * item.quantity}\n`;
    });
    text += `\nSubtotal: KES ${itemsSubtotalKES.toLocaleString()}\n`;
    if (discountPercent > 0) text += `Bulk Discount (${discountPercent}%): -KES ${discountAmountKES.toLocaleString()}\n`;
    text += `Freight (${distanceKm}km): KES ${transportCostKES.toLocaleString()}\n`;
    if (customerInfo.includeVAT) text += `16% VAT: KES ${vatAmountKES.toLocaleString()}\n`;
    text += `ESTIMATED TOTAL: KES ${grandTotalKES.toLocaleString()}\n`;

    navigator.clipboard?.writeText(text);
    setCopiedSchedule(true);
    if (onNotify) {
      onNotify('Copied to Clipboard', 'Quotation summary text is ready to paste.');
    }
    setTimeout(() => setCopiedSchedule(false), 2000);
  };

  // Export BoQ as CSV
  const handleExportCSV = () => {
    if (quoteItems.length === 0) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Item Number,Product Name,Category,Dimensions,Concrete Grade,Weight (kg),Quantity,Unit,Unit Rate (KES),Line Total (KES)\r\n";

    quoteItems.forEach((item, index) => {
      const lineTotal = item.product.basePriceKES * item.quantity;
      const row = [
        index + 1,
        `"${item.product.name.replace(/"/g, '""')}"`,
        item.product.category,
        `"${item.product.dimensions.replace(/"/g, '""')}"`,
        `"${item.product.concreteGrade.replace(/"/g, '""')}"`,
        item.product.weightKg,
        item.quantity,
        item.product.unit,
        item.product.basePriceKES,
        lineTotal
      ].join(",");
      csvContent += row + "\r\n";
    });

    // Summary lines
    csvContent += `\r\n,,,,,,Materials Subtotal,,KES,${itemsSubtotalKES}\r\n`;
    if (discountPercent > 0) {
      csvContent += `,,,,,,Volume Discount (${discountPercent}%),,KES,-${discountAmountKES}\r\n`;
    }
    csvContent += `,,,,,,Freight to ${destination.town} (${distanceKm} km),,KES,${transportCostKES}\r\n`;
    if (customerInfo.includeVAT) {
      csvContent += `,,,,,,16% Value Added Tax (VAT),,KES,${vatAmountKES}\r\n`;
    }
    csvContent += `,,,,,,GRAND TOTAL ESTIMATE,,KES,${grandTotalKES}\r\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `isinya_precast_boq_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onNotify) {
      onNotify('CSV Exported', 'Bill of Quantities CSV spreadsheet downloaded.');
    }
  };

  // Generate and Download Official Printable PDF BoQ via jsPDF
  const handleDownloadPDF = async () => {
    if (quoteItems.length === 0) {
      if (onNotify) {
        onNotify('Empty Schedule', 'Add items to your schedule before generating a PDF.');
      }
      return;
    }

    setIsGeneratingPDF(true);
    try {
      const ref = submittedRef || `IPL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      downloadBoQPDF({
        quoteItems,
        customerInfo,
        destination,
        distanceKm,
        truckType,
        itemsSubtotalKES,
        discountPercent,
        discountAmountKES,
        discountedSubtotalKES,
        transportCostKES,
        offloadingCostKES,
        subtotalBeforeTax,
        vatAmountKES,
        grandTotalKES,
        totalWeightTonnes,
        totalItemsCount,
        referenceNumber: ref
      });

      if (onNotify) {
        onNotify('PDF BoQ Downloaded!', `Official Bill of Quantities saved (Ref: ${ref}).`);
      }
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      if (onNotify) {
        onNotify('PDF Generation Error', 'Could not generate printable PDF. Please check your browser.');
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <section id="quote" className="py-16 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold font-mono">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>INTERACTIVE PROJECT ESTIMATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 font-['Space_Grotesk'] tracking-tight">
            Build Your Bill of Quantities (BoQ)
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Select items, calculate factory-direct prices in KES, add logistics across Kajiado, Nairobi, 
            and Machakos, and export an official proforma invoice or send directly to our sales desk.
          </p>
        </div>

        {/* Success Alert if Submitted */}
        {submittedRef && (
          <div className="mb-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-stone-900 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in shadow-xs">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-emerald-100 text-emerald-700 mt-1 shrink-0">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-emerald-950 font-['Space_Grotesk']">
                  Quotation Request Successfully Registered!
                </h4>
                <p className="text-sm text-emerald-900 mt-0.5">
                  Your reference is <span className="font-mono font-bold text-emerald-800">{submittedRef}</span>. 
                  Our sales engineers at Isinya yard have received your schedule and will contact you at {customerInfo.phone || 'your phone'}.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-400 border border-stone-800 text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                title="Download Printable PDF Bill of Quantities"
              >
                {isGeneratingPDF ? (
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                ) : (
                  <FileText className="w-4 h-4 text-amber-400" />
                )}
                <span>{isGeneratingPDF ? 'Compiling PDF...' : 'Download PDF BoQ'}</span>
              </button>
              <button
                onClick={() => setShowProformaModal(true)}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Stationery Slip</span>
              </button>
              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${buildWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-white hover:bg-stone-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Inline Error Alert if any */}
        {formError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 flex items-center gap-3 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{formError}</span>
          </div>
        )}

        {/* Estimator Presets Bar */}
        <div className="mb-8 p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-stone-900 uppercase font-mono flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-amber-600" />
              <span>Quick Project Presets (1-Click Package Load)</span>
            </span>
            <span className="text-[10px] text-stone-500 font-mono">Adds full sets to schedule</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PROJECT_PRESETS.slice(0, 4).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  activePresetId === p.id
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border-stone-200 text-stone-800'
                }`}
              >
                <div className="text-[11px] font-bold font-['Space_Grotesk'] truncate">{p.title}</div>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">{p.badge}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: Items Table & Add Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Add Product Bar */}
            <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 font-mono flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>Add Item to Bill of Quantities</span>
              </h3>
              <form onSubmit={handleQuickAdd} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-7">
                  <select
                    value={selectedProductToAdd}
                    onChange={(e) => setSelectedProductToAdd(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                  >
                    {allProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — KES {p.basePriceKES.toLocaleString()} /{p.unit}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <input
                    type="number"
                    min="1"
                    value={addQuantity}
                    onChange={(e) => setAddQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    placeholder="Qty"
                    className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 text-xs text-center font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Add Item</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Selected Items List */}
            <div className="rounded-xl bg-white border border-stone-200 overflow-hidden shadow-xs">
              <div className="p-4 border-b border-stone-200 bg-stone-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-bold text-stone-900">
                    Itemized Schedule ({quoteItems.length} Products, {totalItemsCount} Units)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {quoteItems.length > 0 && (
                    <>
                      {/* Copy Schedule */}
                      <button
                        type="button"
                        onClick={handleCopySchedule}
                        className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium bg-white px-2.5 py-1 rounded border border-stone-300 hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Copy text summary to clipboard"
                      >
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>{copiedSchedule ? 'Copied!' : 'Copy Text'}</span>
                      </button>

                      {/* Download PDF */}
                      <button
                        type="button"
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className="text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 flex items-center gap-1 font-bold px-2.5 py-1 rounded border border-amber-300 transition-colors cursor-pointer shadow-2xs"
                        title="Generate and download printable PDF Bill of Quantities"
                      >
                        {isGeneratingPDF ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-amber-700" />
                        )}
                        <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
                      </button>

                      {/* Export CSV */}
                      <button
                        type="button"
                        onClick={handleExportCSV}
                        className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium bg-white px-2.5 py-1 rounded border border-stone-300 hover:bg-stone-100 transition-colors cursor-pointer"
                        title="Download CSV spreadsheet"
                      >
                        <Download className="w-3.5 h-3.5 text-stone-500" />
                        <span>Export CSV</span>
                      </button>

                      {/* Clear Quote */}
                      <button
                        onClick={onClearQuote}
                        className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors font-medium px-2 py-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {quoteItems.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <Building2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <p className="text-stone-800 font-bold text-base">Your project quote is currently empty</p>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    Use the quick selector above, choose a 1-click package preset, or click "Add to Quote" on any product card from our catalog.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {quoteItems.map((item) => {
                    const itemTotal = item.product.basePriceKES * item.quantity;
                    const itemWeightTonnes = Math.round((item.product.weightKg * item.quantity / 1000) * 10) / 10;

                    return (
                      <div key={item.product.id} className="p-4 hover:bg-stone-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-baseline gap-2">
                            <h4 className="text-sm font-bold text-stone-950 font-['Space_Grotesk']">{item.product.name}</h4>
                            <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded">
                              {item.product.category.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-xs text-stone-600 font-mono flex items-center gap-3">
                            <span>Rate: KES {item.product.basePriceKES.toLocaleString()} /{item.product.unit}</span>
                            <span>•</span>
                            <span>Weight: ~{itemWeightTonnes} Tonnes</span>
                          </div>
                        </div>

                        {/* Stepper & Line Total */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                          {/* Stepper */}
                          <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 shadow-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-1.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => onUpdateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-12 text-center text-xs font-bold font-mono text-stone-950 bg-transparent focus:outline-none"
                            />
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 text-stone-500 hover:text-stone-900 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-right min-w-[100px]">
                            <div className="text-sm font-bold font-mono text-stone-950">
                              KES {itemTotal.toLocaleString()}
                            </div>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Delivery & Logistics Selector */}
            <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">
                    Site Delivery & Freight Calculation
                  </h3>
                </div>
                <span className="text-xs font-mono text-stone-500">Ex-Isinya Plant</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-600 font-medium mb-1">Destination Hub / Town</label>
                  <select
                    value={selectedDestinationId}
                    onChange={(e) => setSelectedDestinationId(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs cursor-pointer"
                  >
                    {DELIVERY_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.town} ({loc.distanceKm} km)
                      </option>
                    ))}
                    <option value="custom">Custom Site Distance (Enter km)</option>
                  </select>
                </div>

                {selectedDestinationId === 'custom' ? (
                  <div>
                    <label className="block text-xs text-stone-600 font-medium mb-1">Custom Distance (One Way km)</label>
                    <input
                      type="number"
                      min="1"
                      value={customDistanceKm}
                      onChange={(e) => setCustomDistanceKm(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 text-xs font-mono shadow-xs"
                    />
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-600">Assigned Freight Vehicle:</span>
                    <span className="font-semibold text-amber-800 font-mono">{truckType}</span>
                  </div>
                )}
              </div>

              {/* Logistics Summary Pill */}
              <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 text-xs text-stone-700 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Weight className="w-3.5 h-3.5 text-sky-600" />
                  <span>Payload Weight: <strong className="text-stone-900 font-mono">{totalWeightTonnes} Tonnes</strong></span>
                </div>
                <div>
                  <span>Haulage: <strong className="text-amber-800 font-mono">KES {transportCostKES.toLocaleString()}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Summary Card & Official Export Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-md space-y-5 sticky top-24 text-stone-900">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-base font-bold text-stone-950 font-['Space_Grotesk'] flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-amber-600" />
                  <span>Cost Summary & Taxes</span>
                </h3>
                <span className="text-xs font-mono text-stone-500">KES (Kenya Shillings)</span>
              </div>

              {/* Calculations Stack */}
              <div className="space-y-3 text-xs">
                {/* Items Subtotal */}
                <div className="flex items-center justify-between text-stone-600">
                  <span>Materials Subtotal ({totalItemsCount} units)</span>
                  <span className="font-mono font-bold text-stone-950 text-sm">
                    KES {itemsSubtotalKES.toLocaleString()}
                  </span>
                </div>

                {/* Bulk Discount */}
                {discountPercent > 0 && (
                  <div className="flex items-center justify-between text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                    <span className="flex items-center gap-1">
                      <Percent className="w-3 h-3 text-emerald-600" />
                      <span>Volume Discount ({discountPercent}%)</span>
                    </span>
                    <span className="font-mono font-bold">- KES {discountAmountKES.toLocaleString()}</span>
                  </div>
                )}

                {/* Freight */}
                <div className="flex items-center justify-between text-stone-600">
                  <span>Transport & Haulage ({distanceKm} km)</span>
                  <span className="font-mono font-bold text-stone-950">
                    {transportCostKES === 0 ? 'FREE / YARD PICKUP' : `KES ${transportCostKES.toLocaleString()}`}
                  </span>
                </div>

                {/* Crane Offloading */}
                <div className="flex items-center justify-between text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="offload-check"
                      checked={customerInfo.includeOffloading}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, includeOffloading: e.target.checked })}
                      className="rounded border-stone-300 text-amber-600 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="offload-check" className="cursor-pointer text-stone-700">
                      Crane Offload on Site
                    </label>
                  </div>
                  <span className="font-mono font-bold text-stone-950">
                    {offloadingCostKES === 0 ? (customerInfo.includeOffloading ? 'FREE (>150k)' : 'None') : `KES ${offloadingCostKES.toLocaleString()}`}
                  </span>
                </div>

                {/* 16% VAT Checkbox */}
                <div className="flex items-center justify-between text-stone-600 pt-2 border-t border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="vat-check"
                      checked={customerInfo.includeVAT}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, includeVAT: e.target.checked })}
                      className="rounded border-stone-300 text-amber-600 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="vat-check" className="cursor-pointer text-stone-700">
                      Include 16% VAT (Tax Invoice)
                    </label>
                  </div>
                  <span className="font-mono font-bold text-stone-900">
                    {customerInfo.includeVAT ? `KES ${vatAmountKES.toLocaleString()}` : 'EX-VAT'}
                  </span>
                </div>

                {/* Grand Total */}
                <div className="pt-3 border-t-2 border-stone-300 flex items-baseline justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-800 uppercase font-mono">Estimated Total</div>
                    <div className="text-[10px] text-stone-500">Valid for 30 calendar days</div>
                  </div>
                  <div className="text-2xl font-black text-amber-800 font-mono">
                    KES {grandTotalKES.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Customer Contact Input Details */}
              <div className="border-t border-stone-200 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider font-mono">
                  Client & Site Details
                </h4>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={customerInfo.fullName}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                    className="w-full p-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Phone / WhatsApp *"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full p-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Company / Contractor"
                      value={customerInfo.companyName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, companyName: e.target.value })}
                      className="w-full p-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Site Location / Landmark (e.g. Isinya Pipeline Rd, Plot 14)"
                    value={customerInfo.siteLocation}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, siteLocation: e.target.value })}
                    className="w-full p-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                {/* Download Printable PDF Bill of Quantities */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={quoteItems.length === 0 || isGeneratingPDF}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:opacity-50 text-stone-950 font-black text-sm shadow-xs transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  {isGeneratingPDF ? (
                    <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  ) : (
                    <FileText className="w-4 h-4 text-stone-950" />
                  )}
                  <span>{isGeneratingPDF ? 'Generating Official PDF BoQ...' : 'Download Printable PDF BoQ'}</span>
                </button>

                {/* Official Proforma Invoice View & Interactive Modal */}
                <button
                  onClick={() => setShowProformaModal(true)}
                  disabled={quoteItems.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>Preview & Print Official Stationery</span>
                </button>

                {/* WhatsApp Dispatch */}
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all ${
                    quoteItems.length === 0 ? 'pointer-events-none opacity-50' : ''
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Estimate to Sales via WhatsApp</span>
                </a>

                {/* Register Quote Online */}
                <button
                  onClick={handleFormSubmit}
                  disabled={quoteItems.length === 0}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 font-semibold text-xs transition-colors shadow-xs cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-amber-600" />
                  <span>Submit Inquiry to Isinya Sales Desk</span>
                </button>
              </div>

              {/* Plant Pickup Guarantee */}
              <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1.5 pt-2">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Ex-factory pickup available Monday-Saturday with instant yard loading</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PROFORMA INVOICE MODAL (Formal stationery view with certified seal) */}
      {showProformaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-stone-950/85 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white text-stone-900 shadow-2xl p-6 sm:p-8 my-8 border border-stone-300 animate-in fade-in">
            {/* Modal Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6 print:hidden">
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
                OFFICIAL PROFORMA INVOICE SLIP
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  title="Download client-side PDF document"
                >
                  {isGeneratingPDF ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-stone-950" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-stone-950" />
                  )}
                  <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  CSV
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print
                </button>
                <button
                  onClick={() => setShowProformaModal(false)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Letterhead */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b-2 border-stone-800 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-stone-900 text-amber-500 flex items-center justify-center font-black text-sm">
                    IP
                  </div>
                  <h1 className="text-2xl font-black tracking-tight text-stone-950 font-['Space_Grotesk']">
                    ISINYA PRECAST LIMITED
                  </h1>
                </div>
                <p className="text-xs text-stone-600 mt-1">Concrete Engineering & Civil Precast Specialists</p>
                <p className="text-xs text-stone-600">{COMPANY_DETAILS.physicalAddress}</p>
                <p className="text-xs text-stone-600">Email: {COMPANY_DETAILS.email} | Tel: {COMPANY_DETAILS.primaryPhone}</p>
                <p className="text-[11px] font-mono text-stone-500 mt-0.5">KRA PIN: P051934281X • E-TIMS Authorized</p>
              </div>
              <div className="text-left sm:text-right text-xs text-stone-600 space-y-1">
                <div className="font-mono font-bold text-sm text-stone-950">
                  PROFORMA #{submittedRef || `IPL-${new Date().getFullYear()}-0942`}
                </div>
                <div>Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                <div>Validity: 30 Calendar Days</div>
                <div>KEBS Standard: {COMPANY_DETAILS.kebsStandard}</div>
              </div>
            </div>

            {/* Customer Billed To */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6 bg-stone-50 p-4 rounded-lg border border-stone-200">
              <div>
                <div className="font-bold text-stone-500 uppercase">Quotation Issued To:</div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">{customerInfo.fullName || 'Valued Client / Contractor'}</div>
                {customerInfo.companyName && <div className="text-stone-700">{customerInfo.companyName}</div>}
                <div className="text-stone-700">{customerInfo.phone || 'Phone upon inquiry'}</div>
              </div>
              <div>
                <div className="font-bold text-stone-500 uppercase">Delivery Destination:</div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">{destination.town}</div>
                <div className="text-stone-700">Approx. {distanceKm} km from Isinya Yard</div>
                {customerInfo.siteLocation && <div className="text-stone-600 italic">Site: {customerInfo.siteLocation}</div>}
              </div>
            </div>

            {/* Bill of Quantities Table */}
            <table className="w-full text-xs text-left border border-stone-200 mb-6">
              <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[11px] border-b border-stone-200">
                <tr>
                  <th className="p-2.5">#</th>
                  <th className="p-2.5">Item Description & Specification</th>
                  <th className="p-2.5 text-center">Qty</th>
                  <th className="p-2.5 text-right">Unit Rate (KES)</th>
                  <th className="p-2.5 text-right">Amount (KES)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {quoteItems.map((item, index) => (
                  <tr key={item.product.id}>
                    <td className="p-2.5 font-mono text-stone-500">{index + 1}</td>
                    <td className="p-2.5">
                      <div className="font-bold text-stone-900">{item.product.name}</div>
                      <div className="text-[10px] text-stone-500">{item.product.dimensions} • {item.product.concreteGrade}</div>
                    </td>
                    <td className="p-2.5 text-center font-mono font-bold">{item.quantity}</td>
                    <td className="p-2.5 text-right font-mono">{item.product.basePriceKES.toLocaleString()}</td>
                    <td className="p-2.5 text-right font-mono font-bold">{(item.product.basePriceKES * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Calculation Slip with Factory Seal */}
            <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-6">
              {/* Official Seal badge */}
              <div className="p-3 border-2 border-dashed border-amber-400 bg-amber-50/50 rounded-xl max-w-xs text-center space-y-1">
                <div className="text-[11px] font-black tracking-widest text-amber-900 uppercase font-mono">
                  ★ ISINYA PRECAST YARD ★
                </div>
                <div className="text-[10px] text-stone-600 font-serif">
                  Factory Direct Pricing • KEBS Certified Production Batch
                </div>
                <div className="text-[9px] text-stone-500 font-mono">
                  APPROVED DISPATCH UNIT
                </div>
              </div>

              <div className="w-72 text-xs space-y-2 border-t-2 border-stone-900 pt-3">
                <div className="flex justify-between text-stone-600">
                  <span>Materials Subtotal:</span>
                  <span className="font-mono font-bold">KES {itemsSubtotalKES.toLocaleString()}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Volume Discount ({discountPercent}%):</span>
                    <span className="font-mono font-bold">- KES {discountAmountKES.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Transport ({distanceKm} km):</span>
                  <span className="font-mono font-bold">KES {transportCostKES.toLocaleString()}</span>
                </div>
                {customerInfo.includeOffloading && (
                  <div className="flex justify-between text-stone-600">
                    <span>Crane Offload:</span>
                    <span className="font-mono font-bold">{offloadingCostKES === 0 ? 'COMPLIMENTARY' : `KES ${offloadingCostKES.toLocaleString()}`}</span>
                  </div>
                )}
                {customerInfo.includeVAT && (
                  <div className="flex justify-between text-stone-600">
                    <span>16% Value Added Tax (VAT):</span>
                    <span className="font-mono font-bold">KES {vatAmountKES.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-stone-950 border-t-2 border-stone-900 pt-2">
                  <span>TOTAL PAYABLE:</span>
                  <span className="font-mono text-amber-700">KES {grandTotalKES.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Bank Details */}
            <div className="border border-stone-200 rounded-lg p-4 bg-stone-50 text-xs text-stone-700 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="font-bold uppercase text-stone-900 mb-1">Official Bank Remittance:</div>
                <div>Bank: <strong>{COMPANY_DETAILS.bankName}</strong></div>
                <div>Branch: <strong>{COMPANY_DETAILS.bankBranch}</strong></div>
                <div>Account Name: <strong>{COMPANY_DETAILS.name}</strong></div>
                <div>Account Number: <strong className="font-mono">{COMPANY_DETAILS.accountNumber}</strong></div>
              </div>
              <div>
                <div className="font-bold uppercase text-stone-900 mb-1">Mobile Payment:</div>
                <div>MPESA Paybill: <strong className="font-mono">{COMPANY_DETAILS.mpesaPaybill}</strong></div>
                <div>Account No: <strong className="font-mono">ISINYA PRECAST</strong></div>
                <div className="mt-2 text-[10px] text-stone-500 italic">
                  * Official tax invoice / E-TIMS receipt issued upon bank settlement.
                </div>
              </div>
            </div>

            {/* Modal Bottom Export Actions */}
            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
              <div className="text-xs text-stone-500">
                A4 printable format • Generated client-side via jsPDF with live logistics calculations.
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  {isGeneratingPDF ? (
                    <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  ) : (
                    <FileText className="w-4 h-4 text-stone-950" />
                  )}
                  <span>{isGeneratingPDF ? 'Compiling PDF...' : 'Download PDF BoQ'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => setShowProformaModal(false)}
                  className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
