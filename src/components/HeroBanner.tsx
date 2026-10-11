import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Youtube, 
  Github, 
  Download, 
  Layers, 
  Sparkles,
  ArrowUpRight,
  Globe,
  Clock
} from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface HeroBannerProps {
  lang: 'en' | 'ar';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeIndex, setActiveIndex] = useState(2); // Start in the middle
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Youtube className="w-3.5 h-3.5 text-red-400" />;
      case 'code':
        return <Github className="w-3.5 h-3.5 text-zinc-300" />;
      case 'download':
        return <Download className="w-3.5 h-3.5 text-amber-400" />;
      case 'live':
      default:
        return <ExternalLink className="w-3.5 h-3.5 text-lime-400" />;
    }
  };

  return (
    <section id="home" className="relative min-h-[95vh] pt-20 md:pt-22 pb-8 flex flex-col justify-start items-center text-center px-4">
      {/* Top Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/30 border border-white/10 backdrop-blur-md mb-3 animate-fade-in">
        <Sparkles className="w-3.5 h-3.5 text-lime-400" />
        <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-200">
          {isAr ? 'بيستريفول سوفت — بناء المواقع، التطبيقات والاستضافة السحابية' : 'Bestryful Soft — Websites, Apps & Cloud Hosting'}
        </span>
      </div>

      {/* Main Hero Headline (Compact & positioned higher) */}
      <div className="max-w-3xl mx-auto space-y-2.5 mb-4 drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12]">
          {isAr ? (
            <>
              <span className="text-white">نبني المواقع والتطبيقات ونستضيفها</span> <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-lime-300 via-white to-cyan-300 bg-clip-text text-transparent">
                لتطوير وتنمية أعمالك
              </span>
            </>
          ) : (
            <>
              <span className="text-white">We build websites, apps & host them</span> <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-lime-300 via-white to-cyan-300 bg-clip-text text-transparent">
                to improve your business
              </span>
            </>
          )}
        </h1>

        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed text-subtle-shadow">
          {isAr
            ? 'نبني المواقع والتطبيقات ونستضيفها باحترافية عالية لتطوير أعمالك، جذب المزيد من العملاء، وتحقيق نموك الرقمي بأحدث التقنيات.'
            : 'We build websites and mobile apps, and host them with high reliability to improve your business, attract more clients, and accelerate your growth.'}
        </p>

        {/* Dual Hero CTA Buttons */}
        <div style={{ height: '116px' }} className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <a
            href="#projects"
            className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md shadow-lg transition-all"
          >
            {isAr ? 'استعراض المشاريع' : 'VIEW PROJECTS'}
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold text-zinc-950 bg-lime-400 hover:bg-lime-300 active:scale-95 shadow-lg shadow-lime-400/30 transition-all"
          >
            <span>{isAr ? 'ابدأ مشروعك' : 'GET STARTED'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Special Spotlight Project: Naba Social (نبا سوشيل)                        */}
      {/* Placed above projects and under the second selected div, with space & pad */}
      {/* Background: Modern & elegant mix of white, orange, and desert sand tones  */}
      {/* ========================================================================= */}
      <div className="w-full max-w-5xl mx-auto mt-10 sm:mt-18 mb-10 sm:mb-14 px-3 sm:px-6 relative z-20 min-h-fit lg:min-h-[555.75px]">
        <div className="relative overflow-hidden rounded-3xl p-5 sm:p-8 md:p-10 border border-orange-200/80 shadow-[0_20px_60px_-15px_rgba(234,88,12,0.18),0_0_30px_rgba(251,146,60,0.12)] backdrop-blur-xl bg-gradient-to-br from-white/95 via-[#fffbf5]/95 to-[#fed7aa]/50 transition-all duration-300 w-full flex flex-col justify-center">
          
          {/* Subtle Desert Dune & Sunlight Ambient Glow Accents */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-bl from-orange-400/20 via-amber-300/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-amber-500/15 via-orange-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center text-start">
            {/* Left Column: Project Info, Badges, Progress Bar, and Button */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 text-orange-900 border border-orange-300/70 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  {isAr ? 'مشروع خاص ومميز' : 'Featured Special Project'}
                </span>
                
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-900 border border-amber-300/70 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  {isAr ? 'قيد التطوير والبرمجة' : 'Under Active Development'}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100/90 text-orange-800 border border-orange-200 text-xs font-mono font-medium">
                  MERN Stack
                </span>
              </div>

              {/* Title Header */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                  {isAr ? (
                    <>
                      نبا سوشيل <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">(Naba Social)</span>
                    </>
                  ) : (
                    <>
                      Naba Social <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">(نبا سوشيل)</span>
                    </>
                  )}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-orange-700 mt-1">
                  {isAr 
                    ? 'منصة تواصل اجتماعي عربية عصرية مبنية بتقنيات MERN المتكاملة' 
                    : 'Modern Arabic Social Web Platform built with MERN Stack Architecture'}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {isAr
                  ? 'مشروع شبكة اجتماعية عربية رائدة يهدف إلى تقديم تجربة تواصل فريدة وسلسة للمستخدمين، تدعم التفاعل اللحظي، منشورات الوسائط المتعددة، والمجتمعات التفاعلية مع واجهة فائقة السرعة.'
                  : 'An innovative Arabic social web platform engineered with MongoDB, Express, React, and Node.js. Designed for seamless community interactions, rich media feeds, and lightning-fast user experiences.'}
              </p>

              {/* Technology Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'Arabic Social UI'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-white/90 text-zinc-800 border border-orange-200/80 shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Development Progress Bar */}
              <div className="pt-2 pb-1 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-zinc-800">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    {isAr ? 'نسبة الإنجاز (جاري استكمال الميزات والبرمجة)' : 'Development Progress (Under active continuous build)'}
                  </span>
                  <span className="font-mono text-orange-700 text-sm">75%</span>
                </div>
                
                {/* Progress Track */}
                <div className="w-full bg-orange-100/90 rounded-full h-3.5 p-0.5 border border-orange-300/60 overflow-hidden shadow-inner">
                  <div
                    className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 h-full rounded-full shadow-sm shadow-orange-500/40 transition-all duration-1000 relative"
                    style={{ width: '75%' }}
                  >
                    {/* Subtle Shimmer Bar */}
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                  </div>
                </div>
              </div>

              {/* Action Buttons: Try Website Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://naba-social.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-500/35 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group"
                >
                  <Globe className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
                  <span>{isAr ? 'تجربة الموقع (naba-social.onrender.com)' : 'Try Website (naba-social.onrender.com)'}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>

                <div className="text-[11px] text-zinc-600 font-mono flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{isAr ? 'النسخة التجريبية متاحة الآن' : 'Preview Build Available'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Wide Project Image / Mockup Display */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-orange-200/90 shadow-xl bg-white/90 group">
                {/* Mockup Top Browser Chrome */}
                <div className="flex items-center justify-between px-3.5 py-2 bg-gradient-to-r from-orange-50 to-[#fff8ed] border-b border-orange-200/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 bg-white/90 px-3 py-0.5 rounded-full border border-orange-200/50 max-w-[200px] truncate">
                    naba-social.onrender.com
                  </div>
                  <div className="w-4" />
                </div>

                {/* Project Image Display (Loads from /images/projects/naba-social.png, with graceful empty placeholder state) */}
                <div className="relative h-48 sm:h-56 lg:h-64 w-full bg-gradient-to-br from-orange-50/60 via-amber-50/40 to-white flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/projects/naba-social.png"
                    alt="Naba Social (نبا سوشيل)"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // If empty image or not found, show elegant placeholder
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle Desert Tint Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Image Caption Footer */}
                <div className="p-3 bg-gradient-to-r from-orange-50/80 to-white border-t border-orange-100 flex items-center justify-between text-[11px] text-zinc-700">
                  <span className="font-bold text-orange-900">{isAr ? 'نبا سوشيل — واجهة المستخدم' : 'Naba Social — Preview UI'}</span>
                  <span className="font-mono text-[10px] text-orange-700">{isAr ? 'مشروع MERN نشط' : 'Active MERN Project'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Arc Curved Projects Carousel (With generous breathing space for background visibility) */}
      <div className="w-full max-w-5xl mx-auto mt-12 sm:mt-16 relative" id="projects">
        {/* Curved 3D Cards Stage */}
        <div style={{ height: '468px' }} className="relative flex flex-col items-center perspective-[1200px] py-2 overflow-visible">
          {/* Navigation Arrows Header (Positioned inside at top center) */}
          <div className="flex flex-col items-center justify-center text-center gap-1.5 px-4 z-40 relative mx-auto w-full pt-0.5">
            <div className="text-center space-y-0.5">
              <span className="text-xs font-mono text-lime-400 uppercase tracking-widest block font-bold text-contrast-shadow">
                {isAr ? 'معرض المشاريع البارزة' : 'Featured Projects Showcase'}
              </span>
              <span className="text-[11px] text-zinc-200 text-contrast-shadow font-medium block">
                {isAr ? 'اضغط على الأسهم للتنقل بين مشاريعنا' : 'Use arrows or click cards to scrub through projects'}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-0.5">
              <button
                onClick={handlePrev}
                aria-label="Previous Project"
                className="w-9 h-9 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-xl cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Project"
                className="w-9 h-9 rounded-full bg-zinc-950/80 hover:bg-zinc-900 border border-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90 shadow-xl cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Stage Container */}
          <div className="w-full flex-1 flex items-center justify-center relative mt-3 sm:mt-4">
            {PROJECTS.map((project: Project, index: number) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              if (absOffset > 2) return null;

              // 3D positioning curved fan layout
              const translateX = offset * 210;
              const translateZ = -absOffset * 95;
              const rotateY = offset * -16;
              const opacity = isActive ? 1 : Math.max(0.4, 0.85 - absOffset * 0.25);
              const scale = isActive ? 1 : 0.88;
              const zIndex = 30 - absOffset * 5;

              return (
                <div
                  key={project.id}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  className={`absolute top-0 w-[270px] sm:w-[310px] md:w-[330px] rounded-2xl backdrop-blur-2xl bg-zinc-950/85 border text-left cursor-pointer overflow-hidden shadow-2xl group ${
                    isActive
                      ? 'border-lime-400/70 shadow-lime-400/20 ring-1 ring-lime-400/50'
                      : 'border-white/15 hover:border-white/30'
                  }`}
                >
                  {/* Card Visual Header / Project Image */}
                  <div className="relative h-36 sm:h-40 w-full bg-black/60 overflow-hidden border-b border-white/10">
                    {!imgErrors[project.id] ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="eager"
                        onError={(e) => {
                          if (project.altImage && e.currentTarget.src !== project.altImage) {
                            e.currentTarget.src = project.altImage;
                          } else {
                            setImgErrors((prev) => ({ ...prev, [project.id]: true }));
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${project.accentColor} flex flex-col items-center justify-center p-3 relative`}>
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-1.5 shadow-inner">
                          <Layers className="w-5 h-5 text-lime-400" />
                        </div>
                        <span className="text-xs font-mono font-bold text-white tracking-wide text-center">
                          {project.badge}
                        </span>
                        <span className="text-[10px] text-zinc-300 mt-0.5">
                          {project.image.replace('/images/projects/', '')}
                        </span>
                      </div>
                    )}

                    {/* Category Tag Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-black/90 text-lime-300 border border-lime-400/40 backdrop-blur-md">
                      {isAr ? project.tagAr : project.tagEn}
                    </div>
                  </div>

                  {/* Card Content (Well-contained to prevent any bottom overflow) */}
                  <div className="p-3.5 sm:p-4 flex flex-col justify-between min-h-[160px]">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-1 text-contrast-shadow">
                        {project.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-zinc-200 mt-1.5 line-clamp-3 leading-relaxed text-subtle-shadow">
                        {isAr ? project.descAr : project.descEn}
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 mt-2 border-t border-white/10">
                      {project.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-zinc-100 hover:text-white border border-white/20 transition-all hover:scale-105"
                        >
                          {getLinkIcon(link.type)}
                          <span>{isAr ? link.labelAr : link.labelEn}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {PROJECTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === idx ? 'w-5 bg-lime-400' : 'w-1.5 bg-zinc-600 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
