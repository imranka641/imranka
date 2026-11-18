import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Code,
  Database,
  Server,
  ShieldCheck,
  Rocket,
  Workflow,
  FileText,
  Smartphone,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TECHNICAL_HIGHLIGHTS } from '../data/skills';

interface AboutProps {
  onOpenCV?: () => void;
}

const PROFILE_PHOTO_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-uBJAWeGFU9-huxGS8RjG2NQLMo_5zbCsbWBmhV8rg&s=10';

export const About: React.FC<AboutProps> = ({ onOpenCV }) => {
  const { t } = useLanguage();
  const [photoError, setPhotoError] = useState(false);

  const lifecycleSteps = [
    { label: 'Discovery', detail: 'Requirements' },
    { label: 'Design', detail: 'UI/UX System' },
    { label: 'Frontend', detail: 'React / Mobile' },
    { label: 'Database', detail: 'SQL Schemas' },
    { label: 'Backend', detail: 'Node & PHP' },
    { label: 'QA Testing', detail: 'Verification' },
    { label: 'Launch', detail: 'Production' },
  ];

  const pillars = [
    {
      icon: Code,
      title: 'Frontend Engineering',
      desc: 'Crafting responsive, high-performance, and accessible web interfaces in React, TypeScript, and modern Tailwind CSS.',
      tech: 'React & TypeScript',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      desc: 'Building cross-platform and native Android mobile experiences with React Native, Kotlin, and modern lifecycle patterns.',
      tech: 'Kotlin & React Native',
    },
    {
      icon: Server,
      title: 'Backend Architecture',
      desc: 'Developing dependable server-side logic, routing, and REST APIs using Node.js, Express, and PHP.',
      tech: 'Node.js & PHP',
    },
    {
      icon: Database,
      title: 'Database Schema Design',
      desc: 'Structuring normalized relational schemas, constraints, and indexing in MySQL and PostgreSQL.',
      tech: 'MySQL & PostgreSQL',
    },
    {
      icon: ShieldCheck,
      title: 'Security & Payments',
      desc: 'Implementing JWT authentication, role-based access control (RBAC), and Telebirr / CBE Birr payment workflows.',
      tech: 'Auth & Gateways',
    },
    {
      icon: Rocket,
      title: 'Production Deployment',
      desc: 'Configuring production builds, environment variables, cloud hosting pipelines, and custom domain routing.',
      tech: 'CI/CD & Cloud',
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">
            {t.about.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4 text-balance">
            {t.about.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Profile & Biography Split */}
        <div className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Futuristic Profile Card with Requested Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#080e22]/85 dark:bg-[#080e22]/85 light:bg-white border border-slate-800/90 dark:border-cyan-500/20 light:border-slate-200 shadow-2xl flex flex-col justify-between"
          >
            <div className="flex flex-col items-center text-center">
              {/* Futuristic Holographic Avatar Frame */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-6">
                <div
                  aria-hidden="true"
                  className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 opacity-70 blur-sm"
                />
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#050918] border border-cyan-400/40 flex items-center justify-center">
                  {!photoError ? (
                    <img
                      src={PROFILE_PHOTO_URL}
                      alt="Imran Kedir Ahmed — Full-Stack Web & Mobile Developer"
                      referrerPolicy="no-referrer"
                      onError={() => setPhotoError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-950 via-slate-900 to-purple-950 text-cyan-300">
                      <span className="text-3xl font-display font-bold tracking-tight">IK</span>
                      <span className="text-[11px] font-mono text-slate-400 mt-1">Imran Kedir</span>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                Imran Kedir Ahmed
              </h3>
              <p className="text-sm font-medium text-cyan-400 dark:text-cyan-400 light:text-blue-600 mt-1 mb-5">
                Full-Stack Web &amp; Mobile Developer
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800/80 light:border-slate-200 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-slate-400">{t.about.factLocation}</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    {t.about.factLocationVal}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800/80 light:border-slate-200 flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-slate-400">{t.about.factEducation}</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    Jimma University — Computing &amp; Information Science
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 dark:bg-slate-950/70 light:bg-slate-50 border border-slate-800/80 light:border-slate-200 flex items-start gap-3">
                <Layers className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {t.about.factCertifications}
                  </div>
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    Udacity Android Developer &amp; Programming Fundamentals
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Background, Technical Interests & Development Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#080e22]/85 dark:bg-[#080e22]/85 light:bg-white border border-slate-800/90 dark:border-cyan-500/20 light:border-slate-200 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-purple-400">
                Engineering Background &amp; Philosophy
              </div>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>{t.about.bioParagraph1}</p>
                <p>{t.about.bioParagraph2}</p>
                <p>{t.about.bioParagraph3}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 light:border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t.about.factLanguages}:{' '}
                <strong className="text-slate-800 dark:text-slate-100">
                  {t.about.factLanguagesVal}
                </strong>
              </div>
              {onOpenCV && (
                <button
                  onClick={onOpenCV}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t.cvSection.openHub}</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Animated Key Metrics Bar */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#080e22] via-[#0c1638] to-[#080e22] light:from-slate-900 light:via-slate-800 light:to-slate-900 border border-cyan-500/20 shadow-2xl mb-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {TECHNICAL_HIGHLIGHTS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-3"
              >
                <div className="text-3xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="font-semibold text-sm sm:text-base text-white mb-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Complete Lifecycle Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-14 p-6 sm:p-8 rounded-3xl bg-[#080e22]/80 dark:bg-[#080e22]/80 light:bg-white border border-slate-800/90 light:border-slate-200 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800/80 light:border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
                <Workflow className="w-4 h-4" />
                <span>Complete Lifecycle Execution</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white mt-1">
                From Architecture to Live Production
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Handling the entire software engineering spectrum with clean design, typed code, and reliable deployment.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {lifecycleSteps.map((step, index) => (
              <div
                key={step.label}
                className="p-4 rounded-xl bg-slate-950/60 dark:bg-slate-950/75 light:bg-slate-50 border border-slate-800/80 light:border-slate-200 text-center hover:border-cyan-500/40 transition-colors"
              >
                <div className="text-xs font-mono text-cyan-400 mb-1 tabular-nums">
                  0{index + 1}
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {step.label}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Engineering Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="p-6 rounded-2xl bg-[#080e22]/75 dark:bg-[#080e22]/75 light:bg-white border border-slate-800/90 light:border-slate-200 hover:border-cyan-500/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">{pillar.tech}</span>
                  </div>
                  <h4 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
