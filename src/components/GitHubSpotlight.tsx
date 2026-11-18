import React from 'react';
import { Github, ExternalLink, Code2, GitBranch } from 'lucide-react';

export const GitHubSpotlight: React.FC = () => {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#080e22] via-[#040817] to-[#080e22] dark:from-[#080e22] dark:via-[#040817] dark:to-[#080e22] light:from-slate-900 light:via-slate-900 light:to-[#040817] p-8 sm:p-12 border border-cyan-500/20 shadow-2xl overflow-hidden text-white">
          {/* Decorative background glows */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info & CTA */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold">
                <Github className="w-3.5 h-3.5" />
                <span dir="ltr">github.com/imranka641</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
                Explore My Code &amp; Repositories
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                I write clean, self-documenting TypeScript, modular component hierarchies, and normalized database models. Browse my GitHub repositories, open-source tooling, and production architectures.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://github.com/imranka641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25 hover:-translate-y-0.5"
                >
                  <Github className="w-5 h-5" />
                  <span>Visit My GitHub (@imranka641)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Active Branches</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>React / TypeScript / Kotlin</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Terminal Visual */}
            <div className="lg:col-span-5" dir="ltr">
              <div className="rounded-2xl bg-[#030612]/95 border border-slate-800 p-5 font-mono text-xs shadow-xl space-y-3">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  </div>
                  <span className="text-[11px] text-slate-400">git bash • imranka641</span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-cyan-400">$</span>
                    <span>git clone https://github.com/imranka641/repo.git</span>
                  </div>
                  <div className="text-slate-400">Cloning into &apos;repo&apos;...</div>
                  <div className="text-cyan-400">Remote repository synchronized</div>
                  <div className="flex items-center gap-2 text-slate-400 pt-1">
                    <span className="text-cyan-400">$</span>
                    <span>npm install &amp;&amp; npm run dev</span>
                  </div>
                  <div className="p-2 rounded bg-[#080e22] border border-cyan-500/20 text-[11px] text-cyan-300">
                    Dev server listening cleanly on port 3000
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
