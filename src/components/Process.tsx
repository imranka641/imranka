import React from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Map,
  Palette,
  Code2,
  CheckCheck,
  Rocket,
  Workflow,
} from 'lucide-react';
import { PROCESS_STEPS } from '../data/process';
import { useLanguage } from '../context/LanguageContext';

export const Process: React.FC = () => {
  const { t } = useLanguage();

  const stepIcons = [
    <Search className="w-5 h-5" />,
    <Map className="w-5 h-5" />,
    <Palette className="w-5 h-5" />,
    <Code2 className="w-5 h-5" />,
    <CheckCheck className="w-5 h-5" />,
    <Rocket className="w-5 h-5" />,
  ];

  return (
    <section id="process" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 light:text-cyan-700 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Workflow className="w-3.5 h-3.5" />
            {t.process.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.process.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative p-6 rounded-2xl bg-[#080e22]/85 dark:bg-[#080e22]/85 light:bg-white border border-slate-800/80 dark:border-cyan-500/15 light:border-slate-200/90 hover:border-cyan-400/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 light:text-cyan-700 group-hover:scale-105 transition-transform">
                    {stepIcons[idx]}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-800 dark:text-slate-700 light:text-slate-300 group-hover:text-cyan-400/50 transition-colors tabular-nums">
                    0{step.step}
                  </span>
                </div>

                <div className="text-xs font-mono font-semibold text-cyan-400 light:text-cyan-700 mb-1">
                  Phase 0{step.step}
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>

                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                  {step.tagline}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {step.description}
                </p>
              </div>

              {/* Key Activities List */}
              <div className="pt-4 border-t border-slate-800/60 dark:border-slate-800/80 light:border-slate-100 space-y-1.5">
                {step.keyActivities.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
                    <span className="line-clamp-1">{act}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
