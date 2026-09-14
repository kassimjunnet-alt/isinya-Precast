import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  X, 
  ShieldCheck, 
  Truck, 
  Calculator, 
  MessageCircle,
  Maximize2,
  Tag,
  Briefcase
} from 'lucide-react';
import { 
  COMPLETED_PROJECTS, 
  PROJECT_CATEGORIES, 
  CompletedProject, 
  ProjectCategory 
} from '../data/projects';
import { COMPANY_DETAILS } from '../data/locations';

interface CompletedProjectsGalleryProps {
  onNavigateToQuote?: () => void;
  onNavigateToProducts?: () => void;
}

export const CompletedProjectsGallery: React.FC<CompletedProjectsGalleryProps> = ({
  onNavigateToQuote,
  onNavigateToProducts
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<CompletedProject | null>(null);

  // Filter projects by category
  const filteredProjects = selectedCategory === 'all'
    ? COMPLETED_PROJECTS
    : COMPLETED_PROJECTS.filter((p) => p.category === selectedCategory);

  const getCategoryCount = (catId: ProjectCategory) => {
    if (catId === 'all') return COMPLETED_PROJECTS.length;
    return COMPLETED_PROJECTS.filter((p) => p.category === catId).length;
  };

  const buildProjectWhatsAppUrl = (project: CompletedProject) => {
    const text = encodeURIComponent(
      `Hello Isinya Precast, I was reviewing your completed project "${project.title}" (${project.location}). I would like to inquire about similar precast concrete products for my project.`
    );
    return `https://wa.me/${COMPANY_DETAILS.whatsapp}?text=${text}`;
  };

  return (
    <section id="projects" className="py-16 sm:py-20 bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Proven Client Track Record • Kenya</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight font-['Space_Grotesk'] leading-tight">
              Completed Projects & Field Installations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Explore real-world client installations supplied by Isinya Precast. From heavy-load highway cross-culverts along the Namanga Corridor to master-planned residential estate fencing in Kajiado and industrial truck plazas in Athi River.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs shrink-0 self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                Delivered On-Site
              </div>
              <div className="text-base sm:text-lg font-black text-stone-900 font-['Space_Grotesk']">
                500+ Civil & Private Sites
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs by Product Type */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none border-b border-stone-200/80">
          {PROJECT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-sm ring-2 ring-amber-500/30'
                    : 'bg-white text-stone-600 hover:text-stone-950 hover:bg-stone-50 border border-stone-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-100 text-stone-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden hover:border-amber-400"
            >
              {/* Card Image Container */}
              <div 
                className="relative aspect-[16/10] overflow-hidden bg-stone-900 cursor-pointer"
                onClick={() => setActiveModalProject(project)}
                title="Click to view full case study and images"
              >
                <img
                  src={project.imageUrl}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== project.importedImage) {
                      target.src = project.importedImage;
                    }
                  }}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>

                {/* Top Category Badge & Zoom hint */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900/85 backdrop-blur-md border border-white/20 text-amber-300 font-mono text-[10px] sm:text-xs font-bold">
                    <Tag className="w-3 h-3" />
                    <span>{project.categoryLabel}</span>
                  </span>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProject(project);
                    }}
                    className="p-1.5 rounded-lg bg-stone-900/80 backdrop-blur-md text-white/90 hover:text-white border border-white/20 hover:bg-stone-900 transition-colors"
                    title="Expand Case Study"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                  <div className="flex items-center gap-1.5 text-xs text-stone-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Client & Date Row */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
                    <span className="flex items-center gap-1 font-semibold text-stone-700">
                      <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                      <span className="truncate max-w-[170px]">{project.client}</span>
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{project.completionDate}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setActiveModalProject(project)}
                    className="text-base sm:text-lg font-bold text-stone-900 font-['Space_Grotesk'] leading-snug group-hover:text-amber-700 transition-colors cursor-pointer mb-2.5"
                  >
                    {project.title}
                  </h3>

                  {/* Scope Summary */}
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2 mb-4">
                    {project.scopeSummary}
                  </p>

                  {/* Supplied Materials Tag List */}
                  <div className="mb-4">
                    <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-semibold mb-1.5">
                      Products Supplied:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.productsSupplied.slice(0, 2).map((item, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 text-[11px] font-medium border border-stone-200"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[200px]">{item}</span>
                        </span>
                      ))}
                      {project.productsSupplied.length > 2 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-500 text-[10px] font-mono">
                          +{project.productsSupplied.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-100 mb-4 text-xs">
                    {project.stats.slice(0, 2).map((st, i) => (
                      <div key={i} className="bg-stone-50 rounded-lg p-2 border border-stone-200/60">
                        <div className="text-[10px] text-stone-500 font-mono uppercase truncate">{st.label}</div>
                        <div className="text-xs font-bold text-stone-900 font-['Space_Grotesk'] truncate">{st.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>View Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={buildProjectWhatsAppUrl(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                    title="Inquire about this project on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Direct Action */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white p-6 sm:p-8 border border-stone-800 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>Direct Factory Supply & Crane Truck Placement</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk']">
              Planning a Road, Estate Fencing, or Drainage Project?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl">
              We provide KEBS-certified concrete test certificates, prompt site logistics, and specialized crane trucks for fast offloading directly to your trenches or property boundary.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            {onNavigateToQuote && (
              <button
                onClick={onNavigateToQuote}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Estimate Your Bill of Quantities</span>
              </button>
            )}
            
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsapp}?text=Hello%20Isinya%20Precast,%20I%20have%20an%20upcoming%20project%20and%20would%20like%20a%20site%20visit%20or%20quotation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Talk to Lead Civil Engineer</span>
            </a>
          </div>
        </div>
      </div>

      {/* Full Project Detail Modal */}
      {activeModalProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveModalProject(null)}
        >
          <div 
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-video w-full bg-stone-900 shrink-0">
              <img
                src={activeModalProject.imageUrl}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== activeModalProject.importedImage) {
                    target.src = activeModalProject.importedImage;
                  }
                }}
                alt={activeModalProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent"></div>

              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 hover:text-amber-400 transition-colors cursor-pointer border border-white/20"
                aria-label="Close Project Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-mono font-bold text-xs">
                    {activeModalProject.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-stone-300 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{activeModalProject.location}</span>
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    • {activeModalProject.completionDate}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] leading-tight">
                  {activeModalProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Client & Scope summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
                <div>
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">Client & Role</div>
                  <div className="font-bold text-stone-900 text-sm">{activeModalProject.client}</div>
                  <div className="text-stone-600">{activeModalProject.clientType}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">Engineering Standards</div>
                  <div className="font-bold text-emerald-800 text-sm flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>KEBS KS 02-30 / KS 02-31</span>
                  </div>
                </div>
              </div>

              {/* Project Scope Description */}
              <div>
                <h4 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Project Scope & Delivery Execution
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {activeModalProject.scopeSummary}
                </p>
              </div>

              {/* Products Supplied */}
              <div>
                <h4 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                  Precast Concrete Units Supplied
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalProject.productsSupplied.map((product, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-stone-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{product}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications Highlights */}
              <div>
                <h4 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Technical Specifications Applied
                </h4>
                <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-700">
                  {activeModalProject.specsSummary}
                </div>
              </div>

              {/* Key Project Statistics */}
              <div>
                <h4 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                  Key Project Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeModalProject.stats.map((st, i) => (
                    <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
                      <div className="text-[10px] text-stone-500 font-mono uppercase">{st.label}</div>
                      <div className="text-sm font-extrabold text-stone-900 font-['Space_Grotesk'] mt-0.5">{st.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Testimonial if available */}
              {activeModalProject.testimonial && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <div className="italic text-stone-800 leading-relaxed mb-2">
                    "{activeModalProject.testimonial.quote}"
                  </div>
                  <div className="font-bold text-stone-950">{activeModalProject.testimonial.author}</div>
                  <div className="text-stone-600 text-[11px]">{activeModalProject.testimonial.role}</div>
                </div>
              )}

              {/* Action Footer in Modal */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={buildProjectWhatsAppUrl(activeModalProject)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire About Similar Work on WhatsApp</span>
                </a>

                {onNavigateToQuote && (
                  <button
                    onClick={() => {
                      setActiveModalProject(null);
                      onNavigateToQuote();
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Custom Bill of Quantities</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
