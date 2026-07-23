import React from 'react';
import { Smartphone, PhoneCall, MapPin, Clock, ShieldCheck, Mail } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface FooterProps {
  onOpenTracking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracking }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-base">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center">
                <Smartphone className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span>موبایل آراد (Mobile Arad)</span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              فروشگاه موبایل آراد مرجع تخصصی خرید و فروش آنلاین انواع گوشی‌های هوشمند نو (آکبند شرکتی) و دست دوم کارشناسی شده با ۷ روز مهلت تست بی قید و شرط است.
            </p>

            <div className="pt-2 text-[11px] text-amber-400 font-bold">
              ساعات کاری: همه‌روزه از ۱۰ صبح الی ۹ شب
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm border-b border-slate-800 pb-2">دسته‌بندی‌های محبوب</h4>
            <ul className="space-y-2">
              {onOpenTracking && (
                <li>
                  <button onClick={onOpenTracking} className="text-amber-400 font-bold hover:underline flex items-center gap-1">
                    <span>📦 پیگیری مرسوله پستی (کد ۲۴ رقمی)</span>
                  </button>
                </li>
              )}
              <li><a href="#" className="hover:text-amber-400 transition">خرید آیفون کارکرده (Grade A+)</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">گوشی‌های پرچمدار سامسونگ</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">شیائومی نو و کارکرده</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">طرح تعویض گوشی کارکرده</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">استعلام کارشناسی IMEI</a></li>
            </ul>
          </div>

          {/* Support Info */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm border-b border-slate-800 pb-2">ارتباط و پشتیبانی آنلاین</h4>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ایمیل پشتیبانی: <span className="text-white font-bold dir-ltr">info@mobilearad.ir</span></span>
              </p>

              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>پاسخگویی چت آنلاین: همه‌روزه از ۱۰ صبح الی ۹ شب</span>
              </p>

              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>پشتیبانی و پیگیری سفارشات به‌صورت اینترنتی</span>
              </p>
            </div>
          </div>

          {/* Trust Badges & Licenses */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm border-b border-slate-800 pb-2">نمادها و مجوزهای رسمی</h4>
            <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-1">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
                <span className="font-bold text-slate-200">نماد اعتماد الکترونیکی (اینماد)</span>
              </div>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center gap-1">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="font-bold text-slate-200">عضو رسمی اتحادیه صوتی تصویری</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© ۱۴۰۳ تمامی حقوق این وب‌سایت برای فروشگاه موبایل آراد محفوظ می‌باشد.</p>
          <p>طراحی و اجرا شده با جدیدترین متدهای مدرن وب</p>
        </div>

      </div>
    </footer>
  );
};
