import React from 'react';
import { X, CheckCircle, Cpu, ArrowRight } from 'lucide-react';
import { SERVICE_MODALS, ServiceModalInfo } from '../data/portfolioData';

interface ServiceInfoModalProps {
  serviceKey: string | null;
  onClose: () => void;
  lang: 'en' | 'ar';
}

export const ServiceInfoModal: React.FC<ServiceInfoModalProps> = ({
  serviceKey,
  onClose,
  lang,
}) => {
  if (!serviceKey || !SERVICE_MODALS[serviceKey]) return null;

  const isAr = lang === 'ar';
  const info: ServiceModalInfo = SERVICE_MODALS[serviceKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-zinc-900 border border-white/20 p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {isAr ? info.titleAr : info.titleEn}
            </h3>
            <span className="text-xs text-lime-400 font-mono">
              {isAr ? 'تفاصيل ومعايير التنفيذ' : 'Technical Specifications & Stack'}
            </span>
          </div>
        </div>

        {/* Modal Description */}
        <p className="text-sm text-zinc-300 leading-relaxed mb-6">
          {isAr ? info.descriptionAr : info.descriptionEn}
        </p>

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2.5">
            {isAr ? 'التقنيات المستخدمة:' : 'Primary Technologies:'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {info.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/5 border border-white/10 text-zinc-200"
              >
                <CheckCircle className="w-3 h-3 text-lime-400" />
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl text-xs font-bold bg-lime-400 hover:bg-lime-300 text-zinc-950 transition-all cursor-pointer"
        >
          {isAr ? 'إغلاق ومتابعة الطلب' : 'Close & Continue Request'}
        </button>
      </div>
    </div>
  );
};
