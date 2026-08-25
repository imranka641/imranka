import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  Filter, 
  LayoutGrid,
  CheckCircle2
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { useLanguage } from '../context/LanguageContext';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'Healthcare',
    'Productivity',
    'Hospitality',
    'Education',
    'Coffee',
    'Islamic Tech',
    'Legal-Tech'
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Islamic Tech') {
      return (
        project.id === 'itkan-academy' || 
        project.id === 'islamic-inheritance' ||
        project.categoryLabel.toLowerCase().includes('islamic')
      );
    }
    return project.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            {t.projects.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-4">
            {t.projects.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 backdrop-blur-sm max-w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === 'All' 
                ? PROJECTS.length 
                : cat === 'Islamic Tech'
                ? PROJECTS.filter(p => p.id === 'itkan-academy' || p.id === 'islamic-inheritance').length
                : PROJECTS.filter(p => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-800/40'
                  }`}
                >
                  <span>{cat === 'All' ? t.projects.filterAll : cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive 
                      ? 'bg-emerald-700/80 text-emerald-100' 
                      : 'bg-neutral-800/60 dark:bg-neutral-800 light:bg-neutral-200 text-neutral-500 dark:text-neutral-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={(proj) => setSelectedProject(proj)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Portfolio Note */}
        <div className="mt-16 text-center p-6 rounded-2xl bg-neutral-900/20 dark:bg-neutral-900/40 light:bg-neutral-50 border border-neutral-800/60 dark:border-neutral-800 light:border-neutral-200 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-500 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>All 9 Live Web Applications Verified & Deployed</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Each project is built with production-grade modular frontend architecture, responsive typography, and specialized domain feature sets.
          </p>
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          projects={PROJECTS}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

      </div>
    </section>
  );
};
