import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  Sparkles, 
  Filter, 
  Search,
  X,
  CheckCircle2, 
  SlidersHorizontal,
  Camera
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { useLanguage } from '../context/LanguageContext';

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Load custom projects persisted in localStorage (if any previously added)
  const [customProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('imran_custom_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const allProjects = useMemo(() => {
    return [...PROJECTS, ...customProjects];
  }, [customProjects]);

  const categories: ProjectCategory[] = [
    'All',
    'Food & E-Commerce',
    'Healthcare',
    'Productivity',
    'Hospitality',
    'Education',
    'Coffee',
    'Islamic Tech',
    'Legal-Tech'
  ];

  // Top tech tags for quick filtering
  const popularTech = ['All Tech', 'React', 'TypeScript', 'PHP', 'MySQL', 'Telebirr Payment', 'Tailwind CSS'];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Category match
      let matchesCategory = true;
      if (activeCategory === 'Islamic Tech') {
        matchesCategory = (
          project.id === 'itkan-academy' || 
          project.id === 'islamic-inheritance' ||
          project.categoryLabel.toLowerCase().includes('islamic')
        );
      } else if (activeCategory !== 'All') {
        matchesCategory = project.category === activeCategory;
      }

      // Tech match
      let matchesTech = true;
      if (selectedTech && selectedTech !== 'All Tech') {
        matchesTech = project.technologies.some(tech => 
          tech.toLowerCase().includes(selectedTech.toLowerCase())
        );
      }

      // Search match
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        matchesSearch = (
          project.name.toLowerCase().includes(query) ||
          project.tagline.toLowerCase().includes(query) ||
          project.shortDescription.toLowerCase().includes(query) ||
          project.problemSolved.toLowerCase().includes(query) ||
          project.technologies.some(tech => tech.toLowerCase().includes(query))
        );
      }

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [allProjects, activeCategory, selectedTech, searchQuery]);

  const resetFilters = () => {
    setActiveCategory('All');
    setSelectedTech(null);
    setSearchQuery('');
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">
            {t.projects.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4 text-balance">
            {t.projects.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Search & Quick Tech Filters */}
        <div className="max-w-5xl mx-auto mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, keyword, or tech stack (e.g. Telebirr, React)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-[#080e22]/90 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="w-full sm:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {popularTech.map((tech) => {
                const isSelected = selectedTech === tech || (tech === 'All Tech' && !selectedTech);
                return (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech === 'All Tech' ? null : tech)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/15 text-cyan-400 light:text-blue-700 border border-cyan-500/40 font-semibold'
                        : 'bg-white dark:bg-[#080e22]/75 text-slate-500 border border-slate-200 dark:border-slate-800 hover:text-slate-300'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-[#080e22]/85 dark:bg-[#080e22]/90 light:bg-slate-100 border border-slate-800/90 light:border-slate-200 backdrop-blur-sm max-w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === 'All'
                  ? allProjects.length
                  : cat === 'Islamic Tech'
                  ? allProjects.filter(
                      (p) => p.id === 'itkan-academy' || p.id === 'islamic-inheritance'
                    ).length
                  : allProjects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span>{cat === 'All' ? t.projects.filterAll : cat}</span>
                  <span className="text-[11px] font-mono opacity-80 tabular-nums">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Results Status */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 max-w-7xl mx-auto px-1 tabular-nums">
          <div>
            Showing <span className="text-slate-900 dark:text-white font-semibold">{filteredProjects.length}</span> of {allProjects.length} verified projects
            {(activeCategory !== 'All' || selectedTech || searchQuery) && (
              <span className="text-cyan-400 ml-1.5">(Filtered)</span>
            )}
          </div>

          {(activeCategory !== 'All' || selectedTech || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 underline underline-offset-4 cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Projects 3D Grid */}
        {filteredProjects.length > 0 ? (
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
        ) : (
          <div className="py-16 text-center rounded-2xl bg-[#080e22]/50 border border-slate-800">
            <p className="text-sm text-slate-400 mb-3">
              No projects match the current search filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom Verification Note */}
        <div className="mt-16 text-center p-6 rounded-2xl bg-[#080e22]/60 dark:bg-[#080e22]/70 light:bg-slate-50 border border-slate-800/80 light:border-slate-200 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400 light:text-blue-700 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>All {allProjects.length} Live Web Applications Verified &amp; Deployed</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any project card to explore its architecture case study, gallery previews, technology stack, and live production deployment.
          </p>
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          projects={allProjects}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
      </div>
    </section>
  );
};
