import React from 'react';
import { 
  HeartPulse, 
  Eye, 
  Utensils, 
  BookOpen, 
  Coffee, 
  Scale, 
  Flower2, 
  Trees, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  Clock,
  CheckCircle2,
  Lock,
  Compass,
  ShoppingBag,
  CreditCard,
  Smartphone,
  Layers,
  Database
} from 'lucide-react';
import { Project } from '../types';

interface ProjectMockupProps {
  project: Project;
  isDetailed?: boolean;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ project, isDetailed = false }) => {
  const { previewType } = project;

  // Custom visual previews for each project type
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
                <span>🍔 Restaurant Menu & Cart</span>
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
            <div className="text-sm font-bold text-neutral-100 flex items-center gap-1.5">
              <span>Dr. Addis Speciality Center</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Implants • Orthodontics • Veneers • Root Canal • Pediatric Care
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px]">
              <div className="p-1.5 rounded bg-neutral-900/70 border border-neutral-800 text-emerald-300">
                ⭐ Patient Smiles Showcase
              </div>
              <div className="p-1.5 rounded bg-neutral-900/70 border border-neutral-800 text-teal-300">
                📅 Slot Scheduling Active
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Addis Ababa, Ethiopia</span>
            <span className="text-emerald-400 font-semibold">Clinical Restorations →</span>
          </div>
        </div>
      );

    case 'productivity':
      return (
        <div className="w-full h-full bg-gradient-to-br from-cyan-950/80 via-neutral-900 to-sky-950/60 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-cyan-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Eye className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-cyan-300">Screen Wake Lock API</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">Active Display</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-neutral-100">StayAwake Ergonomics</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">Wake: ON</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <div className="text-cyan-400 font-semibold">20-20-20 Rule</div>
                <div className="text-neutral-400">Eye strain mitigation</div>
              </div>
              <div className="p-2 rounded bg-neutral-900/80 border border-neutral-800">
                <div className="text-cyan-400 font-semibold">Cognitive Checks</div>
                <div className="text-neutral-400">Fatigue alerts & reflex</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Dark UI • Battery Efficient</span>
            <span className="text-cyan-400 font-semibold">Web Utility →</span>
          </div>
        </div>
      );

    case 'jungle':
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-950/90 via-neutral-900 to-amber-950/50 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-emerald-300">Botanical Gastronomy</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">Cabana Booking</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Jungle Restaurant Experience</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Lush rainforest setting • Interactive digital menu with Vegan, Halal & Gluten-Free filters.
            </p>
            <div className="flex gap-1.5 text-[9px]">
              <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-200 border border-emerald-800">Halal</span>
              <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-200 border border-emerald-800">Vegan</span>
              <span className="px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-200 border border-emerald-800">Gluten-Free</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Atmospheric Dining</span>
            <span className="text-emerald-400 font-semibold">Reserve Cabana →</span>
          </div>
        </div>
      );

    case 'itkan':
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-950/80 via-neutral-900 to-yellow-950/60 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between border-b border-amber-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-amber-300">إتقان • Educational Academy</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50">Bilingual Arabic/EN</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100 flex items-center justify-between">
              <span>Itkan Mastery Platform</span>
              <span className="font-serif text-amber-300 text-sm">مَنْهَج الإِتْقَان</span>
            </div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Quranic Recitation • Tajweed • Arabic Grammar • Fiqh & Ethical Leadership.
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <div className="p-1.5 rounded bg-neutral-900/70 border border-neutral-800 text-amber-300">
                📜 Syllabus Downloads
              </div>
              <div className="p-1.5 rounded bg-neutral-900/70 border border-neutral-800 text-yellow-300">
                👥 Cohort Registration
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Geometric Design System</span>
            <span className="text-amber-400 font-semibold">Explore Academy →</span>
          </div>
        </div>
      );

    case 'elpacho':
      return (
        <div className="w-full h-full bg-gradient-to-br from-amber-950/90 via-neutral-900 to-stone-900 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-amber-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-amber-300">Single-Origin Roastery</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50">Micro-Lots</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">El Pacho Coffee Roasters</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Farm altitude • Washed, Natural & Anaerobic micro-lots • V60, Chemex & AeroPress guides.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-amber-200">
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">☕ Subscriptions</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">📦 Wholesale B2B</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Specialty Cupping Notes</span>
            <span className="text-amber-400 font-semibold">Roastery Catalog →</span>
          </div>
        </div>
      );

    case 'yellowflower':
      return (
        <div className="w-full h-full bg-gradient-to-br from-yellow-950/80 via-neutral-900 to-amber-950/60 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-yellow-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-yellow-500/20 text-yellow-400">
                <Flower2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-yellow-300">Lifestyle Café</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-900/60 text-yellow-300 border border-yellow-700/50">Floral Beans</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Yellow Flower Coffee</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Light roast Ethiopian coffees • Gesha specialty offerings • Botanical cold brews & café bakery.
            </p>
            <div className="flex gap-1.5 text-[10px] text-yellow-200">
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">🌸 Floral Profile</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">🥐 Pastry Pairings</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Online Pickup Orders</span>
            <span className="text-yellow-400 font-semibold">Order Café →</span>
          </div>
        </div>
      );

    case 'kosykawa':
      return (
        <div className="w-full h-full bg-gradient-to-br from-orange-950/80 via-neutral-900 to-stone-900 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-orange-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-orange-300">Neighborhood Lounge</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-900/60 text-orange-300 border border-orange-700/50">Remote-Work Ready</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100">Kosy Kawa Coffee & Bakery</div>
            <p className="text-[11px] text-neutral-300 line-clamp-2">
              Flat whites & Matcha • Fresh croissants & cinnamon buns • Wi-Fi speed & quiet work zone stats.
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-orange-200">
              <div className="p-1 rounded bg-neutral-900/80 border border-neutral-800">📶 High-Speed Wi-Fi</div>
              <div className="p-1 rounded bg-neutral-900/80 border border-neutral-800">🥐 Fresh Bake Timetable</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Community Events</span>
            <span className="text-orange-400 font-semibold">Visit Lounge →</span>
          </div>
        </div>
      );

    case 'inheritance':
      return (
        <div className="w-full h-full bg-gradient-to-br from-violet-950/80 via-neutral-900 to-indigo-950/60 p-5 flex flex-col justify-between text-white relative overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-violet-800/40 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-400">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-wide uppercase text-violet-300">Farā'iḍ Legal-Tech</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-900/60 text-violet-300 border border-violet-700/50">Calculation Engine</span>
          </div>

          <div className="my-auto space-y-2 py-2">
            <div className="text-sm font-bold text-neutral-100 flex items-center justify-between">
              <span>Islamic Inheritance Calculator</span>
              <span className="text-xs font-mono text-violet-300">Mīrāth Engine</span>
            </div>
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
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">🌿 Garden Atmosphere</span>
              <span className="px-2 py-0.5 rounded bg-neutral-900/80 border border-neutral-800">☕ Pour-over Bar</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/60">
            <span>Wedding & Events</span>
            <span className="text-emerald-400 font-semibold">Reserve Garden →</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-neutral-900 p-5 flex items-center justify-center text-neutral-400">
          <span>Project Showcase</span>
        </div>
      );
  }
};
