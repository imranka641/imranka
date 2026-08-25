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
  Briefcase
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
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Calendar': return <Calendar className="w-5 h-5" />;
      case 'LayoutDashboard': return <LayoutDashboard className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            {t.services.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            {t.services.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
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
              className="p-6 rounded-2xl bg-neutral-900/30 dark:bg-neutral-900/50 light:bg-white border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200/90 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon & Tag */}
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 group-hover:scale-105 transition-transform">
                  {getIcon(service.icon)}
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 mb-6 pt-2 border-t border-neutral-800/60 dark:border-neutral-800/80 light:border-neutral-100">
                  <div className="text-[11px] font-mono font-semibold text-neutral-400 dark:text-neutral-400 uppercase">
                    {t.services.deliverables}:
                  </div>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Action */}
              <button
                onClick={() => handleInquire(service)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-900/60 dark:bg-neutral-900/80 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all flex items-center justify-center gap-1.5"
              >
                <span>{t.services.inquireService}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
