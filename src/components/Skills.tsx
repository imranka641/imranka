import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Server,
  Database,
  Wrench,
  Smartphone,
  Search,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';
import { useLanguage } from '../context/LanguageContext';
import { SkillsCanvas3D } from './SkillsCanvas3D';

export const Skills: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    frontend: <Code2 className="w-4 h-4" />,
    backend: <Server className="w-4 h-4" />,
    databases: <Database className="w-4 h-4" />,
    tools: <Wrench className="w-4 h-4" />,
    additional: <Smartphone className="w-4 h-4" />,
  };

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      skills: matchingSkills,
    };
  }).filter((cat) => {
    if (activeCategory !== 'all' && cat.id !== activeCategory) return false;
    return cat.skills.length > 0;
  });

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">
            {t.skills.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4 text-balance">
            {t.skills.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#080e22]/85 dark:bg-[#080e22]/90 light:bg-slate-100 border border-slate-800/90 light:border-slate-200 w-full lg:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Technologies
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {categoryIcons[cat.id]}
                <span>{cat.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              className={`w-4 h-4 absolute ${
                isRTL ? 'right-3.5' : 'left-3.5'
              } top-1/2 -translate-y-1/2 text-slate-400`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (React, Kotlin, MySQL...)"
              className={`w-full ${
                isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
              } py-2.5 text-sm rounded-xl bg-[#080e22]/85 dark:bg-[#080e22]/90 light:bg-white border border-slate-800 light:border-slate-300 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors`}
            />
          </div>
        </div>

        {/* 3D Interactive Visualization + Skill Clusters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive 3D Skill Orbit Sphere */}
          <div className="lg:col-span-4 rounded-3xl bg-[#080e22]/85 dark:bg-[#080e22]/90 light:bg-slate-900 border border-cyan-500/20 shadow-2xl overflow-hidden flex flex-col">
            <div className="h-[340px] sm:h-[380px] w-full relative">
              <SkillsCanvas3D activeCategory={activeCategory} />
            </div>
            <div className="px-6 py-4 border-t border-slate-800/80 bg-[#050918]/80 text-center">
              <div className="text-xs font-mono text-cyan-400">
                Interactive 3D Tech Constellation
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Hover to rotate the cluster or switch stack tabs to morph core resonance.
              </div>
            </div>
          </div>

          {/* Right: Animated Technology Cards */}
          <div className="lg:col-span-8">
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="p-6 rounded-2xl bg-[#080e22]/80 dark:bg-[#080e22]/85 light:bg-white border border-slate-800/90 light:border-slate-200 hover:border-cyan-500/40 transition-all shadow-xl flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                            {categoryIcons[category.id]}
                          </div>
                          <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                            {category.title}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                          {category.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <span
                              key={skill.name}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                skill.highlight
                                  ? 'bg-cyan-500/12 text-cyan-300 dark:text-cyan-300 light:text-blue-800 border border-cyan-500/35 font-semibold'
                                  : 'bg-slate-900/70 dark:bg-slate-900 light:bg-slate-100 text-slate-600 dark:text-slate-300 border border-slate-800 light:border-slate-200'
                              }`}
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-800/70 light:border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
                        <span>{category.skills.length} technologies</span>
                        <span className="text-cyan-400">Production ready</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-16 bg-[#080e22]/50 rounded-2xl border border-slate-800">
                <p className="text-slate-400 mb-2">
                  No technologies found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-xs font-semibold text-cyan-400 hover:underline"
                >
                  Reset search and filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
