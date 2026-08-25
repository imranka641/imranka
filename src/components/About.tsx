import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  Code, 
  Database, 
  Server, 
  ShieldCheck, 
  Rocket, 
  Workflow,
  FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TECHNICAL_HIGHLIGHTS } from '../data/skills';

interface AboutProps {
  onOpenCV?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenCV }) => {
  const { t, isRTL } = useLanguage();

  const lifecycleSteps = [
    { label: 'Idea', icon: '💡' },
    { label: 'Design', icon: '🎨' },
    { label: 'Development', icon: '💻' },
    { label: 'Database', icon: '🗄️' },
    { label: 'Backend', icon: '⚙️' },
    { label: 'Testing', icon: '🧪' },
    { label: 'Deployment', icon: '🚀' }
  ];

  const pillars = [
    {
      icon: Code,
      title: 'Frontend Engineering',
      desc: 'Crafting responsive, high-performance, and accessible web interfaces in React, TypeScript, and modern Tailwind CSS.',
      badge: 'React & Tailwind'
    },
    {
      icon: Server,
      title: 'Backend Architecture',
      desc: 'Developing dependable server-side logic, routing, and controller services using Node.js, Express, and PHP.',
      badge: 'Node.js & PHP'
    },
    {
      icon: Database,
      title: 'Database Schema Design',
      desc: 'Structuring relational schemas, table normalization, relational constraints, and indexing in MySQL and PostgreSQL.',
      badge: 'MySQL & Postgres'
    },
    {
      icon: Layers,
      title: 'REST API Development',
      desc: 'Engineering predictable, modular REST endpoints with structured JSON schemas, middleware, and request validation.',
      badge: 'REST APIs'
    },
    {
      icon: ShieldCheck,
      title: 'Authentication & Security',
      desc: 'Implementing secure JWT tokenization, role-based access control (RBAC), password hashing, and session management.',
      badge: 'JWT & RBAC'
    },
    {
      icon: Rocket,
      title: 'Production Deployment',
      desc: 'Configuring production bundles, environment variables, cloud deployment pipelines, and custom domain routing.',
      badge: 'Live Deployment'
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {t.about.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            {t.about.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Biography Block */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/70 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200/80 shadow-xl backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-4 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>{t.about.bioParagraph1}</p>
              <p>{t.about.bioParagraph2}</p>
              <p>{t.about.bioParagraph3}</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {t.about.factEducation}: <strong className="text-neutral-900 dark:text-neutral-100">{t.about.factEducationVal}</strong>
              </div>
              {onOpenCV && (
                <button
                  onClick={onOpenCV}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.cvSection.openHub} &rarr;</span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/70 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200/80 shadow-xl backdrop-blur-sm space-y-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-xs text-emerald-600 dark:text-emerald-400">
              {t.about.quickFactsTitle}
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-neutral-950/50 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                <div className="text-xs text-neutral-400 dark:text-neutral-500">{t.about.factLocation}</div>
                <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{t.about.factLocationVal}</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/50 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                <div className="text-xs text-neutral-400 dark:text-neutral-500">{t.about.factCertifications}</div>
                <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{t.about.factCertificationsVal}</div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950/50 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                <div className="text-xs text-neutral-400 dark:text-neutral-500">{t.about.factLanguages}</div>
                <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{t.about.factLanguagesVal}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Lifecycle Flow Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 p-6 sm:p-8 rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/70 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200/80 shadow-xl backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
            <div>
              <div className="flex items-center gap-2 text-emerald-500 font-semibold text-sm">
                <Workflow className="w-4 h-4" />
                <span>Complete Lifecycle Execution</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                From Raw Concept to Live Production
              </h3>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
              Handling the complete development spectrum with engineering discipline and attention to detail at each milestone.
            </p>
          </div>

          {/* Lifecycle Steps Horizontal Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {lifecycleSteps.map((step, index) => (
              <div 
                key={step.label}
                className="relative group p-4 rounded-xl bg-neutral-950/60 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200 text-center hover:border-emerald-500/50 transition-all duration-200"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                  0{index + 1}
                </div>
                <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature / Capability Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-neutral-900/30 dark:bg-neutral-900/50 light:bg-white border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200/90 hover:border-neutral-700 dark:hover:border-neutral-700 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-neutral-800/60 dark:bg-neutral-800 light:bg-neutral-100 text-neutral-400 dark:text-neutral-300 border border-neutral-700/50 dark:border-neutral-700 light:border-neutral-200">
                      {pillar.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verifiable Statistics Metrics Bar */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-neutral-900/80 via-neutral-900/90 to-neutral-900/80 dark:from-neutral-900 dark:via-neutral-900/95 dark:to-neutral-900 light:bg-emerald-50/50 border border-neutral-800 dark:border-neutral-800 light:border-emerald-200/60 shadow-xl mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {TECHNICAL_HIGHLIGHTS.map((stat) => (
              <div key={stat.label} className="p-3">
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mb-1">
                  {stat.value}
                </div>
                <div className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CV / Resume Direct Access Banner */}
        {onOpenCV && (
          <div className="p-6 rounded-2xl bg-neutral-900/50 dark:bg-neutral-900/70 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                  Curriculum Vitae & Experience History
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Download or print verified credentials, work history, and technical architecture deliverables.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenCV}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.cvSection.openHub}</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
