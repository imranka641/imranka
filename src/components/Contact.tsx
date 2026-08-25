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
  FileText 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactProps {
  selectedProjectType?: string;
}

type DeliveryChannel = 'whatsapp' | 'email' | 'telegram';

export const Contact: React.FC<ContactProps> = ({ selectedProjectType }) => {
  const { t, isRTL } = useLanguage();
  // Step 1: Channel selection (WhatsApp, Email, or Telegram)
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

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const getFormattedMessage = () => {
    const sender = formData.fullName.trim() || '[Your Name]';
    const contactInfo = formData.emailOrPhone.trim() || '[Your Email / Phone]';
    const subj = formData.subject.trim() || '[Project Subject]';
    const proj = formData.projectType || 'Food Ordering System';
    const msg = formData.message.trim() || '[Your Project Requirements and Details...]';

    return `👋 Hello Imran!

👤 Client Name: ${sender}
📞 Contact Info: ${contactInfo}
💼 Project Type: ${proj}
📌 Subject: ${subj}

📝 Project Requirements / Message:
${msg}

---
Sent to Imran Kedir (Full-Stack Developer)`;
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.emailOrPhone.trim()) {
      errors.emailOrPhone = 'Please enter your email address or phone number';
    }
    if (!formData.subject.trim()) errors.subject = 'Please enter a project subject';
    if (!formData.message.trim() || formData.message.length < 8) {
      errors.message = 'Please provide a message with at least 8 characters';
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

    // Automatically copy message to clipboard so user can instantly paste in DM
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
        // Triggers direct deep link to Imran Kedir's Telegram account with pre-filled message
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            {t.contact.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Communication Cards & Account Details */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick response badge */}
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">{t.contact.fastResponse}</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">{t.contact.fastResponseSub}</div>
              </div>
            </div>

            {/* Telegram Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-cyan-500/50 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Telegram Account</span>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">@imranka641</h4>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy('@imranka641', 'telegram')}
                  className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs flex items-center gap-1"
                  title="Copy telegram handle"
                >
                  {copiedField === 'telegram' ? <Check className="w-4 h-4 text-cyan-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <a
                href="https://t.me/imranka641"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-center text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Direct Telegram (@imranka641)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* WhatsApp / Phone Card */}
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
                <span>Direct WhatsApp (+251 913 841 757)</span>
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
                <span>Direct Mail (imranka641@gmail.com)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* GitHub Profile Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-700 transition-all">
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
                <span>Explore GitHub Repositories</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: 3-Channel Interactive Message Form + Live Message Appearance */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-xl backdrop-blur-sm">
              
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
                  Select your channel below. When sending via Telegram, your formatted message appears immediately and copies directly to your chat with @imranka641.
                </p>
              </div>

              {/* Step 1: 3 Direct Channel Options (MANDATORY SELECTION) */}
              <div className="mb-6">
                <label className="block text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2.5">
                  {t.contact.chooseOption}
                </label>
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
                      {channel === 'telegram' && (
                        <Check className="w-4 h-4 text-cyan-500" />
                      )}
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
                      {channel === 'whatsapp' && (
                        <Check className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{t.contact.whatsapp}</div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate" dir="ltr">+251 913 841 757</div>
                    </div>
                  </button>

                  {/* Option 3: Email / Gmail */}
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
                      {channel === 'email' && (
                        <Check className="w-4 h-4 text-emerald-500" />
                      )}
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
                      Message Prepared & Appeared for {lastSentChannel.toUpperCase()}!
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-neutral-900 dark:text-white">{formData.fullName}</strong>! Below is your complete formatted message ready for Imran Kedir (@imranka641).
                    </p>
                  </div>

                  {/* APPEARING MESSAGE CONTENT BOX */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-cyan-500" />
                        <span>Transmitted Message Content:</span>
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

                  {/* Direct Telegram / Channel Action Links */}
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
                          <span>Send Pre-Filled via @imranka641</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href="https://t.me/imranka641"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-3 px-4 rounded-xl text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 transition-colors flex items-center justify-center gap-2"
                        >
                          <span>Open Direct Profile (@imranka641)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
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
                        <span>Open WhatsApp (+251 913 841 757)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {lastSentChannel === 'email' && (
                      <a
                        href={`mailto:imranka641@gmail.com?subject=${encodeURIComponent(`[${formData.projectType}] ${formData.subject}`)}&body=${encodeURIComponent(submittedMessage)}`}
                        className="col-span-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-md"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send via Email Client (imranka641@gmail.com)</span>
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
                      ← Compose another message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                    {t.contact.provideDetails}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                        {t.contact.fullName} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t.contact.namePlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border ${
                          formErrors.fullName ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-800'
                        } text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                      />
                      {formErrors.fullName && (
                        <p className="text-xs text-rose-500 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Email / Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                        {t.contact.emailOrPhone} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.emailOrPhone}
                        onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                        placeholder={t.contact.emailOrPhonePlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border ${
                          formErrors.emailOrPhone ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-800'
                        } text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                      />
                      {formErrors.emailOrPhone && (
                        <p className="text-xs text-rose-500 mt-1">{formErrors.emailOrPhone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                        {t.contact.projectSubject} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={t.contact.subjectPlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border ${
                          formErrors.subject ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-800'
                        } text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all`}
                      />
                      {formErrors.subject && (
                        <p className="text-xs text-rose-500 mt-1">{formErrors.subject}</p>
                      )}
                    </div>

                    {/* Project Type Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                        {t.contact.projectCategory}
                      </label>
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
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
                      {t.contact.message} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.messagePlaceholder}
                      className={`w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border ${
                        formErrors.message ? 'border-rose-500' : 'border-neutral-300 dark:border-neutral-800'
                      } text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none`}
                    />
                    {formErrors.message && (
                      <p className="text-xs text-rose-500 mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  {/* REAL-TIME APPEARING MESSAGE PREVIEW */}
                  <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-950/90 border border-neutral-200 dark:border-neutral-800 p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-mono font-semibold text-neutral-600 dark:text-neutral-400">
                        <Eye className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Live Message Preview:</span>
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

        </div>

      </div>
    </section>
  );
};
