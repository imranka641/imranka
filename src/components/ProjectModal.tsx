import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Target, 
  HelpCircle, 
  Layers, 
  Code2,
  Globe,
  Tag
} from 'lucide-react';
import { Project } from '../types';
import { ProjectMockup } from './ProjectMockup';

interface ProjectModalProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  projects,
  onClose,
  onSelectProject
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      
      const currentIndex = projects.findIndex((p) => p.id === project.id);
      if (e.key === 'ArrowRight' && currentIndex < projects.length - 1) {
        onSelectProject(projects[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectProject(projects[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, projects, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 shadow-2xl overflow-y-auto flex flex-col z-10 text-neutral-900 dark:text-neutral-100"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-neutral-950/90 dark:bg-neutral-950/90 light:bg-white/90 border-b border-neutral-800 dark:border-neutral-800 light:border-neutral-200 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {project.categoryLabel}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono hidden sm:inline">
                Project {currentIndex + 1} of {projects.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20"
              >
                <span>Open Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-800/60 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Visual Header Mockup */}
            <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200 shadow-inner">
              <ProjectMockup project={project} isDetailed={true} />
            </div>

            {/* Title & Tagline */}
            <div>
              <div className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                {project.tagline}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white mb-3">
                {project.name}
              </h2>
              <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Problem & Audience Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-neutral-950/60 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                <div className="flex items-center gap-2 text-amber-500 font-semibold text-xs uppercase tracking-wider mb-2">
                  <HelpCircle className="w-4 h-4" />
                  <span>Problem Solved</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-950/60 dark:bg-neutral-950/80 light:bg-neutral-50 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200">
                <div className="flex items-center gap-2 text-cyan-500 font-semibold text-xs uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4" />
                  <span>Target Audience</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.targetAudience}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>Key Platform Features</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feature, i) => (
                  <div 
                    key={i}
                    className="p-3 rounded-xl bg-neutral-950/40 dark:bg-neutral-950/60 light:bg-neutral-100/70 border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200/80 flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack Tags */}
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-500" />
                <span>Technologies & Implementation</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-neutral-950/70 dark:bg-neutral-950 light:bg-neutral-100 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-800 dark:border-neutral-800 light:border-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Action Button Bar */}
            <div className="p-6 rounded-2xl bg-neutral-950/70 dark:bg-neutral-950/90 light:bg-emerald-50/70 border border-neutral-800 dark:border-neutral-800 light:border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm text-neutral-900 dark:text-white">
                  Experience {project.name} Live
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Fully operational web application hosted on Vercel
                </div>
              </div>

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5"
              >
                <span>Visit Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Modal Footer: Prev / Next Navigation */}
          <div className="sticky bottom-0 px-6 py-4 bg-neutral-950/90 dark:bg-neutral-950/90 light:bg-white/90 border-t border-neutral-800 dark:border-neutral-800 light:border-neutral-200 backdrop-blur-md flex items-center justify-between">
            {prevProject ? (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev:</span>
                <span className="line-clamp-1 max-w-[140px] sm:max-w-[200px]">{prevProject.name}</span>
              </button>
            ) : <div />}

            {nextProject ? (
              <button
                onClick={() => onSelectProject(nextProject)}
                className="flex items-center gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 transition-colors ml-auto"
              >
                <span className="hidden sm:inline">Next:</span>
                <span className="line-clamp-1 max-w-[140px] sm:max-w-[200px]">{nextProject.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : <div />}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
