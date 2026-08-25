import React from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  ExternalLink, 
  Code2, 
  GitBranch, 
  Terminal,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const GitHubSpotlight: React.FC = () => {
  const { isRTL } = useLanguage();
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 dark:from-neutral-900 dark:via-neutral-900/95 dark:to-neutral-950 light:bg-gradient-to-br light:from-emerald-950 light:via-neutral-900 light:to-neutral-950 p-8 sm:p-12 border border-neutral-800 dark:border-neutral-800 light:border-emerald-900/40 shadow-2xl overflow-hidden text-white">
          
          {/* Decorative background glows */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Info & CTA */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
                <Github className="w-3.5 h-3.5" />
                <span dir="ltr">github.com/imranka641</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Explore My Code & Projects
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
                I believe in writing clean, self-documenting code, modular component hierarchies, and well-structured database models. Check out my GitHub repositories, open-source work, and code structures.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://github.com/imranka641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/45 hover:-translate-y-0.5"
                >
                  <Github className="w-5 h-5" />
                  <span>Visit My GitHub (@imranka641)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Active Branches</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>TypeScript / React</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Terminal Visual */}
            <div className="lg:col-span-5" dir="ltr">
              <div className="rounded-2xl bg-neutral-950/90 border border-neutral-800 p-5 font-mono text-xs shadow-xl space-y-3">
                <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className="text-[11px] text-neutral-400">git bash • imranka641</span>
                </div>

                <div className="space-y-2 text-neutral-300">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="text-emerald-400">$</span>
                    <span>git clone https://github.com/imranka641/repo.git</span>
                  </div>
                  <div className="text-neutral-400">Cloning into 'repo'...</div>
                  <div className="text-emerald-400">✔ Remote repository synchronized</div>
                  <div className="flex items-center gap-2 text-neutral-400 pt-1">
                    <span className="text-emerald-400">$</span>
                    <span>npm install && npm run dev</span>
                  </div>
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-emerald-300">
                    🚀 Dev server running on localhost:3000 (Ready in ~180ms)
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
