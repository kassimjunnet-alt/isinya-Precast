import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2,
  Navigation,
  FileCheck
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/locations';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Reinforced Road Culverts (450-1200mm)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }
    const ref = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNum(ref);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold font-mono">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>VISIT US OR CALL FACTORY DESK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight font-['Space_Grotesk']">
            Contact & Factory Location
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Visit our active manufacturing yard in Isinya to inspect cured inventory, review compressive 
            test cube results, or consult with our concrete engineers regarding road and plot drainage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 5 COLS: Location & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">Factory Yard Address</h4>
                  <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                    {COMPANY_DETAILS.physicalAddress}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    (Directly accessible by heavy trailers along the paved A104 Namanga highway)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-200">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">Telephone & Sales Desks</h4>
                  <div className="text-xs text-stone-700">
                    <a href={`tel:${COMPANY_DETAILS.primaryPhone}`} className="hover:text-amber-800 font-mono">
                      {COMPANY_DETAILS.primaryPhone} (Plant Hotline)
                    </a>
                  </div>
                  <div className="text-xs text-stone-700">
                    <a href={`tel:${COMPANY_DETAILS.secondaryPhone}`} className="hover:text-amber-800 font-mono">
                      {COMPANY_DETAILS.secondaryPhone} (Dispatch & Fleet)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-200">
                <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">Email Inquiries</h4>
                  <p className="text-xs text-stone-700 mt-1">
                    <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-amber-800 font-mono">
                      {COMPANY_DETAILS.email}
                    </a>
                  </p>
                  <p className="text-[11px] text-stone-500">
                    {COMPANY_DETAILS.salesEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-200">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">Working Hours</h4>
                  <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                    {COMPANY_DETAILS.openingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Button for WhatsApp */}
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Isinya%20Precast,%20I%20would%20like%20to%20visit%20the%20yard%20today.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xs transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Live WhatsApp Chat with Isinya Sales Desk</span>
            </a>
          </div>

          {/* RIGHT 7 COLS: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-stone-950 font-['Space_Grotesk']">
                  Send Formal Inquiry or Tender RFQ
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Fill out the form below. We reply with formal proformas and technical certificates within 2 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 space-y-3 animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Inquiry Registered (Ref #{ticketNum})</span>
                  </div>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    Thank you {formData.name}. Your message has been routed to our Isinya manufacturing desk. 
                    Our technical manager will call you at <strong className="text-emerald-900 font-mono">{formData.phone}</strong> promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', subject: 'Reinforced Road Culverts (450-1200mm)', message: '' });
                    }}
                    className="mt-2 text-xs text-emerald-700 underline font-semibold cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eng. David Mutua"
                        className="w-full p-3 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Phone Number (Calling / WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 0712 345 678"
                        className="w-full p-3 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. david@contractors.co.ke"
                        className="w-full p-3 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Product of Interest</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                      >
                        <option value="Reinforced Road Culverts (450-1200mm)">Reinforced Road Culverts (450-1200mm)</option>
                        <option value="Concrete Fencing Posts (Straight & Cranked)">Concrete Fencing Posts (Straight & Cranked)</option>
                        <option value="Precast Paving Slabs (500x500 / 600x600)">Precast Paving Slabs (500x500 / 600x600)</option>
                        <option value="Interlocking Cabro Pavers (60mm / 80mm)">Interlocking Cabro Pavers (60mm / 80mm)</option>
                        <option value="Drainage Channels & Road Kerbs">Drainage Channels & Road Kerbs</option>
                        <option value="Precast Septic Tank Rings & Slabs">Precast Septic Tank Rings & Slabs</option>
                        <option value="KeNHA / KeRRA Tender Procurement">KeNHA / KeRRA Tender Procurement</option>
                        <option value="Custom Precast Concrete Moulding">Custom Precast Concrete Moulding</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Project Details, Quantities & Site Location</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your required sizes, total meters or piece count, and location for delivery estimation..."
                      className="w-full p-3 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Project Inquiry Now</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
