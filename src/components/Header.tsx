import React from 'react';
import { Sparkles, Globe2, MessageSquare, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const isAr = lang === 'ar';

  const navLinks = [
    { href: '#home', labelEn: 'Home', labelAr: 'الرئيسية' },
    { href: '#projects', labelEn: 'Projects', labelAr: 'المشاريع' },
    { href: '#services', labelEn: 'Services', labelAr: 'الخدمات' },
    { href: '#contact', labelEn: 'Contact', labelAr: 'تواصل معنا' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-xl bg-zinc-950/60 border border-white/10 rounded-full px-5 py-2.5 shadow-2xl">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo.png"
            alt="Bestryful Soft Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg shadow-md shadow-cyan-500/20 object-contain group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-base md:text-lg tracking-tight text-white group-hover:text-lime-300 transition-colors">
              Bestryful<span className="text-lime-400">Soft</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline -mt-1">
              Software & Digital Solutions
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {isAr ? link.labelAr : link.labelEn}
            </a>
          ))}
        </nav>

        {/* Action Controls & CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all cursor-pointer"
            title="Toggle Arabic / English"
          >
            <Globe2 className="w-3.5 h-3.5 text-lime-400" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Quick WhatsApp / Quote CTA (Lime Button inspired by image.png) */}
          <a
            href="https://wa.me/967715172880"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs md:text-sm font-bold text-zinc-950 bg-lime-400 hover:bg-lime-300 active:scale-95 rounded-full shadow-lg shadow-lime-400/25 transition-all"
          >
            <span>{isAr ? 'اطلب الآن' : 'Get Quote'}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </header>
  );
};
