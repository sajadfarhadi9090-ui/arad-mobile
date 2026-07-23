import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  Smartphone, 
  Battery, 
  CheckCircle, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck,
  Send,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { PhoneBrand } from '../types';
import { formatToman, toPersianDigits } from '../utils/formatters';

interface TradeInCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TradeInCalculator: React.FC<TradeInCalculatorProps> = ({
  isOpen,
  onClose
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [brand, setBrand] = useState<PhoneBrand>('apple');
  const [model, setModel] = useState<string>('iPhone 13 128GB');
  const [batteryHealth, setBatteryHealth] = useState<number>(88);
  const [cosmetic, setCosmetic] = useState<'perfect' | 'minor_scratches' | 'dents'>('perfect');
  const [hasBox, setHasBox] = useState<boolean>(true);
  const [repairs, setRepairs] = useState<'none' | 'screen' | 'battery'>('none');
  
  // User Form Info for Callback
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Base estimation algorithm for popular models
  const calculateOffer = () => {
    let basePrice = 30000000;
    if (model.includes('iPhone 15')) basePrice = 65000000;
    else if (model.includes('iPhone 14')) basePrice = 50000000;
    else if (model.includes('iPhone 13')) basePrice = 36000000;
    else if (model.includes('S24')) basePrice = 55000000;
    else if (model.includes('S23')) basePrice = 38000000;
    else if (model.includes('Xiaomi')) basePrice = 18000000;

    // Battery factor (only for iPhone)
    const batteryMult = brand === 'apple' ? Math.max(0.85, batteryHealth / 100) : 1.0;
    
    // Cosmetic factor
    let cosmeticMult = 1.0;
    if (cosmetic === 'minor_scratches') cosmeticMult = 0.92;
    if (cosmetic === 'dents') cosmeticMult = 0.82;

    // Box factor
    const boxMult = hasBox ? 1.0 : 0.88;

    // Repair factor
    let repairMult = 1.0;
    if (repairs === 'screen') repairMult = 0.85;
    if (repairs === 'battery') repairMult = 0.92;

    const estimatedCash = Math.round(basePrice * batteryMult * cosmeticMult * boxMult * repairMult);
    const tradeInCredit = Math.round(estimatedCash * 1.05); // 5% trade-in bonus

    return { estimatedCash, tradeInCredit };
  };

  const { estimatedCash, tradeInCredit } = calculateOffer();

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md dir-rtl overflow-hidden">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        
        {/* Header Bar - Fixed Top */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-6 py-4 text-slate-950 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950/10 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-base font-black">طرح تعویض و محاسبه‌گر قیمت گوشی کارکرده شما</h2>
              <p className="text-xs font-semibold opacity-90">استعلام آنی قیمت خرید نقدی و اعتبار تعویض در موبایل آراد</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 font-black text-xs transition shadow-sm border border-slate-950/20"
              title="بازگشت به فروشگاه"
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت به فروشگاه</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wizard Content Body - Scrollable Area */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-white">درخواست کارشناسی شما با موفقیت ثبت شد!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                کارشناسان بخش خرید کارکرده موبایل آراد ظرف کمتر از ۱۵ دقیقه با شماره{' '}
                <span className="text-amber-400 font-bold dir-ltr inline-block">{toPersianDigits(phone)}</span> جهت هماهنگی کارشناسی حضوری یا غیرحضوری تماس خواهند گرفت.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition"
                >
                  بازگشت به فروشگاه
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Wizard Step 1: Select Brand & Model */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
                  <span>مرحله انتخاب گوشی شما</span>
                  <span className="text-amber-400">تخمین شفاف آراد</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['apple', 'samsung', 'xiaomi', 'honor'] as PhoneBrand[]).map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        setBrand(b);
                        if (b === 'apple') setModel('iPhone 13 128GB');
                        if (b === 'samsung') setModel('Galaxy S23 Ultra 256GB');
                        if (b === 'xiaomi') setModel('Xiaomi 13T Pro 512GB');
                        if (b === 'honor') setModel('Honor 90 256GB');
                      }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition border ${
                        brand === b
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {b === 'apple' && 'آیفون (Apple)'}
                      {b === 'samsung' && 'سامسونگ (Samsung)'}
                      {b === 'xiaomi' && 'شیائومی (Xiaomi)'}
                      {b === 'honor' && 'آنر (Honor)'}
                    </button>
                  ))}
                </div>

                {/* Select Specific Model */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">انتخاب مدل دقیق گوشی:</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {brand === 'apple' && (
                      <>
                        <option value="iPhone 15 Pro Max 256GB">آیفون ۱۵ پرو مکس - ۲۵۶ گیگابایت</option>
                        <option value="iPhone 15 Pro 128GB">آیفون ۱۵ پرو - ۱۲۸ گیگابایت</option>
                        <option value="iPhone 14 Pro Max 256GB">آیفون ۱۴ پرو مکس - ۲۵۶ گیگابایت</option>
                        <option value="iPhone 13 128GB">آیفون ۱۳ معمولی - ۱۲۸ گیگابایت</option>
                        <option value="iPhone 12 128GB">آیفون ۱۲ معمولی - ۱۲۸ گیگابایت</option>
                        <option value="iPhone 11 128GB">آیفون ۱۱ معمولی - ۱۲۸ گیگابایت</option>
                      </>
                    )}
                    {brand === 'samsung' && (
                      <>
                        <option value="Galaxy S24 Ultra 512GB">سامسونگ گلکسی S24 اولترا - ۵۱۲ گیگابایت</option>
                        <option value="Galaxy S23 Ultra 256GB">سامسونگ گلکسی S23 اولترا - ۲۵۶ گیگابایت</option>
                        <option value="Galaxy S22 Ultra 256GB">سامسونگ گلکسی S22 اولترا - ۲۵۶ گیگابایت</option>
                        <option value="Galaxy A54 256GB">سامسونگ گلکسی A54 - ۲۵۶ گیگابایت</option>
                        <option value="Galaxy A55 256GB">سامسونگ گلکسی A55 - ۲۵۶ گیگابایت</option>
                      </>
                    )}
                    {brand === 'xiaomi' && (
                      <>
                        <option value="Xiaomi 13T Pro 512GB">شیائومی 13T پرو - ۵۱۲ گیگابایت</option>
                        <option value="Poco X6 Pro 512GB">پوکو X6 پرو - ۵۱۲ گیگابایت</option>
                        <option value="Xiaomi 12T Pro 256GB">شیائومی 12T پرو - ۲۵۶ گیگابایت</option>
                      </>
                    )}
                    {brand === 'honor' && (
                      <>
                        <option value="Honor 90 256GB">آنر ۹۰ - ۲۵۶ گیگابایت</option>
                        <option value="Honor 200 Pro 512GB">آنر ۲۰۰ پرو - ۵۱۲ گیگابایت</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Battery Health Slider (Only for iPhone / Apple) */}
                {brand === 'apple' && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1">
                        <Battery className="w-4 h-4 text-emerald-400" />
                        درصد سلامت باتری (Battery Health):
                      </span>
                      <span className="text-emerald-400 font-extrabold text-sm">{toPersianDigits(batteryHealth)}٪</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="100"
                      value={batteryHealth}
                      onChange={(e) => setBatteryHealth(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                )}

                {/* Cosmetic Condition */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-medium">وضعیت ظاهری بدنه و صفحه:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setCosmetic('perfect')}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                        cosmetic === 'perfect'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      در حد آکبند (بدون خط)
                    </button>

                    <button
                      type="button"
                      onClick={() => setCosmetic('minor_scratches')}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                        cosmetic === 'minor_scratches'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      خط و خش جزئی مویی
                    </button>

                    <button
                      type="button"
                      onClick={() => setCosmetic('dents')}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                        cosmetic === 'dents'
                          ? 'bg-red-500/20 text-red-400 border-red-500/50'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      ضربه یا خط عمیق
                    </button>
                  </div>
                </div>

                {/* Box Availability */}
                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-300 font-medium">آیا جعبه اصلی و فابریک دستگاه موجود است؟</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setHasBox(true)}
                      className={`px-3 py-1 rounded-lg font-bold transition ${
                        hasBox ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      بله
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasBox(false)}
                      className={`px-3 py-1 rounded-lg font-bold transition ${
                        !hasBox ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      خیر
                    </button>
                  </div>
                </div>

                {/* Instant Calculation Box Result */}
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 p-4 rounded-2xl border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      قیمت تخمینی خرید توسط آراد:
                    </span>
                    <span className="text-amber-400 font-black text-lg dir-ltr">
                      {formatToman(estimatedCash)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                    <span className="text-emerald-400 font-bold">
                      اعتبار ویژه طرح تعویض (۵٪ بونوس آراد):
                    </span>
                    <span className="text-emerald-400 font-black text-base dir-ltr">
                      {formatToman(tradeInCredit)}
                    </span>
                  </div>
                </div>

                {/* Form to submit for callback */}
                <form onSubmit={handleSubmitInquiry} className="space-y-3 pt-2">
                  <p className="text-xs text-slate-300 font-semibold">ثبت درخواست جهت هماهنگی و کارشناسی رایگان:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="نام و نام خانوادگی"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="tel"
                      placeholder="شماره تماس (مثال: ۰۹۱۲۱۲۳۴۵۶۷)"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 dir-ltr text-right"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
                  >
                    <Send className="w-4 h-4" />
                    ثبت درخواست تماس کارشناس خرید
                  </button>
                </form>

              </div>
            </>
          )}

        </div>

        {/* Bottom Fixed Footer Bar */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400 font-medium">پایان محاسبه قیمت و استعلام تعویض</span>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/20"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            <span>بازگشت به فروشگاه</span>
          </button>
        </div>

      </div>
    </div>
  );
};
