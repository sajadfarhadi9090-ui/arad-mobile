import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, X, CheckCircle2, ShieldCheck, User, AlertCircle, Sparkles, LogOut, UserCheck, RefreshCw } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveEmail: (email: string, name: string) => void;
  onLogout?: () => void;
  currentUserEmail?: string;
  currentUserName?: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onSaveEmail,
  onLogout,
  currentUserEmail = '',
  currentUserName = '',
}) => {
  const [email, setEmail] = useState<string>(currentUserEmail);
  const [fullName, setFullName] = useState<string>(currentUserName);
  const [error, setError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setEmail(currentUserEmail || '');
      setFullName(currentUserName || '');
      setIsSubmitted(false);
      setError('');
      setIsEditing(false);
    }
  }, [isOpen, currentUserEmail, currentUserName]);

  if (!isOpen) return null;

  const validateEmail = (val: string) => {
    // Standard RFC-compliant email regex
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(val.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('لطفا آدرس ایمیل خود را وارد کنید.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError('فرمت ایمیل نامعتبر است! لطفا یک ایمیل واقعی (مانند name@gmail.com) وارد کنید.');
      return;
    }

    onSaveEmail(cleanEmail, fullName.trim() || 'کاربر گرامی');
    setIsSubmitted(true);
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    setEmail('');
    setFullName('');
    setIsEditing(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md dir-rtl overflow-hidden">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        
        {/* Modal Header - Fixed Top */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Mail className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                {currentUserEmail && !isEditing ? 'مدیریت حساب کاربری' : 'ثبت‌نام و ورود با ایمیل'}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">عضویت در فروشگاه موبایل آراد</p>
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
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {currentUserEmail && !isEditing && !isSubmitted ? (
            /* LOGGED IN ACCOUNT VIEW WITH LOGOUT BUTTON */
            <div className="space-y-6">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">حساب کاربری فعال</h3>
                      <p className="text-[11px] text-emerald-400 font-medium">وارد شده به سیستم</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold">
                    فعال
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {currentUserName && (
                    <div className="flex justify-between items-center py-1 border-b border-slate-900">
                      <span className="text-slate-400">نام و نام خانوادگی:</span>
                      <span className="text-white font-bold">{currentUserName}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">ایمیل ثبت‌شده:</span>
                    <span className="text-amber-400 font-mono font-bold dir-ltr">{currentUserEmail}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4 text-amber-400" />
                  <span>تغییر یا ویرایش ایمیل</span>
                </button>

                <button
                  onClick={handleLogoutClick}
                  className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>خروج از حساب کاربری</span>
                </button>
              </div>
            </div>
          ) : isSubmitted ? (
            /* SUCCESS VIEW */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black text-white">ثبت‌نام با موفقیت انجام شد!</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                  ایمیل <span className="text-amber-400 font-bold dir-ltr inline-block">{email}</span> در سیستم ثبت گردید. حساب کاربری شما فعال شد.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-2xl text-xs transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                <span>ورود به فروشگاه</span>
              </button>
            </div>
          ) : (
            /* REGISTRATION / LOGIN FORM */
            <>
              {/* Feature Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-slate-950 to-slate-950 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-amber-400">مزایای ثبت‌نام با ایمیل واقعی</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    دریافت فاکتور رسمی، پیگیری لحظه‌ای مرسوله‌های پستی و اطلاع از جدیدترین موجودی گوشی‌های استوک و نو.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>نام و نام خانوادگی (اختیاری):</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثلا: علی رضایی"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-bold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>آدرس ایمیل واقعی (برای دریافت فاکتور و پیگیری):</span>
                    <span className="text-amber-400 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="example@gmail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 dir-ltr text-left font-mono transition"
                  />
                </div>

                {error && (
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl flex items-center gap-2 text-rose-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>اطلاعات شما نزد موبایل آراد کاملاً محفوظ است و اسپم ارسال نخواهد شد.</span>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl text-xs transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                  >
                    <span>ثبت ایمیل و ایجاد حساب</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-xs transition"
                    >
                      انصراف
                    </button>
                  )}
                </div>
              </form>
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400 font-medium">باشگاه مشتریان موبایل آراد</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-1.5 rounded-xl text-xs transition flex items-center gap-1.5"
          >
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت به فروشگاه</span>
          </button>
        </div>

      </div>
    </div>
  );
};

