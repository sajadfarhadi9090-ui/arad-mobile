import React, { useState } from 'react';
import { 
  Smartphone, 
  Search, 
  ShoppingBag, 
  Scale, 
  Bot, 
  Calculator, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  SlidersHorizontal,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  Truck,
  Mail,
  UserCheck
} from 'lucide-react';
import { FilterState, PhoneCondition } from '../types';
import { toPersianDigits } from '../utils/formatters';

interface NavbarProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  cartCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenCompare: () => void;
  onOpenTradeIn: () => void;
  onOpenAiAssistant: () => void;
  onOpenAdmin: () => void;
  onOpenTracking: () => void;
  onOpenRegister: () => void;
  userEmail?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  filterState,
  setFilterState,
  cartCount,
  compareCount,
  onOpenCart,
  onOpenCompare,
  onOpenTradeIn,
  onOpenAiAssistant,
  onOpenAdmin,
  onOpenTracking,
  onOpenRegister,
  userEmail,
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleConditionChange = (condition: 'all' | 'new' | 'used') => {
    setFilterState(prev => ({ ...prev, condition }));
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 py-1.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              فروشگاه تخصصی موبایل آراد - ضمانت اصالت و ۷ روز مهلت تست واقعی
            </span>
          </div>

          <div className="flex items-center gap-3">
            {userEmail ? (
              <button
                onClick={onOpenRegister}
                className="flex items-center gap-1.5 font-bold text-slate-950 text-[11px] bg-slate-950/15 hover:bg-slate-950/25 px-2.5 py-1 rounded-lg transition"
                title="ویرایش اطلاعات حساب ایمیل"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-950" />
                <span className="dir-ltr font-mono font-extrabold max-w-[130px] sm:max-w-none truncate">{userEmail}</span>
              </button>
            ) : (
              <button
                onClick={onOpenRegister}
                className="flex items-center gap-1 font-extrabold text-slate-950 text-[11px] bg-slate-950/20 hover:bg-slate-950/30 px-2.5 py-1 rounded-lg transition shadow-sm animate-pulse hover:animate-none"
                title="ثبت‌نام و ورود با ایمیل واقعی"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>ثبت‌نام و ورود با ایمیل</span>
              </button>
            )}

            <button
              onClick={onOpenTracking}
              className="hidden sm:flex items-center gap-1 font-bold text-slate-950 text-[11px] bg-slate-950/10 hover:bg-slate-950/20 px-2.5 py-1 rounded-lg transition"
              title="پیگیری مرسولات پستی پست جمهوری اسلامی ایران"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>پیگیری مرسوله پستی</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="hover:underline flex items-center gap-1 font-bold text-slate-950 text-[11px] bg-slate-950/10 hover:bg-slate-950/20 px-2.5 py-1 rounded-lg transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              ورود به پنل مدیریت
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30">
              <Smartphone className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-white tracking-tight">موبایل آراد</span>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
                  تضمین کیفیت
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">مرجع تخصصی خرید و فروش گوشی‌های نو و کارکرده</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="جستجوی مدل، برند (آیفون، سامسونگ، شیائومی)..."
              value={filterState.searchQuery}
              onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl py-2.5 pr-10 pl-4 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>

          {/* Action Tools Buttons */}
          <div className="flex items-center gap-2">
            {/* Post Parcel Tracking Button */}
            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition"
              title="سامانه رهگیری مرسولات پستی"
            >
              <Truck className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">پیگیری پست</span>
            </button>

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-indigo-600/20 hover:from-cyan-600/30 hover:to-indigo-600/30 text-cyan-300 border border-cyan-500/40 px-3 py-2 rounded-xl text-xs font-semibold transition shadow-sm"
              title="دستیار هوشمند انتخاب موبایل"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="hidden md:inline">مشاور هوشمند AI</span>
            </button>

            {/* Trade-in / Valuation Calculator */}
            <button
              onClick={onOpenTradeIn}
              className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition"
              title="قیمت‌گذاری و تعویض گوشی کارکرده"
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">فروش / تعویض کارکرده</span>
            </button>

            {/* Comparison Tool Button */}
            <button
              onClick={onOpenCompare}
              className="relative flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition"
              title="مقایسه مشخصات گوشی‌ها"
            >
              <Scale className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {toPersianDigits(compareCount)}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3.5 py-2 rounded-xl shadow-lg shadow-amber-500/20 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline text-xs">سبد خرید</span>
              {cartCount > 0 && (
                <span className="bg-slate-950 text-amber-400 font-extrabold text-[11px] px-2 py-0.5 rounded-full">
                  {toPersianDigits(cartCount)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mt-3 lg:hidden relative">
          <input
            type="text"
            placeholder="جستجوی مدل گوشی نو یا کارکرده..."
            value={filterState.searchQuery}
            onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-2 pr-9 pl-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
        </div>

        {/* Condition Filter Bar */}
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium shrink-0 ml-1">وضعیت گوشی:</span>
            
            <button
              onClick={() => handleConditionChange('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition shrink-0 ${
                filterState.condition === 'all'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              همه گوشی‌ها
            </button>

            <button
              onClick={() => handleConditionChange('new')}
              className={`px-3 py-1.5 rounded-lg font-bold transition shrink-0 flex items-center gap-1 ${
                filterState.condition === 'new'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              گوشی‌های نو (آکبند)
            </button>

            <button
              onClick={() => handleConditionChange('used')}
              className={`px-3 py-1.5 rounded-lg font-bold transition shrink-0 flex items-center gap-1 ${
                filterState.condition === 'used'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              گوشی‌های کارکرده (تست شده)
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ارسال اکسپرس
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              تست ۶۰‌گانه آراد
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
