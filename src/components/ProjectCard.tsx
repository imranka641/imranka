import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  Check, 
  Eye,
  Camera,
  Code2
} from 'lucide-react';
import { Project } from '../types';
import { ProjectMockup } from './ProjectMockup';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const [viewMode, setViewMode] = useState<'photo' | 'mockup'>('photo');

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'photo' ? 'mockup' : 'photo'));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-white border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200/90 hover:border-neutral-700 dark:hover:border-neutral-700 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Preview Area with Realistic Photo & UI Mockup Switcher */}
      <div 
        onClick={() => onOpenModal(project)}
        className="relative h-56 sm:h-60 w-full overflow-hidden cursor-pointer border-b border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200"
      >
        <ProjectMockup 
          project={project} 
          viewMode={viewMode}
          onToggleViewMode={toggleViewMode}
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-neutral-950/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 backdrop-blur-[2px] z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(project);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-900/95 border border-neutral-700 hover:bg-neutral-800 flex items-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Case Study</span>
          </button>
          
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 whitespace-nowrap"
          >
            <span>View Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Tagline & View Switcher */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 line-clamp-1">
              {project.tagline}
            </span>
            <button
              onClick={toggleViewMode}
              className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-800/60 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-700/60 transition-colors flex items-center gap-1"
              title="Toggle preview display"
            >
              {viewMode === 'photo' ? (
                <>
                  <Code2 className="w-2.5 h-2.5 text-cyan-400" />
                  <span>UI Blueprint</span>
                </>
              ) : (
                <>
                  <Camera className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Real Photo</span>
                </>
              )}
            </button>
          </div>

          {/* Project Title */}
          <h3 
            onClick={() => onOpenModal(project)}
            className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors cursor-pointer mb-2.5 flex items-center justify-between"
          >
            <span className="line-clamp-1">{project.name}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1 text-emerald-400" />
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Key Features Bullet highlights */}
          <div className="space-y-1.5 mb-5">
            {project.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-900/60 dark:bg-neutral-900 light:bg-neutral-100 text-neutral-600 dark:text-neutral-400 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-neutral-800/60 dark:border-neutral-800/80 light:border-neutral-100 flex items-center justify-between gap-2">
            <button
              onClick={() => onOpenModal(project)}
              className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>Case Study</span>
              <span>→</span>
            </button>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 transition-all hover:-translate-y-0.5"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all hover:-translate-y-0.5 whitespace-nowrap"
                aria-label={`View Live Demo of ${project.name}`}
              >
                <span>View Live Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
