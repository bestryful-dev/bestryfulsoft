import React from 'react';
import { Sparkles } from 'lucide-react';

interface StatementSectionProps {
  lang: 'en' | 'ar';
}

export const StatementSection: React.FC<StatementSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section className="relative py-32 md:py-48 px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center text-center select-none overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6">
        {/* Subtle Brand Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/20 border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-lime-400" />
          <span className="text-xs font-mono tracking-widest uppercase text-lime-300 font-semibold">
            {isAr ? 'بيستريفول سوفت' : 'Bestryful Soft'}
          </span>
        </div>

        {/* Big Bold Headline Statement */}
        <div className="space-y-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[1.05]">
            {isAr ? (
              <>
                <span className="text-white">بيستريفول</span>
                <br />
                <span className="bg-gradient-to-r from-lime-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  حيث تتحول الأفكار إلى واقع
                </span>
              </>
            ) : (
              <>
                <span className="text-white tracking-tight">Bestryful</span>
                <br />
                <span className="bg-gradient-to-r from-lime-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  Where Ideas Come to Reality
                </span>
              </>
            )}
          </h2>

          <p className="max-w-2xl mx-auto text-xs sm:text-base md:text-lg text-zinc-300/90 font-normal leading-relaxed pt-2 text-subtle-shadow">
            {isAr
              ? 'نهندس ونطور برمجيات المستقبل لتواكب طموحاتك وتحقق نتائج استثنائية.'
              : 'Architecting and crafting next-generation digital experiences that elevate your vision.'}
          </p>
        </div>
      </div>
    </section>
  );
};
