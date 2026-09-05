import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Send, 
  Github, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Eye, 
  FileText,
  Info,
  HelpCircle,
  MessageSquare,
  Calculator,
  Calendar,
  Layers,
  Wand2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectEstimator } from './ProjectEstimator';
import { ConsultationForm } from './ConsultationForm';

interface ContactProps {
  selectedProjectType?: string;
}

type ContactTab = 'inquiry' | 'estimator' | 'consultation';
type DeliveryChannel = 'whatsapp' | 'email' | 'telegram';

interface ProjectTemplate {
  name: string;
  category: string;
  subject: string;
  message: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedProjectType }) => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<ContactTab>('inquiry');
  const [channel, setChannel] = useState<DeliveryChannel>('telegram');
  
  const [formData, setFormData] = useState({
    fullName: '',
    emailOrPhone: '',
    subject: '',
    projectType: selectedProjectType || 'Food Ordering System',
    message: ''
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastSentChannel, setLastSentChannel] = useState<DeliveryChannel>('telegram');
  const [submittedMessage, setSubmittedMessage] = useState<string>('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Quick Starter Templates for easy 1-click pre-fill
  const templates: ProjectTemplate[] = [
    {
      name: '🍽️ Food Ordering + Telebirr',
      category: 'Food Ordering System',
      subject: 'Restaurant Food Ordering Web App with Telebirr',
      message: 'We require a responsive digital menu ordering system for our restaurant. Needs customer shopping cart, automated Telebirr & CBE Birr checkout, delivery address capture, and an admin dashboard to view incoming orders in real-time.'
    },
    {
      name: '🦷 Dental / Clinic Booking',
      category: 'Booking & Reservation System',
      subject: 'Dental Care Clinic Patient Booking Portal',
      message: 'We are seeking a patient appointment booking web portal for our healthcare clinic. Must include treatment procedure overviews, doctor profiles, dynamic time slot booking with SMS/Telegram alerts, and intake form questionnaires.'
    },
    {
      name: '☕ Coffee Roastery E-Commerce',
      category: 'Full-Stack Web Application',
      subject: 'Specialty Ethiopian Coffee Roasters Store',
      message: 'Looking to build an artisanal coffee e-commerce store showcasing Ethiopian single-origin beans (Yirgacheffe, Sidama, Guji). Needs roast profile filters, retail bag checkout, wholesale inquiry form, and international shipping calculators.'
    },
    {
      name: '📚 Educational Academy',
      category: 'Educational & Learning Platform',
      subject: 'Bilingual Course Academy with RTL Support',
      message: 'We need an interactive educational academy platform supporting Arabic and English. Key requirements: course curriculum progress tracking, student enrollment, and downloadable dynamic PDF study sheets and certifications.'
    }
  ];

  // Sync if selectedProjectType prop changes
  React.useEffect(() => {
    if (selectedProjectType) {
      setFormData((prev) => ({ ...prev, projectType: selectedProjectType }));
    }
  }, [selectedProjectType]);

  const projectTypes = [
    'Food Ordering System',
    'Business Website',
    'Full-Stack Web Application',
    'Booking & Reservation System',
    'Educational & Learning Platform',
    'Analytics & Management Dashboard',
    'Custom System & Database',
    'Other Inquiries'
  ];

  const applyTemplate = (template: ProjectTemplate) => {
    setFormData((prev) => ({
      ...prev,
      projectType: template.category,
      subject: template.subject,
      message: template.message
    }));
  };

  const handleApplyFromEstimator = (summary: { projectType: string; subject: string; message: string }) => {
    setFormData((prev) => ({
      ...prev,
      projectType: summary.projectType,
      subject: summary.subject,
      message: summary.message
    }));
    setActiveTab('inquiry');
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const getFormattedMessage = () => {
    const sender = formData.fullName.trim() || '[Your Name / Business]';
    const contactInfo = formData.emailOrPhone.trim() || '[Your Email / Phone / Telegram]';
    const subj = formData.subject.trim() || '[Project Subject]';
    const proj = formData.projectType || 'Food Ordering System';
    const msg = formData.message.trim() || '[Your Project Requirements and Specifications...]';

    return `👋 Hello Imran!

👤 Client Name: ${sender}
📞 Contact Info: ${contactInfo}
💼 Project Type: ${proj}
📌 Subject: ${subj}

📝 Project Requirements & Specifications:
${msg}

---
Sent to Imran Kedir (Full-Stack Developer, Addis Ababa)`;
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name or company name';
    if (!formData.emailOrPhone.trim()) {
      errors.emailOrPhone = 'Please enter your email, phone number, or Telegram handle';
    }
    if (!formData.subject.trim()) errors.subject = 'Please provide a descriptive project title';
    if (!formData.message.trim() || formData.message.length < 8) {
      errors.message = 'Please provide requirements with at least 8 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setLastSentChannel(channel);

    const fullMessageText = getFormattedMessage();
    setSubmittedMessage(fullMessageText);

    try {
      navigator.clipboard.writeText(fullMessageText);
    } catch {
      // fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      if (channel === 'telegram') {
        const encoded = encodeURIComponent(fullMessageText);
        window.open(`https://t.me/imranka641?text=${encoded}`, '_blank');
      } else if (channel === 'whatsapp') {
        const encoded = encodeURIComponent(fullMessageText);
        window.open(`https://wa.me/251913841757?text=${encoded}`, '_blank');
      } else if (channel === 'email') {
        const mailtoSubject = encodeURIComponent(`[${formData.projectType}] ${formData.subject} - from ${formData.fullName}`);
        const mailtoBody = encodeURIComponent(fullMessageText);
        window.location.href = `mailto:imranka641@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      }
    }, 450);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            {t.contact.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            {t.contact.subtitle}
          </p>

          {/* Direct Response Guarantee Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{t.contact.fastResponseSub}</span>
          </div>
        </div>

        {/* 3-Form Navigation Mode Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('inquiry')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'inquiry'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>1. Direct Project Inquiry Form</span>
            </button>

            <button
              onClick={() => setActiveTab('estimator')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'estimator'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>2. Architecture & Scope Estimator</span>
            </button>

            <button
              onClick={() => setActiveTab('consultation')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'consultation'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>3. 20-Min Discovery Call Scheduler</span>
            </button>
          </div>
        </div>

        {/* Tab 2: Architecture & Scope Estimator */}
        {activeTab === 'estimator' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ProjectEstimator onApplyToContactForm={handleApplyFromEstimator} />
          </motion.div>
        )}

        {/* Tab 3: Consultation Scheduler Form */}
        {activeTab === 'consultation' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ConsultationForm />
          </motion.div>
        )}

        {/* Tab 1: Primary Direct Project Inquiry Form */}
        {activeTab === 'inquiry' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            
            {/* Left Column (5 Cols): Direct Contacts & Channel Specifications */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Form Description Box */}
              <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-neutral-700 dark:text-neutral-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-cyan-700 dark:text-cyan-400 text-sm">
                  <Info className="w-4 h-4" />
                  <span>About This Inquiry Form</span>
                </div>
                <p className="leading-relaxed">
                  This form translates your business ideas into a structured technical brief. When submitted, it pre-fills directly into your chosen direct messaging app (Telegram, WhatsApp, or Email) with formatted specifications, ensuring prompt communication without server delays.
                </p>
              </div>

              {/* Direct Telegram Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-cyan-500/40 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Telegram Direct</span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">@imranka641</h4>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('@imranka641', 'telegram')}
                    className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs flex items-center gap-1"
                    title="Copy Telegram handle"
                  >
                    {copiedField === 'telegram' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <a
                  href="https://t.me/imranka641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-center text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Chat on Telegram (@imranka641)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">WhatsApp / Phone</span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">+251 913 841 757</h4>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('+251913841757', 'phone')}
                    className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs flex items-center gap-1"
                    title="Copy phone number"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <a
                  href="https://wa.me/251913841757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-center text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Chat on WhatsApp (+251 913 841 757)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Email Address</span>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white">imranka641@gmail.com</h4>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('imranka641@gmail.com', 'email')}
                    className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs flex items-center gap-1"
                    title="Copy email"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <a
                  href="mailto:imranka641@gmail.com"
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-center text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Send Direct Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* GitHub Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">GitHub Profile</span>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">github.com/imranka641</h4>
                  </div>
                </div>
                <a
                  href="https://github.com/imranka641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-center text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore 10+ Repositories</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Right Column (7 Cols): The Described Form & Message Preparation */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 shadow-xl">
                
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {t.contact.sendMessage}
                    </h3>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                      Live Message Routing
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Fill out the fields below to structure your software brief. Hover or read each field description to understand how it shapes your project proposal.
                  </p>
                </div>

                {/* Quick Pre-Fill Templates */}
                <div className="mb-6 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 mb-2">
                    <Wand2 className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Quick-Fill Project Templates:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {templates.map((tmpl) => (
                      <button
                        key={tmpl.name}
                        type="button"
                        onClick={() => applyTemplate(tmpl)}
                        className="px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 text-neutral-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        {tmpl.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 1: Channel Selector with Descriptions */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                      {t.contact.chooseOption}
                    </label>
                    <span className="text-[11px] text-neutral-500">Pick preferred app</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-2.5">
                    Select where you want your inquiry sent. Telegram offers instant direct message dispatch with zero delay.
                  </p>

                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Option 1: Telegram */}
                    <button
                      type="button"
                      onClick={() => setChannel('telegram')}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        channel === 'telegram'
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 ring-2 ring-cyan-500/30'
                          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-1.5 rounded-lg ${channel === 'telegram' ? 'bg-cyan-500 text-white' : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'}`}>
                          <Send className="w-4 h-4" />
                        </div>
                        {channel === 'telegram' && <Check className="w-4 h-4 text-cyan-500" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold">{t.contact.telegram}</div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate" dir="ltr">@imranka641</div>
                      </div>
                    </button>

                    {/* Option 2: WhatsApp */}
                    <button
                      type="button"
                      onClick={() => setChannel('whatsapp')}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        channel === 'whatsapp'
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/30'
                          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-1.5 rounded-lg ${channel === 'whatsapp' ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
                          <Phone className="w-4 h-4" />
                        </div>
                        {channel === 'whatsapp' && <Check className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold">{t.contact.whatsapp}</div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate" dir="ltr">+251 913 841 757</div>
                      </div>
                    </button>

                    {/* Option 3: Email */}
                    <button
                      type="button"
                      onClick={() => setChannel('email')}
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        channel === 'email'
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500/30'
                          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-1.5 rounded-lg ${channel === 'email' ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
                          <Mail className="w-4 h-4" />
                        </div>
                        {channel === 'email' && <Check className="w-4 h-4 text-emerald-500" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold">{t.contact.email}</div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate" dir="ltr">imranka641@...</div>
                      </div>
                    </button>
                  </div>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 sm:p-8 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 space-y-5"
                  >
                    <div className="text-center space-y-2">
                      <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-neutral-900 dark:text-white">
                        Message Prepared for {lastSentChannel.toUpperCase()}!
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-neutral-900 dark:text-white">{formData.fullName}</strong>! Below is your formatted inquiry. It has been copied to your clipboard and opened in {lastSentChannel}.
                      </p>
                    </div>

                    {/* Appearing Message Content Box */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-cyan-500" />
                          <span>Generated Message Payload:</span>
                        </span>
                        <button
                          onClick={() => handleCopy(submittedMessage, 'submitted_msg')}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 text-cyan-600 dark:text-cyan-400 text-xs font-semibold flex items-center gap-1 shadow-sm"
                        >
                          {copiedField === 'submitted_msg' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Message</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-cyan-500/30 text-xs font-mono text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed shadow-inner max-h-60 overflow-y-auto">
                        {submittedMessage}
                      </div>
                    </div>

                    {/* Direct Action Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {lastSentChannel === 'telegram' && (
                        <>
                          <a
                            href={`https://t.me/imranka641?text=${encodeURIComponent(submittedMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center justify-center gap-2 shadow-md"
                          >
                            <Send className="w-4 h-4" />
                            <span>Open in Telegram (@imranka641)</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleCopy(submittedMessage, 'submitted_msg')}
                            className="py-3 px-4 rounded-xl text-xs font-bold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors flex items-center justify-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            <span>Copy Full Text</span>
                          </button>
                        </>
                      )}

                      {lastSentChannel === 'whatsapp' && (
                        <a
                          href={`https://wa.me/251913841757?text=${encodeURIComponent(submittedMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="col-span-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-md"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Open in WhatsApp (+251 913 841 757)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {lastSentChannel === 'email' && (
                        <a
                          href={`mailto:imranka641@gmail.com?subject=${encodeURIComponent(`[${formData.projectType}] ${formData.subject}`)}&body=${encodeURIComponent(submittedMessage)}`}
                          className="col-span-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-md"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Send via Email Client</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="text-center pt-2">
                      <button
                        onClick={() => {
                          setSubmitSuccess(false);
                          setFormData({
                            fullName: '',
                            emailOrPhone: '',
                            subject: '',
                            projectType: 'Food Ordering System',
                            message: ''
                          });
                        }}
                        className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white underline cursor-pointer"
                      >
                        ← Compose another inquiry
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                      {t.contact.provideDetails}
                    </div>

                    {/* Field: Full Name & Email/Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Full Name */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                            {t.contact.fullName} <span className="text-rose-500">*</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={t.contact.namePlaceholder}
                          className={`w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border ${
                            formErrors.fullName ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-800'
                          } text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                        />
                        <p className="text-[11px] text-neutral-500 mt-1">
                          Individual or company entity name for formal milestone proposals.
                        </p>
                        {formErrors.fullName && (
                          <p className="text-xs text-rose-500 mt-0.5">{formErrors.fullName}</p>
                        )}
                      </div>

                      {/* Email / Phone / Telegram Handle */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                            {t.contact.emailOrPhone} <span className="text-rose-500">*</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          value={formData.emailOrPhone}
                          onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                          placeholder={t.contact.emailOrPhonePlaceholder}
                          className={`w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border ${
                            formErrors.emailOrPhone ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-800'
                          } text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                        />
                        <p className="text-[11px] text-neutral-500 mt-1">
                          Where Imran should dispatch quotes, repository access, and project roadmaps.
                        </p>
                        {formErrors.emailOrPhone && (
                          <p className="text-xs text-rose-500 mt-0.5">{formErrors.emailOrPhone}</p>
                        )}
                      </div>
                    </div>

                    {/* Field: Subject & Project Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Subject */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                            {t.contact.projectSubject} <span className="text-rose-500">*</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder={t.contact.subjectPlaceholder}
                          className={`w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border ${
                            formErrors.subject ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-800'
                          } text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                        />
                        <p className="text-[11px] text-neutral-500 mt-1">
                          A concise summary describing the purpose or scope of the system.
                        </p>
                        {formErrors.subject && (
                          <p className="text-xs text-rose-500 mt-0.5">{formErrors.subject}</p>
                        )}
                      </div>

                      {/* Project Type Selector */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                            {t.contact.projectCategory}
                          </label>
                        </div>
                        <select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        >
                          {projectTypes.map((type) => (
                            <option key={type} value={type} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
                              {type}
                            </option>
                          ))}
                        </select>
                        <p className="text-[11px] text-neutral-500 mt-1">
                          Helps recommend optimal database schemas and architecture patterns.
                        </p>
                      </div>
                    </div>

                    {/* Field: Message */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                          {t.contact.message} <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[11px] text-neutral-500">Min 8 chars</span>
                      </div>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.contact.messagePlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border ${
                          formErrors.message ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-800'
                        } text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none`}
                      />
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Include core features (e.g. Telebirr payments, admin portal), target launch date, and any reference websites.
                      </p>
                      {formErrors.message && (
                        <p className="text-xs text-rose-500 mt-0.5">{formErrors.message}</p>
                      )}
                    </div>

                    {/* Real-time Message Appearance Preview */}
                    <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-950/90 border border-neutral-200 dark:border-neutral-800 p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-mono font-semibold text-neutral-600 dark:text-neutral-400">
                          <Eye className="w-3.5 h-3.5 text-cyan-500" />
                          <span>Real-Time Formatted Preview:</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                          Target: {channel === 'telegram' ? '@imranka641 (Telegram)' : channel === 'whatsapp' ? '+251 913 841 757 (WhatsApp)' : 'imranka641@gmail.com (Email)'}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap bg-white dark:bg-neutral-900 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800/80 max-h-32 overflow-y-auto" dir="ltr">
                        {getFormattedMessage()}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 disabled:opacity-50 transition-all shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <span>{t.contact.sendBtn}</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
};
