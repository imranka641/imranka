import React from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Laptop,
  Calendar,
  LayoutDashboard,
  GraduationCap,
  Database,
  Network,
  Rocket,
  Check,
  ArrowUpRight,
  Sparkles,
  Briefcase,
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onSelectServiceType?: (projectType: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceType }) => {
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'Database':
        return <Database className="w-5 h-5" />;
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleInquire = (service: Service) => {
    if (onSelectServiceType) {
      onSelectServiceType(service.projectTypeKey);
    }
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 light:text-cyan-700 border border-cyan-500/20 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            {t.services.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.services.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-[#080e22]/85 dark:bg-[#080e22]/85 light:bg-white border border-slate-800/80 dark:border-cyan-500/15 light:border-slate-200/90 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 light:text-cyan-700 mb-5 group-hover:scale-105 transition-transform">
                  {getIcon(service.icon)}
                </div>

                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6 pt-3 border-t border-slate-800/60 dark:border-slate-800/80 light:border-slate-100">
                  <div className="text-[11px] font-mono font-semibold text-slate-400 uppercase">
                    Deliverables:
                  </div>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Action */}
              <button
                onClick={() => handleInquire(service)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 bg-[#040817]/70 dark:bg-[#040817]/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-400 light:hover:text-cyan-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t.services.discussCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
