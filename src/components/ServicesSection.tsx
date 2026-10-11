import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Palette, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  ArrowUpRight,
  Check,
  ArrowDown
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/portfolioData';

interface ServicesSectionProps {
  lang: 'en' | 'ar';
  selectedService: string;
  setSelectedService: (service: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  lang, 
  selectedService, 
  setSelectedService 
}) => {
  const isAr = lang === 'ar';
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('web-dev');

  const currentCategory = SERVICE_CATEGORIES.find((c) => c.id === activeCategoryTab) || SERVICE_CATEGORIES[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-4 h-4 text-cyan-400" />;
      case 'Palette':
        return <Palette className="w-4 h-4 text-amber-400" />;
      case 'Globe':
      default:
        return <Globe className="w-4 h-4 text-lime-400" />;
    }
  };

  return (
    <section id="services" className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
      {/* Centered container with ~40% width on laptop/desktop */}
      <div className="w-full max-w-xl md:max-w-2xl lg:w-[42%] mx-auto flex flex-col items-center">
        {/* Section Header (Centered with padding above and below) */}
        <div className="text-center flex flex-col items-center space-y-3 mb-8 w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/20 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-[11px] font-mono tracking-widest uppercase text-lime-300 text-subtle-shadow">
              {isAr ? 'قائمة الخدمات والأسعار التنافسية' : 'Services Menu & Transparent Pricing'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            {isAr ? (
              <>
                <span className="text-white">مرحباً بك في </span>
                <span className="bg-gradient-to-r from-lime-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  ترقيتك الرقمية القادمة!
                </span>
              </>
            ) : (
              <>
                <span className="text-white">Welcome to Your </span>
                <span className="bg-gradient-to-r from-lime-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  Next Digital Upgrade!
                </span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg mx-auto text-subtle-shadow">
            {isAr
              ? 'حلول رقمية بمعايير عالمية مباشرة في صنعاء. اختر أي خدمة لتحديدها وتضمينها فوراً في طلب مشروعك.'
              : 'World-class digital solutions right here in Sana’a. Click any option below to select it for your project quote.'}
          </p>
        </div>

        {/* Main Ultra-Translucent Glass Card (Darker background for high text readability) */}
        <div className="w-full rounded-3xl backdrop-blur-xl bg-zinc-950/80 border border-white/15 p-5 sm:p-7 shadow-2xl space-y-5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-3 border-b border-white/10">
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = activeCategoryTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-lime-400 text-zinc-950 shadow-lg shadow-lime-400/20'
                      : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15'
                  }`}
                >
                  {getCategoryIcon(cat.iconName)}
                  <span>{isAr ? cat.titleAr : cat.titleEn}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description */}
          <div className="text-xs text-zinc-200 font-medium text-subtle-shadow leading-relaxed flex items-center justify-between gap-3 px-1">
            <span>{isAr ? currentCategory.summaryAr : currentCategory.summaryEn}</span>
            <span className="text-[10px] font-mono text-lime-400 shrink-0 uppercase tracking-wider font-bold">
              {isAr ? 'انقر على أي خيار لاختياره' : 'Click any option to select'}
            </span>
          </div>

          {/* Interactive Service Items List (Click ANY option to select) */}
          <div className="space-y-2.5">
            {currentCategory.items.map((item, idx) => {
              const isSelected = selectedService === item.nameEn;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedService(item.nameEn)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group text-left ${
                    isSelected
                      ? 'bg-lime-400/20 border-lime-400/80 shadow-lg shadow-lime-400/15 ring-1 ring-lime-400/50'
                      : 'bg-zinc-900/70 border-white/15 hover:border-white/25 hover:bg-zinc-900/95'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                          isSelected ? 'bg-lime-400 text-zinc-950' : 'bg-white/10 text-zinc-300'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <h4 className={`text-xs sm:text-sm font-bold text-contrast-shadow ${isSelected ? 'text-white' : 'text-zinc-100 group-hover:text-white'}`}>
                        {isAr ? item.nameAr : item.nameEn}
                      </h4>
                      {isSelected && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-lime-400 text-zinc-950 font-bold uppercase">
                          {isAr ? 'محدد' : 'Selected'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-200 leading-relaxed pl-7 text-subtle-shadow font-normal">
                      {isAr ? item.descAr : item.descEn}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 shrink-0 pl-7 sm:pl-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-white/10">
                    <span className="text-xs font-mono font-bold text-lime-300 bg-zinc-950/90 px-2 py-0.5 rounded-lg border border-lime-400/30 whitespace-nowrap">
                      {item.price}
                    </span>
                    <span className="text-[9px] text-zinc-300 font-mono text-subtle-shadow">
                      {isSelected ? (isAr ? 'تم الحفظ في النموذج' : 'Added to quote') : (isAr ? 'اضغط للتحديد' : 'Click to select')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions Footer */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all"
            >
              <ArrowDown className="w-3.5 h-3.5 text-lime-400" />
              <span>{isAr ? 'متابعة الطلب في النموذج أدناه' : `Request "${selectedService}" Below`}</span>
            </a>

            <a
              href={`https://wa.me/967715172880?text=${encodeURIComponent(
                isAr
                  ? `مرحباً! أود طلب خدمة: ${selectedService}`
                  : `Hello! I would like to order: ${selectedService}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-zinc-950 bg-lime-400 hover:bg-lime-300 active:scale-95 transition-all shadow-lg shadow-lime-400/20"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isAr ? 'طلب عبر واتساب' : 'Order via WhatsApp'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
