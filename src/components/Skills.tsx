import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  Smartphone, 
  Check, 
  Sparkles, 
  Search,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';
import { useLanguage } from '../context/LanguageContext';

export const Skills: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    frontend: <Code2 className="w-4 h-4" />,
    backend: <Server className="w-4 h-4" />,
    databases: <Database className="w-4 h-4" />,
    tools: <Wrench className="w-4 h-4" />,
    additional: <Smartphone className="w-4 h-4" />
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter((s) => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchingSkills
    };
  }).filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
    return cat.skills.length > 0;
  });

  return (
    <section id="skills" className="py-20 relative">
      {/* Background Accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Code2 className="w-3.5 h-3.5" />
            {t.skills.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            {t.skills.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {t.skills.allCategories}
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {categoryIcons[cat.id]}
                <span>{cat.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className={`w-4 h-4 absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-neutral-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.skills.searchPlaceholder}
              className={`w-full ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2 text-sm rounded-xl bg-neutral-900/50 dark:bg-neutral-900/70 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all`}
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl bg-neutral-900/30 dark:bg-neutral-900/50 light:bg-white border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200/90 hover:border-neutral-700 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      {categoryIcons[category.id] || <Sparkles className="w-4 h-4" />}
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          skill.highlight
                            ? 'bg-neutral-800/80 dark:bg-neutral-800 light:bg-emerald-50 text-neutral-100 dark:text-neutral-100 light:text-emerald-900 border border-emerald-500/30 font-semibold'
                            : 'bg-neutral-900/60 dark:bg-neutral-900 light:bg-neutral-100 text-neutral-600 dark:text-neutral-300 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200'
                        }`}
                      >
                        {skill.highlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        )}
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/60 dark:border-neutral-800/80 light:border-neutral-100 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <span>{category.skills.length} competencies</span>
                  <span className="text-emerald-500">Verified stack</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state if search returns zero */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-neutral-900/20 rounded-2xl border border-neutral-800">
            <p className="text-neutral-400 mb-2">No technologies found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="text-xs font-semibold text-emerald-400 hover:underline"
            >
              Reset search and filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
