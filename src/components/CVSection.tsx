import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  Download,
  Printer,
  Eye,
  Briefcase,
  Code,
  Award,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { CV_DATA, generateMarkdownCV } from '../data/cvData';
import { downloadCVPdf } from '../utils/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';

interface CVSectionProps {
  onOpenCVModal: () => void;
}

export const CVSection: React.FC<CVSectionProps> = ({ onOpenCVModal }) => {
  const { t, isRTL } = useLanguage();
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const handleDownloadDirectPdf = async () => {
    try {
      setIsDownloadingPdf(true);
      await downloadCVPdf();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleDownloadTxt = () => {
    const text = generateMarkdownCV(CV_DATA);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Imran_Kedir_FullStack_Developer_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    onOpenCVModal();
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <section id="cv" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-neutral-900/90 dark:from-neutral-900/95 dark:via-neutral-950 dark:to-neutral-900/95 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200/90 shadow-2xl p-6 sm:p-10"
        >
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 dark:bg-cyan-500/15 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>{t.cvSection.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                {t.cvSection.title}
              </h3>

              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {t.cvSection.subtitle}
              </p>

              {/* Highlights pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-neutral-950/60 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white mb-1">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                    <span>9+ Production Apps</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Live client systems
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950/60 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white mb-1">
                    <Code className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Full-Stack Mastery</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    React, Node, PHP & DBs
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-950/60 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white mb-1">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Local Payments</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Telebirr & CBE Birr
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={onOpenCVModal}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t.cvSection.openHub}</span>
                </button>

                <button
                  onClick={handleDownloadDirectPdf}
                  disabled={isDownloadingPdf}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 hover:border-emerald-500/60 disabled:opacity-50 transition-all text-sm shadow-sm"
                >
                  {isDownloadingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                      <span>{t.cvSection.downloadingPdf}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>{t.cvSection.downloadPdf}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-900/60 dark:bg-neutral-900 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 hover:bg-neutral-800 transition-all text-sm shadow-sm"
                  title="Print or Save via system dialog"
                >
                  <Printer className="w-4 h-4 text-neutral-400" />
                  <span>{t.cvSection.print}</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-2 px-3.5 py-3 rounded-xl font-semibold text-neutral-400 dark:text-neutral-400 hover:text-neutral-200 transition-all text-sm"
                  title="Download raw plain-text CV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.cvSection.downloadTxt}</span>
                </button>
              </div>
            </div>

            {/* Right Card: Quick CV Preview Snip */}
            <div className="lg:col-span-5">
              <div 
                onClick={onOpenCVModal}
                className="cursor-pointer group relative p-5 rounded-2xl bg-neutral-950/80 dark:bg-neutral-950/90 light:bg-neutral-50 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Top bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-neutral-500 ml-2">Imran_Kedir_CV.pdf</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500 group-hover:underline flex items-center gap-1">
                    <span>Click to Expand</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>

                {/* Content snippet */}
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="font-bold text-sm text-neutral-900 dark:text-white">
                      Imran Kedir
                    </div>
                    <div className="text-emerald-500 font-mono text-[11px]">
                      Full-Stack Developer • React, Node.js, PHP, MySQL
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-900/60 dark:bg-neutral-900 light:bg-white border border-neutral-800/80 text-[11px] text-neutral-400 line-clamp-3">
                    {CV_DATA.executiveSummary}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider">
                      Featured Roles & Deployments:
                    </div>
                    {CV_DATA.experiences.slice(0, 3).map((e, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px] py-1 border-b border-neutral-800/40 last:border-0">
                        <span className="font-semibold text-neutral-300 truncate max-w-[190px]">
                          {e.role}
                        </span>
                        <span className="text-neutral-500 font-mono text-[10px]">
                          {e.period}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-emerald-500 font-semibold group-hover:text-emerald-400">
                    <span>Interactive & ATS formats available</span>
                    <span className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`}>→</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
