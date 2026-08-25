import React from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  ArrowUpRight, 
  Sparkles, 
  Check, 
  Layers, 
  Eye,
  Tag
} from 'lucide-react';
import { Project } from '../types';
import { ProjectMockup } from './ProjectMockup';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group rounded-2xl bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-white border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200/90 hover:border-neutral-700 dark:hover:border-neutral-700 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Preview Area */}
      <div 
        onClick={() => onOpenModal(project)}
        className="relative h-52 sm:h-56 w-full overflow-hidden cursor-pointer border-b border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200"
      >
        <ProjectMockup project={project} />

        {/* Hover Overlay Button */}
        <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(project);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-900/90 border border-neutral-700 hover:bg-neutral-800 flex items-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>Case Study</span>
          </button>
          
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5 shadow-lg shadow-emerald-600/30"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Category Pill Over Preview */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-neutral-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
            {project.category}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Tagline */}
          <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1.5 line-clamp-1">
            {project.tagline}
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
          <div className="pt-4 border-t border-neutral-800/60 dark:border-neutral-800/80 light:border-neutral-100 flex items-center justify-between gap-3">
            <button
              onClick={() => onOpenModal(project)}
              className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>View Details</span>
              <span>→</span>
            </button>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all hover:-translate-y-0.5"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
