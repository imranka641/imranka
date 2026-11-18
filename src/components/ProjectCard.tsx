import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ExternalLink,
  ArrowUpRight,
  Check,
  Eye,
  Camera,
  Code2,
  Github,
} from 'lucide-react';
import { Project } from '../types';
import { ProjectMockup } from './ProjectMockup';
import { prefersReducedMotion } from '../utils/webglUtils';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  const [viewMode, setViewMode] = useState<'photo' | 'mockup'>('photo');
  const [tilt, setTilt] = useState<{ rx: number; ry: number; gx: number; gy: number }>({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 50,
  });
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'photo' ? 'mockup' : 'photo'));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const ry = (px - 0.5) * 10;
    const rx = (0.5 - py) * 10;
    setTilt({ rx, ry, gx: px * 100, gy: py * 100 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="perspective-1200 h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="group relative h-full rounded-2xl bg-[#080e22]/85 dark:bg-[#080e22]/90 light:bg-white border border-slate-800/90 dark:border-cyan-500/15 light:border-slate-200 hover:border-cyan-400/60 shadow-xl hover:shadow-cyan-500/15 flex flex-col justify-between overflow-hidden"
      >
        {/* Dynamic Cursor Spotlight Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(420px circle at ${tilt.gx}% ${tilt.gy}%, rgba(34, 211, 238, 0.12), transparent 60%)`,
          }}
        />

        {/* Top Preview Area */}
        <div
          onClick={() => onOpenModal(project)}
          className="relative h-56 sm:h-60 w-full overflow-hidden cursor-pointer border-b border-slate-800/80 light:border-slate-200"
        >
          <ProjectMockup
            project={project}
            viewMode={viewMode}
            onToggleViewMode={toggleViewMode}
          />

          {/* Hover Action Overlay */}
          <div className="absolute inset-0 bg-[#030612]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-center justify-center gap-2.5 backdrop-blur-[2px] z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(project);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#080e22]/95 border border-cyan-500/40 hover:border-cyan-400 flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Case Study</span>
            </button>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 whitespace-nowrap"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative z-20 p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Unboxed Metadata + Preview Toggle */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-medium text-cyan-400 dark:text-cyan-400 light:text-blue-600 line-clamp-1">
                {project.category} · {project.tagline}
              </span>
              <button
                onClick={toggleViewMode}
                className="shrink-0 text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-900/70 light:bg-slate-100 hover:bg-slate-800 text-slate-300 light:text-slate-700 border border-slate-700/70 light:border-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                title="Toggle preview display"
              >
                {viewMode === 'photo' ? (
                  <>
                    <Code2 className="w-3 h-3 text-cyan-400" />
                    <span>Blueprint</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-3 h-3 text-purple-400" />
                    <span>Photo</span>
                  </>
                )}
              </button>
            </div>

            {/* Project Title */}
            <h3
              onClick={() => onOpenModal(project)}
              className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors cursor-pointer mb-2 flex items-center justify-between"
            >
              <span className="line-clamp-1">{project.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1 text-cyan-400" />
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
              {project.shortDescription}
            </p>

            {/* Key Feature Highlights */}
            <div className="space-y-1.5 mb-5">
              {project.features.slice(0, 3).map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                >
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Technology Stack */}
            <div className="flex flex-wrap items-center gap-1.5 mb-5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              {project.technologies.slice(0, 4).map((tech, idx) => (
                <React.Fragment key={tech}>
                  <span className="px-2 py-0.5 rounded bg-slate-900/70 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700">
                    {tech}
                  </span>
                  {idx < Math.min(project.technologies.length, 4) - 1 && (
                    <span className="sr-only">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-slate-800/70 light:border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenModal(project)}
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Details</span>
                <span aria-hidden="true">→</span>
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 light:text-slate-700 hover:text-white bg-slate-900/80 light:bg-slate-100 border border-slate-700/70 light:border-slate-300 transition-colors"
                    aria-label={`View ${project.name} on GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-400 light:text-blue-700 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all whitespace-nowrap"
                  aria-label={`View Live Demo of ${project.name}`}
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
