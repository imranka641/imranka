import React from 'react';
import { 
  Terminal, 
  Github, 
  Mail, 
  MessageSquare, 
  Send, 
  ArrowUp,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenCV?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCV }) => {
  const { t, isRTL } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.skills, href: '#skills' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.services, href: '#services' },
    { name: t.nav.cv, href: '#cv' },
    { name: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#cv' && onOpenCV) {
      onOpenCV();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-950 dark:bg-neutral-950 light:bg-neutral-900 border-t border-neutral-800/80 text-neutral-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-neutral-800/80">
          
          {/* Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-base text-white">Imran Kedir</span>
                <span className="text-xs text-emerald-400 block font-mono">Full-Stack Developer</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              {t.hero.description}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t.hero.badgeLocation}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-emerald-400 transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social Channels & Direct CTAs */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Connect Directly
            </h4>
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/imranka641"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="mailto:imranka641@gmail.com"
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Email Imran Kedir"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/251913841757"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href="https://t.me/imranka641"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[11px] text-neutral-400 pt-1 font-mono" dir="ltr">
              WhatsApp: +251 913 841 757
            </p>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-neutral-400 space-y-1 text-center sm:text-left">
            <div>{t.footer.rights}</div>
            <div className="text-neutral-400 flex items-center justify-center sm:justify-start gap-1">
              <span>{t.footer.builtWith}</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors flex items-center gap-1.5 font-mono text-xs shadow-sm"
            aria-label="Scroll back to top"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
