import React, { useState } from 'react';
import { 
  Calculator, 
  Layers, 
  Check, 
  Sparkles, 
  Clock, 
  Send, 
  Smartphone, 
  ShieldCheck, 
  Database, 
  Globe, 
  ArrowRight,
  Info,
  HelpCircle,
  CheckCircle2,
  Calendar,
  Zap
} from 'lucide-react';

interface ProjectEstimatorProps {
  onApplyToContactForm?: (summary: {
    projectType: string;
    subject: string;
    message: string;
  }) => void;
}

interface FeatureOption {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'payments' | 'admin' | 'advanced';
  timelineWeeks: number;
  complexity: 'Low' | 'Medium' | 'High';
}

const DOMAIN_OPTIONS = [
  {
    id: 'food-ordering',
    title: 'Food Ordering & Delivery System',
    description: 'Complete digital menu catalog, customer shopping cart, Ethiopian Telebirr & CBE Birr gateway, and real-time kitchen order tracking.',
    defaultCategory: 'Food Ordering System',
    baseWeeks: 3,
    techStack: 'PHP, MySQL, JavaScript, Telebirr API, Tailwind CSS'
  },
  {
    id: 'healthcare-booking',
    title: 'Clinic & Healthcare Appointment Portal',
    description: 'Patient consultation intake, procedure education guides, doctor roster, and real-time appointment booking slots.',
    defaultCategory: 'Booking & Reservation System',
    baseWeeks: 2.5,
    techStack: 'React, TypeScript, Tailwind CSS, Slot Scheduling Engine'
  },
  {
    id: 'ecommerce-retail',
    title: 'Specialty Retail & E-Commerce Store',
    description: 'Product showcases with variant selectors, inventory management, customer checkout, and automated receipts.',
    defaultCategory: 'Full-Stack Web Application',
    baseWeeks: 3,
    techStack: 'React, Node.js / PHP, MySQL / PostgreSQL, REST APIs'
  },
  {
    id: 'edtech-learning',
    title: 'Educational Academy & Course Platform',
    description: 'Bilingual Arabic & English course syllabi, module progression, student enrollment, and downloadable study resources.',
    defaultCategory: 'Educational & Learning Platform',
    baseWeeks: 3.5,
    techStack: 'React, TypeScript, RTL Support, PDF Generation, Tailwind CSS'
  },
  {
    id: 'custom-dashboard',
    title: 'Business Operations & Management Dashboard',
    description: 'Back-office admin portal to monitor analytics, track inventory, update customer records, and generate audit reports.',
    defaultCategory: 'Analytics & Management Dashboard',
    baseWeeks: 3,
    techStack: 'React, TypeScript, Recharts, Role-Based Access Control'
  }
];

const FEATURE_OPTIONS: FeatureOption[] = [
  {
    id: 'telebirr-cbe',
    name: 'Telebirr & CBE Birr Payment Gateways',
    description: 'Native Ethiopian digital payment gateway integration for automated transaction verification and instant receipt confirmations.',
    category: 'payments',
    timelineWeeks: 1,
    complexity: 'Medium'
  },
  {
    id: 'admin-dashboard',
    name: 'Admin Back-Office Operations Portal',
    description: 'Restricted administrative dashboard to add, edit, or delete items, manage orders/bookings, and view customer logs.',
    category: 'admin',
    timelineWeeks: 1,
    complexity: 'Medium'
  },
  {
    id: 'multilingual-rtl',
    name: 'Multilingual Support (English, Amharic, Arabic)',
    description: 'Complete multi-language localization with right-to-left (RTL) Arabic layout rendering and Ethiopic script typography.',
    category: 'advanced',
    timelineWeeks: 0.5,
    complexity: 'Low'
  },
  {
    id: 'telegram-alerts',
    name: 'Automated Telegram / SMS Order Alerts',
    description: 'Instant automated notification bot sending incoming order alerts and customer status changes directly to your phone.',
    category: 'advanced',
    timelineWeeks: 0.5,
    complexity: 'Medium'
  },
  {
    id: 'relational-database',
    name: 'Custom Relational Schema (MySQL / PostgreSQL)',
    description: 'Normalized database design with relational integrity, foreign key constraints, indexes, and optimized query execution.',
    category: 'core',
    timelineWeeks: 1,
    complexity: 'Medium'
  },
  {
    id: 'pdf-generation',
    name: 'Dynamic PDF Statement & Invoice Generation',
    description: 'Client-side or server-side printable PDF generation for formal customer receipts, estate statements, or course syllabi.',
    category: 'advanced',
    timelineWeeks: 0.5,
    complexity: 'Low'
  }
];

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onApplyToContactForm }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('food-ordering');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['telebirr-cbe', 'admin-dashboard']);
  const [timelineUrgency, setTimelineUrgency] = useState<'standard' | 'accelerated'>('standard');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const currentDomain = DOMAIN_OPTIONS.find(d => d.id === selectedDomain) || DOMAIN_OPTIONS[0];

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculate estimated timeline
  const baseWeeks = currentDomain.baseWeeks;
  const additionalWeeks = selectedFeatures.reduce((total, featId) => {
    const feat = FEATURE_OPTIONS.find(f => f.id === featId);
    return total + (feat ? feat.timelineWeeks * 0.75 : 0);
  }, 0);

  const calculatedTotalWeeks = Math.ceil(baseWeeks + additionalWeeks);
  const finalWeeks = timelineUrgency === 'accelerated' 
    ? Math.max(2, Math.round(calculatedTotalWeeks * 0.7)) 
    : calculatedTotalWeeks;

  const generatedEstimateText = `📋 Project Scope & Architecture Estimate:
• Domain: ${currentDomain.title}
• Architecture & Tech Stack: ${currentDomain.techStack}
• Estimated Timeline: ~${finalWeeks} Weeks (${timelineUrgency === 'accelerated' ? 'Accelerated Delivery' : 'Standard Sprint'})
• Selected Features:
${selectedFeatures.map(fId => {
  const f = FEATURE_OPTIONS.find(opt => opt.id === fId);
  return `  - ${f?.name}: ${f?.description}`;
}).join('\n')}
${clientNotes ? `• Specific Client Goals: ${clientNotes}` : ''}`;

  const handleApply = () => {
    if (onApplyToContactForm) {
      onApplyToContactForm({
        projectType: currentDomain.defaultCategory,
        subject: `Inquiry: ${currentDomain.title} (~${finalWeeks} wks scope)`,
        message: `Hello Imran,\n\nI configured an estimate using your Project Architecture Estimator:\n\n${generatedEstimateText}\n\nCould we discuss this project scope and finalize the development roadmap?`
      });
      // Scroll to contact form smoothly
      const contactElem = document.getElementById('contact-form-section') || document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEstimateText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleDirectTelegram = () => {
    const encoded = encodeURIComponent(`👋 Hello Imran! Here is my estimated project configuration:\n\n${generatedEstimateText}`);
    window.open(`https://t.me/imranka641?text=${encoded}`, '_blank');
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl">
      {/* Header with Form Description */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Architecture & Scope Estimator</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
          Configure Your Project Architecture & Timeline
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
          Use this interactive planning form to evaluate your desired software architecture, feature modules, and target delivery speed. Each selection provides real-world engineering specifications and automatically calculates your estimated milestone timeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: Form Controls & Field Descriptions */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Select Domain */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 inline-flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Select Project Domain / Architecture</span>
              </label>
              <span className="text-[11px] text-neutral-500">Defines base system complexity</span>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              Choose the primary business sector for your software. Each architecture includes domain-specific schemas, API endpoints, and user interfaces.
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              {DOMAIN_OPTIONS.map((opt) => {
                const isSelected = selectedDomain === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedDomain(opt.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500 text-neutral-900 dark:text-white shadow-sm'
                        : 'bg-neutral-50 dark:bg-neutral-950/60 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold flex items-center gap-2">
                        <span>{opt.title}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                      <div className="mt-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                        Stack: {opt.techStack}
                      </div>
                    </div>

                    <span className="shrink-0 text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      ~{opt.baseWeeks} wks base
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-500 inline-flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Select Feature Modules & Integrations</span>
              </label>
              <span className="text-[11px] text-neutral-500">{selectedFeatures.length} selected</span>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
              Check all the specialized capabilities required for your project. Each option displays technical details and operational benefits.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {FEATURE_OPTIONS.map((feat) => {
                const isSelected = selectedFeatures.includes(feat.id);
                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/60 shadow-sm'
                        : 'bg-neutral-50 dark:bg-neutral-950/60 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                          {feat.name}
                        </span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isSelected ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-neutral-400 dark:border-neutral-600'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-normal">
                        {feat.description}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>Complexity: {feat.complexity}</span>
                      <span className="text-cyan-600 dark:text-cyan-400">+{feat.timelineWeeks} wk</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Timeline Urgency */}
          <div>
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 inline-flex items-center justify-center text-[10px] font-bold">3</span>
              <span>Select Delivery Pace & Timeline</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTimelineUrgency('standard')}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  timelineUrgency === 'standard'
                    ? 'bg-amber-500/10 border-amber-500 text-neutral-900 dark:text-white'
                    : 'bg-neutral-50 dark:bg-neutral-950/60 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Standard Milestone Sprint</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Balanced iterations with milestone reviews, UI feedback cycles, and comprehensive QA testing.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setTimelineUrgency('accelerated')}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  timelineUrgency === 'accelerated'
                    ? 'bg-amber-500/10 border-amber-500 text-neutral-900 dark:text-white'
                    : 'bg-neutral-50 dark:bg-neutral-950/60 border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Accelerated Priority Sprint</span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                  Dedicated high-tempo sprint for urgent launches, prioritized feature rollout, and daily commits.
                </p>
              </button>
            </div>
          </div>

          {/* Optional specific notes */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
              Custom Objectives or Requirements (Optional)
            </label>
            <input
              type="text"
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder="e.g. Needs to support 500 daily restaurant orders, or connect with existing inventory..."
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

        </div>

        {/* Right 5 Columns: Live Architecture & Scope Summary Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono uppercase font-bold tracking-wider text-emerald-400">
                  Live Scope Analysis
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                Specification
              </span>
            </div>

            {/* Timeline Result Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800/90 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">Estimated Milestone Delivery</span>
                <div className="text-2xl font-black text-white flex items-center gap-1.5 mt-0.5">
                  <span>~{finalWeeks} Weeks</span>
                  <span className="text-xs font-normal text-emerald-400">
                    ({timelineUrgency === 'accelerated' ? 'Sprint Mode' : 'Standard Sprint'})
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Calendar className="w-5 h-5" />
              </div>
            </div>

            {/* Summary Details */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start justify-between gap-2 border-b border-neutral-900 pb-2">
                <span className="text-neutral-400 font-medium">Selected Domain:</span>
                <span className="text-white font-semibold text-right">{currentDomain.title}</span>
              </div>

              <div className="flex items-start justify-between gap-2 border-b border-neutral-900 pb-2">
                <span className="text-neutral-400 font-medium">Primary Tech Stack:</span>
                <span className="text-emerald-300 font-mono text-right text-[11px]">{currentDomain.techStack}</span>
              </div>

              <div className="flex items-start justify-between gap-2 border-b border-neutral-900 pb-2">
                <span className="text-neutral-400 font-medium">Included Feature Modules:</span>
                <span className="text-cyan-400 font-semibold">{selectedFeatures.length} Active Modules</span>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                Deliverable Blueprint:
              </span>
              {selectedFeatures.map((fId) => {
                const feat = FEATURE_OPTIONS.find(f => f.id === fId);
                if (!feat) return null;
                return (
                  <div key={fId} className="flex items-center gap-2 text-[11px] text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="line-clamp-1">{feat.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <span>Transfer Specifications to Contact Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDirectTelegram}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Telegram</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Info className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Copied Specs!' : 'Copy Summary'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Guarantee / Response Note */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
            <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Direct Developer Assessment</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every estimate submitted to Imran Kedir receives personal review. You will receive an exact breakdown with architecture diagrams, API specifications, and payment gateway onboarding guidelines.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
