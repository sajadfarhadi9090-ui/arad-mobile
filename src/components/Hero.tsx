import React from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Zap, 
  CheckCircle, 
  Sparkles, 
  Smartphone, 
  Search,
  Check
} from 'lucide-react';
import { PhoneBrand } from '../types';

interface HeroProps {
  onSelectBrand: (brand: 'all' | PhoneBrand) => void;
  onOpenTradeIn: () => void;
  onOpenAiAssistant: () => void;
  activeBrand: string;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectBrand,
  onOpenTradeIn,
  onOpenAiAssistant,
  activeBrand
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800/80">
      {/* Background Subtle Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column (Right in RTL) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              مرجع تخصصی موبایل نو و کارکرده در کشور
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              خرید و فروش بی‌دردسر <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                گوشی‌های نو و کارکرده
              </span>{' '}
              با ضمانت آراد
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              در موبایل آراد، تمامی گوشی‌های دست دوم تحت تست ۶۰ نقطه‌ای کارشناسی شده و همراه با
              <span className="text-amber-400 font-bold"> شناسنامه فنی رسمی، سلامت باتری تضمینی، مهلت تست ۷ روزه </span>
              و ضمانت انتقال مالکیت ارائه می‌شوند.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenTradeIn}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition duration-200"
              >
                قیمت‌گذاری و تعویض گوشی کارکرده شما 💰
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-bold px-5 py-3.5 rounded-xl text-sm flex items-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                راهنمایی از مشاور هوشمند خرید
              </button>
            </div>

            {/* Quick Guarantees Pill */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
                <span>۷ روز مهلت تست بی قید</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تست کارشناسی ۶۰ نقطه‌ای</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ارسال اکسپرس فوری</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>انتقال مالکیت همتا</span>
              </div>
            </div>
          </div>

          {/* Right Image Column (Left in RTL) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950/60 group">
              <img
                src="/src/assets/images/mobile_arad_hero_1784759611297.jpg"
                alt="فروشگاه موبایل آراد"
                className="w-full h-auto object-cover group-hover:scale-105 transition duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              
              {/* Badge Overlay */}
              <div className="absolute bottom-4 right-4 left-4 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <p className="text-amber-400 font-extrabold text-sm">ضمانت اصالت و سلامت ۱۰۰٪</p>
                  <p className="text-slate-400 text-[11px]">با ثبت رسمی فاکتور اتحادیه و شناسه IMEI</p>
                </div>
                <div className="bg-amber-500/20 text-amber-300 font-black text-xs px-2.5 py-1 rounded-lg border border-amber-500/30">
                  ۱۰,۰۰۰+ مشتری راضی
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Selector Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 mb-3 font-semibold">انتخاب بر اساس برند محبوب:</p>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <button
              onClick={() => onSelectBrand('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeBrand === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              همه برندها
            </button>

            <button
              onClick={() => onSelectBrand('apple')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 ${
                activeBrand === 'apple'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              آیفون (Apple)
            </button>

            <button
              onClick={() => onSelectBrand('samsung')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeBrand === 'samsung'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              سامسونگ (Samsung)
            </button>

            <button
              onClick={() => onSelectBrand('xiaomi')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeBrand === 'xiaomi'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              شیائومی (Xiaomi)
            </button>

            <button
              onClick={() => onSelectBrand('google')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeBrand === 'google'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              گوگل پیکسل (Pixel)
            </button>

            <button
              onClick={() => onSelectBrand('honor')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                activeBrand === 'honor'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              آنر (Honor)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
