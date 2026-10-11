import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Smartphone, 
  Layers, 
  Code, 
  Monitor, 
  Check, 
  Info, 
  Send, 
  CheckCircle2,
  Sparkles,
  MapPin
} from 'lucide-react';
import { ServiceInfoModal } from './ServiceInfoModal';

interface ContactSectionProps {
  lang: 'en' | 'ar';
  selectedService: string;
  setSelectedService: (service: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  lang, 
  selectedService, 
  setSelectedService 
}) => {
  const isAr = lang === 'ar';

  const [modalService, setModalService] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    {
      id: 'App Development',
      nameEn: 'App Development',
      nameAr: 'تطوير التطبيقات',
      icon: <Smartphone className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: 'Full Stack Development',
      nameEn: 'Full Stack Development',
      nameAr: 'تطوير الأنظمة المتكاملة',
      icon: <Layers className="w-4 h-4 text-lime-400" />,
    },
    {
      id: 'Frontend Development',
      nameEn: 'Frontend Development',
      nameAr: 'تطوير واجهات المستخدم',
      icon: <Code className="w-4 h-4 text-purple-400" />,
    },
    {
      id: 'Desktop Development',
      nameEn: 'Desktop Development',
      nameAr: 'تطوير برامج سطح المكتب',
      icon: <Monitor className="w-4 h-4 text-amber-400" />,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const whatsappMsg = `*New Service Request - Bestryful Soft*\n\n` +
      `*Client Name:* ${userName}\n` +
      `*Phone:* ${userPhone}\n` +
      `*Requested Service:* ${selectedService}\n` +
      `*Project Details:* ${projectDescription}`;

    const encoded = encodeURIComponent(whatsappMsg);
    const whatsappUrl = `https://wa.me/967773111514?text=${encoded}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 800);
  };
  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 flex flex-col items-center mx-auto w-full max-w-5xl overflow-hidden"
    >
      {/* 1. Centered Contact Header (As requested by user) */}
      <div className="text-center flex flex-col items-center space-y-3 mb-12 w-full max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/20 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-lime-400" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-lime-300">
            {isAr ? 'تواصل مباشر وإطلاق المشاريع' : 'Direct Contact & Inquiries'}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
          {isAr ? (
            <>
              <span className="text-white">لنعمل معاً على </span>
              <span className="bg-gradient-to-r from-lime-300 via-white to-cyan-300 bg-clip-text text-transparent">
                مشروعك القادم
              </span>
            </>
          ) : (
            <>
              <span className="text-white">Let's Build </span>
              <span className="bg-gradient-to-r from-lime-300 via-white to-cyan-300 bg-clip-text text-transparent">
                Together
              </span>
            </>
          )}
        </h2>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg mx-auto text-subtle-shadow">
          {isAr
            ? 'تواصل معي مباشرة عبر القنوات السريعة أو قم بتعبئة النموذج لنبدأ التخطيط والتنفيذ فوراً.'
            : 'Reach out directly via the channels on one side, or submit your project details in the form on the other.'}
        </p>
      </div>

      {/* 2. Side-by-Side 2-Column Split: Gmail, WhatsApp & Call on one side, Form on the other side */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SIDE 1: Quick Contact Channels (Phone, WhatsApp, Gmail) */}
        <div className="lg:col-span-5 space-y-3 text-left">
          {/* Direct Call Card */}
          <a
            href="tel:+967773111514"
            className="flex items-center gap-3.5 p-4 rounded-2xl backdrop-blur-xl bg-zinc-950/80 border border-white/15 hover:border-lime-400/50 hover:bg-zinc-900/90 transition-all group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-zinc-200 block font-medium uppercase tracking-wider text-subtle-shadow">
                {isAr ? 'اتصال مباشر' : 'Direct Phone Call'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono truncate block group-hover:text-lime-300 text-contrast-shadow">
                +967 773 111 514
              </span>
            </div>
          </a>

          {/* WhatsApp Chat Card */}
          <a
            href="https://wa.me/967773111514"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-2xl backdrop-blur-xl bg-zinc-950/80 border border-white/15 hover:border-emerald-400/50 hover:bg-zinc-900/90 transition-all group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-zinc-200 block font-medium uppercase tracking-wider text-subtle-shadow">
                {isAr ? 'محادثة واتساب' : 'WhatsApp Chat'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono truncate block group-hover:text-emerald-300 text-contrast-shadow">
                +967 773 111 514
              </span>
            </div>
          </a>

          {/* Gmail / Email Address Card */}
          <a
            href="mailto:bestryful.dev@gmail.com"
            className="flex items-center gap-3.5 p-4 rounded-2xl backdrop-blur-xl bg-zinc-950/80 border border-white/15 hover:border-cyan-400/50 hover:bg-zinc-900/90 transition-all group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] text-zinc-200 block font-medium uppercase tracking-wider text-subtle-shadow">
                {isAr ? 'البريد الإلكتروني (Gmail)' : 'Gmail / Email Address'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono truncate block group-hover:text-cyan-300 text-contrast-shadow">
                bestryful.dev@gmail.com
              </span>
            </div>
          </a>

          {/* Location & Availability Note */}
          <div className="p-4 rounded-2xl backdrop-blur-xl bg-zinc-950/80 border border-white/15 text-left">
            <div className="flex items-center gap-2 mb-1 text-lime-400">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-[11px] font-mono uppercase tracking-widest font-bold">
                {isAr ? 'صنعاء، اليمن' : 'Sana’a, Yemen'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-200 leading-relaxed text-subtle-shadow font-normal">
              {isAr
                ? 'متاحون للشراكات المحلية وتنفيذ الأنظمة السحابية والبرمجية عن بُعد على مستوى العالم.'
                : 'Available for local partnerships & global remote development projects.'}
            </p>
          </div>
        </div>

        {/* SIDE 2: Interactive Contact Form */}
        <div className="lg:col-span-7 rounded-3xl backdrop-blur-xl bg-zinc-950/80 border border-white/15 p-5 sm:p-7 shadow-2xl text-left">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name & Phone Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-zinc-200 uppercase tracking-wider mb-1.5 text-subtle-shadow font-medium">
                  {isAr ? 'الاسم الكامل *' : 'Your Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={isAr ? 'مثال: محمد العماد' : 'e.g. John Doe'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-lime-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-200 uppercase tracking-wider mb-1.5 text-subtle-shadow font-medium">
                  {isAr ? 'رقم الهاتف / واتساب *' : 'Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="e.g. +967 773 111 514"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-lime-400 transition-colors"
                />
              </div>
            </div>

            {/* Selected Service Bar */}
            <div className="p-2.5 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-lime-400" />
                <span className="text-xs font-bold text-white text-subtle-shadow">
                  {isAr ? 'الخدمة المختارة:' : 'Selected Service:'}
                </span>
                <span className="text-xs font-mono text-lime-300 font-bold bg-zinc-950 px-2 py-0.5 rounded-md border border-lime-400/30 text-subtle-shadow">
                  {selectedService}
                </span>
              </div>
              <a href="#services" className="text-[10px] text-zinc-300 hover:text-white underline font-mono text-subtle-shadow">
                {isAr ? 'تغيير' : 'Change'}
              </a>
            </div>

            {/* Quick Service Selection Grid */}
            <div>
              <label className="block text-[11px] font-mono text-zinc-200 uppercase tracking-wider mb-2 text-subtle-shadow font-medium">
                {isAr ? 'أو اختر من التخصصات أدناه:' : 'Or Select Option Directly:'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {serviceOptions.map((opt) => {
                  const isSelected = selectedService === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedService(opt.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-lime-400/20 border-lime-400/80 shadow-md shadow-lime-400/10 ring-1 ring-lime-400/40'
                          : 'bg-zinc-900/70 border-white/15 hover:border-white/25 hover:bg-zinc-900/90'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-lime-400 text-zinc-950' : 'bg-white/10 text-zinc-300'
                          }`}
                        >
                          {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : opt.icon}
                        </div>
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                          {isAr ? opt.nameAr : opt.nameEn}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalService(opt.id);
                        }}
                        className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        title={isAr ? 'عرض التفاصيل' : 'Learn More'}
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Description Textarea */}
            <div>
              <label className="block text-[11px] font-mono text-zinc-200 uppercase tracking-wider mb-1.5 text-subtle-shadow font-medium">
                {isAr ? 'وصف المشروع والميزات المطلوبة *' : 'Project Description *'}
              </label>
              <textarea
                required
                rows={3}
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder={
                  isAr
                    ? 'صف أهداف مشروعك، الميزات المطلوبة، والجدول الزمني التقديري...'
                    : 'Describe your project goals, features, or timeline...'
                }
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-lime-400 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl font-bold text-xs text-zinc-950 bg-lime-400 hover:bg-lime-300 active:scale-[0.99] shadow-lg shadow-lime-400/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isAr ? 'إرسال طلب المشروع الآن' : 'Send Project Request'}</span>
            </button>

            {/* Success Feedback */}
            {isSubmitted && (
              <div className="p-3 rounded-xl bg-lime-400/15 border border-lime-400/40 text-lime-300 text-xs flex items-center gap-2.5 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-lime-400" />
                <span>
                  {isAr
                    ? 'شكراً لك! تم إعداد طلبك وجارٍ فتح محادثة الواتساب للتواصل المباشر.'
                    : 'Thank you! Your request is ready and opening WhatsApp to connect directly.'}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Info Modal */}
      <ServiceInfoModal
        serviceKey={modalService}
        onClose={() => setModalService(null)}
        lang={lang}
      />
    </section>
  );
};
