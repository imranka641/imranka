import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Printer,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Code,
  Database,
  CheckCircle2,
  Share2,
  Terminal,
  Cpu,
  ZoomIn,
  ZoomOut,
  Loader2
} from 'lucide-react';
import { CV_DATA, generateMarkdownCV } from '../data/cvData';
import { downloadCVPdf, getModern1PageHtml } from '../utils/pdfGenerator';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'modern' | 'interactive' | 'ats' | 'markdown'>('modern');
  const [filterType, setFilterType] = useState<string>('All');
  const [copied, setCopied] = useState(false);
  const [pdfZoom, setPdfZoom] = useState<number>(100);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = generateMarkdownCV(CV_DATA);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFile = (type: 'md' | 'txt') => {
    const text = generateMarkdownCV(CV_DATA);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Imran_Kedir_FullStack_Developer_CV.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHtml = () => {
    const htmlContent = getModern1PageHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Imran_Kedir_FullStack_Developer_CV_1Page.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDirectDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await downloadCVPdf();
    } catch (err) {
      console.error('PDF download error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    // If not on modern 1-page tab, switch to modern tab for guaranteed 1-page PDF
    if (activeTab !== 'modern' && activeTab !== 'ats') {
      setActiveTab('modern');
      setTimeout(() => window.print(), 150);
    } else {
      window.print();
    }
  };

  const filteredExperiences = CV_DATA.experiences.filter((exp) => {
    if (filterType === 'All') return true;
    if (filterType === 'Full-Stack') return exp.type === 'Full-Stack';
    if (filterType === 'Frontend') return exp.type === 'Frontend';
    if (filterType === 'Freelance') return exp.type === 'Freelance / Contract';
    return true;
  });

  return (
    <AnimatePresence>
      <div 
        id="cv-provider-modal"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 print:p-0 print:bg-white print:static print:overflow-visible"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none print:w-full print:rounded-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Controls (Hidden during print) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200 bg-neutral-950/70 dark:bg-neutral-950/90 light:bg-neutral-50/90 backdrop-blur-md sticky top-0 z-20 print:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                    Imran Kedir — Curriculum Vitae
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    1-Page Modern PDF Ready
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Full-Stack Web Developer • React, Node.js, PHP, MySQL, TypeScript
                </p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Copy Plaintext */}
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-800/80 dark:bg-neutral-800 light:bg-neutral-100 hover:bg-neutral-700 dark:hover:bg-neutral-700 border border-neutral-700/60 dark:border-neutral-700 light:border-neutral-200 transition-colors shadow-sm"
                title="Copy markdown / plain-text CV"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              {/* Download Standalone HTML (PDF-Ready) */}
              <button
                onClick={handleDownloadHtml}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-800/80 dark:bg-neutral-800 light:bg-neutral-100 hover:bg-neutral-700 dark:hover:bg-neutral-700 border border-neutral-700/60 dark:border-neutral-700 light:border-neutral-200 transition-colors shadow-sm"
                title="Download Standalone 1-Page HTML"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">HTML</span>
              </button>

              {/* Download MD / TXT */}
              <div className="inline-flex rounded-xl shadow-sm">
                <button
                  onClick={() => handleDownloadFile('md')}
                  className="inline-flex items-center gap-1 px-2.5 py-2 rounded-l-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-800/80 dark:bg-neutral-800 light:bg-neutral-100 hover:bg-neutral-700 dark:hover:bg-neutral-700 border border-neutral-700/60 dark:border-neutral-700 light:border-neutral-200 transition-colors"
                  title="Download .MD file"
                >
                  <Download className="w-3 h-3 text-cyan-400" />
                  <span>.MD</span>
                </button>
                <button
                  onClick={() => handleDownloadFile('txt')}
                  className="inline-flex items-center gap-1 px-2.5 py-2 rounded-r-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-800/80 dark:bg-neutral-800 light:bg-neutral-100 hover:bg-neutral-700 dark:hover:bg-neutral-700 border-t border-b border-r border-neutral-700/60 dark:border-neutral-700 light:border-neutral-200 transition-colors"
                  title="Download .TXT file"
                >
                  <span>.TXT</span>
                </button>
              </div>

              {/* Direct Save / Download PDF Button */}
              <button
                onClick={handleDirectDownloadPdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-75 disabled:cursor-not-allowed shadow-md shadow-emerald-600/25 transition-all hover:scale-105"
                title="Download 1-Page PDF Document"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>

              {/* Print / System Dialog */}
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-800/80 dark:bg-neutral-800 light:bg-neutral-100 hover:bg-neutral-700 dark:hover:bg-neutral-700 border border-neutral-700/60 dark:border-neutral-700 light:border-neutral-200 transition-colors shadow-sm"
                title="Open browser print dialog"
              >
                <Printer className="w-3.5 h-3.5 text-neutral-400" />
                <span className="hidden sm:inline">Print</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-800 light:hover:bg-neutral-100 transition-colors ml-1"
                aria-label="Close CV"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* View Mode Navigation Tabs (Hidden during print) */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-neutral-950/40 dark:bg-neutral-950/60 light:bg-neutral-100/60 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200 print:hidden overflow-x-auto">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('modern')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'modern'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1-Page Modern PDF</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-700 text-white font-mono">
                  Exact 1-Page
                </span>
              </button>

              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'interactive'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Interactive Explorer
              </button>

              <button
                onClick={() => setActiveTab('ats')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'ats'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Standard ATS View
              </button>

              <button
                onClick={() => setActiveTab('markdown')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === 'markdown'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                Plaintext / Markdown
              </button>
            </div>

            {/* Zoom / Viewport controls for Modern View */}
            {activeTab === 'modern' && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
                <span className="text-[11px] font-mono">Zoom:</span>
                <button
                  onClick={() => setPdfZoom((prev) => Math.max(75, prev - 10))}
                  className="p-1 rounded hover:bg-neutral-800 text-neutral-300"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] w-10 text-center">{pdfZoom}%</span>
                <button
                  onClick={() => setPdfZoom((prev) => Math.min(125, prev + 10))}
                  className="p-1 rounded hover:bg-neutral-800 text-neutral-300"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPdfZoom(100)}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 hover:text-white"
                  title="Reset Zoom"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Modal Body / Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 space-y-6 print:p-0 print:overflow-visible print:space-y-0">
            
            {/* ========================================================================= */}
            {/* 1. ONE-PAGE MODERN CV (A4 PDF OPTIMIZED - GUARANTEED 1-PAGE OUTPUT) */}
            {/* ========================================================================= */}
            {activeTab === 'modern' && (
              <div className="flex justify-center print:block">
                <div 
                  id="cv-1page-target"
                  className="print-page-cv w-full max-w-[210mm] bg-white text-slate-900 rounded-xl shadow-2xl border border-neutral-200 print:border-none print:shadow-none print:rounded-none overflow-hidden transition-all"
                  style={{
                    transform: `scale(${pdfZoom / 100})`,
                    transformOrigin: 'top center',
                    marginBottom: pdfZoom !== 100 ? `${(pdfZoom - 100) * 8}px` : undefined
                  }}
                >
                  {/* Top Accent Strip */}
                  <div className="h-2 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 print:bg-emerald-600" />

                  <div className="p-6 sm:p-7 md:p-8 print:p-0 print:m-0 space-y-4">
                    {/* Header Bar */}
                    <div className="border-b-2 border-emerald-600 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                            {CV_DATA.personalInfo.fullName}
                          </h1>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Verified Engineer
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-emerald-700 tracking-wide mt-0.5">
                          FULL-STACK WEB DEVELOPER • REACT, TYPESCRIPT, NODE.JS, PHP, MYSQL
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 text-left sm:text-right space-y-0.5 leading-tight font-medium">
                        <div className="flex items-center sm:justify-end gap-1.5">
                          <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{CV_DATA.personalInfo.location}</span>
                        </div>
                        <div className="flex items-center sm:justify-end gap-1.5">
                          <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{CV_DATA.personalInfo.phone}</span>
                          <span>•</span>
                          <Mail className="w-3 h-3 text-emerald-600 shrink-0" />
                          <a href={`mailto:${CV_DATA.personalInfo.email}`} className="text-slate-900 hover:underline">
                            {CV_DATA.personalInfo.email}
                          </a>
                        </div>
                        <div className="flex items-center sm:justify-end gap-1.5">
                          <Send className="w-3 h-3 text-emerald-600 shrink-0" />
                          <a href={CV_DATA.personalInfo.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                            Telegram: {CV_DATA.personalInfo.telegram}
                          </a>
                          <span>•</span>
                          <Github className="w-3 h-3 text-slate-700 shrink-0" />
                          <a href={CV_DATA.personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:underline">
                            github.com/{CV_DATA.personalInfo.github}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* 2-Column Split Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 print:grid-cols-12">
                      
                      {/* Left Column (Skills, Capabilities, Education, Languages) */}
                      <div className="md:col-span-4 print:col-span-4 space-y-3.5 border-r-0 md:border-r border-slate-200 print:border-r pr-0 md:pr-4 print:pr-3">
                        
                        {/* Technical Stack */}
                        <div>
                          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                            <Code className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Technical Proficiencies</span>
                          </h3>
                          <div className="space-y-2 text-[10.5px]">
                            <div>
                              <strong className="block text-slate-900 font-bold">Frontend</strong>
                              <p className="text-slate-600 leading-snug">
                                React.js, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5, CSS3, Vite
                              </p>
                            </div>
                            <div>
                              <strong className="block text-slate-900 font-bold">Backend & APIs</strong>
                              <p className="text-slate-600 leading-snug">
                                Node.js, Express.js, PHP, RESTful APIs, JWT Auth, RBAC, Middleware
                              </p>
                            </div>
                            <div>
                              <strong className="block text-slate-900 font-bold">Databases</strong>
                              <p className="text-slate-600 leading-snug">
                                MySQL, PostgreSQL, Relational Normalization, Query Indexing, phpMyAdmin
                              </p>
                            </div>
                            <div>
                              <strong className="block text-slate-900 font-bold">DevOps & Tooling</strong>
                              <p className="text-slate-600 leading-snug">
                                Git, GitHub, Postman, Linux/Apache/XAMPP, Vercel, InfinityFree
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Architectural Strengths */}
                        <div>
                          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Key Architecture</span>
                          </h3>
                          <div className="flex flex-wrap gap-1.5 text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                              Telebirr & CBE Payments
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                              Role-Based Access (RBAC)
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                              Live Order Telemetry
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                              Normalized MySQL Design
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                              9+ Production Systems
                            </span>
                          </div>
                        </div>

                        {/* Education */}
                        <div>
                          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Education</span>
                          </h3>
                          <div className="text-[10px]">
                            <div className="font-bold text-slate-900">
                              B.Sc. in Information Science
                            </div>
                            <div className="text-slate-600 text-[9.5px]">
                              Jimma University — Institute of Technology
                            </div>
                            <div className="text-slate-500 text-[9px]">
                              Faculty of Computing & Informatics • 2026
                            </div>
                            <div className="text-[8.5px] text-slate-500 mt-1 leading-tight">
                              Software Eng, DB & SQL, Programming, Algorithms, Info Retrieval, Data Mining, Mobile Dev
                            </div>
                          </div>
                        </div>

                        {/* Certifications & Languages */}
                        <div>
                          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5 flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Professional Certifications</span>
                          </h3>
                          <div className="space-y-1.5 text-[10px]">
                            <div>
                              <strong className="text-slate-900">Android Fundamentals</strong>
                              <span className="text-slate-500 block text-[9px]">Udacity • Certified 2024</span>
                            </div>
                            <div>
                              <strong className="text-slate-900">Programming Fundamentals</strong>
                              <span className="text-slate-500 block text-[9px]">Udacity • Certified 2024</span>
                            </div>
                            <div className="pt-1 text-slate-700 text-[9.5px]">
                              <div>• <strong>English:</strong> Professional Working</div>
                              <div>• <strong>Amharic:</strong> Native / Bilingual</div>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Right Column (Executive Profile & Key Production Deliverables) */}
                      <div className="md:col-span-8 print:col-span-8 space-y-3.5">
                        
                        {/* Executive Summary */}
                        <div>
                          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Executive Profile</span>
                          </h3>
                          <p className="text-[10.5px] text-slate-700 leading-relaxed">
                            Results-driven Full-Stack Web Developer with a verified track record designing and deploying 9+ production systems across healthcare, commerce, hospitality, and legal tech. Expert in responsive React/TypeScript frontends, secure Node.js/PHP backend architectures, normalized relational databases, and local Ethiopian payment integrations (Telebirr & CBE Birr).
                          </p>
                        </div>

                        {/* Featured Production Experience */}
                        <div>
                          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2 flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Production Deployments & Professional Experience</span>
                          </h3>

                          <div className="space-y-3">
                            {/* Project 1 */}
                            <div className="space-y-0.5">
                              <div className="flex justify-between items-baseline text-[11px]">
                                <span className="font-extrabold text-slate-900">
                                  Lead Full-Stack Developer — <span className="text-emerald-700 font-bold">Food Ordering & Commerce Platform</span>
                                </span>
                                <span className="font-mono text-[10px] text-slate-500 font-semibold">2024</span>
                              </div>
                              <ul className="list-disc list-inside space-y-0.5 text-[10px] text-slate-700 leading-snug">
                                <li>Architected end-to-end food ordering platform with live multi-stage order tracking, dynamic carts, and custom item add-ons.</li>
                                <li>Integrated Ethiopian digital payment gateways (Telebirr & CBE Birr) with secure receipt verification.</li>
                                <li>Built full back-office administrative portal for real-time menu management, transaction audits, and store controls.</li>
                              </ul>
                            </div>

                            {/* Project 2 */}
                            <div className="space-y-0.5">
                              <div className="flex justify-between items-baseline text-[11px]">
                                <span className="font-extrabold text-slate-900">
                                  Frontend & UI Engineer — <span className="text-emerald-700 font-bold">Dr. Addis Speciality Dental Clinic</span>
                                </span>
                                <span className="font-mono text-[10px] text-slate-500 font-semibold">2024</span>
                              </div>
                              <ul className="list-disc list-inside space-y-0.5 text-[10px] text-slate-700 leading-snug">
                                <li>Developed high-performance patient booking portal with appointment triage and transparent procedure pricing.</li>
                                <li>Engineered responsive React & Tailwind UI achieving near-perfect Lighthouse accessibility and speed scores.</li>
                              </ul>
                            </div>

                            {/* Project 3 */}
                            <div className="space-y-0.5">
                              <div className="flex justify-between items-baseline text-[11px]">
                                <span className="font-extrabold text-slate-900">
                                  Full-Stack Engineer — <span className="text-emerald-700 font-bold">Hospitality & Commercial Systems</span>
                                </span>
                                <span className="font-mono text-[10px] text-slate-500 font-semibold">2023 – 2024</span>
                              </div>
                              <ul className="list-disc list-inside space-y-0.5 text-[10px] text-slate-700 leading-snug">
                                <li>Delivered tailored web platforms for Jungle House Resort, El Pacho Latin Restaurant, and Kosy Kawa Coffee.</li>
                                <li>Designed normalized MySQL databases handling menus, reservations, booking records, and contact inquiries.</li>
                              </ul>
                            </div>

                            {/* Project 4 */}
                            <div className="space-y-0.5">
                              <div className="flex justify-between items-baseline text-[11px]">
                                <span className="font-extrabold text-slate-900">
                                  Software Developer — <span className="text-emerald-700 font-bold">Productivity & Legal-Tech Utilities</span>
                                </span>
                                <span className="font-mono text-[10px] text-slate-500 font-semibold">2023 – 2024</span>
                              </div>
                              <ul className="list-disc list-inside space-y-0.5 text-[10px] text-slate-700 leading-snug">
                                <li>Created StayAwake web application leveraging the Browser Screen Wake Lock API for zero-install developer productivity.</li>
                                <li>Engineered Islamic Jurisprudence calculator distributing estate shares according to strict mathematical Sharia rules.</li>
                              </ul>
                            </div>

                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Bottom Verification Footer */}
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                      <span>Verified Profile • Imran Kedir • Portfolio: https://github.com/imranka641</span>
                      <span>Page 1 of 1 • Single-Page A4 PDF Layout</span>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 2. INTERACTIVE EXPLORER VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'interactive' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Profile Identity Card */}
                <div className="p-6 rounded-2xl bg-neutral-950/60 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                          {CV_DATA.personalInfo.fullName}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          Full-Stack Engineer
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-medium mb-4">
                        {CV_DATA.personalInfo.headline}
                      </p>

                      {/* Contact Badges */}
                      <div className="flex flex-wrap gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                        <a 
                          href={`mailto:${CV_DATA.personalInfo.email}`} 
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 hover:border-emerald-500/40 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{CV_DATA.personalInfo.email}</span>
                        </a>

                        <a 
                          href={`tel:${CV_DATA.personalInfo.phone.replace(/\s+/g, '')}`} 
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 hover:border-emerald-500/40 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{CV_DATA.personalInfo.phone}</span>
                        </a>

                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{CV_DATA.personalInfo.location}</span>
                        </div>

                        <a 
                          href={CV_DATA.personalInfo.telegramUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors font-medium"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Telegram {CV_DATA.personalInfo.telegram}</span>
                        </a>

                        <a 
                          href={CV_DATA.personalInfo.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 hover:border-neutral-700 transition-colors font-mono"
                        >
                          <Github className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{CV_DATA.personalInfo.github}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="p-6 rounded-2xl bg-neutral-950/40 dark:bg-neutral-950/60 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-500 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Executive Summary</span>
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {CV_DATA.executiveSummary}
                  </p>
                </div>

                {/* Core Competencies Matrix */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-500 uppercase tracking-wider">
                      <Code className="w-4 h-4" />
                      <span>Technical Core Competencies</span>
                    </div>
                    <span className="text-xs text-neutral-500 font-mono">15+ Technologies</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CV_DATA.competencyCategories.map((category) => (
                      <div
                        key={category.title}
                        className="p-4 rounded-xl bg-neutral-950/40 dark:bg-neutral-950/60 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 space-y-2.5"
                      >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                          {category.title}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-900/80 dark:bg-neutral-900 light:bg-neutral-100 text-neutral-300 dark:text-neutral-300 light:text-neutral-800 border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience & Projects */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-500 uppercase tracking-wider">
                      <Briefcase className="w-4 h-4" />
                      <span>Professional Experience & Systems ({filteredExperiences.length})</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredExperiences.map((exp, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-neutral-950/40 dark:bg-neutral-950/60 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 space-y-3 hover:border-emerald-500/40 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                                {exp.role}
                              </h4>
                              {exp.featured && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                  Featured System
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                              {exp.organization} • {exp.location}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 text-neutral-400 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                              {exp.period}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-400 italic">
                          {exp.summary}
                        </p>

                        <ul className="space-y-1.5 pt-1">
                          {exp.bulletPoints.map((point, bIdx) => (
                            <li key={bIdx} className="text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-2">
                              <span className="text-emerald-500 mt-1">▪</span>
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-neutral-800/60 dark:border-neutral-800 light:border-neutral-200">
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 text-neutral-400 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          {exp.liveUrl && (
                            <a
                              href={exp.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-emerald-500 hover:underline inline-flex items-center gap-1 font-semibold"
                            >
                              <span>View Platform</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education & Certifications Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Education */}
                  <div className="p-5 rounded-2xl bg-neutral-950/40 dark:bg-neutral-950/60 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-500 uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4" />
                      <span>Education</span>
                    </div>
                    {CV_DATA.education.map((edu, idx) => (
                      <div key={idx} className="space-y-2">
                        <div>
                          <div className="text-sm font-bold text-neutral-900 dark:text-white">
                            {edu.degree}
                          </div>
                          <div className="text-xs font-medium text-emerald-500">
                            {edu.institution}
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            {edu.faculty} • {edu.department} ({edu.period})
                          </div>
                        </div>

                        {edu.focus && (
                          <p className="text-xs text-neutral-600 dark:text-neutral-300 italic">
                            {edu.focus}
                          </p>
                        )}

                        {edu.relevantAreas && edu.relevantAreas.length > 0 && (
                          <div>
                            <div className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                              Relevant Academic Areas:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {edu.relevantAreas.map((area, aIdx) => (
                                <span
                                  key={aIdx}
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Certifications & Languages */}
                  <div className="p-5 rounded-2xl bg-neutral-950/40 dark:bg-neutral-950/60 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-emerald-500 uppercase tracking-wider mb-3">
                        <Award className="w-4 h-4" />
                        <span>Professional Certifications</span>
                      </div>
                      <div className="space-y-3">
                        {CV_DATA.certifications.map((c, idx) => (
                          <div key={idx} className="text-xs space-y-1 p-2.5 rounded-xl bg-neutral-900/60 dark:bg-neutral-900 light:bg-neutral-50 border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-neutral-900 dark:text-white">{c.name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-mono font-bold">
                                {c.issuer} • {c.year}
                              </span>
                            </div>
                            {c.description && (
                              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {c.description}
                              </p>
                            )}
                            <div className="text-emerald-600 dark:text-emerald-400 text-[10.5px] font-medium pt-0.5">
                              {c.topics.join(' • ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                      <div className="text-xs font-bold text-neutral-900 dark:text-white uppercase mb-1.5">
                        Languages
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                        {CV_DATA.personalInfo.languages.map((l) => (
                          <span key={l.language} className="px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-neutral-900 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                            <strong>{l.language}:</strong> {l.proficiency}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 3. ATS / CLEAN PAPER VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'ats' && (
              <div className="max-w-4xl mx-auto bg-white text-neutral-900 p-8 sm:p-12 rounded-xl shadow-lg font-sans border border-neutral-200 space-y-6">
                {/* Header */}
                <div className="text-center pb-6 border-b-2 border-neutral-800">
                  <h1 className="text-3xl font-extrabold tracking-tight uppercase text-neutral-900">
                    {CV_DATA.personalInfo.fullName}
                  </h1>
                  <p className="text-sm font-semibold text-neutral-700 mt-1">
                    {CV_DATA.personalInfo.headline}
                  </p>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-neutral-600 mt-3 font-mono">
                    <span>{CV_DATA.personalInfo.location}</span>
                    <span>•</span>
                    <span>{CV_DATA.personalInfo.phone}</span>
                    <span>•</span>
                    <span>{CV_DATA.personalInfo.email}</span>
                    <span>•</span>
                    <span>Telegram: {CV_DATA.personalInfo.telegram}</span>
                    <span>•</span>
                    <span>github.com/{CV_DATA.personalInfo.github}</span>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
                    Professional Summary
                  </h2>
                  <p className="text-xs leading-relaxed text-neutral-700">
                    {CV_DATA.executiveSummary}
                  </p>
                </div>

                {/* Technical Core Competencies */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
                    Technical Core Competencies
                  </h2>
                  <div className="space-y-1 text-xs text-neutral-700">
                    {CV_DATA.competencyCategories.map((c) => (
                      <div key={c.title} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                        <strong className="w-44 shrink-0 text-neutral-900">{c.title}:</strong>
                        <span>{c.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
                    Professional Experience & Project Deployments
                  </h2>
                  <div className="space-y-4">
                    {CV_DATA.experiences.map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="font-bold text-neutral-900 text-sm">
                            {exp.role} — <span className="font-semibold text-neutral-800">{exp.organization}</span>
                          </span>
                          <span className="font-mono text-neutral-600">{exp.period}</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 italic">
                          {exp.location} {exp.liveUrl && `| Live URL: ${exp.liveUrl}`}
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-xs text-neutral-700 pt-1">
                          {exp.bulletPoints.map((bp, bIdx) => (
                            <li key={bIdx}>{bp}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
                    Education
                  </h2>
                  <div className="space-y-3 text-xs text-neutral-700">
                    {CV_DATA.education.map((edu, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between">
                          <div>
                            <strong className="text-neutral-900">{edu.degree}</strong>
                            <div className="text-neutral-800">{edu.institution}</div>
                            <div className="text-neutral-600 italic text-[11px]">{edu.faculty} • {edu.department}</div>
                          </div>
                          <span className="font-mono text-neutral-600 font-semibold">{edu.period} | {edu.location}</span>
                        </div>
                        {edu.focus && (
                          <p className="text-[11px] text-neutral-600 pt-0.5">{edu.focus}</p>
                        )}
                        {edu.relevantAreas && (
                          <div className="text-[11px] text-neutral-700 pt-0.5">
                            <strong>Relevant Academic Areas:</strong> {edu.relevantAreas.join(' • ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional Certifications */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
                    Professional Certifications
                  </h2>
                  <div className="space-y-3 text-xs text-neutral-700">
                    {CV_DATA.certifications.map((c, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between">
                          <strong className="text-neutral-900">{c.name}</strong>
                          <span className="font-mono text-neutral-600">{c.issuer} • Certified: {c.year}</span>
                        </div>
                        {c.description && (
                          <p className="text-[11px] text-neutral-600">{c.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 4. MARKDOWN / RAW CODE VIEW */}
            {/* ========================================================================= */}
            {activeTab === 'markdown' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">
                    Markdown Plaintext Representation
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard' : 'Copy All Text'}</span>
                  </button>
                </div>
                <pre className="p-4 sm:p-6 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap selection:bg-emerald-500/30">
                  {generateMarkdownCV(CV_DATA)}
                </pre>
              </div>
            )}

          </div>

          {/* Footer Bar (Hidden during print) */}
          <div className="p-4 sm:px-6 py-3.5 bg-neutral-950/90 dark:bg-neutral-950 light:bg-neutral-100 border-t border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400 print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Available for Full-Stack, Frontend & Backend Engagements</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDirectDownloadPdf}
                disabled={isGeneratingPdf}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-bold text-emerald-500 disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>{isGeneratingPdf ? 'Downloading PDF...' : 'Download PDF'}</span>
              </button>
              <span>•</span>
              <button
                onClick={handlePrint}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1 font-medium text-neutral-400 hover:text-neutral-200"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <span>•</span>
              <a
                href="https://t.me/imranka641"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-medium"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact @imranka641</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
