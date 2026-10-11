import React from 'react';
import { Github, Youtube, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'ar';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <footer className="relative border-t border-white/10 backdrop-blur-xl bg-black/30 py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2.5">
          <img
            src="/images/logo.png"
            alt="Bestryful Soft Logo"
            className="w-6 h-6 rounded-md shadow-sm object-contain"
          />
          <p className="text-xs text-zinc-400">
            {isAr
              ? '© 2026 منصور أحمد (Bestryful Soft). جميع الحقوق محفوظة.'
              : '© 2026 Mansoor Ahmed (Bestryful Soft). All rights reserved.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/bestryful"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all hover:scale-110"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://www.youtube.com/@MansoorAhmedAl-emad"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 flex items-center justify-center text-zinc-300 hover:text-red-400 transition-all hover:scale-110"
            title="YouTube Channel"
          >
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
