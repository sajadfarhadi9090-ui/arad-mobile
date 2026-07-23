import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  Plus, 
  Minus,
  MapPin,
  Tag,
  ArrowRight
} from 'lucide-react';
import { CartItem } from '../types';
import { formatToman, toPersianDigits } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [coupon, setCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  
  const [shippingMethod, setShippingMethod] = useState<'express' | 'post' | 'tipax'>('post');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod' | 'card'>('online');
  
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  
  // Receiver details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const shippingCost = shippingMethod === 'express' ? 150000 : shippingMethod === 'tipax' ? 200000 : 0;
  const grandTotal = Math.max(0, rawSubtotal + shippingCost - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'ARAD100') {
      setDiscountAmount(1000000);
      setCouponApplied(true);
    } else {
      alert('کد تخفیف نامعتبر است. کد تست: ARAD100');
    }
  };

  const handleFinalizeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('لطفا تمامی اطلاعات گیرنده را وارد نمایید.');
      return;
    }
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-slate-900 border-r border-slate-800 h-full flex flex-col justify-between shadow-2xl overflow-hidden">
        
        {/* Header - Fixed Top */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-extrabold text-white">
              {step === 'cart' && 'سبد خرید شما'}
              {step === 'checkout' && 'تکمیل سفارش و اطلاعات ارسال'}
              {step === 'success' && 'ثبت نهایی فاکتور'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (step === 'checkout') {
                  setStep('cart');
                } else {
                  onClose();
                }
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-700"
              title="بازگشت"
            >
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              <span>بازگشت</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {step === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-white">سفارش شما با موفقیت ثبت گردید!</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                کد پیگیری فاکتور:{' '}
                <span className="font-extrabold text-amber-400 dir-ltr inline-block">
                  {toPersianDigits('ARD-98240')}
                </span>
                <br />
                همکاران ما در بخش پردازش سفارشات موبایل آراد جهت بسته‌بندی و ارسال اکسپرس با شما تماس خواهند گرفت.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setStep('cart');
                    onClose();
                  }}
                  className="bg-amber-500 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs"
                >
                  بازگشت به سایت
                </button>
              </div>
            </div>
          ) : step === 'cart' ? (
            cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-300 font-bold text-sm">سبد خرید شما خالی است.</p>
                <p className="text-slate-500 text-xs">از بخش محصولات دیدن کنید و گوشی مورد نظرتان را اضافه نمایید.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.titleFa}
                      className="w-16 h-16 object-contain bg-slate-900 rounded-xl p-1 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-white text-xs line-clamp-1">{item.product.titleFa}</h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <span className={`px-1.5 py-0.5 rounded font-bold ${
                          item.product.condition === 'used' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {item.product.condition === 'used' ? 'کارکرده' : 'آکبند'}
                        </span>
                        <span>{item.product.specs.storage}</span>
                      </div>
                      <div className="text-amber-400 font-black text-xs dir-ltr">
                        {formatToman(item.product.price)}
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-amber-400">{toPersianDigits(item.quantity)}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-300 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2 flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="کد تخفیف (تست: ARAD100)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pr-8 pl-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-2 rounded-xl text-xs transition"
                  >
                    اعمال
                  </button>
                </form>

                {couponApplied && (
                  <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    کد تخفیف ۱,۰۰۰,۰۰۰ تومانی با موفقیت اعمال گردید!
                  </p>
                )}
              </div>
            )
          ) : (
            /* Checkout Form Step */
            <form id="checkout-form" onSubmit={handleFinalizeOrder} className="space-y-4 text-xs">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/30 transition w-full justify-center"
              >
                <ArrowRight className="w-4 h-4" />
                <span>بازگشت به ویرایش سبد خرید</span>
              </button>
              
              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">اطلاعات تحویل‌گیرنده:</label>
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی کامل"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="tel"
                  placeholder="شماره موبایل جهت هماهنگی تحویل"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 dir-ltr text-right"
                />
                <textarea
                  placeholder="نشانی دقیق پستی و پلاک..."
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Shipping Method */}
              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">روش ارسال:</label>
                <div className="space-y-1.5">
                  <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                    shippingMethod === 'express' ? 'bg-amber-500/10 border-amber-500/50 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="shipping" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} />
                      <span>پیک اکسپرس (ویژه تهران - تحویل زیر ۲ ساعت)</span>
                    </div>
                    <span className="font-bold dir-ltr">۱۵۰,۰۰۰ تومان</span>
                  </label>

                  <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                    shippingMethod === 'post' ? 'bg-amber-500/10 border-amber-500/50 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="shipping" checked={shippingMethod === 'post'} onChange={() => setShippingMethod('post')} />
                      <span>پست پیشتاز بیمه‌شده (سراسر کشور)</span>
                    </div>
                    <span className="font-bold text-emerald-400">رایگان</span>
                  </label>

                  <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                    shippingMethod === 'tipax' ? 'bg-amber-500/10 border-amber-500/50 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="shipping" checked={shippingMethod === 'tipax'} onChange={() => setShippingMethod('tipax')} />
                      <span>تیپاکس سریع (۲۴ ساعته)</span>
                    </div>
                    <span className="font-bold dir-ltr">۲۰۰,۰۰۰ تومان</span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="font-bold text-slate-300 block">روش پرداخت:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`p-2 rounded-xl text-[11px] font-bold border transition ${
                      paymentMethod === 'online' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    درگاه بانکی
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2 rounded-xl text-[11px] font-bold border transition ${
                      paymentMethod === 'cod' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    پرداخت در محل
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2 rounded-xl text-[11px] font-bold border transition ${
                      paymentMethod === 'card' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    کارت به کارت
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Footer Summary Bar */}
        {step !== 'success' && cartItems.length > 0 && (
          <div className="bg-slate-950 p-6 border-t border-slate-800 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>جمع اقلام:</span>
                <span className="dir-ltr">{formatToman(rawSubtotal)}</span>
              </div>

              {shippingCost > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>هزینه ارسال:</span>
                  <span className="dir-ltr">{formatToman(shippingCost)}</span>
                </div>
              )}

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>تخفیف:</span>
                  <span className="dir-ltr">- {formatToman(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-white font-black text-base pt-2 border-t border-slate-800">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-amber-400 dir-ltr">{formatToman(grandTotal)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
              >
                تکمیل اطلاعات و ثبت سفارش
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="bg-slate-800 text-slate-300 font-bold px-4 py-3 rounded-xl text-xs"
                >
                  بازگشت
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition"
                >
                  تایید و پرداخت فاکتور
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
