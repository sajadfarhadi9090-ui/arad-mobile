import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Battery, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Smartphone, 
  Check, 
  ShoppingBag,
  Info,
  Calendar,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { Product } from '../types';
import { formatToman, toPersianDigits, getConditionText } from '../utils/formatters';

interface InspectionModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const isUsed = product.condition === 'used';
  const report = product.inspectionReport;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md dir-rtl overflow-hidden">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        
        {/* Header Modal Bar - Fixed Top */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                {isUsed ? 'شناسنامه کارشناسی و تست ۶۰‌گانه موبایل آراد' : 'مشخصات کامل و ضمانت‌نامه آکبند'}
              </h2>
              <p className="text-xs text-slate-400">{product.titleFa}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold transition border border-amber-500/30 shadow-sm"
              title="بازگشت به فروشگاه"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به فروشگاه</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Inner Scrollable Area */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Top Product Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="aspect-square bg-slate-900 rounded-xl p-3 flex items-center justify-center border border-slate-800/80">
              <img
                src={product.images[0]}
                alt={product.titleFa}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  isUsed ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                }`}>
                  {getConditionText(product.condition, report?.cosmeticGrade)}
                </span>
                <span className="text-xs text-slate-400 font-medium">برند: {product.brand.toUpperCase()}</span>
              </div>

              <h3 className="text-lg font-black text-white">{product.titleFa}</h3>
              <p className="text-xs text-slate-400">{product.titleEn}</p>

              <div className="pt-2 flex items-baseline gap-2">
                <span className="text-xs text-slate-400">قیمت فروش:</span>
                <span className="text-xl font-black text-amber-400 dir-ltr">
                  {formatToman(product.price)}
                </span>
              </div>
            </div>
          </div>

          {/* Used Phone Inspection Detailed Certificate */}
          {isUsed && report ? (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-sm font-black text-amber-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  گواهی کارشناسی فنی و سلامت قطعات
                </h4>
                <div className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  تاریخ تست: {report.inspectionDate}
                </div>
              </div>

              {/* Inspection Grid Scorecard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Battery Health Box (Only for iPhone / Apple) */}
                {product.brand === 'apple' && (
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">سلامت باتری (Battery Health):</span>
                      <span className="text-sm font-black text-emerald-400 flex items-center gap-1">
                        <Battery className="w-4 h-4 text-emerald-400" />
                        {toPersianDigits(report.batteryHealth)}٪
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {report.batteryHealth >= 90 ? 'باتری فابریک عالی با دوام فوق‌العاده' : 'باتری سالم در محدوده استاندارد'}
                    </p>
                  </div>
                )}

                {/* Cosmetic Grade Box */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">وضعیت ظاهری و بدنه:</span>
                    <span className="text-sm font-black text-amber-400">
                      درجه {report.cosmeticGrade}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">{report.cosmeticDescription}</p>
                </div>

                {/* Screen & Display */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">اصالت صفحه نمایش:</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {report.screenOriginal ? '۱۰۰٪ فابریک کارخانه' : 'تعویض روکاری باکیفیت'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">بدون پیکسل سوخته، هاله، یا ضعف تاچ.</p>
                </div>

                {/* Replaced Parts Status */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">تعویض قطعات و سابقه بازشدگی:</span>
                    <span className="text-xs font-bold text-slate-200">
                      پاس شده
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">{report.partsReplaced}</p>
                </div>

                {/* Box & Accessories */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">جعبه و لوازم جانبی:</span>
                    <span className="text-xs font-bold text-emerald-400">تکمیل</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{report.boxAndAccessories}</p>
                </div>

                {/* IMEI & Hamta Status */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">استعلام سامانه همتا (IMEI):</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      رجیستر شده
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">{report.imeiStatus}</p>
                </div>

              </div>

              {/* Inspector Seal Box */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-bold text-amber-300">تایید شده توسط کارشناس ارشد آراد:</p>
                    <p className="text-slate-300 text-[11px]">{report.inspectorName} (امتیاز کارشناسی: {toPersianDigits(report.inspectionScore)} از ۱۰۰)</p>
                  </div>
                </div>
                <div className="hidden sm:block font-black text-amber-400 border-r border-amber-500/30 pr-3">
                  مهر تایید آراد 🛡️
                </div>
              </div>

            </div>
          ) : (
            /* New Phone Guarantee Specs */
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                تضمین‌های گوشی آکبند (پلمپ شرکتی)
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  دستگاه ۱۰۰٪ آکبند و پلمپ اولیه کارخانه سازنده می‌باشد.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  دارای کد فعال‌سازی رسمی همتا جهت استعلام فوری در حضور مشتری.
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  پشتیبانی از ۱۸ ماه گارانتی معتبر شرکتی واردکننده رسمی.
                </li>
              </ul>
            </div>
          )}

          {/* Detailed Hardware Specs Accordion */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-black text-white">مشخصات کامل سخت‌افزاری:</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">صفحه نمایش:</span>
                <span className="font-bold text-slate-200">{product.specs.screen}</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">پردازنده مرکزی:</span>
                <span className="font-bold text-slate-200">{product.specs.processor}</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">دوربین اصلی:</span>
                <span className="font-bold text-slate-200">{product.specs.mainCamera}</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">باتری و شارژ:</span>
                <span className="font-bold text-slate-200">{product.specs.battery}</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">حافظه داخلی و رم:</span>
                <span className="font-bold text-slate-200">{product.specs.storage} / {product.specs.ram}</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block mb-0.5">سیستم عامل:</span>
                <span className="font-bold text-slate-200">{product.specs.os}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer - Fixed Bottom */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between shrink-0 z-20">
          <div className="text-xs text-slate-400">
            <span className="text-emerald-400 font-bold">مهلت تست ۷ روزه آراد</span> فعال است
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition flex items-center gap-1.5"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به فروشگاه</span>
            </button>

            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              افزودن به سبد و خرید
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
