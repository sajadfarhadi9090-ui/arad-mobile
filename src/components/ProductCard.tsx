import React from 'react';
import { 
  ShieldCheck, 
  Battery, 
  Scale, 
  FileText, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  Star,
  Cpu,
  Smartphone
} from 'lucide-react';
import { Product } from '../types';
import { formatToman, toPersianDigits, getConditionText } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onInspect: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onInspect,
  onToggleCompare,
  isCompared,
}) => {
  const isUsed = product.condition === 'used';
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 transition duration-300 flex flex-col h-full">
      
      {/* Top Image & Badges Overlay */}
      <div className="relative aspect-square bg-slate-950 p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.titleFa}
          className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Condition Badge (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {isUsed ? (
            <span className="bg-amber-500/90 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-lg shadow-md border border-amber-400">
              کارکرده {product.inspectionReport?.cosmeticGrade && `(${product.inspectionReport.cosmeticGrade})`}
            </span>
          ) : (
            <span className="bg-emerald-500/90 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-lg shadow-md border border-emerald-400">
              نو (آکبند)
            </span>
          )}

          {/* Battery Health Badge for Used */}
          {isUsed && product.inspectionReport && (
            <span className="bg-slate-900/90 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 backdrop-blur-md">
              <Battery className="w-3 h-3 text-emerald-400" />
              سلامت باتری {toPersianDigits(product.inspectionReport.batteryHealth)}٪
            </span>
          )}
        </div>

        {/* Discount Badge (Top Left) */}
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-lg shadow">
            {toPersianDigits(discountPercent)}٪ تخفیف
          </div>
        )}

        {/* Compare Quick Toggle */}
        <button
          onClick={() => onToggleCompare(product)}
          className={`absolute bottom-3 left-3 p-2 rounded-xl transition backdrop-blur-md text-xs font-bold flex items-center gap-1 border ${
            isCompared
              ? 'bg-amber-500 text-slate-950 border-amber-400'
              : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'
          }`}
          title="افزودن به لیست مقایسه"
        >
          <Scale className="w-3.5 h-3.5" />
          <span className="text-[10px] hidden sm:inline">
            {isCompared ? 'در مقایسه' : 'مقایسه'}
          </span>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title & Brand */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-medium">{product.titleEn}</span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{toPersianDigits(product.rating)}</span>
              <span className="text-slate-500">({toPersianDigits(product.reviewsCount)})</span>
            </div>
          </div>

          <h3 className="font-extrabold text-white text-base leading-snug group-hover:text-amber-400 transition">
            {product.titleFa}
          </h3>
        </div>

        {/* Storage & RAM Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold border border-slate-700/60">
            حافظه: {product.specs.storage}
          </span>
          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold border border-slate-700/60">
            رم: {product.specs.ram}
          </span>
          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold border border-slate-700/60">
            {product.specs.color}
          </span>
        </div>

        {/* Short Specs Snippet */}
        <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl space-y-1 border border-slate-800">
          <p className="truncate flex items-center gap-1.5">
            <Smartphone className="w-3 h-3 text-slate-400 shrink-0" />
            <span>صفحه: {product.specs.screen}</span>
          </p>
          <p className="truncate flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-slate-400 shrink-0" />
            <span>پردازنده: {product.specs.processor}</span>
          </p>
        </div>

        {/* Warranty Tag */}
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{product.warranty}</span>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-2 border-t border-slate-800/80">
          
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs text-slate-400">قیمت نهایی:</span>
            <div className="text-left">
              {product.originalPrice && (
                <div className="text-slate-500 line-through text-xs font-semibold dir-ltr">
                  {formatToman(product.originalPrice)}
                </div>
              )}
              <div className="text-lg font-black text-amber-400 dir-ltr">
                {formatToman(product.price)}
              </div>
            </div>
          </div>

          {/* Buttons Group */}
          <div className="grid grid-cols-2 gap-2">
            {isUsed ? (
              <button
                onClick={() => onInspect(product)}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 transition"
              >
                <FileText className="w-3.5 h-3.5" />
                شناسنامه فنی
              </button>
            ) : (
              <button
                onClick={() => onInspect(product)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1 transition"
              >
                مشخصات کامل
              </button>
            )}

            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className={`font-bold py-2 px-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition ${
                product.inStock
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {product.inStock ? 'افزودن به سبد' : 'ناموجود'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
