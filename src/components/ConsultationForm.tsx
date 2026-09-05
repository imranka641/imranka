import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Send, 
  Check, 
  CheckCircle2, 
  HelpCircle, 
  Globe, 
  MessageSquare,
  Sparkles,
  PhoneCall,
  Mail
} from 'lucide-react';

interface ConsultationFormProps {
  onSuccess?: () => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    emailOrHandle: '',
    organization: '',
    meetingPlatform: 'Google Meet',
    timezone: 'East Africa Time (EAT, UTC+3)',
    preferredDay: 'This Week',
    preferredTime: 'Afternoon (2:00 PM - 5:00 PM EAT)',
    agendaTopic: 'System Architecture & Tech Stack Planning',
    specificQuestions: ''
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const meetingPlatforms = [
    { id: 'Google Meet', label: 'Google Meet (Web Video Call)', desc: 'Link generated directly for browser video meeting' },
    { id: 'Telegram Call', label: 'Telegram Audio / Video (@imranka641)', desc: 'Instant call on Telegram with screen share support' },
    { id: 'WhatsApp Call', label: 'WhatsApp Call (+251 913 841 757)', desc: 'Direct WhatsApp audio or video session' },
    { id: 'Zoom', label: 'Zoom Video Conference', desc: 'Standard Zoom meeting invite' }
  ];

  const agendaPresets = [
    'System Architecture & Tech Stack Planning',
    'Ethiopian Payment Gateway (Telebirr & CBE Birr)',
    'Full-Stack Custom Web Application Discovery',
    'Database Schema Design & Query Optimization',
    'Codebase Review & Performance Modernization'
  ];

  const getMeetingSummary = () => {
    return `📅 Discovery Technical Consultation Request:
• Client Name: ${formData.name || '[Name]'}
• Contact Channel: ${formData.emailOrHandle || '[Email/Handle]'}
• Organization: ${formData.organization || 'Independent Project'}
• Preferred Meeting Platform: ${formData.meetingPlatform}
• Client Timezone: ${formData.timezone}
• Preferred Time Window: ${formData.preferredDay} — ${formData.preferredTime}
• Agenda Focus: ${formData.agendaTopic}
${formData.specificQuestions ? `• Details/Questions: ${formData.specificQuestions}` : ''}

Looking forward to our technical discovery call!`;
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.emailOrHandle.trim()) return;

    setSubmitted(true);
    const summary = getMeetingSummary();

    try {
      navigator.clipboard.writeText(summary);
    } catch {
      // fallback
    }

    const encoded = encodeURIComponent(summary);
    window.open(`https://t.me/imranka641?text=${encoded}`, '_blank');
    if (onSuccess) onSuccess();
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-xl">
      {/* Form Header with Overview Description */}
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>Technical Discovery Session</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
          Schedule a 20-Minute Technical Consultation
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
          Book a direct one-on-one session to discuss software architecture, database blueprints, payment integrations (Telebirr/CBE Birr), or custom web application roadmaps. All sessions are 100% free with zero obligation.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
              Consultation Request Dispatched!
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
              Your preferred meeting parameters have been opened in Telegram. Imran Kedir will confirm the meeting invite and video link shortly.
            </p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 underline underline-offset-4 cursor-pointer"
          >
            ← Modify consultation parameters
          </button>
        </div>
      ) : (
        <form onSubmit={handleBook} className="space-y-6">
          
          {/* Row 1: Name & Contact with Helper Descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Abebe Bekele / Sara Ahmed"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Your name will appear on the calendar invitation and meeting notes.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                Your Telegram Handle / Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.emailOrHandle}
                onChange={(e) => setFormData({ ...formData, emailOrHandle: e.target.value })}
                placeholder="e.g. @yourtelegram or email@domain.com"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Used to dispatch the calendar invite link and meeting passcode.
              </p>
            </div>
          </div>

          {/* Row 2: Organization & Meeting Platform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                Company / Organization (Optional)
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Addis Tech Labs / Clinic Owner"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Helps Imran prepare industry-specific benchmarks and architectural diagrams.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                Preferred Meeting Channel
              </label>
              <select
                value={formData.meetingPlatform}
                onChange={(e) => setFormData({ ...formData, meetingPlatform: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                {meetingPlatforms.map((p) => (
                  <option key={p.id} value={p.id} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
                    {p.label}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-neutral-500 mt-1">
                Select your preferred application for voice, video, and screen sharing.
              </p>
            </div>
          </div>

          {/* Row 3: Timezone & Target Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                Your Time Zone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="East Africa Time (EAT, UTC+3)">East Africa Time (EAT, UTC+3)</option>
                <option value="Gulf Standard Time (GST, UTC+4)">Gulf Standard Time (GST, UTC+4)</option>
                <option value="Central European Time (CET, UTC+1)">Central European Time (CET, UTC+1)</option>
                <option value="Eastern Time (EST, UTC-5)">Eastern Time (EST, UTC-5)</option>
                <option value="Coordinated Universal Time (UTC)">UTC Standard</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                Preferred Day
              </label>
              <select
                value={formData.preferredDay}
                onChange={(e) => setFormData({ ...formData, preferredDay: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Today (Urgent)">Today (Priority)</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="This Week">This Week</option>
                <option value="Next Week">Next Week</option>
                <option value="Weekend (Saturday/Sunday)">Weekend Session</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                Preferred Time Slot
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Morning (9:00 AM - 12:00 PM EAT)">Morning (9:00 AM - 12:00 PM EAT)</option>
                <option value="Afternoon (2:00 PM - 5:00 PM EAT)">Afternoon (2:00 PM - 5:00 PM EAT)</option>
                <option value="Evening (6:00 PM - 9:00 PM EAT)">Evening (6:00 PM - 9:00 PM EAT)</option>
              </select>
            </div>
          </div>

          {/* Row 4: Agenda Selection with Quick Presets */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1.5">
              Primary Technical Agenda / Focus Topic
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {agendaPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setFormData({ ...formData, agendaTopic: preset })}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    formData.agendaTopic === preset
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'bg-neutral-50 dark:bg-neutral-950/60 border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={formData.agendaTopic}
              onChange={(e) => setFormData({ ...formData, agendaTopic: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Row 5: Specific Technical Questions */}
          <div>
            <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
              Key Questions or Current Challenges (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.specificQuestions}
              onChange={(e) => setFormData({ ...formData, specificQuestions: e.target.value })}
              placeholder="e.g. We want to know if Telebirr webhook callbacks need static IP, or how to handle high-traffic orders..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Providing context ahead of time ensures Imran brings relevant code samples and diagrams to the call.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-500 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Free 20-minute session • Guaranteed within 24h confirmation</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Confirm & Request Consultation</span>
            </button>
          </div>

        </form>
      )}
    </div>
  );
};
