import React from 'react';
import { 
  HeartPulse, 
  Utensils, 
  BookOpen, 
  Coffee, 
  Trees, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  Layers, 
  Database,
  Camera,
  Code2,
  Image as ImageIcon,
  Keyboard,
  FileText
} from 'lucide-react';
import { Project } from '../types';

interface ProjectMockupProps {
  project: Project;
  isDetailed?: boolean;
  viewMode?: 'photo' | 'mockup';
  onToggleViewMode?: () => void;
  selectedPhotoIndex?: number;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ 
  project, 
  isDetailed = false,
  viewMode = 'photo',
  onToggleViewMode,
  selectedPhotoIndex = 0
}) => {
  const { previewType } = project;
  const [imgFailed, setImgFailed] = React.useState(false);

  React.useEffect(() => {
    setImgFailed(false);
  }, [project.id, selectedPhotoIndex]);

  // Realistic photo view
  if (viewMode === 'photo') {
    const currentPhoto = project.gallery?.[selectedPhotoIndex] || {
      url: project.image,
      caption: project.tagline,
      alt: project.name
    };

    return (
      <div className="w-full h-full relative overflow-hidden bg-[#050918] group/photo select-none">
        {!imgFailed ? (
          <img
            src={currentPhoto.url}
            alt={currentPhoto.alt || project.name}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#081230] via-[#050918] to-[#170d2e]">
            <Layers className="w-8 h-8 text-cyan-400 mb-2" />
            <div className="text-sm font-display font-bold text-white">{project.name}</div>
            <div className="text-xs text-slate-400 mt-1 line-clamp-1">{project.tagline}</div>
          </div>
        )}

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030612] via-[#030612]/35 to-black/30 pointer-events-none" />

        {/* Top Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-300 bg-[#030612]/80 px-2.5 py-1 rounded-md border border-cyan-500/25 backdrop-blur-sm">
            <Camera className="w-3 h-3 text-cyan-400" />
            <span>Preview</span>
            {project.gallery && project.gallery.length > 1 && (
              <span className="text-slate-400">· {project.gallery.length}</span>
            )}
          </div>

          {onToggleViewMode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleViewMode();
              }}
              className="pointer-events-auto px-2.5 py-1 rounded-md text-[10px] font-semibold bg-[#080e22]/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 backdrop-blur-md transition-all flex items-center gap-1 shadow-md hover:text-cyan-400"
              title="Switch to UI Architecture blueprint"
            >
              <Code2 className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">Show</span> Mockup
            </button>
          )}
        </div>

        {/* Bottom Caption & Stat */}
        <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none">
          <div className="flex items-end justify-between gap-2">
            <div className="max-w-[85%]">
              <p className="text-[11px] font-medium text-white/95 line-clamp-1 drop-shadow-md">
                {currentPhoto.caption || project.tagline}
              </p>
              {project.stats?.[0] && (
                <div className="mt-1 text-[10px] font-mono text-cyan-300">
                  {project.stats[0].label}: <span className="text-white font-semibold">{project.stats[0].value}</span>
                </div>
              )}
            </div>

            <div className="p-1 rounded-md bg-[#030612]/75 text-slate-300 border border-slate-800">
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Simulated UI Blueprint / Architecture Mockup
  switch (previewType) {
    case 'food-ordering':
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-950/90 via-neutral-900 to-orange-950/80 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-amber-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-amber-300">Food Ordering & Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-700/50">Telebirr / CBE Birr</span>
            </div>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-neutral-100 flex items-center gap-1.5">
                <span>Restaurant Menu & Cart</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Admin + Customer
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Browse Menu • Add to Cart • Telebirr / CBE Birr Checkout • Live Order Tracking
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
              <div className="p-1.5 rounded bg-neutral-900/80 border border-neutral-800 flex items-center gap-1.5 text-amber-300">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Telebirr & CBE Birr</span>
              </div>
              <div className="p-1.5 rounded bg-neutral-900/80 border border-neutral-800 flex items-center gap-1.5 text-orange-300">
                <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Admin Dashboard</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3 text-amber-400" />
              <span>PHP • MySQL System</span>
            </span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <span>Live System</span>
              <span>→</span>
            </span>
          </div>
        </div>
      );

    case 'dental':
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-950/80 via-neutral-900 to-teal-950/60 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-emerald-300">Dental Speciality Clinic</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">Online Booking</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Dr. Addis Clinical Care</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Real-time slot scheduling • Implants, Orthodontics, Veneers & Pediatric care • Transparent clinical intake.
            </p>
            <div className="flex gap-1.5 text-[10px] text-emerald-300">
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">Smile Transformations</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">Patient Intake</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Specialist Dentistry</span>
            <span className="text-emerald-400 font-semibold">Book Consult →</span>
          </div>
        </div>
      );

    case 'productivity':
      return (
        <div className="w-full h-full bg-gradient-to-br from-cyan-950/80 via-neutral-900 to-slate-950/90 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-cyan-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-cyan-300">Screen Wake Lock API</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">Active Display</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">StayAwake Productivity Engine</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Native browser keep-alive • 20-20-20 ergonomic eye strain intervals • Cognitive alertness reflex checks.
            </p>
            <div className="flex gap-1.5 text-[10px] text-cyan-300">
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60">No Desktop Install</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60">Audio Cues</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Developer Utility</span>
            <span className="text-cyan-400 font-semibold">Launch Tool →</span>
          </div>
        </div>
      );

    case 'jungle':
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-950/90 via-neutral-900 to-green-950/80 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Trees className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-emerald-300">Botanical Dining</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">Cabana Booking</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Jungle Sensory Experience</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Digital culinary menus • Halal, Vegan & Gluten-Free filters • Private botanical cabana reservation system.
            </p>
            <div className="flex gap-1.5 text-[10px] text-emerald-300">
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">Rainforest Ambience</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60">Chef Showcases</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Hospitality Platform</span>
            <span className="text-emerald-400 font-semibold">Reserve Cabana →</span>
          </div>
        </div>
      );

    case 'itkan':
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-950/80 via-neutral-900 to-yellow-950/70 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-amber-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-amber-300">Itkan Academy (إتقان)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50">Bilingual Arabic/EN</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Institutional Mastery Platform</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Quranic Tajweed & Arabic grammar • Islamic Jurisprudence & Ethical Leadership • Verified scholar dossiers.
            </p>
            <div className="flex gap-1.5 text-[10px] text-amber-300">
              <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/60">Geometric Design</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/60">Syllabus PDF</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Islamic EdTech</span>
            <span className="text-amber-400 font-semibold">Explore Courses →</span>
          </div>
        </div>
      );

    case 'elpacho':
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-950/80 via-neutral-900 to-stone-900 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-amber-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-amber-300">Micro-Roastery</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50">Single-Origin</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">El Pacho Roasters</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Traceable farm altitude & cupping notes • Interactive V60 & Chemex extraction guides • Wholesale B2B ordering.
            </p>
            <div className="flex gap-1.5 text-[10px] text-amber-300">
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Washed & Natural</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Sensory Radar</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Specialty Coffee</span>
            <span className="text-amber-400 font-semibold">Brew Guides →</span>
          </div>
        </div>
      );

    case 'yellowflower':
      return (
        <div className="w-full h-full bg-gradient-to-br from-yellow-950/80 via-neutral-900 to-amber-950/60 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-yellow-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-yellow-300">Yellow Flower Coffee</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-900/60 text-yellow-300 border border-yellow-700/50">Pickup Ordering</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Aesthetic Floral Café</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Floral Gesha light roasts • Botanical cold brews & artisanal pastry pairings • Seamless curbside pickup.
            </p>
            <div className="flex gap-1.5 text-[10px] text-yellow-200">
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Pastry Pairings</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Light Roasts</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Urban Café Experience</span>
            <span className="text-yellow-400 font-semibold">Order Ahead →</span>
          </div>
        </div>
      );

    case 'kosykawa':
      return (
        <div className="w-full h-full bg-gradient-to-br from-orange-950/80 via-neutral-900 to-amber-950/70 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-orange-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-orange-300">Kosy Kawa</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-900/60 text-orange-300 border border-orange-700/50">Bakery & Study</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">European Coffee Lounge</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Fresh-baked croissants & sourdough • Live Wi-Fi speed & quiet study nook maps • Community event calendar.
            </p>
            <div className="flex gap-1.5 text-[10px] text-orange-200">
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Remote Work Nook</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Bake Timetable</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Neighborhood Lounge</span>
            <span className="text-orange-400 font-semibold">View Amenities →</span>
          </div>
        </div>
      );

    case 'inheritance':
      return (
        <div className="w-full h-full bg-gradient-to-br from-violet-950/80 via-neutral-900 to-purple-950/70 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-violet-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-violet-300">Islamic Farā'iḍ Engine</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-900/60 text-violet-300 border border-violet-700/50">Exact Math</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Mīrāth Calculation Algorithm</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Net estate deductions • Quranic prescribed shares (Furūḍ) • Exclusion logic (Ḥajb) & 'Awl/Radd.
            </p>
            <div className="flex gap-1.5 text-[9px] text-violet-200">
              <span className="px-2 py-0.5 rounded bg-violet-950/70 border border-violet-800">1/2, 1/3, 2/3 Shares</span>
              <span className="px-2 py-0.5 rounded bg-violet-950/70 border border-violet-800">Estate Statement PDF</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Educational Tool</span>
            <span className="text-violet-400 font-semibold">Calculate Shares →</span>
          </div>
        </div>
      );

    case 'garden':
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-950/80 via-neutral-900 to-teal-950/60 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Trees className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-emerald-300">Garden Restaurant & Coffee</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">Outdoor Cabanas</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Al White Garden Dining</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Luminous open-air cabanas • Breakfast, Lunch, Grill & Specialty Pour-overs • Private Event Inquiries.
            </p>
            <div className="flex gap-1.5 text-[10px] text-emerald-200">
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Garden Atmosphere</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Pour-over Bar</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Wedding & Events</span>
            <span className="text-emerald-400 font-semibold">Reserve Garden →</span>
          </div>
        </div>
      );

    case 'typemaster':
      return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-950 via-slate-950 to-cyan-950/60 p-4 sm:p-5 flex flex-col justify-between text-white relative overflow-hidden select-none font-mono">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-800/40 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Keyboard className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wider uppercase text-cyan-300">TypeMaster</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                Offline IndexedDB
              </span>
            </div>
          </div>

          {/* Typing test HUD */}
          <div className="my-auto space-y-2.5 py-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-3">
                <div>
                  <span className="text-[10px] text-neutral-400 block">WPM</span>
                  <span className="text-base font-bold text-cyan-400">84.2</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">ACCURACY</span>
                  <span className="text-base font-bold text-emerald-400">98.6%</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">TIME</span>
                  <span className="text-base font-bold text-neutral-200">00:45</span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-900/40 text-cyan-300 border border-cyan-700/40">
                Alt + F Focus
              </span>
            </div>

            {/* Prompt text simulation */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-[11px] leading-relaxed">
              <span className="text-emerald-400 font-bold">function</span>{" "}
              <span className="text-cyan-300">calculateVelocity</span>
              <span className="text-neutral-400">(distance, time) &#123;</span>
              <span className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 animate-pulse align-middle" />
            </div>

            {/* Visual Home-Row anchors */}
            <div className="grid grid-cols-8 gap-1 text-center text-[9px] font-bold">
              {['A', 'S', 'D', 'F', 'J', 'K', 'L', ';'].map((key) => (
                <div key={key} className="py-1 rounded bg-neutral-900 border border-cyan-800/50 text-cyan-300">
                  {key}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Adaptive Drills • Heatmaps</span>
            <span className="text-cyan-400 font-semibold">Start Sprint →</span>
          </div>
        </div>
      );

    case 'makecv':
      return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-emerald-950/60 p-4 sm:p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wider uppercase text-emerald-300">MakeCV</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                ATS Score 96/100
              </span>
            </div>
          </div>

          {/* Mini A4 preview canvas */}
          <div className="my-auto py-1 flex items-center gap-3">
            <div className="w-24 h-28 bg-white text-neutral-900 p-2 rounded shadow-lg border border-neutral-300 flex flex-col justify-between shrink-0">
              <div>
                <div className="h-2 w-12 bg-neutral-900 rounded-sm mb-1" />
                <div className="h-1 w-8 bg-emerald-600 rounded-xs mb-2" />
                <div className="space-y-1">
                  <div className="h-1 w-full bg-neutral-300 rounded-xs" />
                  <div className="h-1 w-16 bg-neutral-300 rounded-xs" />
                  <div className="h-1 w-14 bg-neutral-300 rounded-xs" />
                </div>
              </div>
              <div className="pt-1 border-t border-neutral-200 flex justify-between items-center text-[7px] text-neutral-500 font-mono">
                <span>Page 1/1</span>
                <span className="text-emerald-700 font-bold">A4</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs flex-1">
              <div className="font-bold text-neutral-100 flex items-center gap-1.5">
                <span>ATS-Friendly Engine</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/40">6 Templates</span>
              </div>
              <p className="text-[11px] text-neutral-300 line-clamp-2">
                Real-time A4 document canvas • Multi-page PDF export • RTL Arabic & Amharic Ethiopic typography.
              </p>
              <div className="flex gap-1 text-[9px] text-emerald-200">
                <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">100% Client-Side</span>
                <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">JSON Restore</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>A4 Document Canvas</span>
            <span className="text-emerald-400 font-semibold">Generate PDF →</span>
          </div>
        </div>
      );

    case 'jungle-house':
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-950/90 via-neutral-900 to-green-950/70 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Trees className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-emerald-300">Jungle House</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">Resort & Lodges</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Luxury Eco-Sanctuary & Lodges</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Bespoke forest lodge accommodations • Private celebration pavilion • Wellness retreats & experiential events.
            </p>
            <div className="flex gap-1.5 text-[10px] text-emerald-200">
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Private Lodges</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">Event Sanctuaries</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Availability Check</span>
            <span className="text-emerald-400 font-semibold">Explore Lodges →</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-neutral-800/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-neutral-200">{project.name}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
              {project.category}
            </span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">{project.tagline || project.name}</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              {project.shortDescription}
            </p>
            <div className="flex flex-wrap gap-1 text-[10px] text-emerald-300">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Production Deployment</span>
            <span className="text-emerald-400 font-semibold">View Live →</span>
          </div>
        </div>
      );
  }
};
