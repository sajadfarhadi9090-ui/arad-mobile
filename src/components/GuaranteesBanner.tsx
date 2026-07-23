import React from 'react';
import { ShieldCheck, RotateCcw, Truck, Award, CheckCircle2, PhoneCall } from 'lucide-react';

export const GuaranteesBanner: React.FC = () => {
  return (
    <section className="bg-slate-900/90 border-y border-slate-800 py-10 px-4 my-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-white">چرا خرید از موبایل آراد؟</h2>
          <p className="text-xs sm:text-sm text-slate-400">تضمین بالاترین امنیت، کیفیت و خدمات پس از فروش در ایران</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-white text-sm">۷ روز مهلت تست واقعی</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                مهلت تعویض بی‌قید و شرط در صورت وجود کوچکترین ایراد سخت‌افزاری.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-white text-sm">تست ۶۰‌گانه کارشناسی</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                صدور شناسنامه فنی برای گوشی‌های کارکرده با مهر رسمی آراد.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-white text-sm">ارسال بیمه‌شده و اکسپرس</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                ارسال کمتر از ۲ ساعت در تهران و پست پیشتاز سریع برای سراسر ایران.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-white text-sm">انتقال مالکیت همتا</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                رجیستری قانونی و انتقال مالکیت آنی در حضور یا زمان تحویل کالا.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
