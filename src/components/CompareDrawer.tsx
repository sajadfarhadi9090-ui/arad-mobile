import React from 'react';
import { X, Scale, Trash2, ShoppingBag, ShieldCheck, Battery, Cpu, Smartphone, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { formatToman, toPersianDigits, getConditionText } from '../utils/formatters';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onAddToCart: (product: Product) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveFromCompare,
  onClearCompare,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md dir-rtl overflow-hidden">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        
        {/* Drawer Header - Fixed Top */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">مقایسه تخصصی مشخصات فنی گوشی‌ها</h2>
              <p className="text-xs text-slate-400">
                مقایسه همزمان {toPersianDigits(comparedProducts.length)} گوشی انتخاب شده
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {comparedProducts.length > 0 && (
              <button
                onClick={onClearCompare}
                className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/20 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                پاکسازی مقایسه
              </button>
            )}

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-700 shadow-sm"
              title="بازگشت به فروشگاه"
            >
              <ArrowRight className="w-4 h-4 text-amber-400" />
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

        {/* Content - Inner Scrollable Flex Area */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto flex-1">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Scale className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-300 font-bold text-sm">هیچ گوشی برای مقایسه انتخاب نشده است.</p>
              <p className="text-slate-500 text-xs">از روی کارت هر گوشی دکمه "مقایسه" را بزنید تا در این جدول قرار گیرد.</p>
            </div>
          ) : (
            <div className="min-w-[600px] grid grid-cols-1 divide-y divide-slate-800 text-xs">
              
              {/* Product Header Row */}
              <div className="grid grid-cols-4 gap-4 pb-4 items-end">
                <div className="font-extrabold text-slate-400 text-sm flex items-center gap-1.5">
                  ویژگی / مدل
                </div>

                {comparedProducts.map((p) => (
                  <div key={p.id} className="relative bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center space-y-2">
                    <button
                      onClick={() => onRemoveFromCompare(p.id)}
                      className="absolute top-2 left-2 p-1 text-slate-500 hover:text-red-400 transition"
                      title="حذف از مقایسه"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="w-20 h-20 mx-auto">
                      <img src={p.images[0]} alt={p.titleFa} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>

                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                      p.condition === 'used' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {getConditionText(p.condition, p.inspectionReport?.cosmeticGrade)}
                    </span>

                    <h4 className="font-extrabold text-white line-clamp-2 leading-tight">{p.titleFa}</h4>
                    
                    <div className="font-black text-amber-400 text-sm dir-ltr">
                      {formatToman(p.price)}
                    </div>

                    <button
                      onClick={() => onAddToCart(p)}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      خرید
                    </button>
                  </div>
                ))}
              </div>

              {/* Specs Rows */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-bold text-slate-400">وضعیت و شرایط:</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-slate-200 font-medium">
                    {p.condition === 'new' ? 'نو آکبند (پلمپ)' : `کارکرده ${p.inspectionReport?.cosmeticGrade || ''}`}
                  </span>
                ))}
              </div>

              {/* Battery Health / Capacity */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-bold text-slate-400">باتری و شارژ:</span>
                {comparedProducts.map(p => (
                  <div key={p.id} className="space-y-0.5">
                    <p className="text-slate-200">{p.specs.battery}</p>
                    {p.inspectionReport && (
                      <p className="text-emerald-400 font-bold">سلامت باتری: {toPersianDigits(p.inspectionReport.batteryHealth)}٪</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Screen */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-bold text-slate-400">صفحه نمایش:</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-slate-200">{p.specs.screen}</span>
                ))}
              </div>

              {/* CPU */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-bold text-slate-400">پردازنده:</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-slate-200">{p.specs.processor}</span>
                ))}
              </div>

              {/* Cameras */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-bold text-slate-400">دوربین‌ها:</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-slate-200">{p.specs.mainCamera}</span>
                ))}
              </div>

              {/* Storage & RAM */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-bold text-slate-400">حافظه / رم:</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-slate-200">{p.specs.storage} / {p.specs.ram}</span>
                ))}
              </div>

              {/* Warranty */}
              <div className="grid grid-cols-4 gap-4 py-3 items-center">
                <span className="font-bold text-slate-400">گارانتی و پشتیبانی:</span>
                {comparedProducts.map(p => (
                  <span key={p.id} className="text-emerald-400 font-semibold">{p.warranty}</span>
                ))}
              </div>

            </div>
          )}
        </div>

        {/* Drawer Footer - Fixed Bottom */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400 font-medium">جدول مقایسه محصولات</span>
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
