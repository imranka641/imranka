import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import { prefersReducedMotion } from '../utils/webglUtils';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: string;
  kind: 'experience' | 'education' | 'certification';
  title: string;
  subtitle: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  tags: string[];
  link?: string;
}

export const ExperienceEducation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const timelineItems: TimelineItem[] = [
    ...CV_DATA.experiences.map((exp, i) => ({
      id: `exp-${i}`,
      kind: 'experience' as const,
      title: exp.role,
      subtitle: exp.organization,
      location: exp.location,
      period: exp.period,
      description: exp.summary,
      highlights: exp.bulletPoints.slice(0, 3),
      tags: exp.technologies,
      link: exp.liveUrl,
    })),
    ...CV_DATA.education.map((edu, i) => ({
      id: `edu-${i}`,
      kind: 'education' as const,
      title: edu.degree,
      subtitle: `${edu.institution}${edu.faculty ? ` — ${edu.faculty}` : ''}`,
      location: edu.location,
      period: edu.period,
      description:
        edu.focus ||
        'Comprehensive academic foundation in Computing, Software Engineering, Algorithms, Web Technologies, and Information Systems.',
      highlights: edu.highlights,
      tags: (edu.relevantAreas || []).slice(0, 6),
    })),
    ...CV_DATA.certifications.map((cert, i) => ({
      id: `cert-${i}`,
      kind: 'certification' as const,
      title: cert.name,
      subtitle: cert.issuer,
      location: 'Verified Credential',
      period: cert.year,
      description: cert.description || '',
      highlights: [],
      tags: cert.topics,
    })),
  ];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.timeline-card', {
        opacity: 0,
        y: 28,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getBadgeStyle = (kind: TimelineItem['kind']) => {
    switch (kind) {
      case 'experience':
        return {
          icon: <Briefcase className="w-4 h-4 text-cyan-400" />,
          label: 'Engineering Experience',
          ring: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 light:text-cyan-700',
          dot: 'bg-cyan-400 shadow-cyan-400/50',
        };
      case 'education':
        return {
          icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
          label: 'University Education',
          ring: 'border-purple-500/40 bg-purple-500/10 text-purple-300 light:text-purple-700',
          dot: 'bg-purple-400 shadow-purple-400/50',
        };
      case 'certification':
        return {
          icon: <Award className="w-4 h-4 text-amber-400" />,
          label: 'Certification',
          ring: 'border-amber-500/40 bg-amber-500/10 text-amber-300 light:text-amber-700',
          dot: 'bg-amber-400 shadow-amber-400/50',
        };
    }
  };

  return (
    <section id="experience" ref={containerRef} className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-3">
            Career &amp; Academic Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight mb-4 text-balance">
            Experience &amp; Education
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Production full-stack &amp; mobile engineering backed by Computing &amp; Information Science studies at Jimma University and Udacity Nanodegree training.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Glowing Central / Left Axis Line */}
          <div
            aria-hidden="true"
            className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-purple-500/50 to-amber-500/30"
          />

          <div className="space-y-10">
            {timelineItems.map((item, idx) => {
              const style = getBadgeStyle(item.kind);
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`timeline-card relative flex flex-col md:flex-row items-start ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  } gap-6 md:gap-0`}
                >
                  {/* Timeline Node Marker */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-5 md:left-1/2 -translate-x-1/2 top-6 w-3.5 h-3.5 rounded-full ${style.dot} shadow-lg ring-4 ring-[#030612] dark:ring-[#030612] light:ring-slate-50 z-10`}
                  />

                  {/* Spacer on alternating half */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isLeft ? 'md:pr-10' : 'md:pl-10'
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 rounded-2xl bg-[#080e22]/85 dark:bg-[#080e22]/85 light:bg-white border border-slate-800/90 dark:border-cyan-500/15 light:border-slate-200 hover:border-cyan-400/40 transition-all shadow-xl"
                    >
                      {/* Clean Metadata Line (Zero Pill Clutter) */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 dark:text-cyan-400 light:text-cyan-700">
                          {style.icon}
                          <span>{style.label}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 tabular-nums">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-purple-400" />
                            {item.period}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white mb-1">
                        {item.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {item.subtitle}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {item.location}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {item.highlights.length > 0 && (
                        <ul className="space-y-1.5 mb-4">
                          {item.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="pt-3 border-t border-slate-800/70 dark:border-slate-800/80 light:border-slate-100 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {item.tags.slice(0, 5).map((tag, ti) => (
                            <React.Fragment key={tag}>
                              <span>{tag}</span>
                              {ti < Math.min(item.tags.length, 5) - 1 && (
                                <span aria-hidden="true" className="text-cyan-500/50">
                                  /
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>

                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 whitespace-nowrap"
                          >
                            <span>Live App</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
