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
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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
          <div className="flex items-center justify-center gap-3 mt-4 text-xs font-mono text-neutral-500">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/60 border border-neutral-800 text-emerald-400">
              <Camera className="w-3.5 h-3.5" />
              <span>Realistic Photography & Case Studies Included</span>
            </span>
          </div>
        </div>

        {/* Search & Advanced Filter Toolbar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, keyword, or tech stack (e.g. Telebirr, React)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Tech Tag Filters */}
            <div className="w-full sm:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {popularTech.map((tech) => {
                const isSelected = selectedTech === tech || (tech === 'All Tech' && !selectedTech);
                return (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech === 'All Tech' ? null : tech)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-neutral-800 text-emerald-400 border border-emerald-500/40 font-semibold'
                        : 'bg-white dark:bg-neutral-900/60 text-neutral-500 border border-neutral-200 dark:border-neutral-800 hover:text-neutral-300'
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
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 backdrop-blur-sm max-w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === 'All' 
                ? allProjects.length 
                : cat === 'Islamic Tech'
                ? allProjects.filter(p => p.id === 'itkan-academy' || p.id === 'islamic-inheritance').length
                : allProjects.filter(p => p.category === cat).length;

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

        {/* Filter Results Status */}
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-500 max-w-7xl mx-auto px-1">
          <div>
            Showing <span className="text-white font-semibold">{filteredProjects.length}</span> of {allProjects.length} verified projects
            {(activeCategory !== 'All' || selectedTech || searchQuery) && (
              <span className="text-emerald-400 ml-1.5">(Filtered)</span>
            )}
          </div>

          {(activeCategory !== 'All' || selectedTech || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-xs text-neutral-400 hover:text-emerald-400 flex items-center gap-1 underline underline-offset-4"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Projects 3-Column Grid */}
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
          <div className="py-16 text-center rounded-2xl bg-neutral-900/30 border border-neutral-800">
            <p className="text-sm text-neutral-400 mb-3">No projects match the current search filters.</p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom Portfolio Note */}
        <div className="mt-16 text-center p-6 rounded-2xl bg-neutral-900/20 dark:bg-neutral-900/40 light:bg-neutral-50 border border-neutral-800/60 dark:border-neutral-800 light:border-neutral-200 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-500 mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>All {allProjects.length} Live Web Applications Verified & Deployed</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Each project features modular frontend architecture, domain-specific engineering, responsive layouts, and verified realistic photography galleries.
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
